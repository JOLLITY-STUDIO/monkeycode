$ErrorActionPreference = 'Stop'
$dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out/bank_02'
$patterns = @('24C0','2559','257B','2581','25A2','25A8','25B0','25B8','25BF','25CD','25DB','25E8','2602','261C','2629','2650','269C','277A','2782','27BD','27CE','27D6','27FA')
Get-ChildItem -Path $dir -Filter 'bank_02_part*.asm' | ForEach-Object {
  $file = $_
  $content = Get-Content -LiteralPath $file.FullName -Encoding UTF8
  foreach ($p in $patterns) {
    for ($i = 0; $i -lt $content.Count; $i++) {
      if ($content[$i] -match $p) {
        Write-Output ("{0}|{1}|{2}" -f $file.Name, $i, $content[$i].Trim())
        break
      }
    }
  }
}
