/**
 * _trace_oam.ts — dump shadowOam / store.oam.oam / ppu unpack 状态
 */
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);
const ppu: any = (runtime as any).ppu;

for (let f = 1; f <= 13; f++) {
  game.frame(runtime);
  if (f === 1 || f === 9 || f === 10 || f === 11 || f === 13) {
    const store: any = game.store;
    const shadow = store.shadowOam as Uint8Array;
    const oamArr = (store.oam as any).oam as Uint8Array;
    let vis = 0;
    for (let s = 0; s < 40; s++) {
      const y = shadow[s * 4];
      if (y !== 0 && y !== 0xf8) vis++;
    }
    console.log(`--- frame ${f} visible=${vis} ---`);
    if (f === 1 || f === 13) {
      const rows: string[] = [];
      for (let s = 0; s < 40; s++) {
        const y = shadow[s * 4], t = shadow[s * 4 + 1], a = shadow[s * 4 + 2], x = shadow[s * 4 + 3];
        if (y !== 0 && y !== 0xf8) {
          const py = ppu.sprY[s], pt = ppu.sprTile[s], pc = ppu.sprCol[s], px = ppu.sprX[s];
          rows.push(`s${s}:shadow(${y},${t},${a},${x}) ppu(${py},${pt},${pc},${px})`);
        }
      }
      console.log(rows.join('\n'));
      let same = true;
      for (let i = 0; i < 0x100; i++) if (oamArr[i] !== shadow[i]) { same = false; break; }
      console.log('oam==shadow:', same);
    }
  }
}
