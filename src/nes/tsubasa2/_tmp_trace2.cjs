const fs = require('fs');
const lines = fs.readFileSync('docs/trace/Captain Tsubasa II - Super Striker (Japan)-openning3.log', 'utf8').split('\n');

// 1. 找第一个画面的 bank 切换序列 ($25/$3C/$3D 值变化)
console.log('=== Bank 切换序列 ($25 = R7 bank, $3C/$3D = 协程槽) ===');
let count = 0;
for (let i = 0; i < lines.length && count < 20; i++) {
  const l = lines[i];
  // 找 STA $8001 前面的 LDA $25 或 LDA $3C
  if (l.includes('STA $8001')) {
    // 回溯找 LDA $25 / LDA $3C / LDA $3D
    for (let j = Math.max(0, i-5); j <= i; j++) {
      const lj = lines[j];
      if (lj.includes('LDA $25') || lj.includes('LDA $3C') || lj.includes('LDA $3D') || lj.includes('LDX $3D') || lj.includes('LDY $3E')) {
        console.log(`L${j+1}: ${lj.substring(0, 120)}`);
      }
    }
    console.log(`L${i+1}: ${l.substring(0, 120)}`);
    console.log('---');
    count++;
  }
}

// 2. 找 $00ED (场景索引) 的写入
console.log('\n=== $00ED (场景索引) 写入 ===');
count = 0;
for (let i = 0; i < lines.length && count < 10; i++) {
  if (lines[i].includes('STA $00ED') || lines[i].includes('STA $ED ')) {
    console.log(`L${i+1}: ${lines[i].substring(0, 120)}`);
    count++;
  }
}

// 3. 找 PPU $2006/$2007 写入 (NT 渲染)
console.log('\n=== PPU $2006 写入 (前10) ===');
count = 0;
for (let i = 0; i < lines.length && count < 10; i++) {
  if (lines[i].includes('STA $2006')) {
    console.log(`L${i+1}: ${lines[i].substring(0, 120)}`);
    count++;
  }
}

// 4. 找 $2000 写入 (PPU 控制寄存器)
console.log('\n=== PPU $2000 写入 ===');
count = 0;
for (let i = 0; i < lines.length && count < 5; i++) {
  if (lines[i].includes('STA $2000')) {
    console.log(`L${i+1}: ${lines[i].substring(0, 120)}`);
    count++;
  }
}

// 5. 找 $2001 写入 (PPU mask 渲染开关)
console.log('\n=== PPU $2001 写入 ===');
count = 0;
for (let i = 0; i < lines.length && count < 5; i++) {
  if (lines[i].includes('STA $2001')) {
    console.log(`L${i+1}: ${lines[i].substring(0, 120)}`);
    count++;
  }
}
