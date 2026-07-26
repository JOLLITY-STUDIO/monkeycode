/**
 * PRG-ROM MMC3 bank 27 (8KB) — function-based assembly
 * Mapper: 4 (MMC3) | CPU: $8000-$9FFF
 * CDL: code=384 data=6021 unaccessed=1787
 *
 * 功能: 球员数据查询小工具 + 数据表
 *
 * Pattern: 参考 bank_31.ts
 *   每个 build_xxx() 函数返回其覆盖地址范围的 raw 6502 字节，
 *   最后通过 spread 拼成完整的 8KB 数组
 */


import { asm } from '../_6502asm';
export { _PRG_BANK_27 as default };

console.log('[prg_27_player_data] loaded');

// $8000-$83FF (1024B): $8000-$83FF 代码/数据段1
function build_8000_83FF_segN(): readonly number[] {
  return asm`
  LDX $A0,Y
  CPY $E2A0
  LDY #$FF
  STA $95B2,X
  ROR $E4C4,X
  .byte $DF
  SBC #$DE
  SBC ($FF,X)
  NOP
@E013:
  SBC $E7
  .byte $DB, $CF
  STY $D3
  ADC $A5D1,X
  .byte $FF
  STA ($A5),Y
  STA $7E,X
  LDY $E1,X
  .byte $D4, $D2, $BB
  CMP $E0FF
  CMP $D0DB,Y
  CMP $90
  LDY #$7D
  LDY $FF9A,X
  .byte $92
  LDA $95
  ROR $E1AB,X
  INY
  .byte $CF, $AF
  CMP ($FF,X)
  CPX #$CD
  BNE @E013
  .byte $D2
@E043:
  STA ($B7),Y
  ADC $9ABC,X
  .byte $FF
  STA ($9A),Y
  STA $7E,X
  .byte $BF
  DEC $CF,X
  CMP ($B8),Y
  NOP
  .byte $FF, $E2, $DB
  DEC $D3
  CPX #$90
  LDX #$7D
  .byte $B7, $9B, $FF
  STA $95A6,X
  ROR $DADC,X
  .byte $C7
  NOP
  CMP $FFEF,X
  INC $D4E9
  CPX #$EC
  BCC @E043
  ADC $99D0,X
  .byte $FF
  STA ($9A),Y
  STA $7E,X
  .byte $B7
  DEC $AE,X
  LDY $CDB9,X
  .byte $FF, $E2
  CMP $B8BB,Y
  LDA $C19C,X
  ADC $A7B6,X
  .byte $FF
  LDA #$A5
  LDA ($7E,X)
  .byte $CF, $D4
  CMP ($E9),Y
  DEC $FFD9,X
  .byte $DF
  INC $E8
  NOP
  CMP $DBC0,X
  .byte $89, $D2
  INY
  .byte $FF
  STA $A2B2,X
  ADC $E2D2,X
  .byte $D4
  NOP
  CMP $FFCF,X
  SBC $EBDC
  SBC #$E0
  .byte $C3
  DEC $D18A,X
  AXS #$FF
  ROR $DC87,X
  DEC $B1CF,X
  DEC $E9
  CMP ($AA),Y
  .byte $FF, $DF
  INC $E8
  NOP
  CMP $DBC0,X
  .byte $89, $D2
  INY
  .byte $FF
  ADC $DFA2,X
  CMP $B1C5,X
  .byte $D4
  NOP
  .byte $D2
  TAX
  .byte $FF
  SBC $EBDC
  SBC #$E0
  .byte $C3
  DEC $D18A,X
  AXS #$FF
  ORA $3422,Y
  .byte $37
  LSR A
  ARR #$51
  ADC ($5A),Y
  RTS
  .byte $FF
  TXS
  STA ($96),Y
  LDY #$74
  EOR $6F,X
  EOR $5D7E
  CMP $ADAA
  LDA ($D6),Y
  CMP ($E4),Y
  .byte $EF
  CPX $EF
  .byte $FF
  PHA
  JSR $C50C ; → bank switch?
  LDX #$00
  STX $3D
  LDA $062A
  AND #$7F
  TAY
  PLA
  PHA
  CMP #$0B
  PHP
  BCC @E122
  SBC #$0B
  PHA
  LDA $A1DC,Y
  TAY
  INX
  INX
  PLA
@E122:
  PHA
  TYA
  ASL A
  ASL A
  STA $3C
  ASL A
  ASL A
  ADC $3C
  STA $3C
  ROL $3D
  PLA
  SEC
  SBC #$01
  LSR $00E2
  ROL A
  STA $3E
  PLP
  PHP
  LDA $05FB
  BEQ @E147
  PHP
  PLA
  EOR #$01
  PHA
  PLP
@E147:
  BCS @E15C
  LDA #$25
  STA $3F
  LDA $002C,X
  ASL A
  TAX
  LDA $A6AE,X
  TAY
  LDA $A6AD,X
  JMP $A179
@E15C:
  LDA #$26
  STA $3F
  LDA $002C,X
  ASL A
  STA $3A
  ASL A
  ADC $3A
  STA $3A
  LDA $002D,X
  ASL A
  ADC $3A
  TAX
  LDA $AB66,X
  TAY
  LDA $AB65,X
  CLC
  ADC $3C
  STA $3A
  TYA
  ADC $3D
  STA $3B
  LDY $3E
  LDA ($3A),Y
  PLP
  BCC @E19E
  CMP #$F0
  BEQ @E19E
  JSR $C536 ; → bank switch?
  TXA
  EOR #$FF
  TAX
  TYA
  EOR #$FF
  TAY
  INX
  INY
  JSR $C539 ; → bank switch?
@E19E:
  LDY #$09
  STA ($34),Y
  PLA
  PHA
  LDX $3F
  JSR $C527 ; → bank switch?
  PLA
  LDX $32
  CPX $00E2
  BCS @E1B2
  RTS
@E1B2:
  LDX $3F
  CPX #$25
  BEQ @E1BC
  LDA #$F0
  BNE @E1D7
@E1BC:
  CMP #$0B
  BCC @E1C2
  SBC #$0B
@E1C2:
  CMP #$05
  BCS @E1DB
  LDX #$C8
  LDA $05FB
  BEQ @E1CF
  LDX #$38
@E1CF:
  LDY #$08
  LDA ($34),Y
  TAY
  JSR $C539 ; → bank switch?
@E1D7:
  LDY #$09
  STA ($34),Y
@E1DB:
  RTS
  ASL $0C0D
  ANC #$0A
  ORA #$08
  .byte $07
  ASL $05
  .byte $04, $03, $02
  ORA ($00,X)
  LDA $05F4
  BNE @E1F1
  RTS
@E1F1:
  BPL @E20C
  LDA #$01
  STA $05F4
  LDA $05F3
  ASL A
  TAX
  LDA $A292,X
  STA $63
  LDA $A293,X
  STA $64
  LDA #$00
  STA $05F5
@E20C:
  LDA $05F5
  BEQ @E215
  DEC $05F5
  RTS
@E215:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $0515
  BNE @E215
  LDA #$01
  STA $0515
@E224:
  LDY #$00
  LDA ($63),Y
  CMP #$FF
  BNE @E242
  INY
  LDA ($63),Y
  TAX
  INY
  LDA ($63),Y
  STA $64
  STX $63
  LDA $05E3
  BNE @E224
  STA $05F4
  JMP $A224
@E242:
  STA $05F5
  INY
  LDA ($63),Y
  ASL A
  TAX
  LDA $A42A,X
  STA $3A
  LDA $A42B,X
  STA $3B
  LDY #$00
  LDX #$00
@E258:
  LDA ($3A),Y
  BEQ @E27E
  STA $04A5,X
  STA $3C
  INY
  LDA ($3A),Y
  STA $04A6,X
  INY
  LDA ($3A),Y
  STA $04A7,X
  INY
  INX
  INX
  INX
@E271:
  LDA ($3A),Y
  STA $04A5,X
  INX
  INY
  DEC $3C
  BNE @E271
  BEQ @E258
@E27E:
  STA $04A5,X
  LDA #$80
  STA $0515
  LDA $63
  CLC
  ADC #$02
  STA $63
  BCC @E291
  INC $64
@E291:
  RTS
  LDX $CBA2
  LDX #$E8
  LDX #$FD
  LDX #$1A
  .byte $A3, $3F, $A3
  LSR $6BA3,X
  .byte $A3, $72, $A3, $77, $A3, $92, $A3
  AXS #$A3
  .byte $F4, $A3
  AND $A4
  ORA $00
  ORA $01
  ORA $02
  ORA $01
  ORA $02
  ORA $03
  ORA $02
  ORA $01
  ORA $02
  ORA $03
  ORA $02
  ORA $01
  ORA $00
  .byte $FF
  LDX $05A2
  .byte $04
  ORA $01
  ORA $02
  ORA $01
  ORA $02
  ORA $03
  ORA $02
  ORA $01
  ORA $02
  ORA $03
  ORA $02
  ORA $01
  ORA $04
  .byte $FF
  AXS #$A2
  .byte $04
  ORA $04
  ASL $04
  .byte $07, $04
  ASL $04
  .byte $07, $04
  ASL $04
  .byte $07, $04
  ASL $04
  ORA $FF
  INX
  LDX #$05
  PHP
  ORA $09
  ORA $0A
  ORA $09
  ORA $0A
  ORA $09
  ORA $08
  ORA $09
  ORA $0A
  ORA $09
  ORA $0A
  ORA $09
  ORA $08
  .byte $FF
  SBC $08A2,X
  ANC #$04
  .byte $02, $04, $03, $04, $02, $04, $03, $04, $02, $04, $03
  PHP
  .byte $0C, $04, $02, $04, $03, $04, $02, $04
  ANC #$04
  .byte $02
  PHP
  .byte $0C, $04, $02, $04, $03, $04, $02, $FF
  NOP
  .byte $A3
  ORA $0F
  ORA $10
  ORA $11
  ORA $10
  ORA $11
  ORA $10
  ORA $0F
  ORA $10
  ORA $11
  ORA $10
  ORA $11
  ORA $10
  ORA $11
  ORA $10
  .byte $FF, $3F, $A3
  ASL A
  ORA $0A
  ASL $0F
  .byte $07
  ORA $12
  ORA $13
  .byte $FF, $64, $A3
  PHP
  .byte $14
  PHP
  ORA $FF,X
  ARR #$A3
  .byte $80
  BRK
  .byte $FF, $72, $A3, $03
  ASL $03,X
  .byte $17, $03
  ORA $1803,Y
  ORA $16
  ORA $17
  ORA $19
  ORA $18
  .byte $03
  ASL $03,X
  .byte $17, $03
  ORA $1803,Y
  .byte $FF, $77, $A3, $07
  NOP
  ORA $1B
  ORA $1A
  ORA $1B
  ORA $1A
  ORA $1B
  ORA $1A
  ORA $1B
  ORA $1C
  ORA $1B
  ORA $1A
  .byte $07, $1B, $07
  NOP
  .byte $07, $1B, $07, $1C, $07
  ORA $1C07,X
  .byte $07
  ORA $1C07,X
  .byte $07
  ORA $1B05,X
  .byte $07
  ORA $1B05,X
  .byte $07, $1C, $07
  ORA $1C07,X
  .byte $07, $1B, $FF, $92, $A3, $07
  ASL $1B07,X
  .byte $07, $1C, $07, $1B, $07
  ORA $1B07,X
  .byte $07
  ASL $1B05,X
  ORA $1D
  .byte $07, $1B, $07, $1C, $07, $1B, $07
  ORA $1B07,X
  ORA $1C
  ORA $1D
  ORA $1C
  ORA $1D
  .byte $07, $1B, $FF
  AXS #$A3
  .byte $07, $1F
  ORA $02
  ORA $03
  ORA $02
  ORA $03
  ORA $02
  `;
}

// $8400-$87FF (1024B): $8400-$87FF 代码/数据段2
function build_8400_87FF_segN(): readonly number[] {
  return asm`
  .byte $07, $0C
  ORA $03
  ORA $0C
  .byte $07, $03
  ORA $02
  .byte $07, $1F
  ORA $02
  .byte $07, $03, $07, $0C
  ORA $03
  .byte $07, $0C
  ORA $03
  .byte $07, $0C
  ORA $03
  .byte $07, $0C
  ORA $03
  ORA $02
  .byte $FF, $F4, $A3, $EF
  BRK
  .byte $FF
  AND $A4
  ROR A
  LDY $8F
  LDY $94
  LDY $99
  LDY $9E
  LDY $C3
  LDY $E8
  LDY $ED
  LDY $F2
  LDY $17
  LDA $1C
  LDA $21
  LDA $46
  LDA $4B
  LDA $4B
  LDA $4B
  LDA $70
  LDA $7A
  LDA $84
  LDA $A9
  LDA $B8
  LDA $DD
  LDA $E6
  LDA $0B
  LDX $15
  LDX $1F
  LDX $29
  LDX $4E
  LDX $55
  LDX $5C
  LDX $63
  LDX $88
  LDX $04
  INY
  .byte $22
  BRK
  LDY $B5,X
  CPX #$04
  INX
  .byte $22
  BRK
  LDX $B7,Y
  .byte $E2, $04
  PHP
  .byte $23
  BRK
  LDY $E8BD,X
  .byte $04
  PLP
  .byte $23
  BRK
  LDX $EABF,Y
  ORA ($EA,X)
  .byte $23
  BVC @E48C
  .byte $F2
@E48C:
  .byte $23
  ORA $00
  ORA ($EA,X)
  .byte $22
  NOP
  BRK
  ORA ($EA,X)
  .byte $22
  SBC ($00),Y
  ORA ($EA,X)
  .byte $22
  CLD
  BRK
  .byte $04
  INY
  .byte $22
  BRK
  SBC #$EE
  .byte $EF, $04
  INX
  .byte $22
  BRK
  LDX $B7,Y
  .byte $E2, $04
  PHP
  .byte $23
  BRK
  LDY $E8BD,X
  .byte $04
  PLP
  .byte $23
  BRK
  LDX $EABF,Y
  ORA ($EA,X)
  .byte $23
  BVC @E4C0
  .byte $F2
@E4C0:
  .byte $23
  ORA $00
  .byte $04
  INY
  .byte $22
  BRK
  LDY $E4,X
  SBC $04
  INX
  .byte $22
  BRK
  LDX $E6,Y
  .byte $E7, $04
  PHP
  .byte $23
  BRK
  LDY $E8BD,X
  .byte $04
  PLP
  .byte $23
  BRK
  LDX $EABF,Y
  ORA ($EA,X)
  .byte $23
  BVC @E4E5
  .byte $F2
@E4E5:
  .byte $23
  ORA $00
  ORA ($EA,X)
  .byte $22
  CMP $0100,Y
  NOP
  .byte $22, $F2
  BRK
  .byte $04
  INY
  .byte $22
  BRK
  LDY $B5,X
  CPX #$04
  INX
  .byte $22
  BRK
  SBC #$EC
  SBC $0804
  .byte $23
  BRK
  LDY $E8BD,X
  .byte $04
  PLP
  .byte $23
  BRK
  LDX $EABF,Y
  ORA ($EA,X)
  .byte $23
  BVC @E514
  .byte $F2
@E514:
  .byte $23
  ORA $00
  ORA ($EA,X)
  .byte $22, $DB
  BRK
@E51C:
  ORA ($EA,X)
  .byte $22
  BEQ @E521
@E521:
  .byte $04
  INY
  .byte $22
  BRK
  SBC #$EE
  .byte $EF, $04
  INX
  .byte $22
  BRK
  LDX $DA,Y
  .byte $E2, $04
  PHP
  .byte $23
  BRK
  LDY $E8BD,X
  .byte $04
  PLP
  .byte $23
  BRK
  LDX $EABF,Y
  ORA ($EA,X)
  .byte $23
  BVC @E543
  .byte $F2
@E543:
  .byte $23
  ORA $00
  ORA ($EA,X)
  .byte $22, $F3
  BRK
  .byte $04
  INY
  .byte $22
  BRK
  .byte $F4
  LDA $E0,X
  .byte $04
  INX
  .byte $22
  BRK
  SBC $EC,X
  SBC $0804
  .byte $23
  BRK
  BCS @E51C
  INX
  .byte $04
  PLP
  .byte $23
  BRK
  LDX $EABF
  ORA ($EA,X)
  .byte $23
  BVC @E56D
  .byte $F2
@E56D:
  .byte $23
  ORA $00
  ORA ($C9,X)
  .byte $22
  SBC ($02,X)
  SBC #$22
  .byte $E3, $DB
  BRK
  ORA ($C9,X)
  .byte $22, $F4, $02
  SBC #$22
  SBC $F0,X
  BRK
  .byte $04
  INY
  .byte $22
  BRK
  BRK
  BRK
  BRK
  .byte $04
  INX
  .byte $22
  BRK
  BRK
  .byte $B2, $B3, $04
  PHP
  .byte $23
  BRK
  LDA $B9B8
  .byte $04
  PLP
  .byte $23
  BRK
  .byte $AF
  TSX
  .byte $BB
  ORA ($EA,X)
  .byte $23
  BVC @E5A6
  .byte $F2
@E5A6:
  .byte $23
  ORA $00
  .byte $03
  SBC #$22
  LDX $A7
  BRK
  ORA ($09,X)
  .byte $23
  LDY $2901
  .byte $23
  LDX $0400
  INY
  .byte $22
  BRK
  BRK
  BRK
  SED
  .byte $04
  INX
  .byte $22
  BRK
  BRK
  BRK
  NOP
  .byte $04
  PHP
  .byte $23
  BRK
  LDA $B9B8
  .byte $04
  PLP
  .byte $23
  BRK
  .byte $AF
  TSX
  .byte $BB
  ORA ($EA,X)
  .byte $23
  BVC @E5DA
  .byte $F2
@E5DA:
  .byte $23
  ORA $00
  ORA ($CB,X)
  .byte $22
  SBC $EB01,Y
  .byte $22, $FB
  BRK
  .byte $04
  INY
  .byte $22
  BRK
  .byte $DC
  LDA $E0,X
  .byte $04
  INX
  .byte $22
  BRK
  .byte $DF
  CPX $04ED
  PHP
  .byte $23
  BRK
  BCS $E5B7
  INX
  .byte $04
  PLP
  .byte $23
  BRK
  LDX $EABF
  ORA ($EA,X)
  .byte $23
  BVC @E608
  .byte $F2
@E608:
  .byte $23
  ORA $00
  ORA ($C9,X)
  .byte $22
  CMP $E902,X
  .byte $22, $DF, $DB
  BRK
  ORA ($C9,X)
  .byte $22
  CMP $E902,X
  .byte $22
  SBC $DB,X
  BRK
  ORA ($C9,X)
  .byte $22
  DEC $E902,X
  .byte $22
  SBC $F0,X
  BRK
  .byte $04
  INY
  .byte $22
  BRK
  LDY $B5,X
  CPX #$04
  INX
  .byte $22
  BRK
  SBC #$EC
  SBC $0804
  .byte $23
  BRK
  LDY $E8D6,X
  .byte $04
  PLP
  .byte $23
  BRK
  LDX $EAD3
  ORA ($EA,X)
  .byte $23
  BVC @E64B
  .byte $F2
@E64B:
  .byte $23
  ORA $00
  .byte $03
  SBC #$22
  SBC #$F7
  SBC $0300
  SBC #$22
  CMP ($D4),Y
  CMP $00,X
  .byte $03
  SBC #$22
  CMP ($D7),Y
  CMP $00,X
  .byte $04
  INY
  .byte $22
  BRK
  LDY $B5,X
  CPX #$04
  INX
  .byte $22
  BRK
  SBC #$EC
  SBC $0804
  .byte $23
  BRK
  LDY $E8BD,X
  .byte $04
  PLP
  .byte $23
  BRK
  LDX $EABF,Y
  ORA ($EA,X)
  .byte $23
  BVC @E685
  .byte $F2
@E685:
  .byte $23
  ORA $00
  .byte $04
  INY
  .byte $22
  BRK
  SBC #$EE
  .byte $EF, $04
  INX
  .byte $22
  BRK
  LDX $DA,Y
  .byte $E2, $04
  PHP
  .byte $23
@E699:
  BRK
  LDY $E8D6,X
  .byte $04
  PLP
  .byte $23
  BRK
  LDX $EAD3
  ORA ($EA,X)
  .byte $23
  BVC @E6AA
  .byte $F2
@E6AA:
  .byte $23
  ORA $00
  LDA $A6,X
  SBC ($A7,X)
  ORA $39A9
  TAX
  BRK
  BIT $1E
  ASL $2826,X
  .byte $03, $03
  LSR A
  LSR A
  ARR #$6B
  PLP
  .byte $44
  ADC $407D,Y
  ROR $6C
  JMP ($3C3C)
  BVC $E71D
  JMP $283F
  AND $62,X
  NOP
  .byte $83, $A7, $67, $67
  TAY
  STA $70,X
  TYA
  STY $87
  .byte $54
  JMP ($8080)
  .byte $6F, $7C
  ALR #$65
  STA $BFAC,X
  .byte $BF
  LDX $C4C7
  CPY $95
  LDX $B4,Y
  CPY #$90
  BCC @E699
  LDA $94
  STY $7E,X
  ROR $C3C3,X
  .byte $DF, $DF
  LDA $DCC6
  .byte $DC
  CMP ($D1),Y
  CLD
  CLD
  TAY
  TAY
  LDA ($B1),Y
  STA $95,X
  ROR $D17E,X
  CMP ($E0),Y
  CPX #$D3
  .byte $D3
  SBC #$E9
  DEC $DCDE,X
  .byte $DC, $03, $1B
  PHP
  JSR $1D1C
  ASL $11
  AND $33
  .byte $5F, $5F
  ANC #$44
  .byte $72, $72
  AND $4E,X
  .byte $54, $54, $3C
  PHA
  .byte $47, $53
  EOR ($41,X)
  .byte $37, $37, $57, $7B, $83, $8F, $5C, $80
  TXA
  .byte $A3
  ADC ($94),Y
  SEI
  STY $6C
  JMP ($7777)
  ADC ($71),Y
  ROR $66
  TAX
  .byte $93
  AXS #$B3
  BCS $E6E7
  CLV
  .byte $C7
  STA $AE,X
  TAY
  CPY #$9C
  .byte $9C, $A7, $A7
  STX $96,Y
  ADC $B77D,X
  BNE $E743
  .byte $E3
  LDY $DDD3,X
  CMP $DEC5,X
  CLD
  CLD
  .byte $9C, $9C, $A7, $A7
  LDA $8AAD
  TXA
  .byte $CF, $DC, $EF, $EF, $D4, $DF
  SBC #$E9
  DEC $E4EA,X
  CPX $1D
  ORA $2F0B,X
  AND $0839
  PHP
  ANC #$3F
  .byte $77, $77
  EOR ($51),Y
  ROR $4382,X
  ADC $60
  RTS
  ALR #$4B
  .byte $47, $47, $4F, $44
  ANC #$36
  .byte $64, $64, $80, $9B
  ADC #$82
  .byte $97, $B3, $73
  STY $78,X
  .byte $9C, $7B, $7B, $5F, $77, $74, $7F
  .byte $50, $66  ; BVC $8813
  LDA $BFC4
  AXS #$A6
  .byte $AF, $C7, $C7
  STX $BD,Y
@E7B7:
  LDY $B4,X
  .byte $9E, $9E, $9B, $9B, $97, $97
  ADC $AE7D,X
  CMP $E3
  .byte $E3
  INY
  INY
  .byte $DF, $DF, $D2, $D2, $DC, $DC
  TAX
  TAX
  .byte $B3, $B3
  LDX #$A2
  ADC $D07D,X
  BNE @E7B7
  .byte $DF, $D2, $D2
  NOP
  NOP
  CMP $DBDD,X
  .byte $DB
  BRK
  BIT $12
  .byte $12
  ROL $32
  .byte $03, $03
  EOR #$54
  EOR ($51),Y
  ORA $7F36,X
  .byte $7F
  RTI
  NOP
  JMP ($3070)
  JMP ($5244)
  ROL $26
  AND #$29
  STY $79
  .byte $75
  `;
}

// $8800-$8BFF (1024B): $8800-$8BFF 代码/数据段3
function build_8800_8BFF_segN(): readonly number[] {
  return asm`
  STX $4D67
  .byte $97, $97, $64, $89, $9C, $93, $54, $9C
  PLA
  .byte $82, $57, $57
  EOR $B44D
  LDA #$B2
  .byte $B2, $89, $A3, $BB
  DEC $9F
  LDA $C4CC
  ADC $8DCC,Y
  .byte $B2, $7C, $7C
  ADC ($71),Y
  .byte $C3
  CPX $C8
  INY
  LDA ($C6,X)
  DEC $D1DE,X
  CMP ($CE),Y
  .byte $DC, $9C, $9C
  STA $8899,Y
  DEY
  ADC ($71),Y
  .byte $DC, $DC, $D4, $D4
  CMP ($D1),Y
  NOP
  NOP
  DEC $E9DE,X
  SBC #$0E
  ASL $1515
  BPL $E85B
  ASL $06
  RTS
  LSR A
  EOR ($6B),Y
  .byte $37
  EOR ($73,X)
  .byte $83, $34
  ADC $70
  SEI
  .byte $3C
  JMP ($7747)
  AND $35,X
  ANC #$2B
  LSR $84,X
  EOR $808F,X
  .byte $67
  TXA
  .byte $A7, $7B
  ADC ($94),Y
  .byte $9C
  ADC ($90,X)
@E86F:
  ROR A
  .byte $9B
  EOR $5B6F,Y
  .byte $74
  STA $A6C0,X
  AXS #$93
  TYA
  LDY $A3BB,X
  LDA $B8B7
  STA $CC
  STX $7DD7
  ADC $7272,X
  BNE @E86F
  .byte $D3, $EF, $C3
  INY
  DEC $D2E2,X
  SBC #$D9
  CMP $8585,X
  STX $958E
  STA $72,X
  .byte $72, $DB, $DB
  CPX #$E0
  CMP $C5
  NOP
  NOP
  DEC $E9DE,X
  SBC #$11
  ORA ($0B),Y
  .byte $2F
  AND $0839
  PHP
  LSR A
  LSR A
  .byte $52, $5F
  ASL $7335,X
  .byte $77, $43
  EOR $7C7C,Y
  .byte $3F
  LSR A
  .byte $3B, $77
  AND $2A2D
  ROL A
  ROR $8285
  .byte $8F, $64
  LSR $A798
  .byte $67
  TXA
  STY $A1,X
  ADC $5F63,Y
  .byte $A7, $5C, $5C
  LSR $A94E
  LDA #$B2
  .byte $BF
  LDY #$8A
  .byte $C7, $D7
  LDX $B8A4
  CMP $86
  LDA $82,X
  .byte $D7, $7F, $7F, $72, $72, $C3, $C3
  INY
  .byte $EF
  CMP $A2
  CMP $DF,X
  .byte $D2, $D2
  CMP $92DD,X
  .byte $92, $A7, $A7, $8B, $8B, $72, $72, $CF, $CF, $DF, $DF, $D2, $D2
  NOP
  NOP
  CMP $E9DD,X
  SBC #$0C
  BMI @E924
  .byte $14
  ORA $05
  EOR #$27
  .byte $54
  LSR $44,X
  .byte $53
  ROL A
  AND $73,X
  .byte $7F, $3F, $5B
  JMP ($2570)
  AND $38
@E924:
  SEC
  PLP
  PLP
  SEI
  JMP $6284
  .byte $5C, $83
  EOR ($66,X)
  .byte $8B
  LDX #$70
  LDY #$87
  .byte $9C
  EOR $55,X
  ADC #$69
  EOR $B44D
  DEY
  STA $B1CC,X
  .byte $BF
  DEC $BB
  .byte $C7, $D2
  LDX $AD,Y
  CPY $C4
  ADC $8D79,Y
  STA $7171
  CLD
  LDY $E4C3
  .byte $D4, $D4
  LDX #$C6
  DEC $D1DE,X
  CMP ($DC),Y
  .byte $DC
  STA ($91),Y
  TXS
  TXS
  ROR $AD7E,X
  .byte $C7
@E965:
  CMP ($D1),Y
  CPX #$E0
  DEC $E9DE,X
  SBC #$EA
  NOP
  .byte $DC, $DC, $0F, $0F, $14, $14
  ORA $05
  BIT $33
  RTS
  ALR #$51
  .byte $43
  SEC
  .byte $2F, $73, $83
  EOR ($59,X)
  BVS $E9FD
  .byte $32, $32
  AND $2939,Y
  AND #$49
  NOP
  .byte $63
  STY $68
  .byte $8F, $52
  STA ($8B,X)
  .byte $A7
  ADC ($A1),Y
  DEY
  .byte $9C, $62
  BCC @EA05
  .byte $9B
  EOR $B459,Y
  NOP
  .byte $93
  CPY #$98
  AXS #$81
  .byte $BF
  BCS @E965
  LDX #$C5
  .byte $AB, $B7
  ADC $8290,Y
  .byte $9B
  ADC ($71),Y
  BNE $E96B
  CPY #$E4
  AXS #$EF
  .byte $D4
  LDA $DEE0,X
  SBC #$D2
  .byte $DB
  CMP $9D9D,X
  LDX $A6
  ADC $D07D,X
  BNE $E9A5
  .byte $DB
  CPX #$E0
  .byte $D3, $D3
  NOP
  NOP
  DEC $E9DE,X
  SBC #$0F
  .byte $0F, $17, $3B
  ASL $06
  AND #$36
  .byte $3F
  PHA
  .byte $5F
  EOR $522C,X
  .byte $73, $77
  EOR $7C44,Y
  .byte $7C, $33, $33
  ROL $2B2E
  ANC #$58
  .byte $42
  SEI
  .byte $62
  ADC #$8F
  .byte $4F, $83
  STY $67A7
  .byte $A3
  DEY
  LDA ($62,X)
  .byte $62
  LSR $4E5E,X
  LSR $947D
@EA05:
  LDY $AA,X
  LDX $D7
  .byte $BF, $8B, $C7, $C7
  LDX $B8BD
  CMP $86
  STX $82
  .byte $82, $72, $72
  LDA ($C5,X)
  .byte $CF, $CF
  INY
  .byte $EF, $AF, $E3, $DF, $DF, $D2, $D2
  CMP $91DD,X
  STA ($9A),Y
  TXS
  ADC $DD7D,X
  CMP $DBDB,X
  .byte $D2, $D2
  LDX $DFC4
  .byte $DF
  SBC #$E9
  NOP
  NOP
  .byte $0C
  PHA
  JSR $1B20
  .byte $1B
  ORA ($11),Y
  RTI
  EOR $6B6B
  ROL $36,X
  ROR $637E,X
  STA $3E
  JMP ($9030)
  EOR $52
  .byte $33, $33
  ROL $41,X
  CLI
  .byte $7C, $83, $83
  NOP
  .byte $67
  LDX #$A2
  STX $AB
  ADC $60A8
  LDY $69,X
  ADC #$63
  .byte $63
  EOR $947D,Y
@EA6A:
  LDA ($CB,X)
  AXS #$8B
  LDA $C6
  DEC $B7
  .byte $C3
  STA $A8CC,X
  CPY $B1B1
  DEY
  DEY
  STX $96,Y
  LDY $DFAC
  .byte $DF
  TSX
  DEC $DC
  .byte $DC
  CMP ($D1),Y
  .byte $C2
  CPX $B4
  CPX $BE
  LDX $A0A0,Y
  .byte $97, $97
  CMP ($D1),Y
  CPX #$E0
  .byte $D3, $D3
  SBC #$E9
  DEC $DCDE,X
  .byte $DC
  ORA $1624
  .byte $2F
  ORA $0F
  ASL $14
  AND $42,X
@EAA7:
  .byte $77, $77
  BIT $725C
  .byte $8B
  CLI
  STX $33
  JMP ($6C3C)
  .byte $47, $52
  PLP
  .byte $32
  ANC #$38
  NOP
  .byte $72, $8F, $8F, $5C, $80
  LDX #$A2
  .byte $9E
  DEY
  ALR #$57
  SEI
  .byte $C2, $77
  LSR $6F58,X
  .byte $5B
  STA ($A1,X)
  .byte $AF
  AXS #$CB
@EAD1:
  TYA
  LDA $C6C6,X
  .byte $AB
  BNE @EA6A
  CPY $D8A8
  .byte $B3, $B3
  ADC $7F7D,X
  .byte $7F
  DEC $C6
  .byte $E3, $E3
  LDY $DED4,X
  DEC $DDD0,X
  .byte $C3
  CPX $A8
  CLD
  .byte $B3, $B3
  DEY
  DEY
  TXA
  TXA
  CPY $C4
  .byte $E2, $E2
  DEC $EADE,X
  NOP
  SBC #$E9
  BNE @EAD1
  .byte $3C, $1C
  ANC #$2F
  .byte $12, $12
  PHP
  JSR $4437
  .byte $77, $5F
  LSR $69
  ROR $6182,X
  BVS @EB55
  .byte $5B
  BMI @EAA7
  .byte $3B
  ARR #$29
  .byte $3F
  ANC #$43
  ADC $5C
  .byte $9B, $B3
  STA $8A82
  BCS $EB99
  .byte $9F
  EOR $6C60
  CPY #$6B
  .byte $A7
  CLI
  .byte $63, $4F, $73
  LDX #$95
  AXS #$CB
  LDA $B0
  DEC $C9
  CLV
  .byte $C3
  ADC $859D,X
  .byte $CF, $9B, $9B, $7C, $93, $74
  LDY $AE
  .byte $C7, $EF, $EF
  CMP $D5,X
  DEC $D1DE,X
  CMP ($B8),Y
  CPY $DB9D
  .byte $B3, $B3
@EB55:
  DEY
  DEY
  .byte $7F, $7F
  BNE $EB2B
  .byte $DF, $DF, $D2, $D2
  NOP
  NOP
  CMP $E9DD,X
  SBC #$7D
  .byte $AB
  LDA #$AC
  CMP $AD,X
  ORA ($AF,X)
  AND $59B0
  LDA ($85),Y
  .byte $B2
  LDA ($B3),Y
@EB75:
  CMP $09B4,X
  LDX $35,Y
  .byte $B7
  ADC ($B8,X)
  BEQ $EB6F
  .byte $07, $07
@EB81:
  .byte $04, $04
@EB83:
  BEQ @EB75
  BEQ $EBA3
  AND $116A,Y
  ORA ($71),Y
  NOP
  ASL $F01E,X
  RTS
  BEQ @EB83
  ASL $1F
  .byte $04, $1C, $0F
  BIT $F0
  .byte $33
  ROR $5D,X
  AND #$36
  .byte $7C, $62
  JMP $F066
  BEQ $EBE4
  .byte $3C, $1F
  NOP
  AND $34,X
  .byte $1B
  ORA ($F0),Y
@EBAE:
  JMP $8E69
  LSR $888B
  LDX #$63
  ADC ($F0),Y
  .byte $F0, $6C  ; BEQ $8C26
  ROR $7536
@EBBD:
  EOR $3257
  PLP
  .byte $64
  BCC @EB81
  LDA $AE7E,X
@EBC7:
  DEC $C6
  STY $B7,X
  BEQ @EBBD
  STY $6E
  .byte $8B, $74
@EBD1:
  ROR $4D88,X
  ADC $F0
  BEQ @EBAE
  DEC $C7,X
  .byte $D4
  BEQ @EBC7
  .byte $B7, $DC
  BEQ @EBD1
  BEQ @EBE7
  BEQ $EBEC
  BEQ $EBD7
@EBE7:
  BEQ $EBD9
  .byte $F0, $1D  ; BEQ $8C08
  ROL $F06B
  .byte $12
  EOR $F071
  .byte $F0, $25  ; BEQ $8C19
  RTS
  .byte $03
  .byte $10, $13  ; BPL $8C0B
  PHP
  .byte $F0, $1E  ; BEQ $8C19
  .byte $F0, $05  ; BEQ $8C02
  .byte $F0, $28  ; BEQ $8C27
  .byte $45
  `;
}

// $8C00-$8FFF (1024B): $8C00-$8FFF 代码/数据段4
function build_8C00_8FFF_segN(): readonly number[] {
  return asm`
  .byte $77
  BEQ $EC2E
  ADC ($71),Y
  .byte $F0, $F0  ; BEQ $8BF7
  ROL $1B6C,X
  EOR $20,X
  LSR $351D,X
  .byte $12, $12
  BEQ $EC6B
  PLA
  .byte $82
  ROL $4F,X
  BEQ $EC09
  BEQ $EC0B
  .byte $63
  ADC $7958,Y
  .byte $50, $82  ; BVC $8BA3
  EOR ($5A,X)
  ASL $7137,X
  .byte $7B
  LDA $BE
  .byte $73, $80
  BEQ $EC1D
  STX $96,Y
  .byte $9E
  LDA $9D,X
  ROR $A675
  .byte $70, $89  ; BVS $8BC0
  .byte $4F
  ROR $94
  LDX $D6,Y
  SBC $8BA2
  BEQ $EC31
  BEQ $EC33
  INC $CD
  .byte $04, $04
  BEQ $EC39
  .byte $07, $07
  BEQ $EC3D
@EC4D:
  .byte $12, $12
  BEQ $ECBC
  BEQ @EC72
  EOR $1D72,Y
  ORA $6132,X
  .byte $3C, $1C
  BEQ @EC4D
  .byte $07, $1F, $14, $2F
  ROL A
@EC62:
  .byte $34
  BEQ $EC55
  BEQ $EC9F
  .byte $7F
  ADC #$4F
  ROR $6D
  LSR $1C,X
  AND ($45),Y
  .byte $47
  ROL A
@EC72:
  .byte $37, $12
  JSR $884D ; → bank switch?
  BEQ $EC69
  BEQ @ECD8
  .byte $8B
  LDA ($4F,X)
@EC7E:
  PLA
  .byte $62
  STA $35
  ROR $8F5D
  LSR $2B5B
  SEC
  ADC $AD
  BEQ $EC7D
  STY $C481
@EC90:
  CPY $AF
@EC92:
  INY
  STA ($B6),Y
  .byte $6F
  STA ($75),Y
  .byte $8F
  ADC $5A8B,X
  BVC @EC62
  BNE @EC90
  BEQ @EC92
  BEQ $EC94
  SBC #$BC
  .byte $DF
  CMP $F0CD
  BEQ @ECB3
  .byte $07, $04, $04
@ECAF:
  BEQ $ECA1
  BEQ @ECCF
@ECB3:
  AND ($16,X)
@ECB5:
  ORA ($11),Y
  RTI
  ADC $1E
  ASL $F0F0,X
@ECBD:
  BEQ @ECAF
  ASL $1F
@ECC1:
  .byte $1C
  ORA $F0
  .byte $0F
  BEQ @ECED
  EOR $76
  BEQ $ECF4
  BEQ @ECBD
  BEQ $ED02
@ECCF:
  BEQ @ECC1
@ECD1:
  BEQ @ED0F
  ORA $344E,X
  AND $25,X
@ECD8:
  .byte $1B
  BEQ $ED19
  EOR ($8E),Y
  BEQ @ED2B
@ECDF:
  BEQ @ECD1
  BEQ $ED46
  BEQ $ECD5
  JMP ($726E)
  ROL $57,X
  EOR $283E
@ECED:
  BEQ @ECDF
  .byte $80
  LDA $7D70,X
  BEQ $ED6E
  BEQ @EC7E
  BEQ $ECE9
@ECF9:
  STY $6E
  ROR $A3
@ECFD:
  .byte $87
  BVS @ED57
  EOR $91F0
@ED03:
  STA ($D6,X)
@ED05:
  LDY #$C5
  BEQ @ECF9
  BEQ @ECB5
  BEQ @ECFD
@ED0D:
  BEQ @ED13
@ED0F:
  BEQ $ED18
  BEQ @ED03
@ED13:
  BEQ @ED05
  BEQ $ED34
@ED17:
  AND $F05E
@ED1A:
  .byte $12
@ED1B:
  EOR ($71,X)
  BEQ $ED3D
  ROL $55
  BPL $ED26
@ED23:
  .byte $13
  PHP
  BEQ @ED17
  BEQ $ED2E
  BEQ @ED53
@ED2B:
  BEQ @ED8B
  BEQ @ED4D
  BEQ $ED96
  BEQ @ED23
  BEQ @ED8A
  .byte $1B
  EOR $2B,X
  LSR $36F0,X
  ORA $3512,X
  ALR #$F0
  PLA
  .byte $4F
  EOR $8AF0,Y
  BEQ $ED37
  BEQ $EDAC
@ED49:
  .byte $57
  STA $50
  .byte $82
@ED4D:
  RTI
  EOR $2A36,Y
  BVS @EDC6
@ED53:
  BEQ @ECF9
  BEQ $ECE2
@ED57:
  BEQ @ED49
  BEQ $ECE4
  BEQ $ECFC
@ED5D:
  STA ($6E),Y
@ED5F:
  .byte $74
  TXS
  BVS $ECEC
  .byte $5B
  ROR $87
  .byte $8B
  BEQ @ED1A
@ED69:
  BEQ @ED0D
  BEQ @ED5D
@ED6D:
  BEQ @ED5F
  BEQ @ED1B
  .byte $04, $04
  BEQ $ED65
  .byte $07, $07
@ED77:
  BEQ @ED69
  .byte $12, $12
  BEQ @ED6D
  BEQ @ED9E
  ROR $43
@ED81:
  ORA $0D1D,X
  NOP
@ED85:
  .byte $1C
  ORA $F0
  BEQ $ED90
@ED8A:
  .byte $1F
@ED8B:
  BEQ $EDA1
  BEQ @EDB9
  BEQ @ED81
  BEQ $EDCB
  BEQ @ED85
  BEQ @EDC2
  .byte $3F
  ADC $1E4D
@ED9B:
  BEQ $EDE4
  .byte $37
@ED9E:
  ROL $20,X
  ROL $4FF0
  BEQ $EDEA
  BEQ @EDEB
  BEQ $ED99
@EDA9:
  BEQ @ED9B
  STA $4A
@EDAD:
  .byte $34
  ADC $5D
  .byte $8F, $5B, $42
  ROL A
  LSR $7E
  .byte $72
  BEQ @EDA9
@EDB9:
  BEQ @EE25
  BEQ @EDAD
  BEQ $EE33
  .byte $7B
  LDX $65,Y
@EDC2:
  DEY
  ADC $8F,X
  .byte $8B
@EDC6:
  .byte $73
  LSR $C65C
  STX $F0,Y
  BEQ $EDBE
  TXS
  BEQ $EDC1
  BEQ @ED77
  NOP
  CMP $F0F0
  .byte $07, $07
@EDD9:
  .byte $04, $04
  BEQ $EDCD
  BEQ @EDFB
  EOR ($77),Y
  ORA ($11),Y
@EDE3:
  ADC ($73),Y
  ASL $541E,X
  JMP ($24F0)
@EDEB:
  .byte $1F
  ASL $04
  .byte $04, $0F, $1B
  BEQ @EDE3
  LSR $76
  AND #$36
  .byte $7C
  ROR $1CF0,X
@EDFB:
  BEQ $EDED
  .byte $3C
  ORA $3913,Y
  .byte $1C, $33, $0F
  ORA ($F0),Y
  ROL $9B5E,X
  ROL $4F,X
  .byte $9E
  LDX #$4C
  ASL $F0F0,X
  BMI @EE5C
  .byte $37
  EOR ($58),Y
  AND $32,X
  .byte $1C
  JMP ($8E6E)
  LDX $7F4F,Y
  BEQ @EDD9
  .byte $7C
  EOR $F0F0,Y
@EE25:
  JMP ($5D55)
  .byte $82, $6F
@EE2A:
  ADC $4C
  LSR $91F0
@EE2F:
  LDX $D6
@EE31:
  ROR $F098,X
  .byte $DC
  DEY
  LDY #$F0
  BEQ @EE2A
  .byte $04
@EE3B:
  BEQ $EE44
  BEQ @EE2F
  BEQ @EE31
  BEQ $EE60
  LSR $77
  BEQ $EE59
  ADC ($66),Y
  BEQ @EE3B
  AND $036C,X
  BPL @EE63
  PHP
  BEQ @EE71
  BEQ @EE5A
  BEQ @EE7F
  ROL $F077
@EE5A:
  ANC #$6F
@EE5C:
  .byte $73
  BEQ $EE4F
  AND $6C
@EE61:
  EOR $0F,X
@EE63:
  .byte $14
  LSR $1D35,X
  .byte $12
  ORA $27
  ALR #$39
  .byte $8F
  ANC #$36
  BEQ @EE61
@EE71:
  BEQ @EE63
  ROL $3184,X
  ADC ($3A,X)
  ROR A
  .byte $3F, $44
  PLP
  ANC #$57
  .byte $7B
@EE7F:
  LDA $CA
  .byte $73, $5C
  BEQ $EE75
  EOR $9E71,Y
  CPY #$79
@EE8A:
  LSR $5D,X
  .byte $82
  BVS $EEF5
  EOR ($4E,X)
@EE91:
  STA $B088,X
  DEC $8B,X
  LDX $F0
  BEQ @EE8A
  .byte $89, $9F
  CMP $0404
  BEQ @EE91
  .byte $07, $07
  BEQ $EE95
  .byte $12, $12, $5F, $77
  BEQ @EECA
  BVS @EF20
@EEAD:
  ORA $6C1D,X
  LSR A
  .byte $1C
  ORA $F0
  .byte $2F, $07
@EEB6:
  .byte $07, $14
  JSR $362A
  BEQ @EEAD
  BEQ $EEAF
  ADC $F07F,X
@EEC2:
  .byte $1F
  EOR #$6D
  BPL @EEF9
  .byte $22, $47, $1F
@EECA:
  .byte $37, $12, $14
  RTI
  AND $F0,X
  BEQ @EEC2
  EOR $A1
  LDA $1D
  .byte $4F
  BCC $EF2E
  LSR A
  .byte $34, $3B
@EEDC:
  .byte $3B
  ROL $5B,X
  .byte $1F
  AND $704C,Y
  BEQ $EED5
  BVC @EF51
  BEQ $EEA4
  EOR $8580,Y
  LDA $79,X
  EOR $5E,X
  .byte $77
  ROR $74
  EOR $F04F
  STA $F0F0
@EEF9:
  .byte $93, $7C
  BEQ @EEDC
  ROR $9DA3,X
  CMP $F0F0
  .byte $07, $07, $04, $04
  BEQ @EEF9
  BEQ $EF27
  .byte $13, $13
  ASL $4E1E,X
  .byte $73
  ORA ($11),Y
  .byte $7B
  ROL $F0F0,X
  ORA $05
  .byte $1C, $04, $0F
  BIT $F0
  .byte $33, $1F
@EF20:
  ROL $29,X
@EF22:
  AND #$7C
  ADC $26,X
  ADC $F0
  BEQ @EF68
  .byte $3C, $1F
  NOP
  ORA $1934,X
  BPL @EF22
  BEQ @EEB6
  ADC #$36
  NOP
  ROR $4B98,X
  CLI
  BEQ $EECF
  JMP ($3755)
  ADC $57,X
  EOR ($32,X)
  PLP
  BCC @EFB5
  .byte $7F
  LDA ($5A),Y
  LDX $CAC7
  .byte $64, $B7
  BEQ $EF41
@EF51:
  STY $6E
  .byte $74
@EF54:
  TXS
  DEY
@EF56:
  ADC $594B,X
  BEQ $EF4B
  .byte $BB
  CMP $9F,X
  LDA ($EA,X)
  NOP
  TAY
  BNE @EF54
  BEQ @EF56
  BEQ $EF58
@EF68:
  BEQ $EF5A
  .byte $12
  BEQ @EF71
  BEQ @EF8C
  BEQ $EF78
@EF71:
  BEQ $EF91
  .byte $73
  LSR $F0F0,X
  BVS @EFC3
  .byte $03
  BPL $EF84
  .byte $13
  BEQ @EF9D
  ORA $05
  BEQ @EFAB
  BEQ @EFCA
  BEQ @EFB2
  .byte $73
  ADC #$F0
  BEQ $EFFB
@EF8C:
  .byte $62
@EF8D:
  .byte $1B
  EOR $20,X
  LSR $351D,X
  .byte $12, $12
  JMP ($6863)
  STA ($36,X)
  .byte $4F
  BEQ @EF8D
@EF9D:
  BEQ $EFF7
  BEQ $EF91
@EFA1:
  CLI
  ADC $8250,Y
  EOR ($5A,X)
  ASL $B537,X
  .byte $9E
@EFAB:
  LDA $BE
  .byte $73, $80
  BEQ @EFA1
  .byte $7B
@EFB2:
  ADC ($F0),Y
  .byte $C3
@EFB5:
  STA $756E,X
  LDX $70
  .byte $89
  LSR $E667
  CMP $EDD6
@EFC1:
  LDX #$8B
@EFC3:
  BEQ @EFB5
  LDX $94,Y
  BEQ $EFB9
  .byte $04
@EFCA:
  .byte $04
  BEQ $EFBD
  .byte $07, $07
  BEQ @EFC1
@EFD1:
  BPL @EFE3
  BEQ $EFF4
  .byte $12, $12
  ADC $44,X
  ORA $701D,X
  EOR $0606
  BEQ @EFD1
  .byte $1F, $07
@EFE3:
  .byte $14, $2F, $1C, $34
  .byte $F0, $38  ; BEQ $9021
  JSR $F066 ; → bank switch?
  .byte $F0, $2A  ; BEQ $9018
  ROL A
  .byte $7F
  ROR $311C
  EOR $47
  ASL $1337,X
  .byte $22
  ADC $F062,Y
  .byte $F0, $4F  ; BEQ $904D
  .byte $5C
  .byte $F0
  `;
}

// $9000-$93FF (1024B): $9000-$93FF 代码/数据段5
function build_9000_93FF_segN(): readonly number[] {
  return asm`
  STA $4D35,Y
  .byte $93
  ADC $346E,X
  LSR $428F,X
  BVC @E037
  AND $9E87,Y
  STA ($A7,X)
  .byte $67, $BB
  BEQ $E005
  LDA $C159
  CPY $6F
  STA ($8F),Y
  ADC $8B,X
  ROR $505A,X
  CLV
  DEC $F0F0
@E025:
  .byte $B3, $D3
  BEQ $E019
  LDX $E9A4
  SBC #$F0
  BEQ @E037
  .byte $07
@E031:
  .byte $04, $04
@E033:
  BEQ @E025
  BEQ $E053
@E037:
  .byte $13, $13
  ASL $371E,X
  PLA
  ORA ($11),Y
  BEQ @E031
  BEQ @E033
  ORA $05
  .byte $04
@E046:
  .byte $1C
  BEQ $E058
  BEQ $E03B
  AND #$36
  BEQ @E082
  ROR $F05C,X
  ROL $F0
  BEQ @E046
  .byte $3C
@E057:
  ORA $344E,X
  AND $25,X
  .byte $1B
@E05D:
  BEQ @E09D
  BEQ @E0AD
  BEQ $E0BA
@E063:
  EOR ($8C),Y
  BEQ @E057
  BEQ $E059
  JMP ($366E)
  .byte $72
@E06D:
  .byte $57
  EOR $283E
  BEQ @E063
  BVS $E0F2
@E075:
  .byte $F0, $87  ; BEQ $8FFE
  .byte $80, $C7
  BEQ $E042
  BEQ @E06D
  STY $6E
@E07F:
  ROR $A3
@E081:
  .byte $87
@E082:
  BVS @E0DB
  EOR $91F0
@E087:
  STA $AD,X
@E089:
  BEQ $E042
  BEQ @E05D
  BEQ @E07F
  BEQ @E081
  BEQ @E097
@E093:
  BEQ $E09C
  BEQ @E087
@E097:
  BEQ @E089
  BEQ $E0B8
@E09B:
  BEQ @E0BB
@E09D:
  BEQ @E0B1
  PLA
  .byte $44
  BEQ @E093
  .byte $3F, $63
  BPL $E0AA
@E0A7:
  .byte $13
  PHP
  BEQ @E09B
  BEQ $E0B2
@E0AD:
  BEQ @E0D7
  BEQ $E0DC
@E0B1:
  BEQ @E0D1
  BEQ $E11E
  BEQ @E0A7
  BEQ @E11B
@E0B9:
  EOR $1B,X
@E0BB:
  JSR $F056 ; → bank switch?
  AND $1D,X
  .byte $12
  BEQ @E126
  BEQ @E12D
  ROL $4F,X
  BEQ @E0B9
  BEQ $E124
  BEQ $E0BD
@E0CD:
  .byte $57
  STA $50
  .byte $82
@E0D1:
  RTI
  EOR $362A,Y
  BEQ @E075
@E0D7:
  BEQ $E07E
  BEQ @E14E
@E0DB:
  BEQ @E0CD
  BEQ $E14F
  BEQ @E0D1
@E0E1:
  STA ($6E),Y
  .byte $74
  TXS
@E0E5:
  BVS $E070
  ROR $5B
@E0E9:
  BEQ @E0AD
  BEQ $E0B6
@E0ED:
  BEQ $E092
  BEQ @E0E1
  BEQ @E093
  BEQ @E0E5
@E0F5:
  .byte $04, $04
  BEQ @E0E9
  .byte $07, $07
  BEQ @E0ED
@E0FD:
  BPL @E10F
  BEQ @E120
  .byte $12, $12
  BEQ @E0F5
  ORA $341D,X
  .byte $63
@E109:
  ASL $06
  BEQ @E0FD
  .byte $07, $1F
@E10F:
  BEQ $E125
  ORA $F01D,X
  BEQ $E106
  SEC
  BEQ @E109
  BEQ $E145
@E11B:
  ALR #$7D
@E11D:
  EOR $F01E
@E120:
  .byte $47
  ROL $37,X
  JSR $F02E ; → bank switch?
@E126:
  .byte $4F
  BEQ $E16E
  BEQ @E11B
  BEQ @E11D
@E12D:
  BEQ $E18B
  LSR A
  .byte $93
@E131:
  AND $71,X
  EOR $4E8F,X
  .byte $43
  ANC #$45
  ROR $F067,X
  BEQ $E12E
  ROR A
  BEQ @E131
  BEQ $E0CF
@E143:
  .byte $7B
  CPY $A0
  ADC $75
  .byte $8F, $73, $8B
@E14B:
  LSR $965C
@E14E:
  LDX $9AF0
@E151:
  BEQ @E143
  BEQ $E145
  BEQ $E113
  BEQ $E12C
  BEQ @E14B
  .byte $07, $07, $04, $04
  BEQ @E151
  BEQ @E17F
  .byte $13, $13
  ASL $5B1E,X
  .byte $7F
  ORA ($11),Y
  .byte $57, $7B
  BEQ $E193
  ORA $05
@E171:
  .byte $04, $04, $1B, $0F
  BEQ $E167
  .byte $1F
  ROL $1C,X
  AND #$7C
  .byte $7F
  ROL $34
@E17F:
  BEQ @E171
  ORA $133C,Y
  AND $1C33,Y
  .byte $0F
  ORA ($F0),Y
  BEQ @E1CF
  ADC #$1D
  ROL $7E,X
  LDX #$3E
  JMP $9DF0
  BMI @E1E0
  EOR ($37),Y
@E199:
  .byte $57
  AND $32,X
  .byte $1C
  JMP ($736E)
  LDA $59
  ROR $C7B8,X
  BEQ $E217
  BEQ @E199
  JMP ($5D55)
@E1AC:
  .byte $82
@E1AD:
  .byte $6F
  ADC $4C
  LSR $84F0
  .byte $97
  LDA $7D93,X
  BEQ $E1A3
  NOP
  TAX
  BEQ @E1AD
  BEQ @E1C3
  BEQ $E1B1
  BEQ @E1D5
@E1C3:
  BEQ $E1B5
  BEQ @E1E4
  BEQ $E1D0
  BEQ $E1E9
  .byte $73
  EOR $F0F0,X
@E1CF:
  LSR $70,X
  .byte $03
  BPL @E1E7
  PHP
@E1D5:
  BEQ $E1F5
  ORA $05
  BEQ @E203
  BEQ $E221
  BEQ @E20A
  .byte $73
@E1E0:
  ADC #$F0
  BEQ @E23A
@E1E4:
  .byte $6F
  EOR $0F,X
@E1E7:
  .byte $14
  LSR $351D,X
  ORA $12
  ROL $62
  AND $5969,Y
  ANC #$F0
  BEQ $E1E6
  ALR #$F0
  BEQ @E22B
  ADC ($3A,X)
  ROR A
  .byte $3F, $44
  PLP
  ANC #$90
  .byte $57
@E203:
  .byte $4F, $9B
  EOR $F068,Y
  BEQ $E285
@E20A:
  .byte $72
  BEQ @E1AC
@E20D:
  ADC $8256,Y
  EOR $7067,X
  EOR $9242
  LDA $99,X
  LDX $8BB0,Y
  BEQ @E20D
  DEY
  LDY #$F0
  BEQ @E226
  .byte $04
  BEQ $E215
  .byte $07
@E226:
  .byte $07
  BEQ $E219
  BPL @E23B
@E22B:
  BEQ @E24C
  .byte $12, $12, $5B
  ROR $1D1D,X
  .byte $64, $7C
  ASL $06
  BEQ @E268
  .byte $07
@E23A:
  .byte $07
@E23B:
  .byte $14
  JSR $341C
  BEQ $E231
  .byte $37
  AND $F0F0,Y
@E245:
  ROL A
  .byte $1F, $7C, $7F, $32
  BPL $E26E
@E24C:
  .byte $47, $1F, $37, $14, $12, $62
  RTI
  BEQ @E245
  .byte $4F
  EOR $7D
  LDA ($1E,X)
@E25A:
  EOR $A6F0,Y
@E25D:
  LSR A
  .byte $34, $3B, $3B
  ROL $5B,X
  AND $9E1F,Y
  BVS $E2C5
@E268:
  .byte $8F
  BEQ @E2DF
  BEQ @E25D
  LSR $BB7D
  CMP $79
  LSR $5E,X
  .byte $77
  ROR $74
  EOR $B64F
  STY $F0,X
  .byte $8F
  STA ($B2,X)
@E27F:
  BEQ $E271
  ADC $F098,X
  SBC #$F0
  BEQ @E28F
  .byte $07, $04, $04
  BEQ @E29C
  BEQ @E27F
@E28F:
  ASL $111E,X
  ORA ($75),Y
  LSR $1C1C
  .byte $3F
  SEI
  ASL $0624
@E29C:
  ASL $1C
  .byte $04
  BEQ $E2C7
  BEQ $E293
  .byte $1F
  ROL $29,X
  AND #$7A
  ADC $33,X
  ROR $F0
  BEQ @E2C8
  .byte $3C, $1F
  NOP
  .byte $1C
  ORA ($3E),Y
  CLI
  BEQ $E2A7
  .byte $82
  ADC #$34
  ROL $98,X
  TYA
  ADC $F066,X
  .byte $92
  JMP ($373E)
  ADC $34,X
  AND #$57
@E2C8:
  .byte $64
  BCC @E339
  LDA ($98),Y
  .byte $72
  EOR $C9C7
  .byte $B7
  STA $F0,X
  BEQ @E25A
  .byte $62
  PLA
@E2D8:
  TXS
  ALR #$59
  .byte $87
  TAX
  BEQ $E2CF
@E2DF:
  .byte $BB
@E2E0:
  CMP $7D,X
  LDX #$EA
  NOP
@E2E5:
  TAY
  BNE @E2D8
  BEQ $E2DA
  .byte $04
  BEQ $E2F4
  BEQ @E2DF
  BEQ @E30E
  BEQ $E2E3
  BEQ @E2E5
  BEQ @E309
  .byte $4F, $73
  EOR ($41,X)
  .byte $3F
@E2FC:
  .byte $7B
  BPL $E302
  .byte $13
  PHP
  BEQ $E308
  BEQ @E32D
  BEQ $E345
  BEQ $E334
@E309:
  BEQ @E329
  .byte $73
  EOR $F0
@E30E:
  BEQ $E372
  .byte $6F
@E311:
  .byte $1B
  PHA
  JSR $1153
  .byte $12
  LSR A
  AND $6C,X
  .byte $63
  PLA
  STA ($2B,X)
  .byte $4F
  BEQ @E311
  BEQ $E37C
  BEQ $E315
@E325:
  .byte $3F
  ADC $8244,Y
@E329:
  AND $2A,X
  .byte $7B
  CLI
@E32D:
  LDA $9E,X
  LDX $5AA5,Y
  .byte $73
  BEQ @E325
  .byte $89
  TXA
  BEQ @E2FC
@E339:
  STA $6862,X
  LDX $59
  .byte $42
  BVS @E2E0
@E341:
  INC $CD
  SBC $72D6
  .byte $A3
  BEQ @E339
  LDA $F0C6,Y
  BEQ @E352
  .byte $04
  BEQ @E341
  .byte $07
@E352:
  .byte $07, $12, $12
  ORA $F01D,X
  BEQ $E34A
  .byte $14, $72
  ROR $1F,X
  .byte $1F, $42, $6F
@E361:
  ORA $1C
  ORA $2F,X
  .byte $07, $1F
  ROL A
  ROL A
  .byte $1C, $33
  BEQ $E35D
  BEQ $E3A7
  BEQ @E361
  ADC $4F
  ROR $1C81
  AND ($21),Y
  .byte $47, $12, $1F
  AND $37,X
  ADC $F057,Y
  BEQ @E3DE
@E382:
  EOR ($F0),Y
  STA $7E65,Y
  STY $94,X
  ROR $4534
  EOR $372A,X
  .byte $87
  EOR $A0B6,Y
  .byte $74, $8F, $5B
  STY $F0F0
  STX $BB,Y
  .byte $C3
  CMP $63
  STA ($69),Y
  .byte $8F
  NOP
  .byte $50, $7E  ; BVC $9422
  LDA ($B8,X)
  DEC $F0F0
  .byte $97
  STA $F0F0
  .byte $B3, $D3
  SBC #$E9
  BEQ $E3A3
  .byte $07, $07
@E3B5:
  .byte $04, $04
  BEQ $E3C8
  BEQ $E3AB
  ASL $111E,X
  ORA ($34),Y
  NOP
  .byte $1C, $1C
  BEQ @E3B5
  BEQ @E3EB
@E3C7:
  ORA $05
@E3C9:
  .byte $1C, $04
  BEQ $E3E8
  BEQ $E3BF
  AND #$36
  .byte $F0, $33  ; BEQ $9406
@E3D3:
  .byte $5B, $80
  BEQ @E3C7
  BEQ @E3C9
  .byte $F0, $3C  ; BEQ $9417
  ORA $1B43,X
@E3DE:
  .byte $1C
  .byte $F0, $3E  ; BEQ $941F
  BEQ @E3D3
  .byte $F0, $65  ; BEQ $944A
  .byte $34
  JMP $7EF0
  .byte $57, $57
@E3EB:
  BEQ $E3DD
  JMP ($364A)
  .byte $72, $33
  PLP
  .byte $F0, $57  ; BEQ $944C
  .byte $F0, $79  ; BEQ $9470
  BEQ @E382
  EOR $F070,Y
  LDX $F0F0
  .byte $F0
  `;
}

// $9400-$97FF (1024B): $9400-$97FF 代码/数据段6
function build_9400_97FF_segN(): readonly number[] {
  return asm`
  .byte $F0, $84  ; BEQ $9386
  .byte $62, $67, $97
@E405:
  ALR #$59
  .byte $F0, $87  ; BEQ $9390
  .byte $F0, $F0  ; BEQ $93FB
@E40B:
  .byte $F0, $A0  ; BEQ $93AD
  BVS @E48C
@E40F:
  .byte $D0, $D0  ; BNE $93E1
@E411:
  .byte $F0, $91  ; BEQ $93A4
  BEQ @E405
  BEQ @E41B
  BEQ $E420
  BEQ @E40B
@E41B:
  BEQ $E43A
  BEQ @E40F
  BEQ @E411
  BEQ @E435
  SEC
  .byte $74
@E425:
  BEQ @E445
  .byte $33, $6F, $03
  BPL @E43F
  PHP
  BEQ $E434
  BEQ @E459
  BEQ @E472
  BEQ $E460
@E435:
  BEQ @E455
  BEQ @E47D
  BEQ $E42B
  BEQ $E497
@E43D:
  EOR $1B,X
@E43F:
  JSR $115E
  .byte $12
  ALR #$35
@E445:
  BEQ $E4AA
  BEQ @E4B1
  ROL $4F,X
  BEQ @E43D
  BEQ $E4A8
  BEQ $E441
@E451:
  ADC $443F,Y
  .byte $82
@E455:
  EOR $F05A
  CLI
@E459:
  .byte $F0, $9F  ; BEQ $93FA
  BEQ $E401
  BEQ @E4B9
  BEQ @E451
  BEQ $E4D4
  BEQ @E455
@E465:
  STA $6862,X
  LDX $4D
  NOP
  STY $88,X
@E46D:
  BEQ @E425
  BEQ $E42E
  .byte $8B
@E472:
  TYA
  BEQ @E465
  BEQ $E430
  BEQ $E469
@E479:
  .byte $04, $04
  BEQ @E46D
@E47D:
  .byte $07, $07, $12, $12
  ORA $F01D,X
@E484:
  BEQ $E476
  .byte $14
  BEQ @E479
  .byte $1F
@E48A:
  .byte $1F, $57
@E48C:
  .byte $37
@E48D:
  ASL $06
  BEQ @E4C0
  .byte $07, $1F
  BEQ @E4C0
  ORA $F01D,X
  BEQ @E48A
  JSR $F0F0 ; → bank switch?
@E49D:
  BEQ @E4D7
  .byte $63
  JMP $1E40
  BEQ @E4EC
  .byte $1F
  JSR $4F37
  BEQ @E504
  BEQ @E49D
  BEQ @E4F4
  BEQ $E4A1
@E4B1:
  BEQ @E50F
  BEQ $E533
@E4B5:
  ADC ($35),Y
@E4B7:
  EOR ($8F),Y
@E4B9:
  ANC #$38
  LSR $F07E
  STX $F0,Y
@E4C0:
  STA ($F0,X)
  .byte $5B
  BEQ @E4B5
  BEQ @E4B7
  BEQ @E484
@E4C9:
  .byte $64
  STY $69,X
  .byte $8F
  NOP
  BVC $E45A
  LDY $F0
  LDX $F0F0
  BEQ $E457
@E4D7:
  BEQ @E4C9
  BEQ @E48D
  BEQ $E4B0
  BEQ $E4CF
  .byte $07, $07, $04, $04
  BEQ @E4F4
  BEQ @E4D7
  ASL $111E,X
  ORA ($7E),Y
@E4EC:
  EOR $1C1C,Y
  LSR $7A,X
  ORA $050F
@E4F4:
  ORA $04
  .byte $04
  BEQ $E51F
  BEQ $E4EB
  AND #$1F
  .byte $1B, $1C
@E4FF:
  .byte $7C, $80, $33
  ROL $F0,X
@E504:
  BEQ $E542
  ORA $3913,Y
  .byte $03
  BPL $E527
  .byte $33
  BEQ @E4FF
@E50F:
  .byte $43
  ADC #$35
  ORA $7F96,X
  ROL $F04E,X
  BEQ $E54A
  EOR #$51
  .byte $37
@E51D:
  .byte $27
  ORA $573E,X
  JMP ($746E)
  LDA $35
  ROR $B8
  .byte $BB
  BEQ @E59B
  BEQ @E51D
  JMP ($5C56)
  .byte $82, $3F
  EOR $6F85
  BEQ $E4D3
@E537:
  .byte $97
  LDA $8965,X
  NOP
  NOP
  .byte $93
  LDA $F0F0
  BEQ @E547
  BEQ $E54C
  BEQ @E537
@E547:
  BEQ $E539
  BEQ @E568
  BEQ @E55F
  BEQ $E53F
  .byte $44, $80
  BEQ $E571
  ALR #$6F
  .byte $03
  BPL @E56B
  PHP
  BEQ $E560
  BEQ $E585
  BEQ @E59E
@E55F:
  BEQ $E58C
  BEQ $E581
  .byte $73
  ADC #$F0
  BEQ @E5BE
@E568:
  .byte $6F
@E569:
  PHA
  .byte $0F
@E56B:
  .byte $14, $53
@E56D:
  ORA $06
  .byte $1C
  AND $26,X
  .byte $62
  AND $1E69,Y
  .byte $4F
  BEQ @E569
  BEQ $E5D4
  BEQ @E56D
  ADC ($32,X)
  AND $286A,Y
  ANC #$36
  EOR $9057,Y
  .byte $5C, $9B
  RTI
  .byte $4F
  BEQ $E52C
  BVS @E602
  BEQ $E581
@E591:
  ADC $5C57,Y
  .byte $82
  LSR $5935
  DEY
@E599:
  LDA $92,X
@E59B:
  STA $66BE,Y
@E59E:
  .byte $8B
  BEQ @E591
  LDA $F0A2,Y
  BEQ @E5AA
  .byte $04
  BEQ @E599
  .byte $07
@E5AA:
  .byte $07, $12, $12
  ORA $F01D,X
  BEQ $E5A2
  .byte $14, $74
@E5B4:
  ROR A
@E5B5:
  .byte $1F, $1F
  BVS $E607
@E5B9:
  ASL $06
  .byte $14
  ASL $07,X
@E5BE:
  .byte $07, $1F
  JSR $2A1C
  BEQ @E5B5
  BEQ $E600
  BEQ @E5B9
@E5C9:
  .byte $34, $37, $7C, $7F, $32
  BPL @E5F2
  .byte $47, $13
  PHP
  ASL $6236,X
  RTI
  BEQ @E5C9
  JSR $F044 ; → bank switch?
  STA $5159,Y
  .byte $7C
@E5E0:
  STA $4A,X
@E5E2:
  .byte $34, $52, $3B
  ASL $362C,X
  ADC $9E
  .byte $6F, $74, $8F, $5B
  EOR $F0
  BEQ @E5E2
@E5F2:
  ROR $BBB8,X
  ADC $5D57,Y
  .byte $77
  LSR $6644
  TXA
  LDX $94,Y
@E5FF:
  BEQ @E5B4
  .byte $74
@E602:
  STX $F0F0
  LDX $E998
  SBC #$F0
  BEQ @E613
  .byte $07
  BEQ @E5FF
@E60F:
  .byte $04, $04
  ORA ($11),Y
@E613:
  .byte $4F
  ROR A
  ASL $561E,X
  ADC ($1C),Y
  .byte $1C
  BEQ @E62C
  BEQ @E60F
  .byte $07, $1F
@E621:
  BIT $0F
  ORA $05
  .byte $1C, $1C
  EOR $2976,X
  ROL $78,X
@E62C:
  .byte $7C
  BEQ $E661
  BEQ @E621
  .byte $3C
  ROL $3A1F,X
@E635:
  ORA $351C,Y
  .byte $12
  LSR $4C,X
  EOR $4E8E,X
  .byte $8B, $9E
  LDX #$F0
  .byte $6F
  BEQ @E635
  JMP ($446E)
  ADC $3D,X
  .byte $27
  AND $2A,X
  .byte $57, $64
  LDA $AE9A,X
  ROR $C7C3,X
  BEQ $E647
  BCC @E5E0
  STY $6E
@E65B:
  .byte $74
  TXS
@E65D:
  JMP $6557
  LSR $87AA
@E663:
  DEC $D6,X
@E665:
  LDA ($C7,X)
@E667:
  INX
  NOP
  BEQ @E65B
  BEQ @E65D
  BEQ @E673
  BEQ $E678
@E671:
  BEQ @E663
@E673:
  BEQ @E665
  BEQ @E667
  EOR ($6B),Y
  BEQ @E68D
@E67B:
  .byte $6F, $74
  BEQ @E6BE
  BEQ @E671
  .byte $03
  BPL @E697
  PHP
  BEQ $E68C
  BEQ @E6A7
  BEQ @E67B
  EOR $77
@E68D:
  BEQ @E6BA
  .byte $74
  ADC ($F0),Y
  LSR $F0,X
  PLP
@E695:
  EOR $27,X
@E697:
  BIT $1C5E
  BPL @E6BA
  .byte $13
@E69D:
  AND $59,X
  .byte $82, $8F, $4F, $74
  BEQ @E695
  BEQ @E697
@E6A7:
  BEQ @E6F4
@E6A9:
  ADC $514B,Y
  .byte $82
  PLP
  RTI
  ANC #$42
  EOR $A55A,Y
  LDX $8073,Y
  BEQ @E6A9
  .byte $9E
@E6BA:
  LDY #$7B
  ADC ($9D),Y
@E6BE:
  ROR $A675
  JMP $4F70
  .byte $67
@E6C5:
  .byte $89
  LDA $D6ED,Y
@E6C9:
  ROR $F0B0,X
  BEQ @E6BE
@E6CE:
  BEQ @E69D
  .byte $9F, $04, $04
  BEQ @E6C5
  .byte $07
@E6D6:
  .byte $07
  BEQ @E6C9
@E6D9:
  .byte $12, $12, $52, $77
  BEQ @E6FE
  .byte $72, $5B
@E6E1:
  .byte $34, $62
  ORA $1C1D,X
  .byte $04
  BEQ @E6D9
  ASL $12
  .byte $14, $2F
  ROL A
  .byte $1F
  BEQ @E6E1
  BEQ $E72B
  .byte $7F
@E6F4:
  .byte $83
@E6F5:
  .byte $57
  ROR $3432
  AND ($33),Y
  EOR $47
  .byte $1C
@E6FE:
  ORA ($1F),Y
  ASL $36,X
  .byte $4F
  BEQ @E6F5
  BEQ @E764
  LDA ($A5,X)
@E709:
  ROR $4D91
  .byte $7C, $32
  ROR $8F5D
  RTI
  AND #$38
  ROL $5B72
  BEQ @E709
  STY $C481
  INY
  STA $B6
@E71F:
  BVS @E6CE
  STA ($6F),Y
  ADC $8F,X
  JMP $5B65
  BVC $E7A8
  LDY $F0F0,X
  BEQ @E71F
  BEQ $E71A
  TAX
  .byte $D3
  BNE @E6D6
  BEQ $E727
  .byte $07, $07
  BEQ $E72B
@E73B:
  .byte $04, $04
  ORA ($11),Y
  AND ($37,X)
  ASL $401E,X
  ADC $1C
  .byte $1C, $0F, $0F
@E749:
  BEQ @E73B
  ASL $1F
@E74D:
  BEQ $E75E
  .byte $1C
  ORA $F0
  .byte $1B
  EOR $76
  BEQ $E78B
  BEQ @E749
  BEQ @E781
  BEQ @E74D
@E75D:
  BEQ @E79B
  .byte $1F, $4F
@E761:
  AND $1B
  .byte $1C
@E764:
  ORA $33F0,X
  BVC $E6F7
  BEQ @E7B7
  BEQ @E75D
  BEQ @E7C5
  BEQ @E761
@E771:
  JMP ($426E)
  .byte $73
  EOR #$33
  AND #$35
  BEQ $E7DF
  .byte $80
@E77C:
  LDA $95F0,X
  BEQ @E771
@E781:
  BEQ $E773
  BEQ @E7FE
@E785:
  STY $6E
  .byte $67
  LDY $57
  JMP $4E65
  BEQ $E716
@E78F:
  STA ($D6,X)
@E791:
  LDY #$C5
@E793:
  BEQ @E785
  BEQ $E74C
  BEQ $E789
@E799:
  BEQ @E79F
@E79B:
  BEQ $E7A4
  BEQ @E78F
@E79F:
  BEQ @E791
  BEQ @E793
  AND $F05E
  .byte $12
  ALR #$5B
  BEQ @E7D3
@E7AB:
  BEQ $E7CA
  .byte $03
  BPL $E7B8
  .byte $13
@E7B1:
  BEQ $E7B8
  BEQ @E7D3
  BEQ @E7EC
@E7B7:
  .byte $F0, $51  ; BEQ $980A
  BEQ @E7AB
  .byte $F0, $66  ; BEQ $9823
  BEQ @E7FE
  BEQ @E7B1
@E7C1:
  EOR $1B,X
  ANC #$5E
@E7C5:
  BPL $E7E4
  .byte $12
  ASL $3635,X
  .byte $F0, $74  ; BEQ $9841
  .byte $F0, $5B  ; BEQ $982A
  BEQ @E7C1
  .byte $F0, $6F  ; BEQ $9842
@E7D3:
  .byte $F0, $58  ; BEQ $982D
@E7D5:
  ADC $504B,Y
  .byte $82, $34
  EOR ($42,X)
  .byte $37
  EOR $F072,Y
  LDY $F0
  .byte $8B
  BEQ @E7D5
  BEQ $E786
  .byte $F0, $7C  ; BEQ $9865
@E7E9:
  STA ($63),Y
@E7EB:
  .byte $74
@E7EC:
  TXS
  .byte $70, $59  ; BVS $9848
  ROR $4E
  BEQ @E77C
  BEQ $E7A5
  BEQ @E799
  BEQ @E7E9
  BEQ @E7EB
  BEQ $E79C
  .byte $04
@E7FE:
  .byte $04
  .byte $F0
  `;
}

// $9800-$9BFF (1024B): $9800-$9BFF 代码/数据段7
function build_9800_9BFF_segN(): readonly number[] {
  return asm`
  BEQ @E809
  .byte $07
  .byte $F0, $F0  ; BEQ $97F5
  .byte $12, $12
  .byte $F0, $F0  ; BEQ $97F9
@E809:
  BEQ $E82A
  .byte $33
  ADC $29
  ROL A
@E80F:
  ORA $1C1D,X
  ORA $F0
  BEQ $E81C
  .byte $12
  BEQ $E82D
  BEQ @E83A
  BEQ $E80D
  BEQ @E857
  BEQ $E811
@E821:
  EOR ($64,X)
@E823:
  BEQ @E84F
@E825:
  PLP
  .byte $57
  BEQ @E870
  ORA $1F2A,X
  AND $4FF0
  BEQ @E821
  BEQ @E823
  BEQ @E825
@E835:
  BEQ $E8B6
  BEQ $E886
@E839:
  .byte $3F
@E83A:
  .byte $6F
  EOR $4C8F,X
  AND $42,X
  AND $67F0,Y
  BEQ @E835
  BEQ @E8B1
  BEQ @E839
@E849:
  .byte $F0, $AF  ; BEQ $97FA
  .byte $F0, $8A  ; BEQ $97D7
@E84D:
  .byte $63, $87
@E84F:
  ADC $8F,X
  JMP $5A65
  BVC @E8D4
  .byte $97
@E857:
  BEQ @E849
  .byte $F0, $9A  ; BEQ $97F5
  BEQ @E84D
  TAX
  .byte $D3
  BEQ @E80F
  BEQ $E853
  .byte $07, $07
  BEQ @E857
  .byte $04, $04
  ORA ($11),Y
  ADC #$3A
  ASL $491E,X
@E870:
  ADC ($1C),Y
  .byte $1C
  BEQ @E884
  BEQ $E89B
  .byte $07, $1F
@E879:
  .byte $0F, $1B
  ORA $05
  BEQ $E89B
  ROR $46,X
  AND #$36
  .byte $7C
@E884:
  ROR $F0F0,X
  BEQ @E879
  .byte $3C
  AND $1F
@E88C:
  AND $101B,Y
  ORA $5712,X
  .byte $34
  EOR $369B,X
  .byte $4F, $9E
  LDX #$F0
  BEQ @E88C
  ROL $4930,X
  ANC #$51
@E8A1:
  .byte $32
  PLP
  ASL $5742,X
  RTI
  STA $59BE,Y
  .byte $7F, $C3, $C7
  BEQ @E91D
  BEQ @E8A1
@E8B1:
  JMP ($5D55)
  .byte $82
  ROL $5957,X
  .byte $4F, $9F
  BVS $E862
  DEC $7E,X
  TYA
@E8BF:
  BEQ $E89D
  BEQ $E8B3
  STA ($7A),Y
  BEQ $E930
  BEQ @E932
  BEQ $E8BB
  BEQ $E8BD
  BEQ @E8BF
  EOR ($6B),Y
  BEQ @E8E5
@E8D3:
  .byte $6F
@E8D4:
  .byte $74
  BEQ $E916
  BEQ $E8F6
  .byte $03
  BPL $E8E4
  .byte $13
@E8DD:
  BEQ $E8E4
  BEQ @E8FF
  BEQ @E8D3
  EOR ($6B),Y
@E8E5:
  BEQ @E912
  .byte $6F, $74
  BEQ @E92A
  BEQ $E915
@E8ED:
  EOR $0F,X
@E8EF:
  .byte $14
  LSR $1D05,X
  ASL $12
  AND $36,X
@E8F7:
  AND $2B69,Y
  .byte $4F
  BEQ @E8ED
  BEQ @E8EF
@E8FF:
  BEQ @E94C
@E901:
  ADC ($31,X)
  AND $296A,Y
  .byte $34
@E907:
  ROL A
  .byte $37
  ALR #$50
  LDA $CA
  ROR $80
  BEQ @E901
  .byte $9E
@E912:
  STA $7B,X
  EOR $5679,Y
  EOR $4C82,X
  EOR ($5A,X)
  .byte $4F
@E91D:
  ADC ($8B),Y
  BCS @E8F7
@E921:
  .byte $74
  STA $F0F0,Y
  BEQ @E8DD
  STA $047C,X
@E92A:
  .byte $04
  BEQ @E91D
  .byte $07, $07
  BEQ @E921
  .byte $12
@E932:
  .byte $12, $52, $77
  BEQ $E94B
  .byte $72, $5B, $63
@E93A:
  ORA $1F1F,X
  .byte $04, $1C
  BEQ $E970
  ASL $06
  JSR $F014 ; → bank switch?
  ANC #$F0
  BEQ @E93A
  BEQ @E9BE
@E94C:
  ROR $6E,X
  CLI
  .byte $34
  ORA $1C32,X
  ROL $1147
  ASL $2013,X
  .byte $37, $5C
  BEQ $E94D
  BEQ @E9A4
  STA $8B,X
@E961:
  NOP
  .byte $57
  AND $59,X
  PLP
  LSR A
  .byte $52
@E968:
  .byte $3B
  ORA $2B41,X
  AND $4367,Y
  BEQ @E961
  BEQ $E8F4
  .byte $BB, $BB, $9F
  LDA ($59,X)
  .byte $7B
  ADC $5E56,Y
  .byte $77
  JMP $5C5A
  EOR $73
  LDY $F0
  BEQ @E907
  TXS
  BEQ @E968
  CPY $96
  .byte $93
  ADC $FFFF,X
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
@E9A4:
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
@E9BE:
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  `;
}

// $9C00-$9FFF (1024B): $9C00-$9FFF 代码/数据段8
function build_9C00_9FFF_segN(): readonly number[] {
  return asm`
.byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  `;
}

// ═══════════════════════════════════════════════════
// Assemble all sections into full 8KB bank
// ═══════════════════════════════════════════════════
const _PRG_BANK_27: readonly number[] = [
  ...build_8000_83FF_segN(),
  ...build_8400_87FF_segN(),
  ...build_8800_8BFF_segN(),
  ...build_8C00_8FFF_segN(),
  ...build_9000_93FF_segN(),
  ...build_9400_97FF_segN(),
  ...build_9800_9BFF_segN(),
  ...build_9C00_9FFF_segN(),
];
