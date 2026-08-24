const fs = require('fs');
const s = fs.readFileSync('src/game/prg/data/audio/audio-rom.ts', 'utf8');
// 常量定义
for (const name of ['BANK12_BASE_ADDR', 'SONG_COUNT', 'BGM_POINTER_TABLE_ADDR', 'BGM_POINTER_TABLE_LEN', 'SE_POINTER_TABLE_ADDR', 'SE_POINTER_TABLE_LEN', 'NOTE_DURATION_TABLE_ADDR', 'NOTE_DURATION_TABLE_LEN', 'NOTE_FREQ_TABLE_ADDR']) {
  const re = new RegExp('const ' + name + '\\s*[:=][^;]*;');
  const m = s.match(re);
  console.log(name, '=', m ? m[0].replace(/\s+/g, ' ').slice(0, 200) : 'NOT FOUND');
}
// SONG_REQUEST_IDS 数组
const m2 = s.match(/SONG_REQUEST_IDS[\s\S]*?=.*?\[([\s\S]*?)\];/);
if (m2) console.log('SONG_REQUEST_IDS = [' + m2[1].replace(/\s+/g, '') + ']');
// AudioRom 类方法签名
const cls = s.indexOf('class AudioRom');
console.log('--- class AudioRom at', cls, '---');
const sig = s.slice(cls, cls + 6000).match(/static\s+\w+\([^)]*\):?\s*\w*/g);
if (sig) console.log(sig.join('\n'));
// SONG_REQUEST_IDS 定义位置附近注释
const si = s.indexOf('SONG_REQUEST_IDS');
console.log('--- SONG_REQUEST_IDS 上下文 ---');
console.log(s.slice(si - 500, si + 200));
