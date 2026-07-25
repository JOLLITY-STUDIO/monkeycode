/**
 * 验证 _6502asm.ts 汇编器输出与已有 hex 数据一致
 */
import { asm, _OPCODES } from '../src/tsnes/tsubasa-code/_6502asm';

let passed = 0;
let failed = 0;

function eq(a: readonly number[], b: readonly number[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

function hex(arr: readonly number[]): string {
  return arr.map(n => n.toString(16).toUpperCase().padStart(2,'0')).join(',');
}

function test(name: string, expected: readonly number[], actual: readonly number[]) {
  if (eq(expected, actual)) {
    passed++;
  } else {
    failed++;
    console.log(`✗ ${name}`);
    console.log(`  expected[${expected.length}]: ${hex(expected.slice(0,16))}...`);
    console.log(`  actual  [${actual.length}]: ${hex(actual.slice(0,16))}...`);
  }
}

function show(name: string, actual: readonly number[]) {
  console.log(`  ${name}: [${actual.length}] ${hex(actual)}`);
}

// ── Test 1: builddispatch() - 跳转表分派 ──
{
  const expected = [0xA5, 0x27, 0x0A, 0xAA, 0xBD, 0x0E, 0x80, 0x48, 0xBD, 0x0D, 0x80, 0x48, 0x60];
  const actual = asm`
    LDA $27
    ASL A
    TAX
    LDA $800E,X
    PHA
    LDA $800D,X
    PHA
    RTS
  `;
  test('dispatch', expected, actual);
  if (!eq(expected, actual)) show('disp-err', actual);
}

// ── Test 2: buildsceneLoop() 开头 ──
{
  const expected = [0xA2, 0x02, 0x20, 0xB9, 0xC4, 0x4C, 0x03, 0xA2];
  const actual = asm`
    LDX #$02
    JSR $C4B9
    JMP $A203
  `;
  test('sceneLoop-head', expected, actual);
}

// ── Test 3: buildjumpVectors() - 数据表 (不是指令!) ──
{
  // $800D-$8016: 跳转向量表 (little-endian 地址)
  const expected = [0x65, 0x81, 0x8A, 0x81, 0xAD, 0x81, 0xB4, 0x81, 0xDA, 0x81];
  const actual = asm`
    .dw $8165, $818A, $81AD, $81B4, $81DA
  `;
  test('jumpVectors', expected, actual);
}

// ── Test 4: CHR load 函数 $94D8 ──
{
  // $A4D8-$A4EE: 读 4 bytes CHR bank 配置
  const expected = [
    0xA0, 0x00,           // LDY #$00
    0xB1, 0xE6,           // LDA ($E6),Y
    0x09, 0x80,           // ORA #$80
    0x85, 0x9E,           // STA $9E
    0xC8,                 // INY
    0xB1, 0xE6,           // LDA ($E6),Y
    0x85, 0x9F,           // STA $9F
    0xA0, 0x02,           // LDY #$02
    0xB1, 0xE6,           // LDA ($E6),Y
    0x85, 0xA0,           // STA $A0
    0xC8,                 // INY
    0xB1, 0xE6,           // LDA ($E6),Y
    0x85, 0xA1,           // STA $A1
  ];
  const actual = asm`
    LDY #$00
    LDA ($E6),Y
    ORA #$80
    STA $9E
    INY
    LDA ($E6),Y
    STA $9F
    LDY #$02
    LDA ($E6),Y
    STA $A0
    INY
    LDA ($E6),Y
    STA $A1
  `;
  test('chrLoad', expected, actual);
}

// ── Test 5: 零页变址 + 全部隐含指令 ──
{
  const expected = [
    0x85, 0x4C,  // STA $4C
    0xA6, 0x4C,  // LDX $4C
    0xB5, 0x8E,  // LDA $8E,X
    0x95, 0x8E,  // STA $8E,X
    0xC8,        // INY
    0xCA,        // DEX
    0x38,        // SEC
    0xF8,        // SED
    0xD8,        // CLD
    0x08,        // PHP
    0x28,        // PLP
    0x48,        // PHA
    0x68,        // PLA
    0xBA,        // TSX
    0x9A,        // TXS
    0xA8,        // TAY
    0x98,        // TYA
    0xEA,        // NOP
  ];
  const actual = asm`
    STA $4C
    LDX $4C
    LDA $8E,X
    STA $8E,X
    INY
    DEX
    SEC
    SED
    CLD
    PHP
    PLP
    PHA
    PLA
    TSX
    TXS
    TAY
    TYA
    NOP
  `;
  test('variousImplicit', expected, actual);
}

// ── Test 6: 分支 (标签) ──
{
  // 模拟: LDA #$00 ; LDX #$03 ; DEX ; BEQ @done ; JMP @loop ; RTS
  const expected = [
    0xA9, 0x00,  // LDA #$00
    0xA2, 0x03,  // LDX #$03
    0xCA,        // @loop: DEX
    0xF0, 0x02,  // BEQ @done → rel=+2
    0x4C, 0x00, 0x00, // JMP @loop → offset=2 (DEX那行)
    // @done:
    0x60,        // RTS
  ];
  const actual = asm`
    LDA #$00
    LDX #$03
  @loop:
    DEX
    BEQ @done
    JMP @loop
  @done:
    RTS
  `;
  test('branchLabels', expected, actual);
}

// ── Test 7: 位操作 + 比较 ──
{
  const expected = [
    0x24, 0x4C,  // BIT $4C
    0x2C, 0x00, 0x07, // BIT $0700
    0xC9, 0xFE,  // CMP #$FE
    0xE0, 0x0B,  // CPX #$0B
    0xC4, 0x22,  // CPY $22
  ];
  const actual = asm`
    BIT $4C
    BIT $0700
    CMP #$FE
    CPX #$0B
    CPY $22
  `;
  test('bitCmp', expected, actual);
}

// ── Test 8: abs,X / abs,Y ──
{
  const expected = [
    0x9D, 0x2A, 0x06,  // STA $062A,X
    0xB9, 0x00, 0x07,  // LDA $0700,Y
    0x7D, 0x00, 0x80,  // ADC $8000,X
  ];
  const actual = asm`
    STA $062A,X
    LDA $0700,Y
    ADC $8000,X
  `;
  test('absIdx', expected, actual);
}

// ── Summary ──
console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
