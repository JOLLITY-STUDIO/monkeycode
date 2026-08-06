const fs = require('fs');
const path = require('path');

const asmDir = path.join(__dirname, '../_tmp_bzk_out');

// 1. 找 A72C 函数定义
const c2 = fs.readFileSync(path.join(asmDir, 'bank_02.asm'), 'utf-8');
const lines2 = c2.split('\n');

console.log('=== bank_02.asm: A72C function ===');
for (let i = 0; i < lines2.length; i++) {
    if (lines2[i].includes('A72C') && !lines2[i].includes('JSR') && !lines2[i].includes('JMP')) {
        const s = Math.max(0, i);
        const e = Math.min(lines2.length - 1, i + 50);
        for (let j = s; j <= e; j++) {
            console.log(`  ${(j + 1).toString().padStart(5)}| ${lines2[j]}`);
        }
        break;
    }
}

// 2. 找所有调用 $A72C 的地方
console.log('\n\n=== 所有调用 JSR $A72C 的地方 ===');
const codeBanks = ['bank_00.asm', 'bank_01.asm', 'bank_02.asm'];
for (const f of codeBanks) {
    const c = fs.readFileSync(path.join(asmDir, f), 'utf-8');
    const lines = c.split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('A72C') && lines[i].includes('JSR')) {
            const s = Math.max(0, i - 8);
            const e = Math.min(lines.length - 1, i + 2);
            console.log(`\n--- ${f}:${i + 1} ---`);
            for (let j = s; j <= e; j++) {
                console.log(`  ${(j + 1).toString().padStart(5)}| ${lines[j]}`);
            }
        }
    }
}

// 3. 找所有用 ram_00EB 做 bank 选择的代码
console.log('\n\n=== ram_00EB 作为 bank 参数的引用 ===');
for (const f of codeBanks) {
    const c = fs.readFileSync(path.join(asmDir, f), 'utf-8');
    const lines = c.split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('ram_00EB') || lines[i].includes('00EB')) {
            console.log(`  ${f}:${(i + 1).toString().padStart(5)}| ${lines[i].trim()}`);
        }
    }
}
