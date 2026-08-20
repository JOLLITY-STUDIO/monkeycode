$f = "d:\studio\github\monkeycode\src\nes\tsubasa2\dist\tsubasa2.nes"
$b = [System.IO.File]::ReadAllBytes($f)
$v = 16 + 256*1024 - 6
"Vectors @ NES offset $v :"
"  NMI   = ${0:X2}{1:X2} (= 0x{1:X2}{0:X2})" -f $b[$v], $b[$v+1]
"  Reset = ${0:X2}{1:X2} (= 0x{1:X2}{0:X2})" -f $b[$v+2], $b[$v+3]
"  IRQ   = ${0:X2}{1:X2} (= 0x{1:X2}{0:X2})" -f $b[$v+4], $b[$v+5]
"  (expected: NMI=0xE0E7, Reset=0xE000, IRQ=0xE133)"

