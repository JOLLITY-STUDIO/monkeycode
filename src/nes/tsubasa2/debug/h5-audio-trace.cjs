/**
 * h5-audio-trace.cjs — H5 TS 版跑 4500 帧, 记录 audio 写入
 * 对比 tsnes audio-full.log 找差异
 */
const fs = require('fs');
const path = require('path');
const ts = require(path.resolve(__dirname, '../_tmp_out/game/index.js'));
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));

const NES = tsnes.NES;
const nes = new NES();
nes.loadROM(fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));

const game = new ts.default(nes);
game.boot();

// Hook DataStore.write 记录 $4000-$4017 写入
const audioLines = [];
const origWrite = game.store.write.bind(game.store);
game.store.write = function(key, val) {
  origWrite(key, val);
  // hook apu_XXXX key
  const am = key.match(/^apu_([0-9A-F]{4})$/i);
  if (am) {
    const addr = parseInt(am[1], 16);
    const names = {
      0x4000: 'SQ1_VOL', 0x4001: 'SQ1_SWEEP', 0x4002: 'SQ1_LO', 0x4003: 'SQ1_HI',
      0x4004: 'SQ2_VOL', 0x4005: 'SQ2_SWEEP', 0x4006: 'SQ2_LO', 0x4007: 'SQ2_HI',
      0x4008: 'TRI_LINEAR', 0x4009: 'TRI_UNUSED', 0x400a: 'TRI_LO', 0x400b: 'TRI_HI',
      0x400c: 'NOISE_VOL', 0x400d: 'NOISE_UNUSED', 0x400e: 'NOISE_LO', 0x400f: 'NOISE_HI',
      0x4010: 'DMC_FREQ', 0x4011: 'DMC_RAW', 0x4012: 'DMC_ADDR', 0x4013: 'DMC_LEN',
      0x4014: 'OAMDMA', 0x4015: 'APU_STATUS', 0x4016: 'JOY1', 0x4017: 'APU_FRAME',
    };
    const name = names[addr] || '';
    audioLines.push('F' + frameCount + ' [AUDIO] STA $' + addr.toString(16).toUpperCase().padStart(4,'0') + ' = #$' + (val & 0xff).toString(16).toUpperCase().padStart(2,'0') + ' ' + name);
    return;
  }
  // hook ram_XXXX for $0700-$07FF / $00F0-$00FF
  const m = key.match(/^ram_([0-9A-F]{4})$/i);
  if (!m) return;
  const addr = parseInt(m[1], 16);
  if ((addr >= 0x0700 && addr <= 0x07FF) || (addr >= 0x00F0 && addr <= 0x00FF)) {
    const names = {};
    if (name) {
      audioLines.push('F' + frameCount + ' [AUDIO] STA $' + addr.toString(16).toUpperCase().padStart(4,'0') + ' = #$' + (val & 0xff).toString(16).toUpperCase().padStart(2,'0') + ' ' + name);
    }
  }
};

let frameCount = 0;
console.log('Running H5 TS 4500 frames...');
for (let i = 0; i < 4500; i++) {
  frameCount = i;
  try {
    game.frame(nes);
  } catch(e) {
    console.log('Frame ' + i + ' error: ' + e.message);
    break;
  }
  if ((i+1) % 500 === 0) console.log('  frame ' + (i+1));
}

// 写文件
const outDir = path.resolve(__dirname, 'trace');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'h5-audio.log'), audioLines.join('\n') + '\n');

console.log('\n=== H5 Audio Trace 完成 ===');
console.log('总帧数: ' + frameCount);
console.log('Audio 写入: ' + audioLines.length + ' 行');
console.log('tsnes audio-full.log: 61221 行');

// 对比前20行
console.log('\n--- H5 前10行 ---');
for (const l of audioLines.slice(0, 10)) console.log(l);
console.log('\n--- tsnes 前10行 ---');
const tsnesAudio = fs.readFileSync(path.join(outDir, 'audio-full.log'), 'utf8').split('\n').filter(l => l.length > 0);
for (const l of tsnesAudio.slice(0, 10)) console.log(l);
