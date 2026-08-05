// 搜索所有 ASM 文件中 ram_043B 的出现
const fs = require('fs');
const path = require('path');

const dir = '_tmp_bzk_out';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.asm'));

for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('043B') || line.includes('3B 04') || line.includes('3B04')) {
            console.log(`\n=== ${file}:${i+1} ===`);
            // 打印上下文
            for (let j = Math.max(0, i-3); j <= Math.min(lines.length-1, i+3); j++) {
                console.log(lines[j]);
            }
        }
    }
}
console.log('\n搜索完成');
