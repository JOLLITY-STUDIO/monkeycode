/**
 * generate_wav.cjs — 用 bank12 引擎 + PAPU 生成 WAV
 * 用法: node generate_wav.cjs [bgmIdHex] [frames] [output.wav]
 * 默认: BGM 0x36, 3600帧(60秒), output.wav
 */
const fs = require('fs');
const path = require('path');

function writeWav(filename, samplesL, samplesR, sampleRate) {
  const n = samplesL.length;
  const buf = Buffer.alloc(44 + n * 4);
  buf.write('RIFF', 0);
  buf.writeUInt32LE(36 + n * 4, 4);
  buf.write('WAVE', 8);
  buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(sampleRate * 4, 28);
  buf.writeUInt16LE(4, 32);
  buf.writeUInt16LE(16, 34);
  buf.write('data', 36);
  buf.writeUInt32LE(n * 4, 40);
  let off = 44;
  for (let i = 0; i < n; i++) {
    const l = Math.max(-1, Math.min(1, samplesL[i]));
    const r = Math.max(-1, Math.min(1, samplesR[i]));
    buf.writeInt16LE((l * 32767) | 0, off); off += 2;
    buf.writeInt16LE((r * 32767) | 0, off); off += 2;
  }
  fs.writeFileSync(filename, buf);
  console.log('WAV: ' + filename + ' (' + n + ' samples, ' + (n/sampleRate).toFixed(1) + 's)');
}

async function main() {
  const bgmId = parseInt(process.argv[2] || '0x36', 16);
  const frames = parseInt(process.argv[3] || '3600');
  const outFile = process.argv[4] || 'output.wav';
  const sampleRate = 44100;
  const dist = path.join(__dirname, 'dist/src');

  console.log('Generating WAV: BGM=0x' + bgmId.toString(16) + ', frames=' + frames + ', out=' + outFile);

  // PAPU
  const PAPU = require(path.join(dist, 'core/papu/index.js'));
  const PapuClass = PAPU.default || PAPU.PAPU || PAPU;
  const papu = new PapuClass(sampleRate);

  // Engine
  const AE = require(path.join(dist, 'game/service/bank12_audio_engine.js'));
  const EngineClass = AE.Bank12AudioEngine || AE.default;
  const engine = new EngineClass(papu);

  // BGM data
  const idHex = bgmId.toString(16).toUpperCase();
  const prefix = 'BGM_' + idHex;
  const bgmMod = require(path.join(dist, 'game/data/prg/audio/bgm/BGM_0x' + idHex + '.js'));
  const sq1 = bgmMod[prefix + '_TRACK_SQ1'];
  const sq2 = bgmMod[prefix + '_TRACK_SQ2'];
  const tri = bgmMod[prefix + '_TRACK_TRI'];
  const noise = bgmMod[prefix + '_TRACK_NOISE'];
  const raw = bgmMod[prefix + '_RAW'];
  const base = bgmMod[prefix + '_NES_BASE'];
  const hdrOff = bgmMod[prefix + '_HEADER_OFFSET'] || 0;
  console.log('BGM 0x' + idHex + ': sq1=' + (sq1?sq1.length:0) + ' sq2=' + (sq2?sq2.length:0) + ' tri=' + (tri?tri.length:0) + ' noise=' + (noise?noise.length:0) + ' raw=' + (raw?raw.length:0) + ' base=0x' + (base||0).toString(16) + ' hdrOff=' + hdrOff);

  if (!sq1) { console.error('BGM not found'); process.exit(1); }

  // Sample callback
  const samplesL = [];
  const samplesR = [];
  papu.setSampleCallback(function(l, r) { samplesL.push(l); samplesR.push(r); });

  // Load and start
  engine.load(sq1, sq2, tri, noise, raw, base, hdrOff);
  engine.start();

  // Run frames
  for (var f = 0; f < frames; f++) {
    engine.tick();
    if (f % 600 === 0) console.log('  frame ' + f + '/' + frames + ' (' + (f/60).toFixed(0) + 's) samples=' + samplesL.length);
    if (!engine.progress || !engine.progress.playing) {
      console.log('  Engine stopped at frame ' + f);
      break;
    }
  }

  if (samplesL.length === 0) { console.error('ERROR: No samples generated!'); process.exit(1); }
  writeWav(outFile, samplesL, samplesR, sampleRate);
  console.log('Done.');
}

main().catch(function(e) { console.error(e); process.exit(1); });
