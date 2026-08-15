const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/';
const b00 = fs.readFileSync(dir + 'bank_00.asm', 'utf8');
const lines = b00.split(/\r?\n/);

const addrMap = new Map();
for (const ln of lines) {
  const m = ln.match(/00:([0-9A-F]{4}):/);
  if (m) addrMap.set(parseInt(m[1], 16), ln);
}
const get = (a) => addrMap.get(a) || `$${a.toString(16)}: --missing--`;

const dumpRange = (label, from, to) => {
  console.log('### ' + label + '  (' + from.toString(16) + '..' + to.toString(16) + ')');
  for (let a = from; a <= to; a++) console.log(get(a));
  console.log('');
};

dumpRange('98E8 ppu write alt entry', 0x98E0, 0x98EC);
dumpRange('992C direct ppu path', 0x992C, 0x9960);
dumpRange('9071', 0x9071, 0x9090);
dumpRange('8AF7 tail', 0x8B93, 0x8BD0);
dumpRange('9FA8 bankswitch', 0x9FA8, 0x9FC0);
