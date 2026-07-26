/**
 * PRG-ROM MMC3 bank 30 (8KB) — function-based assembly
 * Mapper: 4 (MMC3) | CPU: $C000-$DFFF
 * CDL: code=6350 data=1495 unaccessed=347
 *
 * 功能: MMC3 系统库 ($C000-$DFFF): NMI处理/显示列表/数学运算
 *
 * Pattern: 参考 bank_31.ts
 *   每个 build_xxx() 函数返回其覆盖地址范围的 raw 6502 字节，
 *   最后通过 spread 拼成完整的 8KB 数组
 */


import { asm } from '../_6502asm';
export { _PRG_BANK_30 as default };

console.log('[prg_30_system_lib] loaded');

// $C000-$C3FF (1024B): $8000-$83FF 代码/数据段1
function build_C000_C3FF_segN(): readonly number[] {
  return asm`
  TAX
  BRK
  AND #$CB
  .byte $1B, $3C
  INC $39FF,X
  .byte $1F, $FF, $83
  CLD
  LDA ($02,X)
  NOP
  BRK
  JSR $E70E ; → bank switch?
  ORA ($4B,X)
  .byte $FC
  ROL $87CA
  .byte $03, $8F
  LDX $17,Y
  .byte $1F
  LDX $1FE9,Y
  LDX $FD6D,Y
  .byte $F4, $F2
  LDA $C09A,X
  .byte $D2, $03
  BRK
  ROL A
  BRK
  BRK
  .byte $80
  AND $88
  NOP
  LDA $FD,X
  .byte $5C, $BB, $3F
  CMP $7F,X
  .byte $AF, $4F, $AB, $D3
  ADC $27
  .byte $17
  INC $52,X
  LSR $A5,X
  LSR $A4,X
  .byte $03
  EOR $84,X
  PHP
  EOR ($A4,X)
  JSR $5552
  STA $5A,X
  LDA $BD,X
  NOP
  CMP $EFD6,X
  LDA $5E,X
  .byte $5F
  NOP
  EOR $4D5B,X
  LDA $97
  LDY $4A
  LSR $A5,X
  PHA
  BIT $15
  .byte $04
  ORA ($A0),Y
  .byte $02
  EOR $AAA5
  .byte $72
  EOR $EDAB,X
  ADC $BEEF
  LDA $BE,X
  LDA $3769
  EOR $56,X
  LDA $92A4
  LSR $A5,X
  ROL A
  LDA $92
  .byte $14
  ORA ($22),Y
  .byte $12, $12
  AND #$55
  EOR #$AD
  TAX
  ROR A
  EOR $EDEB,X
  DEC $BFBA,X
  .byte $DB
  INC $6E,X
  EOR $AD,X
  ROL A
  EOR $52,X
  LSR A
  STY $88,X
  LSR A
  .byte $22
  EOR #$24
  EOR #$4A
  .byte $52
  STA $54A4,Y
  EOR $95,X
  CMP $5A,X
  ARR #$D7
@E0B2:
  .byte $DB
  ADC $BBEF,X
  SBC $55AD
  .byte $AB
  STY $52,X
  EOR #$49
  .byte $52
  LDA #$95
  ORA $EAA8
  SBC ($7B),Y
  LDX $2AAF
  STY $1501
  ASL $30
  AND $F880,X
  .byte $FF, $FB, $FF, $2F, $0F
  CLV
  SED
  CPY #$F0
  .byte $A7, $02, $43
  BPL $E0DF
@E0DF:
  RTI
  CLC
  BNE $E0E2
  .byte $CF, $F7, $FF, $FF, $FF
  ALR #$C2
  BRK
  PLP
  ORA $000A,X
  BRK
  BRK
  .byte $9C, $FF, $FF, $FB, $7F, $0F, $5F
  CLC
  CPX #$D2
  .byte $92, $F7, $BB
  EOR $12
  .byte $04
  BRK
  BPL $E152
  BVC $E0B2
  .byte $FF, $FF, $FF, $8F
  ORA ($27),Y
  LDA #$ED
  .byte $8B, $57, $0C
  TYA
  .byte $32
  RTI
  PLP
  .byte $64
  ROR A
  LDA #$1F
  .byte $6F
  ROR $6519
  .byte $1C, $F3, $FF, $FF
@E121:
  .byte $EF, $04
  PHP
  JSR $0642
  BRK
  AND ($72,X)
  .byte $FF, $FF, $7F, $07
  TXA
  BMI $E121
  .byte $EF, $57, $DF, $AF
  ORA $C112,Y
  BPL $E140
  .byte $42
  BPL $E1AE
  LDA $CF
  LSR $5FBB,X
  .byte $FF
  INC $A479,X
  STA ($28,X)
  .byte $82
  BCC $E16B
  ORA ($97,X)
  .byte $9F
  SBC #$6D
  .byte $73
  LDX $6ADA
  STA $4A
  ANC #$79
  NOP
  TXS
  STA $92
  LSR $86
  SEC
  .byte $37, $3F, $37
  SBC $A8A0
  SEC
  JMP ($B972)
  LDA $91,X
@E16B:
  CMP $4A
  LDY $AE,X
  .byte $E7
  JMP ($1567)
  .byte $83
  CLC
  ORA ($66),Y
  INC $B4,X
  .byte $53
  LSR $731C
  SBC #$CD
  LDA #$2A
  .byte $52, $9C
  STA $ED39,X
  PLA
  EOR ($12,X)
  AND ($71,X)
  INC $97CD
  .byte $B7, $5C, $32
  LDA $89
  .byte $54
  ADC $52D5
  .byte $53
  ADC $96
  LDA $52,X
  LSR A
  LSR $DD
  ADC $545A,Y
  .byte $C3
  CPY $9A
  TAX
  STX $55,Y
  .byte $CF
  LDX $B9,Y
  .byte $52
  LDY $4C
@E1AE:
  AND ($65),Y
  ROR A
  LDA $53,X
  AND $692B
  PHA
  CMP #$64
  .byte $73, $D7
  LDX $3C7B
  TAX
  .byte $62
  LDA ($4A,X)
  AND $A899
  STY $54,X
  SBC #$AA
  SBC #$66
  .byte $AB
  AND $5A,X
  ARR #$59
  ORA $23,X
  SBC ($58,X)
  ORA $57,X
  DEC $54D8
  EOR $66A9
  .byte $AB, $9E
  ROR $AA,X
  .byte $44
  LDA $92
  TXS
  EOR $D6,X
  LDY $E35C,X
  LDY $8A
  .byte $32
  LDA $72,X
  .byte $D3
  BIT $25
  EOR $AB,X
  EOR $6B,X
  ADC #$95
  EOR $9D,X
  NOP
  ROR $6869
  PLP
  LDA $CA
  EOR $53,X
  .byte $AB
  ASL $55,X
  EOR $95,X
  STX $6AB5
  LDA $D6,X
  LSR $4B,X
  ROL $15
  LDA $54
  DEX
  STY $6A,X
  LDX $AE,Y
  .byte $B3
  ROL A
  EOR $A5,X
  EOR $B3,X
  TAX
  LDX $AA
  .byte $54
  EOR $95,X
  .byte $52
  EOR $5ACE,Y
  ROR A
  TAX
  .byte $D4, $D4, $B2
  LSR A
  .byte $AB, $5C
  LDA $6A,X
  LDA $AA
  .byte $54
  STA $A6,X
  TAX
  EOR $6659,Y
  EOR $A96A,Y
  LDY $4A
  LDA $6AD5
  EOR $D5,X
  LDY $596A
  ADC #$6A
  ADC #$2A
  LDA $C8
  .byte $52
  ALR #$CD
  TAX
  LSR $5B,X
  .byte $9B
  NOP
  EOR $2A,X
  CMP $E2,X
  .byte $54
  EOR $3555
  EOR $55,X
  AND #$A9
  JMP $6ACB
  CMP $AA,X
  LDA $66,X
  EOR $55,X
  LDA $32
  .byte $53
  STA $4A,X
  EOR $35,X
  EOR $55,X
  EOR $B5,X
  TAX
  LSR $55,X
  EOR $53,X
  EOR $4D,X
  STA $A9,X
  TAX
  STX $55,Y
  EOR $35,X
  EOR $A5,X
  LSR A
  EOR $55,X
  LDA $55AA
  EOR $55,X
  EOR $A9,X
  TAX
  TAX
  ROR $55
  EOR $55,X
  EOR $55,X
  EOR $95,X
  LDA $AA
  .byte $54
  EOR $D5,X
  TAX
  TAX
  ROR A
  EOR $55,X
  EOR $B3,X
  LDY $5554
  STA $A6,X
  ROR A
  STA $A9,X
  TAX
  .byte $54
  EOR $D5,X
  TAX
  LSR $CD,X
  .byte $52
  EOR $55,X
  EOR $55,X
  EOR $A6,X
  TAX
  TAX
  TAX
  TAX
  EOR $5F,X
  .byte $0C
  TYA
  .byte $FF, $07, $DC, $0F
  BRK
  BEQ $E2C9
  .byte $03
  SED
  ORA ($FE,X)
  .byte $07, $0F
  ASL $FF00,X
  .byte $FF
  ORA ($F0,X)
  .byte $03, $FC
  ORA ($FE,X)
  CPY #$71
  INC $181F,X
  BRK
  .byte $FF
  ORA ($FE,X)
  ORA ($FE,X)
  .byte $07
  BRK
  INC $FE01,X
  .byte $FF
  ORA ($F8,X)
  .byte $07
  BEQ $E34F
  BRK
  .byte $FC, $7F
  BRK
  ADC $C007
  .byte $FF, $3F
  BRK
  INC $400F,X
  CPY #$FF
  .byte $03
  CPY #$FF
  .byte $1F
  BRK
  INC $50E5,X
  .byte $1F
  CPY #$BF
  BRK
  .byte $FC, $27, $7F
  CPY #$00
  SED
  .byte $FF
  ADC $0E00,X
  CPX #$7F
  CPY #$FF
  ORA $00
  .byte $FF, $0F
  CPY #$7F
  BRK
  INX
  .byte $FF, $03
  INX
  .byte $5C
  ADC $E00D,X
  .byte $27
  ORA ($FF,X)
  .byte $5F
  PHP
  RTI
  SBC ($FF),Y
  STA ($DE,X)
  NOP
  BRK
  .byte $FF
  ORA ($F8,X)
  .byte $FF
  EOR ($80,X)
  NOP
  INC $F001,X
  .byte $7F, $80, $2F
  CPY #$FF
  .byte $07
  CPY #$7F
  LDY #$E0
  .byte $7F
  BRK
  INC $0503,X
  .byte $6F
  SBC $0F,X
  CPY #$2F
  ROR $7D08,X
  BRK
  .byte $FF, $07
  BEQ $E361
  BEQ $E2FB
  RTI
  .byte $7F, $80, $5F, $FF
@E361:
  ORA ($50,X)
  .byte $F2, $57
  ASL $C4
  .byte $7F
  CPX #$07
  .byte $FC
  STA ($6B,X)
  AND $2FF8
  BIT $60
  .byte $FF
  BRK
  .byte $9F, $F4, $27, $80, $FF, $80
  CPX $409F
  CMP $D4,X
  .byte $AF, $02
  SED
  LDY $A05A,X
  LSR $17D2,X
  INX
  .byte $0F, $FC
  ORA #$F0
  .byte $97
  RTI
  .byte $3F
  LDA ($3F,X)
  .byte $44
  NOP
  .byte $0F
  SEI
  CMP $A8,X
  INX
  .byte $0F
  BEQ $E3EB
  .byte $34
  BNE $E3FE
  PLP
  .byte $5F, $52
  AND $8B
  .byte $4F
  ANC #$D2
  .byte $FF
  BRK
  ADC $6D,X
  EOR $B2
  .byte $92
  DEC $5D49,X
  .byte $04, $BB
  ANC #$C9
  .byte $0F
  AND #$E9
  LDA $AB20,X
  .byte $D4, $57
  PHA
  INC $89,X
  TAX
  INX
  .byte $57, $52, $52, $AB
  EOR $2B,X
  EOR #$BD
  .byte $54, $B2
  LDA $22,X
  ARR #$47
  LDY $A6,X
  CPX $A09A
  .byte $5B
  EOR $95,X
  .byte $D4
  TSX
  .byte $52
  ROR A
  TAX
  LSR $176A
  .byte $D2
  ROR $55
  TAX
  ORA $EB,X
  LSR A
  NOP
  LDA #$55
  .byte $74
@E3EB:
  ALR #$74
  ANC #$AA
  EOR $13,X
  LDA $A927,Y
  TAX
  EOR $2BD2
  ADC #$A5
  BRK
  BRK
  BRK
  BRK
@E3FE:
  BRK
  BRK
  `;
}

// $C400-$C7FF (1024B): $8400-$87FF 代码/数据段2
function build_C400_C7FF_segN(): readonly number[] {
  return asm`
  TAY
  LDA #$08
  STA $20
  STA $2000
  LDA #$1E
  STA $21
  STA $2001
  LDA #$00
  STA $22
  LDX #$00
  JSR $C4B2 ; → bank switch?
  LDX #$02
  JSR $C4B9 ; → bank switch?
  TYA
  JMP $A200
  BIT $3B
  BMI $E472
  SEC
  ROR $3B
  STA $3C
  STX $3D
  STY $3E
  LDA $22
  ORA #$07
  STA $8000
  LDA #$02
  STA $8001
  JSR $A000 ; → bank switch?
  LDA $22
  ORA #$06
  STA $8000
  LDA #$0C
  STA $8001
  JSR $8000 ; → bank switch?
  LDA $22
  ORA #$06
  STA $8000
  LDA $24
  STA $8001
  LDA $22
  ORA #$07
  STA $8000
  LDA $25
  STA $8001
  LDA $23
  STA $8000
  LDY $3E
  LDX $3D
  LDA $3C
  LSR $3B
  RTI
@E472:
  PHA
  LDA $2002
  PLA
  RTI
  BIT $3B
  BMI $E4AE
  SEC
  ROR $3B
  STA $3C
  STX $3D
  STY $3E
  LDA $22
  ORA #$07
  STA $8000
  LDA #$02
  STA $8001
  JSR $A160 ; → bank switch?
  LDA $22
  ORA #$07
  STA $8000
  LDA $25
  STA $8001
  LDA $23
  STA $8000
  LDY $3E
  LDX $3D
  LDA $3C
  LSR $3B
  RTI
@E4AE:
  STA $E000
  RTI
  STX $24
  LDA #$06
  JMP $C4BD
  STX $25
  LDA #$07
  ORA $22
  STA $23
  STA $8000
  STX $8001
  RTS
  CMP #$23
  BCS $E4F3
  TAY
  BEQ $E4F3
  STX $ED
  LDA $24
  STA $EE
  LDA $25
  STA $EF
  LDX #$00
  JSR $C4B2 ; → bank switch?
  LDX #$01
  JSR $C4B9 ; → bank switch?
  TYA
  LDX $ED
  JSR $A00F ; → bank switch?
  LDX $EF
  JSR $C4B9 ; → bank switch?
  LDX $EE
  JSR $C4B2 ; → bank switch?
@E4F3:
  RTS
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  JMP $C76E
  JMP $C64E
  JMP $C821
  JMP $CB99
  JMP $CD7C
  JMP $CAE7
  JMP $CAF7
  JMP $CB0F
  JMP $CB0D
  JMP $CB02
  JMP $CD3C
  JMP $CD0D
  JMP $CBC2
  JMP $CE08
  JMP $EF7F
  JMP $CC46
  JMP $CC02
  JMP $CCD2
  JMP $CDC9
  JMP $CDE2
  JMP $F30F
  JMP $CE2D
  JMP $CE4D
  JMP $CE4A
  JMP $CE99
  JMP $CE6E
  JMP $CBB0
  JMP $CD77
  JMP $CEFE
  JMP $C6BE
  JMP $CF4F
  JMP $CBF1
  JMP $CF72
  JMP $CF8F
  JMP $F013
  JMP $CB35
  JMP $D022
  JMP $D093
  JMP $DB62
  JMP $E233
  JMP $D0D1
  JMP $C6BE
  JMP $CF1F
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
  BRK
  JMP $D565
  JMP $D193
  JMP $E074
  JMP $E4D7
  JMP $E73E
  JMP $E0DF
  JMP $DE52
  JMP $DE5E
  JMP $DCFD
  JMP $DD02
  JMP $E059
  JMP $DFD9
  JMP $DCDF
  JMP $E54C
  JMP $E596
  JMP $E688
  JMP $E678
  JMP $DDFD
  JMP $DAAA
  JMP $DE45
  JMP $DE6C
  JMP $D8F7
  JMP $D852
  JMP $E6EC
  JMP $D7E8
  JMP $EFA2
  LDA #$08
  STA $2000
  SEI
  CLD
  LDX #$FF
  TXS
@E658:
  LDA $2002
  BPL $E658
@E65D:
  LDA $2002
  BPL $E65D
  LDA #$C0
  STA $A001
  LDA #$00
  STA $00
  STA $01
  TAY
  LDX #$08
@E670:
  STA ($00),Y
  INY
  BNE $E670
  INC $01
  DEX
  BNE $E670
  LDA #$08
  STA $20
  LDA #$06
  STA $21
  STA $2001
  LDA #$00
  STA $4010
  LDA #$40
  STA $4017
  LDA $2002
  LDA #$10
  TAX
@E695:
  STA $2006
  STA $2006
  EOR #$00
  DEX
  BNE $E695
  LDA #$00
  STA $0022
  JSR $CB35 ; → bank switch?
  JSR $CB8B ; → bank switch?
  LDA #$00
  STA $0469
  LDA #$00
  STA $0469
  STA $E000
  CLI
  LDA #$00
  JMP $CEFE
  LDX #$E0
  TXS
  LDA #$00
  STA $01
  STA $02
  LDA #$00
  STA $05
  STA $06
  LDA #$00
  STA $09
  STA $0A
  LDA #$00
  STA $0D
  STA $0E
  LDA #$00
  STA $11
  STA $12
  LDA #$00
  STA $15
  STA $16
  JSR $CF1F ; → bank switch?
  LDA #$00
  STA $1B
  STA $063F
  LDA #$08
  STA $20
  LDA #$1E
  STA $21
  LDA #$20
  STA $046C
  LDA #$00
  STA $046D
  LDA #$3F
  STA $046E
  LDX #$00
  LDA #$12
  JSR $CC02 ; → bank switch?
  LDX #$10
  LDA #$12
  JSR $CC02 ; → bank switch?
  JSR $CCD2 ; → bank switch?
  BRK
  JMP ($A204)
  .byte $07
@E71C:
  LDA $C766,X
  STA $05EB,X
  DEX
  BPL $E71C
  LDX #$01
  LDA #$28
  STA $01,X
  LDA #$00
  STA $02,X
  LDA #$CA
  LDY #$21
  JSR $CAE7 ; → bank switch?
  LDX #$05
  LDA #$50
  STA $01,X
  LDA #$00
  STA $02,X
  LDA #$D1
  LDY #$1D
  JSR $CAE7 ; → bank switch?
  LDX #$09
  LDA #$78
  STA $01,X
  LDA #$00
  STA $02,X
  LDA #$EB
  LDY #$85
  JSR $CAE7 ; → bank switch?
  LDA $20
  ORA #$80
  STA $20
  STA $19
  STA $2000
  JMP $CA97
  .byte $13, $07
  ORA $0000,Y
  .byte $AF
  ROL $24FD
  .byte $1B
  BVC $E775
  JMP $C421
@E775:
  PHA
  TXA
  PHA
  TYA
  PHA
  LDA $20
  AND #$7F
  STA $2000
  STA $20
  TSX
  TXA
  LDX #$FF
  TXS
  PHA
  LDA #$00
  STA $2003
  LDA #$02
  STA $4014
  LDA $046B
  STA $A000
  JSR $C8FB ; → bank switch?
  BIT $2002
  LDA #$3F
  STA $2006
  LDA #$00
  STA $2006
  STA $2006
  STA $2006
  LDA $20
  STA $2000
  BIT $2002
  LDA $4A
  CLC
  ADC $0538
  STA $2005
  LDA $4B
  STA $2005
  LDA $21
  STA $2001
  JSR $C9E9 ; → bank switch?
  LDX $8E
  STX $8C
  STX $8D
  LDA $C8F7,X
  AND #$7F
  STA $C000
  STA $C001
  LDX $0469
  STA $E000,X
  JSR $C9C5 ; → bank switch?
  JSR $C982 ; → bank switch?
  LDA $1B
  ORA #$80
  STA $1B
  LDA $22
  ORA #$07
  STA $8000
  LDA $25
  STA $8001
  LDA $22
  ORA #$06
  `;
}

// $C800-$CBFF (1024B): $8800-$8BFF 代码/数据段3
function build_C800_CBFF_segN(): readonly number[] {
  return asm`
  STA $8000
  LDA $24
  STA $8001
  PLA
  TAX
  TXS
  LDA $23
  STA $8000
  LDA $20
  ORA #$80
  STA $20
  STA $19
  STA $2000
  PLA
  TAY
  PLA
  TAX
  PLA
  RTI
  BIT $1B
  BVC $E828
  JMP $C478
@E828:
  LSR $E000
  LSR $E001
  LSR $19
  STA $80
  STX $81
  STY $82
  TSX
  TXA
  LDX #$FF
  TXS
  PHA
  JSR $C852 ; → bank switch?
  PLA
  TAX
  TXS
  LDY $82
  LDX $81
  LDA $0023
  STA $8000
  LDA $80
  SEC
  ROR $19
  RTI
  LDX $8D
  LDA $C8F7,X
  BMI $E876
  LDY #$02
@E85B:
  DEY
  BNE $E85B
  INX
  STX $8D
  LDA $C8F7,X
  AND #$7F
  STA $C000
  STA $C001
  BIT $2002
  LDA $0643
  STA $2005
  RTS
@E876:
  LDX #$07
@E878:
  DEX
  BNE $E878
  LDA $2002
  LDA #$22
  STA $2006
  LDA #$00
  STA $2006
  LDA $20
  AND #$FE
  STA $2000
  BIT $2002
  LDA #$00
  STA $2005
  STA $2005
  LDA $0022
  STA $8000
  LDA #$00
  STA $8001
  LDA $0022
  ORA #$01
  STA $8000
  LDA $87
  STA $8001
  LDA $0022
  ORA #$02
  STA $8000
  LDA #$1F
  STA $8001
  LDA $0022
  ORA #$03
  STA $8000
  LDA #$2E
  STA $8001
  LSR $E000
  LDA $22
  ORA #$06
  STA $8000
  LDA #$0C
  STA $8001
  JSR $8000 ; → bank switch?
  LDA $22
  ORA #$07
  STA $8000
  LDA $25
  STA $8001
  LDA $22
  ORA #$06
  STA $8000
  LDA $24
  STA $8001
  RTS
  .byte $FB, $80
  ASL $ADDC,X
  TYA
  .byte $04
  BEQ $E951
  DEC $0498
  SEC
  SBC #$01
  ASL A
  ADC $0498
  TAX
  LDA $0499,X
  TAY
  LDA $049A,X
  STA $77
  LDA $049B,X
  STA $78
  BPL $E92C
  LDX #$06
  AND #$20
  BEQ $E922
  INX
@E922:
  TXA
  ORA $0022
  STA $8000
  STY $8001
@E92C:
  LDY #$00
@E92E:
  LDA ($77),Y
  BEQ $E950
  TAX
  INY
  LDA ($77),Y
  PHA
  INY
  LDA ($77),Y
  BIT $2002
  STA $2006
  PLA
  STA $2006
  INY
@E945:
  LDA ($77),Y
  STA $2007
  INY
  DEX
  BNE $E945
  BEQ $E92E
@E950:
  RTS
@E951:
  LDA $0515
  BPL $E981
  LDX #$00
  STX $0515
@E95B:
  LDA $04A5,X
  BEQ $E981
  TAY
  INX
  LDA $04A5,X
  PHA
  INX
  LDA $04A5,X
  BIT $2002
  STA $2006
  PLA
  STA $2006
  INX
@E975:
  LDA $04A5,X
  STA $2007
  INX
  DEY
  BNE $E975
  BEQ $E95B
@E981:
  RTS
  LDX #$00
  LDA $001C
  JSR $C98B ; → bank switch?
  RTS
@E98B:
  STA $84
  LDY #$01
  STY $4016
  DEY
  STY $4016
  LDA #$04
  STA $85
  LDY #$08
@E99C:
  LDA $4016,X
  LSR A
  ROL $83
  AND #$01
  ORA $83
  STA $83
  DEY
  BNE $E99C
  CMP $84
  BEQ $E9B5
  DEC $85
  BNE $E98B
  BEQ $E9C4
@E9B5:
  LDA $001C,X
  EOR $83
  AND $83
  STA $001E,X
  LDA $83
  STA $001C,X
@E9C4:
  RTS
  LDX $00E1
  LDA $0300,X
  ADC $0700,X
  ROL $00E2
  EOR #$FF
  ROL $00E2
  ADC $00E2
  STA $00E2
  SBC $0780,X
  ADC $00E1
  STA $00E3
  INC $00E1
  RTS
  LDX #$00
  BIT $22
  BPL $E9F1
  LDX #$04
@E9F1:
  LDA $22
  STA $8000
  LDA $0490,X
  STA $8001
  LDA $22
  ORA #$01
  STA $8000
  LDA $0491,X
  STA $8001
  TXA
  EOR #$04
  TAX
  LDY #$02
@EA0F:
  TYA
  ORA $22
  STA $8000
  LDA $0490,X
  STA $8001
  INX
  INY
  CPY #$06
  BNE $EA0F
  RTS
  LDA $21
  ORA #$1E
  STA $21
  LDA #$00
  STA $0490
  LDA #$02
  STA $0491
  STA $0087
  LDA #$00
  STA $8E
  LDA #$01
  STA $0469
  LDA #$01
  STA $0543
  LDA #$23
  STA $0544
  LDA #$45
  STA $0545
  LDA #$01
  JSR $CB0F ; → bank switch?
  JSR $EE9F ; → bank switch?
  JSR $E3CA ; → bank switch?
  JMP $CA4D
  LDA #$00
  STA $05
  LDA #$00
  STA $09
  LDA #$00
  STA $0D
  LDA #$00
  STA $15
  LDA #$00
  STA $11
@EA6F:
  LDA #$01
  JSR $CB0F ; → bank switch?
  LDA #$10
  AND $001E
  BEQ $EA6F
  LDX #$05
  JSR $CB02 ; → bank switch?
  LDX #$09
  JSR $CB02 ; → bank switch?
  LDX #$0D
  JSR $CB02 ; → bank switch?
  LDX #$15
  JSR $CB02 ; → bank switch?
  LDX #$11
  JSR $CB02 ; → bank switch?
  JMP $CA4D
  LDX #$01
@EA99:
  LDA $00,X
  BEQ $EAA5
  CMP #$FF
  BEQ $EAD4
  DEC $00,X
  BEQ $EAB9
@EAA5:
  TXA
  CLC
  ADC #$04
  TAX
  CPX #$19
  BNE $EA99
@EAAE:
  LDA $1B
  BPL $EAAE
  AND #$7F
  STA $1B
  JMP $CA97
@EAB9:
  LSR $19
  STX $00
  LDA $02,X
  STA $24
  LDA $03,X
  STA $25
  JSR $CE2D ; → bank switch?
  LDA $01,X
  TAX
  TXS
  SEC
  ROR $19
  PLA
  TAY
  PLA
  TAX
  RTS
@EAD4:
  STX $00
  LDA $02,X
  STA $24
  CLC
  ADC #$01
  STA $25
  JSR $CE2D ; → bank switch?
  LDA $01,X
  TAX
  TXS
  RTS
  PHA
  TYA
  LDY $01,X
  STA $0101,Y
  PLA
  STA $0102,Y
  LDA #$FF
  STA $00,X
  RTS
  LDA #$00
  LDX $00
  STA $00,X
  STA $01,X
  JMP $CAA5
  LDA $01,X
  BEQ $EB0C
  LDA $00,X
  BNE $EB0C
  INC $00,X
@EB0C:
  RTS
  LDA #$00
  STA $7F
  TXA
  PHA
  TYA
  PHA
  LDX $00
  LDA $24
  STA $02,X
  LDA $25
  STA $03,X
  LDA $7F
  STA $00,X
  TXA
  TAY
  TSX
  STX $01,Y
  LDX $00
  JMP $CAA5
  JSR $1840
  CLC
  CLC
  CLC
  CLC
  CLC
  LDA $20
  AND #$7F
  STA $20
  STA $2000
  LDA #$06
  STA $2001
  LDA #$20
  JSR $CB5C ; → bank switch?
  LDA #$24
  JSR $CB5C ; → bank switch?
  LDA #$1E
  STA $2001
  LDA $20
  ORA #$80
  STA $20
  STA $2000
  RTS
  BIT $2002
  STA $2006
  LDA #$00
  STA $2006
  LDA #$00
  LDX #$C0
  LDY #$04
@EB6D:
  STA $2007
  DEX
  BNE $EB6D
  DEY
  BNE $EB6D
  TXA
  LDX #$40
@EB79:
  STA $2007
  DEX
  BNE $EB79
  BIT $2002
  LDA #$00
  STA $2005
  STA $2005
  RTS
  LDY #$00
  LDA #$F8
@EB8F:
  STA $0200,Y
  INY
  INY
  INY
  INY
  BNE $EB8F
  RTS
  ASL A
  TAY
  PLA
  STA $36
  PLA
  STA $37
  INY
  LDA ($36),Y
  PHA
  INY
  LDA ($36),Y
  STA $37
  PLA
  STA $36
  JMP ($0036)
  STA $0518
  LDA #$80
  STA $0516
  LDA #$00
  STA $05
  LDA #$00
  JSR $CB0F ; → bank switch?
  RTS
  LDY #$00
  CMP #$A0
  BCC $EBF0
  LDY #$94
  CMP #$C8
  BCC $EBDA
  LDY #$95
  SBC #$AE
  CMP #$1F
  BCC $EBF0
  SBC #$05
  BCS $EBED
@EBDA:
  CMP #$B4
  PHP
  BCC $EBE1
  SBC #$14
@EBE1:
  SEC
  SBC #$9A
  CMP #$15
  BCC $EBEA
  ADC #$04
@EBEA:
  PLP
  BCC $EBF0
@EBED:
  CLC
  ADC #$40
@EBF0:
  RTS
  LDX #$00
@EBF3:
  LDY $0700,X
  BEQ $EBFE
  INX
  CPX #$05
  BNE $EBF3
  RTS
@EBFE:
  .byte $9D, $00
  `;
}

// $CC00-$CFFF (1024B): $8C00-$8FFF 代码/数据段4
function build_CC00_CFFF_segN(): readonly number[] {
  return asm`
  .byte $07
  RTS
  LDY #$00
  STY $66
  ASL A
  ROL $66
  ASL A
  TAY
  ROL $66
  ASL A
  ROL $66
  STA $65
  TYA
  ADC $65
  BCC $EC19
  INC $66
@EC19:
  CLC
  ADC #$CC
  STA $65
  LDA $66
  ADC #$FB
  STA $66
  LDA #$10
  STA $046C
  LDY #$00
@EC2B:
  TXA
  AND #$03
  BEQ $EC35
  LDA ($65),Y
  INY
  BNE $EC37
@EC35:
  LDA #$0F
@EC37:
  STA $046F,X
  INX
  DEC $046C
  BNE $EC2B
  LDA #$20
  STA $046C
  RTS
  LDA #$00
  STA $05F4
  LDA #$06
@EC4D:
  PHA
@EC4E:
  LDA #$01
  JSR $CB0F ; → bank switch?
  LDA $0515
  BNE $EC4E
  LDA #$01
  STA $0515
  LDY #$4F
  LDX #$00
  TXA
@EC62:
  STA $04A5,X
  INX
  DEY
  BNE $EC62
  LDA #$18
  STA $04A5
  STA $04C0
  LDA #$20
  STA $04A6
  PLA
  PHA
  ORA #$08
  LSR A
  ROR $04A6
  LSR A
  ROR $04A6
  ORA #$20
  STA $04A7
  STA $04C2
  LDA $04A6
  CLC
  ADC #$20
  STA $04C1
  LDA #$80
  STA $0515
  PLA
  SEC
  SBC #$01
  BPL $EC4D
@EC9E:
  LDA #$01
  JSR $CB0F ; → bank switch?
  LDA $0515
  BNE $EC9E
  LDA #$01
  STA $0515
  LDA #$20
  STA $04A5
  LDA #$E0
  STA $04A6
  LDA #$23
  STA $04A7
  LDX #$00
  TXA
@ECBF:
  STA $04A8,X
  INX
  CPX #$21
  BNE $ECBF
  LDA #$80
  STA $0515
  LDA #$01
  JSR $CB0F ; → bank switch?
  RTS
  TSX
  LDA $0101,X
  STA $75
  PHA
  LDA $0102,X
  STA $76
  PLA
  CLC
  ADC #$03
  STA $0101,X
  BCC $ECEA
  INC $0102,X
@ECEA:
  TYA
  PHA
  LDA $0498
  ASL A
  ADC $0498
  TAX
  LDY #$01
  LDA ($75),Y
  STA $0499,X
  INY
  LDA ($75),Y
  STA $049A,X
  INY
  LDA ($75),Y
  STA $049B,X
  INC $0498
  PLA
  TAY
  RTS
  TXA
  PHA
  LDA #$00
  STA $6B
  STA $6C
  STA $6D
  STA $6E
  LDX #$10
@ED1B:
  ROR $68
  ROR $67
  BCC $ED2E
  CLC
  LDA $6D
  ADC $69
  STA $6D
  LDA $6E
  ADC $6A
  STA $6E
@ED2E:
  ROR $6E
  ROR $6D
  ROR $6C
  ROR $6B
  DEX
  BNE $ED1B
  PLA
  TAX
  RTS
  TXA
  PHA
  LDA #$00
  STA $72
  STA $73
  LDX #$10
  ROL $6F
  ROL $70
@ED4A:
  ROL $72
  ROL $73
  BCS $ED60
  LDA $73
  CMP $74
  BEQ $ED5A
  BCC $ED6D
  BCS $ED60
@ED5A:
  LDA $72
  CMP $71
  BCC $ED6D
@ED60:
  LDA $72
  SBC $71
  STA $72
  LDA $73
  SBC $74
  STA $73
  SEC
@ED6D:
  ROL $6F
  ROL $70
  DEX
  BNE $ED4A
  PLA
  TAX
  RTS
  LDA $05FB
  EOR #$0B
  ASL A
  TAY
  LDA $CD89,Y
  STA $34
  LDA $CD8A,Y
  STA $35
  RTS
  BRK
  .byte $03, $0C, $03
  CLC
  .byte $03
  BIT $03
  BMI $ED96
  .byte $3C, $03
  PHA
@ED96:
  .byte $03, $54, $03
  RTS
  .byte $03
  JMP ($7803)
  .byte $03
  STY $03
  BCC $EDA6
  .byte $9C, $03
  TAY
@EDA6:
  .byte $03
  LDY $03,X
  CPY #$03
  CPY $D803
  .byte $03
  CPX $03
  BEQ $EDB6
  .byte $FC, $03
  PHP
@EDB6:
  .byte $04, $0C, $04
  BPL $EDBF
  .byte $14, $04
  CLC
  .byte $04
@EDBF:
  .byte $1C, $04
  JSR $2404
  .byte $04
  PLP
  .byte $04
  BIT $A204
  BRK
@EDCB:
  CMP #$0C
  BCC $EDD4
  SBC #$0C
  INX
  BNE $EDCB
@EDD4:
  ASL A
  ASL A
  ASL A
  ADC #$54
  TAY
  TXA
  ASL A
  ASL A
  ASL A
  ADC #$34
  TAX
  RTS
  TXA
  SEC
  SBC #$30
  BCC $EE05
  CMP #$A0
  BCS $EE05
  LSR A
  LSR A
  LSR A
  TAX
  TYA
  SEC
  SBC #$50
  BCC $EE05
  CMP #$60
  BCS $EE05
  LSR A
  LSR A
  LSR A
@EDFD:
  DEX
  BMI $EE07
  CLC
  ADC #$0C
  BNE $EDFD
@EE05:
  LDA #$FF
@EE07:
  RTS
  TAY
  LDA $0024
  PHA
  LDA $0025
  PHA
  TYA
  PHA
  LDA $22
  LDA #$1C
  STA $24
  LDA #$1D
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8000 ; → bank switch?
  PLA
  STA $25
  PLA
  STA $24
  JMP $CE2D
  LDA $22
  ORA #$06
  STA $23
  STA $8000
  LDA $24
  STA $8001
  LDA $22
  ORA #$07
  STA $23
  STA $8000
  LDA $25
  STA $8001
  RTS
  CLC
  ADC #$40
  ASL A
  PHP
  BPL $EE53
  EOR #$FF
@EE53:
  AND #$7E
  TAX
  LDA $FB4D,X
  TAY
  LDA $FB4C,X
  TAX
  PLP
  BCC $EE6D
  TXA
  EOR #$FF
  TAX
  TYA
  EOR #$FF
  TAY
  INX
  BNE $EE6D
  INY
@EE6D:
  RTS
  STA $36
  ASL A
  ADC $36
  STA $36
  LDA #$80
  STA $37
  LDA $24
  PHA
  LDA $25
  PHA
  LDA #$1C
  STA $24
  LDA #$1D
  STA $25
  JSR $CE2D ; → bank switch?
  JSR $CE96 ; → bank switch?
  PLA
  STA $25
  PLA
  STA $24
  JMP $CE2D
  JMP ($0036)
  STA $46
  INC $46
  LDA #$08
  STA $47
  LDA $46
  STA $48
  LDA #$0A
  STA $49
@EEA9:
  LDA $48
  CMP $0441
  BEQ $EEC3
  CMP $0442
  BEQ $EEC3
  JSR $CD7C ; → bank switch?
  LDY #$0A
  LDA ($34),Y
  BNE $EEC3
  JSR $CED6 ; → bank switch?
  BCS $EED3
@EEC3:
  INC $48
  DEC $49
  BNE $EEA9
  LDA $47
  CLC
  ADC #$08
  STA $47
  JMP $CEA1
@EED3:
  LDA $48
  RTS
  LDY #$06
  LDA ($34),Y
  SEC
  SBC $0635
  BCS $EEE4
  EOR #$FF
  ADC #$01
@EEE4:
  CMP $47
  BCS $EEFC
  LDY #$08
  LDA ($34),Y
  SEC
  SBC $0637
  BCS $EEF6
  EOR #$FF
  ADC #$01
@EEF6:
  CMP $47
  BCS $EEFC
  SEC
  RTS
@EEFC:
  CLC
  RTS
  PHA
  LDA #$00
  STA $0469
  LDA #$00
  STA $0469
  STA $E000
  JSR $CB8B ; → bank switch?
  JSR $CB35 ; → bank switch?
  LDA $20
  AND #$7F
  STA $2000
  STA $20
  PLA
  JMP $C400
  LDA #$68
  STA $3A
  LDA #$04
  STA $3B
  LDA #$97
  STA $3C
  LDA #$02
  STA $3D
  LDA #$00
  TAY
@EF32:
  STA ($3A),Y
  INY
  BNE $EF32
  INC $3B
  DEC $3D
  BNE $EF32
@EF3D:
  STA ($3A),Y
  INY
  DEC $3C
  BNE $EF3D
  LDX #$A5
  LDA #$00
@EF48:
  STA $003A,X
  DEX
  BNE $EF48
  RTS
  LDA #$00
@EF51:
  PHA
  JSR $CD7C ; → bank switch?
  LDY #$0A
  LDA #$00
  STA ($34),Y
  PLA
  PHA
  BEQ $EF63
  CMP #$0B
  BNE $EF69
@EF63:
  LDY #$07
  LDA #$00
  STA ($34),Y
@EF69:
  PLA
  CLC
  ADC #$01
  CMP #$16
  BNE $EF51
  RTS
  PHA
  LDA $22
  LDA #$1A
  STA $24
  LDA #$1B
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $802A ; → bank switch?
  LDA #$18
  STA $24
  LDA #$19
  STA $25
  JMP $CE2D
  STA $0623
  TAX
  LDA $D002,X
  STA $02FF
  LDA $D01A,X
  STA $02FD
  LDA #$03
  STA $02FE
@EFA4:
  LDA #$01
  JSR $CB0F ; → bank switch?
  LDA $0622
  ASL A
  ASL A
  ASL A
  ASL A
  LDX $0623
  CLC
  ADC $D00A,X
  STA $02FC
  LDA #$0C
  AND $001E
  BEQ $EFE7
  LDX #$01
  AND #$08
  BEQ $EFC9
  LDX #$FF
@EFC9:
  TXA
  CLC
  ADC $0622
  BMI $EFE7
  LDX $0623
  CMP $D012,X
  BEQ $EFDA
  BCS $EFE7
@EFDA:
  STA $0622
  LDX $0623
  CPX #$05
  BNE $EFE7
  STA $002C
@EFE7:
  LDA #$80
  AND $001E
  BNE $EFF8
  LDA #$40
  AND $001E
  BEQ $EFA4
  CLC
  BCC $EFFC
@EFF8:
  SEC
  LDA $0622
@EFFC:
  LDX #$F8
  .byte $8E, $FC
  `;
}

// $D000-$D3FF (1024B): $9000-$93FF 代码/数据段5
function build_D000_D3FF_segN(): readonly number[] {
  return asm`
  .byte $02
  RTS
  PHA
  PHA
  PHA
  PHA
  RTI
  PHA
  PHA
  PHA
  TXS
  TXS
  TXS
  TXS
  .byte $92
  LDX #$B2
  .byte $C2
  BRK
  ORA ($02,X)
  .byte $03, $04, $03, $02
  ORA ($11,X)
  ORA ($11),Y
  ORA ($71),Y
  ADC ($71),Y
  ADC ($AD),Y
  .byte $27
  BRK
  CMP #$01
  BEQ $E030
  CMP #$02
  BEQ $E030
  JMP $D092
@E030:
  LDA #$00
@E032:
  PHA
  LDX #$00
  JSR $CE08 ; → bank switch?
  LDA $33
  STA $37
  LDA $32
  STA $36
  LDY #$00
  LDA ($34),Y
  CMP #$20
  BNE $E054
  LDX #$04
  LDA $0027
  CMP #$01
  BEQ $E05E
  DEX
  BNE $E05E
@E054:
  LDX #$03
  LDA $0027
  CMP #$01
  BEQ $E05E
  DEX
@E05E:
  LSR $33
  ROR $32
  DEX
  BNE $E05E
  LDY #$01
  LDA ($34),Y
  CLC
  ADC $32
  TAX
  INY
  LDA ($34),Y
  ADC $33
  CMP $37
  PHP
  BCC $E079
  LDA $37
@E079:
  STA ($34),Y
  TXA
  PLP
  BCC $E087
  BNE $E085
  CMP $36
  BCC $E087
@E085:
  LDA $36
@E087:
  DEY
  STA ($34),Y
  PLA
  CLC
  ADC #$01
  CMP #$0B
  BNE $E032
  RTS
  LDA #$32
  BIT $063E
  BMI $E0A8
  LDX $05FB
  BEQ $E0A1
  LDX #$01
@E0A1:
  LDA $002A,X
  TAX
  LDA $D0AC,X
@E0A8:
  JSR $CBF1 ; → bank switch?
  RTS
  .byte $3C
  AND $353F,Y
  AND $35,X
  AND $35,X
  RTI
  .byte $34, $34, $34, $34, $34, $37, $3B, $3B, $3B, $3B
  NOP
  NOP
  NOP
  NOP
  NOP
  NOP
  ROL $36,X
  ROL $36,X
  ROL $3D,X
  AND $3D3D,X
  SEC
  ROL $AD3E,X
  ROL A
  BRK
  CMP #$02
  BNE $E10F
  LDA #$00
@E0DA:
  PHA
  CMP #$0B
  BCC $E0E1
  ADC #$0A
@E0E1:
  JSR $CD7C ; → bank switch?
  LDY #$00
  LDA ($34),Y
  TAX
  PLA
  CPX #$20
  BEQ $E0F6
  CLC
  ADC #$01
  CMP #$16
  BNE $E0DA
  RTS
@E0F6:
  LDX #$00
  LDA $044D
  BNE $E10C
  LDY #$01
  LDA ($34),Y
  SEC
  SBC #$64
  INY
  LDA ($34),Y
  SBC #$00
  BPL $E10C
  INX
@E10C:
  STX $044D
@E10F:
  RTS
  LDA #$12
  STA $24
  LDA #$13
  STA $25
  JSR $CE2D ; → bank switch?
  JMP $B000
  LDA $0027
  CMP #$05
  BNE $E128
  JMP $D110
@E128:
  LDA #$00
  STA $063E
  STA $0640
  STA $0641
  STA $0613
  LDA $0027
  CMP #$04
  BNE $E14F
  PHA
  LDA $22
  LDA #$1A
  STA $24
  LDA #$1B
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8030 ; → bank switch?
@E14F:
  STA $0629
  ASL A
  STA $3A
  LDA #$08
  LDX $002B
  CPX #$0E
  BEQ $E168
  CPX #$12
  BEQ $E168
  CPX #$1A
  BCS $E168
  LDA #$00
@E168:
  CLC
  ADC $3A
  TAX
  LDA $D183,X
  STA $05F7
  LDA $D184,X
  STA $05F8
  LDA #$00
  STA $05F9
  LDX #$50
  TXS
  JMP $DAAA
  LDY $00,X
  LDY $00,X
  NOP
  BRK
  NOP
  BRK
  .byte $D2
  BRK
  .byte $D2
  BRK
  NOP
  BRK
  NOP
  BRK
  TAX
  CLC
  ADC $05FF
  STA $05FF
  TXA
  PHA
  JSR $D235 ; → bank switch?
  PLA
  LDX $05F8
  BNE $E1AE
  CPX $05F7
  BNE $E1AE
  JMP $D220
@E1AE:
  EOR #$FF
  CLC
  ADC #$01
  BNE $E1B8
  JMP $D21F
@E1B8:
  CLC
  ADC $05F7
  TAX
  LDA $05F8
  ADC #$FF
  BPL $E1C7
  LDA #$00
  TAX
@E1C7:
  STA $05F8
  STX $05F7
  LDA #$00
  JSR $EF7F ; → bank switch?
  BIT $063E
  BMI $E1EB
  LDA $05F7
  CMP #$1E
  BCS $E1EB
  LDA $063E
  ORA #$80
  STA $063E
  LDA #$32
  JSR $CBF1 ; → bank switch?
@E1EB:
  LDA $05F8
  ORA $05F7
  BNE $E21F
  LDA #$00
  BIT $00E2
  BPL $E1FC
  LDA #$0C
@E1FC:
  CLC
  ADC $05F9
  STA $05F9
  BEQ $E21F
  LDA #$00
  STA $062D
  LDA $0615
  AND #$BF
  STA $0615
  LDA #$43
  JSR $CBB0 ; → bank switch?
  BIT $0615
  BPL $E21F
  JSR $E233 ; → bank switch?
@E21F:
  RTS
  EOR #$FF
  CLC
  ADC #$01
  CLC
  ADC $05F9
  BPL $E231
  LDX #$50
  TXS
  JMP $DA98
@E231:
  STA $05F9
  RTS
  EOR #$FF
  CLC
  ADC #$01
  TAX
  BIT $0449
  BPL $E24E
  CLC
  ADC $044A
  STA $044A
  BPL $E24E
  LDA #$00
  STA $0449
@E24E:
  TXA
  PHA
  LDA #$00
  JSR $CD7C ; → bank switch?
  PLA
  PHA
  JSR $D263 ; → bank switch?
  LDA #$0B
  JSR $CD7C ; → bank switch?
  PLA
  JMP $D263
  TAX
  LDY #$0A
  LDA ($34),Y
  BEQ $E275
  TXA
  CLC
  ADC ($34),Y
  BPL $E272
  LDA #$00
@E272:
  STA ($34),Y
  RTS
@E275:
  LDY #$07
  LDA ($34),Y
  BEQ $E299
  LDY #$06
  TXA
  CLC
  ADC ($34),Y
  BPL $E297
  CLC
  ADC #$03
  PHA
  LDY #$07
  LDA ($34),Y
  SEC
  SBC #$19
  BPL $E292
  LDA #$00
@E292:
  STA ($34),Y
  PLA
  LDY #$06
@E297:
  STA ($34),Y
@E299:
  RTS
  LDX $0621
  LDA $D359,X
  JSR $EF7F ; → bank switch?
  LDX $0621
  LDA $D35C,X
  JSR $EF7F ; → bank switch?
  LDA #$00
  STA $043E
  STA $061E
@E2B4:
  LDA #$01
  JSR $CB0F ; → bank switch?
  LDA #$0F
  AND $001E
  BEQ $E309
  LDX #$00
@E2C2:
  LSR A
  BCS $E2C8
  INX
  BNE $E2C2
@E2C8:
  STX $3A
  LDA $0621
  SEC
  SBC #$03
  ASL A
  ASL A
  ADC $3A
  TAX
  LDA $D362,X
  CMP #$FF
  BEQ $E309
  CMP #$02
  BNE $E2ED
  JSR $CD77 ; → bank switch?
  LDY #$00
  LDA ($34),Y
  CMP #$22
  BNE $E309
  LDA #$02
@E2ED:
  STA $043D
  LDX $3A
  LDA $061E
  STX $061E
  PHA
  AND #$03
  CMP $061E
  BEQ $E303
  PLA
  TXA
  PHA
@E303:
  PLA
  ORA #$80
  STA $061E
@E309:
  LDA #$80
  AND $001E
  BEQ $E318
  BIT $061E
  BPL $E318
  JMP $CC46
@E318:
  BIT $061E
  BPL $E2B4
  LDA #$20
  BIT $061E
  BNE $E32F
  ORA $061E
  STA $061E
  LDA #$00
  STA $061F
@E32F:
  LDX $061F
  BEQ $E33A
  DEC $061F
  JMP $D2B4
@E33A:
  LDA #$0D
  STA $061F
  LDA $061E
  EOR #$40
  STA $061E
  LDY $043D
  LDA $D548,Y
  BIT $061E
  BVS $E354
  ORA #$80
@E354:
  LDX #$00
  JSR $E93D ; → bank switch?
  JMP $D2B4
  .byte $07, $02
  AND $0608
  ASL $06
  ASL $FF
  ORA $00
  BRK
  .byte $02
  ORA ($09,X)
  .byte $07, $FF
  PHP
  LDA $0621
  CMP #$03
  BCC $E378
  JMP $D29A
@E378:
  LDA $0600
  BNE $E37E
  RTS
@E37E:
  JSR $CC46 ; → bank switch?
  LDX #$03
  LDA #$FF
@E385:
  STA $060B,X
  DEX
  BPL $E385
  LDA #$00
  STA $061E
  JSR $D4EA ; → bank switch?
  LDA #$0D
  LDX $061E
  LDY $0601,X
  BEQ $E3A3
  LDX $0621
  LDA $D552,X
@E3A3:
  JSR $EF7F ; → bank switch?
  LDA #$01
  JSR $CB0F ; → bank switch?
  LDA #$80
  AND $001E
  BNE $E3B5
  JMP $D438
@E3B5:
  LDX $061E
  CPX $0600
  BNE $E3C0
  JMP $CC46
@E3C0:
  LDA $060B,X
  CMP #$FF
  .byte $F0, $71  ; BEQ $D438
  STA $043D
  TAX
  LDY $061E
  LDA $0601,Y
  STA $0442
  PHA
  LDA $22
  LDA #$1C
  STA $24
  LDA #$1D
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $800C ; → bank switch?
  LDA $0430
  .byte $F0, $39  ; BEQ $D424
  CLC
  ADC #$0B
  JSR $EF7F ; → bank switch?
  JSR $D77A ; → bank switch?
  ASL A
  PHP
  .byte $B0, $14  ; BCS $D40C
  LSR A
  PHA
  STA $043E
  JSR $D746 ; → bank switch?
  `;
}

// $D400-$D7FF (1024B): $9400-$97FF 代码/数据段6
function build_D400_D7FF_segN(): readonly number[] {
  return asm`
  PLA
  BCC $E40C
  LDX $061E
  STA $0606,X
  INC $061E
@E40C:
  JSR $CC46 ; → bank switch?
  JSR $D4EA ; → bank switch?
  LDA $061E
  CMP $0600
  BEQ $E41F
  LDA #$16
  JSR $EF7F ; → bank switch?
@E41F:
  PLP
  BCS $E438
  BCC $E430
  LDX $061E
  STA $0606,X
  JSR $D4E4 ; → bank switch?
  INC $061E
@E430:
  LDA $061E
  CMP $0600
  BNE $E44F
@E438:
  LDA #$40
  AND $001E
  BEQ $E45F
  LDX $061E
  BEQ $E45F
  CPX $0600
  BEQ $E44C
  JSR $D4E4 ; → bank switch?
@E44C:
  DEC $061E
@E44F:
  LDA $061F
  ORA #$40
  STA $061F
  LDA #$00
  STA $0620
  JMP $D393
@E45F:
  LDA #$0F
  AND $001E
  BEQ $E49F
  LDX #$00
@E468:
  LSR A
  BCS $E46E
  INX
  BNE $E468
@E46E:
  STX $3A
  LDA $0621
  ASL A
  ASL A
  ADC $3A
  TAX
  LDA $D555,X
  LDY $061E
  LDX $0601,Y
  BNE $E488
  LDX $3A
  LDA $D561,X
@E488:
  CMP #$FF
  BEQ $E49F
  LDX $061E
  CMP $060B,X
  BEQ $E49F
  STA $060B,X
  LDA #$00
  STA $0606,X
  STA $061F
@E49F:
  LDA $061E
  CMP $0600
  BNE $E4AA
  JMP $D3A6
@E4AA:
  BIT $061F
  BMI $E4B9
  LDA #$80
  STA $061F
  LDA #$00
  STA $0620
@E4B9:
  LDA $0620
  BEQ $E4C4
  DEC $0620
  JMP $D3A6
@E4C4:
  LDA #$0D
  STA $0620
  LDA $061F
  EOR #$40
  STA $061F
  LDX $061E
  JSR $D504 ; → bank switch?
  BIT $061F
  BVS $E4DE
  ORA #$80
@E4DE:
  JSR $E93D ; → bank switch?
  JMP $D3A6
  JSR $D504 ; → bank switch?
  JMP $E93D
  LDA $0600
  CLC
  ADC #$11
  JSR $EF7F ; → bank switch?
  LDA #$00
@E4F5:
  PHA
  TAX
  JSR $D4E4 ; → bank switch?
  PLA
  CLC
  ADC #$01
  CMP $0600
  BNE $E4F5
  RTS
  LDA $060B,X
  CMP #$FF
  BNE $E50E
  LDA #$1D
  RTS
@E50E:
  LDY $0601,X
  BNE $E518
  TAY
  LDA $D548,Y
  RTS
@E518:
  ASL A
  TAY
  LDA $D52B,Y
  STA $3A
  LDA $D52C,Y
  STA $3B
  LDA $0606,X
  TAY
  LDA ($3A),Y
  RTS
  AND $3DD5,Y
  CMP $42,X
  CMP $44,X
  CMP $45,X
  CMP $46,X
  CMP $47,X
  CMP $0C,X
  ASL $0F0D
  .byte $07
  PHP
  ORA #$0A
  ANC #$10
  ORA ($15),Y
  .byte $14, $13, $12, $17
  ASL $18,X
  ORA $1C1A,Y
  .byte $1B
  ASL $201F,X
  ASL $18,X
  .byte $17
  BRK
  .byte $02
  ASL $01
  .byte $03, $02
  ASL $05
  .byte $04, $02
  ASL $05
  .byte $04, $04, $FF, $03
  JSR $D573 ; → bank switch?
  LDA #$1A
  STA $24
  LDA #$1B
  STA $25
  JMP $CE2D
  LDA #$00
  STA $062D
  STA $0628
  JSR $CD77 ; → bank switch?
  LDY #$0A
  LDA ($34),Y
  BEQ $E58C
  LDA #$40
  JSR $CBB0 ; → bank switch?
  JMP $D5B2
@E58C:
  LDA $0621
  CMP #$03
  BEQ $E5B2
  CMP #$01
  BNE $E5A5
  LDA $0600
  BEQ $E5A5
  LDA $0601
  BEQ $E5B2
  CMP #$0B
  BEQ $E5B2
@E5A5:
  LDY #$07
  LDA ($34),Y
  CMP #$18
  BCC $E5B2
  LDA #$41
  JSR $CBB0 ; → bank switch?
@E5B2:
  JSR $EFA2 ; → bank switch?
  LDA #$00
  STA $11
  STA $12
  LDA #$02
  JSR $CB0F ; → bank switch?
  JSR $CC46 ; → bank switch?
  JSR $CC46 ; → bank switch?
  LDA $05FB
  BEQ $E5CE
  JMP $D36E
@E5CE:
  LDX $0621
  LDA $D706,X
  JSR $EF7F ; → bank switch?
  LDX $0621
  LDA $D700,X
  JSR $EF7F ; → bank switch?
  LDA #$00
  STA $061E
@E5E5:
  LDA #$01
  JSR $CB0F ; → bank switch?
  LDA #$0F
  AND $001E
  BEQ $E626
  LDX #$00
@E5F3:
  LSR A
  BCS $E5F9
  INX
  BNE $E5F3
@E5F9:
  STX $3A
  LDA $0621
  ASL A
  ASL A
  ADC $3A
  TAX
  LDA $D6E8,X
  CMP #$FF
  BEQ $E626
  STA $043B
  LDX $3A
  LDA $061E
  STX $061E
  PHA
  AND #$03
  CMP $061E
  BEQ $E620
  PLA
  TXA
  PHA
@E620:
  PLA
  ORA #$80
  STA $061E
@E626:
  LDA #$80
  AND $001E
  BEQ $E638
  BIT $061E
  BPL $E638
  JSR $D67C ; → bank switch?
  JMP $D5C3
@E638:
  BIT $061E
  BPL $E5E5
  LDA #$20
  BIT $061E
  BNE $E64F
  ORA $061E
  STA $061E
  LDA #$00
  STA $061F
@E64F:
  LDX $061F
  BEQ $E65A
  DEC $061F
  JMP $D5E5
@E65A:
  LDA #$0D
  STA $061F
  LDA $061E
  EOR #$40
  STA $061E
  LDY $043B
  LDA $D6DE,Y
  BIT $061E
  BVS $E674
  ORA #$80
@E674:
  LDX #$00
  JSR $E93D ; → bank switch?
  JMP $D5E5
  LDX $043B
  LDA $D6DE,X
  LDX #$00
  STX $043C
  JSR $E93D ; → bank switch?
  LDX $043B
  CPX #$02
  BNE $E696
  LDA $0600
  BEQ $E6C4
@E696:
  LDA $0441
  PHA
  LDA $22
  LDA #$1C
  STA $24
  LDA #$1D
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8009 ; → bank switch?
  LDA $0430
  BEQ $E6BE
  CLC
  ADC #$08
  JSR $EF7F ; → bank switch?
  JSR $D77A ; → bank switch?
  ASL A
  BCC $E6BD
  RTS
@E6BD:
  LSR A
@E6BE:
  STA $043C
  JSR $D717 ; → bank switch?
@E6C4:
  LDA $043B
  JSR $CB99 ; → bank switch?
  .byte $92, $D7
  INX
  .byte $D7, $0C, $D7
  ADC $0CD9,Y
  .byte $D7
  ADC $DA
  .byte $0C, $D7, $0C, $D7, $0C, $D7, $0C, $D7, $02
  ORA ($00,X)
  .byte $03, $04
  ORA $06
  ASL $201F,X
  BRK
  ORA ($03,X)
  .byte $02
  BRK
  ORA ($05,X)
  .byte $04
  ASL $01
  .byte $FF, $04
  BRK
  ORA ($FF,X)
  .byte $02
  BRK
  ORA ($FF,X)
  .byte $FF
  ORA #$07
  .byte $FF
  PHP
  .byte $03, $04
  ORA $03
  .byte $03, $03, $02, $02, $02, $02, $02
  BIT $4620
  CPY $00A9
  STA $062D
  PLA
  PLA
  RTS
  PHA
  LDA $22
  LDA #$1C
  STA $24
  LDA #$1D
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8012 ; → bank switch?
  JSR $D76B ; → bank switch?
  BPL $E745
  LDA $043B
  CMP #$00
  BEQ $E73E
  CMP #$03
  BEQ $E73E
  LDA $043C
  BEQ $E745
@E73E:
  LDA #$3D
  JSR $CBB0 ; → bank switch?
  PLA
  PLA
@E745:
  RTS
  PHA
  LDA $22
  LDA #$1C
  STA $24
  LDA #$1D
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8015 ; → bank switch?
  JSR $D76B ; → bank switch?
  BPL $E769
  LDA $043E
  BEQ $E769
  LDA #$3D
  JSR $CBB0 ; → bank switch?
  CLC
  RTS
@E769:
  SEC
  RTS
  SEC
  LDY #$01
  LDA ($34),Y
  SBC $043F
  INY
  LDA ($34),Y
  SBC $0440
  RTS
  LDA #$00
  STA $0622
  LDA $0430
  JSR $CF8F ; → bank switch?
  LDX #$80
  BCC $E790
  TAX
  BEQ $E790
  LDA $0430,X
  TAX
@E790:
  TXA
  RTS
  LDA $043C
  CMP #$03
  BCS $E79F
  LDX $044E
  STX $043C
@E79F:
  CMP #$12
  BNE $E7D9
  LDX $0448
  BNE $E7D9
  INC $0448
  LDA #$00
  STA $062D
  LDA #$46
  JSR $CBB0 ; → bank switch?
  PHA
  LDA $22
  LDA #$1A
  STA $24
  LDA #$1B
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8021 ; → bank switch?
  PHA
  LDA $22
  LDA #$1A
  STA $24
  LDA #$1B
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8036 ; → bank switch?
@E7D9:
  CMP #$11
  BNE $E7E5
  LDA #$00
  STA $0449
  STA $044A
@E7E5:
  JMP $D70C
  LDA #$38
  JSR $CBB0 ; → bank switch?
  LDA #$0F
  JSR $EF7F ; → bank switch?
  LDA #$81
  STA $062D
  LDA #$1F
  STA $0494
  JSR $E6EC ; → bank switch?
  .byte $A9
  `;
}

// $D800-$DBFF (1024B): $9800-$9BFF 代码/数据段7
function build_D800_DBFF_segN(): readonly number[] {
  return asm`
  BRK
  STA $0625
  LDA $05FE
  STA $0624
@E80A:
  LDA #$01
  JSR $CB0F ; → bank switch?
  LDA $001C
  AND #$0F
  BEQ $E837
  LDX #$00
@E818:
  LSR A
  BCS $E81E
  INX
  BNE $E818
@E81E:
  LDA $D84E,X
  CLC
  ADC $0624
  CMP #$F0
  BCC $E82C
  LDA $0624
@E82C:
  CMP $0624
  STA $0624
  BEQ $E837
  JSR $D8F7 ; → bank switch?
@E837:
  LDA #$40
  AND $001E
  BEQ $E83F
  RTS
@E83F:
  LDA #$80
  AND $001E
  BEQ $E80A
  JSR $D852 ; → bank switch?
  BCC $E80A
  JMP $D70C
  .byte $0C, $F4
  ORA ($FF,X)
  LDA #$FF
  LDX $0625
  BEQ $E862
  LDX $0430
  DEX
  BNE $E868
  LDA $0431
@E862:
  STA $05FC
  JMP $D8D2
@E868:
  LDA $0430
  CLC
  ADC #$22
  JSR $EF7F ; → bank switch?
  LDA #$00
  STA $0625
  JMP $D8B5
@E879:
  LDA #$01
  JSR $CB0F ; → bank switch?
  LDA #$40
  AND $001E
  BEQ $E88F
  LDA #$0F
  JSR $EF7F ; → bank switch?
  JSR $D8F7 ; → bank switch?
  CLC
  RTS
@E88F:
  LDA #$0C
  AND $001E
  BEQ $E8C3
  LDX #$01
  AND #$04
  BNE $E89E
  LDX #$FF
@E89E:
  TXA
  CLC
  ADC $0625
  BMI $E8AA
  CMP $0430
  BCC $E8AD
@E8AA:
  LDA $0625
@E8AD:
  CMP $0625
  STA $0625
  BEQ $E8C3
  LDX $0625
  LDA $0431,X
  STA $05FC
  LDA #$1D
  JSR $EF7F ; → bank switch?
@E8C3:
  JSR $D8DA ; → bank switch?
  LDA #$80
  AND $001E
  BEQ $E879
  LDA #$F8
  STA $02FC
  LDA $0624
  STA $0638
  SEC
  RTS
  LDA $0625
  ASL A
  ASL A
  ASL A
  ASL A
  CLC
  ADC #$9A
  STA $02FC
  LDA #$11
  STA $02FD
  LDA #$03
  STA $02FE
  LDA #$50
  STA $02FF
  RTS
  LDA #$00
  STA $0430
  STA $0625
@E8FF:
  PHA
  CMP $0441
  BEQ $E941
  CMP #$00
  BEQ $E941
  CMP #$0B
  BEQ $E941
  JSR $CD7C ; → bank switch?
  LDY #$06
  LDA ($34),Y
  TAX
  LDY #$08
  LDA ($34),Y
  TAY
  JSR $CDE2 ; → bank switch?
  CMP $0624
  BNE $E941
  LDX $0430
  CPX #$04
  BCS $E941
  PLA
  PHA
  CMP #$0B
  BCC $E934
  LDY $0625
  BNE $E941
@E934:
  STA $0431,X
  INC $0430
  CMP #$0B
  BCS $E941
  INC $0625
@E941:
  PLA
  CLC
  ADC #$01
  CMP #$16
  BNE $E8FF
  LDX $0430
  BNE $E954
  LDA #$1C
  JSR $EF7F ; → bank switch?
  RTS
@E954:
  LDA $0625
  BNE $E961
  TXA
  CLC
  ADC #$1F
  JSR $EF7F ; → bank switch?
  RTS
@E961:
  DEX
  BNE $E970
  LDA $0431
  STA $05FC
  LDA #$1D
  JSR $EF7F ; → bank switch?
  RTS
@E970:
  TXA
  CLC
  ADC #$18
  JSR $EF7F ; → bank switch?
  RTS
  RTS
  LDA #$38
  JSR $CBB0 ; → bank switch?
  LDA $043C
  BEQ $E986
  JMP $D70C
@E986:
  JSR $E6EC ; → bank switch?
  LDA #$01
  STA $3A
  LDA #$00
  STA $0430
@E992:
  LDA $3A
  CMP $0441
  BEQ $E9A9
  JSR $DA3A ; → bank switch?
  BCC $E9A9
  LDX $0430
  LDA $3A
  STA $0431,X
  INC $0430
@E9A9:
  INC $3A
  LDA $3A
  CMP #$0B
  BNE $E992
  LDA $0430
  BNE $E9C8
  LDA #$11
  JSR $EF7F ; → bank switch?
@E9BB:
  LDA #$01
  JSR $CB0F ; → bank switch?
  LDA #$C0
  AND $001E
  BEQ $E9BB
  RTS
@E9C8:
  LDA #$10
  JSR $EF7F ; → bank switch?
  LDA #$82
  STA $062D
  LDA #$1F
  STA $0494
  LDA #$00
  JMP $DA03
@E9DC:
  LDA #$01
  JSR $CB0F ; → bank switch?
  LDA #$03
  AND $001E
  BEQ $EA12
  LDX #$01
  LSR A
  BCS $E9EF
  LDX #$FF
@E9EF:
  TXA
  CLC
  ADC $0625
  BPL $E9FC
  LDA $0430
  SEC
  SBC #$01
@E9FC:
  CMP $0430
  BCC $EA03
  LDA #$00
@EA03:
  STA $0625
  TAX
  LDA $0431,X
  STA $05FC
  LDA #$1D
  JSR $EF7F ; → bank switch?
@EA12:
  LDA #$40
  AND $001E
  BEQ $EA1A
  RTS
@EA1A:
  LDA #$80
  AND $001E
  BEQ $E9DC
  LDA $05FC
  JSR $CD7C ; → bank switch?
  LDY #$06
  LDA ($34),Y
  TAX
  LDY #$08
  LDA ($34),Y
  TAY
  JSR $CDE2 ; → bank switch?
  STA $0638
  JMP $D70C
  JSR $CD7C ; → bank switch?
  LDY #$06
  LDA ($34),Y
  SEC
  SBC $0635
  BCS $EA4B
  EOR #$FF
  ADC #$01
@EA4B:
  CMP #$14
  BCS $EA63
  LDY #$08
  LDA ($34),Y
  SEC
  SBC $0637
  BCS $EA5D
  EOR #$FF
  ADC #$01
@EA5D:
  CMP #$14
  BCS $EA63
  SEC
  RTS
@EA63:
  CLC
  RTS
  LDA #$38
  JSR $CBB0 ; → bank switch?
  LDA #$83
  STA $062D
  LDA #$00
  STA $0624
@EA74:
  LDA #$01
  JSR $CB0F ; → bank switch?
  LDX $0624
  INX
  CPX #$10
  BCC $EA83
  LDX #$00
@EA83:
  STX $0624
  LDA #$40
  AND $001E
  BEQ $EA8E
  RTS
@EA8E:
  LDA #$80
  AND $001E
  BEQ $EA74
  JMP $D70C
  LDA #$00
  STA $062D
  STA $0615
  LDA #$33
  JSR $CBB0 ; → bank switch?
  LDA #$FF
  JMP $CEFE
  LDA #$01
  JSR $CBF1 ; → bank switch?
  JSR $CF4F ; → bank switch?
  PHA
  LDA $22
  LDA #$1A
  STA $24
  LDA #$1B
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8039 ; → bank switch?
  JSR $DB24 ; → bank switch?
  LDA #$00
  JSR $EF7F ; → bank switch?
  LDA #$01
  JSR $EF7F ; → bank switch?
  LDA $0629
  CMP #$04
  BEQ $EAE9
  LDA #$35
  JSR $CBB0 ; → bank switch?
@EADD:
  LDA #$01
  JSR $CB0F ; → bank switch?
  LDA $001C
  AND #$C0
  BEQ $EADD
@EAE9:
  LDA $05FB
  CLC
  ADC #$08
  STA $0441
  JSR $DC07 ; → bank switch?
  LDA $00E2
  AND #$07
  CMP #$05
  BCC $EB00
  SBC #$05
@EB00:
  TAX
  LDA $DC82,X
  CLC
  ADC $05FB
  STA $05FC
  JSR $E6EC ; → bank switch?
  LDA #$36
  JSR $CBB0 ; → bank switch?
  LDA $05FC
  STA $0441
  LDA #$01
  STA $05FD
  LDX #$50
  TXS
  JMP $E0DF
  LDA $0629
  JSR $CB99 ; → bank switch?
  .byte $34, $DB, $9E, $DB, $FC, $DB, $F3, $DB, $03, $DC
  PHA
  LDA $22
  LDA #$1C
  STA $24
  LDA #$1D
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8003 ; → bank switch?
  LDA #$00
  STA $0447
  LDX #$00
  LDA $002B
  CMP #$03
  BEQ $EB5B
  BIT $00E2
  BPL $EB5B
  LDX #$0B
@EB5B:
  STX $044F
  STX $05FB
  RTS
  LDA #$0A
  LDX $002A
  CPX #$02
  BNE $EB6D
  LDA #$14
@EB6D:
  PHA
  CMP #$0B
  BCC $EB74
  ADC #$0A
@EB74:
  LDX #$00
  JSR $CE08 ; → bank switch?
  LDY #$00
  LDA ($34),Y
  CMP #$20
  BNE $EB8C
  LDA $044D
  BEQ $EB8C
  LDA #$00
  STA $32
  STA $33
@EB8C:
  LDY #$01
  LDA $32
  STA ($34),Y
  INY
  LDA $33
  STA ($34),Y
  PLA
  SEC
  SBC #$01
  BPL $EB6D
  RTS
  JSR $DBF3 ; → bank switch?
  LDX #$00
  LDA $002B
@EBA6:
  CMP $DBEA,X
  BEQ $EBB4
  INX
  INX
  INX
  CPX #$09
  BEQ $EBCB
  BNE $EBA6
@EBB4:
  LDA $DBEB,X
  JSR $CD7C ; → bank switch?
  LDY #$00
  LDA $DBEC,X
  STA ($34),Y
  LDA $002B
  CMP #$0C
  BNE $EBCB
  JSR $DBCC ; → bank switch?
@EBCB:
  RTS
  LDA #$0C
@EBCE:
  PHA
  CMP #$14
  BEQ $EBE1
  JSR $CD7C ; → bank switch?
  LDY #$01
  LDA #$80
  STA ($34),Y
  INY
  LDA #$CB
  STA ($34),Y
@EBE1:
  PLA
  CLC
  ADC #$01
  CMP #$16
  BNE $EBCE
  RTS
  .byte $23, $14
  ADC $0C,X
  .byte $14, $34, $12
  ORA $45,X
  LDA $044F
  EOR #$0B
  STA $05FB
  RTS
  LDA $044F
  .byte $8D
  `;
}

// $DC00-$DFFF (1024B): $9C00-$9FFF 代码/数据段8
function build_DC00_DFFF_segN(): readonly number[] {
  return asm`
  .byte $FB
  ORA $60
  JSR $CF4F ; → bank switch?
  RTS
  LDA $002C
  ASL A
  PHA
  ADC $002C
  STA $3A
  PLA
  ASL A
  ASL A
  ADC $3A
  STA $3A
  LDA $002E
  ASL A
  PHA
  ADC $002E
  STA $3B
  PLA
  ASL A
  ASL A
  ADC $3B
  STA $3B
  LDA #$00
  PHA
  JSR $CD7C ; → bank switch?
  LDX $3A
  INC $3A
  PLA
  PHA
  CMP #$0B
  LDA $05FB
  BCC $EC42
  LDX $3B
  EOR #$0B
  INC $3B
@EC42:
  TAY
  LDA $DC87,X
  DEY
  BMI $EC4C
  LDA $DCB3,X
@EC4C:
  JSR $CDC9 ; → bank switch?
  LDA $05FB
  BEQ $EC5E
  TYA
  EOR #$FF
  TAY
  TXA
  EOR #$FF
  TAX
  INY
  INX
@EC5E:
  TYA
  LDY #$08
  STA ($34),Y
  TXA
  LDY #$06
  STA ($34),Y
  PLA
  PHA
  BEQ $EC70
  CMP #$0B
  BNE $EC76
@EC70:
  LDA #$00
  LDY #$07
  STA ($34),Y
@EC76:
  PLA
  CLC
  ADC #$01
  CMP #$16
  BEQ $EC81
  JMP $DC2B
@EC81:
  RTS
  ORA $06
  .byte $07
  ORA #$0A
  ORA $3D
  LSR $41
  ROL A
  .byte $57, $77, $5C
  ADC ($72),Y
  JMP ($3D05)
  LSR $41
  ROL A
  .byte $63
  PLA
  NOP
  .byte $72
  EOR $0571,Y
  AND $3546,X
  JMP $6863
  .byte $4F, $72
  NOP
  ADC ($05),Y
  AND $3546,X
  .byte $37
  EOR $6877,Y
  .byte $72
  ADC ($63),Y
  NOP
  LDX $AEB5,Y
  CMP $A4
  ADC $979F,Y
  STY $82,X
  NOP
  LDX $AEB5,Y
  CMP $99
  .byte $92
  STA $7B,X
  STX $80,Y
  NOP
  .byte $B2
  LDA #$BA
  STX $99,Y
  .byte $92
  STY $7B,X
  STA $80,X
  NOP
  .byte $B2
  LDA #$BB
  LDA $79A2,Y
  .byte $9F
  STA $97,X
  LDY $AD
  LSR $D004
  ANC #$AD
  .byte $E2
  BRK
  AND #$01
  CLC
  ADC #$01
  STA $044E
  RTS
  LDA #$00
  STA $043B
  JSR $DCDF ; → bank switch?
  LDA #$1D
  JSR $CBB0 ; → bank switch?
  LDA #$FF
  STA $061A
  JSR $DD81 ; → bank switch?
  JSR $DD47 ; → bank switch?
  PHP
  LDA #$00
  STA $061B
  JSR $E73E ; → bank switch?
  PLP
  BCC $ED1C
  LDA #$2D
  JSR $CBB0 ; → bank switch?
  JMP $801B
@ED1C:
  JSR $CD77 ; → bank switch?
  LDY #$0A
  LDA ($34),Y
  BNE $ED36
  LDA #$1A
  STA $24
  LDA #$1B
  STA $25
  JSR $CE2D ; → bank switch?
  LDX #$50
  TXS
  JMP $8006
@ED36:
  LDA #$1A
  STA $24
  LDA #$1B
  STA $25
  JSR $CE2D ; → bank switch?
  LDX #$50
  TXS
  JMP $8018
  LDA $043C
  BNE $ED6E
  LDA $0635
  LDX $05FB
  BEQ $ED56
  EOR #$FF
@ED56:
  CMP #$80
  BCS $ED6E
  ADC #$4F
  LDX $05FB
  BEQ $ED63
  EOR #$FF
@ED63:
  TAX
  LDY #$7C
  JSR $CDE2 ; → bank switch?
  STA $0638
  SEC
  RTS
@ED6E:
  LDA #$E9
  LDX $05FB
  BEQ $ED77
  LDA #$05
@ED77:
  LSR $00E2
  ADC #$00
  STA $0638
  CLC
  RTS
  LDA $0635
  LDX $05FB
  BEQ $ED8E
  EOR #$FF
  CLC
  ADC #$01
@ED8E:
  CMP #$A0
  BCS $ED9E
  SEC
  SBC #$30
  LSR A
  LSR A
  LSR A
  TAX
  LDA $DDCB,X
  BNE $EDBE
@ED9E:
  SEC
  SBC #$A0
  LSR A
  LSR A
  LSR A
  STA $3A
  LDA $0637
  BPL $EDAD
  EOR #$FF
@EDAD:
  SEC
  SBC #$50
  AND #$38
  LSR A
  STA $3B
  LSR A
  ADC $3B
  ADC $3A
  TAX
  LDA $DDD9,X
@EDBE:
  STA $062B
  ASL A
  ASL A
  ASL A
  ADC $062B
  STA $062B
  RTS
  .byte $13, $12
  ORA ($10),Y
  .byte $0F
  ASL $0C0D
  ANC #$0A
  ORA #$08
  .byte $07
  ASL $05
  ORA $05
  ORA $05
  ORA $05
  .byte $04, $04, $04, $04, $04
  ORA $04
  .byte $03, $03, $03, $03
  ORA $04
  .byte $03, $02, $02, $02
  ORA $04
  .byte $03, $02
  ORA ($01,X)
  ORA $04
  .byte $03, $02
  ORA ($00,X)
  LDA $00E2
  AND #$07
  CMP #$06
  BCC $EE08
  SBC #$06
@EE08:
  CLC
  ADC #$05
  ADC $05FB
  STA $05FC
  LDA $05FB
  STA $0441
  JSR $E6EC ; → bank switch?
  LDY #$0A
  LDA #$00
  STA ($34),Y
  LDA #$00
  STA $0628
  STA $044E
  JSR $DCDF ; → bank switch?
  LDA #$01
  STA $043B
  LDA #$00
  STA $043C
  JSR $D093 ; → bank switch?
  LDA #$3A
  JSR $CBB0 ; → bank switch?
  LDA #$1A
  STA $061A
  JMP $DE5E
  LDA #$01
  STA $043B
  JSR $DCDF ; → bank switch?
  LDA #$18
  JSR $CBB0 ; → bank switch?
  LDA #$FF
  BIT $0628
  BPL $EE5B
  LDA #$26
@EE5B:
  STA $061A
  JSR $E059 ; → bank switch?
  JSR $DF8B ; → bank switch?
  LDA #$01
  STA $061B
  JSR $E73E ; → bank switch?
  LDA $05FC
  CMP #$FF
  BEQ $EE96
  STA $0441
  JSR $E6EC ; → bank switch?
  PHA
  LDA $22
  LDA #$1A
  STA $24
  LDA #$1B
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $801E ; → bank switch?
  LDA #$1C
  JSR $CBB0 ; → bank switch?
  LDX #$50
  TXS
  JMP $E0DF
@EE96:
  LDA $062B
  STA $0430
  LDA #$01
  STA $05FF
  LDA $05FB
  JSR $DF4A ; → bank switch?
  STA $0431
  LDA $05FB
  EOR #$0B
  JSR $DF4A ; → bank switch?
  STA $0432
@EEB5:
  LDA $0431
  LDX #$23
  JSR $DF29 ; → bank switch?
  LDA $0431
  BCS $EEDC
  LDA $0432
  LDX #$24
  JSR $DF29 ; → bank switch?
  LDA $0432
  BCS $EEDC
  DEC $0430
  BNE $EEB5
  LDA #$34
  JSR $CBB0 ; → bank switch?
  JMP $801B
@EEDC:
  LDX #$00
  CMP #$0B
  BCC $EEE4
  LDX #$0B
@EEE4:
  STA $0441
  LDY #$1C
  TXA
  EOR $05FB
  STX $05FB
  BEQ $EEF7
  JSR $D093 ; → bank switch?
  LDY #$3E
@EEF7:
  TYA
  PHA
  LDA $0441
  JSR $CD7C ; → bank switch?
  LDA $0635
  LDY #$06
  STA ($34),Y
  LDA $0637
  LDY #$08
  STA ($34),Y
  PHA
  LDA $22
  LDA #$1A
  STA $24
  LDA #$1B
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $801E ; → bank switch?
  PLA
  JSR $CBB0 ; → bank switch?
  LDX #$50
  TXS
  JMP $E0DF
  JSR $CE08 ; → bank switch?
  LDA #$01
  STA $05FF
  JSR $E854 ; → bank switch?
  LDY #$06
  LDA ($34),Y
  TAX
  LDY #$08
  LDA ($34),Y
  TAY
  JSR $CDE2 ; → bank switch?
  CMP $05FE
  BNE $EF48
  SEC
  RTS
@EF48:
  CLC
  RTS
  JSR $CE99 ; → bank switch?
  PHA
  JSR $CD7C ; → bank switch?
  LDA $05FE
  LDY #$09
  STA ($34),Y
  PLA
  RTS
  JSR $CD7C ; → bank switch?
  LDY #$0A
  LDA ($34),Y
  BNE $EF89
  LDY #$06
  LDA ($34),Y
  SEC
  SBC $0635
  BCS $EF71
  EOR #$FF
  ADC #$01
@EF71:
  CMP $3B
  BCS $EF89
  LDY #$08
  LDA ($34),Y
  SEC
  SBC $0637
  BCS $EF83
  EOR #$FF
  ADC #$01
@EF83:
  CMP $3B
  BCS $EF89
  SEC
  RTS
@EF89:
  CLC
  RTS
  LDA $0638
  JSR $CDC9 ; → bank switch?
  TXA
  SEC
  SBC $0635
  BCS $EF9C
  EOR #$FF
  ADC #$01
@EF9C:
  STA $3A
  TYA
  SEC
  SBC $0637
  BCS $EFA9
  EOR #$FF
  ADC #$01
@EFA9:
  TAY
  SEC
  SBC $3A
  BCS $EFB1
  LDY $3A
@EFB1:
  TYA
  LSR A
  LSR A
  LSR A
  TAX
  LDA $DFBD,X
  STA $062B
  RTS
  .byte $02, $03, $03, $03, $03, $04, $04, $04, $04, $04, $04
  ORA $05
  ORA $05
  ORA $05
  ORA $05
  ORA $20
  .byte $DF, $DC
  LDA #$19
  JSR $CBB0 ; → bank switch?
  JSR $E059 ; → bank switch?
  LDA #$FF
  STA $061A
  LDA #$01
  STA $061B
  JSR $E73E ; → bank switch?
  LDA #$1A
  JSR $CBB0 ; → bank switch?
  LDA $0441
  JSR $CD7C ; → bank switch?
  LDA $0443
  ASL A
  ASL A
  ASL A
  LDX $05FB
  .byte $F0, $05  ; BEQ $E004
  .byte $49
  `;
}

// ═══════════════════════════════════════════════════
// Assemble all sections into full 8KB bank
// ═══════════════════════════════════════════════════
const _PRG_BANK_30: readonly number[] = [
  ...build_C000_C3FF_segN(),
  ...build_C400_C7FF_segN(),
  ...build_C800_CBFF_segN(),
  ...build_CC00_CFFF_segN(),
  ...build_D000_D3FF_segN(),
  ...build_D400_D7FF_segN(),
  ...build_D800_DBFF_segN(),
  ...build_DC00_DFFF_segN(),
];
