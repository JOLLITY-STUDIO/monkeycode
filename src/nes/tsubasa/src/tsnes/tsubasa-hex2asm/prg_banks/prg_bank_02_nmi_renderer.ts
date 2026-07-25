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

export { _PRG_BANK_02 as default };

console.log('[prg_02_nmi_renderer] loaded');

// ════════ $8000-$83FF (1024B): NMI中断处理器 + PPU更新 + 手柄读取 + MMC3切页 ═══════=
function build_8000_83FF_nmiAndPPU(): readonly number[] {
  // $8000: LDA #$00
  // $8002: STA $2003
  // $8005: LDA #$02
  // $8007: STA $4014
  // $800A: LDA $0628
  // $800D: BEQ $805D
  // $800F: BIT $0629
  // $8012: BVS $805D
  // $8014: LDA #$00
  // $8016: STA $2001
  // $8019: LDX #$00
  // $801B: LDY #$80
  // $801D: LDA $05E8,X
  // $8020: BPL $8026
  // $8022: AND #$3F
  // $8024: LDY #$84
  // $8026: STY $2000
  // $8029: TAY
  // $802A: LDA $05EA,X
  // $802D: STA $2006
  // $8030: LDA $05E9,X
  // $8033: STA $2006
  // $8036: LDA $05EB,X
  // $8039: STA $2007
  // $803C: INX
  // $803D: DEY
  // $803E: BNE $8036
  // $8040: INX
  // $8041: INX
  // $8042: INX
  // $8043: LDA $05E8,X
  // $8046: BNE $801B
  // $8048: LDA #$00
  // $804A: STA $0628
  // $804D: LDA #$3F
  // $804F: STA $2006
  // $8052: LDA #$00
  // $8054: STA $2006
  // $8057: STA $2006
  // $805A: STA $2006
  // $805D: LDA $21
  // $805F: STA $2001
  // $8062: LDA $79
  // $8064: BPL $8073
  // $8066: LDA $7B
  // $8068: STA $2006
  // $806B: LDA $7A
  // $806D: STA $2006
  // $8070: JMP $A091
  // $8073: LSR $20
  // $8075: LSR $20
  // $8077: LDA $45
  // $8079: LSR A
  // $807A: ROL $20
  // $807C: LDA $7B
  // $807E: LSR A
  // $807F: ROL $20
  // $8081: LDA $20
  // $8083: STA $2000
  // $8086: LDA $7A
  // $8088: STA $2005
  // $808B: LDX $44
  // $808D: DEX
  // $808E: STX $2005
  // $8091: LDY #$16
  // $8093: JSR $A1CB
  // $8096: LDA $79
  // $8098: BEQ $80AA
  // $809A: ASL A
  // $809B: STA $C000
  // $809E: STA $C001
  // $80A1: STA $E001
  // $80A4: LDA #$04
  // $80A6: STA $78
  // $80A8: BPL $80AF
  // $80AA: STA $E000
  // $80AD: STA $78
  // $80AF: LDA #$02
  // $80B1: STA $8000
  // $80B4: LDA $9E
  // $80B6: STA $8001
  // $80B9: LDA #$03
  // $80BB: STA $8000
  // $80BE: LDA $9F
  // $80C0: STA $8001
  // $80C3: LDA #$04
  // $80C5: STA $8000
  // $80C8: LDA $A0
  // $80CA: STA $8001
  // $80CD: LDA #$05
  // $80CF: STA $8000
  // $80D2: LDA $A1
  // $80D4: STA $8001
  // $80D7: LDX #$02
  // $80D9: LDA #$04
  // $80DB: STA $40
  // $80DD: LDA $1B,X
  // $80DF: STA $41
  // $80E1: LDA #$01
  // $80E3: STA $4016
  // $80E6: LDA #$00
  // $80E8: STA $4016
  // $80EB: LDY #$08
  // $80ED: LDA $4015,X
  // $80F0: LSR A
  // $80F1: ROL $3F
  // $80F3: AND #$01
  // $80F5: ORA $3F
  // $80F7: STA $3F
  // $80F9: DEY
  // $80FA: BNE $80ED
  // $80FC: CMP $41
  // $80FE: BEQ $8107
  // $8100: DEC $40
  // $8102: BNE $80DF
  // $8104: JMP $A113
  // $8107: LDA $1B,X
  // $8109: EOR $3F
  // $810B: AND $3F
  // $810D: STA $1D,X
  // $810F: LDA $3F
  // $8111: STA $1B,X
  // $8113: DEX
  // $8114: BNE $80DD
  // $8116: CLC
  // $8117: LDA $E1
  // $8119: ADC #$83
  // $811B: STA $E1
  // $811D: LDA $E2
  // $811F: ADC #$0D
  // $8121: STA $E2
  // $8123: LDA $E3
  // $8125: ADC #$11
  // $8127: STA $E3
  // $8129: LDA #$00
  // $812B: STA $46
  // $812D: STA $47
  // $812F: LDA $1B
  // $8131: ORA #$80
  // $8133: STA $1B
  // $8135: INC $3A
  // $8137: RTS
  // $8138: ??? $FF
  // $8139: ??? $FF
  // $813A: ??? $FF
  // $813B: ??? $FF
  // $813C: ??? $FF
  // $813D: ??? $FF
  // $813E: ??? $FF
  // $813F: ??? $FF
  // $8140: ??? $FF
  // $8141: ??? $FF
  // $8142: ??? $FF
  // $8143: ??? $FF
  // $8144: ??? $FF
  // $8145: ??? $FF
  // $8146: ??? $FF
  // $8147: ??? $FF
  // $8148: ??? $FF
  // $8149: ??? $FF
  // $814A: ??? $FF
  // $814B: ??? $FF
  // $814C: ??? $FF
  // $814D: ??? $FF
  // $814E: ??? $FF
  // $814F: ??? $FF
  // $8150: ??? $FF
  // $8151: ??? $FF
  // $8152: ??? $FF
  // $8153: ??? $FF
  // $8154: ??? $FF
  // $8155: ??? $FF
  // $8156: ??? $FF
  // $8157: ??? $FF
  // $8158: ??? $FF
  // $8159: ??? $FF
  // $815A: ??? $FF
  // $815B: ??? $FF
  // $815C: ??? $FF
  // $815D: ??? $FF
  // $815E: ??? $FF
  // $815F: ??? $FF
  // $8160: STA $E000
  // $8163: STA $E001
  // $8166: LDX $78
  // $8168: LDA $78,X
  // $816A: BPL $818D
  // $816C: LDY #$06
  // $816E: DEY
  // $816F: BNE $816E
  // $8171: LDA $79,X
  // $8173: LDY $7A,X
  // $8175: STY $2006
  // $8178: STA $2006
  // $817B: LDA $20
  // $817D: AND #$FC
  // $817F: STA $2000
  // $8182: LDA #$00
  // $8184: STA $2005
  // $8187: STA $2005
  // $818A: JMP $A1A8
  // $818D: LDY #$02
  // $818F: DEY
  // $8190: BNE $818F
  // $8192: LSR $20
  // $8194: LDA $7A,X
  // $8196: LSR A
  // $8197: ROL $20
  // $8199: LDA $20
  // $819B: STA $2000
  // $819E: LDA $79,X
  // $81A0: STA $2005
  // $81A3: LDA #$00
  // $81A5: STA $2005
  // $81A8: LDA $78,X
  // $81AA: AND #$7F
  // $81AC: BEQ $81C0
  // $81AE: CPX #$13
  // $81B0: BEQ $81C0
  // $81B2: INC $78
  // $81B4: INC $78
  // $81B6: INC $78
  // $81B8: ASL A
  // $81B9: STA $C000
  // $81BC: STA $C001
  // $81BF: RTS
  // $81C0: STA $E000
  // $81C3: STA $78
  // $81C5: LDY #$18
  // $81C7: JSR $A1CB
  // $81CA: RTS
  // $81CB: LDX $78,Y
  // $81CD: LDA #$00
  // $81CF: ORA $22
  // $81D1: STA $8000
  // $81D4: STX $8001
  // $81D7: LDX $79,Y
  // $81D9: LDA #$01
  // $81DB: ORA $22
  // $81DD: STA $8000
  // $81E0: STX $8001
  // $81E3: RTS
  // $81E4: ??? $FF
  // $81E5: ??? $FF
  // $81E6: ??? $FF
  // $81E7: ??? $FF
  // $81E8: ??? $FF
  // $81E9: ??? $FF
  // $81EA: ??? $FF
  // $81EB: ??? $FF
  // $81EC: ??? $FF
  // $81ED: ??? $FF
  // $81EE: ??? $FF
  // $81EF: ??? $FF
  // $81F0: ??? $FF
  // $81F1: ??? $FF
  // $81F2: ??? $FF
  // $81F3: ??? $FF
  // $81F4: ??? $FF
  // $81F5: ??? $FF
  // $81F6: ??? $FF
  // $81F7: ??? $FF
  // $81F8: ??? $FF
  // $81F9: ??? $FF
  // $81FA: ??? $FF
  // $81FB: ??? $FF
  // $81FC: ??? $FF
  // $81FD: ??? $FF
  // $81FE: ??? $FF
  // $81FF: ??? $FF
  // $8200: JMP $A21B
  // $8203: JMP $A2AF
  // $8206: JMP $A2E8
  // $8209: JMP $A3D8
  // $820C: JMP $A855
  // $820F: JMP $A86E
  // $8212: JMP $A484
  // $8215: JMP $A8CE
  // $8218: JMP $A8FE
  // $821B: LDX #$FF
  // $821D: TXS
  // $821E: PHA
  // $821F: LDA #$00
  // $8221: STA $A000
  // $8224: LDA $1B
  // $8226: ORA #$40
  // $8228: STA $1B
  // $822A: LDA #$00
  // $822C: LDY #$E8
  // $822E: STA $FF19,Y
  // $8231: INY
  // $8232: BNE $822E
  // $8234: LDA #$00
  // $8236: LDY #$5A
  // $8238: STA $FFE0,Y
  // $823B: INY
  // $823C: BNE $8238
  // $823E: LDA #$98
  // $8240: LDX #$02
  // $8242: LDY #$68
  // $8244: STY $EC
  // $8246: LDY #$04
  // $8248: JSR $AA06
  // $824B: LDA #$0F
  // $824D: LDY #$E0
  // $824F: STA $054A,Y
  // $8252: INY
  // $8253: BNE $824F
  // $8255: JSR $9A43
  // $8258: LDA #$00
  // $825A: STA $4A
  // $825C: STA $4B
  // $825E: JSR $98A0
  // $8261: JSR $9B7F
  // $8264: LDA #$02
  // $8266: STA $8F
  // $8268: STA $91
  // $826A: PLA
  // $826B: BEQ $8281
  // $826D: LDX #$01
  // $826F: LDA #$FF
  // $8271: STA $00,X
  // $8273: LDA #$7F
  // $8275: STA $01,X
  // $8277: LDY #$28
  // $8279: LDA #$00
  // $827B: JSR $9F69
  // $827E: JMP $A292
  // $8281: LDX #$01
  // $8283: LDA #$1E
  // $8285: STA $00,X
  // $8287: LDA #$80
  // $8289: STA $01,X
  // $828B: LDY #$28
  // $828D: LDA #$00
  // $828F: JSR $9F69
  // $8292: LDX #$15
  // $8294: LDA #$EC
  // $8296: STA $00,X
  // $8298: LDA #$82
  // $829A: STA $01,X
  // $829C: LDY #$F0
  // $829E: LDA #$00
  // $82A0: JSR $9F69
  // $82A3: LDA $20
  // $82A5: ORA #$80
  // $82A7: STA $20
  // $82A9: STA $2000
  // $82AC: JMP $9EED
  // $82AF: JSR $99F0
  // $82B2: JSR $98A0
  // $82B5: JSR $9B7F
  // $82B8: LDA $20
  // $82BA: AND #$7F
  // $82BC: STA $2000
  // $82BF: STA $20
  // $82C1: STA $E000
  // $82C4: LDA #$00
  // $82C6: LDY #$E8
  // $82C8: STA $FF19,Y
  // $82CB: INY
  // $82CC: BNE $82C8
  // $82CE: LDA #$00
  // $82D0: LDY #$5A
  // $82D2: STA $FFE0,Y
  // $82D5: INY
  // $82D6: BNE $82D2
  // $82D8: LDA #$98
  // $82DA: LDX #$02
  // $82DC: LDY #$68
  // $82DE: STY $EC
  // $82E0: LDY #$04
  // $82E2: JSR $AA06
  // $82E5: JMP $C557
  // $82E8: LDA $57
  // $82EA: BMI $8338
  // $82EC: STA $ED
  // $82EE: LDA #$00
  // $82F0: LDY #$FA
  // $82F2: STA $FFEC,Y
  // $82F5: INY
  // $82F6: BNE $82F2
  // $82F8: LDA #$01
  // $82FA: JSR $9FA8
  // $82FD: LDY $ED
  // $82FF: LDA #$00
  // $8301: STA $EC
  // $8303: TYA
  // $8304: AND #$0F
  // $8306: LSR A
  // $8307: TAX
  // $8308: LDA $AADF,Y
  // $830B: CLC
  // $830C: ADC $E6,X
  // $830E: STA $E6,X
  // $8310: LDX $EC
  // $8312: LDA $AAE0,Y
  // $8315: ADC $7A,X
  // $8317: STA $7A,X
  // $8319: LDA $AAE0,Y
  // $831C: BPL $8322
  // $831E: LDA #$FF
  // $8320: BNE $8324
  // $8322: LDA #$00
  // $8324: ADC $7B,X
  // $8326: STA $7B,X
  // $8328: INY
  // $8329: INY
  // $832A: LDA $EC
  // $832C: CLC
  // $832D: ADC #$03
  // $832F: STA $EC
  // $8331: CMP #$0F
  // $8333: BNE $8303
  // $8335: JMP $A2F8
  // $8338: CMP #$81
  // $833A: BEQ $83A3
  // $833C: LDX #$67
  // $833E: LDA #$05
  // $8340: JSR $C4BD
  // $8343: LDA #$00
  // $8345: STA $ED
  // $8347: TAY
  // $8348: LDX #$78
  // $834A: LDA $EC
  // $834C: AND #$01
  // $834E: ORA #$F2
  // $8350: STA $0469,X
  // $8353: LDA #$03
  // $8355: STA $046A,X
  // $8358: TYA
  // $8359: STA $0468,X
  // $835C: CLC
  // $835D: ADC #$03
  // $835F: TAY
  // $8360: LDA $EC
  // $8362: STA $046B,X
  // $8365: CLC
  // $8366: ADC #$0D
  // $8368: STA $EC
  // $836A: INX
  // $836B: INX
  // $836C: INX
  // $836D: INX
  // $836E: CPX #$FC
  // $8370: BNE $834A
  // $8372: LDA #$01
  // $8374: JSR $9FA8
  // $8377: LDX #$78
  // $8379: TXA
  // $837A: AND #$0C
  // $837C: TAY
  // $837D: LDA $0468,X
  // $8380: CMP $AB1F,Y
  // $8383: BCC $8387
  // $8385: LDA #$00
  // $8387: CLC
  // $8388: ADC $AB21,Y
  // $838B: STA $0468,X
  // $838E: LDA $046B,X
  // $8391: CLC
  // $8392: ADC $AB22,Y
  // $8395: STA $046B,X
  // $8398: INX
  // $8399: INX
  // $839A: INX
  // $839B: INX
  // $839C: CPX #$FC
  // $839E: BNE $8379
  // $83A0: JMP $A372
  // $83A3: LDA $0568
  // $83A6: ORA #$10
  // $83A8: STA $0568
  // $83AB: LDA #$04
  // $83AD: JSR $9FA8
  // $83B0: LDA #$08
  // $83B2: STA $44
  // $83B4: STA $46
  // $83B6: LDA $056D
  // $83B9: SEC
  // $83BA: SBC #$04
  // $83BC: STA $056D
  // $83BF: LDA #$04
  // $83C1: JSR $9FA8
  // $83C4: LDA #$00
  // $83C6: STA $44
  // $83C8: LDA #$F8
  // $83CA: STA $46
  // $83CC: LDA $056D
  // $83CF: CLC
  // $83D0: ADC #$04
  // $83D2: STA $056D
  // $83D5: JMP $A3AB
  // $83D8: JSR $99F0
  // $83DB: LDA #$61
  // $83DD: JSR $8464
  // $83E0: JSR $82A9
  // $83E3: LDY #$F8
  // $83E5: LDA $A384,Y
  // $83E8: STA $0460,Y
  // $83EB: INY
  // $83EC: BNE $83E5
  // $83EE: LDA #$00
  // $83F0: STA $E7
  // $83F2: JSR $A454
  // $83F5: LDA #$01
  // $83F7: JSR $9FA8
  // $83FA: LDA $1E
  // $83FC: AND #$10
  // $83FE: BNE $8445
  return [
    0xA9, 0x00, 0x8D, 0x03, 0x20, 0xA9, 0x02, 0x8D, 0x14, 0x40, 0xAD, 0x28, 0x06, 0xF0, 0x4E, 0x2C,
    0x29, 0x06, 0x70, 0x49, 0xA9, 0x00, 0x8D, 0x01, 0x20, 0xA2, 0x00, 0xA0, 0x80, 0xBD, 0xE8, 0x05,
    0x10, 0x04, 0x29, 0x3F, 0xA0, 0x84, 0x8C, 0x00, 0x20, 0xA8, 0xBD, 0xEA, 0x05, 0x8D, 0x06, 0x20,
    0xBD, 0xE9, 0x05, 0x8D, 0x06, 0x20, 0xBD, 0xEB, 0x05, 0x8D, 0x07, 0x20, 0xE8, 0x88, 0xD0, 0xF6,
    0xE8, 0xE8, 0xE8, 0xBD, 0xE8, 0x05, 0xD0, 0xD3, 0xA9, 0x00, 0x8D, 0x28, 0x06, 0xA9, 0x3F, 0x8D,
    0x06, 0x20, 0xA9, 0x00, 0x8D, 0x06, 0x20, 0x8D, 0x06, 0x20, 0x8D, 0x06, 0x20, 0xA5, 0x21, 0x8D,
    0x01, 0x20, 0xA5, 0x79, 0x10, 0x0D, 0xA5, 0x7B, 0x8D, 0x06, 0x20, 0xA5, 0x7A, 0x8D, 0x06, 0x20,
    0x4C, 0x91, 0xA0, 0x46, 0x20, 0x46, 0x20, 0xA5, 0x45, 0x4A, 0x26, 0x20, 0xA5, 0x7B, 0x4A, 0x26,
    0x20, 0xA5, 0x20, 0x8D, 0x00, 0x20, 0xA5, 0x7A, 0x8D, 0x05, 0x20, 0xA6, 0x44, 0xCA, 0x8E, 0x05,
    0x20, 0xA0, 0x16, 0x20, 0xCB, 0xA1, 0xA5, 0x79, 0xF0, 0x10, 0x0A, 0x8D, 0x00, 0xC0, 0x8D, 0x01,
    0xC0, 0x8D, 0x01, 0xE0, 0xA9, 0x04, 0x85, 0x78, 0x10, 0x05, 0x8D, 0x00, 0xE0, 0x85, 0x78, 0xA9,
    0x02, 0x8D, 0x00, 0x80, 0xA5, 0x9E, 0x8D, 0x01, 0x80, 0xA9, 0x03, 0x8D, 0x00, 0x80, 0xA5, 0x9F,
    0x8D, 0x01, 0x80, 0xA9, 0x04, 0x8D, 0x00, 0x80, 0xA5, 0xA0, 0x8D, 0x01, 0x80, 0xA9, 0x05, 0x8D,
    0x00, 0x80, 0xA5, 0xA1, 0x8D, 0x01, 0x80, 0xA2, 0x02, 0xA9, 0x04, 0x85, 0x40, 0xB5, 0x1B, 0x85,
    0x41, 0xA9, 0x01, 0x8D, 0x16, 0x40, 0xA9, 0x00, 0x8D, 0x16, 0x40, 0xA0, 0x08, 0xBD, 0x15, 0x40,
    0x4A, 0x26, 0x3F, 0x29, 0x01, 0x05, 0x3F, 0x85, 0x3F, 0x88, 0xD0, 0xF1, 0xC5, 0x41, 0xF0, 0x07,
    0xC6, 0x40, 0xD0, 0xDB, 0x4C, 0x13, 0xA1, 0xB5, 0x1B, 0x45, 0x3F, 0x25, 0x3F, 0x95, 0x1D, 0xA5,
    0x3F, 0x95, 0x1B, 0xCA, 0xD0, 0xC7, 0x18, 0xA5, 0xE1, 0x69, 0x83, 0x85, 0xE1, 0xA5, 0xE2, 0x69,
    0x0D, 0x85, 0xE2, 0xA5, 0xE3, 0x69, 0x11, 0x85, 0xE3, 0xA9, 0x00, 0x85, 0x46, 0x85, 0x47, 0xA5,
    0x1B, 0x09, 0x80, 0x85, 0x1B, 0xE6, 0x3A, 0x60, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0x8D, 0x00, 0xE0, 0x8D, 0x01, 0xE0, 0xA6, 0x78, 0xB5, 0x78, 0x10, 0x21, 0xA0, 0x06, 0x88, 0xD0,
    0xFD, 0xB5, 0x79, 0xB4, 0x7A, 0x8C, 0x06, 0x20, 0x8D, 0x06, 0x20, 0xA5, 0x20, 0x29, 0xFC, 0x8D,
    0x00, 0x20, 0xA9, 0x00, 0x8D, 0x05, 0x20, 0x8D, 0x05, 0x20, 0x4C, 0xA8, 0xA1, 0xA0, 0x02, 0x88,
    0xD0, 0xFD, 0x46, 0x20, 0xB5, 0x7A, 0x4A, 0x26, 0x20, 0xA5, 0x20, 0x8D, 0x00, 0x20, 0xB5, 0x79,
    0x8D, 0x05, 0x20, 0xA9, 0x00, 0x8D, 0x05, 0x20, 0xB5, 0x78, 0x29, 0x7F, 0xF0, 0x12, 0xE0, 0x13,
    0xF0, 0x0E, 0xE6, 0x78, 0xE6, 0x78, 0xE6, 0x78, 0x0A, 0x8D, 0x00, 0xC0, 0x8D, 0x01, 0xC0, 0x60,
    0x8D, 0x00, 0xE0, 0x85, 0x78, 0xA0, 0x18, 0x20, 0xCB, 0xA1, 0x60, 0xB6, 0x78, 0xA9, 0x00, 0x05,
    0x22, 0x8D, 0x00, 0x80, 0x8E, 0x01, 0x80, 0xB6, 0x79, 0xA9, 0x01, 0x05, 0x22, 0x8D, 0x00, 0x80,
    0x8E, 0x01, 0x80, 0x60, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0x4C, 0x1B, 0xA2, 0x4C, 0xAF, 0xA2, 0x4C, 0xE8, 0xA2, 0x4C, 0xD8, 0xA3, 0x4C, 0x55, 0xA8, 0x4C,
    0x6E, 0xA8, 0x4C, 0x84, 0xA4, 0x4C, 0xCE, 0xA8, 0x4C, 0xFE, 0xA8, 0xA2, 0xFF, 0x9A, 0x48, 0xA9,
    0x00, 0x8D, 0x00, 0xA0, 0xA5, 0x1B, 0x09, 0x40, 0x85, 0x1B, 0xA9, 0x00, 0xA0, 0xE8, 0x99, 0x19,
    0xFF, 0xC8, 0xD0, 0xFA, 0xA9, 0x00, 0xA0, 0x5A, 0x99, 0xE0, 0xFF, 0xC8, 0xD0, 0xFA, 0xA9, 0x98,
    0xA2, 0x02, 0xA0, 0x68, 0x84, 0xEC, 0xA0, 0x04, 0x20, 0x06, 0xAA, 0xA9, 0x0F, 0xA0, 0xE0, 0x99,
    0x4A, 0x05, 0xC8, 0xD0, 0xFA, 0x20, 0x43, 0x9A, 0xA9, 0x00, 0x85, 0x4A, 0x85, 0x4B, 0x20, 0xA0,
    0x98, 0x20, 0x7F, 0x9B, 0xA9, 0x02, 0x85, 0x8F, 0x85, 0x91, 0x68, 0xF0, 0x14, 0xA2, 0x01, 0xA9,
    0xFF, 0x95, 0x00, 0xA9, 0x7F, 0x95, 0x01, 0xA0, 0x28, 0xA9, 0x00, 0x20, 0x69, 0x9F, 0x4C, 0x92,
    0xA2, 0xA2, 0x01, 0xA9, 0x1E, 0x95, 0x00, 0xA9, 0x80, 0x95, 0x01, 0xA0, 0x28, 0xA9, 0x00, 0x20,
    0x69, 0x9F, 0xA2, 0x15, 0xA9, 0xEC, 0x95, 0x00, 0xA9, 0x82, 0x95, 0x01, 0xA0, 0xF0, 0xA9, 0x00,
    0x20, 0x69, 0x9F, 0xA5, 0x20, 0x09, 0x80, 0x85, 0x20, 0x8D, 0x00, 0x20, 0x4C, 0xED, 0x9E, 0x20,
    0xF0, 0x99, 0x20, 0xA0, 0x98, 0x20, 0x7F, 0x9B, 0xA5, 0x20, 0x29, 0x7F, 0x8D, 0x00, 0x20, 0x85,
    0x20, 0x8D, 0x00, 0xE0, 0xA9, 0x00, 0xA0, 0xE8, 0x99, 0x19, 0xFF, 0xC8, 0xD0, 0xFA, 0xA9, 0x00,
    0xA0, 0x5A, 0x99, 0xE0, 0xFF, 0xC8, 0xD0, 0xFA, 0xA9, 0x98, 0xA2, 0x02, 0xA0, 0x68, 0x84, 0xEC,
    0xA0, 0x04, 0x20, 0x06, 0xAA, 0x4C, 0x57, 0xC5, 0xA5, 0x57, 0x30, 0x4C, 0x85, 0xED, 0xA9, 0x00,
    0xA0, 0xFA, 0x99, 0xEC, 0xFF, 0xC8, 0xD0, 0xFA, 0xA9, 0x01, 0x20, 0xA8, 0x9F, 0xA4, 0xED, 0xA9,
    0x00, 0x85, 0xEC, 0x98, 0x29, 0x0F, 0x4A, 0xAA, 0xB9, 0xDF, 0xAA, 0x18, 0x75, 0xE6, 0x95, 0xE6,
    0xA6, 0xEC, 0xB9, 0xE0, 0xAA, 0x75, 0x7A, 0x95, 0x7A, 0xB9, 0xE0, 0xAA, 0x10, 0x04, 0xA9, 0xFF,
    0xD0, 0x02, 0xA9, 0x00, 0x75, 0x7B, 0x95, 0x7B, 0xC8, 0xC8, 0xA5, 0xEC, 0x18, 0x69, 0x03, 0x85,
    0xEC, 0xC9, 0x0F, 0xD0, 0xCE, 0x4C, 0xF8, 0xA2, 0xC9, 0x81, 0xF0, 0x67, 0xA2, 0x67, 0xA9, 0x05,
    0x20, 0xBD, 0xC4, 0xA9, 0x00, 0x85, 0xED, 0xA8, 0xA2, 0x78, 0xA5, 0xEC, 0x29, 0x01, 0x09, 0xF2,
    0x9D, 0x69, 0x04, 0xA9, 0x03, 0x9D, 0x6A, 0x04, 0x98, 0x9D, 0x68, 0x04, 0x18, 0x69, 0x03, 0xA8,
    0xA5, 0xEC, 0x9D, 0x6B, 0x04, 0x18, 0x69, 0x0D, 0x85, 0xEC, 0xE8, 0xE8, 0xE8, 0xE8, 0xE0, 0xFC,
    0xD0, 0xD8, 0xA9, 0x01, 0x20, 0xA8, 0x9F, 0xA2, 0x78, 0x8A, 0x29, 0x0C, 0xA8, 0xBD, 0x68, 0x04,
    0xD9, 0x1F, 0xAB, 0x90, 0x02, 0xA9, 0x00, 0x18, 0x79, 0x21, 0xAB, 0x9D, 0x68, 0x04, 0xBD, 0x6B,
    0x04, 0x18, 0x79, 0x22, 0xAB, 0x9D, 0x6B, 0x04, 0xE8, 0xE8, 0xE8, 0xE8, 0xE0, 0xFC, 0xD0, 0xD9,
    0x4C, 0x72, 0xA3, 0xAD, 0x68, 0x05, 0x09, 0x10, 0x8D, 0x68, 0x05, 0xA9, 0x04, 0x20, 0xA8, 0x9F,
    0xA9, 0x08, 0x85, 0x44, 0x85, 0x46, 0xAD, 0x6D, 0x05, 0x38, 0xE9, 0x04, 0x8D, 0x6D, 0x05, 0xA9,
    0x04, 0x20, 0xA8, 0x9F, 0xA9, 0x00, 0x85, 0x44, 0xA9, 0xF8, 0x85, 0x46, 0xAD, 0x6D, 0x05, 0x18,
    0x69, 0x04, 0x8D, 0x6D, 0x05, 0x4C, 0xAB, 0xA3, 0x20, 0xF0, 0x99, 0xA9, 0x61, 0x20, 0x64, 0x84,
    0x20, 0xA9, 0x82, 0xA0, 0xF8, 0xB9, 0x84, 0xA3, 0x99, 0x60, 0x04, 0xC8, 0xD0, 0xF7, 0xA9, 0x00,
    0x85, 0xE7, 0x20, 0x54, 0xA4, 0xA9, 0x01, 0x20, 0xA8, 0x9F, 0xA5, 0x1E, 0x29, 0x10, 0xD0, 0x45
  ];
}

// ════════ $8400-$87FF (1024B): 场景分派器(JMP表) + 场景子程序 ═══════=
function build_8400_87FF_sceneDispatcher(): readonly number[] {
  // $8400: BIT $1E
  // $8402: BMI $840B
  // $8404: LDA #$01
  // $8406: BVS $8410
  // $8408: JMP $A413
  // $840B: LDX $E7
  // $840D: LDA $AB2F,X
  // $8410: STA $0700
  // $8413: JSR $AA20
  // $8416: BCC $83F5
  // $8418: LDX #$10
  // $841A: STX $E6
  // $841C: TAY
  // $841D: CLC
  // $841E: ADC $E7
  // $8420: CMP #$64
  // $8422: BCC $842D
  // $8424: TYA
  // $8425: BMI $842B
  // $8427: LDA #$00
  // $8429: BEQ $842D
  // $842B: LDA #$63
  // $842D: STA $E7
  // $842F: JSR $A454
  // $8432: LDA #$01
  // $8434: JSR $9FA8
  // $8437: JSR $AA20
  // $843A: BCC $83F5
  // $843C: DEC $E6
  // $843E: BNE $8432
  // $8440: LDX #$04
  // $8442: JMP $A41A
  // $8445: LDA #$01
  // $8447: STA $0700
  // $844A: LDA #$00
  // $844C: STA $4C
  // $844E: JSR $99F0
  // $8451: JMP $8053
  // $8454: LDA $E7
  // $8456: JSR $9E7C
  // $8459: LDA $EC
  // $845B: LSR A
  // $845C: LSR A
  // $845D: LSR A
  // $845E: LSR A
  // $845F: TAY
  // $8460: LDA $A472,Y
  // $8463: STA $0559
  // $8466: LDA $EC
  // $8468: AND #$0F
  // $846A: TAY
  // $846B: LDA $A472,Y
  // $846E: STA $055D
  // $8471: RTS
  // $8472: BPL $848C
  // $8474: ORA $1B1A,Y
  // $8477: ??? $1C
  // $8478: ORA $1F1E,X
  // $847B: JSR $1080
  // $847E: ??? $03
  // $847F: BCC $8401
  // $8481: BPL $8486
  // $8483: TYA
  // $8484: LDA $ED
  // $8486: ASL A
  // $8487: TAX
  // $8488: LDA $A492,X
  // $848B: PHA
  // $848C: LDA $A491,X
  // $848F: PHA
  // $8490: RTS
  // $8491: CPY #$A4
  // $8493: EOR $7BA5,Y
  // $8496: LDA $81
  // $8498: LDA $A2
  // $849A: LDA $A8
  // $849C: LDA $B0
  // $849E: LDA $B8
  // $84A0: LDA $BF
  // $84A2: LDA $CD
  // $84A4: LDA $DB
  // $84A6: LDA $E8
  // $84A8: LDA $02
  // $84AA: LDX $1C
  // $84AC: LDX $29
  // $84AE: LDX $50
  // $84B0: LDX $9C
  // $84B2: LDX $7A
  // $84B4: ??? $A7
  // $84B5: ??? $82
  // $84B6: ??? $A7
  // $84B7: STA $BDA7
  // $84BA: ??? $A7
  // $84BB: DEC $D6A7
  // $84BE: ??? $A7
  // $84BF: ??? $FA
  // $84C0: ??? $A7
  // $84C1: JSR $9A0D
  // $84C4: LDA #$10
  // $84C6: JSR $9FA8
  // $84C9: LDY #$30
  // $84CB: LDA #$01
  // $84CD: JSR $9FA8
  // $84D0: LDA #$01
  // $84D2: JSR $890C
  // $84D5: DEY
  // $84D6: BNE $84CB
  // $84D8: LDA #$00
  // $84DA: STA $5B
  // $84DC: STA $7B
  // $84DE: LDA #$17
  // $84E0: JSR $8AF7
  // $84E3: LDA #$68
  // $84E5: STA $44
  // $84E7: LDA #$03
  // $84E9: JSR $8920
  // $84EC: LDA $8E
  // $84EE: STA $90
  // $84F0: LDA $8F
  // $84F2: STA $91
  // $84F4: LDA #$04
  // $84F6: JSR $9FA8
  // $84F9: JSR $9A35
  // $84FC: JSR $88FB
  // $84FF: LDA #$01
  // $8501: JSR $9FA8
  // $8504: INC $79
  // $8506: DEC $7C
  // $8508: DEC $7C
  // $850A: LDA $44
  // $850C: SEC
  // $850D: SBC #$02
  // $850F: STA $44
  // $8511: CMP #$03
  // $8513: BCS $84FF
  // $8515: LDA #$00
  // $8517: JSR $8920
  // $851A: LDA $1B
  // $851C: ORA #$01
  // $851E: STA $1B
  // $8520: LDA #$F0
  // $8522: JSR $9FA8
  // $8525: LDA #$3C
  // $8527: JSR $9FA8
  // $852A: LDA $1B
  // $852C: AND #$FE
  // $852E: STA $1B
  // $8530: LDA #$00
  // $8532: STA $90
  // $8534: LDA #$02
  // $8536: STA $91
  // $8538: JSR $99F0
  // $853B: JSR $9B7F
  // $853E: JSR $98A0
  // $8541: LDA #$C0
  // $8543: STA $E6
  // $8545: LDA #$23
  // $8547: STA $E7
  // $8549: LDY #$02
  // $854B: LDX #$20
  // $854D: LDA #$55
  // $854F: JSR $98EA
  // $8552: LDA #$01
  // $8554: JSR $8920
  // $8557: LDA #$02
  // $8559: RTS
  // $855A: LDA #$00
  // $855C: STA $60
  // $855E: LDA $EC
  // $8560: LSR A
  // $8561: ROR $60
  // $8563: LSR A
  // $8564: ROR $60
  // $8566: STA $61
  // $8568: BIT $62
  // $856A: BMI $8579
  // $856C: LDA #$00
  // $856E: SEC
  // $856F: SBC $60
  // $8571: STA $60
  // $8573: LDA #$00
  // $8575: SBC $61
  // $8577: STA $61
  // $8579: LDA #$03
  // $857B: RTS
  // $857C: JSR $9B91
  // $857F: LDA #$02
  // $8581: RTS
  // $8582: LDA #$00
  // $8584: STA $E6
  // $8586: LDA #$20
  // $8588: STA $E7
  // $858A: LDY #$10
  // $858C: LDX #$20
  // $858E: JSR $98E8
  // $8591: LDA #$00
  // $8593: STA $E6
  // $8595: LDA #$24
  // $8597: STA $E7
  // $8599: LDY #$20
  // $859B: LDX #$20
  // $859D: JSR $98E8
  // $85A0: LDA #$02
  // $85A2: RTS
  // $85A3: JSR $9B7F
  // $85A6: LDA #$02
  // $85A8: RTS
  // $85A9: LDX #$09
  // $85AB: JSR $9F96
  // $85AE: LDA #$02
  // $85B0: RTS
  // $85B1: LDX #$09
  // $85B3: JSR $9F89
  // $85B6: LDA #$02
  // $85B8: RTS
  // $85B9: LDA #$FF
  // $85BB: STA $99
  // $85BD: LDA #$02
  // $85BF: RTS
  // $85C0: LDA #$00
  // $85C2: STA $A000
  // $85C5: LDA $1B
  // $85C7: AND #$BF
  // $85C9: STA $1B
  // $85CB: LDA #$02
  // $85CD: RTS
  // $85CE: LDA #$01
  // $85D0: STA $A000
  // $85D3: LDA $1B
  // $85D5: ORA #$40
  // $85D7: STA $1B
  // $85D9: LDA #$02
  // $85DB: RTS
  // $85DC: LDA #$00
  // $85DE: JSR $8895
  // $85E1: LDA #$05
  // $85E3: JSR $8920
  // $85E6: LDA #$02
  // $85E8: RTS
  // $85E9: LDA $0D
  // $85EB: BNE $85FA
  // $85ED: LDA #$10
  // $85EF: JSR $8895
  // $85F2: LDA #$06
  // $85F4: JSR $8920
  // $85F7: LDA #$02
  // $85F9: RTS
  // $85FA: LDA #$00
  // $85FC: STA $0D
  // $85FE: STA $0E
  // $8600: LDA #$02
  // $8602: RTS
  // $8603: LDA $0D
  // $8605: BNE $8614
  // $8607: LDA #$30
  // $8609: JSR $8895
  // $860C: LDA #$08
  // $860E: JSR $8920
  // $8611: LDA #$02
  // $8613: RTS
  // $8614: LDA #$00
  // $8616: STA $0D
  // $8618: STA $0E
  // $861A: LDA #$02
  // $861C: RTS
  // $861D: LDA #$20
  // $861F: JSR $8895
  // $8622: LDA #$07
  // $8624: JSR $8920
  // $8627: LDA #$02
  // $8629: RTS
  // $862A: LDX #$BD
  // $862C: LDY #$23
  // $862E: JSR $8976
  // $8631: JSR $9A35
  // $8634: LDA #$01
  // $8636: JSR $9FA8
  // $8639: LDA $058F
  // $863C: AND #$7F
  // $863E: STA $058F
  // $8641: LDA #$82
  // $8643: STA $4C
  // $8645: LDY #$28
  // $8647: LDX #$20
  // $8649: LDA #$C8
  // $864B: JSR $A82F
  // $864E: LDA #$02
  // $8650: RTS
  // $8651: LDA #$00
  // $8653: STA $ED
  // $8655: LDY $ED
  // $8657: LDA $AA97,Y
  // $865A: STA $EA
  // $865C: AND #$7F
  // $865E: STA $EB
  // $8660: LDA $7B
  // $8662: AND #$01
  // $8664: ASL A
  // $8665: ASL A
  // $8666: ORA $EB
  // $8668: TAX
  // $8669: INY
  // $866A: LDA $AA97,Y
  // $866D: STA $EB
  // $866F: INY
  // $8670: LDA $AA97,Y
  // $8673: INY
  // $8674: STY $ED
  // $8676: LDY $EB
  // $8678: JSR $9B28
  // $867B: AND #$7F
  // $867D: STA $EB
  // $867F: LDA #$00
  // $8681: STA $05E8,X
  // $8684: INX
  // $8685: DEC $EB
  // $8687: BNE $8681
  // $8689: JSR $9B5E
  // $868C: BIT $EA
  // $868E: BMI $869A
  // $8690: BVC $8655
  // $8692: LDA #$02
  // $8694: JSR $9FA8
  // $8697: JMP $A655
  // $869A: LDA #$02
  // $869C: RTS
  // $869D: LDA $04E5
  // $86A0: CMP #$FF
  // $86A2: BEQ $86D4
  // $86A4: JSR $A767
  // $86A7: LDY #$80
  // $86A9: LDA #$00
  // $86AB: STA $EA
  // $86AD: LDX #$2F
  // $86AF: LDA #$FF
  // $86B1: STA $ED
  // $86B3: LDA #$FE
  // $86B5: STA $EC
  // $86B7: LDA #$07
  // $86B9: STA $EB
  // $86BB: LDA #$F7
  // $86BD: JSR $A72C
  // $86C0: LDY #$D8
  // $86C2: LDX #$30
  // $86C4: LDA #$01
  // $86C6: STA $ED
  // $86C8: LDA #$FF
  // $86CA: STA $EC
  // $86CC: LDA #$FC
  // $86CE: JSR $A72C
  // $86D1: LDA #$02
  // $86D3: RTS
  // $86D4: JSR $A767
  // $86D7: LDY #$80
  // $86D9: LDX #$2F
  // $86DB: LDA #$02
  // $86DD: STA $EA
  // $86DF: LDA #$FF
  // $86E1: STA $ED
  // $86E3: LDA #$FE
  // $86E5: STA $EC
  // $86E7: LDA #$07
  // $86E9: STA $EB
  // $86EB: LDA #$F7
  // $86ED: JSR $A72C
  // $86F0: LDX #$08
  // $86F2: LDA #$FE
  // $86F4: JSR $A72C
  // $86F7: LDY #$FC
  // $86F9: LDA $A67B,Y
  // $86FC: STA $0460,Y
  // $86FF: INY
  // $8700: BNE $86F9
  // $8702: LDY #$B8
  // $8704: LDX #$1C
  // $8706: LDA #$02
  // $8708: STA $ED
  // $870A: LDA #$FF
  // $870C: STA $EC
  // $870E: LDA #$03
  // $8710: STA $EB
  // $8712: LDA #$F6
  // $8714: JSR $A72C
  // $8717: LDY #$D8
  // $8719: LDA $046A,Y
  // $871C: ORA #$02
  // $871E: STA $046A,Y
  // $8721: INY
  // $8722: INY
  // $8723: INY
  // $8724: INY
  // $8725: CPY #$F0
  // $8727: BCC $8719
  // $8729: LDA #$02
  // $872B: RTS
  // $872C: STA $E9
  // $872E: LDA $04E4
  // $8731: CLC
  // $8732: ADC $ED
  // $8734: STA $04E4
  // $8737: LDA $04E7
  // $873A: CLC
  // $873B: ADC $EC
  // $873D: STA $04E7
  // $8740: AND $EB
  // $8742: BNE $875E
  // $8744: LDA $04E4
  // $8747: STA $0468,Y
  // $874A: LDA $E9
  // $874C: STA $0469,Y
  // $874F: LDA $EA
  // $8751: STA $046A,Y
  // $8754: LDA $04E7
  // $8757: STA $046B,Y
  // $875A: INY
  // $875B: INY
  // $875C: INY
  // $875D: INY
  // $875E: LDA #$01
  // $8760: JSR $9FA8
  // $8763: DEX
  // $8764: BNE $872E
  // $8766: RTS
  // $8767: LDY #$FC
  // $8769: LDA $A677,Y
  // $876C: STA $03E8,Y
  // $876F: INY
  // $8770: BNE $8769
  // $8772: RTS
  // $8773: ADC $03FF,Y
  // $8776: ??? $C2
  // $8777: LSR $F6
  // $8779: ??? $02
  // $877A: ??? $52
  // $877B: LDA #$80
  // $877D: JSR $8895
  // $8780: LDA #$02
  // $8782: RTS
  // $8783: LDA #$02
  // $8785: JSR $9FA8
  // $8788: JSR $88FB
  // $878B: LDA #$02
  // $878D: RTS
  // $878E: LDY #$40
  // $8790: LDA #$01
  // $8792: JSR $9FA8
  // $8795: LDX #$20
  // $8797: LDA $0468,X
  // $879A: BPL $87A4
  // $879C: LDA $046A,X
  // $879F: ORA #$08
  // $87A1: STA $046A,X
  // $87A4: INX
  // $87A5: INX
  // $87A6: INX
  // $87A7: INX
  // $87A8: CPX #$C4
  // $87AA: BNE $8797
  // $87AC: DEY
  // $87AD: BNE $8790
  // $87AF: JSR $9B91
  // $87B2: LDA #$01
  // $87B4: JSR $9FA8
  // $87B7: LDA $09
  // $87B9: BNE $87B2
  // $87BB: JMP $A651
  // $87BE: LDA #$01
  // $87C0: JSR $9FA8
  // $87C3: LDY #$28
  // $87C5: LDX #$64
  // $87C7: LDA #$B0
  // $87C9: JSR $A82F
  // $87CC: LDA #$02
  // $87CE: RTS
  // $87CF: LDA #$81
  // $87D1: JSR $8895
  // $87D4: LDA #$02
  // $87D6: RTS
  // $87D7: LDY #$80
  // $87D9: LDA #$01
  // $87DB: JSR $9FA8
  // $87DE: LDX #$20
  // $87E0: LDA $0468,X
  // $87E3: BPL $87ED
  // $87E5: LDA $046A,X
  // $87E8: ORA #$04
  // $87EA: STA $046A,X
  // $87ED: INX
  // $87EE: INX
  // $87EF: INX
  // $87F0: INX
  // $87F1: CPX #$C4
  // $87F3: BNE $87E0
  // $87F5: DEY
  // $87F6: BNE $87D9
  // $87F8: LDA #$02
  // $87FA: RTS
  // $87FB: LDA $28
  // $87FD: JSR $9E7C
  return [
    0x24, 0x1E, 0x30, 0x07, 0xA9, 0x01, 0x70, 0x08, 0x4C, 0x13, 0xA4, 0xA6, 0xE7, 0xBD, 0x2F, 0xAB,
    0x8D, 0x00, 0x07, 0x20, 0x20, 0xAA, 0x90, 0xDD, 0xA2, 0x10, 0x86, 0xE6, 0xA8, 0x18, 0x65, 0xE7,
    0xC9, 0x64, 0x90, 0x09, 0x98, 0x30, 0x04, 0xA9, 0x00, 0xF0, 0x02, 0xA9, 0x63, 0x85, 0xE7, 0x20,
    0x54, 0xA4, 0xA9, 0x01, 0x20, 0xA8, 0x9F, 0x20, 0x20, 0xAA, 0x90, 0xB9, 0xC6, 0xE6, 0xD0, 0xF2,
    0xA2, 0x04, 0x4C, 0x1A, 0xA4, 0xA9, 0x01, 0x8D, 0x00, 0x07, 0xA9, 0x00, 0x85, 0x4C, 0x20, 0xF0,
    0x99, 0x4C, 0x53, 0x80, 0xA5, 0xE7, 0x20, 0x7C, 0x9E, 0xA5, 0xEC, 0x4A, 0x4A, 0x4A, 0x4A, 0xA8,
    0xB9, 0x72, 0xA4, 0x8D, 0x59, 0x05, 0xA5, 0xEC, 0x29, 0x0F, 0xA8, 0xB9, 0x72, 0xA4, 0x8D, 0x5D,
    0x05, 0x60, 0x10, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F, 0x20, 0x80, 0x10, 0x03, 0x90,
    0x80, 0x10, 0x03, 0x98, 0xA5, 0xED, 0x0A, 0xAA, 0xBD, 0x92, 0xA4, 0x48, 0xBD, 0x91, 0xA4, 0x48,
    0x60, 0xC0, 0xA4, 0x59, 0xA5, 0x7B, 0xA5, 0x81, 0xA5, 0xA2, 0xA5, 0xA8, 0xA5, 0xB0, 0xA5, 0xB8,
    0xA5, 0xBF, 0xA5, 0xCD, 0xA5, 0xDB, 0xA5, 0xE8, 0xA5, 0x02, 0xA6, 0x1C, 0xA6, 0x29, 0xA6, 0x50,
    0xA6, 0x9C, 0xA6, 0x7A, 0xA7, 0x82, 0xA7, 0x8D, 0xA7, 0xBD, 0xA7, 0xCE, 0xA7, 0xD6, 0xA7, 0xFA,
    0xA7, 0x20, 0x0D, 0x9A, 0xA9, 0x10, 0x20, 0xA8, 0x9F, 0xA0, 0x30, 0xA9, 0x01, 0x20, 0xA8, 0x9F,
    0xA9, 0x01, 0x20, 0x0C, 0x89, 0x88, 0xD0, 0xF3, 0xA9, 0x00, 0x85, 0x5B, 0x85, 0x7B, 0xA9, 0x17,
    0x20, 0xF7, 0x8A, 0xA9, 0x68, 0x85, 0x44, 0xA9, 0x03, 0x20, 0x20, 0x89, 0xA5, 0x8E, 0x85, 0x90,
    0xA5, 0x8F, 0x85, 0x91, 0xA9, 0x04, 0x20, 0xA8, 0x9F, 0x20, 0x35, 0x9A, 0x20, 0xFB, 0x88, 0xA9,
    0x01, 0x20, 0xA8, 0x9F, 0xE6, 0x79, 0xC6, 0x7C, 0xC6, 0x7C, 0xA5, 0x44, 0x38, 0xE9, 0x02, 0x85,
    0x44, 0xC9, 0x03, 0xB0, 0xEA, 0xA9, 0x00, 0x20, 0x20, 0x89, 0xA5, 0x1B, 0x09, 0x01, 0x85, 0x1B,
    0xA9, 0xF0, 0x20, 0xA8, 0x9F, 0xA9, 0x3C, 0x20, 0xA8, 0x9F, 0xA5, 0x1B, 0x29, 0xFE, 0x85, 0x1B,
    0xA9, 0x00, 0x85, 0x90, 0xA9, 0x02, 0x85, 0x91, 0x20, 0xF0, 0x99, 0x20, 0x7F, 0x9B, 0x20, 0xA0,
    0x98, 0xA9, 0xC0, 0x85, 0xE6, 0xA9, 0x23, 0x85, 0xE7, 0xA0, 0x02, 0xA2, 0x20, 0xA9, 0x55, 0x20,
    0xEA, 0x98, 0xA9, 0x01, 0x20, 0x20, 0x89, 0xA9, 0x02, 0x60, 0xA9, 0x00, 0x85, 0x60, 0xA5, 0xEC,
    0x4A, 0x66, 0x60, 0x4A, 0x66, 0x60, 0x85, 0x61, 0x24, 0x62, 0x30, 0x0D, 0xA9, 0x00, 0x38, 0xE5,
    0x60, 0x85, 0x60, 0xA9, 0x00, 0xE5, 0x61, 0x85, 0x61, 0xA9, 0x03, 0x60, 0x20, 0x91, 0x9B, 0xA9,
    0x02, 0x60, 0xA9, 0x00, 0x85, 0xE6, 0xA9, 0x20, 0x85, 0xE7, 0xA0, 0x10, 0xA2, 0x20, 0x20, 0xE8,
    0x98, 0xA9, 0x00, 0x85, 0xE6, 0xA9, 0x24, 0x85, 0xE7, 0xA0, 0x20, 0xA2, 0x20, 0x20, 0xE8, 0x98,
    0xA9, 0x02, 0x60, 0x20, 0x7F, 0x9B, 0xA9, 0x02, 0x60, 0xA2, 0x09, 0x20, 0x96, 0x9F, 0xA9, 0x02,
    0x60, 0xA2, 0x09, 0x20, 0x89, 0x9F, 0xA9, 0x02, 0x60, 0xA9, 0xFF, 0x85, 0x99, 0xA9, 0x02, 0x60,
    0xA9, 0x00, 0x8D, 0x00, 0xA0, 0xA5, 0x1B, 0x29, 0xBF, 0x85, 0x1B, 0xA9, 0x02, 0x60, 0xA9, 0x01,
    0x8D, 0x00, 0xA0, 0xA5, 0x1B, 0x09, 0x40, 0x85, 0x1B, 0xA9, 0x02, 0x60, 0xA9, 0x00, 0x20, 0x95,
    0x88, 0xA9, 0x05, 0x20, 0x20, 0x89, 0xA9, 0x02, 0x60, 0xA5, 0x0D, 0xD0, 0x0D, 0xA9, 0x10, 0x20,
    0x95, 0x88, 0xA9, 0x06, 0x20, 0x20, 0x89, 0xA9, 0x02, 0x60, 0xA9, 0x00, 0x85, 0x0D, 0x85, 0x0E,
    0xA9, 0x02, 0x60, 0xA5, 0x0D, 0xD0, 0x0D, 0xA9, 0x30, 0x20, 0x95, 0x88, 0xA9, 0x08, 0x20, 0x20,
    0x89, 0xA9, 0x02, 0x60, 0xA9, 0x00, 0x85, 0x0D, 0x85, 0x0E, 0xA9, 0x02, 0x60, 0xA9, 0x20, 0x20,
    0x95, 0x88, 0xA9, 0x07, 0x20, 0x20, 0x89, 0xA9, 0x02, 0x60, 0xA2, 0xBD, 0xA0, 0x23, 0x20, 0x76,
    0x89, 0x20, 0x35, 0x9A, 0xA9, 0x01, 0x20, 0xA8, 0x9F, 0xAD, 0x8F, 0x05, 0x29, 0x7F, 0x8D, 0x8F,
    0x05, 0xA9, 0x82, 0x85, 0x4C, 0xA0, 0x28, 0xA2, 0x20, 0xA9, 0xC8, 0x20, 0x2F, 0xA8, 0xA9, 0x02,
    0x60, 0xA9, 0x00, 0x85, 0xED, 0xA4, 0xED, 0xB9, 0x97, 0xAA, 0x85, 0xEA, 0x29, 0x7F, 0x85, 0xEB,
    0xA5, 0x7B, 0x29, 0x01, 0x0A, 0x0A, 0x05, 0xEB, 0xAA, 0xC8, 0xB9, 0x97, 0xAA, 0x85, 0xEB, 0xC8,
    0xB9, 0x97, 0xAA, 0xC8, 0x84, 0xED, 0xA4, 0xEB, 0x20, 0x28, 0x9B, 0x29, 0x7F, 0x85, 0xEB, 0xA9,
    0x00, 0x9D, 0xE8, 0x05, 0xE8, 0xC6, 0xEB, 0xD0, 0xF8, 0x20, 0x5E, 0x9B, 0x24, 0xEA, 0x30, 0x0A,
    0x50, 0xC3, 0xA9, 0x02, 0x20, 0xA8, 0x9F, 0x4C, 0x55, 0xA6, 0xA9, 0x02, 0x60, 0xAD, 0xE5, 0x04,
    0xC9, 0xFF, 0xF0, 0x30, 0x20, 0x67, 0xA7, 0xA0, 0x80, 0xA9, 0x00, 0x85, 0xEA, 0xA2, 0x2F, 0xA9,
    0xFF, 0x85, 0xED, 0xA9, 0xFE, 0x85, 0xEC, 0xA9, 0x07, 0x85, 0xEB, 0xA9, 0xF7, 0x20, 0x2C, 0xA7,
    0xA0, 0xD8, 0xA2, 0x30, 0xA9, 0x01, 0x85, 0xED, 0xA9, 0xFF, 0x85, 0xEC, 0xA9, 0xFC, 0x20, 0x2C,
    0xA7, 0xA9, 0x02, 0x60, 0x20, 0x67, 0xA7, 0xA0, 0x80, 0xA2, 0x2F, 0xA9, 0x02, 0x85, 0xEA, 0xA9,
    0xFF, 0x85, 0xED, 0xA9, 0xFE, 0x85, 0xEC, 0xA9, 0x07, 0x85, 0xEB, 0xA9, 0xF7, 0x20, 0x2C, 0xA7,
    0xA2, 0x08, 0xA9, 0xFE, 0x20, 0x2C, 0xA7, 0xA0, 0xFC, 0xB9, 0x7B, 0xA6, 0x99, 0x60, 0x04, 0xC8,
    0xD0, 0xF7, 0xA0, 0xB8, 0xA2, 0x1C, 0xA9, 0x02, 0x85, 0xED, 0xA9, 0xFF, 0x85, 0xEC, 0xA9, 0x03,
    0x85, 0xEB, 0xA9, 0xF6, 0x20, 0x2C, 0xA7, 0xA0, 0xD8, 0xB9, 0x6A, 0x04, 0x09, 0x02, 0x99, 0x6A,
    0x04, 0xC8, 0xC8, 0xC8, 0xC8, 0xC0, 0xF0, 0x90, 0xF0, 0xA9, 0x02, 0x60, 0x85, 0xE9, 0xAD, 0xE4,
    0x04, 0x18, 0x65, 0xED, 0x8D, 0xE4, 0x04, 0xAD, 0xE7, 0x04, 0x18, 0x65, 0xEC, 0x8D, 0xE7, 0x04,
    0x25, 0xEB, 0xD0, 0x1A, 0xAD, 0xE4, 0x04, 0x99, 0x68, 0x04, 0xA5, 0xE9, 0x99, 0x69, 0x04, 0xA5,
    0xEA, 0x99, 0x6A, 0x04, 0xAD, 0xE7, 0x04, 0x99, 0x6B, 0x04, 0xC8, 0xC8, 0xC8, 0xC8, 0xA9, 0x01,
    0x20, 0xA8, 0x9F, 0xCA, 0xD0, 0xC8, 0x60, 0xA0, 0xFC, 0xB9, 0x77, 0xA6, 0x99, 0xE8, 0x03, 0xC8,
    0xD0, 0xF7, 0x60, 0x79, 0xFF, 0x03, 0xC2, 0x46, 0xF6, 0x02, 0x52, 0xA9, 0x80, 0x20, 0x95, 0x88,
    0xA9, 0x02, 0x60, 0xA9, 0x02, 0x20, 0xA8, 0x9F, 0x20, 0xFB, 0x88, 0xA9, 0x02, 0x60, 0xA0, 0x40,
    0xA9, 0x01, 0x20, 0xA8, 0x9F, 0xA2, 0x20, 0xBD, 0x68, 0x04, 0x10, 0x08, 0xBD, 0x6A, 0x04, 0x09,
    0x08, 0x9D, 0x6A, 0x04, 0xE8, 0xE8, 0xE8, 0xE8, 0xE0, 0xC4, 0xD0, 0xEB, 0x88, 0xD0, 0xE1, 0x20,
    0x91, 0x9B, 0xA9, 0x01, 0x20, 0xA8, 0x9F, 0xA5, 0x09, 0xD0, 0xF7, 0x4C, 0x51, 0xA6, 0xA9, 0x01,
    0x20, 0xA8, 0x9F, 0xA0, 0x28, 0xA2, 0x64, 0xA9, 0xB0, 0x20, 0x2F, 0xA8, 0xA9, 0x02, 0x60, 0xA9,
    0x81, 0x20, 0x95, 0x88, 0xA9, 0x02, 0x60, 0xA0, 0x80, 0xA9, 0x01, 0x20, 0xA8, 0x9F, 0xA2, 0x20,
    0xBD, 0x68, 0x04, 0x10, 0x08, 0xBD, 0x6A, 0x04, 0x09, 0x04, 0x9D, 0x6A, 0x04, 0xE8, 0xE8, 0xE8,
    0xE8, 0xE0, 0xC4, 0xD0, 0xEB, 0x88, 0xD0, 0xE1, 0xA9, 0x02, 0x60, 0xA5, 0x28, 0x20, 0x7C, 0x9E
  ];
}

// ════════ $8800-$8BFF (1024B): 场景子程序(续) + PPU初始化 + 音频数据表 ═══════=
function build_8800_8BFF_sceneFuncsAndPPUInit(): readonly number[] {
  // $8800: LDA $EC
  // $8802: AND #$F0
  // $8804: BEQ $8817
  // $8806: JSR $AC6D
  // $8809: LDX $52
  // $880B: LDY $53
  // $880D: JSR $88CA
  // $8810: INC $53
  // $8812: LDA #$06
  // $8814: JSR $9FA8
  // $8817: LDA $EC
  // $8819: AND #$0F
  // $881B: JSR $AC71
  // $881E: LDX $52
  // $8820: LDY $53
  // $8822: JSR $88CA
  // $8825: INC $53
  // $8827: LDA #$06
  // $8829: JSR $9FA8
  // $882C: LDA #$02
  // $882E: RTS
  // $882F: STA $EC
  // $8831: STX $ED
  // $8833: LDA #$01
  // $8835: JSR $9FA8
  // $8838: LDX $ED
  // $883A: LDA $0468,X
  // $883D: CMP #$82
  // $883F: BCS $8849
  // $8841: LDA $046A,X
  // $8844: AND #$F3
  // $8846: STA $046A,X
  // $8849: INX
  // $884A: INX
  // $884B: INX
  // $884C: INX
  // $884D: CPX $EC
  // $884F: BNE $883A
  // $8851: DEY
  // $8852: BNE $8833
  // $8854: RTS
  // $8855: LDA $E4
  // $8857: CMP $26
  // $8859: BCS $88A8
  // $885B: LDA $26
  // $885D: BEQ $887C
  // $885F: CMP #$06
  // $8861: BEQ $8884
  // $8863: CMP #$0C
  // $8865: BEQ $887C
  // $8867: CMP #$10
  // $8869: BEQ $888C
  // $886B: JMP $A8A8
  // $886E: LDA $26
  // $8870: CMP #$06
  // $8872: BCC $887C
  // $8874: CMP #$0C
  // $8876: BCC $8884
  // $8878: CMP #$10
  // $887A: BCS $888C
  // $887C: LDX #$00
  // $887E: JSR $A8B7
  // $8881: JMP $A8A3
  // $8884: LDX #$0C
  // $8886: JSR $A8B7
  // $8889: JMP $A8A3
  // $888C: LDX #$18
  // $888E: JSR $A8B7
  // $8891: LDY #$00
  // $8893: LDA $AA47,X
  // $8896: STA $0408,Y
  // $8899: INX
  // $889A: TYA
  // $889B: CLC
  // $889C: ADC #$04
  // $889E: TAY
  // $889F: CMP #$28
  // $88A1: BCC $8893
  // $88A3: LDA $AA47,X
  // $88A6: STA $2C
  // $88A8: LDX $26
  // $88AA: LDA $AA75,X
  // $88AD: STA $2A
  // $88AF: LDA $26
  // $88B1: CLC
  // $88B2: ADC #$03
  // $88B4: STA $2B
  // $88B6: RTS
  // $88B7: LDA #$0B
  // $88B9: STA $ED
  // $88BB: LDY #$00
  // $88BD: LDA $AA47,X
  // $88C0: STA $0300,Y
  // $88C3: INX
  // $88C4: TYA
  // $88C5: CLC
  // $88C6: ADC #$0C
  // $88C8: TAY
  // $88C9: CMP #$84
  // $88CB: BCC $88BD
  // $88CD: RTS
  // $88CE: LDA #$01
  // $88D0: JSR $9FA8
  // $88D3: LDY #$00
  // $88D5: LDX $0468,Y
  // $88D8: LDA $046A,Y
  // $88DB: AND #$0C
  // $88DD: BEQ $88E1
  // $88DF: LDX #$F8
  // $88E1: TXA
  // $88E2: STA $0200,Y
  // $88E5: LDA $0469,Y
  // $88E8: STA $0201,Y
  // $88EB: LDA $046A,Y
  // $88EE: STA $0202,Y
  // $88F1: LDA $046B,Y
  // $88F4: STA $0203,Y
  // $88F7: INY
  // $88F8: INY
  // $88F9: INY
  // $88FA: INY
  // $88FB: BNE $88D5
  // $88FD: RTS
  // $88FE: LDA #$02
  // $8900: JSR $9FA8
  // $8903: JSR $98A0
  // $8906: JSR $9B7F
  // $8909: LDX #$00
  // $890B: LDY #$01
  // $890D: JSR $9B6F
  // $8910: LDX #$02
  // $8912: LDY #$03
  // $8914: JSR $9B74
  // $8917: LDY #$F8
  // $8919: LDA $A896,Y
  // $891C: STA $0460,Y
  // $891F: INY
  // $8920: BNE $8919
  // $8922: LDA #$01
  // $8924: LDX #$01
  // $8926: JSR $997A
  // $8929: LDA $26
  // $892B: STA $42
  // $892D: JSR $AA36
  // $8930: LDA #$01
  // $8932: JSR $9FA8
  // $8935: LDA $1E
  // $8937: BMI $895E
  // $8939: JSR $AA20
  // $893C: BCC $8930
  // $893E: LDX #$10
  // $8940: CLC
  // $8941: ADC $42
  // $8943: CMP #$21
  // $8945: BCS $8949
  // $8947: STA $42
  // $8949: JSR $AA36
  // $894C: LDA #$01
  // $894E: JSR $9FA8
  // $8951: JSR $AA20
  // $8954: BCC $8930
  // $8956: DEX
  // $8957: BNE $894C
  // $8959: LDX #$04
  // $895B: JMP $A940
  // $895E: JSR $99F0
  // $8961: JSR $9B7F
  // $8964: LDA $42
  // $8966: CMP $26
  // $8968: BEQ $898D
  // $896A: STA $26
  // $896C: ASL A
  // $896D: TAX
  // $896E: LDA $A996,X
  // $8971: STA $42
  // $8973: LDA $A997,X
  // $8976: STA $43
  // $8978: LDX #$00
  // $897A: LDA $42
  // $897C: STA $0454,X
  // $897F: LDA $43
  // $8981: STA $0455,X
  // $8984: INX
  // $8985: INX
  // $8986: CPX #$14
  // $8988: BNE $897A
  // $898A: JSR $A86E
  // $898D: RTS
  // $898E: ??? $80
  // $898F: ??? $33
  // $8990: BRK
  // $8991: LDY #$80
  // $8993: ??? $33
  // $8994: BRK
  // $8995: TAY
  // $8996: BRK
  // $8997: BRK
  // $8998: RTS
  // $8999: BRK
  // $899A: BNE $899C
  // $899C: BVC $899F
  // $899E: BRK
  // $899F: ??? $03
  // $89A0: BRK
  // $89A1: ORA $28
  // $89A3: ASL $80
  // $89A5: ??? $07
  // $89A6: BRK
  // $89A7: ORA #$30
  // $89A9: ??? $0C
  // $89AA: CPX #$0D
  // $89AC: BVS $89BF
  // $89AE: BVC $89C3
  // $89B0: BVC $89C7
  // $89B2: BCS $89CD
  // $89B4: RTS
  // $89B5: ASL $1E60,X
  // $89B8: BNE $89DA
  // $89BA: PHA
  // $89BB: ??? $23
  // $89BC: INY
  // $89BD: AND $50
  // $89BF: PLP
  // $89C0: CPX #$2A
  // $89C2: CPX #$2A
  // $89C4: SEI
  // $89C5: AND $3018
  // $89C8: INY
  // $89C9: ??? $32
  // $89CA: CLI
  // $89CB: SEC
  // $89CC: CLI
  // $89CD: SEC
  // $89CE: BMI $8A0B
  // $89D0: BPL $8A10
  // $89D2: RTI
  // $89D3: ??? $44
  // $89D4: INX
  // $89D5: LSR A
  // $89D6: JSR $0055
  // $89D9: EOR $5D20,Y
  // $89DC: BVC $8A3F
  // $89DE: BCC $8A45
  // $89E0: CPX #$69
  // $89E2: RTI
  // $89E3: ROR $7300
  // $89E6: CPX #$77
  // $89E8: BNE $8A66
  // $89EA: BRK
  // $89EB: ??? $82
  // $89EC: ??? $80
  // $89ED: ??? $87
  // $89EE: ??? $80
  // $89EF: STA $93E0
  // $89F2: BNE $898E
  // $89F4: CPX #$A1
  // $89F6: CPY #$A9
  // $89F8: CPY #$B1
  // $89FA: BNE $89B5
  // $89FC: ??? $04
  // $89FD: ??? $C2
  // $89FE: ??? $80
  // $89FF: ??? $CB
  // $8A00: LDY #$D7
  // $8A02: BRK
  // $8A03: INX
  // $8A04: ??? $FF
  // $8A05: ??? $FF
  // $8A06: STY $ED
  // $8A08: INX
  // $8A09: LDY #$00
  // $8A0B: PHA
  // $8A0C: LDA #$00
  // $8A0E: STA (EC),Y
  // $8A10: INC $EC
  // $8A12: BNE $8A16
  // $8A14: INC $ED
  // $8A16: PLA
  // $8A17: SEC
  // $8A18: SBC #$01
  // $8A1A: BNE $8A0B
  // $8A1C: DEX
  // $8A1D: BNE $8A0B
  // $8A1F: RTS
  // $8A20: LDA $1C
  // $8A22: AND #$08
  // $8A24: BEQ $8A2A
  // $8A26: LDA #$01
  // $8A28: SEC
  // $8A29: RTS
  // $8A2A: LDA $1C
  // $8A2C: AND #$04
  // $8A2E: BEQ $8A34
  // $8A30: LDA #$FF
  // $8A32: SEC
  // $8A33: RTS
  // $8A34: CLC
  // $8A35: RTS
  // $8A36: LDA $42
  // $8A38: JSR $AC6D
  // $8A3B: STA $0559
  // $8A3E: LDA $42
  // $8A40: JSR $AC71
  // $8A43: STA $055D
  // $8A46: RTS
  // $8A47: ??? $02
  // $8A48: ??? $03
  // $8A49: ??? $04
  // $8A4A: ORA $06
  // $8A4C: ??? $07
  // $8A4D: PHP
  // $8A4E: ORA #$0A
  // $8A50: ORA (0B,X)
  // $8A52: BRK
  // $8A53: ??? $0F
  // $8A54: ORA $140E
  // $8A57: BPL $8A65
  // $8A59: ??? $13
  // $8A5A: ??? $12
  // $8A5B: ORA $11,X
  // $8A5D: ASL $00,X
  // $8A5F: ??? $22
  // $8A60: ??? $1B
  // $8A61: ??? $1C
  // $8A62: ??? $14
  // $8A63: ORA $1817,X
  // $8A66: ORA (1A),Y
  // $8A68: ORA (15,X)
  // $8A6A: ORA $101F,Y
  // $8A6D: ??? $12
  // $8A6E: ??? $13
  // $8A6F: ASL $1E,X
  // $8A71: JSR $0F21
  // $8A74: ORA (00,X)
  // $8A76: BRK
  // $8A77: BRK
  // $8A78: BRK
  // $8A79: BRK
  // $8A7A: BRK
  // $8A7B: ORA (01,X)
  // $8A7D: ORA (01,X)
  // $8A7F: ORA (01,X)
  // $8A81: BRK
  // $8A82: BRK
  // $8A83: BRK
  // $8A84: BRK
  // $8A85: ??? $02
  // $8A86: ??? $02
  // $8A87: ??? $02
  // $8A88: ??? $02
  // $8A89: ??? $02
  // $8A8A: ??? $02
  // $8A8B: ??? $02
  // $8A8C: ??? $02
  // $8A8D: ??? $02
  // $8A8E: ??? $02
  // $8A8F: ??? $02
  // $8A90: ??? $02
  // $8A91: ??? $02
  // $8A92: ??? $02
  // $8A93: ??? $02
  // $8A94: ??? $02
  // $8A95: ??? $02
  // $8A96: ??? $02
  // $8A97: JSR $2000
  // $8A9A: JSR $8F20
  // $8A9D: RTS
  // $8A9E: ??? $3F
  // $8A9F: ??? $8F
  // $8AA0: JSR $1E21
  // $8AA3: JSR $8E41
  // $8AA6: RTS
  // $8AA7: LSR $208E,X
  // $8AAA: ??? $42
  // $8AAB: ??? $1C
  // $8AAC: JSR $8D62
  // $8AAF: RTS
  // $8AB0: ADC $208D,X
  // $8AB3: ??? $63
  // $8AB4: ??? $1A
  // $8AB5: JSR $8C83
  // $8AB8: RTS
  // $8AB9: ??? $9C
  // $8ABA: STY $8420
  // $8ABD: CLC
  // $8ABE: JSR $8BA4
  // $8AC1: RTS
  // $8AC2: ??? $BB
  // $8AC3: ??? $8B
  // $8AC4: JSR $16A5
  // $8AC7: JSR $8AC5
  // $8ACA: RTS
  // $8ACB: ??? $DA
  // $8ACC: TXA
  // $8ACD: JSR $14C6
  // $8AD0: JSR $89E6
  // $8AD3: RTS
  // $8AD4: SBC $2089,Y
  // $8AD7: ??? $E7
  // $8AD8: ??? $12
  // $8AD9: JSR $8807
  // $8ADC: CPX #$18
  // $8ADE: DEY
  // $8ADF: BPL $8AE1
  // $8AE1: BPL $8AE3
  // $8AE3: RTI
  // $8AE4: BRK
  // $8AE5: BRK
  // $8AE6: BRK
  // $8AE7: BRK
  // $8AE8: BRK
  // $8AE9: BRK
  // $8AEA: BRK
  // $8AEB: BRK
  // $8AEC: BRK
  // $8AED: BRK
  // $8AEE: BRK
  // $8AEF: BRK
  // $8AF0: BRK
  // $8AF1: ??? $04
  // $8AF2: BRK
  // $8AF3: ASL $1C00
  // $8AF6: BRK
  // $8AF7: ??? $80
  // $8AF8: BRK
  // $8AF9: BRK
  // $8AFA: BRK
  // $8AFB: BRK
  // $8AFC: BRK
  // $8AFD: BRK
  // $8AFE: BRK
  // $8AFF: BRK
  // $8B00: BRK
  // $8B01: BEQ $8B02
  // $8B03: CPX #$FF
  // $8B05: ??? $80
  // $8B06: ??? $FF
  // $8B07: BRK
  // $8B08: BRK
  // $8B09: BRK
  // $8B0A: BRK
  // $8B0B: BRK
  // $8B0C: BRK
  // $8B0D: BRK
  // $8B0E: BRK
  // $8B0F: BRK
  // $8B10: BRK
  // $8B11: ??? $04
  // $8B12: BRK
  // $8B13: ASL $1C00
  // $8B16: BRK
  // $8B17: BRK
  // $8B18: BRK
  // $8B19: BRK
  // $8B1A: BRK
  // $8B1B: BRK
  // $8B1C: BRK
  // $8B1D: BRK
  // $8B1E: BRK
  // $8B1F: JMP ($0400)
  // $8B22: ??? $FC
  // $8B23: ROR $0500
  // $8B26: ??? $FC
  // $8B27: BVS $8B29
  // $8B29: ASL $FA
  // $8B2B: ??? $74
  // $8B2C: BRK
  // $8B2D: ??? $07
  // $8B2E: ??? $FA
  // $8B2F: CLI
  // $8B30: EOR $51
  // $8B32: EOR $53,X
  // $8B34: ??? $47
  // $8B35: LSR $52
  // $8B37: ??? $54
  // $8B38: ??? $57
  // $8B39: ??? $5A
  // $8B3A: PHA
  // $8B3B: EOR #$4B
  // $8B3D: JMP $4E4D
  // $8B40: ??? $4F
  // $8B41: BVC $8B9C
  // $8B43: LSR $44,X
  // $8B45: ??? $32
  // $8B46: ??? $33
  // $8B47: EOR (42,X)
  // $8B49: ??? $43
  // $8B4A: ??? $3C
  // $8B4B: AND $403F,Y
  // $8B4E: ??? $37
  // $8B4F: SEC
  // $8B50: ROL $3435,X
  // $8B53: ??? $3B
  // $8B54: ??? $3A
  // $8B55: ROL $3D,X
  // $8B57: ??? $03
  // $8B58: ??? $04
  // $8B59: ORA $06
  // $8B5B: ??? $07
  // $8B5C: PHP
  // $8B5D: ORA #$0A
  // $8B5F: ??? $0B
  // $8B60: ??? $0C
  // $8B61: ORA $0F0E
  // $8B64: BPL $8B77
  // $8B66: ??? $12
  // $8B67: ??? $13
  // $8B68: ??? $14
  // $8B69: ORA $16,X
  // $8B6B: ??? $17
  // $8B6C: CLC
  // $8B6D: ORA $1B1A,Y
  // $8B70: ??? $1C
  // $8B71: ORA $1F1E,X
  // $8B74: ??? $22
  // $8B75: ??? $23
  // $8B76: BIT $25
  // $8B78: ROL $27
  // $8B7A: PLP
  // $8B7B: AND #$2A
  // $8B7D: ??? $2B
  // $8B7E: BIT $2E2D
  // $8B81: ??? $2F
  // $8B82: BMI $8BE3
  // $8B84: RTS
  // $8B85: ADC (62,X)
  // $8B87: ??? $63
  // $8B88: ??? $64
  // $8B89: ADC $66
  // $8B8B: PLA
  // $8B8C: ADC #$6A
  // $8B8E: ??? $6B
  // $8B8F: JMP ($6E6D)
  // $8B92: ??? $6F
  // $8B93: BVS $8B3E
  // $8B95: PHP
  // $8B96: STA $2000
  // $8B99: LDA #$00
  // $8B9B: STA $2001
  // $8B9E: STA $2005
  // $8BA1: STA $2005
  // $8BA4: LDA #$00
  // $8BA6: LDY #$01
  // $8BA8: STA $01FF,Y
  // $8BAB: INY
  // $8BAC: BNE $8BA8
  // $8BAE: LDA #$00
  // $8BB0: STA $2003
  // $8BB3: LDA #$02
  // $8BB5: STA $4014
  // $8BB8: LDA #$00
  // $8BBA: STA $8000
  // $8BBD: STA $8001
  // $8BC0: LDA #$01
  // $8BC2: STA $8000
  // $8BC5: LDA #$02
  // $8BC7: STA $8001
  // $8BCA: LDA #$20
  // $8BCC: STA $2006
  // $8BCF: LDA #$00
  // $8BD1: STA $2006
  // $8BD4: LDX #$10
  // $8BD6: LDY #$00
  // $8BD8: LDA #$00
  // $8BDA: STA $2007
  // $8BDD: DEY
  // $8BDE: BNE $8BD8
  // $8BE0: DEX
  // $8BE1: BNE $8BD8
  // $8BE3: LDA #$00
  // $8BE5: STA $E8
  // $8BE7: STA $E9
  // $8BE9: LDA #$20
  // $8BEB: STA $EB
  // $8BED: LDA #$02
  // $8BEF: STA $E6
  // $8BF1: LDA #$21
  // $8BF3: STA $E7
  // $8BF5: LDA #$08
  // $8BF7: STA $EA
  // $8BF9: LDA $E7
  // $8BFB: STA $2006
  // $8BFE: LDA $E6
  return [
    0xA5, 0xEC, 0x29, 0xF0, 0xF0, 0x11, 0x20, 0x6D, 0xAC, 0xA6, 0x52, 0xA4, 0x53, 0x20, 0xCA, 0x88,
    0xE6, 0x53, 0xA9, 0x06, 0x20, 0xA8, 0x9F, 0xA5, 0xEC, 0x29, 0x0F, 0x20, 0x71, 0xAC, 0xA6, 0x52,
    0xA4, 0x53, 0x20, 0xCA, 0x88, 0xE6, 0x53, 0xA9, 0x06, 0x20, 0xA8, 0x9F, 0xA9, 0x02, 0x60, 0x85,
    0xEC, 0x86, 0xED, 0xA9, 0x01, 0x20, 0xA8, 0x9F, 0xA6, 0xED, 0xBD, 0x68, 0x04, 0xC9, 0x82, 0xB0,
    0x08, 0xBD, 0x6A, 0x04, 0x29, 0xF3, 0x9D, 0x6A, 0x04, 0xE8, 0xE8, 0xE8, 0xE8, 0xE4, 0xEC, 0xD0,
    0xE9, 0x88, 0xD0, 0xDF, 0x60, 0xA5, 0xE4, 0xC5, 0x26, 0xB0, 0x4D, 0xA5, 0x26, 0xF0, 0x1D, 0xC9,
    0x06, 0xF0, 0x21, 0xC9, 0x0C, 0xF0, 0x15, 0xC9, 0x10, 0xF0, 0x21, 0x4C, 0xA8, 0xA8, 0xA5, 0x26,
    0xC9, 0x06, 0x90, 0x08, 0xC9, 0x0C, 0x90, 0x0C, 0xC9, 0x10, 0xB0, 0x10, 0xA2, 0x00, 0x20, 0xB7,
    0xA8, 0x4C, 0xA3, 0xA8, 0xA2, 0x0C, 0x20, 0xB7, 0xA8, 0x4C, 0xA3, 0xA8, 0xA2, 0x18, 0x20, 0xB7,
    0xA8, 0xA0, 0x00, 0xBD, 0x47, 0xAA, 0x99, 0x08, 0x04, 0xE8, 0x98, 0x18, 0x69, 0x04, 0xA8, 0xC9,
    0x28, 0x90, 0xF0, 0xBD, 0x47, 0xAA, 0x85, 0x2C, 0xA6, 0x26, 0xBD, 0x75, 0xAA, 0x85, 0x2A, 0xA5,
    0x26, 0x18, 0x69, 0x03, 0x85, 0x2B, 0x60, 0xA9, 0x0B, 0x85, 0xED, 0xA0, 0x00, 0xBD, 0x47, 0xAA,
    0x99, 0x00, 0x03, 0xE8, 0x98, 0x18, 0x69, 0x0C, 0xA8, 0xC9, 0x84, 0x90, 0xF0, 0x60, 0xA9, 0x01,
    0x20, 0xA8, 0x9F, 0xA0, 0x00, 0xBE, 0x68, 0x04, 0xB9, 0x6A, 0x04, 0x29, 0x0C, 0xF0, 0x02, 0xA2,
    0xF8, 0x8A, 0x99, 0x00, 0x02, 0xB9, 0x69, 0x04, 0x99, 0x01, 0x02, 0xB9, 0x6A, 0x04, 0x99, 0x02,
    0x02, 0xB9, 0x6B, 0x04, 0x99, 0x03, 0x02, 0xC8, 0xC8, 0xC8, 0xC8, 0xD0, 0xD8, 0x60, 0xA9, 0x02,
    0x20, 0xA8, 0x9F, 0x20, 0xA0, 0x98, 0x20, 0x7F, 0x9B, 0xA2, 0x00, 0xA0, 0x01, 0x20, 0x6F, 0x9B,
    0xA2, 0x02, 0xA0, 0x03, 0x20, 0x74, 0x9B, 0xA0, 0xF8, 0xB9, 0x96, 0xA8, 0x99, 0x60, 0x04, 0xC8,
    0xD0, 0xF7, 0xA9, 0x01, 0xA2, 0x01, 0x20, 0x7A, 0x99, 0xA5, 0x26, 0x85, 0x42, 0x20, 0x36, 0xAA,
    0xA9, 0x01, 0x20, 0xA8, 0x9F, 0xA5, 0x1E, 0x30, 0x25, 0x20, 0x20, 0xAA, 0x90, 0xF2, 0xA2, 0x10,
    0x18, 0x65, 0x42, 0xC9, 0x21, 0xB0, 0x02, 0x85, 0x42, 0x20, 0x36, 0xAA, 0xA9, 0x01, 0x20, 0xA8,
    0x9F, 0x20, 0x20, 0xAA, 0x90, 0xDA, 0xCA, 0xD0, 0xF3, 0xA2, 0x04, 0x4C, 0x40, 0xA9, 0x20, 0xF0,
    0x99, 0x20, 0x7F, 0x9B, 0xA5, 0x42, 0xC5, 0x26, 0xF0, 0x23, 0x85, 0x26, 0x0A, 0xAA, 0xBD, 0x96,
    0xA9, 0x85, 0x42, 0xBD, 0x97, 0xA9, 0x85, 0x43, 0xA2, 0x00, 0xA5, 0x42, 0x9D, 0x54, 0x04, 0xA5,
    0x43, 0x9D, 0x55, 0x04, 0xE8, 0xE8, 0xE0, 0x14, 0xD0, 0xF0, 0x20, 0x6E, 0xA8, 0x60, 0x80, 0x33,
    0x00, 0xA0, 0x80, 0x33, 0x00, 0xA8, 0x00, 0x00, 0x60, 0x00, 0xD0, 0x00, 0x50, 0x01, 0x00, 0x03,
    0x00, 0x05, 0x28, 0x06, 0x80, 0x07, 0x00, 0x09, 0x30, 0x0C, 0xE0, 0x0D, 0x70, 0x11, 0x50, 0x13,
    0x50, 0x15, 0xB0, 0x19, 0x60, 0x1E, 0x60, 0x1E, 0xD0, 0x20, 0x48, 0x23, 0xC8, 0x25, 0x50, 0x28,
    0xE0, 0x2A, 0xE0, 0x2A, 0x78, 0x2D, 0x18, 0x30, 0xC8, 0x32, 0x58, 0x38, 0x58, 0x38, 0x30, 0x3B,
    0x10, 0x3E, 0x40, 0x44, 0xE8, 0x4A, 0x20, 0x55, 0x00, 0x59, 0x20, 0x5D, 0x50, 0x61, 0x90, 0x65,
    0xE0, 0x69, 0x40, 0x6E, 0x00, 0x73, 0xE0, 0x77, 0xD0, 0x7C, 0x00, 0x82, 0x80, 0x87, 0x80, 0x8D,
    0xE0, 0x93, 0xD0, 0x9A, 0xE0, 0xA1, 0xC0, 0xA9, 0xC0, 0xB1, 0xD0, 0xB9, 0x04, 0xC2, 0x80, 0xCB,
    0xA0, 0xD7, 0x00, 0xE8, 0xFF, 0xFF, 0x84, 0xED, 0xE8, 0xA0, 0x00, 0x48, 0xA9, 0x00, 0x91, 0xEC,
    0xE6, 0xEC, 0xD0, 0x02, 0xE6, 0xED, 0x68, 0x38, 0xE9, 0x01, 0xD0, 0xEF, 0xCA, 0xD0, 0xEC, 0x60,
    0xA5, 0x1C, 0x29, 0x08, 0xF0, 0x04, 0xA9, 0x01, 0x38, 0x60, 0xA5, 0x1C, 0x29, 0x04, 0xF0, 0x04,
    0xA9, 0xFF, 0x38, 0x60, 0x18, 0x60, 0xA5, 0x42, 0x20, 0x6D, 0xAC, 0x8D, 0x59, 0x05, 0xA5, 0x42,
    0x20, 0x71, 0xAC, 0x8D, 0x5D, 0x05, 0x60, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A,
    0x01, 0x0B, 0x00, 0x0F, 0x0D, 0x0E, 0x14, 0x10, 0x0C, 0x13, 0x12, 0x15, 0x11, 0x16, 0x00, 0x22,
    0x1B, 0x1C, 0x14, 0x1D, 0x17, 0x18, 0x11, 0x1A, 0x01, 0x15, 0x19, 0x1F, 0x10, 0x12, 0x13, 0x16,
    0x1E, 0x20, 0x21, 0x0F, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x01, 0x01, 0x01, 0x01,
    0x01, 0x00, 0x00, 0x00, 0x00, 0x02, 0x02, 0x02, 0x02, 0x02, 0x02, 0x02, 0x02, 0x02, 0x02, 0x02,
    0x02, 0x02, 0x02, 0x02, 0x02, 0x02, 0x02, 0x20, 0x00, 0x20, 0x20, 0x20, 0x8F, 0x60, 0x3F, 0x8F,
    0x20, 0x21, 0x1E, 0x20, 0x41, 0x8E, 0x60, 0x5E, 0x8E, 0x20, 0x42, 0x1C, 0x20, 0x62, 0x8D, 0x60,
    0x7D, 0x8D, 0x20, 0x63, 0x1A, 0x20, 0x83, 0x8C, 0x60, 0x9C, 0x8C, 0x20, 0x84, 0x18, 0x20, 0xA4,
    0x8B, 0x60, 0xBB, 0x8B, 0x20, 0xA5, 0x16, 0x20, 0xC5, 0x8A, 0x60, 0xDA, 0x8A, 0x20, 0xC6, 0x14,
    0x20, 0xE6, 0x89, 0x60, 0xF9, 0x89, 0x20, 0xE7, 0x12, 0x20, 0x07, 0x88, 0xE0, 0x18, 0x88, 0x10,
    0x00, 0x10, 0x00, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x04, 0x00, 0x0E, 0x00, 0x1C, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0xF0, 0xFF, 0xE0, 0xFF, 0x80, 0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x04, 0x00, 0x0E, 0x00, 0x1C, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x6C,
    0x00, 0x04, 0xFC, 0x6E, 0x00, 0x05, 0xFC, 0x70, 0x00, 0x06, 0xFA, 0x74, 0x00, 0x07, 0xFA, 0x58,
    0x45, 0x51, 0x55, 0x53, 0x47, 0x46, 0x52, 0x54, 0x57, 0x5A, 0x48, 0x49, 0x4B, 0x4C, 0x4D, 0x4E,
    0x4F, 0x50, 0x59, 0x56, 0x44, 0x32, 0x33, 0x41, 0x42, 0x43, 0x3C, 0x39, 0x3F, 0x40, 0x37, 0x38,
    0x3E, 0x35, 0x34, 0x3B, 0x3A, 0x36, 0x3D, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B,
    0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B,
    0x1C, 0x1D, 0x1E, 0x1F, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C, 0x2D,
    0x2E, 0x2F, 0x30, 0x5F, 0x60, 0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x68, 0x69, 0x6A, 0x6B, 0x6C,
    0x6D, 0x6E, 0x6F, 0x70, 0xA9, 0x08, 0x8D, 0x00, 0x20, 0xA9, 0x00, 0x8D, 0x01, 0x20, 0x8D, 0x05,
    0x20, 0x8D, 0x05, 0x20, 0xA9, 0x00, 0xA0, 0x01, 0x99, 0xFF, 0x01, 0xC8, 0xD0, 0xFA, 0xA9, 0x00,
    0x8D, 0x03, 0x20, 0xA9, 0x02, 0x8D, 0x14, 0x40, 0xA9, 0x00, 0x8D, 0x00, 0x80, 0x8D, 0x01, 0x80,
    0xA9, 0x01, 0x8D, 0x00, 0x80, 0xA9, 0x02, 0x8D, 0x01, 0x80, 0xA9, 0x20, 0x8D, 0x06, 0x20, 0xA9,
    0x00, 0x8D, 0x06, 0x20, 0xA2, 0x10, 0xA0, 0x00, 0xA9, 0x00, 0x8D, 0x07, 0x20, 0x88, 0xD0, 0xF8,
    0xCA, 0xD0, 0xF5, 0xA9, 0x00, 0x85, 0xE8, 0x85, 0xE9, 0xA9, 0x20, 0x85, 0xEB, 0xA9, 0x02, 0x85,
    0xE6, 0xA9, 0x21, 0x85, 0xE7, 0xA9, 0x08, 0x85, 0xEA, 0xA5, 0xE7, 0x8D, 0x06, 0x20, 0xA5, 0xE6
  ];
}

// ════════ $8C00-$8FFF (1024B): PPU填充工具 + Nametable数据(部分) ═══════=
function build_8C00_8FFF_ppuFillTools(): readonly number[] {
  // $8C00: STA $2006
  // $8C03: LDA $E9
  // $8C05: JSR $AC71
  // $8C08: STA $2007
  // $8C0B: LDA $E8
  // $8C0D: JSR $AC6D
  // $8C10: STA $2007
  // $8C13: LDA $E8
  // $8C15: JSR $AC71
  // $8C18: STA $2007
  // $8C1B: LDA #$00
  // $8C1D: STA $2007
  // $8C20: STA $2007
  // $8C23: LDY #$00
  // $8C25: LDA (E8),Y
  // $8C27: JSR $AC6D
  // $8C2A: STA $2007
  // $8C2D: LDA (E8),Y
  // $8C2F: JSR $AC71
  // $8C32: STA $2007
  // $8C35: LDA #$00
  // $8C37: STA $2007
  // $8C3A: INY
  // $8C3B: CPY #$08
  // $8C3D: BNE $8C25
  // $8C3F: LDA $E8
  // $8C41: CLC
  // $8C42: ADC #$08
  // $8C44: STA $E8
  // $8C46: LDA $E9
  // $8C48: ADC #$00
  // $8C4A: STA $E9
  // $8C4C: LDA $E6
  // $8C4E: CLC
  // $8C4F: ADC #$40
  // $8C51: STA $E6
  // $8C53: LDA $E7
  // $8C55: ADC #$00
  // $8C57: STA $E7
  // $8C59: DEC $EA
  // $8C5B: BEQ $8C60
  // $8C5D: JMP $ABF9
  // $8C60: JSR $AC7E
  // $8C63: DEC $EB
  // $8C65: BEQ $8C6A
  // $8C67: JMP $ABED
  // $8C6A: JMP $ABE3
  // $8C6D: LSR A
  // $8C6E: LSR A
  // $8C6F: LSR A
  // $8C70: LSR A
  // $8C71: AND #$0F
  // $8C73: CLC
  // $8C74: ADC #$33
  // $8C76: CMP #$3D
  // $8C78: BCC $8C7D
  // $8C7A: CLC
  // $8C7B: ADC #$44
  // $8C7D: RTS
  // $8C7E: LDA #$18
  // $8C80: STA $2001
  // $8C83: LDA #$00
  // $8C85: STA $2005
  // $8C88: STA $2005
  // $8C8B: TAY
  // $8C8C: TAX
  // $8C8D: LDA #$40
  // $8C8F: DEY
  // $8C90: BNE $8C8F
  // $8C92: DEX
  // $8C93: BNE $8C8F
  // $8C95: SEC
  // $8C96: SBC #$01
  // $8C98: BNE $8C8F
  // $8C9A: LDA #$00
  // $8C9C: STA $2001
  // $8C9F: STA $2005
  // $8CA2: STA $2005
  // $8CA5: RTS
  // $8CA6: ??? $FF
  // $8CA7: ??? $FF
  // $8CA8: ??? $FF
  // $8CA9: ??? $FF
  // $8CAA: ??? $FF
  // $8CAB: ??? $FF
  // $8CAC: ??? $FF
  // $8CAD: ??? $FF
  // $8CAE: ??? $FF
  // $8CAF: ??? $FF
  // $8CB0: ??? $FF
  // $8CB1: ??? $FF
  // $8CB2: ??? $FF
  // $8CB3: ??? $FF
  // $8CB4: ??? $FF
  // $8CB5: ??? $FF
  // $8CB6: ??? $FF
  // $8CB7: ??? $FF
  // $8CB8: ??? $FF
  // $8CB9: ??? $FF
  // $8CBA: ??? $FF
  // $8CBB: ??? $FF
  // $8CBC: ??? $FF
  // $8CBD: ??? $FF
  // $8CBE: ??? $FF
  // $8CBF: ??? $FF
  // $8CC0: ??? $FF
  // $8CC1: ??? $FF
  // $8CC2: ??? $FF
  // $8CC3: ??? $FF
  // $8CC4: ??? $FF
  // $8CC5: ??? $FF
  // $8CC6: ??? $FF
  // $8CC7: ??? $FF
  // $8CC8: ??? $FF
  // $8CC9: ??? $FF
  // $8CCA: ??? $FF
  // $8CCB: ??? $FF
  // $8CCC: ??? $FF
  // $8CCD: ??? $FF
  // $8CCE: ??? $FF
  // $8CCF: ??? $FF
  // $8CD0: ??? $FF
  // $8CD1: ??? $FF
  // $8CD2: ??? $FF
  // $8CD3: ??? $FF
  // $8CD4: ??? $FF
  // $8CD5: ??? $FF
  // $8CD6: ??? $FF
  // $8CD7: ??? $FF
  // $8CD8: ??? $FF
  // $8CD9: ??? $FF
  // $8CDA: ??? $FF
  // $8CDB: ??? $FF
  // $8CDC: ??? $FF
  // $8CDD: ??? $FF
  // $8CDE: ??? $FF
  // $8CDF: ??? $FF
  // $8CE0: ??? $FF
  // $8CE1: ??? $FF
  // $8CE2: ??? $FF
  // $8CE3: ??? $FF
  // $8CE4: ??? $FF
  // $8CE5: ??? $FF
  // $8CE6: ??? $FF
  // $8CE7: ??? $FF
  // $8CE8: ??? $FF
  // $8CE9: ??? $FF
  // $8CEA: ??? $FF
  // $8CEB: ??? $FF
  // $8CEC: ??? $FF
  // $8CED: ??? $FF
  // $8CEE: ??? $FF
  // $8CEF: ??? $FF
  // $8CF0: ??? $FF
  // $8CF1: ??? $FF
  // $8CF2: ??? $FF
  // $8CF3: ??? $FF
  // $8CF4: ??? $FF
  // $8CF5: ??? $FF
  // $8CF6: ??? $FF
  // $8CF7: ??? $FF
  // $8CF8: ??? $FF
  // $8CF9: ??? $FF
  // $8CFA: ??? $FF
  // $8CFB: ??? $FF
  // $8CFC: ??? $FF
  // $8CFD: ??? $FF
  // $8CFE: ??? $FF
  // $8CFF: ??? $FF
  // $8D00: ??? $FF
  // $8D01: ??? $FF
  // $8D02: ??? $FF
  // $8D03: ??? $FF
  // $8D04: ??? $FF
  // $8D05: ??? $FF
  // $8D06: ??? $FF
  // $8D07: ??? $FF
  // $8D08: ??? $FF
  // $8D09: ??? $FF
  // $8D0A: ??? $FF
  // $8D0B: ??? $FF
  // $8D0C: ??? $FF
  // $8D0D: ??? $FF
  // $8D0E: ??? $FF
  // $8D0F: ??? $FF
  // $8D10: ??? $FF
  // $8D11: ??? $FF
  // $8D12: ??? $FF
  // $8D13: ??? $FF
  // $8D14: ??? $FF
  // $8D15: ??? $FF
  // $8D16: ??? $FF
  // $8D17: ??? $FF
  // $8D18: ??? $FF
  // $8D19: ??? $FF
  // $8D1A: ??? $FF
  // $8D1B: ??? $FF
  // $8D1C: ??? $FF
  // $8D1D: ??? $FF
  // $8D1E: ??? $FF
  // $8D1F: ??? $FF
  // $8D20: ??? $FF
  // $8D21: ??? $FF
  // $8D22: ??? $FF
  // $8D23: ??? $FF
  // $8D24: ??? $FF
  // $8D25: ??? $FF
  // $8D26: ??? $FF
  // $8D27: ??? $FF
  // $8D28: ??? $FF
  // $8D29: ??? $FF
  // $8D2A: ??? $FF
  // $8D2B: ??? $FF
  // $8D2C: ??? $FF
  // $8D2D: ??? $FF
  // $8D2E: ??? $FF
  // $8D2F: ??? $FF
  // $8D30: ??? $FF
  // $8D31: ??? $FF
  // $8D32: ??? $FF
  // $8D33: ??? $FF
  // $8D34: ??? $FF
  // $8D35: ??? $FF
  // $8D36: ??? $FF
  // $8D37: ??? $FF
  // $8D38: ??? $FF
  // $8D39: ??? $FF
  // $8D3A: ??? $FF
  // $8D3B: ??? $FF
  // $8D3C: ??? $FF
  // $8D3D: ??? $FF
  // $8D3E: ??? $FF
  // $8D3F: ??? $FF
  // $8D40: ??? $FF
  // $8D41: ??? $FF
  // $8D42: ??? $FF
  // $8D43: ??? $FF
  // $8D44: ??? $FF
  // $8D45: ??? $FF
  // $8D46: ??? $FF
  // $8D47: ??? $FF
  // $8D48: ??? $FF
  // $8D49: ??? $FF
  // $8D4A: ??? $FF
  // $8D4B: ??? $FF
  // $8D4C: ??? $FF
  // $8D4D: ??? $FF
  // $8D4E: ??? $FF
  // $8D4F: ??? $FF
  // $8D50: ??? $FF
  // $8D51: ??? $FF
  // $8D52: ??? $FF
  // $8D53: ??? $FF
  // $8D54: ??? $FF
  // $8D55: ??? $FF
  // $8D56: ??? $FF
  // $8D57: ??? $FF
  // $8D58: ??? $FF
  // $8D59: ??? $FF
  // $8D5A: ??? $FF
  // $8D5B: ??? $FF
  // $8D5C: ??? $FF
  // $8D5D: ??? $FF
  // $8D5E: ??? $FF
  // $8D5F: ??? $FF
  // $8D60: ??? $FF
  // $8D61: ??? $FF
  // $8D62: ??? $FF
  // $8D63: ??? $FF
  // $8D64: ??? $FF
  // $8D65: ??? $FF
  // $8D66: ??? $FF
  // $8D67: ??? $FF
  // $8D68: ??? $FF
  // $8D69: ??? $FF
  // $8D6A: ??? $FF
  // $8D6B: ??? $FF
  // $8D6C: ??? $FF
  // $8D6D: ??? $FF
  // $8D6E: ??? $FF
  // $8D6F: ??? $FF
  // $8D70: ??? $FF
  // $8D71: ??? $FF
  // $8D72: ??? $FF
  // $8D73: ??? $FF
  // $8D74: ??? $FF
  // $8D75: ??? $FF
  // $8D76: ??? $FF
  // $8D77: ??? $FF
  // $8D78: ??? $FF
  // $8D79: ??? $FF
  // $8D7A: ??? $FF
  // $8D7B: ??? $FF
  // $8D7C: ??? $FF
  // $8D7D: ??? $FF
  // $8D7E: ??? $FF
  // $8D7F: ??? $FF
  // $8D80: ??? $FF
  // $8D81: ??? $FF
  // $8D82: ??? $FF
  // $8D83: ??? $FF
  // $8D84: ??? $FF
  // $8D85: ??? $FF
  // $8D86: ??? $FF
  // $8D87: ??? $FF
  // $8D88: ??? $FF
  // $8D89: ??? $FF
  // $8D8A: ??? $FF
  // $8D8B: ??? $FF
  // $8D8C: ??? $FF
  // $8D8D: ??? $FF
  // $8D8E: ??? $FF
  // $8D8F: ??? $FF
  // $8D90: ??? $FF
  // $8D91: ??? $FF
  // $8D92: ??? $FF
  // $8D93: ??? $FF
  // $8D94: ??? $FF
  // $8D95: ??? $FF
  // $8D96: ??? $FF
  // $8D97: ??? $FF
  // $8D98: ??? $FF
  // $8D99: ??? $FF
  // $8D9A: ??? $FF
  // $8D9B: ??? $FF
  // $8D9C: ??? $FF
  // $8D9D: ??? $FF
  // $8D9E: ??? $FF
  // $8D9F: ??? $FF
  // $8DA0: ??? $FF
  // $8DA1: ??? $FF
  // $8DA2: ??? $FF
  // $8DA3: ??? $FF
  // $8DA4: ??? $FF
  // $8DA5: ??? $FF
  // $8DA6: ??? $FF
  // $8DA7: ??? $FF
  // $8DA8: ??? $FF
  // $8DA9: ??? $FF
  // $8DAA: ??? $FF
  // $8DAB: ??? $FF
  // $8DAC: ??? $FF
  // $8DAD: ??? $FF
  // $8DAE: ??? $FF
  // $8DAF: ??? $FF
  // $8DB0: ??? $FF
  // $8DB1: ??? $FF
  // $8DB2: ??? $FF
  // $8DB3: ??? $FF
  // $8DB4: ??? $FF
  // $8DB5: ??? $FF
  // $8DB6: ??? $FF
  // $8DB7: ??? $FF
  // $8DB8: ??? $FF
  // $8DB9: ??? $FF
  // $8DBA: ??? $FF
  // $8DBB: ??? $FF
  // $8DBC: ??? $FF
  // $8DBD: ??? $FF
  // $8DBE: ??? $FF
  // $8DBF: ??? $FF
  // $8DC0: ??? $FF
  // $8DC1: ??? $FF
  // $8DC2: ??? $FF
  // $8DC3: ??? $FF
  // $8DC4: ??? $FF
  // $8DC5: ??? $FF
  // $8DC6: ??? $FF
  // $8DC7: ??? $FF
  // $8DC8: ??? $FF
  // $8DC9: ??? $FF
  // $8DCA: ??? $FF
  // $8DCB: ??? $FF
  // $8DCC: ??? $FF
  // $8DCD: ??? $FF
  // $8DCE: ??? $FF
  // $8DCF: ??? $FF
  // $8DD0: ??? $FF
  // $8DD1: ??? $FF
  // $8DD2: ??? $FF
  // $8DD3: ??? $FF
  // $8DD4: ??? $FF
  // $8DD5: ??? $FF
  // $8DD6: ??? $FF
  // $8DD7: ??? $FF
  // $8DD8: ??? $FF
  // $8DD9: ??? $FF
  // $8DDA: ??? $FF
  // $8DDB: ??? $FF
  // $8DDC: ??? $FF
  // $8DDD: ??? $FF
  // $8DDE: ??? $FF
  // $8DDF: ??? $FF
  // $8DE0: ??? $FF
  // $8DE1: ??? $FF
  // $8DE2: ??? $FF
  // $8DE3: ??? $FF
  // $8DE4: ??? $FF
  // $8DE5: ??? $FF
  // $8DE6: ??? $FF
  // $8DE7: ??? $FF
  // $8DE8: ??? $FF
  // $8DE9: ??? $FF
  // $8DEA: ??? $FF
  // $8DEB: ??? $FF
  // $8DEC: ??? $FF
  // $8DED: ??? $FF
  // $8DEE: ??? $FF
  // $8DEF: ??? $FF
  // $8DF0: ??? $FF
  // $8DF1: ??? $FF
  // $8DF2: ??? $FF
  // $8DF3: ??? $FF
  // $8DF4: ??? $FF
  // $8DF5: ??? $FF
  // $8DF6: ??? $FF
  // $8DF7: ??? $FF
  // $8DF8: ??? $FF
  // $8DF9: ??? $FF
  // $8DFA: ??? $FF
  // $8DFB: ??? $FF
  // $8DFC: ??? $FF
  // $8DFD: ??? $FF
  // $8DFE: ??? $FF
  // $8DFF: ??? $FF
  // $8E00: ??? $FF
  // $8E01: ??? $FF
  // $8E02: ??? $FF
  // $8E03: ??? $FF
  // $8E04: ??? $FF
  // $8E05: ??? $FF
  // $8E06: ??? $FF
  // $8E07: ??? $FF
  // $8E08: ??? $FF
  // $8E09: ??? $FF
  // $8E0A: ??? $FF
  // $8E0B: ??? $FF
  // $8E0C: ??? $FF
  // $8E0D: ??? $FF
  // $8E0E: ??? $FF
  // $8E0F: ??? $FF
  // $8E10: ??? $FF
  // $8E11: ??? $FF
  // $8E12: ??? $FF
  // $8E13: ??? $FF
  // $8E14: ??? $FF
  // $8E15: ??? $FF
  // $8E16: ??? $FF
  // $8E17: ??? $FF
  // $8E18: ??? $FF
  // $8E19: ??? $FF
  // $8E1A: ??? $FF
  // $8E1B: ??? $FF
  // $8E1C: ??? $FF
  // $8E1D: ??? $FF
  // $8E1E: ??? $FF
  // $8E1F: ??? $FF
  // $8E20: ??? $FF
  // $8E21: ??? $FF
  // $8E22: ??? $FF
  // $8E23: ??? $FF
  // $8E24: ??? $FF
  // $8E25: ??? $FF
  // $8E26: ??? $FF
  // $8E27: ??? $FF
  // $8E28: ??? $FF
  // $8E29: ??? $FF
  // $8E2A: ??? $FF
  // $8E2B: ??? $FF
  // $8E2C: ??? $FF
  // $8E2D: ??? $FF
  // $8E2E: ??? $FF
  // $8E2F: ??? $FF
  // $8E30: ??? $FF
  // $8E31: ??? $FF
  // $8E32: ??? $FF
  // $8E33: ??? $FF
  // $8E34: ??? $FF
  // $8E35: ??? $FF
  // $8E36: ??? $FF
  // $8E37: ??? $FF
  // $8E38: ??? $FF
  // $8E39: ??? $FF
  // $8E3A: ??? $FF
  // $8E3B: ??? $FF
  // $8E3C: ??? $FF
  // $8E3D: ??? $FF
  // $8E3E: ??? $FF
  // $8E3F: ??? $FF
  // $8E40: ??? $FF
  // $8E41: ??? $FF
  // $8E42: ??? $FF
  // $8E43: ??? $FF
  // $8E44: ??? $FF
  // $8E45: ??? $FF
  // $8E46: ??? $FF
  // $8E47: ??? $FF
  // $8E48: ??? $FF
  // $8E49: ??? $FF
  // $8E4A: ??? $FF
  // $8E4B: ??? $FF
  // $8E4C: ??? $FF
  // $8E4D: ??? $FF
  // $8E4E: ??? $FF
  // $8E4F: ??? $FF
  // $8E50: ??? $FF
  // $8E51: ??? $FF
  // $8E52: ??? $FF
  // $8E53: ??? $FF
  // $8E54: ??? $FF
  // $8E55: ??? $FF
  // $8E56: ??? $FF
  // $8E57: ??? $FF
  // $8E58: ??? $FF
  // $8E59: ??? $FF
  // $8E5A: ??? $FF
  // $8E5B: ??? $FF
  // $8E5C: ??? $FF
  // $8E5D: ??? $FF
  // $8E5E: ??? $FF
  // $8E5F: ??? $FF
  // $8E60: ??? $FF
  // $8E61: ??? $FF
  // $8E62: ??? $FF
  // $8E63: ??? $FF
  // $8E64: ??? $FF
  // $8E65: ??? $FF
  // $8E66: ??? $FF
  // $8E67: ??? $FF
  // $8E68: ??? $FF
  // $8E69: ??? $FF
  // $8E6A: ??? $FF
  // $8E6B: ??? $FF
  // $8E6C: ??? $FF
  // $8E6D: ??? $FF
  // $8E6E: ??? $FF
  // $8E6F: ??? $FF
  // $8E70: ??? $FF
  // $8E71: ??? $FF
  // $8E72: ??? $FF
  // $8E73: ??? $FF
  // $8E74: ??? $FF
  // $8E75: ??? $FF
  // $8E76: ??? $FF
  // $8E77: ??? $FF
  // $8E78: ??? $FF
  // $8E79: ??? $FF
  // $8E7A: ??? $FF
  // $8E7B: ??? $FF
  // $8E7C: ??? $FF
  // $8E7D: ??? $FF
  // $8E7E: ??? $FF
  // $8E7F: ??? $FF
  // $8E80: ??? $FF
  // $8E81: ??? $FF
  // $8E82: ??? $FF
  // $8E83: ??? $FF
  // $8E84: ??? $FF
  // $8E85: ??? $FF
  // $8E86: ??? $FF
  // $8E87: ??? $FF
  // $8E88: ??? $FF
  // $8E89: ??? $FF
  // $8E8A: ??? $FF
  // $8E8B: ??? $FF
  // $8E8C: ??? $FF
  // $8E8D: ??? $FF
  // $8E8E: ??? $FF
  // $8E8F: ??? $FF
  // $8E90: ??? $FF
  // $8E91: ??? $FF
  // $8E92: ??? $FF
  // $8E93: ??? $FF
  // $8E94: ??? $FF
  // $8E95: ??? $FF
  // $8E96: ??? $FF
  // $8E97: ??? $FF
  // $8E98: ??? $FF
  // $8E99: ??? $FF
  // $8E9A: ??? $FF
  // $8E9B: ??? $FF
  // $8E9C: ??? $FF
  // $8E9D: ??? $FF
  // $8E9E: ??? $FF
  // $8E9F: ??? $FF
  // $8EA0: ??? $FF
  // $8EA1: ??? $FF
  // $8EA2: ??? $FF
  // $8EA3: ??? $FF
  // $8EA4: ??? $FF
  // $8EA5: ??? $FF
  // $8EA6: ??? $FF
  // $8EA7: ??? $FF
  // $8EA8: ??? $FF
  // $8EA9: ??? $FF
  // $8EAA: ??? $FF
  // $8EAB: ??? $FF
  // $8EAC: ??? $FF
  // $8EAD: ??? $FF
  // $8EAE: ??? $FF
  // $8EAF: ??? $FF
  // $8EB0: ??? $FF
  // $8EB1: ??? $FF
  // $8EB2: ??? $FF
  // $8EB3: ??? $FF
  // $8EB4: ??? $FF
  // $8EB5: ??? $FF
  // $8EB6: ??? $FF
  // $8EB7: ??? $FF
  // $8EB8: ??? $FF
  // $8EB9: ??? $FF
  // $8EBA: ??? $FF
  // $8EBB: ??? $FF
  // $8EBC: ??? $FF
  // $8EBD: ??? $FF
  // $8EBE: ??? $FF
  // $8EBF: ??? $FF
  // $8EC0: ??? $FF
  // $8EC1: ??? $FF
  // $8EC2: ??? $FF
  // $8EC3: ??? $FF
  // $8EC4: ??? $FF
  // $8EC5: ??? $FF
  // $8EC6: ??? $FF
  // $8EC7: ??? $FF
  // $8EC8: ??? $FF
  // $8EC9: ??? $FF
  // $8ECA: ??? $FF
  // $8ECB: ??? $FF
  // $8ECC: ??? $FF
  // $8ECD: ??? $FF
  // $8ECE: ??? $FF
  // $8ECF: ??? $FF
  // $8ED0: ??? $FF
  // $8ED1: ??? $FF
  // $8ED2: ??? $FF
  // $8ED3: ??? $FF
  // $8ED4: ??? $FF
  // $8ED5: ??? $FF
  // $8ED6: ??? $FF
  // $8ED7: ??? $FF
  // $8ED8: ??? $FF
  // $8ED9: ??? $FF
  // $8EDA: ??? $FF
  // $8EDB: ??? $FF
  // $8EDC: ??? $FF
  // $8EDD: ??? $FF
  // $8EDE: ??? $FF
  // $8EDF: ??? $FF
  // $8EE0: ??? $FF
  // $8EE1: ??? $FF
  // $8EE2: ??? $FF
  // $8EE3: ??? $FF
  // $8EE4: ??? $FF
  // $8EE5: ??? $FF
  // $8EE6: ??? $FF
  // $8EE7: ??? $FF
  // $8EE8: ??? $FF
  // $8EE9: ??? $FF
  // $8EEA: ??? $FF
  // $8EEB: ??? $FF
  // $8EEC: ??? $FF
  // $8EED: ??? $FF
  // $8EEE: ??? $FF
  // $8EEF: ??? $FF
  // $8EF0: ??? $FF
  // $8EF1: ??? $FF
  // $8EF2: ??? $FF
  // $8EF3: ??? $FF
  // $8EF4: ??? $FF
  // $8EF5: ??? $FF
  // $8EF6: ??? $FF
  // $8EF7: ??? $FF
  // $8EF8: ??? $FF
  // $8EF9: ??? $FF
  // $8EFA: ??? $FF
  // $8EFB: ??? $FF
  // $8EFC: ??? $FF
  // $8EFD: ??? $FF
  // $8EFE: ??? $FF
  // $8EFF: ??? $FF
  // $8F00: ??? $FF
  // $8F01: ??? $FF
  // $8F02: ??? $FF
  // $8F03: ??? $FF
  // $8F04: ??? $FF
  // $8F05: ??? $FF
  // $8F06: ??? $FF
  // $8F07: ??? $FF
  // $8F08: ??? $FF
  // $8F09: ??? $FF
  // $8F0A: ??? $FF
  // $8F0B: ??? $FF
  // $8F0C: ??? $FF
  // $8F0D: ??? $FF
  // $8F0E: ??? $FF
  // $8F0F: ??? $FF
  // $8F10: ??? $FF
  // $8F11: ??? $FF
  // $8F12: ??? $FF
  // $8F13: ??? $FF
  // $8F14: ??? $FF
  // $8F15: ??? $FF
  // $8F16: ??? $FF
  // $8F17: ??? $FF
  // $8F18: ??? $FF
  // $8F19: ??? $FF
  // $8F1A: ??? $FF
  // $8F1B: ??? $FF
  // $8F1C: ??? $FF
  // $8F1D: ??? $FF
  // $8F1E: ??? $FF
  // $8F1F: ??? $FF
  // $8F20: ??? $FF
  // $8F21: ??? $FF
  // $8F22: ??? $FF
  // $8F23: ??? $FF
  // $8F24: ??? $FF
  // $8F25: ??? $FF
  // $8F26: ??? $FF
  // $8F27: ??? $FF
  // $8F28: ??? $FF
  // $8F29: ??? $FF
  // $8F2A: ??? $FF
  // $8F2B: ??? $FF
  // $8F2C: ??? $FF
  // $8F2D: ??? $FF
  // $8F2E: ??? $FF
  // $8F2F: ??? $FF
  // $8F30: ??? $FF
  // $8F31: ??? $FF
  // $8F32: ??? $FF
  // $8F33: ??? $FF
  // $8F34: ??? $FF
  // $8F35: ??? $FF
  // $8F36: ??? $FF
  // $8F37: ??? $FF
  // $8F38: ??? $FF
  // $8F39: ??? $FF
  // $8F3A: ??? $FF
  // $8F3B: ??? $FF
  // $8F3C: ??? $FF
  // $8F3D: ??? $FF
  // $8F3E: ??? $FF
  // $8F3F: ??? $FF
  // $8F40: ??? $FF
  // $8F41: ??? $FF
  // $8F42: ??? $FF
  // $8F43: ??? $FF
  // $8F44: ??? $FF
  // $8F45: ??? $FF
  // $8F46: ??? $FF
  // $8F47: ??? $FF
  // $8F48: ??? $FF
  // $8F49: ??? $FF
  // $8F4A: ??? $FF
  // $8F4B: ??? $FF
  // $8F4C: ??? $FF
  // $8F4D: ??? $FF
  // $8F4E: ??? $FF
  // $8F4F: ??? $FF
  // $8F50: ??? $FF
  // $8F51: ??? $FF
  // $8F52: ??? $FF
  // $8F53: ??? $FF
  // $8F54: ??? $FF
  // $8F55: ??? $FF
  // $8F56: ??? $FF
  // $8F57: ??? $FF
  // $8F58: ??? $FF
  // $8F59: ??? $FF
  // $8F5A: ??? $FF
  // $8F5B: ??? $FF
  // $8F5C: ??? $FF
  // $8F5D: ??? $FF
  // $8F5E: ??? $FF
  // $8F5F: ??? $FF
  // $8F60: ??? $FF
  // $8F61: ??? $FF
  // $8F62: ??? $FF
  // $8F63: ??? $FF
  // $8F64: ??? $FF
  // $8F65: ??? $FF
  // $8F66: ??? $FF
  // $8F67: ??? $FF
  // $8F68: ??? $FF
  // $8F69: ??? $FF
  // $8F6A: ??? $FF
  // $8F6B: ??? $FF
  // $8F6C: ??? $FF
  // $8F6D: ??? $FF
  // $8F6E: ??? $FF
  // $8F6F: ??? $FF
  // $8F70: ??? $FF
  // $8F71: ??? $FF
  // $8F72: ??? $FF
  // $8F73: ??? $FF
  // $8F74: ??? $FF
  // $8F75: ??? $FF
  // $8F76: ??? $FF
  // $8F77: ??? $FF
  // $8F78: ??? $FF
  // $8F79: ??? $FF
  // $8F7A: ??? $FF
  // $8F7B: ??? $FF
  // $8F7C: ??? $FF
  // $8F7D: ??? $FF
  // $8F7E: ??? $FF
  // $8F7F: ??? $FF
  // $8F80: ??? $FF
  // $8F81: ??? $FF
  // $8F82: ??? $FF
  // $8F83: ??? $FF
  // $8F84: ??? $FF
  // $8F85: ??? $FF
  // $8F86: ??? $FF
  // $8F87: ??? $FF
  // $8F88: ??? $FF
  // $8F89: ??? $FF
  // $8F8A: ??? $FF
  // $8F8B: ??? $FF
  // $8F8C: ??? $FF
  // $8F8D: ??? $FF
  // $8F8E: ??? $FF
  // $8F8F: ??? $FF
  // $8F90: ??? $FF
  // $8F91: ??? $FF
  // $8F92: ??? $FF
  // $8F93: ??? $FF
  // $8F94: ??? $FF
  // $8F95: ??? $FF
  // $8F96: ??? $FF
  // $8F97: ??? $FF
  // $8F98: ??? $FF
  // $8F99: ??? $FF
  // $8F9A: ??? $FF
  // $8F9B: ??? $FF
  // $8F9C: ??? $FF
  // $8F9D: ??? $FF
  // $8F9E: ??? $FF
  // $8F9F: ??? $FF
  // $8FA0: ??? $FF
  // $8FA1: ??? $FF
  // $8FA2: ??? $FF
  // $8FA3: ??? $FF
  // $8FA4: ??? $FF
  // $8FA5: ??? $FF
  // $8FA6: ??? $FF
  // $8FA7: ??? $FF
  // $8FA8: ??? $FF
  // $8FA9: ??? $FF
  // $8FAA: ??? $FF
  // $8FAB: ??? $FF
  // $8FAC: ??? $FF
  // $8FAD: ??? $FF
  // $8FAE: ??? $FF
  // $8FAF: ??? $FF
  // $8FB0: ??? $FF
  // $8FB1: ??? $FF
  // $8FB2: ??? $FF
  // $8FB3: ??? $FF
  // $8FB4: ??? $FF
  // $8FB5: ??? $FF
  // $8FB6: ??? $FF
  // $8FB7: ??? $FF
  // $8FB8: ??? $FF
  // $8FB9: ??? $FF
  // $8FBA: ??? $FF
  // $8FBB: ??? $FF
  // $8FBC: ??? $FF
  // $8FBD: ??? $FF
  // $8FBE: ??? $FF
  // $8FBF: ??? $FF
  // $8FC0: ??? $FF
  // $8FC1: ??? $FF
  // $8FC2: ??? $FF
  // $8FC3: ??? $FF
  // $8FC4: ??? $FF
  // $8FC5: ??? $FF
  // $8FC6: ??? $FF
  // $8FC7: ??? $FF
  // $8FC8: ??? $FF
  // $8FC9: ??? $FF
  // $8FCA: ??? $FF
  // $8FCB: ??? $FF
  // $8FCC: ??? $FF
  // $8FCD: ??? $FF
  // $8FCE: ??? $FF
  // $8FCF: ??? $FF
  // $8FD0: ??? $FF
  // $8FD1: ??? $FF
  // $8FD2: ??? $FF
  // $8FD3: ??? $FF
  // $8FD4: ??? $FF
  // $8FD5: ??? $FF
  // $8FD6: ??? $FF
  // $8FD7: ??? $FF
  // $8FD8: ??? $FF
  // $8FD9: ??? $FF
  // $8FDA: ??? $FF
  // $8FDB: ??? $FF
  // $8FDC: ??? $FF
  // $8FDD: ??? $FF
  // $8FDE: ??? $FF
  // $8FDF: ??? $FF
  // $8FE0: ??? $FF
  // $8FE1: ??? $FF
  // $8FE2: ??? $FF
  // $8FE3: ??? $FF
  // $8FE4: ??? $FF
  // $8FE5: ??? $FF
  // $8FE6: ??? $FF
  // $8FE7: ??? $FF
  // $8FE8: ??? $FF
  // $8FE9: ??? $FF
  // $8FEA: ??? $FF
  // $8FEB: ??? $FF
  // $8FEC: ??? $FF
  // $8FED: ??? $FF
  // $8FEE: ??? $FF
  // $8FEF: ??? $FF
  // $8FF0: ??? $FF
  // $8FF1: ??? $FF
  // $8FF2: ??? $FF
  // $8FF3: ??? $FF
  // $8FF4: ??? $FF
  // $8FF5: ??? $FF
  // $8FF6: ??? $FF
  // $8FF7: ??? $FF
  // $8FF8: ??? $FF
  // $8FF9: ??? $FF
  // $8FFA: ??? $FF
  // $8FFB: ??? $FF
  // $8FFC: ??? $FF
  // $8FFD: ??? $FF
  // $8FFE: ??? $FF
  // $8FFF: ??? $FF
  return [
    0x8D, 0x06, 0x20, 0xA5, 0xE9, 0x20, 0x71, 0xAC, 0x8D, 0x07, 0x20, 0xA5, 0xE8, 0x20, 0x6D, 0xAC,
    0x8D, 0x07, 0x20, 0xA5, 0xE8, 0x20, 0x71, 0xAC, 0x8D, 0x07, 0x20, 0xA9, 0x00, 0x8D, 0x07, 0x20,
    0x8D, 0x07, 0x20, 0xA0, 0x00, 0xB1, 0xE8, 0x20, 0x6D, 0xAC, 0x8D, 0x07, 0x20, 0xB1, 0xE8, 0x20,
    0x71, 0xAC, 0x8D, 0x07, 0x20, 0xA9, 0x00, 0x8D, 0x07, 0x20, 0xC8, 0xC0, 0x08, 0xD0, 0xE6, 0xA5,
    0xE8, 0x18, 0x69, 0x08, 0x85, 0xE8, 0xA5, 0xE9, 0x69, 0x00, 0x85, 0xE9, 0xA5, 0xE6, 0x18, 0x69,
    0x40, 0x85, 0xE6, 0xA5, 0xE7, 0x69, 0x00, 0x85, 0xE7, 0xC6, 0xEA, 0xF0, 0x03, 0x4C, 0xF9, 0xAB,
    0x20, 0x7E, 0xAC, 0xC6, 0xEB, 0xF0, 0x03, 0x4C, 0xED, 0xAB, 0x4C, 0xE3, 0xAB, 0x4A, 0x4A, 0x4A,
    0x4A, 0x29, 0x0F, 0x18, 0x69, 0x33, 0xC9, 0x3D, 0x90, 0x03, 0x18, 0x69, 0x44, 0x60, 0xA9, 0x18,
    0x8D, 0x01, 0x20, 0xA9, 0x00, 0x8D, 0x05, 0x20, 0x8D, 0x05, 0x20, 0xA8, 0xAA, 0xA9, 0x40, 0x88,
    0xD0, 0xFD, 0xCA, 0xD0, 0xFA, 0x38, 0xE9, 0x01, 0xD0, 0xF5, 0xA9, 0x00, 0x8D, 0x01, 0x20, 0x8D,
    0x05, 0x20, 0x8D, 0x05, 0x20, 0x60, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
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
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF
  ];
}

// ════════ $9000-$93FF (1024B): 未使用 (0xFF填充) ═══════=
function build_9000_93FF_unused(): readonly number[] {
  // $9000: ??? $FF
  // $9001: ??? $FF
  // $9002: ??? $FF
  // $9003: ??? $FF
  // $9004: ??? $FF
  // $9005: ??? $FF
  // $9006: ??? $FF
  // $9007: ??? $FF
  // $9008: ??? $FF
  // $9009: ??? $FF
  // $900A: ??? $FF
  // $900B: ??? $FF
  // $900C: ??? $FF
  // $900D: ??? $FF
  // $900E: ??? $FF
  // $900F: ??? $FF
  // $9010: ??? $FF
  // $9011: ??? $FF
  // $9012: ??? $FF
  // $9013: ??? $FF
  // $9014: ??? $FF
  // $9015: ??? $FF
  // $9016: ??? $FF
  // $9017: ??? $FF
  // $9018: ??? $FF
  // $9019: ??? $FF
  // $901A: ??? $FF
  // $901B: ??? $FF
  // $901C: ??? $FF
  // $901D: ??? $FF
  // $901E: ??? $FF
  // $901F: ??? $FF
  // $9020: ??? $FF
  // $9021: ??? $FF
  // $9022: ??? $FF
  // $9023: ??? $FF
  // $9024: ??? $FF
  // $9025: ??? $FF
  // $9026: ??? $FF
  // $9027: ??? $FF
  // $9028: ??? $FF
  // $9029: ??? $FF
  // $902A: ??? $FF
  // $902B: ??? $FF
  // $902C: ??? $FF
  // $902D: ??? $FF
  // $902E: ??? $FF
  // $902F: ??? $FF
  // $9030: ??? $FF
  // $9031: ??? $FF
  // $9032: ??? $FF
  // $9033: ??? $FF
  // $9034: ??? $FF
  // $9035: ??? $FF
  // $9036: ??? $FF
  // $9037: ??? $FF
  // $9038: ??? $FF
  // $9039: ??? $FF
  // $903A: ??? $FF
  // $903B: ??? $FF
  // $903C: ??? $FF
  // $903D: ??? $FF
  // $903E: ??? $FF
  // $903F: ??? $FF
  // $9040: ??? $FF
  // $9041: ??? $FF
  // $9042: ??? $FF
  // $9043: ??? $FF
  // $9044: ??? $FF
  // $9045: ??? $FF
  // $9046: ??? $FF
  // $9047: ??? $FF
  // $9048: ??? $FF
  // $9049: ??? $FF
  // $904A: ??? $FF
  // $904B: ??? $FF
  // $904C: ??? $FF
  // $904D: ??? $FF
  // $904E: ??? $FF
  // $904F: ??? $FF
  // $9050: ??? $FF
  // $9051: ??? $FF
  // $9052: ??? $FF
  // $9053: ??? $FF
  // $9054: ??? $FF
  // $9055: ??? $FF
  // $9056: ??? $FF
  // $9057: ??? $FF
  // $9058: ??? $FF
  // $9059: ??? $FF
  // $905A: ??? $FF
  // $905B: ??? $FF
  // $905C: ??? $FF
  // $905D: ??? $FF
  // $905E: ??? $FF
  // $905F: ??? $FF
  // $9060: ??? $FF
  // $9061: ??? $FF
  // $9062: ??? $FF
  // $9063: ??? $FF
  // $9064: ??? $FF
  // $9065: ??? $FF
  // $9066: ??? $FF
  // $9067: ??? $FF
  // $9068: ??? $FF
  // $9069: ??? $FF
  // $906A: ??? $FF
  // $906B: ??? $FF
  // $906C: ??? $FF
  // $906D: ??? $FF
  // $906E: ??? $FF
  // $906F: ??? $FF
  // $9070: ??? $FF
  // $9071: ??? $FF
  // $9072: ??? $FF
  // $9073: ??? $FF
  // $9074: ??? $FF
  // $9075: ??? $FF
  // $9076: ??? $FF
  // $9077: ??? $FF
  // $9078: ??? $FF
  // $9079: ??? $FF
  // $907A: ??? $FF
  // $907B: ??? $FF
  // $907C: ??? $FF
  // $907D: ??? $FF
  // $907E: ??? $FF
  // $907F: ??? $FF
  // $9080: ??? $FF
  // $9081: ??? $FF
  // $9082: ??? $FF
  // $9083: ??? $FF
  // $9084: ??? $FF
  // $9085: ??? $FF
  // $9086: ??? $FF
  // $9087: ??? $FF
  // $9088: ??? $FF
  // $9089: ??? $FF
  // $908A: ??? $FF
  // $908B: ??? $FF
  // $908C: ??? $FF
  // $908D: ??? $FF
  // $908E: ??? $FF
  // $908F: ??? $FF
  // $9090: ??? $FF
  // $9091: ??? $FF
  // $9092: ??? $FF
  // $9093: ??? $FF
  // $9094: ??? $FF
  // $9095: ??? $FF
  // $9096: ??? $FF
  // $9097: ??? $FF
  // $9098: ??? $FF
  // $9099: ??? $FF
  // $909A: ??? $FF
  // $909B: ??? $FF
  // $909C: ??? $FF
  // $909D: ??? $FF
  // $909E: ??? $FF
  // $909F: ??? $FF
  // $90A0: ??? $FF
  // $90A1: ??? $FF
  // $90A2: ??? $FF
  // $90A3: ??? $FF
  // $90A4: ??? $FF
  // $90A5: ??? $FF
  // $90A6: ??? $FF
  // $90A7: ??? $FF
  // $90A8: ??? $FF
  // $90A9: ??? $FF
  // $90AA: ??? $FF
  // $90AB: ??? $FF
  // $90AC: ??? $FF
  // $90AD: ??? $FF
  // $90AE: ??? $FF
  // $90AF: ??? $FF
  // $90B0: ??? $FF
  // $90B1: ??? $FF
  // $90B2: ??? $FF
  // $90B3: ??? $FF
  // $90B4: ??? $FF
  // $90B5: ??? $FF
  // $90B6: ??? $FF
  // $90B7: ??? $FF
  // $90B8: ??? $FF
  // $90B9: ??? $FF
  // $90BA: ??? $FF
  // $90BB: ??? $FF
  // $90BC: ??? $FF
  // $90BD: ??? $FF
  // $90BE: ??? $FF
  // $90BF: ??? $FF
  // $90C0: ??? $FF
  // $90C1: ??? $FF
  // $90C2: ??? $FF
  // $90C3: ??? $FF
  // $90C4: ??? $FF
  // $90C5: ??? $FF
  // $90C6: ??? $FF
  // $90C7: ??? $FF
  // $90C8: ??? $FF
  // $90C9: ??? $FF
  // $90CA: ??? $FF
  // $90CB: ??? $FF
  // $90CC: ??? $FF
  // $90CD: ??? $FF
  // $90CE: ??? $FF
  // $90CF: ??? $FF
  // $90D0: ??? $FF
  // $90D1: ??? $FF
  // $90D2: ??? $FF
  // $90D3: ??? $FF
  // $90D4: ??? $FF
  // $90D5: ??? $FF
  // $90D6: ??? $FF
  // $90D7: ??? $FF
  // $90D8: ??? $FF
  // $90D9: ??? $FF
  // $90DA: ??? $FF
  // $90DB: ??? $FF
  // $90DC: ??? $FF
  // $90DD: ??? $FF
  // $90DE: ??? $FF
  // $90DF: ??? $FF
  // $90E0: ??? $FF
  // $90E1: ??? $FF
  // $90E2: ??? $FF
  // $90E3: ??? $FF
  // $90E4: ??? $FF
  // $90E5: ??? $FF
  // $90E6: ??? $FF
  // $90E7: ??? $FF
  // $90E8: ??? $FF
  // $90E9: ??? $FF
  // $90EA: ??? $FF
  // $90EB: ??? $FF
  // $90EC: ??? $FF
  // $90ED: ??? $FF
  // $90EE: ??? $FF
  // $90EF: ??? $FF
  // $90F0: ??? $FF
  // $90F1: ??? $FF
  // $90F2: ??? $FF
  // $90F3: ??? $FF
  // $90F4: ??? $FF
  // $90F5: ??? $FF
  // $90F6: ??? $FF
  // $90F7: ??? $FF
  // $90F8: ??? $FF
  // $90F9: ??? $FF
  // $90FA: ??? $FF
  // $90FB: ??? $FF
  // $90FC: ??? $FF
  // $90FD: ??? $FF
  // $90FE: ??? $FF
  // $90FF: ??? $FF
  // $9100: ??? $FF
  // $9101: ??? $FF
  // $9102: ??? $FF
  // $9103: ??? $FF
  // $9104: ??? $FF
  // $9105: ??? $FF
  // $9106: ??? $FF
  // $9107: ??? $FF
  // $9108: ??? $FF
  // $9109: ??? $FF
  // $910A: ??? $FF
  // $910B: ??? $FF
  // $910C: ??? $FF
  // $910D: ??? $FF
  // $910E: ??? $FF
  // $910F: ??? $FF
  // $9110: ??? $FF
  // $9111: ??? $FF
  // $9112: ??? $FF
  // $9113: ??? $FF
  // $9114: ??? $FF
  // $9115: ??? $FF
  // $9116: ??? $FF
  // $9117: ??? $FF
  // $9118: ??? $FF
  // $9119: ??? $FF
  // $911A: ??? $FF
  // $911B: ??? $FF
  // $911C: ??? $FF
  // $911D: ??? $FF
  // $911E: ??? $FF
  // $911F: ??? $FF
  // $9120: ??? $FF
  // $9121: ??? $FF
  // $9122: ??? $FF
  // $9123: ??? $FF
  // $9124: ??? $FF
  // $9125: ??? $FF
  // $9126: ??? $FF
  // $9127: ??? $FF
  // $9128: ??? $FF
  // $9129: ??? $FF
  // $912A: ??? $FF
  // $912B: ??? $FF
  // $912C: ??? $FF
  // $912D: ??? $FF
  // $912E: ??? $FF
  // $912F: ??? $FF
  // $9130: ??? $FF
  // $9131: ??? $FF
  // $9132: ??? $FF
  // $9133: ??? $FF
  // $9134: ??? $FF
  // $9135: ??? $FF
  // $9136: ??? $FF
  // $9137: ??? $FF
  // $9138: ??? $FF
  // $9139: ??? $FF
  // $913A: ??? $FF
  // $913B: ??? $FF
  // $913C: ??? $FF
  // $913D: ??? $FF
  // $913E: ??? $FF
  // $913F: ??? $FF
  // $9140: ??? $FF
  // $9141: ??? $FF
  // $9142: ??? $FF
  // $9143: ??? $FF
  // $9144: ??? $FF
  // $9145: ??? $FF
  // $9146: ??? $FF
  // $9147: ??? $FF
  // $9148: ??? $FF
  // $9149: ??? $FF
  // $914A: ??? $FF
  // $914B: ??? $FF
  // $914C: ??? $FF
  // $914D: ??? $FF
  // $914E: ??? $FF
  // $914F: ??? $FF
  // $9150: ??? $FF
  // $9151: ??? $FF
  // $9152: ??? $FF
  // $9153: ??? $FF
  // $9154: ??? $FF
  // $9155: ??? $FF
  // $9156: ??? $FF
  // $9157: ??? $FF
  // $9158: ??? $FF
  // $9159: ??? $FF
  // $915A: ??? $FF
  // $915B: ??? $FF
  // $915C: ??? $FF
  // $915D: ??? $FF
  // $915E: ??? $FF
  // $915F: ??? $FF
  // $9160: ??? $FF
  // $9161: ??? $FF
  // $9162: ??? $FF
  // $9163: ??? $FF
  // $9164: ??? $FF
  // $9165: ??? $FF
  // $9166: ??? $FF
  // $9167: ??? $FF
  // $9168: ??? $FF
  // $9169: ??? $FF
  // $916A: ??? $FF
  // $916B: ??? $FF
  // $916C: ??? $FF
  // $916D: ??? $FF
  // $916E: ??? $FF
  // $916F: ??? $FF
  // $9170: ??? $FF
  // $9171: ??? $FF
  // $9172: ??? $FF
  // $9173: ??? $FF
  // $9174: ??? $FF
  // $9175: ??? $FF
  // $9176: ??? $FF
  // $9177: ??? $FF
  // $9178: ??? $FF
  // $9179: ??? $FF
  // $917A: ??? $FF
  // $917B: ??? $FF
  // $917C: ??? $FF
  // $917D: ??? $FF
  // $917E: ??? $FF
  // $917F: ??? $FF
  // $9180: ??? $FF
  // $9181: ??? $FF
  // $9182: ??? $FF
  // $9183: ??? $FF
  // $9184: ??? $FF
  // $9185: ??? $FF
  // $9186: ??? $FF
  // $9187: ??? $FF
  // $9188: ??? $FF
  // $9189: ??? $FF
  // $918A: ??? $FF
  // $918B: ??? $FF
  // $918C: ??? $FF
  // $918D: ??? $FF
  // $918E: ??? $FF
  // $918F: ??? $FF
  // $9190: ??? $FF
  // $9191: ??? $FF
  // $9192: ??? $FF
  // $9193: ??? $FF
  // $9194: ??? $FF
  // $9195: ??? $FF
  // $9196: ??? $FF
  // $9197: ??? $FF
  // $9198: ??? $FF
  // $9199: ??? $FF
  // $919A: ??? $FF
  // $919B: ??? $FF
  // $919C: ??? $FF
  // $919D: ??? $FF
  // $919E: ??? $FF
  // $919F: ??? $FF
  // $91A0: ??? $FF
  // $91A1: ??? $FF
  // $91A2: ??? $FF
  // $91A3: ??? $FF
  // $91A4: ??? $FF
  // $91A5: ??? $FF
  // $91A6: ??? $FF
  // $91A7: ??? $FF
  // $91A8: ??? $FF
  // $91A9: ??? $FF
  // $91AA: ??? $FF
  // $91AB: ??? $FF
  // $91AC: ??? $FF
  // $91AD: ??? $FF
  // $91AE: ??? $FF
  // $91AF: ??? $FF
  // $91B0: ??? $FF
  // $91B1: ??? $FF
  // $91B2: ??? $FF
  // $91B3: ??? $FF
  // $91B4: ??? $FF
  // $91B5: ??? $FF
  // $91B6: ??? $FF
  // $91B7: ??? $FF
  // $91B8: ??? $FF
  // $91B9: ??? $FF
  // $91BA: ??? $FF
  // $91BB: ??? $FF
  // $91BC: ??? $FF
  // $91BD: ??? $FF
  // $91BE: ??? $FF
  // $91BF: ??? $FF
  // $91C0: ??? $FF
  // $91C1: ??? $FF
  // $91C2: ??? $FF
  // $91C3: ??? $FF
  // $91C4: ??? $FF
  // $91C5: ??? $FF
  // $91C6: ??? $FF
  // $91C7: ??? $FF
  // $91C8: ??? $FF
  // $91C9: ??? $FF
  // $91CA: ??? $FF
  // $91CB: ??? $FF
  // $91CC: ??? $FF
  // $91CD: ??? $FF
  // $91CE: ??? $FF
  // $91CF: ??? $FF
  // $91D0: ??? $FF
  // $91D1: ??? $FF
  // $91D2: ??? $FF
  // $91D3: ??? $FF
  // $91D4: ??? $FF
  // $91D5: ??? $FF
  // $91D6: ??? $FF
  // $91D7: ??? $FF
  // $91D8: ??? $FF
  // $91D9: ??? $FF
  // $91DA: ??? $FF
  // $91DB: ??? $FF
  // $91DC: ??? $FF
  // $91DD: ??? $FF
  // $91DE: ??? $FF
  // $91DF: ??? $FF
  // $91E0: ??? $FF
  // $91E1: ??? $FF
  // $91E2: ??? $FF
  // $91E3: ??? $FF
  // $91E4: ??? $FF
  // $91E5: ??? $FF
  // $91E6: ??? $FF
  // $91E7: ??? $FF
  // $91E8: ??? $FF
  // $91E9: ??? $FF
  // $91EA: ??? $FF
  // $91EB: ??? $FF
  // $91EC: ??? $FF
  // $91ED: ??? $FF
  // $91EE: ??? $FF
  // $91EF: ??? $FF
  // $91F0: ??? $FF
  // $91F1: ??? $FF
  // $91F2: ??? $FF
  // $91F3: ??? $FF
  // $91F4: ??? $FF
  // $91F5: ??? $FF
  // $91F6: ??? $FF
  // $91F7: ??? $FF
  // $91F8: ??? $FF
  // $91F9: ??? $FF
  // $91FA: ??? $FF
  // $91FB: ??? $FF
  // $91FC: ??? $FF
  // $91FD: ??? $FF
  // $91FE: ??? $FF
  // $91FF: ??? $FF
  // $9200: ??? $FF
  // $9201: ??? $FF
  // $9202: ??? $FF
  // $9203: ??? $FF
  // $9204: ??? $FF
  // $9205: ??? $FF
  // $9206: ??? $FF
  // $9207: ??? $FF
  // $9208: ??? $FF
  // $9209: ??? $FF
  // $920A: ??? $FF
  // $920B: ??? $FF
  // $920C: ??? $FF
  // $920D: ??? $FF
  // $920E: ??? $FF
  // $920F: ??? $FF
  // $9210: ??? $FF
  // $9211: ??? $FF
  // $9212: ??? $FF
  // $9213: ??? $FF
  // $9214: ??? $FF
  // $9215: ??? $FF
  // $9216: ??? $FF
  // $9217: ??? $FF
  // $9218: ??? $FF
  // $9219: ??? $FF
  // $921A: ??? $FF
  // $921B: ??? $FF
  // $921C: ??? $FF
  // $921D: ??? $FF
  // $921E: ??? $FF
  // $921F: ??? $FF
  // $9220: ??? $FF
  // $9221: ??? $FF
  // $9222: ??? $FF
  // $9223: ??? $FF
  // $9224: ??? $FF
  // $9225: ??? $FF
  // $9226: ??? $FF
  // $9227: ??? $FF
  // $9228: ??? $FF
  // $9229: ??? $FF
  // $922A: ??? $FF
  // $922B: ??? $FF
  // $922C: ??? $FF
  // $922D: ??? $FF
  // $922E: ??? $FF
  // $922F: ??? $FF
  // $9230: ??? $FF
  // $9231: ??? $FF
  // $9232: ??? $FF
  // $9233: ??? $FF
  // $9234: ??? $FF
  // $9235: ??? $FF
  // $9236: ??? $FF
  // $9237: ??? $FF
  // $9238: ??? $FF
  // $9239: ??? $FF
  // $923A: ??? $FF
  // $923B: ??? $FF
  // $923C: ??? $FF
  // $923D: ??? $FF
  // $923E: ??? $FF
  // $923F: ??? $FF
  // $9240: ??? $FF
  // $9241: ??? $FF
  // $9242: ??? $FF
  // $9243: ??? $FF
  // $9244: ??? $FF
  // $9245: ??? $FF
  // $9246: ??? $FF
  // $9247: ??? $FF
  // $9248: ??? $FF
  // $9249: ??? $FF
  // $924A: ??? $FF
  // $924B: ??? $FF
  // $924C: ??? $FF
  // $924D: ??? $FF
  // $924E: ??? $FF
  // $924F: ??? $FF
  // $9250: ??? $FF
  // $9251: ??? $FF
  // $9252: ??? $FF
  // $9253: ??? $FF
  // $9254: ??? $FF
  // $9255: ??? $FF
  // $9256: ??? $FF
  // $9257: ??? $FF
  // $9258: ??? $FF
  // $9259: ??? $FF
  // $925A: ??? $FF
  // $925B: ??? $FF
  // $925C: ??? $FF
  // $925D: ??? $FF
  // $925E: ??? $FF
  // $925F: ??? $FF
  // $9260: ??? $FF
  // $9261: ??? $FF
  // $9262: ??? $FF
  // $9263: ??? $FF
  // $9264: ??? $FF
  // $9265: ??? $FF
  // $9266: ??? $FF
  // $9267: ??? $FF
  // $9268: ??? $FF
  // $9269: ??? $FF
  // $926A: ??? $FF
  // $926B: ??? $FF
  // $926C: ??? $FF
  // $926D: ??? $FF
  // $926E: ??? $FF
  // $926F: ??? $FF
  // $9270: ??? $FF
  // $9271: ??? $FF
  // $9272: ??? $FF
  // $9273: ??? $FF
  // $9274: ??? $FF
  // $9275: ??? $FF
  // $9276: ??? $FF
  // $9277: ??? $FF
  // $9278: ??? $FF
  // $9279: ??? $FF
  // $927A: ??? $FF
  // $927B: ??? $FF
  // $927C: ??? $FF
  // $927D: ??? $FF
  // $927E: ??? $FF
  // $927F: ??? $FF
  // $9280: ??? $FF
  // $9281: ??? $FF
  // $9282: ??? $FF
  // $9283: ??? $FF
  // $9284: ??? $FF
  // $9285: ??? $FF
  // $9286: ??? $FF
  // $9287: ??? $FF
  // $9288: ??? $FF
  // $9289: ??? $FF
  // $928A: ??? $FF
  // $928B: ??? $FF
  // $928C: ??? $FF
  // $928D: ??? $FF
  // $928E: ??? $FF
  // $928F: ??? $FF
  // $9290: ??? $FF
  // $9291: ??? $FF
  // $9292: ??? $FF
  // $9293: ??? $FF
  // $9294: ??? $FF
  // $9295: ??? $FF
  // $9296: ??? $FF
  // $9297: ??? $FF
  // $9298: ??? $FF
  // $9299: ??? $FF
  // $929A: ??? $FF
  // $929B: ??? $FF
  // $929C: ??? $FF
  // $929D: ??? $FF
  // $929E: ??? $FF
  // $929F: ??? $FF
  // $92A0: ??? $FF
  // $92A1: ??? $FF
  // $92A2: ??? $FF
  // $92A3: ??? $FF
  // $92A4: ??? $FF
  // $92A5: ??? $FF
  // $92A6: ??? $FF
  // $92A7: ??? $FF
  // $92A8: ??? $FF
  // $92A9: ??? $FF
  // $92AA: ??? $FF
  // $92AB: ??? $FF
  // $92AC: ??? $FF
  // $92AD: ??? $FF
  // $92AE: ??? $FF
  // $92AF: ??? $FF
  // $92B0: ??? $FF
  // $92B1: ??? $FF
  // $92B2: ??? $FF
  // $92B3: ??? $FF
  // $92B4: ??? $FF
  // $92B5: ??? $FF
  // $92B6: ??? $FF
  // $92B7: ??? $FF
  // $92B8: ??? $FF
  // $92B9: ??? $FF
  // $92BA: ??? $FF
  // $92BB: ??? $FF
  // $92BC: ??? $FF
  // $92BD: ??? $FF
  // $92BE: ??? $FF
  // $92BF: ??? $FF
  // $92C0: ??? $FF
  // $92C1: ??? $FF
  // $92C2: ??? $FF
  // $92C3: ??? $FF
  // $92C4: ??? $FF
  // $92C5: ??? $FF
  // $92C6: ??? $FF
  // $92C7: ??? $FF
  // $92C8: ??? $FF
  // $92C9: ??? $FF
  // $92CA: ??? $FF
  // $92CB: ??? $FF
  // $92CC: ??? $FF
  // $92CD: ??? $FF
  // $92CE: ??? $FF
  // $92CF: ??? $FF
  // $92D0: ??? $FF
  // $92D1: ??? $FF
  // $92D2: ??? $FF
  // $92D3: ??? $FF
  // $92D4: ??? $FF
  // $92D5: ??? $FF
  // $92D6: ??? $FF
  // $92D7: ??? $FF
  // $92D8: ??? $FF
  // $92D9: ??? $FF
  // $92DA: ??? $FF
  // $92DB: ??? $FF
  // $92DC: ??? $FF
  // $92DD: ??? $FF
  // $92DE: ??? $FF
  // $92DF: ??? $FF
  // $92E0: ??? $FF
  // $92E1: ??? $FF
  // $92E2: ??? $FF
  // $92E3: ??? $FF
  // $92E4: ??? $FF
  // $92E5: ??? $FF
  // $92E6: ??? $FF
  // $92E7: ??? $FF
  // $92E8: ??? $FF
  // $92E9: ??? $FF
  // $92EA: ??? $FF
  // $92EB: ??? $FF
  // $92EC: ??? $FF
  // $92ED: ??? $FF
  // $92EE: ??? $FF
  // $92EF: ??? $FF
  // $92F0: ??? $FF
  // $92F1: ??? $FF
  // $92F2: ??? $FF
  // $92F3: ??? $FF
  // $92F4: ??? $FF
  // $92F5: ??? $FF
  // $92F6: ??? $FF
  // $92F7: ??? $FF
  // $92F8: ??? $FF
  // $92F9: ??? $FF
  // $92FA: ??? $FF
  // $92FB: ??? $FF
  // $92FC: ??? $FF
  // $92FD: ??? $FF
  // $92FE: ??? $FF
  // $92FF: ??? $FF
  // $9300: ??? $FF
  // $9301: ??? $FF
  // $9302: ??? $FF
  // $9303: ??? $FF
  // $9304: ??? $FF
  // $9305: ??? $FF
  // $9306: ??? $FF
  // $9307: ??? $FF
  // $9308: ??? $FF
  // $9309: ??? $FF
  // $930A: ??? $FF
  // $930B: ??? $FF
  // $930C: ??? $FF
  // $930D: ??? $FF
  // $930E: ??? $FF
  // $930F: ??? $FF
  // $9310: ??? $FF
  // $9311: ??? $FF
  // $9312: ??? $FF
  // $9313: ??? $FF
  // $9314: ??? $FF
  // $9315: ??? $FF
  // $9316: ??? $FF
  // $9317: ??? $FF
  // $9318: ??? $FF
  // $9319: ??? $FF
  // $931A: ??? $FF
  // $931B: ??? $FF
  // $931C: ??? $FF
  // $931D: ??? $FF
  // $931E: ??? $FF
  // $931F: ??? $FF
  // $9320: ??? $FF
  // $9321: ??? $FF
  // $9322: ??? $FF
  // $9323: ??? $FF
  // $9324: ??? $FF
  // $9325: ??? $FF
  // $9326: ??? $FF
  // $9327: ??? $FF
  // $9328: ??? $FF
  // $9329: ??? $FF
  // $932A: ??? $FF
  // $932B: ??? $FF
  // $932C: ??? $FF
  // $932D: ??? $FF
  // $932E: ??? $FF
  // $932F: ??? $FF
  // $9330: ??? $FF
  // $9331: ??? $FF
  // $9332: ??? $FF
  // $9333: ??? $FF
  // $9334: ??? $FF
  // $9335: ??? $FF
  // $9336: ??? $FF
  // $9337: ??? $FF
  // $9338: ??? $FF
  // $9339: ??? $FF
  // $933A: ??? $FF
  // $933B: ??? $FF
  // $933C: ??? $FF
  // $933D: ??? $FF
  // $933E: ??? $FF
  // $933F: ??? $FF
  // $9340: ??? $FF
  // $9341: ??? $FF
  // $9342: ??? $FF
  // $9343: ??? $FF
  // $9344: ??? $FF
  // $9345: ??? $FF
  // $9346: ??? $FF
  // $9347: ??? $FF
  // $9348: ??? $FF
  // $9349: ??? $FF
  // $934A: ??? $FF
  // $934B: ??? $FF
  // $934C: ??? $FF
  // $934D: ??? $FF
  // $934E: ??? $FF
  // $934F: ??? $FF
  // $9350: ??? $FF
  // $9351: ??? $FF
  // $9352: ??? $FF
  // $9353: ??? $FF
  // $9354: ??? $FF
  // $9355: ??? $FF
  // $9356: ??? $FF
  // $9357: ??? $FF
  // $9358: ??? $FF
  // $9359: ??? $FF
  // $935A: ??? $FF
  // $935B: ??? $FF
  // $935C: ??? $FF
  // $935D: ??? $FF
  // $935E: ??? $FF
  // $935F: ??? $FF
  // $9360: ??? $FF
  // $9361: ??? $FF
  // $9362: ??? $FF
  // $9363: ??? $FF
  // $9364: ??? $FF
  // $9365: ??? $FF
  // $9366: ??? $FF
  // $9367: ??? $FF
  // $9368: ??? $FF
  // $9369: ??? $FF
  // $936A: ??? $FF
  // $936B: ??? $FF
  // $936C: ??? $FF
  // $936D: ??? $FF
  // $936E: ??? $FF
  // $936F: ??? $FF
  // $9370: ??? $FF
  // $9371: ??? $FF
  // $9372: ??? $FF
  // $9373: ??? $FF
  // $9374: ??? $FF
  // $9375: ??? $FF
  // $9376: ??? $FF
  // $9377: ??? $FF
  // $9378: ??? $FF
  // $9379: ??? $FF
  // $937A: ??? $FF
  // $937B: ??? $FF
  // $937C: ??? $FF
  // $937D: ??? $FF
  // $937E: ??? $FF
  // $937F: ??? $FF
  // $9380: ??? $FF
  // $9381: ??? $FF
  // $9382: ??? $FF
  // $9383: ??? $FF
  // $9384: ??? $FF
  // $9385: ??? $FF
  // $9386: ??? $FF
  // $9387: ??? $FF
  // $9388: ??? $FF
  // $9389: ??? $FF
  // $938A: ??? $FF
  // $938B: ??? $FF
  // $938C: ??? $FF
  // $938D: ??? $FF
  // $938E: ??? $FF
  // $938F: ??? $FF
  // $9390: ??? $FF
  // $9391: ??? $FF
  // $9392: ??? $FF
  // $9393: ??? $FF
  // $9394: ??? $FF
  // $9395: ??? $FF
  // $9396: ??? $FF
  // $9397: ??? $FF
  // $9398: ??? $FF
  // $9399: ??? $FF
  // $939A: ??? $FF
  // $939B: ??? $FF
  // $939C: ??? $FF
  // $939D: ??? $FF
  // $939E: ??? $FF
  // $939F: ??? $FF
  // $93A0: ??? $FF
  // $93A1: ??? $FF
  // $93A2: ??? $FF
  // $93A3: ??? $FF
  // $93A4: ??? $FF
  // $93A5: ??? $FF
  // $93A6: ??? $FF
  // $93A7: ??? $FF
  // $93A8: ??? $FF
  // $93A9: ??? $FF
  // $93AA: ??? $FF
  // $93AB: ??? $FF
  // $93AC: ??? $FF
  // $93AD: ??? $FF
  // $93AE: ??? $FF
  // $93AF: ??? $FF
  // $93B0: ??? $FF
  // $93B1: ??? $FF
  // $93B2: ??? $FF
  // $93B3: ??? $FF
  // $93B4: ??? $FF
  // $93B5: ??? $FF
  // $93B6: ??? $FF
  // $93B7: ??? $FF
  // $93B8: ??? $FF
  // $93B9: ??? $FF
  // $93BA: ??? $FF
  // $93BB: ??? $FF
  // $93BC: ??? $FF
  // $93BD: ??? $FF
  // $93BE: ??? $FF
  // $93BF: ??? $FF
  // $93C0: ??? $FF
  // $93C1: ??? $FF
  // $93C2: ??? $FF
  // $93C3: ??? $FF
  // $93C4: ??? $FF
  // $93C5: ??? $FF
  // $93C6: ??? $FF
  // $93C7: ??? $FF
  // $93C8: ??? $FF
  // $93C9: ??? $FF
  // $93CA: ??? $FF
  // $93CB: ??? $FF
  // $93CC: ??? $FF
  // $93CD: ??? $FF
  // $93CE: ??? $FF
  // $93CF: ??? $FF
  // $93D0: ??? $FF
  // $93D1: ??? $FF
  // $93D2: ??? $FF
  // $93D3: ??? $FF
  // $93D4: ??? $FF
  // $93D5: ??? $FF
  // $93D6: ??? $FF
  // $93D7: ??? $FF
  // $93D8: ??? $FF
  // $93D9: ??? $FF
  // $93DA: ??? $FF
  // $93DB: ??? $FF
  // $93DC: ??? $FF
  // $93DD: ??? $FF
  // $93DE: ??? $FF
  // $93DF: ??? $FF
  // $93E0: ??? $FF
  // $93E1: ??? $FF
  // $93E2: ??? $FF
  // $93E3: ??? $FF
  // $93E4: ??? $FF
  // $93E5: ??? $FF
  // $93E6: ??? $FF
  // $93E7: ??? $FF
  // $93E8: ??? $FF
  // $93E9: ??? $FF
  // $93EA: ??? $FF
  // $93EB: ??? $FF
  // $93EC: ??? $FF
  // $93ED: ??? $FF
  // $93EE: ??? $FF
  // $93EF: ??? $FF
  // $93F0: ??? $FF
  // $93F1: ??? $FF
  // $93F2: ??? $FF
  // $93F3: ??? $FF
  // $93F4: ??? $FF
  // $93F5: ??? $FF
  // $93F6: ??? $FF
  // $93F7: ??? $FF
  // $93F8: ??? $FF
  // $93F9: ??? $FF
  // $93FA: ??? $FF
  // $93FB: ??? $FF
  // $93FC: ??? $FF
  // $93FD: ??? $FF
  // $93FE: ??? $FF
  // $93FF: ??? $FF
  return [
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
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF
  ];
}

// ════════ $9400-$97FF (1024B): 未使用 (0xFF填充) ═══════=
function build_9400_97FF_unused(): readonly number[] {
  // $9400: ??? $FF
  // $9401: ??? $FF
  // $9402: ??? $FF
  // $9403: ??? $FF
  // $9404: ??? $FF
  // $9405: ??? $FF
  // $9406: ??? $FF
  // $9407: ??? $FF
  // $9408: ??? $FF
  // $9409: ??? $FF
  // $940A: ??? $FF
  // $940B: ??? $FF
  // $940C: ??? $FF
  // $940D: ??? $FF
  // $940E: ??? $FF
  // $940F: ??? $FF
  // $9410: ??? $FF
  // $9411: ??? $FF
  // $9412: ??? $FF
  // $9413: ??? $FF
  // $9414: ??? $FF
  // $9415: ??? $FF
  // $9416: ??? $FF
  // $9417: ??? $FF
  // $9418: ??? $FF
  // $9419: ??? $FF
  // $941A: ??? $FF
  // $941B: ??? $FF
  // $941C: ??? $FF
  // $941D: ??? $FF
  // $941E: ??? $FF
  // $941F: ??? $FF
  // $9420: ??? $FF
  // $9421: ??? $FF
  // $9422: ??? $FF
  // $9423: ??? $FF
  // $9424: ??? $FF
  // $9425: ??? $FF
  // $9426: ??? $FF
  // $9427: ??? $FF
  // $9428: ??? $FF
  // $9429: ??? $FF
  // $942A: ??? $FF
  // $942B: ??? $FF
  // $942C: ??? $FF
  // $942D: ??? $FF
  // $942E: ??? $FF
  // $942F: ??? $FF
  // $9430: ??? $FF
  // $9431: ??? $FF
  // $9432: ??? $FF
  // $9433: ??? $FF
  // $9434: ??? $FF
  // $9435: ??? $FF
  // $9436: ??? $FF
  // $9437: ??? $FF
  // $9438: ??? $FF
  // $9439: ??? $FF
  // $943A: ??? $FF
  // $943B: ??? $FF
  // $943C: ??? $FF
  // $943D: ??? $FF
  // $943E: ??? $FF
  // $943F: ??? $FF
  // $9440: ??? $FF
  // $9441: ??? $FF
  // $9442: ??? $FF
  // $9443: ??? $FF
  // $9444: ??? $FF
  // $9445: ??? $FF
  // $9446: ??? $FF
  // $9447: ??? $FF
  // $9448: ??? $FF
  // $9449: ??? $FF
  // $944A: ??? $FF
  // $944B: ??? $FF
  // $944C: ??? $FF
  // $944D: ??? $FF
  // $944E: ??? $FF
  // $944F: ??? $FF
  // $9450: ??? $FF
  // $9451: ??? $FF
  // $9452: ??? $FF
  // $9453: ??? $FF
  // $9454: ??? $FF
  // $9455: ??? $FF
  // $9456: ??? $FF
  // $9457: ??? $FF
  // $9458: ??? $FF
  // $9459: ??? $FF
  // $945A: ??? $FF
  // $945B: ??? $FF
  // $945C: ??? $FF
  // $945D: ??? $FF
  // $945E: ??? $FF
  // $945F: ??? $FF
  // $9460: ??? $FF
  // $9461: ??? $FF
  // $9462: ??? $FF
  // $9463: ??? $FF
  // $9464: ??? $FF
  // $9465: ??? $FF
  // $9466: ??? $FF
  // $9467: ??? $FF
  // $9468: ??? $FF
  // $9469: ??? $FF
  // $946A: ??? $FF
  // $946B: ??? $FF
  // $946C: ??? $FF
  // $946D: ??? $FF
  // $946E: ??? $FF
  // $946F: ??? $FF
  // $9470: ??? $FF
  // $9471: ??? $FF
  // $9472: ??? $FF
  // $9473: ??? $FF
  // $9474: ??? $FF
  // $9475: ??? $FF
  // $9476: ??? $FF
  // $9477: ??? $FF
  // $9478: ??? $FF
  // $9479: ??? $FF
  // $947A: ??? $FF
  // $947B: ??? $FF
  // $947C: ??? $FF
  // $947D: ??? $FF
  // $947E: ??? $FF
  // $947F: ??? $FF
  // $9480: ??? $FF
  // $9481: ??? $FF
  // $9482: ??? $FF
  // $9483: ??? $FF
  // $9484: ??? $FF
  // $9485: ??? $FF
  // $9486: ??? $FF
  // $9487: ??? $FF
  // $9488: ??? $FF
  // $9489: ??? $FF
  // $948A: ??? $FF
  // $948B: ??? $FF
  // $948C: ??? $FF
  // $948D: ??? $FF
  // $948E: ??? $FF
  // $948F: ??? $FF
  // $9490: ??? $FF
  // $9491: ??? $FF
  // $9492: ??? $FF
  // $9493: ??? $FF
  // $9494: ??? $FF
  // $9495: ??? $FF
  // $9496: ??? $FF
  // $9497: ??? $FF
  // $9498: ??? $FF
  // $9499: ??? $FF
  // $949A: ??? $FF
  // $949B: ??? $FF
  // $949C: ??? $FF
  // $949D: ??? $FF
  // $949E: ??? $FF
  // $949F: ??? $FF
  // $94A0: ??? $FF
  // $94A1: ??? $FF
  // $94A2: ??? $FF
  // $94A3: ??? $FF
  // $94A4: ??? $FF
  // $94A5: ??? $FF
  // $94A6: ??? $FF
  // $94A7: ??? $FF
  // $94A8: ??? $FF
  // $94A9: ??? $FF
  // $94AA: ??? $FF
  // $94AB: ??? $FF
  // $94AC: ??? $FF
  // $94AD: ??? $FF
  // $94AE: ??? $FF
  // $94AF: ??? $FF
  // $94B0: ??? $FF
  // $94B1: ??? $FF
  // $94B2: ??? $FF
  // $94B3: ??? $FF
  // $94B4: ??? $FF
  // $94B5: ??? $FF
  // $94B6: ??? $FF
  // $94B7: ??? $FF
  // $94B8: ??? $FF
  // $94B9: ??? $FF
  // $94BA: ??? $FF
  // $94BB: ??? $FF
  // $94BC: ??? $FF
  // $94BD: ??? $FF
  // $94BE: ??? $FF
  // $94BF: ??? $FF
  // $94C0: ??? $FF
  // $94C1: ??? $FF
  // $94C2: ??? $FF
  // $94C3: ??? $FF
  // $94C4: ??? $FF
  // $94C5: ??? $FF
  // $94C6: ??? $FF
  // $94C7: ??? $FF
  // $94C8: ??? $FF
  // $94C9: ??? $FF
  // $94CA: ??? $FF
  // $94CB: ??? $FF
  // $94CC: ??? $FF
  // $94CD: ??? $FF
  // $94CE: ??? $FF
  // $94CF: ??? $FF
  // $94D0: ??? $FF
  // $94D1: ??? $FF
  // $94D2: ??? $FF
  // $94D3: ??? $FF
  // $94D4: ??? $FF
  // $94D5: ??? $FF
  // $94D6: ??? $FF
  // $94D7: ??? $FF
  // $94D8: ??? $FF
  // $94D9: ??? $FF
  // $94DA: ??? $FF
  // $94DB: ??? $FF
  // $94DC: ??? $FF
  // $94DD: ??? $FF
  // $94DE: ??? $FF
  // $94DF: ??? $FF
  // $94E0: ??? $FF
  // $94E1: ??? $FF
  // $94E2: ??? $FF
  // $94E3: ??? $FF
  // $94E4: ??? $FF
  // $94E5: ??? $FF
  // $94E6: ??? $FF
  // $94E7: ??? $FF
  // $94E8: ??? $FF
  // $94E9: ??? $FF
  // $94EA: ??? $FF
  // $94EB: ??? $FF
  // $94EC: ??? $FF
  // $94ED: ??? $FF
  // $94EE: ??? $FF
  // $94EF: ??? $FF
  // $94F0: ??? $FF
  // $94F1: ??? $FF
  // $94F2: ??? $FF
  // $94F3: ??? $FF
  // $94F4: ??? $FF
  // $94F5: ??? $FF
  // $94F6: ??? $FF
  // $94F7: ??? $FF
  // $94F8: ??? $FF
  // $94F9: ??? $FF
  // $94FA: ??? $FF
  // $94FB: ??? $FF
  // $94FC: ??? $FF
  // $94FD: ??? $FF
  // $94FE: ??? $FF
  // $94FF: ??? $FF
  // $9500: ??? $FF
  // $9501: ??? $FF
  // $9502: ??? $FF
  // $9503: ??? $FF
  // $9504: ??? $FF
  // $9505: ??? $FF
  // $9506: ??? $FF
  // $9507: ??? $FF
  // $9508: ??? $FF
  // $9509: ??? $FF
  // $950A: ??? $FF
  // $950B: ??? $FF
  // $950C: ??? $FF
  // $950D: ??? $FF
  // $950E: ??? $FF
  // $950F: ??? $FF
  // $9510: ??? $FF
  // $9511: ??? $FF
  // $9512: ??? $FF
  // $9513: ??? $FF
  // $9514: ??? $FF
  // $9515: ??? $FF
  // $9516: ??? $FF
  // $9517: ??? $FF
  // $9518: ??? $FF
  // $9519: ??? $FF
  // $951A: ??? $FF
  // $951B: ??? $FF
  // $951C: ??? $FF
  // $951D: ??? $FF
  // $951E: ??? $FF
  // $951F: ??? $FF
  // $9520: ??? $FF
  // $9521: ??? $FF
  // $9522: ??? $FF
  // $9523: ??? $FF
  // $9524: ??? $FF
  // $9525: ??? $FF
  // $9526: ??? $FF
  // $9527: ??? $FF
  // $9528: ??? $FF
  // $9529: ??? $FF
  // $952A: ??? $FF
  // $952B: ??? $FF
  // $952C: ??? $FF
  // $952D: ??? $FF
  // $952E: ??? $FF
  // $952F: ??? $FF
  // $9530: ??? $FF
  // $9531: ??? $FF
  // $9532: ??? $FF
  // $9533: ??? $FF
  // $9534: ??? $FF
  // $9535: ??? $FF
  // $9536: ??? $FF
  // $9537: ??? $FF
  // $9538: ??? $FF
  // $9539: ??? $FF
  // $953A: ??? $FF
  // $953B: ??? $FF
  // $953C: ??? $FF
  // $953D: ??? $FF
  // $953E: ??? $FF
  // $953F: ??? $FF
  // $9540: ??? $FF
  // $9541: ??? $FF
  // $9542: ??? $FF
  // $9543: ??? $FF
  // $9544: ??? $FF
  // $9545: ??? $FF
  // $9546: ??? $FF
  // $9547: ??? $FF
  // $9548: ??? $FF
  // $9549: ??? $FF
  // $954A: ??? $FF
  // $954B: ??? $FF
  // $954C: ??? $FF
  // $954D: ??? $FF
  // $954E: ??? $FF
  // $954F: ??? $FF
  // $9550: ??? $FF
  // $9551: ??? $FF
  // $9552: ??? $FF
  // $9553: ??? $FF
  // $9554: ??? $FF
  // $9555: ??? $FF
  // $9556: ??? $FF
  // $9557: ??? $FF
  // $9558: ??? $FF
  // $9559: ??? $FF
  // $955A: ??? $FF
  // $955B: ??? $FF
  // $955C: ??? $FF
  // $955D: ??? $FF
  // $955E: ??? $FF
  // $955F: ??? $FF
  // $9560: ??? $FF
  // $9561: ??? $FF
  // $9562: ??? $FF
  // $9563: ??? $FF
  // $9564: ??? $FF
  // $9565: ??? $FF
  // $9566: ??? $FF
  // $9567: ??? $FF
  // $9568: ??? $FF
  // $9569: ??? $FF
  // $956A: ??? $FF
  // $956B: ??? $FF
  // $956C: ??? $FF
  // $956D: ??? $FF
  // $956E: ??? $FF
  // $956F: ??? $FF
  // $9570: ??? $FF
  // $9571: ??? $FF
  // $9572: ??? $FF
  // $9573: ??? $FF
  // $9574: ??? $FF
  // $9575: ??? $FF
  // $9576: ??? $FF
  // $9577: ??? $FF
  // $9578: ??? $FF
  // $9579: ??? $FF
  // $957A: ??? $FF
  // $957B: ??? $FF
  // $957C: ??? $FF
  // $957D: ??? $FF
  // $957E: ??? $FF
  // $957F: ??? $FF
  // $9580: ??? $FF
  // $9581: ??? $FF
  // $9582: ??? $FF
  // $9583: ??? $FF
  // $9584: ??? $FF
  // $9585: ??? $FF
  // $9586: ??? $FF
  // $9587: ??? $FF
  // $9588: ??? $FF
  // $9589: ??? $FF
  // $958A: ??? $FF
  // $958B: ??? $FF
  // $958C: ??? $FF
  // $958D: ??? $FF
  // $958E: ??? $FF
  // $958F: ??? $FF
  // $9590: ??? $FF
  // $9591: ??? $FF
  // $9592: ??? $FF
  // $9593: ??? $FF
  // $9594: ??? $FF
  // $9595: ??? $FF
  // $9596: ??? $FF
  // $9597: ??? $FF
  // $9598: ??? $FF
  // $9599: ??? $FF
  // $959A: ??? $FF
  // $959B: ??? $FF
  // $959C: ??? $FF
  // $959D: ??? $FF
  // $959E: ??? $FF
  // $959F: ??? $FF
  // $95A0: ??? $FF
  // $95A1: ??? $FF
  // $95A2: ??? $FF
  // $95A3: ??? $FF
  // $95A4: ??? $FF
  // $95A5: ??? $FF
  // $95A6: ??? $FF
  // $95A7: ??? $FF
  // $95A8: ??? $FF
  // $95A9: ??? $FF
  // $95AA: ??? $FF
  // $95AB: ??? $FF
  // $95AC: ??? $FF
  // $95AD: ??? $FF
  // $95AE: ??? $FF
  // $95AF: ??? $FF
  // $95B0: ??? $FF
  // $95B1: ??? $FF
  // $95B2: ??? $FF
  // $95B3: ??? $FF
  // $95B4: ??? $FF
  // $95B5: ??? $FF
  // $95B6: ??? $FF
  // $95B7: ??? $FF
  // $95B8: ??? $FF
  // $95B9: ??? $FF
  // $95BA: ??? $FF
  // $95BB: ??? $FF
  // $95BC: ??? $FF
  // $95BD: ??? $FF
  // $95BE: ??? $FF
  // $95BF: ??? $FF
  // $95C0: ??? $FF
  // $95C1: ??? $FF
  // $95C2: ??? $FF
  // $95C3: ??? $FF
  // $95C4: ??? $FF
  // $95C5: ??? $FF
  // $95C6: ??? $FF
  // $95C7: ??? $FF
  // $95C8: ??? $FF
  // $95C9: ??? $FF
  // $95CA: ??? $FF
  // $95CB: ??? $FF
  // $95CC: ??? $FF
  // $95CD: ??? $FF
  // $95CE: ??? $FF
  // $95CF: ??? $FF
  // $95D0: ??? $FF
  // $95D1: ??? $FF
  // $95D2: ??? $FF
  // $95D3: ??? $FF
  // $95D4: ??? $FF
  // $95D5: ??? $FF
  // $95D6: ??? $FF
  // $95D7: ??? $FF
  // $95D8: ??? $FF
  // $95D9: ??? $FF
  // $95DA: ??? $FF
  // $95DB: ??? $FF
  // $95DC: ??? $FF
  // $95DD: ??? $FF
  // $95DE: ??? $FF
  // $95DF: ??? $FF
  // $95E0: ??? $FF
  // $95E1: ??? $FF
  // $95E2: ??? $FF
  // $95E3: ??? $FF
  // $95E4: ??? $FF
  // $95E5: ??? $FF
  // $95E6: ??? $FF
  // $95E7: ??? $FF
  // $95E8: ??? $FF
  // $95E9: ??? $FF
  // $95EA: ??? $FF
  // $95EB: ??? $FF
  // $95EC: ??? $FF
  // $95ED: ??? $FF
  // $95EE: ??? $FF
  // $95EF: ??? $FF
  // $95F0: ??? $FF
  // $95F1: ??? $FF
  // $95F2: ??? $FF
  // $95F3: ??? $FF
  // $95F4: ??? $FF
  // $95F5: ??? $FF
  // $95F6: ??? $FF
  // $95F7: ??? $FF
  // $95F8: ??? $FF
  // $95F9: ??? $FF
  // $95FA: ??? $FF
  // $95FB: ??? $FF
  // $95FC: ??? $FF
  // $95FD: ??? $FF
  // $95FE: ??? $FF
  // $95FF: ??? $FF
  // $9600: ??? $FF
  // $9601: ??? $FF
  // $9602: ??? $FF
  // $9603: ??? $FF
  // $9604: ??? $FF
  // $9605: ??? $FF
  // $9606: ??? $FF
  // $9607: ??? $FF
  // $9608: ??? $FF
  // $9609: ??? $FF
  // $960A: ??? $FF
  // $960B: ??? $FF
  // $960C: ??? $FF
  // $960D: ??? $FF
  // $960E: ??? $FF
  // $960F: ??? $FF
  // $9610: ??? $FF
  // $9611: ??? $FF
  // $9612: ??? $FF
  // $9613: ??? $FF
  // $9614: ??? $FF
  // $9615: ??? $FF
  // $9616: ??? $FF
  // $9617: ??? $FF
  // $9618: ??? $FF
  // $9619: ??? $FF
  // $961A: ??? $FF
  // $961B: ??? $FF
  // $961C: ??? $FF
  // $961D: ??? $FF
  // $961E: ??? $FF
  // $961F: ??? $FF
  // $9620: ??? $FF
  // $9621: ??? $FF
  // $9622: ??? $FF
  // $9623: ??? $FF
  // $9624: ??? $FF
  // $9625: ??? $FF
  // $9626: ??? $FF
  // $9627: ??? $FF
  // $9628: ??? $FF
  // $9629: ??? $FF
  // $962A: ??? $FF
  // $962B: ??? $FF
  // $962C: ??? $FF
  // $962D: ??? $FF
  // $962E: ??? $FF
  // $962F: ??? $FF
  // $9630: ??? $FF
  // $9631: ??? $FF
  // $9632: ??? $FF
  // $9633: ??? $FF
  // $9634: ??? $FF
  // $9635: ??? $FF
  // $9636: ??? $FF
  // $9637: ??? $FF
  // $9638: ??? $FF
  // $9639: ??? $FF
  // $963A: ??? $FF
  // $963B: ??? $FF
  // $963C: ??? $FF
  // $963D: ??? $FF
  // $963E: ??? $FF
  // $963F: ??? $FF
  // $9640: ??? $FF
  // $9641: ??? $FF
  // $9642: ??? $FF
  // $9643: ??? $FF
  // $9644: ??? $FF
  // $9645: ??? $FF
  // $9646: ??? $FF
  // $9647: ??? $FF
  // $9648: ??? $FF
  // $9649: ??? $FF
  // $964A: ??? $FF
  // $964B: ??? $FF
  // $964C: ??? $FF
  // $964D: ??? $FF
  // $964E: ??? $FF
  // $964F: ??? $FF
  // $9650: ??? $FF
  // $9651: ??? $FF
  // $9652: ??? $FF
  // $9653: ??? $FF
  // $9654: ??? $FF
  // $9655: ??? $FF
  // $9656: ??? $FF
  // $9657: ??? $FF
  // $9658: ??? $FF
  // $9659: ??? $FF
  // $965A: ??? $FF
  // $965B: ??? $FF
  // $965C: ??? $FF
  // $965D: ??? $FF
  // $965E: ??? $FF
  // $965F: ??? $FF
  // $9660: ??? $FF
  // $9661: ??? $FF
  // $9662: ??? $FF
  // $9663: ??? $FF
  // $9664: ??? $FF
  // $9665: ??? $FF
  // $9666: ??? $FF
  // $9667: ??? $FF
  // $9668: ??? $FF
  // $9669: ??? $FF
  // $966A: ??? $FF
  // $966B: ??? $FF
  // $966C: ??? $FF
  // $966D: ??? $FF
  // $966E: ??? $FF
  // $966F: ??? $FF
  // $9670: ??? $FF
  // $9671: ??? $FF
  // $9672: ??? $FF
  // $9673: ??? $FF
  // $9674: ??? $FF
  // $9675: ??? $FF
  // $9676: ??? $FF
  // $9677: ??? $FF
  // $9678: ??? $FF
  // $9679: ??? $FF
  // $967A: ??? $FF
  // $967B: ??? $FF
  // $967C: ??? $FF
  // $967D: ??? $FF
  // $967E: ??? $FF
  // $967F: ??? $FF
  // $9680: ??? $FF
  // $9681: ??? $FF
  // $9682: ??? $FF
  // $9683: ??? $FF
  // $9684: ??? $FF
  // $9685: ??? $FF
  // $9686: ??? $FF
  // $9687: ??? $FF
  // $9688: ??? $FF
  // $9689: ??? $FF
  // $968A: ??? $FF
  // $968B: ??? $FF
  // $968C: ??? $FF
  // $968D: ??? $FF
  // $968E: ??? $FF
  // $968F: ??? $FF
  // $9690: ??? $FF
  // $9691: ??? $FF
  // $9692: ??? $FF
  // $9693: ??? $FF
  // $9694: ??? $FF
  // $9695: ??? $FF
  // $9696: ??? $FF
  // $9697: ??? $FF
  // $9698: ??? $FF
  // $9699: ??? $FF
  // $969A: ??? $FF
  // $969B: ??? $FF
  // $969C: ??? $FF
  // $969D: ??? $FF
  // $969E: ??? $FF
  // $969F: ??? $FF
  // $96A0: ??? $FF
  // $96A1: ??? $FF
  // $96A2: ??? $FF
  // $96A3: ??? $FF
  // $96A4: ??? $FF
  // $96A5: ??? $FF
  // $96A6: ??? $FF
  // $96A7: ??? $FF
  // $96A8: ??? $FF
  // $96A9: ??? $FF
  // $96AA: ??? $FF
  // $96AB: ??? $FF
  // $96AC: ??? $FF
  // $96AD: ??? $FF
  // $96AE: ??? $FF
  // $96AF: ??? $FF
  // $96B0: ??? $FF
  // $96B1: ??? $FF
  // $96B2: ??? $FF
  // $96B3: ??? $FF
  // $96B4: ??? $FF
  // $96B5: ??? $FF
  // $96B6: ??? $FF
  // $96B7: ??? $FF
  // $96B8: ??? $FF
  // $96B9: ??? $FF
  // $96BA: ??? $FF
  // $96BB: ??? $FF
  // $96BC: ??? $FF
  // $96BD: ??? $FF
  // $96BE: ??? $FF
  // $96BF: ??? $FF
  // $96C0: ??? $FF
  // $96C1: ??? $FF
  // $96C2: ??? $FF
  // $96C3: ??? $FF
  // $96C4: ??? $FF
  // $96C5: ??? $FF
  // $96C6: ??? $FF
  // $96C7: ??? $FF
  // $96C8: ??? $FF
  // $96C9: ??? $FF
  // $96CA: ??? $FF
  // $96CB: ??? $FF
  // $96CC: ??? $FF
  // $96CD: ??? $FF
  // $96CE: ??? $FF
  // $96CF: ??? $FF
  // $96D0: ??? $FF
  // $96D1: ??? $FF
  // $96D2: ??? $FF
  // $96D3: ??? $FF
  // $96D4: ??? $FF
  // $96D5: ??? $FF
  // $96D6: ??? $FF
  // $96D7: ??? $FF
  // $96D8: ??? $FF
  // $96D9: ??? $FF
  // $96DA: ??? $FF
  // $96DB: ??? $FF
  // $96DC: ??? $FF
  // $96DD: ??? $FF
  // $96DE: ??? $FF
  // $96DF: ??? $FF
  // $96E0: ??? $FF
  // $96E1: ??? $FF
  // $96E2: ??? $FF
  // $96E3: ??? $FF
  // $96E4: ??? $FF
  // $96E5: ??? $FF
  // $96E6: ??? $FF
  // $96E7: ??? $FF
  // $96E8: ??? $FF
  // $96E9: ??? $FF
  // $96EA: ??? $FF
  // $96EB: ??? $FF
  // $96EC: ??? $FF
  // $96ED: ??? $FF
  // $96EE: ??? $FF
  // $96EF: ??? $FF
  // $96F0: ??? $FF
  // $96F1: ??? $FF
  // $96F2: ??? $FF
  // $96F3: ??? $FF
  // $96F4: ??? $FF
  // $96F5: ??? $FF
  // $96F6: ??? $FF
  // $96F7: ??? $FF
  // $96F8: ??? $FF
  // $96F9: ??? $FF
  // $96FA: ??? $FF
  // $96FB: ??? $FF
  // $96FC: ??? $FF
  // $96FD: ??? $FF
  // $96FE: ??? $FF
  // $96FF: ??? $FF
  // $9700: ??? $FF
  // $9701: ??? $FF
  // $9702: ??? $FF
  // $9703: ??? $FF
  // $9704: ??? $FF
  // $9705: ??? $FF
  // $9706: ??? $FF
  // $9707: ??? $FF
  // $9708: ??? $FF
  // $9709: ??? $FF
  // $970A: ??? $FF
  // $970B: ??? $FF
  // $970C: ??? $FF
  // $970D: ??? $FF
  // $970E: ??? $FF
  // $970F: ??? $FF
  // $9710: ??? $FF
  // $9711: ??? $FF
  // $9712: ??? $FF
  // $9713: ??? $FF
  // $9714: ??? $FF
  // $9715: ??? $FF
  // $9716: ??? $FF
  // $9717: ??? $FF
  // $9718: ??? $FF
  // $9719: ??? $FF
  // $971A: ??? $FF
  // $971B: ??? $FF
  // $971C: ??? $FF
  // $971D: ??? $FF
  // $971E: ??? $FF
  // $971F: ??? $FF
  // $9720: ??? $FF
  // $9721: ??? $FF
  // $9722: ??? $FF
  // $9723: ??? $FF
  // $9724: ??? $FF
  // $9725: ??? $FF
  // $9726: ??? $FF
  // $9727: ??? $FF
  // $9728: ??? $FF
  // $9729: ??? $FF
  // $972A: ??? $FF
  // $972B: ??? $FF
  // $972C: ??? $FF
  // $972D: ??? $FF
  // $972E: ??? $FF
  // $972F: ??? $FF
  // $9730: ??? $FF
  // $9731: ??? $FF
  // $9732: ??? $FF
  // $9733: ??? $FF
  // $9734: ??? $FF
  // $9735: ??? $FF
  // $9736: ??? $FF
  // $9737: ??? $FF
  // $9738: ??? $FF
  // $9739: ??? $FF
  // $973A: ??? $FF
  // $973B: ??? $FF
  // $973C: ??? $FF
  // $973D: ??? $FF
  // $973E: ??? $FF
  // $973F: ??? $FF
  // $9740: ??? $FF
  // $9741: ??? $FF
  // $9742: ??? $FF
  // $9743: ??? $FF
  // $9744: ??? $FF
  // $9745: ??? $FF
  // $9746: ??? $FF
  // $9747: ??? $FF
  // $9748: ??? $FF
  // $9749: ??? $FF
  // $974A: ??? $FF
  // $974B: ??? $FF
  // $974C: ??? $FF
  // $974D: ??? $FF
  // $974E: ??? $FF
  // $974F: ??? $FF
  // $9750: ??? $FF
  // $9751: ??? $FF
  // $9752: ??? $FF
  // $9753: ??? $FF
  // $9754: ??? $FF
  // $9755: ??? $FF
  // $9756: ??? $FF
  // $9757: ??? $FF
  // $9758: ??? $FF
  // $9759: ??? $FF
  // $975A: ??? $FF
  // $975B: ??? $FF
  // $975C: ??? $FF
  // $975D: ??? $FF
  // $975E: ??? $FF
  // $975F: ??? $FF
  // $9760: ??? $FF
  // $9761: ??? $FF
  // $9762: ??? $FF
  // $9763: ??? $FF
  // $9764: ??? $FF
  // $9765: ??? $FF
  // $9766: ??? $FF
  // $9767: ??? $FF
  // $9768: ??? $FF
  // $9769: ??? $FF
  // $976A: ??? $FF
  // $976B: ??? $FF
  // $976C: ??? $FF
  // $976D: ??? $FF
  // $976E: ??? $FF
  // $976F: ??? $FF
  // $9770: ??? $FF
  // $9771: ??? $FF
  // $9772: ??? $FF
  // $9773: ??? $FF
  // $9774: ??? $FF
  // $9775: ??? $FF
  // $9776: ??? $FF
  // $9777: ??? $FF
  // $9778: ??? $FF
  // $9779: ??? $FF
  // $977A: ??? $FF
  // $977B: ??? $FF
  // $977C: ??? $FF
  // $977D: ??? $FF
  // $977E: ??? $FF
  // $977F: ??? $FF
  // $9780: ??? $FF
  // $9781: ??? $FF
  // $9782: ??? $FF
  // $9783: ??? $FF
  // $9784: ??? $FF
  // $9785: ??? $FF
  // $9786: ??? $FF
  // $9787: ??? $FF
  // $9788: ??? $FF
  // $9789: ??? $FF
  // $978A: ??? $FF
  // $978B: ??? $FF
  // $978C: ??? $FF
  // $978D: ??? $FF
  // $978E: ??? $FF
  // $978F: ??? $FF
  // $9790: ??? $FF
  // $9791: ??? $FF
  // $9792: ??? $FF
  // $9793: ??? $FF
  // $9794: ??? $FF
  // $9795: ??? $FF
  // $9796: ??? $FF
  // $9797: ??? $FF
  // $9798: ??? $FF
  // $9799: ??? $FF
  // $979A: ??? $FF
  // $979B: ??? $FF
  // $979C: ??? $FF
  // $979D: ??? $FF
  // $979E: ??? $FF
  // $979F: ??? $FF
  // $97A0: ??? $FF
  // $97A1: ??? $FF
  // $97A2: ??? $FF
  // $97A3: ??? $FF
  // $97A4: ??? $FF
  // $97A5: ??? $FF
  // $97A6: ??? $FF
  // $97A7: ??? $FF
  // $97A8: ??? $FF
  // $97A9: ??? $FF
  // $97AA: ??? $FF
  // $97AB: ??? $FF
  // $97AC: ??? $FF
  // $97AD: ??? $FF
  // $97AE: ??? $FF
  // $97AF: ??? $FF
  // $97B0: ??? $FF
  // $97B1: ??? $FF
  // $97B2: ??? $FF
  // $97B3: ??? $FF
  // $97B4: ??? $FF
  // $97B5: ??? $FF
  // $97B6: ??? $FF
  // $97B7: ??? $FF
  // $97B8: ??? $FF
  // $97B9: ??? $FF
  // $97BA: ??? $FF
  // $97BB: ??? $FF
  // $97BC: ??? $FF
  // $97BD: ??? $FF
  // $97BE: ??? $FF
  // $97BF: ??? $FF
  // $97C0: ??? $FF
  // $97C1: ??? $FF
  // $97C2: ??? $FF
  // $97C3: ??? $FF
  // $97C4: ??? $FF
  // $97C5: ??? $FF
  // $97C6: ??? $FF
  // $97C7: ??? $FF
  // $97C8: ??? $FF
  // $97C9: ??? $FF
  // $97CA: ??? $FF
  // $97CB: ??? $FF
  // $97CC: ??? $FF
  // $97CD: ??? $FF
  // $97CE: ??? $FF
  // $97CF: ??? $FF
  // $97D0: ??? $FF
  // $97D1: ??? $FF
  // $97D2: ??? $FF
  // $97D3: ??? $FF
  // $97D4: ??? $FF
  // $97D5: ??? $FF
  // $97D6: ??? $FF
  // $97D7: ??? $FF
  // $97D8: ??? $FF
  // $97D9: ??? $FF
  // $97DA: ??? $FF
  // $97DB: ??? $FF
  // $97DC: ??? $FF
  // $97DD: ??? $FF
  // $97DE: ??? $FF
  // $97DF: ??? $FF
  // $97E0: ??? $FF
  // $97E1: ??? $FF
  // $97E2: ??? $FF
  // $97E3: ??? $FF
  // $97E4: ??? $FF
  // $97E5: ??? $FF
  // $97E6: ??? $FF
  // $97E7: ??? $FF
  // $97E8: ??? $FF
  // $97E9: ??? $FF
  // $97EA: ??? $FF
  // $97EB: ??? $FF
  // $97EC: ??? $FF
  // $97ED: ??? $FF
  // $97EE: ??? $FF
  // $97EF: ??? $FF
  // $97F0: ??? $FF
  // $97F1: ??? $FF
  // $97F2: ??? $FF
  // $97F3: ??? $FF
  // $97F4: ??? $FF
  // $97F5: ??? $FF
  // $97F6: ??? $FF
  // $97F7: ??? $FF
  // $97F8: ??? $FF
  // $97F9: ??? $FF
  // $97FA: ??? $FF
  // $97FB: ??? $FF
  // $97FC: ??? $FF
  // $97FD: ??? $FF
  // $97FE: ??? $FF
  // $97FF: ??? $FF
  return [
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
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF
  ];
}

// ════════ $9800-$9BFF (1024B): 未使用 (0xFF填充) ═══════=
function build_9800_9BFF_unused(): readonly number[] {
  // $9800: ??? $FF
  // $9801: ??? $FF
  // $9802: ??? $FF
  // $9803: ??? $FF
  // $9804: ??? $FF
  // $9805: ??? $FF
  // $9806: ??? $FF
  // $9807: ??? $FF
  // $9808: ??? $FF
  // $9809: ??? $FF
  // $980A: ??? $FF
  // $980B: ??? $FF
  // $980C: ??? $FF
  // $980D: ??? $FF
  // $980E: ??? $FF
  // $980F: ??? $FF
  // $9810: ??? $FF
  // $9811: ??? $FF
  // $9812: ??? $FF
  // $9813: ??? $FF
  // $9814: ??? $FF
  // $9815: ??? $FF
  // $9816: ??? $FF
  // $9817: ??? $FF
  // $9818: ??? $FF
  // $9819: ??? $FF
  // $981A: ??? $FF
  // $981B: ??? $FF
  // $981C: ??? $FF
  // $981D: ??? $FF
  // $981E: ??? $FF
  // $981F: ??? $FF
  // $9820: ??? $FF
  // $9821: ??? $FF
  // $9822: ??? $FF
  // $9823: ??? $FF
  // $9824: ??? $FF
  // $9825: ??? $FF
  // $9826: ??? $FF
  // $9827: ??? $FF
  // $9828: ??? $FF
  // $9829: ??? $FF
  // $982A: ??? $FF
  // $982B: ??? $FF
  // $982C: ??? $FF
  // $982D: ??? $FF
  // $982E: ??? $FF
  // $982F: ??? $FF
  // $9830: ??? $FF
  // $9831: ??? $FF
  // $9832: ??? $FF
  // $9833: ??? $FF
  // $9834: ??? $FF
  // $9835: ??? $FF
  // $9836: ??? $FF
  // $9837: ??? $FF
  // $9838: ??? $FF
  // $9839: ??? $FF
  // $983A: ??? $FF
  // $983B: ??? $FF
  // $983C: ??? $FF
  // $983D: ??? $FF
  // $983E: ??? $FF
  // $983F: ??? $FF
  // $9840: ??? $FF
  // $9841: ??? $FF
  // $9842: ??? $FF
  // $9843: ??? $FF
  // $9844: ??? $FF
  // $9845: ??? $FF
  // $9846: ??? $FF
  // $9847: ??? $FF
  // $9848: ??? $FF
  // $9849: ??? $FF
  // $984A: ??? $FF
  // $984B: ??? $FF
  // $984C: ??? $FF
  // $984D: ??? $FF
  // $984E: ??? $FF
  // $984F: ??? $FF
  // $9850: ??? $FF
  // $9851: ??? $FF
  // $9852: ??? $FF
  // $9853: ??? $FF
  // $9854: ??? $FF
  // $9855: ??? $FF
  // $9856: ??? $FF
  // $9857: ??? $FF
  // $9858: ??? $FF
  // $9859: ??? $FF
  // $985A: ??? $FF
  // $985B: ??? $FF
  // $985C: ??? $FF
  // $985D: ??? $FF
  // $985E: ??? $FF
  // $985F: ??? $FF
  // $9860: ??? $FF
  // $9861: ??? $FF
  // $9862: ??? $FF
  // $9863: ??? $FF
  // $9864: ??? $FF
  // $9865: ??? $FF
  // $9866: ??? $FF
  // $9867: ??? $FF
  // $9868: ??? $FF
  // $9869: ??? $FF
  // $986A: ??? $FF
  // $986B: ??? $FF
  // $986C: ??? $FF
  // $986D: ??? $FF
  // $986E: ??? $FF
  // $986F: ??? $FF
  // $9870: ??? $FF
  // $9871: ??? $FF
  // $9872: ??? $FF
  // $9873: ??? $FF
  // $9874: ??? $FF
  // $9875: ??? $FF
  // $9876: ??? $FF
  // $9877: ??? $FF
  // $9878: ??? $FF
  // $9879: ??? $FF
  // $987A: ??? $FF
  // $987B: ??? $FF
  // $987C: ??? $FF
  // $987D: ??? $FF
  // $987E: ??? $FF
  // $987F: ??? $FF
  // $9880: ??? $FF
  // $9881: ??? $FF
  // $9882: ??? $FF
  // $9883: ??? $FF
  // $9884: ??? $FF
  // $9885: ??? $FF
  // $9886: ??? $FF
  // $9887: ??? $FF
  // $9888: ??? $FF
  // $9889: ??? $FF
  // $988A: ??? $FF
  // $988B: ??? $FF
  // $988C: ??? $FF
  // $988D: ??? $FF
  // $988E: ??? $FF
  // $988F: ??? $FF
  // $9890: ??? $FF
  // $9891: ??? $FF
  // $9892: ??? $FF
  // $9893: ??? $FF
  // $9894: ??? $FF
  // $9895: ??? $FF
  // $9896: ??? $FF
  // $9897: ??? $FF
  // $9898: ??? $FF
  // $9899: ??? $FF
  // $989A: ??? $FF
  // $989B: ??? $FF
  // $989C: ??? $FF
  // $989D: ??? $FF
  // $989E: ??? $FF
  // $989F: ??? $FF
  // $98A0: ??? $FF
  // $98A1: ??? $FF
  // $98A2: ??? $FF
  // $98A3: ??? $FF
  // $98A4: ??? $FF
  // $98A5: ??? $FF
  // $98A6: ??? $FF
  // $98A7: ??? $FF
  // $98A8: ??? $FF
  // $98A9: ??? $FF
  // $98AA: ??? $FF
  // $98AB: ??? $FF
  // $98AC: ??? $FF
  // $98AD: ??? $FF
  // $98AE: ??? $FF
  // $98AF: ??? $FF
  // $98B0: ??? $FF
  // $98B1: ??? $FF
  // $98B2: ??? $FF
  // $98B3: ??? $FF
  // $98B4: ??? $FF
  // $98B5: ??? $FF
  // $98B6: ??? $FF
  // $98B7: ??? $FF
  // $98B8: ??? $FF
  // $98B9: ??? $FF
  // $98BA: ??? $FF
  // $98BB: ??? $FF
  // $98BC: ??? $FF
  // $98BD: ??? $FF
  // $98BE: ??? $FF
  // $98BF: ??? $FF
  // $98C0: ??? $FF
  // $98C1: ??? $FF
  // $98C2: ??? $FF
  // $98C3: ??? $FF
  // $98C4: ??? $FF
  // $98C5: ??? $FF
  // $98C6: ??? $FF
  // $98C7: ??? $FF
  // $98C8: ??? $FF
  // $98C9: ??? $FF
  // $98CA: ??? $FF
  // $98CB: ??? $FF
  // $98CC: ??? $FF
  // $98CD: ??? $FF
  // $98CE: ??? $FF
  // $98CF: ??? $FF
  // $98D0: ??? $FF
  // $98D1: ??? $FF
  // $98D2: ??? $FF
  // $98D3: ??? $FF
  // $98D4: ??? $FF
  // $98D5: ??? $FF
  // $98D6: ??? $FF
  // $98D7: ??? $FF
  // $98D8: ??? $FF
  // $98D9: ??? $FF
  // $98DA: ??? $FF
  // $98DB: ??? $FF
  // $98DC: ??? $FF
  // $98DD: ??? $FF
  // $98DE: ??? $FF
  // $98DF: ??? $FF
  // $98E0: ??? $FF
  // $98E1: ??? $FF
  // $98E2: ??? $FF
  // $98E3: ??? $FF
  // $98E4: ??? $FF
  // $98E5: ??? $FF
  // $98E6: ??? $FF
  // $98E7: ??? $FF
  // $98E8: ??? $FF
  // $98E9: ??? $FF
  // $98EA: ??? $FF
  // $98EB: ??? $FF
  // $98EC: ??? $FF
  // $98ED: ??? $FF
  // $98EE: ??? $FF
  // $98EF: ??? $FF
  // $98F0: ??? $FF
  // $98F1: ??? $FF
  // $98F2: ??? $FF
  // $98F3: ??? $FF
  // $98F4: ??? $FF
  // $98F5: ??? $FF
  // $98F6: ??? $FF
  // $98F7: ??? $FF
  // $98F8: ??? $FF
  // $98F9: ??? $FF
  // $98FA: ??? $FF
  // $98FB: ??? $FF
  // $98FC: ??? $FF
  // $98FD: ??? $FF
  // $98FE: ??? $FF
  // $98FF: ??? $FF
  // $9900: ??? $FF
  // $9901: ??? $FF
  // $9902: ??? $FF
  // $9903: ??? $FF
  // $9904: ??? $FF
  // $9905: ??? $FF
  // $9906: ??? $FF
  // $9907: ??? $FF
  // $9908: ??? $FF
  // $9909: ??? $FF
  // $990A: ??? $FF
  // $990B: ??? $FF
  // $990C: ??? $FF
  // $990D: ??? $FF
  // $990E: ??? $FF
  // $990F: ??? $FF
  // $9910: ??? $FF
  // $9911: ??? $FF
  // $9912: ??? $FF
  // $9913: ??? $FF
  // $9914: ??? $FF
  // $9915: ??? $FF
  // $9916: ??? $FF
  // $9917: ??? $FF
  // $9918: ??? $FF
  // $9919: ??? $FF
  // $991A: ??? $FF
  // $991B: ??? $FF
  // $991C: ??? $FF
  // $991D: ??? $FF
  // $991E: ??? $FF
  // $991F: ??? $FF
  // $9920: ??? $FF
  // $9921: ??? $FF
  // $9922: ??? $FF
  // $9923: ??? $FF
  // $9924: ??? $FF
  // $9925: ??? $FF
  // $9926: ??? $FF
  // $9927: ??? $FF
  // $9928: ??? $FF
  // $9929: ??? $FF
  // $992A: ??? $FF
  // $992B: ??? $FF
  // $992C: ??? $FF
  // $992D: ??? $FF
  // $992E: ??? $FF
  // $992F: ??? $FF
  // $9930: ??? $FF
  // $9931: ??? $FF
  // $9932: ??? $FF
  // $9933: ??? $FF
  // $9934: ??? $FF
  // $9935: ??? $FF
  // $9936: ??? $FF
  // $9937: ??? $FF
  // $9938: ??? $FF
  // $9939: ??? $FF
  // $993A: ??? $FF
  // $993B: ??? $FF
  // $993C: ??? $FF
  // $993D: ??? $FF
  // $993E: ??? $FF
  // $993F: ??? $FF
  // $9940: ??? $FF
  // $9941: ??? $FF
  // $9942: ??? $FF
  // $9943: ??? $FF
  // $9944: ??? $FF
  // $9945: ??? $FF
  // $9946: ??? $FF
  // $9947: ??? $FF
  // $9948: ??? $FF
  // $9949: ??? $FF
  // $994A: ??? $FF
  // $994B: ??? $FF
  // $994C: ??? $FF
  // $994D: ??? $FF
  // $994E: ??? $FF
  // $994F: ??? $FF
  // $9950: ??? $FF
  // $9951: ??? $FF
  // $9952: ??? $FF
  // $9953: ??? $FF
  // $9954: ??? $FF
  // $9955: ??? $FF
  // $9956: ??? $FF
  // $9957: ??? $FF
  // $9958: ??? $FF
  // $9959: ??? $FF
  // $995A: ??? $FF
  // $995B: ??? $FF
  // $995C: ??? $FF
  // $995D: ??? $FF
  // $995E: ??? $FF
  // $995F: ??? $FF
  // $9960: ??? $FF
  // $9961: ??? $FF
  // $9962: ??? $FF
  // $9963: ??? $FF
  // $9964: ??? $FF
  // $9965: ??? $FF
  // $9966: ??? $FF
  // $9967: ??? $FF
  // $9968: ??? $FF
  // $9969: ??? $FF
  // $996A: ??? $FF
  // $996B: ??? $FF
  // $996C: ??? $FF
  // $996D: ??? $FF
  // $996E: ??? $FF
  // $996F: ??? $FF
  // $9970: ??? $FF
  // $9971: ??? $FF
  // $9972: ??? $FF
  // $9973: ??? $FF
  // $9974: ??? $FF
  // $9975: ??? $FF
  // $9976: ??? $FF
  // $9977: ??? $FF
  // $9978: ??? $FF
  // $9979: ??? $FF
  // $997A: ??? $FF
  // $997B: ??? $FF
  // $997C: ??? $FF
  // $997D: ??? $FF
  // $997E: ??? $FF
  // $997F: ??? $FF
  // $9980: ??? $FF
  // $9981: ??? $FF
  // $9982: ??? $FF
  // $9983: ??? $FF
  // $9984: ??? $FF
  // $9985: ??? $FF
  // $9986: ??? $FF
  // $9987: ??? $FF
  // $9988: ??? $FF
  // $9989: ??? $FF
  // $998A: ??? $FF
  // $998B: ??? $FF
  // $998C: ??? $FF
  // $998D: ??? $FF
  // $998E: ??? $FF
  // $998F: ??? $FF
  // $9990: ??? $FF
  // $9991: ??? $FF
  // $9992: ??? $FF
  // $9993: ??? $FF
  // $9994: ??? $FF
  // $9995: ??? $FF
  // $9996: ??? $FF
  // $9997: ??? $FF
  // $9998: ??? $FF
  // $9999: ??? $FF
  // $999A: ??? $FF
  // $999B: ??? $FF
  // $999C: ??? $FF
  // $999D: ??? $FF
  // $999E: ??? $FF
  // $999F: ??? $FF
  // $99A0: ??? $FF
  // $99A1: ??? $FF
  // $99A2: ??? $FF
  // $99A3: ??? $FF
  // $99A4: ??? $FF
  // $99A5: ??? $FF
  // $99A6: ??? $FF
  // $99A7: ??? $FF
  // $99A8: ??? $FF
  // $99A9: ??? $FF
  // $99AA: ??? $FF
  // $99AB: ??? $FF
  // $99AC: ??? $FF
  // $99AD: ??? $FF
  // $99AE: ??? $FF
  // $99AF: ??? $FF
  // $99B0: ??? $FF
  // $99B1: ??? $FF
  // $99B2: ??? $FF
  // $99B3: ??? $FF
  // $99B4: ??? $FF
  // $99B5: ??? $FF
  // $99B6: ??? $FF
  // $99B7: ??? $FF
  // $99B8: ??? $FF
  // $99B9: ??? $FF
  // $99BA: ??? $FF
  // $99BB: ??? $FF
  // $99BC: ??? $FF
  // $99BD: ??? $FF
  // $99BE: ??? $FF
  // $99BF: ??? $FF
  // $99C0: ??? $FF
  // $99C1: ??? $FF
  // $99C2: ??? $FF
  // $99C3: ??? $FF
  // $99C4: ??? $FF
  // $99C5: ??? $FF
  // $99C6: ??? $FF
  // $99C7: ??? $FF
  // $99C8: ??? $FF
  // $99C9: ??? $FF
  // $99CA: ??? $FF
  // $99CB: ??? $FF
  // $99CC: ??? $FF
  // $99CD: ??? $FF
  // $99CE: ??? $FF
  // $99CF: ??? $FF
  // $99D0: ??? $FF
  // $99D1: ??? $FF
  // $99D2: ??? $FF
  // $99D3: ??? $FF
  // $99D4: ??? $FF
  // $99D5: ??? $FF
  // $99D6: ??? $FF
  // $99D7: ??? $FF
  // $99D8: ??? $FF
  // $99D9: ??? $FF
  // $99DA: ??? $FF
  // $99DB: ??? $FF
  // $99DC: ??? $FF
  // $99DD: ??? $FF
  // $99DE: ??? $FF
  // $99DF: ??? $FF
  // $99E0: ??? $FF
  // $99E1: ??? $FF
  // $99E2: ??? $FF
  // $99E3: ??? $FF
  // $99E4: ??? $FF
  // $99E5: ??? $FF
  // $99E6: ??? $FF
  // $99E7: ??? $FF
  // $99E8: ??? $FF
  // $99E9: ??? $FF
  // $99EA: ??? $FF
  // $99EB: ??? $FF
  // $99EC: ??? $FF
  // $99ED: ??? $FF
  // $99EE: ??? $FF
  // $99EF: ??? $FF
  // $99F0: ??? $FF
  // $99F1: ??? $FF
  // $99F2: ??? $FF
  // $99F3: ??? $FF
  // $99F4: ??? $FF
  // $99F5: ??? $FF
  // $99F6: ??? $FF
  // $99F7: ??? $FF
  // $99F8: ??? $FF
  // $99F9: ??? $FF
  // $99FA: ??? $FF
  // $99FB: ??? $FF
  // $99FC: ??? $FF
  // $99FD: ??? $FF
  // $99FE: ??? $FF
  // $99FF: ??? $FF
  // $9A00: ??? $FF
  // $9A01: ??? $FF
  // $9A02: ??? $FF
  // $9A03: ??? $FF
  // $9A04: ??? $FF
  // $9A05: ??? $FF
  // $9A06: ??? $FF
  // $9A07: ??? $FF
  // $9A08: ??? $FF
  // $9A09: ??? $FF
  // $9A0A: ??? $FF
  // $9A0B: ??? $FF
  // $9A0C: ??? $FF
  // $9A0D: ??? $FF
  // $9A0E: ??? $FF
  // $9A0F: ??? $FF
  // $9A10: ??? $FF
  // $9A11: ??? $FF
  // $9A12: ??? $FF
  // $9A13: ??? $FF
  // $9A14: ??? $FF
  // $9A15: ??? $FF
  // $9A16: ??? $FF
  // $9A17: ??? $FF
  // $9A18: ??? $FF
  // $9A19: ??? $FF
  // $9A1A: ??? $FF
  // $9A1B: ??? $FF
  // $9A1C: ??? $FF
  // $9A1D: ??? $FF
  // $9A1E: ??? $FF
  // $9A1F: ??? $FF
  // $9A20: ??? $FF
  // $9A21: ??? $FF
  // $9A22: ??? $FF
  // $9A23: ??? $FF
  // $9A24: ??? $FF
  // $9A25: ??? $FF
  // $9A26: ??? $FF
  // $9A27: ??? $FF
  // $9A28: ??? $FF
  // $9A29: ??? $FF
  // $9A2A: ??? $FF
  // $9A2B: ??? $FF
  // $9A2C: ??? $FF
  // $9A2D: ??? $FF
  // $9A2E: ??? $FF
  // $9A2F: ??? $FF
  // $9A30: ??? $FF
  // $9A31: ??? $FF
  // $9A32: ??? $FF
  // $9A33: ??? $FF
  // $9A34: ??? $FF
  // $9A35: ??? $FF
  // $9A36: ??? $FF
  // $9A37: ??? $FF
  // $9A38: ??? $FF
  // $9A39: ??? $FF
  // $9A3A: ??? $FF
  // $9A3B: ??? $FF
  // $9A3C: ??? $FF
  // $9A3D: ??? $FF
  // $9A3E: ??? $FF
  // $9A3F: ??? $FF
  // $9A40: ??? $FF
  // $9A41: ??? $FF
  // $9A42: ??? $FF
  // $9A43: ??? $FF
  // $9A44: ??? $FF
  // $9A45: ??? $FF
  // $9A46: ??? $FF
  // $9A47: ??? $FF
  // $9A48: ??? $FF
  // $9A49: ??? $FF
  // $9A4A: ??? $FF
  // $9A4B: ??? $FF
  // $9A4C: ??? $FF
  // $9A4D: ??? $FF
  // $9A4E: ??? $FF
  // $9A4F: ??? $FF
  // $9A50: ??? $FF
  // $9A51: ??? $FF
  // $9A52: ??? $FF
  // $9A53: ??? $FF
  // $9A54: ??? $FF
  // $9A55: ??? $FF
  // $9A56: ??? $FF
  // $9A57: ??? $FF
  // $9A58: ??? $FF
  // $9A59: ??? $FF
  // $9A5A: ??? $FF
  // $9A5B: ??? $FF
  // $9A5C: ??? $FF
  // $9A5D: ??? $FF
  // $9A5E: ??? $FF
  // $9A5F: ??? $FF
  // $9A60: ??? $FF
  // $9A61: ??? $FF
  // $9A62: ??? $FF
  // $9A63: ??? $FF
  // $9A64: ??? $FF
  // $9A65: ??? $FF
  // $9A66: ??? $FF
  // $9A67: ??? $FF
  // $9A68: ??? $FF
  // $9A69: ??? $FF
  // $9A6A: ??? $FF
  // $9A6B: ??? $FF
  // $9A6C: ??? $FF
  // $9A6D: ??? $FF
  // $9A6E: ??? $FF
  // $9A6F: ??? $FF
  // $9A70: ??? $FF
  // $9A71: ??? $FF
  // $9A72: ??? $FF
  // $9A73: ??? $FF
  // $9A74: ??? $FF
  // $9A75: ??? $FF
  // $9A76: ??? $FF
  // $9A77: ??? $FF
  // $9A78: ??? $FF
  // $9A79: ??? $FF
  // $9A7A: ??? $FF
  // $9A7B: ??? $FF
  // $9A7C: ??? $FF
  // $9A7D: ??? $FF
  // $9A7E: ??? $FF
  // $9A7F: ??? $FF
  // $9A80: ??? $FF
  // $9A81: ??? $FF
  // $9A82: ??? $FF
  // $9A83: ??? $FF
  // $9A84: ??? $FF
  // $9A85: ??? $FF
  // $9A86: ??? $FF
  // $9A87: ??? $FF
  // $9A88: ??? $FF
  // $9A89: ??? $FF
  // $9A8A: ??? $FF
  // $9A8B: ??? $FF
  // $9A8C: ??? $FF
  // $9A8D: ??? $FF
  // $9A8E: ??? $FF
  // $9A8F: ??? $FF
  // $9A90: ??? $FF
  // $9A91: ??? $FF
  // $9A92: ??? $FF
  // $9A93: ??? $FF
  // $9A94: ??? $FF
  // $9A95: ??? $FF
  // $9A96: ??? $FF
  // $9A97: ??? $FF
  // $9A98: ??? $FF
  // $9A99: ??? $FF
  // $9A9A: ??? $FF
  // $9A9B: ??? $FF
  // $9A9C: ??? $FF
  // $9A9D: ??? $FF
  // $9A9E: ??? $FF
  // $9A9F: ??? $FF
  // $9AA0: ??? $FF
  // $9AA1: ??? $FF
  // $9AA2: ??? $FF
  // $9AA3: ??? $FF
  // $9AA4: ??? $FF
  // $9AA5: ??? $FF
  // $9AA6: ??? $FF
  // $9AA7: ??? $FF
  // $9AA8: ??? $FF
  // $9AA9: ??? $FF
  // $9AAA: ??? $FF
  // $9AAB: ??? $FF
  // $9AAC: ??? $FF
  // $9AAD: ??? $FF
  // $9AAE: ??? $FF
  // $9AAF: ??? $FF
  // $9AB0: ??? $FF
  // $9AB1: ??? $FF
  // $9AB2: ??? $FF
  // $9AB3: ??? $FF
  // $9AB4: ??? $FF
  // $9AB5: ??? $FF
  // $9AB6: ??? $FF
  // $9AB7: ??? $FF
  // $9AB8: ??? $FF
  // $9AB9: ??? $FF
  // $9ABA: ??? $FF
  // $9ABB: ??? $FF
  // $9ABC: ??? $FF
  // $9ABD: ??? $FF
  // $9ABE: ??? $FF
  // $9ABF: ??? $FF
  // $9AC0: ??? $FF
  // $9AC1: ??? $FF
  // $9AC2: ??? $FF
  // $9AC3: ??? $FF
  // $9AC4: ??? $FF
  // $9AC5: ??? $FF
  // $9AC6: ??? $FF
  // $9AC7: ??? $FF
  // $9AC8: ??? $FF
  // $9AC9: ??? $FF
  // $9ACA: ??? $FF
  // $9ACB: ??? $FF
  // $9ACC: ??? $FF
  // $9ACD: ??? $FF
  // $9ACE: ??? $FF
  // $9ACF: ??? $FF
  // $9AD0: ??? $FF
  // $9AD1: ??? $FF
  // $9AD2: ??? $FF
  // $9AD3: ??? $FF
  // $9AD4: ??? $FF
  // $9AD5: ??? $FF
  // $9AD6: ??? $FF
  // $9AD7: ??? $FF
  // $9AD8: ??? $FF
  // $9AD9: ??? $FF
  // $9ADA: ??? $FF
  // $9ADB: ??? $FF
  // $9ADC: ??? $FF
  // $9ADD: ??? $FF
  // $9ADE: ??? $FF
  // $9ADF: ??? $FF
  // $9AE0: ??? $FF
  // $9AE1: ??? $FF
  // $9AE2: ??? $FF
  // $9AE3: ??? $FF
  // $9AE4: ??? $FF
  // $9AE5: ??? $FF
  // $9AE6: ??? $FF
  // $9AE7: ??? $FF
  // $9AE8: ??? $FF
  // $9AE9: ??? $FF
  // $9AEA: ??? $FF
  // $9AEB: ??? $FF
  // $9AEC: ??? $FF
  // $9AED: ??? $FF
  // $9AEE: ??? $FF
  // $9AEF: ??? $FF
  // $9AF0: ??? $FF
  // $9AF1: ??? $FF
  // $9AF2: ??? $FF
  // $9AF3: ??? $FF
  // $9AF4: ??? $FF
  // $9AF5: ??? $FF
  // $9AF6: ??? $FF
  // $9AF7: ??? $FF
  // $9AF8: ??? $FF
  // $9AF9: ??? $FF
  // $9AFA: ??? $FF
  // $9AFB: ??? $FF
  // $9AFC: ??? $FF
  // $9AFD: ??? $FF
  // $9AFE: ??? $FF
  // $9AFF: ??? $FF
  // $9B00: ??? $FF
  // $9B01: ??? $FF
  // $9B02: ??? $FF
  // $9B03: ??? $FF
  // $9B04: ??? $FF
  // $9B05: ??? $FF
  // $9B06: ??? $FF
  // $9B07: ??? $FF
  // $9B08: ??? $FF
  // $9B09: ??? $FF
  // $9B0A: ??? $FF
  // $9B0B: ??? $FF
  // $9B0C: ??? $FF
  // $9B0D: ??? $FF
  // $9B0E: ??? $FF
  // $9B0F: ??? $FF
  // $9B10: ??? $FF
  // $9B11: ??? $FF
  // $9B12: ??? $FF
  // $9B13: ??? $FF
  // $9B14: ??? $FF
  // $9B15: ??? $FF
  // $9B16: ??? $FF
  // $9B17: ??? $FF
  // $9B18: ??? $FF
  // $9B19: ??? $FF
  // $9B1A: ??? $FF
  // $9B1B: ??? $FF
  // $9B1C: ??? $FF
  // $9B1D: ??? $FF
  // $9B1E: ??? $FF
  // $9B1F: ??? $FF
  // $9B20: ??? $FF
  // $9B21: ??? $FF
  // $9B22: ??? $FF
  // $9B23: ??? $FF
  // $9B24: ??? $FF
  // $9B25: ??? $FF
  // $9B26: ??? $FF
  // $9B27: ??? $FF
  // $9B28: ??? $FF
  // $9B29: ??? $FF
  // $9B2A: ??? $FF
  // $9B2B: ??? $FF
  // $9B2C: ??? $FF
  // $9B2D: ??? $FF
  // $9B2E: ??? $FF
  // $9B2F: ??? $FF
  // $9B30: ??? $FF
  // $9B31: ??? $FF
  // $9B32: ??? $FF
  // $9B33: ??? $FF
  // $9B34: ??? $FF
  // $9B35: ??? $FF
  // $9B36: ??? $FF
  // $9B37: ??? $FF
  // $9B38: ??? $FF
  // $9B39: ??? $FF
  // $9B3A: ??? $FF
  // $9B3B: ??? $FF
  // $9B3C: ??? $FF
  // $9B3D: ??? $FF
  // $9B3E: ??? $FF
  // $9B3F: ??? $FF
  // $9B40: ??? $FF
  // $9B41: ??? $FF
  // $9B42: ??? $FF
  // $9B43: ??? $FF
  // $9B44: ??? $FF
  // $9B45: ??? $FF
  // $9B46: ??? $FF
  // $9B47: ??? $FF
  // $9B48: ??? $FF
  // $9B49: ??? $FF
  // $9B4A: ??? $FF
  // $9B4B: ??? $FF
  // $9B4C: ??? $FF
  // $9B4D: ??? $FF
  // $9B4E: ??? $FF
  // $9B4F: ??? $FF
  // $9B50: ??? $FF
  // $9B51: ??? $FF
  // $9B52: ??? $FF
  // $9B53: ??? $FF
  // $9B54: ??? $FF
  // $9B55: ??? $FF
  // $9B56: ??? $FF
  // $9B57: ??? $FF
  // $9B58: ??? $FF
  // $9B59: ??? $FF
  // $9B5A: ??? $FF
  // $9B5B: ??? $FF
  // $9B5C: ??? $FF
  // $9B5D: ??? $FF
  // $9B5E: ??? $FF
  // $9B5F: ??? $FF
  // $9B60: ??? $FF
  // $9B61: ??? $FF
  // $9B62: ??? $FF
  // $9B63: ??? $FF
  // $9B64: ??? $FF
  // $9B65: ??? $FF
  // $9B66: ??? $FF
  // $9B67: ??? $FF
  // $9B68: ??? $FF
  // $9B69: ??? $FF
  // $9B6A: ??? $FF
  // $9B6B: ??? $FF
  // $9B6C: ??? $FF
  // $9B6D: ??? $FF
  // $9B6E: ??? $FF
  // $9B6F: ??? $FF
  // $9B70: ??? $FF
  // $9B71: ??? $FF
  // $9B72: ??? $FF
  // $9B73: ??? $FF
  // $9B74: ??? $FF
  // $9B75: ??? $FF
  // $9B76: ??? $FF
  // $9B77: ??? $FF
  // $9B78: ??? $FF
  // $9B79: ??? $FF
  // $9B7A: ??? $FF
  // $9B7B: ??? $FF
  // $9B7C: ??? $FF
  // $9B7D: ??? $FF
  // $9B7E: ??? $FF
  // $9B7F: ??? $FF
  // $9B80: ??? $FF
  // $9B81: ??? $FF
  // $9B82: ??? $FF
  // $9B83: ??? $FF
  // $9B84: ??? $FF
  // $9B85: ??? $FF
  // $9B86: ??? $FF
  // $9B87: ??? $FF
  // $9B88: ??? $FF
  // $9B89: ??? $FF
  // $9B8A: ??? $FF
  // $9B8B: ??? $FF
  // $9B8C: ??? $FF
  // $9B8D: ??? $FF
  // $9B8E: ??? $FF
  // $9B8F: ??? $FF
  // $9B90: ??? $FF
  // $9B91: ??? $FF
  // $9B92: ??? $FF
  // $9B93: ??? $FF
  // $9B94: ??? $FF
  // $9B95: ??? $FF
  // $9B96: ??? $FF
  // $9B97: ??? $FF
  // $9B98: ??? $FF
  // $9B99: ??? $FF
  // $9B9A: ??? $FF
  // $9B9B: ??? $FF
  // $9B9C: ??? $FF
  // $9B9D: ??? $FF
  // $9B9E: ??? $FF
  // $9B9F: ??? $FF
  // $9BA0: ??? $FF
  // $9BA1: ??? $FF
  // $9BA2: ??? $FF
  // $9BA3: ??? $FF
  // $9BA4: ??? $FF
  // $9BA5: ??? $FF
  // $9BA6: ??? $FF
  // $9BA7: ??? $FF
  // $9BA8: ??? $FF
  // $9BA9: ??? $FF
  // $9BAA: ??? $FF
  // $9BAB: ??? $FF
  // $9BAC: ??? $FF
  // $9BAD: ??? $FF
  // $9BAE: ??? $FF
  // $9BAF: ??? $FF
  // $9BB0: ??? $FF
  // $9BB1: ??? $FF
  // $9BB2: ??? $FF
  // $9BB3: ??? $FF
  // $9BB4: ??? $FF
  // $9BB5: ??? $FF
  // $9BB6: ??? $FF
  // $9BB7: ??? $FF
  // $9BB8: ??? $FF
  // $9BB9: ??? $FF
  // $9BBA: ??? $FF
  // $9BBB: ??? $FF
  // $9BBC: ??? $FF
  // $9BBD: ??? $FF
  // $9BBE: ??? $FF
  // $9BBF: ??? $FF
  // $9BC0: ??? $FF
  // $9BC1: ??? $FF
  // $9BC2: ??? $FF
  // $9BC3: ??? $FF
  // $9BC4: ??? $FF
  // $9BC5: ??? $FF
  // $9BC6: ??? $FF
  // $9BC7: ??? $FF
  // $9BC8: ??? $FF
  // $9BC9: ??? $FF
  // $9BCA: ??? $FF
  // $9BCB: ??? $FF
  // $9BCC: ??? $FF
  // $9BCD: ??? $FF
  // $9BCE: ??? $FF
  // $9BCF: ??? $FF
  // $9BD0: ??? $FF
  // $9BD1: ??? $FF
  // $9BD2: ??? $FF
  // $9BD3: ??? $FF
  // $9BD4: ??? $FF
  // $9BD5: ??? $FF
  // $9BD6: ??? $FF
  // $9BD7: ??? $FF
  // $9BD8: ??? $FF
  // $9BD9: ??? $FF
  // $9BDA: ??? $FF
  // $9BDB: ??? $FF
  // $9BDC: ??? $FF
  // $9BDD: ??? $FF
  // $9BDE: ??? $FF
  // $9BDF: ??? $FF
  // $9BE0: ??? $FF
  // $9BE1: ??? $FF
  // $9BE2: ??? $FF
  // $9BE3: ??? $FF
  // $9BE4: ??? $FF
  // $9BE5: ??? $FF
  // $9BE6: ??? $FF
  // $9BE7: ??? $FF
  // $9BE8: ??? $FF
  // $9BE9: ??? $FF
  // $9BEA: ??? $FF
  // $9BEB: ??? $FF
  // $9BEC: ??? $FF
  // $9BED: ??? $FF
  // $9BEE: ??? $FF
  // $9BEF: ??? $FF
  // $9BF0: ??? $FF
  // $9BF1: ??? $FF
  // $9BF2: ??? $FF
  // $9BF3: ??? $FF
  // $9BF4: ??? $FF
  // $9BF5: ??? $FF
  // $9BF6: ??? $FF
  // $9BF7: ??? $FF
  // $9BF8: ??? $FF
  // $9BF9: ??? $FF
  // $9BFA: ??? $FF
  // $9BFB: ??? $FF
  // $9BFC: ??? $FF
  // $9BFD: ??? $FF
  // $9BFE: ??? $FF
  // $9BFF: ??? $FF
  return [
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
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF
  ];
}

// ════════ $9C00-$9FFF (1024B): 未使用 (0xFF填充) ═══════=
function build_9C00_9FFF_unused(): readonly number[] {
  // $9C00: ??? $FF
  // $9C01: ??? $FF
  // $9C02: ??? $FF
  // $9C03: ??? $FF
  // $9C04: ??? $FF
  // $9C05: ??? $FF
  // $9C06: ??? $FF
  // $9C07: ??? $FF
  // $9C08: ??? $FF
  // $9C09: ??? $FF
  // $9C0A: ??? $FF
  // $9C0B: ??? $FF
  // $9C0C: ??? $FF
  // $9C0D: ??? $FF
  // $9C0E: ??? $FF
  // $9C0F: ??? $FF
  // $9C10: ??? $FF
  // $9C11: ??? $FF
  // $9C12: ??? $FF
  // $9C13: ??? $FF
  // $9C14: ??? $FF
  // $9C15: ??? $FF
  // $9C16: ??? $FF
  // $9C17: ??? $FF
  // $9C18: ??? $FF
  // $9C19: ??? $FF
  // $9C1A: ??? $FF
  // $9C1B: ??? $FF
  // $9C1C: ??? $FF
  // $9C1D: ??? $FF
  // $9C1E: ??? $FF
  // $9C1F: ??? $FF
  // $9C20: ??? $FF
  // $9C21: ??? $FF
  // $9C22: ??? $FF
  // $9C23: ??? $FF
  // $9C24: ??? $FF
  // $9C25: ??? $FF
  // $9C26: ??? $FF
  // $9C27: ??? $FF
  // $9C28: ??? $FF
  // $9C29: ??? $FF
  // $9C2A: ??? $FF
  // $9C2B: ??? $FF
  // $9C2C: ??? $FF
  // $9C2D: ??? $FF
  // $9C2E: ??? $FF
  // $9C2F: ??? $FF
  // $9C30: ??? $FF
  // $9C31: ??? $FF
  // $9C32: ??? $FF
  // $9C33: ??? $FF
  // $9C34: ??? $FF
  // $9C35: ??? $FF
  // $9C36: ??? $FF
  // $9C37: ??? $FF
  // $9C38: ??? $FF
  // $9C39: ??? $FF
  // $9C3A: ??? $FF
  // $9C3B: ??? $FF
  // $9C3C: ??? $FF
  // $9C3D: ??? $FF
  // $9C3E: ??? $FF
  // $9C3F: ??? $FF
  // $9C40: ??? $FF
  // $9C41: ??? $FF
  // $9C42: ??? $FF
  // $9C43: ??? $FF
  // $9C44: ??? $FF
  // $9C45: ??? $FF
  // $9C46: ??? $FF
  // $9C47: ??? $FF
  // $9C48: ??? $FF
  // $9C49: ??? $FF
  // $9C4A: ??? $FF
  // $9C4B: ??? $FF
  // $9C4C: ??? $FF
  // $9C4D: ??? $FF
  // $9C4E: ??? $FF
  // $9C4F: ??? $FF
  // $9C50: ??? $FF
  // $9C51: ??? $FF
  // $9C52: ??? $FF
  // $9C53: ??? $FF
  // $9C54: ??? $FF
  // $9C55: ??? $FF
  // $9C56: ??? $FF
  // $9C57: ??? $FF
  // $9C58: ??? $FF
  // $9C59: ??? $FF
  // $9C5A: ??? $FF
  // $9C5B: ??? $FF
  // $9C5C: ??? $FF
  // $9C5D: ??? $FF
  // $9C5E: ??? $FF
  // $9C5F: ??? $FF
  // $9C60: ??? $FF
  // $9C61: ??? $FF
  // $9C62: ??? $FF
  // $9C63: ??? $FF
  // $9C64: ??? $FF
  // $9C65: ??? $FF
  // $9C66: ??? $FF
  // $9C67: ??? $FF
  // $9C68: ??? $FF
  // $9C69: ??? $FF
  // $9C6A: ??? $FF
  // $9C6B: ??? $FF
  // $9C6C: ??? $FF
  // $9C6D: ??? $FF
  // $9C6E: ??? $FF
  // $9C6F: ??? $FF
  // $9C70: ??? $FF
  // $9C71: ??? $FF
  // $9C72: ??? $FF
  // $9C73: ??? $FF
  // $9C74: ??? $FF
  // $9C75: ??? $FF
  // $9C76: ??? $FF
  // $9C77: ??? $FF
  // $9C78: ??? $FF
  // $9C79: ??? $FF
  // $9C7A: ??? $FF
  // $9C7B: ??? $FF
  // $9C7C: ??? $FF
  // $9C7D: ??? $FF
  // $9C7E: ??? $FF
  // $9C7F: ??? $FF
  // $9C80: ??? $FF
  // $9C81: ??? $FF
  // $9C82: ??? $FF
  // $9C83: ??? $FF
  // $9C84: ??? $FF
  // $9C85: ??? $FF
  // $9C86: ??? $FF
  // $9C87: ??? $FF
  // $9C88: ??? $FF
  // $9C89: ??? $FF
  // $9C8A: ??? $FF
  // $9C8B: ??? $FF
  // $9C8C: ??? $FF
  // $9C8D: ??? $FF
  // $9C8E: ??? $FF
  // $9C8F: ??? $FF
  // $9C90: ??? $FF
  // $9C91: ??? $FF
  // $9C92: ??? $FF
  // $9C93: ??? $FF
  // $9C94: ??? $FF
  // $9C95: ??? $FF
  // $9C96: ??? $FF
  // $9C97: ??? $FF
  // $9C98: ??? $FF
  // $9C99: ??? $FF
  // $9C9A: ??? $FF
  // $9C9B: ??? $FF
  // $9C9C: ??? $FF
  // $9C9D: ??? $FF
  // $9C9E: ??? $FF
  // $9C9F: ??? $FF
  // $9CA0: ??? $FF
  // $9CA1: ??? $FF
  // $9CA2: ??? $FF
  // $9CA3: ??? $FF
  // $9CA4: ??? $FF
  // $9CA5: ??? $FF
  // $9CA6: ??? $FF
  // $9CA7: ??? $FF
  // $9CA8: ??? $FF
  // $9CA9: ??? $FF
  // $9CAA: ??? $FF
  // $9CAB: ??? $FF
  // $9CAC: ??? $FF
  // $9CAD: ??? $FF
  // $9CAE: ??? $FF
  // $9CAF: ??? $FF
  // $9CB0: ??? $FF
  // $9CB1: ??? $FF
  // $9CB2: ??? $FF
  // $9CB3: ??? $FF
  // $9CB4: ??? $FF
  // $9CB5: ??? $FF
  // $9CB6: ??? $FF
  // $9CB7: ??? $FF
  // $9CB8: ??? $FF
  // $9CB9: ??? $FF
  // $9CBA: ??? $FF
  // $9CBB: ??? $FF
  // $9CBC: ??? $FF
  // $9CBD: ??? $FF
  // $9CBE: ??? $FF
  // $9CBF: ??? $FF
  // $9CC0: ??? $FF
  // $9CC1: ??? $FF
  // $9CC2: ??? $FF
  // $9CC3: ??? $FF
  // $9CC4: ??? $FF
  // $9CC5: ??? $FF
  // $9CC6: ??? $FF
  // $9CC7: ??? $FF
  // $9CC8: ??? $FF
  // $9CC9: ??? $FF
  // $9CCA: ??? $FF
  // $9CCB: ??? $FF
  // $9CCC: ??? $FF
  // $9CCD: ??? $FF
  // $9CCE: ??? $FF
  // $9CCF: ??? $FF
  // $9CD0: ??? $FF
  // $9CD1: ??? $FF
  // $9CD2: ??? $FF
  // $9CD3: ??? $FF
  // $9CD4: ??? $FF
  // $9CD5: ??? $FF
  // $9CD6: ??? $FF
  // $9CD7: ??? $FF
  // $9CD8: ??? $FF
  // $9CD9: ??? $FF
  // $9CDA: ??? $FF
  // $9CDB: ??? $FF
  // $9CDC: ??? $FF
  // $9CDD: ??? $FF
  // $9CDE: ??? $FF
  // $9CDF: ??? $FF
  // $9CE0: ??? $FF
  // $9CE1: ??? $FF
  // $9CE2: ??? $FF
  // $9CE3: ??? $FF
  // $9CE4: ??? $FF
  // $9CE5: ??? $FF
  // $9CE6: ??? $FF
  // $9CE7: ??? $FF
  // $9CE8: ??? $FF
  // $9CE9: ??? $FF
  // $9CEA: ??? $FF
  // $9CEB: ??? $FF
  // $9CEC: ??? $FF
  // $9CED: ??? $FF
  // $9CEE: ??? $FF
  // $9CEF: ??? $FF
  // $9CF0: ??? $FF
  // $9CF1: ??? $FF
  // $9CF2: ??? $FF
  // $9CF3: ??? $FF
  // $9CF4: ??? $FF
  // $9CF5: ??? $FF
  // $9CF6: ??? $FF
  // $9CF7: ??? $FF
  // $9CF8: ??? $FF
  // $9CF9: ??? $FF
  // $9CFA: ??? $FF
  // $9CFB: ??? $FF
  // $9CFC: ??? $FF
  // $9CFD: ??? $FF
  // $9CFE: ??? $FF
  // $9CFF: ??? $FF
  // $9D00: ??? $FF
  // $9D01: ??? $FF
  // $9D02: ??? $FF
  // $9D03: ??? $FF
  // $9D04: ??? $FF
  // $9D05: ??? $FF
  // $9D06: ??? $FF
  // $9D07: ??? $FF
  // $9D08: ??? $FF
  // $9D09: ??? $FF
  // $9D0A: ??? $FF
  // $9D0B: ??? $FF
  // $9D0C: ??? $FF
  // $9D0D: ??? $FF
  // $9D0E: ??? $FF
  // $9D0F: ??? $FF
  // $9D10: ??? $FF
  // $9D11: ??? $FF
  // $9D12: ??? $FF
  // $9D13: ??? $FF
  // $9D14: ??? $FF
  // $9D15: ??? $FF
  // $9D16: ??? $FF
  // $9D17: ??? $FF
  // $9D18: ??? $FF
  // $9D19: ??? $FF
  // $9D1A: ??? $FF
  // $9D1B: ??? $FF
  // $9D1C: ??? $FF
  // $9D1D: ??? $FF
  // $9D1E: ??? $FF
  // $9D1F: ??? $FF
  // $9D20: ??? $FF
  // $9D21: ??? $FF
  // $9D22: ??? $FF
  // $9D23: ??? $FF
  // $9D24: ??? $FF
  // $9D25: ??? $FF
  // $9D26: ??? $FF
  // $9D27: ??? $FF
  // $9D28: ??? $FF
  // $9D29: ??? $FF
  // $9D2A: ??? $FF
  // $9D2B: ??? $FF
  // $9D2C: ??? $FF
  // $9D2D: ??? $FF
  // $9D2E: ??? $FF
  // $9D2F: ??? $FF
  // $9D30: ??? $FF
  // $9D31: ??? $FF
  // $9D32: ??? $FF
  // $9D33: ??? $FF
  // $9D34: ??? $FF
  // $9D35: ??? $FF
  // $9D36: ??? $FF
  // $9D37: ??? $FF
  // $9D38: ??? $FF
  // $9D39: ??? $FF
  // $9D3A: ??? $FF
  // $9D3B: ??? $FF
  // $9D3C: ??? $FF
  // $9D3D: ??? $FF
  // $9D3E: ??? $FF
  // $9D3F: ??? $FF
  // $9D40: ??? $FF
  // $9D41: ??? $FF
  // $9D42: ??? $FF
  // $9D43: ??? $FF
  // $9D44: ??? $FF
  // $9D45: ??? $FF
  // $9D46: ??? $FF
  // $9D47: ??? $FF
  // $9D48: ??? $FF
  // $9D49: ??? $FF
  // $9D4A: ??? $FF
  // $9D4B: ??? $FF
  // $9D4C: ??? $FF
  // $9D4D: ??? $FF
  // $9D4E: ??? $FF
  // $9D4F: ??? $FF
  // $9D50: ??? $FF
  // $9D51: ??? $FF
  // $9D52: ??? $FF
  // $9D53: ??? $FF
  // $9D54: ??? $FF
  // $9D55: ??? $FF
  // $9D56: ??? $FF
  // $9D57: ??? $FF
  // $9D58: ??? $FF
  // $9D59: ??? $FF
  // $9D5A: ??? $FF
  // $9D5B: ??? $FF
  // $9D5C: ??? $FF
  // $9D5D: ??? $FF
  // $9D5E: ??? $FF
  // $9D5F: ??? $FF
  // $9D60: ??? $FF
  // $9D61: ??? $FF
  // $9D62: ??? $FF
  // $9D63: ??? $FF
  // $9D64: ??? $FF
  // $9D65: ??? $FF
  // $9D66: ??? $FF
  // $9D67: ??? $FF
  // $9D68: ??? $FF
  // $9D69: ??? $FF
  // $9D6A: ??? $FF
  // $9D6B: ??? $FF
  // $9D6C: ??? $FF
  // $9D6D: ??? $FF
  // $9D6E: ??? $FF
  // $9D6F: ??? $FF
  // $9D70: ??? $FF
  // $9D71: ??? $FF
  // $9D72: ??? $FF
  // $9D73: ??? $FF
  // $9D74: ??? $FF
  // $9D75: ??? $FF
  // $9D76: ??? $FF
  // $9D77: ??? $FF
  // $9D78: ??? $FF
  // $9D79: ??? $FF
  // $9D7A: ??? $FF
  // $9D7B: ??? $FF
  // $9D7C: ??? $FF
  // $9D7D: ??? $FF
  // $9D7E: ??? $FF
  // $9D7F: ??? $FF
  // $9D80: ??? $FF
  // $9D81: ??? $FF
  // $9D82: ??? $FF
  // $9D83: ??? $FF
  // $9D84: ??? $FF
  // $9D85: ??? $FF
  // $9D86: ??? $FF
  // $9D87: ??? $FF
  // $9D88: ??? $FF
  // $9D89: ??? $FF
  // $9D8A: ??? $FF
  // $9D8B: ??? $FF
  // $9D8C: ??? $FF
  // $9D8D: ??? $FF
  // $9D8E: ??? $FF
  // $9D8F: ??? $FF
  // $9D90: ??? $FF
  // $9D91: ??? $FF
  // $9D92: ??? $FF
  // $9D93: ??? $FF
  // $9D94: ??? $FF
  // $9D95: ??? $FF
  // $9D96: ??? $FF
  // $9D97: ??? $FF
  // $9D98: ??? $FF
  // $9D99: ??? $FF
  // $9D9A: ??? $FF
  // $9D9B: ??? $FF
  // $9D9C: ??? $FF
  // $9D9D: ??? $FF
  // $9D9E: ??? $FF
  // $9D9F: ??? $FF
  // $9DA0: ??? $FF
  // $9DA1: ??? $FF
  // $9DA2: ??? $FF
  // $9DA3: ??? $FF
  // $9DA4: ??? $FF
  // $9DA5: ??? $FF
  // $9DA6: ??? $FF
  // $9DA7: ??? $FF
  // $9DA8: ??? $FF
  // $9DA9: ??? $FF
  // $9DAA: ??? $FF
  // $9DAB: ??? $FF
  // $9DAC: ??? $FF
  // $9DAD: ??? $FF
  // $9DAE: ??? $FF
  // $9DAF: ??? $FF
  // $9DB0: ??? $FF
  // $9DB1: ??? $FF
  // $9DB2: ??? $FF
  // $9DB3: ??? $FF
  // $9DB4: ??? $FF
  // $9DB5: ??? $FF
  // $9DB6: ??? $FF
  // $9DB7: ??? $FF
  // $9DB8: ??? $FF
  // $9DB9: ??? $FF
  // $9DBA: ??? $FF
  // $9DBB: ??? $FF
  // $9DBC: ??? $FF
  // $9DBD: ??? $FF
  // $9DBE: ??? $FF
  // $9DBF: ??? $FF
  // $9DC0: ??? $FF
  // $9DC1: ??? $FF
  // $9DC2: ??? $FF
  // $9DC3: ??? $FF
  // $9DC4: ??? $FF
  // $9DC5: ??? $FF
  // $9DC6: ??? $FF
  // $9DC7: ??? $FF
  // $9DC8: ??? $FF
  // $9DC9: ??? $FF
  // $9DCA: ??? $FF
  // $9DCB: ??? $FF
  // $9DCC: ??? $FF
  // $9DCD: ??? $FF
  // $9DCE: ??? $FF
  // $9DCF: ??? $FF
  // $9DD0: ??? $FF
  // $9DD1: ??? $FF
  // $9DD2: ??? $FF
  // $9DD3: ??? $FF
  // $9DD4: ??? $FF
  // $9DD5: ??? $FF
  // $9DD6: ??? $FF
  // $9DD7: ??? $FF
  // $9DD8: ??? $FF
  // $9DD9: ??? $FF
  // $9DDA: ??? $FF
  // $9DDB: ??? $FF
  // $9DDC: ??? $FF
  // $9DDD: ??? $FF
  // $9DDE: ??? $FF
  // $9DDF: ??? $FF
  // $9DE0: ??? $FF
  // $9DE1: ??? $FF
  // $9DE2: ??? $FF
  // $9DE3: ??? $FF
  // $9DE4: ??? $FF
  // $9DE5: ??? $FF
  // $9DE6: ??? $FF
  // $9DE7: ??? $FF
  // $9DE8: ??? $FF
  // $9DE9: ??? $FF
  // $9DEA: ??? $FF
  // $9DEB: ??? $FF
  // $9DEC: ??? $FF
  // $9DED: ??? $FF
  // $9DEE: ??? $FF
  // $9DEF: ??? $FF
  // $9DF0: ??? $FF
  // $9DF1: ??? $FF
  // $9DF2: ??? $FF
  // $9DF3: ??? $FF
  // $9DF4: ??? $FF
  // $9DF5: ??? $FF
  // $9DF6: ??? $FF
  // $9DF7: ??? $FF
  // $9DF8: ??? $FF
  // $9DF9: ??? $FF
  // $9DFA: ??? $FF
  // $9DFB: ??? $FF
  // $9DFC: ??? $FF
  // $9DFD: ??? $FF
  // $9DFE: ??? $FF
  // $9DFF: ??? $FF
  // $9E00: ??? $FF
  // $9E01: ??? $FF
  // $9E02: ??? $FF
  // $9E03: ??? $FF
  // $9E04: ??? $FF
  // $9E05: ??? $FF
  // $9E06: ??? $FF
  // $9E07: ??? $FF
  // $9E08: ??? $FF
  // $9E09: ??? $FF
  // $9E0A: ??? $FF
  // $9E0B: ??? $FF
  // $9E0C: ??? $FF
  // $9E0D: ??? $FF
  // $9E0E: ??? $FF
  // $9E0F: ??? $FF
  // $9E10: ??? $FF
  // $9E11: ??? $FF
  // $9E12: ??? $FF
  // $9E13: ??? $FF
  // $9E14: ??? $FF
  // $9E15: ??? $FF
  // $9E16: ??? $FF
  // $9E17: ??? $FF
  // $9E18: ??? $FF
  // $9E19: ??? $FF
  // $9E1A: ??? $FF
  // $9E1B: ??? $FF
  // $9E1C: ??? $FF
  // $9E1D: ??? $FF
  // $9E1E: ??? $FF
  // $9E1F: ??? $FF
  // $9E20: ??? $FF
  // $9E21: ??? $FF
  // $9E22: ??? $FF
  // $9E23: ??? $FF
  // $9E24: ??? $FF
  // $9E25: ??? $FF
  // $9E26: ??? $FF
  // $9E27: ??? $FF
  // $9E28: ??? $FF
  // $9E29: ??? $FF
  // $9E2A: ??? $FF
  // $9E2B: ??? $FF
  // $9E2C: ??? $FF
  // $9E2D: ??? $FF
  // $9E2E: ??? $FF
  // $9E2F: ??? $FF
  // $9E30: ??? $FF
  // $9E31: ??? $FF
  // $9E32: ??? $FF
  // $9E33: ??? $FF
  // $9E34: ??? $FF
  // $9E35: ??? $FF
  // $9E36: ??? $FF
  // $9E37: ??? $FF
  // $9E38: ??? $FF
  // $9E39: ??? $FF
  // $9E3A: ??? $FF
  // $9E3B: ??? $FF
  // $9E3C: ??? $FF
  // $9E3D: ??? $FF
  // $9E3E: ??? $FF
  // $9E3F: ??? $FF
  // $9E40: ??? $FF
  // $9E41: ??? $FF
  // $9E42: ??? $FF
  // $9E43: ??? $FF
  // $9E44: ??? $FF
  // $9E45: ??? $FF
  // $9E46: ??? $FF
  // $9E47: ??? $FF
  // $9E48: ??? $FF
  // $9E49: ??? $FF
  // $9E4A: ??? $FF
  // $9E4B: ??? $FF
  // $9E4C: ??? $FF
  // $9E4D: ??? $FF
  // $9E4E: ??? $FF
  // $9E4F: ??? $FF
  // $9E50: ??? $FF
  // $9E51: ??? $FF
  // $9E52: ??? $FF
  // $9E53: ??? $FF
  // $9E54: ??? $FF
  // $9E55: ??? $FF
  // $9E56: ??? $FF
  // $9E57: ??? $FF
  // $9E58: ??? $FF
  // $9E59: ??? $FF
  // $9E5A: ??? $FF
  // $9E5B: ??? $FF
  // $9E5C: ??? $FF
  // $9E5D: ??? $FF
  // $9E5E: ??? $FF
  // $9E5F: ??? $FF
  // $9E60: ??? $FF
  // $9E61: ??? $FF
  // $9E62: ??? $FF
  // $9E63: ??? $FF
  // $9E64: ??? $FF
  // $9E65: ??? $FF
  // $9E66: ??? $FF
  // $9E67: ??? $FF
  // $9E68: ??? $FF
  // $9E69: ??? $FF
  // $9E6A: ??? $FF
  // $9E6B: ??? $FF
  // $9E6C: ??? $FF
  // $9E6D: ??? $FF
  // $9E6E: ??? $FF
  // $9E6F: ??? $FF
  // $9E70: ??? $FF
  // $9E71: ??? $FF
  // $9E72: ??? $FF
  // $9E73: ??? $FF
  // $9E74: ??? $FF
  // $9E75: ??? $FF
  // $9E76: ??? $FF
  // $9E77: ??? $FF
  // $9E78: ??? $FF
  // $9E79: ??? $FF
  // $9E7A: ??? $FF
  // $9E7B: ??? $FF
  // $9E7C: ??? $FF
  // $9E7D: ??? $FF
  // $9E7E: ??? $FF
  // $9E7F: ??? $FF
  // $9E80: ??? $FF
  // $9E81: ??? $FF
  // $9E82: ??? $FF
  // $9E83: ??? $FF
  // $9E84: ??? $FF
  // $9E85: ??? $FF
  // $9E86: ??? $FF
  // $9E87: ??? $FF
  // $9E88: ??? $FF
  // $9E89: ??? $FF
  // $9E8A: ??? $FF
  // $9E8B: ??? $FF
  // $9E8C: ??? $FF
  // $9E8D: ??? $FF
  // $9E8E: ??? $FF
  // $9E8F: ??? $FF
  // $9E90: ??? $FF
  // $9E91: ??? $FF
  // $9E92: ??? $FF
  // $9E93: ??? $FF
  // $9E94: ??? $FF
  // $9E95: ??? $FF
  // $9E96: ??? $FF
  // $9E97: ??? $FF
  // $9E98: ??? $FF
  // $9E99: ??? $FF
  // $9E9A: ??? $FF
  // $9E9B: ??? $FF
  // $9E9C: ??? $FF
  // $9E9D: ??? $FF
  // $9E9E: ??? $FF
  // $9E9F: ??? $FF
  // $9EA0: ??? $FF
  // $9EA1: ??? $FF
  // $9EA2: ??? $FF
  // $9EA3: ??? $FF
  // $9EA4: ??? $FF
  // $9EA5: ??? $FF
  // $9EA6: ??? $FF
  // $9EA7: ??? $FF
  // $9EA8: ??? $FF
  // $9EA9: ??? $FF
  // $9EAA: ??? $FF
  // $9EAB: ??? $FF
  // $9EAC: ??? $FF
  // $9EAD: ??? $FF
  // $9EAE: ??? $FF
  // $9EAF: ??? $FF
  // $9EB0: ??? $FF
  // $9EB1: ??? $FF
  // $9EB2: ??? $FF
  // $9EB3: ??? $FF
  // $9EB4: ??? $FF
  // $9EB5: ??? $FF
  // $9EB6: ??? $FF
  // $9EB7: ??? $FF
  // $9EB8: ??? $FF
  // $9EB9: ??? $FF
  // $9EBA: ??? $FF
  // $9EBB: ??? $FF
  // $9EBC: ??? $FF
  // $9EBD: ??? $FF
  // $9EBE: ??? $FF
  // $9EBF: ??? $FF
  // $9EC0: ??? $FF
  // $9EC1: ??? $FF
  // $9EC2: ??? $FF
  // $9EC3: ??? $FF
  // $9EC4: ??? $FF
  // $9EC5: ??? $FF
  // $9EC6: ??? $FF
  // $9EC7: ??? $FF
  // $9EC8: ??? $FF
  // $9EC9: ??? $FF
  // $9ECA: ??? $FF
  // $9ECB: ??? $FF
  // $9ECC: ??? $FF
  // $9ECD: ??? $FF
  // $9ECE: ??? $FF
  // $9ECF: ??? $FF
  // $9ED0: ??? $FF
  // $9ED1: ??? $FF
  // $9ED2: ??? $FF
  // $9ED3: ??? $FF
  // $9ED4: ??? $FF
  // $9ED5: ??? $FF
  // $9ED6: ??? $FF
  // $9ED7: ??? $FF
  // $9ED8: ??? $FF
  // $9ED9: ??? $FF
  // $9EDA: ??? $FF
  // $9EDB: ??? $FF
  // $9EDC: ??? $FF
  // $9EDD: ??? $FF
  // $9EDE: ??? $FF
  // $9EDF: ??? $FF
  // $9EE0: ??? $FF
  // $9EE1: ??? $FF
  // $9EE2: ??? $FF
  // $9EE3: ??? $FF
  // $9EE4: ??? $FF
  // $9EE5: ??? $FF
  // $9EE6: ??? $FF
  // $9EE7: ??? $FF
  // $9EE8: ??? $FF
  // $9EE9: ??? $FF
  // $9EEA: ??? $FF
  // $9EEB: ??? $FF
  // $9EEC: ??? $FF
  // $9EED: ??? $FF
  // $9EEE: ??? $FF
  // $9EEF: ??? $FF
  // $9EF0: ??? $FF
  // $9EF1: ??? $FF
  // $9EF2: ??? $FF
  // $9EF3: ??? $FF
  // $9EF4: ??? $FF
  // $9EF5: ??? $FF
  // $9EF6: ??? $FF
  // $9EF7: ??? $FF
  // $9EF8: ??? $FF
  // $9EF9: ??? $FF
  // $9EFA: ??? $FF
  // $9EFB: ??? $FF
  // $9EFC: ??? $FF
  // $9EFD: ??? $FF
  // $9EFE: ??? $FF
  // $9EFF: ??? $FF
  // $9F00: ??? $FF
  // $9F01: ??? $FF
  // $9F02: ??? $FF
  // $9F03: ??? $FF
  // $9F04: ??? $FF
  // $9F05: ??? $FF
  // $9F06: ??? $FF
  // $9F07: ??? $FF
  // $9F08: ??? $FF
  // $9F09: ??? $FF
  // $9F0A: ??? $FF
  // $9F0B: ??? $FF
  // $9F0C: ??? $FF
  // $9F0D: ??? $FF
  // $9F0E: ??? $FF
  // $9F0F: ??? $FF
  // $9F10: ??? $FF
  // $9F11: ??? $FF
  // $9F12: ??? $FF
  // $9F13: ??? $FF
  // $9F14: ??? $FF
  // $9F15: ??? $FF
  // $9F16: ??? $FF
  // $9F17: ??? $FF
  // $9F18: ??? $FF
  // $9F19: ??? $FF
  // $9F1A: ??? $FF
  // $9F1B: ??? $FF
  // $9F1C: ??? $FF
  // $9F1D: ??? $FF
  // $9F1E: ??? $FF
  // $9F1F: ??? $FF
  // $9F20: ??? $FF
  // $9F21: ??? $FF
  // $9F22: ??? $FF
  // $9F23: ??? $FF
  // $9F24: ??? $FF
  // $9F25: ??? $FF
  // $9F26: ??? $FF
  // $9F27: ??? $FF
  // $9F28: ??? $FF
  // $9F29: ??? $FF
  // $9F2A: ??? $FF
  // $9F2B: ??? $FF
  // $9F2C: ??? $FF
  // $9F2D: ??? $FF
  // $9F2E: ??? $FF
  // $9F2F: ??? $FF
  // $9F30: ??? $FF
  // $9F31: ??? $FF
  // $9F32: ??? $FF
  // $9F33: ??? $FF
  // $9F34: ??? $FF
  // $9F35: ??? $FF
  // $9F36: ??? $FF
  // $9F37: ??? $FF
  // $9F38: ??? $FF
  // $9F39: ??? $FF
  // $9F3A: ??? $FF
  // $9F3B: ??? $FF
  // $9F3C: ??? $FF
  // $9F3D: ??? $FF
  // $9F3E: ??? $FF
  // $9F3F: ??? $FF
  // $9F40: ??? $FF
  // $9F41: ??? $FF
  // $9F42: ??? $FF
  // $9F43: ??? $FF
  // $9F44: ??? $FF
  // $9F45: ??? $FF
  // $9F46: ??? $FF
  // $9F47: ??? $FF
  // $9F48: ??? $FF
  // $9F49: ??? $FF
  // $9F4A: ??? $FF
  // $9F4B: ??? $FF
  // $9F4C: ??? $FF
  // $9F4D: ??? $FF
  // $9F4E: ??? $FF
  // $9F4F: ??? $FF
  // $9F50: ??? $FF
  // $9F51: ??? $FF
  // $9F52: ??? $FF
  // $9F53: ??? $FF
  // $9F54: ??? $FF
  // $9F55: ??? $FF
  // $9F56: ??? $FF
  // $9F57: ??? $FF
  // $9F58: ??? $FF
  // $9F59: ??? $FF
  // $9F5A: ??? $FF
  // $9F5B: ??? $FF
  // $9F5C: ??? $FF
  // $9F5D: ??? $FF
  // $9F5E: ??? $FF
  // $9F5F: ??? $FF
  // $9F60: ??? $FF
  // $9F61: ??? $FF
  // $9F62: ??? $FF
  // $9F63: ??? $FF
  // $9F64: ??? $FF
  // $9F65: ??? $FF
  // $9F66: ??? $FF
  // $9F67: ??? $FF
  // $9F68: ??? $FF
  // $9F69: ??? $FF
  // $9F6A: ??? $FF
  // $9F6B: ??? $FF
  // $9F6C: ??? $FF
  // $9F6D: ??? $FF
  // $9F6E: ??? $FF
  // $9F6F: ??? $FF
  // $9F70: ??? $FF
  // $9F71: ??? $FF
  // $9F72: ??? $FF
  // $9F73: ??? $FF
  // $9F74: ??? $FF
  // $9F75: ??? $FF
  // $9F76: ??? $FF
  // $9F77: ??? $FF
  // $9F78: ??? $FF
  // $9F79: ??? $FF
  // $9F7A: ??? $FF
  // $9F7B: ??? $FF
  // $9F7C: ??? $FF
  // $9F7D: ??? $FF
  // $9F7E: ??? $FF
  // $9F7F: ??? $FF
  // $9F80: ??? $FF
  // $9F81: ??? $FF
  // $9F82: ??? $FF
  // $9F83: ??? $FF
  // $9F84: ??? $FF
  // $9F85: ??? $FF
  // $9F86: ??? $FF
  // $9F87: ??? $FF
  // $9F88: ??? $FF
  // $9F89: ??? $FF
  // $9F8A: ??? $FF
  // $9F8B: ??? $FF
  // $9F8C: ??? $FF
  // $9F8D: ??? $FF
  // $9F8E: ??? $FF
  // $9F8F: ??? $FF
  // $9F90: ??? $FF
  // $9F91: ??? $FF
  // $9F92: ??? $FF
  // $9F93: ??? $FF
  // $9F94: ??? $FF
  // $9F95: ??? $FF
  // $9F96: ??? $FF
  // $9F97: ??? $FF
  // $9F98: ??? $FF
  // $9F99: ??? $FF
  // $9F9A: ??? $FF
  // $9F9B: ??? $FF
  // $9F9C: ??? $FF
  // $9F9D: ??? $FF
  // $9F9E: ??? $FF
  // $9F9F: ??? $FF
  // $9FA0: ??? $FF
  // $9FA1: ??? $FF
  // $9FA2: ??? $FF
  // $9FA3: ??? $FF
  // $9FA4: ??? $FF
  // $9FA5: ??? $FF
  // $9FA6: ??? $FF
  // $9FA7: ??? $FF
  // $9FA8: ??? $FF
  // $9FA9: ??? $FF
  // $9FAA: ??? $FF
  // $9FAB: ??? $FF
  // $9FAC: ??? $FF
  // $9FAD: ??? $FF
  // $9FAE: ??? $FF
  // $9FAF: ??? $FF
  // $9FB0: ??? $FF
  // $9FB1: ??? $FF
  // $9FB2: ??? $FF
  // $9FB3: ??? $FF
  // $9FB4: ??? $FF
  // $9FB5: ??? $FF
  // $9FB6: ??? $FF
  // $9FB7: ??? $FF
  // $9FB8: ??? $FF
  // $9FB9: ??? $FF
  // $9FBA: ??? $FF
  // $9FBB: ??? $FF
  // $9FBC: ??? $FF
  // $9FBD: ??? $FF
  // $9FBE: ??? $FF
  // $9FBF: ??? $FF
  // $9FC0: ??? $FF
  // $9FC1: ??? $FF
  // $9FC2: ??? $FF
  // $9FC3: ??? $FF
  // $9FC4: ??? $FF
  // $9FC5: ??? $FF
  // $9FC6: ??? $FF
  // $9FC7: ??? $FF
  // $9FC8: ??? $FF
  // $9FC9: ??? $FF
  // $9FCA: ??? $FF
  // $9FCB: ??? $FF
  // $9FCC: ??? $FF
  // $9FCD: ??? $FF
  // $9FCE: ??? $FF
  // $9FCF: ??? $FF
  // $9FD0: ??? $FF
  // $9FD1: ??? $FF
  // $9FD2: ??? $FF
  // $9FD3: ??? $FF
  // $9FD4: ??? $FF
  // $9FD5: ??? $FF
  // $9FD6: ??? $FF
  // $9FD7: ??? $FF
  // $9FD8: ??? $FF
  // $9FD9: ??? $FF
  // $9FDA: ??? $FF
  // $9FDB: ??? $FF
  // $9FDC: ??? $FF
  // $9FDD: ??? $FF
  // $9FDE: ??? $FF
  // $9FDF: ??? $FF
  // $9FE0: ??? $FF
  // $9FE1: ??? $FF
  // $9FE2: ??? $FF
  // $9FE3: ??? $FF
  // $9FE4: ??? $FF
  // $9FE5: ??? $FF
  // $9FE6: ??? $FF
  // $9FE7: ??? $FF
  // $9FE8: ??? $FF
  // $9FE9: ??? $FF
  // $9FEA: ??? $FF
  // $9FEB: ??? $FF
  // $9FEC: ??? $FF
  // $9FED: ??? $FF
  // $9FEE: ??? $FF
  // $9FEF: ??? $FF
  // $9FF0: ??? $FF
  // $9FF1: ??? $FF
  // $9FF2: ??? $FF
  // $9FF3: ??? $FF
  // $9FF4: ??? $FF
  // $9FF5: ??? $FF
  // $9FF6: ??? $FF
  // $9FF7: ??? $FF
  // $9FF8: ??? $FF
  // $9FF9: ??? $FF
  // $9FFA: ??? $FF
  // $9FFB: ??? $FF
  // $9FFC: ??? $FF
  // $9FFD: ??? $FF
  // $9FFE: ??? $FF
  // $9FFF: ??? $FF
  return [
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
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF
  ];
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
