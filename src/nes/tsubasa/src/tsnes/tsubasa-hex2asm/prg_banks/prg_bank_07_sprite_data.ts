/**
 * PRG-ROM MMC3 bank 07 (8KB) �?function-based assembly
 * Mapper: 4 (MMC3) | CPU: $8000-$9FFF
 * CDL: code=0 data=3908 unaccessed=4284
 *
 * 功能: 纯数�?(code=0, data=3908): 数据�? *
 * Pattern: 参�?bank_31.ts
 *   每个 build_xxx() 函数返回其覆盖地址范围�?raw 6502 字节�? *   最后通过 spread 拼成完整�?8KB 数组
 */


import { asm } from '../_6502asm';
export { _PRG_BANK_07 as default };

console.log('[prg_07_sprite_data] loaded');

// $8000-$81FF (512B): 数据�?
function build_8000_81FF_data1(): readonly number[] {
  return asm`
  .byte $D4
  LDY #$DF
  LDY #$27
  LDA ($3F,X)
  LDA ($50,X)
  LDA ($64,X)
  LDA ($74,X)
  LDA ($90,X)
  LDA ($A1,X)
  LDA ($C9,X)
  LDA ($F1,X)
  LDA ($2A,X)
  LDX #$3B
  LDX #$74
  LDX #$84
  LDX #$94
  LDX #$A4
  LDX #$BC
  LDX #$D4
  LDX #$EC
  LDX #$04
  .byte $A3, $1C, $A3, $37, $A3, $73, $A3, $AB, $A3, $E3, $A3, $0C
  LDY $35
  LDY $55
  LDY $9E
  LDY $B6
  LDY $D6
  LDY $FE
  LDY $26
  LDA $36
  LDA $5F
  LDA $77
  LDA $8F
  LDA $B8
  LDA $D0
  LDA $E8
  LDA $10
  LDX $39
  LDX $72
  LDX $92
  LDX $9E
  LDX $C7
  LDX $DF
  LDX $F3
  LDX $0B
  .byte $A7, $53, $A7, $73, $A7, $93, $A7, $B3, $A7
  SBC #$A7
  BIT $64A8
  TAY
  ADC $91A8,X
  TAY
  LDA #$A8
  CMP $E5A8
  TAY
  SBC $25A8,X
  LDA #$6E
  LDA #$97
  LDA #$C0
  LDA #$D4
  LDA #$E8
  LDA #$F8
  LDA #$31
  TAX
  ALR #$AA
  .byte $63
  TAX
  .byte $7C
  TAX
  TXA
  TAX
  LDX #$AA
  TSX
  TAX
  .byte $D2
  TAX
  NOP
  TAX
  .byte $63
  LDY $AC7B
  .byte $93
  LDY $ACB3
  AXS #$AC
  .byte $F3
  LDY $AD0C
  .byte $34
  LDA $AD5C
  .byte $74
  LDA $AD9C
  CPY $AD
  CPX $0DAD
  LDX $AE27
  .byte $37
  LDX $AE4B
  .byte $83
  LDX $AEBB
  .byte $DB
  LDX $AEF3
  ORA ($AF,X)
  ORA $31AF,Y
  .byte $AF
  NOP
  .byte $AF, $83, $AF
  CMP $7CAF,Y
  ROR $0181,X
  .byte $03, $1B, $22, $23
  BIT $00
  LDY #$3C
  ROL $0402,X
  BPL $E0E5
@E0E5:
  .byte $42, $42, $42, $42, $42, $42, $42, $42, $42, $42, $42, $42, $42, $42, $42, $42
  AND $0101,X
  .byte $3C
  ORA ($01,X)
  AND $0101,X
  AND $0101,X
  .byte $3C
  ORA ($3D,X)
  ORA ($3E,X)
  ROL $3E3E,X
  ROL $3E3E,X
  ROL $3E3E,X
  ROL $3E3E,X
  ROL $3E3E,X
  .byte $3F, $3F, $3F, $3F, $3F, $3F, $3F, $3F, $3F, $3F, $3F, $3F, $3F, $3F, $3F, $3F
  BRK
  LDY #$5C
  LSR $0206,X
  PHP
  BPL $E0D3
  LDX $A7
  .byte $A7, $A7, $A7, $A7
  TAY
  LDA #$4F
  TAX
  .byte $FF, $FF, $FF, $FF
  LDA #$00
  LDY #$3A
  BRK
  .byte $04, $02, $04, $12, $93
  ADC $42,X
  .byte $43
  STY $77,X
  SEI
  ADC $BF00,Y
  PHP
  .byte $3C
  ROL $0220,X
  ASL $11
  BIT $2C2C
  BIT $2C2D
  .byte $2F
  ROL $2E2F
  .byte $2F
  ROL $A000
  NOP
  BRK
  .byte $04, $02, $04, $12, $93
  ADC $42,X
  .byte $43
  STY $77,X
  SEI
  ADC $A000,Y
  .byte $3C
  ROL $0200,X
  ASL A
  .byte $13
  ORA ($01,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA $16,X
  ORA ($01,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA $001A,Y
  LDY #$3A
  BRK
  .byte $1B, $02, $04
  ORA $93,X
  .byte $42, $80, $43
  STA ($82,X)
  ROR $0044,X
  .byte $3F
  PHP
  RTI
  BRK
  STX $0804
  BRK
  .byte $67, $67, $67, $67, $67, $67, $67, $67
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  JMP ($6E6D)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($68,X)
  ADC #$6A
  ARR #$6C
  ADC $016E
  BRK
  LDY #$3C
  ROL $0403,X
  PHP
  BRK
  .byte $42, $42, $42, $42, $42, $42, $42, $42
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
  BRK
  LDY #$3C
  JMP $0400
  .byte $0C, $07
  TYA
  STA $4242,Y
  .byte $42, $42, $42, $42, $42
  `;
}

// $8200-$83FF (512B): 数据�?
function build_8200_83FF_data2(): readonly number[] {
  return asm`
  .byte $42, $42, $42
  TXS
  .byte $9B, $9C
  ORA ($3C,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($9D,X)
  .byte $9E, $9F
  LDY #$01
  ORA ($01,X)
  ORA ($01,X)
  ORA ($3D,X)
  ORA ($A1,X)
  LDX #$A3
  LDY $01
  AND $3B3A,Y
  ORA ($01,X)
  ORA ($01,X)
  BRK
  AND ($04,X)
  SEC
  NOP
  ORA $02
  .byte $04
  ORA $8D,X
  .byte $42, $42
  STX $908F
  STA ($92),Y
  BRK
  .byte $3F
  PHP
  .byte $3C
  ROL $0300,X
  BPL $E249
  .byte $42, $42, $42, $42, $42, $42, $42, $42
@E249:
  .byte $42, $42, $42, $42, $42, $42, $42, $42, $12, $13, $12, $13, $12, $13, $12, $13, $12, $13, $14
  ORA $16,X
  .byte $17, $12, $13
  CLC
  .byte $1B
  CLC
  .byte $1B
  CLC
  .byte $1B
  CLC
  .byte $1B
  CLC
  .byte $1B
  CLC
  ORA $1B1A,Y
  CLC
  .byte $1B
  NOP
  LDX #$08
  .byte $64
  ROR $98
  .byte $02, $04, $12, $4F
  BVC $E2CE
  .byte $52, $53, $54
  EOR $56,X
  BRK
  LDY #$64
  ROR $99
  .byte $02, $04, $12, $4F
  BVC $E2DE
  .byte $52, $53, $54
  EOR $56,X
  BRK
  LDY #$64
  ROR $9A
  .byte $02, $04, $12, $57
  CLI
  EOR $5A52,Y
  .byte $5B, $5C
  LSR $00,X
  LDY #$3C
  ROL $0200,X
  PHP
  BPL $E2D7
  BIT $2C2C
  BIT $2D2C
  BIT $2E2F
  .byte $2F
  ROL $2E2F
  .byte $2F
  ROL $A000
  .byte $3C
  ROL $0200,X
  PHP
  BPL $E2EF
  AND $2C2C
  BIT $2C2C
  BIT $2F2E
  ROL $2E2F
  .byte $2F
  ROL $002F
  LDY #$3C
  ROL $0200,X
  PHP
  BPL $E307
  BIT $2C2C
@E2DE:
  BIT $2D2C
  BIT $1011
  ORA ($10),Y
  ORA ($10),Y
  ORA ($10),Y
  BRK
  LDY #$3C
  ROL $0200,X
  PHP
  BPL $E31F
  AND $2C2C
  BIT $2C2C
  BIT $1110
  BPL $E30F
  BPL $E311
  BPL $E313
  BRK
  LDY #$7C
  ROR $0281,X
  PHP
  BPL $E30B
@E30B:
  BRK
  BRK
  .byte $47
  PHA
@E30F:
  BRK
  BRK
@E311:
  BRK
  BRK
@E313:
  EOR #$4A
  ALR #$4C
  EOR $004E
  BRK
  LDY #$76
  ROR $0381,X
  ASL $19
  .byte $04
  ORA $06
  .byte $07
  PHP
  ORA #$0A
  ANC #$0C
  ORA $0F0E
  BRK
  ROL $37,X
  SEC
  AND $503A,Y
  INX
  ORA ($7C,X)
  .byte $72, $83, $03
  BPL $E34D
  ROL $26
  ROL $26
  ROL $26
  ROL $26
  ROL $26
  ROL $26
  ROL $26
  ROL $26
@E34D:
  .byte $27, $27, $27, $27, $27, $27, $27, $27, $27, $27, $27, $27, $27, $27, $27, $27
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
  AND $12
  .byte $13
  BRK
  BRK
  .byte $1B, $07
  PLP
  .byte $BB
  PHP
  .byte $7C
  ROR $0681,X
  PHP
  PHP
  BRK
  .byte $04
  ORA $06
  .byte $07
  PHP
  ORA #$00
  BRK
  ASL A
  ANC #$0C
  ORA $0F0E
  BRK
  BRK
  BRK
  BPL $E39E
  .byte $12, $13
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $14
  ORA $00,X
  BRK
  BRK
  ASL $17,X
  CLC
  ORA $1B1A,Y
  .byte $1C
  ORA $0000,X
  ASL $201F,X
  AND ($00,X)
  BRK
  BRK
  LDY #$7C
  ROR $06AC,X
  PHP
  BRK
  BRK
  ADC $7B7A,Y
  .byte $7C
  ADC $0035,X
  BRK
  .byte $04
  ORA $06
  .byte $07
  PHP
  ORA #$00
  BRK
  ASL A
  ANC #$0C
  ORA $0F0E
  BRK
  BRK
  BRK
  BRK
  AND $12
  .byte $13
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $6F
  BVS $E3D7
@E3D7:
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $22, $23
  BIT $00
  BRK
  BRK
  LDY #$3C
  ROL $0200,X
  .byte $10, $17  ; BPL $8400
  PHP
  ORA #$0A
  ANC #$2C
  BIT $2C2C
  BIT $2C2D
  BIT $2C2C
  BIT $042C
  ORA $06
  .byte $07
  ROL $2E2F
  `;
}

// $8400-$85FF (512B): 数据�?
function build_8400_85FF_data3(): readonly number[] {
  return asm`
  .byte $2F
  ROL $2E2F
  .byte $2F
  ROL $2E2F
  .byte $2F
  BRK
  BIT $08
  .byte $3C
  ROL $0200,X
  BPL $E422
  BIT $082C
  ORA #$0A
  ANC #$2C
  BIT $2D2C
  BIT $2C2C
  BIT $2C2C
@E422:
  ROL $042F
  ORA $06
  .byte $07
  ROL $2E2F
  .byte $2F
  ROL $2E2F
  .byte $2F
  ROL $1E2F
  LDX #$08
  .byte $3C
  ROL $0300,X
  PHP
  PHP
  .byte $42, $42, $42, $42, $42, $42, $42, $42, $22, $23
  BIT $25
  ROL $27
  .byte $22, $23, $1C
@E44C:
  .byte $1F, $1C
  ORA $1F1E,X
  .byte $1C, $1F
  BRK
  LDY #$5C
  LSR $0817,X
  PHP
  .byte $5F
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($3D,X)
  ORA ($01,X)
  ORA ($01,X)
  .byte $3C
  ORA ($01,X)
  ORA ($01,X)
  ORA ($C0,X)
  CMP ($C2,X)
  .byte $C2
  ORA ($01,X)
  .byte $83
  STY $C3
  CPY $C5
  CMP $01
  ORA ($01,X)
  ORA ($C3,X)
  DEC $C7
  .byte $C7
  ORA ($01,X)
  ORA ($01,X)
  .byte $C3
  INY
  CMP #$C7
  BVC $E44C
  ORA ($01,X)
  .byte $C3
  DEX
  AXS #$C7
  .byte $52, $53
  AND $C33B,Y
  DEX
  CPY $00C7
  ROR $03
  .byte $3C
  ROL $0211,X
  PHP
  BPL $E4A6
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($00,X)
  LDY #$3C
  ROL $0300,X
  PHP
  PHP
  .byte $42, $42, $42, $42, $42, $42, $42, $42, $22, $23
  PLP
  AND #$2A
  ANC #$22
  .byte $23, $1C, $1F
  EOR $5E5E,X
  .byte $5F, $1C, $1F
  BRK
  LDY #$3C
  ROL $0400,X
  PHP
  BRK
  .byte $42, $42, $42, $42, $42, $42, $42, $42
  AND $0101,X
  ORA ($01,X)
  ORA ($3C,X)
  ORA ($01,X)
  AND $0101,X
  .byte $3C
  ORA ($01,X)
  ORA ($22,X)
  .byte $23, $22, $23, $22, $23
  AND ($23,X)
  BRK
  LDY #$3C
  ROL $0400,X
  PHP
  BRK
  .byte $42, $42, $42, $42, $42, $42, $42, $42
  ORA ($01,X)
  .byte $83
  STY $01
  ORA ($01,X)
  ORA ($3D,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($3C,X)
  ORA ($84,X)
  ORA ($01,X)
  SEC
  ORA ($01,X)
  ORA ($83,X)
  BRK
  LDY #$60
  .byte $62, $07, $02, $04, $12, $37, $37, $37, $37, $34, $34, $34, $34
  BRK
  LDY #$60
  .byte $62
  STX $02,Y
  BPL $E553
  ORA ($01,X)
  .byte $3B, $3C
  AND $3F3E,X
  RTI
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  EOR ($42,X)
  .byte $43, $44
  EOR $46
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  BRK
  .byte $22
  PHP
  RTS
  .byte $62
  STX $02,Y
  PHP
  BPL $E567
  .byte $3B
@E567:
  .byte $3C
  AND $3F3E,X
  RTI
  ORA ($01,X)
  EOR ($42,X)
  .byte $43, $44
  EOR $46
  ORA ($00,X)
  LDY #$68
  ROR A
  .byte $80, $02
  PHP
  BPL $E5E4
  ROR $66
  ROR $66
  ROR $66
  ROR $66
  ROR $66
  ROR $66
  ROR $66
  ROR $00
  LDY #$5C
  LSR $0406,X
  PHP
  BRK
  LDA $ADAD
  LDA $ADAD
  LDA $A7AE
  .byte $A7, $A7, $A7, $A7, $A7, $A7
  TAY
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF
  LDA #$FF
  .byte $FF, $FF, $FF, $FF, $FF, $FF
  LDA #$00
  BCS $E5C0
  .byte $3C
  ROR $07
  .byte $02
  PHP
  BPL $E5F2
  .byte $32
@E5C0:
  .byte $33, $32, $33, $32, $33, $32
  ORA ($10),Y
  ORA ($10),Y
  ORA ($10),Y
  ORA ($10),Y
  BRK
  LDY #$3C
  ROR $07
  .byte $02
  PHP
  .byte $10, $32  ; BPL $8609
  .byte $33, $32, $33, $32, $33, $32, $33
  BPL $E5F1
  BPL $E5F3
  BPL $E5F5
@E5E4:
  BPL $E5F7
  BRK
  LDY #$00
  .byte $02
  BRK
  .byte $04
  PHP
  BRK
  BRK
  BRK
  BRK
@E5F1:
  BRK
@E5F2:
  BRK
@E5F3:
  BRK
  BRK
@E5F5:
  BRK
  BRK
@E5F7:
  BRK
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

// $8600-$87FF (512B): $8600-$87FF 数据�?
function build_8600_87FF_data4(): readonly number[] {
  return asm`
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
  LDY #$3C
  ROL $0200,X
  BPL $E626
  PHP
  ORA #$0A
  ANC #$2C
  BIT $2C2C
  AND $2C2C
  BIT $2C2C
  BIT $042C
  ORA $06
  .byte $07, $2F
  ROL $2E2F
  .byte $2F
  ROL $2E2F
  .byte $2F
  ROL $2E2F
  BRK
  BMI $E641
  .byte $3C
  ROL $0300,X
  BPL $E647
  .byte $42, $42
@E641:
  .byte $42, $42, $42, $42, $42, $42
@E647:
  .byte $42, $42, $42, $42, $42, $42, $42, $42, $13, $12, $13, $12, $13
  JSR $1213
  .byte $13, $14
  ORA $16,X
  .byte $17, $12, $13, $12, $1B
  CLC
  .byte $1B
  CLC
  .byte $1B
  CLC
  .byte $1B
  CLC
  .byte $1B
  CLC
  ORA $1B1A,Y
  CLC
  .byte $1B
  CLC
  BRK
  LDX #$08
  .byte $3C
  ROL $0300,X
  PHP
  PHP
  .byte $42, $42, $42, $42, $42, $42, $42, $42, $12, $13, $14
  ORA $16,X
  .byte $17, $12, $13
  CLC
  .byte $1B
  CLC
  ORA $1B1A,Y
  CLC
  .byte $1B
  BRK
  LDY #$3C
  ROL $0200,X
  .byte $02, $13
  AND $26
  ORA $001E,X
  LDY #$3C
  ROL $0200,X
  BPL $E6B4
  BIT $082C
  ORA #$0A
  ANC #$2C
  BIT $2D2C
  BIT $2C2C
  BIT $2C2C
@E6B4:
  BPL $E6C7
  .byte $0C
  ORA $0F0E
  BPL $E6CD
  BPL $E6CF
  BPL $E6D1
  BPL $E6D3
  BPL $E6D5
  SEI
  LDX #$08
@E6C7:
  .byte $3C
  ROL $0200,X
  PHP
  BPL $E6D6
  ORA #$0A
  ANC #$2C
  BIT $2C2C
@E6D5:
  .byte $04
@E6D6:
  ORA $06
  .byte $07
  ROL $2E2F
  .byte $2F
  BRK
  LDY #$3C
  .byte $62
  ORA #$02
  ASL $11
  SBC $FBFA,Y
  ORA ($01,X)
  ORA ($FC,X)
  SBC $01FE,X
  AND $003A,Y
  LDY #$3C
  ROL $0200,X
  PHP
  BPL $E734
  .byte $3B
  ORA ($01,X)
  AND $3B3A,Y
  ORA ($41,X)
  RTI
  EOR ($40,X)
  EOR ($40,X)
  EOR ($40,X)
  BRK
  LDY #$5C
  LSR $040A,X
  BPL $E711
@E711:
  .byte $03, $03, $03, $03, $03, $03, $03, $03, $03, $03, $03, $03, $03, $03, $03, $03
  SBC $E6
  .byte $E7
  INX
  SBC #$EA
  SBC #$EC
  SBC #$EA
  INX
  SBC #$EA
  NOP
  SBC #$EE
  SBC ($E2,X)
  .byte $E3
@E734:
  CPX $E1
  .byte $E2, $E3
  CPX $E1
  .byte $E2, $E3
  CPX $E1
  .byte $E2, $E3
  CPX $E0
  CPX #$E0
  CPX #$E0
  CPX #$E0
  CPX #$E0
  CPX #$E0
  CPX #$E0
  CPX #$E0
  CPX #$00
  LDY #$5C
  LSR $030A,X
  PHP
  PHP
  DEC $DEDE,X
  DEC $DEDE,X
  DEC $E5DE,X
  INC $E7
  INX
  SBC #$EA
  SBC #$EC
  .byte $E3
  CPX $E1
  .byte $E2, $E3
  CPX $E1
  .byte $E2
  BRK
  LDY #$5C
  LSR $030A,X
  PHP
  PHP
  DEC $DEDE,X
  DEC $DEDE,X
  DEC $EADE,X
  SBC #$EC
  SBC #$EA
  INX
  SBC #$EA
  SBC ($E2,X)
  .byte $E3
  CPX $E1
  .byte $E2, $E3
  CPX $00
  LDY #$5C
  LSR $030A,X
  PHP
  PHP
  DEC $DEDE,X
  DEC $DEDE,X
  DEC $E8DE,X
  SBC #$EA
  SBC #$EC
  SBC #$EA
  SBC #$E2
  .byte $E3
  CPX $E1
  .byte $E2, $E3
  CPX $E1
  BRK
  LDY #$5C
  LSR $030A,X
  BPL $E7C1
  DEC $DEDE,X
  DEC $DEDE,X
  DEC $DEDE,X
  DEC $DEDE,X
  DEC $DEDE,X
  DEC $E8E7,X
  SBC #$EA
  SBC #$EC
  SBC #$EA
  INX
  SBC #$EA
  NOP
  SBC #$EE
  SBC $E6
  SBC ($E2,X)
  .byte $E3
  CPX $E1
  .byte $E2, $E3
  CPX $E1
  .byte $E2, $E3
  CPX $E1
  .byte $E2, $E3
  CPX $00
  LDY #$60
  .byte $62, $87, $04
  ASL $0002
  BRK
  BRK
  BRK
  BRK
  BRK
  ROR $7E80,X
  ROR $7F7E,X
  ROR $007E,X
  `;
}

// $8800-$89FF (512B): $8800-$89FF 数据�?
function build_8800_89FF_data5(): readonly number[] {
  return asm`
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $80
  ROR $7E7E,X
  ROR $7F7E,X
  ROR $8181,X
  STA ($81,X)
  BRK
  BRK
  ROR $7E7E,X
  ROR $7E7E,X
  ROR $7E7F,X
  ROR $7E7E,X
  BRK
  BRK
  ROR $7F80,X
  ROR $7E7E,X
  ROR $157E,X
  .byte $BF
  PHP
  .byte $3C
  ROL $0300,X
  BPL $E83A
  .byte $42, $42, $42, $42, $42, $42, $42, $42
@E83A:
  .byte $42, $42, $42, $42, $42, $42, $42, $42
  ORA ($01,X)
  .byte $3C
  ORA ($01,X)
  AND $0101,X
  ORA ($3D,X)
  ORA ($01,X)
  ORA ($3C,X)
  ORA ($01,X)
  NOP
  .byte $3B
  ORA ($01,X)
  ORA ($39,X)
  NOP
  .byte $3B
  SEC
  AND $3A3A,Y
  .byte $3B
  ORA ($01,X)
  AND $2000,Y
  .byte $0C
  ASL $0293
  PHP
  BPL $E8D0
  ADC $65
  ADC $65
  ADC $65
  ADC $01
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($00,X)
  .byte $BF
  PHP
  LSR $3C
  BRK
  .byte $02
  ASL $11
  ROR A
  ARR #$6B
  JMP ($6E6D)
  .byte $6F
  BVS $E8FD
  .byte $72, $73, $74
  BRK
  LDY #$3C
  BIT $021D
  PHP
  BPL $E899
  .byte $3C
@E899:
  ORA ($01,X)
  EOR $01
  AND $1201,X
  .byte $13, $12
  LSR $47
  .byte $12, $13, $12
  BRK
  LDY #$3A
  BRK
  ORA $02,X
  ASL $9311
  ROR $7B,X
  .byte $43
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $93
  ADC $42,X
  .byte $43, $7C
  ADC $447E,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  STY $77,X
  SEI
  ADC $A000,Y
  RTS
  .byte $62, $07
@E8D0:
  .byte $02
  PHP
  BPL $E908
  .byte $34, $34, $34, $34, $34
@E8D9:
  .byte $34, $34, $34, $34, $34, $34, $34, $34, $34, $34
  BRK
  LDY #$3C
  ROL $020B,X
  PHP
  BPL $E8ED
  .byte $3C
@E8ED:
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  AND $0001,X
  LDY #$66
  LSR $0403,X
  PHP
  BRK
  CMP $CDCD
  BNE $E8D9
@E908:
  .byte $D2, $D3, $D4
  DEC $CECE
  CMP $D6,X
  .byte $D2, $D3, $D4
  DEC $CECE
  .byte $D7
  CLD
  CMP $DAD3,Y
  .byte $CF, $CF, $CF, $DB, $DC
  CMP $DDD3,Y
  BRK
  LDY #$3C
  ROR $0C
  .byte $04
  BPL $E932
  ORA ($01,X)
  .byte $5B
  ORA ($01,X)
  ORA ($5A,X)
@E932:
  ORA ($01,X)
  ORA ($01,X)
  ORA ($5A,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($96,X)
  ORA ($01,X)
  ORA ($5B,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($5B,X)
  ORA ($01,X)
  ORA ($54,X)
  EOR $56,X
  .byte $57
  CLI
  EOR $5554,Y
  .byte $54
  EOR $54,X
  EOR $54,X
  EOR $54,X
  EOR $1C,X
  .byte $1F, $1C
  ORA $1F1E,X
  .byte $1C, $1F, $1C, $1F, $1C, $1F, $1C, $1F, $1C, $1F, $FF
  LDX #$08
  .byte $3C
  JMP $0400
  PHP
  .byte $07
  TYA
  STA $4242,Y
  .byte $42, $42, $42, $42
  TXS
  .byte $9B, $9C
  ORA ($01,X)
  ORA ($01,X)
  ORA ($9D,X)
  .byte $9E, $9F
  LDY #$3C
  ORA ($01,X)
  ORA ($A1,X)
  LDX #$A3
  LDY $01
  AND $3B3A,Y
  BRK
  AND $6608,Y
  LSR $0403,X
  PHP
  BRK
  BRK
  STY $0000
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $97
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
  .byte $DF, $DF, $DF, $DF, $DF, $DF, $DF, $DF, $FF, $A3, $03
  JMP ($0D6E)
  .byte $02
  ASL $11
  STA $86
  .byte $87
  BRK
  BRK
  BRK
  DEY
  BRK
  BRK
  .byte $89
  TXA
  .byte $8B
  BRK
  LDY #$34
  ROL $8E,X
  .byte $02
  ASL $11
  ADC ($72),Y
  .byte $72, $73, $73, $74
  ADC $76,X
  ROR $77,X
  .byte $77
  SEI
  BRK
  LDY #$3C
  ROL $0200,X
  .byte $04, $12
  ORA ($01,X)
  ORA ($01,X)
  .byte $14
  ORA $16,X
  .byte $17
  BRK
  LDY #$5C
  LSR $0322,X
  .byte $10, $08  ; BPL $8A06
  ORA ($01,X)
  `;
}

// $8A00-$8BFF (512B): $8A00-$8BFF 数据�?
function build_8A00_8BFF_data6(): readonly number[] {
  return asm`
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
  BVC $EA69
  .byte $3C
  ORA ($01,X)
  ORA ($01,X)
  AND $0101,X
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  .byte $52, $53
  ORA ($01,X)
  AND $3B3A,Y
  ORA ($00,X)
  .byte $22, $07, $44
  LSR $10
  .byte $03
  ASL $09
  BRK
  .byte $02
  PLA
  .byte $03, $03, $03
  BRK
  .byte $02
  RTS
  .byte $03, $03, $03
  ADC ($62,X)
  .byte $63, $64, $64, $64
  BRK
  LDY #$44
  LSR $10
  .byte $02
  PHP
  BPL $EA54
  .byte $02
  PLA
@EA54:
  .byte $02, $02, $02
  PLA
  ADC #$65
  ADC $66
  ADC $65
  ADC $66
  .byte $67
  BRK
  LDY #$5C
  LSR $0206,X
  PHP
  BPL $EA0F
  LDX $A7
  .byte $A7, $A7, $A7, $A7
  TAY
  LDA #$4F
  TAX
  .byte $FF, $FF, $FF, $FF
  LDA #$3C
  LDY $08
  .byte $3C
  ROR A
  ANC #$02
  .byte $03
  ORA $7A,X
  ORA ($01,X)
  .byte $7F, $14
  ORA $00,X
  LDY #$3C
  ROR A
  BRK
  .byte $02
  PHP
  BPL $EA92
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  BMI $EAAF
  .byte $17, $12, $13, $12, $13, $12
  AND ($00),Y
  LDY #$68
  ROR A
  .byte $92, $02
  PHP
  BPL $EAAA
  ORA ($5D,X)
  LSR $605F,X
  ORA ($01,X)
  ORA ($01,X)
  ADC ($62,X)
  .byte $63, $64
  ORA ($01,X)
  BRK
  LDY #$44
  LSR $10
  .byte $02
  PHP
  BPL $EAC3
  PLA
  .byte $02
@EAC3:
  .byte $02, $02
  PLA
  .byte $02, $02
  ADC $66
  ADC $65
  ADC $66
  ADC $65
  BRK
  LDY #$60
  .byte $62
  STX $02,Y
  PHP
  BPL $EADA
  ORA ($3B,X)
  .byte $3C
  AND $3F3E,X
  RTI
  ORA ($01,X)
  EOR ($42,X)
  .byte $43, $44
  EOR $46
  BRK
  LDY #$5C
  LSR $2E06,X
  PHP
  .byte $5F
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($3C,X)
  ORA ($01,X)
  AND $0101,X
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  .byte $83
  STY $01
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  .byte $83
  STY $01
  ORA ($3D,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  .byte $3C
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
  .byte $3C
  ORA ($01,X)
  .byte $3C
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  .byte $3C
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  .byte $3C
  ORA ($01,X)
  ORA ($01,X)
  ORA ($3C,X)
  ORA ($01,X)
  ORA ($83,X)
  STY $01
  ORA ($01,X)
  .byte $3C
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  AND $0101,X
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  AND $0101,X
  AND $0101,X
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
@EBA8:
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
  .byte $BB
  LDY $BCBC,X
  LDY $BBBC,X
  LDY $BAB9,X
  TSX
  TSX
  TSX
  TSX
  LDA $B7BA,Y
  CLV
  .byte $B7, $B7, $B7, $B7, $B7
  CLV
  LDX $B6,Y
  LDX $B6,Y
  LDX $B6,Y
  LDX $B6,Y
  .byte $AF, $AF, $AF, $AF, $AF, $AF, $AF
  BCS $EBA8
  .byte $AF, $AF, $AF, $AF, $AF
  BCS $EBB1
  `;
}

// $8C00-$8DFF (512B): $8C00-$8DFF 数据�?
function build_8C00_8DFF_data7(): readonly number[] {
  return asm`
  .byte $AF, $AF, $AF, $AF, $AF
  .byte $B0, $B1  ; BCS $8BB8
  .byte $B2, $AF, $AF, $AF, $AF
  .byte $B0, $B1  ; BCS $8BBF
  .byte $B2, $AF, $AF, $AF, $AF
  .byte $B0, $B1  ; BCS $8BC6
  .byte $B2, $AF, $AF, $AF, $AF
  .byte $B0, $B1  ; BCS $8BCD
  .byte $B2, $AF, $AF, $AF, $AF
  .byte $B0, $B1  ; BCS $8BD4
  .byte $B3
  LDY $B4,X
  LDY $B4,X
  .byte $B0, $B1  ; BCS $8BDB
  .byte $B2
  LDA $B5,X
  LDA $B5,X
  LDA $B1,X
  .byte $B2, $AF, $AF, $AF, $AF, $AF, $AF, $B2, $AF, $AF, $AF, $AF, $AF, $AF, $AF, $AB
  LDY $ADAD
  LDA $ADAD
  LDX $A6A5
  .byte $A7, $A7, $A7, $A7, $A7
  TAY
  LDA #$4F
  TAX
  LDA $FFFF,X
  .byte $FF
  LDA #$A9
  .byte $4F, $4F
  LDX $FFFF,Y
  .byte $FF
  LDA #$00
  .byte $63, $7F, $3C
  ROR A
  ANC #$02
  PHP
  BPL $ECE4
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($7F,X)
  .byte $23, $22, $23, $22
@EC76:
  .byte $23
  BIT $25
  BRK
  LDY #$5C
  LSR $020F,X
  PHP
  BPL $ECC4
  .byte $EF
  BEQ $EC76
  .byte $F2, $F3, $42, $42
  ORA ($F4,X)
  SBC $F6,X
  .byte $F7
  SED
  ORA ($01,X)
  BRK
  LDY #$3C
  ROL $0300,X
  PHP
  PHP
  .byte $42, $42, $42, $42, $42, $42, $42, $42, $14
  ORA $16,X
  .byte $17, $12, $13, $12, $13
  CLC
  ORA $1B1A,Y
  CLC
  .byte $1B
  CLC
  .byte $1B
  BRK
  LDY #$3C
  ROR A
  BRK
  .byte $02
  PHP
  BPL $ECBB
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  BMI $ECE8
  .byte $27, $22
@ECC4:
  .byte $23, $22, $23, $22
  AND ($00),Y
  LDY #$3C
  ROR $0C
  .byte $04
  PHP
  BRK
  ORA ($01,X)
  .byte $5B
  ORA ($01,X)
  ORA ($5A,X)
  ORA ($01,X)
  ORA ($96,X)
  ORA ($01,X)
  ORA ($5B,X)
  ORA ($55,X)
  LSR $57,X
@ECE4:
  CLI
  EOR $5554,Y
@ECE8:
  .byte $54, $1F, $1C
  ORA $1F1E,X
  .byte $1C, $1F, $1C
  BRK
  LDY #$3C
  ROR A
  BRK
  .byte $02
  PHP
  BPL $ECFB
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  BMI $ED18
  .byte $17, $12, $13, $12, $13, $12
  AND ($1E),Y
  .byte $A3
  PHP
  .byte $5C
  LSR $0406,X
  PHP
  BRK
  .byte $AB
  LDY $ADAD
  LDA $ADAD
  LDA $A6A5
  .byte $A7, $A7, $A7, $A7, $A7, $A7
  LDA #$4F
  TAX
  .byte $FF, $FF, $FF, $FF, $FF
  LDA #$4F
  .byte $4F
  TAX
  .byte $FF, $FF, $FF, $FF
  BRK
  LDY #$3C
  JMP $0400
  PHP
  BRK
  TYA
  STA $4242,Y
  .byte $42, $42, $42, $42
  TXS
  .byte $9B, $9C
  ORA ($01,X)
  ORA ($01,X)
  ORA ($9D,X)
@ED4B:
  .byte $9E, $9F
  LDY #$3C
  ORA ($01,X)
  ORA ($A1,X)
  LDX #$A3
  LDY $01
  AND $3B3A,Y
  BRK
  LDY #$3C
  ROR A
  ANC #$02
  PHP
  BPL $EDDD
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($7F,X)
  .byte $13, $12, $13, $12, $13, $14
  ORA $00,X
  LDY #$5C
  LSR $0417,X
  PHP
  BRK
  ORA ($01,X)
  ORA ($01,X)
  .byte $C3
  DEC $C7
  .byte $C7
  ORA ($01,X)
  ORA ($01,X)
  .byte $C3
  INY
  CMP #$C7
  BVC $ED4B
  ORA ($01,X)
  .byte $C3
  DEX
  AXS #$C7
  .byte $52, $53
  AND $C33B,Y
  DEX
  CPY $00C7
  LDY #$3C
  JMP $0400
  PHP
  .byte $07, $42, $42, $42, $42, $42, $42, $42, $42
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
  BRK
  JSR $3E3C
  BRK
  .byte $04
  PHP
  BRK
  .byte $42, $42, $42, $42, $42, $42, $42, $42
  AND $0101,X
  ORA ($01,X)
  ORA ($3C,X)
  ORA ($01,X)
  AND $0101,X
  .byte $3C
  ORA ($01,X)
  ORA ($12,X)
  .byte $13
  JSR $1213
  .byte $13, $12, $13
  BRK
  LDY #$68
  ROR A
  .byte $80, $02, $0C
  .byte $10, $66  ; BPL $8E59
  ROR $66
  ROR $66
  ROR $66
  ROR $66
  ROR $66
  ROR $66
  .byte $66
  `;
}

// $8E00-$8FFF (512B): $8E00-$8FFF 数据�?
function build_8E00_8FFF_data8(): readonly number[] {
  return asm`
  ROR $66
  ROR $66
  ROR $66
  ROR $66
  ROR $66
  BRK
  LDX #$04
  .byte $3C
  ROL $031E,X
  ASL $09
  ORA ($3D,X)
  ORA ($01,X)
  .byte $3C
  ORA ($3E,X)
  ROL $3E3E,X
  ROL $3F3E,X
  .byte $3F, $3F, $3F, $3F, $3F
  BRK
  LDY #$64
  ROR $9F
  .byte $02, $04, $12, $4F
  BVC $EE81
  .byte $52, $53, $54
  EOR $56,X
  BRK
  LDY #$3C
  ROL $0220,X
  ASL $11
  BIT $2C2D
  BIT $2C2C
  ROL $2E2F
  .byte $2F
  ROL $002F
  LDY #$3C
  .byte $02
  BRK
  .byte $03
  BPL $EE59
  PHA
  .byte $5C, $5C
  EOR $5C4E
  .byte $5C
  EOR #$48
  .byte $5C, $5C
  EOR $5C4E
  .byte $5C
  EOR #$2C
  AND $2C2C
  BIT $2C2C
  BIT $0A09
  ANC #$2C
  BIT $2D2C
  BIT $2F2E
  ROL $2E2F
  .byte $2F
  ROL $052F
  ASL $07
  ROL $2E2F
  .byte $2F
  ROL $A000
  .byte $3C, $02
  BRK
  .byte $03
  BPL $EE91
  PHA
  .byte $5C, $5C
  EOR $5C4E
  .byte $5C
  EOR #$48
  .byte $5C, $5C
  EOR $5C4E
  .byte $5C
  EOR #$2C
  BIT $2C2C
  BIT $2D2C
  BIT $2D2C
  BIT $2C2C
  BIT $2C2C
  .byte $2F
  ROL $2E2F
  .byte $2F
  ROL $2E2F
  ROL $2E2F
  .byte $2F
  ROL $2E2F
  .byte $2F
  BRK
  LDY #$3C
  .byte $02
  BRK
  .byte $03
  PHP
  PHP
  PHA
  .byte $5C
  LSR A
  ALR #$4C
  .byte $5C, $5C
  EOR #$2C
  AND $2C2C
  BIT $2C2C
  BIT $2F2E
  ROL $2E2F
  .byte $2F
  ROL $002F
  LDY #$56
  LSR $0C
  .byte $02
  PHP
  BPL $EEE2
@EEE2:
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  BRK
  BRK
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  BRK
  BRK
  LDY #$3C
  ROR A
  AND ($02,X)
  .byte $03
  ORA $7A,X
  ORA ($01,X)
  .byte $7F, $14
  ORA $00,X
  LDY #$3C
  ROL $0210,X
  PHP
  BPL $EF09
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($00,X)
  LDY #$3C
  ROL $0207,X
  PHP
  BPL $EF21
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  ORA ($00,X)
  LDY #$06
  BRK
  STX $0408
  .byte $42
  PLP
  AND #$2A
  ANC #$2C
  AND $2F2E
  BMI $EF72
  .byte $32, $33, $34
  AND #$2A
  .byte $2F
  PLP
  AND #$2A
  ANC #$2C
  AND $2F2E
  BMI $EF82
  .byte $32, $33, $34
  AND #$2A
  .byte $2F
  BRK
  .byte $FF, $7F
  ASL $00
  STA $0408
  .byte $42
  PLP
  AND #$2A
  ANC #$2C
  AND $2F2E
  BMI $EF9B
  .byte $32, $33, $34
  AND #$2A
  .byte $2F
  PLP
  AND #$2A
  ANC #$2C
  AND $2F2E
  BMI $EFAB
  .byte $32, $33, $34
  AND #$2A
  .byte $2F
  BRK
  .byte $FF
@EF82:
  .byte $7F
  ASL $00
  .byte $8F
  PHP
  .byte $04, $42
  PLP
  AND #$2A
  ANC #$2C
  AND $2F2E
  BMI $EFC4
  .byte $32, $33, $34
  AND #$2A
  .byte $2F
  PLP
  AND #$2A
  ANC #$2C
  AND $2F2E
  BMI $EFD4
  .byte $32, $33, $34
  AND #$2A
  .byte $2F
  BRK
  .byte $DF
@EFAB:
  .byte $7F
  BRK
  .byte $DF, $7F
  BRK
  .byte $DF, $7F
  BRK
  .byte $DF, $7F
  BRK
  .byte $DF, $7F
  BRK
  .byte $DF, $7F
  BRK
  .byte $DF, $7F
  BRK
  .byte $DF, $7F
  BRK
  .byte $DF, $7F
@EFC4:
  BRK
  .byte $DF, $7F
  BRK
  .byte $DF, $7F
  BRK
  .byte $DF, $7F
  BRK
  .byte $DF, $7F
  BRK
  .byte $DF, $7F
  BRK
@EFD4:
  .byte $DF, $7F
  BRK
  .byte $FF, $7F
  LSR $46,X
  BPL $EFDF
  PHP
  BPL $EFE2
  PLA
  .byte $02
@EFE2:
  .byte $02
  AND $68,X
  .byte $02, $02
  ADC $66
  ADC $65
  ROL $66,X
  ADC $65
  BRK
  LDY #$FF
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  `;
}

// $9000-$91FF (512B): $9000-$91FF 数据�?
function build_9000_91FF_data9(): readonly number[] {
  return asm`
.byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  `;
}

// $9200-$93FF (512B): $9200-$93FF 数据�?0
function build_9200_93FF_data10(): readonly number[] {
  return asm`
.byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  `;
}

// $9400-$95FF (512B): $9400-$95FF 数据�?1
function build_9400_95FF_data11(): readonly number[] {
  return asm`
.byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  `;
}

// $9600-$97FF (512B): $9600-$97FF 数据�?2
function build_9600_97FF_data12(): readonly number[] {
  return asm`
.byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  `;
}

// $9800-$99FF (512B): $9800-$99FF 数据�?3
function build_9800_99FF_data13(): readonly number[] {
  return asm`
.byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  `;
}

// $9A00-$9BFF (512B): $9A00-$9BFF 数据�?4
function build_9A00_9BFF_data14(): readonly number[] {
  return asm`
.byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  `;
}

// $9C00-$9DFF (512B): $9C00-$9DFF 数据�?5
function build_9C00_9DFF_data15(): readonly number[] {
  return asm`
.byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  `;
}

// $9E00-$9FFF (512B): $9E00-$9FFF 数据�?6
function build_9E00_9FFF_data16(): readonly number[] {
  return asm`
.byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  `;
}

// �T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T
// Assemble all sections into full 8KB bank
// �T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T�T
const _PRG_BANK_07: readonly number[] = [
  ...build_8000_81FF_data1(),
  ...build_8200_83FF_data2(),
  ...build_8400_85FF_data3(),
  ...build_8600_87FF_data4(),
  ...build_8800_89FF_data5(),
  ...build_8A00_8BFF_data6(),
  ...build_8C00_8DFF_data7(),
  ...build_8E00_8FFF_data8(),
  ...build_9000_91FF_data9(),
  ...build_9200_93FF_data10(),
  ...build_9400_95FF_data11(),
  ...build_9600_97FF_data12(),
  ...build_9800_99FF_data13(),
  ...build_9A00_9BFF_data14(),
  ...build_9C00_9DFF_data15(),
  ...build_9E00_9FFF_data16(),
];
