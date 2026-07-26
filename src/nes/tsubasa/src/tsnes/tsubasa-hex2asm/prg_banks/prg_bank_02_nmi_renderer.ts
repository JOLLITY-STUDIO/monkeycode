/**
 * PRG-ROM MMC3 bank 02 (8KB) — function-based assembly
 * Mapper: 4 (MMC3) | CPU: $8000-$9FFF
 * CDL: code=1828 data=245 unaccessed=6119
 *
 * 功能: NMI 中斷處理器 + 手柄讀取 + PPU 更新 + 音频驱动
 *
 * Pattern: 参考 bank_31.ts
 *   每个 build_xxx() 函数返回其覆盖地址范围的 raw 6502 字节，
 *   最后通过 spread 拼成完整的 8KB 数组
 */


import { asm } from '../_6502asm';
export { _PRG_BANK_02 as default };

console.log('[prg_02_nmi_renderer] loaded');

// ════════ $8000-$83FF (1024B): NMI中断处理器 + PPU更新 + 手柄读取 + MMC3切页 ═══════=
function build_8000_83FF_nmiAndPPU(): readonly number[] {
  return asm`
  LDA #$00
  STA $2003
  LDA #$02
  STA $4014
  LDA $0628
  BEQ $E05D
  BIT $0629
  BVS $E05D
  LDA #$00
  STA $2001
  LDX #$00
@E01B:
  LDY #$80
  LDA $05E8,X
  BPL $E026
  AND #$3F
  LDY #$84
@E026:
  STY $2000
  TAY
  LDA $05EA,X
  STA $2006
  LDA $05E9,X
  STA $2006
@E036:
  LDA $05EB,X
  STA $2007
  INX
  DEY
  BNE $E036
  INX
  INX
  INX
  LDA $05E8,X
  BNE $E01B
  LDA #$00
  STA $0628
  LDA #$3F
  STA $2006
  LDA #$00
  STA $2006
  STA $2006
  STA $2006
@E05D:
  LDA $21
  STA $2001
  LDA $79
  BPL $E073
  LDA $7B
  STA $2006
  LDA $7A
  STA $2006
  JMP $A091
@E073:
  LSR $20
  LSR $20
  LDA $45
  LSR A
  ROL $20
  LDA $7B
  LSR A
  ROL $20
  LDA $20
  STA $2000
  LDA $7A
  STA $2005
  LDX $44
  DEX
  STX $2005
  LDY #$16
  JSR $A1CB ; → bank switch?
  LDA $79
  BEQ $E0AA
  ASL A
  STA $C000
  STA $C001
  STA $E001
  LDA #$04
  STA $78
  BPL $E0AF
@E0AA:
  STA $E000
  STA $78
@E0AF:
  LDA #$02
  STA $8000
  LDA $9E
  STA $8001
  LDA #$03
  STA $8000
  LDA $9F
  STA $8001
  LDA #$04
  STA $8000
  LDA $A0
  STA $8001
  LDA #$05
  STA $8000
  LDA $A1
  STA $8001
  LDX #$02
  LDA #$04
  STA $40
@E0DD:
  LDA $1B,X
@E0DF:
  STA $41
  LDA #$01
  STA $4016
  LDA #$00
  STA $4016
  LDY #$08
@E0ED:
  LDA $4015,X
  LSR A
  ROL $3F
  AND #$01
  ORA $3F
  STA $3F
  DEY
  BNE $E0ED
  CMP $41
  BEQ $E107
  DEC $40
  BNE $E0DF
  JMP $A113
@E107:
  LDA $1B,X
  EOR $3F
  AND $3F
  STA $1D,X
  LDA $3F
  STA $1B,X
  DEX
  BNE $E0DD
  CLC
  LDA $E1
  ADC #$83
  STA $E1
  LDA $E2
  ADC #$0D
  STA $E2
  LDA $E3
  ADC #$11
  STA $E3
  LDA #$00
  STA $46
  STA $47
  LDA $1B
  ORA #$80
  STA $1B
  INC $3A
  RTS
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  STA $E000
  STA $E001
  LDX $78
  LDA $78,X
  BPL $E18D
  LDY #$06
@E16E:
  DEY
  BNE $E16E
  LDA $79,X
  LDY $7A,X
  STY $2006
  STA $2006
  LDA $20
  AND #$FC
  STA $2000
  LDA #$00
  STA $2005
  STA $2005
  JMP $A1A8
@E18D:
  LDY #$02
@E18F:
  DEY
  BNE $E18F
  LSR $20
  LDA $7A,X
  LSR A
  ROL $20
  LDA $20
  STA $2000
  LDA $79,X
  STA $2005
  LDA #$00
  STA $2005
  LDA $78,X
  AND #$7F
  BEQ $E1C0
  CPX #$13
  BEQ $E1C0
  INC $78
  INC $78
  INC $78
  ASL A
  STA $C000
  STA $C001
  RTS
@E1C0:
  STA $E000
  STA $78
  LDY #$18
  JSR $A1CB ; → bank switch?
  RTS
  LDX $78,Y
  LDA #$00
  ORA $22
  STA $8000
  STX $8001
  LDX $79,Y
  LDA #$01
  ORA $22
  STA $8000
  STX $8001
  RTS
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  JMP $A21B
  JMP $A2AF
  JMP $A2E8
  JMP $A3D8
  JMP $A855
  JMP $A86E
  JMP $A484
  JMP $A8CE
  JMP $A8FE
  LDX #$FF
  TXS
  PHA
  LDA #$00
  STA $A000
  LDA $1B
  ORA #$40
  STA $1B
  LDA #$00
  LDY #$E8
@E22E:
  STA $FF19,Y
  INY
  BNE $E22E
  LDA #$00
  LDY #$5A
@E238:
  STA $FFE0,Y
  INY
  BNE $E238
  LDA #$98
  LDX #$02
  LDY #$68
  STY $EC
  LDY #$04
  JSR $AA06 ; → bank switch?
  LDA #$0F
  LDY #$E0
@E24F:
  STA $054A,Y
  INY
  BNE $E24F
  JSR $9A43 ; → bank switch?
  LDA #$00
  STA $4A
  STA $4B
  JSR $98A0 ; → bank switch?
  JSR $9B7F ; → bank switch?
  LDA #$02
  STA $8F
  STA $91
  PLA
  BEQ $E281
  LDX #$01
  LDA #$FF
  STA $00,X
  LDA #$7F
  STA $01,X
  LDY #$28
  LDA #$00
  JSR $9F69 ; → bank switch?
  JMP $A292
@E281:
  LDX #$01
  LDA #$1E
  STA $00,X
  LDA #$80
  STA $01,X
  LDY #$28
  LDA #$00
  JSR $9F69 ; → bank switch?
  LDX #$15
  LDA #$EC
  STA $00,X
  LDA #$82
  STA $01,X
  LDY #$F0
  LDA #$00
  JSR $9F69 ; → bank switch?
  LDA $20
  ORA #$80
  STA $20
  STA $2000
  JMP $9EED
  JSR $99F0 ; → bank switch?
  JSR $98A0 ; → bank switch?
  JSR $9B7F ; → bank switch?
  LDA $20
  AND #$7F
  STA $2000
  STA $20
  STA $E000
  LDA #$00
  LDY #$E8
@E2C8:
  STA $FF19,Y
  INY
  BNE $E2C8
  LDA #$00
  LDY #$5A
@E2D2:
  STA $FFE0,Y
  INY
  BNE $E2D2
  LDA #$98
  LDX #$02
  LDY #$68
  STY $EC
  LDY #$04
  JSR $AA06 ; → bank switch?
  JMP $C557
  LDA $57
  BMI $E338
  STA $ED
  LDA #$00
  LDY #$FA
@E2F2:
  STA $FFEC,Y
  INY
  BNE $E2F2
  LDA #$01
  JSR $9FA8 ; → bank switch?
  LDY $ED
  LDA #$00
  STA $EC
@E303:
  TYA
  AND #$0F
  LSR A
  TAX
  LDA $AADF,Y
  CLC
  ADC $E6,X
  STA $E6,X
  LDX $EC
  LDA $AAE0,Y
  ADC $7A,X
  STA $7A,X
  LDA $AAE0,Y
  BPL $E322
  LDA #$FF
  BNE $E324
@E322:
  LDA #$00
@E324:
  ADC $7B,X
  STA $7B,X
  INY
  INY
  LDA $EC
  CLC
  ADC #$03
  STA $EC
  CMP #$0F
  BNE $E303
  JMP $A2F8
@E338:
  CMP #$81
  BEQ $E3A3
  LDX #$67
  LDA #$05
  JSR $C4BD ; → bank switch?
  LDA #$00
  STA $ED
  TAY
  LDX #$78
@E34A:
  LDA $EC
  AND #$01
  ORA #$F2
  STA $0469,X
  LDA #$03
  STA $046A,X
  TYA
  STA $0468,X
  CLC
  ADC #$03
  TAY
  LDA $EC
  STA $046B,X
  CLC
  ADC #$0D
  STA $EC
  INX
  INX
  INX
  INX
  CPX #$FC
  BNE $E34A
  LDA #$01
  JSR $9FA8 ; → bank switch?
  LDX #$78
@E379:
  TXA
  AND #$0C
  TAY
  LDA $0468,X
  CMP $AB1F,Y
  BCC $E387
  LDA #$00
@E387:
  CLC
  ADC $AB21,Y
  STA $0468,X
  LDA $046B,X
  CLC
  ADC $AB22,Y
  STA $046B,X
  INX
  INX
  INX
  INX
  CPX #$FC
  BNE $E379
  JMP $A372
@E3A3:
  LDA $0568
  ORA #$10
  STA $0568
  LDA #$04
  JSR $9FA8 ; → bank switch?
  LDA #$08
  STA $44
  STA $46
  LDA $056D
  SEC
  SBC #$04
  STA $056D
  LDA #$04
  JSR $9FA8 ; → bank switch?
  LDA #$00
  STA $44
  LDA #$F8
  STA $46
  LDA $056D
  CLC
  ADC #$04
  STA $056D
  JMP $A3AB
  JSR $99F0 ; → bank switch?
  LDA #$61
  JSR $8464 ; → bank switch?
  JSR $82A9 ; → bank switch?
  LDY #$F8
@E3E5:
  LDA $A384,Y
  STA $0460,Y
  INY
  BNE $E3E5
  LDA #$00
  STA $E7
  JSR $A454 ; → bank switch?
  LDA #$01
  JSR $9FA8 ; → bank switch?
  LDA $1E
  AND #$10
  .byte $D0, $45  ; BNE $8445
  `;
}

// ════════ $8400-$87FF (1024B): 场景分派器(JMP表) + 场景子程序 ═══════=
function build_8400_87FF_sceneDispatcher(): readonly number[] {
  return asm`
  BIT $1E
  BMI $E40B
  LDA #$01
  BVS $E410
  JMP $A413
@E40B:
  LDX $E7
  LDA $AB2F,X
@E410:
  STA $0700
  JSR $AA20 ; → bank switch?
  .byte $90, $DD  ; BCC $83F5
  LDX #$10
  STX $E6
  TAY
  CLC
  ADC $E7
  CMP #$64
  BCC $E42D
  TYA
  BMI $E42B
  LDA #$00
  BEQ $E42D
@E42B:
  LDA #$63
@E42D:
  STA $E7
  JSR $A454 ; → bank switch?
@E432:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  JSR $AA20 ; → bank switch?
  .byte $90, $B9  ; BCC $83F5
  DEC $E6
  BNE $E432
  LDX #$04
  JMP $A41A
  LDA #$01
  STA $0700
  LDA #$00
  STA $4C
  JSR $99F0 ; → bank switch?
  JMP $8053
  LDA $E7
  JSR $9E7C ; → bank switch?
  LDA $EC
  LSR A
  LSR A
  LSR A
  LSR A
  TAY
  LDA $A472,Y
  STA $0559
  LDA $EC
  AND #$0F
  TAY
  LDA $A472,Y
  STA $055D
  RTS
  BPL $E48C
  ORA $1B1A,Y
  .byte $1C
  ORA $1F1E,X
  JSR $1080
  .byte $03
  BCC $E401
  BPL $E486
  TYA
  LDA $ED
@E486:
  ASL A
  TAX
  LDA $A492,X
  PHA
@E48C:
  LDA $A491,X
  PHA
  RTS
  CPY #$A4
  EOR $7BA5,Y
  LDA $81
  LDA $A2
  LDA $A8
  LDA $B0
  LDA $B8
  LDA $BF
  LDA $CD
  LDA $DB
  LDA $E8
  LDA $02
  LDX $1C
  LDX $29
  LDX $50
  LDX $9C
  LDX $7A
  .byte $A7, $82, $A7
  STA $BDA7
  .byte $A7
  DEC $D6A7
  .byte $A7
  NOP
  .byte $A7
  JSR $9A0D ; → bank switch?
  LDA #$10
  JSR $9FA8 ; → bank switch?
  LDY #$30
@E4CB:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  LDA #$01
  JSR $890C ; → bank switch?
  DEY
  BNE $E4CB
  LDA #$00
  STA $5B
  STA $7B
  LDA #$17
  JSR $8AF7 ; → bank switch?
  LDA #$68
  STA $44
  LDA #$03
  JSR $8920 ; → bank switch?
  LDA $8E
  STA $90
  LDA $8F
  STA $91
  LDA #$04
  JSR $9FA8 ; → bank switch?
  JSR $9A35 ; → bank switch?
  JSR $88FB ; → bank switch?
@E4FF:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  INC $79
  DEC $7C
  DEC $7C
  LDA $44
  SEC
  SBC #$02
  STA $44
  CMP #$03
  BCS $E4FF
  LDA #$00
  JSR $8920 ; → bank switch?
  LDA $1B
  ORA #$01
  STA $1B
  LDA #$F0
  JSR $9FA8 ; → bank switch?
  LDA #$3C
  JSR $9FA8 ; → bank switch?
  LDA $1B
  AND #$FE
  STA $1B
  LDA #$00
  STA $90
  LDA #$02
  STA $91
  JSR $99F0 ; → bank switch?
  JSR $9B7F ; → bank switch?
  JSR $98A0 ; → bank switch?
  LDA #$C0
  STA $E6
  LDA #$23
  STA $E7
  LDY #$02
  LDX #$20
  LDA #$55
  JSR $98EA ; → bank switch?
  LDA #$01
  JSR $8920 ; → bank switch?
  LDA #$02
  RTS
  LDA #$00
  STA $60
  LDA $EC
  LSR A
  ROR $60
  LSR A
  ROR $60
  STA $61
  BIT $62
  BMI $E579
  LDA #$00
  SEC
  SBC $60
  STA $60
  LDA #$00
  SBC $61
  STA $61
@E579:
  LDA #$03
  RTS
  JSR $9B91 ; → bank switch?
  LDA #$02
  RTS
  LDA #$00
  STA $E6
  LDA #$20
  STA $E7
  LDY #$10
  LDX #$20
  JSR $98E8 ; → bank switch?
  LDA #$00
  STA $E6
  LDA #$24
  STA $E7
  LDY #$20
  LDX #$20
  JSR $98E8 ; → bank switch?
  LDA #$02
  RTS
  JSR $9B7F ; → bank switch?
  LDA #$02
  RTS
  LDX #$09
  JSR $9F96 ; → bank switch?
  LDA #$02
  RTS
  LDX #$09
  JSR $9F89 ; → bank switch?
  LDA #$02
  RTS
  LDA #$FF
  STA $99
  LDA #$02
  RTS
  LDA #$00
  STA $A000
  LDA $1B
  AND #$BF
  STA $1B
  LDA #$02
  RTS
  LDA #$01
  STA $A000
  LDA $1B
  ORA #$40
  STA $1B
  LDA #$02
  RTS
  LDA #$00
  JSR $8895 ; → bank switch?
  LDA #$05
  JSR $8920 ; → bank switch?
  LDA #$02
  RTS
  LDA $0D
  BNE $E5FA
  LDA #$10
  JSR $8895 ; → bank switch?
  LDA #$06
  JSR $8920 ; → bank switch?
  LDA #$02
  RTS
@E5FA:
  LDA #$00
  STA $0D
  STA $0E
  LDA #$02
  RTS
  LDA $0D
  BNE $E614
  LDA #$30
  JSR $8895 ; → bank switch?
  LDA #$08
  JSR $8920 ; → bank switch?
  LDA #$02
  RTS
@E614:
  LDA #$00
  STA $0D
  STA $0E
  LDA #$02
  RTS
  LDA #$20
  JSR $8895 ; → bank switch?
  LDA #$07
  JSR $8920 ; → bank switch?
  LDA #$02
  RTS
  LDX #$BD
  LDY #$23
  JSR $8976 ; → bank switch?
  JSR $9A35 ; → bank switch?
  LDA #$01
  JSR $9FA8 ; → bank switch?
  LDA $058F
  AND #$7F
  STA $058F
  LDA #$82
  STA $4C
  LDY #$28
  LDX #$20
  LDA #$C8
  JSR $A82F ; → bank switch?
  LDA #$02
  RTS
  LDA #$00
  STA $ED
@E655:
  LDY $ED
  LDA $AA97,Y
  STA $EA
  AND #$7F
  STA $EB
  LDA $7B
  AND #$01
  ASL A
  ASL A
  ORA $EB
  TAX
  INY
  LDA $AA97,Y
  STA $EB
  INY
  LDA $AA97,Y
  INY
  STY $ED
  LDY $EB
  JSR $9B28 ; → bank switch?
  AND #$7F
  STA $EB
  LDA #$00
@E681:
  STA $05E8,X
  INX
  DEC $EB
  BNE $E681
  JSR $9B5E ; → bank switch?
  BIT $EA
  BMI $E69A
  BVC $E655
  LDA #$02
  JSR $9FA8 ; → bank switch?
  JMP $A655
@E69A:
  LDA #$02
  RTS
  LDA $04E5
  CMP #$FF
  BEQ $E6D4
  JSR $A767 ; → bank switch?
  LDY #$80
  LDA #$00
  STA $EA
  LDX #$2F
  LDA #$FF
  STA $ED
  LDA #$FE
  STA $EC
  LDA #$07
  STA $EB
  LDA #$F7
  JSR $A72C ; → bank switch?
  LDY #$D8
  LDX #$30
  LDA #$01
  STA $ED
  LDA #$FF
  STA $EC
  LDA #$FC
  JSR $A72C ; → bank switch?
  LDA #$02
  RTS
@E6D4:
  JSR $A767 ; → bank switch?
  LDY #$80
  LDX #$2F
  LDA #$02
  STA $EA
  LDA #$FF
  STA $ED
  LDA #$FE
  STA $EC
  LDA #$07
  STA $EB
  LDA #$F7
  JSR $A72C ; → bank switch?
  LDX #$08
  LDA #$FE
  JSR $A72C ; → bank switch?
  LDY #$FC
@E6F9:
  LDA $A67B,Y
  STA $0460,Y
  INY
  BNE $E6F9
  LDY #$B8
  LDX #$1C
  LDA #$02
  STA $ED
  LDA #$FF
  STA $EC
  LDA #$03
  STA $EB
  LDA #$F6
  JSR $A72C ; → bank switch?
  LDY #$D8
@E719:
  LDA $046A,Y
  ORA #$02
  STA $046A,Y
  INY
  INY
  INY
  INY
  CPY #$F0
  BCC $E719
  LDA #$02
  RTS
  STA $E9
@E72E:
  LDA $04E4
  CLC
  ADC $ED
  STA $04E4
  LDA $04E7
  CLC
  ADC $EC
  STA $04E7
  AND $EB
  BNE $E75E
  LDA $04E4
  STA $0468,Y
  LDA $E9
  STA $0469,Y
  LDA $EA
  STA $046A,Y
  LDA $04E7
  STA $046B,Y
  INY
  INY
  INY
  INY
@E75E:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  DEX
  BNE $E72E
  RTS
  LDY #$FC
@E769:
  LDA $A677,Y
  STA $03E8,Y
  INY
  BNE $E769
  RTS
  ADC $03FF,Y
  .byte $C2
  LSR $F6
  .byte $02, $52
  LDA #$80
  JSR $8895 ; → bank switch?
  LDA #$02
  RTS
  LDA #$02
  JSR $9FA8 ; → bank switch?
  JSR $88FB ; → bank switch?
  LDA #$02
  RTS
  LDY #$40
@E790:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  LDX #$20
@E797:
  LDA $0468,X
  BPL $E7A4
  LDA $046A,X
  ORA #$08
  STA $046A,X
@E7A4:
  INX
  INX
  INX
  INX
  CPX #$C4
  BNE $E797
  DEY
  BNE $E790
  JSR $9B91 ; → bank switch?
@E7B2:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  LDA $09
  BNE $E7B2
  JMP $A651
  LDA #$01
  JSR $9FA8 ; → bank switch?
  LDY #$28
  LDX #$64
  LDA #$B0
  JSR $A82F ; → bank switch?
  LDA #$02
  RTS
  LDA #$81
  JSR $8895 ; → bank switch?
  LDA #$02
  RTS
  LDY #$80
@E7D9:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  LDX #$20
@E7E0:
  LDA $0468,X
  BPL $E7ED
  LDA $046A,X
  ORA #$04
  STA $046A,X
@E7ED:
  INX
  INX
  INX
  INX
  CPX #$C4
  BNE $E7E0
  DEY
  BNE $E7D9
  LDA #$02
  RTS
  LDA $28
  JSR $9E7C ; → bank switch?
  `;
}

// ════════ $8800-$8BFF (1024B): 场景子程序(续) + PPU初始化 + 音频数据表 ═══════=
function build_8800_8BFF_sceneFuncsAndPPUInit(): readonly number[] {
  return asm`
  LDA $EC
  AND #$F0
  BEQ $E817
  JSR $AC6D ; → bank switch?
  LDX $52
  LDY $53
  JSR $88CA ; → bank switch?
  INC $53
  LDA #$06
  JSR $9FA8 ; → bank switch?
@E817:
  LDA $EC
  AND #$0F
  JSR $AC71 ; → bank switch?
  LDX $52
  LDY $53
  JSR $88CA ; → bank switch?
  INC $53
  LDA #$06
  JSR $9FA8 ; → bank switch?
  LDA #$02
  RTS
  STA $EC
  STX $ED
@E833:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  LDX $ED
@E83A:
  LDA $0468,X
  CMP #$82
  BCS $E849
  LDA $046A,X
  AND #$F3
  STA $046A,X
@E849:
  INX
  INX
  INX
  INX
  CPX $EC
  BNE $E83A
  DEY
  BNE $E833
  RTS
  LDA $E4
  CMP $26
  BCS $E8A8
  LDA $26
  BEQ $E87C
  CMP #$06
  BEQ $E884
  CMP #$0C
  BEQ $E87C
  CMP #$10
  BEQ $E88C
  JMP $A8A8
  LDA $26
  CMP #$06
  BCC $E87C
  CMP #$0C
  BCC $E884
  CMP #$10
  BCS $E88C
@E87C:
  LDX #$00
  JSR $A8B7 ; → bank switch?
  JMP $A8A3
@E884:
  LDX #$0C
  JSR $A8B7 ; → bank switch?
  JMP $A8A3
@E88C:
  LDX #$18
  JSR $A8B7 ; → bank switch?
  LDY #$00
@E893:
  LDA $AA47,X
  STA $0408,Y
  INX
  TYA
  CLC
  ADC #$04
  TAY
  CMP #$28
  BCC $E893
  LDA $AA47,X
  STA $2C
@E8A8:
  LDX $26
  LDA $AA75,X
  STA $2A
  LDA $26
  CLC
  ADC #$03
  STA $2B
  RTS
  LDA #$0B
  STA $ED
  LDY #$00
@E8BD:
  LDA $AA47,X
  STA $0300,Y
  INX
  TYA
  CLC
  ADC #$0C
  TAY
  CMP #$84
  BCC $E8BD
  RTS
  LDA #$01
  JSR $9FA8 ; → bank switch?
  LDY #$00
@E8D5:
  LDX $0468,Y
  LDA $046A,Y
  AND #$0C
  BEQ $E8E1
  LDX #$F8
@E8E1:
  TXA
  STA $0200,Y
  LDA $0469,Y
  STA $0201,Y
  LDA $046A,Y
  STA $0202,Y
  LDA $046B,Y
  STA $0203,Y
  INY
  INY
  INY
  INY
  BNE $E8D5
  RTS
  LDA #$02
  JSR $9FA8 ; → bank switch?
  JSR $98A0 ; → bank switch?
  JSR $9B7F ; → bank switch?
  LDX #$00
  LDY #$01
  JSR $9B6F ; → bank switch?
  LDX #$02
  LDY #$03
  JSR $9B74 ; → bank switch?
  LDY #$F8
@E919:
  LDA $A896,Y
  STA $0460,Y
  INY
  BNE $E919
  LDA #$01
  LDX #$01
  JSR $997A ; → bank switch?
  LDA $26
  STA $42
  JSR $AA36 ; → bank switch?
@E930:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  LDA $1E
  BMI $E95E
  JSR $AA20 ; → bank switch?
  BCC $E930
  LDX #$10
  CLC
  ADC $42
  CMP #$21
  BCS $E949
  STA $42
@E949:
  JSR $AA36 ; → bank switch?
@E94C:
  LDA #$01
  JSR $9FA8 ; → bank switch?
  JSR $AA20 ; → bank switch?
  BCC $E930
  DEX
  BNE $E94C
  LDX #$04
  JMP $A940
@E95E:
  JSR $99F0 ; → bank switch?
  JSR $9B7F ; → bank switch?
  LDA $42
  CMP $26
  BEQ $E98D
  STA $26
  ASL A
  TAX
  LDA $A996,X
  STA $42
  LDA $A997,X
  STA $43
  LDX #$00
@E97A:
  LDA $42
  STA $0454,X
  LDA $43
  STA $0455,X
  INX
  INX
  CPX #$14
  BNE $E97A
  JSR $A86E ; → bank switch?
@E98D:
  RTS
@E98E:
  .byte $80, $33
  BRK
  LDY #$80
  .byte $33
  BRK
  TAY
  BRK
  BRK
  RTS
  BRK
  BNE $E99C
@E99C:
  BVC $E99F
  BRK
@E99F:
  .byte $03
  BRK
  ORA $28
  ASL $80
  .byte $07
  BRK
  ORA #$30
  .byte $0C
  CPX #$0D
  BVS $E9BF
  BVC $E9C3
  BVC $E9C7
  BCS $E9CD
  RTS
@E9B5:
  ASL $1E60,X
  BNE $E9DA
  PHA
  .byte $23
  INY
  AND $50
@E9BF:
  PLP
  CPX #$2A
  CPX #$2A
  SEI
  AND $3018
  INY
  .byte $32
  CLI
  SEC
  CLI
@E9CD:
  SEC
  BMI $EA0B
  BPL $EA10
  RTI
  .byte $44
  INX
  LSR A
  JSR $0055
  EOR $5D20,Y
  BVC $EA3F
  BCC $EA45
  CPX #$69
  RTI
  ROR $7300
  CPX #$77
  BNE $EA66
  BRK
  .byte $82, $80, $87, $80
  STA $93E0
  BNE $E98E
  CPX #$A1
  CPY #$A9
  CPY #$B1
  BNE $E9B5
  .byte $04, $C2, $80
  AXS #$A0
  .byte $D7
  BRK
  INX
  .byte $FF, $FF
  STY $ED
  INX
  LDY #$00
@EA0B:
  PHA
  LDA #$00
  STA ($EC),Y
@EA10:
  INC $EC
  BNE $EA16
  INC $ED
@EA16:
  PLA
  SEC
  SBC #$01
  BNE $EA0B
  DEX
  BNE $EA0B
  RTS
  LDA $1C
  AND #$08
  BEQ $EA2A
  LDA #$01
  SEC
  RTS
@EA2A:
  LDA $1C
  AND #$04
  BEQ $EA34
  LDA #$FF
  SEC
  RTS
@EA34:
  CLC
  RTS
  LDA $42
  JSR $AC6D ; → bank switch?
  STA $0559
  LDA $42
  JSR $AC71 ; → bank switch?
  STA $055D
  RTS
  .byte $02, $03, $04
  ORA $06
  .byte $07
  PHP
  ORA #$0A
  ORA ($0B,X)
  BRK
  .byte $0F
  ORA $140E
  BPL $EA65
  .byte $13, $12
  ORA $11,X
  ASL $00,X
  .byte $22, $1B, $1C, $14
  ORA $1817,X
@EA66:
  ORA ($1A),Y
  ORA ($15,X)
  ORA $101F,Y
  .byte $12, $13
  ASL $1E,X
  JSR $0F21
  ORA ($00,X)
  BRK
  BRK
  BRK
  BRK
  BRK
  ORA ($01,X)
  ORA ($01,X)
  ORA ($01,X)
  BRK
  BRK
  BRK
  BRK
  .byte $02, $02, $02, $02, $02, $02, $02, $02, $02, $02, $02, $02, $02, $02, $02, $02, $02, $02
  JSR $2000
  JSR $8F20 ; → bank switch?
  RTS
  .byte $3F, $8F
  JSR $1E21
  JSR $8E41 ; → bank switch?
  RTS
  LSR $208E,X
  .byte $42, $1C
  JSR $8D62 ; → bank switch?
  RTS
  ADC $208D,X
  .byte $63
  NOP
  JSR $8C83 ; → bank switch?
  RTS
  .byte $9C
  STY $8420
  CLC
  JSR $8BA4 ; → bank switch?
  RTS
  .byte $BB, $8B
  JSR $16A5
  JSR $8AC5 ; → bank switch?
  RTS
  NOP
  TXA
  JSR $14C6
  JSR $89E6 ; → bank switch?
  RTS
  SBC $2089,Y
  .byte $E7, $12
  JSR $8807 ; → bank switch?
  CPX #$18
  DEY
  BPL $EAE1
@EAE1:
  BPL $EAE3
@EAE3:
  RTI
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $04
  BRK
  ASL $1C00
  BRK
  .byte $80
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BEQ $EB02
  CPX #$FF
  .byte $80, $FF
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  .byte $04
  BRK
  ASL $1C00
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  BRK
  JMP ($0400)
  .byte $FC
  ROR $0500
  .byte $FC
  BVS $EB29
@EB29:
  ASL $FA
  .byte $74
  BRK
  .byte $07
  NOP
  CLI
  EOR $51
  EOR $53,X
  .byte $47
  LSR $52
  .byte $54, $57
  NOP
  PHA
  EOR #$4B
  JMP $4E4D
  .byte $4F
  BVC $EB9C
  LSR $44,X
  .byte $32, $33
  EOR ($42,X)
  .byte $43, $3C
  AND $403F,Y
  .byte $37
  SEC
  ROL $3435,X
  .byte $3B
  NOP
  ROL $3D,X
  .byte $03, $04
  ORA $06
  .byte $07
  PHP
  ORA #$0A
  ANC #$0C
  ORA $0F0E
  BPL $EB77
  .byte $12, $13, $14
  ORA $16,X
  .byte $17
  CLC
  ORA $1B1A,Y
  .byte $1C
  ORA $1F1E,X
  .byte $22, $23
  BIT $25
  ROL $27
  PLP
  AND #$2A
  ANC #$2C
  AND $2F2E
  BMI $EBE3
  RTS
  ADC ($62,X)
  .byte $63, $64
  ADC $66
  PLA
  ADC #$6A
  ARR #$6C
  ADC $6F6E
  BVS $EB3E
  PHP
  STA $2000
  LDA #$00
  STA $2001
  STA $2005
  STA $2005
  LDA #$00
  LDY #$01
@EBA8:
  STA $01FF,Y
  INY
  BNE $EBA8
  LDA #$00
  STA $2003
  LDA #$02
  STA $4014
  LDA #$00
  STA $8000
  STA $8001
  LDA #$01
  STA $8000
  LDA #$02
  STA $8001
  LDA #$20
  STA $2006
  LDA #$00
  STA $2006
  LDX #$10
  LDY #$00
@EBD8:
  LDA #$00
  STA $2007
  DEY
  BNE $EBD8
  DEX
  BNE $EBD8
@EBE3:
  LDA #$00
  STA $E8
  STA $E9
  LDA #$20
  STA $EB
  LDA #$02
  STA $E6
  LDA #$21
  STA $E7
  LDA #$08
  STA $EA
  LDA $E7
  STA $2006
  LDA $E6
  `;
}

// ════════ $8C00-$8FFF (1024B): PPU填充工具 + Nametable数据(部分) ═══════=
function build_8C00_8FFF_ppuFillTools(): readonly number[] {
  return asm`
  STA $2006
  LDA $E9
  JSR $AC71 ; → bank switch?
  STA $2007
  LDA $E8
  JSR $AC6D ; → bank switch?
  STA $2007
  LDA $E8
  JSR $AC71 ; → bank switch?
  STA $2007
  LDA #$00
  STA $2007
  STA $2007
  LDY #$00
@EC25:
  LDA ($E8),Y
  JSR $AC6D ; → bank switch?
  STA $2007
  LDA ($E8),Y
  JSR $AC71 ; → bank switch?
  STA $2007
  LDA #$00
  STA $2007
  INY
  CPY #$08
  BNE $EC25
  LDA $E8
  CLC
  ADC #$08
  STA $E8
  LDA $E9
  ADC #$00
  STA $E9
  LDA $E6
  CLC
  ADC #$40
  STA $E6
  LDA $E7
  ADC #$00
  STA $E7
  DEC $EA
  BEQ $EC60
  JMP $ABF9
@EC60:
  JSR $AC7E ; → bank switch?
  DEC $EB
  BEQ $EC6A
  JMP $ABED
@EC6A:
  JMP $ABE3
  LSR A
  LSR A
  LSR A
  LSR A
  AND #$0F
  CLC
  ADC #$33
  CMP #$3D
  BCC $EC7D
  CLC
  ADC #$44
@EC7D:
  RTS
  LDA #$18
  STA $2001
  LDA #$00
  STA $2005
  STA $2005
  TAY
  TAX
  LDA #$40
@EC8F:
  DEY
  BNE $EC8F
  DEX
  BNE $EC8F
  SEC
  SBC #$01
  BNE $EC8F
  LDA #$00
  STA $2001
  STA $2005
  STA $2005
  RTS
  .byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  `;
}

// ════════ $9000-$93FF (1024B): 未使用 (0xFF填充) ═══════=
function build_9000_93FF_unused(): readonly number[] {
  return asm`
.byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  `;
}

// ════════ $9400-$97FF (1024B): 未使用 (0xFF填充) ═══════=
function build_9400_97FF_unused(): readonly number[] {
  return asm`
.byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  `;
}

// ════════ $9800-$9BFF (1024B): 未使用 (0xFF填充) ═══════=
function build_9800_9BFF_unused(): readonly number[] {
  return asm`
.byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  `;
}

// ════════ $9C00-$9FFF (1024B): 未使用 (0xFF填充) ═══════=
function build_9C00_9FFF_unused(): readonly number[] {
  return asm`
.byte $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF, $FF
  `;
}

// ═══════════════════════════════════════════════════
// Assemble all sections into full 8KB bank
// ═══════════════════════════════════════════════════
const _PRG_BANK_02: readonly number[] = [
  ...build_8000_83FF_nmiAndPPU(),
  ...build_8400_87FF_sceneDispatcher(),
  ...build_8800_8BFF_sceneFuncsAndPPUInit(),
  ...build_8C00_8FFF_ppuFillTools(),
  ...build_9000_93FF_unused(),
  ...build_9400_97FF_unused(),
  ...build_9800_9BFF_unused(),
  ...build_9C00_9FFF_unused(),
];
