const d = require('./_emu_frames.json');
for (const k of Object.keys(d)) {
  const f = d[k];
  console.log(`frame ${f.frame} r4A ${f.r4A} chrBanks [${f.chrBanks.join(',')}]`);
}
