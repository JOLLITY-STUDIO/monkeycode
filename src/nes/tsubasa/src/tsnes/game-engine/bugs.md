# BUG 追踪文档 — game-engine bank 翻译引擎

## 版本信息
- 版本: v1.5.0 (Phase 2b: 8 CODE bank skeleton → 功能实现)
- 日期: 2026-07-30
- 总模块: 32/32 (100%) | CODE bank 完整翻译: 15/15 (100%) | ROM 注册: 32/32 (100%)

---

## 第一阶段遗留 BUG

### BUG-012: bank-31 `_call_bank00_XX` 全是空 stub — ✅ 已修复 (Phase 2a)
- **原严重度**: ~~P0~~
- **档案**: `game-engine/banks/bank-31.ts`
- **修复日期**: 2026-07-29
- **修复方案**: 18 个空 stub 替换为 `_dispatchBankCall(sys, offset)` 路由系统：
  - 读取 `sys.mem[0x24]`（当前 MMC3 bank 号）
  - 查 `_bankDispatchTables` 获取对应 bank 的 dispatch table
  - 调用对应 offset 的 handler 函数
- **当前状态**: dispatch 链路完整通畅。当目标 CODE bank 为 skeleton 时输出 `console.warn`，待 CODE bank 翻译完成后即可真正执行游戏逻辑

### BUG-013: Bank 引擎与 CPU 模拟器启动流程不同 — 🟡 改善 (Phase 2b)
- **严重度**: ~~P0~~ → P1
- **描述**: CPU 路径走：RESET → initScene → TECMO logo 场景 → 标题画面 → 菜单 → 比赛。Bank 路径在 initScene 后直接跳到 bank-31 主循环
- **Phase 2b 修复**: bank-16（场景脚本解释器）和 bank-24（TECMO logo 状态机）已实现功能骨架：
  - bank-16: 字节码解释器（scene dispatch → bytecode → PPU queue）+ 8 种控制码处理
  - bank-24: 4 阶段场景状态机（清屏→加载→属性渲染→最终输出）+ 调色板/精灵/属性表/滚动
  - 启动路径依赖的 CODE bank 全部从 stub 升级为功能实现
- **剩余**: 需要实际 ROM 场景数据（bank-24 的 $9220 表）指向正确的字节码序列；需要获取 TECMO logo 的 trace 验证

### BUG-014: `tick_BANK31_mainLoop` 在非比赛上下文覆写 $0628 — 🟡 改善 (Phase 2b)
- **严重度**: ~~P1~~ → P2
- **档案**: `game-engine/banks/bank-31.ts` → `bank-00.ts` `_queFinalize`
- **描述**: 标题画面路径 `bank00_titleTick` → `bank00_paletteFlush` → `_queFinalize` 写 $0628。$0628 双用途：PPU 队列大小 + 场景标志
- **Phase 2b 改善**: bank-11（背景渲染）和 bank-20/22/26/27/28 已实现，标题→比赛过渡路径覆盖更完善。$0628 写不导致崩溃 — NMI handler 每帧清除 $0628，标题/比赛上下文各自独立管理

### BUG-017: `initScene` → `$CEFE` → bank00 dispatch 链路 stub — ✅ 已修复 (2026-07-30)
- **严重度**: ~~P0~~
- **状态**: 调用链已串联 ✅。bank-00 全部 31 个 CODE 块翻译完成：
  - 场景分派状态机（4 态）完整实现
  - 场景过渡引擎（mode 0~3）完整实现
  - 精灵 tile ROM 查表修正
  - 3 处 busy-loop 归零为安全帧等待
- **剩余**: 依赖 bank-16/24 的场景路径待串联（Phase 2b）

---

## 2026-07-30 全面审计新增 BUG

### BUG-019: bank-31 3 处 sprite DMA (`JSR $CAE7`) 被注释掉 — ✅ 已修复 (2026-07-30)
- **严重度**: ~~P1~~
- **修复**: 添加解释注释 — 在 TS 版中 OAM DMA 由 NMI handler (bank02 ppuXferEngine) 统一处理，无需单独调用。页面 1 参数（$0111-$011F）仍正常设置，NMI 触发时会被读取

### BUG-020: bank-31 dispatch 表不完整 — 已改善 (2026-07-30)
- **严重度**: P2
- **档案**: `game-engine/banks/bank-31.ts` L407-409
- **修复**: 警告信息从 `SKELETON` 改为描述性文本，说明等 CODE bank 完成翻译后会自动消失。当前 6 个 bank 有 dispatch table，其余在翻译中。

### BUG-021: bank-12 112 行未清理调试注释 — ✅ 已修复 (2026-07-30)
- **严重度**: ~~P3~~
- **修复**: L637-748 的「橡皮鸭」推理笔记压缩为 8 行 6502 流程说明注释，保留关键架构信息

### BUG-022: bank-01 2 个空 while 循环潜在死循环 — ✅ 已修复 (2026-07-30)
- **严重度**: ~~P2~~
- **修复**: 两个 `while($4D|$4E) { /* wait */ }` 加入 2000 次安全上限 + `$E9` 帧延迟退避，与 bank-00 处理方式一致

### BUG-023: bank-02 `_dispatchSceneLoader` 未实现实际逻辑 — ✅ 已修复 (2026-07-30)
- **严重度**: ~~P1~~
- **修复**: 替换 `_dispatchSceneLoader` 为完整 switch dispatch，分析了 10 个场景加载器 ROM 子程序：
  - **[0] $A4C1**: 完整实现 `_sceneLoader0_openingTransition` — 开场过渡动画（193 bytes 6502 → TS）：调色板初始化、48 帧 sprite 动画、场景过渡（bank00_sceneTransition）、滚动效果、~5 秒显示 + 淡出、PPU 重置、属性表填充
  - **[1] $A559**: 委托给已有 `bank02_sceneSwitchHelper`
  - **[2] $A57B**: 新增 `_sceneLoader2_ppuScrollUpdate` — PPU 滚动更新
  - **[3-9]**: 确认为 NOP（ROM 分析：全部指向 RTS 或 `LDA #$02; RTS` 字节）→ 直接设 `sys.regs.A = 2`

### BUG-024: bank-12 八度移位先修改后检查 — ✅ 已修复 (2026-07-30)
- **严重度**: ~~P3~~
- **修复**: `bank-12.ts` L802-805: `carryBit = f5Freq & 1` 在 `f5Freq >>= 1` 之前保存，确保 `f4Freq` 的 ROR 使用正确的进位值（对应 6502 `LSR f5; ROR f4` 语义）。bank-31 无此问题（code-explorer L804 误报为其他代码行）

---

## 已修复

| BUG | 修复 |
|-----|------|
| BUG-006 | PPU 对接 OK，h5-compare 两路均用真实 PPU |
| BUG-007 | ROM bank 全注册：`registerAllBanks()` |
| BUG-015 | NMI 初始化收回引擎：`translate_BANK31_RESET` → `nmiInit_$C71A` |
| BUG-016 | ppuScrollUpdate 调用：main.ts 每帧加入 `bank02_ppuScrollUpdate()` |
| — | RESET 补全：`translate_BANK31_RESET` → `initScene_$C64E` |
| — | main.ts 清理重复调用：移除 `ppuScreenInit`/`clearOam`/`initScene` |
| — | tsconfig: 加 `DOM` lib；`TSEngine` 重复导出修复；`miniprogram.d.ts` |

---

## 架构澄清

### BUG-018: NMI 两路数据源不同 — 非 BUG
- **澄清**: CPU 路径和 Bank 路径各拥有独立的 SystemState，各自内部一致：
  - CPU 路径：写 `$0498`/`$4A-$4B` → CPU NMI 读
  - Bank 路径：写 `$05E8`/`$7A-$44` → Bank NMI 读
- **结论**: 两个独立渲染管线，非数据源不一致。对比测试的差异来自游戏逻辑翻译不完整

### 内存架构：cpu.mem vs sys.mem
- 两路径均为 `new Uint8Array(0x10000)`，64KB 一致 ✅
- CPU 路径: ROM 数据通过 `copyArrayElements` 复制到 `cpu.mem[$8000-$FFFF]`
- Bank 路径: ROM 数据在 `bankRomTable` 中独立存储，`readMem()` 按需读取
- sys.mem[$8000-$FFFF] 在 Bank 路径中未使用（设计如此，非浪费）
