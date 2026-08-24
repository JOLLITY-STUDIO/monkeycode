$log = "d:\studio\github\monkeycode\src\nes\tsubasa2\debug\toolchain_check.txt"
$lines = @()
$dotnet = "$env:LOCALAPPDATA\Microsoft\dotnet\dotnet.exe"
$lines += "dotnet($dotnet) exists: $(Test-Path $dotnet)"
if (Test-Path $dotnet) {
    $lines += (& $dotnet --list-sdks 2>&1 | Out-String).Trim()
}
$gccCandidates = @(
    "C:\Program Files\mingw64\bin\gcc.exe",
    "C:\Program Files\WinLibs\mingw64\bin\gcc.exe",
    "C:\mingw64\bin\gcc.exe",
    "D:\mingw64\bin\gcc.exe"
)
$foundGcc = $gccCandidates | Where-Object { Test-Path $_ }
$lines += "gcc found: $($foundGcc -join '; ')"
if ($foundGcc) { $lines += (& $foundGcc[0] --version 2>&1 | Select-Object -First 1) }
# winget 列表里查 mingw
$winget = winget list --id BrechtSanders.WinLibs.POSIX --accept-source-agreements 2>&1 | Out-String
$lines += "winget winlibs: " + (($winget -split "`n" | Select-Object -Last 3) -join " | ")
$lines | Out-File $log -Encoding utf8
Write-Output "done"
