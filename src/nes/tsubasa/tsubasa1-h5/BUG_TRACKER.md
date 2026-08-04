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

### BUG-012: CHR PNG 使用诊断调色板导致颜色错误 [✅ 已修复 v0.9.1]
- **状态**: ✅ 已修复 (v0.9.1)
- **严重度**: 高
- **来源**: `scripts/extract_chr.py` + `Renderer.ts`
- **修复**:
  1. CHR PNG 重新提取为灰度格式（像素值 0/85/170/255 → NES 索引 0/1/2/3）
  2. Renderer 新增 `tintedCache` 纹理缓存，在调色板变化时生成着色纹理
  3. `tintChrSheet()` 使用 `getImageData` → 灰度→NES索引→`NES_PALETTE` 映射 → `putImageData`
  4. `drawTile()`/`drawSprite()` 使用着色纹理渲染
- **修复文件**: `src/renderer/Renderer.ts`, `public/sprites/chr_bank_*.png`

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
- **状态**: 🔄 部分修复 (v0.9.1)
- **严重度**: 高
- **来源**: Bank1Dispatcher.ts
- **进展**: 
  - ✅ 5 页标题加载循环已实现（sub1→sub2→sub3→sub4→sub1 正确循环）
  - ✅ 标题调色板已从 ROM Bank 2 ($B24F-$B25E) 提取并使用
  - ✅ 标题画面闪烁动画已实现（30帧周期，PRSES START 闪烁）
  - ✅ 调色板着色管线已实现（灰度 CHR + 调色板映射）
  - 🔄 **仍使用占位 tile 索引**（非 ROM 真实 RLE 数据）
- **影响**: 标题画面显示形状和使用颜色大致正确，但文字/图案位置和内容不精确
- **根因**: ROM 的标题数据由 Bank 7 脚本引擎 RLE 解码生成，需逆向脚本引擎字节码（M5 任务）
- **计划**: M5 阶段从 ROM 提取 RLE 压缩的名称表数据，替换当前占位符

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
