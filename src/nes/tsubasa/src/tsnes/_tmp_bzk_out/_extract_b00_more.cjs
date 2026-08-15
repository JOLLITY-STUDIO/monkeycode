const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/';
const b00 = fs.readFileSync(dir + 'bank_00.asm', 'utf8');
const lines = b00.split(/\r?\n/);

// Build addr -> line map for bank00 (00:xxxx prefix)
const addrMap = new Map();
for (const ln of lines) {
  const m = ln.match(/00:([0-9A-F]{4}):/);
  if (m) addrMap.set(parseInt(m[1], 16), ln);
}
const get = (a) => addrMap.get(a) || `$${a.toString(16)}: --missing--`;

const dumpRange = (label, from, to) => {
  console.log('### ' + label + '  (' + from.toString(16) + '..' + to.toString(16) + ')');
  for (let a = from; a <= to; a++) {
    const ln = get(a);
    // only print lines that are instructions (has mnemonic), print data bytes too
    console.log(ln);
  }
  console.log('');
};

dumpRange('98EA ppu write', 0x98EA, 0x992C + 0x28);
dumpRange('8AF7 scene load tail', 0x8B97, 0x8BC0);
dumpRange('9071', 0x9071, 0x9085);
dumpRange('890C vram', 0x890C, 0x8920);
dumpRange('8A06 internal', 0x8A06, 0x8A14);
dumpRange('9A43 main init1', 0x9A43, 0x9A50);
dumpRange('9B7F ppu init', 0x9B7F, 0x9BA0);
