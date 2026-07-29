# Bank Translation Plan — 天使之翼2 6502 → TypeScript 翻译进度

## 总体状态：25.0% 完成 | 整合测试 21/21 ✅ | 画面渲染 ❌

> **第二阶段目标**: 补全缺失模块 → 启动流程运转 → TECMO logo 出现

---

## 一、逐 Bank 对照表（hex2asm → game-engine 一对一映射）

### CODE Banks（15 个）

| # | hex2asm 源文件 | game-engine 目标 | 代码行数 | 功能 | 状态 | 完成度 |
|---|---------------|-----------------|---------|------|------|--------|
| 00 | `prg_bank_00_dispatch_scene_engine.ts` | `bank-00.ts` | 2968 | 场景分派 + 字节码解释器 + 精灵动画 | ✅ 已译 | ~70%* |
| 01 | `prg_bank_01_match_jump.ts` | `bank-01.ts` | 981 | 比赛跳跃/物理引擎 + 标题画面渲染 | ✅ 已译 | ~80% |
| 02 | `prg_bank_02_nmi_renderer.ts` | `bank-02.ts` | 686 | NMI 渲染器 + PPU 更新 + 手柄输入 | ✅ 已译 | ~85% |
| 11 | `prg_bank_11_background.ts` | — | — | 背景/瓦片渲染引擎 | ❌ 未建模块 | 0% |
| 12 | `prg_bank_12_audio.ts` | `bank-12.ts` | 1737 | 音讯引擎 MML 解析器 + APU 写入 | ✅ 已译 | ~90% |
| 16 | `prg_bank_16_scene_logic.ts` | — | — | 场景渲染/脚本引擎 | ❌ 未建模块 | 0% |
| 19 | `prg_bank_19_lookup_tables.ts` | — | — | 辅助数据/查找表 | ❌ 未建模块 | 0% |
| 20 | `prg_bank_20_team_data.ts` | — | — | 队伍/球员选择逻辑 | ❌ 未建模块 | 0% |
| 22 | `prg_bank_22_sprite_engine.ts` | — | — | 精灵/OAM 处理引擎 | ❌ 未建模块 | 0% |
| 24 | `prg_bank_24_cutscene.ts` | — | — | 过场动画/比赛场景控制 | ❌ 未建模块 | 0% |
| 26 | `prg_bank_26_match_core.ts` | — | — | 核心比赛引擎 | ❌ 未建模块 | 0% |
| 27 | `prg_bank_27_player_data.ts` | — | — | 球员数据查询 | ❌ 未建模块 | 0% |
| 28 | `prg_bank_28_attributes.ts` | — | — | 球员属性计算 | ❌ 未建模块 | 0% |
| 30 | `prg_bank_30_system_lib.ts` | `bank-30.ts` | 4320 | 系统库（37 CODE 块） | ✅ 已译 | ~60%† |
| 31 | `prg_bank_31_boot_vectors.ts` | `bank-31.ts` | 1339 | 启动向量 + 赛场主循环 | ✅ 已译 | ~50%‡ |

> \* bank-00: 自身函数完整，但依赖 bank-16/24/26 的场景切换未串联  
> † bank-30: 约 15 个 CODE 块仍为 stub  
> ‡ bank-31: 18 个 `_call_bank00_XX` 函数全为 `{}` 空体

### DATA Banks（17 个）

| # | hex2asm 源文件 | game-engine 目标 | 状态 | 完成度 |
|---|---------------|-----------------|------|--------|
| 03 | `prg_bank_03_data.ts` | — | ❌ 未建模块 | 0% |
| 04 | `prg_bank_04_data.ts` | — | ❌ 未建模块 | 0% |
| 05 | `prg_bank_05_data.ts` | — | ❌ 未建模块 | 0% |
| 06 | `prg_bank_06_palette_data.ts` | `bank-06.ts` + `bank-06-data.ts` | ✅ 已译 | 100% |
| 07 | `prg_bank_07_sprite_data.ts` | — | ❌ 未建模块 | 0% |
| 08 | `prg_bank_08_data.ts` | — | ❌ 未建模块 | 0% |
| 09 | `prg_bank_09_data.ts` | — | ❌ 未建模块 | 0% |
| 10 | `prg_bank_10_data.ts` | — | ❌ 未建模块 | 0% |
| 13 | `prg_bank_13_data.ts` | — | ❌ 未建模块 | 0% |
| 14 | `prg_bank_14_data.ts` | — | ❌ 未建模块 | 0% |
| 15 | `prg_bank_15_data.ts` | `bank-15.ts` + `bank-15-data.ts` | ✅ 已译 | 100% |
| 17 | `prg_bank_17_data.ts` | — | ❌ 未建模块 | 0% |
| 18 | `prg_bank_18_data.ts` | — | ❌ 未建模块 | 0% |
| 21 | `prg_bank_21_data.ts` | — | ❌ 未建模块 | 0% |
| 23 | `prg_bank_23_data.ts` | — | ❌ 未建模块 | 0% |
| 25 | `prg_bank_25_data.ts` | — | ❌ 未建模块 | 0% |
| 29 | `prg_bank_29_data.ts` | — | ❌ 未建模块 | 0% |

### 已有辅助文件（非 hex2asm 直接对应）

| 文件 | 大小 | 说明 |
|------|------|------|
| `bank-01-data.ts` | 49 KB | bank-01 引用数据（来源待确认） |
| `bank-01-tables.ts` | 10 KB | bank-01 查找表 |
| `bank-02-data.ts` | 49 KB | bank-02 引用数据 |
| `system-state.ts` | 7 KB | 共享状态 + MMC3 映射 |
| `event-bus.ts` | 5 KB | 事件总线 |
| `debug-log.ts` | 2 KB | 调试日志 |

---

## 二、完成度统计（百分比）

### 按模块数量

| 维度 | 已完成 | 总数 | 百分比 |
|------|--------|------|--------|
| **全部 32 bank** | 8 | 32 | **25.0%** |
| **CODE bank（核心）** | 6 | 15 | **40.0%** |
| **DATA bank（纯数据）** | 2 | 17 | **11.8%** |

### 按 ROM 体积

| 维度 | 已译 KB | 总 KB | 百分比 |
|------|---------|-------|--------|
| 全部 ROM | ~451 | ~1,811 | **24.9%** |
| CODE bank | ~347 | ~903 | **38.4%** |
| DATA bank | ~104 | ~908 | **11.5%** |

### 按运行时代码路径覆盖

| 路径 | 覆盖 | 说明 |
|------|------|------|
| RESET → PPU 初始化 | ✅ 100% | `initScene_$C64E` → `ppuScreenInit` → `clearOam` |
| RESET → bank00 dispatch | ⚠️ 链路通 | `entryToBank00_dispatch` 存在但内部 stub |
| TECMO logo 场景 | ❌ 0% | 字節碼解釋器依赖 bank-16/24 |
| 标题画面 | ❌ 0% | 依赖 bank-11 背景渲染 |
| 菜单交互 | ❌ 0% | bank-00 菜单逻辑依赖 bank-01 数据 |
| 比赛主循环 | ⚠️ 骨架 | `tick_BANK31_mainLoop` 可运行但 _call_bank00_XX 全空 |
| 球员逻辑 | ⚠️ 部分 | 依赖 bank-26/27/28 |
| 音频播放 | ✅ ~90% | bank-12 独立运作 |
| NMI 渲染器 | ✅ ~85% | PPU 数据搬运 OK，$0628 标记有问题 |

> **实际可运行路径覆盖: ~15-18%**

---

## 三、内存架构分析

### 双路径内存模型

```
CPU 模拟器路径 (src/cpu.ts):
  cpu.mem = new Uint8Array(0x10000)   ← 64KB
  mapper.load8kRomBank() → copyArrayElements → cpu.mem[$8000-$FFFF]
  CPU.load/write → cpu.mem[addr & 0x7FF]  (仅处理 $0000-$1FFF)

翻译路径 (system-state.ts):
  sys.mem = new Uint8Array(0x10000)    ← 64KB
  bankRomTable[bankIdx][offset]        ← ROM 数据独立存储
  readMem/writeMem → sys.mem[addr & 0x07FF] (RAM) + MMC3 (ROM via table)
```

### 结论

| 检查项 | 结果 | 说明 |
|--------|------|------|
| 数组大小 | ✅ 一致 | 两路径均为 `new Uint8Array(0x10000)` |
| $8000-$FFFF ROM 数据 | ✅ 等效 | CPU 路径直接复制进 mem；翻译路径 via bankRomTable 间接读 |
| RAM 镜像 ($0000-$1FFF) | ✅ 一致 | 两路径均用 `addr & 0x7FF` / `addr & 0x07FF` |
| 直接 sys.mem 访问越界 | ⚠️ 部分 | 部分代码用 `& 0xFFFF` 防护，部分未防护。地址范围均在设计内 |
| $6000-$7FFF PRG-RAM | ⚠️ 翻译路径缺失 | readMem 对该区域返回 0；CPU 路径可读写 |
| sys.mem[$8000-$FFFF] 浪费 | ℹ️ 设计如此 | 翻译路径 ROM 数据在 bankRomTable 中，不在 sys.mem 中 |

---

## 四、BUG 清单（第一阶段遗留）

| BUG | 严重度 | 描述 | 状态 |
|-----|--------|------|------|
| BUG-012 | **P0** | bank-31 中 18 个 `_call_bank00_XX` 全为空 stub `{}` | ❌ |
| BUG-013 | **P0** | 启动流程：CPU 走 ROM 完整启动 → Bank 跳过启动直进 match loop | ❌ |
| BUG-014 | P1 | `tick_BANK31_mainLoop` 非比赛上下文覆盖 $0628 | ❌ |
| BUG-015 | P1 | NMI 初始化泄漏 → 已修复 ✅ | ✅ |
| BUG-016 | P0 | ppuScrollUpdate 未调用 → 已修复 ✅ | ✅ |
| BUG-017 | P0 | initScene→dispatch 断链 → 链路已接，内部 stub 待填 | ⚠️ |
| BUG-018 | P2 | NMI 两路数据源不同 → 澄清：各自独立管線，非 bug | ℹ️ |

---

## 五、第二阶段行动计划

### 优先级 P0 — 让画面出现

1. **建立 15 个缺失 DATA bank 模块**（bank-03/04/05/07/08/09/10/13/14/17/18/21/23/25/29）
   - 全部为纯 hex 数组，每个约 8KB，可直接从 hex2asm 导出再包装
   - 预计工作量：自动化模板生成

2. **建立 9 个缺失 CODE bank 模块**的关键部分
   - **bank-26**（核心比赛引擎）— P0，被 bank-31 大量调用
   - **bank-16**（场景逻辑/脚本引擎）— P0，TECMO logo 依赖
   - **bank-24**（过场动画）— P1，场景切换依赖
   - **bank-11**（背景渲染）— P1，标题画面依赖
   - bank-19/20/22/27/28 — P2

3. **填充 bank-31 的 18 个空 stub**（BUG-012）
   - 这些 stub 最终会调用 bank-00 的不同入口，而 bank-00 又需要 bank-16/24/26 的配合

4. **补齐 bank-30 的 15 个未翻译 CODE 块**
   - 手柄输入更新、定时器调度器、Sprite DMA 等已译但未接入

5. **修复 BUG-013**：让启动流程走完 TECMO logo → 标题画面 → 菜单

### 优先级 P1 — 画面正确

6. **修复 BUG-014**：`tick_BANK31_mainLoop` 场景 flag 保护

### 优先级 P2 — 对比验证

7. 用 h5-compare 逐帧对比 Bank 引擎 vs CPU 模拟器的 PPU 输出

---

## 六、阶段

1. ✅ 各 bank 独立翻译完成 (8 个 bank)
2. ✅ 跨 bank 整合验证 + 清理 mock
3. ✅ 完整测试 → 21/21 通过
4. ✅ 建立 BUG 文檔
5. 🔄 **第二阶段：补全 24 个缺失模块 + 修复 P0 BUG → 目标：TECMO logo 出现**
6. ⏳ 逐帧对比验证 Bank vs CPU 模拟器
7. ⏳ 全场景可玩（标题→菜单→比赛）
