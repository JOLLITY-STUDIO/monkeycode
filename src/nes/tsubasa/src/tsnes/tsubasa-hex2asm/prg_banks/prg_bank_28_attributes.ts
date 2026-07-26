/**
 * PRG-ROM MMC3 bank 28 (8KB) — function-based assembly
 * Mapper: 4 (MMC3) | CPU: $8000-$9FFF
 * CDL: code=2871 data=4189 unaccessed=1132
 *
 * 功能: 球员属性/数据查询 + 属性数据表
 *
 * Pattern: 参考 bank_31.ts
 *   每个 build_xxx() 函数返回其覆盖地址范围的 raw 6502 字节，
 *   最后通过 spread 拼成完整的 8KB 数组
 */


import { asm } from '../_6502asm';
export { _PRG_BANK_28 as default };

console.log('[prg_28_attributes] loaded');

// $8000-$83FF (1024B): $8000-$83FF 代码/数据段1
function build_8000_83FF_segN(): readonly number[] {
  return asm`
  JMP $802D
  JMP $8B22
  JMP $8609
  JMP $8C06
  JMP $8D58
  JMP $8DA6
  JMP $819D
  JMP $8224
  JMP $828F
  JMP $852E
  JMP $846A
  JMP $8021
  JMP $82CA
  JMP $84FF
  JMP $84C1
  JSR $803A ; → bank switch?
  LDA $9E4E,Y
  STA $32
  LDA #$00
  STA $33
  RTS
  PHA
  JSR $C50C ; → bank switch?
  LDY #$00
  LDA ($34),Y
  BNE @E050
  PLA
  PHA
  SEC
  SBC #$0B
  TAY
  LDA $818E,Y
  TAY
  LDA ($38),Y
@E050:
  CMP #$23
  PHP
  BCC @E064
  PHA
  LDY #$01
  LDA ($34),Y
  BPL @E061
  PLA
  INY
  LDA ($34),Y
  PHA
@E061:
  PLA
  SBC #$23
@E064:
  LDY #$00
  STY $33
  ASL A
  ROL $33
  ASL A
  ROL $33
  STA $32
  PLP
  BCC @E083
  LDY $33
  ASL A
  ROL $33
  ADC $32
  STA $32
  TYA
  ADC $33
  STA $33
  LDY #$02
@E083:
  CLC
  LDA $32
  ADC $8199,Y
  STA $32
  LDA $33
  ADC $819A,Y
  STA $33
  PLA
  CPX #$1F
  BCC @E09A
  JMP $813F
@E09A:
  PHA
  PLA
  BEQ @E0A8
  CMP #$0B
  BEQ @E0A8
  CMP #$1E
  BEQ @E0A8
  CMP #$1F
@E0A8:
  PHP
  LDY #$00
  LDA ($32),Y
  STY $33
  PLP
  BNE @E0D1
  ASL A
  ROL $33
  ASL A
  ROL $33
  ASL A
  ROL $33
  ADC #$86
  STA $32
  LDA $33
  ADC #$AE
  STA $33
  TXA
  BEQ @E0CB
  SEC
  SBC #$17
@E0CB:
  TAY
  LDA ($32),Y
  JMP $80F9
@E0D1:
  ASL A
  ROL $33
  ASL A
  ROL $33
  ASL A
  ROL $33
  LDY $33
  STA $32
  ASL A
  ROL $33
  ADC $32
  STA $32
  TYA
  ADC $33
  STA $33
  CLC
  LDA $32
  ADC #$CE
  STA $32
  LDA $33
  ADC #$9F
  STA $33
  TXA
  TAY
  TXA
  BEQ @E113
  LDA ($32),Y
  PHA
  LDY #$03
  LDA ($34),Y
  ASL A
  STA $32
  PLA
  ADC $32
  TAY
  CPY #$C0
  BCC @E110
  LDY #$BF
@E110:
  STY $32
  RTS
@E113:
  LDA ($32),Y
  PHA
  LDY #$03
  LDA ($34),Y
  STA $32
  PLA
  ADC $32
  CMP #$5F
  BCC @E125
  LDA #$5F
@E125:
  LDY #$9F
  ASL A
  BCC @E12B
  INY
@E12B:
  STY $33
  LDY #$0E
  STY $32
  TAY
  LDA ($32),Y
  TAX
  INY
  LDA ($32),Y
  STA $33
  STX $32
  JMP $818B
  CPX #$25
  BCS @E17E
  LDY #$01
  LDA ($32),Y
  DEY
  STY $33
  ASL A
  ROL $33
  ASL A
  ROL $33
  STA $32
  LDY $33
  ASL A
  ROL $33
  ADC $32
  STA $32
  TYA
  ADC $33
  TAY
  LDA $32
  CLC
  ADC #$AE
  STA $32
  TYA
  ADC #$AF
  STA $33
  TXA
  SEC
  SBC #$1F
  ASL A
  TAY
  LDA ($32),Y
  TAX
  INY
  LDA ($32),Y
  STA $33
  STX $32
  JMP $818B
@E17E:
  TXA
  SEC
  SBC #$23
  TAY
  LDA ($32),Y
  STA $32
  LDA #$00
  STA $33
  PLA
  PLA
  RTS
  .byte $02, $03, $03, $03, $03, $04
  ORA $04
  ORA $04
  ORA $D6
  STA $62,X
  STX $AD,Y
  .byte $3B, $04
  PHP
  ASL A
  ADC $043B
  ADC $044E
  TAY
  PLP
  BNE @E1BB
  LDA $043C
  AND #$7F
  CMP #$03
  BCC @E1BB
  TYA
  SEC
  SBC $044E
  TAY
@E1BB:
  LDX $8206,Y
  CPX #$FF
  BEQ @E203
  LDA $0441
  JSR $803A ; → bank switch?
  TYA
  PHA
  LDA $043B
  ASL A
  TAX
  LDA $9460,X
  STA $32
  LDA $9461,X
  STA $33
  LDA $043C
  ASL A
  ASL A
  TAY
  LDA ($32),Y
  STA $0444
  INY
  LDA ($32),Y
  TAX
  INY
  LDA ($32),Y
  STA $043F
  INY
  LDA ($32),Y
  AND #$03
  STA $0440
  LDA ($32),Y
  AND #$F8
  LSR A
  LSR A
  LSR A
  STA $0443
  JMP $8278
@E203:
  JMP $8203
  ORA ($07,X)
  .byte $0F, $02
  PHP
  BPL @E210
  .byte $FF, $FF, $02
@E210:
  .byte $FF, $FF, $FF
  ORA #$11
  .byte $FF
  ASL A
  .byte $12, $FF
  ANC #$13
  ORA ($FF,X)
  .byte $FF
  ORA ($FF,X)
  .byte $FF
  ORA ($FF,X)
  .byte $FF
  LDA $043D
  ASL A
  ADC $043D
  ADC $044E
  TAY
  LDX $824C,Y
  LDA $0442
  JSR $803A ; → bank switch?
  TYA
  PHA
  LDA $043D
  ASL A
  TAX
  LDA $9554,X
  STA $32
  LDA $9555,X
  STA $33
  JMP $825B
  .byte $04, $04, $04
  ORA $05
  ORA $06
  ASL $FF16
  .byte $0C, $14, $FF
  ORA $AD15
  ROL $0A04,X
  ASL A
  TAY
  LDA ($32),Y
  STA $0445
  INY
  LDA ($32),Y
  TAX
  INY
  LDA ($32),Y
  STA $043F
  INY
  LDA ($32),Y
  AND #$03
  STA $0440
  STX $32
  PLA
  CLC
  ADC $32
  CMP #$C0
  BCC @E284
  LDA #$BF
@E284:
  TAX
  LDA $9E4E,X
  STA $32
  LDA #$00
  STA $33
  RTS
  LDY $043D
  CPY #$03
  BNE @E29C
  DEY
  TYA
  CLC
  ADC #$03
  TAY
@E29C:
  LDX $82C0,Y
  LDA $05FB
  EOR #$0B
  JSR $803A ; → bank switch?
  TYA
  PHA
  LDA $043D
  ASL A
  TAX
  LDA $959E,X
  STA $32
  LDA $959F,X
  STA $33
  LDA #$00
  STA $0445
  JMP $825B
  ORA $191A,Y
  ORA $1C1E,X
  .byte $1B
  NOP
  NOP
  NOP
  JSR $C52D ; → bank switch?
  LDA #$00
  STA $11
  STA $12
  LDA #$4A
  STA $61
  LDA #$83
  STA $62
  LDA #$00
@E2DD:
  PHA
@E2DE:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $0515
  BNE @E2DE
  LDA #$01
  STA $0515
  PLA
  PHA
  LDX #$00
  JSR $830A ; → bank switch?
  PLA
  CLC
  ADC #$01
  PHA
  JSR $830A ; → bank switch?
  LDA #$80
  STA $0515
  PLA
  CLC
  ADC #$01
  CMP #$0C
  BNE @E2DD
  RTS
  PHA
  LDA #$18
  STA $04A5,X
  LDA #$40
  STA $04A6,X
  PLA
  CLC
  ADC #$11
  LSR A
  ROR $04A6,X
  LSR A
  ROR $04A6,X
  LSR A
  ROR $04A6,X
  ORA #$20
  STA $04A7,X
  INX
  INX
  INX
  LDY #$00
@E32F:
  LDA ($61),Y
  STA $04A5,X
  INX
  INY
  CPY #$18
  BNE @E32F
  LDA #$00
  STA $04A5,X
  TYA
  CLC
  ADC $61
  STA $61
  BCC @E349
  INC $62
@E349:
  RTS
  BRK
  BRK
  CMP #$D2
  .byte $D2, $D2, $D2, $D2, $D2, $D2, $D2, $D2
  CMP #$D2
  .byte $D2, $D2, $D2, $D2, $D2, $D2, $D2, $D2
  BNE @E362
@E362:
  BRK
  BRK
  CPY $FFFF
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF
  CPY $FFFF
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF
  BNE @E37A
@E37A:
  BRK
  BRK
  CMP #$D2
  .byte $D2, $D2
  CPY $FFFF
  .byte $FF, $FF, $FF
  CPY $FFFF
  .byte $FF, $FF, $FF
  CMP #$D2
  .byte $D2, $D2
  BNE @E392
@E392:
  BRK
  BRK
  CPY $FFFF
  .byte $FF
  CPY $FFFF
  .byte $FF, $FF, $FF
  CPY $FFFF
  .byte $FF, $FF, $FF
  CPY $FFFF
  .byte $FF
  BNE @E3AA
@E3AA:
  BRK
  BRK
  CMP #$D2
  CPY $CCFF
  .byte $FF, $FF, $FF
  CPY #$C1
  CPY $C5
  .byte $FF, $FF, $FF, $FF
  CPY $C9FF
  .byte $D2
  BNE @E3C2
@E3C2:
  BRK
  CMP #$CC
  .byte $FF
  CPY $CCFF
  .byte $FF, $FF, $FF, $C2, $FF
  CPY $FFC7
  .byte $FF, $FF, $FF
  CPY $CCFF
  .byte $FF
  CMP #$D0
  BRK
  DEC $CC
  .byte $FF
  CPY $CCFF
  .byte $FF, $FF, $FF
  INY
  .byte $FF
  CPY $FFCD
  .byte $FF, $FF, $FF
  CPY $CCFF
  .byte $FF
  DEC $D0
  BRK
  BRK
  DEC $C3
  CPY $CCFF
  .byte $FF, $FF, $FF
  DEX
  AXS #$CE
  .byte $CF
  `;
}

// $8400-$87FF (1024B): $8400-$87FF 代码/数据段2
function build_8400_87FF_segN(): readonly number[] {
  return asm`
  .byte $FF, $FF, $FF, $FF
  CPY $C6FF
  .byte $C3
  BNE @E40A
@E40A:
  BRK
  BRK
  CPY $FFFF
  .byte $FF
  CPY $FFFF
  .byte $FF, $FF, $FF
  CPY $FFFF
  .byte $FF, $FF, $FF
  CPY $FFFF
  .byte $FF
  BNE @E422
@E422:
  BRK
  BRK
  DEC $C3
  .byte $C3, $C3
  CPY $FFFF
  .byte $FF, $FF, $FF
  CPY $FFFF
  .byte $FF, $FF, $FF
  DEC $C3
  .byte $C3, $C3
  BNE @E43A
@E43A:
  BRK
  BRK
  CPY $FFFF
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF
  CPY $FFFF
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF
  BNE @E452
@E452:
  BRK
  BRK
  DEC $C3
  .byte $C3, $C3, $C3, $C3, $C3, $C3, $C3, $C3
  DEC $C3
  .byte $C3, $C3, $C3, $C3, $C3, $C3, $C3, $C3
  BNE @E46A
@E46A:
  LDA #$00
  STA $0628
  LDA $043C
  AND #$3F
  BNE @E498
  LDX $0635
  LDY $0637
  JSR $8499 ; → bank switch?
  TAX
  BNE @E498
  LDA $0638
  JSR $C536 ; → bank switch?
  JSR $8499 ; → bank switch?
  CMP #$00
  BEQ @E498
  CMP #$04
  BEQ @E498
  LDA #$80
  STA $0628
@E498:
  RTS
  LDA $05FB
  BNE @E4A2
  TXA
  EOR #$FF
  TAX
@E4A2:
  CPX #$60
  BCS @E4BE
  TYA
  BPL @E4AB
  EOR #$FF
@E4AB:
  TAY
  JSR $C539 ; → bank switch?
  LDX #$00
@E4B1:
  CMP $8BBE,X
  BEQ @E4BA
  INX
  INX
  BNE @E4B1
@E4BA:
  LDA $8BBF,X
  RTS
@E4BE:
  PLA
  PLA
  RTS
  LDA $05FB
  BEQ @E4F3
  LDA #$00
  STA $043C
  STA $043E
  LDX #$00
  LDA $00E2
  CMP #$1F
  BCS @E4DF
  JSR $8A20 ; → bank switch?
  JSR $8A09 ; → bank switch?
  LDX #$01
@E4DF:
  STX $043B
  LDA $0441
  JSR $8C06 ; → bank switch?
  LDA $0430
  BEQ @E4F0
  LDA $0431
@E4F0:
  STA $043C
@E4F3:
  LDA $00E3
  AND #$01
  EOR $0612
  STA $0612
  RTS
  LDX $05FB
  BEQ @E506
  LDX #$03
@E506:
  LDA $00E2
  ADC $00E3
  LDY #$00
@E50E:
  CMP $8528,X
  BCS @E517
  INY
  INX
  BNE @E50E
@E517:
  TYA
  CLC
  ADC #$07
  LDX $05FB
  BEQ @E524
  STA $043B
  RTS
@E524:
  STA $043D
  RTS
  .byte $B3, $4F
  BRK
  TAX
  .byte $54
  BRK
  LDY #$06
  LDA ($38),Y
  AND #$01
  ASL A
  ADC $061E
  STA $061E
  LDA ($38),Y
  LSR A
  LSR A
  LSR A
  LSR A
  CLC
  ADC #$0A
  STA $0441
  LDA #$00
  STA $3C
  LDY #$07
  LDA ($38),Y
  JSR $8AEB ; → bank switch?
  CLC
  LDA $3C
  ADC #$2E
  STA $3C
  TXA
  ADC #$B1
  STA $3D
  LDA #$00
  STA $043C
  STA $3E
  JSR $8B0B ; → bank switch?
  STA $043B
  LDA $043B
  JSR $C509 ; → bank switch?
  .byte $DF, $87
  SBC #$87
  .byte $83
  STA $83
  STA $83
  STA $83
  STA $83
  STA $83
  STA $83
  STA $A0
  PHP
  LDA ($38),Y
  JSR $895E ; → bank switch?
  LSR A
  LSR A
  CMP #$0F
  BNE @E596
  JSR $8A20 ; → bank switch?
  JMP $8599
@E596:
  CLC
  ADC #$0A
  CMP $0441
  BNE @E5A7
  CLC
  ADC #$01
  CMP #$16
  BCC @E5A7
  LDA #$0C
@E5A7:
  JSR $8A09 ; → bank switch?
  LDA #$01
  STA $043B
  LDA #$00
  STA $043C
  RTS
  LDA #$00
  STA $3D
  LDX $0621
  LDY $8604,X
  TYA
  ASL A
  ASL A
  STA $3E
  INY
  INY
  INY
  INY
  LDA ($3A),Y
  ASL A
  ROL $3D
  ASL A
  ROL $3D
  STA $3C
  LDX $3D
  ASL A
  ROL $3D
  ADC $3C
  STA $3C
  TXA
  ADC $3D
  TAX
  LDA $3C
  CLC
  ADC #$2E
  STA $3C
  TXA
  ADC #$BA
  STA $3D
  JSR $8B0B ; → bank switch?
  STA $043D
  TAX
  LDA $0442
  JSR $8DA6 ; → bank switch?
  LDA $0430
  BEQ @E600
  LDA $0431
@E600:
  STA $043E
  RTS
  BRK
  ORA ($FF,X)
  .byte $02
  BRK
  LDA $05FB
  BEQ @E611
  JMP $875D
@E611:
  LDA $0600
  BEQ @E63E
  LDA #$00
@E618:
  PHA
  LDA #$01
  JSR $C515 ; → bank switch?
  PLA
  PHA
  STA $40
  TAX
  LDA $0601,X
  JSR $863F ; → bank switch?
  PLA
  TAX
  LDA $043D
  STA $060B,X
  LDA $043E
  STA $0606,X
  INX
  TXA
  CMP $0600
  BNE @E618
@E63E:
  RTS
  STA $0442
  JSR $8A62 ; → bank switch?
  LDA #$00
  STA $3C
  LDA $0442
  CMP #$0B
  BNE @E653
  JMP $85B5
@E653:
  LDY $0621
  LDA $86B5,Y
  STA $3C
  BEQ @E663
  JSR $8AB3 ; → bank switch?
  JMP $868E
@E663:
  LDA $0635
  EOR #$FF
  TAX
  LDA #$14
  CPX #$A0
  BCS @E68E
  LDA #$10
  CPX #$60
  BCS @E68E
  LDA $0637
  BPL @E67C
  EOR #$FF
@E67C:
  TAY
  JSR $C539 ; → bank switch?
  LDX #$00
@E682:
  CMP $8BBE,X
  BEQ @E68B
  INX
  INX
  BNE @E682
@E68B:
  LDA $8BBF,X
@E68E:
  LDY #$07
  JSR $8ADE ; → bank switch?
  CLC
  LDA $3C
  ADC #$AE
  STA $3C
  TXA
  ADC #$B8
  STA $3D
  JSR $8B0B ; → bank switch?
  STA $043D
  LDA #$00
  STA $043E
  LDA $3F
  JSR $C509 ; → bank switch?
  TSX
  STX $EB
  STX $10
  .byte $87
  BRK
  .byte $02
  ORA ($00,X)
  BRK
  LDA $043D
  JSR $C509 ; → bank switch?
  INY
  STX $D0
  STX $D8
  STX $E0
  STX $A9
  ORA ($8D,X)
  AND $4C04,X
  .byte $32, $87
  LDA #$02
  STA $043D
  JMP $8732
  LDA #$00
  STA $043D
  JMP $8732
  LDA #$01
  STA $043D
  LDA #$05
  STA $043E
  RTS
  LDA $043D
  JSR $C509 ; → bank switch?
  SBC $FF86,Y
  STX $05
  .byte $87
  PHP
  .byte $87
  LDA #$05
  STA $043D
  RTS
  LDA #$04
  STA $043D
  RTS
  JMP $86D0
  LDA #$01
  STA $043E
  JMP $86FF
  LDA $043D
  JSR $C509 ; → bank switch?
  ASL $2187,X
  .byte $87, $27, $87
  ROL A
  .byte $87
  JMP $86F9
  LDA #$03
  STA $043D
  RTS
  JMP $86D0
  LDA #$01
  STA $043E
  JMP $8721
  LDA $0442
  LDX $043D
  JSR $8D58 ; → bank switch?
  LDA $0430
  BEQ @E743
  LDA $0431
@E743:
  STA $043E
  RTS
  .byte $03, $04, $04, $04, $04
  ORA $06
  ORA $06
  ORA $06
  BRK
  ASL $06
  ASL $06
  .byte $07
  PHP
  .byte $07
  PHP
  .byte $07
  PHP
  LDA $0441
  JSR $8A62 ; → bank switch?
  LDY $0621
  LDA $87C3,Y
  STA $3C
  BEQ @E773
  JSR $8AB3 ; → bank switch?
  JMP $879C
@E773:
  LDA #$14
  LDX $0635
  CPX #$A0
  BCS @E79C
  LDA #$10
  CPX #$60
  BCS @E79C
  LDY $0637
  BPL @E78B
  TYA
  EOR #$FF
  TAY
@E78B:
  JSR $C539 ; → bank switch?
  LDX #$00
@E790:
  CMP $8BBE,X
  BEQ @E799
  INX
  INX
  BNE @E790
@E799:
  LDA $8BBF,X
@E79C:
  LDY #$04
  JSR $8ADE ; → bank switch?
  CLC
  LDA $3C
  ADC #$2E
  STA $3C
  TXA
  ADC #$B1
  STA $3D
  JSR $8B0B ; → bank switch?
  STA $043B
  LDA #$00
  STA $043C
  LDA $3F
  JSR $C509 ; → bank switch?
  .byte $C7, $87
  NOP
  DEY
  SBC $0088,X
  ORA ($02,X)
  BRK
  LDA $043B
  JSR $C509 ; → bank switch?
  .byte $DF, $87
  SBC #$87
  .byte $EF, $87, $F2, $87
  NOP
  .byte $87
  LSR A
  DEY
  EOR $88,X
  RTS
  DEY
  TAY
  DEY
  LDA $00E2
  AND #$20
  BNE @E7E9
  JMP $8927
@E7E9:
  JSR $8927 ; → bank switch?
  JMP $8A3F
  JMP $8933
  LDA #$02
  STA $043B
  JMP $8A3F
  LDA #$03
  STA $043B
  .byte $20
  `;
}

// $8800-$8BFF (1024B): $8800-$8BFF 代码/数据段3
function build_8800_8BFF_segN(): readonly number[] {
  return asm`
  .byte $3F
  TXA
  LDA $043C
  BNE @E849
  LDA #$0C
  STA $3A
@E80B:
  LDA $3A
  CMP $0441
  BEQ @E839
  JSR $C50C ; → bank switch?
  LDY #$06
  LDA ($34),Y
  SEC
  SBC $0635
  BCS @E823
  EOR #$FF
  ADC #$01
@E823:
  CMP #$14
  BCS @E839
  LDY #$08
  LDA ($34),Y
  SEC
  SBC $0637
  BCS @E835
  EOR #$FF
  ADC #$01
@E835:
  CMP #$14
  BCC @E844
@E839:
  INC $3A
  LDA $3A
  CMP #$16
  BNE @E80B
  JMP $87F2
@E844:
  LDA $3A
  JSR $8A09 ; → bank switch?
@E849:
  RTS
  LDA #$00
  STA $043B
  LDA #$0C
  STA $043C
  RTS
  LDA #$00
  STA $043B
  LDA #$0D
  STA $043C
  RTS
  LDA #$02
  STA $043B
  BIT $044B
  BMI @E8A7
  LDA #$80
  STA $044B
  LDA #$0C
@E871:
  PHA
  JSR $C50C ; → bank switch?
  LDY #$01
  LDA #$80
  STA ($34),Y
  INY
  LDA #$C8
  STA ($34),Y
  PLA
  CLC
  ADC #$01
  CMP #$16
  BNE @E871
  LDA #$01
  STA $002F
  LDA #$00
  STA $062D
  LDA $0615
  AND #$BF
  STA $0615
  LDA #$15
  JSR $C54E ; → bank switch?
  BIT $0615
  BPL @E8A7
  JSR $C575 ; → bank switch?
@E8A7:
  RTS
  LDA #$02
  STA $043B
  BIT $044C
  BMI @E8D9
  LDA #$80
  STA $044C
  STA $03F1
  LDA #$C9
  STA $03F2
  LDA #$00
  STA $062D
  LDA $0615
  AND #$BF
  STA $0615
  LDA #$16
  JSR $C54E ; → bank switch?
  BIT $0615
  BPL @E8D9
  JSR $C575 ; → bank switch?
@E8D9:
  RTS
  LDA $043B
  JSR $C509 ; → bank switch?
  INX
  DEY
  INC $F488
  DEY
  .byte $F7
  DEY
  JSR $8927 ; → bank switch?
  JMP $8A3F
  LDA #$05
  STA $043B
  RTS
  JMP $8933
  LDA #$04
  STA $043B
  RTS
  LDA $043B
  JSR $C509 ; → bank switch?
  ANC #$89
  ORA ($89),Y
  .byte $17, $89
  NOP
  .byte $89
  LDA #$04
  STA $043B
  RTS
  LDA #$06
  STA $043B
  RTS
  JMP $8933
  LDA #$06
  STA $043B
  LDA #$01
  STA $043C
  JMP $8911
  LDA #$00
  STA $043B
  LDA $044E
  STA $043C
  RTS
  LDY #$0A
  LDA ($3A),Y
  JSR $895E ; → bank switch?
  AND #$03
  PHA
  LDA ($3C),Y
  LSR A
  LSR A
  CMP #$0F
  BEQ @E94D
  CLC
  ADC #$0A
  CMP $0441
  BNE @E950
@E94D:
  JSR $8A20 ; → bank switch?
@E950:
  STA $3C
  PLA
  JSR $C509 ; → bank switch?
  ROR $8489,X
  .byte $89, $93, $89, $9C, $89
  LDX #$00
  STX $3D
  ASL A
  ROL $3D
  ASL A
  ROL $3D
  ASL A
  ROL $3D
  ADC #$2E
  STA $3C
  LDA $3D
  ADC #$B7
  STA $3D
  LDA $00E2
  AND #$07
  TAY
  LDA ($3C),Y
  RTS
  JSR $89B3 ; → bank switch?
  JMP $89A5
  JSR $89B3 ; → bank switch?
  ROR $00E2
  JSR $8A20 ; → bank switch?
  JSR $89B3 ; → bank switch?
  JMP $89A5
  JSR $89B3 ; → bank switch?
  JSR $89DA ; → bank switch?
  JMP $8987
  JSR $89DA ; → bank switch?
  JSR $89B3 ; → bank switch?
  JMP $8987
  LDX $0621
  LDA $89AF,X
  STA $043B
  RTS
  .byte $02, $04, $04, $02
  LDA $3C
  JSR $C50C ; → bank switch?
  LDY #$06
  LDA $0635
  SEC
  SBC ($34),Y
  BCS @E9CA
  LDA $0635
  CMP #$60
  BCC @E9CA
  RTS
@E9CA:
  LDA $3C
  JSR $8A09 ; → bank switch?
  LDA #$01
  STA $043B
  JSR $8A3F ; → bank switch?
  PLA
  PLA
  RTS
  LDA #$0C
  STA $3E
@E9DE:
  LDA $3E
  CMP $0441
  BEQ @E9F0
  JSR $C50C ; → bank switch?
  LDY #$06
  LDA ($34),Y
  CMP #$60
  BCC @E9F9
@E9F0:
  INC $3E
  LDA $3E
  CMP #$16
  BNE @E9DE
  RTS
@E9F9:
  LDA $3E
  JSR $8A09 ; → bank switch?
  LDA #$01
  STA $043B
  JSR $8A3F ; → bank switch?
  PLA
  PLA
  RTS
  STA $05FC
  JSR $C50C ; → bank switch?
  LDY #$06
  LDA ($34),Y
  TAX
  LDY #$08
  LDA ($34),Y
  TAY
  JSR $C539 ; → bank switch?
  STA $0638
  RTS
  LDA $00E2
  ADC $00E3
  AND #$0F
  CMP #$0A
  BCC @EA2E
  SBC #$0A
@EA2E:
  CLC
  ADC #$0C
  CMP $0441
  BNE @EA3E
  ADC #$01
  CMP #$16
  BCC @EA3E
  LDA #$0C
@EA3E:
  RTS
  LDA $0441
  LDX $043B
  JSR $8C06 ; → bank switch?
  LDA $0430
  BEQ @EA50
  LDA $0431
@EA50:
  STA $043C
  TAX
  BNE @EA61
  LDA $043B
  BNE @EA61
  LDA $044E
  STA $043C
@EA61:
  RTS
  PHA
  JSR $C50C ; → bank switch?
  LDY #$00
  LDA ($34),Y
  BNE @EA74
  PLA
  PHA
  TAX
  LDY $8A9D,X
  LDA ($38),Y
@EA74:
  TAX
  LDY #$01
  LDA ($34),Y
  BPL @EA7F
  INY
  LDA ($34),Y
  TAX
@EA7F:
  TXA
  SEC
  SBC #$23
  LDX #$00
  STX $3B
  ASL A
  ROL $3B
  ASL A
  ROL $3B
  STA $3A
  LDX $3B
  ASL A
  ROL $3B
  ADC $3A
  PHA
  TXA
  ADC $3B
  TAX
  PLA
  CLC
  ADC #$62
  STA $3A
  TXA
  ADC #$96
  STA $3B
  PLA
  RTS
  .byte $02, $03, $03, $03, $03, $04
  ORA $04
  ORA $04
  ORA $AD
  AND $06,X
  BPL @EABA
  EOR #$FF
@EABA:
  TAX
  LDA $0637
  BPL @EAC2
  EOR #$FF
@EAC2:
  TAY
  JSR $C539 ; → bank switch?
  LDX #$00
@EAC8:
  CMP $8B9E,X
  BEQ @EAD1
  INX
  INX
  BNE @EAC8
@EAD1:
  LDA $8B9F,X
  LDX $3C
  CPX #$01
  BEQ @EADD
  CLC
  ADC #$0C
@EADD:
  RTS
  STA $3E
  LDA $3C
  STA $3F
  TYA
  CLC
  ADC $3C
  TAY
  LDA ($3A),Y
  LDY #$00
  STY $3D
  ASL A
  ROL $3D
  ASL A
  ROL $3D
  ASL A
  ROL $3D
  ASL A
  ROL $3D
  STA $3C
  LDX $3D
  ASL A
  ROL $3D
  ADC $3C
  STA $3C
  TXA
  ADC $3D
  TAX
  RTS
  LDA $00E2
  AND #$07
  LSR A
  PHP
  CLC
  ADC $3E
  TAY
  LDA ($3C),Y
  PLP
  BCS @EB1F
  LSR A
  LSR A
  LSR A
  LSR A
@EB1F:
  AND #$0F
  RTS
  LDA #$0B
@EB24:
  PHA
  JSR $C50C ; → bank switch?
  LDY #$00
  LDA #$00
  STA ($34),Y
  INY
  STA ($34),Y
  PLA
  CLC
  ADC #$01
  CMP #$16
  BNE @EB24
  LDA $002B
  SEC
  SBC #$03
  ASL A
  TAX
  LDA $BAB2,X
  STA $38
  LDA $BAB3,X
  STA $39
  LDY #$00
  LDA ($38),Y
  AND #$0F
  STA $002E
  LDA ($38),Y
  LSR A
  LSR A
  LSR A
  LSR A
  STA $002F
  LDY #$09
  STY $3A
  LDY $3A
  LDA ($38),Y
  CMP #$0F
  BEQ @EB7E
  CLC
  ADC #$0A
  JSR $C50C ; → bank switch?
  LDY $3A
  INY
  LDA ($38),Y
  INY
  STY $3A
  LDY #$00
  STA ($34),Y
  JMP $8B61
@EB7E:
  LDX $0446
  CPX #$05
  BEQ @EB90
  LDX #$00
  LDA $0384
  CMP #$26
  BNE @EB90
  INX
  INX
@EB90:
  STX $0446
  RTS
  .byte $03, $03, $03, $03, $04
  ORA $04
  ORA $04
  ORA $02
  CLC
  .byte $03
  CLC
  ASL $0F18
  CLC
  NOP
  .byte $1C, $1B, $1C, $1C, $1C
  ORA $261C,X
  .byte $1C, $27, $1C
  PLP
  .byte $1C
  AND #$1C
  .byte $04
  JSR $2005
  BPL @EBDC
  ORA ($20),Y
  BRK
  BRK
  .byte $0C
  BRK
  CLC
  BRK
  BIT $00
  BMI @EBC8
@EBC8:
  .byte $3C
  BRK
  ORA ($00,X)
  ORA $1900
  BRK
  AND $00
  AND ($00),Y
  AND $0200,X
  BRK
  ASL $0300
  BRK
@EBDC:
  .byte $0F
  BRK
  .byte $32, $04
  ROL $3304,X
  .byte $04, $3F, $04, $34, $04
  RTI
  .byte $04
  AND $04,X
  EOR ($04,X)
  NOP
  PHP
  ROL $08
  .byte $1B
  PHP
  .byte $27
  PHP
  .byte $1C
  PHP
  PLP
  PHP
  ORA $2908,X
  PHP
  .byte $04, $0C
  `;
}

// $8C00-$8FFF (1024B): $8C00-$8FFF 代码/数据段4
function build_8C00_8FFF_segN(): readonly number[] {
  return asm`
  BPL @EC0E
  ORA $0C
  ORA ($0C),Y
  CPX #$04
  BCS @EC26
  LDY $044E
  BEQ @EC13
  CPX #$02
  BCS @EC26
@EC13:
  JSR $8DC9 ; → bank switch?
  LDA $0430
  ASL A
  TAY
  LDA ($48),Y
  INY
  CMP ($48),Y
  BNE @EC2C
  CMP #$00
  BNE @EC2C
@EC26:
  LDA #$00
  STA $0430
  RTS
@EC2C:
  TAX
  LDA ($48),Y
  STA $49
  STX $48
  LDA $0430
  LDX #$00
  STX $0430
  JSR $C509 ; → bank switch?
  LSR $8C
  EOR ($8D,X)
  LSR $558D
  STA $00A9
  STA $46
@EC4A:
  LDY $46
  LDA ($48),Y
  LSR A
  LSR A
  STA $47
  LDA ($48),Y
  AND #$03
  CMP #$03
  BEQ @EC7E
  CMP $044E
  BNE @EC62
  JSR $8C7F ; → bank switch?
@EC62:
  INC $46
  LDA $47
  CMP #$08
  BEQ @EC7A
  CMP #$09
  BEQ @EC7A
  CMP #$0A
  BEQ @EC7A
  CMP #$11
  BEQ @EC7A
  CMP #$13
  BNE @EC4A
@EC7A:
  INC $46
  BNE @EC4A
@EC7E:
  RTS
  LDA $47
  SEC
  SBC #$03
  JSR $C509 ; → bank switch?
  .byte $C7
  STY $8CCC
  .byte $C7
  STY $8CC7
  .byte $C7
  STY $8CD4
  .byte $D4
  STY $8CFA
  .byte $C7
  STY $8CC7
  .byte $C7
  STY $8CC7
  .byte $C7
  STY $8CC7
  AND ($8D,X)
  ROL A
  STA $8CD4
  .byte $C7
  STY $8CC7
  .byte $C7
  STY $8CC7
  .byte $C7
  STY $8CC7
  .byte $C7
  STY $8CC7
  .byte $C7
  STY $8CC7
  .byte $C7
  STY $8CC7
  .byte $C7
  STY $8CC7
  .byte $C7
  STY $47A5
  JMP $8E11
  LDA $0446
  CMP #$05
  BEQ @ECC7
  RTS
  LDY $46
  INY
  LDA ($48),Y
  CMP #$FF
  BEQ @ECF7
  STA $45
  LDA #$01
@ECE1:
  PHA
  JSR $C50C ; → bank switch?
  LDY #$00
  LDA ($34),Y
  CMP $45
  BEQ @ECF6
  PLA
  CLC
  ADC #$01
  CMP #$0B
  BNE @ECE1
  RTS
@ECF6:
  PLA
@ECF7:
  JMP $8CC7
  LDY $46
  INY
  LDA ($48),Y
  CMP #$FF
  BNE @ED06
  JMP $8CC7
@ED06:
  LDA #$01
@ED08:
  PHA
  JSR $C50C ; → bank switch?
  LDY #$00
  LDA ($34),Y
  CMP #$1C
  BEQ @ED1D
  PLA
  CLC
  ADC #$01
  CMP #$0B
  BNE @ED08
  RTS
@ED1D:
  PLA
  JMP $8CD4
  BIT $0449
  BPL @ED29
  JMP $8CD4
@ED29:
  RTS
  LDA $0621
  CMP #$04
  BEQ @ED3D
  LDA $002B
  CMP #$21
  BCS @ED3E
  LDA $0448
  BNE @ED3E
@ED3D:
  RTS
@ED3E:
  JMP $8CC7
  LDA $044E
  BNE @ED4D
  LDY #$00
  LDA ($48),Y
  JMP $8E11
@ED4D:
  RTS
  LDY #$00
  LDA ($48),Y
  JMP $8E11
  JMP $8DE2
  TAY
  BNE @ED5E
  JMP $8DA6
@ED5E:
  CMP #$0B
  BNE @ED65
  JMP $8DA6
@ED65:
  CPX #$03
  BCS @ED88
  LDY $044E
  BEQ @ED72
  CPX #$02
  BNE @ED88
@ED72:
  JSR $8DC9 ; → bank switch?
  LDA $0430
  CLC
  ADC #$04
  ASL A
  TAY
  LDA ($48),Y
  INY
  CMP ($48),Y
  BNE @ED8E
  CMP #$00
  BNE @ED8E
@ED88:
  LDA #$00
  STA $0430
  RTS
@ED8E:
  TAX
  LDA ($48),Y
  STA $49
  STX $48
  LDA $0430
  LDX #$00
  STX $0430
  JSR $C509 ; → bank switch?
  .byte $E2
  STA $8DE2
  .byte $E2
  STA $00E0
  BNE @EDBA
  JSR $8DC9 ; → bank switch?
  LDY #$00
  LDA ($48),Y
  INY
  CMP ($48),Y
  BNE @EDC0
  CMP #$00
  BNE @EDC0
@EDBA:
  LDA #$00
  STA $0430
  RTS
@EDC0:
  STA $0431
  LDA #$01
  STA $0430
  RTS
  STX $0430
  STA $47
  JSR $C50C ; → bank switch?
  LDY #$00
  LDA ($34),Y
  ASL A
  TAX
  LDA $8E1B,X
  STA $48
  LDA $8E1C,X
  STA $49
  RTS
  LDY #$00
  LDA ($48),Y
  BPL @EDED
  AND #$7F
  JMP $8E11
@EDED:
  INY
  LDA ($48),Y
  STA $45
  LDA #$01
@EDF4:
  PHA
  JSR $C50C ; → bank switch?
  LDY #$00
  LDA ($34),Y
  CMP $45
  BEQ @EE09
  PLA
  CLC
  ADC #$01
  CMP #$0B
  BNE @EDF4
  RTS
@EE09:
  PLA
  LDY #$00
  LDA ($48),Y
  JMP $8E11
  LDX $0430
  STA $0431,X
  INC $0430
  RTS
  .byte $07, $8F, $17, $8F, $07, $8F, $07, $8F, $07, $8F, $07, $8F, $07, $8F, $07, $8F, $07, $8F, $07, $8F, $07, $8F, $07, $8F, $07, $8F
@EE35:
  .byte $07, $8F, $07, $8F, $07, $8F, $07, $8F
  AND $8F
  .byte $07, $8F, $07, $8F, $33, $8F
  EOR ($8F,X)
  .byte $07, $8F, $4F, $8F
  EOR $6B8F,X
  .byte $8F
  ADC $878F,Y
  .byte $8F
  STA $8F,X
  .byte $A3, $8F, $07, $8F
  LDA ($8F),Y
  .byte $BF, $8F, $07, $8F, $07, $8F
  CMP $DB8F
  .byte $8F, $07, $8F, $07, $8F
  SBC #$8F
  .byte $F7, $8F
  ORA $90
  .byte $13
  BCC @EE93
  BCC @EEA3
  BCC @EEB3
  BCC @EEC3
  BCC @EED3
  BCC @EEE3
  BCC @EEF3
  BCC @EE03
  BCC @EE89
  .byte $8F
  STA ($90),Y
  .byte $9F
  BCC @EE35
  BCC @EE91
  .byte $8F, $BB
  BCC @EE95
  .byte $8F
  CMP #$90
@EE91:
  .byte $D7
  BCC @EE9B
  .byte $8F
@EE95:
  SBC $90
  .byte $F3
  BCC @EE9B
  STA ($07),Y
  .byte $8F, $0F
  STA ($1D),Y
  STA ($2B),Y
  STA ($39),Y
  STA ($47),Y
  STA ($55),Y
  STA ($63),Y
  STA ($71),Y
  STA ($7F),Y
  STA ($8D),Y
  STA ($9B),Y
  STA ($07),Y
  .byte $8F
  LDA #$91
  .byte $B7
  STA ($C5),Y
  STA ($D3),Y
  STA ($07),Y
  .byte $8F
  SBC ($91,X)
  .byte $07, $8F
@EEC3:
  .byte $07, $8F, $07, $8F
  SBC $0B91,X
  .byte $92
  ORA $0792,Y
  .byte $8F, $27, $92, $07, $8F
@EED3:
  AND $92,X
  .byte $43, $92
  EOR ($92),Y
  .byte $5F, $92
  ADC $0792
  .byte $8F, $7B, $92, $89, $92
@EEE3:
  .byte $07, $8F, $97, $92
  LDA $92
  .byte $07, $8F, $B3, $92, $07, $8F
  CMP ($92,X)
  .byte $CF, $92
@EEF3:
  CMP $EB92,X
  .byte $92
  SBC $0792,Y
  .byte $93, $07, $8F, $07, $8F
  ORA $93,X
  .byte $23, $93
  AND ($93),Y
  .byte $3F, $93
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
  EOR $0A93
  STY $10,X
  STY $25,X
  STY $00,X
  BRK
  BRK
  BRK
  BRK
  BRK
  CLI
  .byte $93
  BRK
  BRK
  BRK
  BRK
  .byte $27
  STY $00,X
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
  ROL $94,X
  BRK
  BRK
  BRK
  BRK
  EOR $0093,X
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
  RTS
  .byte $93
  BRK
  BRK
  BRK
  BRK
  AND #$94
  .byte $37
  STY $46,X
  STY $5A,X
  STY $69,X
  .byte $93
  BRK
  BRK
  BRK
  BRK
  ANC #$94
  AND $4894,Y
  STY $5C,X
  STY $72,X
  .byte $93
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
  .byte $74, $93
  BRK
  BRK
  ORA ($94),Y
  AND $0094
  BRK
  LSR A
  STY $00,X
  BRK
  SEI
  .byte $93
  ANC #$94
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ALR #$94
  BRK
  BRK
  NOP
  .byte $93
  BRK
  BRK
  .byte $12
  STY $00,X
  BRK
  .byte $3B
  STY $4C,X
  STY $00,X
  BRK
  ADC $0093,X
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
  .byte $2F
  STY $00,X
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $80, $93
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
  .byte $82, $93
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
  STY $93
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
  STX $93
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
  DEY
  .byte $93
  BRK
  BRK
  .byte $13
  STY $00,X
  BRK
  BRK
  `;
}

// $9000-$93FF (1024B): $9000-$93FF 代码/数据段5
function build_9000_93FF_segN(): readonly number[] {
  return asm`
  BRK
  BRK
  BRK
  BRK
  BRK
  TXA
  .byte $93
  BRK
  BRK
  .byte $14
  STY $00,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  STY $0093
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $3C
  STY $4D,X
  STY $00,X
  BRK
  STX $0093
  BRK
  ORA $94,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  STA ($93),Y
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
  .byte $93, $93
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
  STA $93,X
  BRK
  BRK
  ASL $94,X
  BRK
  BRK
  AND $4E94,X
  STY $00,X
  BRK
  TYA
  .byte $93
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
  TXS
  .byte $93
  BRK
  BRK
  BRK
  BRK
  AND ($94),Y
  ROL $4F94,X
  STY $5E,X
  STY $9F,X
  .byte $93
  BRK
  BRK
  BRK
  BRK
  AND ($94),Y
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  LDY $93
  .byte $0C
  STY $00,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BVC @E023
  BRK
  BRK
  LDX $93
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
  TAY
  .byte $93
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
  .byte $AB, $93
  BRK
  BRK
  .byte $17
  STY $32,X
  STY $00,X
  BRK
  EOR ($94),Y
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $32
  STY $00,X
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $AF, $93
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
  LDA ($93),Y
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
  .byte $B3, $93
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
  CLC
  STY $00,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA $0094
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  LDA $93,X
  BRK
  BRK
  ORA $0094,Y
  BRK
  BRK
  BRK
  .byte $52
  STY $00,X
  BRK
  LDA $0093,Y
  BRK
  BRK
@E122:
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  LDY $0093,X
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
  LDX $0093,Y
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
  CMP ($93,X)
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
  .byte $C3, $93
  BRK
  BRK
  BRK
  BRK
  .byte $33
  STY $3F,X
  STY $53,X
  STY $5F,X
  STY $C8,X
  .byte $93
  BRK
  BRK
  BRK
  BRK
  .byte $33
  STY $00,X
  BRK
  BRK
  BRK
  BRK
  BRK
  CMP $0093
  BRK
  NOP
  STY $00,X
  BRK
  RTI
  STY $54,X
  STY $00,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  EOR ($94,X)
  BRK
  BRK
  BRK
  BRK
  BNE @E122
  ASL $0094
  BRK
  BRK
  BRK
  BRK
  BRK
  EOR $94,X
  BRK
  BRK
  .byte $D2, $93
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
  CMP $93,X
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
  .byte $D7, $93
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
  CMP $0093,Y
  BRK
  .byte $1B
  STY $00,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $DC, $93
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
  .byte $1C
  STY $00,X
  BRK
  .byte $42
  STY $56,X
  STY $00,X
  BRK
  .byte $02
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
  .byte $DF, $93
  BRK
  BRK
  ORA $3494,X
  STY $00,X
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $E3, $93
  BRK
  BRK
  BRK
  BRK
  .byte $34
  STY $00,X
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $E7, $93
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
  SBC #$93
  BRK
  BRK
  ASL $0094,X
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
  .byte $1F
  STY $00,X
  BRK
  .byte $43
  STY $57,X
  STY $00,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  AND $94,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  SBC #$93
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
  SBC $0093
  BRK
  BRK
  BRK
  AND $94,X
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
  JSR $0094
  BRK
  .byte $44
  STY $58,X
  STY $00,X
  BRK
  SBC ($93),Y
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
  AND ($94,X)
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
  .byte $0F
  STY $00,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $F4, $93
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
  INC $93,X
  BRK
  BRK
  .byte $22
  STY $00,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  SBC $0093,Y
  BRK
  .byte $23
  STY $00,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $FB, $93
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
  SBC $0093,X
  BRK
  BIT $94
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $FF, $93
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
  ORA ($94,X)
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
  .byte $03
  STY $00,X
  BRK
  BRK
  BRK
  BRK
  BRK
  EOR $94
  EOR $0094,Y
  BRK
  ORA $94
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
  .byte $03
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
  .byte $07
  STY $00,X
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
  .byte $0C
  NOP
  .byte $12
  AND $11
  PHA
  LSR A
  EOR #$44
  NOP
  .byte $03
  AND $01
  NOP
  EOR ($03,X)
  .byte $14
  ORA $2203,Y
  CLC
  AND $18
  ROL A
  CLC
  AND #$18
  .byte $03, $22, $17
  AND $17
  ROL A
  .byte $17
  AND #$17
  .byte $03
  NOP
  .byte $03
  BMI @E3AA
  NOP
  .byte $03, $1C, $03
  JMP $0319
  BIT $033A
  ROL $7203,X
  .byte $03
  BVC @E389
  .byte $0C, $03, $54
@E389:
  .byte $03
  DEY
  .byte $03
  ROR $03,X
  CLI
  NOP
  .byte $03
  BVC @E396
  .byte $0C, $03
  JMP $03FF
  NOP
  .byte $03, $22, $FF
  AND $FF
  .byte $03, $22, $FF
  AND $FF
  .byte $03, $1C, $03
  ROL $2C03,X
  NOP
@E3AA:
  .byte $03
  BMI @E3E1
  NOP
  .byte $03
  NOP
  .byte $03
  NOP
  .byte $03
  RTS
  .byte $03
  BMI @E3EB
  NOP
  .byte $03, $14
  ORA $3A03,Y
  .byte $03
  NOP
  EOR ($03,X)
  ROL $2A03,X
  .byte $FF
  AND #$FF
  .byte $03
  ROL A
  .byte $FF
  AND #$FF
  .byte $03
  JMP $03FF
  .byte $1C, $03
  BIT $033A
  ROR $7E03,X
  .byte $03
  AND $FF
  .byte $03
  AND $FF
  .byte $03
  PLA
  STA $86
  .byte $03, $64
  STA $86
  .byte $03
  NOP
  .byte $03
  NOP
  .byte $03
@E3EB:
  .byte $72, $03, $0C
  NOP
  STA ($03,X)
  NOP
  JMP ($6003)
  .byte $03
  CLI
  NOP
  .byte $03
  DEY
  .byte $03
  .byte $50, $03  ; BVC $9400
  .byte $54, $03
  .byte $50
  `;
}

// $9400-$97FF (1024B): $9400-$97FF 代码/数据段6
function build_9400_97FF_segN(): readonly number[] {
  return asm`
  .byte $03, $0C, $03
  ROR $03,X
  .byte $0C, $03
  NOP
  .byte $5C, $03
  ORA ($02,X)
  .byte $02, $03, $02, $03
  ORA ($02,X)
  .byte $02, $03, $02, $04, $02, $02
  ASL $02
  .byte $02, $02, $02, $02
  ORA $02
  .byte $02
  ASL $04
  .byte $02, $03
  ORA ($11,X)
  ORA ($01,X)
  .byte $03
  CLC
  .byte $03, $17, $02, $1F, $02
  NOP
  .byte $83, $82, $83
  STY $81
  STA ($02,X)
  CLC
  .byte $02, $17, $83, $83, $83, $02, $02, $83
  STA ($83,X)
  .byte $83, $83, $83
  ORA ($18,X)
  ORA ($17,X)
  STY $82
  .byte $83, $83, $83
  STA ($82,X)
  STY $84
@E453:
  STA ($83,X)
  .byte $82
@E456:
  .byte $83, $83, $83, $83
  ORA ($18,X)
  ORA ($17,X)
  STA ($81,X)
  .byte $74
  STY $00,X
  STA $10,X
  STA $2C,X
  STA $40,X
  STA $44,X
  STA $48,X
  STA $50,X
  STA $50,X
  STA $50,X
  STA $00,X
  ORA ($50,X)
  BRK
  BRK
  ORA $5A
  BRK
  BRK
  ORA $5A
  BRK
  TXA
  ORA $C8,X
  JSR $229A
  RTI
  AND ($80),Y
  BPL @E453
  JSR $1684
  BEQ @E4B0
  STY $11
  INY
  BRK
  .byte $02, $12
  INY
  BRK
  STA $13
  LDY $10,X
  STY $7C23
  AND ($85,X)
  NOP
  INY
  JSR $15A0
  BEQ @E4C8
  CPY #$22
  .byte $72
  AND ($02,X)
  ORA ($A0),Y
  JSR $1886
  NOP
  JSR $1885
  NOP
  JSR $2DA8
  INY
  BMI @E456
  CLI
  BCC @E4F1
  .byte $92, $12
  INY
  BRK
  STX $13
  BRK
  BRK
@E4C8:
  TXA
  .byte $13
  BRK
  BRK
  BCC @E4E4
  BRK
  JSR $1AA0
  BRK
  JSR $0E85
  BRK
  BRK
  STY $0E
  BRK
  BRK
  BEQ @E4ED
  BRK
  JSR $1500
  BRK
  JSR $11FA
  BRK
  BRK
  NOP
  ORA ($00),Y
  BRK
  NOP
@E4ED:
  ORA $0000
  .byte $02
@E4F1:
  .byte $12
  BRK
  JSR $1101
  BRK
  JSR $2198
  BRK
  JSR $14FC
  BRK
  JSR $0200
  .byte $14
  BRK
  .byte $B2
  ORA $28,X
  BRK
  BRK
  NOP
  PLP
  BRK
  .byte $02, $14
  BRK
  BRK
  BRK
  .byte $02
  PLP
  BRK
  BRK
  .byte $07
  NOP
  BRK
  .byte $FC
  ORA $003C
  BRK
  .byte $0C
  BRK
  BRK
  BRK
  .byte $12
  BRK
  BRK
  BRK
  ANC #$00
  BRK
  BEQ @E535
  BRK
  BRK
  BRK
  .byte $0C, $3C
  CLC
  BRK
  JSR $3878
  BRK
@E535:
  BPL @E587
  JSR $1100
  BVC @E55C
  BRK
  .byte $12
  BRK
  BMI @E541
@E541:
  BRK
  ASL A
  BRK
  BRK
  ORA #$28
  BRK
  BRK
  .byte $07
  BVC @E54C
@E54C:
  .byte $FC
  ASL $0000
  BRK
  BRK
  BRK
  BRK
  LSR $6E95,X
  STA $86,X
  STA $8E,X
  STA $96,X
  STA $00,X
  ORA ($46,X)
  BRK
  BRK
  .byte $82
  BCC @E567
  BRK
@E567:
  .byte $1C
  LDY $00,X
  BRK
  ORA $00B4,Y
  BRK
  BRK
  .byte $3C
  BRK
  TYA
  .byte $23
  INY
  BRK
  LDY #$1C
  INY
  BRK
  .byte $FC
  ORA $00C8,Y
  .byte $FC
  ORA $00B4,X
  .byte $FC
  ASL $00
  BRK
  BRK
@E587:
  BRK
  .byte $32
  BRK
  BRK
  .byte $27
  LDY $00,X
  BRK
  .byte $04
  BVC @E592
@E592:
  .byte $FC
  PHP
  BRK
  BRK
  BRK
  ASL $3C
  BRK
  .byte $FC, $0C
  BRK
  BRK
  .byte $B2
  STA $C2,X
  STA $C6,X
  STA $CA,X
  STA $CE,X
  STA $CE,X
  STA $D2,X
  STA $C2,X
  STA $C2,X
  STA $C2,X
  STA $00,X
  PHP
  .byte $14
  BRK
  BRK
  .byte $1B
  BRK
  BRK
  BRK
  .byte $1C
  BRK
  BRK
  BRK
  AND $00
  BRK
  BRK
  ANC #$28
  BRK
  BRK
  JSR $00C8
  DEY
  PHP
  LSR $00
  TYA
  BRK
  .byte $32
  BRK
  TYA
  BRK
  .byte $32
  BRK
  BRK
  BRK
  PHP
  PHP
  ORA ($03,X)
  BVC @E604
  BRK
  .byte $02
  BRK
  BRK
  BRK
  BRK
  CLC
  .byte $04
  ANC #$00
  CLC
  .byte $04
  PHP
  ORA ($10,X)
  .byte $02
  ORA #$01
  ASL $0002
  BRK
  JSR $0600
  .byte $04
  PLP
  BRK
  .byte $07, $04
  SEC
  BRK
  .byte $04
  ASL $18
  BRK
  ORA $07
@E604:
  CLC
  BRK
  ASL A
  PHP
  CLC
  .byte $02
  ANC #$00
  BPL @E610
  BRK
  BRK
@E610:
  BPL @E614
  ORA ($00,X)
@E614:
  BRK
  BRK
  .byte $0C
  BRK
  PHP
  .byte $03, $02, $03
  JSR $0D08
  ORA ($14,X)
  BRK
  ORA $05
  PHP
  BRK
  ASL $1808
  .byte $04, $03, $02
  JSR $0404
  ASL $18
  .byte $02, $0F, $07
  ASL $02,X
  .byte $0F, $07
  CLC
  .byte $02
  BPL @E63E
  BPL @E640
@E63E:
  ORA ($01),Y
@E640:
  RTI
  BPL @E655
  ORA #$20
  .byte $02, $13
  BRK
  JSR $1402
  ORA #$28
  .byte $02
  ORA $00,X
  CLC
  .byte $02
  ASL $00,X
  PHP
@E655:
  BRK
  .byte $17, $03
  CLC
  BRK
  .byte $03
  BRK
  BRK
  BRK
  .byte $02
  BRK
  BRK
  BRK
  .byte $1C
  ASL $00
  .byte $02
  PHP
  .byte $03, $03
  ORA ($01,X)
  ORA ($02,X)
  BRK
  ORA $0006,X
  BRK
  BRK
  .byte $02, $04
  ORA ($01,X)
  ORA ($01,X)
  BRK
  JSR $000A
  JSR $0302
  .byte $03
  ORA ($01,X)
  ORA ($00,X)
  BRK
  ASL $00
  BRK
  BRK
  .byte $03, $03
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $23
  BRK
  BRK
  JSR $0300
  .byte $03
  ORA ($01,X)
  ORA ($03,X)
  BRK
  BIT $00
  BRK
  PLP
  ASL $00
  .byte $03
  ORA ($01,X)
  ORA ($01,X)
  BRK
  .byte $27
  BRK
  BRK
  JSR $0204
  BRK
  ORA ($01,X)
  ORA ($04,X)
  BRK
  PLP
  ANC #$F0
  .byte $02
  PHP
  .byte $03
  ORA $00
  .byte $02, $02
  ORA ($00,X)
  ANC #$0A
  BRK
  BMI @E6CE
  .byte $03, $03
  ORA ($01,X)
  ORA ($06,X)
  BRK
@E6CE:
  BIT $0000
  .byte $02
  ORA #$02
  .byte $03
  BRK
  BRK
  BRK
  .byte $07
  BRK
  AND $FF0B
  BRK
  ORA $0401
  ORA ($01,X)
  ORA ($00,X)
  BRK
  BMI @E6F3
  BEQ @E70A
  ANC #$02
  .byte $02, $02, $02, $02
  ORA ($00,X)
  AND ($0A),Y
  BRK
  BPL @E6F9
  ORA $00
@E6F9:
  BRK
  BRK
  ORA ($04,X)
  BRK
  .byte $34, $0C
  BRK
  .byte $FF
  ORA ($05,X)
  ORA ($00,X)
  BRK
  BRK
  .byte $03
  BRK
@E70A:
  .byte $34, $0C
  BRK
  PHP
  ORA ($05,X)
  ORA ($00,X)
  BRK
  BRK
  .byte $03
  BRK
  .byte $37
  ANC #$F0
  RTS
  ANC #$02
  .byte $02, $03
  ORA ($01,X)
  .byte $03
  BRK
  .byte $0C
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  PHP
  BRK
  NOP
  ORA $0010,X
  ORA $0005,X
  BRK
  BRK
  BRK
  ASL A
  BRK
  AND $0000,X
  BRK
  .byte $0C
  ORA $02
  BRK
  BRK
  BRK
  .byte $0C
  BRK
  RTI
  ASL $4000
  ASL $0505
  .byte $03, $02, $02
  BRK
  BRK
  EOR ($00,X)
  BRK
  BRK
  BRK
  .byte $03
  BRK
  BRK
  BRK
  BRK
  ASL $4200
  ASL A
  BRK
  BRK
  ORA ($01,X)
  BRK
  BRK
  BRK
  BRK
  .byte $0F
  BRK
  .byte $0F
  BRK
  BRK
  BRK
  .byte $04
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  EOR $0A
  BRK
  BRK
  PHP
  .byte $03
  BRK
  BRK
  BRK
  BRK
  .byte $0C
  BRK
  PHA
  .byte $0F
  BRK
  BRK
  .byte $07
  ORA $00
  BRK
  BRK
  BRK
  ASL $4900,X
  .byte $0F
  BRK
  BRK
  .byte $02, $03
  BRK
  BRK
  BRK
  BRK
  .byte $03
  BRK
  JMP $0000
  BRK
  .byte $0F, $03
  BRK
  BRK
  BRK
  BRK
  .byte $02
  BRK
  EOR $0000
  BRK
  BPL @E7AC
@E7AC:
  BRK
  BRK
  BRK
  BRK
  ORA ($00),Y
  LSR $0000
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $12
  BRK
  .byte $12
  BRK
  BRK
  BRK
  BRK
  .byte $02
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $4F
  ASL $1000
  ORA ($00),Y
  BRK
  .byte $03, $02, $02
  ORA $00,X
  BVC @E7E2
  BRK
  BRK
  ORA ($05,X)
  BRK
  BRK
  BRK
  BRK
  .byte $14
  BRK
@E7E2:
  EOR ($00),Y
  BRK
  BRK
  ORA ($03,X)
  BRK
  BRK
  BRK
  BRK
  .byte $14
  BRK
  .byte $52, $02
  BRK
  BRK
  ORA ($05,X)
  BRK
  BRK
  BRK
  BRK
  .byte $14
  BRK
  .byte $53, $02
  BRK
  BRK
  ORA ($05,X)
  `;
}

// $9800-$9BFF (1024B): $9800-$9BFF 代码/数据段7
function build_9800_9BFF_segN(): readonly number[] {
  return asm`
  BRK
  BRK
  BRK
  BRK
  ORA $00,X
  .byte $54
  ORA ($00),Y
  CLC
  ORA ($06,X)
  BRK
  BRK
  BRK
  BRK
  .byte $14
  BRK
  .byte $54
  ORA ($00),Y
  .byte $04
  ORA ($06,X)
  BRK
  BRK
  BRK
  BRK
  .byte $14
  BRK
  EOR $10,X
  JSR $1210
  BRK
  BRK
  .byte $04
  ORA ($01,X)
  ORA $00,X
  LSR $00,X
  BRK
  BRK
  ORA ($00,X)
  BRK
  ORA $00
  BRK
  .byte $14
  BRK
  .byte $57
  BPL @E859
  BPL @E84D
  BRK
  BRK
  .byte $03
  ORA ($01,X)
  ORA $00,X
  CLI
  BPL @E855
  BRK
  .byte $12
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA $00,X
  .byte $13
  BRK
  BRK
  BRK
  .byte $04
  BRK
  BRK
@E855:
  BRK
  BRK
  BRK
  BRK
@E859:
  BRK
  EOR $0000,X
  BRK
  PHP
  ASL $00
  ORA ($00,X)
  BRK
  .byte $03
  BRK
  EOR $0000,X
  BRK
  PHP
  ASL $00
  ORA ($00,X)
  BRK
  .byte $03
  BRK
  ROR $13
  BRK
  PHP
  BPL @E87E
  BRK
  ASL $02
  .byte $02, $02
  BRK
@E87E:
  .byte $67, $13
  BRK
  BPL @E893
  ASL $00
  ASL $02
  .byte $02, $02
  BRK
  ARR #$14
  BRK
  PHP
  .byte $13
  ORA $00
  BRK
  BRK
@E893:
  BRK
  .byte $03
  BRK
  .byte $1B
  BRK
  BRK
  BRK
  ORA $02
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ROR $000A
  BRK
  ORA #$06
  .byte $04
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $6F
  ANC #$10
  RTI
  .byte $04
  ASL $04
  .byte $02, $02, $02
  ORA ($00,X)
  .byte $72, $0F
  BRK
  BRK
  ORA #$06
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA $0000,X
  BRK
  ORA $02
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ADC $0A,X
  BRK
  BPL @E8EC
  ASL $05
  BRK
  .byte $02, $02
  ANC #$00
  ROR $0F,X
  BRK
  BRK
  ORA $06,X
  ORA ($00,X)
  BRK
  BRK
  ORA ($00,X)
  ADC $0013,Y
  BRK
  .byte $13
  ASL $00
  BRK
  BRK
  BRK
  ORA ($00,X)
  .byte $7C, $13
  BRK
  BRK
  PHP
  ASL $00
  BRK
  ORA ($00,X)
  ASL $00,X
  JSR $0000
  BRK
  .byte $03
  ORA ($00,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $7F
  ORA $00,X
  .byte $FF
  ASL $06,X
  .byte $02
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $80
  ANC #$20
  BRK
  ORA #$06
  BRK
  .byte $02, $02, $02, $17
  BRK
  .byte $82
  BRK
  BRK
  BPL @E944
  BRK
  BRK
  BRK
  BRK
  BRK
  ANC #$00
  .byte $83
  ASL $00
  BRK
  PHP
  ASL $03
  ORA ($01,X)
  ORA ($20,X)
  BRK
  STY $07
  BRK
  BPL @E95B
  ASL $02
  BRK
  BRK
  BRK
  .byte $22
  BRK
  STA $00
  BRK
  BRK
  ORA ($03,X)
  BRK
  BRK
  BRK
  BRK
  AND ($00,X)
  STX $00
  CLC
  BRK
  .byte $14
@E95B:
  ORA $00
  .byte $02, $02, $02
  ORA $8800,Y
  ASL A
  BRK
  PHP
  NOP
  ORA $02
  BRK
  ORA ($01,X)
  BIT $00
  .byte $89
  BRK
  BRK
  BRK
  BRK
  ASL $00
  BRK
  BRK
  BRK
  AND $00
  TXA
  NOP
  BRK
  BPL @E984
  BRK
  BRK
  BRK
  .byte $02, $02
@E984:
  ROL $00
  .byte $8B
  BRK
  BRK
  BRK
  ORA ($01,X)
  ORA ($00,X)
  BRK
  BRK
  AND $00
  STY $0000
  BRK
  .byte $14, $03
  BRK
  BRK
  BRK
  BRK
  .byte $27
  BRK
  STA $000A
  BRK
  .byte $0F, $02
  BRK
  BRK
  BRK
  BRK
  AND $00
  .byte $23
  BRK
  BRK
  BRK
  .byte $03, $02
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  STX $001C
  PHP
  .byte $07
  ORA $02
  BRK
  BRK
  BRK
  ROL $8F00
  ASL A
  BRK
  .byte $04, $04, $07
  BRK
  BRK
  BRK
  BRK
  AND $9000
  ASL $00
  BRK
  .byte $14, $07
  BRK
  BRK
  BRK
  BRK
  BIT $9100
  ASL A
  BRK
  BRK
  ASL $07
  BRK
  BRK
  BRK
  BRK
  ROL A
  BRK
  .byte $92
  ASL A
  BRK
  BRK
  ORA #$07
  BRK
  BRK
  BRK
  BRK
  ANC #$00
  .byte $93
  ASL A
  BRK
  BRK
  .byte $12, $07
  BRK
  BRK
  BRK
  BRK
  ROL A
  BRK
  STY $00,X
  .byte $02
  BRK
  .byte $14, $03
  BRK
  BRK
  BRK
  BRK
  AND #$00
  STA $00,X
  .byte $02
  BRK
  .byte $14, $07
  BRK
  BRK
  BRK
  BRK
  AND #$00
  STX $0B,Y
  PHP
  BRK
  ORA ($06,X)
  BRK
  .byte $02, $02, $02
  AND #$00
  .byte $97
  ANC #$20
  BRK
  .byte $12, $07
  BRK
  BRK
  BRK
  BRK
  AND #$00
  BIT $00
  BRK
  BRK
  ORA $00
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  TYA
  .byte $1B
  BRK
  BRK
  .byte $1C
  PHP
  BRK
  BRK
  BRK
  BRK
  .byte $2F
  BRK
  .byte $04
  BRK
  BRK
  BRK
  BRK
  .byte $04
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  CLC
  BRK
  BPL @EA59
  BRK
  BRK
  BRK
@EA59:
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA $0000,Y
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA ($00,X)
  ORA $00
  BRK
  BRK
  ORA ($01,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  NOP
  BRK
  .byte $14, $02
  ORA ($00,X)
  .byte $03
  BRK
  BRK
  ORA ($02,X)
  BRK
  .byte $1B
  BRK
  BRK
  BRK
  ORA ($01,X)
  BRK
  BRK
  BRK
  BRK
  ASL $1E00,X
  BRK
  CLC
  .byte $02
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $1F
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
  .byte $07
  BRK
  BRK
  BRK
  BRK
  ORA ($00,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  AND ($00,X)
  JSR $0103
  BRK
  .byte $03
  BRK
  BRK
  ORA ($00,X)
  BRK
  .byte $22
  BRK
  BRK
  BRK
  BRK
  ORA ($00,X)
  BRK
  BRK
  BRK
  .byte $03
  BRK
  PHP
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
  AND $00
  BRK
  BRK
  ORA ($00,X)
  BRK
  BRK
  BRK
  BRK
  ORA $00
  ROL $00
  BRK
  BRK
  ORA ($01,X)
  BRK
  BRK
  BRK
  BRK
  .byte $04
  BRK
  ORA #$00
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
  AND #$00
  BRK
  BRK
  ORA ($01,X)
  BRK
  BRK
  BRK
  BRK
  ASL $00
  ROL A
  BRK
  BRK
  BRK
  ORA ($00,X)
  BRK
  BRK
  BRK
  ORA ($07,X)
  BRK
  ASL A
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
  ROL $0000
  BRK
  ORA ($00,X)
  BRK
  BRK
  BRK
  BRK
  PHP
  BRK
  .byte $2F
  BRK
  BRK
  BRK
  ORA ($00,X)
  BRK
  BRK
  BRK
  BRK
  PHP
  BRK
  ANC #$00
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $03
  BRK
  .byte $32
  BRK
  BRK
  BRK
  ORA ($00,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $33
  BRK
  BRK
  BRK
  ORA ($00,X)
  BRK
  BRK
  BRK
  BRK
  .byte $03
  BRK
  AND $00,X
  BRK
  BRK
  ORA ($00,X)
  BRK
  BRK
  BRK
  BRK
  PHP
  BRK
  ROL $00,X
  BRK
  BRK
  ORA ($00,X)
  BRK
  BRK
  BRK
  BRK
  .byte $13
  BRK
  ORA $0000
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  SEC
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA #$00
  AND $0000,Y
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ASL A
  BRK
  ASL $0000
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $3B
  BRK
  BRK
  BRK
  ORA ($03,X)
  BRK
  BRK
  BRK
  BRK
  ANC #$00
  .byte $3C
  BRK
  BRK
  BRK
  ORA ($05,X)
  BRK
  BRK
  BRK
  BRK
  ORA $3E00
  BRK
  BRK
  BRK
  ORA ($00,X)
  BRK
  BRK
  BRK
  BRK
  ASL $3F00
  BRK
  BRK
  BRK
  ORA ($00,X)
  BRK
  BRK
  BRK
  BRK
  ASL $1000
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
  .byte $43, $0F
  BNE @EBEA
  ORA $03
  BRK
  BRK
  BRK
  BRK
  ASL $4400,X
  BRK
  BRK
  BRK
  ORA ($00,X)
  BRK
  BRK
  BRK
  BRK
  BPL @EBF6
@EBF6:
  ORA ($00),Y
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

// $9C00-$9FFF (1024B): $9C00-$9FFF 代码/数据段8
function build_9C00_9FFF_segN(): readonly number[] {
  return asm`
  BRK
  BRK
  LSR $0F
  BRK
  BRK
  ORA ($00,X)
  BRK
  BRK
  BRK
  BRK
  .byte $03
  BRK
  .byte $47
  BRK
  BRK
  BRK
  ORA ($00,X)
  BRK
  BRK
  BRK
  BRK
  .byte $03
  BRK
  LSR A
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA ($00),Y
  ALR #$00
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA ($00),Y
  .byte $14
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
  EOR $0000,Y
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  NOP
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $03
  BRK
  ORA $00,X
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
  .byte $5B, $0F
  BRK
  BRK
  ORA ($01,X)
  BRK
  ORA ($01,X)
  ORA ($00,X)
  BRK
  .byte $5C, $0F
  BRK
  BRK
  ORA ($01,X)
  BRK
  ORA ($01,X)
  ORA ($03,X)
  BRK
  ASL $00,X
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
  LSR $000F,X
  BRK
  ORA ($03,X)
  ORA $06
  .byte $02, $02
  BRK
  BRK
  .byte $5F
  BRK
  BRK
  BRK
  BPL @EC9D
  ORA $06
  .byte $02, $02
  ORA ($00,X)
  .byte $17
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
  RTS
  .byte $13
  PHP
  BRK
  BRK
  .byte $03
  ORA $00
  BRK
  BRK
  BRK
  BRK
  ADC ($13,X)
  BRK
  BRK
  BPL @ECBF
  BRK
  BRK
  BRK
@ECBF:
  BRK
  ORA ($00,X)
  CLC
  BRK
  BRK
  BRK
  BRK
  .byte $02
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $62
  BRK
  BRK
  BRK
  ORA ($03,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $63
  BRK
  BRK
  BRK
  BPL @ECE3
  BRK
  BRK
  BRK
@ECE3:
  BRK
  ORA ($00,X)
  ORA $0000,Y
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $64, $13
  BRK
  BRK
  ORA ($03,X)
  .byte $02
  ASL $02
  .byte $02
  BRK
  BRK
  ADC $13
  BRK
  BRK
  ORA ($03,X)
  .byte $02
  ASL $02
  .byte $02, $02
  BRK
  NOP
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
  PLA
  BRK
  BRK
  ORA $0000
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ADC #$13
  BRK
  BRK
  .byte $14, $03
  BRK
  BRK
  ORA ($00,X)
  ASL $00,X
  ROR A
  .byte $13
  BRK
  BRK
  .byte $14, $03
  BRK
  BRK
  ORA ($00,X)
  ASL $00,X
  .byte $1C
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
  JMP ($0000)
  BRK
  BRK
  .byte $03
  BRK
  BRK
  BRK
  BRK
  ORA ($00,X)
  ADC $0000
  BRK
  BRK
  .byte $03
  BRK
  BRK
  BRK
  BRK
  .byte $17
  BRK
  BVS @ED60
@ED60:
  BRK
  BRK
  ORA ($03,X)
  BRK
  BRK
  .byte $02, $02
  ORA ($00,X)
  ADC ($00),Y
  BRK
  BRK
  ORA ($03,X)
  BRK
  BRK
  .byte $02
  BRK
  ORA ($00,X)
  ASL $0000,X
  BRK
  ORA ($00,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $73
  BRK
  BRK
  BRK
  .byte $14, $03
  BRK
  BRK
  BRK
  BRK
  ORA $7400
  BRK
  BRK
  BRK
  .byte $14, $03
  BRK
  BRK
  BRK
  BRK
  ORA $1F00
  BRK
  BRK
  BRK
  ORA ($02,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $77
  BRK
  PHP
  BRK
  BRK
  .byte $03
  BRK
  BRK
  ORA ($00,X)
  ANC #$00
  SEI
  BRK
  BRK
  BRK
  BRK
  .byte $03
  BRK
  BRK
  ORA ($00,X)
  ANC #$00
  NOP
  .byte $13
  BPL @EDC2
@EDC2:
  BRK
  .byte $03
  BRK
  BRK
  BRK
  BRK
  .byte $17
  BRK
  .byte $7B, $13
  BRK
  BRK
  BRK
  .byte $03
  BRK
  BRK
  BRK
  BRK
  .byte $17
  BRK
  AND ($00,X)
  BRK
  BRK
  ORA ($00,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ADC $0819,X
  BRK
  .byte $17
  ORA $03
  BRK
  BRK
  BRK
  CLC
  BRK
  ROR $0019,X
  BRK
  .byte $17
  ORA $03
  BRK
  BRK
  BRK
  CLC
  BRK
  .byte $22
  BRK
  BRK
  BRK
  ORA ($00,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  STA ($00,X)
  BRK
  BRK
  .byte $14
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA $8700,Y
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
  STA $FF16,Y
  BRK
  .byte $02
  ORA ($00,X)
  BRK
  .byte $02, $02
  BRK
  BRK
  TXS
  .byte $17
  BRK
  BRK
  ASL A
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $9B
  CLC
  BRK
  .byte $FF, $1B
  ASL $00
  .byte $03
  BRK
  BRK
  BIT $00
  .byte $9C
  ASL A
  BRK
  BRK
  .byte $14
  ORA ($00,X)
  BRK
  BRK
  BRK
  ANC #$00
  PHP
  PHP
  PHP
  ORA #$09
  ORA #$09
  ASL A
  ASL A
  ASL A
  ANC #$0B
  ANC #$0C
  .byte $0C, $0C
  ORA $0D0D
  ASL $0E0E
  .byte $0F, $0F
  BPL @EE78
  ORA ($11),Y
  ORA ($12),Y
  .byte $12, $13, $14, $14
  ORA $15,X
  ASL $16,X
  .byte $17
  CLC
  CLC
  ORA $1A1A,Y
  .byte $1B, $1C
  ORA $1E1D,X
  .byte $1F
  JSR $2221
  .byte $23
  BIT $25
  ROL $27
  PLP
  AND #$2A
  ANC #$2C
  AND $302F
  AND ($33),Y
  .byte $34
  AND $37,X
  SEC
  NOP
  .byte $3B
  AND $413F,X
  .byte $42, $44
  LSR $48
  LSR A
  JMP $504E
  .byte $52, $54, $57
  EOR $5E5C,Y
  ADC ($63,X)
  ROR $69
  JMP ($726F)
  ADC $78,X
  .byte $7B
  ROR $8582,X
  .byte $89
  STA $9591
  STA $A19D,Y
  LDA $AA
  .byte $AF, $B3, $B7
  TSX
  LDA $C3C0,X
  DEC $C9
  CPY $D1CE
  .byte $D3
  CMP $D7,X
  CMP $DCDA,Y
  CMP $E0DE,X
  SBC ($E2,X)
  .byte $E3
  CPX $E5
@EED9:
  INC $E7
  INX
  INX
  SBC #$EA
  SBC #$EB
  CPX $EDED
  INC $EFEE
  BEQ @EED9
  SBC ($F1),Y
  .byte $F2, $F3, $F3, $F4, $F4
  SBC $F5,X
  INC $F6,X
  .byte $F7, $F7
  SED
  SED
  SED
  SBC $FAF9,Y
  NOP
  NOP
  .byte $FB, $FB, $FB, $FC, $FC, $FC
  SBC $FDFD,X
  SBC $FEFD,X
  INC $FEFE,X
  .byte $FF
  BCC @EF11
  TYA
@EF11:
  ORA ($A0,X)
  ORA ($A8,X)
  ORA ($B0,X)
  ORA ($B8,X)
  ORA ($C0,X)
  ORA ($C8,X)
  ORA ($D0,X)
  ORA ($E2,X)
  ORA ($EA,X)
  ORA ($F2,X)
  ORA ($FA,X)
  ORA ($02,X)
  .byte $02
  ASL A
  .byte $02, $12, $02
  NOP
  .byte $02, $22, $02
  ROL A
  .byte $02, $32, $02
  NOP
  .byte $02, $42, $02
  LSR A
  .byte $02, $52, $02
  NOP
  .byte $02, $62, $02
  ROR A
  .byte $02, $72, $02
  NOP
  .byte $02, $82, $02
  TXA
  .byte $02, $92, $02
  TYA
  .byte $02, $9E, $02
  LDY $02
  TAX
  .byte $02
  BCS @EF5A
  LDX $02,Y
@EF5A:
  LDY $C202,X
  .byte $02
  INY
  .byte $02
  DEC $D402
  .byte $02
  NOP
  .byte $02
  CPX #$02
  INC $02
  CPX $F002
  .byte $02
  INC $02,X
  .byte $FC, $02, $02, $03
  PHP
  .byte $03
  ASL $1403
  .byte $03
  NOP
  .byte $03
  JSR $2603
  .byte $03
  BIT $3203
  .byte $03
  SEC
  .byte $03
  ROL $4403,X
  .byte $03
  LSR A
  .byte $03
  BVC @EF91
  .byte $54, $03
  CLI
@EF91:
  .byte $03, $5C, $03
  RTS
  .byte $03, $64, $03
  PLA
  .byte $03
  JMP ($7003)
  .byte $03, $74, $03
  SEI
  .byte $03, $7C, $03, $80, $03
  STY $03
  DEY
  .byte $03
  STY $9003
  .byte $03
  STY $03,X
  TYA
  .byte $03, $9C, $03
  LDY #$03
  LDY $03
  TAY
  .byte $03
  LDY $B003
  .byte $03
  LDY $03,X
  CLV
  .byte $03
  LDY $C003,X
  .byte $03
  CPY $03
  INY
  .byte $03
  CPY $D003
  .byte $03
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
  ROL $150F
  CLC
  .byte $0C, $0F, $0F, $12
  ORA $0C,X
  .byte $17
  ASL $100C
  ASL $1512
  .byte $0C, $17
  ASL $100C
  ASL $2000
  .byte $0E
  `;
}

// ═══════════════════════════════════════════════════
// Assemble all sections into full 8KB bank
// ═══════════════════════════════════════════════════
const _PRG_BANK_28: readonly number[] = [
  ...build_8000_83FF_segN(),
  ...build_8400_87FF_segN(),
  ...build_8800_8BFF_segN(),
  ...build_8C00_8FFF_segN(),
  ...build_9000_93FF_segN(),
  ...build_9400_97FF_segN(),
  ...build_9800_9BFF_segN(),
  ...build_9C00_9FFF_segN(),
];
