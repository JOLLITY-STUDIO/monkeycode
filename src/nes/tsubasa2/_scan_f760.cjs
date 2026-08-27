const fs = require('fs');
const c = fs.readFileSync('src/game/prg/data/scene/opening/opening-title-1.ts', 'utf8');
const lines = c.split('\n');
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^  \{f:(\d+),/);
  if (!m) continue;
  const f = +m[1];
  if (f < 690 || f > 790) continue;
  const s = lines[i].match(/s:\{v:(\d+),h:(\d+),vt:(\d+),ht:(\d+),fv:(\d+),fh:(\d+),cv:(\d+),ch:(\d+),cvt:(\d+),cht:(\d+)\}/);
  const os = lines[i].match(/o:\[\[(\d+),(\d+),(\d+),(\d+),(\d+)/) || [];
  const ns = (lines[i].match(/n:\[(\{ni:\d+,r:\d+,d:\[[^\]]*\]\})/g) || []).length;
  const scr = s ? `h=${s[2]} ht=${s[4]} fh=${s[6]} v=${s[1]} vt=${s[3]} fv=${s[5]}` : 'NO-S';
  const o = os.length ? `o0[x=${os[5]} y=${os[2]} tile=${os[3]}]` : 'o=[]';
  console.log(`f${f} ${scr} ${o} nrows=${ns}`);
}
