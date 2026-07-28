import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const bank01Path = resolve(__dirname, '../tsubasa-hex2asm/prg_banks/prg_bank_01_match_jump.ts');
const content = readFileSync(bank01Path, 'utf-8');

// Find all segment declarations
const dataRegex = /const\s+(DATA_\$[0-9A-F]+_\$[0-9A-F]+)\s*:\s*readonly\s+number\[\]\s*=\s*\[/g;
const codeRegex = /function\s+(CODE_\$[0-9A-F]+_\$[0-9A-F]+)\s*\(\)\s*:\s*readonly\s+number\[\]\s*\{[^}]*return\s*\[/g;

console.log('DATA segments:');
let dm;
while ((dm = dataRegex.exec(content)) !== null) {
  const name = dm[1];
  const addrMatch = name.match(/DATA_\$([0-9A-F]+)_\$([0-9A-F]+)/);
  const startAddr = parseInt(addrMatch[1], 16);
  const endAddr = parseInt(addrMatch[2], 16);
  console.log(`  ${name}: $${addrMatch[1]}-$${addrMatch[2]} (offset ${(startAddr-0x8000).toString(16)}-${(endAddr-0x8000).toString(16)}, ${endAddr-startAddr+1} bytes)`);
}

console.log('\nCODE segments:');
let cm;
while ((cm = codeRegex.exec(content)) !== null) {
  const name = cm[1];
  const addrMatch = name.match(/CODE_\$([0-9A-F]+)_\$([0-9A-F]+)/);
  const startAddr = parseInt(addrMatch[1], 16);
  const endAddr = parseInt(addrMatch[2], 16);
  console.log(`  ${name}: $${addrMatch[1]}-$${addrMatch[2]} (offset ${(startAddr-0x8000).toString(16)}-${(endAddr-0x8000).toString(16)}, ${endAddr-startAddr+1} bytes)`);
}

// Check specific offset
console.log('\n=== Check offsets for specific tables ===');
// Manually find the assembled _PRG_BANK_01 array and check bytes at certain offsets
const bankStart = content.indexOf('const _PRG_BANK_01: readonly number[] = [');
if (bankStart >= 0) {
  console.log('Found assembled array at index', bankStart);
  
  // Parse the assembled array
  function parseBankArray(text) {
    // Find [...] after =
    const eqIdx = text.indexOf('=');
    const arrStart = text.indexOf('[', eqIdx);
    
    let depth = 0;
    let i = arrStart;
    while (i < text.length) {
      if (text[i] === '[') depth++;
      else if (text[i] === ']') depth--;
      if (depth === 0) break;
      i++;
    }
    
    const inner = text.substring(arrStart + 1, i);
    
    // Now inner contains ...SEGMENT_NAME, ...SEGMENT_NAME, etc.
    // Each segment is referenced by name. We need to find each segment's actual data.
    const segmentNames = inner.matchAll(/(DATA_\$[0-9A-F]+_\$[0-9A-F]+|CODE_\$[0-9A-F]+_\$[0-9A-F]+)/g);
    
    const fullBank = [];
    for (const sn of segmentNames) {
      const segName = sn[0];
      // Find this segment's definition
      if (segName.startsWith('DATA_')) {
        const segRegex = new RegExp(`const\\s+${segName}\\s*:\\s*readonly\\s+number\\[\\]\\s*=\\s*\\[`);
        const segMatch = segRegex.exec(text);
        if (segMatch) {
          // Parse array
          const arrText = text.substring(segMatch.index);
          const bracketIdx = arrText.indexOf('[');
          depth = 0;
          i = bracketIdx;
          while (i < arrText.length) {
            if (arrText[i] === '[') depth++;
            else if (arrText[i] === ']') depth--;
            if (depth === 0) break;
            i++;
          }
          const inner2 = arrText.substring(bracketIdx + 1, i);
          const hexes = inner2.match(/0x[0-9A-Fa-f]+/g);
          if (hexes) {
            for (const h of hexes) {
              fullBank.push(parseInt(h, 16));
            }
          }
        }
      } else {
        // CODE - find function and parse return [...]
        const segRegex = new RegExp(`function\\s+${segName}\\s*\\(\\).*?\\{`);
        const segMatch = segRegex.exec(text);
        if (segMatch) {
          const remainder = text.substring(segMatch.index);
          const returnIdx = remainder.indexOf('return');
          if (returnIdx >= 0) {
            const afterReturn = remainder.substring(returnIdx + 6);
            const bracketIdx = afterReturn.indexOf('[');
            depth = 0;
            i = bracketIdx;
            while (i < afterReturn.length) {
              if (afterReturn[i] === '[') depth++;
              else if (afterReturn[i] === ']') depth--;
              if (depth === 0) break;
              i++;
            }
            const inner2 = afterReturn.substring(bracketIdx + 1, i);
            const hexes = inner2.match(/0x[0-9A-Fa-f]+/g);
            if (hexes) {
              for (const h of hexes) {
                fullBank.push(parseInt(h, 16));
              }
            }
          }
        }
      }
    }
    return fullBank;
  }
  
  const bank = parseBankArray(content);
  console.log('Total bank bytes:', bank.length);
  
  // Check specific offsets
  const checks = [
    { addr: '$B1E8', offset: 0x11E8 },
    { addr: '$B255', offset: 0x1255 },
    { addr: '$B241', offset: 0x1241 },
    { addr: '$83EE', offset: 0x03EE },
  ];
  
  for (const check of checks) {
    if (check.offset < bank.length) {
      console.log(`${check.addr} (offset 0x${check.offset.toString(16)}):`, bank.slice(check.offset, check.offset + 16).map(n => '0x' + n.toString(16).padStart(2, '0')).join(' '));
    } else {
      console.log(`${check.addr} (offset 0x${check.offset.toString(16)}): OUT OF RANGE`);
    }
  }
}
