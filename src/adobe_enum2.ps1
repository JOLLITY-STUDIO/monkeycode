# 搜所有 "AcroTray.exe" 字符串在 registry 里出现的 key path
$root = 'HKLM:\SOFTWARE', 'HKLM:\SOFTWARE\Classes', 'HKCU:\SOFTWARE', 'HKCU:\SOFTWARE\Classes'
$root += 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\ShellServiceObjects'
$found = @()
foreach ($r in $root) {
  if (-not (Test-Path $r)) { continue }
  Get-ChildItem $r -Recurse -ErrorAction SilentlyContinue |
    ForEach-Object {
      $key = $_
      $pspath = $_.PSPath
      # 检查 default value
      try {
        $def = (Get-ItemProperty -Path $pspath -Name '(default)' -ErrorAction SilentlyContinue).'(default)'
        if ($def -and $def.ToString() -match 'Acro|Adobe') {
          $script:found += [pscustomobject]@{ Path = $pspath; Name = '(default)'; Value = $def }
        }
      } catch {}
      # 检查 properties
      try {
        $ip = Get-ItemProperty $pspath -ErrorAction SilentlyContinue
        $ip | Get-Member -MemberType NoteProperty 2>$null | Where-Object { $_.Name -notmatch '^PS' } | ForEach-Object {
          $v = $ip.$($_.Name).ToString()
          if ($v -match 'Acro|Adobe') {
            $script:found += [pscustomobject]@{ Path = $pspath; Name = $_.Name; Value = $v }
          }
        }
      } catch {}
    }
}
$found | Select-Object Path, Name, Value | Format-Table -AutoSize | Out-String | Write-Host