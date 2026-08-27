/**
 * _verify_chain.ts — boot→meeting→match 链路自动化验证 (V0.5)
 *
 * 触发序列:
 *   frame 0-15   : Opening (scene=100) 显示 logo
 *   frame 16     : inject START → BootRouter.changeScene(200)
 *   frame 30-60  : TitleMenu (scene=200) KICKOFF
 *   frame 70     : inject A → BootRouter.changeScene(15/14)
 *   frame 80-900 : chain advance Scene14→15→16→17→18→20→21→22→23→Meeting(300)
 *   frame 950+   : Meeting (scene=300) ScriptEngine 跑剧情第一段
 *   frame 1500+  : inject START → MatchStartScene(400).startMatch()
 *
 * 输出:
 *   output/chain-verify.log
 *   output/chain-verify.json
 */
import * as fs from 'fs';
import * as path from 'path';
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';
import { Button } from '../src/game/prg/code/system/InputService';

const outDir = path.join(__dirname, '..', 'output');
fs.mkdirSync(outDir, { recursive: true });

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);

const store: any = (game as any).store;
const input: any = (game as any).input;

const logLines: string[] = [];
const timeline: Array<{ frame: number; sceneId: number; marker001B: number; marker001E: number; note: string }> = [];

function log(msg: string): void {
  logLines.push(msg);
  console.log(msg);
}

function snap(note: string): void {
  timeline.push({
    frame: (game as any)._frame ?? 0,
    sceneId: store.readByte(0x00ed) ?? 0,
    marker001B: store.readByte(0x001B) ?? 0,
    marker001E: store.readByte(0x001E) ?? 0,
    note,
  });
}

function press(btn: Button, controllerId: 1 | 2 = 1): void {
  // target.controllers[1].state 会被 game.frame() 读 → 必须在 runtime.controllers 上直接写
  const idxMap: Record<number, number> = { 1: 0, 2: 1, 4: 2, 8: 3, 16: 4, 32: 5, 64: 6, 128: 7 };
  const idx = idxMap[btn];
  const state = runtime.controllers[controllerId].state;
  state[idx] = 0x41;
}
function release(): void {
  for (const c of [1, 2]) {
    const state = runtime.controllers[c].state;
    for (let i = 0; i < 8; i++) state[i] = 0x40;
  }
}

const FRAMES = 1800;
for (let f = 0; f < FRAMES; f++) {
  (game as any)._frame = f;
  if (f === 16) { press(Button.Start); log(`[f${f}] inject START`); }
  if (f === 70) { press(Button.A); log(`[f${f}] inject A (KICKOFF)`); }
  if (f === 1500) { press(Button.Start); log(`[f${f}] inject START (进入比赛)`); }
  if (f === 17 || f === 71 || f === 1501) { release(); }
  (game as any).frame(runtime);
  if ([0, 1, 5, 9, 13, 16, 17, 30, 60, 70, 71, 80, 120, 200, 400, 600, 800, 950, 1000, 1200, 1400, 1500, 1501, 1600, 1799].includes(f)) {
    snap(`f${f}`);
  }
}

const logText = logLines.join('\n');
fs.writeFileSync(path.join(outDir, 'chain-verify.log'), logText);
fs.writeFileSync(path.join(outDir, 'chain-verify.json'), JSON.stringify(timeline, null, 2));

log('');
log(`=== timeline (${timeline.length} samples) ===`);
for (const t of timeline) {
  log(`f${String(t.frame).padStart(4)} scene=${String(t.sceneId).padStart(3)} m1B=${String(t.marker001B).padStart(3)} m1E=${String(t.marker001E).padStart(3)}  [${t.note}]`);
}

log('');
log(`final sceneId (0x00ed) = ${store.readByte(0x00ed)}`);
log(`Done.`);
