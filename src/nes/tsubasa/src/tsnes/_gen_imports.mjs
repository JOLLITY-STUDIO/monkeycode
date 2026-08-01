import fs from 'fs';

function genImportBlock(dataFile, codeFile) {
    const d = fs.readFileSync(dataFile, 'utf8');
    const names = [...d.matchAll(/export const (DATA_\$(\w+)_\$(\w+))/g)].map(m => ({name: m[1], start: parseInt(m[2], 16), end: parseInt(m[3], 16)}));
    
    // Imports
    const imports = names.map(n => `  ${n.name},`).join('\n');
    const dataFileName = dataFile.split(/[\\/]/).pop();

    // Chunks
    const chunks = names.map(n => {
        const offHex = '0x' + (n.start - 0x8000).toString(16).toUpperCase().padStart(4, '0');
        return `  { offset: ${offHex}, data: ${n.name} },`;
    }).join('\n');

    // Bank number from data file name
    const bankMatch = dataFileName.match(/bank-(\d+)/);
    const bankNum = bankMatch ? bankMatch[1] : 'XX';

    const code = `
import {
${imports}
} from './${dataFileName.replace('.ts', '')}';

// ═════════════════════════════════════════════════
// ROM data chunk lookup (each chunk mapped by bank offset range)
// ═════════════════════════════════════════════════
const _DATA_CHUNKS: Array<{ offset: number; data: readonly number[] }> = [
${chunks}
];

/** ROM 数据访问 — 按 bank offset 查找对应数据块 */
function rom${bankNum}(offset: number): number {
  const bankOff = offset & 0x1FFF;
  for (const chunk of _DATA_CHUNKS) {
    if (bankOff >= chunk.offset && bankOff < chunk.offset + chunk.data.length) {
      return chunk.data[bankOff - chunk.offset];
    }
  }
  return 0;
}
`;

    // Also output the old import line to replace
    console.log('=== REPLACE OLD IMPORTS (line with import ... readMem) ===');
    console.log('Replace: import { ... SystemState ... readMem ... } from ...');
    console.log('');
    console.log('=== NEW CODE BLOCK ===');
    console.log(code);
}

// Bank 11
console.log('# BANK 11');
genImportBlock('game-engine/native-game/tsubasa/banks/prg/bank-11-data.ts', '');
console.log('');
console.log('# BANK 16');
genImportBlock('game-engine/native-game/tsubasa/banks/prg/bank-16-scene-script-engine-data.ts', '');
