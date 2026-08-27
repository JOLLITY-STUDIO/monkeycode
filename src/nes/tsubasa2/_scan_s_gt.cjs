const fs = require('fs');
const t = fs.readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');
const re = /{f:(\d+),c:\[.*?\],p:(?:null|\{[^}]*\}),o:\[.*?\],n:\[.*?\],a:\[.*?\],s:\{([^}]+)\}\}/gs;
const out = {};
let m;
while ((m = re.exec(t))) {
  const f = parseInt(m[1]);
  if (f >= 3724 && f <= 3785) out[f] = m[2].replace(/\s+/g, ' ');
}
for (const f of [3724, 3725, 3726, 3727, 3728, 3729, 3730, 3731, 3732, 3733, 3734, 3735, 3736, 3737, 3738, 3739, 3740, 3741, 3742, 3745, 3750, 3755, 3760, 3765, 3770, 3775, 3780, 3781, 3782, 3783]) {
  console.log('f' + f, 's:{' + (out[f] ?? 'NOT FOUND') + '}');
}
