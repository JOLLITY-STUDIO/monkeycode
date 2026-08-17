/**
 * 生成 3-bank 精简版 Bank31
 *
 * 内存布局:
 *   $FF00-$FF1D: RESET handler（30 字节）
 *   $FF1E-$FF20: Idle loop（JMP $FF1E）
 *   $FF21-$FF2E: NMI handler
 *   $FF2F:       RTI (IRQ handler)
 *   $FFFA-$FFFF: Vectors
 *
 * 实际 RAM 初始化和 MMC3 配置由 JS 驱动层完成
 */

const RESET_ADDR = 0xFF00;
const IDLE_ADDR   = 0xFF1E;
// NMI → Bank31 simple handler at $FF21 (PHA/JSR $8000/RTI → Bank12 audio engine directly)
const NMI_ADDR    = 0xFF21;
const IRQ_ADDR    = 0xFF2F;

function buildBank31(): readonly number[] {
  const SIZE = 0x2000;
  const data = new Array<number>(SIZE).fill(0xFF);

  // ── RESET handler at $FF00 ──
  let o = RESET_ADDR & 0x1FFF; // 0x1F00
  data[o++] = 0x78;             // $FF00: SEI
  data[o++] = 0xD8;             // $FF01: CLD
  // MMC3: map Bank12 to $8000
  data[o++] = 0xA9; data[o++] = 0x06;       // $FF02: LDA #$06
  data[o++] = 0x8D; data[o++] = 0x00; data[o++] = 0x80; // $FF04: STA $8000
  data[o++] = 0xA9; data[o++] = 0x0C;       // $FF07: LDA #$0C
  data[o++] = 0x8D; data[o++] = 0x01; data[o++] = 0x80; // $FF09: STA $8001
  // MMC3: map Bank15 to $A000
  data[o++] = 0xA9; data[o++] = 0x07;       // $FF0C: LDA #$07
  data[o++] = 0x8D; data[o++] = 0x00; data[o++] = 0x80; // $FF0E: STA $8000
  data[o++] = 0xA9; data[o++] = 0x0F;       // $FF11: LDA #$0F
  data[o++] = 0x8D; data[o++] = 0x01; data[o++] = 0x80; // $FF13: STA $8001
  // Enable NMI
  data[o++] = 0xA9; data[o++] = 0x80;       // $FF16: LDA #$80
  data[o++] = 0x8D; data[o++] = 0x00; data[o++] = 0x20; // $FF18: STA $2000
  // Jump to idle
  data[o++] = 0x4C;                         // $FF1B: JMP $FF1E
  data[o++] = IDLE_ADDR & 0xFF;             // $FF1C: $1E
  data[o++] = (IDLE_ADDR >> 8) & 0xFF;      // $FF1D: $FF

  // ── Idle loop at $FF1E ──
  o = IDLE_ADDR & 0x1FFF; // 0x1F1E
  data[o++] = 0x4C;                         // $FF1E: JMP $FF1E
  data[o++] = IDLE_ADDR & 0xFF;
  data[o++] = (IDLE_ADDR >> 8) & 0xFF;

  // ── NMI handler at $FF21 ──
  o = NMI_ADDR & 0x1FFF; // 0x1F21
  data[o++] = 0x48; // PHA
  data[o++] = 0x8A; // TXA
  data[o++] = 0x48; // PHA
  data[o++] = 0x98; // TYA
  data[o++] = 0x48; // PHA
  data[o++] = 0x20; // JSR $8000 → Bank12
  data[o++] = 0x00;
  data[o++] = 0x80;
  data[o++] = 0x68; // PLA → Y
  data[o++] = 0xA8;
  data[o++] = 0x68; // PLA → X
  data[o++] = 0xAA;
  data[o++] = 0x68; // PLA → A
  data[o++] = 0x40; // RTI

  // ── IRQ handler at $FF2F ──
  data[0x1F2F] = 0x40; // RTI

  // ── Vectors at $FFFA-$FFFF ──
  data[0x1FFA] = NMI_ADDR & 0xFF;           // $FFFA: $21
  data[0x1FFB] = (NMI_ADDR >> 8) & 0xFF;    // $FFFB: $FF
  data[0x1FFC] = RESET_ADDR & 0xFF;         // $FFFC: $00
  data[0x1FFD] = (RESET_ADDR >> 8) & 0xFF;  // $FFFD: $FF
  data[0x1FFE] = IRQ_ADDR & 0xFF;           // $FFFE: $2F
  data[0x1FFF] = (IRQ_ADDR >> 8) & 0xFF;    // $FFFF: $FF

  return data;
}

export const PRG_BANK_31_MINIMAL = buildBank31();
export default PRG_BANK_31_MINIMAL;
