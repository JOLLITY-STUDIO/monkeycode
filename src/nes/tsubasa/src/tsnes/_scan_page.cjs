const fs = require('fs');
const p = 'pages/game-audio/game-audio.ts';
const lines = fs.readFileSync(p, 'utf8').split('\n');
console.log('=== game-audio.ts 播放相关 ===');
lines.forEach((l, i) => {
  if (/playBgm|setOneShot|oneShot|loop|Loop|循环|_tick|setInterval|renderAll|player\.(start|stop|load|tick)|Tsubasa2AudioPlayer/.test(l)) {
    console.log((i + 1) + ': ' + l.trim());
  }
});
