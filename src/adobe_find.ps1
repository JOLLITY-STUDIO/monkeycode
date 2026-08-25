Get-ChildItem 'HKLM:\SOFTWARE\Classes\*' -ErrorAction SilentlyContinue | ForEach-Object {
    $k = $_
    try {
        $ip = Get-ItemProperty $k.PSPath -ErrorAction SilentlyContinue
        $def = $ip.'(default)'
        if ($def -and $def.ToString() -match 'AcroTray|AcroTextExtraction') {
            Write-Host ("MATCH * : " + $k.PSPath + " = " + $def) -ForegroundColor Yellow
        }
    } catch {}
}
foreach ($sp in @(
  'HKLM:\SOFTWARE\Classes\*\shellex\ContextMenuHandlers',
  'HKLM:\SOFTWARE\Classes\Folder\shellex\ContextMenuHandlers',
  'HKLM:\SOFTWARE\Classes\Directory\shellex\ContextMenuHandlers',
  'HKLM:\SOFTWARE\Classes\Directory\Background\shellex\ContextMenuHandlers',
  'HKLM:\SOFTWARE\Classes\Drive\shellex\ContextMenuHandlers',
  'HKLM:\SOFTWARE\Classes\AllFilesystemObjects\shellex\ContextMenuHandlers',
  'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\ShellIconOverlayIdentifiers',
  'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Shell Extensions\Approved'
)) {
  if (-not (Test-Path $sp)) { continue }
  Get-ChildItem $sp -ErrorAction SilentlyContinue | ForEach-Object {
    $name = $_.PSChildName
    if ($name -match 'Acro|Adobe|Pdf|ShellExt') {
      Write-Host ("FOUND: " + $_.PSPath + " :: " + $name) -ForegroundColor Magenta
    }
  }
}
Write-Host "--- end ---"