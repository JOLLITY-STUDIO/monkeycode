// 在 Bank 0/2/30 里搜切 PRG bank 到 3/6/7 的模式
// MMC3: STA $8000(reg6=$8000窗)或(reg7=$A000窗), 然后写 bank 号到 $8001
import b0 from './rom-data/prg-bank-00';
import b2 from './rom-data/prg-bank-02';
import b30 from './rom-data/prg-bank-30';

const TARGET_BANKS = [3, 6, 7];

function find(b, basePC, name) {
  console.log(`\n=== ${name} ===`);
  for (let i = 0; i < b.length - 4; i++) {
    // 模式1: LDA #$06/$07; STA $8000; ...; LDA #xx; STA $8001 (直接立即数)
    if (b[i] === 0xA9 && [0x06, 0x07].includes(b[i + 1])) {
      // 看后续几条指令是否 STA $8000
      for (let j = i + 2; j < Math.min(i + 16, b.length); j++) {
        if (b[j] === 0x8D && b[j + 1] === 0x00 && b[j + 2] === 0x80) {
          // 找到了 STA $8000，然后找后续写 bank 的
          for (let k = j + 3; k < Math.min(j + 16, b.length); k++) {
            if (b[k] === 0x8D && b[k + 1] === 0x01 && b[k + 2] === 0x80) {
              // 找到了 STA $8001，往回看 bank 值
              for (let m = k - 1; m >= j + 2; m--) {
                if (b[m] === 0xA9 && TARGET_BANKS.includes(b[m + 1])) {
                  const pc = '0x' + (basePC + i).toString(16).toUpperCase();
                  console.log(`  ${pc}: LDA #$${b[i+1].toString(16)} → STA $8000 (reg${b[i+1]}) → LDA #$${b[m+1].toString(16)} → STA $8001  [bank ${b[m+1]}→win ${b[i+1]===6?'$8000':'$A000'}]`);
                }
              }
              break;
            }
          }
          break;
        }
      }
    }
  }
  
  // 模式2: 通过变量间接写的 (JSR到公共切换函数)
  // 搜 LDA abs (A5/A4/AD) 取值再写
  for (let i = 0; i < b.length - 4; i++) {
    if ((b[i] === 0xA5 || b[i] === 0xA4) && [0x06, 0x07].includes(b[i + 1])) {
      for (let j = i + 2; j < Math.min(i + 12, b.length); j++) {
        if (b[j] === 0x8D && b[j + 1] === 0x01 && b[j + 2] === 0x80) {
          // 该位置之前有写 $8000 吗
          for (let k = j - 1; k >= i; k--) {
            if (b[k] === 0x8D && b[k + 1] === 0x00 && b[k + 2] === 0x80) {
              const pc = '0x' + (basePC + i).toString(16).toUpperCase();
              console.log(`  ${pc}: VAR write reg${b[i+1].toString(16).toUpperCase()} → STA $8000 → STA $8001`);
            }
          }
        }
      }
    }
  }
}

find(b0, 0x8000, 'Bank00');
find(b2, 0xA000, 'Bank02');
find(b30, 0xC000, 'Bank30');

// 也搜一下 JSR 调用 $8000-$9FFF (call Bank00 / 放在 $8000窗口的bank)
console.log('\n=== 各Bank中 JSR $8000-$9FFF (调Bank00窗口) ===');
[b0,b2,b30].forEach((b,i) => {
  const names = ['Bank00','Bank02','Bank30'];
  const bases = [0x8000, 0xA000, 0xC000];
  for (let j=0; j<b.length-2; j++) {
    if (b[j]===0x20 && b[j+2]>=0x80 && b[j+2]<0xA0) {
      const tgt = (b[j+2]<<8)|b[j+1];
      console.log(`  ${names[i]} $${(bases[i]+j).toString(16).toUpperCase()} JSR $${tgt.toString(16).toUpperCase()}`);
    }
  }
});
