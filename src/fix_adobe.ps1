$ErrorActionPreference = 'SilentlyContinue'

Write-Host "=== Adobe context menu 清理 (reg 部分) ===" -ForegroundColor Cyan

$keys = @(
    "HKLM:\SOFTWARE\Classes\*\shellex\ContextMenuHandlers\Adobe.Acrobat.ContextMenu",
    "HKLM:\SOFTWARE\Classes\Directory\shellex\ContextMenuHandlers\Adobe.Acrobat.ContextMenu",
    "HKCU:\SOFTWARE\Classes\*\shellex\ContextMenuHandlers\Adobe.Acrobat.ContextMenu",
    "HKCU:\SOFTWARE\Classes\Directory\shellex\ContextMenuHandlers\Adobe.Acrobat.ContextMenu"
)
foreach ($k in $keys) {
    if (Test-Path $k) {
        Remove-Item -Path $k -Recurse -Force
        Write-Host "  DELETED: $k" -ForegroundColor Green
    } else {
        Write-Host "  not exist: $k"
    }
}

# Run keys (启动项)
$runPairs = @(
    @{ P = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run"; N = "Adobe Acrobat Speed Launcher" },
    @{ P = "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run"; N = "AdobeARMservice" },
    @{ P = "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run"; N = "AdobeAAMUpdater" },
    @{ P = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run"; N = "Acrobat Assistant" }
)
foreach ($r in $runPairs) {
    if (Test-Path $r.P) {
        $exists = (Get-Item $r.P).Property -contains $r.N
        if ($exists) {
            Remove-ItemProperty -Path $r.P -Name $r.N -Force
            Write-Host "  REMOVED startup: $($r.P)\$($r.N)" -ForegroundColor Green
        }
    }
}

# 列出 PDF/Directory 还残留什么 Adobe 关联
Write-Host "`n=== 残留检查 ===" -ForegroundColor Cyan
Get-ChildItem "HKLM:\SOFTWARE\Classes\*\shellex\ContextMenuHandlers" -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -match "Adobe|Acrobat" } |
    ForEach-Object { Write-Host "  HKLM star: $_" }
Get-ChildItem "HKLM:\SOFTWARE\Classes\Directory\shellex\ContextMenuHandlers" -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -match "Adobe|Acrobat" } |
    ForEach-Object { Write-Host "  HKLM dir: $_" }

Write-Host "`n=== 完成 ===" -ForegroundColor Green
Write-Host "现在去右键文件夹测试。如果没报错, 就不需要重启 explorer (跑这个已 OK)" -ForegroundColor Yellow
