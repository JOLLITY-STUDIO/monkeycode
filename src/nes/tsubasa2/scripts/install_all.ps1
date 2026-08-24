$ErrorActionPreference = 'Continue'
$log = "d:\studio\github\monkeycode\src\nes\tsubasa2\debug\install_all_log.txt"
Start-Transcript -Path $log -Force
$ProgressPreference = 'SilentlyContinue'

Write-Output "===== [1/3] install .NET SDK 8.0 ====="
$dotnet = "$env:LOCALAPPDATA\Microsoft\dotnet\dotnet.exe"
if (Test-Path $dotnet) {
    Write-Output "dotnet already exists, version:"
    & $dotnet --version
} else {
    Invoke-WebRequest https://dot.net/v1/dotnet-install.ps1 -UseBasicParsing -OutFile "$env:TEMP\dotnet-install.ps1"
    Write-Output "downloaded installer, running..."
    & "$env:TEMP\dotnet-install.ps1" -Channel 8.0
    if (Test-Path $dotnet) {
        Write-Output "dotnet installed:"
        & $dotnet --version
    } else {
        Write-Output "DOTNET INSTALL FAILED"
    }
}

Write-Output "===== [2/3] install gcc (winlibs) ====="
$gcc = "D:\mingw64\bin\gcc.exe"
if (Test-Path $gcc) {
    Write-Output "gcc already exists"
} else {
    $zip = "D:\mingw64.zip"
    if (-not (Test-Path $zip)) {
        Write-Output "downloading winlibs (261MB)..."
        curl.exe -L --retry 3 -o $zip "https://github.com/brechtsanders/winlibs_mingw/releases/download/16.2.0posix-14.0.0-ucrt-r1/winlibs-x86_64-posix-seh-gcc-16.2.0-mingw-w64ucrt-14.0.0-r1.zip" 2>&1 | Select-Object -Last 3
    }
    if (Test-Path $zip) {
        Write-Output "extracting..."
        tar.exe -xf $zip -C "D:\"
        Remove-Item $zip -Force
    }
}
if (Test-Path $gcc) {
    Write-Output "gcc installed:"
    & $gcc --version | Select-Object -First 1
} else {
    Write-Output "GCC INSTALL FAILED"
}

Write-Output "===== [3/3] verify ====="
Write-Output "dotnet exists: $(Test-Path $dotnet)"
Write-Output "gcc exists: $(Test-Path $gcc)"
Stop-Transcript
