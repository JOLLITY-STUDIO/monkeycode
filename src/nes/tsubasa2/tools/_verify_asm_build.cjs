// 验证 asm 工程可重新汇编 + tsc 状态（一次性）
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

// 1. 检查 code_main.s 注释行是否含真实换行（会影响汇编器）
const p = path.join(root, 'asm', 'bank01', 'code_main.s');
const buf = fs.readFileSync(p);
const s = buf.toString('utf8');
// 字面量 \n 文本（反斜杠+n）计数
const litN = (s.match(/\\n/g) || []).length;
console.log('code_main.s literal \\n texts:', litN, 'LF bytes:', (buf.filter(b => b === 10)).length, 'CR bytes:', (buf.filter(b => b === 13)).length);
// 检查是否有以"汇编误标"开头的行（若注释内嵌真实换行则会出现）
const lines = s.split('\n');
lines.forEach((l, i) => {
  if (/^\s*汇编误标/.test(l)) console.log('  !! line ' + (i + 1) + ' starts with 汇编误标 (bad): ' + JSON.stringify(l.slice(0, 50)));
});

// 2. 跑 asm 构建
try {
  const out = execFileSync('python', ['build_nes.py'], {
    cwd: path.join(root, 'asm'),
    encoding: 'utf8',
    env: { ...process.env, PYTHONIOENCODING: 'utf-8' },
    timeout: 120000
  });
  const tail = out.split('\n').slice(-20).join('\n');
  console.log('=== ASM BUILD OK ===');
  console.log(tail);
  // 检查产物
  const nes = path.join(root, 'asm', 'dist', 'tsubasa2.nes');
  if (fs.existsSync(nes)) console.log('NES size:', fs.statSync(nes).size);
} catch (e) {
  console.log('=== ASM BUILD FAILED ===');
  console.log(String(e.stdout || '') + String(e.stderr || e.message));
}
