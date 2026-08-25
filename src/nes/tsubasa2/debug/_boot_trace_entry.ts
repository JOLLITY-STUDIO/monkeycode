import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';
import { Tsubasa2 } from '../src/game/index';

async function main() {
  const runtime = new HeadlessRuntime();
  const game = new Tsubasa2();
  // 截 onEnter 后立即 dump
  console.log('=== before boot ===');
  console.log('  palette.bg =', Array.from(game.store.palette.bg).map(v => v.toString(16).padStart(2,'0')).join(' '));
  console.log('  fade.bg =', game.store.fade.bg.toString(16));

  game.boot();
  console.log('=== after boot()  (before first frame) ===');
  console.log('  palette.bg =', Array.from(game.store.palette.bg).map(v => v.toString(16).padStart(2,'0')).join(' '));
  console.log('  fade.bg =', game.store.fade.bg.toString(16));

  // 跑 1 帧
  runtime.frame(game);
  console.log('=== after frame 1 ===');
  console.log('  palette.bg =', Array.from(game.store.palette.bg).map(v => v.toString(16).padStart(2,'0')).join(' '));
  console.log('  fade.bg =', game.store.fade.bg.toString(16));

  runtime.frame(game);
  console.log('=== after frame 2 ===');
  console.log('  palette.bg =', Array.from(game.store.palette.bg).map(v => v.toString(16).padStart(2,'0')).join(' '));
  console.log('  fade.bg =', game.store.fade.bg.toString(16));

  // 跑到 frame 16
  for (let i = 0; i < 14; i++) runtime.frame(game);
  console.log('=== after frame 16 ===');
  console.log('  palette.bg =', Array.from(game.store.palette.bg).map(v => v.toString(16).padStart(2,'0')).join(' '));
  console.log('  fade.bg =', game.store.fade.bg.toString(16));

  // 跑到 frame 60
  for (let i = 0; i < 44; i++) runtime.frame(game);
  console.log('=== after frame 60 ===');
  console.log('  palette.bg =', Array.from(game.store.palette.bg).map(v => v.toString(16).padStart(2,'0')).join(' '));
  console.log('  fade.bg =', game.store.fade.bg.toString(16));
  // 顺便看 ppu palette (from PPU directly)
  console.log('  ppu write palette shown via buffer colors:');
  const buf = (runtime.ppu as any).buffer as Uint32Array;
  const counts = new Map<string, number>();
  for (let i = 0; i < buf.length; i++) {
    const v = buf[i] >>> 0;
    const k = `0x${v.toString(16).padStart(8, '0')}`;
    counts.set(k, (counts.get(k) || 0) + 1);
  }
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  for (const [k, v] of top) console.log(`    ${k}: ${v}px`);
}
main().catch((e) => { console.error(e.stack || e); process.exit(1); });
