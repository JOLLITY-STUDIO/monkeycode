/**
 * PRG-ROM MMC3 bank 11 (8KB) — function-based assembly
 * Mapper: 4 (MMC3) | CPU: $8000-$9FFF
 * CDL: code=1477 data=5958 unaccessed=757
 *
 * 功能: 背景/瓦片渲染 + 数据表
 *
 * Pattern: 参考 bank_31.ts
 *   每个 build_xxx() 函数返回其覆盖地址范围的 raw 6502 字节，
 *   最后通过 spread 拼成完整的 8KB 数组
 */


import { asm } from '../_6502asm';
export { _PRG_BANK_11 as default };

console.log('[prg_11_background] loaded');

// $8000-$83FF (1024B): $8000-$83FF 代码/数据段1
function build_8000_83FF_seg1(): readonly number[] {
  return asm`
  JMP $800C
  JMP $8083
  JMP $84A1
  JMP $814C
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $05D4
  BIT $05D7
  BPL $E01E
  EOR #$FF
  CLC
  ADC #$11
@E01E:
  AND #$E0
  CMP $05D8
  BNE $E028
  JMP $800C
@E028:
  STA $05D8
  JSR $810C ; → bank switch?
  LDA $3B
  AND #$FE
  JSR $812B ; → bank switch?
  LDA #$E0
  BIT $05D7
  BPL $E03E
  LDA #$A0
@E03E:
  CLC
  ADC $05D4
  AND #$E0
  LSR A
  LSR A
  ORA #$40
  STA $5A
  LDA #$04
@E04C:
  PHA
@E04D:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $0515
  BNE $E04D
  LDA #$01
  STA $0515
  LDX #$00
  LDA #$02
@E060:
  PHA
  LDA $5A
  AND #$3F
  TAY
  LDA ($58),Y
  LDY $5A
  JSR $85C2 ; → bank switch?
  INC $5A
  PLA
  SEC
  SBC #$01
  BNE $E060
  LDA #$80
  STA $0515
  PLA
  SEC
  SBC #$01
  BNE $E04C
  JMP $800C
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $05D4
  BIT $05D7
  BPL $E095
  EOR #$FF
  CLC
  ADC #$01
@E095:
  AND #$E0
  CMP $05D8
  BNE $E09F
  JMP $8083
@E09F:
  STA $05D8
  JSR $810C ; → bank switch?
  LDA #$E0
  LDY #$FF
  BIT $05D7
  BPL $E0B0
  LDA #$00
@E0B0:
  CLC
  ADC $05D4
  TAX
  TYA
  ADC $05D5
  TAY
  TXA
  LSR A
  LSR A
  LSR A
  LSR A
  LSR A
  STA $5A
  TYA
  LSR A
  LDA #$00
  BCC $E0CA
  LDA #$40
@E0CA:
  ORA $5A
  STA $5A
  LDA #$02
@E0D0:
  PHA
@E0D1:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $0515
  BNE $E0D1
  LDA #$01
  STA $0515
  LDX #$00
  LDA #$02
@E0E4:
  PHA
  LDA $5A
  AND #$3F
  TAY
  LDA ($58),Y
  LDY $5A
  JSR $85C2 ; → bank switch?
  LDA $5A
  CLC
  ADC #$08
  STA $5A
  PLA
  SEC
  SBC #$01
  BNE $E0E4
  LDA #$80
  STA $0515
  PLA
  SEC
  SBC #$01
  BNE $E0D0
  JMP $8083
  LDX $05D4
  LDY $05D5
  BPL $E120
  TXA
  EOR #$FF
  TAX
  TYA
  EOR #$FF
  TAY
  INX
  BNE $E120
  INY
@E120:
  TXA
  CLC
  ADC #$E0
  STA $3A
  TYA
  ADC #$01
  STA $3B
  TAY
  LDA ($5B),Y
  JSR $86D3 ; → bank switch?
  LDX #$00
  STX $58
  LSR A
  ROR $58
  LSR A
  ROR $58
  LSR A
  ROR $58
  TAX
  LDA $58
  CLC
  ADC #$64
  STA $58
  TXA
  ADC #$8B
  STA $59
  RTS
  LDA #$F6
  STA $52
  LDA #$87
  STA $53
  LDA $0524
  CMP #$FF
  BEQ $E19C
  ASL A
  BCC $E160
  INC $53
@E160:
  TAY
  LDA ($52),Y
  TAX
  INY
  LDA ($52),Y
  STA $53
  STX $52
  LDA #$00
  STA $05D1
  STA $3A
  LDY $3A
  LDA ($52),Y
  CMP #$F0
  BCC $E188
  JSR $81BC ; → bank switch?
  LDA #$02
  STA $05D0
  STA $0525
  JMP $819C
@E188:
  STA $0525
  TYA
  CLC
  ADC $52
  STA $52
  BCC $E195
  INC $53
@E195:
  LDY #$01
  LDA ($52),Y
  JSR $81A7 ; → bank switch?
@E19C:
  LDA $0516
  ORA #$10
  STA $0516
  JMP $C512
  JSR $C509 ; → bank switch?
  .byte $27, $83, $E7, $83, $FF, $83
  CLI
  .byte $83, $77, $83, $64, $83, $D2, $83, $E7, $83
  INC $A283
  BRK
  STX $0525
  AND #$0F
  JSR $C509 ; → bank switch?
  CPY $7681
  .byte $82
  EOR $2082
  .byte $F7, $82
  LDA $81D5,X
  JMP $832B
  ASL A
  .byte $0C
  ASL $0E0E
  .byte $12
  BPL $E1ED
  .byte $12, $12
  ASL $0E1A,X
  ASL $120E
  BPL $E1F7
  .byte $12, $12
  ORA $1A,X
  ASL $0E0E
  .byte $12
  BPL $E201
  .byte $12, $12, $17, $1B, $0F, $0F
@E1F7:
  .byte $0F, $13
  ORA ($11),Y
  .byte $13, $13, $1F, $1B, $0F, $0F
@E201:
  .byte $0F, $13
  ORA ($11),Y
  .byte $13, $13
  ANC #$0D
  .byte $0F, $0F, $0F, $13
  ORA ($11),Y
  .byte $13, $13
  BRK
  BRK
  .byte $02, $02
  BRK
  .byte $04, $04, $04
  ASL $08
  BRK
  BRK
  .byte $02, $02
  BRK
  .byte $04, $04, $04, $1B, $1F
  BRK
  BRK
  .byte $02, $02
  BRK
  .byte $04, $04, $04, $1B, $17
  ORA ($01,X)
  .byte $03, $03
  ORA ($05,X)
  ORA $05
  NOP
  ORA $01,X
  ORA ($03,X)
  .byte $03
  ORA ($05,X)
  ORA $05
  NOP
  ASL $0101,X
  .byte $03, $03
  ORA ($05,X)
  ORA $05
  .byte $07
  ORA #$AD
  EOR ($04,X)
  JSR $C50C ; → bank switch?
  LDA $0638
  JSR $C536 ; → bank switch?
  TXA
  LDY #$06
  SEC
  SBC ($34),Y
  LDY $05FB
  BEQ $E269
  EOR #$FF
  CLC
  ADC #$01
@E269:
  TAX
  BPL $E270
  TYA
  EOR #$0B
  TAY
@E270:
  JSR $82FE ; → bank switch?
  JMP $8279
  JSR $82F7 ; → bank switch?
  LDA $827F,X
  JMP $832B
  ASL $100E
  BPL $E294
  .byte $12
  BPL $E297
  .byte $12, $12, $0C, $0C
  BPL $E29D
  BPL $E2A1
  BPL $E2A1
  .byte $12, $12
  NOP
@E294:
  .byte $0C
  BPL $E2A7
@E297:
  BPL $E2AB
  BPL $E2AB
  .byte $12, $12
@E29D:
  .byte $1B
  ORA $1111
@E2A1:
  ORA ($13),Y
  ORA ($11),Y
  .byte $13, $13
@E2A7:
  ORA $110D
  ORA ($11),Y
  .byte $13
  ORA ($11),Y
  .byte $13, $13, $0F, $0F
  ORA ($11),Y
  ORA ($13),Y
  ORA ($11),Y
  .byte $13, $13
  BRK
  BRK
  .byte $02, $02
  BRK
  .byte $02, $02, $02, $04, $04
  BRK
  BRK
  .byte $02, $02
  BRK
  .byte $02, $02, $02
  ASL $06
  BRK
  BRK
  .byte $02, $02
  BRK
  .byte $02, $02, $02
  ASL $1B
  ORA ($01,X)
  .byte $03, $03
  ORA ($03,X)
  .byte $03, $03, $07
  NOP
  ORA ($01,X)
  .byte $03, $03
  ORA ($03,X)
  .byte $03, $03, $07, $07
  ORA ($01,X)
  .byte $03, $03
  ORA ($03,X)
  .byte $03, $03
  ORA $05
  LDY $05FB
  JSR $82FE ; → bank switch?
  RTS
  LDA $0637
  SEC
  SBC #$50
  AND #$F0
  LSR A
  STA $3A
  LSR A
  LSR A
  ADC $3A
  STA $3A
  LDA $0635
  SEC
  SBC #$30
  AND #$F0
  LSR A
  LSR A
  LSR A
  LSR A
  ADC $3A
  TAX
  TYA
  BEQ $E326
  TXA
  CLC
  ADC #$3C
  TAX
@E326:
  RTS
  LDY #$02
@E329:
  LDA ($52),Y
  STA $05CC
  LDY $05CD
  JSR $8525 ; → bank switch?
  LDA #$01
  STA $05CB
  LDA $05CD
  BEQ $E342
  AND #$20
  ORA #$80
@E342:
  STA $05CE
  ORA #$80
  EOR #$20
  STA $05CD
  LDA #$00
  STA $05DB
  STA $05DC
  STA $05DD
  RTS
  JSR $84D9 ; → bank switch?
  LDA #$80
  STA $05D1
  LDY #$04
  BNE $E329
  JSR $84D9 ; → bank switch?
  LDA #$80
  STA $05D1
  LDY #$04
  BIT $052A
  BVC $E374
  INY
@E374:
  JMP $8329
  JSR $84CF ; → bank switch?
  LDY #$04
  LDA ($52),Y
  STA $05E2
  LDA #$00
  STA $05E1
  LDA #$01
  STA $046B
  LDY #$A0
  LDA $05CC
  JSR $8525 ; → bank switch?
  LDA #$A0
  JSR $84A1 ; → bank switch?
  LDA #$01
  JSR $C515 ; → bank switch?
  LDY #$05
  LDA ($52),Y
  LDY #$00
  STY $05CE
  JSR $8525 ; → bank switch?
  LDY #$06
  LDA ($52),Y
  LDY #$80
  JSR $8525 ; → bank switch?
  LDA #$00
  STA $05CB
  LDA #$60
  STA $05CD
  LDA #$00
  STA $05DB
  STA $05DC
  STA $05DD
  STA $05E0
  LDA #$82
  STA $05D1
  JMP $8493
  JSR $84D9 ; → bank switch?
  LDY #$04
  LDA ($52),Y
  STA $05E2
  LDA #$00
  STA $05E1
  JSR $847F ; → bank switch?
  JMP $8386
  LDA #$C0
  STA $05D1
  .byte $D0, $1C  ; BNE $840A
  LDA #$C2
  STA $05D1
  JSR $84CF ; → bank switch?
  JSR $845C ; → bank switch?
  JSR $847F ; → bank switch?
  JMP $840D
  .byte $A9
  `;
}

// $8400-$87FF (1024B): $8400-$87FF 代码/数据段2
function build_8400_87FF_seg2(): readonly number[] {
  return asm`
  .byte $C2
  STA $05D1
  JSR $84CF ; → bank switch?
  JSR $845C ; → bank switch?
  JSR $84CF ; → bank switch?
  LDA #$01
  STA $046B
  LDY #$00
  LDA $05CC
  JSR $8525 ; → bank switch?
  LDA #$00
  JSR $84A1 ; → bank switch?
  LDY #$05
  LDA ($52),Y
  LDY #$80
  JSR $8525 ; → bank switch?
  LDY #$06
  LDA ($52),Y
  LDY #$A0
  JSR $8525 ; → bank switch?
  LDA #$00
  STA $05CB
  LDA #$40
  STA $05CE
  LDA #$00
  STA $05CD
  LDA #$00
  STA $05DB
  LDA #$E0
  LDX #$FF
  STA $05DC
  STX $05DD
  BIT $05DF
  BPL $E456
  LDA #$20
@E456:
  STA $05E0
  JMP $8493
  LDY #$04
  LDA ($52),Y
  BIT $05DF
  BMI $E471
  SEC
  SBC #$01
  LDX #$74
  LSR A
  BCC $E478
  LDX #$E4
  BNE $E478
@E471:
  LDX #$1C
  LSR A
  BCC $E478
  LDX #$8C
@E478:
  STX $05E1
  STA $05E2
  RTS
  LDY #$05
  BIT $052A
  BVC $E488
  INY
  INY
@E488:
  LDA ($52),Y
  TAX
  INY
  LDA ($52),Y
  STA $53
  STX $52
  RTS
  LDA #$05
  CLC
  ADC $52
  STA $5B
  LDA $53
  ADC #$00
  STA $5C
  RTS
  LDX #$02
  CMP #$80
  BCS $E4AD
  DEX
  CMP #$40
  BCS $E4AD
  DEX
@E4AD:
  LDY #$74
  AND #$3F
  CMP #$20
  BCS $E4BB
  LDY #$E4
  TXA
  EOR #$02
  TAX
@E4BB:
  LDA $20
  AND #$FC
  STA $20
  TXA
  ORA $20
  STA $20
  STY $4B
  LDA $05CB
  STA $046B
  RTS
  JSR $84F4 ; → bank switch?
  STX $05DE
  STY $05DF
  RTS
  JSR $84F4 ; → bank switch?
  BIT $052A
  BVC $E4ED
  TXA
  EOR #$FF
  TAX
  TYA
  EOR #$FF
  TAY
  INX
  BNE $E4ED
  INY
@E4ED:
  STX $05DE
  STY $05DF
  RTS
  LDY #$02
  LDA ($52),Y
  TAX
  INY
  LDA ($52),Y
  TAY
  CMP #$80
  BEQ $E502
  RTS
@E502:
  LDA $061D
  STA $3A
  LDA $061C
  ASL A
  ROL $3A
  ASL A
  ROL $3A
  ASL A
  ROL $3A
  CPX #$01
  BEQ $E51A
  ASL A
  ROL $3A
@E51A:
  LDY $3A
  CLC
  ADC #$C0
  TAX
  TYA
  ADC #$00
  TAY
  RTS
  STY $05C8
  PHA
  TAX
  LDA #$EE
  STA $54
  LDA #$86
  STA $55
  TXA
  ASL A
  BCC $E538
  INC $55
@E538:
  TAY
  LDA ($54),Y
  ORA #$80
  STA $0526
  INY
  LDA ($54),Y
  STA $0527
  PLA
  JSR $86D3 ; → bank switch?
  LDX #$00
  STX $54
  LSR A
  ROR $54
  LSR A
  ROR $54
  LSR A
  ROR $54
  TAX
  LDA $54
  CLC
  ADC #$64
  STA $54
  TXA
  ADC #$8B
  STA $55
  LDA #$20
  STA $05C9
  LDA $05CA
  PHA
@E56D:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $0515
  BNE $E56D
  LDA #$01
  STA $0515
  LDA #$00
  STA $05C7
  LDA #$03
@E583:
  TAX
  PLA
  STA $05CA
  PHA
  TXA
  PHA
  LDA #$20
  SEC
  SBC $05C9
  TAY
  LDA ($54),Y
  LDX $05C7
  LDY $05C8
  JSR $85C2 ; → bank switch?
  STX $05C7
  INC $05C8
  PLA
  DEC $05C9
  BEQ $E5B6
  SEC
  SBC #$01
  BNE $E583
  LDA #$80
  STA $0515
  JMP $856D
@E5B6:
  PLA
  LDA #$80
  STA $0515
  LDA #$01
  JSR $C515 ; → bank switch?
  RTS
  STA $56
  TYA
  AND #$07
  ASL A
  ASL A
  STA $04A6,X
  LDA #$00
  STA $04A7,X
  TYA
  AND #$38
  ASL A
  ASL A
  ASL A
  ROL $04A7,X
  ASL A
  ROL $04A7,X
  ORA $04A6,X
  STA $04A6,X
  TYA
  AND #$C0
  LSR A
  LSR A
  LSR A
  LSR A
  ORA #$20
  ORA $04A7,X
  STA $04A7,X
  STA $04AE,X
  STA $04B5,X
  STA $04BC,X
  LDA $04A6,X
  CLC
  ADC #$20
  STA $04AD,X
  ADC #$20
  STA $04B4,X
  ADC #$20
  STA $04BB,X
  TYA
  AND #$3F
  ORA #$C0
  STA $04C2,X
  TYA
  AND #$C0
  LSR A
  LSR A
  LSR A
  LSR A
  ORA #$23
  STA $04C3,X
  LDA #$04
  STA $04A5,X
  STA $04AC,X
  STA $04B3,X
  STA $04BA,X
  LDA #$01
  STA $04C1,X
  TYA
  PHA
  TXA
  PHA
  LDY $56
  LDA #$E4
  STA $56
  LDA $05CA
  CLC
  ADC #$9B
  STA $57
  LDA ($56),Y
  STA $04C4,X
  LDA $05CA
  STA $3A
  LDA #$00
  STA $56
  TYA
  LSR $3A
  ROR A
  ROR $56
  LSR $3A
  ROR A
  ROR $56
  LSR A
  ROR $56
  LSR A
  ROR $56
  PHA
  AND #$1F
  ORA #$A0
  STA $57
  PLA
  AND #$20
  PHP
  LDA #$12
  PLP
  BEQ $E679
  LDA #$13
@E679:
  PHA
  LDA $22
  ORA #$07
  STA $23
  STA $8000
  PLA
  STA $0025
  STA $8001
  LDA #$04
  LDY #$00
@E68E:
  PHA
  LDA #$04
@E691:
  PHA
  LDA ($56),Y
  STA $04A8,X
  INX
  INY
  PLA
  SEC
  SBC #$01
  BNE $E691
  INX
  INX
  INX
  PLA
  SEC
  SBC #$01
  BNE $E68E
  PLA
  TAX
  LDA #$00
  STA $04C5,X
  PLA
  AND #$3F
  CMP #$38
  BCS $E6BC
  TXA
  CLC
  ADC #$20
  TAX
  RTS
@E6BC:
  TXA
  TAY
  CLC
  ADC #$12
  TAX
  LDA #$05
@E6C4:
  PHA
  LDA $04C1,Y
  STA $04B3,Y
  INY
  PLA
  SEC
  SBC #$01
  BNE $E6C4
  RTS
  PHA
  AND #$03
  TAX
  PLA
  PHA
  LSR A
  LSR A
  TAY
  LDA $8B42,Y
  DEX
  BMI $E6E7
  LSR A
  LSR A
  JMP $86DF
@E6E7:
  AND #$03
  STA $05CA
  PLA
  RTS
  .byte $3C
  LSR A
  .byte $3C
  LSR A
  .byte $3C
  LSR A
  .byte $3C
  LSR A
  .byte $3C
  LSR A
  .byte $3C
  LSR A
  .byte $3C
  LSR A
  .byte $3C
  LSR A
  .byte $3C
  LSR A
  .byte $3C
  LSR A
  .byte $3C
  LSR A
  .byte $3C
  LSR A
  .byte $3C
  LSR A
  .byte $3C
  LSR A
  .byte $3C
  LSR A
  .byte $3C
  LSR A
  .byte $3C
  LSR A
  .byte $3C
  LSR A
  .byte $3C
  LSR A
  .byte $3C
  LSR A
  .byte $54
  LSR $54,X
  LSR $50,X
  .byte $52
  BVC $E770
  .byte $54
  LSR $50,X
  .byte $52, $54
  LSR $50,X
  .byte $52, $54
  LSR $50,X
  .byte $52, $54
  LSR $50,X
  .byte $52, $3C
  ROL $3E3C,X
  JMP $4E2E
  ROL $6260
  .byte $3C
  ROL $003A,X
  NOP
  BRK
  NOP
  BRK
  NOP
  BRK
  SEC
  BRK
  SEC
  BRK
  RTS
  .byte $62
  BRK
  .byte $02
  ROL $3C00,X
  LSR A
  ROL $3C3C
  LSR $3C
  LSR $3C
  LSR A
  .byte $3C
  LSR A
  BRK
  .byte $3C
  BRK
  .byte $3C, $3C
  LSR A
  PHA
  .byte $42
  PHA
  .byte $42
  PHA
  .byte $42
  PHA
  .byte $42
  PHA
  .byte $42
  PHA
  .byte $42
  PHA
  .byte $42
  PHA
  .byte $42, $3C
  ROL $043C
  .byte $3C
  BIT $2C3C
  LSR $00,X
  LSR $00,X
  BVC $E7CE
  .byte $3C, $52, $3C, $52, $3C, $52, $3C, $44, $3C, $44, $3C, $44, $3C, $44, $3C
  BRK
  ROL $3C00,X
  LSR A
  .byte $3C
  LSR A
  .byte $3C
  LSR A
  JMP $4C00
  BRK
  BVC $E7EC
  .byte $3C
  ROL $4A3C
  .byte $3C
  LSR A
  .byte $3C
  LSR A
  .byte $42, $44, $42, $44, $42, $44
  ASL $3D
  ASL $3C
  ASL $00
  ASL $3C
  PHA
  .byte $42, $3C
  LSR A
  .byte $3C
  LSR A
  RTS
  .byte $62
  PHA
  .byte $42
  PHA
  .byte $42
  PHA
  .byte $42
  PHA
  .byte $42
  PHA
  .byte $42, $52
  LSR A
  .byte $3C
  LSR A
  RTI
  BRK
  RTI
  BRK
  ASL $3C
  RTI
  .byte $3C
@E7CE:
  CLI
  NOP
  CLI
  NOP
  CLI
  NOP
  .byte $3C
  LSR A
  .byte $54
  LSR $3C,X
  ROL $523C
  .byte $3C, $52, $54
  LSR $50,X
  .byte $52, $3C, $04, $3C, $04, $54
  LSR $54,X
  LSR $50,X
  .byte $52
@E7EC:
  LSR $4A,X
  NOP
  BRK
  NOP
  BRK
  NOP
  BRK
  .byte $3C
  LSR A
  DEC $E388,X
  DEY
  CPX $88
  .byte $E7
  DEY
  .byte $ED, $88
  `;
}

// $8800-$8BFF (1024B): $8800-$8BFF 代码/数据段3
function build_8800_8BFF_seg3(): readonly number[] {
  return asm`
  .byte $F3
  DEY
  INC $88,X
  .byte $FC
  DEY
  .byte $02, $89
  ORA $89
  PHP
  .byte $89
  ANC #$89
  ORA ($89),Y
  .byte $14, $89, $17, $89
  ORA $2389,X
  .byte $89
  ROL $89
  BIT $2F89
  .byte $89
  AND $89,X
  .byte $3B, $89
  EOR ($89,X)
  .byte $44, $89
  LSR A
  .byte $89
  .byte $50, $89  ; BVC $87B3
  EOR $89,X
  LSR $89,X
  .byte $5B, $89
  RTS
  .byte $89
  ADC $89
  ROR A
  .byte $89, $6F, $89, $74, $89, $7B, $89, $80, $89
  STA $89
  TXA
  .byte $89, $8F, $89
  STA $89,X
  TXS
  .byte $89, $9F, $89
  LDY $89
  LDA #$89
  .byte $AF, $89, $B2, $89
  LDA $89,X
  .byte $C2, $89, $CF, $89
  CMP $89,X
  .byte $DB, $89
  DEC $E189,X
  .byte $89
  CPX $89
  .byte $E7, $89
  NOP
  .byte $89
  SBC $F089
  .byte $89, $F3, $89
  INC $89,X
  .byte $FC, $89, $FF, $89, $04
  TXA
  ASL A
  TXA
  ORA ($8A),Y
  .byte $17
  TXA
  NOP
  TXA
  JSR $238A
  TXA
  ROL A
  TXA
  AND $308A
  TXA
  AND $8A,X
  NOP
  TXA
  EOR ($8A,X)
  PHA
  TXA
  EOR $5C8A
  TXA
  ADC ($8A,X)
  ROR $8A
  ADC #$8A
  ROR $748A
  TXA
  .byte $77
  TXA
  ADC $8A8A,X
  TXA
  STA $928A
  TXA
  TYA
  TXA
  .byte $9E
  TXA
  LDA ($8A,X)
  LDX $8A
  .byte $AB
  TXA
  .byte $B2
  TXA
  .byte $B7
  TXA
  LDY $C38A,X
  TXA
  INY
  TXA
  AXS #$8A
  CLD
  TXA
  .byte $DB
  TXA
  CPX #$8A
  INC $8A
  SBC $F38A
  TXA
  SBC $FF8A,Y
  TXA
  .byte $04, $8B
  ORA #$8B
  .byte $0F, $8B, $1C, $8B
  ANC #$8B
  SEC
  .byte $8B, $3B, $8B
  ROL $3F8B,X
  .byte $8B, $02, $03
  BRK
  ASL $50
  BEQ $E8E7
  BRK
  .byte $52
@E8E7:
  .byte $02
  ORA $00
  BRK
  JMP $024A
  ORA $00
  BRK
  AND ($20,X)
  .byte $02
  BRK
  EOR $02,X
  ORA $00
  BRK
  .byte $54, $53, $02
  ORA $00
  BRK
  AND ($32),Y
  .byte $07
  BRK
  BVS $E90D
  BRK
  ADC ($08),Y
  BRK
  .byte $72, $07
  ORA $00
  BRK
  .byte $44
  EOR $02
  BRK
  .byte $43
  ORA ($00,X)
  .byte $4F, $02
  ORA $00
  BRK
  .byte $23, $22, $02
  ORA $00
  BRK
  ROR $77,X
  .byte $02
  BRK
  .byte $6F, $02
  ORA $00
  BRK
  SEC
  NOP
  .byte $02
  BRK
  AND $0502,Y
  BRK
  BRK
  NOP
  SEC
  .byte $02
  ORA $00
  BRK
  .byte $3B, $3F, $02
  ORA $00
  BRK
  .byte $3C
  ROL $0002,X
  AND $0502,X
  BRK
  BRK
  ROL $023C,X
  ORA $00
  BRK
  .byte $3F, $3B, $02, $03
  RTS
  BRK
  .byte $04
  SBC ($02),Y
  .byte $03
  ORA ($80,X)
  .byte $52, $02, $03
  BRK
  .byte $80, $52, $02, $03
  BRK
  .byte $FC, $52, $02, $03
  BRK
  SBC $0252,Y
  .byte $03
  BRK
  .byte $04, $52, $02, $03
  BRK
  .byte $07, $52, $02
  ORA ($00,X)
  .byte $FF
  BRK
  .byte $52, $52
  ASL $03
  BRK
  ORA ($35,X)
  ASL $03
  BRK
  .byte $FF
  AND $06,X
  .byte $03
  BRK
  ASL $35
  ASL $03
  BRK
  NOP
  AND $02,X
  ORA $00
  BRK
  .byte $1F
  ASL $0302,X
  BRK
  ANC #$30
  .byte $02, $03
  BRK
  .byte $02
  BVC $E9A2
  .byte $03
  BRK
@E9A2:
  INC $0250,X
  .byte $03
  BRK
  .byte $04
  EOR ($02),Y
  ORA $00
  .byte $03, $67
  ADC $02
  BRK
  ADC $05,X
  BRK
  .byte $64, $02
  ASL $E0
  .byte $FF
  ORA ($B9,X)
  .byte $89, $BB, $89
  EOR #$48
  .byte $47
  PHA
  .byte $02
  PHP
@E9C4:
  BCS $E9C4
  .byte $02
  DEC $89
  INY
  .byte $89
  PLA
  .byte $67
  ROR $65
  .byte $03
  ORA $00
  BRK
  ROL $27
  .byte $03
  ORA $00
  BRK
  PLP
  AND #$04
  BRK
  ROL A
  .byte $04
  BRK
  ANC #$02
  BRK
  AND $0000
  ROL $0002
  .byte $2F, $02
  BRK
  .byte $33, $02
  BRK
  .byte $34, $02
  BRK
  EOR ($02,X)
  BRK
  .byte $42, $02
  ORA $00
  BRK
  ALR #$4D
  .byte $02
  BRK
  LSR $0302
  BRK
  SBC $0261,Y
  ORA $00
  ORA ($7D,X)
  LSR $05
  .byte $04, $80
  BRK
  ORA ($24,X)
  .byte $64, $02
  ORA $00
  BRK
  JMP ($026D)
  BRK
  ROR $0502
  BRK
  BRK
  NOP
  .byte $7B, $02
  BRK
  RTI
  .byte $02
  ORA ($00,X)
  ANC #$00
  RTS
  RTS
  ASL $00
  ROL $02,X
  BRK
  .byte $37, $02, $03
  BRK
  SBC $5D,X
  .byte $02, $03
  BRK
  ANC #$5E
  .byte $02
  ORA ($00,X)
  SBC $00,X
  .byte $5F, $5F, $02
  ORA ($00,X)
  SBC $00,X
  RTS
  RTS
  .byte $02, $03
  BRK
  ANC #$5D
  .byte $02
  PHP
@EA4F:
  BCS $EA4F
  .byte $03
  EOR ($8A),Y
  .byte $54
  TXA
  .byte $57
  CLI
  CLI
  EOR $5858,Y
  .byte $02, $03
  RTS
  BRK
  AND $02
  .byte $03
  BRK
  .byte $07
  AND $0003,Y
  STA ($02,X)
  .byte $03
  BRK
  ANC #$5D
  .byte $02
  ORA $00
  .byte $02, $7C
  ROR $0000,X
  BIT $0502
  BRK
  BRK
  ROR $68
  .byte $03
  ASL $00
  PHP
  ORA ($81,X)
  TXA
  .byte $83
  TXA
  .byte $80
  ROL $80
  .byte $27, $03
  BRK
  .byte $82, $02, $03
  BRK
  .byte $FF
  EOR ($01),Y
  ORA $00
  BRK
  NOP
  .byte $5C
  ORA ($05,X)
  BRK
  BRK
  .byte $5C
  NOP
  ORA ($00,X)
  .byte $5B, $02, $03
  BRK
  .byte $80
  BVC $EAA9
  .byte $03
  BRK
@EAA9:
  .byte $80
  EOR ($02),Y
  ORA ($00,X)
  ANC #$00
  .byte $5F, $5F, $02, $03
  BRK
  .byte $80
  BMI $EABE
  .byte $03
  BRK
  .byte $80
  AND $02,X
  ORA ($00,X)
  ORA ($00,X)
  .byte $52, $52, $02, $03
  BRK
  .byte $80
  LSR $0002,X
  ADC #$02
  ASL $00
  PHP
  ORA ($CF,X)
  TXA
  CMP ($8A),Y
  .byte $73, $04, $73
  ORA $02
  BRK
  EOR ($02),Y
  .byte $03
  BRK
  SBC $0239,Y
  ORA $00
  BRK
  .byte $83
  ARR #$02
  ORA ($00,X)
  .byte $80
  BRK
  .byte $5F, $5F, $02
  ORA $00
  BRK
  .byte $7C
  ROR $0502,X
  BRK
  .byte $80
  ADC $0246,X
  ORA $00
  BRK
  ROR A
  .byte $7F, $02, $03
  BRK
  SBC $5E,X
  .byte $02, $03
  BRK
  SBC $30,X
  .byte $02
  ORA $00
  BRK
  PLA
  ROR $02
  PHP
@EB11:
  BCS $EB11
  .byte $02, $13, $8B
  ORA $8B,X
  .byte $1B
  ORA $1C1A,X
  .byte $02
  PHP
  BRK
  SBC $2003,X
  .byte $8B, $23, $8B, $17
  ASL $55,X
  ORA $14,X
  .byte $74, $02
  ASL $B0
  INC $2F01,X
  .byte $8B
  AND ($8B),Y
  .byte $1B
  LSR $1A
  ADC $0006,X
  LSR $02,X
  BRK
  .byte $80, $F2
  ORA $2B00,Y
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  TAX
  TAX
  TAX
  ROR A
  AND #$94
  EOR $55,X
  .byte $52
  TXA
  TAX
  TAX
  .byte $80, $22
  BVC $EBAF
  ORA $56
  ORA $4A
  ORA $A4,X
  .byte $80
  BRK
  ROL A
  BRK
  BRK
  ASL A
  BRK
  BRK
  ORA #$02
  .byte $03, $04, $0C
  ORA $0D0C
  ASL $100F
  ORA ($12),Y
  .byte $12, $12, $12, $12, $12, $12, $12, $13, $13, $13, $13, $13, $13, $13, $13
  ORA ($02,X)
  .byte $03, $04
  ASL A
  BRK
  BRK
  ORA $0E
  .byte $0F
  BPL $EBA1
  .byte $0C
  ORA $0D0C
  .byte $12, $12, $12, $12, $12, $12, $12, $12, $13, $13, $13, $13, $13
@EBA1:
  .byte $13, $13, $13
  BRK
  BRK
  BRK
  ASL A
  ORA ($02,X)
  .byte $03, $04, $0C
  ORA $0D0C
  ASL $100F
  ORA ($14),Y
  .byte $14, $14, $14, $14, $14, $14, $14, $13, $13, $13, $13, $13, $13, $13, $13
  ORA ($02,X)
  .byte $03, $04
  ORA $00
  PHP
  BRK
  ASL $100F
  ORA ($0C),Y
  ORA $0D0C
  .byte $14, $14, $14, $14, $14, $14, $14, $14, $13, $13, $13, $13, $13, $13, $13, $13
  ORA $16,X
  ORA $16,X
  .byte $17
  CLC
  .byte $17
  ASL $19,X
  NOP
  ORA $191A,Y
  .byte $1B, $1C
  NOP
  .byte $14, $14, $14, $14, $14, $14, $14, $14, $13, $13, $13, $13
  `;
}

// $8C00-$8FFF (1024B): $8C00-$8FFF 代码/数据段4
function build_8C00_8FFF_seg4(): readonly number[] {
  return asm`
  .byte $13, $13, $13, $13
  ASL $17,X
  CLC
  .byte $17
  ASL $15,X
  ASL $15,X
  NOP
  ORA $1C1B,Y
  NOP
  ORA $191A,Y
  .byte $14, $14, $14, $14, $14, $14, $14, $14, $13, $13, $13, $13, $13, $13, $13, $13
  ORA $16,X
  ORA $16,X
  .byte $17
  CLC
  .byte $17
  ASL $19,X
  NOP
  ORA $191A,Y
  ORA $2E1E,X
  .byte $23, $23, $23, $23, $23
  JSR $2221
  .byte $13, $13, $13, $13, $13, $13, $13, $13
  ASL $17,X
  CLC
  .byte $17
  ASL $15,X
  ASL $15,X
  NOP
  ORA $1E1D,Y
  ROL $1A19
  ORA $2323,Y
  JSR $2221
  .byte $23, $23, $23, $13, $13, $13, $13, $13, $13, $13, $13
  ORA $16,X
  ORA $16,X
  .byte $17
  CLC
  .byte $17
  ASL $19,X
  NOP
  ORA $191A,Y
  BIT $25
  ROL $2D
  AND $2D2D
  AND $2928
  ROL A
  BIT $2C2C
  BIT $2C2C
  BIT $162C
  .byte $17
  CLC
  .byte $17
  ASL $15,X
  ASL $15,X
  ROL $25
  .byte $27
  ORA $191A,Y
  NOP
  ORA $292A,Y
  ANC #$2D
  AND $2D2D
  AND $2C2C
  BIT $2C2C
  BIT $2C2C
  ASL $15,X
  ASL $15,X
  ASL $15,X
  ASL $15,X
  ROL $25
  ROL $1A19
  ORA $191A,Y
  ROL A
  AND #$2B
  AND $2D2D
  AND $2C2D
  BIT $2C2C
  BIT $2C2C
  BIT $1615
  ORA $16,X
  ORA $16,X
  ORA $16,X
  ORA $191A,Y
  NOP
  ORA $2531,Y
  ROL $2D
  AND $2D2D
  AND $2928
  ROL A
  BIT $2C2C
  BIT $2C2C
  BIT $152C
  ASL $15,X
  ASL $15,X
  ASL $15,X
  ASL $19,X
  .byte $2F
  ASL $192E,X
  NOP
  ORA $231A,Y
  JSR $2221
  .byte $23, $23, $23, $23, $13, $13, $13, $13, $13, $13, $13, $13
  ORA $16,X
  ORA $16,X
  ORA $16,X
  ORA $16,X
  ORA $191A,Y
  NOP
  ORA $1E2F,Y
  ROL $2323
  .byte $23, $23, $23
  JSR $2221
  .byte $13, $13, $13, $13, $13, $13, $13, $13
  BRK
  ORA $00
  BRK
  BRK
  ASL A
  ASL $07
  ORA $320C
  .byte $33
  ORA $0D0C
  .byte $0C, $14, $14, $14, $14, $14, $14, $14, $14, $13, $13, $13, $13, $13, $13, $13, $13
  BRK
  BRK
  ASL A
  PHP
  BRK
  BRK
  ORA $00
  .byte $0C
  ORA $0D0C
  .byte $0C, $32, $33
  ORA $1414
  .byte $14, $14, $14, $14, $14, $14, $13, $13, $13, $13, $13, $13, $13, $13
  ORA $16,X
  ORA $16,X
  ORA $16,X
  ORA $16,X
  ORA $1C30,Y
  NOP
  ORA $191A,Y
  NOP
  .byte $14, $14, $14, $14, $14, $14, $14, $14, $13, $13, $13, $13, $13, $13, $13, $13
  ORA $16,X
  ORA $16,X
  ORA $16,X
  ORA $16,X
  ORA $191A,Y
  NOP
  ORA $1C30,Y
  NOP
  .byte $14, $14, $14, $14, $14, $14, $14, $14, $13, $13, $13, $13, $13, $13, $13, $13
  BRK
  PHP
  BRK
  ASL $07
  BRK
  ASL A
  BRK
  ORA $320C
  .byte $33
  ORA $0D0C
  .byte $0C, $12, $12, $12, $12, $12, $12, $12, $12, $13, $13, $13, $13, $13, $13, $13, $13
  ASL A
  BRK
  PHP
  BRK
  ASL $07
  BRK
  BRK
  .byte $0C
  ORA $0D0C
  .byte $0C, $32, $33
  ORA $1212
  .byte $12, $12, $12, $12, $12, $12, $13, $13, $13, $13, $13, $13, $13, $13
  STA $86
  STA $85
  STA $86
  STA $85
  .byte $34
  AND $56,X
  LSR $56,X
  EOR $46
  LSR $39,X
  NOP
  .byte $37
  SEC
  EOR $55,X
  .byte $8F
  EOR $3B,X
  .byte $3C
  AND $563E,X
  LSR $92,X
  .byte $87
  CMP $C6
  .byte $C7
  INY
  CMP #$C9
  CMP #$CA
  AXS #$CC
  CMP $CFCE
  .byte $CF, $CF, $CF
  BNE $EDE7
  .byte $D2, $D3, $D4
  CMP $D6,X
  .byte $D7, $F4
  CLD
  .byte $13, $13, $13, $13, $13, $13
  STA $85
  STA $8585,Y
  STA $99
  STA $56
  LSR $71,X
  .byte $72
  LSR $56,X
  .byte $67
  PLA
  EOR $55,X
  .byte $F2
  EOR $63,X
  .byte $64
  ADC $66
  .byte $9C
  LDA ($56,X)
  LSR $5F,X
  RTS
  ADC ($62,X)
  CMP $C9C9,Y
  CMP #$DA
  .byte $DB, $DC
  CMP $CFCF,X
  .byte $CF, $CF
  DEC $E0DF,X
  SBC ($E3,X)
  CPX $E5
  INC $E7
  INX
  SBC #$EA
  .byte $13, $13, $13, $13, $13, $13, $E2, $FF
  STX $85
  STA $86
  STA $85
  STX $85
  .byte $87
  LSR $56,X
  DEY
  .byte $89
  LSR $56,X
  EOR $8A
  TXA
  TXA
  .byte $8B
  STX $36B2
  ROL $8C,X
  STY $8D8C
  .byte $44, $47, $44, $44
  STA $99
  STA $85
  STA $8585,Y
  STA $5672,Y
  LSR $9A,X
  .byte $9B
  LSR $56,X
  .byte $9C
  ROL $36,X
  LDY #$9F
  STA $8A8A,X
  TXA
  .byte $44, $44, $73, $44, $9E
  STY $8C8C
  EOR $F1,X
  EOR $90,X
  STA ($55),Y
  EOR $F1,X
  .byte $93, $93, $93
  STY $92,X
  .byte $87
  LSR $56,X
  STA $95,X
  STA $96,X
  .byte $97, $97, $97, $97, $13, $13, $13, $13, $13, $13, $13, $13, $F2
  EOR $55,X
  LDA $55BE,X
  .byte $F2
  EOR $56,X
  LSR $9C,X
  LDA ($A4,X)
  .byte $93, $93, $93, $97, $97, $97, $97
  LDA $95
  STA $95,X
  .byte $13, $13, $13, $13, $13, $13, $13, $13, $C3, $C3, $C3, $C3, $C3, $C3, $C3, $C3, $C3, $C3, $C3, $C3, $C3, $C3, $C3, $C3
  STX $85
  STA $86
  STA $85
  STX $85
  .byte $92, $87
  LSR $88,X
  .byte $89
  LSR $92,X
  .byte $87, $C3, $C3, $C3, $C3, $C3, $C3, $C3, $C3, $C3, $C3, $C3, $C3, $C3, $C3, $C3, $C3
  STA $99
  STA $85
  STA $8585,Y
  STA $A19C,Y
  LSR $9A,X
  .byte $9B
  LSR $9C,X
  LDA ($AD,X)
  LDX $B28E
  ROL $36,X
  ROL $A8,X
  LDA ($B3),Y
  EOR $F1,X
  EOR $55,X
  EOR $A9,X
  LDA $B6,X
  .byte $AF, $AF, $AF, $AF, $AF, $AF, $13, $13, $13, $13, $13, $13, $13, $13
  TAX
  ROL $36,X
  ROL $A0,X
  .byte $9F
  LDY $ABAD
  EOR $55,X
  EOR $A3,X
  EOR $B0,X
  LDA ($AF),Y
  .byte $AF, $AF, $AF, $AF, $AF
  LDY $B5,X
  .byte $13, $13, $13, $13, $13, $13, $13, $13
  ORA $0F0E
  ORA $16,X
  ORA $15,X
  .byte $17
  ORA $151E,X
  CLC
  ORA $1A,X
  CLC
  ORA $1F,X
  BPL $EF92
  BPL $EF89
  BPL $EF8B
  BPL $EF9D
  .byte $12
  ORA ($12),Y
  ORA ($12),Y
  ORA ($12),Y
  .byte $17
  ORA $15,X
  ORA $15,X
@EF89:
  ASL $07
@EF8B:
  PHP
  ORA $16,X
  ORA $15,X
  CLC
  ORA $09,X
  ASL A
  BPL $EFA6
  BPL $EFA8
  BPL $EFB5
  BPL $EFA7
  ORA ($12),Y
  ORA ($12),Y
  ORA ($12),Y
  ORA ($0C),Y
  .byte $D3, $D4
@EFA6:
  CMP $15,X
@EFA8:
  ORA $15,X
  ORA $15,X
  DEC $D7,X
  CLD
  CMP $1515,Y
  ORA $F4,X
  NOP
@EFB5:
  .byte $DB, $DC
  CMP $1515,X
  .byte $F2, $F3
  DEC $E0DF,X
  SBC ($3E,X)
  ROL $F6EE,X
  ORA $15,X
  ORA $15,X
  ORA $E3,X
  CPX $E5
  SBC ($15),Y
  ORA $15,X
  .byte $E2
  INC $E7
  INX
  BEQ $EFC5
  ORA $15,X
  SBC #$EA
  SBC #$EC
  INC $ED,X
  ROL $CE3E,X
  .byte $CF
  BNE $EFB5
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA $15,X
  ORA $15,X
  ORA $15,X
  ORA $15,X
  ORA $15,X
  ORA $15,X
  ORA $15,X
  ORA $15,X
  BRK
  BRK
  BRK
  BRK
  `;
}

// $9000-$93FF (1024B): $9000-$93FF 代码/数据段5
function build_9000_93FF_seg5(): readonly number[] {
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
  ORA $15,X
  ORA $15,X
  NOP
  ORA $18,X
  ORA $15,X
  ASL $15,X
  ORA $15,X
  ORA $15,X
  ORA $00,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  .byte $D2
  INY
  .byte $C3, $D2
  CPY $C4
  CPY $C4
  .byte $C2
  CMP $C6
  .byte $C7
  CPY $C4
  .byte $1C, $1C, $1C, $1C, $1C, $1C, $1C, $1C
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  .byte $D2
  CMP #$CA
  .byte $D2
  CPY $C4
  CPY $C4
  CMP $CCCB
  .byte $C2
  CPY $C4
  .byte $1C, $1C, $1C, $1C, $1C, $1C, $1C, $1C
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  .byte $D2
  SED
  .byte $C3, $D2
  CPY $C4
  CPY $C4
  .byte $C2
  CMP $F9
  NOP
  CPY $C4
  .byte $1C, $1C, $1C, $1C, $1C, $1C, $1C, $1C
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  .byte $D2
  CMP #$FD
  .byte $D2
  CPY $C4
  CPY $C4
  .byte $FB, $FC
  CPY $C4C2
  CPY $1C
  .byte $1C, $1C, $1C, $1C, $1C, $1C, $1C
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  TSX
  LDY $BBBC,X
  BRK
  BRK
  BRK
  BRK
  LDA $BFBE,X
  CPY #$00
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  TSX
  LDY $BBBC,X
  BRK
  BRK
  BRK
  BRK
  LDA $BFBE,X
  CMP ($00,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $AB, $AB, $AB, $AB, $AB, $AB, $AB, $AB
  LDA #$AB
  .byte $AB, $AB, $AB, $AB, $AB, $AB, $AB
  LDA #$AB
  .byte $AB, $AB, $AB, $AB, $AB
  LDY $AAAC
  LDY $ACAC
  LDY $00AC
  ADC ($72),Y
  .byte $72, $73, $72, $74
  BRK
  BRK
  ADC $76,X
  .byte $77
  SEI
  ADC $007A,Y
  BRK
  .byte $7B, $7C
  ADC $7F7E,X
  .byte $80
  BRK
  BRK
  STA ($82,X)
  .byte $82, $83, $82
  STY $00
  .byte $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7
  INC $FEFE,X
  INC $FEFE,X
  INC $15FE,X
  ASL $15,X
  ASL $15,X
  ASL $15,X
  ASL $17,X
  CLC
  .byte $17
  CLC
  .byte $17
  CLC
  .byte $17
  CLC
  ROL $26
  ROL $26
  ROL $26
  ROL $26
  AND $25
  AND $25
  AND $25
  AND $25
  ADC ($62,X)
  .byte $63, $64, $62, $63
  ADC $66
  .byte $67
  PLA
  ADC #$6A
  ARR #$6C
  ADC $306E
  BMI $E1A7
  BMI $E1A9
  BMI $E1AB
  BMI $E1AE
  AND ($31),Y
  AND ($31),Y
  AND ($31),Y
  AND ($15),Y
  ORA $15,X
  ORA $15,X
  ORA $15,X
  ORA $15,X
  STA $86
  .byte $87
  ORA $8C19,Y
  ORA $15,X
  DEY
  .byte $89
  TXA
  .byte $13, $14, $8B
  ORA $3E,X
  ROL $3E3E,X
  ROL $3E3E,X
  ROL $1515,X
  ORA $15,X
  ORA $15,X
  ORA $15,X
  ORA $94,X
@E1AE:
  ORA $8D19,Y
  STX $158F
  ORA $90,X
  .byte $13, $14
  STA ($92),Y
  .byte $93
  ORA $3E,X
  ROL $3E3E,X
  ROL $3E3E,X
  ROL $0A00,X
  BRK
  BRK
  ASL $07
  BRK
  BRK
  .byte $0C
  ORA $7C7B
  ADC $0C7E,X
  ORA $2D2D
  ADC $2A2A,Y
  NOP
  AND $132D
  .byte $13, $13, $13, $13, $13, $13, $13
  ASL $07
  ORA ($02,X)
  BVS $E1EE
  BRK
  ASL A
  .byte $0C
  ORA $7675
  .byte $77
  SEI
  .byte $0C
  ORA $2D2D
  ADC $2A2A,Y
@E1F9:
  NOP
  AND $132D
  .byte $13, $13, $13, $13, $13, $13, $13, $33, $33, $33, $32, $33, $33, $33, $33
  ROL $2E2D
  ROL $2D2E
  ROL $302E
  BMI $E247
  BMI $E249
  BMI $E24B
  BMI $E24E
  AND ($31),Y
  AND ($31),Y
  AND ($31),Y
  AND ($2B),Y
  ANC #$2B
  ANC #$EE
  ANC #$2B
  ANC #$2D
  ROL $2E2E
  .byte $EF
  ROL $2E2E
  BMI $E266
  BMI $E268
  BMI $E26A
  BMI $E26C
  AND ($31),Y
  AND ($31),Y
  AND ($31),Y
  AND ($31),Y
  BPL $E256
  BCS $E1F9
  .byte $B2
@E249:
  .byte $B3
  AND #$10
  .byte $13, $14
@E24E:
  LDY $B5,X
  LDX $B7,Y
  .byte $13, $14
  CLV
  CLV
@E256:
  CLV
  CLV
  CLV
  CLV
  CLV
  CLV
  .byte $1C, $1C, $1C, $1C, $1C, $1C, $1C, $1C
  ROL $E7
@E266:
  CPX $E2
@E268:
  .byte $33, $33
@E26A:
  .byte $33, $33
@E26C:
  ROL $26
  .byte $E7, $E3, $E2, $33, $33, $33
  ROL $26
  ROL $E7
  CPX $E2
  SBC $33
  AND $25
  AND $25
  INX
  SBC #$E1
  LDA $B133,X
  .byte $33, $33, $33, $B2, $33, $33
  LDY $B5,X
  LDY $B5,X
  LDY $B5,X
  LDY $B5,X
  LDX $B6,Y
  LDX $B6,Y
  LDX $B6,Y
  LDX $B6,Y
  AND $25
  AND $25
  AND $25
  AND $25
  .byte $33, $33, $33, $33, $BB
  LDX $26B7,Y
  .byte $33, $33, $33, $BB, $BF, $B7
  ROL $26
  .byte $33
  TSX
  .byte $BB
  LDX $26B7,Y
  ROL $26
  LDA $C0BC,X
  CLV
  AND $25
  AND $25
  .byte $33, $33, $33, $C2
  CMP $26
  ROL $26
  .byte $33, $33, $33
  CPY $C5
  ROL $26
  ROL $33
  .byte $33, $33, $C2
  CMP $26
  ROL $26
  LDA $BDBD,X
  .byte $C3
@E2E0:
  DEC $25
@E2E2:
  AND $25
  .byte $33
  INY
  DEX
  CMP $2626
  ROL $26
  .byte $33, $C7
  INY
  AXS #$CD
  ROL $26
  ROL $33
  .byte $33, $33
  INY
  DEX
  CMP $2626
  LDA $BDBD,X
  LDA $CCC9,X
  INC $CE26,X
  DEC $CECE
  DEC $CECE
  DEC $D0CF
  .byte $CF
  BNE $E2E0
  BNE $E2E2
  BNE $E314
  CMP ($FF),Y
  .byte $FF, $FF, $FF
  BVS $E31B
  LDA $BDBD,X
  LDA $BDBD,X
  .byte $6F
  LDA $2626,X
  ROL $26
  CMP $D2D5,Y
  .byte $33
  ROL $26
  ROL $D9
  CMP $D3,X
  CLD
  .byte $33
  ROL $26
  CMP $D2D5,Y
  .byte $33, $33, $33
  AND $DA
  DEC $D4,X
  LDA $BDBD,X
  LDA $2626,X
  ROL $DB
  .byte $DC, $33, $33, $33
  ROL $26
  ROL $DD
  .byte $DC, $33, $33, $33
  ROL $26
  ROL $DB
  .byte $DC, $33, $33, $33
  AND $25
  AND $DE
  .byte $DF
  LDA $BDBD,X
  LDA $A5
  LDA $A5
  LDA $A5
  LDA $A5
  LDX $A6
  LDX $A6
  LDX $A6
  LDX $A6
  .byte $A7, $A7, $A7, $A7, $A7, $A7, $A7, $A7
  TAY
  TAY
  TAY
  TAY
  TAY
  TAY
  TAY
  TAY
  ORA $00
  CPY $00
  BRK
  PHP
  BRK
  ASL A
  ORA $0D0C
  .byte $0C
  ORA $0D0C
  .byte $0C
  NOP
  NOP
  NOP
  NOP
  NOP
  NOP
  NOP
  NOP
  .byte $13, $13, $13, $13, $13, $13, $13, $13, $14, $14, $14, $14, $14, $14, $14, $14, $33, $33, $33, $33, $33, $33, $33, $33
  ORA $16,X
  ORA $EA,X
  SBC #$16
  ORA $16,X
  .byte $14, $14, $14, $14, $14, $14, $14, $14, $14, $14, $14, $14, $14, $14, $14, $14, $33, $33, $2F, $33
  SBC $3433
  .byte $33
  ORA $16,X
  ORA $EA,X
  CPX $1516
  ASL $14,X
  .byte $14, $14, $14, $14, $14, $14, $14
  ORA $15,X
  ADC #$6A
  ARR #$6C
  ORA $15,X
  ORA $15,X
  .byte $70, $6D  ; BVS $945D
  ROR $156F
  ORA $15,X
  ORA $70,X
  ADC $6F6E
  ORA $15,X
  ORA $15,X
  ORA $15,X
  `;
}

// $9400-$97FF (1024B): $9400-$97FF 代码/数据段6
function build_9400_97FF_seg6(): readonly number[] {
  return asm`
  ORA $15,X
  ORA $15,X
  ORA $15,X
  ADC ($62,X)
  .byte $63, $64
  ORA $15,X
  ORA $15,X
  ADC $66
  .byte $67
  PLA
  ORA $15,X
  ORA $15,X
  ADC $66
  .byte $67
  PLA
  ORA $15,X
  ORA $15,X
  ORA $15,X
  ORA $15,X
  ORA $15,X
  LDX #$55
  EOR $BD,X
  LDX $5555,Y
  LDY $5656,X
  ADC ($72),Y
  LSR $56,X
  TXS
  .byte $9B, $97, $97, $97, $97, $97, $97, $97, $97, $13, $13, $13, $13, $13, $13, $13, $13
  ORA $16,X
  ORA $15,X
  ORA $15,X
  .byte $17
  ORA $49,X
  LSR A
  ORA $18,X
  ORA $15,X
  ORA $15,X
  JMP $4948
  LSR A
  ORA $15,X
  ORA $16,X
  ALR #$4B
  ALR #$46
  .byte $47
  ROL $3E3E,X
  ORA $16,X
  ORA $15,X
  ORA $17,X
  ORA $15,X
  ORA $15,X
  CLC
  ORA $15,X
  ORA $15,X
  ORA $16,X
  ORA $15,X
  ORA $18,X
  ORA $15,X
  ASL $3E,X
  ROL $3E3E,X
  ROL $3E3E,X
  ROL $1715,X
  ORA $15,X
  ORA $15,X
  ASL $15,X
  ORA $15,X
  ORA $15,X
  CLC
  ORA $40,X
  EOR ($15,X)
  ASL $15,X
  ORA $40,X
  EOR ($42,X)
  .byte $43
  ROL $3E3E,X
  .byte $3F
  EOR $44
  .byte $44, $44
  AND ($22,X)
  BPL $E4C3
  BPL $E4BA
  BPL $E4BC
  ROL A
  .byte $23, $14, $13, $14, $13, $14, $13
  ANC #$24
  PLP
  .byte $27, $27, $27
@E4BA:
  .byte $27, $27
@E4BC:
  BIT $1C25
  .byte $1C, $1C, $1C, $1C
@E4C3:
  .byte $1C
  NOP
  .byte $3B
  ORA $15,X
  ORA $15,X
  ORA $15,X
  SEC
  AND $1010,Y
  BPL $E4E2
  AND #$10
  ROL A
  .byte $23, $14, $13, $14, $13, $14, $13
  AND $36,X
  .byte $1C, $1C, $1C, $1C
@E4E2:
  .byte $1C, $1C
  BPL $E50F
  BPL $E4F8
  BPL $E4FA
  AND $142E
  .byte $13, $14, $13, $14, $13, $2F
  ROL A
  .byte $27, $27, $27, $27
@E4F8:
  .byte $27
  ROL $30
  ANC #$1C
  .byte $1C, $1C, $1C, $1C, $1C
  AND ($2C),Y
  ORA $16,X
  ORA $15,X
  ORA $15,X
  .byte $3C
  AND $1010,X
  BPL $E520
  BPL $E522
  .byte $37
  SEC
  .byte $13, $14, $13, $14, $13, $14, $2F
  ROL A
  .byte $1C, $1C, $1C, $1C
@E520:
  .byte $1C, $1C
@E522:
  .byte $34
  AND $10,X
  .byte $1B
  BPL $E538
  BPL $E553
  BPL $E53C
  .byte $14, $13, $14, $13, $14, $13, $14, $13
  CPY $C4
  CPY $C4
@E538:
  CPY $C4
  CPY $C4
@E53C:
  .byte $1C, $1C, $1C, $1C, $1C, $1C, $1C, $1C, $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7, $F7
@E553:
  .byte $F7, $F7, $F7, $F7, $32, $33, $F7, $F7, $F7
  INC $FEFE,X
  INC $FEFE,X
  INC $C3FE,X
  .byte $C3, $C3
  PHA
  .byte $C3, $C3
  PHA
  .byte $C3
  EOR #$4A
  .byte $C3, $C3
  PHA
  .byte $C3, $C3, $C3
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  STY $83
  STY $83
  STY $83
  STY $83
  EOR #$4A
  .byte $C3, $C3
  PHA
  .byte $C3, $C3, $C3, $C3, $C3, $C3
  PHA
  .byte $C3, $C3, $C3
  PHA
  .byte $7F, $80, $7F, $80, $7F, $80, $7F, $80
  STA ($82,X)
  STA ($82,X)
  STA ($82,X)
  STA ($82,X)
  .byte $C3, $C3, $C3
  EOR #$4A
  .byte $C3
  ALR #$C3
  LSR A
  .byte $C3
  ALR #$C3
  .byte $C3, $C3, $C3
  EOR #$C3
  .byte $C3, $C3, $C3
  EOR #$4A
  .byte $C3, $C3, $C3
  ALR #$C3
  .byte $C3, $C3, $C3
  EOR #$4A
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  ORA ($02,X)
  .byte $03, $03
  CPY $C4
  CPY $C4
  ORA ($02,X)
  .byte $03, $03
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  .byte $04, $04
  ORA $01
  CPY $C4
  CPY $C4
  .byte $04, $04
  ORA $01
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  .byte $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7
  ORA $16,X
  ORA $15,X
  NOP
  ASL $15,X
  ORA $AD,X
  LDA $ADAD
  LDA $ADAD
  LDA $AEAE
  LDX $AEAE
  LDX $AEAE
  .byte $AF, $AF, $AF, $AF, $AF, $AF, $AF, $AF
  ASL $17,X
  CLC
  .byte $17
  ASL $15,X
  .byte $43
  ORA $26,X
  SBC $1927,X
  NOP
  ORA $191A,Y
  AND ($21,X)
  .byte $22, $54
  JMP ($6A4D)
  ARR #$69
  ADC #$69
  ADC #$69
  ADC #$69
  ADC #$C3
  .byte $C3, $C3, $C3
  PHA
  .byte $C3, $C3, $C3
  ALR #$C3
  .byte $C3, $C3, $C3, $C3, $C3, $C3, $C3, $C3
  JMP $C3C3
  EOR #$4A
  .byte $C3, $C3, $C3, $C3, $C3, $C3, $C3, $C3, $C3
  ORA $43,X
  ORA $16,X
  .byte $17
  CLC
  .byte $17
  ASL $19,X
  NOP
  ORA $191A,Y
  .byte $1F
  SBC $4E1E,X
  .byte $4F
  EOR $5453
  .byte $74
  AND ($21,X)
  ADC #$69
  ADC #$69
  ADC #$69
  ADC #$69
  ROL $26
  ROL $26
  ROL $26
  ROL $26
  .byte $97
  ROL $26
  ROL $26
  ROL $26
  ROL $A4
  TYA
  STA $979A,Y
  ROL $26
  ROL $9C
  STA $9F9E,X
  LDA ($A0,X)
  .byte $9B
  AND $26
  ROL $26
  ROL $26
  ROL $26
  ROL $26
  ROL $26
  ROL $26
  ROL $26
  ROL $A2
  LDX #$A2
  LDX #$A2
  LDX #$A2
  LDX #$A3
  .byte $A3, $A3, $A3, $A3, $A3, $A3, $A3
  ROL $26
  ROL $26
  ROL $26
  ROL $26
  ROL $26
  ROL $26
  ROL $26
  ROL $A6
  ROL $26
  ROL $A6
  .byte $A7
  TAY
  LDA #$A5
  AND $AA
  .byte $AB
  LDY $AEAD
  .byte $AF
  BCS $E73A
  ROL $37,X
  SEC
  AND $3B3A,Y
  .byte $3C
  AND $3F3E,X
  RTI
  EOR ($42,X)
  .byte $43, $44
  EOR $46
  .byte $47
  PHA
  EOR #$4A
  ALR #$4C
  EOR $4E4D
  .byte $4F
  BVC $E773
  .byte $4F
  BVC $E739
  .byte $14, $14, $14, $14, $14, $14, $14, $52, $53, $54
  EOR $56,X
  .byte $57
  CLI
  EOR $5B5A,Y
  .byte $5C
  EOR $5F5E,X
@E73A:
  EOR $1460,X
  .byte $14, $14, $14, $14, $14, $14, $14
  ADC ($75),Y
  ADC $817D,Y
  STA $89
  STA $7672
  NOP
  ROR $8682,X
  TXA
  STX $7773
  .byte $7B, $7F, $83, $87, $8B, $8F, $74
  SEI
  .byte $7C, $80
  STY $88
  STY $1490
  .byte $14
  STA ($7D),Y
  STA ($94,X)
  .byte $14, $14, $14, $14, $92
  ROR $9582,X
  .byte $14
@E773:
  .byte $14, $14, $14
  STA ($7F),Y
  .byte $83
  STY $14,X
  .byte $14, $14, $14
  STA ($80),Y
  STY $96
  .byte $14, $14, $33
  LDA ($33),Y
  .byte $33, $33, $B2, $33, $33
  LDY $B5,X
  LDY $B5,X
  LDY $B5,X
  LDY $B5,X
  .byte $27, $27, $27, $27, $27, $27, $27, $27
  AND $25
  AND $25
  AND $25
  AND $25
  ADC $6D6E
  ADC $6D6D
  ADC $166D
  .byte $17
  CLC
  .byte $17
  ASL $15,X
  .byte $43
  ORA $26,X
  SBC $1927,X
  NOP
  ORA $191A,Y
  .byte $6F, $6F, $6F, $6F, $6F, $6F, $6F, $6F
  ADC $6D6D
  ADC $6D6D
  ROR $156D
  .byte $43
  ORA $16,X
  .byte $17
  CLC
  .byte $17
  ASL $19,X
  NOP
  ORA $191A,Y
  .byte $1F
  SBC $6F1E,X
  .byte $6F, $6F, $6F, $6F, $6F, $6F, $6F
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA $99,X
  TXS
  .byte $9B, $9C
  STA $159E,X
  ORA $9F,X
  LDY #$A1
  LDX #$A3
  LDY $15
  BRK
  BRK
  BRK
  BRK
  `;
}

// $9800-$9BFF (1024B): $9800-$9BFF 代码/数据段7
function build_9800_9BFF_seg7(): readonly number[] {
  return asm`
  BRK
  BRK
  BRK
  BRK
  .byte $33, $33, $33, $33, $33, $33
  SBC $33
  .byte $33
  SBC $33
  .byte $33, $33, $33, $33, $33, $33, $33, $33
  SBC $33
  .byte $33
  SBC $33
  .byte $33, $33, $33, $33, $33, $33, $33, $33, $E2
  SBC $33
  .byte $33, $33, $33, $33, $33, $E3, $E2, $33, $33, $33, $33, $33, $33, $E7
  CPX $E2
  .byte $33, $33
  SBC $33
  .byte $33
  AND $E8
  SBC #$E1
  LDA $BDBD,X
  LDA $3333,X
  .byte $33
  LDA $3333,Y
  .byte $33, $33, $33, $33, $33, $33, $33, $33
  LDA $3333,Y
  TSX
  .byte $33, $33, $33, $33, $33, $33, $33, $33, $33, $33, $33, $33, $33, $33, $33, $33, $33, $33, $33, $33, $33, $BB, $33, $33, $33, $33, $33
  TSX
  .byte $BB, $BF, $33, $33
  LDA $3333,Y
  .byte $BB
  LDX $BDB7,Y
  LDA $BDBD,X
  LDY $B8C0,X
  AND $33
  .byte $33, $33, $33, $33
  TSX
  .byte $33, $BB, $33, $33, $33, $33, $33, $33, $BB
  AND #$33
  LDA $3333,Y
  .byte $33, $BB
  ROL A
  PLP
  LDA $BDBD,X
  LDA $C0BC,X
  BIT $ED25
  SBC $ED98
@E8A8:
  .byte $FB
  CLV
@E8AA:
  CLV
  CLV
@E8AC:
  SBC $F5,X
  SBC $F5,X
  .byte $FC
  INC $EEEE
  BEQ $E8A6
  BEQ $E8A8
  BEQ $E8AA
  BEQ $E8AC
  .byte $13, $13, $13, $13, $13, $13, $13, $13
  EOR ($51),Y
  EOR ($51),Y
  EOR ($51),Y
  EOR ($51),Y
  .byte $7C
  ADC $0C7E,X
  ORA $0D0C
  .byte $0C
  ROL A
  ROL A
  NOP
  AND $2D6D
  AND $6F2D
  .byte $6F, $6F, $6F, $6F, $6F, $6F, $6F
  ORA $15,X
  ORA $53,X
  .byte $54
  EOR $56,X
  LSR $4E,X
  BVC $E904
  ORA $53,X
  .byte $54
  EOR $56,X
  EOR $154E
  ORA $15,X
  .byte $53, $54
  EOR $3E,X
  .byte $4F
  ROL $3E3E,X
  ROL $5251,X
@E904:
  RTS
  RTS
  EOR $5F5E,X
  ORA $15,X
  ORA $60,X
  EOR $5F5E,X
  ORA $15,X
  .byte $57
  EOR $5E5D,Y
  .byte $5F
  ORA $15,X
  ORA $59,X
  NOP
  .byte $5B, $5C
  ROL $3E3E,X
  ROL $3E58,X
  .byte $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7
  INC $F6,X
  INC $F6,X
  .byte $B7, $B7, $B7, $B7, $C3, $C3, $C3, $C3, $B7, $B7, $F3, $F3, $F3, $F3, $F3
@E941:
  .byte $F3, $F3, $F3
  ROL $26
@E946:
  ROL $26
  ROL $26
  ROL $26
  ROL $26
  BEQ $E941
  BEQ $E946
  ROL $26
  ROL $26
  .byte $93, $F3, $F2
  SBC $26,X
  ROL $25
  AND $25
  AND $25
  AND $25
  AND $26
  BRK
  BEQ $E969
  BEQ $E96C
  .byte $03
  ROL $26
  .byte $04
  ORA $06
  .byte $07
  PHP
  ORA #$26
  ROL $0A
  ANC #$0C
  ORA $0F0E
  ROL $26
  ROL $26
  ROL $26
  ROL $26
  ROL $26
  BRK
  BPL $E999
  BEQ $E98C
  .byte $03
  ROL $26
  .byte $12, $13
  ORA $081A,Y
  ORA #$26
  ROL $1B
  .byte $1C
  ORA $1F1E,X
  .byte $0F
  ROL $26
  ROL $26
  ROL $26
  ROL $26
  ROL $26
  JSR $F0F0 ; → bank switch?
  BEQ $E9CB
  .byte $F4
  ROL $26
  .byte $22, $23, $93
  BIT $F6
  .byte $F7
  ROL $26
  SED
  SBC $FBFA,Y
  .byte $FC
  SBC $2626,X
  ROL $26
  ROL $26
  ROL $26
  ROL $15
  ASL $15,X
  ASL $16,X
  ORA $16,X
@E9CB:
  ORA $19,X
  NOP
  ORA $1A1A,Y
  ORA $191A,Y
  .byte $14, $14, $14, $14, $14, $14, $14, $14, $13, $13, $13, $13, $13, $13, $13, $13, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7, $B7
  ORA $16,X
  ORA $16,X
  ORA $16,X
  ORA $16,X
  .byte $17
  CLC
  .byte $17
  CLC
  .byte $17
  CLC
  .byte $17
  CLC
  ROL $26
  ROL $26
  ROL $26
  ROL $26
  AND $25
  AND $25
  AND $25
  AND $25
  ORA $1A,X
  CLC
  ORA $15,X
  .byte $17
  ORA $15,X
  ORA $15,X
  ORA $15,X
  ORA $15,X
  CLC
  RTI
  NOP
  ORA $15,X
  ASL $15,X
  RTI
  EOR ($42,X)
  ROL $3E3E,X
  ROL $453F,X
  .byte $44, $44
  ORA $16,X
  ORA $15,X
  ORA $15,X
  .byte $17
  ORA $4A,X
  ORA $15,X
  ORA $15,X
  CLC
  ORA $15,X
  PHA
  EOR #$4A
  ASL $15,X
  ORA $1A,X
  CLC
  ALR #$4B
  LSR $47
  ROL $3E3E,X
  ROL $3636,X
  ROL $8E,X
  .byte $B2
  ROL $36,X
  ROL $55,X
  EOR $55,X
  EOR $8F,X
  EOR $55,X
  EOR $56,X
  LSR $56,X
  LSR $56,X
  EOR $46
  LSR $44,X
  .byte $44, $44, $44, $44, $44, $47, $44
  ROL $36,X
  ROL $A0,X
  .byte $9F
  ROL $36,X
  ROL $55,X
  EOR $55,X
  .byte $A3
  EOR $55,X
  EOR $55,X
  LSR $71,X
  .byte $72
  LSR $56,X
  LSR $56,X
  LSR $44,X
  .byte $73, $44, $44, $44, $44, $44, $44
  BRK
  PHP
  BRK
  BRK
  ASL $07
  BRK
  ASL A
  .byte $0C
  ORA $0DF7
  .byte $0C
  ORA $0D0C
  .byte $14, $14
  SBC $FAFA,Y
  NOP
  NOP
  NOP
  .byte $13, $13
  SED
  .byte $13, $13, $13, $13, $13
  BPL $EAE1
  BPL $EAF1
  BPL $EADA
  BPL $EADC
  .byte $14, $13, $14, $13, $14
  STX $14,Y
  .byte $13
  TYA
  TYA
  TYA
  TYA
  TYA
  STA $C4,X
  CPY $1C
  .byte $1C, $1C, $1C, $1C
@EAE1:
  .byte $97, $1C, $1C
  STX $85
  STX $85
  STX $85
  STX $85
  LSR $88,X
  .byte $89
  LSR $56,X
@EAF1:
  EOR $46
  LSR $36,X
  ROL $8E,X
  .byte $B2
  ROL $36,X
  ROL $A8,X
  .byte $44, $44, $44, $47, $44, $44, $44
  LDA #$55
  EOR $90,X
  STA ($55),Y
  EOR $8F,X
  EOR $88,X
  .byte $89
  LSR $56,X
  .byte $92, $87
  LSR $56,X
  .byte $97, $97, $97, $97, $97, $97, $97, $97, $13, $13, $13, $13, $13, $13, $13, $13
  STA $99
  STA $99
  STA $99
  STA $99
  LSR $9A,X
  .byte $9B
  LSR $56,X
  LSR $9C,X
  LDA ($A0,X)
  .byte $9F
  ROL $36,X
  TAX
  ROL $36,X
  ROL $73,X
  .byte $44, $44, $44, $AB, $44, $44, $44
  CLV
  CLV
@EB46:
  CLV
  .byte $BF
@EB48:
  CPY #$C1
@EB4A:
  SBC $EEED
  INC $EFEE
  SBC $F5,X
  SBC $F5,X
  BEQ $EB46
  BEQ $EB48
  BEQ $EB4A
  BEQ $EB4C
  .byte $13, $13, $13, $13, $13, $13, $13, $13
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  CMP #$CA
  .byte $D2
  CPY $C4
  CPY $C4
  .byte $D2
  AXS #$CC
  .byte $C2
  CPY $C4
  CPY $C4
  CMP $C4C4
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  CMP #$FD
  .byte $D2
  CPY $C4
  CPY $C4
  .byte $D2, $FC
  CPY $C4C2
  CPY $C4
  CPY $FB
  CPY $C4
  CPY $C4
  CPY $C4
  CPY $C4
  EOR ($51),Y
  EOR ($51),Y
  EOR ($51),Y
  EOR ($51),Y
  ORA $0D0C
  .byte $0C
  ORA $7C7B
  ADC $2D2D,X
  AND $2D6E
  ADC $2A2A,Y
  .byte $6F, $6F, $6F, $6F, $6F, $6F, $6F, $6F
  TAX
  INC $FFFF
  .byte $BB
  TAX
  TAX
  TAX
  TAX
  NOP
  TAX
  TSX
  .byte $FF, $FF, $FF, $FF, $FF, $FF
  BRK
  BRK
  BRK
  NOP
  NOP
  .byte $FF, $FF, $FF, $FF, $FF
  `;
}

// $9C00-$9FFF (1024B): $9C00-$9FFF 代码/数据段8
function build_9C00_9FFF_seg8(): readonly number[] {
  return asm`
  .byte $FF, $FF, $FF, $FF
  BRK
  BRK
  BRK
  BRK
  .byte $FF, $FF, $FF, $FF
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  NOP
  .byte $FF, $FF, $FF, $FF
  TAX
  TAX
  TAX
  TAX
  TAX
  BRK
  BRK
  BRK
  BRK
  TAX
  BRK
  BRK
  BRK
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  NOP
  .byte $FF, $FF, $FF
  BRK
  .byte $FF, $FF, $FF, $FF
  BRK
  BRK
  .byte $FF, $FF, $FF, $FF
  NOP
  NOP
  .byte $FF, $FF, $FF, $FF
  NOP
  NOP
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $0F, $0F, $0F, $FF
  NOP
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $0F, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  BRK
  .byte $FF, $FF, $FF, $FF
  BRK
  BRK
  BRK
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  TAX
  TAX
  TAX
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $FF, $FF, $FF, $0F, $0F
  BRK
  .byte $FF, $FF, $FF
  BRK
  .byte $0F, $AF, $FF
  BRK
  BRK
  BRK
  .byte $FF, $0F, $FF
  BRK
  BRK
  CPY #$F0
  BEQ $ED18
  CPY $77BF
  .byte $FF, $FF, $33
  CPY $FEFB
  .byte $FF, $FF, $33
  LDY #$E0
  CPY $007A
  NOP
  NOP
  .byte $0F, $0F
  INC $CCFF,X
  .byte $FF, $FF, $FF, $FF
  CPY #$F0
  CPY $EFDF
  BRK
  BRK
  EOR $55,X
  .byte $43, $43
  TAX
  EOR $AA,X
  TAX
  TAX
  .byte $FF, $FF
  TAX
  TAX
@ED18:
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  .byte $FF
  TAX
  TAX
  TAX
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  TAX
  TAX
  TAX
  NOP
  NOP
  BRK
  BRK
  BRK
  TAX
  TAX
  NOP
  TAX
  TAX
  .byte $03, $03, $03
@EDA5:
  TAX
  INC $EEFE
  BRK
  BRK
  TAX
  LDX $30FE
  BMI $EDB1
@EDB1:
  BRK
  BRK
  BEQ $EDA5
  TAX
  .byte $AB, $AB, $AB
  CPY #$00
  TAX
  TAX
  BRK
  BRK
  CPY $CCAA
  .byte $FC
  TAX
  TAX
  TAX
@EDC6:
  TSX
  .byte $0C, $0C
  TAX
  TAX
  BRK
  BRK
  .byte $0C, $FF, $FF, $FF, $FF
  TAX
  TAX
  BEQ $EDC6
  .byte $FF, $FF
  BMI $EE0D
  CMP $CC33,X
  .byte $FF, $FF
  NOP
  .byte $FF, $33
  BRK
  TAX
  BRK
  .byte $FF, $FF, $FF, $FF, $FF
  TAX
  TAX
  TAX
  TAX
  TAX
  .byte $FF, $FF
  TAX
  TAX
  TAX
  TAX
  .byte $FF, $FF, $FF, $FF
  TAX
  TAX
  TAX
  TAX
  .byte $FF
  TAX
  TAX
  BRK
  TAX
  TAX
  .byte $FF, $FF, $FF, $FF, $FF
  BRK
  BRK
  BRK
  BRK
  BRK
@EE0D:
  TAX
  .byte $FF
  BRK
  BRK
  .byte $FF, $FF, $FF
  BRK
  BRK
  TAX
  TAX
  BRK
  BRK
  BRK
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF
  TAX
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  TAX
  TAX
  TAX
  .byte $FF
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  .byte $FF
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  ROL A
  ASL A
  ASL A
  TXA
  .byte $22
  BRK
  BRK
  DEY
  ROL A
  ASL A
  ASL A
  TXA
  BRK
  BRK
  DEY
  .byte $22
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
@EE62:
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  INC $FFFF
  INC $FFFF
  .byte $BB, $BB, $FF, $FF, $BB
  INC $FFFF
  .byte $BB
  INC $FF00
  BRK
  BRK
  LDX $55
  EOR $55,X
  EOR $AA,X
  TAX
  .byte $FF
  EOR $FF,X
  EOR $AA,X
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  TAX
  .byte $FF, $FF
  NOP
  NOP
  NOP
  TSX
  .byte $FF, $FF, $FF, $FF
  BRK
  BRK
  EOR $55,X
  EOR $55,X
  CMP $FFAA,X
  .byte $FF
  EOR $70,X
  BRK
  EOR $5557,X
  BCC $EE7E
  RTS
  EOR $5557,X
  TAX
  TAX
  TAX
  TAX
  BVC $EE62
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  TAX
  .byte $FF
  TAX
  TAX
  BCC $EF35
  EOR $55,X
  EOR $AA60,X
  CPY $FFFF
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
@EF35:
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  `;
}

// ═══════════════════════════════════════════════════
// Assemble all sections into full 8KB bank
// ═══════════════════════════════════════════════════
const _PRG_BANK_11: readonly number[] = [
  ...build_8000_83FF_seg1(),
  ...build_8400_87FF_seg2(),
  ...build_8800_8BFF_seg3(),
  ...build_8C00_8FFF_seg4(),
  ...build_9000_93FF_seg5(),
  ...build_9400_97FF_seg6(),
  ...build_9800_9BFF_seg7(),
  ...build_9C00_9FFF_seg8(),
];
