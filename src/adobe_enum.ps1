$paths = @(
  'HKLM:\SOFTWARE\Classes\*\shellex\ContextMenuHandlers',
  'HKLM:\SOFTWARE\Classes\Directory\shellex\ContextMenuHandlers',
  'HKLM:\SOFTWARE\Classes\Folder\shellex\ContextMenuHandlers',
  'HKLM:\SOFTWARE\Classes\Directory\Background\shellex\ContextMenuHandlers',
  'HKLM:\SOFTWARE\Classes\Drive\shellex\ContextMenuHandlers',
  'HKLM:\SOFTWARE\Classes\DesktopBackground\ShellEx\ContextMenuHandlers',
  'HKCU:\SOFTWARE\Classes\*\shellex\ContextMenuHandlers',
  'HKCU:\SOFTWARE\Classes\Directory\shellex\ContextMenuHandlers',
  'HKCU:\SOFTWARE\Classes\Folder\shellex\ContextMenuHandlers'
)
Write-Host "=== Adobe/Acro/PDF related context handlers ===" -ForegroundColor Cyan
foreach ($p in $paths) {
  if (Test-Path $p) {
    Get-ChildItem $p | Where-Object { $_.Name -match 'Adobe|Acro|PDF' } | ForEach-Object { Write-Host ("FOUND: " + $_.Name) -ForegroundColor Yellow }
  }
}

Write-Host "=== Run keys with Adobe ===" -ForegroundColor Cyan
foreach ($rk in @('HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run', 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run')) {
  if (Test-Path $rk) {
    $ip = Get-ItemProperty $rk
    $ip | Get-Member -MemberType NoteProperty | Where-Object { $_.Name -notmatch '^PS' } | ForEach-Object {
      $v = $ip.$($_.Name)
      if ($v -and $v.ToString() -match 'Acro|Adobe') {
        Write-Host ("STARTUP: " + $rk + " :: " + $_.Name + " = " + $v) -ForegroundColor Green
      }
    }
  }
}
Write-Host "=== done ==="