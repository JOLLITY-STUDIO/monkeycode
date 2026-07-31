$ErrorActionPreference = "Stop"

# Check if lua53 exists
$bzkDir = "D:\studio\github\monkeycode\src\nes\tsubasa\tools\BZK-6502-Disassembler"
$luaExe = Join-Path $bzkDir "lua53.exe"

if (Test-Path $luaExe) {
    Write-Host "lua53.exe already exists at $luaExe"
    exit
}

# Download Lua 5.3.6
$zipPath = "$env:TEMP\lua53_new.zip"
$extractPath = "$env:TEMP\lua53_extract_new"

# Clean up old attempts
Remove-Item $zipPath -ErrorAction SilentlyContinue
Remove-Item $extractPath -Recurse -ErrorAction SilentlyContinue

# Try multiple download URLs
$urls = @(
    "https://sourceforge.net/projects/luabinaries/files/5.3.6/Tools%20Executables/lua-5.3.6_Win64_bin.zip",
    "https://iweb.dl.sourceforge.net/project/luabinaries/5.3.6/Tools%20Executables/lua-5.3.6_Win64_bin.zip"
)

$downloaded = $false
foreach ($url in $urls) {
    try {
        Write-Host "Trying: $url"
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        $client = New-Object System.Net.WebClient
        $client.DownloadFile($url, $zipPath)
        
        if ((Get-Item $zipPath).Length -gt 50000) {
            # Check if it's a valid zip (starts with PK)
            $bytes = [System.IO.File]::ReadAllBytes($zipPath)
            if ($bytes[0] -eq 0x50 -and $bytes[1] -eq 0x4B) {
                Write-Host "Valid ZIP downloaded: $(($bytes).Count) bytes"
                $downloaded = $true
                break
            } else {
                Write-Host "Downloaded file is not a ZIP, trying next URL..."
            }
        }
    } catch {
        Write-Host "Failed: $_"
    }
}

if (-not $downloaded) {
    Write-Host "All URLs failed. Trying winget..."
    winget install --id "Lua.Lua" --version "5.3.6" --accept-package-agreements --accept-source-agreements
    
    if (Test-Path "C:\Program Files\lua53\lua53.exe") {
        Copy-Item "C:\Program Files\lua53\lua53.exe" $luaExe
        Write-Host "Copied from winget install"
        exit
    }
    
    Write-Host "Could not download Lua. Please manually download lua53.exe from https://sourceforge.net/projects/luabinaries/files/5.3.6/Tools%20Executables/"
    exit 1
}

# Extract
Expand-Archive -Path $zipPath -DestinationPath $extractPath -Force

# Find and copy lua53.exe + dll
$exe = Get-ChildItem $extractPath -Recurse -Filter "lua53.exe" | Select-Object -First 1
if ($exe) {
    Copy-Item $exe.FullName $luaExe -Force
    Write-Host "lua53.exe copied to $bzkDir"
    
    $dll = Get-ChildItem $extractPath -Recurse -Filter "lua53.dll" | Select-Object -First 1
    if ($dll) {
        Copy-Item $dll.FullName (Join-Path $bzkDir "lua53.dll") -Force
        Write-Host "lua53.dll copied"
    }
} else {
    Write-Host "lua53.exe not found in extracted files!"
    Get-ChildItem $extractPath -Recurse | Select-Object FullName | ForEach-Object { Write-Host $_ }
}

# Clean up
Remove-Item $zipPath -ErrorAction SilentlyContinue
Remove-Item $extractPath -Recurse -ErrorAction SilentlyContinue

Write-Host "DONE"
