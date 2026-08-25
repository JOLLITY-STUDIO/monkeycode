import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';
import { Tsubasa2 } from '../src/game/index';

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const ppu: any = runtime.ppu;

game.boot(runtime);
console.log(`after boot: ctrl=0x${((game as any).store.ppuState.ctrl).toString(16).padStart(2,'0')} ppuSp=${ppu.f_spPatternTable}`);

for (let f = 1; f <= 30; f++) {
  game.frame(runtime);
  const ctrl = (game as any).store.ppuState.ctrl;
  const mask = (game as any).store.ppuState.mask;
  console.log(`f${f.toString().padStart(2,'0')} ctrl=0x${ctrl.toString(16).padStart(2,'0')} mask=0x${mask.toString(16).padStart(2,'0')} spriteSize=${ppu.f_spriteSize} spPatternTable=${ppu.f_spPatternTable} bgPatternTable=${ppu.f_bgPatternTable}`);
}
