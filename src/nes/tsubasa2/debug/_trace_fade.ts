/**
 * _trace_fade.ts — 逐帧 dump store.fade.bg/spr 与 vramMem palette 值
 * 运行: npx esbuild 后 node 运行
 */
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);
const ppu: any = (runtime as any).ppu;

for (let f = 1; f <= 30; f++) {
  game.frame(runtime);
  const store: any = game.store;
  const fadeBg = (store.fade as any).bg;
  const fadeSpr = (store.fade as any).spr;
  const vram = ppu.vramMem;
  const palBg = [];
  for (let i = 0; i < 16; i++) palBg.push(vram[0x3f00 + i] & 0x3f);
  const nt = ppu.nameTable[0];
  let nz = 0;
  for (const t of nt.tile) if (t !== 0) nz++;
  const oamN = ppu.sprY.filter((y: number) => y !== 0 && y !== 0xf8).length;
  const line = `f${String(f).padStart(2)} | fade=${fadeBg},${fadeSpr} | nt0nz=${nz} | oam=${oamN} | palBg=[${palBg.join(',')}]`;
  console.log(line);
}
