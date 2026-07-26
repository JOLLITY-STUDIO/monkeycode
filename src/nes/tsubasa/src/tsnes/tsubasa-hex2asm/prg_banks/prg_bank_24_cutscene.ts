/**
 * PRG-ROM MMC3 bank 24 (8KB) — function-based assembly
 * Mapper: 4 (MMC3) | CPU: $8000-$9FFF
 * CDL: code=2774 data=4686 unaccessed=732
 *
 * 功能: 比赛场景/过场控制
 *
 * Pattern: 参考 bank_31.ts
 *   每个 build_xxx() 函数返回其覆盖地址范围的 raw 6502 字节，
 *   最后通过 spread 拼成完整的 8KB 数组
 */


import { asm } from '../_6502asm';
export { _PRG_BANK_24 as default };

console.log('[prg_24_cutscene] loaded');

// $8000-$83FF (1024B): $8000-$83FF 代码/数据段1
function build_8000_83FF_seg1(): readonly number[] {
  return asm`
  JMP $800F
  JMP $86F8
  JMP $8779
  JMP $87E6
  JMP $8851
  BIT $063F
  BPL $E017
  JMP $C512
@E017:
  LDA #$20
  STA $5F
  LDA #$92
  STA $60
  LDA $05EA
  ASL A
  BCC $E027
  INC $60
@E027:
  TAY
  LDA ($5F),Y
  TAX
  INY
  LDA ($5F),Y
  STA $60
  STX $5F
  LDA #$00
  STA $05E9
  STA $05E5
  STA $05E4
  STA $05F4
  LDA #$01
  STA $05E3
  LDA #$01
  JSR $C515 ; → bank switch?
  JSR $8053 ; → bank switch?
  JSR $C560 ; → bank switch?
  JMP $8045
  LDA $05E3
  BNE $E059
  RTS
@E059:
  LDA $05E9
  BEQ $E062
  DEC $05E9
  RTS
@E062:
  LDA $05E4
  JSR $C509 ; → bank switch?
  ROR $1880
  .byte $82, $F2, $82
  LDY $05E5
  INC $05E5
  LDA ($5F),Y
  CMP #$F0
  BCC $E080
  JSR $8087 ; → bank switch?
  JMP $806E
@E080:
  STA $05E9
  INC $05E4
  RTS
  AND #$0F
  JSR $C509 ; → bank switch?
  TYA
  .byte $80
  LDY #$80
  LDA $80,X
  CLV
  .byte $80
  AXS #$80
  SBC $A981,X
  BRK
  STA $05E3
  PLA
  PLA
  RTS
@E0A0:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $001C
  BPL $E0A0
  LDA #$00
  STA $05E9
  INC $05E4
  PLA
  PLA
  RTS
  JMP $C52D
  LDY $05E5
  LDA ($5F),Y
  TAX
  INY
  LDA ($5F),Y
  STA $60
  STX $5F
  LDA #$00
  STA $05E5
  RTS
  LDY $05E5
  LDA ($5F),Y
  JSR $80EA ; → bank switch?
  TXA
  ASL A
  SEC
  ADC $05E5
  TAY
  LDA ($5F),Y
  TAX
  INY
  LDA ($5F),Y
  STX $5F
  STA $60
  LDA #$00
  STA $05E5
  RTS
  JSR $C509 ; → bank switch?
  SBC $0680,X
  STA ($0E,X)
  STA ($1E,X)
  STA ($22,X)
  STA ($38,X)
  STA ($CE,X)
  STA ($E4,X)
  STA ($A2,X)
  BRK
  BIT $043C
  BPL $E105
  INX
@E105:
  RTS
  LDX $05FB
  BEQ $E10D
  LDX #$01
@E10D:
  RTS
  LDX $0600
  BEQ $E11B
  DEX
  CPX #$03
  BCC $E11A
  LDX #$02
@E11A:
  RTS
@E11B:
  LDX #$03
  RTS
  LDX $0629
  RTS
  LDX #$00
  LDA $26
@E126:
  CMP $8131,X
  BCC $E130
  BEQ $E130
  INX
  BNE $E126
@E130:
  RTS
  ORA $0B
  .byte $0F
  ORA $16,X
  NOP
  AND ($A5,X)
  .byte $27
  JSR $C509 ; → bank switch?
  .byte $47
  STA ($56,X)
  STA ($47,X)
  STA ($56,X)
  STA ($56,X)
  STA ($A2,X)
  .byte $02
  LDA $0028
  CMP $0029
  BEQ $E155
  DEX
  BCC $E155
  DEX
@E155:
  RTS
  LDY $26
  LDA $81AC,Y
  STA $49
  LDA $0028
  CMP $0029
  BNE $E18B
  LDX #$0D
  LDA $0027
  CMP #$01
  BEQ $E17E
  BIT $49
  BVC $E174
  INX
  RTS
@E174:
  LDA $002B
  CMP #$23
  BNE $E17D
  LDX #$0F
@E17D:
  RTS
@E17E:
  LDX #$0C
  BIT $49
  BMI $E18A
  INX
  BIT $49
  BVC $E18A
  INX
@E18A:
  RTS
@E18B:
  BCS $E197
  LDX #$0A
  LDA $27
  CMP #$04
  BNE $E196
  INX
@E196:
  RTS
@E197:
  LDA $49
  AND #$07
  CLC
  ADC #$03
  TAX
  CPX #$03
  BNE $E1AB
  LDA $27
  CMP #$03
  BNE $E1AB
  LDX #$09
@E1AB:
  RTS
  CPY #$C0
  CPY #$C0
  CMP ($C2,X)
  RTI
  RTI
  RTI
  RTI
  EOR ($C2,X)
  CPY #$C0
  CMP ($C3,X)
  CPY #$C0
  CPY #$C0
  CMP ($C2,X)
  BRK
  CPY #$C0
  CPY #$C0
  CPY #$C0
  CPY #$C4
  CMP $86
  DEC $AD
  ASL $06,X
  LSR A
  LDX #$00
  CMP #$01
  BCC $E1E3
  INX
  CMP #$05
  BCC $E1E3
  INX
  CMP #$06
  BCC $E1E3
  INX
@E1E3:
  RTS
  LDA $05FB
  EOR #$0B
  JSR $C50C ; → bank switch?
  LDX #$00
  LDY #$07
  LDA ($34),Y
  CMP #$19
  BCC $E1FC
  INX
  CMP #$36
  BCC $E1FC
  INX
@E1FC:
  RTS
  JSR $C52D ; → bank switch?
  LDA #$0D
  STA $05F3
  LDA #$80
  STA $05F4
  LDY $05E5
  LDA ($5F),Y
  STA $05E9
  INC $05E5
  PLA
  PLA
  RTS
  LDY $05E5
  LDA ($5F),Y
  CMP #$90
  BCS $E22E
  AND #$0F
  STA $05F3
  LDA #$80
  STA $05F4
  JMP $8234
@E22E:
  JSR $C52D ; → bank switch?
  LDY $05E5
  LDA ($5F),Y
  LSR A
  LSR A
  LSR A
  LSR A
  TAX
  LDA $86B8,X
  STA $05E6
  TXA
  ASL A
  PHA
  TAX
  LDA $8DC2,X
  STA $61
  LDA $8DC3,X
  STA $62
  LDY #$00
  LDA ($61),Y
  PHA
  INY
  LDA ($61),Y
  PHA
  INY
  LDA ($61),Y
  STA $05E7
  INY
  LDA #$06
  STA $05E8
@E264:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $0515
  BNE $E264
  LDA #$01
  STA $0515
  LDA #$02
  STA $3B
  LDX #$00
@E279:
  LDA $05E7
  STA $04A5,X
  PLA
  STA $04A7,X
  PLA
  STA $04A6,X
  CLC
  ADC #$20
  PHA
  LDA $04A7,X
  ADC #$00
  PHA
  INX
  INX
  INX
@E294:
  LDA ($61),Y
  BPL $E2A9
  AND #$7F
  STA $3A
  INY
  LDA #$00
@E29F:
  STA $04A5,X
  INX
  DEC $3A
  BNE $E29F
  BEQ $E2B7
@E2A9:
  STA $3A
  INY
@E2AC:
  LDA ($61),Y
  STA $04A5,X
  INY
  INX
  DEC $3A
  BNE $E2AC
@E2B7:
  TXA
  SEC
  SBC #$03
  CMP $04A5
  BEQ $E279
  BCC $E294
  SBC $04A5
  SBC #$03
  CMP $04A5
  BCC $E294
  LDA #$00
  STA $04A5,X
  LDA #$80
  STA $0515
  DEC $05E8
  BNE $E264
  PLA
  PLA
  PLA
  TAX
  LDA $86C8,X
  STA $05E7
  LDA $86C9,X
  STA $05E8
  INC $05E5
  INC $05E4
  RTS
@E2F2:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $0515
  BNE $E2F2
  LDA #$01
  STA $0515
  LDA $05E6
  ASL A
  CLC
  ADC #$06
  TAY
  INY
  LDX #$00
  TXA
@E30D:
  STA $04A5,X
  INX
  DEY
  BPL $E30D
  LDA $05E6
  CLC
  ADC #$03
  STA $3A
  TAX
  LDA $05E6
  STA $04A5
  STA $04A5,X
  LDA $05E7
  ASL A
  TAY
  LDA $86E8,Y
  STA $04A6
  CLC
  ADC #$20
  STA $04A6,X
  LDA $86E9,Y
  STA $04A7
  ADC #$00
  STA $04A7,X
  LDA #$00
  STA $3B
  LDY $05E5
  INC $05E5
  LDA ($5F),Y
  CMP #$E0
  BCC $E358
  JSR $835E ; → bank switch?
  JMP $8346
@E358:
  JSR $8629 ; → bank switch?
  JMP $8346
  SEC
  SBC #$E0
  JSR $C509 ; → bank switch?
  LDY $83
  DEX
  .byte $83, $E2, $83, $43
  STY $67
  STY $6D
  STY $75
  STY $8D
  STY $93
  STY $99
  STY $9F
  STY $A5
  STY $AB
  STY $CE
  STY $D6
  STY $DC
  STY $DC
  STY $E6
  STY $EC
  STY $FB
  STY $07
  STA $B1
  STA $B6
  STA $BB
  STA $D0
  STA $D5
  STA $D5
  STA $D5
  STA $D6
  STA $FD
  STA $FE
  STA $21
  STX $AD
  .byte $3B, $04
  CMP #$01
  BNE $E3B2
  BIT $0628
  BPL $E3B2
  LDA #$0A
@E3B2:
  TAX
  LDA $043C
  AND #$7F
  CLC
  ADC $83BF,X
  JMP $863C
  TXS
  CPY $BD
  INY
  CMP $DBDA,Y
  CPX $ECEC
  SBC #$AD
  AND $2904,X
  .byte $1F
  TAX
  LDA $043E
  AND #$7F
  CLC
  ADC $83DC,X
  JMP $863C
  CMP $D7D1
  .byte $DB
  CMP $ADDF,X
  .byte $3C, $04
  .byte $10, $2C  ; BPL $8413
  AND #$7F
  BEQ $E3FB
  LDX $043B
  BNE $E3FB
  CMP #$03
  .byte $B0, $1F  ; BCS $8413
  TAX
  LDA $8440,X
  JMP $8410
@E3FB:
  LDX $043B
  CPX #$01
  `;
}

// $8400-$87FF (1024B): $8400-$87FF 代码/数据段2
function build_8400_87FF_seg2(): readonly number[] {
  return asm`
  BNE $E409
  BIT $0628
  BPL $E409
  LDX #$0A
@E409:
  LDA $8435,X
  CMP #$FF
  BEQ $E413
  JSR $863C ; → bank switch?
@E413:
  LDA $043B
  CMP #$01
  BNE $E421
  BIT $0628
  BPL $E421
  LDA #$0A
@E421:
  TAX
  PHP
  LDA $83BF,X
  PLP
  BNE $E432
  LDA $043C
  AND #$03
  CLC
  ADC $83BF,X
@E432:
  JMP $863C
  INX
  INC $FF
  INC $E9
  SBC #$E7
  BRK
  BRK
  BRK
  SBC #$E8
  NOP
  INX
  BIT $043E
  BPL $E455
  LDX $043D
  LDA $8461,X
  CMP #$FF
  BEQ $E455
  JSR $863C ; → bank switch?
@E455:
  LDA $043D
  AND #$3F
  TAX
  LDA $83DC,X
  JMP $863C
  INC $E6
  .byte $FF, $E7, $FF, $FF
  LDA $0441
  JMP $8653
  LDA $05FB
  EOR #$0B
  JMP $8478
  LDA $05FB
  LDY $002A
  TAX
  BEQ $E486
  LDY $002B
  CPY #$24
  BNE $E486
  DEY
@E486:
  TYA
  CLC
  ADC #$76
  JMP $863C
  LDA $0600
  JMP $86B2
  LDA $0601
  JMP $8653
  LDA $0602
  JMP $8653
  LDA $0603
  JMP $8653
  LDA $05FC
  JMP $8653
  LDX $043D
  LDA $84C7,X
  BEQ $E4C6
  BIT $043E
  BPL $E4BD
  LDA #$E6
  JSR $863C ; → bank switch?
@E4BD:
  LDX $043D
  LDA $84C7,X
  JMP $863C
@E4C6:
  RTS
  CPX #$E4
  BRK
  BRK
  BRK
  CPX #$E0
  LDA $05FB
  EOR #$0B
  JMP $8653
  LDA $0442
  JMP $8653
  LDA $0616
  LSR A
  CLC
  ADC #$34
  JMP $8629
  LDA $002A
  JMP $84EF
  LDA $002B
  CMP #$24
  BNE $E4F5
  LDA #$23
@E4F5:
  CLC
  ADC #$76
  JMP $863C
  LDA $0441
  JSR $8513 ; → bank switch?
  LDA $0442
  JMP $8534
  LDA $0442
  JSR $8513 ; → bank switch?
  LDA $0441
  JMP $8534
  JSR $C50C ; → bank switch?
  LDY #$00
  LDA ($34),Y
  LDX #$00
@E51C:
  CMP $852C,X
  BEQ $E528
  INX
  CPX #$08
  BNE $E51C
  CLC
  RTS
@E528:
  STX $3D
  SEC
  RTS
  ORA ($11,X)
  .byte $44, $34
  EOR $15
  .byte $42
  SEC
  PHP
  JSR $C50C ; → bank switch?
  PLP
  BCC $E572
  LDA $3D
  ASL A
  TAX
  LDA $8589,X
  STA $3E
  LDA $858A,X
  STA $3F
  LDY #$00
  LDA ($34),Y
  TAX
  LDY #$00
@E550:
  LDA ($3E),Y
  BEQ $E572
  TXA
  CMP ($3E),Y
  BEQ $E55C
  INY
  BNE $E550
@E55C:
  TXA
  JSR $863C ; → bank switch?
  LDA $3D
  ASL A
  TAX
  LDA $857A,X
  PHA
  LDA $8579,X
  JSR $8629 ; → bank switch?
  PLA
  JMP $8629
@E572:
  LDY #$00
  LDA ($34),Y
  JMP $863C
  PHP
  ROL $2E08
  PHP
  ROL $2E08
  PHP
  ROL $2E0B
  ANC #$2E
  ANC #$2E
  STA $9F85,Y
  STA $9F
  STA $A2
  STA $A2
  STA $A5
  STA $A5
  STA $AE
  STA $44
  EOR ($45,X)
  ALR #$49
  BRK
  ORA ($34,X)
  BRK
  ORA ($11,X)
  BRK
  ORA ($36,X)
  .byte $34
  AND $32,X
  ROL $3130
  BRK
  ORA ($15),Y
  BRK
  LDA #$ED
  JMP $863C
  LDA #$EE
  JMP $863C
  LDY $05E5
  INC $05E5
  LDA ($5F),Y
@E5C3:
  PHA
  LDA #$7C
  JSR $8629 ; → bank switch?
  PLA
  SEC
  SBC #$01
  BNE $E5C3
  RTS
  LDA #$EF
  JMP $863C
  RTS
  LDA #$80
  STA $0515
  LDA $05E7
  CMP $05E8
  BNE $E5EC
  LDA #$00
  STA $05E4
  LDA #$01
  BNE $E5F7
@E5EC:
  INC $05E7
  LDY $05E5
  INC $05E5
  LDA #$01
@E5F7:
  STA $05E9
  PLA
  PLA
  RTS
  RTS
  LDA #$80
  STA $0515
  LDA $05E3
  AND #$BF
  STA $05E3
@E60B:
  LDA #$01
  JSR $C515 ; → bank switch?
  JSR $C560 ; → bank switch?
  BIT $05E3
  BVC $E60B
  LDA $05E3
  AND #$BF
  STA $05E3
  RTS
  LDA #$00
  STA $05E3
  PLA
  PLA
  RTS
  JSR $C524 ; → bank switch?
  LDX $3A
  STA $04A8,X
  LDX $3B
  TYA
  STA $04A8,X
  INC $3A
  INC $3B
  RTS
  JSR $C53C ; → bank switch?
  LDA #$00
  STA $3C
@E643:
  LDY $3C
  LDA ($30),Y
  CMP #$E0
  BCS $E652
  JSR $8629 ; → bank switch?
  INC $3C
  BNE $E643
@E652:
  RTS
  STA $3D
  JSR $C50C ; → bank switch?
  LDY #$00
  LDA ($34),Y
  BEQ $E66B
  JSR $863C ; → bank switch?
  LDA #$08
  JSR $8629 ; → bank switch?
  LDA #$2E
  JMP $8629
@E66B:
  LDA $3D
  SEC
  SBC #$0B
  ASL A
  ASL A
  TAX
  LDY #$00
@E675:
  LDA $8686,X
  STA $05EE,Y
  INX
  INY
  CPY #$04
  BNE $E675
  LDA #$00
  JMP $863C
  .byte $47
  ADC $7DCD,X
  BRK
  AND $AF,X
  ROL $3600
  .byte $AF
  ROL $3700
  .byte $AF
  ROL $3800
  .byte $AF
  ROL $3900
  .byte $AF
  ROL $3A00
  .byte $AF
  ROL $3B00
  .byte $AF
  ROL $3C00
  .byte $AF
  ROL $3334
  .byte $AF
  ROL $3434
  .byte $AF
  ROL $6918
  .byte $33
  JMP $8629
  ASL $0E0E
  ASL $0E0E
  ASL $0E0E
  .byte $12, $12, $12, $12, $12, $12, $12
  ORA ($01,X)
  ORA ($02,X)
  BRK
  .byte $02
  BRK
  .byte $03
  ORA ($01,X)
  ORA ($02,X)
  BRK
  .byte $02
  BRK
  .byte $03
  ORA ($02,X)
  ORA $05
  ORA $06
  .byte $04
  ASL $05
  ORA $05
  ASL $04
  ASL $04
  .byte $07
  BVS $E70C
  BCS $E70E
  BEQ $E710
  BMI $E713
  ARR #$22
  .byte $AB, $22
  SBC #$22
  ANC #$23
  LDA $0532
  BEQ $E722
  BPL $E71A
  AND #$7F
  STA $0532
  BEQ $E722
  SEC
  SBC #$01
  ASL A
  TAX
  LDA $AD6E,X
@E70E:
  STA $79
@E710:
  LDA $AD6F,X
@E713:
  STA $7A
  LDA #$00
  STA $0533
@E71A:
  LDA $0533
  BEQ $E723
  DEC $0533
@E722:
  RTS
@E723:
  LDY #$00
@E725:
  LDA ($79),Y
  AND #$07
  TAX
  LDA ($79),Y
  LSR A
  LSR A
  LSR A
  BNE $E73C
  CPX #$00
  BEQ $E765
  CPX #$01
  BEQ $E76B
  INY
  BNE $E725
@E73C:
  STA $0533
  LDA ($79),Y
  AND #$07
  STA $3A
  INY
@E746:
  LDA ($79),Y
  TAX
  INY
  LDA ($79),Y
  STA $046F,X
  INY
  DEC $3A
  BNE $E746
  TYA
  CLC
  ADC $79
  STA $79
  BCC $E75E
  INC $7A
@E75E:
  JSR $C533 ; → bank switch?
  BRK
  JMP ($6004)
@E765:
  LDA #$00
  STA $0532
  RTS
@E76B:
  INY
  LDA ($79),Y
  TAX
  INY
  LDA ($79),Y
  STA $7A
  STX $79
  JMP $8723
  LDA $0534
  BEQ $E7A3
  BPL $E79B
  AND #$7F
  STA $0534
  BEQ $E7A3
  SEC
  SBC #$01
  ASL A
  TAX
  LDA $AD1C,X
  STA $7B
  LDA $AD1D,X
  STA $7C
  LDA #$00
  STA $0535
@E79B:
  LDA $0535
  BEQ $E7A4
  DEC $0535
@E7A3:
  RTS
@E7A4:
  LDY #$00
@E7A6:
  LDA ($7B),Y
  CMP #$F0
  BCC $E7B7
  CMP #$F0
  BEQ $E7D2
  CMP #$F1
  BEQ $E7D8
  INY
  BNE $E7A6
@E7B7:
  STA $0535
  INY
  LDA ($7B),Y
  STA $0490
  INY
  LDA ($7B),Y
  STA $0491
  INY
  TYA
  CLC
  ADC $7B
  STA $7B
  BCC $E7D1
  INC $7C
@E7D1:
  RTS
@E7D2:
  LDA #$00
  STA $0534
  RTS
@E7D8:
  INY
  LDA ($7B),Y
  TAX
  INY
  LDA ($7B),Y
  STA $7C
  STX $7B
  JMP $87A4
  LDA $0536
  .byte $F0, $26  ; BEQ $8811
  .byte $10, $1B  ; BPL $8808
  AND #$7F
  STA $0536
  .byte $F0, $1D  ; BEQ $8811
  SEC
  SBC #$01
  ASL A
  TAX
  LDA $AD54,X
  STA $7D
  .byte $BD, $55
  `;
}

// $8800-$8BFF (1024B): $8800-$8BFF 代码/数据段3
function build_8800_8BFF_seg3(): readonly number[] {
  return asm`
  LDA $7E85
  LDA #$00
  STA $0537
  LDA $0537
  BEQ $E815
  DEC $0537
  RTS
  STA $0538
  RTS
@E815:
  LDY #$00
@E817:
  LDA ($7D),Y
  CMP #$F0
  BCC $E828
  CMP #$F0
  BEQ $E83D
  CMP #$F1
  BEQ $E843
  INY
  BNE $E817
@E828:
  STA $0537
  INY
  LDA ($7D),Y
  STA $0538
  INY
  TYA
  CLC
  ADC $7D
  STA $7D
  BCC $E83C
  INC $7E
@E83C:
  RTS
@E83D:
  LDA #$00
  STA $0536
  RTS
@E843:
  INY
  LDA ($7D),Y
  TAX
  INY
  LDA ($7D),Y
  STA $7E
  STX $7D
  JMP $8815
  TAY
  ASL A
  TAX
  LDA $B3CF,X
  STA $50
  LDA $B3D0,X
  STA $51
  TYA
  AND #$03
  TAX
  TYA
  LSR A
  LSR A
  TAY
  LDA $B3BD,Y
  DEX
  BMI $E871
  LSR A
  LSR A
  JMP $8869
@E871:
  AND #$03
  STA $05C6
  ASL A
  ASL A
  ASL A
  ADC $05C6
  STA $05C6
  LDA #$00
  STA $05C5
@E884:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $0515
  BNE $E884
  LDA #$01
  STA $0515
  LDY #$02
  LDA ($50),Y
  ASL A
  CLC
  ADC #$06
  TAX
  LDA #$00
@E89E:
  STA $04A5,X
  DEX
  BPL $E89E
  LDX #$00
  JSR $88B9 ; → bank switch?
  BEQ $E8B8
  LDY #$02
  LDA ($50),Y
  CLC
  ADC #$03
  TAX
  JSR $88B9 ; → bank switch?
  BNE $E884
@E8B8:
  RTS
  LDA #$FF
  STA $45
  LDY #$02
  LDA ($50),Y
  STA $04A5,X
  LDA #$00
  STA $3A
  LDA $05C5
  LSR A
  ROR $3A
  LSR A
  ROR $3A
  LSR A
  ROR $3A
  STA $3B
  LDY #$00
  LDA ($50),Y
  CLC
  ADC $3A
  STA $04A6,X
  INY
  LDA ($50),Y
  ADC $3B
  STA $04A7,X
  CMP #$22
  BCS $E8F9
  LDA $05CE
  LSR A
  LSR A
  LSR A
  LSR A
  ORA $04A7,X
  STA $04A7,X
@E8F9:
  STX $3A
  LDX #$00
  LDY #$05
  LDA ($50),Y
  CMP $05C5
  BEQ $E918
  BCS $E949
  LDY #$07
  CLC
  ADC ($50),Y
  LDX #$06
  CMP $05C5
  BEQ $E918
  BCC $E949
  LDX #$03
@E918:
  LDY #$06
  LDA ($50),Y
  SEC
  SBC #$02
  STA $3B
  LDA $3A
  LDY #$04
  CLC
  ADC ($50),Y
  TAY
  STX $45
  TXA
  CLC
  ADC $05C6
  TAX
  LDA $8D9E,X
  STA $04A8,Y
  LDA $8D9F,X
  INY
@E93B:
  STA $04A8,Y
  INY
  DEC $3B
  BNE $E93B
  LDA $8DA0,X
  STA $04A8,Y
@E949:
  LDY #$08
  LDA ($50),Y
  BEQ $E976
  STA $3B
  INY
@E952:
  LDA #$00
  STA $3C
  LDA ($50),Y
  CMP $05C5
  BEQ $E967
  SEC
  SBC #$01
  INC $3C
  CMP $05C5
  BNE $E96E
@E967:
  STY $48
  JSR $8986 ; → bank switch?
  LDY $48
@E96E:
  INY
  INY
  INY
@E971:
  INY
  DEC $3B
  BNE $E952
@E976:
  LDA #$80
  STA $0515
  LDA $05C5
  INC $05C5
  LDY #$03
  CMP ($50),Y
  RTS
  INY
  LDA ($50),Y
  CLC
  ADC $3A
  STA $3D
  INY
  LDA ($50),Y
  STA $3E
  INY
  LDA ($50),Y
  STA $3F
  LDA #$00
  STA $40
@E99C:
  LDY $40
  INC $40
  LDA ($3E),Y
  CMP #$E0
  BCC $E9AC
  JSR $89B4 ; → bank switch?
  JMP $899C
@E9AC:
  JSR $C524 ; → bank switch?
  JSR $8C9F ; → bank switch?
  BNE $E99C
  SEC
  SBC #$E0
  JSR $C509 ; → bank switch?
  NOP
  .byte $89
  BRK
  TXA
  ASL $8A
  .byte $0C
  TXA
  .byte $12
  TXA
  STX $8A
  .byte $93
  TXA
  .byte $AF
  TXA
  CLV
  TXA
  CMP ($8A,X)
  CMP ($8A,X)
  .byte $D7
  TXA
  .byte $DF
  TXA
  .byte $E7
  TXA
  .byte $2F, $8B
  PHA
  .byte $8B, $8B, $8B
  CMP $8B,X
  DEC $E48B,X
  .byte $8B
  NOP
  .byte $8B
  BEQ $E971
  .byte $04
  STY $8C47
  .byte $52
  STY $8C52
  .byte $52
  STY $8C52
  .byte $52
  STY $8C55
  EOR $8C,X
  EOR $8C,X
  LDA $0441
  JMP $8CDC
  LDA $0441
  JMP $8CA5
  LDA $05FC
  JMP $8CDC
  LDA $05FC
  JMP $8CA5
  LDA $043B
  JSR $C509 ; → bank switch?
  JSR $348A
  TXA
  AND $3E8A,Y
  TXA
  LDY $40
  LDA ($3E),Y
  BNE $EA2F
  LDA $044E
  CLC
  ADC #$9A
  JMP $8A56
@EA2F:
  LDA #$9A
  JMP $8A43
  LDA #$C4
  JMP $8A43
  LDA #$BD
  JMP $8A43
  LDA #$C8
  JMP $8A43
  TAX
  LDY $40
  INC $40
  LDA ($3E),Y
  BEQ $EA55
  TAY
  TXA
  CLC
  ADC $0430,Y
  JMP $8A56
@EA55:
  TXA
  STA $47
  JSR $C53C ; → bank switch?
  LDA $47
  LDY #$09
  CMP #$AA
  BEQ $EA6E
  LDY #$00
@EA65:
  LDA ($30),Y
  CMP #$FC
  BEQ $EA6E
  INY
  BNE $EA65
@EA6E:
  TYA
  STA $49
  LDA #$00
  STA $46
@EA75:
  LDY $46
  LDA ($30),Y
  JSR $C524 ; → bank switch?
  JSR $8C9F ; → bank switch?
  INC $46
  DEC $49
  BNE $EA75
  RTS
  LDY $40
  INC $40
  LDA ($3E),Y
  TAX
  LDA $0601,X
  JMP $8D1A
  LDY $40
  INC $40
  LDA ($3E),Y
  BEQ $EA9F
  TAX
  LDA $0430,X
@EA9F:
  LDX $061E
  LDY $060B,X
  CLC
  ADC $8AAC,Y
  JMP $8D6C
  CMP $D7D1
  LDX $061E
  LDA $0601,X
  JMP $8CDC
  LDX $061E
  LDA $0601,X
  JMP $8CA5
  LDY $40
  INC $40
  LDA ($3E),Y
  TAX
  LDA $0431,X
  INX
  CPX $0430
  BCC $EAD4
  BEQ $EAD4
  RTS
@EAD4:
  JMP $8D1A
  LDA $05FB
  EOR #$0B
  JMP $8CDC
  LDA $05FB
  EOR #$0B
  JMP $8CA5
  LDY $40
  INC $40
  LDX $002A
  LDA ($3E),Y
  BEQ $EAF5
  LDX $002B
@EAF5:
  LDA $8B0A,X
  PHA
  TXA
  CLC
  ADC #$76
  CMP #$9A
  BCC $EB03
  LDA #$99
@EB03:
  JSR $C53C ; → bank switch?
  PLA
  JMP $8A6F
  .byte $03, $04, $03, $03, $03, $04, $03, $04, $03, $03, $03, $04, $03, $03, $04, $03, $03, $03, $03, $03, $03, $03, $03, $03, $04, $03, $03, $03, $04, $04, $04, $04, $04, $03, $03, $04, $04
  LDY $40
  INC $40
  LDA ($3E),Y
  TAX
  LDA $0028,X
  LDY $0027
  CPY #$04
  BNE $EB43
  LDA $0610,X
@EB43:
  LDX #$00
  JMP $8C55
  LDA #$00
  STA $47
@EB4C:
  LDA $0027
  ASL A
  ASL A
  ADC $0027
  ADC $47
  TAX
  LDA $8B72,X
  CMP #$FF
  BEQ $EB67
  JSR $C524 ; → bank switch?
  JSR $8C9F ; → bank switch?
  JMP $8B69
@EB67:
  INC $3D
  INC $47
  LDA $47
  CMP #$05
  BNE $EB4C
  RTS
  .byte $FF
  TAY
  ROL $FFFF
  .byte $FF
  ASL A
  .byte $03, $FF, $FF, $04
  ROL $A800
  ROL $2E04
  BRK
  ASL A
  .byte $03, $FF
  STA $FF8B
  .byte $FF
  LDX #$00
  LDA $05F7
  LDY $05F8
@EB93:
  SEC
  SBC #$06
  BCS $EB9B
  DEY
  BMI $EB9E
@EB9B:
  INX
  BNE $EB93
@EB9E:
  ADC #$06
  ASL A
  TAY
  TXA
  PHA
  LDA $8BC9,Y
  PHA
  LDA $8BCA,Y
  LDY #$00
  JSR $8C85 ; → bank switch?
  DEC $3D
  PLA
  LDY #$00
  JSR $8C85 ; → bank switch?
  DEC $3D
  LDA #$77
  LDY #$00
  JSR $8C85 ; → bank switch?
  DEC $3D
  PLA
  LDX #$00
  JMP $8C55
  .byte $33, $33, $34, $33
  AND $33,X
  ROL $33,X
  .byte $37, $33
  SEC
  .byte $33
  LDY $40
  INC $40
  LDA ($3E),Y
  JMP $8D1A
  LDA $05FD
  JMP $8D1A
  LDA $05FD
  JMP $8CA5
  LDA $0441
  JMP $8D1A
  LDY $40
  INC $40
  LDA ($3E),Y
  JSR $C50C ; → bank switch?
  LDY #$02
  LDA ($34),Y
  TAX
  DEY
  .byte $B1
  `;
}

// $8C00-$8FFF (1024B): $8C00-$8FFF 代码/数据段4
function build_8C00_8FFF_seg4(): readonly number[] {
  return asm`
  .byte $34
  JMP $8C55
  LDA $0441
  STA $49
@EC09:
  LDA $49
  CMP #$0B
  BEQ $EC46
  LDX $0430
  BEQ $EC22
@EC14:
  CMP $0430,X
  BEQ $EC1E
  DEX
  BNE $EC14
  BEQ $EC22
@EC1E:
  INC $49
  BNE $EC09
@EC22:
  INC $49
  JSR $8D1A ; → bank switch?
  LDY $3C
  DEY
  BEQ $EC46
  LDA #$17
  STA $3D
  LDA $49
  SEC
  SBC #$01
  LDX #$01
  JSR $C527 ; → bank switch?
  LDA $32
  LDX $33
  JSR $8C55 ; → bank switch?
  LDA $49
  STA $0441
@EC46:
  RTS
  LDA $05FD
  CLC
  ADC #$01
  LDX #$00
  JMP $8C55
  PLA
  PLA
  RTS
  LDY $3C
  DEY
  BEQ $EC84
  STA $6F
  STX $70
  LDA #$0A
  STA $71
  LDA #$00
  STA $74
@EC66:
  JSR $C51E ; → bank switch?
  LDA $72
  JSR $8C7A ; → bank switch?
  LDA $70
  BNE $EC66
  LDA $6F
  BEQ $EC84
  CMP #$0A
  BCS $EC66
  CLC
  ADC #$33
  LDY #$00
  JSR $8C85 ; → bank switch?
  DEC $3D
@EC84:
  RTS
  LDX $3D
  DEC $3C
  BNE $EC99
  TYA
  BEQ $EC9C
  LDY $05C6
  CPY #$1B
  BEQ $EC99
  LDY $45
  BEQ $EC9C
@EC99:
  STA $04A8,X
@EC9C:
  INC $3C
  RTS
  JSR $8C85 ; → bank switch?
  INC $3D
  RTS
  PHA
  LDY $40
  INC $40
  LDA ($3E),Y
  BNE $ECBD
  PLA
  JSR $C50C ; → bank switch?
  LDY #$02
  LDA ($34),Y
  TAX
  DEY
  LDA ($34),Y
  JMP $8CD9
@ECBD:
  AND #$7F
  CMP #$07
  BCC $ECD0
  CMP #$18
  BCS $ECD0
  LDX $044E
  DEX
  BEQ $ECD0
  CLC
  ADC #$08
@ECD0:
  TAX
  PLA
  JSR $C527 ; → bank switch?
  LDA $32
  LDX $33
  JMP $8C55
  PHA
  CMP #$0B
  BCC $ECE3
  SBC #$0B
@ECE3:
  ASL A
  PHA
  TAX
  LDA $8D04,X
  JSR $C524 ; → bank switch?
  JSR $8C9F ; → bank switch?
  PLA
  TAX
  LDA $8D05,X
  JSR $C524 ; → bank switch?
  JSR $8C9F ; → bank switch?
  LDA #$00
  TAY
  JSR $8C9F ; → bank switch?
  PLA
  JMP $8D1A
  .byte $87, $8B
  STY $86
  STY $86
  STY $86
  STY $86
  STY $8686
  .byte $92
  STY $8686
  .byte $92
  STY $8686
  .byte $92
  STA $47
  JSR $C50C ; → bank switch?
  LDY #$00
  LDA ($34),Y
  BNE $ED6C
  LDA $47
  SEC
  SBC #$0B
  ASL A
  ASL A
  TAX
  LDY #$00
@ED2F:
  LDA $8D40,X
  STA $05EE,Y
@ED35:
  INX
  INY
  CPY #$04
  BNE $ED2F
  LDA #$00
  JMP $8D6C
  .byte $47
  ADC $7DCD,X
  BRK
  AND $AF,X
  ROL $3600
  .byte $AF
  ROL $3700
  .byte $AF
  ROL $3800
  .byte $AF
  ROL $3900
  .byte $AF
  ROL $3A00
  .byte $AF
  ROL $3B00
  .byte $AF
  ROL $3C00
  .byte $AF
  ROL $3334
  .byte $AF
  ROL $3434
  .byte $AF
  ROL $3C20
  CMP $A0
  BRK
@ED71:
  LDA ($30),Y
  CMP #$E0
  BCS $ED86
  TYA
  PHA
  LDA ($30),Y
  JSR $C524 ; → bank switch?
  JSR $8C9F ; → bank switch?
  PLA
  TAY
  INY
@ED84:
  BNE $ED71
@ED86:
  TYA
  SEC
  SBC #$05
  BPL $ED9D
  EOR #$FF
  CLC
  ADC #$01
  STA $47
@ED93:
  LDA #$00
  TAY
  JSR $8C9F ; → bank switch?
  DEC $47
  BNE $ED93
@ED9D:
  RTS
  .byte $9C
  TAY
  STA $00AA,X
@EDA3:
  .byte $AB, $9E
  LDA #$9F
  DEY
  .byte $89
  BCC $ED35
  BRK
  TXA
  STX $9389
  BRK
  BRK
@EDB2:
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  CPX $E5
  BEQ $EDA3
  BRK
  .byte $F2
  CPX $F8ED
  CPX #$8D
  .byte $37
  STX $8E94
  INC $8E,X
  ARR #$8F
  .byte $BF, $8F
  ORA $90,X
  .byte $73
  BCC $EDB2
  BCC $EE15
  STA ($40),Y
  STA ($40),Y
  STA ($B0),Y
  STA ($B0),Y
  STA ($B0),Y
  STA ($2C),Y
  .byte $22, $14
  STY $94,X
  .byte $82
  BPL $ED84
  TAY
  TAY
  LDY #$A8
  TAY
  LDY #$A8
  TAY
  TAY
  LDY #$A8
  LDY #$A8
  TAY
  STA $0382,X
  BRK
  .byte $9C
  TYA
  STX $9903
  STA $0200,X
  BRK
  TAX
  BCC $EE08
  .byte $AB
  BRK
@EE08:
  .byte $02
  LDY $A5
  BCC $EE0F
  .byte $AB
  BRK
@EE0F:
  .byte $02
  BRK
  TAX
  BCC $EE16
  .byte $AB
@EE15:
  BRK
@EE16:
  .byte $03
  BRK
  .byte $9E
  TXS
  STX $9B03
  .byte $9F
  BRK
  .byte $14
  BRK
  BRK
  .byte $9E
  LDA #$A2
  LDA #$A9
  LDX #$A9
  LDA #$A9
  LDX #$A9
  LDA #$A9
  LDX #$A9
  .byte $9F
  BRK
  BRK
  STY $94,X
  STY $2C,X
  .byte $22, $14
  STY $94,X
  .byte $83
  ASL $A89C
  LDY #$A8
  LDY #$A8
  TAY
  LDY #$A8
  LDY #$A8
  TAY
  LDY #$9D
  .byte $83, $04
  BRK
  BRK
  .byte $9C
  TYA
  STY $9904
  LDY #$9D
  BRK
  .byte $03
  BRK
  .byte $9C
  TYA
  .byte $8F, $02
  LDA ($00,X)
  .byte $02
  LDY $A5
  BCC $EE67
  .byte $AB
  BRK
@EE67:
  .byte $02
  BRK
  TAX
  BCC $EE6E
  LDA ($00,X)
@EE6E:
  .byte $03
  BRK
  .byte $9E
  TXS
  .byte $8F, $02, $AB
  BRK
  .byte $04
  BRK
  BRK
  .byte $9E
  TXS
  STX $A102
  BRK
  .byte $83
  ORA ($9E),Y
  LDX #$A9
  LDX #$A9
  LDA #$A2
  LDA #$A9
  LDX #$A9
  LDX #$A9
  LDA #$A2
  .byte $9F
  BRK
  STY $94,X
  BIT $1422
  STY $82,X
  .byte $12, $9C
  LDY #$A8
  TAY
  LDY #$A0
  TAY
  TAY
  LDY #$A8
  TAY
  LDY #$A8
  LDY #$A0
  TAY
  STA $0300,X
  BRK
  .byte $9C
  TYA
  .byte $8F, $02, $AB
  BRK
  .byte $02
  BRK
  TAX
  BCC $EEBB
  .byte $AB
  BRK
@EEBB:
  .byte $02
  BRK
  .byte $A3
  BCC $EEC2
  LDA ($00,X)
@EEC2:
  .byte $02
  LDY $A5
  BCC $EEC9
  .byte $AB
  BRK
@EEC9:
  .byte $02
  BRK
  TAX
  BCC $EED0
  LDA ($00,X)
@EED0:
  .byte $03
  BRK
  .byte $9E
  TXS
  .byte $8F, $02, $AB
  BRK
  .byte $04
  BRK
  BRK
  .byte $9E
  TXS
  STY $9B04
  LDA #$9F
  BRK
  .byte $83
  ASL $A29E
  LDA #$A9
  LDX #$A2
  LDA #$A9
  LDA #$A2
  LDA #$A9
  LDA #$9F
  .byte $83
  STY $94,X
  BIT $1422
  STY $14,X
  BRK
  BRK
  BRK
  .byte $9C
  TAY
  LDY #$A8
  TAY
  LDY #$A8
  TAY
  LDY #$A0
  TAY
  TAY
  LDY #$A8
  LDY #$9D
  BRK
  .byte $04
  BRK
  BRK
  .byte $9C
  TYA
  STX $A102
  BRK
  .byte $03
  BRK
  BRK
  TAX
  .byte $8F, $02, $AB
  BRK
  .byte $03
  BRK
  .byte $9C
  TYA
  .byte $8F, $02, $AB
  BRK
  .byte $02
  LDY $A5
  BCC $EF2F
  LDA ($00,X)
@EF2F:
  .byte $02
  BRK
  TAX
  BCC $EF36
  LDA ($00,X)
@EF36:
  .byte $03
  BRK
  .byte $9E
  TXS
  .byte $8F, $02, $AB
  BRK
  .byte $03
  BRK
  BRK
  .byte $A3, $8F, $02
  LDA ($00,X)
  .byte $03
  BRK
  BRK
  TAX
  .byte $8F, $02, $AB
  BRK
  ORA $00
  BRK
  .byte $9E
  LDX #$9A
  STY $9B03
  .byte $9F
  BRK
  STY $10
  .byte $9E
  LDA #$A9
  LDX #$A9
  LDA #$A2
  LDA #$A9
  LDX #$A2
  LDA #$A9
  .byte $9F
  BRK
  BRK
  BIT $1422
  STY $94,X
  .byte $14
  BRK
  BRK
  .byte $9B
  LDA #$A2
  LDA #$A2
  LDA #$A9
  LDX #$A9
  LDA #$A9
  LDX #$A9
  LDX #$A2
  LDA #$9A
  BRK
  .byte $03
  BRK
  .byte $9B, $9F, $8F, $02, $9E
  TXS
  .byte $02
  BRK
  .byte $AB
  STA ($01),Y
  TAX
  .byte $02
  BRK
  LDA ($91,X)
  ORA ($A3,X)
  .byte $02
  BRK
  .byte $AB
  STA ($01),Y
  TAX
  .byte $03
  BRK
  STA $8F9D,Y
  .byte $02, $9C
  TYA
  .byte $14
  BRK
  BRK
  STA $A0A8,Y
  TAY
  LDY #$A8
  TAY
  LDY #$A8
  TAY
  TAY
  LDY #$A8
  LDY #$A8
  LDY #$98
  BRK
  STY $94,X
  STY $2C,X
  .byte $22, $14
  STY $94,X
  .byte $14
  BRK
  BRK
  .byte $9B
  LDA #$A2
  LDX #$A9
  LDX #$A9
  LDA #$A2
  LDA #$A2
  LDA #$A2
  LDA #$A2
  LDA #$9A
  BRK
  .byte $03
  BRK
  .byte $9B, $9F, $8F, $02, $9E
  TXS
  .byte $02, $9B, $9F
  STA ($01),Y
  .byte $A3
  ORA ($A1,X)
  .byte $92
  ORA ($AA,X)
  ORA ($AB,X)
  .byte $92
  ORA ($A3,X)
  .byte $02
  STA $919D,Y
  ORA ($AA,X)
  .byte $03
  BRK
  STA $909D,Y
  ORA ($A3,X)
  .byte $14
  BRK
  `;
}

// $9000-$93FF (1024B): $9000-$93FF 代码/数据段5
function build_9000_93FF_seg5(): readonly number[] {
  return asm`
  BRK
  STA $A8A8,Y
  LDY #$A8
  LDY #$A8
  TAY
  LDY #$A8
  LDY #$A8
  TAY
  LDY #$A8
  LDY #$A8
  TYA
  STY $94,X
  BIT $1422
  STY $14,X
  BRK
  BRK
  .byte $9B
  LDX #$A9
  LDX #$A9
  LDX #$A2
  LDA #$A9
  LDA #$A2
  LDA #$A9
  LDX #$A9
  LDX #$9A
  BRK
  .byte $03
  BRK
  .byte $9B, $9F, $8F, $02, $9E
  TXS
  .byte $02
  BRK
  .byte $AB
  STA ($01),Y
  TAX
  .byte $02
  BRK
  LDA ($91,X)
  ORA ($A3,X)
  .byte $02
  BRK
  LDA ($91,X)
  ORA ($AA,X)
  .byte $02
  BRK
  .byte $AB
  STA ($01),Y
  .byte $A3, $02
  BRK
  LDA ($91,X)
  ORA ($AA,X)
  .byte $03
  BRK
  STA $8F9D,Y
  .byte $02, $9C
  TYA
  .byte $14
  BRK
  BRK
  STA $A8A0,Y
  TAY
  TAY
  LDY #$A8
  LDY #$A8
  LDY #$A0
  TAY
  LDY #$A8
  LDY #$A8
  TYA
  BRK
  STY $94,X
  BIT $1422
  STY $14,X
  BRK
  BRK
  BRK
  .byte $9B
  LDA #$A2
  LDA #$A2
  LDA #$A9
  LDX #$A9
  LDA #$A2
  LDX #$A9
  LDA #$A2
  TXS
  BRK
  .byte $04
  BRK
  BRK
  .byte $9B, $9F
  STX $9E02
  TXS
  .byte $03
  BRK
  .byte $9B, $9F
  BCC $E09C
  TAX
@E09C:
  .byte $02
  BRK
  LDA ($91,X)
  ORA ($A3,X)
  .byte $02
  BRK
  .byte $AB
  STA ($01),Y
  TAX
  .byte $02
  BRK
  LDA ($91,X)
  ORA ($AA,X)
  .byte $02
  BRK
  .byte $AB
  STA ($01),Y
  .byte $A3, $02
  BRK
  LDA ($91,X)
  ORA ($AA,X)
  .byte $03
  BRK
  STA $909D,Y
  ORA ($A3,X)
  .byte $04
  BRK
  BRK
  STA $8E9D,Y
  .byte $02, $9C
  TYA
  .byte $14
  BRK
  BRK
  BRK
  STA $A0A8,Y
  TAY
  TAY
  LDY #$A8
  TAY
  LDY #$A0
  TAY
  TAY
  LDY #$A8
  LDY #$98
  BRK
  BIT $1422
  STY $94,X
  .byte $14
  BRK
  BRK
  BRK
  .byte $9C
  LDY #$A8
  LDY #$A8
  LDY #$A8
  TAY
  LDY #$A8
  LDY #$A0
  TAY
  LDY #$9D
  BRK
  BRK
  .byte $04
  BRK
  .byte $9C
  LDY #$98
  STA $9903
  STA $0200,X
  BRK
  .byte $A3
  BCC $E10A
  .byte $AB
  BRK
@E10A:
  .byte $02
  STX $97,Y
  BCC $E111
  LDA ($00,X)
@E111:
  .byte $02
  BRK
  .byte $A3
  BCC $E118
  .byte $AB
  BRK
@E118:
  .byte $03
  BRK
  .byte $9E
  TXS
  .byte $8F, $02
  LDA ($00,X)
  .byte $03
  BRK
  BRK
  .byte $A3
  STX $9B03
  .byte $9F
  BRK
  .byte $14
  BRK
  BRK
  .byte $9E
  LDX #$A9
  LDX #$A9
  LDX #$A9
  LDA #$A2
  LDX #$A9
  LDX #$A2
  LDA #$A2
  .byte $9F
  BRK
  BRK
  STY $94,X
  PLP
  .byte $22
  CLC
  TYA
  CLC
  BRK
  .byte $9C
  TAY
  TAY
  TAY
  TAY
  TAY
  TAY
  TAY
  TAY
  TAY
  TAY
  TAY
  TAY
  TAY
  TAY
  TAY
  TAY
  TAY
  TAY
  TAY
  STA $0000,X
  .byte $02
  BRK
  TAX
  .byte $93, $03, $AB
  BRK
  BRK
  .byte $02
  BRK
  TAX
  .byte $93, $03, $AB
  BRK
  BRK
  .byte $02
  BRK
  TAX
  .byte $93, $03, $AB
  BRK
  BRK
  .byte $02
  BRK
  TAX
  .byte $93, $03, $AB
  BRK
  BRK
  .byte $02
  BRK
  TAX
  .byte $93, $03, $AB
  BRK
  BRK
  .byte $02
  BRK
  TAX
  .byte $93, $03, $AB
  BRK
  BRK
  .byte $02
  BRK
  TAX
  .byte $93, $03, $AB
  BRK
  BRK
  CLC
  BRK
  .byte $9E
  LDA #$A9
  LDA #$A9
  LDA #$A9
  LDA #$A9
  LDA #$A9
  LDA #$A9
  LDA #$A9
  LDA #$A9
  LDA #$A9
  LDA #$9F
  BRK
  BRK
  TYA
  TYA
  PLP
  .byte $22
  CLC
  TYA
  CLC
  BRK
  .byte $9B
  LDA #$A2
  LDA #$A2
  LDA #$A2
  LDA #$A2
  LDA #$A2
  LDA #$A2
  LDA #$A2
  LDA #$A2
  LDA #$A2
  LDA #$9A
  BRK
  BRK
  .byte $02
  BRK
  .byte $AB, $93, $03
  TAX
  BRK
  BRK
  .byte $02
  BRK
  LDA ($93,X)
  .byte $03, $A3
  BRK
  BRK
  .byte $02
  BRK
  .byte $AB, $93, $03
  TAX
  BRK
  BRK
  .byte $02
  BRK
  LDA ($93,X)
  .byte $03, $A3
  BRK
  BRK
  .byte $02
  BRK
  .byte $AB, $93, $03
  TAX
  BRK
  BRK
  .byte $02
  BRK
  LDA ($93,X)
  .byte $03, $A3
  BRK
  BRK
  .byte $02
  BRK
  .byte $AB, $93, $03
  TAX
  BRK
  BRK
  CLC
  BRK
  STA $A0A8,Y
  TAY
  LDY #$A8
  LDY #$A8
  LDY #$A8
  LDY #$A8
  LDY #$A8
  LDY #$A8
  LDY #$A8
  LDY #$A8
  TYA
  BRK
  BRK
  TYA
  TYA
  BRK
  STY $02,X
  STY $11,X
  STY $20,X
  STY $3B,X
  STY $47,X
  STY $55,X
  STY $65,X
  STY $71,X
  STY $8A,X
  STY $95,X
  STY $AD,X
  STY $BB,X
  STY $CE,X
  STY $D1,X
  STY $D9,X
  STY $E4,X
  STY $FC,X
  STY $12,X
  STA $27,X
  STA $2E,X
  STA $48,X
  STA $55,X
  STA $63,X
  STA $6F,X
  STA $8B,X
  STA $9A,X
  STA $A9,X
  STA $B7,X
  STA $CE,X
  STA $E6,X
  STA $08,X
  STX $21,Y
  STX $2A,Y
  STX $40,Y
  STX $77,Y
  STX $86,Y
  STX $92,Y
  STX $A7,Y
  STX $BF,Y
  STX $DA,Y
  STX $EA,Y
  STX $F6,Y
  STX $01,Y
  .byte $97
  ORA $1897
  .byte $97
  AND ($97),Y
  .byte $3F, $97
  LSR $5F97
  .byte $97, $97, $97
  CPY $97
  .byte $D3, $97
  CPX $97
  INC $1097,X
  TYA
  .byte $33
  TYA
  .byte $43
  TYA
  JMP $5C98
  TYA
  JMP ($7A98)
  TYA
  STX $9B98
  TYA
  LDY $98
  LDY $98,X
  CMP ($98,X)
  .byte $CF
  TYA
  .byte $E7
  TYA
  .byte $F4
  TYA
  ANC #$99
  .byte $17
  STA $9921,Y
  AND $3899
  STA $994E,Y
  .byte $63
  STA $9975,Y
  ADC $7D99,X
  STA $998D,Y
  .byte $9F
  STA $99BB,Y
  CMP $FA99,Y
  STA $9A1C,Y
  AND $489A,X
  TXS
  .byte $62
  TXS
  BVS $E26E
  .byte $80
  TXS
  STX $9A,Y
  .byte $AF
  TXS
  DEC $9A
  CMP $E99A,Y
  TXS
  NOP
  TXS
  .byte $07, $9B, $17, $9B
  ROL $9B
  ROL $9B,X
  .byte $47, $9B
  RTS
  .byte $9B
  NOP
  .byte $9B
  DEY
  .byte $9B, $92, $9B
  CMP ($9B,X)
  CMP $D79B
  .byte $9B, $E3, $9B
  ADC ($9C),Y
  .byte $82, $9C, $92, $9C
  TAX
  .byte $9C
  AND ($9F),Y
  .byte $42, $9F
  LDA $39A3,X
  LDY $47
  LDY $61
  LDY $6C
  LDY $8C
  LDY $A7
  LDY $B4
  LDY $C2
  LDY $E2
  LDY $05
  LDA $16
  LDA $1E
  LDA $49
  LDA $5B
  LDA $6D
  LDA $81
  LDA $8B
  LDA $97
  LDA $A8
  LDA $B4
  LDA $B5
  LDA $C8
  LDA $D8
  LDA $10
  LDX $3B
  LDX $44
  LDX $51
  LDX $5D
  LDX $69
  LDX $78
  LDX $87
  LDX $96
  LDX $A7
  LDX $B9
  LDX $EB
  LDX $F7
  LDX $01
  .byte $A7
  ASL A
  .byte $A7
  ASL $A7,X
  PLP
  .byte $A7
  EOR ($A7),Y
  .byte $77, $A7
  LDY #$A7
  LDA ($A7),Y
  AXS #$A7
  CMP $A7,X
  CPX #$A7
  SBC $F8A7
  .byte $A7, $04
  TAY
  .byte $1B
  TAY
@E370:
  .byte $1B
  TAY
  .byte $23
  TAY
  AND $A8,X
  .byte $43
  TAY
  LSR $56A8
  TAY
  ADC $A8
  .byte $6F
  TAY
  NOP
  TAY
  .byte $80
  TAY
  .byte $92
  TAY
  .byte $9E
  TAY
  LDA $C1A8,Y
  TAY
  CMP #$A8
  CLD
  TAY
  CPX #$A8
  SBC #$A8
  ORA #$A9
  .byte $13
  LDA #$1F
  LDA #$27
  LDA #$39
  LDA #$49
  LDA #$62
  LDA #$6B
  LDA #$75
  LDA #$7C
  LDA #$89
  LDA #$91
  LDA #$9F
  LDA #$A9
  LDA #$B0
  LDA #$C9
  LDA #$D1
  LDA #$DE
  LDA #$E8
  LDA #$0F
  TAX
  .byte $1B
  TAX
  BIT $AA
  NOP
  TAX
  PLA
  TAX
  BVS $E370
  LDA $AA
  .byte $B2
  TAX
  LDA $D5AA,X
  TAX
  .byte $04, $AB
  ASL $25AB
  .byte $AB
  ROL $4BAB,X
  .byte $AB
  ROR $AB
  ROR $AB
  STA $AB,X
  LDY #$AB
  LDY #$AB
  LDY $B8AB
  .byte $AB
  BEQ $E393
  ANC #$AC
  AND $38AC
  LDY $AC4A
  NOP
  LDY $AC6A
  ADC $A8AC,X
  LDY $ACBB
  CMP $AC
  CPX #$AC
  .byte $02
  .byte $AD
  `;
}

// $9400-$97FF (1024B): $9400-$97FF 代码/数据段6
function build_9400_97FF_seg6(): readonly number[] {
  return asm`
  .byte $F2
  BEQ $E404
  .byte $52
@E404:
  SBC $01FC
  .byte $1C, $2F, $14, $AF
  ANC #$2A
  BPL $E488
  .byte $FC
  BEQ $E413
  .byte $52
@E413:
  INC $01FC
  .byte $1C, $2F, $14, $AF
  ANC #$2A
  BPL $E497
  .byte $FC
  BEQ $E422
  ADC ($E4),Y
  .byte $FC
  ORA ($1C,X)
  .byte $2F, $14, $AF
  ANC #$2A
  BPL $E4A6
  .byte $FC
  ORA ($EE,X)
  .byte $FC
  ORA ($F5,X)
  AND $1400
  .byte $2F
  BPL $E4B2
  .byte $FC
  BEQ $E43D
  .byte $52
@E43D:
  CPX $10
  ORA ($19),Y
  .byte $FC
  ORA ($E0,X)
  ADC $F0FC,Y
  ORA ($51,X)
  INC $01FC
  SBC $2D,X
  BRK
  .byte $14, $2F
  BPL $E4CC
  .byte $FC
  BEQ $E457
  .byte $52
@E457:
  SBC $FCA0
  ORA ($21,X)
  ASL $2F
  .byte $13, $02, $2F
  BPL $E4DC
  .byte $FC
  BEQ $E467
  RTI
@E467:
  TAX
  LDY #$00
  .byte $14
  LDX $1506
  .byte $02, $FC
  BEQ $E473
  ORA ($EE),Y
  ASL $00,X
  ORA ($10,X)
  .byte $2F, $13, $FC
  PHP
  .byte $02, $07
  ORA $02
  NOP
  BRK
  ROL $2C
  .byte $1F, $2F
  BPL $E501
@E488:
  .byte $FC
  BEQ $E48C
  ORA ($EE,X)
  ASL $00,X
  ORA ($10,X)
  .byte $2F, $13, $FC
  BEQ $E497
  JSR $FCE4 ; → bank switch?
  ORA ($10,X)
  ASL $02
  SBC $16,X
  .byte $FC
  ORA ($03,X)
  LDY $07
  AND $0100
  BIT $290E
  ADC $F0FC,Y
  ORA ($51,X)
  SBC $08FC
@E4B2:
  SBC $2D,X
  BRK
  .byte $14, $2F
  BPL $E532
  .byte $FC
  BEQ $E4BD
  AND ($ED,X)
  .byte $FC
  ORA ($EC,X)
  .byte $FC
  PHP
  TAX
  LDY #$00
  .byte $14
  LDX $1506
  .byte $02
  ADC $F0FC,Y
  SBC $02,X
  BEQ $E4D3
  ORA ($ED),Y
  .byte $FC
  ORA ($EC,X)
  .byte $FC
  BEQ $E4DB
  .byte $52
@E4DB:
  INC $01FC
  LSR $C3
  ADC $FC79,X
  BEQ $E4E6
  JSR $FCE4 ; → bank switch?
  ORA ($1B,X)
  PHP
  .byte $02
  SBC $16,X
  .byte $FC
  ORA ($03,X)
  LDY $07
  AND $0100
  BIT $290E
  ADC $F0FC,Y
  ORA ($62,X)
  INC $01FC
@E501:
  LSR $C3
  ADC $FC79,X
  PHP
  TAX
  LDY #$00
  .byte $14
  LDX $1506
  .byte $02
  ADC $F0FC,Y
  ORA ($5C,X)
  LDA $2F10
  ADC $19ED,Y
  .byte $FC
  ORA ($6B,X)
  ADC $6E68,X
  LDX $4E,Y
  ADC $79C5,X
  .byte $FC
  BEQ $E529
  CPY #$26
  .byte $0C
  ADC $F0FC,Y
  .byte $04, $62, $0F
  ORA $0A00,Y
  .byte $B3
  ROL A
  LDX $2D5F,Y
  .byte $FC, $04
  CPX $A0
  .byte $FC
  ORA ($5C,X)
  ROR $6B,X
  ADC $100C,X
  ADC $F0FC,Y
  ORA ($11,X)
  SBC $01FC
  CMP $516E
  ROR $79B6
  .byte $FC
  BEQ $E557
  EOR ($EE),Y
  .byte $FC
  ORA ($F5,X)
  AND $4600
  .byte $6F, $54
  ADC $F0FC,Y
  ORA ($22,X)
  INC $08FC
  SBC $2D,X
  .byte $FC
  ORA ($E3,X)
  .byte $FC
  BEQ $E571
  .byte $62
@E571:
  CMP ($4D),Y
  .byte $54
  ASL $00,X
  ORA ($10,X)
  .byte $2F, $13, $FC
  ORA ($F5,X)
  NOP
@E57E:
  .byte $FC
  ORA ($1A,X)
  CLC
  ASL $04
  .byte $2F
  BPL $E57E
  .byte $03
  ADC $F0FC,Y
  ORA ($52,X)
  INC $01FC
  SBC $2D,X
  BRK
  CMP $6B
  .byte $6F
  PHA
  ADC $F0FC,Y
  ORA ($12,X)
  INC $08FC
  SBC $2D,X
  BRK
  NOP
  LDX $02
  BPL $E620
  .byte $FC
  BEQ $E5AB
  .byte $12
@E5AB:
  INC $01FC
  SBC $16,X
  BRK
  AND ($06,X)
  .byte $03
  ADC $F0FC,Y
  .byte $F2
  ORA ($5C,X)
  LDA $2F10
  ADC $19ED,Y
  .byte $FC
  ORA ($1B,X)
  LDA ($00,X)
  ANC #$2E
  ASL $08
  .byte $14
  BCS $E645
  .byte $FC
  BEQ $E5D0
  ADC ($AA,X)
  LDY #$FC
  ORA ($E4,X)
  ORA $01FC,Y
  .byte $02
@E5D9:
  .byte $07
  ORA $02
  .byte $23
  BRK
  ROL $2C
  .byte $1F, $2F
  BPL $E65D
  .byte $FC
  BEQ $E5D9
  ORA ($6C,X)
  LDA $2F10
  ADC $19ED,Y
  .byte $FC
  ORA ($1B,X)
  LDA ($00,X)
  ANC #$2E
  ASL $08
  .byte $14
  BCS $E674
  .byte $FC
  PHP
  TAX
  LDY #$00
  .byte $14
  LDX $1506
  .byte $02
  ADC $F0FC,Y
  ORA ($5C,X)
  LDA $2F10
  ADC $19ED,Y
  .byte $FC
  ORA ($BE,X)
  ADC $0048,X
  .byte $42
  PLA
  ADC ($7D),Y
  TSX
  .byte $72
  ROR $7979
  .byte $FC
@E620:
  BEQ $E62A
  .byte $42
  BRK
  BRK
  BRK
  ADC $FC79,Y
  BEQ $E62C
  .byte $5C
@E62C:
  LDA $2F10
  ADC $19ED,Y
  .byte $FC
@E633:
  ORA ($B1,X)
  ROL $2E0C
  LSR $C47D
  ROR $79B6
  .byte $FC
  BEQ $E633
  .byte $F4, $07, $62
  STX $49,Y
  STX $63,Y
  STX $01,Y
  .byte $E2
  EOR $7D69
  LDA $01FC
  SBC $01FC
  .byte $C3, $67
  ROR $2D4D
  BRK
  PHP
  .byte $A7, $0C
@E65D:
  .byte $13, $02
  AND #$79
  .byte $FC
  BEQ $E665
  .byte $E2
@E665:
  EOR $7D69
  LDA $01FC
  SBC $01FC
  BPL $E675
  ROL A
  .byte $13, $02
  AND #$79
@E675:
  .byte $FC
  BEQ $E679
  .byte $52
@E679:
  CPX $FC
  ORA ($1C,X)
  .byte $2F, $14, $AF
  ANC #$2A
  BPL $E6FD
  .byte $FC
  BEQ $E688
  .byte $22
@E688:
  CPX $FC
  PHP
  SBC $2D,X
  .byte $FC
  ORA ($E2,X)
  .byte $FC
  BEQ $E694
  BNE $E695
@E695:
  BRK
  PHP
  .byte $2F
  ADC $01FC,Y
  LDY $6F,X
  .byte $52
  LDY #$00
  BPL $E6CA
  ORA $02,X
  ADC $F0FC,Y
  ORA ($61,X)
  TAX
  LDY #$FC
  ORA ($E0,X)
  ORA $01FC,Y
  .byte $02, $07
  ORA $02
  .byte $23
  BRK
  ROL $2C
  .byte $1F, $2F
  BPL $E736
  .byte $FC
  BEQ $E6CA
  EOR ($F6),Y
  CMP ($4D),Y
  .byte $54
  ASL $00,X
  ORA ($10,X)
  .byte $2F
@E6CA:
  .byte $13, $FC
  ORA ($0A,X)
  .byte $B3
  ROL A
  LDX $165F,Y
  BRK
  ORA $2F,X
  BPL $E751
  .byte $FC
  BEQ $E6DC
  JMP $1F07
  .byte $2F
  BPL $E75A
  BRK
  CLV
  .byte $F7, $03
  ADC #$79
  ADC $F0FC,Y
  ORA ($42,X)
  ORA $05
  .byte $F7, $04, $2F, $14
  ADC $FC79,Y
  BEQ $E6F8
  .byte $42
@E6F8:
  .byte $03
  BIT $04F7
  .byte $6F
@E6FD:
  ADC $FC79,Y
  BEQ $E703
  .byte $42
@E703:
  .byte $03
  ORA $05
  .byte $F7, $04, $6F
  ADC $FC79,Y
  BEQ $E70F
  .byte $42
@E70F:
  ORA $05
  .byte $F7, $04, $6F
  ADC $FC79,Y
  BEQ $E71A
  ORA ($ED),Y
  ASL $00,X
  ORA ($10,X)
  .byte $2F, $13, $FC, $04, $02, $07
  ORA $02
  NOP
  BRK
  ROL $2C
  .byte $1F, $2F
  BPL $E7A8
  .byte $FC
  BEQ $E733
  .byte $5C
@E733:
  INC $04FC
@E736:
  SBC $2D,X
  BRK
  .byte $14, $2F
  BPL $E7B6
  .byte $FC
  BEQ $E741
  CPY #$47
  .byte $44, $44, $44
  ADC $75,X
  .byte $F7, $07, $6F
  ADC $FC79,Y
  BEQ $E750
  JMP $0505
  .byte $7C, $2F
@E754:
  .byte $14
  BRK
  NOP
  ROL $080F
@E75A:
  TAX
  ADC $FC79,X
  BEQ $E754
  ORA ($65,X)
  .byte $97, $7B, $97
  ORA ($51,X)
  .byte $0F
  ROL A
  AND $E400
  LDY #$FC
  ORA ($18,X)
  LDX $0A
  JSR $0016
  .byte $02, $2F
  BPL $E7F2
  .byte $FC
  BEQ $E77D
  ADC ($05,X)
  .byte $7C, $2F, $14
  ADC $01FC,Y
  .byte $0F
  ROL A
  AND $E400
  LDY #$FC
  ORA ($18,X)
  LDX $0A
  JSR $0016
  .byte $07
  .byte $10, $79  ; BPL $980E
  .byte $FC
  BEQ $E799
  .byte $52
@E799:
  INC $D1,X
  EOR $1654
  BRK
  ORA ($10,X)
  .byte $2F, $13, $FC
  ORA ($F5,X)
  LDY #$00
@E7A8:
  NOP
  ROL A
  .byte $12, $0C
  BPL $E7DD
  ADC $2DFC,Y
  .byte $52
  ORA $0D3F
  LDY $02
  .byte $FC
  PHP
  SBC $19,X
  BRK
  .byte $02
  PLP
  .byte $32
  PHP
  TAX
  ADC $F0FC,Y
  ORA ($51,X)
  SBC $01FC
  INC $2D,X
  BRK
  .byte $1F, $23, $2F
  .byte $10, $79  ; BPL $984A
  .byte $FC
  BEQ $E7D5
  .byte $42
@E7D5:
  ASL A
  .byte $B3
@E7D7:
  ROL A
  LDX $165F,Y
  BRK
  ORA $2F,X
  BPL $E7D7
  .byte $02
  ADC $F0FC,Y
  ORA ($52,X)
  LSR $C6
  ASL $00,X
  ORA ($10,X)
  .byte $2F, $13, $FC
  ORA ($02,X)
  .byte $07
@E7F2:
  ORA $02
  NOP
  BRK
  ROL $2C
  .byte $1F, $2F
  .byte $10, $79  ; BPL $9875
  .byte $FC
  .byte $F0, $01  ; BEQ $9800
  .byte $41
  `;
}

// $9800-$9BFF (1024B): $9800-$9BFF 代码/数据段7
function build_9800_9BFF_seg7(): readonly number[] {
  return asm`
  LSR $C6
  NOP
  JMP $7D71
  .byte $54
  AND $0E1C
  .byte $A3
  ORA $02,X
  ADC $F0FC,Y
  .byte $F4
  ORA ($16,X)
  TYA
  BIT $98
  ORA ($12,X)
  INC $01FC
  AND ($06,X)
  .byte $2F, $13, $07
  BPL $E89B
  .byte $FC
  BEQ $E826
  .byte $12
@E826:
  INC $01FC
  AND ($06,X)
  .byte $2F, $13, $02, $2F
  BPL $E8AA
  .byte $FC
  BEQ $E835
  .byte $12
@E835:
  INC $01FC
  LSR $6F
  .byte $54
  ASL $00,X
  AND ($06,X)
  .byte $03
  ADC $F0FC,Y
  ORA ($12,X)
  INC $01FC
  .byte $E3
  ADC $F0FC,Y
  ORA ($51,X)
  SBC $01FC
  ASL $0128
  .byte $02
  ASL $00,X
  .byte $02
  PHP
  ADC $F0FC,Y
  ORA ($51,X)
  INC $01FC
  ASL $0128
  .byte $02
  ASL $00,X
  .byte $02
  PHP
  ADC $F0FC,Y
  ORA ($52,X)
  INC $FC23
  ORA ($0E,X)
  PLP
  ORA ($03,X)
  ADC $FC79,Y
  BEQ $E87C
  JMP ($7C05)
  .byte $2F
  ADC $01FC,Y
  INC $FC23
  ORA ($14,X)
  ROL $F7AA
  .byte $02
  ADC $F0FC,Y
  ORA ($51,X)
  INC $FC23
  ORA ($BA,X)
  BVS $E905
  .byte $CF
  ADC $F0FC,Y
@E89B:
  ORA ($52,X)
  INC $04FC
  .byte $E3
  ADC $F0FC,Y
  ORA ($51,X)
  INC $01FC
  ASL $0128
  .byte $02
  ASL $00,X
  .byte $02
  PHP
  ADC $F0FC,Y
  ORA ($51,X)
  INC $FCA0
  ORA ($21,X)
  ASL $2F
  BPL $E938
  .byte $FC
  BEQ $E8C3
  .byte $52
@E8C3:
  INC $FC23
  ORA ($21,X)
  ASL $2F
  BPL $E949
  ADC $F0FC,Y
  ORA ($6C,X)
  ORA $7C
  .byte $2F, $14
  ADC $01FC,Y
  INC $FC23
  ORA ($0E,X)
  PLP
  ORA ($02,X)
  ASL $00,X
  .byte $02
  PHP
  ADC $F0FC,Y
  ORA ($51,X)
  INC $FC23
  ORA ($02,X)
  .byte $2F
  BPL $E96D
  ADC $F0FC,Y
  ORA ($22,X)
  CPX $FC
  PHP
  .byte $07
  BIT $02AE
  .byte $14
  ASL A
  ANC #$AD
  .byte $FC
  ORA ($06,X)
  BIT $100C
  .byte $2F
  ADC $F0FC,Y
  ORA ($12,X)
  CPX $FC
  PHP
  ASL $2C
  .byte $0C
  BPL $E98E
  .byte $FC
  BEQ $E90A
  ORA ($51,X)
  CPX $FC
  .byte $04, $E2
  ADC $F0FC,Y
  ORA ($10,X)
  CPX $FC
  ORA ($BA,X)
  BVS $E997
  .byte $CF
  ADC $F0FC,Y
  .byte $F2
  ORA ($5C,X)
  CPX $19
  .byte $FC
  ORA ($E0,X)
  ADC $F0FC,Y
@E938:
  ORA ($E0,X)
  .byte $03
  ORA $2A,X
  ADC $04FC,Y
  ASL A
  ROL A
  LDY #$79
  .byte $FC, $04
  CPX #$AA
  ADC $797D,X
  ADC $F0FC,Y
  ORA ($D0,X)
  JMP ($274C)
  ORA $1100,Y
  ASL $27
  AND $01FC
  JSR $130E
  BIT $29
  SED
  .byte $FC
  BEQ $E965
  .byte $52
@E965:
  CPX $FC
  ORA ($F5,X)
  ASL $00,X
  AND ($06,X)
@E96D:
  .byte $2F, $13, $02, $2F
  BPL $E9EC
  .byte $FC
  BEQ $E977
  .byte $52
@E977:
  CPX $FC
  PHP
  .byte $E2, $FC
  BEQ $E97F
  CPY #$03
  .byte $2F
  ADC $0C00,Y
  ROL $03A9
  LDY #$3F
  .byte $3F, $3F, $FC
  BEQ $E98F
@E98E:
  EOR ($AA,X)
  LDY #$00
  ASL A
  .byte $B3
  ROL A
  LDX $165F,Y
  ORA $2F,X
  BPL $EA18
  ADC $F0FC,Y
  ORA ($74,X)
  CPX $19
  .byte $FC
  ORA ($E0,X)
  LDY #$FC
  ORA ($E5,X)
  ORA $16F6,Y
  .byte $FC
  ORA ($12,X)
  .byte $07
  ANC #$0B
  .byte $2F
  BPL $EA29
  .byte $F7, $02
  ADC $F0FC,Y
  ORA ($73,X)
  CPX $19
  .byte $FC
  ORA ($E0,X)
  ADC $01FC,Y
  SBC $19
  INC $16,X
  .byte $FC
  ORA ($12,X)
  .byte $07
  ANC #$0B
  PLP
  .byte $1F, $0C
  BPL $EA47
  .byte $F7, $03
  ADC $F0FC,Y
  ORA ($74,X)
  ORA ($01,X)
  .byte $2F
@E9DE:
  ADC $E400,Y
  ORA $01FC,Y
  CPX #$16
  .byte $FC
  ORA ($E5,X)
  INC $1A,X
  .byte $FC
@E9EC:
  ORA ($12,X)
  .byte $07
  BIT $B1
  .byte $27
  ROL A
  BPL $EA68
  .byte $F7, $03
  ADC $F0FC,Y
  ORA ($73,X)
  ORA $7CA4
  .byte $02
  ADC $E400,Y
  ORA $01FC,Y
  CPX #$79
  .byte $FC
  ORA ($E5,X)
  ORA $2DF6,Y
  .byte $FC
  ORA ($12,X)
  .byte $07
  BIT $B1
  .byte $2F
  BPL $EA8A
  .byte $F7
@EA18:
  .byte $03
  ADC $F0FC,Y
  ORA ($79,X)
  BIT $2F
  BPL $E9DE
  BRK
  CPX $79
  .byte $FC
  ORA ($E0,X)
  LDA $01FC
  SBC $F6
  AND $01FC
  .byte $12, $07
  BIT $B1
  .byte $2F
  BPL $EAAA
  .byte $F7, $03
  ADC $FC79,Y
  BEQ $EA3F
  CPY #$00
  BRK
  BRK
  LDX #$2F
  ADC $FC79,Y
@EA47:
  BEQ $EA4A
@EA49:
  .byte $72
@EA4A:
  INC $01FC
  ASL A
  ROL $32A6
  .byte $03
  ORA $01FC,Y
  SBC ($FC,X)
  ORA ($0B,X)
  PHP
  ROL A
  .byte $12
  TAX
  ADC $7979,X
  .byte $FC
  BEQ $EA64
@EA63:
  BPL $EA49
  .byte $FC
  PHP
  CMP $474D
  BVS $EADB
  EOR ($79),Y
  .byte $FC
  BEQ $EA63
  ORA ($10,X)
  CPX $FC
  ORA ($CD,X)
  EOR $002D
  TAX
  .byte $0C
  BPL $EAF7
  .byte $FC
  BEQ $EA82
  .byte $22
@EA82:
  SBC #$FC
  PHP
  JMP ($3F6E)
  .byte $52
@EA89:
  ADC $01FC,X
  BRK
  BRK
  PLA
  BVC $EB0E
  ROR $7979
  .byte $FC
  BEQ $EA89
  ORA ($20,X)
  LSR A
  .byte $42
  ROR $4D54
  ASL $26,X
  PLP
  .byte $FC
  ORA ($0E,X)
  ROL $030A
  NOP
  .byte $FC
  ORA ($E6,X)
  LDA $FC0D
  BEQ $EAB1
  EOR ($F5),Y
  NOP
  BRK
  .byte $67, $42
  ROR $FC2D
@EAB9:
  ORA ($0A,X)
  .byte $04, $13, $0C, $1F, $2F
  BPL $EAB9
  .byte $03
  ADC $F0FC,Y
  ORA ($51,X)
  INC $19
  .byte $FC
  ORA ($4A,X)
  ADC $7D55,X
  .byte $47, $6F
  PHA
  TAX
  .byte $F7, $03
  ADC $F0FC,Y
  ORA ($51,X)
@EADB:
  INC $19
  .byte $FC
  ORA ($F6,X)
  .byte $47, $6F
  PHA
  TAX
  .byte $F7, $03
  ADC $F0FC,Y
  ORA ($51,X)
  INC $19
  .byte $FC
  ORA ($4D,X)
  ARR #$7D
  .byte $42
  ROR $F7AA
  .byte $03
@EAF7:
  ADC $F0FC,Y
  ORA ($10,X)
  CPX $19
  .byte $FC
  ORA ($F6,X)
  .byte $47, $6F
  PHA
  ADC $F0FC,Y
  ORA ($00,X)
  TAX
  LDY #$00
  SBC $1A,X
@EB0E:
  BRK
  .byte $14
  LDX $1506
  .byte $02
  ADC $F0FC,Y
  .byte $F2
  ORA ($10,X)
  INC $19
  .byte $FC
  ORA ($4D,X)
  ARR #$7D
  .byte $42
  ROR $FC79
  BEQ $EB28
  .byte $62
@EB28:
  CPX $FC
  ORA ($BE,X)
  .byte $42
  ROR A
  PHA
  .byte $54
  ASL $FC,X
  ORA ($E2,X)
  .byte $FC
  BEQ $EB38
  JSR $FCE4 ; → bank switch?
@EB3A:
  ORA ($4A,X)
  ADC $7D55,X
  ASL $27
  ORA $01FC,Y
  .byte $E2, $FC
  BEQ $EB3A
  ORA ($20,X)
  INC $16
  .byte $FC
  ORA ($5C,X)
  PLA
  ADC $6F47,X
  PHA
  LDY #$FC
  ORA ($01,X)
  BPL $EB5E
  .byte $27
  ROL A
  .byte $1F
  ORA $F0FC
  ORA ($20,X)
  INC $16
  .byte $FC
  ORA ($D0,X)
  EOR $69,X
  .byte $53, $74, $47, $6F
  PHA
  LDY #$FC
  ORA ($01,X)
  BPL $EB78
  .byte $27
  ROL A
  .byte $1F
  ORA $F0FC
  ORA ($10,X)
  .byte $47, $6F
  LSR $7D
  NOP
  .byte $FC
  ORA ($E4,X)
  TAX
  ADC $F0FC,Y
  ORA ($52,X)
  CPX $19
  .byte $FC
  ORA ($E0,X)
  ADC $F0FC,Y
  .byte $F4
  ASL $9C
  .byte $9B, $9C, $9B, $AF, $9B, $AF, $9B, $F2
  ORA ($20,X)
  INC $19
  .byte $FC
@EBA2:
  ORA ($F0,X)
  .byte $AF
  ROL $1A13
  .byte $FC
  ORA ($E4,X)
  LDA $FC0D
  BEQ $EBA2
  ORA ($20,X)
  INC $19
  .byte $FC
  ORA ($E4,X)
  ORA $8D00,Y
  .byte $8B
  LDA $FC0D
  ORA ($FC,X)
  BEQ $EBC3
  CPY #$03
  ROR $76,X
  .byte $F7
  ASL $6F
  ADC $FC79,Y
  BEQ $EBCF
  CPY #$AA
  .byte $F7
  PHP
  .byte $6F
  ADC $FC79,Y
  BEQ $EBD9
  CPY #$5C
  .byte $73, $42, $64, $F7
  ASL $79
  ADC $F0FC,Y
  .byte $F2, $F4
  ORA ($EA,X)
  .byte $9B, $F4, $9B, $F4, $02
  INC $099B,X
  .byte $9C, $1C, $9C
  PHP
  .byte $9C, $F4, $02, $37, $9C
  LSR $9C
  EOR $089C,Y
  .byte $9C
  ORA ($52,X)
  `;
}

// $9C00-$9FFF (1024B): $9C00-$9FFF 代码/数据段8
function build_9C00_9FFF_seg8(): readonly number[] {
  return asm`
  INX
  LDY #$FC
  ORA ($07,X)
  BPL $EC80
  .byte $FC
  BEQ $EC0B
  .byte $62
@EC0B:
  INX
  .byte $FC
  ORA ($E9,X)
  ASL $FC,X
  ORA ($14,X)
  PLP
  ASL $0A
  .byte $1F
  ROL A
  BPL $EC93
  .byte $FC
  BEQ $EC1E
  .byte $72
@EC1E:
  INX
  .byte $FC
  ORA ($E9,X)
  .byte $FC
  ORA ($EA,X)
  BPL $EC38
  .byte $FC
  ORA ($E7,X)
  ASL $2E,X
  ASL $00,X
  ASL $0A
  .byte $1F
  ROL A
  BPL $ECB1
  ADC $F0FC,Y
  ORA ($52,X)
  CPX $16
  .byte $FC
  ORA ($E8,X)
  LDY #$00
  .byte $12, $02
  BPL $ECBD
  .byte $FC
  BEQ $EC48
  .byte $62
@EC48:
  CPX $16
  .byte $FC
  ORA ($E8,X)
  .byte $14, $FC
  ORA ($E9,X)
  LDY #$00
  .byte $12, $02
  BPL $ECD0
  .byte $FC
  BEQ $EC5B
  .byte $62
@EC5B:
  CPX $2D
@EC5D:
  .byte $FC
  ORA ($E8,X)
  BPL $EC73
  .byte $FC
  ORA ($E7,X)
  ASL $2E,X
  LDY #$00
  ASL $0A
  ROL $7DAA
  ADC $F0FC,Y
  ORA ($62,X)
@EC73:
  .byte $0C
  ASL $0C
  .byte $FC
  ORA ($E4,X)
  LDY #$FC
  PHP
  LSR $6F
  .byte $54
  ADC $F0FC,Y
  .byte $F2
  ORA ($51,X)
  CPX $16
  .byte $FC
  ORA ($ED,X)
  LDY #$00
  AND ($06,X)
  .byte $03
  ADC $F0FC,Y
  .byte $F2
@EC93:
  ORA ($52,X)
  ORA $F7
  .byte $02, $6F, $14, $FC
  ORA ($0A,X)
  ASL A
  LDA $5E00
  .byte $42, $6F
  EOR $AA69
  ADC $FC79,X
  BEQ $EC9F
  ORA $CC
  .byte $9C
  INC $9C
  BRK
@ECB1:
  STA $9D1F,X
  LDA ($9D,X)
  INY
  STA $9DEE,X
  JSR $519E
@ECBD:
  .byte $9E
  BVC $EC5D
  .byte $33
  STA $9D80,X
  DEY
  .byte $9E
  LDX $9E,Y
  CMP ($9E),Y
  SBC $019E,X
  .byte $13
  SBC ($19),Y
@ECD0:
  BRK
  PLA
  ADC $ADC2,X
  .byte $FC
  ORA ($0A,X)
  .byte $03
  NOP
  ROL $2E0E
  AND $2100
  ASL $04
  .byte $1F
  ORA $F0FC
  ORA ($14,X)
  .byte $F2
  ORA $6800,Y
  ADC $ADC2,X
  .byte $FC
  ORA ($0A,X)
  .byte $03
  NOP
  ROL $2E0E
  AND $2100
  ASL $04
  .byte $1F
  ORA $F0FC
  ORA ($10,X)
  .byte $0C
  ORA ($02,X)
  NOP
  BRK
  LDX $1303
  ROL $1F19
  .byte $1F, $FC
  ORA ($0A,X)
  .byte $03
  NOP
  ROL $2E0E
  AND $2100
  ASL $04
  .byte $1F
  ORA $F0FC
  ORA ($65,X)
  SBC ($FC),Y
  ORA ($F2,X)
  AND $01FC
  PHP
  TAX
  .byte $0C, $1F, $0C
  BPL $ED26
  .byte $03
  ADC $F0FC,Y
  ORA ($66,X)
  SBC ($24),Y
  LDA ($2A),Y
  AND #$F7
  .byte $02
  ADC $01FC,Y
  .byte $F2
  BRK
  SBC ($2D),Y
@ED43:
  .byte $FC
  ORA ($08,X)
  TAX
  .byte $0C, $1F, $0C
  BPL $ED43
  .byte $03
  ADC $F0FC,Y
  ORA ($75,X)
@ED52:
  .byte $1F
  ANC #$16
  BRK
  NOP
  PHP
  CLC
  .byte $12
  ORA $01FC,Y
  .byte $22, $02, $0C, $32, $03
  LDA ($79),Y
  .byte $FC, $04
  SBC ($00),Y
  .byte $A3, $07, $14, $03
  ORA $040D,Y
  .byte $FC
  ORA ($06,X)
  ORA ($14),Y
  .byte $2F
  BPL $ED77
@ED77:
  .byte $0C, $32, $03
  PLP
  LDA $790D
  .byte $FC
  BEQ $ED82
  ROR $F1
  BRK
  LDA $2E
  CLC
  ROL $FC79
  ORA ($8D,X)
  .byte $8B
  LDY #$2F
  ASL $AD2E
  .byte $FC
  ORA ($24,X)
  LDA ($2A),Y
  .byte $13, $0C, $1F, $2F
  BPL $ED94
  .byte $03
  ADC $F0FC,Y
  ORA ($75,X)
  SBC ($00),Y
  BIT $2F
  BPL $ED52
  ADC $01FC,Y
  .byte $F2
  AND $0800
  TAX
  .byte $0C, $FC
  ORA ($09,X)
  .byte $2F, $0C, $32, $03
  ASL $FC2E
  ORA ($0C,X)
  ROL $310C
  .byte $12
  TAX
  .byte $F7, $03
  ADC $F0FC,Y
  ORA ($75,X)
  SBC ($00),Y
  .byte $0C, $32, $03
  PLP
  ADC $04FC,Y
  .byte $07, $32, $03
  LDY $03
  .byte $FC
  ORA ($F2,X)
  AND $0800
  TAX
  .byte $0C, $FC
  ORA ($F1,X)
  BRK
  AND $03
  .byte $0C, $32, $03
  TAX
  .byte $7C
  ADC $F0FC,Y
  ORA ($71,X)
  SBC ($00),Y
  AND $03
  .byte $0C, $32, $03
  ADC $04FC,Y
  ASL $12
  .byte $13
  ORA $1500,Y
  ASL $1F
  .byte $14, $FC
  ORA ($A3,X)
  .byte $07
  ASL $192E
  ORA $0004
  .byte $12, $AF
  ANC #$08
  ROL $01FC
  .byte $F2
  AND $2400
  LDA ($28),Y
  .byte $1F, $0C
  BPL $EE97
  .byte $FC
  BEQ $EE22
  ADC $2E13,Y
  ANC #$02
  BRK
  CMP ($74,X)
  EOR ($4D,X)
  PHP
  ROL $04FC
  BIT $B1
  ROL A
  AND #$79
  ADC $01FC,Y
  ASL $1E,X
  ROL $A600
  AND ($2E),Y
  ORA #$2F
  .byte $0C, $32, $03
  ASL $FC,X
  ORA ($4A,X)
  .byte $5F
  AND $0D00
  ORA $1022
  ADC $F0FC,Y
  ORA ($79,X)
  ASL $1E,X
  ROL $0079
  .byte $B7
  ADC #$5F
  ROR $2EA2
  TAX
  ROL $01FC
  ASL $0C,X
  .byte $C2, $42, $52
  AND $2400
  LDA ($2F),Y
  BPL $EEEB
  ADC $04FC,Y
  .byte $12, $02
  ASL $00,X
  ORA #$2F
  .byte $0C, $32, $03
  ASL $FC2E
  ORA ($0C,X)
  ROL $310C
  .byte $12
  TAX
  ADC $FC79,X
  BEQ $EE8A
  ADC ($28,X)
  .byte $32, $03
  LDX #$2E
  BRK
  LDX $1303
  ROL $1F19
  .byte $1F
@EE97:
  .byte $FC
  ORA ($0C,X)
  .byte $32, $03
  LDA ($1A),Y
  BRK
  .byte $04
  ROL $3211
  .byte $03
  ASL $162E
  .byte $FC
  ORA ($23,X)
  ORA ($0A),Y
  ANC #$2A
  .byte $1F, $0C
  BPL $EEA9
  .byte $02
  ADC $F0FC,Y
  ORA ($61,X)
  SBC ($00),Y
  .byte $F2, $FC
  ORA ($14,X)
  .byte $23
  ASL $00,X
  AND $A7
  .byte $27, $A7, $FC
  ORA ($1B,X)
  .byte $07
  BIT $AA09
  .byte $F7, $03
  ADC $F0FC,Y
  ORA ($71,X)
  PLP
  .byte $32, $03
  LDX #$2E
  .byte $FC
  ORA ($26,X)
  PHP
  BRK
  BPL $EEEF
  ASL $02
  .byte $1F, $0C
  BPL $EE85
  .byte $FC
  ORA ($0C,X)
  .byte $32, $03
  LDA ($1A),Y
  BRK
  STA $0E8B
  ROL $FC16
  ORA ($25,X)
  TAX
  CLC
  .byte $27
  ROL A
  .byte $1F
  ORA $F0FC
  ORA ($71,X)
  .byte $12, $02
  ASL $00,X
  ORA #$2F
  ORA ($30),Y
  PHP
  .byte $12
  ASL $A7
  ADC $08FC,Y
  SBC ($00),Y
  .byte $F2
  BRK
  .byte $14, $23
  ASL $FC,X
  ORA ($01,X)
  ORA $0019
  ANC #$02
  .byte $0C
  ORA ($02,X)
  ASL $FC,X
  ORA ($19,X)
  LDA #$21
  ASL A
  .byte $14
  ASL $00,X
  ORA $28,X
@EF2C:
  .byte $1F, $0C
  BPL $EF2C
  BEQ $EF33
  EOR ($E4),Y
  ORA $04FC,Y
  BNE $EF8E
  ADC #$53
  .byte $74, $47, $6F
  PHA
  ADC $F0FC,Y
  .byte $F4, $04, $52, $9F
  SBC ($9F,X)
  .byte $8B
  LDY #$2A
  LDA ($25,X)
  LDX #$92
  LDX #$02
  .byte $A3
  SBC $02,X
  INX
  PHP
  .byte $3F, $3F, $3F, $3F, $FC
  INX
  .byte $1B, $03
  ADC $002E,X
  BPL $EF65
  PHP
  .byte $12
@EF65:
  TAX
  ADC $01FC,X
  NOP
  BIT $08
  BRK
  STA ($C7,X)
  BVC $EFDF
  ORA $0C
  .byte $13
  ROL $79
  .byte $FC
  CPX #$11
  .byte $0F, $03
  ASL $00
  .byte $1F
  BPL $EFEC
  BVC $EFCE
  ASL $FC,X
  ORA ($18,X)
  AND ($2A,X)
  .byte $2F
  ADC $6C00,X
  EOR #$24
@EF8E:
  CLC
  ADC $E0FC,Y
  .byte $04, $1C
  ROL $1800
  .byte $13
  BIT $2E
  ORA $02,X
  .byte $63
  ROR $FC79
  BCS $EFB2
  .byte $03, $2F
  ADC $10FC,Y
  CLC
  .byte $3F
  CLC
  AND ($08,X)
  ORA $2F,X
@EFAE:
  .byte $13, $07
  BPL $EFAE
@EFB2:
  LDY #$07
  BIT $2F
  INY
  BRK
  CLC
  ROL $03
  .byte $3F, $3F, $3F, $FC
  RTI
  .byte $87
  LDX #$7C
  BRK
  LDX #$F7
  .byte $02, $FC
  PHP
  BRK
  ORA $0024
  ORA $FC24
  .byte $80, $87
  BRK
  LDX #$F7
  .byte $02, $FC
  PHP
  ORA $2724
  .byte $F7, $03, $FC, $F3
@EFDF:
  .byte $BF, $9F
  SBC $02,X
  INX
  .byte $1C
  ANC #$01
  BRK
  ASL A
  ORA $070B,Y
@EFEC:
  LDX $152E
  BRK
  .byte $0C
  ORA ($02,X)
  .byte $FC, $04, $13
  ROL $0206
  ASL $00,X
  ORA $29,X
  ORA $7806,Y
  `;
}

// ═══════════════════════════════════════════════════
// Assemble all sections into full 8KB bank
// ═══════════════════════════════════════════════════
const _PRG_BANK_24: readonly number[] = [
  ...build_8000_83FF_seg1(),
  ...build_8400_87FF_seg2(),
  ...build_8800_8BFF_seg3(),
  ...build_8C00_8FFF_seg4(),
  ...build_9000_93FF_seg5(),
  ...build_9400_97FF_seg6(),
  ...build_9800_9BFF_seg7(),
  ...build_9C00_9FFF_seg8(),
];
