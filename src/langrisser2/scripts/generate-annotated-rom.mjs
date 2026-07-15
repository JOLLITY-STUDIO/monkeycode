import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, '..', '20260713');
const ROM_FILE = path.join(BASE, 'Langrisser II (Japan).md');

const rom = new Uint8Array(fs.readFileSync(ROM_FILE));

// ============ 68000 反汇编器（简化版，覆盖常用指令） ============

function readByte(addr) { return rom[addr]; }
function readWord(addr) { return (rom[addr] << 8) | rom[addr + 1]; }
function readLong(addr) { return (rom[addr] << 24) | (rom[addr + 1] << 16) | (rom[addr + 2] << 8) | rom[addr + 3]; }

// 寄存器名
const REGS = ['d0','d1','d2','d3','d4','d5','d6','d7','a0','a1','a2','a3','a4','a5','a6','a7'];
const DATA_REGS = ['d0','d1','d2','d3','d4','d5','d6','d7'];
const ADDR_REGS = ['a0','a1','a2','a3','a4','a5','a6','a7'];

// 大小后缀
const SIZE_SUFFIX = { 0: '.b', 1: '.w', 2: '.l' };

function signExtend(value, bits) {
  const signBit = 1 << (bits - 1);
  if (value & signBit) {
    value = value - (1 << bits);
  }
  return value;
}

function toHex(value, width) {
  let hex = (value >>> 0).toString(16).toUpperCase();
  while (hex.length < width) hex = '0' + hex;
  return '$' + hex;
}

// 解析有效地址
function decodeEA(rm, reg, size, pc) {
  const mode = rm;
  
  switch (mode) {
    case 0: // Dn 数据寄存器直接寻址
      return DATA_REGS[reg];
    case 1: // An 地址寄存器直接寻址
      return ADDR_REGS[reg];
    case 2: // (An) 地址寄存器间接寻址
      return `(${ADDR_REGS[reg]})`;
    case 3: // (An)+ 地址寄存器间接后增量
      return `(${ADDR_REGS[reg]})+`;
    case 4: // -(An) 地址寄存器间接前减量
      return `-(${ADDR_REGS[reg]})`;
    case 5: // d(An) 地址寄存器间接带位移
      return `${toHex(readWord(pc + 2), 4)}(${ADDR_REGS[reg]})`;
    case 6: // d(An,Xi) 地址寄存器间接带变址
      const ext = readWord(pc + 2);
      const xiReg = (ext >> 12) & 0x0F;
      const xiSize = (ext >> 11) & 1;
      const disp = ext & 0xFF;
      const xiName = REGS[xiReg] + (xiSize ? '.l' : '.w');
      return `${toHex(signExtend(disp, 8), 2)}(${ADDR_REGS[reg]},${xiName})`;
    case 7: // 特殊寻址方式
      switch (reg) {
        case 0: return `(${toHex(readWord(pc + 2), 4)})`; // (xxx).w
        case 1: return `(${toHex(readLong(pc + 2), 8)})`; // (xxx).l
        case 2: return `(${toHex(readWord(pc + 2), 4)},pc)`; // d(PC)
        case 4: return `#${toHex(readWord(pc + 2), 4)}`; // 立即数
        default: return '(???)';
      }
    default:
      return '(???)';
  }
}

// 单指令反汇编
function disassemble(addr) {
  const word = readWord(addr);
  let result = { text: '', size: 2 };
  
  const op = (word >> 12) & 0x0F;
  const reg = (word >> 9) & 0x07;
  const rm = (word >> 6) & 0x07;
  const eaReg = word & 0x07;
  
  // 检测各种指令
  // ORI #<data>,<ea>
  if ((word & 0xFF00) === 0x0000 && (word & 0x00C0) === 0x00) {
    const size = (word >> 6) & 3;
    const ea = decodeEA(rm, eaReg, size, addr);
    let imm;
    if (size === 0) { imm = toHex(readByte(addr + 2), 2); result.size = 4; }
    else if (size === 1) { imm = toHex(readWord(addr + 2), 4); result.size = 4; }
    else { imm = toHex(readLong(addr + 2), 8); result.size = 6; }
    result.text = `ori${SIZE_SUFFIX[size]}\t#${imm},${ea}`;
    return result;
  }
  
  // ANDI #<data>,<ea>
  if ((word & 0xFF00) === 0x0200 && (word & 0x00C0) === 0x00) {
    const size = (word >> 6) & 3;
    const ea = decodeEA(rm, eaReg, size, addr);
    let imm;
    if (size === 0) { imm = toHex(readByte(addr + 2), 2); result.size = 4; }
    else if (size === 1) { imm = toHex(readWord(addr + 2), 4); result.size = 4; }
    else { imm = toHex(readLong(addr + 2), 8); result.size = 6; }
    result.text = `andi${SIZE_SUFFIX[size]}\t#${imm},${ea}`;
    return result;
  }
  
  // SUBI #<data>,<ea>
  if ((word & 0xFF00) === 0x0400 && (word & 0x00C0) === 0x00) {
    const size = (word >> 6) & 3;
    const ea = decodeEA(rm, eaReg, size, addr);
    let imm;
    if (size === 0) { imm = toHex(readByte(addr + 2), 2); result.size = 4; }
    else if (size === 1) { imm = toHex(readWord(addr + 2), 4); result.size = 4; }
    else { imm = toHex(readLong(addr + 2), 8); result.size = 6; }
    result.text = `subi${SIZE_SUFFIX[size]}\t#${imm},${ea}`;
    return result;
  }
  
  // ADDI #<data>,<ea>
  if ((word & 0xFF00) === 0x0600 && (word & 0x00C0) === 0x00) {
    const size = (word >> 6) & 3;
    const ea = decodeEA(rm, eaReg, size, addr);
    let imm;
    if (size === 0) { imm = toHex(readByte(addr + 2), 2); result.size = 4; }
    else if (size === 1) { imm = toHex(readWord(addr + 2), 4); result.size = 4; }
    else { imm = toHex(readLong(addr + 2), 8); result.size = 6; }
    result.text = `addi${SIZE_SUFFIX[size]}\t#${imm},${ea}`;
    return result;
  }
  
  // BTST #<data>,<ea>
  if ((word & 0xFF00) === 0x0800) {
    const bit = word & 0xFF;
    const ea = decodeEA(rm, eaReg, 0, addr + 2);
    let eaSize = 0;
    if (rm === 0) { result.size = 2; }
    else if (rm === 7 && eaReg === 0) { result.size = 4; eaSize = 0; }
    else { result.size = 4; eaSize = 0; }
    result.text = `btst\t#${bit},${ea}`;
    return result;
  }
  
  // BCHG BCLR BSET
  if ((word & 0xF000) === 0x0000 && (word & 0x0100) !== 0) {
    // 简化处理
  }
  
  // MOVEA <ea>,An
  if ((word & 0xF0C0) === 0x3040 || (word & 0xF0C0) === 0x2040) {
    const size = (word >> 12) & 1; // 0=word, 1=long
    const dstReg = (word >> 9) & 7;
    const ea = decodeEA(rm, eaReg, size ? 2 : 1, addr);
    let eaSize = 2;
    if (rm === 7) {
      if (eaReg === 0) eaSize = 2;
      else if (eaReg === 1) eaSize = 4;
      else if (eaReg === 2) eaSize = 2;
      else if (eaReg === 4) eaSize = size ? 4 : 2;
    } else if (rm === 5 || rm === 6) {
      eaSize = 2;
    }
    result.size = 2 + eaSize;
    result.text = `movea${size === 0 ? '.w' : '.l'}\t${ea},${ADDR_REGS[dstReg]}`;
    return result;
  }
  
  // MOVE <ea>,<ea> - 00aaabbbcccdddee  (简化处理)
  if ((word & 0xC000) === 0x0000 || (word & 0xC000) === 0x4000 || 
      (word & 0xC000) === 0x8000 || (word & 0xC000) === 0xC000) {
    const size = (word >> 12) & 3;
    const dstMode = (word >> 9) & 7;
    const dstReg = (word >> 6) & 7;
    const srcMode = (word >> 3) & 7;
    const srcReg = word & 7;
    
    // 是MOVE指令
    if (size > 0 && size < 4) {
      const srcEA = decodeEA(srcMode, srcReg, size - 1, addr);
      
      // 计算源操作数大小
      let srcSize = 0;
      if (srcMode === 7) {
        if (srcReg === 0) srcSize = 2;
        else if (srcReg === 1) srcSize = 4;
        else if (srcReg === 2) srcSize = 2;
        else if (srcReg === 4) srcSize = (size === 1) ? 2 : (size === 2 ? 4 : 2);
      } else if (srcMode === 5 || srcMode === 6) {
        srcSize = 2;
      }
      
      const dstEA = decodeEA(dstMode, dstReg, size - 1, addr + srcSize);
      
      // 计算目的操作数额外大小
      let dstSize = 0;
      if (dstMode === 7) {
        if (dstReg === 0) dstSize = 2;
        else if (dstReg === 1) dstSize = 4;
        else if (dstReg === 2) dstSize = 2;
      } else if (dstMode === 5 || dstMode === 6) {
        dstSize = 2;
      }
      
      result.size = 2 + srcSize + dstSize;
      result.text = `move${SIZE_SUFFIX[size - 1]}\t${srcEA},${dstEA}`;
      return result;
    }
  }
  
  // LEA <ea>,An
  if ((word & 0xF1C0) === 0x41C0) {
    const dstReg = (word >> 9) & 7;
    const ea = decodeEA(rm, eaReg, 2, addr);
    let eaSize = 2;
    if (rm === 7) {
      if (eaReg === 0) eaSize = 2;
      else if (eaReg === 1) eaSize = 4;
      else if (eaReg === 2) eaSize = 2;
    } else if (rm === 5 || rm === 6) {
      eaSize = 2;
    }
    result.size = 2 + eaSize;
    result.text = `lea\t${ea},${ADDR_REGS[dstReg]}`;
    return result;
  }
  
  // JSR <ea>
  if ((word & 0xFFC0) === 0x4E80) {
    const ea = decodeEA(rm, eaReg, 2, addr);
    let eaSize = 0;
    if (rm === 7) {
      if (eaReg === 0) eaSize = 2;
      else if (eaReg === 1) eaSize = 4;
      else if (eaReg === 2) eaSize = 2;
    } else if (rm === 5 || rm === 6) {
      eaSize = 2;
    }
    result.size = 2 + eaSize;
    result.text = `jsr\t${ea}`;
    return result;
  }
  
  // JMP <ea>
  if ((word & 0xFFC0) === 0x4EC0) {
    const ea = decodeEA(rm, eaReg, 2, addr);
    let eaSize = 0;
    if (rm === 7) {
      if (eaReg === 0) eaSize = 2;
      else if (eaReg === 1) eaSize = 4;
      else if (eaReg === 2) eaSize = 2;
    } else if (rm === 5 || rm === 6) {
      eaSize = 2;
    }
    result.size = 2 + eaSize;
    result.text = `jmp\t${ea}`;
    return result;
  }
  
  // Bcc 分支指令
  if ((word & 0xF000) === 0x6000 || 
      ((word & 0xF000) >= 0x6000 && (word & 0xF000) <= 0x6F00)) {
    const condition = (word >> 8) & 0x0F;
    let ccName = '';
    const ccNames = ['ra','eq','ne','cs','cc','mi','pl','vs','vc','hi','ls','ge','lt','gt','le',''];
    ccName = ccNames[condition] || '??';
    
    const disp = signExtend(word & 0xFF, 8);
    
    if (disp === 0) {
      // 16位位移
      const disp16 = signExtend(readWord(addr + 2), 16);
      const target = addr + 2 + disp16;
      result.size = 4;
      result.text = `b${ccName}\t${toHex(target, 6)}`;
    } else if (disp === 1) {
      // 32位位移 (68020+)
      result.text = `b${ccName}\t(32位)`;
      result.size = 6;
    } else {
      // 8位位移
      const target = addr + 2 + disp;
      result.size = 2;
      result.text = `b${ccName}\t${toHex(target, 6)}`;
    }
    return result;
  }
  
  // ADD / SUB / AND / OR / EOR / CMP (Dn, <ea>)
  if ((word & 0xF000) === 0xD000 || // ADD
      (word & 0xF000) === 0x9000 || // SUB
      (word & 0xF000) === 0xC000 || // AND
      (word & 0xF000) === 0x8000 || // OR
      (word & 0xF000) === 0xB000 || // EOR
      (word & 0xF000) === 0xB000) { // CMP
    // 简化，标记为未知
  }
  
  // DBcc
  if ((word & 0xF0F8) === 0x50C8) {
    const condition = (word >> 8) & 0x0F;
    const ccNames = ['ra','eq','ne','cs','cc','mi','pl','vs','vc','hi','ls','ge','lt','gt','le',''];
    const ccName = ccNames[condition] || '??';
    const reg = word & 7;
    const disp = signExtend(readWord(addr + 2), 16);
    const target = addr + 2 + disp;
    result.size = 4;
    result.text = `db${ccName}\t${DATA_REGS[reg]},${toHex(target, 6)}`;
    return result;
  }
  
  // RTS
  if (word === 0x4E75) {
    result.text = 'rts';
    return result;
  }
  
  // RTE
  if (word === 0x4E73) {
    result.text = 'rte';
    return result;
  }
  
  // NOP
  if (word === 0x4E71) {
    result.text = 'nop';
    return result;
  }
  
  // CLR <ea>
  if ((word & 0xFFC0) === 0x4240) {
    const size = (word >> 6) & 3;
    const ea = decodeEA(rm, eaReg, size, addr);
    let eaSize = 0;
    if (rm === 7) {
      if (eaReg === 0) eaSize = 2;
      else if (eaReg === 1) eaSize = 4;
      else if (eaReg === 2) eaSize = 2;
    } else if (rm === 5 || rm === 6) {
      eaSize = 2;
    }
    result.size = 2 + eaSize;
    result.text = `clr${SIZE_SUFFIX[size]}\t${ea}`;
    return result;
  }
  
  // TST <ea>
  if ((word & 0xFFC0) === 0x4A40) {
    const size = (word >> 6) & 3;
    const ea = decodeEA(rm, eaReg, size, addr);
    let eaSize = 0;
    if (rm === 7) {
      if (eaReg === 0) eaSize = 2;
      else if (eaReg === 1) eaSize = 4;
      else if (eaReg === 2) eaSize = 2;
    } else if (rm === 5 || rm === 6) {
      eaSize = 2;
    }
    result.size = 2 + eaSize;
    result.text = `tst${SIZE_SUFFIX[size]}\t${ea}`;
    return result;
  }
  
  // MOVEM
  if ((word & 0xF800) === 0x4800) {
    const dir = (word >> 10) & 1; // 0: mem→reg, 1: reg→mem
    const size = (word >> 6) & 3;
    const ea = decodeEA(rm, eaReg, 2, addr + 2);
    const regMask = readWord(addr + 2);
    
    let regList = [];
    for (let i = 0; i < 16; i++) {
      if (regMask & (1 << i)) {
        regList.push(REGS[i]);
      }
    }
    
    let eaSize = 0;
    if (rm === 7) {
      if (eaReg === 0) eaSize = 2;
      else if (eaReg === 1) eaSize = 4;
      else if (eaReg === 2) eaSize = 2;
    } else if (rm === 5 || rm === 6) {
      eaSize = 2;
    }
    
    result.size = 4 + eaSize;
    result.text = `movem${SIZE_SUFFIX[size]}\t${dir ? regList.join('/') : ea},${dir ? ea : regList.join('/')}`;
    return result;
  }
  
  // PEA <ea>
  if ((word & 0xFFC0) === 0x4840) {
    const ea = decodeEA(rm, eaReg, 2, addr);
    let eaSize = 0;
    if (rm === 7) {
      if (eaReg === 0) eaSize = 2;
      else if (eaReg === 1) eaSize = 4;
      else if (eaReg === 2) eaSize = 2;
    } else if (rm === 5 || rm === 6) {
      eaSize = 2;
    }
    result.size = 2 + eaSize;
    result.text = `pea\t${ea}`;
    return result;
  }
  
  // LINK
  if ((word & 0xFFF8) === 0x4E50) {
    const reg = word & 7;
    const disp = signExtend(readWord(addr + 2), 16);
    result.size = 4;
    result.text = `link\t${ADDR_REGS[reg]},#${toHex(disp, 4)}`;
    return result;
  }
  
  // UNLK
  if ((word & 0xFFF8) === 0x4E58) {
    const reg = word & 7;
    result.text = `unlk\t${ADDR_REGS[reg]}`;
    return result;
  }
  
  // MOVE USP
  if ((word & 0xFFF8) === 0x4E60) {
    const dir = (word >> 3) & 1;
    const reg = word & 7;
    result.text = `move.usp\t${dir ? ADDR_REGS[reg] + ',sp' : 'sp,' + ADDR_REGS[reg]}`;
    return result;
  }
  
  // SWAP
  if ((word & 0xFFF8) === 0x4840) {
    const reg = word & 7;
    result.text = `swap\t${DATA_REGS[reg]}`;
    return result;
  }
  
  // ADDQ / SUBQ
  if ((word & 0xF000) === 0x5000 || (word & 0xF000) === 0x7000) {
    const isAdd = (word & 0x8000) !== 0;
    const data = ((word >> 9) & 7) || 8;
    const size = (word >> 6) & 3;
    const ea = decodeEA(rm, eaReg, size, addr);
    let eaSize = 0;
    if (rm === 7) {
      if (eaReg === 0) eaSize = 2;
      else if (eaReg === 1) eaSize = 4;
      else if (eaReg === 2) eaSize = 2;
    } else if (rm === 5 || rm === 6) {
      eaSize = 2;
    }
    result.size = 2 + eaSize;
    result.text = `${isAdd ? 'addq' : 'subq'}${SIZE_SUFFIX[size]}\t#${data},${ea}`;
    return result;
  }
  
  // CMP
  if ((word & 0xF000) === 0xB000) {
    const size = (word >> 12) & 3;
    const dstReg = (word >> 9) & 7;
    const ea = decodeEA(rm, eaReg, size, addr);
    let eaSize = 0;
    if (rm === 7) {
      if (eaReg === 0) eaSize = 2;
      else if (eaReg === 1) eaSize = 4;
      else if (eaReg === 2) eaSize = 2;
    } else if (rm === 5 || rm === 6) {
      eaSize = 2;
    }
    result.size = 2 + eaSize;
    result.text = `cmp${SIZE_SUFFIX[size]}\t${DATA_REGS[dstReg]},${ea}`;
    return result;
  }
  
  // 特殊：DC.W / DC.L 数据声明
  // 如果指令无法识别，就输出数据
  if (result.text === '') {
    result.text = `dc.w\t${toHex(word, 4)}`;
  }
  
  return result;
}

// ============ 生成带注释的ROM ============

const outputLines = [];

function addLine(addr, instr, comment) {
  const addrStr = toHex(addr, 6);
  let line = instr.padEnd(32);
  if (comment) {
    line += `; ${comment}`;
  }
  outputLines.push(line);
}

function addSection(title) {
  outputLines.push('');
  outputLines.push(`; ============================================================`);
  outputLines.push(`; ${title}`);
  outputLines.push(`; ============================================================`);
  outputLines.push('');
}

// ===== ROM 头部 (向量表) =====
addSection('ROM 头部 - 异常向量表 (0x000000 - 0x000100)');

const vectors = [
  { offset: 0x000, name: 'SSP', desc: '初始栈指针 → 0xFF0000 (RAM顶端)' },
  { offset: 0x004, name: 'Reset', desc: '复位向量 → Reset() 函数入口' },
  { offset: 0x008, name: 'BusErr', desc: '总线错误异常' },
  { offset: 0x00C, name: 'AdrErr', desc: '地址错误异常' },
  { offset: 0x010, name: 'InvOpCode', desc: '非法指令异常' },
  { offset: 0x014, name: 'DivBy0', desc: '除零异常' },
  { offset: 0x018, name: 'CHK', desc: 'CHK指令异常' },
  { offset: 0x01C, name: 'TRAPV', desc: 'TRAPV指令异常' },
  { offset: 0x020, name: 'PrivViol', desc: '特权违规异常' },
  { offset: 0x024, name: 'Trace', desc: '跟踪异常' },
  { offset: 0x028, name: 'A', desc: '保留' },
  { offset: 0x02C, name: 'B', desc: '保留' },
  { offset: 0x030, name: 'C', desc: '保留' },
  { offset: 0x034, name: 'D', desc: '保留' },
  { offset: 0x038, name: 'E', desc: '保留' },
  { offset: 0x03C, name: 'F', desc: '保留' },
  { offset: 0x040, name: 'BadIRQ', desc: '伪中断' },
  { offset: 0x044, name: 'IRQ1', desc: '外部中断1' },
  { offset: 0x048, name: 'EXT', desc: '外部中断2 (扩展端口)' },
  { offset: 0x04C, name: 'IRQ3', desc: '外部中断3' },
  { offset: 0x050, name: 'HBLANK', desc: '外部中断4 (H-Blank 行扫描)' },
  { offset: 0x054, name: 'IRQ5', desc: '外部中断5' },
  { offset: 0x058, name: 'VBLANK', desc: '外部中断6 (V-Blank 垂直回扫, 60Hz主循环)' },
  { offset: 0x05C, name: 'IRQ7', desc: '外部中断7 (不可屏蔽)' },
  { offset: 0x060, name: 'TRAP0', desc: 'TRAP #0 指令' },
  { offset: 0x064, name: 'TRAP1', desc: 'TRAP #1 指令' },
  { offset: 0x068, name: 'TRAP2', desc: 'TRAP #2 指令' },
  { offset: 0x06C, name: 'TRAP3', desc: 'TRAP #3 指令' },
  { offset: 0x070, name: 'TRAP4', desc: 'TRAP #4 指令' },
  { offset: 0x074, name: 'TRAP5', desc: 'TRAP #5 指令' },
  { offset: 0x078, name: 'TRAP6', desc: 'TRAP #6 指令' },
  { offset: 0x07C, name: 'TRAP7', desc: 'TRAP #7 指令' },
  { offset: 0x080, name: 'TRAP8', desc: 'TRAP #8 指令' },
  { offset: 0x084, name: 'TRAP9', desc: 'TRAP #9 指令' },
  { offset: 0x088, name: 'TRAP10', desc: 'TRAP #10 指令' },
  { offset: 0x08C, name: 'TRAP11', desc: 'TRAP #11 指令' },
  { offset: 0x090, name: 'TRAP12', desc: 'TRAP #12 指令' },
  { offset: 0x094, name: 'TRAP13', desc: 'TRAP #13 指令' },
  { offset: 0x098, name: 'TRAP14', desc: 'TRAP #14 指令' },
  { offset: 0x09C, name: 'TRAP15', desc: 'TRAP #15 指令' },
];

for (const vec of vectors) {
  const val = readLong(vec.offset);
  addLine(vec.offset, 
    `dc.l\t${toHex(val, 8)}`, 
    `${vec.name}: ${vec.desc}`);
}

// SEGA 标志和ROM头
addSection('ROM 头部 - SEGA 标志和产品信息 (0x000100 - 0x000200)');

const headerFields = [
  { offset: 0x100, size: 4, name: 'SEGA标志', desc: '必须是"SEGA"才能运行' },
  { offset: 0x110, size: 16, name: '厂商/发布日期', desc: '(C)T-25 1994.JUN' },
  { offset: 0x120, size: 48, name: '游戏名(日文)', desc: '国内版名称' },
  { offset: 0x150, size: 48, name: '游戏名(英文)', desc: '海外版名称' },
  { offset: 0x180, size: 14, name: '产品编号', desc: 'GM T-025143-00' },
  { offset: 0x18E, size: 2, name: '校验和', desc: 'ROM校验和' },
  { offset: 0x190, size: 16, name: 'IO支持', desc: '支持的控制器类型' },
  { offset: 0x1A0, size: 4, name: 'ROM起始地址', desc: '$000000' },
  { offset: 0x1A4, size: 4, name: 'ROM结束地址', desc: '$1FFFFF (2MB)' },
  { offset: 0x1A8, size: 4, name: 'RAM起始地址', desc: '$FF0000' },
  { offset: 0x1AC, size: 4, name: 'RAM结束地址', desc: '$FFFFFF (64KB)' },
  { offset: 0x1B0, size: 2, name: 'SRAM标志', desc: '是否支持存档RAM' },
  { offset: 0x1B2, size: 1, name: 'SRAM类型', desc: '' },
  { offset: 0x1B4, size: 4, name: 'SRAM起始地址', desc: '$200001' },
  { offset: 0x1B8, size: 4, name: 'SRAM结束地址', desc: '$203FFF (16KB)' },
];

for (const field of headerFields) {
  let value;
  if (field.size === 2) value = toHex(readWord(field.offset), 4);
  else if (field.size === 4) value = toHex(readLong(field.offset), 8);
  else {
    value = '';
    for (let i = 0; i < field.size; i++) {
      const b = rom[field.offset + i];
      if (b >= 0x20 && b <= 0x7E) value += String.fromCharCode(b);
      else if (b !== 0) value += '.';
    }
  }
  addLine(field.offset, `dc.${field.size === 1 ? 'b' : field.size === 2 ? 'w' : 'l'}\t${value}`, 
    `${field.name}: ${field.desc}`);
}

// ===== Reset 函数 =====
addSection('Reset 函数 - 系统初始化入口 (0x00800A - ???)');

// 从0x800A开始反汇编，直到找到rts或jmp
let pc = 0x800A;
let resetEnd = pc;

// 先找Reset函数的结束位置（通过Ghidra反编译知道它有主循环）
// Reset函数的主要部分
const resetComments = {
  0x800A: 'Reset() 函数入口 - 系统启动',
  0x800E: '读取Z80总线状态寄存器 (0xA10008)',
  0x8014: '检查是否为原装机 (Z80总线值==0)',
  0x801A: '读取扩展控制寄存器',
  0x8020: '检查扩展控制是否为0',
  0x8026: '准备初始化RAM的计数器和基址',
  0x802C: '读取PCB版本号',
  0x8032: '检查PCB版本号低4位',
  0x8038: '写入"SEGA"到TMSS寄存器解锁 (0xA14000)',
  0x803E: '准备VDP寄存器配置循环',
  0x8042: '指向VDP寄存器配置表 (0x80B2)',
  0x8046: '【循环】设置24个VDP寄存器',
  0x8048: '读取寄存器配置值',
  0x804C: '写入VDP控制端口 (VDP_CTRL = 寄存器号 | 0x8000)',
  0x8052: '下一个寄存器号 (+0x100，即寄存器号+1)',
  0x805A: '写入VDP数据端口，清0',
  0x805E: '请求Z80总线',
  0x8062: '复位Z80',
  0x8066: '【循环】等待Z80总线就绪',
  0x806E: '复制Z80驱动程序到Z80 RAM (0xA00000)',
  0x8072: '【循环】复制38字节Z80代码',
  0x807A: '释放Z80复位',
  0x807E: '释放Z80总线',
  0x8082: '再次复位Z80 (启动Z80)',
  0x8086: '【循环】清零系统RAM ($FF8000, 0x3FFF次 = 16KB)',
  0x808E: '清零RAM字',
  0x8096: '设置VDP地址寄存器 (CRAM/VSRAM等)',
  0x809C: '【循环】写CRAM 32次 (32种颜色, 64字节)',
  0x80A2: '【循环】写VSRAM 20次 (20个sprite)',
  0x80A8: '【循环】初始化PSG (可编程声音发生器)',
  0x80B0: '【等待】等待VDP空白期',
  0x80C0: '检查RAM中的SEGA标志',
  0x80CC: '计算ROM校验和',
  0x80E8: '校验和验证失败则红屏死机',
  0x8108: '清零$FF0000开始的0x40字节 (栈底区域)',
  0x811A: '设置已初始化标志 "SEGA"',
  0x8122: '清零剩余RAM区域 ($FF0040 - $FFE000)',
  0x812C: '初始化某个状态变量为0',
  0x8132: '调用FUN_0001ddc8 (未知初始化)',
  0x8138: '设置任务队列指针',
  0x813E: '调用FUN_000086b4 (VDP/显示相关初始化)',
  0x8144: '调用FUN_0000866c (可能是调色板初始化)',
  0x814A: '调用FUN_00009172 (资源/内存初始化)',
  0x8150: '清零$FF8DCC开始的0xA0字节 (对象池/工作区)',
  0x8160: '初始化控制器端口 (CT1, CT2, EXT) 设置为输出模式',
  0x816C: '设置第一个任务 (初始任务指针)',
  0x8178: '调用FUN_00009020 (可能是输入系统初始化)',
  0x817E: '调用FUN_00008a6c (可能是声音系统初始化)',
  0x8184: '调用FUN_0000942a (可能是文件/资源系统初始化)',
  0x818A: '设置主循环当前函数指针 ($FF8000)',
  0x8190: '设置下一个场景 ($FF8004) → 指向 0xC92C',
  0x8194: '检查RAM中是否有PADR标志 (调试模式?)',
  0x819A: '调用FUN_000085ee (场景初始化函数)',
  0x81A0: '清零某个状态变量',
  0x81A6: '调用FUN_00008294 (VBLANK相关设置)',
  0x81AC: '调用FUN_0000c80c (游戏主初始化)',
  0x81B2: '【主循环】',
  0x81B4: '【等待】等待当前任务指针非空',
  0x81B8: '调用当前任务函数 (*($FF810C))()',
  0x81C0: '任务队列前移 (将队列后9项移到前面)',
  0x81C4: '清零队列末尾',
  0x81C8: '更新任务指针',
  0x81CC: '跳回主循环开头',
};

const RESET_END = 0x81CE; // Reset函数主循环的地址（无限循环）

// 反汇编Reset函数
pc = 0x800A;
while (pc < RESET_END && pc < 0x8200) {
  const instr = disassemble(pc);
  const comment = resetComments[pc] || '';
  
  // 识别特殊模式
  if (instr.text.match(/^move/) && pc > 0x8030 && pc < 0x8060) {
    if (!comment) {
      // VDP寄存器设置循环
    }
  }
  
  addLine(pc, instr.text, comment);
  pc += instr.size;
  if (instr.text === 'rts') break;
}

// ===== VBLANK 中断处理函数 =====
addSection('VBLANK 中断处理函数 - 60Hz 垂直回扫 (0x0082B4)');

// VBLANK入口是0x82B4
const vblankAddr = 0x82B4;
const vblankEnd = 0x82E0;

pc = vblankAddr;
while (pc < vblankEnd) {
  const instr = disassemble(pc);
  addLine(pc, instr.text, pc === vblankAddr ? 'VBLANK中断入口' : '');
  pc += instr.size;
  if (instr.text === 'rte' || instr.text === 'rts') break;
}

// ===== HBLANK 中断处理函数 =====
addSection('HBLANK 中断处理函数 - 行扫描中断 (0x0084B8)');

const hblankAddr = 0x84B8;
pc = hblankAddr;
const hblankEnd = 0x84D0;

while (pc < hblankEnd) {
  const instr = disassemble(pc);
  addLine(pc, instr.text, pc === hblankAddr ? 'HBLANK中断入口' : '');
  pc += instr.size;
  if (instr.text === 'rte' || instr.text === 'rts') break;
}

// ===== RAM 变量映射表 =====
addSection('关键 RAM 变量映射表 ($FF0000 - $FFFFFF)');

const ramVars = [
  { addr: 0xFF0000, name: 'boot_sega_flag', size: 4, desc: '初始化标志 "SEGA"，首次启动校验和计算' },
  { addr: 0xFF0004, name: 'boot_padr_flag', size: 4, desc: 'PADR标志，调试/测试模式检测' },
  { addr: 0xFF8000, name: 'main_func_ptr', size: 4, desc: '主循环当前执行函数指针' },
  { addr: 0xFF8004, name: 'next_scene_ptr', size: 4, desc: '下一个场景/状态函数指针' },
  { addr: 0xFF8108, name: 'task_queue', size: 4, desc: '任务队列头指针 (10个任务槽位)' },
  { addr: 0xFF810C, name: 'current_task', size: 4, desc: '当前执行任务 (主循环调用)' },
  { addr: 0xFF8134, name: 'task_queue_end', size: 4, desc: '任务队列尾 (清零位)' },
  { addr: 0xFF815E, name: 'state_var_15e', size: 2, desc: '状态变量' },
  { addr: 0xFF8160, name: 'state_var_160', size: 2, desc: '状态变量' },
  { addr: 0xFF816A, name: 'state_var_16a', size: 2, desc: '状态变量' },
  { addr: 0xFF81C4, name: 'task_queue_ptr', size: 4, desc: '任务队列写指针' },
  { addr: 0xFF8DCC, name: 'object_pool', size: 160, desc: '对象/精灵工作区 (0xA0字节)' },
];

for (const v of ramVars) {
  const sizeStr = v.size === 1 ? 'dc.b' : v.size === 2 ? 'dc.w' : 'dc.l';
  const val = sizeStr + (v.size > 4 ? '' : '\t' + toHex(0, v.size * 2));
  addLine(v.addr, val, `${v.name}: ${v.desc}`);
}

// ===== 硬件寄存器映射 =====
addSection('硬件 I/O 寄存器映射');

const hwRegs = [
  { addr: 0xA10008, name: 'Z80_BUS_STATUS', desc: 'Z80总线状态寄存器' },
  { addr: 0xA11100, name: 'IO_EXT_CTRL', desc: '扩展端口控制寄存器' },
  { addr: 0xA10001, name: 'IO_PCBVER', desc: 'PCB版本号寄存器' },
  { addr: 0xA14000, name: 'TMSS', desc: 'TMSS商标解锁寄存器，写入"SEGA"' },
  { addr: 0xA11100, name: 'IO_CT1_CTRL', desc: '控制器端口1控制' },
  { addr: 0xA11200, name: 'IO_CT2_CTRL', desc: '控制器端口2控制' },
  { addr: 0xC00004, name: 'VDP_CTRL', desc: 'VDP控制端口 (16位)' },
  { addr: 0xC00000, name: 'VDP_DATA', desc: 'VDP数据端口 (16位)' },
  { addr: 0xC00011, name: 'VDP_PSG', desc: 'PSG声音芯片寄存器' },
  { addr: 0xA11200, name: 'IO_Z80BUS', desc: 'Z80总线请求' },
  { addr: 0xA11200, name: 'IO_Z80RES', desc: 'Z80复位控制' },
  { addr: 0xA00000, name: 'Z80_RAM', desc: 'Z80 RAM (8KB)' },
];

for (const reg of hwRegs) {
  addLine(reg.addr, `dc.l\t${toHex(reg.addr, 8)}`, `${reg.name}: ${reg.desc}`);
}

// 输出文件
const outputPath = path.join(__dirname, '..', '20260713', 'asm', 'm68k', 'rom-annotated-part1.asm');
const output = outputLines.join('\n') + '\n';
fs.writeFileSync(outputPath, output);

console.log(`已生成带注释的ROM反汇编: ${outputPath}`);
console.log(`总行数: ${outputLines.length}`);
console.log(`\n内容包括:`);
console.log(`  - ROM 头部向量表 (64个向量)`);
console.log(`  - ROM 产品信息头 (SEGA标志、厂商、容量等)`);
console.log(`  - Reset 函数 (系统初始化、主循环)`);
console.log(`  - VBLANK/HBLANK 中断入口`);
console.log(`  - RAM 变量映射表`);
console.log(`  - 硬件 I/O 寄存器映射`);
