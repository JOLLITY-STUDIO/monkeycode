$bytes = [System.IO.File]::ReadAllBytes('d:\studio\github\monkeycode\src\nes\tsubasa\romdata\Captain Tsubasa II - Super Striker (Japan).nes')
$start = 0x6A57
$end = $start + 256
$out = @()
for($i=$start; $i -lt $end; $i+=16) {
  $addr = '0x{0:X4}' -f ($i - 16 - 0x4000 + 0x8000)
  $hex = ($bytes[$i..([Math]::Min($i+15, $end-1))] | ForEach-Object { '{0:X2}' -f $_ }) -join ' '
  $out += "Bank 01 `${addr}: $hex"
}
$out -join "`n" | Out-File 'd:\studio\github\monkeycode\_hexdump_aa47.txt' -Encoding UTF8
Write-Output "DONE"
