Set-Location 'd:\studio\github\monkeycode\src\nes\tsubasa2'
$out = & npx tsc --noEmit -p tsconfig.json 2>&1 | Out-String
if ($LASTEXITCODE -ne 0) {
  Write-Host "===TSC EXIT $($LASTEXITCODE)==="
  Write-Host $out
} else {
  Write-Host '===TSC CLEAN==='
}
