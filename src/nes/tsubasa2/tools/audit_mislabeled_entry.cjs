/**
 * 全库审计: 扫描 asm/ 全部 *.s 文件, 找出所有被 JSR/JMP/表引用但按注释地址搜不到定义的地址。
 *
 * 地址约定 (项目内已定案):
 *   - 代码/数据行 `; $XXXX` 注释为反汇编(物理)地址, 基址 $8000。
 *   - 反汇编器会把子程入口指令误标为 .byte/.word/.res 数据 (这些行没有 `; $XXXX` 注释)。
 *   - JSR/JMP 操作数 / 表内小端字:
 *       * $A000-$BFFF → 运行时窗口地址, 换算物理 = 地址 - 0x2000
 *       * $8000-$9FFF → 直接物理地址
 *
 * 判定"无定义": 被引用物理地址在本 bank 所有 `; $XXXX` 注释中找不到。
 * 强候选: 该物理地址落在一个 .byte/.word/.res 数据行所占据的字节区间内(该数据行由顺序推算获得地址)。
 *
 * 用法: node tools/audit_mislabeled_entry.cjs [输出文件]
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

function toPhys(ref) {
  if (ref >= 0xA000 && ref <= 0xBFFF) return ref - 0x2000;
  if (ref >= 0x8000 && ref <= 0x9FFF) return ref;
  return null;
}

/**
 * 顺序推算每个代码/数据行的起始地址。
 * 规则:
 *   - 有 `; $XXXX` 的行 → 起始地址即该注释值。
 *   - 无注释的数据行(.byte/.word/.res) → 承接上一行末尾, 并记录为数据块。
 *   - 无注释的助记符行 → 承接上一行末尾 (可能是误标外的未标注代码)。
 * 返回: { defined:Set, defLines:Map, dataBlocks:[] }  dataBlock 含 start/end。
 */
function collectBank(bank, files) {
  const defined = new Set();
  const defLines = new Map();
  const dataBlocks = [];
  const filePath = (f) => path.join(ASM_DIR, bank, f);

  for (const f of files) {
    const lines = fs.readFileSync(filePath(f), 'utf8').split(/\r?\n/);
    let cursor = null; // 上一个已知地址 + 其长度 → 当前行起始
    let prevEnd = null;

    for (let idx = 0; idx < lines.length; idx++) {
      const raw = lines[idx];
      const lineNo = idx + 1;
      const addrMatch = /;\s*\$([0-9A-Fa-f]{4})/.exec(raw);
      let start = null;
      if (addrMatch) start = parseInt(addrMatch[1], 16);

      // 数据行?
      const isByte = /\.byte\b/.test(raw);
      const isWord = /\.word\b/.test(raw);
      const isRes = /\.res\b/.test(raw);
      const isData = isByte || isWord || isRes;
      // 助记符行?
      const mnem = /^\s*([A-Za-z]{3})\s+(.+)$/.exec(raw) || /^\s*([A-Za-z]{3})\s*$/.exec(raw);
      const isInstr = mnem && /^(JSR|JMP|LDA|STA|LDX|STX|LDY|STY|ADC|SBC|AND|ORA|EOR|CMP|CPX|CPY|BIT|ASL|LSR|ROL|ROR|INC|DEC|TAX|TAY|TXA|TYA|DEX|DEY|INX|INY|PHA|PLA|PHP|PLP|RTS|RTI|BRK|NOP|CLC|CLD|CLI|CLV|SEC|SED|SEI|BCC|BCS|BEQ|BMI|BNE|BPL|BVC|BVS)$/.test(mnem[1].toUpperCase());

      let thisStart = null;
      if (start !== null) {
        thisStart = start;
        prevEnd = start;
      } else if (isData || isInstr) {
        // 无注释行 → 承接上一行
        if (prevEnd !== null) thisStart = prevEnd;
        // 不更新 prevEnd, 由下方的长度计算更新
      }

      // 计算长度并推进 prevEnd
      if (isInstr && thisStart !== null) {
        const m = mnem[1].toUpperCase();
        const operand = mnem[2] ? mnem[2].trim().replace(/;.*/, '') : '';
        const len = instrLen(m, operand);
        prevEnd = thisStart + len;
      } else if (isData && thisStart !== null) {
        let count = 0;
        if (isByte) {
          const rest = raw.replace(/\.byte\s+/, '').split(',').map((s) => s.trim()).filter(Boolean);
          count = rest.length;
        } else if (isWord) {
          const rest = raw.replace(/\.word\s+/, '').split(',').map((s) => s.trim()).filter(Boolean);
          count = rest.length * 2;
        } else if (isRes) {
          const rm = /\.res\s+(\d+)/.exec(raw);
          count = rm ? parseInt(rm[1], 10) : 0;
        }
        if (count > 0) {
          dataBlocks.push({ start: thisStart, end: thisStart + count, file: f, line: lineNo, text: raw.trim() });
          prevEnd = thisStart + count;
        }
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
      if (w) {
        const items = w[1].split(',').map((s) => s.trim());
        items.forEach((item, i) => {
          if (/^\$[0-9A-Fa-f]{4}$/.test(item)) {
            addRef(toPhys(parseInt(item.slice(1), 16)), 'word', f, lineNo, raw.trim(), `item[${i}]=${item}`);
          }
        });
      }

      if (/\.byte\s+/.test(raw)) {
        const bytes = raw.replace(/\.byte\s+/, '').split(',').map((s) => s.trim());
        for (let i = 0; i + 2 < bytes.length; i++) {
          if (/^\$20$/.test(bytes[i]) && /^\$[0-9A-Fa-f]{2}$/.test(bytes[i + 1]) && /^\$[0-9A-Fa-f]{2}$/.test(bytes[i + 2])) {
            const lo = parseInt(bytes[i + 1].slice(1), 16);
            const hi = parseInt(bytes[i + 2].slice(1), 16);
            const ref = (hi << 8) | lo;
            addRef(toPhys(ref), 'byte-jsr', f, lineNo, raw.trim(), `JSR $${ref.toString(16).padStart(4, '0')}`);
          }
        }
      }
    });
  }
  return refs;
}

let totalFiles = 0;
const report = [];
let strongCount = 0, midCount = 0, weakCount = 0;

for (const bank of banks) {
  const bankDir = path.join(ASM_DIR, bank);
  const files = fs.readdirSync(bankDir).filter((f) => f.endsWith('.s') && !SKIP_FILES.has(f));
  totalFiles += files.length;

  const { defined, defLines, dataBlocks } = collectBank(bank, files);
  const refs = collectReferences(bank, files);

  const suspect = [];
  for (const [phys, refList] of refs) {
    if (defined.has(phys)) continue;
    const inDataBlock = dataBlocks.find((b) => phys >= b.start && phys < b.end);
    // blockStart: 引用地址正好是某数据块起点 → 入口被误标的强信号
    const blockStart = dataBlocks.find((b) => phys === b.start);
    suspect.push({ phys, refList, inDataBlock, blockStart });
  }
  if (suspect.length === 0) continue;

  suspect.sort((a, b) => a.phys - b.phys);
  const block = [];
  for (const s of suspect) {
    const phys = s.phys;
    const inBlock = s.inDataBlock;
    const atStart = s.blockStart;
    if (atStart) strongCount++; else if (inBlock) midCount++; else weakCount++;
    const tag = atStart ? '★入口被误标' : (inBlock ? '数据块内部引用' : '跨bank/未定义');
    block.push(`  [${tag}] 物理 0x${phys.toString(16).toUpperCase()} (窗口 0x${(phys + 0x2000).toString(16).toUpperCase()})`);
    if (atStart) {
      block.push(`      ↳ 数据块起点: ${atStart.file}:${atStart.line}  0x${atStart.start.toString(16).toUpperCase()}-0x${(atStart.end - 1).toString(16).toUpperCase()}  ${atStart.text}`);
    } else if (inBlock) {
      block.push(`      ↳ 数据块内: ${inBlock.file}:${inBlock.line}  0x${inBlock.start.toString(16).toUpperCase()}-0x${(inBlock.end - 1).toString(16).toUpperCase()}  ${inBlock.text}`);
    } else {
      const near = findNearest(defined, defLines, phys);
      block.push(`      ↳ 最近定义: ${near ? `${near.file}:${near.line}  0x${near.addr.toString(16).toUpperCase()}  ${near.text}` : '(bank 内无定义)'}`);
    }
    for (const r of s.refList.slice(0, 5)) {
      block.push(`        <- [${r.kind}] ${r.file}:${r.line}  ${r.context}${r.context ? '  ' : ''}${r.raw}`);
    }
    if (s.refList.length > 5) block.push(`        ... 另有 ${s.refList.length - 5} 处引用`);
  }
  report.push(`=== ${bank} (定义 ${defined.size}, 未命中 ${suspect.length}: ★入口误标${suspect.filter((x) => x.blockStart).length} 数据块内${suspect.filter((x) => !x.blockStart && x.inDataBlock).length} 弱${suspect.filter((x) => !x.inDataBlock).length}) ===\n${block.join('\n')}`);
}

function findNearest(defined, defLines, phys) {
  let best = null;
  let bestDist = Infinity;
  for (const a of defined) {
    const d = Math.abs(a - phys);
    if (d < bestDist) { bestDist = d; best = defLines.get(a); }
  }
  return best;
}

const out = `扫描 ${banks.length} 个 bank, ${totalFiles} 个 .s 文件\n★ 入口被误标(引用=数据块起点): ${strongCount} 处\n数据块内部引用: ${midCount} 处\n弱候选(跨 bank/未定义): ${weakCount} 处\n====================================================\n${report.join('\n\n')}\n`;
const outFile = process.argv[2] ? path.resolve(process.argv[2]) : null;
if (outFile) {
  fs.writeFileSync(outFile, out, 'utf8');
  console.log('written to ' + outFile);
} else {
  process.stdout.write(out);
}
