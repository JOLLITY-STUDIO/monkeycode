const fs = require('fs');
const f = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/tables/bank07-scenes-metatile.ts';
const c = fs.readFileSync(f, 'utf8');
const lines = c.split('\n');
// list all SCENE_0xNN exports with their header bytes
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/export const (SCENE_0x\w+)[^=]*= \[/);
  if (m) {
    const name = m[1];
    // gather numbers until closing ]
    let j = i, nums = [];
    let body = lines[i].replace(/^[^[]*\[/, '[');
    while (j < lines.length) {
      const mm = body.match(/(0x[0-9A-Fa-f]+|\d+)/g);
      if (mm) nums.push(...mm.map(s => parseInt(s, 16)));
      if (body.includes(']')) break;
      j++;
      body = lines[j];
    }
    const header = nums.slice(0, 6).map(n => '0x' + n.toString(16).toUpperCase().padStart(2, '0'));
    const w = nums[3] ?? 0, h = nums[4] ?? 0;
    const grid = w * h;
    console.log(`${name}: header=[${header.join(',')}] w=${w} h=${h} gridMetatiles=${grid} (~${grid * 16}tiles)`);
    i = j;
  }
}
