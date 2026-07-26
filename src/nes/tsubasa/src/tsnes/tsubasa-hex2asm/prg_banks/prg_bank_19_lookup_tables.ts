/**
 * PRG-ROM MMC3 bank 19 (8KB) — function-based assembly
 * Mapper: 4 (MMC3) | CPU: $8000-$9FFF
 * CDL: code=877 data=5021 unaccessed=2294
 *
 * 功能: 辅助数据表 (code=877, mostly data)
 *
 * Pattern: 参考 bank_31.ts
 *   每个 build_xxx() 函数返回其覆盖地址范围的 raw 6502 字节，
 *   最后通过 spread 拼成完整的 8KB 数组
 */


import { asm } from '../_6502asm';
export { _PRG_BANK_19 as default };

console.log('[prg_19_lookup_tables] loaded');

// $8000-$83FF (1024B): $8000-$83FF 代码/数据段1
function build_8000_83FF_seg1(): readonly number[] {
  return asm`
  BRK
  BRK
  BRK
  BRK
  BRK
@E005:
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  .byte $5F
  ADC $01,X
  ORA ($5F,X)
  ADC $01,X
  ORA ($5F,X)
  ADC $01,X
  ORA ($5F,X)
  ADC $77,X
  ADC $7D77,X
  ADC $7D77,X
  .byte $77, $77
  ADC $7D77,X
  ADC $7D77,X
  .byte $77
  ROR $7E7C,X
  .byte $7C, $7C
  ROR $7E7C,X
  ROR $7E7C,X
  .byte $7C, $7C
  ROR $7E7C,X
  ROR $74,X
  ORA ($01,X)
  ROR $74,X
  ORA ($01,X)
  ROR $74,X
  ORA ($01,X)
  ROR $74,X
  ORA ($01,X)
  ORA ($01,X)
  CPY #$00
  ORA ($01,X)
  ORA ($83,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  STY $85
  BCC $E005
  STX $87
  .byte $92, $93
  STY $988D
  STA $8F8E,Y
  TXS
  .byte $9B
  STY $95,X
  .byte $C2
  CMP ($96,X)
  .byte $C2, $C2
  CMP ($99,X)
  STA $C99D,X
  .byte $9B, $9F
  DEX
  AXS #$01
  LDA $B0
  LDA ($01),Y
  ORA ($B2,X)
  .byte $B3
  ORA ($01,X)
  ORA ($B9,X)
  ORA ($01,X)
  ORA ($01,X)
  LDY $B5,X
  CPX #$E1
  LDX $B7,Y
  .byte $E2, $E3
  LDY $E8BD,X
  SBC #$BE
  .byte $BF
  NOP
  SBC #$97
  .byte $C3, $9C, $9C, $97, $C3, $9C, $9C, $97, $C3, $9C, $9C
  TSX
  .byte $BB, $BB, $BB
  INY
  .byte $82
  TXA
  TXA
  .byte $9E
  DEY
  LDY #$A0
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  CPY $C5
  BNE $E0A5
  CPY $C5
  CMP $D3
  CPY $CDCD
  CMP $CFCE,Y
  NOP
  .byte $DB, $D4
  CMP $89,X
  .byte $8B
  DEC $D7,X
  LDY $A2
  CMP $A6DD,Y
  .byte $A7, $DB, $DF
  TAY
  LDA #$00
  LDA ($01,X)
  ORA ($A3,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($0D,X)
  ORA $0D0D
  ORA ($10),Y
  .byte $3C
  CLC
  .byte $13, $12
  ASL A
  ANC #$00
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA $3C10,Y
  BPL $E133
  .byte $12
  ASL A
  .byte $12
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $3C, $3C
  CLC
@E133:
  ORA $120A,Y
  ANC #$0E
  CLC
  ORA $103C,Y
  ANC #$0E
  .byte $12
  ASL A
  .byte $3C, $3C
  BPL $E155
  .byte $12
  ASL A
  ASL A
  .byte $13
  ORA ($10),Y
  .byte $3C, $3C, $13
  ASL A
  ASL A
  .byte $12
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  BVC $E1B3
  .byte $54
  EOR $52,X
  .byte $53
  LSR $57,X
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  .byte $52, $53
  LSR $57,X
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  BVC $E1D6
  EOR $01,X
  .byte $52
  LSR $57,X
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($0D,X)
  ORA $0D0D
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  BVC $E1FB
  .byte $54
  EOR $52,X
  .byte $53
  LSR $57,X
  ORA ($01,X)
  ORA ($01,X)
  CLI
  EOR $015C,Y
  NOP
  .byte $5B
  LSR $0F5F,X
  .byte $0F, $0F, $0F
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  CPX $E5
  BEQ $E1C5
  INC $E7
@E1D6:
  .byte $F2, $F3
  CPX $F8ED
  SBC $EFEE,Y
  NOP
  .byte $FB, $F4
  SBC $FD,X
  ORA ($F6,X)
  .byte $F7
  ORA ($01,X)
  .byte $FC
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($9C,X)
  .byte $9C
  INC $9CFF,X
  .byte $9C
  INC $9CFF,X
  .byte $9C
  INC $22FF,X
  .byte $22
  DEC $8ADC,X
  TXA
  DEC $C7
  LDY #$A0
  .byte $D2
  CLD
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  CMP $DDDD,X
  CMP $D5D5,X
  CMP $D5,X
  .byte $DF, $DF, $DF, $DF
  DEC $D6,X
  DEC $D6,X
  CMP $D1D4,X
  ORA ($D5,X)
  CMP $D4,X
  .byte $D3, $DF, $DF, $DF
  CMP $D6D6,Y
  DEC $D0,X
  CPY $CCCC
  .byte $D2
  DEC $CECE
  CLD
  CPY $CCCC
  .byte $D2
  DEC $CECE
  CLD
  AXS #$CB
  AXS #$DA
  AXS #$CB
  AXS #$DA
  AXS #$CB
  AXS #$DA
  AXS #$CB
  AXS #$E5
  .byte $F3, $F3
  CPX $01E7
  .byte $EF
  INC $0001
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  SBC ($E0),Y
  ORA ($01,X)
  .byte $F2
  EOR $01E0
  ORA ($01,X)
  .byte $E2
  CPX #$01
  ORA ($01,X)
  .byte $E2, $F2, $F2, $F2, $F2, $F2, $F2, $F2, $F2
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  CPX $F0
  ORA ($E4,X)
  JMP $E4F2
  INC $01
  ORA ($E6,X)
  ORA ($01,X)
  ORA ($50,X)
  EOR ($54),Y
  EOR $52,X
  .byte $53
  LSR $57,X
  ORA ($01,X)
  ORA ($01,X)
  ORA $0D0D
  ORA $CCCC
  CPY $CECC
  DEC $CECE
  CPY $CCCC
  CPY $CECE
  DEC $CBCE
  AXS #$CB
  AXS #$CB
  AXS #$CB
  AXS #$CB
  AXS #$CB
  AXS #$CB
  AXS #$CB
  AXS #$F3
  .byte $F3, $F3, $F3
  ORA ($01,X)
  ORA ($01,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA ($C1,X)
  CPY $CD
  .byte $C3
  CPY $C5
  CMP $C9
  .byte $CF, $CF, $CF
  CPY #$C6
  DEC $C6
  CMP $CDCD
  CMP $C5C5
  CMP $C5
  .byte $CF, $CF, $CF, $CF
  DEC $C6
  DEC $C6
  .byte $C2
  CPY $CCCC
  INY
  DEC $CECE
  .byte $C2
  CPY $CCCC
  INY
  DEC $CECE
  DEX
  AXS #$CB
  AXS #$CA
  AXS #$CB
  AXS #$CA
  AXS #$CB
  AXS #$E1
  AXS #$CB
  AXS #$E3
  INX
  .byte $F3, $F3
  ORA ($EA,X)
  SBC #$01
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ROL A
  ANC #$2A
  ANC #$2B
  ROL A
  ANC #$2A
  ROL A
  ANC #$2A
  ANC #$2B
  BIT $382D
  ROL A
  ANC #$2A
  ANC #$2B
  ROL A
  ANC #$2A
  ROL A
  ANC #$2A
  ANC #$00
  ROL $2A2F
  DEX
  AXS #$CB
  AXS #$CA
  AXS #$CB
  AXS #$00
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  AXS #$CB
  AXS #$CB
  AXS #$CB
  AXS #$CB
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  AXS #$CB
  AXS #$DA
  AXS #$CB
  AXS #$DA
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  CMP #$CF
  .byte $CF, $CF
  CMP #$CF
  .byte $CF, $CF
  CMP #$CF
  .byte $CF, $CF
  CPY #$C6
  DEC $C6
  .byte $CF, $CF, $CF, $CF, $CF, $CF, $CF, $CF, $CF, $CF, $CF, $CF
  DEC $C6
  DEC $C6
  .byte $CF, $CF, $CF
  CMP $CFCF,Y
  .byte $CF
  CMP $CFCF,Y
  .byte $CF
  CMP $C6C6,Y
  DEC $D0
  CMP $D5,X
  CMP $D4,X
  .byte $D7, $D7, $D7, $D7
  CMP $DDDD,X
  CMP $D5D5,X
  CMP $D5,X
  CMP ($01),Y
  ORA ($01,X)
  .byte $D4
  CMP ($01),Y
  ORA ($DD,X)
  .byte $D4
  CMP ($01),Y
  CMP $D5,X
  .byte $D4, $D3
  ORA ($01,X)
  ORA ($C1,X)
  ORA ($01,X)
  CMP ($C4,X)
  ORA ($C1,X)
  CPY $CD
  .byte $C3
  CPY $C5
  CMP $C4
  CMP $C5
  CMP $C7
  .byte $C7, $C7, $C7
  CMP $CDCD
  CMP $C5C5
  CMP $C5
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA ($01,X)
  ORA ($C5,X)
  ORA ($C5,X)
  BNE $E3C9
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  `;
}

// $8400-$87FF (1024B): $8400-$87FF 代码/数据段2
function build_8400_87FF_seg2(): readonly number[] {
  return asm`
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($C5,X)
  ORA ($C5,X)
  .byte $D0, $D1  ; BNE $83E1
  ORA ($01,X)
  ORA ($C5,X)
  ORA ($C5,X)
  .byte $D0, $D1  ; BNE $83E9
  .byte $D0, $D1  ; BNE $83EB
  .byte $D4
  CMP $CDD4
  CMP $D0CD
  CMP ($D4),Y
@E423:
  CMP $CDD4
  CMP $CDCD
  CMP $CDCD
  CMP $CDCD
  CMP $CDCD
  CMP $CDCD
  CMP $CDCD
  CMP $CDCD
  CMP $CDCD
  CMP $CDCD
  CMP $CDCD
  CMP $CDCD
  CMP $0000
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BNE $E423
  .byte $D4
  CMP $CDD4
  CMP $00CD
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  CLD
  .byte $C7, $D2, $D3
  CLD
  CLD
  CLD
  .byte $C7
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  DEC $01,X
  ORA ($01,X)
  .byte $D2, $D3
  DEC $01,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  CLD
  .byte $C7, $D2, $D3
  CLD
  CLD
  CLD
  .byte $C7
  CLD
  CLD
  CLD
  CLD
  CLD
  CLD
  CLD
  CLD
  DEC $01,X
  ORA ($01,X)
  .byte $D2, $D3
  DEC $01,X
  CLD
  .byte $C7, $D2, $D3
  CLD
  CLD
  CLD
  .byte $C7
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  DEC $01,X
  ORA ($01,X)
  .byte $D2, $D3
  DEC $01,X
  CLD
  CLD
  CLD
  CLD
  CLD
  CLD
  CLD
  CLD
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  CLD
  CLD
  CLD
  CLD
  CLD
  CLD
  CLD
  CLD
  CLD
  CLD
  CLD
  CLD
  CLD
  CLD
  CLD
  CLD
  .byte $7B
  ADC $0101,Y
  ORA ($7B,X)
  ADC $0101,Y
  ORA ($7B,X)
  ADC $0101,Y
  ORA ($7B,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ADC $0101,Y
  ORA ($7B,X)
  ADC $0101,Y
  ORA ($7B,X)
  ADC $0001,Y
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $6F, $74
  ORA ($01,X)
  ROR $77,X
  .byte $7C
  ORA ($01,X)
  ORA $14,X
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  .byte $73
  ADC ($7B),Y
  ORA ($01,X)
  .byte $73
  ADC ($00),Y
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ADC $7A01,Y
  SEI
  .byte $7B
  ADC $7A01,Y
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA ($73,X)
  ADC ($7B),Y
  ORA ($01,X)
  .byte $73
  ADC ($01),Y
  ORA ($01,X)
  .byte $73
  ORA ($01,X)
  ORA ($01,X)
  ADC $7A01,Y
  SEI
  .byte $7B
  ADC $7A01,Y
  ADC ($7B),Y
  ADC $7301,Y
  ADC ($7B),Y
  ADC $7072,Y
  BVS $E5C4
  SEI
  .byte $72
  BVS $E5C8
  NOP
  SEI
  .byte $72
  BVS $E55E
  NOP
@E55E:
  SEI
  .byte $72
  BVS $E5D2
  BVS $E5D4
  BVS $E5D6
  BVS $E5D8
  BVS $E5DA
  BVS $E5DC
  BVS $E5DE
  BVS $E5E0
  ORA ($01,X)
  .byte $64
  ADC $01
  ROR $67
  JMP ($6D01)
  ROR $0101
  ORA ($01,X)
  ORA ($01,X)
  ORA ($68,X)
  ROR A
  ORA ($68,X)
  ROR A
  ORA ($00,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($68,X)
  ORA ($01,X)
  PLA
  ROR A
  ORA ($68,X)
  ROR A
  ORA ($68,X)
  ROR A
  ORA ($01,X)
  ROR A
  ORA ($01,X)
  ORA ($62,X)
  .byte $63
  ORA ($68,X)
  .byte $63
  ORA ($68,X)
  ROR A
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ROR A
  ADC #$6B
  ORA ($69,X)
  ARR #$01
  ORA ($00,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  RTS
  RTS
@E5D2:
  RTS
  ADC ($60,X)
  RTS
@E5D6:
  ADC ($62,X)
@E5D8:
  RTS
  ADC ($62,X)
  .byte $63
@E5DC:
  ADC ($62,X)
@E5DE:
  .byte $63
  ORA ($62,X)
  .byte $63
  ORA ($68,X)
  .byte $63
  ORA ($68,X)
  ROR A
  ORA ($68,X)
  ROR A
  ADC #$68
  ROR A
  ADC #$6B
  ROR A
  ADC #$6B
  ORA ($69,X)
  ARR #$01
  ORA ($6B,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($60,X)
  RTS
  RTS
  RTS
  RTS
  RTS
  RTS
  RTS
  RTS
  RTS
  RTS
  RTS
  RTS
  RTS
  RTS
  RTS
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  EOR ($01),Y
  ORA ($01,X)
  EOR $50
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  EOR $50
  EOR ($01),Y
  EOR ($01),Y
  EOR $50
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  EOR $05
  CLI
  .byte $54
  EOR ($05),Y
  CLI
  .byte $54
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  EOR ($01),Y
  ORA ($01,X)
  EOR $50
  ORA ($01,X)
  EOR ($01),Y
  ORA ($01,X)
  EOR $50
  EOR $50
  EOR ($01),Y
  EOR ($01),Y
  EOR $50
  EOR $50
  EOR ($01),Y
  EOR ($01),Y
  EOR $50
  EOR $05
  CLI
  .byte $54
  EOR ($05),Y
  CLI
  .byte $54
  EOR $05
  CLI
  .byte $54
  EOR ($05),Y
  CLI
  .byte $54
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  .byte $47
  CLI
  ORA $56
  .byte $47
  CLI
  ORA $52
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($52,X)
  .byte $53
  LSR $53,X
  LSR $01,X
  .byte $52
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($52,X)
  ORA ($01,X)
  .byte $53
  LSR $01,X
  ORA ($47,X)
  CLI
  ORA $56
  .byte $47
  CLI
  ORA $52
  .byte $47
  CLI
  ORA $56
  .byte $47
  CLI
  ORA $52
  ORA ($52,X)
  .byte $53
  LSR $53,X
  LSR $01,X
  .byte $52
  ORA ($52,X)
  .byte $53
  LSR $53,X
  LSR $01,X
  .byte $52
  ORA ($52,X)
  ORA ($01,X)
  .byte $53
  LSR $01,X
  ORA ($01,X)
  .byte $52
  ORA ($01,X)
  .byte $53
  LSR $01,X
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($00,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  CMP #$D2
  BRK
  BRK
  CPY $00FF
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $D2, $D2, $D2, $D2, $FF, $FF, $FF, $FF
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  CMP #$D2
  .byte $D2, $D2
  CPY $FFFF
  .byte $FF
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $D2, $D2
  BNE $E74C
@E74C:
  .byte $FF, $FF
  BNE $E750
@E750:
  BRK
  BRK
  CMP #$D2
  BRK
  BRK
  CPY $00FF
  BRK
  CMP #$D2
  BRK
  CMP #$CC
  .byte $FF, $D2, $D2
  CPY $FFFF
  .byte $FF
  CPY $CCFF
  .byte $FF
  CPY $CCFF
  .byte $FF
  CPY $FFFF
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  CPY #$C1
  .byte $FF, $FF, $C2, $FF
  CPY $FFFF
  .byte $FF
  CPY $FFFF
  .byte $FF
  CPY $C5
  .byte $FF, $FF
  CPY $FFC7
  .byte $FF, $FF, $FF
  CMP #$D2
  .byte $FF, $FF
  CPY $FFFF
  .byte $FF
  CPY $FFFF
  .byte $FF
  CPY $D2FF
  .byte $D2
  BNE $E7A4
@E7A4:
  .byte $FF, $FF
  BNE $E7A8
@E7A8:
  CMP #$D2
  BNE $E7AC
@E7AC:
  CPY $C9FF
  BNE $E7B1
@E7B1:
  DEC $CC
  .byte $FF
  BRK
  BRK
  DEC $C3
  BRK
  BRK
  CPY $00FF
  BRK
  DEC $C3
  CPY $CCFF
  .byte $FF
  CPY $CCFF
  .byte $FF, $FF, $FF
  CPY $C3FF
  .byte $C3
  CPY $FFFF
  .byte $FF
  INY
  .byte $FF, $FF, $FF
  DEX
  AXS #$FF
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF
  CPY $FFCD
  .byte $FF
  DEC $FFCF
  .byte $FF
  CPY $FFFF
  .byte $FF
  CPY $FFFF
  .byte $FF, $FF, $FF
  CPY $FFFF
  .byte $FF
  CPY $FFFF
  .byte $FF
  CPY $FFFF
  .byte $FF
  DEC $C3
  `;
}

// $8800-$8BFF (1024B): $8800-$8BFF 代码/数据段3
function build_8800_8BFF_seg3(): readonly number[] {
  return asm`
  CPY $C6FF
  .byte $D0, $C6  ; BNE $87CB
  .byte $C3
  BNE $E808
@E808:
  .byte $FF, $FF
  BNE $E80C
@E80C:
  .byte $C3
@E80D:
  .byte $C3
  BNE $E810
@E810:
  BRK
  BRK
  CPY $00FF
  BRK
  DEC $C3
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $FF, $FF, $FF, $FF, $C3, $C3, $C3, $C3
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  CPY $FFFF
  .byte $FF
  DEC $C3
@E836:
  .byte $C3, $C3
@E838:
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $FF, $FF
  BNE $E844
@E844:
  .byte $C3, $C3
  BNE $E848
@E848:
  BRK
  BRK
  BRK
@E84B:
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA ($01,X)
  STA ($82,X)
  ORA ($01,X)
  STA ($81,X)
  ORA ($01,X)
  STA ($81,X)
  ORA ($01,X)
  ORA $830D
  STX $87
  STA ($81,X)
  STY $A08D
  STA ($8E,X)
  .byte $8F
  STA ($0D,X)
  LDY $0D
  ORA $8181
  STY $85
  LDA ($A2,X)
  .byte $A3
  STA ($81,X)
  TAY
  BCC $E80D
  ORA $920D
  ORA $0101
  ORA $013C,Y
  ORA ($0E,X)
  ASL A
  ORA ($01,X)
  BPL $E836
  ORA ($01,X)
  DEY
  .byte $89
  BPL $E838
  .byte $3C
  CLC
  LDA #$AC
  ASL A
  ANC #$AB
  LDX $AD8B
  TXA
  ANC #$0E
  .byte $AF
  ORA $98B1,Y
  ORA ($B2),Y
  .byte $B3
  TXS
  .byte $93
  CLV
  LDA $993C,Y
  TSX
  .byte $13
  BCS $E84B
  .byte $3C, $3C
  ORA ($01,X)
  ASL A
  .byte $12
  ORA ($01,X)
  CLC
  ORA $0101,Y
  ANC #$0E
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA $010D
  ORA ($94,X)
  STA $01,X
  ORA ($01,X)
  .byte $97
  LDA $BB
  .byte $9C
  STA $01A7,X
  ORA $0D9F
  ORA $C001
  CMP ($EA,X)
  LDA $C3C2,X
  ORA ($01,X)
  INY
  CMP #$01
  ORA $CB0D
  ORA $01EB
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA $010D
  ORA ($01,X)
  ORA ($10,X)
  ORA ($01),Y
  ORA ($0A,X)
  .byte $13
  ORA ($01,X)
  .byte $3C, $3C
  ORA ($01,X)
  ASL A
  .byte $12
  BPL $E8C7
  STX $10,Y
@E914:
  LDX $B7,Y
  .byte $9E, $12
  LDY $B410,X
  CPX #$BE
  .byte $BF, $12, $E2
  BPL $E933
  SBC ($18,X)
  .byte $12, $13, $E3
  CPY $C5
  BNE $E914
  DEC $E8
  ANC #$0E
  CPY $3C19
  ORA ($01,X)
  ASL $010A
  ORA ($C7,X)
  ORA ($01),Y
  ORA ($CD,X)
  .byte $D2
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA $FA0D
  ORA ($01,X)
  ORA ($FA,X)
  ORA ($01,X)
  ORA ($FA,X)
  ORA ($01,X)
  ORA ($F7,X)
  .byte $FC
  ORA ($01,X)
  .byte $3C, $3C
  CLC
  ORA $120A,Y
  ANC #$0E
  .byte $F2
  ORA $3C10,Y
  SED
  SBC $120A,Y
  ORA ($01,X)
  SBC $01,X
  ORA ($01,X)
  ORA ($F5,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  .byte $FB, $FB, $FB, $FB
  ORA ($B2,X)
  BRK
  BRK
  ORA ($B8,X)
  BRK
  LDY $01,X
  TSX
  BRK
  LDX $01,Y
  ORA ($F8,X)
  .byte $B3
  BRK
  LDA $C000,X
  LDA $BF,X
  CMP ($C2,X)
  .byte $B7, $03, $03
@E9AB:
  .byte $03, $03, $03, $03, $03
  BRK
  CPY #$00
  CPY #$C3
  .byte $C2, $C3, $E2, $03, $03, $03, $03, $03, $03, $03, $03
  CPY #$C5
  CMP $00
  .byte $3C
  DEC $C7
  BRK
  .byte $03, $02, $02
  SBC #$03
  .byte $03, $02
  SBC #$00
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BNE $E9AB
  BRK
  BRK
  .byte $D2, $D3
  BRK
  BRK
  .byte $D4
  ORA ($01,X)
  ORA ($D6,X)
  .byte $D7
  ORA ($01,X)
  BRK
  BRK
  CMP $01,X
  BRK
  DEC $DDDC,X
  ORA ($01,X)
  ORA ($B9,X)
  ORA ($01,X)
  ORA ($BB,X)
  ORA ($01,X)
  ORA ($BC,X)
  ORA ($01,X)
  ORA ($BE,X)
  .byte $03
  INY
  CMP #$E3
  .byte $03
  DEX
  AXS #$E6
  .byte $03
  CPX #$E1
  .byte $03, $03, $03, $03, $03, $03, $03, $03, $03, $03, $03, $03, $03
  INX
  .byte $03, $03, $03
  NOP
  .byte $03, $03, $03
  CPY $E7CD
  CPX $CFCE
  CPY $EE
  CPX $E5
  .byte $02
@EA2B:
  .byte $02, $03, $03, $02, $02
  CLD
  CMP $0000,Y
  NOP
  .byte $DB
  BRK
  BRK
  BEQ $EA2B
  BRK
  BRK
  .byte $F2, $F3
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $DF
  BRK
  .byte $F4
  SBC $01,X
  INC $F7,X
  ORA ($01,X)
  SBC $0101
  ORA ($61,X)
  ADC ($61,X)
  ADC ($63,X)
  .byte $63, $63, $63
  ADC #$69
  ADC #$69
  ARR #$6B
  ARR #$6B
  ADC #$69
  ADC #$69
  SBC $F5,X
  SBC $F5,X
  .byte $F7, $F7, $F7, $F7
  SBC $FDFD,X
  SBC $FFFF,X
  .byte $FF, $FF, $FC, $FC, $FC, $FC
  INC $FEFE,X
  INC $FFFF,X
  .byte $FF, $FF, $FB, $FB, $FB, $FB
  INC $F6,X
  INC $F6,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $FC
  INC $FEFE,X
  INC $FEFC,X
  INC $FEFE,X
  .byte $FC
  INC $FEFE,X
  INC $FCFC,X
  INC $FEFE,X
  INC $FEFC,X
  INC $0000,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  INC $FEFE,X
  INC $FEFE,X
  INC $FEFE,X
  INC $FEFE,X
  INC $FEFE,X
  INC $FEFE,X
  INC $FEFE,X
  INC $FEFE,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  RTS
  RTS
  RTS
  RTS
  .byte $62, $62, $62, $62
  PLA
  PLA
  PLA
  PLA
  ROR A
  ROR A
  ROR A
  ROR A
  ADC ($61,X)
  ADC ($61,X)
  .byte $63, $63, $63, $63
  ADC #$69
  ADC #$69
  ARR #$6B
  ARR #$6B
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA $010D
  NOP
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  NOP
  NOP
  NOP
  ORA ($02,X)
  .byte $04
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  NOP
  NOP
  ORA ($01,X)
  .byte $04
  ORA $01
  NOP
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  NOP
  ORA ($0D,X)
  ORA $3C3C
  PHP
  ORA #$0A
  .byte $12, $12
  ANC #$18
  ORA $3C10,Y
  ANC #$0E
  .byte $12
  ASL A
  .byte $0C
  PHP
  .byte $03
  ASL $0E
  ASL A
  .byte $17, $17
  ORA ($10),Y
  .byte $3C, $3C, $13, $12
  ADC ($74),Y
  ASL $07
  ORA #$0C
  .byte $17, $17
  ANC #$0E
  CLC
  ORA $103C,Y
  ADC $0E,X
  .byte $12
  ASL A
  PHP
  PHP
  .byte $3C
  ORA ($12),Y
  ASL A
  ASL A
  .byte $13
  ORA ($10),Y
  .byte $3C, $3C, $13
  ASL A
  .byte $12, $12
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ASL $16,X
  ASL $16,X
  ORA ($01,X)
  ORA ($01,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA ($00,X)
  BRK
  BRK
  ORA ($00,X)
  BRK
  BRK
  ORA ($00,X)
  BRK
  BRK
  BRK
  ORA ($00,X)
  BRK
  BRK
  ORA ($00,X)
  BRK
  BRK
  ORA ($00,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  BRK
  BRK
  BRK
  ORA ($00,X)
  BRK
  BRK
  SEI
  BRK
  BRK
  BRK
  NOP
  BRK
  BRK
  BRK
  BRK
  .byte $73
  ROR $01,X
  ORA ($79,X)
  .byte $7C
  LSR A
  .byte $6F, $7B
  ROR $7170,X
  BRK
  BRK
  BRK
  BRK
  ORA ($01,X)
  ORA ($01,X)
  .byte $70, $74  ; BVS $8C6A
  .byte $12
  .byte $70, $70  ; BVS $8C69
  .byte $74, $12
  BVS $EBFD
@EBFD:
  BRK
  BRK
  BRK
  `;
}

// $8C00-$8FFF (1024B): $8C00-$8FFF 代码/数据段4
function build_8C00_8FFF_seg4(): readonly number[] {
  return asm`
  .byte $77
  BRK
  BRK
  BRK
  BVS $EC06
@EC06:
  BRK
  BRK
  .byte $72
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $77
  BRK
  BRK
  BRK
  ADC $0000,X
  BRK
  .byte $7F
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  .byte $03
  ORA ($01,X)
  ORA ($03,X)
  .byte $03
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  JSR $0321
  .byte $03, $22
  AND #$09
  ORA #$28
  AND #$03
  .byte $03
  ROL A
  ANC #$03
  .byte $03, $23, $03
  ORA ($01,X)
  ORA #$09
  .byte $27
  ORA ($03,X)
  BIT $242D
  .byte $03
  ROL $262F
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  AND $0E
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  PHP
  .byte $02, $02, $03
  ASL A
  ANC #$03
  .byte $03
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($03,X)
  ORA ($01,X)
  .byte $03, $03
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  .byte $03, $02, $02
  CLC
  .byte $03, $03, $1B
  NOP
  ORA ($01,X)
  .byte $03, $33
  ORA ($37,X)
  ORA #$09
  .byte $34
  AND $033C,X
  ROL $3F,X
  ROL $0303,X
  .byte $03
  AND ($30),Y
  ORA #$09
  AND $0332,Y
  .byte $03
  AND $0338,Y
  .byte $03, $3B
  NOP
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ASL $7935,X
  .byte $1C
  LSR $56,X
  .byte $7B
  LSR $56,X
  LSR $00,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  LSR $22,X
  .byte $23
  ROL $56
  PLP
  AND #$38
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $33
  ROL $5C,X
  ROR $5B39
  LSR $0015,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BVC $ED82
  BVS $ED84
  ADC $6060
  RTS
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  .byte $02, $03
  ASL $07
  PHP
  ORA #$0C
  ORA $0B0A
  ASL $200F
  JSR $2524
  .byte $12, $13
  ORA ($01,X)
  CLC
  ORA $0113,Y
  NOP
  .byte $1B
  ASL $3013,X
  AND ($34),Y
  AND $01,X
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($13,X)
  ORA ($01,X)
  ORA ($22,X)
  .byte $23
  ROL $27
  PLP
  AND #$2C
  AND $2A2A
  .byte $03, $2F
  ANC #$2B
  ROL $3278
  NOP
  ROL $37,X
  SEC
  AND $0F3C,Y
  NOP
  .byte $3B
  ROL $523F,X
  .byte $53, $14
  ORA $62,X
  .byte $13
@ED82:
  ORA ($01,X)
@ED84:
  ORA $6C69
  ORA ($30,X)
  NOP
  ROR $406F
  EOR ($44,X)
  EOR $01
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($65,X)
  ORA ($01,X)
  ORA ($02,X)
  .byte $02, $04
  NOP
  PHP
  PHP
  PHP
  ORA $0A
  ASL A
  ASL A
  BPL $EDCD
  JSR $1120
  CLI
  EOR $1716,Y
  NOP
  .byte $5B, $1C
  ORA $7170,X
  .byte $33, $1F, $72, $73
  LSR $4221,X
  .byte $43
  LSR $47
  PHA
  EOR #$4C
  EOR $4B4A
  LSR $604F
@EDCD:
  ADC ($64,X)
  .byte $4F, $67
  ADC $0101
  .byte $4F
  BVC $EDD8
  ORA ($4F,X)
  EOR ($6D),Y
  ORA ($4F,X)
  .byte $4F
  BVC $EDE1
  .byte $23
@EDE1:
  .byte $23, $23, $03
  AND $3D3D,X
  PLA
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  SEI
  ADC $5554,Y
  NOP
  .byte $7B
  LSR $57,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ROR A
  .byte $63
  ROR $4F
  ARR #$5C
  EOR $004F,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $4F, $4F
  EOR ($6D),Y
  .byte $4F, $4F, $4F
  BVC $EE19
@EE19:
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($2B,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($40,X)
  ORA ($01,X)
  RTI
  EOR ($01,X)
  RTI
  .byte $42, $43
  RTI
  ORA $4948,X
  ASL $4A1F,X
  ALR #$44
  EOR $50
  EOR ($46),Y
  .byte $47, $52, $53
  JMP $584D
  EOR $4F4E,Y
  NOP
  NOP
  ORA ($01,X)
  RTI
  AND ($01),Y
  .byte $27, $32
  LSR $2C
  AND $4B49
  ROL $3A2F
  .byte $3B, $34
  AND $49,X
  ADC ($4C,X)
  .byte $37, $62, $63, $3C
  AND $6968,X
  ROL $6A3F,X
  ARR #$64
  ADC $70
  ADC ($66),Y
  .byte $67, $72, $73
  JMP ($7850)
  SEI
  ROR $7A6F
  NOP
  ORA ($01,X)
  ADC $0154,Y
  ORA ($7B,X)
  LSR $01,X
  ADC $561C,Y
  ORA ($7B,X)
  LSR $56,X
  EOR $02,X
  .byte $02
  ASL $57
  PHP
  ORA #$0C
  LSR $0A,X
  ANC #$0E
  LSR $20,X
  AND ($24,X)
  .byte $07, $12, $13, $14
  ORA $1918
  ASL $0F,X
  NOP
  .byte $1B, $04
  AND $30
  EOR $1510,X
  ROL A
  EOR ($51),Y
  .byte $17, $53, $53, $53
  ORA $59
  EOR $1159,Y
  NOP
  NOP
  NOP
  .byte $7F, $EF
  NOP
  ORA ($7F,X)
  .byte $7F
  CPX #$E1
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA ($E3,X)
  .byte $7F, $7F
  NOP
  SBC #$7F
  .byte $7F
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  SED
  SBC $0101,Y
  .byte $7F
  SBC #$01
  ORA ($7F,X)
  .byte $7F, $7F
@EF03:
  SBC #$7F
  .byte $7F, $7F
  SBC ($7F,X)
  .byte $7F, $7F, $7F, $7F, $7F, $7F, $7F
  BEQ $EF03
  ORA ($01,X)
  SBC $F47F
  ORA ($7F,X)
  .byte $7F, $F2
  NOP
  .byte $7F, $7F, $7F, $F3
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($E8,X)
  ORA ($01,X)
  CPX $017F
  NOP
  .byte $7F, $7F
  NOP
  .byte $7F, $7F, $7F, $7F, $7F, $7F, $7F, $7F, $7F, $7F, $7F, $7F, $7F, $7F, $7F
  ORA ($01,X)
  INC $E7
  ORA ($E4,X)
  SBC $7F
  INC $7F7F
  .byte $7F, $E3, $7F, $7F, $7F
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $7F, $7F, $7F, $7F, $7F, $7F, $7F, $7F
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ROL A
  ANC #$2A
  ANC #$2B
  ROL A
  ANC #$2A
  ROL A
  ANC #$2A
  ANC #$2B
  ROL A
  ANC #$2A
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  .byte $04
  ORA $02
  .byte $03
  ASL $07
  .byte $03, $03, $23, $03
  ORA ($01,X)
  ORA #$09
  .byte $27
  ORA ($03,X)
  BIT $0D2D
  .byte $03
  ROL $0F0C
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  BPL $EFAB
  ORA ($01,X)
  .byte $12
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01),Y
  ORA ($01,X)
  .byte $13
  ORA ($01,X)
  .byte $03, $33
  ORA ($37,X)
  ORA #$09
  ORA $3C3D,X
  .byte $03, $1F, $1C
  ROL $0103,X
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($03,X)
  .byte $02
  ORA $14,X
  .byte $03, $03, $17
  ASL $2A,X
  ANC #$2A
  ANC #$2B
  ROL A
  ANC #$2A
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  `;
}

// $9000-$93FF (1024B): $9000-$93FF 代码/数据段5
function build_9000_93FF_seg5(): readonly number[] {
  return asm`
  LDA #$00
  STA $0490
  LDA #$02
  STA $0491
  STA $0087
  LDA #$67
  STA $88
  LDA #$B4
  STA $89
  LDA #$00
  STA $05FB
  LDA #$09
  STA $0441
  LDA #$14
  STA $0442
  LDA #$80
  STA $063F
  LDA #$00
  STA $8A
  LDY $8A
  LDA ($88),Y
  CMP #$E0
  BCC $E03D
  INC $8A
  JSR $B15A ; → bank switch?
  JMP $B02D
@E03D:
  JSR $B043 ; → bank switch?
  JMP $B02D
  BIT $063F
  BVC $E04B
  JMP $B0AF
@E04B:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $0515
  BNE $E04B
  LDA #$01
  STA $0515
  LDX #$47
  LDA #$00
@E05E:
  STA $04A5,X
  DEX
  BPL $E05E
  LDA #$20
  STA $04A5
  STA $04C8
  INX
  STX $3A
  LDA $8B
  AND #$07
  ORA #$88
  LSR A
  ROR $3A
  LSR A
  ROR $3A
  STA $04A7
  STA $04CA
  LDA $3A
  STA $04A6
  CLC
  ADC #$20
  STA $04C9
  LDA $8B
  LSR A
  LSR A
  LSR A
  TAX
@E092:
  LDY $8A
  LDA ($88),Y
  CMP #$E0
  BCS $E0A9
  JSR $C524 ; → bank switch?
  STA $04CB,X
  TYA
  STA $04A8,X
  INX
  INC $8A
  BNE $E092
@E0A9:
  LDA #$80
  STA $0515
  RTS
  LDY $8A
  LDA ($88),Y
  CMP #$E0
  BCC $E0B8
  RTS
@E0B8:
  INC $8A
  PHA
@E0BB:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $0515
  BNE $E0BB
  LDA #$01
  STA $0515
  LDX #$00
  STX $04AD
  STX $3A
  INX
  STX $04A5
  STX $04A9
  LDA $8B
  AND #$07
  ORA #$88
  LSR A
  ROR $3A
  LSR A
  ROR $3A
  STA $04A7
  STA $04AB
  LDA $8B
  LSR A
  LSR A
  LSR A
  CLC
  ADC $3A
  STA $04A6
  CLC
  ADC #$20
  STA $04AA
  PLA
  JSR $C524 ; → bank switch?
  STA $04AC
  STY $04A8
  LDA #$80
  STA $0515
  LDA #$00
@E10C:
  PHA
  JSR $B127 ; → bank switch?
  LDA #$01
  JSR $C515 ; → bank switch?
  PLA
  CLC
  ADC #$02
  CMP #$08
  BNE $E10C
  LDA $8B
  CLC
  ADC #$08
  STA $8B
  JMP $B0AF
  STA $3A
  LDA #$01
  STA $02F9
  STA $02FD
  LDA #$00
  STA $02FA
  STA $02FE
  LDA $8B
  AND #$07
  ASL A
  ASL A
  ASL A
  ASL A
  CLC
  ADC #$7C
  STA $02F8
  ADC #$08
  STA $02FC
  LDA $8B
  AND #$F8
  CLC
  ADC $3A
  STA $02FB
  STA $02FF
  RTS
  JSR $B160 ; → bank switch?
  JMP $B339
  SEC
  SBC #$E0
  JSR $C509 ; → bank switch?
  LDX $B1
  CPX #$B1
  .byte $F3
  LDA ($18),Y
  .byte $B2, $1B, $B2
  BIT $B2
  AND $B2,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $33, $B3
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  JSR $C52D ; → bank switch?
  LDY $8A
  INC $8A
  LDA ($88),Y
  JSR $C54E ; → bank switch?
@E1B2:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $0516
  BNE $E1B2
  LDA #$00
  STA $11
  STA $12
  LDA #$00
  STA $0D
  STA $0E
  LDA #$00
  STA $05D2
  TAX
@E1CE:
  LDA #$FF
  STA $0558,X
  STA $0557,X
  TXA
  CLC
  ADC #$15
  TAX
  CPX #$7E
  BNE $E1CE
  RTS
  LDY $8A
  INC $8A
  LDA ($88),Y
@E1E6:
  PHA
  LDA #$01
  JSR $C515 ; → bank switch?
  PLA
  SEC
  SBC #$01
  BNE $E1E6
  RTS
  LDY $8A
  LDA ($88),Y
  TAX
  INY
  LDA ($88),Y
  PHA
  INY
  LDA ($88),Y
  INY
  STY $8A
  CMP #$0B
  BCS $E20C
  STX $002A
  JMP $B20F
@E20C:
  STX $002B
  JSR $C50C ; → bank switch?
  PLA
  LDY #$00
  STA ($34),Y
  RTS
  JMP $B349
  LDY $8A
  INC $8A
  LDA ($88),Y
  STA $8B
  RTS
  LDY $8A
  INC $8A
  LDA ($88),Y
  JSR $C509 ; → bank switch?
  ROL $46B2,X
  .byte $B2
  LDX $B2
  .byte $DB, $B2
  LDA $063F
  ORA #$40
  STA $063F
  RTS
  LDA #$0F
  STA $0472
  JMP $B2F7
  LDA #$30
  STA $0472
  LDX #$00
@E24D:
  LDA $046F,X
  STA $0408,X
  INX
  CPX #$20
  BNE $E24D
  JSR $B310 ; → bank switch?
  LDA #$30
  JSR $C515 ; → bank switch?
  LDA #$20
@E262:
  PHA
  LDA #$05
  JSR $C515 ; → bank switch?
  PLA
  PHA
  STA $3A
  LDX #$00
@E26E:
  LDA $0408,X
  AND #$F0
  CMP $3A
  LDA $0408,X
  BCS $E291
  AND #$0F
  CMP #$0F
  BNE $E28B
  ORA $3A
  CMP #$0F
  BEQ $E291
  AND #$F0
  JMP $B291
@E28B:
  ORA $3A
  BNE $E291
  LDA #$0F
@E291:
  STA $046F,X
  INX
  CPX #$20
  BNE $E26E
  JSR $C533 ; → bank switch?
  BRK
  JMP ($6804)
  SEC
  SBC #$10
  BPL $E262
  RTS
  LDA #$30
@E2A8:
  PHA
  LDA #$02
  JSR $C515 ; → bank switch?
  PLA
  STA $3A
  LDX #$00
@E2B3:
  TXA
  AND #$03
  BEQ $E2C8
  LDA $046F,X
  AND #$0F
  ORA $3A
  LDY $3A
  BNE $E2C5
  LDA #$0F
@E2C5:
  STA $046F,X
@E2C8:
  INX
  CPX #$20
  BNE $E2B3
  JSR $C533 ; → bank switch?
  BRK
  JMP ($A504)
  NOP
  SEC
  SBC #$10
  BPL $E2A8
  RTS
  LDA #$10
@E2DD:
  PHA
  LDA #$02
  JSR $C515 ; → bank switch?
  PLA
  PHA
  STA $0472
  JSR $C533 ; → bank switch?
  BRK
  JMP ($6804)
  CLC
  ADC #$10
  CMP #$40
  BNE $E2DD
  RTS
  LDX #$00
@E2F9:
  STA $046F,X
  INX
  INX
  INX
  INX
  CPX #$20
  BNE $E2F9
  JSR $C533 ; → bank switch?
  BRK
  JMP ($A904)
  ORA ($20,X)
  ORA $C5,X
  RTS
  LDX #$00
@E312:
  LDA $046F,X
  AND #$0F
  ORA #$30
  CMP #$3F
  BNE $E31F
  LDA #$30
@E31F:
  STA $046F,X
  INX
  CPX #$20
  BNE $E312
  JSR $C533 ; → bank switch?
  BRK
  JMP ($A904)
  ORA ($20,X)
  ORA $C5,X
  RTS
  LDA #$80
  STA $0515
  RTS
  LDA $8A
  CLC
  ADC $88
  STA $88
  BCC $E344
  INC $89
@E344:
  LDA #$00
  STA $8A
  RTS
  JSR $B2A6 ; → bank switch?
  LDA #$01
  STA $046B
  LDA #$00
  STA $4B
  STA $0517
  STA $053C
  LDA #$80
  STA $053A
  LDA #$24
  STA $4A
  LDA #$20
  JSR $B406 ; → bank switch?
  LDA #$28
  JSR $B406 ; → bank switch?
  LDA $20
  AND #$FC
  STA $20
  LDX #$10
  LDA #$15
  JSR $C530 ; → bank switch?
  LDX #$00
  LDA #$16
  JSR $C530 ; → bank switch?
  JSR $C533 ; → bank switch?
  BRK
  JMP ($A204)
  .byte $03
@E38A:
  LDA $B402,X
  STA $0494,X
  DEX
  BPL $E38A
  LDA #$7C
  STA $0490
  LDA #$7E
  STA $0491
  LDA #$FF
  STA $0557
  STA $0558
  STA $0541
  LDA #$FF
  STA $054F
  LDA #$DD
  STA $0553
  LDA #$80
  STA $0547
  LDA #$31
  STA $0559
  JSR $C533 ; → bank switch?
  .byte $13
  LSR $A9B4
  RTS
  JSR $C515 ; → bank switch?
  LDA #$00
  STA $8A
@E3CB:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $8A
  CLC
  ADC #$60
  STA $8A
  BCC $E3CB
  DEC $054F
  DEC $4A
  BEQ $E3FA
  LDX #$06
  LDA $4A
  CMP #$14
  BEQ $E3EE
  LDX #$16
  CMP #$08
  BNE $E3CB
@E3EE:
  STX $0470
  JSR $C533 ; → bank switch?
  BRK
  JMP ($4C04)
  AXS #$B3
@E3FA:
  LDA #$01
  JSR $C515 ; → bank switch?
  .byte $4C
  `;
}

// $9400-$97FF (1024B): $9400-$97FF 代码/数据段6
function build_9400_97FF_seg6(): readonly number[] {
  return asm`
  NOP
  .byte $B3, $7C
  ADC ($52),Y
  .byte $53
  PHA
  LDX #$00
  STX $8B
  STX $8A
@E40D:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $0515
  BNE $E40D
  LDA #$01
  STA $0515
  LDX #$24
  LDA #$00
@E420:
  STA $04A5,X
  DEX
  BPL $E420
  LDA #$20
  STA $04A5
  LDX $8A
  STX $04A6
  PLA
  PHA
  ORA $8B
  STA $04A7
  LDA #$80
  STA $0515
  TXA
  CLC
  ADC #$20
  STA $8A
  LDA $8B
  ADC #$00
  STA $8B
  CMP #$04
  BCC $E40D
  PLA
  RTS
  ORA #$6E
  AND ($28,X)
  AND #$2C
  AND $3738
  AND $3D3C,Y
  ORA #$8E
  AND ($2A,X)
  ANC #$2E
  .byte $2F
  NOP
  ROL A
  .byte $3B
  ROL $003F,X
  CPX #$5C
  SBC $00
  CPX $5A
  LSR $69
  ARR #$4D
  .byte $3F
  ALR #$6E
  BVC $E4F3
  EOR $FC,X
  SBC $03
  SBC ($68,X)
  SBC $02
  CPX #$5D
  SBC $00
  PHA
  .byte $67, $43
  CMP ($74,X)
  EOR $3F
  .byte $62
  EOR $6E
  .byte $FC
  SBC $03
  SBC ($68,X)
  SBC $02
  .byte $E2
  ORA ($14,X)
  ORA #$E0
  LSR $E5,X
  BRK
  CPX $62
  .byte $02, $0C
  LDA $07
  BRK
  PLP
  .byte $32, $03, $FC
  SBC $03
  SBC ($68,X)
  SBC $02
  CPX #$59
  SBC $00
  LDX $14
  .byte $03
  BRK
  .byte $1B
  ANC #$0C
  .byte $FC
  SBC $03
  SBC ($68,X)
  SBC $02
  CPX #$5A
  SBC $00
  BPL $E4D5
  .byte $AF
  ORA $00,X
  .byte $1F
  ANC #$05
  .byte $FC
  CPX $8B
  ASL $A7
  ORA $FC
  SBC $03
  SBC ($68,X)
@E4D5:
  SBC $02
  CPX #$57
  SBC $00
  CPX $62
  .byte $0F, $03
  TAX
  BRK
  .byte $1F
  ASL A
  .byte $14, $FC
  SBC $03
  SBC ($68,X)
  SBC $02
  CPX #$55
  SBC $00
  JSR $A10D ; → bank switch?
  BRK
@E4F3:
  LDX $31
  ROL $E5FC
  .byte $03
  SBC ($68,X)
  SBC $02
  CPX #$54
  SBC $00
  .byte $1F, $12
  BIT $1F
  BRK
  .byte $1B
  ASL $29
  .byte $FC
  SBC $03
  SBC ($68,X)
  SBC $02
  .byte $E2
  ORA ($15,X)
  ORA #$E0
  CLI
  SBC $00
  ASL $2F,X
  BPL $E51C
@E51C:
  .byte $0C
  AND ($2E),Y
  .byte $FC
  SBC $03
  SBC ($68,X)
  SBC $02
  CPX #$64
  SBC $00
  CPX $5A
  .byte $67, $63
  ROR $C43F
  PHA
  .byte $54
  PLA
  ADC $FC59,X
  SBC $03
  SBC ($68,X)
  SBC $02
  CPX #$5E
  SBC $00
  CPX $62
  EOR $5F69,X
  ROR $463F
  ADC #$52
  .byte $FC
  SBC $03
  SBC ($68,X)
  SBC $02
  CPX #$5F
  SBC $00
  CPX $5A
  .byte $44
  ADC #$3F
  JMP $3FC2
  DEC $7D44
  ADC #$FC
  SBC $03
  SBC ($68,X)
  SBC $02
  CPX #$60
  SBC $00
  CPX $62
  ADC #$42
  .byte $3F
  EOR $D1,X
  ROR A
  EOR $6E
  .byte $FC
  SBC $03
  SBC ($68,X)
  SBC $02
  CPX #$61
  SBC $00
  .byte $5C, $73
  ROR $C13F
  .byte $74
  EOR ($4D,X)
  .byte $FC
  SBC $03
  SBC ($68,X)
  SBC $02
  CPX #$62
  SBC $00
  EOR ($67,X)
  ROR $CD3F
  EOR $6946
  .byte $FC
  SBC $03
  SBC ($68,X)
  SBC $02
  CPX #$63
  SBC $00
  CPX $42
  LSR $7D
  ADC #$3F
  NOP
  .byte $42
  ROR $3F52
  JMP $5571
  .byte $42
  LDX $FC7D,Y
  SBC $03
  SBC ($68,X)
  SBC $02
  CPX #$65
  SBC $00
  CPX $42
  EOR ($69,X)
  .byte $52
  ADC $3F69,X
  EOR ($6E,X)
  EOR ($58),Y
  EOR $4A3F
  .byte $42
  ROR $67C5
  .byte $FC
  SBC $03
  SBC ($68,X)
  SBC $02
  CPX #$51
  SBC $00
  CPX $62
  JSR $070B
  BRK
  BPL $E615
  .byte $03, $FC
  SBC $03
  SBC ($68,X)
  SBC $02
  CPX #$5B
  SBC $00
  BIT $0C06
  .byte $1F
  LDY $0900
  ROL $E5FC
  .byte $03
  SBC ($68,X)
  SBC $02
  CPX #$52
  SBC $00
  .byte $1B
  AND ($03),Y
  LDY #$00
  ASL A
  LDX $2B
  .byte $03, $FC
  SBC $03
@E615:
  SBC ($68,X)
  SBC $02
  CPX #$53
  SBC $00
  CPX $5A
  BIT $AF06
  BIT $0C
  BRK
  .byte $A3
  ROL $03A9
  .byte $FC
  SBC $03
  SBC ($68,X)
  SBC $02
  .byte $E2, $02
  ORA ($09,X)
  CPX #$50
  SBC $00
  CPX $62
  ORA $05
  LDA #$27
  BRK
  .byte $12, $AF
  ANC #$FC
  SBC $03
  SBC ($68,X)
  SBC $02
  .byte $E2
  BRK
  CLI
  ORA #$E0
  ROR $E4
  ADC ($4D),Y
  BVC $E6C3
  .byte $5C, $FC
  SBC ($A0,X)
  INC $E2
  .byte $02
  ORA ($09,X)
  CPX #$69
  CPX $41
  CMP ($74,X)
  ROR A
  PHA
  BVC $E6E4
  .byte $FC
  SBC ($20,X)
  CPX $83
  .byte $5C, $73, $42
  BVC $E6EE
  ORA $14
  JSR $E1FC ; → bank switch?
  PHA
  .byte $E2
  ORA ($15,X)
  .byte $14
  CPX #$78
  CPX $41
  .byte $42
  ROR $7DB7
  ADC ($00,X)
  .byte $CF
  ARR #$B6
  .byte $67
  ADC ($FC,X)
  SBC ($20,X)
  CPX $83
  ROL $2F
  ORA ($2E),Y
  .byte $FC
  SBC ($48,X)
  .byte $E2
  ANC #$32
  .byte $14
  CPX #$6B
  CPX $41
  EOR ($43,X)
  .byte $54, $B7
  ADC $0061,X
  .byte $CF
  ARR #$B6
  .byte $67
  ADC ($FC,X)
  SBC ($20,X)
  CPX $83
  EOR ($47,X)
  .byte $5B
  LSR A
  .byte $FC
  SBC ($48,X)
  .byte $E2
  ORA ($14,X)
  .byte $14
  CPX #$6C
  CPX $41
  .byte $CF, $67
  ROR $7D55
@E6C3:
  .byte $FC
  SBC ($20,X)
  CPX $83
  ORA ($06,X)
  .byte $02, $07, $12
  CLC
  .byte $FC
  SBC ($48,X)
  .byte $E2, $02
  ORA ($09,X)
  CPX #$6D
  CPX $41
  EOR ($43,X)
  .byte $54, $B7
  ADC $C161,X
  .byte $74
  ROR A
  PHA
  BVC $E762
  .byte $FC
  SBC ($20,X)
  CPX $83
  .byte $03, $1F, $FC
  SBC ($48,X)
  .byte $E2
  ASL A
  BMI $E6FC
  CPX #$6E
  CPX $41
  EOR ($56,X)
  .byte $62
  ADC $724C,X
  ROR $74C1
  ROR A
  PHA
  BVC $E781
  .byte $FC
  SBC ($20,X)
  CPX $83
  ASL $2C,X
  ASL $1F
  AND #$FC
  SBC ($48,X)
  .byte $E2
  ASL $0B39
  CPX #$6F
  CPX $41
  RTS
  ADC ($7D),Y
  TSX
  .byte $6F
  PHA
  .byte $FC
  SBC ($20,X)
  CPX $83
@E724:
  BIT $1F
  ANC #$2E
  .byte $FC
  CPX $84
  .byte $62
  BVC $E797
  AND $03
  .byte $07, $FC
  CPX $85
  .byte $1F
  AND $FC
  SBC ($48,X)
  .byte $E2
  ORA ($0C,X)
  ORA #$E0
  BVS $E724
  EOR ($4D,X)
  .byte $CF, $67, $42, $54
  EOR ($48,X)
  JMP $6E72
  .byte $FC
  SBC ($20,X)
  CPX $83
  EOR $CD7D
  ADC $2EA4,X
  BPL $E760
  ROL $E1FC
  PHA
  .byte $E2
  ORA $0B00
@E760:
  .byte $E2
  ORA $1435
  CPX #$71
  CPX $41
  .byte $C3, $6F
  PHA
  JMP ($487D)
  .byte $FC
  SBC ($20,X)
  CPX $83
  .byte $1F
  ADC $010C,X
  ROL $E1FC
  PHA
  .byte $E2
  ORA #$2E
  .byte $14
  CPX #$72
@E781:
  CPX $41
  LDX $67,Y
  .byte $5C, $74, $6F
  PHA
  EOR ($7D),Y
  ADC ($00,X)
  .byte $34, $FC
  SBC ($20,X)
  CPX $83
  EOR #$7D
  EOR $FC,X
@E797:
  CPX $84
  CMP $4A7D
  .byte $FC
  CPX $85
  JMP $CE6E
  ARR #$44
  ADC $FC4D,X
  SBC ($48,X)
  .byte $E2, $02
  ORA ($09,X)
  CPX #$6A
  CPX $41
  LDX $67,Y
  .byte $5C, $74, $6F
  PHA
  EOR ($7D),Y
  ADC ($00,X)
  AND $FC,X
  SBC ($20,X)
  CPX $83
  AND ($27,X)
  ANC #$07
  .byte $FC
  CPX $84
  .byte $A7, $03, $FC
  CPX $85
  .byte $1C
  AND $1C
  AND $FC
  SBC ($48,X)
  .byte $E2, $02
  AND ($0B,X)
  CPX #$73
  CPX $41
  CMP ($7D,X)
  .byte $50, $6C  ; BVC $984C
  ADC $FC48,X
  SBC ($20,X)
  CPX $83
  ANC #$14
  .byte $03
  TAX
  .byte $02
  ASL A
  ROL $E4FC
  STY $24
  ORA $FC20,X
  SBC ($48,X)
  .byte $E2
  ASL $0936
  .byte $E2
  ORA ($00,X)
  .byte $14, $E2
  `;
}

// $9800-$9BFF (1024B): $9800-$9BFF 代码/数据段7
function build_9800_9BFF_seg7(): readonly number[] {
  return asm`
  ORA ($0F,X)
  ANC #$E0
  .byte $74
  CPX $41
  CMP ($C3,X)
  .byte $6F
  LDX $51,Y
  ADC $FC5C,X
  SBC ($20,X)
  CPX $83
  .byte $07, $07, $32, $03
  BIT $00
  LDX $31
  .byte $03, $B2, $04, $FC
  SBC ($48,X)
  .byte $E2, $02
  ORA ($09),Y
  CPX #$75
  CPX $41
  EOR ($43,X)
  .byte $54, $B7
  ADC $4161,X
  .byte $C2, $C3, $42
  LDA $FC7D,Y
  SBC ($20,X)
  CPX $83
  ANC #$08
  .byte $27
  LDA $07
  .byte $FC
  SBC ($48,X)
  .byte $E2, $12, $44
  ORA #$E0
  ROR $E4,X
  EOR ($CD,X)
  .byte $6F
  EOR #$7D
  TSX
  CMP ($B9,X)
  .byte $42
  ROR $5F3F
  LSR $71,X
  EOR ($69,X)
  .byte $FC
  SBC ($20,X)
  CPX $83
  .byte $23
  ROL $44AE
  LSR A
  .byte $FC
  CPX $84
  CMP $516E
  .byte $72
  BPL $E872
  ORA ($30),Y
  ROL $E1FC
  PHA
@E872:
  CPX #$77
  CPX $41
  EOR $68
  TSX
  EOR $69,X
  .byte $FC
  SBC ($20,X)
  CPX $83
  BPL $E888
  NOP
  .byte $0C
  BRK
  ROL $03
  .byte $02
@E888:
  ORA ($FC),Y
  SBC ($80,X)
  SBC $02
  .byte $E3, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  `;
}

// $9C00-$9FFF (1024B): $9C00-$9FFF 代码/数据段8
function build_9C00_9FFF_seg8(): readonly number[] {
  return asm`
.byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  `;
}

// ═══════════════════════════════════════════════════
// Assemble all sections into full 8KB bank
// ═══════════════════════════════════════════════════
const _PRG_BANK_19: readonly number[] = [
  ...build_8000_83FF_seg1(),
  ...build_8400_87FF_seg2(),
  ...build_8800_8BFF_seg3(),
  ...build_8C00_8FFF_seg4(),
  ...build_9000_93FF_seg5(),
  ...build_9400_97FF_seg6(),
  ...build_9800_9BFF_seg7(),
  ...build_9C00_9FFF_seg8(),
];
