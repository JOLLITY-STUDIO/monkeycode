; PRG Bank $05
; CPU Address Range: $8000 - $BFFF
; ROM Offset: $14000
; ============================================================

  $8000: FC C4 0D  NOP $0dc4,X
  $8003: CB 9B     AXS #$9b
  $8005: CB 3B     AXS #$3b
  $8007: CE AA CE  DEC $ceaa
  $800A: DE CE F5  DEC $f5ce,X
  $800D: D0 49     BNE $8058
  $800F: D1 57     CMP ($57),Y
  $8011: D2        ???
  $8012: 45 D2     EOR $d2
  $8014: 3D D3 25  AND $25d3,X
  $8017: D4 4C     NOP $4c,X
  $8019: BA        TSX
  $801A: C0 4C     CPY #$4c
  $801C: 00        BRK
  $801D: 00        BRK
  $801E: 4C 30 C0  JMP $c030
  $8021: 4C 8E C3  JMP $c38e
  $8024: 4C 6D C2  JMP $c26d
  $8027: 4C 00 D6  JMP $d600
  $802A: 4C 03 D6  JMP $d603
  $802D: 4C 06 D6  JMP $d606
  $8030: AD DC 06  LDA $06dc
  $8033: 38        SEC
  $8034: E9 02     SBC #$02
  $8036: 0A        ASL A
  $8037: AA        TAX
  $8038: BD 2F D4  LDA $d42f,X
  $803B: 85 00     STA $00
  $803D: BD 30 D4  LDA $d430,X
  $8040: 85 01     STA $01
  $8042: A0 00     LDY #$00
  $8044: B1 00     LDA ($00),Y
  $8046: 4A        LSR A
  $8047: 4A        LSR A
  $8048: B1 00     LDA ($00),Y
  $804A: 29 03     AND #$03
  $804C: C8        INY
  $804D: B1 00     LDA ($00),Y
  $804F: 29 01     AND #$01
  $8051: B1 00     LDA ($00),Y
  $8053: 4A        LSR A
  $8054: AA        TAX
  $8055: 29 07     AND #$07
  $8057: 8A        TXA
  $8058: 4A        LSR A
  $8059: 4A        LSR A
  $805A: 4A        LSR A
  $805B: AA        TAX
  $805C: 29 01     AND #$01
  $805E: 8D F8 05  STA $05f8
  $8061: 8A        TXA
  $8062: 4A        LSR A
  $8063: C8        INY
  $8064: B1 00     LDA ($00),Y
  $8066: A9 0B     LDA #$0b
  $8068: 85 02     STA $02
  $806A: A5 02     LDA $02
  $806C: 20 47 80  JSR $8047
  $806F: A5 02     LDA $02
  $8071: 20 77 80  JSR $8077
  $8074: 18        CLC
  $8075: 69 03     ADC #$03
  $8077: A8        TAY
  $8078: B1 00     LDA ($00),Y
  $807A: A2 00     LDX #$00
  $807C: 20 B0 C0  JSR $c0b0
  $807F: E6 02     INC $02
  $8081: A5 02     LDA $02
  $8083: C9 16     CMP #$16
  $8085: D0 E3     BNE $806a
  $8087: A0 07     LDY #$07
  $8089: B1 00     LDA ($00),Y
  $808B: F0 22     BEQ $80af
  $808D: 85 02     STA $02
  $808F: C8        INY
  $8090: 84 03     STY $03
  $8092: A4 03     LDY $03
  $8094: B1 00     LDA ($00),Y
  $8096: 18        CLC
  $8097: 69 0B     ADC #$0b
  $8099: 20 47 80  JSR $8047
  $809C: A4 03     LDY $03
  $809E: C8        INY
  $809F: B1 00     LDA ($00),Y
  $80A1: AA        TAX
  $80A2: C8        INY
  $80A3: B1 00     LDA ($00),Y
  $80A5: C8        INY
  $80A6: 84 03     STY $03
  $80A8: 20 B0 C0  JSR $c0b0
  $80AB: C6 02     DEC $02
  $80AD: D0 E3     BNE $8092
  $80AF: 60        RTS
  $80B0: A0 0E     LDY #$0e
  $80B2: 91 5D     STA ($5d),Y
  $80B4: A0 03     LDY #$03
  $80B6: 8A        TXA
  $80B7: 91 5D     STA ($5d),Y
  $80B9: 60        RTS
  $80BA: A5 08     LDA $08
  $80BC: 20 17 80  JSR $8017
  $80BF: E8        INX
  $80C0: C0 ED     CPY #$ed
  $80C2: C0 16     CPY #$16
  $80C4: C1 1D     CMP ($1d,X)
  $80C6: C1 24     CMP ($24,X)
  $80C8: C1 3D     CMP ($3d,X)
  $80CA: C1 E3     CMP ($e3,X)
  $80CC: C0 4A     CPY #$4a
  $80CE: C1 50     CMP ($50,X)
  $80D0: C1 72     CMP ($72,X)
  $80D2: C1 7B     CMP ($7b,X)
  $80D4: C1 86     CMP ($86,X)
  $80D6: C1 97     CMP ($97,X)
  $80D8: C1 98     CMP ($98,X)
  $80DA: C1 AA     CMP ($aa,X)
  $80DC: C1 C1     CMP ($c1,X)
  $80DE: C1 F4     CMP ($f4,X)
  $80E0: C1 13     CMP ($13,X)
  $80E2: C2 A9     NOP #$a9
  $80E4: 00        BRK
  $80E5: 4C 55 C1  JMP $c155
  $80E8: A9 01     LDA #$01
  $80EA: 4C 55 C1  JMP $c155
  $80ED: 20 FD C0  JSR $c0fd
  $80F0: B9 F7 C0  LDA $c0f7,Y
  $80F3: 20 25 C2  JSR $c225
  $80F6: 60        RTS
  $80F7: 00        BRK
  $80F8: 04 05     NOP $05
  $80FA: 01 03     ORA ($03,X)
  $80FC: 02        ???
  $80FD: AC 9C 06  LDY $069c
  $8100: AD E7 05  LDA $05e7
  $8103: 29 03     AND #$03
  $8105: F0 0E     BEQ $8115
  $8107: A0 05     LDY #$05
  $8109: C9 03     CMP #$03
  $810B: F0 08     BEQ $8115
  $810D: A0 03     LDY #$03
  $810F: AD 9C 06  LDA $069c
  $8112: F0 01     BEQ $8115
  $8114: C8        INY
  $8115: 60        RTS
  $8116: AD 9F 05  LDA $059f
  $8119: 20 3F C2  JSR $c23f
  $811C: 60        RTS
  $811D: AD B9 05  LDA $05b9
  $8120: 20 3F C2  JSR $c23f
  $8123: 60        RTS
  $8124: AC 95 06  LDY $0695
  $8127: B9 C2 05  LDA $05c2,Y
  $812A: AC DE 03  LDY $03de
  $812D: F0 0A     BEQ $8139
  $812F: AD E3 05  LDA $05e3
  $8132: 4A        LSR A
  $8133: A9 00     LDA #$00
  $8135: B0 02     BCS $8139
  $8137: A9 0B     LDA #$0b
  $8139: 20 3F C2  JSR $c23f
  $813C: 60        RTS
  $813D: AC C8 03  LDY $03c8
  $8140: B9 C2 05  LDA $05c2,Y
  $8143: 20 3F C2  JSR $c23f
  $8146: EE C8 03  INC $03c8
  $8149: 60        RTS
  $814A: AD E3 05  LDA $05e3
  $814D: 4C 55 C1  JMP $c155
  $8150: AD E3 05  LDA $05e3
  $8153: 49 01     EOR #$01
  $8155: AC DE 06  LDY $06de
  $8158: C0 02     CPY #$02
  $815A: D0 01     BNE $815d
  $815C: 88        DEY
  $815D: 49 01     EOR #$01
  $815F: D0 09     BNE $816a
  $8161: AC DC 06  LDY $06dc
  $8164: C0 16     CPY #$16
  $8166: D0 02     BNE $816a
  $8168: A0 09     LDY #$09
  $816A: 98        TYA
  $816B: 18        CLC
  $816C: 69 13     ADC #$13
  $816E: 20 25 C2  JSR $c225
  $8171: 60        RTS
  $8172: A2 28     LDX #$28
  $8174: 20 7D 80  JSR $807d
  $8177: 20 31 C2  JSR $c231
  $817A: 60        RTS
  $817B: AD A6 06  LDA $06a6
  $817E: 4A        LSR A
  $817F: 18        CLC
  $8180: 69 01     ADC #$01
  $8182: 20 1E C2  JSR $c21e
  $8185: 60        RTS
  $8186: AD E0 05  LDA $05e0
  $8189: 38        SEC
  $818A: ED E0 05  SBC $05e0
  $818D: B0 04     BCS $8193
  $818F: 49 FF     EOR #$ff
  $8191: 69 01     ADC #$01
  $8193: 20 1E C2  JSR $c21e
  $8196: 60        RTS
  $8197: 60        RTS
  $8198: AD C1 05  LDA $05c1
  $819B: C9 05     CMP #$05
  $819D: 90 02     BCC $81a1
  $819F: A9 05     LDA #$05
  $81A1: 20 1E C2  JSR $c21e
  $81A4: A9 11     LDA #$11
  $81A6: 20 25 C2  JSR $c225
  $81A9: 60        RTS
  $81AA: AD EE 05  LDA $05ee
  $81AD: F0 09     BEQ $81b8
  $81AF: 20 FD C0  JSR $c0fd
  $81B2: B9 BB C1  LDA $c1bb,Y
  $81B5: 20 25 C2  JSR $c225
  $81B8: 4C ED C0  JMP $c0ed
  $81BB: 08        PHP
  $81BC: 08        PHP
  $81BD: 08        PHP
  $81BE: 06 07     ASL $07
  $81C0: FF AD D3  ISB $d3ad,X
  $81C3: 05 29     ORA $29
  $81C5: 03 AC     SLO ($ac,X)
  $81C7: DE 03 F0  DEC $f003,X
  $81CA: 02        ???
  $81CB: 09 04     ORA #$04
  $81CD: 48        PHA
  $81CE: AD D3 05  LDA $05d3
  $81D1: 29 20     AND #$20
  $81D3: F0 0A     BEQ $81df
  $81D5: 68        PLA
  $81D6: 48        PHA
  $81D7: A8        TAY
  $81D8: B9 E8 C1  LDA $c1e8,Y
  $81DB: 20 25 C2  JSR $c225
  $81DE: E8        INX
  $81DF: 68        PLA
  $81E0: A8        TAY
  $81E1: B9 EE C1  LDA $c1ee,Y
  $81E4: 20 25 C2  JSR $c225
  $81E7: 60        RTS
  $81E8: 0E 06 FF  ASL $ff06
  $81EB: 06 06     ASL $06
  $81ED: 0F 0B 09  SLO $090b
  $81F0: FF 0A 0D  ISB $0d0a,X
  $81F3: 33 E6     RLA ($e6),Y
  $81F5: 02        ???
  $81F6: A5 09     LDA $09
  $81F8: 08        PHP
  $81F9: 29 7F     AND #$7f
  $81FB: 20 56 80  JSR $8056
  $81FE: A4 67     LDY $67
  $8200: B1 65     LDA ($65),Y
  $8202: 28        PLP
  $8203: 08        PHP
  $8204: 10 02     BPL $8208
  $8206: 09 80     ORA #$80
  $8208: 20 80 80  JSR $8080
  $820B: E6 67     INC $67
  $820D: C6 68     DEC $68
  $820F: D0 ED     BNE $81fe
  $8211: 68        PLA
  $8212: 60        RTS
  $8213: A5 06     LDA $06
  $8215: 0A        ASL A
  $8216: 69 1F     ADC #$1f
  $8218: 20 2F 80  JSR $802f
  $821B: 68        PLA
  $821C: 68        PLA
  $821D: 60        RTS
  $821E: 18        CLC
  $821F: 69 3E     ADC #$3e
  $8221: 20 80 80  JSR $8080
  $8224: 60        RTS
  $8225: C9 FF     CMP #$ff
  $8227: D0 01     BNE $822a
  $8229: 60        RTS
  $822A: 18        CLC
  $822B: 69 27     ADC #$27
  $822D: 20 66 C2  JSR $c266
  $8230: 60        RTS
  $8231: A4 67     LDY $67
  $8233: B1 65     LDA ($65),Y
  $8235: 20 80 80  JSR $8080
  $8238: E6 67     INC $67
  $823A: C6 68     DEC $68
  $823C: D0 F3     BNE $8231
  $823E: 60        RTS
  $823F: 48        PHA
  $8240: 20 47 80  JSR $8047
  $8243: A0 03     LDY #$03
  $8245: B1 5D     LDA ($5d),Y
  $8247: AA        TAX
  $8248: 68        PLA
  $8249: E0 27     CPX #$27
  $824B: B0 06     BCS $8253
  $824D: 20 53 80  JSR $8053
  $8250: 4C 59 C2  JMP $c259
  $8253: 8A        TXA
  $8254: 69 40     ADC #$40
  $8256: 20 56 80  JSR $8056
  $8259: 20 31 C2  JSR $c231
  $825C: A5 69     LDA $69
  $825E: F0 05     BEQ $8265
  $8260: A9 39     LDA #$39
  $8262: 20 66 C2  JSR $c266
  $8265: 60        RTS
  $8266: 20 56 80  JSR $8056
  $8269: 20 31 C2  JSR $c231
  $826C: 60        RTS
  $826D: 20 0A C4  JSR $c40a
  $8270: 20 A5 C4  JSR $c4a5
  $8273: AD 00 06  LDA $0600
  $8276: D0 01     BNE $8279
  $8278: 60        RTS
  $8279: A9 02     LDA #$02
  $827B: 2C 00 06  BIT $0600
  $827E: D0 0B     BNE $828b
  $8280: CE 01 06  DEC $0601
  $8283: D0 15     BNE $829a
  $8285: 20 1F C3  JSR $c31f
  $8288: 4C 9A C2  JMP $c29a
  $828B: 0A        ASL A
  $828C: 2C 00 06  BIT $0600
  $828F: F0 09     BEQ $829a
  $8291: 4D 00 06  EOR $0600
  $8294: 8D 00 06  STA $0600
  $8297: 20 1F C3  JSR $c31f
  $829A: AD 12 06  LDA $0612
  $829D: 20 17 80  JSR $8017
  $82A0: A4 C2     LDY $c2
  $82A2: B5 C2     LDA $c2,X
  $82A4: A2 02     LDX #$02
  $82A6: 20 0B C3  JSR $c30b
  $82A9: 8D 19 06  STA $0619
  $82AC: A2 06     LDX #$06
  $82AE: 20 0B C3  JSR $c30b
  $82B1: 8D 1A 06  STA $061a
  $82B4: 60        RTS
  $82B5: 20 A4 C2  JSR $c2a4
  $82B8: AD 0A 06  LDA $060a
  $82BB: F0 02     BEQ $82bf
  $82BD: A9 1A     LDA #$1a
  $82BF: 85 00     STA $00
  $82C1: AD 1E 06  LDA $061e
  $82C4: 38        SEC
  $82C5: E9 10     SBC #$10
  $82C7: 0A        ASL A
  $82C8: 65 00     ADC $00
  $82CA: A8        TAY
  $82CB: A9 04     LDA #$04
  $82CD: 20 7A 80  JSR $807a
  $82D0: AD 0B 06  LDA $060b
  $82D3: 85 00     STA $00
  $82D5: 18        CLC
  $82D6: 20 EF C2  JSR $c2ef
  $82D9: 18        CLC
  $82DA: 6D 1A 06  ADC $061a
  $82DD: 8D 1A 06  STA $061a
  $82E0: 38        SEC
  $82E1: 20 EF C2  JSR $c2ef
  $82E4: 18        CLC
  $82E5: 6D 19 06  ADC $0619
  $82E8: 8D 19 06  STA $0619
  $82EB: EE 0B 06  INC $060b
  $82EE: 60        RTS
  $82EF: AD BB 05  LDA $05bb
  $82F2: 90 02     BCC $82f6
  $82F4: 4A        LSR A
  $82F5: 4A        LSR A
  $82F6: D1 86     CMP ($86),Y
  $82F8: F0 07     BEQ $8301
  $82FA: 90 05     BCC $8301
  $82FC: F1 86     SBC ($86),Y
  $82FE: 4C F6 C2  JMP $c2f6
  $8301: 46 00     LSR $00
  $8303: B0 04     BCS $8309
  $8305: 49 FF     EOR #$ff
  $8307: 69 01     ADC #$01
  $8309: E8        INX
  $830A: 60        RTS
  $830B: 18        CLC
  $830C: BD 00 06  LDA $0600,X
  $830F: 7D 01 06  ADC $0601,X
  $8312: 9D 01 06  STA $0601,X
  $8315: BD 02 06  LDA $0602,X
  $8318: 7D 03 06  ADC $0603,X
  $831B: 9D 03 06  STA $0603,X
  $831E: 60        RTS
  $831F: A4 8B     LDY $8b
  $8321: E6 8B     INC $8b
  $8323: B1 8C     LDA ($8c),Y
  $8325: C9 F0     CMP #$f0
  $8327: 90 03     BCC $832c
  $8329: 4C 3D C3  JMP $c33d
  $832C: 8D 01 06  STA $0601
  $832F: AD 12 06  LDA $0612
  $8332: 20 17 80  JSR $8017
  $8335: 65 C3     ADC $c3
  $8337: 79 C3 8C  ADC $8cc3,Y
  $833A: C3 8C     DCP ($8c,X)
  $833C: C3 29     DCP ($29,X)
  $833E: 0F 20 17  SLO $1720
  $8341: 80 48     NOP #$48
  $8343: C3 4E     DCP ($4e,X)
  $8345: C3 59     DCP ($59,X)
  $8347: C3 A9     DCP ($a9,X)
  $8349: 00        BRK
  $834A: 8D 00 06  STA $0600
  $834D: 60        RTS
  $834E: AD 00 06  LDA $0600
  $8351: 09 02     ORA #$02
  $8353: 8D 00 06  STA $0600
  $8356: 4C 2F C3  JMP $c32f
  $8359: A4 8B     LDY $8b
  $835B: B1 8C     LDA ($8c),Y
  $835D: E6 8B     INC $8b
  $835F: 20 FA C4  JSR $c4fa
  $8362: 4C 1F C3  JMP $c31f
  $8365: A4 8B     LDY $8b
  $8367: A2 00     LDX #$00
  $8369: B1 8C     LDA ($8c),Y
  $836B: 9D 02 06  STA $0602,X
  $836E: C8        INY
  $836F: E8        INX
  $8370: E8        INX
  $8371: E0 08     CPX #$08
  $8373: D0 F4     BNE $8369
  $8375: 84 8B     STY $8b
  $8377: 60        RTS
  $8378: 60        RTS
  $8379: A4 8B     LDY $8b
  $837B: B1 8C     LDA ($8c),Y
  $837D: 8D 0A 06  STA $060a
  $8380: C8        INY
  $8381: 84 8B     STY $8b
  $8383: 20 65 C3  JSR $c365
  $8386: A9 00     LDA #$00
  $8388: 8D 0B 06  STA $060b
  $838B: 60        RTS
  $838C: 60        RTS
  $838D: 60        RTS
  $838E: A2 00     LDX #$00
  $8390: 8E 00 06  STX $0600
  $8393: 8E 1B 06  STX $061b
  $8396: 8E 1F 06  STX $061f
  $8399: AD 1E 06  LDA $061e
  $839C: 0A        ASL A
  $839D: A8        TAY
  $839E: A9 01     LDA #$01
  $83A0: 20 7A 80  JSR $807a
  $83A3: 85 00     STA $00
  $83A5: C8        INY
  $83A6: B1 86     LDA ($86),Y
  $83A8: C9 FF     CMP #$ff
  $83AA: F0 03     BEQ $83af
  $83AC: 20 8A C4  JSR $c48a
  $83AF: A5 00     LDA $00
  $83B1: C9 FF     CMP #$ff
  $83B3: D0 01     BNE $83b6
  $83B5: 60        RTS
  $83B6: EE 00 06  INC $0600
  $83B9: 0A        ASL A
  $83BA: A8        TAY
  $83BB: A9 02     LDA #$02
  $83BD: 20 7A 80  JSR $807a
  $83C0: 85 8C     STA $8c
  $83C2: C8        INY
  $83C3: B1 86     LDA ($86),Y
  $83C5: 85 8D     STA $8d
  $83C7: A0 00     LDY #$00
  $83C9: B1 8C     LDA ($8c),Y
  $83CB: C8        INY
  $83CC: AA        TAX
  $83CD: 29 03     AND #$03
  $83CF: 8D 12 06  STA $0612
  $83D2: 8A        TXA
  $83D3: 18        CLC
  $83D4: 08        PHP
  $83D5: 4A        LSR A
  $83D6: 4A        LSR A
  $83D7: 28        PLP
  $83D8: 10 04     BPL $83de
  $83DA: B1 8C     LDA ($8c),Y
  $83DC: C8        INY
  $83DD: 38        SEC
  $83DE: 84 8B     STY $8b
  $83E0: 20 E6 C3  JSR $c3e6
  $83E3: 4C 1F C3  JMP $c31f
  $83E6: AA        TAX
  $83E7: 8D 1E 06  STA $061e
  $83EA: A9 00     LDA #$00
  $83EC: 8D 1C 06  STA $061c
  $83EF: 8D 1D 06  STA $061d
  $83F2: A9 01     LDA #$01
  $83F4: 90 02     BCC $83f8
  $83F6: 09 02     ORA #$02
  $83F8: 8D 1B 06  STA $061b
  $83FB: 8A        TXA
  $83FC: 0A        ASL A
  $83FD: A8        TAY
  $83FE: A9 05     LDA #$05
  $8400: 20 7A 80  JSR $807a
  $8403: 85 8E     STA $8e
  $8405: C8        INY
  $8406: B1 86     LDA ($86),Y
  $8408: 85 8F     STA $8f
  $840A: AD 1B 06  LDA $061b
  $840D: F0 04     BEQ $8413
  $840F: 29 02     AND #$02
  $8411: F0 01     BEQ $8414
  $8413: 60        RTS
  $8414: CE 1D 06  DEC $061d
  $8417: 30 01     BMI $841a
  $8419: 60        RTS
  $841A: AC 1C 06  LDY $061c
  $841D: EE 1C 06  INC $061c
  $8420: B1 8E     LDA ($8e),Y
  $8422: 10 06     BPL $842a
  $8424: 20 3A C4  JSR $c43a
  $8427: 4C 1A C4  JMP $c41a
  $842A: 8D 1D 06  STA $061d
  $842D: CE 1D 06  DEC $061d
  $8430: C8        INY
  $8431: B1 8E     LDA ($8e),Y
  $8433: 8D 1E 06  STA $061e
  $8436: EE 1C 06  INC $061c
  $8439: 60        RTS
  $843A: 29 0F     AND #$0f
  $843C: 20 17 80  JSR $8017
  $843F: 49 C4     EOR #$c4
  $8441: 5B C4 6E  SRE $6ec4,Y
  $8444: C4 71     CPY $71
  $8446: C4 81     CPY $81
  $8448: C4 A2     CPY $a2
  $844A: 00        BRK
  $844B: A9 02     LDA #$02
  $844D: 2C 00 06  BIT $0600
  $8450: F0 03     BEQ $8455
  $8452: 8E 00 06  STX $0600
  $8455: 8E 1B 06  STX $061b
  $8458: 68        PLA
  $8459: 68        PLA
  $845A: 60        RTS
  $845B: AC 1C 06  LDY $061c
  $845E: B1 8E     LDA ($8e),Y
  $8460: AA        TAX
  $8461: C8        INY
  $8462: B1 8E     LDA ($8e),Y
  $8464: 85 8F     STA $8f
  $8466: 86 8E     STX $8e
  $8468: A9 00     LDA #$00
  $846A: 8D 1C 06  STA $061c
  $846D: 60        RTS
  $846E: A9 00     LDA #$00
  $8470: 2C A9 01  BIT $01a9
  $8473: 8D 2C 06  STA $062c
  $8476: A9 01     LDA #$01
  $8478: 8D 28 06  STA $0628
  $847B: A9 00     LDA #$00
  $847D: 8D 29 06  STA $0629
  $8480: 60        RTS
  $8481: AD 00 06  LDA $0600
  $8484: 09 04     ORA #$04
  $8486: 8D 00 06  STA $0600
  $8489: 60        RTS
  $848A: 0A        ASL A
  $848B: A8        TAY
  $848C: A9 03     LDA #$03
  $848E: 20 7A 80  JSR $807a
  $8491: 85 90     STA $90
  $8493: C8        INY
  $8494: B1 86     LDA ($86),Y
  $8496: 85 91     STA $91
  $8498: A9 01     LDA #$01
  $849A: 8D 1F 06  STA $061f
  $849D: A9 00     LDA #$00
  $849F: 8D 27 06  STA $0627
  $84A2: 4C C7 C4  JMP $c4c7
  $84A5: AD 1F 06  LDA $061f
  $84A8: D0 01     BNE $84ab
  $84AA: 60        RTS
  $84AB: A2 02     LDX #$02
  $84AD: 20 EC C4  JSR $c4ec
  $84B0: 6D D8 03  ADC $03d8
  $84B3: 8D D8 03  STA $03d8
  $84B6: A2 05     LDX #$05
  $84B8: 20 EC C4  JSR $c4ec
  $84BB: 6D D9 03  ADC $03d9
  $84BE: 8D D9 03  STA $03d9
  $84C1: CE 20 06  DEC $0620
  $84C4: F0 01     BEQ $84c7
  $84C6: 60        RTS
  $84C7: AC 27 06  LDY $0627
  $84CA: B1 90     LDA ($90),Y
  $84CC: D0 04     BNE $84d2
  $84CE: 8D 1F 06  STA $061f
  $84D1: 60        RTS
  $84D2: 8D 20 06  STA $0620
  $84D5: C8        INY
  $84D6: A2 00     LDX #$00
  $84D8: B1 90     LDA ($90),Y
  $84DA: 9D 21 06  STA $0621,X
  $84DD: C8        INY
  $84DE: E8        INX
  $84DF: E0 03     CPX #$03
  $84E1: F0 01     BEQ $84e4
  $84E3: E8        INX
  $84E4: E0 07     CPX #$07
  $84E6: D0 F0     BNE $84d8
  $84E8: 8C 27 06  STY $0627
  $84EB: 60        RTS
  $84EC: 18        CLC
  $84ED: BD 1F 06  LDA $061f,X
  $84F0: 7D 20 06  ADC $0620,X
  $84F3: 9D 20 06  STA $0620,X
  $84F6: BD 21 06  LDA $0621,X
  $84F9: 60        RTS
  $84FA: 60        RTS
  $84FB: 60        RTS
  $84FC: 28        PLP
  $84FD: C6 22     DEC $22
  $84FF: C6 29     DEC $29
  $8501: C6 36     DEC $36
  $8503: C6 3C     DEC $3c
  $8505: C6 46     DEC $46
  $8507: C6 4C     DEC $4c
  $8509: C6 52     DEC $52
  $850B: C6 7D     DEC $7d
  $850D: C6 8A     DEC $8a
  $850F: C6 8A     DEC $8a
  $8511: C6 8A     DEC $8a
  $8513: C6 91     DEC $91
  $8515: C6 98     DEC $98
  $8517: C6 9E     DEC $9e
  $8519: C6 7D     DEC $7d
  $851B: C6 B8     DEC $b8
  $851D: C6 B8     DEC $b8
  $851F: C6 BD     DEC $bd
  $8521: C6 C8     DEC $c8
  $8523: C6 CE     DEC $ce
  $8525: C6 D8     DEC $d8
  $8527: C6 5E     DEC $5e
  $8529: C7 DE     DCP $de
  $852B: C6 E3     DEC $e3
  $852D: C6 ED     DEC $ed
  $852F: C6 FF     DEC $ff
  $8531: C6 09     DEC $09
  $8533: C7 09     DCP $09
  $8535: C7 09     DCP $09
  $8537: C7 09     DCP $09
  $8539: C7 0F     DCP $0f
  $853B: C7 27     DCP $27
  $853D: C7 79     DCP $79
  $853F: C7 32     DCP $32
  $8541: C7 37     DCP $37
  $8543: C7 4F     DCP $4f
  $8545: C7 54     DCP $54
  $8547: C7 5E     DCP $5e
  $8549: C7 68     DCP $68
  $854B: C7 72     DCP $72
  $854D: C7 79     DCP $79
  $854F: C7 8F     DCP $8f
  $8551: C7 95     DCP $95
  $8553: C7 9B     DCP $9b
  $8555: C7 A1     DCP $a1
  $8557: C7 A6     DCP $a6
  $8559: C7 AB     DCP $ab
  $855B: C7 B3     DCP $b3
  $855D: C7 B9     DCP $b9
  $855F: C7 BF     DCP $bf
  $8561: C7 D4     DCP $d4
  $8563: C7 D9     DCP $d9
  $8565: C7 D9     DCP $d9
  $8567: C7 FA     DCP $fa
  $8569: C7 0A     DCP $0a
  $856B: C8        INY
  $856C: 10 C8     BPL $8536
  $856E: 27 C8     RLA $c8
  $8570: 3D C8 4A  AND $4ac8,X
  $8573: C8        INY
  $8574: 54 C8     NOP $c8,X
  $8576: 59 C8 63  EOR $63c8,Y
  $8579: C8        INY
  $857A: 6D C8 77  ADC $77c8
  $857D: C8        INY
  $857E: 90 C8     BCC $8548
  $8580: 96 C8     STX $c8,Y
  $8582: 96 C8     STX $c8,Y
  $8584: A8        TAY
  $8585: C8        INY
  $8586: B3 C8     LAX ($c8),Y
  $8588: B3 C8     LAX ($c8),Y
  $858A: C0 C8     CPY #$c8
  $858C: C7 C8     DCP $c8
  $858E: D2        ???
  $858F: C8        INY
  $8590: D8        CLD
  $8591: C8        INY
  $8592: DD C8 F1  CMP $f1c8,X
  $8595: C8        INY
  $8596: F7 C8     ISB $c8,X
  $8598: FD C8 04  SBC $04c8,X
  $859B: C9 09     CMP #$09
  $859D: C9 0E     CMP #$0e
  $859F: C9 14     CMP #$14
  $85A1: C9 19     CMP #$19
  $85A3: C9 1E     CMP #$1e
  $85A5: C9 23     CMP #$23
  $85A7: C9 28     CMP #$28
  $85A9: C9 2D     CMP #$2d
  $85AB: C9 32     CMP #$32
  $85AD: C9 37     CMP #$37
  $85AF: C9 3C     CMP #$3c
  $85B1: C9 41     CMP #$41
  $85B3: C9 46     CMP #$46
  $85B5: C9 4B     CMP #$4b
  $85B7: C9 50     CMP #$50
  $85B9: C9 55     CMP #$55
  $85BB: C9 5A     CMP #$5a
  $85BD: C9 5F     CMP #$5f
  $85BF: C9 64     CMP #$64
  $85C1: C9 69     CMP #$69
  $85C3: C9 6E     CMP #$6e
  $85C5: C9 73     CMP #$73
  $85C7: C9 78     CMP #$78
  $85C9: C9 B3     CMP #$b3
  $85CB: C8        INY
  $85CC: 7E C9 89  ROR $89c9,X
  $85CF: C9 90     CMP #$90
  $85D1: C9 AB     CMP #$ab
  $85D3: C9 B5     CMP #$b5
  $85D5: C9 B5     CMP #$b5
  $85D7: C9 C6     CMP #$c6
  $85D9: C9 D1     CMP #$d1
  $85DB: C9 DE     CMP #$de
  $85DD: C9 E3     CMP #$e3
  $85DF: C9 E8     CMP #$e8
  $85E1: C9 ED     CMP #$ed
  $85E3: C9 F2     CMP #$f2
  $85E5: C9 F7     CMP #$f7
  $85E7: C9 FC     CMP #$fc
  $85E9: C9 01     CMP #$01
  $85EB: CA        DEX
  $85EC: 0B CA     ANC #$ca
  $85EE: 18        CLC
  $85EF: CA        DEX
  $85F0: 18        CLC
  $85F1: CA        DEX
  $85F2: 25 CA     AND $ca
  $85F4: 2B CA     ANC #$ca
  $85F6: 38        SEC
  $85F7: CA        DEX
  $85F8: 38        SEC
  $85F9: CA        DEX
  $85FA: 45 CA     EOR $ca
  $85FC: 54 CA     NOP $ca,X
  $85FE: 54 CA     NOP $ca,X
  $8600: 61 CA     ADC ($ca,X)
  $8602: 6E CA 7B  ROR $7bca
  $8605: CA        DEX
  $8606: 88        DEY
  $8607: CA        DEX
  $8608: 97 CA     SAX $ca,Y
  $860A: A4 CA     LDY $ca
  $860C: B1 CA     LDA ($ca),Y
  $860E: BE CA CB  LDX $cbca,Y
  $8611: CA        DEX
  $8612: D8        CLD
  $8613: CA        DEX
  $8614: E5 CA     SBC $ca
  $8616: EB CA     SBC #$ca
  $8618: F2        ???
  $8619: CA        DEX
  $861A: F2        ???
  $861B: CA        DEX
  $861C: F9 CA 00  SBC $00ca,Y
  $861F: CB 07     AXS #$07
  $8621: CB 85     AXS #$85
  $8623: 50 B8     BVC $85dd
  $8625: 21 31     AND ($31,X)
  $8627: 3C 80 85  NOP $8580,X
  $862A: 48        PHA
  $862B: 98        TYA
  $862C: 24 32     BIT $32
  $862E: 3B C0 48  RLA $48c0,Y
  $8631: AB 00     ATX #$00
  $8633: 01 32     ORA ($32,X)
  $8635: 80 85     NOP #$85
  $8637: 48        PHA
  $8638: 88        DEY
  $8639: 01 2C     ORA ($2c,X)
  $863B: 80 C0     NOP #$c0
  $863D: 18        CLC
  $863E: 98        TYA
  $863F: 01 85     ORA ($85,X)
  $8641: 2E 80 0F  ROL $0f80
  $8644: 0A        ASL A
  $8645: 80 85     NOP #$85
  $8647: 50 50     BVC $8699
  $8649: 01 33     ORA ($33,X)
  $864B: 80 85     NOP #$85
  $864D: 50 78     BVC $86c7
  $864F: 01 34     ORA ($34,X)
  $8651: 80 81     NOP #$81
  $8653: 05 85     ORA $85
  $8655: 48        PHA
  $8656: A8        TAY
  $8657: 21 38     AND ($38,X)
  $8659: 5A        NOP
  $865A: 84 85     STY $85
  $865C: 48        PHA
  $865D: 58        CLI
  $865E: 21 38     AND ($38,X)
  $8660: 5A        NOP
  $8661: 85 48     STA $48
  $8663: A8        TAY
  $8664: 21 38     AND ($38,X)
  $8666: 59 84 85  EOR $8584,Y
  $8669: 48        PHA
  $866A: 58        CLI
  $866B: 21 38     AND ($38,X)
  $866D: 59 82 85  EOR $8582,Y
  $8670: 48        PHA
  $8671: A8        TAY
  $8672: 01 38     ORA ($38,X)
  $8674: 84 85     STY $85
  $8676: 48        PHA
  $8677: 58        CLI
  $8678: 01 38     ORA ($38,X)
  $867A: 83 6F     SAX ($6f,X)
  $867C: C6 85     DEC $85
  $867E: 67 A0     RRA $a0
  $8680: 81 08     STA ($08,X)
  $8682: 28        PLP
  $8683: 85 86     STA $86
  $8685: 28        PLP
  $8686: 84 86     STY $86
  $8688: 82 80     NOP #$80
  $868A: 85 50     STA $50
  $868C: C8        INY
  $868D: 84 01     STY $01
  $868F: 35 80     AND $80,X
  $8691: 85 48     STA $48
  $8693: 78        SEI
  $8694: 84 01     STY $01
  $8696: 36 80     ROL $80,X
  $8698: 85 40     STA $40
  $869A: 78        SEI
  $869B: 01 3A     ORA ($3a,X)
  $869D: 80 85     NOP #$85
  $869F: 40        RTI
  $86A0: 78        SEI
  $86A1: 21 63     AND ($63,X)
  $86A3: 5F 21 62  SRE $6221,X
  $86A6: 5F 21 65  SRE $6521,X
  $86A9: 5F 21 64  SRE $6421,X
  $86AC: 5F 21 61  SRE $6121,X
  $86AF: 5F C0 44  SRE $44c0,X
  $86B2: 74 02     NOP $02,X
  $86B4: 21 60     AND ($60,X)
  $86B6: 5F 80 C0  SRE $c080,X
  $86B9: 68        PLA
  $86BA: C0 3A     CPY #$3a
  $86BC: 80 85     NOP #$85
  $86BE: 30 B0     BMI $8670
  $86C0: C0 28     CPY #$28
  $86C2: 10 19     BPL $86dd
  $86C4: 21 6D     AND ($6d,X)
  $86C6: 6C 80 85  JMP ($8580)
  $86C9: 4F 7F 05  SRE $057f
  $86CC: 2D 80 85  AND $8580
  $86CF: 4F 7F 05  SRE $057f
  $86D2: 2D 05 2E  AND $2e05
  $86D5: 01 2F     ORA ($2f,X)
  $86D7: 80 85     NOP #$85
  $86D9: 50 88     BVC $8663
  $86DB: 01 1C     ORA ($1c,X)
  $86DD: 80 C0     NOP #$c0
  $86DF: 28        PLP
  $86E0: 80 1D     NOP #$1d
  $86E2: 80 C0     NOP #$c0
  $86E4: 1B 18 06  SLO $0618,Y
  $86E7: 85 48     STA $48
  $86E9: A0 01     LDY #$01
  $86EB: 49 80     EOR #$80
  $86ED: 81 04     STA ($04,X)
  $86EF: 85 48     STA $48
  $86F1: A0 44     LDY #$44
  $86F3: 49 4C     EOR #$4c
  $86F5: 5B 44 49  SRE $4944,Y
  $86F8: 4C 4A 82  JMP $824a
  $86FB: 21 49     AND ($49,X)
  $86FD: 4C 80 85  JMP $8580
  $8700: 38        SEC
  $8701: A8        TAY
  $8702: C0 1B     CPY #$1b
  $8704: 18        CLC
  $8705: 1A        NOP
  $8706: 01 49     ORA ($49,X)
  $8708: 80 85     NOP #$85
  $870A: 4E 90 01  LSR $0190
  $870D: 30 80     BMI $868f
  $870F: C0 20     CPY #$20
  $8711: 08        PHP
  $8712: 17 85     SLO $85,X
  $8714: 48        PHA
  $8715: 88        DEY
  $8716: 3E 5E 48  ROL $485e,X
  $8719: 22        ???
  $871A: 5D 48 22  EOR $2248,X
  $871D: 47 48     SRE $48
  $871F: C0 20     CPY #$20
  $8721: B0 12     BCS $8735
  $8723: 21 5E     AND ($5e,X)
  $8725: 48        PHA
  $8726: 80 C0     NOP #$c0
  $8728: 20 08 18  JSR $1808
  $872B: 85 48     STA $48
  $872D: 88        DEY
  $872E: 21 5E     AND ($5e,X)
  $8730: 48        PHA
  $8731: 80 C0     NOP #$c0
  $8733: 38        SEC
  $8734: D8        CLD
  $8735: 3D 80 C0  AND $c080,X
  $8738: 28        PLP
  $8739: F8        SED
  $873A: 0C 85 50  NOP $5085
  $873D: 68        PLA
  $873E: 14 01     NOP $01,X
  $8740: 81 02     STA ($02,X)
  $8742: 42        ???
  $8743: 09 07     ORA #$07
  $8745: 01 42     ORA ($42,X)
  $8747: 09 08     ORA #$08
  $8749: 01 82     ORA ($82,X)
  $874B: 21 09     AND ($09,X)
  $874D: 01 80     ORA ($80,X)
  $874F: C0 58     CPY #$58
  $8751: E0 1F     CPX #$1f
  $8753: 80 C0     NOP #$c0
  $8755: 30 08     BMI $875f
  $8757: 0D 85 58  ORA $5885
  $875A: 78        SEI
  $875B: 01 03     ORA ($03,X)
  $875D: 80 C0     NOP #$c0
  $875F: 50 08     BVC $8769
  $8761: 0F 85 50  SLO $5085
  $8764: 78        SEI
  $8765: 01 03     ORA ($03,X)
  $8767: 80 C0     NOP #$c0
  $8769: 40        RTI
  $876A: 78        SEI
  $876B: 10 85     BPL $86f2
  $876D: 50 78     BVC $87e7
  $876F: 01 03     ORA ($03,X)
  $8771: 80 85     NOP #$85
  $8773: 4E 88 21  LSR $2188
  $8776: 00        BRK
  $8777: 58        CLI
  $8778: 80 85     NOP #$85
  $877A: 40        RTI
  $877B: 98        TYA
  $877C: 81 03     STA ($03,X)
  $877E: 21 54     AND ($54,X)
  $8780: 4F 21 55  SRE $5521
  $8783: 4F 21 52  SRE $5221
  $8786: 4F 21 53  SRE $5321
  $8789: 4F 82 21  SRE $2182
  $878C: 51 4F     EOR ($4f),Y
  $878E: 80 85     NOP #$85
  $8790: 48        PHA
  $8791: 70 01     BVS $8794
  $8793: 04 80     NOP $80
  $8795: 85 50     STA $50
  $8797: 80 01     NOP #$01
  $8799: 05 80     ORA $80
  $879B: 85 50     STA $50
  $879D: 80 01     NOP #$01
  $879F: 06 80     ASL $80
  $87A1: C0 38     CPY #$38
  $87A3: A0 2C     LDY #$2c
  $87A5: 80 C0     NOP #$c0
  $87A7: 20 C0 3E  JSR $3ec0
  $87AA: 80 85     NOP #$85
  $87AC: 48        PHA
  $87AD: 98        TYA
  $87AE: 41 29     EOR ($29,X)
  $87B0: 22        ???
  $87B1: 75 80     ADC $80,X
  $87B3: 85 57     STA $57
  $87B5: 80 01     NOP #$01
  $87B7: 2A        ROL A
  $87B8: 80 85     NOP #$85
  $87BA: 57 80     SRE $80,X
  $87BC: 01 2B     ORA ($2b,X)
  $87BE: 80 85     NOP #$85
  $87C0: 40        RTI
  $87C1: 80 45     NOP #$45
  $87C3: 25 1D     AND $1d
  $87C5: 21 45     AND ($45,X)
  $87C7: 26 1E     ROL $1e
  $87C9: 23 25     RLA ($25,X)
  $87CB: 27 1F     RLA $1f
  $87CD: 45 28     EOR $28
  $87CF: 20 24 83  JSR $8324
  $87D2: C2 C7     NOP #$c7
  $87D4: C0 18     CPY #$18
  $87D6: D8        CLD
  $87D7: 41 80     EOR ($80,X)
  $87D9: 85 40     STA $40
  $87DB: 40        RTI
  $87DC: C0 00     CPY #$00
  $87DE: 00        BRK
  $87DF: 46 46     LSR $46
  $87E1: 28        PLP
  $87E2: 20 24 45  JSR $4524
  $87E5: 25 1D     AND $1d
  $87E7: 21 45     AND ($45,X)
  $87E9: 26 1E     ROL $1e
  $87EB: 23 24     RLA ($24,X)
  $87ED: 27 1F     RLA $1f
  $87EF: 43 28     SRE ($28,X)
  $87F1: 20 24 43  JSR $4324
  $87F4: 25 1D     AND $1d
  $87F6: 21 83     AND ($83,X)
  $87F8: C6 C7     DEC $c7
  $87FA: 85 40     STA $40
  $87FC: 48        PHA
  $87FD: 47 25     SRE $25
  $87FF: 1D 21 C0  ORA $c021,X
  $8802: 68        PLA
  $8803: 50 1C     BVC $8821
  $8805: 14 02     NOP $02,X
  $8807: 83 C6     SAX ($c6,X)
  $8809: C7 85     DCP $85
  $880B: 47 80     SRE $80
  $880D: 01 68     ORA ($68,X)
  $880F: 80 C0     NOP #$c0
  $8811: 00        BRK
  $8812: 00        BRK
  $8813: 3C 81 02  NOP $0281,X
  $8816: 21 63     AND ($63,X)
  $8818: 5F 21 62  SRE $6221,X
  $881B: 5F 21 65  SRE $6521,X
  $881E: 5F 21 64  SRE $6421,X
  $8821: 5F 82 21  SRE $2182,X
  $8824: 61 5F     ADC ($5f,X)
  $8826: 80 85     NOP #$85
  $8828: 40        RTI
  $8829: 40        RTI
  $882A: C0 00     CPY #$00
  $882C: 00        BRK
  $882D: 44 25     NOP $25
  $882F: 1D 21 25  ORA $2521,X
  $8832: 1E 23 25  ASL $2523,X
  $8835: 1F 22 25  SLO $2522,X
  $8838: 20 24 83  JSR $8324
  $883B: 2E C8 85  ROL $85c8
  $883E: 67 A0     RRA $a0
  $8840: 81 08     STA ($08,X)
  $8842: 28        PLP
  $8843: 96 97     STX $97,Y
  $8845: 28        PLP
  $8846: 95 97     STA $97,X
  $8848: 82 80     NOP #$80
  $884A: C0 68     CPY #$68
  $884C: 08        PHP
  $884D: 0E 85 50  ASL $5085
  $8850: 78        SEI
  $8851: 01 03     ORA ($03,X)
  $8853: 80 C0     NOP #$c0
  $8855: 60        RTS
  $8856: A0 20     LDY #$20
  $8858: 80 85     NOP #$85
  $885A: 40        RTI
  $885B: DB C0 00  DCP $00c0,Y
  $885E: 00        BRK
  $885F: 45 83     EOR $83
  $8861: 2E C8 85  ROL $85c8
  $8864: 40        RTI
  $8865: A8        TAY
  $8866: C0 00     CPY #$00
  $8868: 00        BRK
  $8869: 04 83     NOP $83
  $886B: 2E C8 85  ROL $85c8
  $886E: 50 80     BVC $87f0
  $8870: 08        PHP
  $8871: 00        BRK
  $8872: C0 40     CPY #$40
  $8874: 78        SEI
  $8875: 1E 80 85  ASL $8580,X
  $8878: 40        RTI
  $8879: 30 C0     BMI $883b
  $887B: 00        BRK
  $887C: 00        BRK
  $887D: 07 43     SLO $43
  $887F: 25 1D     AND $1d
  $8881: 21 43     AND ($43,X)
  $8883: 26 1E     ROL $1e
  $8885: 23 23     RLA ($23,X)
  $8887: 27 1F     RLA $1f
  $8889: 43 28     SRE ($28,X)
  $888B: 20 24 83  JSR $8324
  $888E: 7E C8 85  ROR $85c8,X
  $8891: 4F 88 01  SRE $0188
  $8894: 00        BRK
  $8895: 80 85     NOP #$85
  $8897: 40        RTI
  $8898: A8        TAY
  $8899: 2F 0B 0C  RLA $0c0b
  $889C: 44 0F     NOP $0f
  $889E: 0D 0B C0  ORA $c00b
  $88A1: 40        RTI
  $88A2: 88        DEY
  $88A3: 15 21     ORA $21,X
  $88A5: 0D 0B 80  ORA $800b
  $88A8: 85 40     STA $40
  $88AA: A8        TAY
  $88AB: 41 25     EOR ($25,X)
  $88AD: 1D 21 83  ORA $8321,X
  $88B0: C2 C7     NOP #$c7
  $88B2: 80 85     NOP #$85
  $88B4: 67 A0     RRA $a0
  $88B6: 81 08     STA ($08,X)
  $88B8: 28        PLP
  $88B9: A0 A1     LDY #$a1
  $88BB: 28        PLP
  $88BC: 9F A1 82  ??? $82a1,Y
  $88BF: 80 85     NOP #$85
  $88C1: 53 80     SRE ($80),Y
  $88C3: 21 3F     AND ($3f,X)
  $88C5: 3D 80 85  AND $8580,X
  $88C8: 4C 70 84  JMP $8470
  $88CB: C0 68     CPY #$68
  $88CD: 78        SEI
  $88CE: 35 01     AND $01,X
  $88D0: 3E 80 85  ROL $8580,X
  $88D3: 50 80     BVC $8855
  $88D5: 01 76     ORA ($76,X)
  $88D7: 80 C0     NOP #$c0
  $88D9: 68        PLA
  $88DA: C0 3B     CPY #$3b
  $88DC: 80 C0     NOP #$c0
  $88DE: 1C 8C 03  NOP $038c,X
  $88E1: 85 50     STA $50
  $88E3: 70 14     BVS $88f9
  $88E5: 39 01 45  AND $4501,Y
  $88E8: 01 43     ORA ($43,X)
  $88EA: C0 40     CPY #$40
  $88EC: 78        SEI
  $88ED: 11 01     ORA ($01),Y
  $88EF: 39 80 85  AND $8580,Y
  $88F2: 47 88     SRE $88
  $88F4: 01 69     ORA ($69,X)
  $88F6: 80 85     NOP #$85
  $88F8: 47 88     SRE $88
  $88FA: 01 6A     ORA ($6a,X)
  $88FC: 80 85     NOP #$85
  $88FE: 67 A0     RRA $a0
  $8900: 21 7A     AND ($7a,X)
  $8902: 7C 80 C0  NOP $c080,X
  $8905: 40        RTI
  $8906: D8        CLD
  $8907: 3F 80 C0  RLA $c080,X
  $890A: 20 94 21  JSR $2194
  $890D: 80 85     NOP #$85
  $890F: 67 A0     RRA $a0
  $8911: 01 4B     ORA ($4b,X)
  $8913: 80 C0     NOP #$c0
  $8915: 70 B8     BVS $88cf
  $8917: 22        ???
  $8918: 80 C0     NOP #$c0
  $891A: 60        RTS
  $891B: D8        CLD
  $891C: 40        RTI
  $891D: 80 C0     NOP #$c0
  $891F: 18        CLC
  $8920: 80 23     NOP #$23
  $8922: 80 C0     NOP #$c0
  $8924: 70 D0     BVS $88f6
  $8926: 24 80     BIT $80
  $8928: C0 60     CPY #$60
  $892A: E0 25     CPX #$25
  $892C: 80 C0     NOP #$c0
  $892E: 48        PHA
  $892F: C0 26     CPY #$26
  $8931: 80 C0     NOP #$c0
  $8933: 58        CLI
  $8934: E0 27     CPX #$27
  $8936: 80 C0     NOP #$c0
  $8938: 18        CLC
  $8939: A0 28     LDY #$28
  $893B: 80 C0     NOP #$c0
  $893D: 68        PLA
  $893E: D8        CLD
  $893F: 29 80     AND #$80
  $8941: C0 68     CPY #$68
  $8943: 80 2A     NOP #$2a
  $8945: 80 C0     NOP #$c0
  $8947: 28        PLP
  $8948: D8        CLD
  $8949: 2B 80     ANC #$80
  $894B: C0 50     CPY #$50
  $894D: E0 42     CPX #$42
  $894F: 80 C0     NOP #$c0
  $8951: 48        PHA
  $8952: 88        DEY
  $8953: 39 80 C0  AND $c080,Y
  $8956: 60        RTS
  $8957: D8        CLD
  $8958: 33 80     RLA ($80),Y
  $895A: C0 50     CPY #$50
  $895C: C8        INY
  $895D: 34 80     NOP $80,X
  $895F: C0 38     CPY #$38
  $8961: E0 43     CPX #$43
  $8963: 80 C0     NOP #$c0
  $8965: 48        PHA
  $8966: 88        DEY
  $8967: 13 80     SLO ($80),Y
  $8969: C0 60     CPY #$60
  $896B: D8        CLD
  $896C: 37 80     RLA $80,X
  $896E: C0 48     CPY #$48
  $8970: 88        DEY
  $8971: 1B 80 C0  SLO $c080,Y
  $8974: 30 D8     BMI $894e
  $8976: 38        SEC
  $8977: 80 85     NOP #$85
  $8979: 47 80     SRE $80
  $897B: 01 67     ORA ($67,X)
  $897D: 80 C0     NOP #$c0
  $897F: 40        RTI
  $8980: 80 14     NOP #$14
  $8982: 84 85     STY $85
  $8984: 50 80     BVC $8906
  $8986: 01 03     ORA ($03,X)
  $8988: 80 C0     NOP #$c0
  $898A: 40        RTI
  $898B: 80 14     NOP #$14
  $898D: 83 83     SAX ($83,X)
  $898F: C9 85     CMP #$85
  $8991: 48        PHA
  $8992: A0 42     LDY #$42
  $8994: 70 6F     BVS $8a05
  $8996: 6C 42 71  JMP ($7142)
  $8999: 6F 6C 42  RRA $426c
  $899C: 72        ???
  $899D: 6F 6C 42  RRA $426c
  $89A0: 73 6F     RRA ($6f),Y
  $89A2: 6C C0 60  JMP ($60c0)
  $89A5: 90 05     BCC $89ac
  $89A7: 21 6D     AND ($6d,X)
  $89A9: 6C 80 C0  JMP ($c080)
  $89AC: 48        PHA
  $89AD: A0 09     LDY #$09
  $89AF: 85 48     STA $48
  $89B1: A0 01     LDY #$01
  $89B3: 49 80     EOR #$80
  $89B5: 85 40     STA $40
  $89B7: A8        TAY
  $89B8: 2F 0B 0C  RLA $0c0b
  $89BB: 44 0F     NOP $0f
  $89BD: 0D 0B C0  ORA $c00b
  $89C0: 40        RTI
  $89C1: 88        DEY
  $89C2: 16 83     ASL $83,X
  $89C4: A4 C8     LDY $c8
  $89C6: 85 48     STA $48
  $89C8: A0 C0     LDY #$c0
  $89CA: 00        BRK
  $89CB: 00        BRK
  $89CC: 08        PHP
  $89CD: 21 60     AND ($60,X)
  $89CF: 5F 80 85  SRE $8580,X
  $89D2: 67 A0     RRA $a0
  $89D4: 81 08     STA ($08,X)
  $89D6: 28        PLP
  $89D7: 8E 8F 28  STX $288f
  $89DA: 8B 8F     XAA #$8f
  $89DC: 82 80     NOP #$80
  $89DE: C0 68     CPY #$68
  $89E0: D8        CLD
  $89E1: 2D 80 C0  AND $c080
  $89E4: 68        PLA
  $89E5: 80 2E     NOP #$2e
  $89E7: 80 C0     NOP #$c0
  $89E9: 28        PLP
  $89EA: D8        CLD
  $89EB: 2F 80 C0  RLA $c080
  $89EE: 48        PHA
  $89EF: 88        DEY
  $89F0: 39 80 C0  AND $c080,Y
  $89F3: 68        PLA
  $89F4: D8        CLD
  $89F5: 30 80     BMI $8977
  $89F7: C0 68     CPY #$68
  $89F9: 80 31     NOP #$31
  $89FB: 80 C0     NOP #$c0
  $89FD: 28        PLP
  $89FE: D8        CLD
  $89FF: 32        ???
  $8A00: 80 85     NOP #$85
  $8A02: 4C 90 C0  JMP $c090
  $8A05: 68        PLA
  $8A06: 78        SEI
  $8A07: 36 01     ROL $01,X
  $8A09: 3E 80 85  ROL $8580,X
  $8A0C: 67 A0     RRA $a0
  $8A0E: 81 08     STA ($08,X)
  $8A10: 28        PLP
  $8A11: 9C 9D 28  SHY $289d,X
  $8A14: 9B 9D 82  TAS $829d,Y
  $8A17: 80 85     NOP #$85
  $8A19: 67 A0     RRA $a0
  $8A1B: 81 08     STA ($08,X)
  $8A1D: 28        PLP
  $8A1E: 7E 7F 28  ROR $287f,X
  $8A21: 7D 7F 82  ADC $827f,X
  $8A24: 80 85     NOP #$85
  $8A26: 67 A0     RRA $a0
  $8A28: 01 6B     ORA ($6b,X)
  $8A2A: 80 85     NOP #$85
  $8A2C: 67 A0     RRA $a0
  $8A2E: 81 08     STA ($08,X)
  $8A30: 28        PLP
  $8A31: 9C 9D 28  SHY $289d,X
  $8A34: 9B 9D 82  TAS $829d,Y
  $8A37: 80 85     NOP #$85
  $8A39: 67 A0     RRA $a0
  $8A3B: 81 08     STA ($08,X)
  $8A3D: 28        PLP
  $8A3E: 99 9A 28  STA $289a,Y
  $8A41: 98        TYA
  $8A42: 9A        TXS
  $8A43: 82 80     NOP #$80
  $8A45: 85 67     STA $67
  $8A47: A0 81     LDY #$81
  $8A49: 08        PHP
  $8A4A: 48        PHA
  $8A4B: 8C 8D 8A  STY $8a8d
  $8A4E: 48        PHA
  $8A4F: 8B 8D     XAA #$8d
  $8A51: 8A        TXA
  $8A52: 82 80     NOP #$80
  $8A54: 85 67     STA $67
  $8A56: A0 81     LDY #$81
  $8A58: 08        PHP
  $8A59: 28        PLP
  $8A5A: A3 A4     LAX ($a4,X)
  $8A5C: 28        PLP
  $8A5D: A2 A4     LDX #$a4
  $8A5F: 82 80     NOP #$80
  $8A61: 85 67     STA $67
  $8A63: A0 81     LDY #$81
  $8A65: 08        PHP
  $8A66: 28        PLP
  $8A67: 93 94     ??? ($94),Y
  $8A69: 28        PLP
  $8A6A: 8B 94     XAA #$94
  $8A6C: 82 80     NOP #$80
  $8A6E: 85 67     STA $67
  $8A70: A0 81     LDY #$81
  $8A72: 08        PHP
  $8A73: 28        PLP
  $8A74: 78        SEI
  $8A75: 79 28 77  ADC $7728,Y
  $8A78: 79 82 80  ADC $8082,Y
  $8A7B: 85 67     STA $67
  $8A7D: A0 81     LDY #$81
  $8A7F: 08        PHP
  $8A80: 28        PLP
  $8A81: 9C 9E 28  SHY $289e,X
  $8A84: 9B 9E 82  TAS $829e,Y
  $8A87: 80 85     NOP #$85
  $8A89: 67 A0     RRA $a0
  $8A8B: 81 08     STA ($08,X)
  $8A8D: 48        PHA
  $8A8E: 88        DEY
  $8A8F: 89 8A     NOP #$8a
  $8A91: 48        PHA
  $8A92: 87 89     SAX $89
  $8A94: 8A        TXA
  $8A95: 82 80     NOP #$80
  $8A97: 85 67     STA $67
  $8A99: A0 81     LDY #$81
  $8A9B: 08        PHP
  $8A9C: 28        PLP
  $8A9D: A6 37     LDX $37
  $8A9F: 28        PLP
  $8AA0: A5 37     LDA $37
  $8AA2: 82 80     NOP #$80
  $8AA4: 85 67     STA $67
  $8AA6: A0 81     LDY #$81
  $8AA8: 08        PHP
  $8AA9: 28        PLP
  $8AAA: 82 83     NOP #$83
  $8AAC: 28        PLP
  $8AAD: 81 83     STA ($83,X)
  $8AAF: 82 80     NOP #$80
  $8AB1: 85 67     STA $67
  $8AB3: A0 81     LDY #$81
  $8AB5: 08        PHP
  $8AB6: 28        PLP
  $8AB7: 78        SEI
  $8AB8: 79 28 77  ADC $7728,Y
  $8ABB: 79 82 80  ADC $8082,Y
  $8ABE: 85 67     STA $67
  $8AC0: A0 81     LDY #$81
  $8AC2: 08        PHP
  $8AC3: 28        PLP
  $8AC4: 78        SEI
  $8AC5: 80 28     NOP #$28
  $8AC7: 77 80     RRA $80,X
  $8AC9: 82 80     NOP #$80
  $8ACB: 85 67     STA $67
  $8ACD: A0 81     LDY #$81
  $8ACF: 08        PHP
  $8AD0: 28        PLP
  $8AD1: 7B 7C 28  RRA $287c,Y
  $8AD4: 7A        NOP
  $8AD5: 7C 82 80  NOP $8082,X
  $8AD8: 85 67     STA $67
  $8ADA: A0 81     LDY #$81
  $8ADC: 08        PHP
  $8ADD: 28        PLP
  $8ADE: 91 92     STA ($92),Y
  $8AE0: 28        PLP
  $8AE1: 90 92     BCC $8a75
  $8AE3: 82 80     NOP #$80
  $8AE5: 85 48     STA $48
  $8AE7: A0 83     LDY #$83
  $8AE9: 00        BRK
  $8AEA: C9 85     CMP #$85
  $8AEC: 48        PHA
  $8AED: A0 21     LDY #$21
  $8AEF: 90 92     BCC $8a83
  $8AF1: 80 85     NOP #$85
  $8AF3: 48        PHA
  $8AF4: A0 21     LDY #$21
  $8AF6: A2 A4     LDX #$a4
  $8AF8: 80 85     NOP #$85
  $8AFA: 48        PHA
  $8AFB: A0 21     LDY #$21
  $8AFD: 9B 9E 80  TAS $809e,Y
  $8B00: 85 48     STA $48
  $8B02: A0 21     LDY #$21
  $8B04: A5 37     LDA $37
  $8B06: 80 85     NOP #$85
  $8B08: 48        PHA
  $8B09: A0 01     LDY #$01
  $8B0B: 40        RTI
  $8B0C: 80 00     NOP #$00
  $8B0E: FF 01 FF  ISB $ff01,X
  $8B11: 02        ???
  $8B12: FF 03 FF  ISB $ff03,X
  $8B15: FF 0B 05  ISB $050b,X
  $8B18: FF 06 FF  ISB $ff06,X
  $8B1B: FF 08 FF  ISB $ff08,X
  $8B1E: 04 09     NOP $09
  $8B20: FF 0A FF  ISB $ff0a,X
  $8B23: 0B FF     ANC #$ff
  $8B25: 0C FF 0D  NOP $0dff
  $8B28: FF 0E FF  ISB $ff0e,X
  $8B2B: 0F FF 10  SLO $10ff
  $8B2E: FF 11 FF  ISB $ff11,X
  $8B31: 12        ???
  $8B32: FF 13 FF  ISB $ff13,X
  $8B35: 14 FF     NOP $ff,X
  $8B37: 15 FF     ORA $ff,X
  $8B39: 16 FF     ASL $ff,X
  $8B3B: 17 FF     SLO $ff,X
  $8B3D: 18        CLC
  $8B3E: FF 19 00  ISB $0019,X
  $8B41: 1A        NOP
  $8B42: 01 1B     ORA ($1b,X)
  $8B44: FF 1C 05  ISB $051c,X
  $8B47: 1D FF 1E  ORA $1eff,X
  $8B4A: FF 1F FF  ISB $ff1f,X
  $8B4D: 20 FF 21  JSR $21ff
  $8B50: FF 22 FF  ISB $ff22,X
  $8B53: 23 FF     RLA ($ff,X)
  $8B55: 24 FF     BIT $ff
  $8B57: 25 FF     AND $ff
  $8B59: 26 FF     ROL $ff
  $8B5B: 27 FF     RLA $ff
  $8B5D: 28        PLP
  $8B5E: FF 29 FF  ISB $ff29,X
  $8B61: 2A        ROL A
  $8B62: FF 2B FF  ISB $ff2b,X
  $8B65: 2C FF 2D  BIT $2dff
  $8B68: FF 2E FF  ISB $ff2e,X
  $8B6B: 2F FF 30  RLA $30ff
  $8B6E: FF 31 FF  ISB $ff31,X
  $8B71: 32        ???
  $8B72: FF 33 FF  ISB $ff33,X
  $8B75: 34 FF     NOP $ff,X
  $8B77: 35 09     AND $09,X
  $8B79: 35 0A     AND $0a,X
  $8B7B: 36 FF     ROL $ff,X
  $8B7D: 37 FF     RLA $ff,X
  $8B7F: 38        SEC
  $8B80: FF 39 FF  ISB $ff39,X
  $8B83: 3A        NOP
  $8B84: FF FF 03  ISB $03ff,X
  $8B87: 3C FF 3D  NOP $3dff,X
  $8B8A: FF 3E FF  ISB $ff3e,X
  $8B8D: 3B FF 08  RLA $08ff,Y
  $8B90: FF 04 FF  ISB $ff04,X
  $8B93: 07 FF     SLO $ff
  $8B95: FF 06 FF  ISB $ff06,X
  $8B98: 07 FF     SLO $ff
  $8B9A: 02        ???
  $8B9B: 19 CC 21  ORA $21cc,Y
  $8B9E: CC 2E CC  CPY $cc2e
  $8BA1: 36 CC     ROL $cc,X
  $8BA3: 13 CE     SLO ($ce),Y
  $8BA5: 46 CC     LSR $cc
  $8BA7: 4E CC 23  LSR $23cc
  $8BAA: CE 06 CE  DEC $ce06
  $8BAD: 56 CC     LSR $cc,X
  $8BAF: 5E CC 66  LSR $66cc,X
  $8BB2: CC 6E CC  CPY $cc6e
  $8BB5: 76 CC     ROR $cc,X
  $8BB7: 7E CC 86  ROR $86cc,X
  $8BBA: CC 93 CC  CPY $cc93
  $8BBD: 3E CC BB  ROL $bbcc,X
  $8BC0: CC 2B CE  CPY $ce2b
  $8BC3: 9B CC A3  TAS $a3cc,Y
  $8BC6: CC AB CC  CPY $ccab
  $8BC9: B3 CC     LAX ($cc),Y
  $8BCB: C3 CC     DCP ($cc,X)
  $8BCD: CB CC     AXS #$cc
  $8BCF: D3 CC     DCP ($cc),Y
  $8BD1: 33 CE     RLA ($ce),Y
  $8BD3: DB CC E3  DCP $e3cc,Y
  $8BD6: CC F0 CC  CPY $ccf0
  $8BD9: F7 CC     ISB $cc,X
  $8BDB: FE CC 05  INC $05cc,X
  $8BDE: CD 0C CD  CMP $cd0c
  $8BE1: 13 CD     SLO ($cd),Y
  $8BE3: 1A        NOP
  $8BE4: CD 2B CD  CMP $cd2b
  $8BE7: 32        ???
  $8BE8: CD 3E CD  CMP $cd3e
  $8BEB: 45 CD     EOR $cd
  $8BED: 4C CD 53  JMP $53cd
  $8BF0: CD 5A CD  CMP $cd5a
  $8BF3: 61 CD     ADC ($cd,X)
  $8BF5: 68        PLA
  $8BF6: CD 6F CD  CMP $cd6f
  $8BF9: 76 CD     ROR $cd,X
  $8BFB: 7D CD 86  ADC $86cd,X
  $8BFE: CD 8F CD  CMP $cd8f
  $8C01: 98        TYA
  $8C02: CD A1 CD  CMP $cda1
  $8C05: AA        TAX
  $8C06: CD B1 CD  CMP $cdb1
  $8C09: B9 CD C1  LDA $c1cd,Y
  $8C0C: CD C8 CD  CMP $cdc8
  $8C0F: CF CD F5  DCP $f5cd
  $8C12: CD D6 CD  CMP $cdd6
  $8C15: E2 CD     NOP #$cd
  $8C17: EE CD FC  INC $fccd
  $8C1A: 3C 10 99  NOP $9910,X
  $8C1D: FA        NOP
  $8C1E: 74 FD     NOP $fd,X
  $8C20: F0 FC     BEQ $8c1e
  $8C22: 66 0F     ROR $0f
  $8C24: 22        ???
  $8C25: 02        ???
  $8C26: EF FE 14  ISB $14fe
  $8C29: 99 02 99  STA $9902,Y
  $8C2C: 05 F0     ORA $f0
  $8C2E: FC 46 14  NOP $1446,X
  $8C31: 00        BRK
  $8C32: 00        BRK
  $8C33: 66 06     ROR $06
  $8C35: F0 FC     BEQ $8c33
  $8C37: 50 14     BVC $8c4d
  $8C39: CC 01 00  CPY $0001
  $8C3C: FF F0 FC  ISB $fcf0,X
  $8C3F: 50 0F     BVC $8c50
  $8C41: 77 03     RRA $03,X
  $8C43: 77 03     RRA $03,X
  $8C45: F0 FC     BEQ $8c43
  $8C47: 6E 14 CD  ROR $cd14
  $8C4A: FC 66 FE  NOP $fe66,X
  $8C4D: F0 FC     BEQ $8c4b
  $8C4F: 4C 1E 80  JMP $801e
  $8C52: 01 80     ORA ($80,X)
  $8C54: 04 F0     NOP $f0
  $8C56: FC 4C 1E  NOP $1e4c,X
  $8C59: 1A        NOP
  $8C5A: FD 9A FE  SBC $fe9a,X
  $8C5D: F0 FC     BEQ $8c5b
  $8C5F: 0E 0F CD  ASL $cd0f
  $8C62: FC CD FC  NOP $fccd,X
  $8C65: F0 FC     BEQ $8c63
  $8C67: 0E 1E CD  ASL $cd1e
  $8C6A: FE 66 FC  INC $fc66,X
  $8C6D: F0 FC     BEQ $8c6b
  $8C6F: 74 14     NOP $14,X
  $8C71: CC 02 00  CPY $0002
  $8C74: F9 F0 FC  SBC $fcf0,Y
  $8C77: 42        ???
  $8C78: 1E 34 FF  ASL $ff34,X
  $8C7B: 88        DEY
  $8C7C: 04 F0     NOP $f0
  $8C7E: FC 42 1E  NOP $1e42,X
  $8C81: AB FE     ATX #$fe
  $8C83: 00        BRK
  $8C84: 08        PHP
  $8C85: F0 FC     BEQ $8c83
  $8C87: 42        ???
  $8C88: 14 34     NOP $34,X
  $8C8A: FF 99 05  ISB $0599,X
  $8C8D: 80 00     NOP #$00
  $8C8F: 00        BRK
  $8C90: 00        BRK
  $8C91: 00        BRK
  $8C92: F0 FC     BEQ $8c90
  $8C94: 42        ???
  $8C95: 1E 5E FF  ASL $ff5e,X
  $8C98: 44 04     NOP $04
  $8C9A: F0 FC     BEQ $8c98
  $8C9C: 42        ???
  $8C9D: 18        CLC
  $8C9E: 56 FE     LSR $fe,X
  $8CA0: 55 03     EOR $03,X
  $8CA2: F0 FC     BEQ $8ca0
  $8CA4: 0E 14 9A  ASL $9a14
  $8CA7: FD 9A FD  SBC $fd9a,X
  $8CAA: F0 FC     BEQ $8ca8
  $8CAC: 0E 1E CD  ASL $cd1e
  $8CAF: FE 66 FC  INC $fc66,X
  $8CB2: F0 FC     BEQ $8cb0
  $8CB4: 5C 1E 00  NOP $001e,X
  $8CB7: 00        BRK
  $8CB8: 9A        TXS
  $8CB9: 05 F0     ORA $f0
  $8CBB: FC 5C 08  NOP $085c,X
  $8CBE: 00        BRK
  $8CBF: FF 00 FD  ISB $fd00,X
  $8CC2: F0 FC     BEQ $8cc0
  $8CC4: 5C 2B 00  NOP $002b,X
  $8CC7: 00        BRK
  $8CC8: 9A        TXS
  $8CC9: 05 F0     ORA $f0
  $8CCB: FC 6E 27  NOP $276e,X
  $8CCE: CD 01 33  CMP $3301
  $8CD1: 04 F0     NOP $f0
  $8CD3: FC 4C 23  NOP $234c,X
  $8CD6: 80 01     NOP #$01
  $8CD8: 80 04     NOP #$04
  $8CDA: F0 FC     BEQ $8cd8
  $8CDC: 41 14     EOR ($14,X)
  $8CDE: 00        BRK
  $8CDF: 00        BRK
  $8CE0: 66 02     ROR $02
  $8CE2: F0 FC     BEQ $8ce0
  $8CE4: 4E 28 66  LSR $6628
  $8CE7: 01 00     ORA ($00,X)
  $8CE9: 00        BRK
  $8CEA: 8C 00 00  STY $0000
  $8CED: 00        BRK
  $8CEE: 00        BRK
  $8CEF: F0 4C     BEQ $8d3d
  $8CF1: F1 00     SBC ($00),Y
  $8CF3: 00        BRK
  $8CF4: 00        BRK
  $8CF5: 00        BRK
  $8CF6: F0 04     BEQ $8cfc
  $8CF8: F1 66     SBC ($66),Y
  $8CFA: FF CD FC  ISB $fccd,X
  $8CFD: F0 08     BEQ $8d07
  $8CFF: F1 B3     SBC ($b3),Y
  $8D01: FE B3 FE  INC $feb3,X
  $8D04: F0 0C     BEQ $8d12
  $8D06: F1 9A     SBC ($9a),Y
  $8D08: 01 33     ORA ($33,X)
  $8D0A: FF F0 10  ISB $10f0,X
  $8D0D: F1 66     SBC ($66),Y
  $8D0F: FD 33 FF  SBC $ff33,X
  $8D12: F0 14     BEQ $8d28
  $8D14: F1 66     SBC ($66),Y
  $8D16: 02        ???
  $8D17: 33 FF     RLA ($ff),Y
  $8D19: F0 18     BEQ $8d33
  $8D1B: F1 66     SBC ($66),Y
  $8D1D: FE 4D FD  INC $fd4d,X
  $8D20: F1 00     SBC ($00),Y
  $8D22: 00        BRK
  $8D23: 00        BRK
  $8D24: 00        BRK
  $8D25: F1 54     SBC ($54),Y
  $8D27: 05 3A     ORA $3a
  $8D29: FE F0 1C  INC $1cf0,X
  $8D2C: F1 1A     SBC ($1a),Y
  $8D2E: FF 33 FD  ISB $fd33,X
  $8D31: F0 20     BEQ $8d53
  $8D33: F1 CD     SBC ($cd),Y
  $8D35: FF 4D FF  ISB $ff4d,X
  $8D38: F1 00     SBC ($00),Y
  $8D3A: 01 00     ORA ($00,X)
  $8D3C: FD F0 14  SBC $14f0,X
  $8D3F: F1 80     SBC ($80),Y
  $8D41: 00        BRK
  $8D42: 66 FA     ROR $fa
  $8D44: F0 14     BEQ $8d5a
  $8D46: F1 9A     SBC ($9a),Y
  $8D48: 02        ???
  $8D49: B3 FE     LAX ($fe),Y
  $8D4B: F0 14     BEQ $8d61
  $8D4D: F1 E6     SBC ($e6),Y
  $8D4F: FD 33 FA  SBC $fa33,X
  $8D52: F0 14     BEQ $8d68
  $8D54: F1 E6     SBC ($e6),Y
  $8D56: FD 00 00  SBC $0000,X
  $8D59: F0 14     BEQ $8d6f
  $8D5B: F1 1A     SBC ($1a),Y
  $8D5D: 02        ???
  $8D5E: 33 FA     RLA ($fa),Y
  $8D60: F0 3C     BEQ $8d9e
  $8D62: F1 9A     SBC ($9a),Y
  $8D64: 00        BRK
  $8D65: B3 FE     LAX ($fe),Y
  $8D67: F0 14     BEQ $8d7d
  $8D69: F1 E6     SBC ($e6),Y
  $8D6B: FD 33 FA  SBC $fa33,X
  $8D6E: F0 14     BEQ $8d84
  $8D70: F1 E6     SBC ($e6),Y
  $8D72: FD 00 00  SBC $0000,X
  $8D75: F0 14     BEQ $8d8b
  $8D77: F1 1A     SBC ($1a),Y
  $8D79: 02        ???
  $8D7A: 33 FA     RLA ($fa),Y
  $8D7C: F0 14     BEQ $8d92
  $8D7E: F2        ???
  $8D7F: 00        BRK
  $8D80: F1 E6     SBC ($e6),Y
  $8D82: FD 33 FA  SBC $fa33,X
  $8D85: F0 14     BEQ $8d9b
  $8D87: F2        ???
  $8D88: 00        BRK
  $8D89: F1 E6     SBC ($e6),Y
  $8D8B: FD 00 00  SBC $0000,X
  $8D8E: F0 14     BEQ $8da4
  $8D90: F2        ???
  $8D91: 00        BRK
  $8D92: F1 1A     SBC ($1a),Y
  $8D94: 02        ???
  $8D95: 33 FA     RLA ($fa),Y
  $8D97: F0 38     BEQ $8dd1
  $8D99: F2        ???
  $8D9A: 01 F1     ORA ($f1,X)
  $8D9C: B3 FE     LAX ($fe),Y
  $8D9E: 33 FA     RLA ($fa),Y
  $8DA0: F0 38     BEQ $8dda
  $8DA2: F2        ???
  $8DA3: 01 F1     ORA ($f1,X)
  $8DA5: CD 00 80  CMP $8000
  $8DA8: FB F0 48  ISB $48f0,Y
  $8DAB: F1 EF     SBC ($ef),Y
  $8DAD: FE 67 FE  INC $fe67,X
  $8DB0: F0 35     BEQ $8de7
  $8DB2: F1 01     SBC ($01),Y
  $8DB4: 00        BRK
  $8DB5: FF 66 FA  ISB $fa66,X
  $8DB8: F0 35     BEQ $8def
  $8DBA: F1 01     SBC ($01),Y
  $8DBC: 00        BRK
  $8DBD: 01 66     ORA ($66,X)
  $8DBF: FA        NOP
  $8DC0: F0 34     BEQ $8df6
  $8DC2: F1 00     SBC ($00),Y
  $8DC4: 00        BRK
  $8DC5: 00        BRK
  $8DC6: 00        BRK
  $8DC7: F0 40     BEQ $8e09
  $8DC9: F1 34     SBC ($34),Y
  $8DCB: FF 00 FF  ISB $ff00,X
  $8DCE: F0 40     BEQ $8e10
  $8DD0: F1 9A     SBC ($9a),Y
  $8DD2: FF 80 FE  ISB $fe80,X
  $8DD5: F0 00     BEQ $8dd7
  $8DD7: F1 44     SBC ($44),Y
  $8DD9: 00        BRK
  $8DDA: 67 FE     RRA $fe
  $8DDC: F1 11     SBC ($11),Y
  $8DDE: 01 56     ORA ($56,X)
  $8DE0: FD F0 24  SBC $24f0,X
  $8DE3: F1 80     SBC ($80),Y
  $8DE5: 00        BRK
  $8DE6: CD FE F1  CMP $f1fe
  $8DE9: 00        BRK
  $8DEA: 02        ???
  $8DEB: B4 FD     LDY $fd,X
  $8DED: F0 2C     BEQ $8e1b
  $8DEF: F1 66     SBC ($66),Y
  $8DF1: 00        BRK
  $8DF2: 67 FD     RRA $fd
  $8DF4: F0 28     BEQ $8e1e
  $8DF6: F1 9A     SBC ($9a),Y
  $8DF8: FE 9A FE  INC $fe9a,X
  $8DFB: F1 00     SBC ($00),Y
  $8DFD: 00        BRK
  $8DFE: CD FD F1  CMP $f1fd
  $8E01: 66 04     ROR $04
  $8E03: 67 F8     RRA $f8
  $8E05: F0 FC     BEQ $8e03
  $8E07: 17 1E     SLO $1e,X
  $8E09: EE 02 CD  INC $cd02
  $8E0C: FC 1D E4  NOP $e41d,X
  $8E0F: FC 72 FC  NOP $fc72,X
  $8E12: F0 30     BEQ $8e44
  $8E14: F2        ???
  $8E15: 01 F1     ORA ($f1,X)
  $8E17: 9A        TXS
  $8E18: FF 00 FE  ISB $fe00,X
  $8E1B: F2        ???
  $8E1C: 01 F1     ORA ($f1,X)
  $8E1E: 00        BRK
  $8E1F: 01 00     ORA ($00,X)
  $8E21: FC F0 35  NOP $35f0,X
  $8E24: F1 00     SBC ($00),Y
  $8E26: 80 00     NOP #$00
  $8E28: 67 FA     RRA $fa
  $8E2A: F0 35     BEQ $8e61
  $8E2C: F1 00     SBC ($00),Y
  $8E2E: 00        BRK
  $8E2F: 00        BRK
  $8E30: 00        BRK
  $8E31: 00        BRK
  $8E32: F0 35     BEQ $8e69
  $8E34: F1 01     SBC ($01),Y
  $8E36: 00        BRK
  $8E37: 00        BRK
  $8E38: 00        BRK
  $8E39: 00        BRK
  $8E3A: F0 8C     BEQ $8dc8
  $8E3C: CE 92 CE  DEC $ce92
  $8E3F: 53 CE     SRE ($ce),Y
  $8E41: 5E CE 64  LSR $64ce,X
  $8E44: CE 98 CE  DEC $ce98
  $8E47: 6F CE 75  RRA $75ce
  $8E4A: CE 7B CE  DEC $ce7b
  $8E4D: 9E CE A4  SHX $a4ce,Y
  $8E50: CE 81 CE  DEC $ce81
  $8E53: 14 00     NOP $00,X
  $8E55: 00        BRK
  $8E56: 66 FE     ROR $fe
  $8E58: 20 00 00  JSR $0000
  $8E5B: 80 03     NOP #$03
  $8E5D: 00        BRK
  $8E5E: 3C 00 00  NOP $0000,X
  $8E61: 00        BRK
  $8E62: FF 00 14  ISB $1400,X
  $8E65: 00        BRK
  $8E66: 00        BRK
  $8E67: 66 FE     ROR $fe
  $8E69: 30 00     BMI $8e6b
  $8E6B: 00        BRK
  $8E6C: 00        BRK
  $8E6D: FF 00 28  ISB $2800,X
  $8E70: 00        BRK
  $8E71: 00        BRK
  $8E72: 00        BRK
  $8E73: 03 00     SLO ($00,X)
  $8E75: 3C 00 00  NOP $0000,X
  $8E78: 80 FE     NOP #$fe
  $8E7A: 00        BRK
  $8E7B: 5A        NOP
  $8E7C: 00        BRK
  $8E7D: 00        BRK
  $8E7E: 6C 01 00  JMP ($0001)
  $8E81: 22        ???
  $8E82: 00        BRK
  $8E83: 00        BRK
  $8E84: 00        BRK
  $8E85: FD 1A 00  SBC $001a,X
  $8E88: 00        BRK
  $8E89: 00        BRK
  $8E8A: 03 00     SLO ($00,X)
  $8E8C: 27 CD     RLA $cd
  $8E8E: 00        BRK
  $8E8F: 80 FF     NOP #$ff
  $8E91: 00        BRK
  $8E92: 23 E6     RLA ($e6,X)
  $8E94: 00        BRK
  $8E95: 9A        TXS
  $8E96: FF 00 14  ISB $1400,X
  $8E99: 00        BRK
  $8E9A: 00        BRK
  $8E9B: 33 01     RLA ($01),Y
  $8E9D: 00        BRK
  $8E9E: 1E CD FF  ASL $ffcd,X
  $8EA1: 78        SEI
  $8EA2: FF 00 1E  ISB $1e00,X
  $8EA5: CD FF 88  CMP $88ff
  $8EA8: 00        BRK
  $8EA9: 00        BRK
  $8EAA: 04 04     NOP $04
  $8EAC: 04 04     NOP $04
  $8EAE: 04 04     NOP $04
  $8EB0: 05 05     ORA $05
  $8EB2: 06 06     ASL $06
  $8EB4: 08        PHP
  $8EB5: 08        PHP
  $8EB6: 0A        ASL A
  $8EB7: 0A        ASL A
  $8EB8: 0C 0C 0E  NOP $0e0c
  $8EBB: 0E 11 11  ASL $1111
  $8EBE: 14 14     NOP $14,X
  $8EC0: 18        CLC
  $8EC1: 18        CLC
  $8EC2: 1C 1C 07  NOP $071c,X
  $8EC5: 04 08     NOP $08
  $8EC7: 04 08     NOP $08
  $8EC9: 04 0A     NOP $0a
  $8ECB: 05 0C     ORA $0c
  $8ECD: 06 0F     ASL $0f
  $8ECF: 08        PHP
  $8ED0: 14 0A     NOP $0a,X
  $8ED2: 19 0C 1E  ORA $1e0c,Y
  $8ED5: 0E 23 11  ASL $1123
  $8ED8: 28        PLP
  $8ED9: 14 2D     NOP $2d,X
  $8EDB: 18        CLC
  $8EDC: 32        ???
  $8EDD: 1C D9 D0  NOP $d0d9,X
  $8EE0: 06 CF     ASL $cf
  $8EE2: 21 CF     AND ($cf,X)
  $8EE4: 34 CF     NOP $cf,X
  $8EE6: 4F CF 62  SRE $62cf
  $8EE9: CF 7D CF  DCP $cf7d
  $8EEC: 9E CF B5  SHX $b5cf,Y
  $8EEF: CF D3 CF  DCP $cfd3
  $8EF2: EB CF     SBC #$cf
  $8EF4: 08        PHP
  $8EF5: D0 23     BNE $8f1a
  $8EF7: D0 3D     BNE $8f36
  $8EF9: D0 58     BNE $8f53
  $8EFB: D0 73     BNE $8f70
  $8EFD: D0 8E     BNE $8e8d
  $8EFF: D0 A7     BNE $8ea8
  $8F01: D0 BF     BNE $8ec2
  $8F03: D0 D2     BNE $8ed7
  $8F05: D0 07     BNE $8f0e
  $8F07: 10 08     BPL $8f11
  $8F09: 11 08     ORA ($08),Y
  $8F0B: 12        ???
  $8F0C: 07 13     SLO $13
  $8F0E: 06 14     ASL $14
  $8F10: 05 15     ORA $15
  $8F12: 04 16     NOP $16
  $8F14: 04 17     NOP $17
  $8F16: 03 18     SLO ($18,X)
  $8F18: 02        ???
  $8F19: 19 02 1A  ORA $1a02,Y
  $8F1C: 02        ???
  $8F1D: 1B 02 1C  SLO $1c02,Y
  $8F20: 80 06     NOP #$06
  $8F22: 12        ???
  $8F23: 06 13     ASL $13
  $8F25: 04 14     NOP $14
  $8F27: 04 15     NOP $15
  $8F29: 04 16     NOP $16
  $8F2B: 02        ???
  $8F2C: 17 02     SLO $02,X
  $8F2E: 18        CLC
  $8F2F: 01 19     ORA ($19,X)
  $8F31: 01 1A     ORA ($1a,X)
  $8F33: 80 06     NOP #$06
  $8F35: 10 06     BPL $8f3d
  $8F37: 11 06     ORA ($06),Y
  $8F39: 12        ???
  $8F3A: 06 13     ASL $13
  $8F3C: 04 14     NOP $14
  $8F3E: 04 15     NOP $15
  $8F40: 04 16     NOP $16
  $8F42: 02        ???
  $8F43: 17 02     SLO $02,X
  $8F45: 18        CLC
  $8F46: 02        ???
  $8F47: 19 01 1A  ORA $1a01,Y
  $8F4A: 01 1B     ORA ($1b,X)
  $8F4C: 01 1C     ORA ($1c,X)
  $8F4E: 80 05     NOP #$05
  $8F50: 10 05     BPL $8f57
  $8F52: 11 05     ORA ($05),Y
  $8F54: 12        ???
  $8F55: 03 13     SLO ($13,X)
  $8F57: 03 14     SLO ($14,X)
  $8F59: 03 15     SLO ($15,X)
  $8F5B: 02        ???
  $8F5C: 16 02     ASL $02,X
  $8F5E: 17 02     SLO $02,X
  $8F60: 18        CLC
  $8F61: 80 03     NOP #$03
  $8F63: 10 03     BPL $8f68
  $8F65: 11 04     ORA ($04),Y
  $8F67: 12        ???
  $8F68: 04 13     NOP $13
  $8F6A: 03 14     SLO ($14,X)
  $8F6C: 03 15     SLO ($15,X)
  $8F6E: 02        ???
  $8F6F: 16 02     ASL $02,X
  $8F71: 17 02     SLO $02,X
  $8F73: 18        CLC
  $8F74: 01 19     ORA ($19,X)
  $8F76: 01 1A     ORA ($1a,X)
  $8F78: 01 1B     ORA ($1b,X)
  $8F7A: 01 1C     ORA ($1c,X)
  $8F7C: 80 05     NOP #$05
  $8F7E: 10 05     BPL $8f85
  $8F80: 11 05     ORA ($05),Y
  $8F82: 10 05     BPL $8f89
  $8F84: 11 06     ORA ($06),Y
  $8F86: 12        ???
  $8F87: 07 13     SLO $13
  $8F89: 08        PHP
  $8F8A: 14 09     NOP $09,X
  $8F8C: 15 84     ORA $84,X
  $8F8E: 05 16     ORA $16
  $8F90: 84 04     STY $04
  $8F92: 17 03     SLO $03,X
  $8F94: 18        CLC
  $8F95: 03 19     SLO ($19,X)
  $8F97: 02        ???
  $8F98: 1A        NOP
  $8F99: 02        ???
  $8F9A: 1B 01 1C  SLO $1c01,Y
  $8F9D: 80 08     NOP #$08
  $8F9F: 10 08     BPL $8fa9
  $8FA1: 11 08     ORA ($08),Y
  $8FA3: 12        ???
  $8FA4: 0A        ASL A
  $8FA5: 13 08     SLO ($08),Y
  $8FA7: 14 05     NOP $05,X
  $8FA9: 15 04     ORA $04,X
  $8FAB: 16 03     ASL $03,X
  $8FAD: 17 02     SLO $02,X
  $8FAF: 18        CLC
  $8FB0: 02        ???
  $8FB1: 19 02 1A  ORA $1a02,Y
  $8FB4: 80 04     NOP #$04
  $8FB6: 10 04     BPL $8fbc
  $8FB8: 11 05     ORA ($05),Y
  $8FBA: 12        ???
  $8FBB: 06 13     ASL $13
  $8FBD: 07 14     SLO $14
  $8FBF: 07 15     SLO $15
  $8FC1: 02        ???
  $8FC2: 16 84     ASL $84,X
  $8FC4: 06 16     ASL $16
  $8FC6: 07 17     SLO $17
  $8FC8: 06 18     ASL $18
  $8FCA: 06 19     ASL $19
  $8FCC: 05 1A     ORA $1a
  $8FCE: 05 1B     ORA $1b
  $8FD0: 05 1C     ORA $1c
  $8FD2: 80 07     NOP #$07
  $8FD4: 10 07     BPL $8fdd
  $8FD6: 11 08     ORA ($08),Y
  $8FD8: 12        ???
  $8FD9: 0A        ASL A
  $8FDA: 13 84     SLO ($84),Y
  $8FDC: 08        PHP
  $8FDD: 14 05     NOP $05,X
  $8FDF: 15 03     ORA $03,X
  $8FE1: 16 03     ASL $03,X
  $8FE3: 17 03     SLO $03,X
  $8FE5: 18        CLC
  $8FE6: 03 19     SLO ($19,X)
  $8FE8: 03 1A     SLO ($1a,X)
  $8FEA: 80 05     NOP #$05
  $8FEC: 10 05     BPL $8ff3
  $8FEE: 11 06     ORA ($06),Y
  $8FF0: 12        ???
  $8FF1: 07 13     SLO $13
  $8FF3: 08        PHP
  $8FF4: 14 07     NOP $07,X
  $8FF6: 15 02     ORA $02,X
  $8FF8: 16 84     ASL $84,X
  $8FFA: 04 16     NOP $16
  $8FFC: 05 17     ORA $17
  $8FFE: 84 04     STY $04
  $9000: 18        CLC
  $9001: 03 19     SLO ($19,X)
  $9003: 02        ???
  $9004: 1A        NOP
  $9005: 02        ???
  $9006: 1B 80 08  SLO $0880,Y
  $9009: 10 08     BPL $9013
  $900B: 11 08     ORA ($08),Y
  $900D: 12        ???
  $900E: 0A        ASL A
  $900F: 13 08     SLO ($08),Y
  $9011: 14 04     NOP $04,X
  $9013: 15 02     ORA $02,X
  $9015: 16 02     ASL $02,X
  $9017: 17 02     SLO $02,X
  $9019: 18        CLC
  $901A: 02        ???
  $901B: 19 02 1A  ORA $1a02,Y
  $901E: 02        ???
  $901F: 1B 02 1C  SLO $1c02,Y
  $9022: 80 07     NOP #$07
  $9024: 10 07     BPL $902d
  $9026: 11 07     ORA ($07),Y
  $9028: 12        ???
  $9029: 08        PHP
  $902A: 13 07     SLO ($07),Y
  $902C: 14 84     NOP $84,X
  $902E: 05 15     ORA $15
  $9030: 03 16     SLO ($16,X)
  $9032: 03 17     SLO ($17,X)
  $9034: 03 18     SLO ($18,X)
  $9036: 03 19     SLO ($19,X)
  $9038: 03 1A     SLO ($1a,X)
  $903A: 04 1B     NOP $1b
  $903C: 80 01     NOP #$01
  $903E: 10 01     BPL $9041
  $9040: 11 01     ORA ($01),Y
  $9042: 12        ???
  $9043: 01 13     ORA ($13,X)
  $9045: 02        ???
  $9046: 14 03     NOP $03,X
  $9048: 15 03     ORA $03,X
  $904A: 16 03     ASL $03,X
  $904C: 17 03     SLO $03,X
  $904E: 18        CLC
  $904F: 03 19     SLO ($19,X)
  $9051: 03 1A     SLO ($1a,X)
  $9053: 03 1B     SLO ($1b,X)
  $9055: 03 1C     SLO ($1c,X)
  $9057: 80 03     NOP #$03
  $9059: 10 03     BPL $905e
  $905B: 11 03     ORA ($03),Y
  $905D: 12        ???
  $905E: 02        ???
  $905F: 13 02     SLO ($02),Y
  $9061: 14 02     NOP $02,X
  $9063: 15 02     ORA $02,X
  $9065: 16 02     ASL $02,X
  $9067: 17 02     SLO $02,X
  $9069: 18        CLC
  $906A: 02        ???
  $906B: 19 02 1A  ORA $1a02,Y
  $906E: 02        ???
  $906F: 1B 02 1C  SLO $1c02,Y
  $9072: 80 02     NOP #$02
  $9074: 1C 02 1B  NOP $1b02,X
  $9077: 02        ???
  $9078: 1A        NOP
  $9079: 02        ???
  $907A: 19 02 18  ORA $1802,Y
  $907D: 02        ???
  $907E: 17 04     SLO $04,X
  $9080: 16 04     ASL $04,X
  $9082: 15 08     ORA $08,X
  $9084: 14 08     NOP $08,X
  $9086: 13 08     SLO ($08),Y
  $9088: 12        ???
  $9089: 08        PHP
  $908A: 11 15     ORA ($15),Y
  $908C: 10 80     BPL $900e
  $908E: 03 1A     SLO ($1a,X)
  $9090: 03 19     SLO ($19,X)
  $9092: 03 18     SLO ($18,X)
  $9094: 03 17     SLO ($17,X)
  $9096: 03 16     SLO ($16,X)
  $9098: 06 15     ASL $15
  $909A: 09 14     ORA #$14
  $909C: 0C 13 0A  NOP $0a13
  $909F: 12        ???
  $90A0: 08        PHP
  $90A1: 11 08     ORA ($08),Y
  $90A3: 10 81     BPL $9026
  $90A5: A0 D0     LDY #$d0
  $90A7: 03 1A     SLO ($1a,X)
  $90A9: 03 19     SLO ($19,X)
  $90AB: 03 18     SLO ($18,X)
  $90AD: 03 17     SLO ($17,X)
  $90AF: 04 16     NOP $16
  $90B1: 05 15     ORA $15
  $90B3: 07 14     SLO $14
  $90B5: 84 05     STY $05
  $90B7: 13 03     SLO ($03),Y
  $90B9: 12        ???
  $90BA: 02        ???
  $90BB: 11 02     ORA ($02),Y
  $90BD: 10 80     BPL $903f
  $90BF: 02        ???
  $90C0: 1C 02 1B  NOP $1b02,X
  $90C3: 03 1A     SLO ($1a,X)
  $90C5: 04 19     NOP $19
  $90C7: 05 18     ORA $18
  $90C9: 04 17     NOP $17
  $90CB: 04 16     NOP $16
  $90CD: 03 15     SLO ($15,X)
  $90CF: 03 14     SLO ($14,X)
  $90D1: 80 08     NOP #$08
  $90D3: 56 08     LSR $08,X
  $90D5: 57 08     SRE $08,X
  $90D7: 4D 80 07  EOR $0780
  $90DA: 10 08     BPL $90e4
  $90DC: 11 08     ORA ($08),Y
  $90DE: 12        ???
  $90DF: 07 13     SLO $13
  $90E1: 84 06     STY $06
  $90E3: 14 05     NOP $05,X
  $90E5: 15 04     ORA $04,X
  $90E7: 16 04     ASL $04,X
  $90E9: 17 03     SLO $03,X
  $90EB: 18        CLC
  $90EC: 02        ???
  $90ED: 19 02 1A  ORA $1a02,Y
  $90F0: 02        ???
  $90F1: 1B 02 1C  SLO $1c02,Y
  $90F4: 80 00     NOP #$00
  $90F6: 16 0D     ASL $0d,X
  $90F8: 00        BRK
  $90F9: 02        ???
  $90FA: 03 07     SLO ($07,X)
  $90FC: 0A        ASL A
  $90FD: 00        BRK
  $90FE: 00        BRK
  $90FF: 09 0E     ORA #$0e
  $9101: 00        BRK
  $9102: 09 0F     ORA #$0f
  $9104: 07 0B     SLO $0b
  $9106: 10 01     BPL $9109
  $9108: 09 11     ORA #$11
  $910A: 05 0C     ORA $0c
  $910C: 01 07     ORA ($07,X)
  $910E: 0D 12 06  ORA $0612
  $9111: 0E 13 03  ASL $0313
  $9114: 00        BRK
  $9115: 02        ???
  $9116: 00        BRK
  $9117: 02        ???
  $9118: 14 08     NOP $08,X
  $911A: 10 15     BPL $9131
  $911C: 00        BRK
  $911D: 11 16     ORA ($16),Y
  $911F: 07 0F     SLO $0f
  $9121: 00        BRK
  $9122: 00        BRK
  $9123: 00        BRK
  $9124: 0A        ASL A
  $9125: 08        PHP
  $9126: 12        ???
  $9127: 17 07     SLO $07,X
  $9129: 13 18     SLO ($18),Y
  $912B: 07 14     SLO $14
  $912D: 19 07 0E  ORA $0e07,Y
  $9130: 1B 05 02  SLO $0205,Y
  $9133: 02        ???
  $9134: 06 0E     ASL $0e
  $9136: 1A        NOP
  $9137: 04 00     NOP $00
  $9139: 02        ???
  $913A: 00        BRK
  $913B: 15 1C     ORA $1c,X
  $913D: 06 10     ASL $10
  $913F: 01 04     ORA ($04,X)
  $9141: 0F 00 07  SLO $0700
  $9144: 02        ???
  $9145: 00        BRK
  $9146: 07 0B     SLO $0b
  $9148: 05 00     ORA $00
  $914A: 02        ???
  $914B: 01 00     ORA ($00,X)
  $914D: 00        BRK
  $914E: 02        ???
  $914F: 01 00     ORA ($00,X)
  $9151: 00        BRK
  $9152: 02        ???
  $9153: 01 08     ORA ($08,X)
  $9155: 02        ???
  $9156: 03 04     SLO ($04,X)
  $9158: 03 00     SLO ($00,X)
  $915A: 08        PHP
  $915B: 07 06     SLO $06
  $915D: 00        BRK
  $915E: 03 03     SLO ($03,X)
  $9160: 03 02     SLO ($02,X)
  $9162: 04 01     NOP $01
  $9164: 01 00     ORA ($00,X)
  $9166: 05 04     ORA $04
  $9168: 03 00     SLO ($00,X)
  $916A: 04 04     NOP $04
  $916C: 04 00     NOP $00
  $916E: 06 01     ASL $01
  $9170: 00        BRK
  $9171: 00        BRK
  $9172: 05 01     ORA $01
  $9174: 06 00     ASL $00
  $9176: 05 05     ORA $05
  $9178: 05 00     ORA $00
  $917A: 04 04     NOP $04
  $917C: 04 00     NOP $00
  $917E: 02        ???
  $917F: 01 00     ORA ($00,X)
  $9181: 00        BRK
  $9182: 01 08     ORA ($08,X)
  $9184: 00        BRK
  $9185: 02        ???
  $9186: 01 04     ORA ($04,X)
  $9188: 02        ???
  $9189: 00        BRK
  $918A: 02        ???
  $918B: 07 06     SLO $06
  $918D: 06 02     ASL $02
  $918F: 06 06     ASL $06
  $9191: 02        ???
  $9192: 05 03     ORA $03
  $9194: 04 00     NOP $00
  $9196: 02        ???
  $9197: 07 00     SLO $00
  $9199: 03 03     SLO ($03,X)
  $919B: 03 03     SLO ($03,X)
  $919D: 03 04     SLO ($04,X)
  $919F: 06 04     ASL $04
  $91A1: 00        BRK
  $91A2: 02        ???
  $91A3: 01 06     ORA ($06,X)
  $91A5: 02        ???
  $91A6: 07 07     SLO $07
  $91A8: 03 02     SLO ($02,X)
  $91AA: 02        ???
  $91AB: 05 04     ORA $04
  $91AD: 00        BRK
  $91AE: 02        ???
  $91AF: 07 06     SLO $06
  $91B1: 00        BRK
  $91B2: 0B 0B     ANC #$0b
  $91B4: 0B 00     ANC #$00
  $91B6: 03 00     SLO ($00,X)
  $91B8: 04 00     NOP $00
  $91BA: 02        ???
  $91BB: 07 00     SLO $00
  $91BD: 00        BRK
  $91BE: 0A        ASL A
  $91BF: 0A        ASL A
  $91C0: 02        ???
  $91C1: 01 05     ORA ($05,X)
  $91C3: 00        BRK
  $91C4: 00        BRK
  $91C5: 00        BRK
  $91C6: 05 01     ORA $01
  $91C8: 06 0A     ASL $0a
  $91CA: 00        BRK
  $91CB: 01 0A     ORA ($0a,X)
  $91CD: 01 00     ORA ($00,X)
  $91CF: 00        BRK
  $91D0: 04 00     NOP $00
  $91D2: 02        ???
  $91D3: 01 00     ORA ($00,X)
  $91D5: 04 0A     NOP $0a
  $91D7: 01 04     ORA ($04,X)
  $91D9: 00        BRK
  $91DA: 02        ???
  $91DB: 01 00     ORA ($00,X)
  $91DD: 00        BRK
  $91DE: 05 04     ORA $04
  $91E0: 03 00     SLO ($00,X)
  $91E2: 02        ???
  $91E3: 01 08     ORA ($08,X)
  $91E5: 02        ???
  $91E6: 06 06     ASL $06
  $91E8: 04 00     NOP $00
  $91EA: 05 07     ORA $07
  $91EC: 03 01     SLO ($01,X)
  $91EE: 01 01     ORA ($01,X)
  $91F0: 01 00     ORA ($00,X)
  $91F2: 02        ???
  $91F3: 06 00     ASL $00
  $91F5: 00        BRK
  $91F6: 02        ???
  $91F7: 01 00     ORA ($00,X)
  $91F9: 00        BRK
  $91FA: 02        ???
  $91FB: 01 08     ORA ($08,X)
  $91FD: 02        ???
  $91FE: 05 06     ORA $06
  $9200: 00        BRK
  $9201: 00        BRK
  $9202: 08        PHP
  $9203: 04 06     NOP $06
  $9205: 00        BRK
  $9206: 02        ???
  $9207: 03 03     SLO ($03,X)
  $9209: 02        ???
  $920A: 02        ???
  $920B: 01 00     ORA ($00,X)
  $920D: 00        BRK
  $920E: 05 07     ORA $07
  $9210: 06 00     ASL $00
  $9212: 09 09     ORA #$09
  $9214: 09 01     ORA #$01
  $9216: 05 06     ORA $06
  $9218: 04 00     NOP $00
  $921A: 05 07     ORA $07
  $921C: 06 0A     ASL $0a
  $921E: 0A        ASL A
  $921F: 0A        ASL A
  $9220: 0A        ASL A
  $9221: 02        ???
  $9222: 06 01     ASL $01
  $9224: 00        BRK
  $9225: 00        BRK
  $9226: 08        PHP
  $9227: 07 06     SLO $06
  $9229: 00        BRK
  $922A: 0A        ASL A
  $922B: 0B 0B     ANC #$0b
  $922D: 04 02     NOP $02
  $922F: 01 00     ORA ($00,X)
  $9231: 00        BRK
  $9232: 02        ???
  $9233: 01 00     ORA ($00,X)
  $9235: 02        ???
  $9236: 0A        ASL A
  $9237: 0C 0C 00  NOP $000c
  $923A: 02        ???
  $923B: 01 00     ORA ($00,X)
  $923D: 00        BRK
  $923E: 02        ???
  $923F: 01 00     ORA ($00,X)
  $9241: 00        BRK
  $9242: 02        ???
  $9243: 01 08     ORA ($08,X)
  $9245: FF D4 FF  ISB $ffd4,X
  $9248: D4 FF     NOP $ff,X
  $924A: 54 F5     NOP $f5,X
  $924C: 00        BRK
  $924D: FF F4 FF  ISB $fff4,X
  $9250: F0 55     BEQ $92a7
  $9252: 5C FF FD  NOP $fdff,X
  $9255: FF F0 00  ISB $00f0,X
  $9258: 55 05     EOR $05,X
  $925A: 55 80     EOR $80,X
  $925C: 00        BRK
  $925D: F8        SED
  $925E: 00        BRK
  $925F: FE AD 01  INC $01ad,X
  $9262: 55 05     EOR $05,X
  $9264: 55 80     EOR $80,X
  $9266: 00        BRK
  $9267: A0 00     LDY #$00
  $9269: FF FD 01  ISB $01fd,X
  $926C: 55 85     EOR $85,X
  $926E: 55 80     EOR $80,X
  $9270: 00        BRK
  $9271: AC 00 FF  LDY $ff00
  $9274: ED 01 55  SBC $5501
  $9277: 15 55     ORA $55,X
  $9279: 80 01     NOP #$01
  $927B: A0 01     LDY #$01
  $927D: AF FD 15  LAX $15fd
  $9280: 55 15     EOR $15,X
  $9282: 55 C0     EOR $c0,X
  $9284: 00        BRK
  $9285: F0 01     BEQ $9288
  $9287: FF AD 05  ISB $05ad,X
  $928A: 55 C5     EOR $c5,X
  $928C: 55 80     EOR $80,X
  $928E: 00        BRK
  $928F: F0 01     BEQ $9292
  $9291: FF FD 00  ISB $00fd,X
  $9294: 15 00     ORA $00,X
  $9296: 55 C0     EOR $c0,X
  $9298: 00        BRK
  $9299: F8        SED
  $929A: 00        BRK
  $929B: EA        NOP
  $929C: A1 00     LDA ($00,X)
  $929E: 55 00     EOR $00,X
  $92A0: 55 C0     EOR $c0,X
  $92A2: 00        BRK
  $92A3: A0 00     LDY #$00
  $92A5: AA        TAX
  $92A6: F0 00     BEQ $92a8
  $92A8: 55 80     EOR $80,X
  $92AA: 55 80     EOR $80,X
  $92AC: 00        BRK
  $92AD: A0 00     LDY #$00
  $92AF: AA        TAX
  $92B0: A8        TAY
  $92B1: 55 55     EOR $55,X
  $92B3: 01 55     ORA ($55,X)
  $92B5: 00        BRK
  $92B6: 00        BRK
  $92B7: FF A0 FF  ISB $ffa0,X
  $92BA: FD 55 54  SBC $5455,X
  $92BD: FD 54 FF  SBC $ff54,X
  $92C0: FF FF FF  ISB $ffff,X
  $92C3: FF FF 55  ISB $55ff,X
  $92C6: 55 E5     EOR $e5,X
  $92C8: 40        RTI
  $92C9: FE 01 FE  INC $fe01,X
  $92CC: 94 FE     STY $fe,X
  $92CE: AA        TAX
  $92CF: 50 15     BVC $92e6
  $92D1: FF 54 A0  ISB $a054,X
  $92D4: 05 AB     ORA $ab
  $92D6: FF FF FF  ISB $ffff,X
  $92D9: D0 05     BNE $92e0
  $92DB: F5 54     SBC $54,X
  $92DD: FF AA FE  ISB $feaa,X
  $92E0: A1 FF     LDA ($ff,X)
  $92E2: EA        NOP
  $92E3: 00        BRK
  $92E4: 15 00     ORA $00,X
  $92E6: 55 00     EOR $00,X
  $92E8: 05 80     ORA $80
  $92EA: 15 F0     ORA $f0,X
  $92EC: 05 55     ORA $55
  $92EE: 54 55     NOP $55,X
  $92F0: 54 F9     NOP $f9,X
  $92F2: 50 FE     BVC $92f2
  $92F4: 54 FF     NOP $ff,X
  $92F6: FF 55 54  ISB $5455,X
  $92F9: 55 54     EOR $54,X
  $92FB: E5 54     SBC $54
  $92FD: FD 54 FA  SBC $fa54,X
  $9300: B5 55     LDA $55,X
  $9302: 00        BRK
  $9303: 55 00     EOR $00,X
  $9305: 00        BRK
  $9306: 15 D5     ORA $d5,X
  $9308: 40        RTI
  $9309: FD 00 55  SBC $5500,X
  $930C: 00        BRK
  $930D: D5 50     CMP $50,X
  $930F: A0 05     LDY #$05
  $9311: AB D4     ATX #$d4
  $9313: AA        TAX
  $9314: F5 55     SBC $55,X
  $9316: 54 F5     NOP $f5,X
  $9318: 54 FA     NOP $fa,X
  $931A: 05 FE     ORA $fe
  $931C: BF FF FF  LAX $ffff,Y
  $931F: D5 40     CMP $40,X
  $9321: F5 50     SBC $50,X
  $9323: FE A8 FF  INC $ffa8,X
  $9326: FD FF FF  SBC $ffff,X
  $9329: 55 55     EOR $55,X
  $932B: 55 54     EOR $54,X
  $932D: 90 00     BCC $932f
  $932F: A0 00     LDY #$00
  $9331: A8        TAY
  $9332: 00        BRK
  $9333: 05 55     ORA $55
  $9335: 85 55     STA $55
  $9337: 00        BRK
  $9338: 05 C0     ORA $c0
  $933A: 00        BRK
  $933B: FC 09 0F  NOP $0f09,X
  $933E: 0F 0F 0F  SLO $0f0f
  $9341: 0F 0F 0F  SLO $0f0f
  $9344: 0F 16 16  SLO $1616
  $9347: 1A        NOP
  $9348: 1A        NOP
  $9349: 0F 0F 0F  SLO $0f0f
  $934C: 0F 18 18  SLO $1818
  $934F: 18        CLC
  $9350: 0F 0F 0F  SLO $0f0f
  $9353: 0F 0F 19  SLO $190f
  $9356: 19 19 19  ORA $1919,Y
  $9359: 19 19 0F  ORA $0f19,Y
  $935C: 0F 13 13  SLO $1313
  $935F: 13 13     SLO ($13),Y
  $9361: 13 13     SLO ($13),Y
  $9363: 13 0F     SLO ($0f),Y
  $9365: 18        CLC
  $9366: 18        CLC
  $9367: 18        CLC
  $9368: 18        CLC
  $9369: 18        CLC
  $936A: 1A        NOP
  $936B: 0F 0F 14  SLO $140f
  $936E: 14 14     NOP $14,X
  $9370: 14 14     NOP $14,X
  $9372: 14 18     NOP $18,X
  $9374: 0F 18 18  SLO $1818
  $9377: 19 19 1A  ORA $1a19,Y
  $937A: 1A        NOP
  $937B: 0F 0F 15  SLO $150f
  $937E: 16 17     ASL $17,X
  $9380: 18        CLC
  $9381: 19 1A 0F  ORA $0f1a,Y
  $9384: 0F 16 16  SLO $1616
  $9387: 16 16     ASL $16,X
  $9389: 16 16     ASL $16,X
  $938B: 16 0F     ASL $0f,X
  $938D: 1A        NOP
  $938E: 1A        NOP
  $938F: 1A        NOP
  $9390: 1A        NOP
  $9391: 1A        NOP
  $9392: 1A        NOP
  $9393: 1A        NOP
  $9394: 0F 19 19  SLO $1919
  $9397: 19 19 19  ORA $1919,Y
  $939A: 19 19 0F  ORA $0f19,Y
  $939D: 17 17     SLO $17,X
  $939F: 17 19     SLO $19,X
  $93A1: 19 19 18  ORA $1819,Y
  $93A4: 0F 18 18  SLO $1818
  $93A7: 18        CLC
  $93A8: 18        CLC
  $93A9: 18        CLC
  $93AA: 18        CLC
  $93AB: 0F 0F 19  SLO $190f
  $93AE: 19 19 19  ORA $1919,Y
  $93B1: 19 16 1A  ORA $1a16,Y
  $93B4: 0F 18 18  SLO $1818
  $93B7: 18        CLC
  $93B8: 18        CLC
  $93B9: 18        CLC
  $93BA: 16 1A     ASL $1a,X
  $93BC: 0F 18 18  SLO $1818
  $93BF: 18        CLC
  $93C0: 18        CLC
  $93C1: 18        CLC
  $93C2: 18        CLC
  $93C3: 18        CLC
  $93C4: 0F 15 15  SLO $1515
  $93C7: 15 15     ORA $15,X
  $93C9: 15 0F     ORA $0f,X
  $93CB: 0F 0F 19  SLO $190f
  $93CE: 19 19 19  ORA $1919,Y
  $93D1: 19 1A 1A  ORA $1a1a,Y
  $93D4: 0F 18 18  SLO $1818
  $93D7: 18        CLC
  $93D8: 18        CLC
  $93D9: 1A        NOP
  $93DA: 1A        NOP
  $93DB: 0F 0F 18  SLO $180f
  $93DE: 18        CLC
  $93DF: 18        CLC
  $93E0: 18        CLC
  $93E1: 19 19 19  ORA $1919,Y
  $93E4: 0F 18 18  SLO $1818
  $93E7: 18        CLC
  $93E8: 18        CLC
  $93E9: 18        CLC
  $93EA: 18        CLC
  $93EB: 0F 0F 19  SLO $190f
  $93EE: 19 19 19  ORA $1919,Y
  $93F1: 19 19 19  ORA $1919,Y
  $93F4: 0F 08 08  SLO $0808
  $93F7: 08        PHP
  $93F8: 18        CLC
  $93F9: 18        CLC
  $93FA: 18        CLC
  $93FB: 18        CLC
  $93FC: 0F 19 19  SLO $1919
  $93FF: 19 19 19  ORA $1919,Y
  $9402: 19 19 0F  ORA $0f19,Y
  $9405: 17 17     SLO $17,X
  $9407: 17 19     SLO $19,X
  $9409: 19 19 16  ORA $1619,Y
  $940C: 0F 18 18  SLO $1818
  $940F: 18        CLC
  $9410: 18        CLC
  $9411: 18        CLC
  $9412: 17 0F     SLO $0f,X
  $9414: 0F 18 18  SLO $1818
  $9417: 18        CLC
  $9418: 18        CLC
  $9419: 18        CLC
  $941A: 18        CLC
  $941B: 0F 0F 08  SLO $080f
  $941E: 08        PHP
  $941F: 08        PHP
  $9420: 0A        ASL A
  $9421: 0A        ASL A
  $9422: 05 07     ORA $07
  $9424: 09 00     ORA #$00
  $9426: 55 00     EOR $00,X
  $9428: 15 05     ORA $05,X
  $942A: 55 A9     EOR $a9,X
  $942C: 55 00     EOR $00,X
  $942E: 15 59     ORA $59,X
  $9430: D4 61     NOP $61,X
  $9432: D4 6F     NOP $6f,X
  $9434: D4 7A     NOP $7a,X
  $9436: D4 88     NOP $88,X
  $9438: D4 90     NOP $90,X
  $943A: D4 9E     NOP $9e,X
  $943C: D4 A9     NOP $a9,X
  $943E: D4 BD     NOP $bd,X
  $9440: D4 CB     NOP $cb,X
  $9442: D4 D6     NOP $d6,X
  $9444: D4 E1     NOP $e1,X
  $9446: D4 EF     NOP $ef,X
  $9448: D4 F7     NOP $f7,X
  $944A: D4 FF     NOP $ff,X
  $944C: D4 07     NOP $07,X
  $944E: D5 12     CMP $12,X
  $9450: D5 1D     CMP $1d,X
  $9452: D5 28     CMP $28,X
  $9454: D5 36     CMP $36,X
  $9456: D5 4D     CMP $4d,X
  $9458: D5 00     CMP $00,X
  $945A: 00        BRK
  $945B: 19 00 01  ORA $0100,Y
  $945E: 01 00     ORA ($00,X)
  $9460: 00        BRK
  $9461: 04 20     NOP $20
  $9463: FF 01 00  ISB $0001,X
  $9466: 00        BRK
  $9467: 00        BRK
  $9468: 02        ???
  $9469: 09 0C     ORA #$0c
  $946B: 03 08     SLO ($08,X)
  $946D: 0D 05 09  ORA $0905
  $9470: 13 7F     SLO ($7f),Y
  $9472: 04 04     NOP $04
  $9474: 06 08     ASL $08
  $9476: 01 03     ORA ($03,X)
  $9478: 0E 07 0C  ASL $0c07
  $947B: 6F 0C 05  RRA $050c
  $947E: 06 0A     ASL $0a
  $9480: 0A        ASL A
  $9481: 02        ???
  $9482: 08        PHP
  $9483: 0F 09 09  SLO $0909
  $9486: 10 09     BPL $9491
  $9488: 10 50     BPL $94da
  $948A: 7F 06 0C  RRA $0c06,X
  $948D: 0A        ASL A
  $948E: 0A        ASL A
  $948F: 00        BRK
  $9490: 15 07     ORA $07,X
  $9492: 01 07     ORA ($07,X)
  $9494: 0E 10 0E  ASL $0e10
  $9497: 02        ???
  $9498: 04 11     NOP $11
  $949A: 0D 08 12  ORA $1208
  $949D: 0F 18 85  SLO $8518
  $94A0: 40        RTI
  $94A1: 0A        ASL A
  $94A2: 0E 0E 12  ASL $120e
  $94A5: 01 09     ORA ($09,X)
  $94A7: 13 11     SLO ($11),Y
  $94A9: 1C 0F 40  NOP $400f,X
  $94AC: 0F 0C 0C  SLO $0c0c
  $94AF: 0C 04 08  NOP $0804
  $94B2: 14 15     NOP $15,X
  $94B4: 09 15     ORA #$15
  $94B6: 0B 00     ANC #$00
  $94B8: 16 0F     ASL $0f,X
  $94BA: 0A        ASL A
  $94BB: 17 18     SLO $18,X
  $94BD: 30 04     BMI $94c3
  $94BF: 40        RTI
  $94C0: 15 26     ORA $26,X
  $94C2: 24 24     BIT $24
  $94C4: 02        ???
  $94C5: 09 1C     ORA #$1c
  $94C7: 2F 08 1D  RLA $1d08
  $94CA: 25 2C     AND $2c
  $94CC: AC 20 15  LDY $1520
  $94CF: 27 24     RLA $24
  $94D1: 24 01     BIT $01
  $94D3: 08        PHP
  $94D4: 1E 2D 31  ASL $312d,X
  $94D7: 13 20     SLO ($20),Y
  $94D9: 1B 27 24  SLO $2427,Y
  $94DC: 24 01     BIT $01
  $94DE: 00        BRK
  $94DF: 1F 1B 2C  SLO $2c1b,X
  $94E2: 1A        NOP
  $94E3: 0C 0E 27  NOP $270e
  $94E6: 27 24     RLA $24
  $94E8: 02        ???
  $94E9: 08        PHP
  $94EA: 2A        ROL A
  $94EB: 29 03     AND #$03
  $94ED: 2B 2B     ANC #$2b
  $94EF: 1C 00 A0  NOP $a000,X
  $94F2: 0D 1C 1C  ORA $1c1c
  $94F5: 1C 00 20  NOP $2000,X
  $94F8: 11 40     ORA ($40),Y
  $94FA: 11 24     ORA ($24),Y
  $94FC: 1E 1E 00  ASL $001e,X
  $94FF: 1C 1A 30  NOP $301a,X
  $9502: 0E 1E 1C  ASL $1c1e
  $9505: 1E 00 24  ASL $2400,X
  $9508: 08        PHP
  $9509: 90 11     BCC $951c
  $950B: 1D 1D 1D  ORA $1d1d,X
  $950E: 01 09     ORA ($09,X)
  $9510: 28        PLP
  $9511: 26 20     ROL $20
  $9513: 00        BRK
  $9514: 7F 10 27  RRA $2710,X
  $9517: 20 20 01  JSR $0120
  $951A: 06 27     ASL $27
  $951C: 1F 29 11  SLO $1129,X
  $951F: 10 13     BPL $9534
  $9521: 21 22     AND ($22,X)
  $9523: 22        ???
  $9524: 01 0A     ORA ($0a,X)
  $9526: 29 23     AND #$23
  $9528: 34 00     NOP $00,X
  $952A: 60        RTS
  $952B: 14 35     NOP $35,X
  $952D: 35 35     AND $35,X
  $952F: 02        ???
  $9530: 09 20     ORA #$20
  $9532: 34 08     NOP $08,X
  $9534: 21 33     AND ($33,X)
  $9536: 38        SEC
  $9537: 1E 40 20  ASL $2040,X
  $953A: 24 24     BIT $24
  $953C: 24 05     BIT $05
  $953E: 08        PHP
  $953F: 22        ???
  $9540: 39 07 23  AND $2307,Y
  $9543: 37 06     RLA $06,X
  $9545: 24 32     BIT $32
  $9547: 09 25     ORA #$25
  $9549: 35 00     AND $00,X
  $954B: 26 20     ROL $20
  $954D: 1C 00 40  NOP $4000,X
  $9550: 0A        ASL A
  $9551: 16 12     ASL $12,X
  $9553: 12        ???
  $9554: 00        BRK
  $9555: 00        BRK
  $9556: FF 08 FF  ISB $ff08,X
  $9559: 00        BRK
  $955A: FF 00 FF  ISB $ff00,X
  $955D: 00        BRK
  $955E: FF 00 00  ISB $0000,X
  $9561: FF 00 FF  ISB $ff00,X
  $9564: 00        BRK
  $9565: FF 00 FF  ISB $ff00,X
  $9568: 00        BRK
  $9569: FF 00 FF  ISB $ff00,X
  $956C: 00        BRK
  $956D: FF 00 FF  ISB $ff00,X
  $9570: FF 00 FF  ISB $ff00,X
  $9573: 00        BRK
  $9574: FF 00 FF  ISB $ff00,X
  $9577: 00        BRK
  $9578: FF 00 FF  ISB $ff00,X
  $957B: 00        BRK
  $957C: FF 00 FF  ISB $ff00,X
  $957F: 00        BRK
  $9580: 00        BRK
  $9581: FF 00 FF  ISB $ff00,X
  $9584: 00        BRK
  $9585: FF 00 FF  ISB $ff00,X
  $9588: 00        BRK
  $9589: FF 00 FF  ISB $ff00,X
  $958C: 00        BRK
  $958D: FF 00 FF  ISB $ff00,X
  $9590: FF 00 FF  ISB $ff00,X
  $9593: 00        BRK
  $9594: FF 00 FF  ISB $ff00,X
  $9597: 00        BRK
  $9598: FF 00 FF  ISB $ff00,X
  $959B: 00        BRK
  $959C: FF 00 FF  ISB $ff00,X
  $959F: 00        BRK
  $95A0: 00        BRK
  $95A1: FF 00 FF  ISB $ff00,X
  $95A4: 00        BRK
  $95A5: FF 00 FF  ISB $ff00,X
  $95A8: 00        BRK
  $95A9: FF 00 FF  ISB $ff00,X
  $95AC: 00        BRK
  $95AD: FF 00 7F  ISB $7f00,X
  $95B0: FF 00 FF  ISB $ff00,X
  $95B3: 00        BRK
  $95B4: FF 00 FF  ISB $ff00,X
  $95B7: 00        BRK
  $95B8: FF 00 FF  ISB $ff00,X
  $95BB: 00        BRK
  $95BC: FF 00 FF  ISB $ff00,X
  $95BF: 00        BRK
  $95C0: 00        BRK
  $95C1: FF 00 FF  ISB $ff00,X
  $95C4: 00        BRK
  $95C5: FF 00 FF  ISB $ff00,X
  $95C8: 00        BRK
  $95C9: FF 00 FF  ISB $ff00,X
  $95CC: 00        BRK
  $95CD: FF 00 FF  ISB $ff00,X
  $95D0: FF 00 FF  ISB $ff00,X
  $95D3: 00        BRK
  $95D4: FF 00 FF  ISB $ff00,X
  $95D7: 00        BRK
  $95D8: FF 00 F7  ISB $f700,X
  $95DB: 00        BRK
  $95DC: FF 00 FF  ISB $ff00,X
  $95DF: 00        BRK
  $95E0: 00        BRK
  $95E1: FF 00 FF  ISB $ff00,X
  $95E4: 00        BRK
  $95E5: FF 00 7F  ISB $7f00,X
  $95E8: 00        BRK
  $95E9: FF 00 FF  ISB $ff00,X
  $95EC: 00        BRK
  $95ED: FF 00 FF  ISB $ff00,X
  $95F0: FF 00 FF  ISB $ff00,X
  $95F3: 00        BRK
  $95F4: FF 00 FF  ISB $ff00,X
  $95F7: 00        BRK
  $95F8: FF 00 FF  ISB $ff00,X
  $95FB: 00        BRK
  $95FC: FF 00 FF  ISB $ff00,X
  $95FF: 00        BRK
  $9600: 4C A5 DD  JMP $dda5
  $9603: 4C 00 D7  JMP $d700
  $9606: 4C 09 D6  JMP $d609
  $9609: 20 05 80  JSR $8005
  $960C: 20 12 D6  JSR $d612
  $960F: 4C 09 D6  JMP $d609
  $9612: AD 75 06  LDA $0675
  $9615: 20 17 80  JSR $8017
  $9618: 1C D6 2A  NOP $2ad6,X
  $961B: D6 20     DEC $20,X
  $961D: E5 D6     SBC $d6
  $961F: 20 EE D6  JSR $d6ee
  $9622: EE 75 06  INC $0675
  $9625: A9 0D     LDA #$0d
  $9627: 4C 59 80  JMP $8059
  $962A: A5 BC     LDA $bc
  $962C: F0 15     BEQ $9643
  $962E: 20 11 80  JSR $8011
  $9631: A5 BC     LDA $bc
  $9633: 20 64 E2  JSR $e264
  $9636: A5 BD     LDA $bd
  $9638: F0 03     BEQ $963d
  $963A: 20 3F E3  JSR $e33f
  $963D: 20 14 80  JSR $8014
  $9640: 4C 5E E2  JMP $e25e
  $9643: A5 C2     LDA $c2
  $9645: F0 03     BEQ $964a
  $9647: 20 F5 E4  JSR $e4f5
  $964A: A5 A4     LDA $a4
  $964C: F0 03     BEQ $9651
  $964E: 4C 0A E5  JMP $e50a
  $9651: AD 73 06  LDA $0673
  $9654: 20 17 80  JSR $8017
  $9657: 5F D6 6F  SRE $6fd6,X
  $965A: D6 D1     DEC $d1,X
  $965C: D6 E1     DEC $e1,X
  $965E: D6 A9     DEC $a9,X
  $9660: 0C 85 BC  NOP $bc85
  $9663: A9 07     LDA #$07
  $9665: 85 BD     STA $bd
  $9667: A9 3D     LDA #$3d
  $9669: 85 A4     STA $a4
  $966B: EE 73 06  INC $0673
  $966E: 60        RTS
  $966F: 20 B3 D6  JSR $d6b3
  $9672: A5 BE     LDA $be
  $9674: F0 03     BEQ $9679
  $9676: C6 BE     DEC $be
  $9678: 60        RTS
  $9679: A5 B6     LDA $b6
  $967B: 48        PHA
  $967C: 0A        ASL A
  $967D: 85 00     STA $00
  $967F: 68        PLA
  $9680: 18        CLC
  $9681: 65 00     ADC $00
  $9683: AA        TAX
  $9684: BD A7 D6  LDA $d6a7,X
  $9687: 8D 0D 02  STA $020d
  $968A: BD A8 D6  LDA $d6a8,X
  $968D: 8D 11 02  STA $0211
  $9690: BD A9 D6  LDA $d6a9,X
  $9693: 8D 25 02  STA $0225
  $9696: A9 08     LDA #$08
  $9698: 85 BE     STA $be
  $969A: E6 B6     INC $b6
  $969C: A5 B6     LDA $b6
  $969E: C9 04     CMP #$04
  $96A0: D0 04     BNE $96a6
  $96A2: A9 00     LDA #$00
  $96A4: 85 B6     STA $b6
  $96A6: 60        RTS
  $96A7: 60        RTS
  $96A8: 60        RTS
  $96A9: F1 0C     SBC ($0c),Y
  $96AB: 0D F1 60  ORA $60f1
  $96AE: 60        RTS
  $96AF: D3 0C     DCP ($0c),Y
  $96B1: 0D D3 AD  ORA $add3
  $96B4: 01 03     ORA ($03,X)
  $96B6: 29 10     AND #$10
  $96B8: F0 16     BEQ $96d0
  $96BA: 2D 03 03  AND $0303
  $96BD: D0 11     BNE $96d0
  $96BF: 20 E5 D6  JSR $d6e5
  $96C2: 68        PLA
  $96C3: 68        PLA
  $96C4: 68        PLA
  $96C5: 68        PLA
  $96C6: A9 00     LDA #$00
  $96C8: 8D 75 06  STA $0675
  $96CB: A9 01     LDA #$01
  $96CD: 4C 59 80  JMP $8059
  $96D0: 60        RTS
  $96D1: A9 05     LDA #$05
  $96D3: 85 BC     STA $bc
  $96D5: A9 3E     LDA #$3e
  $96D7: 85 A4     STA $a4
  $96D9: E6 C2     INC $c2
  $96DB: EE 73 06  INC $0673
  $96DE: 4C D7 E4  JMP $e4d7
  $96E1: 20 B3 D6  JSR $d6b3
  $96E4: 60        RTS
  $96E5: 20 20 80  JSR $8020
  $96E8: 20 1D 80  JSR $801d
  $96EB: 4C 14 80  JMP $8014
  $96EE: A2 0A     LDX #$0a
  $96F0: A9 00     LDA #$00
  $96F2: 9D 56 06  STA $0656,X
  $96F5: CA        DEX
  $96F6: 10 FA     BPL $96f2
  $96F8: A2 18     LDX #$18
  $96FA: 95 AF     STA $af,X
  $96FC: CA        DEX
  $96FD: 10 FB     BPL $96fa
  $96FF: 60        RTS
  $9700: 20 05 80  JSR $8005
  $9703: 20 09 D7  JSR $d709
  $9706: 4C 00 D7  JMP $d700
  $9709: AD 76 06  LDA $0676
  $970C: 20 17 80  JSR $8017
  $970F: 13 D7     SLO ($d7),Y
  $9711: 29 D7     AND #$d7
  $9713: 20 E5 D6  JSR $d6e5
  $9716: 20 EE D6  JSR $d6ee
  $9719: AD 50 06  LDA $0650
  $971C: C9 07     CMP #$07
  $971E: D0 05     BNE $9725
  $9720: A9 05     LDA #$05
  $9722: 8D 58 06  STA $0658
  $9725: EE 76 06  INC $0676
  $9728: 60        RTS
  $9729: A5 C2     LDA $c2
  $972B: F0 03     BEQ $9730
  $972D: 20 F5 E4  JSR $e4f5
  $9730: A5 C0     LDA $c0
  $9732: F0 03     BEQ $9737
  $9734: 4C D4 E5  JMP $e5d4
  $9737: A5 BC     LDA $bc
  $9739: F0 18     BEQ $9753
  $973B: 20 11 80  JSR $8011
  $973E: 20 3C E7  JSR $e73c
  $9741: 20 E7 E4  JSR $e4e7
  $9744: A5 BC     LDA $bc
  $9746: 20 64 E2  JSR $e264
  $9749: 20 14 80  JSR $8014
  $974C: 20 5E E2  JSR $e25e
  $974F: A9 01     LDA #$01
  $9751: 85 C2     STA $c2
  $9753: A5 BD     LDA $bd
  $9755: F0 09     BEQ $9760
  $9757: A5 BD     LDA $bd
  $9759: 20 3F E3  JSR $e33f
  $975C: A9 01     LDA #$01
  $975E: 85 C2     STA $c2
  $9760: A5 A4     LDA $a4
  $9762: F0 03     BEQ $9767
  $9764: 4C 0A E5  JMP $e50a
  $9767: A5 BE     LDA $be
  $9769: F0 03     BEQ $976e
  $976B: C6 BE     DEC $be
  $976D: 60        RTS
  $976E: AD 58 06  LDA $0658
  $9771: 20 17 80  JSR $8017
  $9774: 80 D7     NOP #$d7
  $9776: DA        NOP
  $9777: D7 F0     DCP $f0,X
  $9779: D7 01     DCP $01,X
  $977B: D8        CLD
  $977C: 21 D8     AND ($d8,X)
  $977E: 14 D8     NOP $d8,X
  $9780: A9 09     LDA #$09
  $9782: 20 59 80  JSR $8059
  $9785: A9 0B     LDA #$0b
  $9787: 85 BC     STA $bc
  $9789: A9 01     LDA #$01
  $978B: 85 A4     STA $a4
  $978D: 20 1A E2  JSR $e21a
  $9790: A9 02     LDA #$02
  $9792: 8D 79 06  STA $0679
  $9795: A9 09     LDA #$09
  $9797: 85 C4     STA $c4
  $9799: A9 04     LDA #$04
  $979B: 85 C6     STA $c6
  $979D: EE 58 06  INC $0658
  $97A0: AE 50 06  LDX $0650
  $97A3: BD BE D7  LDA $d7be,X
  $97A6: 8D 5C 06  STA $065c
  $97A9: BD C5 D7  LDA $d7c5,X
  $97AC: 8D 5D 06  STA $065d
  $97AF: BD CC D7  LDA $d7cc,X
  $97B2: 8D 5F 06  STA $065f
  $97B5: BD D3 D7  LDA $d7d3,X
  $97B8: 8D 60 06  STA $0660
  $97BB: 4C D7 E4  JMP $e4d7
  $97BE: 00        BRK
  $97BF: 01 03     ORA ($03,X)
  $97C1: 07 47     SLO $47
  $97C3: 57 57     SRE $57,X
  $97C5: 00        BRK
  $97C6: 00        BRK
  $97C7: 00        BRK
  $97C8: 00        BRK
  $97C9: 00        BRK
  $97CA: 04 84     NOP $84
  $97CC: 00        BRK
  $97CD: 00        BRK
  $97CE: 40        RTI
  $97CF: C0 C1     CPY #$c1
  $97D1: C1 C1     CMP ($c1,X)
  $97D3: 00        BRK
  $97D4: 06 0E     ASL $0e
  $97D6: 1E 3E 7E  ASL $7e3e,X
  $97D9: 7E AD 01  ROR $01ad,X
  $97DC: 03 10     SLO ($10,X)
  $97DE: 0C 20 D9  NOP $d920
  $97E1: D8        CLD
  $97E2: A6 BF     LDX $bf
  $97E4: BD EE D7  LDA $d7ee,X
  $97E7: 8D 58 06  STA $0658
  $97EA: 60        RTS
  $97EB: 4C 9E D8  JMP $d89e
  $97EE: 02        ???
  $97EF: 05 EE     ORA $ee
  $97F1: 58        CLI
  $97F2: 06 A9     ASL $a9
  $97F4: 02        ???
  $97F5: 85 A4     STA $a4
  $97F7: E6 C0     INC $c0
  $97F9: A9 00     LDA #$00
  $97FB: 8D 50 06  STA $0650
  $97FE: 4C 57 E7  JMP $e757
  $9801: AD 01 03  LDA $0301
  $9804: 10 0D     BPL $9813
  $9806: A9 01     LDA #$01
  $9808: 85 C0     STA $c0
  $980A: 8D 5A 06  STA $065a
  $980D: 8D 5B 06  STA $065b
  $9810: EE 58 06  INC $0658
  $9813: 60        RTS
  $9814: A9 01     LDA #$01
  $9816: 20 59 80  JSR $8059
  $9819: A9 00     LDA #$00
  $981B: 8D 76 06  STA $0676
  $981E: 68        PLA
  $981F: 68        PLA
  $9820: 60        RTS
  $9821: AD 56 06  LDA $0656
  $9824: 20 17 80  JSR $8017
  $9827: 43 D8     SRE ($d8,X)
  $9829: DE D8 A4  DEC $a4d8,X
  $982C: D9 2F DA  CMP $da2f,Y
  $982F: 2B DD     ANC #$dd
  $9831: 33 DC     RLA ($dc),Y
  $9833: 64 DC     NOP $dc
  $9835: 67 DC     RRA $dc
  $9837: 70 DC     BVS $9815
  $9839: 74 DC     NOP $dc,X
  $983B: 7C DC 8D  NOP $8ddc,X
  $983E: DC 93 DC  NOP $dc93,X
  $9841: 96 DC     STX $dc,Y
  $9843: AD 57 06  LDA $0657
  $9846: 20 17 80  JSR $8017
  $9849: 4D D8 7B  EOR $7bd8
  $984C: D8        CLD
  $984D: A5 C4     LDA $c4
  $984F: C9 02     CMP #$02
  $9851: 90 15     BCC $9868
  $9853: A5 C3     LDA $c3
  $9855: C9 01     CMP #$01
  $9857: 90 0F     BCC $9868
  $9859: A9 04     LDA #$04
  $985B: 8D 56 06  STA $0656
  $985E: A9 02     LDA #$02
  $9860: 8D 59 06  STA $0659
  $9863: A9 39     LDA #$39
  $9865: 85 09     STA $09
  $9867: 60        RTS
  $9868: 20 84 E6  JSR $e684
  $986B: A2 03     LDX #$03
  $986D: 86 A4     STX $a4
  $986F: E8        INX
  $9870: 8E 79 06  STX $0679
  $9873: A9 00     LDA #$00
  $9875: 85 BF     STA $bf
  $9877: EE 57 06  INC $0657
  $987A: 60        RTS
  $987B: AD 01 03  LDA $0301
  $987E: 10 1E     BPL $989e
  $9880: 20 D9 D8  JSR $d8d9
  $9883: A6 BF     LDX $bf
  $9885: E8        INX
  $9886: 8E 56 06  STX $0656
  $9889: E0 04     CPX #$04
  $988B: D0 04     BNE $9891
  $988D: A9 38     LDA #$38
  $988F: 85 09     STA $09
  $9891: A9 00     LDA #$00
  $9893: 8D 57 06  STA $0657
  $9896: 8D 59 06  STA $0659
  $9899: 85 BF     STA $bf
  $989B: E6 C0     INC $c0
  $989D: 60        RTS
  $989E: A9 0C     LDA #$0c
  $98A0: 20 EA E1  JSR $e1ea
  $98A3: 29 0C     AND #$0c
  $98A5: D0 01     BNE $98a8
  $98A7: 60        RTS
  $98A8: AE BF 00  LDX $00bf
  $98AB: 29 08     AND #$08
  $98AD: D0 03     BNE $98b2
  $98AF: E8        INX
  $98B0: D0 01     BNE $98b3
  $98B2: CA        DEX
  $98B3: 10 07     BPL $98bc
  $98B5: AE 79 06  LDX $0679
  $98B8: CA        DEX
  $98B9: 4C C3 D8  JMP $d8c3
  $98BC: EC 79 06  CPX $0679
  $98BF: 90 02     BCC $98c3
  $98C1: A2 00     LDX #$00
  $98C3: 8E BF 00  STX $00bf
  $98C6: AD 79 06  LDA $0679
  $98C9: C9 07     CMP #$07
  $98CB: F0 01     BEQ $98ce
  $98CD: E8        INX
  $98CE: 8A        TXA
  $98CF: 0A        ASL A
  $98D0: 0A        ASL A
  $98D1: 0A        ASL A
  $98D2: 0A        ASL A
  $98D3: 69 78     ADC #$78
  $98D5: 8D 04 02  STA $0204
  $98D8: 60        RTS
  $98D9: A9 1B     LDA #$1b
  $98DB: 4C 59 80  JMP $8059
  $98DE: AD 59 06  LDA $0659
  $98E1: 20 17 80  JSR $8017
  $98E4: EA        NOP
  $98E5: D8        CLD
  $98E6: FF D8 76  ISB $76d8,X
  $98E9: D9 2C 5F  CMP $5f2c,Y
  $98EC: 06 50     ASL $50
  $98EE: 08        PHP
  $98EF: A9 08     LDA #$08
  $98F1: 0D 60 06  ORA $0660
  $98F4: 8D 60 06  STA $0660
  $98F7: AD 61 06  LDA $0661
  $98FA: 85 A4     STA $a4
  $98FC: 4C 13 DD  JMP $dd13
  $98FF: AD 01 03  LDA $0301
  $9902: 10 6C     BPL $9970
  $9904: A9 08     LDA #$08
  $9906: 20 57 E7  JSR $e757
  $9909: 20 D9 D8  JSR $d8d9
  $990C: AD 5A 06  LDA $065a
  $990F: C9 07     CMP #$07
  $9911: D0 0D     BNE $9920
  $9913: AD 5D 06  LDA $065d
  $9916: 10 08     BPL $9920
  $9918: A9 01     LDA #$01
  $991A: 20 79 D9  JSR $d979
  $991D: 4C 80 D9  JMP $d980
  $9920: A6 BF     LDX $bf
  $9922: BD 62 06  LDA $0662,X
  $9925: F0 3B     BEQ $9962
  $9927: 10 07     BPL $9930
  $9929: 29 0F     AND #$0f
  $992B: 8D 5B 06  STA $065b
  $992E: D0 14     BNE $9944
  $9930: A8        TAY
  $9931: AA        TAX
  $9932: AD 60 06  LDA $0660
  $9935: CA        DEX
  $9936: F0 04     BEQ $993c
  $9938: 4A        LSR A
  $9939: 4C 35 D9  JMP $d935
  $993C: 29 01     AND #$01
  $993E: F0 03     BEQ $9943
  $9940: 8C 5B 06  STY $065b
  $9943: 98        TYA
  $9944: 48        PHA
  $9945: 8D 5A 06  STA $065a
  $9948: 20 20 E7  JSR $e720
  $994B: 68        PLA
  $994C: 18        CLC
  $994D: 69 08     ADC #$08
  $994F: 85 00     STA $00
  $9951: AC 5D 06  LDY $065d
  $9954: F0 0E     BEQ $9964
  $9956: A9 80     LDA #$80
  $9958: 0D 5D 06  ORA $065d
  $995B: 8D 5D 06  STA $065d
  $995E: A5 00     LDA $00
  $9960: D0 02     BNE $9964
  $9962: A9 08     LDA #$08
  $9964: A2 50     LDX #$50
  $9966: 86 BE     STX $be
  $9968: 85 A4     STA $a4
  $996A: E6 C0     INC $c0
  $996C: EE 59 06  INC $0659
  $996F: 60        RTS
  $9970: 20 9E D8  JSR $d89e
  $9973: 4C 06 DD  JMP $dd06
  $9976: 4C 0B DD  JMP $dd0b
  $9979: 0D 5E 06  ORA $065e
  $997C: 8D 5E 06  STA $065e
  $997F: 60        RTS
  $9980: AE BF 00  LDX $00bf
  $9983: D0 1B     BNE $99a0
  $9985: AD 5E 06  LDA $065e
  $9988: C9 0F     CMP #$0f
  $998A: D0 14     BNE $99a0
  $998C: A9 00     LDA #$00
  $998E: 85 C2     STA $c2
  $9990: 85 1A     STA $1a
  $9992: 8D 05 06  STA $0605
  $9995: A9 05     LDA #$05
  $9997: 8D 56 06  STA $0656
  $999A: A9 F8     LDA #$f8
  $999C: 8D 04 02  STA $0204
  $999F: 60        RTS
  $99A0: A9 10     LDA #$10
  $99A2: D0 C0     BNE $9964
  $99A4: AD 59 06  LDA $0659
  $99A7: 20 17 80  JSR $8017
  $99AA: B2        ???
  $99AB: D9 B8 D9  CMP $d9b8,Y
  $99AE: D3 D9     DCP ($d9),Y
  $99B0: 26 DA     ROL $da
  $99B2: AD 6A 06  LDA $066a
  $99B5: 4C 13 DD  JMP $dd13
  $99B8: AD 5A 06  LDA $065a
  $99BB: CD 5B 06  CMP $065b
  $99BE: F0 0F     BEQ $99cf
  $99C0: A9 01     LDA #$01
  $99C2: 20 57 E7  JSR $e757
  $99C5: 20 D9 D8  JSR $d8d9
  $99C8: EE 59 06  INC $0659
  $99CB: A9 11     LDA #$11
  $99CD: D0 99     BNE $9968
  $99CF: A9 13     LDA #$13
  $99D1: D0 95     BNE $9968
  $99D3: AD 01 03  LDA $0301
  $99D6: 30 06     BMI $99de
  $99D8: 20 9E D8  JSR $d89e
  $99DB: 4C 06 DD  JMP $dd06
  $99DE: AD 5D 06  LDA $065d
  $99E1: 10 0A     BPL $99ed
  $99E3: AE BF 00  LDX $00bf
  $99E6: D0 05     BNE $99ed
  $99E8: A9 02     LDA #$02
  $99EA: 20 79 D9  JSR $d979
  $99ED: A9 02     LDA #$02
  $99EF: 20 57 E7  JSR $e757
  $99F2: 20 D9 D8  JSR $d8d9
  $99F5: AE 5A 06  LDX $065a
  $99F8: E0 04     CPX #$04
  $99FA: F0 0A     BEQ $9a06
  $99FC: E0 06     CPX #$06
  $99FE: F0 06     BEQ $9a06
  $9A00: E0 08     CPX #$08
  $9A02: F0 02     BEQ $9a06
  $9A04: D0 18     BNE $9a1e
  $9A06: CA        DEX
  $9A07: AD 5C 06  LDA $065c
  $9A0A: CA        DEX
  $9A0B: F0 04     BEQ $9a11
  $9A0D: 4A        LSR A
  $9A0E: 4C 0A DA  JMP $da0a
  $9A11: 29 01     AND #$01
  $9A13: F0 09     BEQ $9a1e
  $9A15: AE 5A 06  LDX $065a
  $9A18: CA        DEX
  $9A19: BD DA DA  LDA $dada,X
  $9A1C: 85 BD     STA $bd
  $9A1E: A6 BF     LDX $bf
  $9A20: BD 6B 06  LDA $066b,X
  $9A23: 4C 68 D9  JMP $d968
  $9A26: AD 01 03  LDA $0301
  $9A29: 10 03     BPL $9a2e
  $9A2B: 4C 0B DD  JMP $dd0b
  $9A2E: 60        RTS
  $9A2F: AD 59 06  LDA $0659
  $9A32: 20 17 80  JSR $8017
  $9A35: 45 DA     EOR $da
  $9A37: 4B DA     ALR #$da
  $9A39: 78        SEI
  $9A3A: DA        NOP
  $9A3B: EA        NOP
  $9A3C: DA        NOP
  $9A3D: F1 DA     SBC ($da),Y
  $9A3F: 05 DB     ORA $db
  $9A41: F6 DB     INC $db,X
  $9A43: 26 DC     ROL $dc
  $9A45: AD 6D 06  LDA $066d
  $9A48: 4C 13 DD  JMP $dd13
  $9A4B: AD 5A 06  LDA $065a
  $9A4E: CD 5B 06  CMP $065b
  $9A51: F0 10     BEQ $9a63
  $9A53: A9 01     LDA #$01
  $9A55: 20 57 E7  JSR $e757
  $9A58: 20 D9 D8  JSR $d8d9
  $9A5B: EE 59 06  INC $0659
  $9A5E: A9 12     LDA #$12
  $9A60: 4C 68 D9  JMP $d968
  $9A63: AD 6E 06  LDA $066e
  $9A66: 10 0C     BPL $9a74
  $9A68: EE 59 06  INC $0659
  $9A6B: A9 02     LDA #$02
  $9A6D: 8D 60 06  STA $0660
  $9A70: A9 20     LDA #$20
  $9A72: D0 EC     BNE $9a60
  $9A74: A9 1F     LDA #$1f
  $9A76: D0 E8     BNE $9a60
  $9A78: AD 01 03  LDA $0301
  $9A7B: 10 21     BPL $9a9e
  $9A7D: A6 BF     LDX $bf
  $9A7F: F0 23     BEQ $9aa4
  $9A81: AD 5D 06  LDA $065d
  $9A84: 10 05     BPL $9a8b
  $9A86: A9 04     LDA #$04
  $9A88: 20 79 D9  JSR $d979
  $9A8B: A9 02     LDA #$02
  $9A8D: 20 57 E7  JSR $e757
  $9A90: 20 D9 D8  JSR $d8d9
  $9A93: 20 AA DA  JSR $daaa
  $9A96: AD 6E 06  LDA $066e
  $9A99: 29 7F     AND #$7f
  $9A9B: 4C 68 D9  JMP $d968
  $9A9E: 20 9E D8  JSR $d89e
  $9AA1: 4C 06 DD  JMP $dd06
  $9AA4: A9 04     LDA #$04
  $9AA6: 8D 59 06  STA $0659
  $9AA9: 60        RTS
  $9AAA: AE 5A 06  LDX $065a
  $9AAD: CA        DEX
  $9AAE: BD D2 DA  LDA $dad2,X
  $9AB1: 29 7F     AND #$7f
  $9AB3: 0D 5C 06  ORA $065c
  $9AB6: 8D 5C 06  STA $065c
  $9AB9: BD DA DA  LDA $dada,X
  $9ABC: 29 0F     AND #$0f
  $9ABE: 85 BD     STA $bd
  $9AC0: 29 04     AND #$04
  $9AC2: 0D 5D 06  ORA $065d
  $9AC5: 8D 5D 06  STA $065d
  $9AC8: BD E2 DA  LDA $dae2,X
  $9ACB: 0D 60 06  ORA $0660
  $9ACE: 8D 60 06  STA $0660
  $9AD1: 60        RTS
  $9AD2: 00        BRK
  $9AD3: 01 00     ORA ($00,X)
  $9AD5: 04 00     NOP $00
  $9AD7: 10 00     BPL $9ad9
  $9AD9: 40        RTI
  $9ADA: 00        BRK
  $9ADB: 00        BRK
  $9ADC: 00        BRK
  $9ADD: 02        ???
  $9ADE: 00        BRK
  $9ADF: 04 00     NOP $00
  $9AE1: 03 00     SLO ($00,X)
  $9AE3: 04 00     NOP $00
  $9AE5: 10 00     BPL $9ae7
  $9AE7: 40        RTI
  $9AE8: 00        BRK
  $9AE9: 20 4C 26  JSR $264c
  $9AEC: DA        NOP
  $9AED: 48        PHA
  $9AEE: FD 03 A8  SBC $a803,X
  $9AF1: E6 C0     INC $c0
  $9AF3: A9 1C     LDA #$1c
  $9AF5: 85 1B     STA $1b
  $9AF7: A2 03     LDX #$03
  $9AF9: BD ED DA  LDA $daed,X
  $9AFC: 9D 08 02  STA $0208,X
  $9AFF: CA        DEX
  $9B00: 10 F7     BPL $9af9
  $9B02: EE 59 06  INC $0659
  $9B05: A9 C0     LDA #$c0
  $9B07: 20 EA E1  JSR $e1ea
  $9B0A: 29 C0     AND #$c0
  $9B0C: D0 03     BNE $9b11
  $9B0E: 4C 96 DB  JMP $db96
  $9B11: 29 80     AND #$80
  $9B13: D0 03     BNE $9b18
  $9B15: 4C 8B DB  JMP $db8b
  $9B18: AD 5D 06  LDA $065d
  $9B1B: 10 05     BPL $9b22
  $9B1D: A9 08     LDA #$08
  $9B1F: 20 79 D9  JSR $d979
  $9B22: A9 01     LDA #$01
  $9B24: 20 57 E7  JSR $e757
  $9B27: 20 D9 D8  JSR $d8d9
  $9B2A: AD 5A 06  LDA $065a
  $9B2D: C9 04     CMP #$04
  $9B2F: F0 08     BEQ $9b39
  $9B31: C9 06     CMP #$06
  $9B33: F0 04     BEQ $9b39
  $9B35: C9 08     CMP #$08
  $9B37: D0 07     BNE $9b40
  $9B39: AD 0C 02  LDA $020c
  $9B3C: C9 F8     CMP #$f8
  $9B3E: F0 43     BEQ $9b83
  $9B40: 20 EF E7  JSR $e7ef
  $9B43: AD 70 06  LDA $0670
  $9B46: CD 08 02  CMP $0208
  $9B49: B0 38     BCS $9b83
  $9B4B: 69 05     ADC #$05
  $9B4D: CD 08 02  CMP $0208
  $9B50: 90 31     BCC $9b83
  $9B52: AD 71 06  LDA $0671
  $9B55: CD 0B 02  CMP $020b
  $9B58: B0 29     BCS $9b83
  $9B5A: 69 05     ADC #$05
  $9B5C: CD 0B 02  CMP $020b
  $9B5F: 90 22     BCC $9b83
  $9B61: AD 72 06  LDA $0672
  $9B64: 48        PHA
  $9B65: 29 3F     AND #$3f
  $9B67: 85 A4     STA $a4
  $9B69: 68        PLA
  $9B6A: 29 C0     AND #$c0
  $9B6C: 0D 5F 06  ORA $065f
  $9B6F: 8D 5F 06  STA $065f
  $9B72: 2C 5F 06  BIT $065f
  $9B75: 50 08     BVC $9b7f
  $9B77: A9 02     LDA #$02
  $9B79: 0D 5C 06  ORA $065c
  $9B7C: 8D 5C 06  STA $065c
  $9B7F: A2 06     LDX #$06
  $9B81: D0 0A     BNE $9b8d
  $9B83: A9 12     LDA #$12
  $9B85: 85 A4     STA $a4
  $9B87: A9 30     LDA #$30
  $9B89: 85 BE     STA $be
  $9B8B: A2 01     LDX #$01
  $9B8D: A9 F8     LDA #$f8
  $9B8F: 8D 08 02  STA $0208
  $9B92: 8E 59 06  STX $0659
  $9B95: 60        RTS
  $9B96: AD 01 03  LDA $0301
  $9B99: 29 03     AND #$03
  $9B9B: F0 18     BEQ $9bb5
  $9B9D: 4A        LSR A
  $9B9E: A9 01     LDA #$01
  $9BA0: B0 04     BCS $9ba6
  $9BA2: 49 FF     EOR #$ff
  $9BA4: 69 01     ADC #$01
  $9BA6: 18        CLC
  $9BA7: 6D 0B 02  ADC $020b
  $9BAA: C9 50     CMP #$50
  $9BAC: 90 07     BCC $9bb5
  $9BAE: C9 A8     CMP #$a8
  $9BB0: B0 03     BCS $9bb5
  $9BB2: 8D 0B 02  STA $020b
  $9BB5: A2 01     LDX #$01
  $9BB7: AD 01 03  LDA $0301
  $9BBA: 29 0C     AND #$0c
  $9BBC: F0 1C     BEQ $9bda
  $9BBE: 29 08     AND #$08
  $9BC0: F0 08     BEQ $9bca
  $9BC2: 8A        TXA
  $9BC3: 49 FF     EOR #$ff
  $9BC5: 69 01     ADC #$01
  $9BC7: 4C CB DB  JMP $dbcb
  $9BCA: 8A        TXA
  $9BCB: 18        CLC
  $9BCC: 6D 08 02  ADC $0208
  $9BCF: C9 20     CMP #$20
  $9BD1: 90 07     BCC $9bda
  $9BD3: C9 48     CMP #$48
  $9BD5: B0 03     BCS $9bda
  $9BD7: 8D 08 02  STA $0208
  $9BDA: A5 BA     LDA $ba
  $9BDC: D0 15     BNE $9bf3
  $9BDE: A9 08     LDA #$08
  $9BE0: 85 BA     STA $ba
  $9BE2: A5 BB     LDA $bb
  $9BE4: D0 06     BNE $9bec
  $9BE6: E6 BB     INC $bb
  $9BE8: A9 FD     LDA #$fd
  $9BEA: D0 04     BNE $9bf0
  $9BEC: A9 00     LDA #$00
  $9BEE: 85 BB     STA $bb
  $9BF0: 8D 09 02  STA $0209
  $9BF3: C6 BA     DEC $ba
  $9BF5: 60        RTS
  $9BF6: A9 80     LDA #$80
  $9BF8: 20 EA E1  JSR $e1ea
  $9BFB: 29 80     AND #$80
  $9BFD: F0 26     BEQ $9c25
  $9BFF: AE 5A 06  LDX $065a
  $9C02: E0 05     CPX #$05
  $9C04: D0 1C     BNE $9c22
  $9C06: AD 5F 06  LDA $065f
  $9C09: 10 0D     BPL $9c18
  $9C0B: A9 08     LDA #$08
  $9C0D: 8D 5A 06  STA $065a
  $9C10: 8D 5B 06  STA $065b
  $9C13: A9 2D     LDA #$2d
  $9C15: 4C 64 D9  JMP $d964
  $9C18: A9 02     LDA #$02
  $9C1A: 8D 59 06  STA $0659
  $9C1D: A9 2C     LDA #$2c
  $9C1F: 4C 64 D9  JMP $d964
  $9C22: 4C 8B DB  JMP $db8b
  $9C25: 60        RTS
  $9C26: AD 01 03  LDA $0301
  $9C29: 10 07     BPL $9c32
  $9C2B: A9 06     LDA #$06
  $9C2D: 85 BC     STA $bc
  $9C2F: 4C 0B DD  JMP $dd0b
  $9C32: 60        RTS
  $9C33: A9 08     LDA #$08
  $9C35: 20 59 80  JSR $8059
  $9C38: 20 A4 DC  JSR $dca4
  $9C3B: A9 5E     LDA #$5e
  $9C3D: 8D 00 02  STA $0200
  $9C40: A9 19     LDA #$19
  $9C42: 8D 03 02  STA $0203
  $9C45: A9 07     LDA #$07
  $9C47: 8D 01 06  STA $0601
  $9C4A: A9 09     LDA #$09
  $9C4C: 8D 02 06  STA $0602
  $9C4F: A9 05     LDA #$05
  $9C51: 8D 03 06  STA $0603
  $9C54: A2 33     LDX #$33
  $9C56: 8E 04 06  STX $0604
  $9C59: CA        DEX
  $9C5A: A9 40     LDA #$40
  $9C5C: 86 A4     STX $a4
  $9C5E: 85 BE     STA $be
  $9C60: EE 56 06  INC $0656
  $9C63: 60        RTS
  $9C64: 4C AD DC  JMP $dcad
  $9C67: E6 C2     INC $c2
  $9C69: AE 04 06  LDX $0604
  $9C6C: A9 70     LDA #$70
  $9C6E: D0 EC     BNE $9c5c
  $9C70: E6 C0     INC $c0
  $9C72: D0 EC     BNE $9c60
  $9C74: AD 05 06  LDA $0605
  $9C77: D0 F7     BNE $9c70
  $9C79: 4C EB DC  JMP $dceb
  $9C7C: AD 05 06  LDA $0605
  $9C7F: D0 DF     BNE $9c60
  $9C81: EE 05 06  INC $0605
  $9C84: EE 04 06  INC $0604
  $9C87: A9 06     LDA #$06
  $9C89: 8D 56 06  STA $0656
  $9C8C: 60        RTS
  $9C8D: A2 35     LDX #$35
  $9C8F: A9 B0     LDA #$b0
  $9C91: D0 C9     BNE $9c5c
  $9C93: 4C 70 DC  JMP $dc70
  $9C96: 20 EB DC  JSR $dceb
  $9C99: 20 A4 DC  JSR $dca4
  $9C9C: A9 07     LDA #$07
  $9C9E: 8D 50 06  STA $0650
  $9CA1: 4C 14 D8  JMP $d814
  $9CA4: 20 20 80  JSR $8020
  $9CA7: 20 E7 E4  JSR $e4e7
  $9CAA: 4C 14 80  JMP $8014
  $9CAD: 20 11 80  JSR $8011
  $9CB0: 20 20 80  JSR $8020
  $9CB3: 20 E7 E4  JSR $e4e7
  $9CB6: AD 02 06  LDA $0602
  $9CB9: 20 64 E2  JSR $e264
  $9CBC: AD 03 06  LDA $0603
  $9CBF: 20 3F E3  JSR $e33f
  $9CC2: 20 14 80  JSR $8014
  $9CC5: 20 3C E8  JSR $e83c
  $9CC8: 20 5E E2  JSR $e25e
  $9CCB: A9 00     LDA #$00
  $9CCD: 8D 00 06  STA $0600
  $9CD0: 20 0A E8  JSR $e80a
  $9CD3: AD 00 06  LDA $0600
  $9CD6: 18        CLC
  $9CD7: 69 10     ADC #$10
  $9CD9: 8D 00 06  STA $0600
  $9CDC: C9 40     CMP #$40
  $9CDE: D0 F0     BNE $9cd0
  $9CE0: EE 02 06  INC $0602
  $9CE3: EE 03 06  INC $0603
  $9CE6: A9 28     LDA #$28
  $9CE8: 4C 5E DC  JMP $dc5e
  $9CEB: A9 20     LDA #$20
  $9CED: 8D 00 06  STA $0600
  $9CF0: 20 0A E8  JSR $e80a
  $9CF3: AD 00 06  LDA $0600
  $9CF6: 38        SEC
  $9CF7: E9 10     SBC #$10
  $9CF9: 8D 00 06  STA $0600
  $9CFC: 10 F2     BPL $9cf0
  $9CFE: EE 01 06  INC $0601
  $9D01: C6 C2     DEC $c2
  $9D03: 4C 60 DC  JMP $dc60
  $9D06: 2C 01 03  BIT $0301
  $9D09: 50 07     BVC $9d12
  $9D0B: E6 C0     INC $c0
  $9D0D: A9 00     LDA #$00
  $9D0F: 8D 56 06  STA $0656
  $9D12: 60        RTS
  $9D13: 8D 79 06  STA $0679
  $9D16: EE 59 06  INC $0659
  $9D19: 60        RTS
  $9D1A: A9 05     LDA #$05
  $9D1C: 8D 5A 06  STA $065a
  $9D1F: 8D 5B 06  STA $065b
  $9D22: 20 20 E7  JSR $e720
  $9D25: A9 0D     LDA #$0d
  $9D27: 85 A4     STA $a4
  $9D29: D0 E2     BNE $9d0d
  $9D2B: AD 59 06  LDA $0659
  $9D2E: 20 17 80  JSR $8017
  $9D31: 3B DD 40  RLA $40dd,Y
  $9D34: DD 4E DD  CMP $dd4e,X
  $9D37: 56 DD     LSR $dd,X
  $9D39: 59 DD A9  EOR $a9dd,Y
  $9D3C: 3C 4C 68  NOP $684c,X
  $9D3F: D9 AD 01  CMP $01ad,Y
  $9D42: 03 30     SLO ($30,X)
  $9D44: 03 4C     SLO ($4c,X)
  $9D46: 06 DD     ASL $dd
  $9D48: EE 59 06  INC $0659
  $9D4B: E6 C0     INC $c0
  $9D4D: 60        RTS
  $9D4E: 20 5F DD  JSR $dd5f
  $9D51: A5 09     LDA $09
  $9D53: 4C 64 D9  JMP $d964
  $9D56: 4C 48 DD  JMP $dd48
  $9D59: 20 A4 DC  JSR $dca4
  $9D5C: 4C 14 D8  JMP $d814
  $9D5F: AE 60 06  LDX $0660
  $9D62: E0 06     CPX #$06
  $9D64: D0 05     BNE $9d6b
  $9D66: A9 01     LDA #$01
  $9D68: 8D 50 06  STA $0650
  $9D6B: E0 3E     CPX #$3e
  $9D6D: D0 05     BNE $9d74
  $9D6F: A9 04     LDA #$04
  $9D71: 8D 50 06  STA $0650
  $9D74: AE 5F 06  LDX $065f
  $9D77: E0 40     CPX #$40
  $9D79: D0 05     BNE $9d80
  $9D7B: A9 02     LDA #$02
  $9D7D: 8D 50 06  STA $0650
  $9D80: AD 5F 06  LDA $065f
  $9D83: C9 C0     CMP #$c0
  $9D85: D0 08     BNE $9d8f
  $9D87: EE 5F 06  INC $065f
  $9D8A: A9 03     LDA #$03
  $9D8C: 8D 50 06  STA $0650
  $9D8F: AE 5D 06  LDX $065d
  $9D92: E0 04     CPX #$04
  $9D94: D0 05     BNE $9d9b
  $9D96: A9 05     LDA #$05
  $9D98: 8D 50 06  STA $0650
  $9D9B: E0 84     CPX #$84
  $9D9D: D0 05     BNE $9da4
  $9D9F: A9 06     LDA #$06
  $9DA1: 8D 50 06  STA $0650
  $9DA4: 60        RTS
  $9DA5: AD 7A 00  LDA $007a
  $9DA8: D0 2D     BNE $9dd7
  $9DAA: A2 0F     LDX #$0f
  $9DAC: A9 00     LDA #$00
  $9DAE: 9D DF 06  STA $06df,X
  $9DB1: CA        DEX
  $9DB2: 10 FA     BPL $9dae
  $9DB4: 8D 4F 06  STA $064f
  $9DB7: 8D 50 06  STA $0650
  $9DBA: A2 01     LDX #$01
  $9DBC: 9D 51 06  STA $0651,X
  $9DBF: 9D EF 06  STA $06ef,X
  $9DC2: 9D F1 06  STA $06f1,X
  $9DC5: 9D F3 06  STA $06f3,X
  $9DC8: CA        DEX
  $9DC9: 10 F1     BPL $9dbc
  $9DCB: 8D 53 06  STA $0653
  $9DCE: 8D 54 06  STA $0654
  $9DD1: A9 02     LDA #$02
  $9DD3: 8D CA 03  STA $03ca
  $9DD6: 60        RTS
  $9DD7: AD 55 06  LDA $0655
  $9DDA: 20 17 80  JSR $8017
  $9DDD: E7 DD     ISB $dd
  $9DDF: 0F DE 18  SLO $18de
  $9DE2: DE 3A DE  DEC $de3a,X
  $9DE5: 53 DE     SRE ($de),Y
  $9DE7: 20 EE D6  JSR $d6ee
  $9DEA: A9 00     LDA #$00
  $9DEC: 85 1B     STA $1b
  $9DEE: 85 1A     STA $1a
  $9DF0: 20 1A E2  JSR $e21a
  $9DF3: A9 0A     LDA #$0a
  $9DF5: 20 59 80  JSR $8059
  $9DF8: 20 11 80  JSR $8011
  $9DFB: 20 20 80  JSR $8020
  $9DFE: 20 1D 80  JSR $801d
  $9E01: A9 01     LDA #$01
  $9E03: 20 64 E2  JSR $e264
  $9E06: 20 14 80  JSR $8014
  $9E09: 20 F6 E1  JSR $e1f6
  $9E0C: 4C 0C E2  JMP $e20c
  $9E0F: 20 4B DF  JSR $df4b
  $9E12: 20 BA DF  JSR $dfba
  $9E15: 4C 16 E0  JMP $e016
  $9E18: A5 AE     LDA $ae
  $9E1A: D0 15     BNE $9e31
  $9E1C: AD 74 06  LDA $0674
  $9E1F: D0 13     BNE $9e34
  $9E21: A2 30     LDX #$30
  $9E23: 20 08 80  JSR $8008
  $9E26: EE 47 06  INC $0647
  $9E29: EE 48 06  INC $0648
  $9E2C: EE 74 06  INC $0674
  $9E2F: E6 AE     INC $ae
  $9E31: 4C D6 E3  JMP $e3d6
  $9E34: EE 55 06  INC $0655
  $9E37: 4C F6 E1  JMP $e1f6
  $9E3A: A2 00     LDX #$00
  $9E3C: 8E 7A 06  STX $067a
  $9E3F: 8E 7B 06  STX $067b
  $9E42: 8E 4C 06  STX $064c
  $9E45: 8E 74 06  STX $0674
  $9E48: 8E 47 06  STX $0647
  $9E4B: 8E 48 06  STX $0648
  $9E4E: E8        INX
  $9E4F: 8E 55 06  STX $0655
  $9E52: 60        RTS
  $9E53: 20 E5 D6  JSR $d6e5
  $9E56: AD 20 06  LDA $0620
  $9E59: 48        PHA
  $9E5A: 29 0F     AND #$0f
  $9E5C: 8D 4F 06  STA $064f
  $9E5F: 68        PLA
  $9E60: 4A        LSR A
  $9E61: 4A        LSR A
  $9E62: 4A        LSR A
  $9E63: 4A        LSR A
  $9E64: 29 0F     AND #$0f
  $9E66: 8D 52 06  STA $0652
  $9E69: AD 21 06  LDA $0621
  $9E6C: 8D ED 06  STA $06ed
  $9E6F: AD 22 06  LDA $0622
  $9E72: 8D F1 06  STA $06f1
  $9E75: AD 23 06  LDA $0623
  $9E78: 8D E0 06  STA $06e0
  $9E7B: AD 24 06  LDA $0624
  $9E7E: 8D E4 06  STA $06e4
  $9E81: AD 25 06  LDA $0625
  $9E84: 48        PHA
  $9E85: 0A        ASL A
  $9E86: 0A        ASL A
  $9E87: 29 F0     AND #$f0
  $9E89: 0D 52 06  ORA $0652
  $9E8C: 8D 52 06  STA $0652
  $9E8F: 68        PLA
  $9E90: 2A        ROL A
  $9E91: 2A        ROL A
  $9E92: 2A        ROL A
  $9E93: 29 03     AND #$03
  $9E95: 8D F4 06  STA $06f4
  $9E98: AD 26 06  LDA $0626
  $9E9B: 8D E8 06  STA $06e8
  $9E9E: AD 27 06  LDA $0627
  $9EA1: 8D EF 06  STA $06ef
  $9EA4: AD 28 06  LDA $0628
  $9EA7: 8D E9 06  STA $06e9
  $9EAA: AD 29 06  LDA $0629
  $9EAD: 48        PHA
  $9EAE: 29 03     AND #$03
  $9EB0: 8D F0 06  STA $06f0
  $9EB3: 68        PLA
  $9EB4: 4A        LSR A
  $9EB5: 4A        LSR A
  $9EB6: 4A        LSR A
  $9EB7: 4A        LSR A
  $9EB8: 29 0F     AND #$0f
  $9EBA: 8D 51 06  STA $0651
  $9EBD: AD 2A 06  LDA $062a
  $9EC0: 8D E5 06  STA $06e5
  $9EC3: AD 2B 06  LDA $062b
  $9EC6: 8D E2 06  STA $06e2
  $9EC9: AD 2C 06  LDA $062c
  $9ECC: 8D DF 06  STA $06df
  $9ECF: AD 2D 06  LDA $062d
  $9ED2: 8D E3 06  STA $06e3
  $9ED5: AD 2E 06  LDA $062e
  $9ED8: 8D EA 06  STA $06ea
  $9EDB: AD 2F 06  LDA $062f
  $9EDE: 48        PHA
  $9EDF: 0A        ASL A
  $9EE0: 0A        ASL A
  $9EE1: 0A        ASL A
  $9EE2: 0A        ASL A
  $9EE3: 29 F0     AND #$f0
  $9EE5: 0D 51 06  ORA $0651
  $9EE8: 8D 51 06  STA $0651
  $9EEB: 68        PLA
  $9EEC: 2A        ROL A
  $9EED: 2A        ROL A
  $9EEE: 2A        ROL A
  $9EEF: 29 03     AND #$03
  $9EF1: 8D F2 06  STA $06f2
  $9EF4: AD 30 06  LDA $0630
  $9EF7: 8D E7 06  STA $06e7
  $9EFA: AD 31 06  LDA $0631
  $9EFD: 8D F3 06  STA $06f3
  $9F00: AD 32 06  LDA $0632
  $9F03: 8D EC 06  STA $06ec
  $9F06: AD 33 06  LDA $0633
  $9F09: 8D E6 06  STA $06e6
  $9F0C: AD 34 06  LDA $0634
  $9F0F: 8D EB 06  STA $06eb
  $9F12: AD 35 06  LDA $0635
  $9F15: 8D E1 06  STA $06e1
  $9F18: AD 36 06  LDA $0636
  $9F1B: 48        PHA
  $9F1C: 29 07     AND #$07
  $9F1E: 8D 50 06  STA $0650
  $9F21: 68        PLA
  $9F22: 48        PHA
  $9F23: 4A        LSR A
  $9F24: 4A        LSR A
  $9F25: 4A        LSR A
  $9F26: 29 01     AND #$01
  $9F28: 8D 54 06  STA $0654
  $9F2B: 68        PLA
  $9F2C: 4A        LSR A
  $9F2D: 4A        LSR A
  $9F2E: 4A        LSR A
  $9F2F: 4A        LSR A
  $9F30: 29 01     AND #$01
  $9F32: 8D 53 06  STA $0653
  $9F35: AD 37 06  LDA $0637
  $9F38: 8D EE 06  STA $06ee
  $9F3B: A9 02     LDA #$02
  $9F3D: 8D CA 03  STA $03ca
  $9F40: EE F7 06  INC $06f7
  $9F43: EE DD 06  INC $06dd
  $9F46: A9 01     LDA #$01
  $9F48: 4C 59 80  JMP $8059
  $9F4B: AD 01 03  LDA $0301
  $9F4E: 29 0F     AND #$0f
  $9F50: D0 03     BNE $9f55
  $9F52: 85 BA     STA $ba
  $9F54: 60        RTS
  $9F55: 2D 03 03  AND $0303
  $9F58: F0 09     BEQ $9f63
  $9F5A: A4 BA     LDY $ba
  $9F5C: C0 0A     CPY #$0a
  $9F5E: F0 03     BEQ $9f63
  $9F60: E6 BA     INC $ba
  $9F62: 60        RTS
  $9F63: A9 00     LDA #$00
  $9F65: 85 BA     STA $ba
  $9F67: AD 01 03  LDA $0301
  $9F6A: 29 03     AND #$03
  $9F6C: D0 02     BNE $9f70
  $9F6E: F0 22     BEQ $9f92
  $9F70: AE 7A 06  LDX $067a
  $9F73: 4A        LSR A
  $9F74: 90 03     BCC $9f79
  $9F76: E8        INX
  $9F77: D0 01     BNE $9f7a
  $9F79: CA        DEX
  $9F7A: 10 02     BPL $9f7e
  $9F7C: A2 0C     LDX #$0c
  $9F7E: E0 0D     CPX #$0d
  $9F80: 90 02     BCC $9f84
  $9F82: A2 00     LDX #$00
  $9F84: 8E 7A 06  STX $067a
  $9F87: 8A        TXA
  $9F88: 0A        ASL A
  $9F89: 0A        ASL A
  $9F8A: 0A        ASL A
  $9F8B: 0A        ASL A
  $9F8C: 69 18     ADC #$18
  $9F8E: 8D 07 02  STA $0207
  $9F91: 60        RTS
  $9F92: AD 01 03  LDA $0301
  $9F95: 29 0C     AND #$0c
  $9F97: AE 7B 06  LDX $067b
  $9F9A: 29 08     AND #$08
  $9F9C: D0 03     BNE $9fa1
  $9F9E: E8        INX
  $9F9F: D0 01     BNE $9fa2
  $9FA1: CA        DEX
  $9FA2: 10 02     BPL $9fa6
  $9FA4: A2 04     LDX #$04
  $9FA6: E0 05     CPX #$05
  $9FA8: 90 02     BCC $9fac
  $9FAA: A2 00     LDX #$00
  $9FAC: 8E 7B 06  STX $067b
  $9FAF: 8A        TXA
  $9FB0: 0A        ASL A
  $9FB1: 0A        ASL A
  $9FB2: 0A        ASL A
  $9FB3: 0A        ASL A
  $9FB4: 69 78     ADC #$78
  $9FB6: 8D 04 02  STA $0204
  $9FB9: 60        RTS
  $9FBA: A9 60     LDA #$60
  $9FBC: 20 EA E1  JSR $e1ea
  $9FBF: 29 60     AND #$60
  $9FC1: D0 01     BNE $9fc4
  $9FC3: 60        RTS
  $9FC4: 18        CLC
  $9FC5: AE 4C 06  LDX $064c
  $9FC8: 29 20     AND #$20
  $9FCA: F0 03     BEQ $9fcf
  $9FCC: E8        INX
  $9FCD: D0 01     BNE $9fd0
  $9FCF: CA        DEX
  $9FD0: 8A        TXA
  $9FD1: 29 1F     AND #$1f
  $9FD3: AA        TAX
  $9FD4: B0 15     BCS $9feb
  $9FD6: BD 00 06  LDA $0600,X
  $9FD9: C9 FF     CMP #$ff
  $9FDB: D0 0E     BNE $9feb
  $9FDD: AD 01 03  LDA $0301
  $9FE0: 29 20     AND #$20
  $9FE2: F0 21     BEQ $a005
  $9FE4: BD FF 05  LDA $05ff,X
  $9FE7: C9 FF     CMP #$ff
  $9FE9: F0 1A     BEQ $a005
  $9FEB: 8E 4C 06  STX $064c
  $9FEE: 8A        TXA
  $9FEF: 48        PHA
  $9FF0: 29 0F     AND #$0f
  $9FF2: AA        TAX
  $9FF3: BD 06 E0  LDA $e006,X
  $9FF6: 8D 03 02  STA $0203
  $9FF9: A2 48     LDX #$48
  $9FFB: 68        PLA
  $9FFC: 29 10     AND #$10
  $9FFE: F0 02     BEQ $a002
  $A000: A2 60     LDX #$60
  $A002: 8E 00 02  STX $0200
  $A005: 60        RTS
  $A006: 38        SEC
  $A007: 40        RTI
  $A008: 48        PHA
  $A009: 50 58     BVC $a063
  $A00B: 68        PLA
  $A00C: 70 78     BVS $a086
  $A00E: 80 88     NOP #$88
  $A010: 98        TYA
  $A011: A0 A8     LDY #$a8
  $A013: B0 B8     BCS $9fcd
  $A015: C0 A9     CPY #$a9
  $A017: 10 20     BPL $a039
  $A019: EA        NOP
  $A01A: E1 29     SBC ($29,X)
  $A01C: 10 D0     BPL $9fee
  $A01E: 22        ???
  $A01F: A9 80     LDA #$80
  $A021: 20 EA E1  JSR $e1ea
  $A024: 29 80     AND #$80
  $A026: D0 01     BNE $a029
  $A028: 60        RTS
  $A029: A9 2B     LDA #$2b
  $A02B: 20 59 80  JSR $8059
  $A02E: AD 7A 06  LDA $067a
  $A031: 0A        ASL A
  $A032: 0A        ASL A
  $A033: 6D 7A 06  ADC $067a
  $A036: 85 06     STA $06
  $A038: AD 7B 06  LDA $067b
  $A03B: 65 06     ADC $06
  $A03D: C9 40     CMP #$40
  $A03F: D0 10     BNE $a051
  $A041: A0 1F     LDY #$1f
  $A043: B9 00 06  LDA $0600,Y
  $A046: C9 FF     CMP #$ff
  $A048: F0 06     BEQ $a050
  $A04A: 88        DEY
  $A04B: 10 F6     BPL $a043
  $A04D: 4C D3 E0  JMP $e0d3
  $A050: 60        RTS
  $A051: AE 4C 06  LDX $064c
  $A054: 9D 91 06  STA $0691,X
  $A057: 38        SEC
  $A058: FD A2 E1  SBC $e1a2,X
  $A05B: 29 3F     AND #$3f
  $A05D: 9D 00 06  STA $0600,X
  $A060: AD 00 02  LDA $0200
  $A063: AE 03 02  LDX $0203
  $A066: 20 B7 E3  JSR $e3b7
  $A069: A5 00     LDA $00
  $A06B: 8D 3E 06  STA $063e
  $A06E: A5 01     LDA $01
  $A070: 09 20     ORA #$20
  $A072: 8D 3F 06  STA $063f
  $A075: A9 01     LDA #$01
  $A077: 8D 3D 06  STA $063d
  $A07A: 8D 41 06  STA $0641
  $A07D: A9 51     LDA #$51
  $A07F: 8D 02 00  STA $0002
  $A082: A9 E9     LDA #$e9
  $A084: 8D 03 00  STA $0003
  $A087: AD 7B 06  LDA $067b
  $A08A: 0A        ASL A
  $A08B: 0A        ASL A
  $A08C: 0A        ASL A
  $A08D: 85 04     STA $04
  $A08F: AD 7B 06  LDA $067b
  $A092: 48        PHA
  $A093: 0A        ASL A
  $A094: 0A        ASL A
  $A095: 65 04     ADC $04
  $A097: 85 05     STA $05
  $A099: 68        PLA
  $A09A: 65 05     ADC $05
  $A09C: 85 05     STA $05
  $A09E: 18        CLC
  $A09F: 65 02     ADC $02
  $A0A1: 85 02     STA $02
  $A0A3: 90 02     BCC $a0a7
  $A0A5: E6 03     INC $03
  $A0A7: AC 7A 06  LDY $067a
  $A0AA: B1 02     LDA ($02),Y
  $A0AC: 20 29 80  JSR $8029
  $A0AF: 8D 40 06  STA $0640
  $A0B2: 8C 44 06  STY $0644
  $A0B5: AD 3E 06  LDA $063e
  $A0B8: 38        SEC
  $A0B9: E9 20     SBC #$20
  $A0BB: 8D 42 06  STA $0642
  $A0BE: AD 3F 06  LDA $063f
  $A0C1: B0 02     BCS $a0c5
  $A0C3: E9 00     SBC #$00
  $A0C5: 8D 43 06  STA $0643
  $A0C8: 20 23 80  JSR $8023
  $A0CB: 3D 06 A9  AND $a906,X
  $A0CE: 20 38 4C  JSR $4c38
  $A0D1: C5 DF     CMP $df
  $A0D3: A9 00     LDA #$00
  $A0D5: 85 07     STA $07
  $A0D7: 85 08     STA $08
  $A0D9: 85 09     STA $09
  $A0DB: A5 07     LDA $07
  $A0DD: 48        PHA
  $A0DE: 0A        ASL A
  $A0DF: 85 08     STA $08
  $A0E1: 68        PLA
  $A0E2: 6D 08 00  ADC $0008
  $A0E5: AA        TAX
  $A0E6: A5 09     LDA $09
  $A0E8: 0A        ASL A
  $A0E9: 0A        ASL A
  $A0EA: A8        TAY
  $A0EB: B9 00 06  LDA $0600,Y
  $A0EE: 29 3F     AND #$3f
  $A0F0: 9D 20 06  STA $0620,X
  $A0F3: B9 01 06  LDA $0601,Y
  $A0F6: 48        PHA
  $A0F7: 6A        ROR A
  $A0F8: 6A        ROR A
  $A0F9: 6A        ROR A
  $A0FA: 29 C0     AND #$c0
  $A0FC: 1D 20 06  ORA $0620,X
  $A0FF: 9D 20 06  STA $0620,X
  $A102: 68        PLA
  $A103: 4A        LSR A
  $A104: 4A        LSR A
  $A105: 29 0F     AND #$0f
  $A107: 9D 21 06  STA $0621,X
  $A10A: B9 02 06  LDA $0602,Y
  $A10D: 48        PHA
  $A10E: 0A        ASL A
  $A10F: 0A        ASL A
  $A110: 0A        ASL A
  $A111: 0A        ASL A
  $A112: 29 F0     AND #$f0
  $A114: 1D 21 06  ORA $0621,X
  $A117: 9D 21 06  STA $0621,X
  $A11A: 68        PLA
  $A11B: 4A        LSR A
  $A11C: 4A        LSR A
  $A11D: 4A        LSR A
  $A11E: 4A        LSR A
  $A11F: 29 03     AND #$03
  $A121: 9D 22 06  STA $0622,X
  $A124: B9 03 06  LDA $0603,Y
  $A127: 0A        ASL A
  $A128: 0A        ASL A
  $A129: 29 FC     AND #$fc
  $A12B: 1D 22 06  ORA $0622,X
  $A12E: 9D 22 06  STA $0622,X
  $A131: E6 07     INC $07
  $A133: E6 09     INC $09
  $A135: A5 07     LDA $07
  $A137: C9 08     CMP #$08
  $A139: D0 A0     BNE $a0db
  $A13B: A9 00     LDA #$00
  $A13D: 85 0C     STA $0c
  $A13F: 85 0D     STA $0d
  $A141: AD 25 06  LDA $0625
  $A144: 48        PHA
  $A145: 29 03     AND #$03
  $A147: 20 C2 E1  JSR $e1c2
  $A14A: 68        PLA
  $A14B: 29 FC     AND #$fc
  $A14D: 8D 25 06  STA $0625
  $A150: AD 29 06  LDA $0629
  $A153: 48        PHA
  $A154: 29 0C     AND #$0c
  $A156: 20 C2 E1  JSR $e1c2
  $A159: 68        PLA
  $A15A: 29 F3     AND #$f3
  $A15C: 8D 29 06  STA $0629
  $A15F: AD 2F 06  LDA $062f
  $A162: 48        PHA
  $A163: 29 30     AND #$30
  $A165: 20 C2 E1  JSR $e1c2
  $A168: 68        PLA
  $A169: 29 CF     AND #$cf
  $A16B: 8D 2F 06  STA $062f
  $A16E: AD 36 06  LDA $0636
  $A171: 48        PHA
  $A172: 29 C0     AND #$c0
  $A174: 20 C2 E1  JSR $e1c2
  $A177: 68        PLA
  $A178: 48        PHA
  $A179: 29 1F     AND #$1f
  $A17B: 8D 36 06  STA $0636
  $A17E: 68        PLA
  $A17F: 2A        ROL A
  $A180: 2A        ROL A
  $A181: 2A        ROL A
  $A182: 2A        ROL A
  $A183: 29 01     AND #$01
  $A185: 85 0D     STA $0d
  $A187: 20 CC E1  JSR $e1cc
  $A18A: A5 0C     LDA $0c
  $A18C: C5 0E     CMP $0e
  $A18E: D0 0C     BNE $a19c
  $A190: A5 0D     LDA $0d
  $A192: C5 0F     CMP $0f
  $A194: D0 06     BNE $a19c
  $A196: A9 04     LDA #$04
  $A198: 8D 55 06  STA $0655
  $A19B: 60        RTS
  $A19C: E6 AE     INC $ae
  $A19E: EE 55 06  INC $0655
  $A1A1: 60        RTS
  $A1A2: 57 16     SRE $16,X
  $A1A4: 88        DEY
  $A1A5: 31 92     AND ($92),Y
  $A1A7: 43 26     SRE ($26,X)
  $A1A9: 16 38     ASL $38,X
  $A1AB: 62        ???
  $A1AC: 40        RTI
  $A1AD: 50 78     BVC $a227
  $A1AF: 61 12     ADC ($12,X)
  $A1B1: 22        ???
  $A1B2: 64 21     NOP $21
  $A1B4: 13 23     SLO ($23),Y
  $A1B6: 49 82     EOR #$82
  $A1B8: 69 45     ADC #$45
  $A1BA: 24 97     BIT $97
  $A1BC: 47 85     SRE $85
  $A1BE: 08        PHP
  $A1BF: 17 12     SLO $12,X
  $A1C1: 10 18     BPL $a1db
  $A1C3: 65 0C     ADC $0c
  $A1C5: 85 0C     STA $0c
  $A1C7: 90 02     BCC $a1cb
  $A1C9: E6 0D     INC $0d
  $A1CB: 60        RTS
  $A1CC: A9 00     LDA #$00
  $A1CE: 85 0E     STA $0e
  $A1D0: 85 0F     STA $0f
  $A1D2: A2 17     LDX #$17
  $A1D4: BD 20 06  LDA $0620,X
  $A1D7: 18        CLC
  $A1D8: 65 0E     ADC $0e
  $A1DA: 85 0E     STA $0e
  $A1DC: 90 02     BCC $a1e0
  $A1DE: E6 0F     INC $0f
  $A1E0: CA        DEX
  $A1E1: 10 F1     BPL $a1d4
  $A1E3: A5 0F     LDA $0f
  $A1E5: 29 01     AND #$01
  $A1E7: 85 0F     STA $0f
  $A1E9: 60        RTS
  $A1EA: 2D 01 03  AND $0301
  $A1ED: F0 06     BEQ $a1f5
  $A1EF: 4D 03 03  EOR $0303
  $A1F2: 2D 01 03  AND $0301
  $A1F5: 60        RTS
  $A1F6: A2 00     LDX #$00
  $A1F8: BD 04 E2  LDA $e204,X
  $A1FB: 9D 00 02  STA $0200,X
  $A1FE: E8        INX
  $A1FF: E0 08     CPX #$08
  $A201: D0 F5     BNE $a1f8
  $A203: 60        RTS
  $A204: 48        PHA
  $A205: AF 00 38  LAX $3800
  $A208: 78        SEI
  $A209: AF 00 18  LAX $1800
  $A20C: A0 1F     LDY #$1f
  $A20E: A9 FF     LDA #$ff
  $A210: 99 00 06  STA $0600,Y
  $A213: 88        DEY
  $A214: 10 FA     BPL $a210
  $A216: EE 55 06  INC $0655
  $A219: 60        RTS
  $A21A: 20 20 E2  JSR $e220
  $A21D: 4C 5E E2  JMP $e25e
  $A220: A2 00     LDX #$00
  $A222: 86 A1     STX $a1
  $A224: 0A        ASL A
  $A225: 0A        ASL A
  $A226: 26 A1     ROL $a1
  $A228: 0A        ASL A
  $A229: 26 A1     ROL $a1
  $A22B: 85 A0     STA $a0
  $A22D: 0A        ASL A
  $A22E: 18        CLC
  $A22F: 65 A0     ADC $a0
  $A231: 90 02     BCC $a235
  $A233: E6 A1     INC $a1
  $A235: 85 A0     STA $a0
  $A237: 18        CLC
  $A238: 69 49     ADC #$49
  $A23A: 85 A0     STA $a0
  $A23C: A5 A1     LDA $a1
  $A23E: 69 E8     ADC #$e8
  $A240: 85 A1     STA $a1
  $A242: A0 00     LDY #$00
  $A244: A9 0F     LDA #$0f
  $A246: 48        PHA
  $A247: A2 00     LDX #$00
  $A249: 8A        TXA
  $A24A: 29 03     AND #$03
  $A24C: F0 04     BEQ $a252
  $A24E: B1 A0     LDA ($a0),Y
  $A250: C8        INY
  $A251: 2C 68 48  BIT $4868
  $A254: 9D 18 03  STA $0318,X
  $A257: E8        INX
  $A258: E0 20     CPX #$20
  $A25A: D0 ED     BNE $a249
  $A25C: 68        PLA
  $A25D: 60        RTS
  $A25E: 20 23 80  JSR $8023
  $A261: 15 03     ORA $03,X
  $A263: 60        RTS
  $A264: D0 01     BNE $a267
  $A266: 60        RTS
  $A267: 0A        ASL A
  $A268: AA        TAX
  $A269: CA        DEX
  $A26A: CA        DEX
  $A26B: BD 92 E9  LDA $e992,X
  $A26E: 85 00     STA $00
  $A270: BD 93 E9  LDA $e993,X
  $A273: 85 01     STA $01
  $A275: A0 00     LDY #$00
  $A277: 84 03     STY $03
  $A279: B1 00     LDA ($00),Y
  $A27B: 8D 3B 03  STA $033b
  $A27E: C8        INY
  $A27F: B1 00     LDA ($00),Y
  $A281: 8D 3C 03  STA $033c
  $A284: C8        INY
  $A285: B1 00     LDA ($00),Y
  $A287: 85 05     STA $05
  $A289: C8        INY
  $A28A: B1 00     LDA ($00),Y
  $A28C: 85 06     STA $06
  $A28E: C8        INY
  $A28F: B1 00     LDA ($00),Y
  $A291: 85 07     STA $07
  $A293: C8        INY
  $A294: 84 02     STY $02
  $A296: A2 00     LDX #$00
  $A298: A4 02     LDY $02
  $A29A: B1 00     LDA ($00),Y
  $A29C: D0 12     BNE $a2b0
  $A29E: C8        INY
  $A29F: B1 00     LDA ($00),Y
  $A2A1: 85 04     STA $04
  $A2A3: C8        INY
  $A2A4: B1 00     LDA ($00),Y
  $A2A6: 9D 3D 03  STA $033d,X
  $A2A9: E8        INX
  $A2AA: C6 04     DEC $04
  $A2AC: D0 F8     BNE $a2a6
  $A2AE: F0 04     BEQ $a2b4
  $A2B0: 9D 3D 03  STA $033d,X
  $A2B3: E8        INX
  $A2B4: C8        INY
  $A2B5: 84 02     STY $02
  $A2B7: E4 05     CPX $05
  $A2B9: D0 DD     BNE $a298
  $A2BB: 8E 3A 03  STX $033a
  $A2BE: A5 02     LDA $02
  $A2C0: 18        CLC
  $A2C1: 65 00     ADC $00
  $A2C3: 85 00     STA $00
  $A2C5: 90 02     BCC $a2c9
  $A2C7: E6 01     INC $01
  $A2C9: 8A        TXA
  $A2CA: 20 2F 80  JSR $802f
  $A2CD: 20 32 80  JSR $8032
  $A2D0: A9 20     LDA #$20
  $A2D2: 18        CLC
  $A2D3: 6D 3B 03  ADC $033b
  $A2D6: 8D 3B 03  STA $033b
  $A2D9: 90 03     BCC $a2de
  $A2DB: EE 3C 03  INC $033c
  $A2DE: A9 00     LDA #$00
  $A2E0: 85 02     STA $02
  $A2E2: E6 03     INC $03
  $A2E4: A5 03     LDA $03
  $A2E6: C5 06     CMP $06
  $A2E8: D0 AC     BNE $a296
  $A2EA: A9 C0     LDA #$c0
  $A2EC: 8D 3B 03  STA $033b
  $A2EF: A9 23     LDA #$23
  $A2F1: 8D 3C 03  STA $033c
  $A2F4: A2 00     LDX #$00
  $A2F6: 86 02     STX $02
  $A2F8: A4 02     LDY $02
  $A2FA: B1 00     LDA ($00),Y
  $A2FC: 9D 3D 03  STA $033d,X
  $A2FF: C8        INY
  $A300: E8        INX
  $A301: E4 07     CPX $07
  $A303: D0 F5     BNE $a2fa
  $A305: 84 02     STY $02
  $A307: 8E 3A 03  STX $033a
  $A30A: 8A        TXA
  $A30B: 20 2F 80  JSR $802f
  $A30E: 20 32 80  JSR $8032
  $A311: A4 02     LDY $02
  $A313: B1 00     LDA ($00),Y
  $A315: E6 02     INC $02
  $A317: 8D 3D 03  STA $033d
  $A31A: A9 40     LDA #$40
  $A31C: 8D 3B 03  STA $033b
  $A31F: A9 21     LDA #$21
  $A321: 8D 3C 03  STA $033c
  $A324: A9 01     LDA #$01
  $A326: 8D 3A 03  STA $033a
  $A329: 20 2F 80  JSR $802f
  $A32C: 20 32 80  JSR $8032
  $A32F: A4 02     LDY $02
  $A331: B1 00     LDA ($00),Y
  $A333: 85 1A     STA $1a
  $A335: A9 00     LDA #$00
  $A337: 85 BC     STA $bc
  $A339: C8        INY
  $A33A: B1 00     LDA ($00),Y
  $A33C: 4C 20 E2  JMP $e220
  $A33F: D0 01     BNE $a342
  $A341: 60        RTS
  $A342: A2 00     LDX #$00
  $A344: 86 B1     STX $b1
  $A346: A2 03     LDX #$03
  $A348: 86 B2     STX $b2
  $A34A: A2 20     LDX #$20
  $A34C: 86 B3     STX $b3
  $A34E: A2 28     LDX #$28
  $A350: 86 B4     STX $b4
  $A352: 0A        ASL A
  $A353: AA        TAX
  $A354: CA        DEX
  $A355: CA        DEX
  $A356: BD 0A F0  LDA $f00a,X
  $A359: 85 AF     STA $af
  $A35B: BD 0B F0  LDA $f00b,X
  $A35E: 85 B0     STA $b0
  $A360: A0 00     LDY #$00
  $A362: B1 AF     LDA ($af),Y
  $A364: 85 1B     STA $1b
  $A366: C8        INY
  $A367: B1 AF     LDA ($af),Y
  $A369: D0 03     BNE $a36e
  $A36B: 85 BD     STA $bd
  $A36D: 60        RTS
  $A36E: 85 B1     STA $b1
  $A370: C8        INY
  $A371: B1 AF     LDA ($af),Y
  $A373: 18        CLC
  $A374: 65 B4     ADC $b4
  $A376: 85 B5     STA $b5
  $A378: C8        INY
  $A379: A5 B2     LDA $b2
  $A37B: 0A        ASL A
  $A37C: 0A        ASL A
  $A37D: AA        TAX
  $A37E: A5 B5     LDA $b5
  $A380: 38        SEC
  $A381: E9 01     SBC #$01
  $A383: 18        CLC
  $A384: 65 B8     ADC $b8
  $A386: 9D 00 02  STA $0200,X
  $A389: B1 AF     LDA ($af),Y
  $A38B: 18        CLC
  $A38C: 65 B3     ADC $b3
  $A38E: 38        SEC
  $A38F: E5 16     SBC $16
  $A391: 08        PHP
  $A392: 18        CLC
  $A393: 65 B7     ADC $b7
  $A395: 9D 03 02  STA $0203,X
  $A398: 28        PLP
  $A399: B0 05     BCS $a3a0
  $A39B: A9 F8     LDA #$f8
  $A39D: 9D 00 02  STA $0200,X
  $A3A0: C8        INY
  $A3A1: B1 AF     LDA ($af),Y
  $A3A3: 9D 01 02  STA $0201,X
  $A3A6: C8        INY
  $A3A7: B1 AF     LDA ($af),Y
  $A3A9: 29 E3     AND #$e3
  $A3AB: 9D 02 02  STA $0202,X
  $A3AE: E6 B2     INC $b2
  $A3B0: C8        INY
  $A3B1: C6 B1     DEC $b1
  $A3B3: D0 C4     BNE $a379
  $A3B5: F0 B0     BEQ $a367
  $A3B7: 29 F8     AND #$f8
  $A3B9: 85 00     STA $00
  $A3BB: A9 00     LDA #$00
  $A3BD: 06 00     ASL $00
  $A3BF: 2A        ROL A
  $A3C0: 06 00     ASL $00
  $A3C2: 2A        ROL A
  $A3C3: 8D 01 00  STA $0001
  $A3C6: 8A        TXA
  $A3C7: 4A        LSR A
  $A3C8: 4A        LSR A
  $A3C9: 4A        LSR A
  $A3CA: 05 00     ORA $00
  $A3CC: 38        SEC
  $A3CD: E9 20     SBC #$20
  $A3CF: 85 00     STA $00
  $A3D1: B0 02     BCS $a3d5
  $A3D3: C6 01     DEC $01
  $A3D5: 60        RTS
  $A3D6: A5 AE     LDA $ae
  $A3D8: D0 01     BNE $a3db
  $A3DA: 60        RTS
  $A3DB: C5 A5     CMP $a5
  $A3DD: D0 07     BNE $a3e6
  $A3DF: A5 A9     LDA $a9
  $A3E1: F0 14     BEQ $a3f7
  $A3E3: C6 A9     DEC $a9
  $A3E5: 60        RTS
  $A3E6: 85 A5     STA $a5
  $A3E8: A9 F8     LDA #$f8
  $A3EA: 8D 00 02  STA $0200
  $A3ED: A9 00     LDA #$00
  $A3EF: 85 A9     STA $a9
  $A3F1: 85 A6     STA $a6
  $A3F3: 85 A7     STA $a7
  $A3F5: 85 AA     STA $aa
  $A3F7: A2 01     LDX #$01
  $A3F9: 86 A9     STX $a9
  $A3FB: CA        DEX
  $A3FC: 86 A8     STX $a8
  $A3FE: A9 E7     LDA #$e7
  $A400: 85 A7     STA $a7
  $A402: A0 20     LDY #$20
  $A404: A5 A8     LDA $a8
  $A406: 0A        ASL A
  $A407: 0A        ASL A
  $A408: AA        TAX
  $A409: A9 01     LDA #$01
  $A40B: 9D 3A 03  STA $033a,X
  $A40E: 18        CLC
  $A40F: A5 A6     LDA $a6
  $A411: 65 A7     ADC $a7
  $A413: 9D 3B 03  STA $033b,X
  $A416: 98        TYA
  $A417: 9D 3C 03  STA $033c,X
  $A41A: A9 00     LDA #$00
  $A41C: 9D 3D 03  STA $033d,X
  $A41F: A9 20     LDA #$20
  $A421: 18        CLC
  $A422: 65 A7     ADC $a7
  $A424: 85 A7     STA $a7
  $A426: 90 01     BCC $a429
  $A428: C8        INY
  $A429: E6 A8     INC $a8
  $A42B: A5 A8     LDA $a8
  $A42D: C9 05     CMP #$05
  $A42F: D0 D3     BNE $a404
  $A431: AD 47 06  LDA $0647
  $A434: D0 03     BNE $a439
  $A436: 20 55 E4  JSR $e455
  $A439: AD 48 06  LDA $0648
  $A43C: F0 03     BEQ $a441
  $A43E: 20 7B E4  JSR $e47b
  $A441: A9 11     LDA #$11
  $A443: 20 2F 80  JSR $802f
  $A446: E6 A6     INC $a6
  $A448: A5 A6     LDA $a6
  $A44A: C9 12     CMP #$12
  $A44C: D0 06     BNE $a454
  $A44E: A9 00     LDA #$00
  $A450: 85 AE     STA $ae
  $A452: 85 A5     STA $a5
  $A454: 60        RTS
  $A455: A6 A6     LDX $a6
  $A457: E0 13     CPX #$13
  $A459: 90 01     BCC $a45c
  $A45B: 60        RTS
  $A45C: BD 69 E4  LDA $e469,X
  $A45F: 20 29 80  JSR $8029
  $A462: 8C 41 03  STY $0341
  $A465: 8D 45 03  STA $0345
  $A468: 60        RTS
  $A469: 3C 04 2E  NOP $2e04,X
  $A46C: 13 36     SLO ($36),Y
  $A46E: 3A        NOP
  $A46F: 09 29     ORA #$29
  $A471: 19 3A 9F  ORA $9f3a,Y
  $A474: 8C 86 AE  STY $ae86
  $A477: 87 59     SAX $59
  $A479: 36 3D     ROL $3d,X
  $A47B: A5 A6     LDA $a6
  $A47D: C9 12     CMP #$12
  $A47F: B0 26     BCS $a4a7
  $A481: C9 05     CMP #$05
  $A483: F0 22     BEQ $a4a7
  $A485: C9 0B     CMP #$0b
  $A487: F0 1E     BEQ $a4a7
  $A489: A6 AA     LDX $aa
  $A48B: BD 91 06  LDA $0691,X
  $A48E: 20 A8 E4  JSR $e4a8
  $A491: 8C 3D 03  STY $033d
  $A494: 8D 41 03  STA $0341
  $A497: A6 AA     LDX $aa
  $A499: BD A1 06  LDA $06a1,X
  $A49C: 20 A8 E4  JSR $e4a8
  $A49F: 8C 49 03  STY $0349
  $A4A2: 8D 4D 03  STA $034d
  $A4A5: E6 AA     INC $aa
  $A4A7: 60        RTS
  $A4A8: 29 3F     AND #$3f
  $A4AA: C9 23     CMP #$23
  $A4AC: 90 07     BCC $a4b5
  $A4AE: 38        SEC
  $A4AF: E9 23     SBC #$23
  $A4B1: AA        TAX
  $A4B2: BD B9 E4  LDA $e4b9,X
  $A4B5: 20 29 80  JSR $8029
  $A4B8: 60        RTS
  $A4B9: 26 27     ROL $27
  $A4BB: 28        PLP
  $A4BC: 29 2A     AND #$2a
  $A4BE: 4F 50 51  SRE $5150
  $A4C1: 52        ???
  $A4C2: 53 54     SRE ($54),Y
  $A4C4: 55 56     EOR $56,X
  $A4C6: 57 58     SRE $58,X
  $A4C8: 63 64     RRA ($64,X)
  $A4CA: 65 66     ADC $66
  $A4CC: 67 68     RRA $68
  $A4CE: 69 6A     ADC #$6a
  $A4D0: 6B 6C     ARR #$6c
  $A4D2: 23 24     RLA ($24,X)
  $A4D4: 25 2B     AND $2b
  $A4D6: 00        BRK
  $A4D7: A2 03     LDX #$03
  $A4D9: BD E3 E4  LDA $e4e3,X
  $A4DC: 9D 00 02  STA $0200,X
  $A4DF: CA        DEX
  $A4E0: 10 F7     BPL $a4d9
  $A4E2: 60        RTS
  $A4E3: 50 FF     BVC $a4e4
  $A4E5: 23 01     RLA ($01,X)
  $A4E7: A0 04     LDY #$04
  $A4E9: A9 F8     LDA #$f8
  $A4EB: 99 00 02  STA $0200,Y
  $A4EE: C8        INY
  $A4EF: C8        INY
  $A4F0: C8        INY
  $A4F1: C8        INY
  $A4F2: D0 F7     BNE $a4eb
  $A4F4: 60        RTS
  $A4F5: 2C 02 20  BIT $2002
  $A4F8: 70 FB     BVS $a4f5
  $A4FA: 2C 02 20  BIT $2002
  $A4FD: 50 FB     BVC $a4fa
  $A4FF: A9 20     LDA #$20
  $A501: 20 26 80  JSR $8026
  $A504: A9 40     LDA #$40
  $A506: 20 26 80  JSR $8026
  $A509: 60        RTS
  $A50A: C5 A5     CMP $a5
  $A50C: D0 07     BNE $a515
  $A50E: A5 A8     LDA $a8
  $A510: F0 1C     BEQ $a52e
  $A512: C6 A8     DEC $a8
  $A514: 60        RTS
  $A515: 85 A5     STA $a5
  $A517: 0A        ASL A
  $A518: AA        TAX
  $A519: CA        DEX
  $A51A: CA        DEX
  $A51B: BD B2 F2  LDA $f2b2,X
  $A51E: 85 A6     STA $a6
  $A520: BD B3 F2  LDA $f2b3,X
  $A523: 85 A7     STA $a7
  $A525: A2 05     LDX #$05
  $A527: A9 00     LDA #$00
  $A529: 95 A8     STA $a8,X
  $A52B: CA        DEX
  $A52C: 10 FB     BPL $a529
  $A52E: A9 02     LDA #$02
  $A530: 85 A8     STA $a8
  $A532: A5 A9     LDA $a9
  $A534: 0A        ASL A
  $A535: 0A        ASL A
  $A536: A8        TAY
  $A537: B1 A6     LDA ($a6),Y
  $A539: 8D 3B 03  STA $033b
  $A53C: C8        INY
  $A53D: B1 A6     LDA ($a6),Y
  $A53F: AA        TAX
  $A540: 29 3F     AND #$3f
  $A542: D0 10     BNE $a554
  $A544: 8A        TXA
  $A545: 2A        ROL A
  $A546: 2A        ROL A
  $A547: 2A        ROL A
  $A548: 29 03     AND #$03
  $A54A: 20 B8 E5  JSR $e5b8
  $A54D: A9 00     LDA #$00
  $A54F: 85 A4     STA $a4
  $A551: 85 A5     STA $a5
  $A553: 60        RTS
  $A554: 8D 3C 03  STA $033c
  $A557: C8        INY
  $A558: B1 A6     LDA ($a6),Y
  $A55A: 85 00     STA $00
  $A55C: C8        INY
  $A55D: B1 A6     LDA ($a6),Y
  $A55F: 85 01     STA $01
  $A561: A0 00     LDY #$00
  $A563: 84 AA     STY $aa
  $A565: 84 AB     STY $ab
  $A567: B1 00     LDA ($00),Y
  $A569: 8D 3A 03  STA $033a
  $A56C: 85 AB     STA $ab
  $A56E: AA        TAX
  $A56F: 9D 3D 03  STA $033d,X
  $A572: C8        INY
  $A573: 84 AA     STY $aa
  $A575: A4 AA     LDY $aa
  $A577: B1 00     LDA ($00),Y
  $A579: 20 29 80  JSR $8029
  $A57C: 84 02     STY $02
  $A57E: A6 AA     LDX $aa
  $A580: 9D 3C 03  STA $033c,X
  $A583: AD 3A 03  LDA $033a
  $A586: 18        CLC
  $A587: 65 AA     ADC $aa
  $A589: AA        TAX
  $A58A: A5 02     LDA $02
  $A58C: 9D 3F 03  STA $033f,X
  $A58F: E6 AA     INC $aa
  $A591: C6 AB     DEC $ab
  $A593: D0 E0     BNE $a575
  $A595: AE 3A 03  LDX $033a
  $A598: AD 3B 03  LDA $033b
  $A59B: 38        SEC
  $A59C: E9 20     SBC #$20
  $A59E: 9D 3E 03  STA $033e,X
  $A5A1: AD 3C 03  LDA $033c
  $A5A4: B0 02     BCS $a5a8
  $A5A6: E9 00     SBC #$00
  $A5A8: 9D 3F 03  STA $033f,X
  $A5AB: AD 3A 03  LDA $033a
  $A5AE: 0A        ASL A
  $A5AF: 18        CLC
  $A5B0: 69 03     ADC #$03
  $A5B2: 20 2F 80  JSR $802f
  $A5B5: E6 A9     INC $a9
  $A5B7: 60        RTS
  $A5B8: F0 17     BEQ $a5d1
  $A5BA: AA        TAX
  $A5BB: CA        DEX
  $A5BC: BD D2 E5  LDA $e5d2,X
  $A5BF: 8D 04 02  STA $0204
  $A5C2: A9 B8     LDA #$b8
  $A5C4: 8D 07 02  STA $0207
  $A5C7: A9 AF     LDA #$af
  $A5C9: 8D 05 02  STA $0205
  $A5CC: A9 03     LDA #$03
  $A5CE: 8D 06 02  STA $0206
  $A5D1: 60        RTS
  $A5D2: 78        SEI
  $A5D3: 88        DEY
  $A5D4: C5 A5     CMP $a5
  $A5D6: D0 07     BNE $a5df
  $A5D8: A5 A6     LDA $a6
  $A5DA: F0 16     BEQ $a5f2
  $A5DC: C6 A6     DEC $a6
  $A5DE: 60        RTS
  $A5DF: 85 A5     STA $a5
  $A5E1: A6 C1     LDX $c1
  $A5E3: BD 80 E6  LDA $e680,X
  $A5E6: 8D A8 00  STA $00a8
  $A5E9: A9 21     LDA #$21
  $A5EB: 8D A9 00  STA $00a9
  $A5EE: A9 00     LDA #$00
  $A5F0: 85 A7     STA $a7
  $A5F2: A9 01     LDA #$01
  $A5F4: 85 A6     STA $a6
  $A5F6: AD A8 00  LDA $00a8
  $A5F9: 8D 3B 03  STA $033b
  $A5FC: AD A9 00  LDA $00a9
  $A5FF: 8D 3C 03  STA $033c
  $A602: A6 C1     LDX $c1
  $A604: BD 82 E6  LDA $e682,X
  $A607: 8D 3A 03  STA $033a
  $A60A: AA        TAX
  $A60B: 9D 3D 03  STA $033d,X
  $A60E: A2 00     LDX #$00
  $A610: 86 00     STX $00
  $A612: A9 00     LDA #$00
  $A614: A6 00     LDX $00
  $A616: 9D 3D 03  STA $033d,X
  $A619: 48        PHA
  $A61A: 8A        TXA
  $A61B: 18        CLC
  $A61C: 6D 3A 03  ADC $033a
  $A61F: AA        TAX
  $A620: 68        PLA
  $A621: 9D 40 03  STA $0340,X
  $A624: E6 00     INC $00
  $A626: A5 00     LDA $00
  $A628: CD 3A 03  CMP $033a
  $A62B: D0 E5     BNE $a612
  $A62D: AE 3A 03  LDX $033a
  $A630: AD 3B 03  LDA $033b
  $A633: 38        SEC
  $A634: E9 20     SBC #$20
  $A636: 9D 3E 03  STA $033e,X
  $A639: AD 3C 03  LDA $033c
  $A63C: B0 02     BCS $a640
  $A63E: E9 00     SBC #$00
  $A640: 9D 3F 03  STA $033f,X
  $A643: AD 3A 03  LDA $033a
  $A646: 0A        ASL A
  $A647: 18        CLC
  $A648: 69 03     ADC #$03
  $A64A: 20 2F 80  JSR $802f
  $A64D: AD A8 00  LDA $00a8
  $A650: 18        CLC
  $A651: 69 40     ADC #$40
  $A653: 8D A8 00  STA $00a8
  $A656: 90 03     BCC $a65b
  $A658: EE A9 00  INC $00a9
  $A65B: E6 A7     INC $a7
  $A65D: A5 A7     LDA $a7
  $A65F: C9 07     CMP #$07
  $A661: D0 1C     BNE $a67f
  $A663: A9 00     LDA #$00
  $A665: 85 A5     STA $a5
  $A667: E6 C1     INC $c1
  $A669: A5 C1     LDA $c1
  $A66B: 29 01     AND #$01
  $A66D: 85 C1     STA $c1
  $A66F: AD C1 00  LDA $00c1
  $A672: D0 0B     BNE $a67f
  $A674: 8D C0 00  STA $00c0
  $A677: 8D C1 00  STA $00c1
  $A67A: A9 F8     LDA #$f8
  $A67C: 8D 04 02  STA $0204
  $A67F: 60        RTS
  $A680: E0 F8     CPX #$f8
  $A682: 16 07     ASL $07,X
  $A684: AD 5A 06  LDA $065a
  $A687: D0 06     BNE $a68f
  $A689: 60        RTS
  $A68A: 0A        ASL A
  $A68B: AA        TAX
  $A68C: CA        DEX
  $A68D: CA        DEX
  $A68E: 60        RTS
  $A68F: 20 8A E6  JSR $e68a
  $A692: BD 6D FE  LDA $fe6d,X
  $A695: 85 00     STA $00
  $A697: BD 6E FE  LDA $fe6e,X
  $A69A: 85 01     STA $01
  $A69C: A0 00     LDY #$00
  $A69E: B1 00     LDA ($00),Y
  $A6A0: 8D 61 06  STA $0661
  $A6A3: 85 02     STA $02
  $A6A5: C8        INY
  $A6A6: B1 00     LDA ($00),Y
  $A6A8: 99 61 06  STA $0661,Y
  $A6AB: C6 02     DEC $02
  $A6AD: D0 F6     BNE $a6a5
  $A6AF: AD 5A 06  LDA $065a
  $A6B2: C9 02     CMP #$02
  $A6B4: 90 20     BCC $a6d6
  $A6B6: C9 05     CMP #$05
  $A6B8: F0 1C     BEQ $a6d6
  $A6BA: C9 07     CMP #$07
  $A6BC: F0 18     BEQ $a6d6
  $A6BE: C9 09     CMP #$09
  $A6C0: B0 14     BCS $a6d6
  $A6C2: E9 01     SBC #$01
  $A6C4: AA        TAX
  $A6C5: AD 5C 06  LDA $065c
  $A6C8: CA        DEX
  $A6C9: 30 04     BMI $a6cf
  $A6CB: 4A        LSR A
  $A6CC: 4C C8 E6  JMP $e6c8
  $A6CF: 29 01     AND #$01
  $A6D1: 85 03     STA $03
  $A6D3: 4C DA E6  JMP $e6da
  $A6D6: A9 00     LDA #$00
  $A6D8: 85 03     STA $03
  $A6DA: AD 5A 06  LDA $065a
  $A6DD: 20 8A E6  JSR $e68a
  $A6E0: BD B3 FE  LDA $feb3,X
  $A6E3: 85 00     STA $00
  $A6E5: BD B4 FE  LDA $feb4,X
  $A6E8: 85 01     STA $01
  $A6EA: A9 02     LDA #$02
  $A6EC: 8D 6A 06  STA $066a
  $A6EF: A5 03     LDA $03
  $A6F1: 0A        ASL A
  $A6F2: A8        TAY
  $A6F3: B1 00     LDA ($00),Y
  $A6F5: 8D 6B 06  STA $066b
  $A6F8: C8        INY
  $A6F9: B1 00     LDA ($00),Y
  $A6FB: 8D 6C 06  STA $066c
  $A6FE: AD 5A 06  LDA $065a
  $A701: 20 8A E6  JSR $e68a
  $A704: BD DD FE  LDA $fedd,X
  $A707: 85 00     STA $00
  $A709: BD DE FE  LDA $fede,X
  $A70C: 85 01     STA $01
  $A70E: A9 02     LDA #$02
  $A710: 8D 6D 06  STA $066d
  $A713: A0 00     LDY #$00
  $A715: B1 00     LDA ($00),Y
  $A717: 99 6E 06  STA $066e,Y
  $A71A: C8        INY
  $A71B: C0 02     CPY #$02
  $A71D: D0 F6     BNE $a715
  $A71F: 60        RTS
  $A720: 0A        ASL A
  $A721: AA        TAX
  $A722: CA        DEX
  $A723: CA        DEX
  $A724: BD F5 FE  LDA $fef5,X
  $A727: 85 00     STA $00
  $A729: BD F6 FE  LDA $fef6,X
  $A72C: 85 01     STA $01
  $A72E: A0 00     LDY #$00
  $A730: B1 00     LDA ($00),Y
  $A732: 8D BC 00  STA $00bc
  $A735: C8        INY
  $A736: B1 00     LDA ($00),Y
  $A738: 8D BD 00  STA $00bd
  $A73B: 60        RTS
  $A73C: A9 20     LDA #$20
  $A73E: AE 02 20  LDX $2002
  $A741: 8D 06 20  STA $2006
  $A744: A9 00     LDA #$00
  $A746: 8D 06 20  STA $2006
  $A749: A2 40     LDX #$40
  $A74B: A0 01     LDY #$01
  $A74D: 8D 07 20  STA $2007
  $A750: CA        DEX
  $A751: D0 FA     BNE $a74d
  $A753: 88        DEY
  $A754: D0 F7     BNE $a74d
  $A756: 60        RTS
  $A757: 18        CLC
  $A758: 65 C7     ADC $c7
  $A75A: C9 0A     CMP #$0a
  $A75C: B0 04     BCS $a762
  $A75E: 85 C7     STA $c7
  $A760: D0 37     BNE $a799
  $A762: 38        SEC
  $A763: E9 0A     SBC #$0a
  $A765: 85 C7     STA $c7
  $A767: E6 C6     INC $c6
  $A769: A5 C6     LDA $c6
  $A76B: C9 06     CMP #$06
  $A76D: B0 04     BCS $a773
  $A76F: 85 C6     STA $c6
  $A771: D0 26     BNE $a799
  $A773: 38        SEC
  $A774: E9 06     SBC #$06
  $A776: 85 C6     STA $c6
  $A778: E6 C4     INC $c4
  $A77A: A5 C4     LDA $c4
  $A77C: C9 0A     CMP #$0a
  $A77E: B0 04     BCS $a784
  $A780: 85 C4     STA $c4
  $A782: D0 15     BNE $a799
  $A784: 38        SEC
  $A785: E9 0A     SBC #$0a
  $A787: 85 C4     STA $c4
  $A789: E6 C3     INC $c3
  $A78B: A5 C3     LDA $c3
  $A78D: C9 02     CMP #$02
  $A78F: B0 04     BCS $a795
  $A791: 85 C3     STA $c3
  $A793: D0 04     BNE $a799
  $A795: A9 00     LDA #$00
  $A797: 85 C3     STA $c3
  $A799: A9 FD     LDA #$fd
  $A79B: 85 C5     STA $c5
  $A79D: A2 00     LDX #$00
  $A79F: BD D1 E7  LDA $e7d1,X
  $A7A2: 9D 3A 03  STA $033a,X
  $A7A5: E8        INX
  $A7A6: E0 1E     CPX #$1e
  $A7A8: D0 F5     BNE $a79f
  $A7AA: A9 05     LDA #$05
  $A7AC: 8D 58 03  STA $0358
  $A7AF: A9 8D     LDA #$8d
  $A7B1: 8D 59 03  STA $0359
  $A7B4: A9 21     LDA #$21
  $A7B6: 8D 5A 03  STA $035a
  $A7B9: A2 00     LDX #$00
  $A7BB: B5 C3     LDA $c3,X
  $A7BD: 18        CLC
  $A7BE: 69 3E     ADC #$3e
  $A7C0: 20 29 80  JSR $8029
  $A7C3: 9D 5B 03  STA $035b,X
  $A7C6: E8        INX
  $A7C7: E0 05     CPX #$05
  $A7C9: D0 F0     BNE $a7bb
  $A7CB: A9 23     LDA #$23
  $A7CD: 20 2F 80  JSR $802f
  $A7D0: 60        RTS
  $A7D1: 07 6C     SLO $6c
  $A7D3: 21 18     AND ($18,X)
  $A7D5: 04 04     NOP $04
  $A7D7: 04 04     NOP $04
  $A7D9: 04 19     NOP $19
  $A7DB: 07 8C     SLO $8c
  $A7DD: 21 06     AND ($06,X)
  $A7DF: 00        BRK
  $A7E0: 00        BRK
  $A7E1: 61 00     ADC ($00,X)
  $A7E3: 00        BRK
  $A7E4: 07 07     SLO $07
  $A7E6: AC 21 1A  LDY $1a21
  $A7E9: 05 05     ORA $05
  $A7EB: 05 05     ORA $05
  $A7ED: 05 1B     ORA $1b
  $A7EF: AD 5A 06  LDA $065a
  $A7F2: 20 8A E6  JSR $e68a
  $A7F5: BD 15 FF  LDA $ff15,X
  $A7F8: 85 00     STA $00
  $A7FA: BD 16 FF  LDA $ff16,X
  $A7FD: 85 01     STA $01
  $A7FF: A0 02     LDY #$02
  $A801: B1 00     LDA ($00),Y
  $A803: 99 70 06  STA $0670,Y
  $A806: 88        DEY
  $A807: 10 F8     BPL $a801
  $A809: 60        RTS
  $A80A: AD 01 06  LDA $0601
  $A80D: 20 20 E2  JSR $e220
  $A810: A0 00     LDY #$00
  $A812: 98        TYA
  $A813: 29 03     AND #$03
  $A815: F0 17     BEQ $a82e
  $A817: B9 18 03  LDA $0318,Y
  $A81A: 29 F0     AND #$f0
  $A81C: CD 00 06  CMP $0600
  $A81F: F0 0D     BEQ $a82e
  $A821: 90 0B     BCC $a82e
  $A823: B9 18 03  LDA $0318,Y
  $A826: 29 0F     AND #$0f
  $A828: 0D 00 06  ORA $0600
  $A82B: 99 18 03  STA $0318,Y
  $A82E: C8        INY
  $A82F: C0 20     CPY #$20
  $A831: D0 DF     BNE $a812
  $A833: A2 06     LDX #$06
  $A835: 20 08 80  JSR $8008
  $A838: 20 5E E2  JSR $e25e
  $A83B: 60        RTS
  $A83C: A2 00     LDX #$00
  $A83E: A9 0F     LDA #$0f
  $A840: 9D 18 03  STA $0318,X
  $A843: E8        INX
  $A844: E0 20     CPX #$20
  $A846: D0 F6     BNE $a83e
  $A848: 60        RTS
  $A849: 0F 30 0F  SLO $0f30
  $A84C: 0F 2A 0F  SLO $0f2a
  $A84F: 0F 25 0F  SLO $0f25
  $A852: 0F 0F 0F  SLO $0f0f
  $A855: 22        ???
  $A856: 30 0F     BMI $a867
  $A858: 0F 0F 0F  SLO $0f0f
  $A85B: 0F 0F 0F  SLO $0f0f
  $A85E: 0F 0F 0F  SLO $0f0f
  $A861: 0F 30 21  SLO $2130
  $A864: 36 30     ROL $30,X
  $A866: 21 36     AND ($36,X)
  $A868: 30 1A     BMI $a884
  $A86A: 36 21     ROL $21,X
  $A86C: 1A        NOP
  $A86D: 0F 0F 0F  SLO $0f0f
  $A870: 0F 0F 0F  SLO $0f0f
  $A873: 0F 0F 0F  SLO $0f0f
  $A876: 0F 30 0F  SLO $0f30
  $A879: 0F 30 0F  SLO $0f30
  $A87C: 21 10     AND ($10,X)
  $A87E: 38        SEC
  $A87F: 28        PLP
  $A880: 10 38     BPL $a8ba
  $A882: 21 30     AND ($30,X)
  $A884: 37 0F     RLA $0f,X
  $A886: 1A        NOP
  $A887: 29 0F     AND #$0f
  $A889: 26 36     ROL $36
  $A88B: 0F 26 17  SLO $1726
  $A88E: 0F 30 0F  SLO $0f30
  $A891: 0F 30 0F  SLO $0f30
  $A894: 1A        NOP
  $A895: 2A        ROL A
  $A896: 21 0F     AND ($0f,X)
  $A898: 21 22     AND ($22,X)
  $A89A: 31 30     AND ($30),Y
  $A89C: 22        ???
  $A89D: 0F 30 10  SLO $1030
  $A8A0: 0F 25 36  SLO $3625
  $A8A3: 0F 0F 0F  SLO $0f0f
  $A8A6: 0F 30 0F  SLO $0f30
  $A8A9: 0F 30 21  SLO $2130
  $A8AC: 32        ???
  $A8AD: 30 21     BMI $a8d0
  $A8AF: 1A        NOP
  $A8B0: 30 37     BMI $a8e9
  $A8B2: 32        ???
  $A8B3: 30 37     BMI $a8ec
  $A8B5: 0F 0F 0F  SLO $0f0f
  $A8B8: 0F 0F 0F  SLO $0f0f
  $A8BB: 0F 0F 0F  SLO $0f0f
  $A8BE: 0F 30 0F  SLO $0f30
  $A8C1: 0F 30 0F  SLO $0f30
  $A8C4: 21 10     AND ($10,X)
  $A8C6: 30 1A     BMI $a8e2
  $A8C8: 30 10     BMI $a8da
  $A8CA: 21 31     AND ($31,X)
  $A8CC: 30 0F     BMI $a8dd
  $A8CE: 22        ???
  $A8CF: 35 0F     AND $0f,X
  $A8D1: 37 30     RLA $30,X
  $A8D3: 0F 0F 0F  SLO $0f0f
  $A8D6: 0F 30 0F  SLO $0f30
  $A8D9: 0F 30 0F  SLO $0f30
  $A8DC: 21 10     AND ($10,X)
  $A8DE: 38        SEC
  $A8DF: 28        PLP
  $A8E0: 10 38     BPL $a91a
  $A8E2: 21 30     AND ($30,X)
  $A8E4: 37 0F     RLA $0f,X
  $A8E6: 1A        NOP
  $A8E7: 29 0F     AND #$0f
  $A8E9: 26 36     ROL $36
  $A8EB: 0F 26 17  SLO $1726
  $A8EE: 0F 30 0F  SLO $0f30
  $A8F1: 0F 30 21  SLO $2130
  $A8F4: 21 30     AND ($30,X)
  $A8F6: 31 1A     AND ($1a),Y
  $A8F8: 30 31     BMI $a92b
  $A8FA: 21 10     AND ($10,X)
  $A8FC: 31 0F     AND ($0f),Y
  $A8FE: 26 07     ROL $07
  $A900: 0F 26 36  SLO $3626
  $A903: 0F 30 21  SLO $2130
  $A906: 0F 30 36  SLO $3630
  $A909: 0F 30 0F  SLO $0f30
  $A90C: 21 30     AND ($30,X)
  $A90E: 31 21     AND ($21),Y
  $A910: 30 36     BMI $a948
  $A912: 0F 0F 0F  SLO $0f0f
  $A915: 0F 0F 0F  SLO $0f0f
  $A918: 0F 30 26  SLO $2630
  $A91B: 0F 07 36  SLO $3607
  $A91E: 0F 30 36  SLO $3630
  $A921: 0F 30 0F  SLO $0f30
  $A924: 26 1A     ROL $1a
  $A926: 18        CLC
  $A927: 26 30     ROL $30
  $A929: 21 0F     AND ($0f,X)
  $A92B: 0F 0F 0F  SLO $0f0f
  $A92E: 0F 0F 0F  SLO $0f0f
  $A931: 0F 0F 0F  SLO $0f0f
  $A934: 0F 0F 0F  SLO $0f0f
  $A937: 30 0F     BMI $a948
  $A939: 0F 30 0F  SLO $0f30
  $A93C: 21 30     AND ($30,X)
  $A93E: 0F 0F 0F  SLO $0f0f
  $A941: 0F 0F 0F  SLO $0f0f
  $A944: 0F 0F 30  SLO $300f
  $A947: 0F 36 25  SLO $2536
  $A94A: 30 0F     BMI $a95b
  $A94C: 0F 0F 0F  SLO $0f0f
  $A94F: 0F 0F 00  SLO $000f
  $A952: 05 0A     ORA $0a
  $A954: 0F 14 19  SLO $1914
  $A957: 1E 26 4F  ASL $4f26,X
  $A95A: 54 63     NOP $63,X
  $A95C: 68        PLA
  $A95D: 23 01     RLA ($01,X)
  $A95F: 06 0B     ASL $0b
  $A961: 10 15     BPL $a978
  $A963: 1A        NOP
  $A964: 1F 27 50  SLO $5027,X
  $A967: 55 64     EOR $64,X
  $A969: 69 24     ADC #$24
  $A96B: 02        ???
  $A96C: 07 0C     SLO $0c
  $A96E: 11 16     ORA ($16),Y
  $A970: 1B 20 28  SLO $2820,Y
  $A973: 51 56     EOR ($56),Y
  $A975: 65 6A     ADC $6a
  $A977: 25 03     AND $03
  $A979: 08        PHP
  $A97A: 0D 12 17  ORA $1712
  $A97D: 1C 21 29  NOP $2921,X
  $A980: 52        ???
  $A981: 57 66     SRE $66,X
  $A983: 6B 2B     ARR #$2b
  $A985: 04 09     NOP $09
  $A987: 0E 13 18  ASL $1813
  $A98A: 1D 22 2A  ORA $2a22,X
  $A98D: 53 58     SRE ($58),Y
  $A98F: 67 6C     RRA $6c
  $A991: 00        BRK
  $A992: AA        TAX
  $A993: E9 57     SBC #$57
  $A995: EB BF     SBC #$bf
  $A997: EB 23     SBC #$23
  $A999: EC 80 EC  CPX $ec80
  $A99C: E0 EC     CPX #$ec
  $A99E: 32        ???
  $A99F: ED 7C ED  SBC $ed7c
  $A9A2: D6 ED     DEC $ed,X
  $A9A4: A3 EE     LAX ($ee,X)
  $A9A6: 31 EF     AND ($ef),Y
  $A9A8: 96 EF     STX $ef,Y
  $A9AA: 40        RTI
  $A9AB: 20 20 1C  JSR $1c20
  $A9AE: 30 00     BMI $a9b0
  $A9B0: 20 60 00  JSR $0060
  $A9B3: 09 60     ORA #$60
  $A9B5: 5F 84 81  SRE $8184,X
  $A9B8: 78        SEI
  $A9B9: 99 9A 52  STA $529a,Y
  $A9BC: 83 A8     SAX ($a8,X)
  $A9BE: 6E 8B 5C  ROR $5c8b
  $A9C1: 5F 00 0A  SRE $0a00,X
  $A9C4: 60        RTS
  $A9C5: 00        BRK
  $A9C6: 20 60 60  JSR $6060
  $A9C9: 60        RTS
  $A9CA: 00        BRK
  $A9CB: 1D E4 60  ORA $60e4,X
  $A9CE: 60        RTS
  $A9CF: 60        RTS
  $A9D0: E6 00     INC $00
  $A9D2: 1B 60 E7  SLO $e760,Y
  $A9D5: 60        RTS
  $A9D6: 60        RTS
  $A9D7: 60        RTS
  $A9D8: E6 00     INC $00
  $A9DA: 1B 60 E7  SLO $e760,Y
  $A9DD: 60        RTS
  $A9DE: 60        RTS
  $A9DF: 60        RTS
  $A9E0: E6 00     INC $00
  $A9E2: 1B 60 E7  SLO $e760,Y
  $A9E5: 60        RTS
  $A9E6: 60        RTS
  $A9E7: 60        RTS
  $A9E8: E6 00     INC $00
  $A9EA: 1B 60 E7  SLO $e760,Y
  $A9ED: 60        RTS
  $A9EE: 60        RTS
  $A9EF: 60        RTS
  $A9F0: E6 00     INC $00
  $A9F2: 1B 60 E7  SLO $e760,Y
  $A9F5: 60        RTS
  $A9F6: 60        RTS
  $A9F7: 60        RTS
  $A9F8: E6 00     INC $00
  $A9FA: 1B 60 E7  SLO $e760,Y
  $A9FD: 60        RTS
  $A9FE: 60        RTS
  $A9FF: 60        RTS
  $AA00: E6 00     INC $00
  $AA02: 1B 60 E7  SLO $e760,Y
  $AA05: 60        RTS
  $AA06: 60        RTS
  $AA07: 60        RTS
  $AA08: EC 00 1B  CPX $1b00
  $AA0B: E4 ED     CPX $ed
  $AA0D: 60        RTS
  $AA0E: 60        RTS
  $AA0F: 60        RTS
  $AA10: E6 00     INC $00
  $AA12: 11 60     ORA ($60),Y
  $AA14: 58        CLI
  $AA15: 60        RTS
  $AA16: 58        CLI
  $AA17: 60        RTS
  $AA18: 58        CLI
  $AA19: 60        RTS
  $AA1A: 59 00 03  EOR $0300,Y
  $AA1D: 60        RTS
  $AA1E: E7 60     ISB $60
  $AA20: 60        RTS
  $AA21: 60        RTS
  $AA22: E6 60     INC $60
  $AA24: 26 60     ROL $60
  $AA26: 2B 60     ANC #$60
  $AA28: 30 60     BMI $aa8a
  $AA2A: 35 60     AND $60,X
  $AA2C: 3A        NOP
  $AA2D: 60        RTS
  $AA2E: 3F 60 44  RLA $4460,X
  $AA31: 60        RTS
  $AA32: 4C 60 2B  JMP $2b60
  $AA35: 60        RTS
  $AA36: 30 60     BMI $aa98
  $AA38: 3F 60 3F  RLA $3f60,X
  $AA3B: 60        RTS
  $AA3C: 49 60     EOR #$60
  $AA3E: E7 60     ISB $60
  $AA40: 60        RTS
  $AA41: 60        RTS
  $AA42: E6 00     INC $00
  $AA44: 11 60     ORA ($60),Y
  $AA46: 58        CLI
  $AA47: 60        RTS
  $AA48: 58        CLI
  $AA49: 60        RTS
  $AA4A: 58        CLI
  $AA4B: 60        RTS
  $AA4C: 59 00 03  EOR $0300,Y
  $AA4F: 60        RTS
  $AA50: E7 60     ISB $60
  $AA52: 60        RTS
  $AA53: 60        RTS
  $AA54: E6 60     INC $60
  $AA56: 27 60     RLA $60
  $AA58: 2C 60 31  BIT $3160
  $AA5B: 60        RTS
  $AA5C: 36 60     ROL $60,X
  $AA5E: 3B 60 40  RLA $4060,Y
  $AA61: 60        RTS
  $AA62: 45 60     EOR $60
  $AA64: 4D 60 2C  EOR $2c60
  $AA67: 60        RTS
  $AA68: 31 60     AND ($60),Y
  $AA6A: 40        RTI
  $AA6B: 60        RTS
  $AA6C: 40        RTI
  $AA6D: 60        RTS
  $AA6E: 4A        LSR A
  $AA6F: 60        RTS
  $AA70: E7 60     ISB $60
  $AA72: 60        RTS
  $AA73: 60        RTS
  $AA74: E6 00     INC $00
  $AA76: 11 60     ORA ($60),Y
  $AA78: 58        CLI
  $AA79: 60        RTS
  $AA7A: 58        CLI
  $AA7B: 60        RTS
  $AA7C: 58        CLI
  $AA7D: 60        RTS
  $AA7E: 59 00 03  EOR $0300,Y
  $AA81: 60        RTS
  $AA82: E7 60     ISB $60
  $AA84: 60        RTS
  $AA85: 60        RTS
  $AA86: E6 60     INC $60
  $AA88: 28        PLP
  $AA89: 60        RTS
  $AA8A: 2D 60 32  AND $3260
  $AA8D: 60        RTS
  $AA8E: 37 60     RLA $60,X
  $AA90: 3C 60 41  NOP $4160,X
  $AA93: 60        RTS
  $AA94: 46 60     LSR $60
  $AA96: 4E 60 2D  LSR $2d60
  $AA99: 60        RTS
  $AA9A: 32        ???
  $AA9B: 60        RTS
  $AA9C: 41 60     EOR ($60,X)
  $AA9E: 41 60     EOR ($60,X)
  $AAA0: 4B 60     ALR #$60
  $AAA2: E7 60     ISB $60
  $AAA4: 60        RTS
  $AAA5: 60        RTS
  $AAA6: E6 00     INC $00
  $AAA8: 11 60     ORA ($60),Y
  $AAAA: 58        CLI
  $AAAB: 60        RTS
  $AAAC: 58        CLI
  $AAAD: 60        RTS
  $AAAE: 58        CLI
  $AAAF: 60        RTS
  $AAB0: 59 00 03  EOR $0300,Y
  $AAB3: 60        RTS
  $AAB4: E7 60     ISB $60
  $AAB6: 60        RTS
  $AAB7: 60        RTS
  $AAB8: E6 60     INC $60
  $AABA: 29 60     AND #$60
  $AABC: 2E 60 33  ROL $3360
  $AABF: 60        RTS
  $AAC0: 38        SEC
  $AAC1: 60        RTS
  $AAC2: 3D 60 42  AND $4260,X
  $AAC5: 60        RTS
  $AAC6: 47 60     SRE $60
  $AAC8: 4F 60 2E  SRE $2e60
  $AACB: 60        RTS
  $AACC: 33 60     RLA ($60),Y
  $AACE: 42        ???
  $AACF: 60        RTS
  $AAD0: 42        ???
  $AAD1: 60        RTS
  $AAD2: 51 60     EOR ($60),Y
  $AAD4: E7 60     ISB $60
  $AAD6: 60        RTS
  $AAD7: 60        RTS
  $AAD8: E6 00     INC $00
  $AADA: 11 60     ORA ($60),Y
  $AADC: 58        CLI
  $AADD: 60        RTS
  $AADE: 58        CLI
  $AADF: 60        RTS
  $AAE0: 58        CLI
  $AAE1: 60        RTS
  $AAE2: 59 00 03  EOR $0300,Y
  $AAE5: 60        RTS
  $AAE6: E7 60     ISB $60
  $AAE8: 60        RTS
  $AAE9: 60        RTS
  $AAEA: E6 60     INC $60
  $AAEC: 2A        ROL A
  $AAED: 60        RTS
  $AAEE: 2F 60 34  RLA $3460
  $AAF1: 60        RTS
  $AAF2: 39 60 3E  AND $3e60,Y
  $AAF5: 60        RTS
  $AAF6: 43 60     SRE ($60,X)
  $AAF8: 48        PHA
  $AAF9: 60        RTS
  $AAFA: 50 60     BVC $ab5c
  $AAFC: 2F 60 34  RLA $3460
  $AAFF: 60        RTS
  $AB00: 43 60     SRE ($60,X)
  $AB02: 43 60     SRE ($60,X)
  $AB04: C3 60     DCP ($60,X)
  $AB06: E7 60     ISB $60
  $AB08: 60        RTS
  $AB09: 60        RTS
  $AB0A: E6 00     INC $00
  $AB0C: 1B 60 E7  SLO $e760,Y
  $AB0F: 60        RTS
  $AB10: 60        RTS
  $AB11: 60        RTS
  $AB12: EC 00 1B  CPX $1b00
  $AB15: E4 ED     CPX $ed
  $AB17: 60        RTS
  $AB18: 00        BRK
  $AB19: 20 60 00  JSR $0060
  $AB1C: 20 60 00  JSR $0060
  $AB1F: 20 60 00  JSR $0060
  $AB22: 20 60 00  JSR $0060
  $AB25: 00        BRK
  $AB26: 55 55     EOR $55,X
  $AB28: 55 55     EOR $55,X
  $AB2A: 00        BRK
  $AB2B: 00        BRK
  $AB2C: 00        BRK
  $AB2D: 40        RTI
  $AB2E: 50 50     BVC $ab80
  $AB30: 50 50     BVC $ab82
  $AB32: 10 00     BPL $ab34
  $AB34: 00        BRK
  $AB35: 44 55     NOP $55
  $AB37: 55 55     EOR $55,X
  $AB39: 55 11     EOR $11,X
  $AB3B: 00        BRK
  $AB3C: 00        BRK
  $AB3D: 50 50     BVC $ab8f
  $AB3F: 50 50     BVC $ab91
  $AB41: 50 50     BVC $ab93
  $AB43: 10 00     BPL $ab45
  $AB45: 55 55     EOR $55,X
  $AB47: 55 55     EOR $55,X
  $AB49: 55 55     EOR $55,X
  $AB4B: 11 00     ORA ($00),Y
  $AB4D: 55 55     EOR $55,X
  $AB4F: 55 55     EOR $55,X
  $AB51: 55 55     EOR $55,X
  $AB53: 11 60     ORA ($60),Y
  $AB55: 00        BRK
  $AB56: 00        BRK
  $AB57: 8A        TXA
  $AB58: 20 0C 06  JSR $060c
  $AB5B: 18        CLC
  $AB5C: 01 40     ORA ($40,X)
  $AB5E: 41 44     EOR ($44,X)
  $AB60: 00        BRK
  $AB61: 03 01     SLO ($01,X)
  $AB63: 45 50     EOR $50
  $AB65: 51 01     EOR ($01),Y
  $AB67: 01 55     ORA ($55,X)
  $AB69: 42        ???
  $AB6A: 43 46     SRE ($46,X)
  $AB6C: 00        BRK
  $AB6D: 03 47     SLO ($47,X)
  $AB6F: 52        ???
  $AB70: 01 01     ORA ($01,X)
  $AB72: 54 01     NOP $01,X
  $AB74: 48        PHA
  $AB75: 49 4C     EOR #$4c
  $AB77: 4D 58 58  EOR $5858
  $AB7A: 4D 59 54  EOR $5459
  $AB7D: 53 56     SRE ($56),Y
  $AB7F: 57 4A     SRE $4a,X
  $AB81: 4B 4E     ALR #$4e
  $AB83: 4F 5A 5B  SRE $5b5a
  $AB86: 5E 5F 74  LSR $745f,X
  $AB89: 75 5C     ADC $5c,X
  $AB8B: 5D 60 61  EOR $6160,X
  $AB8E: 64 65     NOP $65
  $AB90: 70 71     BVS $ac03
  $AB92: 73 76     RRA ($76),Y
  $AB94: 77 28     RRA $28,X
  $AB96: 29 5D     AND #$5d
  $AB98: 37 62     RLA $62,X
  $AB9A: 63 66     RRA ($66,X)
  $AB9C: 67 72     RRA $72
  $AB9E: 2C 2D 2A  BIT $2a2d
  $ABA1: 2B 2E     ANC #$2e
  $ABA3: 2F 00 00  RLA $0000
  $ABA6: 00        BRK
  $ABA7: 00        BRK
  $ABA8: 00        BRK
  $ABA9: 00        BRK
  $ABAA: 00        BRK
  $ABAB: 00        BRK
  $ABAC: 00        BRK
  $ABAD: 00        BRK
  $ABAE: 44 55     NOP $55
  $ABB0: 55 11     EOR $11,X
  $ABB2: 00        BRK
  $ABB3: 00        BRK
  $ABB4: 00        BRK
  $ABB5: 00        BRK
  $ABB6: 08        PHP
  $ABB7: 0E 0A 02  ASL $020a
  $ABBA: 00        BRK
  $ABBB: 00        BRK
  $ABBC: FF 1C 01  ISB $011c,X
  $ABBF: 8A        TXA
  $ABC0: 20 0C 06  JSR $060c
  $ABC3: 18        CLC
  $ABC4: FF 83 86  ISB $8683,X
  $ABC7: 86 87     STX $87
  $ABC9: FF 68 83  ISB $8368,X
  $ABCC: 90 00     BCC $abce
  $ABCE: 03 FF     SLO ($ff,X)
  $ABD0: 00        BRK
  $ABD1: 04 38     NOP $38
  $ABD3: 39 3C 3D  AND $3d3c,Y
  $ABD6: 3C 69 00  NOP $0069,X
  $ABD9: 03 38     SLO ($38,X)
  $ABDB: 00        BRK
  $ABDC: 04 3A     NOP $3a
  $ABDE: 3B 3E 3F  RLA $3f3e,Y
  $ABE1: 6A        ROR A
  $ABE2: 6B 00     ARR #$00
  $ABE4: 03 3A     SLO ($3a,X)
  $ABE6: 00        BRK
  $ABE7: 04 3A     NOP $3a
  $ABE9: 91 94     STA ($94),Y
  $ABEB: 95 C0     STA $c0,X
  $ABED: C1 00     CMP ($00,X)
  $ABEF: 03 3A     SLO ($3a,X)
  $ABF1: 92        ???
  $ABF2: 93 96     ??? ($96),Y
  $ABF4: 97 C2     SAX $c2,Y
  $ABF6: C3 93     DCP ($93,X)
  $ABF8: 7D 92 93  ADC $9392,X
  $ABFB: 92        ???
  $ABFC: 93 3A     ??? ($3a),Y
  $ABFE: 3A        NOP
  $ABFF: 6C 6D 78  JMP ($786d)
  $AC02: 6D 79 7C  ADC $7c79
  $AC05: 00        BRK
  $AC06: 04 3A     NOP $3a
  $AC08: 00        BRK
  $AC09: 00        BRK
  $AC0A: 00        BRK
  $AC0B: 00        BRK
  $AC0C: 00        BRK
  $AC0D: 00        BRK
  $AC0E: 00        BRK
  $AC0F: 00        BRK
  $AC10: 00        BRK
  $AC11: 00        BRK
  $AC12: CC FF FF  CPY $ffff
  $AC15: 33 00     RLA ($00),Y
  $AC17: 00        BRK
  $AC18: 00        BRK
  $AC19: 00        BRK
  $AC1A: 0C 0F 0F  NOP $0f0f
  $AC1D: 03 00     SLO ($00,X)
  $AC1F: 00        BRK
  $AC20: FF 1D 02  ISB $021d,X
  $AC23: 8A        TXA
  $AC24: 20 0C 06  JSR $060c
  $AC27: 18        CLC
  $AC28: 01 01     ORA ($01,X)
  $AC2A: 38        SEC
  $AC2B: 39 3C 00  AND $003c,Y
  $AC2E: 07 01     SLO $01
  $AC30: 01 01     ORA ($01,X)
  $AC32: 3A        NOP
  $AC33: 3B 3E 00  RLA $003e,Y
  $AC36: 07 01     SLO $01
  $AC38: 3D 68 3D  AND $3d68,X
  $AC3B: 68        PLA
  $AC3C: 3D 68 3D  AND $3d68,X
  $AC3F: 68        PLA
  $AC40: 3D 68 3D  AND $3d68,X
  $AC43: 68        PLA
  $AC44: 3F 6A 3F  RLA $3f6a,X
  $AC47: 6A        ROR A
  $AC48: 3F 6A 3F  RLA $3f6a,X
  $AC4B: 6A        ROR A
  $AC4C: 3F 6A 3F  RLA $3f6a,X
  $AC4F: 6A        ROR A
  $AC50: 69 69     ADC #$69
  $AC52: 01 6C     ORA ($6c,X)
  $AC54: 6D 01 6C  ADC $6c01
  $AC57: 6D 6C 6D  ADC $6d6c
  $AC5A: 69 69     ADC #$69
  $AC5C: 6B 6B     ARR #$6b
  $AC5E: 6E 6F 00  ROR $006f
  $AC61: 06 78     ASL $78
  $AC63: 6B 6B     ARR #$6b
  $AC65: 00        BRK
  $AC66: 00        BRK
  $AC67: 00        BRK
  $AC68: 00        BRK
  $AC69: 00        BRK
  $AC6A: 00        BRK
  $AC6B: 00        BRK
  $AC6C: 00        BRK
  $AC6D: 00        BRK
  $AC6E: 00        BRK
  $AC6F: 88        DEY
  $AC70: AF AA 22  LAX $22aa
  $AC73: 00        BRK
  $AC74: 00        BRK
  $AC75: 00        BRK
  $AC76: 00        BRK
  $AC77: 04 05     NOP $05
  $AC79: 05 01     ORA $01
  $AC7B: 00        BRK
  $AC7C: 00        BRK
  $AC7D: FF 1C 03  ISB $031c,X
  $AC80: 8A        TXA
  $AC81: 20 0C 06  JSR $060c
  $AC84: 18        CLC
  $AC85: 00        BRK
  $AC86: 0A        ASL A
  $AC87: 01 04     ORA ($04,X)
  $AC89: 05 02     ORA $02
  $AC8B: 03 06     SLO ($06,X)
  $AC8D: 03 07     SLO ($07,X)
  $AC8F: 12        ???
  $AC90: 13 16     SLO ($16),Y
  $AC92: 17 00     SLO $00,X
  $AC94: 03 10     SLO ($10,X)
  $AC96: 08        PHP
  $AC97: 09 0C     ORA #$0c
  $AC99: 0D 18 19  ORA $1918
  $AC9C: 1C 1D 11  NOP $111d,X
  $AC9F: 10 14     BPL $acb5
  $ACA1: 15 0A     ORA $0a,X
  $ACA3: 0B 0E     ANC #$0e
  $ACA5: 0F 1A 1B  SLO $1b1a
  $ACA8: 1E 1F 22  ASL $221f,X
  $ACAB: 00        BRK
  $ACAC: 03 23     SLO ($23,X)
  $ACAE: 20 21 20  JSR $2021
  $ACB1: 21 20     AND ($20,X)
  $ACB3: 21 20     AND ($20,X)
  $ACB5: 24 26     BIT $26
  $ACB7: 00        BRK
  $ACB8: 03 27     SLO ($27,X)
  $ACBA: 00        BRK
  $ACBB: 04 25     NOP $25
  $ACBD: 30 31     BMI $acf0
  $ACBF: 34 35     NOP $35,X
  $ACC1: 35 32     AND $32,X
  $ACC3: 33 36     RLA ($36),Y
  $ACC5: 00        BRK
  $ACC6: 00        BRK
  $ACC7: 00        BRK
  $ACC8: 00        BRK
  $ACC9: 00        BRK
  $ACCA: 00        BRK
  $ACCB: 00        BRK
  $ACCC: 00        BRK
  $ACCD: 00        BRK
  $ACCE: 00        BRK
  $ACCF: 44 55     NOP $55
  $ACD1: 55 11     EOR $11,X
  $ACD3: 00        BRK
  $ACD4: 00        BRK
  $ACD5: 00        BRK
  $ACD6: 00        BRK
  $ACD7: 0C 0F 0B  NOP $0b0f
  $ACDA: 02        ???
  $ACDB: 00        BRK
  $ACDC: 00        BRK
  $ACDD: FF 1C 04  ISB $041c,X
  $ACE0: 8A        TXA
  $ACE1: 20 0C 06  JSR $060c
  $ACE4: 18        CLC
  $ACE5: 20 21 24  JSR $2421
  $ACE8: 25 00     AND $00
  $ACEA: 05 FF     ORA $ff
  $ACEC: 22        ???
  $ACED: 23 26     RLA ($26,X)
  $ACEF: 00        BRK
  $ACF0: 04 1B     NOP $1b
  $ACF2: 1A        NOP
  $ACF3: 1A        NOP
  $ACF4: 00        BRK
  $ACF5: 06 FF     ASL $ff
  $ACF7: 09 0C     ORA #$0c
  $ACF9: 04 05     NOP $05
  $ACFB: 04 08     NOP $08
  $ACFD: 18        CLC
  $ACFE: 19 00 04  ORA $0400,Y
  $AD01: 0D 0B 0E  ORA $0e0b
  $AD04: 06 07     ASL $07
  $AD06: 0A        ASL A
  $AD07: 06 0B     ASL $0b
  $AD09: 0E 06 3A  ASL $3a06
  $AD0C: 3B 3B 00  RLA $003b,Y
  $AD0F: 09 FF     ORA #$ff
  $AD11: 3F 6A 6A  RLA $6a6a,X
  $AD14: 00        BRK
  $AD15: 0C FF 00  NOP $00ff
  $AD18: 00        BRK
  $AD19: 00        BRK
  $AD1A: 00        BRK
  $AD1B: 00        BRK
  $AD1C: 00        BRK
  $AD1D: 00        BRK
  $AD1E: 00        BRK
  $AD1F: 00        BRK
  $AD20: 00        BRK
  $AD21: 4C 57 5D  JMP $5d57
  $AD24: 13 00     SLO ($00),Y
  $AD26: 00        BRK
  $AD27: 00        BRK
  $AD28: 00        BRK
  $AD29: 08        PHP
  $AD2A: 0A        ASL A
  $AD2B: 0A        ASL A
  $AD2C: 02        ???
  $AD2D: 00        BRK
  $AD2E: 00        BRK
  $AD2F: FF 0C 05  ISB $050c,X
  $AD32: 8A        TXA
  $AD33: 20 0C 06  JSR $060c
  $AD36: 18        CLC
  $AD37: 7F FF FF  RRA $ffff,X
  $AD3A: 7B 7E 00  RRA $007e,Y
  $AD3D: 04 FF     NOP $ff
  $AD3F: 83 86     SAX ($86,X)
  $AD41: 87 6E     SAX $6e
  $AD43: 6F 7A D1  RRA $d17a
  $AD46: D4 D5     NOP $d5,X
  $AD48: 83 90     SAX ($90,X)
  $AD4A: 00        BRK
  $AD4B: 04 FF     NOP $ff
  $AD4D: C4 C5     CPY $c5
  $AD4F: 00        BRK
  $AD50: 0A        ASL A
  $AD51: D0 C6     BNE $ad19
  $AD53: C7 00     DCP $00
  $AD55: 0A        ASL A
  $AD56: D2        ???
  $AD57: D3 D6     DCP ($d6),Y
  $AD59: 00        BRK
  $AD5A: 0A        ASL A
  $AD5B: D7 D9     DCP $d9,X
  $AD5D: DC 00 0A  NOP $0a00,X
  $AD60: DD 00 00  CMP $0000,X
  $AD63: 00        BRK
  $AD64: 00        BRK
  $AD65: 00        BRK
  $AD66: 00        BRK
  $AD67: 00        BRK
  $AD68: 00        BRK
  $AD69: 00        BRK
  $AD6A: 00        BRK
  $AD6B: 84 A5     STY $a5
  $AD6D: AF 23 00  LAX $0023
  $AD70: 00        BRK
  $AD71: 00        BRK
  $AD72: 00        BRK
  $AD73: 08        PHP
  $AD74: 0A        ASL A
  $AD75: 0A        ASL A
  $AD76: 02        ???
  $AD77: 00        BRK
  $AD78: 00        BRK
  $AD79: FF 1D 06  ISB $061d,X
  $AD7C: 8A        TXA
  $AD7D: 20 0C 06  JSR $060c
  $AD80: 18        CLC
  $AD81: 00        BRK
  $AD82: 08        PHP
  $AD83: FF 28 00  ISB $0028,X
  $AD86: 03 FF     SLO ($ff,X)
  $AD88: 00        BRK
  $AD89: 08        PHP
  $AD8A: FF 2A 00  ISB $002a,X
  $AD8D: 03 FF     SLO ($ff,X)
  $AD8F: 01 05     ORA ($05,X)
  $AD91: 01 05     ORA ($05,X)
  $AD93: 05 01     ORA $01
  $AD95: 04 FF     NOP $ff
  $AD97: 80 00     NOP #$00
  $AD99: 03 FF     SLO ($ff,X)
  $AD9B: 02        ???
  $AD9C: 03 02     SLO ($02,X)
  $AD9E: 02        ???
  $AD9F: 03 02     SLO ($02,X)
  $ADA1: 06 01     ASL $01
  $ADA3: 82 05     NOP #$05
  $ADA5: 01 06     ORA ($06,X)
  $ADA7: 00        BRK
  $ADA8: 07 02     SLO $02
  $ADAA: 29 2C     AND #$2c
  $ADAC: 2D 03 02  AND $0203
  $ADAF: 81 84     STA ($84,X)
  $ADB1: 81 85     STA ($85,X)
  $ADB3: 81 84     STA ($84,X)
  $ADB5: 81 2B     STA ($2b,X)
  $ADB7: 2E 2F 85  ROL $852f
  $ADBA: 81 00     STA ($00,X)
  $ADBC: 00        BRK
  $ADBD: 00        BRK
  $ADBE: 00        BRK
  $ADBF: 00        BRK
  $ADC0: 00        BRK
  $ADC1: 00        BRK
  $ADC2: 00        BRK
  $ADC3: 00        BRK
  $ADC4: 00        BRK
  $ADC5: 44 55     NOP $55
  $ADC7: 55 11     EOR $11,X
  $ADC9: 00        BRK
  $ADCA: 00        BRK
  $ADCB: 00        BRK
  $ADCC: 00        BRK
  $ADCD: 08        PHP
  $ADCE: 0A        ASL A
  $ADCF: 0A        ASL A
  $ADD0: 02        ???
  $ADD1: 00        BRK
  $ADD2: 00        BRK
  $ADD3: FF 1D 07  ISB $071d,X
  $ADD6: 64 20     NOP $20
  $ADD8: 18        CLC
  $ADD9: 09 18     ORA #$18
  $ADDB: 01 04     ORA ($04,X)
  $ADDD: 00        BRK
  $ADDE: 0A        ASL A
  $ADDF: FF 11 14  ISB $1411,X
  $ADE2: 15 40     ORA $40,X
  $ADE4: FF 44 45  ISB $4544,X
  $ADE7: 50 51     BVC $ae3a
  $ADE9: 00        BRK
  $ADEA: 03 FF     SLO ($ff,X)
  $ADEC: 02        ???
  $ADED: 06 00     ASL $00
  $ADEF: 09 FF     ORA #$ff
  $ADF1: 41 13     EOR ($13,X)
  $ADF3: 16 17     ASL $17,X
  $ADF5: 42        ???
  $ADF6: 43 46     SRE ($46,X)
  $ADF8: 47 52     SRE $52
  $ADFA: 53 00     SRE ($00),Y
  $ADFC: 03 FF     SLO ($ff,X)
  $ADFE: 03 02     SLO ($02,X)
  $AE00: 05 01     ORA $01
  $AE02: 05 01     ORA $01
  $AE04: 04 00     NOP $00
  $AE06: 04 FF     NOP $ff
  $AE08: 08        PHP
  $AE09: 00        BRK
  $AE0A: 07 09     SLO $09
  $AE0C: 0C 0D 18  NOP $180d
  $AE0F: FF FF 00  ISB $00ff,X
  $AE12: 04 02     NOP $02
  $AE14: 03 02     SLO ($02,X)
  $AE16: 06 00     ASL $00
  $AE18: 04 FF     NOP $ff
  $AE1A: 19 1C 1D  ORA $1d1c,Y
  $AE1D: 00        BRK
  $AE1E: 04 48     NOP $48
  $AE20: 49 4C     EOR #$4c
  $AE22: 4D 58 01  EOR $0158
  $AE25: 04 00     NOP $00
  $AE27: 07 02     SLO $02
  $AE29: 05 05     ORA $05
  $AE2B: 01 54     ORA ($54,X)
  $AE2D: 55 0A     EOR $0a,X
  $AE2F: 00        BRK
  $AE30: 05 0B     ORA $0b
  $AE32: 0E 0F 1A  ASL $1a0f
  $AE35: 1B 1E 06  SLO $061e,Y
  $AE38: 00        BRK
  $AE39: 09 02     ORA #$02
  $AE3B: 03 56     SLO ($56,X)
  $AE3D: 57 1F     SRE $1f,X
  $AE3F: 4A        LSR A
  $AE40: 4B 4E     ALR #$4e
  $AE42: 4F 5A 5B  SRE $5b5a
  $AE45: 5E 5F 64  LSR $645f,X
  $AE48: 65 02     ADC $02
  $AE4A: 00        BRK
  $AE4B: 09 02     ORA #$02
  $AE4D: 59 5C 5D  EOR $5d5c,Y
  $AE50: 35 60     AND $60,X
  $AE52: 61 00     ADC ($00,X)
  $AE54: 03 02     SLO ($02,X)
  $AE56: 71 74     ADC ($74),Y
  $AE58: 75 66     ADC $66,X
  $AE5A: 67 72     RRA $72
  $AE5C: 07 12     SLO $12
  $AE5E: 73 76     RRA ($76),Y
  $AE60: 02        ???
  $AE61: 02        ???
  $AE62: 07 12     SLO $12
  $AE64: 07 21     SLO $21
  $AE66: 24 25     BIT $25
  $AE68: 30 31     BMI $ae9b
  $AE6A: 07 12     SLO $12
  $AE6C: 10 07     BPL $ae75
  $AE6E: FF 70 77  ISB $7770,X
  $AE71: 37 62     RLA $62,X
  $AE73: 63 FF     RRA ($ff,X)
  $AE75: FF FC FC  ISB $fcfc,X
  $AE78: 00        BRK
  $AE79: 03 02     SLO ($02,X)
  $AE7B: FC 22 23  NOP $2322,X
  $AE7E: 26 27     ROL $27
  $AE80: 32        ???
  $AE81: 00        BRK
  $AE82: 07 FF     SLO $ff
  $AE84: 20 33 36  JSR $3633
  $AE87: 34 00     NOP $00,X
  $AE89: 50 50     BVC $aedb
  $AE8B: 50 50     BVC $aedd
  $AE8D: 50 50     BVC $aedf
  $AE8F: 00        BRK
  $AE90: 00        BRK
  $AE91: 55 55     EOR $55,X
  $AE93: 5D FF FF  EOR $ffff,X
  $AE96: 77 00     RRA $00,X
  $AE98: 00        BRK
  $AE99: 2A        ROL A
  $AE9A: 2A        ROL A
  $AE9B: AA        TAX
  $AE9C: AA        TAX
  $AE9D: AA        TAX
  $AE9E: AA        TAX
  $AE9F: 00        BRK
  $AEA0: FF 1D 07  ISB $071d,X
  $AEA3: 84 20     STY $20
  $AEA5: 18        CLC
  $AEA6: 08        PHP
  $AEA7: 18        CLC
  $AEA8: 00        BRK
  $AEA9: 18        CLC
  $AEAA: FF 00 04  ISB $0400,X
  $AEAD: FF 88 89  ISB $8988,X
  $AEB0: 8C 8D 98  STY $988d
  $AEB3: 00        BRK
  $AEB4: 0F FF 00  SLO $00ff
  $AEB7: 03 FF     SLO ($ff,X)
  $AEB9: 8A        TXA
  $AEBA: 00        BRK
  $AEBB: 04 FE     NOP $fe
  $AEBD: 8B 8E     XAA #$8e
  $AEBF: 00        BRK
  $AEC0: 0E FF FF  ASL $ffff
  $AEC3: FF A0 FE  ISB $fea0,X
  $AEC6: FE A3 A6  INC $a6a3,X
  $AEC9: A7 A1     LAX $a1
  $AECB: A4 00     LDY $00
  $AECD: 0E FF 05  ASL $05ff
  $AED0: 01 A2     ORA ($a2,X)
  $AED2: FE A8 A9  INC $a9a8,X
  $AED5: AC AD B8  LDY $b8ad
  $AED8: 00        BRK
  $AED9: 0E FF 99  ASL $99ff
  $AEDC: 02        ???
  $AEDD: 03 02     SLO ($02,X)
  $AEDF: B2        ???
  $AEE0: AA        TAX
  $AEE1: AB AE     ATX #$ae
  $AEE3: AF BA 00  LAX $00ba
  $AEE6: 07 FF     SLO $ff
  $AEE8: CC 00 04  CPY $0400
  $AEEB: FF 99 01  ISB $0199,X
  $AEEE: B1 00     LDA ($00),Y
  $AEF0: 04 02     NOP $02
  $AEF2: 9C 9D C8  SHY $c89d,X
  $AEF5: C9 05     CMP #$05
  $AEF7: 01 01     ORA ($01,X)
  $AEF9: 05 01     ORA $01
  $AEFB: 06 01     ASL $01
  $AEFD: 05 CE     ORA $ce
  $AEFF: FF FF 06  ISB $06ff,X
  $AF02: 01 B1     ORA ($b1,X)
  $AF04: 03 02     SLO ($02,X)
  $AF06: 02        ???
  $AF07: 8F 9A 9B  SAX $9b9a
  $AF0A: 9E 9F CA  SHX $ca9f,Y
  $AF0D: CB A5     AXS #$a5
  $AF0F: B0 02     BCS $af13
  $AF11: 02        ???
  $AF12: 03 00     SLO ($00,X)
  $AF14: 0B 02     ANC #$02
  $AF16: 00        BRK
  $AF17: 00        BRK
  $AF18: 00        BRK
  $AF19: 00        BRK
  $AF1A: 00        BRK
  $AF1B: 00        BRK
  $AF1C: 00        BRK
  $AF1D: 00        BRK
  $AF1E: 00        BRK
  $AF1F: 55 A5     EOR $a5,X
  $AF21: 65 55     ADC $55
  $AF23: 55 55     EOR $55,X
  $AF25: 00        BRK
  $AF26: 00        BRK
  $AF27: 55 AA     EOR $aa,X
  $AF29: 56 55     LSR $55,X
  $AF2B: 66 55     ROR $55
  $AF2D: 00        BRK
  $AF2E: FF 1D 08  ISB $081d,X
  $AF31: 8A        TXA
  $AF32: 20 0C 06  JSR $060c
  $AF35: 18        CLC
  $AF36: 6F 04 6B  RRA $6b04
  $AF39: 6E 00 06  ROR $0600
  $AF3C: 04 6E     NOP $6e
  $AF3E: 6B 7A     ARR #$7a
  $AF40: 51 6D     EOR ($6d),Y
  $AF42: 78        SEI
  $AF43: 54 54     NOP $54,X
  $AF45: 55 53     EOR $53,X
  $AF47: 6D 78 56  ADC $5678
  $AF4A: 57 59     SRE $59,X
  $AF4C: 5C 5D 5B  NOP $5b5d,X
  $AF4F: 00        BRK
  $AF50: 03 5D     SLO ($5d,X)
  $AF52: 5E 5B 59  LSR $595b,X
  $AF55: 5B 75 5D  SRE $5d75,Y
  $AF58: 5C 5D 5B  NOP $5b5d,X
  $AF5B: 00        BRK
  $AF5C: 03 5F     SLO ($5f,X)
  $AF5E: 5E 5B 71  LSR $715b,X
  $AF61: 5B 73 76  SRE $7673,Y
  $AF64: 77 7C     RRA $7c,X
  $AF66: 7D 5C 5D  ADC $5d5c,X
  $AF69: 5C 74 5D  NOP $5d74,X
  $AF6C: 5D 76 77  EOR $7776,X
  $AF6F: 79 00 03  ADC $0300,Y
  $AF72: 7C 00 03  NOP $0300,X
  $AF75: 5F 74 71  SRE $7174,X
  $AF78: 71 79     ADC ($79),Y
  $AF7A: 7C 00 00  NOP $0000,X
  $AF7D: 00        BRK
  $AF7E: 00        BRK
  $AF7F: 00        BRK
  $AF80: 00        BRK
  $AF81: 00        BRK
  $AF82: 00        BRK
  $AF83: 00        BRK
  $AF84: 00        BRK
  $AF85: 88        DEY
  $AF86: AA        TAX
  $AF87: AA        TAX
  $AF88: 22        ???
  $AF89: 00        BRK
  $AF8A: 00        BRK
  $AF8B: 00        BRK
  $AF8C: 00        BRK
  $AF8D: 04 09     NOP $09
  $AF8F: 0A        ASL A
  $AF90: 01 00     ORA ($00,X)
  $AF92: 00        BRK
  $AF93: FF 14 09  ISB $0914,X
  $AF96: 8B 20     XAA #$20
  $AF98: 0A        ASL A
  $AF99: 0B 20     ANC #$20
  $AF9B: 00        BRK
  $AF9C: 0A        ASL A
  $AF9D: E4 E6     CPX $e6
  $AF9F: 00        BRK
  $AFA0: 08        PHP
  $AFA1: FF E7 E6  ISB $e6e7,X
  $AFA4: FF 43 28  ISB $2843,X
  $AFA7: 34 28     NOP $28,X
  $AFA9: 33 2C     RLA ($2c),Y
  $AFAB: FF E7 E6  ISB $e6e7,X
  $AFAE: 00        BRK
  $AFAF: 08        PHP
  $AFB0: E5 E7     SBC $e7
  $AFB2: E6 E6     INC $e6
  $AFB4: 00        BRK
  $AFB5: 06 60     ASL $60
  $AFB7: E7 E7     ISB $e7
  $AFB9: E6 E6     INC $e6
  $AFBB: D5 D4     CMP $d4,X
  $AFBD: CB 00     AXS #$00
  $AFBF: 03 60     SLO ($60,X)
  $AFC1: E7 E7     ISB $e7
  $AFC3: E6 E6     INC $e6
  $AFC5: 00        BRK
  $AFC6: 06 60     ASL $60
  $AFC8: E7 E7     ISB $e7
  $AFCA: E6 E6     INC $e6
  $AFCC: 00        BRK
  $AFCD: 06 60     ASL $60
  $AFCF: E7 E7     ISB $e7
  $AFD1: E6 E6     INC $e6
  $AFD3: 00        BRK
  $AFD4: 06 60     ASL $60
  $AFD6: E7 E7     ISB $e7
  $AFD8: E6 EC     INC $ec
  $AFDA: 02        ???
  $AFDB: 02        ???
  $AFDC: 00        BRK
  $AFDD: 03 60     SLO ($60,X)
  $AFDF: E5 ED     SBC $ed
  $AFE1: E7 EC     ISB $ec
  $AFE3: 00        BRK
  $AFE4: 08        PHP
  $AFE5: E5 ED     SBC $ed
  $AFE7: 00        BRK
  $AFE8: 00        BRK
  $AFE9: 00        BRK
  $AFEA: 00        BRK
  $AFEB: 00        BRK
  $AFEC: 00        BRK
  $AFED: 00        BRK
  $AFEE: 00        BRK
  $AFEF: 00        BRK
  $AFF0: 00        BRK
  $AFF1: 44 55     NOP $55
  $AFF3: 55 11     EOR $11,X
  $AFF5: 00        BRK
  $AFF6: 00        BRK
  $AFF7: 00        BRK
  $AFF8: 00        BRK
  $AFF9: 44 00     NOP $00
  $AFFB: 00        BRK
  $AFFC: 11 00     ORA ($00),Y
  $AFFE: 00        BRK
  $AFFF: 00        BRK
  $B000: 00        BRK
  $B001: 44 50     NOP $50
  $B003: 50 11     BVC $b016
  $B005: 00        BRK
  $B006: 00        BRK
  $B007: 60        RTS
  $B008: 00        BRK
  $B009: 0A        ASL A
  $B00A: 18        CLC
  $B00B: F0 3F     BEQ $b04c
  $B00D: F0 BF     BEQ $afce
  $B00F: F0 1F     BEQ $b030
  $B011: F1 53     SBC ($53),Y
  $B013: F1 E7     SBC ($e7),Y
  $B015: F1 7C     SBC ($7c),Y
  $B017: F2        ???
  $B018: 1C 04 F8  NOP $f804,X
  $B01B: 40        RTI
  $B01C: 7A        NOP
  $B01D: 00        BRK
  $B01E: 48        PHA
  $B01F: 7A        NOP
  $B020: 00        BRK
  $B021: 78        SEI
  $B022: 7A        NOP
  $B023: 00        BRK
  $B024: 88        DEY
  $B025: 7A        NOP
  $B026: 00        BRK
  $B027: 07 00     SLO $00
  $B029: 38        SEC
  $B02A: C5 00     CMP $00
  $B02C: 40        RTI
  $B02D: D0 00     BNE $b02f
  $B02F: 48        PHA
  $B030: D0 00     BNE $b032
  $B032: 70 C5     BVS $aff9
  $B034: 00        BRK
  $B035: 78        SEI
  $B036: D0 00     BNE $b038
  $B038: 80 C5     NOP #$c5
  $B03A: 00        BRK
  $B03B: 88        DEY
  $B03C: D0 00     BNE $b03e
  $B03E: 00        BRK
  $B03F: 1C 03 F8  NOP $f803,X
  $B042: 50 80     BVC $afc4
  $B044: 00        BRK
  $B045: 58        CLI
  $B046: 81 00     STA ($00,X)
  $B048: 60        RTS
  $B049: 84 00     STY $00
  $B04B: 07 00     SLO $00
  $B04D: 50 82     BVC $afd1
  $B04F: 00        BRK
  $B050: 50 85     BVC $afd7
  $B052: 01 58     ORA ($58,X)
  $B054: 83 00     SAX ($00,X)
  $B056: 58        CLI
  $B057: 90 01     BCC $b05a
  $B059: 60        RTS
  $B05A: 86 00     STX $00
  $B05C: 60        RTS
  $B05D: 91 01     STA ($01),Y
  $B05F: 68        PLA
  $B060: 87 00     SAX $00
  $B062: 07 08     SLO $08
  $B064: 50 88     BVC $afee
  $B066: 00        BRK
  $B067: 50 92     BVC $affb
  $B069: 01 58     ORA ($58,X)
  $B06B: 89 00     NOP #$00
  $B06D: 58        CLI
  $B06E: 93 01     ??? ($01),Y
  $B070: 60        RTS
  $B071: 8C 00 60  STY $6000
  $B074: 96 01     STX $01,Y
  $B076: 68        PLA
  $B077: 8D 00 07  STA $0700
  $B07A: 10 50     BPL $b0cc
  $B07C: 8A        TXA
  $B07D: 00        BRK
  $B07E: 50 98     BVC $b018
  $B080: 01 58     ORA ($58,X)
  $B082: 8B 00     XAA #$00
  $B084: 58        CLI
  $B085: 99 01 60  STA $6001,Y
  $B088: 8E 00 60  STX $6000
  $B08B: 9C 01 68  SHY $6801,X
  $B08E: 8F 00 07  SAX $0700
  $B091: 18        CLC
  $B092: 50 A0     BVC $b034
  $B094: 00        BRK
  $B095: 58        CLI
  $B096: A1 00     LDA ($00,X)
  $B098: 58        CLI
  $B099: 9A        TXS
  $B09A: 01 60     ORA ($60,X)
  $B09C: A4 00     LDY $00
  $B09E: 60        RTS
  $B09F: 9B 01 68  TAS $6801,Y
  $B0A2: A5 00     LDA $00
  $B0A4: 70 B0     BVS $b056
  $B0A6: 00        BRK
  $B0A7: 07 20     SLO $20
  $B0A9: 48        PHA
  $B0AA: A2 00     LDX #$00
  $B0AC: 50 A3     BVC $b051
  $B0AE: 00        BRK
  $B0AF: 58        CLI
  $B0B0: A6 00     LDX $00
  $B0B2: 60        RTS
  $B0B3: A7 00     LAX $00
  $B0B5: 68        PLA
  $B0B6: B2        ???
  $B0B7: 00        BRK
  $B0B8: 68        PLA
  $B0B9: B1 01     LDA ($01),Y
  $B0BB: 70 B3     BVS $b070
  $B0BD: 00        BRK
  $B0BE: 00        BRK
  $B0BF: 1C 04 00  NOP $0004,X
  $B0C2: 50 97     BVC $b05b
  $B0C4: 01 58     ORA ($58,X)
  $B0C6: C2 01     NOP #$01
  $B0C8: 60        RTS
  $B0C9: C3 01     DCP ($01,X)
  $B0CB: 68        PLA
  $B0CC: C6 01     DEC $01
  $B0CE: 06 08     ASL $08
  $B0D0: 50 9D     BVC $b06f
  $B0D2: 01 58     ORA ($58,X)
  $B0D4: 79 00 58  ADC $5800,Y
  $B0D7: C8        INY
  $B0D8: 01 60     ORA ($60,X)
  $B0DA: 7C 00 60  NOP $6000,X
  $B0DD: C9 01     CMP #$01
  $B0DF: 68        PLA
  $B0E0: CC 01 07  CPY $0701
  $B0E3: 10 50     BPL $b135
  $B0E5: 9E 01 58  SHX $5801,Y
  $B0E8: 7B 00 58  RRA $5800,Y
  $B0EB: 9F 01 60  ??? $6001,Y
  $B0EE: 7E 00 60  ROR $6000,X
  $B0F1: CA        DEX
  $B0F2: 01 68     ORA ($68,X)
  $B0F4: 7D 00 68  ADC $6800,X
  $B0F7: CB 01     AXS #$01
  $B0F9: 06 18     ASL $18
  $B0FB: 50 B5     BVC $b0b2
  $B0FD: 01 58     ORA ($58,X)
  $B0FF: D1 00     CMP ($00),Y
  $B101: 58        CLI
  $B102: E0 01     CPX #$01
  $B104: 60        RTS
  $B105: D4 00     NOP $00,X
  $B107: 68        PLA
  $B108: 7F 00 68  RRA $6800,X
  $B10B: E1 01     SBC ($01,X)
  $B10D: 05 20     ORA $20
  $B10F: 50 94     BVC $b0a5
  $B111: 00        BRK
  $B112: 58        CLI
  $B113: 95 00     STA $00,X
  $B115: 60        RTS
  $B116: C0 00     CPY #$00
  $B118: 68        PLA
  $B119: C1 00     CMP ($00,X)
  $B11B: 70 C4     BVS $b0e1
  $B11D: 00        BRK
  $B11E: 00        BRK
  $B11F: 1C 02 08  NOP $0802,X
  $B122: 70 DE     BVS $b102
  $B124: 01 78     ORA ($78,X)
  $B126: DF 01 03  DCP $0301,X
  $B129: 10 68     BPL $b193
  $B12B: F1 01     SBC ($01),Y
  $B12D: 70 F4     BVS $b123
  $B12F: 01 78     ORA ($78,X)
  $B131: F5 01     SBC $01,X
  $B133: 05 18     ORA $18
  $B135: 68        PLA
  $B136: F3 02     ISB ($02),Y
  $B138: 68        PLA
  $B139: C7 00     DCP $00
  $B13B: 70 F6     BVS $b133
  $B13D: 01 78     ORA ($78,X)
  $B13F: F7 01     ISB $01,X
  $B141: 80 F3     NOP #$f3
  $B143: 42        ???
  $B144: 04 20     NOP $20
  $B146: 68        PLA
  $B147: E7 02     ISB $02
  $B149: 70 F2     BVS $b13d
  $B14B: 02        ???
  $B14C: 78        SEI
  $B14D: F2        ???
  $B14E: 42        ???
  $B14F: 80 E7     NOP #$e7
  $B151: 42        ???
  $B152: 00        BRK
  $B153: 1C 04 00  NOP $0004,X
  $B156: 18        CLC
  $B157: A8        TAY
  $B158: 03 20     SLO ($20,X)
  $B15A: A9 03     LDA #$03
  $B15C: 28        PLP
  $B15D: AC 03 30  LDY $3003
  $B160: AD 03 06  LDA $0603
  $B163: 08        PHP
  $B164: 10 AA     BPL $b110
  $B166: 03 18     SLO ($18,X)
  $B168: FF 03 20  ISB $2003,X
  $B16B: FF 03 28  ISB $2803,X
  $B16E: AB 03     ATX #$03
  $B170: 30 AE     BMI $b120
  $B172: 03 38     SLO ($38,X)
  $B174: AF 03 06  LAX $0603
  $B177: 10 10     BPL $b189
  $B179: E8        INX
  $B17A: 03 18     SLO ($18,X)
  $B17C: E9 03     SBC #$03
  $B17E: 20 EC 03  JSR $03ec
  $B181: 28        PLP
  $B182: ED 03 30  SBC $3003
  $B185: B8        CLV
  $B186: 03 38     SLO ($38,X)
  $B188: B9 03 06  LDA $0603,Y
  $B18B: 18        CLC
  $B18C: 10 EA     BPL $b178
  $B18E: 03 18     SLO ($18,X)
  $B190: EB 03     SBC #$03
  $B192: 20 EE 03  JSR $03ee
  $B195: 28        PLP
  $B196: EF 03 30  ISB $3003
  $B199: BA        TSX
  $B19A: 03 38     SLO ($38,X)
  $B19C: BB 03 06  LAS $0603,Y
  $B19F: 20 18 F8  JSR $f818
  $B1A2: 03 20     SLO ($20,X)
  $B1A4: F9 03 28  SBC $2803,Y
  $B1A7: FC 03 30  NOP $3003,X
  $B1AA: BC 03 38  LDY $3803,X
  $B1AD: BD 03 80  LDA $8003,X
  $B1B0: DB 00 08  DCP $0800,Y
  $B1B3: 28        PLP
  $B1B4: 20 FB 03  JSR $03fb
  $B1B7: 28        PLP
  $B1B8: FE 03 30  INC $3003,X
  $B1BB: BE 02 38  LDX $3802,Y
  $B1BE: BF 02 40  LAX $4002,Y
  $B1C1: FA        NOP
  $B1C2: 02        ???
  $B1C3: 78        SEI
  $B1C4: CE 00 80  DEC $8000
  $B1C7: CF 00 88  DCP $8800
  $B1CA: DA        NOP
  $B1CB: 00        BRK
  $B1CC: 08        PHP
  $B1CD: 30 08     BMI $b1d7
  $B1CF: B4 02     LDY $02,X
  $B1D1: 20 B6 02  JSR $02b6
  $B1D4: 28        PLP
  $B1D5: B7 02     LAX $02,Y
  $B1D7: 30 E2     BMI $b1bb
  $B1D9: 02        ???
  $B1DA: 40        RTI
  $B1DB: E3 02     ISB ($02,X)
  $B1DD: 78        SEI
  $B1DE: E4 01     CPX $01
  $B1E0: 80 E5     NOP #$e5
  $B1E2: 01 88     ORA ($88,X)
  $B1E4: F0 01     BEQ $b1e7
  $B1E6: 00        BRK
  $B1E7: 1D 04 00  ORA $0004,X
  $B1EA: 78        SEI
  $B1EB: B4 02     LDY $02,X
  $B1ED: 80 B5     NOP #$b5
  $B1EF: 02        ???
  $B1F0: 88        DEY
  $B1F1: E0 02     CPX #$02
  $B1F3: 90 E1     BCC $b1d6
  $B1F5: 02        ???
  $B1F6: 06 08     ASL $08
  $B1F8: 70 B3     BVS $b1ad
  $B1FA: 02        ???
  $B1FB: 78        SEI
  $B1FC: B6 02     LDX $02,Y
  $B1FE: 80 B7     NOP #$b7
  $B200: 02        ???
  $B201: 88        DEY
  $B202: 02        ???
  $B203: 02        ???
  $B204: 90 02     BCC $b208
  $B206: 02        ???
  $B207: 98        TYA
  $B208: E2 02     NOP #$02
  $B20A: 07 10     SLO $10
  $B20C: 70 B9     BVS $b1c7
  $B20E: 02        ???
  $B20F: 78        SEI
  $B210: BC 02 80  LDY $8002,X
  $B213: BD 02 88  LDA $8802,X
  $B216: E8        INX
  $B217: 02        ???
  $B218: 90 E9     BCC $b203
  $B21A: 02        ???
  $B21B: 98        TYA
  $B21C: 02        ???
  $B21D: 02        ???
  $B21E: A0 E4     LDY #$e4
  $B220: 02        ???
  $B221: 07 18     SLO $18
  $B223: 70 BB     BVS $b1e0
  $B225: 02        ???
  $B226: 78        SEI
  $B227: BE 03 80  LDX $8003,Y
  $B22A: BF 03 88  LAX $8803,Y
  $B22D: EA        NOP
  $B22E: 03 90     SLO ($90,X)
  $B230: EB 02     SBC #$02
  $B232: 98        TYA
  $B233: E3 02     ISB ($02,X)
  $B235: A0 E6     LDY #$e6
  $B237: 02        ???
  $B238: 05 20     ORA $20
  $B23A: 78        SEI
  $B23B: CF 03 88  DCP $8803
  $B23E: DB 03 90  DCP $9003,Y
  $B241: DE 02 98  DEC $9802,X
  $B244: DF 02 A0  DCP $a002,X
  $B247: EC 02 05  CPX $0502
  $B24A: 28        PLP
  $B24B: 40        RTI
  $B24C: EE 03 78  INC $7803
  $B24F: E5 02     SBC $02
  $B251: 88        DEY
  $B252: F1 02     SBC ($02),Y
  $B254: 90 F4     BCC $b24a
  $B256: 02        ???
  $B257: 98        TYA
  $B258: F5 02     SBC $02,X
  $B25A: 07 30     SLO $30
  $B25C: 78        SEI
  $B25D: E7 01     ISB $01
  $B25F: 80 F2     NOP #$f2
  $B261: 03 88     SLO ($88,X)
  $B263: F3 03     ISB ($03),Y
  $B265: 90 F6     BCC $b25d
  $B267: 03 98     SLO ($98,X)
  $B269: F7 01     ISB $01,X
  $B26B: A0 CD     LDY #$cd
  $B26D: 01 A8     ORA ($a8,X)
  $B26F: D8        CLD
  $B270: 01 01     ORA ($01,X)
  $B272: 23 38     RLA ($38,X)
  $B274: F0 43     BEQ $b2b9
  $B276: 01 24     ORA ($24,X)
  $B278: 80 F0     NOP #$f0
  $B27A: 03 00     SLO ($00,X)
  $B27C: 00        BRK
  $B27D: 02        ???
  $B27E: 20 60 60  JSR $6060
  $B281: 01 68     ORA ($68,X)
  $B283: 60        RTS
  $B284: 01 03     ORA ($03,X)
  $B286: 28        PLP
  $B287: 58        CLI
  $B288: B1 01     LDA ($01),Y
  $B28A: 60        RTS
  $B28B: B4 01     LDY $01,X
  $B28D: 68        PLA
  $B28E: B5 01     LDA $01,X
  $B290: 03 30     SLO ($30,X)
  $B292: 58        CLI
  $B293: F0 01     BEQ $b296
  $B295: 60        RTS
  $B296: F1 01     SBC ($01),Y
  $B298: 68        PLA
  $B299: F4 01     NOP $01,X
  $B29B: 03 38     SLO ($38,X)
  $B29D: 58        CLI
  $B29E: B9 01 60  LDA $6001,Y
  $B2A1: BC 01 68  LDY $6801,X
  $B2A4: BD 01 03  LDA $0301,X
  $B2A7: 40        RTI
  $B2A8: 58        CLI
  $B2A9: BB 01 60  LAS $6001,Y
  $B2AC: BE 01 68  LDX $6801,Y
  $B2AF: BF 01 00  LAX $0001,Y
  $B2B2: 30 F3     BMI $b2a7
  $B2B4: AA        TAX
  $B2B5: F3 C4     ISB ($c4),Y
  $B2B7: F3 F0     ISB ($f0),Y
  $B2B9: F3 3A     ISB ($3a),Y
  $B2BB: F4 54     NOP $54,X
  $B2BD: F4 72     NOP $72,X
  $B2BF: F4 94     NOP $94,X
  $B2C1: F4 A2     NOP $a2,X
  $B2C3: F4 B6     NOP $b6,X
  $B2C5: F4 C5     NOP $c5,X
  $B2C7: F4 D8     NOP $d8,X
  $B2C9: F4 E6     NOP $e6,X
  $B2CB: F4 FF     NOP $ff,X
  $B2CD: F4 13     NOP $13,X
  $B2CF: F5 27     SBC $27,X
  $B2D1: F5 3E     SBC $3e,X
  $B2D3: F5 4B     SBC $4b,X
  $B2D5: F5 57     SBC $57,X
  $B2D7: F5 82     SBC $82,X
  $B2D9: F5 A9     SBC $a9,X
  $B2DB: F5 DD     SBC $dd,X
  $B2DD: F5 1A     SBC $1a,X
  $B2DF: F6 48     INC $48,X
  $B2E1: F6 8F     INC $8f,X
  $B2E3: F6 0F     INC $0f,X
  $B2E5: F7 69     ISB $69,X
  $B2E7: F7 81     ISB $81,X
  $B2E9: F7 A1     ISB $a1,X
  $B2EB: F7 01     ISB $01,X
  $B2ED: F8        SED
  $B2EE: 1F F8 3F  SLO $3ff8,X
  $B2F1: F8        SED
  $B2F2: 66 F8     ROR $f8
  $B2F4: A8        TAY
  $B2F5: F8        SED
  $B2F6: DD F8 01  CMP $01f8,X
  $B2F9: F9 16 F9  SBC $f916,Y
  $B2FC: 4F F9 60  SRE $60f9
  $B2FF: F9 92 F9  SBC $f992,Y
  $B302: AB F9     ATX #$f9
  $B304: EE F9 10  INC $10f9
  $B307: FA        NOP
  $B308: 2A        ROL A
  $B309: FA        NOP
  $B30A: 42        ???
  $B30B: FA        NOP
  $B30C: 6D FA 8F  ADC $8ffa
  $B30F: FA        NOP
  $B310: EE FA 19  INC $19fa
  $B313: FB 70 FB  ISB $fb70,Y
  $B316: 7D FB 9B  ADC $9bfb,X
  $B319: FB C0 FB  ISB $fbc0,Y
  $B31C: E4 FB     CPX $fb
  $B31E: 16 FC     ASL $fc,X
  $B320: 29 FC     AND #$fc
  $B322: 52        ???
  $B323: FC 6A FC  NOP $fc6a,X
  $B326: A9 FC     LDA #$fc
  $B328: ED FC 1C  SBC $1cfc
  $B32B: FD 9E FD  SBC $fd9e,X
  $B32E: 3D FE 22  AND $22fe,X
  $B331: 22        ???
  $B332: 4E F3 62  LSR $62f3
  $B335: 22        ???
  $B336: 5A        NOP
  $B337: F3 A4     ISB ($a4),Y
  $B339: 22        ???
  $B33A: 6C F3 E2  JMP ($e2f3)
  $B33D: 22        ???
  $B33E: 7E F3 22  ROR $22f3,X
  $B341: 23 90     RLA ($90,X)
  $B343: F3 38     ISB ($38),Y
  $B345: 22        ???
  $B346: A3 F3     LAX ($f3,X)
  $B348: 78        SEI
  $B349: 22        ???
  $B34A: A6 F3     LDX $f3
  $B34C: 00        BRK
  $B34D: 80 0B     NOP #$0b
  $B34F: 7D A4 48  ADC $48a4,X
  $B352: 8C 3A 0B  STY $0b3a
  $B355: 30 07     BMI $b35e
  $B357: 0B 2F     ANC #$2f
  $B359: 3B 11 09  RLA $0911,Y
  $B35C: 09 9B     ORA #$9b
  $B35E: A6 AD     LDX $ad
  $B360: 8C 15 3A  STY $3a15
  $B363: 11 63     ORA ($63),Y
  $B365: 0A        ASL A
  $B366: 18        CLC
  $B367: E8        INX
  $B368: 48        PHA
  $B369: 93 94     ??? ($94),Y
  $B36B: 48        PHA
  $B36C: 11 1F     ORA ($1f),Y
  $B36E: 0A        ASL A
  $B36F: 06 4F     ASL $4f
  $B371: 0C 2D 5C  NOP $5c2d
  $B374: 01 28     ORA ($28,X)
  $B376: 35 05     AND $05,X
  $B378: 29 2C     AND #$2c
  $B37A: 90 48     BCC $b3c4
  $B37C: A0 15     LDY #$15
  $B37E: 11 0A     ORA ($0a),Y
  $B380: 2D 05 0A  AND $0a05
  $B383: 0D 29 63  ORA $6329
  $B386: 3A        NOP
  $B387: 0D 2D 27  ORA $272d
  $B38A: 31 07     AND ($07),Y
  $B38C: 80 AE     NOP #$ae
  $B38E: EA        NOP
  $B38F: 19 12 1E  ORA $1e12,Y
  $B392: 10 4F     BPL $b3e3
  $B394: 01 14     ORA ($14,X)
  $B396: 01 36     ORA ($36,X)
  $B398: 3A        NOP
  $B399: 0A        ASL A
  $B39A: 4F 0B 15  SRE $150b
  $B39D: 01 06     ORA ($06,X)
  $B39F: 1E 0C 05  ASL $050c,X
  $B3A2: 37 02     RLA $02,X
  $B3A4: 19 01 03  ORA $0301,Y
  $B3A7: 01 01     ORA ($01,X)
  $B3A9: 03 22     SLO ($22,X)
  $B3AB: 22        ???
  $B3AC: B0 F3     BCS $b3a1
  $B3AE: 00        BRK
  $B3AF: 00        BRK
  $B3B0: 13 3C     SLO ($3c),Y
  $B3B2: 3A        NOP
  $B3B3: 11 63     ORA ($63),Y
  $B3B5: 0A        ASL A
  $B3B6: 36 3F     ROL $3f,X
  $B3B8: 40        RTI
  $B3B9: 55 05     EOR $05,X
  $B3BB: 26 3A     ROL $3a
  $B3BD: 0B 00     ANC #$00
  $B3BF: 01 59     ORA ($59,X)
  $B3C1: 58        CLI
  $B3C2: 36 3D     ROL $3d,X
  $B3C4: 22        ???
  $B3C5: 22        ???
  $B3C6: DA        NOP
  $B3C7: F3 38     ISB ($38),Y
  $B3C9: 22        ???
  $B3CA: E0 F3     CPX #$f3
  $B3CC: 78        SEI
  $B3CD: 22        ???
  $B3CE: E4 F3     CPX $f3
  $B3D0: B8        CLV
  $B3D1: 22        ???
  $B3D2: E7 F3     ISB $f3
  $B3D4: F8        SED
  $B3D5: 22        ???
  $B3D6: EC F3 00  CPX $00f3
  $B3D9: 80 05     NOP #$05
  $B3DB: 5D 02 0C  EOR $0c02,X
  $B3DE: 28        PLP
  $B3DF: 37 03     RLA $03,X
  $B3E1: 01 5D     ORA ($5d,X)
  $B3E3: 02        ???
  $B3E4: 02        ???
  $B3E5: 06 07     ASL $07
  $B3E7: 04 0B     NOP $0b
  $B3E9: 26 66     ROL $66
  $B3EB: 28        PLP
  $B3EC: 03 23     SLO ($23,X)
  $B3EE: 21 28     AND ($28,X)
  $B3F0: 22        ???
  $B3F1: 22        ???
  $B3F2: 06 F4     ASL $f4
  $B3F4: 38        SEC
  $B3F5: 22        ???
  $B3F6: 0D F4 78  ORA $78f4
  $B3F9: 22        ???
  $B3FA: 13 F4     SLO ($f4),Y
  $B3FC: B8        CLV
  $B3FD: 22        ???
  $B3FE: 25 F4     AND $f4
  $B400: F8        SED
  $B401: 22        ???
  $B402: 2B F4     ANC #$f4
  $B404: 00        BRK
  $B405: 80 06     NOP #$06
  $B407: 5D 09 1C  EOR $1c09,X
  $B40A: 01 07     ORA ($07,X)
  $B40C: 37 05     RLA $05,X
  $B40E: 0B 30     ANC #$30
  $B410: 07 0B     SLO $0b
  $B412: 2F 05 E8  RLA $e805
  $B415: A7 0B     LAX $0b
  $B417: 14 01     NOP $01,X
  $B419: 06 A2     ASL $a2
  $B41B: AD 9E A8  LDA $a89e
  $B41E: 93 A8     ??? ($a8),Y
  $B420: 04 09     NOP $09
  $B422: 02        ???
  $B423: 03 2D     SLO ($2d,X)
  $B425: 05 8C     ORA $8c
  $B427: 8F D5 80  SAX $80d5
  $B42A: A0 06     LDY #$06
  $B42C: 64 55     NOP $55
  $B42E: 30 11     BMI $b441
  $B430: 05 2D     ORA $2d
  $B432: 07 83     SLO $83
  $B434: AE 9B B2  LDX $b29b
  $B437: A8        TAY
  $B438: 13 02     SLO ($02),Y
  $B43A: 22        ???
  $B43B: 22        ???
  $B43C: 06 F4     ASL $f4
  $B43E: 38        SEC
  $B43F: 22        ???
  $B440: 0D F4 78  ORA $78f4
  $B443: 22        ???
  $B444: 13 F4     SLO ($f4),Y
  $B446: B8        CLV
  $B447: 22        ???
  $B448: 19 F4 F8  ORA $f8f4,Y
  $B44B: 22        ???
  $B44C: 25 F4     AND $f4
  $B44E: 38        SEC
  $B44F: 23 2B     RLA ($2b,X)
  $B451: F4 00     NOP $00,X
  $B453: 80 22     NOP #$22
  $B455: 22        ???
  $B456: 06 F4     ASL $f4
  $B458: 38        SEC
  $B459: 22        ???
  $B45A: 0D F4 78  ORA $78f4
  $B45D: 22        ???
  $B45E: 13 F4     SLO ($f4),Y
  $B460: B8        CLV
  $B461: 22        ???
  $B462: 19 F4 F8  ORA $f8f4,Y
  $B465: 22        ???
  $B466: 20 F4 38  JSR $38f4
  $B469: 23 25     RLA ($25,X)
  $B46B: F4 78     NOP $78,X
  $B46D: 23 2B     RLA ($2b,X)
  $B46F: F4 00     NOP $00,X
  $B471: 80 F8     NOP #$f8
  $B473: 21 0D     AND ($0d,X)
  $B475: F4 22     NOP $22,X
  $B477: 22        ???
  $B478: 06 F4     ASL $f4
  $B47A: 38        SEC
  $B47B: 22        ???
  $B47C: 13 F4     SLO ($f4),Y
  $B47E: 78        SEI
  $B47F: 22        ???
  $B480: 19 F4 B8  ORA $b8f4,Y
  $B483: 22        ???
  $B484: 20 F4 F8  JSR $f8f4
  $B487: 22        ???
  $B488: 25 F4     AND $f4
  $B48A: 38        SEC
  $B48B: 23 2B     RLA ($2b,X)
  $B48D: F4 78     NOP $78,X
  $B48F: 23 32     RLA ($32,X)
  $B491: F4 00     NOP $00,X
  $B493: 40        RTI
  $B494: 22        ???
  $B495: 22        ???
  $B496: 9A        TXS
  $B497: F4 00     NOP $00,X
  $B499: 00        BRK
  $B49A: 07 22     SLO $22
  $B49C: 02        ???
  $B49D: 3A        NOP
  $B49E: 06 12     ASL $12
  $B4A0: 01 28     ORA ($28,X)
  $B4A2: 22        ???
  $B4A3: 22        ???
  $B4A4: A8        TAY
  $B4A5: F4 00     NOP $00,X
  $B4A7: 00        BRK
  $B4A8: 0D 0B 30  ORA $300b
  $B4AB: 07 0B     SLO $0b
  $B4AD: 2F 15 3A  RLA $3a15
  $B4B0: 22        ???
  $B4B1: 5D 2E 12  EOR $122e,X
  $B4B4: 06 0F     ASL $0f
  $B4B6: 22        ???
  $B4B7: 22        ???
  $B4B8: BC F4 00  LDY $00f4,X
  $B4BB: 00        BRK
  $B4BC: 08        PHP
  $B4BD: 3C E8 A7  NOP $a7e8,X
  $B4C0: 0B 14     ANC #$14
  $B4C2: 01 39     ORA ($39,X)
  $B4C4: 3D 22 22  AND $2222,X
  $B4C7: CB F4     AXS #$f4
  $B4C9: 00        BRK
  $B4CA: 00        BRK
  $B4CB: 0C 3C A2  NOP $a23c
  $B4CE: AD 9E A8  LDA $a89e
  $B4D1: 93 A8     ??? ($a8),Y
  $B4D3: 18        CLC
  $B4D4: 04 05     NOP $05
  $B4D6: 39 3D 22  AND $223d,Y
  $B4D9: 22        ???
  $B4DA: DE F4 00  DEC $00f4,X
  $B4DD: 00        BRK
  $B4DE: 07 3C     SLO $3c
  $B4E0: 09 02     ORA #$02
  $B4E2: 03 2D     SLO ($2d,X)
  $B4E4: 39 3D 22  AND $223d,Y
  $B4E7: 22        ???
  $B4E8: EC F4 00  CPX $00f4
  $B4EB: 00        BRK
  $B4EC: 12        ???
  $B4ED: 3C E8 A8  NOP $a8e8,X
  $B4F0: 87 7F     SAX $7f
  $B4F2: DC 7F EA  NOP $ea7f,X
  $B4F5: A6 AD     LDX $ad
  $B4F7: 8C 8C 8F  STY $8f8c
  $B4FA: D5 80     CMP $80,X
  $B4FC: A0 39     LDY #$39
  $B4FE: 3D 22 22  AND $2222,X
  $B501: 05 F5     ORA $f5
  $B503: 00        BRK
  $B504: 00        BRK
  $B505: 0D 3C A8  ORA $a83c
  $B508: 48        PHA
  $B509: E5 A8     SBC $a8
  $B50B: 64 55     NOP $55
  $B50D: 30 11     BMI $b520
  $B50F: 05 2D     ORA $2d
  $B511: 39 3D 22  AND $223d,Y
  $B514: 22        ???
  $B515: 19 F5 00  ORA $00f5,Y
  $B518: 00        BRK
  $B519: 0D 3C 00  ORA $003c
  $B51C: 3A        NOP
  $B51D: 83 AE     SAX ($ae,X)
  $B51F: 9B B2 A8  TAS $a8b2,Y
  $B522: 13 02     SLO ($02),Y
  $B524: 59 36 3D  EOR $3d36,Y
  $B527: 22        ???
  $B528: 22        ???
  $B529: 2D F5 00  AND $00f5
  $B52C: 00        BRK
  $B52D: 10 3C     BPL $b56b
  $B52F: 1D 05 18  ORA $1805,X
  $B532: 63 0B     RRA ($0b,X)
  $B534: 31 15     AND ($15),Y
  $B536: 3A        NOP
  $B537: 01 28     ORA ($28,X)
  $B539: 18        CLC
  $B53A: 05 14     ORA $14
  $B53C: 36 3D     ROL $3d,X
  $B53E: 22        ???
  $B53F: 22        ???
  $B540: 44 F5     NOP $f5
  $B542: 00        BRK
  $B543: 00        BRK
  $B544: 06 59     ASL $59
  $B546: 29 22     AND #$22
  $B548: 01 14     ORA ($14,X)
  $B54A: 01 22     ORA ($22,X)
  $B54C: 22        ???
  $B54D: 51 F5     EOR ($f5),Y
  $B54F: 00        BRK
  $B550: 00        BRK
  $B551: 05 14     ORA $14
  $B553: 15 22     ORA $22,X
  $B555: 14 01     NOP $01,X
  $B557: 22        ???
  $B558: 22        ???
  $B559: 65 F5     ADC $f5
  $B55B: 38        SEC
  $B55C: 22        ???
  $B55D: 73 F5     RRA ($f5),Y
  $B55F: 78        SEI
  $B560: 22        ???
  $B561: 7A        NOP
  $B562: F5 00     SBC $00,X
  $B564: 80 0D     NOP #$0d
  $B566: 1A        NOP
  $B567: 13 4F     SLO ($4f),Y
  $B569: 01 1E     ORA ($1e,X)
  $B56B: 0C 3A 14  NOP $143a
  $B56E: 15 2C     ORA $2c,X
  $B570: 06 07     ASL $07
  $B572: 37 06     RLA $06,X
  $B574: 1F 0A 06  SLO $060a,X
  $B577: 18        CLC
  $B578: 09 13     ORA #$13
  $B57A: 07 E9     SLO $e9
  $B57C: 83 48     SAX ($48,X)
  $B57E: A8        TAY
  $B57F: 18        CLC
  $B580: 09 13     ORA #$13
  $B582: E2 21     NOP #$21
  $B584: 28        PLP
  $B585: F6 22     INC $22,X
  $B587: 22        ???
  $B588: 90 F5     BCC $b57f
  $B58A: 63 22     RRA ($22,X)
  $B58C: A1 F5     LDA ($f5,X)
  $B58E: 00        BRK
  $B58F: 00        BRK
  $B590: 10 3C     BPL $b5ce
  $B592: E9 83     SBC #$83
  $B594: 48        PHA
  $B595: A8        TAY
  $B596: 19 3A 9B  ORA $9b3a,Y
  $B599: A6 AD     LDX $ad
  $B59B: 8C 7D A4  STY $a47d
  $B59E: 48        PHA
  $B59F: 8C 18 07  STY $0718
  $B5A2: 86 AF     STX $af
  $B5A4: EA        NOP
  $B5A5: 92        ???
  $B5A6: AD 59 3D  LDA $3d59
  $B5A9: E2 21     NOP #$21
  $B5AB: B7 F5     LAX $f5,Y
  $B5AD: 22        ???
  $B5AE: 22        ???
  $B5AF: BC F5 63  LDY $63f5,X
  $B5B2: 22        ???
  $B5B3: CD F5 00  CMP $00f5
  $B5B6: 00        BRK
  $B5B7: 04 09     NOP $09
  $B5B9: 5D 22 3B  EOR $3b22,X
  $B5BC: 10 3C     BPL $b5fa
  $B5BE: 1F 0A 06  SLO $060a,X
  $B5C1: 14 26     NOP $26,X
  $B5C3: 3A        NOP
  $B5C4: 25 07     AND $07
  $B5C6: A2 AD     LDX #$ad
  $B5C8: 9E A8 93  SHX $93a8,Y
  $B5CB: A8        TAY
  $B5CC: 18        CLC
  $B5CD: 0F 04 05  SLO $0504
  $B5D0: 5C 3A 8A  NOP $8a3a,X
  $B5D3: AE 85 48  LDX $4885
  $B5D6: 2C 0B 12  BIT $120b
  $B5D9: 01 28     ORA ($28,X)
  $B5DB: 25 3D     AND $3d
  $B5DD: E2 21     NOP #$21
  $B5DF: B7 F5     LAX $f5,Y
  $B5E1: 22        ???
  $B5E2: 22        ???
  $B5E3: EF F5 63  ISB $63f5
  $B5E6: 22        ???
  $B5E7: 01 F6     ORA ($f6,X)
  $B5E9: A3 22     LAX ($22,X)
  $B5EB: 10 F6     BPL $b5e3
  $B5ED: 00        BRK
  $B5EE: 00        BRK
  $B5EF: 11 3C     ORA ($3c),Y
  $B5F1: E9 83     SBC #$83
  $B5F3: 48        PHA
  $B5F4: A8        TAY
  $B5F5: 19 9F 8A  ORA $8a9f,Y
  $B5F8: 86 2C     STX $2c
  $B5FA: 0A        ASL A
  $B5FB: 4F 0B 12  SRE $120b
  $B5FE: 0F 05 26  SLO $2605
  $B601: 0E E9 83  ASL $83e9
  $B604: 48        PHA
  $B605: A8        TAY
  $B606: 2C 0A 4F  BIT $4f0a
  $B609: 0D 63 3A  ORA $3a63
  $B60C: 9F 8A 86  ??? $868a,Y
  $B60F: 15 09     ORA $09,X
  $B611: 00        BRK
  $B612: 03 28     SLO ($28,X)
  $B614: 13 04     SLO ($04),Y
  $B616: 22        ???
  $B617: 02        ???
  $B618: 25 3D     AND $3d
  $B61A: E2 21     NOP #$21
  $B61C: 28        PLP
  $B61D: F6 22     INC $22,X
  $B61F: 22        ???
  $B620: 2D F6 63  AND $63f6
  $B623: 22        ???
  $B624: 3F F6 00  RLA $00f6,X
  $B627: 00        BRK
  $B628: 04 04     NOP $04
  $B62A: 13 09     SLO ($09),Y
  $B62C: 3B 11 3C  RLA $3c11,Y
  $B62F: 1F 0A 06  SLO $060a,X
  $B632: 37 2B     RLA $2b,X
  $B634: 05 26     ORA $26
  $B636: 14 01     NOP $01,X
  $B638: 08        PHP
  $B639: 5D 3A 0A  EOR $0a3a,X
  $B63C: 2E 06 18  ROL $1806
  $B63F: 08        PHP
  $B640: 95 9D     STA $9d,X
  $B642: AD D5 AD  LDA $add5
  $B645: 05 14     ORA $14
  $B647: 3D E2 21  AND $21e2,X
  $B64A: 28        PLP
  $B64B: F6 22     INC $22,X
  $B64D: 22        ???
  $B64E: 5A        NOP
  $B64F: F6 63     INC $63,X
  $B651: 22        ???
  $B652: 6C F6 A2  JMP ($a2f6)
  $B655: 22        ???
  $B656: 7C F6 00  NOP $00f6,X
  $B659: 00        BRK
  $B65A: 11 3C     ORA ($3c),Y
  $B65C: 10 05     BPL $b663
  $B65E: 07 18     SLO $18
  $B660: 09 02     ORA #$02
  $B662: 03 2D     SLO ($2d,X)
  $B664: 5C 3A 95  NOP $953a,X
  $B667: 9D AD D5  STA $d5ad,X
  $B66A: AD 13 0F  LDA $0f13
  $B66D: 8A        TXA
  $B66E: AE 85 48  LDX $4885
  $B671: 18        CLC
  $B672: 0B 31     ANC #$31
  $B674: 02        ???
  $B675: 65 2C     ADC $2c
  $B677: 0B 12     ANC #$12
  $B679: 0F 57 3D  SLO $3d57
  $B67C: 12        ???
  $B67D: 3C 08 2E  NOP $2e08,X
  $B680: 10 2F     BPL $b6b1
  $B682: 07 19     SLO $19
  $B684: 3A        NOP
  $B685: 11 05     ORA ($05),Y
  $B687: 56 15     LSR $15,X
  $B689: 04 2B     NOP $2b
  $B68B: 2E 0F 14  ROL $140f
  $B68E: 3D E2 21  AND $21e2,X
  $B691: AD F6 22  LDA $22f6
  $B694: 22        ???
  $B695: B3 F6     LAX ($f6),Y
  $B697: 63 22     RRA ($22,X)
  $B699: C1 F6     CMP ($f6,X)
  $B69B: A3 22     LAX ($22,X)
  $B69D: D4 F6     NOP $f6,X
  $B69F: E3 22     ISB ($22,X)
  $B6A1: E5 F6     SBC $f6
  $B6A3: 22        ???
  $B6A4: 23 F0     RLA ($f0,X)
  $B6A6: F6 63     INC $63,X
  $B6A8: 23 01     RLA ($01,X)
  $B6AA: F7 00     ISB $00,X
  $B6AC: 00        BRK
  $B6AD: 05 05     ORA $05
  $B6AF: 0F 50 27  SLO $2750
  $B6B2: 3B 0D 3C  RLA $3c0d,Y
  $B6B5: 1F 0A 06  SLO $060a,X
  $B6B8: 15 19     ORA $19,X
  $B6BA: 3A        NOP
  $B6BB: 57 2D     SRE $2d,X
  $B6BD: 15 1D     ORA $1d,X
  $B6BF: 2D 15 12  AND $1215
  $B6C2: 0A        ASL A
  $B6C3: 2D 05 0C  AND $0c05
  $B6C6: 28        PLP
  $B6C7: 25 02     AND $02
  $B6C9: 15 01     ORA $01,X
  $B6CB: 2E 0F 4F  ROL $4f0f
  $B6CE: 3A        NOP
  $B6CF: 06 1F     ASL $1f
  $B6D1: 0F 10 13  SLO $1310
  $B6D4: 10 19     BPL $b6ef
  $B6D6: 14 29     NOP $29,X
  $B6D8: 12        ???
  $B6D9: 01 0F     ORA ($0f,X)
  $B6DB: E5 A6     SBC $a6
  $B6DD: AD 87 4F  LDA $4f87
  $B6E0: 00        BRK
  $B6E1: 28        PLP
  $B6E2: 09 13     ORA #$13
  $B6E4: 5C 0A 1E  NOP $1e0a,X
  $B6E7: 25 2E     AND $2e
  $B6E9: 12        ???
  $B6EA: 01 0F     ORA ($0f,X)
  $B6EC: 25 02     AND $02
  $B6EE: 59 3D 10  EOR $103d,Y
  $B6F1: 3C 59 4F  NOP $4f59,X
  $B6F4: 3A        NOP
  $B6F5: 1F 0A 06  SLO $060a,X
  $B6F8: 22        ???
  $B6F9: 3A        NOP
  $B6FA: 04 1E     NOP $1e
  $B6FC: 03 15     SLO ($15,X)
  $B6FE: 00        BRK
  $B6FF: 03 63     SLO ($63,X)
  $B701: 0D 06 2E  ORA $2e06
  $B704: 13 08     SLO ($08),Y
  $B706: 2E 0B 2D  ROL $2d0b
  $B709: 0C 28 19  NOP $1928
  $B70C: 56 59     LSR $59,X
  $B70E: 3D E2 21  AND $21e2,X
  $B711: AD F6 22  LDA $22f6
  $B714: 22        ???
  $B715: 25 F7     AND $f7
  $B717: 63 22     RRA ($22,X)
  $B719: 38        SEC
  $B71A: F7 A3     ISB $a3,X
  $B71C: 22        ???
  $B71D: 4B F7     ALR #$f7
  $B71F: E3 22     ISB ($22,X)
  $B721: 5A        NOP
  $B722: F7 00     ISB $00,X
  $B724: 00        BRK
  $B725: 12        ???
  $B726: 3C E9 83  NOP $83e9,X
  $B729: 48        PHA
  $B72A: A8        TAY
  $B72B: 19 3A 1F  ORA $1f3a,Y
  $B72E: 0A        ASL A
  $B72F: 06 18     ASL $18
  $B731: 02        ???
  $B732: 2B 0A     ANC #$0a
  $B734: 2C 06 01  BIT $0106
  $B737: 12        ???
  $B738: 12        ???
  $B739: 09 09     ORA #$09
  $B73B: 15 06     ORA $06,X
  $B73D: 0F 25 02  SLO $0225
  $B740: 59 3A 59  EOR $593a,Y
  $B743: 4F 3A 08  SRE $083a
  $B746: 2E 10 2F  ROL $2f10
  $B749: 07 19     SLO $19
  $B74B: 0E D1 A6  ASL $a6d1
  $B74E: 82 AD     NOP #$ad
  $B750: DD 5C 11  CMP $115c,X
  $B753: 08        PHP
  $B754: 25 02     AND $02
  $B756: 13 01     SLO ($01),Y
  $B758: 2E 12 0E  ROL $0e12
  $B75B: 8C 8F D5  STY $d58f
  $B75E: 80 A0     NOP #$a0
  $B760: 1C 22 5D  NOP $5d22,X
  $B763: 2E 0F 25  ROL $250f
  $B766: 02        ???
  $B767: 59 3D E2  EOR $e23d,Y
  $B76A: 21 28     AND ($28,X)
  $B76C: F6 22     INC $22,X
  $B76E: 22        ???
  $B76F: 73 F7     RRA ($f7),Y
  $B771: 00        BRK
  $B772: 00        BRK
  $B773: 0D 3C 0E  ORA $0e3c
  $B776: 2D 14 1A  AND $1a14
  $B779: 13 3A     SLO ($3a),Y
  $B77B: 0B 26     ANC #$26
  $B77D: 14 01     NOP $01,X
  $B77F: 25 3D     AND $3d
  $B781: E2 21     NOP #$21
  $B783: 28        PLP
  $B784: F6 21     INC $21,X
  $B786: 22        ???
  $B787: 8B F7     XAA #$f7
  $B789: 00        BRK
  $B78A: 00        BRK
  $B78B: 15 3C     ORA $3c,X
  $B78D: E9 83     SBC #$83
  $B78F: 48        PHA
  $B790: A8        TAY
  $B791: 14 26     NOP $26,X
  $B793: 3A        NOP
  $B794: 8C 8F D5  STY $d58f
  $B797: 80 A0     NOP #$a0
  $B799: 18        CLC
  $B79A: 14 05     NOP $05,X
  $B79C: 15 01     ORA $01,X
  $B79E: 28        PLP
  $B79F: 25 3D     AND $3d
  $B7A1: E2 21     NOP #$21
  $B7A3: B7 F7     LAX $f7,Y
  $B7A5: 22        ???
  $B7A6: 22        ???
  $B7A7: BD F7 63  LDA $63f7,X
  $B7AA: 22        ???
  $B7AB: CF F7 A3  DCP $a3f7
  $B7AE: 22        ???
  $B7AF: DE F7 E3  DEC $e3f7,X
  $B7B2: 22        ???
  $B7B3: EF F7 00  ISB $00f7
  $B7B6: 00        BRK
  $B7B7: 05 01     ORA $01
  $B7B9: 10 2A     BPL $b7e5
  $B7BB: 02        ???
  $B7BC: 3B 11 3C  RLA $3c11,Y
  $B7BF: 0F 2A 02  SLO $022a
  $B7C2: 18        CLC
  $B7C3: 09 13     ORA #$13
  $B7C5: 2C 3A 25  BIT $253a
  $B7C8: 2A        ROL A
  $B7C9: 0B 07     ANC #$07
  $B7CB: 0F 18 20  SLO $2018
  $B7CE: 25 0E     AND $0e
  $B7D0: 5D 02 23  EOR $2302,X
  $B7D3: 26 3A     ROL $3a
  $B7D5: 57 2D     SRE $2d,X
  $B7D7: 15 1D     ORA $1d,X
  $B7D9: 2D 15 19  AND $1915
  $B7DC: 01 28     ORA ($28,X)
  $B7DE: 10 08     BPL $b7e8
  $B7E0: 2E 0B 2D  ROL $2d0b
  $B7E3: 4F 3A 11  SRE $113a
  $B7E6: 01 0F     ORA ($0f,X)
  $B7E8: 25 02     AND $02
  $B7EA: 59 3A 0F  EOR $0f3a,Y
  $B7ED: 65 2D     ADC $2d
  $B7EF: 11 83     ORA ($83),Y
  $B7F1: AE 9B B2  LDX $b29b
  $B7F4: A8        TAY
  $B7F5: 13 02     SLO ($02),Y
  $B7F7: 15 01     ORA $01,X
  $B7F9: 08        PHP
  $B7FA: 63 3A     RRA ($3a,X)
  $B7FC: 00        BRK
  $B7FD: 03 28     SLO ($28,X)
  $B7FF: 25 3D     AND $3d
  $B801: E2 21     NOP #$21
  $B803: B7 F7     LAX $f7,Y
  $B805: 22        ???
  $B806: 22        ???
  $B807: 0B F8     ANC #$f8
  $B809: 00        BRK
  $B80A: 00        BRK
  $B80B: 13 3C     SLO ($3c),Y
  $B80D: E9 83     SBC #$83
  $B80F: 48        PHA
  $B810: A8        TAY
  $B811: 37 3A     RLA $3a,X
  $B813: AD 48 3A  LDA $3a48
  $B816: 14 2D     NOP $2d,X
  $B818: 18        CLC
  $B819: 09 13     ORA #$13
  $B81B: 05 14     ORA $14
  $B81D: 37 3D     RLA $3d,X
  $B81F: 22        ???
  $B820: 22        ???
  $B821: 2D F8 38  AND $38f8
  $B824: 22        ???
  $B825: 36 F8     ROL $f8,X
  $B827: 78        SEI
  $B828: 22        ???
  $B829: 3B F8 00  RLA $00f8,Y
  $B82C: 80 08     NOP #$08
  $B82E: 5D 09 2C  EOR $2c09,X
  $B831: 0B 26     ANC #$26
  $B833: 66 28     ROR $28
  $B835: 37 04     RLA $04,X
  $B837: 85 48     STA $48
  $B839: 8E A8 03  STX $03a8
  $B83C: 00        BRK
  $B83D: 0F 27 22  SLO $2227
  $B840: 22        ???
  $B841: 49 F8     EOR #$f8
  $B843: 63 22     RRA ($22,X)
  $B845: 58        CLI
  $B846: F8        SED
  $B847: 00        BRK
  $B848: 00        BRK
  $B849: 0E 3C 09  ASL $093c
  $B84C: 09 19     ORA #$19
  $B84E: 3A        NOP
  $B84F: E8        INX
  $B850: A7 09     LAX $09
  $B852: 02        ???
  $B853: 4F 01 15  SRE $1501
  $B856: 00        BRK
  $B857: 28        PLP
  $B858: 0D 67 07  ORA $0767
  $B85B: 0F 10 18  SLO $1810
  $B85E: 3A        NOP
  $B85F: 0B 30     ANC #$30
  $B861: 07 0B     SLO $0b
  $B863: 2F 59 3D  RLA $3d59
  $B866: E2 21     NOP #$21
  $B868: B7 F5     LAX $f5,Y
  $B86A: 22        ???
  $B86B: 22        ???
  $B86C: 78        SEI
  $B86D: F8        SED
  $B86E: 62        ???
  $B86F: 22        ???
  $B870: 8C F8 A3  STY $a3f8
  $B873: 22        ???
  $B874: 9E F8 00  SHX $00f8,Y
  $B877: 00        BRK
  $B878: 13 3C     SLO ($3c),Y
  $B87A: 39 23 2E  AND $2e23,Y
  $B87D: 68        PLA
  $B87E: 27 3A     RLA $3a
  $B880: 9B A6 AD  TAS $ada6,Y
  $B883: 8C 4F 24  STY $244f
  $B886: 02        ???
  $B887: 0B 31     ANC #$31
  $B889: 02        ???
  $B88A: 0A        ASL A
  $B88B: 3D 11 3C  AND $3c11,X
  $B88E: 0F 01 05  SLO $0501
  $B891: 01 15     ORA ($15,X)
  $B893: 19 3A 57  ORA $573a,Y
  $B896: 2E 0F 01  ROL $010f
  $B899: 9B A6 AD  TAS $ada6,Y
  $B89C: 8C 2C 09  STY $092c
  $B89F: 04 02     NOP $02
  $B8A1: 03 2D     SLO ($2d,X)
  $B8A3: 0B 25     ANC #$25
  $B8A5: 02        ???
  $B8A6: 57 3D     SRE $3d,X
  $B8A8: E2 21     NOP #$21
  $B8AA: 28        PLP
  $B8AB: F6 22     INC $22,X
  $B8AD: 22        ???
  $B8AE: B6 F8     LDX $f8,Y
  $B8B0: 63 22     RRA ($22,X)
  $B8B2: CA        DEX
  $B8B3: F8        SED
  $B8B4: 00        BRK
  $B8B5: 00        BRK
  $B8B6: 13 3C     SLO ($3c),Y
  $B8B8: 0A        ASL A
  $B8B9: 2E 06 18  ROL $1806
  $B8BC: 0B 31     ANC #$31
  $B8BE: 02        ???
  $B8BF: 65 3A     ADC $3a
  $B8C1: E9 83     SBC #$83
  $B8C3: 48        PHA
  $B8C4: A8        TAY
  $B8C5: 22        ???
  $B8C6: 0C 53 01  NOP $0153
  $B8C9: 4F 12 00  SRE $0012
  $B8CC: 18        CLC
  $B8CD: 3A        NOP
  $B8CE: 95 9D     STA $9d,X
  $B8D0: AD D5 AD  LDA $add5
  $B8D3: 22        ???
  $B8D4: 3A        NOP
  $B8D5: 0C 53 05  NOP $0553
  $B8D8: 2E 0F 14  ROL $140f
  $B8DB: 00        BRK
  $B8DC: 3D 22 22  AND $2222,X
  $B8DF: E7 F8     ISB $f8
  $B8E1: 62        ???
  $B8E2: 22        ???
  $B8E3: F3 F8     ISB ($f8),Y
  $B8E5: 00        BRK
  $B8E6: 00        BRK
  $B8E7: 0B 3C     ANC #$3c
  $B8E9: 00        BRK
  $B8EA: 3A        NOP
  $B8EB: 05 0F     ORA $0f
  $B8ED: 50 27     BVC $b916
  $B8EF: 0A        ASL A
  $B8F0: 2D 36 3D  AND $3d36
  $B8F3: 0D 3C 04  ORA $043c
  $B8F6: 3A        NOP
  $B8F7: 11 63     ORA ($63),Y
  $B8F9: 0A        ASL A
  $B8FA: 3A        NOP
  $B8FB: 5D 02 0B  EOR $0b02,X
  $B8FE: 0F 37 3D  SLO $3d37
  $B901: 22        ???
  $B902: 22        ???
  $B903: 07 F9     SLO $f9
  $B905: 00        BRK
  $B906: 00        BRK
  $B907: 0E 3C 01  ASL $013c
  $B90A: 27 51     RLA $51
  $B90C: 10 4F     BPL $b95d
  $B90E: 3A        NOP
  $B90F: 1F 2E 11  SLO $112e,X
  $B912: 00        BRK
  $B913: 28        PLP
  $B914: 58        CLI
  $B915: 3D 22 22  AND $2222,X
  $B918: 24 F9     BIT $f9
  $B91A: 62        ???
  $B91B: 22        ???
  $B91C: 35 F9     AND $f9,X
  $B91E: A3 22     LAX ($22,X)
  $B920: 47 F9     SRE $f9
  $B922: 00        BRK
  $B923: 00        BRK
  $B924: 10 3C     BPL $b962
  $B926: 00        BRK
  $B927: 3A        NOP
  $B928: 1F 0A 06  SLO $060a,X
  $B92B: 07 2D     SLO $2d
  $B92D: 18        CLC
  $B92E: 04 13     NOP $13
  $B930: 02        ???
  $B931: 0A        ASL A
  $B932: 2D 36 3D  AND $3d36
  $B935: 11 3C     ORA ($3c),Y
  $B937: 23 00     RLA ($00,X)
  $B939: 3A        NOP
  $B93A: 52        ???
  $B93B: 2D 06 0E  AND $0e06
  $B93E: 02        ???
  $B93F: 59 17 3A  EOR $3a17,Y
  $B942: 0F 2A 02  SLO $022a
  $B945: 15 19     ORA $19,X
  $B947: 07 00     SLO $00
  $B949: 2E 0F 05  ROL $050f
  $B94C: 17 37     SLO $37,X
  $B94E: 3D 22 22  AND $2222,X
  $B951: 55 F9     EOR $f9,X
  $B953: 00        BRK
  $B954: 00        BRK
  $B955: 0A        ASL A
  $B956: 3C 0A 0C  NOP $0c0a,X
  $B959: 4F 15 5C  SRE $5c15
  $B95C: 05 01     ORA $01
  $B95E: 23 3D     RLA ($3d,X)
  $B960: 22        ???
  $B961: 22        ???
  $B962: 6A        ROR A
  $B963: F9 62 22  SBC $2262,Y
  $B966: 7F F9 00  RRA $00f9,X
  $B969: 00        BRK
  $B96A: 14 3C     NOP $3c,X
  $B96C: 17 B2     SLO $b2,X
  $B96E: 3A        NOP
  $B96F: 8C A2 82  STY $82a2
  $B972: E8        INX
  $B973: A7 63     LAX $63
  $B975: 0B 31     ANC #$31
  $B977: 3A        NOP
  $B978: 1F 15 01  SLO $0115,X
  $B97B: 2E 0F 37  ROL $370f
  $B97E: 3D 12 3C  AND $3c12,X
  $B981: 03 03     SLO ($03,X)
  $B983: 3A        NOP
  $B984: 92        ???
  $B985: 87 A2     SAX $a2
  $B987: A3 9E     LAX ($9e,X)
  $B989: 2E 12 3A  ROL $3a12
  $B98C: 0C 12 06  NOP $0612
  $B98F: 17 B2     SLO $b2,X
  $B991: 3D 22 22  AND $2222,X
  $B994: 98        TYA
  $B995: F9 00 00  SBC $0000,Y
  $B998: 12        ???
  $B999: 3C 14 4F  NOP $4f14,X
  $B99C: 01 05     ORA ($05,X)
  $B99E: 01 59     ORA ($59,X)
  $B9A0: 2D 4F 3A  AND $3a4f
  $B9A3: 11 5B     ORA ($5b),Y
  $B9A5: 01 12     ORA ($12,X)
  $B9A7: 01 28     ORA ($28,X)
  $B9A9: 14 3D     NOP $3d,X
  $B9AB: E2 21     NOP #$21
  $B9AD: AD F6 22  LDA $22f6
  $B9B0: 22        ???
  $B9B1: BD F9 63  LDA $63f9,X
  $B9B4: 22        ???
  $B9B5: D1 F9     CMP ($f9),Y
  $B9B7: A3 22     LAX ($22,X)
  $B9B9: E4 F9     CPX $f9
  $B9BB: 00        BRK
  $B9BC: 00        BRK
  $B9BD: 13 3C     SLO ($3c),Y
  $B9BF: 2D 3A 09  AND $093a
  $B9C2: 29 05     AND #$05
  $B9C4: 3A        NOP
  $B9C5: 0E 02 01  ASL $0102
  $B9C8: 03 63     SLO ($63,X)
  $B9CA: 8C 8F D5  STY $d58f
  $B9CD: 80 A0     NOP #$a0
  $B9CF: 15 19     ORA $19,X
  $B9D1: 12        ???
  $B9D2: 09 18     ORA #$18
  $B9D4: 90 88     BCC $b95e
  $B9D6: AE 93 4F  LDX $4f93
  $B9D9: 14 01     NOP $01,X
  $B9DB: 13 3A     SLO ($3a),Y
  $B9DD: 19 01 29  ORA $2901,Y
  $B9E0: 14 01     NOP $01,X
  $B9E2: 2D 59 09  AND $0959
  $B9E5: 04 1E     NOP $1e
  $B9E7: 03 15     SLO ($15,X)
  $B9E9: 22        ???
  $B9EA: 23 2A     RLA ($2a,X)
  $B9EC: 02        ???
  $B9ED: 3D E2 21  AND $21e2,X
  $B9F0: F8        SED
  $B9F1: F9 22 22  SBC $2222,Y
  $B9F4: FE F9 00  INC $00f9,X
  $B9F7: 00        BRK
  $B9F8: 05 04     ORA $04
  $B9FA: 2E 0A 2D  ROL $2d0a
  $B9FD: 3B 11 3C  RLA $3c11,Y
  $BA00: 90 88     BCC $b98a
  $BA02: AE 93 4F  LDX $4f93
  $BA05: 14 01     NOP $01,X
  $BA07: 13 3A     SLO ($3a),Y
  $BA09: 19 01 29  ORA $2901,Y
  $BA0C: 14 01     NOP $01,X
  $BA0E: 25 3D     AND $3d
  $BA10: E2 21     NOP #$21
  $BA12: B7 F7     LAX $f7,Y
  $BA14: 22        ???
  $BA15: 22        ???
  $BA16: 1A        NOP
  $BA17: FA        NOP
  $BA18: 00        BRK
  $BA19: 00        BRK
  $BA1A: 0F 3C D2  SLO $d23c
  $BA1D: 48        PHA
  $BA1E: D5 B0     CMP $b0,X
  $BA20: 91 19     STA ($19),Y
  $BA22: 3A        NOP
  $BA23: 63 07     RRA ($07,X)
  $BA25: 19 11 59  ORA $5911,Y
  $BA28: 36 3D     ROL $3d,X
  $BA2A: 22        ???
  $BA2B: 22        ???
  $BA2C: 30 FA     BMI $ba28
  $BA2E: 00        BRK
  $BA2F: 00        BRK
  $BA30: 11 3C     ORA ($3c),Y
  $BA32: 0B 05     ANC #$05
  $BA34: 0F 4F 14  SLO $144f
  $BA37: 01 3A     ORA ($3a,X)
  $BA39: 1D 05 2C  ORA $2c05,X
  $BA3C: 00        BRK
  $BA3D: 0F 2A 02  SLO $022a
  $BA40: 35 3D     AND $3d,X
  $BA42: 22        ???
  $BA43: 22        ???
  $BA44: 4C FA 63  JMP $63fa
  $BA47: 22        ???
  $BA48: 5E FA 00  LSR $00fa,X
  $BA4B: 00        BRK
  $BA4C: 11 3C     ORA ($3c),Y
  $BA4E: 0E 02 59  ASL $5902
  $BA51: 36 90     ROL $90,X
  $BA53: 88        DEY
  $BA54: AE 93 2C  LDX $2c93
  $BA57: 22        ???
  $BA58: 26 2E     ROL $2e
  $BA5A: 0F 2D 59  SLO $592d
  $BA5D: 36 0E     ROL $0e,X
  $BA5F: 09 29     ORA #$29
  $BA61: 5C 3A 14  NOP $143a,X
  $BA64: 05 15     ORA $15
  $BA66: 19 01 29  ORA $2901,Y
  $BA69: 28        PLP
  $BA6A: 58        CLI
  $BA6B: 36 3D     ROL $3d,X
  $BA6D: 22        ???
  $BA6E: 22        ???
  $BA6F: 77 FA     RRA $fa,X
  $BA71: 63 22     RRA ($22,X)
  $BA73: 88        DEY
  $BA74: FA        NOP
  $BA75: 00        BRK
  $BA76: 00        BRK
  $BA77: 10 3C     BPL $bab5
  $BA79: 01 0F     ORA ($0f,X)
  $BA7B: 36 00     ROL $00,X
  $BA7D: 18        CLC
  $BA7E: 3F 3E 63  RLA $633e,X
  $BA81: 2D 4F E9  AND $e94f
  $BA84: 83 48     SAX ($48,X)
  $BA86: A8        TAY
  $BA87: 59 06 E9  EOR $e906,Y
  $BA8A: 83 48     SAX ($48,X)
  $BA8C: A8        TAY
  $BA8D: 36 3D     ROL $3d,X
  $BA8F: E2 21     NOP #$21
  $BA91: A5 FA     LDA $fa
  $BA93: 22        ???
  $BA94: 22        ???
  $BA95: AB FA     ATX #$fa
  $BA97: 63 22     RRA ($22,X)
  $BA99: BE FA A3  LDX $a3fa,Y
  $BA9C: 22        ???
  $BA9D: CF FA E3  DCP $e3fa
  $BAA0: 22        ???
  $BAA1: E0 FA     CPX #$fa
  $BAA3: 00        BRK
  $BAA4: 00        BRK
  $BAA5: 05 E9     ORA $e9
  $BAA7: 83 48     SAX ($48,X)
  $BAA9: A8        TAY
  $BAAA: 3B 12 3C  RLA $3c12,Y
  $BAAD: 09 18     ORA #$18
  $BAAF: 84 A9     STY $a9
  $BAB1: 13 3A     SLO ($3a),Y
  $BAB3: 53 05     SRE ($05),Y
  $BAB5: 07 18     SLO $18
  $BAB7: 0B 31     ANC #$31
  $BAB9: 02        ???
  $BABA: 65 2C     ADC $2c
  $BABC: 0B 0F     ANC #$0f
  $BABE: 10 00     BPL $bac0
  $BAC0: 01 11     ORA ($11,X)
  $BAC2: 18        CLC
  $BAC3: 92        ???
  $BAC4: 87 95     SAX $95
  $BAC6: AE 87 19  LDX $1987
  $BAC9: 3A        NOP
  $BACA: 1D 2D 22  ORA $222d,X
  $BACD: 18        CLC
  $BACE: 59 10 08  EOR $0810,Y
  $BAD1: 2E 10 2F  ROL $2f10
  $BAD4: 07 19     SLO $19
  $BAD6: 3A        NOP
  $BAD7: 7D A4 48  ADC $48a4,X
  $BADA: 8C 0F 01  STY $010f
  $BADD: 05 01     ORA $01
  $BADF: 5C 0D 11  NOP $110d,X
  $BAE2: 08        PHP
  $BAE3: 0A        ASL A
  $BAE4: 0D 12 07  ORA $0712
  $BAE7: 29 3A     AND #$3a
  $BAE9: 11 63     ORA ($63),Y
  $BAEB: 0A        ASL A
  $BAEC: 36 3D     ROL $3d,X
  $BAEE: E2 21     NOP #$21
  $BAF0: A5 FA     LDA $fa
  $BAF2: 22        ???
  $BAF3: 22        ???
  $BAF4: FC FA 63  NOP $63fa,X
  $BAF7: 22        ???
  $BAF8: 0A        ASL A
  $BAF9: FB 00 00  ISB $0000,Y
  $BAFC: 0D 3C 04  ORA $043c
  $BAFF: 29 18     AND #$18
  $BB01: 01 03     ORA ($03,X)
  $BB03: 19 3A 05  ORA $053a,Y
  $BB06: 17 22     SLO $22,X
  $BB08: 10 59     BPL $bb63
  $BB0A: 0E 11 63  ASL $6311
  $BB0D: 0A        ASL A
  $BB0E: 3A        NOP
  $BB0F: 05 17     ORA $17
  $BB11: 22        ???
  $BB12: 10 19     BPL $bb2d
  $BB14: 3A        NOP
  $BB15: 01 01     ORA ($01,X)
  $BB17: 58        CLI
  $BB18: 3D 22 22  AND $2222,X
  $BB1B: 2F FB 63  RLA $63fb
  $BB1E: 22        ???
  $BB1F: 36 FB     ROL $fb,X
  $BB21: A3 22     LAX ($22,X)
  $BB23: 45 FB     EOR $fb
  $BB25: E7 22     ISB $22
  $BB27: 59 FB 24  EOR $24fb,Y
  $BB2A: 23 65     RLA ($65,X)
  $BB2C: FB 00 00  ISB $0000,Y
  $BB2F: 06 3C     ASL $3c
  $BB31: 09 2D     ORA #$2d
  $BB33: 15 10     ORA $10,X
  $BB35: 19 0E E9  ORA $e90e,Y
  $BB38: 83 48     SAX ($48,X)
  $BB3A: A8        TAY
  $BB3B: 3A        NOP
  $BB3C: 9D AE 93  STA $93ae,X
  $BB3F: A6 81     LDX $81
  $BB41: AD 5C 0C  LDA $0c5c
  $BB44: 3D 13 09  AND $0913,X
  $BB47: 09 15     ORA #$15
  $BB49: 3A        NOP
  $BB4A: 5C 2D 2B  NOP $2b2d,X
  $BB4D: 3A        NOP
  $BB4E: 0C 28 13  NOP $1328
  $BB51: 01 01     ORA ($01,X)
  $BB53: 09 13     ORA #$13
  $BB55: 00        BRK
  $BB56: 28        PLP
  $BB57: 58        CLI
  $BB58: 48        PHA
  $BB59: 0B 3E     ANC #$3e
  $BB5B: 41 48     EOR ($48,X)
  $BB5D: 40        RTI
  $BB5E: 43 44     SRE ($44,X)
  $BB60: 48        PHA
  $BB61: 40        RTI
  $BB62: 43 40     SRE ($40,X)
  $BB64: 43 0A     SRE ($0a,X)
  $BB66: 55 2F     EOR $2f,X
  $BB68: 97 48     SAX $48,Y
  $BB6A: 3A        NOP
  $BB6B: E3 81     ISB ($81,X)
  $BB6D: E3 81     ISB ($81,X)
  $BB6F: 36 22     ROL $22,X
  $BB71: 22        ???
  $BB72: 76 FB     ROR $fb,X
  $BB74: 00        BRK
  $BB75: 00        BRK
  $BB76: 06 3C     ASL $3c
  $BB78: 03 2E     SLO ($2e,X)
  $BB7A: 36 36     ROL $36,X
  $BB7C: 3D 22 22  AND $2222,X
  $BB7F: 87 FB     SAX $fb
  $BB81: 82 22     NOP #$22
  $BB83: 91 FB     STA ($fb),Y
  $BB85: 00        BRK
  $BB86: 00        BRK
  $BB87: 09 3C     ORA #$3c
  $BB89: 1F 0A 06  SLO $060a,X
  $BB8C: 07 2D     SLO $2d
  $BB8E: 36 36     ROL $36,X
  $BB90: 3D 09 3C  AND $3c09,X
  $BB93: 11 63     ORA ($63),Y
  $BB95: 0A        ASL A
  $BB96: 07 2D     SLO $2d
  $BB98: 36 36     ROL $36,X
  $BB9A: 3D 22 22  AND $2222,X
  $BB9D: A5 FB     LDA $fb
  $BB9F: 82 22     NOP #$22
  $BBA1: B7 FB     LAX $fb,Y
  $BBA3: 00        BRK
  $BBA4: 00        BRK
  $BBA5: 11 3C     ORA ($3c),Y
  $BBA7: 1E 10 4F  ASL $4f10,X
  $BBAA: 01 14     ORA ($14,X)
  $BBAC: 01 36     ORA ($36,X)
  $BBAE: 3A        NOP
  $BBAF: 1F 0A 06  SLO $060a,X
  $BBB2: 07 2D     SLO $2d
  $BBB4: 59 36 3D  EOR $3d36,Y
  $BBB7: 08        PHP
  $BBB8: 3C 80 AE  NOP $ae80,X
  $BBBB: 99 99 99  STA $9999,Y
  $BBBE: 35 3D     AND $3d,X
  $BBC0: 24 22     BIT $22
  $BBC2: CA        DEX
  $BBC3: FB 85 22  ISB $2285,Y
  $BBC6: D3 FB     DCP ($fb),Y
  $BBC8: 00        BRK
  $BBC9: 00        BRK
  $BBCA: 08        PHP
  $BBCB: 3C 11 63  NOP $6311,X
  $BBCE: 0A        ASL A
  $BBCF: 13 1F     SLO ($1f),Y
  $BBD1: 0A        ASL A
  $BBD2: 06 10     ASL $10
  $BBD4: 41 17     EOR ($17,X)
  $BBD6: 2D 65 27  AND $2765
  $BBD9: 18        CLC
  $BBDA: 3A        NOP
  $BBDB: 0A        ASL A
  $BBDC: 01 05     ORA ($05,X)
  $BBDE: 01 5C     ORA ($5c,X)
  $BBE0: 00        BRK
  $BBE1: 2E 0F 3D  ROL $3d0f
  $BBE4: E2 21     NOP #$21
  $BBE6: 28        PLP
  $BBE7: F6 22     INC $22,X
  $BBE9: 22        ???
  $BBEA: F2        ???
  $BBEB: FB 63 22  ISB $2263,Y
  $BBEE: 05 FC     ORA $fc
  $BBF0: 00        BRK
  $BBF1: 00        BRK
  $BBF2: 12        ???
  $BBF3: 3C 09 18  NOP $1809,X
  $BBF6: 1C 2D 18  NOP $182d,X
  $BBF9: 3A        NOP
  $BBFA: 07 0A     SLO $0a
  $BBFC: 8A        TXA
  $BBFD: AE 85 48  LDX $4885
  $BC00: 14 05     NOP $05,X
  $BC02: 1E 55 2F  ASL $2f55,X
  $BC05: 10 10     BPL $bc17
  $BC07: 31 2E     AND ($2e),Y
  $BC09: 13 0B     SLO ($0b),Y
  $BC0B: 0F 3A 24  SLO $243a
  $BC0E: 02        ???
  $BC0F: 21 01     AND ($01,X)
  $BC11: 55 2D     EOR $2d,X
  $BC13: 59 17 3D  EOR $3d17,Y
  $BC16: 22        ???
  $BC17: 22        ???
  $BC18: 1C FC 00  NOP $00fc,X
  $BC1B: 00        BRK
  $BC1C: 0C 3C 2D  NOP $2d3c
  $BC1F: 48        PHA
  $BC20: 3A        NOP
  $BC21: 01 01     ORA ($01,X)
  $BC23: 14 4F     NOP $4f,X
  $BC25: 21 59     AND ($59,X)
  $BC27: 36 3D     ROL $3d,X
  $BC29: 22        ???
  $BC2A: 22        ???
  $BC2B: 33 FC     RLA ($fc),Y
  $BC2D: 63 22     RRA ($22,X)
  $BC2F: 42        ???
  $BC30: FC 00 00  NOP $0000,X
  $BC33: 0E 3C 1F  ASL $1f3c
  $BC36: 0A        ASL A
  $BC37: 06 07     ASL $07
  $BC39: 2D 3A 1E  AND $1e3a
  $BC3C: 2E 12 12  ROL $1212
  $BC3F: 07 29     SLO $29
  $BC41: 36 0F     ROL $0f,X
  $BC43: 06 2E     ASL $2e
  $BC45: 13 3A     SLO ($3a),Y
  $BC47: 0A        ASL A
  $BC48: 4F 0B 59  SRE $590b
  $BC4B: 0B 12     ANC #$12
  $BC4D: 1F 0D 28  SLO $280d,X
  $BC50: 36 3D     ROL $3d,X
  $BC52: 22        ???
  $BC53: 22        ???
  $BC54: 58        CLI
  $BC55: FC 00 00  NOP $0000,X
  $BC58: 11 3C     ORA ($3c),Y
  $BC5A: 01 08     ORA ($08,X)
  $BC5C: 14 01     NOP $01,X
  $BC5E: 36 3A     ROL $3a,X
  $BC60: 0B 00     ANC #$00
  $BC62: 01 18     ORA ($18,X)
  $BC64: 55 05     EOR $05,X
  $BC66: 2D 59 36  AND $3659
  $BC69: 3D E2 21  AND $21e2,X
  $BC6C: 7C FC 22  NOP $22fc,X
  $BC6F: 22        ???
  $BC70: 81 FC     STA ($fc,X)
  $BC72: 63 22     RRA ($22,X)
  $BC74: 90 FC     BCC $bc72
  $BC76: A3 22     LAX ($22,X)
  $BC78: A0 FC     LDY #$fc
  $BC7A: 00        BRK
  $BC7B: 00        BRK
  $BC7C: 04 04     NOP $04
  $BC7E: 2D 14 3B  AND $3b14
  $BC81: 0E 3C 00  ASL $003c
  $BC84: 18        CLC
  $BC85: 85 AB     STA $ab
  $BC87: 81 81     STA ($81,X)
  $BC89: 67 02     RRA $02
  $BC8B: 23 18     RLA ($18,X)
  $BC8D: 09 13     ORA #$13
  $BC8F: 17 0F     SLO $0f,X
  $BC91: 05 29     ORA $29
  $BC93: 14 26     NOP $26,X
  $BC95: 3A        NOP
  $BC96: 22        ???
  $BC97: 02        ???
  $BC98: 0E 2A 0E  ASL $0e2a
  $BC9B: 2A        ROL A
  $BC9C: 3A        NOP
  $BC9D: 09 09     ORA #$09
  $BC9F: 15 08     ORA $08,X
  $BCA1: 07 28     SLO $28
  $BCA3: 13 04     SLO ($04),Y
  $BCA5: 22        ???
  $BCA6: 02        ???
  $BCA7: 2B 3D     ANC #$3d
  $BCA9: E2 21     NOP #$21
  $BCAB: 7C FC 22  NOP $22fc,X
  $BCAE: 22        ???
  $BCAF: BB FC 63  LAS $63fc,Y
  $BCB2: 22        ???
  $BCB3: CD FC A3  CMP $a3fc
  $BCB6: 22        ???
  $BCB7: DC FC 00  NOP $00fc,X
  $BCBA: 00        BRK
  $BCBB: 11 3C     ORA ($3c),Y
  $BCBD: E9 83     SBC #$83
  $BCBF: 48        PHA
  $BCC0: A8        TAY
  $BCC1: 3A        NOP
  $BCC2: 00        BRK
  $BCC3: 00        BRK
  $BCC4: 3A        NOP
  $BCC5: 2B 0F     ANC #$0f
  $BCC7: 0B 18     ANC #$18
  $BCC9: E9 83     SBC #$83
  $BCCB: 48        PHA
  $BCCC: A8        TAY
  $BCCD: 0E 5C 22  ASL $225c
  $BCD0: 3A        NOP
  $BCD1: 8B B0     XAA #$b0
  $BCD3: 94 81     STY $81,X
  $BCD5: D9 48 22  CMP $2248,Y
  $BCD8: 01 01     ORA ($01,X)
  $BCDA: 2B 17     ANC #$17
  $BCDC: 10 0E     BPL $bcec
  $BCDE: 29 15     AND #$15
  $BCE0: 8B B2     XAA #$b2
  $BCE2: 8C 8F 48  STY $488f
  $BCE5: 22        ???
  $BCE6: 3A        NOP
  $BCE7: 05 2B     ORA $2b
  $BCE9: 01 01     ORA ($01,X)
  $BCEB: 2B 3D     ANC #$3d
  $BCED: 23 22     RLA ($22,X)
  $BCEF: FB FC 84  ISB $84fc,Y
  $BCF2: 22        ???
  $BCF3: 06 FD     ASL $fd
  $BCF5: E4 22     CPX $22
  $BCF7: 11 FD     ORA ($fd),Y
  $BCF9: 00        BRK
  $BCFA: 00        BRK
  $BCFB: 0A        ASL A
  $BCFC: 1D 2D 13  ORA $132d,X
  $BCFF: 15 3A     ORA $3a,X
  $BD01: 23 21     RLA ($21,X)
  $BD03: 28        PLP
  $BD04: 18        CLC
  $BD05: 37 0A     RLA $0a,X
  $BD07: 23 21     RLA ($21,X)
  $BD09: 28        PLP
  $BD0A: 3A        NOP
  $BD0B: 3A        NOP
  $BD0C: 6D 48 67  ADC $6748
  $BD0F: 0F 2D 0A  SLO $0a2d
  $BD12: 11 5B     ORA ($5b),Y
  $BD14: 08        PHP
  $BD15: 28        PLP
  $BD16: 3A        NOP
  $BD17: 4B 48     ALR #$48
  $BD19: 67 0F     RRA $0f
  $BD1B: 2D 22 22  AND $2222
  $BD1E: 32        ???
  $BD1F: FD 63 22  SBC $2263,X
  $BD22: 4B FD     ALR #$fd
  $BD24: A3 22     LAX ($22,X)
  $BD26: 65 FD     ADC $fd
  $BD28: E3 22     ISB ($22,X)
  $BD2A: 7D FD 23  ADC $23fd,X
  $BD2D: 23 96     RLA ($96,X)
  $BD2F: FD 00 00  SBC $0000,X
  $BD32: 18        CLC
  $BD33: 3C 9C 48  NOP $489c,X
  $BD36: 81 36     STA ($36,X)
  $BD38: 3A        NOP
  $BD39: 06 31     ASL $31
  $BD3B: 02        ???
  $BD3C: 22        ???
  $BD3D: 52        ???
  $BD3E: 2D 06 15  AND $1506
  $BD41: 3A        NOP
  $BD42: DD A7 E5  CMP $e5a7,X
  $BD45: AE 12 28  LDX $2812
  $BD48: 05 01     ORA $01
  $BD4A: 36 19     ROL $19,X
  $BD4C: 57 2D     SRE $2d,X
  $BD4E: 09 07     ORA #$07
  $BD50: 10 30     BPL $bd82
  $BD52: 02        ???
  $BD53: 4F 07 0D  SRE $0d07
  $BD56: 01 8A     ORA ($8a,X)
  $BD58: AE 85 48  LDX $4885
  $BD5B: 0F 01 05  SLO $0501
  $BD5E: 01 19     ORA ($19,X)
  $BD60: 3A        NOP
  $BD61: 1E 22 14  ASL $1422,X
  $BD64: 07 17     SLO $17
  $BD66: 86 AE     STX $ae
  $BD68: 87 84     SAX $84
  $BD6A: 9B 59 B4  TAS $b459,Y
  $BD6D: 36 3A     ROL $3a,X
  $BD6F: 84 AE     STY $ae
  $BD71: 93 3A     ??? ($3a),Y
  $BD73: 55 2E     EOR $2e,X
  $BD75: 06 31     ASL $31
  $BD77: 02        ???
  $BD78: 19 3A 94  ORA $943a,Y
  $BD7B: D8        CLD
  $BD7C: 18        CLC
  $BD7D: 18        CLC
  $BD7E: 0B 30     ANC #$30
  $BD80: 2E 10 31  ROL $3110
  $BD83: 02        ???
  $BD84: 80 94     NOP #$94
  $BD86: 3A        NOP
  $BD87: 04 4F     NOP $4f
  $BD89: 01 4F     ORA ($4f,X)
  $BD8B: 3A        NOP
  $BD8C: 04 07     NOP $07
  $BD8E: 2E 10 2F  ROL $2f10
  $BD91: 02        ???
  $BD92: A5 48     LDA $48
  $BD94: D9 36 07  CMP $0736,Y
  $BD97: 39 90 85  AND $8590,Y
  $BD9A: A9 8F     LDA #$8f
  $BD9C: 35 3D     AND $3d,X
  $BD9E: E2 21     NOP #$21
  $BDA0: B8        CLV
  $BDA1: FD 23 22  SBC $2223,X
  $BDA4: CB FD     AXS #$fd
  $BDA6: 63 22     RRA ($22,X)
  $BDA8: E6 FD     INC $fd
  $BDAA: A3 22     LAX ($22,X)
  $BDAC: FF FD E3  ISB $e3fd,X
  $BDAF: 22        ???
  $BDB0: 14 FE     NOP $fe,X
  $BDB2: 23 23     RLA ($23,X)
  $BDB4: 28        PLP
  $BDB5: FE 00 00  INC $0000,X
  $BDB8: 12        ???
  $BDB9: 3C 0C 1F  NOP $1f0c,X
  $BDBC: 06 2E     ASL $2e
  $BDBE: 0F 0E 26  SLO $260e
  $BDC1: 4F 1A 2A  SRE $2a1a
  $BDC4: 4F 27 1E  SRE $1e27
  $BDC7: 0C 3A 09  NOP $093a
  $BDCA: 09 1A     ORA #$1a
  $BDCC: E8        INX
  $BDCD: A8        TAY
  $BDCE: 87 7F     SAX $7f
  $BDD0: DC 7F EA  NOP $ea7f,X
  $BDD3: A6 AD     LDX $ad
  $BDD5: 8C 8C 8F  STY $8f8c
  $BDD8: D5 80     CMP $80,X
  $BDDA: A0 35     LDY #$35
  $BDDC: 59 01 3F  EOR $3f01,Y
  $BDDF: 05 01     ORA $01
  $BDE1: 3A        NOP
  $BDE2: 9B A6 AD  TAS $ada6,Y
  $BDE5: 8C 18 09  STY $0918
  $BDE8: 07 0A     SLO $0a
  $BDEA: 01 7D     ORA ($7d,X)
  $BDEC: A4 48     LDY $48
  $BDEE: 8C 0F 01  STY $010f
  $BDF1: 05 01     ORA $01
  $BDF3: 3A        NOP
  $BDF4: 01 25     ORA ($25,X)
  $BDF6: 01 25     ORA ($25,X)
  $BDF8: 05 01     ORA $01
  $BDFA: 1E 07 5C  ASL $5c07,X
  $BDFD: 0C 36 14  NOP $1436
  $BE00: 19 0F 0B  ORA $0b0f,Y
  $BE03: 12        ???
  $BE04: 3A        NOP
  $BE05: 24 02     BIT $02
  $BE07: 0B 31     ANC #$31
  $BE09: 02        ???
  $BE0A: 19 3A 5D  ORA $5d3a,Y
  $BE0D: 18        CLC
  $BE0E: 90 48     BCC $be58
  $BE10: A0 05     LDY #$05
  $BE12: 36 37     ROL $37,X
  $BE14: 13 05     SLO ($05),Y
  $BE16: 01 0D     ORA ($0d,X)
  $BE18: 11 19     ORA ($19),Y
  $BE1A: 3A        NOP
  $BE1B: 15 1D     ORA $1d,X
  $BE1D: 2D 05 26  AND $2605
  $BE20: 18        CLC
  $BE21: 3A        NOP
  $BE22: 5C 05 0D  NOP $0d05,X
  $BE25: 50 80     BVC $bda7
  $BE27: 94 14     STY $14,X
  $BE29: 90 AF     BCC $bdda
  $BE2B: 48        PHA
  $BE2C: A7 48     LAX $48
  $BE2E: 0F 05 19  SLO $1905
  $BE31: 0B 4F     ANC #$4f
  $BE33: 3A        NOP
  $BE34: 04 04     NOP $04
  $BE36: 07 27     SLO $27
  $BE38: 0B 1E     ANC #$1e
  $BE3A: 0C 35 3D  NOP $3d35
  $BE3D: E3 21     ISB ($21,X)
  $BE3F: 28        PLP
  $BE40: F6 22     INC $22,X
  $BE42: 22        ???
  $BE43: 4B FE     ALR #$fe
  $BE45: 63 22     RRA ($22,X)
  $BE47: 5C FE 00  NOP $00fe,X
  $BE4A: 00        BRK
  $BE4B: 10 3C     BPL $be89
  $BE4D: 9F 8A 86  ??? $868a,Y
  $BE50: 13 01     SLO ($01),Y
  $BE52: 02        ???
  $BE53: 3A        NOP
  $BE54: 03 05     SLO ($05,X)
  $BE56: 06 14     ASL $14
  $BE58: 26 3A     ROL $3a
  $BE5A: 25 07     AND $07
  $BE5C: 10 64     BPL $bec2
  $BE5E: 55 30     EOR $30,X
  $BE60: 11 05     ORA ($05),Y
  $BE62: 2D 5C 3A  AND $3a5c
  $BE65: 1F 05 08  SLO $0805,X
  $BE68: 28        PLP
  $BE69: 08        PHP
  $BE6A: 5D 39 3D  EOR $3d39,X
  $BE6D: 7D FE 82  ADC $82fe,X
  $BE70: FE 88 FE  INC $fe88,X
  $BE73: 8F FE 96  SAX $96fe
  $BE76: FE 9D FE  INC $fe9d,X
  $BE79: A5 FE     LDA $fe
  $BE7B: AC FE 04  LDY $04fe
  $BE7E: 00        BRK
  $BE7F: 02        ???
  $BE80: 05 06     ORA $06
  $BE82: 05 81     ORA $81
  $BE84: 00        BRK
  $BE85: 03 05     SLO ($05,X)
  $BE87: 06 06     ASL $06
  $BE89: 81 02     STA ($02,X)
  $BE8B: 00        BRK
  $BE8C: 04 05     NOP $05
  $BE8E: 06 06     ASL $06
  $BE90: 81 02     STA ($02,X)
  $BE92: 03 00     SLO ($00,X)
  $BE94: 05 06     ORA $06
  $BE96: 06 81     ASL $81
  $BE98: 02        ???
  $BE99: 03 04     SLO ($04,X)
  $BE9B: 00        BRK
  $BE9C: 06 07     ASL $07
  $BE9E: 81 02     STA ($02,X)
  $BEA0: 03 04     SLO ($04,X)
  $BEA2: 05 00     ORA $00
  $BEA4: 07 06     SLO $06
  $BEA6: 81 02     STA ($02,X)
  $BEA8: 03 04     SLO ($04,X)
  $BEAA: 05 06     ORA $06
  $BEAC: 06 81     ASL $81
  $BEAE: 82 83     NOP #$83
  $BEB0: 84 85     STY $85
  $BEB2: 06 C3     ASL $c3
  $BEB4: FE C5 FE  INC $fec5,X
  $BEB7: C9 FE     CMP #$fe
  $BEB9: CD FE D1  CMP $d1fe
  $BEBC: FE D3 FE  INC $fed3,X
  $BEBF: D7 FE     DCP $fe,X
  $BEC1: D9 FE 36  CMP $36fe,Y
  $BEC4: 14 1B     NOP $1b,X
  $BEC6: 1B 15 16  SLO $1615,Y
  $BEC9: 1B 1B 17  SLO $171b,Y
  $BECC: 18        CLC
  $BECD: 1B 1B 19  SLO $191b,Y
  $BED0: 1A        NOP
  $BED1: 3F 1C 1B  RLA $1b1c,X
  $BED4: 1B 1D 1E  SLO $1e1d,Y
  $BED7: 3A        NOP
  $BED8: 3B 1B 1B  RLA $1b1b,Y
  $BEDB: 2F 30 ED  RLA $ed30
  $BEDE: FE EE FE  INC $feee,X
  $BEE1: EF FE F0  ISB $f0fe
  $BEE4: FE F1 FE  INC $fef1,X
  $BEE7: F2        ???
  $BEE8: FE F3 FE  INC $fef3,X
  $BEEB: F4 FE     NOP $fe,X
  $BEED: 80 21     NOP #$21
  $BEEF: 28        PLP
  $BEF0: 23 24     RLA ($24,X)
  $BEF2: 25 37     AND $37
  $BEF4: 2E 05 FF  ROL $ff05
  $BEF7: 07 FF     SLO $ff
  $BEF9: 09 FF     ORA #$ff
  $BEFB: 0B FF     ANC #$ff
  $BEFD: 0D FF 0F  ORA $0fff
  $BF00: FF 11 FF  ISB $ff11,X
  $BF03: 13 FF     SLO ($ff),Y
  $BF05: 0B 00     ANC #$00
  $BF07: 02        ???
  $BF08: 00        BRK
  $BF09: 03 01     SLO ($01,X)
  $BF0B: 04 00     NOP $00
  $BF0D: 05 00     ORA $00
  $BF0F: 07 00     SLO $00
  $BF11: 08        PHP
  $BF12: 00        BRK
  $BF13: 06 00     ASL $00
  $BF15: 25 FF     AND $ff
  $BF17: 26 FF     ROL $ff
  $BF19: 29 FF     AND #$ff
  $BF1B: 2C FF 2F  BIT $2fff
  $BF1E: FF 32 FF  ISB $ff32,X
  $BF21: 35 FF     AND $ff,X
  $BF23: 38        SEC
  $BF24: FF 00 44  ISB $4400,X
  $BF27: 73 27     RRA ($27),Y
  $BF29: 35 80     AND $80,X
  $BF2B: 62        ???
  $BF2C: 46 85     LSR $85
  $BF2E: A9 3D     LDA #$3d
  $BF30: 64 2A     NOP $2a
  $BF32: 3A        NOP
  $BF33: 8F 2B 21  SAX $212b
  $BF36: 8C 26 3A  STY $3a26
  $BF39: 7A        NOP
  $BF3A: 31 00     AND ($00),Y
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