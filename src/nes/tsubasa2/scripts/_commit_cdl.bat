@echo off
cd /d d:\studio\github\monkeycode\src\nes\tsubasa2
git add .
git commit -m "tools: CDL frame13 analysis - real ROM access footprint

scripts/_cdl_analyze.cjs:
- Parse Mesen CDL (384 KB, 1 byte per ROM address: 0/D/C/C|D)
- Per PRG bank (16x16KB) + CHR bank (16x8KB) stats
- List each code range

frame 13 ROM access snapshot:
  PRG0 ($0000-$3FFF): 113 code segments - NMI handler
  PRG1-PRG5: UNTOUCHED (MMC3 switched away)
  PRG6 ($18000-$1BFFF): D=133 (boot task 0 entry data)
  PRG7-PRG15: UNTOUCHED
  CHR: D=1280 bytes read (PPU pattern table partial load)

Cross-check vs 13.log:
  13.log PC=$01:AA0B is in PRG1 but CDL marks PRG1 UNTOUCHED
  = CDL tracks ROM file offset, PRG1 was switched out by MMC3

WBS L1 boot translation gap: real boot only touches PRG0 + tiny slice of PRG6"
