# 重构方案（任务2交付物）— 与 ROM 不一致清单 + 目标架构

> 目标：将原 ROM 的 PRG 完整翻译成 MVC 结构 —— bank=Service（业务逻辑）、data=Model（数据）、boot=Control（入口即插即用）。
> 最终版无 CPU 指令模拟、无汇编、无 bankSwitch/readMem/mmc3Map 残留，PRG 数据直接 import 消费。

---

## 一、与 ROM 不一致清单（当前审计结果）

### 1.1 数据层：PRG 原始副本缺失（17/32 bank）

`src/game/data/` 下仅有 15 个 `prg-bank-*.ts` 原始数据副本：

| 已有副本 | 06, 07, 11, 12, 13, 15, 19, 20, 21, 22, 24, 25, 26, 28, 31 |
|---|---|
| **缺失副本** | **00, 01, 02, 03, 04, 05, 08, 09, 10, 14, 16, 17, 18, 23, 27, 29, 30** |

后果：`rom-data/index.ts` 用 0xFF 填充缺失 bank，`NES_PRG_ROM` 聚合不完整；Bank00/01/02 等核心服务无原始字节可对照，无法做差分验证。

> TODO: 从 ROM 提取缺失的 17 个 bank 原始数据，补齐 `prg-bank-XX.ts`。

### 1.2 Bank19 AuxiliaryService — 骨架未翻译（与注释声明矛盾）

`src/game/service/bank19_auxiliary.service.ts`：
- `game/index.ts` 注释声称 Bank19「已翻译 (完整实现, 不再属于骨架)」——**实际全部方法体是 TODO 覆盖**（`start()`/`update()`/15 个控制码入口/6 个内部函数均空）。
- `BANK19_CTRL_TABLE` 15 路跳转表仅常量，无实现。
- 头注释「CPU $B000 窗口映射」的地址换算（`$9000→$B000`）已给出，但未落地代码。

> TODO: 按 `_tmp_bzk_out/bank_19.asm`（CDL C 标记）逐段翻译 $9000-$944D 全部 code 段、6 个内部函数（$B043/$B127/$B15A/$B160/$B2A6/$B406）、JMP 目标（$B02D/$B0AF/$B20F/$B2F7/$B339/$B3CB/$B3FA）。差分验证参照 Bank11/27。

### 1.3 Bank20 MatchAuxService — 骨架未翻译

`src/game/service/bank20_match-aux.service.ts`：
- 4 路 dispatch 只有空壳 `switch`，15 个 code 段、16 个内部函数**全部 TODO 翻译**。
- 直接暴露 `readByte(addr)/readU16(addr)` 裸地址接口（违反「外部只能通过 service 接口访问」原则）。

> TODO: 按 `bank_20.asm` 翻译全部 code 段 + 内部函数；改为结构化数据访问接口。

### 1.4 Bank02 SceneService — 编译错误（引用不存在的成员）

`src/game/service/bank02_scene.service.ts`：
- `_entryC_oamSlotPath()`、`_sceneTileLoader8855()`、`_sceneTileLoader886E()` 被调用但**类中不存在**（tsc 报 TS2339）。
- 残留 `this._bank00.bankSwitch9FA8(1)` —— **MMC3/内存窗口模拟残留命名**，违反重构目标。

> TODO: 补齐三个缺失方法实现（按 asm $833C/$8855/$886E）；删除 `bankSwitch9FA8`，改为直接方法调用。

### 1.5 Bank31 InterruptService — stub（全空）

`bank31_interrupt.service.ts`：`reset()`/`nmi()` 空实现，`getBankConfig()` 恒返回 null。
- 违反「完整翻译」目标：Bank31 $C000-$C502 中断处理、$C6E0-$CFFF 数据表（场景入口表、Bank 配置表）未翻译。

> TODO: 语义化翻译 Bank31 —— 中断处理合并进帧循环（NMI→update），Bank 配置表转为结构化数据供 boot 查询。

### 1.6 boot 路由 — STORY/PASSWORD/RESULT 未接入

`src/game/boot.ts`：`update()` 的 `default` 分支直接返回 true，未分发：
- PASSWORD（Bank02 entryC 密码逻辑，`entryC(0x81)` 已写但 `_entryC_passwordPath` 未实现）
- STORY（Bank18/19 剧情）
- RESULT（赛果）

> TODO: 接入三个场景路由。

### 1.7 编译错误清单（tsc 当前报错，全库未通过）

来自 `_tsc_out.txt` 快照，修复顺序：
1. `bank02_scene.service.ts` 3 处 TS2339（见 1.4）
2. `rom-data/index.ts` 18 处 TS4104（readonly number[] → number[]）
3. `bank00_core.service.ts` 3 处 TS2345/TS2322（palette never[]）
4. `bank22_hybrid.service.ts` 1 处 TS2345（SpriteEntry never[]）
5. `core/utils.ts` 2 处 TS2339/TS2769（ArrayBufferView.set）
6. `test/test-suite.ts` 9 处（API 与实现不一致：`Renderer.registerChrBank` 缺失、`ScriptVM` 类型、`OpeningSceneController.jumpToTitle/isTitle` 缺失、`OpeningShot.TITLE` 缺失）
7. `pages/*` 6 处 TS2304（小程序 Page 全局类型未配置，属类型配置问题）

> TODO: 修复编译错误，达成 `tsc --noEmit` 零错误基线。

### 1.8 其他不一致/隐患

| 项 | 说明 |
|---|---|
| Bank30 | 注释「H5 简化版」，$C503-$C6DF 初始化链未全量对照 |
| OpeningSceneController | TECMO 字母占位，真开场数据未提取（WBS B2） |
| Bank16/22/24/26/28 | 已实现但未见差分验证报告（仅 Bank11/27 有 10064/0、7274/0） |
| 音频 | Bank12 完整；audio ROM 9-bank 已按记忆方案清理（B1/3/7 stub） |
| CDL 统计 | Bank19 code=877B、Bank20 code=2000B，翻译后应全量覆盖 code 段 |

---

## 二、目标架构（MVC）

### 2.1 分层

```
┌─ Control ─ boot.ts (场景路由器: BOOT→TITLE→MEETING→STORY→PASSWORD→MATCH→RESULT)
│
├─ Service ─ bankXX/*.service.ts   ← code=业务逻辑（每个 PRG bank 一个 Service）
│            仅消费: 本 bank 的 data 接口 + DataStore；对外暴露业务方法
│
├─ Model  ── game/data/            ← data=数据模型
│            prg-bank-XX.ts        原始 ROM 字节（只读，直接 import）
│            bankXX-data.ts        结构化访问接口（readBXX* 语义化）
│            DataStore.ts          KV 内存数据中心（NT/OAM/Palette/ZP/RAM）
│
└─ View  ── core/engine/render + pages/ (Canvas 消费 DataStore 渲染)
```

### 2.2 核心约束（验收标准）

1. **bank 不写内存、不做 bank 切换**：数据已 import，直接处理游戏逻辑。
2. **只有当前 bank 可用**：Service 内只能读本 bank 的 `bankXX-data`；跨 bank 数据由固定区/DataStore 桥接。
3. **外部只能通过 service 接口访问**：禁止导出 `readByte(addr)` 裸地址方法；禁止在 Service 间直接 import 对方私有状态。
4. **入口即插即用**：`new Tsubasa2(ctx).start()` 走 boot，无 CPU/MMC3 初始化。
5. **零残留**：全库 grep 无 `bankSwitch|readMem|mmc3Map|setPrgBank|6502 opcode 表`。

### 2.3 目录调整建议

```
src/game/
├── boot.ts                     # Control 路由（补 STORY/PASSWORD/RESULT）
├── service/
│   ├── bank00/                 # Bank00 核心服务 + 开场/标题控制器
│   ├── bank01_data-query.service.ts
│   ├── bank02_scene.service.ts # 补 entryC 密码 + 3 个缺失方法
│   ├── bank19_auxiliary.service.ts   # TODO 全量翻译
│   ├── bank20_match-aux.service.ts   # TODO 全量翻译
│   ├── ...（bank11/16/22/24/26/27/28/29/30 保持）
│   └── bank31_interrupt.service.ts   # TODO 语义化翻译
└── data/
    ├── prg-bank-XX.ts          # 补齐 00,01,02,03,04,05,08,09,10,14,16,17,18,23,27,29,30
    ├── bankXX-data.ts          # 每个有逻辑的 bank 提供结构化访问
    └── DataStore.ts
```

---

## 三、重构步骤（stub → 逐个覆盖 → 差分验证）

| # | 步骤 | 输出 | 验证 |
|---|---|---|---|
| 1 | 修复 tsc 零错误基线 | bank02 缺方法/bank22/bank00/rom-data/utils/test 修复 | `npx tsc --noEmit` 通过 |
| 2 | 补齐缺失 17 个 PRG 原始副本 | `prg-bank-00/01/02/.../30.ts` | 与 ROM 逐字节 diff |
| 3 | Bank19 全量翻译 | 覆盖 start/update/15 控制码/内部函数 | 差分验证（仿 Bank11） |
| 4 | Bank20 全量翻译 | 覆盖 4 路 dispatch/15 code 段/16 内部函数 | 差分验证 |
| 5 | Bank31 语义化 + boot 接入 PASSWORD/STORY/RESULT | 路由完整 | 无界面脚本走流程 |
| 6 | 清理 MMC3 残留 + 裸地址接口 | grep 零命中 | `_scan_mmc3_remnants.cjs` 干净 |
| 7 | 全 bank 差分验证 + 版本推进 v0.3.0 | 验证报告 | 参照 Bank11/27 模式 |

> 每步遵循「先写 stub 保留 TODO，再逐个覆盖」，避免一次性大文件写入。
