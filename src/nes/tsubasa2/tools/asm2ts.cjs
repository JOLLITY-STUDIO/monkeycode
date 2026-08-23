// asm2ts.cjs - 6502 反汇编 .s -> TS 直译 (调用 cpu.execOpcode), 去掉 fetch-decode
// 用法: node tools/asm2ts.cjs <asm/相对路径 或 空=bank00/code_main.s> [--out 输出路径]
// 关键: 反汇编器模式标注不可靠 (a: 前缀/ZPY 标错), 一律用"下一指令地址-当前地址"反推 size 定模式
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

// ============================================================
// 1. 从 src/core/cpu.ts 提取 OPCODE_TABLE (mnemonic+mode -> opcode)
// ============================================================
function extractOpcodeTable() {
  const src = fs.readFileSync(path.join(ROOT, 'src', 'core', 'cpu.ts'), 'utf8');
  const opcodes = {};
  for (const m of src.matchAll(
    /0x([0-9a-f]{2}): \{ ins: INS_(\w+), mode: ADDR_(\w+), +size: (\d+), cycles: (\d+) \},/g
  )) {
    opcodes[m[1].toUpperCase()] = { ins: m[2], mode: m[3], size: +m[4], cycles: +m[5] };
  }
  return opcodes;
}
const OPCODES = extractOpcodeTable();

// mnemonic+mode -> {op,size,cycles}
function resolveOpcode(mnemonic, mode) {
  for (const [hex, info] of Object.entries(OPCODES)) {
    if (info.ins === mnemonic && info.mode === mode) {
      return { op: parseInt(hex, 16), size: info.size, cycles: info.cycles };
    }
  }
  return null;
}

const MODE_SIZE = {
  IMP: 1, ACC: 1, IMM: 2, ZP: 2, ZPX: 2, ZPY: 2,
  REL: 2, ABS: 3, ABSX: 3, ABSY: 3,
  PREIDXIND: 2, POSTIDXIND: 2, INDABS: 3,
};

// ============================================================
// 2. 行解析
// ============================================================
const BRANCH_MN = new Set(['BCC', 'BCS', 'BEQ', 'BMI', 'BNE', 'BPL', 'BVC', 'BVS']);

function parseLine(raw) {
  const line = raw.trimEnd();
  let addr = null;
  const am = line.match(/;\s*\$([0-9A-Fa-f]{4})\s*$/);
  if (am) addr = parseInt(am[1], 16);
  const body = line.replace(/;.*$/, '').trim();
  if (!body) return { type: 'comment', addr };

  const bm = body.match(/^\.byte\s+(.+)$/i);
  if (bm) {
    const bytes = bm[1].split(',').map((s) => parseInt(s.trim().replace(/^\$/, ''), 16)).filter((n) => Number.isFinite(n));
    return { type: 'data', bytes, addr };
  }
  const wm = body.match(/^\.word\s+(.+)$/i);
  if (wm) {
    const bytes = [];
    for (const s of wm[1].split(',')) {
      const v = parseInt(s.trim().replace(/^\$/, ''), 16);
      if (Number.isFinite(v)) bytes.push(v & 0xff, (v >> 8) & 0xff);
    }
    return { type: 'data', bytes, addr };
  }
  const im = body.match(/^([A-Z]{2,3})\s*(.*)$/);
  if (im) return { type: 'instr', mnemonic: im[1], operand: im[2].trim(), addr };
  return { type: 'comment', addr };
}

// 操作数语法解析: 返回结构化描述 (不依赖 size)
function parseOperand(mnemonic, operand) {
  if (!operand) {
    if (['ASL', 'LSR', 'ROL', 'ROR'].includes(mnemonic)) return { kind: 'acc' };
    return { kind: 'imp' };
  }
  if (BRANCH_MN.has(mnemonic)) return { kind: 'rel', target: parseInt(operand.replace(/^\$/, ''), 16) };
  if (operand.startsWith('#')) return { kind: 'imm', byte: parseInt(operand.slice(1).replace(/^\$/, ''), 16) };
  if (operand === 'A') return { kind: 'acc' };

  let m = operand.match(/^\(\$([0-9A-Fa-f]{2,4})\)\s*,\s*Y$/);
  if (m) return { kind: 'post', byte: parseInt(m[1], 16) };
  m = operand.match(/^\(\$([0-9A-Fa-f]{2,4})\s*,\s*X\)$/);
  if (m) return { kind: 'pre', byte: parseInt(m[1], 16) };
  m = operand.match(/^\(\$([0-9A-Fa-f]{4})\)$/);
  if (m) return { kind: 'ind', word: parseInt(m[1], 16) };

  let absPrefix = false;
  let rest = operand;
  m = operand.match(/^(a|z|zp)?\s*:\s*(.+)$/i);
  if (m) {
    if (m[1] && m[1].toLowerCase() === 'a') absPrefix = true;
    rest = m[2].trim();
  }

  m = rest.match(/^\$([0-9A-Fa-f]{2,4})$/);
  if (m) return { kind: 'mem', val: parseInt(m[1], 16), absPrefix, idx: null };
  m = rest.match(/^\$([0-9A-Fa-f]{2,4})\s*,\s*(X|Y)$/);
  if (m) return { kind: 'mem', val: parseInt(m[1], 16), absPrefix, idx: m[2] };

  return null;
}

// 由 语法+size 定最终模式
function modeFrom(parsed, size, mnemonic) {
  switch (parsed.kind) {
    case 'imp': return 'IMP';
    case 'acc': return 'ACC';
    case 'rel': return 'REL';
    case 'imm': return 'IMM';
    case 'pre': return 'PREIDXIND';
    case 'post': return 'POSTIDXIND';
    case 'ind': return 'INDABS';
    case 'mem': {
      // 反汇编器标注不可靠: val>=0x100 必为 ABS 系; size=3 也视为 ABS 系 (a: 前缀/标错)
      const isAbs = parsed.absPrefix || parsed.val >= 0x100 || size === 3;
      if (parsed.idx === 'X') return isAbs ? 'ABSX' : 'ZPX';
      if (parsed.idx === 'Y') return isAbs ? 'ABSY' : 'ZPY';
      return isAbs ? 'ABS' : 'ZP';
    }
    default: return null;
  }
}

function bytesFrom(parsed, mode, addr) {
  switch (mode) {
    case 'IMP': case 'ACC': return [];
    case 'IMM': return [parsed.byte];
    case 'REL': return [(parsed.target - (addr + 2)) & 0xff];
    case 'PREIDXIND': case 'POSTIDXIND': return [parsed.byte];
    case 'INDABS': return [parsed.word & 0xff, (parsed.word >> 8) & 0xff];
    case 'ZP': case 'ZPX': case 'ZPY': return [parsed.val & 0xff];
    case 'ABS': case 'ABSX': case 'ABSY': return [parsed.val & 0xff, (parsed.val >> 8) & 0xff];
    default: return [];
  }
}

// .byte 行指令解码尝试: 第一版一律按数据导出 (反汇编器已尽力解码指令行,
// .byte 块是数据表/指针表; 疑似代码的 .byte 块后续按消费方地址反查再转换)
function tryDecodeBytes(bytes) {
  return null;
}

// ============================================================
// 3. 整文件解析: 两遍 (先地址, 后 size 反推模式)
// ============================================================
function parseAsm(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/);
  const items = [];
  const hm = text.match(/\(\$([0-9A-Fa-f]{4})/);
  const startAddr = hm ? parseInt(hm[1], 16) : 0x8000;
  let cursor = null;

  // pass1: 地址锚定
  for (const ln of lines) {
    const parsed = parseLine(ln);
    if (parsed.type === 'comment') continue;
    let addr = parsed.addr ?? cursor ?? startAddr;
    if (parsed.type === 'data') {
      const decoded = tryDecodeBytes(parsed.bytes);
      if (decoded) {
        for (const d of decoded) {
          items.push({ addr, type: 'instr', mnemonic: d.mnemonic, op: d.op, size: d.size, mode: d.mode, operand: null });
          addr += d.size;
        }
        cursor = addr;
      } else {
        items.push({ addr, type: 'data', bytes: parsed.bytes });
        cursor = addr + parsed.bytes.length;
      }
      continue;
    }
    const po = parseOperand(parsed.mnemonic, parsed.operand);
    const estSize = po ? MODE_SIZE[modeFrom(po, 2, parsed.mnemonic)] ?? 2 : 1;
    items.push({ addr, type: 'instr', mnemonic: parsed.mnemonic, operand: parsed.operand, po });
    cursor = addr + estSize;
  }

  // pass2: 按下一地址反推 size -> 定模式 -> 定 opcode
  const instrs = [];
  const dataBlocks = [];
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    if (it.type === 'data') {
      dataBlocks.push({ addr: it.addr, bytes: it.bytes });
      continue;
    }
    const next = items[i + 1];
    let size = it.size; // 解码 .byte 已定; 指令行需重推
    if (it.operand !== null && next && next.addr > it.addr) {
      const gap = next.addr - it.addr;
      if (gap >= 1 && gap <= 3) size = gap;
    }
    let mode = null;
    if (it.po) {
      mode = modeFrom(it.po, size, it.mnemonic);
    } else if (it.operand === null) {
      // .byte 解码行
      mode = it.mode;
    }
    if (!mode) {
      console.warn(`[asm2ts] 无法判定模式 ${it.mnemonic} ${it.operand} @ $${it.addr.toString(16)}`);
      continue;
    }
    let opInfo = resolveOpcode(it.mnemonic, mode);
    if (!opInfo) {
      console.warn(`[asm2ts] 未知指令 ${it.mnemonic} ${mode} @ $${it.addr.toString(16)}`);
      continue;
    }
    const bytes = it.operand !== null ? bytesFrom(it.po, mode, it.addr) : [];
    const isAbs = mode === 'ABS' || mode === 'ABSX' || mode === 'ABSY';
    // target 仅控制流指令 (JSR/JMP/Bxx) 才有; 普通 mem 指令 (LDA/STA...) 的地址是数据访问, 不是跳转目标
    const isCtl = it.mnemonic === 'JSR' || it.mnemonic === 'JMP' || BRANCH_MN.has(it.mnemonic);
    instrs.push({
      addr: it.addr,
      mnemonic: it.mnemonic,
      op: it.op ?? opInfo.op,
      bytes,
      size: opInfo.size,
      mode,
      target: isCtl && it.po && it.po.kind === 'rel'
        ? it.po.target
        : isCtl && it.po && it.po.kind === 'mem' && isAbs
          ? it.po.val
          : null,
    });
  }
  return { instrs, dataBlocks };
}

// ============================================================
// 4. 生成 TS
// ============================================================
function generateTs(asm, className, srcPath) {
  const { instrs, dataBlocks } = asm;
  const segStarts = new Set();
  if (instrs[0]) segStarts.add(instrs[0].addr);
  for (const ins of instrs) {
    if (ins.target !== null && ins.mnemonic !== 'JSR') segStarts.add(ins.target);
  }
  const segList = [...segStarts].sort((a, b) => a - b);
  const segOf = {};
  let owner = segList[0];
  for (const ins of instrs) {
    for (const s of segList) {
      if (s <= ins.addr) owner = s;
      else break;
    }
    (segOf[owner] = segOf[owner] || []).push(ins);
  }

  const jsrTargets = new Set(instrs.filter((i) => i.mnemonic === 'JSR' && i.target !== null).map((i) => i.target));
  const segName = (a) => `_seg_${a.toString(16).toUpperCase()}`;

  let out = '';
  out += `// ============================================================\n`;
  out += `// 生成自: ${srcPath}\n`;
  out += `// TS 直译 (6502 -> cpu.execOpcode), 生成器: tools/asm2ts.cjs (勿手改)\n`;
  out += `// ============================================================\n`;
  out += `import type { Cpu } from '../../../../core/cpu';\n\n`;
  out += `export class ${className} {\n`;
  out += `  constructor(public cpu: Cpu) {}\n\n`;

  for (const d of dataBlocks) {
    out += `  /** 数据 @$${d.addr.toString(16).toUpperCase()} */\n`;
    out += `  readonly DATA_${d.addr.toString(16).toUpperCase()} = [${d.bytes
      .map((b) => '0x' + b.toString(16).padStart(2, '0'))
      .join(', ')}];\n\n`;
  }

  const seenSeg = new Set();
  const emitSeg = (addr, isStub) => {
    if (seenSeg.has(addr)) return;
    seenSeg.add(addr);
    const name = segName(addr);
    const body = segOf[addr] || [];
    if (!body.length || isStub) {
      out += `  /** @$${addr.toString(16).toUpperCase()} (stub) */\n`;
      out += `  ${name}(): void { /* TODO */ }\n\n`;
      return;
    }
    out += `  /** @$${addr.toString(16).toUpperCase()} */\n`;
    out += `  ${name}(): void {\n`;
    for (const ins of body) {
      const hexA = ins.addr.toString(16).toUpperCase();
      const ops = ins.bytes.map((b) => '0x' + b.toString(16).padStart(2, '0')).join(', ');
      const opHex = '0x' + ins.op.toString(16).padStart(2, '0');
      const cmt = ins.target !== null ? `${ins.mnemonic} $${ins.target.toString(16).toUpperCase()}` : ins.mnemonic;
      out += `    // ${cmt} @$${hexA}\n`;
      if (ins.mnemonic === 'RTS' || ins.mnemonic === 'RTI') {
        out += `    return;\n`;
      } else if (ins.mnemonic === 'JSR') {
        if (ins.target !== null) out += `    this.${segName(ins.target)}();\n`;
        else out += `    // TODO: JSR 目标解析失败 @$${hexA}\n`;
      } else if (ins.mnemonic === 'JMP') {
        if (ins.target !== null) out += `    return this.${segName(ins.target)}();\n`;
        else out += `    // TODO: JMP 目标解析失败 @$${hexA}\n`;
      } else if (BRANCH_MN.has(ins.mnemonic)) {
        const next = (ins.addr + ins.size - 1) & 0xffff;
        out += `    this.cpu.execOpcode(${opHex}, [${ops}], 0x${hexA});\n`;
        if (ins.target !== null) out += `    if (this.cpu.REG_PC !== 0x${next.toString(16).toUpperCase()}) { return this.${segName(ins.target)}(); }\n`;
        else out += `    // TODO: 分支目标解析失败\n`;
      } else if (ins.mnemonic === 'BRK') {
        out += `    this.cpu.execOpcode(${opHex}, [], 0x${hexA}); // BRK\n`;
        out += `    return;\n`;
      } else {
        out += `    this.cpu.execOpcode(${opHex}, [${ops}], 0x${hexA});\n`;
      }
    }
    out += `  }\n\n`;
  };

  for (const s of segList) emitSeg(s, false);
  for (const t of jsrTargets) {
    if (!segList.includes(t)) emitSeg(t, true);
  }
  out += `}\n`;
  return out;
}

// ============================================================
// main
// ============================================================
function main() {
  const args = process.argv.slice(2);
  let asmRel = 'asm/bank00/code_main.s';
  let outRel = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--out') outRel = args[++i];
    else asmRel = args[i];
  }
  const asmPath = path.join(ROOT, asmRel);
  const asm = parseAsm(asmPath);
  const base = path.basename(asmRel, path.extname(asmRel));
  const className = 'Gen' + base.split(/[^A-Za-z0-9]/).map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('');
  const ts = generateTs(asm, className, asmRel);
  const outPath = outRel ? path.join(ROOT, outRel) : path.join(ROOT, '_tmp_asm_out', base + '.ts');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, ts);
  console.log(`[asm2ts] ${asmRel} -> ${path.relative(ROOT, outPath)}`);
  console.log(`[asm2ts] 指令 ${asm.instrs.length} 条, 数据块 ${asm.dataBlocks.length} 个`);
}

if (require.main === module) main();
module.exports = { parseAsm, generateTs, parseLine, parseOperand, modeFrom };
