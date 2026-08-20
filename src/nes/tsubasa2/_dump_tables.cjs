const mod = require('./_test_out/game/data/prg-bank-00.js');
const data = mod.default || mod;
const off = (addr) => addr - 0x8000;
function dump(name, addr, len) {
  const o = off(addr);
  const bytes = [];
  for (let i = 0; i < len; i++) bytes.push(data[o + i]);
  console.log('==', name, '$' + addr.toString(16), 'len', len, '==');
  console.log(bytes.map(b => b.toString(16).padStart(2, '0')).join(','));
}
dump('DOUBLE_TILE_8A14', 0x8A14, 0x40);
dump('WAIT_8AE6', 0x8AE6, 8);
dump('SCRIPTID_8AEC', 0x8AEC, 0x40);
