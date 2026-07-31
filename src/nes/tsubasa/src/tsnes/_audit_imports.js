const fs = require('fs');
const path = require('path');

const base = 'game-engine/native-game/tsubasa/banks/prg';

// Check bank-31's usage of cross-bank imports
const b31 = fs.readFileSync(path.join(base, 'bank-31-code.ts'), 'utf8');
const lines31 = b31.split('\n');

const crossImports = [
  'bank00_dispatchScene', 'bank00_titleTick',
  'bank11_dispatch', 'bank16_dispatch', 'bank19_dispatch',
  'bank20_dispatch', 'bank22_dispatch', 'bank24_dispatch', 'bank26_dispatch',
  'initScene_$C64E', 'nmiInit_$C71A', 'entryToBank00_dispatch',
  'getCharData_$CD7C', 'timerInit_$CB0F', 'ppuScreenInit_$CB35',
  'clearOam_$CB8B', 'audiotrigger_$CBB0', 'coordTransform_$CDE2',
  'signedOffsetLookup_$CE4D', 'tileCoordConvert_$CDC9',
];

console.log('=== Bank-31 cross-bank import usage ===');
for (const name of crossImports) {
  let count = 0;
  for (const l of lines31) {
    if (l.includes(name) && !l.startsWith('import') && !l.includes('from ')) {
      count++;
    }
  }
  const status = count > 0 ? 'USED' : 'UNUSED';
  console.log(`  ${status.padEnd(8)} ${name.padEnd(30)} ${count} times`);
}

// Check exports from each source bank
console.log('\n=== Source bank export verification ===');
const checks = {
  'bank-00-code': ['bank00_dispatchScene', 'bank00_titleTick'],
  'bank-11-code': ['bank11_dispatch'],
  'bank-16-code': ['bank16_dispatch'],
  'bank-19-code': ['bank19_dispatch'],
  'bank-20-code': ['bank20_dispatch'],
  'bank-22-code': ['bank22_dispatch'],
  'bank-24-code': ['bank24_dispatch'],
  'bank-26-code': ['bank26_dispatch'],
};

for (const [file, names] of Object.entries(checks)) {
  const fp = path.join(base, file + '.ts');
  if (!fs.existsSync(fp)) {
    console.log(`  ${file}: FILE NOT FOUND`);
    continue;
  }
  const content = fs.readFileSync(fp, 'utf8');
  for (const name of names) {
    const found = content.includes('export function ' + name) ||
      content.includes('export const ' + name) ||
      content.includes('export let ' + name) ||
      content.includes('export ' + name + ' ') ||
      content.includes('export { ' + name + ' }') ||
      content.includes('export {' + name + '}');
    if (found) {
      // Check if it's a real implementation or just a stub
      const fnBody = extractFunction(content, name);
      const isStub = fnBody && (fnBody.trim() === '{}' || fnBody.includes('TODO') || fnBody.trim().length < 20);
      if (isStub) {
        console.log(`  STUB  ${name.padEnd(30)} in ${file}: ${fnBody.trim().substring(0,80)}`);
      } else {
        console.log(`  OK    ${name.padEnd(30)} in ${file}`);
      }
    } else {
      console.log(`  MISS  ${name.padEnd(30)} in ${file}`);
    }
  }
}

function extractFunction(content, name) {
  // Naive extraction - find function body
  const idx = content.indexOf('export function ' + name + '(');
  if (idx < 0) {
    const idx2 = content.indexOf('export ' + name);
    if (idx2 < 0) return null;
    return content.substring(idx2, idx2 + 200);
  }
  let braceCount = 0;
  let start = content.indexOf('{', idx);
  if (start < 0) return null;
  let end = start;
  for (let i = start; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') braceCount--;
    if (braceCount === 0) {
      end = i + 1;
      break;
    }
  }
  return content.substring(start, end);
}
