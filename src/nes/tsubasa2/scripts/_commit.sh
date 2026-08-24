#!/bin/bash
cd /d/studio/github/monkeycode/src/nes/tsubasa2
git add .
git commit -m "fix(chr): refetch all 16 chr-bank-*.ts from ROM (was missing 1 byte per file)

[BUG #1] All src/game/chr/chr-bank-*.ts had only 8191 bytes instead of
the real 8192, causing HeadlessRuntime.buildChrRom() to ?? 0xff the
last byte per bank, misaligning tile planes.

scripts/_chr_refetch.cjs regenerates the 16 8KB bank files from
docs/roms/Captain Tsubasa II - Super Striker (Japan).nes (chrOff=0x40010).

Also adds:
- src/core/debug/pattern-table-viewer.ts: ChrSwitchRecord, pushChrSwitch,
  drainChrSwitchLog, buildChrBankMapByScanline, buildFinalChrBankMap,
  renderPatternTableAtScanline, renderBothPatternTablesAtScanline
- src/core/mappers/mapper0.ts: auto-pushChrSwitch in load1kVromBank
- src/game/runtime/HeadlessRuntime.ts: pushChrSwitch in loadChrSlot,
  expose vromTilesByBank1k via nes.rom.vromTile
- scripts/_emu_reference.ts/.cjs: tsnes reference dumper
- scripts/_emu_diff.cjs: H5 vs emulator diff (PT/NT/OAM/Palette/Screen)
- scripts/_ram_dump.ts/.cjs: dump key RAM at frame 30
- scripts/_chr_check.cjs: verify chr-bank data matches ROM
- InterruptService.applyChrRequest: read 0x0075/0x0076 (was reading
  0x0490-0x0497 which don't exist in ROM disasm)
- DEVLOG.md: BUG #1/#2/#3 entries"
git push
