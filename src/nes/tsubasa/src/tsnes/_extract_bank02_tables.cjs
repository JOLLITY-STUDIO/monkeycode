// 提取 bank02 内部数据表（从 prg-bank-02.ts 读取）
// CPU $A000 映射 → prg[idx] = CPU[$A000 + idx]
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(
  path.join(__dirname, 'rom-data', 'prg-bank-02.ts'),
  'utf8'
);
const m = src.match(/=\s*\[([\s\S]*?)\];/);
if (!m) { console.error('no array'); process.exit(1); }
const nums = m[1].split(',').map(s => parseInt(s.trim(), 16));

function get(cpuAddr) { return nums[cpuAddr - 0xA000]; }
function hex(n) { return n.toString(16).padStart(2, '0'); }

function dump(label, start, len, bytesPerRow = 16) {
  const rows = [];
  for (let i = 0; i < len; i += bytesPerRow) {
    const n = Math.min(bytesPerRow, len - i);
    const bytes = [];
    for (let j = 0; j < n; j++) bytes.push(hex(get(start + i + j)));
    rows.push(`  ${(start + i).toString(16).toUpperCase()}: ${bytes.join(' ')}`);
  }
  console.log(`\n### ${label} ($${start.toString(16).toUpperCase()}..$${(start + len - 1).toString(16).toUpperCase()})`);
  console.log(rows.join('\n'));
}

// handler[16] 精灵 OAM 数据表 (A677-A77A, 256B)
dump('A677 sprite table', 0xA677, 256, 16);

// 密码字符表 (AB1F-AB2E)
dump('AB1F password chars', 0xAB1F, 16, 8);

// 滚动表 (AADF-AB1E)
dump('AADF scroll table', 0xAADF, 64, 16);

// 场地表 (AA47-AA96)
dump('AA47 field table', 0xAA47, 80, 16);

// 场地参数 (AA97-AACE)
dump('AA97 field params', 0xAA97, 56, 8);
