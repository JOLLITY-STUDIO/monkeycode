/**
 * PRG-ROM MMC3 bank 16 (8KB) — function-based assembly
 * Mapper: 4 (MMC3) | CPU: $8000-$9FFF
 * CDL: code=1860 data=4599 unaccessed=1733
 *
 * 功能: 場景渲染/脚本引擎
 *
 * Pattern: 参考 bank_31.ts
 *   每个 build_xxx() 函数返回其覆盖地址范围的 raw 6502 字节，
 *   最后通过 spread 拼成完整的 8KB 数组
 */


import { asm } from '../_6502asm';
export { _PRG_BANK_16 as default };

console.log('[prg_16_scene_logic] loaded');

// $8000-$83FF (1024B): $8000-$83FF 代码/数据段1
function build_8000_83FF_seg1(): readonly number[] {
  return asm`
  JMP $8006
  JMP $8021
  LDX #$89
  LDA $0518
  ASL A
  TAY
  BCC @E010
  INX
@E010:
  LDA #$BF
  STA $5D
  STX $5E
  LDA ($5D),Y
  TAX
  INY
  LDA ($5D),Y
  STA $5E
  STX $5D
  RTS
  LDA $0517
  STA $052A
  LDA $0516
  AND #$FB
  STA $0516
  LDA #$00
  STA $052B
  STA $052D
  STA $052C
  STA $0530
  STA $3A
  LDY $3A
  INC $3A
  LDA ($5D),Y
  CMP #$F0
  BCC @E04F
  JSR $80A9 ; → bank switch?
  JMP $803F
@E04F:
  STA $0523
  LDA $0516
  ORA #$40
  AND #$EF
  STA $0516
  LDY $3A
  INC $3A
  LDA ($5D),Y
  CMP #$F0
  BCC @E069
  JSR $8991 ; → bank switch?
@E069:
  STA $0524
  LDY $3A
  INC $3A
  LDA ($5D),Y
  CMP #$F0
  BCC @E079
  JSR $899C ; → bank switch?
@E079:
  STA $0528
  LDY $3A
  INC $3A
  LDA ($5D),Y
  CMP #$F0
  BCC @E089
  JSR $89A7 ; → bank switch?
@E089:
  STA $0529
  LDA $3A
  CLC
  ADC $5D
  STA $5D
  BCC @E097
  INC $5E
@E097:
  LDX #$15
  LDA #$F0
  STA $01,X
  LDA #$0B
  STA $02,X
  LDA #$80
  LDY #$08
  JSR $C50F ; → bank switch?
  RTS
  SEC
  SBC #$F0
  JSR $C509 ; → bank switch?
  .byte $CF, $80, $D4, $80, $F4, $80
  ORA $81
  CPX #$87
  INC $87
  CPX $F587
  .byte $87, $FF, $87
  ORA #$88
  NOP
  DEY
  .byte $37
  DEY
  .byte $53
  DEY
  EOR $E388,X
  DEY
  SBC $A988
  BRK
  STA $052A
  LDA #$08
  BIT $0516
  BNE @E0E6
  ORA $0516
  STA $0516
  LDX #$05
  JSR $C51B ; → bank switch?
@E0E6:
  LDA #$00
  STA $0522
  LDA $21
  AND #$1E
  STA $21
  PLA
  PLA
  RTS
  LDY $3A
  LDA ($5D),Y
  TAX
  INY
  LDA ($5D),Y
  STA $5E
  STX $5D
  LDA #$00
  STA $3A
  RTS
  LDY $3A
  LDA ($5D),Y
  PHA
  JSR $816E ; → bank switch?
  PLA
  BPL @E12F
  TXA
  SEC
  ADC $3A
  CLC
  ADC $5D
  STA $5D
  BCC @E11D
  INC $5E
@E11D:
  LDY #$00
  LDA ($5D),Y
  CLC
  ADC $5D
  STA $5D
  BCC @E12A
  INC $5E
@E12A:
  LDA #$00
  STA $3A
  RTS
@E12F:
  TXA
  ASL A
  SEC
  ADC $3A
  TAY
  JMP $80F6
  AND #$FC
  BEQ @E14D
  LSR A
  STA $3B
  LDA $00E2
  CMP $3B
  BCC @E14B
  SBC $3B
  JMP $8142
@E14B:
  ADC $3B
@E14D:
  LDX #$00
  RTS
  JSR $C50C ; → bank switch?
  LDY #$01
  LDA ($34),Y
  SEC
  SBC #$40
  TAX
  INY
  LDA ($34),Y
  SBC #$00
  BPL @E165
  LDX #$00
  TXA
@E165:
  STA ($34),Y
  DEY
  TXA
  STA ($34),Y
  LDX #$01
  RTS
  AND #$7F
  JSR $C509 ; → bank switch?
  .byte $1C, $82
  BIT $5182
  .byte $82
  EOR $82,X
  EOR $6082,Y
  .byte $82, $64, $82
  ADC ($82),Y
  ADC $82,X
  TXA
  .byte $82, $97, $82, $9B, $82, $9F, $82
  TSX
  .byte $82
  ROR $83
  ROR A
  .byte $83
  ROR $7C83
  .byte $83, $80, $83
  STY $83
  LDY $83
  TAY
  .byte $83
  LDY $83,X
  .byte $C2, $83
  DEC $83
  DEC $83,X
  CMP $E483,X
  .byte $83
  SBC #$83
  SBC $83,X
  ORA ($84,X)
  ASL A
  STY $0E
  STY $2B
  STY $36
  STY $3E
  STY $42
  STY $4E
  STY $57
  STY $4E
  STY $7E
  STY $98
  STY $B2
  STY $C7
  STY $E7
  STY $EF
  STY $FC
  STY $0B
  STA $27
  STA $3A
  STA $46
  STA $56
  STA $6C
  STA $70
  STA $80
  STA $87
  STA $92
  STA $A2
  STA $B2
  STA $BE
  STA $CA
  STA $DA
  STA $E6
  STA $FE
  STA $02
  STX $10
  STX $27
  STX $2E
  STX $3B
  STX $4A
  STX $77
  STX $8A
  STX $B6
  STX $CC
  STX $20
  .byte $0C
  CMP $A0
  BRK
  LDA ($34),Y
  LDX #$00
  RTS
  BEQ @E21B
  LDA $0516
  ORA #$04
  STA $0516
@E21B:
  RTS
  LDA $0442
  JSR $C50C ; → bank switch?
  LDY #$00
  LDX #$00
  LDA ($34),Y
  BNE @E22B
  INX
@E22B:
  RTS
  LDA $0444
  LDY $0612
  CPY #$02
  BCC @E239
  LDA $0445
@E239:
  JSR $8138 ; → bank switch?
  CMP #$80
  BCC @E250
  LDA $0442
  LDX $0612
  CPX #$02
  BCC @E24D
  LDA $0441
@E24D:
  JSR $8150 ; → bank switch?
@E250:
  RTS
  LDX $043D
  RTS
  LDX $0612
  RTS
  LDX $044E
  BEQ @E25F
  DEX
@E25F:
  RTS
  LDX $0616
  RTS
  LDX #$00
  LDA $0442
  BEQ @E26F
  CMP #$0B
  BNE @E270
@E26F:
  INX
@E270:
  RTS
  LDX $0612
  RTS
  LDX #$02
  LDA $0442
  BEQ @E289
  CMP #$0B
  BEQ @E289
  DEX
  LDA $043D
  CMP #$03
  BEQ @E289
  DEX
@E289:
  RTS
  LDY $043B
  LDX $8291,Y
  RTS
  BRK
  ORA ($FF,X)
  .byte $FF, $02, $03
  LDX $043D
  RTS
  LDX $0612
  RTS
  LDX #$00
  LDA $043B
  BNE @E2B1
  LDA $043C
  AND #$7F
  CMP #$03
  BCC @E2B9
  BCS @E2B8
@E2B1:
  LDA $043C
  AND #$7F
  BEQ @E2B9
@E2B8:
  INX
@E2B9:
  RTS
  LDA $0443
  CMP #$06
  BEQ @E2DA
  LDA $062C
  BPL @E2CB
  EOR #$FF
  CLC
  ADC #$01
@E2CB:
  CMP #$40
  BCC @E2D3
  EOR #$FF
  AND #$3F
@E2D3:
  CMP #$20
  BCC @E2DA
  INC $0443
@E2DA:
  LDA $0443
  ASL A
  ASL A
  ADC $0443
  TAY
  LDX #$00
  LDA $00E3
@E2E8:
  CMP $8308,Y
  BCS @E2F3
  BEQ @E2F3
  INX
  INY
  BNE @E2E8
@E2F3:
  TXA
  PHA
  JSR $82FB ; → bank switch?
  PLA
  TAX
  RTS
  JSR $C509 ; → bank switch?
  ROL $83,X
  .byte $37, $83
  AND $4083
  .byte $83
  JMP $4D83
  AND $0F21,Y
  BRK
  STA ($53,X)
  AND $0019
  .byte $57, $1F, $17
  ORA $6400
  .byte $1F, $17
  ORA $2C00
  .byte $13, $FF, $0F
  BRK
  .byte $42
  ASL $15FF,X
  BRK
  .byte $1F, $13, $FF, $0F
  BRK
  BRK
  BRK
  JSR $8350 ; → bank switch?
  LDA #$02
  STA $0612
  RTS
  RTS
  LDA #$02
  STA $0612
  INC $0616
  RTS
  JSR $8350 ; → bank switch?
  JSR $835C ; → bank switch?
  LDA #$02
  STA $043C
  RTS
  JSR $8350 ; → bank switch?
  RTS
  LDA $05FB
  EOR #$0B
  JSR $C548 ; → bank switch?
  STA $0442
  RTS
  LDA $05FB
  JSR $C548 ; → bank switch?
  STA $0441
  RTS
  LDX $043B
  RTS
  LDX $0612
  RTS
  LDX #$00
  LDA $043B
  CMP #$01
  BEQ @E37B
  JSR $8677 ; → bank switch?
  INX
@E37B:
  RTS
  LDX $0612
  RTS
  LDX $0612
  RTS
  JSR $838B ; → bank switch?
  LDX $0612
  RTS
  LDA $0612
  JSR $C509 ; → bank switch?
  .byte $97, $83
  TYA
  .byte $83
  TYA
  .byte $83
  RTS
  LDA $05FB
  EOR #$0B
  JSR $C548 ; → bank switch?
  STA $0442
  RTS
  LDX $0612
  RTS
  LDY $043D
  LDX $83AF,Y
  RTS
  .byte $FF, $FF
  BRK
  .byte $FF
  ORA ($AC,X)
  .byte $3B, $04
  LDX $83BB,Y
  RTS
  .byte $FF
  BRK
  .byte $FF, $FF
  ORA ($FF,X)
  .byte $02
  LDX $0612
  RTS
  LDA $0441
  JSR $8207 ; → bank switch?
  CMP #$1C
  BEQ @E3D5
  CMP #$48
  BEQ @E3D5
  INX
@E3D5:
  RTS
  LDA $043E
  AND #$7F
  TAX
  RTS
  LDA $043E
  AND #$7F
  TAX
  RTS
  LDA $043E
  AND #$7F
  TAX
  RTS
  LDA $043C
  AND #$7F
  TAX
  JSR $8211 ; → bank switch?
  RTS
  LDA #$01
  JSR $8211 ; → bank switch?
  LDA $043C
  AND #$7F
  TAX
  `;
}

// $8400-$87FF (1024B): $8400-$87FF 代码/数据段2
function build_8400_87FF_seg2(): readonly number[] {
  return asm`
  RTS
  LDA $043C
  AND #$7F
  TAX
  JMP $8211
  LDX $043B
  RTS
  LDA $05FB
  EOR #$0B
  JSR $8207 ; → bank switch?
  LDX #$02
  CMP #$74
  BEQ @E42A
  DEX
  CMP #$22
  BEQ @E42A
  CMP #$39
  BEQ @E42A
  CMP #$4C
  BEQ @E42A
  DEX
@E42A:
  RTS
  LDX #$00
  LDA $061C
  CMP #$60
  BCC @E435
  INX
@E435:
  RTS
  LDX $05FB
  BEQ @E43D
  LDX #$01
@E43D:
  RTS
  LDX $002A
  RTS
  LDA $0441
  JSR $8207 ; → bank switch?
  CMP #$60
  BNE @E44D
  INX
@E44D:
  RTS
  LDX $0447
  BNE @E456
  INC $0447
@E456:
  RTS
  LDX #$00
  LDA $002B
  CMP #$22
  BNE @E47D
  LDY #$00
  LDA $0028
  SEC
  SBC $0029
  BCC @E47A
  BEQ @E47A
  LDY #$80
  LDA #$CA
  STA $03FE
  LDA $05FB
  BNE @E47A
  INX
@E47A:
  STY $03FD
@E47D:
  RTS
  LDA $0442
  JSR $8207 ; → bank switch?
  TAY
  LDX $86F4,Y
  BEQ @E497
  LDA $0441
  JSR $8207 ; → bank switch?
  TAY
  LDX $86F4,Y
  JSR $8211 ; → bank switch?
@E497:
  RTS
  LDA $0441
  JSR $8207 ; → bank switch?
  TAY
  LDX $86F4,Y
  BEQ @E4B1
  LDA $0442
  JSR $8207 ; → bank switch?
  TAY
  LDX $86F4,Y
  JSR $8211 ; → bank switch?
@E4B1:
  RTS
  LDX #$00
  BIT $043E
  BPL @E4C6
  LDA $0442
  JSR $8207 ; → bank switch?
  TAY
  LDX $86F4,Y
  JSR $8211 ; → bank switch?
@E4C6:
  RTS
  LDA $0441
  LDX $05FB
  BEQ @E4D2
  LDA $0442
@E4D2:
  JSR $C50C ; → bank switch?
  LDX #$00
  LDY #$01
  LDA ($34),Y
  SEC
  SBC #$64
  INY
  LDA ($34),Y
  SBC #$00
  BCS @E4E6
  INX
@E4E6:
  RTS
  LDX $0600
  BEQ @E4EE
  LDX #$01
@E4EE:
  RTS
  LDX #$00
  LDA $043C
  AND #$7F
  CMP #$13
  BNE @E4FB
  INX
@E4FB:
  RTS
  JSR $C551 ; → bank switch?
  LDX #$00
  LDY #$07
  LDA ($34),Y
  CMP #$18
  BCC @E50A
  INX
@E50A:
  RTS
  LDX #$00
  BIT $043E
  BPL @E526
  LDA $0442
  JSR $8207 ; → bank switch?
  CMP #$0F
  BEQ @E525
  CMP #$21
  BEQ @E524
  CMP #$40
  BNE @E526
@E524:
  INX
@E525:
  INX
@E526:
  RTS
  LDA $0441
  JSR $8207 ; → bank switch?
  LDX #$02
  CMP #$60
  BEQ @E539
  DEX
  CMP #$01
  BEQ @E539
  DEX
@E539:
  RTS
  LDA $0441
  JSR $8207 ; → bank switch?
  CMP #$15
  BEQ @E545
  INX
@E545:
  RTS
  LDA $0441
  JSR $8207 ; → bank switch?
  CMP #$1B
  BEQ @E555
  CMP #$4A
  BEQ @E555
  INX
@E555:
  RTS
  LDA $043E
  AND #$7F
  TAX
  BEQ @E56B
  LDA $0442
  JSR $8207 ; → bank switch?
  TAY
  LDX $876A,Y
  JSR $8211 ; → bank switch?
@E56B:
  RTS
  LDX $044E
  RTS
  LDA $043D
  AND #$0F
  TAY
  LDX $857A,Y
  RTS
  .byte $FF, $FF
  BRK
  ORA ($FF,X)
  .byte $02
  LDA $043E
  AND #$7F
  TAX
  RTS
  LDA $043E
  AND #$7F
  TAX
  BEQ @E591
  LDX #$01
@E591:
  RTS
  LDA $0441
  JSR $8207 ; → bank switch?
  CMP #$1A
  BEQ @E5A1
  CMP #$41
  BEQ @E5A1
  INX
@E5A1:
  RTS
  LDA $0441
  JSR $8207 ; → bank switch?
  CMP #$1D
  BEQ @E5B1
  CMP #$4B
  BEQ @E5B1
  INX
@E5B1:
  RTS
  LDA $0441
  JSR $8207 ; → bank switch?
  CMP #$3E
  BEQ @E5BD
  INX
@E5BD:
  RTS
  LDA $0441
  JSR $8207 ; → bank switch?
  CMP #$2B
  BEQ @E5C9
  INX
@E5C9:
  RTS
  LDA $0441
  JSR $8207 ; → bank switch?
  CMP #$20
  BEQ @E5D9
  CMP #$45
  BEQ @E5D9
  INX
@E5D9:
  RTS
  LDA $0441
  JSR $8207 ; → bank switch?
  CMP #$11
  BEQ @E5E5
  INX
@E5E5:
  RTS
  LDA $043B
  SEC
  SBC #$07
  STA $3B
  ASL A
  ADC $3B
  STA $3B
  LDA $043D
  SEC
  SBC #$07
  CLC
  ADC $3B
  TAX
  RTS
  LDX $0612
  RTS
  LDA $0441
  JSR $8207 ; → bank switch?
  TAY
  LDX $86F4,Y
  JSR $8211 ; → bank switch?
  RTS
  LDA $05FB
  EOR #$0B
  JSR $8207 ; → bank switch?
  LDX #$04
@E61A:
  CMP $8622,X
  BEQ @E622
  DEX
  BNE @E61A
@E622:
  RTS
  .byte $02, $0F
  AND ($22,X)
  LDA $00E2
  AND #$01
  TAX
  RTS
  LDY $043D
  LDX $8635,Y
  RTS
  .byte $FF, $FF
  BRK
  .byte $FF
  ORA ($02,X)
  LDA $043D
  AND #$0F
  TAY
  LDX $8645,Y
  RTS
  .byte $FF, $FF, $FF
  BRK
  ORA ($A2,X)
  BRK
  LDA $0612
  CMP #$03
  BCS @E676
  LDA $0444
  JSR $8138 ; → bank switch?
  CMP #$80
  BCC @E676
  LDA $05FB
  EOR #$0B
  JSR $C50C ; → bank switch?
  LDY #$05
  LDA ($34),Y
  CLC
  ADC #$00
  CMP #$80
  BCC @E672
  LDA #$7F
@E672:
  STA ($34),Y
  LDX #$01
@E676:
  RTS
  LDX #$00
  LDA $0444
  JSR $8138 ; → bank switch?
  CMP #$80
  BCC @E689
  LDA $0442
  JSR $8150 ; → bank switch?
@E689:
  RTS
  LDA $0441
  JSR $8207 ; → bank switch?
  LDY #$00
@E692:
  CMP $86A6,Y
  BEQ @E69D
  INY
  INY
  CPY #$0E
  BNE @E692
@E69D:
  LDX $86A7,Y
  LDA #$01
  JSR $8211 ; → bank switch?
  RTS
  NOP
  BRK
  EOR ($00,X)
  ROL $01,X
  .byte $1C, $02
  PHA
  .byte $02
  ROL $5703
  .byte $04
  BRK
  ORA $A2
  BRK
  LDA $043C
  AND #$7F
@E6BD:
  CMP $86C8,X
  BEQ @E6C7
  INX
  CPX #$04
  BNE @E6BD
@E6C7:
  RTS
  PHP
  ASL A
  BPL @E6EB
  LDA $0441
  JSR $8207 ; → bank switch?
  LDX #$00
@E6D4:
  CMP $86E3,X
  BEQ @E6DE
  INX
  CPX #$11
  BNE @E6D4
@E6DE:
  CPX #$11
  JMP $8211
  ORA ($11,X)
  NOP
  EOR ($36,X)
  .byte $1F
  SEC
  .byte $17
@E6EB:
  CLC
  LSR $47
  BMI @E721
  RTS
  LSR $5758,X
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
  .byte $02
  BRK
  BRK
  ASL A
  .byte $12
  BRK
  BPL @E71D
  BRK
  .byte $04, $0C
  ASL $0008
  .byte $14
  ASL $00
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
@E71D:
  BRK
  BRK
  .byte $17
  BRK
@E721:
  BRK
  .byte $0F
  BRK
  ORA ($11),Y
  ORA $0700
  ORA #$05
  BRK
  ORA $00,X
  BRK
  JSR $0000
  NOP
  BRK
  BRK
  .byte $04, $13
  BRK
  .byte $03
  ASL $10
  BPL @E74B
  ANC #$0C
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
@E74B:
  .byte $1F
  ASL $0000,X
  BRK
  BRK
  BRK
  ORA $1C00,X
  BRK
  BRK
  ORA $2100,Y
  BRK
  .byte $1B
  BRK
  BRK
  CLC
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
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
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ASL $0000
  ORA ($01,X)
  BRK
  .byte $0C, $03
  ORA $00
  BRK
  BRK
  BRK
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
  BRK
  BRK
  BRK
  ASL $00
  .byte $02, $02, $04
  BRK
  BRK
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
  .byte $0C
  BRK
  BRK
  BRK
  BRK
  ORA ($01,X)
  ORA $0F
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
  ORA #$00
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ASL A
  BRK
  BRK
  BRK
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
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  PHP
  BRK
  BRK
  BRK
  LDA #$40
  STA $052A
  RTS
  LDA #$00
  STA $052A
  RTS
  LDA #$40
  EOR $052A
  STA $052A
  RTS
  LDY $3A
  INC $3A
  LDA ($5D),Y
  STA $052B
  RTS
  .byte $A4
  `;
}

// $8800-$8BFF (1024B): $8800-$8BFF 代码/数据段3
function build_8800_8BFF_seg3(): readonly number[] {
  return asm`
  NOP
  INC $3A
  LDA ($5D),Y
  STA $052C
  RTS
  LDY $3A
  LDA ($5D),Y
  STA $0530
  INY
  LDA ($5D),Y
  STA $0531
  INY
  STY $3A
  RTS
  LDX $0522
  LDA $3A
  TAY
  CLC
  ADC #$02
  ADC $5D
  STA $051A,X
  LDA $5E
  ADC #$00
  STA $051B,X
  INX
  INX
  STX $0522
  JMP $80F6
  LDX $0522
  DEX
  DEX
  STX $0522
  BPL @E844
  JMP $80CF
@E844:
  LDA $051A,X
  STA $5D
  LDA $051B,X
  STA $5E
  LDA #$00
  STA $3A
  RTS
  LDY $3A
  INC $3A
  LDA ($5D),Y
  STA $052D
  RTS
  LDY $3A
  INC $3A
  LDA ($5D),Y
  JSR $886A ; → bank switch?
  STX $052A
  RTS
  JSR $C509 ; → bank switch?
  .byte $77
  DEY
  TAX
  DEY
  LDA $88,X
  .byte $BF
  DEY
  CMP $A988,Y
  BRK
  STA $3B
  LDA $0441
  JSR $C50C ; → bank switch?
  LDA $0638
  JSR $C536 ; → bank switch?
  TYA
  LDY #$08
  SEC
  SBC ($34),Y
  BCS @E891
  INC $3B
@E891:
  TXA
  LDY #$06
  SEC
  SBC ($34),Y
  BCS @E89D
  INC $3B
  INC $3B
@E89D:
  LDX #$40
  LDA $3B
  BEQ @E8A9
  CMP #$03
  BEQ @E8A9
  LDX #$00
@E8A9:
  RTS
  LDX #$00
  LDA $0616
  LSR A
  BCC @E8B4
  LDX #$40
@E8B4:
  RTS
  LDX #$00
  LDA $05FB
  BEQ @E8BE
  LDX #$40
@E8BE:
  RTS
  LDA $0441
  JSR $C50C ; → bank switch?
  LDY #$08
  LDA ($34),Y
  LDX $05FB
  BEQ @E8D0
  EOR #$FF
@E8D0:
  LDX #$00
  CMP #$80
  BCS @E8D8
  LDX #$40
@E8D8:
  RTS
  LDX #$00
  BIT $062C
  BPL @E8E2
  LDX #$40
@E8E2:
  RTS
  LDY $3A
  INC $3A
  LDA ($5D),Y
  STA $0539
  RTS
  LDY $3A
  LDA ($5D),Y
  JSR $C509 ; → bank switch?
  .byte $FC
  DEY
  ORA $3D89
  .byte $89, $42, $89
  LDA $0441
  JSR $C50C ; → bank switch?
  LDY #$00
  LDA ($34),Y
  CMP #$60
  BNE @E90A
@E90A:
  INC $3A
  RTS
  LDA $05FB
  BNE @E938
  LDA $002B
  CMP #$05
  BNE @E938
  LDX $0446
  BEQ @E93A
  LDX #$01
  LDA $043C
  CMP #$03
  BEQ @E93A
  LDX $0446
  CPX #$04
  BCS @E938
  LDA $043C
  BEQ @E938
  INC $0446
  BNE @E93A
@E938:
  LDX #$00
@E93A:
  JMP $812F
  LDX #$00
  JMP $812F
  LDX #$00
  LDA $05FB
  BNE @E98E
  LDA #$01
@E94B:
  PHA
  JSR $C50C ; → bank switch?
  LDY #$00
  LDA ($34),Y
  TAY
  LDX #$00
  PLA
  CPY #$1A
  BEQ @E964
  CLC
  ADC #$01
  CMP #$0B
  BNE @E94B
  BEQ @E98E
@E964:
  LDA $043C
  CMP #$03
  BCC @E98E
  BIT $0449
  BMI @E98E
  INC $0449
  LDA $0449
  CMP #$02
  BNE @E98E
  LDA #$00
  LDY $00E2
  CPY #$20
  BCS @E98B
  LDA #$1E
  STA $044A
  LDA #$80
  INX
@E98B:
  STA $0449
@E98E:
  JMP $812F
  SEC
  SBC #$F0
  JSR $C509 ; → bank switch?
  STA $A989,Y
  .byte $FF
  RTS
  SEC
  SBC #$F0
  JSR $C509 ; → bank switch?
  LDY $89
  LDA #$FF
  RTS
  SEC
  SBC #$F0
  JSR $C509 ; → bank switch?
  LDA ($89),Y
  LDY $89,X
  LDA #$FF
  RTS
  LDA $05E3
  ORA #$40
  STA $05E3
  LDA #$FF
  RTS
  LDA ($8A),Y
  .byte $F2
  STA ($FF),Y
  STA ($8E),Y
  LDY $CB,X
  .byte $9B
  EOR $6392,Y
  .byte $92
  STA $92
  BIT $6993
  .byte $93
  ORA ($98),Y
  SBC $E398
  STX $F7,Y
  STX $EA,Y
  STA ($05),Y
  .byte $92
  EOR $6992,Y
  .byte $92, $7F, $92, $D3
  STA ($82),Y
  .byte $9B
  ASL A
  CLV
  .byte $17
  CLV
  LDA ($B8,X)
  ROL $D49E,X
  .byte $BB
  ADC $86BC
  LDY $E3,X
  .byte $9B
  INC $DA9C
  .byte $B7, $33, $B7
  SEC
  .byte $B7, $3B
  TSX
  EOR #$B7
  .byte $3F, $BB, $F2, $9B
  CMP $2D9C,X
  .byte $9E
  SED
  .byte $9B
  CPY $FEB4
  .byte $9B
  CPX #$B4
  BIT $54B7
  .byte $9F
  DEC $B4,X
  LSR $73B7
  .byte $B7
  BMI @E9BD
  STY $57B7
  .byte $9E, $04, $9C
  CPY $CDBB
  .byte $B7
  CPX $B7
  .byte $BF, $B7
  DEC $B7
  .byte $B3
  LDA $B47C,X
  LDA ($BD,X)
  ROL $BA9F,X
  .byte $9F
  ASL A
  .byte $9C, $54, $B7
  STA $BD,X
  TXS
  LDA $BDA6,X
  LDA $D5BD
  .byte $B7
  CLV
  LDA $BDBD,X
  ORA $019C,Y
  LDX $BE01,Y
  ORA ($BE,X)
  ORA ($BE,X)
  ORA ($BE,X)
  ORA ($BE,X)
  ORA ($BE,X)
  ORA ($BE,X)
  ORA ($BE,X)
  ORA $18BE
  LDX $BE20,Y
  ROL A
  LDX $BE32,Y
  NOP
  LDX $BE42,Y
  LSR A
  LDX $BE52,Y
  NOP
  LDX $BE69,Y
  .byte $73
  LDX $BE7C,Y
  STX $BE
  STX $96BE
  LDX $BE9E,Y
  LDX $BE
  LDX $B6BE
  LDX $BEBE,Y
  DEC $BE
  CLD
  LDX $BEF7,Y
  ORA $BF
  .byte $62
  TAX
  ORA $13BF
  .byte $BF, $23, $BF
  BIT $54BF
  .byte $BF
  ADC ($BF,X)
  .byte $73, $BF, $7F, $BF
  STY $BF,X
  .byte $9C, $BF, $D2, $BF, $1B
  BCS @EA86
  .byte $BF, $97
  LDA ($F3,X)
  .byte $34
  LDA $098A,Y
  .byte $8F
  ALR #$8C
  SBC $F301,X
  .byte $80, $02
  ORA $F3
  STA ($06,X)
  CPY $81F3
  .byte $07
  CMP $82F3
  PHP
  ORA $0D,X
  .byte $F3, $82
  CLC
  ASL $F324,X
  .byte $83
  PLP
  BMI @EB0E
  EOR #$5A
  .byte $F3, $83
  AND ($29,X)
  AND ($42),Y
  .byte $53, $F3, $83, $5C, $67, $72
  STX $9A
  .byte $F3, $83
  ASL $1E,X
  ROL $37
  PHA
  .byte $F3, $83
  LSR $6459
  SEI
  STY $83F3
  PHP
  BPL @EB11
  AND #$3A
  NOP
  .byte $8B, $9C
  NOP
  CPY #$9C
  .byte $F2
  TAX
  .byte $9E
  NOP
  .byte $8B, $9C
  NOP
  .byte $A3, $9C, $F2
  TAX
  .byte $9E
  NOP
@EB0E:
  .byte $8B, $9C
  NOP
@EB11:
  INC $FA9D,X
  PHP
  .byte $A3
  INC $FA,X
  .byte $73, $A3
  NOP
  .byte $64, $9E
  INC $F0,X
  NOP
  .byte $8B, $9C
  NOP
  INC $FA9D,X
  .byte $EF
  LDX #$FA
  NOP
  LDA ($F6,X)
  NOP
  .byte $64, $9E
  INC $F0,X
  NOP
  .byte $8B, $9C
  NOP
  INC $FA9D,X
  CMP $F2A2,X
  .byte $5B, $A3
  NOP
  ROL $A9,X
  NOP
  .byte $CF, $A3
  NOP
  CPY #$9C
  .byte $F2
  TAX
  .byte $9E
  NOP
  ROL $A9,X
  NOP
  .byte $CF, $A3
  NOP
  .byte $A3, $9C, $F2
  TAX
  .byte $9E
  NOP
  ROL $A9,X
  NOP
  .byte $CF, $A3
  NOP
  INC $FA9D,X
  PHP
  .byte $A3
  INC $FA,X
  .byte $73, $A3
  NOP
  .byte $64, $9E
  INC $F0,X
  NOP
  ROL $A9,X
  NOP
  .byte $CF, $A3
  NOP
  INC $FA9D,X
  PLP
  LDY $FA,X
  .byte $C3
  LDY #$F6
  NOP
  .byte $64, $9E
  INC $F0,X
  NOP
  ROL $A9,X
  NOP
  .byte $CF, $A3
  NOP
  INC $FA9D,X
  CMP $F2A2,X
  .byte $5B, $A3, $F3, $82
  PHP
  ORA $0D,X
  .byte $F3, $82
  CLC
  AND $1D
  .byte $F3, $83
  PLP
  .byte $37
  AND $34,X
  .byte $33, $F3, $83
  AND ($30,X)
  ROL $2C2D
  .byte $F3, $83, $3C
  EOR $7761
  STA $83F3
  .byte $13, $22
  JSR $1E1F
  .byte $F3, $83, $0C, $1B
  ORA $1718,Y
  .byte $F3, $83, $27
  SEC
  JMP $7862
  NOP
  .byte $8B, $9C
  NOP
  INC $FA9D,X
  CMP $FAA2,X
  TAX
@EBCD:
  .byte $9E
  NOP
  .byte $62, $9F
  BEQ @EBCD
  .byte $8B, $9C
  NOP
  INC $FA9D,X
  CMP $FAA2,X
  TAX
  .byte $9E
  NOP
  .byte $5C, $9F, $F2, $47
  LDX #$FA
  ROL $A9,X
  NOP
  .byte $CF, $A3
  NOP
  INC $FA9D,X
  CMP $FAA2,X
  TAX
  .byte $9E, $F2, $62, $9F
  NOP
  ROL $A9,X
  NOP
  .byte $CF, $A3
  NOP
  INC $FA9D,X
  `;
}

// $8C00-$8FFF (1024B): $8C00-$8FFF 代码/数据段4
function build_8C00_8FFF_seg4(): readonly number[] {
  return asm`
  CMP $FAA2,X
  TAX
  .byte $9E
  NOP
  .byte $5C, $9F, $F2, $47
  LDX #$FA
  ROL $A9,X
  NOP
  .byte $CF, $A3
  NOP
  INC $FA9D,X
  CMP $F6A2,X
  NOP
  .byte $64, $9E
  INC $FA,X
  ROR $F29F
  ADC ($A3),Y
  NOP
  ROL $A9,X
  NOP
  .byte $CF, $A3
  NOP
  INC $FA9D,X
  CMP $F6A2,X
  NOP
  .byte $64, $9E
  INC $FA,X
  .byte $74, $9F, $F2, $6F
  LDY #$FA
  ROL $A9,X
  NOP
  .byte $CF, $A3
  NOP
  INC $FA9D,X
  CMP $FAA2,X
  ROR $F29F
  .byte $5B, $A3
  SBC $F303,X
  BRK
  .byte $53
  STY $8DF3
  .byte $F3
  DEC $02
  .byte $B7, $F3, $82, $03, $43
  NOP
  .byte $F3, $83
  ORA ($1A),Y
  .byte $03
  PHP
  ASL $F3,X
  .byte $9B, $23
  AND ($21),Y
  JSR $9BF3 ; → bank switch?
  CMP $CB2B
  DEX
  NOP
  ADC $FA9C,Y
  .byte $47
@EC74:
  .byte $B3
  NOP
  ROR $A1,X
  BEQ @EC74
  ADC $FA9C,Y
  .byte $47, $B3
  NOP
  .byte $42
  LDY #$FA
  AND $A0
  .byte $F2, $17
  LDY #$FA
  ADC $FA9C,Y
  .byte $47, $B3
  NOP
  .byte $47
  LDY #$FA
  .byte $23
  LDY #$F2
  ADC ($A3),Y
  NOP
  .byte $47, $B3, $F2, $67, $8F, $F3, $83
  ORA $0E
  .byte $1C
  ROL A
  ASL A
  NOP
  ADC $FA9C,Y
  .byte $DC
@ECA9:
  .byte $B2
  NOP
  ROR $A1,X
  BEQ @ECA9
  ADC $FA9C,Y
  .byte $DC, $B2
  NOP
  .byte $42
  LDY #$FA
  AND $A0
  .byte $F2, $17
  LDY #$FA
  ADC $FA9C,Y
  .byte $DC, $B2
  NOP
  .byte $47
  LDY #$FA
  .byte $23
  LDY #$F2
  ADC ($A3),Y
  NOP
  ADC $FA9C,Y
  .byte $DC, $B2, $F2
  STA $A1
  .byte $F3, $83
  ORA $0E
  .byte $1C
  ROL A
  ASL A
  NOP
  ADC $FA9C,Y
  SED
@ECE1:
  STA $E5FA,X
  .byte $9F
  BEQ @ECE1
  ADC $FA9C,Y
  SED
  STA $0BFA,X
  LDY #$FA
  .byte $F3, $9F, $F2
  CPX #$9F
  NOP
  ADC $FA9C,Y
  SED
  STA $10FA,X
  LDY #$FA
  SBC ($9F),Y
  .byte $F2
  ADC ($A3),Y
  NOP
  ADC $FA9C,Y
  SED
  STA $6EF2,X
  LDA ($F3,X)
  .byte $82, $03
  ADC ($9B,X)
  .byte $F3, $83, $14
  BIT $0803
  .byte $1F, $F3, $9B
  SEC
  ORA #$36
  AND $F3,X
  .byte $9B, $44, $03, $42
  EOR ($F2,X)
  .byte $97
  STY $79FA
  .byte $9C
  NOP
  .byte $47, $B3
  NOP
  .byte $47
  LDY #$FA
  CMP $FAA2,X
  .byte $62, $9F
  BEQ @ED33
  ADC $FA9C,Y
  .byte $47, $B3, $F2
  LDA #$A1
  NOP
  ADC $FA9C,Y
  .byte $47, $B3
  NOP
  .byte $47
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  RTI
  LDX #$FA
  ADC $FA9C,Y
  .byte $47, $B3
  NOP
  .byte $47
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  ADC ($A3),Y
  NOP
  ADC $FA9C,Y
  .byte $47, $B3
  NOP
  CMP $F2A2,X
  LDA #$A1
  .byte $F3, $83
@ED73:
  ORA $14
  AND $11
  BPL @ED73
  ADC $FA9C,Y
  .byte $DC, $B2
  NOP
  .byte $47
  LDY #$FA
  CMP $FAA2,X
  .byte $62, $9F
  BEQ @ED83
  ADC $FA9C,Y
  .byte $DC, $B2
  NOP
  .byte $47
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  RTI
  LDX #$FA
  ADC $FA9C,Y
  .byte $DC, $B2
  NOP
  .byte $47
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  ADC ($A3),Y
  .byte $F3, $83
@EDAE:
  ORA $14
  AND $36
  BPL @EDAE
  ADC $FA9C,Y
  SED
  STA $10FA,X
  LDY #$FA
  CMP $FAA2,X
  .byte $62, $9F
  BEQ @EDBE
  ADC $FA9C,Y
  SED
  STA $10FA,X
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  RTI
  LDX #$FA
  ADC $FA9C,Y
  SED
  STA $10FA,X
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  ADC ($A3),Y
  NOP
  ADC $FA9C,Y
  SED
  STA $DDFA,X
  LDX #$F2
  ROR $F3A1
  DEC $02
  SEI
  .byte $F3, $82, $03
  PLP
  EOR $83F3
  ORA ($04),Y
  BPL @EE1D
  ORA $47FA
  .byte $B3
  NOP
  .byte $42
  LDY #$FA
  AND $A0
  NOP
  .byte $17
  LDY #$F0
  NOP
  .byte $47, $B3
  NOP
  .byte $47
  LDY #$FA
  .byte $23
  LDY #$F2
  ADC ($A3),Y
  NOP
@EE1D:
  .byte $47, $B3, $F2
  LDA #$A1
  .byte $F3, $83
  ORA ($04),Y
  BPL @EE43
  ORA $DCFA
  .byte $B2
  NOP
  .byte $42
  LDY #$FA
  AND $A0
  NOP
  .byte $17
  LDY #$F0
  NOP
  .byte $DC, $B2
  NOP
  .byte $47
  LDY #$FA
  .byte $23
  LDY #$F2
  ADC ($A3),Y
  NOP
@EE43:
  .byte $DC, $B2, $F2
  STA $A1
  .byte $F3, $83
  ORA ($04),Y
  BPL @EE69
  ORA $F8FA
  STA $0BFA,X
  LDY #$FA
  .byte $F3
@EE57:
  .byte $9F
  NOP
  CPX #$9F
  BEQ @EE57
  SED
  STA $10FA,X
  LDY #$FA
  SBC ($9F),Y
  .byte $F2
  ADC ($A3),Y
  NOP
@EE69:
  SED
  STA $6EF2,X
  LDA ($F3,X)
  .byte $82, $03, $34
  ADC $F3
  .byte $83
  ORA $11
  .byte $1F
  ASL $FA0D
  .byte $47, $B3
  NOP
  .byte $47
  LDY #$FA
  CMP $FAA2,X
  .byte $62, $9F
  BEQ @EE82
  .byte $47, $B3
  NOP
  .byte $47
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  RTI
  LDX #$FA
  .byte $47, $B3
  NOP
  .byte $47
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  ADC ($A3),Y
  .byte $F3, $83
  ORA $11
  .byte $1F
  ASL $FA0D
  .byte $DC, $B2
  NOP
  .byte $47
  LDY #$FA
  CMP $FAA2,X
  .byte $62, $9F
  BEQ @EEB4
  .byte $DC, $B2
  NOP
  .byte $47
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  RTI
  LDX #$FA
  .byte $DC, $B2
  NOP
  .byte $47
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  ADC ($A3),Y
  .byte $F3, $83
  ORA $11
  .byte $1F
  ASL $FA0D
  SED
  STA $10FA,X
  LDY #$FA
  CMP $FAA2,X
  .byte $62, $9F
  BEQ @EEE6
  SED
  STA $10FA,X
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  RTI
  LDX #$FA
  SED
  STA $10FA,X
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  ADC ($A3),Y
  SBC $F303,X
  BRK
  ORA ($8F),Y
  ROR $90,X
  .byte $F3
  DEC $02
  CPY $82F3
  .byte $03
  EOR $8F,X
  .byte $F3, $83, $17
  JSR $0B03
  .byte $1C, $F3, $9B
  AND #$40
  .byte $02
  ORA ($F2,X)
  DEY
  STY $9BF3
  .byte $2F, $37, $02
  ORA ($F2,X)
  SEC
  STA $7AFA
  .byte $9F
  NOP
  .byte $8F, $A3
  NOP
  .byte $1C
  LDY #$F0
  NOP
  NOP
  .byte $9F
  NOP
  .byte $8F, $A3
  NOP
  .byte $34
  LDY #$FA
  AND $A0
  .byte $F2
  ORA $A0,X
  NOP
  NOP
  .byte $9F
  NOP
  .byte $8F, $A3
  NOP
  .byte $3B
  LDY #$FA
  .byte $23
  LDY #$F2
  ADC ($A3),Y
  NOP
  NOP
  .byte $9F
  NOP
  .byte $8F, $A3, $F2, $9F
  LDA ($FA,X)
  NOP
  .byte $9F
  NOP
  ADC $B4
  .byte $F2
  ADC ($A3),Y
  .byte $F3, $83
  PHP
  ORA ($1F),Y
  AND $FA0D
  .byte $DC, $B2
  NOP
  CPX #$A6
  NOP
  .byte $8F, $A3
  NOP
  .byte $1C
  LDY #$F0
  NOP
  CPX #$A6
  NOP
  .byte $8F, $A3
  NOP
  .byte $34
  LDY #$FA
  AND $A0
  .byte $F2
  ORA $A0,X
  NOP
  CPX #$A6
  NOP
  .byte $8F, $A3
  NOP
  .byte $3B
  LDY #$FA
  .byte $23
  LDY #$F2
  ADC ($A3),Y
  NOP
  CPX #$A6
  NOP
  .byte $8F, $A3, $F2, $7B
  LDA ($F3,X)
  .byte $83
  ORA $0E
  .byte $1C
  ROL A
  ASL A
  NOP
  .byte $7F, $9C
  NOP
  .byte $8F
@EFB4:
  .byte $A3
  NOP
  NOP
  .byte $9F
  BEQ @EFB4
  .byte $7F, $9C
  NOP
  .byte $8F, $A3
  NOP
  SBC $FA9F,X
  .byte $F3, $9F, $F2
  DEC $FA9F,X
  .byte $7F, $9C
  NOP
  .byte $8F, $A3
  NOP
  .byte $04
  LDY #$FA
  SBC ($9F),Y
  .byte $F2
  ADC ($A3),Y
  NOP
  .byte $7F, $9C
  NOP
  .byte $8F, $A3, $F2, $64
  LDA ($F3,X)
  .byte $82, $03
  CLI
  STX $F3,Y
  .byte $83, $14, $23, $03
  PHP
  .byte $1F, $F3, $9B, $2F
  ORA #$2D
  BIT $9BF3
  .byte $3B, $03
  AND $F238,Y
  .byte $97
  STY $7AFA
  .byte $9F
  NOP
  .byte $8F
  `;
}

// $9000-$93FF (1024B): $9000-$93FF 代码/数据段5
function build_9000_93FF_seg5(): readonly number[] {
  return asm`
  .byte $A3
  NOP
  .byte $3B
  LDY #$FA
  CMP $FAA2,X
  .byte $62, $9F
  BEQ @E006
  NOP
  .byte $9F
  NOP
  .byte $8F, $A3
  NOP
  .byte $3B
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  RTI
  LDX #$FA
  NOP
  .byte $9F
  NOP
  .byte $8F, $A3
  NOP
  .byte $3B
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  ADC ($A3),Y
  NOP
  NOP
  .byte $9F
  NOP
  .byte $8F, $A3
  NOP
  CMP $F2A2,X
  .byte $9F
  LDA ($F3,X)
  .byte $83
@E03D:
  ORA $14
  AND $11
  BPL @E03D
  CPX #$A6
  NOP
  .byte $8F, $A3
  NOP
  .byte $3B
  LDY #$FA
  CMP $FAA2,X
  .byte $62, $9F
  BEQ @E04D
  CPX #$A6
  NOP
  .byte $8F, $A3
  NOP
  .byte $3B
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  RTI
  LDX #$FA
  CPX #$A6
  NOP
  .byte $8F, $A3
  NOP
  .byte $3B
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  ADC ($A3),Y
  .byte $F3
  DEC $49
  .byte $BF, $F3, $83
@E07C:
  ORA $14
  AND $36
  BPL @E07C
  .byte $7F, $9C
  NOP
  .byte $8F, $A3
  NOP
  .byte $04
  LDY #$FA
  CMP $FAA2,X
  .byte $62, $9F
  BEQ @E08C
  .byte $7F, $9C
  NOP
  .byte $8F, $A3
  NOP
  .byte $04
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  RTI
  LDX #$FA
  .byte $7F, $9C
  NOP
  .byte $8F, $A3
  NOP
  .byte $04
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  ADC ($A3),Y
  NOP
  .byte $7F, $9C
  NOP
  .byte $8F, $A3
  NOP
  CMP $F2A2,X
  .byte $64
  LDA ($F3,X)
  .byte $82, $03
  PLP
  EOR $83F3
  ORA ($04),Y
  BPL @E0E7
  ORA $9EFA
  .byte $A3
  NOP
  .byte $34
  LDY #$FA
  AND $A0
  NOP
  ORA $A0,X
  BEQ @E0D5
  .byte $9E, $A3
  NOP
  .byte $3B
  LDY #$FA
  .byte $23
  LDY #$F2
  ADC ($A3),Y
  NOP
@E0E7:
  .byte $9E, $A3, $F2, $9F
  LDA ($F3,X)
  .byte $83
  ORA ($04),Y
  BPL @E10D
  ORA $94FA
  .byte $A3
  NOP
  .byte $34
  LDY #$FA
  AND $A0
  NOP
  ORA $A0,X
  BEQ @E0FB
  STY $A3,X
  NOP
  .byte $3B
  LDY #$FA
  .byte $23
  LDY #$F2
  ADC ($A3),Y
  NOP
@E10D:
  STY $A3,X
  .byte $F2, $7B
  LDA ($F3,X)
  .byte $83
  ORA ($04),Y
  BPL @E133
  ORA $99FA
  .byte $A3
  NOP
  SBC $FA9F,X
  .byte $F3, $9F
  NOP
  DEC $F09F,X
  NOP
  STA $FAA3,Y
  .byte $04
  LDY #$FA
  SBC ($9F),Y
  .byte $F2
  ADC ($A3),Y
  NOP
@E133:
  STA $F2A3,Y
  .byte $64
  LDA ($F3,X)
  .byte $82, $03, $34
  ADC $F3
  .byte $83
  ORA $11
  .byte $1F
  ASL $FA0D
  .byte $9E, $A3
  NOP
  .byte $3B
  LDY #$FA
  CMP $FAA2,X
  .byte $62, $9F
  BEQ @E14C
  .byte $9E, $A3
  NOP
  .byte $3B
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  RTI
  LDX #$FA
  .byte $9E, $A3
  NOP
  .byte $3B
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  ADC ($A3),Y
  .byte $F3, $83
  ORA $11
  .byte $1F
  ASL $FA0D
  STY $A3,X
  NOP
  .byte $3B
  LDY #$FA
  CMP $FAA2,X
  .byte $62, $9F
  BEQ @E17E
  STY $A3,X
  NOP
  .byte $3B
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  RTI
  LDX #$FA
  STY $A3,X
  NOP
  .byte $3B
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  ADC ($A3),Y
  .byte $F3, $83
  ORA $11
  .byte $1F
  ASL $FA0D
  STA $FAA3,Y
  .byte $04
  LDY #$FA
  CMP $FAA2,X
  .byte $62, $9F
  BEQ @E1B0
  STA $FAA3,Y
  .byte $04
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  RTI
  LDX #$FA
  STA $FAA3,Y
  .byte $04
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  ADC ($A3),Y
  .byte $F3
  STY $0A
  ORA ($F3,X)
  ASL $50,X
  .byte $93
  NOP
  .byte $93, $DB, $9B, $F3
  ASL $3C,X
  .byte $93
  EOR ($93,X)
  .byte $DF, $9B, $F2
  RTI
  LDX #$FD
  ORA ($F3,X)
  .byte $04, $9B, $B2, $64
  LDX $01FD
  .byte $F3
  STY $02
  ORA $FA
  .byte $E2
  STA $F2F1,X
  .byte $3C
  STA $01FD,X
  .byte $F3
  STX $0C
  .byte $43
  SBC $F301,X
  .byte $43, $17, $92, $17
@E20C:
  .byte $92, $87
  LDA $35F3,X
  .byte $17, $92, $17, $92, $87
  LDA $84F3,X
  .byte $02, $17, $F3
  STA $05
  .byte $07
  ORA #$0B
  ORA $85F2
  .byte $9C, $F2
  STA ($9C),Y
  .byte $F2
  STA $F29C,X
  .byte $97, $9C, $F2
  STA ($9C),Y
  .byte $F3
  STA $05
  .byte $07
  ORA #$0B
  ORA $61F2
  .byte $9C, $F2
  ADC $F29C
  .byte $73, $9C, $F2, $67, $9C, $F2
  ADC $FD9C
  .byte $03, $F3, $44, $4F, $92
  BCC @E20C
  .byte $F3
  STY $02
  .byte $04, $F2, $AB, $A3, $F2, $A3, $A3
  SBC $F301,X
  STA ($05,X)
  ORA ($FA,X)
  ROR $F09F
  SBC $F301,X
  STX $02
  ORA $01FD
  .byte $F3
  STA ($07,X)
  ORA ($FD,X)
  ORA ($FA,X)
  .byte $62, $9F
  BEQ @E269
  STA ($07,X)
  ORA ($FD,X)
  ORA ($FA,X)
  LDA $9F,X
  BEQ @E27D
  .byte $03, $F3
  STY $08
  .byte $0F
  SBC $F303,X
  STY $06
  ORA $81F3
  ASL $F317
  STA ($4A,X)
  BVC @E287
  STA ($1A,X)
  .byte $23, $F3
  STA ($50,X)
  LSR $F3,X
  .byte $14
  DEC $CE9B
  .byte $9B
  ANC #$93
  .byte $C3, $92, $F3, $14
  DEC $CE9B
  .byte $9B
  ANC #$93
  CMP #$92
  .byte $F3, $14
  DEC $CE9B
  .byte $9B
  ANC #$93
  .byte $CF, $92, $F3, $14
  DEC $CE9B
  .byte $9B
  ANC #$93
  CMP $92,X
  .byte $F3
  ORA $1F,X
  .byte $93
  CMP $9B,X
  .byte $F3
  ORA $1F,X
  .byte $93
  CMP $9B,X
  .byte $F3
  ORA $0F,X
  .byte $93, $CF, $9B, $F3
  ORA $0F,X
  .byte $93, $CF, $9B, $F3, $87
  AND ($30),Y
  BIT $3717
  .byte $F3, $87
  ROL A
  AND #$25
  ORA $30,X
  .byte $F3, $87, $23, $22
  ASL $2913,X
  .byte $F3, $87, $1C, $1B, $17
  ORA ($22),Y
  .byte $F3
  DEY
  ROL $28
  ROL A
  .byte $F3
  DEY
  ORA ($29),Y
  ORA $F3,X
@E302:
  DEY
  .byte $0C
  ASL $F310
  DEY
  .byte $07, $12
@E30A:
  ANC #$FA
  ADC ($A3),Y
  BEQ @E302
  ROR $F2A1
  .byte $97
  LDA ($F2,X)
  .byte $83
  LDY #$F2
  .byte $5B, $A3
  NOP
  .byte $97
  LDA ($F0,X)
  .byte $F2, $64
  LDA ($F2,X)
  STA $F2A1
  ADC $FAA0,Y
  STA $F0A1
  .byte $F3
  STY $02
  .byte $07, $F3, $89, $14
  ORA #$0D
  ASL $F3,X
  .byte $89, $27, $17, $1B
  AND #$FD
  BRK
  .byte $F2
  EOR $9E
  SBC $F203,X
  .byte $C2, $B2
  SBC $F203,X
  TXS
  STA $03FD,X
  .byte $F2, $42
@E34F:
  LDY $FD,X
  BRK
  .byte $F2, $4F, $9E
  SBC $F203,X
  CPY $FDB2
  .byte $03, $F2, $D4, $B2
  SBC $F203,X
  .byte $52
  STA $03FD,X
  .byte $F2
  AND $FDB4,X
  .byte $03
  NOP
  INC $9E,X
  .byte $F3
  ASL A
  AND #$95
  ROR $93,X
  BVS @E30A
  NOP
  .byte $9C, $9F, $F3
  EOR $7F
  .byte $93
  PLP
  STY $F3,X
  .byte $8B
  PHP
  .byte $03
  AND ($6D),Y
  .byte $F3
  STY $2602
  .byte $F3
  STA $0A05
  .byte $0F, $14
  ORA $0EFA,Y
  LDA ($F2,X)
  ORA $FA97
  ASL $F2A1
  ASL $97,X
  NOP
  ASL $F2A1
  .byte $22, $97
  NOP
  ASL $F2A1
  AND ($97),Y
  NOP
  ASL $F2A1
  .byte $43, $97
  NOP
  ASL $F2A1
  EOR $97,X
  .byte $FF
  ORA ($BE,X)
  .byte $93
  CPY $93
  BNE @E34F
  .byte $DF, $93
  NOP
  ALR #$A1
  .byte $F2, $72
  STA $FA,X
  ALR #$A1
  NOP
  PHP
  .byte $A3
  NOP
  ADC ($A3),Y
  .byte $F2, $22
  CLV
  NOP
  ROL $FAB8
  ALR #$A1
  NOP
  PHP
  .byte $A3
  NOP
  ADC ($A3),Y
  .byte $F2
  NOP
  CLV
  NOP
  ROL $FAB8
  ALR #$A1
  NOP
  PHP
  .byte $A3
  NOP
  PHA
  CLV
  NOP
  ADC ($A3),Y
  .byte $F2
  EOR $FFB8,Y
  ORA ($FB,X)
  .byte $93, $04
  STY $0D,X
  STY $19,X
  STY $FA,X
  AND ($A1),Y
  NOP
  ROR A
  `;
}

// $9400-$97FF (1024B): $9400-$97FF 代码/数据段6
function build_9400_97FF_seg6(): readonly number[] {
  return asm`
  .byte $A3, $F2
  .byte $F0, $9E  ; BEQ $93A2
  NOP
  .byte $22
  CLV
  NOP
  AND ($A1),Y
  .byte $F2
  ROR A
  .byte $A3
  NOP
  ROL $FAB8
  AND ($A1),Y
  NOP
  ROR A
  .byte $A3, $F2
  NOP
  CLV
  NOP
  ROL $FAB8
  AND ($A1),Y
  NOP
  PHA
  CLV
  NOP
  ROR A
  .byte $A3, $F2
  EOR $F3B8,Y
  .byte $8B
  ANC #$06
  .byte $34
  ORA ($F2,X)
  SBC ($93),Y
  .byte $F3
  STY $2602
  .byte $F3
  STA $0A05
  .byte $0F, $14
  ORA $22FA,Y
  LDA ($F2,X)
  TXA
  .byte $97
  NOP
  .byte $22
  LDA ($F2,X)
  STA $FA97,Y
  .byte $22
  LDA ($F2,X)
  .byte $AB, $97
  NOP
  .byte $22
  LDA ($F2,X)
  .byte $C3, $97
  NOP
  .byte $22
  LDA ($F2,X)
  .byte $DB, $97
  NOP
  .byte $22
  LDA ($F2,X)
  .byte $F3, $97, $FF
  ORA ($6A,X)
  STY $C4,X
  .byte $93
  .byte $D0, $93  ; BNE $93FB
  .byte $DF, $93
  NOP
  .byte $22
  LDA ($F2,X)
  LDY $F395,X
  STA ($02,X)
  EOR $8BF3,X
  PHP
  .byte $03, $43
  LSR $8CF3
  .byte $02
  AND $F3,X
  STA $0D05
  ORA $1D,X
  AND $FA
  .byte $5B, $9C
  NOP
  CMP $F2A1,X
  ORA $FA97
  .byte $5B, $9C
  NOP
  CMP $F2A1,X
  ASL $97,X
  NOP
  .byte $5B, $9C
  NOP
  CMP $F2A1,X
  .byte $22, $97
  NOP
  .byte $5B, $9C
  NOP
  CMP $F2A1,X
  AND ($97),Y
  NOP
  .byte $5B, $9C
  NOP
  CMP $F2A1,X
  .byte $43, $97
  NOP
  .byte $5B, $9C
  NOP
  CMP $F2A1,X
  EOR $97,X
  NOP
  .byte $5B, $9C
  NOP
  DEX
  LDA ($FA,X)
  PHP
  .byte $A3, $F2
  ADC ($A3),Y
  NOP
  .byte $5B, $9C
  NOP
  CMP ($A1),Y
  .byte $F2
  LSR $F3B4
  .byte $8B
  ANC #$06
  LSR $01
  .byte $F2, $C7
  STY $F3,X
  STY $3502
  .byte $F3
  STA $0D05
  ORA $1D,X
  AND $FA
  .byte $5B, $9C
  NOP
  DEX
  LDA ($F2,X)
  TXA
  .byte $97
  NOP
  .byte $5B, $9C
  NOP
  DEX
  LDA ($F2,X)
  STA $FA97,Y
  .byte $5B, $9C
  NOP
  DEX
  LDA ($F2,X)
  .byte $AB, $97
  NOP
  .byte $5B, $9C
  NOP
  DEX
  LDA ($F2,X)
  .byte $C3, $97
  NOP
  .byte $5B, $9C
  NOP
  DEX
  LDA ($F2,X)
  .byte $DB, $97
  NOP
  .byte $5B, $9C
  NOP
  DEX
  LDA ($F2,X)
@E518:
  .byte $F3
@E519:
  .byte $97
  NOP
  .byte $5B, $9C
  NOP
  DEX
  LDA ($FA,X)
  CMP $FAA2,X
  LDA $9F,X
  .byte $F2
  ADC ($A3),Y
  .byte $F3
  ROL $33,X
  STA $C8,X
  STA $4B,X
  STX $CE,Y
  STX $FA,Y
  .byte $9C, $9F, $F3
  STA ($02,X)
  PHA
  .byte $F3, $8B
  PHP
  .byte $03
  AND ($3C),Y
  .byte $F3
  STY $2602
  .byte $F3
  STA $0A05
  .byte $0F, $14
  ORA $94FA,Y
  LDY #$F2
  ORA $FA97
  STY $A0,X
  .byte $F2
  ASL $97,X
  NOP
  STY $A0,X
  .byte $F2, $22, $97
  NOP
  STY $A0,X
  .byte $F2
  AND ($97),Y
  NOP
  STY $A0,X
@E566:
  .byte $F2, $43, $97
  NOP
  STY $A0,X
  .byte $F2
  EOR $97,X
  NOP
  LDA ($A0,X)
  NOP
  PHP
  .byte $A3
  NOP
  EOR $F2B4,X
  BEQ @E519
  NOP
  LDX $A0
  .byte $F2
  BVS @E518
  .byte $F3, $8B
  ANC #$06
  .byte $34
  ORA ($F2,X)
  .byte $7B
  STA $F3,X
  STY $2602
  .byte $F3
  STA $0A05
  .byte $0F, $14
  ORA $A1FA,Y
  LDY #$F2
  TXA
  .byte $97
  NOP
  LDA ($A0,X)
  .byte $F2
  STA $FA97,Y
  LDA ($A0,X)
  .byte $F2, $AB, $97
  NOP
  LDA ($A0,X)
  .byte $F2, $C3, $97
  NOP
  LDA ($A0,X)
  .byte $F2, $DB, $97
  NOP
  LDA ($A0,X)
  .byte $F2, $F3, $97
  NOP
  LDA ($A0,X)
  NOP
  CMP $FAA2,X
  LDA $9F,X
  NOP
  ADC ($A3),Y
  .byte $F2
  BEQ @E566
  .byte $F3
  STA ($02,X)
  .byte $42, $F3, $8B
  PHP
  .byte $03
  AND ($36),Y
  .byte $F3
  STY $2602
  .byte $F3
  STA $0A05
  .byte $0F, $14
@E5DC:
  ORA $CDFA,Y
  LDY #$F2
  ASL A
  .byte $97
  NOP
  CMP $F2A0
  .byte $13, $97
  NOP
  CMP $F2A0
  .byte $1F, $97
  NOP
  CMP $F2A0
  ROL $FA97
  CMP $F2A0
  RTI
  .byte $97
  NOP
  CMP $F2A0
  .byte $52, $97
  NOP
  CMP $F2A0
  LSR $FA97,X
  CMP $F2A0
  ADC $F397
  .byte $8B
  ANC #$06
  .byte $34
  ORA ($F2,X)
  .byte $07
  STX $F3,Y
  STY $2602
  .byte $F3
  STA $0A05
  .byte $0F, $14
  ORA $CDFA,Y
  LDY #$F2
  .byte $87, $97
  NOP
  CMP $F2A0
  STX $97,Y
  NOP
  CMP $F2A0
  TAY
  .byte $97
  NOP
  CMP $F2A0
  CPY #$97
  NOP
  CMP $F2A0
  CLD
  .byte $97
  NOP
  CMP $F2A0
  BEQ @E5DC
  NOP
  CMP $F2A0
  .byte $02
  TYA
  .byte $F3
  STA ($02,X)
  .byte $42, $F3, $8B
  PHP
  .byte $03
  AND ($36),Y
  .byte $F3
  STY $2602
  .byte $F3
  STA $0A05
  .byte $0F, $14
@E65F:
  ORA $FFFA,Y
  LDA ($F2,X)
  ASL A
  .byte $97
  NOP
  .byte $FF
  LDA ($F2,X)
  .byte $13, $97
  NOP
  .byte $FF
  LDA ($F2,X)
  .byte $1F, $97
  NOP
  .byte $FF
  LDA ($F2,X)
  ROL $FA97
  .byte $FF
  LDA ($F2,X)
  RTI
  .byte $97
  NOP
  .byte $FF
  LDA ($F2,X)
  .byte $52, $97
  NOP
  .byte $FF
  LDA ($F2,X)
  LSR $FA97,X
  .byte $FF
  LDA ($F2,X)
  ADC $F397
  .byte $8B
  ANC #$06
  .byte $34
  ORA ($F2,X)
  TXA
  STX $F3,Y
  STY $2602
  .byte $F3
  STA $0A05
  .byte $0F, $14
  ORA $FFFA,Y
  LDA ($F2,X)
  .byte $87, $97
  NOP
  .byte $FF
  LDA ($F2,X)
  STX $97,Y
  NOP
  .byte $FF
  LDA ($F2,X)
  TAY
  .byte $97
  NOP
  .byte $FF
  LDA ($F2,X)
  CPY #$97
  NOP
  .byte $FF
  LDA ($F2,X)
  CLD
  .byte $97
  NOP
  .byte $FF
  LDA ($F2,X)
  BEQ @E65F
  NOP
  .byte $FF
  LDA ($F2,X)
  .byte $02
  TYA
  .byte $F3
  STA ($02,X)
  SEI
  .byte $F3, $8B
  PHP
  .byte $03
  STA $93
  .byte $F3
  STY $7402
  .byte $F3
  STA $3129
  .byte $3C
  LSR A
  .byte $5B
  SBC $FA03,X
  INC $9E,X
  .byte $F3, $92
  ASL $01
  .byte $F3
  STY $6602
  .byte $F3
  STA $231B
  ROL $4D3C
  NOP
  AND ($AB),Y
  SBC $FA03,X
  .byte $E7
  LDY $F3,X
  .byte $93, $03
  EOR ($1F,X)
  .byte $F2
  PLP
  .byte $9C
  NOP
@E708:
  CPX $A1
  NOP
  ORA #$A1
  .byte $F2
  PLP
  .byte $9C
  NOP
  CPX $A1
  NOP
@E714:
  ORA #$A1
  NOP
  LSR $F2A2
  CLI
  LDX #$FA
  CPX $A1
  NOP
  ORA #$A1
  NOP
  LDX $A0,Y
  NOP
  .byte $12, $A3, $F2
  ADC ($A3),Y
  NOP
  CPX $A1
  NOP
  ORA #$A1
  NOP
  LSR $FAA2
  CLI
  LDX #$FA
  .byte $12
  LDX #$F2
  PLP
  .byte $9C
  NOP
  CPX $A1
  NOP
  ORA #$A1
  NOP
  LDX $F2A0,Y
  PLP
  .byte $9C, $F3, $8B, $32
  AND $28B2
  NOP
  CPX $A1
  NOP
  ORA #$A1
  NOP
  .byte $F4
  LDX #$F2
  .byte $64, $A3
  NOP
  CPX $A1
  NOP
  LSR $A1
  NOP
  PHP
  .byte $A3
  NOP
  ADC ($A3),Y
  .byte $F2
  BEQ @E708
  NOP
  CPX $A1
  NOP
  STA $FAA0,Y
  LSR $F2B4
  BEQ @E714
  .byte $F2
  ROR A
  .byte $97, $F3
  STY $7102
  .byte $F3
  STA $1305
  BIT $3B
  .byte $52
  NOP
  CPX $A1
  NOP
  ORA $FAA1,X
  CMP $FAA2,X
  LDA $9F,X
  .byte $F2
  PLP
  .byte $9C
  NOP
  CPX $A1
  NOP
  ORA $FAA1,X
  CMP $FAA2,X
  LDA $9F,X
  NOP
  LSR $F2A2
  CLI
  LDX #$FA
  CPX $A1
  NOP
  ORA $FAA1,X
  CMP $FAA2,X
  LDA $9F,X
  NOP
  LDX $A0,Y
  NOP
  .byte $E7
  LDX #$FA
  .byte $1B, $9E, $F2
  ADC ($A3),Y
  NOP
  CPX $A1
  NOP
  ORA $FAA1,X
  CMP $FAA2,X
  LDA $9F,X
  NOP
  LSR $FAA2
  CLI
  LDX #$FA
  .byte $12
  LDX #$F2
  PLP
  .byte $9C
  NOP
  CPX $A1
  NOP
  ORA $FAA1,X
  CMP $FAA2,X
  LDA $9F,X
  NOP
  LDX $A0,Y
  NOP
  .byte $E7
  LDX #$FA
  .byte $1B, $9E, $F2
  PLP
  .byte $9C
  NOP
  CPX $A1
  NOP
  ORA $FAA1,X
  CMP $FAA2,X
  LDA $9F,X
  NOP
  .byte $F4
  LDX #$F2
  .byte $64, $A3
  NOP
  `;
}

// $9800-$9BFF (1024B): $9800-$9BFF 代码/数据段7
function build_9800_9BFF_seg7(): readonly number[] {
  return asm`
  CPX $A1
  NOP
  ORA $FAA1,X
  CMP $FAA2,X
  LDA $9F,X
  NOP
  ADC ($A3),Y
  .byte $F2
  .byte $F0, $9E  ; BEQ $97AF
  .byte $F3
  STX $2103
  PHP
  NOP
  DEC $9F,X
  .byte $F3
  STA ($0B,X)
  .byte $44
  NOP
  DEC $9F,X
  SBC $F303,X
  STA ($70,X)
  STY $F3,X
  .byte $8F
  ORA $0D
  NOP
  .byte $27
  ROL $F3FA
  .byte $9C
  SBC $FA03,X
  STA $F0A0
  NOP
  .byte $F3, $9C
  SBC $FA03,X
  LDA ($A0,X)
  NOP
  PHP
  .byte $A3, $F2
  EOR $FAB4,X
  .byte $F3, $9C
  SBC $FA03,X
  ALR #$A1
  NOP
  PHP
  .byte $A3, $F2
  EOR $FAB4,X
  .byte $F3, $9C
  SBC $F203,X
  LDX $A0
  NOP
  CMP $F2A2,X
  .byte $5B, $A3, $F3, $8F
  ORA $12
  ORA ($1B),Y
  AND $FA
  .byte $F3, $9C
  SBC $FA03,X
  LDA ($A0,X)
  NOP
  CMP $F2A2,X
  LDA $9F,X
  NOP
  CMP $FDA2,X
  .byte $03
  NOP
  ROR $F29F
  ADC ($A3),Y
  NOP
  CMP $FDA2,X
  .byte $03
  NOP
  PLA
  .byte $9F, $F2, $BF, $9F
  NOP
  CMP $FAA2,X
  ROR $F29F
  .byte $5B, $A3, $F3, $8F
  ORA $07
  ASL $0E
  ASL $F2,X
  CPY #$9C
  NOP
  INC $FA9D,X
  PHP
  .byte $A3, $F2
  ADC ($A3),Y
  NOP
  INC $FA9D,X
  .byte $EF
  LDX #$F2
  DEC $FA9F
  INC $FA9D,X
  CMP $F2A2,X
  .byte $5B, $A3, $F3, $8F
  ORA $0D
  .byte $0C, $17, $22
  NOP
  INC $FA9D,X
  CMP $F2A2,X
  LDA $9F,X
  NOP
  INC $FA9D,X
  CMP $FAA2,X
  ROR $F29F
  ADC ($A3),Y
  NOP
  INC $FA9D,X
  CMP $FAA2,X
  PLA
  .byte $9F, $F2, $BF, $9F
  NOP
  INC $FA9D,X
  CMP $FAA2,X
  ROR $F29F
  .byte $5B, $A3, $F3, $04, $F3
  TYA
  BIT $9A
  .byte $F3
  BCC @E8FB
  AND $B874,X
  .byte $EF
  SBC $F300,X
  STA ($04),Y
  ORA $291B
  NOP
  AND $A3,X
  NOP
  .byte $C3
@E907:
  LDA ($F2,X)
  NOP
  .byte $9F
  BEQ @E907
  AND $A3,X
  NOP
  .byte $C3
  LDA ($FA,X)
  SBC $FA9F,X
  .byte $F3, $9F, $F2
  DEC $FA9F,X
  AND $A3,X
  NOP
  .byte $C3
  LDA ($FA,X)
  .byte $04
  LDY #$FA
  SBC ($9F),Y
  .byte $F2
  ADC ($A3),Y
  NOP
  AND $A3,X
  NOP
  .byte $C3
  LDA ($F2,X)
  .byte $64
  LDA ($FD,X)
  .byte $03, $F3
  STA ($04),Y
  .byte $0C
  NOP
  PLP
  NOP
  AND $FAA3
  .byte $C3
  LDA ($F2,X)
  NOP
  .byte $9F
  NOP
  AND $FAA3
  .byte $C3
  LDA ($FA,X)
  SBC $FA9F,X
  .byte $F3, $9F, $F2
  DEC $FA9F,X
  AND $FAA3
  .byte $C3
  LDA ($FA,X)
  .byte $04
  LDY #$FA
  SBC ($9F),Y
  .byte $F2
  ADC ($A3),Y
  NOP
  AND $FAA3
  .byte $C3
  LDA ($F2,X)
  .byte $64
  LDA ($FD,X)
  .byte $03, $F3
  STA ($04),Y
  .byte $13
  BIT $35
  NOP
  AND $FAA3
  .byte $C3
  LDA ($FA,X)
  .byte $04
  LDY #$FA
  CMP $FAA2,X
  .byte $62, $9F
  BEQ @E97E
  AND $FAA3
  .byte $C3
  LDA ($FA,X)
  .byte $04
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  RTI
  LDX #$FA
  AND $FAA3
  .byte $C3
  LDA ($FA,X)
  .byte $04
  LDY #$FA
  .byte $E7
  LDX #$FA
  .byte $5C, $9F, $F2
  ADC ($A3),Y
  NOP
  AND $FAA3
  .byte $C3
  LDA ($F2,X)
  .byte $64
  LDA ($FD,X)
  BRK
  .byte $F3
  STA ($04),Y
  .byte $0C
  NOP
  PLP
  NOP
  EOR #$B4
  NOP
  .byte $C3
  LDA ($F2,X)
  NOP
  .byte $9F
  NOP
  EOR #$B4
  NOP
  .byte $C3
  LDA ($FA,X)
  SBC $FA9F,X
  .byte $F3, $9F, $F2
  DEC $FA9F,X
  EOR #$B4
  NOP
  .byte $C3
  LDA ($FA,X)
  .byte $04
  LDY #$FA
  SBC ($9F),Y
  .byte $F2
  ADC ($A3),Y
  NOP
  EOR #$B4
  NOP
  .byte $C3
  LDA ($F2,X)
  .byte $64
  LDA ($FD,X)
  BRK
  .byte $F3
  STA ($04),Y
  .byte $13
  BIT $10
  NOP
  EOR #$B4
  NOP
  .byte $C3
  LDA ($FA,X)
  .byte $04
  LDY #$FA
  .byte $E7
@E9FB:
  LDX #$FA
  .byte $62, $9F
  BEQ @E9FB
  EOR #$B4
  NOP
  .byte $C3
  LDA ($FA,X)
  .byte $04
  LDY #$FA
  .byte $E7
  LDX #$FA
  .byte $5C, $9F, $F2
  RTI
  LDX #$FA
  EOR #$B4
  NOP
  .byte $C3
  LDA ($FA,X)
  .byte $04
  LDY #$FA
  .byte $E7
  LDX #$FA
  .byte $5C
@EA20:
  .byte $9F, $F2
  ADC ($A3),Y
  .byte $F3
  BCC @EA2C
  EOR #$50
  BNE @EA20
  SBC $F300,X
  STA ($04),Y
  BPL @EA53
  .byte $32
  NOP
  AND $A3,X
  NOP
  LDX $FAA0
  CLD
@EA3B:
  LDX #$F2
  ROR $A1,X
  BEQ @EA3B
  AND $A3,X
  NOP
  LDX $FAA0
  CLD
  LDX #$FA
  .byte $2F
  LDY #$FA
  EOR ($A0),Y
  .byte $F2
  JMP $FAA0
@EA53:
  AND $A3,X
  NOP
  LDX $FAA0
  CLD
  LDX #$FA
  .byte $47
  LDY #$FA
  .byte $23
  LDY #$F2
  ADC ($A3),Y
  NOP
  AND $A3,X
  NOP
  LDX $FAA0
  CLD
  LDX #$F2
  STA $A1
  SBC $F303,X
  STA ($0C),Y
  .byte $17
  PLP
  AND $03FD,Y
  .byte $F3
  STA ($40),Y
  .byte $52
  ROR $31
  NOP
  AND $FAA3
  LDX $FAA0
  CLD
  LDX #$F2
  ROR $A1,X
  NOP
  AND $FAA3
  LDX $FAA0
  CLD
  LDX #$FA
  .byte $2F
  LDY #$FA
  EOR ($A0),Y
  .byte $F2
  JMP $FAA0
  AND $FAA3
  LDX $FAA0
  CLD
  LDX #$FA
  .byte $47
  LDY #$FA
  .byte $23
  LDY #$F2
  ADC ($A3),Y
  NOP
  AND $FAA3
  LDX $FAA0
  CLD
  LDX #$F2
  STA $A1
  NOP
  AND $FAA3
  LDX $FAA0
  CLD
  LDX #$FA
  .byte $47
  LDY #$FA
  CMP $FAA2,X
  .byte $62, $9F
  BEQ @EACA
  AND $FAA3
  LDX $FAA0
  CLD
  LDX #$FA
  .byte $47
  LDY #$FA
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  RTI
  LDX #$FA
  AND $FAA3
  LDX $FAA0
  CLD
  LDX #$FA
  .byte $47
  LDY #$FA
  .byte $E7
  LDX #$FA
  .byte $5C, $9F, $F2
  ADC ($A3),Y
  SBC $F300,X
  STA ($04),Y
  .byte $0F
  PLP
  AND $49FA,Y
  LDY $FA,X
  LDX $FAA0
  CLD
  LDX #$F2
  ROR $A1,X
  NOP
  EOR #$B4
  NOP
  LDX $FAA0
  CLD
  LDX #$FA
  .byte $2F
  LDY #$FA
  EOR ($A0),Y
  .byte $F2
  JMP $FDA0
  BRK
  .byte $F3
  STA ($22),Y
  .byte $34
  PHA
  AND ($FA),Y
  EOR #$B4
  NOP
  LDX $FAA0
  CLD
  LDX #$FA
  .byte $47
  LDY #$FA
  .byte $23
  LDY #$F2
  ADC ($A3),Y
  NOP
  EOR #$B4
  NOP
  LDX $FAA0
  CLD
  LDX #$F2
  STA $A1
  NOP
  EOR #$B4
  NOP
  LDX $FAA0
  CLD
  LDX #$FA
  .byte $47
  LDY #$FA
  .byte $E7
@EB53:
  LDX #$FA
  .byte $62, $9F
  BEQ @EB53
  EOR #$B4
  NOP
  LDX $FAA0
  CLD
  LDX #$FA
  .byte $47
  LDY #$FA
  .byte $E7
  LDX #$FA
  .byte $5C, $9F, $F2
  RTI
  LDX #$FA
  EOR #$B4
  NOP
  LDX $FAA0
  CLD
  LDX #$FA
  .byte $47
  LDY #$FA
  .byte $E7
  LDX #$FA
  .byte $5C, $9F, $F2
  ADC ($A3),Y
  SBC $F303,X
  STA ($02,X)
  PLP
  .byte $F3, $97, $04
  ORA #$11
  ORA $2DFA,Y
  .byte $A3, $F2, $83, $A3
  NOP
  AND $FAA3
  AND ($A3,X)
  .byte $F2
  ROR $FAA3,X
  AND $FAA3
  PHP
  .byte $A3, $F2
  ADC ($A3),Y
  NOP
  AND $FAA3
  .byte $EF
  LDX #$F2
  ORA $F3A3,Y
  .byte $97, $04
  ORA $0A18
  NOP
  AND $FAA3
  CMP $FAA2,X
  .byte $62, $9F
  BEQ @EBBA
  AND $FAA3
  CMP $FAA2,X
  .byte $5C, $9F, $F2
  RTI
  LDX #$FA
  INC $F0A2,X
  NOP
  .byte $BB
  LDA ($F2,X)
  DEY
  .byte $A3
  NOP
  LDA ($A1),Y
  .byte $F2
  DEY
  .byte $A3
  INC $F2,X
  SEC
  LDX #$F6
  .byte $F2
  ROL $FDA2
  BRK
  NOP
  ROL $F39F,X
  STY $02
  .byte $04, $F2, $9E
  LDY $F2,X
  LDX $B4,Y
  NOP
  .byte $BF
  LDY $F2,X
  .byte $C7
  LDY $FA,X
  .byte $BF
  LDY $F2,X
  .byte $12
  TSX
  NOP
  .byte $BF
  `;
}

// $9C00-$9FFF (1024B): $9C00-$9FFF 代码/数据段8
function build_9C00_9FFF_seg8(): readonly number[] {
  return asm`
  LDY $F2,X
  .byte $17
  TSX
  NOP
  LDX $B7
  .byte $F2, $AF, $B7
  SBC $FA00,X
  ROL $F39F,X
  STY $05
  ORA ($F2,X)
  LDX $F2B4
  LDX $B4
  NOP
  ROL $9C,X
  NOP
  .byte $23, $9C
  NOP
  .byte $30, $B7  ; BMI $9BD9
  SEI
  ORA ($F0,X)
  BEQ @EC27
@EC27:
  .byte $FB, $F7, $03, $F3
  AND ($5D,X)
  LDX #$67
  LDX #$F3
  .byte $22, $3F, $9C
  ROL $9C,X
  SBC $4202,Y
  .byte $F3
  AND ($B5,X)
  LDX #$BC
  LDX #$F5
  .byte $F7, $13
  SBC $4102,Y
  .byte $F3
  AND ($4B,X)
  .byte $9C, $53
@EC4A:
  .byte $9C, $F3, $23, $A7
  LDX #$AE
  LDX #$71
  LDX #$F3
  .byte $23, $C3
  LDX #$CA
  LDX #$D1
  LDX #$F3
  ROL $A34D
  NOP
  .byte $A3, $F3, $37
  BPL @EC18
  INC $F3B2,X
  .byte $37, $B3, $A3
  INC $F3B2,X
  .byte $37
  LDA $FEA3,X
  .byte $B2, $F3, $37
  CMP $A3
  INC $F3B2,X
  .byte $37
  LDA $A6,X
  .byte $BB
  LDX $F3
  .byte $37, $0C, $A7
  LDY $F3A6,X
  .byte $37
  DEC $CEA7
  LDX $F3
  .byte $37, $FF
  LDX $E4
  LDX $F3
  .byte $37
  CMP $A7,X
  DEC $F3A6
  .byte $37
  DEC $CEA7,X
  LDX $F3
  .byte $37, $E7, $A7
  DEC $FAA6
  STA $A4,X
  .byte $F3, $1F
  INC $EEA7
  .byte $A7
  BCS @EC4A
  INC $F3A7
@ECB1:
  .byte $1C
  INC $05A7
  TAY
  JSR $58A8
  TAY
  STA $C1A8,Y
  TAY
  ORA ($A9),Y
  NOP
  STA $A4,X
  .byte $F3, $1F, $4F
  TAX
  .byte $4F
  TAX
  CMP $4F9C
  TAX
  .byte $F3, $1C, $4F
  TAX
  .byte $62
  TAX
  ADC $B7AA
  TAX
  AXS #$AA
  .byte $E3
  TAX
  .byte $FF
  TAX
  NOP
  .byte $23, $9C, $F3
  STY $1002
  SBC $F903,X
  .byte $02, $12
  BMI @ED2D
  .byte $82, $63
  BEQ @ECE2
  LDY $03,X
  LDA #$60
  SBC $F3,X
  ORA $AB31,X
  AND ($AB),Y
  AND ($AB),Y
  JMP $31AB
  .byte $AB
  CPY $31AB
  .byte $AB
  BEQ @ECB1
  AND ($AB),Y
  AND ($AB),Y
  AND ($AB),Y
  .byte $23
  LDY $AC4D
  ROR $31AC
  .byte $AB
  AND ($AB),Y
  AND ($AB),Y
  LDA $0CAC,Y
  LDA $AD1D
  JMP $5EAD
@ED21:
  LDA $AD81
  .byte $AB
  LDA $ADCA
  .byte $DC
  LDA $ADF9
  .byte $0F
@ED2D:
  LDX $AB31
  AND ($AB),Y
  AND ($AB),Y
  AND ($AB),Y
  AND ($AB),Y
  AND ($AB),Y
  .byte $34
  LDX $09F3
  LSR $9D
@ED40:
  .byte $64
  LDX $AE64
  .byte $64
  LDX $48F3
  JMP $D4AE
  LDX $AE64
  AND ($AF),Y
  .byte $64
  LDX $1DF3
  CMP $AF
  CMP $AF
  LDX $C5AF,Y
  .byte $AF
  DEC $AF
@ED5E:
  CMP $AF
  CMP $AF
  CMP $AF
  SBC $AF
  CMP $AF
  SBC $C5AF
  .byte $AF
  CMP $AF
  CMP $AF
  BEQ @ED21
  ADC $C5B0,Y
  .byte $AF
  CMP $AF
@ED78:
  .byte $9F
  BCS @ED40
@ED7B:
  .byte $AF
  CMP $AF
  CMP $AF
  CMP $AF
  CMP $AF
  CMP $AF
  CMP $AF
  CMP $AF
  CMP $AF
  INY
  BCS @ED63
  BCS @ED6F
  BCS @ED7B
  BCS @ED5A
  .byte $AF, $FB
  BCS @ED5E
  .byte $AF, $F3
  ORA $B197,X
  .byte $82
  LDA ($97),Y
  LDA ($97),Y
  LDA ($97),Y
  LDA ($97),Y
  LDA ($98),Y
  LDA ($97),Y
  LDA ($97),Y
  LDA ($CA),Y
  LDA ($2E),Y
  .byte $B2, $97
  LDA ($97),Y
  LDA ($97),Y
  LDA ($97),Y
  LDA ($97),Y
  LDA ($51),Y
  .byte $B2, $97
  LDA ($0C),Y
  LDA $B197
  .byte $97
  LDA ($97),Y
  LDA ($97),Y
  LDA ($97),Y
  LDA ($97),Y
  LDA ($97),Y
  LDA ($97),Y
  LDA ($97),Y
  LDA ($97),Y
  LDA ($97),Y
  LDA ($97),Y
  LDA ($97),Y
  LDA ($6F),Y
  .byte $B2, $FB
  BCS @ED78
  LDA ($F3),Y
  ORA #$EC
  STA $B29B,X
  .byte $9B, $B2, $9B, $B2, $F3
  PHA
  JMP $D4AE
  LDX $B2A2
  .byte $9B, $B2, $9B, $B2, $F3, $37
  BIT $1AB3
  .byte $B3
  NOP
  STA $A4,X
  .byte $F3, $1F
  LDA $ADB3
  .byte $B3
  ANC #$9E
  LDA $F3B3
  .byte $1C
  LDA $AAB3
  .byte $B3, $AF, $B3
  SBC #$B3
  .byte $F4, $B3
  ASL $B4
  .byte $14
  LDY $F3,X
  .byte $42, $53
  LDY $58,X
  LDY $53,X
  LDY $58,X
  LDY $53,X
  LDY $58,X
  LDY $53,X
  LDY $58,X
  LDY $FA,X
  .byte $23, $9C, $F3
  STY $1202
  SBC $F900,X
  ORA #$2B
  .byte $37, $42, $83
@EE3C:
  .byte $64
  BEQ @EE3C
  BRK
  .byte $F3
  LDY $03,X
  .byte $02
  ANC #$F3
  ASL $AF51,X
  EOR $90AF,Y
  .byte $AF
  TAX
  .byte $AF
  SBC $2B15,Y
  .byte $3F
  ROL A
  ORA $FB47,Y
  SBC $F3,X
  EOR ($96,X)
  .byte $B7, $92, $B7, $97, $B7, $9C, $B7
  LDA ($B7,X)
  .byte $F3
  PLP
  NOP
  LDA $B913,Y
  .byte $1B
  LDA $B922,Y
  AND #$B9
  BMI @EE2B
  .byte $37
  LDA $B93E,Y
  EOR $B9
  JMP $53B9
  LDA $B95A,Y
  ADC ($B9,X)
  PLA
  LDA $B96F,Y
  ROR $B9,X
  ADC $84B9,X
  LDA $B98B,Y
  .byte $92
  LDA $B999,Y
  LDY #$B9
  .byte $A7
  LDA $B9AE,Y
  LDA $B9,X
  LDY $C3B9,X
  LDA $B9CA,Y
  CMP ($B9),Y
  CLD
  LDA $B9DF,Y
  INC $B9
  SBC $F4B9
  LDA $29F3,Y
  NOP
  LDA $B913,Y
  .byte $1B
  LDA $B922,Y
  AND #$B9
  BMI @EE71
  .byte $37
  LDA $B93E,Y
  EOR $B9
  JMP $53B9
  LDA $B95A,Y
  ADC ($B9,X)
  PLA
  LDA $B96F,Y
  ROR $B9,X
  ADC $84B9,X
  LDA $B98B,Y
  .byte $92
  LDA $B999,Y
  LDY #$B9
  .byte $A7
  LDA $B9AE,Y
  LDA $B9,X
  LDY $C3B9,X
  LDA $B9CA,Y
  CMP ($B9),Y
  CLD
  LDA $B9DF,Y
  INC $B9
  SBC $F4B9
  LDA $03FF,Y
  ORA ($BA),Y
  .byte $FB
  LDA $1DF3,Y
  .byte $E7
  LDY $EF,X
  LDY $F7,X
  LDY $FB,X
  LDY $09,X
  LDA $25,X
  LDA $32,X
  LDA $3F,X
  LDA $F7,X
  LDY $53,X
  LDA $5A,X
  LDA $67,X
  LDA $75,X
  LDA $83,X
  LDA $99,X
  LDA $9D,X
  LDA $A4,X
  LDA $BA,X
  LDA $D0,X
  LDA $E4,X
  LDA $EC,X
  LDA $F7,X
  LDA $0B,X
  LDX $1D,Y
  LDX $75,Y
  LDX $85,Y
  LDX $90,Y
  LDX $C0,Y
  LDX $D6,Y
  LDX $DE,Y
  LDX $E6,Y
  LDX $F0,Y
  LDX $01,Y
  .byte $B7, $12, $B7
  BIT $B7
  .byte $F3
  BPL @EF8B
  .byte $9F
  ALR #$BB
  ALR #$BB
  ALR #$BB
  ALR #$BB
  .byte $F3
  ASL $BB4B,X
  .byte $02
  LDA $4F,X
  LDA $50,X
  .byte $BB
  SBC $F303,X
  .byte $04
  BIT $BA
  .byte $1C
  TSX
  .byte $F3, $42, $5B
  LDY #$60
  LDY #$F3
  .byte $42
  ADC $A0
  ROR A
  LDY #$F3
  .byte $42
  NOP
  LDX #$1F
  LDX #$F3
  .byte $42
  BIT $A2
  AND #$A2
  .byte $F3, $42, $33
  LDY $38,X
  LDY $F3,X
  .byte $33, $13, $A7
  INC $A6,X
  ASL $A7
  .byte $13, $A7, $13, $A7, $89, $A7, $9C, $A7, $92
@EF8B:
  .byte $A7, $92, $A7, $92, $A7, $92, $A7, $92, $A7, $13, $A7, $13, $A7
  LDA $A7
  .byte $BF, $A7, $F3, $AF
  ORA $02,X
  ORA #$F5
  SEI
  .byte $33
  STY $A0,X
  .byte $F2, $23, $9C
  SBC $2002,Y
  SEI
@EFAD:
  PHA
  ADC $A1,X
  .byte $F2, $23, $9C, $FB, $FB, $32, $1B, $02
  ORA ($FB,X)
  SEI
  BEQ @EFAD
  AND $FB
  NOP
  .byte $C7, $9F
  NOP
  CLI
  .byte $03, $E3, $FB
  INC $FC,X
  .byte $04
  SBC $2A02,Y
  .byte $FB
  NOP
  .byte $C7, $9F
  NOP
  CLI
  .byte $03
  ANC #$FB
  SBC $FC,X
  .byte $04, $32
  CLI
  .byte $04
  ASL $FB
  .byte $FC, $02
@EFE0:
  AND $05F0
  BEQ @EFE0
  .byte $3C
  JMP ($0706)
  .byte $FB, $FC, $02, $3C, $57, $07, $07, $FB
  SED
  .byte $02
  SBC $2A02,Y
  .byte $14
  .byte $F0, $08  ; BEQ $A001
@EFF9:
  BEQ @EFF9
  ORA ($FB,X)
  .byte $FC, $02
  .byte $1E
  `;
}

// ═══════════════════════════════════════════════════
// Assemble all sections into full 8KB bank
// ═══════════════════════════════════════════════════
const _PRG_BANK_16: readonly number[] = [
  ...build_8000_83FF_seg1(),
  ...build_8400_87FF_seg2(),
  ...build_8800_8BFF_seg3(),
  ...build_8C00_8FFF_seg4(),
  ...build_9000_93FF_seg5(),
  ...build_9400_97FF_seg6(),
  ...build_9800_9BFF_seg7(),
  ...build_9C00_9FFF_seg8(),
];
