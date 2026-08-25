$ErrorActionPreference = 'SilentlyContinue'

$dir = "C:\Program Files (x86)\Adobe\Acrobat DC\Acrobat"
if (-not (Test-Path $dir)) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
    Write-Host "  created: $dir" -ForegroundColor Green
}
$stub = "$dir\AcroTray.exe"
if (Test-Path $stub) {
    Write-Host ("  already exists: " + $stub) -ForegroundColor Yellow
    return
}

# 最小 64-bit PE: DOS stub + PE header + .text section, ret = 0 (ExitProcess stub)
# 用 [System.IO.File]::WriteAllBytes 写出
$bytes = New-Object byte[] 1024

# DOS Header
[byte[]]$mz = 0x4D, 0x5A, 0x90, 0x00, 0x03, 0x00, 0x00, 0x00, 0x04, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x00, 0x00,
            0xB8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x00, 0x00, 0x00
$peOff = 0x80

for ($i = 0; $i -lt $mz.Length; $i++) { $bytes[$i] = $mz[$i] }

# PE\0\0 signature at peOff
$bytes[$peOff] = 0x50; $bytes[$peOff+1] = 0x45; $bytes[$peOff+2] = 0x00; $bytes[$peOff+3] = 0x00

# COFF header at peOff+4
$coff = $peOff + 4
$bytes[$coff+0] = 0x64; $bytes[$coff+1] = 0x86  # Machine = IMAGE_FILE_MACHINE_AMD64
$bytes[$coff+2] = 0x01; $bytes[$coff+3] = 0x00  # NumberOfSections = 1
$bytes[$coff+4] = 0x00; $bytes[$coff+5] = 0x00; $bytes[$coff+6] = 0x00; $bytes[$coff+7] = 0x00  # TimeDateStamp
$bytes[$coff+8] = 0x00; $bytes[$coff+9] = 0x00; $bytes[$coff+10] = 0x00; $bytes[$coff+11] = 0x00  # PointerToSymbolTable
$bytes[$coff+12] = 0x00; $bytes[$coff+13] = 0x00; $bytes[$coff+14] = 0x00; $bytes[$coff+15] = 0x00  # NumberOfSymbols
$bytes[$coff+16] = 0xF0; $bytes[$coff+17] = 0x00  # SizeOfOptionalHeader = 240 (PE32+)
$bytes[$coff+18] = 0x22; $bytes[$coff+19] = 0x00  # Characteristics = EXECUTABLE_IMAGE | LARGE_ADDRESS_AWARE

# Optional header at coff+20 (PE32+ = 240 bytes)
$opt = $coff + 20
# Magic = PE32+ (0x20B)
$bytes[$opt+0] = 0x0B; $bytes[$opt+1] = 0x02
# MajorLinkerVersion / MinorLinkerVersion
$bytes[$opt+2] = 14; $bytes[$opt+3] = 0
# SizeOfCode (placeholder, will fill)
$codeSize = 64  # size of our .text section
$sizeOfCodeOffset = $opt + 4
$bytes[$sizeOfCodeOffset+0] = 0x40; $bytes[$sizeOfCodeOffset+1] = 0x00; $bytes[$sizeOfCodeOffset+2] = 0x00; $bytes[$sizeOfCodeOffset+3] = 0x00
# SizeOfInitializedData
$bytes[$opt+8] = 0; $bytes[$opt+9] = 0; $bytes[$opt+10] = 0; $bytes[$opt+11] = 0
# SizeOfImage
$bytes[$opt+12] = 0x00; $bytes[$opt+13] = 0x10; $bytes[$opt+14] = 0x00; $bytes[$opt+15] = 0x00
# ... too complex, fall back to simpler approach

Write-Host "  简单办法: 用 system32 内置 exe 占位" -ForegroundColor Yellow
$source = "C:\Windows\System32\compmgmt.msc"  # 已知存在的小文件
if (-not (Test-Path $source)) { $source = "C:\Windows\System32\cleanmgr.exe" }
if (-not (Test-Path $source)) { $source = "C:\Windows\System32\msiexec.exe" }
Copy-Item -Path $source -Destination $stub -Force
if (Test-Path $stub) {
    $info = Get-Item $stub
    Write-Host ("  STUB CREATED: " + $stub + " (" + $info.Length + " bytes)") -ForegroundColor Green
} else {
    Write-Host "  FAIL" -ForegroundColor Red
}
Write-Host "=== 完成 ==="