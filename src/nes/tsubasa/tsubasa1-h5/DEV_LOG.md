# 开发日志

> 项目: 天使之翼 H5 | 创建: 2026-08-04

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
