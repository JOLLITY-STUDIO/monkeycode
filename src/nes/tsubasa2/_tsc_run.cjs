/* 临时: 跑 tsc 并打印错误 */
const { spawnSync } = require('child_process');
const r = spawnSync('npx', ['tsc', '-p', 'tsconfig.json', '--noEmit'], { cwd: process.cwd(), shell: true, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
console.log('exit:', r.status);
const out = (r.stdout || '') + (r.stderr || '');
// 只显示错误行
const lines = out.split(/\r?\n/).filter(l => l.includes('error TS') && (l.includes('src\\game') || l.includes('src/game')));
console.log(lines.slice(0, 40).join('\n') || '(no game errors)');
console.log('---game error count---', lines.length);
console.log('---total error count---', out.split(/\r?\n/).filter(l => l.includes('error TS')).length);
