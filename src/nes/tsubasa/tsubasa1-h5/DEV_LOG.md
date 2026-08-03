# 开发日志

> 项目: 天使之翼 H5 | 创建: 2026-08-04

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
