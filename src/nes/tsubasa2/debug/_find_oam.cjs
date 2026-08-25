const fs = require('fs');
const files = [
  'src/game/prg/code/system/InterruptService.ts',
  'src/game/index.ts',
  'src/game/runtime/HeadlessRuntime.ts',
];
for (const f of files) {
  let s;
  try { s = fs.readFileSync(f, 'utf8'); } catch { continue; }
  const lines = s.split(/\r?\n/);
  lines.forEach((l, i) => {
    if (/oamDma|bootOamInit|primeBootState/.test(l)) {
      console.log(f + ':' + (i + 1) + ':' + l);
    }
  });
}
