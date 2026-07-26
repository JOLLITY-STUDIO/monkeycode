/**
 * PRG-ROM MMC3 bank 31 (8KB) — function-based assembly
 * Mapper: 4 (MMC3) | ROM range: $E000-$FFFF (fixed upper bank)
 *
 * Pattern: 参考 chr_banks/bank_0_8k.ts
 *   每个 build_xxx() 函数返回其覆盖地址范围的 raw 6502 字节，
 *   最后通过 spread 拼成完整的 8KB 数组
 */


import { asm } from '../_6502asm';
export { _PRG_BANK_31 as default };

console.log('[prg_31_boot_vectors] loaded');

// ════════ $E000-$E016 (23B): 球员数值计算 clamping [48,207] ═══════=
function buildE000_E016_calcPlayerStat(): readonly number[] {
  return asm`
  .byte $FF
  CLC
  ADC #$01
  LDY #$06
  CLC
  ADC ($34),Y
  CMP #$D0
  BCC @E00F
  LDA #$CF
@E00F:
  CMP #$30
  BCS @E015
  LDA #$30
@E015:
  STA ($34),Y
  `;
}

// ════════ $E017-$E022 (12B): 球权交换 $0441 ↔ $05FC ═══════=
function buildE017_E022_swapBallOwner(): readonly number[] {
  return asm`
LDA $0441
LDX $05FC
STX $0441
STA $05FC
  `;
}

// ════════ $E023-$E058 (54B): 比赛场景初始化 + 设置 $061A/$061B 标记 ═══════=
function buildE023_E058_matchInit(): readonly number[] {
  return asm`
JSR $E059 ; → bank switch?
LDA #$FF
STA $061A
LDA #$01
STA $061B
JSR $E73E ; → bank switch?
LDA $05FC
STA $0441
JSR $E6EC ; → bank switch?
PHA
LDA $22
LDA #$1A
STA $24
LDA #$1B
STA $25
JSR $CE2D ; → bank switch?
PLA
JSR $801E ; → bank switch?
LDA #$1B
JSR $CBB0 ; → bank switch?
LDX #$50
TXS
JMP $E0DF
  `;
}

// ════════ $E059-$E073 (27B): 球权交换前检查: 读 $05FC, 坐标计算, 存 $0638 ═══════=
function buildE059_E073_preSwapCheck(): readonly number[] {
  return asm`
  LDA $05FC
  CMP #$FF
  BEQ @E073
  JSR $CD7C ; → bank switch?
  LDY #$06
  LDA ($34),Y
  TAX
  LDY #$08
  LDA ($34),Y
  TAY
  JSR $CDE2 ; → bank switch?
  STA $0638
@E073:
  RTS
  `;
}

// ════════ $E074-$E0DE (107B): 比赛流程推进: 检查 $05FF, 遍历球员, 触发事件 ═══════=
function buildE074_E0DE_matchProgressCheck(): readonly number[] {
  return asm`
  LDA $05FF
  BEQ @E0DE
  LDA #$0F
  STA $062A
  JSR $E709 ; → bank switch?
  LDA #$00
@E083:
  PHA
  LDA #$01
  JSR $CB0F ; → bank switch?
  PLA
  PHA
  BEQ @E0D1
  CMP #$0B
  BEQ @E0D1
  CMP $0441
  BEQ @E0D1
  BIT $062A
  BPL @E0AF
  PHA
  PHA
  LDA $22
  LDA #$1A
  STA $24
  LDA #$1B
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8000 ; → bank switch?
  PLA
@E0AF:
  STA $41
  JSR $CD7C ; → bank switch?
  LDA $41
  CMP #$0B
  LDX $05FB
  BEQ @E0C3
  PHP
  PLA
  EOR #$01
  PHA
  PLP
@E0C3:
  LDX #$21
  BCC @E0C9
  LDX #$22
@E0C9:
  LDA $41
  JSR $CE08 ; → bank switch?
  JSR $E854 ; → bank switch?
@E0D1:
  PLA
  CLC
  ADC #$01
  CMP #$16
  BNE @E083
  LDA #$00
  STA $05FF
@E0DE:
  RTS
  `;
}

// ════════ $E0DF-$E7BB (1757B): 比赛主循环 + 子程序 (场景切换/球员移动/判定) ═══════=
function buildE0DF_E6FB_mainLoop(): readonly number[] {
  return asm`
  LDA #$00
  JSR $EF7F ; → bank switch?
  LDA #$01
  JSR $EF7F ; → bank switch?
  JSR $E233 ; → bank switch?
  LDA #$0A
  STA $0614
  LDA #$FF
  STA $062A
  JSR $E6EC ; → bank switch?
  LDY #$40
  LDX #$00
  STX $044E
  STX $0600
  LDA $0441
  CMP #$0B
  BCC @E10E
  LDX #$0B
  LDY #$00
@E10E:
  STX $05FB
  STY $0517
  TXA
  BNE @E125
  BIT $044C
  BPL @E142
  STA $044C
  STA $03F1
  JMP @E142
@E125:
  LDA #$00
  STA $0442
  JSR $CE99 ; → bank switch?
  STA $05FD
  LDA $0441
  JSR $CD7C ; → bank switch?
  LDA #$05
  LDY #$09
  STA ($34),Y
  LDA $05FE
  STA $0617
@E142:
  JSR $E267 ; → bank switch?
  LDA #$01
  JSR $CB0F ; → bank switch?
  JSR $E349 ; → bank switch?
  LDA $0614
  BEQ @E158
  DEC $0614
  JMP $E145
@E158:
  LDA #$0A
  STA $0614
  LDA $001C
  AND #$0F
  BEQ @E186
  PHA
  LDX #$20
  LDA $0441
  LDY $05FB
  BEQ @E174
  LDX #$22
  LDA $05FD
@E174:
  JSR $CE08 ; → bank switch?
  PLA
  PHA
  LDY #$05
  JSR $E8F5 ; → bank switch?
  PLA
  LSR A
  LSR A
  LDY #$07
  JSR $E8F5 ; → bank switch?
@E186:
  JSR $E6EC ; → bank switch?
  LDA $0441
  CMP #$0B
  BCC @E1E7
  LDA $05FE
  CMP $0617
  BEQ @E1E7
  STA $0617
  LDA #$00
  STA $0621
  PHA
  LDA $22
  LDA #$1C
  STA $24
  LDA #$1D
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8006 ; → bank switch?
  LDA $043B
  CMP #$02
  BEQ @E1E7
  PHA
  LDA $22
  LDA #$1A
  STA $24
  LDA #$1B
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8021 ; → bank switch?
  JSR $CC46 ; → bank switch?
  LDA #$00
  STA $062D
  STA $0615
  LDA #$1A
  STA $24
  LDA #$1B
  STA $25
  JSR $CE2D ; → bank switch?
  LDX #$50
  TXS
  JMP $8027
@E1E7:
  LDX #$00
  STX $05FF
  INX
  TXA
  JSR $D193 ; → bank switch?
  JSR $E27D ; → bank switch?
  INC $0613
  JSR $E2BC ; → bank switch?
  JSR $E407 ; → bank switch?
  BIT $044B
  BPL @E21E
  LDA $05FB
  BNE @E21E
  BIT $0635
  BPL @E21E
  PHA
  LDA $22
  LDA #$1A
  STA $24
  LDA #$1B
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8039 ; → bank switch?
@E21E:
  PHA
  LDA $22
  LDA #$1A
  STA $24
  LDA #$1B
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8033 ; → bank switch?
  JMP $E145
  LDA #$1E
  JSR $CBB0 ; → bank switch?
  PHA
  LDA $22
  LDA #$1C
  STA $24
  LDA #$1D
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8024 ; → bank switch?
  JSR $E267 ; → bank switch?
  LDA #$80
  STA $0615
  STA $062D
  LDA #$00
  STA $0642
  STA $0643
  LDA #$02
  STA $8E
  LDA #$01
  STA $0469
  RTS
  LDA $05FB
  BEQ @E277
  LDA #$31
  JSR $EF7F ; → bank switch?
  LDA #$32
  JSR $EF7F ; → bank switch?
  RTS
@E277:
  LDA #$30
  JSR $EF7F ; → bank switch?
  RTS
  JSR $CD77 ; → bank switch?
  LDY #$0A
  LDA ($34),Y
  BNE @E2A2
  LDX $0635
  LDY $0637
  LDA $05FB
  BEQ @E296
  TXA
  EOR #$FF
  TAX
  INX
@E296:
  CPX #$C4
  BCC @E2A2
  CPY #$74
  BCC @E2A2
  CPY #$8C
  BCC @E2A3
@E2A2:
  RTS
@E2A3:
  LDA #$00
  STA $062D
  STA $0615
  LDA #$1A
  STA $24
  LDA #$1B
  STA $25
  JSR $CE2D ; → bank switch?
  LDX #$50
  TXS
  JMP $8009
  INC $0618
  LDA $0618
  CMP #$01
  BCC @E315
  LDA #$00
  STA $0618
@E2CB:
  PHA
  CMP $0441
  BEQ @E30D
  LDX #$00
  JSR $CE08 ; → bank switch?
  LDX #$02
  LDY #$00
  LDA ($34),Y
  LDY #$01
  CMP #$20
  BNE @E2EC
  LDX #$01
  LDA ($34),Y
  INY
  ORA ($34),Y
  BEQ @E30D
  DEY
@E2EC:
  TXA
  CLC
  ADC ($34),Y
  TAX
  INY
  LDA ($34),Y
  ADC #$00
  TAY
  SEC
  TXA
  SBC $32
  TYA
  SBC $33
  BCC @E304
  LDX $32
  LDY $33
@E304:
  TYA
  LDY #$02
  STA ($34),Y
  TXA
  DEY
  STA ($34),Y
@E30D:
  PLA
  CLC
  ADC #$01
  CMP #$0B
  BNE @E2CB
@E315:
  LDA $0441
  CMP #$0B
  BCS @E348
  JSR $CD7C ; → bank switch?
  LDX #$03
  LDY #$00
  LDA ($34),Y
  CMP #$20
  BNE @E32B
  LDX #$05
@E32B:
  STX $3A
  LDY #$01
  LDA ($34),Y
  SEC
  SBC $3A
  TAX
  INY
  LDA ($34),Y
  SBC #$00
  BCS @E33F
  LDX #$00
  TXA
@E33F:
  STA ($34),Y
  TXA
  DEY
  STA ($34),Y
  JSR $E267 ; → bank switch?
@E348:
  RTS
  LDA #$00
  STA $0532
  LDA $05FB
  BNE @E3A3
  LDA $0615
  ORA #$40
  STA $0615
  LDA $001C
  AND #$40
  BNE @E382
  LDA $001C
  AND #$0F
  BEQ @E3C9
  INC $0532
  LDX #$00
  AND #$02
  BNE @E374
  LDX #$40
@E374:
  STX $0517
  LDA $0615
  AND #$BF
  STA $0615
  JMP @E3C9
@E382:
  LDA #$00
  STA $0600
  STA $0615
  LDA #$44
  JSR $CBB0 ; → bank switch?
  JSR $CB8B ; → bank switch?
  LDA #$1A
  STA $24
  LDA #$1B
  STA $25
  JSR $CE2D ; → bank switch?
  LDX #$50
  TXS
  JMP $8003
@E3A3:
  INC $0532
  LDA #$C0
  AND $001E
  BEQ @E3C9
  LDX #$01
  TAY
  BMI @E3B4
  LDX #$FF
@E3B4:
  TXA
  CLC
  ADC $05FD
  BNE @E3BD
  LDA #$0A
@E3BD:
  CMP #$0B
  BCC @E3C3
  LDA #$01
@E3C3:
  STA $05FD
  JSR $E267 ; → bank switch?
@E3C9:
  RTS
  LDA $05FB
  BNE @E3D6
  LDA $001C
  AND #$0F
  BEQ @E406
@E3D6:
  LDA $0441
  LDX #$20
  JSR $CE08 ; → bank switch?
  LSR $33
  ROR $32
  LSR $33
  ROR $32
  LDX $32
  LDY $33
  BIT $0517
  BVS @E3F7
  TXA
  EOR #$FF
  TAX
  TYA
  EOR #$FF
  TAY
@E3F7:
  TXA
  CLC
  ADC $0642
  STA $0642
  TYA
  ADC $0643
  STA $0643
@E406:
  RTS
  JSR $E709 ; → bank switch?
  LDA #$00
  PHA
  LDA #$01
  JSR $CB0F ; → bank switch?
  JSR $E349 ; → bank switch?
  PLA
  PHA
  BEQ @E48F
  CMP #$0B
  BEQ @E48F
  LDX $05FB
  BEQ @E427
  CMP $05FD
  BEQ @E48F
@E427:
  CMP $0441
  BNE @E430
  CMP #$0B
  BCC @E48F
@E430:
  BIT $062A
  BPL @E44E
  CMP $0441
  BEQ @E44E
  PHA
  PHA
  LDA $22
  LDA #$1A
  STA $24
  LDA #$1B
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8000 ; → bank switch?
  PLA
@E44E:
  STA $41
  JSR $CD7C ; → bank switch?
  LDA $41
  CMP #$0B
  LDX $05FB
  BEQ @E462
  PHP
  PLA
  EOR #$01
  PHA
  PLP
@E462:
  LDX #$21
  BCC @E472
  LDX #$22
  LDY #$09
  LDA ($34),Y
  CMP #$F0
  BNE @E472
  LDX #$1F
@E472:
  LDA $41
  CMP $0441
  BNE @E47B
  LDX #$20
@E47B:
  JSR $CE08 ; → bank switch?
  LDY #$0A
  LDA ($34),Y
  BEQ @E48C
  SEC
  SBC #$01
  STA ($34),Y
  JMP @E48F
@E48C:
  JSR $E854 ; → bank switch?
@E48F:
  PLA
  CLC
  ADC #$01
  CMP #$16
  BEQ @E49A
  JMP $E40C
@E49A:
  LDA #$00
  STA $0600
  LDA $0613
  CMP #$05
  BCC @E4B0
  LDA #$00
  STA $0613
  LDA #$07
  JSR $E4D7 ; → bank switch?
@E4B0:
  LDA $0600
  BNE @E4B6
  RTS
@E4B6:
  LDA #$00
  STA $062D
  STA $0615
  JSR $CB8B ; → bank switch?
  LDA #$2E
  JSR $CBB0 ; → bank switch?
  LDA #$1A
  STA $24
  LDA #$1B
  STA $25
  JSR $CE2D ; → bank switch?
  LDX #$50
  TXS
  JMP $8003
  STA $43
  LDA #$00
  STA $0600
  LDA $05FB
  EOR #$0B
  CLC
  ADC #$01
  STA $41
  LDA #$0A
  STA $42
@E4EC:
  LDA $41
  JSR $CD7C ; → bank switch?
  LDY #$0A
  LDA ($34),Y
  BNE @E4FA
  JSR $E501 ; → bank switch?
@E4FA:
  INC $41
  DEC $42
  BNE @E4EC
  RTS
  LDA #$00
  STA $44
  LDY #$06
  LDA ($34),Y
  SEC
  SBC $0635
  BCS @E513
  EOR #$FF
  ADC #$01
@E513:
  CMP $43
  BCS @E519
  INC $44
@E519:
  LDY #$08
  LDA ($34),Y
  SEC
  SBC $0637
  BCS @E527
  EOR #$FF
  ADC #$01
@E527:
  CMP $43
  BCS @E52D
  INC $44
@E52D:
  LDA $44
  CMP #$02
  BNE @E54B
  LDX $0600
  CPX #$05
  BCS @E54B
  LDA $05FB
  BEQ @E543
  CPX #$04
  BCS @E54B
@E543:
  LDA $41
  STA $0601,X
  INC $0600
@E54B:
  RTS
  LDA #$00
  STA $044E
  LDA $0600
  BEQ @E590
  LDX #$00
  LDY #$00
@E55A:
  LDA $060B,X
  CMP #$05
  BNE @E56E
  LDA $0601,X
  BEQ @E56E
  CMP #$0B
  BEQ @E56E
  STA $0601,Y
  INY
@E56E:
  INX
  CPX $0600
  BNE @E55A
  TYA
  BEQ @E590
  STY $0600
  LDA #$2E
  JSR $CBB0 ; → bank switch?
  LDA #$1A
  STA $24
  LDA #$1B
  STA $25
  JSR $CE2D ; → bank switch?
  LDX #$50
  TXS
  JMP $8003
@E590:
  LDX #$50
  TXS
  JMP $E0DF
  LDA $00E2
  CMP #$E0
  BCS @E5BA
  JSR $CD77 ; → bank switch?
  LDY #$07
  LDA ($34),Y
  CLC
  ADC #$1A
  CMP #$80
  BCC @E5AD
  LDA #$7F
@E5AD:
  STA ($34),Y
  LDY #$06
  LDA #$04
  STA ($34),Y
  LDA #$42
  JSR $CBB0 ; → bank switch?
@E5BA:
  PHA
  LDA $22
  LDA #$14
  STA $24
  LDA #$15
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $800C ; → bank switch?
  LDA #$01
  PHA
  LDA $22
  LDA #$1A
  STA $24
  LDA #$1B
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8024 ; → bank switch?
  LDX $0635
  LDY $0637
  JSR $CDE2 ; → bank switch?
  STA $05FE
  LDA $0600
  BEQ @E60E
  LDA #$00
  STA $0616
@E5F6:
  LDX $0616
  LDA $060B,X
  CMP #$05
  BNE @E603
  JSR $E616 ; → bank switch?
@E603:
  INC $0616
  LDA $0616
  CMP $0600
  BNE @E5F6
@E60E:
  LDA #$04
  STA $062B
  JMP $DE96
  LDA #$01
  STA $043B
  LDA #$00
  STA $043C
  LDA #$02
  STA $043D
  LDA #$00
  STA $043E
  LDA $0601,X
  BEQ @E677
  CMP #$0B
  BEQ @E677
  STA $0442
  PHA
  LDA $22
  LDA #$1C
  STA $24
  LDA #$1D
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8015 ; → bank switch?
  LDA $32
  CLC
  ADC #$04
  BCC @E651
  LDA #$FF
@E651:
  STA $32
  PHA
  LDA $22
  LDA #$1A
  STA $24
  LDA #$1B
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8012 ; → bank switch?
  PHA
  LDA $22
  LDA #$1A
  STA $24
  LDA #$1B
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8015 ; → bank switch?
@E677:
  RTS
  LDA $05FB
  EOR #$0B
  STA $05FB
  JSR $D093 ; → bank switch?
  LDA #$02
  JSR $CB0F ; → bank switch?
  LDA #$00
  BIT $0635
  BPL @E691
  ORA #$01
@E691:
  BIT $0637
  BPL @E698
  ORA #$02
@E698:
  STA $3A
  LDA $00E2
  AND #$07
  ASL A
  TAX
  LDY $E6D0,X
  LDA $E6CF,X
  TAX
  LSR $3A
  BCC @E6B0
  TXA
  EOR #$FF
  TAX
@E6B0:
  LSR $3A
  BCC @E6B8
  TYA
  EOR #$FF
  TAY
@E6B8:
  STX $0635
  STY $0637
  JSR $CDE2 ; → bank switch?
  STA $0638
  STA $05FE
  LDA #$04
  STA $062B
  JMP $DE96
  JMP $5C54
  .byte $54
  JMP ($5C5C)
  .byte $64, $74
  JMP ($7464)
  .byte $7C, $7C, $74
  STY $35AE
  ASL $AC
  .byte $37
  ASL $20
  .byte $E2
  CMP $FE8D
  ORA $60
  LDA $0441
  JSR $CD7C ; → bank switch?
  LDY #$06
  LDA ($34),Y
  STA $0635
  TAX
  LDY #$08
  LDA ($34),Y
  STA $0637
  TAY
  JSR $CDE2 ; → bank switch?
  STA $05FE
  RTS
  LDA $062A
  AND #$7F
  STA $062A
  LDA $0637
  SEC
  SBC #$50
  AND #$E0
  LSR A
  LSR A
  LSR A
  STA $3A
  LSR A
  LSR A
  ADC $3A
  STA $3A
  LDA $0635
  SEC
  SBC #$30
  AND #$E0
  LSR A
  LSR A
  LSR A
  LSR A
  LSR A
  ADC $3A
  CMP $062A
  BEQ @E73D
  ORA #$80
  STA $062A
@E73D:
  RTS
  LDA #$00
  STA $0600
  STA $05FF
  LDA $05FE
  CMP $0638
  BNE @E751
  JMP $E7CF
@E751:
  LDA #$2F
  STA $34
  LDA #$06
  STA $35
  JSR $E7D0 ; → bank switch?
  STA $062C
  PHA
  JSR $CE4A ; → bank switch?
  STX $0639
  STY $063A
  PLA
  JSR $CE4D ; → bank switch?
  STX $063B
  STY $063C
  LDA #$01
  JSR $CB0F ; → bank switch?
@E778:
  LDA $0639
  CLC
  ADC $0634
  STA $0634
  LDA $063A
  ADC $0635
  STA $0635
  TAX
  LDA $063B
  CLC
  ADC $0636
  STA $0636
  LDA $063C
  ADC $0637
  STA $0637
  TAY
  JSR $CDE2 ; → bank switch?
  CMP #$FF
  BEQ @E7BA
  CMP $05FE
  BEQ @E778
  STA $05FE
  CMP $0638
  .byte $F0, $0C  ; BEQ $E7C0
  JSR $800F ; → bank switch?
  JMP $E773
@E7BA:
  .byte $AD, $38
  `;
}

// ════════ $E7BC-$E888 (205B): 精灵坐标/方向计算 dispatch ═══════=
function buildE6FC_E7C8_spriteDispatch(): readonly number[] {
  return asm`
  ASL $8D
  INC $AD05,X
  INC $2005,X
  CMP #$CD
  STX $0635
  STY $0637
  JSR $800C ; → bank switch?
  RTS
  LDY #$06
  LDA ($34),Y
  TAX
  LDY #$08
  LDA ($34),Y
  TAY
  JSR $CDE2 ; → bank switch?
  LDY #$09
  CMP ($34),Y
  BNE @E724
  RTS
@E724:
  LDY #$09
  LDA ($34),Y
  CMP #$F0
  BNE @E72F
  LDA $05FE
@E72F:
  JSR $CDC9 ; → bank switch?
  TXA
  STA $3A
  TYA
  STA $3B
  LDA #$00
  STA $3C
  LDY #$06
  LDA ($34),Y
  SEC
  SBC $3A
  BCS @E74B
  EOR #$FF
  ADC #$01
  INC $3C
@E74B:
  STA $71
  LDY #$08
  LDA ($34),Y
  SEC
  SBC $3B
  BCS @E75E
  EOR #$FF
  ADC #$01
  INC $3C
  INC $3C
@E75E:
  STA $70
  LDA #$00
  STA $6F
  STA $74
  JSR $CD3C ; → bank switch?
  LDX #$00
@E76B:
  LDA $FACD,X
  CMP $70
  BEQ @E776
  BCS @E783
  BCC @E77F
@E776:
  LDA $FACC,X
  SBC $6F
  BEQ @E783
  BCS @E783
@E77F:
  INX
  INX
  BNE @E76B
@E783:
  TXA
  LSR A
  LSR $3C
  BCS @E78D
  EOR #$FF
  AND #$7F
@E78D:
  LSR $3C
  BCS @E793
  EOR #$FF
@E793:
  RTS
  LDY #$0A
  LDA ($34),Y
  .byte $D0, $45  ; BNE $E7DF
  LDA $05FF
  STA $43
  JSR $E7D0 ; → bank switch?
  STA $44
  LDY #$06
  LDA ($34),Y
  TAX
  LDY #$08
  LDA ($34),Y
  TAY
  JSR $CDE2 ; → bank switch?
  LDY #$09
  CMP ($34),Y
  .byte $F0, $21  ; BEQ $E7D8
  TAX
  LDA ($34),Y
  CMP #$F0
  BNE @E7C3
  CPX $05FE
  .byte $F0, $15  ; BEQ $E7D8
@E7C3:
  LDY #$07
  LDA $44
  .byte $20, $A0
  `;
}

// ════════ $E889-$E9AC (292B): tile/sprite 寻路辅助 (碰撞/边缘检测) ═══════=
function buildE7C9_E8EC_pathfinding(): readonly number[] {
  return asm`
  INX
  LDA $44
  CLC
  ADC #$40
  LDY #$05
  JSR $E8A0 ; → bank switch?
  DEC $43
  .byte $D0, $CC  ; BNE $E7A4
  LDY #$0A
  LDA #$00
  STA ($34),Y
  RTS
  RTS
  STY $46
  CLC
  ADC #$10
  LSR A
  LSR A
  LSR A
  LSR A
  LSR A
  TAX
  LDA $E8ED,X
  STA $47
  LDY $32
  LDX $33
  DEC $47
  BPL @E7FE
  LDX #$00
  LDY #$00
  BEQ @E80E
@E7FE:
  DEC $47
  BMI @E80E
  TYA
  EOR #$FF
  TAY
  TXA
  EOR #$FF
  TAX
  INY
  BNE @E80E
  INX
@E80E:
  STY $48
  STX $49
  LDY #$0A
  LDA ($34),Y
  SEC
  SBC $05FF
  BPL @E82C
  EOR #$FF
  CLC
  ADC #$01
  BEQ @E82C
  LDA $48
  LDX $49
  LDY $46
  JSR $E912 ; → bank switch?
@E82C:
  RTS
  BRK
  ORA ($01,X)
  ORA ($00,X)
  .byte $02, $02, $02
  STY $47
  LDY $32
  LDX $33
  AND #$03
  BNE @E840
  RTS
@E840:
  LSR A
  BCS @E84F
  TYA
  EOR #$FF
  TAY
  TXA
  EOR #$FF
  TAX
  INY
  BNE @E84F
  INX
@E84F:
  TYA
  LDY $47
  CLC
  ADC ($34),Y
  STA ($34),Y
  INY
  TXA
  ADC ($34),Y
  CPY #$06
  BEQ @E86D
  LDX #$50
  CMP #$50
  BCC @E879
  LDX #$AF
  CMP #$B0
  BCS @E879
  BCC @E87A
@E86D:
  LDX #$30
  CMP #$30
  BCC @E879
  LDX #$CF
  CMP #$D0
  BCC @E87A
@E879:
  TXA
@E87A:
  STA ($34),Y
  RTS
  PHA
  TXA
  PHA
@E880:
  LDA #$01
  JSR $CB0F ; → bank switch?
  LDA $0515
  BNE @E880
  LDA #$01
  STA $0515
  LDA #$00
  STA $3E
  PLA
  LSR A
  ROR $3E
  LSR A
  ROR $3E
  STA $3F
  PLA
  ASL A
  ROR $3A
  TAY
  CLC
  LDA $E9DA,Y
  STA $3C
  LDA $E9DB,Y
  STA $3D
  LDY #$00
  CLC
  LDA ($3C),Y
  ADC $3E
  STA $3E
  INY
  LDA ($3C),Y
  ADC $3F
  STA $3F
  INY
  LDA ($3C),Y
  AND #$03
  STA $40
  LDA ($3C),Y
  LSR A
  LSR A
  STA $41
  INY
  LDX #$00
  LDA $41
  STA $04A5,X
  CLC
  LDA $3E
  STA $04A6,X
  ADC #$20
  STA $3E
  LDA $3F
  STA $04A7,X
  ADC #$00
  STA $3F
  INX
  INX
  INX
  LDA $41
  STA $43
  .byte $2C, $3A
  `;
}

// ════════ $E9AD-$EA99 (237B): 移动向量/加速度计算 ═══════=
function buildE8ED_E9D9_movementMath(): readonly number[] {
  return asm`
  BRK
  BMI @E901
@E8F0:
  LDA ($3C),Y
  INY
  CMP #$FE
  BEQ @E901
  STA $04A5,X
  INX
  DEC $43
  BNE @E8F0
  BEQ @E90B
@E901:
  LDA #$00
@E903:
  STA $04A5,X
  INX
  DEC $43
  BNE @E903
@E90B:
  LDA #$00
  STA $04A5,X
  DEC $40
  .byte $D0, $B8  ; BNE $E8CC
  LDA #$80
  STA $0515
  RTS
  .byte $1C
  NOP
  AND #$EA
  .byte $34
  NOP
  AND $46EA,X
  NOP
  EOR ($EA),Y
  EOR $61EA,Y
  NOP
  ROR A
  NOP
  .byte $73
  NOP
  .byte $7C
  NOP
  .byte $87
  NOP
  STY $EA,X
  .byte $9F
  NOP
  LDY $B7EA
  NOP
  CPY $EA
  DEC $DBEA
  NOP
  INC $EA
  .byte $EF
  NOP
  SED
  NOP
  ORA ($EB,X)
  ORA $17EB
  SBC #$26
  SBC #$33
  SBC #$3E
  SBC #$4C
  SBC #$5E
  SBC #$67
  SBC #$72
  SBC #$7B
  SBC #$AC
  .byte $22
  ASL $94,X
  BRK
  STY $00,X
  BRK
  .byte $54
  PLA
  .byte $5C
  ADC #$00
  LDY $1622
  BRK
  STA $FE,X
  BRK
  NOP
  EOR $0000
  LDY $1622
  INC $714C,X
  ADC $0054,X
  LDY $1622
  INC $6E6C,X
  .byte $3F, $52
  ADC $22AC,X
  .byte $12
  BRK
  BRK
  BRK
  STA $54,X
  .byte $67, $6F, $5C
  LDY $1222
  INC $4D00,X
  ADC #$7D
  LDY $1222
  INC $6848,X
  EOR ($7D,X)
  ROR $1622
  INC $5000,X
  .byte $6F
  PHA
  ADC #$6E
  .byte $22
  ASL $FE,X
  BRK
  EOR $4246
  .byte $50, $6E  ; BVC $EA22
  .byte $22
  ASL $FE,X
  BRK
  LSR $60
  .byte $4F
  PLA
  ROR $1622
  BRK
  STA $FE,X
  BRK
  NOP
  JMP ($507D)
  ROR $1622
  BRK
  BRK
  BRK
  STY $00,X
  BRK
  .byte $50, $42  ; BVC $EA14
  LSR $7D
  ROR $1622
  BRK
  STY $FE,X
  `;
}

// ════════ $EA9A-$F168 (1743B): 精灵/移动/坐标数据表 (~1743 bytes) ═══════=
function buildE9DA_F0B0_dataTables(): readonly number[] {
  return asm`
  BRK
  .byte $5C
  ARR #$6F
  PHA
  ROR $1622
  BRK
  BRK
  BRK
  BRK
  STY $00,X
  EOR $4246
  .byte $5C
  ROR $1622
  BRK
  STY $FE,X
  BRK
  ASL $2E
  .byte $22
  ROL $226E
  ASL $00,X
  STA $00,X
  BRK
  STY $00,X
  NOP
  JMP ($5C7D)
  ROR $1622
  STA $FE,X
  NOP
  EOR $6F46
  .byte $54
  ROR $1622
  BRK
  BRK
  BRK
  BRK
  STA $00,X
  EOR $4246
  NOP
  ROR $1622
  BRK
  STY $FE,X
  .byte $03
  ASL A
  ASL $15
  .byte $02
  ROR $1622
  INC $5C00,X
  ROR $6B,X
  ADC $226E,X
  ASL $FE,X
  BRK
  ASL $0128
  .byte $03
  ROR $1622
  INC $4800,X
  PLA
  EOR ($7D,X)
  .byte $AB, $22
  NOP
  BRK
  STA $FE,X
  BRK
  NOP
  ROR $0051
  BRK
  .byte $AB, $22
  NOP
  INC $4700,X
  BVS @EAC4
  EOR ($00),Y
  .byte $AB, $22
  NOP
  BRK
  BRK
  BRK
  BRK
  BRK
  STY $0B,X
  ROL $0806
  .byte $14, $1B
  ROR $1622
  BRK
  BRK
  STY $94,X
  INC $1400,X
  .byte $1B
  BPL @EA80
  ROR $1622
  BRK
  STY $FE,X
  JSR $1F06
  .byte $04
  AND #$AB
  .byte $22
@EA80:
  .byte $17
  INC $714C,X
  ADC $1654,X
  .byte $0F
  ORA $04,X
  AND #$00
  .byte $AB, $22, $17
  STY $00,X
  STY $00,X
  BRK
  .byte $54
  PLA
  .byte $5C
  ADC #$16
  .byte $0F
  ORA $04,X
  AND #$00
  ROR $1622
  INC $7D7D,X
  ADC $7D7D,X
  TAX
  .byte $22
  ASL $00,X
  STY $FE,X
  .byte $1B
  BPL $EAD8
  EOR $AA60
  .byte $22
  ASL $FE,X
  .byte $0C, $32, $03, $22
  ROL $22AA
  ASL $00,X
  STY $FE,X
  JSR $4D07
@EAC4:
  RTS
  BRK
  LDA #$01
  JSR $CB0F ; → bank switch?
  LDA $21
  AND #$1E
  LDX $0539
  BEQ @EAD9
  LDA $21
  EOR $0539
@EAD9:
  STA $21
  JSR $EC08 ; → bank switch?
  JSR $ED85 ; → bank switch?
  PHA
  LDA $22
  LDA #$18
  STA $24
  LDA #$19
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8003 ; → bank switch?
  PHA
  LDA $22
  LDA #$18
  STA $24
  LDA #$19
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8006 ; → bank switch?
  PHA
  LDA $22
  LDA #$18
  STA $24
  LDA #$19
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8009 ; → bank switch?
  LDA $052E
  BEQ @EB45
  DEC $052E
  BNE @EB45
  LDA $052F
  CMP #$7E
  BCC @EB39
  CMP #$7F
  BEQ @EB33
  LDA $0027
  CMP #$04
  BEQ @EB45
@EB33:
  JSR $D093 ; → bank switch?
  JMP $EC05
@EB39:
  BIT $063F
  BPL @EB42
  CMP #$63
  BNE @EB45
@EB42:
  JSR $CBF1 ; → bank switch?
@EB45:
  JMP $EB86
  LDA $0516
  AND #$81
  BNE @EB50
  RTS
@EB50:
  BIT $0516
  BPL @EB74
  LDA #$01
  STA $0516
  PHA
  LDA $22
  LDA #$10
  STA $24
  LDA #$11
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8000 ; → bank switch?
  LDA #$00
  STA $0522
  STA $0539
@EB74:
  LDX $0519
  BEQ @EB7C
  JMP $ED5B
@EB7C:
  LDA #$00
  STA $0532
  STA $0534
  STA $0536
  STA $0538
  STA $0539
  LDA #$08
  BIT $0516
  BNE @EBB5
  LDA $0516
  AND #$50
  CMP #$50
  BEQ @EBCC
  BIT $0516
  BVS @EBB4
  PHA
  LDA $22
  LDA #$10
  STA $24
  LDA #$11
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8003 ; → bank switch?
@EBB4:
  RTS
@EBB5:
  EOR $0516
  STA $0516
  LDA #$00
  STA $05D2
  LDA #$00
  STA $0D
  STA $0E
  LDA #$00
  STA $0516
  RTS
@EBCC:
  LDA $0516
  AND #$8F
  STA $0516
  LDA $0523
  STA $0519
  LDA $0524
  CMP #$FF
  BEQ @EC37
  LDA #$04
  BIT $0516
  BEQ @EBF7
  EOR $0516
  STA $0516
  LDA #$00
  STA $11
  STA $12
  JSR $CC46 ; → bank switch?
@EBF7:
  LDA $0526
  BPL @EC0A
  AND #$7F
  STA $0526
  STA $0490
  LDA $0527
  STA $0491
@EC0A:
  LDA $0525
  LDX #$00
  JSR $CC02 ; → bank switch?
  JSR $CCD2 ; → bank switch?
  BRK
  JMP ($AD04)
  DEC $4805
  LDA $22
  LDA #$0B
  STA $24
  LDA #$0C
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8006 ; → bank switch?
  LDA #$00
  STA $4A
  LDA $05D1
  STA $05D2
@EC37:
  LDA $0528
  CMP #$FF
  BEQ @EC46
  STA $053C
  LDA #$80
  STA $053A
@EC46:
  LDA #$00
  STA $0D
  STA $0E
  LDA $052A
  STA $0517
  LDA $0529
  CMP #$FF
  BEQ @EC6D
  STA $05EA
  LDX #$11
  LDA #$C8
  STA $01,X
  LDA #$18
  STA $02,X
  LDA #$7F
  LDY #$FF
  JSR $CAE7 ; → bank switch?
@EC6D:
  LDA $052B
  ORA #$80
  STA $0532
  LDA $052C
  ORA #$80
  STA $0536
  LDA $052D
  ORA #$80
  STA $0534
  LDA $0530
  STA $052E
  LDA $0531
  STA $052F
  LDA #$00
  STA $8E
  LDA #$01
  STA $0469
  RTS
  DEX
  STX $0519
  CPX #$28
  BCS @ECC4
  LDA $0516
  AND #$20
  BNE @ECC4
  LDA $0516
  ORA #$20
  STA $0516
  PHA
  LDA $22
  LDA #$10
  STA $24
  LDA #$11
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8003 ; → bank switch?
@ECC4:
  RTS
  LDA $05D2
  BNE @ECCB
  RTS
@ECCB:
  BPL @ED35
  AND #$7F
  ORA #$01
  STA $05D2
  LDA $05DB
  STA $05D3
  LDA $05DC
  STA $05D4
  LDA $05DD
  STA $05D5
  LDX $05DE
  LDY $05DF
  STX $05D6
  STY $05D7
  LDA $05E0
  STA $05D8
  LDA $05E1
  STA $05D9
  LDA $05E2
  STA $05DA
  LDA $05D2
  AND #$02
  BEQ @ED35
  BIT $05D2
  BVC @ED24
  LDX #$0D
  LDA #$A0
  STA $01,X
  LDA #$0B
  STA $02,X
  LDA #$7F
  LDY #$FF
  JSR $CAE7 ; → bank switch?
  JMP $EDF5
@ED24:
  LDX #$0D
  LDA #$A0
  STA $01,X
  LDA #$0B
  STA $02,X
  LDA #$80
  LDY #$02
  JSR $CAE7 ; → bank switch?
@ED35:
  BIT $05D2
  BVC @ED71
  CLC
  LDA $05D6
  ADC $05D3
  STA $05D3
  LDX #$00
  LDA $05D7
  ADC $4B
  STA $4B
  CMP #$F0
  BCC @ED60
  INX
  LDA #$10
  BIT $05D7
  BPL @ED5D
  LDA #$F0
  DEX
  DEX
@ED5D:
  CLC
  ADC $4B
@ED60:
  STA $4B
  STA $05D4
  CLC
  TXA
  ADC $05D5
  STA $05D5
  JSR $EE6D ; → bank switch?
  RTS
@ED71:
  LDA $20
  AND #$FE
  STA $20
  CLC
  LDA $05D6
  ADC $05D3
  STA $05D3
  LDA $05D7
  ADC $05D4
  STA $05D4
  STA $4A
  TAX
  LDA #$00
  BIT $05D7
  BPL @ED96
  LDA #$FF
@ED96:
  PHP
  TAX
  ADC $05D5
  STA $05D5
  AND #$01
  ORA $20
  STA $20
  TXA
  PLP
  ADC #$00
  TAX
  JSR $EE6D ; → bank switch?
  RTS
  LDA $05D2
  AND #$02
  BEQ @EDDE
  LDX $05D4
  LDY $05D5
  BPL @EDC8
  TXA
  EOR #$FF
  TAX
  TYA
  EOR #$FF
  TAY
  INX
  BNE @EDC8
  INY
@EDC8:
  TXA
  SEC
  SBC $05D9
  TYA
  SBC $05DA
  BCC @EDDE
  LDA #$00
  STA $05D2
  LDA #$00
  STA $0D
  STA $0E
@EDDE:
  RTS
  PHA
  LDA $22
  LDA #$14
  STA $24
  LDA #$15
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8000 ; → bank switch?
  LDA #$00
  STA $3A
  STA $48
  LDX $053D
  BEQ @EE1A
  LDA #$40
  SEC
  SBC $053F
  CMP $053E
  LDA $053E
  BCS @EE0C
  LDA #$00
@EE0C:
  TAX
  CLC
  ADC #$08
  STA $053E
  TXA
  CLC
  ADC $053F
  ASL A
  ASL A
@EE1A:
  STA $3B
@EE1C:
  LDA $3A
  LSR A
  TAX
  LDA $0543,X
  BCS @EE29
  LSR A
  LSR A
  LSR A
  LSR A
@EE29:
  AND #$0F
  ASL A
  TAX
  LDA $EF73,X
  STA $3C
  LDA $EF74,X
  STA $3D
  LDY #$00
  LDA ($3C),Y
  BPL @EE78
  BIT $0615
  BVS @EE54
  PHA
  LDA $22
  LDA #$14
  STA $24
  LDA #$15
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8006 ; → bank switch?
@EE54:
  PHA
  LDA $22
  LDA #$14
  STA $24
  LDA #$15
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8003 ; → bank switch?
  PHA
  LDA $22
  LDA #$16
  STA $24
  LDA #$17
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8000 ; → bank switch?
@EE78:
  INC $3A
  LDA $3A
  CMP #$06
  BNE @EE1C
  BIT $062D
  BPL @EE97
  PHA
  LDA $22
  LDA #$14
  STA $24
  LDA #$15
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $8009 ; → bank switch?
@EE97:
  LDA #$40
  SEC
  SBC $48
  STA $053F
  BCC @EEB2
  BEQ @EEB2
  TAY
  LDX $3B
  LDA #$F8
@EEA8:
  STA $0200,X
  INX
  INX
  INX
  INX
  DEY
  BNE @EEA8
@EEB2:
  RTS
  .byte $47
  ORA $5C
  ORA $71
  ORA $86
  ORA $9B
  ORA $B0
  ORA $A8
  LDA $24
  PHA
  LDA $25
  PHA
  TYA
  PHA
  LDA $22
  LDA #$18
  STA $24
  LDA #$19
  STA $25
  JSR $CE2D ; → bank switch?
  PLA
  JSR $800C ; → bank switch?
  PLA
  STA $25
  PLA
  STA $24
  JMP $CE2D
  LDA $0621
  CMP #$04
  BCC @EEEA
  RTS
@EEEA:
  LDA $0600
  BNE @EEF2
  JMP $EFF6
@EEF2:
  LDA #$00
@EEF4:
  PHA
@EEF5:
  LDA #$01
  JSR $CB0F ; → bank switch?
  LDA $0515
  BNE @EEF5
  LDA #$01
  STA $0515
  PLA
  PHA
  LDX $0621
  CPX #$03
  BNE @EF0F
  LDA #$05
@EF0F:
  ASL A
  TAX
  LDA $F206,X
  STA $3A
  LDA $F207,X
  STA $3B
  LDA #$00
  STA $3C
  LDA #$21
  STA $3D
  LDX #$00
  JSR $F114 ; → bank switch?
  LDA #$04
  JSR $CB0F ; → bank switch?
  PLA
  CLC
  ADC #$01
  CMP $0600
  BNE @EEF4
  LDX $0621
  LDA $F00F,X
  STA $063D
  TXA
  BNE @EF53
  LDA $0600
  BNE @EF53
  LDA #$02
  STA $063D
  JMP $F013
  BRK
  BRK
  ORA ($00,X)
@EF53:
  LDA #$00
  PHA
@EF56:
  LDA #$01
  JSR $CB0F ; → bank switch?
  LDA $0515
  BNE @EF56
  LDA #$01
  STA $0515
  LDA $063D
  ASL A
  ASL A
  TAY
  LDA $F15A,Y
  STA $3C
  LDA $F15B,Y
  STA $3D
  PLA
  PHA
  TAX
  CLC
  LDA $F15C,Y
  ADC $F10E,X
  STA $04A6
  LDA $063D
  CMP #$03
  BEQ @EFA1
  LDA $05CE
  AND #$20
  ORA $04A6
  STA $04A6
  LDA $05CE
  LSR A
  LSR A
  LSR A
  LSR A
  ORA $F15D,Y
  JMP $F064
@EFA1:
  LDA $F15D,Y
  STA $04A7
  LDA #$01
  STA $04A5
  LDA $063D
  ASL A
  STA $3B
  ASL A
  ADC $3B
  STA $3B
  TXA
  ADC $3B
  TAX
  LDA $F16A,X
  STA $04A8
  PLA
  PHA
  ASL A
  TAX
  LDA $F182,X
  STA $3A
  LDA $F183,X
  STA $3B
  LDX #$04
  JSR $F114 ; → bank switch?
  PLA
  CLC
  ADC #$01
  CMP #$06
  BEQ @EFDF
  JMP $F015
@EFDF:
  LDA $063D
  CMP #$03
  BEQ @E04D
@EFE6:
  LDA #$01
  JSR $CB0F ; → bank switch?
  LDA $0515
  BNE @EFE6
  LDA #$01
  STA $0515
  LDA #$01
  STA $04A5
  LDA #$A2
  STA $04A8
  LDA #$00
  STA $3B
  STA $04A9
  LDA $063D
  ASL A
  ASL A
  TAX
  LDA $0637
  SEC
  SBC #$50
  AND #$F0
  ASL A
  STA $3A
  ROL $3B
  LDA $0635
  SEC
  SBC #$30
  LSR A
  LSR A
  LSR A
  LSR A
  CLC
  ADC $3A
  STA $3A
  BCC @E02C
  INC $3B
@E02C:
  CLC
  ADC $F15A,X
  STA $04A6
  LDA $F15B,X
  ADC $3B
  STA $04A7
  LDA $05CE
  LSR A
  LSR A
  LSR A
  LSR A
  ORA $04A7
  STA $04A7
  LDA #$80
  STA $0515
@E04D:
  RTS
  BRK
  ORA ($02,X)
  PHP
  ORA #$0A
  LDY #$00
@E056:
  LDA ($3A),Y
  STA $04A5,X
  BEQ @E094
  STA $3E
  INY
  LDA ($3A),Y
  CLC
  ADC $3C
  STA $04A6,X
  PHP
  INY
  LDA $3D
  CMP #$22
  BCC @E074
  LDA #$00
  BEQ @E07B
@E074:
  LDA $05CE
  LSR A
  LSR A
  LSR A
  LSR A
@E07B:
  ORA ($3A),Y
  PLP
  ADC $3D
  STA $04A7,X
  INY
  INX
  INX
  INX
@E087:
  LDA ($3A),Y
  STA $04A5,X
  INY
  INX
  DEC $3E
  BNE @E087
  BEQ @E056
@E094:
  LDA #$80
  STA $0515
  RTS
  .byte $42
  JSR $23C0
  .byte $42
  JSR $23C0
  .byte $42
  JSR $23C0
  LDY $22,X
  .byte $ED
  `;
}

// ════════ $F169-$F6B7 (1359B): OAM/显示/场景数据 ═══════=
function buildF0B1_F5FF_oamDisplay(): readonly number[] {
  return asm`
  .byte $23
  NOP
  ASL A
  ASL A
  .byte $03
  BRK
  BRK
  .byte $3F, $0F, $0F, $03
  BRK
  BRK
  ROL A
  ASL A
  ASL A
  .byte $22
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  STX $99F1
  SBC ($A8),Y
  SBC ($B7),Y
  SBC ($CC),Y
  SBC ($E9),Y
  SBC ($02),Y
  BRK
  BRK
  TYA
  LDY $2002
  BRK
  TYA
  STA $0400,Y
  .byte $02
  BRK
  LDY $99AC
  LDY $2204
  BRK
  LDY #$A0
  .byte $AF
  LDY #$00
  .byte $04
  ASL $00
  LDY $ACAC
  STA $2604,Y
  BRK
  LDY #$A0
  TYA
  STA $0200,Y
  RTI
  BRK
  LDA ($AF,X)
  .byte $02
  RTS
  BRK
  .byte $A3, $AF, $02, $80
  BRK
  TXS
  .byte $9B, $02
  LDY #$00
  TXS
  LDA $0400
  .byte $42
  BRK
  LDY #$A0
  LDY $A5
  .byte $04, $62
  BRK
  LDY #$A0
  LDX $A7
  .byte $04, $82
  BRK
  LDY #$A0
  .byte $AF
  LDY #$04
  LDX #$00
  LDA $9BAD
  LDA $0400
  LSR $00
  LDY #$A0
  LDX $04A1
  ROR $00
  LDY #$A0
  LDX $04A3
  STX $00
  LDY #$A0
  TXS
  .byte $9B, $04
  LDX $00
  LDA $ADAD
  .byte $9B
  BRK
  .byte $12, $F2
  ROL $51F2
  .byte $F2, $77, $F2
  LDA $EDF2
  .byte $F2, $04
  LSR $9400
  STA $C0,X
  CMP ($05,X)
  ROR $9600
  .byte $97, $80, $C2
  CPX #$03
  .byte $8F
  BRK
  STA $C880,X
  .byte $03, $AF
  BRK
  .byte $9F
  DEX
  .byte $E2
  BRK
  ORA $34
  BRK
  .byte $C3
  DEC $C4
  CMP $C7
  .byte $04, $53
  BRK
  LDA $80C9,X
  CPY $7304
  BRK
  .byte $BF
  AXS #$80
  DEC $9403
  BRK
  SBC ($BE,X)
  CPX $03
  LDY $00,X
@E195:
  .byte $E3
  INC $E7
  BRK
  .byte $03
  ROL A
  BRK
  TAY
  LDA #$9C
  .byte $04
  EOR #$00
  TAX
  .byte $80, $AB, $9E
  ORA $69
  BRK
  BCS $E12B
  LDA ($B4),Y
  LDA $06,X
  DEY
  BRK
  .byte $B2, $B3, $80
  LDY $B7B6,X
  .byte $04
  TAY
  BRK
  CLV
  TSX
  LDA $00BB,Y
  ORA $1A
  BRK
  BNE @E195
  .byte $D4
  CMP $FB,X
  .byte $07
  AND $CD00,Y
  .byte $D2, $D3, $80, $80
  DEC $D7,X
  ASL $59
  BRK
  .byte $CF
  CLD
  .byte $80, $80, $80
  CMP $7907,Y
  BRK
  SBC $DA
  .byte $FC
  SBC $8080,X
  .byte $DC
  ORA $9B
  BRK
  .byte $DB
  CMP $8080,X
  .byte $80
  ORA $BB
  BRK
  .byte $9F, $80
  TSX
  DEC $00DF,X
  .byte $04
  ORA ($00,X)
  STY $85
  BCC $E18D
  ORA $20
  BRK
  .byte $82, $80, $80, $80, $93
  ASL $40
  BRK
  .byte $80, $80, $80, $80, $80
  DEY
  .byte $02, $47
  BRK
  .byte $83
  STX $09
  RTS
  BRK
  .byte $80, $80, $80, $80, $80, $80
  TXA
  .byte $89
  STY $8008
  BRK
  .byte $80, $80, $80, $80, $80
  STA $8B80
  PHP
  LDY #$00
  .byte $80, $80, $80, $80
  STX $878F
  .byte $92
  BRK
  .byte $02, $4F
  BRK
  .byte $D4
  CMP $04,X
  ADC $D200
  .byte $D3
  BRK
  .byte $D7
  ORA ($72,X)
  BRK
  DEC $06,X
  STA $D800
  BRK
  BRK
  CMP $DCD9,X
  ORA $AD
  BRK
  NOP
  .byte $DB
  DEC $D1DF,X
  BRK
  LDY #$29
  STY $30
  LDY #$F3
  STY $31
  ASL A
  BCC @E264
  INC $31
@E264:
  TAY
  LDA ($30),Y
  PHA
  INY
  LDA ($30),Y
  STA $31
  PLA
  STA $30
  RTS
  SBC #$05
  ORA #$F5
  ORA $12F5
  SBC $15,X
  SBC $1A,X
  SBC $1F,X
  SBC $24,X
  SBC $29,X
  SBC $2E,X
  SBC $34,X
  SBC $37,X
  SBC $3C,X
  SBC $40,X
  SBC $44,X
  SBC $49,X
  SBC $4E,X
  SBC $53,X
  SBC $57,X
  SBC $5B,X
  SBC $5E,X
  SBC $63,X
  SBC $67,X
  SBC $6B,X
  SBC $6F,X
  SBC $73,X
  SBC $76,X
  SBC $7B,X
  SBC $7F,X
  SBC $83,X
  SBC $88,X
  SBC $8D,X
  SBC $91,X
  SBC $95,X
  SBC $9B,X
  SBC $A1,X
  SBC $A8,X
  SBC $AD,X
  SBC $B3,X
  SBC $B7,X
  SBC $BD,X
  SBC $C0,X
  SBC $C4,X
  SBC $CA,X
  SBC $CF,X
  SBC $D6,X
  SBC $DD,X
  SBC $E1,X
  SBC $E4,X
  SBC $E8,X
  SBC $EC,X
  SBC $F0,X
  SBC $F5,X
  SBC $F9,X
  SBC $FE,X
  SBC $03,X
  INC $08,X
  INC $0C,X
  INC $12,X
  INC $18,X
  INC $1F,X
  INC $25,X
  INC $2B,X
  INC $2F,X
  INC $34,X
  INC $3A,X
  INC $3F,X
  INC $43,X
  INC $46,X
  INC $4A,X
  INC $4E,X
  INC $52,X
  INC $56,X
  INC $5A,X
  INC $5F,X
  INC $63,X
  INC $68,X
  INC $6E,X
  INC $74,X
  INC $7B,X
  INC $7E,X
  INC $81,X
  INC $86,X
  INC $8C,X
  INC $91,X
  INC $96,X
  INC $9B,X
  INC $9F,X
  INC $A5,X
  INC $AA,X
  INC $B1,X
  INC $B7,X
  INC $BE,X
  INC $C3,X
  INC $C7,X
  INC $CC,X
  INC $D3,X
  INC $D8,X
  INC $DE,X
  INC $E3,X
  INC $EA,X
  INC $EF,X
  INC $F3,X
  INC $F8,X
  INC $FE,X
  INC $04,X
  .byte $F7
  ASL A
  .byte $F7, $0F, $F7, $13, $F7
  CLC
  .byte $F7, $1B, $F7, $22, $F7
  PLP
  .byte $F7
  AND $32F7
  .byte $F7
  SEC
  .byte $F7, $3F, $F7
  EOR $F7
  ALR #$F7
  EOR ($F7),Y
  LSR $F7,X
  NOP
  .byte $F7
  ADC ($F7,X)
  ADC #$F7
  ROR $75F7
  .byte $F7
  NOP
  .byte $F7, $80, $F7
  STY $F7
  DEY
  .byte $F7
  STA $91F7
  .byte $F7
  STA $F7,X
  TXS
  .byte $F7, $9E, $F7
  LDY $F7
  .byte $AB, $F7, $AF, $F7, $B3, $F7
  LDA $BDF7,Y
  .byte $F7
  CMP $F7
  CMP $D2F7
  .byte $F7, $DB, $F7
  SBC ($F7,X)
  INX
  .byte $F7
  SBC $F2F7
  .byte $F7, $F7, $F7, $FC, $F7
  ORA ($F8,X)
  PHP
  SED
  ASL $13F8
  SED
  CLC
  SED
  JSR $26F8
  SED
@E3AD:
  .byte $2F
  SED
  .byte $3B
  SED
  .byte $44
  SED
  BVC @E3AD
  EOR $64F8,Y
  SED
  JMP ($79F8)
  SED
  .byte $82
  SED
  .byte $8B
  SED
  .byte $97
  SED
  LDX #$F8
  LDX $BCF8
  SED
  CMP $F8
  AXS #$F8
  DEC $F8,X
  DEC $E8F8,X
  SED
  .byte $F2
  SED
  NOP
  SED
  .byte $03
  SBC $F90D,Y
  ASL $F9,X
  JSR $2AF9
  SBC $F932,Y
  NOP
  SBC $F944,Y
  EOR $57F9
  SBC $F95E,Y
  .byte $63
  SBC $F96A,Y
  .byte $74
  SBC $F97D,Y
  STX $F9
  .byte $8F
  SBC $F999,Y
  .byte $9C
  SBC $F9A3,Y
  TAX
  SBC $F9B3,Y
  LDY $C5F9,X
  SBC $F9CD,Y
  DEC $F9,X
  CPX #$F9
  SBC $F9
  INC $F8F9
  SBC $FA00,Y
  ORA $FA
  .byte $0F
  NOP
  CLC
  NOP
  JSR $29FA
  NOP
  ROL $34FA
  NOP
  .byte $3F
  NOP
  .byte $44
  NOP
  PHA
  NOP
  EOR $52FA
  NOP
  .byte $57
  NOP
  .byte $5C
  NOP
  ADC ($FA,X)
  PLA
  NOP
  ADC ($FA),Y
  ADC $83FA,Y
  NOP
  .byte $89
  NOP
  BCC $E439
  STX $FA,Y
  .byte $9C
  NOP
@E443:
  LDY $FA
  LDA #$FA
  BCS @E443
  .byte $B7
  NOP
  CPY #$FA
  CPY $FA
  INY
  NOP
  .byte $12, $AF
  ANC #$FC
  ROR A
  EOR $7D,X
  .byte $54, $FC
  PLA
  .byte $5F, $FC, $5F
  PLA
  ADC $FC56,X
  EOR ($5F,X)
  .byte $67, $43, $FC, $C2, $54
  ADC $FC69,X
  .byte $C3
@E46D:
  EOR ($4D),Y
  BVC @E46D
  BVC @E4CD
  .byte $5F
  BVC $E472
  .byte $C3
  CPY $6E
  .byte $54
  ROR $BAFC
  .byte $43, $FC, $CF, $67, $54
  ROR $03FC
  .byte $27, $B2, $FC, $07, $0C
  TAX
  .byte $FC
  ORA $06,X
  BIT $1F
  .byte $FC, $23
  PLP
  ANC #$07
  .byte $FC
  BPL @E49E
  ORA $FCA1
  JSR $070B
@E49E:
  .byte $FC, $02
  LDA $2C
  .byte $FC
  BPL $E4AC
  .byte $FC, $02, $0C
  LDA $07
  .byte $FC
@E4AB:
  ASL $2F,X
  BPL @E4AB
  .byte $07
  ORA $FCA1
  .byte $1F
  ANC #$05
  .byte $FC
  ASL $A7
  ORA $FC
  ANC #$19
  .byte $FC, $1B
  AND ($03),Y
  LDY #$FC
  .byte $0F, $03
  TAX
  .byte $FC
  LDX $14
  .byte $03, $FC, $1F, $12
@E4CD:
  BIT $1F
  .byte $FC, $0F
  PLP
  .byte $1F
  ORA ($FC),Y
  ANC #$2C
  TAX
  .byte $FC
  JSR $A10D ; → bank switch?
  .byte $FC
  BIT $AF06
  BIT $0C
  .byte $FC
  BIT $0C06
  .byte $1F
  LDY $4BFC
  .byte $54
  ADC #$4D
  .byte $53
  LDA $FC,X
  PLA
  DEC $68
  EOR $FC
  LDX $4C3F,Y
  ADC #$C3
  .byte $FC, $62
  EOR $6E
  .byte $FC, $54
  LSR $7D,X
  LSR $72,X
  .byte $FC
  CLI
  .byte $42, $FC
  LDA $6BB4,Y
  .byte $FC
  CMP ($74,X)
  .byte $43
  LSR $FC43
  LSR $69
  ARR #$4D
  .byte $FC
  ALR #$6E
  BVC @E57A
  PLA
  EOR ($FC,X)
  TSX
  ADC $54,X
  ADC $4568,X
  .byte $FC
  LDX $14
  .byte $03, $FC
  ANC #$19
  .byte $FC, $1F
  ANC #$05
  .byte $FC
  ASL $A7
  ORA $FC
  .byte $0F, $03
  TAX
  .byte $FC
  ORA $06,X
  ASL $0C,X
  .byte $FC
  JSR $A10D ; → bank switch?
  .byte $FC, $1F, $12
  BIT $1F
  .byte $FC, $1B
  AND ($03),Y
  LDY #$FC
  .byte $0F
  PLP
  .byte $1F
  ORA ($FC),Y
  ANC #$2C
  TAX
  .byte $FC
  BIT $0C06
  .byte $1F
  LDY $67FC
  ROR $45CE
  ROR $C4FC
  PHA
  .byte $54
  PLA
  ADC $FC59,X
  LDX $4C3F,Y
  ADC #$C3
  .byte $FC
  LSR $D0
  ARR #$5F
  ROR $46FC
  ADC #$52
  .byte $FC, $62, $6F, $52
@E57A:
  .byte $73, $FC
  BIT $AF06
  BIT $0C
  .byte $FC, $1B
  AND ($03),Y
  LDY #$FC
@E587:
  ASL $2F,X
  BPL @E587
  ANC #$19
  .byte $FC
  JSR $070B
  .byte $FC
  JSR $A10D ; → bank switch?
  .byte $FC, $1F
  ANC #$05
  .byte $FC
  ASL $A7
  ORA $FC
  LDX $14
  .byte $03, $FC, $02, $0C
  LDA $07
  .byte $FC, $0F, $03
  TAX
  .byte $FC, $1F, $12
  BIT $1F
  .byte $FC
  BIT $0C06
  .byte $1F
  LDY $68FC
  .byte $3F
  NOP
  ROR $FC58
  PLA
  .byte $3F, $C3
  ROR $6E48
  .byte $FC
  JMP $FC70
  .byte $47
  ADC ($FC,X)
  .byte $5F, $6F
  NOP
  ADC $BAFC,X
  .byte $70, $42  ; BVS $F613
  .byte $6F
  EOR ($FC),Y
  ARR #$68
  .byte $5F
  ADC $6BFC,X
  CMP $4F
  ROR $C6FC
  .byte $67, $44, $5C, $FC, $67
  JMP $FC6E
  EOR $D1,X
  ROR A
  EOR $6E
  .byte $FC
  DEC $7D44
  ADC #$FC
  .byte $44
  EOR $7DCD
  LSR $70,X
  .byte $FC, $67
  ROR $45CE
  ROR $5DFC
  `;
}

// ════════ $F6B8-$FB87 (1232B): 文本/字符串表 (比赛中文字/名册) ═══════=
function buildF600_FAxx_textTables(): readonly number[] {
  return asm`
    .byte $69, $55, $6E, $C1, $4D, $FC, $42, $4D, $67, $4D, $FC, $68, $C5, $50, $FC, $CD
    .byte $4D, $46, $69, $FC, $4B, $54, $69, $4D, $53, $B5, $FC, $C1, $74, $41, $4D, $FC
    .byte $C3, $C4, $6E, $54, $6E, $FC, $B4, $69, $C3, $6E, $FC, $4C, $71, $55, $42, $BE
    .byte $7D, $FC, $5F, $7D, $B4, $4D, $FC, $46, $69, $52, $FC, $62, $6F, $52, $73, $FC
    .byte $4C, $75, $4D, $50, $7D, $FC, $46, $D0, $6B, $5F, $6E, $FC, $60, $71, $7D, $67
    .byte $7D, $FC, $46, $69, $6B, $4D, $FC, $B9, $B4, $6B, $FC, $68, $C6, $68, $45, $FC
    .byte $58, $42, $FC, $4B, $6E, $50, $5F, $68, $41, $FC, $54, $56, $7D, $56, $72, $FC
    .byte $C2, $54, $7D, $69, $FC, $41, $5F, $67, $43, $FC, $C1, $74, $43, $4E, $43, $FC
    .byte $BA, $75, $54, $7D, $68, $45, $FC, $B7, $69, $53, $74, $4D, $FC, $4A, $42, $6E
    .byte $C5, $67, $FC, $4B, $6E, $CD, $43, $6B, $FC, $15, $2E, $06, $12, $FC, $16, $1E
    .byte $2E, $FC, $5C, $69, $60, $58, $6E, $4E, $FC, $4A, $68, $6E, $51, $70, $6E, $4D
    .byte $FC, $B6, $6A, $60, $45, $FC, $CD, $69, $62, $42, $67, $4D, $FC, $4B, $6E, $54
    .byte $4D, $FC, $5C, $67, $62, $6E, $B8, $FC, $08, $16, $20, $FC, $01, $07, $10, $FC
    .byte $10, $12, $15, $20, $FC, $21, $0B, $0C, $FC, $1C, $27, $19, $FC, $14, $03, $1E
    .byte $03, $FC, $6B, $7D, $5F, $FC, $43, $69, $B6, $41, $42, $FC, $5A, $6E, $C5, $69
    .byte $B4, $7D, $FC, $16, $1E, $2E, $FC, $4C, $68, $41, $FC, $11, $31, $03, $A4, $08
    .byte $FC, $42, $67, $6E, $FC, $07, $10, $11, $32, $03, $0E, $2E, $FC, $4B, $43, $BA
    .byte $41, $67, $C4, $41, $FC, $06, $2E, $0A, $08, $FC, $C3, $4D, $4A, $3F, $BE, $3F
    .byte $B4, $5F, $FC, $D1, $7D, $67, $6E, $C2, $FC, $42, $6E, $B6, $67, $6E, $C2, $FC
    .byte $4F, $C4, $44, $54, $FC, $5C, $67, $6E, $4D, $FC, $62, $47, $4C, $4A, $FC, $42
    .byte $50, $68, $41, $FC, $45, $67, $6E, $BE, $FC, $41, $69, $BC, $6E, $51, $6E, $FC
    .byte $56, $4C, $C2, $42, $52, $FC, $C5, $67, $BA, $69, $FC, $4C, $71, $7D, $54, $FC
    .byte $C7, $6A, $7D, $4C, $71, $7D, $54, $FC, $5D, $C1, $74, $6E, $B6, $FC, $C2, $67
    .byte $42, $C5, $4C, $71, $7D, $54, $FC, $C2, $67, $42, $C5, $45, $7D, $C3, $7D, $5D
    .byte $6F, $C2, $FC, $1A, $24, $B1, $0B, $4C, $71, $7D, $54, $FC, $1A, $24, $B1, $0B
    .byte $C7, $6A, $7D, $4C, $71, $7D, $54, $FC, $46, $60, $4F, $68, $4C, $71, $7D, $54
    .byte $FC, $4D, $46, $42, $67, $C5, $5A, $68, $49, $7D, $6E, $FC, $52, $42, $6E, $4C
    .byte $71, $7D, $54, $FC, $4D, $46, $42, $67, $C5, $52, $42, $6E, $4C, $71, $7D, $54
    .byte $FC, $42, $7D, $B6, $69, $4C, $72, $6F, $54, $FC, $50, $42, $B4, $7D, $4C, $72
    .byte $6F, $54, $FC, $58, $45, $3F, $50, $42, $B4, $7D, $4C, $72, $6F, $54, $FC, $45
    .byte $7D, $C3, $7D, $5D, $6F, $C2, $47, $6F, $48, $FC, $5A, $42, $CD, $7D, $45, $7D
    .byte $C3, $7D, $5D, $6F, $C2, $FC, $BA, $70, $6E, $CE, $6E, $B6, $C7, $6A, $7D, $4C
    .byte $71, $7D, $54, $FC, $C2, $67, $42, $C5, $50, $42, $B4, $7D, $FC, $4B, $42, $48
    .byte $6B, $6E, $FC, $0B, $19, $14, $19, $4A, $6E, $C4, $CF, $6A, $42, $FC, $C3, $55
    .byte $55, $4C, $71, $7D, $54, $FC, $C5, $7D, $4D, $50, $7D, $4C, $71, $7D, $54, $FC
    .byte $60, $67, $7D, $BA, $71, $4C, $71, $7D, $54, $FC, $5F, $6F, $5A, $4C, $71, $7D
    .byte $54, $FC, $4B, $42, $C2, $6C, $42, $6E, $BE, $7D, $FC, $4D, $67, $42, $BE, $7D
    .byte $4C, $71, $7D, $54, $FC, $47, $70, $59, $6E, $4C, $71, $7D, $54, $FC, $5C, $73
    .byte $42, $64, $7D, $4C, $72, $6F, $54, $FC, $BE, $42, $55, $5F, $42, $54, $5D, $6F
    .byte $C2, $FC, $47, $70, $59, $6E, $5D, $6F, $C2, $FC, $6B, $49, $6F, $54, $5D, $6F
    .byte $C2, $FC, $0C, $32, $03, $28, $31, $03, $07, $30, $08, $FC, $A8, $2E, $13, $2E
    .byte $4C, $71, $7D, $54, $FC, $4D, $67, $42, $BE, $7D, $47, $70, $59, $6E, $FC, $BE
    .byte $C5, $69, $42, $7D, $69, $FC, $C2, $68, $C5, $69, $FC, $5B, $7D, $69, $68, $5C
    .byte $54, $FC, $A4, $03, $02, $2E, $15, $C2, $68, $C5, $69, $FC, $07, $04, $29, $5C
    .byte $75, $42, $6E, $54, $FC, $B1, $2E, $0C, $2E, $C2, $68, $C5, $69, $FC, $0A, $03
    .byte $0F, $08, $C2, $68, $C5, $69, $FC, $1A, $28, $18, $A7, $20, $C2, $68, $C5, $69
    .byte $FC, $CD, $4D, $FC, $C2, $67, $42, $C5, $CD, $4D, $FC, $46, $60, $4F, $68, $CD
    .byte $4D, $FC, $54, $6F, $CF, $4D, $CE, $6E, $CD, $4D, $FC, $6C, $6E, $52, $7D, $68
    .byte $50, $7D, $6E, $FC, $B8, $7D, $69, $C1, $6E, $4A, $6E, $C4, $FC, $14, $03, $1E
    .byte $03, $4A, $6E, $C4, $FC, $BA, $75, $60, $56, $41, $50, $6F, $48, $FC, $44, $6F
    .byte $5C, $75, $69, $0A, $03, $A3, $07, $FC, $C5, $6B, $6F, $48, $FC, $A0, $2E, $22
    .byte $2E, $C5, $6B, $6F, $48, $FC, $4D, $46, $42, $67, $C5, $C5, $6B, $6F, $48, $FC
    .byte $CD, $6C, $7D, $C5, $6B, $6F, $48, $FC, $50, $6F, $48, $69, $FC, $4D, $46, $42
    .byte $67, $C5, $50, $6F, $48, $69, $FC, $46, $60, $4F, $68, $50, $6F, $48, $69, $FC
    .byte $CD, $6C, $7D, $50, $6F, $48, $69, $FC, $50, $42, $B4, $7D, $50, $6F, $48, $69
    .byte $FC, $50, $6F, $48, $69, $FC, $CD, $4D, $46, $6F, $54, $FC, $4D, $46, $42, $67
    .byte $C5, $CD, $4D, $46, $6F, $54, $FC, $54, $67, $6F, $CF, $FC, $4D, $69, $7D, $FC
    .byte $48, $68, $41, $7D, $FC, $48, $68, $41, $7D, $FC, $0E, $28, $01, $02, $FC, $0E
    .byte $28, $01, $02, $FC, $5C, $76, $6B, $7D, $FC, $47, $70, $6F, $51, $6E, $B6, $FC
    .byte $6B, $7D, $68, $6E, $B6, $4E, $7D, $C5, $FC, $B1, $2E, $0C, $2E, $4E, $7D, $C5
    .byte $FC, $AA, $02, $06, $02, $13, $2E, $4E, $7D, $C5, $FC, $CD, $6E, $51, $6E, $B6
    .byte $FC, $0B, $2E, $06, $08, $14, $B0, $FC, $0D, $29, $AE, $02, $00, $FC, $0D, $AF
    .byte $24, $08, $00, $FC, $07, $32, $03, $2A, $12, $15, $00, $FC, $03, $1F, $02, $00
    .byte $FC, $07, $32, $03, $2A, $12, $15, $FC, $4E, $6E, $50, $68, $6E, $B6, $FC, $D0
    .byte $55, $69, $53, $74, $47, $6F, $48, $FC, $C7, $7D, $69, $FC, $B8, $7D, $69, $FC
    .byte $50, $42, $79, $FC, $06, $00, $0D, $00, $13, $00, $19, $00, $20, $00, $26, $00
    .byte $2C, $00, $33, $00, $39, $00, $40, $00, $47, $00, $4E, $00, $55, $00, $5C, $00
    .byte $63, $00, $6A, $00, $71, $00, $79, $00, $81, $00, $89, $00, $91, $00, $99, $00
    .byte $A2, $00, $AB, $00, $B4, $00, $BE, $00, $C8, $00, $D2, $00, $DD, $00, $E8, $00
    .byte $F4, $00, $00, $01, $0D, $01, $1A, $01, $29, $01, $38, $01, $48, $01, $59, $01
    .byte $6B, $01, $7F, $01, $94, $01, $AB, $01, $C4, $01, $DF, $01, $FD, $01, $1D, $02
    .byte $42, $02, $6A, $02, $98, $02, $DB, $02, $07, $03, $4C, $03, $9D, $03, $FE, $03
    .byte $74, $04, $07, $05, $C3, $05, $BE, $06, $1B, $08, $27, $0A, $8F, $0D, $5B, $20
    .byte $BC, $40, $FF, $FF, $00, $00, $00, $00, $06, $00, $0C, $00, $12, $00, $19, $00
    .byte $1F, $00, $25, $00, $2B, $00, $31, $00, $38, $00, $3E, $00, $44, $00, $4A, $00
    .byte $50, $00, $56, $00, $5C, $00, $61, $00, $67, $00, $6D, $00, $73, $00, $78, $00
    .byte $7E, $00, $83, $00, $88, $00, $8E, $00, $93, $00, $98, $00, $9D, $00, $A2, $00
  `;
}
function buildFAxx_FFEF_padding(): readonly number[] {
  return [
    0xA7, 0x00, 0xAB, 0x00, 0xB0, 0x00, 0xB5, 0x00, 0xB9, 0x00, 0xBD, 0x00, 0xC1, 0x00, 0xC5, 0x00, 
    0xC9, 0x00, 0xCD, 0x00, 0xD1, 0x00, 0xD4, 0x00, 0xD8, 0x00, 0xDB, 0x00, 0xDE, 0x00, 0xE1, 0x00, 
    0xE4, 0x00, 0xE7, 0x00, 0xEA, 0x00, 0xEC, 0x00, 0xEE, 0x00, 0xF1, 0x00, 0xF3, 0x00, 0xF4, 0x00, 
    0xF6, 0x00, 0xF8, 0x00, 0xF9, 0x00, 0xFB, 0x00, 0xFC, 0x00, 0xFD, 0x00, 0xFE, 0x00, 0xFE, 0x00, 
    0xFF, 0x00, 0x00, 0x01, 0x00, 0x00, 0x30, 0x36, 0x25, 0x30, 0x1A, 0x00, 0x18, 0x1A, 0x18, 0x30, 
    0x21, 0x10, 0x30, 0x36, 0x25, 0x30, 0x19, 0x00, 0x2A, 0x21, 0x3A, 0x1A, 0x1A, 0x10, 0x30, 0x36, 
    0x25, 0x30, 0x21, 0x31, 0x30, 0x21, 0x10, 0x30, 0x0F, 0x0F, 0x30, 0x21, 0x30, 0x31, 0x21, 0x30, 
    0x37, 0x21, 0x30, 0x37, 0x0F, 0x0F, 0x30, 0x21, 0x36, 0x27, 0x21, 0x11, 0x16, 0x21, 0x11, 0x30, 
    0x36, 0x25, 0x30, 0x21, 0x27, 0x36, 0x21, 0x27, 0x36, 0x30, 0x27, 0x36, 0x1A, 0x18, 0x30, 0x36, 
    0x25, 0x30, 0x21, 0x31, 0x30, 0x3A, 0x1A, 0x1A, 0x1A, 0x10, 0x30, 0x36, 0x25, 0x30, 0x0F, 0x21, 
    0x07, 0x21, 0x36, 0x30, 0x2A, 0x10, 0x30, 0x36, 0x25, 0x30, 0x36, 0x21, 0x07, 0x21, 0x36, 0x15, 
    0x0F, 0x10, 0x30, 0x0F, 0x30, 0x00, 0x31, 0x30, 0x10, 0x0F, 0x30, 0x00, 0x0F, 0x0F, 0x36, 0x0F, 
    0x30, 0x36, 0x0F, 0x17, 0x36, 0x0F, 0x31, 0x30, 0x36, 0x31, 0x30, 0x07, 0x18, 0x28, 0x00, 0x00, 
    0x00, 0x0F, 0x30, 0x11, 0x0F, 0x27, 0x36, 0x0F, 0x30, 0x31, 0x0F, 0x00, 0x00, 0x0F, 0x30, 0x36, 
    0x0F, 0x0F, 0x36, 0x0F, 0x16, 0x36, 0x0F, 0x30, 0x36, 0x0F, 0x30, 0x36, 0x0F, 0x0F, 0x36, 0x0F, 
    0x19, 0x36, 0x0F, 0x30, 0x36, 0x0F, 0x30, 0x36, 0x0F, 0x0F, 0x36, 0x0F, 0x16, 0x36, 0x0F, 0x30, 
    0x36, 0x0F, 0x30, 0x36, 0x0F, 0x07, 0x36, 0x0F, 0x16, 0x36, 0x0F, 0x30, 0x36, 0x0F, 0x30, 0x36, 
    0x0F, 0x00, 0x36, 0x0F, 0x16, 0x36, 0x0F, 0x30, 0x36, 0x0F, 0x30, 0x36, 0x0F, 0x0F, 0x0F, 0x0F, 
    0x0F, 0x0F, 0x0F, 0x0F, 0x0F, 0x0F, 0x0F, 0x0F, 0x0F, 0x26, 0x30, 0x26, 0x25, 0x30, 0x0F, 0x0F, 
    0x0F, 0x0F, 0x0F, 0x0F, 0x0F, 0x27, 0x36, 0x0F, 0x31, 0x30, 0x0F, 0x31, 0x27, 0x0F, 0x30, 0x36, 
    0x05, 0x16, 0x15, 0x30, 0x27, 0x37, 0x10, 0x0F, 0x0F, 0x0F, 0x00, 0x30, 0x0F, 0x0F, 0x30, 0x36, 
    0x25, 0x30, 0x11, 0x00, 0x30, 0x0F, 0x15, 0x25, 0x0F, 0x0F, 0x35, 0x0F, 0x31, 0x35, 0x0F, 0x0F, 
    0x35, 0x0F, 0x30, 0x35, 0x0F, 0x16, 0x35, 0x0F, 0x31, 0x35, 0x0F, 0x0F, 0x35, 0x0F, 0x30, 0x35, 
    0x21, 0x0F, 0x30, 0x21, 0x36, 0x27, 0x21, 0x16, 0x16, 0x21, 0x16, 0x30, 0x0F, 0x36, 0x27, 0x0F, 
    0x0F, 0x27, 0x0F, 0x30, 0x0F, 0x0F, 0x36, 0x30, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF
  ];
}

// ════════ $FFF0-$FFF7 (8B): RESET: LDA #$00 STA $8000 JMP $C503 ═══════=
function buildFFF0_FFF7_resetHandler(): readonly number[] {
  return asm`
LDA #$00
STA $8000
JMP $C503
  `;
}

// ════════ $FFF8-$FFFF (8B): $FFF8-$FFFA padding + NMI/RESET/IRQ vectors ═══════=
function buildFFF8_FFFF_vectors(): readonly number[] {
  return asm`
BRK
BRK
BRK
CMP $F0
.byte $FF
ASL $C5
  `;
}

// ═══════════════════════════════════════════════════
// Assemble all sections into full 8KB bank
// ═══════════════════════════════════════════════════
const _PRG_BANK_31: readonly number[] = [
  ...buildE000_E016_calcPlayerStat(),
  ...buildE017_E022_swapBallOwner(),
  ...buildE023_E058_matchInit(),
  ...buildE059_E073_preSwapCheck(),
  ...buildE074_E0DE_matchProgressCheck(),
  ...buildE0DF_E6FB_mainLoop(),
  ...buildE6FC_E7C8_spriteDispatch(),
  ...buildE7C9_E8EC_pathfinding(),
  ...buildE8ED_E9D9_movementMath(),
  ...buildE9DA_F0B0_dataTables(),
  ...buildF0B1_F5FF_oamDisplay(),
  ...buildF600_FAxx_textTables(),
  ...buildFAxx_FFEF_padding(),
  ...buildFFF0_FFF7_resetHandler(),
  ...buildFFF8_FFFF_vectors(),
];
