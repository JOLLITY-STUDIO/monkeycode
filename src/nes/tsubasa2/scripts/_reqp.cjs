const fs = require('fs');
const files = [
  'src/core/mappers/mapper0.ts',
  'src/game/runtime/HeadlessRuntime.ts',
  'test/api-test-teams.ts',
  'test/api-test-text.ts',
  'test/api-test.ts',
  'src/game/prg/index.ts',
];
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const r = fs.readFileSync(f, 'utf8');
  const lines = r.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/\brequire\(|\bprocess\./.test(l)) {
      console.log(f + ':' + (i + 1) + ': ' + l.substring(0, 150));
    }
  }
}
