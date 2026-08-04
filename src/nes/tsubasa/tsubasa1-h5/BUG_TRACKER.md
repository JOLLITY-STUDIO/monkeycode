# Bug 跟踪记录

> 项目: 天使之翼 微信小程序 | 创建: 2026-08-04

---

## 🔴 BUG-025: OpeningScenePlayer.applyScene 从未被调用 [已修复]

### BUG-025: isFirstFrame 逻辑错误 → 开场动画CHR Bank 从未切换 [🟢 已修复]
- **状态**: 🟢 已修复 (2026-08-05)
- **严重度**: 🔴 高 (开场动画无画面)
- **来源**: 代码审查 (M_INFRA.5 重构)
- **描述**: `OpeningScenePlayer.processScene()` 中:
  ```typescript
  // ❌ 永远为 false
  const isFirstFrame = (this.subState !== this.data.read(0x03CB));
  ```
  因为在 `update()` 开头: `this.subState = this.data.read(0x03CB)`，导致 `isFirstFrame` 始终为 `false`，`applyScene()` 从未被调用，6 个分镜的 CHR Bank 配置从未生效。
- **修复**: 新增 `lastSubState` 字段，在 `update()` 中保存上一帧状态:
  ```typescript
  this.lastSubState = this.subState;
  this.subState = this.data.read(0x03CB);
  // 子状态变化检测
  if (this.subState !== this.lastSubState) { this.frameCounter = 0; }
  ```
  然后 `processScene` 中: `const isFirstFrame = (this.subState !== this.lastSubState)`.
- **修复文件**: `src/engine/OpeningScenePlayer.ts`
- **影响范围**: 开场动画 6 个分镜 (现在正确切换 CHR Bank)

---

## 🔴 BUG-024: Renderer tileBase 计算错误导致 tile 索引偏移 [已修复]

### BUG-024: `(chrBank & 1) * 128` 只取 CHR bank 最低位，完全错误 [🟢 已修复]
- **状态**: 🟢 已修复 (2026-08-05)
- **严重度**: 🔴 高 (渲染管线 bug)
- **来源**: 代码审查 (M_INFRA.1 重构)
- **描述**: `Renderer.renderBackgroundToBuf()` 和 `renderSpritesToBuf()` 中:
  ```typescript
  // ❌ 错误
  const tileBase = (bgChrBank & 1) * 128;
  // 如果 chrBank = 0x1E (30), tileBase = (30 & 1) * 128 = 0
  // 如果 chrBank = 0x1F (31), tileBase = (31 & 1) * 128 = 128
  // 这导致 bank 31 的 tile 0 被当作 tile 128 来查！
  ```
  MMC1 4KB 模式下，每个 CHR bank 有完整的 256 tiles (0-255)。tile 索引从 nametable 读出的值直接使用，不需要偏移。
- **修复**: `tileBase` → `0` (tile 索引不偏移)，CHR bank 编号正确传递给 TileStore.getTileRow()
- **修复文件**: `src/renderer/Renderer.ts` (renderBackgroundToBuf + renderSpritesToBuf)
- **影响范围**: 所有使用 CHR bank ≥ 1 的场景（标题、菜单、比赛均受影响）

---

## 🔴 BUG-023: 微信小程序 MpAudioParam 无法设置 GainNode.gain [已修复]

### BUG-023: MpAudioParam.value setter 尝试覆盖 GainNode.gain 属性 [🔴 已修复]
- **状态**: 🔴 已修复 (2026-08-05)
- **严重度**: 🔴 高 (游戏启动即崩溃)
- **来源**: 微信开发者工具运行时错误
- **错误信息**: `TypeError: Cannot set property gain of [object GainNode] which has only a getter`
- **调用栈**: `MpAudioParam.set (MpPlatform.ts:208)` → `ApuSimulator.constructor (ApuSimulator.ts:159)` → `Tsubasa.initialize (Tsubasa.ts:148)` → `Tsubasa.constructor (Tsubasa.ts:99)`
- **根因**: `MpAudioParam` 的 setter 设计有误：
  ```typescript
  // 错误：尝试在 GainNode 上直接覆盖 gain 属性
  this._target[this._prop] = v;  // → gainNode['gain'] = 0.5
  ```
  在微信小程序的 WebAudio 实现中，`GainNode.gain` 是只读属性（getter-only，返回 AudioParam 对象），不能被直接替换。标准 Web Audio API 也是如此——应该通过 `AudioParam.value` 来设置值。
- **修复**: 改为存储 AudioParam 对象本身（`node.gain`），然后通过 `_param.value = v` 设置：
  ```typescript
  constructor(target: any, prop: string) {
    this._param = target[prop]; // 提取 AudioParam 对象
  }
  set value(v: number) {
    this._param.value = v; // 设置 AudioParam.value，而非替换父节点属性
  }
  ```
  并添加 `try/catch` 回退到 `setValueAtTime(v, 0)` 以应对极端情况。
- **修复文件**: `src/platform/miniprogram/MpPlatform.ts` — `MpAudioParam` 类重写
- **影响范围**: `MpGainNode` (GainNode.gain) 和 `MpOscillatorNode` (OscillatorNode.frequency) 均使用 `MpAudioParam`，一并修复。

---

## 🟡 BUG-021: 音频系统完全缺失

### BUG-021: 项目无任何音频模块 [🟡 中严重度]
- **状态**: 🟡 部分修复 (2026-08-05)
- **严重度**: 🟡 中 (游戏可玩但静音，功能不完整)
- **来源**: 用户反馈 (2026-08-05)
- **描述**: 项目从未规划音频模块。ARCHITECTURE.md、WBS_TASKS.md、ROM_STRUCTURE_REPORT.md 均无 audio/sound/music/APU 相关内容。
- **影响**: 游戏完全无声——无BGM、无音效、无菜单提示音。NES 原版有完整的音乐和音效系统。
- **ASM 依据**: Bank 1 `$9B00-$9FFF` 包含完整的 NES APU 音频引擎：
  - 4通道处理 (Pulse 1/2, Triangle, Noise)
  - 音乐播放器 (序列数据 → $4000-$4003 寄存器写入)
  - 音效触发 (`$07F9` 标志位, `$9CEC` SoundInit)
  - 操作码分发跳转表 (`$DC64`, 8条目)
  - 音乐指针表 (`$E1A8`, 每个曲目2字节指针)
- **计划修复**: 新增 M_AUDIO 里程碑 (8个任务, ~29h)，纳入 WBS_TASKS.md
  - ✅ M_AUDIO.6: NMI 集成 (2026-08-05 完成 — 音频已接入 GameLoop 阶段1)
  - ⬜ M_AUDIO.1: Bank 1 音频引擎 ASM 完整分析
  - ⬜ M_AUDIO.2: ApuSimulator (Web Audio API) — 已有基础实现
  - ⬜ M_AUDIO.3: AudioEngine (音乐播放逻辑) — 已有基础实现
  - ⬜ M_AUDIO.4: 音乐数据提取
  - ⬜ M_AUDIO.5: 音效系统
  - ⬜ M_AUDIO.7: 小程序兼容
  - ⬜ M_AUDIO.8: 音频测试
- **参考文件**: ROM_STRUCTURE_REPORT.md (新增 §8.5 音频引擎), ARCHITECTURE.md (新增 audio/ 目录)

---

## 🟢 BUG-022: 音频引擎未接入 GameLoop 帧循环 [已修复]

### BUG-022: 音频同步机制缺失 [🟢 已修复]
- **状态**: 🟢 已修复 (2026-08-05)
- **严重度**: 🔴 高 (音频代码存在但从未执行)
- **来源**: 用户反馈 (2026-08-05): "音频播放和画面渲染、游戏逻辑要同步处理"
- **描述**: `AudioEngine` 和 `ApuSimulator` 代码已经实现（~565行 + ~675行），但完全未接入 GameLoop：
  - `GameLoop.ts` 阶段1 没有音频更新调用
  - `Tsubasa.ts` 从未创建 `AudioEngine`/`ApuSimulator`
  - `IPlatform` 没有音频上下文抽象
  - `step()` 手动步进也没有音频更新
- **根因**: M_AUDIO 里程碑规划了音频模块，但只实现了核心类（ApuSimulator, AudioEngine），从未将它们接入帧循环。
- **ASM 依据**: NES 中音频引擎 `$9B00 SoundFrameUpdate` 在 NMI 期间被调用，与 PPU 数据填充（OAM DMA、VRAM 写入）在同一阶段。
- **修复内容**:
  1. ✅ `IPlatform.ts`: 添加 `createAudioContext()` 方法和 `IPlatformAudioContext` 等音频接口
  2. ✅ `MpPlatform.ts`: 实现 `createAudioContext()` (使用 `wx.createWebAudioContext`)
  3. ✅ `ApuSimulator.ts`: 重构为使用平台层 `IPlatformAudioContext` 类型（消除重复定义）
  4. ✅ `GameLoop.ts`: 构造函数接受 `AudioEngine | null`，阶段1 调用 `audioEngine.update()`
  5. ✅ `Tsubasa.ts`: 创建完整音频管线（Platform AudioContext → ApuSimulator → AudioEngine → GameLoop）
  6. ✅ `Tsubasa.step()`: 手动帧步进也包含音频更新
- **帧同步时序**:
  ```
  每帧 RAF 回调:
    阶段1: PPU数据填充 + 🆕 AudioEngine.update()  (音画同步)
    阶段2: 游戏逻辑更新
    阶段3: 场景构建 (Model → VRAM+OAM)
    阶段4: Canvas渲染
  ```
- **变更文件**:
  - `src/platform/IPlatform.ts` — 新增音频接口
  - `src/platform/miniprogram/MpPlatform.ts` — 实现音频上下文创建
  - `src/audio/ApuSimulator.ts` — 使用平台类型
  - `src/core/GameLoop.ts` — 阶段1 音频更新
  - `src/core/Tsubasa.ts` — 音频管线创建+注入
- **已知限制**: 音乐数据 (`MusicData.ts`) 仍为占位空序列，待 M_AUDIO.4 从 ROM 提取

---

## 🔴🔴🔴 BUG-020: STATE_DISPATCH_MAP 8个状态7个映射错误 (架构级Bug)

### BUG-020: StateMachine 的 STATE_DISPATCH_MAP 与 ASM 实际跳转表严重不符 [🔴🔴🔴 最高严重度]
- **状态**: 🟢 已修复 (2026-08-05, M2-R.1/M2-R.2 完成)
- **严重度**: 🔴🔴🔴 最高 (架构崩溃 → 已重建)
- **来源**: 用户反馈 + ASM验证 (2026-08-05)
- **WBS回退**: M2/M3/M4/M4A 四个里程碑已回退，M2-R.1/M2-R.2 已完成。

- **修复内容 (2026-08-05)**:
  1. ✅ **M2-R.1**: 从 ASM 源码完整分析 $81F7 状态调度器
     - 跳转表 $81FD-$820C: 8 条目完全解码
     - $84D2 函数 ($84D2-$84EC): 高4位=PRG Bank, 低4位=Sub-state
     - State 3 ($85CD): 比赛初始化, 自动→State 4
     - State 4 ($87B9): 比赛主循环 (直接代码)
     - State 5 ($820D): 状态转换管理器 (交通指挥)
     - State 6 ($8264): Bank 6 sub 3 (事件处理)
     - State 7 ($8270): Bank 6 sub 1 (比赛结果)
  2. ✅ **M2-R.2**: StateMachine 完全重写
     - STATE_TABLE 与 ASM 完全一致
     - 区分 'dispatch' 和 'direct' 两种状态类型
     - 无 State 8 (ASM 中不存在)
  3. ✅ 移除所有 State 8 引用 (Tsubasa.ts, AutoPlayController.ts, auto_play_test.py)
  4. ✅ DataCache.initMatchRam() 实现 State 3 的 RAM 初始化逻辑

- **影响文件**:
  - `src/engine/StateMachine.ts` — 完全重写
  - `src/cache/DataCache.ts` — 添加 initMatchRam()
  - `src/core/Tsubasa.ts` — 移除 State 8 注册
  - `src/engine/AutoPlayController.ts` — 移除 State 8 处理
  - `src/engine/states/index.ts` — 移除 State 8 导出
  - `scripts/auto_play_test.py` — 修复状态流转

- **分析文档**: `temp/STATE_DISPATCHER_ANALYSIS.md`
- **描述**: `StateMachine.ts` 中的 `STATE_DISPATCH_MAP` 与 ASM `$81FD` 跳转表几乎全部不匹配。

  实际 ASM 跳转表（从 `bank_00_code.asm` $81FD-$820C 读取）:
  | State | ASM入口 | 跳转代码 | 实际Bank/Sub |
  |-------|---------|---------|-------------|
  | 0 | $82A1 | LDA #$10 | Bank 1, sub 0 |
  | 1 | $82A7 | LDA #$5D | Bank 5, sub D |
  | 2 | $8276 | LDA #$60 | Bank 6, sub 0 |
  | 3 | $85CD | ...LDA #$5A | Bank 5, sub A |
  | 4 | $87B9 | 比赛主循环(无$84D2) | n/a |
  | 5 | $820D | 状态转换器(无$84D2) | n/a |
  | 6 | $8264 | LDA #$63 | Bank 6, sub 3 |
  | 7 | $8270 | LDA #$61 | Bank 6, sub 1 |

  TS 当前映射:
  | State | TS bankId | TS subId | 实际 bankId | 实际 subId | 匹配? |
  |-------|----------|---------|------------|-----------|--------|
  | 0 | 1 | 0 | 1 | 0 | ✅ |
  | 1 | 1 | 2 | 5 | D (13) | ❌ |
  | 2 | 1 | 5 | 6 | 0 | ❌ |
  | 3 | 1 | 6 | 5 | A (10) | ❌ |
  | 4 | 4 | 0 | n/a | n/a | ❌ |
  | 5 | 4 | 1 | n/a | n/a | ❌ |
  | 6 | 4 | 2 | 6 | 3 | ❌ |
  | 7 | 4 | 3 | 6 | 1 | ❌ |
  | 8 | 1 | 7 | 不存在 | 不存在 | ❌(多余) |

  **8个映射7个错误 + 1个多余 = 全部错误。**

- **根因**: 没有先分析ASM再写代码。看到Bank 1有跳转表就假设所有状态都在Bank 1。
- **影响**: 整个状态机架构是建立在错误假设之上的。所有状态流转逻辑都需要从ASM重新验证。
- **修复计划**: 从ASM出发重新分析每个状态的实际行为，然后重写 StateMachine + 各State。

---

## v1.3.0 修复 - start() 空比赛序列导致崩溃

### BUG-019: getCurrentMatch() 返回 null 时未做空值检查导致启动崩溃 [✅ 已修复 v1.3.0]
- **状态**: ✅ 已修复 (v1.3.0)
- **严重度**: 🔴 严重 (阻塞性)
- **来源**: 用户反馈 (2026-08-05)
- **错误信息**: `TypeError: Cannot read property 'playerTeamName' of null at Tsubasa._callee$ (Tsubasa.ts:190)`
- **根因**: `MatchSequence.ts` 中 `FULL_MATCH_SEQUENCE = []` (空数组，待ROM提取)，导致 `ProgressManager.getCurrentMatch()` 返回 `null`。`Tsubasa.ts:190` 直接访问 `firstMatch.playerTeamName` 没有空值保护。
- **修复**: `Tsubasa.ts:190-191` 添加可选链和空值合并: `firstMatch?.playerTeamName ?? 'Nankatsu'` / `firstMatch?.opponentName ?? 'Opponent'`
- **修复文件**: `src/core/Tsubasa.ts` (line 190-191)
- **影响**: 这是 BUG-018 (编造数据) 的直接后果 — 比赛序列数据尚未从 ROM 提取，但 `start()` 方法在缺少数据时应该能优雅降级而不是崩溃。

---

## 🔴🔴🔴 v0.8.0 严重问题 — 大量数据是编造的 (BUG-018)

### BUG-018: 多个数据文件包含伪造内容，不是来自ROM [🔴🔴🔴 最高严重度]
- **状态**: 🔴 打开 (修复中)
- **严重度**: 🔴🔴🔴 最高 (数据可信度崩溃)
- **来源**: 用户反馈 (2026-08-05)
- **描述**:
  在没有深入分析 ROM 实际数据的情况下，编造了以下内容：
  1. **PlayerData.ts**: 球员名字是编造的罗马音，球队分配错误（如早田在東一中不在南葛），属性值全部是猜测值
  2. **MatchSequence.ts**: 对手列表完全错误 — 列出了"希臘""英格蘭""蘇聯"（这些是2代的），实际1代是：錦丘→南宇和→東一中→花輪→明和東→比良戶→佛拉諾→東邦→東邦高中→(欧洲预赛)→(决勝)
  3. **StoryData.ts**: 全部对话文本是编造的，不是ROM Bank 7中的真实tile编码数据
  4. **GAP_ANALYSIS.md**: 分析基于编造的数据和可能不准确的网络攻略
  5. **ProgressManager.ts**: 依赖编造的MatchSequence数据
- **根因**: 违反了项目核心原则——"不在理解数据语义前机械dump，更不编造数据"
- **修复计划**:
  1. 删除/标记所有编造的数据文件
  2. 从ROM Bank 3/5/7 中实际分析真实数据结构
  3. 用ROM分析结果逐步替换
  4. 攻略.txt 仅作参考，以ROM实际数据为准
- **影响文件**:
  - `src/data/PlayerData.ts` → 需完全重写
  - `src/data/MatchSequence.ts` → 需完全重写
  - `src/data/StoryData.ts` → 需完全重写
  - `GAP_ANALYSIS.md` → 需基于ROM重写
  - `src/model/ProgressManager.ts` → 依赖修正

---

## ⚠️ BUG-017 (降级): 之前分析基于编造数据 [⚠️ 信息不准确]
- **状态**: ⚠️ 降级为"信息待验证"
- **严重度**: ⚠️ (分析本身可能基于错误的攻略和编造的数据)
- **描述**: BUG-017中的很多细节（如"新猛虎""升级系统"等）可能对也可能不对——需要从ROM实际验证，不能依赖网络攻略

---

## v1.2.0 修复 - JSON require 在小程序中不可用

### BUG-016: require() 加载 JSON 在小程序中报错 [✅ 已修复 v1.2.0]
- **状态**: ✅ 已修复 (v1.2.0)
- **严重度**: 🔴 严重 (阻塞性)
- **错误信息**: `Error: module 'src/data/chr-data.json.js' is not defined, require args is '../data/chr-data.json'`
- **根因**: v1.1.0 使用 `require('../data/chr-data.json')` 加载 CHR 数据，但微信小程序不支持 `require()` 加载 JSON 文件。
  小程序的模块系统只支持 `.js`/`.ts` 模块，JSON 文件不参与编译。
- **修复方案**: 将 128KB CHR 二进制数据 base64 编码后嵌入 `.ts` 文件：
  1. 新增脚本 `scripts/generate_chr_base64.cjs`：读取 `chr-data.json` → 打包为 128KB Buffer → base64 编码 (~171KB 字符串) → 写入 `src/data/chrBinary.ts`
  2. `TileStore.init()` 改为 `import { CHR_BASE64 }` + `atob()` 解码 → `Uint8Array`
  3. 生成的 `chrBinary.ts` 仅 184KB（vs 原 816KB chr-bank TS），可通过小程序编译
- **修复文件**:
  - `src/data/chrBinary.ts` (184KB, base64 嵌入字符串, 自动生成)
  - `src/renderer/TileStore.ts` (改用 base64 解码)
  - `src/core/Tsubasa.ts` (注释更新)
  - `scripts/generate_chr_base64.cjs` (新增)
  - `scripts/verify_base64.cjs` (新增验证脚本)
- **验证**: `scripts/verify_base64.cjs` 确认全部 131,072 字节与原 JSON 数据一致 ✅

---

## v1.1.0 修复 - 模块加载失败

### BUG-015: CHR 数据模块过大导致小程序编译加载失败 [✅ 已修复 v1.1.0]
- **状态**: ✅ 已修复 (v1.1.0)
- **严重度**: 🔴 严重 (阻塞性)
- **错误信息**: `Error: module 'src/data/ChrData.js' is not defined`
- **根因**: `ChrData.ts` 通过 `./chr/index` 导入 32 个 chr-bank TS 文件（每个 ~25KB，总计 ~816KB 源码）。
  微信小程序的 TypeScript 编译器处理这种超大规模模块依赖链时编译失败，
  导致运行时找不到编译后的 `ChrData.js`。
- **修复方案**: 将 32 个 TS 文件合并为单个 JSON 文件，通过 `require()` 加载：
  1. 使用已有脚本 `scripts/generate_chr_json.cjs` 生成 `src/data/chr-data.json` (394KB)
  2. `TileStore.init()` 通过 `require('../data/chr-data.json')` 加载数据
  3. `ChrData.ts` 简化为纯常量文件，`chr/index.ts` 清空所有 re-export
- **修复文件**:
  - `src/data/chr-data.json` (394KB, 从 chr-bank-*.ts 生成)
  - `src/renderer/TileStore.ts` (重写为从 JSON require 加载)
  - `src/data/ChrData.ts` (简化，移除 chr-bank 依赖)
  - `src/data/chr/index.ts` (清空，移除所有 re-export)
- **注意**: 此方案后续发现微信小程序不支持 JSON require，在 v1.2.0 中进一步修复 (BUG-016)。

---

## v0.2.7 重构说明

### 架构决策: 数据提取原则
- 禁止机械 dump ROM 原始数据为 TS 数组/字符串（如 Bank7Data.ts 的 344 个无意义数字）
- 数据必须在理解语义后按需提取，每项数据都要有明确的用途说明
- Bank 数据分别在其对应的 WBS 里程碑阶段处理，不提前 dump

---

## 已知问题

### BUG-013: 设计偏离 - 队伍选择与2P模式 [已修复 v0.5.2]
- **状态**: ✅ 已修复 (v0.5.2)
- **严重度**: 🔴 严重 (设计偏差)
- **描述**:
  1. State 03 被错误设计为"队伍选择"（让玩家选择球队），原游戏玩家球队固定为南葛(Nankatsu)，仅有队员选择/阵型调整功能
  2. 菜单中出现了"2P GAME"选项，但原作为单人游戏（仅有 START 和 CONTINUE）
  3. DataCache 中存在 joypad2Raw (P2 手柄)字段，与单人游戏不符
- **修复文件**:
  - `src/engine/states/State03_MemberSelect.ts` (替换原 State03_TeamSelect.ts)
  - `src/engine/states/State02_MenuSelect.ts` (移除 2P GAME)
  - `src/cache/DataCache.ts` (移除 joypad2Raw)
  - `src/core/Constants.ts` (移除 JOYPAD2)
  - `src/engine/NmiHandler.ts` (移除 joypad2 赋值)
  - `ROM_STRUCTURE_REPORT.md`, `ARCHITECTURE.md` (文档更新)

### BUG-011: GameLoop 帧时钟问题 — 三重修复 [已修复 v0.4.3]
- **状态**: ✅ 已修复 (v0.4.3)
- **严重度**: 🔴 严重 (阻塞性)
- **来源**: GameLoop.ts vs MpPlatform.ts
- **描述**:
  - **v0.4.1 问题**: `start()` 调用 `this.loop(Date.now())`，首帧 lastFrameTime=Date.now()
    (~1785795598610)，后续 canvas RAF timestamp (~3750) 不在同一时钟域 → elapsed 巨大负数
  - **v0.4.2 残留问题**: 修复了时钟域，但 `FRAME_TIME_MS(16.667)` 阈值在整数毫秒 RAF
    timestamp 下导致 16ms 间隔被跳过（16 < 16.667），实际帧率 ~30fps；漂移修正还引发连帧抖动
  - **v0.4.3 最终方案**: 去掉阈值判断，每个 RAF 回调执行一帧（1:1 映射），RAF 在 60Hz 显示器
    上天然 ~60fps 与 NES 匹配。FPS 改用滑动窗口统计。
- **修复文件**: `src/core/GameLoop.ts`, `src/platform/miniprogram/MpPlatform.ts`

### BUG-012: CHR PNG 使用诊断调色板导致颜色错误 [✅ 已修复 v0.9.1] → [♻️ 架构重构 v1.0.0]
- **状态**: ♻️ 已重构 (v1.0.0, 彻底消除 CHR PNG 管线)
- **严重度**: 高
- **来源**: `scripts/extract_chr.py` + `Renderer.ts`
- **v0.9.1 修复**:
  1. CHR PNG 重新提取为灰度格式（像素值 0/85/170/255 → NES 索引 0/1/2/3）
  2. Renderer 新增 `tintedCache` 纹理缓存，在调色板变化时生成着色纹理
  3. `tintChrSheet()` 使用 `getImageData` → 灰度→NES索引→`NES_PALETTE` 映射 → `putImageData`
  4. `drawTile()`/`drawSprite()` 使用着色纹理渲染
- **v1.0.0 重构**: 上述方案被彻底替换
  1. CHR 数据直接从 ROM 提取为 2BPP 原始二进制（base64嵌入代码）
  2. TileStore 预解码所有 tile（32 banks × 256 tiles × 64 字节 = 2MB）
  3. Renderer 直接查 TileStore 获取像素索引 → 查调色板 → 写入屏幕 ImageData
  4. 消除 128 个离屏 Canvas、getImageData/putImageData 中间步骤、PNG 图片依赖
- **修复文件**: `src/renderer/TileStore.ts`, `src/renderer/Renderer.ts`, `src/data/ChrData.ts`, `scripts/extract_chr_bin.py`

### BUG-014: CHR 渲染过度复杂 - 用 Canvas 着色 tile 索引 [✅ 已修复 v1.0.0]
- **状态**: ✅ 已修复 (v1.0.0)
- **严重度**: 高 (架构问题)
- **来源**: 用户反馈 - CHR tile 就是 0/1/2/3 索引→RGB 映射，不需要 Canvas 中间处理
- **描述**:
  旧 Renderer 将 CHR 数据→灰度 PNG→drawImage→getImageData→调色板映射→putImageData→
  128 张着色离屏 Canvas 缓存→每 tile drawImage 拷贝。这相当于用 Canvas 做调色板查找表，
  纯属绕路。
- **v1.0.0 修复**:
  直接: CHR 2BPP 二进制→TileStore 像素索引(0/1/2/3)→查 NES_PALETTE[调色板[基址+索引]]→
  写入屏幕 ImageData→一帧一次 putImageData
  - 消除 16 个 PNG (运行时不再需要)
  - 消除 128 个离屏 Canvas (~64MB+ 内存)
  - 消除 getImageData/putImageData 的着色纹理重生成
  - 消除每帧数十次 drawImage(8×8) 调用
  - 调色板变化零开销（自然在下次渲染使用新色）

### BUG-001: Bank 7 自定义脚本引擎字节码 — 非反汇编错误，需单独分析 [已澄清 v1.2.1]
- **状态**: 🔄 M5 阶段任务 (非Bug，转为架构分析任务)
- **严重度**: 低 (核心6502代码反汇编正确)
- **来源**: `_tmp_disasm_out/banks/` ASM 文件
- **澄清 (v1.2.1)**: 
  - **核心6502代码（Bank 0 Reset/NMI/主循环/状态分发器/跳转表）反汇编完全正确**。CDL 标记 `C` 表示已被执行过的代码，与游戏实际行为一致。
  - Bank 0 跳转表 ($8000-$809A) 中有少量未使用条目被 CDL 标记为 `D`（如 $800E/$805C/$806B/$8071），这是正常现象——死代码/未引用入口。
  - Bank 7 ($C000-$FFFF) 大面积标记为 `D`（data），这**不是反汇编错误**。这些区域是游戏自制的**脚本引擎字节码和指针表**，不是 6502 指令，CDL 正确区分了它们。
  - Bank 7 中少量 `C` 标记区域（如脚本解释器主循环 $C010+, RLE 解码器 $C2C2, 调色板处理器 $C36C 等）是真正的 6502 代码，反汇编也正确。
  - CDL 更新后 Bank 4/5/6 缩小 5%，是因为更多数据区域被正确识别，改善了反汇编。
- **影响**: 
  无需"修复"反汇编。M5 阶段需要单独逆向 Bank 7 的自定义脚本字节码格式（非 6502 指令集）。
- **计划**: 
  - ✅ CDL 已更新，反汇编已重新生成
  - ✅ Bank 0 核心代码已验证正确
  - 🔄 M5 阶段：逆向 Bank 7 脚本引擎字节码格式，实现 TypeScript 版解释器

### BUG-002: CHR 图形资源已提取，需验证
- **状态**: 已修复 (v0.2.2)
- **严重度**: 高
- **来源**: `public/sprites/` 目录
- **描述**: 16个CHR bank已提取为PNG，待验证渲染效果。
- **验证**: 需要在微信开发者工具或浏览器中实际查看CHR tile渲染效果。

### BUG-003: Bank 切换时序
- **状态**: 打开
- **严重度**: 中
- **来源**: ROM分析
- **描述**: 
  原始代码在 $8104-$8118 处进行bank切换，切换后调用 $DB00（可能是其他bank的代码）。
  TypeScript中模块是静态加载的，不需要实际"切换bank"。
  但需要准确模拟 $1A/$1B/$1C 的值变化，因为游戏逻辑可能会读取这些值。
- **影响**: 
  如果游戏逻辑依赖 bank 寄存器的当前值做判断，可能出现逻辑错误。
- **计划**: 
  - 跟踪所有读取 $1A/$1B/$1C 的代码
  - 确保 BankManager 的值与原始NES一致

### BUG-007: 标题画面使用测试数据而非真实ROM数据 [✅ 已修复 v0.7.1]
- **状态**: ✅ 已修复 (v0.7.1)
- **严重度**: 高
- **来源**: Bank1Dispatcher.ts
- **进展**: 
  - ✅ 5 页标题加载循环已实现（sub1→sub2→sub3→sub4→sub1 正确循环）
  - ✅ 标题调色板已从 ROM Bank 2 ($B24F-$B25E) 提取并使用
  - ✅ 标题画面闪烁动画已实现（30帧周期，PRESS START 闪烁）
  - ✅ 调色板着色管线已实现（灰度 CHR + 调色板映射）
  - ✅ **v0.7.1: 集成 TitleRleData.ts 真实ROM RLE解码数据**，5页名称表+属性表均替换为ROM原始数据
- **根因**: ROM 的标题数据由 Bank 1 的 RLE 解码器 ($C2C2) 动态生成，数据已提取并解码为 `TitleRleData.ts`
- **修复文件**: `Bank1Dispatcher.ts` — `buildTitlePage()` 占位函数 → `TITLE_PAGES[]` 真实数据

### BUG-008: 状态分发器未实现 Bank 切换
- **状态**: ✅ 已修复 (v0.3.0+)
- **严重度**: 高
- **来源**: StateMachine.ts vs ROM $84D2
- **描述**: StateMachine 已实现完整的 Bank 切换 + Bank1Dispatcher 子状态调度
- **修复**: StateMachine.dispatchBankState() 调度 PRG bank，Bank1Dispatcher 处理子状态跳转表 ($804B)

---

## 已修复

- BUG-004: 微信小程序模块解析 - 目录index自动解析失败 (2026-08-04)
- BUG-005: State01_TitleLoop bankLock=1 阻止状态机更新 (2026-08-04)
- BUG-006: MpPlatform 图片加载/RAF 在小程序中不可用 (2026-08-04)
- BUG-009: ICanvasContext 不兼容小程序 CanvasRenderingContext2D (2026-08-04) - canvas 属性改为可选
- BUG-010: 小程序 StateTest 不显示 (2026-08-04) - test 模式默认开启 + 字体兼容

---

## 待验证

- CHR Bank PNG 文件在小程序中是否正确加载和渲染
- 标题画面是否显示正确的 tile 图案
