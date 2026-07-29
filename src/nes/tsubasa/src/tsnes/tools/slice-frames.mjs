import { readFileSync, writeFileSync } from 'fs';

const d = readFileSync('trace/Captain Tsubasa II - Super Striker (Japan)-openning2.log', 'utf8');
const lines = d.split('\n');

// 每帧统计
const frameMap = new Map();
lines.forEach((l, i) => {
  const f = l.match(/^f(\d+)/);
  if (!f) return;
  const fn = parseInt(f[1]);
  if (!frameMap.has(fn)) frameMap.set(fn, []);
  frameMap.get(fn).push(i);
});

// 找有 $2007 写入的帧
const ppu7Frames = [];
for (const [fn, idxs] of frameMap) {
  let cnt7 = 0;
  idxs.forEach(i => {
    // $2007 is PPU_DATA (actual tile/nametable/palette data)
    if (lines[i].includes('$2007')) cnt7++;
  });
  if (cnt7 > 0) ppu7Frames.push({ fn, cnt: cnt7, idxs });
}
ppu7Frames.sort((a, b) => b.cnt - a.cnt);

console.log('有 $2007 写入的帧:' + ppu7Frames.length);
console.log('Top 20:');
ppu7Frames.slice(0, 20).forEach(f => console.log('  f' + f.fn + ': ' + f.cnt + ' writes'));

// 取第一帧有 $2007 的，和最忙的
if (ppu7Frames.length > 0) {
  const first7 = ppu7Frames[ppu7Frames.length - 1]; // 最后一个是最早的
  const most7 = ppu7Frames[0];

  console.log('\n最早 $2007: f' + first7.fn);
  dumpSlice(first7, 'data-first');

  console.log('最多 $2007: f' + most7.fn);
  dumpSlice(most7, 'data-most');
}

function dumpSlice(fnObj, prefix) {
  const { fn, idxs } = fnObj;

  // 收集这次执行中的 bank/addr
  const bankSet = new Set();
  const codeAddrs = []; // 唯一执行地址

  const out = [];
  const ppuOut = [];
  idxs.sort((a, b) => a - b).forEach(i => {
    const l = lines[i];
    out.push(l);

    // 收集 bank
    const m = l.match(/\$([0-9A-Fa-f]+):([0-9A-Fa-f]{4})/);
    if (m) {
      bankSet.add(parseInt(m[1], 16));
      codeAddrs.push(parseInt(m[1], 16) + ':' + m[2]);
    }

    // PPU 写入
    for (let r = 0; r <= 7; r++) {
      if (l.includes('$200' + r)) {
        ppuOut.push(l.substring(0, 240));
        break;
      }
    }
  });

  writeFileSync(`trace/${prefix}-f${fn}.log`, out.join('\n'));
  writeFileSync(`trace/${prefix}-f${fn}-summary.txt`,
    `帧 f${fn}\n行数: ${idxs.length}, PPU($2007)写入: ${ppuOut.filter(l=>l.includes('$2007')).length}\n` +
    `Banks: ${[...bankSet].sort((a,b)=>a-b).map(b=>'$'+b.toString(16).padStart(2,'0')).join(',')}\n\n` +
    `=== 所有 PPU 写入 ===\n${ppuOut.join('\n')}`
  );
  console.log(`${prefix}-f${fn}: ${out.length} 行, ~${Math.round(out.length/10)}KB`);
}
