/**
 * PRG-ROM MMC3 bank 22 (8KB) — function-based assembly
 * Mapper: 4 (MMC3) | CPU: $8000-$9FFF
 * CDL: code=453 data=7388 unaccessed=351
 *
 * 功能: 精灵/OAM 处理 + 精灵数据表
 *
 * Pattern: 参考 bank_31.ts
 *   每个 build_xxx() 函数返回其覆盖地址范围的 raw 6502 字节，
 *   最后通过 spread 拼成完整的 8KB 数组
 */


import { asm } from '../_6502asm';
export { _PRG_BANK_22 as default };

console.log('[prg_22_sprite_engine] loaded');

// $8000-$83FF (1024B): $8000-$83FF 代码/数据段1
function build_8000_83FF_seg1(): readonly number[] {
  return asm`
  JMP $8003
  LDY #$00
  STY $3F
  STY $41
  LDA ($3C),Y
  LSR A
  ROL $3F
  LSR A
  ROL $41
  LDA ($3C),Y
  AND #$60
  ASL A
  EOR $0517
  STA $49
  LDY #$08
  LDA ($3C),Y
  SEC
  SBC #$80
  TAX
  LDA $3F
  SBC #$00
  TAY
  LDA #$00
  STA $3F
  LDA $0538
  EOR #$FF
  CLC
  ADC #$01
  BPL @E038
  DEC $3F
@E038:
  STA $3E
  TXA
  CLC
  ADC $3E
  TAX
  TYA
  ADC $3F
  TAY
  BIT $0517
  BVC @E055
  TXA
  EOR #$FF
  TAX
  TYA
  EOR #$FF
  TAY
  INX
  BNE @E054
  INY
@E054:
  INY
@E055:
  BIT $49
  BVC @E062
  SEC
  TXA
  SBC #$08
  TAX
  TYA
  SBC #$00
  TAY
@E062:
  STX $3E
  STY $3F
  LDY #$0C
  LDA ($3C),Y
  SEC
  BIT $49
  BPL $E072
  SBC #$88
  BIT $80E9
  STA $40
  LDA $41
  SBC #$00
  STA $41
  LDA #$80
  STA $42
  LDA #$82
  STA $43
  LDY #$12
  LDA ($3C),Y
  ASL A
  BCC @E08D
  INC $43
@E08D:
  TAY
  LDA ($42),Y
  TAX
  INY
  LDA ($42),Y
  STA $43
  STX $42
  JSR $8187 ; → bank switch?
  LDY #$00
  STY $44
  LDY $44
  LDA ($42),Y
  AND #$07
  BNE @E0AD
  JSR $80C0 ; → bank switch?
  JMP $809F
@E0AD:
  JSR $80B3 ; → bank switch?
  JMP $809F
  INC $44
  JSR $C509 ; → bank switch?
  BRK
  BRK
  ADC ($81,X)
  .byte $64
  STA ($75,X)
  STA ($A4,X)
  .byte $44
  LDA ($42),Y
  AND #$38
  LSR A
  LSR A
  LSR A
  STA $45
  INY
  LDA ($42),Y
  TAX
  LDA $81D2,X
  LDX #$00
  BIT $49
  BPL @E0DD
  EOR #$FF
  CLC
  ADC #$01
@E0DD:
  PHA
  PLA
  BPL @E0E2
  DEX
@E0E2:
  CLC
  ADC $40
  STA $46
  TXA
  ADC $41
  BNE @E0FD
  LDA $46
  CMP $0540
  BCC @E0FD
  CMP $0541
  BEQ @E109
  BCS @E0FD
  JMP $8109
@E0FD:
  INY
  LDA #$F8
@E100:
  INY
  INY
  DEC $45
  BPL @E100
  STY $44
  RTS
@E109:
  INY
@E10A:
  LDA ($42),Y
  LSR A
  LSR A
  TAX
  LDA $81FA,X
  LDX #$00
  BIT $49
  BVC @E11D
  EOR #$FF
  CLC
  ADC #$01
@E11D:
  PHA
  PLA
  BPL @E122
  DEX
@E122:
  CLC
  ADC $3E
  STA $47
  TXA
  ADC $3F
  BEQ @E136
  LDX $3B
  LDA #$F8
  STA $0200,X
  INY
  BNE @E159
@E136:
  LDX $3B
  LDA $46
  STA $0200,X
  LDA $47
  STA $0203,X
  LDA ($42),Y
  AND #$03
  ORA $49
  STA $0202,X
  INY
  LDA ($42),Y
  STA $0201,X
  INX
  INX
  INX
  INX
  STX $3B
  INC $48
@E159:
  INY
  DEC $45
  BPL @E10A
  STY $44
  RTS
  PLA
  PLA
  RTS
  LDY $44
  LDA ($42),Y
  TAX
  INY
  LDA ($42),Y
  STA $43
  STX $42
  LDA #$00
  STA $44
  RTS
  LDA $0546
  CMP #$0C
  BCC @E17E
  SBC #$0C
@E17E:
  ASL A
  CLC
  ADC $44
  STA $44
  JMP $8164
  LDY #$00
  LDA ($3C),Y
  EOR $0517
  AND #$40
  PHP
  LDY #$13
  LDA ($3C),Y
  BEQ @E1B1
  LDX #$00
  PLP
  PHP
  BEQ @E1A2
  EOR #$FF
  CLC
  ADC #$01
@E1A2:
  PHA
  PLA
  BPL @E1A7
  DEX
@E1A7:
  CLC
  ADC $3E
  STA $3E
  TXA
  ADC $3F
  STA $3F
@E1B1:
  INY
  LDA ($3C),Y
  BEQ @E1D0
  LDX #$00
  PLP
  PHP
  BPL @E1C1
  EOR #$FF
  CLC
  ADC #$01
@E1C1:
  PHA
  PLA
  BPL @E1C6
  DEX
@E1C6:
  CLC
  ADC $40
  STA $40
  TXA
  ADC $41
@E1CE:
  STA $41
@E1D0:
  PLP
  RTS
  CPX #$E8
  BEQ @E1CE
  BRK
  PHP
  BPL @E1F2
  JSR $0E28
  SBC $ED
  CPX $25
  .byte $DF, $DC, $E7, $EF
  AND ($1E,X)
  ROL $30
  SEC
  .byte $F4, $FC, $04, $0C
  CPX $D8F6
@E1F1:
  NOP
@E1F2:
  ASL A
  .byte $1B, $F7, $03
@E1F6:
  .byte $FF
  ASL $F2
  .byte $14
  CPX #$E8
  BEQ @E1F6
  BRK
  PHP
  BPL @E1F1
  SBC $F7,X
  SBC $FF05,X
  INC $FE,X
  ASL $F4
  .byte $FC, $F3, $FB
  CPX $EC
  .byte $F2
  NOP
  .byte $02
  SBC $DCD8,Y
  ASL A
  .byte $07, $0F
  ORA $0418
  ASL $0C12
  SBC $C0EE
  INY
  BIT $3C34
  .byte $44
  BNE $E214
  ORA ($20,X)
  PLP
  BMI @E266
  RTI
  PHA
  BVC @E246
  .byte $1C
  ROL $A8
  BCS $E1EF
  .byte $FF, $FF, $FF, $FF, $FF, $FF
@E23D:
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
@E246:
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
@E266:
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  BIT $1784
  STA $02
  STX $EE
  STX $D9
  .byte $87
  RTI
  DEY
  .byte $9F
  DEY
  .byte $D4
  DEY
  .byte $07, $89
  NOP
  .byte $89
  ARR #$89
  NOP
  .byte $89
  STA $9C89
  .byte $89, $AF, $89
  LDY $3F89,X
  .byte $8B
  LSR $618B
  .byte $8B, $74, $8B
  STA ($8B,X)
  .byte $0C
  STA $8D1B
  BMI @E23D
  EOR $8D
  .byte $52
  STA $8F1D
  BIT $418F
  .byte $8F
  LSR $8F,X
  .byte $63, $8F
  INX
  .byte $8F
  LDA #$91
  DEC $91
  .byte $DF
  STA ($F8),Y
  STA ($09),Y
  .byte $92, $9B, $92
  TYA
  .byte $93
  CMP $3293,Y
  STY $95,X
  STY $E8,X
  STY $05,X
  STA $20,X
  STA $51,X
  STX $6E,Y
  STX $97,Y
  CLV
  .byte $8B
  STX $D8,Y
  STX $BF,Y
  LDA $BDBF,X
  .byte $BF
  LDA $BDBF,X
  .byte $BF
  LDA $BDBF,X
  .byte $BF
  LDA $BDBF,X
  .byte $BF
  LDA $BDBF,X
  .byte $BF
  LDA $BDBF,X
  AND $E497,Y
  TYA
  ORA ($99,X)
  ASL $2C99,X
  .byte $9B, $89, $9B
  TSX
  .byte $9B
  SBC #$9B
  ASL $519C,X
  .byte $9C
  STY $BD9C
  .byte $9C, $0C
  STA $9D39,X
  ROR $9D
  STA ($9D),Y
  LDY $3B9D,X
  .byte $9E
  SBC #$9E
  STX $9F
  .byte $23
  LDY #$96
  LDY #$29
  LDA ($50,X)
  LDA ($B5,X)
  LDA ($CC,X)
  LDA ($1F,X)
  LDX #$6A
  LDX #$BF
  LDX #$14
  .byte $A3, $87, $A3
  NOP
  .byte $A3
  EOR $B6A4
  LDY $0D
  LDA $44
  LDA $5D
  LDA $BE
  LDA $0B
  LDX $32
  LDX $95
  LDX $E8
  LDX $33
  .byte $A7
  STY $A7
  .byte $C3, $A7
  PHP
  TAY
  EOR $A8
  ROR A
  TAY
  STA $B4A8,X
  TAY
  CMP ($A8,X)
  .byte $6F
  LDA #$B2
  LDA #$E1
  LDA #$06
  TAX
  .byte $23
  TAX
  .byte $34
  TAX
  EOR $AA
  .byte $52
  TAX
  .byte $5F
  TAX
  JMP ($79AA)
  TAX
  ROR $83AA,X
  TAX
  DEY
  TAX
  LDA #$AA
  .byte $C2
  TAX
  CMP $E6AA,Y
  TAX
  .byte $F3
  TAX
  BRK
@E389:
  .byte $AB
@E38A:
  ORA $12AB
  .byte $AB, $17, $AB, $1C, $AB, $53, $AB, $3C
  LDA $AD65
  .byte $7C
  LDA $AD93
  LDX $C9AD
  LDA $ADE2
  .byte $47
  LDX $AE88
  LDA $AE,X
  ADC $2BAF
  BCS $E3E1
  BCS @E3EC
  BCS @E3F7
  BCS @E38A
  BCS @E389
  LDA ($E3),Y
  LDA ($FA),Y
  LDA ($11),Y
  .byte $B2
  ASL $CCB2,X
  .byte $B2
  CMP $C8B2,Y
  .byte $B3
  AND $B4
  STY $B9B6
  LDX $D6,Y
  LDX $F3,Y
  LDX $00,Y
  .byte $B7
  ORA $26B7
  .byte $B7
  EOR $B7
  .byte $74, $B7
  STA ($B7,X)
  LDY $B7,X
  CMP ($B7,X)
  CLD
  .byte $B7
  ROR $A4B8,X
  CLV
  SBC $52B8
  LDA $B9BF,Y
  CLC
  TSX
@E3EC:
  STA ($BA,X)
  CPX #$BA
  AND ($BB,X)
  .byte $62, $BB
  ADC $7CBB
@E3F7:
  .byte $BB, $8F, $BB
  CLD
  .byte $BB
  ANC #$BC
  LSR $BC
  `;
}

// $8400-$87FF (1024B): $8400-$87FF 代码/数据段2
function build_8400_87FF_seg2(): readonly number[] {
  return asm`
  .byte $9B
  LDY $BD00,X
  .byte $2F
  LDA $BD58,X
  .byte $67
  LDA $BD7E,X
  LDA ($BD,X)
  .byte $B2
  LDA $BDBF,X
  CPY $BD
  CMP $BD,X
  .byte $E2
  LDA $BDE7,X
  .byte $BF
  LDA $BDEC,X
  AND $D6BE
  LDX $BF4D,Y
  .byte $F4, $8F
  ROR A
  .byte $BF, $8B, $BF
  LDY $03BF
  EOR $84
  NOP
  STY $71
  STY $8A
  STY $9B
  STY $A8
  STY $BB
  STY $CA
  STY $DF
  STY $F2
  STY $FD
  STY $0C
  STA $10
  ORA ($0C,X)
  PLP
  BPL @E474
  .byte $14
  ROL $0208
  .byte $0C
  ROL A
  BPL $E47E
  PHP
  BRK
  .byte $0C
  BIT $2D10
  ORA ($10,X)
  BRK
  .byte $0C, $2F
  BPL $E499
  .byte $14, $3C
  BPL @E465
  .byte $0C
@E465:
  SEC
  BPL @E4A3
  .byte $14
  ROL $0208,X
@E46C:
  .byte $0C
  NOP
  BPL $E49B
  ORA ($00,X)
  ORA ($10,X)
@E474:
  ROR A
  BRK
  .byte $02
  BPL @E4A4
  PHP
@E47A:
  BRK
  .byte $0C, $2F
  BPL $E4E7
  PHP
  ORA ($0C,X)
  .byte $3F, $14
  AND $0200,X
  .byte $0C
  NOP
  ORA ($10,X)
  ORA ($0C,X)
  ADC #$10
  AND #$14
  ROL $0208
  .byte $0C
  ARR #$10
  ROR $5302
@E49A:
  STY $08
  ORA ($0C,X)
  .byte $74
@E49F:
  BPL $E516
  PHP
  .byte $02
@E4A3:
  .byte $0C
@E4A4:
  ROR $10,X
  .byte $77
  ORA ($08,X)
  ORA ($0C,X)
  BVS $E4BD
  ADC ($08),Y
  .byte $02, $0C
  ROL A
  BPL $E4DF
  PHP
  BRK
  .byte $0C
  ADC $10
  .byte $67
  ORA ($08,X)
  ORA ($0C,X)
  .byte $7C
  BPL $E53E
  PHP
  .byte $02, $0C
  ROR $7F10,X
  .byte $02
  LDY $84,X
  PHP
  BRK
  .byte $0C, $72
  BPL $E543
  BPL @E4D3
  .byte $0C
@E4D3:
  SEI
  BPL @E54F
  .byte $14
  JMP ($0208)
  .byte $0C
  NOP
  BPL @E559
  ORA ($08,X)
  BRK
  .byte $0C
  ADC $6710
  PHP
  ORA ($0C,X)
  .byte $6F
  BPL @E46C
  PHP
  .byte $02, $0C
  NOP
  BPL @E51C
  ORA ($10,X)
  ORA ($0C,X)
  .byte $74
  BPL @E47A
  .byte $14, $83, $02
  LDA ($84,X)
  PHP
  BRK
  .byte $0C
  BIT $6710
  PHP
  ORA ($0C,X)
  PLP
  BPL $E48A
  .byte $02
  LDA ($84,X)
  BRK
  ORA ($10,X)
  STY $00
  .byte $02
  BPL @E49A
  .byte $02
  ADC $0384,Y
  BMI @E49F
  EOR $85
@E51C:
  .byte $5C
  STA $75
  STA $86
  STA $93
  STA $A6
  STA $B5
  STA $CA
  STA $DD
  STA $E8
  STA $F7
  STA $10
  ORA ($34),Y
  PLP
  SEC
  AND #$3C
  ROL $1208
  .byte $34
  ROL A
  SEC
  ANC #$08
  .byte $0F, $34
  BIT $2D38
  ORA ($10,X)
  .byte $0F, $34, $2F
  SEC
  AND $3C3C,Y
  BPL @E560
@E54F:
  .byte $34
  SEC
  SEC
  .byte $3B, $3C
  ROL $1208,X
  .byte $34
  NOP
@E559:
  SEC
  ANC #$01
  BRK
  ORA ($38),Y
  ROR A
@E560:
  BRK
  .byte $12
  SEC
  ANC #$08
  .byte $0F, $34, $2F
  SEC
  PLA
  PHP
  ORA ($34),Y
  .byte $3F, $3C
  AND $1200,X
  .byte $34
  NOP
  ORA ($10,X)
  ORA ($34),Y
  ADC #$38
  AND #$3C
  ROL $1208
  .byte $34
  ARR #$38
  ROR $3E02
  STA $08
  ORA ($34),Y
  .byte $74
  SEC
  ADC $08,X
  .byte $12, $34
  ROR $38,X
  .byte $77
  ORA ($08,X)
  ORA ($34),Y
  BVS @E5D0
  ADC ($08),Y
  .byte $12, $34
  ROL A
  SEC
  ANC #$08
  .byte $0F, $34
  ADC $38
  .byte $67
  ORA ($08,X)
  ORA ($34),Y
  .byte $7C
  SEC
  ADC $1208,X
  .byte $34
  ROR $7F38,X
  .byte $02, $9F
  STA $08
  .byte $0F, $34, $72
  SEC
  .byte $73
  BPL $E5CE
  .byte $34
  SEI
  SEC
  ADC $6C3C,Y
  PHP
  .byte $12, $34
  NOP
  SEC
  .byte $7B
  ORA ($08,X)
  .byte $0F, $34
  ADC $6738
@E5D0:
  PHP
  ORA ($34),Y
  .byte $6F
  SEC
  STA ($08,X)
  .byte $12, $34
  NOP
  SEC
  ANC #$01
  BPL $E5F0
  .byte $34, $74
  SEC
  .byte $82, $3C, $83, $02
  STY $0885
  .byte $0F, $34
  BIT $6738
  PHP
  ORA ($34),Y
  PLP
  SEC
  STA ($02,X)
  STY $0085
  ORA ($38),Y
  STY $00
  .byte $12
  SEC
  STX $02
  .byte $64
  STA $03
  .byte $1B
  STX $30
  STX $47
  STX $60
  STX $71
  STX $7E
  STX $91
  STX $A1
  STX $B6
  STX $C9
  STX $D4
  STX $E3
  STX $10
  ORA ($34,X)
  PLP
  SEC
  AND #$3C
  ROL $0208
  .byte $34
  ROL A
  SEC
  ANC #$08
  BRK
  .byte $34
  BIT $2D38
  ORA ($10,X)
  BRK
  .byte $34, $2F
  SEC
  AND $3C3C,Y
  BPL @E63B
  .byte $34
@E63B:
  SEC
  SEC
  .byte $3B, $3C
  ROL $0208,X
  .byte $34
  NOP
  SEC
  ANC #$01
  BRK
  ORA ($38,X)
  ROR A
  BRK
  .byte $02
  SEC
  ANC #$08
  BRK
  .byte $34, $2F
  SEC
  PLA
  PHP
  ORA ($34,X)
  .byte $3F, $3C
  AND $0200,X
  .byte $34
  NOP
  ORA ($10,X)
  ORA ($34,X)
  ADC #$38
  AND #$3C
  ROL $0208
  .byte $34
  ARR #$38
  ROR $2902
  STX $08
  ORA ($34,X)
  .byte $74
  SEC
  ADC $08,X
  .byte $02, $34
  ROR $38,X
  .byte $77
  ORA ($08,X)
  ORA ($34,X)
  BVS $E6BB
  ADC ($08),Y
  .byte $02, $34
  ROL A
  SEC
  ANC #$08
  BRK
  .byte $34
  ADC $38
  .byte $67
  ORA ($08,X)
  ORA ($34,X)
  .byte $7C
  SEC
  ADC $0208,X
  .byte $34
  ROR $7F38,X
  .byte $02
  TXA
  STX $01
  PHP
  BRK
  .byte $34, $72
  SEC
  .byte $73
  BPL @E6AA
  .byte $34
@E6AA:
  SEI
  SEC
  ADC $6C3C,Y
  PHP
  .byte $02, $34
  NOP
  SEC
  .byte $7B
  ORA ($08,X)
  BRK
  .byte $34
  ADC $6738
  PHP
  ORA ($34,X)
  .byte $6F
  SEC
  STA ($08,X)
  .byte $02, $34
  NOP
  SEC
  ANC #$01
  BPL @E6CC
  .byte $34
@E6CC:
  .byte $74
  SEC
  .byte $82, $3C, $83, $02, $77
  STX $08
  BRK
  .byte $34
  BIT $6738
  PHP
  ORA ($34,X)
  PLP
  SEC
  STA ($02,X)
  .byte $77
  STX $00
  ORA ($38,X)
  STY $00
  .byte $02
  SEC
  STX $02
  .byte $4F
  STX $03
  .byte $07, $87, $1C, $87, $33, $87
  JMP $5D87
  .byte $87
  ROR A
  .byte $87
  ADC $8C87,X
  .byte $87
  LDA ($87,X)
  LDY $87,X
  .byte $BF, $87
  DEC $1087
  ORA ($0C),Y
  PLP
  BPL @E736
  .byte $14
  ROL $1208
  .byte $0C
  ROL A
  BPL $E740
  PHP
  .byte $0F, $0C
  BIT $2D10
  ORA ($10,X)
  .byte $0F, $0C, $2F
  BPL $E75B
  .byte $14, $3C
  BPL @E737
  .byte $0C
  SEC
  BPL @E765
  .byte $14
  ROL $1208,X
@E72E:
  .byte $0C
  NOP
  BPL @E75D
  ORA ($00,X)
  ORA ($10),Y
@E736:
  ROR A
@E737:
  BRK
  .byte $12
  BPL @E766
  PHP
@E73C:
  .byte $0F, $0C, $2F
  BPL $E7A9
  PHP
  ORA ($0C),Y
  .byte $3F, $14
  AND $1200,X
  .byte $0C
  NOP
  ORA ($10,X)
  ORA ($0C),Y
  ADC #$10
  AND #$14
  ROL $1208
  .byte $0C
  ARR #$10
  ROR $1502
@E75C:
  .byte $87
@E75D:
  PHP
  ORA ($0C),Y
  .byte $74
  BPL @E7D8
  PHP
  .byte $12
@E765:
  .byte $0C
@E766:
  ROR $10,X
  .byte $77
  ORA ($08,X)
  ORA ($0C),Y
  BVS $E77F
  ADC ($08),Y
  .byte $12, $0C
  ROL A
  BPL $E7A1
  PHP
  .byte $0F, $0C
  ADC $10
  .byte $67
  ORA ($08,X)
  ORA ($0C),Y
  .byte $7C
  .byte $10, $7D  ; BPL $8800
  PHP
  .byte $12, $0C
  ROR $7F10,X
  .byte $02
  ROR $87,X
  PHP
  .byte $0F, $0C, $72
  .byte $10, $73  ; BPL $8805
  BPL $E7A5
  .byte $0C
  SEI
  .byte $10, $79  ; BPL $8811
  .byte $14
  JMP ($1208)
  .byte $0C
  NOP
  .byte $10, $7B  ; BPL $881B
  ORA ($08,X)
  .byte $0F, $0C
  ADC $6710
  PHP
  ORA ($0C),Y
  .byte $6F
  BPL @E72E
  PHP
  .byte $12, $0C
  NOP
  BPL @E7DE
  ORA ($10,X)
  ORA ($0C),Y
  .byte $74
  BPL @E73C
  .byte $14, $83, $02, $63, $87
  PHP
  .byte $0F, $0C
  BIT $6710
  PHP
  ORA ($0C),Y
  PLP
  BPL $E74C
  .byte $02, $63, $87
  BRK
  ORA ($10),Y
  STY $00
  .byte $12
  BPL @E75C
  .byte $02, $3B
@E7D8:
  .byte $87, $03, $F2, $87, $F2, $87
@E7DE:
  .byte $F2, $87, $F2, $87, $F2, $87, $F2, $87, $F2, $87
  ORA $F288,Y
  .byte $87, $F2, $87, $F2, $87, $F2, $87
  BRK
  ORA $0405
  BRK
  ANC #$09
  ORA $00
  ORA ($0D,X)
  BPL @E7FF
@E7FF:
  .byte $0C
  `;
}

// $8800-$8BFF (1024B): $8800-$8BFF 代码/数据段3
function build_8800_8BFF_seg3(): readonly number[] {
  return asm`
  ORA #$02
  CLC
  .byte $02
  ORA $1103
  ASL $15
  .byte $07
  ORA $2012,Y
  .byte $03
  ORA $0E09
  ASL A
  ORA ($0C),Y
  ORA $0D,X
  ORA $0118,Y
  BRK
  ORA $0405
  BRK
  ANC #$09
  BVC @E822
@E822:
  ORA ($0D,X)
  EOR ($00),Y
  .byte $0C
  ORA #$52
  CLC
  .byte $02
  ORA $1153
  LSR $15,X
  .byte $57
  ORA $2012,Y
  .byte $03
  ORA $0E09
  ASL A
  ORA ($0C),Y
  ORA $0D,X
  ORA $0118,Y
  .byte $03
  EOR $5988,Y
  DEY
  EOR $5988,Y
  DEY
  EOR $5988,Y
  DEY
  EOR $7C88,Y
  DEY
  EOR $5988,Y
  DEY
  EOR $5988,Y
  DEY
  BPL $E85C
  ORA $14
  ORA #$15
  ORA $2840
  .byte $02
  ORA $16
  ORA #$17
  ORA $1142
  .byte $43
  ORA $46,X
  ORA $2047,Y
  .byte $03
  ORA $0E09
  ASL A
  ORA ($49),Y
  ORA $4C,X
  ORA $014D,Y
  BPL $E87F
  ORA $14
  ORA #$58
  ORA $2859
  .byte $02
  ORA $16
  ORA #$5A
  ORA $115B
  .byte $43
  ORA $4F,X
  ORA $2047,Y
  .byte $03
  ORA $0E09
  ASL A
  ORA ($54),Y
  ORA $55,X
  ORA $014D,Y
  BRK
  ASL $3303
  BPL $E8A9
  .byte $22
  ANC #$2A
  ASL $0F2E
  CLC
  ORA $09
  JSR $210D
  ORA ($24),Y
  ORA $25,X
  JSR $1D06
  .byte $22
  AND $23
  ORA ($26),Y
  ORA $27,X
  .byte $17
  ASL A
  BPL @E8CA
  ORA $1A
  ORA #$1B
  ORA $08,X
  PHP
@E8CA:
  PHP
  ORA $30
  ORA #$31
  BRK
  ORA #$07
  .byte $32
  ORA ($10,X)
  .byte $04
  ASL A
  ORA ($0E),Y
  .byte $44, $12
  EOR $08
  ORA $35
  .byte $34
  AND $0835,Y
  ASL $35
  ROL $39,X
  .byte $37
  BRK
  ASL A
  .byte $33
  ASL A
  BRK
  ORA $0D
  RTS
  PHP
  ASL $0D
  .byte $62
  ORA ($63),Y
  PHP
  .byte $07
  ORA $111C
  ORA $0800,X
  AND $0848,Y
  ORA #$0F
  ASL $1F13,X
  ORA ($00,X)
  ASL $3353
  BPL @E911
  ASL A
  ORA ($0E),Y
  .byte $13
@E911:
  .byte $12
  ORA $0510,Y
  EOR ($20,X)
  EOR $21
  ORA ($25),Y
  JSR $4906
  .byte $22
  EOR $0D23
  ROL $11
  .byte $27, $13
  ASL A
  BPL @E930
  EOR $1A,X
  EOR ($1B,X)
  ORA ($08),Y
  PHP
@E930:
  PHP
  EOR $30,X
  EOR ($31,X)
  BRK
  ORA #$57
  .byte $32
  ORA ($10,X)
  .byte $04
  NOP
  LSR A
  LSR $624B,X
  LSR $0518
  ORA #$34
  ORA $1135
  RTS
  ORA $61,X
  CLC
  ASL $09
  ROL $0D,X
  .byte $37
  ORA ($62),Y
  ORA $63,X
  BRK
  ASL A
  .byte $67
  ASL A
  PHP
  .byte $07
  ORA ($1C),Y
  ORA $1D,X
@E960:
  BRK
  PHP
  AND $0848,X
  ORA #$13
  ASL $1F17,X
  ORA ($08,X)
  PHP
  .byte $03, $5C, $07
  EOR $0908,X
  .byte $03
  LSR $5F07,X
  .byte $02, $A3
  DEY
  PHP
  .byte $14
  ARR #$F2
  .byte $03, $F3
  PHP
  ORA $6B,X
  .byte $F4, $03
  SBC $00,X
  ORA #$6F
  ROR $02
  .byte $D4
  DEY
  PHP
  PHP
  .byte $03, $5C, $07
  EOR $0908,X
  .byte $03
  LSR $5F07,X
  .byte $02
  ANC #$89
  PHP
  .byte $14, $53, $F2, $57, $F3
  PHP
  ORA $53,X
  .byte $F4, $57
  SBC $00,X
  ORA #$07
  ROR $02
  NOP
  .byte $89
  PHP
  .byte $03, $0F, $5C, $13
  EOR $0408,X
  .byte $0F
  LSR $5F13,X
  ORA ($03,X)
  CMP $89,X
  JMP $658A
  TXA
  ROR $8A,X
  .byte $83
  TXA
  .byte $92
  TXA
  .byte $AF
  TXA
  DEC $8A
  .byte $FB
  TXA
  .byte $12, $8B
  AND #$8B
  BMI @E960
  BRK
  .byte $02, $0C, $17
  PHP
  .byte $03, $0C
  ORA $4813,X
  PHP
  .byte $02
  PHP
  ASL $10,X
  .byte $42
  BPL @E9E8
  PHP
@E9E8:
  .byte $14, $0C
  ORA $10,X
  RTI
  PHP
  .byte $03
  PHP
  .byte $1C, $0F, $3B
  BPL @E9F7
  ORA $08
@E9F7:
  ORA #$09
  ORA ($0D),Y
  BPL $EA00
  ORA #$0A
  ORA ($0E),Y
  ORA $0F,X
  CLC
  .byte $04
  LSR $5D18,X
  AND ($61,X)
  BIT $73
  AND $00
  ORA ($07,X)
  BPL @EA12
@EA12:
  .byte $12, $03, $07
  BRK
  .byte $02
  ORA $000C
  .byte $03
  ORA $000B
  .byte $04
  EOR $1820,Y
  ORA $0E
  .byte $22, $12, $23
  ASL $26,X
  .byte $1B, $27
  CLC
  ASL $0F
  PLP
  .byte $13
  AND #$17
  BIT $2D1B
  PHP
  .byte $07
  ORA ($2A),Y
  ORA $2B,X
  PHP
  PHP
  ORA ($2E),Y
  ORA $2F,X
  PHP
  ORA #$75
  .byte $12, $7B, $13
  BRK
  ASL $7F,X
  ORA ($01),Y
  BPL @EA4F
  PHP
@EA4F:
  ASL $1F0C,X
  BPL @EA9E
  BPL @EA58
  PHP
  .byte $34
@EA58:
  .byte $0C
  AND $10,X
  RTS
  PHP
  .byte $03, $0C
  ORA $4813,X
  .byte $02
  SBC $1089
  .byte $02
  PHP
  ASL $0C,X
  ROL $10,X
  .byte $37
  PHP
  .byte $03, $0C
  ORA $3D13,X
  .byte $02
  SBC $89
  BRK
  .byte $02, $0C, $3C
  PHP
  .byte $03, $0C
  ROL $3F13,X
  .byte $02, $DF, $89
  PHP
  .byte $02, $0C, $62
  BPL @EAEC
  PHP
  .byte $03, $0F
  PLA
  .byte $13
  ADC #$02
  .byte $F3, $89
  BRK
  .byte $02
  BPL @EADD
  PHP
  ORA ($0C,X)
  EOR ($10,X)
  .byte $44
  PHP
  .byte $02
@EA9E:
  PHP
  .byte $43, $0C
  LSR $18
  .byte $03
  PHP
  EOR #$0C
  JMP $3B0F
  .byte $13
  EOR $F302
  .byte $89
  PHP
  ORA ($0C,X)
  ROR $10
  .byte $67
  BPL $EAB9
  PHP
  ALR #$0C
  LSR $4F10
  PHP
  .byte $03, $0F, $64, $13
  ADC $02
  .byte $F3, $89
  BPL @EAC9
  PHP
@EAC9:
  EOR $0C
  BVC @EADD
  EOR ($10),Y
  .byte $02
  PHP
  ADC ($0C),Y
  .byte $52
  BPL $EB29
  BPL @EADB
  PHP
  .byte $1C, $0C
@EADB:
  CLI
  .byte $13
@EADD:
  EOR $0210,Y
  ORA $1A
  ORA #$19
  ORA ($30),Y
  BPL $EAEB
  ORA #$1B
  ORA ($32),Y
@EAEC:
  ORA $33,X
  CLC
  .byte $04
  LSR $5D3A,X
  AND ($61),Y
  SEC
  .byte $73
  AND $0D02,Y
  TXA
  PHP
  ORA ($0C,X)
  ROR $10
  .byte $67
  BPL $EB05
  PHP
  ALR #$0C
  ROR A
  BPL $EB74
  PHP
  .byte $03, $0F
  PLA
  .byte $13
  ADC #$02
  .byte $F3, $89
  PHP
  ORA ($0C,X)
  JMP ($6D10)
  BPL $EB1C
  PHP
  ROR $170C
  BPL @EB62
  PHP
  .byte $03, $0C
  ORA $4813,X
  .byte $02
  SBC $0089
  .byte $02
  BPL $EB9C
  .byte $02
  STX $8A,Y
  PHP
  .byte $02, $0C
  NOP
  BPL $EB6D
  PHP
  .byte $03, $0C
  BVS $EB4E
  AND $DF02,X
  .byte $89
  PHP
  ORA #$1B
  ORA $83
  EOR $08,X
  ASL $1B,X
  ADC ($83,X)
  .byte $57, $02
  LDY $0089,X
  PHP
  .byte $1B, $5C
  PHP
  ORA #$1B
  LSR $5583,X
  PHP
  ASL $1B,X
  .byte $5B, $83, $57, $02
  LDY $0089,X
@EB62:
  PHP
  .byte $1B
  EOR $0908,X
  .byte $1B, $5F, $83
  EOR $08,X
  ASL $1B,X
  .byte $5B, $83, $57, $02
  LDY $0889,X
  .byte $03, $0F, $54, $13
  EOR $08,X
  .byte $04, $0F
  LSR $13,X
  .byte $57
  ORA ($03,X)
  TXS
  .byte $8B, $AF, $8B, $D2, $8B
  CMP $F28B,Y
  .byte $8B
  ORA ($8C),Y
  ROL $8C
  .byte $3B
  STY $8C5A
  .byte $73
  STY $8C88
  STA $108C,X
  ORA ($0C,X)
  ORA ($10),Y
  .byte $14, $14
  ORA $18,X
  .byte $02, $0C
  ASL $10,X
  .byte $17, $13
  ORA $14
  ORA $B102,X
  STY $0118
  .byte $0C
  NOP
  BPL @EBD0
  .byte $14
  ASL $1F18,X
  JSR $0C02
  BMI @EBCE
  AND ($13),Y
  ORA $14
  .byte $34
  CLC
  AND $18,X
  .byte $03
  ORA ($18),Y
  .byte $13
  ORA $15
  .byte $32
  CLC
@EBCE:
  .byte $33, $02
@EBD0:
  LDA $008C,X
  .byte $02, $14
  AND $A102,Y
  STY $0110
  .byte $0C
  NOP
  .byte $10, $3A  ; BPL $8C19
  .byte $14, $3B
  CLC
  .byte $02, $0C, $3C
  .byte $10, $3D  ; BPL $8C24
  .byte $13
  ORA $14
  ORA $0300,X
  ORA ($3E),Y
  .byte $02
  LDA ($8C),Y
  BPL @EBF5
  .byte $0C
@EBF5:
  .byte $3F
  .byte $10, $40  ; BPL $8C38
  .byte $14
  EOR ($18,X)
  .byte $02, $0C, $42
  .byte $10, $43  ; BPL $8C43
  `;
}

// $8C00-$8FFF (1024B): $8C00-$8FFF 代码/数据段4
function build_8C00_8FFF_seg4(): readonly number[] {
  return asm`
  .byte $13
  ORA $14
  LSR $18
  .byte $03
  ORA ($44),Y
  .byte $13
  ORA $15
  ORA $1C18,Y
  .byte $02
  LDA $108C,X
  ORA ($0C,X)
  PHA
  BPL @EC60
  .byte $14
  JMP $0218
  .byte $0C
  LSR A
  BPL $EC6A
  .byte $13
  ORA $14
  LSR $0402
  STY $0110
  .byte $0C
  ORA ($10),Y
  RTS
  .byte $14
  ADC ($18,X)
  .byte $02, $0C, $62
  BPL @EC97
  .byte $13
  ORA $14
  ROR $02
  .byte $04
  STY $0110
  .byte $0C
  PLA
  BPL $ECAA
  .byte $14, $3B
  CLC
  .byte $02, $0C
  ROR A
  BPL $ECB4
  .byte $13
  ORA $14
  ROR $0318
  ORA ($18),Y
  .byte $13
  ORA $15
  .byte $6F
  CLC
  .byte $1C, $02
  LDA $108C,X
  ORA ($0C,X)
  .byte $4F
  BPL $ECC4
@EC60:
  .byte $14
  ADC $18
  .byte $02, $0C, $67
  BPL $ECD4
  .byte $13
  ORA $14
  ADC $0300
  ORA ($18),Y
  .byte $02
  LDA $8C,X
  BPL @EC76
  .byte $0C
@EC76:
  .byte $3F
  BPL @ECBE
  .byte $14
  BVC @EC94
  .byte $02, $0C, $42
  BPL @ECC8
  .byte $13
  ORA $14
  .byte $52, $02, $04
  STY $0110
  .byte $0C
  EOR $5810
  .byte $14
  JMP $0218
  .byte $0C
  NOP
@EC94:
  BPL $ECE1
  .byte $13
@EC97:
  ORA $14
  .byte $5B, $02, $04
  STY $0200
  .byte $14, $2F
  BPL @ECA4
  .byte $0C
@ECA4:
  ROL $10,X
  .byte $37, $14
  ROL $0210
  .byte $0C
  AND $3810
  .byte $13
  ORA $00
  .byte $03
  ORA ($18),Y
  BPL @ECBA
  .byte $13
  ORA $15
@ECBA:
  ORA $1C18,Y
  BRK
@ECBE:
  .byte $03
  ORA $2004
  .byte $04
  ORA #$03
  ORA $1106
@ECC8:
  .byte $07, $17, $12, $1B, $13
  PLP
  ORA $04
  PHP
  ORA #$09
  ORA $0E0C
  ORA $11
  ORA $1012
  CLC
  ASL $07
  ASL A
  ASL A
  ANC #$0E
  ASL $0F12
  CLC
  .byte $07
  EOR $20,X
  EOR ($21,X)
  .byte $47
  BIT $87
  AND $18
  PHP
  ORA #$22
  ORA $1123
  ROL $15
  .byte $27
  BPL $ED04
  .byte $27
  PLP
  AND $8929,X
  BIT $1608
  ORA $832A,Y
  ANC #$00
  .byte $17, $DF, $02
  ORA ($08,X)
  CLC
  ANC #$51
  .byte $0F, $54
  PHP
  ORA $530B,Y
  .byte $0F
  LSR $02,X
  STA ($8B,X)
  PHP
  CLC
  ANC #$51
  .byte $0F, $54
  BPL $ED3C
  ANC #$53
  .byte $0F, $5C, $13
  EOR $1A00,X
  .byte $0F
  LSR $8102,X
  .byte $8B
  PHP
  CLC
  ANC #$51
  .byte $0F, $54
  BPL $ED51
  ANC #$53
@ED3A:
  .byte $0F
  EOR $13,X
  .byte $57
  BRK
  NOP
  .byte $0F
  EOR $8102,Y
  .byte $8B
  PHP
  .byte $03, $0F
  EOR ($13),Y
  .byte $54
  PHP
  .byte $04, $0F, $53, $13
  LSR $01,X
  .byte $03
  ARR #$8D
  .byte $80
  STA $8DA1
  LDY $CD8D
  STA $8DE8
  ORA #$8E
  ROL $8E
  EOR #$8E
  PLA
  STX $8E87
  TAY
  STX $0110
  .byte $54
  LDY #$40
  LDA ($44,X)
  LDY $18
  .byte $02, $54
  LDX #$40
  .byte $A3
  EOR $A6
  .byte $44
  STX $BC02
  STX $0118
  .byte $54
  TAX
  RTI
  .byte $AB, $44
  LDX $AF84
  CLC
  .byte $02, $54
  BCC @EDCF
  STA ($45),Y
  STY $44,X
  .byte $93
  CLC
  .byte $03
  EOR $92,X
  EOR ($A9,X)
  .byte $43
  ORA $45
  LDY $C802
  STX $0210
  RTI
  STA ($45),Y
  TXS
  .byte $44, $9B, $02
  BCS @ED3A
  BPL @EDAF
  .byte $54
@EDAF:
  .byte $A7
  RTI
  .byte $B2, $44, $B3
  CLC
  .byte $02, $54
  LDA $B840
  EOR $B9
  .byte $44, $BB
  JSR $5503
  TAY
  .byte $54
  ORA $41
  TSX
  .byte $43
  ORA $45
  LDY $C802
  STX $0108
@EDCF:
  .byte $54
  STA $40,X
  CMP $10,X
  .byte $02, $54
  STX $40,Y
  .byte $97
  EOR $C2
  CLC
  .byte $03
  EOR $9D,X
  EOR ($C8,X)
  .byte $43
  ORA $45
  CMP #$02
  INY
  STX $0110
  .byte $54, $9F
  RTI
  DEX
  .byte $44
  AXS #$18
  .byte $02, $54
  LDA ($40),Y
  LDY $45,X
  LDA $44,X
  CPX #$20
  .byte $03
  EOR $B6,X
  .byte $54
  ORA $41
  .byte $B7, $43
  ORA $45
  CMP #$02
  INY
  STX $0108
  .byte $54
  ROL $40,X
  .byte $E2
  BPL $EE13
  .byte $54
  LDY $BD40,X
  EOR $C2
  JSR $5503
  LDX $0554,Y
  EOR ($BF,X)
  .byte $43
  ORA $45
  CMP #$02
  INY
  STX $0110
  .byte $54, $E3
  RTI
  INC $44
  .byte $E7
  JSR $5402
  INX
  RTI
  SBC #$45
  CPX $E144
  .byte $87
  SBC $0320
  .byte $54
  NOP
  EOR ($EB,X)
  .byte $43
  ORA $45
  INC $EF87
  .byte $02
  CPY $108E
  ORA ($54,X)
  DEC $40,X
  CPY $44
  AXS #$18
  .byte $02, $54, $C3
  RTI
  DEC $45
  LDA $44,X
  CPX #$18
  .byte $03
  EOR $92,X
  EOR ($A9,X)
  .byte $43
  ORA $45
  CPY $C802
  STX $0110
  .byte $54
  STA $40,X
  DEC $CF44
  CLC
  .byte $02, $54
  STX $40,Y
  .byte $97
  EOR $E4
  .byte $44
  SBC $18
  .byte $03
  EOR $9D,X
  EOR ($C8,X)
  .byte $43
  ORA $45
  CMP #$02
  INY
  STX $0110
  .byte $54, $9F
  RTI
  DEX
  .byte $44
  AXS #$18
  .byte $02, $54, $C7
  RTI
  LDY $45,X
  LDA $44,X
  CPX #$20
  .byte $03
  EOR $CD,X
  .byte $54
  ORA $41
  .byte $B7, $43
  ORA $45
  CMP #$02
  INY
  STX $0210
  RTI
  .byte $9E
  EOR $A5
  .byte $44
  BCS @EEC1
  ORA ($54,X)
  TYA
  RTI
  STA $9C44,Y
  BRK
  .byte $02, $54, $8F
  JSR $5503
  TAY
  .byte $54
@EEC1:
  ORA $41
  LDA #$43
  ORA $45
  LDY $0200
  STA $5F
  BRK
  .byte $02
  BCC $EF45
  BPL $EED5
  .byte $53, $89
  STA $71
  .byte $93, $74
  BMI @EEDE
  JMP ($508A)
  .byte $8B
@EEDE:
  EOR ($72,X)
  EOR $73
  STA $76
  STX $05
  .byte $92, $77
  CLC
  ORA $42
  SEI
  LSR $79
  STX $7C
  .byte $92
  ADC $0620,X
  EOR $70,X
  EOR ($7A,X)
  .byte $44, $7B, $87
  ROR $7F90,X
  CLC
  .byte $07, $03, $80
  ORA $81
  ORA #$84
  STA $85
  CLC
  PHP
  .byte $03, $82
  ORA $83
  .byte $47
  STX $85
  .byte $87
  PHP
  ORA #$47
  STY $8D85
  BRK
  ASL $13,X
  DEY
  ORA ($08,X)
  ORA ($53,X)
  EOR ($57),Y
  .byte $54
  PHP
  .byte $02, $53, $53, $57
  LSR $02,X
  .byte $52
  STA $0000
  .byte $57
  CMP $10
  ORA ($53,X)
  EOR ($57),Y
  BNE @EF7A
  .byte $D2
  PHP
  .byte $02, $53, $53, $57
  LSR $02,X
  .byte $52
  STA $0000
  .byte $57
  CMP ($10),Y
  ORA ($53,X)
  EOR ($57),Y
  .byte $D3, $43, $D4
  PHP
  .byte $02, $53, $53, $57
  LSR $02,X
  .byte $52
  STA $0308
  .byte $0F
  EOR ($13),Y
  .byte $54
  PHP
  .byte $04, $0F, $53, $13
  LSR $01,X
  .byte $03, $7C, $8F
  LDA #$8F
  .byte $B2, $8F, $7C, $8F, $BB, $8F, $B2, $8F, $B2, $8F
@EF72:
  INY
  .byte $8F, $B2, $8F, $DB, $8F, $B2, $8F
@EF7A:
  .byte $B2, $8F
  PHP
@EF7D:
  .byte $02
  ORA ($9D),Y
  BPL $EF34
  PHP
  .byte $02, $0C, $9C
  ORA $B5,X
@EF88:
  PHP
  .byte $03
  ORA ($9E),Y
  ORA $9F,X
@EF8E:
  BRK
  .byte $02
  CLC
  .byte $97
  BRK
  .byte $03
  ORA $1098
  .byte $04
  ORA $0F9A
  STA $9B12,Y
  PHP
  ORA $11
  LDA ($15),Y
  LDY $00,X
  ASL $75
  BCS @EFAA
  PHP
@EFAA:
  .byte $02
  ORA ($B8),Y
  BPL $EF62
  .byte $02, $82, $8F
  PHP
  .byte $02
  ORA ($B9),Y
  BPL @EF72
  .byte $02, $82, $8F
  CLC
  .byte $02, $0C, $BB
  ORA ($B9),Y
  BPL @EF7D
  ORA $B5,X
  .byte $02
  DEY
  .byte $8F
  CLC
  .byte $02, $0C, $9C
  ORA ($B6),Y
  BPL @EF8E
  ORA $B7,X
  PHP
  .byte $03
  ORA ($BC),Y
  ORA $BD,X
  .byte $02
  STX $188F
  .byte $02, $0C, $BB
  ORA ($9D),Y
  BPL $EF95
  ORA $B5,X
  .byte $02
  DEY
  .byte $8F
  PHP
  ASL $9F,X
  .byte $7C, $A3
  ADC $1708,X
  .byte $9F
  ROR $7FA3,X
  .byte $03
  ORA $2690
  .byte $90, $47  ; BCC $9041
  .byte $90, $58  ; BCC $9054
  .byte $90, $71  ; BCC $906F
  BCC @EF88
  `;
}

// $9000-$93FF (1024B): $9000-$93FF 代码/数据段5
function build_9000_93FF_seg5(): readonly number[] {
  return asm`
  .byte $90, $9F  ; BCC $8FA1
  .byte $90, $B6  ; BCC $8FBA
@E004:
  .byte $90, $E5  ; BCC $8FEB
  BCC @E004
  BCC @E01F
  STA ($2C),Y
  STA ($10),Y
  .byte $02, $04
  ORA ($08),Y
  .byte $14, $0C
  ORA $10,X
  .byte $03, $04, $13
  PHP
  ASL $0C,X
  .byte $17
  PHP
  .byte $04
@E01F:
  PHP
  ORA $1C0C,Y
  .byte $02, $42
  STA ($08),Y
  ORA ($0C,X)
  ORA $4810,X
  CLC
  .byte $02, $04
  ORA ($08),Y
  ASL $1F0C,X
  BPL $E080
  BPL @E03B
  .byte $54, $34
  RTI
@E03B:
  AND $44,X
  RTS
  PHP
  .byte $04
  PHP
  ORA $1B0C,Y
  .byte $02, $42
  STA ($10),Y
  .byte $03, $04, $13
  PHP
  .byte $3C, $0C
  AND $0408,X
  PHP
  ROL $1C0C,X
  .byte $02
  NOP
  STA ($10),Y
  .byte $02, $54, $44
  RTI
  EOR $44
  BVC $E071
  .byte $03, $04
  LSR $08
  .byte $47, $0C, $52
  PHP
  .byte $04
  PHP
  .byte $3F, $0C
  ROR A
  .byte $02, $42
  STA ($08),Y
  .byte $02
  PHP
  .byte $63, $0C
  ROR $10
  .byte $03, $04
  PLA
  PHP
  ADC #$0C
  JMP ($0408)
  PHP
  ARR #$0C
  ROR $4202
  STA ($08),Y
  .byte $02
  TYA
  EOR #$34
  JMP $0310
  .byte $04
  ALR #$08
  LSR $4F0C
  PHP
  .byte $04
  PHP
  ADC ($0C,X)
  .byte $64, $02, $42
  STA ($08),Y
  .byte $02
  PHP
  .byte $63, $0C
  ROR $10
  .byte $03, $04
  EOR $5808
  .byte $0C
  EOR $0408,Y
  PHP
  NOP
  .byte $0C
  ROR $4202
  STA ($10),Y
  .byte $02, $04
  EOR ($08),Y
  .byte $54, $0C
  EOR $10,X
  .byte $03, $04, $53
  PHP
  LSR $0C,X
  .byte $57
  PHP
  .byte $04
  PHP
  .byte $5C, $0C, $1C
  BRK
  ORA ($0B,X)
  AND ($08),Y
  .byte $02
  ORA #$32
  ORA $0833
  .byte $04
  ORA $1138
  AND $0508,Y
  ORA $113A
  .byte $3B, $02
  CLI
  STA ($08),Y
  .byte $02
  STY $65,X
  JSR $1070
  .byte $03, $04, $67
  PHP
  .byte $72, $0C, $73
  PHP
  .byte $04
  PHP
  ADC $6F0C
  .byte $02, $42
  STA ($10),Y
  .byte $02, $04, $5B
  PHP
  LSR $5F0C,X
  BPL @E109
  .byte $04
  ADC ($08),Y
@E109:
  .byte $74, $0C
  ADC $08,X
  .byte $04
  PHP
  ROR $0C,X
  .byte $77, $02, $42
  STA ($08),Y
  .byte $02
  TYA
  SEI
  .byte $34
  JMP $0310
  .byte $04
  EOR $7A08,X
  .byte $0C, $4F
  PHP
  .byte $04
  PHP
  ADC $640C,Y
  .byte $02, $42
  STA ($10),Y
  .byte $03, $04, $13
  PHP
  RTI
  .byte $0C
  EOR ($08,X)
  .byte $04
  PHP
  .byte $42, $0C, $43
  BPL @E13E
  STY $36,X
@E13E:
  JSR $2837
  .byte $62
  BRK
  ORA ($0B,X)
  PHP
  PHP
  .byte $02
  ORA #$0A
  ORA $080B
  .byte $04
  ORA $1123
  ROL $08
  ORA $0D
  AND #$11
  BIT $0000
  ANC #$02
  BRK
  ORA $2A04
  BRK
  ORA ($0C,X)
  ORA #$10
  .byte $03
  ORA $1121
  BIT $09
  JSR $0408
  ORA #$22
  .byte $14, $27
  BPL @E179
  ORA #$28
  ASL A
  .byte $03, $17
@E179:
  AND $0620
  ASL A
  .byte $04
  ASL $1205
  BPL @E19A
  ANC #$18
  ROL $0710
  STA $06,X
  JSR $1807
  .byte $2F
  PHP
  PHP
  ORA $0C
  ORA #$0D
  PHP
  ORA #$51
  .byte $12
  EOR $18,X
@E19A:
  BPL $E1B2
  .byte $6F
  ASL $0F51
  EOR $1A,X
@E1A2:
  PHP
  .byte $17, $6F
  AND $53
  BMI @E1AA
  BRK
@E1AA:
  ORA ($15,X)
  STY $0208
  ORA ($88),Y
  ORA $89,X
  PHP
  .byte $03, $0C, $82
  ORA ($83),Y
  PHP
  .byte $04
  PHP
  STY $0C
  STA $08
  ORA $04
  STX $08
  .byte $87
  ORA ($08,X)
  .byte $02, $0F
  CLV
  .byte $13
  LDA $0308,Y
  .byte $0F
  TSX
  .byte $13, $BB
  PHP
  .byte $04, $0F
  LDY $BD13,X
  PHP
  ORA $0F
  LDX $BF13,Y
  ORA ($08,X)
  .byte $02, $0F
  LDA $13,X
  LDX $08,Y
  .byte $03, $0F, $B7, $13, $E2
  PHP
  .byte $04, $0F
  INX
  .byte $13
  SBC #$08
  ORA $0F
  NOP
  .byte $13
  SBC #$01
  BRK
  .byte $03, $13
  LDY $08,X
  .byte $04
  ORA $11FC
  SBC $0508,X
  ORA ($FE),Y
  ORA $FF,X
  ORA ($03,X)
  ASL $92,X
  .byte $5F, $92
  BVS @E1A2
  .byte $5F, $92, $5F, $92, $5F, $92
  BRK
  ORA $3016,Y
  CLC
  NOP
  ORA ($27),Y
  .byte $13
  BIT $2D12
  .byte $17, $32
  BRK
  .byte $1C
  NOP
  .byte $12
  BPL @E242
  ASL A
  ANC #$16
  NOP
  NOP
  CLC
  PHP
  ORA $2006,Y
  ASL A
  AND ($10,X)
  NOP
  ASL $22
  .byte $07
  ROL A
  ASL $0026
  .byte $1B
  ASL $29
@E242:
  BRK
  ORA $1018
  BPL @E260
  .byte $04
  ASL A
  ASL $110E
  .byte $0F
  BPL @E269
  ORA $0E24
  ORA $2511
  BRK
  NOP
  ANC #$23
  BRK
  .byte $1B, $03
  PLP
  ORA ($00,X)
@E260:
  ORA $3316,Y
  CLC
  NOP
  ORA ($2B),Y
  BPL $E297
@E269:
  .byte $12
  AND $2F14
  .byte $02
  BIT $92
  BRK
  .byte $1C
  CLC
  ORA $18,X
  CLC
  ASL A
  ORA $1F0B,X
  ASL $16,X
  NOP
  .byte $17
  BPL @E299
  ASL $11
  ANC #$14
  ASL $1C,X
  JSR $071A
  .byte $13
  ASL $1134
  .byte $1B, $12
  AND $1E17
  PHP
  .byte $1B, $07
  ORA $3110,Y
  .byte $02
@E299:
  .byte $42, $92, $03
  LDY $92,X
  .byte $C7, $92, $DC, $92
  LDY $92,X
  .byte $EF, $92, $02, $93
  ORA $93,X
  PLP
  .byte $93, $02, $93
  EOR ($93,X)
  .byte $02, $93, $DC, $92
  PHP
  BRK
  RTI
  ORA $44
  BPL @E2D3
  ORA ($40,X)
  .byte $07
  EOR $12
  .byte $44
  ORA ($85),Y
  .byte $13, $02, $53, $93
  PHP
  BRK
  RTI
  ORA $44
  .byte $14
  JSR $4001
  ASL $45,X
  .byte $17
@E2D3:
  .byte $44
  ASL $1985
  STY $1C
  .byte $02, $53, $93
  PHP
  BRK
  RTI
  ORA $44
  ORA $0118,X
  RTI
  .byte $07
  EOR $1B
  .byte $44
  AND ($85),Y
  .byte $13, $02, $53, $93
  PHP
  BRK
  RTI
  .byte $0F, $44
  NOP
  CLC
  ORA ($40,X)
  AND $45
  BMI $E340
  ROL $1385
  .byte $02, $53, $93
  PHP
  BRK
  RTI
  ASL $1F44,X
  CLC
  ORA ($40,X)
  .byte $34
  EOR $35
  .byte $44
  ORA $85,X
  .byte $13, $02, $53, $93
  PHP
  BRK
  RTI
  .byte $27, $44
  NOP
  CLC
  ORA ($40,X)
  .byte $32
  EOR $30
  .byte $44
  ROL $1385
  .byte $02, $53, $93
  PHP
  BRK
  RTI
  ORA $44
  BPL @E347
  ORA ($40,X)
  .byte $07
  EOR $2D
  .byte $44
  ORA ($85),Y
  SEC
  PHP
  .byte $02
  EOR $2F
  STA $3A
  .byte $02
  EOR $0893,Y
  BRK
  RTI
  .byte $0F, $44, $33
@E347:
  JSR $5401
  .byte $3B
  RTI
  AND $45
  AND $3644,Y
  STA $13
  PHP
  .byte $02
  EOR $0D
  STA $18
  BRK
  .byte $1C
  BCC @E361
  BRK
  CLC
  BCC @E367
@E361:
  BRK
  .byte $02
  EOR ($02,X)
  BPL $E36A
@E367:
  EOR ($08,X)
  EOR $03
  STY $0C
  PLP
  .byte $04, $54, $37, $42
  ASL A
  .byte $43
  BIT $47
  ORA #$45
  ASL $2686
  PHP
  ORA $42
  JSR $0B47
  PHP
  ASL $41
  .byte $3C
  EOR $21
  PHP
  .byte $07
  EOR ($3E,X)
  EOR $23
  PHP
  PHP
  EOR $3D
  .byte $47
  BIT $0900
  .byte $47, $3F
  ORA ($18,X)
  .byte $04
  SBC #$2B
  SBC $F12E
  AND ($9D),Y
  .byte $34
  JSR $E905 ; → bank switch?
  .byte $2F
  SBC $F13A
  .byte $33, $F2, $3F, $9E
  ROL $18,X
  ASL $E9
  .byte $3B
  SBC $F23E
  AND $3C9E,Y
  BRK
  BRK
  STA $1004,X
  ORA ($ED,X)
  .byte $02
  SBC ($03),Y
  STA $1006,X
  .byte $02
  SBC $F108
  ORA #$9D
  .byte $0C
  BRK
  ROL $E9
  .byte $14
  BPL @E3D5
  SBC $F10A
@E3D5:
  ANC #$9D
  ASL $1001
  BRK
  BPL @E3F2
  .byte $14
  RTI
  CLC
  EOR ($10,X)
  ORA ($11,X)
  .byte $17, $17, $42, $1B, $43
  BPL @E3ED
  ORA ($1D),Y
@E3ED:
  .byte $17
  PHA
  ORA $0049,Y
@E3F2:
  ORA $4E0B
  BRK
  .byte $1C
  ANC #$64
  BRK
  BRK
  .byte $0F, $4F
  PHP
  ORA ($0D,X)
  `;
}

// $9400-$97FF (1024B): $9400-$97FF 代码/数据段6
function build_9400_97FF_seg6(): readonly number[] {
  return asm`
  ADC $83
  PLA
  BPL $E407
  ORA $8367
  ROR A
  .byte $C3
  ADC #$28
  .byte $03
  ASL $0D6C
  ADC $7811
  ORA $79,X
  ORA $C37C,Y
  ARR #$10
  .byte $04
  EOR $5E7A,Y
  .byte $7B, $62
  ROR $0510,X
  ORA #$73
  ORA $1170
  ADC ($00),Y
  ASL $0D
  .byte $72
  BRK
  .byte $1B
  ORA $7D
  ORA ($00,X)
  BRK
  LDA ($04,X)
  PLP
  ORA ($F1,X)
  .byte $02
  STA $A103,X
  ASL $B5
  .byte $07
  ADC #$12
  ORA ($13,X)
  PLP
  .byte $02
  SBC ($08),Y
  STA $A109,X
  .byte $0C
  LDA $0D,X
  ADC #$18
  ORA ($19,X)
  BRK
  ROL $ED
  .byte $14
  BRK
  CLC
  ORA $1C
  PLP
  .byte $03
  SBC ($0A),Y
  STA $A10B,X
  ASL $0FB5
  ADC #$1A
  ORA ($1B,X)
@E468:
  PLP
  .byte $04
  SBC $F105
  JSR $219D
  LDA ($24,X)
  LDA $25,X
  ADC #$30
  PLP
  ORA $E9
  BPL @E468
  .byte $22
  SBC ($23),Y
  .byte $9E
  ROL $A2
  .byte $27
  LDA $32,X
  BMI $E48C
  SBC #$11
  SBC $F128
  AND #$F2
  ROL A
  .byte $9E
  BIT $2DA2
  LDA $38,X
  ORA ($00,X)
  .byte $02, $C3
  ROR $0310
  .byte $C3, $6F, $C7
  EOR ($CB),Y
  .byte $54
  JSR $C504 ; → bank switch?
  .byte $53
  CMP #$56
  CMP $D157
  .byte $74
  CMP $75,X
  CLC
  ORA $A5
  EOR $5CA9,Y
  .byte $AF
  EOR $55B3,X
  CLC
  ASL $C6
  NOP
  CMP #$5B
  CMP $D15E
  .byte $5F
  PLP
  .byte $07
  CMP ($16,X)
  DEC $66
  CMP #$84
  DEX
  .byte $77
  CMP $D185
  .byte $7F
  BMI @E4D9
  STA ($82,X)
  CMP ($88,X)
  CMP $89
  DEC $76
@E4D9:
  DEX
  ASL $83CE,X
  .byte $D2
  STX $08
  ORA #$C1
  TXA
  CMP $8B
  .byte $02
  CMP $1093,Y
  BRK
  BPL $E50B
  .byte $14
  LSR A
  CLC
  ALR #$18
  ORA ($11,X)
  AND $3510,X
  .byte $14
  RTS
  CLC
  ADC ($10,X)
  .byte $02
  ORA ($37),Y
  ORA $62,X
  ORA $0263,Y
  SBC ($93),Y
  BPL @E507
@E507:
  BPL @E54D
  .byte $14
  EOR $18
  BVC @E51E
  ORA ($11,X)
  LSR $17
  .byte $47
  CLC
  .byte $52
  BPL @E519
  ORA ($4C),Y
@E519:
  ORA $4D,X
  ORA $0258,Y
@E51E:
  SBC ($93),Y
  BRK
  ORA #$17
  ADC #$08
  ASL $0F,X
  .byte $3F, $13
  ROR A
  .byte $03, $43
  STA $C2,X
  STA $E1,X
  STA $FA,X
  STA $13,X
  STX $43,Y
  STA $43,X
  STA $28,X
  STX $43,Y
  STA $43,X
  STA $43,X
  STA $43,X
  STA $08,X
  .byte $02
  CPY $D007
  .byte $12
  BPL $E54E
  INY
  .byte $0C
@E54D:
  CPY $D00D
  CLC
  PHP
  .byte $04, $CF, $0F
  BNE $E571
  PHP
  .byte $02
@E559:
  CMP #$40
  CMP $0041
  .byte $03
  CMP #$42
  PHP
  .byte $04
  CMP ($51),Y
  CMP $54,X
  PHP
  BRK
  .byte $C3
  ROR $C6
  .byte $67
  PHP
  ORA ($C7,X)
  ADC $78CB
  BRK
  .byte $02, $C7, $6F
  CLC
  .byte $04
  DEC $44
  CMP #$45
  CMP $DB50
  EOR $38,X
  ORA $C3
  .byte $43
  DEC $46
  CMP #$47
  DEX
  BVC @E559
  .byte $52
  CMP ($53),Y
  .byte $D7
  LSR $DB,X
  .byte $57
  BMI $E59B
  ORA $811D,Y
  PHA
  .byte $C3
  EOR #$C7
  JMP $4DCA
  DEC $D258
  EOR $0720,Y
  ORA $61,X
  ORA $811F,Y
  LSR A
  AXS #$4F
  .byte $CF
  NOP
  JSR $0F08
  .byte $37, $13, $62
  ORA $63,X
  ORA $CB35,Y
  ADC $08
  ORA #$0F
  AND $6813,X
  ORA ($00,X)
  ORA ($D4,X)
  BPL @E5D7
  .byte $02
  CPY $D011
  .byte $14, $D4
  ORA $18,X
  .byte $03
  INY
  .byte $0C
  CPY $D013
  ASL $D4,X
@E5D7:
  .byte $17
  PHP
  .byte $04, $CF
  ORA $1CD0,Y
  .byte $02, $57
  STA $08,X
  .byte $02
  CPY $D020
  AND ($18,X)
  .byte $03
  INY
  ASL $22CC
  BNE @E612
  .byte $D4
  ROL $08
  .byte $04, $CF, $0F
  BNE @E611
  .byte $02, $57
  STA $08,X
  .byte $02
  CPY $D020
  AND ($18,X)
  .byte $03
  INY
  ASL $29CC
  BNE @E62B
  .byte $D4
  ROL $08
  .byte $04, $CF
  ANC #$D0
  NOP
  .byte $02
@E611:
  .byte $57
@E612:
  STA $00,X
  .byte $02
  CPY $103A
  .byte $03
  INY
  SEC
  CPY $D02C
  AND $0408
  .byte $CF
  ROL $2FD0
  .byte $02, $57
  STA $10,X
  .byte $02
  INY
@E62B:
  LSR $5FCC,X
  BNE @E642
  BPL $E635
  INY
  .byte $74
  CPY $D070
  ADC ($08),Y
  .byte $04, $CF, $72
  BNE @E6B1
  PHP
  .byte $02
  CMP #$4B
@E642:
  CMP $004E
  .byte $03
  CMP #$60
  PHP
  .byte $04
  CMP ($5C),Y
  CMP $5D,X
  .byte $02, $67
  STA $00,X
  ORA #$17
  ADC #$08
  ASL $0F,X
  .byte $3F, $13
  ROR A
  PHP
  ORA #$0B
  ADC $6C17,X
  CLC
  ASL $0B,X
  LDX $BF0F,Y
  .byte $13
  ARR #$17
  ROR $2A02
  STA $00,X
  ORA #$17
  ADC #$08
  ASL $0F,X
  .byte $3F, $13
  ROR A
  PHP
  ORA #$0B
  .byte $7C, $17
  ADC $1618,Y
  ANC #$7E
  .byte $0F, $7F, $13
  NOP
  .byte $17, $7B, $02
  ROL A
  STA $08,X
  BRK
  .byte $5B
  ROL $2F5F
  CLC
  ORA ($09,X)
  BMI @E6A5
  AND ($0D),Y
  LSR $11
  RTI
  JSR $0B02
  .byte $32
  ASL A
  .byte $44
  ORA $0F33
  .byte $02
@E6A5:
  .byte $12, $42
  PLP
  .byte $03, $04
  AND $3808
  .byte $0C
  AND $4110,Y
@E6B1:
  .byte $43, $02, $47, $02
  BPL @E6BB
  PHP
  NOP
  .byte $0C, $3B
@E6BB:
  BPL @E700
  BPL @E6C4
  ORA #$34
  ORA $1135
@E6C4:
  .byte $37
  PHP
  ASL $09
  ROL $31,X
  AND $0720,X
  .byte $07
  ROL $3F0B,X
  ORA #$45
  .byte $13, $3C
  LDA $0145,X
  PHP
  BRK
  RTI
  BVC @E73A
  INC $18
  ORA ($5C,X)
  .byte $52
  EOR $60FA,X
  .byte $53
  ADC ($FB,X)
  CLC
  .byte $02, $44
  CLI
  EOR $E5
  STY $59
  STA $F0
  BMI $E6F7
  .byte $44
  NOP
  EOR $E7
  STY $5B
  STA $F2
  .byte $92, $F7
  BCC @E751
@E700:
  STA ($F3),Y
  SEC
  .byte $04, $0C
  LSR $10,X
  .byte $57, $14, $54
  EOR ($EC,X)
  EOR $ED
  STA $F8
  STA ($F9),Y
  .byte $92
  SBC $0520,X
  .byte $42
  INC $0C,X
  .byte $5C
  BPL @E779
  AND $EE,X
  AND $20EF,Y
  ASL $42
  .byte $FC, $0C
  LSR $5F10,X
  AND $E8,X
  AND $20E9,Y
  .byte $07
  EOR ($EA,X)
  .byte $42
  INC $5544,X
  EOR $EB
  LSR $FF
  ORA ($00,X)
@E73A:
  ORA #$6B
  ADC #$08
  ASL $A3,X
  .byte $3F, $B7
  ROR A
  PHP
  PHP
  .byte $A3, $37, $B7, $62
  PHP
  ORA #$A3
  AND $68B7,X
  .byte $03
  PLA
@E751:
  .byte $97
  CMP $FC97,X
  .byte $97, $17
  TYA
  ROL $98
  .byte $3B
  TYA
  .byte $52
  TYA
  ADC #$98
  .byte $92
  TYA
  LDA #$98
  LDX $D598,Y
  TYA
@E768:
  PHP
  .byte $02, $14, $07
  CLC
  .byte $12
  BPL @E773
  BPL @E77E
  .byte $14
@E773:
  ORA $1818
  PHP
  .byte $04, $17
@E779:
  .byte $0F
  CLC
  NOP
  PHP
  .byte $02
@E77E:
  ORA ($40),Y
  ORA $41,X
  BRK
  .byte $03
  ORA ($42),Y
  PHP
  .byte $04
  ORA $8151,Y
  .byte $54
  PHP
  BRK
  ANC #$66
  ASL $0867
  ORA ($0F,X)
  ADC $7813
  BRK
  .byte $02, $0F, $6F
  CLC
  .byte $04
  ASL $1144
  EOR $15
  BVC @E768
  EOR $38,X
  ORA $0B
  .byte $43
  ASL $1146
  .byte $47, $12
  BVC @E7C6
  .byte $52
  ORA $8353,Y
  LSR $C3,X
  .byte $57
  BMI @E7C0
  ORA ($1D,X)
  ORA $48
  ANC #$49
@E7C0:
  .byte $0F
  JMP $4D12
  ASL $58,X
@E7C6:
  NOP
  EOR $0720,Y
  ADC #$61
  ORA ($1F,X)
  ORA $4A
  .byte $13, $4F, $17
  NOP
  BPL @E7DE
  ADC #$63
  ORA ($35,X)
  .byte $13
  ADC $01
  BRK
@E7DE:
  ORA ($80,X)
  BPL @E7F2
  .byte $02, $14
  ORA ($18),Y
  .byte $14, $80
  ORA $18,X
  .byte $03
  BPL @E7F9
  .byte $14, $13
  CLC
  ASL $80,X
@E7F2:
  .byte $17
  PHP
  .byte $04, $17
  ORA $1C18,Y
@E7F9:
  .byte $02, $7C, $97
  PHP
  .byte $03, $14, $22
  `;
}

// $9800-$9BFF (1024B): $9800-$9BFF 代码/数据段7
function build_9800_9BFF_seg7(): readonly number[] {
  return asm`
  CLC
  .byte $23
  PHP
  .byte $04, $17, $0F
  CLC
  NOP
  PHP
  .byte $02, $14
  JSR $2118
  PHP
  .byte $03
  BPL @E820
  .byte $80
  ROL $02
  .byte $7C, $97
  PHP
  .byte $03, $14
  AND #$18
  .byte $23
  PHP
  .byte $04, $17
@E820:
  ANC #$18
  NOP
  .byte $02
  PHP
  TYA
  BRK
  .byte $02, $14
  NOP
  BPL @E82F
  BPL @E866
  .byte $14
@E82F:
  BIT $2D18
  PHP
  .byte $04, $17
  ROL $2F18
  .byte $02, $7C, $97
  PHP
  .byte $02, $14, $1B
  CLC
  ASL $0310,X
  BPL @E869
  .byte $14
  AND $18
  BMI @E852
  .byte $04, $17, $27
  CLC
  .byte $32, $02, $7C, $97
@E852:
  PHP
  .byte $02, $14
  AND ($18),Y
  .byte $34
  BPL @E85D
  BPL @E897
  .byte $14
@E85D:
  .byte $33
  CLC
  ROL $08,X
  .byte $04, $17
  AND $3C18,Y
@E866:
  .byte $02, $7C, $97
@E869:
  BPL @E86D
  BPL @E8CB
@E86D:
  .byte $14, $5F
  CLC
  .byte $12
  BPL @E876
  BPL @E8E9
  .byte $14
@E876:
  BVS $E890
  ADC ($08),Y
  .byte $04, $17, $72
  CLC
  .byte $73
  PHP
  .byte $02
  ORA ($4B),Y
  ORA $4E,X
  BRK
  .byte $03
  ORA ($60),Y
  PHP
  .byte $04
  ORA $815C,Y
  EOR $8C02,X
  .byte $97
  PHP
  .byte $02, $14, $5B
  CLC
@E897:
  ROR $10,X
  .byte $03
  BPL @E900
  .byte $14
  ORA $7518
  PHP
  .byte $04, $17, $0F
  CLC
  .byte $77, $02, $7C, $97
  BRK
  .byte $02, $14
  NOP
  BPL @E8B2
  BPL @E8E9
  .byte $14
@E8B2:
  BIT $3E18
  PHP
  .byte $04, $17
  AND $3C18,Y
  .byte $02, $7C, $97
  PHP
  .byte $02, $14, $1B
  CLC
  ASL $0310,X
  BPL @E8EC
  .byte $14
  AND $18
@E8CB:
  BMI @E8D5
  .byte $04, $17, $0F
  CLC
  .byte $32, $02, $7C, $97
@E8D5:
  PHP
  .byte $03, $14, $22
  CLC
  PLP
  PHP
  .byte $04, $17, $0F
  CLC
  ROL A
  .byte $02
  PHP
  TYA
  BRK
  ORA #$6B
  ADC #$08
@E8E9:
  ASL $A3,X
  .byte $3F
@E8EC:
  .byte $B7
  ROR A
  PHP
  ORA #$9F
  ADC $6C6B,X
  CLC
  ASL $9F,X
  LDX $BFA3,Y
  .byte $B7
  ARR #$6B
  ROR $4302
@E900:
  .byte $97
  BRK
  ORA #$6B
  ADC #$08
  ASL $A3,X
  .byte $3F, $B7
  ROR A
  PHP
  ORA #$9F
  .byte $7C
  ARR #$79
  CLC
  ASL $9F,X
  ROR $7FA3,X
  .byte $B7
  NOP
  ARR #$7B
  .byte $02, $43, $97, $03
  ANC #$99
  EOR $4C99,Y
  STA $992B,Y
  ANC #$99
  EOR $0899,Y
  ORA $06
  BVC @E939
  EOR ($00),Y
  ASL $06
  .byte $52
  PHP
  ORA $0D
  .byte $54
@E939:
  ASL A
  .byte $02
  PHP
  ASL $0A
  .byte $53
  ASL $1056
  .byte $07
  ASL $58
  ASL A
  EOR $5C0E,Y
  .byte $02, $73
  STA $0508,Y
  ASL $57
  ORA #$55
  BRK
  ASL $06
  EOR $3502,X
  STA $0518,Y
  ASL $63
  ORA #$66
  ASL A
  .byte $02
  ORA $1067
  ASL $06
  .byte $52
  ASL A
  .byte $53
  ASL $1056
  .byte $07
  ASL $58
  ASL A
  EOR $5C0E,Y
  .byte $03, $80
  STA $99C5,Y
  ASL $5B9A
  TXS
  LDY #$9A
  .byte $E7
  TXS
  BPL @E985
  ASL $0F,X
  NOP
@E985:
  NOP
  .byte $83, $1B
  BRK
  .byte $04
  ASL $25,X
  PHP
  ORA $11
  ROL $12
  ROL A
  BRK
  ASL $12
  BIT $0010
  .byte $12, $04
  ASL $05,X
  .byte $1B
  BPL @E9AF
  ORA ($0E,X)
  .byte $03, $12
  ASL $16
  .byte $07
  CLC
  .byte $02
  ANC #$08
  .byte $0F
  ORA #$0E
  .byte $02, $12
@E9AF:
  .byte $0C
  CLC
  .byte $03, $07, $22
  ANC #$0A
  .byte $0F
  ANC #$11
  ASL $0418
  ASL $28
  ANC #$20
  .byte $0F
  AND ($11,X)
  BIT $01
  BPL @E9CA
  ASL $0F,X
  NOP
@E9CA:
  NOP
  .byte $83, $1B
  BRK
  .byte $04
  ASL $25,X
  PHP
  ORA $11
  CLC
  .byte $12
  ROL A
  BRK
  ASL $12
  BIT $0010
  .byte $12, $04
  ASL $05,X
  .byte $1B
  BPL @E9F4
  ORA ($0E,X)
  .byte $03, $12
  ASL $16
  .byte $07
  CLC
  .byte $02
  PHP
  ORA ($0C),Y
  .byte $14
  ASL $1202
@E9F4:
  .byte $0C
  JSR $0403
  .byte $12
  PHP
  .byte $13, $0C
  ASL $0F,X
  .byte $02
  ORA ($0E),Y
  JSR $0604
  PLP
  PHP
  ORA $020A,Y
  .byte $0F, $1C
  ORA ($0D),Y
  ORA ($18,X)
  .byte $03, $17, $33
  ASL $1E,X
  .byte $1B
  ROL $83,X
  .byte $1B
  PHP
  .byte $04, $17
  AND $2F16,Y
  PHP
  ORA $11
  ROL $12
  ROL A
  BRK
  ASL $12
  BIT $0010
  .byte $13, $1F, $17, $27, $1B
  BPL @EA51
  ORA ($04,X)
  BMI $EA3D
  AND ($0E),Y
  .byte $34, $12
  AND $17,X
  AND $0218
  .byte $04, $32
  PHP
  ORA ($0C,X)
  ORA ($12,X)
  .byte $37
  CLC
  .byte $03, $04
  SEC
  PHP
  .byte $3C, $0C, $3C
  ORA ($3D),Y
  CLC
@EA51:
  .byte $04
  ASL $3A
  ANC #$3B
  .byte $0F
  ROL $3F11,X
  ORA ($10,X)
  .byte $03
  ASL $0F,X
  NOP
  NOP
  .byte $83, $1B
  BRK
  .byte $04
  ASL $25,X
  PHP
  ORA $11
  ROL $12
  ROL A
  BRK
  ASL $12
  BIT $0010
  .byte $12, $04
  ASL $05,X
  .byte $1B
  BPL @EA8A
  ORA ($0E,X)
  .byte $03, $12
  ASL $16
  .byte $07
  CLC
  .byte $02
  PHP
  ORA ($0C),Y
  .byte $14
  ASL $1202
@EA8A:
  .byte $0C
  CLC
  .byte $03, $04
  ORA $08,X
  AND #$0C
  .byte $23
  ORA ($0E),Y
  CLC
  .byte $04, $04, $44
  PHP
  ANC #$0F
  ROL $2411
  ORA ($10,X)
  .byte $03
  ASL $0F,X
  NOP
  NOP
  .byte $83, $1B
  BRK
  .byte $04
  ASL $25,X
  PHP
  ORA $11
  ROL $12
  ROL A
  BRK
  ASL $12
  BIT $0010
  .byte $12, $04
  ASL $05,X
  .byte $1B
  BPL @EACF
  ORA ($0E,X)
  .byte $03, $12
  ASL $16
  .byte $07
  CLC
  .byte $02
  PHP
  ORA ($0C),Y
  .byte $14
  ASL $1202
@EACF:
  .byte $0C
  CLC
  .byte $03, $04
  ORA $08,X
  AND #$0C
  EOR $11
  ASL $0420
  .byte $04, $17
  ASL $1D
  PHP
  LSR $0F
  ROL $2411,X
  ORA ($10,X)
  .byte $03
  ASL $0F,X
  NOP
  NOP
  .byte $83, $1B
  BRK
  .byte $04
  ASL $25,X
  PHP
  ORA $11
  CLC
  .byte $12
  ROL A
  BRK
  ASL $12
  BIT $0010
  .byte $12, $04
  ASL $05,X
  .byte $1B
  BPL @EB16
  ORA ($0E,X)
  .byte $03, $12
  ASL $16
  .byte $07
  CLC
  .byte $02
  PHP
  ORA ($0C),Y
  .byte $14
  ASL $1202
@EB16:
  .byte $0C
  CLC
  .byte $03, $04
  ORA $08,X
  RTI
  .byte $0C
  EOR ($11,X)
  .byte $47
  CLC
  .byte $04
  ASL $28
  ASL A
  .byte $42, $0F, $43
  ORA ($0D),Y
  ORA ($03,X)
  AND $689B,Y
  .byte $9B
  AND $399B,Y
  .byte $9B
  AND $689B,Y
  .byte $9B
  BPL @EB42
  .byte $03
  ADC $07,X
  .byte $72, $0F
  ROR $08,X
@EB42:
  PHP
  .byte $07
  SEI
  .byte $0F, $7C
  CLC
  ORA $06
  NOP
  ORA #$5B
  ASL A
  .byte $02
  ORA $205E
  ASL $03
  .byte $5F
@EB55:
  .byte $07
  BVS @EB63
  ADC ($0F),Y
  .byte $74
  ASL $0077
  .byte $07
  ANC #$73
  BRK
  PHP
@EB63:
  ANC #$79
  .byte $02, $73
  STA $0710,Y
  .byte $07
  LDY #$0B
  LDA ($0F,X)
  LDY $18
  ORA $06
  .byte $63
  ORA #$89
  ASL A
  .byte $02
  ORA $208C
  ASL $07
  TXA
  ASL $88
  ANC #$8B
  .byte $0F
  STX $020E
  .byte $02, $73
  STA $9603,Y
  .byte $9B
  LDA #$9B
  STX $9B,Y
  STX $9B,Y
  STX $9B,Y
  LDA #$9B
  BPL @EB9F
  .byte $03
  PLA
  .byte $07
  ADC #$0F
  ROR $10,X
@EB9F:
  PHP
  .byte $03
  ROR A
  .byte $07
  ARR #$0F
  .byte $7C, $02, $47, $9B
  BPL @EBB2
  .byte $07
  LDX #$0B
  .byte $A3, $0F
  LDY $08
@EBB2:
  PHP
  .byte $07
  ADC $0B,X
  LDA #$02
  BVS @EB55
  .byte $03, $C7, $9B
  NOP
  .byte $9B, $C7, $9B, $C7, $9B, $C7, $9B
  NOP
  .byte $9B
  BPL @EBD0
  .byte $03
  JMP ($6D07)
  .byte $0F
  ROR $10,X
@EBD0:
  PHP
  .byte $03
  ROR $6F07
  .byte $0F, $7C, $02, $47, $9B
  BPL @EBE3
  .byte $07
  LDX $0B
  .byte $A7, $0F
  LDY $08
@EBE3:
  PHP
  .byte $07
  ADC $0B,X
  LDA $7002
  .byte $9B, $03
  SED
  .byte $9B
  ORA $F89C
  .byte $9B
  SED
  .byte $9B
  SED
  .byte $9B
  ORA $189C
  .byte $07, $03
  ADC $07,X
  .byte $72, $0F
  .byte $84
  `;
}

// $9C00-$9FFF (1024B): $9C00-$9FFF 代码/数据段8
function build_9C00_9FFF_seg8(): readonly number[] {
  return asm`
  .byte $13
  STA $10
  PHP
  .byte $07
  SEI
  .byte $0F
  STX $13
  .byte $87, $02, $47, $9B
  CLC
  .byte $07, $07
  LDY #$0B
  LDA ($0F,X)
  ADC $7E13,X
  BRK
  PHP
  .byte $0F, $7F, $02
  .byte $70, $9B  ; BVS $9BB9
  .byte $03
  ANC #$9C
  RTI
  .byte $9C
  ANC #$9C
  ANC #$9C
  ANC #$9C
  RTI
  .byte $9C
  CLC
  .byte $07, $03
  ADC $07,X
  .byte $72, $0F, $80, $13
  STA ($10,X)
  PHP
  .byte $07
  SEI
  .byte $0F, $82, $13, $83, $02, $47, $9B
  CLC
  .byte $07, $07
  LDY #$0B
  LDA ($0F,X)
  NOP
  .byte $13, $7B
  BRK
  PHP
  .byte $0F
  TAY
  .byte $02
  .byte $70, $9B  ; BVS $9BEC
  .byte $03
  LSR $779C,X
  .byte $9C
  LSR $5E9C,X
  .byte $9C
  LSR $779C,X
  .byte $9C
  BPL @EC78
  .byte $43
  PHA
  .byte $47
  EOR #$87
  SBC $1910,X
  .byte $43
  LSR A
  .byte $47
  ALR #$87
  .byte $FF
  BPL @EC8A
  .byte $43
  RTS
  .byte $47
  ADC ($87,X)
  INC $0801,X
@EC78:
  CLC
  .byte $43
  JMP $4D47
  BPL @EC98
  .byte $43
  LSR $4F47
  .byte $87, $62
  PHP
  NOP
  .byte $43, $64, $47
@EC8A:
  ADC $01
  .byte $03
  STA $B49C,Y
  .byte $9C
  STA $999C,Y
  .byte $9C
  STA $B49C,Y
@EC98:
  .byte $9C
  PHP
  ORA $09
  STA ($0D),Y
  STY $08,X
  ORA $06
  BCC @ECAE
  .byte $02
  BPL $ECAD
  ASL $92
  ASL A
  .byte $93
  ASL $0096
@ECAE:
  .byte $07
  ASL $98
  .byte $02, $73
  STA $0508,Y
  ORA #$95
  ORA $0297
  .byte $9F, $9C, $03
  DEX
  .byte $9C
  SBC #$9C
  DEX
  .byte $9C
@ECC4:
  DEX
  .byte $9C
  DEX
  .byte $9C
  SBC #$9C
  PHP
  .byte $07, $07
  LDA ($0F),Y
  LDA $18,X
  ORA $06
  STA $9C0B,Y
  .byte $0F
  STA $020D,X
  BPL @ECE2
  .byte $07, $9B
  ANC #$4B
  .byte $0F, $9F
@ECE2:
  BRK
  .byte $07
  ANC #$B4
  .byte $02, $73
  STA $0710,Y
  .byte $07, $BB
  ANC #$BE
  .byte $0F, $BF
@ECF1:
  PLP
  ORA $06
  .byte $B3
  ANC #$B6
  ORA #$C2
  ASL A
  .byte $02, $0F, $B7
  ORA $18C3
  ASL $06
  LDA $BC0B,Y
  .byte $0F
  LDA $BA0E,X
  .byte $02, $73
  STA $1903,Y
  STA $9D28,X
  ORA $199D,Y
  STA $9D19,X
  PLP
  STA $0600,X
  .byte $03
  STA $0710
  .byte $03, $8F, $07
  TXS
  .byte $0F
  LDA $02,X
  BNE @ECC4
  CLC
  .byte $07, $03
  CPY $07
  CMP $0B
  LDX $BF0F,Y
  BRK
  PHP
  .byte $07, $C7, $02
  SBC ($9C),Y
  .byte $03
  LSR $9D
  EOR $9D,X
  LSR $9D
  LSR $9D
  LSR $9D
  EOR $9D,X
  BRK
  ASL $03
@ED49:
  LDY $0710
  .byte $03
  LDX $AF07
  .byte $0F
  LDA $02,X
  BNE @ECF1
  CLC
  .byte $07, $03
  CPY $CD07
  ANC #$BE
  .byte $0F, $BF
  BRK
  PHP
  .byte $07
  DEC $02
  SBC ($9C),Y
  .byte $03, $73
  STA $9D82,X
  .byte $73
  STA $9D73,X
  .byte $73
  STA $9D82,X
  PHP
  .byte $07, $07
  LDA ($0F),Y
  BCS @ED82
  PHP
  ANC #$A5
  .byte $0F, $B2, $02
  BNE $ED1E
@ED82:
  BPL @ED8B
  .byte $07, $BB
  ANC #$C8
  .byte $0F
  CMP #$00
@ED8B:
  PHP
  .byte $0F
  AXS #$02
  SBC ($9C),Y
  .byte $03, $9E
  STA $9DAD,X
  .byte $9E
  STA $9D9E,X
  .byte $9E
  STA $9DAD,X
  PHP
  .byte $07, $07
  LDA ($0F),Y
  CLV
@EDA4:
  PHP
  PHP
  ANC #$AA
  .byte $0F, $AB, $02
  BNE @ED49
  BPL @EDB6
  .byte $07, $BB
  ANC #$CE
  .byte $0F, $9E
  BRK
@EDB6:
  PHP
  .byte $0F
  DEX
  .byte $02
  SBC ($9C),Y
  JSR $1B00
  JSR $2183
  .byte $C3, $0F, $C2
  BIT $C6
  AND $28
  ORA ($17,X)
  JSR $221B
  .byte $83, $23, $C3
  ROL $C7
  .byte $32
  DEC $27
  JSR $1302
  JSR $2217
  .byte $1B, $23, $83
  BMI @EDA4
  AND ($28),Y
  .byte $03
  ANC #$28
  .byte $0F
  AND #$13
  BIT $2D17
  .byte $1B
  SEC
  .byte $83
  AND $0418,Y
  ANC #$10
  .byte $0F
  ORA ($13),Y
  .byte $14, $17
  ORA $20,X
  ORA $0B
  .byte $12, $0F
  ORA $83,X
  .byte $13, $C3
  ASL $C7,X
  .byte $17
  SEC
  ASL $0B
  CLC
  .byte $0F
  ORA $1C13,Y
  .byte $17
  ORA $1A1B,X
  .byte $83, $23, $C3, $23, $C7, $1B
  SEC
  .byte $07
  ANC #$2A
  .byte $0F
  ANC #$13
  ROL $2F17
  .byte $1B
  NOP
  .byte $83, $3B, $C3
  ASL $1FC7,X
  BMI @EE34
  ANC #$34
  .byte $0F
  AND $13,X
  ORA $1B,X
  .byte $33
@EE34:
  .byte $83
  ROL $C3,X
  .byte $37, $C7, $3C
  ORA ($03,X)
  .byte $54, $9E, $C3, $9E, $54, $9E, $54, $9E, $54, $9E, $54, $9E, $54, $9E, $D4, $9E, $54, $9E, $54, $9E, $54, $9E, $54, $9E
  BRK
  .byte $04
  ORA #$22
  PHP
  ORA $09
  PLP
  ORA $1029
  ASL $09
  ROL A
  .byte $0C, $23
  ORA $102B
  ASL $02B5,X
  ORA $04
  ANC #$05
  JSR $B700 ; → bank switch?
  PHP
  ADC #$03
  ORA ($06,X)
  ORA #$07
  ORA $2812
  ORA ($69,X)
  ORA #$01
  .byte $0C
  ORA $0D
  ASL A
  ASL A
  ASL $100B
  ASL $0220
  ORA ($20,X)
  ORA $21
  ASL A
  BIT $0E
  AND $12
  BMI @EEC5
  .byte $03, $04, $0F
  ASL A
  NOP
  ASL $0D1B
  CLC
  .byte $12
  ASL $1911,X
  .byte $14, $1F
  PHP
  .byte $04
  ORA $111C
  ORA $0500,X
  ORA ($15),Y
  PHP
  ASL $04
  AND ($11),Y
  .byte $17
  BPL @EEBD
  BRK
  .byte $14, $04
  BPL @EEC3
  ORA ($08),Y
@EEBD:
  PHP
  BRK
  .byte $13, $04
  ASL $01,X
@EEC3:
  PHP
  .byte $04
@EEC5:
  PHP
  ROL $09
  .byte $27
  BPL $EED0
  PHP
  BIT $2D09
  ORA $0229
  LSR $009E,X
  .byte $04
  ORA #$22
  PHP
  ORA $09
  ROL $2F0D
  BPL $EEE6
  PHP
  .byte $32, $0C, $23
  ORA $0233
  ROR $9E
  .byte $03, $02, $9F
  ORA $9F,X
  .byte $02, $9F, $02, $9F
  ROL A
  .byte $9F
  ROL A
  .byte $9F
  ROL A
  .byte $9F
  AND $2A9F,X
  .byte $9F
  ROL A
  .byte $9F
  ROL A
  .byte $9F
  ROL A
  .byte $9F
  CLC
  ORA $10
  .byte $42
  ORA $49,X
  .byte $14
  LSR $19
  JMP $0608
  .byte $14, $44
  ORA $0245,Y
  EOR $189F
  ORA $10
  .byte $63
  ORA $66,X
  .byte $14
  CLC
  ORA $104C,Y
  ASL $10
  ADC #$14
  JMP ($4519)
  .byte $02
  EOR $189F
  ORA $10
  .byte $42
  ORA $6B,X
  .byte $14
  ROR A
  ORA $084C,Y
  ASL $14
  ROR $4519
  .byte $02
  EOR $189F
  ORA $10
  .byte $42
  ORA $4E,X
  .byte $14
  LSR $19
  .byte $47
  PHP
  ASL $14
  .byte $64
  CLC
  EOR $1800
  ARR #$38
  PLP
  .byte $02, $03, $34
  ORA $36
  ORA #$37
  ORA $1162
  .byte $4F
  ORA $65,X
  BMI $EF64
  .byte $03
  AND $3C05,Y
  ORA #$3D
  ASL $1168
  AND $15,X
  RTS
  CLC
  ADC ($30,X)
  .byte $04, $0F
  NOP
  .byte $12, $43, $12, $3B
  ORA ($18),Y
  ASL $48,X
  ORA $3E,X
  ORA $083F,Y
  .byte $07
  CLC
  LSR A
  .byte $80
  ALR #$01
  BRK
  .byte $04
  ASL $FD,X
  PHP
  ORA $12
  SBC $FC16,Y
  JSR $0A06
  .byte $53
  ASL $1256
  .byte $FB
  ASL $FE,X
  .byte $1B, $FF
  BPL @EFA5
  ASL $58
  ASL A
  EOR $5C0E,Y
  .byte $03
@EFA5:
  LDA ($9F),Y
  CPY $9F
  .byte $D7, $9F
  NOP
  .byte $9F
  SBC $109F,X
  LDY #$20
  ORA $06
  BVC $EFBF
  EOR ($0A),Y
  .byte $02
  ORA $1154
  ROL $00
  ASL $06
  .byte $52, $02
  STX $99,Y
  JSR $0605
  .byte $63
  ORA #$66
  ASL A
  .byte $02
  ORA $1167
  CLC
  BRK
  ASL $06
  .byte $52, $02, $DB
  STA $0520,Y
  ASL $57
  ORA #$55
  ASL A
  .byte $02
  ORA $1154
  ROL $00
  ASL $06
  EOR $2802,X
  TXS
  JSR $0605
  BVC $EFF8
  EOR ($0A),Y
  .byte $02
  ORA $1154
  ROL $00
  ASL $06
  .byte $52, $02
  ADC ($9A),Y
  JSR $0605
  `;
}

// ═══════════════════════════════════════════════════
// Assemble all sections into full 8KB bank
// ═══════════════════════════════════════════════════
const _PRG_BANK_22: readonly number[] = [
  ...build_8000_83FF_seg1(),
  ...build_8400_87FF_seg2(),
  ...build_8800_8BFF_seg3(),
  ...build_8C00_8FFF_seg4(),
  ...build_9000_93FF_seg5(),
  ...build_9400_97FF_seg6(),
  ...build_9800_9BFF_seg7(),
  ...build_9C00_9FFF_seg8(),
];
