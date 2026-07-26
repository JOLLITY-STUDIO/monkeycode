/**
 * PRG-ROM MMC3 bank 12 (8KB) — function-based assembly
 * Mapper: 4 (MMC3) | CPU: $8000-$9FFF
 * CDL: code=1674 data=6088 unaccessed=430
 *
 * 功能: 音频/音效引擎 (APU寄存器) + 音乐数据
 *
 * Pattern: 参考 bank_31.ts
 *   每个 build_xxx() 函数返回其覆盖地址范围的 raw 6502 字节，
 *   最后通过 spread 拼成完整的 8KB 数组
 */


import { asm } from '../_6502asm';
export { _PRG_BANK_12 as default };

console.log('[prg_12_audio] loaded');

// $8000-$83FF (1024B): $8000-$83FF 代码/数据段1
function build_8000_83FF_seg1(): readonly number[] {
  return asm`
  LDX #$05
@E002:
  LDY $0700,X
  CPY #$32
  BCS @E017
  LDY #$07
  STY $8000
  LDY $07FC
  STY $8001
  JMP $805E
@E017:
  CPY #$44
  BCS @E02B
  LDY #$07
  STY $8000
  LDY #$0D
  STY $8001
  STY $07FC
  JMP $805E
@E02B:
  CPY #$51
  BCS @E03F
  LDY #$07
  STY $8000
  LDY #$0E
  STY $8001
  STY $07FC
  JMP $805E
@E03F:
  CPY #$5C
  BCS @E053
  LDY #$07
  STY $8000
  LDY #$0F
  STY $8001
  STY $07FC
  JMP $805E
@E053:
  LDY #$07
  STY $8000
  LDY $07FC
  STY $8001
  DEX
  BPL @E002
  LDX #$05
@E063:
  LDY $0700,X
  BEQ @E0B7
  CPY #$72
  BCS @E0B7
  CPY #$31
  BNE @E0AF
  LDA #$19
  STA $07DF
  STA $07CF
  STA $07D1
  STA $07D2
  STA $07D3
  STA $07D5
  STA $07D6
  STA $07D7
  STA $07D9
  STA $07DA
  STA $07DB
  STA $07DD
  STA $07DE
  LDA #$0A
  STA $07D0
  STA $07D4
  STA $07D8
  STA $07DC
  LDA #$00
  STA $0700,X
  JMP $80B7
@E0AF:
  JSR $8349 ; → bank switch?
  LDA #$00
  STA $0700,X
@E0B7:
  DEX
  BPL @E063
  LDA #$27
  STA $F0
  LDA #$07
  STA $F1
  LDA #$00
  STA $F2
  LDY #$08
  STY $F3
@E0CA:
  LDA $0706
  LSR A
  BCC @E0D2
  ORA #$80
@E0D2:
  STA $0706
  BCC @E10C
  LDX $F2
  DEC $0707,X
  BNE @E0E1
  JSR $83CB ; → bank switch?
@E0E1:
  LDX $F2
  DEC $0709,X
  BNE @E109
  LDY #$02
  LDA ($F0),Y
  STA $F6
  INY
  LDA ($F0),Y
  STA $F7
  INY
  LDA ($F0),Y
  PHA
  CLC
  ADC #$02
  STA ($F0),Y
  PLA
  TAY
  LDA ($F6),Y
  STA $0709,X
  INY
  LDA ($F6),Y
  STA $070A,X
@E109:
  JSR $81DB ; → bank switch?
@E10C:
  CLC
  LDA #$10
  ADC $F0
  STA $F0
  LDA #$04
  ADC $F2
  STA $F2
  DEC $F3
  BNE @E0CA
  LDA #$27
  STA $F0
  STA $FC
  LDA #$07
  STA $F1
  STA $FD
  LDA #$03
  STA $F2
  LDA #$11
  STA $F3
@E131:
  LDA $0706
  AND $F3
  BEQ @E14C
  AND #$0F
  BNE @E149
  CLC
  LDA #$40
  ADC $F0
  STA $F0
  LDA #$00
  ADC $F1
  STA $F1
@E149:
  JSR $816E ; → bank switch?
@E14C:
  CLC
  LDA #$10
  ADC $FC
  STA $FC
  STA $F0
  LDA #$00
  ADC $FD
  STA $FD
  STA $F1
  ASL $F3
  DEC $F2
  BPL @E131
  LDA $07E9
  BEQ @E16D
  LDA #$00
  STA $4015
@E16D:
  RTS
  LDA #$03
  EOR $F2
  ASL A
  ASL A
  TAX
  LDY #$06
  LDA ($F0),Y
  PHA
  LDA $F2
  STA $FB
  CMP #$01
  BNE @E189
  PLA
  AND #$0F
  ORA #$80
  BNE @E1A4
@E189:
  PLA
  ORA #$30
  STA $4000,X
  LDA #$10
  LDY #$05
  AND ($F0),Y
  BNE @E1A7
  LDA #$08
  LDY $FB
  STA $07E4,Y
  STA $4001,X
  JMP $81B1
@E1A4:
  STA $4000,X
@E1A7:
  LDY #$08
  LDA ($F0),Y
  BPL @E1DA
  AND #$7F
  STA ($F0),Y
  LDY #$07
  LDA ($F0),Y
  STA $4002,X
  INY
  LDA ($F0),Y
  ORA #$18
  LDY $FB
  BEQ @E1CA
  CPY #$01
  BEQ @E1CA
  CMP $07E0,Y
  BEQ @E1DA
@E1CA:
  STA $4003,X
  STA $07E0,Y
  LDA $07E4,Y
  BNE @E1DA
  LDA #$00
  STA $07E0,Y
@E1DA:
  RTS
  LDY #$05
  LDA ($F0),Y
  TAX
  AND #$F0
  STA $F6
  AND #$20
  BEQ @E1EE
  LDA #$0F
  STA $F7
  BNE @E233
@E1EE:
  TXA
  AND #$0F
  STA $F7
  LDY $F3
  DEY
  LDX $07CF,Y
  BEQ @E233
  DEX
  TXA
  STA $07CF,Y
  BNE @E233
  LDA $F7
  CLC
  ADC #$01
  CMP #$0F
  STA $F7
  BNE @E217
  LDA #$00
  STA $07D7,Y
  LDA #$80
  STA $07E8
@E217:
  LDA $F7
  ORA $F6
  TAX
  LDY #$05
  STA ($F0),Y
  TXA
  AND #$0F
  STA $F7
  LDY $F3
  DEY
  LDX $07CF,Y
  BNE @E233
  LDA $07D7,Y
  STA $07CF,Y
@E233:
  LDX $F2
  LDA $070A,X
  SEC
  SBC $F7
  BPL @E23F
  LDA #$00
@E23F:
  ORA $F6
  LDY #$06
  STA ($F0),Y
  LDX $F3
  DEX
  LDA $07AF,X
  CMP #$01
  BEQ @E257
  CMP #$02
  BNE @E256
  JMP $82D2
@E256:
  RTS
@E257:
  LDA $07C7,X
  ASL A
  TAY
  LDA $8269,Y
  STA $F9
  LDA $826A,Y
  STA $FA
  JMP ($00F9)
  .byte $97, $82, $97, $82
  LDY $82,X
  CMP #$82
  LDY $82,X
  .byte $97, $82, $97, $82
  ADC $9282,X
  .byte $82
  ADC $A982,X
  ORA ($18,X)
  ADC $07B7,X
  LDY #$07
  STA ($F0),Y
  LDA $07BF,X
  ADC #$00
  INY
  STA ($F0),Y
  JMP $82A4
  LDA #$02
  JMP $827F
  LDA $07B7,X
  LDY #$07
  STA ($F0),Y
  LDA $07BF,X
  INY
  STA ($F0),Y
  LDA $07C7,X
  CLC
  ADC #$01
  CMP #$0A
  BNE @E2B0
  LDA #$00
@E2B0:
  STA $07C7,X
  RTS
  LDA $07B7,X
  SEC
  SBC #$01
  LDY #$07
  STA ($F0),Y
  LDA $07BF,X
  SBC #$00
  INY
  STA ($F0),Y
  JMP $82A4
  LDA $07B7,X
  SEC
  SBC #$02
  JMP $82BA
  LDA $07C7,X
  ASL A
  TAY
  LDA $82E4,Y
  STA $F9
  LDA $82E5,Y
  STA $FA
  JMP ($00F9)
  ASL $2B83
  .byte $83
  RTI
  .byte $83
  ANC #$83
  ASL $F483
  .byte $82
  ORA #$83
  .byte $F4, $82
  LDA #$03
  CLC
  ADC $07B7,X
  LDY #$07
  STA ($F0),Y
  LDA $07BF,X
  ADC #$00
  INY
  STA ($F0),Y
  JMP $831B
  LDA #$06
  JMP $82F6
  LDA $07B7,X
  LDY #$07
  STA ($F0),Y
  LDA $07BF,X
  INY
  STA ($F0),Y
  LDA $07C7,X
  CLC
  ADC #$01
  CMP #$08
  BNE @E327
  LDA #$00
@E327:
  STA $07C7,X
  RTS
  LDA $07B7,X
  SEC
  SBC #$03
  LDY #$07
  STA ($F0),Y
  LDA $07BF,X
  SBC #$00
  INY
  STA ($F0),Y
  JMP $831B
  LDA $07B7,X
  SEC
  SBC #$06
  JMP $8331
  STX $F5
  LDA #$00
  STA $0700,X
  DEY
  TYA
  ASL A
  TAY
  LDA $8BDA,Y
  STA $F0
  LDA $8BDB,Y
  STA $F1
  LDY #$00
@E360:
  LDA ($F0),Y
  BPL @E36C
  LDX #$0F
  STX $4015
  LDX $F5
  RTS
@E36C:
  STA $F4
  LDA #$08
  CLC
  SBC $F4
  TAX
  LDA #$00
  STA $07A7,X
  STA $07AF,X
  STA $07E3
  STA $07E2
  STA $07EA,X
  STA $07CF,X
  STA $07D7,X
  STA $07DF
  STA $07F4,X
  STA $07E8
  LDA $F4
  ASL A
  ASL A
  ASL A
  ASL A
  TAX
  INY
  LDA ($F0),Y
  STA $0727,X
  INY
  LDA ($F0),Y
  STA $0728,X
  LDA #$00
  STA $072C,X
  LDA #$0F
  STA $0730,X
  LDA $F4
  ASL A
  ASL A
  TAX
  LDA #$01
  STA $0707,X
  LSR A
  LDX $F4
@E3BE:
  ROL A
  DEX
  BPL @E3BE
  ORA $0706
  STA $0706
  INY
  BPL @E360
  LDA #$CF
  LDY #$05
  AND ($F0),Y
  STA ($F0),Y
  LDY #$00
  LDA ($F0),Y
  STA $F4
  INY
  LDA ($F0),Y
  STA $F5
  DEY
@E3DF:
  LDA ($F4),Y
  .byte $10, $21  ; BPL $8404
  INY
  CMP #$E0
  BCC @E3ED
  JSR $84C9 ; → bank switch?
  BPL @E3DF
@E3ED:
  CMP #$B0
  BCC @E3F4
  INY
  BNE @E3DF
@E3F4:
  AND #$3F
  TAX
  LDA $8725,X
  LDX $F2
  STA $0707,X
  .byte $9D
  `;
}

// $8400-$87FF (1024B): $8400-$87FF 代码/数据段2
function build_8400_87FF_seg2(): readonly number[] {
  return asm`
  PHP
  .byte $07
  .byte $10, $DB  ; BPL $83DF
  INY
  PHA
  TYA
  LDY #$00
  CLC
  ADC $F4
  STA ($F0),Y
  INY
  LDA #$00
  ADC $F5
  STA ($F0),Y
  PLA
  LDX #$05
  CPX $F3
  BEQ @E422
  LDX #$01
  CPX $F3
  BCC @E42E
@E422:
  CMP #$10
  BEQ @E435
  STA $F4
  LDA #$00
  STA $F5
  BEQ @E45C
@E42E:
  TAX
  AND #$0F
  CMP #$0C
  BNE @E43F
@E435:
  LDY #$05
  LDA #$20
  ORA ($F0),Y
  STA ($F0),Y
  BNE @E4A6
@E43F:
  ASL A
  TAY
  LDA $870D,Y
  STA $F4
  LDA $870E,Y
  STA $F5
  TXA
  AND #$F0
  LSR A
  LSR A
  LSR A
  LSR A
  TAX
  BEQ @E45C
@E455:
  LSR $F5
  ROR $F4
  DEX
  BNE @E455
@E45C:
  LDA $F4
  LDX $F3
  DEX
  LDY $07F4,X
  BEQ @E48F
  SEC
  SBC $07A7,X
  BCC @E478
  LDY #$07
  STA ($F0),Y
  STA $07B7,X
  LDA $F5
  JMP $8484
@E478:
  LDY #$07
  STA ($F0),Y
  STA $07B7,X
  LDA $F5
  SEC
  SBC #$01
  ORA #$80
  INY
  STA ($F0),Y
  STA $07BF,X
  JMP $84A6
@E48F:
  CLC
  ADC $07A7,X
  LDY #$07
  STA ($F0),Y
  STA $07B7,X
  INY
  LDA $F5
  ADC #$00
  ORA #$80
  STA ($F0),Y
  STA $07BF,X
@E4A6:
  LDX $F3
  DEX
  LDA #$00
  STA $07F4,X
  LDA $07EA,X
  BNE @E4C0
  LDX $F2
  LDA #$01
  STA $0709,X
  LDA #$00
  LDY #$04
  STA ($F0),Y
@E4C0:
  LDX $F2
  LDA $0708,X
  STA $0707,X
  RTS
  AND #$1F
  ASL A
  TAX
  LDA $84DA,X
  STA $F6
  LDA $84DB,X
  STA $F7
  JMP ($00F6)
  .byte $44
  STA $07
  .byte $87
  EOR ($86,X)
  .byte $5F
  STA $17
  STX $70
  STX $07
  .byte $87, $07, $87
  SEI
  STA $85
  STA $AF
  STA $C6
  STA $EF
  STA $81
  STX $07
  .byte $87
  BCC $E480
  ORA #$87
  .byte $07, $87
  NOP
  STA $3B
  STA $32
  STA $07
  .byte $87, $07, $87, $07, $87, $07, $87
  STA $B886,Y
  STX $D7
  STX $07
  .byte $87, $07, $87
  INC $86,X
  EOR $86,X
  LDA #$00
  STA $07F2
  STA $0700
  STA $0701
  STA $0702
  STA $0703
  STA $0704
  STA $0705
  RTS
  LDX $F3
  DEX
  LDA #$00
  STA $07EA,X
  RTS
  LDX $F3
  DEX
  LDA #$0F
  STA $07EA,X
  RTS
  LDA ($F4),Y
  INY
  STY $F6
  ASL A
  TAX
  LDA $8754,X
  TAY
  LDA $8755,X
  TAX
  TYA
  LDY #$02
  STA ($F0),Y
  INY
  TXA
  STA ($F0),Y
  LDY $F6
  RTS
  LDA ($F4),Y
  INY
  STY $F6
  LDY $07DF
  BNE @E575
  STA $F7
  LDA #$F0
  LDY #$05
  AND ($F0),Y
  ORA $F7
  STA ($F0),Y
@E575:
  LDY $F6
  RTS
  LDA ($F4),Y
  INY
  TAX
  LDA ($F4),Y
  STX $F4
  STA $F5
  LDY #$00
  RTS
  LDA ($F4),Y
  INY
  TAX
  LDA ($F4),Y
  INY
  PHA
  TYA
  PHA
  LDY #$09
  LDA ($F0),Y
  TAY
  PLA
  CLC
  ADC $F4
  STA ($F0),Y
  DEY
  LDA #$00
  ADC $F5
  STA ($F0),Y
  DEY
  TYA
  LDY #$09
  STA ($F0),Y
  STX $F4
  PLA
  STA $F5
  LDY #$00
  RTS
  LDY #$09
  LDA ($F0),Y
  TAY
  INY
  LDA ($F0),Y
  INY
  STA $F5
  LDA ($F0),Y
  STA $F4
  TYA
  LDY #$09
  STA ($F0),Y
  LDY #$00
  RTS
  LDA ($F4),Y
  INY
  TAX
  TYA
  PHA
  LDY #$09
  LDA ($F0),Y
  TAY
  PLA
  CLC
  ADC $F4
  STA $F4
  STA ($F0),Y
  DEY
  LDA #$00
  ADC $F5
  STA $F5
  STA ($F0),Y
  DEY
  TXA
  STA ($F0),Y
  DEY
  TYA
  LDY #$09
  STA ($F0),Y
  LDY #$00
  RTS
  STY $F6
  LDY #$09
  LDA ($F0),Y
  TAY
  INY
  LDA ($F0),Y
  SEC
  SBC #$01
  STA ($F0),Y
  BEQ @E60D
  INY
  LDA ($F0),Y
  INY
  STA $F5
  LDA ($F0),Y
  STA $F4
  LDY #$00
  RTS
@E60D:
  INY
  INY
  TYA
  LDY #$09
  STA ($F0),Y
  LDY $F6
  RTS
  STY $F6
  LDY #$05
  LDA ($F0),Y
  ORA #$10
  STA ($F0),Y
  LDX $F3
  DEX
  TXA
  EOR #$07
  ASL A
  ASL A
  AND #$0F
  TAX
  LDY $F6
  LDA ($F4),Y
  STA $4001,X
  INY
  LDX $F3
  DEX
  TXA
  AND #$03
  TAX
  LDA #$00
  STA $07E4,X
  RTS
  LDA ($F4),Y
  INY
  STY $F6
  STA $F7
  LDY #$05
  LDA #$3F
  AND ($F0),Y
  ORA $F7
  STA ($F0),Y
  LDY $F6
  RTS
  LDA #$7F
  AND $0706
  STA $0706
  LDX $F3
  DEX
  TXA
  EOR #$07
  ASL A
  ASL A
  AND #$0F
  TAX
  LDA #$30
  STA $4000,X
  PLA
  PLA
  RTS
  LDX $F3
  DEX
  LDA ($F4),Y
  INY
  ASL A
  BCS @E67C
  STA $07F4,X
@E67C:
  LSR A
  STA $07A7,X
  RTS
  LDX $F3
  DEX
  LDA ($F4),Y
  STA $07AF,X
  LDA #$00
  STA $07C7,X
  INY
  RTS
  LDX $F3
  DEX
  LDA #$00
  STA $07AF,X
  RTS
  LDA #$0F
  STA $4015
  LDA $07E8
  BNE @E6B7
  LDA #$0F
  STA $4010
  LDA #$00
  STA $4012
  LDA #$0C
  STA $4013
  LDA #$1F
  STA $4015
@E6B7:
  RTS
  LDA #$0F
  STA $4015
  LDA $07E8
  BNE @E6D6
  LDA #$0F
  STA $4010
  LDA #$03
  STA $4012
  LDA #$20
  STA $4013
  LDA #$1F
  STA $4015
@E6D6:
  RTS
  LDA #$0F
  STA $4015
  LDA $07E8
  BNE @E6F5
  LDA #$0F
  STA $4010
  LDA #$0B
  STA $4012
  LDA #$13
@E6ED:
  STA $4013
  LDA #$1F
  STA $4015
@E6F5:
  RTS
  LDA ($F4),Y
  INY
  STY $F6
  LDX $F3
  DEX
  STA $07CF,X
  STA $07D7,X
  LDY $F6
  RTS
  INY
  RTS
  INY
  INY
  INY
  RTS
  LDX $4E06
  ASL $F3
  ORA $9E
  ORA $4D
  ORA $01
  ORA $B9
  .byte $04
  ADC $04,X
  AND $04,X
  SED
  .byte $03, $BF, $03, $89, $03
  BRK
  ORA ($02,X)
  .byte $03, $04
  ORA $06
  .byte $07
  PHP
  ORA #$0A
  .byte $0C
  ASL $100F
  .byte $12, $14
  ORA $18,X
@E738:
  .byte $1B, $1C
  ASL $2420,X
  PLP
  ROL A
  BMI $E777
  SEC
  .byte $3C
  RTI
  PHA
  BVC @E79B
  RTS
  JMP ($8070)
  BCC @E6ED
  CPY #$E0
  ANC #$85
  TAY
  .byte $FF
  BEQ @E7A7
  .byte $89, $5C, $89
  ROR A
  .byte $89
  SEI
  .byte $89
  DEY
  .byte $89
  LDY #$89
  CLV
  .byte $89
  CPY #$89
  INY
  .byte $89
  BNE $E6F1
  NOP
  .byte $89
  INC $89
  .byte $F4, $89
  PHP
  TXA
  JSR $288A
  TXA
  BMI $E700
  STY $AC8A
  TXA
  CPY $EC8A
  TXA
  .byte $0C, $8B
  ASL $308B,X
  .byte $8B
  LDX $8B,Y
  TSX
  .byte $8B
  LDX $C28B,Y
  .byte $8B
  DEC $8B
  DEX
  .byte $8B
  DEC $D28B
  .byte $8B
  DEC $8B,X
  .byte $34, $8B, $92
  DEY
  .byte $9C
@E79B:
  DEY
  TAY
  DEY
  LDY $88,X
  CPY $88
  .byte $DC
  DEY
  .byte $42, $89
  LSR A
@E7A7:
  .byte $89, $32
  TXA
  NOP
  DEY
  .byte $9E
  DEY
  BVS @E738
  ROL $4E88
  DEY
  ROR $8B,X
  .byte $E2, $87, $FC, $87, $F2, $87, $1C
  DEY
  .byte $D2, $87, $93
  TSX
  .byte $9F
  TSX
  LDA $BBBA
  TSX
  CMP #$BA
  .byte $D7
  TSX
  SBC $BA
  .byte $F3
  TSX
  .byte $D2
  LDA $01
  .byte $0C, $03, $0F
  ORA ($0D,X)
  ORA ($0B,X)
  .byte $02
  ORA #$03
  .byte $0C
  ORA ($0B,X)
  .byte $FF
  ASL A
  ORA ($0D,X)
  ORA ($0F,X)
  ORA ($09,X)
  ORA ($0A,X)
  .byte $0C, $0C
  ORA $0E0B
  ASL A
  .byte $FF
  ORA #$01
  ORA #$01
  .byte $0F
  NOP
  ANC #$1B
  ASL A
  .byte $FF
  ORA #$02
  .byte $0F, $02
  .byte $0E
  `;
}

// $8800-$8BFF (1024B): $8800-$8BFF 代码/数据段3
function build_8800_8BFF_seg3(): readonly number[] {
  return asm`
.byte $02
ORA $0C02
ORA ($0B,X)
ORA ($0A,X)
ORA ($09,X)
ORA ($08,X)
ORA ($07,X)
ORA ($06,X)
ORA ($05,X)
ORA ($04,X)
ORA ($03,X)
ORA ($02,X)
ORA ($01,X)
.byte $FF
BRK
.byte $03, $0F
ORA ($0C,X)
ORA ($09,X)
ORA ($04,X)
ORA ($0C,X)
ORA ($0B,X)
ORA ($0A,X)
ORA ($09,X)
.byte $FF
PHP
ORA #$0F
ORA #$0E
ORA #$0D
ORA #$0C
ORA #$0B
ORA #$0A
ORA #$09
ORA #$08
ORA #$07
ORA #$06
ORA #$05
ORA #$04
ORA #$03
ORA #$02
ORA #$01
.byte $FF
BRK
.byte $02, $0F, $02
PHP
.byte $02, $0F, $02
PHP
.byte $02, $0F, $FF
BRK
PLP
.byte $0F
ANC #$0E
ANC #$0D
ANC #$0C
ANC #$0B
ANC #$0A
.byte $1F
ORA #$21
PHP
.byte $23, $07
AND $06
ROL $05
.byte $02
ORA #$02
ASL A
.byte $02
ANC #$02
.byte $0C
ORA ($0D,X)
ORA ($0E,X)
ORA #$0F
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($0A,X)
.byte $FF, $0C
ORA ($0C,X)
.byte $02, $0F
ORA ($0C,X)
ORA ($09,X)
.byte $FF, $0C
ORA ($0C,X)
.byte $03, $0F
ORA ($0D,X)
ORA ($0B,X)
.byte $02
ORA #$FF
.byte $0C
ORA ($0C,X)
ASL $0F
.byte $02
ORA $0B01
.byte $02
ORA #$FF
.byte $0C
ORA ($0C,X)
ORA #$0F
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($09,X)
.byte $FF, $0C
ORA ($0C,X)
.byte $0C, $0F
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($09,X)
.byte $FF, $0C
ORA ($0C,X)
.byte $13, $0F
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
.byte $02
ORA $0C02
.byte $02
ORA $0C02
.byte $02
ORA $0C02
.byte $02
ORA $0C02
.byte $02
ORA $0C02
.byte $02
ORA $0C02
.byte $02
ORA $0C02
.byte $02
ORA $0C02
.byte $02
ORA $0C02
.byte $02
ORA $0C02
.byte $02
ORA $0C02
.byte $02
ORA $0C02
.byte $02
ORA $0C02
.byte $02
ORA $0C02
.byte $02
ORA $0C02
.byte $02
ORA $0C02
.byte $02
ORA $0C02
.byte $02
ORA $0C02
.byte $02
ORA $0C02
.byte $02
ORA $0CFF
ORA ($0C,X)
.byte $03, $0F
ORA ($09,X)
.byte $FF, $0C
ORA ($0C,X)
PHP
.byte $0F
ORA ($09,X)
.byte $FF, $0C
ORA ($0D,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($04,X)
.byte $FF, $0C
ORA ($0D,X)
.byte $02, $0F
ORA ($0D,X)
ORA ($0B,X)
ORA ($09,X)
ORA ($04,X)
.byte $FF, $0C
ORA ($0D,X)
ORA $0F
ORA ($0D,X)
ORA ($0B,X)
ORA ($09,X)
ORA ($04,X)
.byte $FF, $0C
ORA ($0D,X)
.byte $07, $0F
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($04,X)
.byte $FF, $0C
ORA ($0D,X)
ORA #$0F
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($04,X)
.byte $FF, $0C
ORA ($0D,X)
.byte $0F, $0F
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($04,X)
.byte $FF, $0C
ORA ($0D,X)
.byte $03, $0F
ORA ($04,X)
.byte $FF, $0C
ORA ($0D,X)
.byte $07, $0F
ORA ($04,X)
.byte $FF, $0C, $02, $0F
ORA ($0E,X)
ORA ($04,X)
.byte $FF, $0C, $03, $0F
ORA ($0C,X)
ORA ($09,X)
ORA ($04,X)
.byte $FF, $0C
ORA $0F
ORA ($0D,X)
ORA ($0B,X)
ORA ($09,X)
ORA ($04,X)
.byte $FF, $0C
ASL $0F
ORA ($0D,X)
ORA ($0B,X)
ORA ($0A,X)
ORA ($09,X)
ORA ($04,X)
.byte $FF, $0C
ORA ($0E,X)
PHP
.byte $0F
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($04,X)
.byte $FF, $0C
ORA ($0E,X)
ASL A
.byte $0F
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0D,X)
ORA ($0A,X)
.byte $FF, $0C
ORA ($0E,X)
.byte $03, $0F
ORA ($04,X)
.byte $FF, $0C
ORA ($0E,X)
ASL $0F
ORA ($04,X)
.byte $FF, $0C
ORA ($0D,X)
.byte $12, $0F, $03
ASL $0D03
.byte $03
ASL $0D03
.byte $03
ASL $0D03
.byte $03
ASL $0D03
.byte $04
ASL $0D04
.byte $04
ASL $0D04
.byte $04
ASL $0D05
ORA $0E
ORA $0D
ORA $0E
ORA $0D
ASL $0E
ASL $0D
ASL $0E
ASL $0D
ASL $0E
.byte $07
ORA $0E07
.byte $07
ORA $0E07
.byte $07
ORA $0E07
.byte $07
ORA $0E07
.byte $07
ORA $0E07
.byte $07
ORA $0E07
.byte $07
ORA $0E07
.byte $07
ORA $0E07
.byte $07
ORA $0E07
.byte $07
ORA $0E07
.byte $FF
ASL $0F01
ORA ($0E,X)
ORA ($0D,X)
ORA ($0C,X)
ORA ($0B,X)
ORA ($0A,X)
ORA ($09,X)
ORA ($08,X)
ORA ($07,X)
ORA ($06,X)
ORA ($05,X)
ORA ($04,X)
ORA ($03,X)
ORA ($02,X)
ORA ($01,X)
.byte $FF
BRK
.byte $02, $0F, $02
ASL $0D02
.byte $02, $0C, $02
ANC #$02
ASL A
.byte $02
ORA #$02
PHP
.byte $02, $07, $02
ASL $02
ORA $02
.byte $04, $02, $03, $02, $02, $02
ORA ($FF,X)
BRK
.byte $03, $0F, $03
ASL $0D03
.byte $03, $0C, $03
ANC #$03
ASL A
.byte $03
ORA #$03
PHP
.byte $03, $07, $03
ASL $03
ORA $03
.byte $04, $03, $03, $03, $02, $03
ORA ($FF,X)
BRK
ORA ($0F,X)
.byte $02
ASL $0D03
.byte $04, $0C
ORA $0B
ASL $0A
.byte $07
ORA #$08
PHP
ORA #$07
ASL A
ASL $0B
ORA $0C
.byte $04
ORA $0E03
.byte $02, $0F
ORA ($FF,X)
BRK
.byte $02, $0F, $02
ORA $0B02
.byte $02
ORA #$02
.byte $07, $02
ORA $02
.byte $03, $02
ORA ($FF,X)
BRK
ORA ($0F,X)
ORA ($0D,X)
ORA ($0B,X)
ORA ($09,X)
ORA ($07,X)
ORA ($05,X)
ORA ($03,X)
ORA ($01,X)
.byte $FF
BRK
.byte $FF, $0F, $FF
BRK
.byte $0C, $0F, $03
ASL $0F03
.byte $03
ASL $0F04
.byte $04
ASL $0F04
.byte $04
ASL $0F05
ORA $0E
ORA $0F
ORA $0E
ORA $0F
ORA $0E
ORA $0F
ORA $0E
ORA $0F
ORA $0E
ORA $0F
ORA $0E
ORA $0F
ORA $0E
ORA $0F
ORA $0E
ASL $0F
ASL $0E
ASL $0F
ASL $0E
.byte $07, $0F, $07
ASL $0D07
PHP
.byte $0C, $FF
BRK
ORA ($0B,X)
ORA ($0C,X)
ORA ($0D,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0D,X)
ORA ($0C,X)
ORA ($0B,X)
ORA ($0C,X)
ORA ($0D,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0D,X)
ORA ($0C,X)
ORA ($0B,X)
ORA ($0C,X)
ORA ($0D,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0D,X)
ORA ($0C,X)
ORA ($0B,X)
ORA ($0C,X)
ORA ($0D,X)
ORA ($0E,X)
ORA ($0F,X)
ORA ($0E,X)
ORA ($0D,X)
ORA ($0C,X)
.byte $03, $0F, $FF
BRK
.byte $04, $0F, $FF
BRK
ORA $0F
.byte $FF
BRK
ASL $0F
.byte $FF
BRK
.byte $07, $0F, $FF
BRK
PHP
.byte $0F, $0F
BRK
ASL A
.byte $0F, $FF
BRK
.byte $0C, $0F, $FF
BRK
ASL $FF0F
BRK
.byte $42
STX $8E5B
PLA
STX $8E89
.byte $CF
STX $8FAD
.byte $14, $8F
LDY $90
AND $92,X
CPY $4996
.byte $97
STA ($91,X)
NOP
STA ($1D),Y
STA ($79),Y
.byte $90, $5A  ; BCC $8C53
.byte $8F, $BB, $8F
AND $6294
.byte $94
  `;
}

// $8C00-$8FFF (1024B): $8C00-$8FFF 代码/数据段4
function build_8C00_8FFF_seg4(): readonly number[] {
  return asm`
  DEC $94
  CPX $9D
  SBC $599D,X
  .byte $93, $53
  STX $7F,Y
  .byte $9E, $77, $97
  ASL $D39B,X
  .byte $9E
  CMP $509A
  .byte $9B
  STA $989B,X
  .byte $9E
  LDY $BF,X
  .byte $F7, $9E
  AND $5795
  STA $EE,X
  .byte $9C
  CLI
  STA $9D73,X
  EOR $9A,X
  DEC $97,X
  .byte $77
  TXS
  .byte $53
  STY $03,X
  TYA
  TXS
  TXS
  STA $1B97,X
  TYA
  .byte $13, $9C
  INC $009F,X
  LDY #$AA
  LDX #$0B
  LDY $C6
  LDA $8D
  LDX $61,Y
  .byte $A7
  ADC $FAAC,Y
  .byte $AF
  CPX #$B1
  AND $14B3
  LDA $2C,X
  LDA $BB9E,Y
  AND #$B7
  .byte $B3
  LDA $AB2A,X
  CMP $AB,X
  NOP
  CLV
  CPY #$8C
  .byte $64
  LDA #$85
  TAX
  ROL A
  LDY $B07A
  .byte $F3, $B2, $42
  STX $ADE8
  STA $00A3,Y
  LDY #$1F
  CLV
  .byte $9C, $B3
  ORA ($BB,X)
  TAY
  TAX
  .byte $57
  LDA ($E0,X)
  LDA $48
  TAY
  .byte $0F, $A3
  CMP $F8A7,Y
  LDA ($AD,X)
  .byte $B7
  EOR $00AC,Y
  LDY #$FE
  .byte $9F
  INC $749F,X
  TYA
  INC $90,X
  LSR $9F
  ROR $BD98,X
  TYA
  .byte $44
  STA $998E,Y
  AXS #$9C
  LDY $99,X
  .byte $FC
  STA $9A1E,Y
  .byte $E7
  STA $9F9C,Y
  AND $9C,X
  DEX
  .byte $9F, $F3, $9B
  PHP
  STA $9E5D,X
  AND ($9E,X)
  LDA $9C,X
  LDA $9C,X
  LDA $9C,X
  .byte $42
  STX $D200
  STY $D201
  STY $D304
  STY $ED05
  LDX $4606,Y
  .byte $BF, $07, $B7, $BF, $FF
  CPX #$31
  .byte $E2
  BRK
  .byte $E3, $0F
  LDX $E00C
  AND ($90),Y
  .byte $0C, $E3
  ASL $84
  .byte $33, $F3
  STX $F434
  .byte $83, $34, $F3, $87, $34
  SBC $8A01
  .byte $34
  SBC $9002
  .byte $34, $F4, $EF, $83, $33, $F3, $87, $34, $F4
  TXA
  .byte $34, $34, $34, $34, $34, $37, $34, $0C, $83, $33, $F3, $87, $34, $F4
  TXA
  .byte $34, $34, $83, $33, $F3, $87, $34
  SBC $8A01
  .byte $34
  SBC $9002
  .byte $34, $F4, $EF
  TXA
  .byte $34, $34, $83
  ROL $F3,X
  .byte $87, $37, $F4
  TXA
  .byte $34, $F3
  SBC $3401
  SBC $9002
  .byte $34, $F4
@ED31:
  .byte $EF
  STA $0C,X
  TXA
  AND $35,X
  AND $90,X
  AND $8A,X
  .byte $0C, $83
  ROL $F3,X
  .byte $87, $37, $F4
  TXA
  AND $34,X
  AND $F3,X
  SBC $3501
  SBC $9002
  AND $F4,X
  .byte $EF
  STA $0C,X
  STY $38
  .byte $F3
  STX $F439
  BCC @ED91
  AND $83,X
  ROL $F3,X
  .byte $87, $37, $F4
@ED61:
  BCC @ED98
  .byte $34, $32
  TXA
  .byte $0C, $83
  ANC #$F3
  .byte $87
  BMI @ED61
  BCC @EDA1
  AND $8A37,Y
  .byte $0C, $83
  NOP
  .byte $F3, $93, $3B, $F4
  STA $37,X
  BCC $EDBF
  RTI
  .byte $F3
  SBC $4001
  SBC $9802
  RTI
  .byte $F4, $EF
  LDY #$0C
  TXA
  .byte $0C
  BMI @EDC0
  .byte $34, $32, $34
@ED91:
  AND $84,X
  ROL $F3,X
  STX $F437
@ED98:
  TXA
  .byte $37
  BCC @EDD1
  .byte $87, $34
  STX $35
  .byte $87
@EDA1:
  .byte $34
  TXA
  .byte $32
  BMI @EDB2
  AND #$2B
  BMI @ED31
  .byte $32
  STX $34
  .byte $87, $32
  TXA
  BMI @EDDD
@EDB2:
  BMI $EDDB
  AND #$2B
  BMI @EDEA
  .byte $34
  AND $0C,X
  SBC #$02
  .byte $83
  ROL $F3,X
@EDC0:
  .byte $87, $37, $F4
  TXA
  AND $34,X
  CPX $3884
  .byte $F3
  STX $F439
  TXA
  AND $3790,Y
@EDD1:
  .byte $87
  AND $86,X
  .byte $37, $87
  AND $8A,X
  .byte $34, $32
  AND ($32),Y
  .byte $34
@EDDD:
  .byte $32, $34
  AND $34,X
  AND $37,X
  AND $37,X
  AND $3937,Y
  .byte $3B
  RTI
@EDEA:
  SBC #$02
  SBC #$25
  STX $408A
  RTI
  SBC #$25
  STX $408A
  RTI
  SBC #$25
  STX $408A
  CPX $4090
  .byte $F3
  SBC $4001
  SBC $9802
  RTI
  .byte $F4, $EF
  CPX #$17
  .byte $E3
  ASL A
  .byte $82
  BVC @EE5C
  EOR #$47
  EOR $44
  .byte $42
  RTI
  .byte $83, $3B
  AND $3537,Y
  .byte $34, $32
  BMI $EE4B
  TYA
  .byte $0C
  INX
  .byte $DB
  STY $3B82
  .byte $F3
  SBC $01
  STA ($3B,X)
  SBC $02
  .byte $3B
  SBC $03
  .byte $3B
  SBC $04
  .byte $82, $3B
  SBC $05
  STA ($3B,X)
  SBC $06
  .byte $3B
  SBC $00
  RTI
  .byte $F4
  NOP
  BRK
  NOP
  STX $5A01
  STX $5A02
  STX $5A03
  STX $5A04
  STX $5A05
  STX $5A06
  STX $5A07
  STX $00FF
@EE5C:
  .byte $67
  STX $6701
  STX $6702
  STX $6703
  STX $00FF
  ADC ($8E),Y
  ORA ($71,X)
  STX $7203
  STX $E0FF
  .byte $12, $E3
  BRK
  STA ($00,X)
  .byte $82
  ORA ($83,X)
  .byte $02, $03, $04
  STY $05
  ASL $85
  .byte $07
  PHP
  ORA #$0A
  STA $0B,X
  .byte $FF
  BRK
  .byte $92
  STX $9201
  STX $9303
  STX $81FF
  CPX #$12
  .byte $E3
  BRK
  .byte $0F
  ASL $0C0D
  ASL $0C0D
  ANC #$0D
  .byte $0C
  ANC #$0A
  STA ($0C,X)
  ANC #$0A
  ORA #$0B
  ASL A
  ORA #$08
  ASL A
  ORA #$08
  .byte $07
  ORA #$08
  .byte $07
  ASL $08
  .byte $07
  ASL $05
  .byte $07
  ASL $05
  .byte $04
  ASL $05
  .byte $04, $03
  ORA $04
  .byte $03, $02, $04, $03, $02
  ORA ($03,X)
  .byte $02
  ORA ($96,X)
  BRK
  .byte $FF
  BRK
  CLD
  STX $D801
  STX $D903
  STX $E0FF
  .byte $12, $E3
  BRK
  STA ($00,X)
  ORA ($02,X)
  .byte $03
  ORA ($02,X)
  .byte $03, $04, $02, $03, $04
  ORA $03
  .byte $04
  ORA $06
  .byte $04
  ORA $06
  .byte $07
  ORA $06
  .byte $07
  PHP
  ASL $07
  PHP
  ORA #$07
  PHP
  ORA #$0A
  PHP
  ORA #$0A
  ANC #$09
  ASL A
  ANC #$0C
  ASL A
  ANC #$0C
  ORA $0C0B
  ORA $0C0E
  ORA $960E
  .byte $0F, $FF
  BRK
  ORA $018F,X
  .byte $47, $8F, $03
  ASL $FF8F,X
  CPX #$14
  .byte $E3
  BRK
  STA ($00,X)
  .byte $0F
  BRK
  .byte $0F
  ORA ($0E,X)
  ORA ($0E,X)
  .byte $02
  ORA $0D02
  .byte $03, $0C, $03, $0C, $04
  ANC #$04
  ANC #$05
  ASL A
  ORA $0A
  ASL $09
  ASL $09
  PHP
  .byte $07
  PHP
  CPX #$12
  STX $07,Y
  .byte $FF
  CPX #$14
  .byte $E2
  RTI
  .byte $E3
  ASL $81
  SBC #$04
  ORA ($12,X)
  BRK
  .byte $13
  ORA ($12,X)
  .byte $02
  ORA ($EC),Y
  .byte $FF
  BRK
  LDY $8F
  ORA ($89,X)
  .byte $8F, $03, $64, $8F, $FF
  CPX #$12
  .byte $E3
  BRK
  .byte $82, $07
  PHP
  ASL $09
  STA ($05,X)
  ASL A
  .byte $F3, $04
  ANC #$03
  .byte $0C, $02, $F4
  BRK
  ORA ($02,X)
  .byte $03, $04
  ORA $06
  .byte $07
  PHP
  ORA #$0A
  ANC #$0C
  ORA $960E
@EF87:
  .byte $0F, $FF, $E3
  ORA $E0
  .byte $12, $E2
  BRK
  STA $810C
  BMI @EF87
  ANC #$2A
  AND #$28
  .byte $27
  ROL $25
  BIT $23
  .byte $22
  AND ($20,X)
  .byte $1B
  NOP
  .byte $F4, $FF, $E3
  ORA #$82
  .byte $0C
  SBC $02
  INX
  .byte $8B, $8F
  BRK
  LDX $8F,Y
  ORA ($B6,X)
  .byte $8F, $03, $B7, $8F, $FF, $82
  INX
  STY $8E,X
  BRK
  CMP $8F
  ORA ($41,X)
  BCC @EFC5
  LSR $90
  .byte $FF
@EFC5:
  CPX #$11
  .byte $E2
  CPY #$E3
  BRK
  STA ($E5,X)
  .byte $10, $48  ; BPL $9017
  SBC $0E
  PHA
  SBC $0C
  PHA
  SBC $0A
  PHA
  SBC $08
  PHA
  .byte $E3
  PHP
  SBC $10
  EOR #$E5
  ASL $E549
  .byte $0C
  EOR #$E5
  ASL A
  EOR #$E5
  PHP
  EOR #$E5
  ASL $49
  .byte $E3
  ASL A
  SBC $10
  LSR A
  SBC $0E
  LSR A
  SBC $0C
  LSR A
  SBC $0A
  LSR A
  SBC $08
  LSR A
  `;
}

// $9000-$93FF (1024B): $9000-$93FF 代码/数据段5
function build_9000_93FF_seg5(): readonly number[] {
  return asm`
  SBC $06
  LSR A
  SBC $04
  LSR A
  .byte $E3, $0C
  SBC $10
  ALR #$E5
  ASL $E54B
  .byte $0C
  ALR #$E5
  ASL A
  ALR #$E5
  PHP
  ALR #$E5
  ASL $4B
  SBC $04
  ALR #$E5
  .byte $02
  ALR #$E3
  ASL $10E5
  BVC $E00B
  ASL $E550
  .byte $0C
  BVC $E011
  ASL A
  BVC $E014
  PHP
  BVC $E017
  ASL $50
  SBC $04
  BVC $E01D
  .byte $02
  BVC $E020
  ORA ($50,X)
  SBC $00
  BVC $E040
  STY $0C
  INX
  CMP $8F
  CPX #$14
  .byte $E3
  BRK
  SBC #$03
  STA ($0F,X)
  BRK
  ASL $EC01
  SBC #$05
  ORA $0C00
  ORA ($EC,X)
  SBC #$04
  ANC #$00
  ASL A
  ORA ($EC,X)
  ORA #$00
  PHP
  ORA ($07,X)
  BRK
  ASL $01
  ORA $00
  .byte $04
  ORA ($03,X)
  BRK
  .byte $02
  ORA ($02,X)
  BRK
  ORA ($01,X)
  CPX #$12
  STX $00,Y
  .byte $FF
  BRK
  .byte $82
  BCC @E07E
  .byte $82
@E07E:
  BCC @E083
  .byte $83
  BCC $E082
@E083:
  CPX #$12
  .byte $E3
  BRK
  STA ($00,X)
  ORA ($02,X)
  .byte $03, $04
  ORA $06
  SBC #$02
  BRK
  ORA ($02,X)
  .byte $03, $04
  ORA $06
  .byte $07
  PHP
  ORA #$0A
  CPX $0C0B
  ORA $960E
  .byte $0F, $FF
  BRK
  LDA $0190
  CMP $0390,X
  LDX $FF90
  CPX #$12
  .byte $E3
  BRK
  SBC #$04
  STA ($00,X)
  .byte $0F
  ORA ($0E,X)
  CPX $03EB
  .byte $02, $0F, $03
  ASL $EBEC
  .byte $02, $04, $0F
  ORA $0E
  CPX $0F06
  .byte $07
  ASL $0F08
  ORA #$0E
  ASL A
  .byte $0F
  ANC #$0E
  .byte $0C, $0F
  ORA $E00E
  .byte $12
  STX $0F,Y
  .byte $FF
  CPX #$14
  .byte $E2, $80, $E3
  ASL $81
  SBC #$06
  ORA ($12,X)
  BRK
  .byte $13
  ORA ($12,X)
  .byte $02
  ORA ($EC),Y
  BRK
  .byte $13
  ORA ($12,X)
  .byte $02
  ORA ($FF),Y
  BRK
  .byte $FF
  BCC $E0FB
  CMP $0390,X
  BRK
  STA ($FF),Y
  CPX #$14
  .byte $E3
  BRK
  SBC #$03
  STA ($00,X)
  .byte $0F
  ORA ($0E,X)
  CPX $05EB
  .byte $02, $0F, $03
  ASL $EBEC
  .byte $04, $04, $0F
  ORA $0E
  CPX $C8E8
  BCC @E11E
@E11E:
  ROL $91
  ORA ($27,X)
  STA ($03),Y
  .byte $57
  STA ($FF),Y
  CPX #$12
  .byte $E2, $80, $E3
  ORA $81
  BPL @E150
  ANC #$1B
  ORA ($21),Y
  ASL A
  NOP
  .byte $12, $22
  ORA #$19
  .byte $13, $23
  PHP
  CLC
  .byte $14
  BIT $07
  .byte $17
  ORA $25,X
  ASL $16
  ASL $26,X
  ORA $15
  .byte $17, $27, $04, $14
  CLC
  PLP
@E150:
  .byte $03, $13
  ORA $0229,Y
  .byte $12, $FF
  CPX #$12
  .byte $E3
  BRK
  .byte $82, $0C
  STA ($0F,X)
  ASL $0D0C
  .byte $0C, $82, $0C
  STA ($0B,X)
  ASL A
  .byte $83, $0C
  STA ($09,X)
  PHP
  .byte $82, $0C
  STA ($08,X)
  ORA #$0C
  ASL A
  ANC #$0C
  ORA $0B0C
  ASL A
  ANC #$0C
  ORA $960E
  ORA $00FF
@E182:
  TXA
  STA ($01),Y
  .byte $8B
  STA ($03),Y
  LDY $91
  .byte $FF
  CPX #$14
  .byte $E2
  CPY #$E3
  BRK
  STA ($EB,X)
  ORA $01
  BVC @E199
  EOR ($03),Y
@E199:
  .byte $52, $04, $53, $03, $52, $02
  EOR ($01),Y
  BVC $E18F
  .byte $FF
  CPX #$12
  .byte $E3
  BRK
  STA ($00,X)
  ORA ($02,X)
  .byte $03, $04, $03, $02
  ORA ($01,X)
  .byte $02, $03, $04
  ORA $04
  .byte $03, $02, $02, $03, $04
  ORA $06
  ORA $04
  .byte $03, $03, $04
  ORA $06
  .byte $07
  ASL $05
  .byte $04, $04
  ORA $06
  .byte $07
  PHP
  .byte $07
  ASL $05
  ORA $06
  .byte $07
  PHP
  ORA #$08
  .byte $07
  ASL $06
  .byte $07
  PHP
  ORA #$0A
  ORA #$08
  .byte $07, $07
  PHP
  ORA #$0A
  ANC #$0A
  ORA #$08
  .byte $FF
  BRK
  .byte $F4
  STA ($01),Y
  BMI @E182
  .byte $03, $F3
  STA ($FF),Y
  CPX #$11
  .byte $E2
  CPY #$E3
  BRK
  STA ($48,X)
  SBC $01
  PHA
  SBC $02
  PHA
  SBC $04
  PHA
  SBC #$1D
  .byte $92, $E3
  PHP
  SBC #$1D
  .byte $92, $E3
  ASL A
  SBC #$1D
  .byte $92, $E3, $0C
  SBC #$1D
  .byte $92, $E3
  ASL $1DE9
  .byte $92, $FF
  SBC $06
  PHA
  SBC $08
  PHA
  SBC $0A
  PHA
  SBC $0C
  PHA
  SBC $0E
  PHA
  SBC $10
  PHA
  NOP
  STY $0C
  INX
  .byte $F4
  STA ($00),Y
  ROL $0192,X
@E239:
  .byte $3F, $92, $03, $DC, $92, $FF
  CPX #$14
  .byte $E2, $80, $E3
  PHP
  SBC #$C0
  .byte $92
  SBC #$06
  .byte $03
  BPL @E239
  SBC #$07
  .byte $02
  ORA ($EC),Y
  .byte $E3, $02
  SBC #$03
  .byte $02, $14, $02
  ORA $03,X
  .byte $14, $04, $13
  CPX $03E3
  .byte $02
  ORA $03,X
  .byte $14, $04, $13, $E3, $04, $03, $14, $02
  ORA $03,X
  .byte $14, $E3
  ORA $04
  .byte $13, $03, $14, $02
  ORA $E3,X
  ASL $02
  .byte $14, $03, $12, $02, $13, $E3, $07
  ORA ($14,X)
  .byte $02, $13, $03, $12, $E3
  PHP
  .byte $02, $13
  ORA ($14,X)
  .byte $02, $13, $E3
  ORA #$03
  .byte $12, $02, $13
  ORA ($14,X)
  .byte $E3
  ASL A
  ORA ($12,X)
  .byte $02
  ORA ($01),Y
  .byte $12, $E3
  ANC #$00
  .byte $13
  ORA ($12,X)
  .byte $02
  ORA ($E3),Y
  .byte $0C
  ORA ($12,X)
  BRK
  .byte $13
  ORA ($12,X)
  .byte $E3
  ORA $1102
  ORA ($12,X)
  BRK
  .byte $13, $E3
  ASL $1201
  .byte $02
  ORA ($01),Y
  .byte $12, $FF
  SBC #$02
  STA ($07,X)
  .byte $82
  PHP
  CPX $03EB
  .byte $82
  ASL $81
  ORA #$EC
  SBC #$04
  STA ($05,X)
  .byte $82
  ASL A
  CPX $05EB
  STA ($04,X)
  ANC #$EC
  NOP
  CPX #$14
  .byte $E3, $02
  SBC #$C0
  .byte $92
  SBC #$06
  .byte $03, $0C
  CPX $07EB
  .byte $02
  ORA $EBEC
  .byte $03
  ORA ($0E,X)
  BRK
  .byte $0F
  ORA ($0E,X)
  .byte $02
  ORA $E3EC
  .byte $03
  BRK
  .byte $0F
  ORA ($0E,X)
  .byte $02
  ORA $04E3
  ORA ($0E,X)
  BRK
  .byte $0F
  ORA ($0E,X)
  .byte $E3
  ORA $02
  ORA $0E01
  BRK
  .byte $0F, $E3
  ASL $01
  ASL $0D02
  ORA ($0E,X)
  .byte $E3, $07
  BRK
  .byte $0F
  ORA ($0E,X)
  .byte $02
  ORA $08E3
  ORA ($0E,X)
  BRK
  .byte $0F
  ORA ($0E,X)
  .byte $E3
  ORA #$02
  ORA $0E01
  BRK
  .byte $0F, $E3
  ASL A
  ORA ($0E,X)
  .byte $02
  ORA $0E01
  .byte $E3
  ANC #$00
  .byte $0F
  ORA ($0E,X)
  .byte $02
  ORA $0CE3
  ORA ($0E,X)
  BRK
  .byte $0F
  ORA ($0E,X)
  .byte $E3
  ORA $0D02
  ORA ($0E,X)
  BRK
  .byte $0F, $E3
  ASL $0E01
  .byte $02
  ORA $0E01
  .byte $FF
  BRK
  .byte $63, $93
  ORA ($A7,X)
  .byte $93, $03
  SBC #$93
  .byte $FF
  CPX #$13
  .byte $E2
  RTI
  STA ($E3,X)
  .byte $07
  ORA ($12),Y
  .byte $13, $14
  ORA $16,X
  .byte $17
  CLC
  ORA $1312,Y
  .byte $14
  ORA $16,X
  .byte $17
  CLC
  ORA $1413,Y
  ORA $16,X
  .byte $17
  CLC
  ORA $1514,Y
  ASL $17,X
  CLC
  ORA $1615,Y
  .byte $17
  CLC
  ORA $1716,Y
  CLC
  ORA $1817,Y
  ORA $1918,Y
  .byte $E3
  ASL $18
  ORA $1918,Y
  .byte $E3
  ORA $18
  ORA $1918,Y
  .byte $E3, $04
  CLC
  ORA $E0FF,Y
  .byte $13, $E2, $80
  STA ($E3,X)
  .byte $07, $12, $13, $14
  ORA $16,X
  .byte $17
  CLC
  ORA $131A,Y
  .byte $14
  ORA $16,X
  .byte $17
  CLC
  ORA $141A,Y
  ORA $16,X
  .byte $17
  CLC
  ORA $151A,Y
  ASL $17,X
  CLC
  ORA $161A,Y
  .byte $17
  CLC
  ORA $171A,Y
  CLC
  ORA $181A,Y
  ORA $191A,Y
  NOP
  .byte $E3
  ASL $19
  NOP
  ORA $E31A,Y
  ORA $19
  NOP
  ORA $E31A,Y
  .byte $04
  ORA $FF1A,Y
  STA ($E0,X)
  .byte $12, $E3, $07, $02, $03, $04
  ORA $06
  .byte $07
  PHP
  ORA #$0A
  .byte $03, $04
  ORA $06
  .byte $07
  PHP
  .byte $09
  `;
}

// $9400-$97FF (1024B): $9400-$97FF 代码/数据段6
function build_9400_97FF_seg6(): readonly number[] {
  return asm`
  ASL A
  .byte $04
  ORA $06
  .byte $07
  PHP
  ORA #$0A
  ORA $06
  .byte $07
  PHP
  ORA #$0A
  ASL $07
  PHP
  ORA #$0A
  .byte $07
  PHP
  ORA #$0A
  PHP
  ORA #$0A
  ORA #$0A
  .byte $E3
  ASL $09
  ASL A
  ORA #$0A
  .byte $E3
  ORA $09
  ASL A
  ORA #$0A
  .byte $E3, $04
  ORA #$0A
  .byte $FF
  BRK
  ROL $94,X
  ORA ($37,X)
  STY $03,X
  .byte $44
  STY $FF,X
  CPX #$12
  .byte $E2, $80, $E3
  BRK
  STA ($10,X)
  JSR $1000
  JSR $E9FF ; → bank switch?
  EOR #$94
  ORA $FF
  CPX #$15
  .byte $E3
  BRK
  STY $ED
  ORA ($0A,X)
  STX $00EA
  .byte $5C
  STY $01,X
  .byte $37
  STY $03,X
  EOR $FF94,X
  SBC #$49
  STY $0F,X
  .byte $FF
  BRK
  ARR #$94
  ORA ($6C,X)
  STY $03,X
  STA ($94),Y
  .byte $FF
  CPX #$12
  .byte $E2, $80, $E3
  BRK
  STA ($15,X)
  .byte $14, $12
  BPL @E483
  ORA #$07
  ORA $04
  .byte $E3
  ORA #$15
  .byte $13, $14, $12, $13
@E483:
  ORA ($12),Y
  BPL @E490
  PHP
  .byte $07
  ASL $05
  .byte $04, $03, $02
  ORA ($00,X)
@E490:
  .byte $FF
  CPX #$12
  .byte $E3
  BRK
  STA ($0B,X)
  PHP
  ORA $090F
  .byte $E3
  PHP
  .byte $0F
  ASL $0C0D
  .byte $E3
  ORA #$0F
  ASL $0C0D
  .byte $E3
  ASL A
  .byte $0F
  ASL $0C0D
  .byte $E3
  ANC #$0F
  ASL $0C0D
  .byte $E3, $0C, $0F
  ASL $0C0D
  .byte $E3
  ORA $0E0F
  ORA $E30C
  ASL $0E0F
  ORA $FF0C
  BRK
  .byte $CF
  STY $01,X
@E4CA:
  BNE $E460
  .byte $03
  SBC $FF94,Y
  CPX #$12
  .byte $E2, $80, $E3
  BRK
  SBC #$03
  STA ($15,X)
  .byte $14, $12
  BPL @E4CA
  ANC #$09
  .byte $07
  ORA $04
  .byte $E3
  ANC #$E9
  INC $E394
  ORA $EEE9
  STY $FF,X
  ORA $13,X
  .byte $14, $12
  BPL @E4FF
  ORA #$07
  ORA $04
  NOP
  CPX #$12
  .byte $E3
  BRK
  STA ($EB,X)
@E4FF:
  .byte $03
  ANC #$08
  ORA $EC0F
  .byte $0C
  ASL $0F
  ASL A
  BPL @E51A
  ORA $0A0B
  .byte $E3
  ORA ($0C,X)
  .byte $E3, $03, $0C, $E3
  ORA $0C
  .byte $E3, $07, $0C
@E51A:
  .byte $E3
  ORA #$0C
  .byte $E3
  ASL A
  .byte $0C, $E3
  ANC #$0C
  .byte $E3, $0C, $0C, $E3
  ORA $E30C
  ASL $FF0C
  BRK
  ROL $95,X
  ORA ($37,X)
  STA $03,X
  PHA
  STA $FF,X
  CPX #$12
  .byte $E2, $80, $E3
  BRK
  SBC #$03
  STA ($15,X)
  .byte $14, $12
  BPL $E531
  INX
  .byte $72
  STY $E0,X
  .byte $12, $E3
  BRK
  STA ($EB,X)
  .byte $03
  ANC #$08
  ORA $EC0F
  INX
  STA $94,X
  BRK
  ADC ($95,X)
  ORA ($A7,X)
  STA $03,X
  LDX $FF95
  CPX #$17
  .byte $E2
  BRK
  .byte $E3
  ORA $83
  SBC #$09
  SBC #$9D
  STA $EC,X
  .byte $E3
  ASL $82
  SBC #$9D
  STA $E3,X
  .byte $07
  SBC #$9D
  STA $E3,X
  PHP
  SBC #$9D
  STA $E3,X
  ORA #$E9
  STA $E395,X
  ASL A
  SBC #$9D
  STA $E3,X
  ANC #$E9
  STA $E395,X
  .byte $0C
  SBC #$9D
  STA $E3,X
  ORA $9DE9
  STA $E3,X
  ASL $9DE9
  STA $FF,X
  CPX $84
  JSR $84E4 ; → bank switch?
  BMI $E588
  STY $40
  NOP
  SBC $01
  .byte $83, $0C
  INX
  ADC ($95,X)
  CPX #$17
  .byte $E3
  BRK
  STA ($02,X)
  .byte $82, $03, $83, $04, $82
  ORA $81
  ASL $03
  .byte $82, $04, $83
  ORA $82
  ASL $81
  .byte $07, $04, $82
  ORA $83
  ASL $82
  .byte $07
  STA ($08,X)
  ORA $82
  ASL $83
  .byte $07, $82
  PHP
  STA ($09,X)
  ASL $82
  .byte $07, $83
  PHP
  .byte $82
  ORA #$81
  ASL A
  .byte $07, $82
  PHP
  .byte $83
  ORA #$82
  ASL A
  STA ($0B,X)
  PHP
  .byte $82
  ORA #$83
  ASL A
@E5EE:
  .byte $82
  ANC #$81
  .byte $0C
  ORA #$82
  ASL A
  .byte $83
  ANC #$82
  .byte $0C
  STA ($0D,X)
  ASL A
  .byte $82
  ANC #$83
  .byte $0C, $82
  ORA $0E81
  .byte $E3
  ORA ($E9,X)
  ALR #$96
  .byte $E3, $02
  SBC #$4B
  STX $E3,Y
  .byte $03
  SBC #$4B
  STX $E3,Y
  .byte $04
  SBC #$4B
  STX $E3,Y
  ORA $E9
  ALR #$96
  .byte $E3
  ASL $E9
  ALR #$96
  .byte $E3, $07
  SBC #$4B
  STX $E3,Y
  PHP
  SBC #$4B
  STX $E3,Y
  ORA #$E9
  ALR #$96
  .byte $E3
  ASL A
  SBC #$4B
  STX $E3,Y
  ANC #$E9
  ALR #$96
  .byte $E3, $0C
  SBC #$4B
  STX $E3,Y
  ORA $4BE9
  STX $E3,Y
  ASL $4BE9
  STX $FF,Y
  ASL A
  ANC #$82
  .byte $0C
  STA ($0D,X)
  ASL $00EA
  LDX #$96
  ORA ($78,X)
  STX $03,Y
  EOR $FF96,X
  CPX #$2F
  .byte $E3
  BRK
  .byte $82, $04
  ORA #$0A
  ANC #$81
  ASL A
  ANC #$0A
  BPL @E5EE
  ORA #$0A
  ANC #$83
@E670:
  ASL A
  ANC #$0C
  CPX #$2E
  LDA $0D
  .byte $FF
  CPX #$17
  .byte $E2, $80, $E3
  BRK
  STA ($EB,X)
  .byte $03
  BRK
  BPL @E670
  ANC #$0A
  ORA #$08
  BRK
  BPL @E68B
@E68B:
  BPL @E68D
@E68D:
  ANC #$10
  ASL A
  ANC #$09
  ASL A
  PHP
  ORA #$07
  PHP
  CPX #$2E
  BRK
  .byte $F3
  SBC #$43
  ORA ($00,X)
  CPX $FFF4
  CPX #$17
  .byte $E2, $80, $E3
  ORA $81
  SBC #$03
  .byte $03, $13
  CPX $1112
  BPL @E6BD
  .byte $03, $13, $03, $13, $03, $12, $13
  ORA ($12),Y
  BPL $E6CE
@E6BD:
  ANC #$10
  ASL A
  ANC #$E0
  ROL $F303
  SBC #$43
  .byte $04, $03
  CPX $FFF4
  BRK
  CMP $96,X
  ORA ($D6,X)
  STX $03,Y
  AND ($97,X)
  .byte $FF
  CPX #$14
  .byte $E2, $80, $E3
  PHP
  STA ($20,X)
  .byte $22
  AND ($E3,X)
  ORA $2220
  AND ($E3,X)
  .byte $07
  AND ($23,X)
  .byte $22, $E3, $0C
  AND ($23,X)
  .byte $22, $E3
  ASL $22
  BIT $23
  .byte $E3
  ANC #$22
  BIT $23
  SBC #$04
  .byte $E3
  ORA $23
  AND $24
  .byte $E3
  ANC #$23
  AND $24
  CPX $04EB
  .byte $E3
  PHP
  .byte $22
  BIT $23
  .byte $E3
  ORA $2422
  .byte $23
  CPX $04EB
  .byte $E3
  ASL A
  .byte $23
  AND $24
  .byte $E3
  ASL $2523
  BIT $EC
  .byte $FF
  CPX #$14
  .byte $E3
  BRK
  STA ($EB,X)
  PHP
  ASL A
  ORA #$08
  CPX $04EB
  ANC #$0A
  ORA #$EC
  SBC #$04
  .byte $0C
  ANC #$0A
  CPX $02EB
  ORA $0B0C
  CPX $02EB
  ASL $0C0D
  CPX $0E0D
  STX $0F,Y
  .byte $FF
  BRK
  .byte $52, $97
  ORA ($52,X)
  .byte $97, $03, $53, $97, $FF
  CPX #$12
  .byte $E3
  BRK
  STA ($00,X)
  .byte $02
  ORA ($03,X)
  .byte $02, $04, $03
  ORA $04
  ASL $05
  .byte $07
  ASL $08
  .byte $07
  ORA #$08
  ASL A
  ORA #$0B
  ASL A
  .byte $0C
  ANC #$0D
  .byte $0C
  ASL $0F0D
  STX $0E,Y
  .byte $FF
  BRK
  .byte $80, $97
  ORA ($81,X)
  .byte $97, $03, $8F, $97, $FF
  CPX #$12
  .byte $E2, $80, $E3
  BRK
  STA ($10,X)
  JSR $1000
  BRK
  BPL $E78E
  CPX #$15
  .byte $E3
  BRK
  STY $ED
  ORA ($0C,X)
  DEY
  PHP
  .byte $E3
  PHP
  .byte $07, $FF
  BRK
  .byte $A7, $97
  ORA ($B7,X)
  .byte $97, $03, $C7, $97, $FF
  CPX #$14
  .byte $E2, $80, $E3
  BRK
  STA ($10,X)
  BRK
  ORA $05,X
  BPL @E7B4
@E7B4:
  ASL $06,X
  .byte $FF
  CPX #$14
  .byte $E2, $80, $E3
  BRK
  STA ($11,X)
  ORA ($16,X)
  ASL $11
  ORA ($17,X)
  .byte $07, $FF
  CPX #$17
  .byte $E3
  BRK
  STA ($0B,X)
  PHP
  ORA $0C0F
  ASL $0F
  ASL A
  .byte $0F, $FF
  BRK
  .byte $DF, $97
  ORA ($E0,X)
  .byte $97, $03, $F7, $97, $FF
  CPX #$16
  .byte $E2, $80, $E3
  BRK
  SBC #$EF
  .byte $97, $E3
  ANC #$E9
  .byte $EF, $97, $FF, $82
  PHP
  ORA #$08
  .byte $07
  STA ($06,X)
  NOP
  CPX #$12
  .byte $E3
  BRK
  .byte $82, $07
  PHP
  .byte $07
  .byte $06
  `;
}

// $9800-$9BFF (1024B): $9800-$9BFF 代码/数据段7
function build_9800_9BFF_seg7(): readonly number[] {
  return asm`
  STA ($05,X)
  .byte $FF
  BRK
  .byte $0C
  TYA
  ORA ($0C,X)
  TYA
  .byte $03
  ORA $FF98
  CPX #$12
  .byte $E3
  BRK
  .byte $82
  ORA $02E3
  .byte $0C, $07, $E3
  ASL $0D
  .byte $FF
  BRK
  AND $98
  ORA ($39,X)
  TYA
  .byte $03
  RTI
  TYA
  .byte $FF
  CPX #$17
  .byte $E2, $80, $E3
  BRK
  STA ($10,X)
  BRK
  ORA $05,X
  BPL @E832
@E832:
  ASL $06,X
  BPL @E836
@E836:
  .byte $17, $07, $FF
  SBC $08
  STA ($0C,X)
  INX
  AND $98
  CPX #$17
  .byte $E3
  BRK
  STA ($0B,X)
  .byte $0C
  ORA $0F
  ASL A
  PHP
  ORA $0F
  ASL $0C0D
  ANC #$FF
  BRK
  .byte $5B
  TYA
  ORA ($5C,X)
  TYA
  .byte $03, $67
  TYA
  .byte $FF
  CPX #$12
  .byte $E2, $80, $E3
  BRK
  STA ($10,X)
  ORA ($11,X)
  .byte $FF
  CPX #$16
  .byte $E3
  BRK
  STA ($0A,X)
  BRK
  ORA ($02,X)
  .byte $03, $04
  ORA $FF
  BRK
  ADC $0198,X
  STY $98,X
  .byte $03
  STA $FF98,X
  BRK
  .byte $93
  TYA
  ORA ($94,X)
  TYA
  .byte $03
  STA $0498,X
  .byte $93
  TYA
  ORA $93
  TYA
  ASL $93
  TYA
  .byte $07, $93
  TYA
  .byte $FF
  STX $E90C
  ROL $9A,X
  SBC #$14
  TXS
  .byte $FF
  SBC #$A5
  TYA
  .byte $8F
  BPL $E88B
  .byte $F4
  TYA
  CPX #$17
  .byte $E3
  BRK
  STA ($0D,X)
  ASL $0E0F
  ORA $0B0C
  .byte $0C
  ASL A
  ANC #$09
  PHP
  .byte $07
  ASL $05
  ASL $07
  PHP
  NOP
  BRK
  .byte $D2
  TYA
  ORA ($3B,X)
  STA $D303,Y
  TYA
  .byte $04, $D2
  TYA
  ORA $D2
  TYA
  ASL $D2
  TYA
  .byte $07, $D2
  TYA
  .byte $FF
  CPX #$15
@E8D5:
  .byte $E3
  BRK
  STA ($0D,X)
  ASL $0906
  ASL A
  .byte $0C
  ORA $0805
  ORA #$0B
  .byte $0C, $04, $07
  PHP
  ASL A
  ANC #$03
  ASL $07
  ASL $07
  PHP
  ORA #$83
  ASL A
  .byte $8F
  BPL @E8D5
  AND ($E3,X)
  .byte $04, $8F
  ASL A
  .byte $E3, $02
  TXS
  ASL A
  .byte $E3, $03, $97
  ASL A
  .byte $E3, $02
  STA $0A,X
  .byte $E3
  ORA ($96,X)
  ASL A
  .byte $E3, $03
  TYA
  ASL A
  .byte $E3, $04
  STA $E30A,Y
  ORA $97
  ASL A
  .byte $E3
  ASL $99
  ASL A
  .byte $E3, $07
  TYA
  ASL A
  .byte $E3
  PHP
  TXS
  ASL A
  .byte $E3
  ORA #$98
  ASL A
  .byte $E3
  ASL A
  STX $0A,Y
  .byte $E3
  ANC #$95
  ASL A
  .byte $E3, $0C
  STY $0A,X
  .byte $E3
  ORA $0A95
  .byte $E3
  ASL $0A94
  .byte $FF
  STA $0C,X
  SBC #$36
  TXS
  SBC #$14
  TXS
  .byte $FF
  BRK
  EOR $0199
  EOR $0399
  LSR $FF99
  CPX #$21
  CPX #$17
  .byte $E3, $04
  STX $E30A
  ORA ($95,X)
  ASL A
  .byte $E3, $03
  TXA
  ASL A
  .byte $E3, $02
  STX $E30A
  .byte $03
  STA ($0A),Y
  .byte $E3, $04
  STX $E30A
  ORA $8A
  ASL A
  .byte $E3
  ASL $91
  ASL A
  .byte $E3, $07
  ASL A
  .byte $E3
  PHP
  STY $0A,X
  .byte $E3
  ORA #$8D
  ASL A
  .byte $E3
  ASL A
  ASL A
  .byte $E3
  ANC #$0A
@E983:
  .byte $E3, $0C
  ASL A
  .byte $E3
  ORA $E30A
  ASL $0A99
  .byte $FF
  BRK
  TYA
  STA $A601,Y
  STA $9703,Y
  STA $E0FF,Y
  .byte $12, $E2, $80, $E3
  ORA $81
  PLP
  AND #$28
  .byte $27
  STY $26,X
  .byte $FF
  CPX #$12
  .byte $E2, $80, $E3
  ORA ($81,X)
  ORA $16,X
  ORA $14,X
  STY $13,X
  .byte $FF
  BRK
  LDA $0199,X
  LDX $0399,Y
  CMP $99,X
  .byte $FF
  CPX #$12
  .byte $E2
  RTI
  .byte $E3
  ORA $81
  ORA $13,X
  ORA ($0B),Y
  ORA #$0B
  ORA ($10),Y
  ANC #$0A
  ORA #$0C
  ORA #$0C
  ORA #$FF
  CPX #$12
  .byte $E3
  BRK
  STA ($03,X)
  ORA $04
  ASL $05
  .byte $07
  ASL $08
  .byte $E3, $07
  STX $FF0B
  BRK
  BEQ @E983
  ORA ($F0,X)
  STA $F103,Y
  STA $E0FF,Y
  .byte $12, $E3
  BRK
  SBC $8402
  ORA #$93
  ASL $FF
  BRK
  ORA $9A
  ORA ($06,X)
  TXS
  .byte $03
  ORA $9A
  .byte $FF
  CPX #$12
  .byte $E2, $80, $E3
  BRK
  STA ($4A,X)
  .byte $82
  ALR #$E9
  .byte $14
  TXS
  .byte $FF
  STA ($54,X)
  EOR $EB56,Y
  ORA $58,X
  .byte $54
  CPX $04EA
  LSR $9A
  ORA $2B
  TXS
  ASL $4B
  TXS
  .byte $07
  BVC $E9C4
  .byte $FF
  SBC #$36
  TXS
  SBC #$14
  TXS
  .byte $8B, $0C
  INX
  .byte $F7
  CLV
  CPX #$12
  .byte $E2, $80, $E3, $03
  STA ($55,X)
  CLI
  .byte $53
  CLI
  .byte $54
  EOR $0C83,Y
  NOP
  .byte $9E, $0C
  INX
  ORA $B9
  .byte $9E, $0C
  INX
  .byte $13
  LDA $109E,Y
  INX
  .byte $1F
  LDA $5E00,Y
  TXS
  ORA ($5E,X)
  TXS
  .byte $03, $5F
  TXS
  .byte $FF
  CPX #$12
  .byte $E3
  BRK
  STA ($0A,X)
  .byte $F3
  ANC #$08
  ORA #$0A
  .byte $F4
  STY $10
  .byte $07
  PHP
  .byte $07
  STA $07
  PHP
  ORA #$96
  ORA #$FF
  BRK
  .byte $80
  TXS
  ORA ($81,X)
  TXS
  .byte $03, $8F
  TXS
  .byte $FF
  CPX #$12
  .byte $E2, $80, $E3
  BRK
  STA ($00,X)
  ORA $01
  ASL $02
  .byte $07, $FF
  CPX #$15
  .byte $E3
  BRK
  STY $ED
  .byte $02
  ASL $058C
  .byte $FF
  BRK
  LDY $9A
  ORA ($B2,X)
  TXS
  .byte $03
  CPY #$9A
  .byte $FF
  CPX #$16
  .byte $E2, $80, $E3
  BRK
  STA ($10,X)
  BRK
  ASL $06,X
  BPL @EAB1
@EAB1:
  .byte $FF
  CPX #$14
  .byte $E2
  RTI
  .byte $E3, $04
  STA ($22,X)
  AND ($15,X)
  .byte $14
  BIT $25
  .byte $FF
  CPX #$17
  .byte $E3
  BRK
  .byte $82
  ASL $090D
  STA ($0A,X)
  ORA #$08
  .byte $FF
  BRK
  .byte $D7
  TXS
  ORA ($FB,X)
  TXS
  .byte $03, $04, $9B, $FF, $E2
  RTI
  .byte $E3
  BRK
  .byte $82, $0C
  CPX #$32
  CLI
  .byte $F3
  SBC $01
  STY $58
  .byte $82, $0C
  SBC $00
  .byte $F4, $82
  CLI
  .byte $F3
  SBC $01
  STY $58
  SBC $02
  .byte $83
  CLI
  SBC $01
  STY $58
  .byte $F4, $FF
  STX $0C
  .byte $E2, $80, $E3, $03
  INX
  .byte $DB
  TXS
  CPX #$11
  .byte $E3
@EB07:
  ORA $81
  BRK
  ORA ($82,X)
  .byte $02, $F3
  STY $03
  .byte $82
  BPL @EB07
  .byte $83, $02, $F3, $87, $03
  STA $04
  DEY
  .byte $03, $F4, $FF
  BRK
  .byte $27, $9B
  ORA ($28,X)
  .byte $9B, $03
  LSR $9B
  .byte $FF
  CPX #$16
  .byte $E2, $80, $E3
  BRK
  STA ($10,X)
  BRK
  ORA ($01),Y
  .byte $12, $02, $82
  PHP
  ORA #$08
  .byte $07
  STA ($06,X)
  .byte $E3
  PHP
  .byte $82
  PHP
  ORA #$08
  .byte $07
  STA ($06,X)
  .byte $FF
  CPX #$14
  .byte $E3
  BRK
  STA ($0F,X)
  BRK
  ASL $FF01
  BRK
  NOP
  .byte $9B
  ORA ($7A,X)
  .byte $9B, $03
  EOR $FF9B,Y
  CPX #$14
  .byte $E2, $80, $E3
  BRK
  STX $95E4
  .byte $37, $E3
  PHP
  CPX $95
  .byte $37, $E3
  ASL A
  CPX $95
  .byte $37, $E3
  ANC #$E4
  STA $37,X
  .byte $E3, $0C, $83
  CPX $95
  .byte $37, $FF
  CPX #$14
  .byte $E2, $80
  STX $E50C
  .byte $02, $E3
  PHP
  CPX $95
  .byte $37, $E3
  ASL A
  CPX $95
  .byte $37, $E3
  ANC #$E4
  STA $37,X
  .byte $E3, $0C
  CPX $95
  .byte $37, $83, $E3
  ORA $95E4
  .byte $37, $FF
  BRK
  LDX $9B
  ORA ($A7,X)
  .byte $9B, $03
  LDX $9B
  .byte $FF
  CPX #$17
  .byte $E2
  RTI
  .byte $89, $E3
  BRK
  CPX $85
  CLC
  .byte $E3
  ORA ($E4,X)
  STA $18
  .byte $E3, $02
  CPX $85
  CLC
  .byte $E3, $03
  CPX $85
  CLC
  .byte $E3, $04
  CPX $85
  CLC
  .byte $E3
  ORA $E4
  STA $18
  .byte $E3
  ASL $E4
  STA $18
  .byte $E3, $07
  CPX $85
  CLC
  .byte $E3
  PHP
  CPX $85
  CLC
  .byte $E3
  ORA #$E4
  STA $18
  .byte $E3
  ASL A
  CPX $85
  CLC
  .byte $E3
  ANC #$E4
  STA $18
  .byte $E3, $0C
  CPX $85
  CLC
  .byte $E3
  ORA $85E4
  CLC
  .byte $FF
  BRK
  SBC $019B,X
  ASL $9C
  .byte $03, $FC, $9B, $FF, $E3
  BRK
  .byte $E2
  `;
}

// $9C00-$9FFF (1024B): $9C00-$9FFF 代码/数据段8
function build_9C00_9FFF_seg8(): readonly number[] {
  return asm`
  .byte $80
  CPX #$14
  LDX #$49
  .byte $FF, $E3
  ASL A
  SBC $8301
  .byte $0C, $E2, $80
  CPX #$14
  LDX #$49
  .byte $FF
  BRK
  .byte $1C, $9C
  ORA ($1C,X)
  .byte $9C, $03
  ORA $FF9C,X
  CPX #$2F
  .byte $E3
  BRK
  STA $00
  .byte $82, $04, $83
  PHP
  ORA #$0A
  ANC #$0C
  ASL A
  ANC #$0C
  CPX #$2E
  .byte $E3
  BRK
  LDA $0F
  .byte $FF, $04, $42, $9C
  ORA $60
  .byte $9C
  ASL $41
  .byte $9C, $07, $67, $9C, $FF
  CPX #$17
  .byte $E2
  RTI
  .byte $E3
  ORA $E4AD
  .byte $FF
  RTI
  .byte $9F, $E3
  ASL $E353
  ORA $30E0
  .byte $89
  SBC #$1F
  .byte $53
  CPX $0EE3
  SBC #$3F
  .byte $53
  CPX $E5FF
  .byte $02
  STA $0C
  INX
  .byte $42, $9C
  CPX #$17
  .byte $E3
  ORA $0C96
  .byte $E3, $0C, $0C, $E3
  ANC #$0C
  .byte $E3
  ASL A
  .byte $0C, $E3
  ORA #$0C
  .byte $E3
  PHP
  .byte $0C, $E3, $07, $0C, $E3
  ASL $0C
  .byte $E3
  ORA $A6
  .byte $0C, $0C, $9F, $0C, $E3
  ASL $94
  .byte $0C
  TXS
  .byte $0C, $E3, $07
  STA $980C,X
  .byte $0C, $E3
  PHP
  .byte $0C
  STA $E30C,X
  ORA #$0C
  TYA
  .byte $0C, $E3
  ASL A
  STY $0C,X
  .byte $9E, $0C, $E3
  ANC #$0C
  STY $0C,X
  .byte $E3, $0C, $9F, $0C, $E3
  ORA $E30C
  ASL $FF0C
  .byte $04
  CMP ($9C,X)
  ORA $C1
  .byte $9C
  ASL $C1
  .byte $9C, $07, $C2, $9C, $FF
  CPX #$17
  .byte $E3, $04
  BCC @ECCB
  INX
  DEC $9C
@ECCB:
  BRK
  .byte $D4, $9C
  ORA ($D5,X)
  .byte $9C, $03, $D4, $9C, $FF
  CPX #$12
  .byte $E2, $80, $E3
  BRK
  STY $E4
  STA $10
  .byte $83
  CPX $8D
  ORA ($E3),Y
  ASL A
  STY $E4
  STA $10
  .byte $83
  CPX $8D
  ORA ($FF),Y
  BRK
  .byte $F7, $9C
  ORA ($F7,X)
  .byte $9C, $03
  SED
  .byte $9C, $FF
  CPX #$11
  .byte $E3
  BRK
  .byte $83
  ASL A
  .byte $82
  ASL $F390
  SBC $0502
  .byte $F4, $EF, $FF
  BRK
  ORA ($9D),Y
  ORA ($12,X)
  STA $3603,X
  STA $E0FF,X
  ORA ($E2),Y
  .byte $80, $E3
  BRK
  DEY
  CPX $85
  ORA $E3,X
  .byte $04
  CPX $85
  ORA $E3,X
  PHP
  CPX $85
  ORA $E3,X
  ASL A
  CPX $85
  ORA $E3,X
  .byte $0C
  CPX $85
  ORA $E3,X
  ASL $85E4
  ORA $FF,X
  CPX #$14
  .byte $E3
  BRK
  STA ($0F,X)
  ORA $0E
  ORA $0D
  ORA $06
  .byte $07
  PHP
  ORA #$0A
  ANC #$0C
  ANC #$87
  ASL A
  .byte $E3
  PHP
  ASL A
  .byte $E3
  ASL A
  ASL A
  .byte $E3, $0C
  ASL A
  .byte $E3
  ASL $FF0A
  BRK
  ADC ($9D,X)
  ORA ($61,X)
  STA $6203,X
  STA $E0FF,X
  .byte $12, $E3
  BRK
  STA ($0C,X)
  ORA $08EB
  PHP
  ORA $000A
  BPL @ED81
  CPX $00FF
  ADC $019D,X
  TAY
  STA $D303,X
  STA $E0FF,X
  BRK
  .byte $82, $0C
@ED81:
  .byte $E2
  CPY #$E3
  ORA $EB
  .byte $03
  STA ($0A,X)
  BRK
  ANC #$01
  .byte $82, $0C
  CPX $03E3
  SBC #$06
  STA ($0A,X)
  BRK
  ANC #$01
  .byte $82, $0C
  CPX $01E3
  SBC #$0A
  STA ($0A,X)
  BRK
  ANC #$01
  .byte $82, $0C
  CPX $E0FF
  BRK
  .byte $E2
  CPY #$82
  .byte $0C, $E3
  ORA $EB
  .byte $03
  STA ($07,X)
  ASL $05
  .byte $04, $03, $0C
  CPX $03E3
  SBC #$06
  STA ($07,X)
  ASL $05
  .byte $04, $03, $0C
  CPX $01E3
  SBC #$0A
  STA ($07,X)
  ASL $05
  .byte $04, $03, $0C
  CPX $E0FF
  .byte $12, $E3
  BRK
  STA ($0C,X)
  ORA $12EB
  PHP
  ORA $000A
  BPL @EDF2
  CPX $00FF
  SBC $019D
  SBC $039D
  INC $FF9D
  CPX #$14
  .byte $E3
  BRK
@EDF2:
  TXA
  ORA ($89,X)
  .byte $02
  DEY
  .byte $03, $87, $04
  DEY
  ORA $FF
  BRK
  ASL $9E
  ORA ($06,X)
  .byte $9E, $03, $07, $9E, $FF
  CPX #$17
  .byte $E3
  BRK
  STA ($01,X)
  .byte $04
  ORA ($82,X)
  .byte $02
  ORA $02
  .byte $83, $03
  ASL $03
  .byte $04, $07, $04
  ORA $08
  ORA $06
  ORA #$06
  .byte $FF
@EE21:
  BRK
  ANC #$9E
  ORA ($37,X)
  .byte $9E, $03
  ROL A
  .byte $9E, $FF, $E3
  BRK
  CPX #$11
  .byte $E2, $80
  SBC #$4C
  .byte $9E
  BCC @EE86
  .byte $FF
  CPX #$12
  .byte $E2
@EE3A:
  .byte $80, $E3
  ORA $E5
  ORA ($84,X)
  .byte $0C
  SBC #$4C
  .byte $9E
  SBC $00
  SBC $9001
  BVC @EE3A
  .byte $FF, $87
  BMI @EE81
  .byte $34
  STY $37
  .byte $34
  BMI $EDDB
  .byte $34, $37
  RTI
  .byte $44
  STY $40
  .byte $37
  NOP
  BRK
  .byte $67, $9E
  ORA ($72,X)
  .byte $9E, $03
  ROR $9E
  .byte $FF, $E3
  BRK
  .byte $E2, $80
  CPX #$13
  SBC $81
  TXS
  AND $E3FF,Y
  ASL A
  SBC $8301
  .byte $0C, $E2, $80
  CPX #$13
  TXS
  AND $00FF,Y
  DEY
@EE81:
  .byte $9E
  ORA ($88,X)
  .byte $9E, $03
@EE86:
  .byte $89, $9E, $FF
  CPX #$11
  .byte $E3
  BRK
  STA ($00,X)
  ORA ($02,X)
  PHP
  ORA #$10
  BPL @EE21
  ORA #$FF
  BRK
  LDA ($9E,X)
  ORA ($A1,X)
  .byte $9E, $03
  LDX #$9E
  .byte $FF
  CPX #$17
  .byte $E3, $0C, $83
  BRK
  .byte $E3
  ANC #$01
  .byte $E3
  ASL A
  STY $02
  .byte $E3
  ORA #$03
  .byte $E3
  PHP
  STA $04
  .byte $E3, $07, $04, $E3
  ASL $86
  ORA $E3
  ORA $05
  .byte $E3, $04, $87
  ORA $E3
  .byte $03
  ORA $E3
  .byte $02
  DEY
  ORA $E3
  ORA ($05,X)
  .byte $E3
  BRK
  .byte $9C
  ORA $FF
  BRK
  .byte $DC, $9E
  ORA ($E9,X)
  .byte $9E, $03
  CMP $FF9E,X
  CPX #$15
  .byte $E3
  BRK
  STA ($0E,X)
  ORA #$0F
  ORA #$84
  PHP
  .byte $FF
  CPX #$12
  .byte $E2, $80, $E3
@EEEE:
  BRK
  STA ($05,X)
  ASL A
  ASL $0B
  .byte $07
  BPL $EEF6
  BRK
  BRK
  .byte $9F
  ORA ($00,X)
  .byte $9F, $03
  ORA ($9F,X)
  .byte $FF
  CPX #$12
  .byte $E3
  BRK
  .byte $82
  BRK
  ORA ($02,X)
  .byte $03
  ORA ($02,X)
  .byte $03, $04, $02, $03, $04
  ORA $81
  SBC #$03
  .byte $03, $04
  ORA $06
  CPX $04EB
  .byte $04
  ORA $06
  .byte $07
  CPX $03EB
  ORA $06
  .byte $07
  PHP
  CPX $0706
  PHP
  ORA #$07
  PHP
  ORA #$0A
  PHP
  ORA #$0A
  ANC #$09
  ASL A
  ANC #$0C
  ASL A
  ANC #$0C
  ORA $0C0B
  ORA $0C0E
  ORA $960E
  .byte $0F, $FF
  BRK
  .byte $4F, $9F
  ORA ($4F,X)
  .byte $9F, $03
  BVC @EEEE
  .byte $FF, $82
  CPX #$12
  .byte $E3
  BRK
  .byte $0F
  ASL $0C0D
  ASL $0C0D
  ANC #$0D
  .byte $0C
  ANC #$0A
  STA ($0C,X)
  ANC #$0A
  ORA #$0C
  ANC #$0A
  ORA #$0B
  ASL A
  ORA #$08
  ANC #$0A
  ORA #$08
  ANC #$0A
  ORA #$08
  ASL A
  ORA #$08
  .byte $07
  ASL A
  ORA #$08
  .byte $07
  ORA #$08
  .byte $07
  ASL $08
  .byte $07
  ASL $05
  .byte $07
  ASL $05
  .byte $04
  ASL $05
  .byte $04, $03
  ORA $04
  .byte $03, $02, $04, $03, $02
  ORA ($03,X)
  .byte $02
  ORA ($96,X)
  BRK
  .byte $FF
  BRK
  LDA $9F
  ORA ($A5,X)
  .byte $9F, $03
  LDX $9F
  .byte $FF
  CPX #$21
  CPX #$17
  .byte $E3, $0C
  STA $0A
  .byte $E3
  ANC #$0A
  .byte $E3
  ASL A
  ASL A
  .byte $E3
  ORA #$0A
  .byte $E3
  PHP
  ASL A
  .byte $E3, $07
  ASL A
  .byte $E3
  ASL $0A
  .byte $E3
  ORA $0A
  .byte $E3, $04
  STA $E80A
  LSR $99,X
  BRK
  .byte $D3, $9F
  ORA ($D3,X)
  .byte $9F, $03, $D4, $9F, $FF
  CPX #$17
  .byte $E3, $03
  STA ($01,X)
  .byte $04
  ORA ($82,X)
  .byte $02
  ORA $02
  .byte $83, $03
  ASL $03
  .byte $04, $07, $04
  ORA $08
  ORA $06
  ORA #$06
  .byte $07
  ASL A
  PHP
  ANC #$09
  .byte $0C
  ASL A
  ORA $0E0B
  .byte $0C, $0F
  ASL $E80F
  SBC $FF9F,Y
  .byte $FF
  `;
}

// ═══════════════════════════════════════════════════
// Assemble all sections into full 8KB bank
// ═══════════════════════════════════════════════════
const _PRG_BANK_12: readonly number[] = [
  ...build_8000_83FF_seg1(),
  ...build_8400_87FF_seg2(),
  ...build_8800_8BFF_seg3(),
  ...build_8C00_8FFF_seg4(),
  ...build_9000_93FF_seg5(),
  ...build_9400_97FF_seg6(),
  ...build_9800_9BFF_seg7(),
  ...build_9C00_9FFF_seg8(),
];
