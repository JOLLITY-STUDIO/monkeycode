const fs = require('fs');
const { execSync } = require('child_process');

// 1. 检查 bank00_core.service.ts 全文: getScriptBank/getScriptData/scriptLoader/import 完整性
const s = fs.readFileSync('src/game/service/bank00/bank00_core.service.ts', 'utf8');
console.log('=== bank00_core.service.ts ===');
console.log('lines:', s.split('\n').length);
console.log('getScriptBank refs:', (s.match(/getScriptBank/g) || []).length);
console.log('getScriptData refs:', (s.match(/getScriptData/g) || []).length);
console.log('import getScriptBank:', s.includes("import { getScriptBank") || s.includes("getScriptBank,"));
console.log('import getScriptData:', s.includes("import { getScriptData") || s.includes("getScriptData,"));
console.log('PRG_BANK_06 import:', JSON.stringify(s.match(/import PRG_BANK_06[^;]*;/g)));
console.log('import lines:');
s.split('\n').forEach((l, i) => { if (/^import /.test(l.trim()) || /from '/.test(l.trim())) console.log('  ' + (i + 1) + ': ' + l.trim()); });

// 2. 跑 tsc 输出到文件
try {
  execSync('npx tsc -p tsconfig.json --noEmit', { encoding: 'utf8', stdio: 'pipe' });
  console.log('\n=== tsc: PASS ===');
} catch (e) {
  const out = (e.stdout || '') + (e.stderr || '');
  const lines2 = out.split('\n').filter(l => /error TS/.test(l));
  console.log('\n=== tsc: FAIL ===');
  console.log('error count:', lines2.length);
  console.log(lines2.slice(0, 25).join('\n'));
}
