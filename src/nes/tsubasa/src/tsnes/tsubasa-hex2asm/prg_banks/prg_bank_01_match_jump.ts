/**
 * PRG-ROM MMC3 bank 01 (8KB) — function-based assembly
 * Mapper: 4 (MMC3) | CPU: $8000-$9FFF
 * CDL: code=4239 data=3556 unaccessed=397
 *
 * 功能: 比赛引擎主体 (球员移动/对抗/射门)
 *
 * Pattern: 参考 bank_31.ts
 *   每个 build_xxx() 函数返回其覆盖地址范围的 raw 6502 字节，
 *   最后通过 spread 拼成完整的 8KB 数组
 */


import { asm } from '../_6502asm';
export { _PRG_BANK_01 as default };

console.log('[prg_01_match_jump] loaded');

// ════════ $8000-$83FF (1024B): JMP跳转分发表 + 球员属性打包初始化 ═══════=
function build_8000_83FF_jumpTableAndInit(): readonly number[] {
  return asm`
  JMP $A01E
  JMP $A10D
  JMP $A4EB
  JMP $A64C
  JMP $A6D2
  JMP $AFC2
  JMP $AF79
  JMP $AF8A
  JMP $B050
  JMP $A39B
  LDA $0448
  LSR A
  LDA $26
  ROL A
  CLC
  LDX $0446
  CPX #$05
  ROL A
  STA $0660
  LDA $044D
  ROR A
  LDA $E1
  ROR A
  AND #$B0
  STA $0661
  LDA #$00
@E03D:
  PHA
  JSR $B016 ; → bank switch?
  STY $EC
  STX $ED
  JSR $B02E ; → bank switch?
  STA $E7
  JSR $B045 ; → bank switch?
  STY $EA
  STX $EB
  LDA $EC
  SEC
  SBC $EA
  STA $EC
  LDA $ED
  SBC $EB
  STA $ED
  LDA $E7
  CLC
  ADC #$01
  JSR $B045 ; → bank switch?
  TYA
  SEC
  SBC $EA
  STA $EA
  TXA
  SBC $EB
  STA $EB
  LSR $EB
  ROR $EA
  LSR $EB
  ROR $EA
  JSR $9E0C ; → bank switch?
  PLA
  TAX
  LDA $E7
  ASL A
  ASL A
  ORA $EC
  STA $0656,X
  INX
  TXA
  CMP #$0A
  BNE @E03D
  LDA $E2
  AND #$F0
  STA $0663
  LSR A
  LSR A
  LSR A
  LSR A
  ORA $0661
  STA $EB
  JSR $A402 ; → bank switch?
  LDA $EC
  STA $0662
  LDA $ED
  AND #$0F
  ORA $0661
  STA $0661
  LDA #$00
  STA $ED
@E0B3:
  LDX $ED
  JSR $A438 ; → bank switch?
  LDX #$FF
@E0BA:
  INX
  CMP $B255,X
  BNE @E0BA
  LDA $ED
  CMP #$0F
  BCS @E0CF
  INC $EB
  TXA
  CLC
  ADC $EB
  AND #$3F
  TAX
@E0CF:
  LDA $BC6E,X
  STA $EC
  LDX $ED
  LDA $B241,X
  CLC
  ADC #$80
  TAY
  LDX #$22
  LDA $EC
  JSR $88CA ; → bank switch?
  LDA $99
  BPL @E0EC
  EOR #$41
  STA $99
@E0EC:
  INC $ED
  LDA $ED
  CMP #$12
  BCC @E0B3
@E0F4:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  LDA $1E
  BPL @E0F4
  LDA #$8A
  STA $E6
  LDA #$22
  STA $E7
  LDY #$04
  LDX #$0B
  JSR $98E8 ; → bank switch?
  RTS
  JSR $9BA0 ; → bank switch?
  LDA #$00
  LDY #$F0
@E114:
  STA $0566,Y
  INY
  BNE @E114
  LDX #$2C
  LDY #$2D
  JSR $9B6F ; → bank switch?
  LDX #$2E
  LDY #$2F
  JSR $9B74 ; → bank switch?
  LDA #$00
  STA $8E
  STA $90
  STA $7B
  LDA #$2E
  STA $8F
  STA $91
  LDA #$09
  JSR $8920 ; → bank switch?
  LDA #$6E
  STA $E6
  LDA #$BC
  STA $E7
  LDA #$C4
  STA $E8
  LDA #$21
  STA $E9
  LDA #$00
  STA $EC
  LDA #$05
  STA $EB
@E153:
  LDA #$0D
  STA $ED
@E157:
  LDY $EC
  LDA ($E6),Y
  LDY $E8
  LDX $E9
  JSR $88CA ; → bank switch?
  INC $E8
  INC $E8
  INC $EC
  DEC $ED
  BNE @E157
  LDA $E8
  CLC
  ADC #$26
  STA $E8
  LDA $E9
  ADC #$00
  STA $E9
  DEC $EB
  BNE @E153
  LDY #$F8
@E17F:
  LDA $B205,Y
  STA $0460,Y
  INY
  BNE @E17F
  LDY #$96
  LDX #$B2
  JSR $B0C0 ; → bank switch?
  LDA #$04
  LDX #$30
  JSR $997A ; → bank switch?
  LDA #$8A
  STA $4C
  LDA #$33
  STA $0700
  LDA #$00
  STA $ED
  JMP $A201
@E1A6:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  JSR $A3D0 ; → bank switch?
  BIT $1E
  BPL @E1B5
  JMP $A231
@E1B5:
  BVC @E1BA
  JMP $A260
@E1BA:
  LDA $1E
  AND #$20
  BEQ @E1C3
  JMP $A252
@E1C3:
  LDA $1E
  AND #$10
  BEQ @E1CC
  JMP $A26C
@E1CC:
  LDA $1C
  AND #$0F
  BEQ @E1A6
  LDY #$14
  STY $EA
  LDX $EC
  LDA $B1E8,X
  LDY #$00
  JSR $A4D8 ; → bank switch?
  LDA $1C
  AND #$0F
  TAX
  LDA $B2ED,X
  BMI @E1F7
  CLC
  ADC $EC
  CMP #$41
  BCC @E201
  SEC
  SBC #$41
  JMP $A201
@E1F7:
  CLC
  ADC $EC
  CMP #$41
  BCC @E201
  CLC
  ADC #$41
@E201:
  STA $EC
  TAX
  LDA $B1E8,X
  AND #$C0
  ASL A
  ROL A
  ROL A
  TAY
  LDA $B229,Y
  TAY
  LDA $B1E8,X
  JSR $A4D8 ; → bank switch?
@E217:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  JSR $A3D0 ; → bank switch?
  LDA $1C
  AND #$0F
  BNE @E228
  JMP $A1A6
@E228:
  DEC $EA
  BNE @E217
  LDY #$08
  JMP $A1D4
  LDX $EC
  LDA $B255,X
  CMP #$FF
  BEQ @E26C
  TXA
  LDY $ED
  STA $0664,Y
  LDA $BC6E,X
  LDX $ED
  LDY $B241,X
  LDX #$21
  JSR $88CA ; → bank switch?
  LDA #$12
  STA $0701
  LDX $ED
  INX
  CPX #$12
  BCC @E25B
  LDX #$00
@E25B:
  STX $ED
  JMP $A1A6
  LDX $ED
  DEX
  BPL @E267
  LDX #$11
@E267:
  STX $ED
  JMP $A1A6
@E26C:
  LDX $EC
  LDA $B1E8,X
  LDY #$00
  JSR $A4D8 ; → bank switch?
  LDX $0673
  LDA $B255,X
  AND #$30
  STA $EB
  LDX $0675
  LDA $B255,X
  AND #$0F
  ORA $EB
  STA $EB
  LDX #$00
@E28E:
  LDA $0664,X
  CPX #$0F
  BCS @E29C
  INC $EB
  SEC
  SBC $EB
  AND #$3F
@E29C:
  TAY
  LDA $B255,Y
  JSR $A474 ; → bank switch?
  INX
  CPX #$12
  BNE @E28E
  JSR $A402 ; → bank switch?
  LDA $0662
  CMP $EC
  BNE @E2BB
  LDA $0661
  AND #$0F
  CMP $ED
  BEQ @E2DD
@E2BB:
  LDA #$F8
  STA $0558
  STA $055C
  LDA #$43
  STA $0700
  LDA #$01
  STA $7E
  LDA #$78
  JSR $9FA8 ; → bank switch?
  LDA #$00
  STA $7E
  LDA #$33
  STA $0700
  JMP $A19F
@E2DD:
  LDA #$00
  STA $E6
  TAX
  LDA $0656,X
  LSR A
  LSR A
  STA $E7
  JSR $B045 ; → bank switch?
  STY $EC
  STX $ED
  LDA $E7
  CMP #$3F
  BCS @E352
  CLC
  ADC #$01
  JSR $B045 ; → bank switch?
  TYA
  SEC
  SBC $EC
  STA $EA
  TXA
  SBC $ED
  STA $EB
  LSR $EB
  ROR $EA
  LSR $EB
  ROR $EA
  LDX $E6
  LDA $0656,X
  LDY $EA
  LDX $EB
  AND #$03
  BEQ @E338
  ASL $EA
  ROL $EB
  CMP #$02
  BEQ @E32D
  BCC @E338
  ASL $EA
  ROL $EB
  JMP $A338
@E32D:
  TYA
  CLC
  ADC $EA
  STA $EA
  TXA
  ADC $EB
  STA $EB
@E338:
  LDA $EC
  CLC
  ADC $EA
  STA $EC
  LDA $ED
  ADC $EB
  STA $ED
  LDA $EC
  SEC
  SBC #$01
  STA $EC
  LDA $ED
  SBC #$00
  STA $ED
@E352:
  LDA $E6
  ASL A
  TAX
  LDA $EC
  STA $0454,X
  LDA $ED
  STA $0455,X
  INC $E6
  LDA $E6
  CMP #$0A
  BEQ @E36B
  JMP $A2DF
@E36B:
  LDA $0660
  LSR A
  LSR A
  STA $26
  LDA $0660
  AND #$03
  LSR A
  STA $0448
  LDA #$00
  BCC @E381
  LDA #$05
@E381:
  STA $0446
  LDA $0661
  ROL A
  LDA #$00
  ROL A
  STA $044D
  LDA #$00
  STA $4C
  LDA #$01
  STA $0700
  JSR $9BA0 ; → bank switch?
  RTS
  LDA #$00
  STA $EA
  LDA #$0B
  JSR $A3B4 ; → bank switch?
  LDA $26
  CMP #$10
  BCC @E3B3
  LDA #$16
  STA $EA
  LDA #$0A
  JSR $A3B4 ; → bank switch?
@E3B3:
  RTS
  STA $EB
@E3B6:
  LDA $EA
  JSR $C50C ; → bank switch?
  LDY #$00
  LDA ($34),Y
  JSR $B013 ; → bank switch?
  JSR $B02E ; → bank switch?
  LDY #$03
  STA ($34),Y
  INC $EA
  DEC $EB
  BNE @E3B6
  RTS
  LDA $3A
  AND #$04
  BEQ @E3F9
  LDX $ED
  LDA $B22D,X
  AND #$80
  LSR A
  SEC
  ROR A
  LSR A
  STA $0558
  CLC
  ADC #$08
  STA $055C
  LDA $B22D,X
  AND #$7F
  CLC
  ADC #$50
  STA $055B
  STA $055F
  RTS
@E3F9:
  LDA #$F8
  STA $0558
  .byte $8D, $5C
  `;
}

// ════════ $8400-$87FF (1024B): 球员数值计算 + 阵型/上场菜单状态机 ═══════=
function build_8400_87FF_playerCalcAndMenu(): readonly number[] {
  return asm`
  ORA $60
  LDA $0661
  AND #$F0
  CLC
  ADC $0663
  STA $EC
  LDA #$00
  ADC #$00
  STA $ED
  LDX #$00
@E415:
  LDA $0656,X
  CLC
  ADC $EC
  STA $EC
  LDA $ED
  ADC #$00
  STA $ED
  INX
  CPX #$0B
  BNE @E415
  LDA $EC
  CLC
  ADC #$09
  STA $EC
  LDA $ED
  ADC #$03
  AND #$0F
  STA $ED
  RTS
  LDY $AD8A,X
  TXA
  AND #$03
  BEQ @E46E
  CMP #$01
  BEQ @E45E
  CMP #$02
  BEQ @E44E
  LDA $0656,Y
  AND #$3F
  RTS
@E44E:
  LDA $0657,Y
  ASL A
  STA $EC
  LDA $0656,Y
  AND #$0F
  ROL A
  ASL $EC
  ROL A
  RTS
@E45E:
  LDA $0656,Y
  LSR A
  STA $EC
  LDA $0657,Y
  ROR A
  LSR $EC
  ROR A
  LSR A
  LSR A
  RTS
@E46E:
  LDA $0656,Y
  LSR A
  LSR A
  RTS
  AND #$3F
  STA $EC
  LDY $AD8A,X
  TXA
  AND #$03
  BEQ @E4C9
  CMP #$01
  BEQ @E4AC
  CMP #$02
  BEQ @E493
  LDA $0656,Y
  AND #$C0
  ORA $EC
  STA $0656,Y
  RTS
@E493:
  LDA $0657,Y
  ASL A
  ASL A
  LSR $EC
  ROR A
  LSR $EC
  ROR A
  STA $0657,Y
  LDA $0656,Y
  AND #$F0
  ORA $EC
  STA $0656,Y
  RTS
@E4AC:
  ASL $EC
  ASL $EC
  LDA $0656,Y
  LSR A
  LSR A
  ASL $EC
  ROL A
  ASL $EC
  ROL A
  STA $0656,Y
  LDA $0657,Y
  AND #$0F
  ORA $EC
  STA $0657,Y
  RTS
@E4C9:
  ASL $EC
  ASL $EC
  LDA $0656,Y
  AND #$03
  ORA $EC
  STA $0656,Y
  RTS
  STY $E8
  AND #$3F
  CLC
  ADC #$D8
  TAY
  LDX #$23
  LDA #$01
  STA $E9
  LDA $E8
  JMP $9895
  LDX #$6A
  LDY #$6B
  JSR $9B6F ; → bank switch?
  LDX #$7A
  LDY #$7B
  JSR $9B74 ; → bank switch?
  JSR $9B7F ; → bank switch?
  LDY #$05
  LDX #$B3
  JSR $B0C0 ; → bank switch?
  LDA #$00
  STA $44
  STA $45
  LDY #$CC
@E50B:
  LDA $B271,Y
  STA $039C,Y
  INY
  BNE @E50B
  LDX $26
  LDA $BCD1,X
  AND #$F0
  LSR A
  LSR A
  LSR A
  TAX
  LDY $BCF3,X
  LDA $BCF4,X
  TAX
  JSR $9D27 ; → bank switch?
  LDX $26
  LDA $BCD1,X
  AND #$0F
  ASL A
  TAX
  LDY $BD64,X
  LDA $BD65,X
  TAX
  LDA #$07
  STA $E8
  LDA #$22
  STA $E9
  JSR $9D50 ; → bank switch?
  LDA $2A
  LDY #$D0
  LDX #$21
  JSR $A63C ; → bank switch?
  LDA #$24
  CMP $2B
  LDA $2B
  SBC #$00
  LDY #$50
  LDX #$22
  JSR $A63C ; → bank switch?
  LDA #$00
  STA $7B
  LDA #$00
  STA $8E
  LDA #$2E
  STA $8F
  LDA #$04
  LDX #$37
  JSR $997A ; → bank switch?
  LDX #$F0
@E571:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  LDA $1E
  BMI @E57D
  DEX
  BNE @E571
@E57D:
  JSR $99F0 ; → bank switch?
  JSR $98A0 ; → bank switch?
  LDA #$00
  STA $ED
  STA $EC
  LDA #$0B
  JSR $A611 ; → bank switch?
  LDA $26
  CMP #$10
  BCC @E59D
  LDA #$16
  STA $ED
  LDA #$0A
  JSR $A611 ; → bank switch?
@E59D:
  LDA $E4
  CMP $26
  BCS @E5B1
  LDA $26
  CMP #$06
  BEQ @E610
  CMP #$0C
  BEQ @E610
  CMP #$10
  BEQ @E610
@E5B1:
  LDA $EC
  BEQ @E610
  LDX $26
  LDA $B3F9,X
  JSR $8464 ; → bank switch?
  JSR $82A9 ; → bank switch?
  LDA #$00
  STA $ED
  STA $EA
@E5C6:
  LDX $ED
  LDA $0656,X
  JSR $C53C ; → bank switch?
  LDA $EA
  ASL A
  TAX
  LDA $BC58,X
  STA $E8
  LDA $BC59,X
  STA $E9
  LDY $30
  LDX $31
  JSR $9D50 ; → bank switch?
  INC $EA
  INC $ED
  DEC $EC
  BEQ @E60A
  LDA $ED
  CMP #$0B
  BNE @E5C6
  JSR $89A3 ; → bank switch?
  LDA #$44
  STA $E6
  LDA #$22
  STA $E7
  LDY #$08
  LDX #$18
  JSR $98E8 ; → bank switch?
  LDA #$00
  STA $EA
  JMP $A5C6
@E60A:
  JSR $89A3 ; → bank switch?
  JSR $99F0 ; → bank switch?
@E610:
  RTS
  STA $EB
@E613:
  LDA $ED
  JSR $C50C ; → bank switch?
  LDY #$00
  LDA ($34),Y
  JSR $B013 ; → bank switch?
  JSR $B02E ; → bank switch?
  LDY #$03
  CMP ($34),Y
  BEQ @E635
  STA ($34),Y
  LDY #$00
  LDA ($34),Y
  LDX $EC
  STA $0656,X
  INC $EC
@E635:
  INC $ED
  DEC $EB
  BNE @E613
  RTS
  STY $E8
  STX $E9
  ASL A
  TAX
  LDY $BDA8,X
  LDA $BDA9,X
  TAX
  JMP $9D50
  JSR $98A0 ; → bank switch?
  JSR $9B7F ; → bank switch?
  LDX $26
  LDA $B393,X
  JSR $8464 ; → bank switch?
  JSR $82A9 ; → bank switch?
  LDA #$01
  JSR $8920 ; → bank switch?
@E662:
  LDY #$D0
  LDX #$AD
  JSR $9C3A ; → bank switch?
  JSR $9BE8 ; → bank switch?
  LDY #$73
  LDX #$A6
  JMP $9C28
  .byte $7B
  LDX $9F
  LDX $BE
  LDX $C4
  LDX $A6
  ROL $BD
  ADC ($B3),Y
  JSR $8464 ; → bank switch?
@E683:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  LDA $4D
  ORA $4E
  BEQ @E662
  LDA $1E
  AND #$10
  BEQ @E683
  JSR $99F0 ; → bank switch?
  LDA #$02
  JSR $9FA8 ; → bank switch?
  JMP $A652
  JSR $99F0 ; → bank switch?
  LDX $26
  LDA $B3D7,X
  JSR $8464 ; → bank switch?
  JSR $82A9 ; → bank switch?
  JSR $A01E ; → bank switch?
  LDA #$4E
  JSR $8464 ; → bank switch?
  JSR $82A9 ; → bank switch?
  JSR $99F0 ; → bank switch?
  JMP $A64C
  JSR $A721 ; → bank switch?
  JMP $A64C
  LDX $26
  LDA $B41B,X
  JSR $8464 ; → bank switch?
  JSR $82A9 ; → bank switch?
  JMP $A715
  LDA #$55
  STA $0700
  JSR $98A0 ; → bank switch?
  JSR $9B7F ; → bank switch?
  LDX $26
  LDA $B3B5,X
  JSR $8464 ; → bank switch?
  JMP $A6F9
  JSR $98A0 ; → bank switch?
  JSR $9B7F ; → bank switch?
  LDX $26
  LDA $B3B5,X
  CLC
  ADC #$01
  JSR $8464 ; → bank switch?
  JSR $82A9 ; → bank switch?
  LDY #$D6
  LDX #$AD
  JSR $9C3A ; → bank switch?
  JSR $9BE8 ; → bank switch?
  CMP #$02
  BEQ @E710
  JSR $A721 ; → bank switch?
  JMP $A6E8
@E710:
  LDA #$31
  STA $0700
  JSR $9BA0 ; → bank switch?
  RTS
  LDY #$83
  LDX #$B5
  JSR $97AB ; → bank switch?
  RTS
  JSR $9BA0 ; → bank switch?
  LDX #$1F
  LDY #$2E
  JSR $9B6F ; → bank switch?
  LDA #$00
  STA $7B
  JSR $8920 ; → bank switch?
  LDA #$00
  STA $8E
  LDA #$2E
  STA $8F
  LDA $2A
  CMP #$02
  BNE @E743
  JMP $A84E
@E743:
  LDY #$3D
  LDX #$B4
  JSR $B0C0 ; → bank switch?
  LDA #$00
  JSR $ADE9 ; → bank switch?
  LDA #$88
  STA $E6
  LDA #$20
  STA $E7
  JSR $AEAC ; → bank switch?
  LDA #$00
  JSR $AE01 ; → bank switch?
  LDY #$FC
@E761:
  LDA $ACA2,Y
  STA $0468,Y
  INY
  BNE @E761
  LDA #$03
  LDX #$39
  JSR $997A ; → bank switch?
  LDA #$FC
  LDX #$38
  LDY #$78
  JSR $9BE3 ; → bank switch?
  LDY #$81
  LDX #$A7
  JMP $9C28
  .byte $8B, $A7
  LDY $C5A7
  .byte $A7
  CMP $73AA,X
  TAX
  LDY #$EB
  LDX #$B6
  JSR $97AB ; → bank switch?
  LDX #$90
  JSR $AE1E ; → bank switch?
  LDA #$00
  JSR $AE3A ; → bank switch?
  LDA #$F8
  STA $0560
  JSR $AA77 ; → bank switch?
  LDA #$38
  STA $0564
  JMP $A771
  LDY #$90
  LDX #$B7
  JSR $97AB ; → bank switch?
  LDY #$A2
  LDX #$AD
  JSR $AE77 ; → bank switch?
  JSR $AA77 ; → bank switch?
  LDA #$48
  STA $0564
  JMP $A771
  LDA #$58
  STA $0564
  LDA #$94
  STA $4C
  LDY #$A8
  LDX #$AD
  JSR $9C3A ; → bank switch?
@E7D5:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  JSR $9CC9 ; → bank switch?
  BIT $1E
  .byte $70, $5B  ; BVS $883C
  BPL @E7D5
  LDA #$01
  STA $0562
  JSR $9CD3 ; → bank switch?
  LDY #$AE
  LDX #$AD
  LDA $0560
  JSR $9C3C ; → bank switch?
  LDA #$01
  JSR $9FA8 ; → bank switch?
  JSR $9CC9 ; → bank switch?
  BIT $1E
  .byte $70
  `;
}

// ════════ $8800-$8BFF (1024B): 阵型/战术选择交互 + 球员详情显示 ═══════=
function build_8800_8BFF_formationAndTactics(): readonly number[] {
  return asm`
  .byte $3B
  .byte $10, $F2  ; BPL $87F5
  LDY $0560
  LDX #$00
  JSR $9D08 ; → bank switch?
  LDA $34
  STA $E6
  LDA $35
  STA $E7
  LDY $055C
  LDX #$00
  JSR $9D08 ; → bank switch?
  JSR $AF67 ; → bank switch?
  LDA #$88
  STA $E6
  LDA #$20
  STA $E7
  JSR $AEAC ; → bank switch?
  LDA #$F8
  STA $055C
  STA $0560
  LDA #$00
  STA $0562
  JSR $AE01 ; → bank switch?
  JMP $A7CE
  LDA #$00
  STA $4C
  JSR $AE01 ; → bank switch?
  LDA #$F8
  STA $055C
  STA $0560
  JMP $A771
  LDY #$51
  LDX #$B4
  JSR $B0C0 ; → bank switch?
  LDA #$FC
  JSR $ADE9 ; → bank switch?
  LDA #$85
  STA $E6
  LDA #$20
  STA $E7
  JSR $AEAC ; → bank switch?
  LDA #$99
  STA $E6
  LDA #$20
  STA $E7
  JSR $AEBE ; → bank switch?
  LDA #$D8
  JSR $AE01 ; → bank switch?
  JSR $B0A1 ; → bank switch?
  JSR $AA7F ; → bank switch?
  LDY #$FC
@E87D:
  LDA $ACB8,Y
  STA $0468,Y
  INY
  BNE @E87D
  LDA #$03
  LDX #$39
  JSR $997A ; → bank switch?
  LDA #$FC
  LDX #$38
  LDY #$78
  JSR $9BE3 ; → bank switch?
  LDY #$9D
  LDX #$A8
  JMP $9C28
  .byte $A7
  TAY
  DEX
  TAY
  SBC $A8
  CMP $73AA,X
  TAX
  LDY #$EB
  LDX #$B6
  LDA #$FB
  JSR $97AD ; → bank switch?
  LDX #$68
  JSR $AE1E ; → bank switch?
  LDA #$D8
  JSR $AE3A ; → bank switch?
  LDA #$F8
  STA $0560
  JSR $A719 ; → bank switch?
  LDA #$38
  STA $0564
  JMP $A88D
  LDY #$90
  LDX #$B7
  LDA #$FB
  JSR $97AD ; → bank switch?
  LDY #$B8
  LDX #$AD
  JSR $AE77 ; → bank switch?
  JSR $A719 ; → bank switch?
  LDA #$48
  STA $0564
  JMP $A88D
  LDA #$58
  STA $0564
  LDA #$94
  STA $4C
  LDY #$BE
  LDX #$AD
  JSR $9C3A ; → bank switch?
  LDA $0450
  CMP #$03
  BCC @E900
  LDA #$B8
  STA $E6
@E900:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  JSR $9CC9 ; → bank switch?
  BIT $1E
  BVC @E90F
  JMP $AA5F
@E90F:
  BPL @E900
  LDA #$01
  STA $0562
  LDA $0560
  CMP #$C8
  BCC @E920
  JMP $A9C0
@E920:
  LDA #$01
  JSR $9CD3 ; → bank switch?
  LDY #$C4
  LDX #$AD
  LDA $0560
  JSR $9C3C ; → bank switch?
  LDA $0450
  CMP #$03
  BCS @E944
  LDA #$B8
  STA $E6
  LDA $E9
  STA $EB
  STA $EA
  LDA #$FF
  STA $E9
@E944:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  JSR $9CC9 ; → bank switch?
  LDA $0450
  CMP #$03
  BCS @E9B4
  LDA $1E
  AND #$03
  BEQ @E9B4
  LSR A
  BCS @E977
  LDA #$20
  STA $055F
  LDA #$B8
  STA $E6
  LDA $EA
  STA $EB
  CMP $055C
  BNE @E9B4
  CLC
  ADC #$10
  STA $055C
  JMP $A9B4
@E977:
  LDA #$00
  JSR $9CD3 ; → bank switch?
  LDA #$C0
  STA $055F
  LDA #$00
  STA $EB
  LDA #$98
  STA $E6
  LDA $055C
  CMP #$A8
  BCC @E995
  LDA #$98
  STA $055C
@E995:
  LDY $055C
  LDX $055F
  JSR $AABF ; → bank switch?
  BCC @E9B2
  LDA $055C
  CLC
  ADC #$10
  CMP #$A8
  BCC @E9AC
  LDA #$28
@E9AC:
  STA $055C
  JMP $A995
@E9B2:
  LDY #$F4
@E9B4:
  BIT $1E
  BVC @E9BB
  JMP $AA5F
@E9BB:
  BPL @E944
  JMP $A9FB
  LDY #$CA
  LDX #$AD
  JSR $9C3A ; → bank switch?
  LDA #$FF
  STA $E9
  LDY #$A8
  LDX #$C0
  JSR $AABF ; → bank switch?
  BCC @E9E2
  LDA #$C8
  STA $055C
  LDY #$B8
  LDX #$C0
  JSR $AABF ; → bank switch?
  BCS @EA5F
@E9E2:
  LDY #$F4
@E9E4:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  JSR $9CC9 ; → bank switch?
  BIT $1E
  BVS @EA5F
  BPL @E9E4
  LDA $055C
  SEC
  SBC #$10
  STA $055C
  LDY $0560
  LDX $0563
  JSR $9D08 ; → bank switch?
  LDA $34
  STA $E6
  LDA $35
  STA $E7
  LDY $055C
  LDX $055F
  JSR $9D08 ; → bank switch?
  JSR $AF67 ; → bank switch?
  LDA #$F8
  STA $055C
  STA $0560
  LDA $055F
  BPL @EA3C
  LDA $27
  BEQ @EA3C
  INC $0450
  LDY #$00
  LDA ($34),Y
  LDX $0450
  STA $0450,X
  JSR $B0A1 ; → bank switch?
  JSR $AA7F ; → bank switch?
@EA3C:
  LDA #$85
  STA $E6
  LDA #$20
  STA $E7
  JSR $AEAC ; → bank switch?
  LDA #$99
  STA $E6
  LDA #$20
  STA $E7
  JSR $AEBE ; → bank switch?
  LDA #$00
  STA $0562
  LDA #$D8
  JSR $AE01 ; → bank switch?
  JMP $A8EE
@EA5F:
  LDA #$00
  STA $4C
  LDA #$D8
  JSR $AE01 ; → bank switch?
  LDA #$F8
  STA $055C
  STA $0560
  JMP $A88D
  JSR $99F0 ; → bank switch?
  RTS
  LDY #$B3
  LDX #$B4
  JSR $97AB ; → bank switch?
  RTS
  LDA $0450
  BEQ @EABE
  LDA #$28
  STA $E7
@EA88:
  LDY $E7
  LDX #$C0
  JSR $AABF ; → bank switch?
  BCC @EAB3
  TXA
  ASL A
  ASL A
  CLC
  ADC #$E0
  TAX
  LDA $E7
  CMP #$A8
  BCC @EAA1
  CLC
  ADC #$10
@EAA1:
  STA $0468,X
  LDA #$C0
  STA $046B,X
  LDA #$72
  STA $0469,X
  LDA #$00
  STA $046A,X
@EAB3:
  LDA $E7
  CLC
  ADC #$10
  STA $E7
  CMP #$B9
  BCC @EA88
@EABE:
  RTS
  JSR $9D08 ; → bank switch?
  LDX #$00
  LDY #$00
  LDA ($34),Y
  CMP $0451
  BEQ @EAD9
  INX
  CMP $0452
  BEQ @EAD9
  INX
  CMP $0453
  BNE @EADB
@EAD9:
  SEC
  RTS
@EADB:
  CLC
  RTS
  LDA #$28
  STA $60
  LDA #$18
  STA $61
  JSR $9BA0 ; → bank switch?
  LDY #$81
  LDX #$B8
  JSR $B0C0 ; → bank switch?
  LDA #$84
  STA $E6
  LDA #$20
  STA $E7
  JSR $AEAC ; → bank switch?
  LDA #$AA
  STA $5C
  LDA #$20
  STA $5D
  LDA #$0A
  STA $5E
@EB06:
  JSR $AF37 ; → bank switch?
  DEC $5E
  LDA $5E
  BPL @EB06
  LDA $2A
  CMP #$02
  BNE @EB37
  LDA #$92
  STA $E6
  LDA #$20
  STA $E7
  JSR $AEB5 ; → bank switch?
  LDA #$B8
  STA $5C
  LDA #$20
  STA $5D
  LDA #$16
  STA $5E
@EB2C:
  JSR $AF37 ; → bank switch?
  INC $5E
  LDA $5E
  CMP #$20
  BNE @EB2C
@EB37:
  JSR $997E ; → bank switch?
  LDY #$DC
  LDX #$AD
  JSR $9C3A ; → bank switch?
  LDA $60
  STA $055C
  LDA $61
  STA $055F
  BPL @EB51
  LDA #$B8
  STA $E6
@EB51:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  JSR $9C71 ; → bank switch?
  LDA $2A
  CMP #$02
  BNE @EB87
  LDA $1E
  AND #$03
  BEQ @EB87
  LSR A
  BCS @EB74
  LDA #$18
  STA $055F
  LDA #$C8
  STA $E6
  JMP $AB87
@EB74:
  LDA #$88
  STA $055F
  LDA #$B8
  STA $E6
  LDX $055C
  CPX #$C8
  BNE @EB87
  STA $055C
@EB87:
  BIT $1E
  BVC @EB8E
  JMP $A721
@EB8E:
  BPL @EB51
  JSR $99F0 ; → bank switch?
  LDY $055C
  LDX $055F
  STY $60
  STX $61
  JSR $9D08 ; → bank switch?
  LDA #$F8
  STA $055C
  LDA $ED
  STA $5F
  LDY #$00
  LDA ($34),Y
  LDY #$46
  LDX #$20
  JSR $AF05 ; → bank switch?
  LDY #$03
  LDA ($34),Y
  CLC
  ADC #$01
  JSR $9E7C ; → bank switch?
  LDY #$AB
  LDX #$20
  JSR $9D8E ; → bank switch?
  LDA $5F
  LDX #$00
  JSR $C527 ; → bank switch?
  LDA $32
  STA $EC
  LDA $33
  STA $ED
  JSR $9E4F ; → bank switch?
  LDY #$29
  LDX #$21
  LDA $E8
  STA $EC
  LDA $E9
  STA $ED
  JSR $9DB5 ; → bank switch?
  LDA $5F
  BEQ @EBFA
  CMP #$1E
  BCS @EBFA
  LDY #$A9
  LDX #$B8
  JSR $B0C0 ; → bank switch?
  LDY #$00
  JMP $AC03
@EBFA:
  LDY #$B0
  LDX #$B8
  .byte $20, $C0
  `;
}

// ════════ $8C00-$8FFF (1024B): 事件脚本解析 + 球员数据比较 + OAM精灵数据 ═══════=
function build_8C00_8FFF_eventScriptAndSprite(): readonly number[] {
  return asm`
  .byte $B0, $A0  ; BCS $8BA2
  AND ($84),Y
  INC $A4
  INC $BE
  STA ($B9,X)
  CPX #$FF
  BEQ @EC2E
  LDA $5F
  JSR $C527 ; → bank switch?
  LDA $32
  JSR $9E7C ; → bank switch?
  LDY $E6
  LDA $B982,Y
  LDX $B983,Y
  TAY
  JSR $9DB5 ; → bank switch?
  LDA $E6
  CLC
  ADC #$03
  STA $E6
  JMP $AC05
@EC2E:
  JSR $997E ; → bank switch?
@EC31:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  BIT $1E
  BVC @EC3D
  JMP $AAE5
@EC3D:
  BPL @EC31
  LDY #$00
  LDA ($34),Y
  LDX #$27
@EC45:
  DEX
  DEX
  DEX
  BPL @EC4D
  JMP $AAE5
@EC4D:
  CMP $BB2E,X
  BNE @EC45
  LDA $BB2F,X
  STA $5C
  LDA $BB30,X
  STA $5D
  LDA #$00
  STA $5E
  LDY #$00
  LDA ($5C),Y
  BPL @EC83
  CMP #$FF
  BNE @EC6D
  JMP $AD23
@EC6D:
  CMP #$FE
  BNE @EC7B
  LDA $0446
  CMP #$05
  BEQ @EC8C
  JMP $AD13
@EC7B:
  LDA $0448
  LSR A
  BCS @EC8C
  LDA #$1E
@EC83:
  CMP $26
  BCC @EC8C
  BEQ @EC8C
  JMP $AD13
@EC8C:
  INY
  LDA ($5C),Y
  JSR $C53C ; → bank switch?
  LDA $5E
  ASL A
  TAX
  LDA $BC48,X
  STA $E8
  LDA $BC49,X
  STA $E9
  LDY #$00
  LDA ($30),Y
  CMP #$FC
  BCS @ECBE
  LDY $E8
  LDX $E9
  JSR $88CA ; → bank switch?
  INC $30
  BNE @ECB5
  INC $31
@ECB5:
  INC $E8
  BNE @ECBB
  INC $E9
@ECBB:
  JMP $ACA0
@ECBE:
  LDA #$00
  STA $044E
  LDY #$02
  LDA ($5C),Y
  STA $043B
  STA $043D
  INY
  LDA ($5C),Y
  STA $043C
  STA $043E
  LDA $5F
  STA $0441
  STA $0442
  INY
  LDA ($5C),Y
  JSR $C54B ; → bank switch?
  LDA $043F
  STA $EC
  LDA $0440
  STA $ED
  JSR $9E4F ; → bank switch?
  LDA $E8
  STA $EC
  LDA $E9
  STA $ED
  LDA $5E
  ASL A
  TAX
  LDA $BC48,X
  AND #$E0
  ORA #$15
  CLC
  ADC #$20
  TAY
  LDA $BC49,X
  ADC #$00
  TAX
  JSR $9DB5 ; → bank switch?
  INC $5E
  LDA $5C
  CLC
  ADC #$05
  STA $5C
  LDA $5D
  ADC #$00
  STA $5D
  JMP $AC60
  LDA $5E
  TAX
  ASL A
  ASL A
  ASL A
  CLC
  ADC #$17
  STA $7C
  LDA #$40
  JSR $9DEE ; → bank switch?
  LDA $EC
  CLC
  ADC #$63
  TAY
  LDA $ED
  ADC #$25
  TAX
  LDA #$67
  STA $E6
  LDA #$B9
  STA $E7
  LDA #$1A
  JSR $9D73 ; → bank switch?
@ED4B:
  LDA #$18
  STA $79
  LDA #$01
  STA $7E
  LDA $8E
  STA $90
  LDA $8F
  STA $91
@ED5B:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  BIT $1E
  BVS @ED78
  BPL @ED5B
  LDA #$00
  STA $7E
@ED6A:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  BIT $1E
  BVS @ED4B
  BPL @ED6A
  JMP $AAE5
@ED78:
  LDA #$00
  STA $7E
@ED7C:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  BIT $1E
  BMI @ED4B
  BVC @ED7C
  JMP $AAE5
  BRK
  BRK
  ORA ($02,X)
  .byte $03, $03, $04
  ORA $06
  ASL $07
  PHP
  ORA #$09
  ASL A
  ANC #$0C
  .byte $0C
  ORA $380E
  ADC ($00),Y
  DEY
  SED
  CLI
  ADC ($00),Y
  BCC @EE20
  SED
  PLP
  ADC ($00),Y
  SEC
  CLV
  .byte $F4
  PLP
  ADC ($00),Y
  SEC
  CLV
  SEC
  ADC ($00),Y
  RTS
  SED
  CLI
  ADC ($00),Y
  PLA
  SEI
  SED
  PLP
  ADC ($00),Y
  JSR $F4C8 ; → bank switch?
  PLP
  ADC ($00),Y
  JSR $F4B8 ; → bank switch?
  CLV
  ADC ($00),Y
  CPY #$C8
  .byte $FC
  TYA
  .byte $FF, $03
  BPL $ED9E
  .byte $FC
  TAY
  .byte $FF, $03
  RTI
  CLV
  .byte $F4
  PLP
  ADC ($00),Y
  CLC
  INY
  .byte $44, $67
  ADC $7D4A,X
  .byte $C2, $FC
  STA $EC
  LDA $2A
  ASL A
  ASL A
  ASL A
  ASL A
  CLC
  ADC #$BB
  TAY
  LDA #$00
  ADC #$B6
  TAX
  LDA $00EC
  JSR $97B8 ; → bank switch?
  RTS
  STA $E7
  LDY #$24
  LDX #$00
@EE07:
  LDA $B823,X
  STA $0469,Y
  LDA #$00
  STA $046A,Y
  INX
  DEY
  DEY
  DEY
  DEY
  BPL @EE07
  LDY $2C
  JMP $AE8F
  STA $E7
@EE20:
  LDA #$71
  STA $0561
  LDA #$00
  STA $0562
  STX $0563
  LDA $2C
  ASL A
  ASL A
  ASL A
  ASL A
  CLC
  ADC #$48
  STA $0560
  RTS
  STA $E7
  LDA $2C
  STA $E6
@EE40:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  LDA $1E
  AND #$0C
  BEQ @EE67
  EOR #$0C
  LSR A
  SEC
  SBC #$03
  CLC
  ADC $E6
  AND #$03
  STA $E6
  ASL A
  ASL A
  ASL A
  ASL A
  CLC
  ADC #$48
  STA $0560
  LDY $E6
  JSR $AE8F ; → bank switch?
@EE67:
  BIT $1E
  BVS @EE72
  BPL @EE40
  LDA $E6
  STA $2C
  RTS
@EE72:
  LDY $2C
  JMP $AE8F
  JSR $9C3A ; → bank switch?
  LDA $2D
  ASL A
  ASL A
  ASL A
  ASL A
  CLC
  ADC #$58
  STA $0560
  JSR $9C0D ; → bank switch?
  BCS @EE8E
  LSR A
  STA $2D
@EE8E:
  RTS
  LDX $B82D,Y
  LDY #$24
@EE94:
  LDA $B831,X
  STA $0468,Y
  LDA $B832,X
  CLC
  ADC $E7
  STA $046B,Y
  INX
  INX
  DEY
  DEY
  DEY
  DEY
  BPL @EE94
  RTS
  LDA #$0A
  LDX #$0B
  LDY #$FF
  JMP $AEDA
  LDA #$16
  LDX #$0A
  LDY #$01
  JMP $AEDA
  LDA #$16
  LDX #$08
  LDY #$01
  JSR $AEDA ; → bank switch?
  LDA $E6
  CLC
  ADC #$40
  STA $E6
  LDA $E7
  ADC #$00
  STA $E7
  LDA #$1E
  LDX #$02
  LDY #$01
  STA $E8
  STX $E9
  STY $EB
@EEE0:
  LDA $E8
  JSR $C50C ; → bank switch?
  LDY #$00
  LDA ($34),Y
  JSR $AF09 ; → bank switch?
  LDA $E8
  CLC
  ADC $EB
  STA $E8
  LDA $E6
  CLC
  ADC #$40
  STA $E6
  LDA $E7
  ADC #$00
  STA $E7
  DEC $E9
  BNE @EEE0
  RTS
  STY $E6
  STX $E7
  JSR $C53C ; → bank switch?
  LDA #$05
  STA $ED
@EF10:
  LDX #$00
  LDY #$00
  LDA ($30),Y
  CMP #$FC
  BCS @EF21
  INC $30
  BNE @EF20
  INC $31
@EF20:
  TAX
@EF21:
  TXA
  LDY $E6
  LDX $E7
  JSR $88CA ; → bank switch?
  INC $E6
  DEC $ED
  BNE @EF10
  LDA $E6
  SEC
  SBC #$05
  STA $E6
  RTS
  LDA $5E
  JSR $C50C ; → bank switch?
  LDY #$01
  LDA ($34),Y
  STA $EC
  INY
  LDA ($34),Y
  STA $ED
  JSR $9E4F ; → bank switch?
  LDY $5C
  LDX $5D
  LDA $E8
  STA $EC
  LDA $E9
  STA $ED
  JSR $9DB5 ; → bank switch?
  LDA $5C
  CLC
  ADC #$40
  STA $5C
  LDA $5D
  ADC #$00
  STA $5D
  RTS
  LDY #$00
@EF69:
  LDA ($E6),Y
  TAX
  LDA ($34),Y
  STA ($E6),Y
  TXA
  STA ($34),Y
  INY
  CPY #$04
  BNE @EF69
  RTS
  LDA $26
  ASL A
  TAX
  LDA $BA4C,X
  STA $E6
  LDA $BA4D,X
  STA $E7
  JMP $AF9E
  LDA $26
  ASL A
  TAX
  LDA $BA4C,X
  STA $E6
  LDA $BA4D,X
  LSR A
  ROR $E6
  LSR A
  ROR $E6
  STA $E7
  LDX #$00
@EFA0:
  LDA $0454,X
  CLC
  ADC $E6
  STA $0454,X
  LDA $0455,X
  ADC $E7
  STA $0455,X
  BCC @EFBB
  LDA #$FF
  STA $0454,X
  STA $0455,X
@EFBB:
  INX
  INX
  CPX #$16
  BCC @EFA0
  RTS
  STX $EC
  JSR $B023 ; → bank switch?
  STA $EB
  AND #$F0
  LSR A
  CLC
  ADC $EC
  TAX
  LDA $BA1C,X
  TAX
  LDA $26
  ASL A
  TAY
  LDA $BA4D,Y
  STA $ED
  LDA $BA4C,Y
  ROR $ED
  LSR A
  ROR $ED
  LSR A
  JSR $9DEE ; → bank switch?
  ASL $EC
  ROL $ED
  ASL $EC
  ROL $ED
  LDA $EB
  AND #$0F
  ASL A
  TAX
  LDA $0454,X
  CLC
  ADC $ED
  STA $0454,X
  `;
}

// ════════ $9000-$93FF (1024B): 球员数据工具函数 + 比赛画面布局数据表 ═══════=
function build_9000_93FF_playerUtilsAndLayout(): readonly number[] {
  return asm`
  LDA $0455,X
  ADC #$00
  STA $0455,X
  BCC @E012
  LDA #$FF
  STA $0454,X
  STA $0455,X
@E012:
  RTS
  JSR $B023 ; → bank switch?
  AND #$0F
  ASL A
  TAX
  LDA $0454,X
  TAY
  LDA $0455,X
  TAX
  RTS
  LDX $2A
  CLC
  ADC $B9D3,X
  TAX
  LDA $B9D6,X
  RTS
  STY $E6
  STX $E7
  LDX #$80
@E034:
  DEX
  DEX
  LDA $E6
  CMP $BA90,X
  LDA $E7
  SBC $BA91,X
  BCC @E034
  TXA
  LSR A
  RTS
  ASL A
  TAX
  LDA $BA90,X
  TAY
  LDA $BA91,X
  TAX
  RTS
  LDA $26
  CMP #$10
  BEQ @E06C
  CMP #$0C
  BEQ @E065
  CMP #$06
  BNE @E0A0
  LDY #$10
  LDX #$BB
  JMP $B070
@E065:
  LDY #$1A
  LDX #$BB
  JMP $B070
@E06C:
  LDY #$24
  LDX #$BB
  STY $E6
  STX $E7
  LDY #$EC
@E076:
  LDA $0368,Y
  STA $056A,Y
  INY
  BNE @E076
  LDA #$00
  STA $E9
@E083:
  LSR A
  TAY
  LDA ($E6),Y
  TAX
  LDY $E9
  LDA $0656,X
  STA $0454,Y
  LDA $0657,X
  STA $0455,Y
  INC $E9
  INC $E9
  LDA $E9
  CMP #$14
  BNE @E083
@E0A0:
  RTS
  LDX $27
  BEQ @E0BF
  LDY #$C8
  LDX #$B9
  JSR $97B6 ; → bank switch?
  LDY #$52
  LDX #$22
  LDA #$01
  STA $E9
  LDA $0450
  EOR #$FF
  CLC
  ADC #$37
  JSR $9895 ; → bank switch?
@E0BF:
  RTS
  STY $EC
  STX $ED
  LDY #$00
  LDA ($EC),Y
  ASL A
  TAX
  LDA $B0D7,X
  STA $E6
  LDA $B0D8,X
  STA $E7
  JMP ($00E6)
  .byte $F7
  BCS @E0DC
  LDA ($13),Y
@E0DC:
  LDA ($1E),Y
  LDA ($2F),Y
  LDA ($3B),Y
  LDA ($4D),Y
  LDA ($60),Y
  LDA ($73),Y
  LDA ($86),Y
  LDA ($99),Y
  LDA ($BA),Y
  LDA ($BA),Y
  LDA ($A4),Y
  LDA ($AC),Y
  LDA ($BA),Y
  LDA ($20),Y
  CMP #$B1
  JSR $97B6 ; → bank switch?
  LDA #$03
  JMP $B1BB
  LDY #$03
  LDA ($EC),Y
  PHA
  JSR $B1C9 ; → bank switch?
  PLA
  JSR $97B8 ; → bank switch?
  LDA #$04
  JMP $B1BB
  JSR $B1C9 ; → bank switch?
  JSR $97AB ; → bank switch?
  LDA #$03
  JMP $B1BB
  LDY #$03
  LDA ($EC),Y
  PHA
  JSR $B1C9 ; → bank switch?
  PLA
  JSR $97AD ; → bank switch?
  LDA #$04
  JMP $B1BB
  JSR $B1D3 ; → bank switch?
  JSR $B1DE ; → bank switch?
  LDY $E9
  LDX #$01
  BPL @E145
  JSR $B1D3 ; → bank switch?
  JSR $B1DE ; → bank switch?
  LDX $E9
  LDY #$01
@E145:
  JSR $98EA ; → bank switch?
  LDA #$05
  JMP $B1BB
  JSR $B1D3 ; → bank switch?
  JSR $B1DE ; → bank switch?
  TAX
  LDA #$00
  LDY $E9
  JSR $98EA ; → bank switch?
  LDA #$05
  JMP $B1BB
  JSR $B1D3 ; → bank switch?
  JSR $B1DE ; → bank switch?
  TAX
  LDA ($EC),Y
  LDY $E9
  JSR $98EA ; → bank switch?
  LDA #$06
  JMP $B1BB
  JSR $B1D3 ; → bank switch?
  JSR $B1DE ; → bank switch?
  TAX
  LDA #$00
  LDY $E9
  JSR $98DF ; → bank switch?
  LDA #$05
  JMP $B1BB
  JSR $B1D3 ; → bank switch?
  JSR $B1DE ; → bank switch?
  TAX
  LDA ($EC),Y
  LDY $E9
  JSR $98DF ; → bank switch?
  LDA #$06
  JMP $B1BB
  JSR $B1C9 ; → bank switch?
  JSR $9D27 ; → bank switch?
  LDA #$03
  JMP $B1BB
  JSR $98A0 ; → bank switch?
  LDA #$01
  JMP $B1BB
  INY
  LDA ($EC),Y
  TAX
  INY
  LDA ($EC),Y
  STA $ED
  STX $EC
  JMP $B0C4
  RTS
  CLC
  ADC $EC
  STA $EC
  LDA $ED
  ADC #$00
  STA $ED
  JMP $B0C4
  LDY #$02
  LDA ($EC),Y
  TAX
  DEY
  LDA ($EC),Y
  TAY
  RTS
@E1D3:
  INY
  LDA ($EC),Y
  STA $E6
  INY
  LDA ($EC),Y
  STA $E7
  RTS
  INY
  LDA ($EC),Y
  STA $E9
  INY
  LDA ($EC),Y
  INY
  RTS
  STA ($C1,X)
  .byte $82, $C2, $83, $C3
  STY $C4
  STA $C5
  STX $C6
  .byte $87
  ORA #$49
  ASL A
  LSR A
  ANC #$4B
  .byte $0C
  JMP $4D0D
  ASL $0F4E
  .byte $89
  CMP #$8A
  DEX
  .byte $8B
  AXS #$8C
  CPY $CD8D
  STX $8FCE
  ORA ($51),Y
  .byte $12, $52, $13, $53, $14, $54
  ORA $55,X
  ASL $56,X
  .byte $17
  STA ($D1),Y
  .byte $92, $D2, $93, $D3
  STY $D4,X
  STA $D5,X
  STX $D6,Y
  .byte $97
  ORA ($04,X)
  BPL $E26D
  BRK
  PHP
  BPL @E249
  JSR $3830
  RTI
  PHA
  BVC $E1B8
  DEY
  BCC @E1D3
  LDY #$B0
  CLV
  CPY #$C8
  BNE @E24C
  ANC #$0C
  ORA $100E
  ORA ($12),Y
@E249:
  .byte $13, $14
  LSR A
@E24C:
  ALR #$4C
  EOR $504E
  EOR ($52),Y
  .byte $53, $54
  ASL A
  AND ($04),Y
  .byte $13, $3B
  AND ($02,X)
  NOP
  AND $0F06,Y
  ROL A
  .byte $22, $1C
  ORA #$11
  .byte $34
  ORA $23,X
  ASL $01,X
  .byte $3C
  ORA $3028,Y
  .byte $27
  BPL @E291
  ROL $03
  .byte $2F
  ORA $2B1D
  ORA $2D
  ROL $240E,X
  ROL $0B14
  .byte $07
  AND $1E,X
  BRK
  .byte $17, $37
  AND $38
  AND $0832,X
  NOP
  .byte $1B, $0C, $12
  ROL $2C,X
  .byte $1F
@E291:
  .byte $3F
  CLC
  AND #$33
  .byte $FF
  ORA $C3
  JSR $891B ; → bank switch?
  ORA $A3
  AND ($1B,X)
  TSX
  ORA $23
  .byte $23, $1B, $89, $04, $E2
  JSR $8A12 ; → bank switch?
  .byte $04
  INC $1220,X
  TXA
  BRK
  .byte $C3, $B2
  ASL A
  .byte $AF
  LDY $BE0A,X
  LDY $E204,X
  BIT $08
  TXA
  .byte $04
  INC $0824,X
  TXA
  .byte $0F
  ORA ($C2,X)
  JSR $0188
  DEC $9020,X
  ORA ($22,X)
  .byte $23
  STX $3E01
  .byte $23, $93
  ANC #$2A
  AND ($7D,X)
  ADC $7D7D,X
  ADC $7D00,X
  ADC $7D7D,X
  ADC $6A49,X
  AND ($7D,X)
  ADC $7D7D,X
  ADC $7D00,X
  ADC $007D,X
  ORA ($FF,X)
  BRK
  ORA $0C0E
  BRK
  .byte $F3, $F4, $F2
  BRK
  BRK
  BRK
  BRK
  BRK
  RTI
  ORA ($00,X)
  BVC @E34A
  ORA ($00,X)
  BVC @E313
  ORA $45
  AND ($16,X)
  .byte $89
  ORA $A5
  AND ($16,X)
  TSX
  ORA $A5
  .byte $22
@E313:
  ASL $89,X
  .byte $04, $64
  AND ($0A,X)
  TXA
  .byte $04, $7B
  AND ($0A,X)
@E31E:
  TXA
  .byte $04, $CF
  AND ($07,X)
  .byte $BB
  BRK
  PLP
  .byte $B3, $0F
  ORA ($44,X)
  AND ($88,X)
  ORA ($5B,X)
  AND ($90,X)
  ORA ($A4,X)
  .byte $22
  STX $BB01
  .byte $22, $93, $42, $33, $22
  STA ($8F),Y
  BMI @E31E
  .byte $02
  SEI
  SEC
  SBC ($02),Y
  PLA
  SEC
  .byte $F4, $02
  BVS @E382
@E34A:
  SBC $02,X
  SEI
  SEC
  SED
  .byte $02, $80
  SEC
  SBC $8802,Y
  SEC
  .byte $FC, $02
  BCC $E39A
  .byte $F3, $02
  PLA
  RTI
  INC $02,X
  BVS @E3A2
  .byte $F7, $02
  SEI
  RTI
  NOP
  .byte $02, $80
  RTI
  .byte $FB, $02
  DEY
  RTI
  INC $9002,X
  .byte $23
  BIT $25
  ROL $27
  PLP
  AND #$2A
  ANC #$2C
  AND $2F2E
  BMI @E3B1
  .byte $32, $33
@E382:
  .byte $34
  AND $36,X
  .byte $37
  SEC
  AND $3B3A,Y
  .byte $3C
  AND $3F3E,X
  RTI
  EOR ($42,X)
  .byte $43, $43, $44, $44, $44, $44, $44, $44
  EOR $45
  EOR $45
  EOR $45
  .byte $44, $44, $44
@E3A2:
  .byte $44
  LSR $46
  LSR $46
  LSR $46
  LSR $46
  LSR $46
  LSR $46
  LSR $46
@E3B1:
  LSR $46
  LSR $46
  .byte $47, $47, $47, $47, $47, $47
  EOR #$49
  EOR #$49
  EOR #$49
  .byte $47, $47, $47, $47, $47, $47, $47, $47, $47, $47
  ALR #$4B
  ALR #$47
  .byte $47, $47, $47, $47, $47, $47, $47, $47
  EOR $4D4D
  EOR $4D4D
  .byte $4F, $4F, $4F, $4F, $4F, $4F
  EOR $4D4D
  EOR $4D4D
  EOR $4D4D
  EOR $5151
  EOR ($4D),Y
  EOR $4D4D
  EOR $4D4D
  EOR $534D
  .byte $53, $53, $53, $53, $53, $54
  `;
}

// ════════ $9400-$97FF (1024B): 比赛画面数据表(球员属性/场地坐标/Nametable) ═══════=
function build_9400_97FF_matchLayoutTables(): readonly number[] {
  return asm`
  .byte $54, $54, $54, $54, $54, $53, $53, $53, $53, $53, $53, $53, $53, $53, $53
  EOR $55,X
  EOR $53,X
  .byte $53, $53, $53, $53, $53, $53, $53, $53
  LSR $56,X
  LSR $56,X
  LSR $56,X
  .byte $57, $57, $57, $57, $57, $57
  LSR $56,X
  LSR $56,X
  CLI
  CLI
  CLI
  CLI
  CLI
  CLI
  CLI
  CLI
  CLI
  CLI
  CLI
  CLI
  CLI
  CLI
  CLI
  CLI
  CLI
  CLI
  .byte $04
  STY $20
  ASL $AA,X
  .byte $04
  STA $1620
  .byte $AB
  BRK
  .byte $74
  LDY $00,X
  .byte $B3
  LDY $00,X
  .byte $53
  LDX $0F,Y
  .byte $04
  STA ($20,X)
  ASL $AA,X
  .byte $04
  TXA
  JSR $AB16 ; → bank switch?
  ORA ($74,X)
  LDY $FD,X
  BRK
  .byte $83
  LDA $01,X
  .byte $53
  LDX $FB,Y
  .byte $04, $97
  JSR $AA16 ; → bank switch?
  .byte $04, $9E
  JSR $AB16 ; → bank switch?
  BRK
  LDA ($B6,X)
  .byte $0F
  ORA ($46,X)
  JSR $0A95
  .byte $64
  JSR $A89C ; → bank switch?
  .byte $5C
  ROR A
  .byte $42, $64
  ADC $A800,X
  STA $440A,X
  .byte $23, $9E
  LDA #$A9
  LDA #$A9
  LDA #$A9
  LDA #$A9
  .byte $9F, $83
  LDA $20
  .byte $34
  BRK
  .byte $34, $93
  LDX $20
  .byte $34
  BRK
  .byte $33
  BRK
  .byte $3C
  BRK
  .byte $3B
  BRK
  NOP
  BRK
  AND $3800,Y
  BRK
  .byte $37
  BRK
  ROL $00,X
  AND $42,X
  AND $23
  .byte $87, $8B
  ORA $20B0
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
  STA $0D00,X
  BNE @E4E6
  TAX
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $AB
  BRK
  ORA $20F0
  TAX
  BRK
  .byte $5C
  ROR $7D,X
  .byte $62
  ADC $724C,X
  ROR $AB00
  BRK
  ORA $2110
@E4E6:
  TAX
  BRK
  STY $00,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  STA $AB,X
  BRK
  ORA $2130
  TAX
  BRK
  .byte $53, $74, $5C
  ADC $6E,X
  EOR $4250
  .byte $5C, $AB
  BRK
  ORA $2150
  TAX
  BRK
  BRK
  BRK
  BRK
  STY $00,X
  BRK
  BRK
  BRK
  BRK
  .byte $AB
  BRK
  ORA $2170
  TAX
  BRK
  EOR ($75),Y
  ROR $004C
  BRK
  BRK
  BRK
  BRK
  .byte $AB
  BRK
  ORA $2190
  TAX
  BRK
  BRK
  STY $00,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $AB
  BRK
  ORA $21B0
  TAX
  BRK
  ROR A
  EOR $0069,X
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $AB
  BRK
  ORA $21D0
  TAX
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $AB
  BRK
  ORA $21F0
  TAX
  BRK
  ORA $2C
  PLP
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $AB
  BRK
  ORA $2210
  .byte $9E
  LDA #$A9
  LDA #$A9
  LDA #$A9
  LDA #$A9
  LDA #$A9
  .byte $9F
  BRK
  EOR $2230
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA $20AB
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
  STA $0DAA,X
  AXS #$20
  TAX
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $AB
  TAX
  ORA $20EB
  TAX
  BRK
  .byte $5C
  ROR $7D,X
  .byte $62
  ADC $724C,X
  ROR $AB00
  TAX
  ORA $210B
  TAX
  BRK
  STY $00,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  STA $AB,X
  TAX
  ORA $212B
  TAX
  BRK
  .byte $53, $74, $5C
  ADC $6E,X
  EOR $4250
  .byte $5C, $AB
  TAX
  ORA $214B
  TAX
  BRK
  BRK
  BRK
  BRK
  STY $00,X
  BRK
  BRK
  BRK
  BRK
  .byte $AB
  TAX
  ORA $216B
  TAX
  BRK
  EOR ($75),Y
  ROR $004C
  BRK
  BRK
  BRK
  BRK
  .byte $AB
  TAX
  ORA $218B
  TAX
  BRK
  BRK
  STY $00,X
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $AB
  TAX
  ORA $21AB
  TAX
  BRK
  ROR A
  EOR $0069,X
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $AB
  TAX
  ORA $21CB
  TAX
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $AB
  TAX
  ORA $21EB
  TAX
  BRK
  ORA $2C
  PLP
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $AB
  TAX
  ORA $220B
  .byte $9E
  LDA #$A9
  LDA #$A9
  LDA #$A9
  LDA #$A9
  LDA #$A9
  .byte $9F
  TAX
  EOR $222B
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  TAX
  ASL A
  STA ($22),Y
  TYA
  LDY $ACAC
  STA $ACAC,Y
  LDY $99AC
  ASL A
  LDA ($22),Y
  TYA
  STA $A0A0,Y
  .byte $AF
  LDY #$A0
  LDY #$98
  STA $D10A,Y
  .byte $22
  LDA ($AF,X)
  LDY #$A0
  LDY $A5
  LDY #$A0
  LDX $0AA1
  SBC ($22),Y
  .byte $A3, $AF
  LDY #$A0
  LDX $A7
  LDY #$A0
  LDX $0AA3
  ORA ($23),Y
  TXS
  .byte $9B
  LDY #$A0
  .byte $AF
  LDY #$A0
  LDY #$9A
  .byte $9B
  LSR A
  AND ($23),Y
  TXS
  LDA $ADAD
  .byte $9B
  LDA $ADAD
  LDA $019B
  EOR $9420,Y
  PHP
  .byte $77
  JSR $A89C ; → bank switch?
  EOR $516E,X
  BRK
  TAY
  STA $5748,X
  .byte $23, $9E
  LDA #$A9
  LDA #$A9
  LDA #$A9
  .byte $9F
  ORA ($55,X)
  JSR $4995
  ADC ($20),Y
  BCS @E6C4
@E6C4:
  ALR #$6E
  NOP
  .byte $43
  ARR #$00
  BCS @E715
  ADC ($20),Y
  BCS @E6D0
@E6D0:
  ORA $2E,X
  ASL $12
  BRK
  BRK
  BCS @E6D8
@E6D8:
  BRK
  BRK
  BRK
  ORA ($55,X)
  JSR $4995
  ADC ($20),Y
  BCS @E6E4
@E6E4:
  ASL $2F,X
  ASL $002E,X
  BCS @E6EB
@E6EB:
  .byte $0C
  SBC ($20),Y
  .byte $9C, $5C
  ROR $7D,X
  .byte $62
  ADC $724C,X
  ROR $A8A8
  STA $110C,X
  AND ($AA,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $AB, $0C
  AND ($21),Y
  TAX
  BRK
  .byte $37, $77
  ROL $77,X
  ROL $00,X
  BRK
@E715:
  BRK
  BRK
  .byte $AB, $0C
  EOR ($21),Y
  TAX
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $AB, $0C
  ADC ($21),Y
  TAX
  BRK
  .byte $37, $77, $37, $77
  AND $00,X
  BRK
  BRK
  BRK
  .byte $AB, $0C
  STA ($21),Y
  TAX
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $AB, $0C
  LDA ($21),Y
  TAX
  BRK
  ROL $77,X
  SEC
  .byte $77
  AND $00,X
  BRK
  BRK
  BRK
  .byte $AB, $0C
  CMP ($21),Y
  TAX
  BRK
  STY $00,X
  STY $00,X
  BRK
  BRK
  BRK
  STA $00,X
  .byte $AB, $0C
  SBC ($21),Y
  TAX
  BRK
  .byte $5C, $67
  JMP $0069
  BVC @E7B1
  .byte $5C
  BRK
  .byte $AB, $0C
  ORA ($22),Y
  TAX
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $AB
  JMP $2231
  .byte $9E
  LDA #$A9
  LDA #$A9
  LDA #$A9
  LDA #$A9
  LDA #$A9
  .byte $9F
  ORA #$12
  AND ($94,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  STA $0C,X
  AND ($21),Y
  .byte $9C, $53, $74, $5C
  ADC $6E,X
  EOR $4250
  .byte $5C
  TAY
  STA $510C,X
  AND ($AA,X)
  BRK
  BRK
@E7B1:
  BRK
  BRK
  BRK
  BRK
  BRK
  STA $00,X
  BRK
  .byte $AB, $0C
  ADC ($21),Y
  TAX
  BRK
  EOR $5F7D,Y
  ADC #$50
  .byte $42, $5C
  BRK
  BRK
  .byte $AB, $0C
  STA ($21),Y
  TAX
  BRK
  STA $00,X
  BRK
  BRK
  BRK
  STA $00,X
  BRK
  BRK
  .byte $AB, $0C
  LDA ($21),Y
  TAX
  BRK
  .byte $5C
  ROR A
  EOR $4250
  .byte $5C
  BRK
  BRK
  BRK
  .byte $AB, $0C
  CMP ($21),Y
  TAX
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  STA $00,X
  .byte $AB, $0C
  SBC ($21),Y
  TAX
  BRK
  LSR $43
  ROR $7D50
  `;
}

// ════════ $9800-$9BFF (1024B): 文本渲染引擎 + 字符串数据表 ═══════=
function build_9800_9BFF_textRenderAndStrings(): readonly number[] {
  return asm`
  BVC @E844
  .byte $5C
  BRK
@E804:
  .byte $AB, $0C
  ORA ($22),Y
  TAX
  BRK
  BRK
@E80B:
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $AB
  JMP $2231
  .byte $9E
@E818:
  LDA #$A9
  LDA #$A9
  LDA #$A9
  LDA #$A9
  LDA #$A9
@E822:
  .byte $9F, $1C
  ORA $1F1E,X
  BMI @E85A
  .byte $32, $33, $34
  AND $00,X
  .byte $14
  PLP
  .byte $3C
  LDY #$A0
  INY
  LDY #$B4
  LDY #$B4
  TYA
  TAY
  BCS @E804
  CPY #$C0
  .byte $B0, $B4  ; BCS $97F4
  CPY #$B4
  .byte $B0, $A0  ; BCS $97E4
@E844:
  CPY #$A0
  TYA
  INY
  TYA
  LDY $98,X
  LDY $90,X
  LDY $B0
  CPY $B0
  CLV
  TAY
  LDY $B0C0,X
  TAY
  LDY $A0C0
@E85A:
  TYA
  INY
  TYA
  LDY $98,X
  LDY $A4A8
  BCS $E828
  BCS @E822
  TAY
  LDY $B4C0,X
  BCS @E818
  CPY #$A0
  TYA
  INY
  TYA
  BCS @E80B
  CLV
  TYA
  LDY $A8,X
  INY
  CPY #$C0
  TAY
  LDY $C0,X
  LDY $A8B8
  TAY
  ORA $62
  JSR $891B ; → bank switch?
  ORA $62
  .byte $23, $1B, $89, $04
  STA ($20,X)
  .byte $17
  TXA
  .byte $04
  STA $1720,X
  TXA
  BRK
  STA $0FB8,Y
  ORA ($61,X)
  JSR $0188
  ADC ($23,X)
  STX $7D01
  JSR $4190
  ADC $9323,X
  ORA $4E0A
  .byte $BF
  ASL $B8B4
  ORA $BB0A
  .byte $BF
  ASL A
  ORA $BF,X
  .byte $04, $83
  JSR $8A07 ; → bank switch?
  .byte $04
  STX $0720
  TXA
  ORA $64
  AND ($0A,X)
  .byte $89, $04
  BCC @E8E9
  ASL A
  TAX
  .byte $04, $9C
  JSR $AB0A ; → bank switch?
  ORA $D1
  AND ($0B,X)
  LDA #$04
  .byte $C3
  AND ($0D,X)
  TAX
  .byte $04
  DEC $0D21
  .byte $AB
  ORA $64
  .byte $23
  ASL A
  LDA #$04
  BMI $E909
  ASL A
  TAX
@E8E9:
  .byte $04, $3C, $22
  ASL A
  .byte $AB
  ORA $71
  .byte $23
  ANC #$A9
  ORA $ED
  BIT $08
  TAY
  .byte $04, $03
  AND $13
  TAX
  .byte $04, $1C
  AND $13
  .byte $AB
  BRK
  ASL $B9
  .byte $0F, $02, $63
  JSR $8988 ; → bank switch?
  ASL $6C
  JSR $8989 ; → bank switch?
  BCC @E912
@E912:
  .byte $9C
  TAY
  .byte $03
  NOP
  JSR $A8A8 ; → bank switch?
  STA $6301,X
  AND ($8E,X)
  ORA ($6E,X)
  AND ($93,X)
  .byte $02, $A3
  AND ($9C,X)
  TAY
  .byte $03
  LDY $A821
  TAY
  STA $D001,X
  AND ($9E,X)
  ORA ($DC,X)
  AND ($9F,X)
  .byte $02
  BPL @E95A
  .byte $9C
  TAY
  .byte $03
  NOP
  .byte $22
  TAY
  TAY
  STA $6301,X
  .byte $23, $9E, $03
  ROR $9F23
  BRK
  .byte $9E
  ORA ($7C,X)
  .byte $23, $9F
  ORA ($C3,X)
  BIT $8A
  .byte $03
  DEC $8A24
  BRK
  TAX
  ORA ($DC,X)
@E95A:
  BIT $AB
  .byte $02, $E3
  BIT $9C
  TAY
  .byte $43
  NOP
  BIT $A8
  TAY
  STA $A99E,X
  LDA #$A9
  LDA #$A9
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
  .byte $03
  ORA #$22
  .byte $02
  EOR #$22
  ORA ($89,X)
  .byte $22
  ORA $C9
  .byte $22, $04
  ORA #$23
  ASL $49
  .byte $23
  ORA ($B7),Y
  JSR $F70F ; → bank switch?
  JSR $3712
  AND ($14,X)
  .byte $77
  AND ($15,X)
  .byte $B7
  AND ($09,X)
  .byte $57, $22, $07, $97, $22
  ASL A
  .byte $D7, $22, $0C, $17, $23
  ORA $2357
  .byte $FF
  CLC
  ORA #$22
  ORA $2249,Y
  NOP
  .byte $89, $22, $1C
  SBC #$22
  .byte $1B
  EOR #$23
  ASL $20B7,X
  ORA $2257,X
  .byte $FF
  PHA
  EOR $1922
  ASL A
  PLP
  BRK
  BRK
  BRK
  ASL $2E,X
  BRK
  .byte $0C, $23
  BRK
  BRK
  ORA ($12,X)
  .byte $12, $03, $04
  ORA $06
  .byte $07
  PHP
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
  BRK
  BRK
  AND ($21,X)
  .byte $02, $03, $04
  ORA $06
  .byte $07
  PHP
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
  BRK
  BRK
  BRK
  BRK
  AND ($31),Y
  .byte $02
  AND ($31),Y
  .byte $03, $44
  AND ($44),Y
  .byte $44
  EOR $06,X
  EOR $44,X
  .byte $07
  EOR $55,X
  .byte $44
  PHP
  ORA #$30
  .byte $0C, $04
  PHP
  JSR $0A04
  BRK
  JSR $0208
  ASL $18
  BRK
  BRK
  BRK
  JSR $0208
  ASL $18
  .byte $04
  ASL $00
  CLC
  .byte $04, $02, $04
  BPL @EA3A
@EA3A:
  BRK
  BRK
  CLC
  .byte $04, $02, $04
  BPL @EA42
@EA42:
  BRK
  BRK
  NOP
  ASL $02
  .byte $04, $14
  BRK
  BRK
  BRK
  .byte $52
  BRK
  .byte $54
  BRK
  LSR $00,X
  CLI
  BRK
  NOP
  BRK
  BRK
  BRK
  ADC $7B00
  BRK
  STX $9A00
  BRK
  LDY #$00
  BRK
  BRK
  LDA ($00),Y
  LDA $D500,X
  BRK
  BRK
  BRK
  INY
  BRK
  .byte $E7
  BRK
  NOP
  BRK
  SBC $F000
  BRK
  .byte $F2
  BRK
  .byte $F2
  BRK
  SBC $00,X
  SED
  BRK
  INC $0A00,X
  ORA ($0A,X)
  ORA ($0D,X)
  ORA ($10,X)
  ORA ($37,X)
  ORA ($3D,X)
  ORA ($45,X)
  ORA ($45,X)
  ORA ($00,X)
  BRK
  RTS
  BRK
  BNE @EA96
@EA96:
  BVC $EA99
@EA98:
  BPL @EA9C
  BRK
  .byte $03
@EA9C:
  SED
  .byte $03
  BRK
  ORA $28
  ASL $80
  .byte $07
  BRK
  ORA #$90
  ASL A
  BMI @EAB6
  CPX #$0D
  LDY #$0F
  BVS @EAC1
  BVC $EAC5
  BVC $EAC9
  BVS @EACD
@EAB6:
  BCS $EAD1
  BRK
  .byte $1C
  RTS
  ASL $20D0,X
  PHA
@EABF:
  .byte $23
  INY
@EAC1:
  AND $50
  PLP
  CPX #$2A
  SEI
  AND $3018
  INY
  .byte $32
  DEY
@EACD:
  AND $58,X
  SEC
  BMI @EB0D
  BPL @EB12
  SED
  RTI
  RTI
  .byte $44
  BCC @EB21
  INX
  LSR A
  PHA
  LSR $51B0
  JSR $0055
  EOR $5D20,Y
  BVC $EB49
  BCC $EB4F
  CPX #$69
  RTI
  ROR $7300
  CPX #$77
  BNE $EB70
  BRK
  .byte $82, $80, $87, $80
  STA $93E0
  BNE @EA98
  CPX #$A1
  CPY #$A9
  CPY #$B1
  BNE @EABF
  .byte $04, $C2, $80
  AXS #$A0
  .byte $D7
  BRK
@EB0D:
  INX
  .byte $FF, $FF
  ASL A
  .byte $04
@EB12:
  .byte $02
  ASL $00
  BPL $EB29
  PHP
  ASL $080C
  .byte $04, $02
  ASL $0E
  BRK
  .byte $12
@EB21:
  BPL $EB2D
  .byte $0C
  BRK
  .byte $04
  BRK
  PHP
  ASL $0006
  ASL $0202
  ORA ($55,X)
  .byte $BB
  ORA ($7E),Y
  .byte $BB, $14, $93, $BB
  ORA $99,X
  .byte $BB, $17
  LDY $BB
  CLC
  INY
  .byte $BB
  NOP
  CPX $1BBB
  ANC #$BC
  .byte $1C, $1B
  LDY $301D,X
  LDY $361F,X
  LDY $3C20,X
  LDY $4222,X
  LDY $9D00,X
  BRK
@EB58:
  .byte $03
  ASL $00
  TAY
  BRK
  ASL $FE06
  .byte $9E
  BRK
  .byte $04
  ASL $10
  .byte $A3
  BRK
  ORA #$06
  SBC $00AC,X
  .byte $12
  ASL $00
  LDX $0102,Y
  ASL $00
  CMP $01
  ORA ($06,X)
  BPL $EB43
  .byte $03
  ORA ($06,X)
  .byte $FF
  BRK
  TAY
  BRK
  ASL $1006
  .byte $A3
  BRK
  ORA #$06
  BRK
  TAX
  BRK
  BPL @EB93
  BPL @EB58
  .byte $03
  ORA ($06,X)
  .byte $FF
@EB93:
  BRK
  DEC $0100
  .byte $07, $FF
  BRK
  .byte $9F
  BRK
  ORA $06
  BRK
  LDY #$00
  ASL $06
  .byte $FF
  BRK
  LDX #$00
  PHP
  ASL $00
  LDY $00
  ASL A
  ASL $00
  .byte $A3
  BRK
  ORA #$06
  BRK
  AXS #$03
  .byte $03
  ASL $00
  .byte $D2
  ORA ($01,X)
  .byte $07
  BRK
  .byte $CF
  BRK
  .byte $02, $07
  BRK
  CLD
  .byte $02
  ORA ($07,X)
  .byte $FF
  BRK
  LDX #$00
  PHP
  ASL $00
  LDY $00
  ASL A
  ASL $00
  .byte $A3
  BRK
  ORA #$06
  BRK
  AXS #$03
  .byte $03
  ASL $00
  .byte $D2
  ORA ($03,X)
  .byte $07
  BRK
  .byte $CF
  BRK
  .byte $02, $07
  BRK
  CLD
  .byte $02
  ORA ($07,X)
  .byte $FF
  BRK
  LDX $00
  .byte $0C
  ASL $00
  .byte $A7
  BRK
  ORA $0006
  TAY
  BRK
  ASL $0006
  .byte $BF, $02, $02
  .byte $06
  `;
}

// ════════ $9C00-$9FFF (1024B): 字符串表(队伍名/球员名) + 属性索引表 ═══════=
function build_9C00_9FFF_stringTables(): readonly number[] {
  return asm`
  BRK
  DEX
  .byte $03, $02
  ASL $00
  CMP $01,X
  .byte $04, $07, $FF
  BRK
  LDA ($00,X)
  .byte $07
  ASL $00
  .byte $D3
  ORA ($02,X)
  .byte $07
  BRK
  DEC $01
  .byte $02
  ASL $FF
  BRK
  LDA $1300
  ASL $00
  .byte $BF, $02, $02
  ASL $00
  .byte $D4
  ORA ($03,X)
  .byte $07
  BRK
  BNE @EC2D
@EC2D:
  .byte $03, $07, $FF
  BRK
  LDA $00
  ANC #$06
  .byte $FF
  BRK
  DEX
  .byte $03, $02
  ASL $FF
  BRK
  LDA #$00
  .byte $0F
  ASL $FF
  BRK
  SBC $02
  BRK
  PHP
  .byte $FF
  ROL $25
  ROR $25
  LDX $25
  INC $25
  ROL $26
  ROR $26
  LDX $26
  INC $26
  EOR $22
  EOR $5522
  .byte $22
  STA $22
  STA $9522
  .byte $22
  CMP $22
  CMP $D522
  .byte $22
  ORA $23
  ORA $0123
  ASL $0B
  BPL @EC88
  NOP
  .byte $1F, $27
  LDY #$A5
  .byte $AF
  INY
  BIT $02
  .byte $07, $0C
  ORA ($16),Y
  .byte $1B
  JSR $A128 ; → bank switch?
  LDX $B0
  CMP #$25
@EC88:
  .byte $03
  PHP
  ORA $1712
  .byte $1C
  AND ($29,X)
  LDX #$A7
  LDA ($CA),Y
  ROL $04
  ORA #$0E
  .byte $13
  CLC
  ORA $2A22,X
  .byte $A3
  TAY
  .byte $B2
  AXS #$2C
  ORA $0A
  .byte $0F, $14
  ORA $231E,Y
  ANC #$A4
  LDA #$B3
  CPY $6A85
  JSR $4A4D
  EOR ($62,X)
  .byte $63
  AND $714C
  ADC $AA54,X
  ADC $28FF,Y
  AND $05
  .byte $2F, $14
  ADC $0A00,Y
  ROL A
  NOP
  RTS
  EOR $6F47
  PHA
  TAX
  ADC $FF79,Y
  ORA ($02,X)
  .byte $03, $04
  ORA $06
  ORA ($12),Y
  .byte $13, $14
  ORA $16,X
  AND ($22,X)
  .byte $23
  ROL $31
  .byte $32, $33, $34
  AND $36,X
  RTI
  EOR ($42,X)
  .byte $43, $44
  EOR ($52),Y
  .byte $53, $54
  EOR $56,X
  .byte $57, $FF
@ECF4:
  LDY $BD0C,X
  .byte $22
  LDA $BD2C,X
  AND $4EBD,X
  LDA $216A,X
  CMP $67
  TSX
  ADC #$00
  PLA
  EOR $46
  .byte $6F, $CF, $FF
  ROR $21
  TAY
  ROL $080A
  BRK
  ASL A
  .byte $03
  ASL A
  .byte $03
  ALR #$6F
  LSR $7D
  ASL $0C2E
  AND ($09),Y
  ROL $6CFF
  AND ($BA,X)
  BVS @ECF4
  ROR $6F46
  .byte $CF, $FF
  PLA
  AND ($6C,X)
  ADC $C269,X
  ADC $7D
  EOR $4100
  TSX
  EOR ($26,X)
  ASL $FF2E
  PLA
  AND ($6C,X)
  ADC $C269,X
  ADC $7D
  EOR $2600
  ASL $682E
  ADC $FFB6,X
  ROR $21
  JMP ($697D)
  .byte $C2
  ADC $7D
  EOR $0900
  .byte $2F, $0C, $32, $03, $54
  ADC $6255,X
  ROR $FF54
  .byte $74
  LDA $BD7C,X
  .byte $82
  LDA $BD88,X
  STX $94BD
  LDA $BD9A,X
  LDX #$BD
  .byte $04
  ROL $020E
@ED78:
  LDX $01
  .byte $02, $FF, $34
  ASL $02
  ASL $FF2E
  AND $06,X
  .byte $02
  ASL $FF2E
  ROL $06,X
  .byte $02
  ASL $FF2E
  .byte $37
  ASL $02
  ASL $FF2E
  SEC
  ASL $02
  ASL $FF2E
  ORA #$2F
  .byte $0C, $32, $03
  ASL $FF2E
  ANC #$02
  .byte $0C
  ORA ($02,X)
  .byte $FF, $F2
  LDA $BDF9,X
  BRK
  LDX $BE09,Y
  ORA ($BE),Y
  NOP
  LDX $BE21,Y
  AND #$BE
  BMI @ED78
  .byte $37
  LDX $BE3F,Y
  PHA
  LDX $BE4F,Y
  EOR $5FBE,Y
  LDX $BE66,Y
  ADC $74BE
  LDX $BE7D,Y
  STY $BE
  TXA
  LDX $BE91,Y
  .byte $97
  LDX $BE9F,Y
  .byte $A7
  LDX $BEAE,Y
  .byte $B7
  LDX $BEC0,Y
  DEX
  LDX $BED2,Y
  NOP
  LDX $BEE2,Y
  NOP
  LDX $BEF2,Y
  .byte $FC
  LDX $BF05,Y
  ORA $00BF
  ALR #$6E
  CMP $6B43
  .byte $FF
  BRK
  BRK
  ORA $2E,X
  ASL $12
  .byte $FF
  TAY
  ROL $1E16
  ROL $7D65
  EOR $00FF
  .byte $5C
  ADC #$60
  CLI
  ROR $FF4E
  BRK
  LSR A
  PLA
  ROR $7051
  ROR $FF4D
  BRK
  BRK
  LDX $6A,Y
  RTS
  EOR $FF
  BRK
  CMP $6269
  .byte $42, $67
  EOR $00FF
  BRK
  ALR #$6E
  .byte $54
  EOR $00FF
  .byte $5C, $67, $62
  ROR $FFB8
  PHP
  ASL $20,X
  LDY #$08
  .byte $02
  ROL $01FF
  .byte $07
  BPL @EE4F
  .byte $32, $03
  ASL A
  .byte $03, $FF
  BRK
  BRK
  BPL $EE5E
  ORA $20,X
  .byte $FF
@EE4F:
  AND ($0B,X)
  .byte $0C, $02
  TAX
  .byte $02, $1C
  LDA #$08
  .byte $FF
  BRK
  BRK
  .byte $1C, $27
  ORA $00FF,Y
  BRK
  .byte $14, $03
  ASL $FF03,X
  BRK
  STA ($8F,X)
  ARR #$7D
  .byte $5F, $FF
  BRK
  .byte $43
  ADC #$B6
  EOR ($42,X)
  .byte $FF
  NOP
  ROR $69C5
  LDY $7D,X
  .byte $8F
  STA ($FF),Y
  BRK
  TAY
  ROL $1E16
  ROL $00FF
  BRK
  JMP $4168
  .byte $FF
  BRK
  ORA ($31),Y
  .byte $03
  LDY $08
  .byte $FF
  BRK
  BRK
  .byte $42, $67
  ROR $07FF
  BPL @EEAB
  .byte $32, $03
  ASL $FF2E
  ALR #$43
  TSX
  EOR ($67,X)
  CPY $41
  .byte $FF
  BRK
  BRK
  ASL $2E
@EEAB:
  ASL A
  PHP
  .byte $FF, $C3
  EOR $3F4A
  LDX $B43F,Y
  .byte $5F, $FF
  CMP ($7D),Y
  .byte $67
  ROR $65C2
  ADC $FF4D,X
  .byte $42
  ROR $67B6
  ROR $65C2
  ADC $FF4D,X
  .byte $4F
  CPY $44
  .byte $54
  ADC $7D
  EOR $5CFF
  .byte $67
  ROR $654D
  ADC $FF4D,X
  .byte $62, $47
  JMP $654A
  ADC $FF4D,X
  .byte $42
  BVC @EF4D
  EOR ($65,X)
  ADC $FF4D,X
  EOR $67
  ROR $65BE
  ADC $FF4D,X
  EOR ($69,X)
  LDY $516E,X
  ROR $7D65
  EOR $56FF
  JMP $42C2
  .byte $52
  ADC $7D
  EOR $C5FF
  .byte $67
  TSX
  ADC #$65
  ADC $FF4D,X
  CMP $67
  TSX
  ADC #$65
  ADC $FF4D,X
  STA $20
  ROR A
  DEC $69
  SBC $20C5,X
  ANC #$02
  TAX
  .byte $02
  LDY $6F,X
  .byte $52
  SBC $2053,X
  BPL @EF2F
  .byte $02, $C7
  ADC $FD69,X
  .byte $F3
@EF2F:
  AND ($1B,X)
  PHP
  .byte $02, $C7
  ADC $FD69,X
  STX $21
  ORA $2803,Y
  .byte $32
  PHP
  SBC $24C6,X
  .byte $1B, $2F
  ANC #$12
  BIT $FDA5
  DEC $24,X
  LDY $6F,X
  .byte $52
@EF4D:
  .byte $FF
  STA ($20),Y
  .byte $54, $67, $6F, $CF
  SBC $20D1,X
  JMP $7D71
  .byte $54
  SBC $2111,X
  EOR $7D69
  SBC $2151,X
  PHA
  PLA
  EOR ($7D,X)
  SBC $2191,X
  ASL $0128
  .byte $02
  SBC $21E4,X
  .byte $C2
  PLA
  CMP $69
  SBC $2224,X
  CMP $FD4D
  .byte $64, $22
  JMP $7D71
  .byte $54
  SBC $22A4,X
  BVC $EFF6
  PHA
  ADC #$FD
  CPX $22
  CMP $6B
  .byte $6F
  PHA
  SBC $2324,X
  CMP $464D
  .byte $6F, $54
  SBC $2231,X
  .byte $54, $67, $6F, $CF
  SBC $2271,X
  JMP $7D71
  .byte $54
  SBC $22B1,X
  EOR $7D69
  SBC $22F1,X
  PHA
  PLA
  EOR ($7D,X)
  SBC $2331,X
  ASL $0128
  .byte $02, $FF
  STA ($20),Y
  .byte $14
  BCS $EF6A
  ORA $E4FD
  AND ($CD,X)
  EOR $24FD
  .byte $22, $47
  .byte $70, $6F  ; BVS $A03B
  EOR ($FD),Y
  .byte $64, $22
  CMP $516E
  SBC $22C4,X
  .byte $0F
  ORA $04,X
  AND #$FD
  LDY $22
  .byte $C2
  PLA
  CMP $69
  ASL $FD,X
  BIT $23
  .byte $0F
  ORA $04,X
  AND #$FD
  .byte $04, $23
  JMP $7D71
  .byte $54
  ASL $FD,X
  AND ($22),Y
  .byte $14
  BCS $EFA1
  ORA $FFFF
  .byte $FF, $FF, $FF, $FF, $FF, $FF
  `;
}

// ═══════════════════════════════════════════════════
// Assemble all sections into full 8KB bank
// ═══════════════════════════════════════════════════
const _PRG_BANK_01: readonly number[] = [
  ...build_8000_83FF_jumpTableAndInit(),
  ...build_8400_87FF_playerCalcAndMenu(),
  ...build_8800_8BFF_formationAndTactics(),
  ...build_8C00_8FFF_eventScriptAndSprite(),
  ...build_9000_93FF_playerUtilsAndLayout(),
  ...build_9400_97FF_matchLayoutTables(),
  ...build_9800_9BFF_textRenderAndStrings(),
  ...build_9C00_9FFF_stringTables(),
];
