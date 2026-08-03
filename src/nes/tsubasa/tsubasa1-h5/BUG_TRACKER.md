# Bug 跟踪记录

> 项目: 天使之翼 H5 | 创建: 2026-08-04

---

## 已知问题

### BUG-001: 反汇编质量 - 数据误解释为代码
- **状态**: 打开
- **严重度**: 中
- **来源**: `_tmp_disasm_out/tsubasa_disasm.asm`
- **描述**: 
  使用线性扫描反汇编（非递归下降），不区分 code/data。
  所有字节按 6502 操作码解析，数据区域会产生无意义的指令。
  例如 Bank 7 的 $C000-$C2AF 区域实际上是跳转表数据，但被解释为代码。
- **影响**: 
  需要在转写时参考 CDL (Code/Data Logger) 文件来区分代码和数据区域。
- **计划**: 
  - 使用 `cdl_banks/` 中的 CDL 注释版本作为主要参考
  - 对标记为 `[?]` 的区域视为数据
  - 对标记为 `[CODE]` 的区域进行逻辑转写

### BUG-002: CHR 图形资源缺失
- **状态**: 打开
- **严重度**: 高
- **来源**: `public/sprites/` 目录已有部分PNG文件
- **描述**: 
  需要将所有16个CHR bank转换为PNG图片资源。
  当前已存在部分文件但需要验证完整性。
- **影响**: 
  渲染器暂时使用色块占位，需要完整CHR数据才能正确渲染。
- **计划**: 
  - 使用Python脚本从NES ROM提取CHR数据
  - 转换为PNG格式
  - 验证已有文件

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

---

### BUG-005: State01_TitleLoop bankLock=1 阻止状态机更新
- **状态**: 已修复
- **严重度**: 高
- **来源**: Ts 实现 vs 原始 ROM 差异
- **描述**: 
  State01_TitleLoop.onEnter() 设置 `bankLock = 1`，导致 NmiHandler 跳过
  `stateMachine.update()`，状态永远卡在 State 1 无法响应按键。
  原始 ROM 中 bankLock=1 时标题动画由 bank 5 的代码直接驱动（不走
  state dispatch），但 TS 实现统一走状态机，不宜锁住。
- **修复**: 
  将 `bankLock = 1` 改为 `bankLock = 0`，添加注释说明原因。

### BUG-006: MpPlatform 图片加载/RAF 在小程序中不可用
- **状态**: 已修复
- **严重度**: 高
- **来源**: 微信开发者工具运行
- **描述**:
  1. `loadImage` 创建裸 JS 对象而非使用 `canvas.createImage()`
  2. `requestAnimationFrame` 回退使用 `window.setTimeout`（小程序无 window）
  3. 素材路径 `/sprites/` 不正确（实际在 `/public/sprites/`）
- **修复**:
  - MpPlatform 新增 `setMainCanvas()` 方法
  - loadImage 使用 `canvas.createImage()`
  - requestAnimationFrame 回退改为 `setInterval`
  - game.ts 中 spriteBasePath → `/public/sprites/`

---
- **状态**: 已修复
- **严重度**: 高
- **来源**: 微信开发者工具运行时报错
- **描述**: 
  微信小程序模块系统不支持 `from '../engine/states'` 自动解析到 `states/index.js`。
  而 Node.js / Web bundler 支持目录→index.js 的自动解析。
  `src/core/Tsubasa.ts:30` 导入了 `'../engine/states'`，编译后变成 `require('../engine/states')`，
  微信模块系统找不到 `src/engine/states.js`（实际文件是 `src/engine/states/index.js`）。
- **影响**: 
  小程序启动失败，白屏。
- **修复**: 
  将 `'../engine/states'` 改为 `'../engine/states/index'`。
  提交: `src/core/Tsubasa.ts`

---

## 已修复

- BUG-004: 微信小程序模块解析 - 目录index自动解析失败 (2026-08-04)

---

## 待验证

_暂无_
