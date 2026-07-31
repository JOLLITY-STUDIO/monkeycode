/**
 * test-bank-28: Bank 28 独立验证
 * 验证 code 和 data 模块的导入及数据完整性
 */
import type { SystemState } from '../native-game/tsubasa/banks/system-state';

// ── 加载 code 模块 ──
const bank28 = require('../native-game/tsubasa/banks/prg/bank-28-code');
console.log('=== Bank 28 Code Exports ===');
const codeKeys = Object.keys(bank28).filter(k => !k.startsWith('_'));
console.log(`  Functions: ${codeKeys.join(', ')}`);
console.log(`  Total: ${codeKeys.length}`);

// ── 加载 data 模块 ──
const data28 = require('../native-game/tsubasa/banks/prg/bank-28-data');
console.log('\n=== Bank 28 Data Segments ===');
const dataKeys = Object.keys(data28).filter(k => k.startsWith('DATA_'));
console.log(`  Segments: ${dataKeys.length}`);

// ── 数据完整性检查 ──
let totalBytes = 0;
let passed = 0;
let failed = 0;

for (const key of dataKeys) {
  const arr: readonly number[] = data28[key];
  totalBytes += arr.length;

  if (arr.length === 0) {
    console.log(`  ✗ ${key}: empty array`);
    failed++;
  } else {
    const outOfRange = arr.findIndex(b => b < 0 || b > 0xFF);
    if (outOfRange >= 0) {
      console.log(`  ✗ ${key}[${outOfRange}]=${arr[outOfRange]} out of range`);
      failed++;
    } else {
      passed++;
    }
  }
}

console.log(`\n  Passed: ${passed}/${dataKeys.length}`);
console.log(`  Failed: ${failed}/${dataKeys.length}`);
console.log(`  Total bytes: ${totalBytes}`);

// ── 函数签名验证 ──
console.log('\n=== Code Function Signatures ===');
for (const k of codeKeys) {
  if (typeof bank28[k] === 'function') {
    const fn = bank28[k] as Function;
    console.log(`  ${k}: ${fn.length} params`);
  } else if (bank28[k] && typeof bank28[k] === 'object') {
    console.log(`  ${k}: dispatch table (${Object.keys(bank28[k]).length} entries)`);
  }
}

// ── 最终结果 ──
const overall = failed === 0;
console.log(`\n${overall ? '✓' : '✗'} Bank 28 verification ${overall ? 'PASSED' : 'FAILED'} (data integrity only)`);
process.exit(overall ? 0 : 1);
