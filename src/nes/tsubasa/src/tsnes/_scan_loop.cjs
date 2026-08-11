const fs = require('fs');
const p = 'mini-audio/bgm-data/Tsubasa2AudioPlayer.ts';
const lines = fs.readFileSync(p, 'utf8').split('\n');
console.log('=== Tsubasa2AudioPlayer.ts 循环/停止相关 ===');
lines.forEach((l, i) => {
  if (/loop|LOOP|循环|rewind|reset|trackLo\s*=|silent|silence|stop|halt|ended|end/i.test(l)) {
    console.log((i + 1) + ': ' + l.trim());
  }
});
