/**
 * SID Player 测试
 */
import { SidPlayer } from '../pages/mini-audio-page/sid-player';
import * as fs from 'fs';
import * as path from 'path';

const RESULT = path.join(__dirname, '..', '_sid_result.txt');
fs.writeFileSync(RESULT, '');

function log(s: string) { console.log(s); fs.appendFileSync(RESULT, s + '\n'); }

async function main() {
  try {
    const sidIdStr = process.argv[2] || '0x3A';
    const maxFrames = parseInt(process.argv[3] || '300', 10);
    const sidId = parseInt(sidIdStr, 16);

    log(`START SID=${sidIdStr} maxFrames=${maxFrames}`);

    log(`Step1: new SidPlayer...`);
    const player = new SidPlayer(48000, (l, r) => {});
    log(`Step1: OK`);

    log(`Step2: load(${sidId})...`);
    const loaded = player.load(sidId);
    log(`Step2: loaded=${loaded} activeMask=0x${player['activeMask'].toString(16)}`);

    if (!loaded) { log('FAIL: load returned false'); return; }

    log(`Step3: start()...`);
    const started = player.start();
    log(`Step3: started=${started}`);

    if (!started) { log('FAIL: start returned false'); return; }

    log(`Step4: run ${maxFrames} frames...`);
    const samples: number[] = [];
    player.onSample = (l, r) => { samples.push((l + r) * 0.5); };

    const t0 = Date.now();
    let f = 0;
    for (; f < maxFrames; f++) {
      if (!player['isPlaying']) break;
      player.tick();
      if (f === 0) log(`  frame 0 done, isPlaying=${player['isPlaying']}`);
    }
    const elapsed = Date.now() - t0;

    log(`Step4: done, ${f}/${maxFrames} frames, ${elapsed}ms, ${samples.length} samples`);
    const expected = Math.floor(f * 48000 / 60);
    log(`  expected ~${expected} samples`);

    let nonZero = 0, maxAbs = 0;
    for (const s of samples) {
      if (Math.abs(s) > 0.001) nonZero++;
      maxAbs = Math.max(maxAbs, Math.abs(s));
    }
    log(`  nonZero=${nonZero}/${samples.length} maxAbs=${maxAbs.toFixed(4)}`);

    log(`DONE`);
  } catch (e: any) {
    log(`ERROR: ${e.message}`);
    if (e.stack) log(e.stack);
  }
}
main();
