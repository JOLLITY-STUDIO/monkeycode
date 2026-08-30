// 临时: grep scroll-prerender 生成/消费点
const cp = require('child_process');
const out = cp.execSync('findstr /S /N /C:"scroll-prerender" *.ts *.cjs *.py *.js *.json 2>nul', {
  cwd: process.cwd(), encoding: 'utf8', shell: 'cmd.exe', maxBuffer: 64 * 1024 * 1024,
});
console.log(out);
