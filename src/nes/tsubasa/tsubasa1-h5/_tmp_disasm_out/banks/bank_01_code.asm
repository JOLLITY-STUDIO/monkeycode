; PRG Bank $01
; CPU Address Range: $8000 - $BFFF
; ROM Offset: $4000
; ============================================================

  $8000: 4C 15 C0  JMP $c015
  $8003: 4C 54 C4  JMP $c454
  $8006: 4C AA CA  JMP $caaa
  $8009: 4C FC C9  JMP $c9fc
  $800C: 4C D8 C6  JMP $c6d8
  $800F: 4C 6E 80  JMP $806e
  $8012: 4C 35 C5  JMP $c535
  $8015: AD CB 03  LDA $03cb
  $8018: F0 1C     BEQ $8036
  $801A: A9 10     LDA #$10
  $801C: 20 3E 80  JSR $803e
  $801F: F0 15     BEQ $8036
  $8021: AD CB 03  LDA $03cb
  $8024: C9 06     CMP #$06
  $8026: B0 0E     BCS $8036
  $8028: 20 20 80  JSR $8020
  $802B: 20 1D 80  JSR $801d
  $802E: 20 14 80  JSR $8014
  $8031: A9 05     LDA #$05
  $8033: 8D CB 03  STA $03cb
  $8036: A9 20     LDA #$20
  $8038: 20 3E 80  JSR $803e
  $803B: F0 08     BEQ $8045
  $803D: AD CF 03  LDA $03cf
  $8040: 49 01     EOR #$01
  $8042: 8D CF 03  STA $03cf
  $8045: AD CB 03  LDA $03cb
  $8048: 20 17 80  JSR $8017
  $804B: 5B C0 70  SRE $70c0,Y
  $804E: C0 A7     CPY #$a7
  $8050: C0 BE     CPY #$be
  $8052: C0 ED     CPY #$ed
  $8054: C0 06     CPY #$06
  $8056: C1 81     CMP ($81,X)
  $8058: C1 13     CMP ($13,X)
  $805A: C2 A9     NOP #$a9
  $805C: 00        BRK
  $805D: 85 7A     STA $7a
  $805F: A9 1E     LDA #$1e
  $8061: 85 1B     STA $1b
  $8063: A9 1F     LDA #$1f
  $8065: 85 1A     STA $1a
  $8067: A9 02     LDA #$02
  $8069: 20 59 80  JSR $8059
  $806C: EE CB 03  INC $03cb
  $806F: 60        RTS
  $8070: 20 20 80  JSR $8020
  $8073: 20 1D 80  JSR $801d
  $8076: A5 7A     LDA $7a
  $8078: 20 C2 C2  JSR $c2c2
  $807B: 20 6C C3  JSR $c36c
  $807E: 20 14 80  JSR $8014
  $8081: 20 3B 80  JSR $803b
  $8084: A9 00     LDA #$00
  $8086: 85 79     STA $79
  $8088: 20 83 C3  JSR $c383
  $808B: A5 79     LDA $79
  $808D: 18        CLC
  $808E: 69 10     ADC #$10
  $8090: 85 79     STA $79
  $8092: C9 40     CMP #$40
  $8094: D0 F2     BNE $8088
  $8096: A9 20     LDA #$20
  $8098: 85 79     STA $79
  $809A: A5 7A     LDA $7a
  $809C: 85 1E     STA $1e
  $809E: A9 80     LDA #$80
  $80A0: 8D 1D 00  STA $001d
  $80A3: EE CB 03  INC $03cb
  $80A6: 60        RTS
  $80A7: A5 79     LDA $79
  $80A9: F0 03     BEQ $80ae
  $80AB: C6 79     DEC $79
  $80AD: 60        RTS
  $80AE: A5 1D     LDA $1d
  $80B0: F0 04     BEQ $80b6
  $80B2: 20 CE C3  JSR $c3ce
  $80B5: 60        RTS
  $80B6: A9 80     LDA #$80
  $80B8: 85 79     STA $79
  $80BA: EE CB 03  INC $03cb
  $80BD: 60        RTS
  $80BE: C6 79     DEC $79
  $80C0: A5 79     LDA $79
  $80C2: D0 28     BNE $80ec
  $80C4: A2 00     LDX #$00
  $80C6: A5 7A     LDA $7a
  $80C8: C9 04     CMP #$04
  $80CA: D0 01     BNE $80cd
  $80CC: E8        INX
  $80CD: 86 7B     STX $7b
  $80CF: A9 20     LDA #$20
  $80D1: 85 79     STA $79
  $80D3: 20 83 C3  JSR $c383
  $80D6: A5 79     LDA $79
  $80D8: 38        SEC
  $80D9: E9 10     SBC #$10
  $80DB: 85 79     STA $79
  $80DD: 10 F4     BPL $80d3
  $80DF: 20 6C C3  JSR $c36c
  $80E2: 20 3B 80  JSR $803b
  $80E5: A9 40     LDA #$40
  $80E7: 85 79     STA $79
  $80E9: EE CB 03  INC $03cb
  $80EC: 60        RTS
  $80ED: A5 79     LDA $79
  $80EF: F0 03     BEQ $80f4
  $80F1: C6 79     DEC $79
  $80F3: 60        RTS
  $80F4: E6 7A     INC $7a
  $80F6: A5 7A     LDA $7a
  $80F8: C9 05     CMP #$05
  $80FA: D0 04     BNE $8100
  $80FC: EE CB 03  INC $03cb
  $80FF: 60        RTS
  $8100: A9 01     LDA #$01
  $8102: 8D CB 03  STA $03cb
  $8105: 60        RTS
  $8106: A9 1A     LDA #$1a
  $8108: 0D CF 03  ORA $03cf
  $810B: 20 26 80  JSR $8026
  $810E: A5 19     LDA $19
  $8110: 29 FC     AND #$fc
  $8112: 85 19     STA $19
  $8114: AE CF 03  LDX $03cf
  $8117: E8        INX
  $8118: 8A        TXA
  $8119: 05 19     ORA $19
  $811B: 85 19     STA $19
  $811D: A9 05     LDA #$05
  $811F: 20 35 80  JSR $8035
  $8122: 20 05 80  JSR $8005
  $8125: A2 01     LDX #$01
  $8127: 86 7B     STX $7b
  $8129: CA        DEX
  $812A: 86 79     STX $79
  $812C: BD C8 C3  LDA $c3c8,X
  $812F: 9D D0 03  STA $03d0,X
  $8132: E8        INX
  $8133: E0 06     CPX #$06
  $8135: D0 F5     BNE $812c
  $8137: A5 79     LDA $79
  $8139: 0A        ASL A
  $813A: AA        TAX
  $813B: BD 18 D5  LDA $d518,X
  $813E: D0 05     BNE $8145
  $8140: DD 19 D5  CMP $d519,X
  $8143: F0 13     BEQ $8158
  $8145: 8D D3 03  STA $03d3
  $8148: BD 19 D5  LDA $d519,X
  $814B: 8D D4 03  STA $03d4
  $814E: 20 D0 03  JSR $03d0
  $8151: 20 05 80  JSR $8005
  $8154: E6 79     INC $79
  $8156: D0 DF     BNE $8137
  $8158: EE CB 03  INC $03cb
  $815B: A9 79     LDA #$79
  $815D: 8D 00 02  STA $0200
  $8160: A9 FF     LDA #$ff
  $8162: 8D 01 02  STA $0201
  $8165: A9 01     LDA #$01
  $8167: 8D 02 02  STA $0202
  $816A: A9 00     LDA #$00
  $816C: 8D 03 02  STA $0203
  $816F: A9 00     LDA #$00
  $8171: 85 79     STA $79
  $8173: A9 00     LDA #$00
  $8175: 85 16     STA $16
  $8177: AD CF 03  LDA $03cf
  $817A: F0 04     BEQ $8180
  $817C: A9 80     LDA #$80
  $817E: 85 17     STA $17
  $8180: 60        RTS
  $8181: E6 79     INC $79
  $8183: D0 0C     BNE $8191
  $8185: C6 7B     DEC $7b
  $8187: 10 08     BPL $8191
  $8189: A9 00     LDA #$00
  $818B: 8D CB 03  STA $03cb
  $818E: 85 7A     STA $7a
  $8190: 60        RTS
  $8191: A9 30     LDA #$30
  $8193: 20 3E 80  JSR $803e
  $8196: F0 1C     BEQ $81b4
  $8198: AE CF 03  LDX $03cf
  $819B: B5 16     LDA $16,X
  $819D: 08        PHP
  $819E: 20 47 C2  JSR $c247
  $81A1: 28        PLP
  $81A2: D0 10     BNE $81b4
  $81A4: A9 00     LDA #$00
  $81A6: 85 7A     STA $7a
  $81A8: 20 2C C2  JSR $c22c
  $81AB: A9 03     LDA #$03
  $81AD: 20 59 80  JSR $8059
  $81B0: EE CB 03  INC $03cb
  $81B3: 60        RTS
  $81B4: 2C 02 20  BIT $2002
  $81B7: 70 FB     BVS $81b4
  $81B9: 2C 02 20  BIT $2002
  $81BC: 50 FB     BVC $81b9
  $81BE: A9 21     LDA #$21
  $81C0: 8D 06 20  STA $2006
  $81C3: A9 E0     LDA #$e0
  $81C5: 8D 06 20  STA $2006
  $81C8: AD CF 03  LDA $03cf
  $81CB: F0 19     BEQ $81e6
  $81CD: AD 02 20  LDA $2002
  $81D0: A9 00     LDA #$00
  $81D2: 8D 05 20  STA $2005
  $81D5: 8D 05 20  STA $2005
  $81D8: A5 17     LDA $17
  $81DA: F0 36     BEQ $8212
  $81DC: A6 17     LDX $17
  $81DE: E8        INX
  $81DF: 86 17     STX $17
  $81E1: E0 F0     CPX #$f0
  $81E3: B0 2A     BCS $820f
  $81E5: 60        RTS
  $81E6: A5 19     LDA $19
  $81E8: 4A        LSR A
  $81E9: 90 27     BCC $8212
  $81EB: A5 16     LDA $16
  $81ED: 18        CLC
  $81EE: 69 06     ADC #$06
  $81F0: 85 16     STA $16
  $81F2: AE 02 20  LDX $2002
  $81F5: A2 90     LDX #$90
  $81F7: 8E 00 20  STX $2000
  $81FA: B0 0B     BCS $8207
  $81FC: 49 FF     EOR #$ff
  $81FE: 8D 05 20  STA $2005
  $8201: A9 00     LDA #$00
  $8203: 8D 05 20  STA $2005
  $8206: 60        RTS
  $8207: A9 00     LDA #$00
  $8209: 8D 05 20  STA $2005
  $820C: 8D 05 20  STA $2005
  $820F: 20 47 C2  JSR $c247
  $8212: 60        RTS
  $8213: A9 30     LDA #$30
  $8215: 20 3E 80  JSR $803e
  $8218: F0 11     BEQ $822b
  $821A: 29 10     AND #$10
  $821C: D0 0A     BNE $8228
  $821E: A5 7A     LDA $7a
  $8220: 49 01     EOR #$01
  $8222: 85 7A     STA $7a
  $8224: 20 2C C2  JSR $c22c
  $8227: 60        RTS
  $8228: EE CA 03  INC $03ca
  $822B: 60        RTS
  $822C: A9 80     LDA #$80
  $822E: A6 7A     LDX $7a
  $8230: F0 02     BEQ $8234
  $8232: A9 90     LDA #$90
  $8234: 8D A4 02  STA $02a4
  $8237: A9 36     LDA #$36
  $8239: 8D A5 02  STA $02a5
  $823C: A9 03     LDA #$03
  $823E: 8D A6 02  STA $02a6
  $8241: A9 50     LDA #$50
  $8243: 8D A7 02  STA $02a7
  $8246: 60        RTS
  $8247: A9 00     LDA #$00
  $8249: 85 17     STA $17
  $824B: 85 16     STA $16
  $824D: A5 19     LDA $19
  $824F: 29 FC     AND #$fc
  $8251: 85 19     STA $19
  $8253: A9 04     LDA #$04
  $8255: 20 59 C2  JSR $c259
  $8258: 60        RTS
  $8259: 18        CLC
  $825A: 20 BA C3  JSR $c3ba
  $825D: A9 00     LDA #$00
  $825F: A8        TAY
  $8260: 85 03     STA $03
  $8262: 85 07     STA $07
  $8264: A9 40     LDA #$40
  $8266: 85 05     STA $05
  $8268: A9 30     LDA #$30
  $826A: 85 04     STA $04
  $826C: B1 00     LDA ($00),Y
  $826E: 29 0F     AND #$0f
  $8270: D0 0D     BNE $827f
  $8272: C8        INY
  $8273: A9 08     LDA #$08
  $8275: 18        CLC
  $8276: 65 05     ADC $05
  $8278: 85 05     STA $05
  $827A: C9 C0     CMP #$c0
  $827C: 90 EA     BCC $8268
  $827E: 60        RTS
  $827F: 85 08     STA $08
  $8281: B1 00     LDA ($00),Y
  $8283: 29 F0     AND #$f0
  $8285: 4A        LSR A
  $8286: 18        CLC
  $8287: 65 04     ADC $04
  $8289: 85 04     STA $04
  $828B: C8        INY
  $828C: A5 07     LDA $07
  $828E: 0A        ASL A
  $828F: 0A        ASL A
  $8290: AA        TAX
  $8291: A5 04     LDA $04
  $8293: 38        SEC
  $8294: E9 01     SBC #$01
  $8296: 9D 04 02  STA $0204,X
  $8299: A5 05     LDA $05
  $829B: 9D 07 02  STA $0207,X
  $829E: B1 00     LDA ($00),Y
  $82A0: 9D 05 02  STA $0205,X
  $82A3: C8        INY
  $82A4: B1 00     LDA ($00),Y
  $82A6: 29 C3     AND #$c3
  $82A8: 9D 06 02  STA $0206,X
  $82AB: B1 00     LDA ($00),Y
  $82AD: 29 1C     AND #$1c
  $82AF: 18        CLC
  $82B0: 69 04     ADC #$04
  $82B2: 0A        ASL A
  $82B3: 65 04     ADC $04
  $82B5: 85 04     STA $04
  $82B7: E6 07     INC $07
  $82B9: C8        INY
  $82BA: C6 08     DEC $08
  $82BC: D0 CE     BNE $828c
  $82BE: 88        DEY
  $82BF: 4C 72 C2  JMP $c272
  $82C2: 38        SEC
  $82C3: 48        PHA
  $82C4: 20 BA C3  JSR $c3ba
  $82C7: 20 11 80  JSR $8011
  $82CA: A9 00     LDA #$00
  $82CC: 85 02     STA $02
  $82CE: 85 03     STA $03
  $82D0: A9 A8     LDA #$a8
  $82D2: 8D 3B 03  STA $033b
  $82D5: A9 20     LDA #$20
  $82D7: 8D 3C 03  STA $033c
  $82DA: A2 00     LDX #$00
  $82DC: A9 20     LDA #$20
  $82DE: 18        CLC
  $82DF: 6D 3B 03  ADC $033b
  $82E2: 8D 3B 03  STA $033b
  $82E5: 90 03     BCC $82ea
  $82E7: EE 3C 03  INC $033c
  $82EA: A4 02     LDY $02
  $82EC: B1 00     LDA ($00),Y
  $82EE: 10 15     BPL $8305
  $82F0: C9 FF     CMP #$ff
  $82F2: F0 11     BEQ $8305
  $82F4: 29 1F     AND #$1f
  $82F6: 85 04     STA $04
  $82F8: C8        INY
  $82F9: B1 00     LDA ($00),Y
  $82FB: 9D 3D 03  STA $033d,X
  $82FE: E8        INX
  $82FF: C6 04     DEC $04
  $8301: D0 F8     BNE $82fb
  $8303: F0 04     BEQ $8309
  $8305: 9D 3D 03  STA $033d,X
  $8308: E8        INX
  $8309: C8        INY
  $830A: 84 02     STY $02
  $830C: E0 10     CPX #$10
  $830E: D0 DA     BNE $82ea
  $8310: 8E 3A 03  STX $033a
  $8313: 8A        TXA
  $8314: 20 2F 80  JSR $802f
  $8317: 20 32 80  JSR $8032
  $831A: E6 03     INC $03
  $831C: A5 03     LDA $03
  $831E: C9 0E     CMP #$0e
  $8320: D0 B8     BNE $82da
  $8322: A9 C2     LDA #$c2
  $8324: 8D 3B 03  STA $033b
  $8327: A9 23     LDA #$23
  $8329: 8D 3C 03  STA $033c
  $832C: A9 00     LDA #$00
  $832E: 8D 41 03  STA $0341
  $8331: 85 03     STA $03
  $8333: A9 08     LDA #$08
  $8335: 18        CLC
  $8336: 6D 3B 03  ADC $033b
  $8339: 8D 3B 03  STA $033b
  $833C: A4 02     LDY $02
  $833E: A2 00     LDX #$00
  $8340: B1 00     LDA ($00),Y
  $8342: 9D 3D 03  STA $033d,X
  $8345: C8        INY
  $8346: E8        INX
  $8347: E0 04     CPX #$04
  $8349: D0 F5     BNE $8340
  $834B: 84 02     STY $02
  $834D: A9 04     LDA #$04
  $834F: 8D 3A 03  STA $033a
  $8352: 20 2F 80  JSR $802f
  $8355: 20 32 80  JSR $8032
  $8358: E6 03     INC $03
  $835A: A5 03     LDA $03
  $835C: C9 04     CMP #$04
  $835E: D0 D3     BNE $8333
  $8360: A9 00     LDA #$00
  $8362: 8D 3A 03  STA $033a
  $8365: 8D 39 03  STA $0339
  $8368: 68        PLA
  $8369: 4C 59 C2  JMP $c259
  $836C: A2 00     LDX #$00
  $836E: A9 0F     LDA #$0f
  $8370: 9D 18 03  STA $0318,X
  $8373: E8        INX
  $8374: A5 7A     LDA $7a
  $8376: C9 04     CMP #$04
  $8378: D0 04     BNE $837e
  $837A: E0 10     CPX #$10
  $837C: F0 04     BEQ $8382
  $837E: E0 20     CPX #$20
  $8380: D0 EC     BNE $836e
  $8382: 60        RTS
  $8383: A5 7A     LDA $7a
  $8385: 20 38 80  JSR $8038
  $8388: A0 00     LDY #$00
  $838A: 98        TYA
  $838B: 29 03     AND #$03
  $838D: F0 15     BEQ $83a4
  $838F: B9 18 03  LDA $0318,Y
  $8392: 29 F0     AND #$f0
  $8394: C5 79     CMP $79
  $8396: F0 0C     BEQ $83a4
  $8398: 90 0A     BCC $83a4
  $839A: B9 18 03  LDA $0318,Y
  $839D: 29 0F     AND #$0f
  $839F: 05 79     ORA $79
  $83A1: 99 18 03  STA $0318,Y
  $83A4: A5 7B     LDA $7b
  $83A6: F0 04     BEQ $83ac
  $83A8: C0 10     CPY #$10
  $83AA: F0 05     BEQ $83b1
  $83AC: C8        INY
  $83AD: C0 20     CPY #$20
  $83AF: D0 D9     BNE $838a
  $83B1: A2 04     LDX #$04
  $83B3: 20 08 80  JSR $8008
  $83B6: 20 3B 80  JSR $803b
  $83B9: 60        RTS
  $83BA: 2A        ROL A
  $83BB: 0A        ASL A
  $83BC: AA        TAX
  $83BD: BD F3 D0  LDA $d0f3,X
  $83C0: 85 00     STA $00
  $83C2: BD F4 D0  LDA $d0f4,X
  $83C5: 85 01     STA $01
  $83C7: 60        RTS
  $83C8: 20 23 80  JSR $8023
  $83CB: 00        BRK
  $83CC: 00        BRK
  $83CD: 60        RTS
  $83CE: A5 1D     LDA $1d
  $83D0: D0 01     BNE $83d3
  $83D2: 60        RTS
  $83D3: 10 17     BPL $83ec
  $83D5: A5 1E     LDA $1e
  $83D7: 0A        ASL A
  $83D8: AA        TAX
  $83D9: BD 5E D0  LDA $d05e,X
  $83DC: 85 1F     STA $1f
  $83DE: BD 5F D0  LDA $d05f,X
  $83E1: 85 20     STA $20
  $83E3: A2 00     LDX #$00
  $83E5: 86 21     STX $21
  $83E7: 86 22     STX $22
  $83E9: E8        INX
  $83EA: 86 1D     STX $1d
  $83EC: C6 22     DEC $22
  $83EE: 10 63     BPL $8453
  $83F0: A9 04     LDA #$04
  $83F2: 85 22     STA $22
  $83F4: AE 39 03  LDX $0339
  $83F7: A9 01     LDA #$01
  $83F9: 9D 3A 03  STA $033a,X
  $83FC: 9D 3E 03  STA $033e,X
  $83FF: A5 21     LDA $21
  $8401: A0 01     LDY #$01
  $8403: 18        CLC
  $8404: 71 1F     ADC ($1f),Y
  $8406: 9D 3B 03  STA $033b,X
  $8409: 38        SEC
  $840A: E9 20     SBC #$20
  $840C: 9D 3F 03  STA $033f,X
  $840F: C8        INY
  $8410: B1 1F     LDA ($1f),Y
  $8412: 9D 3C 03  STA $033c,X
  $8415: E9 00     SBC #$00
  $8417: 9D 40 03  STA $0340,X
  $841A: A4 21     LDY $21
  $841C: C8        INY
  $841D: C8        INY
  $841E: C8        INY
  $841F: B1 1F     LDA ($1f),Y
  $8421: 20 29 80  JSR $8029
  $8424: 9D 3D 03  STA $033d,X
  $8427: 98        TYA
  $8428: 9D 41 03  STA $0341,X
  $842B: A9 05     LDA #$05
  $842D: 20 2F 80  JSR $802f
  $8430: E6 21     INC $21
  $8432: A0 00     LDY #$00
  $8434: B1 1F     LDA ($1f),Y
  $8436: C5 21     CMP $21
  $8438: D0 19     BNE $8453
  $843A: 18        CLC
  $843B: 69 03     ADC #$03
  $843D: A8        TAY
  $843E: B1 1F     LDA ($1f),Y
  $8440: D0 03     BNE $8445
  $8442: 85 1D     STA $1d
  $8444: 60        RTS
  $8445: A9 00     LDA #$00
  $8447: 85 21     STA $21
  $8449: 98        TYA
  $844A: 18        CLC
  $844B: 65 1F     ADC $1f
  $844D: 85 1F     STA $1f
  $844F: 90 02     BCC $8453
  $8451: E6 20     INC $20
  $8453: 60        RTS
  $8454: AD C2 03  LDA $03c2
  $8457: 0A        ASL A
  $8458: AA        TAX
  $8459: BD 5C D7  LDA $d75c,X
  $845C: 85 00     STA $00
  $845E: BD 5D D7  LDA $d75d,X
  $8461: 85 01     STA $01
  $8463: AE 39 03  LDX $0339
  $8466: A0 18     LDY #$18
  $8468: AD C2 03  LDA $03c2
  $846B: C9 0A     CMP #$0a
  $846D: B0 0E     BCS $847d
  $846F: AD C3 03  LDA $03c3
  $8472: 4A        LSR A
  $8473: C9 03     CMP #$03
  $8475: F0 04     BEQ $847b
  $8477: C9 04     CMP #$04
  $8479: D0 02     BNE $847d
  $847B: A0 14     LDY #$14
  $847D: 98        TYA
  $847E: 9D 3A 03  STA $033a,X
  $8481: 38        SEC
  $8482: E9 14     SBC #$14
  $8484: 85 02     STA $02
  $8486: E8        INX
  $8487: AD C3 03  LDA $03c3
  $848A: 0A        ASL A
  $848B: 0A        ASL A
  $848C: 0A        ASL A
  $848D: 0A        ASL A
  $848E: 0A        ASL A
  $848F: 08        PHP
  $8490: 18        CLC
  $8491: 69 0C     ADC #$0c
  $8493: 08        PHP
  $8494: 38        SEC
  $8495: E5 02     SBC $02
  $8497: 28        PLP
  $8498: 9D 3A 03  STA $033a,X
  $849B: E8        INX
  $849C: A9 22     LDA #$22
  $849E: 69 00     ADC #$00
  $84A0: 28        PLP
  $84A1: 69 00     ADC #$00
  $84A3: 9D 3A 03  STA $033a,X
  $84A6: E8        INX
  $84A7: A4 02     LDY $02
  $84A9: F0 10     BEQ $84bb
  $84AB: AD C2 03  LDA $03c2
  $84AE: C9 0A     CMP #$0a
  $84B0: B0 09     BCS $84bb
  $84B2: A9 00     LDA #$00
  $84B4: 9D 3A 03  STA $033a,X
  $84B7: E8        INX
  $84B8: 88        DEY
  $84B9: D0 F9     BNE $84b4
  $84BB: AC C5 03  LDY $03c5
  $84BE: B1 00     LDA ($00),Y
  $84C0: 10 1A     BPL $84dc
  $84C2: C9 E0     CMP #$e0
  $84C4: 08        PHP
  $84C5: 29 1F     AND #$1f
  $84C7: 85 03     STA $03
  $84C9: 28        PLP
  $84CA: B0 04     BCS $84d0
  $84CC: C8        INY
  $84CD: B1 00     LDA ($00),Y
  $84CF: 2C A9 00  BIT $00a9
  $84D2: 9D 3A 03  STA $033a,X
  $84D5: E8        INX
  $84D6: C6 03     DEC $03
  $84D8: D0 F8     BNE $84d2
  $84DA: F0 04     BEQ $84e0
  $84DC: 9D 3A 03  STA $033a,X
  $84DF: E8        INX
  $84E0: C8        INY
  $84E1: 8C C5 03  STY $03c5
  $84E4: 8A        TXA
  $84E5: 38        SEC
  $84E6: ED 39 03  SBC $0339
  $84E9: 38        SEC
  $84EA: E5 02     SBC $02
  $84EC: 38        SEC
  $84ED: E9 17     SBC #$17
  $84EF: F0 04     BEQ $84f5
  $84F1: 90 C8     BCC $84bb
  $84F3: B0 F4     BCS $84e9
  $84F5: EE C3 03  INC $03c3
  $84F8: AD C3 03  LDA $03c3
  $84FB: 4A        LSR A
  $84FC: 90 03     BCC $8501
  $84FE: 4C 66 C4  JMP $c466
  $8501: AD C3 03  LDA $03c3
  $8504: C9 0C     CMP #$0c
  $8506: D0 11     BNE $8519
  $8508: AD BE 03  LDA $03be
  $850B: 29 FD     AND #$fd
  $850D: 8D BE 03  STA $03be
  $8510: AE C2 03  LDX $03c2
  $8513: BD 25 C5  LDA $c525,X
  $8516: 8D C1 03  STA $03c1
  $8519: A5 02     LDA $02
  $851B: 18        CLC
  $851C: 69 14     ADC #$14
  $851E: 0A        ASL A
  $851F: 69 03     ADC #$03
  $8521: 20 2F 80  JSR $802f
  $8524: 60        RTS
  $8525: 01 01     ORA ($01,X)
  $8527: 00        BRK
  $8528: 00        BRK
  $8529: 01 01     ORA ($01,X)
  $852B: 00        BRK
  $852C: 00        BRK
  $852D: 01 01     ORA ($01,X)
  $852F: 05 05     ORA $05
  $8531: 04 05     NOP $05
  $8533: 05 04     ORA $04
  $8535: 20 05 80  JSR $8005
  $8538: 20 20 80  JSR $8020
  $853B: 20 1D 80  JSR $801d
  $853E: A5 19     LDA $19
  $8540: 29 FC     AND #$fc
  $8542: 85 19     STA $19
  $8544: A9 02     LDA #$02
  $8546: 20 CC CC  JSR $cccc
  $8549: 20 23 80  JSR $8023
  $854C: 98        TYA
  $854D: C6 20     DEC $20
  $854F: 32        ???
  $8550: 80 20     NOP #$20
  $8552: 14 80     NOP $80,X
  $8554: A2 01     LDX #$01
  $8556: 8A        TXA
  $8557: 9D 00 06  STA $0600,X
  $855A: E8        INX
  $855B: E0 0B     CPX #$0b
  $855D: D0 F7     BNE $8556
  $855F: CA        DEX
  $8560: 8E 00 06  STX $0600
  $8563: A9 00     LDA #$00
  $8565: 8D A6 06  STA $06a6
  $8568: 8D A7 06  STA $06a7
  $856B: 8D 0B 06  STA $060b
  $856E: 85 1A     STA $1a
  $8570: 85 1B     STA $1b
  $8572: A9 07     LDA #$07
  $8574: 20 35 80  JSR $8035
  $8577: 20 05 80  JSR $8005
  $857A: 20 80 C5  JSR $c580
  $857D: 4C 77 C5  JMP $c577
  $8580: AD A6 06  LDA $06a6
  $8583: 20 17 80  JSR $8017
  $8586: 29 C6     AND #$c6
  $8588: 8A        TXA
  $8589: C5 20     CMP $20
  $858B: 0D C6 A9  ORA $a9c6
  $858E: CC 20 3E  CPY $3e20
  $8591: 80 29     NOP #$29
  $8593: CC D0 01  CPY $01d0
  $8596: 60        RTS
  $8597: AA        TAX
  $8598: 29 0C     AND #$0c
  $859A: F0 1D     BEQ $85b9
  $859C: AE A7 06  LDX $06a7
  $859F: 29 08     AND #$08
  $85A1: D0 0D     BNE $85b0
  $85A3: E8        INX
  $85A4: EC 00 06  CPX $0600
  $85A7: 90 0C     BCC $85b5
  $85A9: AE 00 06  LDX $0600
  $85AC: CA        DEX
  $85AD: 4C B5 C5  JMP $c5b5
  $85B0: CA        DEX
  $85B1: 10 02     BPL $85b5
  $85B3: A2 00     LDX #$00
  $85B5: 8E A7 06  STX $06a7
  $85B8: 60        RTS
  $85B9: CE A6 06  DEC $06a6
  $85BC: 8A        TXA
  $85BD: 30 16     BMI $85d5
  $85BF: AE 0B 06  LDX $060b
  $85C2: F0 10     BEQ $85d4
  $85C4: CA        DEX
  $85C5: 8E 0B 06  STX $060b
  $85C8: BD 0C 06  LDA $060c,X
  $85CB: AC 00 06  LDY $0600
  $85CE: 99 01 06  STA $0601,Y
  $85D1: EE 00 06  INC $0600
  $85D4: 60        RTS
  $85D5: AC 0B 06  LDY $060b
  $85D8: C0 05     CPY #$05
  $85DA: D0 03     BNE $85df
  $85DC: 68        PLA
  $85DD: 68        PLA
  $85DE: 60        RTS
  $85DF: AE A7 06  LDX $06a7
  $85E2: BD 01 06  LDA $0601,X
  $85E5: 99 0C 06  STA $060c,Y
  $85E8: A9 09     LDA #$09
  $85EA: 38        SEC
  $85EB: ED A7 06  SBC $06a7
  $85EE: F0 0B     BEQ $85fb
  $85F0: A8        TAY
  $85F1: BD 02 06  LDA $0602,X
  $85F4: 9D 01 06  STA $0601,X
  $85F7: E8        INX
  $85F8: 88        DEY
  $85F9: D0 F6     BNE $85f1
  $85FB: CE 00 06  DEC $0600
  $85FE: EE 0B 06  INC $060b
  $8601: AD A7 06  LDA $06a7
  $8604: CD 00 06  CMP $0600
  $8607: D0 03     BNE $860c
  $8609: CE A7 06  DEC $06a7
  $860C: 60        RTS
  $860D: AD A7 06  LDA $06a7
  $8610: 0A        ASL A
  $8611: 0A        ASL A
  $8612: 0A        ASL A
  $8613: 0A        ASL A
  $8614: 69 38     ADC #$38
  $8616: 8D 00 02  STA $0200
  $8619: A9 AE     LDA #$ae
  $861B: 8D 01 02  STA $0201
  $861E: A9 00     LDA #$00
  $8620: 8D 02 02  STA $0202
  $8623: A9 10     LDA #$10
  $8625: 8D 03 02  STA $0203
  $8628: 60        RTS
  $8629: A9 00     LDA #$00
  $862B: 85 00     STA $00
  $862D: A5 00     LDA $00
  $862F: 18        CLC
  $8630: 69 21     ADC #$21
  $8632: 20 43 C9  JSR $c943
  $8635: A6 00     LDX $00
  $8637: EC 00 06  CPX $0600
  $863A: B0 18     BCS $8654
  $863C: BD 01 06  LDA $0601,X
  $863F: 48        PHA
  $8640: A2 00     LDX #$00
  $8642: 20 8D C6  JSR $c68d
  $8645: 68        PLA
  $8646: A2 06     LDX #$06
  $8648: 20 50 80  JSR $8050
  $864B: A5 6E     LDA $6e
  $864D: A0 00     LDY #$00
  $864F: A2 08     LDX #$08
  $8651: 20 91 C9  JSR $c991
  $8654: 20 05 80  JSR $8005
  $8657: A5 00     LDA $00
  $8659: C9 05     CMP #$05
  $865B: B0 24     BCS $8681
  $865D: 69 2E     ADC #$2e
  $865F: 20 43 C9  JSR $c943
  $8662: A6 00     LDX $00
  $8664: EC 0B 06  CPX $060b
  $8667: F0 0A     BEQ $8673
  $8669: B0 08     BCS $8673
  $866B: BD 0C 06  LDA $060c,X
  $866E: A2 02     LDX #$02
  $8670: 20 8D C6  JSR $c68d
  $8673: A6 00     LDX $00
  $8675: E8        INX
  $8676: 8A        TXA
  $8677: A0 00     LDY #$00
  $8679: A2 00     LDX #$00
  $867B: 20 91 C9  JSR $c991
  $867E: 20 05 80  JSR $8005
  $8681: E6 00     INC $00
  $8683: A5 00     LDA $00
  $8685: C9 0B     CMP #$0b
  $8687: D0 A4     BNE $862d
  $8689: EE A6 06  INC $06a6
  $868C: 60        RTS
  $868D: 20 47 80  JSR $8047
  $8690: A0 03     LDY #$03
  $8692: B1 5D     LDA ($5d),Y
  $8694: 20 B9 C9  JSR $c9b9
  $8697: 60        RTS
  $8698: 12        ???
  $8699: 67 20     RRA $20
  $869B: D1 C8     CMP ($c8),Y
  $869D: 33 53     RLA ($53),Y
  $869F: 3E 99 A5  ROL $a599,X
  $86A2: 91 6E     STA ($6e),Y
  $86A4: 52        ???
  $86A5: 29 4C     AND #$4c
  $86A7: 53 38     SRE ($38),Y
  $86A9: 2D 35 30  AND $3035
  $86AC: 27 01     RLA $01
  $86AE: 4E 20 58  LSR $5820
  $86B1: 03 54     SLO ($54,X)
  $86B3: 20 58 00  JSR $0058
  $86B6: 58        CLI
  $86B7: 04 AA     NOP $aa
  $86B9: 20 83 A8  JSR $a883
  $86BC: 6E 8B 01  ROR $018b
  $86BF: 1B 21 58  SLO $5821,Y
  $86C2: 09 34     ORA #$34
  $86C4: 21 D1     AND ($d1,X)
  $86C6: C8        INY
  $86C7: 33 53     RLA ($53),Y
  $86C9: 3E 99 A5  ROL $a599,X
  $86CC: 91 6E     STA ($6e),Y
  $86CE: 06 C1     ASL $c1
  $86D0: 23 AA     RLA ($aa,X)
  $86D2: AA        TAX
  $86D3: AA        TAX
  $86D4: AA        TAX
  $86D5: AA        TAX
  $86D6: AA        TAX
  $86D7: 00        BRK
  $86D8: 20 05 80  JSR $8005
  $86DB: 20 72 C8  JSR $c872
  $86DE: A9 18     LDA #$18
  $86E0: 85 1B     STA $1b
  $86E2: A9 00     LDA #$00
  $86E4: 85 1A     STA $1a
  $86E6: A9 00     LDA #$00
  $86E8: 8D 9F 05  STA $059f
  $86EB: 8D DE 05  STA $05de
  $86EE: A9 07     LDA #$07
  $86F0: 20 35 80  JSR $8035
  $86F3: 20 05 80  JSR $8005
  $86F6: 20 FC C6  JSR $c6fc
  $86F9: 4C F3 C6  JMP $c6f3
  $86FC: 20 1B C8  JSR $c81b
  $86FF: AD 33 06  LDA $0633
  $8702: 20 17 80  JSR $8017
  $8705: 09 C7     ORA #$c7
  $8707: D6 C7     DEC $c7,X
  $8709: A9 16     LDA #$16
  $870B: 20 43 C9  JSR $c943
  $870E: AE DF 05  LDX $05df
  $8711: BD 1E 06  LDA $061e,X
  $8714: 08        PHP
  $8715: 29 7F     AND #$7f
  $8717: 85 02     STA $02
  $8719: A2 03     LDX #$03
  $871B: 20 B9 C9  JSR $c9b9
  $871E: 28        PLP
  $871F: 10 0B     BPL $872c
  $8721: A5 02     LDA $02
  $8723: 20 2E C9  JSR $c92e
  $8726: 8A        TXA
  $8727: A2 00     LDX #$00
  $8729: 20 20 CE  JSR $ce20
  $872C: 20 05 80  JSR $8005
  $872F: A5 02     LDA $02
  $8731: 20 71 80  JSR $8071
  $8734: 85 03     STA $03
  $8736: A2 00     LDX #$00
  $8738: A5 02     LDA $02
  $873A: C9 07     CMP #$07
  $873C: F0 0A     BEQ $8748
  $873E: C9 16     CMP #$16
  $8740: F0 06     BEQ $8748
  $8742: C9 1A     CMP #$1a
  $8744: F0 02     BEQ $8748
  $8746: E8        INX
  $8747: E8        INX
  $8748: BD AC C7  LDA $c7ac,X
  $874B: 85 04     STA $04
  $874D: BD AD C7  LDA $c7ad,X
  $8750: 85 05     STA $05
  $8752: A9 00     LDA #$00
  $8754: 85 00     STA $00
  $8756: A5 00     LDA $00
  $8758: 0A        ASL A
  $8759: 85 01     STA $01
  $875B: A8        TAY
  $875C: B1 04     LDA ($04),Y
  $875E: F0 48     BEQ $87a8
  $8760: 48        PHA
  $8761: A5 00     LDA $00
  $8763: 18        CLC
  $8764: 69 17     ADC #$17
  $8766: 20 43 C9  JSR $c943
  $8769: 68        PLA
  $876A: C9 FF     CMP #$ff
  $876C: F0 05     BEQ $8773
  $876E: A2 00     LDX #$00
  $8770: 20 B9 C9  JSR $c9b9
  $8773: A4 01     LDY $01
  $8775: C8        INY
  $8776: B1 04     LDA ($04),Y
  $8778: C9 FF     CMP #$ff
  $877A: F0 25     BEQ $87a1
  $877C: C9 FE     CMP #$fe
  $877E: D0 0A     BNE $878a
  $8780: A5 03     LDA $03
  $8782: 18        CLC
  $8783: 69 01     ADC #$01
  $8785: A0 00     LDY #$00
  $8787: 4C 9C C7  JMP $c79c
  $878A: AA        TAX
  $878B: 08        PHP
  $878C: A5 03     LDA $03
  $878E: A4 02     LDY $02
  $8790: 20 5C 80  JSR $805c
  $8793: A5 6E     LDA $6e
  $8795: A4 6F     LDY $6f
  $8797: 28        PLP
  $8798: F0 02     BEQ $879c
  $879A: A0 00     LDY #$00
  $879C: A2 07     LDX #$07
  $879E: 20 91 C9  JSR $c991
  $87A1: 20 05 80  JSR $8005
  $87A4: E6 00     INC $00
  $87A6: D0 AE     BNE $8756
  $87A8: EE 33 06  INC $0633
  $87AB: 60        RTS
  $87AC: C3 C7     DCP ($c7,X)
  $87AE: B0 C7     BCS $8777
  $87B0: 5C FE 5B  NOP $5bfe,X
  $87B3: FF FF 00  ISB $00ff,X
  $87B6: 29 05     AND #$05
  $87B8: 28        PLP
  $87B9: 04 53     NOP $53
  $87BB: 06 31     ASL $31
  $87BD: 07 30     SLO $30
  $87BF: 09 32     ORA #$32
  $87C1: 08        PHP
  $87C2: 00        BRK
  $87C3: 5C FE 5B  NOP $5bfe,X
  $87C6: FF FF 00  ISB $00ff,X
  $87C9: 5A        NOP
  $87CA: 03 34     SLO ($34,X)
  $87CC: 02        ???
  $87CD: 28        PLP
  $87CE: 01 FF     ORA ($ff,X)
  $87D0: FF FF FF  ISB $ffff,X
  $87D3: FF FF 00  ISB $00ff,X
  $87D6: A9 1F     LDA #$1f
  $87D8: 20 3E 80  JSR $803e
  $87DB: AA        TAX
  $87DC: 29 10     AND #$10
  $87DE: F0 03     BEQ $87e3
  $87E0: 68        PLA
  $87E1: 68        PLA
  $87E2: 60        RTS
  $87E3: 8A        TXA
  $87E4: 29 0F     AND #$0f
  $87E6: D0 01     BNE $87e9
  $87E8: 60        RTS
  $87E9: AC DF 05  LDY $05df
  $87EC: 29 03     AND #$03
  $87EE: F0 16     BEQ $8806
  $87F0: 4A        LSR A
  $87F1: A9 0B     LDA #$0b
  $87F3: B0 02     BCS $87f7
  $87F5: A9 F5     LDA #$f5
  $87F7: 18        CLC
  $87F8: 6D DF 05  ADC $05df
  $87FB: 30 1D     BMI $881a
  $87FD: CD 1D 06  CMP $061d
  $8800: B0 18     BCS $881a
  $8802: A8        TAY
  $8803: 4C 14 C8  JMP $c814
  $8806: 8A        TXA
  $8807: 29 04     AND #$04
  $8809: D0 03     BNE $880e
  $880B: 88        DEY
  $880C: 10 06     BPL $8814
  $880E: C8        INY
  $880F: CC 1D 06  CPY $061d
  $8812: B0 06     BCS $881a
  $8814: 8C DF 05  STY $05df
  $8817: CE 33 06  DEC $0633
  $881A: 60        RTS
  $881B: A2 08     LDX #$08
  $881D: AD DF 05  LDA $05df
  $8820: C9 0B     CMP #$0b
  $8822: 90 04     BCC $8828
  $8824: E9 0B     SBC #$0b
  $8826: A2 58     LDX #$58
  $8828: 86 00     STX $00
  $882A: 0A        ASL A
  $882B: 0A        ASL A
  $882C: 0A        ASL A
  $882D: 0A        ASL A
  $882E: 69 3F     ADC #$3f
  $8830: 48        PHA
  $8831: A2 00     LDX #$00
  $8833: 8A        TXA
  $8834: 0A        ASL A
  $8835: 6D 9F 05  ADC $059f
  $8838: C9 40     CMP #$40
  $883A: 90 02     BCC $883e
  $883C: E9 40     SBC #$40
  $883E: 18        CLC
  $883F: 65 00     ADC $00
  $8841: 9D 03 02  STA $0203,X
  $8844: 68        PLA
  $8845: 48        PHA
  $8846: 9D 00 02  STA $0200,X
  $8849: A9 C4     LDA #$c4
  $884B: 9D 01 02  STA $0201,X
  $884E: AD DE 05  LDA $05de
  $8851: 4A        LSR A
  $8852: 29 03     AND #$03
  $8854: 9D 02 02  STA $0202,X
  $8857: E8        INX
  $8858: E8        INX
  $8859: E8        INX
  $885A: E8        INX
  $885B: E0 10     CPX #$10
  $885D: D0 D4     BNE $8833
  $885F: 68        PLA
  $8860: AE 9F 05  LDX $059f
  $8863: E8        INX
  $8864: E8        INX
  $8865: E0 40     CPX #$40
  $8867: 90 02     BCC $886b
  $8869: A2 00     LDX #$00
  $886B: 8E 9F 05  STX $059f
  $886E: EE DE 05  INC $05de
  $8871: 60        RTS
  $8872: 20 20 80  JSR $8020
  $8875: 20 1D 80  JSR $801d
  $8878: A9 01     LDA #$01
  $887A: 20 CC CC  JSR $cccc
  $887D: 20 23 80  JSR $8023
  $8880: D2        ???
  $8881: C9 20     CMP #$20
  $8883: 32        ???
  $8884: 80 A2     NOP #$a2
  $8886: 00        BRK
  $8887: 8E 1D 06  STX $061d
  $888A: E8        INX
  $888B: 86 00     STX $00
  $888D: A9 0B     LDA #$0b
  $888F: AE DE 06  LDX $06de
  $8892: F0 02     BEQ $8896
  $8894: A9 15     LDA #$15
  $8896: 85 01     STA $01
  $8898: A5 00     LDA $00
  $889A: AE DE 06  LDX $06de
  $889D: F0 04     BEQ $88a3
  $889F: AA        TAX
  $88A0: BD 47 CF  LDA $cf47,X
  $88A3: 85 04     STA $04
  $88A5: C9 18     CMP #$18
  $88A7: F0 0D     BEQ $88b6
  $88A9: C9 1A     CMP #$1a
  $88AB: D0 10     BNE $88bd
  $88AD: AD DC 06  LDA $06dc
  $88B0: C9 15     CMP #$15
  $88B2: D0 28     BNE $88dc
  $88B4: F0 07     BEQ $88bd
  $88B6: AD 50 06  LDA $0650
  $88B9: C9 07     CMP #$07
  $88BB: D0 1F     BNE $88dc
  $88BD: A2 00     LDX #$00
  $88BF: EC 0E 03  CPX $030e
  $88C2: F0 0A     BEQ $88ce
  $88C4: BD 0F 03  LDA $030f,X
  $88C7: C5 04     CMP $04
  $88C9: F0 11     BEQ $88dc
  $88CB: E8        INX
  $88CC: D0 F1     BNE $88bf
  $88CE: AE 1D 06  LDX $061d
  $88D1: A5 04     LDA $04
  $88D3: 9D 1E 06  STA $061e,X
  $88D6: 20 EE C8  JSR $c8ee
  $88D9: EE 1D 06  INC $061d
  $88DC: E6 00     INC $00
  $88DE: C6 01     DEC $01
  $88E0: D0 B6     BNE $8898
  $88E2: A9 00     LDA #$00
  $88E4: 8D 33 06  STA $0633
  $88E7: 8D DF 05  STA $05df
  $88EA: 20 14 80  JSR $8014
  $88ED: 60        RTS
  $88EE: AD 1D 06  LDA $061d
  $88F1: 20 43 C9  JSR $c943
  $88F4: A5 04     LDA $04
  $88F6: 20 2E C9  JSR $c92e
  $88F9: F0 11     BEQ $890c
  $88FB: 20 71 80  JSR $8071
  $88FE: A2 00     LDX #$00
  $8900: A4 04     LDY $04
  $8902: 20 5C 80  JSR $805c
  $8905: A5 6E     LDA $6e
  $8907: A4 6F     LDY $6f
  $8909: 4C 1E C9  JMP $c91e
  $890C: AE 1D 06  LDX $061d
  $890F: 09 80     ORA #$80
  $8911: 9D 1E 06  STA $061e,X
  $8914: A0 0F     LDY #$0f
  $8916: B1 5D     LDA ($5d),Y
  $8918: 48        PHA
  $8919: C8        INY
  $891A: B1 5D     LDA ($5d),Y
  $891C: A8        TAY
  $891D: 68        PLA
  $891E: A2 08     LDX #$08
  $8920: 20 91 C9  JSR $c991
  $8923: A2 00     LDX #$00
  $8925: A5 04     LDA $04
  $8927: 20 B9 C9  JSR $c9b9
  $892A: 20 32 80  JSR $8032
  $892D: 60        RTS
  $892E: A2 00     LDX #$00
  $8930: 48        PHA
  $8931: 8A        TXA
  $8932: 20 47 80  JSR $8047
  $8935: 68        PLA
  $8936: A0 03     LDY #$03
  $8938: D1 5D     CMP ($5d),Y
  $893A: F0 06     BEQ $8942
  $893C: E8        INX
  $893D: E0 0B     CPX #$0b
  $893F: D0 EF     BNE $8930
  $8941: E8        INX
  $8942: 60        RTS
  $8943: 48        PHA
  $8944: 20 8D CD  JSR $cd8d
  $8947: 68        PLA
  $8948: A0 00     LDY #$00
  $894A: C9 0B     CMP #$0b
  $894C: 90 05     BCC $8953
  $894E: C8        INY
  $894F: E9 0B     SBC #$0b
  $8951: B0 F7     BCS $894a
  $8953: 8D 3C 03  STA $033c
  $8956: A9 00     LDA #$00
  $8958: 4E 3C 03  LSR $033c
  $895B: 6A        ROR A
  $895C: 4E 3C 03  LSR $033c
  $895F: 6A        ROR A
  $8960: 79 8C C9  ADC $c98c,Y
  $8963: 8D 3B 03  STA $033b
  $8966: AA        TAX
  $8967: AD 3C 03  LDA $033c
  $896A: 69 20     ADC #$20
  $896C: 8D 3C 03  STA $033c
  $896F: 8D 48 03  STA $0348
  $8972: 8A        TXA
  $8973: 38        SEC
  $8974: E9 20     SBC #$20
  $8976: 8D 47 03  STA $0347
  $8979: B0 03     BCS $897e
  $897B: CE 48 03  DEC $0348
  $897E: A9 09     LDA #$09
  $8980: 8D 3A 03  STA $033a
  $8983: 8D 46 03  STA $0346
  $8986: A9 15     LDA #$15
  $8988: 20 2F 80  JSR $802f
  $898B: 60        RTS
  $898C: E1 EB     SBC ($eb,X)
  $898E: F6 E4     INC $e4,X
  $8990: F4 85     NOP $85,X
  $8992: 57 84     SRE $84,X
  $8994: 58        CLI
  $8995: A9 0A     LDA #$0a
  $8997: 85 59     STA $59
  $8999: A9 00     LDA #$00
  $899B: 85 5C     STA $5c
  $899D: 20 41 80  JSR $8041
  $89A0: A5 5A     LDA $5a
  $89A2: 20 B1 C9  JSR $c9b1
  $89A5: A5 58     LDA $58
  $89A7: D0 F4     BNE $899d
  $89A9: A5 57     LDA $57
  $89AB: F0 0B     BEQ $89b8
  $89AD: C9 0A     CMP #$0a
  $89AF: B0 EC     BCS $899d
  $89B1: 18        CLC
  $89B2: 69 64     ADC #$64
  $89B4: 9D 3D 03  STA $033d,X
  $89B7: CA        DEX
  $89B8: 60        RTS
  $89B9: 20 56 80  JSR $8056
  $89BC: A4 67     LDY $67
  $89BE: B1 65     LDA ($65),Y
  $89C0: 20 29 80  JSR $8029
  $89C3: 9D 3D 03  STA $033d,X
  $89C6: 98        TYA
  $89C7: 9D 49 03  STA $0349,X
  $89CA: E8        INX
  $89CB: E6 67     INC $67
  $89CD: C6 68     DEC $68
  $89CF: D0 EB     BNE $89bc
  $89D1: 60        RTS
  $89D2: 08        PHP
  $89D3: C8        INY
  $89D4: 23 0A     RLA ($0a,X)
  $89D6: 0A        ASL A
  $89D7: 0A        ASL A
  $89D8: 0A        ASL A
  $89D9: 0A        ASL A
  $89DA: EA        NOP
  $89DB: FA        NOP
  $89DC: BA        TSX
  $89DD: 03 D5     SLO ($d5,X)
  $89DF: 23 22     RLA ($22,X)
  $89E1: 00        BRK
  $89E2: 88        DEY
  $89E3: 03 DD     SLO ($dd,X)
  $89E5: 23 22     RLA ($22,X)
  $89E7: 00        BRK
  $89E8: 88        DEY
  $89E9: 03 E5     SLO ($e5,X)
  $89EB: 23 22     RLA ($22,X)
  $89ED: 00        BRK
  $89EE: 88        DEY
  $89EF: 03 ED     SLO ($ed,X)
  $89F1: 23 22     RLA ($22,X)
  $89F3: 00        BRK
  $89F4: 88        DEY
  $89F5: 03 F5     SLO ($f5,X)
  $89F7: 23 A2     RLA ($a2,X)
  $89F9: A0 A8     LDY #$a8
  $89FB: 00        BRK
  $89FC: A9 00     LDA #$00
  $89FE: 8D 16 06  STA $0616
  $8A01: 20 A2 CE  JSR $cea2
  $8A04: 20 05 80  JSR $8005
  $8A07: 20 0D CA  JSR $ca0d
  $8A0A: 4C 04 CA  JMP $ca04
  $8A0D: AD 15 06  LDA $0615
  $8A10: 20 17 80  JSR $8017
  $8A13: 21 CA     AND ($ca,X)
  $8A15: 47 CA     SRE $ca
  $8A17: 3A        NOP
  $8A18: CB 8F     AXS #$8f
  $8A1A: CB 56     AXS #$56
  $8A1C: CA        DEX
  $8A1D: 7D CA 43  ADC $43ca,X
  $8A20: CC 20 94  CPY $9420
  $8A23: CC 20 23  CPY $2320
  $8A26: 80 3D     NOP #$3d
  $8A28: D0 20     BNE $8a4a
  $8A2A: 23 80     RLA ($80,X)
  $8A2C: 53 D0     SRE ($d0),Y
  $8A2E: 20 05 80  JSR $8005
  $8A31: 20 34 CD  JSR $cd34
  $8A34: A9 6F     LDA #$6f
  $8A36: 8D 20 02  STA $0220
  $8A39: A9 02     LDA #$02
  $8A3B: 8D 22 02  STA $0222
  $8A3E: A9 90     LDA #$90
  $8A40: 8D 23 02  STA $0223
  $8A43: EE 15 06  INC $0615
  $8A46: 60        RTS
  $8A47: 20 E4 CA  JSR $cae4
  $8A4A: A9 03     LDA #$03
  $8A4C: 38        SEC
  $8A4D: ED 0E 03  SBC $030e
  $8A50: 69 63     ADC #$63
  $8A52: 8D 21 02  STA $0221
  $8A55: 60        RTS
  $8A56: 20 EF CB  JSR $cbef
  $8A59: AD 13 06  LDA $0613
  $8A5C: AE 0E 03  LDX $030e
  $8A5F: 9D 0F 03  STA $030f,X
  $8A62: EE 0E 03  INC $030e
  $8A65: AC 16 06  LDY $0616
  $8A68: 99 18 06  STA $0618,Y
  $8A6B: AD 14 06  LDA $0614
  $8A6E: 99 17 06  STA $0617,Y
  $8A71: C8        INY
  $8A72: C8        INY
  $8A73: 8C 16 06  STY $0616
  $8A76: 20 D8 CE  JSR $ced8
  $8A79: 20 34 CD  JSR $cd34
  $8A7C: 60        RTS
  $8A7D: AE 16 06  LDX $0616
  $8A80: F0 17     BEQ $8a99
  $8A82: CA        DEX
  $8A83: CA        DEX
  $8A84: 30 13     BMI $8a99
  $8A86: BD 17 06  LDA $0617,X
  $8A89: 20 47 80  JSR $8047
  $8A8C: BD 18 06  LDA $0618,X
  $8A8F: A0 03     LDY #$03
  $8A91: 91 5D     STA ($5d),Y
  $8A93: CE 0E 03  DEC $030e
  $8A96: 4C 82 CA  JMP $ca82
  $8A99: A9 00     LDA #$00
  $8A9B: 8D 16 06  STA $0616
  $8A9E: 20 D8 CE  JSR $ced8
  $8AA1: 20 34 CD  JSR $cd34
  $8AA4: A9 01     LDA #$01
  $8AA6: 8D 15 06  STA $0615
  $8AA9: 60        RTS
  $8AAA: A9 00     LDA #$00
  $8AAC: 8D 0E 03  STA $030e
  $8AAF: 8D 16 06  STA $0616
  $8AB2: 20 A2 CE  JSR $cea2
  $8AB5: 20 05 80  JSR $8005
  $8AB8: 20 BE CA  JSR $cabe
  $8ABB: 4C B5 CA  JMP $cab5
  $8ABE: AD 15 06  LDA $0615
  $8AC1: 20 17 80  JSR $8017
  $8AC4: D2        ???
  $8AC5: CA        DEX
  $8AC6: E4 CA     CPX $ca
  $8AC8: 3A        NOP
  $8AC9: CB 8F     AXS #$8f
  $8ACB: CB E8     AXS #$e8
  $8ACD: CB 2C     AXS #$2c
  $8ACF: CC 43 CC  CPY $cc43
  $8AD2: 20 94 CC  JSR $cc94
  $8AD5: 20 23 80  JSR $8023
  $8AD8: 24 D0     BIT $d0
  $8ADA: 20 05 80  JSR $8005
  $8ADD: 20 34 CD  JSR $cd34
  $8AE0: EE 15 06  INC $0615
  $8AE3: 60        RTS
  $8AE4: A9 F8     LDA #$f8
  $8AE6: 8D 14 02  STA $0214
  $8AE9: A9 10     LDA #$10
  $8AEB: 20 3E 80  JSR $803e
  $8AEE: F0 09     BEQ $8af9
  $8AF0: 20 D8 C6  JSR $c6d8
  $8AF3: A9 00     LDA #$00
  $8AF5: 8D 15 06  STA $0615
  $8AF8: 60        RTS
  $8AF9: 20 1D CB  JSR $cb1d
  $8AFC: A9 80     LDA #$80
  $8AFE: 20 3E 80  JSR $803e
  $8B01: F0 0A     BEQ $8b0d
  $8B03: AE 12 06  LDX $0612
  $8B06: BD 37 CB  LDA $cb37,X
  $8B09: 8D 15 06  STA $0615
  $8B0C: 60        RTS
  $8B0D: A0 03     LDY #$03
  $8B0F: A9 02     LDA #$02
  $8B11: 20 54 CC  JSR $cc54
  $8B14: 20 1D CB  JSR $cb1d
  $8B17: A2 03     LDX #$03
  $8B19: 20 32 CE  JSR $ce32
  $8B1C: 60        RTS
  $8B1D: AD DE 06  LDA $06de
  $8B20: D0 05     BNE $8b27
  $8B22: A9 02     LDA #$02
  $8B24: 8D 12 06  STA $0612
  $8B27: AD 12 06  LDA $0612
  $8B2A: D0 0A     BNE $8b36
  $8B2C: AD 0E 03  LDA $030e
  $8B2F: C9 03     CMP #$03
  $8B31: D0 03     BNE $8b36
  $8B33: EE 12 06  INC $0612
  $8B36: 60        RTS
  $8B37: 02        ???
  $8B38: 05 06     ORA $06
  $8B3A: A9 F8     LDA #$f8
  $8B3C: 8D 14 02  STA $0214
  $8B3F: A9 C0     LDA #$c0
  $8B41: 20 3E 80  JSR $803e
  $8B44: 29 C0     AND #$c0
  $8B46: AA        TAX
  $8B47: F0 0A     BEQ $8b53
  $8B49: 10 04     BPL $8b4f
  $8B4B: 20 60 CB  JSR $cb60
  $8B4E: 60        RTS
  $8B4F: CE 15 06  DEC $0615
  $8B52: 60        RTS
  $8B53: A0 00     LDY #$00
  $8B55: A9 0A     LDA #$0a
  $8B57: 20 54 CC  JSR $cc54
  $8B5A: A2 00     LDX #$00
  $8B5C: 20 32 CE  JSR $ce32
  $8B5F: 60        RTS
  $8B60: AD 0F 06  LDA $060f
  $8B63: C9 0A     CMP #$0a
  $8B65: F0 10     BEQ $8b77
  $8B67: A2 00     LDX #$00
  $8B69: BD 01 06  LDA $0601,X
  $8B6C: 10 03     BPL $8b71
  $8B6E: E8        INX
  $8B6F: D0 F8     BNE $8b69
  $8B71: 8E 10 06  STX $0610
  $8B74: 4C 8B CB  JMP $cb8b
  $8B77: AD 09 06  LDA $0609
  $8B7A: F0 12     BEQ $8b8e
  $8B7C: A2 00     LDX #$00
  $8B7E: EC 09 06  CPX $0609
  $8B81: F0 0B     BEQ $8b8e
  $8B83: BD 0A 06  LDA $060a,X
  $8B86: 10 03     BPL $8b8b
  $8B88: E8        INX
  $8B89: D0 F3     BNE $8b7e
  $8B8B: EE 15 06  INC $0615
  $8B8E: 60        RTS
  $8B8F: 20 7B CC  JSR $cc7b
  $8B92: A0 01     LDY #$01
  $8B94: AE 00 06  LDX $0600
  $8B97: AD 0F 06  LDA $060f
  $8B9A: C9 0A     CMP #$0a
  $8B9C: D0 01     BNE $8b9f
  $8B9E: C8        INY
  $8B9F: A9 0C     LDA #$0c
  $8BA1: 20 3E 80  JSR $803e
  $8BA4: F0 3C     BEQ $8be2
  $8BA6: A2 FF     LDX #$ff
  $8BA8: 29 08     AND #$08
  $8BAA: D0 02     BNE $8bae
  $8BAC: A2 01     LDX #$01
  $8BAE: 86 01     STX $01
  $8BB0: B9 0F 06  LDA $060f,Y
  $8BB3: 85 02     STA $02
  $8BB5: A5 02     LDA $02
  $8BB7: 18        CLC
  $8BB8: 65 01     ADC $01
  $8BBA: 85 02     STA $02
  $8BBC: 30 1D     BMI $8bdb
  $8BBE: AA        TAX
  $8BBF: C0 01     CPY #$01
  $8BC1: F0 0C     BEQ $8bcf
  $8BC3: EC 09 06  CPX $0609
  $8BC6: F0 13     BEQ $8bdb
  $8BC8: BD 0A 06  LDA $060a,X
  $8BCB: 10 11     BPL $8bde
  $8BCD: 30 E6     BMI $8bb5
  $8BCF: EC 00 06  CPX $0600
  $8BD2: F0 07     BEQ $8bdb
  $8BD4: BD 01 06  LDA $0601,X
  $8BD7: 30 DC     BMI $8bb5
  $8BD9: 10 03     BPL $8bde
  $8BDB: BE 0F 06  LDX $060f,Y
  $8BDE: 8A        TXA
  $8BDF: 99 0F 06  STA $060f,Y
  $8BE2: 98        TYA
  $8BE3: AA        TAX
  $8BE4: 20 32 CE  JSR $ce32
  $8BE7: 60        RTS
  $8BE8: 20 EF CB  JSR $cbef
  $8BEB: 20 34 CD  JSR $cd34
  $8BEE: 60        RTS
  $8BEF: AE 0F 06  LDX $060f
  $8BF2: BD 5D CF  LDA $cf5d,X
  $8BF5: 08        PHP
  $8BF6: 8D 14 06  STA $0614
  $8BF9: 20 47 80  JSR $8047
  $8BFC: A0 03     LDY #$03
  $8BFE: B1 5D     LDA ($5d),Y
  $8C00: 8D 13 06  STA $0613
  $8C03: 28        PLP
  $8C04: 48        PHA
  $8C05: D0 0F     BNE $8c16
  $8C07: AE 11 06  LDX $0611
  $8C0A: BD 0A 06  LDA $060a,X
  $8C0D: 91 5D     STA ($5d),Y
  $8C0F: 68        PLA
  $8C10: 9D 0A 06  STA $060a,X
  $8C13: 4C 22 CC  JMP $cc22
  $8C16: AE 10 06  LDX $0610
  $8C19: BD 01 06  LDA $0601,X
  $8C1C: 91 5D     STA ($5d),Y
  $8C1E: 68        PLA
  $8C1F: 9D 01 06  STA $0601,X
  $8C22: AD 15 06  LDA $0615
  $8C25: 38        SEC
  $8C26: E9 03     SBC #$03
  $8C28: 8D 15 06  STA $0615
  $8C2B: 60        RTS
  $8C2C: 20 6E 80  JSR $806e
  $8C2F: 20 D8 CE  JSR $ced8
  $8C32: 20 34 CD  JSR $cd34
  $8C35: A9 00     LDA #$00
  $8C37: 8D 0F 06  STA $060f
  $8C3A: 8D 10 06  STA $0610
  $8C3D: A9 01     LDA #$01
  $8C3F: 8D 15 06  STA $0615
  $8C42: 60        RTS
  $8C43: 20 98 80  JSR $8098
  $8C46: A2 00     LDX #$00
  $8C48: 8A        TXA
  $8C49: 9D 00 06  STA $0600,X
  $8C4C: E8        INX
  $8C4D: E0 38     CPX #$38
  $8C4F: D0 F8     BNE $8c49
  $8C51: 68        PLA
  $8C52: 68        PLA
  $8C53: 60        RTS
  $8C54: 85 01     STA $01
  $8C56: A9 0C     LDA #$0c
  $8C58: 20 3E 80  JSR $803e
  $8C5B: 29 0C     AND #$0c
  $8C5D: D0 01     BNE $8c60
  $8C5F: 60        RTS
  $8C60: BE 0F 06  LDX $060f,Y
  $8C63: 29 08     AND #$08
  $8C65: D0 0A     BNE $8c71
  $8C67: E8        INX
  $8C68: E4 01     CPX $01
  $8C6A: 90 0A     BCC $8c76
  $8C6C: A6 01     LDX $01
  $8C6E: 4C 76 CC  JMP $cc76
  $8C71: CA        DEX
  $8C72: 10 02     BPL $8c76
  $8C74: A2 00     LDX #$00
  $8C76: 8A        TXA
  $8C77: 99 0F 06  STA $060f,Y
  $8C7A: 60        RTS
  $8C7B: A9 C0     LDA #$c0
  $8C7D: 20 3E 80  JSR $803e
  $8C80: 29 C0     AND #$c0
  $8C82: F0 0F     BEQ $8c93
  $8C84: AE 15 06  LDX $0615
  $8C87: E8        INX
  $8C88: 29 80     AND #$80
  $8C8A: D0 02     BNE $8c8e
  $8C8C: CA        DEX
  $8C8D: CA        DEX
  $8C8E: 8E 15 06  STX $0615
  $8C91: 68        PLA
  $8C92: 68        PLA
  $8C93: 60        RTS
  $8C94: 20 20 80  JSR $8020
  $8C97: 20 1D 80  JSR $801d
  $8C9A: A9 00     LDA #$00
  $8C9C: 85 1A     STA $1a
  $8C9E: 85 1B     STA $1b
  $8CA0: 20 C0 CC  JSR $ccc0
  $8CA3: 20 14 80  JSR $8014
  $8CA6: A9 02     LDA #$02
  $8CA8: 20 5F 80  JSR $805f
  $8CAB: 20 05 80  JSR $8005
  $8CAE: 20 B4 CC  JSR $ccb4
  $8CB1: 4C AB CC  JMP $ccab
  $8CB4: 20 62 80  JSR $8062
  $8CB7: AD D8 05  LDA $05d8
  $8CBA: F0 01     BEQ $8cbd
  $8CBC: 60        RTS
  $8CBD: 68        PLA
  $8CBE: 68        PLA
  $8CBF: 60        RTS
  $8CC0: 20 CC CC  JSR $cccc
  $8CC3: 20 23 80  JSR $8023
  $8CC6: C6 CF     DEC $cf
  $8CC8: 20 32 80  JSR $8032
  $8CCB: 60        RTS
  $8CCC: AA        TAX
  $8CCD: BD 29 CD  LDA $cd29,X
  $8CD0: 85 00     STA $00
  $8CD2: A9 00     LDA #$00
  $8CD4: 85 02     STA $02
  $8CD6: A6 00     LDX $00
  $8CD8: BD 7B CF  LDA $cf7b,X
  $8CDB: D0 0A     BNE $8ce7
  $8CDD: A5 19     LDA $19
  $8CDF: 29 7B     AND #$7b
  $8CE1: 85 19     STA $19
  $8CE3: 8D 00 20  STA $2000
  $8CE6: 60        RTS
  $8CE7: 8D 3A 03  STA $033a
  $8CEA: BD 7C CF  LDA $cf7c,X
  $8CED: 8D 3B 03  STA $033b
  $8CF0: BD 7D CF  LDA $cf7d,X
  $8CF3: 48        PHA
  $8CF4: 29 23     AND #$23
  $8CF6: 8D 3C 03  STA $033c
  $8CF9: 68        PLA
  $8CFA: 29 04     AND #$04
  $8CFC: 85 01     STA $01
  $8CFE: A5 19     LDA $19
  $8D00: 29 7B     AND #$7b
  $8D02: 05 01     ORA $01
  $8D04: 85 19     STA $19
  $8D06: 8D 00 20  STA $2000
  $8D09: E8        INX
  $8D0A: E8        INX
  $8D0B: E8        INX
  $8D0C: 86 00     STX $00
  $8D0E: A6 02     LDX $02
  $8D10: BD 2C CD  LDA $cd2c,X
  $8D13: A0 00     LDY #$00
  $8D15: 99 3D 03  STA $033d,Y
  $8D18: C8        INY
  $8D19: CC 3A 03  CPY $033a
  $8D1C: D0 F7     BNE $8d15
  $8D1E: 98        TYA
  $8D1F: 20 2F 80  JSR $802f
  $8D22: 20 32 80  JSR $8032
  $8D25: E6 02     INC $02
  $8D27: D0 AD     BNE $8cd6
  $8D29: 00        BRK
  $8D2A: 19 32 FD  ORA $fd32,Y
  $8D2D: FD FE FE  SBC $fefe,X
  $8D30: FC F7 F8  NOP $f8f7,X
  $8D33: F9 A9 00  SBC $00a9,Y
  $8D36: 85 00     STA $00
  $8D38: A6 00     LDX $00
  $8D3A: BD 5D CF  LDA $cf5d,X
  $8D3D: 20 47 80  JSR $8047
  $8D40: A0 03     LDY #$03
  $8D42: B1 5D     LDA ($5d),Y
  $8D44: A4 00     LDY $00
  $8D46: 20 99 CD  JSR $cd99
  $8D49: E6 00     INC $00
  $8D4B: A5 00     LDA $00
  $8D4D: C9 0B     CMP #$0b
  $8D4F: D0 E7     BNE $8d38
  $8D51: AD DE 06  LDA $06de
  $8D54: F0 36     BEQ $8d8c
  $8D56: A9 00     LDA #$00
  $8D58: 85 00     STA $00
  $8D5A: A5 00     LDA $00
  $8D5C: AA        TAX
  $8D5D: 18        CLC
  $8D5E: 69 0B     ADC #$0b
  $8D60: A8        TAY
  $8D61: BD 01 06  LDA $0601,X
  $8D64: 20 99 CD  JSR $cd99
  $8D67: E6 00     INC $00
  $8D69: A5 00     LDA $00
  $8D6B: CD 00 06  CMP $0600
  $8D6E: D0 EA     BNE $8d5a
  $8D70: A9 00     LDA #$00
  $8D72: 85 00     STA $00
  $8D74: A6 00     LDX $00
  $8D76: EC 09 06  CPX $0609
  $8D79: F0 11     BEQ $8d8c
  $8D7B: BD 0A 06  LDA $060a,X
  $8D7E: 48        PHA
  $8D7F: 8A        TXA
  $8D80: 18        CLC
  $8D81: 69 13     ADC #$13
  $8D83: A8        TAY
  $8D84: 68        PLA
  $8D85: 20 99 CD  JSR $cd99
  $8D88: E6 00     INC $00
  $8D8A: D0 E8     BNE $8d74
  $8D8C: 60        RTS
  $8D8D: A2 00     LDX #$00
  $8D8F: 8A        TXA
  $8D90: 9D 3A 03  STA $033a,X
  $8D93: E8        INX
  $8D94: E0 18     CPX #$18
  $8D96: D0 F8     BNE $8d90
  $8D98: 60        RTS
  $8D99: 84 02     STY $02
  $8D9B: A8        TAY
  $8D9C: 08        PHP
  $8D9D: 29 7F     AND #$7f
  $8D9F: 20 56 80  JSR $8056
  $8DA2: 20 8D CD  JSR $cd8d
  $8DA5: A9 08     LDA #$08
  $8DA7: 8D 3A 03  STA $033a
  $8DAA: 8D 45 03  STA $0345
  $8DAD: A5 02     LDA $02
  $8DAF: C9 13     CMP #$13
  $8DB1: 90 02     BCC $8db5
  $8DB3: 69 00     ADC #$00
  $8DB5: A0 E3     LDY #$e3
  $8DB7: C9 0B     CMP #$0b
  $8DB9: 90 04     BCC $8dbf
  $8DBB: E9 0B     SBC #$0b
  $8DBD: A0 F6     LDY #$f6
  $8DBF: 84 04     STY $04
  $8DC1: 85 03     STA $03
  $8DC3: A9 00     LDA #$00
  $8DC5: 46 03     LSR $03
  $8DC7: 6A        ROR A
  $8DC8: 46 03     LSR $03
  $8DCA: 6A        ROR A
  $8DCB: 6D 04 00  ADC $0004
  $8DCE: A8        TAY
  $8DCF: 8D 3B 03  STA $033b
  $8DD2: A5 03     LDA $03
  $8DD4: 69 20     ADC #$20
  $8DD6: 8D 3C 03  STA $033c
  $8DD9: 8D 47 03  STA $0347
  $8DDC: 98        TYA
  $8DDD: 38        SEC
  $8DDE: E9 20     SBC #$20
  $8DE0: 8D 46 03  STA $0346
  $8DE3: B0 03     BCS $8de8
  $8DE5: CE 47 03  DEC $0347
  $8DE8: A2 00     LDX #$00
  $8DEA: A4 02     LDY $02
  $8DEC: C0 0B     CPY #$0b
  $8DEE: B0 0A     BCS $8dfa
  $8DF0: B9 5D CF  LDA $cf5d,Y
  $8DF3: 20 20 CE  JSR $ce20
  $8DF6: 28        PLP
  $8DF7: 4C 02 CE  JMP $ce02
  $8DFA: 28        PLP
  $8DFB: 10 05     BPL $8e02
  $8DFD: A9 FB     LDA #$fb
  $8DFF: 8D 3F 03  STA $033f
  $8E02: A4 67     LDY $67
  $8E04: B1 65     LDA ($65),Y
  $8E06: 20 29 80  JSR $8029
  $8E09: 9D 40 03  STA $0340,X
  $8E0C: 98        TYA
  $8E0D: 9D 4B 03  STA $034b,X
  $8E10: E8        INX
  $8E11: E6 67     INC $67
  $8E13: C6 68     DEC $68
  $8E15: D0 EB     BNE $8e02
  $8E17: A9 13     LDA #$13
  $8E19: 20 2F 80  JSR $802f
  $8E1C: 20 05 80  JSR $8005
  $8E1F: 60        RTS
  $8E20: A8        TAY
  $8E21: B9 68 CF  LDA $cf68,Y
  $8E24: A8        TAY
  $8E25: B9 73 CF  LDA $cf73,Y
  $8E28: 9D 3D 03  STA $033d,X
  $8E2B: B9 74 CF  LDA $cf74,Y
  $8E2E: 9D 3E 03  STA $033e,X
  $8E31: 60        RTS
  $8E32: 8A        TXA
  $8E33: F0 06     BEQ $8e3b
  $8E35: 49 03     EOR #$03
  $8E37: F0 02     BEQ $8e3b
  $8E39: A9 01     LDA #$01
  $8E3B: 0A        ASL A
  $8E3C: 0A        ASL A
  $8E3D: A8        TAY
  $8E3E: BD 0F 06  LDA $060f,X
  $8E41: 0A        ASL A
  $8E42: 0A        ASL A
  $8E43: 0A        ASL A
  $8E44: 0A        ASL A
  $8E45: 7D 9A CE  ADC $ce9a,X
  $8E48: 99 10 02  STA $0210,Y
  $8E4B: A9 01     LDA #$01
  $8E4D: 99 11 02  STA $0211,Y
  $8E50: A9 02     LDA #$02
  $8E52: 99 12 02  STA $0212,Y
  $8E55: BD 9E CE  LDA $ce9e,X
  $8E58: 99 13 02  STA $0213,Y
  $8E5B: E0 03     CPX #$03
  $8E5D: D0 06     BNE $8e65
  $8E5F: A9 F8     LDA #$f8
  $8E61: 8D 18 02  STA $0218
  $8E64: 60        RTS
  $8E65: 8A        TXA
  $8E66: D0 1B     BNE $8e83
  $8E68: AD 0F 06  LDA $060f
  $8E6B: 0A        ASL A
  $8E6C: AA        TAX
  $8E6D: BD 84 CE  LDA $ce84,X
  $8E70: 8D 18 02  STA $0218
  $8E73: BD 85 CE  LDA $ce85,X
  $8E76: 8D 1B 02  STA $021b
  $8E79: A9 01     LDA #$01
  $8E7B: 8D 19 02  STA $0219
  $8E7E: A9 02     LDA #$02
  $8E80: 8D 1A 02  STA $021a
  $8E83: 60        RTS
  $8E84: 98        TYA
  $8E85: 74 98     NOP $98,X
  $8E87: 84 98     STY $98
  $8E89: 94 AC     STY $ac,X
  $8E8B: 74 AC     NOP $ac,X
  $8E8D: 84 AC     STY $ac
  $8E8F: 94 C0     STY $c0,X
  $8E91: 74 C0     NOP $c0,X
  $8E93: 84 C0     STY $c0
  $8E95: 94 C8     STY $c8,X
  $8E97: 84 D0     STY $d0
  $8E99: 84 37     STY $37
  $8E9B: 38        SEC
  $8E9C: C8        INY
  $8E9D: 38        SEC
  $8E9E: 0C C0 C0  NOP $c0c0
  $8EA1: 68        PLA
  $8EA2: 20 D8 CE  JSR $ced8
  $8EA5: A9 00     LDA #$00
  $8EA7: 85 1A     STA $1a
  $8EA9: 85 1B     STA $1b
  $8EAB: 8D 15 06  STA $0615
  $8EAE: 8D 0F 06  STA $060f
  $8EB1: 8D 10 06  STA $0610
  $8EB4: 8D 11 06  STA $0611
  $8EB7: 8D 12 06  STA $0612
  $8EBA: A9 06     LDA #$06
  $8EBC: 85 18     STA $18
  $8EBE: 20 0B 80  JSR $800b
  $8EC1: A9 07     LDA #$07
  $8EC3: 20 35 80  JSR $8035
  $8EC6: 60        RTS
  $8EC7: A2 00     LDX #$00
  $8EC9: 20 50 80  JSR $8050
  $8ECC: A0 0F     LDY #$0f
  $8ECE: A5 6E     LDA $6e
  $8ED0: 91 5D     STA ($5d),Y
  $8ED2: C8        INY
  $8ED3: A5 6F     LDA $6f
  $8ED5: 91 5D     STA ($5d),Y
  $8ED7: 60        RTS
  $8ED8: A9 00     LDA #$00
  $8EDA: 8D 00 06  STA $0600
  $8EDD: 8D 09 06  STA $0609
  $8EE0: 85 00     STA $00
  $8EE2: AD DE 06  LDA $06de
  $8EE5: F0 15     BEQ $8efc
  $8EE7: A6 00     LDX $00
  $8EE9: BD 48 CF  LDA $cf48,X
  $8EEC: 20 2E C9  JSR $c92e
  $8EEF: F0 03     BEQ $8ef4
  $8EF1: 20 FD CE  JSR $cefd
  $8EF4: E6 00     INC $00
  $8EF6: A5 00     LDA $00
  $8EF8: C9 15     CMP #$15
  $8EFA: D0 EB     BNE $8ee7
  $8EFC: 60        RTS
  $8EFD: A2 00     LDX #$00
  $8EFF: 86 05     STX $05
  $8F01: EC 0E 03  CPX $030e
  $8F04: 18        CLC
  $8F05: F0 09     BEQ $8f10
  $8F07: DD 0F 03  CMP $030f,X
  $8F0A: F0 03     BEQ $8f0f
  $8F0C: E8        INX
  $8F0D: D0 F2     BNE $8f01
  $8F0F: 38        SEC
  $8F10: 66 05     ROR $05
  $8F12: C9 07     CMP #$07
  $8F14: F0 26     BEQ $8f3c
  $8F16: C9 16     CMP #$16
  $8F18: F0 22     BEQ $8f3c
  $8F1A: C9 1A     CMP #$1a
  $8F1C: F0 17     BEQ $8f35
  $8F1E: C9 18     CMP #$18
  $8F20: D0 07     BNE $8f29
  $8F22: AE 50 06  LDX $0650
  $8F25: E0 07     CPX #$07
  $8F27: D0 0B     BNE $8f34
  $8F29: AE 00 06  LDX $0600
  $8F2C: 05 05     ORA $05
  $8F2E: 9D 01 06  STA $0601,X
  $8F31: EE 00 06  INC $0600
  $8F34: 60        RTS
  $8F35: AE DC 06  LDX $06dc
  $8F38: E0 15     CPX #$15
  $8F3A: D0 0B     BNE $8f47
  $8F3C: AE 09 06  LDX $0609
  $8F3F: 05 05     ORA $05
  $8F41: 9D 0A 06  STA $060a,X
  $8F44: EE 09 06  INC $0609
  $8F47: 60        RTS
  $8F48: 01 02     ORA ($02,X)
  $8F4A: 03 04     SLO ($04,X)
  $8F4C: 05 06     ORA $06
  $8F4E: 07 0E     SLO $0e
  $8F50: 0F 10 11  SLO $1110
  $8F53: 12        ???
  $8F54: 13 14     SLO ($14),Y
  $8F56: 15 16     ORA $16,X
  $8F58: 17 18     SLO $18,X
  $8F5A: 19 1A 1B  ORA $1b1a,Y
  $8F5D: 0A        ASL A
  $8F5E: 08        PHP
  $8F5F: 06 05     ASL $05
  $8F61: 09 07     ORA #$07
  $8F63: 01 03     ORA ($03,X)
  $8F65: 02        ???
  $8F66: 04 00     NOP $00
  $8F68: 06 04     ASL $04
  $8F6A: 04 04     NOP $04
  $8F6C: 04 02     NOP $02
  $8F6E: 00        BRK
  $8F6F: 02        ???
  $8F70: 00        BRK
  $8F71: 02        ???
  $8F72: 00        BRK
  $8F73: C4 CE     CPY $ce
  $8F75: C9 C4     CMP #$c4
  $8F77: C2 C4     NOP #$c4
  $8F79: C5 C8     CMP $c8
  $8F7B: 01 A0     ORA ($a0,X)
  $8F7D: 20 1F A0  JSR $a01f
  $8F80: 23 19     RLA ($19,X)
  $8F82: A0 24     LDY #$24
  $8F84: 19 BF 24  ORA $24bf,Y
  $8F87: 01 A0     ORA ($a0,X)
  $8F89: 20 01 BF  JSR $bf01
  $8F8C: 20 01 A0  JSR $a001
  $8F8F: 23 01     RLA ($01,X)
  $8F91: BF 23 00  LAX $0023,Y
  $8F94: 09 B6     ORA #$b6
  $8F96: 20 09 76  JSR $7609
  $8F99: 23 15     RLA ($15,X)
  $8F9B: D5 24     CMP $24,X
  $8F9D: 15 DF     ORA $df,X
  $8F9F: 24 01     BIT $01
  $8FA1: B5 20     LDA $20,X
  $8FA3: 01 BF     ORA ($bf,X)
  $8FA5: 20 01 75  JSR $7501
  $8FA8: 23 01     RLA ($01,X)
  $8FAA: 7F 23 00  RRA $0023,X
  $8FAD: 0C F2 20  NOP $20f2
  $8FB0: 0C B2 22  NOP $22b2
  $8FB3: 0E F2 24  ASL $24f2
  $8FB6: 0E FE 24  ASL $24fe
  $8FB9: 01 F2     ORA ($f2,X)
  $8FBB: 20 01 FE  JSR $fe01
  $8FBE: 20 01 B2  JSR $b201
  $8FC1: 22        ???
  $8FC2: 01 BE     ORA ($be,X)
  $8FC4: 22        ???
  $8FC5: 00        BRK
  $8FC6: 09 A1     ORA #$a1
  $8FC8: 20 FD 00  JSR $00fd
  $8FCB: 61 93     ADC ($93,X)
  $8FCD: A1 79     LDA ($79,X)
  $8FCF: 9B 6E 61  TAS $616e,Y
  $8FD2: 07 B8     SLO $b8
  $8FD4: 20 61 94  JSR $9461
  $8FD7: A5 88     LDA $88
  $8FD9: 61 00     ADC ($00,X)
  $8FDB: FD 01 84  SBC $8401,X
  $8FDE: 20 59 01  JSR $0159
  $8FE1: 99 20 58  STA $5820,Y
  $8FE4: 05 2F     ORA $2f
  $8FE6: 21 49     AND ($49,X)
  $8FE8: 4D 3A 2A  EOR $2a3a
  $8FEB: 31 03     AND ($03),Y
  $8FED: 6F 21 2A  RRA $2a21
  $8FF0: 51 4D     EOR ($4d),Y
  $8FF2: 04 EF     NOP $ef
  $8FF4: 20 88 AA  JSR $aa88
  $8FF7: A5 83     LDA $83
  $8FF9: 01 D2     ORA ($d2,X)
  $8FFB: 20 58 01  JSR $0158
  $8FFE: C8        INY
  $8FFF: 23 22     RLA ($22,X)
  $9001: 02        ???
  $9002: CF 23 88  DCP $8823
  $9005: 22        ???
  $9006: 02        ???
  $9007: D7 23     DCP $23,X
  $9009: 88        DEY
  $900A: 22        ???
  $900B: 02        ???
  $900C: DF 23 88  DCP $8823,X
  $900F: 22        ???
  $9010: 02        ???
  $9011: E7 23     ISB $23
  $9013: 88        DEY
  $9014: 22        ???
  $9015: 02        ???
  $9016: EF 23 88  ISB $8823
  $9019: 22        ???
  $901A: 02        ???
  $901B: F7 23     ISB $23,X
  $901D: 88        DEY
  $901E: 22        ???
  $901F: 01 FF     ORA ($ff,X)
  $9021: 23 88     RLA ($88,X)
  $9023: 00        BRK
  $9024: 0D AA 20  ORA $20aa
  $9027: 01 84     ORA ($84,X)
  $9029: 87 6E     SAX $6e
  $902B: 8A        TXA
  $902C: AB A5     ATX #$a5
  $902E: 7F 99 A5  RRA $a599,X
  $9031: 91 6E     STA ($6e),Y
  $9033: 01 01     ORA ($01,X)
  $9035: 91 20     STA ($20),Y
  $9037: 58        CLI
  $9038: 01 94     ORA ($94,X)
  $903A: 20 58 00  JSR $0058
  $903D: 0A        ASL A
  $903E: AC 20 01  LDY $0120
  $9041: 99 A5 91  STA $91a5,Y
  $9044: 6E 88 AA  ROR $aa88
  $9047: A5 83     LDA $83
  $9049: 01 01     ORA ($01,X)
  $904B: 8F 20 58  SAX $5820
  $904E: 01 94     ORA ($94,X)
  $9050: 20 58 00  JSR $0058
  $9053: 07 CE     SLO $ce
  $9055: 21 3E     AND ($3e,X)
  $9057: 2F 4D 61  RLA $614d
  $905A: 00        BRK
  $905B: 3B 53 00  RLA $0053,Y
  $905E: 68        PLA
  $905F: D0 7F     BNE $90e0
  $9061: D0 93     BNE $8ff6
  $9063: D0 A5     BNE $900a
  $9065: D0 CE     BNE $9035
  $9067: D0 13     BNE $907c
  $9069: A7 22     LAX $22
  $906B: 00        BRK
  $906C: 01 11     ORA ($11,X)
  $906E: 18        CLC
  $906F: 3A        NOP
  $9070: 13 22     SLO ($22),Y
  $9072: 59 10 19  EOR $1910,Y
  $9075: 34 82     NOP $82,X
  $9077: 83 85     SAX ($85,X)
  $9079: 48        PHA
  $907A: 67 48     RRA $48
  $907C: 28        PLP
  $907D: 35 00     AND $00,X
  $907F: 10 A8     BPL $9029
  $9081: 22        ???
  $9082: 00        BRK
  $9083: 01 11     ORA ($11,X)
  $9085: 4F 3A 0C  SRE $0c3a
  $9088: 06 14     ASL $14
  $908A: 18        CLC
  $908B: 19 34 82  ORA $8234,Y
  $908E: 83 85     SAX ($85,X)
  $9090: 48        PHA
  $9091: 35 00     AND $00,X
  $9093: 0E 69 22  ASL $2269
  $9096: 00        BRK
  $9097: 01 11     ORA ($11,X)
  $9099: 19 34 86  ORA $8634,Y
  $909C: 2F 6A 12  RLA $126a
  $909F: 2D 11 63  AND $6311
  $90A2: 0A        ASL A
  $90A3: 35 00     AND $00,X
  $90A5: 10 68     BPL $910f
  $90A7: 22        ???
  $90A8: 11 63     ORA ($63),Y
  $90AA: 0A        ASL A
  $90AB: 18        CLC
  $90AC: 3A        NOP
  $90AD: 0F 0F 05  SLO $050f
  $90B0: 01 19     ORA ($19,X)
  $90B2: 34 0D     NOP $0d,X
  $90B4: 05 01     ORA $01
  $90B6: 1C 35 12  NOP $1235,X
  $90B9: A7 22     LAX $22
  $90BB: 3C 2A 66  NOP $662a,X
  $90BE: 28        PLP
  $90BF: 84 34     STY $34
  $90C1: 04 29     NOP $29
  $90C3: 34 0D     NOP $0d,X
  $90C5: 05 01     ORA $01
  $90C7: 1C 01 07  NOP $0701,X
  $90CA: 24 35     BIT $35
  $90CC: 3D 00 0F  AND $0f00,X
  $90CF: 69 22     ADC #$22
  $90D1: 11 63     ORA ($63),Y
  $90D3: 0A        ASL A
  $90D4: 2C 3A 18  BIT $183a
  $90D7: 0D 0F 3A  ORA $3a0f
  $90DA: 1A        NOP
  $90DB: 09 02     ORA #$02
  $90DD: 06 19     ASL $19
  $90DF: 34 0F     NOP $0f,X
  $90E1: A9 22     LDA #$22
  $90E3: 04 04     NOP $04
  $90E5: 58        CLI
  $90E6: 26 3A     ROL $3a
  $90E8: 0F 05 07  SLO $0705
  $90EB: 3A        NOP
  $90EC: 13 64     SLO ($64),Y
  $90EE: 0F 2E 0F  SLO $0f2e
  $90F1: 35 00     AND $00,X
  $90F3: 07 D1     SLO $d1
  $90F5: 87 D1     SAX $d1
  $90F7: D1 D1     CMP ($d1),Y
  $90F9: 5D D2 D1  EOR $d1d2,X
  $90FC: D2        ???
  $90FD: 5D D3 BE  EOR $bed3,X
  $9100: D3 30     DCP ($30),Y
  $9102: D4 81     NOP $81,X
  $9104: D4 C3     NOP $c3,X
  $9106: D4 80     NOP $80,X
  $9108: 80 80     NOP #$80
  $910A: 84 30     STY $30
  $910C: 03 32     SLO ($32,X)
  $910E: 03 38     SLO ($38,X)
  $9110: 03 3A     SLO ($3a,X)
  $9112: 03 84     SLO ($84,X)
  $9114: 31 03     AND ($03),Y
  $9116: 33 03     RLA ($03),Y
  $9118: 39 03 3B  AND $3b03,Y
  $911B: 03 56     SLO ($56,X)
  $911D: 04 01     NOP $01
  $911F: 06 05     ASL $05
  $9121: 31 43     AND ($43),Y
  $9123: 33 43     RLA ($43),Y
  $9125: 3C 03 3E  NOP $3e03,X
  $9128: 03 56     SLO ($56,X)
  $912A: 05 01     ORA $01
  $912C: 07 05     SLO $05
  $912E: 30 43     BMI $9173
  $9130: 37 03     RLA $03,X
  $9132: 3D 03 3F  AND $3f03,X
  $9135: 03 29     SLO ($29,X)
  $9137: 08        PHP
  $9138: 00        BRK
  $9139: 0A        ASL A
  $913A: 00        BRK
  $913B: 20 01 22  JSR $2201
  $913E: 01 28     ORA ($28,X)
  $9140: 02        ???
  $9141: 2A        ROL A
  $9142: 00        BRK
  $9143: 10 00     BPL $9145
  $9145: 12        ???
  $9146: 00        BRK
  $9147: 1E 00 27  ASL $2700,X
  $914A: 09 00     ORA #$00
  $914C: 01 00     ORA ($00,X)
  $914E: 21 01     AND ($01,X)
  $9150: 23 01     RLA ($01,X)
  $9152: 29 02     AND #$02
  $9154: 2B 00     ANC #$00
  $9156: 11 00     ORA ($00),Y
  $9158: 28        PLP
  $9159: 0C 00 01  NOP $0100
  $915C: 00        BRK
  $915D: 24 01     BIT $01
  $915F: 26 02     ROL $02
  $9161: 2C 03 2E  BIT $2e03
  $9164: 00        BRK
  $9165: 03 00     SLO ($00,X)
  $9167: 16 00     ASL $00,X
  $9169: 29 0D     AND #$0d
  $916B: 00        BRK
  $916C: 0F 00 25  SLO $2500
  $916F: 01 27     ORA ($27,X)
  $9171: 03 2D     SLO ($2d,X)
  $9173: 03 2F     SLO ($2f,X)
  $9175: 00        BRK
  $9176: 15 00     ORA $00,X
  $9178: 17 00     SLO $00,X
  $917A: 1A        NOP
  $917B: 02        ???
  $917C: 92        ???
  $917D: 19 02 1B  ORA $1b02,Y
  $9180: 02        ???
  $9181: A1 1E     LDA ($1e,X)
  $9183: 00        BRK
  $9184: 00        BRK
  $9185: 00        BRK
  $9186: 00        BRK
  $9187: 90 FF     BCC $9188
  $9189: 90 FF     BCC $918a
  $918B: 90 FF     BCC $918c
  $918D: 90 FF     BCC $918e
  $918F: 90 FF     BCC $9190
  $9191: 87 FF     SAX $ff
  $9193: 04 05     NOP $05
  $9195: 87 FF     SAX $ff
  $9197: 86 FF     STX $ff
  $9199: 08        PHP
  $919A: 09 0A     ORA #$0a
  $919C: 87 FF     SAX $ff
  $919E: 88        DEY
  $919F: FF 0B 87  ISB $870b,X
  $91A2: FF 86 FF  ISB $ff86,X
  $91A5: 0C 89 FF  NOP $ff89
  $91A8: 86 FF     STX $ff
  $91AA: 0E 0D FF  ASL $ff0d
  $91AD: FF 10 85  ISB $8510,X
  $91B0: FF 86 FF  ISB $ff86,X
  $91B3: 0F FF FF  SLO $ffff
  $91B6: FF 12 13  ISB $1312,X
  $91B9: 84 FF     STY $ff
  $91BB: 90 FF     BCC $91bc
  $91BD: 90 FF     BCC $91be
  $91BF: 90 FF     BCC $91c0
  $91C1: FF FF FF  ISB $ffff,X
  $91C4: FF FF FF  ISB $ffff,X
  $91C7: FF FF FF  ISB $ffff,X
  $91CA: B7 BD     LAX $bd,Y
  $91CC: FF FF FB  ISB $fbff,X
  $91CF: FB FF A4  ISB $a4ff,Y
  $91D2: D8        CLD
  $91D3: 01 CC     ORA ($cc,X)
  $91D5: 01 DE     ORA ($de,X)
  $91D7: 01 CE     ORA ($ce,X)
  $91D9: 01 A4     ORA ($a4,X)
  $91DB: D9 01 CD  CMP $cd01,Y
  $91DE: 01 DF     ORA ($df,X)
  $91E0: 01 CF     ORA ($cf,X)
  $91E2: 01 A4     ORA ($a4,X)
  $91E4: D9 41 CD  CMP $cd41,Y
  $91E7: 41 C8     EOR ($c8,X)
  $91E9: 01 DA     ORA ($da,X)
  $91EB: 01 A4     ORA ($a4,X)
  $91ED: F7 01     ISB $01,X
  $91EF: F0 01     BEQ $91f2
  $91F1: C9 01     CMP #$01
  $91F3: DB 01 92  DCP $9201,Y
  $91F6: E2 05     NOP #$05
  $91F8: F1 01     SBC ($01),Y
  $91FA: 92        ???
  $91FB: E3 01     ISB ($01,X)
  $91FD: E0 01     CPX #$01
  $91FF: 82 ED     NOP #$ed
  $9201: 03 E6     SLO ($e6,X)
  $9203: 07 64     SLO $64
  $9205: EB 00     SBC #$00
  $9207: FE 00 F8  INC $f800,X
  $920A: 00        BRK
  $920B: E7 03     ISB $03
  $920D: 49 AE     EOR #$ae
  $920F: 00        BRK
  $9210: BB 00 EE  LAS $ee00,Y
  $9213: 00        BRK
  $9214: C7 00     DCP $00
  $9216: F9 03 F2  SBC $f203,Y
  $9219: 03 E4     SLO ($e4,X)
  $921B: 02        ???
  $921C: F4 02     NOP $02,X
  $921E: CA        DEX
  $921F: 01 39     ORA ($39,X)
  $9221: BC 04 BE  LDY $be04,X
  $9224: 02        ???
  $9225: EF 00 E8  ISB $e800
  $9228: 00        BRK
  $9229: FC 00 F3  NOP $f300,X
  $922C: 00        BRK
  $922D: E1 02     SBC ($02,X)
  $922F: F5 02     SBC $02,X
  $9231: CB 01     AXS #$01
  $9233: 37 BD     RLA $bd,X
  $9235: 04 BF     NOP $bf
  $9237: 02        ???
  $9238: FA        NOP
  $9239: 00        BRK
  $923A: E9 00     SBC #$00
  $923C: FD 00 F6  SBC $f600,X
  $923F: 01 E5     ORA ($e5,X)
  $9241: 02        ???
  $9242: 35 AA     AND $aa,X
  $9244: 00        BRK
  $9245: AF 00 EA  LAX $ea00
  $9248: 00        BRK
  $9249: FB 00 EC  ISB $ec00,Y
  $924C: 00        BRK
  $924D: 14 AC     NOP $ac,X
  $924F: 00        BRK
  $9250: B8        CLV
  $9251: 00        BRK
  $9252: AB 00     ATX #$00
  $9254: BA        TSX
  $9255: 00        BRK
  $9256: 12        ???
  $9257: AD 00 B9  LDA $b900
  $925A: 00        BRK
  $925B: 80 80     NOP #$80
  $925D: 90 FF     BCC $925e
  $925F: 8C FF 00  STY $00ff
  $9262: 00        BRK
  $9263: FF FF 8C  ISB $8cff,X
  $9266: FF 00 00  ISB $0000,X
  $9269: FF FF 89  ISB $89ff,X
  $926C: FF 84 00  ISB $0084,X
  $926F: FF FF FF  ISB $ffff,X
  $9272: 88        DEY
  $9273: FF 85 00  ISB $0085,X
  $9276: FF FF FF  ISB $ffff,X
  $9279: 83 00     SAX ($00,X)
  $927B: 85 FF     STA $ff
  $927D: 84 00     STY $00
  $927F: 84 FF     STY $ff
  $9281: 87 15     SAX $15
  $9283: 85 00     STA $00
  $9285: 84 15     STY $15
  $9287: 87 15     SAX $15
  $9289: 85 00     STA $00
  $928B: 84 15     STY $15
  $928D: 86 17     STX $17
  $928F: 85 00     STA $00
  $9291: 85 17     STA $17
  $9293: 16 16     ASL $16,X
  $9295: 18        CLC
  $9296: 16 87     ASL $87,X
  $9298: 00        BRK
  $9299: 16 16     ASL $16,X
  $929B: 18        CLC
  $929C: 16 16     ASL $16,X
  $929E: 83 00     SAX ($00,X)
  $92A0: 00        BRK
  $92A1: 03 00     SLO ($00,X)
  $92A3: 19 16 00  ORA $0016,Y
  $92A6: 00        BRK
  $92A7: 00        BRK
  $92A8: 85 16     STA $16
  $92AA: 85 00     STA $00
  $92AC: 16 18     ASL $18,X
  $92AE: 16 00     ASL $00,X
  $92B0: 00        BRK
  $92B1: 16 18     ASL $18,X
  $92B3: 84 16     STY $16
  $92B5: 84 00     STY $00
  $92B7: 84 16     STY $16
  $92B9: 00        BRK
  $92BA: 00        BRK
  $92BB: 86 16     STX $16
  $92BD: 84 00     STY $00
  $92BF: 8C 16 00  STY $0016
  $92C2: 00        BRK
  $92C3: 00        BRK
  $92C4: 00        BRK
  $92C5: 00        BRK
  $92C6: 00        BRK
  $92C7: 00        BRK
  $92C8: 00        BRK
  $92C9: 50 50     BVC $931b
  $92CB: 50 50     BVC $931d
  $92CD: 00        BRK
  $92CE: 55 55     EOR $55,X
  $92D0: 55 03     EOR $03,X
  $92D2: 43 00     SRE ($00,X)
  $92D4: 41 00     EOR ($00,X)
  $92D6: 43 00     SRE ($00,X)
  $92D8: 00        BRK
  $92D9: 00        BRK
  $92DA: 33 95     RLA ($95),Y
  $92DC: 10 B5     BPL $9293
  $92DE: 00        BRK
  $92DF: B2        ???
  $92E0: 01 16     ORA ($16,X)
  $92E2: 81 00     STA ($00,X)
  $92E4: 91 00     STA ($00),Y
  $92E6: 82 00     NOP #$00
  $92E8: 97 0C     SAX $0c,Y
  $92EA: A2 00     LDX #$00
  $92EC: B3 01     LAX ($01),Y
  $92EE: 18        CLC
  $92EF: 84 04     STY $04
  $92F1: 83 02     SAX ($02,X)
  $92F3: 88        DEY
  $92F4: 03 9C     SLO ($9c,X)
  $92F6: 00        BRK
  $92F7: 8F 00 A1  SAX $a100
  $92FA: 02        ???
  $92FB: A3 00     LAX ($00,X)
  $92FD: B6 01     LDX $01,Y
  $92FF: 16 85     ASL $85,X
  $9301: 04 86     NOP $86
  $9303: 02        ???
  $9304: 89 03     NOP #$03
  $9306: 9D 00 9A  STA $9a00,X
  $9309: 00        BRK
  $930A: A4 02     LDY $02
  $930C: 07 80     SLO $80
  $930E: 08        PHP
  $930F: 87 02     SAX $02
  $9311: 8C 00 8A  STY $8a00
  $9314: 00        BRK
  $9315: 9A        TXS
  $9316: 40        RTI
  $9317: A5 07     LDA $07
  $9319: B7 01     LAX $01,Y
  $931B: 07 80     SLO $80
  $931D: 08        PHP
  $931E: 92        ???
  $931F: 02        ???
  $9320: 8D 03 8B  STA $8b03
  $9323: 03 9B     SLO ($9b,X)
  $9325: 02        ???
  $9326: B0 06     BCS $932e
  $9328: A8        TAY
  $9329: 01 16     ORA ($16,X)
  $932B: 90 08     BCC $9335
  $932D: 98        TYA
  $932E: 02        ???
  $932F: 8E 02 9E  STX $9e02
  $9332: 06 A6     ASL $a6
  $9334: 00        BRK
  $9335: 44 01     NOP $01
  $9337: 24 94     BIT $94
  $9339: 00        BRK
  $933A: 93 08     ??? ($08),Y
  $933C: 9F 08 45  ??? $4508,Y
  $933F: 01 36     ORA ($36,X)
  $9341: 96 00     STX $00,Y
  $9343: 99 00 99  STA $9900,Y
  $9346: 00        BRK
  $9347: A0 04     LDY #$04
  $9349: A6 40     LDX $40
  $934B: 44 41     NOP $41
  $934D: 81 A7     STA ($a7,X)
  $934F: 00        BRK
  $9350: 82 A1     NOP #$a1
  $9352: C1 50     CMP ($50,X)
  $9354: 01 01     ORA ($01,X)
  $9356: 43 40     SRE ($40,X)
  $9358: 02        ???
  $9359: 40        RTI
  $935A: 00        BRK
  $935B: 43 40     SRE ($40,X)
  $935D: 87 FF     SAX $ff
  $935F: 00        BRK
  $9360: 00        BRK
  $9361: 87 FF     SAX $ff
  $9363: 84 FF     STY $ff
  $9365: 86 00     STX $00
  $9367: 86 FF     STX $ff
  $9369: 84 FF     STY $ff
  $936B: 87 00     SAX $00
  $936D: 85 FF     STA $ff
  $936F: 83 FF     SAX ($ff,X)
  $9371: 89 00     NOP #$00
  $9373: 84 FF     STY $ff
  $9375: 84 FF     STY $ff
  $9377: 88        DEY
  $9378: 00        BRK
  $9379: 84 FF     STY $ff
  $937B: 85 FF     STA $ff
  $937D: 87 00     SAX $00
  $937F: 84 FF     STY $ff
  $9381: 85 FF     STA $ff
  $9383: 87 00     SAX $00
  $9385: 84 FF     STY $ff
  $9387: 85 FF     STA $ff
  $9389: 84 00     STY $00
  $938B: 11 14     ORA ($14),Y
  $938D: 02        ???
  $938E: 84 FF     STY $ff
  $9390: 83 FF     SAX ($ff,X)
  $9392: 83 00     SAX ($00,X)
  $9394: 83 03     SAX ($03,X)
  $9396: 00        BRK
  $9397: 03 83     SLO ($83,X)
  $9399: 00        BRK
  $939A: FF FF FF  ISB $ffff,X
  $939D: FF 06 83  ISB $8306,X
  $93A0: 00        BRK
  $93A1: 87 03     SAX $03
  $93A3: 07 FF     SLO $ff
  $93A5: FF 90 00  ISB $0090,X
  $93A8: 90 00     BCC $93aa
  $93AA: 90 00     BCC $93ac
  $93AC: 90 00     BCC $93ae
  $93AE: 00        BRK
  $93AF: 00        BRK
  $93B0: 00        BRK
  $93B1: 00        BRK
  $93B2: 00        BRK
  $93B3: 00        BRK
  $93B4: 00        BRK
  $93B5: 00        BRK
  $93B6: 80 00     NOP #$00
  $93B8: 05 20     ORA $20
  $93BA: 00        BRK
  $93BB: 00        BRK
  $93BC: 00        BRK
  $93BD: 00        BRK
  $93BE: 02        ???
  $93BF: 40        RTI
  $93C0: 00        BRK
  $93C1: 43 00     SRE ($00,X)
  $93C3: 01 43     ORA ($43,X)
  $93C5: 00        BRK
  $93C6: 00        BRK
  $93C7: 00        BRK
  $93C8: 25 62     AND $62
  $93CA: 00        BRK
  $93CB: 63 00     RRA ($00,X)
  $93CD: 6D 0C C2  ADC $c20c
  $93D0: 00        BRK
  $93D1: C6 00     DEC $00
  $93D3: 16 60     ASL $60,X
  $93D5: 04 66     NOP $66
  $93D7: 01 78     ORA ($78,X)
  $93D9: 02        ???
  $93DA: 6B 00     ARR #$00
  $93DC: 7E 04 D7  ROR $d704,X
  $93DF: 00        BRK
  $93E0: 17 61     SLO $61,X
  $93E2: 04 67     NOP $67
  $93E4: 01 79     ORA ($79,X)
  $93E6: 01 6E     ORA ($6e,X)
  $93E8: 00        BRK
  $93E9: 7F 00 C5  RRA $c500,X
  $93EC: 00        BRK
  $93ED: C3 00     DCP ($00,X)
  $93EF: 17 61     SLO $61,X
  $93F1: 44 68     NOP $68
  $93F3: 02        ???
  $93F4: 7C 02 6F  NOP $6f02,X
  $93F7: 00        BRK
  $93F8: C0 01     CPY #$01
  $93FA: D0 01     BNE $93fd
  $93FC: C3 40     DCP ($40,X)
  $93FE: 16 60     ASL $60,X
  $9400: 44 69     NOP $69
  $9402: 01 7D     ORA ($7d,X)
  $9404: 01 7A     ORA ($7a,X)
  $9406: 01 C1     ORA ($c1,X)
  $9408: 01 D1     ORA ($d1,X)
  $940A: 01 26     ORA ($26,X)
  $940C: 62        ???
  $940D: 40        RTI
  $940E: 6C 01 6A  JMP ($6a01)
  $9411: 01 7B     ORA ($7b,X)
  $9413: 01 C4     ORA ($c4,X)
  $9415: 01 D4     ORA ($d4,X)
  $9417: 01 71     ORA ($71,X)
  $9419: D5 00     CMP $00,X
  $941B: 81 D7     STA ($d7,X)
  $941D: 40        RTI
  $941E: 82 C2     NOP #$c2
  $9420: 40        RTI
  $9421: C6 40     DEC $40
  $9423: 00        BRK
  $9424: 02        ???
  $9425: 41 40     EOR ($40,X)
  $9427: 41 40     EOR ($40,X)
  $9429: 03 40     SLO ($40,X)
  $942B: 00        BRK
  $942C: 41 40     EOR ($40,X)
  $942E: 43 40     SRE ($40,X)
  $9430: 90 FF     BCC $9431
  $9432: 85 FF     STA $ff
  $9434: 84 00     STY $00
  $9436: 87 FF     SAX $ff
  $9438: 84 FF     STY $ff
  $943A: 86 00     STX $00
  $943C: 86 FF     STX $ff
  $943E: 84 FF     STY $ff
  $9440: 86 00     STX $00
  $9442: 86 FF     STX $ff
  $9444: 84 FF     STY $ff
  $9446: 86 00     STX $00
  $9448: 86 FF     STX $ff
  $944A: 85 FF     STA $ff
  $944C: 85 00     STA $00
  $944E: 86 FF     STX $ff
  $9450: 85 FF     STA $ff
  $9452: 85 00     STA $00
  $9454: 86 FF     STX $ff
  $9456: 86 FF     STX $ff
  $9458: 85 00     STA $00
  $945A: 85 FF     STA $ff
  $945C: 83 00     SAX ($00,X)
  $945E: FF 89 00  ISB $0089,X
  $9461: 83 FF     SAX ($ff,X)
  $9463: 84 15     STY $15
  $9465: 89 00     NOP #$00
  $9467: 83 15     SAX ($15,X)
  $9469: 90 00     BCC $946b
  $946B: 90 00     BCC $946d
  $946D: 90 00     BCC $946f
  $946F: 90 00     BCC $9471
  $9471: 00        BRK
  $9472: 00        BRK
  $9473: 00        BRK
  $9474: 00        BRK
  $9475: 00        BRK
  $9476: 00        BRK
  $9477: 00        BRK
  $9478: 00        BRK
  $9479: 00        BRK
  $947A: 00        BRK
  $947B: 00        BRK
  $947C: 00        BRK
  $947D: 00        BRK
  $947E: 00        BRK
  $947F: 00        BRK
  $9480: 00        BRK
  $9481: 00        BRK
  $9482: 00        BRK
  $9483: 00        BRK
  $9484: 41 1C     EOR ($1c,X)
  $9486: 0C 42 1D  NOP $1d42
  $9489: 00        BRK
  $948A: 1F 00 42  SLO $4200,X
  $948D: 48        PHA
  $948E: 00        BRK
  $948F: 4A        LSR A
  $9490: 00        BRK
  $9491: 42        ???
  $9492: 49 00     EOR #$00
  $9494: 4B 00     ALR #$00
  $9496: 43 4C     SRE ($4c,X)
  $9498: 00        BRK
  $9499: 4E 00 64  LSR $6400
  $949C: 00        BRK
  $949D: 43 4D     SRE ($4d,X)
  $949F: 00        BRK
  $94A0: 4F 00 65  SRE $6500
  $94A3: 00        BRK
  $94A4: 43 58     SRE ($58,X)
  $94A6: 00        BRK
  $94A7: 5A        NOP
  $94A8: 00        BRK
  $94A9: 70 00     BVS $94ab
  $94AB: 35 53     AND $53,X
  $94AD: 00        BRK
  $94AE: 59 00 5B  EOR $5b00,Y
  $94B1: 00        BRK
  $94B2: 71 00     ADC ($00),Y
  $94B4: 73 00     RRA ($00),Y
  $94B6: 34 56     NOP $56,X
  $94B8: 04 5E     NOP $5e
  $94BA: 00        BRK
  $94BB: 74 00     NOP $00,X
  $94BD: 76 00     ROR $00,X
  $94BF: 00        BRK
  $94C0: 00        BRK
  $94C1: 00        BRK
  $94C2: 00        BRK
  $94C3: 90 00     BCC $94c5
  $94C5: 90 00     BCC $94c7
  $94C7: 00        BRK
  $94C8: 00        BRK
  $94C9: 8C FF 00  STY $00ff
  $94CC: 00        BRK
  $94CD: 00        BRK
  $94CE: 00        BRK
  $94CF: 8C FF 00  STY $00ff
  $94D2: 00        BRK
  $94D3: 00        BRK
  $94D4: 00        BRK
  $94D5: 8C FF 00  STY $00ff
  $94D8: 00        BRK
  $94D9: 00        BRK
  $94DA: 00        BRK
  $94DB: 8C FF 00  STY $00ff
  $94DE: 00        BRK
  $94DF: 00        BRK
  $94E0: 00        BRK
  $94E1: 8C FF 00  STY $00ff
  $94E4: 00        BRK
  $94E5: 00        BRK
  $94E6: 00        BRK
  $94E7: 8B FF     XAA #$ff
  $94E9: 1D 00 00  ORA $0000,X
  $94EC: 00        BRK
  $94ED: 00        BRK
  $94EE: 20 21 88  JSR $8821
  $94F1: FF 1C 1F  ISB $1f1c,X
  $94F4: 00        BRK
  $94F5: 00        BRK
  $94F6: 00        BRK
  $94F7: 00        BRK
  $94F8: 20 23 88  JSR $8823
  $94FB: FF 1E 1F  ISB $1f1e,X
  $94FE: 00        BRK
  $94FF: 00        BRK
  $9500: 90 00     BCC $9502
  $9502: 90 00     BCC $9504
  $9504: 90 00     BCC $9506
  $9506: 90 00     BCC $9508
  $9508: 00        BRK
  $9509: 00        BRK
  $950A: 00        BRK
  $950B: 00        BRK
  $950C: 00        BRK
  $950D: 00        BRK
  $950E: 00        BRK
  $950F: 00        BRK
  $9510: 00        BRK
  $9511: 00        BRK
  $9512: 00        BRK
  $9513: 00        BRK
  $9514: 00        BRK
  $9515: 00        BRK
  $9516: 00        BRK
  $9517: 00        BRK
  $9518: 30 D5     BMI $94ef
  $951A: 67 D5     RRA $d5
  $951C: 99 D5 CA  STA $cad5,Y
  $951F: D5 FC     CMP $fc,X
  $9521: D5 35     CMP $35,X
  $9523: D6 63     DEC $63,X
  $9525: D6 96     DEC $96,X
  $9527: D6 FC     DEC $fc,X
  $9529: D6 B5     DEC $b5,X
  $952B: D6 1F     DEC $1f,X
  $952D: D7 00     DCP $00,X
  $952F: 00        BRK
  $9530: 02        ???
  $9531: AE 20 A1  LDX $a120
  $9534: A8        TAY
  $9535: 16 C6     ASL $c6,X
  $9537: 20 80 81  JSR $8180
  $953A: 84 85     STY $85
  $953C: 90 00     BCC $953e
  $953E: 94 84     STY $84,X
  $9540: C0 C1     CPY #$c1
  $9542: C4 84     CPY $84
  $9544: D0 D1     BNE $9517
  $9546: D4 D5     NOP $d5,X
  $9548: AA        TAX
  $9549: AB AE     ATX #$ae
  $954B: AF BA BB  LAX $bbba
  $954E: 15 E6     ORA $e6,X
  $9550: 20 82 83  JSR $8382
  $9553: 83 87     SAX ($87,X)
  $9555: 92        ???
  $9556: 93 96     ??? ($96),Y
  $9558: 97 C2     SAX $c2,Y
  $955A: C3 C6     DCP ($c6,X)
  $955C: C6 D2     DEC $d2
  $955E: D3 D6     DCP ($d6),Y
  $9560: D7 BE     DCP $be,X
  $9562: BF EA EB  LAX $ebea,Y
  $9565: EE 00 16  INC $1600
  $9568: 05 21     ORA $21
  $956A: 86 88     STX $88
  $956C: 83 8C     SAX ($8c,X)
  $956E: 8D 98 99  STA $9998
  $9571: 9C 9D C8  SHY $c89d,X
  $9574: C9 83     CMP #$83
  $9576: 83 D8     SAX ($d8,X)
  $9578: D9 DC DD  CMP $dddc,Y
  $957B: EF FA FB  ISB $fbfa
  $957E: FE 01 15  INC $1501,X
  $9581: 25 21     AND $21
  $9583: 89 8A     NOP #$8a
  $9585: 83 8E     SAX ($8e,X)
  $9587: 8F 83 83  SAX $8383
  $958A: 9E 9F CA  SHX $ca9f,Y
  $958D: CB CE     AXS #$ce
  $958F: CF DA DB  DCP $dbda
  $9592: DE 83 91  DEC $9183,X
  $9595: 9A        TXS
  $9596: 9B 95 00  TAS $0095,Y
  $9599: 15 45     ORA $45,X
  $959B: 21 82     AND ($82,X)
  $959D: 83 83     SAX ($83,X)
  $959F: A4 A5     LDY $a5
  $95A1: B0 B1     BCS $9554
  $95A3: B4 B5     LDY $b5,X
  $95A5: E0 E1     CPX #$e1
  $95A7: E4 E5     CPX $e5
  $95A9: F0 F1     BEQ $959c
  $95AB: F4 F5     NOP $f5,X
  $95AD: AD B6 BC  LDA $bcb6
  $95B0: C5 15     CMP $15
  $95B2: 65 21     ADC $21
  $95B4: 8B A2     XAA #$a2
  $95B6: A3 A6     LAX ($a6,X)
  $95B8: A7 B2     LAX $b2
  $95BA: B3 83     LAX ($83),Y
  $95BC: B7 E2     LAX $e2,Y
  $95BE: 83 E6     SAX ($e6,X)
  $95C0: E7 83     ISB $83
  $95C2: F3 F6     ISB ($f6),Y
  $95C4: 83 C7     SAX ($c7,X)
  $95C6: 83 CC     SAX ($cc,X)
  $95C8: CD 00 15  CMP $1500
  $95CB: 85 21     STA $21
  $95CD: A0 F8     LDY #$f8
  $95CF: A9 AC     LDA #$ac
  $95D1: F8        SED
  $95D2: B8        CLV
  $95D3: B9 F8 BD  LDA $bdf8,Y
  $95D6: E8        INX
  $95D7: E9 EC     SBC #$ec
  $95D9: ED F8 F9  SBC $f9f8
  $95DC: FC FD DF  NOP $dffd,X
  $95DF: E3 F2     ISB ($f2,X)
  $95E1: F7 16     ISB $16,X
  $95E3: C9 23     CMP #$23
  $95E5: 50 50     BVC $9637
  $95E7: 54 50     NOP $50,X
  $95E9: 50 50     BVC $963b
  $95EB: 50 00     BVC $95ed
  $95ED: 55 55     EOR $55,X
  $95EF: 55 55     EOR $55,X
  $95F1: 55 55     EOR $55,X
  $95F3: 55 00     EOR $00,X
  $95F5: 05 05     ORA $05
  $95F7: 05 05     ORA $05
  $95F9: 05 05     ORA $05
  $95FB: 00        BRK
  $95FC: 08        PHP
  $95FD: 0C 22 74  NOP $7422
  $9600: 5E 73 74  LSR $7473,X
  $9603: 00        BRK
  $9604: 3C 46 46  NOP $4646,X
  $9607: 08        PHP
  $9608: 4C 22 73  JMP $7322
  $960B: 3C 75 78  NOP $7875,X
  $960E: 5E 75 79  LSR $7975,X
  $9611: 45 01     EOR $01
  $9613: 84 22     STY $22
  $9615: 24 1B     BIT $1b
  $9617: A1 22     LDA ($22,X)
  $9619: 70 00     BVS $961b
  $961B: 3B 3C 5E  RLA $5e3c,Y
  $961E: 73 49     RRA ($49),Y
  $9620: 5E 00 78  LSR $7800,X
  $9623: 71 74     ADC ($74),Y
  $9625: 71 49     ADC ($49),Y
  $9627: 71 2E     ADC ($2e),Y
  $9629: 49 5E     EOR #$5e
  $962B: 22        ???
  $962C: 2E 49 79  ROL $7949
  $962F: 45 5E     EOR $5e
  $9631: 2E 49 71  ROL $7149
  $9634: 00        BRK
  $9635: 0C AA 21  NOP $21aa
  $9638: 00        BRK
  $9639: 00        BRK
  $963A: 00        BRK
  $963B: 00        BRK
  $963C: 00        BRK
  $963D: 00        BRK
  $963E: 00        BRK
  $963F: 00        BRK
  $9640: 00        BRK
  $9641: 00        BRK
  $9642: 00        BRK
  $9643: 00        BRK
  $9644: 0C CA 21  NOP $21ca
  $9647: 00        BRK
  $9648: 00        BRK
  $9649: 00        BRK
  $964A: 00        BRK
  $964B: 00        BRK
  $964C: 00        BRK
  $964D: 00        BRK
  $964E: 00        BRK
  $964F: 00        BRK
  $9650: 00        BRK
  $9651: 00        BRK
  $9652: 00        BRK
  $9653: 0C EA 21  NOP $21ea
  $9656: 00        BRK
  $9657: 00        BRK
  $9658: 00        BRK
  $9659: 00        BRK
  $965A: 00        BRK
  $965B: 00        BRK
  $965C: 00        BRK
  $965D: 00        BRK
  $965E: 00        BRK
  $965F: 00        BRK
  $9660: 00        BRK
  $9661: 00        BRK
  $9662: 00        BRK
  $9663: 1B E3 22  SLO $22e3,Y
  $9666: 78        SEI
  $9667: 56 00     LSR $00,X
  $9669: 78        SEI
  $966A: 3C 74 3B  NOP $3b74,X
  $966D: 3C 00 73  NOP $7300,X
  $9670: 49 76     EOR #$76
  $9672: 65 66     ADC $66
  $9674: 22        ???
  $9675: 78        SEI
  $9676: 2E 79 73  ROL $7379
  $9679: 49 5E     EOR #$5e
  $967B: 44 71     NOP $71
  $967D: 00        BRK
  $967E: 31 3D     AND ($3d),Y
  $9680: 3C 0C 2A  NOP $2a0c,X
  $9683: 23 70     RLA ($70,X)
  $9685: 00        BRK
  $9686: 78        SEI
  $9687: 45 73     EOR $73
  $9689: 4D 3C 00  EOR $003c
  $968C: 65 6D     ADC $6d
  $968E: 6C 6C 02  JMP ($026c)
  $9691: F3 23     ISB ($23),Y
  $9693: 0A        ASL A
  $9694: 02        ???
  $9695: 00        BRK
  $9696: 01 4A     ORA ($4a,X)
  $9698: 22        ???
  $9699: 00        BRK
  $969A: 0F 69 22  SLO $2269
  $969D: 00        BRK
  $969E: 00        BRK
  $969F: 00        BRK
  $96A0: 00        BRK
  $96A1: 00        BRK
  $96A2: 00        BRK
  $96A3: 00        BRK
  $96A4: 00        BRK
  $96A5: 00        BRK
  $96A6: 00        BRK
  $96A7: 00        BRK
  $96A8: 00        BRK
  $96A9: 00        BRK
  $96AA: 00        BRK
  $96AB: 00        BRK
  $96AC: 01 8B     ORA ($8b,X)
  $96AE: 22        ???
  $96AF: 00        BRK
  $96B0: 01 93     ORA ($93,X)
  $96B2: 22        ???
  $96B3: 00        BRK
  $96B4: 00        BRK
  $96B5: 20 E0 21  JSR $21e0
  $96B8: FF FF FF  ISB $ffff,X
  $96BB: FF FF FF  ISB $ffff,X
  $96BE: FF FF FF  ISB $ffff,X
  $96C1: FF FF FF  ISB $ffff,X
  $96C4: FF FF FF  ISB $ffff,X
  $96C7: FF FF FF  ISB $ffff,X
  $96CA: FF FF FF  ISB $ffff,X
  $96CD: FF FF FF  ISB $ffff,X
  $96D0: FF FF FF  ISB $ffff,X
  $96D3: FF FF FF  ISB $ffff,X
  $96D6: FF FF 20  ISB $20ff,X
  $96D9: E0 25     CPX #$25
  $96DB: FF FF FF  ISB $ffff,X
  $96DE: FF FF FF  ISB $ffff,X
  $96E1: FF FF FF  ISB $ffff,X
  $96E4: FF FF FF  ISB $ffff,X
  $96E7: FF FF FF  ISB $ffff,X
  $96EA: FF FF FF  ISB $ffff,X
  $96ED: FF FF FF  ISB $ffff,X
  $96F0: FF FF FF  ISB $ffff,X
  $96F3: FF FF FF  ISB $ffff,X
  $96F6: FF FF FF  ISB $ffff,X
  $96F9: FF FF 00  ISB $00ff,X
  $96FC: 08        PHP
  $96FD: D8        CLD
  $96FE: 23 AA     RLA ($aa,X)
  $9700: A5 A5     LDA $a5
  $9702: A5 A5     LDA $a5
  $9704: A5 A5     LDA $a5
  $9706: A5 08     LDA $08
  $9708: D8        CLD
  $9709: 27 AA     RLA $aa
  $970B: A5 A5     LDA $a5
  $970D: A5 A5     LDA $a5
  $970F: A5 A5     LDA $a5
  $9711: A5 01     LDA $01
  $9713: C0 23     CPY #$23
  $9715: AA        TAX
  $9716: 01 C8     ORA ($c8,X)
  $9718: 23 AA     RLA ($aa,X)
  $971A: 01 D0     ORA ($d0,X)
  $971C: 23 AA     RLA ($aa,X)
  $971E: 00        BRK
  $971F: 01 00     ORA ($00,X)
  $9721: 20 FF 01  JSR $01ff
  $9724: 20 20 FF  JSR $ff20
  $9727: 01 40     ORA ($40,X)
  $9729: 20 FF 01  JSR $01ff
  $972C: 60        RTS
  $972D: 20 FF 01  JSR $01ff
  $9730: 80 20     NOP #$20
  $9732: FF 01 A0  ISB $a001,X
  $9735: 20 FF 01  JSR $01ff
  $9738: C0 20     CPY #$20
  $973A: FF 01 E0  ISB $e001,X
  $973D: 20 FF 01  JSR $01ff
  $9740: 00        BRK
  $9741: 21 FF     AND ($ff,X)
  $9743: 01 20     ORA ($20,X)
  $9745: 21 FF     AND ($ff,X)
  $9747: 01 40     ORA ($40,X)
  $9749: 21 FF     AND ($ff,X)
  $974B: 01 60     ORA ($60,X)
  $974D: 21 FF     AND ($ff,X)
  $974F: 01 80     ORA ($80,X)
  $9751: 21 FF     AND ($ff,X)
  $9753: 01 A0     ORA ($a0,X)
  $9755: 21 FF     AND ($ff,X)
  $9757: 01 C0     ORA ($c0,X)
  $9759: 21 FF     AND ($ff,X)
  $975B: 00        BRK
  $975C: 7C D7 BF  NOP $bfd7,X
  $975F: D7 09     DCP $09,X
  $9761: D8        CLD
  $9762: 55 D8     EOR $d8,X
  $9764: AB D8     ATX #$d8
  $9766: EC D8 2F  CPX $2fd8
  $9769: D9 76 D9  CMP $d976,Y
  $976C: C5 D9     CMP $d9
  $976E: 08        PHP
  $976F: DA        NOP
  $9770: 52        ???
  $9771: DA        NOP
  $9772: 52        ???
  $9773: DA        NOP
  $9774: 52        ???
  $9775: DA        NOP
  $9776: 8D DA 8D  STA $8dda
  $9779: DA        NOP
  $977A: 8D DA F4  STA $f4da
  $977D: F4 E2     NOP $e2,X
  $977F: 18        CLC
  $9780: 04 04     NOP $04
  $9782: 14 04     NOP $04,X
  $9784: 04 14     NOP $14
  $9786: 83 04     SAX ($04,X)
  $9788: 14 04     NOP $04,X
  $978A: 14 04     NOP $04,X
  $978C: 04 19     NOP $19
  $978E: E2 00     NOP #$00
  $9790: 18        CLC
  $9791: 10 EE     BPL $9781
  $9793: 11 19     ORA ($19),Y
  $9795: 00        BRK
  $9796: 00        BRK
  $9797: 06 F0     ASL $f0
  $9799: 07 00     SLO $00
  $979B: 1C 1D F0  NOP $f01d,X
  $979E: 07 00     SLO $00
  $97A0: 00        BRK
  $97A1: 06 F0     ASL $f0
  $97A3: 07 00     SLO $00
  $97A5: 00        BRK
  $97A6: 1A        NOP
  $97A7: 12        ???
  $97A8: EE 13 1B  INC $1b13
  $97AB: 00        BRK
  $97AC: E2 1A     NOP #$1a
  $97AE: 05 16     ORA $16
  $97B0: 05 05     ORA $05
  $97B2: 16 83     ASL $83,X
  $97B4: 05 16     ORA $16
  $97B6: 83 05     SAX ($05,X)
  $97B8: 16 05     ASL $05,X
  $97BA: 1B E2 F4  SLO $f4e2,Y
  $97BD: F4 F4     NOP $f4,X
  $97BF: F4 F4     NOP $f4,X
  $97C1: E3 18     ISB ($18,X)
  $97C3: 04 14     NOP $14
  $97C5: 04 14     NOP $14
  $97C7: 04 04     NOP $04
  $97C9: 14 04     NOP $04,X
  $97CB: 14 04     NOP $04,X
  $97CD: 04 14     NOP $14
  $97CF: 19 E3 E2  ORA $e2e3,Y
  $97D2: 18        CLC
  $97D3: 10 EC     BPL $97c1
  $97D5: 11 14     ORA ($14),Y
  $97D7: 19 00 00  ORA $0000,Y
  $97DA: 18        CLC
  $97DB: 10 EF     BPL $97cc
  $97DD: 15 00     ORA $00,X
  $97DF: 1C 1D F0  NOP $f01d,X
  $97E2: 07 00     SLO $00
  $97E4: 00        BRK
  $97E5: 06 F0     ASL $f0
  $97E7: 15 00     ORA $00,X
  $97E9: 00        BRK
  $97EA: 1A        NOP
  $97EB: 12        ???
  $97EC: EF 07 00  ISB $0007
  $97EF: E2 1A     NOP #$1a
  $97F1: 12        ???
  $97F2: EE 15 00  INC $0015
  $97F5: E3 1A     ISB ($1a,X)
  $97F7: 16 05     ASL $05,X
  $97F9: 16 05     ASL $05,X
  $97FB: 05 16     ORA $16
  $97FD: 05 05     ORA $05
  $97FF: 16 05     ASL $05,X
  $9801: 16 05     ASL $05,X
  $9803: 05 16     ORA $16
  $9805: 1B 00 F4  SLO $f400,Y
  $9808: F4 F4     NOP $f4,X
  $980A: E2 18     NOP #$18
  $980C: 14 04     NOP $04,X
  $980E: 04 14     NOP $14
  $9810: 14 04     NOP $04,X
  $9812: 04 14     NOP $14
  $9814: 04 04     NOP $04
  $9816: 14 04     NOP $04,X
  $9818: 14 14     NOP $14,X
  $981A: 04 19     NOP $19
  $981C: 00        BRK
  $981D: 00        BRK
  $981E: 18        CLC
  $981F: 10 EF     BPL $9810
  $9821: 07 00     SLO $00
  $9823: 00        BRK
  $9824: 06 F0     ASL $f0
  $9826: 07 00     SLO $00
  $9828: 00        BRK
  $9829: 17 F0     SLO $f0,X
  $982B: 15 00     ORA $00,X
  $982D: 1C 1D F0  NOP $f01d,X
  $9830: 07 00     SLO $00
  $9832: 00        BRK
  $9833: 06 F0     ASL $f0
  $9835: 15 00     ORA $00,X
  $9837: 00        BRK
  $9838: 1A        NOP
  $9839: 12        ???
  $983A: EF 07 00  ISB $0007
  $983D: E2 1A     NOP #$1a
  $983F: 12        ???
  $9840: EC 13 05  CPX $0513
  $9843: 1B 00 E3  SLO $e300,Y
  $9846: 1A        NOP
  $9847: 16 05     ASL $05,X
  $9849: 05 16     ORA $16
  $984B: 16 83     ASL $83,X
  $984D: 05 16     ORA $16
  $984F: 83 05     SAX ($05,X)
  $9851: 1B E3 F4  SLO $f4e3,Y
  $9854: F4 F4     NOP $f4,X
  $9856: E3 18     ISB ($18,X)
  $9858: 04 14     NOP $14
  $985A: 04 04     NOP $04
  $985C: 14 04     NOP $04,X
  $985E: 04 14     NOP $14
  $9860: 14 04     NOP $04,X
  $9862: 04 14     NOP $14
  $9864: 04 14     NOP $14
  $9866: 19 00 E2  ORA $e200,Y
  $9869: 18        CLC
  $986A: 10 EE     BPL $985a
  $986C: 15 00     ORA $00,X
  $986E: E2 06     NOP #$06
  $9870: EF 07 00  ISB $0007
  $9873: 00        BRK
  $9874: 18        CLC
  $9875: 10 EF     BPL $9866
  $9877: 07 00     SLO $00
  $9879: 1C 1D F0  NOP $f01d,X
  $987C: 15 00     ORA $00,X
  $987E: 00        BRK
  $987F: 06 F0     ASL $f0
  $9881: 15 00     ORA $00,X
  $9883: 00        BRK
  $9884: 1A        NOP
  $9885: 12        ???
  $9886: EF 07 00  ISB $0007
  $9889: E2 17     NOP #$17
  $988B: EF 15 00  ISB $0015
  $988E: E2 06     NOP #$06
  $9890: EF 07 00  ISB $0007
  $9893: E2 1A     NOP #$1a
  $9895: 16 12     ASL $12,X
  $9897: EC 13 1B  CPX $1b13
  $989A: 00        BRK
  $989B: E4 1A     CPX $1a
  $989D: 05 05     ORA $05
  $989F: 16 05     ASL $05,X
  $98A1: 05 16     ORA $16
  $98A3: 05 05     ORA $05
  $98A5: 16 16     ASL $16,X
  $98A7: 05 05     ORA $05
  $98A9: 1B E2 F4  SLO $f4e2,Y
  $98AC: F4 E2     NOP $e2,X
  $98AE: 13 05     SLO ($05),Y
  $98B0: 16 05     ASL $05,X
  $98B2: 16 05     ASL $05,X
  $98B4: 05 16     ORA $16
  $98B6: 83 05     SAX ($05,X)
  $98B8: 16 05     ASL $05,X
  $98BA: 16 05     ASL $05,X
  $98BC: 05 12     ORA $12
  $98BE: 00        BRK
  $98BF: 00        BRK
  $98C0: 13 1B     SLO ($1b),Y
  $98C2: EF 1A 12  ISB $121a
  $98C5: 00        BRK
  $98C6: 07 F1     SLO $f1
  $98C8: 06 00     ASL $00
  $98CA: 15 F1     ORA $f1,X
  $98CC: 17 00     SLO $00,X
  $98CE: 07 F1     SLO $f1
  $98D0: 06 00     ASL $00
  $98D2: 11 19     ORA ($19),Y
  $98D4: EF 18 10  ISB $1018
  $98D7: E2 11     NOP #$11
  $98D9: 04 14     NOP $14
  $98DB: 04 14     NOP $14
  $98DD: 04 04     NOP $04
  $98DF: 14 83     NOP $83,X
  $98E1: 04 14     NOP $14
  $98E3: 04 14     NOP $14
  $98E5: 04 14     NOP $14
  $98E7: 10 00     BPL $98e9
  $98E9: F4 F4     NOP $f4,X
  $98EB: F4 F4     NOP $f4,X
  $98ED: F4 E2     NOP $e2,X
  $98EF: 13 05     SLO ($05),Y
  $98F1: 16 16     ASL $16,X
  $98F3: 05 16     ORA $16
  $98F5: 05 05     ORA $05
  $98F7: 16 05     ASL $05,X
  $98F9: 16 05     ASL $05,X
  $98FB: 16 05     ASL $05,X
  $98FD: 16 05     ASL $05,X
  $98FF: 12        ???
  $9900: 00        BRK
  $9901: 00        BRK
  $9902: 13 1B     SLO ($1b),Y
  $9904: EF 1A 12  ISB $121a
  $9907: 13 1B     SLO ($1b),Y
  $9909: F1 17     SBC ($17),Y
  $990B: 15 F2     ORA $f2,X
  $990D: 06 07     ASL $07
  $990F: F2        ???
  $9910: 17 11     SLO $11,X
  $9912: 19 F1 06  ORA $06f1,Y
  $9915: 00        BRK
  $9916: 11 19     ORA ($19),Y
  $9918: F0 17     BEQ $9931
  $991A: E2 11     NOP #$11
  $991C: 04 04     NOP $04
  $991E: 14 04     NOP $04,X
  $9920: 14 04     NOP $04,X
  $9922: 04 14     NOP $14
  $9924: 04 14     NOP $14
  $9926: 04 04     NOP $04
  $9928: 14 04     NOP $04,X
  $992A: 14 04     NOP $04,X
  $992C: 10 F4     BPL $9922
  $992E: F4 F4     NOP $f4,X
  $9930: E2 13     NOP #$13
  $9932: 16 05     ASL $05,X
  $9934: 16 05     ASL $05,X
  $9936: 16 16     ASL $16,X
  $9938: 83 05     SAX ($05,X)
  $993A: 16 05     ASL $05,X
  $993C: 05 16     ORA $16
  $993E: 05 16     ORA $16
  $9940: 12        ???
  $9941: 00        BRK
  $9942: 00        BRK
  $9943: 13 1B     SLO ($1b),Y
  $9945: EF 1A 12  ISB $121a
  $9948: 00        BRK
  $9949: 07 F1     SLO $f1
  $994B: 06 00     ASL $00
  $994D: 15 F1     ORA $f1,X
  $994F: 17 00     SLO $00,X
  $9951: 15 F1     ORA $f1,X
  $9953: 06 00     ASL $00
  $9955: 07 F1     SLO $f1
  $9957: 17 00     SLO $00,X
  $9959: 15 F1     ORA $f1,X
  $995B: 06 00     ASL $00
  $995D: 11 19     ORA ($19),Y
  $995F: EF 18 10  ISB $1018
  $9962: E2 11     NOP #$11
  $9964: 14 83     NOP $83,X
  $9966: 04 14     NOP $14
  $9968: 04 04     NOP $04
  $996A: 14 04     NOP $04,X
  $996C: 14 04     NOP $04,X
  $996E: 04 14     NOP $14
  $9970: 04 14     NOP $14
  $9972: 10 00     BPL $9974
  $9974: F4 F4     NOP $f4,X
  $9976: F4 E3     NOP $e3,X
  $9978: 13 05     SLO ($05),Y
  $997A: 16 05     ASL $05,X
  $997C: 16 05     ASL $05,X
  $997E: 05 16     ORA $16
  $9980: 05 05     ORA $05
  $9982: 16 16     ASL $16,X
  $9984: 05 05     ORA $05
  $9986: 16 12     ASL $12,X
  $9988: 00        BRK
  $9989: E2 13     NOP #$13
  $998B: 1B EE 1A  SLO $1aee,Y
  $998E: 12        ???
  $998F: 00        BRK
  $9990: 13 1B     SLO ($1b),Y
  $9992: F0 06     BEQ $999a
  $9994: 00        BRK
  $9995: 15 F1     ORA $f1,X
  $9997: 17 00     SLO $00,X
  $9999: 07 F1     SLO $f1
  $999B: 06 00     ASL $00
  $999D: 15 F1     ORA $f1,X
  $999F: 06 00     ASL $00
  $99A1: 07 F1     SLO $f1
  $99A3: 17 00     SLO $00,X
  $99A5: 15 F1     ORA $f1,X
  $99A7: 06 00     ASL $00
  $99A9: 11 19     ORA ($19),Y
  $99AB: F0 17     BEQ $99c4
  $99AD: E2 11     NOP #$11
  $99AF: 19 EE 18  ORA $18ee,Y
  $99B2: 10 E3     BPL $9997
  $99B4: 11 04     ORA ($04),Y
  $99B6: 14 04     NOP $04,X
  $99B8: 04 14     NOP $14
  $99BA: 04 04     NOP $04
  $99BC: 14 14     NOP $14,X
  $99BE: 04 04     NOP $04
  $99C0: 14 04     NOP $04,X
  $99C2: 14 10     NOP $10,X
  $99C4: 00        BRK
  $99C5: F4 F4     NOP $f4,X
  $99C7: E2 18     NOP #$18
  $99C9: 04 04     NOP $04
  $99CB: 14 04     NOP $04,X
  $99CD: 04 14     NOP $14
  $99CF: 83 04     SAX ($04,X)
  $99D1: 14 04     NOP $04,X
  $99D3: 14 04     NOP $04,X
  $99D5: 04 19     NOP $19
  $99D7: E2 00     NOP #$00
  $99D9: 18        CLC
  $99DA: 10 EE     BPL $99ca
  $99DC: 11 19     ORA ($19),Y
  $99DE: 00        BRK
  $99DF: 00        BRK
  $99E0: 06 F0     ASL $f0
  $99E2: 07 00     SLO $00
  $99E4: 1E 1F F0  ASL $f01f,X
  $99E7: 07 00     SLO $00
  $99E9: 00        BRK
  $99EA: 06 F0     ASL $f0
  $99EC: 07 00     SLO $00
  $99EE: 00        BRK
  $99EF: 1A        NOP
  $99F0: 12        ???
  $99F1: EE 13 1B  INC $1b13
  $99F4: 00        BRK
  $99F5: E2 1A     NOP #$1a
  $99F7: 05 16     ORA $16
  $99F9: 05 05     ORA $05
  $99FB: 16 83     ASL $83,X
  $99FD: 05 16     ORA $16
  $99FF: 83 05     SAX ($05,X)
  $9A01: 16 05     ASL $05,X
  $9A03: 1B E2 F4  SLO $f4e2,Y
  $9A06: F4 F4     NOP $f4,X
  $9A08: F4 F4     NOP $f4,X
  $9A0A: E3 18     ISB ($18,X)
  $9A0C: 04 14     NOP $14
  $9A0E: 04 14     NOP $14
  $9A10: 04 04     NOP $04
  $9A12: 14 04     NOP $04,X
  $9A14: 14 04     NOP $04,X
  $9A16: 04 14     NOP $14
  $9A18: 19 E3 E2  ORA $e2e3,Y
  $9A1B: 18        CLC
  $9A1C: 10 EC     BPL $9a0a
  $9A1E: 11 14     ORA ($14),Y
  $9A20: 19 00 00  ORA $0000,Y
  $9A23: 18        CLC
  $9A24: 10 EF     BPL $9a15
  $9A26: 15 00     ORA $00,X
  $9A28: 1E 1F F0  ASL $f01f,X
  $9A2B: 07 00     SLO $00
  $9A2D: 00        BRK
  $9A2E: 06 F0     ASL $f0
  $9A30: 15 00     ORA $00,X
  $9A32: 00        BRK
  $9A33: 1A        NOP
  $9A34: 12        ???
  $9A35: EF 07 00  ISB $0007
  $9A38: E2 1A     NOP #$1a
  $9A3A: 12        ???
  $9A3B: EE 15 00  INC $0015
  $9A3E: E3 1A     ISB ($1a,X)
  $9A40: 16 05     ASL $05,X
  $9A42: 16 05     ASL $05,X
  $9A44: 05 16     ORA $16
  $9A46: 05 05     ORA $05
  $9A48: 16 05     ASL $05,X
  $9A4A: 16 05     ASL $05,X
  $9A4C: 05 16     ORA $16
  $9A4E: 1B 00 F4  SLO $f400,Y
  $9A51: F4 F8     NOP $f8,X
  $9A53: 00        BRK
  $9A54: 18        CLC
  $9A55: 93 04     ??? ($04),Y
  $9A57: 19 00 00  ORA $0000,Y
  $9A5A: 00        BRK
  $9A5B: 06 F3     ASL $f3
  $9A5D: 07 00     SLO $00
  $9A5F: 00        BRK
  $9A60: 00        BRK
  $9A61: 06 F3     ASL $f3
  $9A63: 07 00     SLO $00
  $9A65: 00        BRK
  $9A66: 00        BRK
  $9A67: 06 F3     ASL $f3
  $9A69: 07 00     SLO $00
  $9A6B: 00        BRK
  $9A6C: 00        BRK
  $9A6D: 06 F3     ASL $f3
  $9A6F: 07 00     SLO $00
  $9A71: 00        BRK
  $9A72: 00        BRK
  $9A73: 06 F3     ASL $f3
  $9A75: 07 00     SLO $00
  $9A77: 00        BRK
  $9A78: 00        BRK
  $9A79: 06 F3     ASL $f3
  $9A7B: 07 00     SLO $00
  $9A7D: 00        BRK
  $9A7E: 00        BRK
  $9A7F: 06 F3     ASL $f3
  $9A81: 07 00     SLO $00
  $9A83: 00        BRK
  $9A84: 00        BRK
  $9A85: 1A        NOP
  $9A86: 93 05     ??? ($05),Y
  $9A88: 1B 00 00  SLO $0000,Y
  $9A8B: F8        SED
  $9A8C: F8        SED
  $9A8D: F8        SED
  $9A8E: 13 05     SLO ($05),Y
  $9A90: 16 05     ASL $05,X
  $9A92: 16 05     ASL $05,X
  $9A94: 16 05     ASL $05,X
  $9A96: 16 05     ASL $05,X
  $9A98: 16 05     ASL $05,X
  $9A9A: 16 05     ASL $05,X
  $9A9C: 16 05     ASL $05,X
  $9A9E: 16 05     ASL $05,X
  $9AA0: 16 05     ASL $05,X
  $9AA2: 16 05     ASL $05,X
  $9AA4: 12        ???
  $9AA5: 00        BRK
  $9AA6: 15 F5     ORA $f5,X
  $9AA8: 17 00     SLO $00,X
  $9AAA: 07 F5     SLO $f5
  $9AAC: 06 00     ASL $00
  $9AAE: 15 F5     ORA $f5,X
  $9AB0: 17 00     SLO $00,X
  $9AB2: 07 F5     SLO $f5
  $9AB4: 06 00     ASL $00
  $9AB6: 15 F5     ORA $f5,X
  $9AB8: 17 00     SLO $00,X
  $9ABA: 07 F5     SLO $f5
  $9ABC: 06 00     ASL $00
  $9ABE: 15 F5     ORA $f5,X
  $9AC0: 17 00     SLO $00,X
  $9AC2: 11 04     ORA ($04),Y
  $9AC4: 14 04     NOP $04,X
  $9AC6: 14 04     NOP $04,X
  $9AC8: 14 04     NOP $04,X
  $9ACA: 14 04     NOP $04,X
  $9ACC: 14 04     NOP $04,X
  $9ACE: 14 04     NOP $04,X
  $9AD0: 14 04     NOP $04,X
  $9AD2: 14 04     NOP $04,X
  $9AD4: 14 04     NOP $04,X
  $9AD6: 14 04     NOP $04,X
  $9AD8: 10 00     BPL $9ada
  $9ADA: F8        SED
  $9ADB: F8        SED
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
  $9AFF: 06 A2     ASL $a2
  $9B01: 05 BC     ORA $bc
  $9B03: F9 07 F0  SBC $f007,Y
  $9B06: 03 20     SLO ($20,X)
  $9B08: EC DC CA  CPX $cadc
  $9B0B: 10 F5     BPL $9b02
  $9B0D: A9 59     LDA #$59
  $9B0F: 85 F0     STA $f0
  $9B11: A9 07     LDA #$07
  $9B13: 85 F1     STA $f1
  $9B15: A9 00     LDA #$00
  $9B17: 85 F2     STA $f2
  $9B19: A0 08     LDY #$08
  $9B1B: 84 F3     STY $f3
  $9B1D: AD 38 07  LDA $0738
  $9B20: 4A        LSR A
  $9B21: 90 02     BCC $9b25
  $9B23: 09 80     ORA #$80
  $9B25: 8D 38 07  STA $0738
  $9B28: 90 17     BCC $9b41
  $9B2A: A6 F2     LDX $f2
  $9B2C: DE 39 07  DEC $0739,X
  $9B2F: D0 03     BNE $9b34
  $9B31: 20 5E DD  JSR $dd5e
  $9B34: A6 F2     LDX $f2
  $9B36: DE 3B 07  DEC $073b,X
  $9B39: D0 03     BNE $9b3e
  $9B3B: 20 CA DC  JSR $dcca
  $9B3E: 20 20 DC  JSR $dc20
  $9B41: 18        CLC
  $9B42: A9 10     LDA #$10
  $9B44: 65 F0     ADC $f0
  $9B46: 85 F0     STA $f0
  $9B48: A9 04     LDA #$04
  $9B4A: 65 F2     ADC $f2
  $9B4C: 85 F2     STA $f2
  $9B4E: C6 F3     DEC $f3
  $9B50: D0 CB     BNE $9b1d
  $9B52: A9 59     LDA #$59
  $9B54: 85 F0     STA $f0
  $9B56: 8D FC 00  STA $00fc
  $9B59: A9 07     LDA #$07
  $9B5B: 85 F1     STA $f1
  $9B5D: 8D FD 00  STA $00fd
  $9B60: A9 03     LDA #$03
  $9B62: 85 F2     STA $f2
  $9B64: A9 11     LDA #$11
  $9B66: 85 F3     STA $f3
  $9B68: AD 38 07  LDA $0738
  $9B6B: 25 F3     AND $f3
  $9B6D: F0 0A     BEQ $9b79
  $9B6F: 29 0F     AND #$0f
  $9B71: D0 03     BNE $9b76
  $9B73: 20 A1 DB  JSR $dba1
  $9B76: 20 AF DB  JSR $dbaf
  $9B79: AD FC 00  LDA $00fc
  $9B7C: 85 F0     STA $f0
  $9B7E: AD FD 00  LDA $00fd
  $9B81: 85 F1     STA $f1
  $9B83: 20 8D DB  JSR $db8d
  $9B86: 06 F3     ASL $f3
  $9B88: C6 F2     DEC $f2
  $9B8A: 10 DC     BPL $9b68
  $9B8C: 60        RTS
  $9B8D: 18        CLC
  $9B8E: A9 10     LDA #$10
  $9B90: 65 F0     ADC $f0
  $9B92: 85 F0     STA $f0
  $9B94: 8D FC 00  STA $00fc
  $9B97: A9 00     LDA #$00
  $9B99: 65 F1     ADC $f1
  $9B9B: 85 F1     STA $f1
  $9B9D: 8D FD 00  STA $00fd
  $9BA0: 60        RTS
  $9BA1: 18        CLC
  $9BA2: A9 40     LDA #$40
  $9BA4: 65 F0     ADC $f0
  $9BA6: 85 F0     STA $f0
  $9BA8: A9 00     LDA #$00
  $9BAA: 65 F1     ADC $f1
  $9BAC: 85 F1     STA $f1
  $9BAE: 60        RTS
  $9BAF: A9 03     LDA #$03
  $9BB1: 45 F2     EOR $f2
  $9BB3: 0A        ASL A
  $9BB4: 0A        ASL A
  $9BB5: AA        TAX
  $9BB6: A0 06     LDY #$06
  $9BB8: B1 F0     LDA ($f0),Y
  $9BBA: 48        PHA
  $9BBB: A5 F2     LDA $f2
  $9BBD: 8D FB 00  STA $00fb
  $9BC0: C9 01     CMP #$01
  $9BC2: D0 07     BNE $9bcb
  $9BC4: 68        PLA
  $9BC5: 29 0F     AND #$0f
  $9BC7: 09 80     ORA #$80
  $9BC9: D0 1C     BNE $9be7
  $9BCB: 68        PLA
  $9BCC: 09 30     ORA #$30
  $9BCE: 9D 00 40  STA $4000,X
  $9BD1: A9 10     LDA #$10
  $9BD3: A0 05     LDY #$05
  $9BD5: 31 F0     AND ($f0),Y
  $9BD7: D0 11     BNE $9bea
  $9BD9: A9 08     LDA #$08
  $9BDB: AC FB 00  LDY $00fb
  $9BDE: 99 F5 07  STA $07f5,Y
  $9BE1: 9D 01 40  STA $4001,X
  $9BE4: 4C F4 DB  JMP $dbf4
  $9BE7: 9D 00 40  STA $4000,X
  $9BEA: A0 08     LDY #$08
  $9BEC: B1 F0     LDA ($f0),Y
  $9BEE: 10 29     BPL $9c19
  $9BF0: 29 7F     AND #$7f
  $9BF2: 91 F0     STA ($f0),Y
  $9BF4: A0 07     LDY #$07
  $9BF6: B1 F0     LDA ($f0),Y
  $9BF8: 9D 02 40  STA $4002,X
  $9BFB: C8        INY
  $9BFC: B1 F0     LDA ($f0),Y
  $9BFE: 09 18     ORA #$18
  $9C00: AC FB 00  LDY $00fb
  $9C03: F0 09     BEQ $9c0e
  $9C05: C0 01     CPY #$01
  $9C07: F0 05     BEQ $9c0e
  $9C09: D9 F1 07  CMP $07f1,Y
  $9C0C: F0 0B     BEQ $9c19
  $9C0E: 9D 03 40  STA $4003,X
  $9C11: 99 F1 07  STA $07f1,Y
  $9C14: B9 F5 07  LDA $07f5,Y
  $9C17: F0 01     BEQ $9c1a
  $9C19: 60        RTS
  $9C1A: A9 00     LDA #$00
  $9C1C: 99 F1 07  STA $07f1,Y
  $9C1F: 60        RTS
  $9C20: A0 05     LDY #$05
  $9C22: B1 F0     LDA ($f0),Y
  $9C24: AA        TAX
  $9C25: 29 F0     AND #$f0
  $9C27: 85 F6     STA $f6
  $9C29: 29 20     AND #$20
  $9C2B: F0 06     BEQ $9c33
  $9C2D: A9 0F     LDA #$0f
  $9C2F: 85 F7     STA $f7
  $9C31: D0 05     BNE $9c38
  $9C33: 8A        TXA
  $9C34: 29 0F     AND #$0f
  $9C36: 85 F7     STA $f7
  $9C38: A6 F2     LDX $f2
  $9C3A: BD 3C 07  LDA $073c,X
  $9C3D: 18        CLC
  $9C3E: E5 F7     SBC $f7
  $9C40: 10 02     BPL $9c44
  $9C42: A9 00     LDA #$00
  $9C44: 05 F6     ORA $f6
  $9C46: A0 06     LDY #$06
  $9C48: 91 F0     STA ($f0),Y
  $9C4A: A6 F3     LDX $f3
  $9C4C: CA        DEX
  $9C4D: BD D9 07  LDA $07d9,X
  $9C50: D0 01     BNE $9c53
  $9C52: 60        RTS
  $9C53: A5 F8     LDA $f8
  $9C55: 0A        ASL A
  $9C56: A8        TAY
  $9C57: B9 64 DC  LDA $dc64,Y
  $9C5A: 85 F9     STA $f9
  $9C5C: B9 65 DC  LDA $dc65,Y
  $9C5F: 85 FA     STA $fa
  $9C61: 6C F9 00  JMP ($00f9)
  $9C64: 8E DC 9E  STX $9edc
  $9C67: DC B3 DC  NOP $dcb3,X
  $9C6A: 9E DC 8E  SHX $8edc,Y
  $9C6D: DC 74 DC  NOP $dc74,X
  $9C70: 89 DC     NOP #$dc
  $9C72: 74 DC     NOP $dc,X
  $9C74: A9 01     LDA #$01
  $9C76: 18        CLC
  $9C77: 7D E1 07  ADC $07e1,X
  $9C7A: A0 07     LDY #$07
  $9C7C: 91 F0     STA ($f0),Y
  $9C7E: BD E9 07  LDA $07e9,X
  $9C81: 69 00     ADC #$00
  $9C83: C8        INY
  $9C84: 91 F0     STA ($f0),Y
  $9C86: 4C BC DC  JMP $dcbc
  $9C89: A9 02     LDA #$02
  $9C8B: 4C 76 DC  JMP $dc76
  $9C8E: BD E1 07  LDA $07e1,X
  $9C91: A0 07     LDY #$07
  $9C93: 91 F0     STA ($f0),Y
  $9C95: BD E9 07  LDA $07e9,X
  $9C98: C8        INY
  $9C99: 91 F0     STA ($f0),Y
  $9C9B: 4C BC DC  JMP $dcbc
  $9C9E: BD E1 07  LDA $07e1,X
  $9CA1: 18        CLC
  $9CA2: E9 01     SBC #$01
  $9CA4: A0 07     LDY #$07
  $9CA6: 91 F0     STA ($f0),Y
  $9CA8: BD E9 07  LDA $07e9,X
  $9CAB: E9 00     SBC #$00
  $9CAD: C8        INY
  $9CAE: 91 F0     STA ($f0),Y
  $9CB0: 4C BC DC  JMP $dcbc
  $9CB3: BD E1 07  LDA $07e1,X
  $9CB6: 18        CLC
  $9CB7: E9 02     SBC #$02
  $9CB9: 4C A4 DC  JMP $dca4
  $9CBC: A5 F8     LDA $f8
  $9CBE: 18        CLC
  $9CBF: 69 01     ADC #$01
  $9CC1: C9 08     CMP #$08
  $9CC3: D0 02     BNE $9cc7
  $9CC5: A9 00     LDA #$00
  $9CC7: 85 F8     STA $f8
  $9CC9: 60        RTS
  $9CCA: A0 02     LDY #$02
  $9CCC: B1 F0     LDA ($f0),Y
  $9CCE: 85 F6     STA $f6
  $9CD0: C8        INY
  $9CD1: B1 F0     LDA ($f0),Y
  $9CD3: 85 F7     STA $f7
  $9CD5: C8        INY
  $9CD6: B1 F0     LDA ($f0),Y
  $9CD8: 48        PHA
  $9CD9: 18        CLC
  $9CDA: 69 02     ADC #$02
  $9CDC: 91 F0     STA ($f0),Y
  $9CDE: 68        PLA
  $9CDF: A8        TAY
  $9CE0: B1 F6     LDA ($f6),Y
  $9CE2: 9D 3B 07  STA $073b,X
  $9CE5: C8        INY
  $9CE6: B1 F6     LDA ($f6),Y
  $9CE8: 9D 3C 07  STA $073c,X
  $9CEB: 60        RTS
  $9CEC: 86 F5     STX $f5
  $9CEE: A9 00     LDA #$00
  $9CF0: 9D F9 07  STA $07f9,X
  $9CF3: 88        DEY
  $9CF4: 98        TYA
  $9CF5: 0A        ASL A
  $9CF6: A8        TAY
  $9CF7: B9 A8 E1  LDA $e1a8,Y
  $9CFA: 85 F0     STA $f0
  $9CFC: B9 A9 E1  LDA $e1a9,Y
  $9CFF: 85 F1     STA $f1
  $9D01: A0 00     LDY #$00
  $9D03: B1 F0     LDA ($f0),Y
  $9D05: 10 0C     BPL $9d13
  $9D07: B1 F0     LDA ($f0),Y
  $9D09: 10 08     BPL $9d13
  $9D0B: A2 0F     LDX #$0f
  $9D0D: 8E 15 40  STX $4015
  $9D10: A6 F5     LDX $f5
  $9D12: 60        RTS
  $9D13: 85 F4     STA $f4
  $9D15: A9 08     LDA #$08
  $9D17: 18        CLC
  $9D18: ED F4 00  SBC $00f4
  $9D1B: AA        TAX
  $9D1C: A9 00     LDA #$00
  $9D1E: 9D D9 07  STA $07d9,X
  $9D21: 8D F4 07  STA $07f4
  $9D24: 8D F3 07  STA $07f3
  $9D27: A5 F4     LDA $f4
  $9D29: 0A        ASL A
  $9D2A: 0A        ASL A
  $9D2B: 0A        ASL A
  $9D2C: 0A        ASL A
  $9D2D: AA        TAX
  $9D2E: C8        INY
  $9D2F: B1 F0     LDA ($f0),Y
  $9D31: 9D 59 07  STA $0759,X
  $9D34: C8        INY
  $9D35: B1 F0     LDA ($f0),Y
  $9D37: 9D 5A 07  STA $075a,X
  $9D3A: A9 00     LDA #$00
  $9D3C: 9D 5E 07  STA $075e,X
  $9D3F: A9 0F     LDA #$0f
  $9D41: 9D 62 07  STA $0762,X
  $9D44: A5 F4     LDA $f4
  $9D46: 0A        ASL A
  $9D47: 0A        ASL A
  $9D48: AA        TAX
  $9D49: A9 01     LDA #$01
  $9D4B: 9D 39 07  STA $0739,X
  $9D4E: 4A        LSR A
  $9D4F: A6 F4     LDX $f4
  $9D51: 2A        ROL A
  $9D52: CA        DEX
  $9D53: 10 FC     BPL $9d51
  $9D55: 0D 38 07  ORA $0738
  $9D58: 8D 38 07  STA $0738
  $9D5B: C8        INY
  $9D5C: 10 A9     BPL $9d07
  $9D5E: A9 CF     LDA #$cf
  $9D60: A0 05     LDY #$05
  $9D62: 31 F0     AND ($f0),Y
  $9D64: 91 F0     STA ($f0),Y
  $9D66: A0 00     LDY #$00
  $9D68: B1 F0     LDA ($f0),Y
  $9D6A: 85 F4     STA $f4
  $9D6C: C8        INY
  $9D6D: B1 F0     LDA ($f0),Y
  $9D6F: 85 F5     STA $f5
  $9D71: 88        DEY
  $9D72: B1 F4     LDA ($f4),Y
  $9D74: 10 21     BPL $9d97
  $9D76: C8        INY
  $9D77: C9 E0     CMP #$e0
  $9D79: 90 05     BCC $9d80
  $9D7B: 20 1C DE  JSR $de1c
  $9D7E: 10 F2     BPL $9d72
  $9D80: C9 B0     CMP #$b0
  $9D82: 90 03     BCC $9d87
  $9D84: C8        INY
  $9D85: D0 EB     BNE $9d72
  $9D87: 29 3F     AND #$3f
  $9D89: AA        TAX
  $9D8A: BD C8 DF  LDA $dfc8,X
  $9D8D: A6 F2     LDX $f2
  $9D8F: 9D 39 07  STA $0739,X
  $9D92: 9D 3A 07  STA $073a,X
  $9D95: 10 DB     BPL $9d72
  $9D97: C8        INY
  $9D98: 48        PHA
  $9D99: 98        TYA
  $9D9A: A0 00     LDY #$00
  $9D9C: 18        CLC
  $9D9D: 65 F4     ADC $f4
  $9D9F: 91 F0     STA ($f0),Y
  $9DA1: C8        INY
  $9DA2: A9 00     LDA #$00
  $9DA4: 65 F5     ADC $f5
  $9DA6: 91 F0     STA ($f0),Y
  $9DA8: 68        PLA
  $9DA9: A2 05     LDX #$05
  $9DAB: E4 F3     CPX $f3
  $9DAD: F0 06     BEQ $9db5
  $9DAF: A2 01     LDX #$01
  $9DB1: E4 F3     CPX $f3
  $9DB3: 90 0C     BCC $9dc1
  $9DB5: C9 10     CMP #$10
  $9DB7: F0 0F     BEQ $9dc8
  $9DB9: 85 F4     STA $f4
  $9DBB: A9 00     LDA #$00
  $9DBD: 85 F5     STA $f5
  $9DBF: F0 2E     BEQ $9def
  $9DC1: AA        TAX
  $9DC2: 29 0F     AND #$0f
  $9DC4: C9 0C     CMP #$0c
  $9DC6: D0 0A     BNE $9dd2
  $9DC8: A0 05     LDY #$05
  $9DCA: A9 20     LDA #$20
  $9DCC: 11 F0     ORA ($f0),Y
  $9DCE: 91 F0     STA ($f0),Y
  $9DD0: D0 36     BNE $9e08
  $9DD2: 0A        ASL A
  $9DD3: A8        TAY
  $9DD4: B9 B0 DF  LDA $dfb0,Y
  $9DD7: 85 F4     STA $f4
  $9DD9: B9 B1 DF  LDA $dfb1,Y
  $9DDC: 85 F5     STA $f5
  $9DDE: 8A        TXA
  $9DDF: 29 F0     AND #$f0
  $9DE1: 4A        LSR A
  $9DE2: 4A        LSR A
  $9DE3: 4A        LSR A
  $9DE4: 4A        LSR A
  $9DE5: AA        TAX
  $9DE6: F0 07     BEQ $9def
  $9DE8: 46 F5     LSR $f5
  $9DEA: 66 F4     ROR $f4
  $9DEC: CA        DEX
  $9DED: D0 F9     BNE $9de8
  $9DEF: A5 F4     LDA $f4
  $9DF1: A6 F3     LDX $f3
  $9DF3: CA        DEX
  $9DF4: 18        CLC
  $9DF5: A0 07     LDY #$07
  $9DF7: 91 F0     STA ($f0),Y
  $9DF9: 9D E1 07  STA $07e1,X
  $9DFC: C8        INY
  $9DFD: A5 F5     LDA $f5
  $9DFF: 69 00     ADC #$00
  $9E01: 09 80     ORA #$80
  $9E03: 91 F0     STA ($f0),Y
  $9E05: 9D E9 07  STA $07e9,X
  $9E08: A6 F2     LDX $f2
  $9E0A: BD 3A 07  LDA $073a,X
  $9E0D: 9D 39 07  STA $0739,X
  $9E10: A9 01     LDA #$01
  $9E12: 9D 3B 07  STA $073b,X
  $9E15: A9 00     LDA #$00
  $9E17: A0 04     LDY #$04
  $9E19: 91 F0     STA ($f0),Y
  $9E1B: 60        RTS
  $9E1C: 29 1F     AND #$1f
  $9E1E: 0A        ASL A
  $9E1F: AA        TAX
  $9E20: BD 2D DE  LDA $de2d,X
  $9E23: 85 F6     STA $f6
  $9E25: BD 2E DE  LDA $de2e,X
  $9E28: 85 F7     STA $f7
  $9E2A: 6C F6 00  JMP ($00f6)
  $9E2D: 6D DE AA  ADC $aade
  $9E30: DF 65 DF  DCP $df65,X
  $9E33: 88        DEY
  $9E34: DE 3B DF  DEC $df3b,X
  $9E37: AA        TAX
  $9E38: DF AA DF  DCP $dfaa,X
  $9E3B: AA        TAX
  $9E3C: DF 9C DE  DCP $de9c,X
  $9E3F: A9 DE     LDA #$de
  $9E41: D3 DE     DCP ($de),Y
  $9E43: EA        NOP
  $9E44: DE 13 DF  DEC $df13,X
  $9E47: 94 DF     STY $df,X
  $9E49: AA        TAX
  $9E4A: DF A1 DF  DCP $dfa1,X
  $9E4D: AC DF AA  LDY $aadf
  $9E50: DF AA DF  DCP $dfaa,X
  $9E53: AA        TAX
  $9E54: DF AA DF  DCP $dfaa,X
  $9E57: AA        TAX
  $9E58: DF AA DF  DCP $dfaa,X
  $9E5B: AA        TAX
  $9E5C: DF AA DF  DCP $dfaa,X
  $9E5F: AA        TAX
  $9E60: DF AA DF  DCP $dfaa,X
  $9E63: AA        TAX
  $9E64: DF AA DF  DCP $dfaa,X
  $9E67: AA        TAX
  $9E68: DF AA DF  DCP $dfaa,X
  $9E6B: 79 DF B1  ADC $b1df,Y
  $9E6E: F4 C8     NOP $c8,X
  $9E70: 84 F6     STY $f6
  $9E72: 0A        ASL A
  $9E73: AA        TAX
  $9E74: BD F0 DF  LDA $dff0,X
  $9E77: A8        TAY
  $9E78: BD F1 DF  LDA $dff1,X
  $9E7B: AA        TAX
  $9E7C: 98        TYA
  $9E7D: A0 02     LDY #$02
  $9E7F: 91 F0     STA ($f0),Y
  $9E81: C8        INY
  $9E82: 8A        TXA
  $9E83: 91 F0     STA ($f0),Y
  $9E85: A4 F6     LDY $f6
  $9E87: 60        RTS
  $9E88: B1 F4     LDA ($f4),Y
  $9E8A: C8        INY
  $9E8B: 84 F6     STY $f6
  $9E8D: 85 F7     STA $f7
  $9E8F: A9 F0     LDA #$f0
  $9E91: A0 05     LDY #$05
  $9E93: 31 F0     AND ($f0),Y
  $9E95: 05 F7     ORA $f7
  $9E97: 91 F0     STA ($f0),Y
  $9E99: A4 F6     LDY $f6
  $9E9B: 60        RTS
  $9E9C: B1 F4     LDA ($f4),Y
  $9E9E: C8        INY
  $9E9F: AA        TAX
  $9EA0: B1 F4     LDA ($f4),Y
  $9EA2: 86 F4     STX $f4
  $9EA4: 85 F5     STA $f5
  $9EA6: A0 00     LDY #$00
  $9EA8: 60        RTS
  $9EA9: B1 F4     LDA ($f4),Y
  $9EAB: C8        INY
  $9EAC: AA        TAX
  $9EAD: B1 F4     LDA ($f4),Y
  $9EAF: C8        INY
  $9EB0: 48        PHA
  $9EB1: 98        TYA
  $9EB2: 48        PHA
  $9EB3: A0 09     LDY #$09
  $9EB5: B1 F0     LDA ($f0),Y
  $9EB7: A8        TAY
  $9EB8: 68        PLA
  $9EB9: 18        CLC
  $9EBA: 65 F4     ADC $f4
  $9EBC: 91 F0     STA ($f0),Y
  $9EBE: 88        DEY
  $9EBF: A9 00     LDA #$00
  $9EC1: 65 F5     ADC $f5
  $9EC3: 91 F0     STA ($f0),Y
  $9EC5: 88        DEY
  $9EC6: 98        TYA
  $9EC7: A0 09     LDY #$09
  $9EC9: 91 F0     STA ($f0),Y
  $9ECB: 86 F4     STX $f4
  $9ECD: 68        PLA
  $9ECE: 85 F5     STA $f5
  $9ED0: A0 00     LDY #$00
  $9ED2: 60        RTS
  $9ED3: A0 09     LDY #$09
  $9ED5: B1 F0     LDA ($f0),Y
  $9ED7: A8        TAY
  $9ED8: C8        INY
  $9ED9: B1 F0     LDA ($f0),Y
  $9EDB: C8        INY
  $9EDC: 85 F5     STA $f5
  $9EDE: B1 F0     LDA ($f0),Y
  $9EE0: 85 F4     STA $f4
  $9EE2: 98        TYA
  $9EE3: A0 09     LDY #$09
  $9EE5: 91 F0     STA ($f0),Y
  $9EE7: A0 00     LDY #$00
  $9EE9: 60        RTS
  $9EEA: B1 F4     LDA ($f4),Y
  $9EEC: C8        INY
  $9EED: AA        TAX
  $9EEE: 98        TYA
  $9EEF: 48        PHA
  $9EF0: A0 09     LDY #$09
  $9EF2: B1 F0     LDA ($f0),Y
  $9EF4: A8        TAY
  $9EF5: 68        PLA
  $9EF6: 18        CLC
  $9EF7: 65 F4     ADC $f4
  $9EF9: 85 F4     STA $f4
  $9EFB: 91 F0     STA ($f0),Y
  $9EFD: 88        DEY
  $9EFE: A9 00     LDA #$00
  $9F00: 65 F5     ADC $f5
  $9F02: 85 F5     STA $f5
  $9F04: 91 F0     STA ($f0),Y
  $9F06: 88        DEY
  $9F07: 8A        TXA
  $9F08: 91 F0     STA ($f0),Y
  $9F0A: 88        DEY
  $9F0B: 98        TYA
  $9F0C: A0 09     LDY #$09
  $9F0E: 91 F0     STA ($f0),Y
  $9F10: A0 00     LDY #$00
  $9F12: 60        RTS
  $9F13: 84 F6     STY $f6
  $9F15: A0 09     LDY #$09
  $9F17: B1 F0     LDA ($f0),Y
  $9F19: A8        TAY
  $9F1A: C8        INY
  $9F1B: B1 F0     LDA ($f0),Y
  $9F1D: 18        CLC
  $9F1E: E9 00     SBC #$00
  $9F20: 91 F0     STA ($f0),Y
  $9F22: F0 0D     BEQ $9f31
  $9F24: C8        INY
  $9F25: B1 F0     LDA ($f0),Y
  $9F27: C8        INY
  $9F28: 85 F5     STA $f5
  $9F2A: B1 F0     LDA ($f0),Y
  $9F2C: 85 F4     STA $f4
  $9F2E: A0 00     LDY #$00
  $9F30: 60        RTS
  $9F31: C8        INY
  $9F32: C8        INY
  $9F33: 98        TYA
  $9F34: A0 09     LDY #$09
  $9F36: 91 F0     STA ($f0),Y
  $9F38: A4 F6     LDY $f6
  $9F3A: 60        RTS
  $9F3B: 84 F6     STY $f6
  $9F3D: A0 05     LDY #$05
  $9F3F: B1 F0     LDA ($f0),Y
  $9F41: 09 10     ORA #$10
  $9F43: 91 F0     STA ($f0),Y
  $9F45: A6 F3     LDX $f3
  $9F47: CA        DEX
  $9F48: 8A        TXA
  $9F49: 49 07     EOR #$07
  $9F4B: 0A        ASL A
  $9F4C: 0A        ASL A
  $9F4D: 29 0F     AND #$0f
  $9F4F: AA        TAX
  $9F50: A4 F6     LDY $f6
  $9F52: B1 F4     LDA ($f4),Y
  $9F54: 9D 01 40  STA $4001,X
  $9F57: C8        INY
  $9F58: A6 F3     LDX $f3
  $9F5A: CA        DEX
  $9F5B: 8A        TXA
  $9F5C: 29 03     AND #$03
  $9F5E: AA        TAX
  $9F5F: A9 00     LDA #$00
  $9F61: 9D F5 07  STA $07f5,X
  $9F64: 60        RTS
  $9F65: B1 F4     LDA ($f4),Y
  $9F67: C8        INY
  $9F68: 84 F6     STY $f6
  $9F6A: 85 F7     STA $f7
  $9F6C: A0 05     LDY #$05
  $9F6E: A9 3F     LDA #$3f
  $9F70: 31 F0     AND ($f0),Y
  $9F72: 05 F7     ORA $f7
  $9F74: 91 F0     STA ($f0),Y
  $9F76: A4 F6     LDY $f6
  $9F78: 60        RTS
  $9F79: A9 7F     LDA #$7f
  $9F7B: 2D 38 07  AND $0738
  $9F7E: 8D 38 07  STA $0738
  $9F81: A6 F3     LDX $f3
  $9F83: CA        DEX
  $9F84: 8A        TXA
  $9F85: 49 07     EOR #$07
  $9F87: 0A        ASL A
  $9F88: 0A        ASL A
  $9F89: 29 0F     AND #$0f
  $9F8B: AA        TAX
  $9F8C: A9 30     LDA #$30
  $9F8E: 9D 00 40  STA $4000,X
  $9F91: 68        PLA
  $9F92: 68        PLA
  $9F93: 60        RTS
  $9F94: A6 F3     LDX $f3
  $9F96: CA        DEX
  $9F97: A9 01     LDA #$01
  $9F99: 9D D9 07  STA $07d9,X
  $9F9C: A9 00     LDA #$00
  $9F9E: 85 F8     STA $f8
  $9FA0: 60        RTS
  $9FA1: A6 F3     LDX $f3
  $9FA3: CA        DEX
  $9FA4: A9 00     LDA #$00
  $9FA6: 9D D9 07  STA $07d9,X
  $9FA9: 60        RTS
  $9FAA: C8        INY
  $9FAB: 60        RTS
  $9FAC: C8        INY
  $9FAD: C8        INY
  $9FAE: C8        INY
  $9FAF: 60        RTS
  $9FB0: AE 06 4E  LDX $4e06
  $9FB3: 06 F3     ASL $f3
  $9FB5: 05 9E     ORA $9e
  $9FB7: 05 4D     ORA $4d
  $9FB9: 05 01     ORA $01
  $9FBB: 05 B9     ORA $b9
  $9FBD: 04 75     NOP $75
  $9FBF: 04 35     NOP $35
  $9FC1: 04 F8     NOP $f8
  $9FC3: 03 BF     SLO ($bf,X)
  $9FC5: 03 89     SLO ($89,X)
  $9FC7: 03 00     SLO ($00,X)
  $9FC9: 01 02     ORA ($02,X)
  $9FCB: 03 04     SLO ($04,X)
  $9FCD: 05 06     ORA $06
  $9FCF: 07 08     SLO $08
  $9FD1: 09 0A     ORA #$0a
  $9FD3: 0C 0E 0F  NOP $0f0e
  $9FD6: 10 12     BPL $9fea
  $9FD8: 14 15     NOP $15,X
  $9FDA: 18        CLC
  $9FDB: 1B 1C 1E  SLO $1e1c,Y
  $9FDE: 20 24 28  JSR $2824
  $9FE1: 2A        ROL A
  $9FE2: 30 36     BMI $a01a
  $9FE4: 38        SEC
  $9FE5: 3C 40 48  NOP $4840,X
  $9FE8: 50 54     BVC $a03e
  $9FEA: 60        RTS
  $9FEB: 6C 70 80  JMP ($8070)
  $9FEE: 90 C0     BCC $9fb0
  $9FF0: 1A        NOP
  $9FF1: E0 3A     CPX #$3a
  $9FF3: E0 7C     CPX #$7c
  $9FF5: E0 A4     CPX #$a4
  $9FF7: E0 C6     CPX #$c6
  $9FF9: E0 C8     CPX #$c8
  $9FFB: E0 CA     CPX #$ca
  $9FFD: E0 EA     CPX #$ea
  $9FFF: E0 EC     CPX #$ec
  $A001: E0 0C     CPX #$0c
  $A003: E1 36     SBC ($36,X)
  $A005: E1 3A     SBC ($3a,X)
  $A007: E1 3E     SBC ($3e,X)
  $A009: E1 42     SBC ($42,X)
  $A00B: E1 46     SBC ($46,X)
  $A00D: E1 52     SBC ($52,X)
  $A00F: E1 92     SBC ($92,X)
  $A011: E1 96     SBC ($96,X)
  $A013: E1 1E     SBC ($1e,X)
  $A015: E1 4A     SBC ($4a,X)
  $A017: E1 4E     SBC ($4e,X)
  $A019: E1 02     SBC ($02,X)
  $A01B: 0F 02 0E  SLO $0e02
  $A01E: 02        ???
  $A01F: 0D 02 0C  ORA $0c02
  $A022: 02        ???
  $A023: 0B 02     ANC #$02
  $A025: 0A        ASL A
  $A026: 02        ???
  $A027: 09 02     ORA #$02
  $A029: 08        PHP
  $A02A: 02        ???
  $A02B: 07 02     SLO $02
  $A02D: 06 02     ASL $02
  $A02F: 05 02     ORA $02
  $A031: 04 02     NOP $02
  $A033: 03 02     SLO ($02,X)
  $A035: 02        ???
  $A036: 02        ???
  $A037: 01 FF     ORA ($ff,X)
  $A039: 00        BRK
  $A03A: 0C 0F 03  NOP $030f
  $A03D: 0E 03 0F  ASL $0f03
  $A040: 03 0E     SLO ($0e,X)
  $A042: 04 0F     NOP $0f
  $A044: 04 0E     NOP $0e
  $A046: 04 0F     NOP $0f
  $A048: 04 0E     NOP $0e
  $A04A: 05 0F     ORA $0f
  $A04C: 05 0E     ORA $0e
  $A04E: 05 0F     ORA $0f
  $A050: 05 0E     ORA $0e
  $A052: 05 0F     ORA $0f
  $A054: 05 0E     ORA $0e
  $A056: 05 0F     ORA $0f
  $A058: 05 0E     ORA $0e
  $A05A: 05 0F     ORA $0f
  $A05C: 05 0E     ORA $0e
  $A05E: 05 0F     ORA $0f
  $A060: 05 0E     ORA $0e
  $A062: 05 0F     ORA $0f
  $A064: 05 0E     ORA $0e
  $A066: 05 0F     ORA $0f
  $A068: 05 0E     ORA $0e
  $A06A: 06 0F     ASL $0f
  $A06C: 06 0E     ASL $0e
  $A06E: 06 0F     ASL $0f
  $A070: 06 0E     ASL $0e
  $A072: 07 0F     SLO $0f
  $A074: 07 0E     SLO $0e
  $A076: 07 0D     SLO $0d
  $A078: 08        PHP
  $A079: 0C FF 00  NOP $00ff
  $A07C: 01 07     ORA ($07,X)
  $A07E: 01 08     ORA ($08,X)
  $A080: 01 09     ORA ($09,X)
  $A082: 01 0A     ORA ($0a,X)
  $A084: 01 0B     ORA ($0b,X)
  $A086: 01 0C     ORA ($0c,X)
  $A088: 01 0D     ORA ($0d,X)
  $A08A: 01 0E     ORA ($0e,X)
  $A08C: 02        ???
  $A08D: 0F 03 0E  SLO $0e03
  $A090: 04 0D     NOP $0d
  $A092: 05 0C     ORA $0c
  $A094: 06 0B     ASL $0b
  $A096: 07 0A     SLO $0a
  $A098: 11 09     ORA ($09),Y
  $A09A: 22        ???
  $A09B: 08        PHP
  $A09C: 30 07     BMI $a0a5
  $A09E: 0B 06     ANC #$06
  $A0A0: 0C 05 FF  NOP $ff05
  $A0A3: 00        BRK
  $A0A4: 01 0F     ORA ($0f,X)
  $A0A6: 01 00     ORA ($00,X)
  $A0A8: 01 0E     ORA ($0e,X)
  $A0AA: 01 0D     ORA ($0d,X)
  $A0AC: 01 0C     ORA ($0c,X)
  $A0AE: 01 0B     ORA ($0b,X)
  $A0B0: 01 0A     ORA ($0a,X)
  $A0B2: 01 09     ORA ($09,X)
  $A0B4: 01 08     ORA ($08,X)
  $A0B6: 01 07     ORA ($07,X)
  $A0B8: 01 06     ORA ($06,X)
  $A0BA: 01 05     ORA ($05,X)
  $A0BC: 01 04     ORA ($04,X)
  $A0BE: 01 03     ORA ($03,X)
  $A0C0: 01 02     ORA ($02,X)
  $A0C2: 01 01     ORA ($01,X)
  $A0C4: FF 00 FF  ISB $ff00,X
  $A0C7: 00        BRK
  $A0C8: FF 0F 01  ISB $010f,X
  $A0CB: 0F 02 0E  SLO $0e02
  $A0CE: 03 0D     SLO ($0d,X)
  $A0D0: 04 0C     NOP $0c
  $A0D2: 05 0B     ORA $0b
  $A0D4: 06 0A     ASL $0a
  $A0D6: 07 09     SLO $09
  $A0D8: 08        PHP
  $A0D9: 08        PHP
  $A0DA: 09 07     ORA #$07
  $A0DC: 0A        ASL A
  $A0DD: 06 0B     ASL $0b
  $A0DF: 05 0C     ORA $0c
  $A0E1: 04 0D     NOP $0d
  $A0E3: 03 0E     SLO ($0e,X)
  $A0E5: 02        ???
  $A0E6: 0F 01 FF  SLO $ff01
  $A0E9: 00        BRK
  $A0EA: FF 00 02  ISB $0200,X
  $A0ED: 0F 02 0E  SLO $0e02
  $A0F0: 02        ???
  $A0F1: 0D 02 0C  ORA $0c02
  $A0F4: 03 0B     SLO ($0b,X)
  $A0F6: 03 0A     SLO ($0a,X)
  $A0F8: 03 09     SLO ($09,X)
  $A0FA: 03 08     SLO ($08,X)
  $A0FC: 04 07     NOP $07
  $A0FE: 04 06     NOP $06
  $A100: 04 05     NOP $05
  $A102: 04 04     NOP $04
  $A104: 04 03     NOP $03
  $A106: 04 02     NOP $02
  $A108: 04 01     NOP $01
  $A10A: FF 00 02  ISB $0200,X
  $A10D: 0F 02 0D  SLO $0d02
  $A110: 02        ???
  $A111: 0B 02     ANC #$02
  $A113: 09 02     ORA #$02
  $A115: 07 02     SLO $02
  $A117: 05 02     ORA $02
  $A119: 03 02     SLO ($02,X)
  $A11B: 01 FF     ORA ($ff,X)
  $A11D: 00        BRK
  $A11E: 01 0F     ORA ($0f,X)
  $A120: 02        ???
  $A121: 0D 01 0B  ORA $0b01
  $A124: 02        ???
  $A125: 09 02     ORA #$02
  $A127: 07 02     SLO $02
  $A129: 06 02     ASL $02
  $A12B: 05 01     ORA $01
  $A12D: 04 01     NOP $01
  $A12F: 03 01     SLO ($01,X)
  $A131: 02        ???
  $A132: 01 01     ORA ($01,X)
  $A134: FF 00 04  ISB $0400,X
  $A137: 0F FF 00  SLO $00ff
  $A13A: 05 0F     ORA $0f
  $A13C: FF 00 FF  ISB $ff00,X
  $A13F: 0F FF 00  SLO $00ff
  $A142: 08        PHP
  $A143: 0F FF 00  SLO $00ff
  $A146: 07 0F     SLO $0f
  $A148: FF 00 0C  ISB $0c00,X
  $A14B: 0F FF 00  SLO $00ff
  $A14E: 02        ???
  $A14F: 0F FF 00  SLO $00ff
  $A152: 01 0B     ORA ($0b,X)
  $A154: 01 0C     ORA ($0c,X)
  $A156: 01 0D     ORA ($0d,X)
  $A158: 01 0E     ORA ($0e,X)
  $A15A: 01 0F     ORA ($0f,X)
  $A15C: 01 0E     ORA ($0e,X)
  $A15E: 01 0D     ORA ($0d,X)
  $A160: 01 0C     ORA ($0c,X)
  $A162: 01 0B     ORA ($0b,X)
  $A164: 01 0C     ORA ($0c,X)
  $A166: 01 0D     ORA ($0d,X)
  $A168: 01 0E     ORA ($0e,X)
  $A16A: 01 0F     ORA ($0f,X)
  $A16C: 01 0E     ORA ($0e,X)
  $A16E: 01 0D     ORA ($0d,X)
  $A170: 01 0C     ORA ($0c,X)
  $A172: 01 0B     ORA ($0b,X)
  $A174: 01 0C     ORA ($0c,X)
  $A176: 01 0D     ORA ($0d,X)
  $A178: 01 0E     ORA ($0e,X)
  $A17A: 01 0F     ORA ($0f,X)
  $A17C: 01 0E     ORA ($0e,X)
  $A17E: 01 0D     ORA ($0d,X)
  $A180: 01 0C     ORA ($0c,X)
  $A182: 01 0B     ORA ($0b,X)
  $A184: 01 0C     ORA ($0c,X)
  $A186: 01 0D     ORA ($0d,X)
  $A188: 01 0E     ORA ($0e,X)
  $A18A: 01 0F     ORA ($0f,X)
  $A18C: 01 0E     ORA ($0e,X)
  $A18E: 01 0D     ORA ($0d,X)
  $A190: 01 0C     ORA ($0c,X)
  $A192: 03 0F     SLO ($0f,X)
  $A194: FF 00 01  ISB $0100,X
  $A197: 0F 01 0D  SLO $0d01
  $A19A: 01 0B     ORA ($0b,X)
  $A19C: 01 09     ORA ($09,X)
  $A19E: 01 07     ORA ($07,X)
  $A1A0: 01 05     ORA ($05,X)
  $A1A2: 01 03     ORA ($03,X)
  $A1A4: 01 01     ORA ($01,X)
  $A1A6: FF 00 2C  ISB $2c00,X
  $A1A9: E2 45     NOP #$45
  $A1AB: E2 B2     NOP #$b2
  $A1AD: E4 2C     CPX $2c
  $A1AF: E2 8E     NOP #$8e
  $A1B1: E8        INX
  $A1B2: FC E4 A3  NOP $a3e4,X
  $A1B5: E6 84     INC $84
  $A1B7: F7 83     ISB $83,X
  $A1B9: EB 6B     SBC #$6b
  $A1BB: EC 51 ED  CPX $ed51
  $A1BE: 80 F0     NOP #$f0
  $A1C0: 2B EE     ANC #$ee
  $A1C2: F3 EF     ISB ($ef),Y
  $A1C4: B1 F0     LDA ($f0),Y
  $A1C6: 2F F1 DB  RLA $dbf1
  $A1C9: F1 47     SBC ($47),Y
  $A1CB: F2        ???
  $A1CC: DD F3 4E  CMP $4ef3,X
  $A1CF: F4 41     NOP $41,X
  $A1D1: F5 31     SBC $31,X
  $A1D3: F6 73     INC $73,X
  $A1D5: F6 EA     INC $ea,X
  $A1D7: F6 EB     INC $eb,X
  $A1D9: EA        NOP
  $A1DA: FD F7 12  SBC $12f7,X
  $A1DD: F8        SED
  $A1DE: 20 F8 2C  JSR $2cf8
  $A1E1: E2 2C     NOP #$2c
  $A1E3: E2 4B     NOP #$4b
  $A1E5: F8        SED
  $A1E6: 6E F8 92  ROR $92f8
  $A1E9: F8        SED
  $A1EA: 2C E2 6C  BIT $6ce2
  $A1ED: FC 0E FB  NOP $fb0e,X
  $A1F0: 20 FB 99  JSR $99fb
  $A1F3: FC 32 F8  NOP $f832,X
  $A1F6: 38        SEC
  $A1F7: FB E3 FB  ISB $fbe3,Y
  $A1FA: 99 F9 CF  STA $cff9,Y
  $A1FD: F9 F1 F9  SBC $f9f1,Y
  $A200: 87 F9     SAX $f9
  $A202: FD F9 35  SBC $35f9,X
  $A205: FA        NOP
  $A206: 62        ???
  $A207: FA        NOP
  $A208: A2 FA     LDX #$fa
  $A20A: E1 FA     SBC ($fa,X)
  $A20C: 8B FB     XAA #$fb
  $A20E: D8        CLD
  $A20F: F8        SED
  $A210: E0 F8     CPX #$f8
  $A212: 10 F9     BPL $a20d
  $A214: 47 F9     SRE $f9
  $A216: 2F FE BE  RLA $befe
  $A219: FC D2 FC  NOP $fcd2,X
  $A21C: 07 FD     SLO $fd
  $A21E: 1A        NOP
  $A21F: FD 4A FD  SBC $fd4a,X
  $A222: 70 FD     BVS $a221
  $A224: F3 FD     ISB ($fd),Y
  $A226: 08        PHP
  $A227: FF 8B FB  ISB $fb8b,X
  $A22A: 75 FB     ADC $fb,X
  $A22C: 00        BRK
  $A22D: 44 E2     NOP $e2
  $A22F: 01 44     ORA ($44,X)
  $A231: E2 02     NOP #$02
  $A233: 44 E2     NOP $e2
  $A235: 03 44     SLO ($44,X)
  $A237: E2 04     NOP #$04
  $A239: 44 E2     NOP $e2
  $A23B: 05 44     ORA $44
  $A23D: E2 06     NOP #$06
  $A23F: 44 E2     NOP $e2
  $A241: 07 44     SLO $44
  $A243: E2 FF     NOP #$ff
  $A245: 04 52     NOP $52
  $A247: E2 05     NOP #$05
  $A249: 76 E3     ROR $e3,X
  $A24B: 06 85     ASL $85
  $A24D: E3 07     ISB ($07,X)
  $A24F: 57 E4     SRE $e4,X
  $A251: FF E3 09  ISB $09e3,X
  $A254: E9 58     SBC #$58
  $A256: E2 FF     NOP #$ff
  $A258: E0 05     CPX #$05
  $A25A: E2 40     NOP #$40
  $A25C: ED E9 3A  SBC $3ae9
  $A25F: E3 30     ISB ($30,X)
  $A261: 31 0C     AND ($0c),Y
  $A263: 90 30     BCC $a295
  $A265: 85 31     STA $31
  $A267: 30 98     BMI $a201
  $A269: 2A        ROL A
  $A26A: 8A        TXA
  $A26B: 0C E0 00  NOP $00e0
  $A26E: 90 1A     BCC $a28a
  $A270: 8A        TXA
  $A271: 18        CLC
  $A272: 19 90 1A  ORA $1a90,Y
  $A275: E0 05     CPX #$05
  $A277: E9 3A     SBC #$3a
  $A279: E3 31     ISB ($31,X)
  $A27B: 33 0C     RLA ($0c),Y
  $A27D: A0 35     LDY #$35
  $A27F: 0C 8A 0C  NOP $0c8a
  $A282: 2A        ROL A
  $A283: 2A        ROL A
  $A284: 28        PLP
  $A285: 2A        ROL A
  $A286: 90 2A     BCC $a2b2
  $A288: 8A        TXA
  $A289: 31 9D     AND ($9d),Y
  $A28B: 2A        ROL A
  $A28C: 90 0C     BCC $a29a
  $A28E: E9 4C     SBC #$4c
  $A290: E3 8A     ISB ($8a,X)
  $A292: 0C 33 33  NOP $3333
  $A295: 31 33     AND ($33),Y
  $A297: 90 33     BCC $a2cc
  $A299: 8A        TXA
  $A29A: 35 9D     AND $9d,X
  $A29C: 33 90     RLA ($90),Y
  $A29E: 0C E9 4C  NOP $4ce9
  $A2A1: E3 82     ISB ($82,X)
  $A2A3: 33 34     RLA ($34),Y
  $A2A5: 86 35     STX $35
  $A2A7: 8A        TXA
  $A2A8: 35 35     AND $35,X
  $A2AA: 33 82     RLA ($82),Y
  $A2AC: 33 34     RLA ($34),Y
  $A2AE: 86 35     STX $35
  $A2B0: 8A        TXA
  $A2B1: 35 90     AND $90,X
  $A2B3: 35 E2     AND $e2,X
  $A2B5: 80 82     NOP #$82
  $A2B7: 23 24     RLA ($24,X)
  $A2B9: 86 25     STX $25
  $A2BB: 8A        TXA
  $A2BC: 25 25     AND $25
  $A2BE: 23 82     RLA ($82,X)
  $A2C0: 23 24     RLA ($24,X)
  $A2C2: 86 25     STX $25
  $A2C4: 8A        TXA
  $A2C5: 25 90     AND $90
  $A2C7: 25 E2     AND $e2
  $A2C9: 40        RTI
  $A2CA: 82 31     NOP #$31
  $A2CC: 32        ???
  $A2CD: 86 33     STX $33
  $A2CF: 8A        TXA
  $A2D0: 33 33     RLA ($33),Y
  $A2D2: 31 82     AND ($82),Y
  $A2D4: 31 32     AND ($32),Y
  $A2D6: 86 33     STX $33
  $A2D8: 8A        TXA
  $A2D9: 33 90     RLA ($90),Y
  $A2DB: 33 E2     RLA ($e2),Y
  $A2DD: 80 82     NOP #$82
  $A2DF: 21 22     AND ($22,X)
  $A2E1: 86 23     STX $23
  $A2E3: 8A        TXA
  $A2E4: 23 23     RLA ($23,X)
  $A2E6: 21 82     AND ($82,X)
  $A2E8: 21 22     AND ($22,X)
  $A2EA: 86 23     STX $23
  $A2EC: 8A        TXA
  $A2ED: 23 90     RLA ($90,X)
  $A2EF: 23 E2     RLA ($e2,X)
  $A2F1: 40        RTI
  $A2F2: 8A        TXA
  $A2F3: 0C 82 2B  NOP $2b82
  $A2F6: 30 86     BMI $a27e
  $A2F8: 31 8A     AND ($8a),Y
  $A2FA: 31 31     AND ($31),Y
  $A2FC: 82 2A     NOP #$2a
  $A2FE: 2B 86     ANC #$86
  $A300: 30 8A     BMI $a28c
  $A302: 30 30     BMI $a334
  $A304: 30 28     BMI $a32e
  $A306: 28        PLP
  $A307: 28        PLP
  $A308: 28        PLP
  $A309: 90 25     BCC $a330
  $A30B: 30 A0     BMI $a2ad
  $A30D: 2A        ROL A
  $A30E: E0 09     CPX #$09
  $A310: 8A        TXA
  $A311: 0C 2A 28  NOP $282a
  $A314: 2A        ROL A
  $A315: 31 30     AND ($30),Y
  $A317: 2A        ROL A
  $A318: 28        PLP
  $A319: E0 05     CPX #$05
  $A31B: E9 5A     SBC #$5a
  $A31D: E3 90     ISB ($90,X)
  $A31F: 36 8A     ROL $8a,X
  $A321: 35 98     AND $98,X
  $A323: 33 8A     RLA ($8a),Y
  $A325: 0C 90 35  NOP $3590
  $A328: 8A        TXA
  $A329: 33 98     RLA ($98),Y
  $A32B: 31 90     AND ($90),Y
  $A32D: 0C 35 8A  NOP $8a35
  $A330: 33 30     RLA ($30),Y
  $A332: 31 30     AND ($30),Y
  $A334: 28        PLP
  $A335: A0 2A     LDY #$2a
  $A337: 9D 0C EA  STA $ea0c,X
  $A33A: 8A        TXA
  $A33B: 2A        ROL A
  $A33C: 30 90     BMI $a2ce
  $A33E: 31 8A     AND ($8a),Y
  $A340: 31 30     AND ($30),Y
  $A342: 2A        ROL A
  $A343: 31 2A     AND ($2a),Y
  $A345: 0C 33 0C  NOP $0c33
  $A348: 31 0C     AND ($0c),Y
  $A34A: 30 EA     BMI $a336
  $A34C: 8A        TXA
  $A34D: 33 33     RLA ($33),Y
  $A34F: 33 31     RLA ($31),Y
  $A351: 30 31     BMI $a384
  $A353: 30 28     BMI $a37d
  $A355: 9D 2A 90  STA $902a,X
  $A358: 0C EA 8A  NOP $8aea
  $A35B: 0C 2A 0C  NOP $0c2a
  $A35E: 28        PLP
  $A35F: 95 2A     STA $2a,X
  $A361: 8A        TXA
  $A362: 28        PLP
  $A363: 2A        ROL A
  $A364: 9D 25 8A  STA $8a25,X
  $A367: 0C 0C 30  NOP $300c
  $A36A: 0C 2A 95  NOP $952a
  $A36D: 30 8A     BMI $a2f9
  $A36F: 31 33     AND ($33),Y
  $A371: 9D 30 8A  STA $8a30,X
  $A374: 0C EA E2  NOP $e2ea
  $A377: C0 E3     CPY #$e3
  $A379: 06 E0     ASL $e0
  $A37B: 09 E9     ORA #$e9
  $A37D: 90 E3     BCC $a362
  $A37F: E0 09     CPX #$09
  $A381: E9 15     SBC #$15
  $A383: E4 FF     CPX $ff
  $A385: E0 0E     CPX #$0e
  $A387: E9 90     SBC #$90
  $A389: E3 E0     ISB ($e0,X)
  $A38B: 0E E9 15  ASL $15e9
  $A38E: E4 FF     CPX $ff
  $A390: 8A        TXA
  $A391: 1A        NOP
  $A392: 18        CLC
  $A393: EB 08     SBC #$08
  $A395: 16 EC     ASL $ec,X
  $A397: EB 08     SBC #$08
  $A399: 18        CLC
  $A39A: EC 95 1A  CPX $1a95
  $A39D: 8A        TXA
  $A39E: 1A        NOP
  $A39F: 1A        NOP
  $A3A0: 1A        NOP
  $A3A1: 90 1A     BCC $a3bd
  $A3A3: 1A        NOP
  $A3A4: 8A        TXA
  $A3A5: 18        CLC
  $A3A6: 19 90 1A  ORA $1a90,Y
  $A3A9: 8A        TXA
  $A3AA: 1A        NOP
  $A3AB: 18        CLC
  $A3AC: EB 08     SBC #$08
  $A3AE: 16 EC     ASL $ec,X
  $A3B0: EB 08     SBC #$08
  $A3B2: 18        CLC
  $A3B3: EC 95 15  CPX $1595
  $A3B6: 8A        TXA
  $A3B7: 15 15     ORA $15,X
  $A3B9: 15 90     ORA $90,X
  $A3BB: 15 1A     ORA $1a,X
  $A3BD: 8A        TXA
  $A3BE: 15 8C     ORA $8c,X
  $A3C0: 16 8B     ASL $8b,X
  $A3C2: 17 18     SLO $18,X
  $A3C4: 19 90 1A  ORA $1a90,Y
  $A3C7: 0C 1A 0C  NOP $0c1a
  $A3CA: E9 0B     SBC #$0b
  $A3CC: E4 E9     CPX $e9
  $A3CE: 06 E4     ASL $e4
  $A3D0: 90 23     BCC $a3f5
  $A3D2: 0C 23 0C  NOP $0c23
  $A3D5: 8A        TXA
  $A3D6: 23 23     RLA ($23,X)
  $A3D8: 21 90     AND ($90,X)
  $A3DA: 23 21     RLA ($21,X)
  $A3DC: 8A        TXA
  $A3DD: 23 E9     RLA ($e9,X)
  $A3DF: 06 E4     ASL $e4
  $A3E1: 85 1A     STA $1a
  $A3E3: 1A        NOP
  $A3E4: EB 0F     SBC #$0f
  $A3E6: 8A        TXA
  $A3E7: 1A        NOP
  $A3E8: EC 85 18  CPX $1885
  $A3EB: 18        CLC
  $A3EC: EB 0F     SBC #$0f
  $A3EE: 8A        TXA
  $A3EF: 18        CLC
  $A3F0: EC 16 16  CPX $1616
  $A3F3: 16 16     ASL $16,X
  $A3F5: 18        CLC
  $A3F6: 18        CLC
  $A3F7: 18        CLC
  $A3F8: 18        CLC
  $A3F9: 15 15     ORA $15,X
  $A3FB: 15 15     ORA $15,X
  $A3FD: 18        CLC
  $A3FE: 18        CLC
  $A3FF: 18        CLC
  $A400: 18        CLC
  $A401: EB 08     SBC #$08
  $A403: 1A        NOP
  $A404: EC EA 90  CPX $90ea
  $A407: 18        CLC
  $A408: 0C 18 0C  NOP $0c18
  $A40B: 8A        TXA
  $A40C: 1A        NOP
  $A40D: 1A        NOP
  $A40E: 18        CLC
  $A40F: 90 1A     BCC $a42b
  $A411: 18        CLC
  $A412: 8A        TXA
  $A413: 1A        NOP
  $A414: EA        NOP
  $A415: 0C 1A 18  NOP $181a
  $A418: 1A        NOP
  $A419: 21 20     AND ($20,X)
  $A41B: 1A        NOP
  $A41C: 18        CLC
  $A41D: E9 3C     SBC #$3c
  $A41F: E4 8A     CPX $8a
  $A421: 25 90     AND $90
  $A423: 16 0C     ASL $0c,X
  $A425: 16 0C     ASL $0c,X
  $A427: 8A        TXA
  $A428: 1A        NOP
  $A429: 1A        NOP
  $A42A: 18        CLC
  $A42B: 90 1A     BCC $a447
  $A42D: 18        CLC
  $A42E: 8A        TXA
  $A42F: 1A        NOP
  $A430: E0 06     CPX #$06
  $A432: 0C 9D 15  NOP $159d
  $A435: 8A        TXA
  $A436: 0C A0 1A  NOP $1aa0
  $A439: 9D 0C EA  STA $ea0c,X
  $A43C: 90 1A     BCC $a458
  $A43E: 0C 1A 0C  NOP $0c1a
  $A441: 8A        TXA
  $A442: 1A        NOP
  $A443: 1A        NOP
  $A444: 18        CLC
  $A445: 90 1A     BCC $a461
  $A447: 18        CLC
  $A448: 8A        TXA
  $A449: 1A        NOP
  $A44A: 90 20     BCC $a46c
  $A44C: 0C 20 0C  NOP $0c20
  $A44F: 8A        TXA
  $A450: 25 25     AND $25
  $A452: 23 90     RLA ($90,X)
  $A454: 25 23     AND $23
  $A456: EA        NOP
  $A457: E0 09     CPX #$09
  $A459: E3 05     ISB ($05,X)
  $A45B: 8A        TXA
  $A45C: 05 05     ORA $05
  $A45E: E9 95     SBC #$95
  $A460: E4 05     CPX $05
  $A462: 05 10     ORA $10
  $A464: 05 10     ORA $10
  $A466: E9 95     SBC #$95
  $A468: E4 8C     CPX $8c
  $A46A: 05 8B     ORA $8b
  $A46C: 05 05     ORA $05
  $A46E: 05 EB     ORA $eb
  $A470: 0F E9 AC  SLO $ace9
  $A473: E4 EC     CPX $ec
  $A475: 01 01     ORA ($01,X)
  $A477: 05 85     ORA $85
  $A479: 05 05     ORA $05
  $A47B: EB 0E     SBC #$0e
  $A47D: E9 AC     SBC #$ac
  $A47F: E4 EC     CPX $ec
  $A481: 8A        TXA
  $A482: 10 EB     BPL $a46f
  $A484: 07 05     SLO $05
  $A486: EC EB 0C  CPX $0ceb
  $A489: E9 AC     SBC #$ac
  $A48B: E4 EC     CPX $ec
  $A48D: 10 05     BPL $a494
  $A48F: 10 9D     BPL $a42e
  $A491: 10 A0     BPL $a433
  $A493: 10 FF     BPL $a494
  $A495: EB 02     SBC #$02
  $A497: 01 01     ORA ($01,X)
  $A499: 05 01     ORA $01
  $A49B: 01 05     ORA ($05,X)
  $A49D: 01 01     ORA ($01,X)
  $A49F: EC 98 10  CPX $1098
  $A4A2: 8A        TXA
  $A4A3: 05 05     ORA $05
  $A4A5: 05 0C     ORA $0c
  $A4A7: 90 10     BCC $a4b9
  $A4A9: 8A        TXA
  $A4AA: 05 EA     ORA $ea
  $A4AC: 8A        TXA
  $A4AD: 01 01     ORA ($01,X)
  $A4AF: 05 01     ORA $01
  $A4B1: EA        NOP
  $A4B2: 04 BF     NOP $bf
  $A4B4: E4 05     CPX $05
  $A4B6: D7 E4     DCP $e4,X
  $A4B8: 06 E6     ASL $e6
  $A4BA: E4 07     CPX $07
  $A4BC: ED E4 FF  SBC $ffe4
  $A4BF: E0 09     CPX #$09
  $A4C1: E2 00     NOP #$00
  $A4C3: E3 07     ISB ($07,X)
  $A4C5: E9 CB     SBC #$cb
  $A4C7: E4 98     CPX $98
  $A4C9: 23 FF     RLA ($ff,X)
  $A4CB: 8A        TXA
  $A4CC: 23 90     RLA ($90,X)
  $A4CE: 23 23     RLA ($23,X)
  $A4D0: 8A        TXA
  $A4D1: 23 23     RLA ($23,X)
  $A4D3: 26 25     ROL $25
  $A4D5: 24 EA     BIT $ea
  $A4D7: E0 00     CPX #$00
  $A4D9: E2 C0     NOP #$c0
  $A4DB: E3 08     ISB ($08,X)
  $A4DD: ED 85 0C  SBC $0c85
  $A4E0: E9 CB     SBC #$cb
  $A4E2: E4 98     CPX $98
  $A4E4: 23 FF     RLA ($ff,X)
  $A4E6: E0 0D     CPX #$0d
  $A4E8: E9 CB     SBC #$cb
  $A4EA: E4 23     CPX $23
  $A4EC: FF E0 09  ISB $09e0,X
  $A4EF: E3 06     ISB ($06,X)
  $A4F1: 8A        TXA
  $A4F2: 05 05     ORA $05
  $A4F4: 10 05     BPL $a4fb
  $A4F6: 10 EB     BPL $a4e3
  $A4F8: 06 05     ASL $05
  $A4FA: EC FF 03  CPX $03ff
  $A4FD: 44 E2     NOP $e2
  $A4FF: 04 0B     NOP $0b
  $A501: E5 05     SBC $05
  $A503: A1 E5     LDA ($e5,X)
  $A505: 06 20     ASL $20
  $A507: E6 07     INC $07
  $A509: 89 E6     NOP #$e6
  $A50B: E0 06     CPX #$06
  $A50D: E2 00     NOP #$00
  $A50F: E3 07     ISB ($07,X)
  $A511: ED 8C 26  SBC $268c
  $A514: 31 36     AND ($36),Y
  $A516: 31 41     AND ($41),Y
  $A518: 38        SEC
  $A519: 3A        NOP
  $A51A: 36 26     ROL $26,X
  $A51C: 31 36     AND ($36),Y
  $A51E: 31 41     AND ($41),Y
  $A520: 38        SEC
  $A521: E2 C0     NOP #$c0
  $A523: E0 02     CPX #$02
  $A525: 8C 21 26  STY $2621
  $A528: 99 2A 8C  STA $8c2a,Y
  $A52B: 2A        ROL A
  $A52C: A1 2A     LDA ($2a,X)
  $A52E: 8C 26 28  STY $2826
  $A531: 2A        ROL A
  $A532: 28        PLP
  $A533: 26 2A     ROL $2a
  $A535: 99 28 8C  STA $8c28,Y
  $A538: 23 A5     RLA ($a5,X)
  $A53A: 28        PLP
  $A53B: 8B 0C     XAA #$0c
  $A53D: 8C 28 2A  STY $2a28
  $A540: 99 2B 8C  STA $8c2b,Y
  $A543: 2B A1     ANC #$a1
  $A545: 2B 8C     ANC #$8c
  $A547: 2B 31     ANC #$31
  $A549: 33 31     RLA ($31),Y
  $A54B: 2B 33     ANC #$33
  $A54D: 99 31 8C  STA $8c31,Y
  $A550: 26 A5     ROL $a5
  $A552: 26 8B     ROL $8b
  $A554: 0C E9 72  NOP $72e9
  $A557: E5 31     SBC $31
  $A559: 2B 9E     ANC #$9e
  $A55B: 2A        ROL A
  $A55C: 86 0C     STX $0c
  $A55E: 94 2A     STY $2a,X
  $A560: 8C 2B A1  STY $a12b
  $A563: 31 E9     AND ($e9),Y
  $A565: 72        ???
  $A566: E5 31     SBC $31
  $A568: 35 A4     AND $a4,X
  $A56A: 36 9C     ROL $9c,X
  $A56C: 28        PLP
  $A56D: 94 27     STY $27,X
  $A56F: E8        INX
  $A570: 25 E5     AND $e5
  $A572: 8C 26 28  STY $2826
  $A575: 99 33 8C  STA $8c33,Y
  $A578: 33 9C     RLA ($9c),Y
  $A57A: 33 8C     RLA ($8c),Y
  $A57C: 0C 33 35  NOP $3533
  $A57F: 36 38     ROL $38,X
  $A581: 36 35     ROL $35,X
  $A583: 33 99     RLA ($99),Y
  $A585: 31 8C     AND ($8c),Y
  $A587: 31 9C     AND ($9c),Y
  $A589: 31 8C     AND ($8c),Y
  $A58B: 0C 31 33  NOP $3331
  $A58E: 35 36     AND $36,X
  $A590: 35 33     AND $33,X
  $A592: 31 99     AND ($99),Y
  $A594: 2B 8C     ANC #$8c
  $A596: 2B 9C     ANC #$9c
  $A598: 2B 8C     ANC #$8c
  $A59A: 0C 2B 31  NOP $312b
  $A59D: 33 35     RLA ($35),Y
  $A59F: 33 EA     RLA ($ea),Y
  $A5A1: E0 0F     CPX #$0f
  $A5A3: E2 40     NOP #$40
  $A5A5: E3 09     ISB ($09,X)
  $A5A7: EB 07     SBC #$07
  $A5A9: 94 46     STY $46,X
  $A5AB: EC 8C 3A  CPX $3a8c
  $A5AE: 36 94     ROL $94,X
  $A5B0: EB 07     SBC #$07
  $A5B2: 46 EC     LSR $ec
  $A5B4: 8C 46 47  STY $4746
  $A5B7: 48        PHA
  $A5B8: 94 48     STY $48,X
  $A5BA: 48        PHA
  $A5BB: 8C 4B 4A  STY $4a4b
  $A5BE: 46 94     LSR $94
  $A5C0: 48        PHA
  $A5C1: 48        PHA
  $A5C2: 48        PHA
  $A5C3: 8C 48 4A  STY $4a48
  $A5C6: EB 08     SBC #$08
  $A5C8: 94 4B     STY $4b,X
  $A5CA: EC EB 05  CPX $05eb
  $A5CD: 8C 51 EC  STY $ec51
  $A5D0: 53 51     SRE ($51),Y
  $A5D2: 4B 94     ALR #$94
  $A5D4: 4A        LSR A
  $A5D5: 46 46     LSR $46
  $A5D7: 46 E9     LSR $e9
  $A5D9: FD E5 94  SBC $94e5,X
  $A5DC: 43 43     SRE ($43,X)
  $A5DE: 3B 3B EB  RLA $eb3b,Y
  $A5E1: 07 8C     SLO $8c
  $A5E3: 3A        NOP
  $A5E4: EC 3B EB  CPX $eb3b
  $A5E7: 08        PHP
  $A5E8: 41 EC     EOR ($ec,X)
  $A5EA: E9 FD     SBC #$fd
  $A5EC: E5 94     SBC $94
  $A5EE: 43 43     SRE ($43,X)
  $A5F0: 45 45     EOR $45
  $A5F2: EB 04     SBC #$04
  $A5F4: 46 EC     LSR $ec
  $A5F6: 48        PHA
  $A5F7: 48        PHA
  $A5F8: 47 46     SRE $46
  $A5FA: E8        INX
  $A5FB: AF E5 EB  LAX $ebe5
  $A5FE: 05 8C     ORA $8c
  $A600: 43 EC     SRE ($ec,X)
  $A602: 46 45     LSR $45
  $A604: 43 94     SRE ($94,X)
  $A606: 46 46     LSR $46
  $A608: 43 43     SRE ($43,X)
  $A60A: EB 05     SBC #$05
  $A60C: 8C 41 EC  STY $ec41
  $A60F: 45 43     EOR $43
  $A611: 41 94     EOR ($94,X)
  $A613: 45 45     EOR $45
  $A615: 41 41     EOR ($41,X)
  $A617: EB 05     SBC #$05
  $A619: 8C 3B EC  STY $ec3b
  $A61C: 43 41     SRE ($41,X)
  $A61E: 3B EA E0  RLA $e0ea,Y
  $A621: 13 A4     SLO ($a4),Y
  $A623: 0C 0C E9  NOP $e90c
  $A626: 7F E6 EB  RRA $ebe6,X
  $A629: 02        ???
  $A62A: 99 18 8C  STA $8c18,Y
  $A62D: 18        CLC
  $A62E: 9C 18 EC  SHY $ec18,X
  $A631: EB 02     SBC #$02
  $A633: 99 1B 8C  STA $8c1b,Y
  $A636: 1B 9C 1B  SLO $1b9c,Y
  $A639: EC E9 7F  CPX $7fe9
  $A63C: E6 E9     INC $e9
  $A63E: 5F E6 99  SRE $99e6,X
  $A641: 1A        NOP
  $A642: 8C 1A 9C  STY $9c1a
  $A645: 1A        NOP
  $A646: 99 1A E0  STA $e01a,Y
  $A649: 0E 8C 1B  ASL $1b8c
  $A64C: 9C 21 E9  SHY $e921,X
  $A64F: 5F E6 E0  SRE $e0e6,X
  $A652: 13 99     SLO ($99),Y
  $A654: 16 8C     ASL $8c,X
  $A656: 16 9C     ASL $9c,X
  $A658: 16 9C     ASL $9c,X
  $A65A: 18        CLC
  $A65B: 17 E8     SLO $e8,X
  $A65D: 25 E6     AND $e6
  $A65F: E0 0E     CPX #$0e
  $A661: EB 02     SBC #$02
  $A663: 99 23 8C  STA $8c23,Y
  $A666: 13 9C     SLO ($9c),Y
  $A668: 23 EC     RLA ($ec,X)
  $A66A: EB 02     SBC #$02
  $A66C: 99 21 8C  STA $8c21,Y
  $A66F: 11 9C     ORA ($9c),Y
  $A671: 21 EC     AND ($ec,X)
  $A673: E0 0D     CPX #$0d
  $A675: EB 02     SBC #$02
  $A677: 99 1B 8C  STA $8c1b,Y
  $A67A: 0B 9C     ANC #$9c
  $A67C: 1B EC EA  SLO $eaec,Y
  $A67F: EB 02     SBC #$02
  $A681: 99 16 8C  STA $8c16,Y
  $A684: 16 9C     ASL $9c,X
  $A686: 16 EC     ASL $ec,X
  $A688: EA        NOP
  $A689: E0 09     CPX #$09
  $A68B: E3 06     ISB ($06,X)
  $A68D: A4 10     LDY $10
  $A68F: A1 10     LDA ($10,X)
  $A691: 8C 06 06  STY $0606
  $A694: 8C 01 01  STY $0101
  $A697: 05 87     ORA $87
  $A699: 01 01     ORA ($01,X)
  $A69B: 8C 01 01  STY $0101
  $A69E: 05 01     ORA $01
  $A6A0: E8        INX
  $A6A1: 94 E6     STY $e6,X
  $A6A3: 04 B0     NOP $b0
  $A6A5: E6 05     INC $05
  $A6A7: 16 E7     ASL $e7,X
  $A6A9: 06 C2     ASL $c2
  $A6AB: E7 07     ISB $07
  $A6AD: 2F E8 FF  RLA $ffe8
  $A6B0: E0 01     CPX #$01
  $A6B2: E2 80     NOP #$80
  $A6B4: E3 0A     ISB ($0a,X)
  $A6B6: ED A2 47  SBC $47a2
  $A6B9: 47 47     SRE $47
  $A6BB: 47 E3     SRE $e3
  $A6BD: 09 EB     ORA #$eb
  $A6BF: 02        ???
  $A6C0: 9A        TXS
  $A6C1: 27 8B     RLA $8b
  $A6C3: 27 28     RLA $28
  $A6C5: 2A        ROL A
  $A6C6: 92        ???
  $A6C7: 33 8B     RLA ($8b),Y
  $A6C9: 33 92     RLA ($92),Y
  $A6CB: 31 8B     AND ($8b),Y
  $A6CD: 30 97     BMI $a666
  $A6CF: 2A        ROL A
  $A6D0: 9A        TXS
  $A6D1: 28        PLP
  $A6D2: 8B 25     XAA #$25
  $A6D4: 27 28     RLA $28
  $A6D6: 92        ???
  $A6D7: 35 8B     AND $8b,X
  $A6D9: 35 92     AND $92,X
  $A6DB: 33 8B     RLA ($8b),Y
  $A6DD: 32        ???
  $A6DE: 97 30     SAX $30,Y
  $A6E0: EC E9 0A  CPX $0ae9
  $A6E3: E7 9F     ISB $9f
  $A6E5: 28        PLP
  $A6E6: 8B 32     XAA #$32
  $A6E8: 33 92     RLA ($92),Y
  $A6EA: 27 8B     RLA $8b
  $A6EC: 27 92     RLA $92
  $A6EE: 28        PLP
  $A6EF: EF 29 ED  ISB $ed29
  $A6F2: 2A        ROL A
  $A6F3: E9 0A     SBC #$0a
  $A6F5: E7 92     ISB $92
  $A6F7: 38        SEC
  $A6F8: 8B 38     XAA #$38
  $A6FA: 92        ???
  $A6FB: 37 8B     RLA $8b,X
  $A6FD: 35 92     AND $92,X
  $A6FF: 33 9A     RLA ($9a),Y
  $A701: 35 8B     AND $8b,X
  $A703: 35 37     AND $37,X
  $A705: 97 3A     SAX $3a,Y
  $A707: E8        INX
  $A708: BE E6 9A  LDX $9ae6,Y
  $A70B: 30 8B     BMI $a698
  $A70D: 30 32     BMI $a741
  $A70F: 33 9F     RLA ($9f),Y
  $A711: 2A        ROL A
  $A712: 8B 32     XAA #$32
  $A714: 33 EA     RLA ($ea),Y
  $A716: E0 12     CPX #$12
  $A718: E2 00     NOP #$00
  $A71A: E3 06     ISB ($06,X)
  $A71C: 86 EB     STX $eb
  $A71E: 04 E9     NOP $e9
  $A720: 7F E7 EC  RRA $ece7,X
  $A723: E3 07     ISB ($07,X)
  $A725: EB 02     SBC #$02
  $A727: E9 7F     SBC #$7f
  $A729: E7 41     ISB $41
  $A72B: 3A        NOP
  $A72C: 41 41     EOR ($41,X)
  $A72E: 3A        NOP
  $A72F: 41 41     EOR ($41,X)
  $A731: 3A        NOP
  $A732: 41 3A     EOR ($3a,X)
  $A734: 41 3A     EOR ($3a,X)
  $A736: 3A        NOP
  $A737: 41 3A     EOR ($3a,X)
  $A739: 3A        NOP
  $A73A: E9 90     SBC #$90
  $A73C: E7 3A     ISB $3a
  $A73E: 37 3A     RLA $3a,X
  $A740: 3A        NOP
  $A741: 37 3A     RLA $3a,X
  $A743: 3A        NOP
  $A744: 37 3A     RLA $3a,X
  $A746: 37 3A     RLA $3a,X
  $A748: 37 37     RLA $37,X
  $A74A: 3A        NOP
  $A74B: 40        RTI
  $A74C: 42        ???
  $A74D: EC E3 06  CPX $06e3
  $A750: E9 90     SBC #$90
  $A752: E7 E9     ISB $e9
  $A754: A1 E7     LDA ($e7,X)
  $A756: 37 33     RLA $33,X
  $A758: 37 37     RLA $37,X
  $A75A: 33 37     RLA ($37),Y
  $A75C: 37 33     RLA $33,X
  $A75E: 37 33     RLA $33,X
  $A760: 37 33     RLA $33,X
  $A762: 33 35     RLA ($35),Y
  $A764: 36 37     ROL $37,X
  $A766: E9 90     SBC #$90
  $A768: E7 E9     ISB $e9
  $A76A: A1 E7     LDA ($e7,X)
  $A76C: 41 3A     EOR ($3a,X)
  $A76E: 41 41     EOR ($41,X)
  $A770: 3A        NOP
  $A771: 41 41     EOR ($41,X)
  $A773: 3A        NOP
  $A774: 42        ???
  $A775: 3A        NOP
  $A776: 42        ???
  $A777: 3A        NOP
  $A778: 3A        NOP
  $A779: 42        ???
  $A77A: 43 45     SRE ($45,X)
  $A77C: E8        INX
  $A77D: 23 E7     RLA ($e7,X)
  $A77F: 43 3A     SRE ($3a,X)
  $A781: 43 43     SRE ($43,X)
  $A783: 3A        NOP
  $A784: 43 43     SRE ($43,X)
  $A786: 3A        NOP
  $A787: 43 3A     SRE ($3a,X)
  $A789: 43 3A     SRE ($3a,X)
  $A78B: 3A        NOP
  $A78C: 43 3A     SRE ($3a,X)
  $A78E: 3A        NOP
  $A78F: EA        NOP
  $A790: 40        RTI
  $A791: 38        SEC
  $A792: 40        RTI
  $A793: 40        RTI
  $A794: 38        SEC
  $A795: 40        RTI
  $A796: 40        RTI
  $A797: 38        SEC
  $A798: 40        RTI
  $A799: 38        SEC
  $A79A: 40        RTI
  $A79B: 38        SEC
  $A79C: 38        SEC
  $A79D: 40        RTI
  $A79E: 38        SEC
  $A79F: 38        SEC
  $A7A0: EA        NOP
  $A7A1: 3A        NOP
  $A7A2: 37 3A     RLA $3a,X
  $A7A4: 3A        NOP
  $A7A5: 37 3A     RLA $3a,X
  $A7A7: 3A        NOP
  $A7A8: 37 3A     RLA $3a,X
  $A7AA: 37 3A     RLA $3a,X
  $A7AC: 37 37     RLA $37,X
  $A7AE: 3A        NOP
  $A7AF: 37 37     RLA $37,X
  $A7B1: 38        SEC
  $A7B2: 35 38     AND $38,X
  $A7B4: 38        SEC
  $A7B5: 35 38     AND $38,X
  $A7B7: 38        SEC
  $A7B8: 35 38     AND $38,X
  $A7BA: 35 38     AND $38,X
  $A7BC: 35 35     AND $35,X
  $A7BE: 38        SEC
  $A7BF: 35 35     AND $35,X
  $A7C1: EA        NOP
  $A7C2: A2 0C     LDX #$0c
  $A7C4: 0C 0C 0C  NOP $0c0c
  $A7C7: E0 0D     CPX #$0d
  $A7C9: E9 17     SBC #$17
  $A7CB: E8        INX
  $A7CC: 97 1A     SAX $1a,Y
  $A7CE: 92        ???
  $A7CF: 0C 20 22  NOP $2220
  $A7D2: E9 17     SBC #$17
  $A7D4: E8        INX
  $A7D5: 97 1A     SAX $1a,Y
  $A7D7: 92        ???
  $A7D8: 0C 8B 1A  NOP $1a8b
  $A7DB: 1A        NOP
  $A7DC: 0C E0 13  NOP $13e0
  $A7DF: E9 FB     SBC #$fb
  $A7E1: E7 92     ISB $92
  $A7E3: 13 8B     SLO ($8b),Y
  $A7E5: 13 92     SLO ($92),Y
  $A7E7: 15 16     ORA $16,X
  $A7E9: 8B 17     XAA #$17
  $A7EB: E9 FB     SBC #$fb
  $A7ED: E7 92     ISB $92
  $A7EF: 21 8B     AND ($8b,X)
  $A7F1: 21 92     AND ($92,X)
  $A7F3: 20 1A 8B  JSR $8b1a
  $A7F6: 20 22 E8  JSR $e822
  $A7F9: C7 E7     DCP $e7
  $A7FB: 92        ???
  $A7FC: 18        CLC
  $A7FD: 8B 18     XAA #$18
  $A7FF: 92        ???
  $A800: 18        CLC
  $A801: 18        CLC
  $A802: 8B 0C     XAA #$0c
  $A804: 92        ???
  $A805: 17 8B     SLO $8b,X
  $A807: 17 92     SLO $92,X
  $A809: 17 17     SLO $17,X
  $A80B: 8B 0C     XAA #$0c
  $A80D: 92        ???
  $A80E: 15 8B     ORA $8b,X
  $A810: 15 92     ORA $92,X
  $A812: 15 15     ORA $15,X
  $A814: 8B 0C     XAA #$0c
  $A816: EA        NOP
  $A817: 92        ???
  $A818: 23 0C     RLA ($0c,X)
  $A81A: 8B 23     XAA #$23
  $A81C: 23 0C     RLA ($0c,X)
  $A81E: 97 21     SAX $21,Y
  $A820: 92        ???
  $A821: 0C 8B 21  NOP $218b
  $A824: 21 0C     AND ($0c,X)
  $A826: 97 20     SAX $20,Y
  $A828: 92        ???
  $A829: 0C 8B 20  NOP $208b
  $A82C: 20 0C EA  JSR $ea0c
  $A82F: E3 06     ISB ($06,X)
  $A831: A2 10     LDX #$10
  $A833: 10 E0     BPL $a815
  $A835: 11 86     ORA ($86),Y
  $A837: EB 08     SBC #$08
  $A839: 00        BRK
  $A83A: EC EB 08  CPX $08eb
  $A83D: 01 EC     ORA ($ec,X)
  $A83F: 02        ???
  $A840: 02        ???
  $A841: 02        ???
  $A842: 02        ???
  $A843: 03 03     SLO ($03,X)
  $A845: 03 03     SLO ($03,X)
  $A847: 04 04     NOP $04
  $A849: 04 05     NOP $05
  $A84B: 05 05     ORA $05
  $A84D: 06 06     ASL $06
  $A84F: E3 05     ISB ($05,X)
  $A851: EB 04     SBC #$04
  $A853: EB 03     SBC #$03
  $A855: E0 11     CPX #$11
  $A857: 86 01     STX $01
  $A859: 01 01     ORA ($01,X)
  $A85B: 01 E0     ORA ($e0,X)
  $A85D: 09 05     ORA #$05
  $A85F: E0 11     CPX #$11
  $A861: 01 01     ORA ($01,X)
  $A863: 01 EC     ORA ($ec,X)
  $A865: 01 01     ORA ($01,X)
  $A867: 01 01     ORA ($01,X)
  $A869: E0 09     CPX #$09
  $A86B: 05 00     ORA $00
  $A86D: 05 00     ORA $00
  $A86F: EC EB 02  CPX $02eb
  $A872: EB 03     SBC #$03
  $A874: E0 12     CPX #$12
  $A876: E3 04     ISB ($04,X)
  $A878: 8B 01     XAA #$01
  $A87A: 05 05     ORA $05
  $A87C: 01 05     ORA ($05,X)
  $A87E: 01 05     ORA ($05,X)
  $A880: 05 EC     ORA $ec
  $A882: 01 05     ORA ($05,X)
  $A884: 05 01     ORA $01
  $A886: 05 01     ORA $01
  $A888: 05 01     ORA $01
  $A88A: EC E8 4F  CPX $4fe8
  $A88D: E8        INX
  $A88E: 04 9B     NOP $9b
  $A890: E8        INX
  $A891: 05 9C     ORA $9c
  $A893: E9 06     SBC #$06
  $A895: A4 E9     LDY $e9
  $A897: 07 77     SLO $77
  $A899: EA        NOP
  $A89A: FF E0 06  ISB $06e0,X
  $A89D: E3 06     ISB ($06,X)
  $A89F: E2 C0     NOP #$c0
  $A8A1: 91 23     STA ($23),Y
  $A8A3: 87 23     SAX $23
  $A8A5: 99 2B 8C  STA $8c2b,Y
  $A8A8: 2B 31     ANC #$31
  $A8AA: 2B 91     ANC #$91
  $A8AC: 2A        ROL A
  $A8AD: 87 28     SAX $28
  $A8AF: A1 2A     LDA ($2a,X)
  $A8B1: 91 26     STA ($26),Y
  $A8B3: 87 26     SAX $26
  $A8B5: 99 33 8C  STA $8c33,Y
  $A8B8: 33 34     RLA ($34),Y
  $A8BA: 33 91     RLA ($91),Y
  $A8BC: 31 87     AND ($87),Y
  $A8BE: 2B 94     ANC #$94
  $A8C0: 31 91     AND ($91),Y
  $A8C2: 31 87     AND ($87),Y
  $A8C4: 2B A6     ANC #$a6
  $A8C6: 33 A0     RLA ($a0),Y
  $A8C8: 0C E9 EF  NOP $efe9
  $A8CB: E8        INX
  $A8CC: E9 74     SBC #$74
  $A8CE: E9 E9     SBC #$e9
  $A8D0: 57 E9     SRE $e9,X
  $A8D2: 9F 33 E9  ??? $e933,Y
  $A8D5: EF E8 E9  ISB $e9e8
  $A8D8: 74 E9     NOP $e9,X
  $A8DA: 92        ???
  $A8DB: 0C E9 74  NOP $74e9
  $A8DE: E9 E9     SBC #$e9
  $A8E0: 57 E9     SRE $e9,X
  $A8E2: 8F 23 23  SAX $2323
  $A8E5: 8B 23     XAA #$23
  $A8E7: 8F 26 26  SAX $2626
  $A8EA: 8B 26     XAA #$26
  $A8EC: 92        ???
  $A8ED: 28        PLP
  $A8EE: FF E3 07  ISB $07e3,X
  $A8F1: 8F 23 86  SAX $8623
  $A8F4: 23 9D     RLA ($9d,X)
  $A8F6: 28        PLP
  $A8F7: 8B 28     XAA #$28
  $A8F9: 8F 2A 86  SAX $862a
  $A8FC: 28        PLP
  $A8FD: 9D 26 8B  STA $8b26,X
  $A900: 2A        ROL A
  $A901: 8F 28 86  SAX $8628
  $A904: 26 9D     ROL $9d
  $A906: 24 8B     BIT $8b
  $A908: 28        PLP
  $A909: 8F 26 86  SAX $8626
  $A90C: 24 A2     BIT $a2
  $A90E: 23 97     RLA ($97,X)
  $A910: 21 8B     AND ($8b,X)
  $A912: 23 9D     RLA ($9d,X)
  $A914: 24 8B     BIT $8b
  $A916: 28        PLP
  $A917: 26 24     ROL $24
  $A919: 9A        TXS
  $A91A: 23 92     RLA ($92,X)
  $A91C: 21 23     AND ($23,X)
  $A91E: 24 26     BIT $26
  $A920: 9F 23 8F  ??? $8f23,Y
  $A923: 23 86     RLA ($86,X)
  $A925: 23 9D     RLA ($9d,X)
  $A927: 28        PLP
  $A928: 8B 28     XAA #$28
  $A92A: 2A        ROL A
  $A92B: 2B A2     ANC #$a2
  $A92D: 31 8B     AND ($8b),Y
  $A92F: 2B 97     ANC #$97
  $A931: 2B 8B     ANC #$8b
  $A933: 2A        ROL A
  $A934: 97 2A     SAX $2a,Y
  $A936: A2 28     LDX #$28
  $A938: E3 06     ISB ($06,X)
  $A93A: 8B 28     XAA #$28
  $A93C: 28        PLP
  $A93D: 28        PLP
  $A93E: 2A        ROL A
  $A93F: 2B 97     ANC #$97
  $A941: 2B 8B     ANC #$8b
  $A943: 26 26     ROL $26
  $A945: 26 28     ROL $28
  $A947: 2A        ROL A
  $A948: 9A        TXS
  $A949: 2A        ROL A
  $A94A: 92        ???
  $A94B: 2B 8B     ANC #$8b
  $A94D: 2B 2B     ANC #$2b
  $A94F: 2B 8F     ANC #$8f
  $A951: 2A        ROL A
  $A952: 86 28     STX $28
  $A954: A2 2A     LDX #$2a
  $A956: EA        NOP
  $A957: 8F 23 86  SAX $8623
  $A95A: 23 9D     RLA ($9d,X)
  $A95C: 24 8B     BIT $8b
  $A95E: 24 8F     BIT $8f
  $A960: 26 86     ROL $86
  $A962: 24 9F     BIT $9f
  $A964: 23 8F     RLA ($8f,X)
  $A966: 23 86     RLA ($86,X)
  $A968: 23 9D     RLA ($9d,X)
  $A96A: 24 8B     BIT $8b
  $A96C: 24 8F     BIT $8f
  $A96E: 26 86     ROL $86
  $A970: 28        PLP
  $A971: A2 2A     LDX #$2a
  $A973: EA        NOP
  $A974: 8B 2B     XAA #$2b
  $A976: 92        ???
  $A977: 2B 8B     ANC #$8b
  $A979: 2A        ROL A
  $A97A: 9A        TXS
  $A97B: 28        PLP
  $A97C: 92        ???
  $A97D: 2B 8B     ANC #$8b
  $A97F: 2A        ROL A
  $A980: 9D 28 8B  STA $8b28,X
  $A983: 31 92     AND ($92),Y
  $A985: 31 8B     AND ($8b),Y
  $A987: 2B 9A     ANC #$9a
  $A989: 2A        ROL A
  $A98A: 92        ???
  $A98B: 31 8B     AND ($8b),Y
  $A98D: 2B 9F     ANC #$9f
  $A98F: 2A        ROL A
  $A990: 92        ???
  $A991: 2A        ROL A
  $A992: 8B 31     XAA #$31
  $A994: 2B 92     ANC #$92
  $A996: 2A        ROL A
  $A997: 8B 2B     XAA #$2b
  $A999: 9F 28 EA  ??? $ea28,Y
  $A99C: E0 02     CPX #$02
  $A99E: 84 0C     STY $0c
  $A9A0: ED E8 9D  SBC $9de8
  $A9A3: E8        INX
  $A9A4: E0 0C     CPX #$0c
  $A9A6: 94 0C     STY $0c,X
  $A9A8: A4 18     LDY $18
  $A9AA: 16 1B     ASL $1b,X
  $A9AC: 9C 21 23  SHY $2321,X
  $A9AF: A2 0C     LDX #$0c
  $A9B1: E9 D7     SBC #$d7
  $A9B3: E9 E9     SBC #$e9
  $A9B5: 14 EA     NOP $ea,X
  $A9B7: E9 25     SBC #$25
  $A9B9: EA        NOP
  $A9BA: E9 D7     SBC #$d7
  $A9BC: E9 E9     SBC #$e9
  $A9BE: 14 EA     NOP $ea,X
  $A9C0: E9 40     SBC #$40
  $A9C2: EA        NOP
  $A9C3: E9 14     SBC #$14
  $A9C5: EA        NOP
  $A9C6: E9 25     SBC #$25
  $A9C8: EA        NOP
  $A9C9: 8F 13 13  SAX $1313
  $A9CC: 8B 13     XAA #$13
  $A9CE: 8F 16 16  SAX $1616
  $A9D1: 8B 16     XAA #$16
  $A9D3: E0 05     CPX #$05
  $A9D5: 18        CLC
  $A9D6: FF E0 0A  ISB $0ae0,X
  $A9D9: E9 40     SBC #$40
  $A9DB: EA        NOP
  $A9DC: E9 40     SBC #$40
  $A9DE: EA        NOP
  $A9DF: E9 4B     SBC #$4b
  $A9E1: EA        NOP
  $A9E2: E9 56     SBC #$56
  $A9E4: EA        NOP
  $A9E5: E9 61     SBC #$61
  $A9E7: EA        NOP
  $A9E8: E9 6C     SBC #$6c
  $A9EA: EA        NOP
  $A9EB: E9 35     SBC #$35
  $A9ED: EA        NOP
  $A9EE: E9 6C     SBC #$6c
  $A9F0: EA        NOP
  $A9F1: E9 61     SBC #$61
  $A9F3: EA        NOP
  $A9F4: E9 40     SBC #$40
  $A9F6: EA        NOP
  $A9F7: E9 4B     SBC #$4b
  $A9F9: EA        NOP
  $A9FA: 92        ???
  $A9FB: 24 1B     BIT $1b
  $A9FD: 8F 23 86  SAX $8623
  $AA00: 23 8B     RLA ($8b,X)
  $AA02: 1A        NOP
  $AA03: 23 E9     RLA ($e9,X)
  $AA05: 40        RTI
  $AA06: EA        NOP
  $AA07: E9 40     SBC #$40
  $AA09: EA        NOP
  $AA0A: E9 4B     SBC #$4b
  $AA0C: EA        NOP
  $AA0D: E9 56     SBC #$56
  $AA0F: EA        NOP
  $AA10: E9 61     SBC #$61
  $AA12: EA        NOP
  $AA13: EA        NOP
  $AA14: E9 40     SBC #$40
  $AA16: EA        NOP
  $AA17: E9 40     SBC #$40
  $AA19: EA        NOP
  $AA1A: E9 4B     SBC #$4b
  $AA1C: EA        NOP
  $AA1D: E9 56     SBC #$56
  $AA1F: EA        NOP
  $AA20: 23 23     RLA ($23,X)
  $AA22: 9F 0C EA  ??? $ea0c,Y
  $AA25: E9 40     SBC #$40
  $AA27: EA        NOP
  $AA28: E9 6C     SBC #$6c
  $AA2A: EA        NOP
  $AA2B: E9 35     SBC #$35
  $AA2D: EA        NOP
  $AA2E: E9 6C     SBC #$6c
  $AA30: EA        NOP
  $AA31: E9 61     SBC #$61
  $AA33: EA        NOP
  $AA34: EA        NOP
  $AA35: 92        ???
  $AA36: 1B 16 8F  SLO $8f16,Y
  $AA39: 1B 86 1B  SLO $1b86,Y
  $AA3C: 8B 16     XAA #$16
  $AA3E: 1B EA 92  SLO $92ea,Y
  $AA41: 28        PLP
  $AA42: 23 8F     RLA ($8f,X)
  $AA44: 28        PLP
  $AA45: 86 28     STX $28
  $AA47: 8B 23     XAA #$23
  $AA49: 28        PLP
  $AA4A: EA        NOP
  $AA4B: 92        ???
  $AA4C: 26 21     ROL $21
  $AA4E: 8F 26 86  SAX $8626
  $AA51: 26 8B     ROL $8b
  $AA53: 21 26     AND ($26,X)
  $AA55: EA        NOP
  $AA56: 92        ???
  $AA57: 24 1B     BIT $1b
  $AA59: 8F 24 86  SAX $8624
  $AA5C: 24 8B     BIT $8b
  $AA5E: 1B 24 EA  SLO $ea24,Y
  $AA61: 92        ???
  $AA62: 23 1A     RLA ($1a,X)
  $AA64: 8F 23 86  SAX $8623
  $AA67: 23 8B     RLA ($8b,X)
  $AA69: 1A        NOP
  $AA6A: 23 EA     RLA ($ea,X)
  $AA6C: 92        ???
  $AA6D: 21 18     AND ($18,X)
  $AA6F: 8F 21 86  SAX $8621
  $AA72: 21 8B     AND ($8b,X)
  $AA74: 18        CLC
  $AA75: 21 EA     AND ($ea,X)
  $AA77: 94 10     STY $10,X
  $AA79: A4 10     LDY $10
  $AA7B: 10 10     BPL $aa8d
  $AA7D: 10 E0     BPL $aa5f
  $AA7F: 09 E3     ORA #$e3
  $AA81: 05 86     ORA $86
  $AA83: 00        BRK
  $AA84: 00        BRK
  $AA85: 00        BRK
  $AA86: 01 01     ORA ($01,X)
  $AA88: 01 02     ORA ($02,X)
  $AA8A: 02        ???
  $AA8B: 02        ???
  $AA8C: 03 03     SLO ($03,X)
  $AA8E: 03 04     SLO ($04,X)
  $AA90: 04 05     NOP $05
  $AA92: 05 E9     ORA $e9
  $AA94: B9 EA E9  LDA $e9ea,Y
  $AA97: D9 EA E9  CMP $e9ea,Y
  $AA9A: B9 EA EB  LDA $ebea,Y
  $AA9D: 08        PHP
  $AA9E: 8B 01     XAA #$01
  $AAA0: 01 05     ORA ($05,X)
  $AAA2: 01 EC     ORA ($ec,X)
  $AAA4: E9 CD     SBC #$cd
  $AAA6: EA        NOP
  $AAA7: E9 D9     SBC #$d9
  $AAA9: EA        NOP
  $AAAA: E3 04     ISB ($04,X)
  $AAAC: EB 02     SBC #$02
  $AAAE: 8F 02 03  SAX $0302
  $AAB1: 8B 04     XAA #$04
  $AAB3: EC 86 05  CPX $0586
  $AAB6: 04 05     NOP $05
  $AAB8: FF EB 0A  ISB $0aeb,X
  $AABB: 8B 01     XAA #$01
  $AABD: 01 05     ORA ($05,X)
  $AABF: 01 01     ORA ($01,X)
  $AAC1: 01 05     ORA ($05,X)
  $AAC3: 01 01     ORA ($01,X)
  $AAC5: 01 05     ORA ($05,X)
  $AAC7: 01 01     ORA ($01,X)
  $AAC9: 01 05     ORA ($05,X)
  $AACB: 06 EC     ASL $ec
  $AACD: EB 02     SBC #$02
  $AACF: 01 01     ORA ($01,X)
  $AAD1: 05 01     ORA $01
  $AAD3: EC 05 06  CPX $0605
  $AAD6: 9F 10 EA  ??? $ea10,Y
  $AAD9: EB 04     SBC #$04
  $AADB: 86 01     STX $01
  $AADD: 02        ???
  $AADE: EC 03 99  CPX $9903
  $AAE1: 10 EB     BPL $aace
  $AAE3: 08        PHP
  $AAE4: 8B 01     XAA #$01
  $AAE6: 01 05     ORA ($05,X)
  $AAE8: 01 EC     ORA ($ec,X)
  $AAEA: EA        NOP
  $AAEB: 04 F8     NOP $f8
  $AAED: EA        NOP
  $AAEE: 05 21     ORA $21
  $AAF0: EB 06     SBC #$06
  $AAF2: 2B EB     ANC #$eb
  $AAF4: 07 63     SLO $63
  $AAF6: EB FF     SBC #$ff
  $AAF8: E0 00     CPX #$00
  $AAFA: E3 09     ISB ($09,X)
  $AAFC: E2 C0     NOP #$c0
  $AAFE: 98        TYA
  $AAFF: 0C 8A EB  NOP $eb8a
  $AB02: 02        ???
  $AB03: 1B 26 25  SLO $2526,Y
  $AB06: 26 EC     ROL $ec
  $AB08: EB 02     SBC #$02
  $AB0A: 21 26     AND ($26,X)
  $AB0C: 25 26     AND $26
  $AB0E: EC EB 02  CPX $02eb
  $AB11: 23 26     RLA ($26,X)
  $AB13: 25 26     AND $26
  $AB15: EC 23 25  CPX $2523
  $AB18: 26 23     ROL $23
  $AB1A: 2A        ROL A
  $AB1B: 28        PLP
  $AB1C: 26 25     ROL $25
  $AB1E: E8        INX
  $AB1F: 00        BRK
  $AB20: EB E0     SBC #$e0
  $AB22: 02        ???
  $AB23: E3 0C     ISB ($0c,X)
  $AB25: ED 89 0C  SBC $0c89
  $AB28: E8        INX
  $AB29: FC EA 98  NOP $98ea,X
  $AB2C: 0C E0 14  NOP $14e0
  $AB2F: 85 1B     STA $1b
  $AB31: E0 10     CPX #$10
  $AB33: 1B E0 14  SLO $14e0,Y
  $AB36: 1B E0 10  SLO $10e0,Y
  $AB39: 1B EB 06  SLO $06eb,Y
  $AB3C: 8A        TXA
  $AB3D: 1B EC E0  SLO $e0ec,Y
  $AB40: 14 85     NOP $85,X
  $AB42: 21 E0     AND ($e0,X)
  $AB44: 10 21     BPL $ab67
  $AB46: E0 14     CPX #$14
  $AB48: 21 E0     AND ($e0,X)
  $AB4A: 10 21     BPL $ab6d
  $AB4C: EB 06     SBC #$06
  $AB4E: 8A        TXA
  $AB4F: 21 EC     AND ($ec,X)
  $AB51: EB 02     SBC #$02
  $AB53: 85 23     STA $23
  $AB55: 23 23     RLA ($23,X)
  $AB57: 23 EB     RLA ($eb,X)
  $AB59: 06 82     ASL $82
  $AB5B: 23 88     RLA ($88,X)
  $AB5D: 0C EC EC  NOP $ecec
  $AB60: E8        INX
  $AB61: 2D EB E0  AND $e0eb
  $AB64: 12        ???
  $AB65: E3 05     ISB ($05,X)
  $AB67: EB 08     SBC #$08
  $AB69: 85 02     STA $02
  $AB6B: EC EB 03  CPX $03eb
  $AB6E: 8A        TXA
  $AB6F: 01 01     ORA ($01,X)
  $AB71: 05 01     ORA $01
  $AB73: 01 01     ORA ($01,X)
  $AB75: 05 05     ORA $05
  $AB77: EC 01 05  CPX $0501
  $AB7A: 01 05     ORA ($05,X)
  $AB7C: 01 05     ORA ($05,X)
  $AB7E: 05 05     ORA $05
  $AB80: E8        INX
  $AB81: 6C EB 03  JMP ($03eb)
  $AB84: 44 E2     NOP $e2
  $AB86: 04 93     NOP $93
  $AB88: EB 05     SBC #$05
  $AB8A: DB EB 06  DCP $06eb,Y
  $AB8D: 1A        NOP
  $AB8E: EC 07 57  CPX $5707
  $AB91: EC FF E0  CPX $e0ff
  $AB94: 05 E2     ORA $e2
  $AB96: 40        RTI
  $AB97: E3 0A     ISB ($0a,X)
  $AB99: A7 36     LAX $36
  $AB9B: E0 01     CPX #$01
  $AB9D: 36 E0     ROL $e0,X
  $AB9F: 00        BRK
  $ABA0: E3 06     ISB ($06,X)
  $ABA2: EB 02     SBC #$02
  $ABA4: 8B 0C     XAA #$0c
  $ABA6: 26 92     ROL $92
  $ABA8: 0C 26 E2  NOP $e226
  $ABAB: 80 E3     NOP #$e3
  $ABAD: 07 38     SLO $38
  $ABAF: 8B 3A     XAA #$3a
  $ABB1: E2 40     NOP #$40
  $ABB3: E3 06     ISB ($06,X)
  $ABB5: 8B 26     XAA #$26
  $ABB7: 0C 26 92  NOP $9226
  $ABBA: 2B 2A     ANC #$2a
  $ABBC: EC EB 02  CPX $02eb
  $ABBF: 8B 0C     XAA #$0c
  $ABC1: 28        PLP
  $ABC2: 92        ???
  $ABC3: 0C 28 E2  NOP $e228
  $ABC6: 80 E3     NOP #$e3
  $ABC8: 07 38     SLO $38
  $ABCA: 8B 3A     XAA #$3a
  $ABCC: E2 40     NOP #$40
  $ABCE: E3 06     ISB ($06,X)
  $ABD0: 8B 28     XAA #$28
  $ABD2: 0C 28 92  NOP $9228
  $ABD5: 31 2B     AND ($2b),Y
  $ABD7: EC E8 A2  CPX $a2e8
  $ABDA: EB E0     SBC #$e0
  $ABDC: 05 E2     ORA $e2
  $ABDE: 00        BRK
  $ABDF: E3 0A     ISB ($0a,X)
  $ABE1: ED A7 36  SBC $36a7
  $ABE4: E0 01     CPX #$01
  $ABE6: 36 E0     ROL $e0,X
  $ABE8: 06 E3     ASL $e3
  $ABEA: 07 EB     SLO $eb
  $ABEC: 02        ???
  $ABED: 8B 0C     XAA #$0c
  $ABEF: 21 92     AND ($92,X)
  $ABF1: 0C 21 E2  NOP $e221
  $ABF4: 80 38     NOP #$38
  $ABF6: 8B 3A     XAA #$3a
  $ABF8: E2 00     NOP #$00
  $ABFA: 21 0C     AND ($0c,X)
  $ABFC: 21 92     AND ($92,X)
  $ABFE: 28        PLP
  $ABFF: 26 EC     ROL $ec
  $AC01: EB 02     SBC #$02
  $AC03: 8B 0C     XAA #$0c
  $AC05: 23 92     RLA ($92,X)
  $AC07: 0C 23 E2  NOP $e223
  $AC0A: 80 38     NOP #$38
  $AC0C: 8B 3A     XAA #$3a
  $AC0E: E2 00     NOP #$00
  $AC10: 23 0C     RLA ($0c,X)
  $AC12: 23 92     RLA ($92,X)
  $AC14: 2A        ROL A
  $AC15: 28        PLP
  $AC16: EC E8 EB  CPX $ebe8
  $AC19: EB E0     SBC #$e0
  $AC1B: 10 EB     BPL $ac08
  $AC1D: 02        ???
  $AC1E: 8B 26     XAA #$26
  $AC20: 21 23     AND ($23,X)
  $AC22: EB 02     SBC #$02
  $AC24: 26 0C     ROL $0c
  $AC26: 21 23     AND ($23,X)
  $AC28: EC 26 0C  CPX $0c26
  $AC2B: 23 21     RLA ($21,X)
  $AC2D: 23 EC     RLA ($ec,X)
  $AC2F: EB 02     SBC #$02
  $AC31: 8B 26     XAA #$26
  $AC33: 21 23     AND ($23,X)
  $AC35: EB 02     SBC #$02
  $AC37: 26 0C     ROL $0c
  $AC39: 21 23     AND ($23,X)
  $AC3B: EC 26 0C  CPX $0c26
  $AC3E: 23 21     RLA ($21,X)
  $AC40: 23 EC     RLA ($ec,X)
  $AC42: EB 02     SBC #$02
  $AC44: 28        PLP
  $AC45: 23 26     RLA ($26,X)
  $AC47: EB 02     SBC #$02
  $AC49: 28        PLP
  $AC4A: 0C 23 26  NOP $2623
  $AC4D: EC 28 0C  CPX $0c28
  $AC50: 26 23     ROL $23
  $AC52: 26 EC     ROL $ec
  $AC54: E8        INX
  $AC55: 2F EC E0  RLA $e0ec
  $AC58: 12        ???
  $AC59: E3 04     ISB ($04,X)
  $AC5B: EB 06     SBC #$06
  $AC5D: 8B 05     XAA #$05
  $AC5F: 01 EC     ORA ($ec,X)
  $AC61: 86 01     STX $01
  $AC63: 02        ???
  $AC64: 8B 05     XAA #$05
  $AC66: 05 05     ORA $05
  $AC68: E8        INX
  $AC69: 5B EC 04  SRE $04ec,Y
  $AC6C: 78        SEI
  $AC6D: EC 05 C8  CPX $c805
  $AC70: EC 06 F9  CPX $f906
  $AC73: EC 07 3D  CPX $3d07
  $AC76: ED FF E0  SBC $e0ff
  $AC79: 00        BRK
  $AC7A: E2 C0     NOP #$c0
  $AC7C: E3 07     ISB ($07,X)
  $AC7E: 94 0C     STY $0c,X
  $AC80: 8C 28 28  STY $2828
  $AC83: 91 31     STA ($31),Y
  $AC85: 87 2B     SAX $2b
  $AC87: 0C E2 00  NOP $00e2
  $AC8A: 34 33     NOP $33,X
  $AC8C: 34 E2     NOP $e2,X
  $AC8E: C0 0C     CPY #$0c
  $AC90: 38        SEC
  $AC91: 34 0C     NOP $0c,X
  $AC93: 8C 34 38  STY $3834
  $AC96: 91 38     STA ($38),Y
  $AC98: 87 36     SAX $36
  $AC9A: 0C E2 80  NOP $80e2
  $AC9D: 2B E2     ANC #$e2
  $AC9F: C0 94     CPY #$94
  $ACA1: 0C 8C 0C  NOP $0c8c
  $ACA4: 38        SEC
  $ACA5: 34 91     NOP $91,X
  $ACA7: 31 87     AND ($87),Y
  $ACA9: 2B 0C     ANC #$0c
  $ACAB: E2 00     NOP #$00
  $ACAD: 34 33     NOP $33,X
  $ACAF: 34 E2     NOP $e2,X
  $ACB1: C0 0C     CPY #$0c
  $ACB3: 38        SEC
  $ACB4: 34 0C     NOP $0c,X
  $ACB6: 8C 31 2B  STY $2b31
  $ACB9: 91 34     STA ($34),Y
  $ACBB: 87 38     SAX $38
  $ACBD: 0C E2 80  NOP $80e2
  $ACC0: 36 0C     ROL $0c,X
  $ACC2: 34 E2     NOP $e2,X
  $ACC4: C0 E8     CPY #$e8
  $ACC6: 7E EC E0  ROR $e0ec,X
  $ACC9: 06 E2     ASL $e2
  $ACCB: 00        BRK
  $ACCC: E3 07     ISB ($07,X)
  $ACCE: ED 87 14  SBC $1487
  $ACD1: 24 E9     BIT $e9
  $ACD3: 33 ED     RLA ($ed),Y
  $ACD5: 34 33     NOP $33,X
  $ACD7: 34 0C     NOP $0c,X
  $ACD9: E9 1D     SBC #$1d
  $ACDB: ED E2 80  SBC $80e2
  $ACDE: 2B E2     ANC #$e2
  $ACE0: 00        BRK
  $ACE1: 0C 24 0C  NOP $0c24
  $ACE4: 24 E9     BIT $e9
  $ACE6: 33 ED     RLA ($ed),Y
  $ACE8: 34 33     NOP $33,X
  $ACEA: 34 0C     NOP $0c,X
  $ACEC: E9 28     SBC #$28
  $ACEE: ED E2 80  SBC $80e2
  $ACF1: 36 0C     ROL $0c,X
  $ACF3: 34 E2     NOP $e2,X
  $ACF5: 00        BRK
  $ACF6: E8        INX
  $ACF7: CF EC E0  DCP $e0ec
  $ACFA: 0A        ASL A
  $ACFB: 87 14     SAX $14
  $ACFD: 24 E9     BIT $e9
  $ACFF: 33 ED     RLA ($ed),Y
  $AD01: 24 23     BIT $23
  $AD03: 24 0C     BIT $0c
  $AD05: E9 1D     SBC #$1d
  $AD07: ED 1B 0C  SBC $0c1b
  $AD0A: 24 0C     BIT $0c
  $AD0C: 24 E9     BIT $e9
  $AD0E: 33 ED     RLA ($ed),Y
  $AD10: 24 23     BIT $23
  $AD12: 24 0C     BIT $0c
  $AD14: E9 28     SBC #$28
  $AD16: ED 26 0C  SBC $0c26
  $AD19: 24 E8     BIT $e8
  $AD1B: FB EC 28  ISB $28ec,Y
  $AD1E: 8C 24 24  STY $2424
  $AD21: 28        PLP
  $AD22: 91 28     STA ($28),Y
  $AD24: 87 26     SAX $26
  $AD26: 0C EA 28  NOP $28ea
  $AD29: 8C 24 21  STY $2124
  $AD2C: 1B 91 24  SLO $2491,Y
  $AD2F: 87 28     SAX $28
  $AD31: 0C EA 8C  NOP $8cea
  $AD34: 14 18     NOP $18,X
  $AD36: 18        CLC
  $AD37: 91 21     STA ($21),Y
  $AD39: 87 1B     SAX $1b
  $AD3B: 0C EA E0  NOP $e0ea
  $AD3E: 09 E3     ORA #$e3
  $AD40: 05 87     ORA $87
  $AD42: 01 01     ORA ($01,X)
  $AD44: 8C 01 05  STY $0501
  $AD47: 01 91     ORA ($91,X)
  $AD49: 01 05     ORA ($05,X)
  $AD4B: 87 10     SAX $10
  $AD4D: 10 E8     BPL $ad37
  $AD4F: 41 ED     EOR ($ed,X)
  $AD51: 03 60     SLO ($60,X)
  $AD53: ED 04 BF  SBC $bf04
  $AD56: ED 05 61  SBC $6105
  $AD59: ED 06 D3  SBC $d306
  $AD5C: ED 07 1C  SBC $1c07
  $AD5F: EE FF E0  INC $e0ff
  $AD62: 00        BRK
  $AD63: E3 09     ISB ($09,X)
  $AD65: E2 00     NOP #$00
  $AD67: E9 B4     SBC #$b4
  $AD69: ED E9 70  SBC $70e9
  $AD6C: ED E8 65  SBC $65e8
  $AD6F: ED E9 9A  SBC $9ae9
  $AD72: ED E9 AB  SBC $abe9
  $AD75: ED E9 9A  SBC $9ae9
  $AD78: ED 9A 45  SBC $459a
  $AD7B: 82 0C     NOP #$0c
  $AD7D: 9E 43 86  SHX $8643,Y
  $AD80: 0C E9 9A  NOP $9ae9
  $AD83: ED E9 AB  SBC $abe9
  $AD86: ED E2 C0  SBC $c0e2
  $AD89: 9A        TXS
  $AD8A: 27 82     RLA $82
  $AD8C: 0C 9E 25  NOP $259e
  $AD8F: 86 0C     STX $0c
  $AD91: 9A        TXS
  $AD92: 23 82     RLA ($82,X)
  $AD94: 0C 9E 22  NOP $229e
  $AD97: 86 0C     STX $0c
  $AD99: EA        NOP
  $AD9A: E2 40     NOP #$40
  $AD9C: 9A        TXS
  $AD9D: 28        PLP
  $AD9E: 82 0C     NOP #$0c
  $ADA0: 9A        TXS
  $ADA1: 27 87     RLA $87
  $ADA3: 0C E2 80  NOP $80e2
  $ADA6: 85 3A     STA $3a
  $ADA8: 8A        TXA
  $ADA9: 43 EA     SRE ($ea,X)
  $ADAB: 9A        TXS
  $ADAC: 45 82     EOR $82
  $ADAE: 0C 9E 47  NOP $479e
  $ADB1: 86 0C     STX $0c
  $ADB3: EA        NOP
  $ADB4: EB 08     SBC #$08
  $ADB6: 8A        TXA
  $ADB7: 23 27     RLA ($27,X)
  $ADB9: 23 28     RLA ($28,X)
  $ADBB: 23 27     RLA ($27,X)
  $ADBD: EC EA E0  CPX $e0ea
  $ADC0: 06 ED     ASL $ed
  $ADC2: 85 0C     STA $0c
  $ADC4: E2 0C     NOP #$0c
  $ADC6: E3 08     ISB ($08,X)
  $ADC8: E9 B4     SBC #$b4
  $ADCA: ED E3 07  SBC $07e3
  $ADCD: E9 70     SBC #$70
  $ADCF: ED E8 C4  SBC $c4e8
  $ADD2: ED E0 0A  SBC $0ae0
  $ADD5: EB 04     SBC #$04
  $ADD7: 90 23     BCC $adfc
  $ADD9: 8A        TXA
  $ADDA: 23 EC     RLA ($ec,X)
  $ADDC: EB 04     SBC #$04
  $ADDE: 90 21     BCC $ae01
  $ADE0: 8A        TXA
  $ADE1: 21 EC     AND ($ec,X)
  $ADE3: E0 0B     CPX #$0b
  $ADE5: EB 04     SBC #$04
  $ADE7: 90 20     BCC $ae09
  $ADE9: 8A        TXA
  $ADEA: 20 EC EB  JSR $ebec
  $ADED: 03 90     SLO ($90,X)
  $ADEF: 1B 8A 1B  SLO $1b8a,Y
  $ADF2: EC 90 1B  CPX $1b90
  $ADF5: E0 0A     CPX #$0a
  $ADF7: 8A        TXA
  $ADF8: 21 EB     AND ($eb,X)
  $ADFA: 08        PHP
  $ADFB: 90 23     BCC $ae20
  $ADFD: 8A        TXA
  $ADFE: 23 EC     RLA ($ec,X)
  $AE00: EB 08     SBC #$08
  $AE02: 90 21     BCC $ae25
  $AE04: 8A        TXA
  $AE05: 21 EC     AND ($ec,X)
  $AE07: EB 08     SBC #$08
  $AE09: E0 0B     CPX #$0b
  $AE0B: 90 20     BCC $ae2d
  $AE0D: 8A        TXA
  $AE0E: 20 EC EB  JSR $ebec
  $AE11: 08        PHP
  $AE12: 90 1A     BCC $ae2e
  $AE14: 8A        TXA
  $AE15: 1A        NOP
  $AE16: E0 0A     CPX #$0a
  $AE18: EC E8 D5  CPX $d5e8
  $AE1B: ED E0 09  SBC $09e0
  $AE1E: E3 05     ISB ($05,X)
  $AE20: 90 01     BCC $ae23
  $AE22: 8A        TXA
  $AE23: 01 90     ORA ($90,X)
  $AE25: 05 8A     ORA $8a
  $AE27: 01 E8     ORA ($e8,X)
  $AE29: 20 EE 04  JSR $04ee
  $AE2C: 38        SEC
  $AE2D: EE 05 D6  INC $d605
  $AE30: EE 06 56  INC $5606
  $AE33: EF 07 CB  ISB $cb07
  $AE36: EF FF E2  ISB $e2ff
  $AE39: 40        RTI
  $AE3A: E3 07     ISB ($07,X)
  $AE3C: E0 00     CPX #$00
  $AE3E: 94 31     STY $31,X
  $AE40: 31 31     AND ($31),Y
  $AE42: 87 31     SAX $31
  $AE44: 31 31     AND ($31),Y
  $AE46: 31 E0     AND ($e0),Y
  $AE48: 09 E3     ORA #$e3
  $AE4A: 08        PHP
  $AE4B: 87 E9     SAX $e9
  $AE4D: 95 EE     STA $ee,X
  $AE4F: 4B 44     ALR #$44
  $AE51: 46 3B     LSR $3b
  $AE53: 44 46     NOP $46
  $AE55: 4B 46     ALR #$46
  $AE57: 48        PHA
  $AE58: 54 48     NOP $48,X
  $AE5A: 54 44     NOP $44,X
  $AE5C: 46 4B     LSR $4b
  $AE5E: 44 4B     NOP $4b
  $AE60: 3B 44 4B  RLA $4b44,Y
  $AE63: 44 46     NOP $46
  $AE65: 4B 41     ALR #$41
  $AE67: 4B 51     ALR #$51
  $AE69: 4B 51     ALR #$51
  $AE6B: 44 4B     NOP $4b
  $AE6D: 48        PHA
  $AE6E: 41 39     EOR ($39,X)
  $AE70: 41 46     EOR ($46,X)
  $AE72: 41 39     EOR ($39,X)
  $AE74: 34 39     NOP $39,X
  $AE76: 41 39     EOR ($39,X)
  $AE78: 41 39     EOR ($39,X)
  $AE7A: 34 39     NOP $39,X
  $AE7C: 38        SEC
  $AE7D: 39 41 46  AND $4641,Y
  $AE80: 3B 43 46  RLA $4643,Y
  $AE83: 43 46     SRE ($46,X)
  $AE85: 43 41     SRE ($41,X)
  $AE87: 46 43     LSR $43
  $AE89: 41 3B     EOR ($3b,X)
  $AE8B: 41 40     EOR ($40,X)
  $AE8D: 41 43     EOR ($43,X)
  $AE8F: E9 95     SBC #$95
  $AE91: EE E8 4B  INC $4be8
  $AE94: EE 48 41  INC $4148
  $AE97: 43 38     SRE ($38,X)
  $AE99: 41 43     EOR ($43,X)
  $AE9B: 48        PHA
  $AE9C: 43 45     SRE ($45,X)
  $AE9E: 51 45     EOR ($45),Y
  $AEA0: 51 41     EOR ($41),Y
  $AEA2: 43 48     SRE ($48,X)
  $AEA4: 41 48     EOR ($48,X)
  $AEA6: 38        SEC
  $AEA7: 43 48     SRE ($48,X)
  $AEA9: 41 43     EOR ($43,X)
  $AEAB: 48        PHA
  $AEAC: 40        RTI
  $AEAD: 48        PHA
  $AEAE: 50 43     BVC $aef3
  $AEB0: 48        PHA
  $AEB1: 50 48     BVC $aefb
  $AEB3: 43 38     SRE ($38,X)
  $AEB5: 36 3A     ROL $3a,X
  $AEB7: 43 3A     SRE ($3a,X)
  $AEB9: 36 33     ROL $33,X
  $AEBB: 36 3A     ROL $3a,X
  $AEBD: 36 3A     ROL $3a,X
  $AEBF: 36 31     ROL $31,X
  $AEC1: 3A        NOP
  $AEC2: 36 3A     ROL $3a,X
  $AEC4: 41 41     EOR ($41,X)
  $AEC6: 31 35     AND ($35),Y
  $AEC8: 41 3A     EOR ($3a,X)
  $AECA: 41 3A     EOR ($3a,X)
  $AECC: 35 40     AND $40,X
  $AECE: 38        SEC
  $AECF: 33 30     RLA ($30),Y
  $AED1: 33 30     RLA ($30),Y
  $AED3: 33 38     RLA ($38),Y
  $AED5: EA        NOP
  $AED6: E2 40     NOP #$40
  $AED8: ED E3 07  SBC $07e3
  $AEDB: E0 00     CPX #$00
  $AEDD: 94 25     STY $25,X
  $AEDF: 25 25     AND $25
  $AEE1: 87 25     SAX $25
  $AEE3: 25 25     AND $25
  $AEE5: 25 E0     AND $e0
  $AEE7: 0F E2 80  SLO $80e2
  $AEEA: E3 08     ISB ($08,X)
  $AEEC: 94 28     STY $28,X
  $AEEE: 8C 28 31  STY $3128
  $AEF1: 94 30     STY $30,X
  $AEF3: 31 94     AND ($94),Y
  $AEF5: 30 87     BMI $ae7e
  $AEF7: 30 2A     BMI $af23
  $AEF9: 30 2A     BMI $af25
  $AEFB: 94 28     STY $28,X
  $AEFD: 28        PLP
  $AEFE: 94 26     STY $26,X
  $AF00: 8C 26 28  STY $2826
  $AF03: 94 2A     STY $2a,X
  $AF05: 8C 28 26  STY $2628
  $AF08: 94 25     STY $25,X
  $AF0A: 25 23     AND $23
  $AF0C: 23 94     RLA ($94,X)
  $AF0E: 28        PLP
  $AF0F: 8C 28 94  STY $9428
  $AF12: 26 8C     ROL $8c
  $AF14: 28        PLP
  $AF15: 94 28     STY $28,X
  $AF17: 94 EF     STY $ef,X
  $AF19: 29 ED     AND #$ed
  $AF1B: 8C 28 94  STY $9428
  $AF1E: 24 24     BIT $24
  $AF20: 8C 24 EF  STY $ef24
  $AF23: 94 29     STY $29,X
  $AF25: 8C 29 ED  STY $ed29
  $AF28: 94 31     STY $31,X
  $AF2A: 8C 2B EF  STY $ef2b
  $AF2D: 29 ED     AND #$ed
  $AF2F: 28        PLP
  $AF30: 94 26     STY $26,X
  $AF32: 24 23     BIT $23
  $AF34: 26 94     ROL $94
  $AF36: 25 25     AND $25
  $AF38: 8C 25 26  STY $2625
  $AF3B: 25 23     AND $23
  $AF3D: 94 21     STY $21,X
  $AF3F: 21 20     AND ($20,X)
  $AF41: 20 1A 1A  JSR $1a1a
  $AF44: 8C 1A 20  STY $201a
  $AF47: 21 23     AND ($23,X)
  $AF49: 94 25     STY $25,X
  $AF4B: 25 87     AND $87
  $AF4D: 23 25     RLA ($25,X)
  $AF4F: 94 23     STY $23,X
  $AF51: 8C 23 E8  STY $e823
  $AF54: EC EE E0  CPX $e0ee
  $AF57: 0B 94     ANC #$94
  $AF59: 21 21     AND ($21,X)
  $AF5B: 21 87     AND ($87,X)
  $AF5D: 21 21     AND ($21,X)
  $AF5F: 21 21     AND ($21,X)
  $AF61: E9 9A     SBC #$9a
  $AF63: EF 8C 14  ISB $148c
  $AF66: 14 14     NOP $14,X
  $AF68: 87 14     SAX $14
  $AF6A: 14 8C     NOP $8c,X
  $AF6C: 14 14     NOP $14,X
  $AF6E: 14 14     NOP $14,X
  $AF70: 8C 21 21  STY $2121
  $AF73: 21 87     AND ($87,X)
  $AF75: 21 21     AND ($21,X)
  $AF77: 8C 21 21  STY $2121
  $AF7A: 21 21     AND ($21,X)
  $AF7C: 8C 19 19  STY $1919
  $AF7F: 19 87 19  ORA $1987,Y
  $AF82: 19 8C 19  ORA $198c,Y
  $AF85: 19 19 19  ORA $1919,Y
  $AF88: 8C 1B 1B  STY $1b1b
  $AF8B: 1B 87 1B  SLO $1b87,Y
  $AF8E: 1B 8C 1B  SLO $1b8c,Y
  $AF91: 1B 1B 1B  SLO $1b1b,Y
  $AF94: E9 9A     SBC #$9a
  $AF96: EF E8 61  ISB $61e8
  $AF99: EF 8C 21  ISB $218c
  $AF9C: 21 21     AND ($21,X)
  $AF9E: 87 21     SAX $21
  $AFA0: 21 8C     AND ($8c,X)
  $AFA2: 21 21     AND ($21,X)
  $AFA4: 21 21     AND ($21,X)
  $AFA6: 8C 18 18  STY $1818
  $AFA9: 18        CLC
  $AFAA: 87 18     SAX $18
  $AFAC: 18        CLC
  $AFAD: 8C 18 18  STY $1818
  $AFB0: 18        CLC
  $AFB1: 18        CLC
  $AFB2: 8C 16 16  STY $1616
  $AFB5: 16 87     ASL $87,X
  $AFB7: 16 16     ASL $16,X
  $AFB9: 8C 16 16  STY $1616
  $AFBC: 16 16     ASL $16,X
  $AFBE: 8C 1A 1A  STY $1a1a
  $AFC1: 1A        NOP
  $AFC2: 87 1A     SAX $1a
  $AFC4: 1A        NOP
  $AFC5: 8C 18 18  STY $1818
  $AFC8: 18        CLC
  $AFC9: 18        CLC
  $AFCA: EA        NOP
  $AFCB: E0 09     CPX #$09
  $AFCD: E3 05     ISB ($05,X)
  $AFCF: 8C 05 10  STY $1005
  $AFD2: 05 10     ORA $10
  $AFD4: 05 10     ORA $10
  $AFD6: 87 05     SAX $05
  $AFD8: 05 05     ORA $05
  $AFDA: 05 E3     ORA $e3
  $AFDC: 06 8C     ASL $8c
  $AFDE: 01 10     ORA ($10,X)
  $AFE0: 05 10     ORA $10
  $AFE2: 01 01     ORA ($01,X)
  $AFE4: 05 10     ORA $10
  $AFE6: 01 10     ORA ($10,X)
  $AFE8: 05 10     ORA $10
  $AFEA: 01 01     ORA ($01,X)
  $AFEC: 05 87     ORA $87
  $AFEE: 05 05     ORA $05
  $AFF0: E8        INX
  $AFF1: DD EF 04  CMP $04ef,X
  $AFF4: 00        BRK
  $AFF5: F0 05     BEQ $affc
  $AFF7: 39 F0 06  AND $06f0,Y
  $AFFA: 5A        NOP
  $AFFB: F0 07     BEQ $b004
  $AFFD: 74 F0     NOP $f0,X
  $AFFF: FF E0 05  ISB $05e0,X
  $B002: E2 00     NOP #$00
  $B004: ED E3 0A  SBC $0ae3
  $B007: EB 02     SBC #$02
  $B009: 99 25 87  STA $8725,Y
  $B00C: 24 25     BIT $25
  $B00E: 99 26 87  STA $8726,Y
  $B011: 25 26     AND $26
  $B013: 99 27 87  STA $8727,Y
  $B016: 26 27     ROL $27
  $B018: 9C 28 EC  SHY $ec28,X
  $B01B: E3 09     ISB ($09,X)
  $B01D: EB 02     SBC #$02
  $B01F: 87 2A     SAX $2a
  $B021: 30 31     BMI $b054
  $B023: 2A        ROL A
  $B024: 33 2A     RLA ($2a),Y
  $B026: 31 30     AND ($30),Y
  $B028: EC EB 02  CPX $02eb
  $B02B: 31 33     AND ($33),Y
  $B02D: 35 31     AND $31,X
  $B02F: 36 31     ROL $31,X
  $B031: 35 33     AND $33,X
  $B033: EC A4 38  CPX $38a4
  $B036: E8        INX
  $B037: 05 F0     ORA $f0
  $B039: E0 01     CPX #$01
  $B03B: E2 80     NOP #$80
  $B03D: E3 0B     ISB ($0b,X)
  $B03F: 9C EB 08  SHY $08eb,X
  $B042: 21 EC     AND ($ec,X)
  $B044: E3 0A     ISB ($0a,X)
  $B046: EB 02     SBC #$02
  $B048: 26 EC     ROL $ec
  $B04A: EB 02     SBC #$02
  $B04C: 28        PLP
  $B04D: EC 8C 28  CPX $288c
  $B050: 26 25     ROL $25
  $B052: 23 21     RLA ($21,X)
  $B054: 20 1A 20  JSR $201a
  $B057: E8        INX
  $B058: 3D F0 E0  AND $e0f0,X
  $B05B: 10 87     BPL $afe4
  $B05D: EB 20     SBC #$20
  $B05F: 21 EC     AND ($ec,X)
  $B061: E0 0A     CPX #$0a
  $B063: EB 20     SBC #$20
  $B065: 1A        NOP
  $B066: EC E0 0B  CPX $0be0
  $B069: EB 10     SBC #$10
  $B06B: 16 EC     ASL $ec,X
  $B06D: EB 20     SBC #$20
  $B06F: 18        CLC
  $B070: EC E8 5A  CPX $5ae8
  $B073: F0 E0     BEQ $b055
  $B075: 09 E3     ORA #$e3
  $B077: 07 87     SLO $87
  $B079: 00        BRK
  $B07A: 00        BRK
  $B07B: 05 00     ORA $00
  $B07D: E8        INX
  $B07E: 78        SEI
  $B07F: F0 03     BEQ $b084
  $B081: 44 E2     NOP $e2
  $B083: 04 90     NOP $90
  $B085: F0 05     BEQ $b08c
  $B087: A7 F0     LAX $f0
  $B089: 06 44     ASL $44
  $B08B: E2 07     NOP #$07
  $B08D: 44 E2     NOP $e2
  $B08F: FF E0 06  ISB $06e0,X
  $B092: E3 02     ISB ($02,X)
  $B094: E2 80     NOP #$80
  $B096: 8B 20     XAA #$20
  $B098: 30 2B     BMI $b0c5
  $B09A: 2A        ROL A
  $B09B: 29 28     AND #$28
  $B09D: 27 26     RLA $26
  $B09F: EB 02     SBC #$02
  $B0A1: 25 26     AND $26
  $B0A3: EC A6 25  CPX $25a6
  $B0A6: FF E0 02  ISB $02e0,X
  $B0A9: E3 06     ISB ($06,X)
  $B0AB: 8B 0C     XAA #$0c
  $B0AD: ED E8 94  SBC $94e8
  $B0B0: F0 04     BEQ $b0b6
  $B0B2: BE F0 05  LDX $05f0,Y
  $B0B5: C6 F0     DEC $f0
  $B0B7: 06 D4     ASL $d4
  $B0B9: F0 07     BEQ $b0c2
  $B0BB: E1 F0     SBC ($f0,X)
  $B0BD: FF E3 0B  ISB $0be3,X
  $B0C0: E9 58     SBC #$58
  $B0C2: E2 E8     NOP #$e8
  $B0C4: C0 F0     CPY #$f0
  $B0C6: E2 80     NOP #$80
  $B0C8: E3 0B     ISB ($0b,X)
  $B0CA: E0 05     CPX #$05
  $B0CC: 85 0C     STA $0c
  $B0CE: E9 5D     SBC #$5d
  $B0D0: E2 E8     NOP #$e8
  $B0D2: CE F0 E0  DEC $e0f0
  $B0D5: 0E E9 90  ASL $90e9
  $B0D8: E3 E0     ISB ($e0,X)
  $B0DA: 0E E9 15  ASL $15e9
  $B0DD: E4 E8     CPX $e8
  $B0DF: D4 F0     NOP $f0,X
  $B0E1: E0 09     CPX #$09
  $B0E3: E3 07     ISB ($07,X)
  $B0E5: 8A        TXA
  $B0E6: 05 05     ORA $05
  $B0E8: E9 95     SBC #$95
  $B0EA: E4 05     CPX $05
  $B0EC: 05 10     ORA $10
  $B0EE: 05 10     ORA $10
  $B0F0: E9 95     SBC #$95
  $B0F2: E4 8C     CPX $8c
  $B0F4: 05 8B     ORA $8b
  $B0F6: 05 05     ORA $05
  $B0F8: 05 EB     ORA $eb
  $B0FA: 0F E9 AC  SLO $ace9
  $B0FD: E4 EC     CPX $ec
  $B0FF: 01 01     ORA ($01,X)
  $B101: 05 85     ORA $85
  $B103: 05 05     ORA $05
  $B105: EB 0E     SBC #$0e
  $B107: E9 AC     SBC #$ac
  $B109: E4 EC     CPX $ec
  $B10B: 8A        TXA
  $B10C: 10 EB     BPL $b0f9
  $B10E: 07 05     SLO $05
  $B110: EC EB 0C  CPX $0ceb
  $B113: E9 AC     SBC #$ac
  $B115: E4 EC     CPX $ec
  $B117: 10 05     BPL $b11e
  $B119: 10 9D     BPL $b0b8
  $B11B: 10 A0     BPL $b0bd
  $B11D: 10 85     BPL $b0a4
  $B11F: 00        BRK
  $B120: 00        BRK
  $B121: 01 01     ORA ($01,X)
  $B123: 02        ???
  $B124: 02        ???
  $B125: 03 03     SLO ($03,X)
  $B127: 04 04     NOP $04
  $B129: 8A        TXA
  $B12A: 05 05     ORA $05
  $B12C: E8        INX
  $B12D: E8        INX
  $B12E: F0 04     BEQ $b134
  $B130: 7B F1 05  RRA $05f1,Y
  $B133: 3C F1 06  NOP $06f1,X
  $B136: 87 F1     SAX $f1
  $B138: 07 A7     SLO $a7
  $B13A: F1 FF     SBC ($ff),Y
  $B13C: E0 09     CPX #$09
  $B13E: E3 09     ISB ($09,X)
  $B140: E2 00     NOP #$00
  $B142: EB 02     SBC #$02
  $B144: E9 70     SBC #$70
  $B146: F1 0C     SBC ($0c),Y
  $B148: E9 70     SBC #$70
  $B14A: F1 0C     SBC ($0c),Y
  $B14C: E9 70     SBC #$70
  $B14E: F1 2B     SBC ($2b),Y
  $B150: 31 33     AND ($33),Y
  $B152: 0C 31 0C  NOP $0c31
  $B155: 2B 0C     ANC #$0c
  $B157: 2A        ROL A
  $B158: EC 0C EB  CPX $eb0c
  $B15B: 02        ???
  $B15C: EB 1A     SBC #$1a
  $B15E: 08        PHP
  $B15F: EC 08 33  CPX $3308
  $B162: 2A        ROL A
  $B163: 31 2A     AND ($2a),Y
  $B165: 2B EC     ANC #$ec
  $B167: EB 0D     SBC #$0d
  $B169: 08        PHP
  $B16A: EC 90 0C  CPX $0c90
  $B16D: E8        INX
  $B16E: 42        ???
  $B16F: F1 85     SBC ($85),Y
  $B171: 28        PLP
  $B172: 2A        ROL A
  $B173: 8A        TXA
  $B174: 2B 2B     ANC #$2b
  $B176: 2A        ROL A
  $B177: 28        PLP
  $B178: 2B 28     ANC #$28
  $B17A: EA        NOP
  $B17B: E0 00     CPX #$00
  $B17D: E2 80     NOP #$80
  $B17F: E3 09     ISB ($09,X)
  $B181: 84 0C     STY $0c
  $B183: ED E8 42  SBC $42e8
  $B186: F1 E0     SBC ($e0),Y
  $B188: 0E 8A 0C  ASL $0c8a
  $B18B: EB 04     SBC #$04
  $B18D: EB 08     SBC #$08
  $B18F: 18        CLC
  $B190: EC EB 08  CPX $08eb
  $B193: 16 EC     ASL $ec,X
  $B195: EB 08     SBC #$08
  $B197: 14 EC     NOP $ec,X
  $B199: EB 08     SBC #$08
  $B19B: 13 EC     SLO ($ec),Y
  $B19D: EC EB 0D  CPX $0deb
  $B1A0: 18        CLC
  $B1A1: EC 90 0C  CPX $0c90
  $B1A4: E8        INX
  $B1A5: 89 F1     NOP #$f1
  $B1A7: E0 09     CPX #$09
  $B1A9: E3 07     ISB ($07,X)
  $B1AB: 8A        TXA
  $B1AC: 10 EB     BPL $b199
  $B1AE: 02        ???
  $B1AF: EB 06     SBC #$06
  $B1B1: 00        BRK
  $B1B2: 00        BRK
  $B1B3: 05 00     ORA $00
  $B1B5: EC 00 05  CPX $0500
  $B1B8: 00        BRK
  $B1B9: 05 00     ORA $00
  $B1BB: 05 05     ORA $05
  $B1BD: 05 EC     ORA $ec
  $B1BF: EB 02     SBC #$02
  $B1C1: EB 07     SBC #$07
  $B1C3: 00        BRK
  $B1C4: 00        BRK
  $B1C5: 05 00     ORA $00
  $B1C7: EC 00 00  CPX $0000
  $B1CA: 05 05     ORA $05
  $B1CC: EC EB 03  CPX $03eb
  $B1CF: 00        BRK
  $B1D0: 00        BRK
  $B1D1: 06 00     ASL $00
  $B1D3: EC 05 10  CPX $1005
  $B1D6: 10 10     BPL $b1e8
  $B1D8: E8        INX
  $B1D9: AD F1 04  LDA $04f1
  $B1DC: E8        INX
  $B1DD: F1 05     SBC ($05),Y
  $B1DF: 10 F2     BPL $b1d3
  $B1E1: 06 33     ASL $33
  $B1E3: F2        ???
  $B1E4: 07 E7     SLO $e7
  $B1E6: F1 FF     SBC ($ff),Y
  $B1E8: E0 0F     CPX #$0f
  $B1EA: E2 00     NOP #$00
  $B1EC: E3 05     ISB ($05,X)
  $B1EE: ED EB 07  SBC $07eb
  $B1F1: 8A        TXA
  $B1F2: 27 EC     RLA $ec
  $B1F4: E9 05     SBC #$05
  $B1F6: F2        ???
  $B1F7: 27 EB     RLA $eb
  $B1F9: 06 8A     ASL $8a
  $B1FB: 27 EC     RLA $ec
  $B1FD: E9 05     SBC #$05
  $B1FF: F2        ???
  $B200: 30 E0     BMI $b1e2
  $B202: 00        BRK
  $B203: 30 FF     BMI $b204
  $B205: 90 25     BCC $b22c
  $B207: 8A        TXA
  $B208: 25 25     AND $25
  $B20A: 25 25     AND $25
  $B20C: 27 29     RLA $29
  $B20E: 90 EA     BCC $b1fa
  $B210: E0 00     CPX #$00
  $B212: E2 80     NOP #$80
  $B214: E3 07     ISB ($07,X)
  $B216: EB 02     SBC #$02
  $B218: 8A        TXA
  $B219: 40        RTI
  $B21A: 37 3B     RLA $3b,X
  $B21C: 40        RTI
  $B21D: 37 3B     RLA $3b,X
  $B21F: 40        RTI
  $B220: 37 3A     RLA $3a,X
  $B222: 35 39     AND $39,X
  $B224: 3A        NOP
  $B225: 35 39     AND $39,X
  $B227: 3A        NOP
  $B228: 35 EC     AND $ec,X
  $B22A: E0 0F     CPX #$0f
  $B22C: 8A        TXA
  $B22D: 40        RTI
  $B22E: E0 00     CPX #$00
  $B230: 90 40     BCC $b272
  $B232: FF EB 04  ISB $04eb,X
  $B235: E0 0B     CPX #$0b
  $B237: EB 07     SBC #$07
  $B239: 8A        TXA
  $B23A: 20 EC E0  JSR $e0ec
  $B23D: 0A        ASL A
  $B23E: 85 20     STA $20
  $B240: 20 EC E0  JSR $e0ec
  $B243: 0C 90 20  NOP $2090
  $B246: FF 04 54  ISB $5404,X
  $B249: F2        ???
  $B24A: 05 0D     ORA $0d
  $B24C: F3 06     ISB ($06),Y
  $B24E: 14 F3     NOP $f3,X
  $B250: 07 9D     SLO $9d
  $B252: F3 FF     ISB ($ff),Y
  $B254: E2 00     NOP #$00
  $B256: ED E0 01  SBC $01e0
  $B259: E3 0B     ISB ($0b,X)
  $B25B: 8A        TXA
  $B25C: 25 28     AND $28
  $B25E: 2A        ROL A
  $B25F: EB 02     SBC #$02
  $B261: E9 E5     SBC #$e5
  $B263: F2        ???
  $B264: 25 8A     AND $8a
  $B266: 25 28     AND $28
  $B268: 2A        ROL A
  $B269: E9 E5     SBC #$e5
  $B26B: F2        ???
  $B26C: 26 8A     ROL $8a
  $B26E: 25 28     AND $28
  $B270: 2A        ROL A
  $B271: EC E9 FB  CPX $fbe9
  $B274: F2        ???
  $B275: 2A        ROL A
  $B276: 30 9E     BMI $b216
  $B278: 28        PLP
  $B279: 86 0C     STX $0c
  $B27B: E9 FB     SBC #$fb
  $B27D: F2        ???
  $B27E: 31 33     AND ($33),Y
  $B280: 9E 30 86  SHX $8630,Y
  $B283: 0C 90 36  NOP $3690
  $B286: 8A        TXA
  $B287: 35 98     AND $98,X
  $B289: 33 8A     RLA ($8a),Y
  $B28B: 0C 90 35  NOP $3590
  $B28E: 8A        TXA
  $B28F: 33 98     RLA ($98),Y
  $B291: 31 8A     AND ($8a),Y
  $B293: 0C 0C 35  NOP $350c
  $B296: 33 8B     RLA ($8b),Y
  $B298: 31 8C     AND ($8c),Y
  $B29A: 30 28     BMI $b2c4
  $B29C: 9D 2A 95  STA $952a,X
  $B29F: 0C 8A EB  NOP $eb8a
  $B2A2: 02        ???
  $B2A3: E9 F0     SBC #$f0
  $B2A5: F2        ???
  $B2A6: 27 8A     RLA $8a
  $B2A8: 26 2A     ROL $2a
  $B2AA: 30 E9     BMI $b295
  $B2AC: F0 F2     BEQ $b2a0
  $B2AE: 28        PLP
  $B2AF: 8A        TXA
  $B2B0: 26 2A     ROL $2a
  $B2B2: 30 EC     BMI $b2a0
  $B2B4: E9 04     SBC #$04
  $B2B6: F3 30     ISB ($30),Y
  $B2B8: 32        ???
  $B2B9: 9E 2A 86  SHX $862a,Y
  $B2BC: 0C E9 04  NOP $04e9
  $B2BF: F3 33     ISB ($33),Y
  $B2C1: 35 9E     AND $9e,X
  $B2C3: 32        ???
  $B2C4: 86 0C     STX $0c
  $B2C6: 90 38     BCC $b300
  $B2C8: 8A        TXA
  $B2C9: 37 98     RLA $98,X
  $B2CB: 35 8A     AND $8a,X
  $B2CD: 0C 90 37  NOP $3790
  $B2D0: 8A        TXA
  $B2D1: 35 98     AND $98,X
  $B2D3: 33 90     RLA ($90),Y
  $B2D5: 0C E3 0A  NOP $0ae3
  $B2D8: 8A        TXA
  $B2D9: 37 35     RLA $35,X
  $B2DB: 8B 33     XAA #$33
  $B2DD: 8C 32 2A  STY $2a32
  $B2E0: 9D 30 E8  STA $e830,X
  $B2E3: 59 F2 0C  EOR $0cf2,Y
  $B2E6: 2A        ROL A
  $B2E7: 0C 28 95  NOP $9528
  $B2EA: 2A        ROL A
  $B2EB: 8A        TXA
  $B2EC: 28        PLP
  $B2ED: 2A        ROL A
  $B2EE: 98        TYA
  $B2EF: EA        NOP
  $B2F0: 0C 30 0C  NOP $0c30
  $B2F3: 2A        ROL A
  $B2F4: 95 30     STA $30,X
  $B2F6: 8A        TXA
  $B2F7: 2A        ROL A
  $B2F8: 30 98     BMI $b292
  $B2FA: EA        NOP
  $B2FB: 8A        TXA
  $B2FC: 0C 30 0C  NOP $0c30
  $B2FF: 2A        ROL A
  $B300: 95 30     STA $30,X
  $B302: 8A        TXA
  $B303: EA        NOP
  $B304: 8A        TXA
  $B305: 0C 32 0C  NOP $0c32
  $B308: 30 95     BMI $b29f
  $B30A: 32        ???
  $B30B: 8A        TXA
  $B30C: EA        NOP
  $B30D: E2 40     NOP #$40
  $B30F: 85 0C     STA $0c
  $B311: E8        INX
  $B312: 57 F2     SRE $f2,X
  $B314: E0 0E     CPX #$0e
  $B316: 8A        TXA
  $B317: 1A        NOP
  $B318: 18        CLC
  $B319: 1A        NOP
  $B31A: EB 02     SBC #$02
  $B31C: EB 0E     SBC #$0e
  $B31E: 8A        TXA
  $B31F: 1A        NOP
  $B320: EC 18 EB  CPX $eb18
  $B323: 0F 8A 16  SLO $168a
  $B326: EC 18 1A  CPX $1a18
  $B329: EC EB 0D  CPX $0deb
  $B32C: 18        CLC
  $B32D: EC 90 1A  CPX $1a90
  $B330: 20 EB 0F  JSR $0feb
  $B333: 8A        TXA
  $B334: 20 EC E9  JSR $e9ec
  $B337: 93 F3     ??? ($f3),Y
  $B339: 90 21     BCC $b35c
  $B33B: 8A        TXA
  $B33C: 21 90     AND ($90,X)
  $B33E: 21 21     AND ($21,X)
  $B340: 8A        TXA
  $B341: 0C E0 0C  NOP $0ce0
  $B344: A0 20     LDY #$20
  $B346: E0 0E     CPX #$0e
  $B348: 90 1A     BCC $b364
  $B34A: 8A        TXA
  $B34B: 1A        NOP
  $B34C: 8A        TXA
  $B34D: 1A        NOP
  $B34E: 1B 1A 18  SLO $181a,Y
  $B351: 1A        NOP
  $B352: EB 02     SBC #$02
  $B354: EB 0E     SBC #$0e
  $B356: 20 EC 1A  JSR $1aec
  $B359: EB 0F     SBC #$0f
  $B35B: 8A        TXA
  $B35C: 18        CLC
  $B35D: EC 1A 20  CPX $201a
  $B360: EC EB 0D  CPX $0deb
  $B363: 8A        TXA
  $B364: 1A        NOP
  $B365: EC 90 20  CPX $2090
  $B368: 22        ???
  $B369: EB 0F     SBC #$0f
  $B36B: 8A        TXA
  $B36C: 22        ???
  $B36D: EC E0 0B  CPX $0be0
  $B370: 90 25     BCC $b397
  $B372: 8A        TXA
  $B373: 25 90     AND $90
  $B375: 25 25     AND $25
  $B377: 8A        TXA
  $B378: 0C E9 93  NOP $93e9
  $B37B: F3 E0     ISB ($e0),Y
  $B37D: 0C ED A0  NOP $a0ed
  $B380: 22        ???
  $B381: EF E0 0E  ISB $0ee0
  $B384: E0 0E     CPX #$0e
  $B386: 90 20     BCC $b3a8
  $B388: 8A        TXA
  $B389: 20 8A 20  JSR $208a
  $B38C: 1B 20 1B  SLO $1b20,Y
  $B38F: 1A        NOP
  $B390: E8        INX
  $B391: 1A        NOP
  $B392: F3 90     ISB ($90),Y
  $B394: 23 8A     RLA ($8a,X)
  $B396: 23 90     RLA ($90,X)
  $B398: 23 23     RLA ($23,X)
  $B39A: 8A        TXA
  $B39B: 0C EA E0  NOP $e0ea
  $B39E: 09 E3     ORA #$e3
  $B3A0: 07 8A     SLO $8a
  $B3A2: 05 05     ORA $05
  $B3A4: 05 EB     ORA $eb
  $B3A6: 09 8A     ORA #$8a
  $B3A8: 01 01     ORA ($01,X)
  $B3AA: 05 05     ORA $05
  $B3AC: E9 AC     SBC #$ac
  $B3AE: E4 EC     CPX $ec
  $B3B0: E9 AC     SBC #$ac
  $B3B2: E4 05     CPX $05
  $B3B4: 05 10     ORA $10
  $B3B6: 05 EB     ORA $eb
  $B3B8: 02        ???
  $B3B9: E9 AC     SBC #$ac
  $B3BB: E4 EC     CPX $ec
  $B3BD: E9 AC     SBC #$ac
  $B3BF: E4 01     CPX $01
  $B3C1: 05 01     ORA $01
  $B3C3: 05 EB     ORA $eb
  $B3C5: 02        ???
  $B3C6: 01 01     ORA ($01,X)
  $B3C8: 05 05     ORA $05
  $B3CA: 01 05     ORA ($05,X)
  $B3CC: 05 10     ORA $10
  $B3CE: EC 05 10  CPX $1005
  $B3D1: 9D 10 E9  STA $e910,X
  $B3D4: AC E4 00  LDY $00e4
  $B3D7: 05 06     ORA $06
  $B3D9: 05 E8     ORA $e8
  $B3DB: A5 F3     LDA $f3
  $B3DD: 03 44     SLO ($44,X)
  $B3DF: E2 04     NOP #$04
  $B3E1: ED F3 05  SBC $05f3
  $B3E4: 3A        NOP
  $B3E5: F4 06     NOP $06,X
  $B3E7: 44 F4     NOP $f4
  $B3E9: 07 44     SLO $44
  $B3EB: E2 FF     NOP #$ff
  $B3ED: E0 06     CPX #$06
  $B3EF: E3 08     ISB ($08,X)
  $B3F1: E2 40     NOP #$40
  $B3F3: 8F 35 89  SAX $8935
  $B3F6: 33 35     RLA ($35),Y
  $B3F8: 2A        ROL A
  $B3F9: 35 33     AND $33,X
  $B3FB: 35 31     AND $31,X
  $B3FD: 35 33     AND $33,X
  $B3FF: 35 2A     AND $2a,X
  $B401: 35 33     AND $33,X
  $B403: 35 8F     AND $8f,X
  $B405: 33 89     RLA ($89),Y
  $B407: 31 33     AND ($33),Y
  $B409: 28        PLP
  $B40A: 33 31     RLA ($31),Y
  $B40C: 33 30     RLA ($30),Y
  $B40E: 33 31     RLA ($31),Y
  $B410: 33 28     RLA ($28),Y
  $B412: 33 31     RLA ($31),Y
  $B414: 33 8F     RLA ($8f),Y
  $B416: 31 89     AND ($89),Y
  $B418: 30 31     BMI $b44b
  $B41A: 26 31     ROL $31
  $B41C: 30 31     BMI $b44f
  $B41E: 2A        ROL A
  $B41F: 31 30     AND ($30),Y
  $B421: 31 26     AND ($26),Y
  $B423: 31 30     AND ($30),Y
  $B425: 31 8F     AND ($8f),Y
  $B427: 30 89     BMI $b3b2
  $B429: 2A        ROL A
  $B42A: 30 25     BMI $b451
  $B42C: 30 2A     BMI $b458
  $B42E: 30 28     BMI $b458
  $B430: 30 2A     BMI $b45c
  $B432: 30 25     BMI $b459
  $B434: 26 28     ROL $28
  $B436: 2A        ROL A
  $B437: E8        INX
  $B438: F3 F3     ISB ($f3),Y
  $B43A: E0 06     CPX #$06
  $B43C: E3 0A     ISB ($0a,X)
  $B43E: 8E 0C ED  STX $ed0c
  $B441: E8        INX
  $B442: F1 F3     SBC ($f3),Y
  $B444: E0 0C     CPX #$0c
  $B446: A6 16     LDX $16
  $B448: 15 13     ORA $13,X
  $B44A: 11 E8     ORA ($e8),Y
  $B44C: 46 F4     LSR $f4
  $B44E: 04 5B     NOP $5b
  $B450: F4 05     NOP $05,X
  $B452: F5 F4     SBC $f4,X
  $B454: 06 FE     ASL $fe
  $B456: F4 07     NOP $07,X
  $B458: 2E F5 FF  ROL $fff5
  $B45B: E0 09     CPX #$09
  $B45D: E3 0A     ISB ($0a,X)
  $B45F: ED E2 00  SBC $00e2
  $B462: EB 02     SBC #$02
  $B464: 8A        TXA
  $B465: EB 03     SBC #$03
  $B467: 13 13     SLO ($13),Y
  $B469: 11 13     ORA ($13),Y
  $B46B: EC 13 13  CPX $1313
  $B46E: 11 0C     ORA ($0c),Y
  $B470: EC EB 02  CPX $02eb
  $B473: E0 01     CPX #$01
  $B475: 81 15     STA ($15,X)
  $B477: 16 18     ASL $18,X
  $B479: 1A        NOP
  $B47A: 20 21 23  JSR $2321
  $B47D: 25 26     AND $26
  $B47F: 28        PLP
  $B480: 8A        TXA
  $B481: 2A        ROL A
  $B482: 9D 2A 90  STA $902a,X
  $B485: 0C 2A 28  NOP $282a
  $B488: 26 9D     ROL $9d
  $B48A: 28        PLP
  $B48B: 90 26     BCC $b4b3
  $B48D: 9D 25 90  STA $9025,X
  $B490: 0C 81 11  NOP $1181
  $B493: 13 15     SLO ($15),Y
  $B495: 16 18     ASL $18,X
  $B497: 1A        NOP
  $B498: 20 21 23  JSR $2321
  $B49B: 25 8A     AND $8a
  $B49D: 26 9D     ROL $9d
  $B49F: 26 90     ROL $90
  $B4A1: 0C 26 25  NOP $2526
  $B4A4: 23 9D     RLA ($9d,X)
  $B4A6: 25 90     AND $90
  $B4A8: 26 9D     ROL $9d
  $B4AA: 25 90     AND $90
  $B4AC: 0C EC EB  NOP $ebec
  $B4AF: 02        ???
  $B4B0: 8A        TXA
  $B4B1: 2A        ROL A
  $B4B2: 26 23     ROL $23
  $B4B4: 33 26     RLA ($26),Y
  $B4B6: 23 31     RLA ($31,X)
  $B4B8: 26 23     ROL $23
  $B4BA: 33 26     RLA ($26),Y
  $B4BC: 23 35     RLA ($35,X)
  $B4BE: 2A        ROL A
  $B4BF: 36 2A     ROL $2a,X
  $B4C1: 28        PLP
  $B4C2: 25 21     AND $21
  $B4C4: 31 25     AND ($25),Y
  $B4C6: 21 2B     AND ($2b,X)
  $B4C8: 25 21     AND $21
  $B4CA: 31 25     AND ($25),Y
  $B4CC: 21 33     AND ($33,X)
  $B4CE: 28        PLP
  $B4CF: 35 28     AND $28,X
  $B4D1: 26 23     ROL $23
  $B4D3: 1B 2B 25  SLO $252b,Y
  $B4D6: 1B 2A 25  SLO $252a,Y
  $B4D9: 1B 2B 25  SLO $252b,Y
  $B4DC: 1B 31 25  SLO $2531,Y
  $B4DF: 33 25     RLA ($25),Y
  $B4E1: 25 23     AND $23
  $B4E3: 1A        NOP
  $B4E4: 2A        ROL A
  $B4E5: 23 1A     RLA ($1a,X)
  $B4E7: 28        PLP
  $B4E8: 23 2A     RLA ($2a,X)
  $B4EA: 2B 2A     ANC #$2a
  $B4EC: 28        PLP
  $B4ED: 2A        ROL A
  $B4EE: 28        PLP
  $B4EF: 26 25     ROL $25
  $B4F1: EC E8 71  CPX $71e8
  $B4F4: F4 E0     NOP $e0,X
  $B4F6: 08        PHP
  $B4F7: E3 0B     ISB ($0b,X)
  $B4F9: 85 0C     STA $0c
  $B4FB: E8        INX
  $B4FC: 60        RTS
  $B4FD: F4 E0     NOP $e0,X
  $B4FF: 0A        ASL A
  $B500: EB 02     SBC #$02
  $B502: 8A        TXA
  $B503: EB 03     SBC #$03
  $B505: 23 23     RLA ($23,X)
  $B507: 21 23     AND ($23,X)
  $B509: EC 23 23  CPX $2323
  $B50C: 21 0C     AND ($0c,X)
  $B50E: EC EB 04  CPX $04eb
  $B511: 23 23     RLA ($23,X)
  $B513: 21 23     AND ($23,X)
  $B515: EC EB 04  CPX $04eb
  $B518: 21 21     AND ($21,X)
  $B51A: 1B 21 EC  SLO $ec21,Y
  $B51D: EB 04     SBC #$04
  $B51F: 1B 1B 1A  SLO $1a1b,Y
  $B522: 1B EC EB  SLO $ebec,Y
  $B525: 04 1A     NOP $1a
  $B527: 1A        NOP
  $B528: 19 1A EC  ORA $ec1a,Y
  $B52B: E8        INX
  $B52C: 0F F5 E0  SLO $e0f5
  $B52F: 09 E3     ORA #$e3
  $B531: 07 EB     SLO $eb
  $B533: 03 8A     SLO ($8a,X)
  $B535: 01 01     ORA ($01,X)
  $B537: 05 01     ORA $01
  $B539: EC 01 01  CPX $0101
  $B53C: 05 05     ORA $05
  $B53E: E8        INX
  $B53F: 32        ???
  $B540: F5 04     SBC $04,X
  $B542: 4E F5 05  LSR $05f5
  $B545: 94 F5     STY $f5,X
  $B547: 06 9B     ASL $9b
  $B549: F5 07     SBC $07,X
  $B54B: FC F5 FF  NOP $fff5,X
  $B54E: E2 00     NOP #$00
  $B550: ED E0 09  SBC $09e0
  $B553: E3 09     ISB ($09,X)
  $B555: 86 10     STX $10
  $B557: 10 10     BPL $b569
  $B559: 10 8B     BPL $b4e6
  $B55B: 07 08     SLO $08
  $B55D: E0 05     CPX #$05
  $B55F: E3 0B     ISB ($0b,X)
  $B561: 9A        TXS
  $B562: 0A        ASL A
  $B563: EB 02     SBC #$02
  $B565: 9D 30 8B  STA $8b30,X
  $B568: 33 32     RLA ($32),Y
  $B56A: 30 9D     BMI $b509
  $B56C: 28        PLP
  $B56D: 8B 33     XAA #$33
  $B56F: 32        ???
  $B570: 30 9D     BMI $b50f
  $B572: 2A        ROL A
  $B573: 8B 32     XAA #$32
  $B575: 30 2A     BMI $b5a1
  $B577: 9A        TXS
  $B578: 27 92     RLA $92
  $B57A: 2A        ROL A
  $B57B: 2B EC     ANC #$ec
  $B57D: EB 02     SBC #$02
  $B57F: 8B 30     XAA #$30
  $B581: 33 32     RLA ($32),Y
  $B583: 33 32     RLA ($32),Y
  $B585: 30 2A     BMI $b5b1
  $B587: 28        PLP
  $B588: 33 32     RLA ($32),Y
  $B58A: 33 35     RLA ($35),Y
  $B58C: 38        SEC
  $B58D: 37 35     RLA $35,X
  $B58F: 33 EC     RLA ($ec),Y
  $B591: E8        INX
  $B592: 63 F5     RRA ($f5,X)
  $B594: E2 80     NOP #$80
  $B596: 85 0C     STA $0c
  $B598: E8        INX
  $B599: 51 F5     EOR ($f5),Y
  $B59B: E0 0A     CPX #$0a
  $B59D: 92        ???
  $B59E: 20 8B 17  JSR $178b
  $B5A1: 18        CLC
  $B5A2: 9A        TXS
  $B5A3: 1A        NOP
  $B5A4: EB 02     SBC #$02
  $B5A6: EB 04     SBC #$04
  $B5A8: 8B 20     XAA #$20
  $B5AA: 86 20     STX $20
  $B5AC: 20 EC EB  JSR $ebec
  $B5AF: 04 8B     NOP $8b
  $B5B1: 18        CLC
  $B5B2: 86 18     STX $18
  $B5B4: 18        CLC
  $B5B5: EC EB 04  CPX $04eb
  $B5B8: 8B 1A     XAA #$1a
  $B5BA: 86 1A     STX $1a
  $B5BC: 1A        NOP
  $B5BD: EC EB 03  CPX $03eb
  $B5C0: E0 10     CPX #$10
  $B5C2: 8B 23     XAA #$23
  $B5C4: 86 23     STX $23
  $B5C6: 23 EC     RLA ($ec,X)
  $B5C8: 8B 22     XAA #$22
  $B5CA: 86 22     STX $22
  $B5CC: 22        ???
  $B5CD: E0 0A     CPX #$0a
  $B5CF: EC EB 02  CPX $02eb
  $B5D2: EB 02     SBC #$02
  $B5D4: 8B 20     XAA #$20
  $B5D6: 86 20     STX $20
  $B5D8: 20 EC EB  JSR $ebec
  $B5DB: 02        ???
  $B5DC: 8B 18     XAA #$18
  $B5DE: 86 18     STX $18
  $B5E0: 18        CLC
  $B5E1: EC EB 02  CPX $02eb
  $B5E4: 8B 1A     XAA #$1a
  $B5E6: 86 1A     STX $1a
  $B5E8: 1A        NOP
  $B5E9: EC E0 10  CPX $10e0
  $B5EC: 8B 23     XAA #$23
  $B5EE: 86 23     STX $23
  $B5F0: 23 8B     RLA ($8b,X)
  $B5F2: 22        ???
  $B5F3: 86 22     STX $22
  $B5F5: 22        ???
  $B5F6: EC E0 0A  CPX $0ae0
  $B5F9: E8        INX
  $B5FA: A4 F5     LDY $f5
  $B5FC: E0 09     CPX #$09
  $B5FE: E3 07     ISB ($07,X)
  $B600: 8B 05     XAA #$05
  $B602: 01 01     ORA ($01,X)
  $B604: 02        ???
  $B605: 02        ???
  $B606: 05 86     ORA $86
  $B608: 04 05     NOP $05
  $B60A: 04 05     NOP $05
  $B60C: EB 02     SBC #$02
  $B60E: EB 07     SBC #$07
  $B610: 8B 01     XAA #$01
  $B612: 01 05     ORA ($05,X)
  $B614: 01 EC     ORA ($ec,X)
  $B616: 01 05     ORA ($05,X)
  $B618: 01 05     ORA ($05,X)
  $B61A: EC EB 04  CPX $04eb
  $B61D: 05 01     ORA $01
  $B61F: 06 01     ASL $01
  $B621: 05 01     ORA $01
  $B623: E3 08     ISB ($08,X)
  $B625: 86 05     STX $05
  $B627: 06 05     ASL $05
  $B629: 06 E3     ASL $e3
  $B62B: 07 8B     SLO $8b
  $B62D: EC E8 0C  CPX $0ce8
  $B630: F6 03     INC $03,X
  $B632: 40        RTI
  $B633: F6 04     INC $04,X
  $B635: 41 F6     EOR ($f6,X)
  $B637: 05 55     ORA $55
  $B639: F6 06     INC $06,X
  $B63B: 5F F6 07  SRE $07f6,X
  $B63E: 69 F6     ADC #$f6
  $B640: FF E0 08  ISB $08e0,X
  $B643: E3 05     ISB ($05,X)
  $B645: E2 00     NOP #$00
  $B647: EB 03     SBC #$03
  $B649: 86 22     STX $22
  $B64B: 27 32     RLA $32
  $B64D: 27 30     RLA $30
  $B64F: 32        ???
  $B650: EC 8B 31  CPX $318b
  $B653: 32        ???
  $B654: FF E0 02  ISB $02e0,X
  $B657: E3 06     ISB ($06,X)
  $B659: 86 0C     STX $0c
  $B65B: ED E8 45  SBC $45e8
  $B65E: F6 E0     INC $e0,X
  $B660: 0C 97 17  NOP $1797
  $B663: 16 15     ASL $15,X
  $B665: 8B 14     XAA #$14
  $B667: 15 FF     ORA $ff,X
  $B669: E0 09     CPX #$09
  $B66B: E3 04     ISB ($04,X)
  $B66D: A3 10     LAX ($10,X)
  $B66F: 8B 05     XAA #$05
  $B671: 05 FF     ORA $ff
  $B673: 04 80     NOP $80
  $B675: F6 05     INC $05,X
  $B677: 98        TYA
  $B678: F6 06     INC $06,X
  $B67A: C3 F6     DCP ($f6,X)
  $B67C: 07 7F     SLO $7f
  $B67E: F6 FF     INC $ff,X
  $B680: E0 0F     CPX #$0f
  $B682: E2 C0     NOP #$c0
  $B684: E3 05     ISB ($05,X)
  $B686: EB 04     SBC #$04
  $B688: ED 8A 2A  SBC $2a8a
  $B68B: 2A        ROL A
  $B68C: 25 2A     AND $2a
  $B68E: 2A        ROL A
  $B68F: 25 2A     AND $2a
  $B691: 25 EC     AND $ec
  $B693: 95 33     STA $33,X
  $B695: 98        TYA
  $B696: 32        ???
  $B697: FF E0 09  ISB $09e0,X
  $B69A: E2 80     NOP #$80
  $B69C: E3 06     ISB ($06,X)
  $B69E: EB 02     SBC #$02
  $B6A0: 8A        TXA
  $B6A1: 42        ???
  $B6A2: 40        RTI
  $B6A3: 42        ???
  $B6A4: 3A        NOP
  $B6A5: EC EB 02  CPX $02eb
  $B6A8: 43 42     SRE ($42,X)
  $B6AA: 43 40     SRE ($40,X)
  $B6AC: EC EB 02  CPX $02eb
  $B6AF: 45 43     EOR $43
  $B6B1: 45 42     EOR $42
  $B6B3: EC 47 45  CPX $4547
  $B6B6: 47 43     SRE $43
  $B6B8: 47 45     SRE $45
  $B6BA: 47 49     SRE $49
  $B6BC: E0 06     CPX #$06
  $B6BE: 95 50     STA $50,X
  $B6C0: 98        TYA
  $B6C1: 4A        LSR A
  $B6C2: FF E0 0A  ISB $0ae0,X
  $B6C5: 85 1A     STA $1a
  $B6C7: 1A        NOP
  $B6C8: EB 07     SBC #$07
  $B6CA: 8A        TXA
  $B6CB: 1A        NOP
  $B6CC: EC 85 20  CPX $2085
  $B6CF: 20 EB 07  JSR $07eb
  $B6D2: 8A        TXA
  $B6D3: 20 EC 85  JSR $85ec
  $B6D6: 22        ???
  $B6D7: 22        ???
  $B6D8: EB 07     SBC #$07
  $B6DA: 8A        TXA
  $B6DB: 22        ???
  $B6DC: EC 85 23  CPX $2385
  $B6DF: 23 EB     RLA ($eb,X)
  $B6E1: 07 8A     SLO $8a
  $B6E3: 23 EC     RLA ($ec,X)
  $B6E5: E0 0C     CPX #$0c
  $B6E7: 98        TYA
  $B6E8: 1A        NOP
  $B6E9: FF 04 F7  ISB $f704,X
  $B6EC: F6 05     INC $05,X
  $B6EE: 44 F7     NOP $f7
  $B6F0: 06 4F     ASL $4f
  $B6F2: F7 07     ISB $07,X
  $B6F4: 68        PLA
  $B6F5: F7 FF     ISB $ff,X
  $B6F7: E0 00     CPX #$00
  $B6F9: E3 09     ISB ($09,X)
  $B6FB: E2 00     NOP #$00
  $B6FD: 98        TYA
  $B6FE: 0C 8A 0C  NOP $0c8a
  $B701: 34 28     NOP $28,X
  $B703: 33 28     RLA ($28),Y
  $B705: 31 28     AND ($28),Y
  $B707: 33 28     RLA ($28),Y
  $B709: 34 28     NOP $28,X
  $B70B: 36 28     ROL $28,X
  $B70D: 34 28     NOP $28,X
  $B70F: 33 28     RLA ($28),Y
  $B711: 36 2B     ROL $2b,X
  $B713: 34 2B     NOP $2b,X
  $B715: 33 2B     RLA ($2b),Y
  $B717: 34 2B     NOP $2b,X
  $B719: 36 2B     ROL $2b,X
  $B71B: 38        SEC
  $B71C: 2B 36     ANC #$36
  $B71E: 2B 34     ANC #$34
  $B720: 2B 39     ANC #$39
  $B722: 31 38     AND ($38),Y
  $B724: 31 36     AND ($36),Y
  $B726: 31 38     AND ($38),Y
  $B728: 31 39     AND ($39),Y
  $B72A: 31 3B     AND ($3b),Y
  $B72C: 31 39     AND ($39),Y
  $B72E: 31 38     AND ($38),Y
  $B730: 31 41     AND ($41),Y
  $B732: 33 3B     RLA ($3b),Y
  $B734: 33 39     RLA ($39),Y
  $B736: 33 38     RLA ($38),Y
  $B738: 33 36     RLA ($36),Y
  $B73A: 33 34     RLA ($34),Y
  $B73C: 31 33     AND ($33),Y
  $B73E: 2B 31     ANC #$31
  $B740: 33 E8     RLA ($e8),Y
  $B742: 01 F7     ORA ($f7,X)
  $B744: E0 06     CPX #$06
  $B746: E2 40     NOP #$40
  $B748: E3 0A     ISB ($0a,X)
  $B74A: 95 0C     STA $0c,X
  $B74C: E8        INX
  $B74D: FD F6 E0  SBC $e0f6,X
  $B750: 0A        ASL A
  $B751: 98        TYA
  $B752: 0C 8A 0C  NOP $0c8a
  $B755: EB 10     SBC #$10
  $B757: 21 EC     AND ($ec,X)
  $B759: EB 10     SBC #$10
  $B75B: 1B EC EB  SLO $ebec,Y
  $B75E: 10 19     BPL $b779
  $B760: EC EB 10  CPX $10eb
  $B763: 18        CLC
  $B764: EC E8 55  CPX $55e8
  $B767: F7 E0     ISB $e0,X
  $B769: 12        ???
  $B76A: E3 05     ISB ($05,X)
  $B76C: 85 02     STA $02
  $B76E: 02        ???
  $B76F: 8A        TXA
  $B770: 02        ???
  $B771: 02        ???
  $B772: 02        ???
  $B773: 02        ???
  $B774: EB 0C     SBC #$0c
  $B776: E9 AC     SBC #$ac
  $B778: E4 EC     CPX $ec
  $B77A: EB 07     SBC #$07
  $B77C: 05 01     ORA $01
  $B77E: EC 05 05  CPX $0505
  $B781: E8        INX
  $B782: 74 F7     NOP $f7,X
  $B784: 04 91     NOP $91
  $B786: F7 05     ISB $05,X
  $B788: CE F7 06  DEC $06f7
  $B78B: D8        CLD
  $B78C: F7 07     ISB $07,X
  $B78E: E8        INX
  $B78F: F7 FF     ISB $ff,X
  $B791: E0 09     CPX #$09
  $B793: E3 08     ISB ($08,X)
  $B795: E2 80     NOP #$80
  $B797: 87 EB     SAX $eb
  $B799: 04 31     NOP $31
  $B79B: 38        SEC
  $B79C: 36 38     ROL $38,X
  $B79E: 35 38     AND $38,X
  $B7A0: 36 38     ROL $38,X
  $B7A2: EC EB 02  CPX $02eb
  $B7A5: 33 3A     RLA ($3a),Y
  $B7A7: 38        SEC
  $B7A8: 3A        NOP
  $B7A9: 36 3A     ROL $3a,X
  $B7AB: 38        SEC
  $B7AC: 3A        NOP
  $B7AD: EC EB 02  CPX $02eb
  $B7B0: 35 40     AND $40,X
  $B7B2: 3A        NOP
  $B7B3: 40        RTI
  $B7B4: 38        SEC
  $B7B5: 40        RTI
  $B7B6: 3A        NOP
  $B7B7: 40        RTI
  $B7B8: EC EB 02  CPX $02eb
  $B7BB: 41 40     EOR ($40,X)
  $B7BD: 3A        NOP
  $B7BE: EC 41 3A  CPX $3a41
  $B7C1: EB 02     SBC #$02
  $B7C3: 43 41     SRE ($41,X)
  $B7C5: 3A        NOP
  $B7C6: EC 41 43  CPX $4341
  $B7C9: E0 06     CPX #$06
  $B7CB: 9C 41 FF  SHY $ff41,X
  $B7CE: E0 00     CPX #$00
  $B7D0: E3 0A     ISB ($0a,X)
  $B7D2: ED 83 0C  SBC $0c83
  $B7D5: E8        INX
  $B7D6: 95 F7     STA $f7,X
  $B7D8: E0 0C     CPX #$0c
  $B7DA: A4 21     LDY $21
  $B7DC: 1A        NOP
  $B7DD: 16 18     ASL $18,X
  $B7DF: 9C 16 18  SHY $1816,X
  $B7E2: 94 1A     STY $1a,X
  $B7E4: 8C 20 21  STY $2120
  $B7E7: FF E0 09  ISB $09e0,X
  $B7EA: E3 05     ISB ($05,X)
  $B7EC: EB 0A     SBC #$0a
  $B7EE: 8C 00 87  STY $8700
  $B7F1: 00        BRK
  $B7F2: 01 8C     ORA ($8c,X)
  $B7F4: 05 00     ORA $00
  $B7F6: EC 94 05  CPX $0594
  $B7F9: 8C 06 05  STY $0506
  $B7FC: FF 01 01  ISB $0101,X
  $B7FF: F8        SED
  $B800: FF E0 11  ISB $11e0,X
  $B803: E2 80     NOP #$80
  $B805: E3 00     ISB ($00,X)
  $B807: 85 EB     STA $eb
  $B809: 04 54     NOP $54
  $B80B: 50 EC     BVC $b7f9
  $B80D: E0 00     CPX #$00
  $B80F: 96 54     STX $54,Y
  $B811: FF 01 16  ISB $1601,X
  $B814: F8        SED
  $B815: FF E0 12  ISB $12e0,X
  $B818: E2 80     NOP #$80
  $B81A: E3 00     ISB ($00,X)
  $B81C: 87 39     SAX $39
  $B81E: 35 FF     AND $ff,X
  $B820: 01 24     ORA ($24,X)
  $B822: F8        SED
  $B823: FF E0 11  ISB $11e0,X
  $B826: E2 80     NOP #$80
  $B828: E3 00     ISB ($00,X)
  $B82A: 86 4B     STX $4b
  $B82C: 47 E0     SRE $e0
  $B82E: 09 8E     ORA #$8e
  $B830: 50 FF     BVC $b831
  $B832: 00        BRK
  $B833: 3B F8 01  RLA $01f8,Y
  $B836: 3B F8 03  RLA $03f8,Y
  $B839: 3C F8 FF  NOP $fff8,X
  $B83C: E0 03     CPX #$03
  $B83E: E3 00     ISB ($00,X)
  $B840: 81 0B     STA ($0b,X)
  $B842: 08        PHP
  $B843: 0D 0F 0C  ORA $0c0f
  $B846: 06 0F     ASL $0f
  $B848: 0A        ASL A
  $B849: 0F FF 01  SLO $01ff
  $B84C: 52        ???
  $B84D: F8        SED
  $B84E: 03 67     SLO ($67,X)
  $B850: F8        SED
  $B851: FF E0 00  ISB $00e0,X
  $B854: E2 80     NOP #$80
  $B856: E3 00     ISB ($00,X)
  $B858: 81 4A     STA ($4a,X)
  $B85A: 82 4B     NOP #$4b
  $B85C: 81 0C     STA ($0c,X)
  $B85E: 54 59     NOP $59,X
  $B860: 56 EB     LSR $eb,X
  $B862: 15 58     ORA $58,X
  $B864: 54 EC     NOP $ec,X
  $B866: FF 9A 10  ISB $109a,X
  $B869: 92        ???
  $B86A: 10 E8     BPL $b854
  $B86C: 96 F8     STX $f8,Y
  $B86E: 01 75     ORA ($75,X)
  $B870: F8        SED
  $B871: 03 83     SLO ($83,X)
  $B873: F8        SED
  $B874: FF E0 09  ISB $09e0,X
  $B877: E2 80     NOP #$80
  $B879: E3 00     ISB ($00,X)
  $B87B: 81 05     STA ($05,X)
  $B87D: 04 03     NOP $03
  $B87F: 02        ???
  $B880: 01 00     ORA ($00,X)
  $B882: FF E0 09  ISB $09e0,X
  $B885: E3 00     ISB ($00,X)
  $B887: 81 0B     STA ($0b,X)
  $B889: 0C 05 0F  NOP $0f05
  $B88C: 0A        ASL A
  $B88D: 08        PHP
  $B88E: 05 0D     ORA $0d
  $B890: 0F FF 03  SLO $03ff
  $B893: 96 F8     STX $f8,Y
  $B895: FF E0 01  ISB $01e0,X
  $B898: E3 04     ISB ($04,X)
  $B89A: 8F 0A E3  SAX $e30a
  $B89D: 01 96     ORA ($96,X)
  $B89F: 0A        ASL A
  $B8A0: E3 03     ISB ($03,X)
  $B8A2: 8B 0A     XAA #$0a
  $B8A4: E3 02     ISB ($02,X)
  $B8A6: 8F 0A E3  SAX $e30a
  $B8A9: 03 92     SLO ($92,X)
  $B8AB: 0A        ASL A
  $B8AC: E3 04     ISB ($04,X)
  $B8AE: 8F 0A E3  SAX $e30a
  $B8B1: 05 8B     ORA $8b
  $B8B3: 0A        ASL A
  $B8B4: E3 06     ISB ($06,X)
  $B8B6: 92        ???
  $B8B7: 0A        ASL A
  $B8B8: E3 07     ISB ($07,X)
  $B8BA: 92        ???
  $B8BB: 0A        ASL A
  $B8BC: E3 08     ISB ($08,X)
  $B8BE: 96 0A     STX $0a,Y
  $B8C0: E3 09     ISB ($09,X)
  $B8C2: 8F 0A E3  SAX $e30a
  $B8C5: 0A        ASL A
  $B8C6: 0A        ASL A
  $B8C7: E3 0B     ISB ($0b,X)
  $B8C9: 0A        ASL A
  $B8CA: E3 0C     ISB ($0c,X)
  $B8CC: 0A        ASL A
  $B8CD: E3 0D     ISB ($0d,X)
  $B8CF: 0A        ASL A
  $B8D0: E3 0E     ISB ($0e,X)
  $B8D2: 0A        ASL A
  $B8D3: E3 0F     ISB ($0f,X)
  $B8D5: 99 0A FF  STA $ff0a,Y
  $B8D8: 03 DC     SLO ($dc,X)
  $B8DA: F8        SED
  $B8DB: FF 82 E8  ISB $e882,X
  $B8DE: 67 FA     RRA $fa
  $B8E0: 03 E4     SLO ($e4,X)
  $B8E2: F8        SED
  $B8E3: FF E0 05  ISB $05e0,X
  $B8E6: E3 00     ISB ($00,X)
  $B8E8: 84 0E     STY $0e
  $B8EA: 0F 0D 0E  SLO $0e0d
  $B8ED: 0C 0D E3  NOP $e30d
  $B8F0: 01 0B     ORA ($0b,X)
  $B8F2: 0C 0A 0B  NOP $0b0a
  $B8F5: E3 02     ISB ($02,X)
  $B8F7: 09 0A     ORA #$0a
  $B8F9: 08        PHP
  $B8FA: 09 E3     ORA #$e3
  $B8FC: 03 07     SLO ($07,X)
  $B8FE: 08        PHP
  $B8FF: E3 04     ISB ($04,X)
  $B901: 06 07     ASL $07
  $B903: E3 05     ISB ($05,X)
  $B905: 05 06     ORA $06
  $B907: E3 07     ISB ($07,X)
  $B909: 04 05     NOP $05
  $B90B: E0 06     CPX #$06
  $B90D: 9C 04 FF  SHY $ff04,X
  $B910: 03 14     SLO ($14,X)
  $B912: F9 FF E0  SBC $e0ff,Y
  $B915: 06 E3     ASL $e3
  $B917: 00        BRK
  $B918: EB 03     SBC #$03
  $B91A: 81 0F     STA ($0f,X)
  $B91C: 00        BRK
  $B91D: 0E 01 EC  ASL $ec01
  $B920: EB 05     SBC #$05
  $B922: 0D 00 0C  ORA $0c00
  $B925: 01 EC     ORA ($ec,X)
  $B927: EB 04     SBC #$04
  $B929: 0B 00     ANC #$00
  $B92B: 0A        ASL A
  $B92C: 01 EC     ORA ($ec,X)
  $B92E: 09 00     ORA #$00
  $B930: 08        PHP
  $B931: 01 07     ORA ($07,X)
  $B933: 00        BRK
  $B934: 06 01     ASL $01
  $B936: 05 00     ORA $00
  $B938: 04 01     NOP $01
  $B93A: 03 00     SLO ($00,X)
  $B93C: 02        ???
  $B93D: 01 02     ORA ($02,X)
  $B93F: 00        BRK
  $B940: 01 01     ORA ($01,X)
  $B942: E0 00     CPX #$00
  $B944: 96 00     STX $00,Y
  $B946: FF 03 4B  ISB $4b03,X
  $B949: F9 FF E0  SBC $e0ff,Y
  $B94C: 06 E3     ASL $e3
  $B94E: 00        BRK
  $B94F: EB 03     SBC #$03
  $B951: 81 00     STA ($00,X)
  $B953: 0F 01 0E  SLO $0e01
  $B956: EC EB 05  CPX $05eb
  $B959: 02        ???
  $B95A: 0F 03 0E  SLO $0e03
  $B95D: EC EB 04  CPX $04eb
  $B960: 04 0F     NOP $0f
  $B962: 05 0E     ORA $0e
  $B964: EC 06 0F  CPX $0f06
  $B967: 07 0E     SLO $0e
  $B969: 08        PHP
  $B96A: 0F 09 0E  SLO $0e09
  $B96D: 0A        ASL A
  $B96E: 0F 0B 0E  SLO $0e0b
  $B971: 0C 0F 0D  NOP $0d0f
  $B974: 0E E0 00  ASL $00e0
  $B977: 96 0F     STX $0f,Y
  $B979: FF E0 11  ISB $11e0,X
  $B97C: E3 00     ISB ($00,X)
  $B97E: 81 0A     STA ($0a,X)
  $B980: 00        BRK
  $B981: 01 02     ORA ($02,X)
  $B983: 03 04     SLO ($04,X)
  $B985: 05 FF     ORA $ff
  $B987: 01 8E     ORA ($8e,X)
  $B989: F9 03 7A  SBC $7a03,Y
  $B98C: F9 FF E0  SBC $e0ff,Y
  $B98F: 00        BRK
  $B990: E2 80     NOP #$80
  $B992: E3 00     ISB ($00,X)
  $B994: 81 10     STA ($10,X)
  $B996: 01 11     ORA ($11,X)
  $B998: FF 01 A0  ISB $a001,X
  $B99B: F9 03 C5  SBC $c503,Y
  $B99E: F9 FF E0  SBC $e0ff,Y
  $B9A1: 09 E2     ORA #$e2
  $B9A3: 80 E3     NOP #$e3
  $B9A5: 00        BRK
  $B9A6: 81 10     STA ($10,X)
  $B9A8: 20 00 10  JSR $1000
  $B9AB: 89 E4     NOP #$e4
  $B9AD: 85 16     STA $16
  $B9AF: E3 06     ISB ($06,X)
  $B9B1: E4 85     CPX $85
  $B9B3: 16 E3     ASL $e3,X
  $B9B5: 0A        ASL A
  $B9B6: E4 85     CPX $85
  $B9B8: 16 E3     ASL $e3,X
  $B9BA: 0C E4 85  NOP $85e4
  $B9BD: 16 E3     ASL $e3,X
  $B9BF: 0E 84 E4  ASL $e484
  $B9C2: 85 16     STA $16
  $B9C4: FF E0 00  ISB $00e0,X
  $B9C7: E3 00     ISB ($00,X)
  $B9C9: 84 ED     STY $ed
  $B9CB: 0A        ASL A
  $B9CC: 96 01     STX $01,Y
  $B9CE: FF 01 D6  ISB $d601,X
  $B9D1: F9 03 E3  SBC $e303,Y
  $B9D4: F9 FF E0  SBC $e0ff,Y
  $B9D7: 00        BRK
  $B9D8: E2 80     NOP #$80
  $B9DA: E3 00     ISB ($00,X)
  $B9DC: 81 10     STA ($10,X)
  $B9DE: 20 00 10  JSR $1000
  $B9E1: 20 FF E9  JSR $e9ff
  $B9E4: E8        INX
  $B9E5: F9 05 FF  SBC $ff05,Y
  $B9E8: E0 09     CPX #$09
  $B9EA: E3 00     ISB ($00,X)
  $B9EC: 84 ED     STY $ed
  $B9EE: 0A        ASL A
  $B9EF: 8E EA 01  STX $01ea
  $B9F2: D6 F9     DEC $f9,X
  $B9F4: 03 F8     SLO ($f8,X)
  $B9F6: F9 FF E9  SBC $e9ff,Y
  $B9F9: E8        INX
  $B9FA: F9 0F FF  SBC $ff0f,Y
  $B9FD: 01 04     ORA ($04,X)
  $B9FF: FA        NOP
  $BA00: 03 19     SLO ($19,X)
  $BA02: FA        NOP
  $BA03: FF E0 00  ISB $00e0,X
  $BA06: E2 80     NOP #$80
  $BA08: E3 00     ISB ($00,X)
  $BA0A: 81 15     STA ($15,X)
  $BA0C: 14 12     NOP $12,X
  $BA0E: 10 0B     BPL $ba1b
  $BA10: 09 07     ORA #$07
  $BA12: 05 04     ORA $04
  $BA14: E3 08     ISB ($08,X)
  $BA16: 86 15     STX $15
  $BA18: FF E9 23  ISB $23e9,X
  $BA1B: FA        NOP
  $BA1C: 09 E3     ORA #$e3
  $BA1E: 09 ED     ORA #$ed
  $BA20: 85 08     STA $08
  $BA22: FF E0 00  ISB $00e0,X
  $BA25: E3 00     ISB ($00,X)
  $BA27: 81 0B     STA ($0b,X)
  $BA29: 08        PHP
  $BA2A: 0D 0F 0C  ORA $0c0f
  $BA2D: 06 0F     ASL $0f
  $BA2F: 0A        ASL A
  $BA30: 10 0F     BPL $ba41
  $BA32: 0D 0B EA  ORA $ea0b
  $BA35: 01 04     ORA ($04,X)
  $BA37: FA        NOP
  $BA38: 03 3C     SLO ($3c,X)
  $BA3A: FA        NOP
  $BA3B: FF E9 23  ISB $23e9,X
  $BA3E: FA        NOP
  $BA3F: 0A        ASL A
  $BA40: E3 01     ISB ($01,X)
  $BA42: 0B E3     ANC #$e3
  $BA44: 03 0B     SLO ($0b,X)
  $BA46: E3 05     ISB ($05,X)
  $BA48: 0B E3     ANC #$e3
  $BA4A: 07 0B     SLO $0b
  $BA4C: E3 09     ISB ($09,X)
  $BA4E: 0B E3     ANC #$e3
  $BA50: 0A        ASL A
  $BA51: 0B E3     ANC #$e3
  $BA53: 0B 0B     ANC #$0b
  $BA55: E3 0C     ISB ($0c,X)
  $BA57: 0B E3     ANC #$e3
  $BA59: 0D 0B E3  ORA $e30b
  $BA5C: 0E 0B E3  ASL $e30b
  $BA5F: 0F 0B FF  SLO $ff0b
  $BA62: 03 66     SLO ($66,X)
  $BA64: FA        NOP
  $BA65: FF 81 E0  ISB $e081,X
  $BA68: 00        BRK
  $BA69: E3 00     ISB ($00,X)
  $BA6B: 0F 0E 0D  SLO $0d0e
  $BA6E: 0C 0E 0D  NOP $0d0e
  $BA71: 0C 0B 0D  NOP $0d0b
  $BA74: 0C 0B 0A  NOP $0a0b
  $BA77: 81 0C     STA ($0c,X)
  $BA79: 0B 0A     ANC #$0a
  $BA7B: 09 0B     ORA #$0b
  $BA7D: 0A        ASL A
  $BA7E: 09 08     ORA #$08
  $BA80: 0A        ASL A
  $BA81: 09 08     ORA #$08
  $BA83: 07 09     SLO $09
  $BA85: 08        PHP
  $BA86: 07 06     SLO $06
  $BA88: 08        PHP
  $BA89: 07 06     SLO $06
  $BA8B: 05 07     ORA $07
  $BA8D: 06 05     ASL $05
  $BA8F: 04 06     NOP $06
  $BA91: 05 04     ORA $04
  $BA93: 03 05     SLO ($05,X)
  $BA95: 04 03     NOP $03
  $BA97: 02        ???
  $BA98: 04 03     NOP $03
  $BA9A: 02        ???
  $BA9B: 01 03     ORA ($03,X)
  $BA9D: 02        ???
  $BA9E: 01 96     ORA ($96,X)
  $BAA0: 00        BRK
  $BAA1: FF 03 A6  ISB $a603,X
  $BAA4: FA        NOP
  $BAA5: FF E0 00  ISB $00e0,X
  $BAA8: E3 00     ISB ($00,X)
  $BAAA: 81 00     STA ($00,X)
  $BAAC: 01 02     ORA ($02,X)
  $BAAE: 03 01     SLO ($01,X)
  $BAB0: 02        ???
  $BAB1: 03 04     SLO ($04,X)
  $BAB3: 02        ???
  $BAB4: 03 04     SLO ($04,X)
  $BAB6: 05 03     ORA $03
  $BAB8: 04 05     NOP $05
  $BABA: 06 04     ASL $04
  $BABC: 05 06     ORA $06
  $BABE: 07 05     SLO $05
  $BAC0: 06 07     ASL $07
  $BAC2: 08        PHP
  $BAC3: 06 07     ASL $07
  $BAC5: 08        PHP
  $BAC6: 09 07     ORA #$07
  $BAC8: 08        PHP
  $BAC9: 09 0A     ORA #$0a
  $BACB: 08        PHP
  $BACC: 09 0A     ORA #$0a
  $BACE: 0B 09     ANC #$09
  $BAD0: 0A        ASL A
  $BAD1: 0B 0C     ANC #$0c
  $BAD3: 0A        ASL A
  $BAD4: 0B 0C     ANC #$0c
  $BAD6: 0D 0B 0C  ORA $0c0b
  $BAD9: 0D 0E 0C  ORA $0c0e
  $BADC: 0D 0E 96  ORA $960e
  $BADF: 0F FF 03  SLO $03ff
  $BAE2: E5 FA     SBC $fa
  $BAE4: FF E0 06  ISB $06e0,X
  $BAE7: E3 00     ISB ($00,X)
  $BAE9: 81 00     STA ($00,X)
  $BAEB: 0F 00 0F  SLO $0f00
  $BAEE: 01 0E     ORA ($0e,X)
  $BAF0: 01 0E     ORA ($0e,X)
  $BAF2: 02        ???
  $BAF3: 0D 02 0D  ORA $0d02
  $BAF6: 03 0C     SLO ($0c,X)
  $BAF8: 03 0C     SLO ($0c,X)
  $BAFA: 04 0B     NOP $0b
  $BAFC: 04 0B     NOP $0b
  $BAFE: 05 0A     ORA $0a
  $BB00: 05 0A     ORA $0a
  $BB02: 06 09     ASL $09
  $BB04: 06 09     ASL $09
  $BB06: 08        PHP
  $BB07: 07 08     SLO $08
  $BB09: E0 00     CPX #$00
  $BB0B: 96 07     STX $07,Y
  $BB0D: FF 03 12  ISB $1203,X
  $BB10: FB FF E0  ISB $e0ff,Y
  $BB13: 00        BRK
  $BB14: E3 00     ISB ($00,X)
  $BB16: 82 0D     NOP #$0d
  $BB18: E3 02     ISB ($02,X)
  $BB1A: 0C 07 E3  NOP $e307
  $BB1D: 06 0D     ASL $0d
  $BB1F: FF 03 24  ISB $2403,X
  $BB22: FB FF E0  ISB $e0ff,Y
  $BB25: 09 E3     ORA #$e3
  $BB27: 00        BRK
  $BB28: 82 0A     NOP #$0a
  $BB2A: 0B 10     ANC #$10
  $BB2C: 10 81     BPL $baaf
  $BB2E: 0A        ASL A
  $BB2F: 0B 07     ANC #$07
  $BB31: 08        PHP
  $BB32: 09 E0     ORA #$e0
  $BB34: 00        BRK
  $BB35: 93 0A     ??? ($0a),Y
  $BB37: FF 00 4D  ISB $4d00,X
  $BB3A: FB 01 4D  ISB $4d01,Y
  $BB3D: FB 03 4E  ISB $4e03,Y
  $BB40: FB 04 4D  ISB $4d04,Y
  $BB43: FB 05 6E  ISB $6e05,Y
  $BB46: FB 06 4D  ISB $4d06,Y
  $BB49: FB 07 4D  ISB $4d07,Y
  $BB4C: FB FF E9  ISB $e9ff,Y
  $BB4F: 56 FB     LSR $fb,X
  $BB51: 8F 10 E8  SAX $e810
  $BB54: 1A        NOP
  $BB55: FC E0 05  NOP $05e0,X
  $BB58: E3 00     ISB ($00,X)
  $BB5A: 81 0D     STA ($0d,X)
  $BB5C: 0E 0F 0E  ASL $0e0f
  $BB5F: 0D 0C 0B  ORA $0b0c
  $BB62: 0C 0A 0B  NOP $0b0a
  $BB65: 09 08     ORA #$08
  $BB67: 07 06     SLO $06
  $BB69: 05 06     ORA $06
  $BB6B: 07 08     SLO $08
  $BB6D: EA        NOP
  $BB6E: 89 0C     NOP #$0c
  $BB70: 92        ???
  $BB71: 0C E8 52  NOP $52e8
  $BB74: F8        SED
  $BB75: 01 7C     ORA ($7c,X)
  $BB77: FB 03 83  ISB $8303,Y
  $BB7A: FB FF 88  ISB $88ff,Y
  $BB7D: 0C 92 0C  NOP $0c92
  $BB80: E8        INX
  $BB81: 52        ???
  $BB82: F8        SED
  $BB83: E9 56     SBC #$56
  $BB85: FB 8F 10  ISB $108f,Y
  $BB88: E8        INX
  $BB89: 96 F8     STX $f8,Y
  $BB8B: 03 8E     SLO ($8e,X)
  $BB8D: FB E0 00  ISB $00e0,Y
  $BB90: E3 00     ISB ($00,X)
  $BB92: 81 08     STA ($08,X)
  $BB94: 09 0A     ORA #$0a
  $BB96: 0B 0F     ANC #$0f
  $BB98: 0E 0D 0C  ASL $0c0d
  $BB9B: 0B 0A     ANC #$0a
  $BB9D: 09 08     ORA #$08
  $BB9F: 07 06     SLO $06
  $BBA1: 05 04     ORA $04
  $BBA3: 03 04     SLO ($04,X)
  $BBA5: 03 E3     SLO ($e3,X)
  $BBA7: 01 04     ORA ($04,X)
  $BBA9: 02        ???
  $BBAA: E3 02     ISB ($02,X)
  $BBAC: 05 03     ORA $03
  $BBAE: E3 03     ISB ($03,X)
  $BBB0: 04 02     NOP $02
  $BBB2: E3 04     ISB ($04,X)
  $BBB4: 05 03     ORA $03
  $BBB6: E3 05     ISB ($05,X)
  $BBB8: 04 02     NOP $02
  $BBBA: E3 06     ISB ($06,X)
  $BBBC: 05 03     ORA $03
  $BBBE: E3 07     ISB ($07,X)
  $BBC0: 04 02     NOP $02
  $BBC2: E3 08     ISB ($08,X)
  $BBC4: 05 03     ORA $03
  $BBC6: E3 09     ISB ($09,X)
  $BBC8: 04 02     NOP $02
  $BBCA: E3 0A     ISB ($0a,X)
  $BBCC: 05 03     ORA $03
  $BBCE: E3 0B     ISB ($0b,X)
  $BBD0: 04 02     NOP $02
  $BBD2: E3 0C     ISB ($0c,X)
  $BBD4: 05 03     ORA $03
  $BBD6: E3 0D     ISB ($0d,X)
  $BBD8: 04 02     NOP $02
  $BBDA: E3 0E     ISB ($0e,X)
  $BBDC: 05 03     ORA $03
  $BBDE: E3 0F     ISB ($0f,X)
  $BBE0: 04 02     NOP $02
  $BBE2: FF 00 4D  ISB $4d00,X
  $BBE5: FB 01 4D  ISB $4d01,Y
  $BBE8: FB 03 F9  ISB $f903,Y
  $BBEB: FB 04 4D  ISB $4d04,Y
  $BBEE: FB 05 65  ISB $6505,Y
  $BBF1: FC 06 4D  NOP $4d06,X
  $BBF4: FB 07 4D  ISB $4d07,Y
  $BBF7: FB FF E0  ISB $e0ff,Y
  $BBFA: 09 E3     ORA #$e3
  $BBFC: 00        BRK
  $BBFD: 81 0D     STA ($0d,X)
  $BBFF: 0E 06 09  ASL $0906
  $BC02: 0A        ASL A
  $BC03: 0C 0D 05  NOP $050d
  $BC06: 08        PHP
  $BC07: 09 0B     ORA #$0b
  $BC09: 0C 04 07  NOP $0704
  $BC0C: 08        PHP
  $BC0D: 0A        ASL A
  $BC0E: 0B 03     ANC #$03
  $BC10: 06 07     ASL $07
  $BC12: 06 07     ASL $07
  $BC14: 08        PHP
  $BC15: 09 83     ORA #$83
  $BC17: 0A        ASL A
  $BC18: 8F 10 E0  SAX $e010
  $BC1B: 01 E3     ORA ($e3,X)
  $BC1D: 04 8F     NOP $8f
  $BC1F: 0A        ASL A
  $BC20: E3 02     ISB ($02,X)
  $BC22: 9A        TXS
  $BC23: 0A        ASL A
  $BC24: E3 03     ISB ($03,X)
  $BC26: 97 0A     SAX $0a,Y
  $BC28: E3 02     ISB ($02,X)
  $BC2A: 95 0A     STA $0a,X
  $BC2C: E3 01     ISB ($01,X)
  $BC2E: 96 0A     STX $0a,Y
  $BC30: E3 03     ISB ($03,X)
  $BC32: 98        TYA
  $BC33: 0A        ASL A
  $BC34: E3 04     ISB ($04,X)
  $BC36: 99 0A E3  STA $e30a,Y
  $BC39: 05 97     ORA $97
  $BC3B: 0A        ASL A
  $BC3C: E3 06     ISB ($06,X)
  $BC3E: 99 0A E3  STA $e30a,Y
  $BC41: 07 98     SLO $98
  $BC43: 0A        ASL A
  $BC44: E3 08     ISB ($08,X)
  $BC46: 9A        TXS
  $BC47: 0A        ASL A
  $BC48: E3 09     ISB ($09,X)
  $BC4A: 98        TYA
  $BC4B: 0A        ASL A
  $BC4C: E3 0A     ISB ($0a,X)
  $BC4E: 96 0A     STX $0a,Y
  $BC50: E3 0B     ISB ($0b,X)
  $BC52: 95 0A     STA $0a,X
  $BC54: E3 0C     ISB ($0c,X)
  $BC56: 94 0A     STY $0a,X
  $BC58: E3 0D     ISB ($0d,X)
  $BC5A: 95 0A     STA $0a,X
  $BC5C: E3 0E     ISB ($0e,X)
  $BC5E: 94 0A     STY $0a,X
  $BC60: E3 0F     ISB ($0f,X)
  $BC62: 95 0A     STA $0a,X
  $BC64: FF 89 0C  ISB $0c89,X
  $BC67: 92        ???
  $BC68: 0C E8 52  NOP $52e8
  $BC6B: F8        SED
  $BC6C: 00        BRK
  $BC6D: 75 FC     ADC $fc,X
  $BC6F: 01 76     ORA ($76,X)
  $BC71: FC 03 89  NOP $8903,X
  $BC74: FC FF E0  NOP $e0ff,X
  $BC77: 11 E2     ORA ($e2),Y
  $BC79: 40        RTI
  $BC7A: E3 00     ISB ($00,X)
  $BC7C: 82 06     NOP #$06
  $BC7E: 05 E3     ORA $e3
  $BC80: 04 81     NOP $81
  $BC82: 03 02     SLO ($02,X)
  $BC84: 0C E3 09  NOP $09e3
  $BC87: 13 FF     SLO ($ff),Y
  $BC89: E0 00     CPX #$00
  $BC8B: E3 00     ISB ($00,X)
  $BC8D: 81 0F     STA ($0f,X)
  $BC8F: 0E 0D E3  ASL $e30d
  $BC92: 04 83     NOP $83
  $BC94: 09 E3     ORA #$e3
  $BC96: 09 00     ORA #$00
  $BC98: FF 01 A0  ISB $a001,X
  $BC9B: FC 03 B2  NOP $b203,X
  $BC9E: FC FF E0  NOP $e0ff,X
  $BCA1: 00        BRK
  $BCA2: E2 40     NOP #$40
  $BCA4: E3 00     ISB ($00,X)
  $BCA6: 82 00     NOP #$00
  $BCA8: 01 0C     ORA ($0c,X)
  $BCAA: E3 02     ISB ($02,X)
  $BCAC: 81 08     STA ($08,X)
  $BCAE: E3 05     ISB ($05,X)
  $BCB0: 07 FF     SLO $ff
  $BCB2: E0 00     CPX #$00
  $BCB4: E3 00     ISB ($00,X)
  $BCB6: 81 0F     STA ($0f,X)
  $BCB8: 0E 0D E3  ASL $e30d
  $BCBB: 07 00     SLO $00
  $BCBD: FF 00 C7  ISB $c700,X
  $BCC0: FC 01 C7  NOP $c701,X
  $BCC3: FC 03 C8  NOP $c803,X
  $BCC6: FC FF E0  NOP $e0ff,X
  $BCC9: 00        BRK
  $BCCA: E3 00     ISB ($00,X)
  $BCCC: ED 84 09  SBC $0984
  $BCCF: 93 06     ??? ($06),Y
  $BCD1: FF 01 D9  ISB $d901,X
  $BCD4: FC 03 F1  NOP $f103,X
  $BCD7: FC FF E0  NOP $e0ff,X
  $BCDA: 00        BRK
  $BCDB: E2 80     NOP #$80
  $BCDD: E3 00     ISB ($00,X)
  $BCDF: 85 E4     STA $e4
  $BCE1: 85 15     STA $15
  $BCE3: E3 05     ISB ($05,X)
  $BCE5: E4 85     CPX $85
  $BCE7: 14 E3     NOP $e3,X
  $BCE9: 0A        ASL A
  $BCEA: E4 85     CPX $85
  $BCEC: 13 E4     SLO ($e4),Y
  $BCEE: 85 12     STA $12
  $BCF0: FF E0 00  ISB $00e0,X
  $BCF3: E3 00     ISB ($00,X)
  $BCF5: 81 0F     STA ($0f,X)
  $BCF7: 05 0E     ORA $0e
  $BCF9: 05 0D     ORA $0d
  $BCFB: 05 06     ORA $06
  $BCFD: 07 08     SLO $08
  $BCFF: 09 0A     ORA #$0a
  $BD01: 0B 0C     ANC #$0c
  $BD03: 0B 96     ANC #$96
  $BD05: 0A        ASL A
  $BD06: FF 01 0B  ISB $0b01,X
  $BD09: FD FF E0  SBC $e0ff,X
  $BD0C: 00        BRK
  $BD0D: E2 80     NOP #$80
  $BD0F: E3 00     ISB ($00,X)
  $BD11: 84 E4     STY $e4
  $BD13: 85 10     STA $10
  $BD15: 83 E4     SAX ($e4,X)
  $BD17: 8D 11 FF  STA $ff11
  $BD1A: 01 21     ORA ($21,X)
  $BD1C: FD 03 38  SBC $3803,X
  $BD1F: FD FF E0  SBC $e0ff,X
  $BD22: 00        BRK
  $BD23: E2 40     NOP #$40
  $BD25: E3 05     ISB ($05,X)
  $BD27: 81 15     STA ($15,X)
  $BD29: 13 11     SLO ($11),Y
  $BD2B: 0B 09     ANC #$09
  $BD2D: 0B 11     ANC #$11
  $BD2F: 10 0B     BPL $bd3c
  $BD31: 0A        ASL A
  $BD32: 09 0C     ORA #$0c
  $BD34: 09 0C     ORA #$0c
  $BD36: 09 FF     ORA #$ff
  $BD38: E0 00     CPX #$00
  $BD3A: E3 00     ISB ($00,X)
  $BD3C: 81 03     STA ($03,X)
  $BD3E: 05 04     ORA $04
  $BD40: 06 05     ASL $05
  $BD42: 07 06     SLO $06
  $BD44: 08        PHP
  $BD45: E3 08     ISB ($08,X)
  $BD47: 8E 0B FF  STX $ff0b
  $BD4A: 00        BRK
  $BD4B: 54 FD     NOP $fd,X
  $BD4D: 01 62     ORA ($62,X)
  $BD4F: FD 03 53  SBC $5303,X
  $BD52: FD FF E0  SBC $e0ff,X
  $BD55: 00        BRK
  $BD56: E2 80     NOP #$80
  $BD58: E3 05     ISB ($05,X)
  $BD5A: 81 28     STA ($28,X)
  $BD5C: 29 28     AND #$28
  $BD5E: 27 94     RLA $94
  $BD60: 26 FF     ROL $ff
  $BD62: E0 00     CPX #$00
  $BD64: E2 80     NOP #$80
  $BD66: E3 01     ISB ($01,X)
  $BD68: 81 15     STA ($15,X)
  $BD6A: 16 15     ASL $15,X
  $BD6C: 14 94     NOP $94,X
  $BD6E: 13 FF     SLO ($ff),Y
  $BD70: 00        BRK
  $BD71: 89 FD     NOP #$fd
  $BD73: 01 AF     ORA ($af,X)
  $BD75: FD 02 44  SBC $4402,X
  $BD78: E2 03     NOP #$03
  $BD7A: D5 FD     CMP $fd,X
  $BD7C: 04 44     NOP $44
  $BD7E: E2 05     NOP #$05
  $BD80: 44 E2     NOP $e2
  $BD82: 06 44     ASL $44
  $BD84: E2 07     NOP #$07
  $BD86: 44 E2     NOP $e2
  $BD88: FF E0 05  ISB $05e0,X
  $BD8B: E2 40     NOP #$40
  $BD8D: E3 0A     ISB ($0a,X)
  $BD8F: A6 E4     LDX $e4
  $BD91: FE 40 97  INC $9740,X
  $BD94: E3 0B     ISB ($0b,X)
  $BD96: 52        ???
  $BD97: E3 09     ISB ($09,X)
  $BD99: E0 0F     CPX #$0f
  $BD9B: 52        ???
  $BD9C: 52        ???
  $BD9D: 52        ???
  $BD9E: E3 0A     ISB ($0a,X)
  $BDA0: 52        ???
  $BDA1: 52        ???
  $BDA2: E3 0B     ISB ($0b,X)
  $BDA4: 52        ???
  $BDA5: 52        ???
  $BDA6: E3 0C     ISB ($0c,X)
  $BDA8: 98        TYA
  $BDA9: 52        ???
  $BDAA: E0 06     CPX #$06
  $BDAC: 96 52     STX $52,Y
  $BDAE: FF E0 05  ISB $05e0,X
  $BDB1: E2 40     NOP #$40
  $BDB3: E3 0B     ISB ($0b,X)
  $BDB5: 85 0C     STA $0c
  $BDB7: A6 E4     LDX $e4
  $BDB9: FE 40 97  INC $9740,X
  $BDBC: E3 0C     ISB ($0c,X)
  $BDBE: 52        ???
  $BDBF: E3 0A     ISB ($0a,X)
  $BDC1: E0 0F     CPX #$0f
  $BDC3: 52        ???
  $BDC4: 52        ???
  $BDC5: 52        ???
  $BDC6: E3 0B     ISB ($0b,X)
  $BDC8: 52        ???
  $BDC9: 52        ???
  $BDCA: E3 0C     ISB ($0c,X)
  $BDCC: 52        ???
  $BDCD: 52        ???
  $BDCE: 98        TYA
  $BDCF: 52        ???
  $BDD0: E0 06     CPX #$06
  $BDD2: 96 52     STX $52,Y
  $BDD4: FF E0 05  ISB $05e0,X
  $BDD7: E3 05     ISB ($05,X)
  $BDD9: A6 0C     LDX $0c
  $BDDB: 0C 0C E3  NOP $e30c
  $BDDE: 07 97     SLO $97
  $BDE0: 0C E3 08  NOP $08e3
  $BDE3: 0C E3 09  NOP $09e3
  $BDE6: 0C E3 0A  NOP $0ae3
  $BDE9: 94 0C     STY $0c,X
  $BDEB: E3 0B     ISB ($0b,X)
  $BDED: 0C E0 06  NOP $06e0
  $BDF0: A0 0C     LDY #$0c
  $BDF2: FF 00 44  ISB $4400,X
  $BDF5: E2 01     NOP #$01
  $BDF7: 00        BRK
  $BDF8: FE 02 44  INC $4402,X
  $BDFB: E2 03     NOP #$03
  $BDFD: 19 FE FF  ORA $fffe,Y
  $BE00: E0 00     CPX #$00
  $BE02: E2 80     NOP #$80
  $BE04: E3 00     ISB ($00,X)
  $BE06: EB 02     SBC #$02
  $BE08: 81 10     STA ($10,X)
  $BE0A: 0C 0B EC  NOP $ec0b
  $BE0D: 0C 0A 07  NOP $070a
  $BE10: 04 E0     NOP $e0
  $BE12: 0F E3 0A  SLO $0ae3
  $BE15: 96 00     STX $00,Y
  $BE17: 00        BRK
  $BE18: FF E0 00  ISB $00e0,X
  $BE1B: E3 00     ISB ($00,X)
  $BE1D: ED EB 02  SBC $02eb
  $BE20: 81 0C     STA ($0c,X)
  $BE22: 10 0B     BPL $be2f
  $BE24: EC 10 0A  CPX $0a10
  $BE27: 0B 0C     ANC #$0c
  $BE29: EF E0 06  ISB $06e0
  $BE2C: A5 0D     LDA $0d
  $BE2E: FF 00 39  ISB $3900,X
  $BE31: FE 01 47  INC $4701,X
  $BE34: FE 03 54  INC $5403,X
  $BE37: FE FF E0  INC $e0ff,X
  $BE3A: 05 E2     ORA $e2
  $BE3C: 00        BRK
  $BE3D: E3 08     ISB ($08,X)
  $BE3F: ED A4 02  SBC $02a4
  $BE42: E0 00     CPX #$00
  $BE44: 96 02     STX $02,Y
  $BE46: FF E0 05  ISB $05e0,X
  $BE49: E2 00     NOP #$00
  $BE4B: E3 08     ISB ($08,X)
  $BE4D: A4 00     LDY $00
  $BE4F: E0 00     CPX #$00
  $BE51: 96 00     STX $00,Y
  $BE53: FF E0 06  ISB $06e0,X
  $BE56: E3 02     ISB ($02,X)
  $BE58: EB 02     SBC #$02
  $BE5A: 81 07     STA ($07,X)
  $BE5C: 82 08     NOP #$08
  $BE5E: EC EB 03  CPX $03eb
  $BE61: 82 06     NOP #$06
  $BE63: 81 09     STA ($09,X)
  $BE65: EC EB 04  CPX $04eb
  $BE68: 81 05     STA ($05,X)
  $BE6A: 82 0A     NOP #$0a
  $BE6C: EC EB 05  CPX $05eb
  $BE6F: 81 04     STA ($04,X)
  $BE71: 0B EC     ANC #$ec
  $BE73: EB 06     SBC #$06
  $BE75: 03 0C     SLO ($0c,X)
  $BE77: EC EB 07  CPX $07eb
  $BE7A: 02        ???
  $BE7B: 0D EC EB  ORA $ebec
  $BE7E: 03 01     SLO ($01,X)
  $BE80: 0E 00 0F  ASL $0f00
  $BE83: 01 0E     ORA ($0e,X)
  $BE85: 02        ???
  $BE86: 0D EC E3  ORA $e3ec
  $BE89: 03 00     SLO ($00,X)
  $BE8B: 0F 01 0E  SLO $0e01
  $BE8E: 02        ???
  $BE8F: 0D E3 04  ORA $04e3
  $BE92: 01 0E     ORA ($0e,X)
  $BE94: 00        BRK
  $BE95: 0F 01 0E  SLO $0e01
  $BE98: E3 05     ISB ($05,X)
  $BE9A: 02        ???
  $BE9B: 0D 01 0E  ORA $0e01
  $BE9E: 00        BRK
  $BE9F: 0F E3 06  SLO $06e3
  $BEA2: 01 0E     ORA ($0e,X)
  $BEA4: 02        ???
  $BEA5: 0D 01 0E  ORA $0e01
  $BEA8: E3 07     ISB ($07,X)
  $BEAA: 00        BRK
  $BEAB: 0F 01 0E  SLO $0e01
  $BEAE: 02        ???
  $BEAF: 0D E3 08  ORA $08e3
  $BEB2: 01 0E     ORA ($0e,X)
  $BEB4: 00        BRK
  $BEB5: 0F 01 0E  SLO $0e01
  $BEB8: E3 09     ISB ($09,X)
  $BEBA: 02        ???
  $BEBB: 0D 01 0E  ORA $0e01
  $BEBE: 00        BRK
  $BEBF: 0F E3 0A  SLO $0ae3
  $BEC2: 01 0E     ORA ($0e,X)
  $BEC4: 02        ???
  $BEC5: 0D 01 0E  ORA $0e01
  $BEC8: E3 0B     ISB ($0b,X)
  $BECA: 00        BRK
  $BECB: 0F 01 0E  SLO $0e01
  $BECE: 02        ???
  $BECF: 0D E3 0C  ORA $0ce3
  $BED2: 01 0E     ORA ($0e,X)
  $BED4: 00        BRK
  $BED5: 0F 01 0E  SLO $0e01
  $BED8: E3 0D     ISB ($0d,X)
  $BEDA: 02        ???
  $BEDB: 0D 01 0E  ORA $0e01
  $BEDE: 00        BRK
  $BEDF: 0F E3 0E  SLO $0ee3
  $BEE2: 01 0E     ORA ($0e,X)
  $BEE4: 02        ???
  $BEE5: 0D 01 0E  ORA $0e01
  $BEE8: E3 0F     ISB ($0f,X)
  $BEEA: 00        BRK
  $BEEB: 0F 01 0E  SLO $0e01
  $BEEE: 02        ???
  $BEEF: 0D FF E0  ORA $e0ff
  $BEF2: 00        BRK
  $BEF3: E3 00     ISB ($00,X)
  $BEF5: 81 00     STA ($00,X)
  $BEF7: 82 01     NOP #$01
  $BEF9: 83 02     SAX ($02,X)
  $BEFB: 03 04     SLO ($04,X)
  $BEFD: 84 05     STY $05
  $BEFF: 06 85     ASL $85
  $BF01: 07 08     SLO $08
  $BF03: 09 0A     ORA #$0a
  $BF05: 96 0B     STX $0b,Y
  $BF07: FF 03 0B  ISB $0b03,X
  $BF0A: FF FF E3  ISB $e3ff,X
  $BF0D: 0B 00     ANC #$00
  $BF0F: 0F 01 0E  SLO $0e01
  $BF12: 02        ???
  $BF13: 0D E3 0C  ORA $0ce3
  $BF16: 01 0E     ORA ($0e,X)
  $BF18: 00        BRK
  $BF19: 0F 01 0E  SLO $0e01
  $BF1C: E3 0D     ISB ($0d,X)
  $BF1E: 02        ???
  $BF1F: 0D 01 0E  ORA $0e01
  $BF22: 00        BRK
  $BF23: 0F E3 0E  SLO $0ee3
  $BF26: 01 0E     ORA ($0e,X)
  $BF28: 02        ???
  $BF29: 0D 01 0E  ORA $0e01
  $BF2C: E3 0F     ISB ($0f,X)
  $BF2E: 00        BRK
  $BF2F: 0F 01 0E  SLO $0e01
  $BF32: 02        ???
  $BF33: 0D FF E0  ORA $e0ff
  $BF36: 00        BRK
  $BF37: E3 00     ISB ($00,X)
  $BF39: 81 00     STA ($00,X)
  $BF3B: 82 01     NOP #$01
  $BF3D: 83 02     SAX ($02,X)
  $BF3F: 03 04     SLO ($04,X)
  $BF41: 84 05     STY $05
  $BF43: 06 85     ASL $85
  $BF45: 07 08     SLO $08
  $BF47: 09 0A     ORA #$0a
  $BF49: 96 0B     STX $0b,Y
  $BF4B: FF 03 4F  ISB $4f03,X
  $BF4E: FF FF FF  ISB $ffff,X
  $BF51: 00        BRK
  $BF52: FF 00 FF  ISB $ff00,X
  $BF55: 00        BRK
  $BF56: FF 00 FF  ISB $ff00,X
  $BF59: 00        BRK
  $BF5A: FF 00 FF  ISB $ff00,X
  $BF5D: 00        BRK
  $BF5E: FF 00 00  ISB $0000,X
  $BF61: FF 00 FF  ISB $ff00,X
  $BF64: 00        BRK
  $BF65: FF 00 FF  ISB $ff00,X
  $BF68: 00        BRK
  $BF69: FF 00 FF  ISB $ff00,X
  $BF6C: 00        BRK
  $BF6D: FF 00 FF  ISB $ff00,X
  $BF70: FF 00 FF  ISB $ff00,X
  $BF73: 00        BRK
  $BF74: FF 00 FF  ISB $ff00,X
  $BF77: 00        BRK
  $BF78: FF 00 FF  ISB $ff00,X
  $BF7B: 00        BRK
  $BF7C: FF 00 FF  ISB $ff00,X
  $BF7F: 00        BRK
  $BF80: 00        BRK
  $BF81: FF 00 FF  ISB $ff00,X
  $BF84: 00        BRK
  $BF85: FF 00 FF  ISB $ff00,X
  $BF88: 00        BRK
  $BF89: FF 00 FF  ISB $ff00,X
  $BF8C: 00        BRK
  $BF8D: FF 00 FF  ISB $ff00,X
  $BF90: FF 00 FF  ISB $ff00,X
  $BF93: 00        BRK
  $BF94: FF 00 FF  ISB $ff00,X
  $BF97: 00        BRK
  $BF98: FF 00 FF  ISB $ff00,X
  $BF9B: 00        BRK
  $BF9C: FF 00 FF  ISB $ff00,X
  $BF9F: 00        BRK
  $BFA0: 00        BRK
  $BFA1: FF 00 FF  ISB $ff00,X
  $BFA4: 00        BRK
  $BFA5: FF 00 FF  ISB $ff00,X
  $BFA8: 00        BRK
  $BFA9: FF 00 FF  ISB $ff00,X
  $BFAC: 00        BRK
  $BFAD: FF 00 FF  ISB $ff00,X
  $BFB0: FF 00 FF  ISB $ff00,X
  $BFB3: 00        BRK
  $BFB4: FF 00 FF  ISB $ff00,X
  $BFB7: 00        BRK
  $BFB8: FF 00 FF  ISB $ff00,X
  $BFBB: 00        BRK
  $BFBC: FF 00 FF  ISB $ff00,X
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