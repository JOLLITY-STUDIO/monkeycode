/**
 * nt_dump.cjs — 从 nt.log 重建 NT0 快照并渲染 ASCII (v2: 行号对齐 + 多帧)
 * 用法: node debug/nt_dump.cjs
 */
const fs = require('fs');

const lines = fs.readFileSync('debug/trace/nt.log', 'utf8').split('\n');
const DENSITY = ' .:-=+*#%@';

function tileDensityChar(tile, chrmap) {
  const off = tile * 16;
  if (off + 16 > chrmap.length) return '?';
  let n = 0;
  for (let y = 0; y < 8; y++) {
    const px = chrmap[off + y] | chrmap[off + y + 8];
    n += (px & 0x80 ? 1 : 0) + (px & 0x40 ? 1 : 0) + (px & 0x20 ? 1 : 0) + (px & 0x10 ? 1 : 0) +
         (px & 0x08 ? 1 : 0) + (px & 0x04 ? 1 : 0) + (px & 0x02 ? 1 : 0) + (px & 0x01 ? 1 : 0);
  }
  return DENSITY[Math.min(DENSITY.length - 1, Math.floor(n / 8))];
}

let chrmap = null;
try {
  const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
  chrmap = rom.slice(16 + 0x40000, 16 + 0x40000 + 0x20000);
} catch (e) { console.log('CHR 加载失败:', e.message); }

// ── 逐行应用, 记录"每 1000 行"一次快照 + 每次 $2000 重置 ──
const snapshots = []; // {line, nt}
let nt = new Uint8Array(960).fill(0);
let curAddr = -1;

function pushSnapshot(lineNo, label) {
  snapshots.push({ line: lineNo, label, nt: new Uint8Array(nt) });
}

const reWrite = /\[NT_WRITE\] i(\d+) .*?STA \$2007 = #\$([0-9A-F]+) @ \$([0-9A-F]+) \(NT0/;

let prevResetLine = -1;
for (let ln = 0; ln < lines.length; ln++) {
  const line = lines[ln];
  const m = reWrite.exec(line);
  reWrite.lastIndex = 0;
  if (!m) continue;
  const addr = parseInt(m[3], 16);
  const tile = parseInt(m[2], 16);
  const idx = addr - 0x2000;
  if (idx < 0 || idx >= 960) continue;
  if (addr === 0x2000) {
    // 新一批 NT 重建
    if (prevResetLine !== -1 && ln - prevResetLine > 50) {
      pushSnapshot(ln, 'reset@' + ln);
    }
    prevResetLine = ln;
    nt = new Uint8Array(960).fill(0);
  }
  nt[idx] = tile;
}
pushSnapshot(lines.length, 'end');

console.log('快照数:', snapshots.length);

// 按行号间隔取样: 行号 / 约等于帧位置
const totalLines = lines.length;
const segFrames = 60; // 每段 60 帧

// 打印所有快照的行号和概要 (非零 tile 数)
snapshots.forEach((s, i) => {
  let nz = 0;
  for (const t of s.nt) if (t !== 0) nz++;
  console.log(`#${i} line=${s.line} nz=${nz}`);
});

// 渲染关键快照: 每 5 个取一个
function renderFrame(s, label) {
  console.log('\n=== ' + label + ' ===');
  for (let row = 0; row < 30; row++) {
    let line = '';
    for (let col = 0; col < 32; col++) line += tileDensityChar(s.nt[row * 32 + col], chrmap);
    console.log(String(row).padStart(2, '0') + ' ' + line);
  }
  // tile 值表 (非零行)
  for (let row = 0; row < 30; row++) {
    const tiles = [];
    for (let col = 0; col < 32; col++) tiles.push(s.nt[row * 32 + col]);
    if (tiles.some(t => t !== 0)) {
      console.log('  T' + String(row).padStart(2, '0') + ': ' + tiles.map(t => t.toString(16).padStart(2, '0')).join(' '));
    }
  }
}

// 打印第 0、中间、最后几个快照
const step = Math.max(1, Math.floor(snapshots.length / 10));
for (let i = 0; i < snapshots.length; i += step) {
  renderFrame(snapshots[i], `快照 #${i} line=${snapshots[i].line}`);
}
renderFrame(snapshots[snapshots.length - 1], `快照 最后 #${snapshots.length - 1}`);
