// 精确诊断:frame 10 渲染时 NT0 row12-15 的 tile/att/palette/buffer 像素
const { HeadlessRuntime } = require('./dist-cjs/game/runtime/HeadlessRuntime');
const { Tsubasa2 } = require('./dist-cjs/game/index');

const r = new HeadlessRuntime();
const g = new Tsubasa2();
g.boot(r);

const ppu = r.ppu;
const orig = ppu.renderBgScanline.bind(ppu);

// 记录每个 scan 对应的 tile 列表(渲染前 cntHT 会被重置为 regHT=0,渲染中递增)
const rows = {}; // scan -> [{tile, att, x}]

ppu.renderBgScanline = function (bgbuffer, scan) {
  if (scan >= 90 && scan <= 130) {
    const t0 = this.cntHT;
    const t1 = this.cntVT;
    const tv = this.cntV;
    const th = this.cntH;
    // 渲染前记录第一列
    let list = [];
    for (let c = 0; c < 32; c++) {
      list.push(this.nameTable[this.curNt].getTileIndex((t0 + c) % 32, t1));
    }
    rows[scan] = { t1, tv, th, list, att0: this.nameTable[this.curNt].getAttrib(t0, t1) };
  }
  return orig(bgbuffer, scan);
};

for (let f = 0; f < 11; f++) r.frame(g);

console.log('--- per-scan tile list (row12-15) ---');
for (let s = 96; s <= 112; s++) {
  const row = rows[s];
  if (!row) continue;
  console.log('scan=' + s + ' cntVT=' + row.t1 + ' cntV=' + row.tv + ' cntH=' + row.th + ' att0=' + row.att0);
  console.log('  tiles: ' + row.list.map(v => v.toString(16).padStart(2, '0')).join(' '));
}

console.log('--- imgPalette ---');
const pal = ppu.imgPalette;
for (let i = 0; i < 16; i++) {
  console.log('pal[' + i + ']=' + (pal[i] >>> 0).toString(16).padStart(8, '0'));
}

console.log('--- buffer region rows 96-112 cols 96-208 (text zone) ---');
let any = false;
for (let y = 96; y <= 112; y++) {
  let line = '';
  for (let x = 96; x <= 208; x++) {
    const v = ppu.buffer[y * 256 + x];
    const c = v === 0 ? '.' : (v & 0xff).toString(16).padStart(2, '0');
    line += c;
  }
  if (/[^\.]/.test(line)) { console.log('y' + y + ': ' + line); any = true; }
}
if (!any) console.log('(all black)');

console.log('--- bgbuffer region ---');
any = false;
for (let y = 96; y <= 112; y++) {
  let line = '';
  for (let x = 96; x <= 208; x++) {
    const v = ppu.bgbuffer[y * 256 + x];
    const c = v === 0 ? '.' : (v & 0xff).toString(16).padStart(2, '0');
    line += c;
  }
  if (/[^\.]/.test(line)) { console.log('y' + y + ': ' + line); any = true; }
}
if (!any) console.log('(all black)');

console.log('--- pixrendered region ---');
any = false;
for (let y = 96; y <= 112; y++) {
  let line = '';
  for (let x = 96; x <= 208; x++) {
    const v = ppu.pixrendered[y * 256 + x];
    line += (v > 0xff) ? '#' : '.';
  }
  if (/[#]/.test(line)) { console.log('y' + y + ': ' + line); any = true; }
}
if (!any) console.log('(none)');

console.log('--- ptTile glyph 0x28 pix (T) ---');
const g28 = ppu.ptTile[0x28];
if (g28) {
  for (let r8 = 0; r8 < 8; r8++) {
    let line = '';
    for (let c8 = 0; c8 < 8; c8++) line += g28.pix[r8 * 8 + c8].toString(16);
    console.log(line);
  }
} else console.log('MISSING');
