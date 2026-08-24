$out = "d:\studio\github\monkeycode\src\nes\tsubasa2\debug\nesgen"
New-Item -ItemType Directory -Force -Path $out | Out-Null
$nesgenDir = "d:\studio\github\monkeycode\src\nes\tools\NESgen\NESgen\NESgen"
Set-Location $nesgenDir
$rom = "d:\studio\github\monkeycode\src\nes\tsubasa2\src\asm\dist\tsubasa2.nes"
& python NESgen.py -i $rom -c "$out\game.c" -h "$out\game.h" *> "$out\run_log.txt"
Write-Output "exit=$LASTEXITCODE"
Get-ChildItem $out -ErrorAction SilentlyContinue | Select-Object Name, Length | Out-File "$out\files.txt"
