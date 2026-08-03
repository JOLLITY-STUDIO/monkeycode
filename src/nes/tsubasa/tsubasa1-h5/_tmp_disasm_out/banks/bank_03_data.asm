; PRG Bank $03
; CPU Address Range: $8000 - $BFFF
; ROM Offset: $C000
; ============================================================

  $8000: 4C 18 C0  JMP $c018
  $8003: 4C 2D C1  JMP $c12d
  $8006: 4C 8F C3  JMP $c38f
  $8009: 4C 03 C4  JMP $c403
  $800C: 4C C0 FE  JMP $fec0
  $800F: 4C C3 FE  JMP $fec3
  $8012: 4C C6 FE  JMP $fec6
  $8015: 4C 91 C1  JMP $c191
  $8018: A2 ED     LDX #$ed
  $801A: 86 31     STX $31
  $801C: A2 C4     LDX #$c4
  $801E: 86 32     STX $32
  $8020: 0A        ASL A
  $8021: 90 02     BCC $8025
  $8023: E6 32     INC $32
  $8025: A8        TAY
  $8026: B1 31     LDA ($31),Y
  $8028: AA        TAX
  $8029: C8        INY
  $802A: B1 31     LDA ($31),Y
  $802C: 86 31     STX $31
  $802E: 85 32     STA $32
  $8030: 24 74     BIT $74
  $8032: 50 09     BVC $803d
  $8034: A5 38     LDA $38
  $8036: 49 FF     EOR #$ff
  $8038: 18        CLC
  $8039: 69 01     ADC #$01
  $803B: 85 38     STA $38
  $803D: A0 00     LDY #$00
  $803F: 84 33     STY $33
  $8041: 84 36     STY $36
  $8043: B1 31     LDA ($31),Y
  $8045: 08        PHP
  $8046: 29 7F     AND #$7f
  $8048: 85 1B     STA $1b
  $804A: 28        PLP
  $804B: 30 12     BMI $805f
  $804D: AD D6 03  LDA $03d6
  $8050: 0A        ASL A
  $8051: A8        TAY
  $8052: C8        INY
  $8053: B1 31     LDA ($31),Y
  $8055: AA        TAX
  $8056: C8        INY
  $8057: B1 31     LDA ($31),Y
  $8059: 86 31     STX $31
  $805B: 85 32     STA $32
  $805D: D0 02     BNE $8061
  $805F: E6 33     INC $33
  $8061: AC 33 00  LDY $0033
  $8064: B1 31     LDA ($31),Y
  $8066: 29 E0     AND #$e0
  $8068: 4A        LSR A
  $8069: 4A        LSR A
  $806A: 4A        LSR A
  $806B: 4A        LSR A
  $806C: 4A        LSR A
  $806D: 20 17 80  JSR $8017
  $8070: 80 C0     NOP #$c0
  $8072: 0E C1 23  ASL $23c1
  $8075: C1 80     CMP ($80,X)
  $8077: C0 80     CPY #$80
  $8079: C0 80     CPY #$80
  $807B: C0 80     CPY #$80
  $807D: C0 2C     CPY #$2c
  $807F: C1 AC     CMP ($ac,X)
  $8081: 33 00     RLA ($00),Y
  $8083: B1 31     LDA ($31),Y
  $8085: C8        INY
  $8086: 29 1F     AND #$1f
  $8088: AA        TAX
  $8089: BD 28 FD  LDA $fd28,X
  $808C: AA        TAX
  $808D: A5 92     LDA $92
  $808F: 24 36     BIT $36
  $8091: 50 02     BVC $8095
  $8093: 49 40     EOR #$40
  $8095: 29 40     AND #$40
  $8097: F0 07     BEQ $80a0
  $8099: 8A        TXA
  $809A: 49 FF     EOR #$ff
  $809C: 38        SEC
  $809D: E9 07     SBC #$07
  $809F: AA        TAX
  $80A0: 8A        TXA
  $80A1: 18        CLC
  $80A2: 65 38     ADC $38
  $80A4: 85 34     STA $34
  $80A6: B1 31     LDA ($31),Y
  $80A8: C8        INY
  $80A9: 29 3F     AND #$3f
  $80AB: 85 35     STA $35
  $80AD: B1 31     LDA ($31),Y
  $80AF: 29 1F     AND #$1f
  $80B1: AA        TAX
  $80B2: BD 48 FD  LDA $fd48,X
  $80B5: 24 92     BIT $92
  $80B7: 10 05     BPL $80be
  $80B9: 49 FF     EOR #$ff
  $80BB: 38        SEC
  $80BC: E9 07     SBC #$07
  $80BE: 18        CLC
  $80BF: 65 39     ADC $39
  $80C1: 48        PHA
  $80C2: A5 37     LDA $37
  $80C4: 0A        ASL A
  $80C5: 0A        ASL A
  $80C6: AA        TAX
  $80C7: 68        PLA
  $80C8: 9D 00 02  STA $0200,X
  $80CB: B1 31     LDA ($31),Y
  $80CD: 4A        LSR A
  $80CE: 45 92     EOR $92
  $80D0: 45 36     EOR $36
  $80D2: 29 C0     AND #$c0
  $80D4: 9D 02 02  STA $0202,X
  $80D7: B1 31     LDA ($31),Y
  $80D9: 29 60     AND #$60
  $80DB: 4A        LSR A
  $80DC: 4A        LSR A
  $80DD: 4A        LSR A
  $80DE: 4A        LSR A
  $80DF: 4A        LSR A
  $80E0: 1D 02 02  ORA $0202,X
  $80E3: 9D 02 02  STA $0202,X
  $80E6: A5 34     LDA $34
  $80E8: 9D 03 02  STA $0203,X
  $80EB: C8        INY
  $80EC: B1 31     LDA ($31),Y
  $80EE: 9D 01 02  STA $0201,X
  $80F1: C8        INY
  $80F2: E6 37     INC $37
  $80F4: 24 37     BIT $37
  $80F6: 50 04     BVC $80fc
  $80F8: A9 02     LDA #$02
  $80FA: 85 37     STA $37
  $80FC: C6 35     DEC $35
  $80FE: D0 AD     BNE $80ad
  $8100: 84 33     STY $33
  $8102: B1 31     LDA ($31),Y
  $8104: 29 E0     AND #$e0
  $8106: D0 03     BNE $810b
  $8108: 4C 80 C0  JMP $c080
  $810B: 4C 61 C0  JMP $c061
  $810E: A4 33     LDY $33
  $8110: C8        INY
  $8111: B1 31     LDA ($31),Y
  $8113: 48        PHA
  $8114: C8        INY
  $8115: B1 31     LDA ($31),Y
  $8117: 85 32     STA $32
  $8119: 68        PLA
  $811A: 85 31     STA $31
  $811C: A9 00     LDA #$00
  $811E: 85 33     STA $33
  $8120: 4C 61 C0  JMP $c061
  $8123: E6 33     INC $33
  $8125: A9 40     LDA #$40
  $8127: 85 36     STA $36
  $8129: 4C 61 C0  JMP $c061
  $812C: 60        RTS
  $812D: A5 75     LDA $75
  $812F: F0 4B     BEQ $817c
  $8131: 10 3C     BPL $816f
  $8133: A9 01     LDA #$01
  $8135: 85 75     STA $75
  $8137: A5 82     LDA $82
  $8139: C9 FF     CMP #$ff
  $813B: F0 0C     BEQ $8149
  $813D: 0A        ASL A
  $813E: AA        TAX
  $813F: BD 7D C1  LDA $c17d,X
  $8142: BC 7E C1  LDY $c17e,X
  $8145: AA        TAX
  $8146: 4C 60 C1  JMP $c160
  $8149: AD EC 05  LDA $05ec
  $814C: 85 00     STA $00
  $814E: AD ED 05  LDA $05ed
  $8151: 4A        LSR A
  $8152: 66 00     ROR $00
  $8154: 4A        LSR A
  $8155: 66 00     ROR $00
  $8157: 4A        LSR A
  $8158: 66 00     ROR $00
  $815A: A8        TAY
  $815B: A6 00     LDX $00
  $815D: 20 1A 80  JSR $801a
  $8160: 24 74     BIT $74
  $8162: 50 03     BVC $8167
  $8164: 20 1A 80  JSR $801a
  $8167: 86 76     STX $76
  $8169: 84 78     STY $78
  $816B: A9 00     LDA #$00
  $816D: 85 77     STA $77
  $816F: 18        CLC
  $8170: A5 76     LDA $76
  $8172: 65 77     ADC $77
  $8174: 85 77     STA $77
  $8176: A5 78     LDA $78
  $8178: 65 16     ADC $16
  $817A: 85 16     STA $16
  $817C: 60        RTS
  $817D: 80 FF     NOP #$ff
  $817F: 00        BRK
  $8180: FF 80 FE  ISB $fe80,X
  $8183: 00        BRK
  $8184: FE 80 FD  INC $fd80,X
  $8187: 80 00     NOP #$00
  $8189: 00        BRK
  $818A: 01 80     ORA ($80,X)
  $818C: 01 00     ORA ($00,X)
  $818E: 02        ???
  $818F: 80 02     NOP #$02
  $8191: AD E4 03  LDA $03e4
  $8194: 20 17 80  JSR $8017
  $8197: A7 C1     LAX $c1
  $8199: F6 C1     INC $c1,X
  $819B: 31 C2     AND ($c2),Y
  $819D: 3E C2 71  ROL $71c2,X
  $81A0: C2 92     NOP #$92
  $81A2: C2 45     NOP #$45
  $81A4: C3 8B     DCP ($8b,X)
  $81A6: C3 A9     DCP ($a9,X)
  $81A8: 10 20     BPL $81ca
  $81AA: 59 80 A2  EOR $a280,Y
  $81AD: 16 20     ASL $20,X
  $81AF: 7D 80 A2  ADC $a280,X
  $81B2: 00        BRK
  $81B3: 8E A6 06  STX $06a6
  $81B6: BD 0C 06  LDA $060c,X
  $81B9: 9D A8 05  STA $05a8,X
  $81BC: BD 01 06  LDA $0601,X
  $81BF: 9D AD 05  STA $05ad,X
  $81C2: E8        INX
  $81C3: E0 05     CPX #$05
  $81C5: D0 EF     BNE $81b6
  $81C7: A2 00     LDX #$00
  $81C9: 8A        TXA
  $81CA: 9D 00 06  STA $0600,X
  $81CD: E8        INX
  $81CE: E0 12     CPX #$12
  $81D0: D0 F8     BNE $81ca
  $81D2: 20 89 80  JSR $8089
  $81D5: 20 8C 80  JSR $808c
  $81D8: 20 14 80  JSR $8014
  $81DB: AD BB 05  LDA $05bb
  $81DE: 29 01     AND #$01
  $81E0: 8D E3 05  STA $05e3
  $81E3: A9 01     LDA #$01
  $81E5: 8D D3 05  STA $05d3
  $81E8: 8D DE 03  STA $03de
  $81EB: A9 00     LDA #$00
  $81ED: 8D E7 05  STA $05e7
  $81F0: A9 0D     LDA #$0d
  $81F2: 20 8F 80  JSR $808f
  $81F5: 60        RTS
  $81F6: AD A6 06  LDA $06a6
  $81F9: C9 14     CMP #$14
  $81FB: 90 04     BCC $8201
  $81FD: E9 14     SBC #$14
  $81FF: 10 F8     BPL $81f9
  $8201: 4A        LSR A
  $8202: AA        TAX
  $8203: AD E3 05  LDA $05e3
  $8206: 08        PHP
  $8207: F0 07     BEQ $8210
  $8209: BD A8 05  LDA $05a8,X
  $820C: 38        SEC
  $820D: E9 01     SBC #$01
  $820F: AA        TAX
  $8210: BD A8 05  LDA $05a8,X
  $8213: 28        PLP
  $8214: F0 03     BEQ $8219
  $8216: 18        CLC
  $8217: 69 0B     ADC #$0b
  $8219: 8D 9F 05  STA $059f
  $821C: A9 00     LDA #$00
  $821E: 8D A7 06  STA $06a7
  $8221: A9 01     LDA #$01
  $8223: 8D DE 03  STA $03de
  $8226: A9 A3     LDA #$a3
  $8228: 20 8F 80  JSR $808f
  $822B: A9 03     LDA #$03
  $822D: 20 92 80  JSR $8092
  $8230: 60        RTS
  $8231: AD E3 05  LDA $05e3
  $8234: 18        CLC
  $8235: 69 16     ADC #$16
  $8237: 20 92 80  JSR $8092
  $823A: EE E4 03  INC $03e4
  $823D: 60        RTS
  $823E: AD E6 03  LDA $03e6
  $8241: D0 1A     BNE $825d
  $8243: A9 83     LDA #$83
  $8245: 20 3E 80  JSR $803e
  $8248: 29 83     AND #$83
  $824A: F0 11     BEQ $825d
  $824C: 10 10     BPL $825e
  $824E: AD A7 06  LDA $06a7
  $8251: 10 0A     BPL $825d
  $8253: A9 00     LDA #$00
  $8255: 8D DE 03  STA $03de
  $8258: A9 0B     LDA #$0b
  $825A: 20 8F 80  JSR $808f
  $825D: 60        RTS
  $825E: 4A        LSR A
  $825F: A9 00     LDA #$00
  $8261: 2A        ROL A
  $8262: 09 80     ORA #$80
  $8264: 8D A7 06  STA $06a7
  $8267: 29 01     AND #$01
  $8269: 18        CLC
  $826A: 69 0C     ADC #$0c
  $826C: 38        SEC
  $826D: 20 83 80  JSR $8083
  $8270: 60        RTS
  $8271: AD BB 05  LDA $05bb
  $8274: 29 02     AND #$02
  $8276: AE E3 05  LDX $05e3
  $8279: F0 04     BEQ $827f
  $827B: 0E A7 06  ASL $06a7
  $827E: 4A        LSR A
  $827F: 0D A7 06  ORA $06a7
  $8282: 29 03     AND #$03
  $8284: 8D A7 06  STA $06a7
  $8287: A9 01     LDA #$01
  $8289: 8D DE 03  STA $03de
  $828C: A9 51     LDA #$51
  $828E: 20 8F 80  JSR $808f
  $8291: 60        RTS
  $8292: AD A7 06  LDA $06a7
  $8295: F0 15     BEQ $82ac
  $8297: C9 03     CMP #$03
  $8299: F0 11     BEQ $82ac
  $829B: A9 00     LDA #$00
  $829D: AE BB 05  LDX $05bb
  $82A0: E0 20     CPX #$20
  $82A2: B0 02     BCS $82a6
  $82A4: A9 04     LDA #$04
  $82A6: 8D 2F 06  STA $062f
  $82A9: 4C EC C2  JMP $c2ec
  $82AC: AD 9F 05  LDA $059f
  $82AF: A2 06     LDX #$06
  $82B1: 20 50 80  JSR $8050
  $82B4: A5 6E     LDA $6e
  $82B6: 85 4F     STA $4f
  $82B8: A9 00     LDA #$00
  $82BA: 85 50     STA $50
  $82BC: 85 52     STA $52
  $82BE: AD BB 05  LDA $05bb
  $82C1: 30 02     BMI $82c5
  $82C3: 09 80     ORA #$80
  $82C5: 85 51     STA $51
  $82C7: 20 44 80  JSR $8044
  $82CA: A5 53     LDA $53
  $82CC: 46 55     LSR $55
  $82CE: 66 54     ROR $54
  $82D0: 6A        ROR A
  $82D1: 46 55     LSR $55
  $82D3: 66 54     ROR $54
  $82D5: 6A        ROR A
  $82D6: 8D EC 05  STA $05ec
  $82D9: A5 54     LDA $54
  $82DB: 8D ED 05  STA $05ed
  $82DE: 20 95 80  JSR $8095
  $82E1: A2 01     LDX #$01
  $82E3: 20 50 80  JSR $8050
  $82E6: A5 6E     LDA $6e
  $82E8: 38        SEC
  $82E9: 20 86 80  JSR $8086
  $82EC: 20 95 80  JSR $8095
  $82EF: 20 47 80  JSR $8047
  $82F2: A0 03     LDY #$03
  $82F4: B1 5D     LDA ($5d),Y
  $82F6: C9 16     CMP #$16
  $82F8: 08        PHP
  $82F9: AD A7 06  LDA $06a7
  $82FC: 0A        ASL A
  $82FD: 0A        ASL A
  $82FE: 6D A7 06  ADC $06a7
  $8301: 6D 2F 06  ADC $062f
  $8304: AA        TAX
  $8305: BD 1D C3  LDA $c31d,X
  $8308: 28        PLP
  $8309: D0 03     BNE $830e
  $830B: BD 31 C3  LDA $c331,X
  $830E: 20 8F 80  JSR $808f
  $8311: AD 2F 06  LDA $062f
  $8314: D0 06     BNE $831c
  $8316: AE E3 05  LDX $05e3
  $8319: FE 9B 05  INC $059b,X
  $831C: 60        RTS
  $831D: 44 9D     NOP $9d
  $831F: A4 A4     LDY $a4
  $8321: 48        PHA
  $8322: 47 47     SRE $47
  $8324: 47 47     SRE $47
  $8326: 4B 46     ALR #$46
  $8328: 46 46     LSR $46
  $832A: 46 4A     LSR $4a
  $832C: 45 9E     EOR $9e
  $832E: A5 A5     LDA $a5
  $8330: 49 AA     EOR #$aa
  $8332: AC AE AE  LDY $aeae
  $8335: B0 47     BCS $837e
  $8337: 47 47     SRE $47
  $8339: 47 4B     SRE $4b
  $833B: 46 46     LSR $46
  $833D: 46 46     LSR $46
  $833F: 4A        LSR A
  $8340: AB AD     ATX #$ad
  $8342: AF AF B1  LAX $b1af
  $8345: A9 03     LDA #$03
  $8347: 20 92 80  JSR $8092
  $834A: AD A6 06  LDA $06a6
  $834D: EE A6 06  INC $06a6
  $8350: 4A        LSR A
  $8351: 08        PHP
  $8352: 85 00     STA $00
  $8354: 38        SEC
  $8355: A9 03     LDA #$03
  $8357: E5 00     SBC $00
  $8359: AA        TAX
  $835A: B0 02     BCS $835e
  $835C: A2 FF     LDX #$ff
  $835E: E8        INX
  $835F: E8        INX
  $8360: 28        PLP
  $8361: B0 01     BCS $8364
  $8363: E8        INX
  $8364: 86 00     STX $00
  $8366: AD 9B 05  LDA $059b
  $8369: 38        SEC
  $836A: ED 9C 05  SBC $059c
  $836D: B0 04     BCS $8373
  $836F: 49 FF     EOR #$ff
  $8371: 69 01     ADC #$01
  $8373: C5 00     CMP $00
  $8375: 90 06     BCC $837d
  $8377: A9 A1     LDA #$a1
  $8379: 20 8F 80  JSR $808f
  $837C: 60        RTS
  $837D: A9 01     LDA #$01
  $837F: 8D E4 03  STA $03e4
  $8382: AD E3 05  LDA $05e3
  $8385: 49 01     EOR #$01
  $8387: 8D E3 05  STA $05e3
  $838A: 60        RTS
  $838B: EE CA 03  INC $03ca
  $838E: 60        RTS
  $838F: A9 00     LDA #$00
  $8391: 8D DD 03  STA $03dd
  $8394: 18        CLC
  $8395: 20 A3 C3  JSR $c3a3
  $8398: 38        SEC
  $8399: 20 A3 C3  JSR $c3a3
  $839C: 4E DD 03  LSR $03dd
  $839F: 4E DD 03  LSR $03dd
  $83A2: 60        RTS
  $83A3: A9 00     LDA #$00
  $83A5: AA        TAX
  $83A6: 90 04     BCC $83ac
  $83A8: A2 0E     LDX #$0e
  $83AA: A9 0B     LDA #$0b
  $83AC: 85 00     STA $00
  $83AE: BD EE C3  LDA $c3ee,X
  $83B1: D0 01     BNE $83b4
  $83B3: 60        RTS
  $83B4: 86 01     STX $01
  $83B6: 20 C6 C3  JSR $c3c6
  $83B9: 6E DD 03  ROR $03dd
  $83BC: A6 01     LDX $01
  $83BE: 8A        TXA
  $83BF: 38        SEC
  $83C0: 7D EE C3  ADC $c3ee,X
  $83C3: AA        TAX
  $83C4: D0 E8     BNE $83ae
  $83C6: 85 02     STA $02
  $83C8: A9 00     LDA #$00
  $83CA: 85 03     STA $03
  $83CC: E8        INX
  $83CD: A5 03     LDA $03
  $83CF: 18        CLC
  $83D0: 65 00     ADC $00
  $83D2: 20 47 80  JSR $8047
  $83D5: A0 03     LDY #$03
  $83D7: B1 5D     LDA ($5d),Y
  $83D9: DD EE C3  CMP $c3ee,X
  $83DC: F0 0A     BEQ $83e8
  $83DE: E6 03     INC $03
  $83E0: A5 03     LDA $03
  $83E2: C9 0B     CMP #$0b
  $83E4: D0 E7     BNE $83cd
  $83E6: 18        CLC
  $83E7: 60        RTS
  $83E8: C6 02     DEC $02
  $83EA: D0 DC     BNE $83c8
  $83EC: 38        SEC
  $83ED: 60        RTS
  $83EE: 02        ???
  $83EF: 01 18     ORA ($18,X)
  $83F1: 02        ???
  $83F2: 01 14     ORA ($14,X)
  $83F4: 02        ???
  $83F5: 0F 10 03  SLO $0310
  $83F8: 0F 10 11  SLO $1110
  $83FB: 00        BRK
  $83FC: 02        ???
  $83FD: 20 21 02  JSR $0221
  $8400: 0F 10 00  SLO $0010
  $8403: AD 9F 05  LDA $059f
  $8406: 20 47 80  JSR $8047
  $8409: A9 00     LDA #$00
  $840B: 8D 9D 06  STA $069d
  $840E: AD 9C 06  LDA $069c
  $8411: 20 81 C4  JSR $c481
  $8414: A0 03     LDY #$03
  $8416: B1 5D     LDA ($5d),Y
  $8418: 0A        ASL A
  $8419: AA        TAX
  $841A: BD 68 FD  LDA $fd68,X
  $841D: 85 00     STA $00
  $841F: BD 69 FD  LDA $fd69,X
  $8422: 85 01     STA $01
  $8424: A0 00     LDY #$00
  $8426: B1 00     LDA ($00),Y
  $8428: F0 11     BEQ $843b
  $842A: 85 02     STA $02
  $842C: 84 03     STY $03
  $842E: E6 03     INC $03
  $8430: A4 03     LDY $03
  $8432: B1 00     LDA ($00),Y
  $8434: 20 3C C4  JSR $c43c
  $8437: C6 02     DEC $02
  $8439: D0 F3     BNE $842e
  $843B: 60        RTS
  $843C: 85 04     STA $04
  $843E: 38        SEC
  $843F: E9 03     SBC #$03
  $8441: 85 05     STA $05
  $8443: 0A        ASL A
  $8444: 65 05     ADC $05
  $8446: AA        TAX
  $8447: BD EF FD  LDA $fdef,X
  $844A: CD 9C 06  CMP $069c
  $844D: F0 0A     BEQ $8459
  $844F: C9 03     CMP #$03
  $8451: D0 05     BNE $8458
  $8453: AD 9C 06  LDA $069c
  $8456: D0 01     BNE $8459
  $8458: 60        RTS
  $8459: A5 04     LDA $04
  $845B: 38        SEC
  $845C: E9 03     SBC #$03
  $845E: 20 17 80  JSR $8017
  $8461: 8B C4     XAA #$c4
  $8463: 8B C4     XAA #$c4
  $8465: 90 C4     BCC $842b
  $8467: 8B C4     XAA #$c4
  $8469: 8B C4     XAA #$c4
  $846B: 8B C4     XAA #$c4
  $846D: 8B C4     XAA #$c4
  $846F: A4 C4     LDY $c4
  $8471: 8B C4     XAA #$c4
  $8473: 8B C4     XAA #$c4
  $8475: 8B C4     XAA #$c4
  $8477: AF C4 C7  LAX $c7c4
  $847A: C4 D9     CPY $d9
  $847C: C4 E4     CPY $e4
  $847E: C4 BA     CPY $ba
  $8480: C4 AE     CPY $ae
  $8482: 9D 06 9D  STA $9d06,X
  $8485: 9E 06 EE  SHX $ee06,Y
  $8488: 9D 06 60  STA $6006,X
  $848B: A5 04     LDA $04
  $848D: 4C 81 C4  JMP $c481
  $8490: A0 03     LDY #$03
  $8492: B1 5D     LDA ($5d),Y
  $8494: C9 01     CMP #$01
  $8496: D0 09     BNE $84a1
  $8498: A0 0E     LDY #$0e
  $849A: B1 5D     LDA ($5d),Y
  $849C: C9 02     CMP #$02
  $849E: B0 01     BCS $84a1
  $84A0: 60        RTS
  $84A1: 4C 8B C4  JMP $c48b
  $84A4: AD 53 06  LDA $0653
  $84A7: C9 01     CMP #$01
  $84A9: D0 03     BNE $84ae
  $84AB: 4C 8B C4  JMP $c48b
  $84AE: 60        RTS
  $84AF: AD DD 03  LDA $03dd
  $84B2: 29 04     AND #$04
  $84B4: F0 03     BEQ $84b9
  $84B6: 4C 8B C4  JMP $c48b
  $84B9: 60        RTS
  $84BA: AD DD 03  LDA $03dd
  $84BD: 29 01     AND #$01
  $84BF: F0 05     BEQ $84c6
  $84C1: A9 0E     LDA #$0e
  $84C3: 4C 81 C4  JMP $c481
  $84C6: 60        RTS
  $84C7: AD DD 03  LDA $03dd
  $84CA: 29 08     AND #$08
  $84CC: D0 0A     BNE $84d8
  $84CE: AD DD 03  LDA $03dd
  $84D1: 29 24     AND #$24
  $84D3: F0 03     BEQ $84d8
  $84D5: 4C 8B C4  JMP $c48b
  $84D8: 60        RTS
  $84D9: AD DD 03  LDA $03dd
  $84DC: 29 08     AND #$08
  $84DE: F0 03     BEQ $84e3
  $84E0: 4C 8B C4  JMP $c48b
  $84E3: 60        RTS
  $84E4: AD 35 07  LDA $0735
  $84E7: 10 03     BPL $84ec
  $84E9: 4C 8B C4  JMP $c48b
  $84EC: 60        RTS
  $84ED: 3B C6 04  RLA $04c6,Y
  $84F0: C8        INY
  $84F1: 93 C9     ??? ($c9),Y
  $84F3: 0A        ASL A
  $84F4: CB A9     AXS #$a9
  $84F6: CC 86 CE  CPY $ce86
  $84F9: AC CF 6D  LDY $6dcf
  $84FC: D0 81     BNE $847f
  $84FE: D0 95     BNE $8495
  $8500: D0 A3     BNE $84a5
  $8502: D0 6C     BNE $8570
  $8504: D2        ???
  $8505: 19 D4 35  ORA $35d4,Y
  $8508: D4 55     NOP $55,X
  $850A: D4 69     NOP $69,X
  $850C: D4 79     NOP $79,X
  $850E: D4 7F     NOP $7f,X
  $8510: D4 85     NOP $85,X
  $8512: D4 8B     NOP $8b,X
  $8514: D4 99     NOP $99,X
  $8516: D4 A7     NOP $a7,X
  $8518: D4 B5     NOP $b5,X
  $851A: D4 C3     NOP $c3,X
  $851C: D4 D7     NOP $d7,X
  $851E: D4 EB     NOP $eb,X
  $8520: D4 0B     NOP $0b,X
  $8522: D5 31     CMP $31,X
  $8524: D5 65     CMP $65,X
  $8526: D5 A9     CMP $a9,X
  $8528: D5 47     CMP $47,X
  $852A: D7 F5     DCP $f5,X
  $852C: D8        CLD
  $852D: 08        PHP
  $852E: D9 1B D9  CMP $d91b,Y
  $8531: 2D D9 32  AND $32d9
  $8534: D9 44 D9  CMP $d944,Y
  $8537: 49 D9     EOR #$d9
  $8539: 63 D9     RRA ($d9,X)
  $853B: 79 D9 93  ADC $93d9,Y
  $853E: D9 AD D9  CMP $d9ad,Y
  $8541: F3 DA     ISB ($da),Y
  $8543: 61 DB     ADC ($db,X)
  $8545: B7 DB     LAX $db,Y
  $8547: 66 DC     ROR $dc
  $8549: AE DC D6  LDX $d6dc
  $854C: DC 32 DD  NOP $dd32,X
  $854F: B0 DD     BCS $852e
  $8551: 23 DF     RLA ($df,X)
  $8553: DC E0 46  NOP $46e0,X
  $8556: E1 D6     SBC ($d6,X)
  $8558: E1 12     SBC ($12,X)
  $855A: E2 43     NOP #$43
  $855C: FC 62 E2  NOP $e262,X
  $855F: 64 E3     NOP $e3
  $8561: 60        RTS
  $8562: E5 45     SBC $45
  $8564: E7 53     ISB $53
  $8566: E7 6B     ISB $6b
  $8568: E7 00     ISB $00
  $856A: E8        INX
  $856B: C7 E8     DCP $e8
  $856D: F1 E8     SBC ($e8),Y
  $856F: F3 E8     ISB ($e8),Y
  $8571: 0D E9 1B  ORA $1be9
  $8574: E9 5C     SBC #$5c
  $8576: E9 6A     SBC #$6a
  $8578: E9 CF     SBC #$cf
  $857A: E9 E9     SBC #$e9
  $857C: E9 09     SBC #$09
  $857E: EA        NOP
  $857F: 87 EA     SAX $ea
  $8581: D1 EB     CMP ($eb),Y
  $8583: ED EB 09  SBC $09eb
  $8586: EC 2E EC  CPX $ec2e
  $8589: 3C EC 76  NOP $76ec,X
  $858C: EC 23 EE  CPX $ee23
  $858F: 3D EE 5F  AND $5fee,X
  $8592: EE 83 EE  INC $ee83
  $8595: A7 EE     LAX $ee
  $8597: CF EE F7  DCP $f7ee
  $859A: EE 11 EF  INC $ef11
  $859D: 2B EF     ANC #$ef
  $859F: 39 EF 4F  AND $4fef,Y
  $85A2: EF 65 EF  ISB $ef65
  $85A5: 81 EF     STA ($ef,X)
  $85A7: 8F EF AF  SAX $afef
  $85AA: EF BB EF  ISB $efbb
  $85AD: 87 F1     SAX $f1
  $85AF: EA        NOP
  $85B0: F1 FE     SBC ($fe),Y
  $85B2: F1 10     SBC ($10),Y
  $85B4: F2        ???
  $85B5: 46 F2     LSR $f2
  $85B7: 58        CLI
  $85B8: F2        ???
  $85B9: 8A        TXA
  $85BA: F2        ???
  $85BB: 44 FC     NOP $fc
  $85BD: AE FC 98  LDX $98fc
  $85C0: F2        ???
  $85C1: D8        CLD
  $85C2: F2        ???
  $85C3: 40        RTI
  $85C4: F3 58     ISB ($58),Y
  $85C6: F3 2C     ISB ($2c),Y
  $85C8: F4 8C     NOP $8c,X
  $85CA: F4 D9     NOP $d9,X
  $85CC: F4 FE     NOP $fe,X
  $85CE: F4 27     NOP $27,X
  $85D0: F5 62     SBC $62,X
  $85D2: F5 8D     SBC $8d,X
  $85D4: F5 FE     SBC $fe,X
  $85D6: F5 0C     SBC $0c,X
  $85D8: F6 1A     INC $1a,X
  $85DA: F6 94     INC $94,X
  $85DC: F6 9A     INC $9a,X
  $85DE: F6 A0     INC $a0,X
  $85E0: F6 EE     INC $ee,X
  $85E2: F6 F8     INC $f8,X
  $85E4: F6 02     INC $02,X
  $85E6: F7 40     ISB $40,X
  $85E8: F7 46     ISB $46,X
  $85EA: F7 4C     ISB $4c,X
  $85EC: F7 92     ISB $92,X
  $85EE: F7 D4     ISB $d4,X
  $85F0: F7 DA     ISB $da,X
  $85F2: F7 E0     ISB $e0,X
  $85F4: F7 1E     ISB $1e,X
  $85F6: F8        SED
  $85F7: 24 F8     BIT $f8
  $85F9: 2E F8 7A  ROL $7af8
  $85FC: F8        SED
  $85FD: 82 F8     NOP #$f8
  $85FF: 88        DEY
  $8600: F8        SED
  $8601: CC F8 EA  CPY $eaf8
  $8604: F8        SED
  $8605: F0 F8     BEQ $85ff
  $8607: F6 F8     INC $f8,X
  $8609: 2E F9 36  ROL $36f9
  $860C: F9 96 F9  SBC $f996,Y
  $860F: A0 F9     LDY #$f9
  $8611: AA        TAX
  $8612: F9 F4 F9  SBC $f9f4,Y
  $8615: FA        NOP
  $8616: F9 46 FA  SBC $fa46,Y
  $8619: 4E FA 56  LSR $56fa
  $861C: FA        NOP
  $861D: A0 FA     LDY #$fa
  $861F: A6 FA     LDX $fa
  $8621: AC FA F2  LDY $f2fa
  $8624: FA        NOP
  $8625: F8        SED
  $8626: FA        NOP
  $8627: FE FA 2A  INC $2afa,X
  $862A: FB 7E FB  ISB $fb7e,Y
  $862D: 84 FB     STY $fb
  $862F: 8A        TXA
  $8630: FB DC FB  ISB $fbdc,Y
  $8633: E2 FB     NOP #$fb
  $8635: E8        INX
  $8636: FB 38 FC  ISB $fc38,Y
  $8639: 3E FC 08  ROL $08fc,X
  $863C: 4E C6 73  LSR $73c6
  $863F: C6 9A     DEC $9a
  $8641: C6 BD     DEC $bd
  $8643: C6 E2     DEC $e2
  $8645: C6 03     DEC $03
  $8647: C7 2A     DCP $2a
  $8649: C7 4F     DCP $4f
  $864B: C7 76     DCP $76
  $864D: C7 01     DCP $01
  $864F: 01 01     ORA ($01,X)
  $8651: 16 02     ASL $02,X
  $8653: 05 00     ORA $00
  $8655: 15 01     ORA $01,X
  $8657: 17 22     SLO $22,X
  $8659: 1D 62 41  ORA $4162,X
  $865C: 23 04     RLA ($04,X)
  $865E: 03 05     SLO ($05,X)
  $8660: 00        BRK
  $8661: 40        RTI
  $8662: 01 42     ORA ($42,X)
  $8664: 02        ???
  $8665: 48        PHA
  $8666: 22        ???
  $8667: 14 62     NOP $62,X
  $8669: 1C 04 02  NOP $0204,X
  $866C: 01 43     ORA ($43,X)
  $866E: 22        ???
  $866F: 49 20     EOR #$20
  $8671: 94 C7     STY $c7,X
  $8673: 01 02     ORA ($02,X)
  $8675: 01 34     ORA ($34,X)
  $8677: 02        ???
  $8678: 36 02     ROL $02,X
  $867A: 06 00     ASL $00
  $867C: 1F 01 35  SLO $3501,X
  $867F: 02        ???
  $8680: 37 22     RLA $22,X
  $8682: 3C 62 68  NOP $6862,X
  $8685: 23 04     RLA ($04,X)
  $8687: 03 05     SLO ($05,X)
  $8689: 00        BRK
  $868A: 4A        LSR A
  $868B: 01 60     ORA ($60,X)
  $868D: 02        ???
  $868E: 62        ???
  $868F: 22        ???
  $8690: 3D 62 69  AND $6962,X
  $8693: 04 01     NOP $01
  $8695: 22        ???
  $8696: 63 20     RRA ($20,X)
  $8698: 94 C7     STY $c7,X
  $869A: 01 01     ORA ($01,X)
  $869C: 01 46     ORA ($46,X)
  $869E: 02        ???
  $869F: 05 00     ORA $00
  $86A1: 45 01     EOR $01
  $86A3: 47 22     SRE $22
  $86A5: 4D 62 4B  EOR $4b62
  $86A8: 23 04     RLA ($04,X)
  $86AA: 03 05     SLO ($05,X)
  $86AC: 00        BRK
  $86AD: 50 01     BVC $86b0
  $86AF: 52        ???
  $86B0: 02        ???
  $86B1: 58        CLI
  $86B2: 22        ???
  $86B3: 4E 62 4C  LSR $4c62
  $86B6: 04 01     NOP $01
  $86B8: 22        ???
  $86B9: 44 20     NOP $20
  $86BB: 94 C7     STY $c7,X
  $86BD: 01 01     ORA ($01,X)
  $86BF: 01 16     ORA ($16,X)
  $86C1: 02        ???
  $86C2: 05 00     ORA $00
  $86C4: 15 01     ORA $01,X
  $86C6: 51 22     EOR ($22),Y
  $86C8: 53 62     SRE ($62),Y
  $86CA: 55 23     EOR $23,X
  $86CC: 59 03 05  EOR $0503,Y
  $86CF: 00        BRK
  $86D0: 40        RTI
  $86D1: 01 54     ORA ($54,X)
  $86D3: 02        ???
  $86D4: 56 22     LSR $22,X
  $86D6: 57 62     SRE $62,X
  $86D8: 5D 04 02  EOR $0204,X
  $86DB: 01 43     ORA ($43,X)
  $86DD: 22        ???
  $86DE: 49 20     EOR #$20
  $86E0: 94 C7     STY $c7,X
  $86E2: 01 01     ORA ($01,X)
  $86E4: 01 64     ORA ($64,X)
  $86E6: 02        ???
  $86E7: 05 00     ORA $00
  $86E9: 4F 01 65  SRE $6501
  $86EC: 22        ???
  $86ED: 67 62     RRA $62
  $86EF: 61 23     ADC ($23,X)
  $86F1: 04 03     NOP $03
  $86F3: 04 00     NOP $00
  $86F5: 5A        NOP
  $86F6: 01 70     ORA ($70,X)
  $86F8: 22        ???
  $86F9: 72        ???
  $86FA: 62        ???
  $86FB: 66 04     ROR $04
  $86FD: 01 22     ORA ($22,X)
  $86FF: 44 20     NOP $20
  $8701: 94 C7     STY $c7,X
  $8703: 01 01     ORA ($01,X)
  $8705: 01 71     ORA ($71,X)
  $8707: 02        ???
  $8708: 06 00     ASL $00
  $870A: 5E 01 74  LSR $7401,X
  $870D: 61 7C     ADC ($7c,X)
  $870F: 22        ???
  $8710: 76 62     ROR $62,X
  $8712: 7E 23 04  ROR $0423,X
  $8715: 03 06     SLO ($06,X)
  $8717: 00        BRK
  $8718: 5F 01 75  SRE $7501,X
  $871B: 61 7D     ADC ($7d,X)
  $871D: 02        ???
  $871E: 77 22     RRA $22,X
  $8720: 7F 62 73  RRA $7362,X
  $8723: 04 01     NOP $01
  $8725: 22        ???
  $8726: 44 20     NOP $20
  $8728: 94 C7     STY $c7,X
  $872A: 01 01     ORA ($01,X)
  $872C: 01 2E     ORA ($2e,X)
  $872E: 02        ???
  $872F: 06 00     ASL $00
  $8731: 2A        ROL A
  $8732: 01 80     ORA ($80,X)
  $8734: 61 84     ADC ($84,X)
  $8736: 22        ???
  $8737: 82 62     NOP #$62
  $8739: 86 23     STX $23
  $873B: 04 03     NOP $03
  $873D: 05 00     ORA $00
  $873F: 2B 01     ANC #$01
  $8741: 81 61     STA ($61,X)
  $8743: 85 22     STA $22
  $8745: 83 62     SAX ($62,X)
  $8747: 87 04     SAX $04
  $8749: 01 22     ORA ($22,X)
  $874B: 44 20     NOP $20
  $874D: 94 C7     STY $c7,X
  $874F: 01 01     ORA ($01,X)
  $8751: 01 89     ORA ($89,X)
  $8753: 02        ???
  $8754: 06 00     ASL $00
  $8756: 88        DEY
  $8757: 01 8A     ORA ($8a,X)
  $8759: 61 A6     ADC ($a6,X)
  $875B: 22        ???
  $875C: A0 62     LDY #$62
  $875E: AC 23 04  LDY $0423
  $8761: 03 05     SLO ($05,X)
  $8763: 00        BRK
  $8764: 40        RTI
  $8765: 01 8B     ORA ($8b,X)
  $8767: 02        ???
  $8768: A1 22     LDA ($22,X)
  $876A: AE 62 AA  LDX $aa62
  $876D: 04 02     NOP $02
  $876F: 01 8E     ORA ($8e,X)
  $8771: 22        ???
  $8772: A4 20     LDY $20
  $8774: A3 C7     LAX ($c7,X)
  $8776: 01 01     ORA ($01,X)
  $8778: 01 6D     ORA ($6d,X)
  $877A: 02        ???
  $877B: 05 00     ORA $00
  $877D: 6E 01 78  ROR $7801
  $8780: 22        ???
  $8781: 7A        NOP
  $8782: 62        ???
  $8783: 6A        ROR A
  $8784: 23 04     RLA ($04,X)
  $8786: 03 04     SLO ($04,X)
  $8788: 00        BRK
  $8789: 6F 01 79  RRA $7901
  $878C: 22        ???
  $878D: 7B 62 6B  RRA $6b62,Y
  $8790: 04 01     NOP $01
  $8792: 22        ???
  $8793: 44 04     NOP $04
  $8795: 02        ???
  $8796: 23 10     RLA ($10,X)
  $8798: 24 12     BIT $12
  $879A: 05 02     ORA $02
  $879C: 23 11     RLA ($11,X)
  $879E: 64 13     NOP $13
  $87A0: 20 B1 C7  JSR $c7b1
  $87A3: 04 03     NOP $03
  $87A5: 23 A2     RLA ($a2,X)
  $87A7: 63 AB     RRA ($ab,X)
  $87A9: 64 A8     NOP $a8
  $87AB: 05 02     ORA $02
  $87AD: 63 A3     RRA ($a3,X)
  $87AF: 64 A9     NOP $a9
  $87B1: 00        BRK
  $87B2: 04 64     NOP $64
  $87B4: 02        ???
  $87B5: 27 20     RLA $20
  $87B7: 28        PLP
  $87B8: 22        ???
  $87B9: 69 28     ADC #$28
  $87BB: 01 07     ORA ($07,X)
  $87BD: 23 01     RLA ($01,X)
  $87BF: 64 03     NOP $03
  $87C1: 45 09     EOR $09
  $87C3: 66 0B     ROR $0b
  $87C5: 27 21     RLA $21
  $87C7: 28        PLP
  $87C8: 23 29     RLA ($29,X)
  $87CA: 29 02     AND #$02
  $87CC: 05 24     ORA $24
  $87CE: 06 25     ASL $25
  $87D0: 0C 45 26  NOP $2645
  $87D3: 46 0E     LSR $0e
  $87D5: 67 24     RRA $24
  $87D7: 03 05     SLO ($05,X)
  $87D9: 23 05     RLA ($05,X)
  $87DB: 24 07     BIT $07
  $87DD: 25 0D     AND $0d
  $87DF: 45 2C     EOR $2c
  $87E1: 46 0F     LSR $0f
  $87E3: 04 04     NOP $04
  $87E5: 45 18     EOR $18
  $87E7: 66 1A     ROR $1a
  $87E9: 67 30     RRA $30
  $87EB: 28        PLP
  $87EC: 32        ???
  $87ED: 05 05     ORA $05
  $87EF: 65 19     ADC $19
  $87F1: 66 1B     ROR $1b
  $87F3: 27 31     RLA $31
  $87F5: 28        PLP
  $87F6: 33 29     RLA ($29),Y
  $87F8: 39 06 04  AND $0406,Y
  $87FB: 66 0A     ROR $0a
  $87FD: 28        PLP
  $87FE: 25 29     AND $29
  $8800: 27 6A     RLA $6a
  $8802: 2D E0 11  AND $11e0
  $8805: 17 C8     SLO $c8,X
  $8807: 34 C8     NOP $c8,X
  $8809: 55 C8     EOR $c8,X
  $880B: 72        ???
  $880C: C8        INY
  $880D: 8F C8 A6  SAX $a6c8
  $8810: C8        INY
  $8811: C3 C8     DCP ($c8,X)
  $8813: E0 C8     CPX #$c8
  $8815: FD C8 03  SBC $03c8,X
  $8818: 03 00     SLO ($00,X)
  $881A: 15 01     ORA $01,X
  $881C: 17 21     SLO $21,X
  $881E: 44 04     NOP $04
  $8820: 04 00     NOP $00
  $8822: 40        RTI
  $8823: 01 42     ORA ($42,X)
  $8825: 22        ???
  $8826: 46 62     LSR $62
  $8828: 47 05     SRE $05
  $882A: 03 00     SLO ($00,X)
  $882C: 41 01     EOR ($01,X)
  $882E: 43 02     SRE ($02,X)
  $8830: 45 20     EOR $20
  $8832: 15 C9     ORA $c9,X
  $8834: 02        ???
  $8835: 01 00     ORA ($00,X)
  $8837: 1C 03 03  NOP $0303,X
  $883A: 00        BRK
  $883B: 1D 01 6D  ORA $6d01,X
  $883E: 21 78     AND ($78,X)
  $8840: 04 04     NOP $04
  $8842: 00        BRK
  $8843: 48        PHA
  $8844: 01 4A     ORA ($4a,X)
  $8846: 22        ???
  $8847: 63 62     RRA ($62,X)
  $8849: 69 05     ADC #$05
  $884B: 03 00     SLO ($00,X)
  $884D: 49 01     EOR #$01
  $884F: 4B 02     ALR #$02
  $8851: 61 20     ADC ($20,X)
  $8853: 15 C9     ORA $c9,X
  $8855: 03 03     SLO ($03,X)
  $8857: 00        BRK
  $8858: 1E 01 6F  ASL $6f01,X
  $885B: 21 7A     AND ($7a,X)
  $885D: 04 04     NOP $04
  $885F: 00        BRK
  $8860: 1F 01 34  SLO $3401,X
  $8863: 22        ???
  $8864: 6B 62     ARR #$62
  $8866: 6E 05 03  ROR $0305
  $8869: 00        BRK
  $886A: 60        RTS
  $886B: 01 35     ORA ($35,X)
  $886D: 02        ???
  $886E: 62        ???
  $886F: 20 15 C9  JSR $c915
  $8872: 03 03     SLO ($03,X)
  $8874: 00        BRK
  $8875: 15 01     ORA $01,X
  $8877: 79 21 7C  ADC $7c21,Y
  $887A: 04 04     NOP $04
  $887C: 00        BRK
  $887D: 40        RTI
  $887E: 01 3C     ORA ($3c,X)
  $8880: 22        ???
  $8881: 3E 62 68  ROL $6862,X
  $8884: 05 03     ORA $03
  $8886: 00        BRK
  $8887: 41 01     EOR ($01,X)
  $8889: 43 02     SRE ($02,X)
  $888B: 3F 20 15  RLA $1520,X
  $888E: C9 03     CMP #$03
  $8890: 01 21     ORA ($21,X)
  $8892: 50 04     BVC $8898
  $8894: 04 00     NOP $00
  $8896: 55 01     EOR $01,X
  $8898: 51 22     EOR ($22),Y
  $889A: 53 62     SRE ($62),Y
  $889C: 52        ???
  $889D: 05 02     ORA $02
  $889F: 01 54     ORA ($54,X)
  $88A1: 02        ???
  $88A2: 56 20     LSR $20,X
  $88A4: 15 C9     ORA $c9,X
  $88A6: 03 03     SLO ($03,X)
  $88A8: 00        BRK
  $88A9: 7F 01 7B  RRA $7b01,X
  $88AC: 21 7E     AND ($7e,X)
  $88AE: 04 04     NOP $04
  $88B0: 00        BRK
  $88B1: 4C 01 42  JMP $4201
  $88B4: 22        ???
  $88B5: 46 62     LSR $62
  $88B7: 47 05     SRE $05
  $88B9: 03 00     SLO ($00,X)
  $88BB: 4D 01 4F  EOR $4f01
  $88BE: 02        ???
  $88BF: 65 20     ADC $20
  $88C1: 15 C9     ORA $c9,X
  $88C3: 03 03     SLO ($03,X)
  $88C5: 00        BRK
  $88C6: 81 01     STA ($01,X)
  $88C8: 82 21     NOP #$21
  $88CA: 88        DEY
  $88CB: 04 04     NOP $04
  $88CD: 00        BRK
  $88CE: 83 01     SAX ($01,X)
  $88D0: 59 22 58  EOR $5822,Y
  $88D3: 62        ???
  $88D4: 5A        NOP
  $88D5: 05 03     ORA $03
  $88D7: 00        BRK
  $88D8: 57 01     SRE $01,X
  $88DA: 5D 02 5C  EOR $5c02,X
  $88DD: 20 15 C9  JSR $c915
  $88E0: 03 03     SLO ($03,X)
  $88E2: 00        BRK
  $88E3: 5B 01 8A  SRE $8a01,Y
  $88E6: 21 8B     AND ($8b,X)
  $88E8: 04 04     NOP $04
  $88EA: 00        BRK
  $88EB: 40        RTI
  $88EC: 01 74     ORA ($74,X)
  $88EE: 22        ???
  $88EF: 70 62     BVS $8953
  $88F1: 67 05     RRA $05
  $88F3: 03 00     SLO ($00,X)
  $88F5: 41 01     EOR ($01,X)
  $88F7: 75 02     ADC $02,X
  $88F9: 45 20     EOR $20
  $88FB: 2C C9 03  BIT $03c9
  $88FE: 02        ???
  $88FF: 01 6A     ORA ($6a,X)
  $8901: 21 6C     AND ($6c,X)
  $8903: 04 04     NOP $04
  $8905: 00        BRK
  $8906: 0A        ASL A
  $8907: 01 80     ORA ($80,X)
  $8909: 22        ???
  $890A: 2A        ROL A
  $890B: 62        ???
  $890C: 2B 05     ANC #$05
  $890E: 03 00     SLO ($00,X)
  $8910: 20 01 22  JSR $2201
  $8913: 02        ???
  $8914: 28        PLP
  $8915: 00        BRK
  $8916: 01 21     ORA ($21,X)
  $8918: 02        ???
  $8919: 01 02     ORA ($02,X)
  $891B: 21 03     AND ($03,X)
  $891D: 61 07     ADC ($07,X)
  $891F: 02        ???
  $8920: 01 21     ORA ($21,X)
  $8922: 06 04     ASL $04
  $8924: 02        ???
  $8925: 23 1A     RLA ($1a,X)
  $8927: 24 30     BIT $30
  $8929: 20 3E C9  JSR $c93e
  $892C: 00        BRK
  $892D: 01 61     ORA ($61,X)
  $892F: 72        ???
  $8930: 01 01     ORA ($01,X)
  $8932: 61 73     ADC ($73,X)
  $8934: 02        ???
  $8935: 01 21     ORA ($21,X)
  $8937: 76 04     ROR $04,X
  $8939: 02        ???
  $893A: 23 77     RLA ($77,X)
  $893C: 24 7D     BIT $7d
  $893E: 00        BRK
  $893F: 01 22     ORA ($22,X)
  $8941: 08        PHP
  $8942: 01 05     ORA ($05,X)
  $8944: 22        ???
  $8945: 09 43     ORA #$43
  $8947: 0B 44     ANC #$44
  $8949: 21 25     AND ($25,X)
  $894B: 23 26     RLA ($26,X)
  $894D: 29 02     AND #$02
  $894F: 09 22     ORA #$22
  $8951: 0C 62 18  NOP $1862
  $8954: 23 0E     RLA ($0e,X)
  $8956: 44 24     NOP $24
  $8958: 25 26     AND $26
  $895A: 26 2C     ROL $2c
  $895C: 27 2E     RLA $2e
  $895E: 67 31     RRA $31
  $8960: 68        PLA
  $8961: 84 03     STY $03
  $8963: 07 22     SLO $22
  $8965: 0D 23 0F  ORA $0f23
  $8968: 44 25     NOP $25
  $896A: 45 27     EOR $27
  $896C: 66 2D     ROR $2d
  $896E: 67 2F     RRA $2f
  $8970: 68        PLA
  $8971: 85 04     STA $04
  $8973: 04 65     NOP $65
  $8975: 32        ???
  $8976: 66 38     ROR $38
  $8978: 27 3A     RLA $3a
  $897A: 28        PLP
  $897B: 90 05     BCC $8982
  $897D: 04 66     NOP $66
  $897F: 39 27 3B  AND $3b27,Y
  $8982: 28        PLP
  $8983: 91 29     STA ($29),Y
  $8985: 93 06     ??? ($06),Y
  $8987: 03 28     SLO ($28,X)
  $8989: 94 29     STY $29,X
  $898B: 96 6A     STX $6a,Y
  $898D: 9C 07 01  SHY $0107,X
  $8990: 6A        ROR A
  $8991: 9D E0 07  STA $07e0,X
  $8994: A6 C9     LDX $c9
  $8996: C1 C9     CMP ($c9,X)
  $8998: E0 C9     CPX #$c9
  $899A: FB C9 16  ISB $16c9,Y
  $899D: CA        DEX
  $899E: 31 CA     AND ($ca),Y
  $89A0: 4C CA 67  JMP $67ca
  $89A3: CA        DEX
  $89A4: 84 CA     STY $ca
  $89A6: 03 02     SLO ($02,X)
  $89A8: 02        ???
  $89A9: 0D 23 0F  ORA $0f23
  $89AC: 04 04     NOP $04
  $89AE: 01 12     ORA ($12,X)
  $89B0: 02        ???
  $89B1: 18        CLC
  $89B2: 63 1A     RRA ($1a,X)
  $89B4: 24 30     BIT $30
  $89B6: 05 03     ORA $03
  $89B8: 02        ???
  $89B9: 19 03 1B  ORA $1b03,Y
  $89BC: 23 1C     RLA ($1c,X)
  $89BE: 20 9C CA  JSR $ca9c
  $89C1: 03 03     SLO ($03,X)
  $89C3: 01 01     ORA ($01,X)
  $89C5: 02        ???
  $89C6: 02        ???
  $89C7: 23 0F     RLA ($0f,X)
  $89C9: 04 04     NOP $04
  $89CB: 01 04     ORA ($04,X)
  $89CD: 02        ???
  $89CE: 03 63     SLO ($63,X)
  $89D0: 1A        NOP
  $89D1: 24 30     BIT $30
  $89D3: 05 04     ORA $04
  $89D5: 01 05     ORA ($05,X)
  $89D7: 02        ???
  $89D8: 06 03     ASL $03
  $89DA: 08        PHP
  $89DB: 23 09     RLA ($09,X)
  $89DD: 20 9C CA  JSR $ca9c
  $89E0: 03 02     SLO ($02,X)
  $89E2: 02        ???
  $89E3: 91 23     STA ($23),Y
  $89E5: 0F 04 04  SLO $0404
  $89E8: 01 3F     ORA ($3f,X)
  $89EA: 02        ???
  $89EB: 94 63     STY $63,X
  $89ED: 96 24     STX $24,Y
  $89EF: 30 05     BMI $89f6
  $89F1: 03 02     SLO ($02,X)
  $89F3: 95 03     STA $03,X
  $89F5: 1B 23 1C  SLO $1c23,Y
  $89F8: 20 9C CA  JSR $ca9c
  $89FB: 03 02     SLO ($02,X)
  $89FD: 02        ???
  $89FE: 13 23     SLO ($23),Y
  $8A00: 0F 04 04  SLO $0404
  $8A03: 01 12     ORA ($12,X)
  $8A05: 02        ???
  $8A06: 16 63     ASL $63,X
  $8A08: 41 24     EOR ($24,X)
  $8A0A: 30 05     BMI $8a11
  $8A0C: 03 02     SLO ($02,X)
  $8A0E: 19 03 1B  ORA $1b03,Y
  $8A11: 23 1C     RLA ($1c,X)
  $8A13: 20 9C CA  JSR $ca9c
  $8A16: 03 02     SLO ($02,X)
  $8A18: 02        ???
  $8A19: 48        PHA
  $8A1A: 23 1D     RLA ($1d,X)
  $8A1C: 04 04     NOP $04
  $8A1E: 01 43     ORA ($43,X)
  $8A20: 02        ???
  $8A21: 49 63     EOR #$63
  $8A23: 4A        LSR A
  $8A24: 24 30     BIT $30
  $8A26: 05 03     ORA $03
  $8A28: 02        ???
  $8A29: 4C 03 4B  JMP $4b03
  $8A2C: 23 4E     RLA ($4e,X)
  $8A2E: 20 9C CA  JSR $ca9c
  $8A31: 03 02     SLO ($02,X)
  $8A33: 02        ???
  $8A34: 47 23     SRE $23
  $8A36: 52        ???
  $8A37: 04 04     NOP $04
  $8A39: 01 51     ORA ($51,X)
  $8A3B: 02        ???
  $8A3C: 55 63     EOR $63,X
  $8A3E: 56 24     LSR $24,X
  $8A40: 57 05     SRE $05,X
  $8A42: 03 02     SLO ($02,X)
  $8A44: 54 03     NOP $03,X
  $8A46: 4D 23 58  EOR $5823
  $8A49: 20 9C CA  JSR $ca9c
  $8A4C: 03 02     SLO ($02,X)
  $8A4E: 02        ???
  $8A4F: 5B 23 15  SRE $1523,Y
  $8A52: 04 04     NOP $04
  $8A54: 01 5C     ORA ($5c,X)
  $8A56: 02        ???
  $8A57: 5E 63 5A  LSR $5a63,X
  $8A5A: 24 30     BIT $30
  $8A5C: 05 03     ORA $03
  $8A5E: 02        ???
  $8A5F: 5F 03 70  SRE $7003,X
  $8A62: 23 71     RLA ($71,X)
  $8A64: 20 9C CA  JSR $ca9c
  $8A67: 03 03     SLO ($03,X)
  $8A69: 02        ???
  $8A6A: 62        ???
  $8A6B: 23 63     RLA ($63,X)
  $8A6D: 63 66     RRA ($66,X)
  $8A6F: 04 04     NOP $04
  $8A71: 01 12     ORA ($12,X)
  $8A73: 02        ???
  $8A74: 65 63     ADC $63
  $8A76: 67 24     RRA $24
  $8A78: 30 05     BMI $8a7f
  $8A7A: 03 02     SLO ($02,X)
  $8A7C: 64 03     NOP $03
  $8A7E: 72        ???
  $8A7F: 23 3D     RLA ($3d,X)
  $8A81: 20 AD CA  JSR $caad
  $8A84: 03 02     SLO ($02,X)
  $8A86: 02        ???
  $8A87: 91 23     STA ($23),Y
  $8A89: 0F 04 04  SLO $0404
  $8A8C: 01 43     ORA ($43,X)
  $8A8E: 02        ???
  $8A8F: 77 63     RRA $63,X
  $8A91: 7C 24 30  NOP $3024,X
  $8A94: 05 03     ORA $03
  $8A96: 02        ???
  $8A97: 76 03     ROR $03,X
  $8A99: 1B 23 1C  SLO $1c23,Y
  $8A9C: 05 01     ORA $01
  $8A9E: 24 31     BIT $31
  $8AA0: 06 02     ASL $02
  $8AA2: 23 1E     RLA ($1e,X)
  $8AA4: 24 34     BIT $34
  $8AA6: 07 01     SLO $01
  $8AA8: 64 35     NOP $35
  $8AAA: 20 BB CA  JSR $cabb
  $8AAD: 05 01     ORA $01
  $8AAF: 24 69     BIT $69
  $8AB1: 06 02     ASL $02
  $8AB3: 23 68     RLA ($68,X)
  $8AB5: 64 6A     NOP $6a
  $8AB7: 07 01     SLO $01
  $8AB9: 64 6B     NOP $6b
  $8ABB: 00        BRK
  $8ABC: 01 6B     ORA ($6b,X)
  $8ABE: 8A        TXA
  $8ABF: 01 04     ORA ($04,X)
  $8AC1: 63 0B     RRA ($0b,X)
  $8AC3: 2A        ROL A
  $8AC4: 89 2B     NOP #$2b
  $8AC6: 8B 6B     XAA #$6b
  $8AC8: 8D 02 07  STA $0702
  $8ACB: 63 0E     RRA ($0e,X)
  $8ACD: 66 2C     ROR $2c
  $8ACF: 67 2E     RRA $2e
  $8AD1: 28        PLP
  $8AD2: 84 68     STY $68
  $8AD4: 8E 29 86  STX $8629
  $8AD7: 2A        ROL A
  $8AD8: 8C 03 07  STY $0703
  $8ADB: 24 25     BIT $25
  $8ADD: 25 27     AND $27
  $8ADF: 45 83     EOR $83
  $8AE1: 66 2D     ROR $2d
  $8AE3: 67 2F     RRA $2f
  $8AE5: 28        PLP
  $8AE6: 85 29     STA $29
  $8AE8: 87 04     SAX $04
  $8AEA: 05 25     ORA $25
  $8AEC: 32        ???
  $8AED: 45 88     EOR $88
  $8AEF: 46 38     LSR $38
  $8AF1: 67 3A     RRA $3a
  $8AF3: 68        PLA
  $8AF4: 90 05     BCC $8afb
  $8AF6: 04 25     NOP $25
  $8AF8: 33 45     RLA ($45),Y
  $8AFA: 24 46     BIT $46
  $8AFC: 39 47 3B  AND $3b47,Y
  $8AFF: 06 02     ASL $02
  $8B01: 25 36     AND $36
  $8B03: 66 3C     ROR $3c
  $8B05: 07 01     SLO $01
  $8B07: 65 37     ADC $37
  $8B09: E0 04     CPX #$04
  $8B0B: 1D CB 3E  ORA $3ecb,X
  $8B0E: CB 5F     AXS #$5f
  $8B10: CB 7E     AXS #$7e
  $8B12: CB 9D     AXS #$9d
  $8B14: CB BA     AXS #$ba
  $8B16: CB D9     AXS #$d9
  $8B18: CB FA     AXS #$fa
  $8B1A: CB 19     AXS #$19
  $8B1C: CC 03 04  CPY $0403
  $8B1F: 00        BRK
  $8B20: 07 01     SLO $01
  $8B22: 0D 21 01  ORA $0121
  $8B25: 22        ???
  $8B26: 0F 04 04  SLO $0404
  $8B29: 00        BRK
  $8B2A: 12        ???
  $8B2B: 01 18     ORA ($18,X)
  $8B2D: 22        ???
  $8B2E: 1A        NOP
  $8B2F: 62        ???
  $8B30: 04 05     NOP $05
  $8B32: 04 00     NOP $00
  $8B34: 13 01     SLO ($01),Y
  $8B36: 19 02 1B  ORA $1b02,Y
  $8B39: 22        ???
  $8B3A: 2A        ROL A
  $8B3B: 20 33 CC  JSR $cc33
  $8B3E: 03 04     SLO ($04,X)
  $8B40: 00        BRK
  $8B41: 26 01     ROL $01
  $8B43: 2C 21 29  BIT $2921
  $8B46: 22        ???
  $8B47: 2E 04 04  ROL $0404
  $8B4A: 00        BRK
  $8B4B: 20 01 22  JSR $2201
  $8B4E: 22        ???
  $8B4F: 1A        NOP
  $8B50: 62        ???
  $8B51: 04 05     NOP $05
  $8B53: 04 00     NOP $00
  $8B55: 0B 01     ANC #$01
  $8B57: 21 02     AND ($02,X)
  $8B59: 23 22     RLA ($22,X)
  $8B5B: 84 20     STY $20
  $8B5D: 33 CC     RLA ($cc),Y
  $8B5F: 03 04     SLO ($04,X)
  $8B61: 00        BRK
  $8B62: 11 01     ORA ($01),Y
  $8B64: 1F 21 1E  SLO $1e21,X
  $8B67: 22        ???
  $8B68: 2E 04 04  ROL $0404
  $8B6B: 00        BRK
  $8B6C: 12        ???
  $8B6D: 01 16     ORA ($16,X)
  $8B6F: 22        ???
  $8B70: 1A        NOP
  $8B71: 62        ???
  $8B72: 04 05     NOP $05
  $8B74: 03 00     SLO ($00,X)
  $8B76: 15 01     ORA $01,X
  $8B78: 17 22     SLO $22,X
  $8B7A: 1D 20 33  ORA $3320,X
  $8B7D: CC 03 04  CPY $0403
  $8B80: 00        BRK
  $8B81: 40        RTI
  $8B82: 01 42     ORA ($42,X)
  $8B84: 21 45     AND ($45,X)
  $8B86: 22        ???
  $8B87: 48        PHA
  $8B88: 04 04     NOP $04
  $8B8A: 00        BRK
  $8B8B: 12        ???
  $8B8C: 01 43     ORA ($43,X)
  $8B8E: 22        ???
  $8B8F: 49 62     EOR #$62
  $8B91: 47 05     SRE $05
  $8B93: 03 00     SLO ($00,X)
  $8B95: 44 01     NOP $01
  $8B97: 19 22 4C  ORA $4c22,Y
  $8B9A: 20 33 CC  JSR $cc33
  $8B9D: 03 04     SLO ($04,X)
  $8B9F: 00        BRK
  $8BA0: 50 01     BVC $8ba3
  $8BA2: 52        ???
  $8BA3: 21 55     AND ($55,X)
  $8BA5: 22        ???
  $8BA6: 58        CLI
  $8BA7: 04 04     NOP $04
  $8BA9: 00        BRK
  $8BAA: 51 01     EOR ($01),Y
  $8BAC: 53 22     SRE ($22),Y
  $8BAE: 59 62 57  EOR $5762,Y
  $8BB1: 05 02     ORA $02
  $8BB3: 01 56     ORA ($56,X)
  $8BB5: 22        ???
  $8BB6: 5C 20 33  NOP $3320,X
  $8BB9: CC 03 04  CPY $0403
  $8BBC: 00        BRK
  $8BBD: 4A        LSR A
  $8BBE: 01 60     ORA ($60,X)
  $8BC0: 21 4D     AND ($4d,X)
  $8BC2: 22        ???
  $8BC3: 0F 04 04  SLO $0404
  $8BC6: 00        BRK
  $8BC7: 4B 01     ALR #$01
  $8BC9: 61 22     ADC ($22,X)
  $8BCB: 1A        NOP
  $8BCC: 62        ???
  $8BCD: 04 05     NOP $05
  $8BCF: 03 00     SLO ($00,X)
  $8BD1: 4E 01 64  LSR $6401
  $8BD4: 22        ???
  $8BD5: 66 20     ROR $20
  $8BD7: 33 CC     RLA ($cc),Y
  $8BD9: 09 01     ORA #$01
  $8BDB: 62        ???
  $8BDC: 6C 03 04  JMP ($0403)
  $8BDF: 00        BRK
  $8BE0: 3C 01 3E  NOP $3e01,X
  $8BE3: 21 69     AND ($69,X)
  $8BE5: 22        ???
  $8BE6: 6B 04     ARR #$04
  $8BE8: 03 00     SLO ($00,X)
  $8BEA: 3D 01 3F  AND $3f01,X
  $8BED: 22        ???
  $8BEE: 6E 05 03  ROR $0305
  $8BF1: 00        BRK
  $8BF2: 68        PLA
  $8BF3: 01 6A     ORA ($6a,X)
  $8BF5: 22        ???
  $8BF6: 6F 20 33  RRA $3320
  $8BF9: CC 03 04  CPY $0403
  $8BFC: 00        BRK
  $8BFD: 07 01     SLO $01
  $8BFF: 70 21     BVS $8c22
  $8C01: 77 22     RRA $22,X
  $8C03: 72        ???
  $8C04: 04 04     NOP $04
  $8C06: 00        BRK
  $8C07: 12        ???
  $8C08: 01 71     ORA ($71,X)
  $8C0A: 22        ???
  $8C0B: 73 62     RRA ($62),Y
  $8C0D: 7D 05 03  ADC $0305,X
  $8C10: 00        BRK
  $8C11: 13 01     SLO ($01),Y
  $8C13: 19 22 76  ORA $7622,Y
  $8C16: 20 48 CC  JSR $cc48
  $8C19: 03 04     SLO ($04,X)
  $8C1B: 00        BRK
  $8C1C: 78        SEI
  $8C1D: 01 7A     ORA ($7a,X)
  $8C1F: 21 6D     AND ($6d,X)
  $8C21: 22        ???
  $8C22: D0 04     BNE $8c28
  $8C24: 04 00     NOP $00
  $8C26: 79 01 7B  ADC $7b01,Y
  $8C29: 22        ???
  $8C2A: D1 62     CMP ($62),Y
  $8C2C: 7F 05 02  RRA $0205,X
  $8C2F: 01 7E     ORA ($7e,X)
  $8C31: 22        ???
  $8C32: D4 02     NOP $02,X
  $8C34: 02        ???
  $8C35: 21 0C     AND ($0c,X)
  $8C37: 22        ???
  $8C38: 0E 04 01  ASL $0104
  $8C3B: 23 30     RLA ($30,X)
  $8C3D: 05 01     ORA $01
  $8C3F: 23 31     RLA ($31,X)
  $8C41: 06 01     ASL $01
  $8C43: 63 34     RRA ($34,X)
  $8C45: 20 5A CC  JSR $cc5a
  $8C48: 02        ???
  $8C49: 02        ???
  $8C4A: 61 65     ADC ($65,X)
  $8C4C: 22        ???
  $8C4D: 67 04     RRA $04
  $8C4F: 01 23     ORA ($23,X)
  $8C51: 75 05     ADC $05,X
  $8C53: 01 23     ORA ($23,X)
  $8C55: 5F 06 01  SRE $0106,X
  $8C58: 63 5D     RRA ($5d,X)
  $8C5A: 00        BRK
  $8C5B: 01 60     ORA ($60,X)
  $8C5D: 02        ???
  $8C5E: 01 02     ORA ($02,X)
  $8C60: 60        RTS
  $8C61: 03 61     SLO ($61,X)
  $8C63: 09 02     ORA #$02
  $8C65: 02        ???
  $8C66: 60        RTS
  $8C67: 06 23     ASL $23
  $8C69: 24 03     BIT $03
  $8C6B: 07 23     SLO $23
  $8C6D: 25 24     AND $24
  $8C6F: 27 44     RLA $44
  $8C71: 05 45     ORA $45
  $8C73: 2D 66 2F  AND $2f66
  $8C76: 67 85     RRA $85
  $8C78: 28        PLP
  $8C79: 87 04     SAX $04
  $8C7B: 06 24     ASL $24
  $8C7D: 32        ???
  $8C7E: 44 10     NOP $10
  $8C80: 45 38     EOR $38
  $8C82: 66 3A     ROR $3a
  $8C84: 27 90     RLA $90
  $8C86: 28        PLP
  $8C87: 92        ???
  $8C88: 05 05     ORA $05
  $8C8A: 44 33     NOP $33
  $8C8C: 45 39     EOR $39
  $8C8E: 46 3B     LSR $3b
  $8C90: 27 91     RLA $91
  $8C92: 68        PLA
  $8C93: 93 06     ??? ($06),Y
  $8C95: 03 64     SLO ($64,X)
  $8C97: 36 27     ROL $27,X
  $8C99: 94 28     STY $28,X
  $8C9B: 96 07     STX $07,Y
  $8C9D: 02        ???
  $8C9E: 28        PLP
  $8C9F: 97 29     SAX $29,Y
  $8CA1: 9D 08 02  STA $0208,X
  $8CA4: 29 08     AND #$08
  $8CA6: 6A        ROR A
  $8CA7: 0A        ASL A
  $8CA8: E0 09     CPX #$09
  $8CAA: BC CC E5  LDY $e5cc,X
  $8CAD: CC 10 CD  CPY $cd10
  $8CB0: 35 CD     AND $cd,X
  $8CB2: 5A        NOP
  $8CB3: CD 7F CD  CMP $cd7f
  $8CB6: A2 CD     LDX #$cd
  $8CB8: C5 CD     CMP $cd
  $8CBA: EC CD 03  CPX $03cd
  $8CBD: 07 21     SLO $21
  $8CBF: 07 61     SLO $61
  $8CC1: 35 02     AND $02,X
  $8CC3: 0D 22 3B  ORA $3b22
  $8CC6: 23 0F     RLA ($0f,X)
  $8CC8: 63 10     RRA ($10,X)
  $8CCA: 24 25     BIT $25
  $8CCC: 04 04     NOP $04
  $8CCE: 02        ???
  $8CCF: 18        CLC
  $8CD0: 03 1A     SLO ($1a,X)
  $8CD2: 04 30     NOP $30
  $8CD4: 24 37     BIT $37
  $8CD6: 05 03     ORA $03
  $8CD8: 02        ???
  $8CD9: 19 03 1B  ORA $1b03,Y
  $8CDC: 24 31     BIT $31
  $8CDE: 06 01     ASL $01
  $8CE0: 02        ???
  $8CE1: 1C 20 0E  NOP $0e20,X
  $8CE4: CE 03 07  DEC $0703
  $8CE7: 21 07     AND ($07,X)
  $8CE9: 61 35     ADC ($35,X)
  $8CEB: 22        ???
  $8CEC: 42        ???
  $8CED: 02        ???
  $8CEE: 4A        LSR A
  $8CEF: 23 0F     RLA ($0f,X)
  $8CF1: 63 10     RRA ($10,X)
  $8CF3: 24 25     BIT $25
  $8CF5: 04 03     NOP $03
  $8CF7: 02        ???
  $8CF8: 43 03     SRE ($03,X)
  $8CFA: 49 24     EOR #$24
  $8CFC: 4B 05     ALR #$05
  $8CFE: 04 02     NOP $02
  $8D00: 46 03     LSR $03
  $8D02: 4C 24 4E  JMP $4e24
  $8D05: 04 48     NOP $48
  $8D07: 06 02     ASL $02
  $8D09: 02        ???
  $8D0A: 47 03     SRE $03
  $8D0C: 4D 20 0E  EOR $0e20
  $8D0F: CE 03 07  DEC $0703
  $8D12: 21 07     AND ($07,X)
  $8D14: 61 35     ADC ($35,X)
  $8D16: 22        ???
  $8D17: 62        ???
  $8D18: 02        ???
  $8D19: 60        RTS
  $8D1A: 23 0F     RLA ($0f,X)
  $8D1C: 63 10     RRA ($10,X)
  $8D1E: 24 25     BIT $25
  $8D20: 04 04     NOP $04
  $8D22: 02        ???
  $8D23: 63 03     RRA ($03,X)
  $8D25: 69 04     ADC #$04
  $8D27: 30 24     BMI $8d4d
  $8D29: 37 05     RLA $05,X
  $8D2B: 03 02     SLO ($02,X)
  $8D2D: 66 03     ROR $03
  $8D2F: 6C 24 31  JMP ($3124)
  $8D32: 20 0E CE  JSR $ce0e
  $8D35: 03 07     SLO ($07,X)
  $8D37: 21 07     AND ($07,X)
  $8D39: 61 35     ADC ($35,X)
  $8D3B: 22        ???
  $8D3C: 11 02     ORA ($02),Y
  $8D3E: 1D 63 13  ORA $1363,X
  $8D41: 23 40     RLA ($40,X)
  $8D43: 24 25     BIT $25
  $8D45: 04 04     NOP $04
  $8D47: 02        ???
  $8D48: 14 03     NOP $03,X
  $8D4A: 16 04     ASL $04,X
  $8D4C: 30 24     BMI $8d72
  $8D4E: 37 05     RLA $05,X
  $8D50: 03 02     SLO ($02,X)
  $8D52: 15 03     ORA $03,X
  $8D54: 17 24     SLO $24,X
  $8D56: 31 20     AND ($20),Y
  $8D58: 0E CE 03  ASL $03ce
  $8D5B: 07 21     SLO $21
  $8D5D: 51 61     EOR ($61),Y
  $8D5F: 52        ???
  $8D60: 02        ???
  $8D61: 53 22     SRE ($22),Y
  $8D63: 5A        NOP
  $8D64: 23 59     RLA ($59,X)
  $8D66: 63 5B     RRA ($5b,X)
  $8D68: 24 25     BIT $25
  $8D6A: 04 04     NOP $04
  $8D6C: 21 54     AND ($54,X)
  $8D6E: 02        ???
  $8D6F: 56 03     LSR $03,X
  $8D71: 5C 24 5E  NOP $5e24,X
  $8D74: 05 03     ORA $03
  $8D76: 02        ???
  $8D77: 57 03     SRE $03,X
  $8D79: 5D 24 5F  EOR $5f24,X
  $8D7C: 20 0E CE  JSR $ce0e
  $8D7F: 03 07     SLO ($07,X)
  $8D81: 21 07     AND ($07,X)
  $8D83: 61 35     ADC ($35,X)
  $8D85: 02        ???
  $8D86: 87 22     SAX $22
  $8D88: 8E 63 8D  STX $8d63
  $8D8B: 23 85     RLA ($85,X)
  $8D8D: 24 8F     BIT $8f
  $8D8F: 04 03     NOP $03
  $8D91: 02        ???
  $8D92: 92        ???
  $8D93: 03 98     SLO ($98,X)
  $8D95: 24 9A     BIT $9a
  $8D97: 05 03     ORA $03
  $8D99: 02        ???
  $8D9A: 93 03     ??? ($03),Y
  $8D9C: 99 24 9B  STA $9b24,Y
  $8D9F: 20 0E CE  JSR $ce0e
  $8DA2: 03 06     SLO ($06,X)
  $8DA4: 21 07     AND ($07,X)
  $8DA6: 61 35     ADC ($35,X)
  $8DA8: 22        ???
  $8DA9: 80 23     NOP #$23
  $8DAB: 82 63     NOP #$63
  $8DAD: 8B 24     XAA #$24
  $8DAF: 88        DEY
  $8DB0: 04 04     NOP $04
  $8DB2: 42        ???
  $8DB3: 81 02     STA ($02,X)
  $8DB5: 8A        TXA
  $8DB6: 03 83     SLO ($83,X)
  $8DB8: 24 89     BIT $89
  $8DBA: 05 03     ORA $03
  $8DBC: 02        ???
  $8DBD: 84 03     STY $03
  $8DBF: 86 24     STX $24
  $8DC1: 8C 20 0E  STY $0e20
  $8DC4: CE 03 06  DEC $0603
  $8DC7: 61 4F     ADC ($4f,X)
  $8DC9: 22        ???
  $8DCA: 65 02     ADC $02
  $8DCC: 6D 63 67  ADC $6763
  $8DCF: 23 6F     RLA ($6f,X)
  $8DD1: 24 25     BIT $25
  $8DD3: 04 04     NOP $04
  $8DD5: 02        ???
  $8DD6: 18        CLC
  $8DD7: 03 72     SLO ($72,X)
  $8DD9: 24 78     BIT $78
  $8DDB: 04 6E     NOP $6e
  $8DDD: 05 03     ORA $03
  $8DDF: 02        ???
  $8DE0: 19 03 1B  ORA $1b03,Y
  $8DE3: 24 79     BIT $79
  $8DE5: 06 01     ASL $01
  $8DE7: 02        ???
  $8DE8: 1C 20 1D  NOP $1d20,X
  $8DEB: CE 03 07  DEC $0703
  $8DEE: 21 07     AND ($07,X)
  $8DF0: 61 35     ADC ($35,X)
  $8DF2: 22        ???
  $8DF3: 94 02     STY $02,X
  $8DF5: 6A        ROR A
  $8DF6: 63 96     RRA ($96,X)
  $8DF8: 23 6B     RLA ($6b,X)
  $8DFA: 24 25     BIT $25
  $8DFC: 04 04     NOP $04
  $8DFE: 02        ???
  $8DFF: 95 03     STA $03,X
  $8E01: 97 04     SAX $04,Y
  $8E03: 9D 24 9C  STA $9c24,X
  $8E06: 05 03     ORA $03
  $8E08: 02        ???
  $8E09: 54 03     NOP $03,X
  $8E0B: C2 24     NOP #$24
  $8E0D: 5F 02 01  SRE $0102,X
  $8E10: 22        ???
  $8E11: 0C 04 01  NOP $0104
  $8E14: 25 32     AND $32
  $8E16: 05 01     ORA $01
  $8E18: 65 33     ADC $33
  $8E1A: 20 29 CE  JSR $ce29
  $8E1D: 02        ???
  $8E1E: 01 02     ORA ($02,X)
  $8E20: 64 04     NOP $04
  $8E22: 01 25     ORA ($25,X)
  $8E24: 7A        NOP
  $8E25: 05 01     ORA $01
  $8E27: 65 7B     ADC $7b
  $8E29: 00        BRK
  $8E2A: 03 61     SLO ($61,X)
  $8E2C: 02        ???
  $8E2D: 64 20     NOP $20
  $8E2F: 65 22     ADC $22
  $8E31: 01 07     ORA ($07,X)
  $8E33: 61 03     ADC ($03,X)
  $8E35: 63 0B     RRA ($0b,X)
  $8E37: 64 21     NOP $21
  $8E39: 25 23     AND $23
  $8E3B: 66 29     ROR $29
  $8E3D: 67 2B     RRA $2b
  $8E3F: 68        PLA
  $8E40: 01 02     ORA ($02,X)
  $8E42: 0D 60 04  ORA $0460
  $8E45: 61 06     ADC ($06,X)
  $8E47: 23 0E     RLA ($0e,X)
  $8E49: 43 05     SRE ($05,X)
  $8E4B: 24 24     BIT $24
  $8E4D: 44 12     NOP $12
  $8E4F: 45 26     EOR $26
  $8E51: 46 2C     LSR $2c
  $8E53: 66 1E     ROR $1e
  $8E55: 67 2E     RRA $2e
  $8E57: 28        PLP
  $8E58: 08        PHP
  $8E59: 68        PLA
  $8E5A: 1F 29 0A  SLO $0a29,X
  $8E5D: 03 09     SLO ($09,X)
  $8E5F: 25 27     AND $27
  $8E61: 45 3D     EOR $3d
  $8E63: 46 2D     LSR $2d
  $8E65: 47 2F     SRE $2f
  $8E67: 28        PLP
  $8E68: 09 29     ORA #$29
  $8E6A: 28        PLP
  $8E6B: 2A        ROL A
  $8E6C: 2A        ROL A
  $8E6D: 6A        ROR A
  $8E6E: 34 6B     NOP $6b,X
  $8E70: 3A        NOP
  $8E71: 04 01     NOP $01
  $8E73: 6A        ROR A
  $8E74: 38        SEC
  $8E75: 05 01     ORA $01
  $8E77: 66 39     ROR $39
  $8E79: 06 03     ASL $03
  $8E7B: 65 36     ADC $36
  $8E7D: 66 3C     ROR $3c
  $8E7F: 67 3E     RRA $3e
  $8E81: 07 01     SLO $01
  $8E83: 67 3F     RRA $3f
  $8E85: E0 0A     CPX #$0a
  $8E87: 99 CE B4  STA $b4ce,Y
  $8E8A: CE 99 CE  DEC $ce99
  $8E8D: 99 CE D5  STA $d5ce,Y
  $8E90: CE F4 CE  DEC $cef4
  $8E93: 0F CF 2A  SLO $2acf
  $8E96: CF 99 CE  DCP $ce99
  $8E99: 04 02     NOP $02
  $8E9B: 25 30     AND $30
  $8E9D: 26 32     ROL $32
  $8E9F: 05 04     ORA $04
  $8EA1: 05 31     ORA $31
  $8EA3: 25 22     AND $22
  $8EA5: 06 33     ASL $33
  $8EA7: 27 39     RLA $39
  $8EA9: 06 03     ASL $03
  $8EAB: 05 34     ORA $34
  $8EAD: 06 36     ASL $36
  $8EAF: 27 3C     RLA $3c
  $8EB1: 20 4D CF  JSR $cf4d
  $8EB4: 04 02     NOP $02
  $8EB6: 25 80     AND $80
  $8EB8: 26 82     ROL $82
  $8EBA: 05 04     ORA $04
  $8EBC: 05 81     ORA $81
  $8EBE: 25 88     AND $88
  $8EC0: 06 83     ASL $83
  $8EC2: 27 89     RLA $89
  $8EC4: 06 03     ASL $03
  $8EC6: 05 84     ORA $84
  $8EC8: 06 86     ASL $86
  $8ECA: 27 8C     RLA $8c
  $8ECC: 07 02     SLO $02
  $8ECE: 05 85     ORA $85
  $8ED0: 06 87     ASL $87
  $8ED2: 20 4D CF  JSR $cf4d
  $8ED5: 04 04     NOP $04
  $8ED7: 05 11     ORA $11
  $8ED9: 25 1D     AND $1d
  $8EDB: 06 13     ASL $13
  $8EDD: 26 1E     ROL $1e
  $8EDF: 05 04     ORA $04
  $8EE1: 05 14     ORA $14
  $8EE3: 25 1F     AND $1f
  $8EE5: 06 16     ASL $16
  $8EE7: 27 1C     RLA $1c
  $8EE9: 06 03     ASL $03
  $8EEB: 05 15     ORA $15
  $8EED: 06 17     ASL $17
  $8EEF: 27 3C     RLA $3c
  $8EF1: 20 4D CF  JSR $cf4d
  $8EF4: 04 02     NOP $02
  $8EF6: 25 90     AND $90
  $8EF8: 26 92     ROL $92
  $8EFA: 05 04     ORA $04
  $8EFC: 05 91     ORA $91
  $8EFE: 25 3A     AND $3a
  $8F00: 06 93     ASL $93
  $8F02: 27 99     RLA $99
  $8F04: 06 03     ASL $03
  $8F06: 05 94     ORA $94
  $8F08: 06 96     ASL $96
  $8F0A: 27 9C     RLA $9c
  $8F0C: 20 4D CF  JSR $cf4d
  $8F0F: 04 02     NOP $02
  $8F11: 25 8A     AND $8a
  $8F13: 26 A0     ROL $a0
  $8F15: 05 04     ORA $04
  $8F17: 05 8B     ORA $8b
  $8F19: 25 A2     AND $a2
  $8F1B: 06 A1     ASL $a1
  $8F1D: 27 A3     RLA $a3
  $8F1F: 06 03     ASL $03
  $8F21: 05 8E     ORA $8e
  $8F23: 06 A4     ASL $a4
  $8F25: 27 3C     RLA $3c
  $8F27: 20 4D CF  JSR $cf4d
  $8F2A: 04 02     NOP $02
  $8F2C: 25 8F     AND $8f
  $8F2E: 26 A5     ROL $a5
  $8F30: 05 04     ORA $04
  $8F32: 05 9A     ORA $9a
  $8F34: 25 8D     AND $8d
  $8F36: 06 B0     ASL $b0
  $8F38: 27 B2     RLA $b2
  $8F3A: 06 03     ASL $03
  $8F3C: 05 9B     ORA $9b
  $8F3E: 06 B1     ASL $b1
  $8F40: 07 B3     SLO $b3
  $8F42: 05 01     ORA $01
  $8F44: 68        PLA
  $8F45: B8        CLV
  $8F46: 06 01     ASL $01
  $8F48: 08        PHP
  $8F49: B9 20 57  LDA $5720,Y
  $8F4C: CF 05 02  DCP $0205
  $8F4F: 28        PLP
  $8F50: 3B 68 2A  RLA $2a68,Y
  $8F53: 06 01     ASL $01
  $8F55: 68        PLA
  $8F56: 3E 00 02  ROL $0200,X
  $8F59: 62        ???
  $8F5A: 02        ???
  $8F5B: 63 08     RRA ($08,X)
  $8F5D: 01 06     ORA ($06,X)
  $8F5F: 61 01     ADC ($01,X)
  $8F61: 62        ???
  $8F62: 03 23     SLO ($23,X)
  $8F64: 09 24     ORA #$24
  $8F66: 0B 67     ANC #$67
  $8F68: 29 68     AND #$68
  $8F6A: 2B 02     ANC #$02
  $8F6C: 0A        ASL A
  $8F6D: 61 04     ADC ($04,X)
  $8F6F: 62        ???
  $8F70: 06 23     ASL $23
  $8F72: 0C 24 0E  NOP $0e24
  $8F75: 65 24     ADC $24
  $8F77: 26 26     ROL $26
  $8F79: 46 20     LSR $20
  $8F7B: 27 2C     RLA $2c
  $8F7D: 67 23     RRA $23
  $8F7F: 68        PLA
  $8F80: 2E 03 09  ROL $0903
  $8F83: 23 0D     RLA ($0d,X)
  $8F85: 24 0F     BIT $0f
  $8F87: 64 0A     NOP $0a
  $8F89: 65 25     ADC $25
  $8F8B: 26 27     ROL $27
  $8F8D: 46 21     LSR $21
  $8F8F: 27 2D     RLA $2d
  $8F91: 67 28     RRA $28
  $8F93: 68        PLA
  $8F94: 2F 04 06  RLA $0604
  $8F97: 62        ???
  $8F98: 12        ???
  $8F99: 63 18     RRA ($18,X)
  $8F9B: 64 1A     NOP $1a
  $8F9D: 27 38     RLA $38
  $8F9F: 69 05     ADC #$05
  $8FA1: 6A        ROR A
  $8FA2: 07 05     SLO $05
  $8FA4: 03 63     SLO ($63,X)
  $8FA6: 19 64 1B  ORA $1b64,Y
  $8FA9: 69 10     ADC #$10
  $8FAB: E0 09     CPX #$09
  $8FAD: BF CF D8  LAX $d8cf,Y
  $8FB0: CF BF CF  DCP $cfbf
  $8FB3: BF CF F3  LAX $f3cf,Y
  $8FB6: CF F3 CF  DCP $cff3
  $8FB9: F3 CF     ISB ($cf),Y
  $8FBB: 08        PHP
  $8FBC: D0 BF     BNE $8f7d
  $8FBE: CF 03 01  DCP $0103
  $8FC1: 67 E7     RRA $e7
  $8FC3: 04 03     NOP $03
  $8FC5: 06 F0     ASL $f0
  $8FC7: 07 F2     SLO $f2
  $8FC9: 67 C9     RRA $c9
  $8FCB: 05 04     ORA $04
  $8FCD: 26 F1     ROL $f1
  $8FCF: 07 F3     SLO $f3
  $8FD1: 27 CC     RLA $cc
  $8FD3: 08        PHP
  $8FD4: F5 20     SBC $20,X
  $8FD6: 1C D0 03  NOP $03d0,X
  $8FD9: 02        ???
  $8FDA: 06 CA     ASL $ca
  $8FDC: 07 E0     SLO $e0
  $8FDE: 04 03     NOP $03
  $8FE0: 06 CB     ASL $cb
  $8FE2: 07 E1     SLO $e1
  $8FE4: 67 CE     RRA $ce
  $8FE6: 05 04     ORA $04
  $8FE8: 07 E4     SLO $e4
  $8FEA: 27 CF     RLA $cf
  $8FEC: 08        PHP
  $8FED: E6 26     INC $26
  $8FEF: F1 20     SBC ($20),Y
  $8FF1: 1C D0 03  NOP $03d0,X
  $8FF4: 01 67     ORA ($67,X)
  $8FF6: E7 04     ISB $04
  $8FF8: 03 66     SLO ($66,X)
  $8FFA: 9E 27 B4  SHX $b427,Y
  $8FFD: 67 9F     RRA $9f
  $8FFF: 05 02     ORA $02
  $9001: 26 F1     ROL $f1
  $9003: 27 B5     RLA $b5
  $9005: 20 1C D0  JSR $d01c
  $9008: 03 01     SLO ($01,X)
  $900A: 67 E7     RRA $e7
  $900C: 04 03     NOP $03
  $900E: 06 76     ASL $76
  $9010: 07 7C     SLO $7c
  $9012: 67 7E     RRA $7e
  $9014: 05 03     ORA $03
  $9016: 26 77     ROL $77
  $9018: 07 7D     SLO $7d
  $901A: 27 75     RLA $75
  $901C: 00        BRK
  $901D: 01 62     ORA ($62,X)
  $901F: D0 01     BNE $9022
  $9021: 03 22     SLO ($22,X)
  $9023: C1 62     CMP ($62,X)
  $9025: 68        PLA
  $9026: 23 C3     RLA ($c3,X)
  $9028: 02        ???
  $9029: 02        ???
  $902A: 22        ???
  $902B: C4 23     CPY $23
  $902D: C6 03     DEC $03
  $902F: 06 23     ASL $23
  $9031: C7 63     DCP $63
  $9033: 55 64     EOR $64,X
  $9035: CD 68 E7  CMP $e768
  $9038: 68        PLA
  $9039: DD 69 E5  CMP $e569,X
  $903C: 04 05     NOP $05
  $903E: 63 D2     RRA ($d2,X)
  $9040: 44 D8     NOP $d8
  $9042: 64 45     NOP $45
  $9044: 45 DA     EOR $da
  $9046: 08        PHP
  $9047: DF 05 06  DCP $0605,X
  $904A: 62        ???
  $904B: D1 23     CMP ($23),Y
  $904D: D3 63     DCP ($63),Y
  $904F: 7F 44 D9  RRA $d944,X
  $9052: 25 DB     AND $db
  $9054: 45 50     EOR $50
  $9056: 06 07     ASL $07
  $9058: 62        ???
  $9059: D4 63     NOP $63,X
  $905B: D6 44     DEC $44,X
  $905D: DC 25 DE  NOP $de25,X
  $9060: 45 58     EOR $58
  $9062: 26 F4     ROL $f4
  $9064: 27 F6     RLA $f6
  $9066: 07 02     SLO $02
  $9068: 64 D5     NOP $d5
  $906A: 65 D7     ADC $d7
  $906C: E0 91     CPX #$91
  $906E: 02        ???
  $906F: 02        ???
  $9070: 68        PLA
  $9071: 10 69     BPL $90dc
  $9073: 12        ???
  $9074: 03 02     SLO ($02,X)
  $9076: 68        PLA
  $9077: 11 69     ORA ($69),Y
  $9079: 13 04     SLO ($04),Y
  $907B: 02        ???
  $907C: 68        PLA
  $907D: 14 69     NOP $69,X
  $907F: 16 E0     ASL $e0,X
  $9081: 91 02     STA ($02),Y
  $9083: 02        ???
  $9084: 68        PLA
  $9085: 01 69     ORA ($69,X)
  $9087: 86 03     STX $03
  $9089: 02        ???
  $908A: 68        PLA
  $908B: 04 69     NOP $69
  $908D: 87 04     SAX $04
  $908F: 02        ???
  $9090: 68        PLA
  $9091: 05 69     ORA $69
  $9093: 92        ???
  $9094: E0 91     CPX #$91
  $9096: 0C 02 67  NOP $6702
  $9099: 8C 68 8E  STY $8e68
  $909C: 0D 02 67  ORA $6702
  $909F: 98        TYA
  $90A0: 68        PLA
  $90A1: 9A        TXS
  $90A2: E0 0E     CPX #$0e
  $90A4: B6 D0     LDX $d0,Y
  $90A6: DD D0 08  CMP $08d0,X
  $90A9: D1 2F     CMP ($2f),Y
  $90AB: D1 56     CMP ($56),Y
  $90AD: D1 79     CMP ($79),Y
  $90AF: D1 A0     CMP ($a0),Y
  $90B1: D1 C5     CMP ($c5),Y
  $90B3: D1 EC     CMP ($ec),Y
  $90B5: D1 03     CMP ($03),Y
  $90B7: 05 06     ORA $06
  $90B9: 0F 07 25  SLO $2507
  $90BC: 27 C0     RLA $c0
  $90BE: 08        PHP
  $90BF: 27 28     RLA $28
  $90C1: 21 04     AND ($04,X)
  $90C3: 05 06     ORA $06
  $90C5: 1A        NOP
  $90C6: 07 30     SLO $30
  $90C8: 67 C1     RRA $c1
  $90CA: 28        PLP
  $90CB: 32        ???
  $90CC: 68        PLA
  $90CD: 22        ???
  $90CE: 05 05     ORA $05
  $90D0: 06 1B     ASL $1b
  $90D2: 26 08     ROL $08
  $90D4: 07 31     SLO $31
  $90D6: 27 0A     RLA $0a
  $90D8: 28        PLP
  $90D9: 33 20     RLA ($20),Y
  $90DB: 10 D2     BPL $90af
  $90DD: 03 06     SLO ($06,X)
  $90DF: 05 40     ORA $40
  $90E1: 06 42     ASL $42
  $90E3: 07 48     SLO $48
  $90E5: 27 C2     RLA $c2
  $90E7: 08        PHP
  $90E8: 27 28     RLA $28
  $90EA: 21 04     AND ($04,X)
  $90EC: 06 05     ASL $05
  $90EE: 41 06     EOR ($06,X)
  $90F0: 43 07     SRE ($07,X)
  $90F2: 49 67     EOR #$67
  $90F4: C3 28     DCP ($28,X)
  $90F6: 32        ???
  $90F7: 68        PLA
  $90F8: 22        ???
  $90F9: 05 05     ORA $05
  $90FB: 06 46     ASL $46
  $90FD: 26 44     ROL $44
  $90FF: 07 4C     SLO $4c
  $9101: 27 45     RLA $45
  $9103: 28        PLP
  $9104: 33 20     RLA ($20),Y
  $9106: 10 D2     BPL $90da
  $9108: 03 05     SLO ($05,X)
  $910A: 06 50     ASL $50
  $910C: 07 52     SLO $52
  $910E: 27 C8     RLA $c8
  $9110: 08        PHP
  $9111: 58        CLI
  $9112: 28        PLP
  $9113: 5A        NOP
  $9114: 04 05     NOP $05
  $9116: 06 51     ASL $51
  $9118: 07 53     SLO $53
  $911A: 67 C9     RRA $c9
  $911C: 28        PLP
  $911D: 59 68 5B  EOR $5b68,Y
  $9120: 05 05     ORA $05
  $9122: 06 54     ASL $54
  $9124: 26 55     ROL $55
  $9126: 07 56     SLO $56
  $9128: 27 57     RLA $57
  $912A: 28        PLP
  $912B: 33 20     RLA ($20),Y
  $912D: 10 D2     BPL $9101
  $912F: 03 05     SLO ($05,X)
  $9131: 06 0F     ASL $0f
  $9133: 07 25     SLO $25
  $9135: 27 C0     RLA $c0
  $9137: 08        PHP
  $9138: 27 28     RLA $28
  $913A: 21 04     AND ($04,X)
  $913C: 05 06     ORA $06
  $913E: 1A        NOP
  $913F: 07 63     SLO $63
  $9141: 67 CA     RRA $ca
  $9143: 28        PLP
  $9144: 69 68     ADC #$68
  $9146: 6B 05     ARR #$05
  $9148: 05 06     ORA $06
  $914A: 1B 26 08  SLO $0826,Y
  $914D: 07 66     SLO $66
  $914F: 27 67     RLA $67
  $9151: 28        PLP
  $9152: 6C 20 10  JMP ($1020)
  $9155: D2        ???
  $9156: 03 04     SLO ($04,X)
  $9158: 06 70     ASL $70
  $915A: 07 72     SLO $72
  $915C: 27 77     RLA $77
  $915E: 28        PLP
  $915F: 6D 04 05  ADC $0504
  $9162: 06 71     ASL $71
  $9164: 07 73     SLO $73
  $9166: 67 CB     RRA $cb
  $9168: 28        PLP
  $9169: 32        ???
  $916A: 68        PLA
  $916B: 22        ???
  $916C: 05 04     ORA $04
  $916E: 06 74     ASL $74
  $9170: 26 5E     ROL $5e
  $9172: 27 76     RLA $76
  $9174: 28        PLP
  $9175: 33 20     RLA ($20),Y
  $9177: 10 D2     BPL $914b
  $9179: 03 05     SLO ($05,X)
  $917B: 06 80     ASL $80
  $917D: 07 82     SLO $82
  $917F: 27 85     RLA $85
  $9181: 08        PHP
  $9182: 88        DEY
  $9183: 28        PLP
  $9184: 87 04     SAX $04
  $9186: 05 06     ORA $06
  $9188: 81 07     STA ($07,X)
  $918A: 83 67     SAX ($67,X)
  $918C: C4 28     CPY $28
  $918E: 32        ???
  $918F: 68        PLA
  $9190: 22        ???
  $9191: 05 05     ORA $05
  $9193: 06 84     ASL $84
  $9195: 26 2F     ROL $2f
  $9197: 07 86     SLO $86
  $9199: 27 C5     RLA $c5
  $919B: 28        PLP
  $919C: 33 20     RLA ($20),Y
  $919E: 10 D2     BPL $9172
  $91A0: 03 04     SLO ($04,X)
  $91A2: 06 70     ASL $70
  $91A4: 07 92     SLO $92
  $91A6: 27 95     RLA $95
  $91A8: 28        PLP
  $91A9: 98        TYA
  $91AA: 04 05     NOP $05
  $91AC: 06 91     ASL $91
  $91AE: 07 93     SLO $93
  $91B0: 67 C6     RRA $c6
  $91B2: 28        PLP
  $91B3: 32        ???
  $91B4: 68        PLA
  $91B5: 22        ???
  $91B6: 05 05     ORA $05
  $91B8: 06 94     ASL $94
  $91BA: 26 9E     ROL $9e
  $91BC: 07 96     SLO $96
  $91BE: 27 C7     RLA $c7
  $91C0: 28        PLP
  $91C1: 33 20     RLA ($20),Y
  $91C3: 10 D2     BPL $9197
  $91C5: 03 05     SLO ($05,X)
  $91C7: 06 8A     ASL $8a
  $91C9: 07 A0     SLO $a0
  $91CB: 27 CC     RLA $cc
  $91CD: 08        PHP
  $91CE: A2 28     LDX #$28
  $91D0: AA        TAX
  $91D1: 04 05     NOP $05
  $91D3: 06 1A     ASL $1a
  $91D5: 07 A1     SLO $a1
  $91D7: 67 CD     RRA $cd
  $91D9: 28        PLP
  $91DA: A3 68     LAX ($68,X)
  $91DC: AB 05     ATX #$05
  $91DE: 05 06     ORA $06
  $91E0: 8E 26 B0  STX $b026
  $91E3: 07 A4     SLO $a4
  $91E5: 27 A7     RLA $a7
  $91E7: 28        PLP
  $91E8: 33 20     RLA ($20),Y
  $91EA: 27 D2     RLA $d2
  $91EC: 03 05     SLO ($05,X)
  $91EE: 06 50     ASL $50
  $91F0: 07 52     SLO $52
  $91F2: 27 C8     RLA $c8
  $91F4: 08        PHP
  $91F5: 58        CLI
  $91F6: 28        PLP
  $91F7: 5A        NOP
  $91F8: 04 05     NOP $05
  $91FA: 06 51     ASL $51
  $91FC: 07 B9     SLO $b9
  $91FE: 67 CE     RRA $ce
  $9200: 28        PLP
  $9201: BB 68 B4  LAS $b468,Y
  $9204: 05 05     ORA $05
  $9206: 06 54     ASL $54
  $9208: 26 55     ROL $55
  $920A: 07 BC     SLO $bc
  $920C: 27 CF     RLA $cf
  $920E: 28        PLP
  $920F: 33 01     RLA ($01),Y
  $9211: 01 28     ORA ($28,X)
  $9213: 23 02     RLA ($02,X)
  $9215: 02        ???
  $9216: 28        PLP
  $9217: 26 69     ROL $69
  $9219: 2C 03 01  BIT $0103
  $921C: 29 2D     AND #$2d
  $921E: 06 02     ASL $02
  $9220: 26 1E     ROL $1e
  $9222: 27 34     RLA $34
  $9224: 20 3B D2  JSR $d23b
  $9227: 01 01     ORA ($01,X)
  $9229: 68        PLA
  $922A: 9A        TXS
  $922B: 02        ???
  $922C: 02        ???
  $922D: 28        PLP
  $922E: 9B 69 B1  TAS $b169,Y
  $9231: 03 01     SLO ($01,X)
  $9233: 29 A8     AND #$a8
  $9235: 06 02     ASL $02
  $9237: 66 8F     ROR $8f
  $9239: 67 A5     RRA $a5
  $923B: 00        BRK
  $923C: 02        ???
  $923D: 69 28     ADC #$28
  $923F: 6A        ROR A
  $9240: 2A        ROL A
  $9241: 01 03     ORA ($03,X)
  $9243: 25 09     AND $09
  $9245: 69 29     ADC #$29
  $9247: 6A        ROR A
  $9248: 2B 02     ANC #$02
  $924A: 03 25     SLO ($25,X)
  $924C: 0C 26 0E  NOP $0e26
  $924F: 27 24     RLA $24
  $9251: 03 01     SLO ($01,X)
  $9253: 2A        ROL A
  $9254: 6F 04 01  RRA $0104
  $9257: 29 38     AND #$38
  $9259: 05 01     ORA $01
  $925B: 29 39     AND #$39
  $925D: 06 01     ASL $01
  $925F: 65 2E     ADC $2e
  $9261: 07 02     SLO $02
  $9263: 65 1D     ADC $1d
  $9265: 66 1F     ROR $1f
  $9267: 08        PHP
  $9268: 01 65     ORA ($65,X)
  $926A: 17 E0     SLO $e0,X
  $926C: 03 7F     SLO ($7f,X)
  $926E: D2        ???
  $926F: A2 D2     LDX #$d2
  $9271: C3 D2     DCP ($d2,X)
  $9273: E6 D2     INC $d2
  $9275: 07 D3     SLO $d3
  $9277: 28        PLP
  $9278: D3 47     DCP ($47),Y
  $927A: D3 68     DCP ($68),Y
  $927C: D3 8D     DCP ($8d),Y
  $927E: D3 00     DCP ($00),Y
  $9280: 01 02     ORA ($02,X)
  $9282: 3C 01 04  NOP $0401,X
  $9285: 01 37     ORA ($37,X)
  $9287: 02        ???
  $9288: 3D 23 3F  AND $3f23,X
  $928B: 63 36     RRA ($36,X)
  $928D: 02        ???
  $928E: 04 01     NOP $01
  $9290: 62        ???
  $9291: 02        ???
  $9292: 68        PLA
  $9293: 62        ???
  $9294: 34 63     NOP $63,X
  $9296: 6A        ROR A
  $9297: 03 03     SLO ($03,X)
  $9299: 21 63     AND ($63,X)
  $929B: 02        ???
  $929C: 69 22     ADC #$22
  $929E: 35 20     AND $20,X
  $92A0: AD D3 01  LDA $01d3
  $92A3: 04 01     NOP $01
  $92A5: 40        RTI
  $92A6: 02        ???
  $92A7: 42        ???
  $92A8: 03 48     SLO ($48,X)
  $92AA: 23 4D     RLA ($4d,X)
  $92AC: 02        ???
  $92AD: 03 01     SLO ($01,X)
  $92AF: 41 02     EOR ($02,X)
  $92B1: 43 63     SRE ($63,X)
  $92B3: 49 03     EOR #$03
  $92B5: 05 00     ORA $00
  $92B7: 4C 01 44  JMP $4401
  $92BA: 21 45     AND ($45,X)
  $92BC: 02        ???
  $92BD: 46 22     LSR $22
  $92BF: 47 20     SRE $20
  $92C1: AD D3 00  LDA $00d3
  $92C4: 01 02     ORA ($02,X)
  $92C6: 64 01     NOP $01
  $92C8: 04 01     NOP $01
  $92CA: 6C 02 4A  JMP ($4a02)
  $92CD: 23 60     RLA ($60,X)
  $92CF: 63 65     RRA ($65,X)
  $92D1: 02        ???
  $92D2: 04 01     NOP $01
  $92D4: 6D 02 4B  ADC $4b02
  $92D7: 62        ???
  $92D8: 66 63     ROR $63
  $92DA: 61 03     ADC ($03,X)
  $92DC: 03 21     SLO ($21,X)
  $92DE: 4F 02 4E  SRE $4e02
  $92E1: 22        ???
  $92E2: 67 20     RRA $20
  $92E4: AD D3 01  LDA $01d3
  $92E7: 04 01     NOP $01
  $92E9: 50 02     BVC $92ed
  $92EB: 52        ???
  $92EC: 23 58     RLA ($58,X)
  $92EE: 63 5C     RRA ($5c,X)
  $92F0: 02        ???
  $92F1: 04 01     NOP $01
  $92F3: 51 02     EOR ($02),Y
  $92F5: 53 62     SRE ($62),Y
  $92F7: 5D 63 59  EOR $5963,X
  $92FA: 03 04     SLO ($04,X)
  $92FC: 21 55     AND ($55,X)
  $92FE: 01 54     ORA ($54,X)
  $9300: 02        ???
  $9301: 56 22     LSR $22,X
  $9303: 57 20     SRE $20,X
  $9305: AD D3 00  LDA $00d3
  $9308: 01 02     ORA ($02,X)
  $930A: 76 01     ROR $01,X
  $930C: 04 01     NOP $01
  $930E: 5A        NOP
  $930F: 02        ???
  $9310: 70 23     BVS $9335
  $9312: 72        ???
  $9313: 63 77     RRA ($77,X)
  $9315: 02        ???
  $9316: 04 01     NOP $01
  $9318: 5B 02 71  SRE $7102,Y
  $931B: 62        ???
  $931C: 75 63     ADC $63,X
  $931E: 73 03     RRA ($03),Y
  $9320: 02        ???
  $9321: 21 5E     AND ($5e,X)
  $9323: 22        ???
  $9324: 74 20     NOP $20,X
  $9326: AD D3 01  LDA $01d3
  $9329: 04 01     NOP $01
  $932B: 7E 02 78  ROR $7802,X
  $932E: 23 7A     RLA ($7a,X)
  $9330: 63 7D     RRA ($7d,X)
  $9332: 02        ???
  $9333: 04 01     NOP $01
  $9335: 7F 02 79  RRA $7902,X
  $9338: 62        ???
  $9339: 6E 63 7B  ROR $7b63
  $933C: 03 03     SLO ($03,X)
  $933E: 21 5E     AND ($5e,X)
  $9340: 02        ???
  $9341: 7C 22 6F  NOP $6f22,X
  $9344: 20 AD D3  JSR $d3ad
  $9347: 01 05     ORA ($05,X)
  $9349: 01 80     ORA ($80,X)
  $934B: 02        ???
  $934C: 82 62     NOP #$62
  $934E: 84 23     STY $23
  $9350: 88        DEY
  $9351: 63 87     RRA ($87,X)
  $9353: 02        ???
  $9354: 04 01     NOP $01
  $9356: 81 02     STA ($02,X)
  $9358: 83 62     SAX ($62,X)
  $935A: 85 63     STA $63
  $935C: 89 03     NOP #$03
  $935E: 03 21     SLO ($21,X)
  $9360: 5E 22 86  LSR $8622,X
  $9363: 23 8C     RLA ($8c,X)
  $9365: 20 AD D3  JSR $d3ad
  $9368: 01 04     ORA ($04,X)
  $936A: 01 90     ORA ($90,X)
  $936C: 02        ???
  $936D: 92        ???
  $936E: 62        ???
  $936F: 8A        TXA
  $9370: 23 98     RLA ($98,X)
  $9372: 02        ???
  $9373: 05 01     ORA $01
  $9375: 91 02     STA ($02),Y
  $9377: 93 62     ??? ($62),Y
  $9379: 8B 23     XAA #$23
  $937B: 99 63 A0  STA $a063,Y
  $937E: 03 05     SLO ($05,X)
  $9380: 01 94     ORA ($94,X)
  $9382: 21 8F     AND ($8f,X)
  $9384: 02        ???
  $9385: 96 22     STX $22,Y
  $9387: 8E 23 9C  STX $9c23
  $938A: 20 C6 D3  JSR $d3c6
  $938D: 00        BRK
  $938E: 01 02     ORA ($02,X)
  $9390: A6 01     LDX $01
  $9392: 04 01     NOP $01
  $9394: A2 02     LDX #$02
  $9396: A8        TAY
  $9397: 23 AA     RLA ($aa,X)
  $9399: 63 AE     RRA ($ae,X)
  $939B: 02        ???
  $939C: 04 01     NOP $01
  $939E: A3 02     LAX ($02,X)
  $93A0: A9 62     LDA #$62
  $93A2: A5 63     LDA $63
  $93A4: AB 03     ATX #$03
  $93A6: 03 21     SLO ($21,X)
  $93A8: 5E 02 AC  LSR $ac02,X
  $93AB: 22        ???
  $93AC: A7 01     LAX $01
  $93AE: 03 24     SLO ($24,X)
  $93B0: 0B 64     ANC #$64
  $93B2: 02        ???
  $93B3: 25 21     AND $21
  $93B5: 02        ???
  $93B6: 02        ???
  $93B7: 24 0E     BIT $0e
  $93B9: 64 03     NOP $03
  $93BB: 04 03     NOP $03
  $93BD: 21 10     AND ($10,X)
  $93BF: 61 13     ADC ($13,X)
  $93C1: 22        ???
  $93C2: 12        ???
  $93C3: 20 DA D3  JSR $d3da
  $93C6: 01 03     ORA ($03,X)
  $93C8: 24 9A     BIT $9a
  $93CA: 64 A1     NOP $a1
  $93CC: 65 9E     ADC $9e
  $93CE: 02        ???
  $93CF: 02        ???
  $93D0: 24 9B     BIT $9b
  $93D2: 64 A4     NOP $a4
  $93D4: 04 02     NOP $02
  $93D6: 61 3E     ADC ($3e,X)
  $93D8: 22        ???
  $93D9: 8D 03 02  STA $0203
  $93DC: 23 0D     RLA ($0d,X)
  $93DE: 24 0F     BIT $0f
  $93E0: 04 06     NOP $06
  $93E2: 60        RTS
  $93E3: 01 23     ORA ($23,X)
  $93E5: 18        CLC
  $93E6: 24 1A     BIT $1a
  $93E8: 45 30     EOR $30
  $93EA: 46 32     LSR $32
  $93EC: 47 38     SRE $38
  $93EE: 05 07     ORA $07
  $93F0: 60        RTS
  $93F1: 04 61     NOP $61
  $93F3: 11 45     ORA ($45),Y
  $93F5: 31 46     AND ($46),Y
  $93F7: 33 67     RLA ($67),Y
  $93F9: 39 68 3B  AND $3b68,Y
  $93FC: 69 08     ADC #$08
  $93FE: 06 04     ASL $04
  $9400: 60        RTS
  $9401: 05 28     ORA $28
  $9403: 19 29 09  ORA $0929,Y
  $9406: 2A        ROL A
  $9407: 06 07     ASL $07
  $9409: 03 29     SLO ($29,X)
  $940B: 0C 2A 0A  NOP $0a2a
  $940E: 2B 22     ANC #$22
  $9410: 08        PHP
  $9411: 03 2A     SLO ($2a,X)
  $9413: 20 2B 23  JSR $232b
  $9416: 6C 29 E0  JMP ($e029)
  $9419: 83 02     SAX ($02,X)
  $941B: 04 25     NOP $25
  $941D: 24 26     BIT $26
  $941F: 26 27     ROL $27
  $9421: 2C 68 2E  BIT $2e68
  $9424: 03 05     SLO ($05,X)
  $9426: 25 25     AND $25
  $9428: 65 07     ADC $07
  $942A: 26 27     ROL $27
  $942C: 27 2D     RLA $2d
  $942E: 68        PLA
  $942F: 2F 04 01  RLA $0104
  $9432: 68        PLA
  $9433: 3A        NOP
  $9434: E0 83     CPX #$83
  $9436: 0A        ASL A
  $9437: 01 68     ORA ($68,X)
  $9439: 1E 02 03  ASL $0302,X
  $943C: 25 14     AND $14
  $943E: 26 16     ROL $16
  $9440: 27 1C     RLA $1c
  $9442: 0B 01     ANC #$01
  $9444: 68        PLA
  $9445: 1F 03 04  SLO $0403,X
  $9448: 25 15     AND $15
  $944A: 65 2A     ADC $2a
  $944C: 26 17     ROL $17
  $944E: 27 1D     RLA $1d
  $9450: 04 01     NOP $01
  $9452: 68        PLA
  $9453: 2B E0     ANC #$e0
  $9455: 83 0B     SAX ($0b,X)
  $9457: 02        ???
  $9458: 65 B0     ADC $b0
  $945A: 66 B2     ROR $b2
  $945C: 0C 02 65  NOP $6502
  $945F: B1 66     LDA ($66),Y
  $9461: B3 0D     LAX ($0d),Y
  $9463: 02        ???
  $9464: 65 B4     ADC $b4
  $9466: 66 B6     ROR $b6
  $9468: E0 83     CPX #$83
  $946A: 01 02     ORA ($02,X)
  $946C: 66 AD     ROR $ad
  $946E: 67 AF     RRA $af
  $9470: 02        ???
  $9471: 03 66     SLO ($66,X)
  $9473: B8        CLV
  $9474: 67 BA     RRA $ba
  $9476: 68        PLA
  $9477: BB E0 8B  LAS $8be0,Y
  $947A: 0C 01 6E  NOP $6e01
  $947D: 66 E0     ROR $e0
  $947F: 8B 0C     XAA #$0c
  $9481: 01 6E     ORA ($6e,X)
  $9483: 65 E0     ADC $e0
  $9485: 8B 0C     XAA #$0c
  $9487: 01 6E     ORA ($6e,X)
  $9489: 64 E0     NOP $e0
  $948B: 8B 03     XAA #$03
  $948D: 02        ???
  $948E: 65 48     ADC $48
  $9490: 66 4D     ROR $4d
  $9492: 04 02     NOP $02
  $9494: 65 49     ADC $49
  $9496: 66 51     ROR $51
  $9498: E0 8B     CPX #$8b
  $949A: 03 02     SLO ($02,X)
  $949C: 65 60     ADC $60
  $949E: 66 62     ROR $62
  $94A0: 04 02     NOP $02
  $94A2: 65 61     ADC $61
  $94A4: 66 63     ROR $63
  $94A6: E0 8B     CPX #$8b
  $94A8: 03 02     SLO ($02,X)
  $94AA: 65 5C     ADC $5c
  $94AC: 66 5E     ROR $5e
  $94AE: 04 02     NOP $02
  $94B0: 65 5D     ADC $5d
  $94B2: 66 5F     ROR $5f
  $94B4: E0 8B     CPX #$8b
  $94B6: 03 02     SLO ($02,X)
  $94B8: 65 58     ADC $58
  $94BA: 66 5A     ROR $5a
  $94BC: 04 02     NOP $02
  $94BE: 65 59     ADC $59
  $94C0: 66 5B     ROR $5b
  $94C2: E0 8B     CPX #$8b
  $94C4: 0B 02     ANC #$02
  $94C6: 65 52     ADC $52
  $94C8: 66 55     ROR $55
  $94CA: 0C 02 65  NOP $6502
  $94CD: 53 66     SRE ($66),Y
  $94CF: 56 0D     LSR $0d,X
  $94D1: 02        ???
  $94D2: 65 54     ADC $54
  $94D4: 66 57     ROR $57
  $94D6: E0 8B     CPX #$8b
  $94D8: 0B 02     ANC #$02
  $94DA: 65 4A     ADC $4a
  $94DC: 66 4E     ROR $4e
  $94DE: 0C 02 65  NOP $6502
  $94E1: 4B 66     ALR #$66
  $94E3: 4F 0D 02  SRE $020d
  $94E6: 65 4C     ADC $4c
  $94E8: 66 50     ROR $50
  $94EA: E0 8B     CPX #$8b
  $94EC: 02        ???
  $94ED: 03 6D     SLO ($6d,X)
  $94EF: 47 6E     SRE $6e
  $94F1: 3F 6F 43  RLA $436f,X
  $94F4: 03 03     SLO ($03,X)
  $94F6: 6D 3D 6E  ADC $6e3d
  $94F9: 40        RTI
  $94FA: 6F 44 04  RRA $0444
  $94FD: 03 6D     SLO ($6d,X)
  $94FF: 3E 6E 41  ROL $416e,X
  $9502: 6F 45 05  RRA $0545
  $9505: 02        ???
  $9506: 6E 42 6F  ROR $6f42
  $9509: 46 E0     LSR $e0
  $950B: 8B 02     XAA #$02
  $950D: 03 64     SLO ($64,X)
  $950F: 2F 65 32  RLA $3265
  $9512: 66 36     ROR $36
  $9514: 03 04     SLO ($04,X)
  $9516: 64 30     NOP $30
  $9518: 65 33     ADC $33
  $951A: 66 37     ROR $37
  $951C: 67 3A     RRA $3a
  $951E: 04 04     NOP $04
  $9520: 64 31     NOP $31
  $9522: 65 34     ADC $34
  $9524: 66 38     ROR $38
  $9526: 67 3B     RRA $3b
  $9528: 05 03     ORA $03
  $952A: 65 35     ADC $35
  $952C: 66 39     ROR $39
  $952E: 67 3C     RRA $3c
  $9530: E0 8B     CPX #$8b
  $9532: 01 02     ORA ($02,X)
  $9534: 64 1C     NOP $1c
  $9536: 65 20     ADC $20
  $9538: 02        ???
  $9539: 04 64     NOP $64
  $953B: 1D 65 21  ORA $2165,X
  $953E: 66 25     ROR $25
  $9540: 67 2A     RRA $2a
  $9542: 03 04     SLO ($04,X)
  $9544: 64 1E     NOP $1e
  $9546: 65 22     ADC $22
  $9548: 66 26     ROR $26
  $954A: 67 2B     RRA $2b
  $954C: 04 04     NOP $04
  $954E: 64 1F     NOP $1f
  $9550: 65 23     ADC $23
  $9552: 66 27     ROR $27
  $9554: 67 2C     RRA $2c
  $9556: 05 03     ORA $03
  $9558: 65 24     ADC $24
  $955A: 66 28     ROR $28
  $955C: 67 2D     RRA $2d
  $955E: 06 02     ASL $02
  $9560: 66 29     ROR $29
  $9562: 67 2E     RRA $2e
  $9564: E0 8B     CPX #$8b
  $9566: 01 03     ORA ($03,X)
  $9568: 64 04     NOP $04
  $956A: 65 09     ADC $09
  $956C: 66 0F     ROR $0f
  $956E: 02        ???
  $956F: 05 63     ORA $63
  $9571: 01 64     ORA ($64,X)
  $9573: 05 65     ORA $65
  $9575: 0A        ASL A
  $9576: 66 10     ROR $10
  $9578: 67 15     RRA $15
  $957A: 03 05     SLO ($05,X)
  $957C: 63 02     RRA ($02,X)
  $957E: 64 06     NOP $06
  $9580: 65 0B     ADC $0b
  $9582: 66 11     ROR $11
  $9584: 67 16     RRA $16
  $9586: 04 06     NOP $06
  $9588: 63 03     RRA ($03,X)
  $958A: 64 07     NOP $07
  $958C: 65 0C     ADC $0c
  $958E: 66 12     ROR $12
  $9590: 67 17     RRA $17
  $9592: 68        PLA
  $9593: 1A        NOP
  $9594: 05 05     ORA $05
  $9596: 64 08     NOP $08
  $9598: 65 0D     ADC $0d
  $959A: 66 13     ROR $13
  $959C: 67 18     RRA $18
  $959E: 68        PLA
  $959F: 1B 06 03  SLO $0306,Y
  $95A2: 65 0E     ADC $0e
  $95A4: 66 14     ROR $14
  $95A6: 67 19     RRA $19
  $95A8: E0 17     CPX #$17
  $95AA: BD D5 DF  LDA $dfd5,X
  $95AD: D5 01     CMP $01,X
  $95AF: D6 23     DEC $23,X
  $95B1: D6 43     DEC $43,X
  $95B3: D6 65     DEC $65,X
  $95B5: D6 87     DEC $87,X
  $95B7: D6 A9     DEC $a9,X
  $95B9: D6 CB     DEC $cb,X
  $95BB: D6 40     DEC $40,X
  $95BD: 03 04     SLO ($04,X)
  $95BF: 02        ???
  $95C0: 01 22     ORA ($22,X)
  $95C2: 06 23     ASL $23
  $95C4: 0C 01 16  NOP $1601
  $95C7: 04 04     NOP $04
  $95C9: 01 05     ORA ($05,X)
  $95CB: 02        ???
  $95CC: 07 63     SLO $63
  $95CE: 03 23     SLO ($23,X)
  $95D0: 0D 05 04  ORA $0405
  $95D3: 01 10     ORA ($10,X)
  $95D5: 02        ???
  $95D6: 04 22     NOP $22
  $95D8: 12        ???
  $95D9: 23 18     RLA ($18,X)
  $95DB: 20 ED D6  JSR $d6ed
  $95DE: 40        RTI
  $95DF: 03 04     SLO ($04,X)
  $95E1: 01 15     ORA ($15,X)
  $95E3: 02        ???
  $95E4: 17 22     SLO $22,X
  $95E6: 06 23     ASL $23
  $95E8: 0C 04 04  NOP $0404
  $95EB: 01 40     ORA ($40,X)
  $95ED: 02        ???
  $95EE: 42        ???
  $95EF: 63 48     RRA ($48,X)
  $95F1: 23 0D     RLA ($0d,X)
  $95F3: 05 04     ORA $04
  $95F5: 01 41     ORA ($41,X)
  $95F7: 02        ???
  $95F8: 43 22     SRE ($22,X)
  $95FA: 12        ???
  $95FB: 23 49     RLA ($49,X)
  $95FD: 20 ED D6  JSR $d6ed
  $9600: 40        RTI
  $9601: 03 04     SLO ($04,X)
  $9603: 01 4A     ORA ($4a,X)
  $9605: 02        ???
  $9606: 60        RTS
  $9607: 22        ???
  $9608: 06 23     ASL $23
  $960A: 35 04     AND $04,X
  $960C: 04 01     NOP $01
  $960E: 4B 02     ALR #$02
  $9610: 61 63     ADC ($63,X)
  $9612: 62        ???
  $9613: 23 0D     RLA ($0d,X)
  $9615: 05 04     ORA $04
  $9617: 01 4E     ORA ($4e,X)
  $9619: 02        ???
  $961A: 64 22     NOP $22
  $961C: 12        ???
  $961D: 23 63     RLA ($63,X)
  $961F: 20 ED D6  JSR $d6ed
  $9622: 40        RTI
  $9623: 03 03     SLO ($03,X)
  $9625: 02        ???
  $9626: 69 22     ADC #$22
  $9628: 06 23     ASL $23
  $962A: 0C 04 04  NOP $0404
  $962D: 01 66     ORA ($66,X)
  $962F: 02        ???
  $9630: 6C 63 68  JMP ($6863)
  $9633: 23 0D     RLA ($0d,X)
  $9635: 05 04     ORA $04
  $9637: 01 67     ORA ($67,X)
  $9639: 02        ???
  $963A: 6D 22 12  ADC $1222
  $963D: 23 18     RLA ($18,X)
  $963F: 20 ED D6  JSR $d6ed
  $9642: 40        RTI
  $9643: 03 04     SLO ($04,X)
  $9645: 01 51     ORA ($51,X)
  $9647: 02        ???
  $9648: 53 22     SRE ($22),Y
  $964A: 06 23     ASL $23
  $964C: 35 04     AND $04,X
  $964E: 04 01     NOP $01
  $9650: 54 02     NOP $02,X
  $9652: 56 63     LSR $63,X
  $9654: 5C 23 0D  NOP $0d23,X
  $9657: 05 04     ORA $04
  $9659: 01 55     ORA ($55,X)
  $965B: 02        ???
  $965C: 57 22     SRE $22,X
  $965E: 12        ???
  $965F: 23 5D     RLA ($5d,X)
  $9661: 20 ED D6  JSR $d6ed
  $9664: 40        RTI
  $9665: 03 03     SLO ($03,X)
  $9667: 02        ???
  $9668: 6F 22 06  RRA $0622
  $966B: 23 C5     RLA ($c5,X)
  $966D: 04 05     NOP $05
  $966F: 01 78     ORA ($78,X)
  $9671: 62        ???
  $9672: 72        ???
  $9673: 02        ???
  $9674: 0D 63 D0  ORA $d063
  $9677: 23 0D     RLA ($0d,X)
  $9679: 05 04     ORA $04
  $967B: 01 79     ORA ($79,X)
  $967D: 02        ???
  $967E: 7B 22 12  RRA $1222,Y
  $9681: 23 D1     RLA ($d1,X)
  $9683: 20 ED D6  JSR $d6ed
  $9686: 40        RTI
  $9687: 03 04     SLO ($04,X)
  $9689: 81 97     STA ($97,X)
  $968B: 02        ???
  $968C: C8        INY
  $968D: 22        ???
  $968E: 06 23     ASL $23
  $9690: CA        DEX
  $9691: 04 04     NOP $04
  $9693: 01 C3     ORA ($c3,X)
  $9695: 62        ???
  $9696: C9 02     CMP #$02
  $9698: 0D 23 CB  ORA $cb23
  $969B: 05 04     ORA $04
  $969D: 01 C6     ORA ($c6,X)
  $969F: 02        ???
  $96A0: CC 22 12  CPY $1222
  $96A3: 23 CE     RLA ($ce,X)
  $96A5: 20 ED D6  JSR $d6ed
  $96A8: 40        RTI
  $96A9: 03 04     SLO ($04,X)
  $96AB: 01 82     ORA ($82,X)
  $96AD: 02        ???
  $96AE: 8A        TXA
  $96AF: 22        ???
  $96B0: 88        DEY
  $96B1: 23 A5     RLA ($a5,X)
  $96B3: 04 04     NOP $04
  $96B5: 01 83     ORA ($83,X)
  $96B7: 02        ???
  $96B8: A0 63     LDY #$63
  $96BA: B0 23     BCS $96df
  $96BC: 0D 05 04  ORA $0405
  $96BF: 01 89     ORA ($89,X)
  $96C1: 02        ???
  $96C2: A1 22     LDA ($22,X)
  $96C4: 8B 23     XAA #$23
  $96C6: B1 20     LDA ($20),Y
  $96C8: FB D6 40  ISB $40d6,Y
  $96CB: 03 04     SLO ($04,X)
  $96CD: 01 4A     ORA ($4a,X)
  $96CF: 02        ???
  $96D0: 60        RTS
  $96D1: 22        ???
  $96D2: 06 23     ASL $23
  $96D4: 35 04     AND $04,X
  $96D6: 04 01     NOP $01
  $96D8: 4B 02     ALR #$02
  $96DA: 85 63     STA $63
  $96DC: 62        ???
  $96DD: 23 0D     RLA ($0d,X)
  $96DF: 05 04     ORA $04
  $96E1: 01 91     ORA ($91,X)
  $96E3: 02        ???
  $96E4: 90 22     BCC $9708
  $96E6: 12        ???
  $96E7: 23 63     RLA ($63,X)
  $96E9: 20 ED D6  JSR $d6ed
  $96EC: 40        RTI
  $96ED: 06 01     ASL $01
  $96EF: 22        ???
  $96F0: 13 02     SLO ($02),Y
  $96F2: 02        ???
  $96F3: 63 02     RRA ($02,X)
  $96F5: 23 09     RLA ($09,X)
  $96F7: 20 06 D7  JSR $d706
  $96FA: 40        RTI
  $96FB: 06 01     ASL $01
  $96FD: 62        ???
  $96FE: 9B 02 01  TAS $0102,Y
  $9701: 63 A4     RRA ($a4,X)
  $9703: 20 06 D7  JSR $d706
  $9706: 01 02     ORA ($02,X)
  $9708: 63 08     RRA ($08,X)
  $970A: 64 0A     NOP $0a
  $970C: 02        ???
  $970D: 01 64     ORA ($64,X)
  $970F: 0B 03     ANC #$03
  $9711: 06 44     ASL $44
  $9713: 20 24 0E  JSR $0e24
  $9716: 45 24     EOR $24
  $9718: 66 22     ROR $22
  $971A: 46 26     LSR $26
  $971C: 67 2C     RRA $2c
  $971E: 04 06     NOP $06
  $9720: 44 21     NOP $21
  $9722: 24 0F     BIT $0f
  $9724: 45 25     EOR $25
  $9726: 46 27     LSR $27
  $9728: 27 2D     RLA $2d
  $972A: 28        PLP
  $972B: 2F 05 08  RLA $0805
  $972E: 44 23     NOP $23
  $9730: 24 1A     BIT $1a
  $9732: 65 29     ADC $29
  $9734: 45 30     EOR $30
  $9736: 66 28     ROR $28
  $9738: 46 32     LSR $32
  $973A: 27 38     RLA $38
  $973C: 28        PLP
  $973D: 3A        NOP
  $973E: 06 01     ASL $01
  $9740: 61 11     ADC ($11,X)
  $9742: 07 01     SLO $01
  $9744: 61 14     ADC ($14,X)
  $9746: E0 18     CPX #$18
  $9748: 5B D7 7D  SRE $7dd7,Y
  $974B: D7 9F     DCP $9f,X
  $974D: D7 C3     DCP $c3,X
  $974F: D7 E5     DCP $e5,X
  $9751: D7 07     DCP $07,X
  $9753: D8        CLD
  $9754: 2B D8     ANC #$d8
  $9756: 4D D8 6F  EOR $6fd8
  $9759: D8        CLD
  $975A: 40        RTI
  $975B: 03 04     SLO ($04,X)
  $975D: 01 04     ORA ($04,X)
  $975F: 02        ???
  $9760: 09 22     ORA #$22
  $9762: 06 23     ASL $23
  $9764: 0C 04 04  NOP $0404
  $9767: 01 05     ORA ($05,X)
  $9769: 02        ???
  $976A: 07 63     SLO $63
  $976C: 0A        ASL A
  $976D: 23 0D     RLA ($0d,X)
  $976F: 05 04     ORA $04
  $9771: 01 10     ORA ($10,X)
  $9773: 02        ???
  $9774: 0B 22     ANC #$22
  $9776: 12        ???
  $9777: 23 18     RLA ($18,X)
  $9779: 20 93 D8  JSR $d893
  $977C: 40        RTI
  $977D: 03 04     SLO ($04,X)
  $977F: 01 11     ORA ($11,X)
  $9781: 02        ???
  $9782: 16 22     ASL $22,X
  $9784: 06 23     ASL $23
  $9786: 0C 04 04  NOP $0404
  $9789: 01 14     ORA ($14,X)
  $978B: 02        ???
  $978C: 17 63     SLO $63,X
  $978E: 1D 23 0D  ORA $0d23,X
  $9791: 05 04     ORA $04
  $9793: 01 15     ORA ($15,X)
  $9795: 02        ???
  $9796: 42        ???
  $9797: 22        ???
  $9798: 12        ???
  $9799: 23 18     RLA ($18,X)
  $979B: 20 93 D8  JSR $d893
  $979E: 40        RTI
  $979F: 03 04     SLO ($04,X)
  $97A1: 01 45     ORA ($45,X)
  $97A3: 02        ???
  $97A4: 52        ???
  $97A5: 22        ???
  $97A6: 06 23     ASL $23
  $97A8: 58        CLI
  $97A9: 04 05     NOP $05
  $97AB: 01 50     ORA ($50,X)
  $97AD: 62        ???
  $97AE: 53 02     SRE ($02),Y
  $97B0: 0D 63 59  ORA $5963
  $97B3: 23 0D     RLA ($0d,X)
  $97B5: 05 04     ORA $04
  $97B7: 01 51     ORA ($51,X)
  $97B9: 02        ???
  $97BA: 56 22     LSR $22,X
  $97BC: 12        ???
  $97BD: 23 5C     RLA ($5c,X)
  $97BF: 20 93 D8  JSR $d893
  $97C2: 40        RTI
  $97C3: 03 04     SLO ($04,X)
  $97C5: 01 04     ORA ($04,X)
  $97C7: 02        ???
  $97C8: 65 22     ADC $22
  $97CA: 06 23     ASL $23
  $97CC: 0C 04 04  NOP $0404
  $97CF: 01 4E     ORA ($4e,X)
  $97D1: 02        ???
  $97D2: 70 63     BVS $9837
  $97D4: 5A        NOP
  $97D5: 23 0D     RLA ($0d,X)
  $97D7: 05 04     ORA $04
  $97D9: 01 4F     ORA ($4f,X)
  $97DB: 02        ???
  $97DC: 71 22     ADC ($22),Y
  $97DE: 12        ???
  $97DF: 23 5B     RLA ($5b,X)
  $97E1: 20 93 D8  JSR $d893
  $97E4: 40        RTI
  $97E5: 03 04     SLO ($04,X)
  $97E7: 01 3B     ORA ($3b,X)
  $97E9: 02        ???
  $97EA: 3F 22 06  RLA $0622,X
  $97ED: 23 58     RLA ($58,X)
  $97EF: 04 04     NOP $04
  $97F1: 01 3E     ORA ($3e,X)
  $97F3: 62        ???
  $97F4: 6A        ROR A
  $97F5: 02        ???
  $97F6: 0D 23 95  ORA $9523
  $97F9: 05 04     ORA $04
  $97FB: 01 68     ORA ($68,X)
  $97FD: 02        ???
  $97FE: 6B 22     ARR #$22
  $9800: 12        ???
  $9801: 23 C0     RLA ($c0,X)
  $9803: 20 93 D8  JSR $d893
  $9806: 40        RTI
  $9807: 03 04     SLO ($04,X)
  $9809: 01 72     ORA ($72,X)
  $980B: 02        ???
  $980C: 78        SEI
  $980D: 22        ???
  $980E: 06 23     ASL $23
  $9810: 7A        NOP
  $9811: 04 05     NOP $05
  $9813: 01 73     ORA ($73,X)
  $9815: 62        ???
  $9816: 79 02 0D  ADC $0d02,Y
  $9819: 63 7B     RRA ($7b,X)
  $981B: 23 0D     RLA ($0d,X)
  $981D: 05 04     ORA $04
  $981F: 01 76     ORA ($76,X)
  $9821: 02        ???
  $9822: 7C 22 12  NOP $1222,X
  $9825: 23 7E     RLA ($7e,X)
  $9827: 20 93 D8  JSR $d893
  $982A: 40        RTI
  $982B: 03 04     SLO ($04,X)
  $982D: 01 97     ORA ($97,X)
  $982F: 02        ???
  $9830: 9D 22 06  STA $0622,X
  $9833: 23 9F     RLA ($9f,X)
  $9835: 04 04     NOP $04
  $9837: 01 C2     ORA ($c2,X)
  $9839: 62        ???
  $983A: C8        INY
  $983B: 02        ???
  $983C: 0D 23 CA  ORA $ca23
  $983F: 05 04     ORA $04
  $9841: 01 C3     ORA ($c3,X)
  $9843: 02        ???
  $9844: C9 22     CMP #$22
  $9846: 12        ???
  $9847: 23 CB     RLA ($cb,X)
  $9849: 20 93 D8  JSR $d893
  $984C: 40        RTI
  $984D: 03 04     SLO ($04,X)
  $984F: 01 A0     ORA ($a0,X)
  $9851: 02        ???
  $9852: A2 22     LDX #$22
  $9854: A8        TAY
  $9855: 23 AE     RLA ($ae,X)
  $9857: 04 04     NOP $04
  $9859: 01 A1     ORA ($a1,X)
  $985B: 02        ???
  $985C: A3 63     LAX ($63,X)
  $985E: A9 23     LDA #$23
  $9860: 0D 05 04  ORA $0405
  $9863: 01 A4     ORA ($a4,X)
  $9865: 02        ???
  $9866: A6 22     LDX $22
  $9868: AB 23     ATX #$23
  $986A: AC 20 A7  LDY $a720
  $986D: D8        CLD
  $986E: 40        RTI
  $986F: 03 04     SLO ($04,X)
  $9871: 01 45     ORA ($45,X)
  $9873: 02        ???
  $9874: 52        ???
  $9875: 22        ???
  $9876: 06 23     ASL $23
  $9878: 58        CLI
  $9879: 04 05     NOP $05
  $987B: 01 50     ORA ($50,X)
  $987D: 62        ???
  $987E: 74 02     NOP $02,X
  $9880: 0D 63 59  ORA $5963
  $9883: 23 0D     RLA ($0d,X)
  $9885: 05 04     ORA $04
  $9887: 01 4D     ORA ($4d,X)
  $9889: 02        ???
  $988A: 75 22     ADC $22,X
  $988C: 12        ???
  $988D: 23 5C     RLA ($5c,X)
  $988F: 20 93 D8  JSR $d893
  $9892: 40        RTI
  $9893: 02        ???
  $9894: 01 62     ORA ($62,X)
  $9896: 03 05     SLO ($05,X)
  $9898: 02        ???
  $9899: 44 20     NOP $20
  $989B: 24 1A     BIT $1a
  $989D: 06 02     ASL $02
  $989F: 23 19     RLA ($19,X)
  $98A1: 24 1B     BIT $1b
  $98A3: 20 B8 D8  JSR $d8b8
  $98A6: 40        RTI
  $98A7: 02        ???
  $98A8: 01 62     ORA ($62,X)
  $98AA: AA        TAX
  $98AB: 05 01     ORA $01
  $98AD: 24 C5     BIT $c5
  $98AF: 06 02     ASL $02
  $98B1: 23 AD     RLA ($ad,X)
  $98B3: 24 AF     BIT $af
  $98B5: 20 B8 D8  JSR $d8b8
  $98B8: 01 02     ORA ($02,X)
  $98BA: 62        ???
  $98BB: 02        ???
  $98BC: 63 08     RRA ($08,X)
  $98BE: 02        ???
  $98BF: 03 61     SLO ($61,X)
  $98C1: 01 65     ORA ($65,X)
  $98C3: 21 46     AND ($46,X)
  $98C5: 23 03     RLA ($03,X)
  $98C7: 05 44     ORA $44
  $98C9: 28        PLP
  $98CA: 24 0E     BIT $0e
  $98CC: 65 24     ADC $24
  $98CE: 66 26     ROR $26
  $98D0: 67 2C     RRA $2c
  $98D2: 04 06     NOP $06
  $98D4: 44 22     NOP $22
  $98D6: 24 0F     BIT $0f
  $98D8: 45 25     EOR $25
  $98DA: 46 27     LSR $27
  $98DC: 27 2D     RLA $2d
  $98DE: 28        PLP
  $98DF: 2F 05 06  RLA $0605
  $98E2: 45 30     EOR $30
  $98E4: 66 2E     ROR $2e
  $98E6: 46 32     LSR $32
  $98E8: 67 84     RRA $84
  $98EA: 27 38     RLA $38
  $98EC: 28        PLP
  $98ED: 3A        NOP
  $98EE: 07 02     SLO $02
  $98F0: 63 1C     RRA ($1c,X)
  $98F2: 64 1E     NOP $1e
  $98F4: E0 17     CPX #$17
  $98F6: BC D5 DE  LDY $ded5,X
  $98F9: D5 00     CMP $00,X
  $98FB: D6 22     DEC $22,X
  $98FD: D6 42     DEC $42,X
  $98FF: D6 64     DEC $64,X
  $9901: D6 86     DEC $86,X
  $9903: D6 A8     DEC $a8,X
  $9905: D6 CA     DEC $ca,X
  $9907: D6 18     DEC $18,X
  $9909: 5A        NOP
  $990A: D7 7C     DCP $7c,X
  $990C: D7 9E     DCP $9e,X
  $990E: D7 C2     DCP $c2,X
  $9910: D7 E4     DCP $e4,X
  $9912: D7 06     DCP $06,X
  $9914: D8        CLD
  $9915: 2A        ROL A
  $9916: D8        CLD
  $9917: 4C D8 6E  JMP $6ed8
  $991A: D8        CLD
  $991B: 97 04     SAX $04,Y
  $991D: 03 29     SLO ($29,X)
  $991F: 2A        ROL A
  $9920: 2A        ROL A
  $9921: 80 6B     NOP #$6b
  $9923: 2E 05 03  ROL $0305
  $9926: 29 2B     AND #$2b
  $9928: 2A        ROL A
  $9929: 81 6B     STA ($6b,X)
  $992B: 84 E0     STY $e0
  $992D: 97 40     SAX $40,Y
  $992F: 20 1C D9  JSR $d91c
  $9932: 98        TYA
  $9933: 04 03     NOP $03
  $9935: 29 91     AND #$91
  $9937: 2A        ROL A
  $9938: 93 6B     ??? ($6b),Y
  $993A: 99 05 43  STA $4305,Y
  $993D: 29 94     AND #$94
  $993F: 2A        ROL A
  $9940: 96 6B     STX $6b,Y
  $9942: 9C E0 98  SHY $98e0,X
  $9945: 40        RTI
  $9946: 20 33 D9  JSR $d933
  $9949: 97 03     SAX $03,Y
  $994B: 03 6A     SLO ($6a,X)
  $994D: 86 6B     STX $6b
  $994F: 8C 6C 8E  STY $8e6c
  $9952: 04 03     NOP $03
  $9954: 6A        ROR A
  $9955: 87 6B     SAX $6b
  $9957: 8D 6C 8F  STA $8f6c
  $995A: 05 03     ORA $03
  $995C: 6A        ROR A
  $995D: 92        ???
  $995E: 6B 98     ARR #$98
  $9960: 6C 9A E0  JMP ($e09a)
  $9963: 98        TYA
  $9964: 02        ???
  $9965: 02        ???
  $9966: 6A        ROR A
  $9967: 86 6B     STX $6b
  $9969: 8C 03 03  STY $0303
  $996C: 6A        ROR A
  $996D: 87 6B     SAX $6b
  $996F: 8D 6C 8F  STA $8f6c
  $9972: 04 02     NOP $02
  $9974: 6A        ROR A
  $9975: 92        ???
  $9976: 6B 98     ARR #$98
  $9978: E0 97     CPX #$97
  $997A: 02        ???
  $997B: 04 29     NOP $29
  $997D: 33 6A     RLA ($6a),Y
  $997F: 37 2A     RLA $2a,X
  $9981: 39 6B 3B  AND $3b6b,Y
  $9984: 03 03     SLO ($03,X)
  $9986: 29 36     AND #$36
  $9988: 6A        ROR A
  $9989: 3C 6B 3E  NOP $3e6b,X
  $998C: 04 02     NOP $02
  $998E: 6A        ROR A
  $998F: 3D 6B 3F  AND $3f6b,X
  $9992: E0 98     CPX #$98
  $9994: 03 03     SLO ($03,X)
  $9996: 69 29     ADC #$29
  $9998: 6A        ROR A
  $9999: 85 6B     STA $6b
  $999B: 82 04     NOP #$04
  $999D: 03 69     SLO ($69,X)
  $999F: 2A        ROL A
  $99A0: 6A        ROR A
  $99A1: 80 6B     NOP #$6b
  $99A3: 83 05     SAX ($05,X)
  $99A5: 03 69     SLO ($69,X)
  $99A7: 2B 6A     ANC #$6a
  $99A9: 81 6B     STA ($6b,X)
  $99AB: 90 E0     BCC $998d
  $99AD: 17 C0     SLO $c0,X
  $99AF: D9 E3 D9  CMP $d9e3,Y
  $99B2: 06 DA     ASL $da
  $99B4: 29 DA     AND #$da
  $99B6: 4C DA 6B  JMP $6bda
  $99B9: DA        NOP
  $99BA: 8C DA AD  STY $adda
  $99BD: DA        NOP
  $99BE: D0 DA     BNE $999a
  $99C0: 02        ???
  $99C1: 04 01     NOP $01
  $99C3: 19 02 AD  ORA $ad02,Y
  $99C6: A2 12     LDX #$12
  $99C8: 23 AE     RLA ($ae,X)
  $99CA: 03 05     SLO ($05,X)
  $99CC: 01 A7     ORA ($a7,X)
  $99CE: 02        ???
  $99CF: B8        CLV
  $99D0: 63 BA     RRA ($ba,X)
  $99D2: 03 AF     SLO ($af,X)
  $99D4: 23 0D     RLA ($0d,X)
  $99D6: 04 04     NOP $04
  $99D8: 01 B2     ORA ($b2,X)
  $99DA: 02        ???
  $99DB: B9 A2 06  LDA $06a2,Y
  $99DE: 23 BB     RLA ($bb,X)
  $99E0: 20 EC D6  JSR $d6ec
  $99E3: 02        ???
  $99E4: 04 01     NOP $01
  $99E6: 44 02     NOP $02
  $99E8: 9E A2 12  SHX $12a2,Y
  $99EB: 23 B4     RLA ($b4,X)
  $99ED: 03 04     SLO ($04,X)
  $99EF: 01 45     ORA ($45,X)
  $99F1: 02        ???
  $99F2: 9F 63 B5  ??? $b563,Y
  $99F5: 23 0D     RLA ($0d,X)
  $99F7: 04 05     NOP $05
  $99F9: 01 50     ORA ($50,X)
  $99FB: 02        ???
  $99FC: C2 A2     NOP #$a2
  $99FE: 06 23     ASL $23
  $9A00: E0 03     CPX #$03
  $9A02: 0D 20 EC  ORA $ec20
  $9A05: D6 02     DEC $02,X
  $9A07: 04 01     NOP $01
  $9A09: 4D 02 B3  EOR $b302
  $9A0C: A2 12     LDX #$12
  $9A0E: 23 BC     RLA ($bc,X)
  $9A10: 03 04     SLO ($04,X)
  $9A12: 01 58     ORA ($58,X)
  $9A14: 02        ???
  $9A15: B6 63     LDX $63,Y
  $9A17: BD 23 0D  LDA $0d23,X
  $9A1A: 04 05     NOP $05
  $9A1C: 01 59     ORA ($59,X)
  $9A1E: 02        ???
  $9A1F: B7 A2     LAX $a2,Y
  $9A21: 06 23     ASL $23
  $9A23: E8        INX
  $9A24: 03 0D     SLO ($0d,X)
  $9A26: 20 EC D6  JSR $d6ec
  $9A29: 02        ???
  $9A2A: 04 01     NOP $01
  $9A2C: E1 02     SBC ($02,X)
  $9A2E: E2 A2     NOP #$a2
  $9A30: 12        ???
  $9A31: 23 E9     RLA ($e9,X)
  $9A33: 03 04     SLO ($04,X)
  $9A35: 01 1C     ORA ($1c,X)
  $9A37: 02        ???
  $9A38: E3 63     ISB ($63,X)
  $9A3A: EC 23 0D  CPX $0d23
  $9A3D: 04 05     NOP $05
  $9A3F: 01 1D     ORA ($1d,X)
  $9A41: 02        ???
  $9A42: E6 A2     INC $a2
  $9A44: 06 23     ASL $23
  $9A46: E4 03     CPX $03
  $9A48: 0D 20 EC  ORA $ec20
  $9A4B: D6 02     DEC $02,X
  $9A4D: 04 01     NOP $01
  $9A4F: CF 02 E5  DCP $e502
  $9A52: A2 12     LDX #$12
  $9A54: 23 E7     RLA ($e7,X)
  $9A56: 03 04     SLO ($04,X)
  $9A58: 01 DA     ORA ($da,X)
  $9A5A: 02        ???
  $9A5B: F0 63     BEQ $9ac0
  $9A5D: F2        ???
  $9A5E: 23 0D     RLA ($0d,X)
  $9A60: 04 03     NOP $03
  $9A62: 02        ???
  $9A63: F1 A2     SBC ($a2),Y
  $9A65: 06 23     ASL $23
  $9A67: BB 20 EC  LAS $ec20,Y
  $9A6A: D6 02     DEC $02,X
  $9A6C: 04 01     NOP $01
  $9A6E: 7C 02 7E  NOP $7e02,X
  $9A71: A2 12     LDX #$12
  $9A73: 23 6E     RLA ($6e,X)
  $9A75: 03 04     SLO ($04,X)
  $9A77: 01 96     ORA ($96,X)
  $9A79: 02        ???
  $9A7A: 7F 63 D4  RRA $d463,X
  $9A7D: 23 0D     RLA ($0d,X)
  $9A7F: 04 04     NOP $04
  $9A81: 01 97     ORA ($97,X)
  $9A83: 02        ???
  $9A84: 7D A2 06  ADC $06a2,X
  $9A87: 23 D5     RLA ($d5,X)
  $9A89: 20 EC D6  JSR $d6ec
  $9A8C: 02        ???
  $9A8D: 04 01     NOP $01
  $9A8F: D6 02     DEC $02,X
  $9A91: DC A2 12  NOP $12a2,X
  $9A94: 23 DB     RLA ($db,X)
  $9A96: 03 05     SLO ($05,X)
  $9A98: 01 D7     ORA ($d7,X)
  $9A9A: 62        ???
  $9A9B: DD 02 0D  CMP $0d02,X
  $9A9E: 63 DE     RRA ($de,X)
  $9AA0: 23 0D     RLA ($0d,X)
  $9AA2: 04 03     NOP $03
  $9AA4: 02        ???
  $9AA5: DF A2 06  DCP $06a2,X
  $9AA8: 23 F4     RLA ($f4,X)
  $9AAA: 20 EC D6  JSR $d6ec
  $9AAD: 02        ???
  $9AAE: 04 01     NOP $01
  $9AB0: A2 02     LDX #$02
  $9AB2: BE A2 8B  LDX $8ba2,Y
  $9AB5: 23 EB     RLA ($eb,X)
  $9AB7: 03 04     SLO ($04,X)
  $9AB9: 01 A3     ORA ($a3,X)
  $9ABB: 02        ???
  $9ABC: BF 63 EE  LAX $ee63,Y
  $9ABF: 23 0D     RLA ($0d,X)
  $9AC1: 04 05     NOP $05
  $9AC3: 01 A6     ORA ($a6,X)
  $9AC5: 02        ???
  $9AC6: EA        NOP
  $9AC7: A2 88     LDX #$88
  $9AC9: 23 EF     RLA ($ef,X)
  $9ACB: 03 0D     SLO ($0d,X)
  $9ACD: 20 FA D6  JSR $d6fa
  $9AD0: 02        ???
  $9AD1: 04 01     NOP $01
  $9AD3: 4D 02 FA  EOR $fa02
  $9AD6: A2 12     LDX #$12
  $9AD8: 23 BC     RLA ($bc,X)
  $9ADA: 03 04     SLO ($04,X)
  $9ADC: 01 58     ORA ($58,X)
  $9ADE: 02        ???
  $9ADF: FB 63 BD  ISB $bd63,Y
  $9AE2: 23 0D     RLA ($0d,X)
  $9AE4: 04 05     NOP $05
  $9AE6: 01 FD     ORA ($fd,X)
  $9AE8: 02        ???
  $9AE9: FE A2 06  INC $06a2,X
  $9AEC: 23 E8     RLA ($e8,X)
  $9AEE: 03 0D     SLO ($0d,X)
  $9AF0: 20 EC D6  JSR $d6ec
  $9AF3: 95 01     STA $01,X
  $9AF5: 04 25     NOP $25
  $9AF7: A1 66     LDA ($66,X)
  $9AF9: A2 26     LDX #$26
  $9AFB: A3 67     LAX ($67,X)
  $9AFD: A9 02     LDA #$02
  $9AFF: 06 65     ASL $65
  $9B01: 8C 25 8E  STY $8e25
  $9B04: 66 A8     ROR $a8
  $9B06: 26 A4     ROL $a4
  $9B08: 27 A6     RLA $a6
  $9B0A: 28        PLP
  $9B0B: AC 0B 01  LDY $010b
  $9B0E: 03 87     SLO ($87,X)
  $9B10: 03 06     SLO ($06,X)
  $9B12: 02        ???
  $9B13: 85 64     STA $64
  $9B15: 8D 65 8F  STA $8f65
  $9B18: 26 A5     ROL $a5
  $9B1A: 27 A7     RLA $a7
  $9B1C: 28        PLP
  $9B1D: AD 0C 01  LDA $010c
  $9B20: 03 92     SLO ($92,X)
  $9B22: 04 06     NOP $06
  $9B24: 02        ???
  $9B25: 90 64     BCC $9b8b
  $9B27: 98        TYA
  $9B28: 65 9A     ADC $9a
  $9B2A: 26 B0     ROL $b0
  $9B2C: 27 B2     RLA $b2
  $9B2E: 28        PLP
  $9B2F: B8        CLV
  $9B30: 0D 01 03  ORA $0301
  $9B33: 93 05     ??? ($05),Y
  $9B35: 05 24     ORA $24
  $9B37: 99 25 9B  STA $9b25,Y
  $9B3A: 26 B1     ROL $b1
  $9B3C: 27 B3     RLA $b3
  $9B3E: 28        PLP
  $9B3F: B9 06 04  LDA $0406,Y
  $9B42: 64 A0     NOP $a0
  $9B44: 24 9C     BIT $9c
  $9B46: 25 9E     AND $9e
  $9B48: 26 B4     ROL $b4
  $9B4A: 07 03     SLO $03
  $9B4C: 63 97     RRA ($97,X)
  $9B4E: 64 9D     NOP $9d
  $9B50: 25 9F     AND $9f
  $9B52: 08        PHP
  $9B53: 03 62     SLO ($62,X)
  $9B55: C0 63     CPY #$63
  $9B57: C2 64     NOP #$64
  $9B59: C8        INY
  $9B5A: 0E 02 62  ASL $6202
  $9B5D: C1 63     CMP ($63,X)
  $9B5F: C3 E0     DCP ($e0,X)
  $9B61: 95 01     STA $01,X
  $9B63: 04 25     NOP $25
  $9B65: C6 26     DEC $26
  $9B67: CC 67 CE  CPY $ce67
  $9B6A: 28        PLP
  $9B6B: E4 02     CPX $02
  $9B6D: 05 25     ORA $25
  $9B6F: C7 66     DCP $66
  $9B71: CD 26 88  CMP $8826
  $9B74: 27 CF     RLA $cf
  $9B76: 28        PLP
  $9B77: E5 0B     SBC $0b
  $9B79: 01 03     ORA ($03,X)
  $9B7B: 91 03     STA ($03),Y
  $9B7D: 06 02     ASL $02
  $9B7F: 85 04     STA $04
  $9B81: D0 65     BNE $9be8
  $9B83: D2        ???
  $9B84: 26 D8     ROL $d8
  $9B86: 27 DA     RLA $da
  $9B88: 28        PLP
  $9B89: F0 0C     BEQ $9b97
  $9B8B: 01 03     ORA ($03,X)
  $9B8D: 94 04     STY $04,X
  $9B8F: 06 02     ASL $02
  $9B91: 90 04     BCC $9b97
  $9B93: D1 65     CMP ($65),Y
  $9B95: D3 26     DCP ($26),Y
  $9B97: D9 27 DB  CMP $db27,Y
  $9B9A: 28        PLP
  $9B9B: F1 0D     SBC ($0d),Y
  $9B9D: 01 03     ORA ($03,X)
  $9B9F: 95 05     STA $05,X
  $9BA1: 06 04     ASL $04
  $9BA3: D4 25     NOP $25,X
  $9BA5: D6 66     DEC $66,X
  $9BA7: DC 26 89  NOP $8926,X
  $9BAA: 27 DE     RLA $de
  $9BAC: 28        PLP
  $9BAD: F4 06     NOP $06,X
  $9BAF: 03 25     SLO ($25,X)
  $9BB1: D7 26     DCP $26,X
  $9BB3: DD 67 DF  CMP $df67,X
  $9BB6: E0 10     CPX #$10
  $9BB8: CA        DEX
  $9BB9: DB E3 DB  DCP $dbe3,Y
  $9BBC: CA        DEX
  $9BBD: DB CA DB  DCP $dbca,Y
  $9BC0: CA        DEX
  $9BC1: DB CA DB  DCP $dbca,Y
  $9BC4: CA        DEX
  $9BC5: DB FC DB  DCP $dbfc,Y
  $9BC8: CA        DEX
  $9BC9: DB 01 01  DCP $0101,Y
  $9BCC: 27 28     RLA $28
  $9BCE: 02        ???
  $9BCF: 04 25     NOP $25
  $9BD1: 07 05     SLO $05
  $9BD3: 21 26     AND ($26,X)
  $9BD5: 23 27     RLA ($27,X)
  $9BD7: 29 03     AND #$03
  $9BD9: 03 45     SLO ($45,X)
  $9BDB: 24 47     BIT $47
  $9BDD: 12        ???
  $9BDE: 27 2C     RLA $2c
  $9BE0: 20 13 DC  JSR $dc13
  $9BE3: 01 01     ORA ($01,X)
  $9BE5: 27 28     RLA $28
  $9BE7: 02        ???
  $9BE8: 04 25     NOP $25
  $9BEA: 07 05     SLO $05
  $9BEC: 21 26     AND ($26,X)
  $9BEE: 23 27     RLA ($27,X)
  $9BF0: 1A        NOP
  $9BF1: 03 03     SLO ($03,X)
  $9BF3: 45 24     EOR $24
  $9BF5: 27 30     RLA $30
  $9BF7: 07 1B     SLO $1b
  $9BF9: 20 13 DC  JSR $dc13
  $9BFC: 01 01     ORA ($01,X)
  $9BFE: 67 18     RRA $18
  $9C00: 02        ???
  $9C01: 03 05     SLO ($05,X)
  $9C03: 07 26     SLO $26
  $9C05: 13 67     SLO ($67),Y
  $9C07: 19 03 03  ORA $0303,Y
  $9C0A: 45 14     EOR $14
  $9C0C: 47 12     SRE $12
  $9C0E: 27 2C     RLA $2c
  $9C10: 20 13 DC  JSR $dc13
  $9C13: 00        BRK
  $9C14: 03 64     SLO ($64,X)
  $9C16: 09 68     ORA #$68
  $9C18: 02        ???
  $9C19: 69 08     ADC #$08
  $9C1B: 01 04     ORA ($04,X)
  $9C1D: 64 0A     NOP $0a
  $9C1F: 65 20     ADC $20
  $9C21: 06 22     ASL $22
  $9C23: 68        PLA
  $9C24: 2A        ROL A
  $9C25: 02        ???
  $9C26: 04 61     NOP $61
  $9C28: 01 62     ORA ($62,X)
  $9C2A: 03 64     SLO ($64,X)
  $9C2C: 0B 68     ANC #$68
  $9C2E: 2B 03     ANC #$03
  $9C30: 06 21     ASL $21
  $9C32: 04 22     NOP $22
  $9C34: 06 23     ASL $23
  $9C36: 0C 64 0E  NOP $0e64
  $9C39: 46 0D     LSR $0d
  $9C3B: 26 26     ROL $26
  $9C3D: 04 04     NOP $04
  $9C3F: 64 0F     NOP $0f
  $9C41: 45 25     EOR $25
  $9C43: 46 27     LSR $27
  $9C45: 47 2D     SRE $2d
  $9C47: 05 02     ORA $02
  $9C49: 66 32     ROR $32
  $9C4B: 47 38     SRE $38
  $9C4D: 06 03     ASL $03
  $9C4F: 66 33     ROR $33
  $9C51: 27 39     RLA $39
  $9C53: 28        PLP
  $9C54: 3B 07 04  RLA $0407,Y
  $9C57: 66 36     ROR $36
  $9C59: 27 3C     RLA $3c
  $9C5B: 28        PLP
  $9C5C: 3E 69 05  ROL $0569,X
  $9C5F: 08        PHP
  $9C60: 02        ???
  $9C61: 68        PLA
  $9C62: 3F 69 10  RLA $1069,X
  $9C65: E0 82     CPX #$82
  $9C67: 04 03     NOP $03
  $9C69: 25 AF     AND $af
  $9C6B: 26 BA     ROL $ba
  $9C6D: 27 C0     RLA $c0
  $9C6F: 05 04     ORA $04
  $9C71: 24 B2     BIT $b2
  $9C73: 25 B8     AND $b8
  $9C75: 26 BB     ROL $bb
  $9C77: 27 C1     RLA $c1
  $9C79: 06 04     ASL $04
  $9C7B: 24 B3     BIT $b3
  $9C7D: 25 B9     AND $b9
  $9C7F: 26 BE     ROL $be
  $9C81: 27 C4     RLA $c4
  $9C83: 07 04     SLO $04
  $9C85: 24 B6     BIT $b6
  $9C87: 25 BC     AND $bc
  $9C89: 26 BF     ROL $bf
  $9C8B: 27 C5     RLA $c5
  $9C8D: 08        PHP
  $9C8E: 04 24     NOP $24
  $9C90: B7 25     LAX $25,Y
  $9C92: BD 26 EA  LDA $ea26,X
  $9C95: 27 D0     RLA $d0
  $9C97: 0E 04 24  ASL $2404
  $9C9A: E2 25     NOP #$25
  $9C9C: E8        INX
  $9C9D: 26 EB     ROL $eb
  $9C9F: 27 D1     RLA $d1
  $9CA1: 0F 04 24  SLO $2404
  $9CA4: E3 25     ISB ($25,X)
  $9CA6: E9 26     SBC #$26
  $9CA8: EE 27 D4  INC $d427
  $9CAB: 20 D7 DC  JSR $dcd7
  $9CAE: 82 0F     NOP #$0f
  $9CB0: 02        ???
  $9CB1: 25 D3     AND $d3
  $9CB3: 26 C9     ROL $c9
  $9CB5: 10 04     BPL $9cbb
  $9CB7: 24 D6     BIT $d6
  $9CB9: 25 D2     AND $d2
  $9CBB: 26 C8     ROL $c8
  $9CBD: 27 CC     RLA $cc
  $9CBF: 11 04     ORA ($04),Y
  $9CC1: 24 D7     BIT $d7
  $9CC3: 25 C7     AND $c7
  $9CC5: 26 C2     ROL $c2
  $9CC7: 27 CD     RLA $cd
  $9CC9: 12        ???
  $9CCA: 04 24     NOP $24
  $9CCC: D5 25     CMP $25,X
  $9CCE: C6 26     DEC $26
  $9CD0: C3 27     DCP ($27,X)
  $9CD2: D8        CLD
  $9CD3: 20 D7 DC  JSR $dcd7
  $9CD6: 82 18     NOP #$18
  $9CD8: 01 29     ORA ($29,X)
  $9CDA: F1 17     SBC ($17),Y
  $9CDC: 03 22     SLO ($22,X)
  $9CDE: D9 28 F7  CMP $f728,Y
  $9CE1: 29 F4     AND #$f4
  $9CE3: 16 03     ASL $03,X
  $9CE5: 22        ???
  $9CE6: DC 28 EC  NOP $ec28,X
  $9CE9: 29 F5     AND #$f5
  $9CEB: 15 03     ORA $03,X
  $9CED: 22        ???
  $9CEE: DD 23 DB  CMP $db23,X
  $9CF1: 28        PLP
  $9CF2: ED 14 03  SBC $0314
  $9CF5: 22        ???
  $9CF6: CA        DEX
  $9CF7: 23 DE     RLA ($de,X)
  $9CF9: 28        PLP
  $9CFA: F8        SED
  $9CFB: 13 03     SLO ($03),Y
  $9CFD: 23 DF     RLA ($df,X)
  $9CFF: 28        PLP
  $9D00: F9 29 E6  SBC $e629,Y
  $9D03: 00        BRK
  $9D04: 03 23     SLO ($23,X)
  $9D06: E0 28     CPX #$28
  $9D08: FC 29 E7  NOP $e729,X
  $9D0B: 01 02     ORA ($02,X)
  $9D0D: 23 E1     RLA ($e1,X)
  $9D0F: 28        PLP
  $9D10: FD 02 03  SBC $0302,X
  $9D13: 22        ???
  $9D14: CB 23     AXS #$23
  $9D16: E4 29     CPX $29
  $9D18: F2        ???
  $9D19: 03 03     SLO ($03,X)
  $9D1B: 22        ???
  $9D1C: CE 28 EF  DEC $ef28
  $9D1F: 29 F3     AND #$f3
  $9D21: 04 02     NOP $02
  $9D23: 22        ???
  $9D24: CF 29 F6  DCP $f629
  $9D27: 05 02     ORA $02
  $9D29: 22        ???
  $9D2A: DA        NOP
  $9D2B: 23 E5     RLA ($e5,X)
  $9D2D: 06 01     ASL $01
  $9D2F: 23 F0     RLA ($f0,X)
  $9D31: E0 95     CPX #$95
  $9D33: 00        BRK
  $9D34: 06 64     ASL $64
  $9D36: 40        RTI
  $9D37: 65 42     ADC $42
  $9D39: 66 48     ROR $48
  $9D3B: 67 4A     RRA $4a
  $9D3D: 68        PLA
  $9D3E: 60        RTS
  $9D3F: 69 62     ADC #$62
  $9D41: 01 06     ORA ($06,X)
  $9D43: 64 41     NOP $41
  $9D45: 65 43     ADC $43
  $9D47: 66 49     ROR $49
  $9D49: 67 4B     RRA $4b
  $9D4B: 68        PLA
  $9D4C: 61 69     ADC ($69,X)
  $9D4E: 63 02     RRA ($02,X)
  $9D50: 06 63     ASL $63
  $9D52: 47 64     SRE $64
  $9D54: 44 65     NOP $65
  $9D56: 46 67     LSR $67
  $9D58: 4E 68 64  LSR $6468
  $9D5B: 69 49     ADC #$49
  $9D5D: 03 06     SLO ($06,X)
  $9D5F: 62        ???
  $9D60: 47 63     SRE $63
  $9D62: 52        ???
  $9D63: 64 45     NOP $45
  $9D65: 65 49     ADC $49
  $9D67: 67 4F     RRA $4f
  $9D69: 68        PLA
  $9D6A: 65 04     ADC $04
  $9D6C: 07 61     SLO $61
  $9D6E: 47 62     SRE $62
  $9D70: 52        ???
  $9D71: 63 5E     RRA ($5e,X)
  $9D73: 64 50     NOP $50
  $9D75: 67 5A     RRA $5a
  $9D77: 68        PLA
  $9D78: 70 69     BVS $9de3
  $9D7A: 72        ???
  $9D7B: 05 08     ORA $08
  $9D7D: 61 54     ADC ($54,X)
  $9D7F: 62        ???
  $9D80: 5E 63 4C  LSR $4c63,X
  $9D83: 64 51     NOP $51
  $9D85: 66 59     ROR $59
  $9D87: 67 5E     RRA $5e
  $9D89: 68        PLA
  $9D8A: 71 69     ADC ($69),Y
  $9D8C: 73 06     RRA ($06),Y
  $9D8E: 08        PHP
  $9D8F: 41 55     EOR ($55,X)
  $9D91: 61 58     ADC ($58,X)
  $9D93: 62        ???
  $9D94: 53 63     SRE ($63),Y
  $9D96: 4D 66 5C  EOR $5c66
  $9D99: 67 5E     RRA $5e
  $9D9B: 68        PLA
  $9D9C: 74 69     NOP $69,X
  $9D9E: 76 07     ROR $07,X
  $9DA0: 07 41     SLO $41
  $9DA2: 57 42     SRE $42,X
  $9DA4: 56 62     LSR $62,X
  $9DA6: 5B 66 5D  SRE $5d66,Y
  $9DA9: 67 5F     RRA $5f
  $9DAB: 68        PLA
  $9DAC: 75 69     ADC $69,X
  $9DAE: 77 E0     RRA $e0,X
  $9DB0: 06 C3     ASL $c3
  $9DB2: DD F4 DD  CMP $ddf4,X
  $9DB5: C3 DD     DCP ($dd,X)
  $9DB7: C3 DD     DCP ($dd,X)
  $9DB9: 25 DE     AND $de
  $9DBB: 56 DE     LSR $de,X
  $9DBD: 87 DE     SAX $de
  $9DBF: BA        TSX
  $9DC0: DE C3 DD  DEC $ddc3,X
  $9DC3: 01 02     ORA ($02,X)
  $9DC5: 03 75     SLO ($75,X)
  $9DC7: 04 76     NOP $76
  $9DC9: 02        ???
  $9DCA: 06 02     ASL $02
  $9DCC: 71 22     ADC ($22),Y
  $9DCE: 70 03     BVS $9dd3
  $9DD0: 62        ???
  $9DD1: 23 0C     RLA ($0c,X)
  $9DD3: 04 73     NOP $73
  $9DD5: 05 77     ORA $77
  $9DD7: 03 06     SLO ($06,X)
  $9DD9: 22        ???
  $9DDA: 74 03     NOP $03,X
  $9DDC: 63 23     RRA ($23,X)
  $9DDE: 0C 04 67  NOP $6704
  $9DE1: 24 0C     BIT $0c
  $9DE3: 25 68     AND $68
  $9DE5: 04 03     NOP $03
  $9DE7: 24 6C     BIT $6c
  $9DE9: 25 6D     AND $6d
  $9DEB: 26 7A     ROL $7a
  $9DED: 05 01     ORA $01
  $9DEF: 25 78     AND $78
  $9DF1: 20 E8 DE  JSR $dee8
  $9DF4: 01 02     ORA ($02,X)
  $9DF6: 03 D9     SLO ($d9,X)
  $9DF8: 04 D8     NOP $d8
  $9DFA: 02        ???
  $9DFB: 06 02     ASL $02
  $9DFD: C6 22     DEC $22
  $9DFF: 70 03     BVS $9e04
  $9E01: CD 23 0C  CMP $0c23
  $9E04: 04 CC     NOP $cc
  $9E06: 05 C9     ORA $c9
  $9E08: 03 06     SLO ($06,X)
  $9E0A: 02        ???
  $9E0B: D2        ???
  $9E0C: 03 D3     SLO ($d3,X)
  $9E0E: 23 0C     RLA ($0c,X)
  $9E10: 04 D7     NOP $d7
  $9E12: 24 0C     BIT $0c
  $9E14: 25 68     AND $68
  $9E16: 04 03     NOP $03
  $9E18: 24 6C     BIT $6c
  $9E1A: 25 6D     AND $6d
  $9E1C: 26 7A     ROL $7a
  $9E1E: 05 01     ORA $01
  $9E20: 25 78     AND $78
  $9E22: 20 E8 DE  JSR $dee8
  $9E25: 01 02     ORA ($02,X)
  $9E27: 03 3B     SLO ($3b,X)
  $9E29: 04 61     NOP $61
  $9E2B: 02        ???
  $9E2C: 05 22     ORA $22
  $9E2E: 70 03     BVS $9e33
  $9E30: 3F 23 0C  RLA $0c23,X
  $9E33: 04 72     NOP $72
  $9E35: 05 66     ORA $66
  $9E37: 03 07     SLO ($07,X)
  $9E39: 70 D6     BVS $9e11
  $9E3B: 22        ???
  $9E3C: 74 03     NOP $03,X
  $9E3E: 6B 23     ARR #$23
  $9E40: 0C 04 06  NOP $0604
  $9E43: 24 0C     BIT $0c
  $9E45: 25 C7     AND $c7
  $9E47: 04 03     NOP $03
  $9E49: 24 6C     BIT $6c
  $9E4B: 25 6D     AND $6d
  $9E4D: 26 7A     ROL $7a
  $9E4F: 05 01     ORA $01
  $9E51: 25 78     AND $78
  $9E53: 20 E8 DE  JSR $dee8
  $9E56: 01 03     ORA ($03,X)
  $9E58: 03 E0     SLO ($e0,X)
  $9E5A: 04 DF     NOP $df
  $9E5C: 05 C8     ORA $c8
  $9E5E: 02        ???
  $9E5F: 05 22     ORA $22
  $9E61: 70 03     BVS $9e66
  $9E63: DA        NOP
  $9E64: 23 0C     RLA ($0c,X)
  $9E66: 04 DB     NOP $db
  $9E68: 05 DE     ORA $de
  $9E6A: 03 06     SLO ($06,X)
  $9E6C: 22        ???
  $9E6D: 74 03     NOP $03,X
  $9E6F: CA        DEX
  $9E70: 23 0C     RLA ($0c,X)
  $9E72: 04 DC     NOP $dc
  $9E74: 24 0C     BIT $0c
  $9E76: 25 68     AND $68
  $9E78: 04 03     NOP $03
  $9E7A: 24 6C     BIT $6c
  $9E7C: 25 6D     AND $6d
  $9E7E: 26 7A     ROL $7a
  $9E80: 05 01     ORA $01
  $9E82: 25 78     AND $78
  $9E84: 20 E8 DE  JSR $dee8
  $9E87: 01 02     ORA ($02,X)
  $9E89: 03 E3     SLO ($e3,X)
  $9E8B: 04 E6     NOP $e6
  $9E8D: 19 01 71  ORA $7101,Y
  $9E90: E1 02     SBC ($02,X)
  $9E92: 05 22     ORA $22
  $9E94: 70 03     BVS $9e99
  $9E96: E2 23     NOP #$23
  $9E98: 0C 04 E4  NOP $e404
  $9E9B: 65 F5     ADC $f5
  $9E9D: 03 06     SLO ($06,X)
  $9E9F: 22        ???
  $9EA0: 74 03     NOP $03,X
  $9EA2: F4 23     NOP $23,X
  $9EA4: 0C 04 F0  NOP $f004
  $9EA7: 24 0C     BIT $0c
  $9EA9: 25 E5     AND $e5
  $9EAB: 04 03     NOP $03
  $9EAD: 24 6C     BIT $6c
  $9EAF: 25 6D     AND $6d
  $9EB1: 26 7A     ROL $7a
  $9EB3: 05 01     ORA $01
  $9EB5: 25 78     AND $78
  $9EB7: 20 E8 DE  JSR $dee8
  $9EBA: 01 02     ORA ($02,X)
  $9EBC: 03 75     SLO ($75,X)
  $9EBE: 04 76     NOP $76
  $9EC0: 02        ???
  $9EC1: 06 02     ASL $02
  $9EC3: 71 22     ADC ($22),Y
  $9EC5: F3 03     ISB ($03),Y
  $9EC7: 62        ???
  $9EC8: 23 F6     RLA ($f6,X)
  $9ECA: 04 CE     NOP $ce
  $9ECC: 05 CB     ORA $cb
  $9ECE: 03 06     SLO ($06,X)
  $9ED0: 22        ???
  $9ED1: 74 03     NOP $03,X
  $9ED3: 63 23     RRA ($23,X)
  $9ED5: 0C 04 CF  NOP $cf04
  $9ED8: 24 0C     BIT $0c
  $9EDA: 25 68     AND $68
  $9EDC: 04 03     NOP $03
  $9EDE: 24 95     BIT $95
  $9EE0: 25 F2     AND $f2
  $9EE2: 26 E8     ROL $e8
  $9EE4: 05 01     ORA $01
  $9EE6: 25 E7     AND $e7
  $9EE8: 01 01     ORA ($01,X)
  $9EEA: 62        ???
  $9EEB: 65 02     ADC $02
  $9EED: 01 61     ORA ($61,X)
  $9EEF: 64 03     NOP $03
  $9EF1: 04 27     NOP $27
  $9EF3: D0 28     BNE $9f1d
  $9EF5: D1 29     CMP ($29),Y
  $9EF7: C2 6A     NOP #$6a
  $9EF9: C3 04     DCP ($04,X)
  $9EFB: 04 23     NOP $23
  $9EFD: 69 27     ADC #$27
  $9EFF: C5 28     CMP $28
  $9F01: D4 29     NOP $29,X
  $9F03: D5 05     CMP $05,X
  $9F05: 04 23     NOP $23
  $9F07: 6E 24 79  ROR $7924
  $9F0A: 44 7C     NOP $7c
  $9F0C: 66 7B     ROR $7b
  $9F0E: 06 05     ASL $05
  $9F10: 62        ???
  $9F11: 6A        ROR A
  $9F12: 23 6F     RLA ($6f,X)
  $9F14: 66 7E     ROR $7e
  $9F16: 67 7F     RRA $7f
  $9F18: 68        PLA
  $9F19: C4 07     CPY $07
  $9F1B: 03 62     SLO ($62,X)
  $9F1D: 7D 67 C0  ADC $c067,X
  $9F20: 68        PLA
  $9F21: C1 E0     CMP ($e0,X)
  $9F23: 06 36     ASL $36
  $9F25: DF 59 DF  DCP $df59,X
  $9F28: 7E DF A3  ROR $a3df,X
  $9F2B: DF C6 DF  DCP $dfc6,X
  $9F2E: E5 DF     SBC $df
  $9F30: 0A        ASL A
  $9F31: E0 29     CPX #$29
  $9F33: E0 4C     CPX #$4c
  $9F35: E0 00     CPX #$00
  $9F37: 02        ???
  $9F38: 03 02     SLO ($02,X)
  $9F3A: 04 13     NOP $13
  $9F3C: 01 05     ORA ($05,X)
  $9F3E: 02        ???
  $9F3F: 01 03     ORA ($03,X)
  $9F41: 03 04     SLO ($04,X)
  $9F43: 16 64     ASL $64,X
  $9F45: 08        PHP
  $9F46: 25 18     AND $18
  $9F48: 02        ???
  $9F49: 06 02     ASL $02
  $9F4B: 04 22     NOP $22
  $9F4D: 05 03     ORA $03
  $9F4F: 09 23     ORA #$23
  $9F51: 0C 04 17  NOP $1704
  $9F54: 24 0C     BIT $0c
  $9F56: 20 6E E0  JSR $e06e
  $9F59: 00        BRK
  $9F5A: 02        ???
  $9F5B: 03 2B     SLO ($2b,X)
  $9F5D: 04 2A     NOP $2a
  $9F5F: 01 05     ORA ($05,X)
  $9F61: 02        ???
  $9F62: 38        SEC
  $9F63: 03 03     SLO ($03,X)
  $9F65: 04 3C     NOP $3c
  $9F67: 64 39     NOP $39
  $9F69: 25 3D     AND $3d
  $9F6B: 02        ???
  $9F6C: 07 01     SLO $01
  $9F6E: 2D 02 2C  AND $2c02
  $9F71: 22        ???
  $9F72: 05 03     ORA $03
  $9F74: 29 23     AND #$23
  $9F76: 0C 04 37  NOP $3704
  $9F79: 24 0C     BIT $0c
  $9F7B: 20 6E E0  JSR $e06e
  $9F7E: 00        BRK
  $9F7F: 02        ???
  $9F80: 03 91     SLO ($91,X)
  $9F82: 04 90     NOP $90
  $9F84: 1A        NOP
  $9F85: 01 64     ORA ($64,X)
  $9F87: 2F 01 04  RLA $0401
  $9F8A: 02        ???
  $9F8B: 80 03     NOP #$03
  $9F8D: 81 04     STA ($04,X)
  $9F8F: 84 25     STY $25
  $9F91: 85 02     STA $02
  $9F93: 06 02     ASL $02
  $9F95: 3E 22 05  ROL $0522,X
  $9F98: 03 3A     SLO ($3a,X)
  $9F9A: 23 0C     RLA ($0c,X)
  $9F9C: 04 2E     NOP $2e
  $9F9E: 24 0C     BIT $0c
  $9FA0: 20 6E E0  JSR $e06e
  $9FA3: 00        BRK
  $9FA4: 02        ???
  $9FA5: 03 89     SLO ($89,X)
  $9FA7: 04 88     NOP $88
  $9FA9: 01 05     ORA ($05,X)
  $9FAB: 02        ???
  $9FAC: 01 03     ORA ($03,X)
  $9FAE: 03 04     SLO ($04,X)
  $9FB0: 96 64     STX $64,Y
  $9FB2: 93 25     ??? ($25),Y
  $9FB4: 97 02     SAX $02,Y
  $9FB6: 06 02     ASL $02
  $9FB8: 04 22     NOP $22
  $9FBA: 05 03     ORA $03
  $9FBC: 09 23     ORA #$23
  $9FBE: 0C 04 94  NOP $9404
  $9FC1: 24 0C     BIT $0c
  $9FC3: 20 6E E0  JSR $e06e
  $9FC6: 00        BRK
  $9FC7: 01 04     ORA ($04,X)
  $9FC9: A2 1A     LDX #$1a
  $9FCB: 01 64     ORA ($64,X)
  $9FCD: A3 01     LAX ($01,X)
  $9FCF: 03 03     SLO ($03,X)
  $9FD1: B1 04     LDA ($04),Y
  $9FD3: B4 25     LDY $25,X
  $9FD5: B5 02     LDA $02,X
  $9FD7: 05 22     ORA $22
  $9FD9: 05 03     ORA $03
  $9FDB: 9F 23 0C  ??? $0c23,Y
  $9FDE: 04 9E     NOP $9e
  $9FE0: 24 0C     BIT $0c
  $9FE2: 20 6E E0  JSR $e06e
  $9FE5: 00        BRK
  $9FE6: 02        ???
  $9FE7: 03 9A     SLO ($9a,X)
  $9FE9: 04 9B     NOP $9b
  $9FEB: 0A        ASL A
  $9FEC: 01 64     ORA ($64,X)
  $9FEE: 28        PLP
  $9FEF: 01 04     ORA ($04,X)
  $9FF1: 02        ???
  $9FF2: 8F 03 8E  SAX $8e03
  $9FF5: 04 8B     NOP $8b
  $9FF7: 25 8A     AND $8a
  $9FF9: 02        ???
  $9FFA: 06 02     ASL $02
  $9FFC: 98        TYA
  $9FFD: 22        ???
  $9FFE: 05 03     ORA $03
  $A000: 8D 23 0C  STA $0c23
  $A003: 04 8C     NOP $8c
  $A005: 24 0C     BIT $0c
  $A007: 20 6E E0  JSR $e06e
  $A00A: 00        BRK
  $A00B: 02        ???
  $A00C: 03 B9     SLO ($b9,X)
  $A00E: 04 B8     NOP $b8
  $A010: 01 04     ORA ($04,X)
  $A012: 02        ???
  $A013: AD 03 AC  LDA $ac03
  $A016: 64 A9     NOP $a9
  $A018: 25 A8     AND $a8
  $A01A: 02        ???
  $A01B: 05 22     ORA $22
  $A01D: 05 03     ORA $03
  $A01F: A7 23     LAX $23
  $A021: 0C 64 A6  NOP $a664
  $A024: 24 0C     BIT $0c
  $A026: 20 6E E0  JSR $e06e
  $A029: 00        BRK
  $A02A: 02        ???
  $A02B: 03 02     SLO ($02,X)
  $A02D: 04 13     NOP $13
  $A02F: 01 05     ORA ($05,X)
  $A031: 6D 55 02  ADC $0255
  $A034: 01 03     ORA ($03,X)
  $A036: 03 04     SLO ($04,X)
  $A038: 48        PHA
  $A039: 65 57     ADC $57
  $A03B: 02        ???
  $A03C: 06 02     ASL $02
  $A03E: 04 22     NOP $22
  $A040: 54 03     NOP $03,X
  $A042: 09 23     ORA #$23
  $A044: 0C 04 58  NOP $5804
  $A047: 24 42     BIT $42
  $A049: 20 85 E0  JSR $e085
  $A04C: 00        BRK
  $A04D: 02        ???
  $A04E: 03 60     SLO ($60,X)
  $A050: 04 5F     NOP $5f
  $A052: 0A        ASL A
  $A053: 01 64     ORA ($64,X)
  $A055: 4E 01 04  LSR $0401
  $A058: 02        ???
  $A059: 5E 03 5B  LSR $5b03,X
  $A05C: 04 5A     NOP $5a
  $A05E: 25 A8     AND $a8
  $A060: 02        ???
  $A061: 06 02     ASL $02
  $A063: 5D 22 05  EOR $0522,X
  $A066: 03 5C     SLO ($5c,X)
  $A068: 23 0C     RLA ($0c,X)
  $A06A: 04 59     NOP $59
  $A06C: 24 0C     BIT $0c
  $A06E: 01 01     ORA ($01,X)
  $A070: 26 1F     ROL $1f
  $A072: 02        ???
  $A073: 02        ???
  $A074: 25 19     AND $19
  $A076: 26 1E     ROL $1e
  $A078: 03 04     SLO ($04,X)
  $A07A: 22        ???
  $A07B: 10 24     BPL $a0a1
  $A07D: 0C 25 1C  NOP $1c25
  $A080: 26 1B     ROL $1b
  $A082: 20 99 E0  JSR $e099
  $A085: 01 01     ORA ($01,X)
  $A087: 26 56     ROL $56
  $A089: 02        ???
  $A08A: 02        ???
  $A08B: 65 52     ADC $52
  $A08D: 26 53     ROL $53
  $A08F: 03 04     SLO ($04,X)
  $A091: 22        ???
  $A092: 51 24     EOR ($24),Y
  $A094: 50 25     BVC $a0bb
  $A096: 45 26     EOR $26
  $A098: 44 02     NOP $02
  $A09A: 02        ???
  $A09B: 67 20     RRA $20
  $A09D: 68        PLA
  $A09E: 31 03     AND ($03),Y
  $A0A0: 04 61     NOP $61
  $A0A2: 11 23     ORA ($23),Y
  $A0A4: 07 67     SLO $67
  $A0A6: 21 68     AND ($68,X)
  $A0A8: 34 04     NOP $04,X
  $A0AA: 08        PHP
  $A0AB: 60        RTS
  $A0AC: 40        RTI
  $A0AD: 61 14     ADC ($14,X)
  $A0AF: 23 12     RLA ($12,X)
  $A0B1: 24 0D     BIT $0d
  $A0B3: 25 0A     AND $0a
  $A0B5: 45 0C     EOR $0c
  $A0B7: 46 1A     LSR $1a
  $A0B9: 67 24     RRA $24
  $A0BB: 05 04     ORA $04
  $A0BD: 45 0B     EOR $0b
  $A0BF: 46 0E     LSR $0e
  $A0C1: 67 25     RRA $25
  $A0C3: 28        PLP
  $A0C4: 35 06     AND $06,X
  $A0C6: 05 46     ORA $46
  $A0C8: 0F 67 30  SLO $3067
  $A0CB: 28        PLP
  $A0CC: 22        ???
  $A0CD: 29 27     AND #$27
  $A0CF: 2A        ROL A
  $A0D0: 32        ???
  $A0D1: 07 04     SLO $04
  $A0D3: 28        PLP
  $A0D4: 23 29     RLA ($29,X)
  $A0D6: 26 2A     ROL $2a
  $A0D8: 33 6B     RLA ($6b),Y
  $A0DA: 36 E0     ROL $e0,X
  $A0DC: 8F 00 02  SAX $0200
  $A0DF: 27 31     RLA $31
  $A0E1: 28        PLP
  $A0E2: 33 01     RLA ($01),Y
  $A0E4: 05 24     ORA $24
  $A0E6: 02        ???
  $A0E7: 25 08     AND $08
  $A0E9: 26 0A     ROL $0a
  $A0EB: 27 20     RLA $20
  $A0ED: 28        PLP
  $A0EE: 22        ???
  $A0EF: 02        ???
  $A0F0: 07 23     SLO $23
  $A0F2: 01 24     ORA ($24,X)
  $A0F4: 03 25     SLO ($25,X)
  $A0F6: 09 26     ORA #$26
  $A0F8: 0B 27     ANC #$27
  $A0FA: 21 28     AND ($28,X)
  $A0FC: 23 48     RLA ($48,X)
  $A0FE: 1E 03 06  ASL $0603,X
  $A101: 23 04     RLA ($04,X)
  $A103: 24 06     BIT $06
  $A105: 25 0C     AND $0c
  $A107: 26 0E     ROL $0e
  $A109: 47 24     SRE $24
  $A10B: 48        PHA
  $A10C: 26 04     ROL $04
  $A10E: 07 22     SLO $22
  $A110: 38        SEC
  $A111: 23 05     RLA ($05,X)
  $A113: 24 07     BIT $07
  $A115: 25 0D     AND $0d
  $A117: 26 0F     ROL $0f
  $A119: 47 25     SRE $25
  $A11B: 48        PHA
  $A11C: 27 05     RLA $05
  $A11E: 07 22     SLO $22
  $A120: 3C 23 10  NOP $1023,X
  $A123: 24 12     BIT $12
  $A125: 25 18     AND $18
  $A127: 26 1A     ROL $1a
  $A129: 27 30     RLA $30
  $A12B: 28        PLP
  $A12C: 32        ???
  $A12D: 06 04     ASL $04
  $A12F: 23 11     RLA ($11,X)
  $A131: 24 13     BIT $13
  $A133: 25 19     AND $19
  $A135: 26 1B     ROL $1b
  $A137: 07 03     SLO $03
  $A139: 23 14     RLA ($14,X)
  $A13B: 24 16     BIT $16
  $A13D: 25 1C     AND $1c
  $A13F: 08        PHP
  $A140: 02        ???
  $A141: 24 34     BIT $34
  $A143: 25 36     AND $36
  $A145: E0 8F     CPX #$8f
  $A147: 13 03     SLO ($03),Y
  $A149: 62        ???
  $A14A: 15 63     ORA $63,X
  $A14C: 17 26     SLO $26,X
  $A14E: 35 00     AND $00,X
  $A150: 05 62     ORA $62
  $A152: 40        RTI
  $A153: 23 42     RLA ($42,X)
  $A155: 44 48     NOP $48
  $A157: 25 4A     AND $4a
  $A159: 26 60     ROL $60
  $A15B: 01 06     ORA ($06,X)
  $A15D: 22        ???
  $A15E: 41 23     EOR ($23,X)
  $A160: 43 24     SRE ($24,X)
  $A162: 49 44     EOR #$44
  $A164: 1D 45 4B  ORA $4b45,X
  $A167: 26 61     ROL $61
  $A169: 02        ???
  $A16A: 06 22     ASL $22
  $A16C: 44 23     NOP $23
  $A16E: 46 24     LSR $24
  $A170: 4C 25 4F  JMP $4f25
  $A173: 45 1F     EOR $1f
  $A175: 26 64     ROL $64
  $A177: 03 04     SLO ($04,X)
  $A179: 22        ???
  $A17A: 45 63     EOR $63
  $A17C: 47 24     SRE $24
  $A17E: 4D 25 4F  EOR $4f25
  $A181: 04 03     NOP $03
  $A183: 22        ???
  $A184: 50 23     BVC $a1a9
  $A186: 52        ???
  $A187: 24 58     BIT $58
  $A189: 05 04     ORA $04
  $A18B: 22        ???
  $A18C: 51 63     EOR ($63),Y
  $A18E: 53 27     SRE ($27),Y
  $A190: 59 28 5C  EOR $5c28,Y
  $A193: 06 05     ASL $05
  $A195: 63 54     RRA ($54,X)
  $A197: 64 56     NOP $56
  $A199: 27 67     RLA $67
  $A19B: 28        PLP
  $A19C: 6D 29 65  ADC $6529
  $A19F: 07 07     SLO $07
  $A1A1: 64 57     NOP $57
  $A1A3: 65 5A     ADC $5a
  $A1A5: 26 70     ROL $70
  $A1A7: 27 72     RLA $72
  $A1A9: 47 5D     SRE $5d
  $A1AB: 48        PHA
  $A1AC: 78        SEI
  $A1AD: 29 7A     AND #$7a
  $A1AF: 08        PHP
  $A1B0: 06 25     ASL $25
  $A1B2: 5B 26 71  SRE $7126,Y
  $A1B5: 27 73     RLA $73
  $A1B7: 28        PLP
  $A1B8: 79 48 5F  ADC $5f48,Y
  $A1BB: 29 7B     AND #$7b
  $A1BD: 0E 05 25  ASL $2505
  $A1C0: 5E 66 74  LSR $7466,X
  $A1C3: 67 76     RRA $76
  $A1C5: 28        PLP
  $A1C6: 7C 29 7E  NOP $7e29,X
  $A1C9: 0F 05 66  SLO $6605
  $A1CC: 75 27     ADC $27,X
  $A1CE: 77 67     RRA $67,X
  $A1D0: 55 28     EOR $28,X
  $A1D2: 7D 69 7F  ADC $7f69,X
  $A1D5: E0 8F     CPX #$8f
  $A1D7: 02        ???
  $A1D8: 05 24     ORA $24
  $A1DA: 02        ???
  $A1DB: 25 08     AND $08
  $A1DD: 26 37     ROL $37
  $A1DF: 27 95     RLA $95
  $A1E1: 28        PLP
  $A1E2: 97 03     SAX $03,Y
  $A1E4: 06 23     ASL $23
  $A1E6: 01 24     ORA ($24,X)
  $A1E8: 03 25     SLO ($25,X)
  $A1EA: 09 26     ORA #$26
  $A1EC: 62        ???
  $A1ED: 27 68     RLA $68
  $A1EF: 28        PLP
  $A1F0: 6A        ROR A
  $A1F1: 04 07     NOP $07
  $A1F3: 23 04     RLA ($04,X)
  $A1F5: 24 06     BIT $06
  $A1F7: 25 0C     AND $0c
  $A1F9: 26 63     ROL $63
  $A1FB: 27 69     RLA $69
  $A1FD: 47 9D     SRE $9d
  $A1FF: 48        PHA
  $A200: 6B 05     ARR #$05
  $A202: 07 22     SLO $22
  $A204: 38        SEC
  $A205: 23 05     RLA ($05,X)
  $A207: 24 07     BIT $07
  $A209: 25 0D     AND $0d
  $A20B: 26 66     ROL $66
  $A20D: 47 6C     SRE $6c
  $A20F: 48        PHA
  $A210: 6E E0 8F  ROR $8fe0
  $A213: 00        BRK
  $A214: 03 64     SLO ($64,X)
  $A216: 15 65     ORA $65,X
  $A218: 17 28     SLO $28,X
  $A21A: 35 01     AND $01,X
  $A21C: 05 64     ORA $64
  $A21E: 40        RTI
  $A21F: 25 42     AND $42
  $A221: 46 48     LSR $48
  $A223: 27 4A     RLA $4a
  $A225: 28        PLP
  $A226: 60        RTS
  $A227: 02        ???
  $A228: 06 24     ASL $24
  $A22A: 41 25     EOR ($25,X)
  $A22C: 43 26     SRE ($26,X)
  $A22E: 49 46     EOR #$46
  $A230: 1D 47 4B  ORA $4b47,X
  $A233: 28        PLP
  $A234: 61 03     ADC ($03,X)
  $A236: 06 24     ASL $24
  $A238: 44 25     NOP $25
  $A23A: 46 26     LSR $26
  $A23C: 4C 27 4E  JMP $4e27
  $A23F: 47 1F     SRE $1f
  $A241: 28        PLP
  $A242: 64 04     NOP $04
  $A244: 04 24     NOP $24
  $A246: 45 65     EOR $65
  $A248: 47 26     SRE $26
  $A24A: 4D 27 4F  EOR $4f27
  $A24D: 05 03     ORA $03
  $A24F: 24 50     BIT $50
  $A251: 25 52     AND $52
  $A253: 26 58     ROL $58
  $A255: 06 02     ASL $02
  $A257: 24 51     BIT $51
  $A259: 65 53     ADC $53
  $A25B: 07 02     SLO $02
  $A25D: 65 54     ADC $54
  $A25F: 26 6F     ROL $6f
  $A261: E0 10     CPX #$10
  $A263: 75 E2     ADC $e2,X
  $A265: 75 E2     ADC $e2,X
  $A267: 8E E2 AF  STX $afe2
  $A26A: E2 75     NOP #$75
  $A26C: E2 75     NOP #$75
  $A26E: E2 75     NOP #$75
  $A270: E2 C8     NOP #$c8
  $A272: E2 75     NOP #$75
  $A274: E2 05     NOP #$05
  $A276: 02        ???
  $A277: 24 60     BIT $60
  $A279: 25 62     AND $62
  $A27B: 06 03     ASL $03
  $A27D: 23 4B     RLA ($4b,X)
  $A27F: 24 61     BIT $61
  $A281: 65 63     ADC $63
  $A283: 07 03     SLO $03
  $A285: 23 4E     RLA ($4e,X)
  $A287: 24 64     BIT $64
  $A289: 25 66     AND $66
  $A28B: 20 E1 E2  JSR $e2e1
  $A28E: 05 03     ORA $03
  $A290: 04 80     NOP $80
  $A292: 24 2E     BIT $2e
  $A294: 25 62     AND $62
  $A296: 06 05     ASL $05
  $A298: 23 82     RLA ($82,X)
  $A29A: 04 81     NOP $81
  $A29C: 24 2F     BIT $2f
  $A29E: 05 83     ORA $83
  $A2A0: 65 84     ADC $84
  $A2A2: 07 04     SLO $04
  $A2A4: 03 77     SLO ($77,X)
  $A2A6: 04 7D     NOP $7d
  $A2A8: 05 86     ORA $86
  $A2AA: 25 85     AND $85
  $A2AC: 20 E1 E2  JSR $e2e1
  $A2AF: 05 02     ORA $02
  $A2B1: 24 60     BIT $60
  $A2B3: 25 6A     AND $6a
  $A2B5: 06 03     ASL $03
  $A2B7: 23 4B     RLA ($4b,X)
  $A2B9: 24 6F     BIT $6f
  $A2BB: 65 6B     ADC $6b
  $A2BD: 07 03     SLO $03
  $A2BF: 23 4E     RLA ($4e,X)
  $A2C1: 24 64     BIT $64
  $A2C3: 25 6E     AND $6e
  $A2C5: 20 E1 E2  JSR $e2e1
  $A2C8: 05 02     ORA $02
  $A2CA: 24 79     BIT $79
  $A2CC: 25 62     AND $62
  $A2CE: 06 03     ASL $03
  $A2D0: 23 76     RLA ($76,X)
  $A2D2: 24 7C     BIT $7c
  $A2D4: 65 7E     ADC $7e
  $A2D6: 07 03     SLO $03
  $A2D8: 23 4E     RLA ($4e,X)
  $A2DA: 24 64     BIT $64
  $A2DC: 25 7F     AND $7f
  $A2DE: 20 F2 E2  JSR $e2f2
  $A2E1: 05 02     ORA $02
  $A2E3: 62        ???
  $A2E4: 68        PLA
  $A2E5: 23 4A     RLA ($4a,X)
  $A2E7: 07 01     SLO $01
  $A2E9: 26 69     ROL $69
  $A2EB: 08        PHP
  $A2EC: 01 25     ORA ($25,X)
  $A2EE: 6C 20 03  JMP ($0320)
  $A2F1: E3 05     ISB ($05,X)
  $A2F3: 02        ???
  $A2F4: 62        ???
  $A2F5: 78        SEI
  $A2F6: 23 73     RLA ($73,X)
  $A2F8: 07 01     SLO $01
  $A2FA: 26 7A     ROL $7a
  $A2FC: 08        PHP
  $A2FD: 01 25     ORA ($25,X)
  $A2FF: 7B 20 03  RRA $0320,Y
  $A302: E3 14     ISB ($14,X)
  $A304: 03 69     SLO ($69,X)
  $A306: 1E 6A 34  ASL $346a,X
  $A309: 6B 3D     ARR #$3d
  $A30B: 13 03     SLO ($03),Y
  $A30D: 69 1F     ADC #$1f
  $A30F: 6A        ROR A
  $A310: 35 6B     AND $6b,X
  $A312: 37 00     RLA $00,X
  $A314: 04 28     NOP $28
  $A316: 15 29     ORA $29,X
  $A318: 1C 69 31  NOP $3169,X
  $A31B: 6A        ROR A
  $A31C: 5D 01 03  EOR $0301,X
  $A31F: 27 48     RLA $48
  $A321: 28        PLP
  $A322: 16 29     ASL $29,X
  $A324: 1D 02 02  ORA $0202,X
  $A327: 27 49     RLA $49
  $A329: 28        PLP
  $A32A: 17 03     SLO $03,X
  $A32C: 03 61     SLO ($61,X)
  $A32E: 40        RTI
  $A32F: 66 46     ROR $46
  $A331: 67 4C     RRA $4c
  $A333: 04 06     NOP $06
  $A335: 61 41     ADC ($41,X)
  $A337: 62        ???
  $A338: 43 63     SRE ($63,X)
  $A33A: 42        ???
  $A33B: 45 45     EOR $45
  $A33D: 46 47     LSR $47
  $A33F: 67 4D     RRA $4d
  $A341: 05 05     ORA $05
  $A343: 26 52     ROL $52
  $A345: 46 44     LSR $44
  $A347: 47 58     SRE $58
  $A349: 68        PLA
  $A34A: 51 69     EOR ($69),Y
  $A34C: 50 06     BVC $a354
  $A34E: 03 26     SLO ($26,X)
  $A350: 53 47     SRE ($47),Y
  $A352: 59 68 54  EOR $5468,Y
  $A355: 07 01     SLO $01
  $A357: 47 5C     SRE $5c
  $A359: 08        PHP
  $A35A: 01 66     ORA ($66,X)
  $A35C: 56 0E     LSR $0e,X
  $A35E: 02        ???
  $A35F: 65 55     ADC $55
  $A361: 66 57     ROR $57
  $A363: E0 0A     CPX #$0a
  $A365: 77 E3     RRA $e3,X
  $A367: A6 E3     LDX $e3
  $A369: D5 E3     CMP $e3,X
  $A36B: 04 E4     NOP $e4
  $A36D: 35 E4     AND $e4,X
  $A36F: 64 E4     NOP $e4
  $A371: 93 E4     ??? ($e4),Y
  $A373: C0 E4     CPY #$e4
  $A375: EB E4     SBC #$e4
  $A377: 03 04     SLO ($04,X)
  $A379: 03 4A     SLO ($4a,X)
  $A37B: 04 60     NOP $60
  $A37D: 65 62     ADC $62
  $A37F: 25 A8     AND $a8
  $A381: 04 05     NOP $05
  $A383: 22        ???
  $A384: 49 03     EOR #$03
  $A386: 4B 23     ALR #$23
  $A388: A8        TAY
  $A389: 04 61     NOP $61
  $A38B: 65 63     ADC $63
  $A38D: 05 07     ORA $07
  $A38F: 22        ???
  $A390: 4C 03 4E  JMP $4e03
  $A393: 23 98     RLA ($98,X)
  $A395: 04 64     NOP $64
  $A397: 05 66     ORA $66
  $A399: 25 7F     AND $7f
  $A39B: 26 6C     ROL $6c
  $A39D: 06 02     ASL $02
  $A39F: 25 67     AND $67
  $A3A1: 66 6D     ROR $6d
  $A3A3: 20 17 E5  JSR $e517
  $A3A6: 03 04     SLO ($04,X)
  $A3A8: 03 53     SLO ($53,X)
  $A3AA: 04 60     NOP $60
  $A3AC: 65 62     ADC $62
  $A3AE: 25 A8     AND $a8
  $A3B0: 04 05     NOP $05
  $A3B2: 02        ???
  $A3B3: 54 22     NOP $22,X
  $A3B5: 49 03     EOR #$03
  $A3B7: 56 04     LSR $04,X
  $A3B9: 61 65     ADC ($65,X)
  $A3BB: 63 05     RRA ($05,X)
  $A3BD: 07 02     SLO $02
  $A3BF: 55 22     EOR $22,X
  $A3C1: 4C 03 57  JMP $5703
  $A3C4: 04 64     NOP $64
  $A3C6: 05 66     ORA $66
  $A3C8: 25 7F     AND $7f
  $A3CA: 26 6C     ROL $6c
  $A3CC: 06 02     ASL $02
  $A3CE: 25 67     AND $67
  $A3D0: 66 6D     ROR $6d
  $A3D2: 20 17 E5  JSR $e517
  $A3D5: 03 04     SLO ($04,X)
  $A3D7: 03 4A     SLO ($4a,X)
  $A3D9: 04 59     NOP $59
  $A3DB: 65 5E     ADC $5e
  $A3DD: 25 A8     AND $a8
  $A3DF: 04 05     NOP $05
  $A3E1: 22        ???
  $A3E2: 49 03     EOR #$03
  $A3E4: 4B 23     ALR #$23
  $A3E6: 48        PHA
  $A3E7: 04 5C     NOP $5c
  $A3E9: 65 5F     ADC $5f
  $A3EB: 05 07     ORA $07
  $A3ED: 22        ???
  $A3EE: 4C 03 4E  JMP $4e03
  $A3F1: 23 98     RLA ($98,X)
  $A3F3: 04 5D     NOP $5d
  $A3F5: 05 66     ORA $66
  $A3F7: 25 7F     AND $7f
  $A3F9: 26 6C     ROL $6c
  $A3FB: 06 02     ASL $02
  $A3FD: 25 67     AND $67
  $A3FF: 66 6D     ROR $6d
  $A401: 20 17 E5  JSR $e517
  $A404: 03 04     SLO ($04,X)
  $A406: 03 4A     SLO ($4a,X)
  $A408: 04 7B     NOP $7b
  $A40A: 65 D1     ADC $d1
  $A40C: 25 A8     AND $a8
  $A40E: 04 06     NOP $06
  $A410: 22        ???
  $A411: 49 03     EOR #$03
  $A413: 4B 23     ALR #$23
  $A415: A8        TAY
  $A416: 04 7E     NOP $7e
  $A418: 64 A8     NOP $a8
  $A41A: 65 D4     ADC $d4
  $A41C: 05 07     ORA $07
  $A41E: 22        ???
  $A41F: 4C 03 4E  JMP $4e03
  $A422: 23 98     RLA ($98,X)
  $A424: 04 64     NOP $64
  $A426: 05 D5     ORA $d5
  $A428: 25 7F     AND $7f
  $A42A: 26 6C     ROL $6c
  $A42C: 06 02     ASL $02
  $A42E: 25 67     AND $67
  $A430: 66 6D     ROR $6d
  $A432: 20 17 E5  JSR $e517
  $A435: 03 03     SLO ($03,X)
  $A437: 03 71     SLO ($71,X)
  $A439: 04 73     NOP $73
  $A43B: 25 79     AND $79
  $A43D: 04 06     NOP $06
  $A43F: 22        ???
  $A440: 49 03     EOR #$03
  $A442: 74 23     NOP $23,X
  $A444: A8        TAY
  $A445: 04 76     NOP $76
  $A447: 64 A8     NOP $a8
  $A449: 65 7C     ADC $7c
  $A44B: 05 07     ORA $07
  $A44D: 22        ???
  $A44E: 4C 03 75  JMP $7503
  $A451: 23 98     RLA ($98,X)
  $A453: 04 77     NOP $77
  $A455: 05 7D     ORA $7d
  $A457: 25 7F     AND $7f
  $A459: 26 6C     ROL $6c
  $A45B: 06 02     ASL $02
  $A45D: 25 67     AND $67
  $A45F: 66 6D     ROR $6d
  $A461: 20 17 E5  JSR $e517
  $A464: 03 04     SLO ($04,X)
  $A466: 03 44     SLO ($44,X)
  $A468: 04 60     NOP $60
  $A46A: 65 62     ADC $62
  $A46C: 25 A8     AND $a8
  $A46E: 04 05     NOP $05
  $A470: 22        ???
  $A471: 49 03     EOR #$03
  $A473: 45 23     EOR $23
  $A475: 48        PHA
  $A476: 04 61     NOP $61
  $A478: 65 63     ADC $63
  $A47A: 05 07     ORA $07
  $A47C: 22        ???
  $A47D: 4C 03 50  JMP $5003
  $A480: 23 98     RLA ($98,X)
  $A482: 04 51     NOP $51
  $A484: 05 66     ORA $66
  $A486: 25 7F     AND $7f
  $A488: 26 6C     ROL $6c
  $A48A: 06 02     ASL $02
  $A48C: 25 67     AND $67
  $A48E: 66 6D     ROR $6d
  $A490: 20 17 E5  JSR $e517
  $A493: 03 03     SLO ($03,X)
  $A495: 03 71     SLO ($71,X)
  $A497: 04 A9     NOP $a9
  $A499: 25 79     AND $79
  $A49B: 04 06     NOP $06
  $A49D: 22        ???
  $A49E: 49 03     EOR #$03
  $A4A0: A6 23     LDX $23
  $A4A2: A8        TAY
  $A4A3: 04 AC     NOP $ac
  $A4A5: 64 A8     NOP $a8
  $A4A7: 65 AE     ADC $ae
  $A4A9: 05 06     ORA $06
  $A4AB: 22        ???
  $A4AC: 4C 03 A7  JMP $a703
  $A4AF: 23 98     RLA ($98,X)
  $A4B1: 04 AD     NOP $ad
  $A4B3: 25 AF     AND $af
  $A4B5: 26 6C     ROL $6c
  $A4B7: 06 02     ASL $02
  $A4B9: 25 67     AND $67
  $A4BB: 66 6D     ROR $6d
  $A4BD: 20 17 E5  JSR $e517
  $A4C0: 03 04     SLO ($04,X)
  $A4C2: 03 4A     SLO ($4a,X)
  $A4C4: 04 60     NOP $60
  $A4C6: 65 62     ADC $62
  $A4C8: 25 A8     AND $a8
  $A4CA: 04 04     NOP $04
  $A4CC: 62        ???
  $A4CD: C1 03     CMP ($03,X)
  $A4CF: C2 04     NOP #$04
  $A4D1: C8        INY
  $A4D2: 65 CA     ADC $ca
  $A4D4: 05 06     ORA $06
  $A4D6: 62        ???
  $A4D7: C4 03     CPY $03
  $A4D9: C3 04     DCP ($04,X)
  $A4DB: C9 05     CMP #$05
  $A4DD: CB 25     AXS #$25
  $A4DF: 7F 26 9E  RRA $9e26,X
  $A4E2: 06 02     ASL $02
  $A4E4: 25 9D     AND $9d
  $A4E6: 66 9F     ROR $9f
  $A4E8: 20 17 E5  JSR $e517
  $A4EB: 03 03     SLO ($03,X)
  $A4ED: 03 71     SLO ($71,X)
  $A4EF: 04 73     NOP $73
  $A4F1: 25 79     AND $79
  $A4F3: 04 06     NOP $06
  $A4F5: 22        ???
  $A4F6: 49 03     EOR #$03
  $A4F8: 74 23     NOP $23,X
  $A4FA: A8        TAY
  $A4FB: 04 47     NOP $47
  $A4FD: 24 A8     BIT $a8
  $A4FF: 65 4D     ADC $4d
  $A501: 05 07     ORA $07
  $A503: 22        ???
  $A504: 4C 03 75  JMP $7503
  $A507: 23 98     RLA ($98,X)
  $A509: 04 52     NOP $52
  $A50B: 05 58     ORA $58
  $A50D: 25 7F     AND $7f
  $A50F: 26 6C     ROL $6c
  $A511: 06 02     ASL $02
  $A513: 25 67     AND $67
  $A515: 66 6D     ROR $6d
  $A517: 00        BRK
  $A518: 01 6A     ORA ($6a,X)
  $A51A: 3D 01 03  AND $0301,X
  $A51D: 28        PLP
  $A51E: 40        RTI
  $A51F: 29 42     AND #$42
  $A521: 6A        ROR A
  $A522: 48        PHA
  $A523: 02        ???
  $A524: 05 64     ORA $64
  $A526: 35 65     AND $65,X
  $A528: 37 67     RLA $67,X
  $A52A: 3F 28 95  RLA $9528,X
  $A52D: 29 97     AND #$97
  $A52F: 03 04     SLO ($04,X)
  $A531: 26 68     ROL $68
  $A533: 46 7F     LSR $7f
  $A535: 47 6A     SRE $6a
  $A537: 68        PLA
  $A538: C0 04     CPY #$04
  $A53A: 04 60     NOP $60
  $A53C: 41 61     EOR ($61,X)
  $A53E: 43 26     SRE ($26,X)
  $A540: 69 47     ADC #$47
  $A542: 6B 05     ARR #$05
  $A544: 02        ???
  $A545: 61 46     ADC ($46,X)
  $A547: 27 6E     RLA $6e
  $A549: 06 01     ASL $01
  $A54B: 67 6F     RRA $6f
  $A54D: 07 03     SLO $03
  $A54F: 66 72     ROR $72
  $A551: 67 4F     RRA $4f
  $A553: 68        PLA
  $A554: 65 08     ADC $08
  $A556: 02        ???
  $A557: 67 5A     RRA $5a
  $A559: 68        PLA
  $A55A: 70 0E     BVS $a56a
  $A55C: 01 67     ORA ($67,X)
  $A55E: 5B E0 0D  SRE $0de0,Y
  $A561: 73 E5     RRA ($e5),Y
  $A563: 9C E5 C7  SHY $c7e5,X
  $A566: E5 F0     SBC $f0
  $A568: E5 17     SBC $17
  $A56A: E6 3C     INC $3c
  $A56C: E6 63     INC $63
  $A56E: E6 82     INC $82
  $A570: E6 AB     INC $ab
  $A572: E6 05     INC $05
  $A574: 06 23     ASL $23
  $A576: 0F 24 25  SLO $2524
  $A579: 04 3E     NOP $3e
  $A57B: 25 27     AND $27
  $A57D: 26 95     ROL $95
  $A57F: 66 08     ROR $08
  $A581: 06 07     ASL $07
  $A583: 03 1A     SLO ($1a,X)
  $A585: 04 30     NOP $30
  $A587: 05 32     ORA $32
  $A589: 65 02     ADC $02
  $A58B: 06 38     ASL $38
  $A58D: 66 08     ROR $08
  $A58F: 07 3A     SLO $3a
  $A591: 07 03     SLO $03
  $A593: 04 31     NOP $31
  $A595: 05 33     ORA $33
  $A597: 06 39     ASL $39
  $A599: 20 CD E6  JSR $e6cd
  $A59C: 05 06     ORA $06
  $A59E: 23 44     RLA ($44,X)
  $A5A0: 24 25     BIT $25
  $A5A2: 04 46     NOP $46
  $A5A4: 25 27     AND $27
  $A5A6: 26 95     ROL $95
  $A5A8: 66 08     ROR $08
  $A5AA: 06 07     ASL $07
  $A5AC: 03 45     SLO ($45,X)
  $A5AE: 04 47     NOP $47
  $A5B0: 05 32     ORA $32
  $A5B2: 65 02     ADC $02
  $A5B4: 06 38     ASL $38
  $A5B6: 66 08     ROR $08
  $A5B8: 07 3A     SLO $3a
  $A5BA: 07 04     SLO $04
  $A5BC: 03 50     SLO ($50,X)
  $A5BE: 04 52     NOP $52
  $A5C0: 05 33     ORA $33
  $A5C2: 06 39     ASL $39
  $A5C4: 20 CD E6  JSR $e6cd
  $A5C7: 05 06     ORA $06
  $A5C9: 23 0F     RLA ($0f,X)
  $A5CB: 24 25     BIT $25
  $A5CD: 04 3E     NOP $3e
  $A5CF: 25 27     AND $27
  $A5D1: 26 95     ROL $95
  $A5D3: 66 08     ROR $08
  $A5D5: 06 07     ASL $07
  $A5D7: 03 1A     SLO ($1a,X)
  $A5D9: 04 30     NOP $30
  $A5DB: 05 32     ORA $32
  $A5DD: 65 02     ADC $02
  $A5DF: 06 53     ASL $53
  $A5E1: 66 08     ROR $08
  $A5E3: 07 3A     SLO $3a
  $A5E5: 07 03     SLO $03
  $A5E7: 04 31     NOP $31
  $A5E9: 05 33     ORA $33
  $A5EB: 06 51     ASL $51
  $A5ED: 20 CD E6  JSR $e6cd
  $A5F0: 05 05     ORA $05
  $A5F2: 23 0F     RLA ($0f,X)
  $A5F4: 24 25     BIT $25
  $A5F6: 04 3E     NOP $3e
  $A5F8: 25 54     AND $54
  $A5FA: 26 9D     ROL $9d
  $A5FC: 06 07     ASL $07
  $A5FE: 03 1A     SLO ($1a,X)
  $A600: 04 30     NOP $30
  $A602: 05 55     ORA $55
  $A604: 65 02     ADC $02
  $A606: 06 57     ASL $57
  $A608: 66 08     ROR $08
  $A60A: 07 3A     SLO $3a
  $A60C: 07 03     SLO $03
  $A60E: 04 31     NOP $31
  $A610: 05 33     ORA $33
  $A612: 06 39     ASL $39
  $A614: 20 CD E6  JSR $e6cd
  $A617: 05 05     ORA $05
  $A619: 23 0F     RLA ($0f,X)
  $A61B: 24 58     BIT $58
  $A61D: 25 27     AND $27
  $A61F: 26 95     ROL $95
  $A621: 66 08     ROR $08
  $A623: 06 05     ASL $05
  $A625: 04 59     NOP $59
  $A627: 05 5B     ORA $5b
  $A629: 65 02     ADC $02
  $A62B: 06 71     ASL $71
  $A62D: 66 08     ROR $08
  $A62F: 07 04     SLO $04
  $A631: 04 5C     NOP $5c
  $A633: 05 5E     ORA $5e
  $A635: 06 74     ASL $74
  $A637: 07 73     SLO $73
  $A639: 20 CD E6  JSR $e6cd
  $A63C: 05 06     ORA $06
  $A63E: 23 0F     RLA ($0f,X)
  $A640: 24 25     BIT $25
  $A642: 04 3E     NOP $3e
  $A644: 25 27     AND $27
  $A646: 26 95     ROL $95
  $A648: 66 08     ROR $08
  $A64A: 06 06     ASL $06
  $A64C: 04 35     NOP $35
  $A64E: 05 32     ORA $32
  $A650: 65 02     ADC $02
  $A652: 06 38     ASL $38
  $A654: 66 08     ROR $08
  $A656: 07 3A     SLO $3a
  $A658: 07 03     SLO $03
  $A65A: 04 60     NOP $60
  $A65C: 05 4B     ORA $4b
  $A65E: 06 61     ASL $61
  $A660: 20 CD E6  JSR $e6cd
  $A663: 05 05     ORA $05
  $A665: 23 0F     RLA ($0f,X)
  $A667: 24 58     BIT $58
  $A669: 25 5A     AND $5a
  $A66B: 26 97     ROL $97
  $A66D: 66 08     ROR $08
  $A66F: 06 03     ASL $03
  $A671: 04 4C     NOP $4c
  $A673: 65 4E     ADC $4e
  $A675: 66 64     ROR $64
  $A677: 07 03     SLO $03
  $A679: 04 4D     NOP $4d
  $A67B: 05 4F     ORA $4f
  $A67D: 06 65     ASL $65
  $A67F: 20 CD E6  JSR $e6cd
  $A682: 05 06     ORA $06
  $A684: 63 72     RRA ($72,X)
  $A686: 04 78     NOP $78
  $A688: 24 25     BIT $25
  $A68A: 25 7A     AND $7a
  $A68C: 26 95     ROL $95
  $A68E: 66 08     ROR $08
  $A690: 06 07     ASL $07
  $A692: 03 1A     SLO ($1a,X)
  $A694: 04 30     NOP $30
  $A696: 05 79     ORA $79
  $A698: 65 02     ADC $02
  $A69A: 06 7B     ASL $7b
  $A69C: 66 08     ROR $08
  $A69E: 07 3A     SLO $3a
  $A6A0: 07 03     SLO $03
  $A6A2: 04 31     NOP $31
  $A6A4: 05 33     ORA $33
  $A6A6: 06 39     ASL $39
  $A6A8: 20 DA E6  JSR $e6da
  $A6AB: 05 05     ORA $05
  $A6AD: 23 0F     RLA ($0f,X)
  $A6AF: 24 58     BIT $58
  $A6B1: 25 27     AND $27
  $A6B3: 26 95     ROL $95
  $A6B5: 66 08     ROR $08
  $A6B7: 06 06     ASL $06
  $A6B9: 04 59     NOP $59
  $A6BB: 05 32     ORA $32
  $A6BD: 65 02     ADC $02
  $A6BF: 06 41     ASL $41
  $A6C1: 66 08     ROR $08
  $A6C3: 07 3A     SLO $3a
  $A6C5: 07 03     SLO $03
  $A6C7: 04 5C     NOP $5c
  $A6C9: 05 33     ORA $33
  $A6CB: 06 39     ASL $39
  $A6CD: 04 04     NOP $04
  $A6CF: 23 0E     RLA ($0e,X)
  $A6D1: 24 24     BIT $24
  $A6D3: 65 84     ADC $84
  $A6D5: 25 26     AND $26
  $A6D7: 20 E4 E6  JSR $e6e4
  $A6DA: 04 04     NOP $04
  $A6DC: 63 67     RRA ($67,X)
  $A6DE: 24 6D     BIT $6d
  $A6E0: 65 84     ADC $84
  $A6E2: 25 6F     AND $6f
  $A6E4: 00        BRK
  $A6E5: 04 28     NOP $28
  $A6E7: 85 29     STA $29
  $A6E9: 87 69     SAX $69
  $A6EB: C0 6A     CPY #$6a
  $A6ED: 8D 01 06  STA $0601
  $A6F0: 67 7E     RRA $7e
  $A6F2: 28        PLP
  $A6F3: 90 29     BCC $a71e
  $A6F5: 92        ???
  $A6F6: 2A        ROL A
  $A6F7: 98        TYA
  $A6F8: 2B 76     ANC #$76
  $A6FA: 6C 7C 02  JMP ($027c)
  $A6FD: 08        PHP
  $A6FE: 65 80     ADC $80
  $A700: 66 82     ROR $82
  $A702: 67 7F     RRA $7f
  $A704: 68        PLA
  $A705: 91 48     STA ($48),Y
  $A707: 02        ???
  $A708: 69 93     ADC #$93
  $A70A: 2A        ROL A
  $A70B: 99 2B 77  STA $772b,Y
  $A70E: 03 0C     SLO ($0c,X)
  $A710: 60        RTS
  $A711: 01 61     ORA ($61,X)
  $A713: 03 62     SLO ($62,X)
  $A715: 09 63     ORA #$63
  $A717: 0B 24     ANC #$24
  $A719: 21 65     AND ($65,X)
  $A71B: 81 66     STA ($66,X)
  $A71D: 83 67     SAX ($67,X)
  $A71F: 89 48     NOP #$48
  $A721: 94 69     STY $69,X
  $A723: 96 49     STX $49,Y
  $A725: 02        ???
  $A726: 6A        ROR A
  $A727: 9C 04 08  SHY $0804,X
  $A72A: 60        RTS
  $A72B: 04 61     NOP $61
  $A72D: 06 62     ASL $62
  $A72F: 0C 66 86  NOP $8666
  $A732: 67 8C     RRA $8c
  $A734: 27 3F     RLA $3f
  $A736: 48        PHA
  $A737: 11 49     ORA ($49),Y
  $A739: 7D 05 02  ADC $0205,X
  $A73C: 27 75     RLA $75
  $A73E: 68        PLA
  $A73F: 14 06     NOP $06,X
  $A741: 01 68     ORA ($68,X)
  $A743: 15 E0     ORA $e0,X
  $A745: 86 02     STX $02
  $A747: 02        ???
  $A748: 6A        ROR A
  $A749: BC 6B BD  LDY $bd6b,X
  $A74C: 03 02     SLO ($02,X)
  $A74E: EA        NOP
  $A74F: BC EB BD  LDY $bdeb,X
  $A752: E0 86     CPX #$86
  $A754: 13 03     SLO ($03),Y
  $A756: 68        PLA
  $A757: AE 69 BB  LDX $bb69
  $A75A: 6A        ROR A
  $A75B: EA        NOP
  $A75C: 00        BRK
  $A75D: 03 68     SLO ($68,X)
  $A75F: AF 69 BE  LAX $be69
  $A762: 6A        ROR A
  $A763: EB 01     SBC #$01
  $A765: 02        ???
  $A766: 68        PLA
  $A767: BA        TSX
  $A768: 69 BF     ADC #$bf
  $A76A: E0 0B     CPX #$0b
  $A76C: 76 E7     ROR $e7,X
  $A76E: 99 E7 BC  STA $bce7,Y
  $A771: E7 DD     ISB $dd
  $A773: E7 DD     ISB $dd
  $A775: E7 0B     ISB $0b
  $A777: 04 04     NOP $04
  $A779: 88        DEY
  $A77A: 45 8A     EOR $8a
  $A77C: 46 A0     LSR $a0
  $A77E: 47 A2     SRE $a2
  $A780: 0C 06 04  NOP $0406
  $A783: 89 25     NOP #$25
  $A785: 8B 45     XAA #$45
  $A787: 86 26     STX $26
  $A789: A1 46     LDA ($46,X)
  $A78B: 87 47     SAX $47
  $A78D: A3 0D     LAX ($0d,X)
  $A78F: 04 04     NOP $04
  $A791: 8C 45 8E  STY $8e45
  $A794: 46 A4     LSR $a4
  $A796: 47 A6     SRE $a6
  $A798: E0 0B     CPX #$0b
  $A79A: 04 04     NOP $04
  $A79C: 88        DEY
  $A79D: 45 99     EOR $99
  $A79F: 46 A0     LSR $a0
  $A7A1: 47 A2     SRE $a2
  $A7A3: 0C 06 04  NOP $0406
  $A7A6: 91 25     STA ($25),Y
  $A7A8: 93 45     ??? ($45),Y
  $A7AA: 94 26     STY $26,X
  $A7AC: A1 46     LDA ($46,X)
  $A7AE: 87 47     SAX $47
  $A7B0: A3 0D     LAX ($0d,X)
  $A7B2: 04 04     NOP $04
  $A7B4: 96 45     STX $45,Y
  $A7B6: 9C 46 A4  SHY $a446,X
  $A7B9: 47 A6     SRE $a6
  $A7BB: E0 0B     CPX #$0b
  $A7BD: 04 04     NOP $04
  $A7BF: 8D 05 8F  STA $8f05
  $A7C2: 46 A5     LSR $a5
  $A7C4: 67 A7     RRA $a7
  $A7C6: 0C 06 04  NOP $0406
  $A7C9: 98        TYA
  $A7CA: 05 9A     ORA $9a
  $A7CC: 25 90     AND $90
  $A7CE: 26 B0     ROL $b0
  $A7D0: 46 92     LSR $92
  $A7D2: 67 B2     RRA $b2
  $A7D4: 0D 03 05  ORA $0503
  $A7D7: 9B 46 B1  TAS $b146,Y
  $A7DA: 67 B3     RRA $b3
  $A7DC: E0 0B     CPX #$0b
  $A7DE: 04 04     NOP $04
  $A7E0: 88        DEY
  $A7E1: 45 8A     EOR $8a
  $A7E3: 46 A0     LSR $a0
  $A7E5: 47 A2     SRE $a2
  $A7E7: 0C 06 04  NOP $0406
  $A7EA: 9E 25 8B  SHX $8b25,Y
  $A7ED: 45 86     EOR $86
  $A7EF: 26 A1     ROL $a1
  $A7F1: 46 87     LSR $87
  $A7F3: 47 A3     SRE $a3
  $A7F5: 0D 04 04  ORA $0404
  $A7F8: 8C 45 8E  STY $8e45
  $A7FB: 46 A4     LSR $a4
  $A7FD: 47 A6     SRE $a6
  $A7FF: E0 0B     CPX #$0b
  $A801: 0B E8     ANC #$e8
  $A803: 3A        NOP
  $A804: E8        INX
  $A805: 69 E8     ADC #$e8
  $A807: 98        TYA
  $A808: E8        INX
  $A809: 98        TYA
  $A80A: E8        INX
  $A80B: 01 01     ORA ($01,X)
  $A80D: 46 95     LSR $95
  $A80F: 02        ???
  $A810: 02        ???
  $A811: 46 97     LSR $97
  $A813: 47 9D     SRE $9d
  $A815: 03 03     SLO ($03,X)
  $A817: 45 C0     EOR $c0
  $A819: 46 C2     LSR $c2
  $A81B: 47 C8     SRE $c8
  $A81D: 04 05     NOP $05
  $A81F: 44 C1     NOP $c1
  $A821: 25 C3     AND $c3
  $A823: 45 CB     EOR $cb
  $A825: 26 C9     ROL $c9
  $A827: 46 9F     LSR $9f
  $A829: 05 05     ORA $05
  $A82B: 44 C4     NOP $c4
  $A82D: 05 C6     ORA $c6
  $A82F: 45 CE     EOR $ce
  $A831: 26 CC     ROL $cc
  $A833: 46 CA     LSR $ca
  $A835: 06 01     ASL $01
  $A837: 45 C7     EOR $c7
  $A839: E0 01     CPX #$01
  $A83B: 01 46     ORA ($46,X)
  $A83D: 95 02     STA $02,X
  $A83F: 02        ???
  $A840: 46 97     LSR $97
  $A842: 47 9D     SRE $9d
  $A844: 03 04     SLO ($04,X)
  $A846: 44 D0     NOP $d0
  $A848: 45 D2     EOR $d2
  $A84A: 46 D8     LSR $d8
  $A84C: 47 C8     SRE $c8
  $A84E: 04 05     NOP $05
  $A850: 44 D1     NOP $d1
  $A852: 25 D3     AND $d3
  $A854: 45 D4     EOR $d4
  $A856: 26 D9     ROL $d9
  $A858: 46 C5     LSR $c5
  $A85A: 05 04     ORA $04
  $A85C: 05 D6     ORA $d6
  $A85E: 45 D5     EOR $d5
  $A860: 26 DC     ROL $dc
  $A862: 46 DD     LSR $dd
  $A864: 06 01     ASL $01
  $A866: 45 D7     EOR $d7
  $A868: E0 01     CPX #$01
  $A86A: 01 66     ORA ($66,X)
  $A86C: 95 02     STA $02,X
  $A86E: 02        ???
  $A86F: 66 E0     ROR $e0
  $A871: 67 E2     RRA $e2
  $A873: 03 03     SLO ($03,X)
  $A875: 45 E6     EOR $e6
  $A877: 46 E1     LSR $e1
  $A879: 67 E3     RRA $e3
  $A87B: 04 05     NOP $05
  $A87D: 04 E4     NOP $e4
  $A87F: 05 E8     ORA $e8
  $A881: 45 B4     EOR $b4
  $A883: 26 EA     ROL $ea
  $A885: 46 B6     LSR $b6
  $A887: 05 05     ORA $05
  $A889: 04 E5     NOP $e5
  $A88B: 05 E9     ORA $e9
  $A88D: 45 B5     EOR $b5
  $A88F: 06 EB     ASL $eb
  $A891: 26 B7     ROL $b7
  $A893: 06 01     ASL $01
  $A895: 05 E7     ORA $e7
  $A897: E0 01     CPX #$01
  $A899: 01 46     ORA ($46,X)
  $A89B: 95 02     STA $02,X
  $A89D: 02        ???
  $A89E: 46 97     LSR $97
  $A8A0: 47 9D     SRE $9d
  $A8A2: 03 03     SLO ($03,X)
  $A8A4: 45 C0     EOR $c0
  $A8A6: 46 C2     LSR $c2
  $A8A8: 47 C8     SRE $c8
  $A8AA: 04 05     NOP $05
  $A8AC: 44 C1     NOP $c1
  $A8AE: 25 C3     AND $c3
  $A8B0: 45 CB     EOR $cb
  $A8B2: 26 C9     ROL $c9
  $A8B4: 46 9F     LSR $9f
  $A8B6: 05 05     ORA $05
  $A8B8: 44 C4     NOP $c4
  $A8BA: 05 CD     ORA $cd
  $A8BC: 45 CF     EOR $cf
  $A8BE: 26 CC     ROL $cc
  $A8C0: 46 CA     LSR $ca
  $A8C2: 06 01     ASL $01
  $A8C4: 45 C7     EOR $c7
  $A8C6: E0 8B     CPX #$8b
  $A8C8: 02        ???
  $A8C9: 04 67     NOP $67
  $A8CB: A8        TAY
  $A8CC: 68        PLA
  $A8CD: AA        TAX
  $A8CE: 69 B8     ADC #$b8
  $A8D0: 6A        ROR A
  $A8D1: BA        TSX
  $A8D2: 03 04     SLO ($04,X)
  $A8D4: 67 A9     RRA $a9
  $A8D6: 68        PLA
  $A8D7: AB 69     ATX #$69
  $A8D9: B9 6A BB  LDA $bb6a,Y
  $A8DC: 04 04     NOP $04
  $A8DE: 67 AC     RRA $ac
  $A8E0: 68        PLA
  $A8E1: AE 69 BC  LDX $bc69
  $A8E4: 6A        ROR A
  $A8E5: BE 05 04  LDX $0405,Y
  $A8E8: 67 AD     RRA $ad
  $A8EA: 68        PLA
  $A8EB: AF 69 BD  LAX $bd69
  $A8EE: 6A        ROR A
  $A8EF: BF E0 80  LAX $80e0,Y
  $A8F2: E0 87     CPX #$87
  $A8F4: 02        ???
  $A8F5: 02        ???
  $A8F6: 65 2A     ADC $2a
  $A8F8: 66 22     ROR $22
  $A8FA: 03 02     SLO ($02,X)
  $A8FC: 65 2B     ADC $2b
  $A8FE: 66 23     ROR $23
  $A900: 04 02     NOP $02
  $A902: 65 80     ADC $80
  $A904: 66 28     ROR $28
  $A906: 05 02     ORA $02
  $A908: 65 81     ADC $81
  $A90A: 66 29     ROR $29
  $A90C: E0 84     CPX #$84
  $A90E: 03 02     SLO ($02,X)
  $A910: 65 80     ADC $80
  $A912: 66 82     ROR $82
  $A914: 04 02     NOP $02
  $A916: 65 81     ADC $81
  $A918: 66 83     ROR $83
  $A91A: E0 0A     CPX #$0a
  $A91C: 2E E9 2E  ROL $2ee9
  $A91F: E9 2E     SBC #$2e
  $A921: E9 2E     SBC #$2e
  $A923: E9 2E     SBC #$2e
  $A925: E9 2E     SBC #$2e
  $A927: E9 2E     SBC #$2e
  $A929: E9 3F     SBC #$3f
  $A92B: E9 2E     SBC #$2e
  $A92D: E9 05     SBC #$05
  $A92F: 03 65     SLO ($65,X)
  $A931: BF 25 7F  LAX $7f25,Y
  $A934: 26 6C     ROL $6c
  $A936: 06 02     ASL $02
  $A938: 25 67     AND $67
  $A93A: 66 6D     ROR $6d
  $A93C: 20 4D E9  JSR $e94d
  $A93F: 05 03     ORA $03
  $A941: 65 EA     ADC $ea
  $A943: 25 7F     AND $7f
  $A945: 26 9E     ROL $9e
  $A947: 06 02     ASL $02
  $A949: 25 9D     AND $9d
  $A94B: 66 9F     ROR $9f
  $A94D: 05 01     ORA $01
  $A94F: 62        ???
  $A950: B5 06     LDA $06,X
  $A952: 03 62     SLO ($62,X)
  $A954: E0 63     CPX #$63
  $A956: E2 64     NOP #$64
  $A958: E8        INX
  $A959: 20 A8 E9  JSR $e9a8
  $A95C: 97 03     SAX $03,Y
  $A95E: 02        ???
  $A95F: 65 F7     ADC $f7
  $A961: 66 F3     ROR $f3
  $A963: 04 02     NOP $02
  $A965: 65 F5     ADC $f5
  $A967: 66 F6     ROR $f6
  $A969: E0 0A     CPX #$0a
  $A96B: 7D E9 7D  ADC $7de9,X
  $A96E: E9 7D     SBC #$7d
  $A970: E9 7D     SBC #$7d
  $A972: E9 7D     SBC #$7d
  $A974: E9 7D     SBC #$7d
  $A976: E9 7D     SBC #$7d
  $A978: E9 8E     SBC #$8e
  $A97A: E9 7D     SBC #$7d
  $A97C: E9 05     SBC #$05
  $A97E: 03 65     SLO ($65,X)
  $A980: BF 25 7F  LAX $7f25,Y
  $A983: 26 6C     ROL $6c
  $A985: 06 02     ASL $02
  $A987: 25 67     AND $67
  $A989: 66 6D     ROR $6d
  $A98B: 20 9C E9  JSR $e99c
  $A98E: 05 03     ORA $03
  $A990: 65 EA     ADC $ea
  $A992: 25 7F     AND $7f
  $A994: 26 9E     ROL $9e
  $A996: 06 02     ASL $02
  $A998: 25 9D     AND $9d
  $A99A: 66 9F     ROR $9f
  $A99C: 05 01     ORA $01
  $A99E: 62        ???
  $A99F: AA        TAX
  $A9A0: 06 03     ASL $03
  $A9A2: 62        ???
  $A9A3: AB 63     ATX #$63
  $A9A5: BA        TSX
  $A9A6: 64 BB     NOP $bb
  $A9A8: 03 06     SLO ($06,X)
  $A9AA: 63 B7     RRA ($b7,X)
  $A9AC: 03 4A     SLO ($4a,X)
  $A9AE: 64 BD     NOP $bd
  $A9B0: 04 60     NOP $60
  $A9B2: 65 62     ADC $62
  $A9B4: 25 A8     AND $a8
  $A9B6: 04 06     NOP $06
  $A9B8: 62        ???
  $A9B9: B4 22     LDY $22,X
  $A9BB: 49 63     EOR #$63
  $A9BD: B6 64     LDX $64,Y
  $A9BF: BC 65 BE  LDY $be65,X
  $A9C2: 25 A8     AND $a8
  $A9C4: 05 03     ORA $03
  $A9C6: 22        ???
  $A9C7: 4C E3 B6  JMP $b6e3
  $A9CA: E4 BC     CPX $bc
  $A9CC: 20 17 E5  JSR $e517
  $A9CF: 8D 0B 03  STA $030b
  $A9D2: 6D 80 6E  ADC $6e80
  $A9D5: 82 6F     NOP #$6f
  $A9D7: 88        DEY
  $A9D8: 0C 03 6D  NOP $6d03
  $A9DB: 81 6E     STA ($6e,X)
  $A9DD: 83 6F     SAX ($6f,X)
  $A9DF: 89 0D     NOP #$0d
  $A9E1: 03 6D     SLO ($6d,X)
  $A9E3: 84 6E     STY $6e
  $A9E5: 86 6F     STX $6f
  $A9E7: 8C E0 95  STY $95e0
  $A9EA: 07 02     SLO $02
  $A9EC: 60        RTS
  $A9ED: 3D 61 3F  AND $3f61,X
  $A9F0: 08        PHP
  $A9F1: 03 60     SLO ($60,X)
  $A9F3: 68        PLA
  $A9F4: 61 6A     ADC ($6a,X)
  $A9F6: 62        ???
  $A9F7: 6F 0E 03  RRA $030e
  $A9FA: 60        RTS
  $A9FB: 69 61     ADC #$61
  $A9FD: 6B 62     ARR #$62
  $A9FF: 7A        NOP
  $AA00: 0F 03 60  SLO $6003
  $AA03: 6C 61 6E  JMP ($6e61)
  $AA06: 62        ???
  $AA07: 7B E0 95  RRA $95e0,Y
  $AA0A: 15 01     ORA $01,X
  $AA0C: 6B 34     ARR #$34
  $AA0E: 14 03     NOP $03,X
  $AA10: 69 02     ADC #$02
  $AA12: 6A        ROR A
  $AA13: 08        PHP
  $AA14: 6B 0A     ARR #$0a
  $AA16: 13 03     SLO ($03),Y
  $AA18: 68        PLA
  $AA19: 01 69     ORA ($69,X)
  $AA1B: 03 6A     SLO ($6a,X)
  $AA1D: 1F 00 03  SLO $0300,X
  $AA20: 53 04     SRE ($04),Y
  $AA22: 73 3E     RRA ($3e),Y
  $AA24: 74 06     NOP $06,X
  $AA26: 01 04     ORA ($04,X)
  $AA28: 65 22     ADC $22
  $AA2A: 66 28     ROR $28
  $AA2C: 47 2A     SRE $2a
  $AA2E: 48        PHA
  $AA2F: 05 02     ORA $02
  $AA31: 05 04     ORA $04
  $AA33: 21 05     AND ($05,X)
  $AA35: 23 46     RLA ($46,X)
  $AA37: 29 47     AND #$47
  $AA39: 2B 48     ANC #$48
  $AA3B: 10 03     BPL $aa40
  $AA3D: 08        PHP
  $AA3E: 62        ???
  $AA3F: 0C 63 0E  NOP $0e63
  $AA42: 24 24     BIT $24
  $AA44: 25 26     AND $26
  $AA46: 46 2C     LSR $2c
  $AA48: 47 2E     SRE $2e
  $AA4A: 68        PLA
  $AA4B: 11 69     ORA ($69),Y
  $AA4D: 12        ???
  $AA4E: 04 0A     NOP $0a
  $AA50: 62        ???
  $AA51: 0D 63 0F  ORA $0f63
  $AA54: 24 25     BIT $25
  $AA56: 45 27     EOR $27
  $AA58: 25 3C     AND $3c
  $AA5A: 46 2D     LSR $2d
  $AA5C: 66 3B     ROR $3b
  $AA5E: 67 2F     RRA $2f
  $AA60: 68        PLA
  $AA61: 14 69     NOP $69,X
  $AA63: 13 05     SLO ($05),Y
  $AA65: 09 62     ORA #$62
  $AA67: 18        CLC
  $AA68: 03 1A     SLO ($1a,X)
  $AA6A: 04 30     NOP $30
  $AA6C: 24 33     BIT $33
  $AA6E: 25 37     AND $37
  $AA70: 45 32     EOR $32
  $AA72: 65 36     ADC $36
  $AA74: 66 38     ROR $38
  $AA76: 67 3A     RRA $3a
  $AA78: 06 03     ASL $03
  $AA7A: 02        ???
  $AA7B: 19 03 1B  ORA $1b03,Y
  $AA7E: 04 31     NOP $31
  $AA80: 07 02     SLO $02
  $AA82: 62        ???
  $AA83: 1C 03 1E  NOP $1e03,X
  $AA86: E0 13     CPX #$13
  $AA88: 92        ???
  $AA89: EA        NOP
  $AA8A: B5 EA     LDA $ea,X
  $AA8C: 6E EB DA  ROR $daeb
  $AA8F: EA        NOP
  $AA90: FF EA 01  ISB $01ea,X
  $AA93: 04 05     NOP $05
  $AA95: 14 45     NOP $45,X
  $AA97: 1C 06 16  NOP $1606,X
  $AA9A: 46 1E     LSR $1e
  $AA9C: 02        ???
  $AA9D: 04 24     NOP $24
  $AA9F: 10 05     BPL $aaa6
  $AAA1: 12        ???
  $AAA2: 06 18     ASL $18
  $AAA4: 47 1A     SRE $1a
  $AAA6: 03 05     SLO ($05,X)
  $AAA8: 24 11     BIT $11
  $AAAA: 05 13     ORA $13
  $AAAC: 45 1B     EOR $1b
  $AAAE: 46 19     LSR $19
  $AAB0: 47 2D     SRE $2d
  $AAB2: 20 25 EB  JSR $eb25
  $AAB5: 01 02     ORA ($02,X)
  $AAB7: 45 1C     EOR $1c
  $AAB9: 46 2E     LSR $2e
  $AABB: 02        ???
  $AABC: 06 24     ASL $24
  $AABE: 37 05     RLA $05,X
  $AAC0: 38        SEC
  $AAC1: 25 2A     AND $2a
  $AAC3: 06 3A     ASL $3a
  $AAC5: 66 3F     ROR $3f
  $AAC7: 47 3E     SRE $3e
  $AAC9: 03 06     SLO ($06,X)
  $AACB: 24 3D     BIT $3d
  $AACD: 05 39     ORA $39
  $AACF: 25 2B     AND $2b
  $AAD1: 06 3B     ASL $3b
  $AAD3: 46 2F     LSR $2f
  $AAD5: 47 3C     SRE $3c
  $AAD7: 20 25 EB  JSR $eb25
  $AADA: 01 03     ORA ($03,X)
  $AADC: 45 4A     EOR $4a
  $AADE: 06 4B     ASL $4b
  $AAE0: 46 1E     LSR $1e
  $AAE2: 02        ???
  $AAE3: 04 24     NOP $24
  $AAE5: 40        RTI
  $AAE6: 05 42     ORA $42
  $AAE8: 06 48     ASL $48
  $AAEA: 47 3E     SRE $3e
  $AAEC: 03 07     SLO ($07,X)
  $AAEE: 24 41     BIT $41
  $AAF0: 05 43     ORA $43
  $AAF2: 25 2B     AND $2b
  $AAF4: 45 15     EOR $15
  $AAF6: 06 49     ASL $49
  $AAF8: 46 2F     LSR $2f
  $AAFA: 47 2D     SRE $2d
  $AAFC: 20 25 EB  JSR $eb25
  $AAFF: 0A        ASL A
  $AB00: 01 05     ORA ($05,X)
  $AB02: 60        RTS
  $AB03: 0B 01     ANC #$01
  $AB05: 05 61     ORA $61
  $AB07: 01 02     ORA ($02,X)
  $AB09: 45 1C     EOR $1c
  $AB0B: 46 6E     LSR $6e
  $AB0D: 02        ???
  $AB0E: 04 24     NOP $24
  $AB10: 15 06     ORA $06,X
  $AB12: 62        ???
  $AB13: 66 69     ROR $69
  $AB15: 47 3E     SRE $3e
  $AB17: 03 06     SLO ($06,X)
  $AB19: 24 3D     BIT $3d
  $AB1B: 45 68     EOR $68
  $AB1D: 25 2B     AND $2b
  $AB1F: 06 63     ASL $63
  $AB21: 46 6A     LSR $6a
  $AB23: 47 2D     SRE $2d
  $AB25: 01 06     ORA ($06,X)
  $AB27: 24 01     BIT $01
  $AB29: 47 20     SRE $20
  $AB2B: 48        PHA
  $AB2C: 22        ???
  $AB2D: 49 28     EOR #$28
  $AB2F: 69 21     ADC #$21
  $AB31: 6A        ROR A
  $AB32: 31 02     AND ($02),Y
  $AB34: 03 48     SLO ($48,X)
  $AB36: 23 49     RLA ($49,X)
  $AB38: 29 6A     AND #$6a
  $AB3A: 34 03     NOP $03,X
  $AB3C: 03 43     SLO ($43,X)
  $AB3E: 02        ???
  $AB3F: 48        PHA
  $AB40: 26 49     ROL $49
  $AB42: 2C 04 07  BIT $0704
  $AB45: 43 03     SRE ($03,X)
  $AB47: 24 09     BIT $09
  $AB49: 25 0B     AND $0b
  $AB4B: 45 0A     EOR $0a
  $AB4D: 46 24     LSR $24
  $AB4F: 47 25     SRE $25
  $AB51: 48        PHA
  $AB52: 27 05     RLA $05
  $AB54: 04 62     NOP $62
  $AB56: 04 43     NOP $43
  $AB58: 06 44     ASL $44
  $AB5A: 0C 45 0E  NOP $0e45
  $AB5D: 06 02     ASL $02
  $AB5F: 43 07     SRE ($07,X)
  $AB61: 44 0D     NOP $0d
  $AB63: 07 02     SLO $02
  $AB65: 43 05     SRE ($05,X)
  $AB67: 44 0F     NOP $0f
  $AB69: 08        PHP
  $AB6A: 01 63     ORA ($63,X)
  $AB6C: 08        PHP
  $AB6D: E0 01     CPX #$01
  $AB6F: 07 24     SLO $24
  $AB71: 01 05     ORA ($05,X)
  $AB73: 46 06     LSR $06
  $AB75: 4C 07 4E  JMP $4e07
  $AB78: 08        PHP
  $AB79: 64 69     NOP $69
  $AB7B: 66 6A     ROR $6a
  $AB7D: 31 02     AND ($02),Y
  $AB7F: 08        PHP
  $AB80: 24 45     BIT $45
  $AB82: 25 47     AND $47
  $AB84: 06 4D     ASL $4d
  $AB86: 66 44     ROR $44
  $AB88: 07 4F     SLO $4f
  $AB8A: 08        PHP
  $AB8B: 65 69     ADC $69
  $AB8D: 67 6A     RRA $6a
  $AB8F: 34 03     NOP $03,X
  $AB91: 08        PHP
  $AB92: 43 02     SRE ($02,X)
  $AB94: 24 50     BIT $50
  $AB96: 05 52     ORA $52
  $AB98: 25 51     AND $51
  $AB9A: 06 58     ASL $58
  $AB9C: 07 5A     SLO $5a
  $AB9E: 08        PHP
  $AB9F: 70 69     BVS $ac0a
  $ABA1: 72        ???
  $ABA2: 04 07     NOP $07
  $ABA4: 43 03     SRE ($03,X)
  $ABA6: 24 09     BIT $09
  $ABA8: 05 53     ORA $53
  $ABAA: 25 54     AND $54
  $ABAC: 06 24     ASL $24
  $ABAE: 07 5B     SLO $5b
  $ABB0: 08        PHP
  $ABB1: 71 05     ADC ($05),Y
  $ABB3: 05 62     ORA $62
  $ABB5: 04 43     NOP $43
  $ABB7: 56 63     LSR $63,X
  $ABB9: 55 44     EOR $44,X
  $ABBB: 0C 45 0E  NOP $0e45
  $ABBE: 06 03     ASL $03
  $ABC0: 43 57     SRE ($57,X)
  $ABC2: 63 59     RRA ($59,X)
  $ABC4: 44 5C     NOP $5c
  $ABC6: 07 02     SLO $02
  $ABC8: 63 05     RRA ($05,X)
  $ABCA: 64 5D     NOP $5d
  $ABCC: 08        PHP
  $ABCD: 01 63     ORA ($63,X)
  $ABCF: 08        PHP
  $ABD0: E0 93     CPX #$93
  $ABD2: 13 01     SLO ($01),Y
  $ABD4: 6A        ROR A
  $ABD5: 5F 00 03  SRE $0300,X
  $ABD8: 69 5E     ADC #$5e
  $ABDA: 6A        ROR A
  $ABDB: 74 6B     NOP $6b,X
  $ABDD: 76 02     ROR $02,X
  $ABDF: 03 6A     SLO ($6a,X)
  $ABE1: 7B 6B 78  RRA $786b,Y
  $ABE4: 6C 7A 03  JMP ($037a)
  $ABE7: 02        ???
  $ABE8: 6A        ROR A
  $ABE9: 73 6B     RRA ($6b),Y
  $ABEB: 79 E0 84  ADC $84e0,Y
  $ABEE: 02        ???
  $ABEF: 03 03     SLO ($03,X)
  $ABF1: D6 64     DEC $64,X
  $ABF3: F4 05     NOP $05,X
  $ABF5: ED 03 03  SBC $0303
  $ABF8: 03 D2     SLO ($d2,X)
  $ABFA: 64 D5     NOP $d5
  $ABFC: 65 D7     ADC $d7
  $ABFE: 04 03     NOP $03
  $AC00: 03 F1     SLO ($f1,X)
  $AC02: 64 DD     NOP $dd
  $AC04: 05 F9     ORA $f9
  $AC06: 20 A5 FB  JSR $fba5
  $AC09: 13 14     SLO ($14),Y
  $AC0B: EC 21 EC  CPX $ec21
  $AC0E: 14 EC     NOP $ec,X
  $AC10: 14 EC     NOP $ec,X
  $AC12: 14 EC     NOP $ec,X
  $AC14: 01 02     ORA ($02,X)
  $AC16: 6A        ROR A
  $AC17: D0 6B     BNE $ac84
  $AC19: D2        ???
  $AC1A: 02        ???
  $AC1B: 02        ???
  $AC1C: 6A        ROR A
  $AC1D: D1 6B     CMP ($6b),Y
  $AC1F: D3 E0     DCP ($e0),Y
  $AC21: 01 02     ORA ($02,X)
  $AC23: 6A        ROR A
  $AC24: C4 6B     CPY $6b
  $AC26: C6 02     DEC $02
  $AC28: 02        ???
  $AC29: 6A        ROR A
  $AC2A: C5 6B     CMP $6b
  $AC2C: C7 E0     DCP $e0
  $AC2E: 88        DEY
  $AC2F: 03 02     SLO ($02,X)
  $AC31: 65 90     ADC $90
  $AC33: 66 92     ROR $92
  $AC35: 04 02     NOP $02
  $AC37: 65 91     ADC $91
  $AC39: 66 93     ROR $93
  $AC3B: E0 8B     CPX #$8b
  $AC3D: 01 03     ORA ($03,X)
  $AC3F: 64 04     NOP $04
  $AC41: 65 09     ADC $09
  $AC43: 66 0F     ROR $0f
  $AC45: 02        ???
  $AC46: 05 63     ORA $63
  $AC48: 01 64     ORA ($64,X)
  $AC4A: 05 65     ORA $65
  $AC4C: 0A        ASL A
  $AC4D: 66 ED     ROR $ed
  $AC4F: 67 EF     RRA $ef
  $AC51: 03 05     SLO ($05,X)
  $AC53: 63 DA     RRA ($da,X)
  $AC55: 64 F0     NOP $f0
  $AC57: 65 F2     ADC $f2
  $AC59: 66 F8     ROR $f8
  $AC5B: 67 FA     RRA $fa
  $AC5D: 04 04     NOP $04
  $AC5F: 64 F1     NOP $f1
  $AC61: 65 0C     ADC $0c
  $AC63: 66 F9     ROR $f9
  $AC65: 67 FB     RRA $fb
  $AC67: 05 03     ORA $03
  $AC69: 65 DB     ADC $db
  $AC6B: 66 13     ROR $13
  $AC6D: 67 F3     RRA $f3
  $AC6F: 06 02     ASL $02
  $AC71: 66 EC     ROR $ec
  $AC73: 67 EE     RRA $ee
  $AC75: E0 05     CPX #$05
  $AC77: 89 EC     NOP #$ec
  $AC79: AC EC D1  LDY $d1ec
  $AC7C: EC F4 EC  CPX $ecf4
  $AC7F: 15 ED     ORA $ed,X
  $AC81: 32        ???
  $AC82: ED 55 ED  SBC $ed55
  $AC85: 78        SEI
  $AC86: ED 9B ED  SBC $ed9b
  $AC89: 03 05     SLO ($05,X)
  $AC8B: 02        ???
  $AC8C: 05 22     ORA $22
  $AC8E: 22        ???
  $AC8F: 03 07     SLO ($07,X)
  $AC91: 64 0D     NOP $0d
  $AC93: 25 0F     AND $0f
  $AC95: 04 04     NOP $04
  $AC97: 02        ???
  $AC98: 10 03     BPL $ac9d
  $AC9A: 12        ???
  $AC9B: 64 18     NOP $18
  $AC9D: 04 02     NOP $02
  $AC9F: 05 04     ORA $04
  $ACA1: 02        ???
  $ACA2: 11 03     ORA ($03),Y
  $ACA4: 13 04     SLO ($04),Y
  $ACA6: 19 24 02  ORA $0224,Y
  $ACA9: 20 B7 ED  JSR $edb7
  $ACAC: 03 05     SLO ($05,X)
  $ACAE: 02        ???
  $ACAF: 05 22     ORA $22
  $ACB1: 22        ???
  $ACB2: 03 07     SLO ($07,X)
  $ACB4: 64 51     NOP $51
  $ACB6: 25 0F     AND $0f
  $ACB8: 04 04     NOP $04
  $ACBA: 01 45     ORA ($45,X)
  $ACBC: 02        ???
  $ACBD: 47 03     SRE $03
  $ACBF: 4D 64 54  EOR $5464
  $ACC2: 05 05     ORA $05
  $ACC4: 01 50     ORA ($50,X)
  $ACC6: 02        ???
  $ACC7: 52        ???
  $ACC8: 03 58     SLO ($58,X)
  $ACCA: 04 19     NOP $19
  $ACCC: 24 02     BIT $02
  $ACCE: 20 B7 ED  JSR $edb7
  $ACD1: 03 05     SLO ($05,X)
  $ACD3: 02        ???
  $ACD4: 05 22     ORA $22
  $ACD6: 22        ???
  $ACD7: 03 14     SLO ($14,X)
  $ACD9: 64 16     NOP $16
  $ACDB: 25 0F     AND $0f
  $ACDD: 04 04     NOP $04
  $ACDF: 02        ???
  $ACE0: 10 03     BPL $ace5
  $ACE2: 15 64     ORA $64,X
  $ACE4: 17 04     SLO $04,X
  $ACE6: 02        ???
  $ACE7: 05 04     ORA $04
  $ACE9: 02        ???
  $ACEA: 11 03     ORA ($03),Y
  $ACEC: 13 04     SLO ($04),Y
  $ACEE: 19 24 02  ORA $0224,Y
  $ACF1: 20 B7 ED  JSR $edb7
  $ACF4: 03 05     SLO ($05,X)
  $ACF6: 02        ???
  $ACF7: 05 22     ORA $22
  $ACF9: 22        ???
  $ACFA: 03 1D     SLO ($1d,X)
  $ACFC: 64 1F     NOP $1f
  $ACFE: 25 0F     AND $0f
  $AD00: 04 03     NOP $03
  $AD02: 02        ???
  $AD03: 10 03     BPL $ad08
  $AD05: 48        PHA
  $AD06: 64 4A     NOP $4a
  $AD08: 05 04     ORA $04
  $AD0A: 02        ???
  $AD0B: 11 03     ORA ($03),Y
  $AD0D: 13 04     SLO ($04),Y
  $AD0F: 19 24 02  ORA $0224,Y
  $AD12: 20 B7 ED  JSR $edb7
  $AD15: 03 04     SLO ($04,X)
  $AD17: 02        ???
  $AD18: 4B 03     ALR #$03
  $AD1A: 61 64     ADC ($64,X)
  $AD1C: 63 25     RRA ($25,X)
  $AD1E: 46 04     LSR $04
  $AD20: 03 02     SLO ($02,X)
  $AD22: 4E 03 64  LSR $6403
  $AD25: 64 66     NOP $66
  $AD27: 05 03     ORA $03
  $AD29: 02        ???
  $AD2A: 4F 03 44  SRE $4403
  $AD2D: 24 67     BIT $67
  $AD2F: 20 B7 ED  JSR $edb7
  $AD32: 03 05     SLO ($05,X)
  $AD34: 02        ???
  $AD35: 5A        NOP
  $AD36: 22        ???
  $AD37: 22        ???
  $AD38: 03 53     SLO ($53,X)
  $AD3A: 64 59     NOP $59
  $AD3C: 25 0F     AND $0f
  $AD3E: 04 04     NOP $04
  $AD40: 02        ???
  $AD41: 55 03     EOR $03,X
  $AD43: 56 64     LSR $64,X
  $AD45: 5C 04 02  NOP $0204,X
  $AD48: 05 04     ORA $04
  $AD4A: 02        ???
  $AD4B: 4F 03 57  SRE $5703
  $AD4E: 04 5D     NOP $5d
  $AD50: 24 02     BIT $02
  $AD52: 20 B7 ED  JSR $edb7
  $AD55: 03 06     SLO ($06,X)
  $AD57: 02        ???
  $AD58: 5A        NOP
  $AD59: 22        ???
  $AD5A: 22        ???
  $AD5B: 63 70     RRA ($70,X)
  $AD5D: 03 65     SLO ($65,X)
  $AD5F: 64 72     NOP $72
  $AD61: 25 0F     AND $0f
  $AD63: 04 03     NOP $03
  $AD65: 02        ???
  $AD66: 5B 03 71  SRE $7103,Y
  $AD69: 64 73     NOP $73
  $AD6B: 05 04     ORA $04
  $AD6D: 02        ???
  $AD6E: 5E 03 74  LSR $7403,X
  $AD71: 04 76     NOP $76
  $AD73: 24 02     BIT $02
  $AD75: 20 B7 ED  JSR $edb7
  $AD78: 03 05     SLO ($05,X)
  $AD7A: 02        ???
  $AD7B: 3E 62 22  ROL $2262,X
  $AD7E: 03 35     SLO ($35,X)
  $AD80: 64 37     NOP $37
  $AD82: 25 0F     AND $0f
  $AD84: 04 04     NOP $04
  $AD86: 02        ???
  $AD87: 10 03     BPL $ad8c
  $AD89: 60        RTS
  $AD8A: 64 62     NOP $62
  $AD8C: 04 02     NOP $02
  $AD8E: 05 04     ORA $04
  $AD90: 02        ???
  $AD91: 11 03     ORA ($03),Y
  $AD93: 13 04     SLO ($04),Y
  $AD95: 3D 24 02  AND $0224,X
  $AD98: 20 CA ED  JSR $edca
  $AD9B: 03 05     SLO ($05,X)
  $AD9D: 02        ???
  $AD9E: 05 22     ORA $22
  $ADA0: 22        ???
  $ADA1: 03 40     SLO ($40,X)
  $ADA3: 64 42     NOP $42
  $ADA5: 25 46     AND $46
  $ADA7: 04 03     NOP $03
  $ADA9: 02        ???
  $ADAA: 49 03     EOR #$03
  $ADAC: 41 64     EOR ($64,X)
  $ADAE: 43 05     SRE ($05,X)
  $ADB0: 03 02     SLO ($02,X)
  $ADB2: 4C 03 44  JMP $4403
  $ADB5: 24 67     BIT $67
  $ADB7: 02        ???
  $ADB8: 02        ???
  $ADB9: 22        ???
  $ADBA: 04 23     NOP $23
  $ADBC: 06 05     ASL $05
  $ADBE: 01 25     ORA ($25,X)
  $ADC0: 1B 06 02  SLO $0206,Y
  $ADC3: 24 1C     BIT $1c
  $ADC5: 25 1E     AND $1e
  $ADC7: 20 DA ED  JSR $edda
  $ADCA: 02        ???
  $ADCB: 02        ???
  $ADCC: 62        ???
  $ADCD: 36 23     ROL $23,X
  $ADCF: 3C 05 01  NOP $0105,X
  $ADD2: 25 3F     AND $3f
  $ADD4: 06 02     ASL $02
  $ADD6: 24 68     BIT $68
  $ADD8: 65 6A     ADC $6a
  $ADDA: 00        BRK
  $ADDB: 01 62     ORA ($62,X)
  $ADDD: 03 01     SLO ($01,X)
  $ADDF: 01 62     ORA ($62,X)
  $ADE1: 01 02     ORA ($02,X)
  $ADE3: 02        ???
  $ADE4: 24 0C     BIT $0c
  $ADE6: 65 0E     ADC $0e
  $ADE8: 03 05     SLO ($05,X)
  $ADEA: 23 02     RLA ($02,X)
  $ADEC: 24 02     BIT $02
  $ADEE: 45 02     EOR $02
  $ADF0: 46 25     LSR $25
  $ADF2: 47 27     SRE $27
  $ADF4: 04 05     NOP $05
  $ADF6: 25 1A     AND $1a
  $ADF8: 46 30     LSR $30
  $ADFA: 26 02     ROL $02
  $ADFC: 47 32     SRE $32
  $ADFE: 68        PLA
  $ADFF: 38        SEC
  $AE00: 05 05     ORA $05
  $AE02: 46 31     LSR $31
  $AE04: 47 33     SRE $33
  $AE06: 68        PLA
  $AE07: 39 69 2E  AND $2e69,Y
  $AE0A: 2A        ROL A
  $AE0B: 08        PHP
  $AE0C: 06 06     ASL $06
  $AE0E: 66 34     ROR $34
  $AE10: 68        PLA
  $AE11: 2D 29 2F  AND $2f29
  $AE14: 2A        ROL A
  $AE15: 09 2B     ORA #$2b
  $AE17: 0B 6C     ANC #$6c
  $AE19: 3A        NOP
  $AE1A: 07 03     SLO $03
  $AE1C: 65 0A     ADC $0a
  $AE1E: 66 20     ROR $20
  $AE20: 6C 3B E0  JMP ($e03b)
  $AE23: 8A        TXA
  $AE24: 0B 03     ANC #$03
  $AE26: 6D CC 6E  ADC $6ecc
  $AE29: CE 6F C5  DEC $c56f
  $AE2C: 0C 03 6D  NOP $6d03
  $AE2F: 78        SEI
  $AE30: 6E 7A 6F  ROR $6f7a
  $AE33: D0 0D     BNE $ae42
  $AE35: 03 ED     SLO ($ed,X)
  $AE37: CC EE CE  CPY $ceee
  $AE3A: EF C5 E0  ISB $e0c5
  $AE3D: 85 00     STA $00
  $AE3F: 03 67     SLO ($67,X)
  $AE41: 80 68     NOP #$68
  $AE43: 82 69     NOP #$69
  $AE45: 88        DEY
  $AE46: 01 05     ORA ($05,X)
  $AE48: 26 21     ROL $21
  $AE4A: 67 81     RRA $81
  $AE4C: 27 23     RLA $23
  $AE4E: 68        PLA
  $AE4F: 83 69     SAX ($69,X)
  $AE51: 89 02     NOP #$02
  $AE53: 05 26     ORA $26
  $AE55: 24 67     BIT $67
  $AE57: 84 27     STY $27
  $AE59: 26 68     ROL $68
  $AE5B: 86 69     STX $69
  $AE5D: 8C E0 85  STY $85e0
  $AE60: 00        BRK
  $AE61: 03 67     SLO ($67,X)
  $AE63: 80 68     NOP #$68
  $AE65: 82 69     NOP #$69
  $AE67: 88        DEY
  $AE68: 01 04     ORA ($04,X)
  $AE6A: 26 69     ROL $69
  $AE6C: 67 7C     RRA $7c
  $AE6E: 68        PLA
  $AE6F: 83 69     SAX ($69,X)
  $AE71: 89 02     NOP #$02
  $AE73: 05 26     ORA $26
  $AE75: 6C 67 7D  JMP ($7d67)
  $AE78: 27 02     RLA $02
  $AE7A: 68        PLA
  $AE7B: 7A        NOP
  $AE7C: 69 79     ADC #$79
  $AE7E: 03 01     SLO ($01,X)
  $AE80: 68        PLA
  $AE81: 7B E0 85  RRA $85e0,Y
  $AE84: 00        BRK
  $AE85: 03 67     SLO ($67,X)
  $AE87: 80 68     NOP #$68
  $AE89: 82 69     NOP #$69
  $AE8B: 88        DEY
  $AE8C: 01 04     ORA ($04,X)
  $AE8E: 26 69     ROL $69
  $AE90: 67 6B     RRA $6b
  $AE92: 68        PLA
  $AE93: 83 69     SAX ($69,X)
  $AE95: 89 02     NOP #$02
  $AE97: 05 26     ORA $26
  $AE99: 6C 67 6E  JMP ($6e67)
  $AE9C: 27 02     RLA $02
  $AE9E: 68        PLA
  $AE9F: 6D 69 6F  ADC $6f69
  $AEA2: 03 01     SLO ($01,X)
  $AEA4: 68        PLA
  $AEA5: 78        SEI
  $AEA6: E0 85     CPX #$85
  $AEA8: 13 02     SLO ($02),Y
  $AEAA: 68        PLA
  $AEAB: 85 69     STA $69
  $AEAD: 87 00     SAX $00
  $AEAF: 03 67     SLO ($67,X)
  $AEB1: 80 68     NOP #$68
  $AEB3: 82 69     NOP #$69
  $AEB5: 8D 01 05  STA $0501
  $AEB8: 26 21     ROL $21
  $AEBA: 67 81     RRA $81
  $AEBC: 27 23     RLA $23
  $AEBE: 68        PLA
  $AEBF: 83 69     SAX ($69,X)
  $AEC1: 89 02     NOP #$02
  $AEC3: 05 26     ORA $26
  $AEC5: 24 67     BIT $67
  $AEC7: 84 27     STY $27
  $AEC9: 26 68     ROL $68
  $AECB: 86 69     STX $69
  $AECD: 8C E0 85  STY $85e0
  $AED0: 13 02     SLO ($02),Y
  $AED2: 68        PLA
  $AED3: 5F 69 75  SRE $7569,X
  $AED6: 00        BRK
  $AED7: 03 67     SLO ($67,X)
  $AED9: 80 68     NOP #$68
  $AEDB: 82 69     NOP #$69
  $AEDD: 77 01     RRA $01,X
  $AEDF: 05 26     ORA $26
  $AEE1: 21 67     AND ($67,X)
  $AEE3: 81 27     STA ($27,X)
  $AEE5: 23 68     RLA ($68,X)
  $AEE7: 83 69     SAX ($69,X)
  $AEE9: 89 02     NOP #$02
  $AEEB: 05 26     ORA $26
  $AEED: 24 67     BIT $67
  $AEEF: 84 27     STY $27
  $AEF1: 26 68     ROL $68
  $AEF3: 86 69     STX $69
  $AEF5: 8C E0 88  STY $88e0
  $AEF8: 0B 03     ANC #$03
  $AEFA: 6D A7 6E  ADC $6ea7
  $AEFD: AD 6F AF  LDA $af6f
  $AF00: 0C 03 6D  NOP $6d03
  $AF03: B2        ???
  $AF04: 6E B8 6F  ROR $6fb8
  $AF07: BA        TSX
  $AF08: 0D 03 6D  ORA $6d03
  $AF0B: B3 6E     LAX ($6e),Y
  $AF0D: B9 6F BB  LDA $bb6f,Y
  $AF10: E0 88     CPX #$88
  $AF12: 0B 03     ANC #$03
  $AF14: 6D 8D 6E  ADC $6e8d
  $AF17: 8F 6F A5  SAX $a56f
  $AF1A: 0C 03 6D  NOP $6d03
  $AF1D: 98        TYA
  $AF1E: 6E 9A 6F  ROR $6f9a
  $AF21: B0 0D     BCS $af30
  $AF23: 03 6D     SLO ($6d,X)
  $AF25: 99 6E 9B  STA $9b6e,Y
  $AF28: 6F B1 E0  RRA $e0b1
  $AF2B: 88        DEY
  $AF2C: 02        ???
  $AF2D: 02        ???
  $AF2E: 6A        ROR A
  $AF2F: 90 6B     BCC $af9c
  $AF31: 92        ???
  $AF32: 03 02     SLO ($02,X)
  $AF34: 6A        ROR A
  $AF35: 91 6B     STA ($6b),Y
  $AF37: 93 E0     ??? ($e0),Y
  $AF39: 90 15     BCC $af50
  $AF3B: 02        ???
  $AF3C: 6A        ROR A
  $AF3D: 4F 6B 67  SRE $676b
  $AF40: 14 01     NOP $01,X
  $AF42: 6B 72     ARR #$72
  $AF44: 13 01     SLO ($01),Y
  $AF46: 6B 5E     ARR #$5e
  $AF48: 00        BRK
  $AF49: 02        ???
  $AF4A: 6A        ROR A
  $AF4B: 75 6B     ADC $6b,X
  $AF4D: 5F E0 90  SRE $90e0,X
  $AF50: 15 02     ORA $02,X
  $AF52: 6A        ROR A
  $AF53: 5B 6B 71  SRE $716b,Y
  $AF56: 14 01     NOP $01,X
  $AF58: 6B 74     ARR #$74
  $AF5A: 13 01     SLO ($01),Y
  $AF5C: 6B 65     ARR #$65
  $AF5E: 00        BRK
  $AF5F: 02        ???
  $AF60: 6A        ROR A
  $AF61: 5A        NOP
  $AF62: 6B 70     ARR #$70
  $AF64: E0 93     CPX #$93
  $AF66: 13 01     SLO ($01),Y
  $AF68: 6A        ROR A
  $AF69: 7C 00 03  NOP $0300,X
  $AF6C: 69 77     ADC #$77
  $AF6E: 6A        ROR A
  $AF6F: 7D 6B 7F  ADC $7f6b,X
  $AF72: 02        ???
  $AF73: 03 6A     SLO ($6a,X)
  $AF75: 6C 6B D4  JMP ($d46b)
  $AF78: 6C D5 03  JMP ($03d5)
  $AF7B: 02        ???
  $AF7C: 6A        ROR A
  $AF7D: 6D 6B 6F  ADC $6f6b
  $AF80: E0 95     CPX #$95
  $AF82: 03 02     SLO ($02,X)
  $AF84: 65 80     ADC $80
  $AF86: 66 82     ROR $82
  $AF88: 04 02     NOP $02
  $AF8A: 65 81     ADC $81
  $AF8C: 66 83     ROR $83
  $AF8E: E0 95     CPX #$95
  $AF90: 07 02     SLO $02
  $AF92: 60        RTS
  $AF93: 66 61     ROR $61
  $AF95: 6D 08 03  ADC $0308
  $AF98: 60        RTS
  $AF99: 67 61     RRA $61
  $AF9B: 78        SEI
  $AF9C: 62        ???
  $AF9D: 6F 0E 03  RRA $030e
  $AFA0: 60        RTS
  $AFA1: 69 61     ADC #$61
  $AFA3: 79 62 35  ADC $3562,Y
  $AFA6: 0F 03 60  SLO $6003
  $AFA9: 6C 61 7C  JMP ($7c61)
  $AFAC: 62        ???
  $AFAD: 7E E0 95  ROR $95e0,X
  $AFB0: 07 01     SLO $01
  $AFB2: 61 16     ADC ($16,X)
  $AFB4: 08        PHP
  $AFB5: 02        ???
  $AFB6: 61 17     ADC ($17,X)
  $AFB8: 62        ???
  $AFB9: 1D E0 0D  ORA $0de0,X
  $AFBC: CE EF FB  DEC $fbef
  $AFBF: EF 2A F0  ISB $f02a
  $AFC2: 57 F0     SRE $f0,X
  $AFC4: 84 F0     STY $f0
  $AFC6: AD F0 D8  LDA $d8f0
  $AFC9: F0 FB     BEQ $afc6
  $AFCB: F0 28     BEQ $aff5
  $AFCD: F1 04     SBC ($04),Y
  $AFCF: 02        ???
  $AFD0: 23 0E     RLA ($0e,X)
  $AFD2: 24 24     BIT $24
  $AFD4: 05 03     ORA $03
  $AFD6: 23 0F     RLA ($0f,X)
  $AFD8: 04 3E     NOP $3e
  $AFDA: 24 25     BIT $25
  $AFDC: 06 07     ASL $07
  $AFDE: 03 1A     SLO ($1a,X)
  $AFE0: 04 30     NOP $30
  $AFE2: 05 32     ORA $32
  $AFE4: 65 02     ADC $02
  $AFE6: 06 38     ASL $38
  $AFE8: 66 08     ROR $08
  $AFEA: 07 3A     SLO $3a
  $AFEC: 07 03     SLO $03
  $AFEE: 04 31     NOP $31
  $AFF0: 05 33     ORA $33
  $AFF2: 06 39     ASL $39
  $AFF4: 05 01     ORA $01
  $AFF6: 25 27     AND $27
  $AFF8: 20 4E F1  JSR $f14e
  $AFFB: 04 02     NOP $02
  $AFFD: 23 0E     RLA ($0e,X)
  $AFFF: 24 24     BIT $24
  $B001: 05 03     ORA $03
  $B003: 23 44     RLA ($44,X)
  $B005: 04 46     NOP $46
  $B007: 24 25     BIT $25
  $B009: 06 07     ASL $07
  $B00B: 03 45     SLO ($45,X)
  $B00D: 04 47     NOP $47
  $B00F: 05 32     ORA $32
  $B011: 65 02     ADC $02
  $B013: 06 38     ASL $38
  $B015: 66 08     ROR $08
  $B017: 07 3A     SLO $3a
  $B019: 07 04     SLO $04
  $B01B: 03 50     SLO ($50,X)
  $B01D: 04 52     NOP $52
  $B01F: 05 33     ORA $33
  $B021: 06 39     ASL $39
  $B023: 05 01     ORA $01
  $B025: 25 27     AND $27
  $B027: 20 4E F1  JSR $f14e
  $B02A: 04 02     NOP $02
  $B02C: 23 0E     RLA ($0e,X)
  $B02E: 24 24     BIT $24
  $B030: 05 03     ORA $03
  $B032: 23 0F     RLA ($0f,X)
  $B034: 04 3E     NOP $3e
  $B036: 24 25     BIT $25
  $B038: 06 07     ASL $07
  $B03A: 03 1A     SLO ($1a,X)
  $B03C: 04 30     NOP $30
  $B03E: 05 32     ORA $32
  $B040: 65 02     ADC $02
  $B042: 06 53     ASL $53
  $B044: 66 08     ROR $08
  $B046: 07 3A     SLO $3a
  $B048: 07 03     SLO $03
  $B04A: 04 31     NOP $31
  $B04C: 05 33     ORA $33
  $B04E: 06 51     ASL $51
  $B050: 05 01     ORA $01
  $B052: 25 27     AND $27
  $B054: 20 4E F1  JSR $f14e
  $B057: 04 02     NOP $02
  $B059: 23 0E     RLA ($0e,X)
  $B05B: 24 24     BIT $24
  $B05D: 05 03     ORA $03
  $B05F: 23 0F     RLA ($0f,X)
  $B061: 04 3E     NOP $3e
  $B063: 24 25     BIT $25
  $B065: 06 07     ASL $07
  $B067: 03 1A     SLO ($1a,X)
  $B069: 04 30     NOP $30
  $B06B: 05 55     ORA $55
  $B06D: 65 02     ADC $02
  $B06F: 06 57     ASL $57
  $B071: 66 08     ROR $08
  $B073: 07 3A     SLO $3a
  $B075: 07 03     SLO $03
  $B077: 04 31     NOP $31
  $B079: 05 33     ORA $33
  $B07B: 06 39     ASL $39
  $B07D: 05 01     ORA $01
  $B07F: 25 54     AND $54
  $B081: 20 4E F1  JSR $f14e
  $B084: 04 02     NOP $02
  $B086: 23 0E     RLA ($0e,X)
  $B088: 24 24     BIT $24
  $B08A: 05 02     ORA $02
  $B08C: 23 0F     RLA ($0f,X)
  $B08E: 24 58     BIT $58
  $B090: 06 05     ASL $05
  $B092: 04 59     NOP $59
  $B094: 05 5B     ORA $5b
  $B096: 65 02     ADC $02
  $B098: 06 71     ASL $71
  $B09A: 66 08     ROR $08
  $B09C: 07 04     SLO $04
  $B09E: 04 5C     NOP $5c
  $B0A0: 05 5E     ORA $5e
  $B0A2: 06 74     ASL $74
  $B0A4: 07 73     SLO $73
  $B0A6: 05 01     ORA $01
  $B0A8: 25 27     AND $27
  $B0AA: 20 4E F1  JSR $f14e
  $B0AD: 04 02     NOP $02
  $B0AF: 23 0E     RLA ($0e,X)
  $B0B1: 24 24     BIT $24
  $B0B3: 05 03     ORA $03
  $B0B5: 23 0F     RLA ($0f,X)
  $B0B7: 04 3E     NOP $3e
  $B0B9: 24 25     BIT $25
  $B0BB: 06 06     ASL $06
  $B0BD: 04 35     NOP $35
  $B0BF: 05 32     ORA $32
  $B0C1: 65 02     ADC $02
  $B0C3: 06 38     ASL $38
  $B0C5: 66 08     ROR $08
  $B0C7: 07 3A     SLO $3a
  $B0C9: 07 03     SLO $03
  $B0CB: 04 60     NOP $60
  $B0CD: 05 4B     ORA $4b
  $B0CF: 06 61     ASL $61
  $B0D1: 05 01     ORA $01
  $B0D3: 25 27     AND $27
  $B0D5: 20 4E F1  JSR $f14e
  $B0D8: 04 02     NOP $02
  $B0DA: 23 0E     RLA ($0e,X)
  $B0DC: 24 24     BIT $24
  $B0DE: 05 02     ORA $02
  $B0E0: 23 0F     RLA ($0f,X)
  $B0E2: 24 58     BIT $58
  $B0E4: 06 03     ASL $03
  $B0E6: 04 4C     NOP $4c
  $B0E8: 65 4E     ADC $4e
  $B0EA: 66 64     ROR $64
  $B0EC: 07 03     SLO $03
  $B0EE: 04 4D     NOP $4d
  $B0F0: 05 4F     ORA $4f
  $B0F2: 06 65     ASL $65
  $B0F4: 05 01     ORA $01
  $B0F6: 25 5A     AND $5a
  $B0F8: 20 4E F1  JSR $f14e
  $B0FB: 04 02     NOP $02
  $B0FD: 63 67     RRA ($67,X)
  $B0FF: 24 6D     BIT $6d
  $B101: 05 03     ORA $03
  $B103: 63 72     RRA ($72,X)
  $B105: 04 78     NOP $78
  $B107: 24 25     BIT $25
  $B109: 06 07     ASL $07
  $B10B: 03 1A     SLO ($1a,X)
  $B10D: 04 30     NOP $30
  $B10F: 05 79     ORA $79
  $B111: 65 02     ADC $02
  $B113: 06 7B     ASL $7b
  $B115: 66 08     ROR $08
  $B117: 07 3A     SLO $3a
  $B119: 07 03     SLO $03
  $B11B: 04 31     NOP $31
  $B11D: 05 33     ORA $33
  $B11F: 06 39     ASL $39
  $B121: 05 01     ORA $01
  $B123: 25 7A     AND $7a
  $B125: 20 4E F1  JSR $f14e
  $B128: 04 02     NOP $02
  $B12A: 23 0E     RLA ($0e,X)
  $B12C: 24 24     BIT $24
  $B12E: 05 02     ORA $02
  $B130: 23 0F     RLA ($0f,X)
  $B132: 24 58     BIT $58
  $B134: 06 06     ASL $06
  $B136: 04 59     NOP $59
  $B138: 05 32     ORA $32
  $B13A: 65 02     ADC $02
  $B13C: 06 41     ASL $41
  $B13E: 66 08     ROR $08
  $B140: 07 3A     SLO $3a
  $B142: 07 03     SLO $03
  $B144: 04 5C     NOP $5c
  $B146: 05 33     ORA $33
  $B148: 06 39     ASL $39
  $B14A: 05 01     ORA $01
  $B14C: 25 27     AND $27
  $B14E: 00        BRK
  $B14F: 01 6A     ORA ($6a,X)
  $B151: 22        ???
  $B152: 01 02     ORA ($02,X)
  $B154: 2A        ROL A
  $B155: 0A        ASL A
  $B156: 2B 20     ANC #$20
  $B158: 02        ???
  $B159: 03 49     SLO ($49,X)
  $B15B: 07 2A     SLO $2a
  $B15D: 0D 2B 3B  ORA $3b2b
  $B160: 03 08     SLO ($08,X)
  $B162: 60        RTS
  $B163: 01 61     ORA ($61,X)
  $B165: 03 62     SLO ($62,X)
  $B167: 09 63     ORA #$63
  $B169: 0B 24     ANC #$24
  $B16B: 21 69     AND ($69,X)
  $B16D: 12        ???
  $B16E: 6A        ROR A
  $B16F: 18        CLC
  $B170: 6B 1B     ARR #$1b
  $B172: 04 05     NOP $05
  $B174: 60        RTS
  $B175: 04 61     NOP $61
  $B177: 06 62     ASL $62
  $B179: 0C 69 13  NOP $1369
  $B17C: 6A        ROR A
  $B17D: 19 05 01  ORA $0105,Y
  $B180: 68        PLA
  $B181: 14 06     NOP $06,X
  $B183: 01 68     ORA ($68,X)
  $B185: 15 E0     ORA $e0,X
  $B187: 0D 9A F1  ORA $f19a
  $B18A: 9A        TXS
  $B18B: F1 9A     SBC ($9a),Y
  $B18D: F1 A7     SBC ($a7),Y
  $B18F: F1 9A     SBC ($9a),Y
  $B191: F1 9A     SBC ($9a),Y
  $B193: F1 B2     SBC ($b2),Y
  $B195: F1 BF     SBC ($bf),Y
  $B197: F1 9A     SBC ($9a),Y
  $B199: F1 04     SBC ($04),Y
  $B19B: 01 25     ORA ($25,X)
  $B19D: 26 05     ROL $05
  $B19F: 02        ???
  $B1A0: 26 2D     ROL $2d
  $B1A2: 66 08     ROR $08
  $B1A4: 20 C9 F1  JSR $f1c9
  $B1A7: 04 01     NOP $01
  $B1A9: 25 26     AND $26
  $B1AB: 05 01     ORA $01
  $B1AD: 26 56     ROL $56
  $B1AF: 20 C9 F1  JSR $f1c9
  $B1B2: 04 01     NOP $01
  $B1B4: 25 26     AND $26
  $B1B6: 05 02     ORA $02
  $B1B8: 26 70     ROL $70
  $B1BA: 66 08     ROR $08
  $B1BC: 20 C9 F1  JSR $f1c9
  $B1BF: 04 01     NOP $01
  $B1C1: 25 6F     AND $6f
  $B1C3: 05 02     ORA $02
  $B1C5: 26 2D     ROL $2d
  $B1C7: 66 08     ROR $08
  $B1C9: 02        ???
  $B1CA: 03 66     SLO ($66,X)
  $B1CC: 28        PLP
  $B1CD: 67 2A     RRA $2a
  $B1CF: 48        PHA
  $B1D0: 05 03     ORA $03
  $B1D2: 04 25     NOP $25
  $B1D4: 23 66     RLA ($66,X)
  $B1D6: 29 67     AND #$67
  $B1D8: 2B 48     ANC #$48
  $B1DA: 10 04     BPL $b1e0
  $B1DC: 04 66     NOP $66
  $B1DE: 2C 27 2E  BIT $2e27
  $B1E1: 67 02     RRA $02
  $B1E3: 48        PHA
  $B1E4: 11 05     ORA ($05),Y
  $B1E6: 01 27     ORA ($27,X)
  $B1E8: 2F E0 8D  RLA $8de0
  $B1EB: 03 02     SLO ($02,X)
  $B1ED: 65 1E     ADC $1e
  $B1EF: 25 23     AND $23
  $B1F1: 04 01     NOP $01
  $B1F3: 65 40     ADC $40
  $B1F5: 05 02     ORA $02
  $B1F7: 26 43     ROL $43
  $B1F9: 66 02     ROR $02
  $B1FB: 20 1F F2  JSR $f21f
  $B1FE: 8D 03 01  STA $0103
  $B201: 65 5F     ADC $5f
  $B203: 04 01     NOP $01
  $B205: 65 37     ADC $37
  $B207: 05 02     ORA $02
  $B209: 65 62     ADC $62
  $B20B: 66 68     ROR $68
  $B20D: 20 1F F2  JSR $f21f
  $B210: 8D 03 01  STA $0103
  $B213: 65 5D     ADC $5d
  $B215: 04 01     NOP $01
  $B217: 65 6A     ADC $6a
  $B219: 05 02     ORA $02
  $B21B: 65 66     ADC $66
  $B21D: 66 6C     ROR $6c
  $B21F: 02        ???
  $B220: 03 66     SLO ($66,X)
  $B222: 16 67     ASL $67,X
  $B224: 1C 48 05  NOP $0548,X
  $B227: 03 04     SLO ($04,X)
  $B229: 66 17     ROR $17
  $B22B: 67 1D     RRA $1d
  $B22D: 68        PLA
  $B22E: 1F 48 10  SLO $1048,X
  $B231: 04 05     NOP $05
  $B233: 25 26     AND $26
  $B235: 66 42     ROR $42
  $B237: 67 48     RRA $48
  $B239: 68        PLA
  $B23A: 4A        LSR A
  $B23B: 48        PHA
  $B23C: 11 05     ORA ($05),Y
  $B23E: 03 25     SLO ($25,X)
  $B240: 27 67     RLA $67
  $B242: 49 27     EOR #$27
  $B244: 2F E0 8D  RLA $8de0
  $B247: 02        ???
  $B248: 04 66     NOP $66
  $B24A: 34 67     NOP $67,X
  $B24C: 36 68     ROL $68,X
  $B24E: 3C 48 05  NOP $0548,X
  $B251: 03 01     SLO ($01,X)
  $B253: 68        PLA
  $B254: 3D 20 65  AND $6520,X
  $B257: F2        ???
  $B258: 8D 02 03  STA $0302
  $B25B: 66 63     ROR $63
  $B25D: 67 69     RRA $69
  $B25F: 48        PHA
  $B260: 6B 03     ARR #$03
  $B262: 01 68     ORA ($68,X)
  $B264: 6E 03 05  ROR $0503
  $B267: 65 1E     ADC $1e
  $B269: 25 23     AND $23
  $B26B: 66 17     ROR $17
  $B26D: 67 1D     RRA $1d
  $B26F: 48        PHA
  $B270: 10 04     BPL $b276
  $B272: 06 65     ASL $65
  $B274: 40        RTI
  $B275: 25 26     AND $26
  $B277: 66 42     ROR $42
  $B279: 67 48     RRA $48
  $B27B: 68        PLA
  $B27C: 4A        LSR A
  $B27D: 48        PHA
  $B27E: 11 05     ORA ($05),Y
  $B280: 04 26     NOP $26
  $B282: 43 66     SRE ($66,X)
  $B284: 02        ???
  $B285: 67 49     RRA $49
  $B287: 27 2F     RLA $2f
  $B289: E0 8E     CPX #$8e
  $B28B: 03 02     SLO ($02,X)
  $B28D: 65 B5     ADC $b5
  $B28F: 66 B7     ROR $b7
  $B291: 04 02     NOP $02
  $B293: 65 E0     ADC $e0
  $B295: 66 E2     ROR $e2
  $B297: E0 96     CPX #$96
  $B299: 1D 01 6C  ORA $6c01,X
  $B29C: FF 14 05  ISB $0514,X
  $B29F: 62        ???
  $B2A0: B0 63     BCS $b305
  $B2A2: B2        ???
  $B2A3: 64 B8     NOP $b8
  $B2A5: 44 B1     NOP $b1
  $B2A7: 45 CA     EOR $ca
  $B2A9: 13 02     SLO ($02),Y
  $B2AB: 63 B3     RRA ($b3,X)
  $B2AD: 64 B9     NOP $b9
  $B2AF: 00        BRK
  $B2B0: 04 63     NOP $63
  $B2B2: B4 64     LDY $64,X
  $B2B4: B6 45     LDX $45,Y
  $B2B6: 9D 46 9F  STA $9f46,X
  $B2B9: 01 05     ORA ($05,X)
  $B2BB: 63 B5     RRA ($b5,X)
  $B2BD: 44 91     NOP $91
  $B2BF: 45 93     EOR $93
  $B2C1: 46 99     LSR $99
  $B2C3: 47 9B     SRE $9b
  $B2C5: 02        ???
  $B2C6: 04 44     NOP $44
  $B2C8: 94 45     STY $45,X
  $B2CA: 96 46     STX $46,Y
  $B2CC: 9C 47 9E  SHY $9e47,X
  $B2CF: 03 02     SLO ($02,X)
  $B2D1: 44 95     NOP $95
  $B2D3: 45 97     EOR $97
  $B2D5: 20 09 F3  JSR $f309
  $B2D8: 96 1D     STX $1d,Y
  $B2DA: 01 6C     ORA ($6c,X)
  $B2DC: FF 13 03  ISB $0313,X
  $B2DF: 44 A2     NOP $a2
  $B2E1: 45 A8     EOR $a8
  $B2E3: 46 AA     LSR $aa
  $B2E5: 00        BRK
  $B2E6: 05 43     ORA $43
  $B2E8: A1 44     LDA ($44,X)
  $B2EA: A3 45     LAX ($45,X)
  $B2EC: A9 46     LDA #$46
  $B2EE: AB 47     ATX #$47
  $B2F0: BA        TSX
  $B2F1: 01 06     ORA ($06,X)
  $B2F3: 42        ???
  $B2F4: A0 43     LDY #$43
  $B2F6: A4 44     LDY $44
  $B2F8: A6 45     LDX $45
  $B2FA: AC 46 AE  LDY $ae46
  $B2FD: 47 BB     SRE $bb
  $B2FF: 02        ???
  $B300: 04 43     NOP $43
  $B302: A5 44     LDA $44
  $B304: A7 45     LAX $45
  $B306: AD 46 AF  LDA $af46
  $B309: 03 01     SLO ($01,X)
  $B30B: 69 D1     ADC #$d1
  $B30D: 04 02     NOP $02
  $B30F: 68        PLA
  $B310: C2 69     NOP #$69
  $B312: C8        INY
  $B313: 05 02     ORA $02
  $B315: 68        PLA
  $B316: C3 69     DCP ($69,X)
  $B318: C9 06     CMP #$06
  $B31A: 03 67     SLO ($67,X)
  $B31C: C0 68     CPY #$68
  $B31E: C6 69     DEC $69
  $B320: CC 07 03  CPY $0307
  $B323: 67 C1     RRA $c1
  $B325: 68        PLA
  $B326: C6 69     DEC $69
  $B328: CD 08 03  CMP $0308
  $B32B: 67 C4     RRA $c4
  $B32D: 68        PLA
  $B32E: C7 69     DCP $69
  $B330: D8        CLD
  $B331: 0E 03 67  ASL $6703
  $B334: C5 68     CMP $68
  $B336: D2        ???
  $B337: 69 D9     ADC #$d9
  $B339: 0F 02 67  SLO $6702
  $B33C: D0 68     BNE $b3a6
  $B33E: D3 E0     DCP ($e0),Y
  $B340: 84 02     STY $02
  $B342: 03 03     SLO ($03,X)
  $B344: CA        DEX
  $B345: 63 25     RRA ($25,X)
  $B347: 64 E0     NOP $e0
  $B349: 03 02     SLO ($02,X)
  $B34B: 03 B3     SLO ($b3,X)
  $B34D: 65 E1     ADC $e1
  $B34F: 04 02     NOP $02
  $B351: 63 C9     RRA ($c9,X)
  $B353: 64 CB     NOP $cb
  $B355: 20 5F F7  JSR $f75f
  $B358: 14 63     NOP $63,X
  $B35A: F3 88     ISB ($88),Y
  $B35C: F3 B1     ISB ($b1),Y
  $B35E: F3 DA     ISB ($da),Y
  $B360: F3 DA     ISB ($da),Y
  $B362: F3 01     ISB ($01),Y
  $B364: 02        ???
  $B365: 05 0A     ORA $0a
  $B367: 46 20     LSR $20
  $B369: 02        ???
  $B36A: 03 04     SLO ($04,X)
  $B36C: 09 05     ORA #$05
  $B36E: 0B 06     ANC #$06
  $B370: 21 03     AND ($03,X)
  $B372: 05 44     ORA $44
  $B374: 0C 04 02  NOP $0204
  $B377: 05 0E     ORA $0e
  $B379: 06 24     ASL $24
  $B37B: 66 02     ROR $02
  $B37D: 04 03     NOP $03
  $B37F: 25 0F     AND $0f
  $B381: 26 25     ROL $25
  $B383: 46 02     LSR $02
  $B385: 20 03 F4  JSR $f403
  $B388: 01 02     ORA ($02,X)
  $B38A: 05 31     ORA $31
  $B38C: 46 33     LSR $33
  $B38E: 02        ???
  $B38F: 05 04     ORA $04
  $B391: 35 05     AND $05,X
  $B393: 34 06     NOP $06,X
  $B395: 36 66     ROL $66,X
  $B397: 3C 46 02  NOP $0246,X
  $B39A: 03 05     SLO ($05,X)
  $B39C: 44 4A     NOP $4a
  $B39E: 04 02     NOP $02
  $B3A0: 05 37     ORA $37
  $B3A2: 65 02     ADC $02
  $B3A4: 66 3D     ROR $3d
  $B3A6: 04 03     NOP $03
  $B3A8: 25 3B     AND $3b
  $B3AA: 26 68     ROL $68
  $B3AC: 46 02     LSR $02
  $B3AE: 20 03 F4  JSR $f403
  $B3B1: 01 03     ORA ($03,X)
  $B3B3: 05 16     ORA $16
  $B3B5: 06 2F     ASL $2f
  $B3B7: 46 14     LSR $14
  $B3B9: 02        ???
  $B3BA: 04 04     NOP $04
  $B3BC: 15 05     ORA $05,X
  $B3BE: 38        SEC
  $B3BF: 06 3A     ASL $3a
  $B3C1: 66 02     ROR $02
  $B3C3: 03 05     SLO ($05,X)
  $B3C5: 44 40     NOP $40
  $B3C7: 04 02     NOP $02
  $B3C9: 05 39     ORA $39
  $B3CB: 65 02     ADC $02
  $B3CD: 66 48     ROR $48
  $B3CF: 04 03     NOP $03
  $B3D1: 45 13     EOR $13
  $B3D3: 46 25     LSR $25
  $B3D5: 46 02     LSR $02
  $B3D7: 20 03 F4  JSR $f403
  $B3DA: 01 03     ORA ($03,X)
  $B3DC: 05 16     ORA $16
  $B3DE: 06 1C     ASL $1c
  $B3E0: 46 14     LSR $14
  $B3E2: 02        ???
  $B3E3: 04 04     NOP $04
  $B3E5: 15 05     ORA $05,X
  $B3E7: 17 06     SLO $06,X
  $B3E9: 1D 66 02  ORA $0266,X
  $B3EC: 03 05     SLO ($05,X)
  $B3EE: 44 40     NOP $40
  $B3F0: 04 02     NOP $02
  $B3F2: 05 42     ORA $42
  $B3F4: 65 02     ADC $02
  $B3F6: 66 48     ROR $48
  $B3F8: 04 03     NOP $03
  $B3FA: 45 13     EOR $13
  $B3FC: 26 25     ROL $25
  $B3FE: 46 02     LSR $02
  $B400: 20 03 F4  JSR $f403
  $B403: 03 01     SLO ($01,X)
  $B405: 43 06     SRE ($06,X)
  $B407: 04 04     NOP $04
  $B409: 42        ???
  $B40A: 05 43     ORA $43
  $B40C: 07 24     SLO $24
  $B40E: 18        CLC
  $B40F: 44 0D     NOP $0d
  $B411: 05 05     ORA $05
  $B413: 42        ???
  $B414: 10 43     BPL $b459
  $B416: 12        ???
  $B417: 45 1A     EOR $1a
  $B419: 46 30     LSR $30
  $B41B: 67 32     RRA $32
  $B41D: 06 03     ASL $03
  $B41F: 62        ???
  $B420: 11 44     ORA ($44),Y
  $B422: 19 45 1B  ORA $1b45,Y
  $B425: 07 02     SLO $02
  $B427: 64 01     NOP $01
  $B429: 65 03     ADC $03
  $B42B: E0 14     CPX #$14
  $B42D: 37 F4     RLA $f4,X
  $B42F: 4A        LSR A
  $B430: F4 5D     NOP $5d,X
  $B432: F4 5D     NOP $5d,X
  $B434: F4 5D     NOP $5d,X
  $B436: F4 01     NOP $01,X
  $B438: 01 47     ORA ($47,X)
  $B43A: 22        ???
  $B43B: 02        ???
  $B43C: 01 47     ORA ($47,X)
  $B43E: 23 03     RLA ($03,X)
  $B440: 01 27     ORA ($27,X)
  $B442: 26 04     ROL $04
  $B444: 01 47     ORA ($47,X)
  $B446: 27 20     RLA $20
  $B448: 6D F4 01  ADC $01f4
  $B44B: 01 47     ORA ($47,X)
  $B44D: 1E 02 01  ASL $0102,X
  $B450: 47 3E     SRE $3e
  $B452: 03 01     SLO ($01,X)
  $B454: 27 3F     RLA $3f
  $B456: 04 01     NOP $01
  $B458: 47 6A     SRE $6a
  $B45A: 20 6D F4  JSR $f46d
  $B45D: 01 01     ORA ($01,X)
  $B45F: 47 1E     SRE $1e
  $B461: 02        ???
  $B462: 01 47     ORA ($47,X)
  $B464: 1F 03 01  SLO $0103,X
  $B467: 27 26     RLA $26
  $B469: 04 01     NOP $01
  $B46B: 47 27     SRE $27
  $B46D: 00        BRK
  $B46E: 01 48     ORA ($48,X)
  $B470: 08        PHP
  $B471: 01 02     ORA ($02,X)
  $B473: 48        PHA
  $B474: 28        PLP
  $B475: 49 2A     EOR #$2a
  $B477: 02        ???
  $B478: 03 27     SLO ($27,X)
  $B47A: 02        ???
  $B47B: 68        PLA
  $B47C: 29 69     AND #$69
  $B47E: 2B 03     ANC #$03
  $B480: 02        ???
  $B481: 48        PHA
  $B482: 2C 69 2E  BIT $2e69
  $B485: 04 02     NOP $02
  $B487: 27 02     RLA $02
  $B489: 48        PHA
  $B48A: 2D E0 14  AND $14e0
  $B48D: 97 F4     SAX $f4,Y
  $B48F: C0 F4     CPY #$f4
  $B491: 97 F4     SAX $f4,Y
  $B493: 97 F4     SAX $f4,Y
  $B495: C0 F4     CPY #$f4
  $B497: 02        ???
  $B498: 04 E4     NOP $e4
  $B49A: 4C E5 4E  JMP $4ee5
  $B49D: E6 64     INC $64
  $B49F: E7 66     ISB $66
  $B4A1: 03 04     SLO ($04,X)
  $B4A3: E4 49     CPX $49
  $B4A5: E5 4B     SBC $4b
  $B4A7: 66 60     ROR $60
  $B4A9: 67 62     RRA $62
  $B4AB: 04 04     NOP $04
  $B4AD: 64 49     NOP $49
  $B4AF: 65 4B     ADC $4b
  $B4B1: 66 61     ROR $61
  $B4B3: 67 63     RRA $63
  $B4B5: 05 04     ORA $04
  $B4B7: 64 4C     NOP $4c
  $B4B9: 65 4E     ADC $4e
  $B4BB: 66 64     ROR $64
  $B4BD: 67 66     RRA $66
  $B4BF: E0 0B     CPX #$0b
  $B4C1: 03 ED     SLO ($ed,X)
  $B4C3: 58        CLI
  $B4C4: EE 5A EF  INC $ef5a
  $B4C7: 70 0C     BVS $b4d5
  $B4C9: 03 6D     SLO ($6d,X)
  $B4CB: 4D 6E 4F  EOR $4f6e
  $B4CE: 6F 65 0D  RRA $0d65
  $B4D1: 03 6D     SLO ($6d,X)
  $B4D3: 58        CLI
  $B4D4: 6E 5A 6F  ROR $6f5a
  $B4D7: 70 E0     BVS $b4b9
  $B4D9: 14 E4     NOP $e4,X
  $B4DB: F4 F0     NOP $f0,X
  $B4DD: F4 F1     NOP $f1,X
  $B4DF: F4 F1     NOP $f1,X
  $B4E1: F4 F1     NOP $f1,X
  $B4E3: F4 01     NOP $01,X
  $B4E5: 02        ???
  $B4E6: E7 4C     ISB $4c
  $B4E8: 47 22     SRE $22
  $B4EA: 02        ???
  $B4EB: 02        ???
  $B4EC: E7 49     ISB $49
  $B4EE: 47 23     SRE $23
  $B4F0: E0 01     CPX #$01
  $B4F2: 02        ???
  $B4F3: E7 4C     ISB $4c
  $B4F5: 47 1E     SRE $1e
  $B4F7: 02        ???
  $B4F8: 02        ???
  $B4F9: E7 49     ISB $49
  $B4FB: 47 1F     SRE $1f
  $B4FD: E0 14     CPX #$14
  $B4FF: 09 F5     ORA #$f5
  $B501: 18        CLC
  $B502: F5 09     SBC $09,X
  $B504: F5 09     SBC $09,X
  $B506: F5 09     SBC $09,X
  $B508: F5 04     SBC $04,X
  $B50A: 02        ???
  $B50B: 68        PLA
  $B50C: 45 69     EOR $69
  $B50E: 47 05     SRE $05
  $B510: 02        ???
  $B511: 68        PLA
  $B512: 50 69     BVC $b57d
  $B514: 52        ???
  $B515: 20 3E F5  JSR $f53e
  $B518: 03 01     SLO ($01,X)
  $B51A: 69 67     ADC #$67
  $B51C: 04 03     NOP $03
  $B51E: 68        PLA
  $B51F: 50 48     BVC $b569
  $B521: 2D 69 52  AND $5269
  $B524: 20 57 F5  JSR $f557
  $B527: 14 32     NOP $32,X
  $B529: F5 4D     SBC $4d,X
  $B52B: F5 32     SBC $32,X
  $B52D: F5 32     SBC $32,X
  $B52F: F5 32     SBC $32,X
  $B531: F5 04     SBC $04,X
  $B533: 02        ???
  $B534: 68        PLA
  $B535: 41 69     EOR ($69,X)
  $B537: 43 05     SRE ($05,X)
  $B539: 02        ???
  $B53A: 68        PLA
  $B53B: 44 69     NOP $69
  $B53D: 46 00     LSR $00
  $B53F: 01 48     ORA ($48,X)
  $B541: 08        PHP
  $B542: 01 03     ORA ($03,X)
  $B544: E8        INX
  $B545: 4E E9 64  LSR $64e9
  $B548: 49 2A     EOR #$2a
  $B54A: 20 AA F5  JSR $f5aa
  $B54D: 03 01     SLO ($01,X)
  $B54F: 69 72     ADC #$72
  $B551: 04 02     NOP $02
  $B553: 68        PLA
  $B554: 44 69     NOP $69
  $B556: 46 00     LSR $00
  $B558: 01 48     ORA ($48,X)
  $B55A: 08        PHP
  $B55B: 01 01     ORA ($01,X)
  $B55D: E9 70     SBC #$70
  $B55F: 20 DD F5  JSR $f5dd
  $B562: 14 6D     NOP $6d,X
  $B564: F5 7C     SBC $7c,X
  $B566: F5 6D     SBC $6d,X
  $B568: F5 6D     SBC $6d,X
  $B56A: F5 6D     SBC $6d,X
  $B56C: F5 00     SBC $00,X
  $B56E: 02        ???
  $B56F: E8        INX
  $B570: 50 E9     BVC $b55b
  $B572: 52        ???
  $B573: 01 02     ORA ($02,X)
  $B575: E8        INX
  $B576: 45 E9     EOR $e9
  $B578: 47 20     SRE $20
  $B57A: A4 F5     LDY $f5
  $B57C: 00        BRK
  $B57D: 02        ???
  $B57E: E8        INX
  $B57F: 50 E9     BVC $b56a
  $B581: 52        ???
  $B582: 01 01     ORA ($01,X)
  $B584: E9 67     SBC #$67
  $B586: 03 01     SLO ($01,X)
  $B588: 69 70     ADC #$70
  $B58A: 20 DD F5  JSR $f5dd
  $B58D: 14 98     NOP $98,X
  $B58F: F5 CD     SBC $cd,X
  $B591: F5 98     SBC $98,X
  $B593: F5 98     SBC $98,X
  $B595: F5 98     SBC $98,X
  $B597: F5 00     SBC $00,X
  $B599: 02        ???
  $B59A: E8        INX
  $B59B: 44 E9     NOP $e9
  $B59D: 46 01     LSR $01
  $B59F: 02        ???
  $B5A0: E8        INX
  $B5A1: 41 E9     EOR ($e9,X)
  $B5A3: 43 04     SRE ($04,X)
  $B5A5: 02        ???
  $B5A6: 68        PLA
  $B5A7: 4E 69 64  LSR $6469
  $B5AA: 01 02     ORA ($02,X)
  $B5AC: 48        PHA
  $B5AD: 28        PLP
  $B5AE: EA        NOP
  $B5AF: 66 02     ROR $02
  $B5B1: 03 E8     SLO ($e8,X)
  $B5B3: 4B 69     ALR #$69
  $B5B5: 60        RTS
  $B5B6: 6A        ROR A
  $B5B7: 62        ???
  $B5B8: 03 04     SLO ($04,X)
  $B5BA: 67 69     RRA $69
  $B5BC: 68        PLA
  $B5BD: 4B 69     ALR #$69
  $B5BF: 61 6A     ADC ($6a,X)
  $B5C1: 63 04     RRA ($04,X)
  $B5C3: 04 47     NOP $47
  $B5C5: 6C 27 02  JMP ($0227)
  $B5C8: 48        PHA
  $B5C9: 2D 6A 66  AND $666a
  $B5CC: E0 00     CPX #$00
  $B5CE: 03 E8     SLO ($e8,X)
  $B5D0: 44 48     NOP $48
  $B5D2: 08        PHP
  $B5D3: E9 46     SBC #$46
  $B5D5: 01 01     ORA ($01,X)
  $B5D7: E9 72     SBC #$72
  $B5D9: 03 01     SLO ($01,X)
  $B5DB: 69 70     ADC #$70
  $B5DD: 01 03     ORA ($03,X)
  $B5DF: E7 58     ISB $58
  $B5E1: 47 1E     SRE $1e
  $B5E3: E8        INX
  $B5E4: 5A        NOP
  $B5E5: 02        ???
  $B5E6: 03 67     SLO ($67,X)
  $B5E8: 4D 68 4F  EOR $4f68
  $B5EB: 69 65     ADC #$65
  $B5ED: 03 03     SLO ($03,X)
  $B5EF: 67 58     RRA $58
  $B5F1: 27 3F     RLA $3f
  $B5F3: 68        PLA
  $B5F4: 5A        NOP
  $B5F5: 04 03     NOP $03
  $B5F7: 27 6A     RLA $6a
  $B5F9: 47 02     SRE $02
  $B5FB: 48        PHA
  $B5FC: 2D E0 91  AND $91e0
  $B5FF: 03 02     SLO ($02,X)
  $B601: 65 8D     ADC $8d
  $B603: 66 8F     ROR $8f
  $B605: 04 02     NOP $02
  $B607: 65 98     ADC $98
  $B609: 66 9A     ROR $9a
  $B60B: E0 97     CPX #$97
  $B60D: 1B 02 60  SLO $6002,Y
  $B610: F7 61     ISB $61,X
  $B612: F3 18     ISB ($18),Y
  $B614: 02        ???
  $B615: 60        RTS
  $B616: F5 61     SBC $61,X
  $B618: F6 E0     INC $e0,X
  $B61A: 0B 2D     ANC #$2d
  $B61C: F6 3C     INC $3c,X
  $B61E: F6 4B     INC $4b,X
  $B620: F6 2D     INC $2d,X
  $B622: F6 5A     INC $5a,X
  $B624: F6 4B     INC $4b,X
  $B626: F6 4B     INC $4b,X
  $B628: F6 69     INC $69,X
  $B62A: F6 2D     INC $2d,X
  $B62C: F6 03     INC $03,X
  $B62E: 02        ???
  $B62F: 04 71     NOP $71
  $B631: 24 67     BIT $67
  $B633: 04 02     NOP $02
  $B635: 04 74     NOP $74
  $B637: 24 72     BIT $72
  $B639: 20 73 F6  JSR $f673
  $B63C: 03 02     SLO ($02,X)
  $B63E: 04 68     NOP $68
  $B640: 24 6A     BIT $6a
  $B642: 04 02     NOP $02
  $B644: 04 69     NOP $69
  $B646: 24 6B     BIT $6b
  $B648: 20 73 F6  JSR $f673
  $B64B: 03 02     SLO ($02,X)
  $B64D: 04 6E     NOP $6e
  $B64F: 24 7A     BIT $7a
  $B651: 04 02     NOP $02
  $B653: 04 6F     NOP $6f
  $B655: 24 7B     BIT $7b
  $B657: 20 73 F6  JSR $f673
  $B65A: 03 02     SLO ($02,X)
  $B65C: 04 80     NOP $80
  $B65E: 24 82     BIT $82
  $B660: 04 02     NOP $02
  $B662: 04 81     NOP $81
  $B664: 24 83     BIT $83
  $B666: 20 73 F6  JSR $f673
  $B669: 03 01     SLO ($01,X)
  $B66B: 04 84     NOP $84
  $B66D: 04 02     NOP $02
  $B66F: 04 85     NOP $85
  $B671: 24 6C     BIT $6c
  $B673: 02        ???
  $B674: 01 04     ORA ($04,X)
  $B676: 70 03     BVS $b67b
  $B678: 05 25     ORA $25
  $B67A: 73 45     RRA ($45),Y
  $B67C: 6D 26 75  ADC $7526
  $B67F: 46 79     LSR $79
  $B681: 67 7D     RRA $7d
  $B683: 04 05     NOP $05
  $B685: 25 76     AND $76
  $B687: 45 78     EOR $78
  $B689: 26 77     ROL $77
  $B68B: 46 7C     LSR $7c
  $B68D: 27 7E     RLA $7e
  $B68F: 05 01     ORA $01
  $B691: 27 7F     RLA $7f
  $B693: E0 93     CPX #$93
  $B695: 03 01     SLO ($01,X)
  $B697: 65 A0     ADC $a0
  $B699: E0 93     CPX #$93
  $B69B: 03 01     SLO ($01,X)
  $B69D: 65 A4     ADC $a4
  $B69F: E0 93     CPX #$93
  $B6A1: 01 04     ORA ($04,X)
  $B6A3: 02        ???
  $B6A4: 82 03     NOP #$03
  $B6A6: 88        DEY
  $B6A7: 04 8A     NOP $8a
  $B6A9: 06 A2     ASL $a2
  $B6AB: 02        ???
  $B6AC: 07 01     SLO $01
  $B6AE: 81 02     STA ($02,X)
  $B6B0: 83 03     SAX ($03,X)
  $B6B2: 89 44     NOP #$44
  $B6B4: 8B 64     XAA #$64
  $B6B6: FD 05 A1  SBC $a105,X
  $B6B9: 06 A3     ASL $a3
  $B6BB: 03 05     SLO ($05,X)
  $B6BD: 01 84     ORA ($84,X)
  $B6BF: 02        ???
  $B6C0: 86 03     STX $03
  $B6C2: 8C 04 8E  STY $8e04
  $B6C5: 06 A6     ASL $a6
  $B6C7: 04 07     NOP $07
  $B6C9: 01 85     ORA ($85,X)
  $B6CB: 02        ???
  $B6CC: FF 03 8D  ISB $8d03,X
  $B6CF: 44 8F     NOP $8f
  $B6D1: 64 FD     NOP $fd
  $B6D3: 05 A5     ORA $a5
  $B6D5: 06 A7     ASL $a7
  $B6D7: 05 05     ORA $05
  $B6D9: 02        ???
  $B6DA: 87 03     SAX $03
  $B6DC: 98        TYA
  $B6DD: 04 9A     NOP $9a
  $B6DF: 05 FF     ORA $ff
  $B6E1: 06 FF     ASL $ff
  $B6E3: 06 04     ASL $04
  $B6E5: 03 99     SLO ($99,X)
  $B6E7: 04 9B     NOP $9b
  $B6E9: 05 B0     ORA $b0
  $B6EB: 06 B2     ASL $b2
  $B6ED: E0 8E     CPX #$8e
  $B6EF: 03 03     SLO ($03,X)
  $B6F1: 65 9F     ADC $9f
  $B6F3: 66 DB     ROR $db
  $B6F5: 66 FD     ROR $fd
  $B6F7: E0 8E     CPX #$8e
  $B6F9: 03 03     SLO ($03,X)
  $B6FB: 65 D9     ADC $d9
  $B6FD: 66 DB     ROR $db
  $B6FF: 66 FF     ROR $ff
  $B701: E0 8E     CPX #$8e
  $B703: 01 04     ORA ($04,X)
  $B705: 02        ???
  $B706: DF 03 A6  DCP $a603,X
  $B709: 64 F7     NOP $f7
  $B70B: 65 6E     ADC $6e
  $B70D: 02        ???
  $B70E: 06 01     ASL $01
  $B710: 78        SEI
  $B711: 02        ???
  $B712: 7A        NOP
  $B713: 63 B2     RRA ($b2,X)
  $B715: 64 D2     NOP $d2
  $B717: 65 D8     ADC $d8
  $B719: 66 DA     ROR $da
  $B71B: 03 04     SLO ($04,X)
  $B71D: 01 79     ORA ($79,X)
  $B71F: 02        ???
  $B720: 7B 63 B3  RRA $b363,Y
  $B723: 64 D3     NOP $d3
  $B725: 04 06     NOP $06
  $B727: 01 7C     ORA ($7c,X)
  $B729: 02        ???
  $B72A: 7E 63 B6  ROR $b663,X
  $B72D: 64 D6     NOP $d6
  $B72F: 65 DC     ADC $dc
  $B731: 66 DE     ROR $de
  $B733: 05 05     ORA $05
  $B735: 01 7D     ORA ($7d,X)
  $B737: 02        ???
  $B738: 7F 03 D5  RRA $d503,X
  $B73B: 64 D7     NOP $d7
  $B73D: 05 DD     ORA $dd
  $B73F: E0 84     CPX #$84
  $B741: 03 01     SLO ($01,X)
  $B743: 65 28     ADC $28
  $B745: E0 84     CPX #$84
  $B747: 03 01     SLO ($01,X)
  $B749: 65 BB     ADC $bb
  $B74B: E0 84     CPX #$84
  $B74D: 02        ???
  $B74E: 03 03     SLO ($03,X)
  $B750: C2 63     NOP #$63
  $B752: 25 64     AND $64
  $B754: C8        INY
  $B755: 03 01     SLO ($01,X)
  $B757: 03 C3     SLO ($c3,X)
  $B759: 04 02     NOP $02
  $B75B: 63 C6     RRA ($c6,X)
  $B75D: 64 CC     NOP $cc
  $B75F: 01 04     ORA ($04,X)
  $B761: 02        ???
  $B762: AF 03 BE  LAX $be03
  $B765: 04 9F     NOP $9f
  $B767: 05 C0     ORA $c0
  $B769: 02        ???
  $B76A: 04 01     NOP $01
  $B76C: 9A        TXS
  $B76D: 02        ???
  $B76E: B0 05     BCS $b775
  $B770: BA        TSX
  $B771: 26 C1     ROL $c1
  $B773: 03 04     SLO ($04,X)
  $B775: 01 9B     ORA ($9b,X)
  $B777: 02        ???
  $B778: B1 04     LDA ($04),Y
  $B77A: B9 06 C4  LDA $c406,Y
  $B77D: 04 04     NOP $04
  $B77F: 01 9E     ORA ($9e,X)
  $B781: 02        ???
  $B782: B4 05     LDY $05,X
  $B784: 7C 26 C5  NOP $c526,X
  $B787: 05 04     ORA $04
  $B789: 02        ???
  $B78A: B5 03     LDA $03,X
  $B78C: B7 04     LAX $04,Y
  $B78E: BD 05 BF  LDA $bf05,X
  $B791: E0 93     CPX #$93
  $B793: 01 03     ORA ($03,X)
  $B795: 02        ???
  $B796: B3 03     LAX ($03),Y
  $B798: A8        TAY
  $B799: 04 8A     NOP $8a
  $B79B: 02        ???
  $B79C: 07 01     SLO $01
  $B79E: B1 02     LDA ($02),Y
  $B7A0: B6 03     LDX $03,Y
  $B7A2: AA        TAX
  $B7A3: 44 8B     NOP $8b
  $B7A5: 64 FD     NOP $fd
  $B7A7: 05 BC     ORA $bc
  $B7A9: 26 BD     ROL $bd
  $B7AB: 03 05     SLO ($05,X)
  $B7AD: 01 B4     ORA ($b4,X)
  $B7AF: 02        ???
  $B7B0: B7 03     LAX $03,Y
  $B7B2: AB 04     ATX #$04
  $B7B4: 8E 06 A6  STX $a606
  $B7B7: 04 07     NOP $07
  $B7B9: 01 B5     ORA ($b5,X)
  $B7BB: 02        ???
  $B7BC: FD 03 AE  SBC $ae03,X
  $B7BF: 44 8F     NOP $8f
  $B7C1: 64 FD     NOP $fd
  $B7C3: 05 9F     ORA $9f
  $B7C5: 26 B9     ROL $b9
  $B7C7: 05 05     ORA $05
  $B7C9: 02        ???
  $B7CA: 6B 03     ARR #$03
  $B7CC: B8        CLV
  $B7CD: 04 75     NOP $75
  $B7CF: 05 7E     ORA $7e
  $B7D1: 26 9E     ROL $9e
  $B7D3: E0 8F     CPX #$8f
  $B7D5: 03 01     SLO ($01,X)
  $B7D7: 65 D4     ADC $d4
  $B7D9: E0 8F     CPX #$8f
  $B7DB: 03 01     SLO ($01,X)
  $B7DD: 65 3E     ADC $3e
  $B7DF: E0 8F     CPX #$8f
  $B7E1: 01 03     ORA ($03,X)
  $B7E3: 02        ???
  $B7E4: 2A        ROL A
  $B7E5: 03 C0     SLO ($c0,X)
  $B7E7: 04 C2     NOP $c2
  $B7E9: 02        ???
  $B7EA: 06 01     ASL $01
  $B7EC: 29 02     AND #$02
  $B7EE: 2B 03     ANC #$03
  $B7F0: 39 64 C3  AND $c364,Y
  $B7F3: 05 3B     ORA $3b
  $B7F5: 06 D1     ASL $d1
  $B7F7: 03 05     SLO ($05,X)
  $B7F9: 01 2C     ORA ($2c,X)
  $B7FB: 02        ???
  $B7FC: 2E 03 C4  ROL $c403
  $B7FF: 04 C6     NOP $c6
  $B801: 06 D3     ASL $d3
  $B803: 04 06     NOP $06
  $B805: 01 2D     ORA ($2d,X)
  $B807: 02        ???
  $B808: 2F 03 3D  RLA $3d03
  $B80B: 64 C7     NOP $c7
  $B80D: 05 3F     ORA $3f
  $B80F: 06 D6     ASL $d6
  $B811: 05 05     ORA $05
  $B813: 02        ???
  $B814: 3A        NOP
  $B815: 03 D0     SLO ($d0,X)
  $B817: 04 D2     NOP $d2
  $B819: 05 D5     ORA $d5
  $B81B: 06 D7     ASL $d7
  $B81D: E0 92     CPX #$92
  $B81F: 03 01     SLO ($01,X)
  $B821: 65 1C     ADC $1c
  $B823: E0 92     CPX #$92
  $B825: 1C 01 65  NOP $6501,X
  $B828: 16 03     ASL $03,X
  $B82A: 01 65     ORA ($65,X)
  $B82C: 03 E0     SLO ($e0,X)
  $B82E: 92        ???
  $B82F: 01 04     ORA ($04,X)
  $B831: 62        ???
  $B832: 12        ???
  $B833: 63 18     RRA ($18,X)
  $B835: 64 1A     NOP $1a
  $B837: 65 20     ADC $20
  $B839: 02        ???
  $B83A: 06 61     ASL $61
  $B83C: 01 62     ORA ($62,X)
  $B83E: 13 63     SLO ($63),Y
  $B840: 19 64 1E  ORA $1e64,Y
  $B843: 65 21     ADC $21
  $B845: 66 24     ROR $24
  $B847: 03 05     SLO ($05,X)
  $B849: 61 04     ADC ($04,X)
  $B84B: 62        ???
  $B84C: FF 63 11  ISB $1163,X
  $B84F: 64 0A     NOP $0a
  $B851: 26 25     ROL $25
  $B853: 04 06     NOP $06
  $B855: 61 05     ADC ($05,X)
  $B857: 62        ???
  $B858: FF 63 14  ISB $1463,X
  $B85B: 64 0B     NOP $0b
  $B85D: 65 03     ADC $03
  $B85F: 26 30     ROL $30
  $B861: 05 06     ORA $06
  $B863: 61 10     ADC ($10,X)
  $B865: 63 0C     RRA ($0c,X)
  $B867: 64 0E     NOP $0e
  $B869: 65 15     ADC $15
  $B86B: 26 31     ROL $31
  $B86D: 02        ???
  $B86E: 3D 06 04  AND $0406,X
  $B871: 02        ???
  $B872: 68        PLA
  $B873: 03 3F     SLO ($3f,X)
  $B875: 04 6B     NOP $6b
  $B877: 26 34     ROL $34
  $B879: E0 92     CPX #$92
  $B87B: 03 02     SLO ($02,X)
  $B87D: 75 55     ADC $55,X
  $B87F: 65 03     ADC $03
  $B881: E0 92     CPX #$92
  $B883: 03 01     SLO ($01,X)
  $B885: 65 4B     ADC $4b
  $B887: E0 92     CPX #$92
  $B889: 02        ???
  $B88A: 06 03     ASL $03
  $B88C: 50 63     BVC $b8f1
  $B88E: 02        ???
  $B88F: 64 48     NOP $48
  $B891: 44 02     NOP $02
  $B893: 65 4A     ADC $4a
  $B895: 66 60     ROR $60
  $B897: 03 04     SLO ($04,X)
  $B899: 02        ???
  $B89A: 02        ???
  $B89B: 03 51     SLO ($51,X)
  $B89D: 64 49     NOP $49
  $B89F: 26 61     ROL $61
  $B8A1: 04 07     NOP $07
  $B8A3: 02        ???
  $B8A4: 02        ???
  $B8A5: 03 54     SLO ($54,X)
  $B8A7: 63 02     RRA ($02,X)
  $B8A9: 64 4C     NOP $4c
  $B8AB: 44 02     NOP $02
  $B8AD: 65 03     ADC $03
  $B8AF: 26 64     ROL $64
  $B8B1: 05 04     ORA $04
  $B8B3: 03 47     SLO ($47,X)
  $B8B5: 04 4D     NOP $4d
  $B8B7: 05 4F     ORA $4f
  $B8B9: 26 65     ROL $65
  $B8BB: 06 01     ASL $01
  $B8BD: 26 70     ROL $70
  $B8BF: 05 01     ORA $01
  $B8C1: 02        ???
  $B8C2: 06 06     ASL $06
  $B8C4: 03 02     SLO ($02,X)
  $B8C6: 07 03     SLO $03
  $B8C8: 0D 04 0F  ORA $0f04
  $B8CB: E0 92     CPX #$92
  $B8CD: 01 04     ORA ($04,X)
  $B8CF: 01 17     ORA ($17,X)
  $B8D1: 02        ???
  $B8D2: 1D 03 1F  ORA $1f03,X
  $B8D5: 04 35     NOP $35
  $B8D7: 02        ???
  $B8D8: 02        ???
  $B8D9: 01 40     ORA ($40,X)
  $B8DB: 02        ???
  $B8DC: 4E 03 01  LSR $0103
  $B8DF: 01 41     ORA ($41,X)
  $B8E1: 04 01     NOP $01
  $B8E3: 01 44     ORA ($44,X)
  $B8E5: 05 01     ORA $01
  $B8E7: 01 45     ORA ($45,X)
  $B8E9: E0 92     CPX #$92
  $B8EB: 03 01     SLO ($01,X)
  $B8ED: 65 55     ADC $55
  $B8EF: E0 92     CPX #$92
  $B8F1: 03 01     SLO ($01,X)
  $B8F3: 65 5B     ADC $5b
  $B8F5: E0 92     CPX #$92
  $B8F7: 02        ???
  $B8F8: 04 63     NOP $63
  $B8FA: 67 64     RRA $64
  $B8FC: 58        CLI
  $B8FD: 65 5A     ADC $5a
  $B8FF: 26 71     ROL $71
  $B901: 03 04     SLO ($04,X)
  $B903: 02        ???
  $B904: FF 63 53  ISB $5363,X
  $B907: 64 5E     NOP $5e
  $B909: 26 74     ROL $74
  $B90B: 04 05     NOP $05
  $B90D: 02        ???
  $B90E: FF 63 72  ISB $7263,X
  $B911: 64 5C     NOP $5c
  $B913: 65 03     ADC $03
  $B915: 26 73     ROL $73
  $B917: 05 05     ORA $05
  $B919: 02        ???
  $B91A: FF 03 57  ISB $5703,X
  $B91D: 04 4D     NOP $4d
  $B91F: 05 33     ORA $33
  $B921: 26 76     ROL $76
  $B923: 06 04     ASL $04
  $B925: 02        ???
  $B926: 5D 03 5F  EOR $5f03,X
  $B929: 04 75     NOP $75
  $B92B: 65 77     ADC $77
  $B92D: E0 92     CPX #$92
  $B92F: 03 02     SLO ($02,X)
  $B931: 76 4B     ROR $4b,X
  $B933: 65 03     ADC $03
  $B935: E0 92     CPX #$92
  $B937: 01 06     ORA ($06,X)
  $B939: 01 17     ORA ($17,X)
  $B93B: 02        ???
  $B93C: 28        PLP
  $B93D: 03 1F     SLO ($1f,X)
  $B93F: 04 35     NOP $35
  $B941: 05 22     ORA $22
  $B943: 86 3A     STX $3a
  $B945: 02        ???
  $B946: 09 01     ORA #$01
  $B948: 23 02     RLA ($02,X)
  $B94A: 29 03     AND #$03
  $B94C: 37 63     RLA $63,X
  $B94E: 02        ???
  $B94F: 64 2C     NOP $2c
  $B951: 44 02     NOP $02
  $B953: 65 5A     ADC $5a
  $B955: 05 02     ORA $02
  $B957: 06 2A     ASL $2a
  $B959: 03 05     SLO ($05,X)
  $B95B: 01 26     ORA ($26,X)
  $B95D: 02        ???
  $B95E: 02        ???
  $B95F: 03 2E     SLO ($2e,X)
  $B961: 64 59     NOP $59
  $B963: 26 74     ROL $74
  $B965: 04 08     NOP $08
  $B967: 01 27     ORA ($27,X)
  $B969: 02        ???
  $B96A: 02        ???
  $B96B: 03 62     SLO ($62,X)
  $B96D: 63 02     RRA ($02,X)
  $B96F: 64 2D     NOP $2d
  $B971: 44 02     NOP $02
  $B973: 65 03     ADC $03
  $B975: 26 3E     ROL $3e
  $B977: 05 07     ORA $07
  $B979: 01 32     ORA ($32,X)
  $B97B: 02        ???
  $B97C: 38        SEC
  $B97D: 03 47     SLO ($47,X)
  $B97F: 04 4D     NOP $4d
  $B981: 05 33     ORA $33
  $B983: 26 65     ROL $65
  $B985: 06 02     ASL $02
  $B987: 06 06     ASL $06
  $B989: 02        ???
  $B98A: 39 03 3B  AND $3b03,Y
  $B98D: 04 3A     NOP $3a
  $B98F: 05 36     ORA $36
  $B991: 06 3C     ASL $3c
  $B993: 26 32     ROL $32
  $B995: E0 92     CPX #$92
  $B997: 03 03     SLO ($03,X)
  $B999: 65 7F     ADC $7f
  $B99B: 66 7B     ROR $7b
  $B99D: 66 03     ROR $03
  $B99F: E0 92     CPX #$92
  $B9A1: 03 03     SLO ($03,X)
  $B9A3: 65 C1     ADC $c1
  $B9A5: 66 7B     ROR $7b
  $B9A7: 66 FF     ROR $ff
  $B9A9: E0 92     CPX #$92
  $B9AB: 00        BRK
  $B9AC: 02        ???
  $B9AD: 63 82     RRA ($82,X)
  $B9AF: 64 88     NOP $88
  $B9B1: 01 04     ORA ($04,X)
  $B9B3: 62        ???
  $B9B4: 90 63     BCC $ba19
  $B9B6: 83 64     SAX ($64,X)
  $B9B8: 89 65     NOP #$65
  $B9BA: 95 02     STA $02,X
  $B9BC: 06 61     ASL $61
  $B9BE: 80 62     NOP #$62
  $B9C0: 02        ???
  $B9C1: 63 86     RRA ($86,X)
  $B9C3: 64 8D     NOP $8d
  $B9C5: 65 C0     ADC $c0
  $B9C7: 66 7A     ROR $7a
  $B9C9: 03 04     SLO ($04,X)
  $B9CB: 61 81     ADC ($81,X)
  $B9CD: 62        ???
  $B9CE: 91 63     STA ($63),Y
  $B9D0: 87 64     SAX $64
  $B9D2: 98        TYA
  $B9D3: 04 06     NOP $06
  $B9D5: 61 84     ADC ($84,X)
  $B9D7: 62        ???
  $B9D8: 02        ???
  $B9D9: 63 92     RRA ($92,X)
  $B9DB: 64 99     NOP $99
  $B9DD: 65 C4     ADC $c4
  $B9DF: 66 7E     ROR $7e
  $B9E1: 05 06     ORA $06
  $B9E3: 61 85     ADC ($85,X)
  $B9E5: 62        ???
  $B9E6: 94 63     STY $63,X
  $B9E8: 93 64     ??? ($64),Y
  $B9EA: 6F 64 FF  RRA $ff64
  $B9ED: 65 9C     ADC $9c
  $B9EF: 06 01     ASL $01
  $B9F1: 64 96     NOP $96
  $B9F3: E0 92     CPX #$92
  $B9F5: 03 01     SLO ($01,X)
  $B9F7: 65 AA     ADC $aa
  $B9F9: E0 92     CPX #$92
  $B9FB: 01 04     ORA ($04,X)
  $B9FD: 02        ???
  $B9FE: A0 03     LDY #$03
  $BA00: A2 04     LDX #$04
  $BA02: A8        TAY
  $BA03: 26 B0     ROL $b0
  $BA05: 02        ???
  $BA06: 06 01     ASL $01
  $BA08: 8A        TXA
  $BA09: 02        ???
  $BA0A: A1 03     LDA ($03,X)
  $BA0C: B8        CLV
  $BA0D: 64 A9     NOP $a9
  $BA0F: 65 AB     ADC $ab
  $BA11: 26 B1     ROL $b1
  $BA13: 03 05     SLO ($05,X)
  $BA15: 01 8B     ORA ($8b,X)
  $BA17: 02        ???
  $BA18: 02        ???
  $BA19: 03 B9     SLO ($b9,X)
  $BA1B: 64 A6     NOP $a6
  $BA1D: 26 B4     ROL $b4
  $BA1F: 04 06     NOP $06
  $BA21: 01 8E     ORA ($8e,X)
  $BA23: 02        ???
  $BA24: 02        ???
  $BA25: 03 BC     SLO ($bc,X)
  $BA27: 64 A7     NOP $a7
  $BA29: 65 03     ADC $03
  $BA2B: 26 B2     ROL $b2
  $BA2D: 05 06     ORA $06
  $BA2F: 01 8F     ORA ($8f,X)
  $BA31: 02        ???
  $BA32: AC 03 AE  LDY $ae03
  $BA35: 04 9A     NOP $9a
  $BA37: 05 9E     ORA $9e
  $BA39: 26 B3     ROL $b3
  $BA3B: 06 04     ASL $04
  $BA3D: 02        ???
  $BA3E: AD 03 AF  LDA $af03
  $BA41: 04 9B     NOP $9b
  $BA43: 26 B6     ROL $b6
  $BA45: E0 92     CPX #$92
  $BA47: 03 02     SLO ($02,X)
  $BA49: 76 55     ROR $55,X
  $BA4B: 65 03     ADC $03
  $BA4D: E0 92     CPX #$92
  $BA4F: 03 02     SLO ($02,X)
  $BA51: 76 EC     ROR $ec,X
  $BA53: 65 03     ADC $03
  $BA55: E0 92     CPX #$92
  $BA57: 01 03     ORA ($03,X)
  $BA59: 02        ???
  $BA5A: 9D 03 9F  STA $9f03,X
  $BA5D: 04 B5     NOP $b5
  $BA5F: 02        ???
  $BA60: 05 02     ORA $02
  $BA62: C8        INY
  $BA63: 03 EA     SLO ($ea,X)
  $BA65: 64 EB     NOP $eb
  $BA67: 65 BA     ADC $ba
  $BA69: 26 BB     ROL $bb
  $BA6B: 03 05     SLO ($05,X)
  $BA6D: 01 97     ORA ($97,X)
  $BA6F: 02        ???
  $BA70: B7 03     LAX $03,Y
  $BA72: BD 64 0A  LDA $0a64,X
  $BA75: 26 BE     ROL $be
  $BA77: 04 06     NOP $06
  $BA79: 01 C2     ORA ($c2,X)
  $BA7B: 02        ???
  $BA7C: 02        ???
  $BA7D: 03 EE     SLO ($ee,X)
  $BA7F: 64 E2     NOP $e2
  $BA81: 65 03     ADC $03
  $BA83: 26 BF     ROL $bf
  $BA85: 05 06     ORA $06
  $BA87: 02        ???
  $BA88: C3 03     DCP ($03,X)
  $BA8A: C9 64     CMP #$64
  $BA8C: CB 05     AXS #$05
  $BA8E: E1 06     SBC ($06,X)
  $BA90: E3 26     ISB ($26,X)
  $BA92: E9 06     SBC #$06
  $BA94: 05 02     ORA $02
  $BA96: C6 03     DEC $03
  $BA98: CC 04 CE  CPY $ce04
  $BA9B: 05 E4     ORA $e4
  $BA9D: 26 E6     ROL $e6
  $BA9F: E0 92     CPX #$92
  $BAA1: 03 01     SLO ($01,X)
  $BAA3: 65 F3     ADC $f3
  $BAA5: E0 92     CPX #$92
  $BAA7: 03 01     SLO ($01,X)
  $BAA9: 65 E7     ADC $e7
  $BAAB: E0 92     CPX #$92
  $BAAD: 01 04     ORA ($04,X)
  $BAAF: 01 C7     ORA ($c7,X)
  $BAB1: 02        ???
  $BAB2: CD 03 CF  CMP $cf03
  $BAB5: 26 ED     ROL $ed
  $BAB7: 02        ???
  $BAB8: 06 01     ASL $01
  $BABA: D2        ???
  $BABB: 02        ???
  $BABC: D8        CLD
  $BABD: 63 EF     RRA ($ef,X)
  $BABF: 64 F0     NOP $f0
  $BAC1: 65 F2     ADC $f2
  $BAC3: 26 F8     ROL $f8
  $BAC5: 03 05     SLO ($05,X)
  $BAC7: 01 D3     ORA ($d3,X)
  $BAC9: 02        ???
  $BACA: D9 63 FA  CMP $fa63,Y
  $BACD: 64 F1     NOP $f1
  $BACF: 26 F9     ROL $f9
  $BAD1: 04 06     NOP $06
  $BAD3: 01 D6     ORA ($d6,X)
  $BAD5: 02        ???
  $BAD6: DC 63 FB  NOP $fb63,X
  $BAD9: 64 F4     NOP $f4
  $BADB: 65 F6     ADC $f6
  $BADD: 26 FC     ROL $fc
  $BADF: 05 06     ORA $06
  $BAE1: 01 D7     ORA ($d7,X)
  $BAE3: 02        ???
  $BAE4: DD 03 DF  CMP $df03,X
  $BAE7: 64 F5     NOP $f5
  $BAE9: 65 F7     ADC $f7
  $BAEB: 26 FD     ROL $fd
  $BAED: 06 01     ASL $01
  $BAEF: 26 E5     ROL $e5
  $BAF1: E0 84     CPX #$84
  $BAF3: 03 01     SLO ($01,X)
  $BAF5: 65 46     ADC $46
  $BAF7: E0 84     CPX #$84
  $BAF9: 03 01     SLO ($01,X)
  $BAFB: 65 A9     ADC $a9
  $BAFD: E0 84     CPX #$84
  $BAFF: 02        ???
  $BB00: 01 03     ORA ($03,X)
  $BB02: 1C 03 01  NOP $0103,X
  $BB05: 03 A1     SLO ($a1,X)
  $BB07: 04 01     NOP $01
  $BB09: 03 41     SLO ($41,X)
  $BB0B: 01 01     ORA ($01,X)
  $BB0D: 03 8E     SLO ($8e,X)
  $BB0F: 02        ???
  $BB10: 02        ???
  $BB11: 44 A2     NOP $a2
  $BB13: 64 25     NOP $25
  $BB15: 03 02     SLO ($02,X)
  $BB17: 02        ???
  $BB18: 35 64     AND $64,X
  $BB1A: A3 04     LAX ($04,X)
  $BB1C: 03 44     SLO ($44,X)
  $BB1E: A6 64     LDX $64
  $BB20: 25 05     AND $05
  $BB22: AC 05 01  LDY $0105
  $BB25: 03 A5     SLO ($a5,X)
  $BB27: 20 53 FB  JSR $fb53
  $BB2A: 84 02     STY $02
  $BB2C: 01 03     ORA ($03,X)
  $BB2E: 4F 03 01  SRE $0103
  $BB31: 03 5A     SLO ($5a,X)
  $BB33: 04 01     NOP $01
  $BB35: 03 5B     SLO ($5b,X)
  $BB37: 01 01     ORA ($01,X)
  $BB39: 03 2B     SLO ($2b,X)
  $BB3B: 02        ???
  $BB3C: 02        ???
  $BB3D: 44 A2     NOP $a2
  $BB3F: 64 25     NOP $25
  $BB41: 03 02     SLO ($02,X)
  $BB43: 02        ???
  $BB44: 35 04     AND $04,X
  $BB46: A3 04     LAX ($04,X)
  $BB48: 03 44     SLO ($44,X)
  $BB4A: A6 64     LDX $64
  $BB4C: 25 05     AND $05
  $BB4E: AC 05 01  LDY $0105
  $BB51: 03 63     SLO ($63,X)
  $BB53: 00        BRK
  $BB54: 01 02     ORA ($02,X)
  $BB56: 86 01     STX $01
  $BB58: 02        ???
  $BB59: 02        ???
  $BB5A: 8B 04     XAA #$04
  $BB5C: 14 02     NOP $02,X
  $BB5E: 04 01     NOP $01
  $BB60: 88        DEY
  $BB61: 02        ???
  $BB62: 8A        TXA
  $BB63: 05 A8     ORA $a8
  $BB65: 06 AA     ASL $aa
  $BB67: 03 02     SLO ($02,X)
  $BB69: 01 89     ORA ($89,X)
  $BB6B: 06 AB     ASL $ab
  $BB6D: 04 03     NOP $03
  $BB6F: 01 8C     ORA ($8c,X)
  $BB71: 02        ???
  $BB72: 35 06     AND $06,X
  $BB74: AE 05 03  LDX $0305
  $BB77: 02        ???
  $BB78: 8F 04 A7  SAX $a704
  $BB7B: 05 AD     ORA $ad
  $BB7D: E0 84     CPX #$84
  $BB7F: 03 01     SLO ($01,X)
  $BB81: 65 DB     ADC $db
  $BB83: E0 84     CPX #$84
  $BB85: 03 01     SLO ($01,X)
  $BB87: 65 F8     ADC $f8
  $BB89: E0 84     CPX #$84
  $BB8B: 02        ???
  $BB8C: 01 03     ORA ($03,X)
  $BB8E: C7 03     DCP $03
  $BB90: 02        ???
  $BB91: 03 D2     SLO ($d2,X)
  $BB93: 04 DA     NOP $da
  $BB95: 04 01     NOP $01
  $BB97: 03 D3     SLO ($d3,X)
  $BB99: 02        ???
  $BB9A: 02        ???
  $BB9B: 64 E7     NOP $e7
  $BB9D: 05 ED     ORA $ed
  $BB9F: 04 02     NOP $02
  $BBA1: 64 F3     NOP $f3
  $BBA3: 05 F9     ORA $f9
  $BBA5: 01 02     ORA ($02,X)
  $BBA7: 02        ???
  $BBA8: CE 03 E4  DEC $e403
  $BBAB: 02        ???
  $BBAC: 03 01     SLO ($01,X)
  $BBAE: CD 02 CF  CMP $cf02
  $BBB1: 26 EF     ROL $ef
  $BBB3: 03 03     SLO ($03,X)
  $BBB5: 01 D8     ORA ($d8,X)
  $BBB7: 02        ???
  $BBB8: FF 06 FA  ISB $fa06,X
  $BBBB: 04 03     NOP $03
  $BBBD: 01 D9     ORA ($d9,X)
  $BBBF: 02        ???
  $BBC0: FF 26 FB  ISB $fb26,X
  $BBC3: 05 06     ORA $06
  $BBC5: 01 DC     ORA ($dc,X)
  $BBC7: 02        ???
  $BBC8: DE 03 FF  DEC $ff03,X
  $BBCB: 04 F6     NOP $f6
  $BBCD: 05 FC     ORA $fc
  $BBCF: 26 FE     ROL $fe
  $BBD1: 06 04     ASL $04
  $BBD3: 02        ???
  $BBD4: DF 03 F5  DCP $f503,X
  $BBD7: 04 F7     NOP $f7
  $BBD9: 05 FD     ORA $fd
  $BBDB: E0 8E     CPX #$8e
  $BBDD: 03 01     SLO ($01,X)
  $BBDF: 65 97     ADC $97
  $BBE1: E0 8E     CPX #$8e
  $BBE3: 03 01     SLO ($01,X)
  $BBE5: 65 ED     ADC $ed
  $BBE7: E0 8E     CPX #$8e
  $BBE9: 01 05     ORA ($05,X)
  $BBEB: 62        ???
  $BBEC: AE 63 E1  LDX $e163
  $BBEF: 64 E3     NOP $e3
  $BBF1: 65 E9     ADC $e9
  $BBF3: 26 EB     ROL $eb
  $BBF5: 02        ???
  $BBF6: 06 61     ASL $61
  $BBF8: A9 62     LDA #$62
  $BBFA: FF 63 99  ISB $9963,X
  $BBFD: 64 E6     NOP $e6
  $BBFF: 65 EC     ADC $ec
  $BC01: 26 EE     ROL $ee
  $BC03: 03 05     SLO ($05,X)
  $BC05: 61 AC     ADC ($ac,X)
  $BC07: 62        ???
  $BC08: AF 63 9C  LAX $9c63
  $BC0B: 64 E7     NOP $e7
  $BC0D: 26 EF     ROL $ef
  $BC0F: 04 06     NOP $06
  $BC11: 61 AD     ADC ($ad,X)
  $BC13: 62        ???
  $BC14: FF 63 9D  ISB $9d63,X
  $BC17: 64 F2     NOP $f2
  $BC19: 65 F8     ADC $f8
  $BC1B: 66 FA     ROR $fa
  $BC1D: 05 06     ORA $06
  $BC1F: 61 B8     ADC ($b8,X)
  $BC21: 62        ???
  $BC22: FF 63 F1  ISB $f163,X
  $BC25: 64 F3     NOP $f3
  $BC27: 65 FF     ADC $ff
  $BC29: 26 FB     ROL $fb
  $BC2B: 06 05     ASL $05
  $BC2D: 62        ???
  $BC2E: BA        TSX
  $BC2F: 63 F4     RRA ($f4,X)
  $BC31: 64 F6     NOP $f6
  $BC33: 65 FC     ADC $fc
  $BC35: 66 F9     ROR $f9
  $BC37: E0 96     CPX #$96
  $BC39: 03 01     SLO ($01,X)
  $BC3B: 65 8D     ADC $8d
  $BC3D: E0 96     CPX #$96
  $BC3F: 03 01     SLO ($01,X)
  $BC41: 65 8C     ADC $8c
  $BC43: E0 98     CPX #$98
  $BC45: 18        CLC
  $BC46: 04 24     NOP $24
  $BC48: 40        RTI
  $BC49: 25 44     AND $44
  $BC4B: 07 49     SLO $49
  $BC4D: 08        PHP
  $BC4E: 4C 17 02  JMP $0217
  $BC51: 24 41     BIT $41
  $BC53: 25 46     AND $46
  $BC55: 16 01     ASL $01,X
  $BC57: 25 54     AND $54
  $BC59: 15 02     ORA $02,X
  $BC5B: 08        PHP
  $BC5C: 1F 09 4A  SLO $4a09,X
  $BC5F: 13 03     SLO ($03),Y
  $BC61: 01 55     ORA ($55,X)
  $BC63: 02        ???
  $BC64: 57 03     SRE $03,X
  $BC66: 5D 02 01  EOR $0102,X
  $BC69: 21 13     AND ($13,X)
  $BC6B: 03 02     SLO ($02,X)
  $BC6D: 21 44     AND ($44,X)
  $BC6F: 67 5E     RRA $5e
  $BC71: 04 02     NOP $02
  $BC73: 21 54     AND ($54,X)
  $BC75: 06 5F     ASL $5f
  $BC77: 05 02     ORA $02
  $BC79: 08        PHP
  $BC7A: 33 09     RLA ($09),Y
  $BC7C: 39 06 01  AND $0106,Y
  $BC7F: 0A        ASL A
  $BC80: 4B 08     ALR #$08
  $BC82: 02        ???
  $BC83: 09 36     ORA #$36
  $BC85: 0A        ASL A
  $BC86: 3C 0E 02  NOP $020e,X
  $BC89: 08        PHP
  $BC8A: 37 0A     RLA $0a,X
  $BC8C: 3D 0F 01  AND $010f,X
  $BC8F: 08        PHP
  $BC90: 62        ???
  $BC91: 10 04     BPL $bc97
  $BC93: 22        ???
  $BC94: D0 23     BNE $bcb9
  $BC96: 13 07     SLO ($07),Y
  $BC98: 61 08     ADC ($08,X)
  $BC9A: 63 11     RRA ($11,X)
  $BC9C: 05 22     ORA $22
  $BC9E: 40        RTI
  $BC9F: 23 44     RLA ($44,X)
  $BCA1: 05 35     ORA $35
  $BCA3: 06 60     ASL $60
  $BCA5: 07 64     SLO $64
  $BCA7: 12        ???
  $BCA8: 02        ???
  $BCA9: 22        ???
  $BCAA: 41 23     EOR ($23,X)
  $BCAC: 46 E0     LSR $e0
  $BCAE: 98        TYA
  $BCAF: 16 01     ASL $01,X
  $BCB1: 06 31     ASL $31
  $BCB3: 15 02     ORA $02,X
  $BCB5: 22        ???
  $BCB6: 13 67     SLO ($67),Y
  $BCB8: 5E 14 02  LSR $0214,X
  $BCBB: 22        ???
  $BCBC: 54 06     NOP $06,X
  $BCBE: 5F 13 03  SRE $0313,X
  $BCC1: 08        PHP
  $BCC2: 8A        TXA
  $BCC3: 09 8B     ORA #$8b
  $BCC5: 0A        ASL A
  $BCC6: 8E 00 04  STX $0400
  $BCC9: 24 D0     BIT $d0
  $BCCB: 25 13     AND $13
  $BCCD: 07 A5     SLO $a5
  $BCCF: 08        PHP
  $BCD0: A7 01     LAX $01
  $BCD2: 02        ???
  $BCD3: 24 40     BIT $40
  $BCD5: 25 44     AND $44
  $BCD7: 02        ???
  $BCD8: 04 24     NOP $24
  $BCDA: 41 25     EOR ($25,X)
  $BCDC: 46 77     LSR $77
  $BCDE: 66 09     ROR $09
  $BCE0: 43 03     SRE ($03,X)
  $BCE2: 02        ???
  $BCE3: 25 54     AND $54
  $BCE5: 09 47     ORA #$47
  $BCE7: 05 03     ORA $03
  $BCE9: 27 13     RLA $13
  $BCEB: 08        PHP
  $BCEC: 33 09     RLA ($09),Y
  $BCEE: 39 06 02  AND $0206,Y
  $BCF1: 27 54     RLA $54
  $BCF3: 0A        ASL A
  $BCF4: 34 07     NOP $07,X
  $BCF6: 02        ???
  $BCF7: 21 D0     AND ($d0,X)
  $BCF9: 22        ???
  $BCFA: 13 08     SLO ($08),Y
  $BCFC: 04 21     NOP $21
  $BCFE: 40        RTI
  $BCFF: 22        ???
  $BD00: 44 06     NOP $06
  $BD02: 9A        TXS
  $BD03: 07 B0     SLO $b0
  $BD05: 0E 04 21  ASL $2104
  $BD08: 41 22     EOR ($22,X)
  $BD0A: 46 06     LSR $06
  $BD0C: 9B 07 B1  TAS $b107,Y
  $BD0F: 0F 04 22  SLO $2204
  $BD12: 54 06     NOP $06,X
  $BD14: 9E 67 67  SHX $6767,Y
  $BD17: 07 B4     SLO $b4
  $BD19: 11 06     ORA ($06),Y
  $BD1B: 01 69     ORA ($69,X)
  $BD1D: 02        ???
  $BD1E: 6C 03 6D  JMP ($6d03)
  $BD21: 04 6E     NOP $6e
  $BD23: 05 6F     ORA $6f
  $BD25: 06 C1     ASL $c1
  $BD27: E0 E0     CPX #$e0
  $BD29: E8        INX
  $BD2A: F0 F8     BEQ $bd24
  $BD2C: 00        BRK
  $BD2D: 08        PHP
  $BD2E: 10 18     BPL $bd48
  $BD30: 20 FF EC  JSR $ecff
  $BD33: F4 FC     NOP $fc,X
  $BD35: 04 28     NOP $28
  $BD37: 30 38     BMI $bd71
  $BD39: 40        RTI
  $BD3A: 48        PHA
  $BD3B: D8        CLD
  $BD3C: D0 C8     BNE $bd06
  $BD3E: C0 B8     CPY #$b8
  $BD40: B0 F2     BCS $bd34
  $BD42: EA        NOP
  $BD43: A8        TAY
  $BD44: F9 78 FF  SBC $ff78,Y
  $BD47: FF D0 D8  ISB $d8d0,X
  $BD4A: E0 E8     CPX #$e8
  $BD4C: F0 F8     BEQ $bd46
  $BD4E: 00        BRK
  $BD4F: 08        PHP
  $BD50: 10 18     BPL $bd6a
  $BD52: 20 28 30  JSR $3028
  $BD55: F4 FC     NOP $fc,X
  $BD57: 04 F2     NOP $f2
  $BD59: F5 38     SBC $38,X
  $BD5B: 0C 14 F7  NOP $f714
  $BD5E: F9 19 FF  SBC $ff19,Y
  $BD61: FF FF FF  ISB $ffff,X
  $BD64: FF FF FF  ISB $ffff,X
  $BD67: FF C0 FD  ISB $fdc0,X
  $BD6A: C1 FD     CMP ($fd,X)
  $BD6C: C0 FD     CPY #$fd
  $BD6E: C0 FD     CPY #$fd
  $BD70: C7 FD     DCP $fd
  $BD72: C7 FD     DCP $fd
  $BD74: C0 FD     CPY #$fd
  $BD76: C0 FD     CPY #$fd
  $BD78: C0 FD     CPY #$fd
  $BD7A: C0 FD     CPY #$fd
  $BD7C: C7 FD     DCP $fd
  $BD7E: C0 FD     CPY #$fd
  $BD80: C0 FD     CPY #$fd
  $BD82: C0 FD     CPY #$fd
  $BD84: C9 FD     CMP #$fd
  $BD86: CB FD     AXS #$fd
  $BD88: CB FD     AXS #$fd
  $BD8A: C0 FD     CPY #$fd
  $BD8C: C7 FD     DCP $fd
  $BD8E: CF FD D3  DCP $d3fd
  $BD91: FD C7 FD  SBC $fdc7,X
  $BD94: C7 FD     DCP $fd
  $BD96: C0 FD     CPY #$fd
  $BD98: D8        CLD
  $BD99: FD DC FD  SBC $fddc,X
  $BD9C: C0 FD     CPY #$fd
  $BD9E: DF FD E1  DCP $e1fd,X
  $BDA1: FD C0 FD  SBC $fdc0,X
  $BDA4: C0 FD     CPY #$fd
  $BDA6: C0 FD     CPY #$fd
  $BDA8: E5 FD     SBC $fd
  $BDAA: E9 FD     SBC #$fd
  $BDAC: EB FD     SBC #$fd
  $BDAE: C7 FD     DCP $fd
  $BDB0: C7 FD     DCP $fd
  $BDB2: C0 FD     CPY #$fd
  $BDB4: C0 FD     CPY #$fd
  $BDB6: C0 FD     CPY #$fd
  $BDB8: C0 FD     CPY #$fd
  $BDBA: C0 FD     CPY #$fd
  $BDBC: C0 FD     CPY #$fd
  $BDBE: C0 FD     CPY #$fd
  $BDC0: 00        BRK
  $BDC1: 05 03     ORA $03
  $BDC3: 04 05     NOP $05
  $BDC5: 12        ???
  $BDC6: 11 01     ORA ($01),Y
  $BDC8: 03 01     SLO ($01,X)
  $BDCA: 07 03     SLO $03
  $BDCC: 0E 0F 10  ASL $100f
  $BDCF: 03 03     SLO ($03,X)
  $BDD1: 04 08     NOP $08
  $BDD3: 04 03     NOP $03
  $BDD5: 04 09     NOP $09
  $BDD7: 0A        ASL A
  $BDD8: 03 03     SLO ($03,X)
  $BDDA: 04 12     NOP $12
  $BDDC: 02        ???
  $BDDD: 03 04     SLO ($04,X)
  $BDDF: 01 0B     ORA ($0b,X)
  $BDE1: 03 03     SLO ($03,X)
  $BDE3: 04 05     NOP $05
  $BDE5: 03 03     SLO ($03,X)
  $BDE7: 04 06     NOP $06
  $BDE9: 01 0C     ORA ($0c,X)
  $BDEB: 03 03     SLO ($03,X)
  $BDED: 04 0D     NOP $0d
  $BDEF: 01 78     ORA ($78,X)
  $BDF1: 00        BRK
  $BDF2: 02        ???
  $BDF3: 78        SEI
  $BDF4: 00        BRK
  $BDF5: 00        BRK
  $BDF6: C8        INY
  $BDF7: 00        BRK
  $BDF8: 00        BRK
  $BDF9: 00        BRK
  $BDFA: 00        BRK
  $BDFB: 00        BRK
  $BDFC: C8        INY
  $BDFD: 00        BRK
  $BDFE: 00        BRK
  $BDFF: C8        INY
  $BE00: 00        BRK
  $BE01: 00        BRK
  $BE02: 2C 01 00  BIT $0001
  $BE05: C2 01     NOP #$01
  $BE07: 00        BRK
  $BE08: C8        INY
  $BE09: 00        BRK
  $BE0A: 00        BRK
  $BE0B: 00        BRK
  $BE0C: 00        BRK
  $BE0D: 00        BRK
  $BE0E: 00        BRK
  $BE0F: 00        BRK
  $BE10: 03 96     SLO ($96,X)
  $BE12: 00        BRK
  $BE13: 03 C8     SLO ($c8,X)
  $BE15: 00        BRK
  $BE16: 03 C8     SLO ($c8,X)
  $BE18: 00        BRK
  $BE19: 00        BRK
  $BE1A: FA        NOP
  $BE1B: 00        BRK
  $BE1C: 03 96     SLO ($96,X)
  $BE1E: 00        BRK
  $BE1F: FF FF FF  ISB $ffff,X
  $BE22: FF FF FF  ISB $ffff,X
  $BE25: FF FF FF  ISB $ffff,X
  $BE28: FF FF FF  ISB $ffff,X
  $BE2B: FF FF FF  ISB $ffff,X
  $BE2E: FF FF FF  ISB $ffff,X
  $BE31: FF FF FF  ISB $ffff,X
  $BE34: FF FF FF  ISB $ffff,X
  $BE37: FF FF FF  ISB $ffff,X
  $BE3A: FF FF FF  ISB $ffff,X
  $BE3D: FF FF FF  ISB $ffff,X
  $BE40: FF FF FF  ISB $ffff,X
  $BE43: FF FF FF  ISB $ffff,X
  $BE46: FF FF FF  ISB $ffff,X
  $BE49: FF FF FF  ISB $ffff,X
  $BE4C: FF FF FF  ISB $ffff,X
  $BE4F: FF FF FF  ISB $ffff,X
  $BE52: FF FF FF  ISB $ffff,X
  $BE55: FF FF FF  ISB $ffff,X
  $BE58: FF FF FF  ISB $ffff,X
  $BE5B: FF FF FF  ISB $ffff,X
  $BE5E: FF FF FF  ISB $ffff,X
  $BE61: FF FF FF  ISB $ffff,X
  $BE64: FF FF FF  ISB $ffff,X
  $BE67: FF FF FF  ISB $ffff,X
  $BE6A: FF FF FF  ISB $ffff,X
  $BE6D: FF FF FF  ISB $ffff,X
  $BE70: FF FF FF  ISB $ffff,X
  $BE73: FF FF FF  ISB $ffff,X
  $BE76: FF FF FF  ISB $ffff,X
  $BE79: FF FF FF  ISB $ffff,X
  $BE7C: FF FF FF  ISB $ffff,X
  $BE7F: FF FF FF  ISB $ffff,X
  $BE82: FF FF FF  ISB $ffff,X
  $BE85: FF FF FF  ISB $ffff,X
  $BE88: FF FF FF  ISB $ffff,X
  $BE8B: FF FF FF  ISB $ffff,X
  $BE8E: FF FF FF  ISB $ffff,X
  $BE91: FF FF FF  ISB $ffff,X
  $BE94: FF FF FF  ISB $ffff,X
  $BE97: FF FF FF  ISB $ffff,X
  $BE9A: FF FF FF  ISB $ffff,X
  $BE9D: FF FF FF  ISB $ffff,X
  $BEA0: FF FF FF  ISB $ffff,X
  $BEA3: FF FF FF  ISB $ffff,X
  $BEA6: FF FF FF  ISB $ffff,X
  $BEA9: FF FF FF  ISB $ffff,X
  $BEAC: FF FF FF  ISB $ffff,X
  $BEAF: FF FF FF  ISB $ffff,X
  $BEB2: FF FF FF  ISB $ffff,X
  $BEB5: FF FF FF  ISB $ffff,X
  $BEB8: FF FF FF  ISB $ffff,X
  $BEBB: FF FF FF  ISB $ffff,X
  $BEBE: FF FF 4C  ISB $4cff,X
  $BEC1: C9 FE     CMP #$fe
  $BEC3: 4C CE FE  JMP $fece
  $BEC6: 4C 40 FF  JMP $ff40
  $BEC9: 20 D8 FE  JSR $fed8
  $BECC: 90 29     BCC $bef7
  $BECE: EE 1A 07  INC $071a
  $BED1: 20 D8 FE  JSR $fed8
  $BED4: 69 05     ADC #$05
  $BED6: 90 1F     BCC $bef7
  $BED8: AD 9F 05  LDA $059f
  $BEDB: C9 0B     CMP #$0b
  $BEDD: B0 14     BCS $bef3
  $BEDF: 20 47 80  JSR $8047
  $BEE2: A0 03     LDY #$03
  $BEE4: B1 5D     LDA ($5d),Y
  $BEE6: 85 C8     STA $c8
  $BEE8: AA        TAX
  $BEE9: BD 52 FF  LDA $ff52,X
  $BEEC: 20 34 FF  JSR $ff34
  $BEEF: C9 0F     CMP #$0f
  $BEF1: D0 02     BNE $bef5
  $BEF3: 68        PLA
  $BEF4: 68        PLA
  $BEF5: 18        CLC
  $BEF6: 60        RTS
  $BEF7: A8        TAY
  $BEF8: B9 89 FF  LDA $ff89,Y
  $BEFB: 85 4F     STA $4f
  $BEFD: A9 00     LDA #$00
  $BEFF: 85 50     STA $50
  $BF01: A5 E5     LDA $e5
  $BF03: 85 51     STA $51
  $BF05: A5 E6     LDA $e6
  $BF07: 85 52     STA $52
  $BF09: 20 44 80  JSR $8044
  $BF0C: A5 54     LDA $54
  $BF0E: A6 55     LDX $55
  $BF10: F0 02     BEQ $bf14
  $BF12: A9 FF     LDA #$ff
  $BF14: 48        PHA
  $BF15: A6 C8     LDX $c8
  $BF17: BD 6D FF  LDA $ff6d,X
  $BF1A: 20 34 FF  JSR $ff34
  $BF1D: 0A        ASL A
  $BF1E: AA        TAX
  $BF1F: 68        PLA
  $BF20: 18        CLC
  $BF21: 7D DF 06  ADC $06df,X
  $BF24: 90 0A     BCC $bf30
  $BF26: FE E0 06  INC $06e0,X
  $BF29: D0 05     BNE $bf30
  $BF2B: A9 FF     LDA #$ff
  $BF2D: 9D E0 06  STA $06e0,X
  $BF30: 9D DF 06  STA $06df,X
  $BF33: 60        RTS
  $BF34: AE DE 06  LDX $06de
  $BF37: D0 04     BNE $bf3d
  $BF39: 4A        LSR A
  $BF3A: 4A        LSR A
  $BF3B: 4A        LSR A
  $BF3C: 4A        LSR A
  $BF3D: 29 0F     AND #$0f
  $BF3F: 60        RTS
  $BF40: AD DC 06  LDA $06dc
  $BF43: 38        SEC
  $BF44: E9 02     SBC #$02
  $BF46: 0A        ASL A
  $BF47: AA        TAX
  $BF48: BD 93 FF  LDA $ff93,X
  $BF4B: 85 E5     STA $e5
  $BF4D: BD 94 FF  LDA $ff94,X
  $BF50: 85 E6     STA $e6
  $BF52: 60        RTS
  $BF53: 00        BRK
  $BF54: 02        ???
  $BF55: 02        ???
  $BF56: 00        BRK
  $BF57: 01 02     ORA ($02,X)
  $BF59: 02        ???
  $BF5A: 4F 4F 4F  SRE $4f4f
  $BF5D: 4F FF FF  SRE $ffff
  $BF60: F1 F1     SBC ($f1),Y
  $BF62: F1 F1     SBC ($f1),Y
  $BF64: F1 F0     SBC ($f0),Y
  $BF66: F0 F2     BEQ $bf5a
  $BF68: F0 F1     BEQ $bf5b
  $BF6A: F3 F3     ISB ($f3),Y
  $BF6C: F3 F1     ISB ($f1),Y
  $BF6E: 00        BRK
  $BF6F: 16 26     ASL $26,X
  $BF71: 35 47     AND $47,X
  $BF73: 56 66     LSR $66,X
  $BF75: 7F 7F 7F  RRA $7f7f,X
  $BF78: 7F FF FF  RRA $ffff,X
  $BF7B: F7 F7     ISB $f7,X
  $BF7D: F7 F7     ISB $f7,X
  $BF7F: F7 F1     ISB $f1,X
  $BF81: F2        ???
  $BF82: F6 F3     INC $f3,X
  $BF84: F7 F4     ISB $f4,X
  $BF86: F4 F4     NOP $f4,X
  $BF88: F7 2C     ISB $2c,X
  $BF8A: 14 16     NOP $16,X
  $BF8C: 1D 18 0A  ORA $0a18,X
  $BF8F: 03 04     SLO ($04,X)
  $BF91: 05 03     ORA $03
  $BF93: 2C 00 34  BIT $3400
  $BF96: 00        BRK
  $BF97: 54 00     NOP $00,X
  $BF99: 60        RTS
  $BF9A: 00        BRK
  $BF9B: 64 00     NOP $00
  $BF9D: 70 00     BVS $bf9f
  $BF9F: 84 00     STY $00
  $BFA1: 8C 00 1C  STY $1c00
  $BFA4: 02        ???
  $BFA5: E0 01     CPX #$01
  $BFA7: F4 01     NOP $01,X
  $BFA9: 90 01     BCC $bfac
  $BFAB: F0 00     BEQ $bfad
  $BFAD: 2C 01 F0  BIT $f001
  $BFB0: 00        BRK
  $BFB1: 2C 01 68  BIT $6801
  $BFB4: 01 90     ORA ($90,X)
  $BFB6: 01 58     ORA ($58,X)
  $BFB8: 02        ???
  $BFB9: 80 02     NOP #$02
  $BFBB: 2C 01 09  BIT $0901
  $BFBE: 83 1B     SAX ($1b,X)
  $BFC0: 78        SEI
  $BFC1: D8        CLD
  $BFC2: A9 10     LDA #$10
  $BFC4: 8D 00 20  STA $2000
  $BFC7: A9 80     LDA #$80
  $BFC9: 8D 00 80  STA $8000
  $BFCC: A9 1A     LDA #$1a
  $BFCE: A2 05     LDX #$05
  $BFD0: 8D 00 80  STA $8000
  $BFD3: 4A        LSR A
  $BFD4: CA        DEX
  $BFD5: D0 F9     BNE $bfd0
  $BFD7: 6C 00 80  JMP ($8000)
  $BFDA: C8        INY
  $BFDB: 0B C4     ANC #$c4
  $BFDD: 16 C2     ASL $c2,X
  $BFDF: 7A        NOP
  $BFE0: 63 02     RRA ($02,X)
  $BFE2: 28        PLP
  $BFE3: 82 71     NOP #$71
  $BFE5: 82 2B     NOP #$2b
  $BFE7: 2A        ROL A
  $BFE8: 49 C2     EOR #$c2
  $BFEA: 23 CA     RLA ($ca,X)
  $BFEC: BB 20 B5  LAS $b520,Y
  $BFEF: 80 C0     NOP #$c0
  $BFF1: 77 C0     RRA $c0,X
  $BFF3: E2 C7     NOP #$c7
  $BFF5: E3 C6     ISB ($c6,X)
  $BFF7: 80 60     NOP #$60
  $BFF9: 8A        TXA
  $BFFA: 02        ???
  $BFFB: 80 C0     NOP #$c0
  $BFFD: FF 02 80  ISB $8002,X

; ============================================================