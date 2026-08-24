$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
Write-Output "=== downloading dotnet-install.ps1 ==="
Invoke-WebRequest https://dot.net/v1/dotnet-install.ps1 -UseBasicParsing -OutFile "$env:TEMP\dotnet-install.ps1"
Write-Output "=== installing .NET SDK 8.0 ==="
& powershell -ExecutionPolicy Bypass -File "$env:TEMP\dotnet-install.ps1" -Channel 8.0
Write-Output "=== verify ==="
$dotnet = "$env:LOCALAPPDATA\Microsoft\dotnet\dotnet.exe"
if (Test-Path $dotnet) {
    & $dotnet --version
    & $dotnet --list-sdks
} else {
    Write-Output "INSTALL FAILED: dotnet.exe not found at $dotnet"
}
