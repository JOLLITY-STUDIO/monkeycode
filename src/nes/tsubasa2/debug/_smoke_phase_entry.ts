import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';
import { Tsubasa2 } from '../src/game/index';

async function main() {
  const runtime = new HeadlessRuntime();
  const game = new Tsubasa2();
  game.boot();
  // 通过反射拿到 scene0 controller 的 phase
  const router = (game as any).router;
  let scene0 = router.getController(0);
  console.log('=== phase map for scene 0 ===');
  console.log('FadeInAndWait16 = 0, OamDrift = 1, LoadScene3Nt = 2, Wait4 = 3, Scroll = 4, Hold = 5, FadeOut = 6, Done = 7');
  console.log('=== frame dump ===');
  // dump sprite slot 40 + first 5 slots at intervals around frame 300
  const inspectFrames = [16, 32, 64, 96, 100, 132, 152, 200, 250, 300, 350, 432, 480];
  for (let f = 1; f <= 500; f++) {
    runtime.frame(game);
    if (inspectFrames.includes(f)) {
      const phase = scene0.phase;
      const counter = scene0.counter;
      const driftY = scene0.driftY;
      // dump oam for slot 40-45
      const oamDump: any[] = [];
      for (let s = 38; s <= 45; s++) {
        const base = 0x0468 + s * 4;
        const y = game.store.readByte(base + 0);
        const tile = game.store.readByte(base + 1);
        const attr = game.store.readByte(base + 2);
        const x = game.store.readByte(base + 3);
        oamDump.push(`s${s}:(${x},${y},t${tile},a${attr})`);
      }
      console.log(
        `f=${String(f).padStart(3)} phase=${phase} counter=${String(counter).padStart(3)}` +
          ` driftY=${String(driftY).padStart(3)}` +
          ` scrollY=${game.store.readByte(0x0044)} scrollFlag=${game.store.readByte(0x0079)}` +
          ` 001B=${game.store.readByte(0x001b).toString(16)} ` +
          oamDump.join(' '),
      );
    }
  }
}
main().catch((e) => { console.error(e.stack || e); process.exit(1); });
