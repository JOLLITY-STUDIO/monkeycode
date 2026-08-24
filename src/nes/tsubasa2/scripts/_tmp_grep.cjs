// 临时：查 audio-rom.ts 关键定义 + 反汇编 bank12 $8090-$8110 分发段
const fs = require('fs');
const f = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/audio/audio-rom.ts';
const t = fs.readFileSync(f, 'utf8');
const lines = t.split('\n');
lines.forEach((l, i) => {
  if (/SONG_REQUEST_IDS|SONG_COUNT|BGM_POINTER_TABLE|readBgmPointer|readBgmData|readSePointer|readBank12U16|readBank12Byte/.test(l)) {
    console.log((i + 1) + ': ' + l.trim());
  }
});

// 找 SONG_REQUEST_IDS 的完整数组（定义行往后 60 行）
const idx = lines.findIndex((l) => /SONG_REQUEST_IDS\s*[:=]/.test(l));
if (idx >= 0) {
  console.log('\n--- SONG_REQUEST_IDS 定义 ---');
  for (let i = idx; i < Math.min(idx + 40, lines.length); i++) console.log((i + 1) + ': ' + lines[i]);
}
