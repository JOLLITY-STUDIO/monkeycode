$ErrorActionPreference = 'SilentlyContinue'

Write-Host "=== AcroTray.exe 占位修复 ===" -ForegroundColor Cyan

$dir = "C:\Program Files (x86)\Adobe\Acrobat DC\Acrobat"
if (-not (Test-Path $dir)) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
    Write-Host "  created: $dir" -ForegroundColor Green
}

$stub = "$dir\AcroTray.exe"
if (Test-Path $stub) {
    $existing = Get-Item $stub
    Write-Host "  ALREADY EXISTS: $stub ($($existing.Length) bytes)" -ForegroundColor Yellow
    Write-Host "  not overwriting" -ForegroundColor Yellow
    return
}

$pe = @"
using System;
using System.Runtime.InteropServices;

class Stub {
    [DllImport("kernel32.dll")] static extern void ExitProcess(uint uExitCode);

    [STAThread]
    static int Main(string[] args) {
        ExitProcess(0);
        return 0;
    }
}
"@

try {
    Add-Type -TypeDefinition $pe -Language CSharp -OutputAssembly $stub -OutputType WindowsApplication -ReferencedAssemblies "System.dll" 2>$null
    if (Test-Path $stub) {
        $info = Get-Item $stub
        Write-Host "  CREATED stub: $stub ($($info.Length) bytes)" -ForegroundColor Green
    } else {
        Write-Host "  FAIL: Cannot create (可能是因为 admin 权限缺失)" -ForegroundColor Red
    }
} catch {
    Write-Host "  EXCEPTION: $_" -ForegroundColor Red
}

Write-Host "=== 完成 ==="