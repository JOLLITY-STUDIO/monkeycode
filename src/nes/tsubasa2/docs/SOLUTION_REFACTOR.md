# 天使之翼2（Captain Tsubasa 2）重构移植解决方案

> 目标：把 `src/asm`（6502 反汇编）+ `src/core`（tsnes 模拟器）重构移植为
> **类似 Java 高级语言的 TS 版微信小程序** —— 无 6502 指令模拟、无 bankSwitch、
> bank=Service（业务逻辑）、code=业务域、data=Model（表结构）、boot=Control（即插即用入口）。

---

## 一、目标（验收标准）

1. **可玩**：游戏启动后自动走 BOOT→TITLE→(STORY/MATCH/RESULT/PASSWORD) 完整链路，画面/音效/输入正常。
2. **无 CPU**：全库无 `6502 opcode 解释器`、无 `fetch-decode-execute` 循环。
3. **无 bank 切换**：PRG 数据全部静态 import 进 TS，无 `bankSwitch`/`mmc3Map`/`readMem(addr-0xC000)` 裸地址访问。
4. **MVC 分层**：`bank=Service`（处理游戏逻辑并消费数据）、`data=Model`（表结构/ORM 风格）、`boot=Control`（场景路由器）。
5. **微信小程序**：`pages/tsubasa2` 一页即玩，Canvas 渲染 + 触摸输入 + 音频，包体积可控（主包 < 2MB，数据走分包/CDN）。
6. **可维护**：每个 Service 头部注释 `@bank NN ($8000-$9FFF)`，每个方法注释对应 asm 地址段，可追溯。

---

## 二、现状盘点（2026-08 快照）

### 2.1 输入资产：`src/asm/`（32 个 bank 反汇编）

| 内容 | 说明 |
|---|---|
| `bank00` ~ `bank31` | 每个 bank 一个目录，含 `_full.s`（整 bank 反汇编）+ 分段 `code_*.s`（代码）/`data_*.s`（数据） |
| `build_nes.py` | 自写 Python 6502 汇编器（2-pass、完整指令集、支持 `.byte/.word/.segment/.org`），可产出可启动 NES |
| `verify_nes_full.py` | py65 模拟启动序列验证 |
| `cfg/mmc3.cfg`、`include/` | ca65 链接器配置 + mmc3/ppu/apu/ram_map 公共定义 |

> 这是"权威参照物"：任何 TS 翻译都必须与 `asm/bankNN/_full.s` 逐指令对照。

### 2.2 模拟器资产：`src/core/`（tsnes）

| 模块 | 现状 | 处置 |
|---|---|---|
| `cpu.ts`（1937 行） | 完整 6502 CPU（opcode 表/寻址/中断） | **移除/不再驱动**，仅调试对照用 |
| `nes.ts` / `controller.ts` / `nes-ram.ts` | 主机装配 + 手柄 + RAM 模型 | 保留 `ram.ts`（DataStore 底层）、`nes-ram.ts`（ShadowOam/NT/Palette 数据结构） |
| `ppu/`（vram/nametable/oam/palette/scroll） | 完整 PPU 渲染管线 | **保留**，渲染照抄模拟器 1:1 |
| `papu/`（channel-*/index） | 完整 APU 音频 | **保留**，音频照抄 1:1 |
| `mappers/mapper4.ts` | MMC3（R6/R7 PRG 窗口、CHR bank、IRQ counter） | **只保留数据通路**（`prgBankMap` 查询 + `load8kRomBank` 语义），去掉 CPU 触发依赖 |
| `browser-mini/` | 小程序版外壳（Canvas 帧定时/触摸输入/音频） | **保留复用** |
| `debug/disasm.ts` | 运行时反汇编工具 | 保留为排查工具 |

### 2.3 半成品：`src/game/`（H5 翻译层，**当前断链中间态**）

| 文件 | 状态 |
|---|---|
| `header.ts` | ✅ ROM 头（CONFIG/Mirroring） |
| `chr/chr-bank-00~15.ts` | ✅ 16 个 CHR bank 已提取（4096B × 16） |
| `index.ts` | ⚠️ Tsubasa2 组合根已存在（每帧 NMI→writeStoreToPpu→PPU 渲染→APU 同步），但 **import 断链**：引用了 `./prg/code/system/Bank00Service` 等不存在的模块 |
| `prg/code/index.ts` | ⚠️ 残留 30+ 行 export（引用 `./system/Bank00Service`、`./story/ScriptEngine` 等），**实现文件全部缺失**（在 `prg.rar` 归档中） |
| `prg/data/index.ts` | ⚠️ 0 字节 |
| `prg/prg.rar` | 📦 **已翻译的 code/data 源码归档包（693KB）** —— 需解压恢复 |

> **当前最紧急问题**：`src/game/prg/code/*` 与 `src/game/prg/data/*` 的实现文件不在工作区，
> `game/index.ts` / `prg/code/index.ts` 引用全部断链，`tsc --noEmit` 必然报错。

### 2.4 小程序端：`pages/`

- `pages/tsubasa2/tsubasa2.*`：游戏主页面（`BrowserMini` 封装，Canvas 256×240、触摸 D-pad、A/B/START 虚拟键、1x/满屏切换、NT 测试模式切换）
- `pages/bankpage/*`：bank 调试聚合页（仅调试用）
- `app.json` 已注册 `pages/tsubasa2/tsubasa2`

### 2.5 工具链：`scripts/`（177 个 .cjs）

`verify_all_banks.cjs`（ROM 权威差分）、`export_all_chr_png.cjs`、`generate_script_data.cjs`、
`gen-bank29-roster.cjs`、`gen-bgm-sid.cjs`、`_find_*.cjs`（地址查证）等 —— 全部保留，持续复用。

### 2.6 现有文档

`WBS_PLAN.md`（G1-G37 任务跟踪）、`REFACTOR_PLAN.md`（旧版不一致清单）、`BUGS.md`、`DEVLOG.md`、
`docs/rom-data-locations.md`、`docs/number-display-pipeline.md`。

---

## 三、目标架构（MVC / Spring 风格）

### 3.1 分层

```
┌─────────────────────────────────────────────────────────┐
│ Control  boot（即插即用入口）                              │
│   Tsubasa2 组合根 → interrupts.nmi(frame) → 各 Service    │
├─────────────────────────────────────────────────────────┤
│ Service  code/（= Java Service 层，业务逻辑）              │
│   system/  scene/  story/  player/  team/  match/         │
│   skill/   sprite/  audio/                                │
│   只消费本域 Table 的具名方法 + DataStore，禁止裸地址        │
├─────────────────────────────────────────────────────────┤
│ Model    data/（= Java Model/DAO 层，表结构）              │
│   store/   tables/  scene/  audio/  rom-data/             │
│   声明式数组/对象（从 asm/ROM 提取），只读，static import   │
├─────────────────────────────────────────────────────────┤
│ Engine   core/（= 黑盒渲染/音频硬件，照抄模拟器 1:1）        │
│   ppu/    papu/    nes-ram.ts   mappers/mapper4.ts(数据通路)│
└─────────────────────────────────────────────────────────┘
```

### 3.2 目录规范（遵守 `.codebuddy/rules/新架构命名规范.mdc`）

```
src/game/prg/
├── index.ts            # 出口契约（按业务域 export，禁止裸地址接口）
├── code/               # = service（业务逻辑），按业务域分包
│   ├── system/         # GameSystemService(原bank00) BootRouter HardwareInitService InterruptService PrgBankService
│   ├── scene/          # SceneController(原bank02) Opening/Title/Password/Result/Story 各场景
│   ├── story/          # ScriptEngine / ScriptOpcodes / ScriptLoader / CharMap
│   ├── player/         # PlayerQueryService（原 bank01）
│   ├── team/           # TeamRosterService（原 bank29）
│   ├── match/          # MatchTurnService / MatchAuxService / MatchHudService / MatchEngineService / MatchConfigService
│   ├── skill/          # SkillService（原 bank16）
│   ├── sprite/         # SpriteService / SpriteAnimationService（原 bank22/27）
│   └── audio/          # AudioService（原 bank12）
└── data/               # = model（表结构，ORM 风格）
    ├── store/          # DataStore（= RamStore 封装）
    ├── tables/         # player-table / team-table / skill-table / match-config-table / levelup-table ...
    ├── scene/          # 场景数据（NT/调色板/文本脚本 textscript/scripts-*.ts）
    └── audio/          # 音频数据（bgm/*.ts、se/*.ts、dmc-samples.ts）
```

### 3.3 命名规范（旧名→新名映射）

| 旧名 | 新名 |
|---|---|
| `Bank00Service` | `system/GameSystemService` |
| `Bank02Service` / `DispatchService` | `scene/SceneController` / `system/BootRouter` |
| `Bank30Service` | `system/HardwareInitService` |
| `Bank31Service` / `InterruptService` | `system/InterruptService` |
| `Bank18Service` | `scene/StorySceneController` |
| `ScriptVM/Opcodes/Loader/CharMap` | `story/ScriptEngine/ScriptOpcodes/ScriptLoader/CharMap` |
| `DataQueryService` | `player/PlayerQueryService` |
| `Bank29RosterService` | `team/TeamRosterService` |
| `Bank11/20/24/28Service` | `match/MatchTurnService/MatchAuxService/MatchHudService/MatchConfigService` |
| `Bank16Service` | `skill/SkillService` |
| `Bank22/27Service` | `sprite/SpriteService/SpriteAnimationService` |
| `Bank12AudioService` | `audio/AudioService` |

### 3.4 数据访问规则（ORM/表结构，去 CPU 化）

1. 所有 PRG 数据从 asm/ROM 提取为 TS 声明式数组/对象，**禁止** `PRG_BANK_XX[addr-0xC000]` 裸地址随机访问。
2. Service 只能通过本域 Table 的具名查询方法读数据（`PlayerTable.findById(id)`、`SkillTable.byMoveId(id)`），**禁止**导出 `readByte(addr)`/`readU16(addr)`。
3. 运行时数据统一走 `DataStore`：`store.read('ram_XXXX')` / `store.write('ram_XXXX', v)`，键必须是 4 位大写补零真实地址（`ram_0601`、`ram_0606`、`ram_046F`…）。
4. 跨 bank 共享数据（球员 ID 数组 `ram_0601+`、状态 `ram_0606+`、位置 `ram_060B+`、战术 `ram_0610+X`、HUD `ram_046F+`、经验 `ram_0454+idx*2` 等）必须与消费方一致，不可自创。
5. 禁止 `bankSwitch`/`mmc3Map`/`readMem`/`setPrgBank` 残留；MMC3 寄存器写（`JSR $C4B9`/`STA $8000`）直接省略并注释。

---

## 四、翻译方法论（6502 → TS）

### 4.1 逐指令对照

每个方法必须与 `asm/bankNN/*.s` 逐条对照，分支/循环/进位/取反精确还原，禁止凭猜测。
方法头注释标注对应 asm 地址段（`对应原始 $A01E:`）。

### 4.2 通用映射表

| 6502 语义 | TS 等价 |
|---|---|
| `LDA $XXXX`（读内存） | `store.read('ram_XXXX')` |
| `STA $XXXX`（写内存） | `store.write('ram_XXXX', v)` |
| `LDA #imm` / `STA zp` | 局部变量赋值 |
| `JMP $XXXX` | 方法调用 / 状态机转移 |
| `JSR $XXXX`（子程调用） | 方法调用（对应 asm 子程翻译成私有方法） |
| `RTS` | return |
| `JMP ($XXXX)`（间接跳转表） | 分发表（`const DISPATCH: Record<number, () => void>`）|
| `LDX #n; JSR $C4B9`（切 bank） | **省略**（数据已 import），必要时注释"原切 bankN" |
| 状态机（每帧推进 + 分支） | `switch(state) { case ... }` + 类内 `_state` 字段 |
| 协程（`$9FA8` 让出/`$9F69` spawn） | TypeScript `Generator`（`yield` 内建现场保存） |

### 4.3 数据提取（重中之重）

1. 数据 bank（03-10、13-15、17、18、21、23、25、29 等）→ 直接提取为 TS 声明式数组：
   - 纯数据：`export const BANK17_DATA: readonly number[] = [...]`（8192B 全量）
   - 结构化：`bank06-data.ts` 的 `BANK06_TABLE_LOAD_DATA` / `BANK06_MODE_BLOCK_DATA`
   - 指针表：`bank07 SCENE_PTR_TABLE`、`NMI_CALLBACK_TABLE`（bank2 $A491，24 项）
   - metatile 字典：`bank08-map-metatile.ts`（482 条 × 17B 记录）
   - 文本脚本：`scene/textscript/scripts-bank-0[3-6].ts`（场景段格式）
2. 提取后用 `scripts/verify_all_banks.cjs` 与 **ROM 原始字节**（`docs/roms/Captain Tsubasa II - Super Striker (Japan).nes`）差分，diff=0 才收工。
3. 反汇编器会把子程入口误标为 `.byte` 数据（例：$A721 实际是 bank01 的 $8721 入口 JSR $9BA0）。
   查证归属必须先做基址换算（$8000 基址 ↔ $A000 窗口偏移），再按换算后地址搜代码段。

### 4.4 控制流翻译

- **场景路由器**（bank02 $8484 分发器 → $A491 表 24 项）→ `SceneController` 分发表，`ram_00ED` = 当前场景索引。
- **NMI 回调表**（bank2 $A491，24 个入口指向 bank0 代码）→ `NmiCallbackIndex` 枚举 + 分发表。
- **主循环**（bank0 $9EED-$9F0C 协程调度器）→ `GameSystemService._runCoroutineLoop`（6 槽 Generator 轮转）。
- **脚本 VM**（bank0 opcode 解释器）→ `ScriptEngine`（`update()` 帧驱动 + opcode 分发表）。

### 4.5 节奏（每 bank 一个循环）

1. **先写 stub**：类声明 + 方法签名 + TODO，保留导出契约（`code/index.ts`）。
2. **逐个覆盖**：按 asm 段顺序，一个功能写完再写下一个，每批编译验证。
3. **每批验证**：`npx tsc -p tsconfig.json --noEmit` 零错误。
4. **差分验证**：有内嵌数组的 bank 跑 `scripts/verify_all_banks.cjs`；逻辑 bank 用 `_tmp_*.cjs` 状态断言。

---

## 五、模拟器复用与裁剪（core 的边界）

### 5.1 保留（照抄 1:1，禁止蔓延性改动）

- `core/ppu/`：VRAM/nametable/OAM/palette/scroll + 扫描线渲染 —— H5 版 `writeStoreToPpu` 把 DataStore 灌入 PPU 内存后原样渲染。
- `core/papu/`：音频合成 —— `writeApuToPapu` 把 DataStore `apu_XXXX` 灌入 PAPU。
- `core/nes-ram.ts`：`ShadowOam`（影子 OAM → 硬件 OAM DMA 语义）、`PaletteTable`、`NameTableEntry` 等数据结构。
- `core/browser-mini/`：小程序外壳（帧定时/触摸/音频/Canvas 写入）。
- `core/mappers/mapper4.ts`：**只保留 bank 映射数据通路**（`prgBankMap` 查询窗口→bank 索引→读 PRG 数据），去掉 `requestIrq` 等 CPU 依赖，用回调/事件委托替代。
- `core/debug/disasm.ts`：排查工具（对运行时内存反汇编，用于定位翻译错误）。

### 5.2 移除 / 不再驱动

- `core/cpu.ts` 的 6502 指令执行（opcode 表、fetch-decode-execute）。
- `bankSwitch` / `mmc3Map` / `readMem(addr)` 内存窗口访问。
- CPU 级 PPU/APU 寄存器写入（改为 DataStore → 直写语义）。

### 5.3 桥接（DataStore ↔ 渲染/音频）

```
每帧 NMI:
  interrupts.nmi(frame)          # 游戏逻辑推进（各 Service）
  audio.update()                 # bank12 音频引擎读 $0700 请求队列 → APU 寄存器
  writeStoreToPpu(store, ppu)    # NT/调色板/OAM/滚动/CHR pattern → PPU 内存
  writeApuToPapu(store, papu)    # apu_XXXX → PAPU
  ppu.startFrame→advanceDots→renderFramePartially→endFrame   # 扫描线渲染
```

---

## 六、微信小程序适配

| 项 | 方案 |
|---|---|
| 渲染 | 单 Canvas（256×240 内部分辨率），`BrowserMini` + `ScreenMini.fitInParent` 等比缩放；`canvas.getContext('2d')` 每帧 `putImageData`/`drawImage` |
| 帧循环 | `wx.createSelectorQuery` 取 Canvas node → `requestAnimationFrame`/`setInterval` 驱动 `Tsubasa2.frame()`（60fps） |
| 输入 | 触摸分区 D-pad（`InputMini.dPadMask`）+ A/B/START 虚拟键；`onTouchStart/Move/End` → `input.setMask/press/release` |
| 音频 | `papu` 合成 → `wx.createWebAudioContext`（或 `InnerAudioContext` 播 WAV）；`browser-mini/speakers.ts` |
| 体积 | CHR 16 bank 已拆独立文件；数据 bank 全量 8KB×N 可接受；**超大场景脚本/音频样本走分包或 CDN 懒加载**（微信主包 < 2MB 限制） |
| 调试 | `pages/bankpage` 保留为调试入口；`setData` 仅更新状态文本（Canvas 不走 setData，避免卡顿） |

---

## 七、分阶段实施计划

### P0 恢复基线（当前中间态，最高优先级）

| # | 任务 | 产出 | 验证 |
|---|---|---|---|
| 0.1 | 从 `src/game/prg/prg.rar` 解压恢复 `code/` 与 `data/` 全部实现文件 | `prg/code/system/*.ts` 等 30+ 文件 | 目录齐全 |
| 0.2 | 修复断链：`game/index.ts` / `prg/code/index.ts` 的 import 指向恢复后的真实文件；缺失的 `game/rom.ts`（PRG 数据聚合）补回 | `tsc --noEmit` 零错误 | `npx tsc -p tsconfig.json --noEmit` |
| 0.3 | 确认 `game/index.ts` Tsubasa2 组合根 6 个 Service 实例化 + 注入链完整 | boot() 可跑 | `_tmp_*.cjs` 冒烟 |

### P1 bank 翻译（已大部分完成，按 WBS 补漏）

| 状态 | Bank | 说明 |
|---|---|---|
| ✅ | 00 | GameSystemService（主循环/协程/渲染原语） |
| ✅ | 01 | PlayerQueryService（选项屏/数据查询） |
| ✅ | 02 | SceneController（场景分发/密码） |
| ✅ | 03-06 | 剧情脚本数据（102 个脚本场景段 + bank06 调色板） |
| ✅ | 07/08 | 场景描述符 / 地图 metatile 字典 |
| ✅ | 11/16/20/24/26/27/28/29 | 比赛全家桶 |
| ✅ | 12 | AudioService + BGM/SE 数据 |
| ✅ | 18/19 | 剧情场景/辅助 |
| ✅ | 30/31 | HardwareInitService / InterruptService |
| ⬜ | 13-15 | 音频 BGM 数据校准（bank17 数据待接入音频引擎） |
| ⬜ | 其余 | 按 `verify_all_banks.cjs` SKIP 清单逐项确认 |

### P2 场景链路打通（部分已完成）

- ✅ BOOT→TITLE→MEETING→STORY→MATCH→RESULT→PASSWORD 路由（`SceneController` + 24 项分发）
- ⬜ 密码校验真实算法（`$A3D8-$A454` 未反汇编段，待 tsnes trace START 帧）
- ⬜ STORY 章节选择 → 章节场景段映射（`CHAPTER_SCENE_IDX` 待 trace 确认）
- ⬜ 开场动画打磨（40 精灵 CHR bank10/14 加载）

### P3 资源化与差分验证全量

- ✅ `scripts/export_all_chr_png.cjs` 32 张 PNG
- ⬜ 全 bank 差分验证覆盖到 100%（当前 19 PASS / 13 SKIP）
- ⬜ 微信开发者工具真机跑通开场→标题→比赛

### P4 优化重构

- ⬜ 包体积优化（分包/懒加载/按需 import）
- ⬜ UI 打磨（虚拟键布局/触觉反馈/存档）
- ⬜ 帧率优化（渲染缓冲复用、避免每帧 GC）

---

## 八、验证与验收标准

1. **编译**：`npx tsc -p tsconfig.json --noEmit` 零错误（含微信小程序项目）。
2. **差分**：`scripts/verify_all_banks.cjs` 数据 bank 与 ROM 逐字节 diff=0。
3. **冒烟**：`_tmp_g*.cjs` 状态断言（NT 非零、调色板渐显、精灵数、脚本指针推进、buffer 非黑）。
4. **对照**：相同输入下与 tsnes 模拟器对比 RAM/画面，差异即翻译错误（环境 1:1，错误必在 PRG 翻译层）。
5. **实测**：微信开发者工具运行 `pages/tsubasa2`，开场自动播放→按 START→标题菜单→比赛，无黑屏/卡死/报错。

---

## 九、风险与对策

| 风险 | 对策 |
|---|---|
| `prg.rar` 内源码版本与当前 `game/index.ts` 组合根不匹配 | 解压后先跑 tsc + 冒烟，按断链报错逐个对齐签名 |
| 反汇编器把代码误标 `.byte`（子程入口缺失） | 用 `core/debug/disasm.ts` 对运行时内存反汇编补全；先基址换算再查归属 |
| 跨 bank 共享地址不自洽（自创键） | 遵守 3.4 规则，共享区与消费方逐一核对 |
| 帧率不足（每帧全量写 PPU） | 只写脏区（NT/OAM 变化标志），渲染缓冲复用 |
| 小程序主包超 2MB | 数据 bank 拆分包/CDN，CHR 按需加载 |
| 场景卡死/黑屏 | 帧守卫（超时降级）+ tsnes 对照排查（同输入同 RAM，差异=翻译错误） |

---

## 十、配套参考

- `WBS_PLAN.md` — 逐 bank 任务跟踪（G1-G37）
- `REFACTOR_PLAN.md` — 旧版与 ROM 不一致清单
- `BUGS.md` / `BUGS_OPENING.md` — 已知问题与修复记录
- `DEVLOG.md` — 开发日志
- `docs/rom-data-locations.md` — 角色/数值/升级/必杀技 ROM 地址
- `docs/number-display-pipeline.md` — 数值显示链路
- `.codebuddy/rules/新架构命名规范.mdc` — 命名/目录/数据访问硬规则
- `.codebuddy/agents/*.md` — 各 bank 翻译/修复工程师 agent
