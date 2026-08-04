/**
 * ASM 交叉引用分析工具
 * 分析所有 Bank 之间的 JSR/JMP 调用关系，检测 CDL 标记矛盾
 */
const fs = require('fs');
const path = require('path');

const ASM_DIR = path.join(__dirname, '..', '_tmp_disasm_out', 'bzk_output');
const banks = [
  'bank_00_code.asm',
  'bank_01_code.asm',
  'bank_02_nmi.asm',
  'bank_03_data.asm',
  'bank_04_code.asm',
  'bank_05_data.asm',
  'bank_06_code.asm',
  'bank_07_fixed.asm',
];

/** 解析汇编文件中的地址和标记 */
function parseAsm(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  const addresses = {};   // addr -> { bank, addr, flags, instruction, operand }
  const calls = [];       // { fromAddr, fromBank, toAddr, opcode }
  const dataBytes = {};   // addr -> [bytes]
  
  for (const line of lines) {
    // 匹配汇编行: C - - - - - 0x004088 01:8078: 20 C2 C2  JSR $C2C2
    const asmMatch = line.match(/^([C\-]) ([D\-]) ([0-9\-]) ([I\-]) ([J\-]) ([T\-]) ([A\-]) \s+
      (0x[0-9A-Fa-f]+)\s+([0-9A-Fa-f]+):([0-9A-Fa-f]+):\s+
      (?:([0-9A-Fa-f]{2}(?:\s+[0-9A-Fa-f]{2})*)\s+)?(.+)$/x);
    
    if (!asmMatch) continue;
    
    const flags = {
      C: asmMatch[1] === 'C',  // code
      D: asmMatch[2] === 'D',  // data
      num: asmMatch[3],
      I: asmMatch[4] === 'I',  // indirect ref
      J: asmMatch[5] === 'J',  // jump target
      T: asmMatch[6] === 'T',
      A: asmMatch[7] === 'A',
    };
    
    const romOffset = parseInt(asmMatch[8], 16);
    const bank = parseInt(asmMatch[9], 16);
    const addr = parseInt(asmMatch[10], 16);
    const rawBytes = asmMatch[11] ? asmMatch[11].trim().split(/\s+/).map(b => parseInt(b, 16)) : [];
    const instruction = asmMatch[12] ? asmMatch[12].trim() : '';
    
    addresses[addr] = {
      bank, addr, flags, romOffset, instruction, rawBytes, line
    };
    
    // 解析指令中的目标地址
    const instUpper = instruction.toUpperCase();
    
    // JSR $XXXX
    let m = instUpper.match(/JSR\s+\$([0-9A-F]{4})/);
    if (m) {
      calls.push({
        type: 'JSR',
        fromBank: bank,
        fromAddr: addr,
        toAddr: parseInt(m[1], 16),
        instruction,
        fromFlags: flags,
      });
    }
    
    // JMP $XXXX (absolute)
    m = instUpper.match(/JMP\s+\$([0-9A-F]{4})/);
    if (m && !instUpper.includes('(')) {
      calls.push({
        type: 'JMP',
        fromBank: bank,
        fromAddr: addr,
        toAddr: parseInt(m[1], 16),
        instruction,
        fromFlags: flags,
      });
    }
    
    // JMP ($XXXX) indirect
    m = instUpper.match(/JMP\s+\(\$([0-9A-F]{4})\)/);
    if (m) {
      calls.push({
        type: 'JMP_INDIRECT',
        fromBank: bank,
        fromAddr: addr,
        toAddr: parseInt(m[1], 16),
        instruction,
        fromFlags: flags,
      });
    }
    
    // BEQ/BNE/BCC/BCS/BMI/BPL/BVC/BVS $XXXX
    m = instUpper.match(/(B(?:EQ|NE|CC|CS|MI|PL|VC|VS))\s+\$([0-9A-F]{4})/);
    if (m) {
      calls.push({
        type: 'BRANCH',
        fromBank: bank,
        fromAddr: addr,
        toAddr: parseInt(m[2], 16),
        instruction,
        fromFlags: flags,
      });
    }
    
    // 数据字节
    m = instUpper.match(/^\.byte\s+(.+)$/);
    if (m) {
      dataBytes[addr] = rawBytes;
    }
    
    // .word 指令 (地址表)
    m = instUpper.match(/^\.word\s+(.+)$/);
    if (m) {
      const words = m[1].split(',').map(w => {
        const s = w.trim().replace('$', '');
        return parseInt(s, 16);
      });
      dataBytes[addr] = [];
      for (const w of words) {
        dataBytes[addr].push(w & 0xFF);
        dataBytes[addr].push((w >> 8) & 0xFF);
      }
    }
  }
  
  return { addresses, calls, dataBytes };
}

// 主分析
console.log('=== ASM 交叉引用分析 ===\n');

const allCalls = [];
const allAddresses = {};
const allDataBytes = {};

for (const bankFile of banks) {
  const filePath = path.join(ASM_DIR, bankFile);
  if (!fs.existsSync(filePath)) {
    console.log(`[跳过] ${bankFile} (不存在)`);
    continue;
  }
  
  const result = parseAsm(filePath);
  Object.assign(allAddresses, result.addresses);
  Object.assign(allDataBytes, result.dataBytes);
  allCalls.push(...result.calls);
}

console.log(`总地址数: ${Object.keys(allAddresses).length}`);
console.log(`总调用数: ${allCalls.length}\n`);

// 按目标地址分组调用
const callsByTarget = {};
for (const call of allCalls) {
  const key = call.toAddr;
  if (!callsByTarget[key]) callsByTarget[key] = [];
  callsByTarget[key].push(call);
}

// 分析: 被调用但目标为 data 的情况
console.log('=== 被 JSR/JMP 调用但 CDL 标记为 data 的目标地址 ===\n');

let issueCount = 0;
for (const [targetAddrStr, calls] of Object.entries(callsByTarget)) {
  const targetAddr = parseInt(targetAddrStr);
  
  // 跳过 Bank 内的近调用
  const firstCall = calls[0];
  
  // 检查目标地址是否存在
  const target = allAddresses[targetAddr];
  
  // 判断目标所在的 bank 范围
  let targetBank = null;
  if (targetAddr < 0x8000) {
    targetBank = 'RAM/ZP';
  } else if (targetAddr >= 0x8000 && targetAddr < 0xA000) {
    targetBank = 'PRG0 ($8000-$9FFF)';
  } else if (targetAddr >= 0xA000 && targetAddr < 0xC000) {
    targetBank = 'PRG1 ($A000-$BFFF)';
  } else if (targetAddr >= 0xC000) {
    targetBank = 'FIXED ($C000-$FFFF)';
  }
  
  if (!target && targetAddr >= 0x8000) {
    console.log(`[WARN] 目标 $${targetAddr.toString(16).toUpperCase().padStart(4, '0')} 不存在于ASM`);
    for (const c of calls) {
      console.log(`  <- Bank ${c.fromBank} $${c.fromAddr.toString(16).toUpperCase().padStart(4, '0')}: ${c.type} ${c.instruction}`);
    }
    issueCount++;
    continue;
  }
  
  if (target && !target.flags.C) {
    // 目标不是 code (可能是 data)
    console.log(`[ISSUE] $${targetAddr.toString(16).toUpperCase().padStart(4, '0')} 被调用但标记为 data (C=${target.flags.C}, D=${target.flags.D})`);
    console.log(`  目标: Bank ${target.bank} ROM=0x${target.romOffset.toString(16).toUpperCase()}, ${target.instruction}`);
    for (const c of calls) {
      console.log(`  <- Bank ${c.fromBank} $${c.fromAddr.toString(16).toUpperCase().padStart(4, '0')}: ${c.type}`);
    }
    issueCount++;
  }
}

console.log(`\n发现 ${issueCount} 个CDL矛盾\n`);

// 统计 Bank 1 调用 Bank 7 的情况
console.log('=== Bank 1 → Bank 7 ($C000-$FFFF) 调用关系 ===\n');

for (const call of allCalls) {
  if (call.fromBank === 1 && call.toAddr >= 0xC000) {
    const target = allAddresses[call.toAddr];
    const isCode = target ? target.flags.C : 'N/A';
    const isData = target ? target.flags.D : 'N/A';
    console.log(`  Bank1 $${call.fromAddr.toString(16).toUpperCase().padStart(4, '0')} → $${call.toAddr.toString(16).toUpperCase().padStart(4, '0')} ` +
      `[${call.type}] C=${isCode} D=${isData} | ${call.instruction}`);
  }
}

// 列表所有数据地址中被间接引用的
console.log('\n=== Bank 7 中被跨Bank调用的地址 (可能是脚本引擎) ===\n');

for (const [addrStr, calls] of Object.entries(callsByTarget)) {
  const addr = parseInt(addrStr);
  if (addr >= 0xC000 && addr <= 0xDFFF) {
    const target = allAddresses[addr];
    const callers = calls.map(c => `Bank${c.fromBank}:$${c.fromAddr.toString(16).toUpperCase().padStart(4, '0')}`).join(', ');
    const flags = target ? `C=${target.flags.C} D=${target.flags.D}` : 'N/A';
    console.log(`  $${addr.toString(16).toUpperCase().padStart(4, '0')} [${flags}] <- ${callers}`);
  }
}

// 分析 Bank 7 中 $C200-$C3FF 区域（这些可能是脚本引擎的数据/代码混合区）
console.log('\n=== Bank 7 $C200-$C3FF 区域扫描 ===\n');

const c2Region = [];
for (const [addrStr, entry] of Object.entries(allAddresses)) {
  const addr = parseInt(addrStr);
  if (entry.bank === 7 && addr >= 0xC200 && addr <= 0xC3FF) {
    c2Region.push({ addr, ...entry });
  }
}
c2Region.sort((a, b) => a.addr - b.addr);

// 显示连续的 code 段
let currentCodeRun = null;
for (const entry of c2Region) {
  if (entry.flags.C) {
    if (!currentCodeRun) {
      currentCodeRun = { start: entry.addr, end: entry.addr, entries: [] };
    }
    currentCodeRun.end = entry.addr;
    currentCodeRun.entries.push(entry);
  } else {
    if (currentCodeRun) {
      console.log(`  CODE: $${currentCodeRun.start.toString(16).toUpperCase()} - $${currentCodeRun.end.toString(16).toUpperCase()} (${currentCodeRun.entries.length} 条指令)`);
      currentCodeRun = null;
    }
  }
}
if (currentCodeRun) {
  console.log(`  CODE: $${currentCodeRun.start.toString(16).toUpperCase()} - $${currentCodeRun.end.toString(16).toUpperCase()} (${currentCodeRun.entries.length} 条指令)`);
}

// 显示 Bank 1 中 Bank 0 调用的关键函数
console.log('\n=== Bank 1 JSR 到内部地址 ($8014, $801D, $8020, $803B, $8059) ===\n');

const keyAddrs = [0x8014, 0x801D, 0x8020, 0x803B, 0x8059];
for (const addr of keyAddrs) {
  const entry = allAddresses[addr];
  if (entry && entry.bank === 1) {
    console.log(`  $${addr.toString(16).toUpperCase()}: ${entry.instruction} [C=${entry.flags.C} D=${entry.flags.D}]`);
  } else {
    console.log(`  $${addr.toString(16).toUpperCase()}: 未找到`);
  }
}

// 输出 Bank 1 $C05B-$C213 完整子状态代码
console.log('\n=== Bank 1 标题子状态完整代码 ($C05B-$C213) ===\n');

for (const [addrStr, entry] of Object.entries(allAddresses)) {
  const addr = parseInt(addrStr);
  if (entry.bank === 1 && addr >= 0xC05B && addr <= 0xC250) {
    const flag = entry.flags.C ? 'C' : (entry.flags.D ? 'D' : '?');
    console.log(`  [${flag}]$${addr.toString(16).toUpperCase().padStart(4, '0')}: ${entry.instruction}`);
  }
}
