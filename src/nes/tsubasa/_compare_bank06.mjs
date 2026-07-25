// Compare bank_06.ts vs bank_06 copy.ts assembled output
import { readFileSync } from 'fs';

function stripCommentLines(content) {
  return content
    .split('\n')
    .filter(line => !line.trim().startsWith('//'))
    .join('\n');
}

function extractArrayContent(fnBody) {
  // Match return [ ... ];
  const match = fnBody.match(/return\s*\[([\s\S]*?)\];/);
  if (!match) {
    // Try multiline spread pattern
    const spreads = [];
    const spreadMatch = fnBody.match(/return\s*\[([\s\S]*?)\];/);
    if (spreadMatch) return spreads;
    return null;
  }
  return match[1];
}

function parseNumbers(content) {
  // Match hex numbers like 0xAB and decimal numbers
  const tokens = content.match(/0x[0-9a-fA-F]+|\d+/g);
  if (!tokens) return [];
  return tokens.map(t => {
    if (t.startsWith('0x') || t.startsWith('0X')) {
      return parseInt(t, 16);
    }
    return parseInt(t, 10);
  });
}

// Simpler approach: eval the TS code with type annotations removed
function evalBankAssemble(code) {
  // Remove TypeScript type annotations
  let cleaned = code
    .replace(/: readonly number\[\]/g, '')
    .replace(/: number\[\]/g, '')
    .replace(/export \{ [^}]+\} as default;/g, '')
    .replace(/console\.log\([^)]+\);/g, '')
    // Convert export { _PRG_BANK_06 as default } to just assign
    .replace(/export \{ _PRG_BANK_06 as default \};/g, '');
  
  // Wrap to capture result
  const wrapped = `
    ${cleaned}
    _PRG_BANK_06;
  `;
  
  try {
    const result = eval(wrapped);
    return result;
  } catch(e) {
    console.error('Eval error:', e.message);
    return null;
  }
}

function countDiffPerSection(origFile, copyFile) {
  // Read both files
  const origCode = readFileSync(origFile, 'utf-8');
  const copyCode = readFileSync(copyFile, 'utf-8');

  // Regex to find function builds and their return values
  const fnRegex = /function\s+(\w+)[\s\S]*?\breturn\s*\[([\s\S]*?)\]\s*;/g;
  
  // Instead, let's evaluate the whole files
  // First, clean TS annotations
  function cleanTS(s) {
    return s
      .replace(/: readonly number\[\]/g, '')
      .replace(/: number\[\]/g, '')
      .replace(/export \{ _PRG_BANK_06 as default \};/g, '')
      .replace(/console\.log\([^)]*\);/g, '')
      .replace(/export \{ [^}]+\} as default;/g, '');
  }

  const origCleaned = cleanTS(origCode);
  const copyCleaned = cleanTS(copyCode);

  let origResult, copyResult;
  try {
    origResult = eval(origCleaned + '\n_PRG_BANK_06;');
  } catch(e) {
    console.error('Original eval failed:', e.message);
    return;
  }
  try {
    copyResult = eval(copyCleaned + '\n_PRG_BANK_06;');
  } catch(e) {
    console.error('Copy eval failed:', e.message);
    return;
  }

  console.log('Original length:', origResult.length);
  console.log('Copy length:', copyResult.length);

  // Find exact function where size differs
  // Extract function names and sequence
  const origFns = Array.from(origCleaned.matchAll(/function\s+(\w+)/g)).map(m => m[1]);
  const copyFns = Array.from(copyCleaned.matchAll(/function\s+(\w+)/g)).map(m => m[1]);

  // Evaluate each function individually and compare sizes
  console.log('\n--- Per-function byte counts ---');
  const allFns = [...new Set([...origFns, ...copyFns])];
  let cumulativeDiff = 0;
  
  const origAssemblyOrder = [
    'build_8000_81FF_scriptEventData',
    'build_8200_83FF_scriptEventData2',
    'build_8400_85FF_scriptEventData3',
    'build_8600_87FF_unusedPad',
    'build_8800_89FF_unusedPad',
    'build_8A00_8BFF_unusedPad',
    'build_8C00_8DFF_unusedPad',
    'build_8E00_8FFF_unusedPad',
    'build_9000_91FF_spriteTileData',
    'build_9200_93FF_spriteTileData2',
    'build_9400_95FF_spriteTileData3',
    'build_9600_97FF_spriteTileData4',
    'build_9800_99FF_nametableDrawData',
    'build_9A00_9BFF_nametableDrawData2',
    'build_9C00_9DFF_nametableDrawData3',
    'build_9E00_9FFF_spritePaletteData',
  ];

  for (const fnName of origAssemblyOrder) {
    let origLen = 0, copyLen = 0;
    try {
      origLen = eval(origCleaned + `\n${fnName}().length;`);
    } catch(e) {}
    try {
      copyLen = eval(copyCleaned + `\n${fnName}().length;`);
    } catch(e) {}
    
    const diff = copyLen - origLen;
    const marker = diff !== 0 ? ' *** DIFF ***' : '';
    cumulativeDiff += diff;
    console.log(`  ${fnName}: orig=${origLen}  copy=${copyLen}  diff=${diff}${marker}`);
  }
  console.log(`\nCumulative diff: ${cumulativeDiff} bytes`);
  
  // If total diff is found, find first differing byte
  if (origResult.length !== copyResult.length || !origResult.every((b, i) => b === copyResult[i])) {
    const minLen = Math.min(origResult.length, copyResult.length);
    let firstDiff = -1;
    for (let i = 0; i < minLen; i++) {
      if (origResult[i] !== copyResult[i]) {
        firstDiff = i;
        break;
      }
    }
    if (firstDiff >= 0) {
      console.log(`\nFirst difference at byte ${firstDiff} (0x${firstDiff.toString(16).toUpperCase()}):`);
      console.log(`  Original: 0x${origResult[firstDiff].toString(16).padStart(2, '0').toUpperCase()}`);
      console.log(`  Copy:     0x${copyResult[firstDiff].toString(16).padStart(2, '0').toUpperCase()}`);
      // Show context around first diff
      const ctx = 16;
      const start = Math.max(0, firstDiff - 4);
      const end = Math.min(minLen, firstDiff + 12);
      console.log(`  Original context [${start}..${end-1}]: ${origResult.slice(start, end).map(b => b.toString(16).padStart(2,'0')).join(' ')}`);
      console.log(`  Copy context     [${start}..${end-1}]: ${copyResult.slice(start, end).map(b => b.toString(16).padStart(2,'0')).join(' ')}`);
    }
  }
}

countDiffPerSection(
  'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa-code/prg_banks/bank_06.ts',
  'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa-code/prg_banks/bank_06 copy.ts'
);
