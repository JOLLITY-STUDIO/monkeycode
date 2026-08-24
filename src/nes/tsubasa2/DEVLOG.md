
## 2026-08-24 - PPU 调试增强 + CHR bank 字节数 BUG 修复

### 背景
用 tsnes 模拟器（`src/core/nes.ts`）跑同一份 ROM 作 H5 转写版本的对照基线，
发现 H5 端 PT sheet 与 emulator dump 差异巨大（PT 0% 一致）。

### 工具新增
- `scripts/_emu_reference.ts` + `scripts/_emu_reference.cjs` — 用 TS NES 模拟器
  跑 ROM 300 帧，dump PPU 状态到 `output/emu-reference/frame-NNN/`：
  `screen.png` / `pt-sheet-scan*.png`（按 scanline 多张）/ `chr-switches.json` /
  `oam.png` / `oam-composite.png` / `nt0..nt3.png` / `palette.{png,json}`
- `scripts/_emu_diff.cjs` — 量化对比 H5 `output/ppu-trace/` 与 `output/emu-reference/`
  在 PT / NT / OAM / Palette / Screen 像素 / PT-by-scanline 的差异
- `src/core/debug/pattern-table-viewer.ts` 新增：
  - `ChrSwitchRecord` / `pushChrSwitch` / `drainChrSwitchLog` /
    `getChrSwitchesInRange` / `buildChrBankMapByScanline` / `buildFinalChrBankMap` /
    `renderPatternTableAtScanline` / `renderBothPatternTablesAtScanline`
  - mapper 的 `load1kVromBank` 在 `src/core/mappers/mapper0.ts` 自动记账
- `HeadlessRuntime.loadChrSlot` 同步调 `pushChrSwitch`，暴露 `vromTilesByBank1k` 给 viewer

### 发现的 BUG

#### BUG #1 - chr-bank-*.ts 字节数不足（已修）
- **现象**：所有 16 个 `src/game/chr/chr-bank-*.ts` 文件只有 8191 字节，
  比 ROM 真实 8KB（8192 字节）少 1 字节
- **影响**：`HeadlessRuntime.buildChrRom()` 用 `?? 0xff` 补末尾 1 字节，
  导致每个 8KB bank 末尾 1 字节错位，tile 字节错位 → PT 内容跟 ROM 不一致
- **修复**：`scripts/_chr_refetch.cjs` 从 `docs/roms/Captain Tsubasa II - Super Striker (Japan).nes`
  重新抽取 16 个 8KB bank 字节（每文件 8192 字节）覆盖原文件
- **状态**：已修

#### BUG #2 - boot 时序：frame 30 H5 game logic 还没到 loadChrConfig
- **现象**：frame 30 时 H5 `Scene0Controller` 还在 `OamDrift` phase，
  `loadChrConfig(0x17)` 没被调，所以 `applyChrRequest` 读 `$0075=0`，
  最终切 bank = `[0,1,2,3, 0,0,0,0]`（空 tile）
- **EMU 同时刻** 切 bank = `[124,125,126,127, 252,113,82,83]`（日文标题屏）
- **根因**：H5 game logic 状态机比 ROM 实际慢 30+ 帧（ROM frame 30 已到 title screen，
  H5 还在 fadeIn+OamDrift 阶段）
- **修复方向**（待办）：
  1. 加快 `Scene0Controller` 状态机推进（譬如把 OamDrift 0x30 帧减为更小）
  2. 或在 boot 阶段立即调 `loadChrConfig(0x17)` 装载 title screen 资源
- **状态**：未修（记 BUG，待 WBS 任务分解）

#### BUG #3 - applyChrRequest 翻译历史（已修）
- **现象**：`InterruptService.applyChrRequest` 早期版本读 RAM `$0490-$0497`
  （ROM 反汇编里完全不存在的地址）
- **修复**：现版本读 `$0075/$0076`（ROM $8AF7 subroutine 写的真实位置），
  按 `chrSel` 切 4 slot
- **状态**：已修（但因 BUG #2 触发不了，验证不充分）

### 验证
- frame 30 量化 diff：PT 0% / OAM 35.9% / Screen 12.5%
- PT 0% 主要因 BUG #2（H5 切 bank 跟 emu 不同）
- Screen 12.5% 因为 BUG #2 导致 PT 内容空
- frame 120+ Screen 98.2%：H5 game logic 跑到一定帧后跟 ROM 大致同步

### 下一步
1. 修 BUG #2：H5 boot 阶段立即装载 title screen CHR 配置
2. 修 BUG #2 后重新跑 emu_diff，PT 一致性应大幅提升
3. 把 ROM $8BAB 之后的循环切 bank subroutine（涉及 $005E/$005F stream 处理）
   翻译进 H5，让 sprite 区也能切 bank
