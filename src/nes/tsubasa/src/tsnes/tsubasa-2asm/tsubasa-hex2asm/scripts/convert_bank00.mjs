/**
 * 把 prg_bank_00_dispatch_scene_engine.ts 中指定 code 函数
 * 从 .byte 转成 6502 助记符 + label，基于 convert_bank31_asm.mjs 的 disasmWithLabels
 * 用法: node _convert_bank00.mjs <funcName>   (一次转一个)
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
};

const BRANCH_NAMES = new Set(['BCC','BCS','BEQ','BMI','BNE','BPL','BVC','BVS']);

const H2 = n => n.toString(16).toUpperCase().padStart(2, '0');
const H4 = n => n.toString(16).toUpperCase().padStart(4, '0');

function disasmWithLabels(bytes, baseAddr) {
  const branchTargets = new Set();

  // Pass 1: 收集分支目标
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
    pc += size;
  }

  // Pass 2: 生成输出
  const lines = [];
  pc = 0;
  let dataRun = [];

  function flushData() {
    if (dataRun.length === 0) return;
    const hex = dataRun.map(b => '$' + H2(b)).join(', ');
    lines.push('    .byte ' + hex);
    dataRun = [];
  }

  while (pc < bytes.length) {
    const addr = baseAddr + pc;
    const op = H2(bytes[pc]).toLowerCase();
    const rec = OPCODE_TABLE[op];

    if (branchTargets.has(addr)) {
      flushData();
      lines.push('  @E' + H4(addr).slice(1) + ':');
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
      case 0: operand = '$' + H2(lo); break;
      case 1: {
        const target = baseAddr + pc + 2 + (lo < 128 ? lo : lo - 256);
        // 跨区域的分支用绝对地址，区域的用标签
        if (target >= baseAddr && target < baseAddr + bytes.length) {
          operand = '@E' + H4(target).slice(1);
        } else {
          lines.push('    .byte $' + H2(bytes[pc]) + ', $' + H2(bytes[pc + 1]) + '  ; ' + insName + ' $' + H4(target));
          pc += size;
          continue;
        }
        break;
      }
      case 2: break;
      case 3: operand = '$' + H4(abs); break;
      case 4: operand = 'A'; break;
      case 5: operand = '#' + '$' + H2(lo); break;
      case 6: operand = '$' + H2(lo) + ',X'; break;
      case 7: operand = '$' + H2(lo) + ',Y'; break;
      case 8: operand = '$' + H4(abs) + ',X'; break;
      case 9: operand = '$' + H4(abs) + ',Y'; break;
      case 10: operand = '($' + H2(lo) + ',X)'; break;
      case 11: operand = '($' + H2(lo) + '),Y'; break;
      case 12: operand = '($' + H4(abs) + ')'; break;
    }

    const instruct = operand ? insName + ' ' + operand : insName;
    lines.push('    ' + instruct + comment);
    pc += size;
  }

  flushData();

  // 精简: 如果标签行下一行就是引用, 把标签移到行内
  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i].match(/^  @E[0-9A-F]{3}:$/)) {
      const label = lines[i].trim().replace(':', '');
      const next = lines[i + 1];
      if (next.startsWith('    ') && !next.startsWith('    .byte')) {
        // 标签后跟指令 → 合并到行
        const indent = next.match(/^(\s+)/)[0];
        lines[i] = indent + label + ': ' + next.trim();
        lines.splice(i + 1, 1);
        i--;
      }
    }
  }

  // 如果第一行就是标签且后面是指令, 也合并
  if (lines.length >= 2 && lines[0].match(/^  @E[0-9A-F]{3}:$/)) {
    const label = lines[0].trim().replace(':', '');
    const next = lines[1];
    if (next.startsWith('    ') && !next.startsWith('    .byte')) {
      const indent = next.match(/^(\s+)/)[0];
      lines[0] = indent + label + ': ' + next.trim();
      lines.splice(1, 1);
    }
  }

  return lines;
}

function findFuncContent(content, funcName) {
  const startRe = new RegExp('function ' + funcName + '\\(\\)');
  const idx = content.search(startRe);
  if (idx === -1) return null;
  // 找函数体 { ... }
  let braceIdx = content.indexOf('{', idx);
  let depth = 0;
  for (let i = braceIdx; i < content.length; i++) {
    if (content[i] === '{') depth++;
    if (content[i] === '}') { depth--; if (depth === 0) return { start: idx, bodyStart: braceIdx + 1, bodyEnd: i, end: i + 1 }; }
  }
  return null;
}

function extractBytes(content, funcName) {
  const range = findFuncContent(content, funcName);
  if (!range) return null;
  const body = content.slice(range.bodyStart, range.bodyEnd);
  // 同时匹配 0xXX 和 asm 模板中的 $XX（但排除 .byte $XX, $YY 这种）
  // 先收 0xXX
  const bytes = [];
  const bm1 = body.matchAll(/0x([0-9a-fA-F]{2})/g);
  for (const m of bm1) bytes.push(parseInt(m[1], 16));
  // 再收 asm 模板中的 $XX（排除指令操作数，只收 .byte 后的）
  const bm2 = body.matchAll(/\.byte\s+((?:\$[0-9a-fA-F]{2}[,\s]*)+)/gi);
  for (const m of bm2) {
    const nums = m[1].match(/\$([0-9a-fA-F]{2})/g);
    if (nums) for (const n of nums) bytes.push(parseInt(n.slice(1), 16));
  }
  if (bytes.length === 0) {
    // 最后 fallback: 如果整个 body 在 return asm`...`  又没有 .byte 前缀
    const asmMatch = body.match(/return asm`([\s\S]*?)`/);
    if (asmMatch) {
      const nums = asmMatch[1].match(/\$([0-9a-fA-F]{2})/g);
      if (nums) for (const n of nums) bytes.push(parseInt(n.slice(1), 16));
    }
  }
  return { range, bytes };
}

const ADDR_MAP = {
  buildsceneLoop: 0x8017,
  buildscriptEngine: 0x82ED,
  buildsceneTables: 0x83D4,
  buildbytecodeHandlers: 0x8840,
  buildscheduler: 0x9EED,
  buildpadding: 0x9FF6,
};

const filePath = new URL('../prg_banks/prg_bank_00_dispatch_scene_engine.ts', import.meta.url).pathname;

// ── 如果传了参数就只转那一个函数 ──
const targetFunc = process.argv[2];
if (!targetFunc) {
  console.log('Usage: node _convert_bank00.mjs <funcName>');
  console.log('Available: ' + Object.keys(ADDR_MAP).join(', '));
  process.exit(0);
}

if (!ADDR_MAP[targetFunc]) {
  console.error('Unknown function: ' + targetFunc);
  process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');
const result = extractBytes(content, targetFunc);

if (!result) {
  console.error('Could not parse function: ' + targetFunc);
  process.exit(1);
}

const { range, bytes } = result;
const baseAddr = ADDR_MAP[targetFunc];
console.log(targetFunc + ': ' + bytes.length + ' bytes, base=$' + H4(baseAddr));

const lines = disasmWithLabels(bytes, baseAddr);
const asmBody = '  return asm`\n' + lines.join('\n') + '\n  `;';

const indent = content.slice(range.start).match(/^(\s*)/)[0];
const newFunc = indent + 'function ' + targetFunc + '(): readonly number[] {\n' + asmBody + '\n' + indent + '}';

let newContent = content.slice(0, range.start) + newFunc + content.slice(range.end);

// 去多余空行
newContent = newContent.replace(/\n{3,}/g, '\n\n');

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Done! Lines: ' + content.split('\n').length + ' -> ' + newContent.split('\n').length);
