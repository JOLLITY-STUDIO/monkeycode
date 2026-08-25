import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';
import { Tsubasa2 } from '../src/game/index';

async function main() {
  const runtime = new HeadlessRuntime();
  const game = new Tsubasa2();
  game.boot();
  const traces: Map<number, number[]> = new Map();
  // 关注 s12 (奇怪 y=0 的) 跟几个其它做对比
  const watch = [0, 1, 12, 38, 39, 40, 41, 50, 60];
  for (let f = 0; f <= 305; f++) {
    if (f >= 1) runtime.frame(game);
    const snapshot: number[] = [];
    for (const s of watch) {
      const base = 0x0468 + s * 4;
      const y = game.store.readByte(base + 0);
      const tile = game.store.readByte(base + 1);
      const attr = game.store.readByte(base + 2);
      const x = game.store.readByte(base + 3);
      snapshot.push(s, y, tile, attr, x);
    }
    traces.set(f, snapshot);
    if (f === 0 || f === 1 || f === 5 || f === 15 || f === 16 || f === 32 || f === 60 || f === 64 || f === 96 || f === 100 || f === 132 || f === 200 || f === 300) {
      console.log(`=== frame ${f} ===`);
      for (let i = 0; i < watch.length; i++) {
        const s = watch[i];
        const y = snapshot[i * 5 + 1];
        const tile = snapshot[i * 5 + 2];
        const attr = snapshot[i * 5 + 3];
        const x = snapshot[i * 5 + 4];
        const ystr = (y === 255 ? 'HID' : String(y));
        console.log(`  s${String(s).padStart(2)}: x=${String(x).padStart(3)} y=${ystr.padStart(3)} tile=${String(tile).padStart(3)} attr=${attr.toString(16).padStart(2,'0')}`);
      }
    }
  }
}
main().catch((e) => { console.error(e.stack || e); process.exit(1); });
