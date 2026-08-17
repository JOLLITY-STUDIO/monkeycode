$out = @()
$lines = Get-Content 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out/bank_02/bank_02_part02.asm'
for ($i = 0; $i -lt $lines.Count; $i++) {
  if ($lines[$i] -match '8A97|AA97') {
    $out += ("{0}|{1}" -f ($i + 1), $lines[$i])
  }
}
$out | Out-File -Encoding utf8 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out/bank_02/_find_aa97.txt'
