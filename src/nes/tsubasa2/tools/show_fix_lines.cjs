/**
 * 显示指定 bank 的 ★CODE 候选对应的 .byte 行及其上下文, 供精确编辑。
 * 用法: node tools/show_fix_lines.cjs bank01
 */
const fs = require('fs');
const path = require('path');
const { instrLen } = require('./opcodes.js');

const bank = process.argv[2] || 'bank01';
const ASM_DIR = path.resolve(__dirname, '../asm');
const BANK_RE = /^bank(\d+)$/;
const files = fs.readdirSync(path.join(ASM_DIR, bank)).filter((f) => f.endsWith('.s') && f !== '_full.s');

function toPhys(ref) { if (ref >= 0xA000 && ref <= 0xBFFF) return ref - 0x2000; if (ref >= 0x8000 && ref <= 0x9FFF) return ref; return null; }

// collect
const defined = new Set();
const dataBlocks = [];
for (const f of files) {
  const lines = fs.readFileSync(path.join(ASM_DIR, bank, f), 'utf8').split(/\r?\n/);
  let prevEnd = null;
  for (let idx = 0; idx < lines.length; idx++) {
    const raw = lines[idx];
    const lineNo = idx + 1;
    const addrMatch = /;\s*\$([0-9A-Fa-f]{4})/.exec(raw);
    let start = null;
    if (addrMatch) start = parseInt(addrMatch[1], 16);
    const isByte = /\.byte\b/.test(raw), isWord = /\.word\b/.test(raw), isRes = /\.res\b/.test(raw);
    const isData = isByte || isWord || isRes;
    const mnem = /^\s*([A-Za-z]{3})\s+(.+)$/.exec(raw) || /^\s*([A-Za-z]{3})\s*$/.exec(raw);
    const isInstr = mnem && /^(JSR|JMP|LDA|STA|LDX|STX|LDY|STY|ADC|SBC|AND|ORA|EOR|CMP|CPX|CPY|BIT|ASL|LSR|ROL|ROR|INC|DEC|TAX|TAY|TXA|TYA|DEX|DEY|INX|INY|PHA|PLA|PHP|PLP|RTS|RTI|BRK|NOP|CLC|CLD|CLI|CLV|SEC|SED|SEI|BCC|BCS|BEQ|BMI|BNE|BPL|BVC|BVS)$/.test(mnem[1].toUpperCase());
    let thisStart = null;
    if (start !== null) { thisStart = start; prevEnd = start; }
    else if (isData || isInstr) { if (prevEnd !== null) thisStart = prevEnd; }
    if (isInstr && thisStart !== null) {
      const m = mnem[1].toUpperCase();
      const operand = mnem[2] ? mnem[2].trim().replace(/;.*/, '') : '';
      prevEnd = thisStart + instrLen(m, operand);
    } else if (isData && thisStart !== null) {
      let count = 0;
      if (isByte) count = raw.replace(/\.byte\s+/, '').split(',').filter(Boolean).length;
      else if (isWord) count = raw.replace(/\.word\s+/, '').split(',').filter(Boolean).length * 2;
      else { const rm = /\.res\s+(\d+)/.exec(raw); count = rm ? parseInt(rm[1], 10) : 0; }
      if (count > 0) dataBlocks.push({ start: thisStart, end: thisStart + count, file: f, line: lineNo, text: raw.trim() });
      prevEnd = thisStart + count;
    }
    if (start !== null) defined.add(start);
  }
}

// references
const refs = new Map();
for (const f of files) {
  const lines = fs.readFileSync(path.join(ASM_DIR, bank, f), 'utf8').split(/\r?\n/);
  lines.forEach((raw, idx) => {
    const lineNo = idx + 1;
    const upper = raw.toUpperCase();
    const mRef = /(JSR|JMP)\s+\$([0-9A-Fa-f]{4})/.exec(upper);
    if (mRef) {
      const phys = toPhys(parseInt(mRef[2], 16));
      if (phys === null) return;
      if (!refs.has(phys)) refs.set(phys, []);
      refs.get(phys).push(`${f}:${lineNo}  ${raw.trim()}`);
    }
  });
}

// candidates
const cands = [];
for (const [phys, rl] of refs) {
  if (defined.has(phys)) continue;
  const block = dataBlocks.find((b) => phys === b.start);
  if (block) cands.push({ phys, rl, block });
}
cands.sort((a, b) => a.phys - b.phys);

console.log('=== ' + bank + ' === 共 ' + cands.length + ' 处入口候选, 需人工确认归属后替换 ===\n');
for (const c of cands) {
  const win = (c.phys + 0x2000).toString(16).toUpperCase();
  console.log(`---- 物理 0x${c.phys.toString(16).toUpperCase()} (窗口 0x${win}) ----`);
  console.log(`  引用: ${c.rl[0]}${c.rl.length > 1 ? ' ...共' + c.rl.length + '处' : ''}`);
  // 显示该行 + 上下文
  const lines = fs.readFileSync(path.join(ASM_DIR, bank, c.block.file), 'utf8').split(/\r?\n/);
  const ln = c.block.line;
  for (let i = Math.max(0, ln - 3); i <= Math.min(lines.length, ln + 1); i++) {
    console.log(`  ${c.block.file}:${i + 1}: ${lines[i]}`);
  }
  console.log('');
}
