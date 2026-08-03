; PRG Bank $04
; CPU Address Range: $8000 - $BFFF
; ROM Offset: $10000
; ============================================================

  $8000: 4C 07 C1  JMP $c107
  $8003: 4C 5B C0  JMP $c05b
  $8006: 4C 09 C0  JMP $c009
  $8009: 20 05 80  JSR $8005
  $800C: 20 12 C0  JSR $c012
  $800F: 4C 09 C0  JMP $c009
  $8012: AD 77 06  LDA $0677
  $8015: 20 17 80  JSR $8017
  $8018: 1C C0 39  NOP $39c0,X
  $801B: C0 A9     CPY #$a9
  $801D: 1A        NOP
  $801E: 20 59 80  JSR $8059
  $8021: 20 F1 C0  JSR $c0f1
  $8024: EE 77 06  INC $0677
  $8027: A9 17     LDA #$17
  $8029: 8D 01 06  STA $0601
  $802C: 20 D9 C3  JSR $c3d9
  $802F: 20 42 C7  JSR $c742
  $8032: A9 34     LDA #$34
  $8034: 85 A4     STA $a4
  $8036: 4C 6A C1  JMP $c16a
  $8039: 20 17 C4  JSR $c417
  $803C: A5 A4     LDA $a4
  $803E: F0 03     BEQ $8043
  $8040: 4C 4B C7  JMP $c74b
  $8043: AD 01 03  LDA $0301
  $8046: 10 12     BPL $805a
  $8048: 20 F1 C0  JSR $c0f1
  $804B: A9 00     LDA #$00
  $804D: 8D 77 06  STA $0677
  $8050: AD 53 06  LDA $0653
  $8053: 29 7F     AND #$7f
  $8055: 8D 53 06  STA $0653
  $8058: 68        PLA
  $8059: 68        PLA
  $805A: 60        RTS
  $805B: 20 05 80  JSR $8005
  $805E: 20 64 C0  JSR $c064
  $8061: 4C 5B C0  JMP $c05b
  $8064: AD 78 06  LDA $0678
  $8067: 20 17 80  JSR $8017
  $806A: 6E C0 83  ROR $83c0
  $806D: C0 20     CPY #$20
  $806F: F1 C0     SBC ($c0),Y
  $8071: EE 78 06  INC $0678
  $8074: A9 15     LDA #$15
  $8076: 8D 01 06  STA $0601
  $8079: A9 10     LDA #$10
  $807B: 8D 02 06  STA $0602
  $807E: A9 32     LDA #$32
  $8080: 4C E9 C0  JMP $c0e9
  $8083: AD 05 06  LDA $0605
  $8086: D0 09     BNE $8091
  $8088: 20 D9 C3  JSR $c3d9
  $808B: 20 F9 C3  JSR $c3f9
  $808E: EE 05 06  INC $0605
  $8091: A5 A4     LDA $a4
  $8093: F0 06     BEQ $809b
  $8095: 20 4B C7  JSR $c74b
  $8098: 4C 26 C4  JMP $c426
  $809B: AD 08 06  LDA $0608
  $809E: F0 04     BEQ $80a4
  $80A0: CE 08 06  DEC $0608
  $80A3: 60        RTS
  $80A4: AD 3B 06  LDA $063b
  $80A7: 20 17 80  JSR $8017
  $80AA: B0 C0     BCS $806c
  $80AC: C5 C0     CMP $c0
  $80AE: DE C0 A9  DEC $a9c0,X
  $80B1: 3E 20 59  ROL $5920,X
  $80B4: 80 20     NOP #$20
  $80B6: 78        SEI
  $80B7: C4 EE     CPY $ee
  $80B9: 3B 06 A9  RLA $a906,Y
  $80BC: 03 8D     SLO ($8d,X)
  $80BE: 02        ???
  $80BF: 06 A9     ASL $a9
  $80C1: 33 4C     RLA ($4c),Y
  $80C3: E9 C0     SBC #$c0
  $80C5: EE 3B 06  INC $063b
  $80C8: A9 01     LDA #$01
  $80CA: 20 59 80  JSR $8059
  $80CD: 20 C7 C3  JSR $c3c7
  $80D0: 20 D7 CA  JSR $cad7
  $80D3: A9 35     LDA #$35
  $80D5: 20 EF C8  JSR $c8ef
  $80D8: 20 F9 C3  JSR $c3f9
  $80DB: 4C EB C0  JMP $c0eb
  $80DE: 20 BD C3  JSR $c3bd
  $80E1: A9 00     LDA #$00
  $80E3: 8D 78 06  STA $0678
  $80E6: 68        PLA
  $80E7: 68        PLA
  $80E8: 60        RTS
  $80E9: 85 A4     STA $a4
  $80EB: A9 70     LDA #$70
  $80ED: 8D 08 06  STA $0608
  $80F0: 60        RTS
  $80F1: 20 59 C1  JSR $c159
  $80F4: 20 20 80  JSR $8020
  $80F7: 20 1D 80  JSR $801d
  $80FA: 20 14 80  JSR $8014
  $80FD: A2 18     LDX #$18
  $80FF: A9 00     LDA #$00
  $8101: 95 AF     STA $af,X
  $8103: CA        DEX
  $8104: 10 FB     BPL $8101
  $8106: 60        RTS
  $8107: 20 05 80  JSR $8005
  $810A: 20 10 C1  JSR $c110
  $810D: 4C 07 C1  JMP $c107
  $8110: AD 38 06  LDA $0638
  $8113: 20 17 80  JSR $8017
  $8116: 1A        NOP
  $8117: C1 7A     CMP ($7a,X)
  $8119: C1 A9     CMP ($a9,X)
  $811B: 1A        NOP
  $811C: 20 26 80  JSR $8026
  $811F: 20 59 C1  JSR $c159
  $8122: 20 6A C1  JSR $c16a
  $8125: AD 39 06  LDA $0639
  $8128: F0 2B     BEQ $8155
  $812A: A2 08     LDX #$08
  $812C: A0 06     LDY #$06
  $812E: 20 E4 C4  JSR $c4e4
  $8131: AD 50 06  LDA $0650
  $8134: C9 07     CMP #$07
  $8136: D0 1D     BNE $8155
  $8138: EE 05 06  INC $0605
  $813B: 20 11 80  JSR $8011
  $813E: 20 20 80  JSR $8020
  $8141: 20 EB C3  JSR $c3eb
  $8144: AD 01 06  LDA $0601
  $8147: 20 09 C8  JSR $c809
  $814A: A9 09     LDA #$09
  $814C: 20 09 C8  JSR $c809
  $814F: 20 14 80  JSR $8014
  $8152: 20 F9 C3  JSR $c3f9
  $8155: EE 38 06  INC $0638
  $8158: 60        RTS
  $8159: A2 0F     LDX #$0f
  $815B: A9 00     LDA #$00
  $815D: 8D 3B 06  STA $063b
  $8160: 8D 3C 06  STA $063c
  $8163: 9D 00 06  STA $0600,X
  $8166: CA        DEX
  $8167: 10 FA     BPL $8163
  $8169: 60        RTS
  $816A: A2 03     LDX #$03
  $816C: BD 76 C1  LDA $c176,X
  $816F: 9D 00 02  STA $0200,X
  $8172: CA        DEX
  $8173: 10 F7     BPL $816c
  $8175: 60        RTS
  $8176: 7E FF 23  ROR $23ff,X
  $8179: 08        PHP
  $817A: AD 0B 06  LDA $060b
  $817D: F0 03     BEQ $8182
  $817F: 20 0B CA  JSR $ca0b
  $8182: AD 0C 06  LDA $060c
  $8185: F0 03     BEQ $818a
  $8187: 20 17 C4  JSR $c417
  $818A: AD 0D 06  LDA $060d
  $818D: F0 05     BEQ $8194
  $818F: A9 0C     LDA #$0c
  $8191: 20 31 C4  JSR $c431
  $8194: AD 05 06  LDA $0605
  $8197: D0 09     BNE $81a2
  $8199: 20 D9 C3  JSR $c3d9
  $819C: 20 F9 C3  JSR $c3f9
  $819F: EE 05 06  INC $0605
  $81A2: AD 07 06  LDA $0607
  $81A5: F0 03     BEQ $81aa
  $81A7: 20 E6 C9  JSR $c9e6
  $81AA: AD 00 06  LDA $0600
  $81AD: F0 04     BEQ $81b3
  $81AF: CE 00 06  DEC $0600
  $81B2: 60        RTS
  $81B3: A5 A4     LDA $a4
  $81B5: F0 06     BEQ $81bd
  $81B7: 20 4B C7  JSR $c74b
  $81BA: 4C 26 C4  JMP $c426
  $81BD: AD 0A 06  LDA $060a
  $81C0: F0 05     BEQ $81c7
  $81C2: A9 05     LDA #$05
  $81C4: 20 31 C4  JSR $c431
  $81C7: AD 06 06  LDA $0606
  $81CA: F0 07     BEQ $81d3
  $81CC: A5 AE     LDA $ae
  $81CE: F0 03     BEQ $81d3
  $81D0: 4C 66 C9  JMP $c966
  $81D3: AD 39 06  LDA $0639
  $81D6: 20 17 80  JSR $8017
  $81D9: DD C1 00  CMP $00c1,X
  $81DC: C5 AD     CMP $ad
  $81DE: 3B 06 20  RLA $2006,Y
  $81E1: 17 80     SLO $80,X
  $81E3: FD C1 10  SBC $10c1,X
  $81E6: C2 21     NOP #$21
  $81E8: C2 6E     NOP #$6e
  $81EA: C2 C6     NOP #$c6
  $81EC: C2 04     NOP #$04
  $81EE: C3 1D     DCP ($1d,X)
  $81F0: C3 2D     DCP ($2d,X)
  $81F2: C3 54     DCP ($54,X)
  $81F4: C3 79     DCP ($79,X)
  $81F6: C3 A2     DCP ($a2,X)
  $81F8: C3 B4     DCP ($b4,X)
  $81FA: C3 B7     DCP ($b7,X)
  $81FC: C3 A9     DCP ($a9,X)
  $81FE: 06 20     ASL $20
  $8200: 59 80 EE  EOR $ee80,Y
  $8203: 07 06     SLO $06
  $8205: AE 3A 06  LDX $063a
  $8208: BD 0E C2  LDA $c20e,X
  $820B: 4C EB C4  JMP $c4eb
  $820E: 01 16     ORA ($16,X)
  $8210: 20 A6 C4  JSR $c4a6
  $8213: 20 7D C4  JSR $c47d
  $8216: 20 D3 C3  JSR $c3d3
  $8219: A9 FF     LDA #$ff
  $821B: 85 16     STA $16
  $821D: EE 3B 06  INC $063b
  $8220: 60        RTS
  $8221: A5 16     LDA $16
  $8223: F0 2C     BEQ $8251
  $8225: 38        SEC
  $8226: E9 08     SBC #$08
  $8228: 85 16     STA $16
  $822A: B0 06     BCS $8232
  $822C: A9 00     LDA #$00
  $822E: 85 16     STA $16
  $8230: 85 17     STA $17
  $8232: A9 01     LDA #$01
  $8234: 8D 03 06  STA $0603
  $8237: 20 EF C8  JSR $c8ef
  $823A: A9 08     LDA #$08
  $823C: 8D 04 06  STA $0604
  $823F: 20 00 C9  JSR $c900
  $8242: A5 16     LDA $16
  $8244: D0 0A     BNE $8250
  $8246: A9 02     LDA #$02
  $8248: 85 A4     STA $a4
  $824A: EE 0C 06  INC $060c
  $824D: 4C A0 C4  JMP $c4a0
  $8250: 60        RTS
  $8251: 20 AC C4  JSR $c4ac
  $8254: AE 3A 06  LDX $063a
  $8257: F0 06     BEQ $825f
  $8259: A0 03     LDY #$03
  $825B: A9 17     LDA #$17
  $825D: D0 04     BNE $8263
  $825F: A0 00     LDY #$00
  $8261: A9 03     LDA #$03
  $8263: 8C 4C 06  STY $064c
  $8266: A2 07     LDX #$07
  $8268: 8E 4E 06  STX $064e
  $826B: 4C EB C4  JMP $c4eb
  $826E: 20 A6 C4  JSR $c4a6
  $8271: AD 08 06  LDA $0608
  $8274: D0 03     BNE $8279
  $8276: 20 C3 C4  JSR $c4c3
  $8279: 20 F9 C4  JSR $c4f9
  $827C: CD 4E 06  CMP $064e
  $827F: D0 12     BNE $8293
  $8281: 88        DEY
  $8282: A9 01     LDA #$01
  $8284: 8D 4C 06  STA $064c
  $8287: CE 08 06  DEC $0608
  $828A: A9 0C     LDA #$0c
  $828C: 8D 4E 06  STA $064e
  $828F: EE 3B 06  INC $063b
  $8292: 98        TYA
  $8293: 4C A7 C2  JMP $c2a7
  $8296: AD 4C 06  LDA $064c
  $8299: 0A        ASL A
  $829A: AA        TAX
  $829B: BD B2 C2  LDA $c2b2,X
  $829E: 85 02     STA $02
  $82A0: BD B3 C2  LDA $c2b3,X
  $82A3: 85 03     STA $03
  $82A5: B1 02     LDA ($02),Y
  $82A7: 85 A4     STA $a4
  $82A9: 8D 4D 06  STA $064d
  $82AC: A9 00     LDA #$00
  $82AE: 8D 06 06  STA $0606
  $82B1: 60        RTS
  $82B2: BA        TSX
  $82B3: C2 BD     NOP #$bd
  $82B5: C2 C0     NOP #$c0
  $82B7: C2 C3     NOP #$c3
  $82B9: C2 06     NOP #$06
  $82BB: 04 05     NOP $05
  $82BD: 0A        ASL A
  $82BE: 08        PHP
  $82BF: 09 12     ORA #$12
  $82C1: 10 11     BPL $82d4
  $82C3: 06 19     ASL $19
  $82C5: 1A        NOP
  $82C6: 20 A6 C4  JSR $c4a6
  $82C9: AD 08 06  LDA $0608
  $82CC: D0 1B     BNE $82e9
  $82CE: AD 01 03  LDA $0301
  $82D1: 10 13     BPL $82e6
  $82D3: EE 08 06  INC $0608
  $82D6: 20 11 80  JSR $8011
  $82D9: A9 03     LDA #$03
  $82DB: 20 09 C8  JSR $c809
  $82DE: 20 14 80  JSR $8014
  $82E1: A0 00     LDY #$00
  $82E3: 4C 96 C2  JMP $c296
  $82E6: 20 CF C4  JSR $c4cf
  $82E9: 20 F9 C4  JSR $c4f9
  $82EC: CD 4E 06  CMP $064e
  $82EF: D0 10     BNE $8301
  $82F1: 20 78 C4  JSR $c478
  $82F4: A9 00     LDA #$00
  $82F6: 20 DD C4  JSR $c4dd
  $82F9: EE 07 06  INC $0607
  $82FC: A9 0C     LDA #$0c
  $82FE: 4C EB C4  JMP $c4eb
  $8301: 4C A7 C2  JMP $c2a7
  $8304: 20 AC C4  JSR $c4ac
  $8307: A2 04     LDX #$04
  $8309: A0 03     LDY #$03
  $830B: AD 3A 06  LDA $063a
  $830E: F0 05     BEQ $8315
  $8310: E8        INX
  $8311: A9 18     LDA #$18
  $8313: D0 02     BNE $8317
  $8315: A9 0D     LDA #$0d
  $8317: 20 E4 C4  JSR $c4e4
  $831A: 4C EB C4  JMP $c4eb
  $831D: 20 AC C4  JSR $c4ac
  $8320: A9 06     LDA #$06
  $8322: 8D 01 06  STA $0601
  $8325: EE 4C 06  INC $064c
  $8328: A9 0E     LDA #$0e
  $832A: 4C EB C4  JMP $c4eb
  $832D: 20 A6 C4  JSR $c4a6
  $8330: AD 08 06  LDA $0608
  $8333: D0 13     BNE $8348
  $8335: AD 09 06  LDA $0609
  $8338: D0 0B     BNE $8345
  $833A: A9 0F     LDA #$0f
  $833C: 85 A4     STA $a4
  $833E: EE 09 06  INC $0609
  $8341: CE 06 06  DEC $0606
  $8344: 60        RTS
  $8345: 20 C3 C4  JSR $c4c3
  $8348: 20 78 C4  JSR $c478
  $834B: 20 F9 C4  JSR $c4f9
  $834E: EE 0A 06  INC $060a
  $8351: 4C EB C4  JMP $c4eb
  $8354: 20 A6 C4  JSR $c4a6
  $8357: AD 08 06  LDA $0608
  $835A: D0 0D     BNE $8369
  $835C: 20 F9 C4  JSR $c4f9
  $835F: C9 14     CMP #$14
  $8361: D0 03     BNE $8366
  $8363: EE 08 06  INC $0608
  $8366: 4C A7 C2  JMP $c2a7
  $8369: 20 78 C4  JSR $c478
  $836C: A9 00     LDA #$00
  $836E: 20 DD C4  JSR $c4dd
  $8371: EE 0B 06  INC $060b
  $8374: A9 15     LDA #$15
  $8376: 4C EB C4  JMP $c4eb
  $8379: A5 18     LDA $18
  $837B: 29 FA     AND #$fa
  $837D: 85 18     STA $18
  $837F: 20 A6 C4  JSR $c4a6
  $8382: A9 01     LDA #$01
  $8384: 20 59 80  JSR $8059
  $8387: 20 C7 C3  JSR $c3c7
  $838A: 20 7E CA  JSR $ca7e
  $838D: A9 00     LDA #$00
  $838F: 85 B7     STA $b7
  $8391: A9 30     LDA #$30
  $8393: 20 EF C8  JSR $c8ef
  $8396: 20 F9 C3  JSR $c3f9
  $8399: A9 70     LDA #$70
  $839B: 8D 00 06  STA $0600
  $839E: EE 3B 06  INC $063b
  $83A1: 60        RTS
  $83A2: A9 31     LDA #$31
  $83A4: 85 A4     STA $a4
  $83A6: 20 C7 C3  JSR $c3c7
  $83A9: 20 F9 C3  JSR $c3f9
  $83AC: A9 00     LDA #$00
  $83AE: 85 1A     STA $1a
  $83B0: EE 3B 06  INC $063b
  $83B3: 60        RTS
  $83B4: 4C 99 C3  JMP $c399
  $83B7: 20 BD C3  JSR $c3bd
  $83BA: 68        PLA
  $83BB: 68        PLA
  $83BC: 60        RTS
  $83BD: A9 01     LDA #$01
  $83BF: 20 59 80  JSR $8059
  $83C2: A9 00     LDA #$00
  $83C4: 8D 38 06  STA $0638
  $83C7: 20 7D C4  JSR $c47d
  $83CA: 20 20 80  JSR $8020
  $83CD: 20 1D 80  JSR $801d
  $83D0: 4C 14 80  JMP $8014
  $83D3: AD 02 06  LDA $0602
  $83D6: 20 F1 C6  JSR $c6f1
  $83D9: 20 11 80  JSR $8011
  $83DC: 20 20 80  JSR $8020
  $83DF: 20 EB C3  JSR $c3eb
  $83E2: AD 01 06  LDA $0601
  $83E5: 20 09 C8  JSR $c809
  $83E8: 4C 14 80  JMP $8014
  $83EB: A0 04     LDY #$04
  $83ED: A9 F8     LDA #$f8
  $83EF: 99 00 02  STA $0200,Y
  $83F2: C8        INY
  $83F3: C8        INY
  $83F4: C8        INY
  $83F5: C8        INY
  $83F6: D0 F7     BNE $83ef
  $83F8: 60        RTS
  $83F9: 20 71 CA  JSR $ca71
  $83FC: 20 42 C7  JSR $c742
  $83FF: A9 00     LDA #$00
  $8401: 8D 00 06  STA $0600
  $8404: 20 3F CA  JSR $ca3f
  $8407: AD 00 06  LDA $0600
  $840A: 18        CLC
  $840B: 69 10     ADC #$10
  $840D: 8D 00 06  STA $0600
  $8410: C9 40     CMP #$40
  $8412: D0 F0     BNE $8404
  $8414: 4C A0 C4  JMP $c4a0
  $8417: 2C 02 20  BIT $2002
  $841A: 70 FB     BVS $8417
  $841C: 2C 02 20  BIT $2002
  $841F: 50 FB     BVC $841c
  $8421: A9 40     LDA #$40
  $8423: 4C 26 80  JMP $8026
  $8426: AD 49 06  LDA $0649
  $8429: D0 02     BNE $842d
  $842B: F0 42     BEQ $846f
  $842D: A6 A8     LDX $a8
  $842F: F0 32     BEQ $8463
  $8431: AE 4B 06  LDX $064b
  $8434: F0 04     BEQ $843a
  $8436: CE 4B 06  DEC $064b
  $8439: 60        RTS
  $843A: 48        PHA
  $843B: AD 03 06  LDA $0603
  $843E: 20 EF C8  JSR $c8ef
  $8441: 68        PLA
  $8442: 0A        ASL A
  $8443: AA        TAX
  $8444: CA        DEX
  $8445: CA        DEX
  $8446: BD 6A D7  LDA $d76a,X
  $8449: 85 00     STA $00
  $844B: BD 6B D7  LDA $d76b,X
  $844E: 85 01     STA $01
  $8450: AC 4A 06  LDY $064a
  $8453: B1 00     LDA ($00),Y
  $8455: F0 0C     BEQ $8463
  $8457: 20 00 C9  JSR $c900
  $845A: EE 4A 06  INC $064a
  $845D: A9 04     LDA #$04
  $845F: 8D 4B 06  STA $064b
  $8462: 60        RTS
  $8463: AD 03 06  LDA $0603
  $8466: 20 EF C8  JSR $c8ef
  $8469: AD 04 06  LDA $0604
  $846C: 20 00 C9  JSR $c900
  $846F: A9 00     LDA #$00
  $8471: 8D 4A 06  STA $064a
  $8474: 8D 4B 06  STA $064b
  $8477: 60        RTS
  $8478: A9 00     LDA #$00
  $847A: 8D 05 06  STA $0605
  $847D: A9 20     LDA #$20
  $847F: 8D 00 06  STA $0600
  $8482: 20 3F CA  JSR $ca3f
  $8485: AD 00 06  LDA $0600
  $8488: 38        SEC
  $8489: E9 10     SBC #$10
  $848B: 8D 00 06  STA $0600
  $848E: 10 F2     BPL $8482
  $8490: EE 01 06  INC $0601
  $8493: EE 02 06  INC $0602
  $8496: A2 07     LDX #$07
  $8498: A9 00     LDA #$00
  $849A: 9D 06 06  STA $0606,X
  $849D: CA        DEX
  $849E: 10 FA     BPL $849a
  $84A0: A9 10     LDA #$10
  $84A2: 8D 00 06  STA $0600
  $84A5: 60        RTS
  $84A6: AD 06 06  LDA $0606
  $84A9: F0 09     BEQ $84b4
  $84AB: 60        RTS
  $84AC: AD 06 06  LDA $0606
  $84AF: F0 03     BEQ $84b4
  $84B1: 4C 78 C4  JMP $c478
  $84B4: AD 01 03  LDA $0301
  $84B7: 10 21     BPL $84da
  $84B9: 2D 03 03  AND $0303
  $84BC: D0 1C     BNE $84da
  $84BE: EE 06 06  INC $0606
  $84C1: D0 17     BNE $84da
  $84C3: AD 01 03  LDA $0301
  $84C6: 10 07     BPL $84cf
  $84C8: EE 08 06  INC $0608
  $84CB: A0 00     LDY #$00
  $84CD: F0 08     BEQ $84d7
  $84CF: AD 01 03  LDA $0301
  $84D2: 29 03     AND #$03
  $84D4: F0 04     BEQ $84da
  $84D6: A8        TAY
  $84D7: 20 96 C2  JSR $c296
  $84DA: 68        PLA
  $84DB: 68        PLA
  $84DC: 60        RTS
  $84DD: 8D 01 06  STA $0601
  $84E0: 8D 02 06  STA $0602
  $84E3: 60        RTS
  $84E4: 8E 01 06  STX $0601
  $84E7: 8C 02 06  STY $0602
  $84EA: 60        RTS
  $84EB: EE 3B 06  INC $063b
  $84EE: D0 03     BNE $84f3
  $84F0: EE 3C 06  INC $063c
  $84F3: 85 A4     STA $a4
  $84F5: EE 0C 06  INC $060c
  $84F8: 60        RTS
  $84F9: EE 4D 06  INC $064d
  $84FC: AD 4D 06  LDA $064d
  $84FF: 60        RTS
  $8500: AD 3C 06  LDA $063c
  $8503: 20 17 80  JSR $8017
  $8506: 2A        ROL A
  $8507: C5 3D     CMP $3d
  $8509: C5 4F     CMP $4f
  $850B: C5 79     CMP $79
  $850D: C5 85     CMP $85
  $850F: C5 8B     CMP $8b
  $8511: C5 9A     CMP $9a
  $8513: C5 BF     CMP $bf
  $8515: C5 D7     CMP $d7
  $8517: C5 E3     CMP $e3
  $8519: C5 EF     CMP $ef
  $851B: C5 FE     CMP $fe
  $851D: C5 1C     CMP $1c
  $851F: C6 28     DEC $28
  $8521: C6 43     DEC $43
  $8523: C6 46     DEC $46
  $8525: C6 5A     DEC $5a
  $8527: C6 A7     DEC $a7
  $8529: C6 A9     DEC $a9
  $852B: 07 20     SLO $20
  $852D: 59 80 A9  EOR $a980,Y
  $8530: 1C AE 50  NOP $50ae,X
  $8533: 06 E0     ASL $e0
  $8535: 07 F0     SLO $f0
  $8537: 02        ???
  $8538: A9 1B     LDA #$1b
  $853A: 4C F0 C4  JMP $c4f0
  $853D: 20 AC C4  JSR $c4ac
  $8540: A9 00     LDA #$00
  $8542: 20 DD C4  JSR $c4dd
  $8545: EE 07 06  INC $0607
  $8548: EE 0D 06  INC $060d
  $854B: A9 1D     LDA #$1d
  $854D: D0 EB     BNE $853a
  $854F: 20 AC C4  JSR $c4ac
  $8552: A2 0A     LDX #$0a
  $8554: A0 04     LDY #$04
  $8556: A9 1E     LDA #$1e
  $8558: 20 E4 C4  JSR $c4e4
  $855B: 8D 4D 06  STA $064d
  $855E: D0 DA     BNE $853a
  $8560: AD 06 06  LDA $0606
  $8563: D0 0B     BNE $8570
  $8565: 68        PLA
  $8566: 68        PLA
  $8567: EE 06 06  INC $0606
  $856A: A9 0A     LDA #$0a
  $856C: 8D 00 06  STA $0600
  $856F: 60        RTS
  $8570: 4C 78 C4  JMP $c478
  $8573: 20 F9 C4  JSR $c4f9
  $8576: 4C F0 C4  JMP $c4f0
  $8579: 20 60 C5  JSR $c560
  $857C: 20 73 C5  JSR $c573
  $857F: A9 07     LDA #$07
  $8581: 8D 02 06  STA $0602
  $8584: 60        RTS
  $8585: 20 60 C5  JSR $c560
  $8588: 4C 73 C5  JMP $c573
  $858B: AD 50 06  LDA $0650
  $858E: C9 07     CMP #$07
  $8590: D0 02     BNE $8594
  $8592: F0 F1     BEQ $8585
  $8594: EE 3C 06  INC $063c
  $8597: 4C 67 C5  JMP $c567
  $859A: 20 60 C5  JSR $c560
  $859D: A2 0F     LDX #$0f
  $859F: A0 0A     LDY #$0a
  $85A1: 20 E4 C4  JSR $c4e4
  $85A4: A9 10     LDA #$10
  $85A6: 85 0E     STA $0e
  $85A8: A9 0D     LDA #$0d
  $85AA: 85 0F     STA $0f
  $85AC: A0 00     LDY #$00
  $85AE: 84 BC     STY $bc
  $85B0: A2 23     LDX #$23
  $85B2: A9 22     LDA #$22
  $85B4: 84 BD     STY $bd
  $85B6: 8E 4E 06  STX $064e
  $85B9: 8D 4D 06  STA $064d
  $85BC: 4C F0 C4  JMP $c4f0
  $85BF: AD 4D 06  LDA $064d
  $85C2: CD 4E 06  CMP $064e
  $85C5: D0 0D     BNE $85d4
  $85C7: 20 AC C4  JSR $c4ac
  $85CA: A6 0E     LDX $0e
  $85CC: A4 0F     LDY $0f
  $85CE: 20 E4 C4  JSR $c4e4
  $85D1: 4C 73 C5  JMP $c573
  $85D4: 4C AD C6  JMP $c6ad
  $85D7: 20 AC C4  JSR $c4ac
  $85DA: A2 0F     LDX #$0f
  $85DC: A0 0A     LDY #$0a
  $85DE: A9 25     LDA #$25
  $85E0: 4C 58 C5  JMP $c558
  $85E3: 20 AC C4  JSR $c4ac
  $85E6: A2 11     LDX #$11
  $85E8: A0 0C     LDY #$0c
  $85EA: A9 26     LDA #$26
  $85EC: 4C 58 C5  JMP $c558
  $85EF: 20 AC C4  JSR $c4ac
  $85F2: A2 07     LDX #$07
  $85F4: A0 05     LDY #$05
  $85F6: A9 27     LDA #$27
  $85F8: EE 0A 06  INC $060a
  $85FB: 4C 58 C5  JMP $c558
  $85FE: 20 A6 C4  JSR $c4a6
  $8601: 20 7D C4  JSR $c47d
  $8604: A9 00     LDA #$00
  $8606: 20 DD C4  JSR $c4dd
  $8609: 20 D3 C3  JSR $c3d3
  $860C: A9 2F     LDA #$2f
  $860E: 20 EF C8  JSR $c8ef
  $8611: 20 F9 C3  JSR $c3f9
  $8614: EE 07 06  INC $0607
  $8617: A9 28     LDA #$28
  $8619: 4C F0 C4  JMP $c4f0
  $861C: 20 AC C4  JSR $c4ac
  $861F: A2 12     LDX #$12
  $8621: A0 08     LDY #$08
  $8623: A9 29     LDA #$29
  $8625: 4C 58 C5  JMP $c558
  $8628: 20 AC C4  JSR $c4ac
  $862B: A2 0E     LDX #$0e
  $862D: A0 0B     LDY #$0b
  $862F: 20 E4 C4  JSR $c4e4
  $8632: A9 13     LDA #$13
  $8634: 85 0E     STA $0e
  $8636: 86 0F     STX $0f
  $8638: E6 BC     INC $bc
  $863A: A0 00     LDY #$00
  $863C: A2 2F     LDX #$2f
  $863E: A9 2A     LDA #$2a
  $8640: 4C B4 C5  JMP $c5b4
  $8643: 4C BF C5  JMP $c5bf
  $8646: 20 AC C4  JSR $c4ac
  $8649: 20 1D 80  JSR $801d
  $864C: A5 19     LDA $19
  $864E: 09 01     ORA #$01
  $8650: 85 19     STA $19
  $8652: EE 3C 06  INC $063c
  $8655: A9 3E     LDA #$3e
  $8657: 4C 59 80  JMP $8059
  $865A: AD 08 06  LDA $0608
  $865D: D0 3A     BNE $8699
  $865F: A2 10     LDX #$10
  $8661: A0 0C     LDY #$0c
  $8663: CA        DEX
  $8664: D0 FD     BNE $8663
  $8666: 88        DEY
  $8667: D0 FA     BNE $8663
  $8669: A5 19     LDA $19
  $866B: 4A        LSR A
  $866C: 90 2A     BCC $8698
  $866E: A5 16     LDA $16
  $8670: 18        CLC
  $8671: 69 01     ADC #$01
  $8673: 85 16     STA $16
  $8675: AC 02 20  LDY $2002
  $8678: A2 90     LDX #$90
  $867A: 8E 00 20  STX $2000
  $867D: 49 FF     EOR #$ff
  $867F: 8D 05 20  STA $2005
  $8682: A9 00     LDA #$00
  $8684: 8D 05 20  STA $2005
  $8687: 90 0F     BCC $8698
  $8689: A9 00     LDA #$00
  $868B: 85 16     STA $16
  $868D: 85 17     STA $17
  $868F: A5 19     LDA $19
  $8691: 29 FE     AND #$fe
  $8693: 85 19     STA $19
  $8695: EE 08 06  INC $0608
  $8698: 60        RTS
  $8699: AD 04 02  LDA $0204
  $869C: C9 20     CMP #$20
  $869E: F0 03     BEQ $86a3
  $86A0: 4C 26 CA  JMP $ca26
  $86A3: EE 3C 06  INC $063c
  $86A6: 60        RTS
  $86A7: 20 BD C3  JSR $c3bd
  $86AA: 4C 00 F8  JMP $f800
  $86AD: 20 A6 C4  JSR $c4a6
  $86B0: A2 00     LDX #$00
  $86B2: 8E 06 06  STX $0606
  $86B5: E8        INX
  $86B6: 8E 05 06  STX $0605
  $86B9: A5 BC     LDA $bc
  $86BB: 0A        ASL A
  $86BC: AA        TAX
  $86BD: BD E5 C6  LDA $c6e5,X
  $86C0: 85 02     STA $02
  $86C2: BD E6 C6  LDA $c6e6,X
  $86C5: 85 03     STA $03
  $86C7: A4 BD     LDY $bd
  $86C9: B1 02     LDA ($02),Y
  $86CB: 8D 01 06  STA $0601
  $86CE: C8        INY
  $86CF: B1 02     LDA ($02),Y
  $86D1: 8D 02 06  STA $0602
  $86D4: C8        INY
  $86D5: 20 F9 C4  JSR $c4f9
  $86D8: 85 A4     STA $a4
  $86DA: EE 0C 06  INC $060c
  $86DD: 98        TYA
  $86DE: 29 03     AND #$03
  $86E0: 85 BD     STA $bd
  $86E2: 4C D3 C3  JMP $c3d3
  $86E5: E9 C6     SBC #$c6
  $86E7: ED C6 08  SBC $08c6
  $86EA: 06 0F     ASL $0f
  $86EC: 0A        ASL A
  $86ED: 08        PHP
  $86EE: 06 0E     ASL $0e
  $86F0: 0B 20     ANC #$20
  $86F2: F7 C6     ISB $c6,X
  $86F4: 4C 42 C7  JMP $c742
  $86F7: 48        PHA
  $86F8: A2 00     LDX #$00
  $86FA: 86 A1     STX $a1
  $86FC: 0A        ASL A
  $86FD: 0A        ASL A
  $86FE: 26 A1     ROL $a1
  $8700: 0A        ASL A
  $8701: 26 A1     ROL $a1
  $8703: 85 A0     STA $a0
  $8705: 0A        ASL A
  $8706: 26 A1     ROL $a1
  $8708: 18        CLC
  $8709: 65 A0     ADC $a0
  $870B: 90 02     BCC $870f
  $870D: E6 A1     INC $a1
  $870F: 85 A0     STA $a0
  $8711: 68        PLA
  $8712: 18        CLC
  $8713: 65 A0     ADC $a0
  $8715: 90 03     BCC $871a
  $8717: EE A1 00  INC $00a1
  $871A: 18        CLC
  $871B: 69 1F     ADC #$1f
  $871D: 85 A0     STA $a0
  $871F: A5 A1     LDA $a1
  $8721: 69 CB     ADC #$cb
  $8723: 85 A1     STA $a1
  $8725: A0 00     LDY #$00
  $8727: B1 A0     LDA ($a0),Y
  $8729: 48        PHA
  $872A: A2 00     LDX #$00
  $872C: C8        INY
  $872D: 8A        TXA
  $872E: 29 03     AND #$03
  $8730: F0 04     BEQ $8736
  $8732: B1 A0     LDA ($a0),Y
  $8734: C8        INY
  $8735: 2C 68 48  BIT $4868
  $8738: 9D 18 03  STA $0318,X
  $873B: E8        INX
  $873C: E0 20     CPX #$20
  $873E: D0 ED     BNE $872d
  $8740: 68        PLA
  $8741: 60        RTS
  $8742: 20 23 80  JSR $8023
  $8745: 15 03     ORA $03,X
  $8747: 20 05 80  JSR $8005
  $874A: 60        RTS
  $874B: C5 A5     CMP $a5
  $874D: D0 07     BNE $8756
  $874F: A5 A9     LDA $a9
  $8751: F0 1D     BEQ $8770
  $8753: C6 A9     DEC $a9
  $8755: 60        RTS
  $8756: 85 A5     STA $a5
  $8758: 0A        ASL A
  $8759: AA        TAX
  $875A: CA        DEX
  $875B: CA        DEX
  $875C: BD AF D7  LDA $d7af,X
  $875F: 85 A6     STA $a6
  $8761: BD B0 D7  LDA $d7b0,X
  $8764: 85 A7     STA $a7
  $8766: A9 00     LDA #$00
  $8768: 85 A8     STA $a8
  $876A: 85 A9     STA $a9
  $876C: 85 AA     STA $aa
  $876E: 85 AD     STA $ad
  $8770: A9 04     LDA #$04
  $8772: 85 A9     STA $a9
  $8774: A2 01     LDX #$01
  $8776: 8E 3D 06  STX $063d
  $8779: CA        DEX
  $877A: 8E 41 06  STX $0641
  $877D: 8E 45 06  STX $0645
  $8780: A5 AA     LDA $aa
  $8782: 0A        ASL A
  $8783: 0A        ASL A
  $8784: A8        TAY
  $8785: B1 A6     LDA ($a6),Y
  $8787: F0 74     BEQ $87fd
  $8789: 18        CLC
  $878A: 65 A8     ADC $a8
  $878C: 8D 3E 06  STA $063e
  $878F: C8        INY
  $8790: B1 A6     LDA ($a6),Y
  $8792: 48        PHA
  $8793: 29 FC     AND #$fc
  $8795: 4A        LSR A
  $8796: 4A        LSR A
  $8797: 8D 49 06  STA $0649
  $879A: 68        PLA
  $879B: 29 03     AND #$03
  $879D: 09 20     ORA #$20
  $879F: 8D 3F 06  STA $063f
  $87A2: C8        INY
  $87A3: B1 A6     LDA ($a6),Y
  $87A5: 85 AB     STA $ab
  $87A7: C8        INY
  $87A8: B1 A6     LDA ($a6),Y
  $87AA: 85 AC     STA $ac
  $87AC: A4 AD     LDY $ad
  $87AE: B1 AB     LDA ($ab),Y
  $87B0: C8        INY
  $87B1: B1 AB     LDA ($ab),Y
  $87B3: C9 F0     CMP #$f0
  $87B5: D0 0A     BNE $87c1
  $87B7: C8        INY
  $87B8: 84 AD     STY $ad
  $87BA: B1 AB     LDA ($ab),Y
  $87BC: 85 A9     STA $a9
  $87BE: C8        INY
  $87BF: B1 AB     LDA ($ab),Y
  $87C1: 20 29 80  JSR $8029
  $87C4: 8D 40 06  STA $0640
  $87C7: 8C 44 06  STY $0644
  $87CA: EE 41 06  INC $0641
  $87CD: AD 3E 06  LDA $063e
  $87D0: 38        SEC
  $87D1: E9 20     SBC #$20
  $87D3: 8D 42 06  STA $0642
  $87D6: AD 3F 06  LDA $063f
  $87D9: B0 02     BCS $87dd
  $87DB: E9 00     SBC #$00
  $87DD: 8D 43 06  STA $0643
  $87E0: 20 23 80  JSR $8023
  $87E3: 3D 06 E6  AND $e606,X
  $87E6: A8        TAY
  $87E7: E6 AD     INC $ad
  $87E9: A0 00     LDY #$00
  $87EB: B1 AB     LDA ($ab),Y
  $87ED: 29 1F     AND #$1f
  $87EF: C5 A8     CMP $a8
  $87F1: D0 15     BNE $8808
  $87F3: A9 00     LDA #$00
  $87F5: 85 A8     STA $a8
  $87F7: 85 AD     STA $ad
  $87F9: E6 AA     INC $aa
  $87FB: D0 0B     BNE $8808
  $87FD: 85 A4     STA $a4
  $87FF: 85 A5     STA $a5
  $8801: C8        INY
  $8802: B1 A6     LDA ($a6),Y
  $8804: 29 03     AND #$03
  $8806: 85 AE     STA $ae
  $8808: 60        RTS
  $8809: 0A        ASL A
  $880A: AA        TAX
  $880B: BD C8 CC  LDA $ccc8,X
  $880E: 85 00     STA $00
  $8810: BD C9 CC  LDA $ccc9,X
  $8813: 85 01     STA $01
  $8815: A0 00     LDY #$00
  $8817: 84 03     STY $03
  $8819: B1 00     LDA ($00),Y
  $881B: 8D 3B 03  STA $033b
  $881E: C8        INY
  $881F: B1 00     LDA ($00),Y
  $8821: 8D 3C 03  STA $033c
  $8824: C8        INY
  $8825: B1 00     LDA ($00),Y
  $8827: 85 05     STA $05
  $8829: C8        INY
  $882A: B1 00     LDA ($00),Y
  $882C: 85 06     STA $06
  $882E: C8        INY
  $882F: 84 02     STY $02
  $8831: A2 00     LDX #$00
  $8833: A4 02     LDY $02
  $8835: B1 00     LDA ($00),Y
  $8837: D0 12     BNE $884b
  $8839: C8        INY
  $883A: B1 00     LDA ($00),Y
  $883C: 85 04     STA $04
  $883E: C8        INY
  $883F: B1 00     LDA ($00),Y
  $8841: 9D 3D 03  STA $033d,X
  $8844: E8        INX
  $8845: C6 04     DEC $04
  $8847: D0 F8     BNE $8841
  $8849: F0 04     BEQ $884f
  $884B: 9D 3D 03  STA $033d,X
  $884E: E8        INX
  $884F: C8        INY
  $8850: 84 02     STY $02
  $8852: E4 05     CPX $05
  $8854: D0 DD     BNE $8833
  $8856: 8E 3A 03  STX $033a
  $8859: A5 02     LDA $02
  $885B: 18        CLC
  $885C: 65 00     ADC $00
  $885E: 85 00     STA $00
  $8860: 90 02     BCC $8864
  $8862: E6 01     INC $01
  $8864: 8A        TXA
  $8865: 20 2F 80  JSR $802f
  $8868: 20 32 80  JSR $8032
  $886B: A9 20     LDA #$20
  $886D: 18        CLC
  $886E: 6D 3B 03  ADC $033b
  $8871: 8D 3B 03  STA $033b
  $8874: 90 03     BCC $8879
  $8876: EE 3C 03  INC $033c
  $8879: A9 00     LDA #$00
  $887B: 85 02     STA $02
  $887D: E6 03     INC $03
  $887F: A5 03     LDA $03
  $8881: C5 06     CMP $06
  $8883: D0 AC     BNE $8831
  $8885: A9 C0     LDA #$c0
  $8887: 8D 3B 03  STA $033b
  $888A: A9 23     LDA #$23
  $888C: 8D 3C 03  STA $033c
  $888F: A2 00     LDX #$00
  $8891: 86 02     STX $02
  $8893: A4 02     LDY $02
  $8895: B1 00     LDA ($00),Y
  $8897: 9D 3D 03  STA $033d,X
  $889A: C8        INY
  $889B: E8        INX
  $889C: E0 20     CPX #$20
  $889E: D0 F5     BNE $8895
  $88A0: 84 02     STY $02
  $88A2: 8E 3A 03  STX $033a
  $88A5: 8A        TXA
  $88A6: 20 2F 80  JSR $802f
  $88A9: 20 32 80  JSR $8032
  $88AC: A4 02     LDY $02
  $88AE: B1 00     LDA ($00),Y
  $88B0: E6 02     INC $02
  $88B2: 8D 3D 03  STA $033d
  $88B5: A9 E1     LDA #$e1
  $88B7: 8D 3B 03  STA $033b
  $88BA: A9 21     LDA #$21
  $88BC: 8D 3C 03  STA $033c
  $88BF: A9 01     LDA #$01
  $88C1: 8D 3A 03  STA $033a
  $88C4: 20 2F 80  JSR $802f
  $88C7: 20 32 80  JSR $8032
  $88CA: A4 02     LDY $02
  $88CC: B1 00     LDA ($00),Y
  $88CE: E6 02     INC $02
  $88D0: 20 F7 C6  JSR $c6f7
  $88D3: A4 02     LDY $02
  $88D5: B1 00     LDA ($00),Y
  $88D7: C8        INY
  $88D8: 85 1A     STA $1a
  $88DA: B1 00     LDA ($00),Y
  $88DC: 8D 03 06  STA $0603
  $88DF: 20 EF C8  JSR $c8ef
  $88E2: E6 02     INC $02
  $88E4: A4 02     LDY $02
  $88E6: C8        INY
  $88E7: B1 00     LDA ($00),Y
  $88E9: 8D 04 06  STA $0604
  $88EC: D0 12     BNE $8900
  $88EE: 60        RTS
  $88EF: D0 01     BNE $88f2
  $88F1: 60        RTS
  $88F2: A2 00     LDX #$00
  $88F4: 86 B1     STX $b1
  $88F6: 86 B2     STX $b2
  $88F8: A2 20     LDX #$20
  $88FA: 86 B3     STX $b3
  $88FC: A2 28     LDX #$28
  $88FE: 86 B4     STX $b4
  $8900: D0 01     BNE $8903
  $8902: 60        RTS
  $8903: 0A        ASL A
  $8904: AA        TAX
  $8905: CA        DEX
  $8906: CA        DEX
  $8907: BD 9A D3  LDA $d39a,X
  $890A: 85 AF     STA $af
  $890C: BD 9B D3  LDA $d39b,X
  $890F: 85 B0     STA $b0
  $8911: A0 00     LDY #$00
  $8913: B1 AF     LDA ($af),Y
  $8915: 85 1B     STA $1b
  $8917: C8        INY
  $8918: B1 AF     LDA ($af),Y
  $891A: D0 01     BNE $891d
  $891C: 60        RTS
  $891D: 85 B1     STA $b1
  $891F: C8        INY
  $8920: B1 AF     LDA ($af),Y
  $8922: 18        CLC
  $8923: 65 B4     ADC $b4
  $8925: 85 B5     STA $b5
  $8927: C8        INY
  $8928: A5 B2     LDA $b2
  $892A: 0A        ASL A
  $892B: 0A        ASL A
  $892C: AA        TAX
  $892D: A5 B5     LDA $b5
  $892F: 38        SEC
  $8930: E9 01     SBC #$01
  $8932: 18        CLC
  $8933: 65 B8     ADC $b8
  $8935: 9D 04 02  STA $0204,X
  $8938: B1 AF     LDA ($af),Y
  $893A: 18        CLC
  $893B: 65 B3     ADC $b3
  $893D: 38        SEC
  $893E: E5 16     SBC $16
  $8940: 08        PHP
  $8941: 18        CLC
  $8942: 65 B7     ADC $b7
  $8944: 9D 07 02  STA $0207,X
  $8947: 28        PLP
  $8948: B0 05     BCS $894f
  $894A: A9 F8     LDA #$f8
  $894C: 9D 04 02  STA $0204,X
  $894F: C8        INY
  $8950: B1 AF     LDA ($af),Y
  $8952: 9D 05 02  STA $0205,X
  $8955: C8        INY
  $8956: B1 AF     LDA ($af),Y
  $8958: 29 E3     AND #$e3
  $895A: 9D 06 02  STA $0206,X
  $895D: E6 B2     INC $b2
  $895F: C8        INY
  $8960: C6 B1     DEC $b1
  $8962: D0 C4     BNE $8928
  $8964: F0 B2     BEQ $8918
  $8966: C5 A5     CMP $a5
  $8968: D0 07     BNE $8971
  $896A: A5 A9     LDA $a9
  $896C: F0 20     BEQ $898e
  $896E: C6 A9     DEC $a9
  $8970: 60        RTS
  $8971: 85 A5     STA $a5
  $8973: A5 AE     LDA $ae
  $8975: 0A        ASL A
  $8976: AA        TAX
  $8977: CA        DEX
  $8978: CA        DEX
  $8979: BD E0 C9  LDA $c9e0,X
  $897C: 85 A6     STA $a6
  $897E: BD E1 C9  LDA $c9e1,X
  $8981: 85 AC     STA $ac
  $8983: A9 00     LDA #$00
  $8985: 85 A9     STA $a9
  $8987: 85 AA     STA $aa
  $8989: 85 AB     STA $ab
  $898B: 8D 07 06  STA $0607
  $898E: A2 01     LDX #$01
  $8990: 86 A9     STX $a9
  $8992: A5 A6     LDA $a6
  $8994: 85 AB     STA $ab
  $8996: CA        DEX
  $8997: 86 A8     STX $a8
  $8999: A0 22     LDY #$22
  $899B: A5 A8     LDA $a8
  $899D: 0A        ASL A
  $899E: 0A        ASL A
  $899F: AA        TAX
  $89A0: A9 01     LDA #$01
  $89A2: 9D 3A 03  STA $033a,X
  $89A5: A5 AA     LDA $aa
  $89A7: 05 AB     ORA $ab
  $89A9: 9D 3B 03  STA $033b,X
  $89AC: 98        TYA
  $89AD: 9D 3C 03  STA $033c,X
  $89B0: A9 00     LDA #$00
  $89B2: 9D 3D 03  STA $033d,X
  $89B5: A9 20     LDA #$20
  $89B7: 18        CLC
  $89B8: 65 AB     ADC $ab
  $89BA: 85 AB     STA $ab
  $89BC: 90 01     BCC $89bf
  $89BE: C8        INY
  $89BF: E6 A8     INC $a8
  $89C1: A5 A8     LDA $a8
  $89C3: C5 AC     CMP $ac
  $89C5: D0 D4     BNE $899b
  $89C7: A5 AC     LDA $ac
  $89C9: 0A        ASL A
  $89CA: 0A        ASL A
  $89CB: 38        SEC
  $89CC: E9 03     SBC #$03
  $89CE: 20 2F 80  JSR $802f
  $89D1: E6 AA     INC $aa
  $89D3: A5 AA     LDA $aa
  $89D5: C9 20     CMP #$20
  $89D7: D0 06     BNE $89df
  $89D9: A9 00     LDA #$00
  $89DB: 85 AE     STA $ae
  $89DD: 85 A5     STA $a5
  $89DF: 60        RTS
  $89E0: 20 04 A0  JSR $a004
  $89E3: 06 20     ASL $20
  $89E5: 0A        ASL A
  $89E6: AE 47 06  LDX $0647
  $89E9: BD FE C9  LDA $c9fe,X
  $89EC: F0 0C     BEQ $89fa
  $89EE: 8D 1D 03  STA $031d
  $89F1: EE 47 06  INC $0647
  $89F4: 20 23 80  JSR $8023
  $89F7: 15 03     ORA $03,X
  $89F9: 60        RTS
  $89FA: 8D 47 06  STA $0647
  $89FD: 60        RTS
  $89FE: 22        ???
  $89FF: 23 24     RLA ($24,X)
  $8A01: 25 26     AND $26
  $8A03: 27 28     RLA $28
  $8A05: 29 2A     AND #$2a
  $8A07: 2B 2C     ANC #$2c
  $8A09: 30 00     BMI $8a0b
  $8A0B: A9 60     LDA #$60
  $8A0D: 20 20 CA  JSR $ca20
  $8A10: 90 02     BCC $8a14
  $8A12: E6 B7     INC $b7
  $8A14: AE 39 06  LDX $0639
  $8A17: BD 1E CA  LDA $ca1e,X
  $8A1A: 20 EF C8  JSR $c8ef
  $8A1D: 60        RTS
  $8A1E: 07 22     SLO $22
  $8A20: 18        CLC
  $8A21: 65 B6     ADC $b6
  $8A23: 85 B6     STA $b6
  $8A25: 60        RTS
  $8A26: A9 60     LDA #$60
  $8A28: 20 20 CA  JSR $ca20
  $8A2B: 90 03     BCC $8a30
  $8A2D: CE B8 00  DEC $00b8
  $8A30: A9 60     LDA #$60
  $8A32: 18        CLC
  $8A33: 65 B9     ADC $b9
  $8A35: 85 B9     STA $b9
  $8A37: 90 03     BCC $8a3c
  $8A39: CE B7 00  DEC $00b7
  $8A3C: 4C 14 CA  JMP $ca14
  $8A3F: AD 02 06  LDA $0602
  $8A42: 20 F7 C6  JSR $c6f7
  $8A45: A0 00     LDY #$00
  $8A47: 98        TYA
  $8A48: 29 03     AND #$03
  $8A4A: F0 17     BEQ $8a63
  $8A4C: B9 18 03  LDA $0318,Y
  $8A4F: 29 F0     AND #$f0
  $8A51: CD 00 06  CMP $0600
  $8A54: F0 0D     BEQ $8a63
  $8A56: 90 0B     BCC $8a63
  $8A58: B9 18 03  LDA $0318,Y
  $8A5B: 29 0F     AND #$0f
  $8A5D: 0D 00 06  ORA $0600
  $8A60: 99 18 03  STA $0318,Y
  $8A63: C8        INY
  $8A64: C0 20     CPY #$20
  $8A66: D0 DF     BNE $8a47
  $8A68: A2 04     LDX #$04
  $8A6A: 20 08 80  JSR $8008
  $8A6D: 20 42 C7  JSR $c742
  $8A70: 60        RTS
  $8A71: A2 00     LDX #$00
  $8A73: A9 0F     LDA #$0f
  $8A75: 9D 18 03  STA $0318,X
  $8A78: E8        INX
  $8A79: E0 20     CPX #$20
  $8A7B: D0 F6     BNE $8a73
  $8A7D: 60        RTS
  $8A7E: A9 14     LDA #$14
  $8A80: 85 1A     STA $1a
  $8A82: A2 00     LDX #$00
  $8A84: BD 94 CA  LDA $ca94,X
  $8A87: 9D 3A 03  STA $033a,X
  $8A8A: E8        INX
  $8A8B: E0 43     CPX #$43
  $8A8D: D0 F5     BNE $8a84
  $8A8F: A9 40     LDA #$40
  $8A91: 4C 2F 80  JMP $802f
  $8A94: 02        ???
  $8A95: D6 22     DEC $22,X
  $8A97: DF DF 0F  DCP $0fdf,X
  $8A9A: EE 22 C4  INC $c422
  $8A9D: C6 CE     DEC $ce
  $8A9F: D6 CD     DEC $cd,X
  $8AA1: F0 F0     BEQ $8a93
  $8AA3: D8        CLD
  $8AA4: D9 D8 DA  CMP $dad8,Y
  $8AA7: DB DC DD  DCP $dddc,Y
  $8AAA: DE 1E 20  DEC $201e,X
  $8AAD: 23 D5     RLA ($d5,X)
  $8AAF: D5 D5     CMP $d5,X
  $8AB1: D5 D5     CMP $d5,X
  $8AB3: D5 D5     CMP $d5,X
  $8AB5: D5 D5     CMP $d5,X
  $8AB7: D5 D5     CMP $d5,X
  $8AB9: D5 D5     CMP $d5,X
  $8ABB: D5 CE     CMP $ce,X
  $8ABD: CC F0 C5  CPY $c5f0
  $8AC0: D0 F0     BNE $8ab2
  $8AC2: C6 CC     DEC $cc
  $8AC4: D3 CE     DCP ($ce),Y
  $8AC6: D2        ???
  $8AC7: D3 CF     DCP ($cf),Y
  $8AC9: D0 C7     BNE $8a92
  $8ACB: D7 08     DCP $08,X
  $8ACD: F0 23     BEQ $8af2
  $8ACF: AA        TAX
  $8AD0: AA        TAX
  $8AD1: AA        TAX
  $8AD2: AA        TAX
  $8AD3: AA        TAX
  $8AD4: AA        TAX
  $8AD5: AA        TAX
  $8AD6: AA        TAX
  $8AD7: A9 14     LDA #$14
  $8AD9: 85 1A     STA $1a
  $8ADB: A2 00     LDX #$00
  $8ADD: BD ED CA  LDA $caed,X
  $8AE0: 9D 3A 03  STA $033a,X
  $8AE3: E8        INX
  $8AE4: E0 32     CPX #$32
  $8AE6: D0 F5     BNE $8add
  $8AE8: A9 2F     LDA #$2f
  $8AEA: 4C 2F 80  JMP $802f
  $8AED: 01 D2     ORA ($d2,X)
  $8AEF: 21 C1     AND ($c1,X)
  $8AF1: 20 E0 21  JSR $21e0
  $8AF4: D5 D5     CMP $d5,X
  $8AF6: D5 D5     CMP $d5,X
  $8AF8: D5 D5     CMP $d5,X
  $8AFA: F0 C4     BEQ $8ac0
  $8AFC: C6 CE     DEC $ce
  $8AFE: D6 C3     DEC $c3,X
  $8B00: F0 F0     BEQ $8af2
  $8B02: E4 E5     CPX $e5
  $8B04: E6 E7     INC $e7
  $8B06: EC ED EF  CPX $efed
  $8B09: EA        NOP
  $8B0A: EB EE     SBC #$ee
  $8B0C: EF F0 D5  ISB $d5f0
  $8B0F: D5 D5     CMP $d5,X
  $8B11: D5 D5     CMP $d5,X
  $8B13: D5 08     CMP $08,X
  $8B15: D8        CLD
  $8B16: 23 FF     RLA ($ff,X)
  $8B18: FF FF FF  ISB $ffff,X
  $8B1B: FF FF FF  ISB $ffff,X
  $8B1E: FF FF 0F  ISB $0fff,X
  $8B21: 30 0F     BMI $8b32
  $8B23: 21 10     AND ($10,X)
  $8B25: 30 21     BMI $8b48
  $8B27: 31 30     AND ($30),Y
  $8B29: 1A        NOP
  $8B2A: 30 10     BMI $8b3c
  $8B2C: 21 31     AND ($31,X)
  $8B2E: 30 0F     BMI $8b3f
  $8B30: 30 0F     BMI $8b41
  $8B32: 0F 30 2C  SLO $2c30
  $8B35: 0F 27 25  SLO $2527
  $8B38: 0F 0F 30  SLO $300f
  $8B3B: 0F 21 30  SLO $3021
  $8B3E: 36 22     ROL $22,X
  $8B40: 30 0F     BMI $8b51
  $8B42: 0F 0F 0F  SLO $0f0f
  $8B45: 21 30     AND ($30,X)
  $8B47: 25 0F     AND $0f
  $8B49: 30 27     BMI $8b72
  $8B4B: 0F 30 36  SLO $3630
  $8B4E: 0F 0F 0F  SLO $0f0f
  $8B51: 0F 0F 30  SLO $300f
  $8B54: 21 21     AND ($21,X)
  $8B56: 30 32     BMI $8b8a
  $8B58: 21 36     AND ($36,X)
  $8B5A: 27 21     RLA $21
  $8B5C: 30 36     BMI $8b94
  $8B5E: 27 30     RLA $30
  $8B60: 36 0F     ROL $0f,X
  $8B62: 30 21     BMI $8b85
  $8B64: 0F 10 0F  SLO $0f10
  $8B67: 0F 0F 0F  SLO $0f0f
  $8B6A: 0F 0F 30  SLO $300f
  $8B6D: 30 37     BMI $8ba6
  $8B6F: 30 25     BMI $8b96
  $8B71: 37 30     RLA $30,X
  $8B73: 36 21     ROL $21,X
  $8B75: 31 30     AND ($30),Y
  $8B77: 0F 30 21  SLO $2130
  $8B7A: 25 30     AND $30
  $8B7C: 36 0F     ROL $0f,X
  $8B7E: 25 30     AND $30
  $8B80: 0F 0F 0F  SLO $0f0f
  $8B83: 0F 0F 30  SLO $300f
  $8B86: 0F 25 27  SLO $2725
  $8B89: 36 25     ROL $25,X
  $8B8B: 30 36     BMI $8bc3
  $8B8D: 22        ???
  $8B8E: 30 0F     BMI $8b9f
  $8B90: 15 30     ORA $30,X
  $8B92: 36 21     ROL $21,X
  $8B94: 30 25     BMI $8bbb
  $8B96: 0F 0F 0F  SLO $0f0f
  $8B99: 0F 0F 0F  SLO $0f0f
  $8B9C: 0F 0F 30  SLO $300f
  $8B9F: 0F 1A 30  SLO $301a
  $8BA2: 36 1A     ROL $1a,X
  $8BA4: 30 32     BMI $8bd8
  $8BA6: 0F 0F 0F  SLO $0f0f
  $8BA9: 0F 30 36  SLO $3630
  $8BAC: 00        BRK
  $8BAD: 30 25     BMI $8bd4
  $8BAF: 0F 0F 0F  SLO $0f0f
  $8BB2: 0F 0F 0F  SLO $0f0f
  $8BB5: 0F 07 30  SLO $3007
  $8BB8: 36 21     ROL $21,X
  $8BBA: 07 36     SLO $36
  $8BBC: 21 11     AND ($11,X)
  $8BBE: 36 0F     ROL $0f,X
  $8BC0: 21 36     AND ($36,X)
  $8BC2: 0F 27 36  SLO $3627
  $8BC5: 27 30     RLA $30
  $8BC7: 36 0F     ROL $0f,X
  $8BC9: 26 30     ROL $30
  $8BCB: 0F 30 11  SLO $1130
  $8BCE: 0F 0F 30  SLO $300f
  $8BD1: 0F 21 30  SLO $3021
  $8BD4: 36 21     ROL $21,X
  $8BD6: 27 36     RLA $36
  $8BD8: 0F 0F 0F  SLO $0f0f
  $8BDB: 27 30     RLA $30
  $8BDD: 0F 0F 0F  SLO $0f0f
  $8BE0: 0F 0F 0F  SLO $0f0f
  $8BE3: 0F 0F 0F  SLO $0f0f
  $8BE6: 0F 0F 0F  SLO $0f0f
  $8BE9: 30 0F     BMI $8bfa
  $8BEB: 37 30     RLA $30,X
  $8BED: 36 37     ROL $37,X
  $8BEF: 27 36     RLA $36
  $8BF1: 0F 30 21  SLO $2130
  $8BF4: 0A        ASL A
  $8BF5: 30 36     BMI $8c2d
  $8BF7: 0F 30 36  SLO $3630
  $8BFA: 0F 0F 0F  SLO $0f0f
  $8BFD: 0F 0F 0F  SLO $0f0f
  $8C00: 0F 0F 30  SLO $300f
  $8C03: 0F 25 30  SLO $3025
  $8C06: 36 25     ROL $25,X
  $8C08: 27 36     RLA $36
  $8C0A: 0F 0F 0F  SLO $0f0f
  $8C0D: 11 30     ORA ($30),Y
  $8C0F: 0F 0F 0F  SLO $0f0f
  $8C12: 0F 0F 0F  SLO $0f0f
  $8C15: 0F 0F 0F  SLO $0f0f
  $8C18: 0F 0F 0F  SLO $0f0f
  $8C1B: 30 0F     BMI $8c2c
  $8C1D: 21 37     AND ($37,X)
  $8C1F: 36 21     ROL $21,X
  $8C21: 30 36     BMI $8c59
  $8C23: 0F 0F 0F  SLO $0f0f
  $8C26: 30 27     BMI $8c4f
  $8C28: 21 30     AND ($30,X)
  $8C2A: 0F 36 0F  SLO $0f36
  $8C2D: 37 27     RLA $27,X
  $8C2F: 0F 30 1A  SLO $1a30
  $8C32: 0F 0F 30  SLO $300f
  $8C35: 0F 21 30  SLO $3021
  $8C38: 36 21     ROL $21,X
  $8C3A: 0C 36 0F  NOP $0f36
  $8C3D: 0C 30 32  NOP $3230
  $8C40: 30 36     BMI $8c78
  $8C42: 0F 0F 0F  SLO $0f0f
  $8C45: 27 30     RLA $30
  $8C47: 32        ???
  $8C48: 0F 0F 0F  SLO $0f0f
  $8C4B: 0F 0F 30  SLO $300f
  $8C4E: 0F 21 10  SLO $1021
  $8C51: 30 21     BMI $8c74
  $8C53: 31 30     AND ($30),Y
  $8C55: 0F 0F 0F  SLO $0f0f
  $8C58: 10 30     BPL $8c8a
  $8C5A: 26 0F     ROL $0f
  $8C5C: 11 36     ORA ($36),Y
  $8C5E: 0F 38 27  SLO $2738
  $8C61: 0F 30 36  SLO $3630
  $8C64: 0F 0F 30  SLO $300f
  $8C67: 0F 21 10  SLO $1021
  $8C6A: 30 1A     BMI $8c86
  $8C6C: 0F 0F 0F  SLO $0f0f
  $8C6F: 0F 0F 0F  SLO $0f0f
  $8C72: 30 10     BMI $8c84
  $8C74: 0F 27 36  SLO $3627
  $8C77: 0F 0F 0F  SLO $0f0f
  $8C7A: 0F 0F 0F  SLO $0f0f
  $8C7D: 0F 1A 30  SLO $301a
  $8C80: 18        CLC
  $8C81: 36 25     ROL $25,X
  $8C83: 30 21     BMI $8ca6
  $8C85: 36 11     ROL $11,X
  $8C87: 0F 36 30  SLO $3036
  $8C8A: 0F 36 30  SLO $3036
  $8C8D: 0F 31 30  SLO $3031
  $8C90: 0F 36 11  SLO $1136
  $8C93: 0F 07 25  SLO $2507
  $8C96: 21 21     AND ($21,X)
  $8C98: 31 30     AND ($30),Y
  $8C9A: 0F 0F 0F  SLO $0f0f
  $8C9D: 0F 0F 0F  SLO $0f0f
  $8CA0: 0F 0F 0F  SLO $0f0f
  $8CA3: 0F 25 30  SLO $3025
  $8CA6: 0F 0F 0F  SLO $0f0f
  $8CA9: 0F 0F 0F  SLO $0f0f
  $8CAC: 0F 0F 0F  SLO $0f0f
  $8CAF: 0F 21 30  SLO $3021
  $8CB2: 30 0F     BMI $8cc3
  $8CB4: 0F 0F 0F  SLO $0f0f
  $8CB7: 0F 0F 0F  SLO $0f0f
  $8CBA: 0F 0F 0F  SLO $0f0f
  $8CBD: 0F 36 0F  SLO $0f36
  $8CC0: 11 36     ORA ($36),Y
  $8CC2: 0F 0F 36  SLO $360f
  $8CC5: 0F 30 36  SLO $3630
  $8CC8: F8        SED
  $8CC9: CC D8 CD  CPY $cdd8
  $8CCC: 87 CE     SAX $ce
  $8CCE: AE CF 04  LDX $04cf
  $8CD1: D0 06     BNE $8cd9
  $8CD3: D1 0D     CMP ($0d),Y
  $8CD5: D2        ???
  $8CD6: EE D2 14  INC $14d2
  $8CD9: E3 89     ISB ($89,X)
  $8CDB: E3 FF     ISB ($ff,X)
  $8CDD: E3 C0     ISB ($c0,X)
  $8CDF: E4 61     CPX $61
  $8CE1: E4 22     CPX $22
  $8CE3: E5 84     SBC $84
  $8CE5: E5 ED     SBC $ed
  $8CE7: E5 47     SBC $47
  $8CE9: E6 BA     INC $ba
  $8CEB: E6 76     INC $76
  $8CED: E7 B1     ISB $b1
  $8CEF: E7 A6     ISB $a6
  $8CF1: E8        INX
  $8CF2: 9D E9 D8  STA $d8e9,X
  $8CF5: E9 22     SBC #$22
  $8CF7: EA        NOP
  $8CF8: 40        RTI
  $8CF9: 20 20 0E  JSR $0e20
  $8CFC: 00        BRK
  $8CFD: 20 FF 00  JSR $00ff
  $8D00: 20 FF 00  JSR $00ff
  $8D03: 0E FF 00  ASL $00ff
  $8D06: 04 1E     NOP $1e
  $8D08: 00        BRK
  $8D09: 0E FF 00  ASL $00ff
  $8D0C: 0A        ASL A
  $8D0D: 1A        NOP
  $8D0E: FF 1E 1E  ISB $1e1e,X
  $8D11: FF 10 11  ISB $1110,X
  $8D14: 11 15     ORA ($15),Y
  $8D16: FF 1E 1E  ISB $1e1e,X
  $8D19: FF 00 0A  ISB $0a00,X
  $8D1C: 1A        NOP
  $8D1D: 09 0C     ORA #$0c
  $8D1F: 04 05     NOP $05
  $8D21: 04 08     NOP $08
  $8D23: 09 0C     ORA #$0c
  $8D25: 04 05     NOP $05
  $8D27: 0D 0D 18  ORA $180d
  $8D2A: 19 12 13  ORA $1312,Y
  $8D2D: 13 17     SLO ($17),Y
  $8D2F: 18        CLC
  $8D30: 19 0D 1C  ORA $1c0d,Y
  $8D33: 04 08     NOP $08
  $8D35: 09 0C     ORA #$0c
  $8D37: 04 05     NOP $05
  $8D39: 04 08     NOP $08
  $8D3B: 09 0C     ORA #$0c
  $8D3D: 0B 0E     ANC #$0e
  $8D3F: 06 07     ASL $07
  $8D41: 0A        ASL A
  $8D42: 06 0B     ASL $0b
  $8D44: 0E 06 07  ASL $0706
  $8D47: 0A        ASL A
  $8D48: 06 0B     ASL $0b
  $8D4A: 0E 0A 06  ASL $060a
  $8D4D: 0A        ASL A
  $8D4E: 06 0B     ASL $0b
  $8D50: 0E 06 07  ASL $0706
  $8D53: 0A        ASL A
  $8D54: 06 0B     ASL $0b
  $8D56: 0E 06 07  ASL $0706
  $8D59: 0A        ASL A
  $8D5A: 06 0B     ASL $0b
  $8D5C: 0E 04 05  ASL $0504
  $8D5F: 04 08     NOP $08
  $8D61: 09 0C     ORA #$0c
  $8D63: 04 05     NOP $05
  $8D65: 04 08     NOP $08
  $8D67: 18        CLC
  $8D68: 19 0D 3A  ORA $3a0d,Y
  $8D6B: 00        BRK
  $8D6C: 05 3B     ORA $3b
  $8D6E: 3E 0D 0D  ROL $0d0d,X
  $8D71: 09 0C     ORA #$0c
  $8D73: 04 05     NOP $05
  $8D75: 04 08     NOP $08
  $8D77: 09 0C     ORA #$0c
  $8D79: 04 05     NOP $05
  $8D7B: 06 07     ASL $07
  $8D7D: 0A        ASL A
  $8D7E: 06 0B     ASL $0b
  $8D80: 0E 06 07  ASL $0706
  $8D83: 0A        ASL A
  $8D84: 06 0B     ASL $0b
  $8D86: 0E 06 2D  ASL $2d06
  $8D89: 00        BRK
  $8D8A: 05 38     ORA $38
  $8D8C: 3C 0A 06  NOP $060a,X
  $8D8F: 0B 0E     ANC #$0e
  $8D91: 06 07     ASL $07
  $8D93: 0A        ASL A
  $8D94: 06 0B     ASL $0b
  $8D96: 0E 06 07  ASL $0706
  $8D99: 00        BRK
  $8D9A: 0D E5 3F  ORA $3fe5
  $8D9D: 00        BRK
  $8D9E: 05 6A     ORA $6a
  $8DA0: 6B 00     ARR #$00
  $8DA2: 0C E5 00  NOP $00e5
  $8DA5: 20 E5 00  JSR $00e5
  $8DA8: 20 FF 00  JSR $00ff
  $8DAB: 20 FF 00  JSR $00ff
  $8DAE: 20 FF 00  JSR $00ff
  $8DB1: 20 FF AA  JSR $aaff
  $8DB4: AA        TAX
  $8DB5: AA        TAX
  $8DB6: AA        TAX
  $8DB7: AA        TAX
  $8DB8: AA        TAX
  $8DB9: AA        TAX
  $8DBA: AA        TAX
  $8DBB: 5A        NOP
  $8DBC: 5A        NOP
  $8DBD: 5A        NOP
  $8DBE: 5A        NOP
  $8DBF: 5A        NOP
  $8DC0: 5A        NOP
  $8DC1: 5A        NOP
  $8DC2: 5A        NOP
  $8DC3: F5 F5     SBC $f5,X
  $8DC5: F5 F5     SBC $f5,X
  $8DC7: F5 F5     SBC $f5,X
  $8DC9: F5 F5     SBC $f5,X
  $8DCB: FF FF FF  ISB $ffff,X
  $8DCE: FF FF FF  ISB $ffff,X
  $8DD1: FF FF FF  ISB $ffff,X
  $8DD4: 00        BRK
  $8DD5: 0C 07 00  NOP $0007
  $8DD8: C8        INY
  $8DD9: 20 10 0A  JSR $0a10
  $8DDC: 00        BRK
  $8DDD: 10 FF     BPL $8dde
  $8DDF: 00        BRK
  $8DE0: 10 FF     BPL $8de1
  $8DE2: 99 9A 9B  STA $9b9a,Y
  $8DE5: FF 9C 9D  ISB $9d9c,X
  $8DE8: 9E FF 9F  SHX $9fff,Y
  $8DEB: A0 A1     LDY #$a1
  $8DED: FF A2 A3  ISB $a3a2,X
  $8DF0: A4 A5     LDY $a5
  $8DF2: A6 A7     LDX $a7
  $8DF4: A8        TAY
  $8DF5: A9 AA     LDA #$aa
  $8DF7: AB AC     ATX #$ac
  $8DF9: FF AD AE  ISB $aead,X
  $8DFC: FE AF B0  INC $b0af,X
  $8DFF: B1 B2     LDA ($b2),Y
  $8E01: B3 B4     LAX ($b4),Y
  $8E03: B5 B6     LDA $b6,X
  $8E05: B7 B8     LAX $b8,Y
  $8E07: FE B9 FF  INC $ffb9,X
  $8E0A: BA        TSX
  $8E0B: FE BB BC  INC $bcbb,X
  $8E0E: BD BE BF  LDA $bfbe,X
  $8E11: C0 C1     CPY #$c1
  $8E13: C2 C3     NOP #$c3
  $8E15: C4 C5     CPY $c5
  $8E17: C6 C7     DEC $c7
  $8E19: C8        INY
  $8E1A: C9 FE     CMP #$fe
  $8E1C: CA        DEX
  $8E1D: CB CC     AXS #$cc
  $8E1F: CD CE CF  CMP $cfce
  $8E22: 02        ???
  $8E23: D0 D1     BNE $8df6
  $8E25: D2        ???
  $8E26: D3 02     DCP ($02),Y
  $8E28: 02        ???
  $8E29: D4 D5     NOP $d5,X
  $8E2B: D6 D7     DEC $d7,X
  $8E2D: D8        CLD
  $8E2E: D9 00 03  CMP $0300,Y
  $8E31: 02        ???
  $8E32: 02        ???
  $8E33: 02        ???
  $8E34: DA        NOP
  $8E35: DB DC DD  DCP $dddc,Y
  $8E38: 02        ???
  $8E39: DE DF 02  DEC $02df,X
  $8E3C: 02        ???
  $8E3D: E0 E1     CPX #$e1
  $8E3F: 00        BRK
  $8E40: 03 02     SLO ($02,X)
  $8E42: 00        BRK
  $8E43: 03 02     SLO ($02,X)
  $8E45: E2 E3     NOP #$e3
  $8E47: 02        ???
  $8E48: E4 E5     CPX $e5
  $8E4A: E6 02     INC $02
  $8E4C: E7 E8     ISB $e8
  $8E4E: E9 02     SBC #$02
  $8E50: 02        ???
  $8E51: EA        NOP
  $8E52: EB 02     SBC #$02
  $8E54: EC ED EE  CPX $eeed
  $8E57: EF F0 F1  ISB $f1f0
  $8E5A: F2        ???
  $8E5B: F3 F4     ISB ($f4),Y
  $8E5D: F5 F6     SBC $f6,X
  $8E5F: F7 F8     ISB $f8,X
  $8E61: F9 00 00  SBC $0000,Y
  $8E64: 00        BRK
  $8E65: 00        BRK
  $8E66: 00        BRK
  $8E67: 00        BRK
  $8E68: 00        BRK
  $8E69: 00        BRK
  $8E6A: 00        BRK
  $8E6B: 00        BRK
  $8E6C: 50 50     BVC $8ebe
  $8E6E: 50 50     BVC $8ec0
  $8E70: 00        BRK
  $8E71: 00        BRK
  $8E72: 00        BRK
  $8E73: 00        BRK
  $8E74: 55 55     EOR $55,X
  $8E76: 55 55     EOR $55,X
  $8E78: 00        BRK
  $8E79: 00        BRK
  $8E7A: 00        BRK
  $8E7B: 00        BRK
  $8E7C: 55 55     EOR $55,X
  $8E7E: 55 55     EOR $55,X
  $8E80: 00        BRK
  $8E81: 00        BRK
  $8E82: FF 01 19  ISB $1901,X
  $8E85: 00        BRK
  $8E86: 00        BRK
  $8E87: 82 20     NOP #$20
  $8E89: 1C 0C 00  NOP $000c,X
  $8E8C: 1C FE FE  NOP $fefe,X
  $8E8F: 65 66     ADC $66
  $8E91: 65 66     ADC $66
  $8E93: 65 66     ADC $66
  $8E95: 65 66     ADC $66
  $8E97: FE 00 08  INC $0800,X
  $8E9A: FF FE 65  ISB $65fe,X
  $8E9D: 66 65     ROR $65
  $8E9F: 66 65     ROR $65
  $8EA1: 66 65     ROR $65
  $8EA3: 66 FE     ROR $fe
  $8EA5: 68        PLA
  $8EA6: FF FF 6D  ISB $6dff,X
  $8EA9: 6E 6F 70  ROR $706f
  $8EAC: 71 FF     ADC ($ff),Y
  $8EAE: 6A        ROR A
  $8EAF: 00        BRK
  $8EB0: 08        PHP
  $8EB1: FF 68 FF  ISB $ff68,X
  $8EB4: FF 9C 9D  ISB $9d9c,X
  $8EB7: 9E 9F FF  SHX $ff9f,Y
  $8EBA: FF 6A 67  ISB $676a,X
  $8EBD: 72        ???
  $8EBE: 73 00     RRA ($00),Y
  $8EC0: 04 FE     NOP $fe
  $8EC2: 74 FF     NOP $ff,X
  $8EC4: 69 00     ADC #$00
  $8EC6: 08        PHP
  $8EC7: FF 67 A0  ISB $a067,X
  $8ECA: A1 00     LDA ($00,X)
  $8ECC: 03 FE     SLO ($fe,X)
  $8ECE: A2 A3     LDX #$a3
  $8ED0: FF 69 68  ISB $6869,X
  $8ED3: 75 00     ADC $00,X
  $8ED5: 03 FE     SLO ($fe,X)
  $8ED7: 76 FE     ROR $fe,X
  $8ED9: 77 FF     RRA $ff,X
  $8EDB: 6A        ROR A
  $8EDC: 00        BRK
  $8EDD: 08        PHP
  $8EDE: FF 68 A4  ISB $a468,X
  $8EE1: A5 00     LDA $00
  $8EE3: 04 FE     NOP $fe
  $8EE5: A6 FF     LDX $ff
  $8EE7: 6A        ROR A
  $8EE8: 67 75     RRA $75
  $8EEA: 78        SEI
  $8EEB: 79 7A 7B  ADC $7b7a,Y
  $8EEE: 7C 7D FF  NOP $ff7d,X
  $8EF1: 69 00     ADC #$00
  $8EF3: 08        PHP
  $8EF4: FF 67 A7  ISB $a767,X
  $8EF7: A8        TAY
  $8EF8: A9 AA     LDA #$aa
  $8EFA: AB AC     ATX #$ac
  $8EFC: AD AE 69  LDA $69ae
  $8EFF: 68        PLA
  $8F00: 7E 7F 80  ROR $807f,X
  $8F03: 81 82     STA ($82,X)
  $8F05: 83 84     SAX ($84,X)
  $8F07: FF 6A 00  ISB $006a,X
  $8F0A: 08        PHP
  $8F0B: FF 68 FF  ISB $ff68,X
  $8F0E: AF B0 B1  LAX $b1b0
  $8F11: B2        ???
  $8F12: B3 B4     LAX ($b4),Y
  $8F14: B5 6A     LDA $6a,X
  $8F16: 67 85     RRA $85
  $8F18: 86 87     STX $87
  $8F1A: FE FE 88  INC $88fe,X
  $8F1D: FF FF 69  ISB $69ff,X
  $8F20: 00        BRK
  $8F21: 08        PHP
  $8F22: FF 67 FF  ISB $ff67,X
  $8F25: B6 B7     LDX $b7,Y
  $8F27: B8        CLV
  $8F28: B9 BA BB  LDA $bbba,Y
  $8F2B: BD 69 68  LDA $6869,X
  $8F2E: FF 89 8A  ISB $8a89,X
  $8F31: 8B FE     XAA #$fe
  $8F33: 8C FF FF  STY $ffff
  $8F36: 6A        ROR A
  $8F37: 00        BRK
  $8F38: 08        PHP
  $8F39: FF 68 FF  ISB $ff68,X
  $8F3C: BC BE FE  LDY $febe,X
  $8F3F: BF C0 C1  LAX $c1c0,Y
  $8F42: C2 6A     NOP #$6a
  $8F44: 67 8D     RRA $8d
  $8F46: 8E 80 90  STX $9080
  $8F49: 91 92     STA ($92),Y
  $8F4B: 93 FF     ??? ($ff),Y
  $8F4D: 69 00     ADC #$00
  $8F4F: 08        PHP
  $8F50: FF 67 FF  ISB $ff67,X
  $8F53: C3 C4     DCP ($c4,X)
  $8F55: C5 C6     CMP $c6
  $8F57: C7 C8     DCP $c8
  $8F59: FF 69 68  ISB $6869,X
  $8F5C: 94 95     STY $95,X
  $8F5E: 96 97     STX $97,Y
  $8F60: 98        TYA
  $8F61: 99 9A 9B  STA $9b9a,Y
  $8F64: 6A        ROR A
  $8F65: 00        BRK
  $8F66: 08        PHP
  $8F67: FF 68 C9  ISB $c968,X
  $8F6A: CA        DEX
  $8F6B: CB CC     AXS #$cc
  $8F6D: CD CE CF  CMP $cfce
  $8F70: C9 6A     CMP #$6a
  $8F72: 96 6C     STX $6c,Y
  $8F74: 6B 6C     ARR #$6c
  $8F76: 6B 6C     ARR #$6c
  $8F78: 6B 6C     ARR #$6c
  $8F7A: 6B 97     ARR #$97
  $8F7C: 00        BRK
  $8F7D: 08        PHP
  $8F7E: FF 96 6C  ISB $6c96,X
  $8F81: 6B 6C     ARR #$6c
  $8F83: 6B 6C     ARR #$6c
  $8F85: 6B 6C     ARR #$6c
  $8F87: 6B 97     ARR #$97
  $8F89: 00        BRK
  $8F8A: 00        BRK
  $8F8B: 00        BRK
  $8F8C: 00        BRK
  $8F8D: 00        BRK
  $8F8E: 00        BRK
  $8F8F: 00        BRK
  $8F90: 00        BRK
  $8F91: 88        DEY
  $8F92: AA        TAX
  $8F93: AA        TAX
  $8F94: 00        BRK
  $8F95: 00        BRK
  $8F96: AA        TAX
  $8F97: AA        TAX
  $8F98: 22        ???
  $8F99: 88        DEY
  $8F9A: AA        TAX
  $8F9B: AA        TAX
  $8F9C: 00        BRK
  $8F9D: 00        BRK
  $8F9E: AA        TAX
  $8F9F: AA        TAX
  $8FA0: 22        ???
  $8FA1: 44 99     NOP $99
  $8FA3: 59 00 00  EOR $0000,Y
  $8FA6: 5A        NOP
  $8FA7: 6A        ROR A
  $8FA8: 12        ???
  $8FA9: FF 02 1B  ISB $1b02,X
  $8FAC: 02        ???
  $8FAD: 0A        ASL A
  $8FAE: 0C 21 08  NOP $0821
  $8FB1: 06 D0     ASL $d0
  $8FB3: 00        BRK
  $8FB4: 06 FF     ASL $ff
  $8FB6: D1 D2     CMP ($d2),Y
  $8FB8: D3 D4     DCP ($d4),Y
  $8FBA: D5 D6     CMP $d6,X
  $8FBC: D7 FF     DCP $ff,X
  $8FBE: D8        CLD
  $8FBF: D9 DA DB  CMP $dbda,Y
  $8FC2: DC DD DE  NOP $dedd,X
  $8FC5: DF E0 E1  DCP $e1e0,X
  $8FC8: E2 E3     NOP #$e3
  $8FCA: E4 E5     CPX $e5
  $8FCC: E6 FF     INC $ff
  $8FCE: FF FF FF  ISB $ffff,X
  $8FD1: FE E7 E8  INC $e8e7,X
  $8FD4: E9 FF     SBC #$ff
  $8FD6: FF FF FF  ISB $ffff,X
  $8FD9: FE EA EB  INC $ebea,X
  $8FDC: EC FF FF  CPX $ffff
  $8FDF: 00        BRK
  $8FE0: 00        BRK
  $8FE1: 00        BRK
  $8FE2: 00        BRK
  $8FE3: 00        BRK
  $8FE4: 00        BRK
  $8FE5: 00        BRK
  $8FE6: 00        BRK
  $8FE7: 88        DEY
  $8FE8: AA        TAX
  $8FE9: AA        TAX
  $8FEA: 00        BRK
  $8FEB: 00        BRK
  $8FEC: AA        TAX
  $8FED: AA        TAX
  $8FEE: 22        ???
  $8FEF: 88        DEY
  $8FF0: AA        TAX
  $8FF1: AA        TAX
  $8FF2: FF FF AA  ISB $aaff,X
  $8FF5: AA        TAX
  $8FF6: 22        ???
  $8FF7: 44 99     NOP $99
  $8FF9: 59 0F 0F  EOR $0f0f,Y
  $8FFC: 5A        NOP
  $8FFD: 6A        ROR A
  $8FFE: 12        ???
  $8FFF: FF 02 1B  ISB $1b02,X
  $9002: 02        ???
  $9003: 0A        ASL A
  $9004: 48        PHA
  $9005: 20 10 0E  JSR $0e10
  $9008: 04 FF     NOP $ff
  $900A: FF 04 00  ISB $0004,X
  $900D: 04 FF     NOP $ff
  $900F: 04 FF     NOP $ff
  $9011: FF 04 FF  ISB $ff04,X
  $9014: FF 04 FF  ISB $ff04,X
  $9017: FF 04 FF  ISB $ff04,X
  $901A: FF 04 FF  ISB $ff04,X
  $901D: 04 00     NOP $00
  $901F: 03 FF     SLO ($ff,X)
  $9021: 04 FF     NOP $ff
  $9023: 04 FF     NOP $ff
  $9025: FF 04 FF  ISB $ff04,X
  $9028: FF 04 00  ISB $0004,X
  $902B: 04 FF     NOP $ff
  $902D: 04 FF     NOP $ff
  $902F: 04 00     NOP $00
  $9031: 04 FF     NOP $ff
  $9033: 04 FF     NOP $ff
  $9035: FF 04 00  ISB $0004,X
  $9038: 03 FF     SLO ($ff,X)
  $903A: 04 FF     NOP $ff
  $903C: FF 04 FF  ISB $ff04,X
  $903F: 12        ???
  $9040: 13 14     SLO ($14),Y
  $9042: FF FF 04  ISB $04ff,X
  $9045: 00        BRK
  $9046: 03 FF     SLO ($ff,X)
  $9048: 04 FF     NOP $ff
  $904A: FF 04 FF  ISB $ff04,X
  $904D: FF 04 1B  ISB $1b04,X
  $9050: 1C 1D 1E  NOP $1e1d,X
  $9053: FF FF 04  ISB $04ff,X
  $9056: 00        BRK
  $9057: 07 FF     SLO $ff
  $9059: 04 FF     NOP $ff
  $905B: 25 26     AND $26
  $905D: 27 28     RLA $28
  $905F: 04 FF     NOP $ff
  $9061: FF 04 FF  ISB $ff04,X
  $9064: 04 FF     NOP $ff
  $9066: 04 00     NOP $00
  $9068: 03 FF     SLO ($ff,X)
  $906A: 2F 30 31  RLA $3130
  $906D: 32        ???
  $906E: 33 34     RLA ($34),Y
  $9070: 04 35     NOP $35
  $9072: 36 37     ROL $37,X
  $9074: FF 04 FF  ISB $ff04,X
  $9077: FF 04 FF  ISB $ff04,X
  $907A: 3D FE FE  AND $fefe,X
  $907D: 3E 3F 40  ROL $403f,X
  $9080: FF 41 42  ISB $4241,X
  $9083: 43 84     SRE ($84,X)
  $9085: 85 86     STA $86
  $9087: 04 FF     NOP $ff
  $9089: 87 88     SAX $88
  $908B: FE 4B 4C  INC $4c4b,X
  $908E: 4D 04 FF  EOR $ff04
  $9091: 01 01     ORA ($01,X)
  $9093: 4E 4F 89  LSR $894f
  $9096: 8A        TXA
  $9097: 8B 8C     XAA #$8c
  $9099: 8D 8E 56  STA $568e
  $909C: 57 58     SRE $58,X
  $909E: 59 FF FF  EOR $ffff,Y
  $90A1: 01 01     ORA ($01,X)
  $90A3: 5A        NOP
  $90A4: 8F FF 04  SAX $04ff
  $90A7: FF 90 60  ISB $6090,X
  $90AA: 61 91     ADC ($91,X)
  $90AC: 92        ???
  $90AD: 64 04     NOP $04
  $90AF: FF 04 01  ISB $0104,X
  $90B2: 65 66     ADC $66
  $90B4: 04 FF     NOP $ff
  $90B6: FF 04 FF  ISB $ff04,X
  $90B9: 93 6B     ??? ($6b),Y
  $90BB: 6C FE 95  JMP ($95fe)
  $90BE: 6F 04 FF  RRA $ff04
  $90C1: 70 71     BVS $9134
  $90C3: 96 FF     STX $ff,Y
  $90C5: 04 FF     NOP $ff
  $90C7: FF 04 97  ISB $9704,X
  $90CA: 78        SEI
  $90CB: 79 7A 7B  ADC $7b7a,Y
  $90CE: 7C FF 04  NOP $04ff,X
  $90D1: 66 04     ROR $04
  $90D3: FF 04 FF  ISB $ff04,X
  $90D6: 04 FF     NOP $ff
  $90D8: FF 98 03  ISB $0398,X
  $90DB: 81 82     STA ($82,X)
  $90DD: 03 83     SLO ($83,X)
  $90DF: 04 FF     NOP $ff
  $90E1: F0 F0     BEQ $90d3
  $90E3: A0 A0     LDY #$a0
  $90E5: A0 A0     LDY #$a0
  $90E7: F0 F0     BEQ $90d9
  $90E9: FF FF AA  ISB $aaff,X
  $90EC: AA        TAX
  $90ED: AA        TAX
  $90EE: AA        TAX
  $90EF: FF FF FF  ISB $ffff,X
  $90F2: FF AA AA  ISB $aaaa,X
  $90F5: AA        TAX
  $90F6: AA        TAX
  $90F7: FF FF CF  ISB $cfff,X
  $90FA: FF AA AA  ISB $aaaa,X
  $90FD: AA        TAX
  $90FE: AA        TAX
  $90FF: FF FF FF  ISB $ffff,X
  $9102: 04 19     NOP $19
  $9104: 03 00     SLO ($00,X)
  $9106: 48        PHA
  $9107: 20 10 0E  JSR $0e10
  $910A: 04 FF     NOP $ff
  $910C: FF 04 00  ISB $0004,X
  $910F: 04 FF     NOP $ff
  $9111: 04 FF     NOP $ff
  $9113: FF 04 FF  ISB $ff04,X
  $9116: FF 04 FF  ISB $ff04,X
  $9119: FF 04 FF  ISB $ff04,X
  $911C: FF 04 05  ISB $0504,X
  $911F: 06 07     ASL $07
  $9121: 08        PHP
  $9122: FF 04 FF  ISB $ff04,X
  $9125: 04 FF     NOP $ff
  $9127: FF 04 FF  ISB $ff04,X
  $912A: FF 04 FF  ISB $ff04,X
  $912D: FF 09 0A  ISB $0a09,X
  $9130: 0B 0C     ANC #$0c
  $9132: 04 00     NOP $00
  $9134: 04 FF     NOP $ff
  $9136: 04 FF     NOP $ff
  $9138: FF 04 FF  ISB $ff04,X
  $913B: 0D 0E 0F  ORA $0f0e
  $913E: 10 11     BPL $9151
  $9140: 04 FF     NOP $ff
  $9142: 12        ???
  $9143: 13 14     SLO ($14),Y
  $9145: FF FF 04  ISB $04ff,X
  $9148: FF FF 15  ISB $15ff,X
  $914B: 16 17     ASL $17,X
  $914D: 18        CLC
  $914E: 19 1A FF  ORA $ff1a,Y
  $9151: 04 1B     NOP $1b
  $9153: 1C 1D 1E  NOP $1e1d,X
  $9156: FF FF 04  ISB $04ff,X
  $9159: FF 1F 20  ISB $201f,X
  $915C: 21 22     AND ($22,X)
  $915E: 23 03     RLA ($03,X)
  $9160: 24 FF     BIT $ff
  $9162: 25 26     AND $26
  $9164: 27 28     RLA $28
  $9166: 04 FF     NOP $ff
  $9168: FF 04 29  ISB $2904,X
  $916B: 2A        ROL A
  $916C: 2B 2C     ANC #$2c
  $916E: 2D 03 2E  AND $2e03
  $9171: 2F 30 31  RLA $3130
  $9174: 32        ???
  $9175: 33 34     RLA ($34),Y
  $9177: 04 35     NOP $35
  $9179: 36 37     ROL $37,X
  $917B: 38        SEC
  $917C: 39 03 3A  AND $3a03,Y
  $917F: 3B 3C 3D  RLA $3d3c,Y
  $9182: FE FE 3E  INC $3efe,X
  $9185: 3F 40 FF  RLA $ff40,X
  $9188: 41 42     EOR ($42,X)
  $918A: 43 44     SRE ($44,X)
  $918C: 45 46     EOR $46
  $918E: 47 48     SRE $48
  $9190: 49 4A     EOR #$4a
  $9192: FE 4B 4C  INC $4c4b,X
  $9195: 4D 04 FF  EOR $ff04
  $9198: 01 01     ORA ($01,X)
  $919A: 4E 4F 50  LSR $504f
  $919D: 51 52     EOR ($52),Y
  $919F: 53 54     SRE ($54),Y
  $91A1: 55 56     EOR $56,X
  $91A3: 57 58     SRE $58,X
  $91A5: 59 FF FF  EOR $ffff,Y
  $91A8: 01 01     ORA ($01,X)
  $91AA: 5A        NOP
  $91AB: 5B 5C 5D  SRE $5d5c,Y
  $91AE: 5E 5F 60  LSR $605f,X
  $91B1: 61 62     ADC ($62,X)
  $91B3: 63 64     RRA ($64,X)
  $91B5: 04 FF     NOP $ff
  $91B7: 04 01     NOP $01
  $91B9: 65 66     ADC $66
  $91BB: 67 03     RRA $03
  $91BD: 68        PLA
  $91BE: 69 03     ADC #$03
  $91C0: 6A        ROR A
  $91C1: 6B 6C     ARR #$6c
  $91C3: 6D 6E 6F  ADC $6f6e
  $91C6: 04 FF     NOP $ff
  $91C8: 70 71     BVS $923b
  $91CA: 72        ???
  $91CB: 73 74     RRA ($74),Y
  $91CD: 75 76     ADC $76,X
  $91CF: 03 77     SLO ($77,X)
  $91D1: 78        SEI
  $91D2: 79 7A 7B  ADC $7b7a,Y
  $91D5: 7C FF 04  NOP $04ff,X
  $91D8: 66 04     ROR $04
  $91DA: 7D 03 7E  ADC $7e03,X
  $91DD: 04 FF     NOP $ff
  $91DF: 7F 80 03  RRA $0380,X
  $91E2: 81 82     STA ($82,X)
  $91E4: 03 83     SLO ($83,X)
  $91E6: 04 FF     NOP $ff
  $91E8: 00        BRK
  $91E9: 00        BRK
  $91EA: A0 A0     LDY #$a0
  $91EC: A0 A0     LDY #$a0
  $91EE: 00        BRK
  $91EF: 00        BRK
  $91F0: 00        BRK
  $91F1: 00        BRK
  $91F2: AA        TAX
  $91F3: AA        TAX
  $91F4: AA        TAX
  $91F5: AA        TAX
  $91F6: 00        BRK
  $91F7: 00        BRK
  $91F8: 00        BRK
  $91F9: 00        BRK
  $91FA: 59 AA AA  EOR $aaaa,Y
  $91FD: AA        TAX
  $91FE: 00        BRK
  $91FF: 00        BRK
  $9200: 00        BRK
  $9201: 00        BRK
  $9202: 95 AA     STA $aa,X
  $9204: AA        TAX
  $9205: AA        TAX
  $9206: 00        BRK
  $9207: 00        BRK
  $9208: FF 04 19  ISB $1904,X
  $920B: 06 00     ASL $00
  $920D: 88        DEY
  $920E: 20 10 0C  JSR $0c10
  $9211: FF 70 FF  ISB $ff70,X
  $9214: FF 70 FF  ISB $ff70,X
  $9217: 70 FF     BVS $9218
  $9219: FF 70 00  ISB $0070,X
  $921C: 03 FF     SLO ($ff,X)
  $921E: 70 FF     BVS $921f
  $9220: 70 00     BVS $9222
  $9222: 03 FF     SLO ($ff,X)
  $9224: 70 FF     BVS $9225
  $9226: FF 71 D3  ISB $d371,X
  $9229: D4 72     NOP $72,X
  $922B: 70 FF     BVS $922c
  $922D: 70 00     BVS $922f
  $922F: 03 FF     SLO ($ff,X)
  $9231: FF 70 FF  ISB $ff70,X
  $9234: FF 70 73  ISB $7370,X
  $9237: FF 74 FF  ISB $ff74,X
  $923A: 75 76     ADC $76,X
  $923C: 00        BRK
  $923D: 03 FF     SLO ($ff,X)
  $923F: 70 FF     BVS $9240
  $9241: 70 00     BVS $9243
  $9243: 04 FF     NOP $ff
  $9245: 77 78     RRA $78,X
  $9247: 79 7A 7B  ADC $7b7a,Y
  $924A: 7C 70 FF  NOP $ff70,X
  $924D: 70 FF     BVS $924e
  $924F: 70 FF     BVS $9250
  $9251: FF 70 FF  ISB $ff70,X
  $9254: FF 7D 7E  ISB $7e7d,X
  $9257: 7F 80 81  RRA $8180,X
  $925A: 82 00     NOP #$00
  $925C: 05 FF     ORA $ff
  $925E: 70 FF     BVS $925f
  $9260: FF 70 FF  ISB $ff70,X
  $9263: 83 84     SAX ($84,X)
  $9265: FE 86 87  INC $8786,X
  $9268: 88        DEY
  $9269: FF 70 FF  ISB $ff70,X
  $926C: 70 FF     BVS $926d
  $926E: 00        BRK
  $926F: 06 FF     ASL $ff
  $9271: 89 FE     NOP #$fe
  $9273: 8B 8C     XAA #$8c
  $9275: 8D 00 04  STA $0400
  $9278: FF 70 FF  ISB $ff70,X
  $927B: 70 00     BVS $927d
  $927D: 04 FF     NOP $ff
  $927F: 8E 8F 90  STX $908f
  $9282: 91 92     STA ($92),Y
  $9284: FF FF 70  ISB $70ff,X
  $9287: FF FF 70  ISB $70ff,X
  $928A: FF FF 70  ISB $70ff,X
  $928D: FF 93 94  ISB $9493,X
  $9290: 95 96     STA $96,X
  $9292: 97 98     SAX $98,Y
  $9294: 99 FF FF  STA $ffff,Y
  $9297: 70 FF     BVS $9298
  $9299: FF FF 70  ISB $70ff,X
  $929C: FF 9A 9B  ISB $9b9a,X
  $929F: 9C 9D 9E  SHY $9e9d,X
  $92A2: 9F A0 A1  ??? $a1a0,Y
  $92A5: FF 70 FF  ISB $ff70,X
  $92A8: FF FF 70  ISB $70ff,X
  $92AB: FF FF A2  ISB $a2ff,X
  $92AE: A3 A4     LAX ($a4,X)
  $92B0: A5 A6     LDA $a6
  $92B2: A7 A8     LAX $a8
  $92B4: A9 AA     LDA #$aa
  $92B6: FF FF 70  ISB $70ff,X
  $92B9: 00        BRK
  $92BA: 03 FF     SLO ($ff,X)
  $92BC: 70 AB     BVS $9269
  $92BE: AC 02 AD  LDY $ad02
  $92C1: AE 02 AF  LDX $af02
  $92C4: B0 B1     BCS $9277
  $92C6: FF 70 FF  ISB $ff70,X
  $92C9: 00        BRK
  $92CA: 00        BRK
  $92CB: 00        BRK
  $92CC: 00        BRK
  $92CD: 00        BRK
  $92CE: 00        BRK
  $92CF: 00        BRK
  $92D0: 00        BRK
  $92D1: 00        BRK
  $92D2: 00        BRK
  $92D3: AA        TAX
  $92D4: 6A        ROR A
  $92D5: 9A        TXS
  $92D6: AA        TAX
  $92D7: 00        BRK
  $92D8: 00        BRK
  $92D9: 00        BRK
  $92DA: 00        BRK
  $92DB: AA        TAX
  $92DC: AA        TAX
  $92DD: 9A        TXS
  $92DE: AA        TAX
  $92DF: 00        BRK
  $92E0: 00        BRK
  $92E1: 00        BRK
  $92E2: 00        BRK
  $92E3: AA        TAX
  $92E4: AA        TAX
  $92E5: AA        TAX
  $92E6: AA        TAX
  $92E7: 00        BRK
  $92E8: 00        BRK
  $92E9: FF 05 1A  ISB $1a05,X
  $92EC: 04 0D     NOP $0d
  $92EE: 88        DEY
  $92EF: 20 10 0C  JSR $0c10
  $92F2: 00        BRK
  $92F3: 10 FF     BPL $92f4
  $92F5: 00        BRK
  $92F6: 10 FF     BPL $92f7
  $92F8: 00        BRK
  $92F9: 07 FF     SLO $ff
  $92FB: 04 05     NOP $05
  $92FD: 06 00     ASL $00
  $92FF: 06 FF     ASL $ff
  $9301: 00        BRK
  $9302: 06 FF     ASL $ff
  $9304: 07 08     SLO $08
  $9306: 09 0A     ORA #$0a
  $9308: 0B 00     ANC #$00
  $930A: 05 FF     ORA $ff
  $930C: 00        BRK
  $930D: 06 FF     ASL $ff
  $930F: 0C 0D 0E  NOP $0e0d
  $9312: 0F 10 11  SLO $1110
  $9315: 00        BRK
  $9316: 04 FF     NOP $ff
  $9318: 00        BRK
  $9319: 06 FF     ASL $ff
  $931B: 12        ???
  $931C: 13 14     SLO ($14),Y
  $931E: 15 16     ORA $16,X
  $9320: 17 00     SLO $00,X
  $9322: 04 FF     NOP $ff
  $9324: 00        BRK
  $9325: 06 FF     ASL $ff
  $9327: 18        CLC
  $9328: 19 FF 1A  ORA $1aff,Y
  $932B: 1B 1C 00  SLO $001c,Y
  $932E: 04 FF     NOP $ff
  $9330: 00        BRK
  $9331: 06 FF     ASL $ff
  $9333: 1D 1E 1F  ORA $1f1e,X
  $9336: 20 21 22  JSR $2221
  $9339: 00        BRK
  $933A: 04 FF     NOP $ff
  $933C: 00        BRK
  $933D: 06 FF     ASL $ff
  $933F: 23 24     RLA ($24,X)
  $9341: 25 26     AND $26
  $9343: 27 28     RLA $28
  $9345: 00        BRK
  $9346: 04 FF     NOP $ff
  $9348: 00        BRK
  $9349: 04 FF     NOP $ff
  $934B: 29 2A     AND #$2a
  $934D: 2B 2C     ANC #$2c
  $934F: 2D 2E 2F  AND $2f2e
  $9352: 30 31     BMI $9385
  $9354: 32        ???
  $9355: FF FF 00  ISB $00ff,X
  $9358: 03 FF     SLO ($ff,X)
  $935A: 33 34     RLA ($34),Y
  $935C: 02        ???
  $935D: 02        ???
  $935E: 35 36     AND $36,X
  $9360: 00        BRK
  $9361: 04 02     NOP $02
  $9363: 37 38     RLA $38,X
  $9365: FF 00 03  ISB $0300,X
  $9368: FF 39 3A  ISB $3a39,X
  $936B: 02        ???
  $936C: 02        ???
  $936D: 3B 3C 00  RLA $003c,Y
  $9370: 04 02     NOP $02
  $9372: 3D 3E FF  AND $ff3e,X
  $9375: 00        BRK
  $9376: 00        BRK
  $9377: 00        BRK
  $9378: 00        BRK
  $9379: 00        BRK
  $937A: 00        BRK
  $937B: 00        BRK
  $937C: 00        BRK
  $937D: 00        BRK
  $937E: 00        BRK
  $937F: 55 55     EOR $55,X
  $9381: 55 55     EOR $55,X
  $9383: 00        BRK
  $9384: 00        BRK
  $9385: 00        BRK
  $9386: 00        BRK
  $9387: 55 55     EOR $55,X
  $9389: 55 55     EOR $55,X
  $938B: 00        BRK
  $938C: 00        BRK
  $938D: 00        BRK
  $938E: 00        BRK
  $938F: 55 55     EOR $55,X
  $9391: A9 A6     LDA #$a6
  $9393: 00        BRK
  $9394: 00        BRK
  $9395: FF 06 1B  ISB $1b06,X
  $9398: 05 0F     ORA $0f
  $939A: 06 D4     ASL $d4
  $939C: 90 D4     BCC $9372
  $939E: DD D4 21  CMP $21d4,X
  $93A1: D5 8E     CMP $8e,X
  $93A3: D5 1F     CMP $1f,X
  $93A5: D6 6B     DEC $6b,X
  $93A7: D6 89     DEC $89,X
  $93A9: D6 9E     DEC $9e,X
  $93AB: D6 B3     DEC $b3,X
  $93AD: D6 C5     DEC $c5,X
  $93AF: D6 D7     DEC $d7,X
  $93B1: D6 E9     DEC $e9,X
  $93B3: D6 F5     DEC $f5,X
  $93B5: D6 01     DEC $01,X
  $93B7: D7 10     DCP $10,X
  $93B9: D7 1F     DCP $1f,X
  $93BB: D7 2E     DCP $2e,X
  $93BD: D7 3D     DCP $3d,X
  $93BF: D7 4C     DCP $4c,X
  $93C1: D7 5B     DCP $5b,X
  $93C3: D7 63     DCP $63,X
  $93C5: EA        NOP
  $93C6: A8        TAY
  $93C7: EA        NOP
  $93C8: 1D EB 90  ORA $90eb,X
  $93CB: EB 0B     SBC #$0b
  $93CD: EC 89 EC  CPX $ec89
  $93D0: F6 EC     INC $ec,X
  $93D2: 20 ED C5  JSR $c5ed
  $93D5: ED 0B EE  SBC $ee0b
  $93D8: DE EE 34  DEC $34ee,X
  $93DB: EF D7 EF  ISB $efd7
  $93DE: 2E F0 3A  ROL $3af0
  $93E1: F0 46     BEQ $9429
  $93E3: F0 52     BEQ $9437
  $93E5: F0 64     BEQ $944b
  $93E7: F0 6B     BEQ $9454
  $93E9: F0 72     BEQ $945d
  $93EB: F0 79     BEQ $9466
  $93ED: F0 80     BEQ $936f
  $93EF: F0 87     BEQ $9378
  $93F1: F0 8E     BEQ $9381
  $93F3: F0 BB     BEQ $93b0
  $93F5: F0 E8     BEQ $93df
  $93F7: F0 22     BEQ $941b
  $93F9: F1 51     SBC ($51),Y
  $93FB: F1 BC     SBC ($bc),Y
  $93FD: F1 C6     SBC ($c6),Y
  $93FF: F1 CD     SBC ($cd),Y
  $9401: F1 24     SBC ($24),Y
  $9403: F2        ???
  $9404: 53 F2     SRE ($f2),Y
  $9406: 1A        NOP
  $9407: 04 18     NOP $18
  $9409: 48        PHA
  $940A: 13 01     SLO ($01),Y
  $940C: 50 14     BVC $9422
  $940E: 01 88     ORA ($88,X)
  $9410: 15 01     ORA $01,X
  $9412: 90 16     BCC $942a
  $9414: 01 08     ORA ($08,X)
  $9416: 20 28 17  JSR $1728
  $9419: 01 30     ORA ($30,X)
  $941B: 18        CLC
  $941C: 01 50     ORA ($50,X)
  $941E: 19 01 60  ORA $6001,Y
  $9421: 1A        NOP
  $9422: 01 68     ORA ($68,X)
  $9424: 1B 01 88  SLO $8801,Y
  $9427: 1C 01 90  NOP $9001,X
  $942A: 1D 01 98  ORA $9801,X
  $942D: 1E 01 05  ASL $0501,X
  $9430: 28        PLP
  $9431: 30 1F     BMI $9452
  $9433: 01 50     ORA ($50,X)
  $9435: 21 01     AND ($01,X)
  $9437: 70 22     BVS $945b
  $9439: 01 90     ORA ($90,X)
  $943B: 23 01     RLA ($01,X)
  $943D: 98        TYA
  $943E: 24 01     BIT $01
  $9440: 06 30     ASL $30
  $9442: 28        PLP
  $9443: 25 01     AND $01
  $9445: 30 26     BMI $946d
  $9447: 01 48     ORA ($48,X)
  $9449: 27 01     RLA $01
  $944B: 50 28     BVC $9475
  $944D: 01 70     ORA ($70,X)
  $944F: 2A        ROL A
  $9450: 01 90     ORA ($90,X)
  $9452: 2B 01     ANC #$01
  $9454: 01 38     ORA ($38,X)
  $9456: 38        SEC
  $9457: 2C 01 07  BIT $0701
  $945A: 40        RTI
  $945B: 30 2D     BMI $948a
  $945D: 01 38     ORA ($38,X)
  $945F: 2E 01 40  ROL $4001
  $9462: 2F 01 48  RLA $4801
  $9465: 30 01     BMI $9468
  $9467: 58        CLI
  $9468: 31 01     AND ($01),Y
  $946A: 78        SEI
  $946B: 32        ???
  $946C: 01 80     ORA ($80,X)
  $946E: 33 01     RLA ($01),Y
  $9470: 05 48     ORA $48
  $9472: 38        SEC
  $9473: 34 01     NOP $01,X
  $9475: 40        RTI
  $9476: 35 01     AND $01,X
  $9478: 58        CLI
  $9479: 36 01     ROL $01,X
  $947B: 78        SEI
  $947C: 37 01     RLA $01,X
  $947E: 80 38     NOP #$38
  $9480: 01 04     ORA ($04,X)
  $9482: 50 38     BVC $94bc
  $9484: 39 01 58  AND $5801,Y
  $9487: 3A        NOP
  $9488: 01 60     ORA ($60,X)
  $948A: 3B 01 78  RLA $7801,Y
  $948D: 3C 01 00  NOP $0001,X
  $9490: 1A        NOP
  $9491: 03 20     SLO ($20,X)
  $9493: 08        PHP
  $9494: B2        ???
  $9495: 00        BRK
  $9496: 10 B3     BPL $944b
  $9498: 00        BRK
  $9499: 20 B4 00  JSR $00b4
  $949C: 06 28     ASL $28
  $949E: 08        PHP
  $949F: B5 00     LDA $00,X
  $94A1: 10 B6     BPL $9459
  $94A3: 00        BRK
  $94A4: 20 B7 00  JSR $00b7
  $94A7: 90 C5     BCC $946e
  $94A9: 00        BRK
  $94AA: 98        TYA
  $94AB: C6 00     DEC $00
  $94AD: A8        TAY
  $94AE: C7 00     DCP $00
  $94B0: 02        ???
  $94B1: 30 98     BMI $944b
  $94B3: C8        INY
  $94B4: 00        BRK
  $94B5: A8        TAY
  $94B6: C9 00     CMP #$00
  $94B8: 02        ???
  $94B9: 38        SEC
  $94BA: 08        PHP
  $94BB: CF 00 20  DCP $2000
  $94BE: D0 00     BNE $94c0
  $94C0: 02        ???
  $94C1: 40        RTI
  $94C2: 08        PHP
  $94C3: B8        CLV
  $94C4: 00        BRK
  $94C5: 20 B9 00  JSR $00b9
  $94C8: 06 48     ASL $48
  $94CA: 08        PHP
  $94CB: BA        TSX
  $94CC: 00        BRK
  $94CD: 10 BB     BPL $948a
  $94CF: 00        BRK
  $94D0: 18        CLC
  $94D1: BC 00 20  LDY $2000,X
  $94D4: BD 00 98  LDA $9800,X
  $94D7: D1 00     CMP ($00),Y
  $94D9: B0 D2     BCS $94ad
  $94DB: 00        BRK
  $94DC: 00        BRK
  $94DD: 1A        NOP
  $94DE: 01 20     ORA ($20,X)
  $94E0: 20 06 01  JSR $0106
  $94E3: 05 28     ORA $28
  $94E5: 20 07 01  JSR $0107
  $94E8: 28        PLP
  $94E9: 08        PHP
  $94EA: 01 30     ORA ($30,X)
  $94EC: 09 01     ORA #$01
  $94EE: 38        SEC
  $94EF: 0A        ASL A
  $94F0: 01 38     ORA ($38,X)
  $94F2: 0B 01     ANC #$01
  $94F4: 04 30     NOP $30
  $94F6: 20 FF 01  JSR $01ff
  $94F9: 28        PLP
  $94FA: FF 01 30  ISB $3001,X
  $94FD: 0C 01 38  NOP $3801
  $9500: 0D 01 04  ORA $0401
  $9503: 38        SEC
  $9504: 20 FF 01  JSR $01ff
  $9507: 28        PLP
  $9508: FF 01 30  ISB $3001,X
  $950B: 0E 01 38  ASL $3801
  $950E: 11 01     ORA ($01),Y
  $9510: 03 40     SLO ($40,X)
  $9512: 20 FF 01  JSR $01ff
  $9515: 28        PLP
  $9516: 0F 01 38  SLO $3801
  $9519: 12        ???
  $951A: 01 01     ORA ($01,X)
  $951C: 48        PHA
  $951D: 20 10 01  JSR $0110
  $9520: 00        BRK
  $9521: 1B 04 00  SLO $0004,Y
  $9524: 50 40     BVC $9566
  $9526: 00        BRK
  $9527: 58        CLI
  $9528: 41 00     EOR ($00,X)
  $952A: 60        RTS
  $952B: 41 40     EOR ($40,X)
  $952D: 68        PLA
  $952E: 42        ???
  $952F: 00        BRK
  $9530: 06 08     ASL $08
  $9532: 48        PHA
  $9533: 43 00     SRE ($00,X)
  $9535: 50 FF     BVC $9536
  $9537: 00        BRK
  $9538: 58        CLI
  $9539: 44 00     NOP $00
  $953B: 60        RTS
  $953C: FF 00 68  ISB $6800,X
  $953F: 45 00     EOR $00
  $9541: 70 46     BVS $9589
  $9543: 00        BRK
  $9544: 06 10     ASL $10
  $9546: 48        PHA
  $9547: 47 00     SRE $00
  $9549: 50 48     BVC $9593
  $954B: 00        BRK
  $954C: 58        CLI
  $954D: 49 00     EOR #$00
  $954F: 60        RTS
  $9550: 4A        LSR A
  $9551: 00        BRK
  $9552: 68        PLA
  $9553: 4B 00     ALR #$00
  $9555: 70 4C     BVS $95a3
  $9557: 00        BRK
  $9558: 04 18     NOP $18
  $955A: 48        PHA
  $955B: 4D 00 50  EOR $5000
  $955E: 4E 00 68  LSR $6800
  $9561: 4F 00 70  SRE $7000
  $9564: 50 00     BVC $9566
  $9566: 04 20     NOP $20
  $9568: 48        PHA
  $9569: 51 00     EOR ($00),Y
  $956B: 50 52     BVC $95bf
  $956D: 00        BRK
  $956E: 68        PLA
  $956F: 53 00     SRE ($00),Y
  $9571: 70 54     BVS $95c7
  $9573: 00        BRK
  $9574: 03 28     SLO ($28,X)
  $9576: 50 55     BVC $95cd
  $9578: 00        BRK
  $9579: 68        PLA
  $957A: 56 00     LSR $00,X
  $957C: 70 57     BVS $95d5
  $957E: 00        BRK
  $957F: 04 30     NOP $30
  $9581: 50 58     BVC $95db
  $9583: 00        BRK
  $9584: 58        CLI
  $9585: 59 00 68  EOR $6800,Y
  $9588: 5A        NOP
  $9589: 00        BRK
  $958A: 70 5B     BVS $95e7
  $958C: 00        BRK
  $958D: 00        BRK
  $958E: 1A        NOP
  $958F: 03 08     SLO ($08,X)
  $9591: 58        CLI
  $9592: 42        ???
  $9593: 01 60     ORA ($60,X)
  $9595: 43 01     SRE ($01,X)
  $9597: 68        PLA
  $9598: 44 01     NOP $01
  $959A: 05 10     ORA $10
  $959C: 50 45     BVC $95e3
  $959E: 01 58     ORA ($58,X)
  $95A0: 46 01     LSR $01
  $95A2: 60        RTS
  $95A3: 47 01     SRE $01
  $95A5: 68        PLA
  $95A6: 48        PHA
  $95A7: 01 70     ORA ($70,X)
  $95A9: 49 01     EOR #$01
  $95AB: 06 18     ASL $18
  $95AD: 50 4A     BVC $95f9
  $95AF: 01 58     ORA ($58,X)
  $95B1: 4B 01     ALR #$01
  $95B3: 60        RTS
  $95B4: 4C 01 68  JMP $6801
  $95B7: 4D 01 70  EOR $7001
  $95BA: 4E 01 78  LSR $7801
  $95BD: 4F 01 04  SRE $0401
  $95C0: 20 50 50  JSR $5050
  $95C3: 01 58     ORA ($58,X)
  $95C5: 51 01     EOR ($01),Y
  $95C7: 70 52     BVS $961b
  $95C9: 01 78     ORA ($78,X)
  $95CB: 53 01     SRE ($01),Y
  $95CD: 04 28     NOP $28
  $95CF: 50 54     BVC $9625
  $95D1: 01 58     ORA ($58,X)
  $95D3: 55 01     EOR $01,X
  $95D5: 70 56     BVS $962d
  $95D7: 01 78     ORA ($78,X)
  $95D9: 57 01     SRE $01,X
  $95DB: 04 30     NOP $30
  $95DD: 50 58     BVC $9637
  $95DF: 01 58     ORA ($58,X)
  $95E1: 59 01 70  EOR $7001,Y
  $95E4: 5A        NOP
  $95E5: 01 78     ORA ($78,X)
  $95E7: 5B 01 07  SRE $0701,Y
  $95EA: 38        SEC
  $95EB: 30 62     BMI $964f
  $95ED: 00        BRK
  $95EE: 30 6F     BMI $965f
  $95F0: 01 38     ORA ($38,X)
  $95F2: 63 00     RRA ($00,X)
  $95F4: 50 5C     BVC $9652
  $95F6: 01 58     ORA ($58,X)
  $95F8: 5D 01 70  EOR $7001,X
  $95FB: 5E 01 78  LSR $7801,X
  $95FE: 5F 01 03  SRE $0301,X
  $9601: 40        RTI
  $9602: 30 64     BMI $9668
  $9604: 00        BRK
  $9605: 38        SEC
  $9606: 65 00     ADC $00
  $9608: 40        RTI
  $9609: 66 00     ROR $00
  $960B: 03 48     SLO ($48,X)
  $960D: 30 67     BMI $9676
  $960F: 00        BRK
  $9610: 38        SEC
  $9611: 68        PLA
  $9612: 00        BRK
  $9613: 40        RTI
  $9614: 69 00     ADC #$00
  $9616: 02        ???
  $9617: 50 30     BVC $9649
  $9619: 6A        ROR A
  $961A: 00        BRK
  $961B: 38        SEC
  $961C: 6B 00     ARR #$00
  $961E: 00        BRK
  $961F: 1A        NOP
  $9620: 01 08     ORA ($08,X)
  $9622: 48        PHA
  $9623: 04 00     NOP $00
  $9625: 02        ???
  $9626: 20 20 06  JSR $0620
  $9629: 01 50     ORA ($50,X)
  $962B: 05 00     ORA $00
  $962D: 05 28     ORA $28
  $962F: 20 07 01  JSR $0107
  $9632: 28        PLP
  $9633: 08        PHP
  $9634: 01 30     ORA ($30,X)
  $9636: 09 01     ORA #$01
  $9638: 38        SEC
  $9639: 0A        ASL A
  $963A: 01 38     ORA ($38,X)
  $963C: 0B 01     ANC #$01
  $963E: 04 30     NOP $30
  $9640: 20 FF 01  JSR $01ff
  $9643: 28        PLP
  $9644: FF 01 30  ISB $3001,X
  $9647: 0C 01 38  NOP $3801
  $964A: 0D 01 04  ORA $0401
  $964D: 38        SEC
  $964E: 20 FF 01  JSR $01ff
  $9651: 28        PLP
  $9652: FF 01 30  ISB $3001,X
  $9655: 0E 01 38  ASL $3801
  $9658: 11 01     ORA ($01),Y
  $965A: 03 40     SLO ($40,X)
  $965C: 20 FF 01  JSR $01ff
  $965F: 28        PLP
  $9660: 0F 01 38  SLO $3801
  $9663: 12        ???
  $9664: 01 01     ORA ($01,X)
  $9666: 48        PHA
  $9667: 20 10 01  JSR $0110
  $966A: 00        BRK
  $966B: 0C 04 E8  NOP $e804
  $966E: E0 20     CPX #$20
  $9670: 00        BRK
  $9671: E8        INX
  $9672: 21 00     AND ($00,X)
  $9674: F0 24     BEQ $969a
  $9676: 00        BRK
  $9677: F8        SED
  $9678: 25 00     AND $00
  $967A: 04 F0     NOP $f0
  $967C: E0 22     CPX #$22
  $967E: 00        BRK
  $967F: E8        INX
  $9680: 23 00     RLA ($00,X)
  $9682: F0 26     BEQ $96aa
  $9684: 00        BRK
  $9685: F8        SED
  $9686: 27 00     RLA $00
  $9688: 00        BRK
  $9689: 1A        NOP
  $968A: 03 28     SLO ($28,X)
  $968C: 48        PHA
  $968D: 20 01 48  JSR $4801
  $9690: 3F 02 68  RLA $6802,X
  $9693: 3D 02 02  AND $0202,X
  $9696: 30 68     BMI $9700
  $9698: 29 01     AND #$01
  $969A: 68        PLA
  $969B: 3E 02 00  ROL $0002,X
  $969E: 1A        NOP
  $969F: 03 28     SLO ($28,X)
  $96A1: 48        PHA
  $96A2: 20 01 48  JSR $4801
  $96A5: 40        RTI
  $96A6: 02        ???
  $96A7: 68        PLA
  $96A8: 3D 02 02  AND $0202,X
  $96AB: 30 68     BMI $9715
  $96AD: 29 01     AND #$01
  $96AF: 68        PLA
  $96B0: 3E 02 00  ROL $0002,X
  $96B3: 1A        NOP
  $96B4: 02        ???
  $96B5: 30 10     BMI $96c7
  $96B7: 03 00     SLO ($00,X)
  $96B9: 18        CLC
  $96BA: C0 00     CPY #$00
  $96BC: 02        ???
  $96BD: 38        SEC
  $96BE: 18        CLC
  $96BF: C1 00     CMP ($00,X)
  $96C1: A0 CA     LDY #$ca
  $96C3: 00        BRK
  $96C4: 00        BRK
  $96C5: 1A        NOP
  $96C6: 02        ???
  $96C7: 30 10     BMI $96d9
  $96C9: 03 00     SLO ($00,X)
  $96CB: 18        CLC
  $96CC: BE 00 02  LDX $0200,Y
  $96CF: 38        SEC
  $96D0: 18        CLC
  $96D1: BF 00 A0  LAX $a000,Y
  $96D4: CA        DEX
  $96D5: 00        BRK
  $96D6: 00        BRK
  $96D7: 1A        NOP
  $96D8: 02        ???
  $96D9: 30 10     BMI $96eb
  $96DB: 03 00     SLO ($00,X)
  $96DD: 18        CLC
  $96DE: C0 00     CPY #$00
  $96E0: 02        ???
  $96E1: 38        SEC
  $96E2: 18        CLC
  $96E3: C1 00     CMP ($00,X)
  $96E5: A0 CC     LDY #$cc
  $96E7: 00        BRK
  $96E8: 00        BRK
  $96E9: 1B 01 20  SLO $2001,Y
  $96EC: 58        CLI
  $96ED: 60        RTS
  $96EE: 00        BRK
  $96EF: 01 28     ORA ($28,X)
  $96F1: 58        CLI
  $96F2: 62        ???
  $96F3: 00        BRK
  $96F4: 00        BRK
  $96F5: 1B 01 20  SLO $2001,Y
  $96F8: 58        CLI
  $96F9: 63 00     RRA ($00,X)
  $96FB: 01 28     ORA ($28,X)
  $96FD: 58        CLI
  $96FE: 61 00     ADC ($00,X)
  $9700: 00        BRK
  $9701: 1A        NOP
  $9702: 02        ???
  $9703: 28        PLP
  $9704: 30 60     BMI $9766
  $9706: 00        BRK
  $9707: 60        RTS
  $9708: 6C 00 01  JMP ($0100)
  $970B: 30 30     BMI $973d
  $970D: 61 00     ADC ($00,X)
  $970F: 00        BRK
  $9710: 1A        NOP
  $9711: 02        ???
  $9712: 28        PLP
  $9713: 30 60     BMI $9775
  $9715: 40        RTI
  $9716: 60        RTS
  $9717: 6C 00 01  JMP ($0100)
  $971A: 30 30     BMI $974c
  $971C: 61 00     ADC ($00,X)
  $971E: 00        BRK
  $971F: 1A        NOP
  $9720: 02        ???
  $9721: 28        PLP
  $9722: 30 60     BMI $9784
  $9724: 40        RTI
  $9725: 60        RTS
  $9726: 6C 00 01  JMP ($0100)
  $9729: 30 30     BMI $975b
  $972B: 61 40     ADC ($40,X)
  $972D: 00        BRK
  $972E: 1A        NOP
  $972F: 02        ???
  $9730: 28        PLP
  $9731: 30 60     BMI $9793
  $9733: 00        BRK
  $9734: 60        RTS
  $9735: 6C 00 01  JMP ($0100)
  $9738: 30 30     BMI $976a
  $973A: 61 40     ADC ($40,X)
  $973C: 00        BRK
  $973D: 1A        NOP
  $973E: 02        ???
  $973F: 28        PLP
  $9740: 30 60     BMI $97a2
  $9742: 40        RTI
  $9743: 60        RTS
  $9744: 6D 00 01  ADC $0100
  $9747: 30 30     BMI $9779
  $9749: 61 00     ADC ($00,X)
  $974B: 00        BRK
  $974C: 1A        NOP
  $974D: 02        ???
  $974E: 28        PLP
  $974F: 30 60     BMI $97b1
  $9751: 40        RTI
  $9752: 60        RTS
  $9753: 6E 00 01  ROR $0100
  $9756: 30 30     BMI $9788
  $9758: 61 40     ADC ($40,X)
  $975A: 00        BRK
  $975B: 1A        NOP
  $975C: 02        ???
  $975D: 28        PLP
  $975E: 30 60     BMI $97c0
  $9760: 00        BRK
  $9761: 60        RTS
  $9762: 6D 00 01  ADC $0100
  $9765: 30 30     BMI $9797
  $9767: 61 40     ADC ($40,X)
  $9769: 00        BRK
  $976A: 84 D7     STY $d7
  $976C: 87 D7     SAX $d7
  $976E: 8A        TXA
  $976F: D7 8D     DCP $8d,X
  $9771: D7 90     DCP $90,X
  $9773: D7 95     DCP $95,X
  $9775: D7 9A     DCP $9a,X
  $9777: D7 9D     DCP $9d,X
  $9779: D7 A0     DCP $a0,X
  $977B: D7 A3     DCP $a3,X
  $977D: D7 A6     DCP $a6,X
  $977F: D7 A9     DCP $a9,X
  $9781: D7 AC     DCP $ac,X
  $9783: D7 09     DCP $09,X
  $9785: 08        PHP
  $9786: 00        BRK
  $9787: 0B 0A     ANC #$0a
  $9789: 00        BRK
  $978A: 0C 0A 00  NOP $000a
  $978D: 0E 0D 00  ASL $000d
  $9790: 10 11     BPL $97a3
  $9792: 12        ???
  $9793: 0F 00 13  SLO $1300
  $9796: 14 15     NOP $15,X
  $9798: 0F 00 23  SLO $2300
  $979B: 24 00     BIT $00
  $979D: 25 26     AND $26
  $979F: 00        BRK
  $97A0: 27 28     RLA $28
  $97A2: 00        BRK
  $97A3: 29 2A     AND #$2a
  $97A5: 00        BRK
  $97A6: 2B 2C     ANC #$2c
  $97A8: 00        BRK
  $97A9: 2D 2E 00  AND $002e
  $97AC: 32        ???
  $97AD: 33 00     RLA ($00),Y
  $97AF: 17 D8     SLO $d8,X
  $97B1: 78        SEI
  $97B2: D8        CLD
  $97B3: B7 D8     LAX $d8,Y
  $97B5: 01 D9     ORA ($d9,X)
  $97B7: 33 D9     RLA ($d9),Y
  $97B9: EE D8 86  INC $86d8
  $97BC: D9 DF D9  CMP $d9df,Y
  $97BF: 11 DA     ORA ($da),Y
  $97C1: AE D9 5C  LDX $5cd9
  $97C4: DA        NOP
  $97C5: A2 DA     LDX #$da
  $97C7: B8        CLV
  $97C8: DA        NOP
  $97C9: 09 DB     ORA #$db
  $97CB: 67 DB     RRA $db
  $97CD: CC DB 1B  CPY $1bdb
  $97D0: DC 99 DB  NOP $db99,X
  $97D3: 45 DC     EOR $dc
  $97D5: B4 DC     LDY $dc,X
  $97D7: 17 DD     SLO $dd,X
  $97D9: 56 DD     LSR $dd,X
  $97DB: 79 DD A4  ADC $a4dd,Y
  $97DE: DD DA DD  CMP $ddda,X
  $97E1: 15 DE     ORA $de,X
  $97E3: 5D DE A0  EOR $a0de,X
  $97E6: DE BE DE  DEC $debe,X
  $97E9: 1C DF 2E  NOP $2edf,X
  $97EC: DF 44 DF  DCP $df44,X
  $97EF: 5B DF 73  SRE $73df,Y
  $97F2: DF A3 DF  DCP $dfa3,X
  $97F5: CB DF     AXS #$df
  $97F7: EA        NOP
  $97F8: DF 20 E0  DCP $e020,X
  $97FB: 6A        ROR A
  $97FC: E0 9B     CPX #$9b
  $97FE: E0 D6     CPX #$d6
  $9800: E0 35     CPX #$35
  $9802: E1 52     SBC ($52,X)
  $9804: E1 6E     SBC ($6e,X)
  $9806: E1 91     SBC ($91,X)
  $9808: E1 C7     SBC ($c7,X)
  $980A: E1 EF     SBC ($ef,X)
  $980C: E1 4B     SBC ($4b,X)
  $980E: E2 59     NOP #$59
  $9810: E2 89     NOP #$89
  $9812: E2 AE     NOP #$ae
  $9814: E2 D7     NOP #$d7
  $9816: E2 46     NOP #$46
  $9818: 02        ???
  $9819: 29 D8     AND #$d8
  $981B: 86 02     STX $02
  $981D: 3B D8 C4  RLA $c4d8,Y
  $9820: 02        ???
  $9821: 4C D8 07  JMP $07d8
  $9824: 03 64     SLO ($64,X)
  $9826: D8        CLD
  $9827: 00        BRK
  $9828: 03 11     SLO ($11,X)
  $982A: 3C 23 2E  NOP $2e23,X
  $982D: 0F 58 36  SLO $3658
  $9830: 3A        NOP
  $9831: 14 2D     NOP $2d,X
  $9833: 05 11     ORA $11
  $9835: 7A        NOP
  $9836: 41 59     EOR ($59,X)
  $9838: 36 36     ROL $36,X
  $983A: 3D 10 3C  AND $3c10,X
  $983D: 13 02     SLO ($02),Y
  $983F: 1D 02 22  ORA $2202,X
  $9842: 3A        NOP
  $9843: 25 07     AND $07
  $9845: 23 2E     RLA ($2e,X)
  $9847: 0F 58 36  SLO $3658
  $984A: 36 3D     ROL $3d,X
  $984C: 17 80     SLO $80,X
  $984E: 94 3C     STY $3c,X
  $9850: 09 18     ORA #$18
  $9852: 3A        NOP
  $9853: 52        ???
  $9854: 06 0D     ASL $0d
  $9856: 2D 2C 0F  AND $0f2c
  $9859: 0F 05 2E  SLO $2e05
  $985C: 0F 3A 0D  SLO $0d3a
  $985F: 2D 0B 0F  AND $0f0b
  $9862: 10 15     BPL $9879
  $9864: 13 00     SLO ($00),Y
  $9866: 11 01     ORA ($01),Y
  $9868: 0D 01 03  ORA $0301
  $986B: 2D 4F 3A  AND $3a4f
  $986E: 04 07     NOP $07
  $9870: 26 29     ROL $29
  $9872: 12        ???
  $9873: 01 1E     ORA ($1e,X)
  $9875: 0C 36 3D  NOP $3d36
  $9878: 42        ???
  $9879: 06 86     ASL $86
  $987B: D8        CLD
  $987C: 83 02     SAX ($02,X)
  $987E: A2 D8     LDX #$d8
  $9880: C2 02     NOP #$02
  $9882: AC D8 00  LDY $00d8
  $9885: 03 1B     SLO ($1b,X)
  $9887: 01 0B     ORA ($0b,X)
  $9889: 54 06     NOP $06,X
  $988B: 3C 11 63  NOP $6311,X
  $988E: 0A        ASL A
  $988F: 3A        NOP
  $9890: 7A        NOP
  $9891: 41 59     EOR ($59,X)
  $9893: 36 3A     ROL $3a,X
  $9895: 04 29     NOP $29
  $9897: 0F 10 19  SLO $1910
  $989A: 3A        NOP
  $989B: 05 2E     ORA $2e
  $989D: 0F 2D 59  SLO $592d
  $98A0: 36 3D     ROL $3d,X
  $98A2: 09 11     ORA #$11
  $98A4: 63 0A     RRA ($0a,X)
  $98A6: 3C 1F 2D  NOP $2d1f,X
  $98A9: 14 39     NOP $39,X
  $98AB: 3D 0A 1A  AND $1a0a,X
  $98AE: 30 02     BMI $98b2
  $98B0: 4F 3C 11  SRE $113c
  $98B3: 63 0A     RRA ($0a,X)
  $98B5: 36 3D     ROL $3d,X
  $98B7: 42        ???
  $98B8: 0A        ASL A
  $98B9: C5 D8     CMP $d8
  $98BB: C3 02     DCP ($02,X)
  $98BD: DE D8 02  DEC $02d8,X
  $98C0: 03 E5     SLO ($e5,X)
  $98C2: D8        CLD
  $98C3: 00        BRK
  $98C4: 02        ???
  $98C5: 18        CLC
  $98C6: 1A        NOP
  $98C7: 30 02     BMI $98cb
  $98C9: 4F 3C 11  SRE $113c
  $98CC: 63 0A     RRA ($0a,X)
  $98CE: 3A        NOP
  $98CF: 1E 08 0F  ASL $0f08,X
  $98D2: 57 3A     SRE $3a,X
  $98D4: 1F 53 13  SLO $1353,X
  $98D7: 15 05     ORA $05,X
  $98D9: 2D 68 01  AND $0168
  $98DC: 59 3D 06  EOR $063d,Y
  $98DF: 11 63     ORA ($63),Y
  $98E1: 0A        ASL A
  $98E2: 3C 39 3D  NOP $3d39,X
  $98E5: 08        PHP
  $98E6: 1A        NOP
  $98E7: 30 02     BMI $98eb
  $98E9: 4F 3C AD  SRE $ad3c
  $98EC: 37 3D     RLA $3d,X
  $98EE: C3 0E     DCP ($0e,X)
  $98F0: F4 D8     NOP $d8,X
  $98F2: 00        BRK
  $98F3: 03 0C     SLO ($0c,X)
  $98F5: 11 63     ORA ($63),Y
  $98F7: 0A        ASL A
  $98F8: 3C 1A 30  NOP $301a,X
  $98FB: 02        ???
  $98FC: 4F 07 2D  SRE $2d07
  $98FF: 39 3D C4  AND $c43d,Y
  $9902: 0E 0B D9  ASL $d90b
  $9905: 03 0B     SLO ($0b,X)
  $9907: 23 D9     RLA ($d9,X)
  $9909: 00        BRK
  $990A: 02        ???
  $990B: 17 11     SLO $11,X
  $990D: 63 0A     RRA ($0a,X)
  $990F: 3C 14 2D  NOP $2d14,X
  $9912: 12        ???
  $9913: 3A        NOP
  $9914: 05 00     ORA $00
  $9916: 01 0E     ORA ($0e,X)
  $9918: 02        ???
  $9919: 14 3A     NOP $3a,X
  $991B: 09 55     ORA #$55
  $991D: 2A        ROL A
  $991E: 02        ???
  $991F: 10 2F     BPL $9950
  $9921: 2D 3D 0F  AND $0f3d
  $9924: 1A        NOP
  $9925: 30 02     BMI $9929
  $9927: 4F 3C 1B  SRE $1b3c
  $992A: 54 08     NOP $08,X
  $992C: 2D 55 2F  AND $2f55
  $992F: 17 B2     SLO $b2,X
  $9931: 36 3D     ROL $3d,X
  $9933: C4 0E     CPY $0e
  $9935: 41 D9     EOR ($d9,X)
  $9937: 03 0B     SLO ($0b,X)
  $9939: 57 D9     SRE $d9,X
  $993B: 42        ???
  $993C: 03 6C     SLO ($6c,X)
  $993E: D9 00 02  CMP $0200,Y
  $9941: 15 11     ORA $11,X
  $9943: 63 0A     RRA ($0a,X)
  $9945: 3C 59 2E  NOP $2e59,X
  $9948: 12        ???
  $9949: 3A        NOP
  $994A: 0B 30     ANC #$30
  $994C: 23 07     RLA ($07,X)
  $994E: 19 3A 04  ORA $043a,Y
  $9951: 29 59     AND #$59
  $9953: 05 26     ORA $26
  $9955: 17 3D     SLO $3d,X
  $9957: 14 1A     NOP $1a,X
  $9959: 30 02     BMI $995d
  $995B: 4F 3C 03  SRE $033c
  $995E: 2E 37 3A  ROL $3a37
  $9961: 04 29     NOP $29
  $9963: 4F 0B 30  SRE $300b
  $9966: 23 07     RLA ($07,X)
  $9968: 59 2A 37  EOR $372a,Y
  $996B: 3D 19 2B  AND $2b19,X
  $996E: 05 0B     ORA $0b
  $9970: 1E 5B 3C  ASL $3c5b,X
  $9973: 1B 0F 27  SLO $270f,Y
  $9976: 13 22     SLO ($22),Y
  $9978: 36 3A     ROL $3a,X
  $997A: 0B 30     ANC #$30
  $997C: 23 07     RLA ($07,X)
  $997E: 19 04 29  ORA $2904,Y
  $9981: 5C 0C 25  NOP $250c,X
  $9984: 36 3D     ROL $3d,X
  $9986: 42        ???
  $9987: 0A        ASL A
  $9988: 94 D9     STY $d9,X
  $998A: C3 02     DCP ($02,X)
  $998C: DE D8 02  DEC $02d8,X
  $998F: 03 E5     SLO ($e5,X)
  $9991: D8        CLD
  $9992: 00        BRK
  $9993: 02        ???
  $9994: 19 1A 30  ORA $301a,Y
  $9997: 02        ???
  $9998: 4F 3C 11  SRE $113c
  $999B: 63 0A     RRA ($0a,X)
  $999D: 3A        NOP
  $999E: A4 95     LDY $95
  $99A0: 9B B5 48  TAS $48b5,Y
  $99A3: A0 2C     LDY #$2c
  $99A5: 3A        NOP
  $99A6: 09 02     ORA #$02
  $99A8: 05 2D     ORA $2d
  $99AA: 0B 25     ANC #$25
  $99AC: 02        ???
  $99AD: 3D 83 02  AND $0283,X
  $99B0: BC D9 C2  LDY $c2d9,X
  $99B3: 0A        ASL A
  $99B4: C4 D9     CPY $d9
  $99B6: 03 03     SLO ($03,X)
  $99B8: BC D9 00  LDY $00d9,X
  $99BB: 03 07     SLO ($07,X)
  $99BD: 11 63     ORA ($63),Y
  $99BF: 0A        ASL A
  $99C0: 3C 02 2D  NOP $2d02,X
  $99C3: 3D 1A 1A  AND $1a1a,X
  $99C6: 30 02     BMI $99ca
  $99C8: 4F 3C 04  SRE $043c
  $99CB: 29 0F     AND #$0f
  $99CD: 10 18     BPL $99e7
  $99CF: 0F 0F 05  SLO $050f
  $99D2: 01 22     ORA ($22,X)
  $99D4: 3A        NOP
  $99D5: 1A        NOP
  $99D6: 13 1E     SLO ($1e),Y
  $99D8: 56 04     LSR $04,X
  $99DA: 2B 27     ANC #$27
  $99DC: 59 14 3D  EOR $3d14,Y
  $99DF: C3 0E     DCP ($0e,X)
  $99E1: E9 D9     SBC #$d9
  $99E3: 02        ???
  $99E4: 0B F7     ANC #$f7
  $99E6: D9 00 02  CMP $0200,Y
  $99E9: 0D 11 63  ORA $6311
  $99EC: 0A        ASL A
  $99ED: 3C 53 2E  NOP $2e53,X
  $99F0: 11 00     ORA ($00),Y
  $99F2: 2D 5C 0C  AND $0c5c
  $99F5: 36 3D     ROL $3d,X
  $99F7: 19 1A 30  ORA $301a,Y
  $99FA: 02        ???
  $99FB: 4F 3C 11  SRE $113c
  $99FE: 2E 68 27  ROL $2768
  $9A01: 04 04     NOP $04
  $9A03: 56 22     LSR $22,X
  $9A05: 02        ???
  $9A06: 3A        NOP
  $9A07: 1F 2D 14  SLO $142d,X
  $9A0A: 3A        NOP
  $9A0B: 05 2E     ORA $2e
  $9A0D: 0F 17 37  SLO $3717
  $9A10: 3D C3 0E  AND $0ec3,X
  $9A13: 1F DA 02  SLO $02da,X
  $9A16: 0B 37     ANC #$37
  $9A18: DA        NOP
  $9A19: 48        PHA
  $9A1A: 03 4B     SLO ($4b,X)
  $9A1C: DA        NOP
  $9A1D: 00        BRK
  $9A1E: 02        ???
  $9A1F: 17 11     SLO $11,X
  $9A21: 63 0A     RRA ($0a,X)
  $9A23: 3C 0E 2D  NOP $2d0e,X
  $9A26: 14 3A     NOP $3a,X
  $9A28: 00        BRK
  $9A29: 0D 07 0A  ORA $0a07
  $9A2C: 01 18     ORA ($18,X)
  $9A2E: 3A        NOP
  $9A2F: 01 26     ORA ($26,X)
  $9A31: 14 01     NOP $01,X
  $9A33: 23 01     RLA ($01,X)
  $9A35: 36 3D     ROL $3d,X
  $9A37: 13 1A     SLO ($1a),Y
  $9A39: 30 02     BMI $9a3d
  $9A3B: 4F 3C AD  SRE $ad3c
  $9A3E: 9B 9B 3A  TAS $3a9b,Y
  $9A41: 0E 02 05  ASL $0502
  $9A44: 39 3A 09  AND $093a,Y
  $9A47: 18        CLC
  $9A48: 23 2A     RLA ($2a,X)
  $9A4A: 02        ???
  $9A4B: 0C E3 86  NOP $86e3
  $9A4E: 36 F0     ROL $f0,X
  $9A50: 18        CLC
  $9A51: 3A        NOP
  $9A52: E7 85     ISB $85
  $9A54: 36 F0     ROL $f0,X
  $9A56: 18        CLC
  $9A57: 3A        NOP
  $9A58: DD 8C 36  CMP $368c,X
  $9A5B: 3D 24 02  AND $0224,X
  $9A5E: 6A        ROR A
  $9A5F: DA        NOP
  $9A60: 67 02     RRA $02
  $9A62: 7D DA A7  ADC $a7da,X
  $9A65: 02        ???
  $9A66: 8E DA 00  STX $00da
  $9A69: 03 12     SLO ($12,X)
  $9A6B: 80 94     NOP #$94
  $9A6D: 3C 01 1E  NOP $1e01,X
  $9A70: 3A        NOP
  $9A71: 07 01     SLO $01
  $9A73: 14 06     NOP $06,X
  $9A75: 0F 0F 05  SLO $050f
  $9A78: 01 2C     ORA ($2c,X)
  $9A7A: 04 03     NOP $03
  $9A7C: 0F 10 27  SLO $2710
  $9A7F: 31 02     AND ($02),Y
  $9A81: 0D 2D 0B  ORA $0b2d
  $9A84: 30 4F     BMI $9ad5
  $9A86: 3A        NOP
  $9A87: 09 09     ORA #$09
  $9A89: 15 00     ORA $00,X
  $9A8B: 26 0F     ROL $0f
  $9A8D: 14 13     NOP $13,X
  $9A8F: 24 02     BIT $02
  $9A91: 55 31     EOR $31,X
  $9A93: 02        ???
  $9A94: 18        CLC
  $9A95: 06 56     ASL $56
  $9A97: 14 2C     NOP $2c,X
  $9A99: 3A        NOP
  $9A9A: 20 0C 64  JSR $640c
  $9A9D: 1E 0B 0F  ASL $0f0b,X
  $9AA0: 36 3D     ROL $3d,X
  $9AA2: 44 02     NOP $02
  $9AA4: A8        TAY
  $9AA5: DA        NOP
  $9AA6: 00        BRK
  $9AA7: 01 0F     ORA ($0f,X)
  $9AA9: 80 94     NOP #$94
  $9AAB: 3C 24 02  NOP $0224,X
  $9AAE: 0B 31     ANC #$31
  $9AB0: 02        ???
  $9AB1: 06 3A     ASL $3a
  $9AB3: 55 30     EOR $30,X
  $9AB5: 25 36     AND $36
  $9AB7: 3D 44 02  AND $0244,X
  $9ABA: CA        DEX
  $9ABB: DA        NOP
  $9ABC: 87 02     SAX $02
  $9ABE: DE DA C7  DEC $c7da,X
  $9AC1: 02        ???
  $9AC2: EB DA     SBC #$da
  $9AC4: 06 03     ASL $03
  $9AC6: FD DA 00  SBC $00da,X
  $9AC9: 03 13     SLO ($13,X)
  $9ACB: 80 94     NOP #$94
  $9ACD: 3C 0A 00  NOP $000a,X
  $9AD0: 01 1E     ORA ($1e,X)
  $9AD2: 3A        NOP
  $9AD3: 0B 2D     ANC #$2d
  $9AD5: 07 18     SLO $18
  $9AD7: 24 02     BIT $02
  $9AD9: 0B 31     ANC #$31
  $9ADB: 02        ???
  $9ADC: 06 4F     ASL $4f
  $9ADE: 0C 14 2D  NOP $2d14
  $9AE1: 05 11     ORA $11
  $9AE3: 10 30     BPL $9b15
  $9AE5: 02        ???
  $9AE6: 86 AF     STX $af
  $9AE8: EA        NOP
  $9AE9: 92        ???
  $9AEA: AD 11 11  LDA $1111
  $9AED: 63 0A     RRA ($0a,X)
  $9AEF: 07 2D     SLO $2d
  $9AF1: 18        CLC
  $9AF2: 12        ???
  $9AF3: 15 3A     ORA $3a,X
  $9AF5: 2B 0F     ANC #$0f
  $9AF7: 27 1E     RLA $1e
  $9AF9: 0B 0F     ANC #$0f
  $9AFB: 36 3D     ROL $3d,X
  $9AFD: 0B 3C     ANC #$3c
  $9AFF: 11 63     ORA ($63),Y
  $9B01: 0A        ASL A
  $9B02: 36 3A     ROL $3a,X
  $9B04: 11 63     ORA ($63),Y
  $9B06: 0A        ASL A
  $9B07: 36 3D     ROL $3d,X
  $9B09: 43 12     SRE ($12,X)
  $9B0B: 1B DB 83  SLO $83db,Y
  $9B0E: 02        ???
  $9B0F: 2D DB C3  AND $c3db
  $9B12: 12        ???
  $9B13: 43 DB     SRE ($db,X)
  $9B15: 07 13     SLO $13
  $9B17: 57 DB     SRE $db,X
  $9B19: 00        BRK
  $9B1A: 03 11     SLO ($11,X)
  $9B1C: 0A        ASL A
  $9B1D: 14 03     NOP $03,X
  $9B1F: 3C 11 63  NOP $6311,X
  $9B22: 0A        ASL A
  $9B23: 07 2D     SLO $2d
  $9B25: 3A        NOP
  $9B26: 04 11     NOP $11
  $9B28: 05 29     ORA $29
  $9B2A: 0A        ASL A
  $9B2B: 1E 3D 15  ASL $153d,X
  $9B2E: 11 63     ORA ($63),Y
  $9B30: 0A        ASL A
  $9B31: 3C 9E 97  NOP $979e,X
  $9B34: 48        PHA
  $9B35: D5 AF     CMP $af,X
  $9B37: 48        PHA
  $9B38: 3A        NOP
  $9B39: 01 1E     ORA ($1e,X)
  $9B3B: 1E 5C 00  ASL $005c,X
  $9B3E: 27 4F     RLA $4f
  $9B40: 13 02     SLO ($02),Y
  $9B42: 3D 13 0A  AND $0a13,X
  $9B45: 14 03     NOP $03,X
  $9B47: 3C 02 02  NOP $0202,X
  $9B4A: 2D 3A 5C  AND $5c3a
  $9B4D: 22        ???
  $9B4E: 09 29     ORA #$29
  $9B50: 5C 3A E5  NOP $e53a,X
  $9B53: A6 D5     LDX $d5
  $9B55: A8        TAY
  $9B56: 1C 0F 01  NOP $010f,X
  $9B59: 08        PHP
  $9B5A: 28        PLP
  $9B5B: 2D 59 22  AND $2259
  $9B5E: 18        CLC
  $9B5F: 17 3A     SLO $3a,X
  $9B61: 04 21     NOP $21
  $9B63: 5C 13 02  NOP $0213,X
  $9B66: 3D 43 02  AND $0243,X
  $9B69: 79 DB 83  ADC $83db,Y
  $9B6C: 12        ???
  $9B6D: 87 DB     SAX $db
  $9B6F: C3 02     DCP ($02,X)
  $9B71: DE D8 03  DEC $03d8,X
  $9B74: 03 91     SLO ($91,X)
  $9B76: DB 00 02  DCP $0200,Y
  $9B79: 0D 11 63  ORA $6311
  $9B7C: 0A        ASL A
  $9B7D: 3C 39 9E  NOP $9e39,X
  $9B80: 97 48     SAX $48,Y
  $9B82: D5 AF     CMP $af,X
  $9B84: 48        PHA
  $9B85: 36 3D     ROL $3d,X
  $9B87: 09 0A     ORA #$0a
  $9B89: 14 03     NOP $03,X
  $9B8B: 3C 14 00  NOP $0014,X
  $9B8E: 15 37     ORA $37,X
  $9B90: 3D 07 0A  AND $0a07,X
  $9B93: 14 03     NOP $03,X
  $9B95: 3C AD 37  NOP $37ad,X
  $9B98: 3D C3 02  AND $02c3,X
  $9B9B: A3 DB     LAX ($db,X)
  $9B9D: 03 13     SLO ($13,X)
  $9B9F: BA        TSX
  $9BA0: DB 00 03  DCP $0300,Y
  $9BA3: 16 11     ASL $11,X
  $9BA5: 63 0A     RRA ($0a,X)
  $9BA7: 3C 06 1F  NOP $1f06,X
  $9BAA: 18        CLC
  $9BAB: 09 13     ORA #$13
  $9BAD: 3A        NOP
  $9BAE: 01 11     ORA ($11,X)
  $9BB0: 1E 5C 22  ASL $225c,X
  $9BB3: 2B 0C     ANC #$0c
  $9BB5: 29 14     AND #$14
  $9BB7: 01 25     ORA ($25,X)
  $9BB9: 3D 0D 0A  AND $0a0d,X
  $9BBC: 14 03     NOP $03,X
  $9BBE: 3C 11 63  NOP $6311,X
  $9BC1: 0A        ASL A
  $9BC2: 07 2D     SLO $2d
  $9BC4: 39 F0 18  AND $18f0,Y
  $9BC7: EC F0 18  CPX $18f0
  $9BCA: AE 3D C3  LDX $c33d
  $9BCD: 02        ???
  $9BCE: D6 DB     DEC $db,X
  $9BD0: 03 13     SLO ($13,X)
  $9BD2: F2        ???
  $9BD3: DB 00 02  DCP $0200,Y
  $9BD6: 0D 11 63  ORA $6311
  $9BD9: 0A        ASL A
  $9BDA: 3C F0 18  NOP $18f0,X
  $9BDD: E8        INX
  $9BDE: F0 18     BEQ $9bf8
  $9BE0: 9B F0 18  TAS $18f0,Y
  $9BE3: E8        INX
  $9BE4: F0 18     BEQ $9bfe
  $9BE6: 9B F0 18  TAS $18f0,Y
  $9BE9: 0A        ASL A
  $9BEA: F0 18     BEQ $9c04
  $9BEC: 0D F0 18  ORA $18f0
  $9BEF: 12        ???
  $9BF0: 36 3D     ROL $3d,X
  $9BF2: 1A        NOP
  $9BF3: 0A        ASL A
  $9BF4: 14 03     NOP $03,X
  $9BF6: 3C F0 03  NOP $03f0,X
  $9BF9: 86 F0     STX $f0
  $9BFB: 03 A3     SLO ($a3,X)
  $9BFD: F0 03     BEQ $9c02
  $9BFF: AE F0 10  LDX $10f0
  $9C02: 3A        NOP
  $9C03: 14 15     NOP $15,X
  $9C05: 0C 28 18  NOP $1828
  $9C08: 3A        NOP
  $9C09: 11 63     ORA ($63),Y
  $9C0B: 0A        ASL A
  $9C0C: 07 2D     SLO $2d
  $9C0E: 36 3A     ROL $3a,X
  $9C10: F0 02     BEQ $9c14
  $9C12: E8        INX
  $9C13: F0 02     BEQ $9c17
  $9C15: 8B F0     XAA #$f0
  $9C17: 02        ???
  $9C18: AE 36 3D  LDX $3d36
  $9C1B: C3 02     DCP ($02,X)
  $9C1D: 25 DC     AND $dc
  $9C1F: 03 13     SLO ($13,X)
  $9C21: 3B DC 00  RLA $00dc,Y
  $9C24: 02        ???
  $9C25: 15 11     ORA $11,X
  $9C27: 63 0A     RRA ($0a,X)
  $9C29: 3C 86 AF  NOP $af86,X
  $9C2C: EA        NOP
  $9C2D: 11 63     ORA ($63),Y
  $9C2F: 89 9F     NOP #$9f
  $9C31: AE 87 8C  LDX $8c87
  $9C34: 3A        NOP
  $9C35: 05 2E     ORA $2e
  $9C37: 12        ???
  $9C38: 17 36     SLO $36,X
  $9C3A: 3D 09 0A  AND $0a09,X
  $9C3D: 14 03     NOP $03,X
  $9C3F: 3C 00 26  NOP $2600,X
  $9C42: 00        BRK
  $9C43: 26 3D     ROL $3d
  $9C45: 42        ???
  $9C46: 1A        NOP
  $9C47: 5B DC 87  SRE $87dc,Y
  $9C4A: 1A        NOP
  $9C4B: 76 DC     ROR $dc,X
  $9C4D: C3 16     DCP ($16,X)
  $9C4F: 82 DC     NOP #$dc
  $9C51: 02        ???
  $9C52: 1B 91 DC  SLO $dc91,Y
  $9C55: 47 1B     SRE $1b
  $9C57: A9 DC     LDA #$dc
  $9C59: 00        BRK
  $9C5A: 03 1A     SLO ($1a,X)
  $9C5C: 05 0F     ORA $0f
  $9C5E: 50 27     BVC $9c87
  $9C60: 3C 11 63  NOP $6311,X
  $9C63: 0A        ASL A
  $9C64: 3A        NOP
  $9C65: 04 1E     NOP $1e
  $9C67: 03 15     SLO ($15,X)
  $9C69: 3A        NOP
  $9C6A: 57 2D     SRE $2d,X
  $9C6C: 15 1D     ORA $1d,X
  $9C6E: 2D 7D A4  AND $a47d
  $9C71: 48        PHA
  $9C72: 8C 90 48  STY $4890
  $9C75: A0 0B     LDY #$0b
  $9C77: 0A        ASL A
  $9C78: 2D 05 2C  AND $2c05
  $9C7B: 25 02     AND $02
  $9C7D: 0D 01 0C  ORA $0c01
  $9C80: 28        PLP
  $9C81: 3D 0E 11  AND $110e,X
  $9C84: 63 0A     RRA ($0a,X)
  $9C86: 3C 1D 3A  NOP $3a1d,X
  $9C89: 1D 2D 13  ORA $132d,X
  $9C8C: 5C 0C 05  NOP $050c,X
  $9C8F: 36 3D     ROL $3d,X
  $9C91: 17 05     SLO $05,X
  $9C93: 0F 50 27  SLO $2750
  $9C96: 3C 0E 0B  NOP $0b0e,X
  $9C99: 12        ???
  $9C9A: 3A        NOP
  $9C9B: 1F 0A 06  SLO $060a,X
  $9C9E: 13 18     SLO ($18),Y
  $9CA0: D3 48     DCP ($48),Y
  $9CA2: A8        TAY
  $9CA3: DC AD 89  NOP $89ad,X
  $9CA6: AD E4 2C  LDA $2ce4
  $9CA9: 0A        ASL A
  $9CAA: 1B 2E 05  SLO $052e,Y
  $9CAD: 11 0A     ORA ($0a),Y
  $9CAF: 0D 28 2D  ORA $2d28
  $9CB2: 59 3D 43  EOR $433d,Y
  $9CB5: 16 C6     ASL $c6,X
  $9CB7: DC 82 1A  NOP $1a82,X
  $9CBA: D5 DC     CMP $dc,X
  $9CBC: C7 1A     DCP $1a
  $9CBE: F3 DC     ISB ($dc),Y
  $9CC0: 03 17     SLO ($17,X)
  $9CC2: 03 DD     SLO ($dd,X)
  $9CC4: 00        BRK
  $9CC5: 03 0E     SLO ($0e,X)
  $9CC7: 11 63     ORA ($63),Y
  $9CC9: 0A        ASL A
  $9CCA: 3C 03 2E  NOP $2e03,X
  $9CCD: 3A        NOP
  $9CCE: 1F 0A 06  SLO $060a,X
  $9CD1: 07 2D     SLO $2d
  $9CD3: 36 3D     ROL $3d,X
  $9CD5: 1D 05 0F  ORA $0f05,X
  $9CD8: 50 27     BVC $9d01
  $9CDA: 3C 0E 02  NOP $020e,X
  $9CDD: 3A        NOP
  $9CDE: 09 18     ORA #$18
  $9CE0: 0F 01 05  SLO $0501
  $9CE3: 01 3A     ORA ($3a,X)
  $9CE5: 1F 0A 06  SLO $060a,X
  $9CE8: 13 3A     SLO ($3a),Y
  $9CEA: 2B 05     ANC #$05
  $9CEC: 63 23     RRA ($23,X)
  $9CEE: 0B 2C     ANC #$2c
  $9CF0: 07 2B     SLO $2b
  $9CF2: 03 0F     SLO ($0f,X)
  $9CF4: 15 1D     ORA $1d,X
  $9CF6: 2D 19 3A  AND $3a19
  $9CF9: 0D 05 01  ORA $0105
  $9CFC: 15 13     ORA $13,X
  $9CFE: 64 59     NOP $59
  $9D00: 0C 36 3D  NOP $3d36
  $9D03: 13 11     SLO ($11),Y
  $9D05: 63 0A     RRA ($0a,X)
  $9D07: 3C 1F 0A  NOP $0a1f,X
  $9D0A: 06 07     ASL $07
  $9D0C: 2D 4F 3A  AND $3a4f
  $9D0F: 57 2D     SRE $2d,X
  $9D11: 15 1D     ORA $1d,X
  $9D13: 2D 15 39  AND $3915
  $9D16: 3D 46 02  AND $0246,X
  $9D19: 25 DD     AND $dd
  $9D1B: 86 02     STX $02
  $9D1D: 39 DD C6  AND $c6dd,Y
  $9D20: 02        ???
  $9D21: 4D DD 00  EOR $00dd
  $9D24: 03 13     SLO ($13,X)
  $9D26: 09 02     ORA #$02
  $9D28: 0B 12     ANC #$12
  $9D2A: 3A        NOP
  $9D2B: 08        PHP
  $9D2C: 2E 0B 31  ROL $310b
  $9D2F: 02        ???
  $9D30: 0D 2D 18  ORA $182d
  $9D33: 1E 07 19  ASL $1907,X
  $9D36: 13 55     SLO ($55),Y
  $9D38: 0F 13 0B  SLO $0b13
  $9D3B: 05 0B     ORA $0b
  $9D3D: 3A        NOP
  $9D3E: 05 29     ORA $29
  $9D40: 26 18     ROL $18
  $9D42: 3A        NOP
  $9D43: 1D 2D 13  ORA $132d,X
  $9D46: 02        ???
  $9D47: 18        CLC
  $9D48: 0F 64 59  SLO $5964
  $9D4B: 10 19     BPL $9d66
  $9D4D: 08        PHP
  $9D4E: 01 1E     ORA ($1e,X)
  $9D50: 3A        NOP
  $9D51: 19 55 1E  ORA $1e55,Y
  $9D54: 28        PLP
  $9D55: 39 46 02  AND $0246,Y
  $9D58: 29 D8     AND #$d8
  $9D5A: 86 02     STX $02
  $9D5C: 68        PLA
  $9D5D: DD C4 02  CMP $02c4,X
  $9D60: 4C D8 07  JMP $07d8
  $9D63: 03 64     SLO ($64,X)
  $9D65: D8        CLD
  $9D66: 00        BRK
  $9D67: 03 10     SLO ($10,X)
  $9D69: 3C 13 02  NOP $0213,X
  $9D6C: 1D 02 E3  ORA $e302,X
  $9D6F: AD D4 81  LDA $81d4
  $9D72: 3A        NOP
  $9D73: 7A        NOP
  $9D74: 3F 59 36  RLA $3659,X
  $9D77: 36 3D     ROL $3d,X
  $9D79: 42        ???
  $9D7A: 0A        ASL A
  $9D7B: 87 DD     SAX $dd
  $9D7D: C4 02     CPY $02
  $9D7F: DE D8 03  DEC $03d8,X
  $9D82: 03 E5     SLO ($e5,X)
  $9D84: D8        CLD
  $9D85: 00        BRK
  $9D86: 02        ???
  $9D87: 1C 1A 30  NOP $301a,X
  $9D8A: 02        ???
  $9D8B: 4F 3C 11  SRE $113c
  $9D8E: 63 0A     RRA ($0a,X)
  $9D90: 3A        NOP
  $9D91: 13 02     SLO ($02),Y
  $9D93: 13 02     SLO ($02),Y
  $9D95: 08        PHP
  $9D96: 2E 10 2F  ROL $2f10
  $9D99: 07 4F     SLO $4f
  $9D9B: 3A        NOP
  $9D9C: 11 05     ORA ($05),Y
  $9D9E: 14 05     NOP $05,X
  $9DA0: 2E 0F 14  ROL $140f
  $9DA3: 3D 44 02  AND $0244,X
  $9DA6: CA        DEX
  $9DA7: DA        NOP
  $9DA8: 87 02     SAX $02
  $9DAA: B6 DD     LDX $dd,Y
  $9DAC: C6 02     DEC $02
  $9DAE: FD DA 06  SBC $06da,X
  $9DB1: 03 CC     SLO ($cc,X)
  $9DB3: DD 00 03  CMP $0300,X
  $9DB6: 15 1B     ORA $1b,X
  $9DB8: 0F 27 18  SLO $1827
  $9DBB: 86 AF     STX $af
  $9DBD: EA        NOP
  $9DBE: 92        ???
  $9DBF: AD 18 12  LDA $1218
  $9DC2: 15 3A     ORA $3a,X
  $9DC4: 2B 0F     ANC #$0f
  $9DC6: 27 1E     RLA $1e
  $9DC8: 0B 0F     ANC #$0f
  $9DCA: 36 3D     ROL $3d,X
  $9DCC: 0D 3C 1A  ORA $1a3c
  $9DCF: 30 02     BMI $9dd3
  $9DD1: 4F 36 3A  SRE $3a36
  $9DD4: 1A        NOP
  $9DD5: 30 02     BMI $9dd9
  $9DD7: 4F 36 3D  SRE $3d36
  $9DDA: C3 0E     DCP ($0e,X)
  $9DDC: E4 DD     CPX $dd
  $9DDE: 02        ???
  $9DDF: 0B F8     ANC #$f8
  $9DE1: DD 00 02  CMP $0200,X
  $9DE4: 13 11     SLO ($11),Y
  $9DE6: 63 0A     RRA ($0a,X)
  $9DE8: 3C 82 AD  NOP $ad82,X
  $9DEB: 3A        NOP
  $9DEC: E5 A6     SBC $a6
  $9DEE: D5 A8     CMP $a8,X
  $9DF0: 5C 8A AE  NOP $ae8a,X
  $9DF3: 85 48     STA $48
  $9DF5: 0A        ASL A
  $9DF6: 36 3D     ROL $3d,X
  $9DF8: 1C 1A 30  NOP $301a,X
  $9DFB: 02        ???
  $9DFC: 4F 3C 5D  SRE $5d3c
  $9DFF: 3A        NOP
  $9E00: 5D 02 0B  EOR $0b02,X
  $9E03: 0F 2D 59  SLO $592d
  $9E06: 3A        NOP
  $9E07: 11 63     ORA ($63),Y
  $9E09: 0A        ASL A
  $9E0A: 36 3A     ROL $3a,X
  $9E0C: 04 04     NOP $04
  $9E0E: E7 88     ISB $88
  $9E10: 05 1E     ORA $1e
  $9E12: 0B 12     ANC #$12
  $9E14: 3D C3 0E  AND $0ec3,X
  $9E17: 23 DE     RLA ($de,X)
  $9E19: 02        ???
  $9E1A: 0B 32     ANC #$32
  $9E1C: DE 46 03  DEC $0346,X
  $9E1F: 4D DE 00  EOR $00de
  $9E22: 02        ???
  $9E23: 0E 11 63  ASL $6311
  $9E26: 0A        ASL A
  $9E27: 3C 9C 9C  NOP $9c9c,X
  $9E2A: AE 3A 54  LDX $543a
  $9E2D: 1E 1F 2A  ASL $2a1f,X
  $9E30: 36 3D     ROL $3d,X
  $9E32: 16 1A     ASL $1a,X
  $9E34: 30 02     BMI $9e38
  $9E36: 4F 3C D9  SRE $d93c
  $9E39: B4 48     LDY $48,X
  $9E3B: 36 3A     ROL $3a,X
  $9E3D: E3 86     ISB ($86,X)
  $9E3F: 36 F0     ROL $f0,X
  $9E41: 18        CLC
  $9E42: 3A        NOP
  $9E43: E7 85     ISB $85
  $9E45: 36 F0     ROL $f0,X
  $9E47: 18        CLC
  $9E48: 3A        NOP
  $9E49: DD 8C 36  CMP $368c,X
  $9E4C: 3D 0F 3C  AND $3c0f,X
  $9E4F: 0F 2D 06  SLO $062d
  $9E52: 14 3A     NOP $3a,X
  $9E54: 1A        NOP
  $9E55: 30 02     BMI $9e59
  $9E57: 4F 5C 00  SRE $005c
  $9E5A: 2E 0F 3D  ROL $3d0f
  $9E5D: 47 02     SRE $02
  $9E5F: 6B DE     ARR #$de
  $9E61: 87 02     SAX $02
  $9E63: 7C DE C4  NOP $c4de,X
  $9E66: 1E 8F DE  ASL $de8f,X
  $9E69: 00        BRK
  $9E6A: 03 10     SLO ($10,X)
  $9E6C: 3C 24 02  NOP $0224,X
  $9E6F: 0B 31     ANC #$31
  $9E71: 02        ???
  $9E72: 59 36 3A  EOR $3a36,Y
  $9E75: 0D 05 01  ORA $0105
  $9E78: 3F 59 36  RLA $3659,X
  $9E7B: 3D 12 3C  AND $3c12,X
  $9E7E: 04 29     NOP $29
  $9E80: 0F 10 18  SLO $1810
  $9E83: 24 21     BIT $21
  $9E85: 4F 3A 05  SRE $053a
  $9E88: 14 2E     NOP $2e,X
  $9E8A: 0F 2D 59  SLO $592d
  $9E8D: 36 3D     ROL $3d,X
  $9E8F: 10 11     BPL $9ea2
  $9E91: 63 0A     RRA ($0a,X)
  $9E93: 3C 1F 0A  NOP $0a1f,X
  $9E96: 06 07     ASL $07
  $9E98: 2D 3A 23  AND $233a
  $9E9B: 2E 0F 58  ROL $580f
  $9E9E: 36 3D     ROL $3d,X
  $9EA0: 47 02     SRE $02
  $9EA2: 6B DE     ARR #$de
  $9EA4: 87 02     SAX $02
  $9EA6: 7C DE C4  NOP $c4de,X
  $9EA9: 1E 8F DE  ASL $de8f,X
  $9EAC: 04 23     NOP $23
  $9EAE: B2        ???
  $9EAF: DE 00 03  DEC $0300,X
  $9EB2: 0B 1F     ANC #$1f
  $9EB4: 0A        ASL A
  $9EB5: 06 3C     ASL $3c
  $9EB7: 11 63     ORA ($63),Y
  $9EB9: 0A        ASL A
  $9EBA: 07 2D     SLO $2d
  $9EBC: 36 3D     ROL $3d,X
  $9EBE: 44 32     NOP $32
  $9EC0: D0 DE     BNE $9ea0
  $9EC2: 87 32     SAX $32
  $9EC4: E9 DE     SBC #$de
  $9EC6: C6 32     DEC $32
  $9EC8: 01 DF     ORA ($df,X)
  $9ECA: 06 33     ASL $33
  $9ECC: 11 DF     ORA ($df),Y
  $9ECE: 00        BRK
  $9ECF: 03 18     SLO ($18,X)
  $9ED1: 80 94     NOP #$94
  $9ED3: 3C 59 01  NOP $0159,X
  $9ED6: 3F 05 01  RLA $0105,X
  $9ED9: 0F 01 05  SLO $0501
  $9EDC: 01 19     ORA ($19,X)
  $9EDE: 3A        NOP
  $9EDF: 15 1D     ORA $1d,X
  $9EE1: 2D 4F 3A  AND $3a4f
  $9EE4: 06 31     ASL $31
  $9EE6: 02        ???
  $9EE7: 53 02     SRE ($02),Y
  $9EE9: 17 15     SLO $15,X
  $9EEB: 0B DD     ANC #$dd
  $9EED: 81 91     STA ($91,X)
  $9EEF: 2C 23 65  BIT $6523
  $9EF2: 27 3A     RLA $3a
  $9EF4: 0D 05 01  ORA $0105
  $9EF7: 2C 0D 01  BIT $010d
  $9EFA: 19 0B 1E  ORA $1e0b,Y
  $9EFD: 0B 0F     ANC #$0f
  $9EFF: 36 3D     ROL $3d,X
  $9F01: 0F 3C 1F  SLO $1f3c
  $9F04: 2D 14 3A  AND $3a14
  $9F07: 25 07     AND $07
  $9F09: 0F 0F 05  SLO $050f
  $9F0C: 2E 0F 58  ROL $580f
  $9F0F: 36 3D     ROL $3d,X
  $9F11: 0A        ASL A
  $9F12: 3C 94 81  NOP $8194,X
  $9F15: 8C D2 48  STY $48d2
  $9F18: A0 59     LDY #$59
  $9F1A: 36 3D     ROL $3d,X
  $9F1C: 44 02     NOP $02
  $9F1E: 22        ???
  $9F1F: DF 00 01  DCP $0100,X
  $9F22: 0B 0A     ANC #$0a
  $9F24: 14 03     NOP $03,X
  $9F26: 3C 11 63  NOP $6311,X
  $9F29: 0A        ASL A
  $9F2A: 07 2D     SLO $2d
  $9F2C: 36 3D     ROL $3d,X
  $9F2E: 84 02     STY $02
  $9F30: 34 DF     NOP $df,X
  $9F32: 00        BRK
  $9F33: 01 0F     ORA ($0f,X)
  $9F35: 23 25     RLA ($25,X)
  $9F37: 01 3C     ORA ($3c,X)
  $9F39: 04 21     NOP $21
  $9F3B: 5C 13 02  NOP $0213,X
  $9F3E: 3A        NOP
  $9F3F: D5 B0     CMP $b0,X
  $9F41: AD 36 3D  LDA $3d36
  $9F44: C5 02     CMP $02
  $9F46: 4A        LSR A
  $9F47: DF 00 02  DCP $0200,X
  $9F4A: 10 07     BPL $9f53
  $9F4C: 1F 3C 0A  SLO $0a3c,X
  $9F4F: 0C 4F 3A  NOP $3a4f
  $9F52: 11 63     ORA ($63),Y
  $9F54: 0A        ASL A
  $9F55: 0D 2D 68  ORA $682d
  $9F58: 01 36     ORA ($36,X)
  $9F5A: 3D 04 03  AND $0304,X
  $9F5D: 61 DF     ADC ($df,X)
  $9F5F: 00        BRK
  $9F60: 02        ???
  $9F61: 11 00     ORA ($00),Y
  $9F63: 5B 1F 3C  SRE $3c1f,Y
  $9F66: 1F 0A 06  SLO $060a,X
  $9F69: 07 2D     SLO $2d
  $9F6B: 3A        NOP
  $9F6C: 04 21     NOP $21
  $9F6E: 5C 13 02  NOP $0213,X
  $9F71: 36 3D     ROL $3d,X
  $9F73: 41 2A     EOR ($2a,X)
  $9F75: 7D DF 88  ADC $88df,X
  $9F78: 2A        ROL A
  $9F79: 94 DF     STY $df,X
  $9F7B: 00        BRK
  $9F7C: 01 16     ORA ($16,X)
  $9F7E: 8B B0     XAA #$b0
  $9F80: 94 81     STY $81,X
  $9F82: D9 48 3C  CMP $3c48,Y
  $9F85: 11 63     ORA ($63),Y
  $9F87: 0A        ASL A
  $9F88: 3A        NOP
  $9F89: 24 02     BIT $02
  $9F8B: 0B 31     ANC #$31
  $9F8D: 02        ???
  $9F8E: 3A        NOP
  $9F8F: 04 21     NOP $21
  $9F91: 5C 13 02  NOP $0213,X
  $9F94: 0E 06 1F  ASL $1f06
  $9F97: 0F 10 4F  SLO $4f10
  $9F9A: 3A        NOP
  $9F9B: 94 AD     STY $ad,X
  $9F9D: E3 48     ISB ($48,X)
  $9F9F: AB AD     ATX #$ad
  $9FA1: 59 3D 44  EOR $443d,Y
  $9FA4: 1E AD DF  ASL $dfad,X
  $9FA7: 88        DEY
  $9FA8: 1E B8 DF  ASL $dfb8,X
  $9FAB: 00        BRK
  $9FAC: 01 0A     ORA ($0a,X)
  $9FAE: 11 63     ORA ($63),Y
  $9FB0: 0A        ASL A
  $9FB1: 3C 8B B0  NOP $b08b,X
  $9FB4: 94 81     STY $81,X
  $9FB6: D9 48 12  CMP $1248,Y
  $9FB9: 11 50     ORA ($50),Y
  $9FBB: 19 3A AB  ORA $ab3a,Y
  $9FBE: 48        PHA
  $9FBF: A8        TAY
  $9FC0: DD 85 AE  CMP $ae85,X
  $9FC3: EA        NOP
  $9FC4: 5C 00 04  NOP $0400,X
  $9FC7: 02        ???
  $9FC8: 36 36     ROL $36,X
  $9FCA: 3D 44 02  AND $0244,X
  $9FCD: D1 DF     CMP ($df),Y
  $9FCF: 00        BRK
  $9FD0: 01 18     ORA ($18,X)
  $9FD2: 80 94     NOP #$94
  $9FD4: 3C 27 31  NOP $3127,X
  $9FD7: 02        ???
  $9FD8: 86 AF     STX $af
  $9FDA: EA        NOP
  $9FDB: 92        ???
  $9FDC: AD 4F 3A  LDA $3a4f
  $9FDF: CF AE 90  DCP $90ae
  $9FE2: A7 00     LAX $00
  $9FE4: 07 0B     SLO $0b
  $9FE6: 30 5C     BMI $a044
  $9FE8: 0C 3D 41  NOP $413d
  $9FEB: 2A        ROL A
  $9FEC: F4 DF     NOP $df,X
  $9FEE: 88        DEY
  $9FEF: 2A        ROL A
  $9FF0: 0E E0 00  ASL $00e0
  $9FF3: 01 19     ORA ($19,X)
  $9FF5: 8B B0     XAA #$b0
  $9FF7: 94 81     STY $81,X
  $9FF9: D9 48 3C  CMP $3c48,Y
  $9FFC: 9B AE 39  TAS $39ae,Y
  $9FFF: 57 2D     SRE $2d,X
  $A001: 15 1D     ORA $1d,X
  $A003: 2D 7D A4  AND $a47d
  $A006: 48        PHA
  $A007: 8C 3A 1A  STY $1a3a
  $A00A: 0A        ASL A
  $A00B: 64 0A     NOP $0a
  $A00D: 15 11     ORA $11,X
  $A00F: 84 A9     STY $a9
  $A011: 2C 3A 00  BIT $003a
  $A014: 11 07     ORA ($07),Y
  $A016: 0B 12     ANC #$12
  $A018: 07 29     SLO $29
  $A01A: 0F 90 48  SLO $4890
  $A01D: A0 59     LDY #$59
  $A01F: 3D 44 02  AND $0244,X
  $A022: 2E E0 85  ROL $85e0
  $A025: 02        ???
  $A026: 3B E0 C8  RLA $c8e0,Y
  $A029: 02        ???
  $A02A: 54 E0     NOP $e0,X
  $A02C: 00        BRK
  $A02D: 03 0C     SLO ($0c,X)
  $A02F: 11 63     ORA ($63),Y
  $A031: 0A        ASL A
  $A032: 3C 23 2E  NOP $2e23,X
  $A035: 0F 58 48  SLO $4858
  $A038: 36 36     ROL $36,X
  $A03A: 3D 18 80  AND $8018,X
  $A03D: 94 3C     STY $3c,X
  $A03F: 01 1E     ORA ($1e,X)
  $A041: 3A        NOP
  $A042: 57 2D     SRE $2d,X
  $A044: 15 1D     ORA $1d,X
  $A046: 2D 4F 3A  AND $3a4f
  $A049: D5 B0     CMP $b0,X
  $A04B: 95 80     STA $80,X
  $A04D: A4 48     LDY $48
  $A04F: 8C 87 A6  STY $a687
  $A052: 8C 18 15  STY $1518
  $A055: 8A        TXA
  $A056: AE 85 48  LDX $4885
  $A059: 0D 05 01  ORA $0105
  $A05C: 01 10     ORA ($10,X)
  $A05E: 15 3A     ORA $3a,X
  $A060: 05 4F     ORA $4f
  $A062: 23 01     RLA ($01,X)
  $A064: 0F 18 5C  SLO $5c18
  $A067: 0C 36 3D  NOP $3d36
  $A06A: 43 16     SRE ($16,X)
  $A06C: 74 E0     NOP $e0,X
  $A06E: 88        DEY
  $A06F: 16 89     ASL $89,X
  $A071: E0 00     CPX #$00
  $A073: 01 14     ORA ($14,X)
  $A075: 05 0F     ORA $0f
  $A077: 50 27     BVC $a0a0
  $A079: 3C 11 63  NOP $6311,X
  $A07C: 0A        ASL A
  $A07D: 3A        NOP
  $A07E: 06 31     ASL $31
  $A080: 02        ???
  $A081: 05 26     ORA $26
  $A083: 3A        NOP
  $A084: 00        BRK
  $A085: 0F 26 0B  SLO $0b26
  $A088: 01 11     ORA ($11,X)
  $A08A: 8A        TXA
  $A08B: AE 85 48  LDX $4885
  $A08E: 0B 2D     ANC #$2d
  $A090: 2B 4F     ANC #$4f
  $A092: 3A        NOP
  $A093: 02        ???
  $A094: 1E 29 28  ASL $2829,X
  $A097: 2D 59 39  AND $3959
  $A09A: 3D 42 02  AND $0242,X
  $A09D: A5 E0     LDA $e0
  $A09F: 85 02     STA $02
  $A0A1: C1 E0     CMP ($e0,X)
  $A0A3: 00        BRK
  $A0A4: 01 1B     ORA ($1b,X)
  $A0A6: 80 94     NOP #$94
  $A0A8: 3C 0E 29  NOP $290e,X
  $A0AB: 5C 19 09  NOP $0919,X
  $A0AE: 09 3A     ORA #$3a
  $A0B0: E8        INX
  $A0B1: A8        TAY
  $A0B2: 87 7F     SAX $7f
  $A0B4: DC 7F EA  NOP $ea7f,X
  $A0B7: A6 AD     LDX $ad
  $A0B9: 8C 8C 8F  STY $8f8c
  $A0BC: D5 80     CMP $80,X
  $A0BE: A0 25     LDY #$25
  $A0C0: 27 14     RLA $14
  $A0C2: 04 2B     NOP $2b
  $A0C4: 05 29     ORA $29
  $A0C6: 0B 1E     ANC #$1e
  $A0C8: 0C 3A 1F  NOP $1f3a
  $A0CB: 14 0A     NOP $0a,X
  $A0CD: 2D 3A 53  AND $533a
  $A0D0: 06 52     ASL $52
  $A0D2: 2D 25 02  AND $0225
  $A0D5: 3D 44 2E  AND $2e44,X
  $A0D8: EC E0 88  CPX $88e0
  $A0DB: 2E FF E0  ROL $e0ff
  $A0DE: C7 02     DCP $02
  $A0E0: 0C E1 07  NOP $07e1
  $A0E3: 03 12     SLO ($12,X)
  $A0E5: E1 44     SBC ($44,X)
  $A0E7: 03 24     SLO ($24,X)
  $A0E9: E1 00     SBC ($00,X)
  $A0EB: 03 12     SLO ($12,X)
  $A0ED: 1F 05 1F  SLO $1f05,X
  $A0F0: 3C 1F 2D  NOP $2d1f,X
  $A0F3: 14 3A     NOP $3a,X
  $A0F5: 53 07     SRE ($07),Y
  $A0F7: 2A        ROL A
  $A0F8: 02        ???
  $A0F9: 59 2E 0F  EOR $0f2e,Y
  $A0FC: 3A        NOP
  $A0FD: 0A        ASL A
  $A0FE: 00        BRK
  $A0FF: 0C 15 1D  NOP $1d15
  $A102: 2D 1C 05  AND $051c
  $A105: 03 28     SLO ($28,X)
  $A107: 0B 0F     ANC #$0f
  $A109: 07 59     SLO $59
  $A10B: 3D 05 3C  AND $3c05,X
  $A10E: 99 81 36  STA $3681,Y
  $A111: 3D 11 3C  AND $3c11,X
  $A114: AD 3A 04  LDA $043a
  $A117: 3A        NOP
  $A118: 04 01     NOP $01
  $A11A: 3A        NOP
  $A11B: 11 63     ORA ($63),Y
  $A11D: 0A        ASL A
  $A11E: 3A        NOP
  $A11F: 00        BRK
  $A120: 29 19     AND #$19
  $A122: 36 3D     ROL $3d,X
  $A124: 10 11     BPL $a137
  $A126: 63 0A     RRA ($0a,X)
  $A128: 3C 03 2E  NOP $2e03,X
  $A12B: 39 3A AA  AND $aa3a,Y
  $A12E: 3A        NOP
  $A12F: AA        TAX
  $A130: E6 A8     INC $a8
  $A132: 93 36     ??? ($36),Y
  $A134: 3D 43 26  AND $2643,X
  $A137: 3B E1 00  RLA $00e1,Y
  $A13A: 01 16     ORA ($16,X)
  $A13C: AA        TAX
  $A13D: E6 A8     INC $a8
  $A13F: 93 3C     ??? ($3c),Y
  $A141: 11 63     ORA ($63),Y
  $A143: 0A        ASL A
  $A144: 3A        NOP
  $A145: 25 07     AND $07
  $A147: 23 2E     RLA ($2e,X)
  $A149: 0F 14 3A  SLO $3a14
  $A14C: 04 21     NOP $21
  $A14E: 5C 13 02  NOP $0213,X
  $A151: 3D 44 1E  AND $1e44,X
  $A154: 58        CLI
  $A155: E1 00     SBC ($00,X)
  $A157: 01 15     ORA ($15,X)
  $A159: 11 63     ORA ($63),Y
  $A15B: 0A        ASL A
  $A15C: 3C AA E6  NOP $e6aa,X
  $A15F: A8        TAY
  $A160: 93 39     ??? ($39),Y
  $A162: 1D 2D 13  ORA $132d,X
  $A165: 15 AA     ORA $aa,X
  $A167: E6 A8     INC $a8
  $A169: 93 59     ??? ($59),Y
  $A16B: 17 36     SLO $36,X
  $A16D: 3D 42 26  AND $2642,X
  $A170: 74 E1     NOP $e1,X
  $A172: 00        BRK
  $A173: 01 1C     ORA ($1c,X)
  $A175: AA        TAX
  $A176: E6 A8     INC $a8
  $A178: 93 3C     ??? ($3c),Y
  $A17A: 11 63     ORA ($63),Y
  $A17C: 0A        ASL A
  $A17D: 3A        NOP
  $A17E: 84 A9     STY $a9
  $A180: 13 01     SLO ($01),Y
  $A182: 2E 0B 31  ROL $310b
  $A185: 15 3A     ORA $3a,X
  $A187: 0D 05 01  ORA $0105
  $A18A: 2C 21 54  BIT $5421
  $A18D: 0E 02 36  ASL $3602
  $A190: 3D 44 1E  AND $1e44,X
  $A193: 9B E1 88  TAS $88e1,Y
  $A196: 1E B4 E1  ASL $e1b4,X
  $A199: 00        BRK
  $A19A: 01 18     ORA ($18,X)
  $A19C: 11 63     ORA ($63),Y
  $A19E: 0A        ASL A
  $A19F: 3C AA E6  NOP $e6aa,X
  $A1A2: A8        TAY
  $A1A3: 93 39     ??? ($39),Y
  $A1A5: 1D 2D 13  ORA $132d,X
  $A1A8: 59 17 3A  EOR $3a17,Y
  $A1AB: 09 2D     ORA #$2d
  $A1AD: 5D 09 0E  EOR $0e09,X
  $A1B0: 1D 2D 13  ORA $132d,X
  $A1B3: 15 12     ORA $12,X
  $A1B5: E5 A6     SBC $a6
  $A1B7: D5 A8     CMP $a8,X
  $A1B9: 15 3A     ORA $3a,X
  $A1BB: 01 2E     ORA ($2e,X)
  $A1BD: 0B 31     ANC #$31
  $A1BF: 15 01     ORA $01,X
  $A1C1: 07 2D     SLO $2d
  $A1C3: 59 17 36  EOR $3617,Y
  $A1C6: 3D 43 26  AND $2643,X
  $A1C9: D1 E1     CMP ($e1),Y
  $A1CB: 84 02     STY $02
  $A1CD: DF E1 00  DCP $00e1,X
  $A1D0: 01 0D     ORA ($0d,X)
  $A1D2: AA        TAX
  $A1D3: E6 A8     INC $a8
  $A1D5: 93 3C     ??? ($3c),Y
  $A1D7: 07 28     SLO $28
  $A1D9: 05 3A     ORA $3a
  $A1DB: 11 63     ORA ($63),Y
  $A1DD: 0A        ASL A
  $A1DE: 3D 0F 11  AND $110f,X
  $A1E1: 63 0A     RRA ($0a,X)
  $A1E3: 3C 01 07  NOP $0701,X
  $A1E6: 25 3A     AND $3a
  $A1E8: AA        TAX
  $A1E9: E6 A8     INC $a8
  $A1EB: 93 36     ??? ($36),Y
  $A1ED: 36 3D     ROL $3d,X
  $A1EF: 47 02     SRE $02
  $A1F1: 1A        NOP
  $A1F2: E2 87     NOP #$87
  $A1F4: 02        ???
  $A1F5: 11 E2     ORA ($e2),Y
  $A1F7: C7 02     DCP $02
  $A1F9: 05 E2     ORA $e2
  $A1FB: 04 1F     NOP $1f
  $A1FD: 21 E2     AND ($e2,X)
  $A1FF: 48        PHA
  $A200: 1F 38 E2  SLO $e238,X
  $A203: 00        BRK
  $A204: 03 0B     SLO ($0b,X)
  $A206: 3C 11 63  NOP $6311,X
  $A209: 0A        ASL A
  $A20A: 3A        NOP
  $A20B: 23 2E     RLA ($2e,X)
  $A20D: 0F 14 36  SLO $3614
  $A210: 3D 08 3C  AND $3c08,X
  $A213: 11 63     ORA ($63),Y
  $A215: 0A        ASL A
  $A216: 07 2D     SLO $2d
  $A218: 36 3D     ROL $3d,X
  $A21A: 06 3C     ASL $3c
  $A21C: 11 63     ORA ($63),Y
  $A21E: 0A        ASL A
  $A21F: 36 3D     ROL $3d,X
  $A221: 16 11     ASL $11,X
  $A223: 63 0A     RRA ($0a,X)
  $A225: 3C 1F 2D  NOP $2d1f,X
  $A228: 14 00     NOP $00,X
  $A22A: 27 4F     RLA $4f
  $A22C: 13 02     SLO ($02),Y
  $A22E: 36 3A     ROL $3a,X
  $A230: 09 2D     ORA #$2d
  $A232: 5D 19 1F  EOR $1f19,X
  $A235: 2D 14 5C  AND $5c14
  $A238: 12        ???
  $A239: AB 48     ATX #$48
  $A23B: A8        TAY
  $A23C: DD 85 AE  CMP $ae85,X
  $A23F: EA        NOP
  $A240: 3A        NOP
  $A241: 24 02     BIT $02
  $A243: 0B 31     ANC #$31
  $A245: 02        ???
  $A246: 59 48 36  EOR $3648,Y
  $A249: 36 3D     ROL $3d,X
  $A24B: 47 02     SRE $02
  $A24D: 51 E2     EOR ($e2),Y
  $A24F: 00        BRK
  $A250: 01 07     ORA ($07,X)
  $A252: 3C 84 48  NOP $4884,X
  $A255: 82 36     NOP #$36
  $A257: 36 3D     ROL $3d,X
  $A259: 68        PLA
  $A25A: 01 67     ORA ($67,X)
  $A25C: E2 A9     NOP #$a9
  $A25E: 01 6C     ORA ($6c,X)
  $A260: E2 E9     NOP #$e9
  $A262: 01 7C     ORA ($7c,X)
  $A264: E2 00     NOP #$00
  $A266: 00        BRK
  $A267: 04 39     NOP $39
  $A269: 23 4F     RLA ($4f,X)
  $A26B: 12        ???
  $A26C: 0F 57 2D  SLO $2d57
  $A26F: 15 1D     ORA $1d,X
  $A271: 2D 7D A4  AND $a47d
  $A274: 48        PHA
  $A275: 8C 3A 4F  STY $4f3a
  $A278: 2E 0B 30  ROL $300b
  $A27B: 07 0C     SLO $0c
  $A27D: 0A        ASL A
  $A27E: 01 0B     ORA ($0b,X)
  $A280: 30 02     BMI $a284
  $A282: 64 3A     NOP $3a
  $A284: 13 02     SLO ($02),Y
  $A286: 55 11     EOR $11,X
  $A288: 39 07 36  AND $3607,Y
  $A28B: 93 E2     ??? ($e2),Y
  $A28D: 4B 36     ALR #$36
  $A28F: A4 E2     LDY $e2
  $A291: 00        BRK
  $A292: 00        BRK
  $A293: 10 11     BPL $a2a6
  $A295: 63 0A     RRA ($0a,X)
  $A297: 3C 01 07  NOP $0701,X
  $A29A: 58        CLI
  $A29B: 36 36     ROL $36,X
  $A29D: 3A        NOP
  $A29E: A5 48     LDA $48
  $A2A0: AA        TAX
  $A2A1: AE E8 1C  LDX $1ce8
  $A2A4: 09 14     ORA #$14
  $A2A6: 51 27     EOR ($27),Y
  $A2A8: 09 1F     ORA #$1f
  $A2AA: 59 36 36  EOR $3636,Y
  $A2AD: 3D 69 02  AND $0269,X
  $A2B0: B8        CLV
  $A2B1: E2 A9     NOP #$a9
  $A2B3: 02        ???
  $A2B4: C7 E2     DCP $e2
  $A2B6: 00        BRK
  $A2B7: 00        BRK
  $A2B8: 0E 11 63  ASL $6311
  $A2BB: 0A        ASL A
  $A2BC: 2C 3A 18  BIT $183a
  $A2BF: 0D 0F 3A  ORA $3a0f
  $A2C2: 1A        NOP
  $A2C3: 09 02     ORA #$02
  $A2C5: 06 19     ASL $19
  $A2C7: 0F 04 04  SLO $0404
  $A2CA: 58        CLI
  $A2CB: 26 3A     ROL $3a
  $A2CD: 0F 05 07  SLO $0705
  $A2D0: 3A        NOP
  $A2D1: 13 64     SLO ($64),Y
  $A2D3: 0F 2E 0F  SLO $0f2e
  $A2D6: 35 22     AND $22,X
  $A2D8: 02        ???
  $A2D9: E1 E2     SBC ($e2,X)
  $A2DB: 63 02     RRA ($02,X)
  $A2DD: FB E2 00  ISB $00e2,Y
  $A2E0: 00        BRK
  $A2E1: 18        CLC
  $A2E2: 3C 1A 30  NOP $301a,X
  $A2E5: 02        ???
  $A2E6: 4F 18 22  SRE $2218
  $A2E9: 13 15     SLO ($15),Y
  $A2EB: 3A        NOP
  $A2EC: E5 A6     SBC $a6
  $A2EE: AE 87 E7  LDX $e787
  $A2F1: 48        PHA
  $A2F2: A8        TAY
  $A2F3: 4F 04 07  SRE $0704
  $A2F6: 26 29     ROL $29
  $A2F8: 0F 36 3D  SLO $3d36
  $A2FB: 18        CLC
  $A2FC: 1A        NOP
  $A2FD: 30 02     BMI $a301
  $A2FF: 4F 19 3A  SRE $3a19
  $A302: 97 84     SAX $84,Y
  $A304: 8F 81 CF  SAX $cf81
  $A307: 48        PHA
  $A308: 8B B1     XAA #$b1
  $A30A: AE 93 2C  LDX $2c93
  $A30D: 1F 15 11  SLO $1115,X
  $A310: 08        PHP
  $A311: 0F 36 3D  SLO $3d36
  $A314: C8        INY
  $A315: 20 08 0A  JSR $0a08
  $A318: 00        BRK
  $A319: 03 02     SLO ($02,X)
  $A31B: 8A        TXA
  $A31C: 8B 00     XAA #$00
  $A31E: 03 02     SLO ($02,X)
  $A320: 02        ???
  $A321: 8E 8F FE  STX $fe8f
  $A324: 9A        TXS
  $A325: 9B 9E 02  TAS $029e,Y
  $A328: A0 A1     LDY #$a1
  $A32A: 00        BRK
  $A32B: 04 FE     NOP $fe
  $A32D: C8        INY
  $A32E: 02        ???
  $A32F: A2 00     LDX #$00
  $A331: 03 FE     SLO ($fe,X)
  $A333: 9F FE CA  ??? $cafe,Y
  $A336: 02        ???
  $A337: A8        TAY
  $A338: 00        BRK
  $A339: 04 FE     NOP $fe
  $A33B: A4 A5     LDY $a5
  $A33D: 02        ???
  $A33E: 02        ???
  $A33F: B0 FE     BCS $a33f
  $A341: FE A3 02  INC $02a3,X
  $A344: A7 02     LAX $02
  $A346: AA        TAX
  $A347: AB FF     ATX #$ff
  $A349: FE A9 B2  INC $b2a9,X
  $A34C: FF FF FC  ISB $fcff,X
  $A34F: FC 00 03  NOP $0300,X
  $A352: FD FE AD  SBC $adfe,X
  $A355: B8        CLV
  $A356: FC FC AC  NOP $acfc,X
  $A359: 00        BRK
  $A35A: 04 02     NOP $02
  $A35C: BA        TSX
  $A35D: FC FC AE  NOP $aefc,X
  $A360: 00        BRK
  $A361: 04 02     NOP $02
  $A363: AF 00 00  LAX $0000
  $A366: 00        BRK
  $A367: 00        BRK
  $A368: 00        BRK
  $A369: 00        BRK
  $A36A: 00        BRK
  $A36B: 00        BRK
  $A36C: 00        BRK
  $A36D: 00        BRK
  $A36E: F0 F0     BEQ $a360
  $A370: 00        BRK
  $A371: 00        BRK
  $A372: 00        BRK
  $A373: 00        BRK
  $A374: 00        BRK
  $A375: 00        BRK
  $A376: FF CF 00  ISB $00cf,X
  $A379: 00        BRK
  $A37A: 00        BRK
  $A37B: 00        BRK
  $A37C: 30 00     BMI $a37e
  $A37E: AA        TAX
  $A37F: AA        TAX
  $A380: 00        BRK
  $A381: 00        BRK
  $A382: 00        BRK
  $A383: 00        BRK
  $A384: FF 06 0D  ISB $0d06,X
  $A387: 16 24     ASL $24,X
  $A389: D0 20     BNE $a3ab
  $A38B: 08        PHP
  $A38C: 0A        ASL A
  $A38D: 00        BRK
  $A38E: 03 FF     SLO ($ff,X)
  $A390: B1 B4     LDA ($b4),Y
  $A392: 00        BRK
  $A393: 03 FF     SLO ($ff,X)
  $A395: FF FF CC  ISB $ccff,X
  $A398: B3 B6     LAX ($b6),Y
  $A39A: B7 FF     LAX $ff,Y
  $A39C: FF FF B9  ISB $b9ff,X
  $A39F: BC BD E8  LDY $e8bd,X
  $A3A2: FF C1 FF  ISB $ffc1,X
  $A3A5: FF BB C2  ISB $c2bb,X
  $A3A8: BE C2 FF  LDX $ffc2,Y
  $A3AB: C3 FF     DCP ($ff,X)
  $A3AD: FF E0 E1  ISB $e1e0,X
  $A3B0: FE 02 FE  INC $fe02,X
  $A3B3: C9 FF     CMP #$ff
  $A3B5: FF E2 E3  ISB $e3e2,X
  $A3B8: A3 FE     LAX ($fe,X)
  $A3BA: FF CB FF  ISB $ffcb,X
  $A3BD: FF FF E9  ISB $e9ff,X
  $A3C0: EC FE C2  CPX $c2fe
  $A3C3: EB EE     SBC #$ee
  $A3C5: FF BF EA  ISB $eabf,X
  $A3C8: FD FD FE  SBC $fefd,X
  $A3CB: FC FC E4  NOP $e4fc,X
  $A3CE: 00        BRK
  $A3CF: 05 02     ORA $02
  $A3D1: B5 FC     LDA $fc,X
  $A3D3: E6 00     INC $00
  $A3D5: 04 02     NOP $02
  $A3D7: CE FC FC  DEC $fcfc
  $A3DA: 00        BRK
  $A3DB: 00        BRK
  $A3DC: 00        BRK
  $A3DD: 00        BRK
  $A3DE: 00        BRK
  $A3DF: 00        BRK
  $A3E0: 00        BRK
  $A3E1: 00        BRK
  $A3E2: 00        BRK
  $A3E3: 00        BRK
  $A3E4: F0 F0     BEQ $a3d6
  $A3E6: 50 50     BVC $a438
  $A3E8: 00        BRK
  $A3E9: 00        BRK
  $A3EA: 00        BRK
  $A3EB: 00        BRK
  $A3EC: FF CF 11  ISB $11cf,X
  $A3EF: 44 00     NOP $00
  $A3F1: 00        BRK
  $A3F2: 30 00     BMI $a3f4
  $A3F4: AA        TAX
  $A3F5: AA        TAX
  $A3F6: AA        TAX
  $A3F7: A8        TAY
  $A3F8: 00        BRK
  $A3F9: 00        BRK
  $A3FA: FF 06 0D  ISB $0d06,X
  $A3FD: 17 26     SLO $26,X
  $A3FF: D6 20     DEC $20,X
  $A401: 06 0A     ASL $0a
  $A403: 00        BRK
  $A404: 06 FF     ASL $ff
  $A406: FF 71 D3  ISB $d371,X
  $A409: D4 72     NOP $72,X
  $A40B: FF 73 FF  ISB $ff73,X
  $A40E: 74 FF     NOP $ff,X
  $A410: 75 76     ADC $76,X
  $A412: 77 78     RRA $78,X
  $A414: 79 7A 7B  ADC $7b7a,Y
  $A417: 7C 7D 7E  NOP $7e7d,X
  $A41A: 7F 80 81  RRA $8180,X
  $A41D: 82 83     NOP #$83
  $A41F: 84 FE     STY $fe
  $A421: 86 87     STX $87
  $A423: 88        DEY
  $A424: FF 89 FE  ISB $fe89,X
  $A427: 8B 8C     XAA #$8c
  $A429: 8D FF 8E  STA $8eff
  $A42C: 8F 90 91  SAX $9190
  $A42F: 92        ???
  $A430: 93 94     ??? ($94),Y
  $A432: 95 96     STA $96,X
  $A434: 97 98     SAX $98,Y
  $A436: 9B 9C 9D  TAS $9d9c,Y
  $A439: 9E 9F A0  SHX $a09f,Y
  $A43C: 00        BRK
  $A43D: 00        BRK
  $A43E: 00        BRK
  $A43F: 00        BRK
  $A440: 00        BRK
  $A441: 00        BRK
  $A442: 00        BRK
  $A443: 00        BRK
  $A444: 00        BRK
  $A445: 00        BRK
  $A446: 00        BRK
  $A447: 00        BRK
  $A448: 00        BRK
  $A449: 80 A0     NOP #$a0
  $A44B: 00        BRK
  $A44C: 00        BRK
  $A44D: 00        BRK
  $A44E: 00        BRK
  $A44F: 00        BRK
  $A450: 00        BRK
  $A451: 84 69     STY $69
  $A453: 00        BRK
  $A454: 00        BRK
  $A455: 00        BRK
  $A456: 00        BRK
  $A457: 00        BRK
  $A458: 00        BRK
  $A459: 88        DEY
  $A45A: A9 00     LDA #$00
  $A45C: FF 04 1A  ISB $1a04,X
  $A45F: 18        CLC
  $A460: 00        BRK
  $A461: CA        DEX
  $A462: 20 06 0A  JSR $0a06
  $A465: 00        BRK
  $A466: 06 FF     ASL $ff
  $A468: FF 71 D3  ISB $d371,X
  $A46B: D4 72     NOP $72,X
  $A46D: FF 73 FF  ISB $ff73,X
  $A470: 74 FF     NOP $ff,X
  $A472: 75 76     ADC $76,X
  $A474: 77 78     RRA $78,X
  $A476: 79 7A 7B  ADC $7b7a,Y
  $A479: 7C 7D 7E  NOP $7e7d,X
  $A47C: 7F 80 81  RRA $8180,X
  $A47F: 82 83     NOP #$83
  $A481: 84 FE     STY $fe
  $A483: 86 87     STX $87
  $A485: 88        DEY
  $A486: FF 89 FE  ISB $fe89,X
  $A489: 8B 8C     XAA #$8c
  $A48B: 8D FF D5  STA $d5ff
  $A48E: 8F 90 D6  SAX $d690
  $A491: D7 D8     DCP $d8,X
  $A493: D9 DA DB  CMP $dbda,Y
  $A496: DC DD 00  NOP $00dd,X
  $A499: 06 02     ASL $02
  $A49B: 00        BRK
  $A49C: 00        BRK
  $A49D: 00        BRK
  $A49E: 00        BRK
  $A49F: 00        BRK
  $A4A0: 00        BRK
  $A4A1: 00        BRK
  $A4A2: 00        BRK
  $A4A3: 00        BRK
  $A4A4: 00        BRK
  $A4A5: 40        RTI
  $A4A6: 50 00     BVC $a4a8
  $A4A8: 00        BRK
  $A4A9: 00        BRK
  $A4AA: 00        BRK
  $A4AB: 00        BRK
  $A4AC: 00        BRK
  $A4AD: 48        PHA
  $A4AE: 96 00     STX $00,Y
  $A4B0: 00        BRK
  $A4B1: 00        BRK
  $A4B2: 00        BRK
  $A4B3: 30 00     BMI $a4b5
  $A4B5: 44 56     NOP $56
  $A4B7: 00        BRK
  $A4B8: 00        BRK
  $A4B9: 00        BRK
  $A4BA: 00        BRK
  $A4BB: FF 07 1A  ISB $1a07,X
  $A4BE: 19 00 D0  ORA $d000,Y
  $A4C1: 20 06 0A  JSR $0a06
  $A4C4: 00        BRK
  $A4C5: 06 FF     ASL $ff
  $A4C7: FF C0 C1  ISB $c1c0,X
  $A4CA: C2 C3     NOP #$c3
  $A4CC: FF C4 C5  ISB $c5c4,X
  $A4CF: 00        BRK
  $A4D0: 03 FE     SLO ($fe,X)
  $A4D2: C6 C7     DEC $c7
  $A4D4: FE C8 C9  INC $c9c8,X
  $A4D7: CA        DEX
  $A4D8: CB EA     AXS #$ea
  $A4DA: EB CE     SBC #$ce
  $A4DC: CF D0 D1  DCP $d1d0
  $A4DF: FE EC D4  INC $d4ec,X
  $A4E2: ED D6 D7  SBC $d7d6
  $A4E5: FE EE DA  INC $daee,X
  $A4E8: EF F0 F1  ISB $f1f0
  $A4EB: FE F2 F3  INC $f3f2,X
  $A4EE: F4 FE     NOP $fe,X
  $A4F0: F5 F6     SBC $f6,X
  $A4F2: F7 F8     ISB $f8,X
  $A4F4: F9 FA FB  SBC $fbfa,Y
  $A4F7: FF FF 95  ISB $95ff,X
  $A4FA: 97 FF     SAX $ff,Y
  $A4FC: FF 00 00  ISB $0000,X
  $A4FF: 00        BRK
  $A500: 00        BRK
  $A501: 00        BRK
  $A502: 00        BRK
  $A503: 00        BRK
  $A504: 00        BRK
  $A505: 00        BRK
  $A506: 00        BRK
  $A507: 00        BRK
  $A508: 00        BRK
  $A509: 50 10     BVC $a51b
  $A50B: 00        BRK
  $A50C: 00        BRK
  $A50D: 00        BRK
  $A50E: 00        BRK
  $A50F: 00        BRK
  $A510: 00        BRK
  $A511: 69 12     ADC #$12
  $A513: 00        BRK
  $A514: 00        BRK
  $A515: 30 00     BMI $a517
  $A517: 00        BRK
  $A518: 00        BRK
  $A519: 5A        NOP
  $A51A: 12        ???
  $A51B: 00        BRK
  $A51C: 00        BRK
  $A51D: FF 08 03  ISB $0308,X
  $A520: 1A        NOP
  $A521: 00        BRK
  $A522: C4 20     CPY $20
  $A524: 06 0A     ASL $0a
  $A526: 00        BRK
  $A527: 06 FF     ASL $ff
  $A529: FF C0 C1  ISB $c1c0,X
  $A52C: C2 C3     NOP #$c3
  $A52E: FF C4 C5  ISB $c5c4,X
  $A531: 00        BRK
  $A532: 03 FE     SLO ($fe,X)
  $A534: C6 C7     DEC $c7
  $A536: FE C8 C9  INC $c9c8,X
  $A539: CA        DEX
  $A53A: CB CC     AXS #$cc
  $A53C: CD CE CF  CMP $cfce
  $A53F: D0 D1     BNE $a512
  $A541: D2        ???
  $A542: D3 D4     DCP ($d4),Y
  $A544: D5 D6     CMP $d6,X
  $A546: D7 D8     DCP $d8,X
  $A548: D9 DA DB  CMP $dbda,Y
  $A54B: DC FF DD  NOP $ddff,X
  $A54E: FE DE DF  INC $dfde,X
  $A551: E0 FF     CPX #$ff
  $A553: E1 E2     SBC ($e2,X)
  $A555: E3 E4     ISB ($e4,X)
  $A557: E5 E6     SBC $e6
  $A559: FD E7 E8  SBC $e8e7,X
  $A55C: E8        INX
  $A55D: E9 FD     SBC #$fd
  $A55F: 00        BRK
  $A560: 00        BRK
  $A561: 00        BRK
  $A562: 00        BRK
  $A563: 00        BRK
  $A564: 00        BRK
  $A565: 00        BRK
  $A566: 00        BRK
  $A567: 00        BRK
  $A568: 50 10     BVC $a57a
  $A56A: 00        BRK
  $A56B: 00        BRK
  $A56C: 00        BRK
  $A56D: 00        BRK
  $A56E: 00        BRK
  $A56F: 00        BRK
  $A570: 59 12 00  EOR $0012,Y
  $A573: 00        BRK
  $A574: 00        BRK
  $A575: 00        BRK
  $A576: 00        BRK
  $A577: 30 59     BMI $a5d2
  $A579: 11 00     ORA ($00),Y
  $A57B: 00        BRK
  $A57C: 00        BRK
  $A57D: 00        BRK
  $A57E: 00        BRK
  $A57F: FF 09 03  ISB $0309,X
  $A582: 1B 00 C6  SLO $c600,Y
  $A585: 20 14 06  JSR $0614
  $A588: 00        BRK
  $A589: 08        PHP
  $A58A: FF 7A 7B  ISB $7b7a,X
  $A58D: 7E 7F 00  ROR $007f,X
  $A590: 08        PHP
  $A591: FF 00 07  ISB $0700,X
  $A594: FF C5 D0  ISB $d0c5,X
  $A597: D1 D4     CMP ($d4),Y
  $A599: D5 00     CMP $00,X
  $A59B: 08        PHP
  $A59C: FF 00 07  ISB $0700,X
  $A59F: FF C7 FE  ISB $fec7,X
  $A5A2: D3 FE     DCP ($fe),Y
  $A5A4: D7 00     DCP $00,X
  $A5A6: 08        PHP
  $A5A7: FF 00 08  ISB $0800,X
  $A5AA: FF D8 D9  ISB $d9d8,X
  $A5AD: DC DD 00  NOP $00dd,X
  $A5B0: 08        PHP
  $A5B1: FF 00 08  ISB $0800,X
  $A5B4: FF DA DB  ISB $dbda,X
  $A5B7: DE DF 00  DEC $00df,X
  $A5BA: 08        PHP
  $A5BB: FF 00 07  ISB $0700,X
  $A5BE: FF E5 F0  ISB $f0e5,X
  $A5C1: F1 F4     SBC ($f4),Y
  $A5C3: F5 D6     SBC $d6,X
  $A5C5: 00        BRK
  $A5C6: 07 FF     SLO $ff
  $A5C8: 00        BRK
  $A5C9: 00        BRK
  $A5CA: 00        BRK
  $A5CB: 00        BRK
  $A5CC: 00        BRK
  $A5CD: 00        BRK
  $A5CE: 00        BRK
  $A5CF: 00        BRK
  $A5D0: 00        BRK
  $A5D1: 80 A0     NOP #$a0
  $A5D3: A0 A0     LDY #$a0
  $A5D5: A0 20     LDY #$20
  $A5D7: 00        BRK
  $A5D8: 00        BRK
  $A5D9: 88        DEY
  $A5DA: AA        TAX
  $A5DB: AA        TAX
  $A5DC: AA        TAX
  $A5DD: AA        TAX
  $A5DE: 22        ???
  $A5DF: 00        BRK
  $A5E0: 30 00     BMI $a5e2
  $A5E2: 00        BRK
  $A5E3: 00        BRK
  $A5E4: 00        BRK
  $A5E5: 00        BRK
  $A5E6: 00        BRK
  $A5E7: 00        BRK
  $A5E8: FF 0B 07  ISB $070b,X
  $A5EB: 1C 27 C8  NOP $c827,X
  $A5EE: 20 08 08  JSR $0808
  $A5F1: 00        BRK
  $A5F2: 08        PHP
  $A5F3: FF 00 08  ISB $0800,X
  $A5F6: FF 00 08  ISB $0800,X
  $A5F9: FF 00 03  ISB $0300,X
  $A5FC: FF DE F6  ISB $f6de,X
  $A5FF: DF FF FF  DCP $ffff,X
  $A602: 00        BRK
  $A603: 03 FF     SLO ($ff,X)
  $A605: F4 F6     NOP $f6,X
  $A607: F5 FF     SBC $ff,X
  $A609: FF 00 03  ISB $0300,X
  $A60C: FF F6 F6  ISB $f6f6,X
  $A60F: F7 FF     ISB $ff,X
  $A611: FF 00 03  ISB $0300,X
  $A614: FF F6 FC  ISB $fcf6,X
  $A617: FD FF FF  SBC $ffff,X
  $A61A: 00        BRK
  $A61B: 03 FF     SLO ($ff,X)
  $A61D: F6 F6     INC $f6,X
  $A61F: 00        BRK
  $A620: 03 FF     SLO ($ff,X)
  $A622: 00        BRK
  $A623: 00        BRK
  $A624: 00        BRK
  $A625: 00        BRK
  $A626: 00        BRK
  $A627: 00        BRK
  $A628: 00        BRK
  $A629: 00        BRK
  $A62A: 00        BRK
  $A62B: 00        BRK
  $A62C: A0 A0     LDY #$a0
  $A62E: 00        BRK
  $A62F: 00        BRK
  $A630: 00        BRK
  $A631: 00        BRK
  $A632: 00        BRK
  $A633: 00        BRK
  $A634: AA        TAX
  $A635: AA        TAX
  $A636: 00        BRK
  $A637: 00        BRK
  $A638: 00        BRK
  $A639: 00        BRK
  $A63A: 30 00     BMI $a63c
  $A63C: 0A        ASL A
  $A63D: 0A        ASL A
  $A63E: 00        BRK
  $A63F: 00        BRK
  $A640: 00        BRK
  $A641: 00        BRK
  $A642: FF 0A 0B  ISB $0b0a,X
  $A645: 1D 29 4C  ORA $4c29,X
  $A648: 20 08 0E  JSR $0e08
  $A64B: 00        BRK
  $A64C: 08        PHP
  $A64D: FF 00 08  ISB $0800,X
  $A650: FF 00 08  ISB $0800,X
  $A653: FF 00 08  ISB $0800,X
  $A656: FF 00 08  ISB $0800,X
  $A659: FF 00 08  ISB $0800,X
  $A65C: 1A        NOP
  $A65D: 04 05     NOP $05
  $A65F: 08        PHP
  $A660: 09 0C     ORA #$0c
  $A662: 08        PHP
  $A663: 04 05     NOP $05
  $A665: 06 07     ASL $07
  $A667: 0A        ASL A
  $A668: 0B 0E     ANC #$0e
  $A66A: 0A        ASL A
  $A66B: 06 07     ASL $07
  $A66D: 08        PHP
  $A66E: 09 0C     ORA #$0c
  $A670: 08        PHP
  $A671: 04 05     NOP $05
  $A673: 08        PHP
  $A674: 09 0A     ORA #$0a
  $A676: 0B 0E     ANC #$0e
  $A678: 0A        ASL A
  $A679: 06 07     ASL $07
  $A67B: 0A        ASL A
  $A67C: 0B 00     ANC #$00
  $A67E: 08        PHP
  $A67F: FF FF 87  ISB $87ff,X
  $A682: FF 87 00  ISB $0087,X
  $A685: 03 FF     SLO ($ff,X)
  $A687: 87 00     SAX $00
  $A689: 05 FF     ORA $ff
  $A68B: 87 FF     SAX $ff
  $A68D: FF FF FF  ISB $ffff,X
  $A690: 87 00     SAX $00
  $A692: 04 FF     NOP $ff
  $A694: 87 55     SAX $55
  $A696: 55 55     EOR $55,X
  $A698: 55 55     EOR $55,X
  $A69A: 55 55     EOR $55,X
  $A69C: 55 55     EOR $55,X
  $A69E: 55 55     EOR $55,X
  $A6A0: 55 55     EOR $55,X
  $A6A2: 55 55     EOR $55,X
  $A6A4: 55 55     EOR $55,X
  $A6A6: 55 55     EOR $55,X
  $A6A8: 55 55     EOR $55,X
  $A6AA: 55 55     EOR $55,X
  $A6AC: 55 B5     EOR $b5,X
  $A6AE: A5 A5     LDA $a5
  $A6B0: AA        TAX
  $A6B1: AA        TAX
  $A6B2: A5 A5     LDA $a5
  $A6B4: A5 FF     LDA $ff
  $A6B6: 0D 0C 1E  ORA $1e0c
  $A6B9: 00        BRK
  $A6BA: 48        PHA
  $A6BB: 20 10 0E  JSR $0e10
  $A6BE: 00        BRK
  $A6BF: 05 FF     ORA $ff
  $A6C1: B7 00     LAX $00,Y
  $A6C3: 0A        ASL A
  $A6C4: FF 00 04  ISB $0400,X
  $A6C7: FF B8 B9  ISB $b9b8,X
  $A6CA: FF FF 20  ISB $20ff,X
  $A6CD: 21 24     AND ($24,X)
  $A6CF: 25 00     AND $00
  $A6D1: 04 FF     NOP $ff
  $A6D3: 00        BRK
  $A6D4: 04 FF     NOP $ff
  $A6D6: 03 87     SLO ($87,X)
  $A6D8: FF FF 22  ISB $22ff,X
  $A6DB: 23 26     RLA ($26,X)
  $A6DD: 27 00     RLA $00
  $A6DF: 04 FF     NOP $ff
  $A6E1: 24 25     BIT $25
  $A6E3: 00        BRK
  $A6E4: 0E FF 26  ASL $26ff
  $A6E7: 27 00     RLA $00
  $A6E9: 06 FF     ASL $ff
  $A6EB: BD 00 03  LDA $0300,X
  $A6EE: FF 28 29  ISB $2928,X
  $A6F1: 2C 20 00  BIT $0020
  $A6F4: 0C FF 22  NOP $22ff
  $A6F7: 26 23     ROL $23
  $A6F9: 2B B5     ANC #$b5
  $A6FB: BF 00 05  LAX $0500,Y
  $A6FE: FF 03 00  ISB $0003,X
  $A701: 07 FF     SLO $ff
  $A703: 22        ???
  $A704: B5 B5     LDA $b5,X
  $A706: A7 B2     LAX $b2
  $A708: 00        BRK
  $A709: 03 FF     SLO ($ff,X)
  $A70B: 03 03     SLO ($03,X)
  $A70D: 00        BRK
  $A70E: 07 FF     SLO $ff
  $A710: B5 B5     LDA $b5,X
  $A712: 03 03     SLO ($03,X)
  $A714: 00        BRK
  $A715: 06 FF     ASL $ff
  $A717: BC 00 05  LDY $0500,X
  $A71A: FF B5 B5  ISB $b5b5,X
  $A71D: B3 B6     LAX ($b6),Y
  $A71F: 00        BRK
  $A720: 05 FF     ORA $ff
  $A722: 22        ???
  $A723: BE 00 05  LDX $0500,Y
  $A726: FF 00 03  ISB $0300,X
  $A729: B5 00     LDA $00,X
  $A72B: 03 FF     SLO ($ff,X)
  $A72D: AD 03 03  LDA $0303
  $A730: BC 00 06  LDY $0600,X
  $A733: FF 9B 9E  ISB $9e9b,X
  $A736: B5 00     LDA $00,X
  $A738: 03 FF     SLO ($ff,X)
  $A73A: AF BA BB  LAX $bbba
  $A73D: BE 00 06  LDX $0600,Y
  $A740: FF FE B4  ISB $b4fe,X
  $A743: 9B B1 00  TAS $00b1,Y
  $A746: 0C FF 00  NOP $00ff
  $A749: 03 FE     SLO ($fe,X)
  $A74B: B4 B0     LDY $b0,X
  $A74D: B1 00     LDA ($00),Y
  $A74F: 0A        ASL A
  $A750: FF AA AA  ISB $aaaa,X
  $A753: AA        TAX
  $A754: AA        TAX
  $A755: AA        TAX
  $A756: AA        TAX
  $A757: AA        TAX
  $A758: AA        TAX
  $A759: AA        TAX
  $A75A: AA        TAX
  $A75B: AA        TAX
  $A75C: AA        TAX
  $A75D: AA        TAX
  $A75E: AA        TAX
  $A75F: AA        TAX
  $A760: AA        TAX
  $A761: AA        TAX
  $A762: AA        TAX
  $A763: 55 AA     EOR $aa,X
  $A765: AA        TAX
  $A766: AA        TAX
  $A767: AA        TAX
  $A768: AA        TAX
  $A769: BA        TSX
  $A76A: AA        TAX
  $A76B: 55 9A     EOR $9a,X
  $A76D: AA        TAX
  $A76E: AA        TAX
  $A76F: AA        TAX
  $A770: AA        TAX
  $A771: FF 0C 0C  ISB $0c0c,X
  $A774: 1F 00 0A  SLO $0a00,X
  $A777: 21 0C     AND ($0c,X)
  $A779: 06 00     ASL $00
  $A77B: 0C FD 00  NOP $00fd
  $A77E: 0C FD 00  NOP $00fd
  $A781: 0C FD 00  NOP $00fd
  $A784: 0C FD 00  NOP $00fd
  $A787: 0C FD 00  NOP $00fd
  $A78A: 0C FD FF  NOP $fffd
  $A78D: FF FF FF  ISB $ffff,X
  $A790: FF FF FF  ISB $ffff,X
  $A793: FF FF FF  ISB $ffff,X
  $A796: FF FF FF  ISB $ffff,X
  $A799: FF FF FF  ISB $ffff,X
  $A79C: FF FF FF  ISB $ffff,X
  $A79F: FF FF FF  ISB $ffff,X
  $A7A2: FF FF FF  ISB $ffff,X
  $A7A5: FF FF FF  ISB $ffff,X
  $A7A8: FF FF FF  ISB $ffff,X
  $A7AB: FF FF 07  ISB $07ff,X
  $A7AE: 0E 20 2B  ASL $2b20
  $A7B1: 40        RTI
  $A7B2: 20 20 0E  JSR $0e20
  $A7B5: 00        BRK
  $A7B6: 20 6D 00  JSR $006d
  $A7B9: 20 6D 00  JSR $006d
  $A7BC: 07 6D     SLO $6d
  $A7BE: 88        DEY
  $A7BF: 00        BRK
  $A7C0: 11 FF     ORA ($ff),Y
  $A7C2: 97 00     SAX $00,Y
  $A7C4: 06 6D     ASL $6d
  $A7C6: 00        BRK
  $A7C7: 07 6D     SLO $6d
  $A7C9: 8A        TXA
  $A7CA: 00        BRK
  $A7CB: 11 FF     ORA ($ff),Y
  $A7CD: BB 00 06  LAS $0600,Y
  $A7D0: 6D 00 07  ADC $0700
  $A7D3: 6D A0 89  ADC $89a0
  $A7D6: 8C 8D 00  STY $008d
  $A7D9: 0E FF BC  ASL $bcff
  $A7DC: 00        BRK
  $A7DD: 06 6D     ASL $6d
  $A7DF: 00        BRK
  $A7E0: 06 6D     ASL $6d
  $A7E2: 87 A2     SAX $a2
  $A7E4: 8B 8E     XAA #$8e
  $A7E6: 8F 9A 00  SAX $009a
  $A7E9: 08        PHP
  $A7EA: FF 9B 9E  ISB $9e9b,X
  $A7ED: 9F FF FF  ??? $ffff,Y
  $A7F0: BD 00 06  LDA $0600,X
  $A7F3: 6D 00 06  ADC $0600
  $A7F6: 6D 3A A8  ADC $a83a
  $A7F9: A1 A4     LDA ($a4,X)
  $A7FB: A5 B0     LDA $b0
  $A7FD: 00        BRK
  $A7FE: 07 FF     SLO $ff
  $A800: 91 B1     STA ($b1),Y
  $A802: B4 B5     LDY $b5,X
  $A804: B7 FF     LAX $ff,Y
  $A806: BE 00 06  LDX $0600,Y
  $A809: 6D 00 06  ADC $0600
  $A80C: 6D 3A AA  ADC $aa3a
  $A80F: A3 A6     LAX ($a6,X)
  $A811: FF B2 00  ISB $00b2,X
  $A814: 07 FF     SLO $ff
  $A816: 99 00 03  STA $0300,Y
  $A819: FF B8 FF  ISB $ffb8,X
  $A81C: BF 00 06  LAX $0600,Y
  $A81F: 6D 00 06  ADC $0600
  $A822: 6D 3A 3A  ADC $3a3a
  $A825: A9 AC     LDA #$ac
  $A827: AD 00 0C  LDA $0c00
  $A82A: FF BA B9  ISB $b9ba,X
  $A82D: C5 00     CMP $00
  $A82F: 06 6D     ASL $6d
  $A831: 00        BRK
  $A832: 06 6D     ASL $6d
  $A834: 3A        NOP
  $A835: 3A        NOP
  $A836: AB AE     ATX #$ae
  $A838: 00        BRK
  $A839: 03 FF     SLO ($ff,X)
  $A83B: 90 94     BCC $a7d1
  $A83D: 95 C0     STA $c0,X
  $A83F: FF C4 FF  ISB $ffc4,X
  $A842: FF B3 B6  ISB $b6b3,X
  $A845: 3A        NOP
  $A846: 3A        NOP
  $A847: CA        DEX
  $A848: 00        BRK
  $A849: 06 6D     ASL $6d
  $A84B: 00        BRK
  $A84C: 06 6D     ASL $6d
  $A84E: 00        BRK
  $A84F: 04 3A     NOP $3a
  $A851: A7 FF     LAX $ff
  $A853: 92        ???
  $A854: 93 96     ??? ($96),Y
  $A856: 96 C2     STX $c2,Y
  $A858: C3 C6     DCP ($c6,X)
  $A85A: C7 D2     DCP $d2
  $A85C: 00        BRK
  $A85D: 04 3A     NOP $3a
  $A85F: CB 00     AXS #$00
  $A861: 06 6D     ASL $6d
  $A863: 00        BRK
  $A864: 06 6D     ASL $6d
  $A866: 00        BRK
  $A867: 04 3A     NOP $3a
  $A869: AF FF 98  LAX $98ff
  $A86C: 3A        NOP
  $A86D: 9C 9D C8  SHY $c89d,X
  $A870: C9 CC     CMP #$cc
  $A872: CD D8 00  CMP $00d8
  $A875: 04 3A     NOP $3a
  $A877: CE 00 06  DEC $0600
  $A87A: 6D 00 20  ADC $2000
  $A87D: 6D 00 20  ADC $2000
  $A880: 6D 55 55  ADC $5555
  $A883: 55 55     EOR $55,X
  $A885: 55 55     EOR $55,X
  $A887: 55 55     EOR $55,X
  $A889: 55 99     EOR $99,X
  $A88B: AA        TAX
  $A88C: AA        TAX
  $A88D: AA        TAX
  $A88E: AA        TAX
  $A88F: 66 55     ROR $55
  $A891: 55 99     EOR $99,X
  $A893: AB AA     ATX #$aa
  $A895: AA        TAX
  $A896: AA        TAX
  $A897: 66 55     ROR $55
  $A899: 55 59     EOR $59,X
  $A89B: 5A        NOP
  $A89C: 5A        NOP
  $A89D: 5A        NOP
  $A89E: 5A        NOP
  $A89F: 56 55     LSR $55,X
  $A8A1: 6D 0E 10  ADC $100e
  $A8A4: 21 00     AND ($00,X)
  $A8A6: 40        RTI
  $A8A7: 20 20 1C  JSR $1c20
  $A8AA: 00        BRK
  $A8AB: 20 FF 00  JSR $00ff
  $A8AE: 20 FF 00  JSR $00ff
  $A8B1: 20 FF 00  JSR $00ff
  $A8B4: 20 FF 00  JSR $00ff
  $A8B7: 20 FF 00  JSR $00ff
  $A8BA: 20 FF FF  JSR $ffff
  $A8BD: 20 25 00  JSR $0025
  $A8C0: 17 FF     SLO $ff,X
  $A8C2: 20 25 00  JSR $0025
  $A8C5: 04 FF     NOP $ff
  $A8C7: FF 22 2B  ISB $2b22,X
  $A8CA: 2C 20 25  BIT $2520
  $A8CD: 00        BRK
  $A8CE: 13 FF     SLO ($ff),Y
  $A8D0: 20 2E 2B  JSR $2b2e
  $A8D3: 2C 20 25  BIT $2520
  $A8D6: FF FF 20  ISB $20ff,X
  $A8D9: 2B 2B     ANC #$2b
  $A8DB: 23 2E     RLA ($2e,X)
  $A8DD: 2C 00 12  BIT $1200
  $A8E0: FF 22 23  ISB $2322,X
  $A8E3: 00        BRK
  $A8E4: 03 2B     SLO ($2b,X)
  $A8E6: 2E 2C FF  ROL $ff2c
  $A8E9: 22        ???
  $A8EA: 23 00     RLA ($00,X)
  $A8EC: 04 2E     NOP $2e
  $A8EE: 2C 00 13  BIT $1300
  $A8F1: FF 22 23  ISB $2322,X
  $A8F4: 2E 2B 2B  ROL $2b2b
  $A8F7: 00        BRK
  $A8F8: 03 FF     SLO ($ff,X)
  $A8FA: 22        ???
  $A8FB: 26 23     ROL $23
  $A8FD: 26 23     ROL $23
  $A8FF: 26 25     ROL $25
  $A901: 00        BRK
  $A902: 13 FF     SLO ($ff),Y
  $A904: 22        ???
  $A905: 2E 2B 00  ROL $002b
  $A908: 1C FF 20  NOP $20ff,X
  $A90B: 29 2E     AND #$2e
  $A90D: 2E 00 1C  ROL $1c00
  $A910: FF 22 23  ISB $2322,X
  $A913: 23 2E     RLA ($2e,X)
  $A915: 00        BRK
  $A916: 1F FF 22  SLO $22ff,X
  $A919: 00        BRK
  $A91A: 20 FF 00  JSR $00ff
  $A91D: 20 FF 00  JSR $00ff
  $A920: 11 FF     ORA ($ff),Y
  $A922: 20 2B 24  JSR $242b
  $A925: 25 00     AND $00
  $A927: 0B FF     ANC #$ff
  $A929: 00        BRK
  $A92A: 11 FF     ORA ($ff),Y
  $A92C: 22        ???
  $A92D: 26 26     ROL $26
  $A92F: 27 00     RLA $00
  $A931: 0B FF     ANC #$ff
  $A933: 00        BRK
  $A934: 20 FF 2C  JSR $2cff
  $A937: 00        BRK
  $A938: 1F FF 2E  SLO $2eff,X
  $A93B: 2C 25 00  BIT $0025
  $A93E: 1D FF 2E  ORA $2eff,X
  $A941: 2E 23 24  ROL $2423
  $A944: 25 00     AND $00
  $A946: 1B FF 23  SLO $23ff,Y
  $A949: 2E 24 25  ROL $2524
  $A94C: 00        BRK
  $A94D: 1C FF 2E  NOP $2eff,X
  $A950: 2E 2B 2E  ROL $2e2b
  $A953: 24 25     BIT $25
  $A955: 00        BRK
  $A956: 1A        NOP
  $A957: FF 2E 23  ISB $232e,X
  $A95A: 2E 23 2E  ROL $2e23
  $A95D: 23 24     RLA ($24,X)
  $A95F: 29 2C     AND #$2c
  $A961: 00        BRK
  $A962: 17 FF     SLO $ff,X
  $A964: 2B 2E     ANC #$2e
  $A966: 23 26     RLA ($26,X)
  $A968: 00        BRK
  $A969: 05 23     ORA $23
  $A96B: 24 25     BIT $25
  $A96D: 00        BRK
  $A96E: 15 FF     ORA $ff,X
  $A970: 26 27     ROL $27
  $A972: 00        BRK
  $A973: 1E FF 00  ASL $00ff,X
  $A976: 20 FF 00  JSR $00ff
  $A979: 00        BRK
  $A97A: 00        BRK
  $A97B: 00        BRK
  $A97C: 00        BRK
  $A97D: 00        BRK
  $A97E: 00        BRK
  $A97F: 00        BRK
  $A980: 00        BRK
  $A981: 00        BRK
  $A982: 00        BRK
  $A983: 00        BRK
  $A984: 00        BRK
  $A985: 00        BRK
  $A986: 00        BRK
  $A987: 00        BRK
  $A988: 00        BRK
  $A989: 00        BRK
  $A98A: 00        BRK
  $A98B: 00        BRK
  $A98C: 00        BRK
  $A98D: 00        BRK
  $A98E: 00        BRK
  $A98F: 00        BRK
  $A990: 00        BRK
  $A991: 00        BRK
  $A992: 00        BRK
  $A993: 00        BRK
  $A994: 00        BRK
  $A995: 00        BRK
  $A996: 00        BRK
  $A997: 00        BRK
  $A998: FF 0F 0C  ISB $0c0f,X
  $A99B: 22        ???
  $A99C: 00        BRK
  $A99D: 0A        ASL A
  $A99E: 21 0C     AND ($0c,X)
  $A9A0: 06 00     ASL $00
  $A9A2: 0C FF 00  NOP $00ff
  $A9A5: 0C FF 00  NOP $00ff
  $A9A8: 0C FF 00  NOP $00ff
  $A9AB: 0C FF 00  NOP $00ff
  $A9AE: 0C FF 00  NOP $00ff
  $A9B1: 0C FF 00  NOP $00ff
  $A9B4: 00        BRK
  $A9B5: 00        BRK
  $A9B6: 00        BRK
  $A9B7: 00        BRK
  $A9B8: 00        BRK
  $A9B9: 00        BRK
  $A9BA: 00        BRK
  $A9BB: 00        BRK
  $A9BC: 00        BRK
  $A9BD: 00        BRK
  $A9BE: 00        BRK
  $A9BF: 00        BRK
  $A9C0: 00        BRK
  $A9C1: 00        BRK
  $A9C2: 00        BRK
  $A9C3: 00        BRK
  $A9C4: 00        BRK
  $A9C5: 00        BRK
  $A9C6: 00        BRK
  $A9C7: 00        BRK
  $A9C8: 00        BRK
  $A9C9: 00        BRK
  $A9CA: 00        BRK
  $A9CB: 00        BRK
  $A9CC: 00        BRK
  $A9CD: 00        BRK
  $A9CE: 00        BRK
  $A9CF: 00        BRK
  $A9D0: 00        BRK
  $A9D1: 00        BRK
  $A9D2: 00        BRK
  $A9D3: 00        BRK
  $A9D4: 10 00     BPL $a9d6
  $A9D6: 31 33     AND ($33),Y
  $A9D8: 0A        ASL A
  $A9D9: 21 0C     AND ($0c,X)
  $A9DB: 08        PHP
  $A9DC: 00        BRK
  $A9DD: 0C FF 00  NOP $00ff
  $A9E0: 0C FF 00  NOP $00ff
  $A9E3: 0C FF 00  NOP $00ff
  $A9E6: 0C FF 00  NOP $00ff
  $A9E9: 0C FF 00  NOP $00ff
  $A9EC: 0B FF     ANC #$ff
  $A9EE: 1D 20 21  ORA $2120,X
  $A9F1: 00        BRK
  $A9F2: 08        PHP
  $A9F3: FF 1C 1F  ISB $1f1c,X
  $A9F6: 20 23 00  JSR $0023
  $A9F9: 08        PHP
  $A9FA: FF 1E 1F  ISB $1f1e,X
  $A9FD: 00        BRK
  $A9FE: 00        BRK
  $A9FF: 00        BRK
  $AA00: 00        BRK
  $AA01: 00        BRK
  $AA02: 00        BRK
  $AA03: 00        BRK
  $AA04: 00        BRK
  $AA05: 00        BRK
  $AA06: 00        BRK
  $AA07: 00        BRK
  $AA08: 00        BRK
  $AA09: 00        BRK
  $AA0A: 00        BRK
  $AA0B: 00        BRK
  $AA0C: 00        BRK
  $AA0D: 00        BRK
  $AA0E: 00        BRK
  $AA0F: CC FF FF  CPY $ffff
  $AA12: 33 00     RLA ($00),Y
  $AA14: 00        BRK
  $AA15: 00        BRK
  $AA16: 00        BRK
  $AA17: CC FF FF  CPY $ffff
  $AA1A: 33 00     RLA ($00),Y
  $AA1C: 00        BRK
  $AA1D: 00        BRK
  $AA1E: 03 1F     SLO ($1f,X)
  $AA20: 34 00     NOP $00,X
  $AA22: CC 20 08  CPY $0820
  $AA25: 08        PHP
  $AA26: 00        BRK
  $AA27: 08        PHP
  $AA28: FD 00 08  SBC $0800,X
  $AA2B: FD 00 08  SBC $0800,X
  $AA2E: FD 00 08  SBC $0800,X
  $AA31: FD 00 08  SBC $0800,X
  $AA34: FD 00 08  SBC $0800,X
  $AA37: FD 00 08  SBC $0800,X
  $AA3A: FD 00 08  SBC $0800,X
  $AA3D: FD 00 00  SBC $0000,X
  $AA40: 00        BRK
  $AA41: 00        BRK
  $AA42: 00        BRK
  $AA43: 00        BRK
  $AA44: 00        BRK
  $AA45: 00        BRK
  $AA46: 00        BRK
  $AA47: 00        BRK
  $AA48: 00        BRK
  $AA49: 00        BRK
  $AA4A: 00        BRK
  $AA4B: 00        BRK
  $AA4C: 00        BRK
  $AA4D: 00        BRK
  $AA4E: 00        BRK
  $AA4F: 00        BRK
  $AA50: 00        BRK
  $AA51: 00        BRK
  $AA52: 00        BRK
  $AA53: 00        BRK
  $AA54: 00        BRK
  $AA55: 00        BRK
  $AA56: 00        BRK
  $AA57: 00        BRK
  $AA58: 00        BRK
  $AA59: 00        BRK
  $AA5A: 00        BRK
  $AA5B: 00        BRK
  $AA5C: 00        BRK
  $AA5D: 00        BRK
  $AA5E: FF 02 05  ISB $0502,X
  $AA61: 36 00     ROL $00,X
  $AA63: 0D 04 20  ORA $2004
  $AA66: 28        PLP
  $AA67: C4 00     CPY $00
  $AA69: 30 C5     BMI $aa30
  $AA6B: 00        BRK
  $AA6C: 38        SEC
  $AA6D: D0 01     BNE $aa70
  $AA6F: 48        PHA
  $AA70: D1 00     CMP ($00),Y
  $AA72: 04 28     NOP $28
  $AA74: 28        PLP
  $AA75: C6 00     DEC $00
  $AA77: 30 C7     BMI $aa40
  $AA79: 00        BRK
  $AA7A: 38        SEC
  $AA7B: D2        ???
  $AA7C: 01 40     ORA ($40,X)
  $AA7E: D3 00     DCP ($00),Y
  $AA80: 03 30     SLO ($30,X)
  $AA82: 30 CD     BMI $aa51
  $AA84: 00        BRK
  $AA85: 38        SEC
  $AA86: D8        CLD
  $AA87: 00        BRK
  $AA88: 48        PHA
  $AA89: A6 00     LDX $00
  $AA8B: 04 38     NOP $38
  $AA8D: 30 D9     BMI $aa68
  $AA8F: 00        BRK
  $AA90: 30 DC     BMI $aa6e
  $AA92: 03 38     SLO ($38,X)
  $AA94: DD 00 48  CMP $4800,X
  $AA97: D6 03     DEC $03,X
  $AA99: 04 40     NOP $40
  $AA9B: 30 CF     BMI $aa6c
  $AA9D: 03 38     SLO ($38,X)
  $AA9F: DA        NOP
  $AAA0: 03 40     SLO ($40,X)
  $AAA2: DB 03 48  DCP $4803,Y
  $AAA5: DE 03 00  DEC $0003,X
  $AAA8: 0D 08 20  ORA $2008
  $AAAB: 28        PLP
  $AAAC: C4 00     CPY $00
  $AAAE: 30 C5     BMI $aa75
  $AAB0: 00        BRK
  $AAB1: 38        SEC
  $AAB2: D0 01     BNE $aab5
  $AAB4: 48        PHA
  $AAB5: D1 00     CMP ($00),Y
  $AAB7: 70 E5     BVS $aa9e
  $AAB9: 00        BRK
  $AABA: 80 F0     NOP #$f0
  $AABC: 00        BRK
  $AABD: 88        DEY
  $AABE: F1 00     SBC ($00),Y
  $AAC0: 90 F4     BCC $aab6
  $AAC2: 00        BRK
  $AAC3: 08        PHP
  $AAC4: 28        PLP
  $AAC5: 28        PLP
  $AAC6: C6 00     DEC $00
  $AAC8: 30 C7     BMI $aa91
  $AACA: 00        BRK
  $AACB: 38        SEC
  $AACC: D2        ???
  $AACD: 01 40     ORA ($40,X)
  $AACF: D3 00     DCP ($00),Y
  $AAD1: 78        SEI
  $AAD2: E7 00     ISB $00
  $AAD4: 80 F2     NOP #$f2
  $AAD6: 00        BRK
  $AAD7: 88        DEY
  $AAD8: F3 00     ISB ($00),Y
  $AADA: 90 F6     BCC $aad2
  $AADC: 00        BRK
  $AADD: 05 30     ORA $30
  $AADF: 30 CD     BMI $aaae
  $AAE1: 00        BRK
  $AAE2: 38        SEC
  $AAE3: D8        CLD
  $AAE4: 00        BRK
  $AAE5: 48        PHA
  $AAE6: A6 00     LDX $00
  $AAE8: 80 D8     NOP #$d8
  $AAEA: 40        RTI
  $AAEB: 88        DEY
  $AAEC: DF 00 06  DCP $0600,X
  $AAEF: 38        SEC
  $AAF0: 30 D9     BMI $aacb
  $AAF2: 00        BRK
  $AAF3: 30 DC     BMI $aad1
  $AAF5: 03 38     SLO ($38,X)
  $AAF7: DD 00 48  CMP $4800,X
  $AAFA: D6 03     DEC $03,X
  $AAFC: 80 DD     NOP #$dd
  $AAFE: 40        RTI
  $AAFF: 88        DEY
  $AB00: F5 00     SBC $00,X
  $AB02: 08        PHP
  $AB03: 40        RTI
  $AB04: 30 CF     BMI $aad5
  $AB06: 03 38     SLO ($38,X)
  $AB08: DA        NOP
  $AB09: 03 40     SLO ($40,X)
  $AB0B: DB 03 48  DCP $4803,Y
  $AB0E: DE 03 78  DEC $7803,X
  $AB11: ED 03 80  SBC $8003
  $AB14: F8        SED
  $AB15: 03 88     SLO ($88,X)
  $AB17: F7 00     ISB $00,X
  $AB19: 88        DEY
  $AB1A: F9 03 00  SBC $0003,Y
  $AB1D: 1B 04 10  SLO $1004,Y
  $AB20: 98        TYA
  $AB21: 40        RTI
  $AB22: 00        BRK
  $AB23: A0 41     LDY #$41
  $AB25: 00        BRK
  $AB26: A8        TAY
  $AB27: 41 40     EOR ($40,X)
  $AB29: B0 42     BCS $ab6d
  $AB2B: 00        BRK
  $AB2C: 06 18     ASL $18
  $AB2E: 90 43     BCC $ab73
  $AB30: 00        BRK
  $AB31: 98        TYA
  $AB32: FF 00 A0  ISB $a000,X
  $AB35: 44 00     NOP $00
  $AB37: A8        TAY
  $AB38: FF 00 B0  ISB $b000,X
  $AB3B: 45 00     EOR $00
  $AB3D: B8        CLV
  $AB3E: 46 00     LSR $00
  $AB40: 06 20     ASL $20
  $AB42: 90 47     BCC $ab8b
  $AB44: 00        BRK
  $AB45: 98        TYA
  $AB46: 48        PHA
  $AB47: 00        BRK
  $AB48: A0 49     LDY #$49
  $AB4A: 00        BRK
  $AB4B: A8        TAY
  $AB4C: 4A        LSR A
  $AB4D: 00        BRK
  $AB4E: B0 4B     BCS $ab9b
  $AB50: 00        BRK
  $AB51: B8        CLV
  $AB52: 4C 00 04  JMP $0400
  $AB55: 28        PLP
  $AB56: 90 4D     BCC $aba5
  $AB58: 00        BRK
  $AB59: 98        TYA
  $AB5A: 4E 00 B0  LSR $b000
  $AB5D: 4F 00 B8  SRE $b800
  $AB60: 50 00     BVC $ab62
  $AB62: 05 30     ORA $30
  $AB64: 90 51     BCC $abb7
  $AB66: 00        BRK
  $AB67: 98        TYA
  $AB68: 52        ???
  $AB69: 00        BRK
  $AB6A: A0 63     LDY #$63
  $AB6C: 00        BRK
  $AB6D: B0 53     BCS $abc2
  $AB6F: 00        BRK
  $AB70: B8        CLV
  $AB71: 54 00     NOP $00,X
  $AB73: 04 38     NOP $38
  $AB75: 98        TYA
  $AB76: 55 00     EOR $00,X
  $AB78: A0 61     LDY #$61
  $AB7A: 00        BRK
  $AB7B: B0 56     BCS $abd3
  $AB7D: 00        BRK
  $AB7E: B8        CLV
  $AB7F: 57 00     SRE $00,X
  $AB81: 04 40     NOP $40
  $AB83: 98        TYA
  $AB84: 58        CLI
  $AB85: 00        BRK
  $AB86: A0 59     LDY #$59
  $AB88: 00        BRK
  $AB89: B0 5A     BCS $abe5
  $AB8B: 00        BRK
  $AB8C: B8        CLV
  $AB8D: 5B 00 00  SRE $0000,Y
  $AB90: 1B 04 10  SLO $1004,Y
  $AB93: 38        SEC
  $AB94: 40        RTI
  $AB95: 00        BRK
  $AB96: 40        RTI
  $AB97: 41 00     EOR ($00,X)
  $AB99: 48        PHA
  $AB9A: 41 40     EOR ($40,X)
  $AB9C: 50 42     BVC $abe0
  $AB9E: 00        BRK
  $AB9F: 06 18     ASL $18
  $ABA1: 30 43     BMI $abe6
  $ABA3: 00        BRK
  $ABA4: 38        SEC
  $ABA5: FF 00 40  ISB $4000,X
  $ABA8: 44 00     NOP $00
  $ABAA: 48        PHA
  $ABAB: FF 00 50  ISB $5000,X
  $ABAE: 45 00     EOR $00
  $ABB0: 58        CLI
  $ABB1: 46 00     LSR $00
  $ABB3: 06 20     ASL $20
  $ABB5: 30 47     BMI $abfe
  $ABB7: 00        BRK
  $ABB8: 38        SEC
  $ABB9: 48        PHA
  $ABBA: 00        BRK
  $ABBB: 40        RTI
  $ABBC: 49 00     EOR #$00
  $ABBE: 48        PHA
  $ABBF: 4A        LSR A
  $ABC0: 00        BRK
  $ABC1: 50 4B     BVC $ac0e
  $ABC3: 00        BRK
  $ABC4: 58        CLI
  $ABC5: 4C 00 04  JMP $0400
  $ABC8: 28        PLP
  $ABC9: 30 4D     BMI $ac18
  $ABCB: 00        BRK
  $ABCC: 38        SEC
  $ABCD: 4E 00 50  LSR $5000
  $ABD0: 4F 00 58  SRE $5800
  $ABD3: 50 00     BVC $abd5
  $ABD5: 05 30     ORA $30
  $ABD7: 30 51     BMI $ac2a
  $ABD9: 00        BRK
  $ABDA: 38        SEC
  $ABDB: 52        ???
  $ABDC: 00        BRK
  $ABDD: 40        RTI
  $ABDE: 63 00     RRA ($00,X)
  $ABE0: 50 53     BVC $ac35
  $ABE2: 00        BRK
  $ABE3: 58        CLI
  $ABE4: 54 00     NOP $00,X
  $ABE6: 04 38     NOP $38
  $ABE8: 38        SEC
  $ABE9: ED 00 40  SBC $4000
  $ABEC: 61 00     ADC ($00,X)
  $ABEE: 50 EE     BVC $abde
  $ABF0: 00        BRK
  $ABF1: 58        CLI
  $ABF2: EF 00 04  ISB $0400
  $ABF5: 40        RTI
  $ABF6: 38        SEC
  $ABF7: F0 00     BEQ $abf9
  $ABF9: 40        RTI
  $ABFA: F1 00     SBC ($00),Y
  $ABFC: 50 F2     BVC $abf0
  $ABFE: 00        BRK
  $ABFF: 58        CLI
  $AC00: F3 00     ISB ($00),Y
  $AC02: 02        ???
  $AC03: 48        PHA
  $AC04: 38        SEC
  $AC05: F4 00     NOP $00,X
  $AC07: 58        CLI
  $AC08: F5 00     SBC $00,X
  $AC0A: 00        BRK
  $AC0B: 15 04     ORA $04,X
  $AC0D: 10 68     BPL $ac77
  $AC0F: AA        TAX
  $AC10: 00        BRK
  $AC11: 70 AB     BVS $abbe
  $AC13: 00        BRK
  $AC14: 78        SEI
  $AC15: AB 40     ATX #$40
  $AC17: 80 AE     NOP #$ae
  $AC19: 00        BRK
  $AC1A: 06 18     ASL $18
  $AC1C: 60        RTS
  $AC1D: AF 00 68  LAX $6800
  $AC20: BA        TSX
  $AC21: 00        BRK
  $AC22: 70 FF     BVS $ac23
  $AC24: 00        BRK
  $AC25: 78        SEI
  $AC26: BB 00 80  LAS $8000,Y
  $AC29: FF 00 88  ISB $8800,X
  $AC2C: C9 00     CMP #$00
  $AC2E: 06 20     ASL $20
  $AC30: 60        RTS
  $AC31: CA        DEX
  $AC32: 00        BRK
  $AC33: 68        PLA
  $AC34: CB 00     AXS #$00
  $AC36: 70 B5     BVS $abed
  $AC38: 00        BRK
  $AC39: 78        SEI
  $AC3A: B6 00     LDX $00,Y
  $AC3C: 80 B7     NOP #$b7
  $AC3E: 00        BRK
  $AC3F: 88        DEY
  $AC40: E0 00     CPX #$00
  $AC42: 04 28     NOP $28
  $AC44: 60        RTS
  $AC45: E6 00     INC $00
  $AC47: 68        PLA
  $AC48: E7 00     ISB $00
  $AC4A: 80 E3     NOP #$e3
  $AC4C: 00        BRK
  $AC4D: 88        DEY
  $AC4E: BC 00 04  LDY $0400,X
  $AC51: 30 60     BMI $acb3
  $AC53: EC 00 68  CPX $6800
  $AC56: ED 00 80  SBC $8000
  $AC59: BF 00 88  LAX $8800,Y
  $AC5C: E8        INX
  $AC5D: 00        BRK
  $AC5E: 04 38     NOP $38
  $AC60: 60        RTS
  $AC61: FF 00 68  ISB $6800,X
  $AC64: EE 00 80  INC $8000
  $AC67: F2        ???
  $AC68: 00        BRK
  $AC69: 88        DEY
  $AC6A: F3 00     ISB ($00),Y
  $AC6C: 05 40     ORA $40
  $AC6E: 60        RTS
  $AC6F: F8        SED
  $AC70: 00        BRK
  $AC71: 68        PLA
  $AC72: F9 00 78  SBC $7800,Y
  $AC75: E6 00     INC $00
  $AC77: 80 FF     NOP #$ff
  $AC79: 00        BRK
  $AC7A: 88        DEY
  $AC7B: F7 00     ISB $00,X
  $AC7D: 03 48     SLO ($48,X)
  $AC7F: 60        RTS
  $AC80: EF 00 68  ISB $6800
  $AC83: FA        NOP
  $AC84: 00        BRK
  $AC85: 80 FC     NOP #$fc
  $AC87: 00        BRK
  $AC88: 00        BRK
  $AC89: 15 04     ORA $04,X
  $AC8B: 10 08     BPL $ac95
  $AC8D: AA        TAX
  $AC8E: 00        BRK
  $AC8F: 10 AB     BPL $ac3c
  $AC91: 00        BRK
  $AC92: 18        CLC
  $AC93: AB 40     ATX #$40
  $AC95: 20 AE 00  JSR $00ae
  $AC98: 06 18     ASL $18
  $AC9A: 00        BRK
  $AC9B: AF 00 08  LAX $0800
  $AC9E: BA        TSX
  $AC9F: 00        BRK
  $ACA0: 10 FF     BPL $aca1
  $ACA2: 00        BRK
  $ACA3: 18        CLC
  $ACA4: BB 00 20  LAS $2000,Y
  $ACA7: FF 00 28  ISB $2800,X
  $ACAA: C9 00     CMP #$00
  $ACAC: 06 20     ASL $20
  $ACAE: 00        BRK
  $ACAF: CA        DEX
  $ACB0: 00        BRK
  $ACB1: 08        PHP
  $ACB2: CB 00     AXS #$00
  $ACB4: 10 B5     BPL $ac6b
  $ACB6: 00        BRK
  $ACB7: 18        CLC
  $ACB8: B6 00     LDX $00,Y
  $ACBA: 20 B7 00  JSR $00b7
  $ACBD: 28        PLP
  $ACBE: E0 00     CPX #$00
  $ACC0: 04 28     NOP $28
  $ACC2: 00        BRK
  $ACC3: E1 00     SBC ($00,X)
  $ACC5: 08        PHP
  $ACC6: E2 00     NOP #$00
  $ACC8: 20 E3 00  JSR $00e3
  $ACCB: 28        PLP
  $ACCC: BC 00 04  LDY $0400,X
  $ACCF: 30 00     BMI $acd1
  $ACD1: BD 00 08  LDA $0800,X
  $ACD4: BE 00 20  LDX $2000,Y
  $ACD7: BF 00 28  LAX $2800,Y
  $ACDA: E8        INX
  $ACDB: 00        BRK
  $ACDC: 03 38     SLO ($38,X)
  $ACDE: 00        BRK
  $ACDF: E9 00     SBC #$00
  $ACE1: 08        PHP
  $ACE2: EA        NOP
  $ACE3: 00        BRK
  $ACE4: 20 EB 00  JSR $00eb
  $ACE7: 04 40     NOP $40
  $ACE9: 00        BRK
  $ACEA: C4 00     CPY $00
  $ACEC: 08        PHP
  $ACED: C5 00     CMP $00
  $ACEF: 18        CLC
  $ACF0: 7D 00 20  ADC $2000,X
  $ACF3: 7F 00 00  RRA $0000,X
  $ACF6: 11 01     ORA ($01),Y
  $ACF8: 10 60     BPL $ad5a
  $ACFA: B0 02     BCS $acfe
  $ACFC: 03 18     SLO ($18,X)
  $ACFE: 50 AD     BVC $acad
  $AD00: 00        BRK
  $AD01: 60        RTS
  $AD02: B2        ???
  $AD03: 02        ???
  $AD04: 68        PLA
  $AD05: BB 02 02  LAS $0202,Y
  $AD08: 20 60 B8  JSR $b860
  $AD0B: 02        ???
  $AD0C: 60        RTS
  $AD0D: B4 02     LDY $02,X
  $AD0F: 01 28     ORA ($28,X)
  $AD11: 60        RTS
  $AD12: BA        TSX
  $AD13: 02        ???
  $AD14: 03 30     SLO ($30,X)
  $AD16: 50 AF     BVC $acc7
  $AD18: 02        ???
  $AD19: 60        RTS
  $AD1A: B1 02     LDA ($02),Y
  $AD1C: 68        PLA
  $AD1D: B5 02     LDA $02,X
  $AD1F: 00        BRK
  $AD20: 13 05     SLO ($05),Y
  $AD22: 08        PHP
  $AD23: 30 C9     BMI $acee
  $AD25: 02        ???
  $AD26: 38        SEC
  $AD27: CC 02 40  CPY $4002
  $AD2A: CD 02 48  CMP $4802
  $AD2D: D8        CLD
  $AD2E: 02        ???
  $AD2F: 50 D9     BVC $ad0a
  $AD31: 02        ???
  $AD32: 06 10     ASL $10
  $AD34: 28        PLP
  $AD35: F3 02     ISB ($02),Y
  $AD37: 30 F6     BMI $ad2f
  $AD39: 02        ???
  $AD3A: 38        SEC
  $AD3B: FD 02 40  SBC $4002,X
  $AD3E: FD 02 48  SBC $4802,X
  $AD41: D6 02     DEC $02,X
  $AD43: 50 D7     BVC $ad1c
  $AD45: 02        ???
  $AD46: 07 18     SLO $18
  $AD48: 20 C8 02  JSR $02c8
  $AD4B: 28        PLP
  $AD4C: F9 02 30  SBC $3002,Y
  $AD4F: FC 02 38  NOP $3802,X
  $AD52: CF 02 40  DCP $4002
  $AD55: DA        NOP
  $AD56: 02        ???
  $AD57: 48        PHA
  $AD58: DC 02 50  NOP $5002,X
  $AD5B: DD 02 07  CMP $0702,X
  $AD5E: 20 20 CA  JSR $ca20
  $AD61: 02        ???
  $AD62: 28        PLP
  $AD63: CB 02     AXS #$02
  $AD65: 30 CE     BMI $ad35
  $AD67: 02        ???
  $AD68: 38        SEC
  $AD69: E5 02     SBC $02
  $AD6B: 40        RTI
  $AD6C: F0 02     BEQ $ad70
  $AD6E: 48        PHA
  $AD6F: DE 02 50  DEC $5002,X
  $AD72: DF 02 06  DCP $0602,X
  $AD75: 28        PLP
  $AD76: 20 E0 02  JSR $02e0
  $AD79: 28        PLP
  $AD7A: E1 02     SBC ($02,X)
  $AD7C: 30 E4     BMI $ad62
  $AD7E: 02        ???
  $AD7F: 38        SEC
  $AD80: E7 02     ISB $02
  $AD82: 40        RTI
  $AD83: F2        ???
  $AD84: 02        ???
  $AD85: 50 F5     BVC $ad7c
  $AD87: 02        ???
  $AD88: 03 30     SLO ($30,X)
  $AD8A: 28        PLP
  $AD8B: E3 02     ISB ($02,X)
  $AD8D: 30 E6     BMI $ad75
  $AD8F: 02        ???
  $AD90: 38        SEC
  $AD91: ED 02 07  SBC $0702
  $AD94: 38        SEC
  $AD95: 20 E8 03  JSR $03e8
  $AD98: 28        PLP
  $AD99: E9 03     SBC #$03
  $AD9B: 30 EC     BMI $ad89
  $AD9D: 03 30     SLO ($30,X)
  $AD9F: E2 02     NOP #$02
  $ADA1: 38        SEC
  $ADA2: DB 02 48  DCP $4802,Y
  $ADA5: EA        NOP
  $ADA6: 03 50     SLO ($50,X)
  $ADA8: EB 03     SBC #$03
  $ADAA: 08        PHP
  $ADAB: 40        RTI
  $ADAC: 20 F7 03  JSR $03f7
  $ADAF: 28        PLP
  $ADB0: F7 03     ISB $03,X
  $ADB2: 30 EE     BMI $ada2
  $ADB4: 03 38     SLO ($38,X)
  $ADB6: EF 03 40  ISB $4003
  $ADB9: FA        NOP
  $ADBA: 03 48     SLO ($48,X)
  $ADBC: FB 03 50  ISB $5003,Y
  $ADBF: FD 03 58  SBC $5803,X
  $ADC2: F4 03     NOP $03,X
  $ADC4: 00        BRK
  $ADC5: 1A        NOP
  $ADC6: 01 18     ORA ($18,X)
  $ADC8: 40        RTI
  $ADC9: E0 01     CPX #$01
  $ADCB: 08        PHP
  $ADCC: 20 40 03  JSR $0340
  $ADCF: 01 48     ORA ($48,X)
  $ADD1: E2 01     NOP #$01
  $ADD3: 50 E3     BVC $adb8
  $ADD5: 01 58     ORA ($58,X)
  $ADD7: E4 01     CPX $01
  $ADD9: 60        RTS
  $ADDA: E5 01     SBC $01
  $ADDC: 68        PLA
  $ADDD: E6 01     INC $01
  $ADDF: 70 E7     BVS $adc8
  $ADE1: 01 78     ORA ($78,X)
  $ADE3: E8        INX
  $ADE4: 01 08     ORA ($08,X)
  $ADE6: 28        PLP
  $ADE7: 40        RTI
  $ADE8: E9 01     SBC #$01
  $ADEA: 48        PHA
  $ADEB: E9 01     SBC #$01
  $ADED: 50 EA     BVC $add9
  $ADEF: 01 58     ORA ($58,X)
  $ADF1: EB 01     SBC #$01
  $ADF3: 60        RTS
  $ADF4: EC 01 68  CPX $6801
  $ADF7: ED 01 70  SBC $7001
  $ADFA: EE 01 78  INC $7801
  $ADFD: EF 01 03  ISB $0301
  $AE00: 30 58     BMI $ae5a
  $AE02: F0 01     BEQ $ae05
  $AE04: 60        RTS
  $AE05: F1 01     SBC ($01),Y
  $AE07: 68        PLA
  $AE08: F2        ???
  $AE09: 01 00     ORA ($00,X)
  $AE0B: 09 03     ORA #$03
  $AE0D: F0 38     BEQ $ae47
  $AE0F: A0 02     LDY #$02
  $AE11: 40        RTI
  $AE12: A1 02     LDA ($02,X)
  $AE14: 48        PHA
  $AE15: A4 02     LDY $02
  $AE17: 05 F8     ORA $f8
  $AE19: 38        SEC
  $AE1A: C0 02     CPY #$02
  $AE1C: 38        SEC
  $AE1D: A2 03     LDX #$03
  $AE1F: 40        RTI
  $AE20: C5 02     CMP $02
  $AE22: 40        RTI
  $AE23: A3 03     LAX ($03,X)
  $AE25: 48        PHA
  $AE26: A6 02     LDX $02
  $AE28: 04 00     NOP $00
  $AE2A: 30 A8     BMI $add4
  $AE2C: 02        ???
  $AE2D: 38        SEC
  $AE2E: C8        INY
  $AE2F: 02        ???
  $AE30: 38        SEC
  $AE31: A9 03     LDA #$03
  $AE33: 40        RTI
  $AE34: AC 03 04  LDY $0403
  $AE37: 08        PHP
  $AE38: 38        SEC
  $AE39: AB 02     ATX #$02
  $AE3B: 40        RTI
  $AE3C: AE 03 48  LDX $4803
  $AE3F: AF 03 58  LAX $5803
  $AE42: AD 03 06  LDA $0603
  $AE45: 10 40     BPL $ae87
  $AE47: A7 03     LAX $03
  $AE49: 48        PHA
  $AE4A: B2        ???
  $AE4B: 03 50     SLO ($50,X)
  $AE4D: B3 03     LAX ($03),Y
  $AE4F: 58        CLI
  $AE50: B6 03     LDX $03,Y
  $AE52: 60        RTS
  $AE53: B7 03     LAX $03,Y
  $AE55: 68        PLA
  $AE56: E2 03     NOP #$03
  $AE58: 05 18     ORA $18
  $AE5A: 48        PHA
  $AE5B: B8        CLV
  $AE5C: 03 50     SLO ($50,X)
  $AE5E: B9 01 58  LDA $5801,Y
  $AE61: BC 01 60  LDY $6001,X
  $AE64: BD 03 68  LDA $6803,X
  $AE67: E8        INX
  $AE68: 03 06     SLO ($06,X)
  $AE6A: 20 48 BA  JSR $ba48
  $AE6D: 01 50     ORA ($50,X)
  $AE6F: BB 01 58  LAS $5801,Y
  $AE72: BE 01 60  LDX $6001,Y
  $AE75: BF 01 68  LAX $6801,Y
  $AE78: EA        NOP
  $AE79: 01 70     ORA ($70,X)
  $AE7B: EB 01     SBC #$01
  $AE7D: 07 28     SLO $28
  $AE7F: 30 41     BMI $aec2
  $AE81: 00        BRK
  $AE82: 38        SEC
  $AE83: 44 00     NOP $00
  $AE85: 50 E3     BVC $ae6a
  $AE87: 01 58     ORA ($58,X)
  $AE89: AA        TAX
  $AE8A: 01 60     ORA ($60,X)
  $AE8C: AA        TAX
  $AE8D: 01 68     ORA ($68,X)
  $AE8F: 90 01     BCC $ae92
  $AE91: 70 91     BVS $ae24
  $AE93: 01 06     ORA ($06,X)
  $AE95: 30 50     BMI $aee7
  $AE97: E9 01     SBC #$01
  $AE99: 58        CLI
  $AE9A: EC 01 60  CPX $6001
  $AE9D: F7 01     ISB $01,X
  $AE9F: 68        PLA
  $AEA0: A5 01     LDA $01
  $AEA2: 70 B0     BVS $ae54
  $AEA4: 01 78     ORA ($78,X)
  $AEA6: B1 01     LDA ($01),Y
  $AEA8: 05 38     ORA $38
  $AEAA: 58        CLI
  $AEAB: EE 01 60  INC $6001
  $AEAE: FD 01 70  SBC $7001,X
  $AEB1: 70 03     BVS $aeb6
  $AEB3: 78        SEI
  $AEB4: 71 03     ADC ($03),Y
  $AEB6: 80 74     NOP #$74
  $AEB8: 03 02     SLO ($02,X)
  $AEBA: 40        RTI
  $AEBB: 78        SEI
  $AEBC: 73 03     RRA ($03),Y
  $AEBE: 80 61     NOP #$61
  $AEC0: 03 04     SLO ($04,X)
  $AEC2: 48        PHA
  $AEC3: 50 ED     BVC $aeb2
  $AEC5: 03 58     SLO ($58,X)
  $AEC7: F8        SED
  $AEC8: 03 60     SLO ($60,X)
  $AECA: F9 03 68  SBC $6803,Y
  $AECD: FC 03 04  NOP $0403,X
  $AED0: 50 50     BVC $af22
  $AED2: EF 03 58  ISB $5803
  $AED5: FA        NOP
  $AED6: 03 60     SLO ($60,X)
  $AED8: FB 03 68  ISB $6803,Y
  $AEDB: FE 03 00  INC $0003,X
  $AEDE: 0E 02 18  ASL $1802
  $AEE1: 60        RTS
  $AEE2: 62        ???
  $AEE3: 01 68     ORA ($68,X)
  $AEE5: 47 01     SRE $01
  $AEE7: 05 20     ORA $20
  $AEE9: 50 36     BVC $af21
  $AEEB: 01 58     ORA ($58,X)
  $AEED: 37 01     RLA $01,X
  $AEEF: 60        RTS
  $AEF0: FF 01 68  ISB $6801,X
  $AEF3: FF 01 70  ISB $7001,X
  $AEF6: 4D 01 05  EOR $0501
  $AEF9: 28        PLP
  $AEFA: 50 3C     BVC $af38
  $AEFC: 01 58     ORA ($58,X)
  $AEFE: 3D 01 60  AND $6001,X
  $AF01: 68        PLA
  $AF02: 01 68     ORA ($68,X)
  $AF04: 3A        NOP
  $AF05: 01 70     ORA ($70,X)
  $AF07: 3B 01 05  RLA $0501,Y
  $AF0A: 30 50     BMI $af5c
  $AF0C: 3E 01 58  ROL $5801,X
  $AF0F: 3F 01 60  RLA $6001,X
  $AF12: 6A        ROR A
  $AF13: 01 68     ORA ($68,X)
  $AF15: 90 01     BCC $af18
  $AF17: 70 4F     BVS $af68
  $AF19: 01 03     ORA ($03,X)
  $AF1B: 38        SEC
  $AF1C: 58        CLI
  $AF1D: 5C 01 68  NOP $6801,X
  $AF20: 5F 01 70  SRE $7001,X
  $AF23: 75 01     ADC $01,X
  $AF25: 04 40     NOP $40
  $AF27: 58        CLI
  $AF28: 89 01     NOP #$01
  $AF2A: 60        RTS
  $AF2B: 8C 01 68  STY $6801
  $AF2E: 8D 01 70  STA $7001
  $AF31: 8B 01     XAA #$01
  $AF33: 00        BRK
  $AF34: 0F 04 F8  SLO $f804
  $AF37: 78        SEI
  $AF38: E5 01     SBC $01
  $AF3A: 80 F0     NOP #$f0
  $AF3C: 01 88     ORA ($88,X)
  $AF3E: F1 01     SBC ($01),Y
  $AF40: A0 B9     LDY #$b9
  $AF42: 00        BRK
  $AF43: 07 00     SLO $00
  $AF45: 28        PLP
  $AF46: E7 01     ISB $01
  $AF48: 30 F6     BMI $af40
  $AF4A: 01 78     ORA ($78,X)
  $AF4C: E7 01     ISB $01
  $AF4E: 80 F2     NOP #$f2
  $AF50: 01 88     ORA ($88,X)
  $AF52: F3 01     ISB ($01),Y
  $AF54: 90 F6     BCC $af4c
  $AF56: 01 A0     ORA ($a0,X)
  $AF58: BB 00 01  LAS $0100,Y
  $AF5B: 08        PHP
  $AF5C: A0 B4     LDY #$b4
  $AF5E: 00        BRK
  $AF5F: 04 10     NOP $10
  $AF61: 40        RTI
  $AF62: E5 01     SBC $01
  $AF64: 48        PHA
  $AF65: F0 01     BEQ $af68
  $AF67: 50 F1     BVC $af5a
  $AF69: 01 A0     ORA ($a0,X)
  $AF6B: B2        ???
  $AF6C: 00        BRK
  $AF6D: 05 18     ORA $18
  $AF6F: 40        RTI
  $AF70: E7 01     ISB $01
  $AF72: 48        PHA
  $AF73: F2        ???
  $AF74: 01 50     ORA ($50,X)
  $AF76: F3 01     ISB ($01),Y
  $AF78: 58        CLI
  $AF79: F6 01     INC $01,X
  $AF7B: A0 B1     LDY #$b1
  $AF7D: 00        BRK
  $AF7E: 06 20     ASL $20
  $AF80: 20 9F 00  JSR $009f
  $AF83: 30 CA     BMI $af4f
  $AF85: 00        BRK
  $AF86: 80 D8     NOP #$d8
  $AF88: 00        BRK
  $AF89: 88        DEY
  $AF8A: D9 00 90  CMP $9000,Y
  $AF8D: DC 00 A0  NOP $a000,X
  $AF90: B3 00     LAX ($00),Y
  $AF92: 06 28     ASL $28
  $AF94: 40        RTI
  $AF95: CE 00 68  DEC $6800
  $AF98: E7 01     ISB $01
  $AF9A: 70 F6     BVS $af92
  $AF9C: 01 80     ORA ($80,X)
  $AF9E: DA        NOP
  $AF9F: 00        BRK
  $AFA0: 88        DEY
  $AFA1: DB 00 90  DCP $9000,Y
  $AFA4: DE 00 01  DEC $0100,X
  $AFA7: 29 8D     AND #$8d
  $AFA9: FC 03 03  NOP $0303,X
  $AFAC: 30 38     BMI $afe6
  $AFAE: B5 00     LDA $00,X
  $AFB0: 40        RTI
  $AFB1: E1 00     SBC ($00,X)
  $AFB3: 68        PLA
  $AFB4: CD 00 01  CMP $0100
  $AFB7: 24 26     BIT $26
  $AFB9: F7 03     ISB $03,X
  $AFBB: 04 38     NOP $38
  $AFBD: 38        SEC
  $AFBE: E0 00     CPX #$00
  $AFC0: 50 E4     BVC $afa6
  $AFC2: 00        BRK
  $AFC3: 58        CLI
  $AFC4: CC 00 68  CPY $6800
  $AFC7: E6 00     INC $00
  $AFC9: 01 3C     ORA ($3c,X)
  $AFCB: 55 FC     EOR $fc,X
  $AFCD: 03 02     SLO ($02,X)
  $AFCF: 40        RTI
  $AFD0: 38        SEC
  $AFD1: CB 00     AXS #$00
  $AFD3: 70 CF     BVS $afa4
  $AFD5: 00        BRK
  $AFD6: 00        BRK
  $AFD7: 1E 02 A0  ASL $a002,X
  $AFDA: D0 53     BNE $b02f
  $AFDC: 00        BRK
  $AFDD: D8        CLD
  $AFDE: 56 00     LSR $00,X
  $AFE0: 08        PHP
  $AFE1: A8        TAY
  $AFE2: 98        TYA
  $AFE3: 1C 00 A0  NOP $a000,X
  $AFE6: 1D 00 A8  ORA $a800,X
  $AFE9: 48        PHA
  $AFEA: 00        BRK
  $AFEB: B0 49     BCS $b036
  $AFED: 00        BRK
  $AFEE: B8        CLV
  $AFEF: 4C 00 C0  JMP $c000
  $AFF2: 4D 00 C8  EOR $c800
  $AFF5: 58        CLI
  $AFF6: 00        BRK
  $AFF7: D0 59     BNE $b052
  $AFF9: 00        BRK
  $AFFA: 08        PHP
  $AFFB: B0 A0     BCS $af9d
  $AFFD: 1F 00 A8  SLO $a800,X
  $B000: 4A        LSR A
  $B001: 00        BRK
  $B002: B0 4B     BCS $b04f
  $B004: 00        BRK
  $B005: B8        CLV
  $B006: 4E 00 C0  LSR $c000
  $B009: 4F 00 C8  SRE $c800
  $B00C: 5A        NOP
  $B00D: 00        BRK
  $B00E: D0 5B     BNE $b06b
  $B010: 00        BRK
  $B011: D8        CLD
  $B012: 5E 00 05  LSR $0500,X
  $B015: B8        CLV
  $B016: B8        CLV
  $B017: 64 00     NOP $00
  $B019: C0 65     CPY #$65
  $B01B: 00        BRK
  $B01C: C8        INY
  $B01D: 70 00     BVS $b01f
  $B01F: D0 71     BNE $b092
  $B021: 00        BRK
  $B022: D8        CLD
  $B023: 74 00     NOP $00,X
  $B025: 02        ???
  $B026: C0 D0     CPY #$d0
  $B028: 73 00     RRA ($00),Y
  $B02A: D8        CLD
  $B02B: 76 00     ROR $00,X
  $B02D: 00        BRK
  $B02E: 0D 01 30  ORA $3001
  $B031: 40        RTI
  $B032: D5 02     CMP $02,X
  $B034: 01 38     ORA ($38,X)
  $B036: 40        RTI
  $B037: D7 02     DCP $02,X
  $B039: 00        BRK
  $B03A: 0D 01 30  ORA $3001
  $B03D: 40        RTI
  $B03E: A3 00     LAX ($00,X)
  $B040: 01 38     ORA ($38,X)
  $B042: 40        RTI
  $B043: A9 00     LDA #$00
  $B045: 00        BRK
  $B046: 0D 01 30  ORA $3001
  $B049: 78        SEI
  $B04A: D5 42     CMP $42,X
  $B04C: 01 38     ORA ($38,X)
  $B04E: 78        SEI
  $B04F: D7 42     DCP $42,X
  $B051: 00        BRK
  $B052: 0D 02 30  ORA $3002
  $B055: 40        RTI
  $B056: A3 00     LAX ($00,X)
  $B058: 78        SEI
  $B059: A3 00     LAX ($00,X)
  $B05B: 02        ???
  $B05C: 38        SEC
  $B05D: 40        RTI
  $B05E: A9 00     LDA #$00
  $B060: 78        SEI
  $B061: EC 00 00  CPX $0000
  $B064: 11 01     ORA ($01),Y
  $B066: 24 58     BIT $58
  $B068: A9 00     LDA #$00
  $B06A: 00        BRK
  $B06B: 11 01     ORA ($01),Y
  $B06D: 24 58     BIT $58
  $B06F: A8        TAY
  $B070: 00        BRK
  $B071: 00        BRK
  $B072: 13 01     SLO ($01),Y
  $B074: 30 40     BMI $b0b6
  $B076: F1 03     SBC ($03),Y
  $B078: 00        BRK
  $B079: 13 01     SLO ($01),Y
  $B07B: 30 40     BMI $b0bd
  $B07D: F8        SED
  $B07E: 03 00     SLO ($00,X)
  $B080: 0E 01 38  ASL $3801
  $B083: 60        RTS
  $B084: 65 00     ADC $00
  $B086: 00        BRK
  $B087: 0E 01 38  ASL $3801
  $B08A: 60        RTS
  $B08B: 5D 00 00  EOR $0000,X
  $B08E: 0C 06 08  NOP $0806
  $B091: F0 A0     BEQ $b033
  $B093: 41 20     EOR ($20,X)
  $B095: A8        TAY
  $B096: 41 38     EOR ($38,X)
  $B098: FD 03 80  SBC $8003,X
  $B09B: FA        NOP
  $B09C: 41 98     EOR ($98,X)
  $B09E: F8        SED
  $B09F: 01 B0     ORA ($b0,X)
  $B0A1: A0 41     LDY #$41
  $B0A3: 07 18     SLO $18
  $B0A5: F8        SED
  $B0A6: A8        TAY
  $B0A7: 01 10     ORA ($10,X)
  $B0A9: FD 43 28  SBC $2843,X
  $B0AC: FA        NOP
  $B0AD: 01 40     ORA ($40,X)
  $B0AF: F8        SED
  $B0B0: 01 88     ORA ($88,X)
  $B0B2: A0 01     LDY #$01
  $B0B4: A0 FD     LDY #$fd
  $B0B6: 43 B8     SRE ($b8,X)
  $B0B8: A8        TAY
  $B0B9: 01 00     ORA ($00,X)
  $B0BB: 0C 06 08  NOP $0806
  $B0BE: F8        SED
  $B0BF: A0 01     LDY #$01
  $B0C1: 28        PLP
  $B0C2: A8        TAY
  $B0C3: 01 30     ORA ($30,X)
  $B0C5: FD 43 88  SBC $8843,X
  $B0C8: FA        NOP
  $B0C9: 01 90     ORA ($90,X)
  $B0CB: F8        SED
  $B0CC: 41 B8     EOR ($b8,X)
  $B0CE: A0 01     LDY #$01
  $B0D0: 07 18     SLO $18
  $B0D2: F0 A8     BEQ $b07c
  $B0D4: 41 18     EOR ($18,X)
  $B0D6: FD 03 20  SBC $2003,X
  $B0D9: FA        NOP
  $B0DA: 41 38     EOR ($38,X)
  $B0DC: F8        SED
  $B0DD: 41 80     EOR ($80,X)
  $B0DF: A0 41     LDY #$41
  $B0E1: A8        TAY
  $B0E2: FD 02 B0  SBC $b002,X
  $B0E5: A8        TAY
  $B0E6: 41 00     EOR ($00,X)
  $B0E8: 0B 04     ANC #$04
  $B0EA: 28        PLP
  $B0EB: 20 A8 02  JSR $02a8
  $B0EE: 28        PLP
  $B0EF: A9 02     LDA #$02
  $B0F1: 30 AC     BMI $b09f
  $B0F3: 02        ???
  $B0F4: 38        SEC
  $B0F5: AD 02 04  LDA $0402
  $B0F8: 30 20     BMI $b11a
  $B0FA: AA        TAX
  $B0FB: 02        ???
  $B0FC: 28        PLP
  $B0FD: AB 02     ATX #$02
  $B0FF: 30 AE     BMI $b0af
  $B101: 02        ???
  $B102: 38        SEC
  $B103: AF 02 04  LAX $0402
  $B106: 38        SEC
  $B107: 20 B8 02  JSR $02b8
  $B10A: 28        PLP
  $B10B: B9 02 30  LDA $3002,Y
  $B10E: BC 02 38  LDY $3802,X
  $B111: BD 02 04  LDA $0402,X
  $B114: 40        RTI
  $B115: 20 BA 02  JSR $02ba
  $B118: 28        PLP
  $B119: BB 02 30  LAS $3002,Y
  $B11C: BE 02 38  LDX $3802,Y
  $B11F: BF 02 00  LAX $0002,Y
  $B122: 14 01     NOP $01,X
  $B124: 68        PLA
  $B125: 60        RTS
  $B126: FE 00 06  INC $0600,X
  $B129: 70 50     BVS $b17b
  $B12B: F2        ???
  $B12C: 00        BRK
  $B12D: 58        CLI
  $B12E: F3 00     ISB ($00),Y
  $B130: 60        RTS
  $B131: F6 00     INC $00,X
  $B133: 68        PLA
  $B134: F7 00     ISB $00,X
  $B136: 70 FA     BVS $b132
  $B138: 00        BRK
  $B139: 78        SEI
  $B13A: FB 00 06  ISB $0600,Y
  $B13D: 78        SEI
  $B13E: 50 F4     BVC $b134
  $B140: 00        BRK
  $B141: 58        CLI
  $B142: F5 00     SBC $00,X
  $B144: 60        RTS
  $B145: F8        SED
  $B146: 00        BRK
  $B147: 68        PLA
  $B148: F9 00 70  SBC $7000,Y
  $B14B: FC 00 78  NOP $7800,X
  $B14E: FD 00 00  SBC $0000,X
  $B151: 12        ???
  $B152: 04 18     NOP $18
  $B154: 50 01     BVC $b157
  $B156: 03 58     SLO ($58,X)
  $B158: 04 03     NOP $03
  $B15A: 60        RTS
  $B15B: 05 03     ORA $03
  $B15D: 68        PLA
  $B15E: 10 03     BPL $b163
  $B160: 06 20     ASL $20
  $B162: 48        PHA
  $B163: 12        ???
  $B164: 03 50     SLO ($50,X)
  $B166: 13 03     SLO ($03),Y
  $B168: 58        CLI
  $B169: FF 03 60  ISB $6003,X
  $B16C: FF 03 68  ISB $6803,X
  $B16F: 06 00     ASL $00
  $B171: 70 07     BVS $b17a
  $B173: 00        BRK
  $B174: 06 28     ASL $28
  $B176: 48        PHA
  $B177: 18        CLC
  $B178: 03 50     SLO ($50,X)
  $B17A: 19 03 58  ORA $5803,Y
  $B17D: 08        PHP
  $B17E: 03 60     SLO ($60,X)
  $B180: 09 03     ORA #$03
  $B182: 68        PLA
  $B183: 0C 03 70  NOP $7003
  $B186: 0D 00 06  ORA $0600
  $B189: 30 48     BMI $b1d3
  $B18B: 1A        NOP
  $B18C: 03 50     SLO ($50,X)
  $B18E: 1B 03 58  SLO $5803,Y
  $B191: 0A        ASL A
  $B192: 03 60     SLO ($60,X)
  $B194: 0B 03     ANC #$03
  $B196: 68        PLA
  $B197: 0E 03 70  ASL $7003
  $B19A: 0F 00 04  SLO $0400
  $B19D: 38        SEC
  $B19E: 48        PHA
  $B19F: 20 03 50  JSR $5003
  $B1A2: 21 03     AND ($03,X)
  $B1A4: 60        RTS
  $B1A5: 03 03     SLO ($03,X)
  $B1A7: 68        PLA
  $B1A8: 15 03     ORA $03,X
  $B1AA: 05 40     ORA $40
  $B1AC: 50 24     BVC $b1d2
  $B1AE: 03 58     SLO ($58,X)
  $B1B0: 25 01     AND $01
  $B1B2: 60        RTS
  $B1B3: 30 01     BMI $b1b6
  $B1B5: 68        PLA
  $B1B6: 31 01     AND ($01),Y
  $B1B8: 70 34     BVS $b1ee
  $B1BA: 01 00     ORA ($00,X)
  $B1BC: 12        ???
  $B1BD: 02        ???
  $B1BE: 38        SEC
  $B1BF: 59 16 03  EOR $0316,Y
  $B1C2: 58        CLI
  $B1C3: 03 03     SLO ($03,X)
  $B1C5: 00        BRK
  $B1C6: 12        ???
  $B1C7: 01 38     ORA ($38,X)
  $B1C9: 58        CLI
  $B1CA: 1C 03 00  NOP $0003,X
  $B1CD: 1E 02 20  ASL $2002,X
  $B1D0: 70 53     BVS $b225
  $B1D2: 02        ???
  $B1D3: 78        SEI
  $B1D4: 56 02     LSR $02,X
  $B1D6: 08        PHP
  $B1D7: 28        PLP
  $B1D8: 38        SEC
  $B1D9: 1C 02 40  NOP $4002,X
  $B1DC: 1D 02 48  ORA $4802,X
  $B1DF: 48        PHA
  $B1E0: 02        ???
  $B1E1: 50 49     BVC $b22c
  $B1E3: 02        ???
  $B1E4: 58        CLI
  $B1E5: 4C 02 60  JMP $6002
  $B1E8: 4D 02 68  EOR $6802
  $B1EB: 58        CLI
  $B1EC: 02        ???
  $B1ED: 70 59     BVS $b248
  $B1EF: 02        ???
  $B1F0: 08        PHP
  $B1F1: 30 40     BMI $b233
  $B1F3: 1F 02 48  SLO $4802,X
  $B1F6: 4A        LSR A
  $B1F7: 02        ???
  $B1F8: 50 4B     BVC $b245
  $B1FA: 02        ???
  $B1FB: 58        CLI
  $B1FC: 4E 02 60  LSR $6002
  $B1FF: 4F 02 68  SRE $6802
  $B202: 5A        NOP
  $B203: 02        ???
  $B204: 70 5B     BVS $b261
  $B206: 02        ???
  $B207: 78        SEI
  $B208: 5E 02 05  LSR $0502,X
  $B20B: 38        SEC
  $B20C: 58        CLI
  $B20D: 64 00     NOP $00
  $B20F: 60        RTS
  $B210: 65 00     ADC $00
  $B212: 68        PLA
  $B213: 70 02     BVS $b217
  $B215: 70 71     BVS $b288
  $B217: 02        ???
  $B218: 78        SEI
  $B219: 74 02     NOP $02,X
  $B21B: 02        ???
  $B21C: 40        RTI
  $B21D: 70 73     BVS $b292
  $B21F: 02        ???
  $B220: 78        SEI
  $B221: 76 02     ROR $02,X
  $B223: 00        BRK
  $B224: 14 01     NOP $01,X
  $B226: 20 58 FE  JSR $fe58
  $B229: 01 06     ORA ($06,X)
  $B22B: 28        PLP
  $B22C: 48        PHA
  $B22D: F2        ???
  $B22E: 01 50     ORA ($50,X)
  $B230: F3 01     ISB ($01),Y
  $B232: 58        CLI
  $B233: F6 01     INC $01,X
  $B235: 60        RTS
  $B236: F7 01     ISB $01,X
  $B238: 68        PLA
  $B239: FA        NOP
  $B23A: 01 70     ORA ($70,X)
  $B23C: FB 01 06  ISB $0601,Y
  $B23F: 30 48     BMI $b289
  $B241: F4 01     NOP $01,X
  $B243: 50 F5     BVC $b23a
  $B245: 01 58     ORA ($58,X)
  $B247: F8        SED
  $B248: 01 60     ORA ($60,X)
  $B24A: F9 01 68  SBC $6801,Y
  $B24D: FC 01 70  NOP $7001,X
  $B250: FD 01 00  SBC $0001,X
  $B253: 05 03     ORA $03
  $B255: 0C 55 80  NOP $8055
  $B258: 02        ???
  $B259: 5D 81 02  EOR $0281,X
  $B25C: 65 84     ADC $84
  $B25E: 02        ???
  $B25F: 03 14     SLO ($14,X)
  $B261: 55 82     EOR $82,X
  $B263: 02        ???
  $B264: 5D 83 02  EOR $0283,X
  $B267: 65 86     ADC $86
  $B269: 02        ???
  $B26A: 03 1C     SLO ($1c,X)
  $B26C: 55 88     EOR $88,X
  $B26E: 02        ???
  $B26F: 5D 89 02  EOR $0289,X
  $B272: 65 8C     ADC $8c
  $B274: 02        ???
  $B275: 06 28     ASL $28
  $B277: 48        PHA
  $B278: 94 01     STY $01,X
  $B27A: 50 95     BVC $b211
  $B27C: 01 58     ORA ($58,X)
  $B27E: C0 41     CPY #$41
  $B280: 60        RTS
  $B281: 95 01     STA $01,X
  $B283: 68        PLA
  $B284: 95 41     STA $41,X
  $B286: 70 94     BVS $b21c
  $B288: 41 06     EOR ($06,X)
  $B28A: 30 48     BMI $b2d4
  $B28C: 9E 01 50  SHX $5001,Y
  $B28F: 97 41     SAX $41,Y
  $B291: 58        CLI
  $B292: C1 41     CMP ($41,X)
  $B294: 60        RTS
  $B295: C1 01     CMP ($01,X)
  $B297: 68        PLA
  $B298: 97 01     SAX $01,Y
  $B29A: 70 9E     BVS $b23a
  $B29C: 41 06     EOR ($06,X)
  $B29E: 38        SEC
  $B29F: 48        PHA
  $B2A0: C0 01     CPY #$01
  $B2A2: 50 C1     BVC $b265
  $B2A4: 01 58     ORA ($58,X)
  $B2A6: 97 01     SAX $01,Y
  $B2A8: 60        RTS
  $B2A9: 97 41     SAX $41,Y
  $B2AB: 68        PLA
  $B2AC: C1 41     CMP ($41,X)
  $B2AE: 70 C0     BVS $b270
  $B2B0: 41 06     EOR ($06,X)
  $B2B2: 40        RTI
  $B2B3: 48        PHA
  $B2B4: 94 81     STY $81,X
  $B2B6: 50 C2     BVC $b27a
  $B2B8: 01 58     ORA ($58,X)
  $B2BA: 9E 41 60  SHX $6041,Y
  $B2BD: 9E 01 68  SHX $6801,Y
  $B2C0: C2 41     NOP #$41
  $B2C2: 70 94     BVS $b258
  $B2C4: C1 00     CMP ($00,X)
  $B2C6: 00        BRK
  $B2C7: 00        BRK
  $B2C8: 00        BRK
  $B2C9: 00        BRK
  $B2CA: 00        BRK
  $B2CB: 00        BRK
  $B2CC: 00        BRK
  $B2CD: 00        BRK
  $B2CE: 00        BRK
  $B2CF: 00        BRK
  $B2D0: 00        BRK
  $B2D1: 00        BRK
  $B2D2: 00        BRK
  $B2D3: 00        BRK
  $B2D4: 00        BRK
  $B2D5: 00        BRK
  $B2D6: 00        BRK
  $B2D7: 00        BRK
  $B2D8: 00        BRK
  $B2D9: 00        BRK
  $B2DA: 00        BRK
  $B2DB: 00        BRK
  $B2DC: 00        BRK
  $B2DD: 00        BRK
  $B2DE: 00        BRK
  $B2DF: 00        BRK
  $B2E0: 00        BRK
  $B2E1: 00        BRK
  $B2E2: 00        BRK
  $B2E3: 00        BRK
  $B2E4: 00        BRK
  $B2E5: 00        BRK
  $B2E6: 00        BRK
  $B2E7: 00        BRK
  $B2E8: 00        BRK
  $B2E9: 00        BRK
  $B2EA: 00        BRK
  $B2EB: 00        BRK
  $B2EC: 00        BRK
  $B2ED: 00        BRK
  $B2EE: 00        BRK
  $B2EF: 00        BRK
  $B2F0: 00        BRK
  $B2F1: 00        BRK
  $B2F2: 00        BRK
  $B2F3: 00        BRK
  $B2F4: 00        BRK
  $B2F5: 00        BRK
  $B2F6: 00        BRK
  $B2F7: 00        BRK
  $B2F8: 00        BRK
  $B2F9: 00        BRK
  $B2FA: 00        BRK
  $B2FB: 00        BRK
  $B2FC: 00        BRK
  $B2FD: 00        BRK
  $B2FE: 00        BRK
  $B2FF: 00        BRK
  $B300: 00        BRK
  $B301: 00        BRK
  $B302: 00        BRK
  $B303: 00        BRK
  $B304: 00        BRK
  $B305: 00        BRK
  $B306: 00        BRK
  $B307: 00        BRK
  $B308: 00        BRK
  $B309: 00        BRK
  $B30A: 00        BRK
  $B30B: 00        BRK
  $B30C: 00        BRK
  $B30D: 00        BRK
  $B30E: 00        BRK
  $B30F: 00        BRK
  $B310: 00        BRK
  $B311: 00        BRK
  $B312: 00        BRK
  $B313: 00        BRK
  $B314: 00        BRK
  $B315: 00        BRK
  $B316: 00        BRK
  $B317: 00        BRK
  $B318: 00        BRK
  $B319: 00        BRK
  $B31A: 00        BRK
  $B31B: 00        BRK
  $B31C: 00        BRK
  $B31D: 00        BRK
  $B31E: 00        BRK
  $B31F: 00        BRK
  $B320: 00        BRK
  $B321: 00        BRK
  $B322: 00        BRK
  $B323: 00        BRK
  $B324: 00        BRK
  $B325: 00        BRK
  $B326: 00        BRK
  $B327: 00        BRK
  $B328: 00        BRK
  $B329: 00        BRK
  $B32A: 00        BRK
  $B32B: 00        BRK
  $B32C: 00        BRK
  $B32D: 00        BRK
  $B32E: 00        BRK
  $B32F: 00        BRK
  $B330: 00        BRK
  $B331: 00        BRK
  $B332: 00        BRK
  $B333: 00        BRK
  $B334: 00        BRK
  $B335: 00        BRK
  $B336: 00        BRK
  $B337: 00        BRK
  $B338: 00        BRK
  $B339: 00        BRK
  $B33A: 00        BRK
  $B33B: 00        BRK
  $B33C: 00        BRK
  $B33D: 00        BRK
  $B33E: 00        BRK
  $B33F: 00        BRK
  $B340: 00        BRK
  $B341: 00        BRK
  $B342: 00        BRK
  $B343: 00        BRK
  $B344: 00        BRK
  $B345: 00        BRK
  $B346: 00        BRK
  $B347: 00        BRK
  $B348: 00        BRK
  $B349: 00        BRK
  $B34A: 00        BRK
  $B34B: 00        BRK
  $B34C: 00        BRK
  $B34D: 00        BRK
  $B34E: 00        BRK
  $B34F: 00        BRK
  $B350: 00        BRK
  $B351: 00        BRK
  $B352: 00        BRK
  $B353: 00        BRK
  $B354: 00        BRK
  $B355: 00        BRK
  $B356: 00        BRK
  $B357: 00        BRK
  $B358: 00        BRK
  $B359: 00        BRK
  $B35A: 00        BRK
  $B35B: 00        BRK
  $B35C: 00        BRK
  $B35D: 00        BRK
  $B35E: 00        BRK
  $B35F: 00        BRK
  $B360: 00        BRK
  $B361: 00        BRK
  $B362: 00        BRK
  $B363: 00        BRK
  $B364: 00        BRK
  $B365: 00        BRK
  $B366: 00        BRK
  $B367: 00        BRK
  $B368: 00        BRK
  $B369: 00        BRK
  $B36A: 00        BRK
  $B36B: 00        BRK
  $B36C: 00        BRK
  $B36D: 00        BRK
  $B36E: 00        BRK
  $B36F: 00        BRK
  $B370: 00        BRK
  $B371: 00        BRK
  $B372: 00        BRK
  $B373: 00        BRK
  $B374: 00        BRK
  $B375: 00        BRK
  $B376: 00        BRK
  $B377: 00        BRK
  $B378: 00        BRK
  $B379: 00        BRK
  $B37A: 00        BRK
  $B37B: 00        BRK
  $B37C: 00        BRK
  $B37D: 00        BRK
  $B37E: 00        BRK
  $B37F: 00        BRK
  $B380: 00        BRK
  $B381: 00        BRK
  $B382: 00        BRK
  $B383: 00        BRK
  $B384: 00        BRK
  $B385: 00        BRK
  $B386: 00        BRK
  $B387: 00        BRK
  $B388: 00        BRK
  $B389: 00        BRK
  $B38A: 00        BRK
  $B38B: 00        BRK
  $B38C: 00        BRK
  $B38D: 00        BRK
  $B38E: 00        BRK
  $B38F: 00        BRK
  $B390: 00        BRK
  $B391: 00        BRK
  $B392: 00        BRK
  $B393: 00        BRK
  $B394: 00        BRK
  $B395: 00        BRK
  $B396: 00        BRK
  $B397: 00        BRK
  $B398: 00        BRK
  $B399: 00        BRK
  $B39A: 00        BRK
  $B39B: 00        BRK
  $B39C: 00        BRK
  $B39D: 00        BRK
  $B39E: 00        BRK
  $B39F: 00        BRK
  $B3A0: 00        BRK
  $B3A1: 00        BRK
  $B3A2: 00        BRK
  $B3A3: 00        BRK
  $B3A4: 00        BRK
  $B3A5: 00        BRK
  $B3A6: 00        BRK
  $B3A7: 00        BRK
  $B3A8: 00        BRK
  $B3A9: 00        BRK
  $B3AA: 00        BRK
  $B3AB: 00        BRK
  $B3AC: 00        BRK
  $B3AD: 00        BRK
  $B3AE: 00        BRK
  $B3AF: 00        BRK
  $B3B0: 00        BRK
  $B3B1: 00        BRK
  $B3B2: 00        BRK
  $B3B3: 00        BRK
  $B3B4: 00        BRK
  $B3B5: 00        BRK
  $B3B6: 00        BRK
  $B3B7: 00        BRK
  $B3B8: 00        BRK
  $B3B9: 00        BRK
  $B3BA: 00        BRK
  $B3BB: 00        BRK
  $B3BC: 00        BRK
  $B3BD: 00        BRK
  $B3BE: 00        BRK
  $B3BF: 00        BRK
  $B3C0: 00        BRK
  $B3C1: 00        BRK
  $B3C2: 00        BRK
  $B3C3: 00        BRK
  $B3C4: 00        BRK
  $B3C5: 00        BRK
  $B3C6: 00        BRK
  $B3C7: 00        BRK
  $B3C8: 00        BRK
  $B3C9: 00        BRK
  $B3CA: 00        BRK
  $B3CB: 00        BRK
  $B3CC: 00        BRK
  $B3CD: 00        BRK
  $B3CE: 00        BRK
  $B3CF: 00        BRK
  $B3D0: 00        BRK
  $B3D1: 00        BRK
  $B3D2: 00        BRK
  $B3D3: 00        BRK
  $B3D4: 00        BRK
  $B3D5: 00        BRK
  $B3D6: 00        BRK
  $B3D7: 00        BRK
  $B3D8: 00        BRK
  $B3D9: 00        BRK
  $B3DA: 00        BRK
  $B3DB: 00        BRK
  $B3DC: 00        BRK
  $B3DD: 00        BRK
  $B3DE: 00        BRK
  $B3DF: 00        BRK
  $B3E0: 00        BRK
  $B3E1: 00        BRK
  $B3E2: 00        BRK
  $B3E3: 00        BRK
  $B3E4: 00        BRK
  $B3E5: 00        BRK
  $B3E6: 00        BRK
  $B3E7: 00        BRK
  $B3E8: 00        BRK
  $B3E9: 00        BRK
  $B3EA: 00        BRK
  $B3EB: 00        BRK
  $B3EC: 00        BRK
  $B3ED: 00        BRK
  $B3EE: 00        BRK
  $B3EF: 00        BRK
  $B3F0: 00        BRK
  $B3F1: 00        BRK
  $B3F2: 00        BRK
  $B3F3: 00        BRK
  $B3F4: 00        BRK
  $B3F5: 00        BRK
  $B3F6: 00        BRK
  $B3F7: 00        BRK
  $B3F8: 00        BRK
  $B3F9: 00        BRK
  $B3FA: 00        BRK
  $B3FB: 00        BRK
  $B3FC: 00        BRK
  $B3FD: 00        BRK
  $B3FE: 00        BRK
  $B3FF: 00        BRK
  $B400: 00        BRK
  $B401: 00        BRK
  $B402: 00        BRK
  $B403: 00        BRK
  $B404: 00        BRK
  $B405: 00        BRK
  $B406: 00        BRK
  $B407: 00        BRK
  $B408: 00        BRK
  $B409: 00        BRK
  $B40A: 00        BRK
  $B40B: 00        BRK
  $B40C: 00        BRK
  $B40D: 00        BRK
  $B40E: 00        BRK
  $B40F: 00        BRK
  $B410: 00        BRK
  $B411: 00        BRK
  $B412: 00        BRK
  $B413: 00        BRK
  $B414: 00        BRK
  $B415: 00        BRK
  $B416: 00        BRK
  $B417: 00        BRK
  $B418: 00        BRK
  $B419: 00        BRK
  $B41A: 00        BRK
  $B41B: 00        BRK
  $B41C: 00        BRK
  $B41D: 00        BRK
  $B41E: 00        BRK
  $B41F: 00        BRK
  $B420: 00        BRK
  $B421: 00        BRK
  $B422: 00        BRK
  $B423: 00        BRK
  $B424: 00        BRK
  $B425: 00        BRK
  $B426: 00        BRK
  $B427: 00        BRK
  $B428: 00        BRK
  $B429: 00        BRK
  $B42A: 00        BRK
  $B42B: 00        BRK
  $B42C: 00        BRK
  $B42D: 00        BRK
  $B42E: 00        BRK
  $B42F: 00        BRK
  $B430: 00        BRK
  $B431: 00        BRK
  $B432: 00        BRK
  $B433: 00        BRK
  $B434: 00        BRK
  $B435: 00        BRK
  $B436: 00        BRK
  $B437: 00        BRK
  $B438: 00        BRK
  $B439: 00        BRK
  $B43A: 00        BRK
  $B43B: 00        BRK
  $B43C: 00        BRK
  $B43D: 00        BRK
  $B43E: 00        BRK
  $B43F: 00        BRK
  $B440: 00        BRK
  $B441: 00        BRK
  $B442: 00        BRK
  $B443: 00        BRK
  $B444: 00        BRK
  $B445: 00        BRK
  $B446: 00        BRK
  $B447: 00        BRK
  $B448: 00        BRK
  $B449: 00        BRK
  $B44A: 00        BRK
  $B44B: 00        BRK
  $B44C: 00        BRK
  $B44D: 00        BRK
  $B44E: 00        BRK
  $B44F: 00        BRK
  $B450: 00        BRK
  $B451: 00        BRK
  $B452: 00        BRK
  $B453: 00        BRK
  $B454: 00        BRK
  $B455: 00        BRK
  $B456: 00        BRK
  $B457: 00        BRK
  $B458: 00        BRK
  $B459: 00        BRK
  $B45A: 00        BRK
  $B45B: 00        BRK
  $B45C: 00        BRK
  $B45D: 00        BRK
  $B45E: 00        BRK
  $B45F: 00        BRK
  $B460: 00        BRK
  $B461: 00        BRK
  $B462: 00        BRK
  $B463: 00        BRK
  $B464: 00        BRK
  $B465: 00        BRK
  $B466: 00        BRK
  $B467: 00        BRK
  $B468: 00        BRK
  $B469: 00        BRK
  $B46A: 00        BRK
  $B46B: 00        BRK
  $B46C: 00        BRK
  $B46D: 00        BRK
  $B46E: 00        BRK
  $B46F: 00        BRK
  $B470: 00        BRK
  $B471: 00        BRK
  $B472: 00        BRK
  $B473: 00        BRK
  $B474: 00        BRK
  $B475: 00        BRK
  $B476: 00        BRK
  $B477: 00        BRK
  $B478: 00        BRK
  $B479: 00        BRK
  $B47A: 00        BRK
  $B47B: 00        BRK
  $B47C: 00        BRK
  $B47D: 00        BRK
  $B47E: 00        BRK
  $B47F: 00        BRK
  $B480: 00        BRK
  $B481: 00        BRK
  $B482: 00        BRK
  $B483: 00        BRK
  $B484: 00        BRK
  $B485: 00        BRK
  $B486: 00        BRK
  $B487: 00        BRK
  $B488: 00        BRK
  $B489: 00        BRK
  $B48A: 00        BRK
  $B48B: 00        BRK
  $B48C: 00        BRK
  $B48D: 00        BRK
  $B48E: 00        BRK
  $B48F: 00        BRK
  $B490: 00        BRK
  $B491: 00        BRK
  $B492: 00        BRK
  $B493: 00        BRK
  $B494: 00        BRK
  $B495: 00        BRK
  $B496: 00        BRK
  $B497: 00        BRK
  $B498: 00        BRK
  $B499: 00        BRK
  $B49A: 00        BRK
  $B49B: 00        BRK
  $B49C: 00        BRK
  $B49D: 00        BRK
  $B49E: 00        BRK
  $B49F: 00        BRK
  $B4A0: 00        BRK
  $B4A1: 00        BRK
  $B4A2: 00        BRK
  $B4A3: 00        BRK
  $B4A4: 00        BRK
  $B4A5: 00        BRK
  $B4A6: 00        BRK
  $B4A7: 00        BRK
  $B4A8: 00        BRK
  $B4A9: 00        BRK
  $B4AA: 00        BRK
  $B4AB: 00        BRK
  $B4AC: 00        BRK
  $B4AD: 00        BRK
  $B4AE: 00        BRK
  $B4AF: 00        BRK
  $B4B0: 00        BRK
  $B4B1: 00        BRK
  $B4B2: 00        BRK
  $B4B3: 00        BRK
  $B4B4: 00        BRK
  $B4B5: 00        BRK
  $B4B6: 00        BRK
  $B4B7: 00        BRK
  $B4B8: 00        BRK
  $B4B9: 00        BRK
  $B4BA: 00        BRK
  $B4BB: 00        BRK
  $B4BC: 00        BRK
  $B4BD: 00        BRK
  $B4BE: 00        BRK
  $B4BF: 00        BRK
  $B4C0: 00        BRK
  $B4C1: 00        BRK
  $B4C2: 00        BRK
  $B4C3: 00        BRK
  $B4C4: 00        BRK
  $B4C5: 00        BRK
  $B4C6: 00        BRK
  $B4C7: 00        BRK
  $B4C8: 00        BRK
  $B4C9: 00        BRK
  $B4CA: 00        BRK
  $B4CB: 00        BRK
  $B4CC: 00        BRK
  $B4CD: 00        BRK
  $B4CE: 00        BRK
  $B4CF: 00        BRK
  $B4D0: 00        BRK
  $B4D1: 00        BRK
  $B4D2: 00        BRK
  $B4D3: 00        BRK
  $B4D4: 00        BRK
  $B4D5: 00        BRK
  $B4D6: 00        BRK
  $B4D7: 00        BRK
  $B4D8: 00        BRK
  $B4D9: 00        BRK
  $B4DA: 00        BRK
  $B4DB: 00        BRK
  $B4DC: 00        BRK
  $B4DD: 00        BRK
  $B4DE: 00        BRK
  $B4DF: 00        BRK
  $B4E0: 00        BRK
  $B4E1: 00        BRK
  $B4E2: 00        BRK
  $B4E3: 00        BRK
  $B4E4: 00        BRK
  $B4E5: 00        BRK
  $B4E6: 00        BRK
  $B4E7: 00        BRK
  $B4E8: 00        BRK
  $B4E9: 00        BRK
  $B4EA: 00        BRK
  $B4EB: 00        BRK
  $B4EC: 00        BRK
  $B4ED: 00        BRK
  $B4EE: 00        BRK
  $B4EF: 00        BRK
  $B4F0: 00        BRK
  $B4F1: 00        BRK
  $B4F2: 00        BRK
  $B4F3: 00        BRK
  $B4F4: 00        BRK
  $B4F5: 00        BRK
  $B4F6: 00        BRK
  $B4F7: 00        BRK
  $B4F8: 00        BRK
  $B4F9: 00        BRK
  $B4FA: 00        BRK
  $B4FB: 00        BRK
  $B4FC: 00        BRK
  $B4FD: 00        BRK
  $B4FE: 00        BRK
  $B4FF: 00        BRK
  $B500: 00        BRK
  $B501: 00        BRK
  $B502: 00        BRK
  $B503: 00        BRK
  $B504: 00        BRK
  $B505: 00        BRK
  $B506: 00        BRK
  $B507: 00        BRK
  $B508: 00        BRK
  $B509: 00        BRK
  $B50A: 00        BRK
  $B50B: 00        BRK
  $B50C: 00        BRK
  $B50D: 00        BRK
  $B50E: 00        BRK
  $B50F: 00        BRK
  $B510: 00        BRK
  $B511: 00        BRK
  $B512: 00        BRK
  $B513: 00        BRK
  $B514: 00        BRK
  $B515: 00        BRK
  $B516: 00        BRK
  $B517: 00        BRK
  $B518: 00        BRK
  $B519: 00        BRK
  $B51A: 00        BRK
  $B51B: 00        BRK
  $B51C: 00        BRK
  $B51D: 00        BRK
  $B51E: 00        BRK
  $B51F: 00        BRK
  $B520: 00        BRK
  $B521: 00        BRK
  $B522: 00        BRK
  $B523: 00        BRK
  $B524: 00        BRK
  $B525: 00        BRK
  $B526: 00        BRK
  $B527: 00        BRK
  $B528: 00        BRK
  $B529: 00        BRK
  $B52A: 00        BRK
  $B52B: 00        BRK
  $B52C: 00        BRK
  $B52D: 00        BRK
  $B52E: 00        BRK
  $B52F: 00        BRK
  $B530: 00        BRK
  $B531: 00        BRK
  $B532: 00        BRK
  $B533: 00        BRK
  $B534: 00        BRK
  $B535: 00        BRK
  $B536: 00        BRK
  $B537: 00        BRK
  $B538: 00        BRK
  $B539: 00        BRK
  $B53A: 00        BRK
  $B53B: 00        BRK
  $B53C: 00        BRK
  $B53D: 00        BRK
  $B53E: 00        BRK
  $B53F: 00        BRK
  $B540: 00        BRK
  $B541: 00        BRK
  $B542: 00        BRK
  $B543: 00        BRK
  $B544: 00        BRK
  $B545: 00        BRK
  $B546: 00        BRK
  $B547: 00        BRK
  $B548: 00        BRK
  $B549: 00        BRK
  $B54A: 00        BRK
  $B54B: 00        BRK
  $B54C: 00        BRK
  $B54D: 00        BRK
  $B54E: 00        BRK
  $B54F: 00        BRK
  $B550: 00        BRK
  $B551: 00        BRK
  $B552: 00        BRK
  $B553: 00        BRK
  $B554: 00        BRK
  $B555: 00        BRK
  $B556: 00        BRK
  $B557: 00        BRK
  $B558: 00        BRK
  $B559: 00        BRK
  $B55A: 00        BRK
  $B55B: 00        BRK
  $B55C: 00        BRK
  $B55D: 00        BRK
  $B55E: 00        BRK
  $B55F: 00        BRK
  $B560: 00        BRK
  $B561: 00        BRK
  $B562: 00        BRK
  $B563: 00        BRK
  $B564: 00        BRK
  $B565: 00        BRK
  $B566: 00        BRK
  $B567: 00        BRK
  $B568: 00        BRK
  $B569: 00        BRK
  $B56A: 00        BRK
  $B56B: 00        BRK
  $B56C: 00        BRK
  $B56D: 00        BRK
  $B56E: 00        BRK
  $B56F: 00        BRK
  $B570: 00        BRK
  $B571: 00        BRK
  $B572: 00        BRK
  $B573: 00        BRK
  $B574: 00        BRK
  $B575: 00        BRK
  $B576: 00        BRK
  $B577: 00        BRK
  $B578: 00        BRK
  $B579: 00        BRK
  $B57A: 00        BRK
  $B57B: 00        BRK
  $B57C: 00        BRK
  $B57D: 00        BRK
  $B57E: 00        BRK
  $B57F: 00        BRK
  $B580: 00        BRK
  $B581: 00        BRK
  $B582: 00        BRK
  $B583: 00        BRK
  $B584: 00        BRK
  $B585: 00        BRK
  $B586: 00        BRK
  $B587: 00        BRK
  $B588: 00        BRK
  $B589: 00        BRK
  $B58A: 00        BRK
  $B58B: 00        BRK
  $B58C: 00        BRK
  $B58D: 00        BRK
  $B58E: 00        BRK
  $B58F: 00        BRK
  $B590: 00        BRK
  $B591: 00        BRK
  $B592: 00        BRK
  $B593: 00        BRK
  $B594: 00        BRK
  $B595: 00        BRK
  $B596: 00        BRK
  $B597: 00        BRK
  $B598: 00        BRK
  $B599: 00        BRK
  $B59A: 00        BRK
  $B59B: 00        BRK
  $B59C: 00        BRK
  $B59D: 00        BRK
  $B59E: 00        BRK
  $B59F: 00        BRK
  $B5A0: 00        BRK
  $B5A1: 00        BRK
  $B5A2: 00        BRK
  $B5A3: 00        BRK
  $B5A4: 00        BRK
  $B5A5: 00        BRK
  $B5A6: 00        BRK
  $B5A7: 00        BRK
  $B5A8: 00        BRK
  $B5A9: 00        BRK
  $B5AA: 00        BRK
  $B5AB: 00        BRK
  $B5AC: 00        BRK
  $B5AD: 00        BRK
  $B5AE: 00        BRK
  $B5AF: 00        BRK
  $B5B0: 00        BRK
  $B5B1: 00        BRK
  $B5B2: 00        BRK
  $B5B3: 00        BRK
  $B5B4: 00        BRK
  $B5B5: 00        BRK
  $B5B6: 00        BRK
  $B5B7: 00        BRK
  $B5B8: 00        BRK
  $B5B9: 00        BRK
  $B5BA: 00        BRK
  $B5BB: 00        BRK
  $B5BC: 00        BRK
  $B5BD: 00        BRK
  $B5BE: 00        BRK
  $B5BF: 00        BRK
  $B5C0: 00        BRK
  $B5C1: 00        BRK
  $B5C2: 00        BRK
  $B5C3: 00        BRK
  $B5C4: 00        BRK
  $B5C5: 00        BRK
  $B5C6: 00        BRK
  $B5C7: 00        BRK
  $B5C8: 00        BRK
  $B5C9: 00        BRK
  $B5CA: 00        BRK
  $B5CB: 00        BRK
  $B5CC: 00        BRK
  $B5CD: 00        BRK
  $B5CE: 00        BRK
  $B5CF: 00        BRK
  $B5D0: 00        BRK
  $B5D1: 00        BRK
  $B5D2: 00        BRK
  $B5D3: 00        BRK
  $B5D4: 00        BRK
  $B5D5: 00        BRK
  $B5D6: 00        BRK
  $B5D7: 00        BRK
  $B5D8: 00        BRK
  $B5D9: 00        BRK
  $B5DA: 00        BRK
  $B5DB: 00        BRK
  $B5DC: 00        BRK
  $B5DD: 00        BRK
  $B5DE: 00        BRK
  $B5DF: 00        BRK
  $B5E0: 00        BRK
  $B5E1: 00        BRK
  $B5E2: 00        BRK
  $B5E3: 00        BRK
  $B5E4: 00        BRK
  $B5E5: 00        BRK
  $B5E6: 00        BRK
  $B5E7: 00        BRK
  $B5E8: 00        BRK
  $B5E9: 00        BRK
  $B5EA: 00        BRK
  $B5EB: 00        BRK
  $B5EC: 00        BRK
  $B5ED: 00        BRK
  $B5EE: 00        BRK
  $B5EF: 00        BRK
  $B5F0: 00        BRK
  $B5F1: 00        BRK
  $B5F2: 00        BRK
  $B5F3: 00        BRK
  $B5F4: 00        BRK
  $B5F5: 00        BRK
  $B5F6: 00        BRK
  $B5F7: 00        BRK
  $B5F8: 00        BRK
  $B5F9: 00        BRK
  $B5FA: 00        BRK
  $B5FB: 00        BRK
  $B5FC: 00        BRK
  $B5FD: 00        BRK
  $B5FE: 00        BRK
  $B5FF: 00        BRK
  $B600: 00        BRK
  $B601: 00        BRK
  $B602: 00        BRK
  $B603: 00        BRK
  $B604: 00        BRK
  $B605: 00        BRK
  $B606: 00        BRK
  $B607: 00        BRK
  $B608: 00        BRK
  $B609: 00        BRK
  $B60A: 00        BRK
  $B60B: 00        BRK
  $B60C: 00        BRK
  $B60D: 00        BRK
  $B60E: 00        BRK
  $B60F: 00        BRK
  $B610: 00        BRK
  $B611: 00        BRK
  $B612: 00        BRK
  $B613: 00        BRK
  $B614: 00        BRK
  $B615: 00        BRK
  $B616: 00        BRK
  $B617: 00        BRK
  $B618: 00        BRK
  $B619: 00        BRK
  $B61A: 00        BRK
  $B61B: 00        BRK
  $B61C: 00        BRK
  $B61D: 00        BRK
  $B61E: 00        BRK
  $B61F: 00        BRK
  $B620: 00        BRK
  $B621: 00        BRK
  $B622: 00        BRK
  $B623: 00        BRK
  $B624: 00        BRK
  $B625: 00        BRK
  $B626: 00        BRK
  $B627: 00        BRK
  $B628: 00        BRK
  $B629: 00        BRK
  $B62A: 00        BRK
  $B62B: 00        BRK
  $B62C: 00        BRK
  $B62D: 00        BRK
  $B62E: 00        BRK
  $B62F: 00        BRK
  $B630: 00        BRK
  $B631: 00        BRK
  $B632: 00        BRK
  $B633: 00        BRK
  $B634: 00        BRK
  $B635: 00        BRK
  $B636: 00        BRK
  $B637: 00        BRK
  $B638: 00        BRK
  $B639: 00        BRK
  $B63A: 00        BRK
  $B63B: 00        BRK
  $B63C: 00        BRK
  $B63D: 00        BRK
  $B63E: 00        BRK
  $B63F: 00        BRK
  $B640: 00        BRK
  $B641: 00        BRK
  $B642: 00        BRK
  $B643: 00        BRK
  $B644: 00        BRK
  $B645: 00        BRK
  $B646: 00        BRK
  $B647: 00        BRK
  $B648: 00        BRK
  $B649: 00        BRK
  $B64A: 00        BRK
  $B64B: 00        BRK
  $B64C: 00        BRK
  $B64D: 00        BRK
  $B64E: 00        BRK
  $B64F: 00        BRK
  $B650: 00        BRK
  $B651: 00        BRK
  $B652: 00        BRK
  $B653: 00        BRK
  $B654: 00        BRK
  $B655: 00        BRK
  $B656: 00        BRK
  $B657: 00        BRK
  $B658: 00        BRK
  $B659: 00        BRK
  $B65A: 00        BRK
  $B65B: 00        BRK
  $B65C: 00        BRK
  $B65D: 00        BRK
  $B65E: 00        BRK
  $B65F: 00        BRK
  $B660: 00        BRK
  $B661: 00        BRK
  $B662: 00        BRK
  $B663: 00        BRK
  $B664: 00        BRK
  $B665: 00        BRK
  $B666: 00        BRK
  $B667: 00        BRK
  $B668: 00        BRK
  $B669: 00        BRK
  $B66A: 00        BRK
  $B66B: 00        BRK
  $B66C: 00        BRK
  $B66D: 00        BRK
  $B66E: 00        BRK
  $B66F: 00        BRK
  $B670: 00        BRK
  $B671: 00        BRK
  $B672: 00        BRK
  $B673: 00        BRK
  $B674: 00        BRK
  $B675: 00        BRK
  $B676: 00        BRK
  $B677: 00        BRK
  $B678: 00        BRK
  $B679: 00        BRK
  $B67A: 00        BRK
  $B67B: 00        BRK
  $B67C: 00        BRK
  $B67D: 00        BRK
  $B67E: 00        BRK
  $B67F: 00        BRK
  $B680: 00        BRK
  $B681: 00        BRK
  $B682: 00        BRK
  $B683: 00        BRK
  $B684: 00        BRK
  $B685: 00        BRK
  $B686: 00        BRK
  $B687: 00        BRK
  $B688: 00        BRK
  $B689: 00        BRK
  $B68A: 00        BRK
  $B68B: 00        BRK
  $B68C: 00        BRK
  $B68D: 00        BRK
  $B68E: 00        BRK
  $B68F: 00        BRK
  $B690: 00        BRK
  $B691: 00        BRK
  $B692: 00        BRK
  $B693: 00        BRK
  $B694: 00        BRK
  $B695: 00        BRK
  $B696: 00        BRK
  $B697: 00        BRK
  $B698: 00        BRK
  $B699: 00        BRK
  $B69A: 00        BRK
  $B69B: 00        BRK
  $B69C: 00        BRK
  $B69D: 00        BRK
  $B69E: 00        BRK
  $B69F: 00        BRK
  $B6A0: 00        BRK
  $B6A1: 00        BRK
  $B6A2: 00        BRK
  $B6A3: 00        BRK
  $B6A4: 00        BRK
  $B6A5: 00        BRK
  $B6A6: 00        BRK
  $B6A7: 00        BRK
  $B6A8: 00        BRK
  $B6A9: 00        BRK
  $B6AA: 00        BRK
  $B6AB: 00        BRK
  $B6AC: 00        BRK
  $B6AD: 00        BRK
  $B6AE: 00        BRK
  $B6AF: 00        BRK
  $B6B0: 00        BRK
  $B6B1: 00        BRK
  $B6B2: 00        BRK
  $B6B3: 00        BRK
  $B6B4: 00        BRK
  $B6B5: 00        BRK
  $B6B6: 00        BRK
  $B6B7: 00        BRK
  $B6B8: 00        BRK
  $B6B9: 00        BRK
  $B6BA: 00        BRK
  $B6BB: 00        BRK
  $B6BC: 00        BRK
  $B6BD: 00        BRK
  $B6BE: 00        BRK
  $B6BF: 00        BRK
  $B6C0: 00        BRK
  $B6C1: 00        BRK
  $B6C2: 00        BRK
  $B6C3: 00        BRK
  $B6C4: 00        BRK
  $B6C5: 00        BRK
  $B6C6: 00        BRK
  $B6C7: 00        BRK
  $B6C8: 00        BRK
  $B6C9: 00        BRK
  $B6CA: 00        BRK
  $B6CB: 00        BRK
  $B6CC: 00        BRK
  $B6CD: 00        BRK
  $B6CE: 00        BRK
  $B6CF: 00        BRK
  $B6D0: 00        BRK
  $B6D1: 00        BRK
  $B6D2: 00        BRK
  $B6D3: 00        BRK
  $B6D4: 00        BRK
  $B6D5: 00        BRK
  $B6D6: 00        BRK
  $B6D7: 00        BRK
  $B6D8: 00        BRK
  $B6D9: 00        BRK
  $B6DA: 00        BRK
  $B6DB: 00        BRK
  $B6DC: 00        BRK
  $B6DD: 00        BRK
  $B6DE: 00        BRK
  $B6DF: 00        BRK
  $B6E0: 00        BRK
  $B6E1: 00        BRK
  $B6E2: 00        BRK
  $B6E3: 00        BRK
  $B6E4: 00        BRK
  $B6E5: 00        BRK
  $B6E6: 00        BRK
  $B6E7: 00        BRK
  $B6E8: 00        BRK
  $B6E9: 00        BRK
  $B6EA: 00        BRK
  $B6EB: 00        BRK
  $B6EC: 00        BRK
  $B6ED: 00        BRK
  $B6EE: 00        BRK
  $B6EF: 00        BRK
  $B6F0: 00        BRK
  $B6F1: 00        BRK
  $B6F2: 00        BRK
  $B6F3: 00        BRK
  $B6F4: 00        BRK
  $B6F5: 00        BRK
  $B6F6: 00        BRK
  $B6F7: 00        BRK
  $B6F8: 00        BRK
  $B6F9: 00        BRK
  $B6FA: 00        BRK
  $B6FB: 00        BRK
  $B6FC: 00        BRK
  $B6FD: 00        BRK
  $B6FE: 00        BRK
  $B6FF: 00        BRK
  $B700: 00        BRK
  $B701: 00        BRK
  $B702: 00        BRK
  $B703: 00        BRK
  $B704: 00        BRK
  $B705: 00        BRK
  $B706: 00        BRK
  $B707: 00        BRK
  $B708: 00        BRK
  $B709: 00        BRK
  $B70A: 00        BRK
  $B70B: 00        BRK
  $B70C: 00        BRK
  $B70D: 00        BRK
  $B70E: 00        BRK
  $B70F: 00        BRK
  $B710: 00        BRK
  $B711: 00        BRK
  $B712: 00        BRK
  $B713: 00        BRK
  $B714: 00        BRK
  $B715: 00        BRK
  $B716: 00        BRK
  $B717: 00        BRK
  $B718: 00        BRK
  $B719: 00        BRK
  $B71A: 00        BRK
  $B71B: 00        BRK
  $B71C: 00        BRK
  $B71D: 00        BRK
  $B71E: 00        BRK
  $B71F: 00        BRK
  $B720: 00        BRK
  $B721: 00        BRK
  $B722: 00        BRK
  $B723: 00        BRK
  $B724: 00        BRK
  $B725: 00        BRK
  $B726: 00        BRK
  $B727: 00        BRK
  $B728: 00        BRK
  $B729: 00        BRK
  $B72A: 00        BRK
  $B72B: 00        BRK
  $B72C: 00        BRK
  $B72D: 00        BRK
  $B72E: 00        BRK
  $B72F: 00        BRK
  $B730: 00        BRK
  $B731: 00        BRK
  $B732: 00        BRK
  $B733: 00        BRK
  $B734: 00        BRK
  $B735: 00        BRK
  $B736: 00        BRK
  $B737: 00        BRK
  $B738: 00        BRK
  $B739: 00        BRK
  $B73A: 00        BRK
  $B73B: 00        BRK
  $B73C: 00        BRK
  $B73D: 00        BRK
  $B73E: 00        BRK
  $B73F: 00        BRK
  $B740: 00        BRK
  $B741: 00        BRK
  $B742: 00        BRK
  $B743: 00        BRK
  $B744: 00        BRK
  $B745: 00        BRK
  $B746: 00        BRK
  $B747: 00        BRK
  $B748: 00        BRK
  $B749: 00        BRK
  $B74A: 00        BRK
  $B74B: 00        BRK
  $B74C: 00        BRK
  $B74D: 00        BRK
  $B74E: 00        BRK
  $B74F: 00        BRK
  $B750: 00        BRK
  $B751: 00        BRK
  $B752: 00        BRK
  $B753: 00        BRK
  $B754: 00        BRK
  $B755: 00        BRK
  $B756: 00        BRK
  $B757: 00        BRK
  $B758: 00        BRK
  $B759: 00        BRK
  $B75A: 00        BRK
  $B75B: 00        BRK
  $B75C: 00        BRK
  $B75D: 00        BRK
  $B75E: 00        BRK
  $B75F: 00        BRK
  $B760: 00        BRK
  $B761: 00        BRK
  $B762: 00        BRK
  $B763: 00        BRK
  $B764: 00        BRK
  $B765: 00        BRK
  $B766: 00        BRK
  $B767: 00        BRK
  $B768: 00        BRK
  $B769: 00        BRK
  $B76A: 00        BRK
  $B76B: 00        BRK
  $B76C: 00        BRK
  $B76D: 00        BRK
  $B76E: 00        BRK
  $B76F: 00        BRK
  $B770: 00        BRK
  $B771: 00        BRK
  $B772: 00        BRK
  $B773: 00        BRK
  $B774: 00        BRK
  $B775: 00        BRK
  $B776: 00        BRK
  $B777: 00        BRK
  $B778: 00        BRK
  $B779: 00        BRK
  $B77A: 00        BRK
  $B77B: 00        BRK
  $B77C: 00        BRK
  $B77D: 00        BRK
  $B77E: 00        BRK
  $B77F: 00        BRK
  $B780: 00        BRK
  $B781: 00        BRK
  $B782: 00        BRK
  $B783: 00        BRK
  $B784: 00        BRK
  $B785: 00        BRK
  $B786: 00        BRK
  $B787: 00        BRK
  $B788: 00        BRK
  $B789: 00        BRK
  $B78A: 00        BRK
  $B78B: 00        BRK
  $B78C: 00        BRK
  $B78D: 00        BRK
  $B78E: 00        BRK
  $B78F: 00        BRK
  $B790: 00        BRK
  $B791: 00        BRK
  $B792: 00        BRK
  $B793: 00        BRK
  $B794: 00        BRK
  $B795: 00        BRK
  $B796: 00        BRK
  $B797: 00        BRK
  $B798: 00        BRK
  $B799: 00        BRK
  $B79A: 00        BRK
  $B79B: 00        BRK
  $B79C: 00        BRK
  $B79D: 00        BRK
  $B79E: 00        BRK
  $B79F: 00        BRK
  $B7A0: 00        BRK
  $B7A1: 00        BRK
  $B7A2: 00        BRK
  $B7A3: 00        BRK
  $B7A4: 00        BRK
  $B7A5: 00        BRK
  $B7A6: 00        BRK
  $B7A7: 00        BRK
  $B7A8: 00        BRK
  $B7A9: 00        BRK
  $B7AA: 00        BRK
  $B7AB: 00        BRK
  $B7AC: 00        BRK
  $B7AD: 00        BRK
  $B7AE: 00        BRK
  $B7AF: 00        BRK
  $B7B0: 00        BRK
  $B7B1: 00        BRK
  $B7B2: 00        BRK
  $B7B3: 00        BRK
  $B7B4: 00        BRK
  $B7B5: 00        BRK
  $B7B6: 00        BRK
  $B7B7: 00        BRK
  $B7B8: 00        BRK
  $B7B9: 00        BRK
  $B7BA: 00        BRK
  $B7BB: 00        BRK
  $B7BC: 00        BRK
  $B7BD: 00        BRK
  $B7BE: 00        BRK
  $B7BF: 00        BRK
  $B7C0: 00        BRK
  $B7C1: 00        BRK
  $B7C2: 00        BRK
  $B7C3: 00        BRK
  $B7C4: 00        BRK
  $B7C5: 00        BRK
  $B7C6: 00        BRK
  $B7C7: 00        BRK
  $B7C8: 00        BRK
  $B7C9: 00        BRK
  $B7CA: 00        BRK
  $B7CB: 00        BRK
  $B7CC: 00        BRK
  $B7CD: 00        BRK
  $B7CE: 00        BRK
  $B7CF: 00        BRK
  $B7D0: 00        BRK
  $B7D1: 00        BRK
  $B7D2: 00        BRK
  $B7D3: 00        BRK
  $B7D4: 00        BRK
  $B7D5: 00        BRK
  $B7D6: 00        BRK
  $B7D7: 00        BRK
  $B7D8: 00        BRK
  $B7D9: 00        BRK
  $B7DA: 00        BRK
  $B7DB: 00        BRK
  $B7DC: 00        BRK
  $B7DD: 00        BRK
  $B7DE: 00        BRK
  $B7DF: 00        BRK
  $B7E0: 00        BRK
  $B7E1: 00        BRK
  $B7E2: 00        BRK
  $B7E3: 00        BRK
  $B7E4: 00        BRK
  $B7E5: 00        BRK
  $B7E6: 00        BRK
  $B7E7: 00        BRK
  $B7E8: 00        BRK
  $B7E9: 00        BRK
  $B7EA: 00        BRK
  $B7EB: 00        BRK
  $B7EC: 00        BRK
  $B7ED: 00        BRK
  $B7EE: 00        BRK
  $B7EF: 00        BRK
  $B7F0: 00        BRK
  $B7F1: 00        BRK
  $B7F2: 00        BRK
  $B7F3: 00        BRK
  $B7F4: 00        BRK
  $B7F5: 00        BRK
  $B7F6: 00        BRK
  $B7F7: 00        BRK
  $B7F8: 00        BRK
  $B7F9: 00        BRK
  $B7FA: 00        BRK
  $B7FB: 00        BRK
  $B7FC: 00        BRK
  $B7FD: 00        BRK
  $B7FE: 00        BRK
  $B7FF: 00        BRK
  $B800: A9 00     LDA #$00
  $B802: 85 16     STA $16
  $B804: 85 17     STA $17
  $B806: 85 1A     STA $1a
  $B808: A5 19     LDA $19
  $B80A: 29 FC     AND #$fc
  $B80C: 85 19     STA $19
  $B80E: 20 20 80  JSR $8020
  $B811: 20 1D 80  JSR $801d
  $B814: 20 14 80  JSR $8014
  $B817: A9 1B     LDA #$1b
  $B819: 20 26 80  JSR $8026
  $B81C: A9 08     LDA #$08
  $B81E: 20 35 80  JSR $8035
  $B821: A9 00     LDA #$00
  $B823: 8D 00 06  STA $0600
  $B826: 8D 01 06  STA $0601
  $B829: 8D 02 06  STA $0602
  $B82C: A9 9C     LDA #$9c
  $B82E: 85 6C     STA $6c
  $B830: A9 F9     LDA #$f9
  $B832: 85 6D     STA $6d
  $B834: A9 05     LDA #$05
  $B836: 20 59 80  JSR $8059
  $B839: 20 05 80  JSR $8005
  $B83C: 20 42 F8  JSR $f842
  $B83F: 4C 39 F8  JMP $f839
  $B842: AD 02 06  LDA $0602
  $B845: 20 17 80  JSR $8017
  $B848: 4C F8 C4  JMP $c4f8
  $B84B: F8        SED
  $B84C: AD 00 06  LDA $0600
  $B84F: 18        CLC
  $B850: 69 50     ADC #$50
  $B852: 8D 00 06  STA $0600
  $B855: A9 00     LDA #$00
  $B857: 65 17     ADC $17
  $B859: C9 F0     CMP #$f0
  $B85B: 90 0A     BCC $b867
  $B85D: 69 0F     ADC #$0f
  $B85F: 48        PHA
  $B860: A5 19     LDA $19
  $B862: 49 02     EOR #$02
  $B864: 85 19     STA $19
  $B866: 68        PLA
  $B867: 85 17     STA $17
  $B869: 29 F0     AND #$f0
  $B86B: CD 01 06  CMP $0601
  $B86E: D0 01     BNE $b871
  $B870: 60        RTS
  $B871: 8D 01 06  STA $0601
  $B874: 20 C5 F8  JSR $f8c5
  $B877: A0 00     LDY #$00
  $B879: B1 6C     LDA ($6c),Y
  $B87B: C9 FF     CMP #$ff
  $B87D: D0 04     BNE $b883
  $B87F: EE 02 06  INC $0602
  $B882: 60        RTS
  $B883: C8        INY
  $B884: C9 FE     CMP #$fe
  $B886: D0 09     BNE $b891
  $B888: A9 14     LDA #$14
  $B88A: 85 1A     STA $1a
  $B88C: 85 1B     STA $1b
  $B88E: B1 6C     LDA ($6c),Y
  $B890: C8        INY
  $B891: 84 01     STY $01
  $B893: A8        TAY
  $B894: F0 1D     BEQ $b8b3
  $B896: 85 00     STA $00
  $B898: A4 01     LDY $01
  $B89A: B1 6C     LDA ($6c),Y
  $B89C: 10 0B     BPL $b8a9
  $B89E: E6 01     INC $01
  $B8A0: 29 7F     AND #$7f
  $B8A2: AA        TAX
  $B8A3: 20 75 F9  JSR $f975
  $B8A6: 4C B3 F8  JMP $f8b3
  $B8A9: AA        TAX
  $B8AA: E6 01     INC $01
  $B8AC: 20 07 F9  JSR $f907
  $B8AF: C6 00     DEC $00
  $B8B1: D0 E5     BNE $b898
  $B8B3: A5 01     LDA $01
  $B8B5: 18        CLC
  $B8B6: 65 6C     ADC $6c
  $B8B8: 85 6C     STA $6c
  $B8BA: 90 02     BCC $b8be
  $B8BC: E6 6D     INC $6d
  $B8BE: A9 43     LDA #$43
  $B8C0: 20 2F 80  JSR $802f
  $B8C3: 60        RTS
  $B8C4: 60        RTS
  $B8C5: A2 00     LDX #$00
  $B8C7: 8A        TXA
  $B8C8: 9D 3A 03  STA $033a,X
  $B8CB: E8        INX
  $B8CC: E0 46     CPX #$46
  $B8CE: D0 F8     BNE $b8c8
  $B8D0: A9 20     LDA #$20
  $B8D2: 8D 3A 03  STA $033a
  $B8D5: 8D 5D 03  STA $035d
  $B8D8: A5 17     LDA $17
  $B8DA: 8D 3B 03  STA $033b
  $B8DD: A9 00     LDA #$00
  $B8DF: 0E 3B 03  ASL $033b
  $B8E2: 2A        ROL A
  $B8E3: 0E 3B 03  ASL $033b
  $B8E6: 2A        ROL A
  $B8E7: 8D 3C 03  STA $033c
  $B8EA: A5 19     LDA $19
  $B8EC: 4A        LSR A
  $B8ED: 4A        LSR A
  $B8EE: A9 20     LDA #$20
  $B8F0: B0 02     BCS $b8f4
  $B8F2: A9 28     LDA #$28
  $B8F4: 0D 3C 03  ORA $033c
  $B8F7: 8D 3C 03  STA $033c
  $B8FA: 8D 5F 03  STA $035f
  $B8FD: AD 3B 03  LDA $033b
  $B900: 18        CLC
  $B901: 69 20     ADC #$20
  $B903: 8D 5E 03  STA $035e
  $B906: 60        RTS
  $B907: A4 01     LDY $01
  $B909: E6 01     INC $01
  $B90B: B1 6C     LDA ($6c),Y
  $B90D: C9 F0     CMP #$f0
  $B90F: 90 06     BCC $b917
  $B911: 20 1D F9  JSR $f91d
  $B914: 4C 07 F9  JMP $f907
  $B917: 20 65 F9  JSR $f965
  $B91A: 4C 07 F9  JMP $f907
  $B91D: 29 07     AND #$07
  $B91F: 20 17 80  JSR $8017
  $B922: 35 F9     AND $f9,X
  $B924: 4C F9 00  JMP $00f9
  $B927: 00        BRK
  $B928: 00        BRK
  $B929: 00        BRK
  $B92A: 00        BRK
  $B92B: 00        BRK
  $B92C: 00        BRK
  $B92D: 00        BRK
  $B92E: 00        BRK
  $B92F: 00        BRK
  $B930: 32        ???
  $B931: F9 68 68  SBC $6868,Y
  $B934: 60        RTS
  $B935: A4 01     LDY $01
  $B937: B1 6C     LDA ($6c),Y
  $B939: E6 01     INC $01
  $B93B: 20 56 80  JSR $8056
  $B93E: A4 67     LDY $67
  $B940: B1 65     LDA ($65),Y
  $B942: 20 65 F9  JSR $f965
  $B945: E6 67     INC $67
  $B947: C6 68     DEC $68
  $B949: D0 F3     BNE $b93e
  $B94B: 60        RTS
  $B94C: A4 01     LDY $01
  $B94E: B1 6C     LDA ($6c),Y
  $B950: 85 08     STA $08
  $B952: E6 01     INC $01
  $B954: A4 01     LDY $01
  $B956: B1 6C     LDA ($6c),Y
  $B958: A8        TAY
  $B959: A9 00     LDA #$00
  $B95B: 20 6C F9  JSR $f96c
  $B95E: E6 01     INC $01
  $B960: C6 08     DEC $08
  $B962: D0 F0     BNE $b954
  $B964: 60        RTS
  $B965: 20 29 80  JSR $8029
  $B968: 20 6C F9  JSR $f96c
  $B96B: 60        RTS
  $B96C: 9D 60 03  STA $0360,X
  $B96F: 98        TYA
  $B970: 9D 3D 03  STA $033d,X
  $B973: E8        INX
  $B974: 60        RTS
  $B975: A0 00     LDY #$00
  $B977: B9 8A F9  LDA $f98a,Y
  $B97A: 9D 3D 03  STA $033d,X
  $B97D: B9 93 F9  LDA $f993,Y
  $B980: 9D 60 03  STA $0360,X
  $B983: E8        INX
  $B984: C8        INY
  $B985: C0 09     CPY #$09
  $B987: D0 EE     BNE $b977
  $B989: 60        RTS
  $B98A: 80 81     NOP #$81
  $B98C: 84 85     STY $85
  $B98E: 90 91     BCC $b921
  $B990: 94 95     STY $95,X
  $B992: C0 82     CPY #$82
  $B994: 83 86     SAX ($86,X)
  $B996: 87 92     SAX $92
  $B998: 82 96     NOP #$96
  $B99A: 97 C2     SAX $c2,Y
  $B99C: 00        BRK
  $B99D: 00        BRK
  $B99E: 01 0B     ORA ($0b,X)
  $B9A0: 13 02     SLO ($02),Y
  $B9A2: 55 31     EOR $31,X
  $B9A4: 02        ???
  $B9A5: 55 2D     EOR $2d,X
  $B9A7: 65 11     ADC $11
  $B9A9: FF 00 00  ISB $0000,X
  $B9AC: 00        BRK
  $B9AD: 02        ???
  $B9AE: 04 57     NOP $57
  $B9B0: 2D 15 1D  AND $1d15
  $B9B3: 2D F0 67  AND $67f0
  $B9B6: FF 10 04  ISB $0410,X
  $B9B9: 04 58     NOP $58
  $B9BB: 26 3A     ROL $3a
  $B9BD: F0 01     BEQ $b9c0
  $B9BF: FF 01 10  ISB $1001,X
  $B9C2: F0 18     BEQ $b9dc
  $B9C4: 3A        NOP
  $B9C5: 0F 2A 02  SLO $022a
  $B9C8: FF 01 10  ISB $1001,X
  $B9CB: F0 14     BEQ $b9e1
  $B9CD: 3A        NOP
  $B9CE: 09 55     ORA #$55
  $B9D0: 2A        ROL A
  $B9D1: 02        ???
  $B9D2: FF 01 10  ISB $1001,X
  $B9D5: F0 16     BEQ $b9ed
  $B9D7: 3A        NOP
  $B9D8: 08        PHP
  $B9D9: 2D FF 01  AND $01ff
  $B9DC: 10 0F     BPL $b9ed
  $B9DE: 10 63     BPL $ba43
  $B9E0: 14 3A     NOP $3a,X
  $B9E2: F0 0F     BEQ $b9f3
  $B9E4: FF 01 10  ISB $1001,X
  $B9E7: 0F 10 63  SLO $6310
  $B9EA: 14 3A     NOP $3a,X
  $B9EC: F0 10     BEQ $b9fe
  $B9EE: FF 01 10  ISB $1001,X
  $B9F1: F0 11     BEQ $ba04
  $B9F3: 3A        NOP
  $B9F4: 1A        NOP
  $B9F5: 2A        ROL A
  $B9F6: 0B FF     ANC #$ff
  $B9F8: 01 10     ORA ($10,X)
  $B9FA: F0 06     BEQ $ba02
  $B9FC: 3A        NOP
  $B9FD: 0B 2D     ANC #$2d
  $B9FF: 53 FF     SRE ($ff),Y
  $BA01: 01 10     ORA ($10,X)
  $BA03: F0 0E     BEQ $ba13
  $BA05: 3A        NOP
  $BA06: 1E 09 13  ASL $1309,X
  $BA09: FF 01 10  ISB $1001,X
  $BA0C: F0 04     BEQ $ba12
  $BA0E: 3A        NOP
  $BA0F: 1E 22 28  ASL $2822,X
  $BA12: FF 01 10  ISB $1001,X
  $BA15: F0 13     BEQ $ba2a
  $BA17: 3A        NOP
  $BA18: 1A        NOP
  $BA19: 05 28     ORA $28
  $BA1B: FF 01 10  ISB $1001,X
  $BA1E: F0 05     BEQ $ba25
  $BA20: 3A        NOP
  $BA21: 27 31     RLA $31
  $BA23: 02        ???
  $BA24: FF 01 10  ISB $1001,X
  $BA27: F0 15     BEQ $ba3e
  $BA29: 3A        NOP
  $BA2A: 8F 88 8B  SAX $8b88
  $BA2D: FF 01 10  ISB $1001,X
  $BA30: F0 12     BEQ $ba44
  $BA32: 3A        NOP
  $BA33: 1F 11 28  SLO $2811,X
  $BA36: FF 01 10  ISB $1001,X
  $BA39: F0 03     BEQ $ba3e
  $BA3B: 3A        NOP
  $BA3C: 19 55 21  ORA $2155,Y
  $BA3F: FF 01 10  ISB $1001,X
  $BA42: F0 1B     BEQ $ba5f
  $BA44: 3A        NOP
  $BA45: 0B 30     ANC #$30
  $BA47: 2D FF 01  AND $01ff
  $BA4A: 10 F0     BPL $ba3c
  $BA4C: 17 3A     SLO $3a,X
  $BA4E: 05 56     ORA $56
  $BA50: 06 FF     ASL $ff
  $BA52: 01 10     ORA ($10,X)
  $BA54: F0 02     BEQ $ba58
  $BA56: 3A        NOP
  $BA57: 12        ???
  $BA58: 2E 6B 01  ROL $016b
  $BA5B: FF 01 10  ISB $1001,X
  $BA5E: F0 07     BEQ $ba67
  $BA60: 3A        NOP
  $BA61: 24 02     BIT $02
  $BA63: 58        CLI
  $BA64: 02        ???
  $BA65: FF 01 10  ISB $1001,X
  $BA68: F0 1A     BEQ $ba84
  $BA6A: 3A        NOP
  $BA6B: 52        ???
  $BA6C: 2D 58 02  AND $0258
  $BA6F: FF 01 10  ISB $1001,X
  $BA72: F0 19     BEQ $ba8d
  $BA74: 3A        NOP
  $BA75: 55 30     EOR $30,X
  $BA77: 2D FF 00  AND $00ff
  $BA7A: 01 10     ORA ($10,X)
  $BA7C: 05 0F     ORA $0f
  $BA7E: 50 27     BVC $baa7
  $BA80: 3A        NOP
  $BA81: 20 17 1E  JSR $1e17
  $BA84: 0A        ASL A
  $BA85: FF 01 10  ISB $1001,X
  $BA88: F0 5E     BEQ $bae8
  $BA8A: 3A        NOP
  $BA8B: 0F 11 04  SLO $0411
  $BA8E: FF 00 01  ISB $0100,X
  $BA91: 10 AA     BPL $ba3d
  $BA93: E6 A8     INC $a8
  $BA95: 93 1D     ??? ($1d),Y
  $BA97: 2D 53 02  AND $0253
  $BA9A: FF 00 01  ISB $0100,X
  $BA9D: 10 14     BPL $bab3
  $BA9F: 05 54     ORA $54
  $BAA1: 2B 3A     ANC #$3a
  $BAA3: F0 5D     BEQ $bb02
  $BAA5: FF 01 10  ISB $1001,X
  $BAA8: 0C 50 22  NOP $2250
  $BAAB: 13 3A     SLO ($3a),Y
  $BAAD: 07 1F     SLO $1f
  $BAAF: FF 01 10  ISB $1001,X
  $BAB2: 04 04     NOP $04
  $BAB4: 63 3A     RRA ($3a,X)
  $BAB6: 23 25     RLA ($25,X)
  $BAB8: 01 FF     ORA ($ff,X)
  $BABA: 01 10     ORA ($10,X)
  $BABC: 19 23 05  ORA $0523,Y
  $BABF: 2B 3A     ANC #$3a
  $BAC1: 00        BRK
  $BAC2: 5B 1F FF  SRE $ff1f,Y
  $BAC5: 00        BRK
  $BAC6: 00        BRK
  $BAC7: 02        ???
  $BAC8: 04 F0     NOP $f0
  $BACA: 4F F0 67  SRE $67f0
  $BACD: FF 10 85  ISB $8510,X
  $BAD0: 48        PHA
  $BAD1: A8        TAY
  $BAD2: 3A        NOP
  $BAD3: 99 81 AD  STA $ad81,Y
  $BAD6: 91 3A     STA ($3a),Y
  $BAD8: F0 22     BEQ $bafc
  $BADA: FF 01 10  ISB $1001,X
  $BADD: 9B A6 AD  TAS $ada6,Y
  $BAE0: 91 3A     STA ($3a),Y
  $BAE2: F0 25     BEQ $bb09
  $BAE4: FF 01 10  ISB $1001,X
  $BAE7: 9E AD 9B  SHX $9bad,Y
  $BAEA: A9 48     LDA #$48
  $BAEC: 93 3A     ??? ($3a),Y
  $BAEE: F0 24     BEQ $bb14
  $BAF0: FF 01 10  ISB $1001,X
  $BAF3: 9C A8 9E  SHY $9ea8,X
  $BAF6: AD 3A F0  LDA $f03a
  $BAF9: 23 FF     RLA ($ff,X)
  $BAFB: 01 10     ORA ($10,X)
  $BAFD: DC B0 48  NOP $48b0,X
  $BB00: 8F 48 F0  SAX $f048
  $BB03: 26 FF     ROL $ff
  $BB05: 00        BRK
  $BB06: 00        BRK
  $BB07: 02        ???
  $BB08: 05 F0     ORA $f0
  $BB0A: 4E F0 67  LSR $67f0
  $BB0D: FF 10 83  ISB $8310,X
  $BB10: A8        TAY
  $BB11: 3A        NOP
  $BB12: 8B DD     XAA #$dd
  $BB14: 3A        NOP
  $BB15: F0 20     BEQ $bb37
  $BB17: FF 01 10  ISB $1001,X
  $BB1A: A8        TAY
  $BB1B: 81 3A     STA ($3a,X)
  $BB1D: F0 21     BEQ $bb40
  $BB1F: FF 00 00  ISB $0000,X
  $BB22: 02        ???
  $BB23: 03 F0     SLO ($f0,X)
  $BB25: 44 F0     NOP $f0
  $BB27: 67 FF     RRA $ff
  $BB29: 10 9B     BPL $bac6
  $BB2B: B4 AD     LDY $ad,X
  $BB2D: 3A        NOP
  $BB2E: F0 1C     BEQ $bb4c
  $BB30: FF 01 10  ISB $1001,X
  $BB33: 80 A6     NOP #$a6
  $BB35: AD 3A F0  LDA $f03a
  $BB38: 1D FF 00  ORA $00ff,X
  $BB3B: 00        BRK
  $BB3C: 02        ???
  $BB3D: 05 F0     ORA $f0
  $BB3F: 46 F0     LSR $f0
  $BB41: 67 FF     RRA $ff
  $BB43: 10 D5     BPL $bb1a
  $BB45: 98        TYA
  $BB46: 3A        NOP
  $BB47: F0 1F     BEQ $bb68
  $BB49: FF 00 00  ISB $0000,X
  $BB4C: 02        ???
  $BB4D: 04 F0     NOP $f0
  $BB4F: 45 F0     EOR $f0
  $BB51: 67 FF     RRA $ff
  $BB53: 10 A6     BPL $bafb
  $BB55: A2 AD     LDX #$ad
  $BB57: 3A        NOP
  $BB58: F0 1E     BEQ $bb78
  $BB5A: FF 00 00  ISB $0000,X
  $BB5D: 00        BRK
  $BB5E: 00        BRK
  $BB5F: 00        BRK
  $BB60: 00        BRK
  $BB61: 00        BRK
  $BB62: 01 0E     ORA ($0e,X)
  $BB64: 52        ???
  $BB65: 2D 0A 07  AND $070a
  $BB68: FF 00 01  ISB $0100,X
  $BB6B: 0C 0F 05  NOP $050f
  $BB6E: 19 0B 3A  ORA $3a0b,Y
  $BB71: 25 02     AND $02
  $BB73: 01 10     ORA ($10,X)
  $BB75: FF 00 00  ISB $0000,X
  $BB78: 00        BRK
  $BB79: 00        BRK
  $BB7A: 00        BRK
  $BB7B: 00        BRK
  $BB7C: 00        BRK
  $BB7D: 01 0E     ORA ($0e,X)
  $BB7F: 8C 8F AE  STY $ae8f
  $BB82: 9B FF 00  TAS $00ff,Y
  $BB85: 00        BRK
  $BB86: 00        BRK
  $BB87: 02        ???
  $BB88: 03 86     SLO ($86,X)
  $BB8A: AF A6 87  LAX $87a6
  $BB8D: 8F 48 DC  SAX $dc48
  $BB90: D4 81     NOP $81,X
  $BB92: AD FF 10  LDA $10ff
  $BB95: 15 2B     ORA $2b,X
  $BB97: 05 1E     ORA $1e
  $BB99: 28        PLP
  $BB9A: FF 01 10  ISB $1001,X
  $BB9D: 0C 02 55  NOP $5502
  $BBA0: FF 01 10  ISB $1001,X
  $BBA3: 23 1E     RLA ($1e,X)
  $BBA5: 0B 1F     ANC #$1f
  $BBA7: 56 3A     LSR $3a,X
  $BBA9: 00        BRK
  $BBAA: 06 26     ASL $26
  $BBAC: FF 01 10  ISB $1001,X
  $BBAF: 02        ???
  $BBB0: 1E FF 01  ASL $01ff,X
  $BBB3: 10 26     BPL $bbdb
  $BBB5: 2D 1E 28  AND $281e
  $BBB8: FF 01 10  ISB $1001,X
  $BBBB: 68        PLA
  $BBBC: 48        PHA
  $BBBD: 09 FF     ORA #$ff
  $BBBF: 00        BRK
  $BBC0: 00        BRK
  $BBC1: 02        ???
  $BBC2: 08        PHP
  $BBC3: EA        NOP
  $BBC4: A6 AD     LDX $ad
  $BBC6: 94 48     STY $48,X
  $BBC8: FF 10 00  ISB $0010,X
  $BBCB: 05 01     ORA $01
  $BBCD: 3A        NOP
  $BBCE: 06 11     ASL $11
  $BBD0: 17 FF     SLO $ff,X
  $BBD2: 01 10     ORA ($10,X)
  $BBD4: 9B B4 81  TAS $81b4,Y
  $BBD7: 8F 48 04  SAX $0448
  $BBDA: 13 1F     SLO ($1f),Y
  $BBDC: FF 01 10  ISB $1001,X
  $BBDF: 15 2B     ORA $2b,X
  $BBE1: 05 1E     ORA $1e
  $BBE3: 28        PLP
  $BBE4: FF 01 10  ISB $1001,X
  $BBE7: 02        ???
  $BBE8: 1E FF 00  ASL $00ff,X
  $BBEB: 00        BRK
  $BBEC: 02        ???
  $BBED: 07 EA     SLO $ea
  $BBEF: AA        TAX
  $BBF0: D1 A6     CMP ($a6),Y
  $BBF2: 9E 48 FF  SHX $ff48,Y
  $BBF5: 10 25     BPL $bc1c
  $BBF7: 2E 10 2D  ROL $2d10
  $BBFA: FF 01 10  ISB $1001,X
  $BBFD: 03 01     SLO ($01,X)
  $BBFF: 08        PHP
  $BC00: 2D FF 01  AND $01ff
  $BC03: 10 1E     BPL $bc23
  $BC05: 0B 0F     ANC #$0f
  $BC07: FF 00 00  ISB $0000,X
  $BC0A: 02        ???
  $BC0B: 09 8A     ORA #$8a
  $BC0D: 82 AD     NOP #$ad
  $BC0F: DD FF 10  CMP $10ff,X
  $BC12: A2 80     LDX #$80
  $BC14: 23 1E     RLA ($1e,X)
  $BC16: 0A        ASL A
  $BC17: 2D FF 00  AND $00ff
  $BC1A: 00        BRK
  $BC1B: 00        BRK
  $BC1C: 00        BRK
  $BC1D: 00        BRK
  $BC1E: 00        BRK
  $BC1F: 00        BRK
  $BC20: 00        BRK
  $BC21: 00        BRK
  $BC22: 00        BRK
  $BC23: 00        BRK
  $BC24: 00        BRK
  $BC25: 00        BRK
  $BC26: 00        BRK
  $BC27: 00        BRK
  $BC28: FE 01 0B  INC $0b01,X
  $BC2B: F1 0C     SBC ($0c),Y
  $BC2D: CB D4     AXS #$d4
  $BC2F: D0 E1     BNE $bc12
  $BC31: D0 D3     BNE $bc06
  $BC33: CE D0 C7  DEC $c7d0
  $BC36: 00        BRK
  $BC37: C5 E3     CMP $e3
  $BC39: FF 01 8C  ISB $8c01,X
  $BC3C: 00        BRK
  $BC3D: 00        BRK
  $BC3E: 00        BRK
  $BC3F: 00        BRK
  $BC40: 00        BRK
  $BC41: 00        BRK
  $BC42: 00        BRK
  $BC43: FF 00 00  ISB $0000,X
  $BC46: 00        BRK
  $BC47: 00        BRK
  $BC48: 00        BRK
  $BC49: 00        BRK
  $BC4A: 00        BRK
  $BC4B: 00        BRK
  $BC4C: 00        BRK
  $BC4D: 00        BRK
  $BC4E: 00        BRK
  $BC4F: 00        BRK
  $BC50: 00        BRK
  $BC51: 00        BRK
  $BC52: 00        BRK
  $BC53: 00        BRK
  $BC54: 00        BRK
  $BC55: 00        BRK
  $BC56: 00        BRK
  $BC57: 00        BRK
  $BC58: 00        BRK
  $BC59: 00        BRK
  $BC5A: 00        BRK
  $BC5B: 00        BRK
  $BC5C: 00        BRK
  $BC5D: 00        BRK
  $BC5E: 00        BRK
  $BC5F: 00        BRK
  $BC60: 00        BRK
  $BC61: 00        BRK
  $BC62: 00        BRK
  $BC63: 00        BRK
  $BC64: 00        BRK
  $BC65: 00        BRK
  $BC66: 00        BRK
  $BC67: 00        BRK
  $BC68: 00        BRK
  $BC69: 00        BRK
  $BC6A: 00        BRK
  $BC6B: 00        BRK
  $BC6C: 00        BRK
  $BC6D: 00        BRK
  $BC6E: 00        BRK
  $BC6F: 00        BRK
  $BC70: 00        BRK
  $BC71: 00        BRK
  $BC72: 00        BRK
  $BC73: 00        BRK
  $BC74: 00        BRK
  $BC75: 00        BRK
  $BC76: 00        BRK
  $BC77: 00        BRK
  $BC78: 00        BRK
  $BC79: 00        BRK
  $BC7A: 00        BRK
  $BC7B: 00        BRK
  $BC7C: 00        BRK
  $BC7D: 00        BRK
  $BC7E: 00        BRK
  $BC7F: 00        BRK
  $BC80: 00        BRK
  $BC81: 00        BRK
  $BC82: 00        BRK
  $BC83: 00        BRK
  $BC84: 00        BRK
  $BC85: 00        BRK
  $BC86: 00        BRK
  $BC87: 00        BRK
  $BC88: 00        BRK
  $BC89: 00        BRK
  $BC8A: 00        BRK
  $BC8B: 00        BRK
  $BC8C: 00        BRK
  $BC8D: 00        BRK
  $BC8E: 00        BRK
  $BC8F: 00        BRK
  $BC90: 00        BRK
  $BC91: 00        BRK
  $BC92: 00        BRK
  $BC93: 00        BRK
  $BC94: 00        BRK
  $BC95: 00        BRK
  $BC96: 00        BRK
  $BC97: 00        BRK
  $BC98: 00        BRK
  $BC99: 00        BRK
  $BC9A: 00        BRK
  $BC9B: 00        BRK
  $BC9C: 00        BRK
  $BC9D: 00        BRK
  $BC9E: 00        BRK
  $BC9F: 00        BRK
  $BCA0: 00        BRK
  $BCA1: 00        BRK
  $BCA2: 00        BRK
  $BCA3: 00        BRK
  $BCA4: 00        BRK
  $BCA5: 00        BRK
  $BCA6: 00        BRK
  $BCA7: 00        BRK
  $BCA8: 00        BRK
  $BCA9: 00        BRK
  $BCAA: 00        BRK
  $BCAB: 00        BRK
  $BCAC: 00        BRK
  $BCAD: 00        BRK
  $BCAE: 00        BRK
  $BCAF: 00        BRK
  $BCB0: 00        BRK
  $BCB1: 00        BRK
  $BCB2: 00        BRK
  $BCB3: 00        BRK
  $BCB4: 00        BRK
  $BCB5: 00        BRK
  $BCB6: 00        BRK
  $BCB7: 00        BRK
  $BCB8: 00        BRK
  $BCB9: 00        BRK
  $BCBA: 00        BRK
  $BCBB: 00        BRK
  $BCBC: 00        BRK
  $BCBD: 00        BRK
  $BCBE: 00        BRK
  $BCBF: 00        BRK
  $BCC0: 00        BRK
  $BCC1: 00        BRK
  $BCC2: 00        BRK
  $BCC3: 00        BRK
  $BCC4: 00        BRK
  $BCC5: 00        BRK
  $BCC6: 00        BRK
  $BCC7: 00        BRK
  $BCC8: 00        BRK
  $BCC9: 00        BRK
  $BCCA: 00        BRK
  $BCCB: 00        BRK
  $BCCC: 00        BRK
  $BCCD: 00        BRK
  $BCCE: 00        BRK
  $BCCF: 00        BRK
  $BCD0: 00        BRK
  $BCD1: 00        BRK
  $BCD2: 00        BRK
  $BCD3: 00        BRK
  $BCD4: 00        BRK
  $BCD5: 00        BRK
  $BCD6: 00        BRK
  $BCD7: 00        BRK
  $BCD8: 00        BRK
  $BCD9: 00        BRK
  $BCDA: 00        BRK
  $BCDB: 00        BRK
  $BCDC: 00        BRK
  $BCDD: 00        BRK
  $BCDE: 00        BRK
  $BCDF: 00        BRK
  $BCE0: 00        BRK
  $BCE1: 00        BRK
  $BCE2: 00        BRK
  $BCE3: 00        BRK
  $BCE4: 00        BRK
  $BCE5: 00        BRK
  $BCE6: 00        BRK
  $BCE7: 00        BRK
  $BCE8: 00        BRK
  $BCE9: 00        BRK
  $BCEA: 00        BRK
  $BCEB: 00        BRK
  $BCEC: 00        BRK
  $BCED: 00        BRK
  $BCEE: 00        BRK
  $BCEF: 00        BRK
  $BCF0: 00        BRK
  $BCF1: 00        BRK
  $BCF2: 00        BRK
  $BCF3: 00        BRK
  $BCF4: 00        BRK
  $BCF5: 00        BRK
  $BCF6: 00        BRK
  $BCF7: 00        BRK
  $BCF8: 00        BRK
  $BCF9: 00        BRK
  $BCFA: 00        BRK
  $BCFB: 00        BRK
  $BCFC: 00        BRK
  $BCFD: 00        BRK
  $BCFE: 00        BRK
  $BCFF: 00        BRK
  $BD00: 00        BRK
  $BD01: 00        BRK
  $BD02: 00        BRK
  $BD03: 00        BRK
  $BD04: 00        BRK
  $BD05: 00        BRK
  $BD06: 00        BRK
  $BD07: 00        BRK
  $BD08: 00        BRK
  $BD09: 00        BRK
  $BD0A: 00        BRK
  $BD0B: 00        BRK
  $BD0C: 00        BRK
  $BD0D: 00        BRK
  $BD0E: 00        BRK
  $BD0F: 00        BRK
  $BD10: 00        BRK
  $BD11: 00        BRK
  $BD12: 00        BRK
  $BD13: 00        BRK
  $BD14: 00        BRK
  $BD15: 00        BRK
  $BD16: 00        BRK
  $BD17: 00        BRK
  $BD18: 00        BRK
  $BD19: 00        BRK
  $BD1A: 00        BRK
  $BD1B: 00        BRK
  $BD1C: 00        BRK
  $BD1D: 00        BRK
  $BD1E: 00        BRK
  $BD1F: 00        BRK
  $BD20: 00        BRK
  $BD21: 00        BRK
  $BD22: 00        BRK
  $BD23: 00        BRK
  $BD24: 00        BRK
  $BD25: 00        BRK
  $BD26: 00        BRK
  $BD27: 00        BRK
  $BD28: 00        BRK
  $BD29: 00        BRK
  $BD2A: 00        BRK
  $BD2B: 00        BRK
  $BD2C: 00        BRK
  $BD2D: 00        BRK
  $BD2E: 00        BRK
  $BD2F: 00        BRK
  $BD30: 00        BRK
  $BD31: 00        BRK
  $BD32: 00        BRK
  $BD33: 00        BRK
  $BD34: 00        BRK
  $BD35: 00        BRK
  $BD36: 00        BRK
  $BD37: 00        BRK
  $BD38: 00        BRK
  $BD39: 00        BRK
  $BD3A: 00        BRK
  $BD3B: 00        BRK
  $BD3C: 00        BRK
  $BD3D: 00        BRK
  $BD3E: 00        BRK
  $BD3F: 00        BRK
  $BD40: 00        BRK
  $BD41: 00        BRK
  $BD42: 00        BRK
  $BD43: 00        BRK
  $BD44: 00        BRK
  $BD45: 00        BRK
  $BD46: 00        BRK
  $BD47: 00        BRK
  $BD48: 00        BRK
  $BD49: 00        BRK
  $BD4A: 00        BRK
  $BD4B: 00        BRK
  $BD4C: 00        BRK
  $BD4D: 00        BRK
  $BD4E: 00        BRK
  $BD4F: 00        BRK
  $BD50: 00        BRK
  $BD51: 00        BRK
  $BD52: 00        BRK
  $BD53: 00        BRK
  $BD54: 00        BRK
  $BD55: 00        BRK
  $BD56: 00        BRK
  $BD57: 00        BRK
  $BD58: 00        BRK
  $BD59: 00        BRK
  $BD5A: 00        BRK
  $BD5B: 00        BRK
  $BD5C: 00        BRK
  $BD5D: 00        BRK
  $BD5E: 00        BRK
  $BD5F: 00        BRK
  $BD60: 00        BRK
  $BD61: 00        BRK
  $BD62: 00        BRK
  $BD63: 00        BRK
  $BD64: 00        BRK
  $BD65: 00        BRK
  $BD66: 00        BRK
  $BD67: 00        BRK
  $BD68: 00        BRK
  $BD69: 00        BRK
  $BD6A: 00        BRK
  $BD6B: 00        BRK
  $BD6C: 00        BRK
  $BD6D: 00        BRK
  $BD6E: 00        BRK
  $BD6F: 00        BRK
  $BD70: 00        BRK
  $BD71: 00        BRK
  $BD72: 00        BRK
  $BD73: 00        BRK
  $BD74: 00        BRK
  $BD75: 00        BRK
  $BD76: 00        BRK
  $BD77: 00        BRK
  $BD78: 00        BRK
  $BD79: 00        BRK
  $BD7A: 00        BRK
  $BD7B: 00        BRK
  $BD7C: 00        BRK
  $BD7D: 00        BRK
  $BD7E: 00        BRK
  $BD7F: 00        BRK
  $BD80: 00        BRK
  $BD81: 00        BRK
  $BD82: 00        BRK
  $BD83: 00        BRK
  $BD84: 00        BRK
  $BD85: 00        BRK
  $BD86: 00        BRK
  $BD87: 00        BRK
  $BD88: 00        BRK
  $BD89: 00        BRK
  $BD8A: 00        BRK
  $BD8B: 00        BRK
  $BD8C: 00        BRK
  $BD8D: 00        BRK
  $BD8E: 00        BRK
  $BD8F: 00        BRK
  $BD90: 00        BRK
  $BD91: 00        BRK
  $BD92: 00        BRK
  $BD93: 00        BRK
  $BD94: 00        BRK
  $BD95: 00        BRK
  $BD96: 00        BRK
  $BD97: 00        BRK
  $BD98: 00        BRK
  $BD99: 00        BRK
  $BD9A: 00        BRK
  $BD9B: 00        BRK
  $BD9C: 00        BRK
  $BD9D: 00        BRK
  $BD9E: 00        BRK
  $BD9F: 00        BRK
  $BDA0: 00        BRK
  $BDA1: 00        BRK
  $BDA2: 00        BRK
  $BDA3: 00        BRK
  $BDA4: 00        BRK
  $BDA5: 00        BRK
  $BDA6: 00        BRK
  $BDA7: 00        BRK
  $BDA8: 00        BRK
  $BDA9: 00        BRK
  $BDAA: 00        BRK
  $BDAB: 00        BRK
  $BDAC: 00        BRK
  $BDAD: 00        BRK
  $BDAE: 00        BRK
  $BDAF: 00        BRK
  $BDB0: 00        BRK
  $BDB1: 00        BRK
  $BDB2: 00        BRK
  $BDB3: 00        BRK
  $BDB4: 00        BRK
  $BDB5: 00        BRK
  $BDB6: 00        BRK
  $BDB7: 00        BRK
  $BDB8: 00        BRK
  $BDB9: 00        BRK
  $BDBA: 00        BRK
  $BDBB: 00        BRK
  $BDBC: 00        BRK
  $BDBD: 00        BRK
  $BDBE: 00        BRK
  $BDBF: 00        BRK
  $BDC0: 00        BRK
  $BDC1: 00        BRK
  $BDC2: 00        BRK
  $BDC3: 00        BRK
  $BDC4: 00        BRK
  $BDC5: 00        BRK
  $BDC6: 00        BRK
  $BDC7: 00        BRK
  $BDC8: 00        BRK
  $BDC9: 00        BRK
  $BDCA: 00        BRK
  $BDCB: 00        BRK
  $BDCC: 00        BRK
  $BDCD: 00        BRK
  $BDCE: 00        BRK
  $BDCF: 00        BRK
  $BDD0: 00        BRK
  $BDD1: 00        BRK
  $BDD2: 00        BRK
  $BDD3: 00        BRK
  $BDD4: 00        BRK
  $BDD5: 00        BRK
  $BDD6: 00        BRK
  $BDD7: 00        BRK
  $BDD8: 00        BRK
  $BDD9: 00        BRK
  $BDDA: 00        BRK
  $BDDB: 00        BRK
  $BDDC: 00        BRK
  $BDDD: 00        BRK
  $BDDE: 00        BRK
  $BDDF: 00        BRK
  $BDE0: 00        BRK
  $BDE1: 00        BRK
  $BDE2: 00        BRK
  $BDE3: 00        BRK
  $BDE4: 00        BRK
  $BDE5: 00        BRK
  $BDE6: 00        BRK
  $BDE7: 00        BRK
  $BDE8: 00        BRK
  $BDE9: 00        BRK
  $BDEA: 00        BRK
  $BDEB: 00        BRK
  $BDEC: 00        BRK
  $BDED: 00        BRK
  $BDEE: 00        BRK
  $BDEF: 00        BRK
  $BDF0: 00        BRK
  $BDF1: 00        BRK
  $BDF2: 00        BRK
  $BDF3: 00        BRK
  $BDF4: 00        BRK
  $BDF5: 00        BRK
  $BDF6: 00        BRK
  $BDF7: 00        BRK
  $BDF8: 00        BRK
  $BDF9: 00        BRK
  $BDFA: 00        BRK
  $BDFB: 00        BRK
  $BDFC: 00        BRK
  $BDFD: 00        BRK
  $BDFE: 00        BRK
  $BDFF: 00        BRK
  $BE00: 00        BRK
  $BE01: 00        BRK
  $BE02: 00        BRK
  $BE03: 00        BRK
  $BE04: 00        BRK
  $BE05: 00        BRK
  $BE06: 00        BRK
  $BE07: 00        BRK
  $BE08: 00        BRK
  $BE09: 00        BRK
  $BE0A: 00        BRK
  $BE0B: 00        BRK
  $BE0C: 00        BRK
  $BE0D: 00        BRK
  $BE0E: 00        BRK
  $BE0F: 00        BRK
  $BE10: 00        BRK
  $BE11: 00        BRK
  $BE12: 00        BRK
  $BE13: 00        BRK
  $BE14: 00        BRK
  $BE15: 00        BRK
  $BE16: 00        BRK
  $BE17: 00        BRK
  $BE18: 00        BRK
  $BE19: 00        BRK
  $BE1A: 00        BRK
  $BE1B: 00        BRK
  $BE1C: 00        BRK
  $BE1D: 00        BRK
  $BE1E: 00        BRK
  $BE1F: 00        BRK
  $BE20: 00        BRK
  $BE21: 00        BRK
  $BE22: 00        BRK
  $BE23: 00        BRK
  $BE24: 00        BRK
  $BE25: 00        BRK
  $BE26: 00        BRK
  $BE27: 00        BRK
  $BE28: 00        BRK
  $BE29: 00        BRK
  $BE2A: 00        BRK
  $BE2B: 00        BRK
  $BE2C: 00        BRK
  $BE2D: 00        BRK
  $BE2E: 00        BRK
  $BE2F: 00        BRK
  $BE30: 00        BRK
  $BE31: 00        BRK
  $BE32: 00        BRK
  $BE33: 00        BRK
  $BE34: 00        BRK
  $BE35: 00        BRK
  $BE36: 00        BRK
  $BE37: 00        BRK
  $BE38: 00        BRK
  $BE39: 00        BRK
  $BE3A: 00        BRK
  $BE3B: 00        BRK
  $BE3C: 00        BRK
  $BE3D: 00        BRK
  $BE3E: 00        BRK
  $BE3F: 00        BRK
  $BE40: 00        BRK
  $BE41: 00        BRK
  $BE42: 00        BRK
  $BE43: 00        BRK
  $BE44: 00        BRK
  $BE45: 00        BRK
  $BE46: 00        BRK
  $BE47: 00        BRK
  $BE48: 00        BRK
  $BE49: 00        BRK
  $BE4A: 00        BRK
  $BE4B: 00        BRK
  $BE4C: 00        BRK
  $BE4D: 00        BRK
  $BE4E: 00        BRK
  $BE4F: 00        BRK
  $BE50: 00        BRK
  $BE51: 00        BRK
  $BE52: 00        BRK
  $BE53: 00        BRK
  $BE54: 00        BRK
  $BE55: 00        BRK
  $BE56: 00        BRK
  $BE57: 00        BRK
  $BE58: 00        BRK
  $BE59: 00        BRK
  $BE5A: 00        BRK
  $BE5B: 00        BRK
  $BE5C: 00        BRK
  $BE5D: 00        BRK
  $BE5E: 00        BRK
  $BE5F: 00        BRK
  $BE60: 00        BRK
  $BE61: 00        BRK
  $BE62: 00        BRK
  $BE63: 00        BRK
  $BE64: 00        BRK
  $BE65: 00        BRK
  $BE66: 00        BRK
  $BE67: 00        BRK
  $BE68: 00        BRK
  $BE69: 00        BRK
  $BE6A: 00        BRK
  $BE6B: 00        BRK
  $BE6C: 00        BRK
  $BE6D: 00        BRK
  $BE6E: 00        BRK
  $BE6F: 00        BRK
  $BE70: 00        BRK
  $BE71: 00        BRK
  $BE72: 00        BRK
  $BE73: 00        BRK
  $BE74: 00        BRK
  $BE75: 00        BRK
  $BE76: 00        BRK
  $BE77: 00        BRK
  $BE78: 00        BRK
  $BE79: 00        BRK
  $BE7A: 00        BRK
  $BE7B: 00        BRK
  $BE7C: 00        BRK
  $BE7D: 00        BRK
  $BE7E: 00        BRK
  $BE7F: 00        BRK
  $BE80: 00        BRK
  $BE81: 00        BRK
  $BE82: 00        BRK
  $BE83: 00        BRK
  $BE84: 00        BRK
  $BE85: 00        BRK
  $BE86: 00        BRK
  $BE87: 00        BRK
  $BE88: 00        BRK
  $BE89: 00        BRK
  $BE8A: 00        BRK
  $BE8B: 00        BRK
  $BE8C: 00        BRK
  $BE8D: 00        BRK
  $BE8E: 00        BRK
  $BE8F: 00        BRK
  $BE90: 00        BRK
  $BE91: 00        BRK
  $BE92: 00        BRK
  $BE93: 00        BRK
  $BE94: 00        BRK
  $BE95: 00        BRK
  $BE96: 00        BRK
  $BE97: 00        BRK
  $BE98: 00        BRK
  $BE99: 00        BRK
  $BE9A: 00        BRK
  $BE9B: 00        BRK
  $BE9C: 00        BRK
  $BE9D: 00        BRK
  $BE9E: 00        BRK
  $BE9F: 00        BRK
  $BEA0: 00        BRK
  $BEA1: 00        BRK
  $BEA2: 00        BRK
  $BEA3: 00        BRK
  $BEA4: 00        BRK
  $BEA5: 00        BRK
  $BEA6: 00        BRK
  $BEA7: 00        BRK
  $BEA8: 00        BRK
  $BEA9: 00        BRK
  $BEAA: 00        BRK
  $BEAB: 00        BRK
  $BEAC: 00        BRK
  $BEAD: 00        BRK
  $BEAE: 00        BRK
  $BEAF: 00        BRK
  $BEB0: 00        BRK
  $BEB1: 00        BRK
  $BEB2: 00        BRK
  $BEB3: 00        BRK
  $BEB4: 00        BRK
  $BEB5: 00        BRK
  $BEB6: 00        BRK
  $BEB7: 00        BRK
  $BEB8: 00        BRK
  $BEB9: 00        BRK
  $BEBA: 00        BRK
  $BEBB: 00        BRK
  $BEBC: 00        BRK
  $BEBD: 00        BRK
  $BEBE: 00        BRK
  $BEBF: 00        BRK
  $BEC0: 00        BRK
  $BEC1: 00        BRK
  $BEC2: 00        BRK
  $BEC3: 00        BRK
  $BEC4: 00        BRK
  $BEC5: 00        BRK
  $BEC6: 00        BRK
  $BEC7: 00        BRK
  $BEC8: 00        BRK
  $BEC9: 00        BRK
  $BECA: 00        BRK
  $BECB: 00        BRK
  $BECC: 00        BRK
  $BECD: 00        BRK
  $BECE: 00        BRK
  $BECF: 00        BRK
  $BED0: 00        BRK
  $BED1: 00        BRK
  $BED2: 00        BRK
  $BED3: 00        BRK
  $BED4: 00        BRK
  $BED5: 00        BRK
  $BED6: 00        BRK
  $BED7: 00        BRK
  $BED8: 00        BRK
  $BED9: 00        BRK
  $BEDA: 00        BRK
  $BEDB: 00        BRK
  $BEDC: 00        BRK
  $BEDD: 00        BRK
  $BEDE: 00        BRK
  $BEDF: 00        BRK
  $BEE0: 00        BRK
  $BEE1: 00        BRK
  $BEE2: 00        BRK
  $BEE3: 00        BRK
  $BEE4: 00        BRK
  $BEE5: 00        BRK
  $BEE6: 00        BRK
  $BEE7: 00        BRK
  $BEE8: 00        BRK
  $BEE9: 00        BRK
  $BEEA: 00        BRK
  $BEEB: 00        BRK
  $BEEC: 00        BRK
  $BEED: 00        BRK
  $BEEE: 00        BRK
  $BEEF: 00        BRK
  $BEF0: 00        BRK
  $BEF1: 00        BRK
  $BEF2: 00        BRK
  $BEF3: 00        BRK
  $BEF4: 00        BRK
  $BEF5: 00        BRK
  $BEF6: 00        BRK
  $BEF7: 00        BRK
  $BEF8: 00        BRK
  $BEF9: 00        BRK
  $BEFA: 00        BRK
  $BEFB: 00        BRK
  $BEFC: 00        BRK
  $BEFD: 00        BRK
  $BEFE: 00        BRK
  $BEFF: 00        BRK
  $BF00: 00        BRK
  $BF01: 00        BRK
  $BF02: 00        BRK
  $BF03: 00        BRK
  $BF04: 00        BRK
  $BF05: 00        BRK
  $BF06: 00        BRK
  $BF07: 00        BRK
  $BF08: 00        BRK
  $BF09: 00        BRK
  $BF0A: 00        BRK
  $BF0B: 00        BRK
  $BF0C: 00        BRK
  $BF0D: 00        BRK
  $BF0E: 00        BRK
  $BF0F: 00        BRK
  $BF10: 00        BRK
  $BF11: 00        BRK
  $BF12: 00        BRK
  $BF13: 00        BRK
  $BF14: 00        BRK
  $BF15: 00        BRK
  $BF16: 00        BRK
  $BF17: 00        BRK
  $BF18: 00        BRK
  $BF19: 00        BRK
  $BF1A: 00        BRK
  $BF1B: 00        BRK
  $BF1C: 00        BRK
  $BF1D: 00        BRK
  $BF1E: 00        BRK
  $BF1F: 00        BRK
  $BF20: 00        BRK
  $BF21: 00        BRK
  $BF22: 00        BRK
  $BF23: 00        BRK
  $BF24: 00        BRK
  $BF25: 00        BRK
  $BF26: 00        BRK
  $BF27: 00        BRK
  $BF28: 00        BRK
  $BF29: 00        BRK
  $BF2A: 00        BRK
  $BF2B: 00        BRK
  $BF2C: 00        BRK
  $BF2D: 00        BRK
  $BF2E: 00        BRK
  $BF2F: 00        BRK
  $BF30: 00        BRK
  $BF31: 00        BRK
  $BF32: 00        BRK
  $BF33: 00        BRK
  $BF34: 00        BRK
  $BF35: 00        BRK
  $BF36: 00        BRK
  $BF37: 00        BRK
  $BF38: 00        BRK
  $BF39: 00        BRK
  $BF3A: 00        BRK
  $BF3B: 00        BRK
  $BF3C: 00        BRK
  $BF3D: 00        BRK
  $BF3E: 00        BRK
  $BF3F: 00        BRK
  $BF40: 00        BRK
  $BF41: 00        BRK
  $BF42: 00        BRK
  $BF43: 00        BRK
  $BF44: 00        BRK
  $BF45: 00        BRK
  $BF46: 00        BRK
  $BF47: 00        BRK
  $BF48: 00        BRK
  $BF49: 00        BRK
  $BF4A: 00        BRK
  $BF4B: 00        BRK
  $BF4C: 00        BRK
  $BF4D: 00        BRK
  $BF4E: 00        BRK
  $BF4F: 00        BRK
  $BF50: 00        BRK
  $BF51: 00        BRK
  $BF52: 00        BRK
  $BF53: 00        BRK
  $BF54: 00        BRK
  $BF55: 00        BRK
  $BF56: 00        BRK
  $BF57: 00        BRK
  $BF58: 00        BRK
  $BF59: 00        BRK
  $BF5A: 00        BRK
  $BF5B: 00        BRK
  $BF5C: 00        BRK
  $BF5D: 00        BRK
  $BF5E: 00        BRK
  $BF5F: 00        BRK
  $BF60: 00        BRK
  $BF61: 00        BRK
  $BF62: 00        BRK
  $BF63: 00        BRK
  $BF64: 00        BRK
  $BF65: 00        BRK
  $BF66: 00        BRK
  $BF67: 00        BRK
  $BF68: 00        BRK
  $BF69: 00        BRK
  $BF6A: 00        BRK
  $BF6B: 00        BRK
  $BF6C: 00        BRK
  $BF6D: 00        BRK
  $BF6E: 00        BRK
  $BF6F: 00        BRK
  $BF70: 00        BRK
  $BF71: 00        BRK
  $BF72: 00        BRK
  $BF73: 00        BRK
  $BF74: 00        BRK
  $BF75: 00        BRK
  $BF76: 00        BRK
  $BF77: 00        BRK
  $BF78: 00        BRK
  $BF79: 00        BRK
  $BF7A: 00        BRK
  $BF7B: 00        BRK
  $BF7C: 00        BRK
  $BF7D: 00        BRK
  $BF7E: 00        BRK
  $BF7F: 00        BRK
  $BF80: 00        BRK
  $BF81: 00        BRK
  $BF82: 00        BRK
  $BF83: 00        BRK
  $BF84: 00        BRK
  $BF85: 00        BRK
  $BF86: 00        BRK
  $BF87: 00        BRK
  $BF88: 00        BRK
  $BF89: 00        BRK
  $BF8A: 00        BRK
  $BF8B: 00        BRK
  $BF8C: 00        BRK
  $BF8D: 00        BRK
  $BF8E: 00        BRK
  $BF8F: 00        BRK
  $BF90: 00        BRK
  $BF91: 00        BRK
  $BF92: 00        BRK
  $BF93: 00        BRK
  $BF94: 00        BRK
  $BF95: 00        BRK
  $BF96: 00        BRK
  $BF97: 00        BRK
  $BF98: 00        BRK
  $BF99: 00        BRK
  $BF9A: 00        BRK
  $BF9B: 00        BRK
  $BF9C: 00        BRK
  $BF9D: 00        BRK
  $BF9E: 00        BRK
  $BF9F: 00        BRK
  $BFA0: 00        BRK
  $BFA1: 00        BRK
  $BFA2: 00        BRK
  $BFA3: 00        BRK
  $BFA4: 00        BRK
  $BFA5: 00        BRK
  $BFA6: 00        BRK
  $BFA7: 00        BRK
  $BFA8: 00        BRK
  $BFA9: 00        BRK
  $BFAA: 00        BRK
  $BFAB: 00        BRK
  $BFAC: 00        BRK
  $BFAD: 00        BRK
  $BFAE: 00        BRK
  $BFAF: 00        BRK
  $BFB0: 00        BRK
  $BFB1: 00        BRK
  $BFB2: 00        BRK
  $BFB3: 00        BRK
  $BFB4: 00        BRK
  $BFB5: 00        BRK
  $BFB6: 00        BRK
  $BFB7: 00        BRK
  $BFB8: 00        BRK
  $BFB9: 00        BRK
  $BFBA: 00        BRK
  $BFBB: 00        BRK
  $BFBC: 00        BRK
  $BFBD: 00        BRK
  $BFBE: 00        BRK
  $BFBF: 00        BRK
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
  $BFDA: 00        BRK
  $BFDB: 00        BRK
  $BFDC: 00        BRK
  $BFDD: 00        BRK
  $BFDE: 00        BRK
  $BFDF: 00        BRK
  $BFE0: 00        BRK
  $BFE1: 00        BRK
  $BFE2: 00        BRK
  $BFE3: 00        BRK
  $BFE4: 00        BRK
  $BFE5: 00        BRK
  $BFE6: 00        BRK
  $BFE7: 00        BRK
  $BFE8: 00        BRK
  $BFE9: 00        BRK
  $BFEA: 00        BRK
  $BFEB: 00        BRK
  $BFEC: 00        BRK
  $BFED: 00        BRK
  $BFEE: 00        BRK
  $BFEF: 00        BRK
  $BFF0: 00        BRK
  $BFF1: 00        BRK
  $BFF2: 00        BRK
  $BFF3: 00        BRK
  $BFF4: 00        BRK
  $BFF5: 00        BRK
  $BFF6: 00        BRK
  $BFF7: 00        BRK
  $BFF8: 00        BRK
  $BFF9: 00        BRK
  $BFFA: 02        ???
  $BFFB: 80 C0     NOP #$c0
  $BFFD: FF 02 80  ISB $8002,X

; ============================================================