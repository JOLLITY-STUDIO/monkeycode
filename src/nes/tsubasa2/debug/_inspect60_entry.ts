import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';
import { Tsubasa2 } from '../src/game/index';

async function main() {
  const runtime = new HeadlessRuntime();
  const game = new Tsubasa2();
  game.boot();
  for (let f = 1; f <= 65; f++) {
    runtime.frame(game);
  }
  // 在 frame 60 (Tecmo logo only, NT 全空) 检查 BG 颜色
  const buf = (runtime.ppu as any).buffer as Uint32Array;
  const counts = new Map<string, number>();
  for (let i = 0; i < buf.length; i++) {
    const v = buf[i] >>> 0;
    const k = `0x${v.toString(16).padStart(8, '0')}`;
    counts.set(k, (counts.get(k) || 0) + 1);
  }
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
  console.log('=== frame 60 top colors ===');
  for (const [k, v] of top) console.log(`  ${k}: ${v} pixels`);
  // 看 NT
  console.log('=== NT state ===');
  let ntNonZero = 0;
  for (let a = 0x2000; a <= 0x23bf; a++) {
    const v = game.store.readByte(a);
    if (v !== 0) {
      ntNonZero++;
      if (ntNonZero <= 20) console.log(`  $${a.toString(16)}=${v.toString(16)}`);
    }
  }
  console.log(`  total non-zero NT entries: ${ntNonZero} / 960`);
  // 看 shadow OAM
  console.log('=== shadow OAM (slot 0-39 only, Tecmo logo) ===');
  let spriteYmin = 255, spriteYmax = 0, activeCount = 0;
  for (let s = 0; s < 40; s++) {
    const base = s * 4;
    const y = game.store.shadowOam[base + 0];
    const x = game.store.shadowOam[base + 3];
    if (y < 240) {
      activeCount++;
      spriteYmin = Math.min(spriteYmin, y);
      spriteYmax = Math.max(spriteYmax, y);
    }
  }
  console.log(`  active sprites: ${activeCount}, Y range ${spriteYmin}-${spriteYmax}`);
  // 看 palette
  console.log('=== palette ===');
  const bg = game.store.palette.bg;
  const sp = game.store.palette.spr;
  console.log('  bg:', bg.map(v => v.toString(16).padStart(2,'0')).join(' '));
  console.log('  sp:', sp.map(v => v.toString(16).padStart(2,'0')).join(' '));
}
main().catch((e) => { console.error(e.stack || e); process.exit(1); });
