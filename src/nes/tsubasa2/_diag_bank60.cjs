// 对比 H5 vrom vs CHR_BANKS vs ROM 的 bank 60/0 tile 1 像素
const fs = require('fs');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');
const { CHR_BANKS } = require('./dist-cjs2/game/chr/index');

const r = new HeadlessRuntime();
const vrom = r.vromTilesByBank1k;

const out = [];
function tilePix(bank1k, tile) {
  const t = vrom[bank1k][tile];
  const rows = [];
  for (let y = 0; y < 8; y++) {
    rows.push(Array.from(t.pix.slice(y * 8, y * 8 + 8)).join(''));
  }
  return rows.join('|');
}
out.push('H5 vrom[60][1]:');
out.push('  ' + tilePix(60, 1));
out.push('H5 vrom[0][1]:');
out.push('  ' + tilePix(0, 1));
out.push('H5 vrom[0][20]:');
out.push('  ' + tilePix(0, 20));

// CHR_BANKS raw: bank1k 60 = 8KB bank 7 (7*8=56) 1KB chunk 4 -> byte offset 7*8192+4*1024
function rawTile(bank8kIdx, subOff, tile) {
  const b = CHR_BANKS[bank8kIdx];
  const off = subOff + tile * 16;
  const p0 = Array.from(b.slice(off, off + 8));
  const p1 = Array.from(b.slice(off + 8, off + 16));
  // decode MSB-left: bit0 plane0, bit1 plane1, bit (7-c)
  const rows = [];
  for (let y = 0; y < 8; y++) {
    let s = '';
    for (let x = 0; x < 8; x++) {
      const c = (((p1[y] >> (7 - x)) & 1) << 1) | ((p0[y] >> (7 - x)) & 1);
      s += c;
    }
    rows.push(s);
  }
  return rows.join('|') + '  raw p0=' + JSON.stringify(p0) + ' p1=' + JSON.stringify(p1);
}
out.push('CHR_BANKS bank7(56-63) 1KB chunk4 tile1 (=bank1k60 tile1):');
out.push('  ' + rawTile(7, 4 * 1024, 1));
out.push('CHR_BANKS bank0 1KB chunk0 tile1 (=bank1k0 tile1):');
out.push('  ' + rawTile(0, 0, 1));
out.push('CHR_BANKS bank0 1KB chunk2 tile20 (=bank1k2 tile20):');
out.push('  ' + rawTile(0, 2 * 1024, 20));

// ROM direct
const romPath = 'docs/roms/Captain Tsubasa II - Super Striker (Japan).nes';
if (fs.existsSync(romPath)) {
  const rom = fs.readFileSync(romPath);
  const chrOff = 16 + 16 * 16384;
  function romTile(bank1k, tile) {
    const off = chrOff + bank1k * 1024 + tile * 16;
    const p0 = Array.from(rom.slice(off, off + 8));
    const p1 = Array.from(rom.slice(off + 8, off + 16));
    const rows = [];
    for (let y = 0; y < 8; y++) {
      let s = '';
      for (let x = 0; x < 8; x++) {
        const c = (((p1[y] >> (7 - x)) & 1) << 1) | ((p0[y] >> (7 - x)) & 1);
        s += c;
      }
      rows.push(s);
    }
    return rows.join('|') + '  raw p0=' + JSON.stringify(p0) + ' p1=' + JSON.stringify(p1);
  }
  out.push('ROM bank1k60 tile1:');
  out.push('  ' + romTile(60, 1));
  out.push('ROM bank1k0 tile1:');
  out.push('  ' + romTile(0, 1));
  out.push('ROM bank1k2 tile20:');
  out.push('  ' + romTile(2, 20));
} else {
  out.push('ROM not found: ' + romPath);
}

fs.writeFileSync('_diag_bank60_out.txt', out.join('\n'));
console.log('done');
