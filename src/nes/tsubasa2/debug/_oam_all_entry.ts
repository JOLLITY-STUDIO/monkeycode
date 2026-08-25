import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';
import { Tsubasa2 } from '../src/game/index';

async function main() {
  const runtime = new HeadlessRuntime();
  const game = new Tsubasa2();
  game.boot();
  for (let f = 1; f <= 305; f++) {
    runtime.frame(game);
    if (f === 300 || f === 301) {
      console.log(`=== frame ${f} oam dump (all 64) ===`);
      for (let s = 0; s < 64; s++) {
        const base = 0x0468 + s * 4;
        const y = game.store.readByte(base + 0);
        const tile = game.store.readByte(base + 1);
        const attr = game.store.readByte(base + 2);
        const x = game.store.readByte(base + 3);
        if (y === 255 && x === 0 && tile === 0 && attr === 0) continue; // skip all-zero hidden
        const ystr = y === 255 ? 'HID' : String(y);
        console.log(`s${String(s).padStart(2)}: x=${String(x).padStart(3)} y=${ystr.padStart(3)} tile=${String(tile).padStart(3)} attr=${attr.toString(16).padStart(2,'0')}`);
      }
    }
  }
}
main().catch((e) => { console.error(e.stack || e); process.exit(1); });
