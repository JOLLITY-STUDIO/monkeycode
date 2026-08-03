# Bug 跟踪记录

> 项目: 天使之翼 微信小程序 | 创建: 2026-08-04

---

## v0.2.7 重构说明

### 架构决策: 数据提取原则
- 禁止机械 dump ROM 原始数据为 TS 数组/字符串（如 Bank7Data.ts 的 344 个无意义数字）
- 数据必须在理解语义后按需提取，每项数据都要有明确的用途说明
- Bank 数据分别在其对应的 WBS 里程碑阶段处理，不提前 dump

---

## 已知问题

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

### BUG-012: CHR PNG 使用诊断调色板导致颜色错误 [新建]
- **状态**: 🔴 打开
- **严重度**: 高
- **来源**: `scripts/extract_chr.py` + `Renderer.ts`
- **描述**: 
  CHR 提取脚本使用 4 色"诊断调色板"将 2bpp tile 数据渲染为彩色 PNG：
  ```python
  (0x7C,0x7C,0x7C), (0x00,0x00,0xFC), (0x94,0x00,0x84), (0xF8,0xF8,0xF8)
  ```
  这与 NES 实际调色板完全不同。当前 Renderer 直接将 PNG 作为最终画面绘制，
  无法在运行时应用 NES 调色板（8 个 sub-palette × 4 色 ÷ attribute table 索引）。
- **影响**: 
  - 所有 tile 渲染颜色错误（灰度替代黑色、蓝色替代原色等）
  - 无法实现调色板动画（如标题闪烁）
  - 无法根据 attribute table 切换子调色板
- **修复计划**:
  1. 重新提取 CHR 为灰度 PNG（编码 2bpp 索引到 RGB 通道）或保留原始 binary
  2. Renderer 改为逐像素渲染，根据 tile pattern + attribute + palette 查表着色
  3. 或使用 Canvas ImageData 逐帧重着色（性能需评估）

### BUG-001: 反汇编质量 - 数据误解释为代码
- **状态**: 🔄 改善中 (CDL 已更新, v0.5.1)
- **严重度**: 中
- **来源**: `_tmp_disasm_out/banks/` ASM 文件
- **描述**: 
  使用 BZK 反汇编器 + CDL 文件标记 code/data。
  CDL 更新后 Bank 4/5/6 缩小 5%，更多数据区域被正确标记。
  但 Bank 7 的脚本引擎区域 ($C2C2/$C36C/$C383) 仍被标记为 data（字节码非 6502 指令）。
- **影响**: 
  需要在转写时区分真正的 6502 代码和脚本字节码。
- **计划**: 
  - ✅ CDL 已更新，反汇编已重新生成
  - 手动标记 Bank 7 脚本引擎区域的字节码格式
  - M5 阶段专门处理脚本引擎

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

### BUG-007: 标题画面使用测试数据而非真实ROM数据
- **状态**: 🔄 进行中
- **严重度**: 高
- **来源**: State00_InitTitle.ts
- **描述**: 
  State 00 的 `loadTitleNametable()` 使用 `tileIdx = (row * 32 + col) % 256` 
  填充测试图案，而非从ROM中提取真实的标题画面数据。
  标题画面数据由 Bank 1 的脚本引擎动态生成，需要实现 Bank 1 子状态调度器。
- **修复计划**:
  1. 实现 $84D2 状态分发器的 Bank 切换逻辑
  2. 实现 Bank 1 子状态跳转表 ($804B)
  3. 从 ROM 提取标题画面调色板和初始数据
  4. 实现 Bank 1 标题初始化核心代码

### BUG-008: 状态分发器未实现 Bank 切换
- **状态**: 🔄 进行中
- **严重度**: 高
- **来源**: StateMachine.ts vs ROM $84D2
- **描述**: 
  原始 ROM 中状态分发器 `$84D2` 将状态ID分为高4位(PRG Bank)和低4位(子状态索引)。
  当前 TS 实现直接使用 0-5 的简单状态ID，未实现 Bank 切换机制。
- **影响**: 标题画面、菜单等所有画面都无法正确初始化。
- **计划**: 重构 StateMachine 支持 Bank 切换 + 子状态索引。

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
