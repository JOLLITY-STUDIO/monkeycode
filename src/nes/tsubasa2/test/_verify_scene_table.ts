/**
 * 无头验证：确认场景表驱动重构后场景 0 → 2 流转正常。
 * 运行：npx tsc test/_verify_scene_table.ts --module commonjs --target es2017 --esModuleInterop --skipLibCheck --outDir temp_out && node temp_out/test/_verify_scene_table.js
 */
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';

const game = new Tsubasa2();
const runtime = new HeadlessRuntime();
game.boot();
let sceneAt480 = -1;
for (let f = 0; f < 900; f++) {
  game.frame(runtime);
  if (f === 480) sceneAt480 = game.store.readByte(0x00ed);
}
const buf = (runtime as any).ppu.buffer as Uint32Array;
let nz = 0;
for (let i = 0; i < buf.length; i++) if (buf[i] !== 0) nz++;
console.log(
  JSON.stringify(
    {
      finalScene: game.store.readByte(0x00ed),
      sceneAt480,
      ram1B: game.store.readByte(0x001b).toString(16),
      bufNonZero: nz,
      frame: (game as any)._frame,
    },
    null,
    2,
  ),
);
