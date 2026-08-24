$ErrorActionPreference = 'Continue'
Write-Output "=== winget search mingw ==="
winget search mingw --accept-source-agreements 2>&1 | Select-Object -First 15
Write-Output "=== install mingw (winlibs) ==="
winget install -e --id BrechtSanders.WinLibs.POSIX --accept-source-agreements --accept-package-agreements 2>&1 | Select-Object -Last 10
Write-Output "=== verify gcc ==="
$candidates = @(
    "C:\Program Files\mingw64\bin\gcc.exe",
    "C:\Program Files\WinLibs\mingw64\bin\gcc.exe",
    "C:\mingw64\bin\gcc.exe"
)
$found = $candidates | Where-Object { Test-Path $_ }
if ($found) { & $found[0] --version 2>&1 | Select-Object -First 1 } else { Write-Output "gcc not found in common paths, check winget output above" }
