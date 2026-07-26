import fs from 'fs';

const src = fs.readFileSync(
  'src/tsnes/tsubasa-hex2asm/prg_banks/prg_bank_15_data.ts',
  'utf8'
);

// Replace each `return asm`...<backtick>;` block containing .byte directives
// with a plain array of hex numbers
let result = src.replace(
  /return asm`([\s\S]*?)`;/g,
  (match, body) => {
    // Extract all $XX hex values from .byte lines
    const bytes = [];
    const lines = body.split('\n');
    for (const line of lines) {
      // Match .byte $XX, $XX, ... patterns
      const m = line.match(/\.byte\s+(.*)/);
      if (m) {
        const vals = m[1].match(/\$([0-9A-Fa-f]{2})/g);
        if (vals) {
          for (const v of vals) {
            bytes.push('0x' + v.substring(1));
          }
        }
      }
    }
    return `[\n    ${bytes.join(', ')}\n  ]`;
  }
);

// Remove the `import { asm } from '../_6502asm';` line
result = result.replace(/import\s*\{\s*asm\s*\}\s*from\s+'[^']*';\s*\n?/, '');

fs.writeFileSync(
  'src/tsnes/tsubasa-hex2asm/prg_banks/prg_bank_15_data.ts',
  result,
  'utf8'
);

console.log('Done converting bank_15_data.ts');
