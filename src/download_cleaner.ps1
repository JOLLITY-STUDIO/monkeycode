$url = 'https://download.adobe.com/AdobeCleaner_3.0.0.43.zip'
$out = 'D:\AdobeCleaner.zip'
try {
    Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing -ErrorAction Stop
    Write-Host "downloaded: $out" -ForegroundColor Green
    Get-Item $out | Format-Table Name, Length
    Expand-Archive $out 'D:\AdobeCleaner' -Force
    Write-Host "extracted to D:\AdobeCleaner\" -ForegroundColor Green
    Get-ChildItem 'D:\AdobeCleaner' | Format-Table Name
} catch {
    Write-Host "FAIL: $_" -ForegroundColor Red
}