/**
 * 针对审计报告中的 ★入口被误标 候选, 解码其数据块前 12 字节, 辅助人工判定是否真为代码入口。
 * 复用 audit_mislabeled_entry.cjs 的解析逻辑。
 */
const fs = require('fs');
const path = require('path');
const { instrLen } = require('./opcodes.js');

const ASM_DIR = path.resolve(__dirname, '../asm');
const BANK_RE = /^bank(\d+)$/;
const SKIP_FILES = new Set(['_full.s']);
const banks = fs.readdirSync(ASM_DIR)
  .filter((d) => BANK_RE.test(d) && fs.statSync(path.join(ASM_DIR, d)).isDirectory())
  .sort((a, b) => parseInt(BANK_RE.exec(a)[1], 10) - parseInt(BANK_RE.exec(b)[1], 10));

function toPhys(ref) { if (ref >= 0xA000 && ref <= 0xBFFF) return ref - 0x2000; if (ref >= 0x8000 && ref <= 0x9FFF) return ref; return null; }

function collectBank(bank, files) {
  const defined = new Set();
  const defLines = new Map();
  const dataBlocks = [];
  const filePath = (f) => path.join(ASM_DIR, bank, f);
  for (const f of files) {
    const lines = fs.readFileSync(filePath(f), 'utf8').split(/\r?\n/);
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
      if (thisStart !== null && start !== null) {
        if (!defLines.has(start)) defLines.set(start, { file: f, line: lineNo, text: raw.trim(), addr: start });
        defined.add(start);
      }
    }
  }
  return { defined, defLines, dataBlocks };
}

function collectReferences(bank, files) {
  const refs = new Map();
  const filePath = (f) => path.join(ASM_DIR, bank, f);
  const addRef = (phys, kind, file, line, raw, context) => {
    if (phys === null) return;
    if (!refs.has(phys)) refs.set(phys, []);
    refs.get(phys).push({ kind, file, line, raw, context });
  };
  for (const f of files) {
    const lines = fs.readFileSync(filePath(f), 'utf8').split(/\r?\n/);
    lines.forEach((raw, idx) => {
      const lineNo = idx + 1;
      const upper = raw.toUpperCase();
      const mRef = /(JSR|JMP)\s+\$([0-9A-Fa-f]{4})/.exec(upper);
      if (mRef) addRef(toPhys(parseInt(mRef[2], 16)), 'jsr/jmp', f, lineNo, raw.trim(), '');
      const w = /\.word\s+(.+)$/.exec(raw);
      if (w) w[1].split(',').forEach((item, i) => { if (/^\$[0-9A-Fa-f]{4}$/.test(item.trim())) addRef(toPhys(parseInt(item.trim().slice(1), 16)), 'word', f, lineNo, raw.trim(), `item[${i}]=${item.trim()}`); });
      if (/\.byte\s+/.test(raw)) {
        const bytes = raw.replace(/\.byte\s+/, '').split(',').map((s) => s.trim());
        for (let i = 0; i + 2 < bytes.length; i++) {
          if (/^\$20$/.test(bytes[i]) && /^\$[0-9A-Fa-f]{2}$/.test(bytes[i + 1]) && /^\$[0-9A-Fa-f]{2}$/.test(bytes[i + 2])) {
            const ref = (parseInt(bytes[i + 2].slice(1), 16) << 8) | parseInt(bytes[i + 1].slice(1), 16);
            addRef(toPhys(ref), 'byte-jsr', f, lineNo, raw.trim(), `JSR $${ref.toString(16).padStart(4, '0')}`);
          }
        }
      }
    });
  }
  return refs;
}

const out = [];
let total = 0;
for (const bank of banks) {
  const bankDir = path.join(ASM_DIR, bank);
  const files = fs.readdirSync(bankDir).filter((f) => f.endsWith('.s') && !SKIP_FILES.has(f));
  const { defined, dataBlocks } = collectBank(bank, files);
  const refs = collectReferences(bank, files);
  const candidates = [];
  for (const [phys, refList] of refs) {
    if (defined.has(phys)) continue;
    const atStart = dataBlocks.find((b) => phys === b.start);
    if (atStart) candidates.push({ phys, refList, block: atStart });
  }
  if (candidates.length === 0) continue;
  candidates.sort((a, b) => a.phys - b.phys);
  out.push(`=== ${bank} (${candidates.length} 处 ★入口候选) ===`);
  for (const c of candidates) {
    total++;
    const blockBytes = parseBytes(c.block.text);
    const firstRef = c.refList[0];
    // 分类: 解码前若干字节, 若出现多个未知/非法字节或大量 $FF → DATA, 否则 CODE
    const verdict = classify(blockBytes);
    const tag = verdict === 'CODE' ? '✔代码入口' : '✘数据表/填充';
    out.push(`  [★${tag}] 物理 0x${c.phys.toString(16).toUpperCase()} (窗口 0x${(c.phys + 0x2000).toString(16).toUpperCase()})`);
    out.push(`      数据块: ${c.block.file}:${c.block.line}  0x${c.block.start.toString(16).toUpperCase()}-0x${(c.block.end - 1).toString(16).toUpperCase()}  字节数 ${c.block.end - c.block.start}`);
    out.push(`      引用: ${firstRef.file}:${firstRef.line}  ${firstRef.raw}${firstRef.context ? '  (' + firstRef.context + ')' : ''}${c.refList.length > 1 ? ' ...共' + c.refList.length + '处' : ''}`);
    if (blockBytes.length > 0) {
      out.push(`      前 12 字节: ${blockBytes.slice(0, 12).map((b) => '$' + b.toString(16).padStart(2, '0')).join(',')}`);
      out.push(`      ${decode(blockBytes.slice(0, 12), c.phys).join(' | ')}`);
    } else {
      out.push('       (无法解析块字节)');
    }
  }
}

/** 分类: 统计解码非法字节比例。$FF 填充 / 非法多 → DATA; 否则 CODE。 */
function classify(bytes) {
  if (bytes.length === 0) return 'DATA';
  const sample = bytes.slice(0, 16);
  let ff = 0, invalid = 0;
  for (let i = 0; i < sample.length; i++) {
    if (sample[i] === 0xFF) ff++;
    // 非法操作码 (不在解码表中且不是常见数据)
    if (sample[i] === 0x00) invalid++; // BRK 在代码中罕见
  }
  // 全 FF = 填充; 高比例 FF = 数据
  if (ff === sample.length) return 'DATA';
  if (ff / sample.length > 0.5) return 'DATA';
  // 解码看是否有连续非法
  const T = buildDecodeTable();
  let i = 0;
  let bad = 0;
  while (i < sample.length) {
    const e = T[sample[i]];
    if (!e) { bad++; i++; continue; }
    const len = e[0];
    if (i + len > sample.length) break;
    i += len;
  }
  if (bad > 1) return 'DATA';
  return 'CODE';
}

function buildDecodeTable() {
  const T = {};
  const o = [
    [0xA9, 2], [0xA2, 2], [0xA0, 2], [0x20, 3], [0x4C, 3], [0x6C, 3],
    [0x85, 2], [0x86, 2], [0x84, 2], [0x8D, 3], [0x8E, 3], [0x8C, 3],
    [0xA5, 2], [0xA6, 2], [0xA4, 2], [0xAD, 3], [0xAE, 3], [0xAC, 3],
    [0xB5, 2], [0xB6, 2], [0xB4, 2], [0xBD, 3], [0xBE, 3], [0xBC, 3],
    [0xB9, 3], [0xB1, 2], [0xA1, 2], [0xB2, 2], [0x91, 2], [0x81, 2], [0x99, 3], [0x9D, 3],
    [0x48, 1], [0x68, 1], [0x08, 1], [0x28, 1], [0xAA, 1], [0x8A, 1], [0xA8, 1], [0x98, 1], [0xBA, 1], [0x9A, 1], [0xE8, 1], [0xC8, 1], [0xCA, 1], [0x88, 1], [0x60, 1], [0x40, 1], [0x00, 1], [0xEA, 1],
    [0x18, 1], [0x38, 1], [0x58, 1], [0x78, 1], [0xD8, 1], [0xF8, 1], [0xB8, 1],
    [0xD0, 2], [0xF0, 2], [0x90, 2], [0xB0, 2], [0x30, 2], [0x10, 2], [0x50, 2], [0x70, 2],
    [0x65, 2], [0x6D, 3], [0x75, 2], [0x7D, 3], [0x79, 3], [0x61, 2], [0x71, 2], [0x69, 2],
    [0xE5, 2], [0xED, 3], [0xF5, 2], [0xFD, 3], [0xF9, 3], [0xE1, 2], [0xF1, 2], [0xE9, 2],
    [0x25, 2], [0x2D, 3], [0x35, 2], [0x3D, 3], [0x39, 3], [0x21, 2], [0x31, 2], [0x29, 2],
    [0x05, 2], [0x0D, 3], [0x15, 2], [0x1D, 3], [0x19, 3], [0x01, 2], [0x11, 2], [0x09, 2],
    [0x45, 2], [0x4D, 3], [0x55, 2], [0x5D, 3], [0x59, 3], [0x41, 2], [0x51, 2], [0x49, 2],
    [0xC5, 2], [0xCD, 3], [0xD5, 2], [0xDD, 3], [0xD9, 3], [0xC1, 2], [0xD1, 2], [0xC9, 2],
    [0xE0, 2], [0xE4, 2], [0xEC, 3], [0xC0, 2], [0xC4, 2], [0xCC, 3],
    [0x24, 2], [0x2C, 3],
    [0x0A, 1], [0x06, 2], [0x0E, 3], [0x16, 2], [0x1E, 3],
    [0x4A, 1], [0x46, 2], [0x4E, 3], [0x56, 2], [0x5E, 3],
    [0x2A, 1], [0x26, 2], [0x2E, 3], [0x36, 2], [0x3E, 3],
    [0x6A, 1], [0x66, 2], [0x6E, 3], [0x76, 2], [0x7E, 3],
    [0xC6, 2], [0xCE, 3], [0xD6, 2], [0xDE, 3],
    [0xE6, 2], [0xEE, 3], [0xF6, 2], [0xFE, 3],
  ];
  for (const [c, len] of o) T[c] = [len];
  return T;
}

function parseBytes(text) {
  const m = /\.(byte|word)\s+(.+)$/.exec(text);
  if (!m) return [];
  const items = m[2].split(',').map((s) => s.trim()).filter(Boolean);
  const bytes = [];
  for (const it of items) {
    if (/^\$[0-9A-Fa-f]{2}$/.test(it)) bytes.push(parseInt(it.slice(1), 16));
  }
  return bytes;
}

function decode(bytes, pc) {
  const T = {};
  const o = [
    [0xA9, 2, 'LDA #$xx'], [0xA2, 2, 'LDX #$xx'], [0xA0, 2, 'LDY #$xx'],
    [0x20, 3, 'JSR $xxxx'], [0x4C, 3, 'JMP $xxxx'], [0x6C, 3, 'JMP ($xxxx)'],
    [0x85, 2, 'STA $xx'], [0x86, 2, 'STX $xx'], [0x84, 2, 'STY $xx'], [0x8D, 3, 'STA $xxxx'], [0x8E, 3, 'STX $xxxx'], [0x8C, 3, 'STY $xxxx'],
    [0xA5, 2, 'LDA $xx'], [0xA6, 2, 'LDX $xx'], [0xA4, 2, 'LDY $xx'], [0xAD, 3, 'LDA $xxxx'], [0xAE, 3, 'LDX $xxxx'], [0xAC, 3, 'LDY $xxxx'],
    [0xB5, 2, 'LDA $xx,X'], [0xB6, 2, 'LDX $xx,Y'], [0xB4, 2, 'LDY $xx,X'], [0xBD, 3, 'LDA $xxxx,X'], [0xBE, 3, 'LDX $xxxx,Y'], [0xBC, 3, 'LDY $xxxx,X'],
    [0xB9, 3, 'LDA $xxxx,Y'], [0xB1, 2, 'LDA ($xx),Y'], [0xA1, 2, 'LDA ($xx,X)'], [0xB2, 2, 'LDA ($xx)'], [0x91, 2, 'STA ($xx),Y'], [0x81, 2, 'STA ($xx,X)'], [0x99, 3, 'STA $xxxx,Y'], [0x9D, 3, 'STA $xxxx,X'],
    [0x48, 1, 'PHA'], [0x68, 1, 'PLA'], [0x08, 1, 'PHP'], [0x28, 1, 'PLP'], [0xAA, 1, 'TAX'], [0x8A, 1, 'TXA'], [0xA8, 1, 'TAY'], [0x98, 1, 'TYA'], [0xBA, 1, 'TSX'], [0x9A, 1, 'TXS'], [0xE8, 1, 'INX'], [0xC8, 1, 'INY'], [0xCA, 1, 'DEX'], [0x88, 1, 'DEY'], [0x60, 1, 'RTS'], [0x40, 1, 'RTI'], [0x00, 1, 'BRK'], [0xEA, 1, 'NOP'],
    [0x18, 1, 'CLC'], [0x38, 1, 'SEC'], [0x58, 1, 'CLI'], [0x78, 1, 'SEI'], [0xD8, 1, 'CLD'], [0xF8, 1, 'SED'], [0xB8, 1, 'CLV'],
    [0xD0, 2, 'BNE'], [0xF0, 2, 'BEQ'], [0x90, 2, 'BCC'], [0xB0, 2, 'BCS'], [0x30, 2, 'BMI'], [0x10, 2, 'BPL'], [0x50, 2, 'BVC'], [0x70, 2, 'BVS'],
    [0x65, 2, 'ADC $xx'], [0x6D, 3, 'ADC $xxxx'], [0x75, 2, 'ADC $xx,X'], [0x7D, 3, 'ADC $xxxx,X'], [0x79, 3, 'ADC $xxxx,Y'], [0x61, 2, 'ADC ($xx,X)'], [0x71, 2, 'ADC ($xx),Y'], [0x69, 2, 'ADC #$xx'],
    [0xE5, 2, 'SBC $xx'], [0xED, 3, 'SBC $xxxx'], [0xF5, 2, 'SBC $xx,X'], [0xFD, 3, 'SBC $xxxx,X'], [0xF9, 3, 'SBC $xxxx,Y'], [0xE1, 2, 'SBC ($xx,X)'], [0xF1, 2, 'SBC ($xx),Y'], [0xE9, 2, 'SBC #$xx'],
    [0x25, 2, 'AND $xx'], [0x2D, 3, 'AND $xxxx'], [0x35, 2, 'AND $xx,X'], [0x3D, 3, 'AND $xxxx,X'], [0x39, 3, 'AND $xxxx,Y'], [0x21, 2, 'AND ($xx,X)'], [0x31, 2, 'AND ($xx),Y'], [0x29, 2, 'AND #$xx'],
    [0x05, 2, 'ORA $xx'], [0x0D, 3, 'ORA $xxxx'], [0x15, 2, 'ORA $xx,X'], [0x1D, 3, 'ORA $xxxx,X'], [0x19, 3, 'ORA $xxxx,Y'], [0x01, 2, 'ORA ($xx,X)'], [0x11, 2, 'ORA ($xx),Y'], [0x09, 2, 'ORA #$xx'],
    [0x45, 2, 'EOR $xx'], [0x4D, 3, 'EOR $xxxx'], [0x55, 2, 'EOR $xx,X'], [0x5D, 3, 'EOR $xxxx,X'], [0x59, 3, 'EOR $xxxx,Y'], [0x41, 2, 'EOR ($xx,X)'], [0x51, 2, 'EOR ($xx),Y'], [0x49, 2, 'EOR #$xx'],
    [0xC5, 2, 'CMP $xx'], [0xCD, 3, 'CMP $xxxx'], [0xD5, 2, 'CMP $xx,X'], [0xDD, 3, 'CMP $xxxx,X'], [0xD9, 3, 'CMP $xxxx,Y'], [0xC1, 2, 'CMP ($xx,X)'], [0xD1, 2, 'CMP ($xx),Y'], [0xC9, 2, 'CMP #$xx'],
    [0xE0, 2, 'CPX #$xx'], [0xE4, 2, 'CPX $xx'], [0xEC, 3, 'CPX $xxxx'], [0xC0, 2, 'CPY #$xx'], [0xC4, 2, 'CPY $xx'], [0xCC, 3, 'CPY $xxxx'],
    [0x24, 2, 'BIT $xx'], [0x2C, 3, 'BIT $xxxx'],
    [0x0A, 1, 'ASL A'], [0x06, 2, 'ASL $xx'], [0x0E, 3, 'ASL $xxxx'], [0x16, 2, 'ASL $xx,X'], [0x1E, 3, 'ASL $xxxx,X'],
    [0x4A, 1, 'LSR A'], [0x46, 2, 'LSR $xx'], [0x4E, 3, 'LSR $xxxx'], [0x56, 2, 'LSR $xx,X'], [0x5E, 3, 'LSR $xxxx,X'],
    [0x2A, 1, 'ROL A'], [0x26, 2, 'ROL $xx'], [0x2E, 3, 'ROL $xxxx'], [0x36, 2, 'ROL $xx,X'], [0x3E, 3, 'ROL $xxxx,X'],
    [0x6A, 1, 'ROR A'], [0x66, 2, 'ROR $xx'], [0x6E, 3, 'ROR $xxxx'], [0x76, 2, 'ROR $xx,X'], [0x7E, 3, 'ROR $xxxx,X'],
    [0xC6, 2, 'DEC $xx'], [0xCE, 3, 'DEC $xxxx'], [0xD6, 2, 'DEC $xx,X'], [0xDE, 3, 'DEC $xxxx,X'],
    [0xE6, 2, 'INC $xx'], [0xEE, 3, 'INC $xxxx'], [0xF6, 2, 'INC $xx,X'], [0xFE, 3, 'INC $xxxx,X'],
  ];
  for (const [c, len, m] of o) T[c] = [len, m];
  const res = [];
  let i = 0, p = pc;
  while (i < bytes.length) {
    const e = T[bytes[i]];
    if (!e) { res.push('??'); break; }
    const [len, m] = e;
    if (i + len > bytes.length) break;
    let disp = m;
    if (len === 2 && /#\$xx$/.test(m)) disp = m.split(' ')[0] + ' #$' + bytes[i + 1].toString(16).padStart(2, '0');
    else if (len === 2 && /\$xx/.test(m) && !/#/.test(m)) disp = m.replace('$xx', '$' + bytes[i + 1].toString(16).padStart(2, '0'));
    else if (len === 3) disp = m.replace('$xxxx', '$' + ((bytes[i + 2] << 8) | bytes[i + 1]).toString(16).padStart(4, '0'));
    else if (len === 2 && /^(BNE|BEQ|BCC|BCS|BMI|BPL|BVC|BVS)$/.test(m)) { const off = (bytes[i + 1] < 128 ? bytes[i + 1] : bytes[i + 1] - 256); disp = m + ' $' + ((p + 2 + off) & 0xFFFF).toString(16).toUpperCase(); }
    res.push(disp);
    p += len; i += len;
  }
  return res;
}

const report = out.join('\n');
const outFile = process.argv[2] ? path.resolve(process.argv[2]) : null;
const head = `共 ${total} 处 ★入口候选 (引用=数据块起点), 需人工核对归属\n`;
if (outFile) { fs.writeFileSync(outFile, head + report + '\n', 'utf8'); console.log('written to ' + outFile); }
else process.stdout.write(head + report + '\n');
