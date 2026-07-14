/**
 * 改进版反汇编器 - 完整解码 16 个命令处理器
 * 重点: 跟踪 (A0)+ 的使用以确定参数消耗
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const rom = fs.readFileSync(ROM_PATH);

function rb(o) { return rom[o] & 0xff; }
function rw(o) { return ((rom[o] & 0xff) << 8) | (rom[o + 1] & 0xff); }
function rl(o) { return ((rom[o] & 0xff) << 24) | ((rom[o + 1] & 0xff) << 16) | ((rom[o + 2] & 0xff) << 8) | (rom[o + 3] & 0xff); }

function signExtend16(v) { return v > 0x7FFF ? v - 0x10000 : v; }
function signExtend8(v) { return v > 0x7F ? v - 0x100 : v; }

// 通用 EA (有效地址) 解码器
function decodeEA(mode, reg, pc) {
  // mode = 高3位, reg = 低3位
  switch (mode) {
    case 0: return { str: `D${reg}`, size: 0 };  // Dn
    case 1: return { str: `A${reg}`, size: 0 };  // An
    case 2: return { str: `(A${reg})`, size: 0 }; // (An)
    case 3: return { str: `(A${reg})+`, size: 0, postInc: reg }; // (An)+
    case 4: return { str: `-(A${reg})`, size: 0, preDec: reg }; // -(An)
    case 5: { // d16(An)
      const d = signExtend16(rw(pc));
      return { str: `${d>=0?'+':''}${d}(A${reg})`, size: 2 };
    }
    case 6: { // d8(An, Xn)
      const w = rw(pc);
      const dn = (w >> 12) & 7;
      const da = (w >> 15) & 1;
      const wl = (w >> 11) & 1;
      const disp = signExtend8(w & 0xFF);
      return { str: `${disp>=0?'+':''}${disp}(A${reg}, ${da?'A':'D'}${dn}.${wl?'L':'W'})`, size: 2 };
    }
    case 7:
      switch (reg) {
        case 0: { // xxx.W
          const w = rw(pc);
          return { str: `0x${w.toString(16)}.W`, size: 2 };
        }
        case 1: { // xxx.L
          const l = rl(pc);
          return { str: `0x${l.toString(16)}.L`, size: 4 };
        }
        case 2: { // d16(PC)
          const d = signExtend16(rw(pc));
          return { str: `${d>=0?'+':''}${d}(PC)`, size: 2, pcRel: true };
        }
        case 3: { // d8(PC, Xn)
          const w = rw(pc);
          const dn = (w >> 12) & 7;
          const da = (w >> 15) & 1;
          const wl = (w >> 11) & 1;
          const disp = signExtend8(w & 0xFF);
          return { str: `${disp>=0?'+':''}${disp}(PC, ${da?'A':'D'}${dn}.${wl?'L':'W'})`, size: 2, pcRel: true };
        }
        case 4: { // #imm
          return { str: `#imm`, size: 2, isImm: true };
        }
        default: return { str: `?mode7.r${reg}`, size: 0 };
      }
    default: return { str: `?m${mode}r${reg}`, size: 0 };
  }
}

// 完整反汇编单条指令
function disasmOne(pc) {
  const startPC = pc;
  const w = rw(pc);
  let size = 2;
  let mnemonic = '';
  let a0PostInc = false;  // 是否读取 (A0)+
  let a0PreDec = false;
  let flowControl = '';  // 'rts', 'bra', 'bcc', etc.
  let flowTarget = 0;
  
  // 4E75 RTS
  if (w === 0x4E75) {
    return { addr: startPC, size: 2, mnemonic: 'RTS', a0PostInc: false, flowControl: 'rts' };
  }
  // 4E71 NOP
  if (w === 0x4E71) {
    return { addr: startPC, size: 2, mnemonic: 'NOP', a0PostInc: false };
  }
  // 4EF9 JMP (addr).L
  if (w === 0x4EF9) {
    const t = rl(pc + 2);
    return { addr: startPC, size: 6, mnemonic: `JMP 0x${t.toString(16)}`, a0PostInc: false, flowControl: 'jmp', flowTarget: t };
  }
  // 4EB9 JSR (addr).L
  if (w === 0x4EB9) {
    const t = rl(pc + 2);
    return { addr: startPC, size: 6, mnemonic: `JSR 0x${t.toString(16)}`, a0PostInc: false, flowControl: 'jsr', flowTarget: t };
  }
  // 4EBA JSR (PC, d16)
  if (w === 0x4EBA) {
    const o = signExtend16(rw(pc + 2));
    const t = pc + 2 + o;
    return { addr: startPC, size: 4, mnemonic: `JSR (PC,d16) -> 0x${t.toString(16)}`, a0PostInc: false, flowControl: 'jsr', flowTarget: t };
  }
  // 4EB8 JSR (xxx).W
  if (w === 0x4EB8) {
    const t = rw(pc + 2);
    return { addr: startPC, size: 4, mnemonic: `JSR 0x${t.toString(16)}.W`, a0PostInc: false, flowControl: 'jsr', flowTarget: t };
  }
  
  // Bcc 系列 (条件分支)
  if ((w & 0xF000) === 0x6000) {
    const cond = (w >> 8) & 0xF;
    const condNames = ['RA','F','HI','LS','CC','CS','NE','EQ','VC','VS','PL','MI','GE','LT','GT','LE'];
    const condName = condNames[cond];
    const lowByte = w & 0xFF;
    if (lowByte === 0) {
      // 16-bit 偏移
      const o = signExtend16(rw(pc + 2));
      const t = pc + 2 + o;
      return { addr: startPC, size: 4, mnemonic: `B${condName}.W 0x${t.toString(16)}`, a0PostInc: false, flowControl: 'bcc', flowTarget: t };
    } else if (lowByte === 0xFF) {
      // 32-bit 偏移 (68020+)
      const o = rl(pc + 2);
      const t = pc + 2 + o;
      return { addr: startPC, size: 6, mnemonic: `B${condName}.L 0x${t.toString(16)}`, a0PostInc: false, flowControl: 'bcc', flowTarget: t };
    } else {
      // 8-bit 偏移
      const o = signExtend8(lowByte);
      const t = pc + 2 + o;
      return { addr: startPC, size: 2, mnemonic: `B${condName}.S 0x${t.toString(16)}`, a0PostInc: false, flowControl: 'bcc', flowTarget: t };
    }
  }
  
  // MOVEQ #imm8, Dn
  if ((w & 0xF100) === 0x7000) {
    const r = (w >> 9) & 7;
    const v = signExtend8(w & 0xFF);
    return { addr: startPC, size: 2, mnemonic: `MOVEQ #0x${(v & 0xFF).toString(16)}, D${r}`, a0PostInc: false };
  }
  
  // MOVE.B/W/L Dn, <ea> 或 <ea>, Dn (通用 MOVE 指令)
  // MOVE 指令编码: 00 ss DDD MMM mmm rrr
  // ss: 01=B, 11=W, 10=L
  if ((w & 0xC000) === 0x0000 && (w & 0x3000) !== 0x0000) {
    const sz = (w >> 12) & 3;
    const sizeNames = { 1: 'B', 3: 'W', 2: 'L' };
    const sizeName = sizeNames[sz];
    if (!sizeName) return { addr: startPC, size: 2, mnemonic: `.word 0x${w.toString(16)}` };
    
    const dstReg = (w >> 9) & 7;
    const dstMode = (w >> 6) & 7;
    const srcMode = (w >> 3) & 7;
    const srcReg = w & 7;
    
    // 源 EA
    const src = decodeEA(srcMode, srcReg, pc + 2);
    let curSize = 2 + src.size;
    
    // 如果源是 #imm, 根据大小读取
    if (src.isImm) {
      if (sz === 1) {
        // B: 1 word (高字节忽略)
        src.str = `#0x${rw(pc + 2).toString(16)}`;
      } else if (sz === 3) {
        // W: 1 word
        src.str = `#0x${rw(pc + 2).toString(16)}`;
      } else if (sz === 2) {
        // L: 2 words
        src.str = `#0x${rl(pc + 2).toString(16)}`;
        curSize += 2;
      }
    }
    
    // 目标 EA (从 pc + curSize 开始)
    const dst = decodeEA(dstMode, dstReg, pc + curSize);
    curSize += dst.size;
    if (dst.isImm) {
      if (sz === 1) {
        dst.str = `#0x${rw(pc + curSize - 2).toString(16)}`;
      } else if (sz === 3) {
        dst.str = `#0x${rw(pc + curSize - 2).toString(16)}`;
      } else if (sz === 2) {
        dst.str = `#0x${rl(pc + curSize - 4).toString(16)}`;
      }
    }
    
    const a0Post = (src.postInc === 0) || (dst.postInc === 0);
    
    // 特殊: MOVEA (目标是 An)
    let mnemonic_prefix = 'MOVE';
    if (dstMode === 1) {
      mnemonic_prefix = 'MOVEA';
      if (sz === 2) mnemonic_prefix = 'MOVEA.L';
      else if (sz === 3) mnemonic_prefix = 'MOVEA.W';
    }
    
    return {
      addr: startPC,
      size: curSize,
      mnemonic: `${mnemonic_prefix}.${sizeName} ${src.str}, ${dst.str}`,
      a0PostInc: a0Post,
      srcPostInc: src.postInc,
      dstPostInc: dst.postInc
    };
  }
  
  // LEA <ea>, An (0100 DDD 111 mmm rrr)
  if ((w & 0xF1C0) === 0x41C0) {
    const dstReg = (w >> 9) & 7;
    const srcMode = (w >> 3) & 7;
    const srcReg = w & 7;
    const src = decodeEA(srcMode, srcReg, pc + 2);
    const a0Post = (src.postInc === 0);
    return {
      addr: startPC,
      size: 2 + src.size,
      mnemonic: `LEA ${src.str}, A${dstReg}`,
      a0PostInc: a0Post,
      srcPostInc: src.postInc
    };
  }
  
  // CLR <ea> (0100 0010 10 ss mmm rrr)
  if ((w & 0xFF00) === 0x4200) {
    const sz = (w >> 6) & 3;
    const sizeNames = { 0: '?', 1: 'B', 2: 'W', 3: 'L' };
    const sizeName = sizeNames[sz] || '?';
    const mode = (w >> 3) & 7;
    const reg = w & 7;
    const ea = decodeEA(mode, reg, pc + 2);
    const a0Post = (ea.postInc === 0);
    return {
      addr: startPC,
      size: 2 + ea.size,
      mnemonic: `CLR.${sizeName} ${ea.str}`,
      a0PostInc: a0Post
    };
  }
  
  // TST <ea> (0100 1010 ss mmm rrr)
  if ((w & 0xFF00) === 0x4A00) {
    const sz = (w >> 6) & 3;
    const sizeNames = { 0: '?', 1: 'B', 2: 'W', 3: 'L' };
    const sizeName = sizeNames[sz] || '?';
    const mode = (w >> 3) & 7;
    const reg = w & 7;
    const ea = decodeEA(mode, reg, pc + 2);
    const a0Post = (ea.postInc === 0);
    return {
      addr: startPC,
      size: 2 + ea.size,
      mnemonic: `TST.${sizeName} ${ea.str}`,
      a0PostInc: a0Post
    };
  }
  
  // CMP <ea>, Dn (1011 DDD ss mmm rrr)
  if ((w & 0xF000) === 0xB000) {
    const sz = (w >> 6) & 3;
    const sizeNames = { 0: '?', 1: 'B', 2: 'W', 3: 'L' };
    const sizeName = sizeNames[sz] || '?';
    const dstReg = (w >> 9) & 7;
    const mode = (w >> 3) & 7;
    const reg = w & 7;
    const ea = decodeEA(mode, reg, pc + 2);
    const a0Post = (ea.postInc === 0);
    let prefix = 'CMP';
    if (mode === 1) prefix = 'CMPA';
    return {
      addr: startPC,
      size: 2 + ea.size,
      mnemonic: `${prefix}.${sizeName} ${ea.str}, D${dstReg}`,
      a0PostInc: a0Post
    };
  }
  
  // ADD/ADDA/SUB/SUBA <ea>, Dn (1101/1001 DDD ss mmm rrr)
  if ((w & 0xF000) === 0xD000 || (w & 0xF000) === 0x9000) {
    const op = (w & 0xF000) === 0xD000 ? 'ADD' : 'SUB';
    const sz = (w >> 6) & 3;
    const sizeNames = { 0: '?', 1: 'B', 2: 'W', 3: 'L' };
    const sizeName = sizeNames[sz] || '?';
    const dstReg = (w >> 9) & 7;
    const mode = (w >> 3) & 7;
    const reg = w & 7;
    const ea = decodeEA(mode, reg, pc + 2);
    const a0Post = (ea.postInc === 0);
    let prefix = op;
    if (mode === 1) prefix = op + 'A';
    return {
      addr: startPC,
      size: 2 + ea.size,
      mnemonic: `${prefix}.${sizeName} ${ea.str}, D${dstReg}`,
      a0PostInc: a0Post
    };
  }
  
  // ADDQ/SUBQ #imm, <ea> (5/4 DDD 0 ss mmm rrr)
  if ((w & 0xF000) === 0x5000 || (w & 0xF000) === 0x4000) {
    const op = (w & 0xF100) === 0x5000 ? 'ADDQ' : 'SUBQ';
    if ((w & 0xF0C0) === 0x50C0 || (w & 0xF0C0) === 0x40C0) {
      // Scc 而非 ADDQ/SUBQ
      // 不处理
    } else {
      const data = (w >> 9) & 7;
      const imm = data === 0 ? 8 : data;
      const sz = (w >> 6) & 3;
      const sizeNames = { 0: '?', 1: 'B', 2: 'W', 3: 'L' };
      const sizeName = sizeNames[sz] || '?';
      const mode = (w >> 3) & 7;
      const reg = w & 7;
      const ea = decodeEA(mode, reg, pc + 2);
      const a0Post = (ea.postInc === 0);
      return {
        addr: startPC,
        size: 2 + ea.size,
        mnemonic: `${op} #${imm}, ${ea.str}`,
        a0PostInc: a0Post
      };
    }
  }
  
  // ORI/ANDI/SUBI/ADDI/EORI/CMPI #imm, <ea> (0000 ss ee mmm rrr)
  if ((w & 0xF000) === 0x0000) {
    const sz = (w >> 6) & 3;
    const op = (w >> 8) & 0xF;
    const opNames = { 0: 'ORI', 1: 'ANDI', 2: 'SUBI', 3: 'ADDI', 4: '?', 5: 'EORI', 6: 'CMPI', 7: '?', 0xA: 'EORI' };
    const opName = opNames[op] || `?op${op}`;
    const sizeNames = { 0: '?', 1: 'B', 2: 'W', 3: 'L' };
    const sizeName = sizeNames[sz] || '?';
    const mode = (w >> 3) & 7;
    const reg = w & 7;
    const ea = decodeEA(mode, reg, pc + 4); // imm 占 2 字节 (B/W) 或 4 字节 (L)
    let immSize = sz === 2 ? 4 : 2;
    let immStr = '';
    if (sz === 1) {
      immStr = `#0x${rw(pc + 2).toString(16)}`;
    } else if (sz === 3) {
      immStr = `#0x${rw(pc + 2).toString(16)}`;
    } else if (sz === 2) {
      immStr = `#0x${rl(pc + 2).toString(16)}`;
    }
    const a0Post = (ea.postInc === 0);
    return {
      addr: startPC,
      size: 2 + immSize + ea.size,
      mnemonic: `${opName}.${sizeName} ${immStr}, ${ea.str}`,
      a0PostInc: a0Post
    };
  }
  
  // JSR (addr).L 已经在前面处理
  
  // BTST/BSET/BCLR/BCHG (静态位号 0000 1000 01/10/11 mmm rrr)
  if ((w & 0xFFC0) === 0x0800 || (w & 0xFFC0) === 0x0840 || (w & 0xFFC0) === 0x0880 || (w & 0xFFC0) === 0x08C0) {
    const op = (w >> 6) & 3;
    const opNames = ['BTST', 'BCHG', 'BCLR', 'BSET'];
    const opName = opNames[op];
    const bit = rw(pc + 2);
    const mode = (w >> 3) & 7;
    const reg = w & 7;
    const ea = decodeEA(mode, reg, pc + 4);
    const a0Post = (ea.postInc === 0);
    return {
      addr: startPC,
      size: 2 + 2 + ea.size,
      mnemonic: `${opName} #${bit}, ${ea.str}`,
      a0PostInc: a0Post
    };
  }
  
  // MOVEM.L (32位寄存器掩码)
  if (w === 0x48E7 || w === 0x4CDF || w === 0x48D8 || w === 0x4CD8) {
    const mask = rw(pc + 2);
    const isPop = (w & 0x0200) !== 0;
    const mnemonic = isPop ? `MOVEM.L (A7)+, regs [0x${mask.toString(16)}]` : `MOVEM.L regs, -(A7) [0x${mask.toString(16)}]`;
    return { addr: startPC, size: 4, mnemonic, a0PostInc: false };
  }
  if ((w & 0xFFC0) === 0x48C0 || (w & 0xFFC0) === 0x4CC0) {
    const mask = rw(pc + 2);
    const sz = (w >> 6) & 1;
    const isPop = (w & 0x0200) !== 0;
    const mode = (w >> 3) & 7;
    const reg = w & 7;
    const ea = decodeEA(mode, reg, pc + 4);
    const sizeName = sz ? 'L' : 'W';
    const mnemonic = isPop ? `MOVEM.${sizeName} ${ea.str}+, regs [0x${mask.toString(16)}]` : `MOVEM.${sizeName} regs, ${ea.str}`;
    return { addr: startPC, size: 4 + ea.size, mnemonic, a0PostInc: (ea.postInc === 0) };
  }
  
  // DBcc Dn, label (0101 ccc 11001 rrr)
  if ((w & 0xF0F8) === 0x50C8) {
    const cond = (w >> 8) & 0xF;
    const condNames = ['RA','F','HI','LS','CC','CS','NE','EQ','VC','VS','PL','MI','GE','LT','GT','LE'];
    const condName = condNames[cond];
    const r = w & 7;
    const o = signExtend16(rw(pc + 2));
    const t = pc + 2 + o;
    return { addr: startPC, size: 4, mnemonic: `DB${condName} D${r}, 0x${t.toString(16)}`, a0PostInc: false, flowControl: 'dbcc', flowTarget: t };
  }
  
  // JMP/JSR <ea> (0100 1110 10/11 mmm rrr)
  if ((w & 0xFFC0) === 0x4EC0 || (w & 0xFFC0) === 0x4E80) {
    const op = (w >> 8) & 1 ? 'JMP' : 'JSR';
    const mode = (w >> 3) & 7;
    const reg = w & 7;
    const ea = decodeEA(mode, reg, pc + 2);
    return {
      addr: startPC,
      size: 2 + ea.size,
      mnemonic: `${op} ${ea.str}`,
      a0PostInc: false,
      flowControl: op.toLowerCase(),
      flowTarget: 0
    };
  }
  
  // LSL/LSR/ROL/ROR/ASL/ASR (1110 ccc dd ii mmm rrr)
  if ((w & 0xF000) === 0xE000) {
    const sz = (w >> 6) & 3;
    const sizeNames = { 0: '?', 1: 'B', 2: 'W', 3: 'L' };
    const sizeName = sizeNames[sz] || '?';
    const direction = (w >> 8) & 1;  // 0=右, 1=左
    const type = (w >> 3) & 3;
    const typeNames = ['AS', 'LS', 'RO', 'ROX'];
    const typeName = typeNames[type];
    const rotType = (type === 1 || type === 3) ? (direction ? 'L' : 'R') : (direction ? 'L' : 'R');
    const opName = typeName + rotType;
    const dnOrImm = (w >> 9) & 7;
    const isImm = (w & 0x0020) === 0;
    const count = isImm ? (dnOrImm === 0 ? 8 : dnOrImm) : dnOrImm;
    const reg = w & 7;
    const srcStr = isImm ? `#${count}` : `D${dnOrImm}`;
    return {
      addr: startPC,
      size: 2,
      mnemonic: `${opName}.${sizeName} ${srcStr}, D${reg}`,
      a0PostInc: false
    };
  }
  
  // 未识别
  return { addr: startPC, size: 2, mnemonic: `.word 0x${w.toString(16).padStart(4,'0')}`, a0PostInc: false };
}

// 反汇编整个命令处理器
function disasmHandler(startAddr, maxLen = 512) {
  const instrs = [];
  let pc = startAddr;
  let count = 0;
  while (pc < startAddr + maxLen && count < 200) {
    const ins = disasmOne(pc);
    instrs.push(ins);
    pc += ins.size;
    count++;
    // 遇到 RTS 或跳回循环停止
    if (ins.flowControl === 'rts') break;
    if (ins.flowControl === 'bra' || ins.flowControl === 'bcc') {
      // 如果跳回 0x1592c (主循环), 停止
      if (ins.flowTarget === 0x1592c) break;
      // 如果跳回 0x1592c 附近, 停止
      if (ins.flowTarget >= 0x1592c && ins.flowTarget <= 0x1592e) break;
    }
  }
  return instrs;
}

const cmdHandlers = [
  0x15952, 0x159D6, 0x159FC, 0x15B2E,
  0x15B58, 0x15B94, 0x15BD0, 0x15C0E,
  0x15C4C, 0x15C7E, 0x15CBC, 0x15CFA,
  0x15D2C, 0x15D78, 0x15E76, 0x15F90
];

console.log('=== 完整解码 16 个命令处理器 ===\n');
const cmdSummary = [];

for (let i = 0; i < 16; i++) {
  const start = cmdHandlers[i];
  console.log(`\n========== cmd ${i} @ 0x${start.toString(16)} ==========`);
  const instrs = disasmHandler(start, 400);
  let a0ReadCount = 0;
  let a0ReadDetails = [];
  
  for (const ins of instrs) {
    const a0mark = ins.a0PostInc ? '   <-- (A0)+' : '';
    console.log(`  0x${ins.addr.toString(16).padStart(6,'0')}: ${ins.mnemonic}${a0mark}`);
    if (ins.a0PostInc) {
      a0ReadCount++;
      a0ReadDetails.push({ addr: ins.addr, mnemonic: ins.mnemonic });
    }
  }
  cmdSummary.push({ cmd: i, addr: start, a0ReadCount, a0ReadDetails, instrCount: instrs.length });
}

console.log('\n\n=== 命令参数消耗总结 ===');
console.log('cmd | addr    | (A0)+ reads | instr count | detail');
console.log('----+---------+-------------+-------------+--------');
for (const s of cmdSummary) {
  const detail = s.a0ReadDetails.map(d => `0x${d.addr.toString(16)}`).join(',');
  console.log(` ${s.cmd.toString().padStart(2)} | 0x${s.addr.toString(16).padStart(5,'0')} | ${s.a0ReadCount.toString().padStart(11)} | ${s.instrCount.toString().padStart(11)} | ${detail}`);
}

// 分析参数类型
console.log('\n\n=== 参数字节大小分析 ===');
for (const s of cmdSummary) {
  console.log(`\ncmd ${s.cmd} 参数读取:`);
  for (const d of s.a0ReadDetails) {
    // 判断是 B/W/L
    let size = '?';
    if (d.mnemonic.includes('.B')) size = '1B';
    else if (d.mnemonic.includes('.W')) size = '2B';
    else if (d.mnemonic.includes('.L')) size = '4B';
    console.log(`  0x${d.addr.toString(16)}: ${d.mnemonic} [${size}]`);
  }
}
