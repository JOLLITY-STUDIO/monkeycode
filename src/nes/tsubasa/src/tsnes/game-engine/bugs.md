# BUG 追踪文档 — game-engine bank 翻译引擎

## 版本信息
- 版本: v1.6.0 (Phase 8 完成, Phase 9 准备中)
- 日期: 2026-08-02
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

---

## 2026-08-02 无画面 BUG 深度诊断

### BUG-034: Bank 引擎始终黑屏无画面 [P0] 🔴

**严重度**: P0（游戏完全不可玩）

**现象**: Bank 翻译引擎启动后，canvas 始终显示全黑画面（buf nonZero=0），CPU 模拟器侧正常显示。

**渲染管线架构**:

```
帧循环 (orchestrator._frameLoop)
  │
  ├── tick_BANK31_mainLoop(sys)     ← 游戏逻辑 + boot/title 路由
  │     ├── $0700=0x30 → bank00_tickBoot (12 阶段状态机)
  │     └── $0700=0x33 → bank00_titleTick
  │
  ├── bank02_nmiHandler(sys)        ← NMI: PPU 队列→vram + $2001恢复
  │     ├── $0628===0 → 跳过渲染 (常见于boot阶段)
  │     └── $0628!==0 → 读取$05E8队列→写入$2007
  │
  ├── bank02_ppuScrollUpdate(sys)   ← 滚动/CHR/手柄
  │
  └── _ppuStepFullFrame(ppu)        ← PPU 逐行渲染 → frameBuf
```

**Boot 阶段 PPU 数据流**:

| Phase | 操作 | 写入 PPU | $0021 | 期望画面 |
|-------|------|----------|-------|---------|
| RESET | `initScene_$C64E` + `ppuScreenInit_$CB35` | nametable 全 $00 | 0x1E | 全黑(正常) |
| 0 | `bank00_ppuClear` → $2007×1024 | nametable 0 $00 | 0x1E | 全黑(正常) |
| 0 | `bank00_execBytecode(1)` 初始化指针 | 无 | 0x1E | 全黑(正常) |
| 1 | `bank00_bytecodeWaitTick` 逐帧 bytecode | 取决于脚本 | 0x1E | **可能全黑** |
| 2-9 | 场景加载/setup | 可能 PPU 写入 | 0x1E | 取决于实现 |
| 10 | `bank01_titleInit` → 写 tiles+palette | $21C4 tiles, $3F00 palette | 0x1E | **应该显示标题** |
| 11 | DONE → $0700=0x33 → titleTick | bytecode 淡入 | 0x1E | 标题画面 |

**已排除的根因**:

1. ✅ **`$0021` (PPUMASK) 正确**: `ppuScreenInit_$CB35` 将其设为 `0x1E`（bg+sp ON, 彩色模式），之后未被修改。
2. ✅ **`_restorePPU` 调用正确**: `bank02_nmiHandler` 在跳过 `$0628` 路径仍会调用 `_restorePPU`，将 `$0021` 写回 `$2001`。
3. ✅ **`writeMem` PPU 转发正确**: `$2006→writeVRAMAddress`, `$2007→vramWrite`, `$2001→updateControlReg2` 全部转发到 PPU 实例。
4. ✅ **Boot 结构合理**: 12 阶段每帧一阶段，不会跳过帧。

**可能根因（按概率排序）**:

**① [最可能] bytecode 在 phase 1 卡死 — 永远不会进入 titleInit**
- `bank00_bytecodeWaitTick` 依赖 `bank00_execBytecode` 返回延迟值
- 若 bytecode 脚本指针 (`ZP_SCRIPT_PTR_L/H`) 未正确初始化或在 ROM 中未找到有效脚本，可能无限在 phase 1 循环
- **验证方法**: 检查 `sys.bootPhase` 是否卡在 1，以及 `sys.bootSubStep` 是否持续增长
- **文件**: `bank-00-code.ts` `bank00_bytecodeWaitTick` / `bank00_execBytecode`

**② [高概率] PPU `updateControlReg2` 未正确设置内部可见性标志**
- `writeMem(sys, 0x2001, 0x1E)` 调用 `ppu.updateControlReg2(0x1E)`
- PPU 内部需要正确设置 `f_bgVisibility`=`true`, `f_spVisibility`=`true`
- 若 `updateControlReg2` 实现有误，PPU 渲染时不会读取 nametable/palette
- **文件**: `game-engine/core/ppu/index.ts` 的 `updateControlReg2`

**③ [中概率] CHR tile pattern 未加载到 PPU ptTile**
- `boot.ts` `createTsubasaNES` 调用 `loadChrTiles(nes.ppu.ptTile, NES_CHR_ROM, 0)` 加载前 8KB CHR
- 但 MMC3 支持 CHR bank 切换（多个 8KB CHR bank）
- 若 title 画面使用非 bank 0 的 CHR tile，则 ptTile 中无对应 pattern
- `writeMem` 中 `$8000/$8001` 仅转发 CHR 选择给 PPU mmap，但 mmap 的 `write` 方法来自 `createBankMmap` stub，可能未正确处理
- **文件**: `boot.ts` `createBankMmap`, `system-state.ts` `writeMem` L156-173

**④ [中概率] PPU 帧渲染调用方式错误**
- `_ppuStepFullFrame` 调用 `ppu.advanceDots(341)` 循环渲染
- PPU 需要正确设置: 已写入的 vramMem、palette、ptTile、$2000/$2001 影子寄存器
- 若 PPU 内部状态机在 `advanceDots` 期间未正确从 vramMem 读取，输出全 0
- **文件**: `orchestrator.ts` `_ppuStepFullFrame`

**⑤ [低概率] `bank01_titleInit` palette 写入不完整**
- 使用硬编码 `bgColors` 数组（带 FIX 注释）而非从 ROM 加载
- 若 PPU 期望的色值索引与实际 `imgPalette` 转换表不匹配，可能显示为全黑
- **文件**: `bank-01-code.ts` `bank01_titleInit` palette 写入部分

**⑥ [低概率] `writeMem` 中 PPU 寄存器地址计算偏移量错误**
- PPU 寄存器 `$2000-$2007` 使用 `addr & 0x7` 索引
- 需确认 mirror 地址 `$2008-$3FFF` 也正确路由

**诊断步骤**:

1. **Phase 追踪**: 在 `bank00_tickBoot` 添加 console.warn 每帧打印 phase/subStep — 代码中已有 console.log
2. **PPU 状态快照**: 在 `_stepBankEngine` 每帧打印 `ppu.f_bgVisibility`, `ppu.f_spVisibility`, `ppu.scanline` — orchestrator.ts 已有 `_logPPUDiag`
3. **vramMem 检查**: 在 phase 10 之后检查 `ppu.vramMem[$3F00..$3F1F]` 是否有非零 palette 值
4. **ptTile 检查**: 检查 `ppu.ptTile[0]` 是否包含有效 pattern 数据
5. **CHR bank 检查**: 确认 title nametable 引用的 tile 索引与实际 ptTile 中的 pattern 匹配

---

## 2026-08-02 首次修复 (BUG-034 根因分析 + 修复)

### 根因 A: MMC3 CHR bank 切换是空操作 ✅ 已修复

**严重度**: P0（核心根因）

**描述**: `boot.ts` `createBankMmap` 返回的 mmap stub 对象**没有 `write` 方法**。当 `system-state.ts` 的 `writeMem` 处理 MMC3 CHR 寄存器写入（$8000/$8001, sel 0-5）时，代码检查 `typeof mmap.write === 'function'` 为 `false`，CHR bank 切换被静默跳过。

**影响**: PPU 始终只有 CHR bank 0 的 tile pattern（前 512 tiles），永远不会加载其他 15 个 CHR bank 的数据。如果标题画面/bytecode 使用了非 bank 0 的 tile，则渲染全 0 色板索引（背景色→黑屏）。

**修复**: 重写 `createBankMmap`，新增：
- `mmap.write(addr, val)` 方法：处理 MMC3 $8000 (bank select) 和 $8001 (bank data)
- `_loadChrPage(ptTile, chrRom, sel, pageNum)` 公共函数：将指定 MMC3 CHR 页（1KB 或 2KB）加载到 ptTile 对应窗口
- MMC3 CHR 窗口映射表：Reg 0→tiles 0-127, Reg 1→tiles 64-191, Reg 2-5→tiles 128-255
- 初始化时加载所有 6 个窗口的页 0（默认值）

**文件**: `boot.ts` L58-122

### 根因 B: PPU `cntsFromAddress` fine Y scroll 掩码错误 ✅ 已修复

**严重度**: P1（导致 fine Y scroll 值 4-7 丢失）

**描述**: `cntsFromAddress()` 中 `this.cntFV = (address >> 4) & 3;` 使用 `& 3`（2-bit 掩码），但 fine Y scroll 是 3-bit（0-7）。同样错误在 `regsFromAddress` 使用 `& 7`（正确）。

**影响**: 当 VRAM 地址的 fine Y 部分为 4-7 时，`cntFV` 被错误解码为 0-3，导致背景扫描线像素偏移错误（tile 内部行位置错位）。

**修复**: `cntsFromAddress` 的 `& 3` 改为 `& 7`，与 `regsFromAddress` 保持一致。

**文件**: `game-engine/core/ppu/index.ts` L1190

### 根因 C: 队列机制 ($0628/$05E8) 在 boot 阶段被完全绕过 ⚠️ 架构已知

**严重度**: P3（设计如此，bank01_titleInit 直接写 PPU 补偿）

**描述**: boot 阶段（phase 0-10）永远不会设置 `$0628`，NMI handler 始终走 `$0628===0 → _restorePPU → return` 跳过路径。`bank01_titleInit` 的 FIX 注释确认了这点，并直接通过 `writeMem($2006/$2007)` 写入 PPU。但 bytecode 脚本在 phase 1 期间写入 nametable 的路径尚未确认是否绕过队列。

**状态**: `bank01_titleInit` 已绕过队列直接写 PPU ✅。bytecode 脚本（opcode $00-D7 raw tile）也通过 `_bytecode_writePPUTile` → `writeMem($2007)` 直接写 PPU ✅。队列机制在 title tick 阶段（bytecode fade op $EC）正常激活。

### 修复总结

| 修复 | 文件 | 影响 |
|------|------|------|
| CHR bank 切换 → mmap.write 方法 | `boot.ts` | P0, 核心根因 |
| cntsFromAddress & 3 → & 7 | `core/ppu/index.ts` | P1, fine Y 精度修复 |
| 队列绕过已确认为设计行为 | N/A | P3, 已验证安全 |
