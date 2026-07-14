/**
 * 定位开场动画 OPENING1/OPENING2 的场景索引和资源
 * 
 * 分析路径:
 * 1. 从场景名称表 (ROM 0x5E1C0) 反查场景索引
 * 2. 分析场景参数表 (ROM 0x061CB0) 中开场动画的资源配置
 * 3. 提取开场动画的 tile/nametable/palette 数据
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

console.log('=== 1. 场景名称表分析 (ROM 0x5E1C0) ===');
// 场景名称表: 每个名称前有一个标签字节
// 格式: [tag][name padded to 16 bytes]
const sceneNames = [];
let nameAddr = 0x5E1C0;
for (let i = 0; i < 20; i++) {
  const tag = rb(nameAddr);
  if (tag === 0 || tag === 0xFF) break;
  let name = '';
  for (let j = 1; j <= 15; j++) {
    const b = rb(nameAddr + j);
    if (b >= 0x20 && b < 0x7F) name += String.fromCharCode(b);
    else break;
  }
  if (name.length > 0) {
    sceneNames.push({ index: i, tag, name, addr: nameAddr });
    console.log(`  [${i}] tag=0x${tag.toString(16)} name="${name}" (ROM 0x${nameAddr.toString(16)})`);
  }
  nameAddr += 16;
}

console.log('\n=== 2. 场景名称标签 → 场景索引映射 ===');
// 标签字节可能是场景索引的编码
// tag 0x29=')' SHOP, 0x2A='*' OPENING1, 0x2B='+' OPENING2, 0x2C=',' ENDING1, 0x30='0' ENDING2
// ASCII值: )=41 *=42 +=43 ,=44 0=48
// 差值: 42-41=1, 43-41=2, 44-41=3, 48-41=7
// 可能直接是场景索引?
const tagToIndex = {};
for (const s of sceneNames) {
  tagToIndex[s.tag] = s.name;
  console.log(`  tag 0x${s.tag.toString(16)} ('${String.fromCharCode(s.tag)}') → "${s.name}"`);
}

console.log('\n=== 3. 搜索 ROM 中对 OPENING1/OPENING2 标签的引用 ===');
// 搜索 tag 字节 0x2A 和 0x2B 的使用
// 在任务代码中可能用 CMPI.B #0x2A 或 MOVEQ #0x2A, Dn
// 来检查当前场景是否是 OPENING1

// 搜索场景名称表基址 0x5E1C0 的引用
const nameTableBase = 0x5E1C0;
console.log(`场景名称表基址: 0x${nameTableBase.toString(16)}`);
// 搜索 LEA 0x5E1C0 或 PEA 0x5E1C0
for (let i = 0; i < rom.length - 6; i++) {
  // LEA abs, An: 0100 xxx1 1111 1001 = 0x41F9/0x43F9/...
  if ((rw(i) & 0xF1FF) === 0x41F9) {
    const target = rl(i + 2);
    if (target === nameTableBase) {
      const reg = (rw(i) >> 9) & 7;
      console.log(`  ROM 0x${i.toString(16)}: LEA 0x${target.toString(16)}, A${reg}`);
    }
  }
}

console.log('\n=== 4. 场景参数表完整分析 (ROM 0x061CB0) ===');
// 场景参数表: 每条目 0x28 字节
// 已知场景3是标题画面, 开场动画可能在其他索引
const sceneParams = [];
for (let i = 0; i < 16; i++) {
  const base = 0x061CB0 + i * 0x28;
  if (base >= rom.length) break;
  const param0 = rw(base);
  if (param0 === 0 && rw(base + 2) === 0) break;
  
  const resourceIds = rl(base + 4);
  const layoutPtr = rl(base + 8);
  const dataPtr = rl(base + 0x14);
  
  sceneParams.push({ index: i, param0, resourceIds, layoutPtr, dataPtr, base });
  console.log(`  场景 ${i}: param=0x${param0.toString(16)}, resIds=0x${resourceIds.toString(16)}, layout=0x${layoutPtr.toString(16)}, data=0x${dataPtr.toString(16)}`);
}

console.log('\n=== 5. 资源ID表分析 (ROM 0x061C34) ===');
// 资源ID表: 每条目 0x1C 字节
// 格式: [resId0][resId1][resId2][resId3]...
for (let i = 0; i < 16; i++) {
  const base = 0x061C34 + i * 0x1C;
  if (base >= rom.length) break;
  const r0 = rw(base);
  const r1 = rw(base + 2);
  const r2 = rw(base + 4);
  const r3 = rw(base + 6);
  if (r0 === 0 && r1 === 0) break;
  
  // 解析资源 ID (bit15=DMA标志, bit0-14=资源索引)
  const ids = [r0, r1, r2, r3].map(r => ({
    raw: r,
    dma: !!(r & 0x8000),
    index: r & 0x7FFF
  }));
  
  console.log(`  场景 ${i}: `);
  for (let j = 0; j < 4; j++) {
    const id = ids[j];
    if (id.raw !== 0) {
      console.log(`    res[${j}]: 0x${id.raw.toString(16)} (DMA=${id.dma}, index=${id.index})`);
    }
  }
}

console.log('\n=== 6. 搜索任务函数中的场景索引比较 ===');
// 搜索 CMPI.W #sceneIdx 或 MOVEQ #sceneIdx
// 开场动画可能在场景索引 4 或 5 (标题画面是3)
// 搜索对 DAT_ffffa49c (场景索引) 的比较
const sceneIdxAddr = 0xFFFFA49C;
// 搜索 MOVE.W (0xFFFFA49C), Dn 或 TST.W (0xFFFFA49C) 等
for (let i = 0; i < rom.length - 8; i++) {
  // MOVE.W (abs).L, Dn: 0x3039 [4B addr]
  if (rw(i) === 0x3039) {
    const addr = rl(i + 2);
    if (addr === sceneIdxAddr) {
      const reg = (rw(i) >> 9) & 7;
      // 向后看是否有 CMPI
      for (let j = i + 6; j < i + 20; j += 2) {
        if (rw(j) === 0x0C40 + (reg << 9)) {
          const cmpVal = rw(j + 2);
          console.log(`  ROM 0x${i.toString(16)}: MOVE.W 0xFFFFA49C, D${reg} → CMPI.W #0x${cmpVal.toString(16)}, D${reg}`);
          break;
        }
        // CMPI.W #imm, Dn: 0x0C40 | (reg << 9)
        if ((rw(j) & 0xF1F8) === 0x0C40) {
          const cmpReg = (rw(j) >> 9) & 7;
          const cmpVal = rw(j + 2);
          if (cmpReg === reg) {
            console.log(`  ROM 0x${i.toString(16)}: MOVE.W 0xFFFFA49C, D${reg} → CMPI.W #0x${cmpVal.toString(16)}, D${reg} (at 0x${j.toString(16)})`);
            break;
          }
        }
      }
    }
  }
  // TST.W (abs)
  if (rw(i) === 0x4A79) {
    const addr = rl(i + 2);
    if (addr === sceneIdxAddr) {
      console.log(`  ROM 0x${i.toString(16)}: TST.W 0xFFFFA49C`);
    }
  }
}

console.log('\n=== 7. 分析 0xC9A0 之后的代码 (标题→开场过渡) ===');
// 从 0xC9A0 开始反汇编更多代码
// 查找场景切换到 OPENING 的逻辑
let pc = 0xC9A0;
const lines = [];
while (pc < 0xCB00) {
  const w = rw(pc);
  let line = `0x${pc.toString(16).padStart(6, '0')}: `;
  let size = 2;
  
  if (w === 0x4E75) { line += 'RTS'; size = 2; }
  else if (w === 0x4EF9) { line += `JMP 0x${rl(pc+2).toString(16)}`; size = 6; }
  else if (w === 0x4EB9) { line += `JSR 0x${rl(pc+2).toString(16)}`; size = 6; }
  else if (w === 0x6100) { line += `BSR.W 0x${(pc+4+rw(pc+2)).toString(16)}`; size = 4; }
  else if ((w & 0xFF00) === 0x6100 && (w & 0xFF) !== 0) { 
    const off = w & 0xFF; const t = pc + 2 + (off > 127 ? off - 256 : off);
    line += `BSR.S 0x${t.toString(16)}`; size = 2; 
  }
  else if (w === 0x6600) { line += `BNE.W 0x${(pc+4+rw(pc+2)).toString(16)}`; size = 4; }
  else if (w === 0x6700) { line += `BEQ.W 0x${(pc+4+rw(pc+2)).toString(16)}`; size = 4; }
  else if (w === 0x6000) { line += `BRA.W 0x${(pc+4+rw(pc+2)).toString(16)}`; size = 4; }
  else if ((w & 0xFF00) === 0x6000) { 
    const off = w & 0xFF; const t = pc + 2 + (off > 127 ? off - 256 : off);
    line += `BRA.S 0x${t.toString(16)}`; size = 2; 
  }
  else if ((w & 0xF1F0) === 0x0C40) { 
    const reg = (w >> 9) & 7; const imm = rw(pc+2);
    line += `CMPI.W #0x${imm.toString(16)}, D${reg}`; size = 4; 
  }
  else if ((w & 0xF1F0) === 0x0C00) { 
    const reg = (w >> 9) & 7; const imm = rw(pc+2);
    line += `CMPI.B #0x${imm.toString(16)}, D${reg}`; size = 4; 
  }
  else if ((w & 0xF100) === 0x7000) {
    const reg = (w >> 9) & 7; const imm = w & 0xFF;
    line += `MOVEQ #${imm}, D${reg}`; size = 2;
  }
  else if ((w & 0xF1F8) === 0x3039) {
    const reg = (w >> 9) & 7; const src = rl(pc+2);
    line += `MOVE.W 0x${src.toString(16)}, D${reg}`; size = 6;
  }
  else if (w === 0x31FC) { 
    const imm = rw(pc+2); const dst = rl(pc+4);
    line += `MOVE.W #0x${imm.toString(16)}, 0x${dst.toString(16)}`; size = 8;
  }
  else if (w === 0x21FC) { 
    const imm = rl(pc+2); const dst = rl(pc+6);
    line += `MOVE.L #0x${imm.toString(16)}, 0x${dst.toString(16)}`; size = 10;
  }
  else if ((w & 0xF1FF) === 0x41F9) {
    const reg = (w >> 9) & 7; const target = rl(pc+2);
    line += `LEA 0x${target.toString(16)}, A${reg}`; size = 6;
  }
  else if (w === 0x4A79) { line += `TST.W 0x${rl(pc+2).toString(16)}`; size = 6; }
  else if (w === 0x4279) { line += `CLR.W 0x${rl(pc+2).toString(16)}`; size = 6; }
  else if (w === 0x4239) { line += `CLR.B 0x${rl(pc+2).toString(16)}`; size = 6; }
  else if (w === 0x33FC) { 
    const imm = rw(pc+2); const dst = rl(pc+4);
    line += `MOVE.W #0x${imm.toString(16)}, 0x${dst.toString(16)}`; size = 8;
  }
  else { line += `.word 0x${w.toString(16)}`; size = 2; }
  
  lines.push(line);
  pc += size;
}
for (const l of lines) console.log(`  ${l}`);
