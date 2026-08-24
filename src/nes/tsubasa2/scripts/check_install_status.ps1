$log = "d:\studio\github\monkeycode\src\nes\tsubasa2\debug\install_status.txt"
$lines = @()
$dotnet = "$env:LOCALAPPDATA\Microsoft\dotnet\dotnet.exe"
$lines += "dotnet.exe exists: $(Test-Path $dotnet)"
$lines += "D:\mingw64.zip size: $((Get-Item 'D:\mingw64.zip' -ErrorAction SilentlyContinue).Length)"
$lines += "D:\mingw64\bin\gcc.exe exists: $(Test-Path 'D:\mingw64\bin\gcc.exe')"
$lines += "--- powershell processes ---"
Get-Process powershell -ErrorAction SilentlyContinue | ForEach-Object { $lines += "  PID=$($_.Id) Start=$($_.StartTime.ToString('HH:mm:ss'))" }
$lines += "--- curl processes ---"
Get-Process curl -ErrorAction SilentlyContinue | ForEach-Object { $lines += "  PID=$($_.Id)" }
$lines += "--- install_all_log tail ---"
$lines += (Get-Content "d:\studio\github\monkeycode\src\nes\tsubasa2\debug\install_all_log.txt" -Tail 5 -ErrorAction SilentlyContinue)
$lines | Out-File $log -Encoding utf8
