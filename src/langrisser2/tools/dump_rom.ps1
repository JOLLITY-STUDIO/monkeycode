param(
    [int]$Start = 0x3C0,
    [int]$End = 0x440
)

$bytes = [System.IO.File]::ReadAllBytes('d:\studio\github\monkeycode\src\langrisser2\20260713\Langrisser II (Japan)_68K-gens-rom-dump.bin')

for ($i = $Start; $i -lt $End; $i += 16) {
    $line = "{0:X6}: " -f $i
    $hex = ""
    $ascii = ""
    for ($j = 0; $j -lt 16 -and ($i + $j) -lt $End; $j++) {
        $b = $bytes[$i + $j]
        $hex += "{0:X2} " -f $b
        if ($b -ge 32 -and $b -le 126) {
            $ascii += [char]$b
        } else {
            $ascii += "."
        }
    }
    $line += $hex.PadRight(48) + " " + $ascii
    Write-Output $line
}
