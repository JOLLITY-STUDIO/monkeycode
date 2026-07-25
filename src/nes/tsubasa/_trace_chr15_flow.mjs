import { readFileSync } from 'fs';

const f = readFileSync('_tmp_bzk_out_openning/bank_00.asm', 'utf8');
const lines = f.split('\n');

// 1. Find $94D8 function
console.log('=== $94D8 函数体 ===');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('$94D8') && !lines[i].includes('JSR $94D8')) {
    const start = Math.max(0, i - 2);
    const end = Math.min(lines.length - 1, i + 20);
    for (let k = start; k <= end; k++) {
      console.log(`  L${k + 1}: ${lines[k].trim()}`);
    }
    console.log();
    break;
  }
}

// 2. Find the caller of $94D8 (in opcode handler)
// The call is at $9250 (JSR $94D8). Let's find the full opcode $80-$9F handler
console.log('\n=== 脚本解释器 opcode $80-$9F → $94D8 调用点 ===');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('$9241') || lines[i].includes('$9245') || 
      lines[i].includes('$9250')) {
    const start = Math.max(0, i - 1);
    const end = Math.min(lines.length - 1, i + 2);
    for (let k = start; k <= end; k++) {
      console.log(`  L${k + 1}: ${lines[k].trim()}`);
    }
  }
}

// 3. Find CDL-executed opcode reads around $9224 (the script interpreter's LDA ($92),Y)
console.log('\n=== $9224 脚本 opcode 读取 (CDL 执行过的) ===');
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (l.includes('$9224') || (l.includes('$9228') && l.includes('BMI'))) {
    const start = Math.max(0, i - 1);
    const end = Math.min(lines.length - 1, i + 5);
    for (let k = start; k <= end; k++) {
      console.log(`  L${k + 1}: ${lines[k].trim()}`);
    }
    console.log();
  }
}
