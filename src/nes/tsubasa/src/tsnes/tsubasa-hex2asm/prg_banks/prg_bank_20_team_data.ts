/**
 * PRG-ROM MMC3 bank 20 (8KB) — function-based assembly
 * Mapper: 4 (MMC3) | CPU: $8000-$9FFF
 * CDL: code=2002 data=6070 unaccessed=120
 *
 * 功能: 队伍/球员选择界面
 *
 * Pattern: 参考 bank_31.ts
 *   每个 build_xxx() 函数返回其覆盖地址范围的 raw 6502 字节，
 *   最后通过 spread 拼成完整的 8KB 数组
 */


import { asm } from '../_6502asm';
export { _PRG_BANK_20 as default };

console.log('[prg_20_team_data] loaded');

// $8000-$83FF (1024B): $8000-$83FF 代码/数据段1
function build_8000_83FF_seg1(): readonly number[] {
  return asm`
  JMP $800F
  JMP $84DC
  JMP $83D9
  JMP $8624
  JMP $8796
  LDA $053A
  BEQ @E083
  BPL @E067
  LDX #$01
  STX $053A
  LDA $053C
  LDX #$68
  STX $4C
  LDX #$89
  STX $4D
  ASL A
  BCC @E02B
  INC $4D
@E02B:
  TAY
  LDA ($4C),Y
  TAX
  INY
  LDA ($4C),Y
  STX $4C
  STA $4D
  LDX #$00
@E038:
  LDA #$00
  STA $0547,X
  TXA
  CLC
  ADC #$15
  TAX
  CMP #$7E
  BNE @E038
  LDA #$01
  STA $053B
  LDA #$00
  STA $053D
  STA $0540
  LDA #$FF
  STA $0541
  LDA #$01
  STA $0543
  LDA #$23
  STA $0544
  LDA #$45
  STA $0545
@E067:
  DEC $053B
  BEQ @E06D
  RTS
@E06D:
  LDY #$00
  LDA ($4C),Y
  CMP #$F0
  BCC @E07B
  JSR $8084 ; → bank switch?
  JMP $806D
@E07B:
  STA $053B
  LDA #$01
  JSR $83CF ; → bank switch?
@E083:
  RTS
  SEC
  SBC #$F0
  JSR $C509 ; → bank switch?
  LDX #$80
  TAX
  .byte $80
  ANC #$81
  SEC
  STA ($42,X)
  STA ($53,X)
  STA ($AE,X)
  .byte $83
  LDA $6F83,X
  STA ($7C,X)
  STA ($95,X)
  STA ($A9,X)
  STA ($68,X)
  PLA
  LDA #$00
  STA $053A
  RTS
  LDY #$05
  LDA ($4C),Y
  AND #$1C
  LSR A
  TAX
  LDA $88E4,X
  STA $3A
  LDA $88E5,X
  STA $3B
  LDY #$00
  TYA
@E0BF:
  STA ($3A),Y
  INY
  CPY #$15
  BNE @E0BF
  LDY #$01
  LDA ($4C),Y
  LDX #$B4
  STX $3E
  LDX #$A1
  ASL A
  BCC @E0D4
  INX
@E0D4:
  STX $3F
  TAY
  LDA ($3E),Y
  TAX
  INY
  LDA ($3E),Y
  LDY #$02
  STA ($3A),Y
  DEY
  TXA
  STA ($3A),Y
  LDY #$02
  LDA ($4C),Y
  LDX #$47
  STX $3E
  LDX #$AC
  ASL A
  BCC @E0F3
  INX
@E0F3:
  STX $3F
  TAY
  LDA ($3E),Y
  TAX
  INY
  LDA ($3E),Y
  LDY #$04
  STA ($3A),Y
  DEY
  TXA
  STA ($3A),Y
  LDY #$03
  LDA ($4C),Y
  LDY #$08
  STA ($3A),Y
  LDY #$04
  LDA ($4C),Y
  LDY #$0C
  STA ($3A),Y
  LDY #$05
  LDA ($4C),Y
  TAX
  AND #$03
  STA $3C
  ORA $3C
  ORA #$80
  LDY #$00
  STA ($3A),Y
  LDA #$06
  JSR $83CF ; → bank switch?
  RTS
  LDA #$00
  STA $053E
  LDA #$01
  STA $053D
  JMP $83CF
  LDA #$00
  STA $053D
  LDA #$01
  JMP $83CF
  LDY #$01
@E144:
  LDA ($4C),Y
  STA $0493,Y
  INY
  CPY #$05
  BNE @E144
  LDA #$05
  JMP $83CF
  LDY #$01
  LDA ($4C),Y
  BPL @E15F
  JSR $81BA ; → bank switch?
  JMP $8164
@E15F:
  LDX #$10
  JSR $C530 ; → bank switch?
  JSR $C533 ; → bank switch?
  BRK
  JMP ($A904)
  .byte $02
  JMP $83CF
  LDY #$01
  LDA ($4C),Y
  TAX
  INY
  LDA ($4C),Y
  STX $4C
  STA $4D
  RTS
  LDY #$01
  LDA ($4C),Y
  STA $0542
  INY
  TYA
  CLC
  ADC $4C
  STA $4E
  LDA $4D
  ADC #$00
  STA $4F
  LDA #$02
  JMP $83CF
  LDA #$01
  DEC $0542
  BEQ @E1A6
  LDA $4E
  STA $4C
  LDA $4F
  STA $4D
  LDA #$00
@E1A6:
  JMP $83CF
  LDY #$01
@E1AB:
  LDA ($4C),Y
  STA $0542,Y
  INY
  CPY #$04
  BNE @E1AB
  LDA #$04
  JMP $83CF
  AND #$7F
  JSR $C509 ; → bank switch?
  .byte $CF
  STA ($E9,X)
  STA ($DB,X)
  STA ($E1,X)
  STA ($BC,X)
  .byte $82, $7F, $83, $7F, $83
  CMP $81,X
  LDA $0441
  JMP $81EC
  LDA $05FC
  JMP $81EC
  LDA $05FB
  JMP $81EC
  LDA $05FB
  EOR #$0B
  JMP $81EC
  LDA $0442
  STA $3A
  JSR $C50C ; → bank switch?
  JSR $826A ; → bank switch?
  LDY #$00
  LDA ($34),Y
  BEQ @E201
  JSR $8282 ; → bank switch?
  LDX #$00
  BEQ @E213
@E201:
  LDA $002B
  SEC
  SBC #$03
  LDX #$02
  LDY $3A
  BEQ @E211
  CPY #$0B
  BNE @E213
@E211:
  LDX #$04
@E213:
  STA $3A
  LDY #$00
  STY $3B
  TAY
  ASL A
  ROL $3B
  ASL A
  ROL $3B
  ADC $3A
  STA $3A
  LDA #$00
  ADC $3B
  STA $3B
  CLC
  LDA $3A
  ADC $8264,X
  STA $3A
  LDA $3B
  ADC $8265,X
  STA $3B
  LDY #$00
  LDA ($3A),Y
  INY
  PHA
  LDX #$00
@E241:
  TXA
  AND #$03
  BEQ @E25D
  CMP #$01
  BEQ @E258
  CMP #$02
  BEQ @E253
  PLA
  PHA
  JMP $825A
@E253:
  LDA ($3A),Y
  INY
  BNE @E25A
@E258:
  LDA #$0F
@E25A:
  STA $047F,X
@E25D:
  INX
  CPX #$10
  BNE @E241
  PLA
  RTS
  .byte $0C
  CLV
  .byte $C7
  LDX $67,Y
  .byte $B7
  LDY #$00
  LDA ($34),Y
  PHP
  TAX
  LDA $88F0,X
  PLP
  BNE @E27E
  LDX $3A
  CPX #$0B
  BNE @E27E
  LDA #$04
@E27E:
  STA $0546
  RTS
  LDX #$01
  STA $3B
  CMP #$01
  BEQ @E296
  LDX #$00
  CMP #$0F
  BCC @E296
  CMP #$17
  BCS @E296
  LDX #$02
@E296:
  TXA
  JSR $C509 ; → bank switch?
  LDY #$82
  .byte $A3, $82
  LDA $A582
  .byte $3B
  RTS
  LDA #$01
  LDX $002A
  BEQ @E2AC
  LDA #$76
@E2AC:
  RTS
  LDA #$00
  LDX $002A
  CPX #$01
  BEQ @E2B8
  LDA #$68
@E2B8:
  CLC
  ADC $3B
  RTS
  LDY #$02
  LDA ($4C),Y
  BPL @E2C5
  JSR $8316 ; → bank switch?
@E2C5:
  LDX #$00
  STX $3B
  ASL A
  ROL $3B
  ASL A
  ROL $3B
  ASL A
  ROL $3B
  ASL A
  ROL $3B
  ADC #$CF
  STA $3A
  LDA $3B
  ADC #$BA
  STA $3B
@E2DF:
  LDA $82F6,X
  BPL @E2E9
  AND #$7F
  TAY
  LDA ($3A),Y
@E2E9:
  STA $046F,X
  INX
  CPX #$20
  BNE @E2DF
  LDA #$01
  JMP $83CF
  .byte $0F, $0F, $0F
  BMI $E30A
  AND ($89,X)
  TXA
  .byte $0F
  AND ($8B,X)
  STY $210F
  STA $0F8E
  .byte $0F, $80
  STA ($0F,X)
  .byte $0F, $82, $83, $0F, $0F
  STY $85
  .byte $0F
  STX $87
  DEY
  AND #$7F
  JSR $C509 ; → bank switch?
  ANC #$83
  AND $83,X
  .byte $42, $83, $47, $83
  ADC ($83,X)
  ADC $83
  ROR A
  .byte $83, $7B, $83
  LDA #$00
  LDX $002A
  BEQ @E334
  LDA #$01
@E334:
  RTS
  LDA #$03
  LDX $002A
  CPX #$01
  BEQ @E341
  CLC
  ADC #$01
@E341:
  RTS
  LDA #$05
  JMP $8337
  CLC
  PHP
  LDA #$2E
  LDX $002B
  CPX #$12
  BEQ @E35D
  LDA #$07
  LDX $002A
  CPX #$01
  BEQ @E35D
  LDA #$09
@E35D:
  PLP
  ADC #$00
  RTS
  SEC
  JMP $8348
  LDA #$0B
  JMP $8337
  CLC
  PHP
  LDA #$15
  LDX $002A
  CPX #$02
  BEQ @E377
  LDA #$26
@E377:
  PLP
  ADC #$00
  RTS
  SEC
  JMP $836B
  LDX #$00
  LDA $05FB
  BEQ @E387
  INX
@E387:
  LDA $002A,X
  ASL A
  TAY
  LDX #$00
@E38E:
  LDA $83A6,X
  STA $047F,X
  INX
  CPX #$08
  BNE @E38E
  LDA $BA87,Y
  STA $0481
  LDA $BA88,Y
  STA $0482
  RTS
  .byte $0F, $0F
  BRK
  BRK
  .byte $0F, $0F
  BMI @E3AE
@E3AE:
  LDY #$01
  LDA ($4C),Y
  TAX
  LDA #$00
  STA $0547,X
  LDA #$02
  JMP $83CF
  LDY #$01
  LDA ($4C),Y
  STA $0540
  INY
  LDA ($4C),Y
  STA $0541
  LDA #$03
  JMP $83CF
  CLC
  ADC $4C
  STA $4C
  BCC @E3D8
  INC $4D
@E3D8:
  RTS
  LDY #$10
  LDA ($3C),Y
  BEQ @E3E9
  CMP #$FF
  BEQ @E3E8
  SEC
  SBC #$01
  STA ($3C),Y
@E3E8:
  RTS
@E3E9:
  LDY #$00
  LDA ($3C),Y
  AND #$9F
  STA ($3C),Y
  LDY #$13
  LDA #$00
  STA ($3C),Y
  INY
  STA ($3C),Y
  LDY #$03
  LDA ($3C),Y
  STA $3E
  `;
}

// $8400-$87FF (1024B): $8400-$87FF 代码/数据段2
function build_8400_87FF_seg2(): readonly number[] {
  return asm`
  INY
  LDA ($3C),Y
  STA $3F
  LDY #$00
  STY $40
  LDY $40
  INC $40
  LDA ($3E),Y
  CMP #$F0
  BCC @E419
  JSR $8438 ; → bank switch?
  JMP $8409
@E419:
  TAX
  INY
  TYA
  PHA
  LDA ($3E),Y
  LDY #$12
  STA ($3C),Y
  TXA
  LDY #$10
  STA ($3C),Y
  PLA
  LDY #$03
  SEC
  ADC $3E
  STA ($3C),Y
  INY
  LDA #$00
  ADC $3F
  STA ($3C),Y
  RTS
  SEC
  SBC #$F0
  JSR $C509 ; → bank switch?
  .byte $50, $84  ; BVC $83C4
  EOR $5D84,Y
  STY $66
  STY $77
  STY $96
  STY $B3
  STY $C7
  STY $D2
  STY $A0
  .byte $10, $A9  ; BPL $83FC
  .byte $FF
  STA ($3C),Y
  PLA
  PLA
  RTS
  LDA #$20
  BNE @E45F
  LDA #$40
@E45F:
  LDY #$00
  ORA ($3C),Y
  STA ($3C),Y
  RTS
  LDY $40
  LDA ($3E),Y
  TAX
  INY
  LDA ($3E),Y
  STA $3F
  STX $3E
  LDA #$00
  STA $40
  RTS
  LDY $40
  LDA ($3E),Y
  PHA
  INY
  STY $40
  TYA
  LDX $3F
  CLC
  ADC $3E
  BCC @E488
  INX
@E488:
  LDY #$0E
  STA ($3C),Y
  TXA
  INY
  STA ($3C),Y
  LDY #$0D
  PLA
  STA ($3C),Y
  RTS
  LDY #$0D
  LDA ($3C),Y
  SEC
  SBC #$01
  BNE @E4A0
  RTS
@E4A0:
  STA ($3C),Y
  LDY #$0E
  LDA ($3C),Y
  TAX
  INY
  LDA ($3C),Y
  STA $3F
  STX $3E
  LDA #$00
  STA $40
  RTS
  LDY $40
  LDA ($3E),Y
  TAX
  INY
  LDA ($3E),Y
  INY
  STY $40
  LDY #$14
  STA ($3C),Y
  DEY
  TXA
  STA ($3C),Y
  RTS
  LDY $40
  LDA ($3E),Y
  LDY #$12
  STA ($3C),Y
  JMP $8450
  LDY $40
  INC $40
  LDA ($3E),Y
  STA $0546
  RTS
  LDY #$11
  LDA ($3C),Y
  BEQ @E4EF
  CMP #$FF
  BNE @E4E7
  RTS
@E4E7:
  SEC
  SBC #$01
  STA ($3C),Y
  JMP $852A
@E4EF:
  STA $40
  LDY #$01
  LDA ($3C),Y
  STA $3E
  INY
  LDA ($3C),Y
  STA $3F
  LDY #$00
  LDA ($3C),Y
  AND #$10
  BEQ @E50F
  LDA #$04
  CLC
  ADC $3E
  STA $3E
  BCC @E50F
  INC $3F
@E50F:
  LDY #$00
  LDA ($3C),Y
  AND #$EF
  STA ($3C),Y
  JSR $857A ; → bank switch?
  LDA $40
  LDY #$01
  CLC
  ADC $3E
  STA ($3C),Y
  INY
  LDA $3F
  ADC #$00
  STA ($3C),Y
  LDA #$00
  STA $42
  STA $43
  LDY #$00
  LDA ($3C),Y
  AND #$FC
  STA $41
  LDA ($3C),Y
  LSR A
  ROL $42
  LSR A
  ROL $43
  LDX #$00
  LDY #$05
  JSR $85F2 ; → bank switch?
  LDX #$01
  LDY #$09
  JSR $85F2 ; → bank switch?
  LDA #$00
  LSR $43
  ROL A
  LSR $42
  ROL A
  ORA $41
  LDY #$00
  STA ($3C),Y
  AND #$10
  BEQ @E579
  LDY #$01
  LDA ($3C),Y
  STA $3E
  INY
  LDA ($3C),Y
  STA $3F
  LDX #$05
  LDY #$01
  JSR $860D ; → bank switch?
  LDX #$09
  LDY #$03
  JSR $860D ; → bank switch?
@E579:
  RTS
  LDY $40
  INC $40
  LDA ($3E),Y
  JSR $C509 ; → bank switch?
  LDY #$85
  LDA #$85
  CMP $85,X
  SBC ($85,X)
  STA $A485
  RTI
  LDA ($3E),Y
  TAX
  INY
  LDA ($3E),Y
  STA $3F
  STX $3E
  LDA #$00
  STA $40
  JMP $857A
  LDY #$11
  LDA #$FF
  STA ($3C),Y
  PLA
  PLA
  RTS
  JSR $85E7 ; → bank switch?
  LDY $40
  LDA ($3E),Y
  TAX
  INY
  LDA ($3E),Y
  INY
  STY $40
  LDY #$07
  STA ($3C),Y
  DEY
  DEY
  TXA
  STA ($3C),Y
  LDY $40
  LDA ($3E),Y
  TAX
  INY
  LDA ($3E),Y
  INY
  STY $40
  LDY #$0B
  STA ($3C),Y
  DEY
  DEY
  TXA
  STA ($3C),Y
  RTS
  JSR $85E7 ; → bank switch?
  LDY #$00
  LDA ($3C),Y
  ORA #$10
  STA ($3C),Y
  RTS
  JSR $85A9 ; → bank switch?
  JMP $85D8
  LDY $40
  LDA ($3E),Y
  LDY #$11
  STA ($3C),Y
  INC $40
  RTS
  CLC
  LDA ($3C),Y
  INY
  ADC ($3C),Y
  STA ($3C),Y
  INY
  LDA ($3C),Y
  BPL @E601
  DEC $42,X
@E601:
  INY
  ADC ($3C),Y
  STA ($3C),Y
  LDA $42,X
  ADC #$00
  STA $42,X
  RTS
  LDA ($3E),Y
  PHA
  DEY
  LDA ($3E),Y
  PHA
  TXA
  TAY
  PLA
  CLC
  ADC ($3C),Y
  STA ($3C),Y
  INY
  INY
  PLA
  ADC ($3C),Y
  STA ($3C),Y
  RTS
  LDA $062D
  AND #$0F
  CMP #$05
  BNE @E630
  JMP $8861
@E630:
  JSR $8753 ; → bank switch?
  LDA #$00
  STA $46
  LDA $46
  BNE @E63E
  JMP $86CF
@E63E:
  CMP #$0B
  BNE @E645
  JMP $86CF
@E645:
  JSR $86DB ; → bank switch?
  BCS @E64D
  JMP $86CF
@E64D:
  LDX $3B
  LDY #$06
  LDA ($34),Y
  CMP #$34
  BCS @E659
  LDA #$34
@E659:
  CMP #$CC
  BCC @E65F
  LDA #$CC
@E65F:
  PHA
  LDA $062D
  AND #$0F
  TAY
  PLA
  CLC
  ADC $88DA,Y
  STA $0203,X
  LDY #$08
  LDA ($34),Y
  CMP #$54
  BCS @E678
  LDA #$54
@E678:
  CMP #$AC
  BCC @E67E
  LDA #$AC
@E67E:
  PHA
  LDA $062D
  AND #$0F
  TAY
  PLA
  CLC
  ADC $88DF,Y
  STA $0200,X
  LDA #$03
  STA $0202,X
  BIT $0615
  BPL @E6A8
  LDA $05FB
  BEQ @E6A8
  LDA $46
  CMP #$0B
  BCS @E6A8
  JSR $86F2 ; → bank switch?
  JMP $86B5
@E6A8:
  LDA $46
  CMP $0441
  BNE @E6B5
  JSR $881D ; → bank switch?
  JMP $86C4
@E6B5:
  CMP #$0B
  BCC @E6BB
  SBC #$01
@E6BB:
  CLC
  ADC #$11
  CMP #$20
  BCC @E6C4
  ADC #$0F
@E6C4:
  STA $0201,X
  INX
  INX
  INX
  INX
  STX $3B
  INC $48
  INC $46
  LDA $46
  CMP #$16
  BEQ @E6DA
  JMP $8637
@E6DA:
  RTS
  JSR $C50C ; → bank switch?
  LDA $062D
  AND #$0F
  JSR $C509 ; → bank switch?
  ORA $1D87,X
  .byte $87, $1F, $87, $3B, $87
  ORA $0087,X
  BRK
  LDA $46
  CMP $05FD
  BNE @E71C
  LDA $062E
  BNE @E70F
  LDY #$07
  LDA $062D
  EOR #$40
  STA $062D
  BVS @E70C
  LDY #$04
@E70C:
  STY $062E
@E70F:
  DEC $062E
  LDA $46
  BIT $062D
  BVS @E71C
  CLC
  ADC #$0B
@E71C:
  RTS
  SEC
  RTS
  LDA $46
  CMP #$0B
  BCS @E739
  CMP $0441
  BEQ @E739
  LDX $0430
  BEQ @E737
@E72F:
  CMP $0430,X
  BEQ @E739
  DEX
  BNE @E72F
@E737:
  CLC
  RTS
@E739:
  SEC
  RTS
  LDA $46
  CMP $0441
  BEQ @E751
  LDX $0600
  BEQ @E74F
@E747:
  CMP $0600,X
  BEQ @E751
  DEX
  BNE @E747
@E74F:
  SEC
  RTS
@E751:
  CLC
  RTS
  LDA $062D
  AND #$0F
  JSR $C509 ; → bank switch?
  .byte $67, $87
  PLA
  .byte $87
  ADC ($87),Y
  STY $87
  .byte $67, $87
  BRK
  BRK
  RTS
  LDA $0624
  JSR $C536 ; → bank switch?
  JMP $87E7
  LDA $05FC
  JSR $C50C ; → bank switch?
  LDY #$06
  LDA ($34),Y
  TAX
  LDY #$08
  LDA ($34),Y
  TAY
  JMP $87E7
  LDA $0624
  JSR $87A7 ; → bank switch?
  PHA
  LDA $0624
  JSR $87C7 ; → bank switch?
  PLA
  TAX
  JMP $87E7
  LDA #$10
  JSR $87A7 ; → bank switch?
  STA $0635
  LDA #$10
  JSR $87C7 ; → bank switch?
  STA $0637
  RTS
  STA $3E
  LDA $062C
  JSR $C545 ; → bank switch?
  STX $3C
  STY $3D
  LDX $0639
  LDY $0635
@E7B9:
  CLC
  TXA
  ADC $3C
  TAX
  TYA
  ADC $3D
  TAY
  DEC $3E
  BPL @E7B9
  RTS
  STA $3E
  LDA $062C
  JSR $C542 ; → bank switch?
  STX $3C
  STY $3D
  LDX $063B
  LDY $0637
@E7D9:
  CLC
  TXA
  ADC $3C
  TAX
  TYA
  ADC $3D
  TAY
  DEC $3E
  BPL @E7D9
  RTS
  TXA
  CLC
  ADC #$FD
  LDX $3B
  STA $0203,X
  TYA
  CLC
  ADC #$C7
  STA $0200,X
  LDA #$3C
  LDY $062D
  CPY #$83
  PHP
  .byte $A0
  `;
}

// $8800-$8BFF (1024B): $8800-$8BFF 代码/数据段3
function build_8800_8BFF_seg3(): readonly number[] {
  return asm`
  ORA ($28,X)
  BNE @E808
  LDY #$03
  LDA #$11
@E808:
  STA $0201,X
  TYA
  STA $0202,X
  INX
  INX
  INX
  INX
  STX $3B
  INC $48
  LDA #$01
  STA $0532
  RTS
  LDY $0640
  BNE @E834
  LDY $0641
  INY
  CPY #$03
  BNE @E82C
  LDY #$00
@E82C:
  STY $0641
  LDA #$04
  STA $0640
@E834:
  LDA #$00
  LDY $05FB
  PHP
  LDY $0641
  PLP
  BNE @E847
  TYA
  CLC
  ADC #$03
  TAY
  LDA #$80
@E847:
  BIT $0637
  BMI @E84E
  EOR #$80
@E84E:
  ORA $0202,X
  STA $0202,X
  LDA $885B,Y
  DEC $0640
  RTS
  ROL $37,X
  AND $373D,X
  ROL $AD,X
  BIT $0A00
  STA $46
  ASL A
  ASL A
  ADC $46
  TAX
  LDA #$00
  STA $46
@E870:
  LDY $46
  LDA $88D0,Y
  LDY $3B
  STA $0201,Y
  LDA $88A8,X
  PHA
  AND #$F0
  LSR A
  CLC
  ADC #$A0
  STA $0203,Y
  PLA
  AND #$0F
  ASL A
  ASL A
  ADC #$A2
  STA $0200,Y
  LDA #$00
  STA $0202,Y
  INX
  INY
  INY
  INY
  INY
  STY $3B
  INC $48
  INC $46
  LDA $46
  CMP #$0A
  BNE @E870
  RTS
  BMI @E8E4
  AND $25,X
  .byte $52
  NOP
  CLI
  ADC $55,X
  BVS $E8D3
  ROL A
  AND $15
  EOR ($59),Y
  LSR $77
  .byte $44, $73
  JSR $252A
  .byte $43
  EOR ($59),Y
  .byte $47, $77
  EOR $73,X
  JSR $242A
  ROL $45
  NOP
  PHA
  ADC $63,X
  .byte $42, $1C
  ORA $1F1E,X
  BMI $E907
  .byte $32, $33, $34
  AND $1D,X
  SBC $FDFD,X
  SBC $C72C,X
  .byte $C7, $C7, $C7
@E8E4:
  .byte $47
  ORA $5C
  ORA $71
  ORA $86
  ORA $9B
  ORA $B0
  ORA $08
  BRK
  .byte $0F
  ASL $04
  ORA #$05
  PHP
  PHP
  ORA ($02,X)
  PHP
  ORA #$04
  PHP
  BPL @E909
  .byte $02
  ORA ($03,X)
  ASL $0B
  ORA $03
  .byte $03
@E909:
  ORA ($07,X)
  .byte $04, $04, $02, $02, $04, $02, $0C
  ASL $0103
  ANC #$0F
  ASL $02
  .byte $07, $04
  ASL A
  ORA #$08
  .byte $04
  ORA ($03,X)
  .byte $03, $04
  ORA ($02),Y
  .byte $02, $07, $02, $04
  ASL $0209
  ANC #$01
  .byte $04, $02, $0C, $07
  ANC #$01
  .byte $02, $02, $03, $03, $04
  ASL $04
  .byte $02
  ASL $0606
  .byte $07
  ASL A
  ASL $11
  ORA ($04,X)
  ORA $0F
  .byte $04
  ORA ($0B,X)
  ORA #$0F
  .byte $02
  ORA #$0B
  .byte $03
  ORA $01
  ORA ($00,X)
  .byte $03, $04, $02
  ANC #$01
  ORA $070A
  ORA ($02,X)
  ORA #$06
  ORA $09
  .byte $04
  PHP
  ASL $600B
  RTS
  PHA
  .byte $8B, $5C, $8B
  ROR A
  .byte $8B
  SEI
  .byte $8B
  STX $8B
  STY $8B,X
  LDY $8B,X
  DEX
  .byte $8B
  CPX #$8B
@E97A:
  INC $048B
  STY $8C12
  PLP
  STY $8C3C
  LSR A
  STY $8C61
  SEI
  STY $8C86
@E98C:
  STY $8C,X
  LDX #$8C
  LDA $D08C,Y
  STY $8CDE
  CPX $098C
  STA $8D1F
  .byte $52
  STA $8D60
  .byte $89
  STA $8D97
  LDA $8D
@E9A6:
  .byte $B3
  STA $8DC1
  .byte $CF
  STA $8E05
  .byte $1B
  STX $8E32
  .byte $5B
  STX $8E7A
  STX $C68E
  STX $8EE5
  .byte $F3
  STX $8F29
  .byte $53, $8F, $7C, $8F
  STA $A78F,Y
  .byte $8F
  LDX $CC8F,Y
  .byte $8F, $E2, $8F
  SBC $3A8F,Y
  BCC $EA42
  BCC @E97A
  BCC $E98A
  BCC @E9A6
  BCC $E9AD
  BCC $E9B4
  BCC @E9EB
  STA ($41),Y
  STA ($52),Y
  STA ($60),Y
  STA ($77),Y
  STA ($8E),Y
  STA ($A5),Y
@E9EB:
  STA ($BC),Y
  STA ($CA),Y
  STA ($D8),Y
  STA ($E6),Y
  STA ($F4),Y
  STA ($02),Y
  .byte $92
  BPL @E98C
  ASL $3292,X
  .byte $92
  RTI
  .byte $92
  EOR $92
  .byte $53, $92
  ADC ($92,X)
  .byte $6F, $92
  ADC $8B92,X
  .byte $92, $9F, $92
  LDA $BB92
  .byte $92
  CMP #$92
  .byte $D7, $92
  SBC $92
  .byte $F3, $92
  ORA $2393
  .byte $93
  AND $5793,X
  .byte $93
  ADC ($93),Y
  .byte $7F, $93
  STA $A493
  .byte $93
  CPX $0393
  STY $11,X
  STY $25,X
  STY $33,X
  STY $41,X
@EA35:
  STY $56,X
  STY $6A,X
  STY $7E,X
  STY $8C,X
  STY $A2,X
  STY $BC,X
  STY $F4,X
  STY $2C,X
  STA $49,X
  STA $79,X
  STA $87,X
  STA $98,X
  STA $A6,X
  STA $B4,X
  STA $E6,X
  STA $F5,X
  STA $03,X
  STX $18,Y
  STX $51,Y
  STX $5F,Y
  STX $89,Y
  STX $97,Y
  STX $D2,Y
  STX $3B,Y
  .byte $97
  EOR #$97
  RTS
  .byte $97
  ROR $8497
  .byte $97
  TYA
  .byte $97, $AF, $97
  LDA $D197,X
  .byte $97, $E7, $97, $F7, $97, $07
  TYA
  .byte $17
  TYA
  .byte $27
  TYA
  AND $98,X
  .byte $63
  TYA
  ADC ($98),Y
  STA $98
  .byte $AB
  TYA
  CMP $98
  .byte $D4
  TYA
@EA8E:
  .byte $13
  STA $9922,Y
  AND ($99),Y
  JMP ($7B99)
  STA $9981,Y
  BCC @EA35
  STX $99,Y
  LDA $99
  .byte $AB
  STA $99B1,Y
  .byte $D4
  STA $99DA,Y
  CPX #$99
  INC $99
  CPX $F299
  STA $99F8,Y
  .byte $07
  TXS
  .byte $42
  TXS
  BVC $EA52
  .byte $8B
  TXS
  TXS
  TXS
  LDY #$9A
  .byte $AF
  TXS
  LDX $D59A,Y
  TXS
  CPX $9A
  .byte $F3
  TXS
  .byte $02, $9B
  ORA ($9B),Y
  JSR $2F9B
  .byte $9B
  AND $9B,X
  .byte $44, $9B, $53, $9B, $62, $9B
  ADC ($9B),Y
  .byte $80, $9B, $8F, $9B, $9E, $9B
  LDA $BC9B
  .byte $9B
  AXS #$9B
  ASL $9C
  SEC
  .byte $9C
  LSR $9C
  .byte $54, $9C, $62, $9C
  BVS @EA8E
  .byte $93, $9C
  LDA $D79C
  .byte $9C, $FB, $9C, $0F
  STA $9D34,X
  ADC $879D,Y
  STA $9DA4,X
  CLV
  STA $9DE9,X
  .byte $07, $9E
  AND ($9E,X)
  .byte $3B, $9E
  EOR $9E,X
  ARR #$9E
  NOP
  .byte $9E, $89, $9E, $97, $9E
  LDA $9E
  .byte $B3, $9E
  CMP ($9E,X)
  .byte $CF, $9E, $1F, $9F, $3C, $9F
  LSR $9F,X
  ADC $A89F
  .byte $9F
  CPY $9F
  CMP #$9F
  JMP $66A0
  LDY #$8F
  LDY #$A3
  LDY #$A8
  LDY #$BE
  LDY #$EA
  LDY #$F8
  LDY #$06
  LDA ($1D,X)
  LDA ($30,X)
  LDA ($3E,X)
  LDA ($79,X)
  LDA ($F5,X)
  ANC #$F4
  .byte $1F
  BRK
  BRK
  BRK
  INC $00,X
  INC $15,X
  INC $2A,X
  INC $3F,X
  INC $54,X
  INC $69,X
  BEQ $EB52
  ORA #$F4
  .byte $04
@EB60:
  ORA $00
  BRK
  SBC ($0B),Y
  TSX
  CLV
  .byte $F3
  BRK
  BEQ @EB60
  .byte $83, $F4, $12
  BRK
  BRK
  BRK
  SBC ($00),Y
  ORA ($00,X)
  .byte $C3
  ORA ($F0,X)
  SBC $83,X
  .byte $F4
  CLC
@EB7C:
  ORA $1B1A,Y
  SBC ($46),Y
  RTI
  INX
  .byte $BB
  BRK
  BEQ @EB7C
  .byte $83, $F4
  CLC
@EB8A:
  ORA $2B1A,Y
  SBC ($37),Y
  ORA $18
  AXS #$01
  BEQ @EB8A
  STA ($F4,X)
  BIT $25
  ROL $4F
  SBC ($02),Y
  .byte $07
  CPX $CF
  BRK
  SBC ($01),Y
  ASL $F8
  .byte $BB, $04
  ORA ($FB,X)
  ORA ($23,X)
  EOR $01
  .byte $FB
  BPL @EBD3
  EOR $F8
  .byte $A7, $8B
  SBC $81,X
  .byte $F4
  BIT $25
  ROL $4F
  SBC ($04),Y
  .byte $07
  BVC $EBC4
  .byte $02
  SBC ($03),Y
  ASL $10
  .byte $B3
  ORA $F8
  .byte $A7, $8B
  SBC $81,X
  .byte $F4
  BIT $25
  ROL $4F
  SBC ($06),Y
@EBD3:
  .byte $07
  CLI
  .byte $EF
  BRK
  SBC ($05),Y
  ASL $10
  .byte $B3
  ORA $F8
  .byte $A7, $8B
  SBC $81,X
  .byte $F4
  BIT $25
  ROL $4F
  SBC ($00),Y
  PHP
  SED
  .byte $BB
  BRK
  BEQ $EBE4
  STA ($F4,X)
  BIT $25
  ROL $4F
  SBC ($09),Y
  .byte $07, $32
  INC $F100,X
  NOP
  ASL $11
  .byte $B2
  `;
}

// $8C00-$8FFF (1024B): $8C00-$8FFF 代码/数据段4
function build_8C00_8FFF_seg4(): readonly number[] {
  return asm`
  ORA $F8
  .byte $A7, $8B
  SBC $09,X
  .byte $F4, $04
@EC08:
  ORA $00
  BRK
  SBC ($0D),Y
  CPY $98
  .byte $E3
  BRK
  BEQ @EC08
  STA ($F4,X)
  BIT $25
  ROL $4F
  SBC ($0A),Y
  ASL A
  .byte $F0, $BB  ; BEQ $8BD9
  BRK
  SBC ($01),Y
  ORA #$F8
  .byte $BB, $04
  SED
  .byte $A7, $8B
  SBC $81,X
  .byte $F4
  BIT $25
  ROL $4F
  SBC ($05),Y
  ORA #$10
  .byte $B3
  ORA $F1
  ASL $0A
  CLI
  .byte $EF
  BRK
  BEQ $EC32
  STA ($F4,X)
  BIT $25
  ROL $4F
  SBC ($00),Y
  NOP
  SED
  .byte $BB
  BRK
  BEQ $EC40
  ORA #$F4
  .byte $04
  ORA $00
  BRK
  .byte $F7, $03, $7B
  SBC ($00),Y
  BRK
@EC57:
  .byte $80, $FB
  BRK
  SBC ($3B),Y
  TSX
  BNE $EC22
  .byte $04
  BEQ @EC57
  ORA #$F4
  .byte $04
  ORA $00
  BRK
  .byte $F7, $03, $7B
  SBC ($3C),Y
  .byte $CF
@EC6E:
  CPX #$7B
  .byte $04
  SBC ($00),Y
  BRK
  .byte $80, $FB
  BRK
  BEQ @EC6E
  ORA #$F4
  .byte $04
@EC7C:
  ORA $00
  BRK
  SBC ($48),Y
  CPY $98
  LDY $00
  BEQ @EC7C
  ORA #$F4
  .byte $04
  ORA $00
  BRK
  SBC ($00),Y
  TSX
  BRK
  .byte $C3
  ORA ($F0,X)
  SBC $09,X
  .byte $F4, $04
@EC98:
  ORA $00
  BRK
  SBC ($5F),Y
  .byte $CF
  TYA
  .byte $AB
  BRK
  BEQ @EC98
  STA ($F4,X)
@ECA5:
  .byte $1C
  ORA $0000,X
  .byte $F7, $03, $7B
  SBC ($76),Y
  ORA $2380
  ASL $F1
  BRK
  BRK
  .byte $80, $FB
  BRK
  BEQ $ECAF
  STA ($F4,X)
  .byte $1C
  ORA $0000,X
  .byte $F7, $03, $7B
  SBC ($76),Y
  .byte $0F
@ECC6:
  .byte $80, $23
  ASL $F1
  BRK
  BRK
  .byte $80, $FB
  BRK
  BEQ @ECC6
  STA ($F4,X)
  PLP
@ECD4:
  AND #$2A
  ANC #$F1
  ASL $E83C
  .byte $BB
  BRK
  BEQ @ECD4
  .byte $83, $F4
  CLC
@ECE2:
  ORA $1B1A,Y
  SBC ($99),Y
  RTI
  BNE @ECA5
  BRK
  BEQ @ECE2
  .byte $83, $F4
  CLC
  ORA $1B1A,Y
  SBC ($11),Y
  ORA $64,X
  .byte $EF
  BRK
  SBC ($9A),Y
  .byte $14
  DEC $04B7
@ECFF:
  ASL $00F6,X
  SBC ($10),Y
  RTI
  INX
  .byte $BB, $04
  BEQ @ECFF
  .byte $83, $F4
  CLC
  ORA $1B1A,Y
  SBC ($12),Y
  ORA $40,X
  AXS #$00
  SBC ($9B),Y
  .byte $14, $DC
  DEC $04
  SED
  .byte $A7, $8B
  SBC $80,X
  .byte $F4, $0C
  ORA $0F0E
  .byte $F7, $03, $7B
  SBC ($00),Y
  BRK
  .byte $80, $FB
  BRK
  SBC ($9D),Y
  ASL $9F7C,X
  .byte $04
  SBC ($24),Y
  ORA $C3F0,X
  PHP
  ASL $15F6,X
  SBC ($00),Y
  .byte $47
  SBC #$C1
  PHP
  .byte $02
  SBC ($E7),Y
  ASL $B3FC,X
  .byte $04
  SBC ($26),Y
  JSR $C1EB ; → bank switch?
  PHP
  BEQ $ED48
  ORA #$F4
  .byte $04
@ED56:
  ORA $00
  BRK
  SBC ($60),Y
  .byte $CF
  TYA
  .byte $E3
  BRK
  BEQ @ED56
  .byte $83, $F4
  CLC
  ORA $1B1A,Y
  SBC ($49),Y
  ORA $40,X
  AXS #$00
  SBC ($A5),Y
  .byte $14, $DC
  DEC $04
  SBC $010F,Y
  .byte $FB
  BPL $ED9C
  EOR $01
  .byte $FB
  ORA ($23,X)
  EOR $FA
  INC $00,X
  SBC ($4A),Y
  RTI
  PHP
  .byte $BB
  ORA $F0
  SBC $81,X
  .byte $F4, $13
@ED8D:
  BRK
  BRK
  BRK
  SBC ($90),Y
  ROL A
  BRK
  AXS #$01
  BEQ @ED8D
  ORA #$F4
  .byte $04
@ED9B:
  ORA $00
  BRK
  SBC ($61),Y
  CPY $00
  SBC #$01
  BEQ @ED9B
  ORA #$F4
  .byte $04
@EDA9:
  ORA $00
  BRK
  SBC ($73),Y
  .byte $72, $9F, $BB
  BRK
  BEQ @EDA9
  ORA #$F4
  .byte $04
  ORA $00
  BRK
  SBC ($00),Y
  ADC ($00),Y
  .byte $BB
  ORA ($F0,X)
  SBC $81,X
  .byte $F4, $13
@EDC5:
  BRK
  BRK
  BRK
  SBC ($38),Y
  ROL A
  BRK
  AXS #$01
  BEQ @EDC5
  STA ($F4,X)
  PLP
  AND #$2A
  ANC #$F1
  JMP $7012
  AXS #$00
  SBC ($4B),Y
  BPL $EE03
  CPY #$05
  SBC $010C,Y
  .byte $FB
  BPL @EE0B
  EOR $01
  .byte $FB
  ORA ($23,X)
  EOR $FA
  INC $00,X
  SBC ($00),Y
  .byte $37
  JSR $05BB
  .byte $02
  SBC ($DE),Y
  .byte $12
@EDFB:
  ASL $CB,X
  ORA ($F1,X)
  ALR #$10
  JSR $05BB
  BEQ @EDFB
  STA ($F4,X)
  PLP
  AND #$2A
@EE0B:
  ANC #$F1
  LSR $7012
  AXS #$00
  SBC ($4D),Y
  BPL @EE3E
  .byte $C3
  ORA $F8
  .byte $A7, $8B
  SBC $83,X
  .byte $F4
  CLC
  ORA $2B1A,Y
  .byte $F7, $03, $7B
  SBC ($00),Y
  BRK
@EE28:
  .byte $80, $FB
  BRK
  SBC ($E8),Y
  ORA $F8
  .byte $C3, $04
  BEQ @EE28
  .byte $83, $F4
  CLC
  ORA $1B1A,Y
  .byte $F7, $03, $7B
  SBC ($00),Y
@EE3E:
  BRK
  .byte $80, $FB
  BRK
  SBC ($14),Y
  ORA $56,X
  .byte $7C, $04
  SBC ($4A),Y
  .byte $80
  INX
  .byte $BB
  PHP
  ORA ($FB,X)
  ORA ($23,X)
  EOR $01
  .byte $FB, $02, $13
  EOR $F8
  LSR $F58E
  .byte $83, $F4
  CLC
  ORA $1B1A,Y
  .byte $F7, $03, $7B
  SBC ($00),Y
  BRK
  .byte $80, $FB
  BRK
  SBC ($14),Y
  ORA $39,X
  ROR $F104,X
  .byte $13, $17, $04, $BB
  ORA #$F8
  LSR $F58E
  .byte $83, $F4
  ROL A
  ANC #$00
  BRK
  SBC ($16),Y
  .byte $04
@EE84:
  BCC $EE21
  BRK
  SBC ($15),Y
  .byte $03
  INC $D5,X
  .byte $04
  BEQ @EE84
  .byte $83, $F4
  CLC
  ORA $1B1A,Y
  SBC ($17),Y
  ORA $39,X
  ROR $F100,X
  .byte $52, $17, $02
  LDA $F905,X
  .byte $0F
  ORA ($FB,X)
  BPL @EECA
  EOR $01
  .byte $FB
  ORA ($23,X)
  EOR $FA
  INC $00,X
  SBC ($00),Y
  DEC $C3F4
  .byte $04, $04
  SBC ($1B),Y
  ORA $E6,X
  CMP $F100,X
  .byte $53, $17, $F4, $C3, $04
  SED
  .byte $A7, $8B
  SBC $09,X
  .byte $F4, $04
@EECA:
  ORA $00
  BRK
  .byte $F7, $03, $73
@EED0:
  SBC ($75),Y
  ADC ($00),Y
  .byte $C3
  ORA ($0A,X)
  SBC ($D9),Y
  ADC ($00),Y
  .byte $C3
  ORA $0A
  SBC ($00),Y
  ADC ($00),Y
  .byte $C3
  ORA #$F0
  SBC $09,X
  .byte $F4, $04
@EEE9:
  ORA $00
  BRK
  SBC ($87),Y
  ADC ($00),Y
  SBC #$01
  BEQ @EEE9
  .byte $83, $F4
  CLC
  ORA $1B1A,Y
  SBC ($17),Y
  ORA $56,X
  .byte $7C
  BRK
  SBC ($08),Y
  .byte $80
  INC $BC
  .byte $04
  SBC $010F,Y
  .byte $FB
  BPL @EF2F
  EOR $01
  .byte $FB
  ORA ($23,X)
  EOR $FA
  INC $00,X
  SBC ($00),Y
  .byte $7F
  SED
  .byte $C3, $04, $04
  SBC ($1B),Y
  ORA $06,X
  CMP $F101,X
@EF23:
  .byte $1C, $80
  SED
  .byte $C3, $04
  BEQ $EF1F
  .byte $83, $F4
  ROL A
  ANC #$00
@EF2F:
  BRK
  SBC ($19),Y
  .byte $04
  BCC @EED0
  BRK
  SBC ($18),Y
  .byte $03
  NOP
  BNE $EF40
  ASL $00F6,X
  SBC ($00),Y
  ROL $CB00,X
  ORA $04
  SBC ($1D),Y
  .byte $04
@EF49:
  .byte $1C, $AB
  ORA ($F1,X)
  CLC
  .byte $03
  BRK
  AXS #$05
  BEQ @EF49
  .byte $83, $F4
  CLC
  ORA $1B1A,Y
  SBC ($17),Y
  ORA $56,X
  .byte $7C
  BRK
  SBC ($08),Y
  .byte $80
  INC $BC
  .byte $04
  SBC $010F,Y
  .byte $FB
  BPL @EF8F
  EOR $01
  .byte $FB
  ORA ($23,X)
  EOR $FA
  INC $00,X
  SBC ($00),Y
  .byte $7F
  SED
  .byte $C3, $04
  BEQ $EF72
  .byte $83, $F4
  ROL A
  ANC #$00
  BRK
  SBC ($19),Y
  .byte $04
  BCC @EF23
  BRK
  SBC ($18),Y
  .byte $03
  NOP
  BNE $EF93
@EF8F:
  ASL $00F6,X
  SBC ($00),Y
  ROL $CB00,X
  ORA $F0
  SBC $81,X
  .byte $F4
  BIT $25
  ROL $4F
  SBC ($9C),Y
  SEC
  PHP
  .byte $BB
  ORA ($F0,X)
  SBC $09,X
  .byte $F4, $04
  ORA $00
  BRK
  .byte $F7, $03, $7B
  SBC ($00),Y
  BRK
@EFB4:
  .byte $80, $FB
  BRK
  SBC ($88),Y
  ADC ($D0),Y
  .byte $C3, $04
  BEQ @EFB4
  STA ($F4,X)
  BIT $25
  ROL $4F
  SBC ($1F),Y
  NOP
  PHP
  .byte $BB
  ORA ($F0,X)
  SBC $81,X
  .byte $F4
  BIT $25
  ROL $4F
  SBC ($04),Y
  ASL A
  BVC @EFDB
  .byte $02
  SBC ($03),Y
@EFDB:
  ORA #$10
  .byte $B3
  ORA $F8
  .byte $A7, $8B
  SBC $09,X
  .byte $F4, $04
  ORA $00
  BRK
  .byte $F7, $03, $7B
  SBC ($89),Y
  .byte $23
@EFEF:
  CPY #$7B
  .byte $04
  SBC ($00),Y
  BRK
  .byte $80, $FB
  BRK
  BEQ @EFEF
  STA ($F4,X)
  PHP
  ORA #$0A
  .byte $0B
  `;
}

// $9000-$93FF (1024B): $9000-$93FF 代码/数据段5
function build_9000_93FF_seg5(): readonly number[] {
  return asm`
  SBC ($21),Y
  EOR #$80
  .byte $8F
  BRK
  SBC ($20),Y
  EOR $BB98,Y
  .byte $04
  SBC ($20),Y
  NOP
  TYA
  .byte $BB
  PHP
  SBC ($20),Y
  .byte $5B
  TYA
  .byte $BB, $0C
  ROL A
  .byte $F4
  ASL $17,X
  AND $F653
  BRK
  INC $2A,X
  INC $3F,X
  SBC ($00),Y
  EOR $28
  .byte $C3
  ORA $04
  SBC ($23),Y
  NOP
  CLI
  SBC #$01
  SBC ($22),Y
  CLC
  PLP
  .byte $C3
  ORA $F8
  .byte $A7, $8B
  SBC $81,X
  .byte $F4, $0C
  ORA $0F0E
  .byte $F7, $03, $7B
  SBC ($00),Y
  BRK
  .byte $80, $FB
  BRK
  SBC ($9D),Y
  ASL $9790,X
  .byte $04
  SBC ($24),Y
  ORA $C320,X
  ORA #$1E
  INC $00,X
  INC $15,X
  SBC ($25),Y
  PHA
  BPL $E01B
  ORA #$02
  SBC ($27),Y
  ASL $ABF4,X
  .byte $04
  SBC ($26),Y
  AND ($08,X)
  .byte $BB
  ORA #$F0
  SBC $81,X
  .byte $F4
  BIT $25
  ROL $4F
  SBC ($0C),Y
  ASL A
  PHA
  .byte $FC
  BRK
  SBC ($DA),Y
  ORA #$10
  .byte $B3
  ORA $F9
  .byte $0F
  ORA ($FB,X)
@E086:
  BPL @E0AB
  EOR $01
  .byte $FB
  ORA ($23,X)
  EOR $FA
  INC $00,X
  SBC ($00),Y
  .byte $3B
  NOP
  .byte $BB, $04, $04
  SBC ($A6),Y
  ASL A
@E09B:
  .byte $F2, $BB
  BRK
  SBC ($26),Y
  ORA #$FA
  .byte $BB, $04
  BEQ @E09B
  ORA #$F4
  .byte $04
@E0A9:
  ORA $00
@E0AB:
  BRK
  SBC ($8A),Y
  TSX
  BRK
  SBC #$01
  BEQ @E0A9
  STA ($F4,X)
  PHP
  ORA #$0A
  ANC #$F1
  .byte $54
  ALR #$B0
  .byte $BB
  ORA ($F1,X)
  .byte $54
  EOR $BBB0
  ORA $F1
  .byte $54, $4F
  BCS @E086
  ORA #$F0
@E0CD:
  SBC $80,X
  SED
  .byte $FB, $8F
  SBC $80,X
  SED
  .byte $3C
  BCC @E0CD
  .byte $83, $F4
  CLC
  ORA $1B1A,Y
  .byte $F7, $23, $5B
  SBC ($00),Y
  BRK
  .byte $80, $A3
  BRK
  SBC ($00),Y
  BRK
  .byte $80, $DB, $04
  SBC ($00),Y
  BVS @E0F1
@E0F1:
  .byte $BB
  ORA #$F1
  SBC $1B
  BRK
  .byte $BB
  ORA $E6F1
  .byte $1F
  BRK
  .byte $BB
  ORA ($96),Y
  .byte $F7, $03
@E102:
  .byte $7B
  INC $00,X
  INC $15,X
  INC $3F,X
  INC $54,X
  BEQ @E102
  .byte $80, $F4, $0C
  ORA $0F0E
  .byte $F7, $03, $7B
  SBC ($9E),Y
  ASL $9368,X
  ORA $F1
  PLP
  .byte $1C
  INY
  .byte $BB
  PHP
  ASL $15F6,X
  SBC ($29),Y
  .byte $47
  CPX #$BB
  PHP
  .byte $02
  SBC ($2A),Y
  JSR $BBE8 ; → bank switch?
  PHP
  SBC ($00),Y
  BRK
  .byte $80, $FB
  BRK
  SBC ($9F),Y
  ASL $ABFC,X
  .byte $04
  SED
  LSR $F58E
  ORA #$F4
  .byte $04
  ORA $00
  BRK
@E148:
  .byte $F7, $23, $5B
  SBC ($8D),Y
  .byte $CF
  TYA
  .byte $C3
  BRK
  BEQ @E148
  ORA #$F4
  .byte $04
  ORA $00
  BRK
  SBC ($00),Y
  CPX $C300
  ORA ($F0,X)
  SBC $80,X
  .byte $F4, $1C
  ORA $0000,X
  .byte $F7, $03, $7B
  SBC ($95),Y
  .byte $0C
@E16D:
  .byte $7F, $23, $07
  SBC ($00),Y
  BRK
  .byte $80, $FB
  BRK
  BEQ @E16D
  .byte $80, $F4, $1C
  ORA $0000,X
  .byte $F7, $03, $7B
  SBC ($95),Y
  ASL $237F
  .byte $07
  SBC ($00),Y
  BRK
  .byte $80, $FB
  BRK
  BEQ $E184
  ORA #$F4
  .byte $04
  ORA $00
  BRK
  .byte $F7, $03, $7B
  SBC ($8F),Y
  LDY $A3A0,X
  .byte $04
  SBC ($00),Y
  BRK
  SEI
  .byte $FB
  BRK
  BEQ $E19B
  ORA #$F4
  .byte $04
  ORA $00
  BRK
  .byte $F7, $03, $7B
  SBC ($91),Y
  LDY $EBC0,X
  .byte $04
  SBC ($00),Y
  BRK
  .byte $80, $FB
  BRK
  BEQ $E1B2
  ORA #$F4
  ASL $00
  BRK
  BRK
  SBC ($77),Y
  LDY $40,X
  SBC #$01
  BEQ $E1C0
  ORA #$F4
  .byte $04
@E1CE:
  ORA $00
  BRK
  SBC ($00),Y
  .byte $34
  PHP
  AXS #$01
  BEQ @E1CE
  ORA #$F4
  .byte $3B
@E1DC:
  .byte $47
  BRK
  BRK
  SBC ($00),Y
  AND $00,X
  AXS #$01
  BEQ @E1DC
  ORA #$F4
  .byte $3B
@E1EA:
  .byte $47
  BRK
  BRK
  SBC ($00),Y
  ROL $00,X
  AXS #$01
  BEQ @E1EA
  ANC #$F4
  .byte $43
@E1F8:
  EOR $47
  .byte $44
  SBC ($00),Y
  BIT $F0
  .byte $BB
  BRK
  BEQ @E1F8
  ANC #$F4
  .byte $43
@E206:
  EOR $47
  .byte $44
  SBC ($00),Y
  AND $F0
  .byte $BB
  BRK
  BEQ @E206
  ANC #$F4
  .byte $43
@E214:
  EOR $47
  .byte $44
  SBC ($00),Y
  ROL $F0
  .byte $BB
  BRK
  BEQ @E214
  STA ($F4,X)
  .byte $04
  ORA $0F
  BRK
  SBC ($32),Y
  CPY #$88
  .byte $E3
  BRK
  SBC ($07),Y
  ANC #$50
  .byte $DB
  ORA $F0
  SBC $81,X
  .byte $F4, $0C
@E236:
  ORA $0F0E
  SBC ($29),Y
  .byte $3F
  SED
  .byte $B3, $04
  BEQ @E236
  .byte $80
  SED
  PHA
  .byte $9C
  SBC $09,X
  .byte $F4, $04
@E249:
  ORA $00
  BRK
  SBC ($7E),Y
  TSX
  CPX #$BB
  BRK
  BEQ @E249
  .byte $83, $F4, $1B
  BRK
  BRK
  BRK
  SBC ($00),Y
  BIT $BB00
  ORA ($F0,X)
  SBC $0A,X
  .byte $F4
  BIT $050B
  .byte $07
  SBC ($00),Y
  .byte $27
  BPL $E238
  ORA ($F0,X)
  SBC $09,X
  .byte $F4, $04
  ORA $00
  BRK
  SBC ($35),Y
  PLP
  BRK
  .byte $B7
  ORA ($F0,X)
  SBC $81,X
  .byte $F4
  PLP
@E281:
  AND #$2A
  ANC #$F1
  BRK
  ORA ($E8),Y
  .byte $BB
  BRK
  BEQ @E281
  ORA #$F4
@E28E:
  .byte $04
  ORA $00
  BRK
  SBC ($00),Y
  BRK
@E295:
  .byte $80, $FB
  BRK
  SBC ($E8),Y
  TSX
  .byte $FC, $C3, $04
  BEQ @E295
  ORA #$F4
  .byte $04
@E2A3:
  ORA $00
  BRK
  SBC ($7A),Y
  LDA $E3E0,X
  BRK
  BEQ @E2A3
  ORA #$F4
  .byte $04
@E2B1:
  ORA $00
  BRK
  SBC ($7B),Y
  LDY $EBA8,X
  BRK
  BEQ @E2B1
  ORA #$F4
@E2BE:
  .byte $04
  ORA $00
  BRK
  SBC ($7F),Y
@E2C4:
  CPY #$60
  .byte $A3
  ORA ($F0,X)
  SBC $09,X
  .byte $F4, $04
@E2CD:
  ORA $00
  BRK
  SBC ($80),Y
@E2D2:
  CPY #$E0
  .byte $A3
  BRK
  BEQ @E2CD
  ORA #$F4
  .byte $04
@E2DB:
  ORA $00
  BRK
  SBC ($7C),Y
  TSX
  BCC @E28E
  BRK
  BEQ @E2DB
  .byte $83, $F4
  ROL A
  ANC #$00
  BRK
  SBC ($36),Y
  .byte $02
  BPL @E2C4
  ORA ($F0,X)
  SBC $81,X
  .byte $F4
  PHP
  ORA #$0A
  ANC #$F1
  TYA
  ALR #$90
  .byte $B3
  ORA ($F1,X)
  TYA
  EOR $B390
  ORA $F1
  TYA
  .byte $4F
  BCC @E2BE
  ORA #$F0
  SBC $83,X
  .byte $F4
  CLC
  ORA $1B1A,Y
  SBC ($E3),Y
  ORA $64,X
  .byte $EF
  BRK
  SBC ($9A),Y
  .byte $14
  BNE @E2D2
  .byte $04
  SED
  .byte $A7, $8B
  SBC $81,X
  .byte $F4
  PHP
  ORA #$0A
  ANC #$F1
  .byte $8B
  ALR #$80
  .byte $BB
  ORA ($F1,X)
  .byte $8B
  EOR $BB80
  ORA $F1
  .byte $8B, $4F, $80, $BB
  ORA #$F0
  SBC $81,X
  .byte $F4
  PHP
  ORA #$0A
  ANC #$F1
  STY $804B
  .byte $BB
  ORA ($F1,X)
  STY $804D
  .byte $BB
  ORA $F1
  STY $804F
  .byte $BB
  ORA #$F0
  SBC $80,X
  .byte $F4
  PHP
  ORA #$0A
  ANC #$F1
  BRK
  CMP $C300
  ORA $00F1
  DEX
  BRK
  .byte $C3
  ORA ($F1,X)
  BRK
  AXS #$00
  .byte $C3
  ORA $F0
  SBC $09,X
  .byte $F4, $04
@E375:
  ORA $00
  BRK
  SBC ($93),Y
  CPY $A0
  .byte $A3
  BRK
  BEQ @E375
  ORA #$F4
  .byte $04
@E383:
  ORA $00
  BRK
  SBC ($94),Y
  TSX
  .byte $80, $E3
  BRK
  BEQ @E383
  ORA #$F4
  .byte $04
  ORA $00
  BRK
  .byte $F7, $03, $7B
  SBC ($00),Y
  BRK
  .byte $80, $FB
  BRK
  SBC ($E9),Y
  .byte $CF
  BRK
  .byte $83
  ORA $F0
  SBC $80,X
  .byte $F4
  PHP
  ORA #$0A
  ANC #$F1
  NOP
  LSR $E0,X
  .byte $BB
  PHP
  SBC ($3A),Y
  JMP $BBE0
  BRK
  SBC ($3A),Y
  LSR $BBE0
  .byte $04, $14
  SBC ($3F),Y
  EOR #$28
  SBC #$01
  SBC ($3E),Y
  .byte $5C
  BRK
  .byte $C3
  ORA $F1
  ROL $005D,X
  .byte $C3
  ORA #$F1
  ROL $005E,X
  .byte $C3
  ORA $F614
  .byte $3F
  SBC ($3D),Y
  LSR $AB,X
  .byte $C3
  PHP
  SBC ($3D),Y
  JMP $C3AB
  BRK
  SBC ($3D),Y
  LSR $C3AB
  .byte $04
  BEQ $E3E2
  .byte $80, $F4
  .byte $10, $11  ; BPL $9402
  .byte $12
  BRK
  SBC ($DB),Y
  AND $B318
  ORA ($F1,X)
  EOR $202E,Y
  .byte $AB
  ORA $64
  `;
}

// $9400-$97FF (1024B): $9400-$97FF 代码/数据段6
function build_9400_97FF_seg6(): readonly number[] {
  return asm`
  INC $15,X
  .byte $F0, $F5  ; BEQ $93F9
  STA $F4
  EOR ($04,X)
  BRK
  BRK
  SBC ($00),Y
  .byte $2F
  BRK
  .byte $D3
  ORA ($F0,X)
  SBC $80,X
  .byte $F4, $04
  ORA $23
  BRK
  SBC ($A8),Y
  .byte $CF
  .byte $10, $D3  ; BPL $93F0
  ORA ($F1,X)
  NOP
  .byte $E7
  .byte $10, $CB  ; BPL $93EE
  ORA $F0
  SBC $80,X
  .byte $F4, $13
@E429:
  BRK
  BRK
  BRK
  SBC ($40),Y
  AND #$D8
  AXS #$00
  BEQ @E429
  ORA #$F4
  ASL $00
  BRK
@E439:
  BRK
  SBC ($5C),Y
  LDA $00,X
  .byte $93
  ORA ($F0,X)
  SBC $80,X
  .byte $F4, $04
  ORA $22
  BRK
  SBC ($5D),Y
  AND ($B0),Y
@E44C:
  .byte $D3, $04
  ASL $F1
  LDA #$C4
  CLV
  .byte $DB
  BRK
  BEQ @E44C
  ORA #$F4
  .byte $04
  ORA $00
  BRK
  SBC ($00),Y
  BRK
  .byte $80, $FB
  BRK
  SBC ($EA),Y
  .byte $23
  BVS $E433
  ORA $F0
  SBC $80,X
  .byte $F4, $04
  ORA $20
  AND ($F1,X)
  TAX
  DEC $90
  AXS #$00
  SBC ($5E),Y
  .byte $32, $80, $9B
  ORA $F0
  SBC $80,X
  .byte $F4
  ASL $17,X
  AND $F153
  BRK
  LSR $08
  .byte $BB
  ORA ($F0,X)
  SBC $80,X
  .byte $F4, $04
  ORA $20
  AND ($F1,X)
  .byte $AB, $CF
  INX
  .byte $DB
  BRK
  SBC ($2D),Y
  .byte $33
  SED
  AXS #$04
  SED
  .byte $A7, $8B
  SBC $80,X
  .byte $F4
  PHP
  ORA #$0A
  ANC #$F1
  .byte $42
  JMP $BB80
  BRK
  SBC ($42),Y
  LSR $BB80
  .byte $04
  SBC ($42),Y
  BVC @E439
  .byte $BB
  PHP
  BEQ $E4B2
  .byte $80, $F4
  BIT $25
  ROL $4F
  SBC ($1A),Y
  .byte $07
  JMP $0076
  SBC ($A0),Y
  ASL $10
  .byte $B3
  ORA $F9
  .byte $0F
  ORA ($FB,X)
  BPL $E4F8
  EOR $01
  .byte $FB
  ORA ($23,X)
  EOR $FA
  INC $00,X
  SBC ($00),Y
  AND $BBF9,Y
  .byte $04, $04
  SBC ($A1),Y
  .byte $07
  CPX $CF
  BRK
  SBC ($26),Y
  ASL $F9
  .byte $BB, $04
  SED
  .byte $A7, $8B
  SBC $80,X
  .byte $F4
  BIT $25
  ROL $4F
  SBC ($A2),Y
  ASL A
  .byte $5F, $7B
  BRK
  SBC ($A0),Y
  ORA #$10
  .byte $B3
  ORA $F9
  .byte $0F
  ORA ($FB,X)
  BPL @E530
  EOR $01
  .byte $FB
  ORA ($23,X)
  EOR $FA
  INC $00,X
  SBC ($00),Y
  .byte $3B
  SBC $04BB,Y
  .byte $04
  SBC ($A3),Y
  ASL A
  BEQ $E4DD
  BRK
  SBC ($26),Y
  ORA #$F9
  .byte $BB, $04
  SED
  .byte $A7, $8B
  SBC $80,X
  .byte $F4, $0C
@E530:
  ORA $0F0E
  SBC ($33),Y
  ASL $9760,X
  .byte $04
  SBC ($24),Y
  ORA $B720,X
  ORA #$1E
  INC $2A,X
  SBC ($34),Y
  AND ($10,X)
  .byte $B7
  ORA ($F0,X)
  SBC $80,X
  .byte $F4
  PHP
  ORA #$0A
  ANC #$F1
  .byte $33
  EOR #$60
  .byte $E3, $04
  SBC ($67),Y
  STY $F0,X
  .byte $BB
  BRK
  SBC ($67),Y
  STA $F0,X
  .byte $BB
  PHP
  SBC ($67),Y
  STX $F0,Y
  .byte $BB, $0C
  ASL $0AF4,X
  ANC #$00
  ANC #$F6
  ROL A
  INC $3F,X
  SBC ($68),Y
  STA $20
  .byte $C3
  ORA ($F0,X)
  SBC $09,X
  .byte $F4, $04
@E57D:
  ORA $00
  BRK
  SBC ($81),Y
  CPY #$C0
  SBC #$00
  BEQ @E57D
  .byte $80, $F4, $13
  BRK
  BRK
  BRK
@E58E:
  SBC ($40),Y
  ROR $CBD8,X
  BRK
  BEQ @E58E
  .byte $A7, $8B
  SBC $09,X
  .byte $F4, $04
@E59C:
  ORA $00
  BRK
  SBC ($96),Y
  CPY #$D0
  .byte $9B
  BRK
  BEQ @E59C
  ORA #$F4
  .byte $04
  ORA $00
  BRK
  SBC ($97),Y
  CPY #$00
  .byte $E3
  ORA ($F0,X)
  SBC $09,X
  .byte $F4, $04
  ORA $00
  BRK
  .byte $F7
  ANC #$53
  SBC ($00),Y
  BRK
  .byte $80, $A3
  BRK
  SBC ($00),Y
  BRK
  .byte $80, $DB, $04
  SBC ($B1),Y
  CPY $90
  .byte $93
  PHP
  .byte $03
  SBC ($B1),Y
  CPY $90
  .byte $93, $0C, $03
  SBC ($B1),Y
  CPY $90
@E5DC:
  .byte $93
  BPL $E5E2
  SBC ($B1),Y
  CPY $90
  .byte $93, $14
  BEQ @E5DC
  STY $16
  .byte $F4
  AND $0000
  BRK
  SBC ($CB),Y
  .byte $B3, $53, $C3
  BRK
  BEQ $E5EB
  .byte $80, $F4
  PLP
@E5F9:
  AND #$2A
  ANC #$F1
  AND $E811,Y
  .byte $BB
  BRK
  BEQ @E5F9
  .byte $82, $F4, $04
  ORA $22
  BRK
  SBC ($5D),Y
  .byte $83
  CLV
@E60E:
  .byte $D3, $04
  ASL $F1
  LDA #$C4
  CLV
  .byte $DB
  BRK
  BEQ @E60E
  .byte $80, $F4
  PHP
  ORA #$0A
  ANC #$F1
  .byte $62
  LSR $BB20,X
  ORA $62F1
  EOR $BB20,X
  ORA #$F1
  .byte $62, $5C
  JSR $05BB
  SBC ($63),Y
  EOR #$A0
  .byte $9F
  BRK
  .byte $14, $F4
  ASL A
  ANC #$00
  BRK
  INC $00,X
  INC $2A,X
  INC $3F,X
  SBC ($00),Y
  STA $08
  .byte $BB
  ORA $02
  SBC ($8E),Y
  STY $0C
  .byte $BB
  ORA $F0
  SBC $09,X
  .byte $F4
  RTS
@E655:
  ADC ($62,X)
  .byte $63
  SBC ($00),Y
  ADC $BBF0,Y
  BRK
  BEQ @E655
  .byte $80, $F4, $0C
  ORA $0F0E
  SBC ($65),Y
  ASL $93D0,X
  BRK
  SBC ($64),Y
  ORA $B71F,X
  ORA $14
  INC $00,X
  SBC ($00),Y
  .byte $3F
  ASL $B3,X
  ORA $04
  SBC ($66),Y
  ORA $B316,X
  ORA $F1
  .byte $A7, $22
  ASL $01AF
  BEQ $E67F
  ORA #$F4
  .byte $04
@E68D:
  ORA $00
  BRK
  SBC ($83),Y
  TSX
  CLV
  .byte $BB
  BRK
  BEQ @E68D
  .byte $87, $F4
  PHP
  ORA #$0A
  ANC #$F1
  LDY $9C49
  .byte $63
  BRK
  SBC ($67),Y
  STY $F0,X
  .byte $B3, $04
  SBC ($67),Y
  STA $F0,X
  .byte $B3
  PHP
  SBC ($67),Y
  STX $F0,Y
  .byte $B3, $0C
  ASL $F4,X
  ASL A
  ANC #$00
  BRK
  INC $00,X
  INC $2A,X
  INC $3F,X
  SBC ($00),Y
  STY $20
  .byte $BB
  ORA $04
  SBC ($68),Y
  STA $20
  .byte $BB
  ORA $F8
  .byte $0C
  STA $83F5,Y
  .byte $F4
  CLC
  ORA $2B1A,Y
  .byte $F7, $03, $7B
  SBC ($30),Y
  BRK
  .byte $80, $9B, $04
  SBC ($43),Y
  BRK
  .byte $80
  CPX $08
  SBC ($2C),Y
  SBC $C370
  ORA ($C0),Y
  .byte $F7, $1C
@E6F1:
  .byte $63
  SBC ($00),Y
  BRK
  .byte $80, $E3, $0C
  BPL @E6F1
  BIT $5B
  SBC ($00),Y
  BRK
  .byte $80
  LDY $00
  SBC ($00),Y
  BRK
  .byte $80, $DB, $0C
  BPL $E701
  ANC #$53
  SBC ($00),Y
  BRK
  .byte $80, $AB
@E711:
  BRK
  SBC ($00),Y
  BRK
  .byte $80, $D3, $0C
  BPL @E711
  .byte $33
  ALR #$F1
  BRK
  BRK
  .byte $80, $B3
  BRK
  SBC ($00),Y
  BRK
  .byte $80
  AXS #$0C
  RTS
  .byte $F7, $03, $7B
  INC $00,X
  INC $15,X
  INC $2A,X
  INC $3F,X
  SBC ($2E),Y
  .byte $17
  BRK
  .byte $C3
  ORA ($F0),Y
  SBC $09,X
  .byte $F4
  ASL $00
  BRK
  BRK
  SBC ($84),Y
  LDX $E0,Y
  .byte $63
  BRK
  BEQ $E73F
  .byte $82, $F4, $04
  ORA $22
  BRK
  SBC ($00),Y
  TXA
  JSR $05CB
  ASL $F1
  ADC #$BA
  CLC
  .byte $D3
  ORA ($F8,X)
  .byte $A7, $8B
  SBC $09,X
  .byte $F4
@E763:
  ASL $00
  BRK
  BRK
@E767:
  SBC ($85),Y
  .byte $B7
  RTS
  .byte $93
  BRK
  BEQ $E764
  .byte $80, $F4, $04
  ORA $23
  BRK
  SBC ($AE),Y
  TSX
  BNE $E72F
  BRK
  SBC ($6A),Y
  .byte $8B
  CPY #$C5
  .byte $04
  SED
  .byte $A7, $8B
  SBC $80,X
  .byte $F4, $04
  ORA $23
  BRK
  SBC ($AF),Y
  TSX
@E78E:
  BNE @E767
  BRK
  SBC ($00),Y
  BMI $E75D
  .byte $CF, $04
  BEQ @E78E
  .byte $80, $F4, $04
  ORA $22
  BRK
  SBC ($00),Y
  AND ($E4),Y
  AXS #$04
  ASL $F1
  BCS @E763
  INX
  .byte $DB
  BRK
  SED
  .byte $A7, $8B
  SBC $09,X
  .byte $F4, $04
@E7B3:
  ORA $00
  BRK
  SBC ($86),Y
  CPY $A8
  .byte $AB
  BRK
  BEQ @E7B3
  .byte $83, $F4, $04
  ORA $1E
  .byte $1F
  SBC ($00),Y
  STX $EB00
  ORA ($F1,X)
  BRK
  STY $D300
  ORA $F0
  SBC $83,X
  .byte $F4, $04
  ORA $1E
  .byte $1F
  SBC ($6C),Y
  CLV
  BRK
  SBC #$01
  SBC ($6B),Y
  STA $C710
  ORA $F8
  .byte $A7, $8B
  SBC $83,X
  .byte $F4, $04
  ORA $1E
  .byte $1F
  SBC ($6D),Y
  CLV
  BRK
  SBC #$01
  SED
  DEC $F597,X
  .byte $83, $F4, $04
  ORA $1E
  .byte $1F
  SBC ($6E),Y
  `;
}

// $9800-$9BFF (1024B): $9800-$9BFF 代码/数据段7
function build_9800_9BFF_seg7(): readonly number[] {
  return asm`
  CLV
  BRK
  SBC #$01
  SED
  DEC $F597,X
  .byte $83, $F4, $04
  ORA $1E
  .byte $1F
  SBC ($6C),Y
  CLV
  BRK
  SBC #$01
@E814:
  SED
  DEX
  .byte $97
  SBC $83,X
  .byte $F4, $04
  ORA $1E
  .byte $1F
  SBC ($6E),Y
  CLV
  BRK
  SBC #$01
  SED
  DEX
  .byte $97
@E827:
  SBC $80,X
  .byte $F4
  JSR $0021
@E82D:
  BRK
  SBC ($00),Y
  .byte $8F
  .byte $10, $BB  ; BPL $97EE
  ORA ($F0,X)
  SBC $85,X
  .byte $F4
  ASL $07
  BRK
  BRK
  SBC ($00),Y
  .byte $64
  BPL @E814
  ORA ($10,X)
  SBC ($00),Y
  ADC $30
  AXS #$05
  .byte $04
  SBC ($00),Y
  .byte $67
  BRK
  .byte $D3
  ORA $F1
  BRK
  ROR $00
  .byte $D3
  ORA ($06,X)
  INC $15,X
@E859:
  SBC ($00),Y
  PLA
  CPY #$C3
  BRK
  .byte $02
  INC $00,X
  BEQ @E859
  .byte $80, $F4
  JSR $0021
  BRK
  SBC ($00),Y
  BCC $E87E
  .byte $BB
  ORA ($F0,X)
  SBC $80,X
  .byte $F4
  BPL @E887
  .byte $12, $13
  SBC ($D0),Y
  ROL $B320
  ORA $F1
  .byte $B2
  AND $BB18
  ORA ($F0,X)
  SBC $0A,X
@E887:
  .byte $F4
  BIT $050B
  .byte $07
  SBC ($00),Y
  STA ($00),Y
  .byte $D3
  ORA ($F1,X)
  BVS @E827
  PLP
  .byte $C3
  ORA $F1
@E899:
  BVS @E82D
@E89B:
  BRK
  .byte $C3
  PHP
  SBC ($71),Y
  .byte $93
  CLV
  .byte $B3, $0C
  SBC ($71),Y
  .byte $93
  BRK
  .byte $B3
  BPL @E89B
  SBC $80,X
  .byte $F4
  PHP
  ORA #$0A
  ANC #$F1
  BRK
  CLI
  BRK
  .byte $C3
  ORA #$F1
  BRK
  ALR #$00
  .byte $C3
  ORA ($F1,X)
  BRK
  EOR $C300
  ORA $F0
  SBC $84,X
  .byte $80, $F4, $33
  BRK
  BRK
  BRK
  SBC ($00),Y
  TYA
  BRK
  .byte $D3
  ORA ($F0,X)
  SBC $0F,X
  .byte $F4
  PHP
  ORA #$0A
  ANC #$F1
  LDY $9C49
  .byte $63
  BRK
  SBC ($67),Y
  .byte $D3
  BEQ @E899
  .byte $04
  SBC ($67),Y
  STA $F0,X
  .byte $B3
  PHP
  SBC ($67),Y
  STX $F0,Y
  .byte $B3, $0C
  ASL $F4,X
  ASL A
@E8F6:
  ANC #$00
  BRK
  INC $00,X
  INC $2A,X
  INC $3F,X
  SBC ($00),Y
  NOP
  JSR $05BB
  .byte $04
  SBC ($68),Y
  CPX #$20
  .byte $BB
  ORA $F1
  LDA $0886
  SBC #$01
  BEQ $E909
  STY $02
  .byte $F4
  SEC
@E918:
  AND $4142,Y
  SBC ($00),Y
  LDA ($10),Y
  AXS #$01
  BEQ @E918
  STY $81
  .byte $F4
  SEC
  AND $4142,Y
  SBC ($00),Y
  LDX $CB10
  ORA ($F0,X)
  SBC $10,X
  .byte $F4
  PHP
  ORA #$0A
  ANC #$F1
  LDY $9C49
  .byte $63
  BRK
  SBC ($67),Y
  .byte $D4
  BEQ @E8F6
  .byte $04
  SBC ($67),Y
  STA $F0,X
  .byte $B3
  PHP
  SBC ($67),Y
  STX $F0,Y
  .byte $B3, $0C
  ASL $F4,X
  ASL A
  ANC #$00
  BRK
  INC $00,X
  INC $2A,X
  INC $3F,X
  SBC ($00),Y
  .byte $DB
  JSR $05BB
  .byte $04
  SBC ($68),Y
  SBC ($20,X)
  .byte $BB
  ORA $F8
  .byte $0C
  STA $84F5,Y
  .byte $82, $F4
  ROL $37,X
  BRK
  BRK
  SBC ($00),Y
  .byte $9E
  BRK
  .byte $D3
  ORA ($F0,X)
  SBC $84,X
  ASL $F8
  .byte $6F
  STA $84F5,Y
  .byte $83, $F4, $34
  BRK
  BRK
  BRK
  SBC ($00),Y
  STA $D300,X
  ORA ($F0,X)
  SBC $84,X
  ORA #$F8
  STY $99
  SBC $84,X
  STA $F4
  ROL $37,X
  BRK
  BRK
  SBC ($00),Y
  TAX
  BRK
  .byte $D3
  ORA ($F0,X)
  SBC $84,X
  .byte $0C
  SED
  STA $F599,Y
  STY $0D
  SED
  .byte $B2
  TXS
  SBC $80,X
  .byte $F4
  BPL $E9C7
  .byte $12, $13, $F7, $23, $5B
  SBC ($D2),Y
  ROL $BB20
  ORA $D1F1
  AND $C318
  ORA #$F1
  BRK
  BRK
@E9CA:
  .byte $80, $A3, $04
  SBC ($00),Y
  BRK
  .byte $80, $DB
  BRK
  BEQ @E9CA
  STY $0F
  SED
  ORA $9B
  SBC $84,X
  BPL $E9D6
  CLD
  TXS
  SBC $84,X
  ORA ($F8),Y
  .byte $A3
  TXS
  SBC $84,X
  .byte $12
  SED
  INC $9A,X
  SBC $84,X
  .byte $13
  SED
  .byte $14, $9B
  SBC $84,X
  .byte $14
  SED
  .byte $E7
  TXS
  SBC $84,X
  ORA $F4,X
  SEC
@E9FD:
  AND $4142,Y
  SBC ($00),Y
  BCS @EA14
  AXS #$01
  BEQ @E9FD
  .byte $80, $F4
  PHP
  ORA #$0A
  ANC #$F1
  LDY $9C49
  .byte $63
  BRK
@EA14:
  SBC ($67),Y
  CMP $F0,X
  .byte $B3
@EA19:
  .byte $04
  SBC ($67),Y
  CMP $B3F0,Y
  PHP
  SBC ($67),Y
  STX $F0,Y
  .byte $B3, $0C
  ASL $F4,X
  ASL A
  ANC #$00
  BRK
  INC $00,X
  INC $2A,X
  INC $3F,X
  SBC ($00),Y
  .byte $DC
  JSR $05BB
  .byte $04
  SBC ($68),Y
  .byte $E2
  JSR $05BB
  SED
  .byte $0C
  STA $1AF5,Y
  .byte $F4
  SEC
  AND $4142,Y
  SBC ($00),Y
  .byte $AF
  BPL @EA19
  ORA ($F0,X)
  SBC $80,X
  .byte $F4
  PHP
  ORA #$0A
  ANC #$F1
  LDY $9C49
  .byte $63
  BRK
  SBC ($67),Y
  DEC $F0,X
  .byte $B3, $04
  SBC ($67),Y
  STA $F0,X
  .byte $B3
  PHP
  SBC ($67),Y
  STX $F0,Y
  .byte $B3, $0C
  ASL $F4,X
  ASL A
  ANC #$00
  BRK
  INC $00,X
  INC $2A,X
  INC $3F,X
  SBC ($00),Y
  CMP $BB20,X
  ORA $04
  SBC ($68),Y
  .byte $E3
  JSR $05BB
  SED
  .byte $0C
  STA $84F5,Y
  CLC
  .byte $F4
  SEC
  AND $4142,Y
  SBC ($00),Y
  LDA $CB10
  ORA ($F0,X)
  SBC $84,X
  ORA $A1F8,Y
  .byte $9B
  SBC $84,X
  NOP
  .byte $F4
  AND $00,X
  BRK
  BRK
  SBC ($00),Y
  LDA #$00
  .byte $D3
  ORA ($F0,X)
  SBC $84,X
  .byte $1B, $F4, $33
  BRK
  BRK
  BRK
  SBC ($00),Y
  STA $D300,Y
  ORA ($F0,X)
  SBC $80,X
  .byte $F4, $13
  BRK
  BRK
  BRK
  .byte $F7, $03, $7B
  SBC ($B4),Y
  AND #$E0
  .byte $1B
  ASL $F1
  BRK
  BRK
  .byte $80, $FB
  BRK
  BEQ $EACB
  STY $1D
  .byte $F4, $33
  BMI @EADC
@EADC:
  BRK
  SBC ($00),Y
  TXS
  BRK
  .byte $D3
  ORA ($F0,X)
  SBC $84,X
  ASL $36F4,X
  .byte $37
  BRK
  BRK
  SBC ($00),Y
  .byte $A7
  BRK
  .byte $D3
  ORA ($F0,X)
  SBC $84,X
  .byte $1F, $F4
  ROL $37,X
  BRK
  BRK
  SBC ($00),Y
  TAY
  BRK
  .byte $D3
  ORA ($F0,X)
  SBC $84,X
  JSR $30F4
  AND ($32),Y
  BRK
  SBC ($00),Y
  .byte $9B
  BRK
  .byte $D3
  ORA ($F0,X)
  SBC $84,X
  AND ($F4,X)
  .byte $34
  BRK
  BRK
  BRK
  SBC ($00),Y
  .byte $9C
  BRK
  .byte $D3
  ORA ($F0,X)
  SBC $84,X
  .byte $23, $F4
  ROL $37,X
  BRK
  BRK
  SBC ($00),Y
  LDY $D300
  ORA ($F0,X)
  SBC $84,X
  BIT $F8
  .byte $83, $9B
  SBC $84,X
  .byte $33, $F4
  BMI @EB6C
  .byte $32
  BRK
  SBC ($00),Y
  LDX $00
  .byte $D3
  ORA ($F0,X)
  SBC $84,X
  .byte $34, $F4
  BMI @EB7B
  .byte $32
  BRK
  SBC ($00),Y
  LDA $00
  .byte $D3
  ORA ($F0,X)
  SBC $84,X
  AND $F4,X
  ROL $37,X
  BRK
  BRK
  SBC ($00),Y
  LDY #$00
  .byte $D3
  ORA ($F0,X)
  SBC $84,X
  ROL $F4,X
  BMI @EB99
  .byte $32
  BRK
  SBC ($00),Y
@EB6C:
  .byte $9F
  BRK
  .byte $D3
  ORA ($F0,X)
  SBC $84,X
  .byte $37, $F4
  BMI @EBA8
  .byte $32
  BRK
  SBC ($00),Y
@EB7B:
  .byte $A3
  BRK
  .byte $D3
  ORA ($F0,X)
  SBC $84,X
  SEC
  .byte $F4
  AND $00,X
  BRK
  BRK
  SBC ($00),Y
  LDX #$00
  .byte $D3
  ORA ($F0,X)
  SBC $84,X
  AND $36F4,Y
  .byte $37
  BRK
  BRK
  SBC ($00),Y
@EB99:
  LDY $00
  .byte $D3
  ORA ($F0,X)
  SBC $84,X
  NOP
  .byte $F4
  BMI $EBD5
  .byte $32
  BRK
  SBC ($00),Y
@EBA8:
  LDA ($00,X)
  .byte $D3
  ORA ($F0,X)
  SBC $84,X
  .byte $3C, $F4
  BMI @EBE4
  .byte $32
  BRK
  SBC ($00),Y
  .byte $AB
  BRK
  .byte $D3
  ORA ($F0,X)
  SBC $84,X
  STY $F4
  ORA $8000,X
  PHA
  SBC ($72),Y
  .byte $B2
  PHP
  AXS #$01
  BEQ $EBC1
  .byte $17, $F4
  PHP
  ORA #$0A
  ANC #$F1
  LDY $9C49
  .byte $63
  BRK
  SBC ($67),Y
  .byte $D7
  BEQ $EB90
  .byte $04
  SBC ($67),Y
  STA $F0,X
  .byte $B3
  PHP
@EBE4:
  SBC ($67),Y
  STX $F0,Y
  .byte $B3, $0C
  ASL $F4,X
  ASL A
  ANC #$00
  BRK
  INC $00,X
  INC $2A,X
  INC $3F,X
  SBC ($00),Y
  DEC $BB20,X
  ORA $04
  SBC ($68),Y
  .byte $E4
  `;
}

// $9C00-$9FFF (1024B): $9C00-$9FFF 代码/数据段8
function build_9C00_9FFF_seg8(): readonly number[] {
  return asm`
  JSR $05BB
  SED
  .byte $0C
  STA $80F5,Y
  .byte $F4, $13
  BRK
  BRK
  ANC #$F7
  .byte $03, $7B
  SBC ($00),Y
  BRK
  .byte $80, $FB
  BRK
  SBC ($B7),Y
  AND #$10
  ANC #$07
  SBC ($31),Y
  EOR #$AC
  .byte $FF
  ASL A
  PLP
  .byte $F4, $27, $1F
  BRK
  ANC #$F1
  BRK
  ANC #$00
  .byte $BB
  ORA $04
  SBC ($B5),Y
  CMP #$FD
  .byte $9F
  PHP
  SED
  LSR $F58E
  ORA $14F4
  ORA $16,X
  BRK
  SBC ($00),Y
  AND $C300,X
  ORA ($F0,X)
  SBC $81,X
  .byte $F4, $14
@EC4A:
  ORA $16,X
  BRK
  SBC ($BC),Y
  EOR ($B0,X)
  .byte $C3
@EC52:
  BRK
  BEQ @EC4A
  .byte $80, $F4, $14
  ORA $16,X
  BRK
  SBC ($00),Y
  .byte $42
  BRK
  .byte $C3
  ORA ($F0,X)
  SBC $80,X
  .byte $F4, $14
@EC66:
  ORA $16,X
  BRK
  SBC ($BC),Y
  .byte $44
  LDY #$C3
  BRK
  BEQ @EC66
  .byte $80, $F4, $04
  ORA $20
  AND ($F7,X)
  .byte $23, $5B
  SBC ($BD),Y
  .byte $32
  PHP
  .byte $E3
  ORA $D4F1
  CPY #$98
  .byte $D3
  PHP
  SBC ($00),Y
  BRK
@EC89:
  .byte $80, $A3, $04
  SBC ($00),Y
  BRK
  .byte $80, $DB
  BRK
  BEQ @EC89
  .byte $80, $F4, $04
  ORA $20
  AND ($F1,X)
  BRK
  BRK
  .byte $80, $FB
  BRK
  SBC ($BF),Y
  .byte $CF
  BEQ $EC70
  .byte $04
  SBC ($BE),Y
  .byte $33, $04, $BB
  ORA #$F0
  SBC $80,X
  .byte $F4, $0C
  ORA $0F0E
  SBC ($64),Y
  ORA $BB20,X
  ORA $F1
  ADC $1E
  BNE @EC52
  BRK
  .byte $14
  INC $15,X
  SBC ($C0),Y
  .byte $3F
  BPL $EC7B
  ORA ($04,X)
  SBC ($66),Y
  ORA $B310,X
  ORA $F1
  DEC $1E,X
  PHP
  .byte $AF
  ORA ($F0,X)
  SBC $80,X
  .byte $F4
  BPL @ECED
  .byte $12, $13, $F7, $03, $7B
  SBC ($C2),Y
  .byte $53
  CPX #$7B
  .byte $0C
  SBC ($00),Y
  BRK
  .byte $80, $83
  BRK
@ECED:
  PLP
  SBC ($C3),Y
  EOR $10,X
  .byte $1B, $07
  SBC ($00),Y
  BRK
  .byte $80, $FB
  BRK
  BEQ $ECF1
  .byte $80, $F4, $04
  ORA $20
  AND ($F1,X)
  CPY $32
@ED05:
  CLV
  .byte $BB
  ORA $F1
  CMP $C0
  CPX #$C3
  BRK
  BEQ @ED05
  .byte $80, $F4, $13
  BRK
  .byte $0F
  BRK
  .byte $F7, $03, $7B
  SBC ($C6),Y
  ANC #$40
  ANC #$0F
  .byte $14
  SBC ($C7),Y
  ROL A
  BRK
  .byte $1B
  ANC #$F1
  BRK
  BRK
  .byte $80
@ED2A:
  .byte $FB
  BRK
  .byte $32
  SBC ($DF),Y
  ROL A
  SED
  .byte $5B, $0C
  BEQ @ED2A
  .byte $80, $F4, $0C
  ORA $0F0E
  .byte $F7, $23, $5B
  SBC ($51),Y
  .byte $1C
  BRK
  AXS #$0C
  SBC ($9E),Y
  ASL $A368,X
  ORA #$F1
  BRK
  BRK
  .byte $80, $A3, $04
  SBC ($00),Y
  BRK
  .byte $80, $DB
  BRK
  ASL $2AF6,X
  SBC ($29),Y
@ED5B:
  .byte $47
  CPX #$CB
  .byte $0C, $02
  SBC ($2A),Y
  JSR $CBE8 ; → bank switch?
  .byte $0C
  SBC ($41),Y
  .byte $22, $FC, $BB
  PHP
  ORA ($FB,X)
  ORA ($23,X)
  EOR $01
  .byte $FB
  ORA ($32,X)
  EOR $F8
  JMP ($F59D)
  .byte $80, $F4
  ANC #$00
  BRK
  BRK
  SBC ($00),Y
  .byte $57
  BPL $ED48
  ORA ($F0,X)
  SBC $80,X
  .byte $F4, $14
  ORA $16,X
  BRK
  .byte $F7, $23, $5B
  SBC ($00),Y
  BRK
  .byte $80, $DB
  BRK
  SBC ($00),Y
  BRK
@ED9A:
  .byte $80, $A3, $04
  SBC ($B3),Y
  .byte $5F
  BVS $EDA1
  PHP
  BEQ @ED9A
  .byte $80, $F4, $27
  ASL $0B00,X
  SBC ($B6),Y
  .byte $13
  BVC @ED5B
  .byte $04
  SBC ($92),Y
  EOR #$20
  .byte $77
  ORA ($F0,X)
  SBC $09,X
  .byte $F4, $22, $23
  BRK
  BRK
  SBC ($BB),Y
  .byte $62
  CLC
  .byte $8B
  ORA ($01,X)
  SBC ($BB),Y
  .byte $62
  CLC
  .byte $8B
  ORA $01
  SBC ($BB),Y
  ADC ($18,X)
  .byte $8B
  ORA #$01
  SBC ($BB),Y
  ADC ($18,X)
@EDD8:
  .byte $8B
  ORA $F101
  .byte $BB
  RTS
  CLC
  .byte $8B
  ORA ($01),Y
  SBC ($BB),Y
  RTS
  CLC
  .byte $8B
  ORA $F0,X
  SBC $81,X
  .byte $F4, $14
  ORA $16,X
  BRK
  SBC ($B9),Y
  .byte $52
  BCS @EDD8
  .byte $0C
  PLP
  .byte $F7, $23, $5B
  SBC ($00),Y
  BRK
@EDFD:
  .byte $80, $A3
  BRK
  SBC ($00),Y
  BRK
  .byte $80, $DB, $04
  BEQ @EDFD
  .byte $80, $F4
  PHP
  ORA #$0A
  ANC #$F1
  .byte $D3
  ADC $BB60
  ORA $F1
  .byte $D3
  JMP ($BB60)
  ORA ($F1,X)
  .byte $D3, $6F
  RTS
  .byte $BB
  ORA #$F0
  SBC $80,X
  .byte $F4
  PHP
  ORA #$0A
  ANC #$F1
  DEX
  ADC $C320
  ORA $F1
  DEX
  JMP ($C320)
  ORA ($F1,X)
  DEX
  .byte $6F
  JSR $09C3
  BEQ $EE31
  .byte $80, $F4
  PHP
  ORA #$0A
  ANC #$F1
  CMP #$BE
  CPX #$C3
  .byte $04
  SBC ($C9),Y
  .byte $BB
@EE4B:
  CPX #$C3
  BRK
  SBC ($C9),Y
  CMP ($E0,X)
  .byte $C3
  PHP
  BEQ @EE4B
  .byte $83, $F4
  CLC
  ORA $1B1A,Y
  SBC ($13),Y
  .byte $17
  SED
  .byte $C3, $04
  SBC ($CE),Y
  ORA $80,X
  SBC #$00
  SED
  .byte $A7, $8B
  SBC $84,X
  .byte $34, $F4
  BMI @EEA2
  .byte $32
  BRK
  SBC ($CC),Y
  LDA $F8
  .byte $D3
  ORA ($F0,X)
  SBC $84,X
  .byte $33, $F4
  BMI @EEB1
  .byte $32
  BRK
  SBC ($CC),Y
  LDX $F8
  .byte $D3
  ORA ($F0,X)
  SBC $0F,X
  .byte $F4
  ASL $17,X
  AND $F100
  BRK
  ADC #$00
  .byte $C3
  ORA ($F0,X)
  SBC $80,X
  .byte $F4
  ASL $17,X
  AND $F100
  BRK
  .byte $7B
  BRK
@EEA2:
  .byte $C3
  ORA ($F0,X)
  SBC $80,X
  .byte $F4
  ASL $17,X
  AND $F100
  BRK
  .byte $7C
  BRK
  .byte $C3
@EEB1:
  ORA ($F0,X)
  SBC $80,X
  .byte $F4
  ASL $17,X
  AND $F100
  BRK
  ADC $C300,X
  ORA ($F0,X)
  SBC $83,X
  .byte $F4, $04
  ORA $1E
  .byte $1F
  SBC ($00),Y
  STY $D71C
  ORA ($F0,X)
  SBC $80,X
  .byte $F4
  BPL @EEE5
  .byte $12, $13, $F7, $23, $5B
  SBC ($E0),Y
  ARR #$06
  .byte $B3, $0C
  SBC ($E0),Y
  CMP $06
  .byte $B3
  PHP
@EEE5:
  SBC ($00),Y
  BRK
  .byte $80
@EEE9:
  .byte $A3, $04
  SBC ($00),Y
  BRK
  .byte $80, $DB
  BRK
  .byte $14
  SBC ($E1),Y
  .byte $C3, $FB, $B3
  ORA $F1,X
  SBC ($C2,X)
  .byte $FB, $B3
  ORA ($28),Y
  .byte $F7, $03, $7B
  INC $54,X
  INC $69,X
  SBC ($00),Y
  .byte $C3
  SEC
  .byte $B3
  ORA $00F1
  .byte $C2
  SEC
  .byte $B3
  ORA #$F1
  BRK
  ARR #$C8
  .byte $B3, $04
  SBC ($00),Y
  ROR A
  INY
  .byte $B3
  BRK
  BEQ $EF15
  .byte $80, $F4, $04
  ORA $20
  AND ($F7,X)
  .byte $03, $7B
  SBC ($00),Y
  .byte $54
  BPL @EEE9
  ORA #$F1
  BRK
  ADC ($00),Y
  AXS #$05
  SBC ($00),Y
  BRK
  .byte $80, $FB
  BRK
  BEQ $EF32
  .byte $80, $F4
  PHP
  ORA #$0A
  ANC #$F1
  .byte $CF
  EOR $C300
  ORA $F1
  .byte $CF
  ALR #$00
  .byte $C3
  ORA ($F1,X)
  .byte $CF
  CLI
  BRK
  .byte $C3
  ORA #$F0
  SBC $09,X
  .byte $F4
  RTS
  ADC ($62,X)
  .byte $63
  SBC ($0F),Y
  ADC $BBF0,Y
  ORA ($EF,X)
  .byte $EF
  JSR $00F1
  .byte $82
  BEQ $EF26
  BRK
  BEQ $EF63
  CLC
  .byte $F4
  PHP
  ORA #$0A
  ANC #$F1
  LDY $9C49
  .byte $63
  BRK
  SBC ($67),Y
  .byte $D4
  BEQ $EF32
  .byte $04
  SBC ($67),Y
  STA $F0,X
  .byte $B3
  PHP
  SBC ($67),Y
  STX $F0,Y
  .byte $B3, $0C
  ASL $F4,X
  ASL A
  ANC #$00
  BRK
  INC $00,X
  INC $2A,X
  INC $3F,X
  SBC ($00),Y
  .byte $DB
  JSR $05BB
  .byte $04
  SBC ($68),Y
  SBC ($20,X)
  .byte $BB
  ORA $F8
  .byte $0C
  STA $14F5,Y
  .byte $F4, $74
  ADC $7B,X
  .byte $67
  SBC ($00),Y
  STA ($00,X)
  .byte $D3
  ORA ($EF,X)
  SBC $0C,X
  .byte $F4
  JMP ($6E6D)
  .byte $6F
  SBC ($D5),Y
  SEI
  SED
  .byte $D3
  BRK
  BEQ $EFBA
  ASL $3AF8
  .byte $9C
  SBC $80,X
  .byte $F4
  PHP
  ORA #$0A
  ANC #$F1
  .byte $DC
  EOR $B360
  ORA $F1
  .byte $DC
  ALR #$60
  .byte $B3
  ORA ($F1,X)
  .byte $DC
  CLI
  RTS
  .byte $B3
  ORA #$1E
  SBC ($DD),Y
  .byte $4F
  JSR $09C3
  SBC ($DD),Y
  EOR $C320
  ORA $F1
  CMP $204B,X
  .byte $C3
  ORA ($F1,X)
  .byte $D7
  EOR #$08
  SBC #$0D
  SBC $010F,Y
  .byte $FB
  .byte $01
  `;
}

// ═══════════════════════════════════════════════════
// Assemble all sections into full 8KB bank
// ═══════════════════════════════════════════════════
const _PRG_BANK_20: readonly number[] = [
  ...build_8000_83FF_seg1(),
  ...build_8400_87FF_seg2(),
  ...build_8800_8BFF_seg3(),
  ...build_8C00_8FFF_seg4(),
  ...build_9000_93FF_seg5(),
  ...build_9400_97FF_seg6(),
  ...build_9800_9BFF_seg7(),
  ...build_9C00_9FFF_seg8(),
];
