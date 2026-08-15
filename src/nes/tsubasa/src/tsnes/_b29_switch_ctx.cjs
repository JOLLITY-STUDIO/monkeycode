/** 查看 bank_30 / bank_26 / bank_31 中加载 bank29 的上下文 */
const fs = require('fs');
const path = require('path');
const dir = '_tmp_bzk_out';

function show(fname, lineNo, before = 8, after = 10) {
  const t = fs.readFileSync(path.join(dir, fname), 'utf8').split(/\r?\n/);
  console.log('\n==== ' + fname + ' L' + lineNo + ' ====');
  console.log(t.slice(Math.max(0, lineNo - before), lineNo + after).join('\n'));
}

// bank_30 L1477: A9 D1 / A0 1D / JSR $CAE7
show('bank_30.asm', 1477);
// bank_30 L2429: STA ram_0024 / LDA #$1D / STA ram_0025
show('bank_30.asm', 2429);
// bank_30 L3324: BNE / LDA #$1D / RTS
show('bank_30.asm', 3324);
// bank_26 L2561: BEQ / LDA #$1D / JSR $C54E
show('bank_26.asm', 2561);
// bank_26 L3688: BNE / LDA #$1D / LDX ram_003A
show('bank_26.asm', 3688);
// bank_31 L195: STA ram_0024 / LDA #$1D / STA ram_0025
show('bank_31.asm', 195);
