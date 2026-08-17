$lines = Get-Content 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/service/bank02_scene.service.ts'
$h = ($lines | Select-String 'private _jumpHandler_').Count
$f = ($lines | Select-String 'case \d+: return this\._jumpHandler').Count
$s = ($lines | Select-String '_subA82F|_subA767|_subA72C').Count
Write-Output ("handlers={0} cases={1} subs={2}" -f $h, $f, $s)
