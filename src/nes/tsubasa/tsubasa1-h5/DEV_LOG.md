# 开发日志

> 项目: 天使之翼 微信小程序 | 创建: 2026-08-04

---

## 2026-08-04: v0.7.0 - ⚽ 比赛引擎 + M3 完成

### 球员数据重构
- 📊 **PlayerData.ts 重写**: 从占位数据迁移到真实 77 名球员数据
  - 7 队 × 11 名球员 = 77 名完整球员
  - 属性: speed/power/technique/stamina/guts + 特殊技
  - 特殊技: DRIVE(翼), TIGER(日向), EAGLE(松山), HAYABUSA(新田), TWIN(立花), KAMISORI(早田), GOLDEN(岬), CHARM(三杉)
- ✅ 所有数据基于社区文档验证

### 比赛引擎
- 🏟️ **MatchEngine.ts** 新增 (~250 行)
  - 球员初始位置 (4-4-2 阵型)
  - 球员AI移动 (追踪球)
  - 球物理 (惯性、减速、边界反弹)
  - 比赛阶段: KICKOFF → PLAYING → HALFTIME → SECOND_HALF → FULLTIME
  - 射门/传球/铲球动作判定
  - 进球检测
- ✅ 集成到 State04_MatchMain
- ✅ 集成到 State05_MatchEvent

### 状态增强
- 🔄 **State03_TeamSelect**: 显示真实 7 队列表 + 球员数
- 🔄 **State04_MatchMain**: 场地渲染、球员精灵、球精灵、比分HUD
- 🔄 **State05_MatchEvent**: GOAL动画、终场结果画面

### 测试
- ✅ **45/45 全部通过** (+15 新测试)
  - 新增: State 03→04 队伍选择确认
  - 新增: 开球→进行中阶段转换
  - 新增: State 03 B键返回菜单
- ✅ 比赛引擎初始化 + 阶段转换验证

### 待解决
- 🔄 BUG-012: CHR PNG 使用诊断调色板导致颜色偏差
- 🔄 BUG-007: 标题画面使用手工构造数据
- ⬜ M4.1: Bank 4 比赛事件逻辑分析

---

## 2026-08-04: v0.6.0 - 🎨 标题画面调色板修复 + 画面数据重构

### ROM 调色板数据提取
- 🔍 **找到标题画面真实调色板**: ROM Bank 2 偏移 $B24F-$B25E
  - BG[0]: `0F 33 0F 1A` (黑/灰/黑/绿)
  - BG[1]: `30 36 0F 30` (白/粉/黑/白)
  - BG[2]: `0F 25 0F 0F` (黑/暗紫/黑/黑)
  - BG[3]: `0F 36 30 21` (黑/粉/白/浅蓝)
- 🔍 **菜单调色板**: ROM Bank 2 偏移 $B261 区域
- ✅ `Bank1Dispatcher.ts`: 所有硬编码调色板替换为 ROM 提取的真实数据

### 画面渲染重构
- 🎨 **标题画面**: 从测试 tile 网格改为结构化名称表布局
  - 标题文字区域 (行 2-8)
  - 角色展示区域 (行 12-17)
  - "PRESS START BUTTON" 提示 (行 22-24)
  - 版权信息 (行 27)
  - 闪烁动画 (每60帧切换属性表)
- 🎨 **菜单画面**: ASCII 字体映射 (A-Z → 0x41-0x5A, 0-9 → 0x30-0x39)
- 🎨 **队伍选择**: 7队完整列表 + 双向箭头光标
- 🎨 **比赛画面**: 球场草地 + 边线渲染 + 比分HUD

### 代码质量
- ✅ 30/30 状态流转测试通过
- ✅ 零 Lint 错误
- 🗑️ 删除无用的临时文件 (find_palette.py, TitleData.ts)

### 待解决
- 🔄 BUG-012: CHR PNG 使用诊断调色板导致颜色偏差
- 🔄 BUG-007: 标题画面使用手工构造数据 (非 ROM 原始 RLE 数据)

---

## 2026-08-04: v0.5.1 - 🔄 CDL 更新 + 反汇编重新生成 + RLE 数据扫描

### CDL 更新
- 📥 用户提供了更新的 CDL 文件 (`Captain Tsubasa (Japan).cdl`)
- 🔄 使用 BZK 反汇编器重新生成所有 8 个 Bank ASM
- ✅ 0 错误，向量验证通过 (Reset=$FFC0, NMI=$8002, IRQ=$8002)

### 反汇编文件变化 (CDL 更新后)
| Bank | 旧大小 | 新大小 | 变化 |
|------|--------|--------|------|
| bank_00 | 505KB | 508KB | +0.6% |
| bank_01 | 814KB | 798KB | -2.0% |
| bank_02 | 827KB | 847KB | +2.4% |
| bank_03 | 870KB | 890KB | +2.3% |
| bank_04 | 902KB | 860KB | -4.7% |
| bank_05 | 847KB | 803KB | -5.2% |
| bank_06 | 753KB | 713KB | -5.3% |
| bank_07 | 902KB | 924KB | +2.4% |

- Bank 4/5/6 明显缩小 → 更多区域被正确标记为 data
- Bank 7 略增 → 可能是新增了间接引用标记

### RLE 数据扫描发现
- 🔍 在 Bank 5 (ROM $14010-$17FFF) 的 0x149C0-0x14BFF 区域发现密集 RLE 数据
- 📊 8134 个候选 RLE 块，前几个集中在 0x149A0-0x14A60
- ⚠️ RLE 格式比预期复杂：混合了控制命令 ($80/$A0/$C0/$E0 有多种含义)
- 📝 Bank 7 的 $C2C2/$C36C/$C383 被 CDL 标记为 data → 这些是脚本引擎字节码，不是 6502 指令
- 📝 完整的标题画面由脚本引擎动态生成，直接提取纯数据不可行

### 决策
- 暂不深入逆向脚本引擎字节码（M5 阶段任务）
- 标题画面数据采用混合策略：部分从 ROM 提取 + 部分手工构造
- 继续推进 M2 核心框架的完善

### 产出
- ✅ 更新的 ASM 文件（`_tmp_disasm_out/banks/`）
- ✅ `scripts/scan_rle_data.py` - RLE 数据扫描工具
- ✅ `scripts/extract_title_data.py` - ROM 数据提取工具
- ✅ `scripts/extract_rle_nametable.py` - RLE 解码器测试工具

---

## 2026-08-04: v0.5.0 - 🏗️ 帧三段式架构重构

### 问题
`NmiHandler.execute()` 把三个不同时序的操作揉在一起：
PPU数据填充 + 游戏逻辑 + Canvas渲染。命名和语义都不清晰，
没有体现NES中"NMI控制帧 → PPU渲染填充后的数据"的核心时序。

### 重构内容

**文件变更:**
- `src/engine/NmiHandler.ts` → `PpuDataFiller` 类（只做PPU数据填充）
  - `NmiHandler` 保留为别名，向后兼容
- `src/core/GameLoop.ts` → 编排三段式帧
- `src/core/Tsubasa.ts` → 接入新架构
- `ARCHITECTURE.md` → 更新帧循环设计文档

**帧三段式:**
```
每帧 (每个RAF回调):
  ═══ 阶段1: PPU数据填充 (NMI) ═══
    OAM DMA → PPU队列(VRAM写入) → 输入读取 → 帧计数++
    (NES: CPU在VBlank期间填PPU寄存器)

  ═══ 阶段2: 游戏逻辑 ═══
    bankLock==0 ? 状态机更新 : skip
    (NES: NMI返回后CPU执行主循环)

  ═══ 阶段3: Canvas渲染 ═══
    用阶段1填充的PPU数据绘制画面
    (NES: PPU用VBlank填入的数据逐行渲染)
```

**核心设计原则:**
- PPU渲染的是"填充后的数据"：阶段1填数据，阶段3用数据渲染
- 游戏逻辑在PPU数据填充之后：为**下一帧**准备数据
- 渲染是只读的：Renderer只读取PPU数据，不修改

### 测试
- ✅ TypeScript 编译无错误
- ✅ Linter 零告警

---

## 2026-08-04: v0.4.3 - 🐛 帧时钟彻底修复：1:1 RAF→NES 帧映射

### 根因分析
v0.4.2 解决了**时钟域不匹配**（Date.now() vs canvas RAF timestamp），
但留下两个隐性问题：

1. **整数毫秒精度问题**：微信小程序 canvas RAF timestamp 是整数毫秒。
   间隔只能是 16ms 或 17ms。`16 < FRAME_TIME_MS(16.667)` → 帧被跳过 → 实际帧率 ~30fps。
2. **漂移修正抖动**：`lastFrameTime = timestamp - (elapsed % 16.667)`。
   当 elapsed=33 时，余数=16.333，下一次只需 0.334ms 就触发 → **连发两帧**，画面抖动。

### 修复方案
**彻底去掉 FRAME_TIME_MS 阈值判断，每个 RAF 回调直接执行一帧。**

RAF 在 60Hz 显示器上天然 ~60fps，与 NES 原生帧率 1:1 匹配。
不再需要阈值判断、不再需要漂移修正——外部 RAF 给什么节奏就跑什么。

### 变更
- `GameLoop.ts`: 重写为 1:1 RAF→NES 帧映射，FPS 改为滑动窗口统计
- `MpPlatform.ts`: setInterval 回退间隔 16→17ms（更接近 60fps）

### 变更文件
- `src/core/GameLoop.ts` - 1:1 帧映射 + 滑动窗口 FPS
- `src/platform/miniprogram/MpPlatform.ts` - 回退间隔修正

---

## 2026-08-04: v0.4.2 - 🐛 修复 GameLoop 时钟域不匹配 (第二版修复)

### 根因分析
v0.4.1 的时钟同步修复不完整。`GameLoop.start()` 中调用 `this.loop(this.platform.now())`，
传入 `Date.now()` (~1785795598610) 作为 timestamp，首帧 `lastFrameTime` 被设置为该值。
但微信小程序 `canvas.requestAnimationFrame` 回调的 timestamp 是 canvas 内部相对时间 (~3750)，
与 `Date.now()` 不在同一时钟域。

结果：`elapsed = 3750 - 1785795598610` = 巨大负数 → **所有后续帧被跳过**。

### 症状
- 只有第一帧渲染（画面冻结）
- 第一帧: nametable 全 0 → 全部绘制 tile 0 (CHR PNG 中灰色背景区块) → 用户看到"灰色"画面
- `Bank1Dispatcher` 的子状态只在第1帧推进到 sub-state 1 → 标题初始化卡住
- 没有后续帧执行 `loadTitlePalette()` / `loadTitleNametable()`

### 修复
- **彻底移除** `start()` 中的 `this.loop()` 手动调用
- 只使用 `requestAnimationFrame` 驱动循环，确保单一 RAF 时钟源
- 首次 RAF 回调**不执行帧逻辑**，只记录时钟基准 `lastFrameTime`
- `resume()` 同样设置 `lastFrameTime = 0` 强制重新同步

### 变更文件
- `src/core/GameLoop.ts` - 重写启动和时钟同步逻辑

---

## 2026-08-04: v0.4.1 - 🐛 修复 GameLoop 时钟不同步 (第一版)

### 问题
- `MpPlatform.now()` 返回 `Date.now()` (Unix 毫秒时间戳 1785795206820)
- `canvas.requestAnimationFrame` 回调 timestamp 是 WeChat 相对时间 (7141.762)
- 两者时钟源完全不同，导致 `elapsed = timestamp - lastFrameTime` 为负数
- `nmiHandler.execute()` / `renderer.render()` 从未执行
- 画面始终停留在 initGame 中的 "DIRECT CANVAS TEST"

### 修复
- `GameLoop.start()`: `lastFrameTime = 0` 标记首帧
- `loop()`: 首帧检测 `isFirstFrame`，用首个 RAF timestamp 同步时钟基准
- `resume()`: 同样 `lastFrameTime = 0` 避免恢复后时钟错位

### 变更文件
- `src/core/GameLoop.ts` - 时钟同步逻辑
- `BUG_TRACKER.md` - 新增 BUG-011

---

## 2026-08-04: v0.4.0 - 🚀 正常模式切换 + State 流转验证

### 变更
- 🔄 `game.ts`: 默认切换到正常游戏模式 (`_testMode: false`)，测试模式改为 `?test=1` 参数触发
- 📊 `Tsubasa.ts`: 增强正常模式启动日志（CHR 加载 / Bank 配置 / 状态转换）
- ✅ `state_test.py`: 30/30 测试全部通过

### 状态
- ✅ State 00→01→02→03 完整流转验证通过
- 🔄 标题画面仍使用测试图案（待 ROM 数据提取替换）
- 🔄 正常模式待小程序实测 CHR 图片加载

---

## 2026-08-04: v0.3.2 - 🧹 清理：移除 Web/HTML 平台，聚焦微信小程序
- ❌ 删除 `src/platform/web/` (WebPlatform.ts + main.ts)
- ❌ 删除 `src/main.ts` (向后兼容入口)
- ❌ 移除 `vite` 依赖和相关 scripts
- ✅ 更新 `package.json` → `tsubasa1-mp`
- ✅ 更新所有文档和注释中的 web/HTML 引用

---

## 2026-08-04: v0.3.1 - 🔧 StateTest 小程序渲染修复

### 问题
用户无法在小程序中看到 StateTest 的输出。两个关键问题：
1. **test 模式需要 `?test=1` 参数**：小程序首发页面不带查询参数，导致 test 模式永远不会触发
2. **ICanvasContext 接口不兼容小程序**：要求 `readonly canvas: ICanvas`，但小程序 CanvasRenderingContext2D 没有此属性

### 修复
- ✅ `IPlatform.ts`: `canvas` 改为可选 (`canvas?: ICanvas`)
- ✅ `Renderer.ts`: 移除 try-catch，使用可选链检查 `ctx.canvas`
- ✅ `Renderer.ts`: debugText 字体改为 `sans-serif`（小程序兼容）+ 半透明背景块确保可见
- ✅ `game.ts`: **test 模式改为默认开启**（`_testMode: true`），用 `?normal=1` 切换回正常模式
- ✅ `StateTest.ts`: 增强日志输出 + 帧计数器动态文字 + 详细注释

### 验证方式
- 直接编译运行小程序即可看到棋盘格 + "TEST OK | Frame: X" 文字
- 如需正常游戏：页面参数 `?normal=1`

---

## 2026-08-04: v0.3.0 - ✅ State 流转测试通过 + M2 完成

### 测试结果
- ✅ **state_test.py**: 30/30 全部通过
- ✅ State 00→01 自动流转 (~6帧, Bank1Dispatcher 子状态 0→1→2)
- ✅ State 01→02 (START键进入菜单)
- ✅ State 02 菜单导航 (↑↓移动 / A确认 / B返回)
- ✅ State 02→03 (确认进入队伍选择)
- ✅ 完整流程 State 00→01→02→03
- ✅ bankLock 保护机制

### 产出
- ✅ `tests/setup/MockPlatform.ts` - 测试用 Mock 平台适配器
- ✅ `tests/state-test.ts` - TypeScript 版本测试 (待 npm install 后可用)
- ✅ `scripts/state_test.py` - Python 版本测试 (即时可用, 无需编译)
- ✅ `tsconfig.json` - TypeScript 编译配置
- ✅ `jest.config.js` - Jest 测试配置

### 里程碑
- 🎯 **M2 阶段完成**: 状态分发器 + State 00/01/02 + 状态流转测试

### 后续
- M2.10: 在小程序页面中验证实际渲染效果 (CHR tile + 调色板)
- 修复 npm install 网络问题，启用 TypeScript 版本测试

---

## 2026-08-04: v0.2.8 - 🔧 渲染简化：去掉离屏 Canvas

### 问题
小程序中主 canvas 的 `drawImage(offscreen→main)` 兼容性存疑，且双缓冲在当前阶段无必要。

### 改动
- ✅ **Renderer.ts**：删除 offscreen/offCtx 离屏 canvas
- ✅ `render()` 直接画到主 `this.ctx`，所有 tile/sprite 坐标 × scale
- ✅ `createOffscreenCanvas` 仍保留在 IPlatform 中（MpPlatform.loadImage 内部用主 canvas.createImage fallback）
- ✅ 编译通过，零 lint 错误

---

## 2026-08-04: v0.2.7 - 🔥 清理：删除无意义的 ROM 数据 dump

### 问题诊断
v0.2.6 产生的 `Bank7Data.ts` (50KB) 虽然从 hex 字符串变成了 "结构化数组"，但本质仍然是 ROM 数据的机械搬运：
- `JUMP_TABLE` = 344 个十进制数字 (`49196, 58104, ...`)——和 hex dump 没区别
- `INTERNAL_JUMP_ENTRIES` = 同样的数字加 index——仍然毫无语义
- `_SCRIPT_HEX` = 15KB hex 字符串——和二进制文件没区别
- 没有任何人能看懂 `49196` 代表哪个游戏事件

**根因**：开发节奏超前。WBS 中 M2 (Bank 0 核心/标题画面) 尚未完成，M5 (Bank 7 脚本引擎) 根本还没开始。在理解 Bank 7 的实际用途之前就 dump 数据，只能得到无意义的结果。

### 清理操作
- ❌ 删除 `src/data/Bank7Data.ts` (50KB)
- ❌ 删除 `src/data/bank7_data.bin`、`pointers.json`
- ❌ 删除 9 个机械 dump 脚本 (build_structured_bank7.py, deep_analyze_bank7.py, verify_bank7.py, extract_*.py, convert_bin_to_ts.py, analyze_bank1.py 等)
- ✅ 简化 `RomData.ts` 为 placeholder (数据按需提取)
- ✅ 保留 `src/utils/NametableDecoder.ts` (包含 RLE/精灵/PPU 解码**算法逻辑**，是 ASM 分析成果)
- ✅ 保留 `scripts/extract_chr.py` (CHR→PNG 转换工具)

### 新的数据原则
> **只在理解数据语义后才提取，不机械 dump ROM 原始字节。每个字段必须有明确的用途说明和来源注释。数据按需添加，不预先 dump 整个 bank。**

### 后续聚焦
回归 M2 核心任务：完成 Bank 0/1/2 的标题画面 + 菜单逻辑

---

## 2026-08-04: v0.2.5 - 数据解码器深度分析 + ROM数据提取

### 分析成果
- 🔍 **关键解码器识别** (Bank 1):
  1. `$C2C2`: **Nametable RLE 解码器** - 解压标题/菜单的名称表数据
     - 格式: byte < $80 → 直接 tile; byte >= $80 → RLE(count=byte&0x1F, 下一byte重复)
     - 起始 VRAM $20A8, 每批 16 字节, 共 14 行
  2. `$C259`: **Sprite/OAM 解码器** - 解析精灵数据格式
     - 第1字节低4位=精灵数, 每个精灵4字节(Y/tile/attr/X)
  3. `$C36C`/`$C383`: **调色板动画处理器**
  4. `$C3BA`: **数据指针查找** (从 $D0F3 表)
  5. `$C3CE`: **PPU 数据传输解码器**
  6. `$C629`/`$C68D`: **菜单文本渲染**

- 🔍 **Bank 跨域数据流确认**:
  - Bank 1 解码器代码实际位于 Bank 2 ROM 区域
  - 数据表 ($D0F3, $D05E, $D518) 也在 Bank 2
  - Bank 7 固定区包含 344 个脚本入口指针
  - Bank 7 数据区 15632 字节

### 产出
- ✅ `src/utils/NametableDecoder.ts` - RLE/OAM/PPU 解码器
- ✅ `scripts/extract_rom_data_v2.py` - ROM 数据提取器
- ✅ `src/data/RomData.ts` - TypeScript 结构化 ROM 数据
- ✅ `src/data/bank7_data.bin` - Bank 7 原始数据 (15KB)
- ✅ `src/data/pointers.json` - 指针表 JSON

### 计划
- 集成真实 ROM 数据到 Bank1Dispatcher 标题画面
- 替换所有硬编码测试数据

---

## 2026-08-04: v0.2.4 - ASM 反汇编更新 (BZK + 最新 CDL)

### 操作
- 🔄 **BZK 反汇编器重新生成**: 使用最新 CDL 文件更新所有 8 个 Bank ASM
- 📁 **文件更新**:
  - `input/tsubasa1.cdl` ← 最新 CDL (256KB)
  - `input/tsubasa1.nes` ← 最新 NES ROM
  - `config.lua` ← `config_tsubasa1.lua`
- 📊 **新 ASM 文件大小** (相比旧版):
  - bank_00: 215KB → **506KB** (+135%)
  - bank_01: 225KB → **814KB** (+262%)
  - bank_02: 235KB → **827KB** (+252%)
  - bank_03: 229KB → **870KB** (+280%)
  - bank_04: 244KB → **902KB** (+270%)
  - bank_05: 226KB → **847KB** (+275%)
  - bank_06: 213KB → **753KB** (+253%)
  - bank_07: 237KB → **902KB** (+281%)
  - **总计: 2023KB → 6421KB (+217%)**

### 验证
- ✅ BZK 反汇编完成，0 错误
- ✅ Reset 向量: $FFC0 → `SEI` (正确)
- ✅ NMI 向量: $8002 → `JMP $80E0` (正确)
- ✅ Bank 调度: $BFD7 → `JMP ($8000)` (Bank 切换机制正确)
- 📝 新增 `bank_ram.inc` (95KB RAM 使用统计)

---

## 2026-08-04: v0.2.3 - 状态分发器重构 + Bank 1 分析

### 分析
- 🔍 **Bank 1 子状态调度器分析**:
  - Bank 1 的跳转表位于 $804B（不是 $C000）
  - 子状态 0: $C05B → 标题初始化第1部分（设置 CHR bank 1E/1F）
  - 子状态 1: $C070 → 标题初始化第2部分（加载图形数据）
  - 子状态 2: $C0A7 → 标题动画循环
  - $84D2 状态分发器: 高4位=PRG Bank, 低4位=子状态索引
- 🔍 **Bank 1 数据格式分析**: Bank 1 87.3% 为数据，包含复杂的脚本/音乐引擎数据
- 🔍 **标题画面数据生成**: 标题画面由 Bank 1 代码动态生成，非静态 nametable

### 计划
- 重构 StateMachine 支持 Bank 切换 + 子状态索引 ($84D2 逻辑)
- 实现 Bank 1 子状态跳转表
- 提取标题画面实际 nametable 数据（从模拟器运行状态或ROM数据分析）

---

## 2026-08-04: v0.2.2 - 小程序渲染修复 + CHR 资源验证

### 修复
- 🐛 **MpPlatform.loadImage 重写**: 使用 `canvas.createImage()` 替代裸 JS 对象
- 🐛 **MpPlatform.requestAnimationFrame 修复**: setInterval 回退
- 🐛 **素材路径修复**: `spriteBasePath` 从 `/sprites/` → `/public/sprites/`
- 🐛 **Renderer 兼容性修复**: drawImage 统一使用 raw 提取、ICanvasContext 扩展
- 🐛 **错误日志增强**: loadAllChrBanks 失败时输出首个错误详情

### 验证
- ✅ TypeScript 编译通过
- ✅ 16 个 CHR Bank PNG 已从 ROM 提取完成
- ⏳ 微信开发者工具渲染测试 (待刷新)

---

## 2026-08-04: v0.2.1 - 微信小程序模块解析修复

### 修复
- 🐛 **BUG-004**: `'../engine/states'` → `'../engine/states/index'`

---

## 2026-08-04: v0.2.0 - 双平台环境搭建

- ✅ 平台抽象层 (IPlatform)
- ✅ 微信小程序项目 (miniprogram/)
- ✅ 核心重构去 web 硬依赖

---

## 2026-08-04: 项目初始化 (v0.1.0)

- ✅ ROM 结构分析、架构设计、项目框架搭建
