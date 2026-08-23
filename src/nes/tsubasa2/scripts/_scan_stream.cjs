// 扫描 asm：$C4B9 定义、$0498 队列写入点、tile 数据 bank 语义
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'src', 'asm');
const targets = ['bank00', 'bank01', 'bank02', 'bank03', 'bank04', 'bank05', 'bank06', 'bank07', 'bank08', 'bank09', 'bank10', 'bank11', 'bank30', 'bank31'];

function scanDir(dir, pattern, label) {
  if (!fs.existsSync(dir)) return;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.s')) continue;
    const p = path.join(dir, f);
    const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
    lines.forEach((ln, i) => {
      if (pattern.test(ln)) {
        console.log(`[${label}] ${dir}\\${f}:${i + 1}: ${ln.trim()}`);
      }
    });
  }
}

// $C4B9 定义（可能以 "C4B9:" 或 "; $C4B9" 形式）
scanDir(path.join(ROOT, 'bank00'), /C4B9/, 'C4B9');
// $0498 队列条目写入（STA $0498 / STX $0498 等）
scanDir(path.join(ROOT, 'bank00'), /0498|0499/, '0498-write');
scanDir(path.join(ROOT, 'bank02'), /0498|0499/, '0498-write');
scanDir(path.join(ROOT, 'bank30'), /0498|0499/, '0498-write');
scanDir(path.join(ROOT, 'bank31'), /0498|0499/, '0498-write');
