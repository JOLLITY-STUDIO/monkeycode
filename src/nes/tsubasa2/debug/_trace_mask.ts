/**
 * _trace_mask.ts — 检查 f13 正常渲染时 PPU visibility/mask 状态
 */
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);
const ppu: any = (runtime as any).ppu;

for (let f = 1; f <= 30; f++) {
  game.frame(runtime);
  if (f === 9 || f === 11 || f === 13 || f === 25 || f === 30) {
    let nz = 0;
    for (const v of ppu.buffer) if (v !== 0) nz++;
    const store: any = game.store;
    console.log(
      `f${f} | bufNz=${nz} | bgVis=${ppu.f_bgVisibility} spVis=${ppu.f_spVisibility}` +
      ` | mask=${store.ppuState.mask} | maskReg=${(store.readByte(0x0001) & 0xff).toString(16)}` +
      ` | ctrl=${store.ppuState.ctrl.toString(16)}`,
    );
  }
}
