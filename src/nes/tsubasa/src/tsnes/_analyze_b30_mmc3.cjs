const b = require('./rom-data/prg-bank-30').default;
const hits = [];
for (let i = 0; i < b.length - 2; i++) {
  const op = b[i];
  const addr = b[i + 1] | (b[i + 2] << 8);
  if (op === 0x8D && (addr === 0x8000 || addr === 0x8001)) {
    let src = '?', val = null;
    for (let j = i - 1; j >= Math.max(0, i - 8); j--) {
      if (b[j] === 0xA9 && j + 1 < b.length) { src = 'LDA'; val = b[j + 1]; break; }
      if (b[j] === 0xA2 && j + 1 < b.length) { src = 'LDX'; val = b[j + 1]; break; }
      if (b[j] === 0xA0 && j + 1 < b.length) { src = 'LDY'; val = b[j + 1]; break; }
      if (b[j] === 0x8D || b[j] === 0x8E || b[j] === 0x8C) break;
    }
    hits.push({
      offset: i,
      pc: (0xC000 + i).toString(16).toUpperCase(),
      src,
      val,
      reg: addr === 0x8000 ? '8000' : '8001'
    });
  }
}
hits.forEach(h => {
  const v = h.val !== null ? h.val.toString(16).toUpperCase().padStart(2, '0') : '??';
  console.log('$' + h.pc + ': ' + h.src + ' #$' + v + ' -> STA $' + h.reg);
});
console.log('Total: ' + hits.length + ' MMC3 writes in Bank30');
