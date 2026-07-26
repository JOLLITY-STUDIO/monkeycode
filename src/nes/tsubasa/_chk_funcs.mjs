import fs from 'fs';
const s = fs.readFileSync('src/tsnes/tsubasa-hex2asm/prg_banks/prg_bank_00_dispatch_scene_engine.ts','utf8');
const lines = s.split('\n');
console.log('Total lines:', lines.length);
const funcs = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^function (build\w+)/);
  if (m) funcs.push({name: m[1], line: i + 1});
}
funcs.forEach(f => console.log(f.line + ': ' + f.name));
