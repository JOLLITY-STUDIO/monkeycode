/**
 * 把 prg_bank_31_boot_vectors.ts 中的裸 .byte 数组转成 asm 模板字符串 + 6502 助记符
 * 分支用 @label 标签，不用绝对地址
 */
import fs from 'fs';

const INS_NAMES = [
  'ADC','AND','ASL','BCC','BCS','BEQ','BIT','BMI','BNE','BPL','BRK','BVC','BVS',
  'CLC','CLD','CLI','CLV','CMP','CPX','CPY','DEC','DEX','DEY','EOR','INC','INX',
  'INY','JMP','JSR','LDA','LDX','LDY','LSR','NOP','ORA','PHA','PHP','PLA','PLP',
  'ROL','ROR','RTI','RTS','SBC','SEC','SED','SEI','STA','STX','STY','TAX','TAY',
  'TSX','TXA','TXS','TYA','ALR','ANC','ARR','AXS','LAX','SAX','DCP','ISC','RLA',
  'RRA','SLO','SRE','SKB','IGN',null,'SHA','SHS','SHY','SHX','LAE','ANE','LXA',
];

const OPCODE_TABLE = {
  "69":[0,5,2],"65":[0,0,2],"75":[0,6,2],"6d":[0,3,3],"7d":[0,8,3],"79":[0,9,3],"61":[0,10,2],"71":[0,11,2],
  "29":[1,5,2],"25":[1,0,2],"35":[1,6,2],"2d":[1,3,3],"3d":[1,8,3],"39":[1,9,3],"21":[1,10,2],"31":[1,11,2],
  "0a":[2,4,1],"06":[2,0,2],"16":[2,6,2],"0e":[2,3,3],"1e":[2,8,3],
  "90":[3,1,2],"b0":[4,1,2],"f0":[5,1,2],"30":[7,1,2],"d0":[8,1,2],"10":[9,1,2],"50":[11,1,2],"70":[12,1,2],
  "24":[6,0,2],"2c":[6,3,3],"00":[10,2,1],
  "18":[13,2,1],"d8":[14,2,1],"58":[15,2,1],"b8":[16,2,1],
  "c9":[17,5,2],"c5":[17,0,2],"d5":[17,6,2],"cd":[17,3,3],"dd":[17,8,3],"d9":[17,9,3],"c1":[17,10,2],"d1":[17,11,2],
  "e0":[18,5,2],"e4":[18,0,2],"ec":[18,3,3],"c0":[19,5,2],"c4":[19,0,2],"cc":[19,3,3],
  "c6":[20,0,2],"d6":[20,6,2],"ce":[20,3,3],"de":[20,8,3],"ca":[21,2,1],"88":[22,2,1],
  "49":[23,5,2],"45":[23,0,2],"55":[23,6,2],"4d":[23,3,3],"5d":[23,8,3],"59":[23,9,3],"41":[23,10,2],"51":[23,11,2],
  "e6":[24,0,2],"f6":[24,6,2],"ee":[24,3,3],"fe":[24,8,3],"e8":[25,2,1],"c8":[26,2,1],
  "4c":[27,3,3],"6c":[27,12,3],"20":[28,3,3],
  "a9":[29,5,2],"a5":[29,0,2],"b5":[29,6,2],"ad":[29,3,3],"bd":[29,8,3],"b9":[29,9,3],"a1":[29,10,2],"b1":[29,11,2],
  "a2":[30,5,2],"a6":[30,0,2],"b6":[30,7,2],"ae":[30,3,3],"be":[30,9,3],
  "a0":[31,5,2],"a4":[31,0,2],"b4":[31,6,2],"ac":[31,3,3],"bc":[31,8,3],
  "4a":[32,4,1],"46":[32,0,2],"56":[32,6,2],"4e":[32,3,3],"5e":[32,8,3],
  "1a":[33,2,1],"3a":[33,2,1],"5a":[33,2,1],"7a":[33,2,1],"da":[33,2,1],"ea":[33,2,1],"fa":[33,2,1],
  "09":[34,5,2],"05":[34,0,2],"15":[34,6,2],"0d":[34,3,3],"1d":[34,8,3],"19":[34,9,3],"01":[34,10,2],"11":[34,11,2],
  "48":[35,2,1],"08":[36,2,1],"68":[37,2,1],"28":[38,2,1],
  "2a":[39,4,1],"26":[39,0,2],"36":[39,6,2],"2e":[39,3,3],"3e":[39,8,3],
  "6a":[40,4,1],"66":[40,0,2],"76":[40,6,2],"6e":[40,3,3],"7e":[40,8,3],
  "40":[41,2,1],"60":[42,2,1],
  "e9":[43,5,2],"eb":[43,5,2],"e5":[43,0,2],"f5":[43,6,2],"ed":[43,3,3],"fd":[43,8,3],"f9":[43,9,3],"e1":[43,10,2],"f1":[43,11,2],
  "38":[44,2,1],"f8":[45,2,1],"78":[46,2,1],
  "85":[47,0,2],"95":[47,6,2],"8d":[47,3,3],"9d":[47,8,3],"99":[47,9,3],"81":[47,10,2],"91":[47,11,2],
  "86":[48,0,2],"96":[48,7,2],"8e":[48,3,3],"84":[49,0,2],"94":[49,6,2],"8c":[49,3,3],
  "aa":[50,2,1],"a8":[51,2,1],"ba":[52,2,1],"8a":[53,2,1],"9a":[54,2,1],"98":[55,2,1],
  "4b":[56,5,2],"0b":[57,5,2],"2b":[57,5,2],"6b":[58,5,2],"cb":[59,5,2],
};

const BRANCH_NAMES = new Set(['BCC','BCS','BEQ','BMI','BNE','BPL','BVC','BVS']);

const H2 = n => n.toString(16).toUpperCase().padStart(2, '0');
const H4 = n => n.toString(16).toUpperCase().padStart(4, '0');

/**
 * 两遍反汇编:
 * Pass 1 — 收集所有分支目标地址 (函数内)
 * Pass 2 — 生成带标签的输出
 */
function disasmWithLabels(bytes, baseAddr = 0) {
  const branchTargets = new Set();
  const lines_p1 = [];

  // ═══ Pass 1: 收集分支目标 ═══
  let pc = 0;
  while (pc < bytes.length) {
    const op = H2(bytes[pc]).toLowerCase();
    const rec = OPCODE_TABLE[op];
    if (!rec) { pc++; continue; }
    const [insIdx, mode, size] = rec;
    if (pc + size > bytes.length) break;

    const insName = INS_NAMES[insIdx] || '???';

    if (BRANCH_NAMES.has(insName) && mode === 1) {
      const lo = bytes[pc + 1];
      const target = baseAddr + pc + 2 + (lo < 128 ? lo : lo - 256);
      branchTargets.add(target);
    }

    // JMP/JSR 跨函数地址不添加标签（留作绝对地址）
    pc += size;
  }

  // ═══ Pass 2: 生成输出 (绝对地址分支 → 标签引用) ═══
  const lines = [];
  pc = 0;
  let dataRun = [];

  function flushData() {
    if (dataRun.length === 0) return;
    const hex = dataRun.map(b => '$' + H2(b)).join(', ');
    lines.push(`    .byte ${hex}`);
    dataRun = [];
  }

  while (pc < bytes.length) {
    const addr = baseAddr + pc;
    const op = H2(bytes[pc]).toLowerCase();
    const rec = OPCODE_TABLE[op];

    // 需要插入标签?
    if (branchTargets.has(addr)) {
      flushData();
      lines.push(`  @E${H4(addr).slice(1)}:`);
    }

    if (!rec) {
      dataRun.push(bytes[pc]);
      pc++;
      continue;
    }

    flushData();

    const [insIdx, mode, size] = rec;
    if (pc + size > bytes.length) {
      dataRun.push(...bytes.slice(pc));
      break;
    }

    const insName = INS_NAMES[insIdx] || '???';
    const lo = size >= 2 ? bytes[pc + 1] : 0;
    const hi = size >= 3 ? bytes[pc + 2] : 0;
    const abs = lo | (hi << 8);

    let operand = '';
    let comment = '';

    switch (mode) {
      case 0: operand = `$${H2(lo)}`; break;
      case 1: {
        const target = baseAddr + pc + 2 + (lo < 128 ? lo : lo - 256);
        // 同一函数内的分支 → 用标签
        if (target >= baseAddr && target < baseAddr + bytes.length) {
          operand = `@E${H4(target).slice(1)}`;
        } else {
          // 跨函数分支 → 原始字节，避免 assembler baseOffset=0 算错偏移
          lines.push(`    .byte $${H2(bytes[pc])}, $${H2(bytes[pc + 1])}  ; ${insName} $${H4(target)}`);
          pc += size;
          continue;
        }
        break;
      }
      case 2: break;
      case 3: operand = `$${H4(abs)}`; break;
      case 4: operand = 'A'; break;
      case 5: operand = `#$${H2(lo)}`; break;
      case 6: operand = `$${H2(lo)},X`; break;
      case 7: operand = `$${H2(lo)},Y`; break;
      case 8: operand = `$${H4(abs)},X`; break;
      case 9: operand = `$${H4(abs)},Y`; break;
      case 10: operand = `($${H2(lo)},X)`; break;
      case 11: operand = `($${H2(lo)}),Y`; break;
      case 12: operand = `($${H4(abs)})`; break;
    }

    if (insName === 'JSR' && size >= 3 && abs >= 0x8000 && abs <= 0xFFFF) {
      comment = ' ; → bank switch?';
    }

    const instruct = operand ? `${insName} ${operand}` : insName;
    lines.push(`    ${instruct}${comment}`);
    pc += size;
  }

  flushData();

  // 精简: 如果整段就一个分支目标且正好在段前，把独立标签行移到行内
  return lines;
}

function parseFunctions(content) {
  const funcs = [];
  const funcRe = /function (\w+)\(\): readonly number\[\] \{\s*([\s\S]*?)\n\}/g;
  let match;
  while ((match = funcRe.exec(content)) !== null) {
    const name = match[1];
    const body = match[2];
    const bytes = [];
    const byteRe = /0x([0-9a-fA-F]{2})/g;
    let bm;
    while ((bm = byteRe.exec(body)) !== null) {
      bytes.push(parseInt(bm[1], 16));
    }
    funcs.push({ name, bytes, fullMatch: match[0], start: match.index, end: match.index + match[0].length });
  }
  return funcs;
}

// Run from project root: node src/tsnes/tsubasa-hex2asm/convert_bank31_asm.mjs
const filePath = 'src/tsnes/tsubasa-hex2asm/prg_banks/prg_bank_31_boot_vectors.ts';
let content = fs.readFileSync(filePath, 'utf8');

const funcs = parseFunctions(content);
console.log(`Found ${funcs.length} build functions`);

const addrMap = {
  buildE000_E016_calcPlayerStat: 0xE000,
  buildE017_E022_swapBallOwner: 0xE017,
  buildE023_E058_matchInit: 0xE023,
  buildE059_E073_preSwapCheck: 0xE059,
  buildE074_E0DE_matchProgressCheck: 0xE074,
  buildE0DF_E6FB_mainLoop: 0xE0DF,
  buildE6FC_E7C8_spriteDispatch: 0xE6FC,
  buildE7C9_E8EC_pathfinding: 0xE7C9,
  buildE8ED_E9D9_movementMath: 0xE8ED,
  buildE9DA_F0B0_dataTables: 0xE9DA,
  buildF0B1_F5FF_oamDisplay: 0xF0B1,
  buildF600_FAxx_textTables: 0xF600,
  buildFAxx_FFEF_padding: 0xFA00,
  buildFFF0_FFF7_resetHandler: 0xFFF0,
  buildFFF8_FFFF_vectors: 0xFFF8,
};

const codeFuncs = new Set([
  'buildE000_E016_calcPlayerStat',
  'buildE017_E022_swapBallOwner',
  'buildE023_E058_matchInit',
  'buildE059_E073_preSwapCheck',
  'buildE074_E0DE_matchProgressCheck',
  'buildE0DF_E6FB_mainLoop',
  'buildE6FC_E7C8_spriteDispatch',
  'buildE7C9_E8EC_pathfinding',
  'buildE8ED_E9D9_movementMath',
  'buildFFF0_FFF7_resetHandler',
]);

const replacements = [];
for (const func of funcs) {
  if (!codeFuncs.has(func.name)) continue;

  const baseAddr = addrMap[func.name] || 0;
  const lines = disasmWithLabels(func.bytes, baseAddr);

  // 找最小缩进
  const indentRe = /^(\s*)/;
  const minIndent = Math.min(...lines.map(l => l.match(indentRe)[0].length));
  const aligned = lines.map(l => l.slice(minIndent));

  const asmBody = '  return asm`\n' + aligned.join('\n') + '\n  `;';
  const newFunc = `function ${func.name}(): readonly number[] {\n${asmBody}\n}`;

  replacements.push({ old: func.fullMatch, new: newFunc, start: func.start, end: func.end });
  console.log(`  ${func.name}: ${func.bytes.length}B → ASM with labels`);
}

replacements.sort((a, b) => b.start - a.start);
for (const r of replacements) {
  content = content.slice(0, r.start) + r.new + content.slice(r.end);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`\nDone! ${replacements.length} functions converted to 6502 ASM with labels`);
