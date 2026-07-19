/**
 * Ram 类单元测试 — 68K 工作内存 (64KB, $FF0000-$FFFFFF)
 *
 * 验证内容:
 *  1. 初始化/清零
 *  2. 地址转换 (68K address → buffer offset)
 *  3. 8/16/32-bit 大端序读写
 *  4. 块操作 (writeBytes/readBytes/fill)
 *  5. 边界条件
 *
 * 运行: node test/ram.test.cjs
 */

'use strict';

// ============================================================
// Ram 类副本 (精确复制 game/core/Ram.ts 的逻辑)
// ============================================================

const RAM_SIZE = 0x10000; // 64KB
const RAM_START = 0xFF0000;

class Ram {
  constructor() {
    this.data = new Uint8Array(RAM_SIZE);
  }

  clear() { this.data.fill(0); }

  /** 68K 绝对地址 → 内部偏移 */
  _toOffset(addr) {
    return addr - RAM_START;
  }

  read8(addr) {
    const off = this._toOffset(addr);
    if (off < 0 || off >= RAM_SIZE) return 0; // 安全边界
    return this.data[off];
  }

  write8(addr, value) {
    const off = this._toOffset(addr);
    if (off < 0 || off >= RAM_SIZE) return;
    this.data[off] = value & 0xFF;
  }

  read16(addr) {
    const off = this._toOffset(addr);
    if (off < 0 || off + 1 >= RAM_SIZE) return 0;
    return (this.data[off] << 8) | this.data[off + 1];
  }

  write16(addr, value) {
    const off = this._toOffset(addr);
    if (off < 0 || off + 1 >= RAM_SIZE) return;
    this.data[off]     = (value >> 8) & 0xFF;
    this.data[off + 1] =  value       & 0xFF;
  }

  read32(addr) {
    const off = this._toOffset(addr);
    if (off < 0 || off + 3 >= RAM_SIZE) return 0;
    // >>> 0 转无符号, 避免 JS 位运算产生负数
    return ((this.data[off]     << 24)
         | (this.data[off + 1] << 16)
         | (this.data[off + 2] << 8)
         |  this.data[off + 3]) >>> 0;
  }

  write32(addr, value) {
    const off = this._toOffset(addr);
    if (off < 0 || off + 3 >= RAM_SIZE) return;
    this.data[off]     = (value >> 24) & 0xFF;
    this.data[off + 1] = (value >> 16) & 0xFF;
    this.data[off + 2] = (value >> 8)  & 0xFF;
    this.data[off + 3] =  value        & 0xFF;
  }

  writeBytes(addr, bytes) {
    const off = this._toOffset(addr);
    if (off < 0 || off + bytes.length > RAM_SIZE) return;
    this.data.set(bytes, off);
  }

  readBytes(addr, length) {
    const off = this._toOffset(addr);
    if (off < 0 || off + length > RAM_SIZE) return new Uint8Array(0);
    return this.data.slice(off, off + length);
  }

  fill(addr, length, value) {
    const off = this._toOffset(addr);
    if (off < 0 || off + length > RAM_SIZE) return;
    this.data.fill(value & 0xFF, off, off + length);
  }
}

// ============================================================
// 测试框架
// ============================================================

let passed = 0;
let failed = 0;
const failures = [];

function assert(condition, label) {
  if (condition) { passed++; }
  else { failed++; failures.push(label); console.log(`  ✗ ${label}`); }
}

function test(name, fn) {
  try {
    fn();
    if (failures.length === 0) {
      // 如果 assert 全通过 → fn 内部没报错
      // 实际通过/失败由 assert 函数统计
    }
  } catch (err) {
    failed++;
    console.log(`  ✗ ${name} — 异常: ${err.message}`);
    failures.push(`${name}: ${err.message}`);
  }
}

// ============================================================
// 测试用例
// ============================================================

console.log('═══════════════════════════════════════════');
console.log('  Ram 单元测试 — 68K 工作内存');
console.log('═══════════════════════════════════════════\n');

// --- 1. 初始化 ---
console.log('[1] 初始化和清零:');

const ram = new Ram();

test('新 Ram 大小为 64KB', () => {
  assert(ram.data.length === RAM_SIZE, `data.length=${ram.data.length}`);
});

test('新 Ram 全零', () => {
  let allZero = true;
  for (let i = 0; i < ram.data.length; i++) {
    if (ram.data[i] !== 0) { allZero = false; break; }
  }
  assert(allZero, 'new Ram should be all zeros');
});

test('clear() 后全零', () => {
  ram.data[0] = 0xFF;
  ram.clear();
  assert(ram.data[0] === 0, 'clear() should reset byte 0 to 0');
});

// --- 2. 地址转换 ---
console.log('\n[2] 地址转换 ($FF0000 → offset 0):');

test('$FF0000 → offset 0', () => {
  assert(ram._toOffset(0xFF0000) === 0);
});

test('$FF8004 → offset 0x8004', () => {
  assert(ram._toOffset(0xFF8004) === 0x8004);
});

test('$FFFFFF → offset 0xFFFF', () => {
  assert(ram._toOffset(0xFFFFFF) === 0xFFFF);
});

// --- 3. 字节读写 ---
console.log('\n[3] 字节读写 (8-bit):');

test('write8/read8 基本', () => {
  ram.write8(0xFF0000, 0xAB);
  assert(ram.read8(0xFF0000) === 0xAB, `read8=${ram.read8(0xFF0000)}`);
});

test('write8 自动截断 >8 bits', () => {
  ram.write8(0xFF0001, 0x1FF);
  assert(ram.read8(0xFF0001) === 0xFF, `should be truncated to 0xFF, got ${ram.read8(0xFF0001)}`);
});

test('read8 不同地址独立', () => {
  ram.write8(0xFF0010, 0x10);
  ram.write8(0xFF0020, 0x20);
  assert(ram.read8(0xFF0010) === 0x10);
  assert(ram.read8(0xFF0020) === 0x20);
});

// --- 4. Word 读写 (大端序) ---
console.log('\n[4] Word 读写 (16-bit 大端序):');

test('write16/read16 大端序', () => {
  ram.write16(0xFF0100, 0xABCD);
  assert(ram.read8(0xFF0100) === 0xAB, `high byte: ${ram.read8(0xFF0100)}`);
  assert(ram.read8(0xFF0101) === 0xCD, `low byte: ${ram.read8(0xFF0101)}`);
  assert(ram.read16(0xFF0100) === 0xABCD, `full word: ${ram.read16(0xFF0100)}`);
});

test('write16 小值 (0x00FF)', () => {
  ram.clear();
  ram.write16(0xFF0200, 0x00FF);
  assert(ram.read8(0xFF0200) === 0x00, `high byte = 0`);
  assert(ram.read8(0xFF0201) === 0xFF, `low byte = 0xFF`);
  assert(ram.read16(0xFF0200) === 0x00FF);
});

test('write16 +8000 then +0001 round trip', () => {
  const addr = 0xFF8004;
  ram.write16(addr, 0x8000);
  ram.write16(addr + 1, 0x0001);
  // 重叠写入会覆盖低字节: 原 data[0x8004]=0x80 data[0x8005]=0x00
  //   write16(addr+1) → data[0x8005]=0x00 data[0x8006]=0x01
  //   所以 read16(addr) = (0x80<<8)|0x00 = 0x8000 (就像真实 RAM 一样)
  assert(ram.read16(addr) === 0x8000, `read16(addr) after overlap: got ${ram.read16(addr).toString(16)}, expected 0x8000`);
  // 验证 addr+1 写入了新值
  assert(ram.read16(addr + 1) === 0x0001, `read16(addr+1) after overlap: ${ram.read16(addr + 1).toString(16)}`);
});

// --- 5. Long 读写 (大端序) ---
console.log('\n[5] Long 读写 (32-bit 大端序):');

test('write32/read32', () => {
  ram.write32(0xFF1000, 0x12345678);
  assert(ram.read8(0xFF1000) === 0x12, `byte 0`);
  assert(ram.read8(0xFF1001) === 0x34, `byte 1`);
  assert(ram.read8(0xFF1002) === 0x56, `byte 2`);
  assert(ram.read8(0xFF1003) === 0x78, `byte 3`);
  assert(ram.read32(0xFF1000) === 0x12345678, `full long`);
});

test('write32 0x00010001 (demo 坐标)', () => {
  const addr = 0xFFA6DE;
  ram.write32(addr, 0x00010001);
  assert(ram.read16(addr) === 0x0001, `x=${ram.read16(addr).toString(16)}`);
  assert(ram.read16(addr + 2) === 0x0001, `y=${ram.read16(addr + 2).toString(16)}`);
});

test('write32 指针地址 (如 $FF1000)', () => {
  ram.write32(0xFF81C0, 0xFFFF1000);
  assert(ram.read16(0xFF81C0) === 0xFFFF, `hi=${ram.read16(0xFF81C0).toString(16)}`);
  assert(ram.read16(0xFF81C2) === 0x1000, `lo=${ram.read16(0xFF81C2).toString(16)}`);
});

// --- 6. 块操作 ---
console.log('\n[6] 块操作:');

test('writeBytes 批量写入', () => {
  ram.clear();
  const data = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05]);
  ram.writeBytes(0xFF1000, data);
  assert(ram.read8(0xFF1000) === 0x01);
  assert(ram.read8(0xFF1001) === 0x02);
  assert(ram.read8(0xFF1004) === 0x05);
});

test('readBytes 批量读取', () => {
  ram.write8(0xFF1005, 0xAA);
  ram.write8(0xFF1006, 0xBB);
  const result = ram.readBytes(0xFF1000, 7);
  assert(result[0] === 0x01, `result[0]=${result[0]}`);
  assert(result[4] === 0x05, `result[4]=${result[4]}`);
  assert(result[5] === 0xAA);
  assert(result[6] === 0xBB);
  assert(result.length === 7);
});

test('fill 填充区域', () => {
  ram.fill(0xFF2000, 128, 0x55);
  assert(ram.read8(0xFF2000) === 0x55);
  assert(ram.read8(0xFF207F) === 0x55);
  assert(ram.read8(0xFF207F + 1) !== 0x55, '超出填充范围不应为 0x55');
});

// --- 7. 关键 RAM 地址验证 ---
console.log('\n[7] 关键 RAM 地址 (来自 ROM 反汇编):');

test('$FF78FA (demo flag) 初始 = 0xFFFF', () => {
  ram.write16(0xFF78FA, 0xFFFF);
  assert(ram.read16(0xFF78FA) === 0xFFFF);
});

test('$FF78FA (demo flag) → 0x0000', () => {
  ram.write16(0xFF78FA, 0x0000);
  assert(ram.read16(0xFF78FA) === 0x0000);
});

test('$FF8004 (TASK_PTR) 读写', () => {
  ram.write32(0xFF8004, 0x0000C92C);
  assert(ram.read32(0xFF8004) === 0x0000C92C);
});

test('$FFA6D4 (TITLE_FLAG) 清空', () => {
  ram.write16(0xFFA6D4, 0);
  assert(ram.read16(0xFFA6D4) === 0);
});

test('$FFAE90 (阶段索引) 遍历', () => {
  for (let i = 0; i < 16; i++) {
    ram.write16(0xFFAE90, i);
    assert(ram.read16(0xFFAE90) === i, `phase ${i}`);
  }
});

// --- 8. RAM 常量范围验证 ---
console.log('\n[8] 地址范围验证:');

test('RAM_START = $FF0000', () => {
  assert(RAM_START === 0xFF0000);
});

test('RAM 结束地址 = $FFFFFF', () => {
  assert(RAM_START + RAM_SIZE - 1 === 0xFFFFFF);
});

test('解压缓冲区 $FF1000 在 RAM 内', () => {
  const off = ram._toOffset(0xFF1000);
  assert(off === 0x1000);
  assert(off + 0x2000 <= RAM_SIZE, 'buffer should have at least 8KB');
});

test('显示队列区域 $FF81CC-$FF8DCC', () => {
  const start = ram._toOffset(0xFF81CC);
  const end   = ram._toOffset(0xFF8DCC);
  assert(start === 0x81CC);
  assert(end === 0x8DCC);
  assert(start < end, 'queue start should be before end');
});

// --- 9. 边界条件 ---
console.log('\n[9] 边界条件:');

test('越界 read8 返回 0', () => {
  assert(ram.read8(0xFEFFFF) === 0, 'address below RAM');
  assert(ram.read8(0x1000000) === 0, 'address above RAM');
});

test('越界 write8 不崩溃', () => {
  // 不应该抛出异常
  ram.write8(0xFEFFFF, 0xFF);
  ram.write8(0x1000000, 0xFF);
  assert(true, 'no crash');
});

test('write16 在最后一个合法地址', () => {
  // 先清除可能受影响的区域
  ram.clear();
  ram.write16(0xFFFFFE, 0xBEEF);
  assert(ram.read8(0xFFFFFE) === 0xBE, `byte FE after write16: ${ram.read8(0xFFFFFE).toString(16)}`);
  assert(ram.read8(0xFFFFFF) === 0xEF, `byte FF after write16: ${ram.read8(0xFFFFFF).toString(16)}`);
  assert(ram.read16(0xFFFFFE) === 0xBEEF, `read16 at FFFFFE: ${ram.read16(0xFFFFFE).toString(16)}`);
});

test('write32 在最后一个合法地址', () => {
  ram.clear();
  ram.write32(0xFFFFFC, 0xDEADBEEF);
  assert(ram.read8(0xFFFFFC) === 0xDE, `byte FC after write32`);
  assert(ram.read8(0xFFFFFD) === 0xAD, `byte FD after write32`);
  assert(ram.read8(0xFFFFFE) === 0xBE, `byte FE after write32`);
  assert(ram.read8(0xFFFFFF) === 0xEF, `byte FF after write32`);
  assert(ram.read32(0xFFFFFC) === 0xDEADBEEF, `read32 at FFFFFC: ${ram.read32(0xFFFFFC).toString(16)}`);
});

// ============================================================
// 总结
// ============================================================
const total = passed + failed;
console.log(`\n═══════════════════════════════════════════`);
console.log(`  Ram 测试: ${passed}/${total} 通过${failed > 0 ? `, ${failed} 失败` : ''}`);
console.log(`═══════════════════════════════════════════`);

if (failures.length > 0) {
  console.log('\n失败详情:');
  failures.forEach(f => console.log(`  - ${f}`));
}

if (passed !== total) {
  console.log(`\n  ⚠ 一共 ${total} 个测试, ${passed} 个通过, ${failed} 个不通过`);
} else {
  console.log(`\n  ✓ 全部 ${total} 个测试通过`);
}

process.exit(failed > 0 ? 1 : 0);
