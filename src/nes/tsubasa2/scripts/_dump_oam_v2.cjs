// _dump_oam_v2.cjs - alternative OAM dump that uses store directly (more reliable)
const fs = require('fs');
const path = require('path');

function dumpOamFromPpuTrace(frame) {
  const oamPath = path.join('d:/studio/github/monkeycode/src/nes/tsubasa2/output/ppu-trace',
    `frame-${String(frame).padStart(3,'0')}`, 'oam.json');
  if (!fs.existsSync(oamPath)) {
    console.log('oam.json missing for frame', frame);
    return;
  }
  const oam = JSON.parse(fs.readFileSync(oamPath, 'utf8'));
  let active = 0;
  for (let i = 0; i < 64; i++) {
    const o = oam[i];
    if (o && (o.y || o.tile || o.attr || o.x)) active++;
  }
  console.log('frame', frame, 'H5 oam.json active=', active, '/64');
}

for (let f of [30, 60, 90, 120, 150, 180, 210, 240, 270, 300]) {
  dumpOamFromPpuTrace(f);
}
