import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const path = resolve(__dirname, '../tsubasa-hex2asm/prg_banks/prg_bank_01_match_jump.ts');
const content = readFileSync(path, 'utf-8');

// Find a specific DATA segment and parse it
const segName = 'DATA_$91E8_$9240';
const escaped = segName.replace(/\$/g, '\\$');
const regex = new RegExp(`const\\s+${escaped}\\s*:\\s*readonly\\s+number\\[\\]\\s*=\\s*\\[`);
const match = regex.exec(content);

if (match) {
  console.log('Found at index:', match.index);
  const snippet = content.substring(match.index, match.index + 300);
  console.log('Snippet:');
  console.log(snippet);
  
  // Try to parse the array
  const openIdx = snippet.indexOf('[');
  let depth = 0;
  let closeIdx = -1;
  for (let i = openIdx; i < snippet.length; i++) {
    if (snippet[i] === '[') depth++;
    else if (snippet[i] === ']') { depth--; if (depth === 0) { closeIdx = i; break; } }
  }
  console.log('Open at', openIdx, 'Close at', closeIdx, 'depth', depth);
  
  if (closeIdx > 0) {
    const inner = snippet.substring(openIdx + 1, closeIdx);
    const hexMatches = inner.match(/0x[0-9A-Fa-f]{2}/g);
    console.log('Hex values found:', hexMatches?.length);
    if (hexMatches) {
      console.log('First 10:', hexMatches.slice(0, 10).join(', '));
    }
  }
} else {
  console.log('NOT FOUND');
  // Try searching with literal characters
  const idx = content.indexOf('DATA_$91E8_$9240');
  console.log('Index of DATA_$91E8_$9240:', idx);
  if (idx >= 0) {
    console.log(content.substring(idx, idx + 200));
  }
}
