/**
 * test-bank-27: Bank 27 独立验证
 * 验证 code 和 data 模块的导入及数据完整性
 */
import type { SystemState } from '../native-game/tsubasa/banks/system-state';

// ── 加载 code 模块 ──
const bank27 = require('../native-game/tsubasa/banks/prg/bank-27-code');
console.log('=== Bank 27 Code Exports ===');
const codeKeys = Object.keys(bank27).filter(k => !k.startsWith('_'));
console.log(`  Functions: ${codeKeys.join(', ')}`);
console.log(`  Total: ${codeKeys.length}`);

// ── 加载 data 模块 ──
const data27 = require('../native-game/tsubasa/banks/prg/bank-27-data');
console.log('\n=== Bank 27 Data Segments ===');
const dataKeys = Object.keys(data27).filter(k => k.startsWith('DATA_'));
console.log(`  Segments: ${dataKeys.length}`);

// ── 数据完整性检查 ──
let totalBytes = 0;
let passed = 0;
let failed = 0;

for (const key of dataKeys) {
  const arr: readonly number[] = data27[key];
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
  if (typeof bank27[k] === 'function') {
    const fn = bank27[k] as Function;
    console.log(`  ${k}: ${fn.length} params`);
  } else if (bank27[k] && typeof bank27[k] === 'object') {
    console.log(`  ${k}: dispatch table (${Object.keys(bank27[k]).length} entries)`);
  }
}

// ── 最终结果 ──
const overall = failed === 0;
console.log(`\n${overall ? '✓' : '✗'} Bank 27 verification ${overall ? 'PASSED' : 'FAILED'} (data integrity only)`);
process.exit(overall ? 0 : 1);
