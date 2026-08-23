// 搜索 src/game 中音频请求调用点 + 页面主循环接入点
const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2';

function walkFiles(d, ext, out) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === '.git') continue;
    const fp = path.join(d, e.name);
    if (e.isDirectory()) walkFiles(fp, ext, out);
    else if (e.name.endsWith(ext)) out.push(fp);
  }
}

const ts = [];
walkFiles(path.join(root, 'src'), '.ts', ts);
const pats = [
  /requestPlay/, /\.audio\./, /audioService/, /ram_0700/, /0x0700/, /0700\)/,
  /playBgm/, /playSe/, /playSE/, /playBGM/, /audio\./,
];
console.log('=== src/game 中音频调用 ===');
for (const f of ts) {
  const t = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  t.forEach((l, i) => {
    if (pats.some(p => p.test(l))) {
      console.log(`${f.replace(root, '')}:${i + 1}  ${l.trim().slice(0, 110)}`);
    }
  });
}

// 页面主循环: 找 new Tsubasa2 / loadTsROM / .frame(
const all = [];
walkFiles(root, '.ts', all);
walkFiles(root, '.js', all);
console.log('\n=== 主循环/启动 ===');
const seen = new Set();
for (const f of all) {
  if (/node_modules/.test(f) || /_tmp/.test(f) || /debug/.test(f) || /scripts/.test(f)) continue;
  const t = fs.readFileSync(f, 'utf8');
  const lines = t.split(/\r?\n/);
  lines.forEach((l, i) => {
    if (/new Tsubasa2|loadTsROM|\.frame\(\)|requestAnimationFrame|SpeakersMini|onAudioSample|new Speakers/.test(l)) {
      const k = f + ':' + i;
      if (!seen.has(k)) { seen.add(k); console.log(`${f.replace(root, '')}:${i + 1}  ${l.trim().slice(0, 120)}`); }
    }
  });
}
