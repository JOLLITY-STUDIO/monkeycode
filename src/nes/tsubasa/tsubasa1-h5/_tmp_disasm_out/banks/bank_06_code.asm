; PRG Bank $06
; CPU Address Range: $8000 - $BFFF
; ROM Offset: $18000
; ============================================================

  $8000: 4C 0C C0  JMP $c00c
  $8003: 4C 97 CF  JMP $cf97
  $8006: 4C FC CD  JMP $cdfc
  $8009: 4C 7F D2  JMP $d27f
  $800C: 20 87 DB  JSR $db87
  $800F: A5 E0     LDA $e0
  $8011: 20 17 80  JSR $8017
  $8014: 26 C0     ROL $c0
  $8016: 87 C1     SAX $c1
  $8018: 24 C2     BIT $c2
  $801A: 24 C2     BIT $c2
  $801C: 24 C2     BIT $c2
  $801E: 24 C2     BIT $c2
  $8020: 73 D9     RRA ($d9),Y
  $8022: FC D9 07  NOP $07d9,X
  $8025: D5 AD     CMP $ad,X
  $8027: 1E 07 D0  ASL $d007,X
  $802A: 06 20     ASL $20
  $802C: 0B C4     ANC #$c4
  $802E: EE 1E 07  INC $071e
  $8031: AD 4F 06  LDA $064f
  $8034: C9 09     CMP #$09
  $8036: 90 03     BCC $803b
  $8038: EE F7 06  INC $06f7
  $803B: AD DD 06  LDA $06dd
  $803E: D0 0B     BNE $804b
  $8040: 8D 73 06  STA $0673
  $8043: A2 5F     LDX #$5f
  $8045: 20 7D 80  JSR $807d
  $8048: EE DD 06  INC $06dd
  $804B: 20 B1 CF  JSR $cfb1
  $804E: A9 00     LDA #$00
  $8050: 8D B5 06  STA $06b5
  $8053: 20 27 DB  JSR $db27
  $8056: 20 0E D9  JSR $d90e
  $8059: 20 08 D9  JSR $d908
  $805C: 20 10 C1  JSR $c110
  $805F: A2 00     LDX #$00
  $8061: 8A        TXA
  $8062: 18        CLC
  $8063: 69 06     ADC #$06
  $8065: A8        TAY
  $8066: BD FF 06  LDA $06ff,X
  $8069: D9 FF 06  CMP $06ff,Y
  $806C: 90 0E     BCC $807c
  $806E: 48        PHA
  $806F: B9 FF 06  LDA $06ff,Y
  $8072: 9D FF 06  STA $06ff,X
  $8075: 68        PLA
  $8076: 99 FF 06  STA $06ff,Y
  $8079: BD FF 06  LDA $06ff,X
  $807C: 98        TYA
  $807D: 18        CLC
  $807E: 69 06     ADC #$06
  $8080: A8        TAY
  $8081: C0 18     CPY #$18
  $8083: D0 E4     BNE $8069
  $8085: 20 30 D9  JSR $d930
  $8088: E0 12     CPX #$12
  $808A: D0 D5     BNE $8061
  $808C: A9 00     LDA #$00
  $808E: AA        TAX
  $808F: A8        TAY
  $8090: BD 05 07  LDA $0705,X
  $8093: 29 40     AND #$40
  $8095: F0 01     BEQ $8098
  $8097: C8        INY
  $8098: 20 30 D9  JSR $d930
  $809B: E0 0C     CPX #$0c
  $809D: D0 F1     BNE $8090
  $809F: AD 05 07  LDA $0705
  $80A2: 29 20     AND #$20
  $80A4: F0 03     BEQ $80a9
  $80A6: C8        INY
  $80A7: C8        INY
  $80A8: C8        INY
  $80A9: 8C F8 06  STY $06f8
  $80AC: A0 00     LDY #$00
  $80AE: AD 4F 06  LDA $064f
  $80B1: C9 08     CMP #$08
  $80B3: F0 3F     BEQ $80f4
  $80B5: B0 04     BCS $80bb
  $80B7: 69 02     ADC #$02
  $80B9: D0 3D     BNE $80f8
  $80BB: A0 02     LDY #$02
  $80BD: C9 0D     CMP #$0d
  $80BF: F0 17     BEQ $80d8
  $80C1: B0 2D     BCS $80f0
  $80C3: E9 08     SBC #$08
  $80C5: AA        TAX
  $80C6: BD 5F CE  LDA $ce5f,X
  $80C9: 20 36 CB  JSR $cb36
  $80CC: AA        TAX
  $80CD: BD F9 06  LDA $06f9,X
  $80D0: 29 0F     AND #$0f
  $80D2: AA        TAX
  $80D3: BD E5 CE  LDA $cee5,X
  $80D6: D0 20     BNE $80f8
  $80D8: AD FF 06  LDA $06ff
  $80DB: 18        CLC
  $80DC: 6D 05 07  ADC $0705
  $80DF: 85 00     STA $00
  $80E1: A9 46     LDA #$46
  $80E3: 38        SEC
  $80E4: E5 00     SBC $00
  $80E6: 8D 17 07  STA $0717
  $80E9: 29 0F     AND #$0f
  $80EB: 18        CLC
  $80EC: 69 09     ADC #$09
  $80EE: D0 08     BNE $80f8
  $80F0: 69 05     ADC #$05
  $80F2: D0 04     BNE $80f8
  $80F4: A9 16     LDA #$16
  $80F6: A0 01     LDY #$01
  $80F8: 8D DC 06  STA $06dc
  $80FB: 8C DE 06  STY $06de
  $80FE: A0 00     LDY #$00
  $8100: AD 50 06  LDA $0650
  $8103: C9 07     CMP #$07
  $8105: D0 01     BNE $8108
  $8107: C8        INY
  $8108: 8C 18 07  STY $0718
  $810B: A9 01     LDA #$01
  $810D: 4C A9 DB  JMP $dba9
  $8110: AD F7 06  LDA $06f7
  $8113: F0 31     BEQ $8146
  $8115: AD 4F 06  LDA $064f
  $8118: C9 09     CMP #$09
  $811A: 90 2A     BCC $8146
  $811C: A2 00     LDX #$00
  $811E: 86 00     STX $00
  $8120: A5 00     LDA $00
  $8122: 29 02     AND #$02
  $8124: 4A        LSR A
  $8125: A8        TAY
  $8126: B9 51 06  LDA $0651,Y
  $8129: 48        PHA
  $812A: A5 00     LDA $00
  $812C: 4A        LSR A
  $812D: 68        PLA
  $812E: B0 03     BCS $8133
  $8130: 20 19 D9  JSR $d919
  $8133: 29 0F     AND #$0f
  $8135: A8        TAY
  $8136: B9 DB CE  LDA $cedb,Y
  $8139: 9D FF 06  STA $06ff,X
  $813C: E6 00     INC $00
  $813E: 20 30 D9  JSR $d930
  $8141: E0 18     CPX #$18
  $8143: D0 DB     BNE $8120
  $8145: 60        RTS
  $8146: A9 03     LDA #$03
  $8148: 20 20 DC  JSR $dc20
  $814B: 85 D8     STA $d8
  $814D: A9 03     LDA #$03
  $814F: 20 20 DC  JSR $dc20
  $8152: C5 D8     CMP $d8
  $8154: F0 F0     BEQ $8146
  $8156: AA        TAX
  $8157: BD DC CE  LDA $cedc,X
  $815A: 8D FF 06  STA $06ff
  $815D: A6 D8     LDX $d8
  $815F: BD DC CE  LDA $cedc,X
  $8162: 8D 05 07  STA $0705
  $8165: A9 07     LDA #$07
  $8167: 20 20 DC  JSR $dc20
  $816A: 85 D8     STA $d8
  $816C: A9 07     LDA #$07
  $816E: 20 20 DC  JSR $dc20
  $8171: C5 D8     CMP $d8
  $8173: F0 F0     BEQ $8165
  $8175: AA        TAX
  $8176: BD DF CE  LDA $cedf,X
  $8179: 8D 0B 07  STA $070b
  $817C: A6 D8     LDX $d8
  $817E: BD DF CE  LDA $cedf,X
  $8181: 8D 11 07  STA $0711
  $8184: 4C C5 C5  JMP $c5c5
  $8187: A5 E1     LDA $e1
  $8189: 20 17 80  JSR $8017
  $818C: 96 C1     STX $c1,Y
  $818E: 9D C1 AA  STA $aac1,X
  $8191: C1 DE     CMP ($de,X)
  $8193: C1 FB     CMP ($fb,X)
  $8195: C1 A0     CMP ($a0,X)
  $8197: 00        BRK
  $8198: 8C AB 06  STY $06ab
  $819B: E6 E1     INC $e1
  $819D: AE AB 06  LDX $06ab
  $81A0: E0 0C     CPX #$0c
  $81A2: D0 03     BNE $81a7
  $81A4: E6 E1     INC $e1
  $81A6: 60        RTS
  $81A7: 4C EF DB  JMP $dbef
  $81AA: 20 11 80  JSR $8011
  $81AD: A9 0E     LDA #$0e
  $81AF: 20 B4 DB  JSR $dbb4
  $81B2: A9 0F     LDA #$0f
  $81B4: 20 B4 DB  JSR $dbb4
  $81B7: A2 00     LDX #$00
  $81B9: BD 4A CE  LDA $ce4a,X
  $81BC: 85 DE     STA $de
  $81BE: BD 4B CE  LDA $ce4b,X
  $81C1: 85 DF     STA $df
  $81C3: 8A        TXA
  $81C4: 48        PHA
  $81C5: BD 4C CE  LDA $ce4c,X
  $81C8: 20 4F CD  JSR $cd4f
  $81CB: 68        PLA
  $81CC: AA        TAX
  $81CD: E8        INX
  $81CE: E8        INX
  $81CF: E8        INX
  $81D0: E0 0F     CPX #$0f
  $81D2: D0 E5     BNE $81b9
  $81D4: 20 14 80  JSR $8014
  $81D7: E6 E1     INC $e1
  $81D9: A9 01     LDA #$01
  $81DB: 4C F5 D9  JMP $d9f5
  $81DE: A9 18     LDA #$18
  $81E0: 20 42 DC  JSR $dc42
  $81E3: A9 01     LDA #$01
  $81E5: 8D 9C 06  STA $069c
  $81E8: A9 11     LDA #$11
  $81EA: 20 0F D6  JSR $d60f
  $81ED: A9 E0     LDA #$e0
  $81EF: 8D B3 06  STA $06b3
  $81F2: A9 14     LDA #$14
  $81F4: 85 1A     STA $1a
  $81F6: E6 E1     INC $e1
  $81F8: 4C 1C C2  JMP $c21c
  $81FB: 20 C1 D6  JSR $d6c1
  $81FE: 0A        ASL A
  $81FF: B0 10     BCS $8211
  $8201: CE B3 06  DEC $06b3
  $8204: F0 0B     BEQ $8211
  $8206: AD B3 06  LDA $06b3
  $8209: 29 07     AND #$07
  $820B: D0 03     BNE $8210
  $820D: 20 15 D6  JSR $d615
  $8210: 60        RTS
  $8211: A9 02     LDA #$02
  $8213: 20 A9 DB  JSR $dba9
  $8216: 20 0E D9  JSR $d90e
  $8219: 4C 08 D9  JMP $d908
  $821C: A9 04     LDA #$04
  $821E: 20 A7 D8  JSR $d8a7
  $8221: 4C 08 D9  JMP $d908
  $8224: A5 E1     LDA $e1
  $8226: 20 17 80  JSR $8017
  $8229: 3B C2 E1  RLA $e1c2,Y
  $822C: C2 3D     NOP #$3d
  $822E: C4 76     CPY $76
  $8230: C4 E0     CPY $e0
  $8232: C4 99     CPY $99
  $8234: C5 2A     CMP $2a
  $8236: C8        INY
  $8237: B5 C8     LDA $c8,X
  $8239: C1 C8     CMP ($c8,X)
  $823B: A5 E2     LDA $e2
  $823D: 20 17 80  JSR $8017
  $8240: 4A        LSR A
  $8241: C2 60     NOP #$60
  $8243: C2 6F     NOP #$6f
  $8245: C2 90     NOP #$90
  $8247: C2 AC     NOP #$ac
  $8249: C2 A9     NOP #$a9
  $824B: 10 20     BPL $826d
  $824D: 1E DB 20  ASL $20db,X
  $8250: 00        BRK
  $8251: DC A9 C0  NOP $c0a9,X
  $8254: 8D B6 06  STA $06b6
  $8257: A2 0C     LDX #$0c
  $8259: 8E AB 06  STX $06ab
  $825C: A9 01     LDA #$01
  $825E: 85 E2     STA $e2
  $8260: AE AB 06  LDX $06ab
  $8263: E0 12     CPX #$12
  $8265: D0 05     BNE $826c
  $8267: A9 02     LDA #$02
  $8269: 85 E2     STA $e2
  $826B: 60        RTS
  $826C: 4C EF DB  JMP $dbef
  $826F: A9 00     LDA #$00
  $8271: 8D A5 06  STA $06a5
  $8274: AD DE 06  LDA $06de
  $8277: A8        TAY
  $8278: 18        CLC
  $8279: 69 0A     ADC #$0a
  $827B: AE 4F 06  LDX $064f
  $827E: E0 0D     CPX #$0d
  $8280: 90 03     BCC $8285
  $8282: 88        DEY
  $8283: A9 0B     LDA #$0b
  $8285: 8C C1 06  STY $06c1
  $8288: 20 47 D9  JSR $d947
  $828B: A9 03     LDA #$03
  $828D: 85 E2     STA $e2
  $828F: 60        RTS
  $8290: A9 08     LDA #$08
  $8292: 20 7A D6  JSR $d67a
  $8295: A9 05     LDA #$05
  $8297: 38        SEC
  $8298: ED DE 06  SBC $06de
  $829B: AE 4F 06  LDX $064f
  $829E: E0 0D     CPX #$0d
  $82A0: 90 02     BCC $82a4
  $82A2: 69 00     ADC #$00
  $82A4: 20 F5 D9  JSR $d9f5
  $82A7: A9 04     LDA #$04
  $82A9: 85 E2     STA $e2
  $82AB: 60        RTS
  $82AC: 20 2E C4  JSR $c42e
  $82AF: A2 22     LDX #$22
  $82B1: A0 04     LDY #$04
  $82B3: A9 03     LDA #$03
  $82B5: 2C DE 06  BIT $06de
  $82B8: F0 02     BEQ $82bc
  $82BA: A9 04     LDA #$04
  $82BC: 20 7C D7  JSR $d77c
  $82BF: 20 11 80  JSR $8011
  $82C2: A9 01     LDA #$01
  $82C4: 20 B4 DB  JSR $dbb4
  $82C7: AC DE 06  LDY $06de
  $82CA: F0 05     BEQ $82d1
  $82CC: A9 02     LDA #$02
  $82CE: 20 B4 DB  JSR $dbb4
  $82D1: 20 14 80  JSR $8014
  $82D4: A0 01     LDY #$01
  $82D6: 8C B4 06  STY $06b4
  $82D9: 84 E1     STY $e1
  $82DB: 88        DEY
  $82DC: 84 E2     STY $e2
  $82DE: 84 1A     STY $1a
  $82E0: 60        RTS
  $82E1: A5 E2     LDA $e2
  $82E3: 20 17 80  JSR $8017
  $82E6: F0 C2     BEQ $82aa
  $82E8: 6B C3     ARR #$c3
  $82EA: 7E C3 43  ROR $43c3,X
  $82ED: C3 57     DCP ($57,X)
  $82EF: C3 A2     DCP ($a2,X)
  $82F1: 00        BRK
  $82F2: 8E C0 06  STX $06c0
  $82F5: 86 E4     STX $e4
  $82F7: E8        INX
  $82F8: 8A        TXA
  $82F9: 20 13 CE  JSR $ce13
  $82FC: A6 E4     LDX $e4
  $82FE: 38        SEC
  $82FF: FD B8 06  SBC $06b8,X
  $8302: F0 10     BEQ $8314
  $8304: 48        PHA
  $8305: 20 F8 C3  JSR $c3f8
  $8308: 18        CLC
  $8309: 6D C0 06  ADC $06c0
  $830C: 8D C0 06  STA $06c0
  $830F: 68        PLA
  $8310: 18        CLC
  $8311: 7D B8 06  ADC $06b8,X
  $8314: 9D B8 06  STA $06b8,X
  $8317: E8        INX
  $8318: 86 E4     STX $e4
  $831A: E0 08     CPX #$08
  $831C: D0 D9     BNE $82f7
  $831E: A9 0B     LDA #$0b
  $8320: 20 59 80  JSR $8059
  $8323: A9 1B     LDA #$1b
  $8325: 8D 95 06  STA $0695
  $8328: A9 09     LDA #$09
  $832A: 8D 96 06  STA $0696
  $832D: AD C0 06  LDA $06c0
  $8330: F0 16     BEQ $8348
  $8332: A9 01     LDA #$01
  $8334: 85 E2     STA $e2
  $8336: A9 00     LDA #$00
  $8338: 85 D8     STA $d8
  $833A: 85 D9     STA $d9
  $833C: 85 E7     STA $e7
  $833E: A9 49     LDA #$49
  $8340: 4C 00 D5  JMP $d500
  $8343: A9 67     LDA #$67
  $8345: 20 00 D5  JSR $d500
  $8348: 20 0B C4  JSR $c40b
  $834B: AD 4F 06  LDA $064f
  $834E: C9 0F     CMP #$0f
  $8350: D0 14     BNE $8366
  $8352: A9 04     LDA #$04
  $8354: 85 E2     STA $e2
  $8356: 60        RTS
  $8357: AD B5 06  LDA $06b5
  $835A: 30 0A     BMI $8366
  $835C: 09 80     ORA #$80
  $835E: 8D B5 06  STA $06b5
  $8361: A9 3C     LDA #$3c
  $8363: 20 00 D5  JSR $d500
  $8366: A9 02     LDA #$02
  $8368: 85 E1     STA $e1
  $836A: 60        RTS
  $836B: A6 D8     LDX $d8
  $836D: E6 D8     INC $d8
  $836F: BD B8 06  LDA $06b8,X
  $8372: D0 02     BNE $8376
  $8374: F0 F5     BEQ $836b
  $8376: A2 00     LDX #$00
  $8378: 86 DA     STX $da
  $837A: A9 02     LDA #$02
  $837C: 85 E2     STA $e2
  $837E: A6 DA     LDX $da
  $8380: 20 FD C3  JSR $c3fd
  $8383: C5 D8     CMP $d8
  $8385: D0 02     BNE $8389
  $8387: F0 0A     BEQ $8393
  $8389: E6 DA     INC $da
  $838B: A6 DA     LDX $da
  $838D: E0 1B     CPX #$1b
  $838F: D0 ED     BNE $837e
  $8391: F0 D8     BEQ $836b
  $8393: A5 E7     LDA $e7
  $8395: F0 05     BEQ $839c
  $8397: A9 00     LDA #$00
  $8399: 85 E7     STA $e7
  $839B: 60        RTS
  $839C: A6 DA     LDX $da
  $839E: E0 17     CPX #$17
  $83A0: D0 07     BNE $83a9
  $83A2: AD 18 07  LDA $0718
  $83A5: D0 02     BNE $83a9
  $83A7: F0 0B     BEQ $83b4
  $83A9: E0 19     CPX #$19
  $83AB: D0 10     BNE $83bd
  $83AD: AD 4F 06  LDA $064f
  $83B0: C9 0F     CMP #$0f
  $83B2: F0 09     BEQ $83bd
  $83B4: A9 6A     LDA #$6a
  $83B6: 20 EA C3  JSR $c3ea
  $83B9: F0 21     BEQ $83dc
  $83BB: D0 CC     BNE $8389
  $83BD: E8        INX
  $83BE: 8E 99 06  STX $0699
  $83C1: A5 D9     LDA $d9
  $83C3: 29 03     AND #$03
  $83C5: 85 C8     STA $c8
  $83C7: 18        CLC
  $83C8: 69 13     ADC #$13
  $83CA: 20 7A D6  JSR $d67a
  $83CD: A9 69     LDA #$69
  $83CF: 20 EA C3  JSR $c3ea
  $83D2: F0 08     BEQ $83dc
  $83D4: A4 C8     LDY $c8
  $83D6: C0 03     CPY #$03
  $83D8: F0 02     BEQ $83dc
  $83DA: A9 68     LDA #$68
  $83DC: 20 00 D5  JSR $d500
  $83DF: A5 E7     LDA $e7
  $83E1: F0 01     BEQ $83e4
  $83E3: 60        RTS
  $83E4: E6 D9     INC $d9
  $83E6: E6 E7     INC $e7
  $83E8: D0 9F     BNE $8389
  $83EA: CE C0 06  DEC $06c0
  $83ED: D0 08     BNE $83f7
  $83EF: A2 03     LDX #$03
  $83F1: 86 E2     STX $e2
  $83F3: 86 E7     STX $e7
  $83F5: A2 00     LDX #$00
  $83F7: 60        RTS
  $83F8: BD 8F CF  LDA $cf8f,X
  $83FB: D0 03     BNE $8400
  $83FD: BD 74 CF  LDA $cf74,X
  $8400: AC DE 06  LDY $06de
  $8403: D0 03     BNE $8408
  $8405: 20 19 D9  JSR $d919
  $8408: 29 0F     AND #$0f
  $840A: 60        RTS
  $840B: A2 00     LDX #$00
  $840D: 86 E4     STX $e4
  $840F: E8        INX
  $8410: 8A        TXA
  $8411: 20 13 CE  JSR $ce13
  $8414: A6 E4     LDX $e4
  $8416: 9D B8 06  STA $06b8,X
  $8419: E6 E4     INC $e4
  $841B: E8        INX
  $841C: E0 08     CPX #$08
  $841E: D0 EF     BNE $840f
  $8420: 60        RTS
  $8421: AD B5 06  LDA $06b5
  $8424: 4A        LSR A
  $8425: B0 06     BCS $842d
  $8427: 20 6E 80  JSR $806e
  $842A: EE B5 06  INC $06b5
  $842D: 60        RTS
  $842E: A9 96     LDA #$96
  $8430: 20 A7 D8  JSR $d8a7
  $8433: A9 FF     LDA #$ff
  $8435: 8D 9D 06  STA $069d
  $8438: A9 03     LDA #$03
  $843A: 4C E2 D6  JMP $d6e2
  $843D: A0 01     LDY #$01
  $843F: 84 DA     STY $da
  $8441: 88        DEY
  $8442: 84 E2     STY $e2
  $8444: 84 E3     STY $e3
  $8446: AD C1 06  LDA $06c1
  $8449: 0A        ASL A
  $844A: AA        TAX
  $844B: BD 61 C4  LDA $c461,X
  $844E: 85 D8     STA $d8
  $8450: BD 62 C4  LDA $c462,X
  $8453: 85 D9     STA $d9
  $8455: B1 D8     LDA ($d8),Y
  $8457: 8D C2 06  STA $06c2
  $845A: E6 E1     INC $e1
  $845C: A9 08     LDA #$08
  $845E: 4C F5 D9  JMP $d9f5
  $8461: 67 C4     RRA $c4
  $8463: 6B C4     ARR #$c4
  $8465: 70 C4     BVS $842b
  $8467: 03 04     SLO ($04,X)
  $8469: 05 06     ORA $06
  $846B: 04 04     NOP $04
  $846D: 05 07     ORA $07
  $846F: 06 05     ASL $05
  $8471: 04 05     NOP $05
  $8473: 08        PHP
  $8474: 07 06     SLO $06
  $8476: 20 C1 D6  JSR $d6c1
  $8479: AA        TAX
  $847A: 29 0C     AND #$0c
  $847C: F0 20     BEQ $849e
  $847E: 29 08     AND #$08
  $8480: F0 0D     BEQ $848f
  $8482: C6 DA     DEC $da
  $8484: A6 DA     LDX $da
  $8486: D0 16     BNE $849e
  $8488: AE C2 06  LDX $06c2
  $848B: 86 DA     STX $da
  $848D: D0 0F     BNE $849e
  $848F: E6 DA     INC $da
  $8491: A6 DA     LDX $da
  $8493: EC C2 06  CPX $06c2
  $8496: F0 06     BEQ $849e
  $8498: 90 04     BCC $849e
  $849A: A2 01     LDX #$01
  $849C: 86 DA     STX $da
  $849E: 8A        TXA
  $849F: 29 10     AND #$10
  $84A1: D0 29     BNE $84cc
  $84A3: A5 DA     LDA $da
  $84A5: 20 1E D9  JSR $d91e
  $84A8: 18        CLC
  $84A9: 69 0F     ADC #$0f
  $84AB: A8        TAY
  $84AC: A2 A8     LDX #$a8
  $84AE: A9 36     LDA #$36
  $84B0: 20 E5 D6  JSR $d6e5
  $84B3: 20 2E C4  JSR $c42e
  $84B6: 20 F4 D6  JSR $d6f4
  $84B9: 20 08 D9  JSR $d908
  $84BC: 20 C1 D6  JSR $d6c1
  $84BF: 0A        ASL A
  $84C0: 90 09     BCC $84cb
  $84C2: A4 DA     LDY $da
  $84C4: B1 D8     LDA ($d8),Y
  $84C6: 85 E1     STA $e1
  $84C8: 20 39 DB  JSR $db39
  $84CB: 60        RTS
  $84CC: A9 1C     LDA #$1c
  $84CE: 20 59 80  JSR $8059
  $84D1: 20 21 C4  JSR $c421
  $84D4: 20 74 80  JSR $8074
  $84D7: 20 6B 80  JSR $806b
  $84DA: 20 81 C9  JSR $c981
  $84DD: 4C 24 C2  JMP $c224
  $84E0: A5 E3     LDA $e3
  $84E2: 20 17 80  JSR $8017
  $84E5: F3 C4     ISB ($c4),Y
  $84E7: 1A        NOP
  $84E8: C5 37     CMP $37
  $84EA: C5 3E     CMP $3e
  $84EC: C5 6B     CMP $6b
  $84EE: C5 72     CMP $72
  $84F0: C5 81     CMP $81
  $84F2: C5 A9     CMP $a9
  $84F4: 15 AE     ORA $ae,X
  $84F6: DE 06 F0  DEC $f006,X
  $84F9: 02        ???
  $84FA: A9 16     LDA #$16
  $84FC: 20 42 DC  JSR $dc42
  $84FF: 20 08 D9  JSR $d908
  $8502: A2 CC     LDX #$cc
  $8504: A0 A8     LDY #$a8
  $8506: 8E AD 06  STX $06ad
  $8509: 8C AE 06  STY $06ae
  $850C: A9 01     LDA #$01
  $850E: 8D 9C 06  STA $069c
  $8511: E6 E3     INC $e3
  $8513: A9 04     LDA #$04
  $8515: A2 09     LDX #$09
  $8517: 4C 37 D9  JMP $d937
  $851A: AD B6 06  LDA $06b6
  $851D: 18        CLC
  $851E: 69 04     ADC #$04
  $8520: 8D B6 06  STA $06b6
  $8523: 30 11     BMI $8536
  $8525: A9 00     LDA #$00
  $8527: 8D B6 06  STA $06b6
  $852A: A9 2D     LDA #$2d
  $852C: 8D A5 06  STA $06a5
  $852F: A9 0D     LDA #$0d
  $8531: 20 47 D9  JSR $d947
  $8534: E6 E3     INC $e3
  $8536: 60        RTS
  $8537: E6 E3     INC $e3
  $8539: A9 02     LDA #$02
  $853B: 4C F5 D9  JMP $d9f5
  $853E: AD 4F 06  LDA $064f
  $8541: C9 09     CMP #$09
  $8543: 90 1B     BCC $8560
  $8545: C9 0E     CMP #$0e
  $8547: B0 12     BCS $855b
  $8549: E9 08     SBC #$08
  $854B: AA        TAX
  $854C: BD 5F CE  LDA $ce5f,X
  $854F: 20 36 CB  JSR $cb36
  $8552: AA        TAX
  $8553: BD F9 06  LDA $06f9,X
  $8556: 29 0F     AND #$0f
  $8558: 4C 63 C5  JMP $c563
  $855B: 4A        LSR A
  $855C: A9 0B     LDA #$0b
  $855E: 69 00     ADC #$00
  $8560: 18        CLC
  $8561: 69 E4     ADC #$e4
  $8563: E6 E3     INC $e3
  $8565: 18        CLC
  $8566: 69 5C     ADC #$5c
  $8568: 4C 00 D5  JMP $d500
  $856B: E6 E3     INC $e3
  $856D: A9 06     LDA #$06
  $856F: 4C F5 D9  JMP $d9f5
  $8572: 20 39 DB  JSR $db39
  $8575: E6 E3     INC $e3
  $8577: A9 24     LDA #$24
  $8579: 8D A5 06  STA $06a5
  $857C: A9 0D     LDA #$0d
  $857E: 4C 47 D9  JMP $d947
  $8581: AD B6 06  LDA $06b6
  $8584: 38        SEC
  $8585: E9 04     SBC #$04
  $8587: 8D B6 06  STA $06b6
  $858A: C9 C0     CMP #$c0
  $858C: B0 0A     BCS $8598
  $858E: A9 C0     LDA #$c0
  $8590: 8D B6 06  STA $06b6
  $8593: A9 02     LDA #$02
  $8595: 8D E1 00  STA $00e1
  $8598: 60        RTS
  $8599: A5 E2     LDA $e2
  $859B: 20 17 80  JSR $8017
  $859E: A6 C5     LDX $c5
  $85A0: E9 C5     SBC #$c5
  $85A2: FF C5 81  ISB $81c5,X
  $85A5: C9 A9     CMP #$a9
  $85A7: 13 20     SLO ($20),Y
  $85A9: 59 80 A9  EOR $a980,Y
  $85AC: 05 20     ORA $20
  $85AE: 1E DB 20  ASL $20db,X
  $85B1: C5 C5     CMP $c5
  $85B3: 20 06 C6  JSR $c606
  $85B6: E6 E2     INC $e2
  $85B8: A9 07     LDA #$07
  $85BA: A2 00     LDX #$00
  $85BC: 8E 9C 06  STX $069c
  $85BF: 8E B6 06  STX $06b6
  $85C2: 4C 37 D9  JMP $d937
  $85C5: A2 00     LDX #$00
  $85C7: A0 00     LDY #$00
  $85C9: BD FF 06  LDA $06ff,X
  $85CC: 20 1E D9  JSR $d91e
  $85CF: 99 51 06  STA $0651,Y
  $85D2: BD 05 07  LDA $0705,X
  $85D5: 29 0F     AND #$0f
  $85D7: 19 51 06  ORA $0651,Y
  $85DA: 99 51 06  STA $0651,Y
  $85DD: 20 30 D9  JSR $d930
  $85E0: 20 30 D9  JSR $d930
  $85E3: C8        INY
  $85E4: C0 02     CPY #$02
  $85E6: D0 E1     BNE $85c9
  $85E8: 60        RTS
  $85E9: A9 14     LDA #$14
  $85EB: 20 42 DC  JSR $dc42
  $85EE: A9 06     LDA #$06
  $85F0: 20 0F D6  JSR $d60f
  $85F3: A9 00     LDA #$00
  $85F5: 20 78 D7  JSR $d778
  $85F8: E6 E2     INC $e2
  $85FA: A9 07     LDA #$07
  $85FC: 4C F5 D9  JMP $d9f5
  $85FF: E6 E2     INC $e2
  $8601: A9 3F     LDA #$3f
  $8603: 4C 00 D5  JMP $d500
  $8606: AD 4F 06  LDA $064f
  $8609: 29 0F     AND #$0f
  $860B: 8D 20 06  STA $0620
  $860E: AD 52 06  LDA $0652
  $8611: 20 1E D9  JSR $d91e
  $8614: 0D 20 06  ORA $0620
  $8617: 8D 20 06  STA $0620
  $861A: AD ED 06  LDA $06ed
  $861D: 8D 21 06  STA $0621
  $8620: AD F1 06  LDA $06f1
  $8623: 8D 22 06  STA $0622
  $8626: AD E0 06  LDA $06e0
  $8629: 8D 23 06  STA $0623
  $862C: AD E4 06  LDA $06e4
  $862F: 8D 24 06  STA $0624
  $8632: AD 52 06  LDA $0652
  $8635: 4A        LSR A
  $8636: 4A        LSR A
  $8637: 29 3C     AND #$3c
  $8639: 8D 25 06  STA $0625
  $863C: AD F4 06  LDA $06f4
  $863F: 6A        ROR A
  $8640: 6A        ROR A
  $8641: 6A        ROR A
  $8642: 29 C0     AND #$c0
  $8644: 0D 25 06  ORA $0625
  $8647: 8D 25 06  STA $0625
  $864A: AD E8 06  LDA $06e8
  $864D: 8D 26 06  STA $0626
  $8650: AD EF 06  LDA $06ef
  $8653: 8D 27 06  STA $0627
  $8656: AD E9 06  LDA $06e9
  $8659: 8D 28 06  STA $0628
  $865C: AD F0 06  LDA $06f0
  $865F: 29 03     AND #$03
  $8661: 8D 29 06  STA $0629
  $8664: AD 51 06  LDA $0651
  $8667: 20 1E D9  JSR $d91e
  $866A: 0D 29 06  ORA $0629
  $866D: 8D 29 06  STA $0629
  $8670: AD E5 06  LDA $06e5
  $8673: 8D 2A 06  STA $062a
  $8676: AD E2 06  LDA $06e2
  $8679: 8D 2B 06  STA $062b
  $867C: AD DF 06  LDA $06df
  $867F: 8D 2C 06  STA $062c
  $8682: AD E3 06  LDA $06e3
  $8685: 8D 2D 06  STA $062d
  $8688: AD EA 06  LDA $06ea
  $868B: 8D 2E 06  STA $062e
  $868E: AD 51 06  LDA $0651
  $8691: 20 19 D9  JSR $d919
  $8694: 8D 2F 06  STA $062f
  $8697: AD F2 06  LDA $06f2
  $869A: 6A        ROR A
  $869B: 6A        ROR A
  $869C: 6A        ROR A
  $869D: 29 C0     AND #$c0
  $869F: 0D 2F 06  ORA $062f
  $86A2: 8D 2F 06  STA $062f
  $86A5: AD E7 06  LDA $06e7
  $86A8: 8D 30 06  STA $0630
  $86AB: AD F3 06  LDA $06f3
  $86AE: 8D 31 06  STA $0631
  $86B1: AD EC 06  LDA $06ec
  $86B4: 8D 32 06  STA $0632
  $86B7: AD E6 06  LDA $06e6
  $86BA: 8D 33 06  STA $0633
  $86BD: AD EB 06  LDA $06eb
  $86C0: 8D 34 06  STA $0634
  $86C3: AD E1 06  LDA $06e1
  $86C6: 8D 35 06  STA $0635
  $86C9: AD 50 06  LDA $0650
  $86CC: 29 07     AND #$07
  $86CE: 8D 36 06  STA $0636
  $86D1: AD 54 06  LDA $0654
  $86D4: 0A        ASL A
  $86D5: 0A        ASL A
  $86D6: 0A        ASL A
  $86D7: 29 08     AND #$08
  $86D9: 0D 36 06  ORA $0636
  $86DC: 8D 36 06  STA $0636
  $86DF: AD 53 06  LDA $0653
  $86E2: 20 1E D9  JSR $d91e
  $86E5: 29 10     AND #$10
  $86E7: 0D 36 06  ORA $0636
  $86EA: 8D 36 06  STA $0636
  $86ED: AD EE 06  LDA $06ee
  $86F0: 8D 37 06  STA $0637
  $86F3: 20 D0 C7  JSR $c7d0
  $86F6: A5 0E     LDA $0e
  $86F8: 48        PHA
  $86F9: 29 03     AND #$03
  $86FB: 0D 25 06  ORA $0625
  $86FE: 8D 25 06  STA $0625
  $8701: 68        PLA
  $8702: 48        PHA
  $8703: 29 0C     AND #$0c
  $8705: 0D 29 06  ORA $0629
  $8708: 8D 29 06  STA $0629
  $870B: 68        PLA
  $870C: 48        PHA
  $870D: 29 30     AND #$30
  $870F: 0D 2F 06  ORA $062f
  $8712: 8D 2F 06  STA $062f
  $8715: 68        PLA
  $8716: 29 C0     AND #$c0
  $8718: 0D 36 06  ORA $0636
  $871B: 8D 36 06  STA $0636
  $871E: A5 0F     LDA $0f
  $8720: 6A        ROR A
  $8721: 6A        ROR A
  $8722: 6A        ROR A
  $8723: 6A        ROR A
  $8724: 29 20     AND #$20
  $8726: 0D 36 06  ORA $0636
  $8729: 8D 36 06  STA $0636
  $872C: A9 00     LDA #$00
  $872E: 85 07     STA $07
  $8730: 85 08     STA $08
  $8732: 85 09     STA $09
  $8734: A5 07     LDA $07
  $8736: 48        PHA
  $8737: 0A        ASL A
  $8738: 85 08     STA $08
  $873A: 68        PLA
  $873B: 6D 08 00  ADC $0008
  $873E: AA        TAX
  $873F: A5 09     LDA $09
  $8741: 0A        ASL A
  $8742: 0A        ASL A
  $8743: A8        TAY
  $8744: BD 20 06  LDA $0620,X
  $8747: 48        PHA
  $8748: 29 3F     AND #$3f
  $874A: 99 00 06  STA $0600,Y
  $874D: 68        PLA
  $874E: 2A        ROL A
  $874F: 2A        ROL A
  $8750: 2A        ROL A
  $8751: 29 03     AND #$03
  $8753: 99 01 06  STA $0601,Y
  $8756: BD 21 06  LDA $0621,X
  $8759: 48        PHA
  $875A: 0A        ASL A
  $875B: 0A        ASL A
  $875C: 29 3C     AND #$3c
  $875E: 19 01 06  ORA $0601,Y
  $8761: 99 01 06  STA $0601,Y
  $8764: 68        PLA
  $8765: 20 19 D9  JSR $d919
  $8768: 99 02 06  STA $0602,Y
  $876B: BD 22 06  LDA $0622,X
  $876E: 48        PHA
  $876F: 20 1E D9  JSR $d91e
  $8772: 29 30     AND #$30
  $8774: 19 02 06  ORA $0602,Y
  $8777: 99 02 06  STA $0602,Y
  $877A: 68        PLA
  $877B: 4A        LSR A
  $877C: 4A        LSR A
  $877D: 99 03 06  STA $0603,Y
  $8780: E6 07     INC $07
  $8782: E6 09     INC $09
  $8784: A5 07     LDA $07
  $8786: C9 08     CMP #$08
  $8788: D0 AA     BNE $8734
  $878A: 20 EE C7  JSR $c7ee
  $878D: A2 20     LDX #$20
  $878F: BD FF 05  LDA $05ff,X
  $8792: 9D 17 06  STA $0617,X
  $8795: CA        DEX
  $8796: D0 F7     BNE $878f
  $8798: 8A        TXA
  $8799: A8        TAY
  $879A: 85 00     STA $00
  $879C: 86 01     STX $01
  $879E: A6 00     LDX $00
  $87A0: E6 00     INC $00
  $87A2: BD CA C7  LDA $c7ca,X
  $87A5: A6 01     LDX $01
  $87A7: 85 02     STA $02
  $87A9: BD 18 06  LDA $0618,X
  $87AC: 99 00 06  STA $0600,Y
  $87AF: C8        INY
  $87B0: E8        INX
  $87B1: C6 02     DEC $02
  $87B3: D0 F4     BNE $87a9
  $87B5: A9 3A     LDA #$3a
  $87B7: 99 00 06  STA $0600,Y
  $87BA: C8        INY
  $87BB: A5 00     LDA $00
  $87BD: C9 06     CMP #$06
  $87BF: D0 DB     BNE $879c
  $87C1: A9 FF     LDA #$ff
  $87C3: 8D 12 06  STA $0612
  $87C6: 8D 26 06  STA $0626
  $87C9: 60        RTS
  $87CA: 05 05     ORA $05
  $87CC: 06 05     ASL $05
  $87CE: 05 06     ORA $06
  $87D0: A9 00     LDA #$00
  $87D2: 85 0E     STA $0e
  $87D4: 85 0F     STA $0f
  $87D6: A2 17     LDX #$17
  $87D8: BD 20 06  LDA $0620,X
  $87DB: 18        CLC
  $87DC: 65 0E     ADC $0e
  $87DE: 85 0E     STA $0e
  $87E0: 90 02     BCC $87e4
  $87E2: E6 0F     INC $0f
  $87E4: CA        DEX
  $87E5: 10 F1     BPL $87d8
  $87E7: A9 01     LDA #$01
  $87E9: 25 0F     AND $0f
  $87EB: 85 0F     STA $0f
  $87ED: 60        RTS
  $87EE: A2 1F     LDX #$1f
  $87F0: BD 00 06  LDA $0600,X
  $87F3: 18        CLC
  $87F4: 7D 0A C8  ADC $c80a,X
  $87F7: 29 3F     AND #$3f
  $87F9: C9 23     CMP #$23
  $87FB: 90 06     BCC $8803
  $87FD: E9 23     SBC #$23
  $87FF: A8        TAY
  $8800: B9 18 CF  LDA $cf18,Y
  $8803: 9D 00 06  STA $0600,X
  $8806: CA        DEX
  $8807: 10 E7     BPL $87f0
  $8809: 60        RTS
  $880A: 57 16     SRE $16,X
  $880C: 88        DEY
  $880D: 31 92     AND ($92),Y
  $880F: 43 26     SRE ($26,X)
  $8811: 16 38     ASL $38,X
  $8813: 62        ???
  $8814: 40        RTI
  $8815: 50 78     BVC $888f
  $8817: 61 12     ADC ($12,X)
  $8819: 22        ???
  $881A: 64 21     NOP $21
  $881C: 13 23     SLO ($23),Y
  $881E: 49 82     EOR #$82
  $8820: 69 45     ADC #$45
  $8822: 24 97     BIT $97
  $8824: 47 85     SRE $85
  $8826: 08        PHP
  $8827: 17 12     SLO $12,X
  $8829: 10 A5     BPL $87d0
  $882B: E3 20     ISB ($20,X)
  $882D: 17 80     SLO $80,X
  $882F: 3D C8 1A  AND $1ac8,X
  $8832: C5 37     CMP $37
  $8834: C5 6E     CMP $6e
  $8836: C8        INY
  $8837: 6B C5     ARR #$c5
  $8839: 72        ???
  $883A: C5 86     CMP $86
  $883C: C8        INY
  $883D: AC 4F 06  LDY $064f
  $8840: C0 0E     CPY #$0e
  $8842: D0 09     BNE $884d
  $8844: AD 18 07  LDA $0718
  $8847: F0 04     BEQ $884d
  $8849: A9 05     LDA #$05
  $884B: D0 03     BNE $8850
  $884D: B9 49 F7  LDA $f749,Y
  $8850: 20 42 DC  JSR $dc42
  $8853: 20 08 D9  JSR $d908
  $8856: A2 CC     LDX #$cc
  $8858: A0 A8     LDY #$a8
  $885A: 8E AD 06  STX $06ad
  $885D: 8C AE 06  STY $06ae
  $8860: A9 01     LDA #$01
  $8862: 8D 9C 06  STA $069c
  $8865: E6 E3     INC $e3
  $8867: A9 04     LDA #$04
  $8869: A2 09     LDX #$09
  $886B: 4C 37 D9  JMP $d937
  $886E: E6 E3     INC $e3
  $8870: AD 4F 06  LDA $064f
  $8873: C9 0E     CMP #$0e
  $8875: D0 09     BNE $8880
  $8877: AE 18 07  LDX $0718
  $887A: F0 04     BEQ $8880
  $887C: A9 4A     LDA #$4a
  $887E: D0 03     BNE $8883
  $8880: 18        CLC
  $8881: 69 4D     ADC #$4d
  $8883: 4C 00 D5  JMP $d500
  $8886: AD B6 06  LDA $06b6
  $8889: 38        SEC
  $888A: E9 04     SBC #$04
  $888C: 8D B6 06  STA $06b6
  $888F: C9 C0     CMP #$c0
  $8891: B0 21     BCS $88b4
  $8893: A9 C0     LDA #$c0
  $8895: 8D B6 06  STA $06b6
  $8898: 20 0E D9  JSR $d90e
  $889B: 20 08 D9  JSR $d908
  $889E: 20 21 C4  JSR $c421
  $88A1: 20 74 80  JSR $8074
  $88A4: A2 36     LDX #$36
  $88A6: 20 7D 80  JSR $807d
  $88A9: A9 01     LDA #$01
  $88AB: 20 59 80  JSR $8059
  $88AE: 20 A7 DB  JSR $dba7
  $88B1: EE CA 03  INC $03ca
  $88B4: 60        RTS
  $88B5: 20 21 C4  JSR $c421
  $88B8: 20 65 80  JSR $8065
  $88BB: 20 81 C9  JSR $c981
  $88BE: 4C 24 C2  JMP $c224
  $88C1: A5 E3     LDA $e3
  $88C3: 20 17 80  JSR $8017
  $88C6: CC C8 4D  CPY $4dc8
  $88C9: C9 68     CMP #$68
  $88CB: C9 20     CMP #$20
  $88CD: 0E D9 20  ASL $20d9
  $88D0: 05 80     ORA $80
  $88D2: 20 00 DC  JSR $dc00
  $88D5: A9 E0     LDA #$e0
  $88D7: 85 17     STA $17
  $88D9: 8D B7 06  STA $06b7
  $88DC: A9 08     LDA #$08
  $88DE: 20 1E DB  JSR $db1e
  $88E1: A9 00     LDA #$00
  $88E3: 85 C8     STA $c8
  $88E5: A5 C8     LDA $c8
  $88E7: 0A        ASL A
  $88E8: AA        TAX
  $88E9: BC 30 CE  LDY $ce30,X
  $88EC: BD 31 CE  LDA $ce31,X
  $88EF: AA        TAX
  $88F0: A9 05     LDA #$05
  $88F2: 18        CLC
  $88F3: 65 C8     ADC $c8
  $88F5: 20 7C D7  JSR $d77c
  $88F8: E6 C8     INC $c8
  $88FA: A5 C8     LDA $c8
  $88FC: C9 08     CMP #$08
  $88FE: D0 E5     BNE $88e5
  $8900: 20 11 80  JSR $8011
  $8903: A9 09     LDA #$09
  $8905: 20 B4 DB  JSR $dbb4
  $8908: A9 0A     LDA #$0a
  $890A: 20 B4 DB  JSR $dbb4
  $890D: A5 19     LDA $19
  $890F: 09 04     ORA #$04
  $8911: 8D 00 20  STA $2000
  $8914: A9 0F     LDA #$0f
  $8916: 20 7A D6  JSR $d67a
  $8919: 20 9C CC  JSR $cc9c
  $891C: A9 FF     LDA #$ff
  $891E: 8D 07 20  STA $2007
  $8921: 8D 07 20  STA $2007
  $8924: A5 19     LDA $19
  $8926: 8D 00 20  STA $2000
  $8929: 20 D6 C9  JSR $c9d6
  $892C: 20 3E CB  JSR $cb3e
  $892F: 20 67 CB  JSR $cb67
  $8932: 20 42 CB  JSR $cb42
  $8935: 20 AA CB  JSR $cbaa
  $8938: 20 14 80  JSR $8014
  $893B: E6 E3     INC $e3
  $893D: 20 8C C9  JSR $c98c
  $8940: A9 06     LDA #$06
  $8942: 20 A7 D8  JSR $d8a7
  $8945: A9 96     LDA #$96
  $8947: 20 A7 D8  JSR $d8a7
  $894A: 4C 08 D9  JMP $d908
  $894D: 20 BF D4  JSR $d4bf
  $8950: 09 02     ORA #$02
  $8952: 85 19     STA $19
  $8954: 20 C1 D6  JSR $d6c1
  $8957: 0A        ASL A
  $8958: B0 24     BCS $897e
  $895A: 29 02     AND #$02
  $895C: F0 1F     BEQ $897d
  $895E: E6 E3     INC $e3
  $8960: A9 0B     LDA #$0b
  $8962: 20 E2 D6  JSR $d6e2
  $8965: 4C F4 D6  JMP $d6f4
  $8968: 20 BF D4  JSR $d4bf
  $896B: 20 C1 D6  JSR $d6c1
  $896E: 0A        ASL A
  $896F: B0 0D     BCS $897e
  $8971: 29 04     AND #$04
  $8973: F0 08     BEQ $897d
  $8975: C6 E3     DEC $e3
  $8977: 20 8C C9  JSR $c98c
  $897A: 20 F4 D6  JSR $d6f4
  $897D: 60        RTS
  $897E: 20 BF D4  JSR $d4bf
  $8981: A9 02     LDA #$02
  $8983: 20 A9 DB  JSR $dba9
  $8986: 20 0E D9  JSR $d90e
  $8989: 4C 08 D9  JMP $d908
  $898C: A9 00     LDA #$00
  $898E: 85 1B     STA $1b
  $8990: AE AF 06  LDX $06af
  $8993: A9 6F     LDA #$6f
  $8995: 8D AE 06  STA $06ae
  $8998: A9 05     LDA #$05
  $899A: 85 00     STA $00
  $899C: A9 50     LDA #$50
  $899E: 8D AD 06  STA $06ad
  $89A1: A0 05     LDY #$05
  $89A3: AD AE 06  LDA $06ae
  $89A6: 9D 00 02  STA $0200,X
  $89A9: A9 E7     LDA #$e7
  $89AB: 9D 01 02  STA $0201,X
  $89AE: A9 23     LDA #$23
  $89B0: 9D 02 02  STA $0202,X
  $89B3: AD AD 06  LDA $06ad
  $89B6: 9D 03 02  STA $0203,X
  $89B9: 18        CLC
  $89BA: 69 28     ADC #$28
  $89BC: 8D AD 06  STA $06ad
  $89BF: 20 32 D9  JSR $d932
  $89C2: 88        DEY
  $89C3: D0 DE     BNE $89a3
  $89C5: AD AE 06  LDA $06ae
  $89C8: 18        CLC
  $89C9: 69 18     ADC #$18
  $89CB: 8D AE 06  STA $06ae
  $89CE: C6 00     DEC $00
  $89D0: D0 CA     BNE $899c
  $89D2: 8E AF 06  STX $06af
  $89D5: 60        RTS
  $89D6: A9 00     LDA #$00
  $89D8: AA        TAX
  $89D9: A0 05     LDY #$05
  $89DB: 9D FA 06  STA $06fa,X
  $89DE: E8        INX
  $89DF: 88        DEY
  $89E0: D0 F9     BNE $89db
  $89E2: E8        INX
  $89E3: E0 1E     CPX #$1e
  $89E5: D0 F2     BNE $89d9
  $89E7: AD 4F 06  LDA $064f
  $89EA: 38        SEC
  $89EB: E9 09     SBC #$09
  $89ED: F0 02     BEQ $89f1
  $89EF: B0 01     BCS $89f2
  $89F1: 60        RTS
  $89F2: 0A        ASL A
  $89F3: 85 02     STA $02
  $89F5: A0 00     LDY #$00
  $89F7: 98        TYA
  $89F8: 4A        LSR A
  $89F9: AA        TAX
  $89FA: BD 5F CE  LDA $ce5f,X
  $89FD: 20 36 CB  JSR $cb36
  $8A00: AA        TAX
  $8A01: B9 EF 06  LDA $06ef,Y
  $8A04: 48        PHA
  $8A05: 48        PHA
  $8A06: 18        CLC
  $8A07: 6D FC 06  ADC $06fc
  $8A0A: 8D FC 06  STA $06fc
  $8A0D: 68        PLA
  $8A0E: 18        CLC
  $8A0F: 7D FD 06  ADC $06fd,X
  $8A12: 9D FD 06  STA $06fd,X
  $8A15: B9 F0 06  LDA $06f0,Y
  $8A18: 48        PHA
  $8A19: 18        CLC
  $8A1A: 6D FD 06  ADC $06fd
  $8A1D: 8D FD 06  STA $06fd
  $8A20: 68        PLA
  $8A21: 18        CLC
  $8A22: 7D FC 06  ADC $06fc,X
  $8A25: 9D FC 06  STA $06fc,X
  $8A28: 68        PLA
  $8A29: D9 F0 06  CMP $06f0,Y
  $8A2C: 90 0C     BCC $8a3a
  $8A2E: 08        PHP
  $8A2F: EE FA 06  INC $06fa
  $8A32: 28        PLP
  $8A33: F0 08     BEQ $8a3d
  $8A35: EE FA 06  INC $06fa
  $8A38: D0 06     BNE $8a40
  $8A3A: FE FA 06  INC $06fa,X
  $8A3D: FE FA 06  INC $06fa,X
  $8A40: C8        INY
  $8A41: C8        INY
  $8A42: C4 02     CPY $02
  $8A44: D0 B1     BNE $89f7
  $8A46: A9 00     LDA #$00
  $8A48: 85 00     STA $00
  $8A4A: 46 02     LSR $02
  $8A4C: A6 02     LDX $02
  $8A4E: BD 13 CF  LDA $cf13,X
  $8A51: 85 03     STA $03
  $8A53: AD F8 06  LDA $06f8
  $8A56: 20 36 CB  JSR $cb36
  $8A59: 18        CLC
  $8A5A: 65 00     ADC $00
  $8A5C: AA        TAX
  $8A5D: BD F0 CE  LDA $cef0,X
  $8A60: 48        PHA
  $8A61: 20 19 D9  JSR $d919
  $8A64: 85 04     STA $04
  $8A66: 68        PLA
  $8A67: 29 0F     AND #$0f
  $8A69: 85 05     STA $05
  $8A6B: A6 00     LDX $00
  $8A6D: BD 59 CE  LDA $ce59,X
  $8A70: 48        PHA
  $8A71: 20 19 D9  JSR $d919
  $8A74: 20 36 CB  JSR $cb36
  $8A77: A8        TAY
  $8A78: 68        PLA
  $8A79: 29 0F     AND #$0f
  $8A7B: 20 36 CB  JSR $cb36
  $8A7E: AA        TAX
  $8A7F: AD 04 00  LDA $0004
  $8A82: 48        PHA
  $8A83: 48        PHA
  $8A84: 18        CLC
  $8A85: 79 FC 06  ADC $06fc,Y
  $8A88: 99 FC 06  STA $06fc,Y
  $8A8B: 68        PLA
  $8A8C: 18        CLC
  $8A8D: 7D FD 06  ADC $06fd,X
  $8A90: 9D FD 06  STA $06fd,X
  $8A93: AD 05 00  LDA $0005
  $8A96: 48        PHA
  $8A97: 18        CLC
  $8A98: 79 FD 06  ADC $06fd,Y
  $8A9B: 99 FD 06  STA $06fd,Y
  $8A9E: 68        PLA
  $8A9F: 18        CLC
  $8AA0: 7D FC 06  ADC $06fc,X
  $8AA3: 9D FC 06  STA $06fc,X
  $8AA6: 68        PLA
  $8AA7: C5 05     CMP $05
  $8AA9: 90 19     BCC $8ac4
  $8AAB: 08        PHP
  $8AAC: 8A        TXA
  $8AAD: 48        PHA
  $8AAE: 98        TYA
  $8AAF: AA        TAX
  $8AB0: FE FA 06  INC $06fa,X
  $8AB3: 68        PLA
  $8AB4: AA        TAX
  $8AB5: 28        PLP
  $8AB6: F0 0F     BEQ $8ac7
  $8AB8: 8A        TXA
  $8AB9: 48        PHA
  $8ABA: 98        TYA
  $8ABB: AA        TAX
  $8ABC: FE FA 06  INC $06fa,X
  $8ABF: 68        PLA
  $8AC0: AA        TAX
  $8AC1: 4C CA CA  JMP $caca
  $8AC4: FE FA 06  INC $06fa,X
  $8AC7: FE FA 06  INC $06fa,X
  $8ACA: E6 00     INC $00
  $8ACC: C6 03     DEC $03
  $8ACE: F0 03     BEQ $8ad3
  $8AD0: 4C 53 CA  JMP $ca53
  $8AD3: A6 03     LDX $03
  $8AD5: BD FC 06  LDA $06fc,X
  $8AD8: 38        SEC
  $8AD9: FD FD 06  SBC $06fd,X
  $8ADC: 90 07     BCC $8ae5
  $8ADE: A8        TAY
  $8ADF: 10 09     BPL $8aea
  $8AE1: A9 7F     LDA #$7f
  $8AE3: D0 05     BNE $8aea
  $8AE5: A8        TAY
  $8AE6: 30 02     BMI $8aea
  $8AE8: A9 80     LDA #$80
  $8AEA: 9D FB 06  STA $06fb,X
  $8AED: A6 03     LDX $03
  $8AEF: 20 30 D9  JSR $d930
  $8AF2: 86 03     STX $03
  $8AF4: E0 1E     CPX #$1e
  $8AF6: D0 DB     BNE $8ad3
  $8AF8: 20 7D CD  JSR $cd7d
  $8AFB: AD 4F 06  LDA $064f
  $8AFE: C9 09     CMP #$09
  $8B00: D0 01     BNE $8b03
  $8B02: 60        RTS
  $8B03: A2 00     LDX #$00
  $8B05: 86 C8     STX $c8
  $8B07: A6 C8     LDX $c8
  $8B09: BD FE 06  LDA $06fe,X
  $8B0C: 0A        ASL A
  $8B0D: A8        TAY
  $8B0E: B9 40 CE  LDA $ce40,Y
  $8B11: 85 DE     STA $de
  $8B13: B9 41 CE  LDA $ce41,Y
  $8B16: 85 DF     STA $df
  $8B18: BD F9 06  LDA $06f9,X
  $8B1B: 48        PHA
  $8B1C: 20 4D CD  JSR $cd4d
  $8B1F: A5 DF     LDA $df
  $8B21: 18        CLC
  $8B22: 69 08     ADC #$08
  $8B24: 85 DF     STA $df
  $8B26: 68        PLA
  $8B27: 20 4D CD  JSR $cd4d
  $8B2A: A6 C8     LDX $c8
  $8B2C: 20 30 D9  JSR $d930
  $8B2F: 86 C8     STX $c8
  $8B31: E0 1E     CPX #$1e
  $8B33: D0 D2     BNE $8b07
  $8B35: 60        RTS
  $8B36: 85 0F     STA $0f
  $8B38: 0A        ASL A
  $8B39: 18        CLC
  $8B3A: 65 0F     ADC $0f
  $8B3C: 0A        ASL A
  $8B3D: 60        RTS
  $8B3E: A9 10     LDA #$10
  $8B40: D0 02     BNE $8b44
  $8B42: A9 11     LDA #$11
  $8B44: 20 7A D6  JSR $d67a
  $8B47: A2 00     LDX #$00
  $8B49: 86 C8     STX $c8
  $8B4B: A6 C8     LDX $c8
  $8B4D: BD F9 06  LDA $06f9,X
  $8B50: 20 4D CD  JSR $cd4d
  $8B53: A6 C8     LDX $c8
  $8B55: 20 30 D9  JSR $d930
  $8B58: 86 C8     STX $c8
  $8B5A: E0 1E     CPX #$1e
  $8B5C: F0 08     BEQ $8b66
  $8B5E: A9 60     LDA #$60
  $8B60: 20 14 DB  JSR $db14
  $8B63: 4C 4B CB  JMP $cb4b
  $8B66: 60        RTS
  $8B67: A9 17     LDA #$17
  $8B69: 20 7A D6  JSR $d67a
  $8B6C: A2 00     LDX #$00
  $8B6E: 86 C8     STX $c8
  $8B70: A6 C8     LDX $c8
  $8B72: BD F9 06  LDA $06f9,X
  $8B75: 20 4D CD  JSR $cd4d
  $8B78: A6 C8     LDX $c8
  $8B7A: 20 30 D9  JSR $d930
  $8B7D: 86 C8     STX $c8
  $8B7F: E0 1E     CPX #$1e
  $8B81: F0 08     BEQ $8b8b
  $8B83: A9 05     LDA #$05
  $8B85: 20 14 DB  JSR $db14
  $8B88: 4C 70 CB  JMP $cb70
  $8B8B: A9 18     LDA #$18
  $8B8D: 20 7A D6  JSR $d67a
  $8B90: A2 00     LDX #$00
  $8B92: 86 C8     STX $c8
  $8B94: A9 0B     LDA #$0b
  $8B96: 20 4D CD  JSR $cd4d
  $8B99: E6 C8     INC $c8
  $8B9B: A6 C8     LDX $c8
  $8B9D: E0 05     CPX #$05
  $8B9F: F0 08     BEQ $8ba9
  $8BA1: A9 65     LDA #$65
  $8BA3: 20 14 DB  JSR $db14
  $8BA6: 4C 94 CB  JMP $cb94
  $8BA9: 60        RTS
  $8BAA: A9 19     LDA #$19
  $8BAC: 20 7A D6  JSR $d67a
  $8BAF: A2 00     LDX #$00
  $8BB1: 86 D8     STX $d8
  $8BB3: A6 D8     LDX $d8
  $8BB5: BD FA 06  LDA $06fa,X
  $8BB8: 20 08 CD  JSR $cd08
  $8BBB: A9 04     LDA #$04
  $8BBD: 20 14 DB  JSR $db14
  $8BC0: A6 D8     LDX $d8
  $8BC2: A0 5E     LDY #$5e
  $8BC4: BD FB 06  LDA $06fb,X
  $8BC7: 10 07     BPL $8bd0
  $8BC9: 49 FF     EOR #$ff
  $8BCB: 18        CLC
  $8BCC: 69 01     ADC #$01
  $8BCE: A0 6E     LDY #$6e
  $8BD0: 48        PHA
  $8BD1: 20 9C CC  JSR $cc9c
  $8BD4: 68        PLA
  $8BD5: 8C 07 20  STY $2007
  $8BD8: E6 DE     INC $de
  $8BDA: 20 08 CD  JSR $cd08
  $8BDD: A9 05     LDA #$05
  $8BDF: 20 14 DB  JSR $db14
  $8BE2: A6 D8     LDX $d8
  $8BE4: BD FC 06  LDA $06fc,X
  $8BE7: 20 08 CD  JSR $cd08
  $8BEA: A9 56     LDA #$56
  $8BEC: 20 14 DB  JSR $db14
  $8BEF: A5 D8     LDA $d8
  $8BF1: 18        CLC
  $8BF2: 69 06     ADC #$06
  $8BF4: 85 D8     STA $d8
  $8BF6: C9 1E     CMP #$1e
  $8BF8: D0 B9     BNE $8bb3
  $8BFA: AD 4F 06  LDA $064f
  $8BFD: 38        SEC
  $8BFE: E9 0A     SBC #$0a
  $8C00: 10 01     BPL $8c03
  $8C02: 60        RTS
  $8C03: AA        TAX
  $8C04: E8        INX
  $8C05: 86 C8     STX $c8
  $8C07: A2 00     LDX #$00
  $8C09: 86 C9     STX $c9
  $8C0B: A6 C9     LDX $c9
  $8C0D: BD 5F CE  LDA $ce5f,X
  $8C10: 85 DA     STA $da
  $8C12: 8A        TXA
  $8C13: 0A        ASL A
  $8C14: AA        TAX
  $8C15: BD EF 06  LDA $06ef,X
  $8C18: 85 D8     STA $d8
  $8C1A: BD F0 06  LDA $06f0,X
  $8C1D: 85 D9     STA $d9
  $8C1F: 20 63 CC  JSR $cc63
  $8C22: E6 C9     INC $c9
  $8C24: C6 C8     DEC $c8
  $8C26: D0 E3     BNE $8c0b
  $8C28: AD 4F 06  LDA $064f
  $8C2B: 38        SEC
  $8C2C: E9 0A     SBC #$0a
  $8C2E: AA        TAX
  $8C2F: BD 14 CF  LDA $cf14,X
  $8C32: 85 C8     STA $c8
  $8C34: AD F8 06  LDA $06f8
  $8C37: 20 36 CB  JSR $cb36
  $8C3A: 85 CA     STA $ca
  $8C3C: A2 00     LDX #$00
  $8C3E: 86 C9     STX $c9
  $8C40: A6 C9     LDX $c9
  $8C42: BD 59 CE  LDA $ce59,X
  $8C45: 85 DA     STA $da
  $8C47: A6 CA     LDX $ca
  $8C49: BD F0 CE  LDA $cef0,X
  $8C4C: 48        PHA
  $8C4D: 29 0F     AND #$0f
  $8C4F: 85 D9     STA $d9
  $8C51: 68        PLA
  $8C52: 20 19 D9  JSR $d919
  $8C55: 85 D8     STA $d8
  $8C57: 20 63 CC  JSR $cc63
  $8C5A: E6 CA     INC $ca
  $8C5C: E6 C9     INC $c9
  $8C5E: C6 C8     DEC $c8
  $8C60: D0 DE     BNE $8c40
  $8C62: 60        RTS
  $8C63: 20 75 CC  JSR $cc75
  $8C66: A5 DA     LDA $da
  $8C68: 20 23 D9  JSR $d923
  $8C6B: 85 DA     STA $da
  $8C6D: A6 D8     LDX $d8
  $8C6F: A5 D9     LDA $d9
  $8C71: 86 D9     STX $d9
  $8C73: 85 D8     STA $d8
  $8C75: A5 DA     LDA $da
  $8C77: 20 AA CC  JSR $ccaa
  $8C7A: 20 9C CC  JSR $cc9c
  $8C7D: A5 D8     LDA $d8
  $8C7F: C5 D9     CMP $d9
  $8C81: D0 04     BNE $8c87
  $8C83: A9 74     LDA #$74
  $8C85: D0 06     BNE $8c8d
  $8C87: A9 FA     LDA #$fa
  $8C89: B0 02     BCS $8c8d
  $8C8B: A9 FB     LDA #$fb
  $8C8D: 8D 07 20  STA $2007
  $8C90: A9 1E     LDA #$1e
  $8C92: 20 14 DB  JSR $db14
  $8C95: A6 D8     LDX $d8
  $8C97: A4 D9     LDY $d9
  $8C99: 4C 1C CD  JMP $cd1c
  $8C9C: 2C 02 20  BIT $2002
  $8C9F: A5 DF     LDA $df
  $8CA1: 8D 06 20  STA $2006
  $8CA4: A5 DE     LDA $de
  $8CA6: 8D 06 20  STA $2006
  $8CA9: 60        RTS
  $8CAA: 48        PHA
  $8CAB: 29 F0     AND #$f0
  $8CAD: 20 36 CB  JSR $cb36
  $8CB0: 08        PHP
  $8CB1: 18        CLC
  $8CB2: 69 68     ADC #$68
  $8CB4: 85 DE     STA $de
  $8CB6: A9 21     LDA #$21
  $8CB8: 69 00     ADC #$00
  $8CBA: 28        PLP
  $8CBB: 69 00     ADC #$00
  $8CBD: 85 DF     STA $df
  $8CBF: 68        PLA
  $8CC0: 29 0F     AND #$0f
  $8CC2: 85 00     STA $00
  $8CC4: 0A        ASL A
  $8CC5: 0A        ASL A
  $8CC6: 18        CLC
  $8CC7: 65 00     ADC $00
  $8CC9: 4C 14 DB  JMP $db14
  $8CCC: AA        TAX
  $8CCD: A9 00     LDA #$00
  $8CCF: 8D D3 06  STA $06d3
  $8CD2: 8D D4 06  STA $06d4
  $8CD5: 8D D5 06  STA $06d5
  $8CD8: A0 02     LDY #$02
  $8CDA: 8C 98 06  STY $0698
  $8CDD: A9 0A     LDA #$0a
  $8CDF: 20 2C DC  JSR $dc2c
  $8CE2: AC 98 06  LDY $0698
  $8CE5: 18        CLC
  $8CE6: 69 64     ADC #$64
  $8CE8: 99 D3 06  STA $06d3,Y
  $8CEB: CE 98 06  DEC $0698
  $8CEE: E0 00     CPX #$00
  $8CF0: D0 EB     BNE $8cdd
  $8CF2: A2 00     LDX #$00
  $8CF4: BD D3 06  LDA $06d3,X
  $8CF7: F0 09     BEQ $8d02
  $8CF9: C9 64     CMP #$64
  $8CFB: D0 0A     BNE $8d07
  $8CFD: A9 00     LDA #$00
  $8CFF: 9D D3 06  STA $06d3,X
  $8D02: E8        INX
  $8D03: E0 02     CPX #$02
  $8D05: D0 ED     BNE $8cf4
  $8D07: 60        RTS
  $8D08: 20 CC CC  JSR $cccc
  $8D0B: 20 9C CC  JSR $cc9c
  $8D0E: A2 00     LDX #$00
  $8D10: BD D3 06  LDA $06d3,X
  $8D13: 8D 07 20  STA $2007
  $8D16: E8        INX
  $8D17: E0 03     CPX #$03
  $8D19: D0 F5     BNE $8d10
  $8D1B: 60        RTS
  $8D1C: 86 08     STX $08
  $8D1E: 84 09     STY $09
  $8D20: 20 9C CC  JSR $cc9c
  $8D23: A5 08     LDA $08
  $8D25: 20 CC CC  JSR $cccc
  $8D28: AD D4 06  LDA $06d4
  $8D2B: 8D 07 20  STA $2007
  $8D2E: AD D5 06  LDA $06d5
  $8D31: 8D 07 20  STA $2007
  $8D34: A9 6E     LDA #$6e
  $8D36: 8D 07 20  STA $2007
  $8D39: A5 09     LDA $09
  $8D3B: 20 CC CC  JSR $cccc
  $8D3E: AD D4 06  LDA $06d4
  $8D41: F0 03     BEQ $8d46
  $8D43: 8D 07 20  STA $2007
  $8D46: AD D5 06  LDA $06d5
  $8D49: 8D 07 20  STA $2007
  $8D4C: 60        RTS
  $8D4D: 29 0F     AND #$0f
  $8D4F: 48        PHA
  $8D50: 20 9C CC  JSR $cc9c
  $8D53: 68        PLA
  $8D54: 20 36 CB  JSR $cb36
  $8D57: AA        TAX
  $8D58: A0 00     LDY #$00
  $8D5A: BD 64 CE  LDA $ce64,X
  $8D5D: 8D 07 20  STA $2007
  $8D60: E8        INX
  $8D61: C8        INY
  $8D62: C0 03     CPY #$03
  $8D64: 30 F4     BMI $8d5a
  $8D66: F0 05     BEQ $8d6d
  $8D68: C0 06     CPY #$06
  $8D6A: D0 EE     BNE $8d5a
  $8D6C: 60        RTS
  $8D6D: 86 00     STX $00
  $8D6F: 20 09 DB  JSR $db09
  $8D72: 8E 06 20  STX $2006
  $8D75: 8D 06 20  STA $2006
  $8D78: A6 00     LDX $00
  $8D7A: 4C 5A CD  JMP $cd5a
  $8D7D: 20 D3 CD  JSR $cdd3
  $8D80: A2 01     LDX #$01
  $8D82: 86 00     STX $00
  $8D84: CA        DEX
  $8D85: 86 01     STX $01
  $8D87: A2 00     LDX #$00
  $8D89: BD FE 06  LDA $06fe,X
  $8D8C: F0 09     BEQ $8d97
  $8D8E: 20 30 D9  JSR $d930
  $8D91: E0 1E     CPX #$1e
  $8D93: D0 F4     BNE $8d89
  $8D95: F0 39     BEQ $8dd0
  $8D97: A0 00     LDY #$00
  $8D99: B9 FE 06  LDA $06fe,Y
  $8D9C: D0 1A     BNE $8db8
  $8D9E: BD FA 06  LDA $06fa,X
  $8DA1: D9 FA 06  CMP $06fa,Y
  $8DA4: D0 0E     BNE $8db4
  $8DA6: BD FB 06  LDA $06fb,X
  $8DA9: D9 FB 06  CMP $06fb,Y
  $8DAC: D0 06     BNE $8db4
  $8DAE: BD FC 06  LDA $06fc,X
  $8DB1: D9 FC 06  CMP $06fc,Y
  $8DB4: B0 02     BCS $8db8
  $8DB6: 98        TYA
  $8DB7: AA        TAX
  $8DB8: 98        TYA
  $8DB9: 18        CLC
  $8DBA: 69 06     ADC #$06
  $8DBC: A8        TAY
  $8DBD: C0 1E     CPY #$1e
  $8DBF: 30 D8     BMI $8d99
  $8DC1: A5 00     LDA $00
  $8DC3: 9D FE 06  STA $06fe,X
  $8DC6: E6 00     INC $00
  $8DC8: E6 01     INC $01
  $8DCA: A5 01     LDA $01
  $8DCC: C9 05     CMP #$05
  $8DCE: 30 B7     BMI $8d87
  $8DD0: 4C E6 CD  JMP $cde6
  $8DD3: A2 00     LDX #$00
  $8DD5: BD FB 06  LDA $06fb,X
  $8DD8: 18        CLC
  $8DD9: 69 80     ADC #$80
  $8DDB: 9D FB 06  STA $06fb,X
  $8DDE: 20 30 D9  JSR $d930
  $8DE1: E0 1E     CPX #$1e
  $8DE3: D0 F0     BNE $8dd5
  $8DE5: 60        RTS
  $8DE6: A2 00     LDX #$00
  $8DE8: BD FB 06  LDA $06fb,X
  $8DEB: 38        SEC
  $8DEC: E9 80     SBC #$80
  $8DEE: 9D FB 06  STA $06fb,X
  $8DF1: DE FE 06  DEC $06fe,X
  $8DF4: 20 30 D9  JSR $d930
  $8DF7: E0 1E     CPX #$1e
  $8DF9: D0 ED     BNE $8de8
  $8DFB: 60        RTS
  $8DFC: A5 3A     LDA $3a
  $8DFE: AA        TAX
  $8DFF: BD 73 CF  LDA $cf73,X
  $8E02: AC DE 06  LDY $06de
  $8E05: D0 03     BNE $8e0a
  $8E07: 20 19 D9  JSR $d919
  $8E0A: 29 0F     AND #$0f
  $8E0C: AA        TAX
  $8E0D: BD B7 06  LDA $06b7,X
  $8E10: 85 3A     STA $3a
  $8E12: 60        RTS
  $8E13: 0A        ASL A
  $8E14: AA        TAX
  $8E15: A0 3E     LDY #$3e
  $8E17: BD DE 06  LDA $06de,X
  $8E1A: D9 35 CF  CMP $cf35,Y
  $8E1D: 90 0A     BCC $8e29
  $8E1F: D0 0C     BNE $8e2d
  $8E21: BD DD 06  LDA $06dd,X
  $8E24: D9 34 CF  CMP $cf34,Y
  $8E27: B0 04     BCS $8e2d
  $8E29: 88        DEY
  $8E2A: 88        DEY
  $8E2B: D0 EA     BNE $8e17
  $8E2D: 98        TYA
  $8E2E: 4A        LSR A
  $8E2F: 60        RTS
  $8E30: 40        RTI
  $8E31: 20 50 20  JSR $2050
  $8E34: C0 21     CPY #$21
  $8E36: D0 21     BNE $8e59
  $8E38: 40        RTI
  $8E39: 28        PLP
  $8E3A: 50 28     BVC $8e64
  $8E3C: C0 29     CPY #$29
  $8E3E: D0 29     BNE $8e69
  $8E40: 64 20     NOP $20
  $8E42: 6A        ROR A
  $8E43: 20 70 20  JSR $2070
  $8E46: 76 20     ROR $20,X
  $8E48: 7C 20 0D  NOP $0d20,X
  $8E4B: 20 0C 4D  JSR $4d0c
  $8E4E: 20 0D 50  JSR $500d
  $8E51: 20 0E 87  JSR $870e
  $8E54: 22        ???
  $8E55: 0F C7 22  SLO $22c7
  $8E58: 10 14     BPL $8e6e
  $8E5A: 34 12     NOP $12,X
  $8E5C: 13 24     SLO ($24),Y
  $8E5E: 23 03     RLA ($03,X)
  $8E60: 02        ???
  $8E61: 04 01     NOP $01
  $8E63: 05 00     ORA $00
  $8E65: 00        BRK
  $8E66: 00        BRK
  $8E67: 3B 43 53  RLA $5343,Y
  $8E6A: 00        BRK
  $8E6B: 00        BRK
  $8E6C: 58        CLI
  $8E6D: 78        SEI
  $8E6E: A0 85     LDY #$85
  $8E70: 00        BRK
  $8E71: 00        BRK
  $8E72: 58        CLI
  $8E73: 7A        NOP
  $8E74: A0 7F     LDY #$7f
  $8E76: 00        BRK
  $8E77: 00        BRK
  $8E78: 00        BRK
  $8E79: 79 87 9F  ADC $9f87,Y
  $8E7C: 00        BRK
  $8E7D: 00        BRK
  $8E7E: 58        CLI
  $8E7F: 79 A5 7F  ADC $7fa5,Y
  $8E82: 58        CLI
  $8E83: 00        BRK
  $8E84: 58        CLI
  $8E85: 94 A0     STY $a0,X
  $8E87: 7E 59 00  ROR $0059,X
  $8E8A: 00        BRK
  $8E8B: 95 A0     STA $a0,X
  $8E8D: 8B 00     XAA #$00
  $8E8F: 59 00 84  EOR $8400,Y
  $8E92: 94 79     STY $79,X
  $8E94: 59 00 00  EOR $0000,Y
  $8E97: 95 6E     STA $6e,X
  $8E99: 9E 00 00  SHX $0000,Y
  $8E9C: 00        BRK
  $8E9D: 96 A1     STX $a1,Y
  $8E9F: 6E 00 00  ROR $0000
  $8EA2: 58        CLI
  $8EA3: 7D 8C 87  ADC $878c,X
  $8EA6: 00        BRK
  $8EA7: 00        BRK
  $8EA8: 00        BRK
  $8EA9: 6E 6E 6E  ROR $6e6e
  $8EAC: 00        BRK
  $8EAD: 00        BRK
  $8EAE: 00        BRK
  $8EAF: 00        BRK
  $8EB0: 00        BRK
  $8EB1: FE F2 F3  INC $f3f2,X
  $8EB4: F6 F4     INC $f4,X
  $8EB6: F5 F8     SBC $f8,X
  $8EB8: F7 FA     ISB $fa,X
  $8EBA: FB F9 FC  ISB $fcf9,Y
  $8EBD: FD 00 B4  SBC $b400,X
  $8EC0: B5 00     LDA $00,X
  $8EC2: 00        BRK
  $8EC3: F4 23     NOP $23,X
  $8EC5: BC BD 20  LDY $20bd,X
  $8EC8: BE BF 00  LDX $00bf,Y
  $8ECB: 70 71     BVS $8f3e
  $8ECD: 00        BRK
  $8ECE: 72        ???
  $8ECF: 00        BRK
  $8ED0: 0B 0E     ANC #$0e
  $8ED2: 0F BB BE  SLO $bebb
  $8ED5: BF BA B4  LAX $b4ba,Y
  $8ED8: B5 22     LDA $22,X
  $8EDA: D3 F4     DCP ($f4),Y
  $8EDC: 11 12     ORA ($12),Y
  $8EDE: 23 34     RLA ($34,X)
  $8EE0: 35 36     AND $36,X
  $8EE2: 37 38     RLA $38,X
  $8EE4: 49 4A     EOR #$4a
  $8EE6: 0A        ASL A
  $8EE7: 0B 0C     ANC #$0c
  $8EE9: 0D 0F 11  ORA $110f
  $8EEC: 12        ???
  $8EED: 13 0E     SLO ($0e),Y
  $8EEF: 10 30     BPL $8f21
  $8EF1: 22        ???
  $8EF2: 32        ???
  $8EF3: 11 40     ORA ($40),Y
  $8EF5: 20 60 20  JSR $2060
  $8EF8: 55 32     EOR $32,X
  $8EFA: 40        RTI
  $8EFB: 22        ???
  $8EFC: 80 30     NOP #$30
  $8EFE: 43 90     SRE ($90,X)
  $8F00: 60        RTS
  $8F01: 40        RTI
  $8F02: 40        RTI
  $8F03: 55 00     EOR $00,X
  $8F05: 30 20     BMI $8f27
  $8F07: 00        BRK
  $8F08: 83 10     SAX ($10,X)
  $8F0A: 00        BRK
  $8F0B: 44 40     NOP $40
  $8F0D: 10 60     BPL $8f6f
  $8F0F: 01 00     ORA ($00,X)
  $8F11: 81 20     STA ($20,X)
  $8F13: 30 01     BMI $8f16
  $8F15: 02        ???
  $8F16: 05 06     ORA $06
  $8F18: 26 27     ROL $27
  $8F1A: 28        PLP
  $8F1B: 29 2A     AND #$2a
  $8F1D: 4F 50 51  SRE $5150
  $8F20: 52        ???
  $8F21: 53 54     SRE ($54),Y
  $8F23: 55 56     EOR $56,X
  $8F25: 57 58     SRE $58,X
  $8F27: 63 64     RRA ($64,X)
  $8F29: 65 66     ADC $66
  $8F2B: 67 68     RRA $68
  $8F2D: 69 6A     ADC #$6a
  $8F2F: 6B 6C     ARR #$6c
  $8F31: 23 24     RLA ($24,X)
  $8F33: 25 2B     AND $2b
  $8F35: 00        BRK
  $8F36: 32        ???
  $8F37: 00        BRK
  $8F38: 78        SEI
  $8F39: 00        BRK
  $8F3A: DE 00 5E  DEC $5e00,X
  $8F3D: 01 EA     ORA ($ea,X)
  $8F3F: 01 85     ORA ($85,X)
  $8F41: 02        ???
  $8F42: 46 03     LSR $03
  $8F44: 38        SEC
  $8F45: 04 68     NOP $68
  $8F47: 05 E2     ORA $e2
  $8F49: 06 B6     ASL $b6
  $8F4B: 08        PHP
  $8F4C: F4 0A     NOP $0a,X
  $8F4E: AE 0D F7  LDX $f70d
  $8F51: 10 E3     BPL $8f36
  $8F53: 14 88     NOP $88,X
  $8F55: 19 FD 1E  ORA $1efd,Y
  $8F58: 5B 25 BB  SRE $bb25,Y
  $8F5B: 2C 39 35  BIT $3539
  $8F5E: F1 3E     SBC ($3e),Y
  $8F60: 02        ???
  $8F61: 4A        LSR A
  $8F62: 89 56     NOP #$56
  $8F64: A9 64     LDA #$64
  $8F66: 83 74     SAX ($74,X)
  $8F68: 3B 86 F4  RLA $f486,Y
  $8F6B: 99 D6 AF  STA $afd6,Y
  $8F6E: 08        PHP
  $8F6F: C8        INY
  $8F70: B2        ???
  $8F71: E2 FF     NOP #$ff
  $8F73: FF 11 27  ISB $2711,X
  $8F76: 37 46     RLA $46,X
  $8F78: 58        CLI
  $8F79: 67 77     RRA $77
  $8F7B: 8F 8F 8F  SAX $8f8f
  $8F7E: 8F FF FF  SAX $ffff
  $8F81: F8        SED
  $8F82: F8        SED
  $8F83: F8        SED
  $8F84: F8        SED
  $8F85: F8        SED
  $8F86: F2        ???
  $8F87: F3 F7     ISB ($f7),Y
  $8F89: F4 F8     NOP $f8,X
  $8F8B: F5 F5     SBC $f5,X
  $8F8D: F5 F8     SBC $f8,X
  $8F8F: 11 11     ORA ($11),Y
  $8F91: 11 11     ORA ($11),Y
  $8F93: 13 11     SLO ($11),Y
  $8F95: 15 48     ORA $48,X
  $8F97: 20 87 DB  JSR $db87
  $8F9A: A5 E0     LDA $e0
  $8F9C: 20 17 80  JSR $8017
  $8F9F: B1 CF     LDA ($cf),Y
  $8FA1: D6 CF     DEC $cf,X
  $8FA3: 80 D0     NOP #$d0
  $8FA5: 67 D1     RRA $d1
  $8FA7: DE D1 C9  DEC $c9d1,X
  $8FAA: CF 73 D9  DCP $d973
  $8FAD: FC D9 07  NOP $07d9,X
  $8FB0: D5 A9     CMP $a9,X
  $8FB2: 1B 20 26  SLO $2620,Y
  $8FB5: 80 20     NOP #$20
  $8FB7: C6 D4     DEC $d4
  $8FB9: 20 0E D9  JSR $d90e
  $8FBC: 20 BF D4  JSR $d4bf
  $8FBF: 20 00 DC  JSR $dc00
  $8FC2: E6 E0     INC $e0
  $8FC4: A9 05     LDA #$05
  $8FC6: 4C 1E DB  JMP $db1e
  $8FC9: A9 01     LDA #$01
  $8FCB: 20 59 80  JSR $8059
  $8FCE: A9 04     LDA #$04
  $8FD0: 8D CA 03  STA $03ca
  $8FD3: 4C A7 DB  JMP $dba7
  $8FD6: A5 E1     LDA $e1
  $8FD8: 20 17 80  JSR $8017
  $8FDB: E7 CF     ISB $cf
  $8FDD: F3 CF     ISB ($cf),Y
  $8FDF: 0C D0 24  NOP $24d0
  $8FE2: D0 2F     BNE $9013
  $8FE4: D0 65     BNE $904b
  $8FE6: D0 A9     BNE $8f91
  $8FE8: 0C 20 37  NOP $3720
  $8FEB: D9 E6 E1  CMP $e1e6,Y
  $8FEE: A9 14     LDA #$14
  $8FF0: 4C 42 DC  JMP $dc42
  $8FF3: A9 07     LDA #$07
  $8FF5: 20 F5 D9  JSR $d9f5
  $8FF8: A9 00     LDA #$00
  $8FFA: 8D 9C 06  STA $069c
  $8FFD: 20 78 D7  JSR $d778
  $9000: A9 06     LDA #$06
  $9002: 20 0F D6  JSR $d60f
  $9005: E6 E1     INC $e1
  $9007: A9 0B     LDA #$0b
  $9009: 4C 59 80  JMP $8059
  $900C: E6 E1     INC $e1
  $900E: AD DE 06  LDA $06de
  $9011: D0 03     BNE $9016
  $9013: 20 73 D0  JSR $d073
  $9016: A0 1F     LDY #$1f
  $9018: AD E5 03  LDA $03e5
  $901B: 29 02     AND #$02
  $901D: F0 01     BEQ $9020
  $901F: 88        DEY
  $9020: 98        TYA
  $9021: 4C 00 D5  JMP $d500
  $9024: A9 00     LDA #$00
  $9026: 85 DA     STA $da
  $9028: E6 E1     INC $e1
  $902A: A9 09     LDA #$09
  $902C: 4C F5 D9  JMP $d9f5
  $902F: 20 C1 D6  JSR $d6c1
  $9032: AA        TAX
  $9033: 0A        ASL A
  $9034: B0 2F     BCS $9065
  $9036: 8A        TXA
  $9037: 29 0C     AND #$0c
  $9039: F0 0B     BEQ $9046
  $903B: 4A        LSR A
  $903C: 4A        LSR A
  $903D: 4A        LSR A
  $903E: B0 04     BCS $9044
  $9040: C6 DA     DEC $da
  $9042: 90 02     BCC $9046
  $9044: E6 DA     INC $da
  $9046: A5 DA     LDA $da
  $9048: 29 01     AND #$01
  $904A: 20 1E D9  JSR $d91e
  $904D: 69 A0     ADC #$a0
  $904F: 8D 04 02  STA $0204
  $9052: A2 02     LDX #$02
  $9054: BD 7D D0  LDA $d07d,X
  $9057: 9D 05 02  STA $0205,X
  $905A: CA        DEX
  $905B: 10 F7     BPL $9054
  $905D: A9 08     LDA #$08
  $905F: 8D AF 06  STA $06af
  $9062: 4C 15 D6  JMP $d615
  $9065: A5 DA     LDA $da
  $9067: 29 01     AND #$01
  $9069: D0 08     BNE $9073
  $906B: 20 68 80  JSR $8068
  $906E: A9 05     LDA #$05
  $9070: 20 1E DB  JSR $db1e
  $9073: A9 01     LDA #$01
  $9075: 8D A0 06  STA $06a0
  $9078: A9 02     LDA #$02
  $907A: 4C A9 DB  JMP $dba9
  $907D: FD 02 38  SBC $3802,X
  $9080: A5 E1     LDA $e1
  $9082: 20 17 80  JSR $8017
  $9085: 8B D0     XAA #$d0
  $9087: AC D0 B9  LDY $b9d0
  $908A: D0 A2     BNE $902e
  $908C: 00        BRK
  $908D: AC DE 06  LDY $06de
  $9090: F0 02     BEQ $9094
  $9092: A2 02     LDX #$02
  $9094: BD D1 F8  LDA $f8d1,X
  $9097: 85 D8     STA $d8
  $9099: BD D2 F8  LDA $f8d2,X
  $909C: 85 D9     STA $d9
  $909E: 20 21 DB  JSR $db21
  $90A1: A0 00     LDY #$00
  $90A3: 84 DA     STY $da
  $90A5: B1 D8     LDA ($d8),Y
  $90A7: E6 E1     INC $e1
  $90A9: 4C 65 DC  JMP $dc65
  $90AC: AD A0 06  LDA $06a0
  $90AF: F0 05     BEQ $90b6
  $90B1: A9 00     LDA #$00
  $90B3: 20 F5 D9  JSR $d9f5
  $90B6: E6 E1     INC $e1
  $90B8: 60        RTS
  $90B9: AD A0 06  LDA $06a0
  $90BC: D0 05     BNE $90c3
  $90BE: A9 03     LDA #$03
  $90C0: 4C A9 DB  JMP $dba9
  $90C3: A5 E3     LDA $e3
  $90C5: 20 17 80  JSR $8017
  $90C8: CC D0 50  CPY $50d0
  $90CB: D1 20     CMP ($20),Y
  $90CD: C1 D6     CMP ($d6,X)
  $90CF: AA        TAX
  $90D0: 29 10     AND #$10
  $90D2: F0 10     BEQ $90e4
  $90D4: A9 1C     LDA #$1c
  $90D6: 20 59 80  JSR $8059
  $90D9: 20 6B 80  JSR $806b
  $90DC: A9 02     LDA #$02
  $90DE: 20 A9 DB  JSR $dba9
  $90E1: 4C 21 DB  JMP $db21
  $90E4: 8A        TXA
  $90E5: 29 03     AND #$03
  $90E7: F0 38     BEQ $9121
  $90E9: 4A        LSR A
  $90EA: B0 12     BCS $90fe
  $90EC: C6 DA     DEC $da
  $90EE: A5 DA     LDA $da
  $90F0: 10 1E     BPL $9110
  $90F2: AD 18 07  LDA $0718
  $90F5: 4A        LSR A
  $90F6: A9 04     LDA #$04
  $90F8: 69 00     ADC #$00
  $90FA: 85 DA     STA $da
  $90FC: D0 12     BNE $9110
  $90FE: E6 DA     INC $da
  $9100: AD 18 07  LDA $0718
  $9103: 4A        LSR A
  $9104: A9 04     LDA #$04
  $9106: 69 00     ADC #$00
  $9108: C5 DA     CMP $da
  $910A: B0 04     BCS $9110
  $910C: A9 00     LDA #$00
  $910E: 85 DA     STA $da
  $9110: A4 DA     LDY $da
  $9112: B1 D8     LDA ($d8),Y
  $9114: 20 42 DC  JSR $dc42
  $9117: 20 08 D9  JSR $d908
  $911A: A9 01     LDA #$01
  $911C: 85 E1     STA $e1
  $911E: 4C 15 D6  JMP $d615
  $9121: 20 C1 D6  JSR $d6c1
  $9124: 0A        ASL A
  $9125: 90 28     BCC $914f
  $9127: 20 47 D9  JSR $d947
  $912A: AD DE 06  LDA $06de
  $912D: 0A        ASL A
  $912E: 0A        ASL A
  $912F: 85 CC     STA $cc
  $9131: 20 6D D4  JSR $d46d
  $9134: B0 06     BCS $913c
  $9136: A9 0C     LDA #$0c
  $9138: 65 CC     ADC $cc
  $913A: 85 CC     STA $cc
  $913C: A9 04     LDA #$04
  $913E: 20 20 DC  JSR $dc20
  $9141: 18        CLC
  $9142: 65 CC     ADC $cc
  $9144: AA        TAX
  $9145: BD 40 E1  LDA $e140,X
  $9148: 8D 1D 07  STA $071d
  $914B: A9 01     LDA #$01
  $914D: 85 E3     STA $e3
  $914F: 60        RTS
  $9150: A9 07     LDA #$07
  $9152: 20 F5 D9  JSR $d9f5
  $9155: A9 02     LDA #$02
  $9157: 20 A9 DB  JSR $dba9
  $915A: A9 01     LDA #$01
  $915C: 85 E1     STA $e1
  $915E: AD 1D 07  LDA $071d
  $9161: CE A0 06  DEC $06a0
  $9164: 4C 00 D5  JMP $d500
  $9167: AD DE 06  LDA $06de
  $916A: C9 01     CMP #$01
  $916C: D0 05     BNE $9173
  $916E: A9 04     LDA #$04
  $9170: 4C A9 DB  JMP $dba9
  $9173: A5 E1     LDA $e1
  $9175: 20 17 80  JSR $8017
  $9178: 7C D1 CE  NOP $ced1,X
  $917B: D1 AD     CMP ($ad),Y
  $917D: DC 06 38  NOP $3806,X
  $9180: E9 02     SBC #$02
  $9182: 0A        ASL A
  $9183: AA        TAX
  $9184: BD 2B E2  LDA $e22b,X
  $9187: BC 2C E2  LDY $e22c,X
  $918A: 8D 97 06  STA $0697
  $918D: 8C 98 06  STY $0698
  $9190: C9 FF     CMP #$ff
  $9192: D0 05     BNE $9199
  $9194: A9 04     LDA #$04
  $9196: 4C A9 DB  JMP $dba9
  $9199: 20 65 DC  JSR $dc65
  $919C: A2 01     LDX #$01
  $919E: 86 E1     STX $e1
  $91A0: AD 98 06  LDA $0698
  $91A3: 0A        ASL A
  $91A4: 18        CLC
  $91A5: 6D 98 06  ADC $0698
  $91A8: AA        TAX
  $91A9: 20 6D D4  JSR $d46d
  $91AC: 90 04     BCC $91b2
  $91AE: F0 01     BEQ $91b1
  $91B0: E8        INX
  $91B1: E8        INX
  $91B2: 8A        TXA
  $91B3: AC 97 06  LDY $0697
  $91B6: C0 0E     CPY #$0e
  $91B8: D0 08     BNE $91c2
  $91BA: AC 18 07  LDY $0718
  $91BD: F0 03     BEQ $91c2
  $91BF: 18        CLC
  $91C0: 69 06     ADC #$06
  $91C2: AA        TAX
  $91C3: BD 53 E2  LDA $e253,X
  $91C6: 8D E4 00  STA $00e4
  $91C9: A9 01     LDA #$01
  $91CB: 85 E1     STA $e1
  $91CD: 60        RTS
  $91CE: A9 07     LDA #$07
  $91D0: 20 F5 D9  JSR $d9f5
  $91D3: A9 04     LDA #$04
  $91D5: 20 A9 DB  JSR $dba9
  $91D8: AD E4 00  LDA $00e4
  $91DB: 4C 00 D5  JMP $d500
  $91DE: A5 E1     LDA $e1
  $91E0: 20 17 80  JSR $8017
  $91E3: E9 D1     SBC #$d1
  $91E5: 15 D2     ORA $d2,X
  $91E7: 1F D2 20  SLO $20d2,X
  $91EA: 21 DB     AND ($db,X)
  $91EC: A9 02     LDA #$02
  $91EE: 20 78 D7  JSR $d778
  $91F1: A9 17     LDA #$17
  $91F3: 20 42 DC  JSR $dc42
  $91F6: AD DE 06  LDA $06de
  $91F9: F0 08     BEQ $9203
  $91FB: A9 11     LDA #$11
  $91FD: 8D 23 03  STA $0323
  $9200: 8D 33 03  STA $0333
  $9203: A9 0D     LDA #$0d
  $9205: 20 0F D6  JSR $d60f
  $9208: 20 08 D9  JSR $d908
  $920B: E6 E1     INC $e1
  $920D: A9 00     LDA #$00
  $920F: 8D A5 06  STA $06a5
  $9212: 4C 47 D9  JMP $d947
  $9215: A9 07     LDA #$07
  $9217: 20 F5 D9  JSR $d9f5
  $921A: E6 E1     INC $e1
  $921C: 4C 29 D2  JMP $d229
  $921F: A9 05     LDA #$05
  $9221: 20 A9 DB  JSR $dba9
  $9224: A9 1D     LDA #$1d
  $9226: 4C 00 D5  JMP $d500
  $9229: A2 00     LDX #$00
  $922B: 86 CB     STX $cb
  $922D: 8A        TXA
  $922E: A2 00     LDX #$00
  $9230: 20 50 80  JSR $8050
  $9233: A0 03     LDY #$03
  $9235: B1 5D     LDA ($5d),Y
  $9237: C9 19     CMP #$19
  $9239: F0 3B     BEQ $9276
  $923B: A2 02     LDX #$02
  $923D: AC E5 03  LDY $03e5
  $9240: 88        DEY
  $9241: F0 01     BEQ $9244
  $9243: CA        DEX
  $9244: A5 6F     LDA $6f
  $9246: 85 01     STA $01
  $9248: A5 6E     LDA $6e
  $924A: 46 01     LSR $01
  $924C: 6A        ROR A
  $924D: CA        DEX
  $924E: D0 FA     BNE $924a
  $9250: A0 0F     LDY #$0f
  $9252: 18        CLC
  $9253: 71 5D     ADC ($5d),Y
  $9255: 91 5D     STA ($5d),Y
  $9257: C8        INY
  $9258: A5 01     LDA $01
  $925A: 71 5D     ADC ($5d),Y
  $925C: 91 5D     STA ($5d),Y
  $925E: C5 6F     CMP $6f
  $9260: 90 14     BCC $9276
  $9262: D0 07     BNE $926b
  $9264: 88        DEY
  $9265: B1 5D     LDA ($5d),Y
  $9267: C5 6E     CMP $6e
  $9269: 90 0B     BCC $9276
  $926B: A0 0F     LDY #$0f
  $926D: A5 6E     LDA $6e
  $926F: 91 5D     STA ($5d),Y
  $9271: C8        INY
  $9272: A5 6F     LDA $6f
  $9274: 91 5D     STA ($5d),Y
  $9276: E6 CB     INC $cb
  $9278: A6 CB     LDX $cb
  $927A: E0 0B     CPX #$0b
  $927C: D0 AF     BNE $922d
  $927E: 60        RTS
  $927F: 20 87 DB  JSR $db87
  $9282: A5 E0     LDA $e0
  $9284: 20 17 80  JSR $8017
  $9287: 99 D2 C1  STA $c1d2,Y
  $928A: C8        INY
  $928B: D7 D3     DCP $d3,X
  $928D: 9B D4 18  TAS $18d4,Y
  $9290: D3 18     DCP ($18),Y
  $9292: D3 73     DCP ($73),Y
  $9294: D9 FC D9  CMP $d9fc,Y
  $9297: 07 D5     SLO $d5
  $9299: 20 B1 CF  JSR $cfb1
  $929C: A9 00     LDA #$00
  $929E: 20 27 DB  JSR $db27
  $92A1: 20 84 D4  JSR $d484
  $92A4: 30 19     BMI $92bf
  $92A6: 08        PHP
  $92A7: 0A        ASL A
  $92A8: AA        TAX
  $92A9: AD E0 05  LDA $05e0
  $92AC: 9D ED 06  STA $06ed,X
  $92AF: AD E1 05  LDA $05e1
  $92B2: 9D EE 06  STA $06ee,X
  $92B5: 28        PLP
  $92B6: D0 07     BNE $92bf
  $92B8: EE 4F 06  INC $064f
  $92BB: A9 01     LDA #$01
  $92BD: D0 50     BNE $930f
  $92BF: 20 6D D4  JSR $d46d
  $92C2: 90 49     BCC $930d
  $92C4: AD 4F 06  LDA $064f
  $92C7: C9 07     CMP #$07
  $92C9: D0 0B     BNE $92d6
  $92CB: A9 00     LDA #$00
  $92CD: AA        TAX
  $92CE: 20 6D D4  JSR $d46d
  $92D1: D0 26     BNE $92f9
  $92D3: E8        INX
  $92D4: D0 23     BNE $92f9
  $92D6: C9 08     CMP #$08
  $92D8: D0 17     BNE $92f1
  $92DA: A2 41     LDX #$41
  $92DC: 20 7D 80  JSR $807d
  $92DF: A2 5E     LDX #$5e
  $92E1: 20 7D 80  JSR $807d
  $92E4: A9 02     LDA #$02
  $92E6: 8D 73 06  STA $0673
  $92E9: A2 5F     LDX #$5f
  $92EB: 20 7D 80  JSR $807d
  $92EE: 4C 04 D3  JMP $d304
  $92F1: C9 0F     CMP #$0f
  $92F3: D0 14     BNE $9309
  $92F5: A9 01     LDA #$01
  $92F7: A2 00     LDX #$00
  $92F9: 8D 39 06  STA $0639
  $92FC: 8E 3A 06  STX $063a
  $92FF: A2 40     LDX #$40
  $9301: 20 7D 80  JSR $807d
  $9304: A9 00     LDA #$00
  $9306: 20 1E DB  JSR $db1e
  $9309: A9 04     LDA #$04
  $930B: D0 02     BNE $930f
  $930D: A9 03     LDA #$03
  $930F: 20 A9 DB  JSR $dba9
  $9312: A9 00     LDA #$00
  $9314: 20 27 DB  JSR $db27
  $9317: 60        RTS
  $9318: AD DE 06  LDA $06de
  $931B: 29 02     AND #$02
  $931D: F0 14     BEQ $9333
  $931F: AD 53 06  LDA $0653
  $9322: 10 05     BPL $9329
  $9324: A2 42     LDX #$42
  $9326: 20 7D 80  JSR $807d
  $9329: AD 18 07  LDA $0718
  $932C: D0 05     BNE $9333
  $932E: A2 5E     LDX #$5e
  $9330: 20 7D 80  JSR $807d
  $9333: 20 84 D4  JSR $d484
  $9336: B0 10     BCS $9348
  $9338: 30 09     BMI $9343
  $933A: AD FE 06  LDA $06fe
  $933D: C9 02     CMP #$02
  $933F: B0 2C     BCS $936d
  $9341: 90 05     BCC $9348
  $9343: 20 6D D4  JSR $d46d
  $9346: 90 25     BCC $936d
  $9348: EE 4F 06  INC $064f
  $934B: AD 4F 06  LDA $064f
  $934E: C9 08     CMP #$08
  $9350: D0 37     BNE $9389
  $9352: A2 06     LDX #$06
  $9354: 86 00     STX $00
  $9356: A6 00     LDX $00
  $9358: BD CE D3  LDA $d3ce,X
  $935B: 48        PHA
  $935C: 20 19 D9  JSR $d919
  $935F: A8        TAY
  $9360: 68        PLA
  $9361: 29 0F     AND #$0f
  $9363: AA        TAX
  $9364: 20 C1 D3  JSR $d3c1
  $9367: C6 00     DEC $00
  $9369: 10 EB     BPL $9356
  $936B: 30 1C     BMI $9389
  $936D: AD 4F 06  LDA $064f
  $9370: C9 08     CMP #$08
  $9372: F0 12     BEQ $9386
  $9374: B0 04     BCS $937a
  $9376: 29 0E     AND #$0e
  $9378: 90 0C     BCC $9386
  $937A: A2 00     LDX #$00
  $937C: C9 0C     CMP #$0c
  $937E: F0 03     BEQ $9383
  $9380: 90 C6     BCC $9348
  $9382: E8        INX
  $9383: BD D5 D3  LDA $d3d5,X
  $9386: 8D 4F 06  STA $064f
  $9389: 20 6D D4  JSR $d46d
  $938C: B0 08     BCS $9396
  $938E: 46 E6     LSR $e6
  $9390: 66 E5     ROR $e5
  $9392: 46 E6     LSR $e6
  $9394: 66 E5     ROR $e5
  $9396: A0 00     LDY #$00
  $9398: A2 00     LDX #$00
  $939A: 18        CLC
  $939B: B5 E5     LDA $e5,X
  $939D: 79 DF 06  ADC $06df,Y
  $93A0: 99 DF 06  STA $06df,Y
  $93A3: E8        INX
  $93A4: C8        INY
  $93A5: 98        TYA
  $93A6: 29 01     AND #$01
  $93A8: D0 F1     BNE $939b
  $93AA: 90 08     BCC $93b4
  $93AC: A9 FF     LDA #$ff
  $93AE: 99 DD 06  STA $06dd,Y
  $93B1: 99 DE 06  STA $06de,Y
  $93B4: C0 10     CPY #$10
  $93B6: D0 E0     BNE $9398
  $93B8: 20 A7 DB  JSR $dba7
  $93BB: A9 02     LDA #$02
  $93BD: 8D CA 03  STA $03ca
  $93C0: 60        RTS
  $93C1: B9 DF 06  LDA $06df,Y
  $93C4: 9D DF 06  STA $06df,X
  $93C7: B9 E0 06  LDA $06e0,Y
  $93CA: 9D E0 06  STA $06e0,X
  $93CD: 60        RTS
  $93CE: 02        ???
  $93CF: 04 06     NOP $06
  $93D1: 08        PHP
  $93D2: 2C 6A 8E  BIT $8e6a
  $93D5: 09 0D     ORA #$0d
  $93D7: A5 E1     LDA $e1
  $93D9: 20 17 80  JSR $8017
  $93DC: E2 D3     NOP #$d3
  $93DE: 30 D4     BMI $93b4
  $93E0: 43 D4     SRE ($d4,X)
  $93E2: CE 4F 06  DEC $064f
  $93E5: 20 00 DC  JSR $dc00
  $93E8: A9 00     LDA #$00
  $93EA: 20 1E DB  JSR $db1e
  $93ED: 20 1C C2  JSR $c21c
  $93F0: 20 11 80  JSR $8011
  $93F3: A9 1A     LDA #$1a
  $93F5: 20 7A D6  JSR $d67a
  $93F8: AD FE 06  LDA $06fe
  $93FB: C9 02     CMP #$02
  $93FD: 90 0A     BCC $9409
  $93FF: A9 12     LDA #$12
  $9401: 48        PHA
  $9402: A9 11     LDA #$11
  $9404: 48        PHA
  $9405: A9 13     LDA #$13
  $9407: D0 08     BNE $9411
  $9409: A9 10     LDA #$10
  $940B: 48        PHA
  $940C: A9 13     LDA #$13
  $940E: 48        PHA
  $940F: A9 12     LDA #$12
  $9411: 20 B4 DB  JSR $dbb4
  $9414: 68        PLA
  $9415: 20 4F CD  JSR $cd4f
  $9418: A9 40     LDA #$40
  $941A: 20 14 DB  JSR $db14
  $941D: 68        PLA
  $941E: 20 4F CD  JSR $cd4f
  $9421: 20 14 80  JSR $8014
  $9424: A9 09     LDA #$09
  $9426: 8D A5 06  STA $06a5
  $9429: E6 E1     INC $e1
  $942B: A9 0F     LDA #$0f
  $942D: 4C 47 D9  JMP $d947
  $9430: AC FE 06  LDY $06fe
  $9433: A9 0A     LDA #$0a
  $9435: C0 02     CPY #$02
  $9437: 90 05     BCC $943e
  $9439: 20 46 C1  JSR $c146
  $943C: A9 0B     LDA #$0b
  $943E: 20 F5 D9  JSR $d9f5
  $9441: E6 E1     INC $e1
  $9443: 20 C1 D6  JSR $d6c1
  $9446: 0A        ASL A
  $9447: 90 23     BCC $946c
  $9449: AC FE 06  LDY $06fe
  $944C: C0 02     CPY #$02
  $944E: A9 04     LDA #$04
  $9450: A2 01     LDX #$01
  $9452: 90 03     BCC $9457
  $9454: A9 03     LDA #$03
  $9456: CA        DEX
  $9457: 20 A9 DB  JSR $dba9
  $945A: 9D E0 05  STA $05e0,X
  $945D: 9D 9B 05  STA $059b,X
  $9460: 8A        TXA
  $9461: 49 01     EOR #$01
  $9463: AA        TAX
  $9464: A9 01     LDA #$01
  $9466: 9D E0 05  STA $05e0,X
  $9469: 9D 9B 05  STA $059b,X
  $946C: 60        RTS
  $946D: A8        TAY
  $946E: AD E1 05  LDA $05e1
  $9471: 18        CLC
  $9472: 6D 9C 05  ADC $059c
  $9475: 85 00     STA $00
  $9477: AD E0 05  LDA $05e0
  $947A: 18        CLC
  $947B: 6D 9B 05  ADC $059b
  $947E: C5 00     CMP $00
  $9480: 08        PHP
  $9481: 98        TYA
  $9482: 28        PLP
  $9483: 60        RTS
  $9484: AD 4F 06  LDA $064f
  $9487: C9 09     CMP #$09
  $9489: B0 04     BCS $948f
  $948B: A9 FF     LDA #$ff
  $948D: 18        CLC
  $948E: 60        RTS
  $948F: E9 08     SBC #$08
  $9491: C9 04     CMP #$04
  $9493: F0 F8     BEQ $948d
  $9495: B0 F4     BCS $948b
  $9497: 29 0F     AND #$0f
  $9499: 38        SEC
  $949A: 60        RTS
  $949B: A5 E1     LDA $e1
  $949D: 20 17 80  JSR $8017
  $94A0: A4 D4     LDY $d4
  $94A2: B0 D4     BCS $9478
  $94A4: A9 05     LDA #$05
  $94A6: 20 1E DB  JSR $db1e
  $94A9: E6 E1     INC $e1
  $94AB: A9 0B     LDA #$0b
  $94AD: 4C 65 DC  JMP $dc65
  $94B0: A9 07     LDA #$07
  $94B2: 20 F5 D9  JSR $d9f5
  $94B5: A9 04     LDA #$04
  $94B7: 20 A9 DB  JSR $dba9
  $94BA: A9 3E     LDA #$3e
  $94BC: 4C 00 D5  JMP $d500
  $94BF: A5 19     LDA $19
  $94C1: 29 FC     AND #$fc
  $94C3: 85 19     STA $19
  $94C5: 60        RTS
  $94C6: A2 1F     LDX #$1f
  $94C8: A9 00     LDA #$00
  $94CA: 9D 91 06  STA $0691,X
  $94CD: CA        DEX
  $94CE: 10 FA     BPL $94ca
  $94D0: 60        RTS
  $94D1: 84 00     STY $00
  $94D3: BC FC D4  LDY $d4fc,X
  $94D6: 84 CC     STY $cc
  $94D8: BC FD D4  LDY $d4fd,X
  $94DB: 84 CD     STY $cd
  $94DD: 0A        ASL A
  $94DE: A8        TAY
  $94DF: B1 CC     LDA ($cc),Y
  $94E1: C8        INY
  $94E2: 85 D0     STA $d0
  $94E4: B1 CC     LDA ($cc),Y
  $94E6: 85 D1     STA $d1
  $94E8: A9 00     LDA #$00
  $94EA: 85 D2     STA $d2
  $94EC: 8D 9E 06  STA $069e
  $94EF: 20 D6 D6  JSR $d6d6
  $94F2: A6 E0     LDX $e0
  $94F4: A5 00     LDA $00
  $94F6: 85 E0     STA $e0
  $94F8: 8E 91 06  STX $0691
  $94FB: 60        RTS
  $94FC: 06 DD     ASL $dd
  $94FE: 58        CLI
  $94FF: E1 A0     SBC ($a0,X)
  $9501: 08        PHP
  $9502: A2 00     LDX #$00
  $9504: 20 D1 D4  JSR $d4d1
  $9507: AD 92 06  LDA $0692
  $950A: 20 17 80  JSR $8017
  $950D: 13 D5     SLO ($d5),Y
  $950F: 16 D5     ASL $d5,X
  $9511: 98        TYA
  $9512: D5 4C     CMP $4c,X
  $9514: 38        SEC
  $9515: D6 AD     DEC $ad,X
  $9517: 9F 06 F0  ??? $f006,Y
  $951A: 04 CE     NOP $ce
  $951C: 9F 06 60  ??? $6006,Y
  $951F: 20 99 D6  JSR $d699
  $9522: C9 EF     CMP #$ef
  $9524: 90 19     BCC $953f
  $9526: E9 F6     SBC #$f6
  $9528: 20 17 80  JSR $8017
  $952B: AD DA B6  LDA $b6da
  $952E: DA        NOP
  $952F: C5 DA     CMP $da
  $9531: A7 D6     LAX $d6
  $9533: C2 D5     NOP #$d5
  $9535: B9 D5 03  LDA $03d5,Y
  $9538: D6 09     DEC $09,X
  $953A: D6 C8     DEC $c8,X
  $953C: D5 87     CMP $87,X
  $953E: D5 48     CMP $48,X
  $9540: A9 01     LDA #$01
  $9542: 8D D3 06  STA $06d3
  $9545: 8D D7 06  STA $06d7
  $9548: A5 DE     LDA $de
  $954A: 8D D4 06  STA $06d4
  $954D: A5 DF     LDA $df
  $954F: 8D D5 06  STA $06d5
  $9552: 20 09 DB  JSR $db09
  $9555: 8D D8 06  STA $06d8
  $9558: 8E D9 06  STX $06d9
  $955B: 68        PLA
  $955C: 2C 23 07  BIT $0723
  $955F: 10 07     BPL $9568
  $9561: AD 1B 07  LDA $071b
  $9564: 29 80     AND #$80
  $9566: 51 D3     EOR ($d3),Y
  $9568: 20 29 80  JSR $8029
  $956B: 8D DA 06  STA $06da
  $956E: 8C D6 06  STY $06d6
  $9571: 20 23 80  JSR $8023
  $9574: D3 06     DCP ($06),Y
  $9576: E6 DE     INC $de
  $9578: A2 04     LDX #$04
  $957A: 2C 01 03  BIT $0301
  $957D: 50 02     BVC $9581
  $957F: A2 00     LDX #$00
  $9581: 8E 9F 06  STX $069f
  $9584: 4C 15 D6  JMP $d615
  $9587: A9 00     LDA #$00
  $9589: 2C 23 07  BIT $0723
  $958C: 10 06     BPL $9594
  $958E: 8D 23 07  STA $0723
  $9591: 4C B7 D6  JMP $d6b7
  $9594: 8D 92 06  STA $0692
  $9597: 60        RTS
  $9598: 20 C1 D6  JSR $d6c1
  $959B: 10 1B     BPL $95b8
  $959D: A9 00     LDA #$00
  $959F: 8D 92 06  STA $0692
  $95A2: AD 9E 06  LDA $069e
  $95A5: F0 05     BEQ $95ac
  $95A7: AD 91 06  LDA $0691
  $95AA: 85 E0     STA $e0
  $95AC: AD 95 06  LDA $0695
  $95AF: 8D A5 06  STA $06a5
  $95B2: AD 96 06  LDA $0696
  $95B5: 20 47 D9  JSR $d947
  $95B8: 60        RTS
  $95B9: AD DC 06  LDA $06dc
  $95BC: 18        CLC
  $95BD: 69 3A     ADC #$3a
  $95BF: 4C CB D5  JMP $d5cb
  $95C2: 20 99 D6  JSR $d699
  $95C5: 4C CB D5  JMP $d5cb
  $95C8: AD 99 06  LDA $0699
  $95CB: 8D 1B 07  STA $071b
  $95CE: 20 DB D5  JSR $d5db
  $95D1: A9 80     LDA #$80
  $95D3: 8D 23 07  STA $0723
  $95D6: A9 00     LDA #$00
  $95D8: 85 D5     STA $d5
  $95DA: 60        RTS
  $95DB: 20 AD D6  JSR $d6ad
  $95DE: AD 1B 07  LDA $071b
  $95E1: 29 7F     AND #$7f
  $95E3: 20 56 80  JSR $8056
  $95E6: A2 00     LDX #$00
  $95E8: A4 67     LDY $67
  $95EA: B1 65     LDA ($65),Y
  $95EC: 9D C8 06  STA $06c8,X
  $95EF: C8        INY
  $95F0: E8        INX
  $95F1: C6 68     DEC $68
  $95F3: D0 F5     BNE $95ea
  $95F5: A9 FF     LDA #$ff
  $95F7: 9D C8 06  STA $06c8,X
  $95FA: A9 C8     LDA #$c8
  $95FC: 85 D3     STA $d3
  $95FE: A9 06     LDA #$06
  $9600: 85 D4     STA $d4
  $9602: 60        RTS
  $9603: EE 9C 06  INC $069c
  $9606: 4C 1F D5  JMP $d51f
  $9609: A9 00     LDA #$00
  $960B: 8D 9C 06  STA $069c
  $960E: 60        RTS
  $960F: 20 E2 D6  JSR $d6e2
  $9612: 4C 18 D6  JMP $d618
  $9615: 20 EE D6  JSR $d6ee
  $9618: AE 9D 06  LDX $069d
  $961B: E8        INX
  $961C: F0 17     BEQ $9635
  $961E: A5 D7     LDA $d7
  $9620: E6 D7     INC $d7
  $9622: 29 01     AND #$01
  $9624: 18        CLC
  $9625: 65 D6     ADC $d6
  $9627: A8        TAY
  $9628: AE 9C 06  LDX $069c
  $962B: D0 02     BNE $962f
  $962D: A4 D6     LDY $d6
  $962F: B9 18 F7  LDA $f718,Y
  $9632: 20 FC D6  JSR $d6fc
  $9635: 4C F4 D6  JMP $d6f4
  $9638: 20 A0 D6  JSR $d6a0
  $963B: C9 FB     CMP #$fb
  $963D: 90 3B     BCC $967a
  $963F: E9 FB     SBC #$fb
  $9641: 20 17 80  JSR $8017
  $9644: 4E D6 56  LSR $56d6
  $9647: D6 86     DEC $86,X
  $9649: D6 65     DEC $65,X
  $964B: D6 60     DEC $60,X
  $964D: D6 A9     DEC $a9,X
  $964F: 40        RTI
  $9650: 20 14 DB  JSR $db14
  $9653: 4C 86 D6  JMP $d686
  $9656: AD 91 06  LDA $0691
  $9659: 85 E0     STA $e0
  $965B: A9 FF     LDA #$ff
  $965D: 8D 91 06  STA $0691
  $9660: A9 01     LDA #$01
  $9662: 8D 9E 06  STA $069e
  $9665: A9 02     LDA #$02
  $9667: 8D 92 06  STA $0692
  $966A: A5 D2     LDA $d2
  $966C: 18        CLC
  $966D: 65 D0     ADC $d0
  $966F: 85 D0     STA $d0
  $9671: 90 02     BCC $9675
  $9673: E6 D1     INC $d1
  $9675: A9 00     LDA #$00
  $9677: 85 D2     STA $d2
  $9679: 60        RTS
  $967A: 0A        ASL A
  $967B: AA        TAX
  $967C: BD D0 DC  LDA $dcd0,X
  $967F: 85 DE     STA $de
  $9681: BD D1 DC  LDA $dcd1,X
  $9684: 85 DF     STA $df
  $9686: 20 A0 D6  JSR $d6a0
  $9689: 85 D3     STA $d3
  $968B: 20 A0 D6  JSR $d6a0
  $968E: 85 D4     STA $d4
  $9690: A2 00     LDX #$00
  $9692: 86 D5     STX $d5
  $9694: E8        INX
  $9695: 8E 92 06  STX $0692
  $9698: 60        RTS
  $9699: A4 D5     LDY $d5
  $969B: E6 D5     INC $d5
  $969D: B1 D3     LDA ($d3),Y
  $969F: 60        RTS
  $96A0: A4 D2     LDY $d2
  $96A2: E6 D2     INC $d2
  $96A4: B1 D0     LDA ($d0),Y
  $96A6: 60        RTS
  $96A7: 20 99 D6  JSR $d699
  $96AA: 4C 14 DB  JMP $db14
  $96AD: A2 02     LDX #$02
  $96AF: B5 D3     LDA $d3,X
  $96B1: 95 DB     STA $db,X
  $96B3: CA        DEX
  $96B4: 10 F9     BPL $96af
  $96B6: 60        RTS
  $96B7: A2 02     LDX #$02
  $96B9: B5 DB     LDA $db,X
  $96BB: 95 D3     STA $d3,X
  $96BD: CA        DEX
  $96BE: 10 F9     BPL $96b9
  $96C0: 60        RTS
  $96C1: AD 01 03  LDA $0301
  $96C4: 4D 03 03  EOR $0303
  $96C7: 2D 01 03  AND $0301
  $96CA: 60        RTS
  $96CB: AD 9D 06  LDA $069d
  $96CE: 0A        ASL A
  $96CF: 85 D6     STA $d6
  $96D1: A9 00     LDA #$00
  $96D3: 85 D7     STA $d7
  $96D5: 60        RTS
  $96D6: A9 00     LDA #$00
  $96D8: AA        TAX
  $96D9: 9D 91 06  STA $0691,X
  $96DC: E8        INX
  $96DD: E0 04     CPX #$04
  $96DF: D0 F8     BNE $96d9
  $96E1: 60        RTS
  $96E2: 20 81 DC  JSR $dc81
  $96E5: 8E AD 06  STX $06ad
  $96E8: 8C AE 06  STY $06ae
  $96EB: 8D 9A 06  STA $069a
  $96EE: AD 9A 06  LDA $069a
  $96F1: 4C FC D6  JMP $d6fc
  $96F4: AD AF 06  LDA $06af
  $96F7: 4A        LSR A
  $96F8: 4A        LSR A
  $96F9: 4C 2C 80  JMP $802c
  $96FC: 0A        ASL A
  $96FD: A8        TAY
  $96FE: B9 6C EF  LDA $ef6c,Y
  $9701: 85 CC     STA $cc
  $9703: B9 6D EF  LDA $ef6d,Y
  $9706: 85 CD     STA $cd
  $9708: A0 00     LDY #$00
  $970A: B1 CC     LDA ($cc),Y
  $970C: C8        INY
  $970D: 85 1B     STA $1b
  $970F: B1 CC     LDA ($cc),Y
  $9711: 29 E0     AND #$e0
  $9713: C9 E0     CMP #$e0
  $9715: D0 01     BNE $9718
  $9717: 60        RTS
  $9718: C9 20     CMP #$20
  $971A: D0 0D     BNE $9729
  $971C: C8        INY
  $971D: B1 CC     LDA ($cc),Y
  $971F: C8        INY
  $9720: AA        TAX
  $9721: B1 CC     LDA ($cc),Y
  $9723: 86 CC     STX $cc
  $9725: 85 CD     STA $cd
  $9727: A0 00     LDY #$00
  $9729: B1 CC     LDA ($cc),Y
  $972B: 29 1F     AND #$1f
  $972D: AA        TAX
  $972E: BD 4C EF  LDA $ef4c,X
  $9731: 18        CLC
  $9732: 6D AD 06  ADC $06ad
  $9735: 85 C9     STA $c9
  $9737: C8        INY
  $9738: B1 CC     LDA ($cc),Y
  $973A: 85 C8     STA $c8
  $973C: C8        INY
  $973D: B1 CC     LDA ($cc),Y
  $973F: 48        PHA
  $9740: 29 1F     AND #$1f
  $9742: AA        TAX
  $9743: BD 5C EF  LDA $ef5c,X
  $9746: 18        CLC
  $9747: 6D AE 06  ADC $06ae
  $974A: AE AF 06  LDX $06af
  $974D: 9D 00 02  STA $0200,X
  $9750: 68        PLA
  $9751: 29 E0     AND #$e0
  $9753: 0A        ASL A
  $9754: 90 03     BCC $9759
  $9756: 09 08     ORA #$08
  $9758: 18        CLC
  $9759: 2A        ROL A
  $975A: 2A        ROL A
  $975B: 2A        ROL A
  $975C: 9D 02 02  STA $0202,X
  $975F: A5 C9     LDA $c9
  $9761: 9D 03 02  STA $0203,X
  $9764: C8        INY
  $9765: B1 CC     LDA ($cc),Y
  $9767: 9D 01 02  STA $0201,X
  $976A: C8        INY
  $976B: 20 32 D9  JSR $d932
  $976E: 8E AF 06  STX $06af
  $9771: C6 C8     DEC $c8
  $9773: D0 C8     BNE $973d
  $9775: 4C 0F D7  JMP $d70f
  $9778: A2 20     LDX #$20
  $977A: A0 88     LDY #$88
  $977C: 86 DF     STX $df
  $977E: 84 DE     STY $de
  $9780: AA        TAX
  $9781: BD A3 FD  LDA $fda3,X
  $9784: A8        TAY
  $9785: 29 1F     AND #$1f
  $9787: 85 1A     STA $1a
  $9789: 98        TYA
  $978A: 2A        ROL A
  $978B: 2A        ROL A
  $978C: 2A        ROL A
  $978D: 2A        ROL A
  $978E: 29 07     AND #$07
  $9790: 86 CB     STX $cb
  $9792: 20 A7 D8  JSR $d8a7
  $9795: A5 CB     LDA $cb
  $9797: 0A        ASL A
  $9798: 0A        ASL A
  $9799: 85 00     STA $00
  $979B: 0A        ASL A
  $979C: 18        CLC
  $979D: 65 00     ADC $00
  $979F: 85 00     STA $00
  $97A1: A5 DE     LDA $de
  $97A3: AA        TAX
  $97A4: 4A        LSR A
  $97A5: 4A        LSR A
  $97A6: 29 07     AND #$07
  $97A8: 85 0F     STA $0f
  $97AA: 8A        TXA
  $97AB: 10 06     BPL $97b3
  $97AD: A9 08     LDA #$08
  $97AF: 05 0F     ORA $0f
  $97B1: 85 0F     STA $0f
  $97B3: A9 03     LDA #$03
  $97B5: 25 DF     AND $df
  $97B7: 20 1E D9  JSR $d91e
  $97BA: 05 0F     ORA $0f
  $97BC: 18        CLC
  $97BD: 69 C0     ADC #$c0
  $97BF: 85 0F     STA $0f
  $97C1: A9 0C     LDA #$0c
  $97C3: 85 01     STA $01
  $97C5: 20 11 80  JSR $8011
  $97C8: A4 00     LDY $00
  $97CA: B9 DB F8  LDA $f8db,Y
  $97CD: E6 00     INC $00
  $97CF: 0A        ASL A
  $97D0: 85 02     STA $02
  $97D2: A8        TAY
  $97D3: B9 77 F9  LDA $f977,Y
  $97D6: 4A        LSR A
  $97D7: A8        TAY
  $97D8: B9 B0 FD  LDA $fdb0,Y
  $97DB: B0 03     BCS $97e0
  $97DD: 20 19 D9  JSR $d919
  $97E0: 0A        ASL A
  $97E1: 0A        ASL A
  $97E2: AA        TAX
  $97E3: 29 0C     AND #$0c
  $97E5: 85 04     STA $04
  $97E7: 8A        TXA
  $97E8: 29 30     AND #$30
  $97EA: 20 19 D9  JSR $d919
  $97ED: 05 04     ORA $04
  $97EF: 85 04     STA $04
  $97F1: A4 02     LDY $02
  $97F3: B9 78 F9  LDA $f978,Y
  $97F6: 4A        LSR A
  $97F7: A8        TAY
  $97F8: B9 B0 FD  LDA $fdb0,Y
  $97FB: 90 03     BCC $9800
  $97FD: 20 1E D9  JSR $d91e
  $9800: 4A        LSR A
  $9801: 4A        LSR A
  $9802: AA        TAX
  $9803: 29 30     AND #$30
  $9805: 05 04     ORA $04
  $9807: 85 04     STA $04
  $9809: 8A        TXA
  $980A: 29 0C     AND #$0c
  $980C: 20 1E D9  JSR $d91e
  $980F: 05 04     ORA $04
  $9811: AE 02 20  LDX $2002
  $9814: A2 23     LDX #$23
  $9816: 8E 06 20  STX $2006
  $9819: A6 0F     LDX $0f
  $981B: 8E 06 20  STX $2006
  $981E: 8D 07 20  STA $2007
  $9821: E6 0F     INC $0f
  $9823: A4 02     LDY $02
  $9825: B9 77 F9  LDA $f977,Y
  $9828: 20 6A D8  JSR $d86a
  $982B: A9 40     LDA #$40
  $982D: 20 14 DB  JSR $db14
  $9830: A4 02     LDY $02
  $9832: B9 78 F9  LDA $f978,Y
  $9835: 20 6A D8  JSR $d86a
  $9838: A5 DE     LDA $de
  $983A: 38        SEC
  $983B: E9 3C     SBC #$3c
  $983D: 85 DE     STA $de
  $983F: B0 02     BCS $9843
  $9841: C6 DF     DEC $df
  $9843: C6 01     DEC $01
  $9845: A5 01     LDA $01
  $9847: AA        TAX
  $9848: 29 03     AND #$03
  $984A: F0 03     BEQ $984f
  $984C: 4C C8 D7  JMP $d7c8
  $984F: 8A        TXA
  $9850: F0 0F     BEQ $9861
  $9852: A9 70     LDA #$70
  $9854: 20 14 DB  JSR $db14
  $9857: A5 0F     LDA $0f
  $9859: 18        CLC
  $985A: 69 04     ADC #$04
  $985C: 85 0F     STA $0f
  $985E: 4C C8 D7  JMP $d7c8
  $9861: 20 14 80  JSR $8014
  $9864: 20 08 D9  JSR $d908
  $9867: 4C 05 80  JMP $8005
  $986A: AA        TAX
  $986B: 2A        ROL A
  $986C: 2A        ROL A
  $986D: 2A        ROL A
  $986E: 2A        ROL A
  $986F: 29 07     AND #$07
  $9871: A8        TAY
  $9872: 8A        TXA
  $9873: 0A        ASL A
  $9874: 0A        ASL A
  $9875: 0A        ASL A
  $9876: 18        CLC
  $9877: 6D D9 F8  ADC $f8d9
  $987A: 85 05     STA $05
  $987C: 98        TYA
  $987D: 6D DA F8  ADC $f8da
  $9880: 85 06     STA $06
  $9882: A0 00     LDY #$00
  $9884: 2C 02 20  BIT $2002
  $9887: A5 DE     LDA $de
  $9889: A6 DF     LDX $df
  $988B: 8E 06 20  STX $2006
  $988E: 8D 06 20  STA $2006
  $9891: A2 04     LDX #$04
  $9893: B1 05     LDA ($05),Y
  $9895: 8D 07 20  STA $2007
  $9898: C8        INY
  $9899: CA        DEX
  $989A: D0 F7     BNE $9893
  $989C: C0 08     CPY #$08
  $989E: F0 06     BEQ $98a6
  $98A0: 20 09 DB  JSR $db09
  $98A3: 4C 8B D8  JMP $d88b
  $98A6: 60        RTS
  $98A7: 48        PHA
  $98A8: A2 02     LDX #$02
  $98AA: 0A        ASL A
  $98AB: 08        PHP
  $98AC: 90 02     BCC $98b0
  $98AE: A2 00     LDX #$00
  $98B0: BC D5 F8  LDY $f8d5,X
  $98B3: 84 CC     STY $cc
  $98B5: BC D6 F8  LDY $f8d6,X
  $98B8: 84 CD     STY $cd
  $98BA: 85 02     STA $02
  $98BC: A2 00     LDX #$00
  $98BE: 86 03     STX $03
  $98C0: 86 00     STX $00
  $98C2: 0A        ASL A
  $98C3: 26 00     ROL $00
  $98C5: 0A        ASL A
  $98C6: 26 00     ROL $00
  $98C8: 28        PLP
  $98C9: 90 04     BCC $98cf
  $98CB: 06 02     ASL $02
  $98CD: 26 03     ROL $03
  $98CF: 18        CLC
  $98D0: 65 02     ADC $02
  $98D2: 08        PHP
  $98D3: 18        CLC
  $98D4: 65 CC     ADC $cc
  $98D6: 85 CC     STA $cc
  $98D8: A5 00     LDA $00
  $98DA: 65 03     ADC $03
  $98DC: 28        PLP
  $98DD: 65 CD     ADC $cd
  $98DF: 85 CD     STA $cd
  $98E1: A2 10     LDX #$10
  $98E3: A0 00     LDY #$00
  $98E5: 68        PLA
  $98E6: 30 09     BMI $98f1
  $98E8: A2 03     LDX #$03
  $98EA: B1 CC     LDA ($cc),Y
  $98EC: 9D 18 03  STA $0318,X
  $98EF: C8        INY
  $98F0: E8        INX
  $98F1: 8A        TXA
  $98F2: 29 03     AND #$03
  $98F4: F0 06     BEQ $98fc
  $98F6: B1 CC     LDA ($cc),Y
  $98F8: 9D 18 03  STA $0318,X
  $98FB: C8        INY
  $98FC: E8        INX
  $98FD: 8A        TXA
  $98FE: 29 0F     AND #$0f
  $9900: D0 EF     BNE $98f1
  $9902: A9 30     LDA #$30
  $9904: 8D 1A 03  STA $031a
  $9907: 60        RTS
  $9908: 20 23 80  JSR $8023
  $990B: 15 03     ORA $03,X
  $990D: 60        RTS
  $990E: A9 0F     LDA #$0f
  $9910: A0 1F     LDY #$1f
  $9912: 99 18 03  STA $0318,Y
  $9915: 88        DEY
  $9916: 10 FA     BPL $9912
  $9918: 60        RTS
  $9919: 4A        LSR A
  $991A: 4A        LSR A
  $991B: 4A        LSR A
  $991C: 4A        LSR A
  $991D: 60        RTS
  $991E: 0A        ASL A
  $991F: 0A        ASL A
  $9920: 0A        ASL A
  $9921: 0A        ASL A
  $9922: 60        RTS
  $9923: 0A        ASL A
  $9924: 69 00     ADC #$00
  $9926: 0A        ASL A
  $9927: 69 00     ADC #$00
  $9929: 0A        ASL A
  $992A: 69 00     ADC #$00
  $992C: 0A        ASL A
  $992D: 69 00     ADC #$00
  $992F: 60        RTS
  $9930: E8        INX
  $9931: E8        INX
  $9932: E8        INX
  $9933: E8        INX
  $9934: E8        INX
  $9935: E8        INX
  $9936: 60        RTS
  $9937: 86 01     STX $01
  $9939: 20 81 DC  JSR $dc81
  $993C: 8D A5 06  STA $06a5
  $993F: 8E 95 06  STX $0695
  $9942: 8C 96 06  STY $0696
  $9945: A5 01     LDA $01
  $9947: 0A        ASL A
  $9948: 0A        ASL A
  $9949: AA        TAX
  $994A: BD 44 FE  LDA $fe44,X
  $994D: 8D A3 06  STA $06a3
  $9950: BD 45 FE  LDA $fe45,X
  $9953: 8D A4 06  STA $06a4
  $9956: BD 46 FE  LDA $fe46,X
  $9959: 8D A1 06  STA $06a1
  $995C: BD 47 FE  LDA $fe47,X
  $995F: 8D A2 06  STA $06a2
  $9962: 8D A8 06  STA $06a8
  $9965: A5 E0     LDA $e0
  $9967: 8D A9 06  STA $06a9
  $996A: A9 06     LDA #$06
  $996C: 85 E0     STA $e0
  $996E: A0 00     LDY #$00
  $9970: 8C AA 06  STY $06aa
  $9973: AD AA 06  LDA $06aa
  $9976: 20 17 80  JSR $8017
  $9979: 7F D9 8A  RRA $8ad9,X
  $997C: D9 9A D9  CMP $d99a,Y
  $997F: A9 00     LDA #$00
  $9981: 20 A5 D9  JSR $d9a5
  $9984: A9 01     LDA #$01
  $9986: 8D AA 06  STA $06aa
  $9989: 60        RTS
  $998A: A9 03     LDA #$03
  $998C: 20 A5 D9  JSR $d9a5
  $998F: CE A8 06  DEC $06a8
  $9992: D0 05     BNE $9999
  $9994: A9 02     LDA #$02
  $9996: 8D AA 06  STA $06aa
  $9999: 60        RTS
  $999A: A9 06     LDA #$06
  $999C: 20 A5 D9  JSR $d9a5
  $999F: AD A9 06  LDA $06a9
  $99A2: 85 E0     STA $e0
  $99A4: 60        RTS
  $99A5: 18        CLC
  $99A6: 6D A5 06  ADC $06a5
  $99A9: A8        TAY
  $99AA: AE 39 03  LDX $0339
  $99AD: AD A1 06  LDA $06a1
  $99B0: 18        CLC
  $99B1: 69 02     ADC #$02
  $99B3: 9D 3A 03  STA $033a,X
  $99B6: AD A3 06  LDA $06a3
  $99B9: 9D 3B 03  STA $033b,X
  $99BC: AD A4 06  LDA $06a4
  $99BF: 9D 3C 03  STA $033c,X
  $99C2: B9 0E FE  LDA $fe0e,Y
  $99C5: 9D 3D 03  STA $033d,X
  $99C8: B9 10 FE  LDA $fe10,Y
  $99CB: 48        PHA
  $99CC: B9 0F FE  LDA $fe0f,Y
  $99CF: AC A1 06  LDY $06a1
  $99D2: 9D 3E 03  STA $033e,X
  $99D5: E8        INX
  $99D6: 88        DEY
  $99D7: D0 F9     BNE $99d2
  $99D9: 68        PLA
  $99DA: 9D 3E 03  STA $033e,X
  $99DD: AC A1 06  LDY $06a1
  $99E0: C8        INY
  $99E1: C8        INY
  $99E2: 98        TYA
  $99E3: 20 2F 80  JSR $802f
  $99E6: AD A3 06  LDA $06a3
  $99E9: 18        CLC
  $99EA: 69 20     ADC #$20
  $99EC: 8D A3 06  STA $06a3
  $99EF: 90 03     BCC $99f4
  $99F1: EE A4 06  INC $06a4
  $99F4: 60        RTS
  $99F5: A0 07     LDY #$07
  $99F7: A2 02     LDX #$02
  $99F9: 20 D1 D4  JSR $d4d1
  $99FC: AD 92 06  LDA $0692
  $99FF: 20 17 80  JSR $8017
  $9A02: 08        PHP
  $9A03: DA        NOP
  $9A04: 11 DA     ORA ($da),Y
  $9A06: 98        TYA
  $9A07: D5 20     CMP $20,X
  $9A09: 38        SEC
  $9A0A: D6 AD     DEC $ad,X
  $9A0C: 91 06     STA ($06),Y
  $9A0E: 10 01     BPL $9a11
  $9A10: 60        RTS
  $9A11: A5 DE     LDA $de
  $9A13: 48        PHA
  $9A14: A5 DF     LDA $df
  $9A16: AE 39 03  LDX $0339
  $9A19: E8        INX
  $9A1A: 9D 3B 03  STA $033b,X
  $9A1D: 68        PLA
  $9A1E: 9D 3A 03  STA $033a,X
  $9A21: E8        INX
  $9A22: E8        INX
  $9A23: 86 C8     STX $c8
  $9A25: A2 00     LDX #$00
  $9A27: 8E 94 06  STX $0694
  $9A2A: 86 D5     STX $d5
  $9A2C: 20 99 D6  JSR $d699
  $9A2F: C9 F0     CMP #$f0
  $9A31: 90 11     BCC $9a44
  $9A33: E9 FA     SBC #$fa
  $9A35: 20 17 80  JSR $8017
  $9A38: 9B DA A1  TAS $a1da,Y
  $9A3B: DA        NOP
  $9A3C: A7 DA     LAX $da
  $9A3E: EC DA DC  CPX $dcda
  $9A41: DA        NOP
  $9A42: 69 DA     ADC #$da
  $9A44: 85 00     STA $00
  $9A46: 2C 23 07  BIT $0723
  $9A49: 10 08     BPL $9a53
  $9A4B: AD 1B 07  LDA $071b
  $9A4E: 29 80     AND #$80
  $9A50: 4D 00 00  EOR $0000
  $9A53: 20 29 80  JSR $8029
  $9A56: AE 93 06  LDX $0693
  $9A59: D0 01     BNE $9a5c
  $9A5B: 98        TYA
  $9A5C: A6 C8     LDX $c8
  $9A5E: E6 C8     INC $c8
  $9A60: 9D 3A 03  STA $033a,X
  $9A63: EE 94 06  INC $0694
  $9A66: 4C 2C DA  JMP $da2c
  $9A69: AD 94 06  LDA $0694
  $9A6C: AE 39 03  LDX $0339
  $9A6F: 9D 3A 03  STA $033a,X
  $9A72: 20 2F 80  JSR $802f
  $9A75: AD 93 06  LDA $0693
  $9A78: D0 0D     BNE $9a87
  $9A7A: A9 01     LDA #$01
  $9A7C: 8D 93 06  STA $0693
  $9A7F: 20 09 DB  JSR $db09
  $9A82: 48        PHA
  $9A83: 8A        TXA
  $9A84: 4C 16 DA  JMP $da16
  $9A87: A9 00     LDA #$00
  $9A89: 8D 92 06  STA $0692
  $9A8C: 8D 93 06  STA $0693
  $9A8F: 2C 23 07  BIT $0723
  $9A92: 10 06     BPL $9a9a
  $9A94: 8D 23 07  STA $0723
  $9A97: 20 B7 D6  JSR $d6b7
  $9A9A: 60        RTS
  $9A9B: 20 AD DA  JSR $daad
  $9A9E: 4C 2C DA  JMP $da2c
  $9AA1: 20 B6 DA  JSR $dab6
  $9AA4: 4C 2C DA  JMP $da2c
  $9AA7: 20 C5 DA  JSR $dac5
  $9AAA: 4C 2C DA  JMP $da2c
  $9AAD: 20 E2 DA  JSR $dae2
  $9AB0: 4A        LSR A
  $9AB1: B0 18     BCS $9acb
  $9AB3: 4C BD D5  JMP $d5bd
  $9AB6: AD DC 06  LDA $06dc
  $9AB9: C9 0A     CMP #$0a
  $9ABB: B0 03     BCS $9ac0
  $9ABD: 4C B9 D5  JMP $d5b9
  $9AC0: 38        SEC
  $9AC1: E9 09     SBC #$09
  $9AC3: D0 06     BNE $9acb
  $9AC5: 20 E2 DA  JSR $dae2
  $9AC8: 18        CLC
  $9AC9: 69 0E     ADC #$0e
  $9ACB: 0A        ASL A
  $9ACC: AA        TAX
  $9ACD: BD 70 E1  LDA $e170,X
  $9AD0: 85 D3     STA $d3
  $9AD2: BD 71 E1  LDA $e171,X
  $9AD5: 85 D4     STA $d4
  $9AD7: A9 00     LDA #$00
  $9AD9: 85 D5     STA $d5
  $9ADB: 60        RTS
  $9ADC: 20 C8 D5  JSR $d5c8
  $9ADF: 4C 2C DA  JMP $da2c
  $9AE2: A9 00     LDA #$00
  $9AE4: AE DE 06  LDX $06de
  $9AE7: F0 02     BEQ $9aeb
  $9AE9: A9 01     LDA #$01
  $9AEB: 60        RTS
  $9AEC: 20 F2 DA  JSR $daf2
  $9AEF: 4C 2C DA  JMP $da2c
  $9AF2: AE 4F 06  LDX $064f
  $9AF5: E0 09     CPX #$09
  $9AF7: 90 09     BCC $9b02
  $9AF9: 8A        TXA
  $9AFA: E9 09     SBC #$09
  $9AFC: AA        TAX
  $9AFD: E0 05     CPX #$05
  $9AFF: 90 01     BCC $9b02
  $9B01: E8        INX
  $9B02: 8A        TXA
  $9B03: 18        CLC
  $9B04: 69 10     ADC #$10
  $9B06: 4C CB DA  JMP $dacb
  $9B09: A5 DE     LDA $de
  $9B0B: 18        CLC
  $9B0C: 69 20     ADC #$20
  $9B0E: A6 DF     LDX $df
  $9B10: 90 01     BCC $9b13
  $9B12: E8        INX
  $9B13: 60        RTS
  $9B14: 18        CLC
  $9B15: 65 DE     ADC $de
  $9B17: 85 DE     STA $de
  $9B19: 90 02     BCC $9b1d
  $9B1B: E6 DF     INC $df
  $9B1D: 60        RTS
  $9B1E: 20 27 DB  JSR $db27
  $9B21: 20 39 DB  JSR $db39
  $9B24: 4C 52 DB  JMP $db52
  $9B27: 20 81 DC  JSR $dc81
  $9B2A: 8C B4 06  STY $06b4
  $9B2D: 8D B1 06  STA $06b1
  $9B30: 8E B2 06  STX $06b2
  $9B33: 20 3C DB  JSR $db3c
  $9B36: 4C 55 DB  JMP $db55
  $9B39: 20 1D 80  JSR $801d
  $9B3C: AD B1 06  LDA $06b1
  $9B3F: 8D 00 02  STA $0200
  $9B42: A9 FF     LDA #$ff
  $9B44: 8D 01 02  STA $0201
  $9B47: A9 20     LDA #$20
  $9B49: 8D 02 02  STA $0202
  $9B4C: A9 00     LDA #$00
  $9B4E: 8D 03 02  STA $0203
  $9B51: 60        RTS
  $9B52: 20 20 80  JSR $8020
  $9B55: 20 11 80  JSR $8011
  $9B58: A5 19     LDA $19
  $9B5A: 09 04     ORA #$04
  $9B5C: 8D 00 20  STA $2000
  $9B5F: AD B2 06  LDA $06b2
  $9B62: 48        PHA
  $9B63: 20 19 D9  JSR $d919
  $9B66: 09 20     ORA #$20
  $9B68: AA        TAX
  $9B69: 68        PLA
  $9B6A: 20 1E D9  JSR $d91e
  $9B6D: A8        TAY
  $9B6E: 2C 02 20  BIT $2002
  $9B71: 8E 06 20  STX $2006
  $9B74: 8C 06 20  STY $2006
  $9B77: A9 FF     LDA #$ff
  $9B79: 8D 07 20  STA $2007
  $9B7C: 8D 07 20  STA $2007
  $9B7F: A5 19     LDA $19
  $9B81: 8D 00 20  STA $2000
  $9B84: 4C 14 80  JMP $8014
  $9B87: A9 04     LDA #$04
  $9B89: 8D AF 06  STA $06af
  $9B8C: A5 E0     LDA $e0
  $9B8E: F0 23     BEQ $9bb3
  $9B90: 2C 02 20  BIT $2002
  $9B93: 70 FB     BVS $9b90
  $9B95: 2C 02 20  BIT $2002
  $9B98: 50 FB     BVC $9b95
  $9B9A: AD B4 06  LDA $06b4
  $9B9D: 29 1F     AND #$1f
  $9B9F: 09 40     ORA #$40
  $9BA1: 20 26 80  JSR $8026
  $9BA4: 4C 10 DC  JMP $dc10
  $9BA7: A9 00     LDA #$00
  $9BA9: 85 E0     STA $e0
  $9BAB: A9 00     LDA #$00
  $9BAD: 85 E1     STA $e1
  $9BAF: 85 E2     STA $e2
  $9BB1: 85 E3     STA $e3
  $9BB3: 60        RTS
  $9BB4: 20 81 DC  JSR $dc81
  $9BB7: 2C 02 20  BIT $2002
  $9BBA: 8E 06 20  STX $2006
  $9BBD: 8C 06 20  STY $2006
  $9BC0: 0A        ASL A
  $9BC1: AA        TAX
  $9BC2: BD 98 FE  LDA $fe98,X
  $9BC5: 85 CC     STA $cc
  $9BC7: BD 99 FE  LDA $fe99,X
  $9BCA: 85 CD     STA $cd
  $9BCC: A0 00     LDY #$00
  $9BCE: B1 CC     LDA ($cc),Y
  $9BD0: C8        INY
  $9BD1: AA        TAX
  $9BD2: 30 0B     BMI $9bdf
  $9BD4: B1 CC     LDA ($cc),Y
  $9BD6: C8        INY
  $9BD7: 8D 07 20  STA $2007
  $9BDA: CA        DEX
  $9BDB: D0 FA     BNE $9bd7
  $9BDD: F0 EF     BEQ $9bce
  $9BDF: C9 FF     CMP #$ff
  $9BE1: F0 0B     BEQ $9bee
  $9BE3: 29 7F     AND #$7f
  $9BE5: AA        TAX
  $9BE6: 2C 07 20  BIT $2007
  $9BE9: CA        DEX
  $9BEA: D0 FA     BNE $9be6
  $9BEC: F0 E0     BEQ $9bce
  $9BEE: 60        RTS
  $9BEF: BD 85 FE  LDA $fe85,X
  $9BF2: 8D A5 06  STA $06a5
  $9BF5: BD 84 FE  LDA $fe84,X
  $9BF8: E8        INX
  $9BF9: E8        INX
  $9BFA: 8E AB 06  STX $06ab
  $9BFD: 4C 47 D9  JMP $d947
  $9C00: A2 00     LDX #$00
  $9C02: A0 00     LDY #$00
  $9C04: 86 16     STX $16
  $9C06: 84 17     STY $17
  $9C08: 8E B6 06  STX $06b6
  $9C0B: 8C B7 06  STY $06b7
  $9C0E: F0 06     BEQ $9c16
  $9C10: AE B6 06  LDX $06b6
  $9C13: AC B7 06  LDY $06b7
  $9C16: 2C 02 20  BIT $2002
  $9C19: 8E 05 20  STX $2005
  $9C1C: 8C 05 20  STY $2005
  $9C1F: 60        RTS
  $9C20: AC 1A 07  LDY $071a
  $9C23: BE 00 EE  LDX $ee00,Y
  $9C26: EE 1A 07  INC $071a
  $9C29: 4C 2C DC  JMP $dc2c
  $9C2C: 85 59     STA $59
  $9C2E: 86 57     STX $57
  $9C30: A9 00     LDA #$00
  $9C32: 85 58     STA $58
  $9C34: 85 5C     STA $5c
  $9C36: 98        TYA
  $9C37: 48        PHA
  $9C38: 20 41 80  JSR $8041
  $9C3B: 68        PLA
  $9C3C: A8        TAY
  $9C3D: A5 5A     LDA $5a
  $9C3F: A6 57     LDX $57
  $9C41: 60        RTS
  $9C42: 0A        ASL A
  $9C43: 0A        ASL A
  $9C44: AA        TAX
  $9C45: BD 59 F7  LDA $f759,X
  $9C48: 8D 99 06  STA $0699
  $9C4B: BD 5A F7  LDA $f75a,X
  $9C4E: 8D 9A 06  STA $069a
  $9C51: BD 5B F7  LDA $f75b,X
  $9C54: 8D 9D 06  STA $069d
  $9C57: BD 5C F7  LDA $f75c,X
  $9C5A: 20 A7 D8  JSR $d8a7
  $9C5D: A9 0F     LDA #$0f
  $9C5F: 8D 19 03  STA $0319
  $9C62: 4C CB D6  JMP $d6cb
  $9C65: 20 42 DC  JSR $dc42
  $9C68: A9 01     LDA #$01
  $9C6A: 20 78 D7  JSR $d778
  $9C6D: A9 0C     LDA #$0c
  $9C6F: A2 00     LDX #$00
  $9C71: 20 37 D9  JSR $d937
  $9C74: A2 80     LDX #$80
  $9C76: 8E AD 06  STX $06ad
  $9C79: A0 47     LDY #$47
  $9C7B: 8C AE 06  STY $06ae
  $9C7E: 4C 15 D6  JMP $d615
  $9C81: 85 00     STA $00
  $9C83: 0A        ASL A
  $9C84: 65 00     ADC $00
  $9C86: AA        TAX
  $9C87: BD 96 DC  LDA $dc96,X
  $9C8A: 48        PHA
  $9C8B: BC 95 DC  LDY $dc95,X
  $9C8E: BD 94 DC  LDA $dc94,X
  $9C91: AA        TAX
  $9C92: 68        PLA
  $9C93: 60        RTS
  $9C94: 06 00     ASL $00
  $9C96: 1F 23 E5  SLO $e523,X
  $9C99: 02        ???
  $9C9A: 23 E1     RLA ($e1,X)
  $9C9C: 05 38     ORA $38
  $9C9E: A0 32     LDY #$32
  $9CA0: 1B 09 1B  SLO $1b09,Y
  $9CA3: 1E 00 7E  ASL $7e00,X
  $9CA6: 80 57     NOP #$57
  $9CA8: 02        ???
  $9CA9: 24 0E     BIT $0e
  $9CAB: 00        BRK
  $9CAC: 00        BRK
  $9CAD: 00        BRK
  $9CAE: 16 23     ASL $23,X
  $9CB0: C0 03     CPY #$03
  $9CB2: 2B C0     ANC #$c0
  $9CB4: 04 E0     NOP $e0
  $9CB6: 67 17     RRA $17
  $9CB8: 00        BRK
  $9CB9: 00        BRK
  $9CBA: 00        BRK
  $9CBB: 80 4F     NOP #$4f
  $9CBD: 12        ???
  $9CBE: 23 E9     RLA ($e9,X)
  $9CC0: 00        BRK
  $9CC1: 23 C3     RLA ($c3,X)
  $9CC3: 01 1E     ORA ($1e,X)
  $9CC5: 00        BRK
  $9CC6: 7D 80 00  ADC $0080,X
  $9CC9: 33 23     RLA ($23),Y
  $9CCB: D3 06     DCP ($06),Y
  $9CCD: 23 D3     RLA ($d3,X)
  $9CCF: 07 25     SLO $25
  $9CD1: 22        ???
  $9CD2: 67 22     RRA $22
  $9CD4: A8        TAY
  $9CD5: 22        ???
  $9CD6: E8        INX
  $9CD7: 22        ???
  $9CD8: 33 22     RLA ($22),Y
  $9CDA: AB 21     ATX #$21
  $9CDC: 34 22     NOP $22,X
  $9CDE: A7 22     LAX $22
  $9CE0: B6 20     LDX $20,Y
  $9CE2: E3 20     ISB ($20,X)
  $9CE4: A3 21     LAX ($21,X)
  $9CE6: F0 21     BEQ $9d09
  $9CE8: B0 22     BCS $9d0c
  $9CEA: 45 20     EOR $20
  $9CEC: 76 20     ROR $20,X
  $9CEE: 00        BRK
  $9CEF: 28        PLP
  $9CF0: 62        ???
  $9CF1: 21 62     AND ($62,X)
  $9CF3: 29 46     AND #$46
  $9CF5: 20 84 20  JSR $2084
  $9CF8: C4 20     CPY $20
  $9CFA: 04 21     NOP $21
  $9CFC: 44 21     NOP $21
  $9CFE: 07 21     SLO $21
  $9D00: 67 21     RRA $21
  $9D02: 88        DEY
  $9D03: 29 0F     AND #$0f
  $9D05: 21 E0     AND ($e0,X)
  $9D07: DD E1 DD  CMP $dde1,X
  $9D0A: E2 DD     NOP #$dd
  $9D0C: E9 DD     SBC #$dd
  $9D0E: EA        NOP
  $9D0F: DD FA DD  CMP $ddfa,X
  $9D12: 07 DE     SLO $de
  $9D14: 08        PHP
  $9D15: DE 09 DE  DEC $de09,X
  $9D18: 19 DE 1A  ORA $1ade,Y
  $9D1B: DE 24 DE  DEC $de24,X
  $9D1E: 25 DE     AND $de
  $9D20: 26 DE     ROL $de
  $9D22: 39 DE 46  AND $46de,Y
  $9D25: DE 47 DE  DEC $de47,X
  $9D28: 54 DE     NOP $de,X
  $9D2A: 64 DE     NOP $de
  $9D2C: 65 DE     ADC $de
  $9D2E: 6F DE 7C  RRA $7cde
  $9D31: DE 89 DE  DEC $de89,X
  $9D34: 99 DE A9  STA $a9de,Y
  $9D37: DE B3 DE  DEC $deb3,X
  $9D3A: BA        TSX
  $9D3B: DE CA DE  DEC $deca,X
  $9D3E: DD DE ED  CMP $edde,X
  $9D41: DE DA E0  DEC $e0da,X
  $9D44: E4 E0     CPX $e0
  $9D46: F7 DE     ISB $de,X
  $9D48: FB DE FF  ISB $ffde,Y
  $9D4B: DE 09 DF  DEC $df09,X
  $9D4E: 1C DF 2C  NOP $2cdf,X
  $9D51: DF 30 DF  DCP $df30,X
  $9D54: 34 DF     NOP $df,X
  $9D56: 38        SEC
  $9D57: DF 3C DF  DCP $df3c,X
  $9D5A: 40        RTI
  $9D5B: DF 44 DF  DCP $df44,X
  $9D5E: 48        PHA
  $9D5F: DF 52 DF  DCP $df52,X
  $9D62: 56 DF     LSR $df,X
  $9D64: 63 DF     RRA ($df,X)
  $9D66: 70 DF     BVS $9d47
  $9D68: 7D DF 8A  ADC $8adf,X
  $9D6B: DF 97 DF  DCP $df97,X
  $9D6E: 9E DF A5  SHX $a5df,Y
  $9D71: DF B8 DF  DCP $dfb8,X
  $9D74: BC DF C0  LDY $c0df,X
  $9D77: DF C4 DF  DCP $dfc4,X
  $9D7A: CE DF D2  DEC $d2df
  $9D7D: DF D2 E0  DCP $e0d2,X
  $9D80: E2 DF     NOP #$df
  $9D82: CE E0 E6  DEC $e6e0
  $9D85: DF FB DF  DCP $dffb,X
  $9D88: FF DF 03  ISB $03df,X
  $9D8B: E0 07     CPX #$07
  $9D8D: E0 0B     CPX #$0b
  $9D8F: E0 0F     CPX #$0f
  $9D91: E0 13     CPX #$13
  $9D93: E0 17     CPX #$17
  $9D95: E0 1B     CPX #$1b
  $9D97: E0 2B     CPX #$2b
  $9D99: E0 33     CPX #$33
  $9D9B: E0 37     CPX #$37
  $9D9D: E0 3B     CPX #$3b
  $9D9F: E0 3F     CPX #$3f
  $9DA1: E0 43     CPX #$43
  $9DA3: E0 47     CPX #$47
  $9DA5: E0 4B     CPX #$4b
  $9DA7: E0 4F     CPX #$4f
  $9DA9: E0 53     CPX #$53
  $9DAB: E0 57     CPX #$57
  $9DAD: E0 5B     CPX #$5b
  $9DAF: E0 5F     CPX #$5f
  $9DB1: E0 63     CPX #$63
  $9DB3: E0 67     CPX #$67
  $9DB5: E0 6B     CPX #$6b
  $9DB7: E0 6F     CPX #$6f
  $9DB9: E0 73     CPX #$73
  $9DBB: E0 77     CPX #$77
  $9DBD: E0 7B     CPX #$7b
  $9DBF: E0 7F     CPX #$7f
  $9DC1: E0 87     CPX #$87
  $9DC3: E0 8F     CPX #$8f
  $9DC5: E0 97     CPX #$97
  $9DC7: E0 9F     CPX #$9f
  $9DC9: E0 A7     CPX #$a7
  $9DCB: E0 AB     CPX #$ab
  $9DCD: E0 B2     CPX #$b2
  $9DCF: E0 BA     CPX #$ba
  $9DD1: E0 C2     CPX #$c2
  $9DD3: E0 2F     CPX #$2f
  $9DD5: E0 C6     CPX #$c6
  $9DD7: E0 CA     CPX #$ca
  $9DD9: E0 DC     CPX #$dc
  $9DDB: DD FD DF  CMP $dffd,X
  $9DDE: DD FF FF  CMP $ffff,X
  $9DE1: FF 01 9D  ISB $9d01,X
  $9DE4: E2 02     NOP #$02
  $9DE6: A6 E2     LDX $e2
  $9DE8: FF FF 01  ISB $01ff,X
  $9DEB: 76 E2     ROR $e2,X
  $9DED: FD 16 E3  SBC $e316,X
  $9DF0: FD 36 E3  SBC $e336,X
  $9DF3: 02        ???
  $9DF4: 1B E4 FD  SLO $fde4,Y
  $9DF7: 25 E4     AND $e4
  $9DF9: FF 01 76  ISB $7601,X
  $9DFC: E2 FD     NOP #$fd
  $9DFE: B3 E2     LAX ($e2),Y
  $9E00: FD DE E2  SBC $e2de,X
  $9E03: 02        ???
  $9E04: E4 E2     CPX $e2
  $9E06: FF FF FF  ISB $ffff,X
  $9E09: 01 76     ORA ($76,X)
  $9E0B: E2 FD     NOP #$fd
  $9E0D: 16 E3     ASL $e3,X
  $9E0F: FD 36 E3  SBC $e336,X
  $9E12: 02        ???
  $9E13: 21 E4     AND ($e4,X)
  $9E15: FD 25 E4  SBC $e425,X
  $9E18: FF FF 01  ISB $01ff,X
  $9E1B: D8        CLD
  $9E1C: E2 FD     NOP #$fd
  $9E1E: F6 E2     INC $e2,X
  $9E20: 02        ???
  $9E21: 90 E2     BCC $9e05
  $9E23: FF FF FF  ISB $ffff,X
  $9E26: 01 76     ORA ($76,X)
  $9E28: E2 FD     NOP #$fd
  $9E2A: 73 E3     RRA ($e3),Y
  $9E2C: FD 1B E4  SBC $e41b,X
  $9E2F: FD 80 E2  SBC $e280,X
  $9E32: 02        ???
  $9E33: 16 E3     ASL $e3,X
  $9E35: FD 0D E3  SBC $e30d,X
  $9E38: FF 01 58  ISB $5801,X
  $9E3B: E3 02     ISB ($02,X)
  $9E3D: B3 E2     LAX ($e2),Y
  $9E3F: FD 60 E3  SBC $e360,X
  $9E42: 03 66     SLO ($66,X)
  $9E44: E3 FF     ISB ($ff,X)
  $9E46: FF 01 7B  ISB $7b01,X
  $9E49: E3 FD     ISB ($fd,X)
  $9E4B: 82 E3     NOP #$e3
  $9E4D: 02        ???
  $9E4E: 8A        TXA
  $9E4F: E3 FD     ISB ($fd,X)
  $9E51: 79 E2 FF  ADC $ffe2,Y
  $9E54: 01 76     ORA ($76,X)
  $9E56: E2 FD     NOP #$fd
  $9E58: A5 E3     LDA $e3
  $9E5A: 02        ???
  $9E5B: D3 E2     DCP ($e2),Y
  $9E5D: FD 12 E4  SBC $e412,X
  $9E60: FD 79 E2  SBC $e279,X
  $9E63: FF FF 01  ISB $01ff,X
  $9E66: 76 E2     ROR $e2,X
  $9E68: FD FB E3  SBC $e3fb,X
  $9E6B: 02        ???
  $9E6C: 03 E4     SLO ($e4,X)
  $9E6E: FF 01 76  ISB $7601,X
  $9E71: E2 FD     NOP #$fd
  $9E73: 1C E3 FD  NOP $fde3,X
  $9E76: 93 E3     ??? ($e3),Y
  $9E78: 02        ???
  $9E79: 9A        TXS
  $9E7A: E3 FF     ISB ($ff,X)
  $9E7C: 01 59     ORA ($59,X)
  $9E7E: E5 02     SBC $02
  $9E80: F6 E2     INC $e2,X
  $9E82: FD D3 E2  SBC $e2d3,X
  $9E85: FD 25 E4  SBC $e425,X
  $9E88: FF 01 76  ISB $7601,X
  $9E8B: E2 FD     NOP #$fd
  $9E8D: 08        PHP
  $9E8E: E3 FD     ISB ($fd,X)
  $9E90: 12        ???
  $9E91: E4 02     CPX $02
  $9E93: FB E3 FD  ISB $fde3,Y
  $9E96: 79 E2 FF  ADC $ffe2,Y
  $9E99: 01 76     ORA ($76,X)
  $9E9B: E2 FD     NOP #$fd
  $9E9D: 90 E6     BCC $9e85
  $9E9F: FD B3 E2  SBC $e2b3,X
  $9EA2: FD 86 E2  SBC $e286,X
  $9EA5: FD 79 E2  SBC $e279,X
  $9EA8: FF 01 76  ISB $7601,X
  $9EAB: E2 FD     NOP #$fd
  $9EAD: 90 E6     BCC $9e95
  $9EAF: 02        ???
  $9EB0: F9 E6 FF  SBC $ffe6,Y
  $9EB3: 01 7B     ORA ($7b,X)
  $9EB5: E3 02     ISB ($02,X)
  $9EB7: 55 E6     EOR $e6,X
  $9EB9: FF 01 76  ISB $7601,X
  $9EBC: E2 FD     NOP #$fd
  $9EBE: 08        PHP
  $9EBF: E3 FD     ISB ($fd,X)
  $9EC1: 7C E2 FD  NOP $fde2,X
  $9EC4: 93 E3     ??? ($e3),Y
  $9EC6: 02        ???
  $9EC7: 9A        TXS
  $9EC8: E3 FF     ISB ($ff,X)
  $9ECA: 01 45     ORA ($45,X)
  $9ECC: E6 02     INC $02
  $9ECE: B3 E2     LAX ($e2),Y
  $9ED0: FD 60 E3  SBC $e360,X
  $9ED3: 03 08     SLO ($08,X)
  $9ED5: E3 FD     ISB ($fd,X)
  $9ED7: 7E E2 FD  ROR $fde2,X
  $9EDA: E3 E3     ISB ($e3,X)
  $9EDC: FF 01 76  ISB $7601,X
  $9EDF: E2 FD     NOP #$fd
  $9EE1: 1C E3 FD  NOP $fde3,X
  $9EE4: 7C E2 02  NOP $02e2,X
  $9EE7: 93 E3     ??? ($e3),Y
  $9EE9: 03 9A     SLO ($9a,X)
  $9EEB: E3 FF     ISB ($ff,X)
  $9EED: 01 76     ORA ($76,X)
  $9EEF: E2 FD     NOP #$fd
  $9EF1: B3 E2     LAX ($e2),Y
  $9EF3: FD 83 E5  SBC $e583,X
  $9EF6: FF 01 2A  ISB $2a01,X
  $9EF9: E4 FF     CPX $ff
  $9EFB: 01 43     ORA ($43,X)
  $9EFD: E4 FF     CPX $ff
  $9EFF: 01 7B     ORA ($7b,X)
  $9F01: E3 02     ISB ($02,X)
  $9F03: 6B E4     ARR #$e4
  $9F05: FD 79 E2  SBC $e279,X
  $9F08: FF 01 76  ISB $7601,X
  $9F0B: E2 FD     NOP #$fd
  $9F0D: 08        PHP
  $9F0E: E3 FD     ISB ($fd,X)
  $9F10: 7C E2 FD  NOP $fde2,X
  $9F13: 79 E4 FD  ADC $fde4,Y
  $9F16: 7F E4 02  RRA $02e4,X
  $9F19: 86 E4     STX $e4
  $9F1B: FF 01 76  ISB $7601,X
  $9F1E: E2 FD     NOP #$fd
  $9F20: 08        PHP
  $9F21: E3 FD     ISB ($fd,X)
  $9F23: 8E E4 02  STX $02e4
  $9F26: 79 E4 FD  ADC $fde4,Y
  $9F29: 93 E4     ??? ($e4),Y
  $9F2B: FF 01 9D  ISB $9d01,X
  $9F2E: E4 FF     CPX $ff
  $9F30: 01 B3     ORA ($b3,X)
  $9F32: E4 FF     CPX $ff
  $9F34: 01 C8     ORA ($c8,X)
  $9F36: E4 FF     CPX $ff
  $9F38: 01 EC     ORA ($ec,X)
  $9F3A: E4 FF     CPX $ff
  $9F3C: 01 0F     ORA ($0f,X)
  $9F3E: E5 FF     SBC $ff
  $9F40: 01 3D     ORA ($3d,X)
  $9F42: E5 FF     SBC $ff
  $9F44: 01 2D     ORA ($2d,X)
  $9F46: E5 FF     SBC $ff
  $9F48: 01 62     ORA ($62,X)
  $9F4A: E5 FD     SBC $fd
  $9F4C: 02        ???
  $9F4D: E3 02     ISB ($02,X)
  $9F4F: 71 E5     ADC ($e5),Y
  $9F51: FF 01 8E  ISB $8e01,X
  $9F54: E5 FF     SBC $ff
  $9F56: 01 A6     ORA ($a6,X)
  $9F58: E5 02     SBC $02
  $9F5A: B3 E5     LAX ($e5),Y
  $9F5C: FD 7C E2  SBC $e27c,X
  $9F5F: 03 BC     SLO ($bc,X)
  $9F61: E5 FF     SBC $ff
  $9F63: 01 76     ORA ($76,X)
  $9F65: E2 FD     NOP #$fd
  $9F67: B3 E5     LAX ($e5),Y
  $9F69: FD 80 E2  SBC $e280,X
  $9F6C: 02        ???
  $9F6D: C8        INY
  $9F6E: E5 FF     SBC $ff
  $9F70: 01 7B     ORA ($7b,X)
  $9F72: E3 FD     ISB ($fd,X)
  $9F74: B3 E5     LAX ($e5),Y
  $9F76: FD 82 E2  SBC $e282,X
  $9F79: 02        ???
  $9F7A: 32        ???
  $9F7B: E7 FF     ISB $ff
  $9F7D: 01 DF     ORA ($df,X)
  $9F7F: E5 02     SBC $02
  $9F81: EC E5 FD  CPX $fde5
  $9F84: F1 E5     SBC ($e5),Y
  $9F86: 03 F7     SLO ($f7,X)
  $9F88: E5 FF     SBC $ff
  $9F8A: 01 76     ORA ($76,X)
  $9F8C: E2 FD     NOP #$fd
  $9F8E: 8A        TXA
  $9F8F: E6 FD     INC $fd
  $9F91: F1 E5     SBC ($e5),Y
  $9F93: 02        ???
  $9F94: 00        BRK
  $9F95: E6 FF     INC $ff
  $9F97: 01 0E     ORA ($0e,X)
  $9F99: E6 03     INC $03
  $9F9B: F7 E5     ISB $e5,X
  $9F9D: FF 01 2E  ISB $2e01,X
  $9FA0: E6 03     INC $03
  $9FA2: 55 E6     EOR $e6,X
  $9FA4: FF 01 83  ISB $8301,X
  $9FA7: E6 FD     INC $fd
  $9FA9: EC E5 FD  CPX $fde5
  $9FAC: 86 E2     STX $e2
  $9FAE: 02        ???
  $9FAF: F6 E2     INC $e2,X
  $9FB1: FD D3 E2  SBC $e2d3,X
  $9FB4: FD 25 E4  SBC $e425,X
  $9FB7: FF 01 63  ISB $6301,X
  $9FBA: E6 FF     INC $ff
  $9FBC: 01 9A     ORA ($9a,X)
  $9FBE: E6 FF     INC $ff
  $9FC0: 01 BE     ORA ($be,X)
  $9FC2: E6 FF     INC $ff
  $9FC4: 01 E2     ORA ($e2,X)
  $9FC6: E6 02     INC $02
  $9FC8: ED E6 03  SBC $03e6
  $9FCB: F9 E6 FF  SBC $ffe6,Y
  $9FCE: 01 0A     ORA ($0a,X)
  $9FD0: E7 FF     ISB $ff
  $9FD2: 01 7A     ORA ($7a,X)
  $9FD4: E7 02     ISB $02
  $9FD6: 74 E4     NOP $e4,X
  $9FD8: FD D3 E2  SBC $e2d3,X
  $9FDB: FD 7E E2  SBC $e27e,X
  $9FDE: 03 68     SLO ($68,X)
  $9FE0: E5 FF     SBC $ff
  $9FE2: 01 4C     ORA ($4c,X)
  $9FE4: E7 FF     ISB $ff
  $9FE6: 01 64     ORA ($64,X)
  $9FE8: E7 02     ISB $02
  $9FEA: 6C E7 FE  JMP ($fee7)
  $9FED: 01 00     ORA ($00,X)
  $9FEF: 06 07     ASL $07
  $9FF1: 13 06     SLO ($06),Y
  $9FF3: FE 01 64  INC $6401,X
  $9FF6: E7 FD     ISB $fd
  $9FF8: 29 E7     AND #$e7
  $9FFA: FF 13 85  ISB $8513,X
  $9FFD: E7 FF     ISB $ff
  $9FFF: 13 36     SLO ($36),Y
  $A001: E8        INX
  $A002: FF 13 6D  ISB $6d13,X
  $A005: E8        INX
  $A006: FF 13 94  ISB $9413,X
  $A009: E8        INX
  $A00A: FF 13 B5  ISB $b513,X
  $A00D: E8        INX
  $A00E: FF 13 DA  ISB $da13,X
  $A011: E8        INX
  $A012: FF 13 0B  ISB $0b13,X
  $A015: E9 FF     SBC #$ff
  $A017: 13 39     SLO ($39),Y
  $A019: E9 FF     SBC #$ff
  $A01B: 13 6C     SLO ($6c),Y
  $A01D: E9 FE     SBC #$fe
  $A01F: 13 95     SLO ($95),Y
  $A021: E9 FE     SBC #$fe
  $A023: 13 C8     SLO ($c8),Y
  $A025: E9 FE     SBC #$fe
  $A027: 13 FF     SLO ($ff),Y
  $A029: E9 FF     SBC #$ff
  $A02B: 13 AE     SLO ($ae),Y
  $A02D: E7 FF     ISB $ff
  $A02F: 13 C0     SLO ($c0),Y
  $A031: E7 FF     ISB $ff
  $A033: 13 81     SLO ($81),Y
  $A035: EC FF 13  CPX $13ff
  $A038: D2        ???
  $A039: EA        NOP
  $A03A: FF 13 39  ISB $3913,X
  $A03D: E9 FF     SBC #$ff
  $A03F: 13 03     SLO ($03),Y
  $A041: EB FF     SBC #$ff
  $A043: 13 15     SLO ($15),Y
  $A045: EB FF     SBC #$ff
  $A047: 13 29     SLO ($29),Y
  $A049: EB FF     SBC #$ff
  $A04B: 13 43     SLO ($43),Y
  $A04D: EB FF     SBC #$ff
  $A04F: 13 5A     SLO ($5a),Y
  $A051: EB FF     SBC #$ff
  $A053: 13 76     SLO ($76),Y
  $A055: EB FF     SBC #$ff
  $A057: 13 93     SLO ($93),Y
  $A059: EB FF     SBC #$ff
  $A05B: 13 AB     SLO ($ab),Y
  $A05D: EB FF     SBC #$ff
  $A05F: 13 4E     SLO ($4e),Y
  $A061: EC FF 13  CPX $13ff
  $A064: C6 EB     DEC $eb
  $A066: FF 13 DD  ISB $dd13,X
  $A069: EB FF     SBC #$ff
  $A06B: 13 F6     SLO ($f6),Y
  $A06D: EB FF     SBC #$ff
  $A06F: 13 23     SLO ($23),Y
  $A071: EC FF 13  CPX $13ff
  $A074: 37 EC     RLA $ec,X
  $A076: FF 13 4E  ISB $4e13,X
  $A079: EC FF 13  CPX $13ff
  $A07C: 5A        NOP
  $A07D: EC FF 13  CPX $13ff
  $A080: 07 EA     SLO $ea
  $A082: FE 13 3F  INC $3f13,X
  $A085: EA        NOP
  $A086: FF 13 5B  ISB $5b13,X
  $A089: EA        NOP
  $A08A: FE 13 88  INC $8813,X
  $A08D: EA        NOP
  $A08E: FF 13 9A  ISB $9a13,X
  $A091: EA        NOP
  $A092: FE 13 C4  INC $c413,X
  $A095: EA        NOP
  $A096: FF 13 BC  ISB $bc13,X
  $A099: EC FE 13  CPX $13fe
  $A09C: DB EC FF  DCP $ffec,Y
  $A09F: 13 45     SLO ($45),Y
  $A0A1: ED FE 13  SBC $13fe
  $A0A4: 6A        ROR A
  $A0A5: ED FF 13  SBC $13ff
  $A0A8: B0 ED     BCS $a097
  $A0AA: FF 13 DE  ISB $de13,X
  $A0AD: ED 16 36  SBC $3616
  $A0B0: ED FF 13  SBC $13ff
  $A0B3: FE ED FE  INC $feed,X
  $A0B6: 13 26     SLO ($26),Y
  $A0B8: EE FF 13  INC $13ff
  $A0BB: 09 ED     ORA #$ed
  $A0BD: FF 13 36  ISB $3613,X
  $A0C0: ED FF 13  SBC $13ff
  $A0C3: 7F ED FF  RRA $ffed,X
  $A0C6: FD 74 E2  SBC $e274,X
  $A0C9: FC FD 74  NOP $74fd,X
  $A0CC: E2 FF     NOP #$ff
  $A0CE: 01 17     ORA ($17,X)
  $A0D0: E8        INX
  $A0D1: FF 13 08  ISB $0813,X
  $A0D4: EF FE 13  ISB $13fe
  $A0D7: DC E7 FF  NOP $ffe7,X
  $A0DA: 01 1F     ORA ($1f,X)
  $A0DC: E3 02     ISB ($02,X)
  $A0DE: FA        NOP
  $A0DF: E2 FD     NOP #$fd
  $A0E1: 2C E3 FF  BIT $ffe3
  $A0E4: 01 1F     ORA ($1f,X)
  $A0E6: E3 02     ISB ($02,X)
  $A0E8: F1 E2     SBC ($e2),Y
  $A0EA: FD 2C E3  SBC $e32c,X
  $A0ED: FF 00 3A  ISB $3a00,X
  $A0F0: EE 04 45  INC $4504
  $A0F3: EE 06 74  INC $7406
  $A0F6: E2 01     NOP #$01
  $A0F8: 4D EE 07  EOR $07ee
  $A0FB: 57 EE     SRE $ee,X
  $A0FD: FC 09 88  NOP $8809,X
  $A100: E2 0A     NOP #$0a
  $A102: 8A        TXA
  $A103: E2 0B     NOP #$0b
  $A105: 8C E2 0C  STY $0ce2
  $A108: 8E E2 FC  STX $fce2
  $A10B: FB 01 EF  ISB $ef01,Y
  $A10E: FB 11 EF  ISB $ef11,Y
  $A111: FB FA EE  ISB $eefa,Y
  $A114: 0E EE EE  ASL $eeee
  $A117: FB F4 EE  ISB $eef4,Y
  $A11A: FC 13 08  NOP $0813,X
  $A11D: EF FC 0D  ISB $0dfc
  $A120: 16 EF     ASL $ef,X
  $A122: FC 00 74  NOP $7400,X
  $A125: E2 FC     NOP #$fc
  $A127: 0D E6 EE  ORA $eee6
  $A12A: 12        ???
  $A12B: 74 E2     NOP $e2,X
  $A12D: FC 00 1E  NOP $1e00,X
  $A130: EF 01 2E  ISB $2e01
  $A133: EF 02 32  ISB $3202
  $A136: EF FC 05  ISB $05fc
  $A139: 36 EF     ROL $ef,X
  $A13B: FC 05 42  NOP $4205,X
  $A13E: EF FC 02  ISB $02fc
  $A141: 02        ???
  $A142: 04 05     NOP $05
  $A144: 02        ???
  $A145: 02        ???
  $A146: 08        PHP
  $A147: 0A        ASL A
  $A148: 02        ???
  $A149: 02        ???
  $A14A: 0D 0E 10  ORA $100e
  $A14D: 13 15     SLO ($15),Y
  $A14F: 14 10     NOP $10,X
  $A151: 11 13     ORA ($13),Y
  $A153: 1A        NOP
  $A154: 10 11     BPL $a167
  $A156: 13 1C     SLO ($1c),Y
  $A158: EE E0 FE  INC $fee0
  $A15B: E0 27     CPX #$27
  $A15D: E1 0B     SBC ($0b,X)
  $A15F: E1 0E     SBC ($0e,X)
  $A161: E1 11     SBC ($11,X)
  $A163: E1 1F     SBC ($1f,X)
  $A165: E1 23     SBC ($23,X)
  $A167: E1 1B     SBC ($1b,X)
  $A169: E1 2E     SBC ($2e,X)
  $A16B: E1 38     SBC ($38,X)
  $A16D: E1 3C     SBC ($3c,X)
  $A16F: E1 A2     SBC ($a2,X)
  $A171: E1 AC     SBC ($ac,X)
  $A173: E1 B7     SBC ($b7,X)
  $A175: E1 C1     SBC ($c1,X)
  $A177: E1 CA     SBC ($ca,X)
  $A179: E1 D5     SBC ($d5,X)
  $A17B: E1 DF     SBC ($df,X)
  $A17D: E1 E8     SBC ($e8,X)
  $A17F: E1 F0     SBC ($f0,X)
  $A181: E1 FA     SBC ($fa,X)
  $A183: E1 03     SBC ($03,X)
  $A185: E2 0D     NOP #$0d
  $A187: E2 16     NOP #$16
  $A189: E2 20     NOP #$20
  $A18B: E2 61     NOP #$61
  $A18D: EE 7C EE  INC $ee7c
  $A190: 95 EE     STA $ee,X
  $A192: 9E EE A7  SHX $a7ee,Y
  $A195: EE B0 EE  INC $eeb0
  $A198: B9 EE C2  LDA $c2ee,Y
  $A19B: EE CB EE  INC $eecb
  $A19E: D4 EE     NOP $ee,X
  $A1A0: DD EE 57  CMP $57ee,X
  $A1A3: 2D 15 1D  AND $1d15
  $A1A6: 2D 7D A4  AND $a47d
  $A1A9: 48        PHA
  $A1AA: 8C FF 80  STY $80ff
  $A1AD: A8        TAY
  $A1AE: D7 AD     DCP $ad,X
  $A1B0: 90 AD     BCC $a15f
  $A1B2: 7D A4 48  ADC $48a4,X
  $A1B5: 8C FF 82  STY $82ff
  $A1B8: A8        TAY
  $A1B9: D1 80     CMP ($80),Y
  $A1BB: 81 7D     STA ($7d,X)
  $A1BD: A4 48     LDY $48
  $A1BF: 8C FF 81  STY $81ff
  $A1C2: 8F A7 80  SAX $80a7
  $A1C5: 7D A4 48  ADC $48a4,X
  $A1C8: 8C FF 81  STY $81ff
  $A1CB: AD D1 A6  LDA $a6d1
  $A1CE: AD DD 7D  LDA $7ddd
  $A1D1: A4 48     LDY $48
  $A1D3: 8C FF 9E  STY $9eff
  $A1D6: A9 48     LDA #$48
  $A1D8: 8B 80     XAA #$80
  $A1DA: 7D A4 48  ADC $48a4,X
  $A1DD: 8C FF E6  STY $e6ff
  $A1E0: A8        TAY
  $A1E1: D0 48     BNE $a22b
  $A1E3: 7D A4 48  ADC $48a4,X
  $A1E6: 8C FF 85  STY $85ff
  $A1E9: 94 D9     STY $d9,X
  $A1EB: 7D A4 48  ADC $48a4,X
  $A1EE: 8C FF EC  STY $ecff
  $A1F1: A8        TAY
  $A1F2: 93 CF     ??? ($cf),Y
  $A1F4: A8        TAY
  $A1F5: 7D A4 48  ADC $48a4,X
  $A1F8: 8C FF 8C  STY $8cff
  $A1FB: EB 81     SBC #$81
  $A1FD: AD 7D A4  LDA $a47d
  $A200: 48        PHA
  $A201: 8C FF EC  STY $ecff
  $A204: 48        PHA
  $A205: A6 AD     LDX $ad
  $A207: DD 7D A4  CMP $a47d,X
  $A20A: 48        PHA
  $A20B: 8C FF 9B  STY $9bff
  $A20E: A6 AD     LDX $ad
  $A210: 8C 7D A4  STY $a47d
  $A213: 48        PHA
  $A214: 8C FF 95  STY $95ff
  $A217: 8B DD     XAA #$dd
  $A219: 81 91     STA ($91,X)
  $A21B: 7D A4 48  ADC $48a4,X
  $A21E: 8C FF 13  STY $13ff
  $A221: 02        ???
  $A222: 1D 02 3A  ORA $3a02,X
  $A225: 09 02     ORA #$02
  $A227: 13 02     SLO ($02),Y
  $A229: 65 FF     ADC $ff
  $A22B: FF FF FF  ISB $ffff,X
  $A22E: FF 06 00  ISB $0006,X
  $A231: 07 01     SLO $01
  $A233: FF FF 08  ISB $08ff,X
  $A236: 02        ???
  $A237: 09 03     ORA #$03
  $A239: 0A        ASL A
  $A23A: 04 0F     NOP $0f
  $A23C: 05 11     ORA $11
  $A23E: 06 10     ASL $10
  $A240: 07 FF     SLO $ff
  $A242: FF FF FF  ISB $ffff,X
  $A245: FF FF FF  ISB $ffff,X
  $A248: FF FF FF  ISB $ffff,X
  $A24B: FF FF FF  ISB $ffff,X
  $A24E: FF 0E 08  ISB $080e,X
  $A251: 12        ???
  $A252: 09 20     ORA #$20
  $A254: 21 22     AND ($22,X)
  $A256: 23 24     RLA ($24,X)
  $A258: 22        ???
  $A259: 25 26     AND $26
  $A25B: 27 28     RLA $28
  $A25D: 29 2D     AND #$2d
  $A25F: 2A        ROL A
  $A260: 2B 2C     ANC #$2c
  $A262: 2E 2F 30  ROL $302f
  $A265: 3D 35 10  AND $1035,X
  $A268: 31 32     AND ($32),Y
  $A26A: 33 34     RLA ($34),Y
  $A26C: 35 36     AND $36,X
  $A26E: 37 38     RLA $38,X
  $A270: 39 3A 3B  AND $3b3a,Y
  $A273: 36 FE     ROL $fe,X
  $A275: FF 3C FC  ISB $fc3c,X
  $A278: FF FD 3D  ISB $3dfd,X
  $A27B: FF 18 FF  ISB $ff18,X
  $A27E: 19 FF 4F  ORA $4fff,Y
  $A281: FF 13 FF  ISB $ff13,X
  $A284: 3A        NOP
  $A285: FF 36 FF  ISB $ff36,X
  $A288: FC FF FD  NOP $fdff,X
  $A28B: FF FA FF  ISB $fffa,X
  $A28E: FB FF 01  ISB $01ff,Y
  $A291: 2E 06 15  ROL $1506
  $A294: 11 06     ORA ($06),Y
  $A296: 19 14 0C  ORA $0c14,Y
  $A299: 58        CLI
  $A29A: FD 3D FF  SBC $ff3d,X
  $A29D: 3C FC 24  NOP $24fc,X
  $A2A0: 59 2D 0C  EOR $0c2d,Y
  $A2A3: 28        PLP
  $A2A4: 14 FF     NOP $ff,X
  $A2A6: 06 2C     ASL $2c
  $A2A8: 1A        NOP
  $A2A9: 06 0B     ASL $0b
  $A2AB: 21 12     AND ($12,X)
  $A2AD: 01 09     ORA ($09,X)
  $A2AF: 02        ???
  $A2B0: FD 3D FF  SBC $ff3d,X
  $A2B3: 1F 2D 14  SLO $142d,X
  $A2B6: FF 3A A7  ISB $a73a,X
  $A2B9: 48        PHA
  $A2BA: DD 0B 12  CMP $120b,X
  $A2BD: 28        PLP
  $A2BE: 05 26     ORA $26
  $A2C0: 2E 12 FF  ROL $ff12
  $A2C3: 01 01     ORA ($01,X)
  $A2C5: 06 15     ASL $15
  $A2C7: 14 2E     NOP $2e,X
  $A2C9: 12        ???
  $A2CA: 01 12     ORA ($12,X)
  $A2CC: 19 59 21  ORA $2159,Y
  $A2CF: 59 FD 3D  EOR $3dfd,Y
  $A2D2: FF 0B 31  ISB $310b,X
  $A2D5: 02        ???
  $A2D6: 65 FF     ADC $ff
  $A2D8: 3C FC 25  NOP $25fc,X
  $A2DB: 0B 36     ANC #$36
  $A2DD: FF 18 10  ISB $1018,X
  $A2E0: 05 26     ORA $26
  $A2E2: 5C FF 7A  NOP $7aff,X
  $A2E5: 41 2C     EOR ($2c,X)
  $A2E7: 14 0B     NOP $0b,X
  $A2E9: 13 52     SLO ($52),Y
  $A2EB: 25 02     AND $02
  $A2ED: 36 FD     ROL $fd,X
  $A2EF: 3D FF 09  AND $09ff,X
  $A2F2: 02        ???
  $A2F3: 19 2D FF  ORA $ff2d,Y
  $A2F6: 11 50     ORA ($50),Y
  $A2F8: 5C FF 03  NOP $03ff,X
  $A2FB: 2D 10 31  AND $3110
  $A2FE: 02        ???
  $A2FF: 0D 2D FF  ORA $ff2d
  $A302: 8A        TXA
  $A303: AE 85 48  LDX $4885
  $A306: 19 FF 04  ORA $04ff,Y
  $A309: 29 0F     AND #$0f
  $A30B: 10 FF     BPL $a30c
  $A30D: 24 21     BIT $21
  $A30F: 14 2D     NOP $2d,X
  $A311: 59 36 FD  EOR $fd36,Y
  $A314: 3D FF 04  AND $04ff,X
  $A317: 29 0F     AND #$0f
  $A319: 10 18     BPL $a333
  $A31B: FF F6 18  ISB $18f6,X
  $A31E: FF 3C FC  ISB $fc3c,X
  $A321: 1F 2D 14  SLO $142d,X
  $A324: 34 04     NOP $04,X
  $A326: 11 05     ORA ($05),Y
  $A328: 29 0A     AND #$0a
  $A32A: 1E FF 22  ASL $22ff,X
  $A32D: 4F 2D 63  SRE $632d
  $A330: 2E 12 17  ROL $1712
  $A333: FD 3D FF  SBC $ff3d,X
  $A336: 22        ???
  $A337: 07 1A     SLO $1a
  $A339: 31 02     AND ($02),Y
  $A33B: 19 FF 3C  ORA $3cff,Y
  $A33E: FC 09 02  NOP $0209,X
  $A341: 09 02     ORA #$02
  $A343: 0D 01 FF  ORA $ff01
  $A346: 00        BRK
  $A347: 01 12     ORA ($12,X)
  $A349: 15 FF     ORA $ff,X
  $A34B: 09 09     ORA #$09
  $A34D: 1E 5C 23  ASL $235c,X
  $A350: 29 28     AND #$28
  $A352: 13 19     SLO ($19),Y
  $A354: 14 FD     NOP $fd,X
  $A356: 3D FF 3C  AND $3cff,X
  $A359: FC FA 3B  NOP $3bfa,X
  $A35C: 15 01     ORA $01,X
  $A35E: 28        PLP
  $A35F: FF 18 0F  ISB $0f18,X
  $A362: 21 15     AND ($15,X)
  $A364: 22        ???
  $A365: FF 09 18  ISB $1809,X
  $A368: 0B 00     ANC #$00
  $A36A: 01 34     ORA ($34,X)
  $A36C: 05 11     ORA $11
  $A36E: 58        CLI
  $A36F: 36 FD     ROL $fd,X
  $A371: 3D FF AB  AND $abff,X
  $A374: 48        PHA
  $A375: A8        TAY
  $A376: DD 85 AE  CMP $ae85,X
  $A379: EA        NOP
  $A37A: FF 3C FC  ISB $fc3c,X
  $A37D: 07 0E     SLO $0e
  $A37F: 2E 36 FF  ROL $ff36
  $A382: 09 2D     ORA #$2d
  $A384: 14 13     NOP $13,X
  $A386: 09 2A     ORA #$2a
  $A388: 5C FF 1E  NOP $1eff,X
  $A38B: 08        PHP
  $A38C: 12        ???
  $A38D: 0F 1E 28  SLO $281e
  $A390: 05 36     ORA $36
  $A392: FF 0E 09  ISB $090e,X
  $A395: 5A        NOP
  $A396: 05 26     ORA $26
  $A398: 2C FF 1F  BIT $1fff
  $A39B: 0D 12 23  ORA $2312
  $A39E: 28        PLP
  $A39F: 2D 59 36  AND $3659
  $A3A2: FD 3D FF  SBC $ff3d,X
  $A3A5: 1E 59 1E  ASL $1e59,X
  $A3A8: 08        PHP
  $A3A9: 0F 2B 08  SLO $082b
  $A3AC: 55 2F     EOR $2f,X
  $A3AE: 14 01     NOP $01,X
  $A3B0: 36 FF     ROL $ff,X
  $A3B2: 3C FC 13  NOP $13fc,X
  $A3B5: 26 29     ROL $29
  $A3B7: 0F 26 13  SLO $1326
  $A3BA: 27 05     RLA $05
  $A3BC: 03 0C     SLO ($0c,X)
  $A3BE: FF 0E 29  ISB $290e,X
  $A3C1: 4F 8A AE  SRE $ae8a
  $A3C4: 85 48     STA $48
  $A3C6: 18        CLC
  $A3C7: 06 1D     ASL $1d
  $A3C9: 2D 14 2D  AND $2d14
  $A3CC: 59 FD 3D  EOR $3dfd,Y
  $A3CF: FF 3C FC  ISB $fc3c,X
  $A3D2: FA        NOP
  $A3D3: 43 13     SRE ($13,X)
  $A3D5: F9 3B 08  SBC $083b,Y
  $A3D8: 2E 10 2F  ROL $2f10
  $A3DB: 07 2C     SLO $2c
  $A3DD: 11 08     ORA ($08),Y
  $A3DF: 28        PLP
  $A3E0: 1E 5C FF  ASL $ff5c,X
  $A3E3: 1E 08 26  ASL $2608,X
  $A3E6: 29 14     AND #$14
  $A3E8: 01 2D     ORA ($2d,X)
  $A3EA: 59 36 FD  EOR $fd36,Y
  $A3ED: 3D FF 3C  AND $3cff,X
  $A3F0: FC 0D 05  NOP $050d,X
  $A3F3: 01 18     ORA ($18,X)
  $A3F5: 06 31     ASL $31
  $A3F7: 02        ???
  $A3F8: 53 02     SRE ($02),Y
  $A3FA: FF 00 06  ISB $0600,X
  $A3FD: 26 21     ROL $21
  $A3FF: 28        PLP
  $A400: 14 36     NOP $36,X
  $A402: FF 0B 00  ISB $000b,X
  $A405: 01 19     ORA ($19,X)
  $A407: 3A        NOP
  $A408: 04 2B     NOP $2b
  $A40A: 2E 12 14  ROL $1412
  $A40D: 01 36     ORA ($36,X)
  $A40F: FD 3D FF  SBC $ff3d,X
  $A412: 19 09 29  ORA $2909,Y
  $A415: 05 26     ORA $26
  $A417: 14 2D     NOP $2d,X
  $A419: 59 FF 24  EOR $24ff,Y
  $A41C: 02        ???
  $A41D: 0B 31     ANC #$31
  $A41F: 02        ???
  $A420: FF 0D 05  ISB $050d,X
  $A423: 01 FF     ORA ($ff,X)
  $A425: 59 36 FD  EOR $fd36,Y
  $A428: 3D FF 3C  AND $3cff,X
  $A42B: FC 1C 2E  NOP $2e1c,X
  $A42E: 3A        NOP
  $A42F: 09 18     ORA #$18
  $A431: 0B 00     ANC #$00
  $A433: 01 34     ORA ($34,X)
  $A435: F9 37 22  SBC $2237,Y
  $A438: 02        ???
  $A439: 01 0F     ORA ($0f,X)
  $A43B: 59 06 59  EOR $5906,Y
  $A43E: 57 36     SRE $36,X
  $A440: FD 3D FF  SBC $ff3d,X
  $A443: 3C FC 00  NOP $00fc,X
  $A446: 2D 0B 2D  AND $2d0b
  $A449: 0C 28 18  NOP $1828
  $A44C: 19 3A 19  ORA $193a,Y
  $A44F: 23 01     RLA ($01,X)
  $A451: 57 F9     SRE $f9,X
  $A453: 33 04     RLA ($04),Y
  $A455: 29 18     AND #$18
  $A457: 85 9F     STA $9f
  $A459: 8E A7 8B  STX $8ba7
  $A45C: B0 48     BCS $a4a6
  $A45E: 93 19     ??? ($19),Y
  $A460: F9 34 15  SBC $1534,Y
  $A463: 1E 01 63  ASL $6301,X
  $A466: 25 36     AND $36
  $A468: FD 3D FF  SBC $ff3d,X
  $A46B: F6 21     INC $21,X
  $A46D: 3A        NOP
  $A46E: 1F 12 2A  SLO $2a12,X
  $A471: 25 36     AND $36
  $A473: FF 0B 05  ISB $050b,X
  $A476: 0B 34     ANC #$34
  $A478: FF 8C 85  ISB $858c,X
  $A47B: 81 A6     STA ($a6,X)
  $A47D: E5 FF     SBC $ff
  $A47F: 99 A7 88  STA $88a7,Y
  $A482: 48        PHA
  $A483: AD 19 FF  LDA $ff19
  $A486: 20 12 06  JSR $0612
  $A489: 59 57 FD  EOR $fd57,Y
  $A48C: 3D FF 18  AND $18ff,X
  $A48F: 65 06     ADC $06
  $A491: 19 FF 59  ORA $59ff,Y
  $A494: 08        PHP
  $A495: 55 2F     EOR $2f,X
  $A497: 14 01     NOP $01,X
  $A499: 57 FD     SRE $fd,X
  $A49B: 3D FF 3C  AND $3cff,X
  $A49E: FC 1B 2E  NOP $2e1b,X
  $A4A1: 3A        NOP
  $A4A2: F6 22     INC $22,X
  $A4A4: F9 38 0F  SBC $0f38,Y
  $A4A7: 01 0B     ORA ($0b,X)
  $A4A9: 0F 09 13  SLO $1309
  $A4AC: 14 01     NOP $01,X
  $A4AE: 8F 81 FD  SAX $fd81
  $A4B1: 3D FF 3C  AND $3cff,X
  $A4B4: FC 5D 29  NOP $295d,X
  $A4B7: 34 0E     NOP $0e,X
  $A4B9: 2A        ROL A
  $A4BA: 0E 2A 3A  ASL $3a2a
  $A4BD: 1D 2D 06  ORA $062d,X
  $A4C0: 2C 59 0C  BIT $0c59
  $A4C3: 8F 81 FD  SAX $fd81
  $A4C6: 3D FF 3C  AND $3cff,X
  $A4C9: FC 1B 2E  NOP $2e1b,X
  $A4CC: 3A        NOP
  $A4CD: 23 19     RLA ($19,X)
  $A4CF: 27 09     RLA $09
  $A4D1: 29 51     AND #$51
  $A4D3: 26 01     ROL $01
  $A4D5: F9 35 19  SBC $1935,Y
  $A4D8: 53 0F     SRE ($0f),Y
  $A4DA: 03 4F     SLO ($4f,X)
  $A4DC: 14 01     NOP $01,X
  $A4DE: 13 3A     SLO ($3a),Y
  $A4E0: 04 22     NOP $22
  $A4E2: 0B 2A     ANC #$2a
  $A4E4: 07 14     SLO $14
  $A4E6: 01 8F     ORA ($8f,X)
  $A4E8: 81 FD     STA ($fd,X)
  $A4EA: 3D FF 3C  AND $3cff,X
  $A4ED: FC 25 0B  NOP $0b25,X
  $A4F0: 34 09     NOP $09,X
  $A4F2: 18        CLC
  $A4F3: 1E 1E F6  ASL $f61e,X
  $A4F6: 2C F9 34  BIT $34f9
  $A4F9: 0F 04 0B  SLO $0b04
  $A4FC: 34 08     NOP $08,X
  $A4FE: 2E 0B 31  ROL $310b
  $A501: 02        ???
  $A502: 5C F9 36  NOP $36f9,X
  $A505: FA        NOP
  $A506: 43 2C     SRE ($2c,X)
  $A508: 0F 04 0C  SLO $0c04
  $A50B: 36 FD     ROL $fd,X
  $A50D: 3D FF 3C  AND $3cff,X
  $A510: FC 0A 0C  NOP $0c0a,X
  $A513: 4F 59 14  SRE $1459
  $A516: 34 F6     NOP $f6,X
  $A518: F9 36 59  SBC $5936,Y
  $A51B: 4F 34 90  SRE $9034
  $A51E: 48        PHA
  $A51F: A0 AB     LDY #$ab
  $A521: 48        PHA
  $A522: 87 5C     SAX $5c
  $A524: 19 1E 08  ORA $081e,Y
  $A527: 14 01     NOP $01,X
  $A529: 57 FD     SRE $fd,X
  $A52B: 3D FF 3C  AND $3cff,X
  $A52E: FC 04 29  NOP $2904,X
  $A531: 19 1E 08  ORA $081e,Y
  $A534: 2D 58 36  AND $3658
  $A537: FA        NOP
  $A538: 01 36     ORA ($36,X)
  $A53A: FD 3D FF  SBC $ff3d,X
  $A53D: 3C FC FA  NOP $fafc,X
  $A540: 01 34     ORA ($34,X)
  $A542: 25 02     AND $02
  $A544: 0B 2F     ANC #$2f
  $A546: 0B 14     ANC #$14
  $A548: 01 57     ORA ($57,X)
  $A54A: F9 35 04  SBC $0435,Y
  $A54D: 1E 03 2C  ASL $2c03,X
  $A550: 3A        NOP
  $A551: 65 10     ADC $10
  $A553: 18        CLC
  $A554: 21 0C     AND ($0c,X)
  $A556: FD 3D FF  SBC $ff3d,X
  $A559: 3C FC 1E  NOP $1efc,X
  $A55C: 08        PHP
  $A55D: 14 01     NOP $01,X
  $A55F: 57 36     SRE $36,X
  $A561: FF 3C FC  ISB $fc3c,X
  $A564: 04 29     NOP $29
  $A566: 18        CLC
  $A567: FF 09 29  ISB $2909,X
  $A56A: 05 26     ORA $26
  $A56C: 59 36 FD  EOR $fd36,Y
  $A56F: 3D FF 1E  AND $1eff,X
  $A572: 08        PHP
  $A573: 14 01     NOP $01,X
  $A575: 8A        TXA
  $A576: AE 85 48  LDX $4885
  $A579: 59 F9 37  EOR $37f9,Y
  $A57C: 0D 21 28  ORA $2821
  $A57F: 36 FD     ROL $fd,X
  $A581: 3D FF 3A  AND $3aff,X
  $A584: CF AE 91  DCP $91ae
  $A587: 5C 01 09  NOP $0901,X
  $A58A: 02        ???
  $A58B: FD 3D FF  SBC $ff3d,X
  $A58E: 3C FC 24  NOP $24fc,X
  $A591: 06 51     ASL $51
  $A593: 15 18     ORA $18,X
  $A595: 09 2D     ORA #$2d
  $A597: 55 31     EOR $31,X
  $A599: 02        ???
  $A59A: F9 36 1F  SBC $1f36,Y
  $A59D: 0D 12 23  ORA $2312
  $A5A0: 28        PLP
  $A5A1: 57 36     SRE $36,X
  $A5A3: FD 3D FF  SBC $ff3d,X
  $A5A6: 3C FC 1B  NOP $1bfc,X
  $A5A9: 2D 3A 00  AND $003a
  $A5AC: 18        CLC
  $A5AD: 3F 3E 63  RLA $633e,X
  $A5B0: 2D 22 FF  AND $ff22
  $A5B3: 12        ???
  $A5B4: 2D 0A 01  AND $010a
  $A5B7: FA        NOP
  $A5B8: 1C 0A 1E  NOP $1e0a,X
  $A5BB: FF 12 06  ISB $0612,X
  $A5BE: 5C 19 14  NOP $1419,X
  $A5C1: 05 2E     ORA $2e
  $A5C3: 0F 14 FD  SLO $fd14
  $A5C6: 3D FF 1E  AND $1eff,X
  $A5C9: 08        PHP
  $A5CA: 28        PLP
  $A5CB: 2B 08     ANC #$08
  $A5CD: 14 01     NOP $01,X
  $A5CF: 2D 59 F9  AND $f959
  $A5D2: 37 06     RLA $06,X
  $A5D4: 26 07     ROL $07
  $A5D6: 15 01     ORA $01,X
  $A5D8: 09 02     ORA #$02
  $A5DA: 57 36     SRE $36,X
  $A5DC: FD 3D FF  SBC $ff3d,X
  $A5DF: 3C FC 09  NOP $09fc,X
  $A5E2: 18        CLC
  $A5E3: 84 A9     STY $a9
  $A5E5: 4F 01 28  SRE $2801
  $A5E8: 05 50     ORA $50
  $A5EA: 27 FF     RLA $ff
  $A5EC: D5 AF     CMP $af,X
  $A5EE: EC AD FF  CPX $ffad
  $A5F1: 18        CLC
  $A5F2: D3 48     DCP ($48),Y
  $A5F4: A8        TAY
  $A5F5: 19 FF 24  ORA $24ff,Y
  $A5F8: 28        PLP
  $A5F9: 0A        ASL A
  $A5FA: 14 01     NOP $01,X
  $A5FC: 36 FD     ROL $fd,X
  $A5FE: 3D FF 2B  AND $2bff,X
  $A601: 29 26     AND #$26
  $A603: FA        NOP
  $A604: 46 4F     LSR $4f
  $A606: 06 21     ASL $21
  $A608: 28        PLP
  $A609: 2D 59 FD  AND $fd59
  $A60C: 3D FF 3C  AND $3cff,X
  $A60F: FC E8 48  NOP $48e8,X
  $A612: 9B B2 87  TAS $87b2,Y
  $A615: 93 86     ??? ($86),Y
  $A617: 48        PHA
  $A618: E8        INX
  $A619: 48        PHA
  $A61A: 18        CLC
  $A61B: 14 15     NOP $15,X
  $A61D: 05 08     ORA $08
  $A61F: F9 31 09  SBC $0931,Y
  $A622: 29 01     AND #$01
  $A624: 55 31     EOR $31,X
  $A626: 02        ???
  $A627: 18        CLC
  $A628: 13 07     SLO ($07),Y
  $A62A: 12        ???
  $A62B: 2D 19 FF  AND $ff19
  $A62E: 3C FC 5C  NOP $5cfc,X
  $A631: 12        ???
  $A632: 09 01     ORA #$01
  $A634: 3A        NOP
  $A635: FA        NOP
  $A636: 98        TYA
  $A637: F9 38 D1  SBC $d138,Y
  $A63A: A6 82     LDX $82
  $A63C: AD DD 5C  LDA $5cdd
  $A63F: 00        BRK
  $A640: 18        CLC
  $A641: 13 06     SLO ($06),Y
  $A643: 18        CLC
  $A644: FF 3C FC  ISB $fc3c,X
  $A647: 4F 2E 0B  SRE $0b2e
  $A64A: 30 07     BMI $a653
  $A64C: 15 0A     ORA $0a,X
  $A64E: 2D 05 5C  AND $5c05
  $A651: 06 14     ASL $14
  $A653: 01 FF     ORA ($ff,X)
  $A655: 08        PHP
  $A656: 2E 10 2F  ROL $2f10
  $A659: 07 2C     SLO $2c
  $A65B: 11 08     ORA ($08),Y
  $A65D: 12        ???
  $A65E: 23 28     RLA ($28,X)
  $A660: FD 3D FF  SBC $ff3d,X
  $A663: 3C FC 2B  NOP $2bfc,X
  $A666: 29 26     AND #$26
  $A668: FA        NOP
  $A669: 4E 4F F9  LSR $f94f
  $A66C: 38        SEC
  $A66D: 00        BRK
  $A66E: 18        CLC
  $A66F: 24 02     BIT $02
  $A671: 0B 31     ANC #$31
  $A673: 02        ???
  $A674: 85 AE     STA $ae
  $A676: EA        NOP
  $A677: 2C F9 35  BIT $35f9
  $A67A: 12        ???
  $A67B: 15 0C     ORA $0c,X
  $A67D: 28        PLP
  $A67E: 2D 59 FD  AND $fd59
  $A681: 3D FF 3C  AND $3cff,X
  $A684: FC 23 28  NOP $2823,X
  $A687: 14 34     NOP $34,X
  $A689: FF 08 2E  ISB $2e08,X
  $A68C: 0B 31     ANC #$31
  $A68E: 02        ???
  $A68F: FF 05 13  ISB $1305,X
  $A692: 02        ???
  $A693: 34 05     NOP $05,X
  $A695: 13 02     SLO ($02),Y
  $A697: 57 34     SRE $34,X
  $A699: FF 3C FC  ISB $fc3c,X
  $A69C: 0D 05 01  ORA $0105
  $A69F: 94 AD     STY $ad,X
  $A6A1: E3 48     ISB ($48,X)
  $A6A3: 3F 18 54  RLA $5418,X
  $A6A6: 19 F9 34  ORA $34f9,Y
  $A6A9: FA        NOP
  $A6AA: 4F 18 3A  SRE $3a18
  $A6AD: 0E 0B 12  ASL $120b
  $A6B0: 09 18     ORA #$18
  $A6B2: F9 34 84  SBC $8434,Y
  $A6B5: A9 18     LDA #$18
  $A6B7: 22        ???
  $A6B8: 18        CLC
  $A6B9: 59 36 FD  EOR $fd36,Y
  $A6BC: 3D FF 3C  AND $3cff,X
  $A6BF: FC 14 2D  NOP $2d14,X
  $A6C2: 12        ???
  $A6C3: 3A        NOP
  $A6C4: 17 63     SLO $63,X
  $A6C6: 27 59     RLA $59
  $A6C8: F9 38 09  SBC $0938,Y
  $A6CB: 29 4F     AND #$4f
  $A6CD: A3 9E     LAX ($9e,X)
  $A6CF: 93 D9     ??? ($d9),Y
  $A6D1: 9E 8B 81  SHX $818b,Y
  $A6D4: 13 F9     SLO ($f9),Y
  $A6D6: 35 01     AND $01,X
  $A6D8: 02        ???
  $A6D9: 23 11     RLA ($11,X)
  $A6DB: 14 18     NOP $18,X
  $A6DD: 05 39     ORA $39
  $A6DF: FD 3D FF  SBC $ff3d,X
  $A6E2: 3C FC FA  NOP $fafc,X
  $A6E5: 4F 19 FA  SRE $fa19
  $A6E8: BB 14 5D  LAS $5d14,Y
  $A6EB: 15 FF     ORA $ff,X
  $A6ED: 1E 08 28  ASL $2808,X
  $A6F0: 2B 08     ANC #$08
  $A6F2: 15 01     ORA $01,X
  $A6F4: 05 14     ORA $14
  $A6F6: 01 39     ORA ($39,X)
  $A6F8: FF 05 14  ISB $1405,X
  $A6FB: 26 56     ROL $56
  $A6FD: 24 02     BIT $02
  $A6FF: 0B 31     ANC #$31
  $A701: 02        ???
  $A702: 0C 28 2D  NOP $2d28
  $A705: 59 36 FD  EOR $fd36,Y
  $A708: 3D FF 3C  AND $3cff,X
  $A70B: FC FA 98  NOP $98fa,X
  $A70E: 13 01     SLO ($01),Y
  $A710: 02        ???
  $A711: 23 11     RLA ($11,X)
  $A713: 22        ???
  $A714: F9 38 0F  SBC $0f38,Y
  $A717: 01 0B     ORA ($0b,X)
  $A719: 0F 23 11  SLO $1123
  $A71C: 5C 19 14  NOP $1419,X
  $A71F: 01 14     ORA ($14,X)
  $A721: F9 35 9B  SBC $9b35,Y
  $A724: AE 39 FD  LDX $fd39
  $A727: 3D FF 4F  AND $4fff,X
  $A72A: 2D 63 2E  AND $2e63
  $A72D: 12        ???
  $A72E: 17 FD     SLO $fd,X
  $A730: 3D FF 00  AND $00ff,X
  $A733: 2A        ROL A
  $A734: 02        ???
  $A735: 22        ???
  $A736: 18        CLC
  $A737: 4F 34 00  SRE $0034
  $A73A: 18        CLC
  $A73B: 3F 3E 63  RLA $633e,X
  $A73E: 2D 15 F9  AND $f915
  $A741: 32        ???
  $A742: 05 12     ORA $12
  $A744: 14 01     NOP $01,X
  $A746: 18        CLC
  $A747: 05 39     ORA $39
  $A749: FD 3D FF  SBC $ff3d,X
  $A74C: 3C FC 9A  NOP $9afc,X
  $A74F: AF AE 9D  LAX $9dae
  $A752: 48        PHA
  $A753: 36 F9     ROL $f9,X
  $A755: 3A        NOP
  $A756: 23 2E     RLA ($2e,X)
  $A758: 0F 57 36  SLO $3657
  $A75B: E6 81     INC $81
  $A75D: E4 48     CPX $48
  $A75F: 36 36     ROL $36,X
  $A761: FD 3D FF  SBC $ff3d,X
  $A764: 3C FC FA  NOP $fafc,X
  $A767: 01 07     ORA ($07,X)
  $A769: 2D 3A FF  AND $ff3a
  $A76C: 06 31     ASL $31
  $A76E: 02        ???
  $A76F: 18        CLC
  $A770: 3A        NOP
  $A771: 8C 89 80  STY $8089
  $A774: A1 A2     LDA ($a2,X)
  $A776: 25 FD     AND $fd
  $A778: 3D FF 3C  AND $3cff,X
  $A77B: FC 0A 0C  NOP $0c0a,X
  $A77E: 4F 59 14  SRE $1459
  $A781: 34 FA     NOP $fa,X
  $A783: 98        TYA
  $A784: FF FB 19  ISB $19fb,X
  $A787: 3A        NOP
  $A788: 13 07     SLO ($07),Y
  $A78A: 15 F9     ORA $f9,X
  $A78C: 35 21     AND $21,X
  $A78E: 59 2E 0F  EOR $0f2e,Y
  $A791: 0D 2D 0B  ORA $0b2d
  $A794: 30 18     BMI $a7ae
  $A796: F9 37 01  SBC $0137,Y
  $A799: 14 01     NOP $01,X
  $A79B: 90 48     BCC $a7e5
  $A79D: A0 59     LDY #$59
  $A79F: 4F F9 38  SRE $38f9
  $A7A2: 24 59     BIT $59
  $A7A4: 2D 19 06  AND $0619
  $A7A7: 2D 22 11  AND $1122
  $A7AA: 59 FD 58  EOR $58fd,Y
  $A7AD: FF 9F 48  ISB $489f,X
  $A7B0: 92        ???
  $A7B1: B3 AD     LAX ($ad),Y
  $A7B3: D1 2C     CMP ($2c),Y
  $A7B5: F9 39 19  SBC $1939,Y
  $A7B8: 55 21     EOR $21,X
  $A7BA: 28        PLP
  $A7BB: 1E 03 FD  ASL $fd03,X
  $A7BE: 15 FF     ORA $ff,X
  $A7C0: 25 07     AND $07
  $A7C2: 23 2E     RLA ($2e,X)
  $A7C4: 0F 58 F9  SLO $f958
  $A7C7: 3A        NOP
  $A7C8: 0A        ASL A
  $A7C9: 26 15     ROL $15
  $A7CB: A9 E6     LDA #$e6
  $A7CD: A8        TAY
  $A7CE: 4F F9 39  SRE $39f9
  $A7D1: 0F 05 1E  SLO $1e05
  $A7D4: 2E 0F 25  ROL $250f
  $A7D7: 02        ???
  $A7D8: 59 FD 14  EOR $14fd,Y
  $A7DB: FF FC 72  ISB $72fc,X
  $A7DE: 75 15     ADC $15,X
  $A7E0: 3A        NOP
  $A7E1: FA        NOP
  $A7E2: 1A        NOP
  $A7E3: 2C 07 2B  BIT $2b07
  $A7E6: 03 28     SLO ($28,X)
  $A7E8: F9 32 0B  SBC $0b32,Y
  $A7EB: 00        BRK
  $A7EC: 01 15     ORA ($15,X)
  $A7EE: 22        ???
  $A7EF: 5C 56 34  NOP $3456,X
  $A7F2: 15 07     ORA $07,X
  $A7F4: 1E 29 51  ASL $5129,X
  $A7F7: 10 F9     BPL $a7f2
  $A7F9: 32        ???
  $A7FA: 2C 01 2E  BIT $2e01
  $A7FD: 0F 18 22  SLO $2218
  $A800: 34 90     NOP $90,X
  $A802: 48        PHA
  $A803: A0 15     LDY #$15
  $A805: 06 00     ASL $00
  $A807: 01 F9     ORA ($f9,X)
  $A809: 32        ???
  $A80A: 2C 01 29  BIT $2901
  $A80D: 28        PLP
  $A80E: 0F 21 59  SLO $5921
  $A811: 2E 0F 2D  ROL $2d0f
  $A814: FD 59 FF  SBC $ff59,X
  $A817: 3C FC 04  NOP $04fc,X
  $A81A: 1E 03 26  ASL $2603,X
  $A81D: 36 0E     ROL $0e,X
  $A81F: 2D 14 09  AND $0914
  $A822: 13 55     SLO ($55),Y
  $A824: 2F F9 34  RLA $34f9
  $A827: 24 02     BIT $02
  $A829: 0B 31     ANC #$31
  $A82B: 02        ???
  $A82C: 14 5D     NOP $5d,X
  $A82E: 5C 06 14  NOP $1406,X
  $A831: 01 58     ORA ($58,X)
  $A833: FD 3D FF  SBC $ff3d,X
  $A836: 86 AF     STX $af
  $A838: EA        NOP
  $A839: 92        ???
  $A83A: AD 18 3A  LDA $3a18
  $A83D: 01 0B     ORA ($0b,X)
  $A83F: 59 19 F9  EOR $f919,Y
  $A842: 35 14     AND $14,X
  $A844: 05 14     ORA $14
  $A846: 05 18     ORA $18
  $A848: 92        ???
  $A849: 87 95     SAX $95
  $A84B: 8B AF     XAA #$af
  $A84D: AD 59 F9  LDA $f959
  $A850: 34 0E     NOP $0e,X
  $A852: 29 13     AND #$13
  $A854: 71 7B     ADC ($7b),Y
  $A856: 18        CLC
  $A857: 0F 08 01  SLO $0108
  $A85A: 18        CLC
  $A85B: F9 36 D9  SBC $d936,Y
  $A85E: 81 E4     STA ($e4,X)
  $A860: AD D1 9C  LDA $9cd1
  $A863: AE DD 15  LDX $15dd
  $A866: 06 2C     ASL $2c
  $A868: 11 08     ORA ($08),Y
  $A86A: FD 2A FF  SBC $ff2a,X
  $A86D: FB 19 F9  ISB $f919,Y
  $A870: 37 1E     RLA $1e,X
  $A872: 22        ???
  $A873: 27 18     RLA $18
  $A875: 90 48     BCC $a8bf
  $A877: A0 5C     LDY #$5c
  $A879: F9 38 6F  SBC $6f38,Y
  $A87C: 71 18     ADC ($18),Y
  $A87E: FA        NOP
  $A87F: 0E 19 83  ASL $8319
  $A882: 48        PHA
  $A883: 8C 53 2A  STY $2a53
  $A886: 0B 18     ANC #$18
  $A888: F9 32 01  SBC $0132,Y
  $A88B: 1F 31 02  SLO $0231,X
  $A88E: 4F 00 28  SRE $2800
  $A891: FD 58 FF  SBC $ff58,X
  $A894: 0F 10 63  SLO $6310
  $A897: 14 06     NOP $06,X
  $A899: 31 02     AND ($02),Y
  $A89B: 59 01 18  EOR $1801,Y
  $A89E: F9 36 07  SBC $0736,Y
  $A8A1: 02        ???
  $A8A2: 10 30     BPL $a8d4
  $A8A4: 02        ???
  $A8A5: 8A        TXA
  $A8A6: AE 85 48  LDX $4885
  $A8A9: 19 F9 36  ORA $36f9,Y
  $A8AC: 25 02     AND $02
  $A8AE: 10 30     BPL $a8e0
  $A8B0: 02        ???
  $A8B1: 01 FD     ORA ($fd,X)
  $A8B3: 59 FF FB  EOR $fbff,Y
  $A8B6: 19 F9 39  ORA $39f9,Y
  $A8B9: FA        NOP
  $A8BA: 14 18     NOP $18,X
  $A8BC: 01 0F     ORA ($0f,X)
  $A8BE: 21 01     AND ($01,X)
  $A8C0: 2B 71     ANC #$71
  $A8C2: 6E 18 F9  ROR $f918
  $A8C5: 33 0D     RLA ($0d),Y
  $A8C7: 2D 0B 30  AND $300b
  $A8CA: 4F 3A 46  SRE $463a
  $A8CD: 15 2D     ORA $2d,X
  $A8CF: 22        ???
  $A8D0: F9 36 01  SBC $0136,Y
  $A8D3: 28        PLP
  $A8D4: 90 48     BCC $a91e
  $A8D6: A0 FD     LDY #$fd
  $A8D8: 59 FF FB  EOR $fbff,Y
  $A8DB: 19 3A 09  ORA $093a,Y
  $A8DE: 2D 0F 01  AND $010f
  $A8E1: 05 01     ORA $01
  $A8E3: F9 35 19  SBC $1935,Y
  $A8E6: 11 0B     ORA ($0b),Y
  $A8E8: 30 11     BMI $a8fb
  $A8EA: 55 31     EOR $31,X
  $A8EC: 02        ???
  $A8ED: 18        CLC
  $A8EE: F9 37 90  SBC $9037,Y
  $A8F1: 48        PHA
  $A8F2: A0 59     LDY #$59
  $A8F4: 4F 3A 0B  SRE $0b3a
  $A8F7: 2E 12 2D  ROL $2d12
  $A8FA: 3E 13 F9  ROL $f913,X
  $A8FD: 34 1E     NOP $1e,X
  $A8FF: 22        ???
  $A900: 27 18     RLA $18
  $A902: 00        BRK
  $A903: 11 01     ORA ($01),Y
  $A905: 90 48     BCC $a94f
  $A907: A0 FD     LDY #$fd
  $A909: 59 FF FB  EOR $fbff,Y
  $A90C: 19 F9 3C  ORA $3cf9,Y
  $A90F: 90 48     BCC $a959
  $A911: A0 EA     LDY #$ea
  $A913: A9 81     LDA #$81
  $A915: 4F 63 11  SRE $1163
  $A918: 51 2D     EOR ($2d),Y
  $A91A: 59 F9 34  EOR $34f9,Y
  $A91D: 0E 29 15  ASL $1529
  $A920: 86 AF     STX $af
  $A922: EA        NOP
  $A923: 92        ???
  $A924: AD 18 FA  LDA $fa18
  $A927: 13 19     SLO ($19),Y
  $A929: F9 32 86  SBC $8632,Y
  $A92C: 48        PHA
  $A92D: EA        NOP
  $A92E: 27 31     RLA $31
  $A930: 07 94     SLO $94
  $A932: AD E3 48  LDA $48e3
  $A935: 3F FD 59  RLA $59fd,X
  $A938: FF 09 09  ISB $0909,X
  $A93B: 1E 5C 06  ASL $065c,X
  $A93E: 0F 26 F9  SLO $f926
  $A941: 39 09 1E  AND $1e09,Y
  $A944: 05 01     ORA $01
  $A946: 09 13     ORA #$13
  $A948: 19 01 2B  ORA $2b01,Y
  $A94B: 2D F9 36  AND $36f9
  $A94E: 22        ???
  $A94F: 12        ???
  $A950: 28        PLP
  $A951: 10 05     BPL $a958
  $A953: 26 2C     ROL $2c
  $A955: 0C 66 12  NOP $1266
  $A958: 59 0B 12  EOR $120b,Y
  $A95B: F9 33 57  SBC $5733,Y
  $A95E: 2D 27 31  AND $3127
  $A961: 07 5C     SLO $5c
  $A963: 0F 0F 05  SLO $050f
  $A966: 02        ???
  $A967: 2D 59 FD  AND $fd59
  $A96A: 36 FF     ROL $ff,X
  $A96C: 2B 29     ANC #$29
  $A96E: 2B 29     ANC #$29
  $A970: 18        CLC
  $A971: 4F 2E 0B  SRE $0b2e
  $A974: 30 07     BMI $a97d
  $A976: 22        ???
  $A977: F9 35 FA  SBC $fa35,Y
  $A97A: 43 3A     SRE ($3a,X)
  $A97C: 09 02     ORA #$02
  $A97E: 13 02     SLO ($02),Y
  $A980: 65 13     ADC $13
  $A982: 18        CLC
  $A983: F9 34 0B  SBC $0b34,Y
  $A986: 00        BRK
  $A987: 01 2C     ORA ($2c,X)
  $A989: 18        CLC
  $A98A: 09 0C     ORA #$0c
  $A98C: 18        CLC
  $A98D: 1F 13 14  SLO $1413,X
  $A990: 2E 0F FD  ROL $fd0f
  $A993: 35 FF     AND $ff,X
  $A995: FC 09 29  NOP $2909,X
  $A998: 07 26     SLO $26
  $A99A: 01 18     ORA ($18,X)
  $A99C: 90 48     BCC $a9e6
  $A99E: A0 13     LDY #$13
  $A9A0: F9 36 01  SBC $0136,Y
  $A9A3: 01 0B     ORA ($0b,X)
  $A9A5: 31 02     AND ($02),Y
  $A9A7: 65 4F     ADC $4f
  $A9A9: 5C 06 14  NOP $1406,X
  $A9AC: 07 12     SLO $12
  $A9AE: 19 F9 33  ORA $33f9,Y
  $A9B1: A5 48     LDA $48
  $A9B3: AA        TAX
  $A9B4: AE E8 03  LDX $03e8
  $A9B7: 2D 0D 01  AND $010d
  $A9BA: 3A        NOP
  $A9BB: 1A        NOP
  $A9BC: 13 11     SLO ($11),Y
  $A9BE: 22        ???
  $A9BF: F9 32 05  SBC $0532,Y
  $A9C2: 12        ???
  $A9C3: 14 01     NOP $01,X
  $A9C5: FD 58 FF  SBC $ff58,X
  $A9C8: FC 0E 29  NOP $290e,X
  $A9CB: 05 26     ORA $26
  $A9CD: 01 1E     ORA ($1e,X)
  $A9CF: 1E 5C 89  ASL $895c,X
  $A9D2: 48        PHA
  $A9D3: 90 13     BCC $a9e8
  $A9D5: 0B 12     ANC #$12
  $A9D7: F9 32 09  SBC $0932,Y
  $A9DA: 18        CLC
  $A9DB: 90 48     BCC $aa25
  $A9DD: A0 2C     LDY #$2c
  $A9DF: 1F 12 06  SLO $0612,X
  $A9E2: 0F F9 36  SLO $36f9
  $A9E5: FA        NOP
  $A9E6: 19 22 34  ORA $3422,Y
  $A9E9: 0D 2D 0B  ORA $0b2d
  $A9EC: 30 13     BMI $aa01
  $A9EE: 0B 12     ANC #$12
  $A9F0: F9 34 13  SBC $1334,Y
  $A9F3: 02        ???
  $A9F4: 2A        ROL A
  $A9F5: 07 0C     SLO $0c
  $A9F7: 28        PLP
  $A9F8: 09 13     ORA #$13
  $A9FA: 15 0B     ORA $0b,X
  $A9FC: FD 0F FF  SBC $ff0f,X
  $A9FF: FC 01 55  NOP $5501,X
  $AA02: 31 02     AND ($02),Y
  $AA04: FD 59 FF  SBC $ff59,X
  $AA07: 20 09 02  JSR $0209
  $AA0A: 15 19     ORA $19,X
  $AA0C: 8A        TXA
  $AA0D: AE 85 48  LDX $4885
  $AA10: 18        CLC
  $AA11: 12        ???
  $AA12: 2D 0A 01  AND $010a
  $AA15: F9 32 9B  SBC $9b32,Y
  $AA18: B4 AD     LDY $ad,X
  $AA1A: 48        PHA
  $AA1B: FA        NOP
  $AA1C: 1C 4F 01  NOP $014f,X
  $AA1F: 28        PLP
  $AA20: 09 13     ORA #$13
  $AA22: 5C F9 32  NOP $32f9,X
  $AA25: 88        DEY
  $AA26: 8F 19 56  SAX $5619
  $AA29: 29 18     AND #$18
  $AA2B: 09 02     ORA #$02
  $AA2D: 52        ???
  $AA2E: 06 27     ASL $27
  $AA30: 31 07     AND ($07),Y
  $AA32: 4F F9 32  SRE $32f9
  $AA35: 00        BRK
  $AA36: 28        PLP
  $AA37: 59 2A 02  EOR $022a,Y
  $AA3A: 35 59     AND $59,X
  $AA3C: FD 4F FF  SBC $ff4f,X
  $AA3F: FC FA 1C  NOP $1cfa,X
  $AA42: 2C 04 0A  BIT $0a04
  $AA45: 03 28     SLO ($28,X)
  $AA47: 09 13     ORA #$13
  $AA49: 4F F9 34  SRE $34f9
  $AA4C: 5C 06 29  NOP $2906,X
  $AA4F: 63 34     RRA ($34,X)
  $AA51: 0B 31     ANC #$31
  $AA53: 02        ???
  $AA54: 06 19     ASL $19
  $AA56: 00        BRK
  $AA57: 28        PLP
  $AA58: FD 58 FF  SBC $ff58,X
  $AA5B: 14 2D     NOP $2d,X
  $AA5D: 66 01     ROR $01
  $AA5F: 90 48     BCC $aaa9
  $AA61: A0 19     LDY #$19
  $AA63: F9 38 09  SBC $0938,Y
  $AA66: 55 2D     EOR $2d,X
  $AA68: 50 15     BVC $aa7f
  $AA6A: 04 01     NOP $01
  $AA6C: 12        ???
  $AA6D: 19 F9 37  ORA $37f9,Y
  $AA70: 0C 51 29  NOP $2951
  $AA73: 0F 10 05  SLO $0510
  $AA76: 26 2C     ROL $2c
  $AA78: 22        ???
  $AA79: 2E 12 01  ROL $0112
  $AA7C: 28        PLP
  $AA7D: F9 33 05  SBC $0533,Y
  $AA80: 07 55     SLO $55
  $AA82: 00        BRK
  $AA83: 01 12     ORA ($12,X)
  $AA85: FD 2C FF  SBC $ff2c,X
  $AA88: FC 9B 27  NOP $279b,X
  $AA8B: 48        PHA
  $AA8C: 15 0B     ORA $0b,X
  $AA8E: 14 01     NOP $01,X
  $AA90: 25 02     AND $02
  $AA92: 15 0C     ORA $0c,X
  $AA94: 28        PLP
  $AA95: 2D FD 59  AND $59fd
  $AA98: FD FF 00  SBC $00ff,X
  $AA9B: 01 12     ORA ($12,X)
  $AA9D: 19 F9 3C  ORA $3cf9,Y
  $AAA0: 1E 22 27  ASL $2722,X
  $AAA3: 15 19     ORA $19,X
  $AAA5: 3A        NOP
  $AAA6: 57 2E     SRE $2e,X
  $AAA8: 0F 01 18  SLO $1801
  $AAAB: F9 35 55  SBC $5535,Y
  $AAAE: 0B 2D     ANC #$2d
  $AAB0: 2C 22 2E  BIT $2e22
  $AAB3: 12        ???
  $AAB4: 01 28     ORA ($28,X)
  $AAB6: F9 37 0E  SBC $0e37,Y
  $AAB9: 09 2C     ORA #$2c
  $AABB: 5D 02 0D  EOR $0d02,X
  $AABE: 21 28     AND ($28,X)
  $AAC0: 05 FD     ORA $fd
  $AAC2: 4F FF FC  SRE $fcff
  $AAC5: 09 18     ORA #$18
  $AAC7: 0B 00     ANC #$00
  $AAC9: 01 18     ORA ($18,X)
  $AACB: EC 81 AD  CPX $ad81
  $AACE: 93 FD     ??? ($fd),Y
  $AAD0: 59 FF FA  EOR $faff,Y
  $AAD3: 20 34 FA  JSR $fa34
  $AAD6: 21 F9     AND ($f9,X)
  $AAD8: 36 09     ROL $09,X
  $AADA: 18        CLC
  $AADB: 1B 0F 27  SLO $270f,Y
  $AADE: 18        CLC
  $AADF: EA        NOP
  $AAE0: A9 81     LDA #$81
  $AAE2: 2C 0E 0B  BIT $0b0e
  $AAE5: 0B F9     ANC #$f9
  $AAE7: 33 10     RLA ($10),Y
  $AAE9: 30 02     BMI $aaed
  $AAEB: 63 2D     RRA ($2d,X)
  $AAED: 34 09     NOP $09,X
  $AAEF: 10 26     BPL $ab17
  $AAF1: 18        CLC
  $AAF2: EB 48     SBC #$48
  $AAF4: 8C 5C F9  STY $f95c
  $AAF7: 32        ???
  $AAF8: 0B 00     ANC #$00
  $AAFA: 01 2C     ORA ($2c,X)
  $AAFC: 19 09 65  ORA $6509,Y
  $AAFF: 2D FD 59  AND $59fd
  $AB02: FF 1F 2D  ISB $2d1f,X
  $AB05: 14 F9     NOP $f9,X
  $AB07: 3D 1E 56  AND $561e,X
  $AB0A: 0B 31     ANC #$31
  $AB0C: 0D 2D 2C  ORA $2c2d
  $AB0F: 05 13     ORA $13
  $AB11: 02        ???
  $AB12: FD 36 FF  SBC $ff36,X
  $AB15: 25 0B     AND $0b
  $AB17: 3A        NOP
  $AB18: 0E 2A 0E  ASL $0e2a
  $AB1B: 2A        ROL A
  $AB1C: F9 39 01  SBC $0139,Y
  $AB1F: 09 02     ORA #$02
  $AB21: 57 34     SRE $34,X
  $AB23: 1F 2D 14  SLO $142d,X
  $AB26: FD 36 FF  SBC $ff36,X
  $AB29: 13 02     SLO ($02),Y
  $AB2B: 0B 13     ANC #$13
  $AB2D: 3A        NOP
  $AB2E: 06 19     ASL $19
  $AB30: 07 59     SLO $59
  $AB32: 08        PHP
  $AB33: 19 F9 35  ORA $35f9,Y
  $AB36: 04 29     NOP $29
  $AB38: 0F 10 22  SLO $2210
  $AB3B: 1E 08 14  ASL $1408,X
  $AB3E: 01 57     ORA ($57,X)
  $AB40: FD 36 FF  SBC $ff36,X
  $AB43: 00        BRK
  $AB44: 18        CLC
  $AB45: 3A        NOP
  $AB46: 8A        TXA
  $AB47: A8        TAY
  $AB48: 89 AD     NOP #$ad
  $AB4A: E4 19     CPX $19
  $AB4C: F9 37 04  SBC $0437,Y
  $AB4F: 29 4F     AND #$4f
  $AB51: 18        CLC
  $AB52: 0B 12     ANC #$12
  $AB54: 23 28     RLA ($28,X)
  $AB56: 57 FD     SRE $fd,X
  $AB58: 36 FF     ROL $ff,X
  $AB5A: 0F 01 05  SLO $0501
  $AB5D: 01 22     ORA ($22,X)
  $AB5F: 3A        NOP
  $AB60: 10 30     BPL $ab92
  $AB62: 02        ???
  $AB63: 63 2D     RRA ($2d,X)
  $AB65: 59 F9 34  EOR $34f9,Y
  $AB68: 06 2C     ASL $2c
  $AB6A: 1A        NOP
  $AB6B: 06 0B     ASL $0b
  $AB6D: 21 12     AND ($12,X)
  $AB6F: 01 09     ORA ($09,X)
  $AB71: 02        ???
  $AB72: 57 FD     SRE $fd,X
  $AB74: 36 FF     ROL $ff,X
  $AB76: 09 29     ORA #$29
  $AB78: 05 26     ORA $26
  $AB7A: 4F 3A 1D  SRE $1d3a
  $AB7D: 2D 13 02  AND $0213
  $AB80: 18        CLC
  $AB81: F9 35 0F  SBC $0f35,Y
  $AB84: 0F 05 01  SLO $0105
  $AB87: 59 F9 3B  EOR $3bf9,Y
  $AB8A: 01 07     ORA ($07,X)
  $AB8C: 57 1F     SRE $1f,X
  $AB8E: 2D 14 FD  AND $fd14
  $AB91: 36 FF     ROL $ff,X
  $AB93: 09 29     ORA #$29
  $AB95: 15 05     ORA $05,X
  $AB97: 12        ???
  $AB98: 63 3A     RRA ($3a,X)
  $AB9A: 08        PHP
  $AB9B: 2E 0B 31  ROL $310b
  $AB9E: 02        ???
  $AB9F: 59 F9 33  EOR $33f9,Y
  $ABA2: CF AD E3  DCP $e3ad
  $ABA5: AA        TAX
  $ABA6: 82 57     NOP #$57
  $ABA8: FD 36 FF  SBC $ff36,X
  $ABAB: 1F 2D 14  SLO $142d,X
  $ABAE: 34 09     NOP $09,X
  $ABB0: 18        CLC
  $ABB1: 0B 00     ANC #$00
  $ABB3: 01 F9     ORA ($f9,X)
  $ABB5: 37 05     RLA $05,X
  $ABB7: 2E 12 7A  ROL $7a12
  $ABBA: 41 2C     EOR ($2c,X)
  $ABBC: 3A        NOP
  $ABBD: 05 10     ORA $10
  $ABBF: 13 2A     SLO ($2a),Y
  $ABC1: 02        ???
  $ABC2: 36 FD     ROL $fd,X
  $ABC4: 36 FF     ROL $ff,X
  $ABC6: 25 0B     AND $0b
  $ABC8: 1F 2D 14  SLO $142d,X
  $ABCB: F9 3B 25  SBC $253b,Y
  $ABCE: 0D 2D D1  ORA $d12d
  $ABD1: A8        TAY
  $ABD2: 48        PHA
  $ABD3: EA        NOP
  $ABD4: 2C 05 10  BIT $1005
  $ABD7: 16 07     ASL $07,X
  $ABD9: 58        CLI
  $ABDA: FD 36 FF  SBC $ff36,X
  $ABDD: 15 1D     ORA $1d,X
  $ABDF: 2D 18 59  AND $5918
  $ABE2: 01 1A     ORA ($1a,X)
  $ABE4: 31 02     AND ($02),Y
  $ABE6: 13 0B     SLO ($0b),Y
  $ABE8: 12        ???
  $ABE9: F9 34 0F  SBC $0f34,Y
  $ABEC: 18        CLC
  $ABED: 20 58 3A  JSR $3a58
  $ABF0: 1F 2D 14  SLO $142d,X
  $ABF3: FD 36 FF  SBC $ff36,X
  $ABF6: 0F 13 03  SLO $0313
  $ABF9: 3F 3E 6A  RLA $6a3e,X
  $ABFC: 2D 0B 05  AND $050b
  $ABFF: F9 37 EA  SBC $ea37,Y
  $AC02: A9 81     LDA #$81
  $AC04: 5C 06 14  NOP $1406,X
  $AC07: 07 12     SLO $12
  $AC09: 22        ???
  $AC0A: F9 37 E7  SBC $e737,Y
  $AC0D: 87 19     SAX $19
  $AC0F: 57 2D     SRE $2d,X
  $AC11: 27 31     RLA $31
  $AC13: 07 2C     SLO $2c
  $AC15: F9 37 11  SBC $1137,Y
  $AC18: 07 0B     SLO $0b
  $AC1A: 12        ???
  $AC1B: 0F 0F 05  SLO $050f
  $AC1E: 02        ???
  $AC1F: 25 FD     AND $fd
  $AC21: 36 FF     ROL $ff,X
  $AC23: 57 2D     SRE $2d,X
  $AC25: 15 1D     ORA $1d,X
  $AC27: 2D D3 48  AND $48d3
  $AC2A: A8        TAY
  $AC2B: 19 F9 37  ORA $37f9,Y
  $AC2E: 04 29     NOP $29
  $AC30: 4F 1E 22  SRE $221e
  $AC33: 28        PLP
  $AC34: FD 36 FF  SBC $ff36,X
  $AC37: 01 07     ORA ($07,X)
  $AC39: 57 1F     SRE $1f,X
  $AC3B: 2D 14 F9  AND $f914
  $AC3E: 3A        NOP
  $AC3F: 06 00     ASL $00
  $AC41: 01 2C     ORA ($2c,X)
  $AC43: 01 29     ORA ($29,X)
  $AC45: 12        ???
  $AC46: 3A        NOP
  $AC47: 0D 21 28  ORA $2821
  $AC4A: 58        CLI
  $AC4B: FD 36 FF  SBC $ff36,X
  $AC4E: 25 B5     AND $b5
  $AC50: 49 49     EOR #$49
  $AC52: 0B 3A     ANC #$3a
  $AC54: 01 09     ORA ($09,X)
  $AC56: 02        ???
  $AC57: FD 36 FF  SBC $ff36,X
  $AC5A: 1F 2D 14  SLO $142d,X
  $AC5D: 3A        NOP
  $AC5E: 09 18     ORA #$18
  $AC60: 0B 00     ANC #$00
  $AC62: 01 F9     ORA ($f9,X)
  $AC64: 37 AB     RLA $ab,X
  $AC66: 48        PHA
  $AC67: A8        TAY
  $AC68: DD 85 AE  CMP $ae85,X
  $AC6B: EA        NOP
  $AC6C: 08        PHP
  $AC6D: 2E 0B 31  ROL $310b
  $AC70: 02        ???
  $AC71: 18        CLC
  $AC72: F9 33 11  SBC $1133,Y
  $AC75: 22        ???
  $AC76: 27 5C     RLA $5c
  $AC78: 3A        NOP
  $AC79: 0F 0F 05  SLO $050f
  $AC7C: 02        ???
  $AC7D: 58        CLI
  $AC7E: FD 36 FF  SBC $ff36,X
  $AC81: 09 18     ORA #$18
  $AC83: 0F 01 05  SLO $0501
  $AC86: 01 4F     ORA ($4f,X)
  $AC88: 04 2B     NOP $2b
  $AC8A: 29 63     AND #$63
  $AC8C: F9 35 1F  SBC $1f35,Y
  $AC8F: 2D 14 13  AND $1314
  $AC92: 1E 0F 04  ASL $040f,X
  $AC95: 2B 05     ANC #$05
  $AC97: 29 59     AND #$59
  $AC99: 08        PHP
  $AC9A: 5D F9 33  EOR $33f9,X
  $AC9D: 09 18     ORA #$18
  $AC9F: 0A        ASL A
  $ACA0: 06 22     ASL $22
  $ACA2: E7 87     ISB $87
  $ACA4: 19 57 2D  ORA $2d57,Y
  $ACA7: 15 1D     ORA $1d,X
  $ACA9: 2D 5C F9  AND $f95c
  $ACAC: 32        ???
  $ACAD: 1A        NOP
  $ACAE: 18        CLC
  $ACAF: 1E 28 2C  ASL $2c28,X
  $ACB2: 11 08     ORA ($08),Y
  $ACB4: 0F 0F 05  SLO $050f
  $ACB7: 02        ???
  $ACB8: 25 FD     AND $fd
  $ACBA: 36 FF     ROL $ff,X
  $ACBC: FB 19 F9  ISB $f919,Y
  $ACBF: 39 8A AE  AND $ae8a,Y
  $ACC2: 85 48     STA $48
  $ACC4: 18        CLC
  $ACC5: 67 09     RRA $09
  $ACC7: 07 59     SLO $59
  $ACC9: 08        PHP
  $ACCA: 15 F9     ORA $f9,X
  $ACCC: 35 06     AND $06,X
  $ACCE: 1D 2D 4F  ORA $4f2d,X
  $ACD1: 0B 2E     ANC #$2e
  $ACD3: 05 27     ORA $27
  $ACD5: 0B 12     ANC #$12
  $ACD7: 01 FD     ORA ($fd,X)
  $ACD9: 28        PLP
  $ACDA: FF FC 05  ISB $05fc,X
  $ACDD: 07 0D     SLO $0d
  $ACDF: 2D 0B 30  AND $300b
  $ACE2: 18        CLC
  $ACE3: F9 39 8B  SBC $8b39,Y
  $ACE6: B0 48     BCS $ad30
  $ACE8: 93 27     ??? ($27),Y
  $ACEA: 31 07     AND ($07),Y
  $ACEC: 22        ???
  $ACED: F9 38 11  SBC $1138,Y
  $ACF0: 25 01     AND $01
  $ACF2: 18        CLC
  $ACF3: 5C D3 48  NOP $48d3,X
  $ACF6: A8        TAY
  $ACF7: 1B 06 2D  SLO $2d06,Y
  $ACFA: 5C F9 34  NOP $34f9,X
  $ACFD: 8B B0     XAA #$b0
  $ACFF: 48        PHA
  $AD00: 93 19     ??? ($19),Y
  $AD02: 02        ???
  $AD03: 0F 0D 28  SLO $280d
  $AD06: FD 14 FF  SBC $ff14,X
  $AD09: 09 18     ORA #$18
  $AD0B: 90 48     BCC $ad55
  $AD0D: A0 19     LDY #$19
  $AD0F: F9 3A 09  SBC $093a,Y
  $AD12: 55 2D     EOR $2d,X
  $AD14: 09 55     ORA #$55
  $AD16: 2D 18 DD  AND $dd18
  $AD19: A7 E5     LAX $e5
  $AD1B: A8        TAY
  $AD1C: 4F F9 34  SRE $34f9
  $AD1F: 02        ???
  $AD20: 1E 01 0F  ASL $0f01,X
  $AD23: 21 3A     AND ($3a,X)
  $AD25: 09 55     ORA #$55
  $AD27: 2D 50 15  AND $1550
  $AD2A: F9 35 0F  SBC $0f35,Y
  $AD2D: 25 28     AND $28
  $AD2F: 21 2D     AND ($2d,X)
  $AD31: 4F 00 FD  SRE $fd00
  $AD34: 28        PLP
  $AD35: FF FC 05  ISB $05fc,X
  $AD38: 07 55     SLO $55
  $AD3A: 9E 48 87  SHX $8748,Y
  $AD3D: 2C 04 09  BIT $0904
  $AD40: 0F 28 FD  SLO $fd28
  $AD43: 14 FF     NOP $ff,X
  $AD45: 09 18     ORA #$18
  $AD47: 90 48     BCC $ad91
  $AD49: A0 19     LDY #$19
  $AD4B: F9 3A 90  SBC $903a,Y
  $AD4E: AF AD 8C  LAX $8cad
  $AD51: 13 1F     SLO ($1f),Y
  $AD53: 28        PLP
  $AD54: 23 3A     RLA ($3a,X)
  $AD56: 22        ???
  $AD57: 02        ???
  $AD58: 29 11     AND #$11
  $AD5A: 15 F9     ORA $f9,X
  $AD5C: 32        ???
  $AD5D: 09 02     ORA #$02
  $AD5F: 52        ???
  $AD60: 06 2C     ASL $2c
  $AD62: 0B 05     ANC #$05
  $AD64: 08        PHP
  $AD65: 12        ???
  $AD66: 07 FD     SLO $fd
  $AD68: 28        PLP
  $AD69: FF FC 00  ISB $00fc,X
  $AD6C: 01 12     ORA ($12,X)
  $AD6E: 18        CLC
  $AD6F: EB 48     SBC #$48
  $AD71: 8C 15 F9  STY $f915
  $AD74: 38        SEC
  $AD75: 18        CLC
  $AD76: 26 0D     ROL $0d
  $AD78: 14 01     NOP $01,X
  $AD7A: 09 13     ORA #$13
  $AD7C: FD 59 FF  SBC $ff59,X
  $AD7F: 09 18     ORA #$18
  $AD81: 90 48     BCC $adcb
  $AD83: A0 19     LDY #$19
  $AD85: F9 3A 80  SBC $803a,Y
  $AD88: 8F A7 22  SAX $22a7
  $AD8B: 0E 09 0E  ASL $0e09
  $AD8E: 09 5C     ORA #$5c
  $AD90: F9 37 8B  SBC $8b37,Y
  $AD93: B0 48     BCS $addd
  $AD95: 93 27     ??? ($27),Y
  $AD97: 31 07     AND ($07),Y
  $AD99: 22        ???
  $AD9A: 01 1E     ORA ($1e,X)
  $AD9C: 1A        NOP
  $AD9D: 13 11     SLO ($11),Y
  $AD9F: 59 F9 32  EOR $32f9,Y
  $ADA2: 4F 34 24  SRE $2434
  $ADA5: 59 2D 0B  EOR $0b2d,Y
  $ADA8: 12        ???
  $ADA9: 19 59 21  ORA $2159,Y
  $ADAC: 59 FD 58  EOR $58fd,Y
  $ADAF: FF E8 8C  ISB $8ce8,X
  $ADB2: EA        NOP
  $ADB3: A9 81     LDA #$81
  $ADB5: 4F 13 07  SRE $0713
  $ADB8: 01 14     ORA ($14,X)
  $ADBA: 90 48     BCC $ae04
  $ADBC: A0 59     LDY #$59
  $ADBE: F9 32 0E  SBC $0e32,Y
  $ADC1: 29 59     AND #$59
  $ADC3: 08        PHP
  $ADC4: 90 48     BCC $ae0e
  $ADC6: A0 18     LDY #$18
  $ADC8: E3 A6     ISB ($a6,X)
  $ADCA: AD 8C 22  LDA $228c
  $ADCD: F9 33 25  SBC $2533,Y
  $ADD0: 07 13     SLO $13
  $ADD2: 29 12     AND #$12
  $ADD4: 01 28     ORA ($28,X)
  $ADD6: 13 01     SLO ($01),Y
  $ADD8: 02        ???
  $ADD9: 09 13     ORA #$13
  $ADDB: FD 59 FF  SBC $ff59,X
  $ADDE: 09 18     ORA #$18
  $ADE0: 90 48     BCC $ae2a
  $ADE2: A0 19     LDY #$19
  $ADE4: F9 3A 09  SBC $093a,Y
  $ADE7: 55 2D     EOR $2d,X
  $ADE9: 50 3A     BVC $ae25
  $ADEB: 0B 30     ANC #$30
  $ADED: 0F 01 18  SLO $1801
  $ADF0: F9 36 AB  SBC $ab36,Y
  $ADF3: AD 9E AD  LDA $ad9e
  $ADF6: EA        NOP
  $ADF7: A9 81     LDA #$81
  $ADF9: 90 48     BCC $ae43
  $ADFB: A0 59     LDY #$59
  $ADFD: FF 09 18  ISB $1809,X
  $AE00: 90 48     BCC $ae4a
  $AE02: A0 19     LDY #$19
  $AE04: F9 3A D3  SBC $d33a,Y
  $AE07: 48        PHA
  $AE08: A8        TAY
  $AE09: 1E 03 05  ASL $0503,X
  $AE0C: 26 18     ROL $18
  $AE0E: F9 38 85  SBC $8538,Y
  $AE11: 82 AD     NOP #$ad
  $AE13: 8F 48 80  SAX $8048
  $AE16: 8F AE 87  SAX $87ae
  $AE19: 2C F9 36  BIT $36f9
  $AE1C: 13 07     SLO ($07),Y
  $AE1E: 01 13     ORA ($13,X)
  $AE20: 0B 12     ANC #$12
  $AE22: 01 FD     ORA ($fd,X)
  $AE24: 28        PLP
  $AE25: FF FC AA  ISB $aafc,X
  $AE28: AD D1 E8  LDA $e8d1
  $AE2B: 8C 2C F9  STY $f92c
  $AE2E: 3A        NOP
  $AE2F: 13 04     SLO ($04),Y
  $AE31: 0B 12     ANC #$12
  $AE33: 19 01 05  ORA $0501,Y
  $AE36: 2D FD 58  AND $58fd
  $AE39: FF 59 29  ISB $2959,X
  $AE3C: 13 19     SLO ($19),Y
  $AE3E: 14 0B     NOP $0b,X
  $AE40: 1E 0C 05  ASL $050c,X
  $AE43: 37 FF     RLA $ff,X
  $AE45: 48        PHA
  $AE46: 3A        NOP
  $AE47: 3A        NOP
  $AE48: 3A        NOP
  $AE49: 3A        NOP
  $AE4A: 3A        NOP
  $AE4B: 48        PHA
  $AE4C: FF A9 E3  ISB $e3a9,X
  $AE4F: 48        PHA
  $AE50: 5C 3A 03  NOP $033a,X
  $AE53: 26 2D     ROL $2d
  $AE55: 5C FF 6D  NOP $6dff,X
  $AE58: E7 8F     ISB $8f
  $AE5A: AD 5C 3A  LDA $3a5c
  $AE5D: 19 14 0C  ORA $0c14,Y
  $AE60: FF 59 01  ISB $0159,X
  $AE63: 3F 44 05  RLA $0544,X
  $AE66: 01 3A     ORA ($3a,X)
  $AE68: 57 2D     SRE $2d,X
  $AE6A: 09 07     ORA #$07
  $AE6C: 10 30     BPL $ae9e
  $AE6E: 02        ???
  $AE6F: 4F 07 0D  SRE $0d07
  $AE72: 01 8A     ORA ($8a,X)
  $AE74: AE 85 48  LDX $4885
  $AE77: 0F 01 05  SLO $0501
  $AE7A: 01 FF     ORA ($ff,X)
  $AE7C: 3A        NOP
  $AE7D: 3A        NOP
  $AE7E: 59 01 3F  EOR $3f01,Y
  $AE81: 05 01     ORA $01
  $AE83: 3A        NOP
  $AE84: 9B A6 AD  TAS $ada6,Y
  $AE87: 8C 09 07  STY $0709
  $AE8A: 0A        ASL A
  $AE8B: 01 7D     ORA ($7d,X)
  $AE8D: A4 48     LDY $48
  $AE8F: 8C 0F 01  STY $010f
  $AE92: 05 01     ORA $01
  $AE94: FF 59 01  ISB $0159,X
  $AE97: 3A        NOP
  $AE98: 3F 3A 0B  RLA $0b3a,X
  $AE9B: 00        BRK
  $AE9C: 01 FF     ORA ($ff,X)
  $AE9E: 59 01 3A  EOR $3a01,Y
  $AEA1: 40        RTI
  $AEA2: 3A        NOP
  $AEA3: 0B 00     ANC #$00
  $AEA5: 01 FF     ORA ($ff,X)
  $AEA7: 59 01 3A  EOR $3a01,Y
  $AEAA: 41 3A     EOR ($3a,X)
  $AEAC: 0B 00     ANC #$00
  $AEAE: 01 FF     ORA ($ff,X)
  $AEB0: 59 01 3A  EOR $3a01,Y
  $AEB3: 42        ???
  $AEB4: 3A        NOP
  $AEB5: 0B 00     ANC #$00
  $AEB7: 01 FF     ORA ($ff,X)
  $AEB9: 59 01 3A  EOR $3a01,Y
  $AEBC: 43 3A     SRE ($3a,X)
  $AEBE: 0B 00     ANC #$00
  $AEC0: 01 FF     ORA ($ff,X)
  $AEC2: 59 01 3A  EOR $3a01,Y
  $AEC5: 44 3A     NOP $3a
  $AEC7: 0B 00     ANC #$00
  $AEC9: 01 FF     ORA ($ff,X)
  $AECB: 55 30     EOR $30,X
  $AECD: 2D 08 2E  AND $2e08
  $AED0: 0B 31     ANC #$31
  $AED2: 02        ???
  $AED3: FF 08 2E  ISB $2e08,X
  $AED6: 0B 31     ANC #$31
  $AED8: 02        ???
  $AED9: 3A        NOP
  $AEDA: 0D 2D FF  ORA $ff2d
  $AEDD: 29 2D     AND #$2d
  $AEDF: 0B 30     ANC #$30
  $AEE1: 02        ???
  $AEE2: 55 00     EOR $00,X
  $AEE4: 01 FF     ORA ($ff,X)
  $AEE6: 3A        NOP
  $AEE7: 3A        NOP
  $AEE8: 3A        NOP
  $AEE9: 3A        NOP
  $AEEA: 3A        NOP
  $AEEB: 3A        NOP
  $AEEC: 3A        NOP
  $AEED: FF 55 31  ISB $3155,X
  $AEF0: 02        ???
  $AEF1: 1D 02 FF  ORA $ff02,X
  $AEF4: 8C 89 80  STY $8089
  $AEF7: A1 A2     LDA ($a2,X)
  $AEF9: FF 0B 00  ISB $000b,X
  $AEFC: 01 05     ORA ($05,X)
  $AEFE: 01 0B     ORA ($0b,X)
  $AF00: FF A7 48  ISB $48a7,X
  $AF03: D1 1A     CMP ($1a),Y
  $AF05: 31 02     AND ($02),Y
  $AF07: FF 25 0B  ISB $0b25,X
  $AF0A: 3A        NOP
  $AF0B: 1F 2D 14  SLO $142d,X
  $AF0E: 06 08     ASL $08
  $AF10: FF 8C 8F  ISB $8f8c,X
  $AF13: A1 AD     LDA ($ad,X)
  $AF15: FF 4A 4A  ISB $4a4a,X
  $AF18: 4A        LSR A
  $AF19: 4A        LSR A
  $AF1A: 4A        LSR A
  $AF1B: 4A        LSR A
  $AF1C: 4A        LSR A
  $AF1D: FF A1 AD  ISB $ada1,X
  $AF20: E3 48     ISB ($48,X)
  $AF22: 90 B2     BCC $aed6
  $AF24: AD D5 2C  LDA $2cd5
  $AF27: 3A        NOP
  $AF28: 0B 1E     ANC #$1e
  $AF2A: 0C 05 37  NOP $3705
  $AF2D: FF 3A 19  ISB $193a,X
  $AF30: 01 FF     ORA ($ff,X)
  $AF32: 01 01     ORA ($01,X)
  $AF34: 03 FF     SLO ($ff,X)
  $AF36: 25 0D     AND $0d
  $AF38: 2D 2C 39  AND $392c
  $AF3B: 3A        NOP
  $AF3C: 11 02     ORA ($02),Y
  $AF3E: 05 0B     ORA $0b
  $AF40: 0F FF 25  SLO $25ff
  $AF43: 0D 2D 2C  ORA $2c2d
  $AF46: 39 3A 04  AND $043a,Y
  $AF49: 10 0F     BPL $af5a
  $AF4B: FF E0 E8  ISB $e8e0,X
  $AF4E: F0 F8     BEQ $af48
  $AF50: 00        BRK
  $AF51: 08        PHP
  $AF52: 10 18     BPL $af6c
  $AF54: 20 F9 28  JSR $28f9
  $AF57: B8        CLV
  $AF58: C0 00     CPY #$00
  $AF5A: 00        BRK
  $AF5B: 00        BRK
  $AF5C: E0 E8     CPX #$e8
  $AF5E: F0 F8     BEQ $af58
  $AF60: 00        BRK
  $AF61: 08        PHP
  $AF62: 10 18     BPL $af7c
  $AF64: 20 D0 D8  JSR $d8d0
  $AF67: 07 09     SLO $09
  $AF69: 93 9F     ??? ($9f),Y
  $AF6B: A7 E6     LAX $e6
  $AF6D: EF EE EF  ISB $efee
  $AF70: F6 EF     INC $ef,X
  $AF72: 42        ???
  $AF73: F0 48     BEQ $afbd
  $AF75: F0 4E     BEQ $afc5
  $AF77: F0 9C     BEQ $af15
  $AF79: F0 A2     BEQ $af1d
  $AF7B: F0 A8     BEQ $af25
  $AF7D: F0 F0     BEQ $af6f
  $AF7F: F0 F6     BEQ $af77
  $AF81: F0 FC     BEQ $af7f
  $AF83: F0 3C     BEQ $afc1
  $AF85: F1 7E     SBC ($7e),Y
  $AF87: F1 84     SBC ($84),Y
  $AF89: F1 8A     SBC ($8a),Y
  $AF8B: F1 C8     SBC ($c8),Y
  $AF8D: F1 CE     SBC ($ce),Y
  $AF8F: F1 D6     SBC ($d6),Y
  $AF91: F1 E8     SBC ($e8),Y
  $AF93: F1 2E     SBC ($2e),Y
  $AF95: F2        ???
  $AF96: 36 F2     ROL $f2,X
  $AF98: 3C F2 CE  NOP $cef2,X
  $AF9B: F6 9C     INC $9c,X
  $AF9D: F2        ???
  $AF9E: A2 F2     LDX #$f2
  $AFA0: A8        TAY
  $AFA1: F2        ???
  $AFA2: E2 F2     NOP #$f2
  $AFA4: EA        NOP
  $AFA5: F2        ???
  $AFA6: 4A        LSR A
  $AFA7: F3 54     ISB ($54),Y
  $AFA9: F3 5E     ISB ($5e),Y
  $AFAB: F3 A8     ISB ($a8),Y
  $AFAD: F3 AE     ISB ($ae),Y
  $AFAF: F3 FA     ISB ($fa),Y
  $AFB1: F3 02     ISB ($02),Y
  $AFB3: F4 0A     NOP $0a,X
  $AFB5: F4 54     NOP $54,X
  $AFB7: F4 5A     NOP $5a,X
  $AFB9: F4 60     NOP $60,X
  $AFBB: F4 A6     NOP $a6,X
  $AFBD: F4 AC     NOP $ac,X
  $AFBF: F4 B2     NOP $b2,X
  $AFC1: F4 DE     NOP $de,X
  $AFC3: F4 32     NOP $32,X
  $AFC5: F5 38     SBC $38,X
  $AFC7: F5 3E     SBC $3e,X
  $AFC9: F5 90     SBC $90,X
  $AFCB: F5 96     SBC $96,X
  $AFCD: F5 9C     SBC $9c,X
  $AFCF: F5 A6     SBC $a6,X
  $AFD1: F6 EC     INC $ec,X
  $AFD3: F5 F6     SBC $f6,X
  $AFD5: F5 02     SBC $02,X
  $AFD7: F6 0E     INC $0e,X
  $AFD9: F6 14     INC $14,X
  $AFDB: F6 1A     INC $1a,X
  $AFDD: F6 20     INC $20,X
  $AFDF: F6 5E     INC $5e,X
  $AFE1: F6 64     INC $64,X
  $AFE3: F6 6A     INC $6a,X
  $AFE5: F6 1B     INC $1b,X
  $AFE7: 03 02     SLO ($02,X)
  $AFE9: 04 60     NOP $60
  $AFEB: 05 62     ORA $62
  $AFED: E0 1B     CPX #$1b
  $AFEF: 03 02     SLO ($02,X)
  $AFF1: 04 63     NOP $63
  $AFF3: 05 61     ORA $61
  $AFF5: E0 1B     CPX #$1b
  $AFF7: 01 04     ORA ($04,X)
  $AFF9: 01 43     ORA ($43,X)
  $AFFB: 02        ???
  $AFFC: 47 03     SRE $03
  $AFFE: 4D 04 51  EOR $5104
  $B001: 02        ???
  $B002: 07 00     SLO $00
  $B004: 40        RTI
  $B005: 01 FF     ORA ($ff,X)
  $B007: 02        ???
  $B008: 48        PHA
  $B009: 03 4E     SLO ($4e,X)
  $B00B: 04 52     NOP $52
  $B00D: 05 55     ORA $55
  $B00F: 06 58     ASL $58
  $B011: 03 04     SLO ($04,X)
  $B013: 00        BRK
  $B014: 41 01     EOR ($01,X)
  $B016: 44 02     NOP $02
  $B018: 49 06     EOR #$06
  $B01A: 59 04 03  EOR $0304,Y
  $B01D: 80 41     NOP #$41
  $B01F: 01 FF     ORA ($ff,X)
  $B021: 02        ???
  $B022: 4A        LSR A
  $B023: 05 07     ORA $07
  $B025: 00        BRK
  $B026: 42        ???
  $B027: 01 45     ORA ($45,X)
  $B029: 02        ???
  $B02A: 4B 03     ALR #$03
  $B02C: 4F 04 53  SRE $5304
  $B02F: 05 56     ORA $56
  $B031: 06 5A     ASL $5a
  $B033: 06 06     ASL $06
  $B035: 01 46     ORA ($46,X)
  $B037: 02        ???
  $B038: 4C 03 50  JMP $5003
  $B03B: 04 54     NOP $54
  $B03D: 05 57     ORA $57
  $B03F: 06 5B     ASL $5b
  $B041: E0 13     CPX #$13
  $B043: 03 01     SLO ($01,X)
  $B045: 65 A0     ADC $a0
  $B047: E0 13     CPX #$13
  $B049: 03 01     SLO ($01,X)
  $B04B: 65 A4     ADC $a4
  $B04D: E0 13     CPX #$13
  $B04F: 01 04     ORA ($04,X)
  $B051: 02        ???
  $B052: 82 03     NOP #$03
  $B054: 88        DEY
  $B055: 04 8A     NOP $8a
  $B057: 06 A2     ASL $a2
  $B059: 02        ???
  $B05A: 07 01     SLO $01
  $B05C: 81 02     STA ($02,X)
  $B05E: 83 03     SAX ($03,X)
  $B060: 89 44     NOP #$44
  $B062: 8B 64     XAA #$64
  $B064: FD 05 A1  SBC $a105,X
  $B067: 06 A3     ASL $a3
  $B069: 03 05     SLO ($05,X)
  $B06B: 01 84     ORA ($84,X)
  $B06D: 02        ???
  $B06E: 86 03     STX $03
  $B070: 8C 04 8E  STY $8e04
  $B073: 06 A6     ASL $a6
  $B075: 04 07     NOP $07
  $B077: 01 85     ORA ($85,X)
  $B079: 02        ???
  $B07A: FF 03 8D  ISB $8d03,X
  $B07D: 44 8F     NOP $8f
  $B07F: 64 FD     NOP $fd
  $B081: 05 A5     ORA $a5
  $B083: 06 A7     ASL $a7
  $B085: 05 05     ORA $05
  $B087: 02        ???
  $B088: 87 03     SAX $03
  $B08A: 98        TYA
  $B08B: 04 9A     NOP $9a
  $B08D: 05 FF     ORA $ff
  $B08F: 06 FF     ASL $ff
  $B091: 06 04     ASL $04
  $B093: 03 99     SLO ($99,X)
  $B095: 04 9B     NOP $9b
  $B097: 05 B0     ORA $b0
  $B099: 06 B2     ASL $b2
  $B09B: E0 16     CPX #$16
  $B09D: 03 01     SLO ($01,X)
  $B09F: 65 E4     ADC $e4
  $B0A1: E0 16     CPX #$16
  $B0A3: 03 01     SLO ($01,X)
  $B0A5: 65 EE     ADC $ee
  $B0A7: E0 16     CPX #$16
  $B0A9: 01 02     ORA ($02,X)
  $B0AB: 02        ???
  $B0AC: E2 03     NOP #$03
  $B0AE: E8        INX
  $B0AF: 02        ???
  $B0B0: 06 01     ASL $01
  $B0B2: CB 02     AXS #$02
  $B0B4: E1 03     SBC ($03,X)
  $B0B6: E3 64     ISB ($64,X)
  $B0B8: E9 05     SBC #$05
  $B0BA: EB 26     SBC #$26
  $B0BC: DB 03 05  DCP $0503,Y
  $B0BF: 01 CE     ORA ($ce,X)
  $B0C1: 02        ???
  $B0C2: 02        ???
  $B0C3: 03 E6     SLO ($e6,X)
  $B0C5: 04 EC     NOP $ec
  $B0C7: 26 DE     ROL $de
  $B0C9: 04 06     NOP $06
  $B0CB: 01 CF     ORA ($cf,X)
  $B0CD: 02        ???
  $B0CE: 02        ???
  $B0CF: 03 02     SLO ($02,X)
  $B0D1: 04 ED     NOP $ed
  $B0D3: 05 EF     ORA $ef
  $B0D5: 26 EA     ROL $ea
  $B0D7: 05 06     ORA $06
  $B0D9: 01 DA     ORA ($da,X)
  $B0DB: 02        ???
  $B0DC: F0 03     BEQ $b0e1
  $B0DE: 02        ???
  $B0DF: 04 F8     NOP $f8
  $B0E1: 05 FA     ORA $fa
  $B0E3: 26 F2     ROL $f2
  $B0E5: 06 04     ASL $04
  $B0E7: 02        ???
  $B0E8: F1 03     SBC ($03),Y
  $B0EA: F3 04     ISB ($04),Y
  $B0EC: F9 05 FB  SBC $fb05,Y
  $B0EF: E0 04     CPX #$04
  $B0F1: 03 01     SLO ($01,X)
  $B0F3: 65 28     ADC $28
  $B0F5: E0 04     CPX #$04
  $B0F7: 03 01     SLO ($01,X)
  $B0F9: 65 BB     ADC $bb
  $B0FB: E0 04     CPX #$04
  $B0FD: 01 04     ORA ($04,X)
  $B0FF: 02        ???
  $B100: AF 03 BE  LAX $be03
  $B103: 04 9F     NOP $9f
  $B105: 05 C0     ORA $c0
  $B107: 02        ???
  $B108: 07 01     SLO $01
  $B10A: 9A        TXS
  $B10B: 02        ???
  $B10C: B0 03     BCS $b111
  $B10E: B2        ???
  $B10F: 63 25     RRA ($25,X)
  $B111: 64 B8     NOP $b8
  $B113: 05 BA     ORA $ba
  $B115: 26 C1     ROL $c1
  $B117: 03 05     SLO ($05,X)
  $B119: 01 9B     ORA ($9b,X)
  $B11B: 02        ???
  $B11C: B1 03     LDA ($03),Y
  $B11E: B3 04     LAX ($04),Y
  $B120: B9 06 C4  LDA $c406,Y
  $B123: 04 06     NOP $06
  $B125: 01 9E     ORA ($9e,X)
  $B127: 02        ???
  $B128: B4 63     LDY $63,X
  $B12A: B6 64     LDX $64,Y
  $B12C: BC 05 7C  LDY $7c05,X
  $B12F: 26 C5     ROL $c5
  $B131: 05 04     ORA $04
  $B133: 02        ???
  $B134: B5 03     LDA $03,X
  $B136: B7 04     LAX $04,Y
  $B138: BD 05 BF  LDA $bf05,X
  $B13B: E0 13     CPX #$13
  $B13D: 01 03     ORA ($03,X)
  $B13F: 02        ???
  $B140: B3 03     LAX ($03),Y
  $B142: A8        TAY
  $B143: 04 8A     NOP $8a
  $B145: 02        ???
  $B146: 07 01     SLO $01
  $B148: B1 02     LDA ($02),Y
  $B14A: B6 03     LDX $03,Y
  $B14C: A9 44     LDA #$44
  $B14E: 8B 64     XAA #$64
  $B150: FD 05 BC  SBC $bc05,X
  $B153: 26 BD     ROL $bd
  $B155: 03 05     SLO ($05,X)
  $B157: 01 B4     ORA ($b4,X)
  $B159: 02        ???
  $B15A: B7 03     LAX $03,Y
  $B15C: AC 04 8E  LDY $8e04
  $B15F: 06 A6     ASL $a6
  $B161: 04 07     NOP $07
  $B163: 01 B5     ORA ($b5,X)
  $B165: 02        ???
  $B166: FD 03 AD  SBC $ad03,X
  $B169: 44 8F     NOP $8f
  $B16B: 64 FD     NOP $fd
  $B16D: 05 9F     ORA $9f
  $B16F: 26 B9     ROL $b9
  $B171: 05 05     ORA $05
  $B173: 02        ???
  $B174: 6B 03     ARR #$03
  $B176: B8        CLV
  $B177: 04 75     NOP $75
  $B179: 05 7E     ORA $7e
  $B17B: 26 9E     ROL $9e
  $B17D: E0 0F     CPX #$0f
  $B17F: 03 01     SLO ($01,X)
  $B181: 65 D4     ADC $d4
  $B183: E0 0F     CPX #$0f
  $B185: 03 01     SLO ($01,X)
  $B187: 65 3E     ADC $3e
  $B189: E0 0F     CPX #$0f
  $B18B: 01 03     ORA ($03,X)
  $B18D: 02        ???
  $B18E: 2A        ROL A
  $B18F: 03 C0     SLO ($c0,X)
  $B191: 04 C2     NOP $c2
  $B193: 02        ???
  $B194: 06 01     ASL $01
  $B196: 29 02     AND #$02
  $B198: 2B 03     ANC #$03
  $B19A: C1 64     CMP ($64,X)
  $B19C: C3 05     DCP ($05,X)
  $B19E: 3B 06 D1  RLA $d106,Y
  $B1A1: 03 05     SLO ($05,X)
  $B1A3: 01 2C     ORA ($2c,X)
  $B1A5: 02        ???
  $B1A6: 2E 03 C4  ROL $c403
  $B1A9: 04 C6     NOP $c6
  $B1AB: 06 D3     ASL $d3
  $B1AD: 04 06     NOP $06
  $B1AF: 01 2D     ORA ($2d,X)
  $B1B1: 02        ???
  $B1B2: 2F 03 C5  RLA $c503
  $B1B5: 64 C7     NOP $c7
  $B1B7: 05 3F     ORA $3f
  $B1B9: 06 D6     ASL $d6
  $B1BB: 05 05     ORA $05
  $B1BD: 02        ???
  $B1BE: 3A        NOP
  $B1BF: 03 D0     SLO ($d0,X)
  $B1C1: 04 D2     NOP $d2
  $B1C3: 05 D5     ORA $d5
  $B1C5: 06 D7     ASL $d7
  $B1C7: E0 12     CPX #$12
  $B1C9: 03 01     SLO ($01,X)
  $B1CB: 65 1C     ADC $1c
  $B1CD: E0 12     CPX #$12
  $B1CF: 03 02     SLO ($02,X)
  $B1D1: 65 16     ADC $16
  $B1D3: 65 03     ADC $03
  $B1D5: E0 0F     CPX #$0f
  $B1D7: 01 05     ORA ($05,X)
  $B1D9: 49 BC     EOR #$bc
  $B1DB: 4A        LSR A
  $B1DC: BD 40 BE  LDA $be40,X
  $B1DF: 45 C8     EOR $c8
  $B1E1: 46 C9     LSR $c9
  $B1E3: 06 01     ASL $01
  $B1E5: 03 CA     SLO ($ca,X)
  $B1E7: E0 12     CPX #$12
  $B1E9: 01 04     ORA ($04,X)
  $B1EB: 62        ???
  $B1EC: 12        ???
  $B1ED: 63 18     RRA ($18,X)
  $B1EF: 64 1A     NOP $1a
  $B1F1: 65 20     ADC $20
  $B1F3: 02        ???
  $B1F4: 06 61     ASL $61
  $B1F6: 01 62     ORA ($62,X)
  $B1F8: 13 63     SLO ($63),Y
  $B1FA: 19 64 1B  ORA $1b64,Y
  $B1FD: 65 21     ADC $21
  $B1FF: 66 24     ROR $24
  $B201: 03 05     SLO ($05,X)
  $B203: 61 04     ADC ($04,X)
  $B205: 62        ???
  $B206: FF 63 08  ISB $0863,X
  $B209: 64 0A     NOP $0a
  $B20B: 26 25     ROL $25
  $B20D: 04 06     NOP $06
  $B20F: 61 05     ADC ($05,X)
  $B211: 62        ???
  $B212: FF 63 09  ISB $0963,X
  $B215: 64 0B     NOP $0b
  $B217: 65 03     ADC $03
  $B219: 26 30     ROL $30
  $B21B: 05 05     ORA $05
  $B21D: 61 10     ADC ($10,X)
  $B21F: 63 0C     RRA ($0c,X)
  $B221: 64 0E     NOP $0e
  $B223: 65 15     ADC $15
  $B225: 26 31     ROL $31
  $B227: 06 01     ASL $01
  $B229: 26 34     ROL $34
  $B22B: 20 73 F2  JSR $f273
  $B22E: 12        ???
  $B22F: 03 02     SLO ($02,X)
  $B231: 6B 55     ARR #$55
  $B233: 65 03     ADC $03
  $B235: E0 12     CPX #$12
  $B237: 03 01     SLO ($01,X)
  $B239: 65 4B     ADC $4b
  $B23B: E0 12     CPX #$12
  $B23D: 02        ???
  $B23E: 06 03     ASL $03
  $B240: 42        ???
  $B241: 63 02     RRA ($02,X)
  $B243: 64 48     NOP $48
  $B245: 44 02     NOP $02
  $B247: 65 4A     ADC $4a
  $B249: 66 60     ROR $60
  $B24B: 03 04     SLO ($04,X)
  $B24D: 02        ???
  $B24E: 02        ???
  $B24F: 03 43     SLO ($43,X)
  $B251: 64 49     NOP $49
  $B253: 26 61     ROL $61
  $B255: 04 07     NOP $07
  $B257: 02        ???
  $B258: 02        ???
  $B259: 03 46     SLO ($46,X)
  $B25B: 63 02     RRA ($02,X)
  $B25D: 64 4C     NOP $4c
  $B25F: 44 02     NOP $02
  $B261: 65 03     ADC $03
  $B263: 26 64     ROL $64
  $B265: 05 04     ORA $04
  $B267: 03 47     SLO ($47,X)
  $B269: 04 4D     NOP $4d
  $B26B: 05 4F     ORA $4f
  $B26D: 26 65     ROL $65
  $B26F: 06 01     ASL $01
  $B271: 26 70     ROL $70
  $B273: 05 01     ORA $01
  $B275: 02        ???
  $B276: 06 06     ASL $06
  $B278: 03 02     SLO ($02,X)
  $B27A: 07 03     SLO $03
  $B27C: 0D 04 0F  ORA $0f04
  $B27F: 01 04     ORA ($04,X)
  $B281: 01 17     ORA ($17,X)
  $B283: 02        ???
  $B284: 1D 03 1F  ORA $1f03,X
  $B287: 04 35     NOP $35
  $B289: 02        ???
  $B28A: 02        ???
  $B28B: 01 40     ORA ($40,X)
  $B28D: 02        ???
  $B28E: 4E 03 01  LSR $0103
  $B291: 01 41     ORA ($41,X)
  $B293: 04 01     NOP $01
  $B295: 01 44     ORA ($44,X)
  $B297: 05 01     ORA $01
  $B299: 01 45     ORA ($45,X)
  $B29B: E0 12     CPX #$12
  $B29D: 03 01     SLO ($01,X)
  $B29F: 65 55     ADC $55
  $B2A1: E0 12     CPX #$12
  $B2A3: 03 01     SLO ($01,X)
  $B2A5: 65 5B     ADC $5b
  $B2A7: E0 12     CPX #$12
  $B2A9: 02        ???
  $B2AA: 04 63     NOP $63
  $B2AC: 52        ???
  $B2AD: 64 58     NOP $58
  $B2AF: 65 5A     ADC $5a
  $B2B1: 26 71     ROL $71
  $B2B3: 03 04     SLO ($04,X)
  $B2B5: 02        ???
  $B2B6: FF 63 53  ISB $5363,X
  $B2B9: 64 59     NOP $59
  $B2BB: 26 74     ROL $74
  $B2BD: 04 05     NOP $05
  $B2BF: 02        ???
  $B2C0: FF 63 56  ISB $5663,X
  $B2C3: 64 5C     NOP $5c
  $B2C5: 65 03     ADC $03
  $B2C7: 26 73     ROL $73
  $B2C9: 05 05     ORA $05
  $B2CB: 02        ???
  $B2CC: FF 03 57  ISB $5703,X
  $B2CF: 04 4D     NOP $4d
  $B2D1: 05 33     ORA $33
  $B2D3: 26 76     ROL $76
  $B2D5: 06 04     ASL $04
  $B2D7: 02        ???
  $B2D8: 5D 03 5F  EOR $5f03,X
  $B2DB: 04 75     NOP $75
  $B2DD: 65 77     ADC $77
  $B2DF: 20 7F F2  JSR $f27f
  $B2E2: 12        ???
  $B2E3: 03 02     SLO ($02,X)
  $B2E5: 6C 4B 65  JMP ($654b)
  $B2E8: 03 E0     SLO ($e0,X)
  $B2EA: 12        ???
  $B2EB: 01 06     ORA ($06,X)
  $B2ED: 01 17     ORA ($17,X)
  $B2EF: 02        ???
  $B2F0: 28        PLP
  $B2F1: 03 1F     SLO ($1f,X)
  $B2F3: 04 35     NOP $35
  $B2F5: 05 22     ORA $22
  $B2F7: 86 3A     STX $3a
  $B2F9: 02        ???
  $B2FA: 09 01     ORA #$01
  $B2FC: 23 02     RLA ($02,X)
  $B2FE: 29 03     AND #$03
  $B300: 2B 63     ANC #$63
  $B302: 02        ???
  $B303: 64 2C     NOP $2c
  $B305: 44 02     NOP $02
  $B307: 65 5A     ADC $5a
  $B309: 05 02     ORA $02
  $B30B: 06 2A     ASL $2a
  $B30D: 03 05     SLO ($05,X)
  $B30F: 01 26     ORA ($26,X)
  $B311: 02        ???
  $B312: 02        ???
  $B313: 03 2E     SLO ($2e,X)
  $B315: 64 59     NOP $59
  $B317: 26 74     ROL $74
  $B319: 04 08     NOP $08
  $B31B: 01 27     ORA ($27,X)
  $B31D: 02        ???
  $B31E: 02        ???
  $B31F: 03 2F     SLO ($2f,X)
  $B321: 63 02     RRA ($02,X)
  $B323: 64 2D     NOP $2d
  $B325: 44 02     NOP $02
  $B327: 65 03     ADC $03
  $B329: 26 3E     ROL $3e
  $B32B: 05 07     ORA $07
  $B32D: 01 32     ORA ($32,X)
  $B32F: 02        ???
  $B330: 38        SEC
  $B331: 03 47     SLO ($47,X)
  $B333: 04 4D     NOP $4d
  $B335: 05 33     ORA $33
  $B337: 26 65     ROL $65
  $B339: 06 02     ASL $02
  $B33B: 06 06     ASL $06
  $B33D: 02        ???
  $B33E: 39 03 3B  AND $3b03,Y
  $B341: 04 3A     NOP $3a
  $B343: 05 36     ORA $36
  $B345: 06 3C     ASL $3c
  $B347: 26 32     ROL $32
  $B349: E0 12     CPX #$12
  $B34B: 03 03     SLO ($03,X)
  $B34D: 65 7F     ADC $7f
  $B34F: 66 7B     ROR $7b
  $B351: 66 03     ROR $03
  $B353: E0 12     CPX #$12
  $B355: 03 03     SLO ($03,X)
  $B357: 65 C1     ADC $c1
  $B359: 66 7B     ROR $7b
  $B35B: 66 FF     ROR $ff
  $B35D: E0 12     CPX #$12
  $B35F: 00        BRK
  $B360: 02        ???
  $B361: 63 82     RRA ($82,X)
  $B363: 64 88     NOP $88
  $B365: 01 04     ORA ($04,X)
  $B367: 62        ???
  $B368: 90 63     BCC $b3cd
  $B36A: 83 64     SAX ($64,X)
  $B36C: 89 65     NOP #$65
  $B36E: 95 02     STA $02,X
  $B370: 06 61     ASL $61
  $B372: 80 62     NOP #$62
  $B374: 02        ???
  $B375: 63 86     RRA ($86,X)
  $B377: 64 6A     NOP $6a
  $B379: 65 C0     ADC $c0
  $B37B: 66 7A     ROR $7a
  $B37D: 03 04     SLO ($04,X)
  $B37F: 61 81     ADC ($81,X)
  $B381: 62        ???
  $B382: 91 63     STA ($63),Y
  $B384: 87 64     SAX $64
  $B386: 8C 04 06  STY $0604
  $B389: 61 84     ADC ($84,X)
  $B38B: 62        ???
  $B38C: 02        ???
  $B38D: 63 92     RRA ($92,X)
  $B38F: 64 6E     NOP $6e
  $B391: 65 C4     ADC $c4
  $B393: 66 7E     ROR $7e
  $B395: 05 06     ORA $06
  $B397: 61 85     ADC ($85,X)
  $B399: 62        ???
  $B39A: 94 63     STY $63,X
  $B39C: 93 64     ??? ($64),Y
  $B39E: 6F 64 FF  RRA $ff64
  $B3A1: 65 9C     ADC $9c
  $B3A3: 06 01     ASL $01
  $B3A5: 64 96     NOP $96
  $B3A7: E0 12     CPX #$12
  $B3A9: 03 01     SLO ($01,X)
  $B3AB: 65 AA     ADC $aa
  $B3AD: E0 12     CPX #$12
  $B3AF: 01 04     ORA ($04,X)
  $B3B1: 02        ???
  $B3B2: A0 03     LDY #$03
  $B3B4: A2 04     LDX #$04
  $B3B6: A8        TAY
  $B3B7: 26 B0     ROL $b0
  $B3B9: 02        ???
  $B3BA: 06 01     ASL $01
  $B3BC: 8A        TXA
  $B3BD: 02        ???
  $B3BE: A1 03     LDA ($03,X)
  $B3C0: A3 64     LAX ($64,X)
  $B3C2: A9 65     LDA #$65
  $B3C4: AB 26     ATX #$26
  $B3C6: B1 03     LDA ($03),Y
  $B3C8: 05 01     ORA $01
  $B3CA: 8B 02     XAA #$02
  $B3CC: 02        ???
  $B3CD: 03 A4     SLO ($a4,X)
  $B3CF: 64 A6     NOP $a6
  $B3D1: 26 B4     ROL $b4
  $B3D3: 04 06     NOP $06
  $B3D5: 01 8E     ORA ($8e,X)
  $B3D7: 02        ???
  $B3D8: 02        ???
  $B3D9: 03 A5     SLO ($a5,X)
  $B3DB: 64 A7     NOP $a7
  $B3DD: 65 03     ADC $03
  $B3DF: 26 B2     ROL $b2
  $B3E1: 05 06     ORA $06
  $B3E3: 01 8F     ORA ($8f,X)
  $B3E5: 02        ???
  $B3E6: AC 03 AE  LDY $ae03
  $B3E9: 04 9A     NOP $9a
  $B3EB: 05 9E     ORA $9e
  $B3ED: 26 B3     ROL $b3
  $B3EF: 06 04     ASL $04
  $B3F1: 02        ???
  $B3F2: AD 03 AF  LDA $af03
  $B3F5: 04 9B     NOP $9b
  $B3F7: 26 B6     ROL $b6
  $B3F9: E0 12     CPX #$12
  $B3FB: 03 02     SLO ($02,X)
  $B3FD: 6C 55 65  JMP ($6555)
  $B400: 03 E0     SLO ($e0,X)
  $B402: 12        ???
  $B403: 03 02     SLO ($02,X)
  $B405: 6C EC 65  JMP ($65ec)
  $B408: 03 E0     SLO ($e0,X)
  $B40A: 12        ???
  $B40B: 01 03     ORA ($03,X)
  $B40D: 02        ???
  $B40E: 9D 03 9F  STA $9f03,X
  $B411: 04 B5     NOP $b5
  $B413: 02        ???
  $B414: 05 02     ORA $02
  $B416: C8        INY
  $B417: 03 CA     SLO ($ca,X)
  $B419: 64 E0     NOP $e0
  $B41B: 65 BA     ADC $ba
  $B41D: 26 BB     ROL $bb
  $B41F: 03 05     SLO ($05,X)
  $B421: 01 97     ORA ($97,X)
  $B423: 02        ???
  $B424: B7 03     LAX $03,Y
  $B426: BD 64 0A  LDA $0a64,X
  $B429: 26 BE     ROL $be
  $B42B: 04 06     NOP $06
  $B42D: 01 C2     ORA ($c2,X)
  $B42F: 02        ???
  $B430: 02        ???
  $B431: 03 E8     SLO ($e8,X)
  $B433: 64 E2     NOP $e2
  $B435: 65 03     ADC $03
  $B437: 26 BF     ROL $bf
  $B439: 05 06     ORA $06
  $B43B: 02        ???
  $B43C: C3 03     DCP ($03,X)
  $B43E: C9 64     CMP #$64
  $B440: CB 05     AXS #$05
  $B442: E1 06     SBC ($06,X)
  $B444: E3 26     ISB ($26,X)
  $B446: E9 06     SBC #$06
  $B448: 05 02     ORA $02
  $B44A: C6 03     DEC $03
  $B44C: CC 04 CE  CPY $ce04
  $B44F: 05 E4     ORA $e4
  $B451: 26 E6     ROL $e6
  $B453: E0 12     CPX #$12
  $B455: 03 01     SLO ($01,X)
  $B457: 65 F3     ADC $f3
  $B459: E0 12     CPX #$12
  $B45B: 03 01     SLO ($01,X)
  $B45D: 65 E7     ADC $e7
  $B45F: E0 12     CPX #$12
  $B461: 01 04     ORA ($04,X)
  $B463: 01 C7     ORA ($c7,X)
  $B465: 02        ???
  $B466: CD 03 CF  CMP $cf03
  $B469: 26 ED     ROL $ed
  $B46B: 02        ???
  $B46C: 06 01     ASL $01
  $B46E: D2        ???
  $B46F: 02        ???
  $B470: D8        CLD
  $B471: 63 DA     RRA ($da,X)
  $B473: 64 F0     NOP $f0
  $B475: 65 F2     ADC $f2
  $B477: 26 F8     ROL $f8
  $B479: 03 05     SLO ($05,X)
  $B47B: 01 D3     ORA ($d3,X)
  $B47D: 02        ???
  $B47E: D9 63 DB  CMP $db63,Y
  $B481: 64 F1     NOP $f1
  $B483: 26 F9     ROL $f9
  $B485: 04 06     NOP $06
  $B487: 01 D6     ORA ($d6,X)
  $B489: 02        ???
  $B48A: DC 63 DE  NOP $de63,X
  $B48D: 64 F4     NOP $f4
  $B48F: 65 F6     ADC $f6
  $B491: 26 FC     ROL $fc
  $B493: 05 06     ORA $06
  $B495: 01 D7     ORA ($d7,X)
  $B497: 02        ???
  $B498: DD 03 DF  CMP $df03,X
  $B49B: 64 F5     NOP $f5
  $B49D: 65 F7     ADC $f7
  $B49F: 26 FD     ROL $fd
  $B4A1: 06 01     ASL $01
  $B4A3: 26 E5     ROL $e5
  $B4A5: E0 04     CPX #$04
  $B4A7: 03 01     SLO ($01,X)
  $B4A9: 65 46     ADC $46
  $B4AB: E0 04     CPX #$04
  $B4AD: 03 01     SLO ($01,X)
  $B4AF: 65 A9     ADC $a9
  $B4B1: E0 04     CPX #$04
  $B4B3: 02        ???
  $B4B4: 01 03     ORA ($03,X)
  $B4B6: A0 03     LDY #$03
  $B4B8: 01 03     ORA ($03,X)
  $B4BA: A1 04     LDA ($04,X)
  $B4BC: 01 03     ORA ($03,X)
  $B4BE: A4 01     LDY $01
  $B4C0: 01 03     ORA ($03,X)
  $B4C2: 8E 02 02  STX $0202
  $B4C5: 44 A2     NOP $a2
  $B4C7: 64 25     NOP $25
  $B4C9: 03 02     SLO ($02,X)
  $B4CB: 02        ???
  $B4CC: 35 64     AND $64,X
  $B4CE: A3 04     LAX ($04,X)
  $B4D0: 03 44     SLO ($44,X)
  $B4D2: A6 64     LDX $64
  $B4D4: 25 05     AND $05
  $B4D6: AC 05 01  LDY $0105
  $B4D9: 03 A5     SLO ($a5,X)
  $B4DB: 20 07 F5  JSR $f507
  $B4DE: 04 02     NOP $02
  $B4E0: 01 03     ORA ($03,X)
  $B4E2: 54 03     NOP $03,X
  $B4E4: 01 03     ORA ($03,X)
  $B4E6: 37 04     RLA $04,X
  $B4E8: 01 03     ORA ($03,X)
  $B4EA: 62        ???
  $B4EB: 01 01     ORA ($01,X)
  $B4ED: 03 2B     SLO ($2b,X)
  $B4EF: 02        ???
  $B4F0: 02        ???
  $B4F1: 44 A2     NOP $a2
  $B4F3: 64 25     NOP $25
  $B4F5: 03 02     SLO ($02,X)
  $B4F7: 02        ???
  $B4F8: 35 04     AND $04,X
  $B4FA: A3 04     LAX ($04,X)
  $B4FC: 03 44     SLO ($44,X)
  $B4FE: A6 64     LDX $64
  $B500: 25 05     AND $05
  $B502: AC 05 01  LDY $0105
  $B505: 03 63     SLO ($63,X)
  $B507: 00        BRK
  $B508: 01 02     ORA ($02,X)
  $B50A: 86 01     STX $01
  $B50C: 02        ???
  $B50D: 02        ???
  $B50E: 8B 04     XAA #$04
  $B510: 14 02     NOP $02,X
  $B512: 04 01     NOP $01
  $B514: 88        DEY
  $B515: 02        ???
  $B516: 8A        TXA
  $B517: 05 A8     ORA $a8
  $B519: 06 AA     ASL $aa
  $B51B: 03 02     SLO ($02,X)
  $B51D: 01 89     ORA ($89,X)
  $B51F: 06 AB     ASL $ab
  $B521: 04 03     NOP $03
  $B523: 01 8C     ORA ($8c,X)
  $B525: 02        ???
  $B526: 35 06     AND $06,X
  $B528: AE 05 03  LDX $0305
  $B52B: 02        ???
  $B52C: 8F 04 A7  SAX $a704
  $B52F: 05 AD     ORA $ad
  $B531: E0 04     CPX #$04
  $B533: 03 01     SLO ($01,X)
  $B535: 65 DB     ADC $db
  $B537: E0 04     CPX #$04
  $B539: 03 01     SLO ($01,X)
  $B53B: 65 F8     ADC $f8
  $B53D: E0 04     CPX #$04
  $B53F: 02        ???
  $B540: 01 03     ORA ($03,X)
  $B542: E5 03     SBC $03
  $B544: 02        ???
  $B545: 03 F0     SLO ($f0,X)
  $B547: 04 F2     NOP $f2
  $B549: 04 01     NOP $01
  $B54B: 03 F1     SLO ($f1,X)
  $B54D: 02        ???
  $B54E: 02        ???
  $B54F: 64 E7     NOP $e7
  $B551: 05 ED     ORA $ed
  $B553: 04 02     NOP $02
  $B555: 64 F3     NOP $f3
  $B557: 05 F9     ORA $f9
  $B559: 01 02     ORA ($02,X)
  $B55B: 02        ???
  $B55C: CE 03 E4  DEC $e403
  $B55F: 02        ???
  $B560: 03 01     SLO ($01,X)
  $B562: CD 02 CF  CMP $cf02
  $B565: 26 EF     ROL $ef
  $B567: 03 03     SLO ($03,X)
  $B569: 01 D8     ORA ($d8,X)
  $B56B: 02        ???
  $B56C: FF 06 FA  ISB $fa06,X
  $B56F: 04 03     NOP $03
  $B571: 01 D9     ORA ($d9,X)
  $B573: 02        ???
  $B574: FF 26 FB  ISB $fb26,X
  $B577: 05 06     ORA $06
  $B579: 01 DC     ORA ($dc,X)
  $B57B: 02        ???
  $B57C: DE 03 FF  DEC $ff03,X
  $B57F: 04 F6     NOP $f6
  $B581: 05 FC     ORA $fc
  $B583: 26 FE     ROL $fe
  $B585: 06 04     ASL $04
  $B587: 02        ???
  $B588: DF 03 F5  DCP $f503,X
  $B58B: 04 F7     NOP $f7
  $B58D: 05 FD     ORA $fd
  $B58F: E0 0E     CPX #$0e
  $B591: 03 01     SLO ($01,X)
  $B593: 65 97     ADC $97
  $B595: E0 0E     CPX #$0e
  $B597: 03 01     SLO ($01,X)
  $B599: 65 ED     ADC $ed
  $B59B: E0 0E     CPX #$0e
  $B59D: 01 05     ORA ($05,X)
  $B59F: 62        ???
  $B5A0: AE 63 E1  LDX $e163
  $B5A3: 64 E3     NOP $e3
  $B5A5: 65 E9     ADC $e9
  $B5A7: 26 EB     ROL $eb
  $B5A9: 02        ???
  $B5AA: 06 61     ASL $61
  $B5AC: A9 62     LDA #$62
  $B5AE: FF 63 E4  ISB $e463,X
  $B5B1: 64 E6     NOP $e6
  $B5B3: 65 EC     ADC $ec
  $B5B5: 26 EE     ROL $ee
  $B5B7: 03 05     SLO ($05,X)
  $B5B9: 61 AC     ADC ($ac,X)
  $B5BB: 62        ???
  $B5BC: AF 63 E5  LAX $e563
  $B5BF: 64 E7     NOP $e7
  $B5C1: 26 EF     ROL $ef
  $B5C3: 04 06     NOP $06
  $B5C5: 61 AD     ADC ($ad,X)
  $B5C7: 62        ???
  $B5C8: FF 63 F0  ISB $f063,X
  $B5CB: 64 F2     NOP $f2
  $B5CD: 65 F8     ADC $f8
  $B5CF: 66 FA     ROR $fa
  $B5D1: 05 06     ORA $06
  $B5D3: 61 B8     ADC ($b8,X)
  $B5D5: 62        ???
  $B5D6: FF 63 F1  ISB $f163,X
  $B5D9: 64 F3     NOP $f3
  $B5DB: 65 FF     ADC $ff
  $B5DD: 26 FB     ROL $fb
  $B5DF: 06 05     ASL $05
  $B5E1: 62        ???
  $B5E2: BA        TSX
  $B5E3: 63 F4     RRA ($f4,X)
  $B5E5: 64 F6     NOP $f6
  $B5E7: 65 FC     ADC $fc
  $B5E9: 66 F9     ROR $f9
  $B5EB: E0 00     CPX #$00
  $B5ED: 08        PHP
  $B5EE: 01 0D     ORA ($0d,X)
  $B5F0: CD 0A 01  CMP $010a
  $B5F3: 0D CB E0  ORA $e0cb
  $B5F6: 00        BRK
  $B5F7: 0B 02     ANC #$02
  $B5F9: 2E DD 2F  ROL $2fdd
  $B5FC: DF 0C 01  DCP $010c,X
  $B5FF: 2F EE E0  RLA $e0ee
  $B602: 00        BRK
  $B603: 0B 02     ANC #$02
  $B605: 2E BA 2F  ROL $2fba
  $B608: 22        ???
  $B609: 0C 01 2F  NOP $2f01
  $B60C: D3 E0     DCP ($e0),Y
  $B60E: 14 04     NOP $04,X
  $B610: 01 04     ORA ($04,X)
  $B612: A7 E0     LAX $e0
  $B614: 0E 03 01  ASL $0103
  $B617: 65 19     ADC $19
  $B619: E0 0E     CPX #$0e
  $B61B: 03 01     SLO ($01,X)
  $B61D: 65 60     ADC $60
  $B61F: E0 0E     CPX #$0e
  $B621: 01 03     ORA ($03,X)
  $B623: 02        ???
  $B624: 02        ???
  $B625: 03 11     SLO ($11,X)
  $B627: 04 13     NOP $13
  $B629: 02        ???
  $B62A: 06 01     ASL $01
  $B62C: 01 02     ORA ($02,X)
  $B62E: 03 63     SLO ($63,X)
  $B630: 14 64     NOP $64,X
  $B632: 16 05     ASL $05,X
  $B634: 1C 26 0B  NOP $0b26,X
  $B637: 03 05     SLO ($05,X)
  $B639: 01 04     ORA ($04,X)
  $B63B: 02        ???
  $B63C: 06 03     ASL $03
  $B63E: 15 04     ORA $04,X
  $B640: 4A        LSR A
  $B641: 06 20     ASL $20
  $B643: 04 06     NOP $06
  $B645: 01 05     ORA ($05,X)
  $B647: 02        ???
  $B648: 07 63     SLO $63
  $B64A: 0D 04 4B  ORA $4b04
  $B64D: 05 61     ORA $61
  $B64F: 06 35     ASL $35
  $B651: 05 05     ORA $05
  $B653: 01 10     ORA ($10,X)
  $B655: 02        ???
  $B656: 12        ???
  $B657: 03 18     SLO ($18,X)
  $B659: 04 4E     NOP $4e
  $B65B: 05 64     ORA $64
  $B65D: E0 0E     CPX #$0e
  $B65F: 03 01     SLO ($01,X)
  $B661: 65 65     ADC $65
  $B663: E0 0E     CPX #$0e
  $B665: 03 01     SLO ($01,X)
  $B667: 65 5D     ADC $5d
  $B669: E0 0E     CPX #$0e
  $B66B: 01 03     ORA ($03,X)
  $B66D: 02        ???
  $B66E: 36 03     ROL $03,X
  $B670: 3C 04 3E  NOP $3e04,X
  $B673: 02        ???
  $B674: 05 02     ORA $02
  $B676: 37 03     RLA $03,X
  $B678: 3D 64 3F  AND $3f64,X
  $B67B: 05 5C     ORA $5c
  $B67D: 26 89     ROL $89
  $B67F: 03 05     SLO ($05,X)
  $B681: 01 62     ORA ($62,X)
  $B683: 02        ???
  $B684: FF 03 68  ISB $6803,X
  $B687: 04 6A     NOP $6a
  $B689: 06 8C     ASL $8c
  $B68B: 04 06     NOP $06
  $B68D: 01 47     ORA ($47,X)
  $B68F: 02        ???
  $B690: FF 03 3A  ISB $3a03,X
  $B693: 64 90     NOP $90
  $B695: 05 5F     ORA $5f
  $B697: 26 8D     ROL $8d
  $B699: 05 05     ORA $05
  $B69B: 02        ???
  $B69C: 4D 03 3B  EOR $3b03
  $B69F: 04 4F     NOP $4f
  $B6A1: 05 75     ORA $75
  $B6A3: 26 8B     ROL $8b
  $B6A5: E0 14     CPX #$14
  $B6A7: 01 02     ORA ($02,X)
  $B6A9: 23 F2     RLA ($f2,X)
  $B6AB: 24 F4     BIT $f4
  $B6AD: 02        ???
  $B6AE: 02        ???
  $B6AF: 23 F3     RLA ($f3,X)
  $B6B1: 24 F5     BIT $f5
  $B6B3: 03 03     SLO ($03,X)
  $B6B5: 22        ???
  $B6B6: FE 23 F6  INC $f623,X
  $B6B9: 24 F8     BIT $f8
  $B6BB: 04 02     NOP $02
  $B6BD: 23 F7     RLA ($f7,X)
  $B6BF: 24 F9     BIT $f9
  $B6C1: 05 02     ORA $02
  $B6C3: 23 FA     RLA ($fa,X)
  $B6C5: 24 FC     BIT $fc
  $B6C7: 06 02     ASL $02
  $B6C9: 23 FB     RLA ($fb,X)
  $B6CB: 24 FD     BIT $fd
  $B6CD: E0 05     CPX #$05
  $B6CF: 01 05     ORA ($05,X)
  $B6D1: 41 8F     EOR ($8f,X)
  $B6D3: 42        ???
  $B6D4: A5 43     LDA $43
  $B6D6: A7 44     LAX $44
  $B6D8: AD 45 AF  LDA $af45
  $B6DB: 02        ???
  $B6DC: 05 41     ORA $41
  $B6DE: 9A        TXS
  $B6DF: 42        ???
  $B6E0: B0 43     BCS $b725
  $B6E2: B2        ???
  $B6E3: 44 B8     NOP $b8
  $B6E5: 45 BA     EOR $ba
  $B6E7: 03 05     SLO ($05,X)
  $B6E9: 41 9B     EOR ($9b,X)
  $B6EB: 42        ???
  $B6EC: B1 43     LDA ($43),Y
  $B6EE: B3 C4     LAX ($c4),Y
  $B6F0: AD C5 AF  LDA $afc5
  $B6F3: 04 05     NOP $05
  $B6F5: 41 8A     EOR ($8a,X)
  $B6F7: 42        ???
  $B6F8: A0 43     LDY #$43
  $B6FA: A2 44     LDX #$44
  $B6FC: A8        TAY
  $B6FD: 45 AA     EOR $aa
  $B6FF: 05 05     ORA $05
  $B701: 41 8B     EOR ($8b,X)
  $B703: 42        ???
  $B704: A1 43     LDA ($43,X)
  $B706: A3 44     LAX ($44,X)
  $B708: A9 45     LDA #$45
  $B70A: AB 06     ATX #$06
  $B70C: 05 41     ORA $41
  $B70E: 8E 42 A4  STX $a442
  $B711: 43 A6     SRE ($a6,X)
  $B713: C4 A8     CPY $a8
  $B715: C5 AA     CMP $aa
  $B717: E0 00     CPX #$00
  $B719: 01 03     ORA ($03,X)
  $B71B: 04 06     NOP $06
  $B71D: 07 09     SLO $09
  $B71F: 0A        ASL A
  $B720: 0D 0E 10  ORA $100e
  $B723: 11 14     ORA ($14),Y
  $B725: 15 18     ORA $18,X
  $B727: 19 18 1B  ORA $1b18,Y
  $B72A: 1D 1E 18  ORA $181e,X
  $B72D: 20 22 23  JSR $2322
  $B730: 25 26     AND $26
  $B732: 28        PLP
  $B733: 29 2C     AND #$2c
  $B735: 2D 2F 30  AND $302f
  $B738: 34 35     NOP $35,X
  $B73A: 37 38     RLA $38,X
  $B73C: 3A        NOP
  $B73D: 3B 00 01  RLA $0100,Y
  $B740: 02        ???
  $B741: 03 04     SLO ($04,X)
  $B743: 13 0A     SLO ($0a),Y
  $B745: 0D 0B 0C  ORA $0c0b
  $B748: 05 00     ORA $00
  $B74A: 01 02     ORA ($02,X)
  $B74C: 03 04     SLO ($04,X)
  $B74E: 01 03     ORA ($03,X)
  $B750: 00        BRK
  $B751: 13 13     SLO ($13),Y
  $B753: 0B 0D     ANC #$0d
  $B755: 0C 0A 13  NOP $130a
  $B758: 13 01     SLO ($01),Y
  $B75A: 13 05     SLO ($05),Y
  $B75C: 82 04     NOP #$04
  $B75E: 05 01     ORA $01
  $B760: 82 02     NOP #$02
  $B762: 21 0A     AND ($0a,X)
  $B764: 83 05     SAX ($05,X)
  $B766: 0B 03     ANC #$03
  $B768: 82 03     NOP #$03
  $B76A: 08        PHP
  $B76B: 02        ???
  $B76C: 84 18     STY $18
  $B76E: 24 0B     BIT $0b
  $B770: 8B 0E     XAA #$0e
  $B772: 2A        ROL A
  $B773: 0D 85 0F  ORA $0f85
  $B776: 2E 0E 86  ROL $860e
  $B779: 11 27     ORA ($27),Y
  $B77B: 0C 87 13  NOP $1387
  $B77E: 0F 04 88  SLO $8804
  $B781: 14 1A     NOP $1a,X
  $B783: 07 89     SLO $89
  $B785: 1A        NOP
  $B786: 1F 09 93  SLO $9309,X
  $B789: 16 31     ASL $31,X
  $B78B: 0F 92 19  SLO $1992
  $B78E: 0C 01 8C  NOP $8c01
  $B791: 20 1C 08  JSR $081c
  $B794: 90 1C     BCC $b7b2
  $B796: 21 0A     AND ($0a,X)
  $B798: 8E 1F 2B  STX $2b1f
  $B79B: 0D 94 1E  ORA $1e94
  $B79E: 05 01     ORA $01
  $B7A0: 8F 22 16  SAX $1622
  $B7A3: 06 91     ASL $91
  $B7A5: 01 13     ORA ($13,X)
  $B7A7: 05 8A     ORA $8a
  $B7A9: 5D 02 00  EOR $0002,X
  $B7AC: 80 5F     NOP #$5f
  $B7AE: 39 11 88  AND $8811,Y
  $B7B1: 5E 3C 12  LSR $123c,X
  $B7B4: 88        DEY
  $B7B5: 01 12     ORA ($12,X)
  $B7B7: FF 81 00  ISB $0081,X
  $B7BA: 33 10     RLA ($10),Y
  $B7BC: 95 15     STA $15,X
  $B7BE: 30 36     BMI $b7f6
  $B7C0: 0F 0F 0F  SLO $0f0f
  $B7C3: 0F 30 0F  SLO $0f30
  $B7C6: 0F 0F 0F  SLO $0f0f
  $B7C9: 0F 36 30  SLO $3036
  $B7CC: 0F 30 2C  SLO $2c30
  $B7CF: 0F 36 30  SLO $3036
  $B7D2: 0F 0F 0F  SLO $0f0f
  $B7D5: 0F 0F 36  SLO $360f
  $B7D8: 0F 30 36  SLO $3630
  $B7DB: 0F 0F 36  SLO $360f
  $B7DE: 0F 30 36  SLO $3630
  $B7E1: 0F 00 36  SLO $3600
  $B7E4: 0F 30 36  SLO $3630
  $B7E7: 0F 0F 36  SLO $360f
  $B7EA: 0F 30 36  SLO $3630
  $B7ED: 0F 07 36  SLO $3607
  $B7F0: 0F 30 36  SLO $3630
  $B7F3: 0F 0F 36  SLO $360f
  $B7F6: 0F 30 36  SLO $3630
  $B7F9: 0F 07 36  SLO $3607
  $B7FC: 0F 12 36  SLO $3612
  $B7FF: 0F 0F 36  SLO $360f
  $B802: 0F 30 36  SLO $3630
  $B805: 0F 0F 36  SLO $360f
  $B808: 0F 19 36  SLO $3619
  $B80B: 0F 0F 36  SLO $360f
  $B80E: 0F 30 36  SLO $3630
  $B811: 0F 00 36  SLO $3600
  $B814: 0F 16 36  SLO $3616
  $B817: 0F 0F 36  SLO $360f
  $B81A: 0F 30 36  SLO $3630
  $B81D: 0F 00 36  SLO $3600
  $B820: 0F 37 36  SLO $3637
  $B823: 0F 0F 36  SLO $360f
  $B826: 0F 30 36  SLO $3630
  $B829: 0F 0F 36  SLO $360f
  $B82C: 0F 00 36  SLO $3600
  $B82F: 0F 0F 36  SLO $360f
  $B832: 0F 30 36  SLO $3630
  $B835: 0F 0F 36  SLO $360f
  $B838: 0F 11 36  SLO $3611
  $B83B: 0F 0F 36  SLO $360f
  $B83E: 0F 30 36  SLO $3630
  $B841: 0F 07 36  SLO $3607
  $B844: 0F 11 36  SLO $3611
  $B847: 0F 0F 36  SLO $360f
  $B84A: 0F 30 36  SLO $3630
  $B84D: 0F 15 36  SLO $3615
  $B850: 0F 11 36  SLO $3611
  $B853: 0F 0F 36  SLO $360f
  $B856: 0F 30 36  SLO $3630
  $B859: 0F 00 36  SLO $3600
  $B85C: 0F 11 36  SLO $3611
  $B85F: 0F 0F 36  SLO $360f
  $B862: 0F 30 36  SLO $3630
  $B865: 0F 16 35  SLO $3516
  $B868: 0F 31 35  SLO $3531
  $B86B: 0F 0F 35  SLO $350f
  $B86E: 0F 30 35  SLO $3530
  $B871: 0F 0F 26  SLO $260f
  $B874: 0F 31 26  SLO $2631
  $B877: 0F 21 26  SLO $2621
  $B87A: 0F 30 26  SLO $2630
  $B87D: 0F 37 35  SLO $3537
  $B880: 0F 23 35  SLO $3523
  $B883: 0F 19 35  SLO $3519
  $B886: 0F 30 35  SLO $3530
  $B889: 0F 37 35  SLO $3537
  $B88C: 0F 30 35  SLO $3530
  $B88F: 0F 21 35  SLO $3521
  $B892: 0F 30 35  SLO $3530
  $B895: 0F 19 36  SLO $3619
  $B898: 0F 19 36  SLO $3619
  $B89B: 0F 0F 36  SLO $360f
  $B89E: 0F 30 36  SLO $3630
  $B8A1: 0F 30 36  SLO $3630
  $B8A4: 0F 21 36  SLO $3621
  $B8A7: 0F 0F 36  SLO $360f
  $B8AA: 0F 30 36  SLO $3630
  $B8AD: 0F 37 35  SLO $3537
  $B8B0: 0F 10 35  SLO $3510
  $B8B3: 0F 21 35  SLO $3521
  $B8B6: 0F 30 35  SLO $3530
  $B8B9: 11 30     ORA ($30),Y
  $B8BB: 36 36     ROL $36,X
  $B8BD: 25 30     AND $30
  $B8BF: 0F 0F 0F  SLO $0f0f
  $B8C2: 25 30     AND $30
  $B8C4: 22        ???
  $B8C5: 0F 30 0F  SLO $0f30
  $B8C8: 22        ???
  $B8C9: 30 25     BMI $b8f0
  $B8CB: 0F 30 36  SLO $3630
  $B8CE: 0F 3A 0F  SLO $0f3a
  $B8D1: 3E F7 43  ROL $43f7,X
  $B8D4: F7 BD     ISB $bd,X
  $B8D6: F7 C8     ISB $c8,X
  $B8D8: FD 2B FA  SBC $fa2b,X
  $B8DB: 02        ???
  $B8DC: 03 04     SLO ($04,X)
  $B8DE: 02        ???
  $B8DF: 01 05     ORA ($05,X)
  $B8E1: 06 01     ASL $01
  $B8E3: 01 07     ORA ($07,X)
  $B8E5: 08        PHP
  $B8E6: 01 02     ORA ($02,X)
  $B8E8: 02        ???
  $B8E9: 02        ???
  $B8EA: 02        ???
  $B8EB: 01 01     ORA ($01,X)
  $B8ED: 01 01     ORA ($01,X)
  $B8EF: 00        BRK
  $B8F0: 00        BRK
  $B8F1: 00        BRK
  $B8F2: 00        BRK
  $B8F3: 00        BRK
  $B8F4: 09 0A     ORA #$0a
  $B8F6: 00        BRK
  $B8F7: 00        BRK
  $B8F8: 0B 0C     ANC #$0c
  $B8FA: 00        BRK
  $B8FB: 00        BRK
  $B8FC: 0D 0E 00  ORA $000e
  $B8FF: 0F 10 11  SLO $1110
  $B902: 12        ???
  $B903: 13 14     SLO ($14),Y
  $B905: 15 16     ORA $16,X
  $B907: 17 18     SLO $18,X
  $B909: 19 1A 0F  ORA $0f1a,Y
  $B90C: 1B 1C 12  SLO $121c,Y
  $B90F: 13 14     SLO ($14),Y
  $B911: 15 16     ORA $16,X
  $B913: 17 1D     SLO $1d,X
  $B915: 1E 1A 1F  ASL $1f1a,X
  $B918: 20 21 22  JSR $2221
  $B91B: 23 24     RLA ($24,X)
  $B91D: 25 26     AND $26
  $B91F: 27 28     RLA $28
  $B921: 29 2A     AND #$2a
  $B923: 2B 2C     ANC #$2c
  $B925: 2D 2E 2F  AND $2f2e
  $B928: 30 59     BMI $b983
  $B92A: 31 32     AND ($32),Y
  $B92C: 33 28     RLA ($28),Y
  $B92E: 34 35     NOP $35,X
  $B930: 36 37     ROL $37,X
  $B932: 38        SEC
  $B933: 39 3A 3B  AND $3b3a,Y
  $B936: 3C 27 28  NOP $2827,X
  $B939: 29 2A     AND #$2a
  $B93B: 3D 3E 36  AND $363e,X
  $B93E: 3F 40 41  RLA $4140,X
  $B941: 3A        NOP
  $B942: 42        ???
  $B943: 32        ???
  $B944: 33 28     RLA ($28),Y
  $B946: 34 1F     NOP $1f,X
  $B948: 20 21 22  JSR $2221
  $B94B: 23 43     RLA ($43,X)
  $B94D: 44 45     NOP $45
  $B94F: 27 46     RLA $46
  $B951: 2A        ROL A
  $B952: 32        ???
  $B953: 2B 2C     ANC #$2c
  $B955: 2D 2E 47  AND $472e
  $B958: 48        PHA
  $B959: 49 49     EOR #$49
  $B95B: 33 4A     RLA ($4a),Y
  $B95D: 4B 4B     ALR #$4b
  $B95F: 35 4C     AND $4c,X
  $B961: 38        SEC
  $B962: 3D 39 4D  AND $4d39,X
  $B965: 3C 40 27  NOP $2740,X
  $B968: 4E 4F 50  LSR $504f
  $B96B: 3E 51 52  ROL $5251,X
  $B96E: 53 41     SRE ($41),Y
  $B970: 54 55     NOP $55,X
  $B972: 56 57     LSR $57,X
  $B974: 58        CLI
  $B975: 00        BRK
  $B976: 00        BRK
  $B977: 00        BRK
  $B978: 00        BRK
  $B979: 01 01     ORA ($01,X)
  $B97B: 00        BRK
  $B97C: 01 00     ORA ($00,X)
  $B97E: 02        ???
  $B97F: 00        BRK
  $B980: 04 03     NOP $03
  $B982: 06 05     ASL $05
  $B984: 08        PHP
  $B985: 07 0A     SLO $0a
  $B987: 09 0B     ORA #$0b
  $B989: 0C 0D 01  NOP $010d
  $B98C: 0E 0F 10  ASL $100f
  $B98F: 11 12     ORA ($12),Y
  $B991: 13 00     SLO ($00),Y
  $B993: 14 00     NOP $00,X
  $B995: 15 16     ORA $16,X
  $B997: 17 18     SLO $18,X
  $B999: 19 1A 1B  ORA $1b1a,Y
  $B99C: 1C 1D 1E  NOP $1e1d,X
  $B99F: 1F 20 21  SLO $2120,X
  $B9A2: 22        ???
  $B9A3: 23 24     RLA ($24,X)
  $B9A5: 25 26     AND $26
  $B9A7: 27 28     RLA $28
  $B9A9: 29 2A     AND #$2a
  $B9AB: 2B 2C     ANC #$2c
  $B9AD: 17 2D     SLO $2d,X
  $B9AF: 19 2E 27  ORA $272e,Y
  $B9B2: 2F 29 30  RLA $3029
  $B9B5: 47 48     SRE $48
  $B9B7: 6A        ROR A
  $B9B8: 49 4A     EOR #$4a
  $B9BA: 4B 4A     ALR #$4a
  $B9BC: 4C 31 6B  JMP $6b31
  $B9BF: 32        ???
  $B9C0: 6E 32 37  ROR $3732
  $B9C3: 32        ???
  $B9C4: 39 34 3B  AND $3b34,Y
  $B9C7: 36 3C     ROL $3c,X
  $B9C9: 38        SEC
  $B9CA: 3D 3A 3E  AND $3e3a,X
  $B9CD: 4A        LSR A
  $B9CE: 49 4A     EOR #$4a
  $B9D0: 4D 4A 4E  EOR $4e4a
  $B9D3: 4F 50 32  SRE $3250
  $B9D6: 00        BRK
  $B9D7: 32        ???
  $B9D8: 40        RTI
  $B9D9: 3F 41 42  RLA $4241,X
  $B9DC: 32        ???
  $B9DD: 43 45     SRE ($45,X)
  $B9DF: 44 46     NOP $46
  $B9E1: 33 34     RLA ($34),Y
  $B9E3: 35 36     AND $36,X
  $B9E5: 37 38     RLA $38,X
  $B9E7: 39 3A 3B  AND $3b3a,Y
  $B9EA: 33 3C     RLA ($3c),Y
  $B9EC: 35 3D     AND $3d,X
  $B9EE: 37 3E     RLA $3e,X
  $B9F0: 39 00 42  AND $4200,Y
  $B9F3: 40        RTI
  $B9F4: 43 41     SRE ($41,X)
  $B9F6: 44 32     NOP $32
  $B9F8: 00        BRK
  $B9F9: 45 40     EOR $40
  $B9FB: 46 41     LSR $41
  $B9FD: 51 52     EOR ($52),Y
  $B9FF: 53 54     SRE ($54),Y
  $BA01: 55 56     EOR $56,X
  $BA03: 57 58     SRE $58,X
  $BA05: 59 5A 5B  EOR $5b5a,Y
  $BA08: 5C 5D 5E  NOP $5e5d,X
  $BA0B: 5F 60 5E  SRE $5e60,X
  $BA0E: 5E 6C 57  LSR $576c,X
  $BA11: 58        CLI
  $BA12: 6C 57 61  JMP ($6157)
  $BA15: 3A        NOP
  $BA16: 62        ???
  $BA17: 42        ???
  $BA18: 62        ???
  $BA19: 6D 5F 63  ADC $635f
  $BA1C: 64 65     NOP $65
  $BA1E: 66 60     ROR $60
  $BA20: 6D 67 00  ADC $0067
  $BA23: 68        PLA
  $BA24: 00        BRK
  $BA25: 43 62     SRE ($62,X)
  $BA27: 5F 69 32  SRE $3269,X
  $BA2A: 35 00     AND $00,X
  $BA2C: 00        BRK
  $BA2D: 00        BRK
  $BA2E: 00        BRK
  $BA2F: 00        BRK
  $BA30: 00        BRK
  $BA31: 00        BRK
  $BA32: 00        BRK
  $BA33: FF FF FF  ISB $ffff,X
  $BA36: FF FF FF  ISB $ffff,X
  $BA39: FF FF FF  ISB $ffff,X
  $BA3C: FF FF FF  ISB $ffff,X
  $BA3F: FF FF 71  ISB $71ff,X
  $BA42: D3 FF     DCP ($ff),Y
  $BA44: 73 FF     RRA ($ff),Y
  $BA46: 74 FF     NOP $ff,X
  $BA48: 77 78     RRA $78,X
  $BA4A: 79 FF FF  ADC $ffff,Y
  $BA4D: FF FF D4  ISB $d4ff,X
  $BA50: 72        ???
  $BA51: FF FF FF  ISB $ffff,X
  $BA54: 75 76     ADC $76,X
  $BA56: FF 7A 7B  ISB $7b7a,X
  $BA59: 7C FF FF  NOP $ffff,X
  $BA5C: 7D 7E 7F  ADC $7f7e,X
  $BA5F: FF 83 84  ISB $8483,X
  $BA62: 00        BRK
  $BA63: FF FF 89  ISB $89ff,X
  $BA66: 00        BRK
  $BA67: FF FF 8E  ISB $8eff,X
  $BA6A: 8F 80 81  SAX $8180
  $BA6D: 82 FF     NOP #$ff
  $BA6F: 86 87     STX $87
  $BA71: 88        DEY
  $BA72: FF 8B 8C  ISB $8c8b,X
  $BA75: 8D FF 90  STA $90ff
  $BA78: 91 92     STA ($92),Y
  $BA7A: FF FF 93  ISB $93ff,X
  $BA7D: 94 95     STY $95,X
  $BA7F: 9A        TXS
  $BA80: 9B 9C 9D  TAS $9d9c,Y
  $BA83: 96 97     STX $97,Y
  $BA85: 98        TYA
  $BA86: 99 9E 9F  STA $9f9e,Y
  $BA89: A0 A1     LDY #$a1
  $BA8B: FF FF 6D  ISB $6dff,X
  $BA8E: 88        DEY
  $BA8F: FF FF 6D  ISB $6dff,X
  $BA92: 8A        TXA
  $BA93: D1 D6     CMP ($d6),Y
  $BA95: 6D A0 D3  ADC $d3a0
  $BA98: DC 87 A2  NOP $a287,X
  $BA9B: 89 8C     NOP #$8c
  $BA9D: 8D FF 8B  STA $8bff
  $BAA0: 8E 8F 9A  STX $9a8f
  $BAA3: D9 3A 3A  CMP $3a3a,Y
  $BAA6: A8        TAY
  $BAA7: FF DA 3A  ISB $3ada,X
  $BAAA: AA        TAX
  $BAAB: FF E5 3A  ISB $3ae5,X
  $BAAE: 3A        NOP
  $BAAF: FF FF 3A  ISB $3aff,X
  $BAB2: 3A        NOP
  $BAB3: A1 A4     LDA ($a4,X)
  $BAB5: A5 B0     LDA $b0
  $BAB7: A3 A6     LAX ($a6,X)
  $BAB9: FF B2 A9  ISB $a9b2,X
  $BABC: AC AD FF  LDY $ffad
  $BABF: AB AE     ATX #$ae
  $BAC1: FF FF FF  ISB $ffff,X
  $BAC4: FF 3A 3A  ISB $3a3a,X
  $BAC7: FF EF 3A  ISB $3aef,X
  $BACA: 3A        NOP
  $BACB: 3A        NOP
  $BACC: 3A        NOP
  $BACD: A7 FF     LAX $ff
  $BACF: 3A        NOP
  $BAD0: 3A        NOP
  $BAD1: AF FF 80  LAX $80ff
  $BAD4: 94 FF     STY $ff,X
  $BAD6: FF C5 94  ISB $94c5,X
  $BAD9: FF 90 C5  ISB $c590,X
  $BADC: 94 FF     STY $ff,X
  $BADE: 92        ???
  $BADF: 80 94     NOP #$94
  $BAE1: FF 98 FF  ISB $ff98,X
  $BAE4: FF FF FF  ISB $ffff,X
  $BAE7: 91 FF     STA ($ff),Y
  $BAE9: 82 8A     NOP #$8a
  $BAEB: 93 FF     ??? ($ff),Y
  $BAED: 88        DEY
  $BAEE: A5 99     LDA $99
  $BAF0: FF FF A7  ISB $a7ff,X
  $BAF3: FF FF FF  ISB $ffff,X
  $BAF6: FF 8B 8E  ISB $8e8b,X
  $BAF9: FF FF B0  ISB $b0ff,X
  $BAFC: B1 FF     LDA ($ff),Y
  $BAFE: FF B2 B3  ISB $b3b2,X
  $BB01: FF 81 FF  ISB $ff81,X
  $BB04: FF FF FF  ISB $ffff,X
  $BB07: 90 91     BCC $ba9a
  $BB09: FF FF 92  ISB $92ff,X
  $BB0C: 93 FF     ??? ($ff),Y
  $BB0E: FF 98 99  ISB $9998,X
  $BB11: FF FF C5  ISB $c5ff,X
  $BB14: 94 FF     STY $ff,X
  $BB16: FF 80 94  ISB $9480,X
  $BB19: FF FF 97  ISB $97ff,X
  $BB1C: 96 95     STX $95,Y
  $BB1E: 95 C5     STA $c5,X
  $BB20: 9E 9F B4  SHX $b49f,Y
  $BB23: FF FF FF  ISB $ffff,X
  $BB26: A8        TAY
  $BB27: FF C0 C1  ISB $c1c0,X
  $BB2A: AA        TAX
  $BB2B: 95 C2     STA $c2,X
  $BB2D: 7E 7E B5  ROR $b57e,X
  $BB30: C8        INY
  $BB31: C9 CC     CMP #$cc
  $BB33: A9 AC     LDA #$ac
  $BB35: FF FF AB  ISB $abff,X
  $BB38: AE C4 83  LDX $83c4
  $BB3B: C3 7E     DCP ($7e,X)
  $BB3D: 7E C7 9B  ROR $9bc7,X
  $BB40: 7E 7E C6  ROR $c67e,X
  $BB43: 81 FF     STA ($ff,X)
  $BB45: FF FF FF  ISB $ffff,X
  $BB48: FF FF FF  ISB $ffff,X
  $BB4B: 95 95     STA $95,X
  $BB4D: 95 95     STA $95,X
  $BB4F: CD D2 D8  CMP $d8d2
  $BB52: C5 97     CMP $97
  $BB54: AD B8 B9  LDA $b9b8
  $BB57: B7 5F     LAX $5f,Y
  $BB59: 86 87     STX $87
  $BB5B: 80 BD     NOP #$bd
  $BB5D: 8C 8D BC  STY $bc8d
  $BB60: BE 7E BF  LDX $bf7e,Y
  $BB63: B6 CA     LDX $ca,Y
  $BB65: CB 5F     AXS #$5f
  $BB67: DA        NOP
  $BB68: 84 85     STY $85
  $BB6A: 5F C5 C5  SRE $c5c5,X
  $BB6D: AF BA E0  LAX $e0ba
  $BB70: E1 E4     SBC ($e4,X)
  $BB72: 7E 5F 7E  ROR $7e5f,X
  $BB75: 7E CF 5F  ROR $5fcf,X
  $BB78: 7E CE E5  ROR $e5ce,X
  $BB7B: BB 7E CE  LAS $ce7e,Y
  $BB7E: DB E2 E3  DCP $e3e2,Y
  $BB81: DF E4 5F  DCP $5fe4,X
  $BB84: 5F D3 97  SRE $97d3,X
  $BB87: 5F 5F D9  SRE $d95f,X
  $BB8A: C5 DE     CMP $de
  $BB8C: 89 C5     NOP #$c5
  $BB8E: C5 97     CMP $97
  $BB90: 97 9C     SAX $9c,Y
  $BB92: 9D 93 FF  STA $ff93,X
  $BB95: 88        DEY
  $BB96: A0 99     LDY #$99
  $BB98: FF FF A2  ISB $a2ff,X
  $BB9B: A1 A4     LDA ($a4,X)
  $BB9D: FF FF A3  ISB $a3ff,X
  $BBA0: A6 FF     LDX $ff
  $BBA2: 81 C5     STA ($c5,X)
  $BBA4: C5 55     CMP $55
  $BBA6: BA        TSX
  $BBA7: E0 E1     CPX #$e1
  $BBA9: E4 7E     CPX $7e
  $BBAB: 57 FF     SRE $ff,X
  $BBAD: 5D DB E2  EOR $e2db,X
  $BBB0: 8F 9A E4  SAX $e49a
  $BBB3: 00        BRK
  $BBB4: 00        BRK
  $BBB5: 00        BRK
  $BBB6: 00        BRK
  $BBB7: 00        BRK
  $BBB8: E4 E4     CPX $e4
  $BBBA: E4 00     CPX $00
  $BBBC: 00        BRK
  $BBBD: 00        BRK
  $BBBE: 00        BRK
  $BBBF: E4 E4     CPX $e4
  $BBC1: E4 E4     CPX $e4
  $BBC3: 00        BRK
  $BBC4: E6 00     INC $00
  $BBC6: 00        BRK
  $BBC7: 00        BRK
  $BBC8: E6 00     INC $00
  $BBCA: 00        BRK
  $BBCB: 00        BRK
  $BBCC: EC E4 E4  CPX $e4e4
  $BBCF: 00        BRK
  $BBD0: E6 00     INC $00
  $BBD2: 00        BRK
  $BBD3: 00        BRK
  $BBD4: E7 00     ISB $00
  $BBD6: 00        BRK
  $BBD7: 00        BRK
  $BBD8: E7 00     ISB $00
  $BBDA: 00        BRK
  $BBDB: E4 ED     CPX $ed
  $BBDD: E4 E4     CPX $e4
  $BBDF: 00        BRK
  $BBE0: E7 00     ISB $00
  $BBE2: 00        BRK
  $BBE3: 00        BRK
  $BBE4: 00        BRK
  $BBE5: E7 00     ISB $00
  $BBE7: 00        BRK
  $BBE8: 00        BRK
  $BBE9: E7 00     ISB $00
  $BBEB: E4 E4     CPX $e4
  $BBED: ED E4 00  SBC $00e4
  $BBF0: 00        BRK
  $BBF1: E7 00     ISB $00
  $BBF3: 00        BRK
  $BBF4: 00        BRK
  $BBF5: 00        BRK
  $BBF6: E7 00     ISB $00
  $BBF8: 00        BRK
  $BBF9: 00        BRK
  $BBFA: E7 E4     ISB $e4
  $BBFC: E4 E4     CPX $e4
  $BBFE: ED 00 00  SBC $0000
  $BC01: 00        BRK
  $BC02: E7 00     ISB $00
  $BC04: E6 00     INC $00
  $BC06: 00        BRK
  $BC07: 00        BRK
  $BC08: EC E4 E4  CPX $e4e4
  $BC0B: 00        BRK
  $BC0C: E7 00     ISB $00
  $BC0E: 00        BRK
  $BC0F: E4 ED     CPX $ed
  $BC11: E4 E4     CPX $e4
  $BC13: 00        BRK
  $BC14: 00        BRK
  $BC15: E7 00     ISB $00
  $BC17: E4 E4     CPX $e4
  $BC19: ED E4 00  SBC $00e4
  $BC1C: 00        BRK
  $BC1D: 00        BRK
  $BC1E: E7 E4     ISB $e4
  $BC20: E4 E4     CPX $e4
  $BC22: ED 00 00  SBC $0000
  $BC25: 00        BRK
  $BC26: 00        BRK
  $BC27: E4 E4     CPX $e4
  $BC29: E4 00     CPX $00
  $BC2B: E7 00     ISB $00
  $BC2D: 00        BRK
  $BC2E: 00        BRK
  $BC2F: E7 00     ISB $00
  $BC31: 00        BRK
  $BC32: 00        BRK
  $BC33: 00        BRK
  $BC34: 00        BRK
  $BC35: E7 00     ISB $00
  $BC37: 00        BRK
  $BC38: 00        BRK
  $BC39: E7 00     ISB $00
  $BC3B: E4 E4     CPX $e4
  $BC3D: E4 E4     CPX $e4
  $BC3F: 00        BRK
  $BC40: 00        BRK
  $BC41: 00        BRK
  $BC42: 00        BRK
  $BC43: ED E4 E4  SBC $e4e4
  $BC46: E4 E7     CPX $e7
  $BC48: 00        BRK
  $BC49: 00        BRK
  $BC4A: 00        BRK
  $BC4B: E4 E4     CPX $e4
  $BC4D: ED 00 00  SBC $0000
  $BC50: 00        BRK
  $BC51: E7 00     ISB $00
  $BC53: E7 00     ISB $00
  $BC55: 00        BRK
  $BC56: 00        BRK
  $BC57: ED E4 E4  SBC $e4e4
  $BC5A: E4 00     CPX $00
  $BC5C: 00        BRK
  $BC5D: E7 00     ISB $00
  $BC5F: E4 E4     CPX $e4
  $BC61: ED 00 00  SBC $0000
  $BC64: 18        CLC
  $BC65: 04 00     NOP $00
  $BC67: 00        BRK
  $BC68: 06 00     ASL $00
  $BC6A: 00        BRK
  $BC6B: 00        BRK
  $BC6C: 06 65     ASL $65
  $BC6E: 6E 00 1A  ROR $1a00
  $BC71: 05 05     ORA $05
  $BC73: 00        BRK
  $BC74: 00        BRK
  $BC75: 00        BRK
  $BC76: 00        BRK
  $BC77: 05 05     ORA $05
  $BC79: 05 05     ORA $05
  $BC7B: 04 04     NOP $04
  $BC7D: 04 04     NOP $04
  $BC7F: 00        BRK
  $BC80: 00        BRK
  $BC81: 00        BRK
  $BC82: 00        BRK
  $BC83: 66 6E     ROR $6e
  $BC85: 00        BRK
  $BC86: 00        BRK
  $BC87: 05 05     ORA $05
  $BC89: 05 05     ORA $05
  $BC8B: 00        BRK
  $BC8C: 00        BRK
  $BC8D: 67 6E     RRA $6e
  $BC8F: 05 05     ORA $05
  $BC91: 05 05     ORA $05
  $BC93: 68        PLA
  $BC94: 6E 00 00  ROR $0000
  $BC97: 05 05     ORA $05
  $BC99: 05 05     ORA $05
  $BC9B: 00        BRK
  $BC9C: 00        BRK
  $BC9D: 69 6E     ADC #$6e
  $BC9F: 05 05     ORA $05
  $BCA1: 05 05     ORA $05
  $BCA3: 04 04     NOP $04
  $BCA5: 04 19     NOP $19
  $BCA7: 00        BRK
  $BCA8: 00        BRK
  $BCA9: 00        BRK
  $BCAA: 07 00     SLO $00
  $BCAC: 00        BRK
  $BCAD: 00        BRK
  $BCAE: 07 05     SLO $05
  $BCB0: 05 05     ORA $05
  $BCB2: 1B 00 00  SLO $0000,Y
  $BCB5: 00        BRK
  $BCB6: 00        BRK
  $BCB7: E4 E4     CPX $e4
  $BCB9: 18        CLC
  $BCBA: 04 00     NOP $00
  $BCBC: E7 06     ISB $06
  $BCBE: 00        BRK
  $BCBF: 98        TYA
  $BCC0: E7 06     ISB $06
  $BCC2: 2B 00     ANC #$00
  $BCC4: 00        BRK
  $BCC5: 00        BRK
  $BCC6: 00        BRK
  $BCC7: 00        BRK
  $BCC8: 84 81     STY $81
  $BCCA: 78        SEI
  $BCCB: 00        BRK
  $BCCC: 00        BRK
  $BCCD: 00        BRK
  $BCCE: 00        BRK
  $BCCF: 36 38     ROL $38,X
  $BCD1: 53 E7     SRE ($e7),Y
  $BCD3: 00        BRK
  $BCD4: 00        BRK
  $BCD5: 00        BRK
  $BCD6: 00        BRK
  $BCD7: 00        BRK
  $BCD8: 04 04     NOP $04
  $BCDA: 04 00     NOP $00
  $BCDC: 39 2D 31  AND $312d,Y
  $BCDF: 00        BRK
  $BCE0: 38        SEC
  $BCE1: 53 30     SRE ($30),Y
  $BCE3: E4 ED     CPX $ed
  $BCE5: 06 E4     ASL $e4
  $BCE7: 00        BRK
  $BCE8: E7 06     ISB $06
  $BCEA: 00        BRK
  $BCEB: 00        BRK
  $BCEC: E7 06     ISB $06
  $BCEE: 00        BRK
  $BCEF: E4 ED     CPX $ed
  $BCF1: 06 E4     ASL $e4
  $BCF3: 00        BRK
  $BCF4: 00        BRK
  $BCF5: 00        BRK
  $BCF6: 00        BRK
  $BCF7: 04 04     NOP $04
  $BCF9: 04 04     NOP $04
  $BCFB: 54 00     NOP $00,X
  $BCFD: 00        BRK
  $BCFE: 00        BRK
  $BCFF: E7 00     ISB $00
  $BD01: 39 2D 00  AND $002d,Y
  $BD04: 00        BRK
  $BD05: 00        BRK
  $BD06: 00        BRK
  $BD07: 04 04     NOP $04
  $BD09: 19 00 00  ORA $0000,Y
  $BD0C: 00        BRK
  $BD0D: 07 00     SLO $00
  $BD0F: 38        SEC
  $BD10: 53 07     SRE ($07),Y
  $BD12: 00        BRK
  $BD13: 00        BRK
  $BD14: 00        BRK
  $BD15: 00        BRK
  $BD16: 00        BRK
  $BD17: 02        ???
  $BD18: 02        ???
  $BD19: 02        ???
  $BD1A: 02        ???
  $BD1B: 02        ???
  $BD1C: 02        ???
  $BD1D: 02        ???
  $BD1E: 02        ???
  $BD1F: 02        ???
  $BD20: 02        ???
  $BD21: 02        ???
  $BD22: 02        ???
  $BD23: E4 E4     CPX $e4
  $BD25: 07 00     SLO $00
  $BD27: 00        BRK
  $BD28: 00        BRK
  $BD29: 07 00     SLO $00
  $BD2B: 00        BRK
  $BD2C: 00        BRK
  $BD2D: 07 00     SLO $00
  $BD2F: E4 E4     CPX $e4
  $BD31: 07 00     SLO $00
  $BD33: 00        BRK
  $BD34: E7 06     ISB $06
  $BD36: 00        BRK
  $BD37: E4 ED     CPX $ed
  $BD39: 1A        NOP
  $BD3A: 05 00     ORA $00
  $BD3C: 00        BRK
  $BD3D: 00        BRK
  $BD3E: 00        BRK
  $BD3F: 05 05     ORA $05
  $BD41: 05 05     ORA $05
  $BD43: 00        BRK
  $BD44: 00        BRK
  $BD45: 00        BRK
  $BD46: 00        BRK
  $BD47: 18        CLC
  $BD48: 04 04     NOP $04
  $BD4A: 04 06     NOP $06
  $BD4C: 93 AC     ??? ($ac),Y
  $BD4E: 79 06 00  ADC $0006,Y
  $BD51: 00        BRK
  $BD52: 00        BRK
  $BD53: 00        BRK
  $BD54: 00        BRK
  $BD55: 00        BRK
  $BD56: 00        BRK
  $BD57: 04 04     NOP $04
  $BD59: 19 00 8B  ORA $8b00,Y
  $BD5C: 5C 07 00  NOP $0007,X
  $BD5F: 00        BRK
  $BD60: 00        BRK
  $BD61: 07 00     SLO $00
  $BD63: 06 93     ASL $93
  $BD65: AC 79 1A  LDY $1a79
  $BD68: 05 05     ORA $05
  $BD6A: 05 8B     ORA $8b
  $BD6C: 5C 07 00  NOP $0007,X
  $BD6F: 05 05     ORA $05
  $BD71: 1B 00 00  SLO $0000,Y
  $BD74: 00        BRK
  $BD75: 07 00     SLO $00
  $BD77: 05 05     ORA $05
  $BD79: 1B 00 9E  SLO $9e00,Y
  $BD7C: A5 7F     LDA $7f
  $BD7E: 00        BRK
  $BD7F: 00        BRK
  $BD80: 00        BRK
  $BD81: 00        BRK
  $BD82: 00        BRK
  $BD83: 00        BRK
  $BD84: E6 00     INC $00
  $BD86: 00        BRK
  $BD87: 00        BRK
  $BD88: E6 88     INC $88
  $BD8A: 6E 00 E7  ROR $e700
  $BD8D: 06 00     ASL $00
  $BD8F: 00        BRK
  $BD90: E7 06     ISB $06
  $BD92: 00        BRK
  $BD93: 00        BRK
  $BD94: 00        BRK
  $BD95: 07 00     SLO $00
  $BD97: 00        BRK
  $BD98: 00        BRK
  $BD99: 07 00     SLO $00
  $BD9B: 00        BRK
  $BD9C: E7 00     ISB $00
  $BD9E: 00        BRK
  $BD9F: 98        TYA
  $BDA0: E7 00     ISB $00
  $BDA2: 00        BRK
  $BDA3: 1A        NOP
  $BDA4: 33 50     RLA ($50),Y
  $BDA6: A1 A1     LDA ($a1,X)
  $BDA8: 20 20 20  JSR $2020
  $BDAB: 20 20 20  JSR $2020
  $BDAE: 20 20 AA  JSR $aa20
  $BDB1: A9 A6     LDA #$a6
  $BDB3: AA        TAX
  $BDB4: A6 AA     LDX $aa
  $BDB6: AA        TAX
  $BDB7: AA        TAX
  $BDB8: AE AA A1  LDX $a1aa
  $BDBB: 15 55     ORA $55,X
  $BDBD: 55 51     EOR $51,X
  $BDBF: 05 05     ORA $05
  $BDC1: 05 05     ORA $05
  $BDC3: A5 A5     LDA $a5
  $BDC5: A5 A0     LDA $a0
  $BDC7: 00        BRK
  $BDC8: 0F 25 27  SLO $2725
  $BDCB: 36 25     ROL $25,X
  $BDCD: 30 36     BMI $be05
  $BDCF: 0F 0F 0F  SLO $0f0f
  $BDD2: 0F 0F 31  SLO $310f
  $BDD5: 30 2C     BMI $be03
  $BDD7: 36 30     ROL $30,X
  $BDD9: 0F 07 25  SLO $2507
  $BDDC: 0F 36 25  SLO $2536
  $BDDF: 30 21     BMI $be02
  $BDE1: 36 30     ROL $30,X
  $BDE3: 0F 36 30  SLO $3036
  $BDE6: 36 1A     ROL $1a,X
  $BDE8: 30 36     BMI $be20
  $BDEA: 21 30     AND ($30,X)
  $BDEC: 36 30     ROL $30,X
  $BDEE: 11 36     ORA ($36),Y
  $BDF0: 22        ???
  $BDF1: 36 25     ROL $25,X
  $BDF3: 30 0F     BMI $be04
  $BDF5: 2B 0F     ANC #$0f
  $BDF7: 25 30     AND $30
  $BDF9: 22        ???
  $BDFA: 36 1A     ROL $1a,X
  $BDFC: 30 36     BMI $be34
  $BDFE: 21 30     AND ($30,X)
  $BE00: 36 30     ROL $30,X
  $BE02: 21 36     AND ($36,X)
  $BE04: 0F 0F 3A  SLO $3a0f
  $BE07: 0F 0F 37  SLO $370f
  $BE0A: 0F 0F 2C  SLO $2c0f
  $BE0D: 0F 18 04  SLO $0418
  $BE10: 19 06 00  ORA $0006,Y
  $BE13: 07 1A     SLO $1a
  $BE15: 05 1B     ORA $1b
  $BE17: FC FD F7  NOP $f7fd,X
  $BE1A: FE 00 FE  INC $fe00,X
  $BE1D: F8        SED
  $BE1E: FD F9 E4  SBC $e4f9,X
  $BE21: E4 E4     CPX $e4
  $BE23: E6 00     INC $00
  $BE25: E7 EC     ISB $ec
  $BE27: 00        BRK
  $BE28: ED 10 00  SBC $0010
  $BE2B: 11 00     ORA ($00),Y
  $BE2D: 00        BRK
  $BE2E: 00        BRK
  $BE2F: 12        ???
  $BE30: 00        BRK
  $BE31: 13 00     SLO ($00),Y
  $BE33: 00        BRK
  $BE34: 00        BRK
  $BE35: 00        BRK
  $BE36: 00        BRK
  $BE37: 00        BRK
  $BE38: 00        BRK
  $BE39: 00        BRK
  $BE3A: 00        BRK
  $BE3B: FF FF FF  ISB $ffff,X
  $BE3E: FF FF FF  ISB $ffff,X
  $BE41: FF FF FF  ISB $ffff,X
  $BE44: 04 22     NOP $22
  $BE46: 16 08     ASL $08,X
  $BE48: C2 20     NOP #$20
  $BE4A: 1A        NOP
  $BE4B: 03 82     SLO ($82,X)
  $BE4D: 21 1A     AND ($1a,X)
  $BE4F: 0C 82 21  NOP $2182
  $BE52: 08        PHP
  $BE53: 02        ???
  $BE54: 45 22     EOR $22
  $BE56: 05 04     ORA $04
  $BE58: CF 21 0A  DCP $0a21
  $BE5B: 02        ???
  $BE5C: 8F 22 0A  SAX $0a22
  $BE5F: 02        ???
  $BE60: 63 20     RRA ($20,X)
  $BE62: 0E 09 82  ASL $8209
  $BE65: 20 10 07  JSR $0710
  $BE68: 83 20     SAX ($20,X)
  $BE6A: 0E 07 54  ASL $5407
  $BE6D: 20 07 07  JSR $0707
  $BE70: 54 20     NOP $20,X
  $BE72: 07 09     SLO $09
  $BE74: 54 20     NOP $20,X
  $BE76: 07 0B     SLO $0b
  $BE78: 55 22     EOR $22,X
  $BE7A: 06 04     ASL $04
  $BE7C: 65 22     ADC $22
  $BE7E: 14 04     NOP $04,X
  $BE80: 89 21     NOP #$21
  $BE82: 0D 03 01  ORA $0103
  $BE85: 09 02     ORA #$02
  $BE87: 00        BRK
  $BE88: 03 00     SLO ($00,X)
  $BE8A: 04 12     NOP $12
  $BE8C: 05 00     ORA $00
  $BE8E: 06 00     ASL $00
  $BE90: 07 00     SLO $00
  $BE92: 08        PHP
  $BE93: 00        BRK
  $BE94: 09 1B     ORA #$1b
  $BE96: 0A        ASL A
  $BE97: 24 A8     BIT $a8
  $BE99: FE AD FE  INC $fead,X
  $BE9C: B2        ???
  $BE9D: FE B8 FE  INC $feb8,X
  $BEA0: DF FE 14  DCP $14fe,X
  $BEA3: FF 21 FF  ISB $ff21,X
  $BEA6: 26 FF     ROL $ff
  $BEA8: 01 44     ORA ($44,X)
  $BEAA: 01 11     ORA ($11,X)
  $BEAC: FF 01 FC  ISB $fc01,X
  $BEAF: 01 F0     ORA ($f0,X)
  $BEB1: FF 03 AA  ISB $aa03,X
  $BEB4: 85 03     STA $03
  $BEB6: AA        TAX
  $BEB7: FF 08 A0  ISB $a008,X
  $BEBA: 01 0A     ORA ($0a,X)
  $BEBC: 01 4A     ORA ($4a,X)
  $BEBE: 06 5A     ASL $5a
  $BEC0: 01 00     ORA ($00,X)
  $BEC2: 01 44     ORA ($44,X)
  $BEC4: 06 55     ASL $55
  $BEC6: 01 00     ORA ($00,X)
  $BEC8: 01 44     ORA ($44,X)
  $BECA: 06 55     ASL $55
  $BECC: 01 00     ORA ($00,X)
  $BECE: 01 44     ORA ($44,X)
  $BED0: 06 55     ASL $55
  $BED2: 01 00     ORA ($00,X)
  $BED4: 01 44     ORA ($44,X)
  $BED6: 06 55     ASL $55
  $BED8: 01 00     ORA ($00,X)
  $BEDA: 01 04     ORA ($04,X)
  $BEDC: 06 05     ASL $05
  $BEDE: FF 08 50  ISB $5008,X
  $BEE1: 01 55     ORA ($55,X)
  $BEE3: 01 95     ORA ($95,X)
  $BEE5: 01 05     ORA ($05,X)
  $BEE7: 03 A5     SLO ($a5,X)
  $BEE9: 02        ???
  $BEEA: F5 01     SBC $01,X
  $BEEC: 55 01     EOR $01,X
  $BEEE: 99 04 AA  STA $aa04,Y
  $BEF1: 02        ???
  $BEF2: FF 01 55  ISB $5501,X
  $BEF5: 01 99     ORA ($99,X)
  $BEF7: 04 AA     NOP $aa
  $BEF9: 02        ???
  $BEFA: 0F 01 55  SLO $5501
  $BEFD: 01 99     ORA ($99,X)
  $BEFF: 04 AA     NOP $aa
  $BF01: 02        ???
  $BF02: 00        BRK
  $BF03: 01 55     ORA ($55,X)
  $BF05: 01 99     ORA ($99,X)
  $BF07: 04 AA     NOP $aa
  $BF09: 02        ???
  $BF0A: 00        BRK
  $BF0B: 01 05     ORA ($05,X)
  $BF0D: 01 09     ORA ($09,X)
  $BF0F: 04 0A     NOP $0a
  $BF11: 02        ???
  $BF12: 00        BRK
  $BF13: FF 01 66  ISB $6601,X
  $BF16: 03 55     SLO ($55,X)
  $BF18: 84 01     STY $01
  $BF1A: A6 03     LDX $03
  $BF1C: A5 84     LDA $84
  $BF1E: 04 F5     NOP $f5
  $BF20: FF 01 44  ISB $4401,X
  $BF23: 01 11     ORA ($11,X)
  $BF25: FF 01 40  ISB $4001,X
  $BF28: 01 15     ORA ($15,X)
  $BF2A: FF 04 0E  ISB $0e04,X
  $BF2D: C6 3E     DEC $3e
  $BF2F: C4 82     CPY $82
  $BF31: 4A        LSR A
  $BF32: 1D 01 66  ORA $6601,X
  $BF35: AC 86 28  LDY $2886
  $BF38: 88        DEY
  $BF39: 0C A6 9B  NOP $9ba6
  $BF3C: 82 A8     NOP #$a8
  $BF3E: 8A        TXA
  $BF3F: 9E AE C2  SHX $c2ae,Y
  $BF42: 92        ???
  $BF43: 80 86     NOP #$86
  $BF45: C0 42     CPY #$42
  $BF47: 84 13     STY $13
  $BF49: 83 08     SAX ($08,X)
  $BF4B: C0 22     CPY #$22
  $BF4D: C6 8C     DEC $8c
  $BF4F: 84 C6     STY $c6
  $BF51: AD 81 82  LDA $8281
  $BF54: 82 24     NOP #$24
  $BF56: C2 CA     NOP #$ca
  $BF58: C2 3E     NOP #$3e
  $BF5A: 80 90     NOP #$90
  $BF5C: C2 0F     NOP #$0f
  $BF5E: 82 A2     NOP #$a2
  $BF60: C0 C6     CPY #$c6
  $BF62: 26 C4     ROL $c4
  $BF64: 02        ???
  $BF65: C4 06     CPY $06
  $BF67: 84 A6     STY $a6
  $BF69: C2 7A     NOP #$7a
  $BF6B: 8A        TXA
  $BF6C: 68        PLA
  $BF6D: E0 12     CPX #$12
  $BF6F: 93 80     ??? ($80),Y
  $BF71: 8C A4 A4  STY $a4a4
  $BF74: A6 12     LDX $12
  $BF76: C0 48     CPY #$48
  $BF78: E0 EE     CPX #$ee
  $BF7A: E4 CA     CPX $ca
  $BF7C: AA        TAX
  $BF7D: E0 C2     CPX #$c2
  $BF7F: BA        TSX
  $BF80: 92        ???
  $BF81: 40        RTI
  $BF82: 02        ???
  $BF83: 89 06     NOP #$06
  $BF85: 02        ???
  $BF86: 02        ???
  $BF87: 02        ???
  $BF88: 0C C8 42  NOP $42c8
  $BF8B: 82 3A     NOP #$3a
  $BF8D: 84 0F     STY $0f
  $BF8F: 87 21     SAX $21
  $BF91: 02        ???
  $BF92: 08        PHP
  $BF93: 9B 00 00  TAS $0000,Y
  $BF96: 00        BRK
  $BF97: 06 C2     ASL $c2
  $BF99: 22        ???
  $BF9A: 42        ???
  $BF9B: 82 C6     NOP #$c6
  $BF9D: 0A        ASL A
  $BF9E: 42        ???
  $BF9F: 0A        ASL A
  $BFA0: 43 44     SRE ($44,X)
  $BFA2: 23 02     RLA ($02,X)
  $BFA4: 43 42     SRE ($42,X)
  $BFA6: 80 83     NOP #$83
  $BFA8: 0A        ASL A
  $BFA9: 42        ???
  $BFAA: 0A        ASL A
  $BFAB: C0 2A     CPY #$2a
  $BFAD: 46 4E     LSR $4e
  $BFAF: 16 92     ASL $92,X
  $BFB1: 82 82     NOP #$82
  $BFB3: 23 80     RLA ($80,X)
  $BFB5: 26 A6     ROL $a6
  $BFB7: 00        BRK
  $BFB8: 24 88     BIT $88
  $BFBA: E0 0F     CPX #$0f
  $BFBC: 82 09     NOP #$09
  $BFBE: C3 0B     DCP ($0b,X)
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
  $BFDA: C0 0B     CPY #$0b
  $BFDC: C4 12     CPY $12
  $BFDE: C2 5A     NOP #$5a
  $BFE0: 20 00 20  JSR $2000
  $BFE3: 82 71     NOP #$71
  $BFE5: 00        BRK
  $BFE6: 2A        ROL A
  $BFE7: 0A        ASL A
  $BFE8: C9 02     CMP #$02
  $BFEA: 23 CA     RLA ($ca,X)
  $BFEC: AB 00     ATX #$00
  $BFEE: A1 80     LDA ($80,X)
  $BFF0: 80 51     NOP #$51
  $BFF2: 80 60     NOP #$60
  $BFF4: C6 E3     DEC $e3
  $BFF6: 82 80     NOP #$80
  $BFF8: 60        RTS
  $BFF9: 8A        TXA
  $BFFA: 02        ???
  $BFFB: 80 C0     NOP #$c0
  $BFFD: FF 02 80  ISB $8002,X

; ============================================================