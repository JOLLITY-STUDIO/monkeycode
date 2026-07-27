ROM Trace: TECMO_LOGO (Scene 0) 完整执行流
code
$800D: dispatch $27 → $8165 (scene init)
  ↓
$8165: PPU setup, clear state vars, bank switch
  ↓ falls through to progress logic
$80DF-$81D3: 进度表查表
  ├─ $83DC[0]=0x02 → $8464(2) + $82B5  ← Script 02
  └─ $8420[0]=0x03 → $8464(3) + $82B5  ← Script 03
  ↓
$8464: 查 $8AEC 表 → MMC3 bank 3→ pointer table $A004 → script data at bank4 $A626
  ↓
$84C5: 主循环逐字节执行 bytecode

ROM Trace: TECMO_LOGO (Scene 0) 完整执行流
code
$800D: dispatch $27 → $8165 (scene init)
  ↓
$8165: PPU setup, clear state vars, bank switch
  ↓ falls through to progress logic
$80DF-$81D3: 进度表查表
  ├─ $83DC[0]=0x02 → $8464(2) + $82B5  ← Script 02
  └─ $8420[0]=0x03 → $8464(3) + $82B5  ← Script 03
  ↓
$8464: 查 $8AEC 表 → MMC3 bank 3→ pointer table $A004 → script data at bank4 $A626
  ↓
$84C5: 主循环逐字节执行 bytecode
Script 02 (23B): 写 TECMO 方砖字 16 1E 2E A4 A0 00 1A 15 0E 29 19 06 78 → FC/DE 分支 → FD 子程序 → FB 清除 → 01 44 tile → F7 读输入 → F3 文本速度 → FF 结束

Script 03 (79B): 写更多 tile + 文本排版 + DC 文本分支 + EA(清 nametable) + FF 结束

关键点：脚本数据在 ROM bank 4 的 
�
000
−
A000−BFFF 区域，通过 bank 3 的指针表间接引用