/**
 * PRG-ROM MMC3 bank 26 (8KB) — function-based assembly
 * Mapper: 4 (MMC3) | CPU: $8000-$9FFF
 * CDL: code=7331 data=584 unaccessed=277
 *
 * 功能: 核心比赛引擎 — JMP 分发表 + 子程序
 *
 * Pattern: 参考 bank_31.ts
 *   每个 build_xxx() 函数返回其覆盖地址范围的 raw 6502 字节，
 *   最后通过 spread 拼成完整的 8KB 数组
 */

export { _PRG_BANK_26 as default };

console.log('[prg_26_match_core] loaded');

// $8000-$83FF (1024B): $8000-$83FF 代码/数据段1
function build_8000_83FF_segN(): readonly number[] {
  return asm`
  JMP $A103
  JMP $803C
  JMP $84F8
  JMP $86F6
  JMP $8835
  JMP $87E1
  JMP $888D
  JMP $88A8
  JMP $88F3
  JMP $8BE5
  JMP $8B4A
  JMP $8F72
  JMP $8CA4
  JMP $8127
  JMP $A1EB
  JMP $987B
  JMP $95E1
  JMP $8E86
  JMP $85AC
  JMP $904E
  LDA #$00
  STA $044E
  STA $0621
  JSR $C600 ; → bank switch?
  LDA #$02
  JSR $C54B ; → bank switch?
  JSR $8F72 ; → bank switch?
  LDA $0600
  BNE @E05A
  STA $0617
  JMP $8127
@E05A:
  JSR $8223 ; → bank switch?
  LDA #$00
  STA $0616
  LDA $00E2
  AND #$07
@E067:
  CMP $0600
  BCC @E071
  SBC $0600
  BCS @E067
@E071:
  STA $0617
  LDX $0617
  BMI @E081
  CPX $0616
  BNE @E081
  JSR $8176 ; → bank switch?
@E081:
  LDX $0616
  LDA $060B,X
  CMP #$06
  BNE @E08E
  JMP $80DC
@E08E:
  STA $043D
  LDY $0606,X
  STY $043E
  CMP #$00
  BNE @E0AB
  CPY #$01
  BNE @E0AB
  LDA $043B
  CMP #$00
  BEQ @E0AB
  LDA #$00
  STA $043E
@E0AB:
  LDA $0601,X
  STA $0442
  LDA #$07
  JSR $C54B ; → bank switch?
  JSR $8FF3 ; → bank switch?
  LDX $0616
  LDA $0606,X
  STA $043E
  LDA $043B
  ASL A
  ASL A
  ADC $043D
  TAX
  ASL A
  STA $3B
  LDA #$00
  LDY $827C,X
  JSR $8EE9 ; → bank switch?
  JSR $8132 ; → bank switch?
  JSR $814C ; → bank switch?
  INC $0616
  LDA $0616
  CMP $0600
  BEQ @E0EA
  JMP $8074
@E0EA:
  JSR $9085 ; → bank switch?
  JSR $C606 ; → bank switch?
  LDA $043B
  JSR $C509 ; → bank switch?
  INC $0780,X
  STA ($18,X)
  STA ($1E,X)
  STA ($20,X)
  BVS @E082
  LDX #$50
  TXS
  JMP $C618
  JSR $C61E ; → bank switch?
  LDA #$0A
  JSR $C54B ; → bank switch?
  JSR $8170 ; → bank switch?
  LDX #$50
  TXS
  JMP $C612
  LDX #$50
  TXS
  JMP $C60F
  JSR $8170 ; → bank switch?
  LDX #$50
  TXS
  JMP $C621
  JSR $90DD ; → bank switch?
  LDA #$00
  STA $0617
  JMP $80ED
  PHA
  LDA $043D
  ASL A
  ASL A
  TAX
  PLA
  LDY #$00
@E13C:
  CMP $828C,X
  BCS @E145
  INY
  INX
  BNE @E13C
@E145:
  JMP $8148
  STY $0612
  RTS
  BIT $0617
  BMI @E154
  JSR $8E33 ; → bank switch?
@E154:
  LDA #$00
  JSR $C54E ; → bank switch?
  LDA $0612
  JSR $C509 ; → bank switch?
  ADC #$81
  .byte $9C
  STA ($BC,X)
  STA ($D1,X)
  STA ($EA,X)
  STA ($20,X)
  TSX
  .byte $8B
  SEC
  JMP $9095
  BIT $0617
  BPL @E176
  RTS
@E176:
  LDX $043B
  CPX #$02
  BEQ @E19B
  LDA #$00
  STA $062D
  LDA $8278,X
  JSR $C54E ; → bank switch?
  LDA $0444
  AND #$03
  STA $044E
  JSR $C624 ; → bank switch?
  LDA $0617
  ORA #$80
  STA $0617
@E19B:
  RTS
  JSR $8BBA ; → bank switch?
  SEC
  LDA $061C
  SBC $0619
  TAX
  LDA $061D
  SBC #$00
  BPL @E1B2
  LDX #$00
  LDA #$00
@E1B2:
  STX $061C
  STA $061D
  SEC
  JMP $9095
  JSR $8BC8 ; → bank switch?
  CLC
  JSR $9095 ; → bank switch?
  LDA #$00
  STA $0600
  JSR $81ED ; → bank switch?
  LDX #$50
  TXS
  JMP $8BDF
  JSR $8BC8 ; → bank switch?
  CLC
  JSR $9095 ; → bank switch?
  JSR $C606 ; → bank switch?
  JSR $81ED ; → bank switch?
  LDA $0442
  JSR $8E6E ; → bank switch?
  LDX #$50
  TXS
  JMP $C60F
  JMP $9366
  LDA $043B
  CMP #$00
  BNE @E222
  LDA $043D
  CMP #$00
  BNE @E222
  LDA $043E
  AND #$7F
  CMP #$01
  BNE @E222
  LDA $0442
  JSR $C50C ; → bank switch?
  LDA #$50
  STA $043F
  LDA #$00
  STA $0440
  JSR $8FFB ; → bank switch?
  LDA #$00
  STA $0600
  LDX #$50
  TXS
  JMP $8BDF
@E222:
  RTS
  LDX #$00
@E225:
  LDA $0601,X
  JSR $C50C ; → bank switch?
  LDY #$00
  LDA ($34),Y
  CMP #$14
  BEQ @E23E
  CMP #$49
  BEQ @E23E
  INX
  CPX $0600
  BNE @E225
  RTS
@E23E:
  LDA $043B
  BNE @E277
  LDA $060B,X
  BNE @E277
  LDA $0606,X
  CMP #$01
  BNE @E277
  LDA $0601,X
  PHA
  LDY $0600
  DEY
  LDA $0601,Y
  STA $0601,X
  LDA $060B,Y
  STA $060B,X
  LDA $0606,Y
  STA $0606,X
  LDA #$01
  STA $0606,Y
  LDA #$00
  STA $060B,Y
  PLA
  STA $0601,Y
@E277:
  RTS
  ORA $0018,X
  ORA $0080,Y
  BRK
  BRK
  BRK
  BRK
  .byte $80
  BRK
  BRK
  .byte $80
  BRK
  BRK
  BRK
  BRK
  .byte $80
  BRK
  TXS
  RTS
  BMI @E290
@E290:
  TXS
  RTS
  .byte $44
  BRK
  TXS
  RTS
  .byte $44
  BRK
  LDA #$02
  JSR $C54B ; → bank switch?
  JSR $8F72 ; → bank switch?
  LDA #$01
  JSR $C54E ; → bank switch?
  LDA $0600
  BNE @E2B6
  STA $0612
  STA $0617
  JSR $90DD ; → bank switch?
  JMP $83F5
@E2B6:
  LDA #$00
  STA $0616
@E2BB:
  LDX $0616
  LDY $060B,X
  LDA $0601,X
  STA $0442
  BEQ @E2D1
  CMP #$0B
  BEQ @E2D1
  CPY #$06
  BEQ @E2E4
@E2D1:
  STY $043D
  LDA $0606,X
  STA $043E
  LDA #$02
  JSR $C54E ; → bank switch?
  LDA #$14
  JSR $C515 ; → bank switch?
@E2E4:
  INC $0616
  LDA $0616
  CMP $0600
  BNE @E2BB
  LDA #$04
  JSR $C54E ; → bank switch?
  LDA #$00
  STA $0616
  STA $0617
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA #$00
  STA $0612
  LDX $0616
  LDA $060B,X
  STA $043D
  LDA $0606,X
  STA $043E
  LDA $0601,X
  STA $0442
  BEQ @E321
  CMP #$0B
  BNE @E333
@E321:
  LDA $060B,X
  CMP #$04
  BNE @E32B
  JMP $83A2
@E32B:
  LDA #$08
  JSR $C54B ; → bank switch?
  JMP $8349
@E333:
  LDA $060B,X
  CMP #$06
  BNE @E33D
  JMP $83A2
@E33D:
  CMP #$05
  BNE @E344
  JMP $83A2
@E344:
  LDA #$07
  JSR $C54B ; → bank switch?
  JSR $8FF3 ; → bank switch?
  LDX $043B
  LDA $83D7,X
  ASL A
  ASL A
  STA $3B
  LDX $043D
  LDA #$02
  LDY $0442
  BEQ @E367
  CPY #$0B
  BEQ @E367
  LDA $83DD,X
@E367:
  CLC
  ADC $3B
  TAX
  ASL A
  STA $3B
  LDA #$01
  LDY $83E1,X
  JSR $8EE9 ; → bank switch?
@E376:
  CMP $83F1,X
  BCS @E37F
  INX
  INY
  BNE @E376
@E37F:
  JSR $8148 ; → bank switch?
  JSR $8E33 ; → bank switch?
  LDA #$06
  LDX #$01
  LDY $0612
  CPY #$02
  BCC @E393
  DEX
  LDA #$05
@E393:
  PHA
  TXA
  LSR A
  JSR $9095 ; → bank switch?
  PLA
  JSR $C54E ; → bank switch?
  LDA #$07
  JSR $C54E ; → bank switch?
  LDA $0612
  CMP #$03
  BCS @E3BC
  LDA $0442
  BEQ @E3B2
  CMP #$0B
  BNE @E3BC
@E3B2:
  LDA $043D
  CMP #$03
  BNE @E3BC
  INC $0617
@E3BC:
  LDA $0612
  CMP #$02
  BCS @E3D4
  INC $0616
  LDA $0616
  CMP $0600
  BEQ @E3D1
  JMP $82FC
@E3D1:
  JSR $9085 ; → bank switch?
@E3D4:
  JMP $83F5
  .byte $02
  BRK
  BRK
  BRK
  ORA ($03,X)
  BRK
  BRK
  BRK
  ORA ($80,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $80
  BRK
  BRK
  .byte $80, $80
  BRK
  BRK
  BRK
  BRK
  BRK
  LDY #$60
  RTI
  BRK
  JSR $C606 ; → bank switch?
  LDA $0612
  JSR $C509 ; → bank switch?
  PHP
  .byte $84
  `;
}

// $8400-$87FF (1024B): $8400-$87FF 代码/数据段2
function build_8400_87FF_segN(): readonly number[] {
  return asm`
  PHP
  STY $3F
  STY $4B
  STY $7C
  STY $20
  TSX
  .byte $8B
  LDA #$08
  JSR $C54E ; → bank switch?
  SEC
  JSR $9095 ; → bank switch?
  JSR $847F ; → bank switch?
  LDA $043B
  JSR $C509 ; → bank switch?
  AND #$84
  .byte $12
  DEC $3C
  STY $3C
  STY $27
  DEC $2A
  DEC $AD
  .byte $17
  ASL $D0
  PHP
  LDA #$00
  STA $0621
  JMP $C618
  LDX #$50
  TXS
  JMP $88F3
  JMP $843C
  JSR $8BC8 ; → bank switch?
  JSR $847F ; → bank switch?
  LDX #$50
  TXS
  JMP $8BDF
  JSR $8BC8 ; → bank switch?
  LDA $0442
  BEQ @E470
  CMP #$0B
  BEQ @E470
  LDX $043D
  CPX #$02
  BNE @E46A
  LDA $0442
  JSR $8E6E ; → bank switch?
  LDX #$50
  TXS
  JMP $C60F
@E46A:
  LDX #$50
  TXS
  JMP $C630
@E470:
  STA $05FB
  JSR $8E6E ; → bank switch?
  LDX #$50
  TXS
  JMP $C633
  JMP $9366
  LDA $0617
  BNE @E485
  RTS
@E485:
  JSR $C551 ; → bank switch?
  LDY #$0A
  LDA #$06
  STA ($34),Y
  RTS
  JSR $C551 ; → bank switch?
  LDY #$0A
  LDA ($34),Y
  BNE @E4EE
  LDA $0635
  BPL @E4A2
  EOR #$FF
  CLC
  ADC #$01
@E4A2:
  TAX
  LDA $0637
  BPL @E4AD
  EOR #$FF
  CLC
  ADC #$01
@E4AD:
  TAY
  JSR $C539 ; → bank switch?
  LDX #$08
@E4B3:
  CMP $84EF,X
  BEQ @E4BD
  DEX
  BPL @E4B3
  BMI @E4EE
@E4BD:
  LDA #$33
  CPX #$06
  BCC @E4C5
  LDA #$55
@E4C5:
  CMP $00E2
  BCC @E4EE
  LDX $0600
  CPX #$05
  BCS @E4EE
  LDA $05FB
  BEQ @E4DA
  CPX #$04
  BCS @E4EE
@E4DA:
  LDA $0600,X
  STA $0601,X
  DEX
  BPL @E4DA
  LDA $05FB
  EOR #$0B
  STA $0601
  INC $0600
@E4EE:
  RTS
  .byte $03, $0F, $1B
  BPL @E510
  ORA $0504,X
  ORA ($A9),Y
  ORA ($8D,X)
  BRK
  ASL $AD
  .byte $FB
  ORA $08
  EOR #$0B
  STA $0601
  STA $0442
  PLP
  BNE @E514
  LDA #$02
  JSR $C54B ; → bank switch?
  JMP $852F
@E514:
  LDA #$14
  JSR $C515 ; → bank switch?
  LDA #$00
  STA $11
  STA $12
  JSR $C52D ; → bank switch?
  LDA #$32
  JSR $C54E ; → bank switch?
  LDA #$04
  STA $0621
  JSR $C600 ; → bank switch?
  LDA #$08
  JSR $C54B ; → bank switch?
  JSR $8FF3 ; → bank switch?
  JSR $C551 ; → bank switch?
  LDX #$F3
  LDY #$00
  LDA ($34),Y
  CMP #$21
  BEQ @E548
  CMP #$40
  BNE @E54A
@E548:
  LDX #$CD
@E54A:
  LDA #$00
  CPX $00E2
  BCS @E553
  LDA #$80
@E553:
  LDX #$00
  STX $3B
  TAX
  PHP
  LDA #$03
  PLP
  JSR $8F1F ; → bank switch?
  LDY #$00
@E561:
  CMP $86B9,Y
  BCS @E56B
  BEQ @E56B
  INY
  BNE @E561
@E56B:
  LDX $05FB
  BNE @E591
  LDX $002B
  CPX #$05
  BNE @E591
  LDX $0446
  BEQ @E591
  LDA $043C
  BEQ @E591
  CMP #$03
  BEQ @E589
  CPX #$04
  BCS @E591
@E589:
  LDY #$02
  BIT $00E2
  BPL @E591
  INY
@E591:
  JSR $8148 ; → bank switch?
  LDA #$00
  STA $0616
  LDA #$09
  JSR $C54E ; → bank switch?
  LDA $0612
  JSR $C509 ; → bank switch?
  LDY $0585
  STX $1C
  STX $46
  STX $A2
  BRK
  LDA $0441
  JSR $8BD4 ; → bank switch?
  JSR $85E3 ; → bank switch?
  LDA #$30
  JSR $C54E ; → bank switch?
  JSR $987B ; → bank switch?
  LDA $05FB
  EOR #$0B
  STA $05FB
  JSR $C50C ; → bank switch?
  LDA #$00
  LDY #$05
  STA ($34),Y
  LDY #$07
  STA ($34),Y
  LDY #$0A
  STA ($34),Y
  LDA #$04
  STA $0629
  LDX #$50
  TXS
  JMP $C636
  LDX $05FB
  BEQ @E5ED
  JSR $904E ; → bank switch?
  LDX #$01
@E5ED:
  INC $0028,X
  LDA #$01
  JSR $C52A ; → bank switch?
  RTS
  BIT $063E
  BPL @E601
  LDA #$32
  JSR $C55D ; → bank switch?
  RTS
@E601:
  JSR $C56F ; → bank switch?
  RTS
  LDA $043C
  AND #$3F
  CMP #$03
  BCC @E5AC
  LDA $05FB
  EOR #$0B
  STA $05FB
  LDX #$50
  TXS
  JMP $C633
  JSR $8BC8 ; → bank switch?
  LDA #$00
  STA $0600
  JSR $86D3 ; → bank switch?
  JSR $86BD ; → bank switch?
  LDA $0616
  BEQ @E640
  LDA #$B0
  LDX $05FB
  BEQ @E638
  LDA #$50
@E638:
  STA $0635
  LDA #$80
  STA $0637
@E640:
  LDX #$50
  TXS
  JMP $8BDF
  JSR $8BC8 ; → bank switch?
  JSR $86BD ; → bank switch?
  LDA $043D
  CMP #$01
  BEQ @E661
  LDA $05FB
  EOR #$0B
  JSR $8E6E ; → bank switch?
  LDX #$50
  TXS
  JMP $C633
@E661:
  LDA $00E2
  AND #$07
  LDY $05FB
  BNE @E66D
  EOR #$07
@E66D:
  TAX
  ASL A
  ASL A
  ASL A
  STA $3A
  LDA #$30
  LDY $05FB
  BNE @E67C
  LDA #$90
@E67C:
  CLC
  ADC $3A
  STA $0635
  LDA $00E3
  AND #$0F
  CMP $86B1,X
  BCC @E692
  SBC $86B1,X
  JMP $8687
@E692:
  ASL A
  ASL A
  ASL A
  ADC #$50
  BIT $00E3
  BPL @E69E
  EOR #$FF
@E69E:
  STA $0637
  LDA #$01
  STA $05FF
  LDA #$00
  STA $0600
  JSR $86D3 ; → bank switch?
  JMP $8BE5
  .byte $03, $03, $03
  ASL $06
  ASL $06
  ASL $BF
  .byte $BB, $87
  BRK
  JSR $C551 ; → bank switch?
  LDA #$07
  LDX $0443
  CPX #$02
  BCC @E6CB
  LDA #$0B
@E6CB:
  LDY #$05
  CLC
  ADC ($34),Y
  STA ($34),Y
  RTS
  LDA $00E2
  CMP #$40
  BCS @E6F5
  JSR $C551 ; → bank switch?
  LDY #$07
  LDA ($34),Y
  CMP #$50
  BCS @E6F5
  ADC #$4F
  CMP #$80
  BCC @E6ED
  LDA #$7F
@E6ED:
  STA ($34),Y
  LDY #$06
  LDA #$04
  STA ($34),Y
@E6F5:
  RTS
  LDA #$03
  STA $0621
  LDA #$01
  STA $0600
  LDA $05FB
  EOR #$0B
  STA $0601
  STA $0442
  LDA #$02
  JSR $C54B ; → bank switch?
  LDA #$31
  JSR $C54E ; → bank switch?
  JSR $C600 ; → bank switch?
  JSR $8F72 ; → bank switch?
  LDA $043B
  CMP #$01
  BNE @E732
  LDA #$00
  STA $044E
  LDA #$18
  JSR $C54E ; → bank switch?
  LDX #$50
  TXS
  JMP $C612
@E732:
  LDA #$08
  JSR $C54B ; → bank switch?
  JSR $8FF3 ; → bank switch?
  LDA $043D
  SEC
  SBC #$05
  STA $3B
  LDA $043B
  ASL A
  ADC $3B
  TAX
  ASL A
  STA $3B
  LDA #$04
  LDY $87D7,X
  JSR $8EE9 ; → bank switch?
  STA $3A
  JSR $8F59 ; → bank switch?
  LSR A
  LSR A
  CLC
  ADC $3A
  BCC @E762
  LDA #$FF
@E762:
  LDY #$00
@E764:
  CMP $87DD,Y
  BCS @E76E
  BEQ @E76E
  INY
  BNE @E764
@E76E:
  JSR $8148 ; → bank switch?
  JSR $8E33 ; → bank switch?
  LDA #$0A
  JSR $C54E ; → bank switch?
  LDA $0612
  JSR $C509 ; → bank switch?
  .byte $89, $87, $9F, $87, $B7, $87, $C3, $87, $D4, $87
  JSR $8BBA ; → bank switch?
  JSR $8485 ; → bank switch?
  LDA $043B
  CMP #$00
  BNE @E799
  JMP $88F3
@E799:
  LDX #$50
  TXS
  JMP $892A
  JSR $8BBA ; → bank switch?
  JSR $8485 ; → bank switch?
  LDA $00E2
  CMP #$40
  BCS @E7B1
  LDA #$24
  JSR $8CF5 ; → bank switch?
@E7B1:
  LDX #$50
  TXS
  JMP $8BDF
  JSR $8BC8 ; → bank switch?
  JSR $8485 ; → bank switch?
  LDX #$50
  TXS
  JMP $8BDF
  JSR $8BC8 ; → bank switch?
  LDA $05FB
  EOR #$0B
  JSR $8E6E ; → bank switch?
  LDX #$50
  TXS
  JMP $C633
  JMP $9366
  BRK
  .byte $80
  BRK
  BRK
  .byte $80
  BRK
  TAY
  NOP
  .byte $52
  BRK
  LDA $05FB
  EOR #$0B
  STA $41
  INC $41
  LDA #$0A
  STA $3B
  LDA $41
  JSR $C50C ; → bank switch?
  LDY #$0A
  LDA ($34),Y
  .byte $D0, $35  ; BNE $882E
  LDY #$06
  LDA ($34),Y
  TAX
  LDY #$08
  `;
}

// $8800-$8BFF (1024B): $8800-$8BFF 代码/数据段3
function build_8800_8BFF_segN(): readonly number[] {
  return asm`
  LDA ($34),Y
  TAY
  JSR $C539 ; → bank switch?
  CMP $05FE
  BNE @E82E
  LDX $0600
  CPX #$05
  BCS @E82E
  LDA $05FB
  BEQ @E81B
  CPX #$04
  BCS @E82E
@E81B:
  LDA $00E2
  SBC $00E3
  CMP $061A
  BCS @E82E
  LDA $41
  STA $0601,X
  INC $0600
@E82E:
  INC $41
  DEC $3B
  .byte $D0, $BA  ; BNE $87EE
  RTS
  LDA $0600
  BNE @E83B
  RTS
@E83B:
  LDA #$00
  STA $0616
@E840:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $044E
  PHA
  LDA #$00
  STA $044E
  LDX $0616
  LDA $0601,X
  STA $0442
  LDX $061B
  LDA $888B,X
  STA $043D
  LDA #$00
  STA $043E
  LDA $0442
  LDA #$07
  JSR $C54B ; → bank switch?
  JSR $888D ; → bank switch?
  PLA
  STA $044E
  JSR $88A8 ; → bank switch?
  INC $0616
  LDA $0616
  CMP $0600
  BNE @E840
  LDA #$00
  STA $0600
  STA $05FF
  RTS
  BRK
  .byte $02
  LDA #$00
  STA $3A
  LDA $043B
  ASL A
  ASL A
  ADC $043D
  TAX
  ASL A
  STA $3B
  LDA #$05
  LDY $88EB,X
  JSR $8EE9 ; → bank switch?
  JMP $8132
  LDA #$0B
  JSR $C54E ; → bank switch?
  LDA $0612
  JSR $C509 ; → bank switch?
  ADC #$81
  .byte $9C
  STA ($BB,X)
  DEY
  CMP $88,X
  JSR $8BC8 ; → bank switch?
  LDA $0442
  JSR $C50C ; → bank switch?
  LDY #$06
  LDA ($34),Y
  STA $0635
  LDY #$08
  LDA ($34),Y
  STA $0637
  JMP $81BC
  JSR $8BC8 ; → bank switch?
  CLC
  JSR $9095 ; → bank switch?
  LDA $0442
  JSR $8E6E ; → bank switch?
  JSR $C606 ; → bank switch?
  LDX #$50
  TXS
  JMP $C60F
  .byte $80
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $80
  BRK
  LDA #$00
  STA $043B
  LDA $05FB
  EOR #$0B
  STA $0442
  LDA $00E2
  LDY #$00
@E905:
  CMP $8928,Y
  BCS @E90F
  BEQ @E90F
  INY
  BNE @E905
@E90F:
  JSR $8148 ; → bank switch?
  LDA #$00
  STA $0616
  LDA #$0C
  JSR $C54E ; → bank switch?
  LDA $0612
  JSR $C509 ; → bank switch?
  LDY $0585
  STX $1C
  STX $10
  BRK
  LDY #$00
  LDA #$00
  STA $043B
  STA $043C
  LDA $00E2
@E937:
  CMP $8975,Y
  BCS @E941
  BEQ @E941
  INY
  BNE @E937
@E941:
  JSR $8148 ; → bank switch?
  LDA #$0D
  JSR $C54E ; → bank switch?
  LDA $0612
  JSR $C509 ; → bank switch?
  EOR $89,X
  EOR $89,X
  .byte $72, $89
  BIT $044C
  BPL @E96F
  LDA $0441
  CMP #$14
  BNE @E96F
  JSR $9070 ; → bank switch?
  JSR $85E3 ; → bank switch?
  LDA #$47
  JSR $C54E ; → bank switch?
  JMP $85BC
@E96F:
  JMP $85AC
  JMP $8BDF
  LSR $45,X
  BRK
  LDA #$02
  JSR $C54B ; → bank switch?
  JSR $8F72 ; → bank switch?
  LDA #$0E
  JSR $C54E ; → bank switch?
  LDA $0600
  BNE @E993
  STA $0612
  JSR $90DD ; → bank switch?
  JMP $8A6F
@E993:
  LDA #$00
  STA $0616
@E998:
  LDX $0616
  LDA $060B,X
  CMP #$06
  BEQ @E9BB
  STA $043D
  LDA $0601,X
  STA $0442
  LDA $0606,X
  STA $043E
  LDA #$0F
  JSR $C54E ; → bank switch?
  LDA #$14
  JSR $C515 ; → bank switch?
@E9BB:
  INC $0616
  LDA $0616
  CMP $0600
  BNE @E998
  LDA #$04
  JSR $C54E ; → bank switch?
  LDA #$00
  STA $0616
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA #$00
  STA $0612
  LDX $0616
  LDA $0601,X
  STA $0442
  LDA $0606,X
  STA $043E
  LDA $060B,X
  STA $043D
  CMP #$06
  BNE @E9F6
  JMP $8A4F
@E9F6:
  CMP #$05
  BNE @E9FD
  JMP $8A4F
@E9FD:
  LDA #$07
  JSR $C54B ; → bank switch?
  JSR $8FF3 ; → bank switch?
  LDX $043B
  LDA $8A63,X
  ASL A
  ASL A
  LDX $043D
  ADC $8A6A,X
  TAX
  ASL A
  STA $3B
  LDA #$08
  LDY $83E1,X
  JSR $8EE9 ; → bank switch?
@EA1F:
  CMP $8AAC,X
  BCS @EA28
  INX
  INY
  BNE @EA1F
@EA28:
  JSR $8148 ; → bank switch?
  LDA #$11
  LDX #$01
  LDY $0612
  CPY #$02
  BCC @EA39
  DEX
  LDA #$10
@EA39:
  PHA
  TXA
  LSR A
  JSR $9095 ; → bank switch?
  PLA
  JSR $C54E ; → bank switch?
  LDA #$12
  JSR $C54E ; → bank switch?
  LDY $0612
  CPY #$02
  BCS @EA60
  INC $0616
  LDA $0616
  CMP $0600
  BEQ @EA5D
  JMP $89D0
@EA5D:
  JSR $9085 ; → bank switch?
@EA60:
  JMP $8A6F
  BRK
  BRK
  BRK
  BRK
  ORA ($00,X)
  .byte $02
  BRK
  BRK
  BRK
  BRK
  ORA ($20,X)
  ASL $C6
  LDA $0612
  JSR $C509 ; → bank switch?
  .byte $80
  TXA
  .byte $80
  TXA
  .byte $DF, $8B, $9C
  TXA
  JSR $8BBA ; → bank switch?
  LDA #$13
  JSR $C54E ; → bank switch?
  LDA $043B
  JSR $C509 ; → bank switch?
  BRK
  BRK
  .byte $12
  DEC $00
  BRK
  BRK
  BRK
  .byte $27
  DEC $00
  BRK
  AND $20C6
  INY
  .byte $8B
  LDA $043D
  CMP #$02
  BNE @EAA9
  JMP $81DE
@EAA9:
  JMP $8BDF
  LDY #$60
  RTI
  BRK
  LDA $0441
  LDX #$02
  JSR $8B3A ; → bank switch?
  LDA $00E2
  AND #$03
  CMP #$03
  BNE @EAC3
  LDA #$00
@EAC3:
  CLC
  ADC #$03
  STA $3A
  LDA $05FB
  EOR #$0B
  CLC
  ADC $3A
  STA $0442
  STA $0601
  LDX #$03
  JSR $8B3A ; → bank switch?
  LDA #$00
  STA $043D
  LDA #$00
  STA $043E
  STA $044E
  JSR $8F72 ; → bank switch?
  LDA #$07
  JSR $C54B ; → bank switch?
  LDA #$0A
  LDX #$00
  STX $3B
  LDX #$80
  JSR $8EE9 ; → bank switch?
  LDY #$00
  LDX $0612
  BNE @EB0A
@EB02:
  CMP $8B46,Y
  BCS @EB0A
  INY
  BNE @EB02
@EB0A:
  JSR $8148 ; → bank switch?
  LDA $0441
  LDX #$FE
  JSR $8B3A ; → bank switch?
  LDA $0442
  LDX #$FD
  JSR $8B3A ; → bank switch?
  LDA #$14
  JSR $C54E ; → bank switch?
  LDA #$00
  STA $061A
  LDA #$02
  STA $05FF
  LDA $0612
  JSR $C509 ; → bank switch?
  .byte $1B
  DEC $1B
  DEC $DF
  .byte $8B
  CMP $88,X
  JSR $C50C ; → bank switch?
  LDY #$03
  TXA
  CLC
  ADC ($34),Y
  STA ($34),Y
  RTS
  LDY #$60
  RTI
  BRK
  JSR $8B9C ; → bank switch?
  BCS @EB50
  RTS
@EB50:
  JSR $C624 ; → bank switch?
  LDA #$00
  STA $0600
  TXA
  LDX #$02
  EOR $05FB
  BEQ @EB62
  LDX #$01
@EB62:
  STX $0621
  LDA #$FF
  STA $061A
  JSR $87E1 ; → bank switch?
  LDX #$50
  TXS
  JMP $8B73
  LDA #$0A
  JSR $C609 ; → bank switch?
  LDA #$3F
  LDX $0621
  CPX #$02
  BEQ @EB86
  JSR $848F ; → bank switch?
  LDA #$2F
@EB86:
  JSR $C54E ; → bank switch?
  JSR $8E86 ; → bank switch?
  JSR $C600 ; → bank switch?
  LDA $0621
  CMP #$01
  BNE @EB99
  JMP $8298
@EB99:
  JMP $8978
  LDA $0637
  CMP #$60
  BCC @EBB6
  CMP #$A0
  BCS @EBB6
  LDX #$00
  LDA $0635
  CMP #$50
  BCC @EBB8
  LDX #$0B
  CMP #$B0
  BCS @EBB8
@EBB6:
  CLC
  RTS
@EBB8:
  SEC
  RTS
  LDA $0600
  BEQ @EBC7
  LDA $0441
  LDX #$01
  JMP $8BD4
@EBC7:
  RTS
  LDX #$03
  LDA $0442
  BEQ @EBD4
  CMP #$0B
  BEQ @EBD4
  DEX
@EBD4:
  JSR $C50C ; → bank switch?
  LDY #$00
  LDA ($34),Y
  JSR $C4C8 ; → bank switch?
  RTS
  JSR $9070 ; → bank switch?
  JSR $8C6D ; → bank switch?
  JSR $C606 ; → bank switch?
  JSR $8C42 ; → bank switch?
  .byte $B0, $25  ; BCS $8C12
  LDA #$00
  JSR $C548 ; → bank switch?
  STA $3A
  LDA $47
  PHA
  LDA #$0B
  JSR $C548 ; → bank switch?
  TAX
  PLA
  CMP $47
  `;
}

// $8C00-$8FFF (1024B): $8C00-$8FFF 代码/数据段4
function build_8C00_8FFF_segN(): readonly number[] {
  return asm`
  BCC @EC10
  BEQ @EC09
  STX $3A
  JMP $8C10
@EC09:
  BIT $00E2
  BPL @EC10
  STX $3A
@EC10:
  LDA $3A
  JSR $8E6E ; → bank switch?
  LDA $0441
  JSR $C50C ; → bank switch?
  LDY #$06
  LDA $0635
  STA ($34),Y
  LDY #$08
  LDA $0637
  STA ($34),Y
  LDA #$00
  STA $043C
  JSR $C624 ; → bank switch?
  JSR $8B4A ; → bank switch?
  LDA #$2C
  JSR $C54E ; → bank switch?
  JSR $8E86 ; → bank switch?
  LDX #$50
  TXS
  JMP $C60F
  LDA $0600
  BEQ @EC5F
  LDX #$00
@EC49:
  LDA $0601,X
  BEQ @EC59
  CMP #$0B
  BEQ @EC59
  LDA $060B,X
  CMP #$05
  BEQ @EC61
@EC59:
  INX
  CPX $0600
  BNE @EC49
@EC5F:
  CLC
  RTS
@EC61:
  LDA $00E2
  CMP #$40
  BCS @EC5F
  LDA $0601,X
  SEC
  RTS
  LDA $00E2
  AND #$83
  LDX $0637
  JSR $8C92 ; → bank switch?
  STA $0637
  LDA $00E3
  AND #$83
  STA $062C
  LDX $0635
  JSR $8C92 ; → bank switch?
  STA $0635
  LDA #$00
  JSR $8CA4 ; → bank switch?
  RTS
  ASL A
  PHP
  ASL A
  ASL A
  PLP
  BCC @EC9D
  EOR #$FF
  ADC #$00
@EC9D:
  STA $3A
  TXA
  CLC
  ADC $3A
  RTS
  LSR A
  PHP
  LDA $0635
  CMP #$30
  BCC @ECCB
  CMP #$D0
  BCS @ECCB
  LDA $0637
  CMP #$50
  BCC @ECBE
  CMP #$B0
  BCS @ECBE
  PLP
  RTS
@ECBE:
  PLP
  JSR $8CEA ; → bank switch?
  JSR $C55A ; → bank switch?
  LDX #$50
  TXS
  JMP $911C
@ECCB:
  PLP
  JSR $8CEA ; → bank switch?
  JSR $C55A ; → bank switch?
  LDA $05FB
  BEQ @ECD9
  LDA #$80
@ECD9:
  EOR $0635
  BPL @ECE4
  LDX #$50
  TXS
  JMP $92EE
@ECE4:
  LDX #$50
  TXS
  JMP $955E
  BCC @ECF4
  LDA $05FB
  EOR #$0B
  STA $05FB
@ECF4:
  RTS
  PHA
  JSR $C551 ; → bank switch?
  PLA
  LDY #$07
  CLC
  ADC ($34),Y
  BPL @ED03
  LDA #$7F
@ED03:
  STA ($34),Y
  RTS
  PHP
  ASL A
  TAX
  LDA $8D93,X
  STA $3C
  LDA $8D94,X
  STA $3D
  LDA $00E2
  ADC $00E3
  ROR A
  LDX #$00
  PLP
  BPL @ED4A
  BIT $3A
  BMI @ED4A
  LDY $0621
  CPY #$04
  BNE @ED33
  LDY $0442
  BEQ @ED3A
  CPY #$0B
  BEQ @ED3A
@ED33:
  LDY $00E3
  CPY #$F8
  BCC @ED4A
@ED3A:
  INX
  TAY
  LDA $043E
  ORA #$80
  STA $043E
  TYA
  AND #$7F
  JMP $8D60
@ED4A:
  LDY $3B
  CMP ($3C),Y
  BCC @ED57
  BEQ @ED57
  SBC ($3C),Y
  JMP $8D4C
@ED57:
  LDX #$00
  INY
  CLC
  ADC ($3C),Y
  BCC @ED60
  INX
@ED60:
  BIT $3A
  BPL @ED74
  LSR $33
  ROR $32
  LSR $33
  ROR $32
  LSR $33
  ROR $32
  LSR $33
  ROR $32
@ED74:
  STA $67
  STX $68
  LDA $32
  STA $69
  LDA $33
  STA $6A
  JSR $C521 ; → bank switch?
  LDA #$00
  STA $0074
  LDA $6C
  LDY $6D
  BEQ @ED90
  LDA #$FF
@ED90:
  STA $71
  RTS
  LDA #$8D
  CMP #$8D
  CMP #$8D
  SBC #$8D
  SBC #$8D
  .byte $F7
  STA $8E17
  .byte $17
  STX $8E17
  AND ($8E),Y
  .byte $2F
  STX $40C0
  STA $9900,Y
  BRK
  BRK
  BRK
  STA $9900,Y
  BRK
  CPY #$40
  BRK
  BRK
  STA $C000,Y
  RTI
  STA $0000,Y
  BRK
  STA $9900,Y
  BRK
  CPY #$40
  BRK
  BRK
  .byte $80, $80
  CPY #$40
  CPY #$40
  BRK
  BRK
  STA $8000,Y
  .byte $80, $80, $80
  BRK
  BRK
  STA $C000,Y
  RTI
  .byte $80, $80
  BRK
  BRK
  CPY #$40
  STA $9900,Y
  BRK
  BRK
  BRK
  .byte $80, $80, $B3
  BRK
  NOP
  AND $00
  BRK
  BRK
  BRK
  CMP $BF32
  BRK
  CPY #$40
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  INC $00
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $80, $80
  BRK
  BRK
  .byte $80, $80, $80, $80
  BRK
  BRK
  BRK
  BRK
  CPY #$40
  .byte $80, $80
  BRK
  BRK
  BRK
  BRK
  STA $C000,Y
  RTI
  BRK
  BRK
  BRK
  BRK
  .byte $80, $80, $80, $80
  LDA $0600
  BEQ @EE6D
  LDX $043D
  LDA $0442
  BEQ @EE44
  CMP #$0B
  BNE @EE4A
@EE44:
  CPX #$04
  BEQ @EE6D
  BNE @EE52
@EE4A:
  CPX #$05
  BEQ @EE6D
  CPX #$06
  BEQ @EE6D
@EE52:
  JSR $8B9C ; → bank switch?
  LDA $0612
  BNE @EE6D
  LDA #$0F
  BCS @EE60
  LDA #$3F
@EE60:
  CMP $00E2
  BCC @EE6D
  LDA #$04
  STA $0612
  JSR $C55A ; → bank switch?
@EE6D:
  RTS
  STA $0441
  LDX #$00
  CMP #$0B
  BCC @EE79
  LDX #$0B
@EE79:
  TXA
  EOR $05FB
  STX $05FB
  BEQ @EE85
  JSR $C56F ; → bank switch?
@EE85:
  RTS
  LDA $0446
  CMP #$05
  BEQ @EEE8
  CMP #$04
  BNE @EEE8
  LDA $05FB
  BNE @EEE8
  LDA $0441
  JSR $C50C ; → bank switch?
  LDY #$00
  LDA ($34),Y
  CMP #$01
  BEQ @EEE8
  LDY #$06
  LDA ($34),Y
  BPL @EEE8
  LDA $0441
  STA $05FC
  LDA #$01
@EEB2:
  PHA
  JSR $C50C ; → bank switch?
  LDY #$00
  LDA ($34),Y
  CMP #$01
  BEQ @EEC4
  PLA
  CLC
  ADC #$01
  BNE @EEB2
@EEC4:
  PLA
  STA $0441
  INC $0446
  LDA #$00
  STA $0615
  STA $062D
  LDA #$17
  JSR $C54E ; → bank switch?
  LDA #$00
  STA $043B
  LDA #$04
  STA $043C
  LDX #$50
  TXS
  JMP $85AC
@EEE8:
  RTS
  JSR $8D06 ; → bank switch?
  LDA $71
  LSR A
  LSR A
  STA $0619
  LDA $061D
  STA $70
  LDA $061C
  ASL A
  ROL $70
  ASL A
  ROL $70
  ASL A
  ROL $70
  ASL A
  ROL $70
  ASL A
  ROL $70
  ASL A
  ROL $70
  STA $6F
  JSR $C51E ; → bank switch?
  LDA $6F
  LDY $70
  BEQ @EF1A
  LDA #$FF
@EF1A:
  LDX #$00
  LDY #$00
  RTS
  JSR $8D06 ; → bank switch?
  LDA $061C
  STA $67
  LDA $061D
  STA $68
  LDA #$C0
  STA $69
  LDA #$00
  STA $6A
  JSR $C521 ; → bank switch?
  LDA $6B
  STA $6F
  LDA $6C
  STA $70
  JSR $C51E ; → bank switch?
  LDA $6F
  LDY $70
  BEQ @EF4A
  LDA #$FF
@EF4A:
  STA $3A
  JSR $8F59 ; → bank switch?
  CLC
  ADC $3A
  BCC @EF56
  LDA #$FF
@EF56:
  LDY #$00
  RTS
  JSR $C551 ; → bank switch?
  LDY #$05
  LDA ($34),Y
  SEC
  SBC $062B
  BCS @EF68
  LDA #$00
@EF68:
  LDY #$07
  CLC
  ADC ($34),Y
  BCC @EF71
  LDA #$FF
@EF71:
  RTS
  LDA $0441
  LDA #$06
  JSR $C54B ; → bank switch?
  LDA #$00
  STA $3A
  LDA $05FB
  BNE @EF9A
  LDA $043B
  CMP #$02
  BNE @EF97
  LDA $0600
  BNE @EF97
  LDA #$00
  STA $043F
  STA $0440
@EF97:
  JSR $8FFB ; → bank switch?
@EF9A:
  BIT $3A
  BMI @EFAD
  LDA $00E2
  CMP #$08
  BCS @EFAD
  LDA $043C
  ORA #$80
  STA $043C
@EFAD:
  LDX #$00
  LDA $00E2
  ADC $00E3
  ROR A
  ORA #$80
  BIT $043C
  BPL @EFC0
  INX
  AND #$7F
@EFC0:
  ADC #$00
  BCC @EFC5
  INX
@EFC5:
  STA $67
  STX $68
  BIT $3A
  BPL @EFDD
  LSR $33
  ROR $32
  LSR $33
  ROR $32
  LSR $33
  ROR $32
  LSR $33
  ROR $32
@EFDD:
  LDA $32
  STA $69
  LDA $33
  STA $6A
  JSR $C521 ; → bank switch?
  LDA $6C
  STA $061C
  LDA $6D
  STA $061D
  RTS
  LDA $05FB
  BNE @EFFB
  STA $3A
  RTS
@EFFB:
  LDA #$00
  STA $3A
  .byte $A0
  `;
}

// $9000-$93FF (1024B): $9000-$93FF 代码/数据段5
function build_9000_93FF_segN(): readonly number[] {
  return asm`
  BRK
  LDA ($34),Y
  CMP #$20
  BNE @E02F
  LDA $05FB
  BNE @E018
  LDA $043B
  BNE @E018
  LDA $043C
  CMP #$03
  BCS @E02F
@E018:
  LDA $0440
  LSR A
  TAX
  LDA $043F
  ROR A
  CLC
  ADC $043F
  STA $043F
  TXA
  ADC $0440
  STA $0440
@E02F:
  LDY #$01
  SEC
  LDA ($34),Y
  SBC $043F
  TAX
  INY
  LDA ($34),Y
  SBC $0440
  BPL @E047
  LDX #$00
  LDA #$00
  SEC
  ROR $3A
@E047:
  STA ($34),Y
  DEY
  TXA
  STA ($34),Y
  RTS
  BIT $044B
  BPL @E06F
  LDA #$00
  STA $044B
  STA $002F
  LDA #$0C
@E05D:
  PHA
  JSR $C50C ; → bank switch?
  LDY #$01
  LDA #$00
  STA ($34),Y
  PLA
  CLC
  ADC #$01
  CMP #$16
  BNE @E05D
@E06F:
  RTS
  BIT $044C
  BPL @E084
  LDA $0441
  CMP #$14
  BNE @E084
  LDA #$00
  STA $044C
  STA $03F1
@E084:
  RTS
  LDX $043B
  LDA $908E,X
  JMP $C603
  .byte $02
  ORA ($01,X)
  .byte $04, $04
  ORA ($02,X)
  PHP
  LDA $043D
  ASL A
  TAX
  PLP
  BCC @E09F
  INX
@E09F:
  LDA $90F4,X
  LDY $0442
  BEQ @E0DA
  CPY #$0B
  BEQ @E0DA
  TXA
  PHA
  LSR A
  BCC @E0C3
  LDA $0442
  JSR $C50C ; → bank switch?
  LDX $043D
  LDA $9102,X
  LDY #$0A
  STA ($34),Y
  JMP $90D5
@E0C3:
  LDA $0441
  BEQ @E0D5
  CMP #$0B
  BEQ @E0D5
  JSR $C50C ; → bank switch?
  LDY #$0A
  LDA #$05
  STA ($34),Y
@E0D5:
  PLA
  TAX
  LDA $90E6,X
@E0DA:
  JMP $C603
  LDX $043B
  LDA $9109,X
  JMP $C603
  .byte $02
  ORA ($01,X)
  ORA ($02,X)
  ORA ($01,X)
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
  .byte $02
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ASL $06
  ASL $06
  ASL $00
  BRK
  ORA ($00,X)
  BRK
  ORA ($02,X)
  BRK
  ORA ($18,X)
  ADC $05F9
  STA $05F9
  TXA
  JSR $C603 ; → bank switch?
  RTS
  LDA #$29
  JSR $C54E ; → bank switch?
  JSR $987B ; → bank switch?
  LDA $0635
  AND #$F8
  CLC
  ADC #$04
  STA $0635
  LDA #$4C
  BIT $0637
  BPL @E138
  LDA #$B4
@E138:
  STA $0637
  LDX #$00
  BIT $0635
  BPL @E143
  INX
@E143:
  BIT $0637
  BPL @E14A
  INX
  INX
@E14A:
  LDA $05FB
  BEQ @E153
  TXA
  EOR #$03
  TAX
@E153:
  LDA $92EA,X
  CLC
  ADC $05FB
  STA $0441
  JSR $C50C ; → bank switch?
  LDY #$06
  LDA $0635
  STA ($34),Y
  LDY #$08
  LDA $0637
  STA ($34),Y
  LDX $0635
  LDA #$08
  BIT $0637
  BPL @E17A
  LDA #$F8
@E17A:
  CLC
  ADC $0637
  TAY
  JSR $C539 ; → bank switch?
  STA $0624
  STA $061E
  JSR $91D2 ; → bank switch?
  LDA #$2A
  JSR $C54E ; → bank switch?
  LDA #$02
  LDX #$0A
  JSR $9110 ; → bank switch?
  JSR $85F6 ; → bank switch?
  LDA $0441
  JSR $C50C ; → bank switch?
  LDA $061E
  STA $05FE
  JSR $C536 ; → bank switch?
  TYA
  LDY #$08
  STA ($34),Y
  STA $0637
  TXA
  LDY #$06
  STA ($34),Y
  STA $0635
  LDA $0624
  STA $0638
  LDA #$00
  STA $043C
  STA $061A
  LDA #$01
  STA $061B
  JSR $C60C ; → bank switch?
  JMP $C63C
  LDA #$00
  STA $11
  STA $12
  LDA $05FB
  BEQ @E1E0
  JMP $9298
@E1E0:
  LDA #$38
  JSR $C54E ; → bank switch?
  LDA #$81
  STA $062D
  LDA #$1F
  STA $0494
  LDA #$0F
  JSR $C52A ; → bank switch?
  LDA #$00
  STA $0626
  STA $0627
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $001C
  AND #$03
  BEQ @E234
  LSR A
  LDA #$0C
  BCS @E20F
  LDA #$F4
@E20F:
  CLC
  ADC $0626
  TAX
  BPL @E21B
  EOR #$FF
  CLC
  ADC #$01
@E21B:
  CMP #$3C
  BCC @E222
  LDX $0626
@E222:
  TXA
  CLC
  ADC $061E
  CMP #$F0
  BCC @E22E
  LDX $0626
@E22E:
  STX $0626
  JMP $925F
@E234:
  LDA $001C
  AND #$0C
  BEQ @E280
  LSR A
  LSR A
  LSR A
  LDA #$01
  BCS @E244
  LDA #$FF
@E244:
  BIT $0637
  BPL @E24E
  EOR #$FF
  CLC
  ADC #$01
@E24E:
  CLC
  ADC $0627
  BPL @E256
  LDA #$00
@E256:
  CMP #$05
  BCC @E25C
  LDA #$04
@E25C:
  STA $0627
  LDA $061E
  CLC
  ADC $0626
  STA $0624
  LDA $0627
  BIT $0637
  BPL @E276
  EOR #$FF
  CLC
  ADC #$01
@E276:
  CLC
  ADC $0624
  STA $0624
  JSR $C63F ; → bank switch?
@E280:
  LDA #$80
  AND $001E
  BNE @E28A
  JMP $91FC
@E28A:
  JSR $C642 ; → bank switch?
  BCS @E292
  JMP $91FC
@E292:
  LDA #$00
  STA $062D
  RTS
  LDA #$0C
  STA $3A
@E29C:
  LDA $3A
  JSR $C50C ; → bank switch?
  LDY #$06
  LDA ($34),Y
  SEC
  SBC $0635
  BCS @E2AF
  EOR #$FF
  ADC #$01
@E2AF:
  CMP #$20
  BCS @E2C5
  LDY #$08
  LDA ($34),Y
  SEC
  SBC $0637
  BCS @E2C1
  EOR #$FF
  ADC #$01
@E2C1:
  CMP #$20
  BCC @E2E4
@E2C5:
  INC $3A
  LDA $3A
  CMP #$16
  BNE @E29C
  LDA #$14
  STA $3A
  JSR $C50C ; → bank switch?
  LDA $061E
  JSR $C536 ; → bank switch?
  TYA
  LDY #$08
  STA ($34),Y
  TXA
  LDY #$06
  STA ($34),Y
@E2E4:
  LDA $3A
  STA $05FC
  RTS
  ORA ($05,X)
  .byte $02, $07
  LDA #$24
  JSR $C54E ; → bank switch?
  LDA #$00
  STA $044E
  JSR $987B ; → bank switch?
  LDX #$06
  BIT $0637
  BPL @E303
  INX
@E303:
  STX $061E
  LDA $05FB
  BEQ @E313
  LDA #$09
  JSR $C54B ; → bank switch?
  JMP $9318
@E313:
  LDA #$2E
  JSR $9E5A ; → bank switch?
  LDA $061E
  JSR $9E0D ; → bank switch?
  JSR $9C0F ; → bank switch?
  BCS @E328
  LDA $05FB
  BEQ @E313
@E328:
  LDA $05FB
  BNE @E335
  LDA #$04
  STA $0621
  JSR $C600 ; → bank switch?
@E335:
  JSR $8F72 ; → bank switch?
  LDA #$01
  LDX #$12
  JSR $9110 ; → bank switch?
  JSR $85F6 ; → bank switch?
  LDA $043B
  JSR $C509 ; → bank switch?
  JMP $5993
  .byte $93
  LDA #$25
  JSR $C54E ; → bank switch?
  LDA #$66
  STA $061A
  JMP $C61B
  LDA #$26
  JSR $C54E ; → bank switch?
  LDA #$4D
  STA $061A
  JMP $C615
  LDA #$00
  STA $044E
  JSR $8B9C ; → bank switch?
  BCC @E379
  TXA
  EOR $05FB
  BEQ @E379
  JMP $94CF
@E379:
  LDA #$2B
  JSR $C54E ; → bank switch?
  JSR $987B ; → bank switch?
  LDA $0635
  LDX $05FB
  BEQ @E38E
  EOR #$FF
  CLC
  ADC #$01
@E38E:
  CMP #$A0
  BCC @E395
  JMP $93E4
@E395:
  LDA $05FB
  BEQ @E3BC
  LDA $00E2
  AND #$0F
  CMP #$0A
  BCC @E3A6
  SEC
  SBC #$0A
@E3A6:
  SEC
  ADC #$0B
  CMP $0441
  BNE @E3B7
  CLC
  ADC #$01
  CMP #$16
  BCC @E3B7
  LDA #$0C
@E3B7:
  STA $05FC
  BNE @E3BF
@E3BC:
  JSR $93DE ; → bank switch?
@E3BF:
  LDA #$01
  STA $043B
  LDA #$00
  STA $043C
  LDA #$18
  JSR $C54E ; → bank switch?
  LDA #$04
  LDX #$12
  JSR $9110 ; → bank switch?
  JSR $85F6 ; → bank switch?
  LDX #$50
  TXS
  JMP $C612
  JSR $C648 ; → bank switch?
  JMP $93DE
  TAX
  LDA $0637
  LDY $05FB
  BEQ @E3EF
  EOR #$FF
@E3EF:
  TAY
  JSR $C539 ; → bank switch?
  STA $3B
  LDA #$00
  PHA
  ASL A
  TAX
  LDA $9FB9,X
  STA $3C
  .byte $BD
  `;
}

// $9400-$97FF (1024B): $9400-$97FF 代码/数据段6
function build_9400_97FF_segN(): readonly number[] {
  return asm`
  TSX
  .byte $9F
  STA $3D
  LDY #$00
@E406:
  LDA ($3C),Y
  CMP #$FF
  BEQ @E413
  CMP $3B
  BEQ @E420
  INY
  BNE @E406
@E413:
  PLA
  CLC
  ADC #$01
  CMP #$05
  BNE @E41E
  JMP $9395
@E41E:
  .byte $D0, $D7  ; BNE $93F7
@E420:
  PLA
  STA $0612
@E424:
  LDA #$27
  JSR $9E5A ; → bank switch?
  LDA $0612
  JSR $9E0D ; → bank switch?
  JSR $9C0F ; → bank switch?
  BCC @E424
@E434:
  LDA $05FB
  BNE @E441
  LDA #$04
  STA $0621
  JSR $C600 ; → bank switch?
@E441:
  JSR $9470 ; → bank switch?
  BCC @E434
  LDA #$0E
  JSR $C54B ; → bank switch?
  LDA #$18
  LDX $043B
  CPX #$01
  BEQ @E456
  LDA #$1D
@E456:
  JSR $C54E ; → bank switch?
  LDA #$04
  LDX #$12
  JSR $9110 ; → bank switch?
  JSR $85F6 ; → bank switch?
  LDA $043B
  CMP #$01
  BNE @E46D
  JMP $C612
@E46D:
  JMP $8AB0
  LDX #$03
  LDA $05FB
  BNE @E481
  DEX
  LDA $043B
  CMP #$00
  BEQ @E481
  SEC
  RTS
@E481:
  STX $0612
  TXA
  CLC
  ADC #$28
  JSR $C52A ; → bank switch?
  LDA $05FB
  BNE @E495
  LDA #$03
  JSR $C52A ; → bank switch?
@E495:
  LDA $0612
  JSR $9D1B ; → bank switch?
@E49B:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA #$0C
  AND $001E
  BEQ @E4B2
  LDA $0612
  EOR #$40
  STA $0612
  JSR $9D1B ; → bank switch?
@E4B2:
  LDA #$40
  AND $001E
  BEQ @E4BB
  CLC
  RTS
@E4BB:
  LDA #$80
  AND $001E
  BEQ @E49B
  LDX #$00
  BIT $0612
  BVC @E4CA
  INX
@E4CA:
  STX $0612
  SEC
  RTS
  LDA #$1F
  JSR $C54E ; → bank switch?
  JSR $987B ; → bank switch?
  LDA #$2F
  JSR $9E5A ; → bank switch?
  LDA #$20
  JSR $C54E ; → bank switch?
  LDA #$05
  JSR $9E0D ; → bank switch?
  JSR $C645 ; → bank switch?
  JSR $9509 ; → bank switch?
  LDA #$21
  JSR $C54E ; → bank switch?
  LDA #$05
  LDX #$00
  JSR $9110 ; → bank switch?
  LDA #$01
  STA $0616
  LDA $0612
  JSR $C509 ; → bank switch?
  LDY $DF85
  .byte $8B, $1C
  STX $A9
  BRK
  STA $043C
  STA $043E
  STA $044E
  LDA #$05
  STA $0621
  JSR $C600 ; → bank switch?
  LDA #$0D
  JSR $C54B ; → bank switch?
  JSR $8F72 ; → bank switch?
  LDA #$08
  JSR $C54B ; → bank switch?
  LDA #$00
  STA $3A
  STA $3B
  LDA #$09
  LDX #$80
  JSR $8F1F ; → bank switch?
  PHA
  LDY #$00
  LDX $043B
  CPX $043D
  BNE @E546
  CMP #$C8
  BCS @E546
  INY
@E546:
  TYA
  BNE @E559
  LDA $043B
  CMP #$08
  BEQ @E559
  LDA $00E2
  CMP #$1F
  BCS @E559
  LDY #$02
@E559:
  PLA
  JSR $8148 ; → bank switch?
  RTS
  LDA $05FB
  JSR $C50C ; → bank switch?
  LDY #$0A
  LDA #$00
  STA ($34),Y
  LDA #$05
  LDX $05FB
  STX $0441
  BEQ @E576
  LDA #$E9
@E576:
  STA $05FE
  JSR $C536 ; → bank switch?
  STX $0635
  STY $0637
  LDA #$27
  JSR $C54E ; → bank switch?
  JSR $987B ; → bank switch?
  LDA #$0A
  JSR $9E0D ; → bank switch?
  LDA $00E2
  AND #$0F
  CMP #$0A
  BCC @E59A
  SBC #$0A
@E59A:
  SEC
  ADC $05FB
  STA $05FC
  JSR $C56F ; → bank switch?
  JSR $C61E ; → bank switch?
  LDA $05FB
  JSR $8E6E ; → bank switch?
  LDA #$01
  STA $043B
  LDA #$00
  STA $043C
  LDA #$28
  JSR $C54E ; → bank switch?
  LDA #$02
  LDX #$0C
  JSR $9110 ; → bank switch?
  LDA #$1A
  STA $061A
  LDA #$01
  STA $061B
  JSR $C60C ; → bank switch?
  LDA $05FC
  STA $0441
  LDA #$1C
  JSR $C54E ; → bank switch?
  LDX #$50
  TXS
  JMP $C60F
  JSR $96CC ; → bank switch?
  LDA #$00
  STA $0616
  STA $038E
  STA $038B
  STA $030A
  STA $0307
  BIT $00E2
  BPL @E5FC
  LDA #$0B
@E5FC:
  STA $05FB
  STA $0619
  LDA #$41
  JSR $C52A ; → bank switch?
  LDA #$33
  JSR $C55D ; → bank switch?
  LDA #$39
  JSR $C54E ; → bank switch?
  LDA $0616
  LSR A
  STA $0617
  BCS @E623
  CMP #$05
  BNE @E623
  LDA #$45
  JSR $C54E ; → bank switch?
@E623:
  LDA $0617
@E626:
  CMP #$0A
  BCC @E62E
  SBC #$0A
  BCS @E626
@E62E:
  TAX
  LDA $05FB
  BEQ @E63C
  STX $3A
  LDA #$09
  SEC
  SBC $3A
  TAX
@E63C:
  LDA $0431,X
  LDX $05FB
  BEQ @E647
  CLC
  ADC #$0B
@E647:
  STA $0441
  LDA #$22
  JSR $C54E ; → bank switch?
  JSR $9509 ; → bank switch?
  LDA #$23
  JSR $C54E ; → bank switch?
  JSR $96AE ; → bank switch?
  LDA $0616
  INC $0616
  LSR A
  PHP
  STA $3A
  SEC
  LDA #$03
  SBC $3A
  TAX
  BCS @E66E
  LDX #$FF
@E66E:
  INX
  INX
  PLP
  BCS @E674
  INX
@E674:
  STX $3A
  LDA $0610
  SEC
  SBC $0611
  BCS @E683
  EOR #$FF
  ADC #$01
@E683:
  CMP $3A
  BCS @E692
  LDA $05FB
  EOR #$0B
  STA $05FB
  JMP $9611
@E692:
  LDX #$00
  JSR $96A3 ; → bank switch?
  INX
  JSR $96A3 ; → bank switch?
  LDA #$33
  JSR $C54E ; → bank switch?
  JMP $C554
  LDA $0610,X
  CLC
  ADC $0028,X
  STA $0028,X
  RTS
  LDA $0612
  JSR $C509 ; → bank switch?
  TSX
  STX $CA,Y
  STX $CB,Y
  STX $AE,Y
  .byte $FB
  ORA $F0
  .byte $02
  LDX #$01
  INC $0610,X
  LDA #$41
  JSR $C52A ; → bank switch?
  RTS
  RTS
  RTS
  LDA #$01
  JSR $C55D ; → bank switch?
  LDA #$00
  STA $11
  STA $12
  LDA #$00
  STA $0430
  STA $053C
  LDA #$80
  STA $053A
  LDX #$00
  LDA #$12
  JSR $C530 ; → bank switch?
  JSR $C533 ; → bank switch?
  BRK
  JMP ($A904)
  .byte $02
  JSR $C515 ; → bank switch?
  LDA #$00
  STA $0469
  LDA #$00
  STA $0469
  STA $E000
  LDA #$00
  STA $0490
  LDA #$2E
  STA $0491
  LDA #$00
  STA $05CE
  STA $4A
  STA $4B
  LDA $20
  AND #$FC
  STA $20
  LDA #$3E
  JSR $C52A ; → bank switch?
  JSR $986B ; → bank switch?
  LDX #$00
  LDA #$13
  JSR $C530 ; → bank switch?
  JSR $C533 ; → bank switch?
  BRK
  JMP ($A904)
  BRK
  STA $0624
  JSR $9828 ; → bank switch?
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA #$0C
  AND $001E
  BEQ @E777
  PHA
  LDA #$09
  SEC
  SBC $0430
  STA $3A
  PLA
  LDX #$01
  AND #$04
  BNE @E757
  LDX #$FF
@E757:
  TXA
  CLC
  ADC $0624
  BMI @E777
  CMP $3A
  BCC @E764
  LDA $3A
@E764:
  CMP $0624
  BEQ @E777
  PHA
  LDA $0624
  JSR $982C ; → bank switch?
  PLA
  STA $0624
  JSR $9828 ; → bank switch?
@E777:
  LDA #$40
  AND $001E
  BEQ @E789
  LDX $0430
  BEQ @E789
  DEC $0430
  JSR $986B ; → bank switch?
@E789:
  LDA #$80
  AND $001E
  BEQ @E7F6
  LDA $0430
  CMP #$05
  BNE @E79A
  JMP $97F9
@E79A:
  LDA $0624
  STA $3A
  LDA #$01
  STA $3B
  LDA #$00
  STA $3C
@E7A7:
  LDA $3B
  LDX $0430
  BEQ @E7BC
@E7AE:
  CMP $0430,X
  BEQ @E7B8
  DEX
  BNE @E7AE
  BEQ @E7BC
@E7B8:
  INC $3B
  BNE @E7A7
@E7BC:
  LDA $3C
  INC $3C
  CMP $3A
  BEQ @E7C8
  INC $3B
  BNE @E7A7
@E7C8:
  LDA $3B
  LDX $0430
  STA $0431,X
  INC $0430
  LDA #$09
  SEC
  SBC $0430
  STA $3A
  LDA $0624
  SBC $3A
  BCC @E7F3
  LDA $0624
  LDX $3A
  STX $0624
  JSR $982C ; → bank switch?
  LDA $0624
  JSR $9828 ; → bank switch?
@E7F3:
  JSR $986B ; → bank switch?
@E7F6:
  JMP $9739
  LDA #$01
  STA $3A
  LDY #$0A
  .byte $A2
  `;
}

// $9800-$9BFF (1024B): $9800-$9BFF 代码/数据段7
function build_9800_9BFF_segN(): readonly number[] {
  return asm`
  BRK
  LDA $3A
@E803:
  CMP $0431,X
  BEQ @E816
  INX
  CPX #$05
  BNE @E803
  LDX $0430
  STA $0431,X
  INC $0430
@E816:
  INC $3A
  DEY
  .byte $D0, $E4  ; BNE $97FF
  JSR $C569 ; → bank switch?
  LDA #$00
  STA $8E
  LDA #$01
  STA $0469
  RTS
  LDX #$B1
  BNE @E82E
  LDX #$00
@E82E:
  PHA
@E82F:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $0515
  BNE @E82F
  LDA #$01
  STA $0515
  LDY #$01
  STY $04A5
  DEY
  STY $04A9
  STX $04A8
  PLA
  STY $04A6
  LSR A
  ROR $04A6
  LSR A
  ROR $04A6
  PHA
  LDA $04A6
  ADC #$02
  STA $04A6
  PLA
  ADC #$21
  STA $04A7
  LDA #$80
  STA $0515
  RTS
  LDA #$01
  STA $0441
  LDA #$3F
  JSR $C52A ; → bank switch?
  LDA #$40
  JSR $C52A ; → bank switch?
  RTS
  LDA #$37
  JSR $C54E ; → bank switch?
  LDA #$00
  STA $11
  STA $12
  LDA #$01
  JSR $C515 ; → bank switch?
  JSR $C52D ; → bank switch?
  LDA #$2E
  STA $87
@E892:
  LDA #$00
  STA $062D
  JSR $990C ; → bank switch?
  LDA #$33
  JSR $C52A ; → bank switch?
  LDA #$04
  STA $0624
  JSR $9D1B ; → bank switch?
@E8A7:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA #$0C
  AND $001E
  BEQ @E8BE
  LDA $0624
  EOR #$40
  STA $0624
  JSR $9D1B ; → bank switch?
@E8BE:
  BIT $001C
  BPL @E8A7
  JSR $990C ; → bank switch?
  BIT $0624
  BVS @E8D0
  LDA #$02
  STA $87
  RTS
@E8D0:
  LDA #$00
  STA $0624
  LDA #$34
  JSR $C52A ; → bank switch?
  LDA #$03
  STA $063D
  JSR $C566 ; → bank switch?
  LDA #$85
  STA $062D
  LDA $0624
  STA $0622
  LDA #$04
  JSR $C563 ; → bank switch?
  BCC @E892
  CMP #$04
  BEQ @E892
  STA $0624
  JSR $9901 ; → bank switch?
  JMP $98D5
  JSR $C509 ; → bank switch?
  NOP
  STA $993A,Y
  BVC @E8A3
  LDA $209B
  AND $A9C5
  BRK
  JSR $C52A ; → bank switch?
  LDA #$01
  JSR $C52A ; → bank switch?
  RTS
  LDA #$35
  JSR $C52A ; → bank switch?
  LDA $002C
  STA $0622
  LDA $002C
  STA $0627
  LDA #$05
  JSR $C563 ; → bank switch?
  LDX $0627
  BCC @E936
  TAX
@E936:
  STX $002C
  RTS
  LDA #$36
  JSR $C52A ; → bank switch?
  LDA $002D
  STA $0622
  LDA #$06
  JSR $C563 ; → bank switch?
  BCC @E94F
  STA $002D
@E94F:
  RTS
  LDA $002A
  CMP #$02
  BEQ @E95A
  JMP $9AC7
@E95A:
  LDA #$37
  JSR $C52A ; → bank switch?
  LDA #$00
  STA $0622
  LDA #$07
  JSR $C563 ; → bank switch?
  BCS @E96C
  RTS
@E96C:
  JSR $9972 ; → bank switch?
  JMP $990C
  JSR $C509 ; → bank switch?
  ADC $C799,Y
  TXS
  LDA $0450
  CMP #$03
  BCC @E992
  LDA #$38
  JSR $C52A ; → bank switch?
@E985:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA #$C0
  AND $001E
  BEQ @E985
  RTS
@E992:
  LDA #$00
  STA $062D
  LDA #$3A
  JSR $C52A ; → bank switch?
  LDA #$00
@E99E:
  PHA
  JSR $9AAC ; → bank switch?
  BCC @E9AD
  PLA
  PHA
  LDY #$2C
  LDX #$B2
  JSR $9F41 ; → bank switch?
@E9AD:
  PLA
  CLC
  ADC #$01
  CMP #$0A
  BNE @E99E
  LDA #$00
@E9B7:
  PHA
  JSR $9AAC ; → bank switch?
  PLA
  BCC @E9C5
  CLC
  ADC #$01
  CMP #$0A
  BNE @E9B7
@E9C5:
  STA $0625
  LDY #$2C
  JSR $9F37 ; → bank switch?
@E9CD:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $0625
  JSR $9B90 ; → bank switch?
  BCC @E9FE
  LDA $9F0F,X
  PHA
  JSR $9AAC ; → bank switch?
  PLA
  BCC @E9EC
  LDX $3A
  JSR $9BA4 ; → bank switch?
  JMP $99DA
@E9EC:
  PHA
  LDA $0625
  LDY #$2C
  JSR $9F3F ; → bank switch?
  PLA
  STA $0625
  LDY #$2C
  JSR $9F37 ; → bank switch?
@E9FE:
  LDA #$80
  AND $001E
  BNE @EA0D
  LDA #$40
  AND $001E
  BEQ @E9CD
  RTS
@EA0D:
  LDA #$3B
  JSR $C52A ; → bank switch?
  LDA #$01
  LDX $0625
  CPX #$08
  BCC @EA1D
  LDA #$00
@EA1D:
  STA $0626
  LDY #$16
  JSR $9F37 ; → bank switch?
@EA25:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $0626
  BEQ @EA49
  JSR $9B90 ; → bank switch?
  BCC @EA49
  LDA $9EB7,X
  PHA
  LDA $0626
  LDY #$16
  JSR $9F3F ; → bank switch?
  PLA
  STA $0626
  LDY #$16
  JSR $9F37 ; → bank switch?
@EA49:
  LDA #$40
  AND $001E
  BEQ @EA53
  JMP $9979
@EA53:
  LDA #$80
  AND $001E
  BEQ @EA25
  LDA $0625
  CLC
  ADC #$16
  JSR $C50C ; → bank switch?
  LDA $34
  STA $3A
  LDA $35
  STA $3B
  LDA $0626
  JSR $C50C ; → bank switch?
  LDY #$00
@EA73:
  LDA ($3A),Y
  TAX
  LDA ($34),Y
  STA ($3A),Y
  TXA
  STA ($34),Y
  INY
  CPY #$04
  BNE @EA73
  LDY #$00
  LDA ($3A),Y
  LDX $0450
  STA $0451,X
  INX
  STX $0450
  LDA #$3B
  JSR $C52A ; → bank switch?
@EA95:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $001C
  AND #$C0
  BEQ @EA95
  LDX $0450
  CPX #$03
  BCS @EAAB
  JMP $9979
@EAAB:
  RTS
  CLC
  ADC #$16
  JSR $C50C ; → bank switch?
  LDY #$00
  LDA ($34),Y
  LDX $0450
  BEQ @EAC5
@EABB:
  CMP $0450,X
  BNE @EAC2
  SEC
  RTS
@EAC2:
  DEX
  BNE @EABB
@EAC5:
  CLC
  RTS
  LDA #$00
  STA $062D
  LDA #$39
  JSR $C52A ; → bank switch?
  LDA #$01
  STA $0625
  LDY #$16
  JSR $9F37 ; → bank switch?
@EADB:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $0625
  JSR $9B90 ; → bank switch?
  BCC @EAFD
  LDA $9EB7,X
  PHA
  LDA $0625
  LDY #$16
  JSR $9F3F ; → bank switch?
  PLA
  STA $0625
  LDY #$16
  JSR $9F37 ; → bank switch?
@EAFD:
  LDA #$80
  AND $001E
  BNE @EB0F
  LDA #$40
  AND $001E
  BEQ @EADB
  JSR $990C ; → bank switch?
  RTS
@EB0F:
  LDA #$01
  CMP $0625
  BNE @EB18
  LDA #$02
@EB18:
  STA $0626
  LDY #$16
  JSR $9F37 ; → bank switch?
@EB20:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $0626
  JSR $9B90 ; → bank switch?
  BCC @EB4F
  LDA $9EB7,X
  CMP $0625
  BNE @EB3D
  LDX $3A
  JSR $9BA4 ; → bank switch?
  LDA $9EB7,X
@EB3D:
  PHA
  LDA $0626
  LDY #$16
  JSR $9F3F ; → bank switch?
  PLA
  STA $0626
  LDY #$16
  JSR $9F37 ; → bank switch?
@EB4F:
  LDA #$80
  AND $001E
  BNE @EB68
  LDA #$40
  AND $001E
  BEQ @EB20
  LDA $0626
  LDY #$16
  JSR $9F3F ; → bank switch?
  JMP $9ADB
@EB68:
  LDA $0625
  JSR $C50C ; → bank switch?
  LDA $34
  STA $3A
  LDA $35
  STA $3B
  LDA $0626
  JSR $C50C ; → bank switch?
  LDY #$00
@EB7E:
  LDA ($3A),Y
  TAX
  LDA ($34),Y
  STA ($3A),Y
  TXA
  STA ($34),Y
  INY
  CPY #$04
  BNE @EB7E
  JMP $9AC7
  PHA
  LDA #$0F
  AND $001E
  BNE @EB9B
  PLA
  CLC
  RTS
@EB9B:
  LDX #$00
@EB9D:
  LSR A
  BCS @EBA3
  INX
  BNE @EB9D
@EBA3:
  PLA
  STX $3A
  ASL A
  ASL A
  ADC $3A
  TAX
  SEC
  RTS
@EBAD:
  LDA #$00
  STA $062D
  LDA #$3C
  JSR $C52A ; → bank switch?
@EBB7:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA #$80
  AND $001E
  BNE @EBCC
  LDA #$40
  AND $001E
  BNE @EBEB
  BEQ @EBB7
@EBCC:
  LDA $002A
  CMP #$02
  BNE @EBEB
  LDA #$3D
  JSR $C52A ; → bank switch?
@EBD8:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA #$40
  AND $001E
  BNE @EBAD
  LDA #$80
  AND $001E
  BEQ @EBD8
@EBEB:
  JMP $990C
  CMP #$FF
  .byte $F0, $1C  ; BEQ $9C0E
  JSR $C536 ; → bank switch?
  LDA $05FB
  .byte $F0, $0A  ; BEQ $9C04
  TYA
  EOR #$FF
  TAY
  TXA
  .byte $49
  `;
}

// $9C00-$9FFF (1024B): $9C00-$9FFF 代码/数据段8
function build_9C00_9FFF_segN(): readonly number[] {
  return asm`
  .byte $FF
  TAX
  INY
  INX
  TYA
  LDY #$08
  STA ($34),Y
  TXA
  LDY #$06
  STA ($34),Y
  RTS
  LDA $05FC
  STA $0626
  JSR $9C1F ; → bank switch?
  LDA $0626
  STA $05FC
  RTS
  LDA #$28
  JSR $C52A ; → bank switch?
  LDA #$00
  STA $0624
  JSR $9D1B ; → bank switch?
@EC2C:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA #$0C
  AND $001E
  BEQ @EC43
  LDA $0624
  EOR #$40
  STA $0624
  JSR $9D1B ; → bank switch?
@EC43:
  LDA #$40
  AND $001E
  BEQ @EC4C
  CLC
  RTS
@EC4C:
  LDA #$80
  AND $001E
  BEQ @EC2C
  BIT $0624
  BVS @EC5A
  SEC
  RTS
@EC5A:
  LDA #$38
  JSR $C54E ; → bank switch?
  LDA #$29
  JSR $C52A ; → bank switch?
  LDA #$01
  STA $0625
  JSR $9D1B ; → bank switch?
  LDA $05FE
  STA $0624
@EC72:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA #$84
  STA $062D
  LDA #$0C
  AND $001E
  BEQ @EC8E
  LDA $0625
  EOR #$40
  STA $0625
  JSR $9D1B ; → bank switch?
@EC8E:
  LDA #$80
  AND $001E
  BEQ @EC72
  BIT $0625
  BVC @ECA1
  LDA #$00
  STA $062D
  SEC
  RTS
@ECA1:
  LDA #$81
  JSR $9D1B ; → bank switch?
  LDA #$81
  STA $062D
  JSR $9DD4 ; → bank switch?
@ECAE:
  LDA #$01
  JSR $C515 ; → bank switch?
  JSR $9D9B ; → bank switch?
  CMP $0624
  STA $0624
  BEQ @ECC1
  JSR $9DD4 ; → bank switch?
@ECC1:
  LDA #$40
  AND $001E
  BEQ @ECD1
  LDA $0625
  JSR $9D1B ; → bank switch?
  JMP $9C72
@ECD1:
  LDA #$80
  AND $001E
  BEQ @ECAE
  LDA $05FC
  CMP #$FF
  BEQ @ECAE
  LDA $0624
  STA $0616
@ECE5:
  LDA #$01
  JSR $C515 ; → bank switch?
  JSR $9D9B ; → bank switch?
  CMP $0624
  STA $0624
  BEQ @ECF8
  JSR $9DBD ; → bank switch?
@ECF8:
  LDA #$40
  AND $001E
  BEQ @ED0B
  LDA $0616
  STA $0624
  JSR $9DBD ; → bank switch?
  JMP $9CAE
@ED0B:
  LDA #$80
  AND $001E
  BEQ @ECE5
  LDA $0625
  JSR $9D1B ; → bank switch?
  JMP $9C72
  PHA
@ED1C:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $0515
  BNE @ED1C
  LDA #$01
  STA $0515
  PLA
  STA $04A5
  AND #$0F
  ASL A
  ASL A
  TAX
  LDA $9D82,X
  STA $04A6
  LDA $9D83,X
  STA $04A7
  LDA $9D84,X
  STA $04AA
  LDA $9D85,X
  STA $04AB
  LDA $04A5
  AND #$0F
  TAX
  LDA #$00
  BIT $04A5
  BMI @ED5E
  BVS @ED5E
  LDA $9D96,X
@ED5E:
  STA $04A8
  LDA #$00
  BIT $04A5
  BMI @ED6D
  BVC @ED6D
  LDA $9D96,X
@ED6D:
  STA $04AC
  LDX #$01
  STX $04A5
  STX $04A9
  DEX
  STX $04AD
  LDA #$80
  STA $0515
  RTS
  CPY $0C22
  .byte $23, $89, $22
  CMP #$22
  CMP #$22
  ORA #$23
  CPY $0C22
  .byte $23
  CMP #$22
  ORA #$23
  INC $F6,X
  INC $F6,X
  LDA ($A9),Y
  .byte $0F
  AND $001E
  BEQ @EDB5
  LDX #$00
@EDA4:
  LSR A
  BCS @EDAA
  INX
  BNE @EDA4
@EDAA:
  LDA $9DB9,X
  CLC
  ADC $0624
  CMP #$F0
  BCC @EDB8
@EDB5:
  LDA $0624
@EDB8:
  RTS
  .byte $0C, $F4
  ORA ($FF,X)
  LDA $05FC
  JSR $C50C ; → bank switch?
  LDA $0624
  JSR $C536 ; → bank switch?
  TYA
  LDY #$08
  STA ($34),Y
  TXA
  LDY #$06
  STA ($34),Y
  RTS
  LDA #$01
  STA $3A
@EDD8:
  LDA $3A
  CMP $0441
  BEQ @EDF4
  JSR $C50C ; → bank switch?
  LDY #$06
  LDA ($34),Y
  TAX
  LDY #$08
  LDA ($34),Y
  TAY
  JSR $C539 ; → bank switch?
  CMP $0624
  BEQ @EE02
@EDF4:
  INC $3A
  LDA $3A
  CMP #$0B
  BNE @EDD8
  LDX #$FF
  LDA #$1C
  BNE @EE06
@EE02:
  LDA #$1D
  LDX $3A
@EE06:
  STX $05FC
  JSR $C52A ; → bank switch?
  RTS
  STA $3A
  ASL A
  TAX
  LDA $9FF0,X
  STA $3C
  LDA $9FF1,X
  STA $3D
  LDA #$00
  STA $3B
@EE1F:
  LDA $3B
  JSR $C50C ; → bank switch?
  LDX $3B
  CPX $0441
  BEQ @EE46
  LDY $05FB
  CPX #$0B
  BCC @EE3A
  TXA
  SBC #$0B
  TAX
  TYA
  EOR #$0B
  TAY
@EE3A:
  STX $3E
  TYA
  CLC
  ADC $3E
  TAY
  LDA ($3C),Y
  JMP $9E4B
@EE46:
  LDX $3A
  LDA $A0F8,X
  JSR $9BEE ; → bank switch?
  INC $3B
  LDA $3B
  CMP #$16
  BNE @EE1F
  JSR $C645 ; → bank switch?
  RTS
  PHA
  LDA #$01
  JSR $C515 ; → bank switch?
  JSR $C52D ; → bank switch?
  PLA
  LDX $05FB
  BEQ @EE6F
  LDA #$14
  STA $0441
  RTS
@EE6F:
  JSR $C52A ; → bank switch?
  LDA #$01
  STA $0441
  LDY #$00
  JSR $9F3B ; → bank switch?
@EE7C:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA #$0F
  AND $001E
  BEQ @EEAF
  LDX #$00
@EE8A:
  LSR A
  BCS @EE90
  INX
  BNE @EE8A
@EE90:
  STX $3A
  LDA $0441
  ASL A
  ASL A
  ADC $3A
  TAX
  LDA $9EB7,X
  PHA
  LDA $0441
  LDY #$00
  JSR $9F3F ; → bank switch?
  PLA
  STA $0441
  LDY #$00
  JSR $9F3B ; → bank switch?
@EEAF:
  LDA #$80
  AND $001E
  BEQ @EE7C
  RTS
  .byte $FF, $FF, $FF, $FF
  ORA $09
  .byte $02, $04
  ASL $0A
  .byte $03
  ORA ($07,X)
  .byte $07, $04, $02
  PHP
  PHP
  ORA ($03,X)
  ORA #$01
  ASL $08
  ASL A
  .byte $02, $07
  ORA $03
  .byte $03
  PHP
  ASL $04
  .byte $04
  ORA $07
  ORA ($05,X)
  ASL A
  ASL A
  .byte $02
  ASL $09
  ORA #$03
  .byte $07
  ORA #$0A
  ORA $09
  .byte $02, $04
  ASL $0A
  .byte $03
  ORA ($07,X)
  BRK
  .byte $04, $02
  PHP
  BRK
  ORA ($03,X)
  ORA #$01
  ASL $08
  ASL A
  .byte $02, $07
  ORA $00
  .byte $03
  PHP
  ASL $00
  .byte $04
  ORA $07
  ORA ($05,X)
  ASL A
  BRK
  .byte $02
  ASL $00
  ORA #$03
  ASL $01
  .byte $02, $04
  PHP
  .byte $02
  BRK
  ORA $09
  BRK
  ORA ($06,X)
  BRK
  .byte $04
  ORA $07
  ORA ($05,X)
  .byte $03
  ORA #$02
  .byte $03, $04
  PHP
  .byte $03, $07, $07
  ORA #$04
  ASL $06
  ORA ($07,X)
  ORA #$09
  .byte $02
  ORA $08
  PHP
  LDX #$B1
  BNE @EF41
  LDX #$F6
  BNE @EF41
  LDX #$00
@EF41:
  PHA
@EF42:
  LDA #$01
  JSR $C515 ; → bank switch?
  LDA $0515
  BNE @EF42
  LDA #$01
  STA $0515
  STX $04A8
  STY $04A5
  PLA
  ASL A
  ADC $04A5
  TAX
  LDA #$01
  STA $04A5
  LDA $9F79,X
  STA $04A6
  LDA $9F7A,X
  STA $04A7
  LDA #$00
  STA $04A9
  LDA #$80
  STA $0515
  RTS
  CLC
  .byte $23
  TXA
  .byte $22
  DEX
  .byte $22
  ASL A
  .byte $23
  LSR A
  .byte $23
  STA ($22),Y
  CMP ($22),Y
  ORA ($23),Y
  EOR ($23),Y
  TYA
  .byte $22
  CLD
  .byte $22
  ASL $23,X
@EF91:
  STY $22
  CPY $22
  .byte $04, $23, $44, $23
  STA $CD22
  .byte $22
  ORA $4D23
  .byte $23
  STX $22,Y
  DEC $22,X
  .byte $C2, $22, $02, $23, $42, $23
  CMP #$22
  ORA #$23
  EOR #$23
  BNE @EFD5
  BPL @EFD8
  .byte $17, $23, $57, $23, $C3, $9F
  CMP $D59F
  .byte $9F
  DEC $E69F,X
  .byte $9F
  LDY $C0,X
  CMP ($CC,X)
  CMP $D9D8
  CPX $E5
  .byte $FF
  TAY
  LDA #$AA
  .byte $AB
  LDA $B6,X
  .byte $B7, $FF
@EFD5:
  LDY $AEAD
@EFD8:
  .byte $AF
  CLV
  LDA $BBBA,Y
  .byte $FF
  BCS @EF91
  .byte $B2, $B3
  LDY $BEBD,X
  .byte $FF, $BF
  DEX
  AXS #$D6
  .byte $D7, $E2, $E3
  INC $FFEF
  ASL $A0
  .byte $1C
  LDY #$32
  LDY #$48
  LDY #$5E
  LDY #$74
  LDY #$8A
  LDY #$A0
  .byte $A0
  `;
}

// ═══════════════════════════════════════════════════
// Assemble all sections into full 8KB bank
// ═══════════════════════════════════════════════════
const _PRG_BANK_26: readonly number[] = [
  ...build_8000_83FF_segN(),
  ...build_8400_87FF_segN(),
  ...build_8800_8BFF_segN(),
  ...build_8C00_8FFF_segN(),
  ...build_9000_93FF_segN(),
  ...build_9400_97FF_segN(),
  ...build_9800_9BFF_segN(),
  ...build_9C00_9FFF_segN(),
];
