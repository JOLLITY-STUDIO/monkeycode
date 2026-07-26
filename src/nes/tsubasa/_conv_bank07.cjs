const fs = require('fs');
const path = 'src/tsnes/tsubasa-hex2asm/prg_banks/prg_bank_07_sprite_data.ts';
let src = fs.readFileSync(path, 'utf8');

let changed = 0;
src = src.replace(/return asm`\n\.byte ((?:\$FF, )*\$FF)\n\s*`;/g, (m, body) => {
  const bytes = body.match(/\$FF/g) || [];
  const count = bytes.length;
  const arr = [];
  for (let i = 0; i < count; i += 16) {
    const row = [];
    let j;
    for (j = i; j < Math.min(i + 16, count); j++) {
      row.push('0xFF');
    }
    arr.push('    ' + row.join(', ') + (j < count ? ',' : ''));
  }
  changed++;
  return '  return [\n' + arr.join('\n') + '\n  ];';
});

console.log(`Converted ${changed} functions`);

// Only remove asm import if ALL functions were converted
if (changed >= 8) {
  src = src.replace(/^import \{ asm \} from '[^']+6502asm';\s*\n/m, '');
  console.log('Removed asm import');
}

fs.writeFileSync(path, src, 'utf8');
