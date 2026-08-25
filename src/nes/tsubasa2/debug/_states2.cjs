const fs = require('fs');
const dir = 'output/emu-reference';
const frames = fs.readdirSync(dir).filter(d => /^frame-/.test(d)).sort((a, b) => parseInt(a.split('-')[1]) - parseInt(b.split('-')[1]));
for (const f of frames) {
  const sj = dir + '/' + f + '/state.json';
  const s = JSON.parse(fs.readFileSync(sj, 'utf8'));
  const pcHex = '0x' + s.pc.toString(16).toUpperCase();
  const map = s.prgBankMap;
  const a000 = map['40960'] !== undefined ? 'A000=b' + map['40960'] : 'A000=?';
  console.log(f, 'pc=' + pcHex, a000, 'chr=' + s.chrBanks.join(','));
}
