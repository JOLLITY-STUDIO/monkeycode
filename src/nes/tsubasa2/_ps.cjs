const { execSync } = require('child_process');
const out = execSync('powershell -Command "Get-CimInstance Win32_Process | Where-Object { $_.Name -eq \'node.exe\' } | Select-Object ProcessId,CommandLine | Format-List"', { encoding: 'utf8', maxBuffer: 1 << 20 });
console.log(out);
