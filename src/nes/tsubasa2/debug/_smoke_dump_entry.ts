/**
 * _smoke_dump_entry.ts — esbuild entry
 * 跑 660 帧, 在关键 frame 打印 buffer stats
 */
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';
import { Tsubasa2 } from '../src/game/index';

async function main() {
  const runtime = new HeadlessRuntime();
  const game = new Tsubasa2();
  game.boot();
  const FRAMES = new Set([60, 120, 180, 240, 300, 360, 420, 480, 540, 600]);
  for (let f = 1; f <= 660; f++) {
    runtime.frame(game);
    if (FRAMES.has(f) || f % 60 === 0) {
      const buf = (runtime.ppu as any).buffer as Uint32Array;
      let nz = 0;
      const counts = new Map<number, number>();
      for (let i = 0; i < buf.length; i++) {
        const v = buf[i] >>> 0;
        if (v !== 0 && v !== 0xff000000) nz++;
        counts.set(v, (counts.get(v) || 0) + 1);
      }
      const top = [...counts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([k, v]) => '0x' + k.toString(16).padStart(8, '0') + '×' + v)
        .join(' ');
      const sceneId = game.store.readByte(0x00ed);
      console.log(
        `f=${String(f).padStart(3)} scene=${sceneId}` +
          ` nz=${nz} top=[${top}]` +
          ` ram_001B=${game.store.readByte(0x001b).toString(16)}` +
          ` mask=${(game.store.ppuState.mask || 0).toString(16)}` +
          ` ctrl=${(game.store.ppuState.ctrl || 0).toString(16)}`
      );
    }
  }
}
main().catch((e) => { console.error(e.stack || e); process.exit(1); });
