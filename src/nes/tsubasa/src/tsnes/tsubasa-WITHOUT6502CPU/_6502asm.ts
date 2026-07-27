/**
 * ============================================================================
 * _6502asm.ts — 6502 内联汇编器 (tagged template literal)
 *
 * 用法:
 *   import { asm } from '../_6502asm';
 *
 *   function buildMyCode(): readonly number[] {
 *     return asm`
 *       LDA $27          ; 零页
 *       ASL A
 *       TAX
 *       LDA $800E,X      ; 绝对变址
 *       PHA
 *       .byte $00, $FF   ; 原始数据
 *       BEQ @skip        ; 条件分支 → 标签
 *       LDA #$80         ; 立即数
 *     @skip:
 *       RTS
 *     `;
 *   }
 *
 * 支持所有官方 NMOS 6502 指令 + 所有寻址模式。
 * 标签 @name: 用于分支目标，BEQ/BNE 等自动计算相对偏移。
 * .byte 用于原始数据, .dw 用于小端 word。
 * ============================================================================
 */

// ════════════════════════════════════════════════════════════
// 6502 操作码表: { 助记符: { 寻址模式: opcode } }
// ════════════════════════════════════════════════════════════

// prettier-ignore
const OPS: Record<string, Record<string, number>> = {
  // ── 加载 ──
  LDA: { imm:0xA9, zp:0xA5, 'zp,X':0xB5, abs:0xAD, 'abs,X':0xBD, 'abs,Y':0xB9, 'ind,X':0xA1, 'ind,Y':0xB1 },
  LDX: { imm:0xA2, zp:0xA6, 'zp,Y':0xB6, abs:0xAE, 'abs,Y':0xBE },
  LDY: { imm:0xA0, zp:0xA4, 'zp,X':0xB4, abs:0xAC, 'abs,X':0xBC },
  // ── 存储 ──
  STA: { zp:0x85, 'zp,X':0x95, abs:0x8D, 'abs,X':0x9D, 'abs,Y':0x99, 'ind,X':0x81, 'ind,Y':0x91 },
  STX: { zp:0x86, 'zp,Y':0x96, abs:0x8E },
  STY: { zp:0x84, 'zp,X':0x94, abs:0x8C },
  // ── 算术 ──
  ADC: { imm:0x69, zp:0x65, 'zp,X':0x75, abs:0x6D, 'abs,X':0x7D, 'abs,Y':0x79, 'ind,X':0x61, 'ind,Y':0x71 },
  SBC: { imm:0xE9, zp:0xE5, 'zp,X':0xF5, abs:0xED, 'abs,X':0xFD, 'abs,Y':0xF9, 'ind,X':0xE1, 'ind,Y':0xF1 },
  // ── 逻辑 ──
  AND: { imm:0x29, zp:0x25, 'zp,X':0x35, abs:0x2D, 'abs,X':0x3D, 'abs,Y':0x39, 'ind,X':0x21, 'ind,Y':0x31 },
  ORA: { imm:0x09, zp:0x05, 'zp,X':0x15, abs:0x0D, 'abs,X':0x1D, 'abs,Y':0x19, 'ind,X':0x01, 'ind,Y':0x11 },
  EOR: { imm:0x49, zp:0x45, 'zp,X':0x55, abs:0x4D, 'abs,X':0x5D, 'abs,Y':0x59, 'ind,X':0x41, 'ind,Y':0x51 },
  BIT: { zp:0x24, abs:0x2C },
  // ── 比较 ──
  CMP: { imm:0xC9, zp:0xC5, 'zp,X':0xD5, abs:0xCD, 'abs,X':0xDD, 'abs,Y':0xD9, 'ind,X':0xC1, 'ind,Y':0xD1 },
  CPX: { imm:0xE0, zp:0xE4, abs:0xEC },
  CPY: { imm:0xC0, zp:0xC4, abs:0xCC },
  // ── 增减 ──
  INC: { zp:0xE6, 'zp,X':0xF6, abs:0xEE, 'abs,X':0xFE },
  DEC: { zp:0xC6, 'zp,X':0xD6, abs:0xCE, 'abs,X':0xDE },
  // ── 移位 ──
  ASL: { acc:0x0A, zp:0x06, 'zp,X':0x16, abs:0x0E, 'abs,X':0x1E },
  LSR: { acc:0x4A, zp:0x46, 'zp,X':0x56, abs:0x4E, 'abs,X':0x5E },
  ROL: { acc:0x2A, zp:0x26, 'zp,X':0x36, abs:0x2E, 'abs,X':0x3E },
  ROR: { acc:0x6A, zp:0x66, 'zp,X':0x76, abs:0x6E, 'abs,X':0x7E },
  // ── 分支 ──
  BCC: { rel:0x90 }, BCS: { rel:0xB0 }, BEQ: { rel:0xF0 },
  BMI: { rel:0x30 }, BNE: { rel:0xD0 }, BPL: { rel:0x10 },
  BVC: { rel:0x50 }, BVS: { rel:0x70 },
  // ── 跳转 ──
  JMP: { abs:0x4C, ind:0x6C },
  JSR: { abs:0x20 },
  RTS: { impl:0x60 }, RTI: { impl:0x40 }, BRK: { impl:0x00 },
  // ── 栈 ──
  PHA: { impl:0x48 }, PLA: { impl:0x68 },
  PHP: { impl:0x08 }, PLP: { impl:0x28 },
  // ── 寄存器传送 ──
  TAX: { impl:0xAA }, TXA: { impl:0x8A },
  TAY: { impl:0xA8 }, TYA: { impl:0x98 },
  TSX: { impl:0xBA }, TXS: { impl:0x9A },
  // ── 增减寄存器 ──
  INX: { impl:0xE8 }, DEX: { impl:0xCA },
  INY: { impl:0xC8 }, DEY: { impl:0x88 },
  // ── 标志位 ──
  CLC: { impl:0x18 }, SEC: { impl:0x38 },
  CLI: { impl:0x58 }, SEI: { impl:0x78 },
  CLV: { impl:0xB8 }, CLD: { impl:0xD8 }, SED: { impl:0xF8 },
  NOP: { impl:0xEA },
  // ── 非官方指令 (unofficial opcodes) ──
  ANC: { imm:0x0B },
  ALR: { imm:0x4B },
  ARR: { imm:0x6B },
  AXS: { imm:0xCB },
  ANE: { imm:0x8B },
  LXA: { imm:0xAB },
  SKB: { imm:0x80 },
  LAX: { 'ind,X':0xA3, zp:0xA7, abs:0xAF, 'ind,Y':0xB3, 'zp,Y':0xB7, 'abs,Y':0xBF },
  SAX: { 'ind,X':0x83, zp:0x87, abs:0x8F, 'zp,Y':0x97 },
  DCP: { 'ind,X':0xC3, zp:0xC7, abs:0xCF, 'ind,Y':0xD3, 'zp,X':0xD7, 'abs,Y':0xDB, 'abs,X':0xDF },
  ISC: { 'ind,X':0xE3, zp:0xE7, abs:0xEF, 'ind,Y':0xF3, 'zp,X':0xF7, 'abs,Y':0xFB, 'abs,X':0xFF },
  RLA: { 'ind,X':0x23, zp:0x27, abs:0x2F, 'ind,Y':0x33, 'zp,X':0x37, 'abs,Y':0x3B, 'abs,X':0x3F },
  RRA: { 'ind,X':0x63, zp:0x67, abs:0x6F, 'ind,Y':0x73, 'zp,X':0x77, 'abs,Y':0x7B, 'abs,X':0x7F },
  SLO: { 'ind,X':0x03, zp:0x07, abs:0x0F, 'ind,Y':0x13, 'zp,X':0x17, 'abs,Y':0x1B, 'abs,X':0x1F },
  SRE: { 'ind,X':0x43, zp:0x47, abs:0x4F, 'ind,Y':0x53, 'zp,X':0x57, 'abs,Y':0x5B, 'abs,X':0x5F },
  SHA: { 'ind,Y':0x93, 'abs,Y':0x9F },
  SHS: { 'abs,Y':0x9B },
  SHY: { 'abs,X':0x9C },
  SHX: { 'abs,Y':0x9E },
  LAE: { 'abs,Y':0xBB },
  IGN: { zp:0x04, 'zp,X':0x14, abs:0x0C, 'abs,X':0x1C },
};

/** 需要区分 acc 模式的指令 (ASL A / ASL $xx 是不同 opcode) */
const ACC_MNEMONICS = new Set(['ASL', 'LSR', 'ROL', 'ROR']);

/** 条件分支指令 (支持绝对地址转相对偏移) */
const BRANCH_MNEMONICS = new Set(['BCC', 'BCS', 'BEQ', 'BMI', 'BNE', 'BPL', 'BVC', 'BVS']);

// ════════════════════════════════════════════════════════════
// 操作数解析
// ════════════════════════════════════════════════════════════

interface Operand {
  mode: string;           // 寻址模式键
  value: number;          // 立即数 / 地址值
  labelRef?: string;      // 标签引用 (分支或跳转)
}

/** 解析指令操作数字符串 */
function parseOperand(opStr: string): Operand | null {
  const raw = opStr.trim();
  if (!raw) return null;

  // @name — 标签引用 (在 uppercasing 之前, 保留原始大小写)
  {
    const m = raw.match(/^@(\w+)$/);
    if (m) return { mode: 'rel', value: -1, labelRef: m[1] };
  }

  const s = raw.toUpperCase();

  // 立即数: #$xx
  let m = s.match(/^#\$([0-9A-F]+)$/);
  if (m) return { mode: 'imm', value: parseInt(m[1], 16) };

  // 累加器
  if (s === 'A') return { mode: 'acc', value: 0 };

  // (zp,X) — 变址间接
  m = s.match(/^\(\$([0-9A-F]{1,2}),X\)$/);
  if (m) return { mode: 'ind,X', value: parseInt(m[1], 16) };

  // (zp),Y — 间接变址
  m = s.match(/^\(\$([0-9A-F]{1,2})\),Y$/);
  if (m) return { mode: 'ind,Y', value: parseInt(m[1], 16) };

  // (abs) — JMP 绝对间接
  m = s.match(/^\(\$([0-9A-F]{4})\)$/);
  if (m) return { mode: 'ind', value: parseInt(m[1], 16) };

  // $xx,X / $xx,Y — 零页变址
  m = s.match(/^\$([0-9A-F]{1,2}),([XY])$/);
  if (m) return { mode: `zp,${m[2]}`, value: parseInt(m[1], 16) };

  // $xxxx,X / $xxxx,Y — 绝对变址
  m = s.match(/^\$([0-9A-F]{4}),([XY])$/);
  if (m) return { mode: `abs,${m[2]}`, value: parseInt(m[1], 16) };

  // $xxxx — 绝对地址
  m = s.match(/^\$([0-9A-F]{4})$/);
  if (m) return { mode: 'abs', value: parseInt(m[1], 16) };

  // $xx — 零页 (1~2 位 hex)
  m = s.match(/^\$([0-9A-F]{1,2})$/);
  if (m) return { mode: 'zp', value: parseInt(m[1], 16) };

  return null;
}

// ════════════════════════════════════════════════════════════
// 中间表示 (IR)
// ════════════════════════════════════════════════════════════

type IrLine =
  | { kind: 'label'; name: string; line: number }
  | { kind: 'byte'; bytes: number[]; line: number }
  | { kind: 'dw';   words: number[]; line: number }
  | { kind: 'inst'; mnemonic: string; mode: string; value: number; labelRef?: string; line: number };

interface ParseResult {
  ir: IrLine[];
  baseOffset: number; // .org 指定的基址
}

/** 解析原始 asm 文本 → 中间表示 */
function parse(source: string): ParseResult {
  const out: IrLine[] = [];
  const rawLines = source.split('\n');
  let baseOffset = 0; // .org $XXXX

  for (let idx = 0; idx < rawLines.length; idx++) {
    // 去注释 + 空白
    let line = rawLines[idx]
      .replace(/;.*$/, '')     // ;
      .replace(/\/\/.*$/, '')  // //
      .trim();
    if (!line) continue;

    const ln = idx + 1;

    // .org $XXXX — 指定函数基址 (跨函数分支需要)
    {
      const m = line.match(/^\.org\s+\$([0-9A-F]{4})$/i);
      if (m) { baseOffset = parseInt(m[1], 16); continue; }
    }

    // 标签: @name:  (可独立一行)
    {
      const m = line.match(/^@(\w+):\s*$/);
      if (m) { out.push({ kind: 'label', name: m[1], line: ln }); continue; }
    }

    // 行内标签: @name: 指令
    {
      const m = line.match(/^@(\w+):\s+(.+)$/);
      if (m) {
        out.push({ kind: 'label', name: m[1], line: ln });
        line = m[2]; // 剩余部分继续解析
      }
    }

    // .byte
    {
      const m = line.match(/^\.byte\s+(.+)$/i);
      if (m) {
        const nums = m[1].split(',').map(s => {
          const t = s.trim();
          if (t.startsWith('$')) return parseInt(t.slice(1), 16);
          return parseInt(t, 10);
        });
        out.push({ kind: 'byte', bytes: nums, line: ln });
        continue;
      }
    }

    // .dw (little-endian word)
    {
      const m = line.match(/^\.dw\s+(.+)$/i);
      if (m) {
        const nums = m[1].split(',').map(s => {
          const t = s.trim();
          if (t.startsWith('$')) return parseInt(t.slice(1), 16);
          return parseInt(t, 10);
        });
        out.push({ kind: 'dw', words: nums, line: ln });
        continue;
      }
    }

    // 指令: 助记符 [操作数]
    const tokens = line.split(/\s+/);
    const mnem = tokens[0];
    const opStr = tokens.slice(1).join('').trim();

    const def = OPS[mnem];
    if (!def) throw new Error(`[asm] line ${ln}: unknown mnemonic "${mnem}"`);

    // 确定寻址模式
    let mode: string;
    let value: number;
    let labelRef: string | undefined;

    if (!opStr) {
      // 无操作数 → implied / acc
      if (ACC_MNEMONICS.has(mnem)) {
        throw new Error(`[asm] line ${ln}: ${mnem} requires operand (A or address)`);
      }
      if (def['impl'] !== undefined) {
        mode = 'impl';
        value = 0;
      } else {
        throw new Error(`[asm] line ${ln}: ${mnem} requires operand`);
      }
    } else {
      const parsed = parseOperand(opStr);
      if (!parsed) throw new Error(`[asm] line ${ln}: cannot parse operand "${opStr}"`);

      // 处理标签引用
      if (parsed.labelRef) {
        if (mnem === 'JMP' || mnem === 'JSR') {
          mode = 'abs';
        } else {
          mode = 'rel';
        }
        value = parsed.value;
        labelRef = parsed.labelRef;
      } else {
        // 处理分支指令的绝对地址 (BVC $A03A → 自动算相对偏移)
        if (BRANCH_MNEMONICS.has(mnem) && parsed.mode === 'abs') {
          mode = 'rel';
          value = parsed.value; // 保留目标绝对地址, assemble 时用 baseOffset 算
        } else {
          // 验证寻址模式
          const checkMode = parsed.mode;
          if (def[checkMode] === undefined) {
            throw new Error(`[asm] line ${ln}: ${mnem} does not support ${checkMode} mode`);
          }
          mode = checkMode;
          value = parsed.value;
        }
      }
    }

    out.push({ kind: 'inst', mnemonic: mnem, mode, value, labelRef, line: ln });
  }

  return { ir: out, baseOffset };
}

// ════════════════════════════════════════════════════════════
// 双遍汇编
// ════════════════════════════════════════════════════════════

function instSize(mode: string): number {
  if (mode === 'impl' || mode === 'acc') return 1;
  if (mode === 'rel' || mode === 'imm' || mode === 'zp' || mode === 'zp,X' || mode === 'zp,Y' || mode === 'ind,X' || mode === 'ind,Y') return 2;
  // abs, abs,X, abs,Y, ind
  return 3;
}

function assemble(ir: IrLine[], baseOffset: number): readonly number[] {
  // ── Pass 1: 建立标签 → offset 映射 ──
  const labelOffsets: Record<string, number> = {};
  let offset = 0;

  for (const line of ir) {
    if (line.kind === 'label') {
      if (labelOffsets[line.name] !== undefined) {
        throw new Error(`[asm] line ${line.line}: duplicate label @${line.name}`);
      }
      labelOffsets[line.name] = offset;
      continue;
    }
    if (line.kind === 'byte') { offset += line.bytes.length; continue; }
    if (line.kind === 'dw')   { offset += line.words.length * 2; continue; }
    // inst
    let expand = false;
    if (BRANCH_MNEMONICS.has(line.mnemonic) && line.mode === 'rel') {
      if (line.value > 0xFF) {
        // 跨 bank 分支超范围
        const rel = line.value - (baseOffset + offset + 2);
        if (rel < -128 || rel > 127) expand = true;
      } else if (line.labelRef && labelOffsets[line.labelRef] !== undefined) {
        // 本地标签反向引用超范围（因之前展开推挤导致）
        const rel = labelOffsets[line.labelRef] - (offset + 2);
        if (rel < -128 || rel > 127) expand = true;
      }
    }
    offset += expand ? 5 /* 反转条件(2) + JMP abs(3) */ : instSize(line.mode);
  }

  // ── Pass 2: 生成字节 ──
  const out: number[] = [];
  offset = 0;

  for (const line of ir) {
    if (line.kind === 'label') continue;

    if (line.kind === 'byte') {
      out.push(...line.bytes);
      offset += line.bytes.length;
      continue;
    }
    if (line.kind === 'dw') {
      for (const w of line.words) { out.push(w & 0xFF, (w >> 8) & 0xFF); }
      offset += line.words.length * 2;
      continue;
    }

    // 指令
    const def = OPS[line.mnemonic];
    const opcode = def[line.mode];
    out.push(opcode);

    let value = line.value;
    const mode = line.mode;

    // 解析标签引用
    if (line.labelRef) {
      const target = labelOffsets[line.labelRef];
      if (target === undefined) {
        throw new Error(`[asm] line ${line.line}: undefined label @${line.labelRef}`);
      }

      if (mode === 'abs') {
        // JMP/JSR 标签: value = ROM 绝对地址 (baseOffset + 函数内偏移)
        value = baseOffset + target;
      } else {
        // 分支: rel = target - (这里的 offset + 2)
        value = target - (offset + 2);
        if (value < -128 || value > 127) {
          // 超范围本地标签: 反转条件 + JMP 到标签绝对地址
          // e.g. BVS @E738 → BVC *+3 ; JMP $base+offset
          const invOpcode = opcode ^ 0x20;
          out.push(invOpcode);
          out.push(3); // 跳过 3 字节 JMP
          out.push(0x4C); // JMP abs
          const absAddr = baseOffset + target;
          out.push(absAddr & 0xFF);
          out.push((absAddr >> 8) & 0xFF);
          offset += 5;
          continue;
        }
        if (value < 0) value += 256;
      }

      out.push(value & 0xFF);
      if (mode === 'abs') out.push((value >> 8) & 0xFF);
    } else if (BRANCH_MNEMONICS.has(line.mnemonic) && mode === 'rel' && value > 0xFF) {
      // 跨函数分支: BVC $A03A → value 是目标绝对地址
      // rel = 目标绝对地址 - (baseOffset + 当前偏移 + 2)
      const rel = value - (baseOffset + offset + 2);
      if (rel < -128 || rel > 127) {
        // 超出 Bxx 范围: 自动生成 反转条件 + JMP 模式
        // e.g. BNE $E852 → BEQ *+3 ; JMP $E852
        // 所有分支指令对 opcode 差 0x20
        const invOpcode = opcode ^ 0x20;
        out.push(invOpcode);
        out.push(3); // 跳过 3 字节 JMP
        out.push(0x4C); // JMP abs
        out.push(value & 0xFF);
        out.push((value >> 8) & 0xFF);
        offset += 5;
        continue;
      }
      out.push(rel < 0 ? (rel + 256) & 0xFF : rel & 0xFF);
    } else {
      // 正常操作数
      if (mode === 'imm' || mode === 'rel' || mode === 'zp' || mode === 'zp,X' || mode === 'zp,Y' || mode === 'ind,X' || mode === 'ind,Y') {
        out.push(value & 0xFF);
      } else if (mode === 'abs' || mode === 'abs,X' || mode === 'abs,Y' || mode === 'ind') {
        out.push(value & 0xFF);
        out.push((value >> 8) & 0xFF);
      }
    }

    offset += instSize(mode);
  }

  return out;
}

// ════════════════════════════════════════════════════════════
// 公开 API
// ════════════════════════════════════════════════════════════

/**
 * 6502 内联汇编 tagged template literal
 *
 * @example
 *   return asm`
 *     LDA $27
 *     ASL A
 *     BEQ @done
 *     JMP $8000
 *   @done:
 *     RTS
 *   `;
 */
export function asm(strings: TemplateStringsArray, ...values: unknown[]): readonly number[] {
  const source = strings.reduce((acc, s, i) => acc + s + (values[i] ?? ''), '');
  const { ir, baseOffset } = parse(source);
  return assemble(ir, baseOffset);
}

/** 导出 opcode 表供诊断用 */
export { OPS as _OPCODES };
