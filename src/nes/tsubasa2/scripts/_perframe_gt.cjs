/**
 * _perframe_gt.cjs — 从 FCEUX per-frame log 重建开场动画逐帧 Ground Truth
 *
 * 解析 opening-all-per-frame.log（1298 帧关键事件，f6-f4342），模拟 PPU/mapper
 * 寄存器语义，得到每帧的渲染状态：
 *   - $2000/$2001 ctrl/mask
 *   - $2005 滚动 (scrollX/scrollY)
 *   - $2006/$2007 VRAM 写 → 调色板 ($3F00+) / NT tile ($2000-$2FFF)
 *   - $8000/$8001 MMC3 CHR bank 切换 → chrBanks[8]
 *   - 关键 RAM 写：sprite shadow ($02FA-$02FF/$0468+/$05E8+)、滚动指针、场景寄存器
 *
 * 输出：output/opening/gt-frames.json / gt-phases.json / gt-timeline.txt
 */
const fs = require('fs');
const path = require('path');

const LOG = 'docs/roms/opening-all/opening-all-per-frame.log';
const OUT = path.join(__dirname, '..', 'output', 'opening');
fs.mkdirSync(OUT, { recursive: true });

const lines = fs.readFileSync(LOG, 'utf8').split(/\r?\n/);
console.log('lines:', lines.length);

// ── PPU/mapper 状态 ──
let ctrl = 0, mask = 0, scrollX = 0, scrollY = 0;
let vramHi = null, vramAddr = 0, vramInc = 1;
let chrSelect = 0;
const chrBanks = new Array(8).fill(0);
const palette = new Array(64).fill(0);

const ramShadow = {};
function ramNote(addr, v) {
  const k = '$' + addr.toString(16).toUpperCase().padStart(4, '0');
  const e = ramShadow[k] || (ramShadow[k] = { min: v, max: v, last: v, count: 0 });
  if (v < e.min) e.min = v;
  if (v > e.max) e.max = v;
  e.last = v;
  e.count++;
}

const frameLog = {};
const frameEndState = {};
let curFrame = null;
function snapshot() {
  return { ctrl, mask, sx: scrollX, sy: scrollY, chr: chrBanks.slice(), pal: palette.slice() };
}
function ensureFrame(f) {
  if (curFrame !== null && curFrame !== f) {
    frameEndState[curFrame] = snapshot(); // 上一帧结束时状态
  }
  if (curFrame !== f) {
    frameLog[f] = { events: [] };
    curFrame = f;
  }
  return frameLog[f];
}

const RAM_WATCH = /^02FA$|^02FB$|^02FC$|^02FD$|^02FE$|^02FF$|^046[0-9A-F]$|^047[0-9A-F]$|^04[CD][0-9A-F]$|^05E[89A-F]$|^05F[0-9A-F]$|^0015$|^0016$|^0017$|^0018$|^009A$|^009B$|^009C$|^009D$|^001B$|^0044$|^0048$|^0049$|^005B$|^0079$|^007B$|^007C$|^00ED$/;

// 指令文本: "$BANK:ADDR: BYTES  MNEMONIC OPERAND [@ $EFFADDR] [= #$VAL]"
// 提取操作数的有效地址（@ 优先，否则取操作数里的绝对/零页字面量）
function operandAddr(rest) {
  // rest = "MNEMONIC OPERAND [@ ...]"
  const at = rest.match(/@ \$([0-9A-F]{4})/);
  if (at) return parseInt(at[1], 16);
  const abs = rest.match(/\$([0-9A-F]{4})/);
  if (abs) return parseInt(abs[1], 16);
  const zp = rest.match(/\$([0-9A-F]{2})/);
  if (zp) return parseInt(zp[1], 16);
  return null;
}

let parsed = 0, skipped = 0;
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  // f6 c154345 i45834 A:85 X:03 Y:00 S:FC P:NvubdizC $01:AA0B: 48 PHA
  const m = l.match(/^f(\d+)\s+c(\d+)\s+i(\d+)\s+A:([0-9A-F]{2})\s+X:([0-9A-F]{2})\s+Y:([0-9A-F]{2})\s+S:([0-9A-F]{2})\s+P:([A-Za-z]+)\s+\$([0-9A-F]{2}):([0-9A-F]{4}):\s+(.+)$/);
  if (!m) { skipped++; continue; }
  const frame = +m[1];
  const A = parseInt(m[4], 16);
  const instr = m[11]; // "48 PHA" / "8D 00 20 STA $2000 = #$88" / "91 EC    STA ($EC),Y @ $047B = #$00"
  parsed++;

  // 拆分: 字节部分(定宽9) + 反汇编部分
  // 格式: "8D 00 20 STA $2000 = #$88" / "48       PHA" — 字节域固定 9 字符
  if (instr.length < 10) continue;
  const bytesPart = instr.slice(0, 9).trim();
  if (!bytesPart) continue;
  const op = instr.slice(9).trim();
  const opM = op.match(/^([A-Z]{3})\s+(.*)$/);
  if (!opM) continue;
  const mnem = opM[1];
  const rest = opM[2]; // "$2000 = #$88" / "($EC),Y @ $047B = #$00"

  const fr = ensureFrame(frame);

  if (mnem === 'STA') {
    const dest = operandAddr(rest);
    if (dest === null) continue;
    const d16 = dest.toString(16).toUpperCase().padStart(4, '0');
    if (dest === 0x2000) { ctrl = A; vramInc = (A & 0x04) ? 32 : 1; fr.events.push(['ctrl', A]); }
    else if (dest === 0x2001) { mask = A; fr.events.push(['mask', A]); }
    else if (dest === 0x2005) {
      // $2005 双写锁存：第一次 X，第二次 Y（用 vramHi 作 latch 复用）
      if (vramHi === null) { scrollX = A; vramHi = 'X'; fr.events.push(['scrollX', A]); }
      else { scrollY = A; vramHi = null; fr.events.push(['scrollY', A]); }
    }
    else if (dest === 0x2006) {
      if (vramHi === null || vramHi === 'X') { vramHi = A; fr.events.push(['vramHi', A]); }
      else { vramAddr = ((vramHi & 0x3f) << 8) | A; vramHi = null; fr.events.push(['vramAddr', vramAddr]); }
    }
    else if (dest === 0x2007) {
      const a = vramAddr;
      if (a >= 0x3f00 && a < 0x4000) { palette[a - 0x3f00] = A; fr.events.push(['pal', a, A]); }
      else if (a >= 0x2000 && a < 0x3000) { fr.events.push(['nt', a, A]); }
      vramAddr = (a + vramInc) & 0x3fff;
    }
    else if (dest === 0x4014) { fr.events.push(['oamDma', A]); }
    else if (dest === 0x8000) { chrSelect = A & 0x07; fr.events.push(['chrSel', A]); }
    else if (dest === 0x8001) { chrBanks[chrSelect] = A; fr.events.push(['chrBank', chrSelect, A]); }
    else if (RAM_WATCH.test(d16)) { ramNote(dest, A); fr.events.push(['ram', d16, A]); }
  } else if (mnem === 'LDA') {
    const dest = operandAddr(rest);
    if (dest === 0x4016 || dest === 0x4017) fr.events.push(['joy', dest === 0x4016 ? '4016' : '4017', A]);
  }
}

console.log('parsed:', parsed, 'skipped:', skipped);
if (curFrame !== null) frameEndState[curFrame] = snapshot(); // 最后一帧

// ── 逐帧快照 ──
const frameKeys = Object.keys(frameLog).map(Number).sort((a, b) => a - b);
const framesOut = {};
let lastSig = '';
const phases = [];
for (const f of frameKeys) {
  const snap = frameEndState[f];
  framesOut[f] = {
    ev: frameLog[f].events.length,
    ctrl: snap.ctrl, mask: snap.mask, sx: snap.sx, sy: snap.sy,
    chr: snap.chr, pal: snap.pal,
    shadow: Object.fromEntries(Object.entries(ramShadow).map(([k, e]) => [k, e.last])),
  };
  const sig = JSON.stringify([snap.ctrl, snap.mask, snap.sx, snap.sy, snap.chr, snap.pal]);
  if (sig !== lastSig) {
    phases.push({ frame: f, ctrl: snap.ctrl, mask: snap.mask, sx: snap.sx, sy: snap.sy, chr: snap.chr, pal: snap.pal });
    lastSig = sig;
  }
}

fs.writeFileSync(path.join(OUT, 'gt-frames.json'), JSON.stringify(framesOut));
fs.writeFileSync(path.join(OUT, 'gt-phases.json'), JSON.stringify(phases, null, 2));

// ── 人类可读时间线 ──
const L = [];
L.push('=== opening Ground Truth timeline (FCEUX per-frame log) ===');
L.push('frames with log: ' + frameKeys.length + '  range: ' + frameKeys[0] + ' - ' + frameKeys[frameKeys.length - 1]);
L.push('');
for (let pi = 0; pi < phases.length; pi++) {
  const p = phases[pi];
  const prev = pi > 0 ? phases[pi - 1] : null;
  let palDiff = '';
  if (prev) {
    const d = [];
    for (let i = 0; i < 64; i++) if (p.pal[i] !== prev.pal[i]) d.push(i.toString(16).toUpperCase());
    if (d.length) palDiff = ' palChg=' + d.join(',');
  } else palDiff = ' palInit';
  L.push(
    `f${String(p.frame).padStart(4)} ctrl=${p.ctrl.toString(16).padStart(2)} mask=${p.mask.toString(16).padStart(2)}` +
    ` scroll=(${p.sx},${p.sy}) chr=[${p.chr.join(',')}]${palDiff}`,
  );
}
fs.writeFileSync(path.join(OUT, 'gt-timeline.txt'), L.join('\n'));

console.log('=== phases ===');
for (let pi = 0; pi < phases.length; pi++) {
  const p = phases[pi];
  const prev = pi > 0 ? phases[pi - 1] : null;
  let palDiff = '';
  if (prev) {
    const d = [];
    for (let i = 0; i < 64; i++) if (p.pal[i] !== prev.pal[i]) d.push(i.toString(16).toUpperCase());
    if (d.length) palDiff = ' palChg=' + d.join(',');
  } else palDiff = ' palInit';
  console.log(
    `f${String(p.frame).padStart(4)} ctrl=${p.ctrl.toString(16).padStart(2)} mask=${p.mask.toString(16).padStart(2)}` +
    ` scroll=(${p.sx},${p.sy}) chr=[${p.chr.join(',')}]${palDiff}`,
  );
}
console.log('\n输出: output/opening/gt-frames.json / gt-phases.json / gt-timeline.txt');
console.log('phases:', phases.length, 'frames:', frameKeys.length);
