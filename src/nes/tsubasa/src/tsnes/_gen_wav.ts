/**
 * 生成 SID 0x3B 和 ROM 开场音乐的 WAV 文件
 * npx tsx _gen_wav.ts
 */
import { SidPlayer } from './pages/mini-audio-page/sid-player';
import * as fs from 'fs';

const SAMPLE_RATE = 48000;
const DURATION_SECONDS = 15;  // 15秒

// ── SID Player ──
console.log('Generating SID 0x3B audio...');
const player = new SidPlayer(SAMPLE_RATE, undefined);
if (!player.load(0x3B)) {
  console.error('Failed to load SID 0x3B');
  process.exit(1);
}
player.start();

const pcm: number[] = [];
player.onSample = (l: number, r: number) => {
  pcm.push((l + r) * 0.25); // soft clip
};

const totalFrames = DURATION_SECONDS * 60;
const t0 = Date.now();
for (let f = 0; f < totalFrames; f++) {
  player.tick();
  if (f % 60 === 0) {
    process.stdout.write(`\r  SID: frame ${f}/${totalFrames} (${pcm.length} samples)...`);
  }
}
console.log(`\r  SID done in ${((Date.now()-t0)/1000).toFixed(1)}s, ${pcm.length} samples`);

// Write WAV
const wavBuf = new ArrayBuffer(44 + pcm.length * 2);
const view = new DataView(wavBuf);
const writeStr = (off: number, str: string) => { for (let i = 0; i < str.length; i++) view.setUint8(off + i, str.charCodeAt(i)); };

writeStr(0, 'RIFF');
view.setUint32(4, 36 + pcm.length * 2, true);
writeStr(8, 'WAVE');
writeStr(12, 'fmt ');
view.setUint32(16, 16, true);
view.setUint16(20, 1, true); // PCM
view.setUint16(22, 1, true); // mono
view.setUint32(24, SAMPLE_RATE, true);
view.setUint32(28, SAMPLE_RATE * 2, true);
view.setUint16(32, 2, true);
view.setUint16(34, 16, true);
writeStr(36, 'data');
view.setUint32(40, pcm.length * 2, true);

for (let i = 0; i < pcm.length; i++) {
  const s = Math.max(-1, Math.min(1, pcm[i]));
  view.setInt16(44 + i * 2, Math.floor(s * 32767), true);
}

fs.writeFileSync('_sid_0x3B.wav', new Uint8Array(wavBuf));
console.log('Wrote _sid_0x3B.wav');

// Print note summary
console.log('\n========== SID 0x3B Note Summary ==========');
const st = player['channels'];
for (let ch = 0; ch < 4; ch++) {
  if (!st[ch].active) continue;
  const chName = ['SQ1','SQ2','TRI','NOISE'][ch];
  console.log(`  ${chName}: active, trackPos=0x${st[ch].trackPos.toString(16)}`);
}
