// _check_oam_dump.cjs - dump H5 OAM shadow region $0468-$0567 to see if writes worked
const runtime = new (require('../src/game/runtime/HeadlessRuntime'))();
const game = new (require('../src/game/index')).Tsubasa2();
game.boot();
for (let i = 0; i < 30; i++) game.frame(runtime);
const store = game.store;
const r = (a) => store.readByte(a);
let active = 0;
console.log('=== frame 30 shadow OAM $0468-$0567 ===');
for (let slot = 0; slot < 64; slot++) {
  const base = 0x0468 + slot * 4;
  const y = r(base);
  const tile = r(base + 1);
  const attr = r(base + 2);
  const x = r(base + 3);
  if (y || tile || attr || x) {
    active++;
    if (active <= 8) console.log('  slot ' + slot + ': y=' + y + ', tile=' + tile + ', attr=' + attr + ', x=' + x);
  }
}
console.log('active sprites: ' + active + '/64');
