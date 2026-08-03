; ──────────────────────────────────────────────────
; 天使之翼 (Captain Tsubasa) NES ROM 反汇编
; ──────────────────────────────────────────────────
; PRG-ROM: 128KB (8 × 16KB banks)
; CHR-ROM: 128KB (16 × 8KB banks)
; Mapper: 1 (MMC1)
; Mirroring: Horizontal
; Four-screen: No
; Battery RAM: No
;
; 中断向量:
;   RESET: $FFC0
;   NMI:   $8002
;   IRQ:   $8002
;
; 反汇编使用线性扫描（非递归下降），不区分 code/data。
; 所有字节按 6502 操作码解析，数据区域会产生无意义的指令。
; ──────────────────────────────────────────────────
;

; ============================================================
; PRG Bank $00
; CPU Address Range: $8000 - $BFFF
; ROM Offset: $0
; ============================================================

  $8000: 9B 80 4C  TAS $4c80,Y
  $8003: E0 80     CPX #$80
  $8005: 4C 14 83  JMP $8314
  $8008: 4C 1F 83  JMP $831f
  $800B: 4C F5 82  JMP $82f5
  $800E: 4C EB 82  JMP $82eb
  $8011: 4C FF 82  JMP $82ff
  $8014: 4C 0A 83  JMP $830a
  $8017: 4C 4D 83  JMP $834d
  $801A: 4C 64 83  JMP $8364
  $801D: 4C 71 83  JMP $8371
  $8020: 4C 8F 83  JMP $838f
  $8023: 4C 71 84  JMP $8471
  $8026: 4C FD 83  JMP $83fd
  $8029: 4C B2 AD  JMP $adb2
  $802C: 4C 73 83  JMP $8373
  $802F: 4C A3 84  JMP $84a3
  $8032: 4C 2F 81  JMP $812f
  $8035: 4C 18 84  JMP $8418
  $8038: 4C 1F 84  JMP $841f
  $803B: 4C 68 84  JMP $8468
  $803E: 4C E0 83  JMP $83e0
  $8041: 4C 28 85  JMP $8528
  $8044: 4C F9 84  JMP $84f9
  $8047: 4C 6F AB  JMP $ab6f
  $804A: 4C 40 B2  JMP $b240
  $804D: 4C 02 B4  JMP $b402
  $8050: 4C 7C AB  JMP $ab7c
  $8053: 4C 66 AD  JMP $ad66
  $8056: 4C 9A AD  JMP $ad9a
  $8059: 4C EF 84  JMP $84ef
  $805C: 4C 94 AB  JMP $ab94
  $805F: 4C A8 B4  JMP $b4a8
  $8062: 4C B1 B4  JMP $b4b1
  $8065: 4C 7C 82  JMP $827c
  $8068: 4C 81 82  JMP $8281
  $806B: 4C 86 82  JMP $8286
  $806E: 4C 92 85  JMP $8592
  $8071: 4C 8B 82  JMP $828b
  $8074: 4C 63 85  JMP $8563
  $8077: 4C CC A4  JMP $a4cc
  $807A: 4C EE 83  JMP $83ee
  $807D: 4C 95 82  JMP $8295
  $8080: 4C 34 B9  JMP $b934
  $8083: 4C E3 A3  JMP $a3e3
  $8086: 4C BB 8B  JMP $8bbb
  $8089: 4C F9 88  JMP $88f9
  $808C: 4C D0 86  JMP $86d0
  $808F: 4C EC AD  JMP $adec
  $8092: 4C 58 B4  JMP $b458
  $8095: 4C 0F 91  JMP $910f
  $8098: 4C 3C A5  JMP $a53c
  $809B: 78        SEI
  $809C: D8        CLD
  $809D: AD 02 20  LDA $2002
  $80A0: 10 FB     BPL $809d
  $80A2: AD 02 20  LDA $2002
  $80A5: 10 FB     BPL $80a2
  $80A7: A2 FF     LDX #$ff
  $80A9: 9A        TXS
  $80AA: A9 06     LDA #$06
  $80AC: 8D 01 20  STA $2001
  $80AF: A9 00     LDA #$00
  $80B1: 85 00     STA $00
  $80B3: 85 01     STA $01
  $80B5: A8        TAY
  $80B6: 91 00     STA ($00),Y
  $80B8: C8        INY
  $80B9: D0 FB     BNE $80b6
  $80BB: E6 01     INC $01
  $80BD: A6 01     LDX $01
  $80BF: E0 08     CPX #$08
  $80C1: D0 F3     BNE $80b6
  $80C3: A9 00     LDA #$00
  $80C5: 85 16     STA $16
  $80C7: 85 17     STA $17
  $80C9: A9 10     LDA #$10
  $80CB: 85 19     STA $19
  $80CD: A9 06     LDA #$06
  $80CF: 85 18     STA $18
  $80D1: 20 CC 82  JSR $82cc
  $80D4: 20 71 83  JSR $8371
  $80D7: 20 8F 83  JSR $838f
  $80DA: 20 F5 82  JSR $82f5
  $80DD: 4C EE 81  JMP $81ee
  $80E0: 48        PHA
  $80E1: 20 EB 82  JSR $82eb
  $80E4: A5 18     LDA $18
  $80E6: 8D 01 20  STA $2001
  $80E9: 8A        TXA
  $80EA: 48        PHA
  $80EB: 98        TYA
  $80EC: 48        PHA
  $80ED: A9 00     LDA #$00
  $80EF: 8D 03 20  STA $2003
  $80F2: A9 02     LDA #$02
  $80F4: 8D 14 40  STA $4014
  $80F7: 20 2F 81  JSR $812f
  $80FA: 20 B9 81  JSR $81b9
  $80FD: 20 AD 82  JSR $82ad
  $8100: A5 93     LDA $93
  $8102: D0 17     BNE $811b
  $8104: A5 1A     LDA $1a
  $8106: 20 CF 83  JSR $83cf
  $8109: A5 1B     LDA $1b
  $810B: 20 D7 83  JSR $83d7
  $810E: A9 01     LDA #$01
  $8110: 20 C7 83  JSR $83c7
  $8113: 20 00 DB  JSR $db00
  $8116: A5 1C     LDA $1c
  $8118: 20 C7 83  JSR $83c7
  $811B: A9 00     LDA #$00
  $811D: 8D FA 05  STA $05fa
  $8120: EE 00 03  INC $0300
  $8123: 68        PLA
  $8124: A8        TAY
  $8125: 68        PLA
  $8126: AA        TAX
  $8127: 20 F5 82  JSR $82f5
  $812A: AD 02 20  LDA $2002
  $812D: 68        PLA
  $812E: 40        RTI
  $812F: AE 05 03  LDX $0305
  $8132: F0 20     BEQ $8154
  $8134: AE 05 03  LDX $0305
  $8137: CA        DEX
  $8138: 30 16     BMI $8150
  $813A: 8E 05 03  STX $0305
  $813D: 8A        TXA
  $813E: 0A        ASL A
  $813F: AA        TAX
  $8140: BD 06 03  LDA $0306,X
  $8143: 85 12     STA $12
  $8145: BD 07 03  LDA $0307,X
  $8148: 85 13     STA $13
  $814A: 20 8D 81  JSR $818d
  $814D: 4C 34 81  JMP $8134
  $8150: 20 3A 83  JSR $833a
  $8153: 60        RTS
  $8154: AD 39 03  LDA $0339
  $8157: F0 30     BEQ $8189
  $8159: A0 00     LDY #$00
  $815B: AE 02 20  LDX $2002
  $815E: B9 3A 03  LDA $033a,Y
  $8161: F0 23     BEQ $8186
  $8163: AA        TAX
  $8164: A9 00     LDA #$00
  $8166: 99 3A 03  STA $033a,Y
  $8169: C8        INY
  $816A: B9 3A 03  LDA $033a,Y
  $816D: 48        PHA
  $816E: C8        INY
  $816F: B9 3A 03  LDA $033a,Y
  $8172: 8D 06 20  STA $2006
  $8175: 68        PLA
  $8176: 8D 06 20  STA $2006
  $8179: C8        INY
  $817A: B9 3A 03  LDA $033a,Y
  $817D: 8D 07 20  STA $2007
  $8180: C8        INY
  $8181: CA        DEX
  $8182: D0 F6     BNE $817a
  $8184: F0 D5     BEQ $815b
  $8186: 8D 39 03  STA $0339
  $8189: 20 3A 83  JSR $833a
  $818C: 60        RTS
  $818D: A0 00     LDY #$00
  $818F: AE 02 20  LDX $2002
  $8192: B1 12     LDA ($12),Y
  $8194: AA        TAX
  $8195: C8        INY
  $8196: B1 12     LDA ($12),Y
  $8198: 48        PHA
  $8199: C8        INY
  $819A: B1 12     LDA ($12),Y
  $819C: 8D 06 20  STA $2006
  $819F: 68        PLA
  $81A0: 8D 06 20  STA $2006
  $81A3: C8        INY
  $81A4: B1 12     LDA ($12),Y
  $81A6: 8D 07 20  STA $2007
  $81A9: C8        INY
  $81AA: D0 02     BNE $81ae
  $81AC: E6 13     INC $13
  $81AE: CA        DEX
  $81AF: D0 F3     BNE $81a4
  $81B1: 20 26 83  JSR $8326
  $81B4: B1 12     LDA ($12),Y
  $81B6: D0 D7     BNE $818f
  $81B8: 60        RTS
  $81B9: AD 01 03  LDA $0301
  $81BC: 48        PHA
  $81BD: AD 02 03  LDA $0302
  $81C0: 48        PHA
  $81C1: A2 01     LDX #$01
  $81C3: 8E 16 40  STX $4016
  $81C6: CA        DEX
  $81C7: 8E 16 40  STX $4016
  $81CA: 20 DA 81  JSR $81da
  $81CD: E8        INX
  $81CE: 20 DA 81  JSR $81da
  $81D1: 68        PLA
  $81D2: 8D 04 03  STA $0304
  $81D5: 68        PLA
  $81D6: 8D 03 03  STA $0303
  $81D9: 60        RTS
  $81DA: A0 08     LDY #$08
  $81DC: BD 16 40  LDA $4016,X
  $81DF: 9D 03 03  STA $0303,X
  $81E2: 4A        LSR A
  $81E3: 1D 03 03  ORA $0303,X
  $81E6: 4A        LSR A
  $81E7: 3E 01 03  ROL $0301,X
  $81EA: 88        DEY
  $81EB: D0 EF     BNE $81dc
  $81ED: 60        RTS
  $81EE: 20 14 83  JSR $8314
  $81F1: 20 F7 81  JSR $81f7
  $81F4: 4C EE 81  JMP $81ee
  $81F7: AD CA 03  LDA $03ca
  $81FA: 20 4D 83  JSR $834d
  $81FD: A1 82     LDA ($82,X)
  $81FF: A7 82     LAX $82
  $8201: 76 82     ROR $82,X
  $8203: CD 85 B9  CMP $b985
  $8206: 87 0D     SAX $0d
  $8208: 82 64     NOP #$64
  $820A: 82 70     NOP #$70
  $820C: 82 A9     NOP #$a9
  $820E: 00        BRK
  $820F: 8D E3 03  STA $03e3
  $8212: 8D E4 03  STA $03e4
  $8215: 20 1E 86  JSR $861e
  $8218: AE E5 03  LDX $03e5
  $821B: EE E5 03  INC $03e5
  $821E: CA        DEX
  $821F: 30 38     BMI $8259
  $8221: CA        DEX
  $8222: 10 1E     BPL $8242
  $8224: AD E0 05  LDA $05e0
  $8227: CD E1 05  CMP $05e1
  $822A: D0 30     BNE $825c
  $822C: AD 4F 06  LDA $064f
  $822F: C9 07     CMP #$07
  $8231: B0 07     BCS $823a
  $8233: A9 04     LDA #$04
  $8235: 8D E5 03  STA $03e5
  $8238: D0 26     BNE $8260
  $823A: F0 1D     BEQ $8259
  $823C: C9 0D     CMP #$0d
  $823E: B0 19     BCS $8259
  $8240: 90 1A     BCC $825c
  $8242: CA        DEX
  $8243: 30 1B     BMI $8260
  $8245: CA        DEX
  $8246: 10 14     BPL $825c
  $8248: AD E0 05  LDA $05e0
  $824B: CD E1 05  CMP $05e1
  $824E: D0 0C     BNE $825c
  $8250: AD 4F 06  LDA $064f
  $8253: C9 07     CMP #$07
  $8255: F0 05     BEQ $825c
  $8257: D0 07     BNE $8260
  $8259: EE CA 03  INC $03ca
  $825C: EE CA 03  INC $03ca
  $825F: 60        RTS
  $8260: CE CA 03  DEC $03ca
  $8263: 60        RTS
  $8264: A9 63     LDA #$63
  $8266: 20 D2 84  JSR $84d2
  $8269: 60        RTS
  $826A: A9 12     LDA #$12
  $826C: 20 D2 84  JSR $84d2
  $826F: 60        RTS
  $8270: A9 61     LDA #$61
  $8272: 20 D2 84  JSR $84d2
  $8275: 60        RTS
  $8276: A9 60     LDA #$60
  $8278: 20 D2 84  JSR $84d2
  $827B: 60        RTS
  $827C: A2 12     LDX #$12
  $827E: 4C 95 82  JMP $8295
  $8281: A2 13     LDX #$13
  $8283: 4C 95 82  JMP $8295
  $8286: A2 14     LDX #$14
  $8288: 4C 95 82  JMP $8295
  $828B: 85 3A     STA $3a
  $828D: A2 62     LDX #$62
  $828F: 20 95 82  JSR $8295
  $8292: A5 3A     LDA $3a
  $8294: 60        RTS
  $8295: A5 1C     LDA $1c
  $8297: 48        PHA
  $8298: 8A        TXA
  $8299: 20 D2 84  JSR $84d2
  $829C: 68        PLA
  $829D: 20 C5 83  JSR $83c5
  $82A0: 60        RTS
  $82A1: A9 10     LDA #$10
  $82A3: 20 D2 84  JSR $84d2
  $82A6: 60        RTS
  $82A7: A9 5D     LDA #$5d
  $82A9: 20 D2 84  JSR $84d2
  $82AC: 60        RTS
  $82AD: EE BA 05  INC $05ba
  $82B0: AE BA 05  LDX $05ba
  $82B3: BD 00 03  LDA $0300,X
  $82B6: 38        SEC
  $82B7: 6D BB 05  ADC $05bb
  $82BA: 8D BB 05  STA $05bb
  $82BD: AA        TAX
  $82BE: 18        CLC
  $82BF: FD 00 03  SBC $0300,X
  $82C2: 29 07     AND #$07
  $82C4: A8        TAY
  $82C5: 6E BB 05  ROR $05bb
  $82C8: 88        DEY
  $82C9: 10 FA     BPL $82c5
  $82CB: 60        RTS
  $82CC: A9 20     LDA #$20
  $82CE: 8D 15 03  STA $0315
  $82D1: A9 00     LDA #$00
  $82D3: 8D 16 03  STA $0316
  $82D6: A9 3F     LDA #$3f
  $82D8: 8D 17 03  STA $0317
  $82DB: A9 20     LDA #$20
  $82DD: 8D 9A 03  STA $039a
  $82E0: A9 C0     LDA #$c0
  $82E2: 8D 9B 03  STA $039b
  $82E5: A9 23     LDA #$23
  $82E7: 8D 9C 03  STA $039c
  $82EA: 60        RTS
  $82EB: A5 19     LDA $19
  $82ED: 29 7F     AND #$7f
  $82EF: 85 19     STA $19
  $82F1: 8D 00 20  STA $2000
  $82F4: 60        RTS
  $82F5: A5 19     LDA $19
  $82F7: 09 80     ORA #$80
  $82F9: 85 19     STA $19
  $82FB: 8D 00 20  STA $2000
  $82FE: 60        RTS
  $82FF: 20 EB 82  JSR $82eb
  $8302: A9 06     LDA #$06
  $8304: 85 18     STA $18
  $8306: 8D 01 20  STA $2001
  $8309: 60        RTS
  $830A: A5 18     LDA $18
  $830C: 09 18     ORA #$18
  $830E: 85 18     STA $18
  $8310: 20 F5 82  JSR $82f5
  $8313: 60        RTS
  $8314: A9 00     LDA #$00
  $8316: 8D 00 03  STA $0300
  $8319: AD 00 03  LDA $0300
  $831C: F0 FB     BEQ $8319
  $831E: 60        RTS
  $831F: 20 14 83  JSR $8314
  $8322: CA        DEX
  $8323: D0 FA     BNE $831f
  $8325: 60        RTS
  $8326: AD 02 20  LDA $2002
  $8329: A9 3F     LDA #$3f
  $832B: 8D 06 20  STA $2006
  $832E: A9 00     LDA #$00
  $8330: 8D 06 20  STA $2006
  $8333: 8D 06 20  STA $2006
  $8336: 8D 06 20  STA $2006
  $8339: 60        RTS
  $833A: A5 19     LDA $19
  $833C: 8D 00 20  STA $2000
  $833F: AD 02 20  LDA $2002
  $8342: A5 16     LDA $16
  $8344: 8D 05 20  STA $2005
  $8347: A5 17     LDA $17
  $8349: 8D 05 20  STA $2005
  $834C: 60        RTS
  $834D: 0A        ASL A
  $834E: A8        TAY
  $834F: 68        PLA
  $8350: 85 14     STA $14
  $8352: 68        PLA
  $8353: 85 15     STA $15
  $8355: C8        INY
  $8356: B1 14     LDA ($14),Y
  $8358: 48        PHA
  $8359: C8        INY
  $835A: B1 14     LDA ($14),Y
  $835C: 85 15     STA $15
  $835E: 68        PLA
  $835F: 85 14     STA $14
  $8361: 6C 14 00  JMP ($0014)
  $8364: 8A        TXA
  $8365: 49 FF     EOR #$ff
  $8367: AA        TAX
  $8368: 98        TYA
  $8369: 49 FF     EOR #$ff
  $836B: A8        TAY
  $836C: E8        INX
  $836D: D0 01     BNE $8370
  $836F: C8        INY
  $8370: 60        RTS
  $8371: A9 00     LDA #$00
  $8373: 48        PHA
  $8374: 0A        ASL A
  $8375: 0A        ASL A
  $8376: A8        TAY
  $8377: 68        PLA
  $8378: 38        SEC
  $8379: E9 40     SBC #$40
  $837B: B0 11     BCS $838e
  $837D: 49 FF     EOR #$ff
  $837F: 29 3F     AND #$3f
  $8381: AA        TAX
  $8382: A9 F8     LDA #$f8
  $8384: 99 00 02  STA $0200,Y
  $8387: C8        INY
  $8388: C8        INY
  $8389: C8        INY
  $838A: C8        INY
  $838B: CA        DEX
  $838C: 10 F6     BPL $8384
  $838E: 60        RTS
  $838F: 20 FF 82  JSR $82ff
  $8392: A9 20     LDA #$20
  $8394: 20 9E 83  JSR $839e
  $8397: A9 24     LDA #$24
  $8399: 20 9E 83  JSR $839e
  $839C: A9 28     LDA #$28
  $839E: AE 02 20  LDX $2002
  $83A1: 8D 06 20  STA $2006
  $83A4: A9 00     LDA #$00
  $83A6: 8D 06 20  STA $2006
  $83A9: A2 C0     LDX #$c0
  $83AB: A0 04     LDY #$04
  $83AD: A9 00     LDA #$00
  $83AF: 8D 07 20  STA $2007
  $83B2: CA        DEX
  $83B3: D0 FA     BNE $83af
  $83B5: 88        DEY
  $83B6: D0 F7     BNE $83af
  $83B8: 8A        TXA
  $83B9: 8D 07 20  STA $2007
  $83BC: E8        INX
  $83BD: E0 40     CPX #$40
  $83BF: D0 F8     BNE $83b9
  $83C1: 20 3A 83  JSR $833a
  $83C4: 60        RTS
  $83C5: 85 1C     STA $1c
  $83C7: 09 60     ORA #$60
  $83C9: 20 FD 83  JSR $83fd
  $83CC: 60        RTS
  $83CD: 85 1A     STA $1a
  $83CF: 09 40     ORA #$40
  $83D1: 20 FD 83  JSR $83fd
  $83D4: 60        RTS
  $83D5: 85 1B     STA $1b
  $83D7: 09 20     ORA #$20
  $83D9: 20 FD 83  JSR $83fd
  $83DC: 60        RTS
  $83DD: A2 01     LDX #$01
  $83DF: 2C A2 00  BIT $00a2
  $83E2: 3D 01 03  AND $0301,X
  $83E5: F0 06     BEQ $83ed
  $83E7: 5D 03 03  EOR $0303,X
  $83EA: 3D 01 03  AND $0301,X
  $83ED: 60        RTS
  $83EE: 0A        ASL A
  $83EF: AA        TAX
  $83F0: BD 00 C0  LDA $c000,X
  $83F3: 85 86     STA $86
  $83F5: BD 01 C0  LDA $c001,X
  $83F8: 85 87     STA $87
  $83FA: B1 86     LDA ($86),Y
  $83FC: 60        RTS
  $83FD: A6 93     LDX $93
  $83FF: D0 16     BNE $8417
  $8401: A2 05     LDX #$05
  $8403: 86 93     STX $93
  $8405: AA        TAX
  $8406: 29 60     AND #$60
  $8408: 09 9F     ORA #$9f
  $840A: 85 9F     STA $9f
  $840C: A0 FF     LDY #$ff
  $840E: 8A        TXA
  $840F: 91 9E     STA ($9e),Y
  $8411: EA        NOP
  $8412: 4A        LSR A
  $8413: C6 93     DEC $93
  $8415: D0 F8     BNE $840f
  $8417: 60        RTS
  $8418: 20 1F 84  JSR $841f
  $841B: 20 68 84  JSR $8468
  $841E: 60        RTS
  $841F: 48        PHA
  $8420: A2 00     LDX #$00
  $8422: 86 24     STX $24
  $8424: 0A        ASL A
  $8425: 0A        ASL A
  $8426: 26 24     ROL $24
  $8428: 0A        ASL A
  $8429: 26 24     ROL $24
  $842B: 85 23     STA $23
  $842D: 0A        ASL A
  $842E: 18        CLC
  $842F: 65 23     ADC $23
  $8431: 90 02     BCC $8435
  $8433: E6 24     INC $24
  $8435: 85 23     STA $23
  $8437: 68        PLA
  $8438: 18        CLC
  $8439: 65 23     ADC $23
  $843B: 90 02     BCC $843f
  $843D: E6 24     INC $24
  $843F: 18        CLC
  $8440: 69 6F     ADC #$6f
  $8442: 85 23     STA $23
  $8444: A5 24     LDA $24
  $8446: 69 B9     ADC #$b9
  $8448: 85 24     STA $24
  $844A: A0 00     LDY #$00
  $844C: B1 23     LDA ($23),Y
  $844E: 48        PHA
  $844F: A2 00     LDX #$00
  $8451: C8        INY
  $8452: 8A        TXA
  $8453: 29 03     AND #$03
  $8455: F0 05     BEQ $845c
  $8457: B1 23     LDA ($23),Y
  $8459: C8        INY
  $845A: D0 02     BNE $845e
  $845C: 68        PLA
  $845D: 48        PHA
  $845E: 9D 18 03  STA $0318,X
  $8461: E8        INX
  $8462: E0 20     CPX #$20
  $8464: D0 EC     BNE $8452
  $8466: 68        PLA
  $8467: 60        RTS
  $8468: 20 71 84  JSR $8471
  $846B: 15 03     ORA $03,X
  $846D: 20 14 83  JSR $8314
  $8470: 60        RTS
  $8471: BA        TSX
  $8472: BD 01 01  LDA $0101,X
  $8475: 85 10     STA $10
  $8477: 48        PHA
  $8478: BD 02 01  LDA $0102,X
  $847B: 85 11     STA $11
  $847D: 68        PLA
  $847E: 18        CLC
  $847F: 69 02     ADC #$02
  $8481: 9D 01 01  STA $0101,X
  $8484: 90 03     BCC $8489
  $8486: FE 02 01  INC $0102,X
  $8489: 98        TYA
  $848A: 48        PHA
  $848B: AD 05 03  LDA $0305
  $848E: 0A        ASL A
  $848F: AA        TAX
  $8490: A0 01     LDY #$01
  $8492: B1 10     LDA ($10),Y
  $8494: 9D 06 03  STA $0306,X
  $8497: C8        INY
  $8498: B1 10     LDA ($10),Y
  $849A: 9D 07 03  STA $0307,X
  $849D: EE 05 03  INC $0305
  $84A0: 68        PLA
  $84A1: A8        TAY
  $84A2: 60        RTS
  $84A3: 18        CLC
  $84A4: 69 03     ADC #$03
  $84A6: 6D 39 03  ADC $0339
  $84A9: 8D 39 03  STA $0339
  $84AC: AA        TAX
  $84AD: A9 00     LDA #$00
  $84AF: 9D 3A 03  STA $033a,X
  $84B2: 60        RTS
  $84B3: 18        CLC
  $84B4: 69 40     ADC #$40
  $84B6: AA        TAX
  $84B7: 08        PHP
  $84B8: 29 7F     AND #$7f
  $84BA: C9 40     CMP #$40
  $84BC: 90 04     BCC $84c2
  $84BE: 49 FF     EOR #$ff
  $84C0: 29 3F     AND #$3f
  $84C2: 0A        ASL A
  $84C3: AA        TAX
  $84C4: BD F5 BB  LDA $bbf5,X
  $84C7: BC F6 BB  LDY $bbf6,X
  $84CA: AA        TAX
  $84CB: 28        PLP
  $84CC: 10 03     BPL $84d1
  $84CE: 20 64 83  JSR $8364
  $84D1: 60        RTS
  $84D2: 48        PHA
  $84D3: 4A        LSR A
  $84D4: 4A        LSR A
  $84D5: 4A        LSR A
  $84D6: 4A        LSR A
  $84D7: 20 C5 83  JSR $83c5
  $84DA: 68        PLA
  $84DB: 29 0F     AND #$0f
  $84DD: 8D FC 05  STA $05fc
  $84E0: 0A        ASL A
  $84E1: 6D FC 05  ADC $05fc
  $84E4: 8D FB 05  STA $05fb
  $84E7: A9 C0     LDA #$c0
  $84E9: 8D FC 05  STA $05fc
  $84EC: 6C FB 05  JMP ($05fb)
  $84EF: AE FA 05  LDX $05fa
  $84F2: 9D F9 07  STA $07f9,X
  $84F5: EE FA 05  INC $05fa
  $84F8: 60        RTS
  $84F9: 8A        TXA
  $84FA: 48        PHA
  $84FB: A9 00     LDA #$00
  $84FD: 85 53     STA $53
  $84FF: 85 54     STA $54
  $8501: 85 55     STA $55
  $8503: 85 56     STA $56
  $8505: A2 10     LDX #$10
  $8507: 66 50     ROR $50
  $8509: 66 4F     ROR $4f
  $850B: 90 0D     BCC $851a
  $850D: 18        CLC
  $850E: A5 55     LDA $55
  $8510: 65 51     ADC $51
  $8512: 85 55     STA $55
  $8514: A5 56     LDA $56
  $8516: 65 52     ADC $52
  $8518: 85 56     STA $56
  $851A: 66 56     ROR $56
  $851C: 66 55     ROR $55
  $851E: 66 54     ROR $54
  $8520: 66 53     ROR $53
  $8522: CA        DEX
  $8523: D0 E2     BNE $8507
  $8525: 68        PLA
  $8526: AA        TAX
  $8527: 60        RTS
  $8528: 8A        TXA
  $8529: 48        PHA
  $852A: A9 00     LDA #$00
  $852C: 85 5A     STA $5a
  $852E: 85 5B     STA $5b
  $8530: A2 10     LDX #$10
  $8532: 26 57     ROL $57
  $8534: 26 58     ROL $58
  $8536: 26 5A     ROL $5a
  $8538: 26 5B     ROL $5b
  $853A: B0 10     BCS $854c
  $853C: A5 5B     LDA $5b
  $853E: C5 5C     CMP $5c
  $8540: F0 04     BEQ $8546
  $8542: 90 15     BCC $8559
  $8544: B0 06     BCS $854c
  $8546: A5 5A     LDA $5a
  $8548: C5 59     CMP $59
  $854A: 90 0D     BCC $8559
  $854C: A5 5A     LDA $5a
  $854E: E5 59     SBC $59
  $8550: 85 5A     STA $5a
  $8552: A5 5B     LDA $5b
  $8554: E5 5C     SBC $5c
  $8556: 85 5B     STA $5b
  $8558: 38        SEC
  $8559: 26 57     ROL $57
  $855B: 26 58     ROL $58
  $855D: CA        DEX
  $855E: D0 D6     BNE $8536
  $8560: 68        PLA
  $8561: AA        TAX
  $8562: 60        RTS
  $8563: A9 00     LDA #$00
  $8565: 85 00     STA $00
  $8567: A5 00     LDA $00
  $8569: 20 6F AB  JSR $ab6f
  $856C: A0 03     LDY #$03
  $856E: B1 5D     LDA ($5d),Y
  $8570: 20 8B 82  JSR $828b
  $8573: A0 0E     LDY #$0e
  $8575: 91 5D     STA ($5d),Y
  $8577: A2 00     LDX #$00
  $8579: A5 00     LDA $00
  $857B: 20 7C AB  JSR $ab7c
  $857E: A0 0F     LDY #$0f
  $8580: A5 6E     LDA $6e
  $8582: 91 5D     STA ($5d),Y
  $8584: C8        INY
  $8585: A5 6F     LDA $6f
  $8587: 91 5D     STA ($5d),Y
  $8589: E6 00     INC $00
  $858B: A5 00     LDA $00
  $858D: C9 0B     CMP #$0b
  $858F: D0 D6     BNE $8567
  $8591: 60        RTS
  $8592: A9 00     LDA #$00
  $8594: 85 00     STA $00
  $8596: A5 00     LDA $00
  $8598: 20 6F AB  JSR $ab6f
  $859B: A6 00     LDX $00
  $859D: BD B7 85  LDA $85b7,X
  $85A0: AC DE 06  LDY $06de
  $85A3: F0 03     BEQ $85a8
  $85A5: BD C2 85  LDA $85c2,X
  $85A8: A0 03     LDY #$03
  $85AA: 91 5D     STA ($5d),Y
  $85AC: E6 00     INC $00
  $85AE: A5 00     LDA $00
  $85B0: C9 0B     CMP #$0b
  $85B2: D0 E2     BNE $8596
  $85B4: 4C 63 85  JMP $8563
  $85B7: 07 0A     SLO $0a
  $85B9: 0B 05     ANC #$05
  $85BB: 06 08     ASL $08
  $85BD: 03 04     SLO ($04,X)
  $85BF: 02        ???
  $85C0: 01 09     ORA ($09,X)
  $85C2: 16 11     ASL $11,X
  $85C4: 06 0E     ASL $0e
  $85C6: 13 10     SLO ($10),Y
  $85C8: 1B 12 14  SLO $1412,Y
  $85CB: 01 0F     ORA ($0f,X)
  $85CD: A2 00     LDX #$00
  $85CF: 8A        TXA
  $85D0: 9D 00 06  STA $0600,X
  $85D3: E8        INX
  $85D4: E0 38     CPX #$38
  $85D6: D0 F8     BNE $85d0
  $85D8: A2 00     LDX #$00
  $85DA: 8A        TXA
  $85DB: 9D 91 06  STA $0691,X
  $85DE: E8        INX
  $85DF: E0 1E     CPX #$1e
  $85E1: D0 F8     BNE $85db
  $85E3: A9 00     LDA #$00
  $85E5: 8D E0 05  STA $05e0
  $85E8: 8D E1 05  STA $05e1
  $85EB: 8D 9B 05  STA $059b
  $85EE: 8D 9C 05  STA $059c
  $85F1: 8D E5 03  STA $03e5
  $85F4: 8D 3B 00  STA $003b
  $85F7: 8D 35 07  STA $0735
  $85FA: 8D DE 03  STA $03de
  $85FD: 8D 0E 03  STA $030e
  $8600: 20 1E 86  JSR $861e
  $8603: A9 5A     LDA #$5a
  $8605: 20 D2 84  JSR $84d2
  $8608: 20 8F 83  JSR $838f
  $860B: 20 71 83  JSR $8371
  $860E: 20 0A 83  JSR $830a
  $8611: 20 14 83  JSR $8314
  $8614: A5 19     LDA $19
  $8616: 29 FC     AND #$fc
  $8618: 85 19     STA $19
  $861A: EE CA 03  INC $03ca
  $861D: 60        RTS
  $861E: A9 00     LDA #$00
  $8620: 8D EF 05  STA $05ef
  $8623: 8D BE 03  STA $03be
  $8626: 8D 29 00  STA $0029
  $8629: 8D 43 00  STA $0043
  $862C: 8D DF 03  STA $03df
  $862F: 8D 41 00  STA $0041
  $8632: 8D 00 06  STA $0600
  $8635: 8D 1B 06  STA $061b
  $8638: 8D 1F 06  STA $061f
  $863B: 8D 7C 00  STA $007c
  $863E: 8D CC 03  STA $03cc
  $8641: 8D D5 05  STA $05d5
  $8644: 8D E6 03  STA $03e6
  $8647: 8D BC 05  STA $05bc
  $864A: 8D 96 05  STA $0596
  $864D: 8D E8 05  STA $05e8
  $8650: 8D F3 03  STA $03f3
  $8653: 8D 9E 05  STA $059e
  $8656: 8D A1 05  STA $05a1
  $8659: 8D D8 05  STA $05d8
  $865C: 8D 97 06  STA $0697
  $865F: 8D DE 03  STA $03de
  $8662: 8D 9D 05  STA $059d
  $8665: 20 EF 84  JSR $84ef
  $8668: 20 1C AA  JSR $aa1c
  $866B: A9 00     LDA #$00
  $866D: 4C F4 86  JMP $86f4
  $8670: AD 97 06  LDA $0697
  $8673: D0 2A     BNE $869f
  $8675: AD E3 05  LDA $05e3
  $8678: D0 0B     BNE $8685
  $867A: A9 12     LDA #$12
  $867C: AE DE 06  LDX $06de
  $867F: F0 1B     BEQ $869c
  $8681: A9 0F     LDA #$0f
  $8683: D0 17     BNE $869c
  $8685: AD DC 06  LDA $06dc
  $8688: A2 14     LDX #$14
  $868A: C9 09     CMP #$09
  $868C: F0 0D     BEQ $869b
  $868E: E8        INX
  $868F: C9 15     CMP #$15
  $8691: F0 08     BEQ $869b
  $8693: A2 18     LDX #$18
  $8695: AD DE 06  LDA $06de
  $8698: D0 01     BNE $869b
  $869A: E8        INX
  $869B: 8A        TXA
  $869C: 20 EF 84  JSR $84ef
  $869F: 60        RTS
  $86A0: A0 0F     LDY #$0f
  $86A2: B1 5D     LDA ($5d),Y
  $86A4: C8        INY
  $86A5: 11 5D     ORA ($5d),Y
  $86A7: 60        RTS
  $86A8: C9 0B     CMP #$0b
  $86AA: B0 22     BCS $86ce
  $86AC: 20 6F AB  JSR $ab6f
  $86AF: A0 0F     LDY #$0f
  $86B1: 8A        TXA
  $86B2: 49 FF     EOR #$ff
  $86B4: 18        CLC
  $86B5: 69 01     ADC #$01
  $86B7: 18        CLC
  $86B8: 71 5D     ADC ($5d),Y
  $86BA: 91 5D     STA ($5d),Y
  $86BC: C8        INY
  $86BD: B1 5D     LDA ($5d),Y
  $86BF: 69 FF     ADC #$ff
  $86C1: 91 5D     STA ($5d),Y
  $86C3: 10 09     BPL $86ce
  $86C5: A9 00     LDA #$00
  $86C7: 91 5D     STA ($5d),Y
  $86C9: 88        DEY
  $86CA: 91 5D     STA ($5d),Y
  $86CC: 38        SEC
  $86CD: 60        RTS
  $86CE: 18        CLC
  $86CF: 60        RTS
  $86D0: AD EF 05  LDA $05ef
  $86D3: 09 02     ORA #$02
  $86D5: 8D EF 05  STA $05ef
  $86D8: 60        RTS
  $86D9: AD EF 05  LDA $05ef
  $86DC: 29 FD     AND #$fd
  $86DE: 8D EF 05  STA $05ef
  $86E1: 60        RTS
  $86E2: AD EF 05  LDA $05ef
  $86E5: 29 FE     AND #$fe
  $86E7: 8D EF 05  STA $05ef
  $86EA: 60        RTS
  $86EB: AD EF 05  LDA $05ef
  $86EE: 09 01     ORA #$01
  $86F0: 8D EF 05  STA $05ef
  $86F3: 60        RTS
  $86F4: 8D E3 03  STA $03e3
  $86F7: A9 00     LDA #$00
  $86F9: 8D E4 03  STA $03e4
  $86FC: 60        RTS
  $86FD: 08        PHP
  $86FE: A8        TAY
  $86FF: 18        CLC
  $8700: 6D 9D 05  ADC $059d
  $8703: 8D 9D 05  STA $059d
  $8706: 98        TYA
  $8707: 18        CLC
  $8708: 6D 9E 05  ADC $059e
  $870B: C9 0A     CMP #$0a
  $870D: 90 02     BCC $8711
  $870F: E9 0A     SBC #$0a
  $8711: 8D 9E 05  STA $059e
  $8714: 90 0C     BCC $8722
  $8716: 28        PLP
  $8717: 90 0A     BCC $8723
  $8719: AD 96 05  LDA $0596
  $871C: 09 0C     ORA #$0c
  $871E: 8D 96 05  STA $0596
  $8721: 24 28     BIT $28
  $8723: 98        TYA
  $8724: 18        CLC
  $8725: 6D A5 06  ADC $06a5
  $8728: C9 05     CMP #$05
  $872A: 90 0C     BCC $8738
  $872C: E9 05     SBC #$05
  $872E: 48        PHA
  $872F: AD 96 05  LDA $0596
  $8732: 09 20     ORA #$20
  $8734: 8D 96 05  STA $0596
  $8737: 68        PLA
  $8738: 8D A5 06  STA $06a5
  $873B: AD 35 07  LDA $0735
  $873E: 10 11     BPL $8751
  $8740: 98        TYA
  $8741: 18        CLC
  $8742: 6D 36 07  ADC $0736
  $8745: 8D 36 07  STA $0736
  $8748: C9 1E     CMP #$1e
  $874A: 90 05     BCC $8751
  $874C: A9 00     LDA #$00
  $874E: 8D 35 07  STA $0735
  $8751: 60        RTS
  $8752: AD 9D 05  LDA $059d
  $8755: F0 40     BEQ $8797
  $8757: AD A1 06  LDA $06a1
  $875A: 38        SEC
  $875B: ED 9D 05  SBC $059d
  $875E: 8D A1 06  STA $06a1
  $8761: B0 18     BCS $877b
  $8763: CE A2 06  DEC $06a2
  $8766: 10 13     BPL $877b
  $8768: A9 00     LDA #$00
  $876A: 8D A1 06  STA $06a1
  $876D: 8D A2 06  STA $06a2
  $8770: 8D DF 03  STA $03df
  $8773: A9 13     LDA #$13
  $8775: 20 F4 86  JSR $86f4
  $8778: 20 E2 86  JSR $86e2
  $877B: A9 00     LDA #$00
  $877D: 8D 9D 05  STA $059d
  $8780: 20 58 B4  JSR $b458
  $8783: AD 97 06  LDA $0697
  $8786: D0 0F     BNE $8797
  $8788: AD A4 06  LDA $06a4
  $878B: C9 05     CMP #$05
  $878D: B0 08     BCS $8797
  $878F: A9 0E     LDA #$0e
  $8791: 20 EF 84  JSR $84ef
  $8794: EE 97 06  INC $0697
  $8797: 60        RTS
  $8798: AE 91 06  LDX $0691
  $879B: E8        INX
  $879C: E8        INX
  $879D: 86 00     STX $00
  $879F: A4 37     LDY $37
  $87A1: C4 00     CPY $00
  $87A3: F0 13     BEQ $87b8
  $87A5: 98        TYA
  $87A6: 0A        ASL A
  $87A7: 0A        ASL A
  $87A8: AA        TAX
  $87A9: A9 F8     LDA #$f8
  $87AB: 9D 00 02  STA $0200,X
  $87AE: C8        INY
  $87AF: C0 40     CPY #$40
  $87B1: D0 02     BNE $87b5
  $87B3: A0 02     LDY #$02
  $87B5: 4C A1 87  JMP $87a1
  $87B8: 60        RTS
  $87B9: AD 00 06  LDA $0600
  $87BC: D0 07     BNE $87c5
  $87BE: 8D 91 06  STA $0691
  $87C1: A9 02     LDA #$02
  $87C3: D0 14     BNE $87d9
  $87C5: AD 91 06  LDA $0691
  $87C8: 18        CLC
  $87C9: 69 08     ADC #$08
  $87CB: 29 3F     AND #$3f
  $87CD: C9 3E     CMP #$3e
  $87CF: 90 02     BCC $87d3
  $87D1: E9 3E     SBC #$3e
  $87D3: 8D 91 06  STA $0691
  $87D6: 18        CLC
  $87D7: 69 02     ADC #$02
  $87D9: 85 37     STA $37
  $87DB: 20 04 AE  JSR $ae04
  $87DE: AD 41 00  LDA $0041
  $87E1: D0 10     BNE $87f3
  $87E3: AD 92 06  LDA $0692
  $87E6: D0 0B     BNE $87f3
  $87E8: A9 07     LDA #$07
  $87EA: 20 C5 83  JSR $83c5
  $87ED: 20 78 A5  JSR $a578
  $87F0: 20 91 9E  JSR $9e91
  $87F3: 20 52 87  JSR $8752
  $87F6: 20 AA B2  JSR $b2aa
  $87F9: AD EF 05  LDA $05ef
  $87FC: 29 02     AND #$02
  $87FE: F0 32     BEQ $8832
  $8800: 2C 02 20  BIT $2002
  $8803: 70 FB     BVS $8800
  $8805: 2C 02 20  BIT $2002
  $8808: 50 FB     BVC $8805
  $880A: A9 40     LDA #$40
  $880C: 20 FD 83  JSR $83fd
  $880F: A9 22     LDA #$22
  $8811: 8D 06 20  STA $2006
  $8814: A9 00     LDA #$00
  $8816: 8D 06 20  STA $2006
  $8819: A5 19     LDA $19
  $881B: 29 FD     AND #$fd
  $881D: 8D 00 20  STA $2000
  $8820: AD 02 20  LDA $2002
  $8823: A9 00     LDA #$00
  $8825: 8D 05 20  STA $2005
  $8828: 8D 05 20  STA $2005
  $882B: A5 18     LDA $18
  $882D: 29 FE     AND #$fe
  $882F: 8D 01 20  STA $2001
  $8832: 20 C0 B2  JSR $b2c0
  $8835: 20 98 87  JSR $8798
  $8838: 20 3C 88  JSR $883c
  $883B: 60        RTS
  $883C: AD EF 05  LDA $05ef
  $883F: 4A        LSR A
  $8840: 90 01     BCC $8843
  $8842: 60        RTS
  $8843: A9 07     LDA #$07
  $8845: 20 C5 83  JSR $83c5
  $8848: AD E3 03  LDA $03e3
  $884B: 20 4D 83  JSR $834d
  $884E: 7A        NOP
  $884F: 88        DEY
  $8850: 2B 89     ANC #$89
  $8852: 8C 9C B7  STY $b79c
  $8855: 98        TYA
  $8856: DA        NOP
  $8857: A1 20     LDA ($20,X)
  $8859: 91 5D     STA ($5d),Y
  $885B: 97 F5     SAX $f5,Y
  $885D: 8F 70 90  SAX $9070
  $8860: AA        TAX
  $8861: 94 F2     STY $f2,X
  $8863: 8F B4 98  SAX $98b4
  $8866: 96 8A     STX $8a,Y
  $8868: 71 A0     ADC ($a0),Y
  $886A: 37 8A     RLA $8a,X
  $886C: FD 9C 50  SBC $509c,X
  $886F: 9E 75 8F  SHX $8f75,Y
  $8872: FD 9C 28  SBC $289c,X
  $8875: A5 22     LDA $22
  $8877: A5 61     LDA $61
  $8879: 89 20     NOP #$20
  $887B: F9 88 A9  SBC $a988,Y
  $887E: 1B 20 FD  SLO $fd20,Y
  $8881: 83 A9     SAX ($a9,X)
  $8883: FC 8D 05  NOP $058d,X
  $8886: 02        ???
  $8887: A9 03     LDA #$03
  $8889: 8D 06 02  STA $0206
  $888C: A9 01     LDA #$01
  $888E: 85 1A     STA $1a
  $8890: A9 00     LDA #$00
  $8892: 85 1B     STA $1b
  $8894: 20 0A 83  JSR $830a
  $8897: A9 06     LDA #$06
  $8899: 20 18 84  JSR $8418
  $889C: 20 14 83  JSR $8314
  $889F: A9 00     LDA #$00
  $88A1: 8D E4 03  STA $03e4
  $88A4: AD E5 03  LDA $03e5
  $88A7: 29 02     AND #$02
  $88A9: AA        TAX
  $88AA: BD 6B 89  LDA $896b,X
  $88AD: 8D A1 06  STA $06a1
  $88B0: BD 6C 89  LDA $896c,X
  $88B3: 8D A2 06  STA $06a2
  $88B6: AD 04 C0  LDA $c004
  $88B9: 85 61     STA $61
  $88BB: 85 63     STA $63
  $88BD: AD 05 C0  LDA $c005
  $88C0: 85 62     STA $62
  $88C2: 85 64     STA $64
  $88C4: AC 6F 89  LDY $896f
  $88C7: C8        INY
  $88C8: A2 00     LDX #$00
  $88CA: BD 6F 89  LDA $896f,X
  $88CD: 9D F0 05  STA $05f0,X
  $88D0: E8        INX
  $88D1: 88        DEY
  $88D2: D0 F6     BNE $88ca
  $88D4: A2 32     LDX #$32
  $88D6: 20 95 82  JSR $8295
  $88D9: A9 14     LDA #$14
  $88DB: AE E5 03  LDX $03e5
  $88DE: E0 04     CPX #$04
  $88E0: F0 11     BEQ $88f3
  $88E2: A9 00     LDA #$00
  $88E4: 85 94     STA $94
  $88E6: 8D 97 06  STA $0697
  $88E9: AD E5 03  LDA $03e5
  $88EC: 29 01     AND #$01
  $88EE: 8D E3 05  STA $05e3
  $88F1: A9 01     LDA #$01
  $88F3: 8D E3 03  STA $03e3
  $88F6: 4C 14 83  JMP $8314
  $88F9: 20 8F 83  JSR $838f
  $88FC: 20 71 83  JSR $8371
  $88FF: 20 71 84  JSR $8471
  $8902: 62        ???
  $8903: 89 20     NOP #$20
  $8905: 2F 81 A9  RLA $a981
  $8908: 7E 8D 00  ROR $008d,X
  $890B: 02        ???
  $890C: A9 FF     LDA #$ff
  $890E: 8D 01 02  STA $0201
  $8911: A9 20     LDA #$20
  $8913: 8D 02 02  STA $0202
  $8916: A9 00     LDA #$00
  $8918: 8D 03 02  STA $0203
  $891B: A5 19     LDA $19
  $891D: 29 FC     AND #$fc
  $891F: 85 19     STA $19
  $8921: A9 00     LDA #$00
  $8923: 85 16     STA $16
  $8925: 85 17     STA $17
  $8927: 8D 75 00  STA $0075
  $892A: 60        RTS
  $892B: A9 00     LDA #$00
  $892D: 20 DA AA  JSR $aada
  $8930: A9 00     LDA #$00
  $8932: 85 00     STA $00
  $8934: A5 00     LDA $00
  $8936: 20 6F AB  JSR $ab6f
  $8939: A0 11     LDY #$11
  $893B: A9 00     LDA #$00
  $893D: 91 5D     STA ($5d),Y
  $893F: E6 00     INC $00
  $8941: A5 00     LDA $00
  $8943: C9 16     CMP #$16
  $8945: D0 ED     BNE $8934
  $8947: A9 FF     LDA #$ff
  $8949: 8D F9 03  STA $03f9
  $894C: 8D BF 04  STA $04bf
  $894F: A9 02     LDA #$02
  $8951: 4C F4 86  JMP $86f4
  $8954: A9 80     LDA #$80
  $8956: 20 DD 83  JSR $83dd
  $8959: 29 80     AND #$80
  $895B: F0 03     BEQ $8960
  $895D: EE CA 03  INC $03ca
  $8960: 60        RTS
  $8961: 60        RTS
  $8962: 01 E0     ORA ($e0,X)
  $8964: 21 FF     AND ($ff,X)
  $8966: 01 00     ORA ($00,X)
  $8968: 22        ???
  $8969: FF 00 B4  ISB $b400,X
  $896C: 00        BRK
  $896D: 3C 00 07  NOP $0700,X
  $8970: 12        ???
  $8971: 06 18     ASL $18
  $8973: 3A        NOP
  $8974: 3A        NOP
  $8975: 63 2D     RRA ($2d,X)
  $8977: A9 00     LDA #$00
  $8979: 8D D5 05  STA $05d5
  $897C: AD 96 05  LDA $0596
  $897F: 29 F0     AND #$f0
  $8981: 8D 96 05  STA $0596
  $8984: AD A7 05  LDA $05a7
  $8987: D0 0A     BNE $8993
  $8989: AD E4 03  LDA $03e4
  $898C: 18        CLC
  $898D: 69 05     ADC #$05
  $898F: 8D E4 03  STA $03e4
  $8992: 60        RTS
  $8993: C9 05     CMP #$05
  $8995: 90 02     BCC $8999
  $8997: A9 05     LDA #$05
  $8999: 8D C1 05  STA $05c1
  $899C: A2 00     LDX #$00
  $899E: BD A8 05  LDA $05a8,X
  $89A1: 9D C2 05  STA $05c2,X
  $89A4: E8        INX
  $89A5: EC A7 05  CPX $05a7
  $89A8: D0 F4     BNE $899e
  $89AA: AE E7 05  LDX $05e7
  $89AD: BD CC 89  LDA $89cc,X
  $89B0: A2 00     LDX #$00
  $89B2: 9D CD 05  STA $05cd,X
  $89B5: E8        INX
  $89B6: EC C1 05  CPX $05c1
  $89B9: D0 F7     BNE $89b2
  $89BB: 20 62 B2  JSR $b262
  $89BE: A9 00     LDA #$00
  $89C0: 8D D2 05  STA $05d2
  $89C3: A9 01     LDA #$01
  $89C5: 8D DF 05  STA $05df
  $89C8: EE E4 03  INC $03e4
  $89CB: 60        RTS
  $89CC: 03 01     SLO ($01,X)
  $89CE: A9 00     LDA #$00
  $89D0: 8D D2 05  STA $05d2
  $89D3: EE E4 03  INC $03e4
  $89D6: 60        RTS
  $89D7: AE D2 05  LDX $05d2
  $89DA: EC C1 05  CPX $05c1
  $89DD: D0 07     BNE $89e6
  $89DF: EE E4 03  INC $03e4
  $89E2: EE E4 03  INC $03e4
  $89E5: 60        RTS
  $89E6: A0 00     LDY #$00
  $89E8: AD E7 05  LDA $05e7
  $89EB: D0 08     BNE $89f5
  $89ED: BD CD 05  LDA $05cd,X
  $89F0: 29 10     AND #$10
  $89F2: F0 01     BEQ $89f5
  $89F4: C8        INY
  $89F5: 98        TYA
  $89F6: 0A        ASL A
  $89F7: 0A        ASL A
  $89F8: 85 00     STA $00
  $89FA: BD CD 05  LDA $05cd,X
  $89FD: 8D D3 05  STA $05d3
  $8A00: 2A        ROL A
  $8A01: 2A        ROL A
  $8A02: 2A        ROL A
  $8A03: 29 03     AND #$03
  $8A05: 05 00     ORA $00
  $8A07: 85 00     STA $00
  $8A09: BD C2 05  LDA $05c2,X
  $8A0C: 8E 95 06  STX $0695
  $8A0F: 20 6F AB  JSR $ab6f
  $8A12: A0 03     LDY #$03
  $8A14: B1 5D     LDA ($5d),Y
  $8A16: 8D D4 05  STA $05d4
  $8A19: A0 11     LDY #$11
  $8A1B: A9 05     LDA #$05
  $8A1D: 91 5D     STA ($5d),Y
  $8A1F: A4 00     LDY $00
  $8A21: B9 28 8A  LDA $8a28,Y
  $8A24: 20 EC AD  JSR $adec
  $8A27: 60        RTS
  $8A28: 6D 6E 6F  ADC $6f6e
  $8A2B: 70 71     BVS $8a9e
  $8A2D: 72        ???
  $8A2E: 73 00     RRA ($00),Y
  $8A30: 20 5D 8D  JSR $8d5d
  $8A33: EE D2 05  INC $05d2
  $8A36: 60        RTS
  $8A37: AD E4 03  LDA $03e4
  $8A3A: 20 4D 83  JSR $834d
  $8A3D: 51 8A     EOR ($8a),Y
  $8A3F: 58        CLI
  $8A40: 8A        TXA
  $8A41: CF 8A E1  DCP $e18a
  $8A44: 8A        TXA
  $8A45: A7 8C     LAX $8c
  $8A47: EC 8C 45  CPX $458c
  $8A4A: 8D 71 8D  STA $8d71
  $8A4D: 72        ???
  $8A4E: 8D CF 8A  STA $8acf
  $8A51: 20 80 9E  JSR $9e80
  $8A54: EE E4 03  INC $03e4
  $8A57: 60        RTS
  $8A58: 20 86 9E  JSR $9e86
  $8A5B: 50 09     BVC $8a66
  $8A5D: AD EA 05  LDA $05ea
  $8A60: 8D E7 05  STA $05e7
  $8A63: 20 67 8A  JSR $8a67
  $8A66: 60        RTS
  $8A67: A9 00     LDA #$00
  $8A69: 8D D2 05  STA $05d2
  $8A6C: 20 30 9A  JSR $9a30
  $8A6F: AD D5 05  LDA $05d5
  $8A72: D0 1B     BNE $8a8f
  $8A74: AE E7 05  LDX $05e7
  $8A77: E0 03     CPX #$03
  $8A79: F0 17     BEQ $8a92
  $8A7B: BD 41 8D  LDA $8d41,X
  $8A7E: 20 EC AD  JSR $adec
  $8A81: AE E7 05  LDX $05e7
  $8A84: BD 89 9C  LDA $9c89,X
  $8A87: 18        CLC
  $8A88: 20 0B AA  JSR $aa0b
  $8A8B: 20 88 B4  JSR $b488
  $8A8E: 60        RTS
  $8A8F: EE E4 03  INC $03e4
  $8A92: EE E4 03  INC $03e4
  $8A95: 60        RTS
  $8A96: AD E4 03  LDA $03e4
  $8A99: 20 4D 83  JSR $834d
  $8A9C: B0 8A     BCS $8a28
  $8A9E: BC 8A CF  LDY $cf8a,X
  $8AA1: 8A        TXA
  $8AA2: E1 8A     SBC ($8a,X)
  $8AA4: A7 8C     LAX $8c
  $8AA6: EC 8C 45  CPX $458c
  $8AA9: 8D 71 8D  STA $8d71
  $8AAC: 72        ???
  $8AAD: 8D CF 8A  STA $8acf
  $8AB0: A9 00     LDA #$00
  $8AB2: 8D D2 05  STA $05d2
  $8AB5: 20 62 B2  JSR $b262
  $8AB8: EE E4 03  INC $03e4
  $8ABB: 60        RTS
  $8ABC: AE D2 05  LDX $05d2
  $8ABF: EC C1 05  CPX $05c1
  $8AC2: D0 04     BNE $8ac8
  $8AC4: 20 67 8A  JSR $8a67
  $8AC7: 60        RTS
  $8AC8: BD C2 05  LDA $05c2,X
  $8ACB: 20 77 8B  JSR $8b77
  $8ACE: 60        RTS
  $8ACF: AE E7 05  LDX $05e7
  $8AD2: BD 1E A5  LDA $a51e,X
  $8AD5: 20 F4 86  JSR $86f4
  $8AD8: A9 00     LDA #$00
  $8ADA: 8D D5 05  STA $05d5
  $8ADD: 20 1C AA  JSR $aa1c
  $8AE0: 60        RTS
  $8AE1: AE D2 05  LDX $05d2
  $8AE4: EC C1 05  CPX $05c1
  $8AE7: D0 04     BNE $8aed
  $8AE9: EE E4 03  INC $03e4
  $8AEC: 60        RTS
  $8AED: BD CD 05  LDA $05cd,X
  $8AF0: C9 02     CMP #$02
  $8AF2: D0 03     BNE $8af7
  $8AF4: 4C 6F 8B  JMP $8b6f
  $8AF7: A8        TAY
  $8AF8: B9 13 9C  LDA $9c13,Y
  $8AFB: AC E7 05  LDY $05e7
  $8AFE: 4A        LSR A
  $8AFF: 88        DEY
  $8B00: 10 FC     BPL $8afe
  $8B02: B0 15     BCS $8b19
  $8B04: AD BB 05  LDA $05bb
  $8B07: C9 40     CMP #$40
  $8B09: B0 02     BCS $8b0d
  $8B0B: 69 40     ADC #$40
  $8B0D: C9 F8     CMP #$f8
  $8B0F: 90 0C     BCC $8b1d
  $8B11: A9 20     LDA #$20
  $8B13: 1D CD 05  ORA $05cd,X
  $8B16: 9D CD 05  STA $05cd,X
  $8B19: AD BB 05  LDA $05bb
  $8B1C: 4A        LSR A
  $8B1D: 85 51     STA $51
  $8B1F: BD C2 05  LDA $05c2,X
  $8B22: A8        TAY
  $8B23: BD CD 05  LDA $05cd,X
  $8B26: 8D D3 05  STA $05d3
  $8B29: 29 03     AND #$03
  $8B2B: AA        TAX
  $8B2C: BD 73 8B  LDA $8b73,X
  $8B2F: AA        TAX
  $8B30: 98        TYA
  $8B31: 20 C4 AB  JSR $abc4
  $8B34: A5 6E     LDA $6e
  $8B36: 18        CLC
  $8B37: 20 BB 8B  JSR $8bbb
  $8B3A: AD D3 05  LDA $05d3
  $8B3D: AE D2 05  LDX $05d2
  $8B40: 9D CD 05  STA $05cd,X
  $8B43: AD 2F 06  LDA $062f
  $8B46: C9 01     CMP #$01
  $8B48: D0 25     BNE $8b6f
  $8B4A: 38        SEC
  $8B4B: AD EC 05  LDA $05ec
  $8B4E: E5 00     SBC $00
  $8B50: 8D EC 05  STA $05ec
  $8B53: AD ED 05  LDA $05ed
  $8B56: E5 01     SBC $01
  $8B58: 8D ED 05  STA $05ed
  $8B5B: AD E7 05  LDA $05e7
  $8B5E: D0 0F     BNE $8b6f
  $8B60: AD ED 05  LDA $05ed
  $8B63: C9 06     CMP #$06
  $8B65: 90 08     BCC $8b6f
  $8B67: BD CD 05  LDA $05cd,X
  $8B6A: 09 10     ORA #$10
  $8B6C: 9D CD 05  STA $05cd,X
  $8B6F: EE D2 05  INC $05d2
  $8B72: 60        RTS
  $8B73: 08        PHP
  $8B74: 09 09     ORA #$09
  $8B76: 07 AA     SLO $aa
  $8B78: 38        SEC
  $8B79: E9 0B     SBC #$0b
  $8B7B: 08        PHP
  $8B7C: 8A        TXA
  $8B7D: A2 00     LDX #$00
  $8B7F: 20 79 A4  JSR $a479
  $8B82: 0A        ASL A
  $8B83: A8        TAY
  $8B84: AD BB 05  LDA $05bb
  $8B87: 29 10     AND #$10
  $8B89: F0 01     BEQ $8b8c
  $8B8B: C8        INY
  $8B8C: A9 09     LDA #$09
  $8B8E: 28        PLP
  $8B8F: 08        PHP
  $8B90: D0 02     BNE $8b94
  $8B92: A9 0B     LDA #$0b
  $8B94: 20 EE 83  JSR $83ee
  $8B97: A8        TAY
  $8B98: AD BB 05  LDA $05bb
  $8B9B: 2A        ROL A
  $8B9C: 2A        ROL A
  $8B9D: 2A        ROL A
  $8B9E: 29 03     AND #$03
  $8BA0: AA        TAX
  $8BA1: 98        TYA
  $8BA2: 2A        ROL A
  $8BA3: 2A        ROL A
  $8BA4: 2A        ROL A
  $8BA5: CA        DEX
  $8BA6: 10 FB     BPL $8ba3
  $8BA8: 29 03     AND #$03
  $8BAA: 28        PLP
  $8BAB: D0 04     BNE $8bb1
  $8BAD: 8D D3 05  STA $05d3
  $8BB0: 60        RTS
  $8BB1: AE D2 05  LDX $05d2
  $8BB4: 9D CD 05  STA $05cd,X
  $8BB7: EE D2 05  INC $05d2
  $8BBA: 60        RTS
  $8BBB: 08        PHP
  $8BBC: 85 4F     STA $4f
  $8BBE: AD E3 05  LDA $05e3
  $8BC1: F0 0C     BEQ $8bcf
  $8BC3: AD E5 03  LDA $03e5
  $8BC6: C9 04     CMP #$04
  $8BC8: F0 05     BEQ $8bcf
  $8BCA: 28        PLP
  $8BCB: 08        PHP
  $8BCC: 20 71 8C  JSR $8c71
  $8BCF: A9 00     LDA #$00
  $8BD1: 85 50     STA $50
  $8BD3: 85 52     STA $52
  $8BD5: 20 F9 84  JSR $84f9
  $8BD8: AD D3 05  LDA $05d3
  $8BDB: 29 20     AND #$20
  $8BDD: F0 0B     BEQ $8bea
  $8BDF: 18        CLC
  $8BE0: A5 6E     LDA $6e
  $8BE2: 65 54     ADC $54
  $8BE4: 85 54     STA $54
  $8BE6: 90 02     BCC $8bea
  $8BE8: E6 55     INC $55
  $8BEA: 28        PLP
  $8BEB: A9 03     LDA #$03
  $8BED: AC ED 05  LDY $05ed
  $8BF0: 30 4D     BMI $8c3f
  $8BF2: 08        PHP
  $8BF3: AD EC 05  LDA $05ec
  $8BF6: 85 57     STA $57
  $8BF8: 84 58     STY $58
  $8BFA: A5 54     LDA $54
  $8BFC: 85 00     STA $00
  $8BFE: 85 59     STA $59
  $8C00: A5 55     LDA $55
  $8C02: 85 01     STA $01
  $8C04: 85 5C     STA $5c
  $8C06: 20 28 85  JSR $8528
  $8C09: 46 01     LSR $01
  $8C0B: 66 00     ROR $00
  $8C0D: 46 01     LSR $01
  $8C0F: 66 00     ROR $00
  $8C11: A0 00     LDY #$00
  $8C13: 28        PLP
  $8C14: 08        PHP
  $8C15: 90 0E     BCC $8c25
  $8C17: A0 08     LDY #$08
  $8C19: AD 31 06  LDA $0631
  $8C1C: 18        CLC
  $8C1D: 65 57     ADC $57
  $8C1F: 85 57     STA $57
  $8C21: 90 02     BCC $8c25
  $8C23: E6 58     INC $58
  $8C25: A5 58     LDA $58
  $8C27: D9 18 9C  CMP $9c18,Y
  $8C2A: F0 04     BEQ $8c30
  $8C2C: B0 0F     BCS $8c3d
  $8C2E: 90 09     BCC $8c39
  $8C30: A5 57     LDA $57
  $8C32: D9 17 9C  CMP $9c17,Y
  $8C35: F0 06     BEQ $8c3d
  $8C37: B0 04     BCS $8c3d
  $8C39: C8        INY
  $8C3A: C8        INY
  $8C3B: D0 E8     BNE $8c25
  $8C3D: 98        TYA
  $8C3E: 4A        LSR A
  $8C3F: 29 03     AND #$03
  $8C41: 8D 2F 06  STA $062f
  $8C44: 18        CLC
  $8C45: 6A        ROR A
  $8C46: 6A        ROR A
  $8C47: 6A        ROR A
  $8C48: 0D D3 05  ORA $05d3
  $8C4B: 8D D3 05  STA $05d3
  $8C4E: 29 C3     AND #$c3
  $8C50: C9 80     CMP #$80
  $8C52: D0 08     BNE $8c5c
  $8C54: AD D3 05  LDA $05d3
  $8C57: 09 C0     ORA #$c0
  $8C59: 8D D3 05  STA $05d3
  $8C5C: 28        PLP
  $8C5D: 90 11     BCC $8c70
  $8C5F: AD 2F 06  LDA $062f
  $8C62: D0 0C     BNE $8c70
  $8C64: AD BB 05  LDA $05bb
  $8C67: C9 20     CMP #$20
  $8C69: B0 05     BCS $8c70
  $8C6B: A9 04     LDA #$04
  $8C6D: 8D 2F 06  STA $062f
  $8C70: 60        RTS
  $8C71: AD D3 05  LDA $05d3
  $8C74: 29 03     AND #$03
  $8C76: 90 02     BCC $8c7a
  $8C78: 09 04     ORA #$04
  $8C7A: AA        TAX
  $8C7B: A0 0F     LDY #$0f
  $8C7D: B1 5D     LDA ($5d),Y
  $8C7F: 38        SEC
  $8C80: FD 6A 9C  SBC $9c6a,X
  $8C83: AA        TAX
  $8C84: C8        INY
  $8C85: B1 5D     LDA ($5d),Y
  $8C87: E9 00     SBC #$00
  $8C89: 10 07     BPL $8c92
  $8C8B: A9 00     LDA #$00
  $8C8D: AA        TAX
  $8C8E: 46 4F     LSR $4f
  $8C90: 46 4F     LSR $4f
  $8C92: 91 5D     STA ($5d),Y
  $8C94: 8A        TXA
  $8C95: 88        DEY
  $8C96: 91 5D     STA ($5d),Y
  $8C98: 60        RTS
  $8C99: AD E4 03  LDA $03e4
  $8C9C: 20 4D 83  JSR $834d
  $8C9F: A7 8C     LAX $8c
  $8CA1: EC 8C 45  CPX $458c
  $8CA4: 8D 71 8D  STA $8d71
  $8CA7: A9 00     LDA #$00
  $8CA9: 8D DF 05  STA $05df
  $8CAC: 8D DE 05  STA $05de
  $8CAF: 8D D2 05  STA $05d2
  $8CB2: A2 00     LDX #$00
  $8CB4: BD CD 05  LDA $05cd,X
  $8CB7: 29 C3     AND #$c3
  $8CB9: C9 C0     CMP #$c0
  $8CBB: F0 0F     BEQ $8ccc
  $8CBD: E8        INX
  $8CBE: EC C1 05  CPX $05c1
  $8CC1: D0 F1     BNE $8cb4
  $8CC3: AD E7 05  LDA $05e7
  $8CC6: C9 03     CMP #$03
  $8CC8: F0 07     BEQ $8cd1
  $8CCA: D0 0A     BNE $8cd6
  $8CCC: A9 80     LDA #$80
  $8CCE: 8D DE 05  STA $05de
  $8CD1: EE DF 05  INC $05df
  $8CD4: D0 12     BNE $8ce8
  $8CD6: AD BB 05  LDA $05bb
  $8CD9: 29 0F     AND #$0f
  $8CDB: CD C1 05  CMP $05c1
  $8CDE: 90 05     BCC $8ce5
  $8CE0: ED C1 05  SBC $05c1
  $8CE3: 10 F6     BPL $8cdb
  $8CE5: 8D DE 05  STA $05de
  $8CE8: EE E4 03  INC $03e4
  $8CEB: 60        RTS
  $8CEC: AE D2 05  LDX $05d2
  $8CEF: EC C1 05  CPX $05c1
  $8CF2: D0 0A     BNE $8cfe
  $8CF4: AD E4 03  LDA $03e4
  $8CF7: 18        CLC
  $8CF8: 69 03     ADC #$03
  $8CFA: 8D E4 03  STA $03e4
  $8CFD: 60        RTS
  $8CFE: AD DF 05  LDA $05df
  $8D01: D0 14     BNE $8d17
  $8D03: EC DE 05  CPX $05de
  $8D06: D0 0F     BNE $8d17
  $8D08: AE E7 05  LDX $05e7
  $8D0B: BD 41 8D  LDA $8d41,X
  $8D0E: 20 EC AD  JSR $adec
  $8D11: A9 80     LDA #$80
  $8D13: 8D DF 05  STA $05df
  $8D16: 60        RTS
  $8D17: BD C2 05  LDA $05c2,X
  $8D1A: 8E 95 06  STX $0695
  $8D1D: 20 6F AB  JSR $ab6f
  $8D20: A0 03     LDY #$03
  $8D22: B1 5D     LDA ($5d),Y
  $8D24: 8D D4 05  STA $05d4
  $8D27: A0 11     LDY #$11
  $8D29: A9 05     LDA #$05
  $8D2B: 91 5D     STA ($5d),Y
  $8D2D: BD CD 05  LDA $05cd,X
  $8D30: 8D D3 05  STA $05d3
  $8D33: AD E7 05  LDA $05e7
  $8D36: 20 4D 83  JSR $834d
  $8D39: CA        DEX
  $8D3A: 8D 09 8E  STA $8e09
  $8D3D: 09 8E     ORA #$8e
  $8D3F: 3B 8E 5A  RLA $5a8e,Y
  $8D42: 79 97 06  ADC $0697,Y
  $8D45: AD DF 05  LDA $05df
  $8D48: 10 0C     BPL $8d56
  $8D4A: A9 01     LDA #$01
  $8D4C: 8D DF 05  STA $05df
  $8D4F: 20 CA 8E  JSR $8eca
  $8D52: CE E4 03  DEC $03e4
  $8D55: 60        RTS
  $8D56: 20 5D 8D  JSR $8d5d
  $8D59: EE D2 05  INC $05d2
  $8D5C: 60        RTS
  $8D5D: AD D3 05  LDA $05d3
  $8D60: 18        CLC
  $8D61: 2A        ROL A
  $8D62: 2A        ROL A
  $8D63: 2A        ROL A
  $8D64: 29 03     AND #$03
  $8D66: 20 4D 83  JSR $834d
  $8D69: D5 8E     CMP $8e,X
  $8D6B: D5 8E     CMP $8e,X
  $8D6D: F9 8E 26  SBC $268e,Y
  $8D70: 8F 60 AD  SAX $ad60
  $8D73: DE 05 30  DEC $3005,X
  $8D76: 0E AE E7  ASL $e7ae
  $8D79: 05 E0     ORA $e0
  $8D7B: 03 D0     SLO ($d0,X)
  $8D7D: 03 20     SLO ($20,X)
  $8D7F: CA        DEX
  $8D80: 8E EE E4  STX $e4ee
  $8D83: 03 60     SLO ($60,X)
  $8D85: A2 00     LDX #$00
  $8D87: A0 00     LDY #$00
  $8D89: 8E 75 00  STX $0075
  $8D8C: BD CD 05  LDA $05cd,X
  $8D8F: 29 C3     AND #$c3
  $8D91: C9 C0     CMP #$c0
  $8D93: D0 19     BNE $8dae
  $8D95: 98        TYA
  $8D96: 48        PHA
  $8D97: BD C2 05  LDA $05c2,X
  $8D9A: 20 6F AB  JSR $ab6f
  $8D9D: A0 00     LDY #$00
  $8D9F: B1 5D     LDA ($5d),Y
  $8DA1: 09 08     ORA #$08
  $8DA3: 91 5D     STA ($5d),Y
  $8DA5: 68        PLA
  $8DA6: A8        TAY
  $8DA7: BD C2 05  LDA $05c2,X
  $8DAA: 99 C2 05  STA $05c2,Y
  $8DAD: C8        INY
  $8DAE: E8        INX
  $8DAF: EC C1 05  CPX $05c1
  $8DB2: D0 D8     BNE $8d8c
  $8DB4: 8C C1 05  STY $05c1
  $8DB7: A9 02     LDA #$02
  $8DB9: 8D E6 05  STA $05e6
  $8DBC: A9 04     LDA #$04
  $8DBE: 20 F4 86  JSR $86f4
  $8DC1: A9 04     LDA #$04
  $8DC3: 0D 96 05  ORA $0596
  $8DC6: 8D 96 05  STA $0596
  $8DC9: 60        RTS
  $8DCA: AE D2 05  LDX $05d2
  $8DCD: E8        INX
  $8DCE: 8A        TXA
  $8DCF: AE DE 05  LDX $05de
  $8DD2: 30 05     BMI $8dd9
  $8DD4: AE DF 05  LDX $05df
  $8DD7: D0 0A     BNE $8de3
  $8DD9: A2 00     LDX #$00
  $8DDB: AD E3 05  LDA $05e3
  $8DDE: F0 22     BEQ $8e02
  $8DE0: E8        INX
  $8DE1: D0 1F     BNE $8e02
  $8DE3: AE E3 05  LDX $05e3
  $8DE6: D0 10     BNE $8df8
  $8DE8: A2 02     LDX #$02
  $8DEA: CD C1 05  CMP $05c1
  $8DED: D0 13     BNE $8e02
  $8DEF: AD D4 05  LDA $05d4
  $8DF2: D0 06     BNE $8dfa
  $8DF4: A2 00     LDX #$00
  $8DF6: F0 02     BEQ $8dfa
  $8DF8: A2 04     LDX #$04
  $8DFA: AD D3 05  LDA $05d3
  $8DFD: 29 10     AND #$10
  $8DFF: F0 01     BEQ $8e02
  $8E01: E8        INX
  $8E02: 8A        TXA
  $8E03: A2 00     LDX #$00
  $8E05: 20 70 8E  JSR $8e70
  $8E08: 60        RTS
  $8E09: AE D2 05  LDX $05d2
  $8E0C: E8        INX
  $8E0D: 8A        TXA
  $8E0E: AE DE 05  LDX $05de
  $8E11: 30 05     BMI $8e18
  $8E13: AE DF 05  LDX $05df
  $8E16: D0 06     BNE $8e1e
  $8E18: AE E3 05  LDX $05e3
  $8E1B: 4C 34 8E  JMP $8e34
  $8E1E: AE E3 05  LDX $05e3
  $8E21: D0 0F     BNE $8e32
  $8E23: A2 00     LDX #$00
  $8E25: CD C1 05  CMP $05c1
  $8E28: D0 0A     BNE $8e34
  $8E2A: AD D4 05  LDA $05d4
  $8E2D: D0 05     BNE $8e34
  $8E2F: E8        INX
  $8E30: D0 02     BNE $8e34
  $8E32: A2 02     LDX #$02
  $8E34: 8A        TXA
  $8E35: A2 06     LDX #$06
  $8E37: 20 70 8E  JSR $8e70
  $8E3A: 60        RTS
  $8E3B: AD 9F 05  LDA $059f
  $8E3E: 20 6F AB  JSR $ab6f
  $8E41: A0 03     LDY #$03
  $8E43: B1 5D     LDA ($5d),Y
  $8E45: C9 14     CMP #$14
  $8E47: F0 11     BEQ $8e5a
  $8E49: A9 02     LDA #$02
  $8E4B: AE E3 05  LDX $05e3
  $8E4E: D0 07     BNE $8e57
  $8E50: AD D4 05  LDA $05d4
  $8E53: F0 02     BEQ $8e57
  $8E55: A9 01     LDA #$01
  $8E57: 4C 6A 8E  JMP $8e6a
  $8E5A: A9 03     LDA #$03
  $8E5C: AE DE 06  LDX $06de
  $8E5F: F0 09     BEQ $8e6a
  $8E61: A9 04     LDA #$04
  $8E63: AE D4 05  LDX $05d4
  $8E66: F0 02     BEQ $8e6a
  $8E68: A9 05     LDA #$05
  $8E6A: A2 0C     LDX #$0c
  $8E6C: 20 70 8E  JSR $8e70
  $8E6F: 60        RTS
  $8E70: 0A        ASL A
  $8E71: 0A        ASL A
  $8E72: 85 00     STA $00
  $8E74: 0A        ASL A
  $8E75: 65 00     ADC $00
  $8E77: 85 00     STA $00
  $8E79: AD D3 05  LDA $05d3
  $8E7C: 29 03     AND #$03
  $8E7E: C9 02     CMP #$02
  $8E80: D0 05     BNE $8e87
  $8E82: A9 00     LDA #$00
  $8E84: 4C BE 8E  JMP $8ebe
  $8E87: C9 03     CMP #$03
  $8E89: D0 02     BNE $8e8d
  $8E8B: A9 02     LDA #$02
  $8E8D: 0A        ASL A
  $8E8E: 0A        ASL A
  $8E8F: 65 00     ADC $00
  $8E91: 85 00     STA $00
  $8E93: AD D3 05  LDA $05d3
  $8E96: 29 C0     AND #$c0
  $8E98: 18        CLC
  $8E99: 2A        ROL A
  $8E9A: 2A        ROL A
  $8E9B: 2A        ROL A
  $8E9C: 65 00     ADC $00
  $8E9E: A8        TAY
  $8E9F: AD E7 05  LDA $05e7
  $8EA2: C9 03     CMP #$03
  $8EA4: F0 0C     BEQ $8eb2
  $8EA6: AD DF 05  LDA $05df
  $8EA9: F0 07     BEQ $8eb2
  $8EAB: AD DE 05  LDA $05de
  $8EAE: 30 02     BMI $8eb2
  $8EB0: E8        INX
  $8EB1: E8        INX
  $8EB2: BD 18 C0  LDA $c018,X
  $8EB5: 85 00     STA $00
  $8EB7: BD 19 C0  LDA $c019,X
  $8EBA: 85 01     STA $01
  $8EBC: B1 00     LDA ($00),Y
  $8EBE: C9 00     CMP #$00
  $8EC0: F0 04     BEQ $8ec6
  $8EC2: 20 EC AD  JSR $adec
  $8EC5: 60        RTS
  $8EC6: EE E4 03  INC $03e4
  $8EC9: 60        RTS
  $8ECA: AE E7 05  LDX $05e7
  $8ECD: BD 2F 9C  LDA $9c2f,X
  $8ED0: 18        CLC
  $8ED1: 20 0B AA  JSR $aa0b
  $8ED4: 60        RTS
  $8ED5: AE D2 05  LDX $05d2
  $8ED8: BD C2 05  LDA $05c2,X
  $8EDB: 20 6F AB  JSR $ab6f
  $8EDE: BD CD 05  LDA $05cd,X
  $8EE1: 29 03     AND #$03
  $8EE3: AA        TAX
  $8EE4: BD 27 9C  LDA $9c27,X
  $8EE7: 48        PHA
  $8EE8: 18        CLC
  $8EE9: 7D 33 9C  ADC $9c33,X
  $8EEC: A0 11     LDY #$11
  $8EEE: 91 5D     STA ($5d),Y
  $8EF0: 68        PLA
  $8EF1: 18        CLC
  $8EF2: 20 0B AA  JSR $aa0b
  $8EF5: CE E4 03  DEC $03e4
  $8EF8: 60        RTS
  $8EF9: 20 5B 8F  JSR $8f5b
  $8EFC: A9 00     LDA #$00
  $8EFE: 8D D5 05  STA $05d5
  $8F01: A9 0F     LDA #$0f
  $8F03: 20 F4 86  JSR $86f4
  $8F06: AE 9F 05  LDX $059f
  $8F09: AD DF 05  LDA $05df
  $8F0C: F0 09     BEQ $8f17
  $8F0E: AD E7 05  LDA $05e7
  $8F11: C9 03     CMP #$03
  $8F13: F0 02     BEQ $8f17
  $8F15: A2 FF     LDX #$ff
  $8F17: 8E 9B 06  STX $069b
  $8F1A: AE D2 05  LDX $05d2
  $8F1D: BD C2 05  LDA $05c2,X
  $8F20: 8D 9A 06  STA $069a
  $8F23: 68        PLA
  $8F24: 68        PLA
  $8F25: 60        RTS
  $8F26: 20 5B 8F  JSR $8f5b
  $8F29: AD D3 05  LDA $05d3
  $8F2C: 29 03     AND #$03
  $8F2E: D0 04     BNE $8f34
  $8F30: CE E4 03  DEC $03e4
  $8F33: 60        RTS
  $8F34: AD E3 05  LDA $05e3
  $8F37: 49 01     EOR #$01
  $8F39: 8D E3 05  STA $05e3
  $8F3C: AE D2 05  LDX $05d2
  $8F3F: BD C2 05  LDA $05c2,X
  $8F42: 8D 9F 05  STA $059f
  $8F45: A2 35     LDX #$35
  $8F47: 20 95 82  JSR $8295
  $8F4A: A9 03     LDA #$03
  $8F4C: 20 F4 86  JSR $86f4
  $8F4F: A9 00     LDA #$00
  $8F51: 8D D5 05  STA $05d5
  $8F54: 20 70 86  JSR $8670
  $8F57: 20 1C AA  JSR $aa1c
  $8F5A: 60        RTS
  $8F5B: AE D2 05  LDX $05d2
  $8F5E: BD CD 05  LDA $05cd,X
  $8F61: 29 03     AND #$03
  $8F63: AA        TAX
  $8F64: BD 2B 9C  LDA $9c2b,X
  $8F67: 18        CLC
  $8F68: 20 0B AA  JSR $aa0b
  $8F6B: BD 2B 9C  LDA $9c2b,X
  $8F6E: 60        RTS
  $8F6F: A9 11     LDA #$11
  $8F71: 20 F4 86  JSR $86f4
  $8F74: 60        RTS
  $8F75: AD E4 03  LDA $03e4
  $8F78: 20 4D 83  JSR $834d
  $8F7B: 7F 8F C9  RRA $c98f,X
  $8F7E: 8F AD 9F  SAX $9fad
  $8F81: 05 20     ORA $20
  $8F83: 6F AB 20  RRA $20ab
  $8F86: BB 8F 86  LAS $868f,Y
  $8F89: 00        BRK
  $8F8A: 84 01     STY $01
  $8F8C: A0 0F     LDY #$0f
  $8F8E: B1 5D     LDA ($5d),Y
  $8F90: 38        SEC
  $8F91: E5 00     SBC $00
  $8F93: AA        TAX
  $8F94: C8        INY
  $8F95: B1 5D     LDA ($5d),Y
  $8F97: E5 01     SBC $01
  $8F99: 10 14     BPL $8faf
  $8F9B: AD E7 05  LDA $05e7
  $8F9E: C9 03     CMP #$03
  $8FA0: F0 0A     BEQ $8fac
  $8FA2: C9 01     CMP #$01
  $8FA4: F0 06     BEQ $8fac
  $8FA6: A9 38     LDA #$38
  $8FA8: 20 EC AD  JSR $adec
  $8FAB: 60        RTS
  $8FAC: A9 00     LDA #$00
  $8FAE: AA        TAX
  $8FAF: 91 5D     STA ($5d),Y
  $8FB1: 88        DEY
  $8FB2: 8A        TXA
  $8FB3: 91 5D     STA ($5d),Y
  $8FB5: A9 0C     LDA #$0c
  $8FB7: 20 F4 86  JSR $86f4
  $8FBA: 60        RTS
  $8FBB: AD E7 05  LDA $05e7
  $8FBE: 20 4D 83  JSR $834d
  $8FC1: CF 8F DC  DCP $dc8f
  $8FC4: 8F E1 8F  SAX $8fe1
  $8FC7: E6 8F     INC $8f
  $8FC9: A9 04     LDA #$04
  $8FCB: 20 F4 86  JSR $86f4
  $8FCE: 60        RTS
  $8FCF: AD 99 06  LDA $0699
  $8FD2: 0A        ASL A
  $8FD3: A8        TAY
  $8FD4: BE 46 9C  LDX $9c46,Y
  $8FD7: B9 47 9C  LDA $9c47,Y
  $8FDA: A8        TAY
  $8FDB: 60        RTS
  $8FDC: A2 1E     LDX #$1e
  $8FDE: A0 00     LDY #$00
  $8FE0: 60        RTS
  $8FE1: A2 3C     LDX #$3c
  $8FE3: A0 00     LDY #$00
  $8FE5: 60        RTS
  $8FE6: A2 00     LDX #$00
  $8FE8: A0 00     LDY #$00
  $8FEA: AD D5 05  LDA $05d5
  $8FED: F0 02     BEQ $8ff1
  $8FEF: A2 28     LDX #$28
  $8FF1: 60        RTS
  $8FF2: 4C 6F 8F  JMP $8f6f
  $8FF5: AD E4 03  LDA $03e4
  $8FF8: 20 4D 83  JSR $834d
  $8FFB: 01 90     ORA ($90,X)
  $8FFD: 52        ???
  $8FFE: 90 64     BCC $9064
  $9000: 90 AD     BCC $8faf
  $9002: 9F 05 85  ??? $8505,Y
  $9005: 5F A9 00  SRE $00a9,X
  $9008: AE E3 05  LDX $05e3
  $900B: F0 02     BEQ $900f
  $900D: A9 0B     LDA #$0b
  $900F: 85 00     STA $00
  $9011: A9 0B     LDA #$0b
  $9013: 85 01     STA $01
  $9015: A5 00     LDA $00
  $9017: 20 6F AB  JSR $ab6f
  $901A: A0 03     LDY #$03
  $901C: AD 33 06  LDA $0633
  $901F: D1 5D     CMP ($5d),Y
  $9021: F0 06     BEQ $9029
  $9023: E6 00     INC $00
  $9025: C6 01     DEC $01
  $9027: D0 EC     BNE $9015
  $9029: A5 00     LDA $00
  $902B: 8D B9 05  STA $05b9
  $902E: AD E3 05  LDA $05e3
  $9031: F0 02     BEQ $9035
  $9033: 09 80     ORA #$80
  $9035: A2 01     LDX #$01
  $9037: 8E 70 00  STX $0070
  $903A: CA        DEX
  $903B: 20 B3 A7  JSR $a7b3
  $903E: A9 04     LDA #$04
  $9040: 85 00     STA $00
  $9042: 20 5E AA  JSR $aa5e
  $9045: 20 61 AA  JSR $aa61
  $9048: C6 00     DEC $00
  $904A: D0 F6     BNE $9042
  $904C: A9 98     LDA #$98
  $904E: 20 EC AD  JSR $adec
  $9051: 60        RTS
  $9052: AE B9 05  LDX $05b9
  $9055: AD 9F 05  LDA $059f
  $9058: 8D B9 05  STA $05b9
  $905B: 8E 9F 05  STX $059f
  $905E: A9 3A     LDA #$3a
  $9060: 20 EC AD  JSR $adec
  $9063: 60        RTS
  $9064: AD B9 05  LDA $05b9
  $9067: 8D 9F 05  STA $059f
  $906A: A9 03     LDA #$03
  $906C: 20 F4 86  JSR $86f4
  $906F: 60        RTS
  $9070: AD E4 03  LDA $03e4
  $9073: 20 4D 83  JSR $834d
  $9076: 7C 90 97  NOP $9790,X
  $9079: 90 0C     BCC $9087
  $907B: 91 20     STA ($20),Y
  $907D: 1A        NOP
  $907E: 91 AE     STA ($ae),Y
  $9080: 9D 06 BD  STA $bd06,X
  $9083: 93 90     ??? ($90),Y
  $9085: 20 58 B4  JSR $b458
  $9088: A9 00     LDA #$00
  $908A: 8D B3 05  STA $05b3
  $908D: 8D B4 05  STA $05b4
  $9090: EE E4 03  INC $03e4
  $9093: 60        RTS
  $9094: 05 09     ORA $09
  $9096: 0A        ASL A
  $9097: AD E6 03  LDA $03e6
  $909A: F0 01     BEQ $909d
  $909C: 60        RTS
  $909D: AD B4 05  LDA $05b4
  $90A0: D0 05     BNE $90a7
  $90A2: EE B4 05  INC $05b4
  $90A5: D0 5A     BNE $9101
  $90A7: A9 40     LDA #$40
  $90A9: 20 E0 83  JSR $83e0
  $90AC: F0 06     BEQ $90b4
  $90AE: A9 04     LDA #$04
  $90B0: 20 F4 86  JSR $86f4
  $90B3: 60        RTS
  $90B4: A9 80     LDA #$80
  $90B6: 20 E0 83  JSR $83e0
  $90B9: F0 16     BEQ $90d1
  $90BB: AE B3 05  LDX $05b3
  $90BE: BD 9E 06  LDA $069e,X
  $90C1: 8D 99 06  STA $0699
  $90C4: C9 11     CMP #$11
  $90C6: D0 05     BNE $90cd
  $90C8: A9 00     LDA #$00
  $90CA: 8D 35 07  STA $0735
  $90CD: EE E4 03  INC $03e4
  $90D0: 60        RTS
  $90D1: A9 0C     LDA #$0c
  $90D3: 20 E0 83  JSR $83e0
  $90D6: 29 0C     AND #$0c
  $90D8: D0 01     BNE $90db
  $90DA: 60        RTS
  $90DB: 48        PHA
  $90DC: AD B3 05  LDA $05b3
  $90DF: 18        CLC
  $90E0: 69 04     ADC #$04
  $90E2: 20 CA 9B  JSR $9bca
  $90E5: 68        PLA
  $90E6: AE B3 05  LDX $05b3
  $90E9: 29 08     AND #$08
  $90EB: F0 07     BEQ $90f4
  $90ED: CA        DEX
  $90EE: 10 0E     BPL $90fe
  $90F0: A2 00     LDX #$00
  $90F2: F0 0A     BEQ $90fe
  $90F4: E8        INX
  $90F5: EC 9D 06  CPX $069d
  $90F8: 90 04     BCC $90fe
  $90FA: AE 9D 06  LDX $069d
  $90FD: CA        DEX
  $90FE: 8E B3 05  STX $05b3
  $9101: AD B3 05  LDA $05b3
  $9104: 18        CLC
  $9105: 69 04     ADC #$04
  $9107: 38        SEC
  $9108: 20 CA 9B  JSR $9bca
  $910B: 60        RTS
  $910C: 4C 6F 8F  JMP $8f6f
  $910F: AD E3 05  LDA $05e3
  $9112: 4A        LSR A
  $9113: A9 00     LDA #$00
  $9115: B0 02     BCS $9119
  $9117: A9 0B     LDA #$0b
  $9119: 60        RTS
  $911A: A2 33     LDX #$33
  $911C: 20 95 82  JSR $8295
  $911F: 60        RTS
  $9120: AD E4 03  LDA $03e4
  $9123: 20 4D 83  JSR $834d
  $9126: 46 91     LSR $91
  $9128: 58        CLI
  $9129: 91 9D     STA ($9d),Y
  $912B: 97 77     SAX $77,Y
  $912D: 89 E1     NOP #$e1
  $912F: 8A        TXA
  $9130: CE 89 D7  DEC $d789
  $9133: 89 30     NOP #$30
  $9135: 8A        TXA
  $9136: 81 91     STA ($91,X)
  $9138: AD 91 B3  LDA $b391
  $913B: 91 DF     STA ($df),Y
  $913D: 91 51     STA ($51),Y
  $913F: 92        ???
  $9140: 57 92     SRE $92,X
  $9142: 1D 93 32  ORA $3293,X
  $9145: 93 A9     ??? ($a9),Y
  $9147: 00        BRK
  $9148: 8D A7 05  STA $05a7
  $914B: 8D C1 05  STA $05c1
  $914E: 20 5A 94  JSR $945a
  $9151: 8D B4 05  STA $05b4
  $9154: EE E4 03  INC $03e4
  $9157: 60        RTS
  $9158: 20 DB 97  JSR $97db
  $915B: A9 16     LDA #$16
  $915D: 20 82 9B  JSR $9b82
  $9160: C9 01     CMP #$01
  $9162: F0 16     BEQ $917a
  $9164: 85 04     STA $04
  $9166: 20 5E AA  JSR $aa5e
  $9169: 20 61 AA  JSR $aa61
  $916C: A9 16     LDA #$16
  $916E: 20 82 9B  JSR $9b82
  $9171: C5 04     CMP $04
  $9173: F0 F1     BEQ $9166
  $9175: CE B4 05  DEC $05b4
  $9178: 10 03     BPL $917d
  $917A: EE E4 03  INC $03e4
  $917D: EE E4 03  INC $03e4
  $9180: 60        RTS
  $9181: A9 00     LDA #$00
  $9183: 8D D5 05  STA $05d5
  $9186: AD B4 05  LDA $05b4
  $9189: 30 1C     BMI $91a7
  $918B: EE E4 03  INC $03e4
  $918E: AD E3 05  LDA $05e3
  $9191: F0 10     BEQ $91a3
  $9193: AD 08 04  LDA $0408
  $9196: F0 0B     BEQ $91a3
  $9198: A9 01     LDA #$01
  $919A: 8D DE 03  STA $03de
  $919D: A9 0E     LDA #$0e
  $919F: 20 EC AD  JSR $adec
  $91A2: 60        RTS
  $91A3: EE E4 03  INC $03e4
  $91A6: 60        RTS
  $91A7: A9 76     LDA #$76
  $91A9: 20 EC AD  JSR $adec
  $91AC: 60        RTS
  $91AD: A9 0F     LDA #$0f
  $91AF: 20 F4 86  JSR $86f4
  $91B2: 60        RTS
  $91B3: A9 01     LDA #$01
  $91B5: 8D DE 03  STA $03de
  $91B8: AD E3 05  LDA $05e3
  $91BB: F0 16     BEQ $91d3
  $91BD: A9 57     LDA #$57
  $91BF: 20 EC AD  JSR $adec
  $91C2: A9 15     LDA #$15
  $91C4: 20 58 B4  JSR $b458
  $91C7: A9 00     LDA #$00
  $91C9: 8D E4 05  STA $05e4
  $91CC: 8D E5 05  STA $05e5
  $91CF: 8D E6 05  STA $05e6
  $91D2: 60        RTS
  $91D3: A9 0B     LDA #$0b
  $91D5: 20 77 8B  JSR $8b77
  $91D8: EE E4 03  INC $03e4
  $91DB: EE E4 03  INC $03e4
  $91DE: 60        RTS
  $91DF: AD E6 03  LDA $03e6
  $91E2: F0 01     BEQ $91e5
  $91E4: 60        RTS
  $91E5: A9 80     LDA #$80
  $91E7: 20 E0 83  JSR $83e0
  $91EA: F0 09     BEQ $91f5
  $91EC: 2C E4 05  BIT $05e4
  $91EF: 10 04     BPL $91f5
  $91F1: EE E4 03  INC $03e4
  $91F4: 60        RTS
  $91F5: A9 0F     LDA #$0f
  $91F7: 20 E0 83  JSR $83e0
  $91FA: 29 0F     AND #$0f
  $91FC: F0 27     BEQ $9225
  $91FE: A2 00     LDX #$00
  $9200: 4A        LSR A
  $9201: B0 03     BCS $9206
  $9203: E8        INX
  $9204: D0 FA     BNE $9200
  $9206: E0 02     CPX #$02
  $9208: D0 0D     BNE $9217
  $920A: A9 00     LDA #$00
  $920C: 20 6F AB  JSR $ab6f
  $920F: A0 03     LDY #$03
  $9211: B1 5D     LDA ($5d),Y
  $9213: C9 16     CMP #$16
  $9215: D0 35     BNE $924c
  $9217: BD 4D 92  LDA $924d,X
  $921A: 8D D3 05  STA $05d3
  $921D: AD E4 05  LDA $05e4
  $9220: 09 80     ORA #$80
  $9222: 8D E4 05  STA $05e4
  $9225: 2C E4 05  BIT $05e4
  $9228: 30 01     BMI $922b
  $922A: 60        RTS
  $922B: CE E6 05  DEC $05e6
  $922E: 30 01     BMI $9231
  $9230: 60        RTS
  $9231: A9 0B     LDA #$0b
  $9233: 8D E6 05  STA $05e6
  $9236: 18        CLC
  $9237: 70 06     BVS $923f
  $9239: AD D3 05  LDA $05d3
  $923C: 69 09     ADC #$09
  $923E: 38        SEC
  $923F: A2 00     LDX #$00
  $9241: 20 E3 A3  JSR $a3e3
  $9244: AD E4 05  LDA $05e4
  $9247: 49 40     EOR #$40
  $9249: 8D E4 05  STA $05e4
  $924C: 60        RTS
  $924D: 00        BRK
  $924E: 00        BRK
  $924F: 02        ???
  $9250: 01 A9     ORA ($a9,X)
  $9252: 9A        TXS
  $9253: 20 EC AD  JSR $adec
  $9256: 60        RTS
  $9257: AD BB 05  LDA $05bb
  $925A: 30 02     BMI $925e
  $925C: 09 80     ORA #$80
  $925E: AE BB 05  LDX $05bb
  $9261: E0 08     CPX #$08
  $9263: B0 0C     BCS $9271
  $9265: 29 7F     AND #$7f
  $9267: 48        PHA
  $9268: AD D3 05  LDA $05d3
  $926B: 09 20     ORA #$20
  $926D: 8D D3 05  STA $05d3
  $9270: 68        PLA
  $9271: 85 51     STA $51
  $9273: AD D3 05  LDA $05d3
  $9276: 29 03     AND #$03
  $9278: AA        TAX
  $9279: E0 02     CPX #$02
  $927B: D0 30     BNE $92ad
  $927D: 20 0F 91  JSR $910f
  $9280: 48        PHA
  $9281: 20 6F AB  JSR $ab6f
  $9284: A0 0E     LDY #$0e
  $9286: B1 5D     LDA ($5d),Y
  $9288: 85 00     STA $00
  $928A: A2 00     LDX #$00
  $928C: 68        PLA
  $928D: D0 0D     BNE $929c
  $928F: 06 00     ASL $00
  $9291: A0 16     LDY #$16
  $9293: A9 01     LDA #$01
  $9295: 20 EE 83  JSR $83ee
  $9298: AA        TAX
  $9299: 4C 9E 92  JMP $929e
  $929C: 46 00     LSR $00
  $929E: 8A        TXA
  $929F: 18        CLC
  $92A0: 65 00     ADC $00
  $92A2: 69 0A     ADC #$0a
  $92A4: A8        TAY
  $92A5: A9 14     LDA #$14
  $92A7: 20 EE 83  JSR $83ee
  $92AA: 4C B7 92  JMP $92b7
  $92AD: E8        INX
  $92AE: E8        INX
  $92AF: 20 0F 91  JSR $910f
  $92B2: 20 C4 AB  JSR $abc4
  $92B5: A5 6E     LDA $6e
  $92B7: 38        SEC
  $92B8: 20 BB 8B  JSR $8bbb
  $92BB: AD 93 05  LDA $0593
  $92BE: C9 02     CMP #$02
  $92C0: D0 09     BNE $92cb
  $92C2: A9 FA     LDA #$fa
  $92C4: AE 99 06  LDX $0699
  $92C7: F0 02     BEQ $92cb
  $92C9: A9 F7     LDA #$f7
  $92CB: A0 02     LDY #$02
  $92CD: 18        CLC
  $92CE: 71 5D     ADC ($5d),Y
  $92D0: 91 5D     STA ($5d),Y
  $92D2: AD 2F 06  LDA $062f
  $92D5: C9 01     CMP #$01
  $92D7: D0 0A     BNE $92e3
  $92D9: AD ED 05  LDA $05ed
  $92DC: C9 18     CMP #$18
  $92DE: B0 03     BCS $92e3
  $92E0: EE 2F 06  INC $062f
  $92E3: AD D3 05  LDA $05d3
  $92E6: 29 03     AND #$03
  $92E8: AA        TAX
  $92E9: C9 01     CMP #$01
  $92EB: D0 0A     BNE $92f7
  $92ED: A0 03     LDY #$03
  $92EF: B1 5D     LDA ($5d),Y
  $92F1: C9 16     CMP #$16
  $92F3: D0 02     BNE $92f7
  $92F5: A2 03     LDX #$03
  $92F7: 86 00     STX $00
  $92F9: 8A        TXA
  $92FA: 0A        ASL A
  $92FB: 0A        ASL A
  $92FC: 65 00     ADC $00
  $92FE: 6D 2F 06  ADC $062f
  $9301: A8        TAY
  $9302: B9 09 93  LDA $9309,Y
  $9305: 20 EC AD  JSR $adec
  $9308: 60        RTS
  $9309: 63 66     RRA ($66,X)
  $930B: 65 62     ADC $62
  $930D: 64 5C     NOP $5c
  $930F: 61 5B     ADC ($5b,X)
  $9311: 5B 60 69  SRE $6960,Y
  $9314: 6B 68     ARR #$68
  $9316: 67 6A     RRA $6a
  $9318: A6 A7     LDX $a7
  $931A: A8        TAY
  $931B: A8        TAY
  $931C: A9 A9     LDA #$a9
  $931E: 00        BRK
  $931F: 8D DE 03  STA $03de
  $9322: AD 2F 06  LDA $062f
  $9325: 20 4D 83  JSR $834d
  $9328: 63 93     RRA ($93,X)
  $932A: 86 93     STX $93
  $932C: 89 93     NOP #$93
  $932E: 95 93     STA $93,X
  $9330: B1 93     LDA ($93),Y
  $9332: AD E3 05  LDA $05e3
  $9335: 49 01     EOR #$01
  $9337: 8D E3 05  STA $05e3
  $933A: 4A        LSR A
  $933B: 90 02     BCC $933f
  $933D: A9 0B     LDA #$0b
  $933F: 85 00     STA $00
  $9341: AD BB 05  LDA $05bb
  $9344: 29 0F     AND #$0f
  $9346: C9 09     CMP #$09
  $9348: 90 02     BCC $934c
  $934A: E9 09     SBC #$09
  $934C: 38        SEC
  $934D: 65 00     ADC $00
  $934F: 8D B9 05  STA $05b9
  $9352: 20 30 9A  JSR $9a30
  $9355: A9 00     LDA #$00
  $9357: 8D D2 05  STA $05d2
  $935A: 20 70 86  JSR $8670
  $935D: A9 06     LDA #$06
  $935F: 20 F4 86  JSR $86f4
  $9362: 60        RTS
  $9363: AE E3 05  LDX $05e3
  $9366: D0 03     BNE $936b
  $9368: 8E 35 07  STX $0735
  $936B: FE E0 05  INC $05e0,X
  $936E: 8A        TXA
  $936F: 49 01     EOR #$01
  $9371: 8D E3 05  STA $05e3
  $9374: 20 1E 86  JSR $861e
  $9377: A2 34     LDX #$34
  $9379: 20 95 82  JSR $8295
  $937C: A9 01     LDA #$01
  $937E: 20 F4 86  JSR $86f4
  $9381: A9 01     LDA #$01
  $9383: 85 94     STA $94
  $9385: 60        RTS
  $9386: 4C 9E 93  JMP $939e
  $9389: 20 CB 93  JSR $93cb
  $938C: 20 B7 93  JSR $93b7
  $938F: A9 0F     LDA #$0f
  $9391: 20 F4 86  JSR $86f4
  $9394: 60        RTS
  $9395: AD D3 05  LDA $05d3
  $9398: 29 03     AND #$03
  $939A: C9 01     CMP #$01
  $939C: F0 EB     BEQ $9389
  $939E: 20 CB 93  JSR $93cb
  $93A1: A9 00     LDA #$00
  $93A3: 8D 9C 06  STA $069c
  $93A6: A9 01     LDA #$01
  $93A8: 8D E7 05  STA $05e7
  $93AB: A9 3F     LDA #$3f
  $93AD: 20 EC AD  JSR $adec
  $93B0: 60        RTS
  $93B1: A9 0F     LDA #$0f
  $93B3: 20 F4 86  JSR $86f4
  $93B6: 60        RTS
  $93B7: AD BB 05  LDA $05bb
  $93BA: C9 C0     CMP #$c0
  $93BC: 90 0C     BCC $93ca
  $93BE: 20 0F 91  JSR $910f
  $93C1: 20 6F AB  JSR $ab6f
  $93C4: A0 11     LDY #$11
  $93C6: A9 0A     LDA #$0a
  $93C8: 91 5D     STA ($5d),Y
  $93CA: 60        RTS
  $93CB: AD 53 06  LDA $0653
  $93CE: D0 35     BNE $9405
  $93D0: AD 9F 05  LDA $059f
  $93D3: 20 6F AB  JSR $ab6f
  $93D6: A0 03     LDY #$03
  $93D8: B1 5D     LDA ($5d),Y
  $93DA: C9 14     CMP #$14
  $93DC: D0 27     BNE $9405
  $93DE: A0 0E     LDY #$0e
  $93E0: B1 5D     LDA ($5d),Y
  $93E2: C9 0B     CMP #$0b
  $93E4: 90 1F     BCC $9405
  $93E6: AD 99 06  LDA $0699
  $93E9: C9 09     CMP #$09
  $93EB: D0 18     BNE $9405
  $93ED: 20 AD AA  JSR $aaad
  $93F0: 20 2C 9E  JSR $9e2c
  $93F3: AD 9C 06  LDA $069c
  $93F6: F0 0D     BEQ $9405
  $93F8: E6 3B     INC $3b
  $93FA: A5 3B     LDA $3b
  $93FC: C9 02     CMP #$02
  $93FE: D0 05     BNE $9405
  $9400: A9 81     LDA #$81
  $9402: 8D 53 06  STA $0653
  $9405: AD E3 05  LDA $05e3
  $9408: D0 44     BNE $944e
  $940A: AD 35 07  LDA $0735
  $940D: 30 3F     BMI $944e
  $940F: AD 99 06  LDA $0699
  $9412: C9 05     CMP #$05
  $9414: 90 38     BCC $944e
  $9416: AD DD 03  LDA $03dd
  $9419: 29 02     AND #$02
  $941B: F0 31     BEQ $944e
  $941D: A2 00     LDX #$00
  $941F: 8A        TXA
  $9420: 20 6F AB  JSR $ab6f
  $9423: A0 03     LDY #$03
  $9425: B1 5D     LDA ($5d),Y
  $9427: C9 01     CMP #$01
  $9429: F0 07     BEQ $9432
  $942B: E8        INX
  $942C: E0 0B     CPX #$0b
  $942E: D0 EF     BNE $941f
  $9430: F0 1C     BEQ $944e
  $9432: A0 0E     LDY #$0e
  $9434: B1 5D     LDA ($5d),Y
  $9436: C9 0D     CMP #$0d
  $9438: 90 14     BCC $944e
  $943A: EE 35 07  INC $0735
  $943D: AD 35 07  LDA $0735
  $9440: C9 03     CMP #$03
  $9442: D0 0A     BNE $944e
  $9444: A9 80     LDA #$80
  $9446: 8D 35 07  STA $0735
  $9449: A9 00     LDA #$00
  $944B: 8D 36 07  STA $0736
  $944E: 20 0F 91  JSR $910f
  $9451: 8D 9F 05  STA $059f
  $9454: A2 35     LDX #$35
  $9456: 20 95 82  JSR $8295
  $9459: 60        RTS
  $945A: AD 9F 05  LDA $059f
  $945D: 20 6F AB  JSR $ab6f
  $9460: A0 0E     LDY #$0e
  $9462: B1 5D     LDA ($5d),Y
  $9464: C9 07     CMP #$07
  $9466: 90 02     BCC $946a
  $9468: A9 07     LDA #$07
  $946A: 18        CLC
  $946B: 69 04     ADC #$04
  $946D: 60        RTS
  $946E: 48        PHA
  $946F: AD 9F 05  LDA $059f
  $9472: 20 6F AB  JSR $ab6f
  $9475: 20 AD AA  JSR $aaad
  $9478: AD E2 05  LDA $05e2
  $947B: 8D B3 05  STA $05b3
  $947E: A9 00     LDA #$00
  $9480: 8D A7 05  STA $05a7
  $9483: 8D B7 05  STA $05b7
  $9486: AD E3 05  LDA $05e3
  $9489: F0 02     BEQ $948d
  $948B: A9 0B     LDA #$0b
  $948D: 8D B4 05  STA $05b4
  $9490: A2 0A     LDX #$0a
  $9492: 68        PLA
  $9493: A8        TAY
  $9494: F0 0C     BEQ $94a2
  $9496: 88        DEY
  $9497: F0 04     BEQ $949d
  $9499: A2 02     LDX #$02
  $949B: D0 05     BNE $94a2
  $949D: 8A        TXA
  $949E: 4A        LSR A
  $949F: 8D B7 05  STA $05b7
  $94A2: 8E B5 05  STX $05b5
  $94A5: A9 01     LDA #$01
  $94A7: 85 88     STA $88
  $94A9: 60        RTS
  $94AA: AD E4 03  LDA $03e4
  $94AD: 20 4D 83  JSR $834d
  $94B0: BA        TSX
  $94B1: 94 C6     STY $c6,X
  $94B3: 94 E0     STY $e0,X
  $94B5: 94 E9     STY $e9,X
  $94B7: 94 21     STY $21,X
  $94B9: 95 A9     STA $a9,X
  $94BB: 00        BRK
  $94BC: 8D B6 05  STA $05b6
  $94BF: 20 6E 94  JSR $946e
  $94C2: EE E4 03  INC $03e4
  $94C5: 60        RTS
  $94C6: 20 2C 97  JSR $972c
  $94C9: 20 02 97  JSR $9702
  $94CC: A9 04     LDA #$04
  $94CE: 8D A7 05  STA $05a7
  $94D1: A9 00     LDA #$00
  $94D3: 8D B3 05  STA $05b3
  $94D6: 8D B4 05  STA $05b4
  $94D9: 20 62 B2  JSR $b262
  $94DC: EE E4 03  INC $03e4
  $94DF: 60        RTS
  $94E0: A9 16     LDA #$16
  $94E2: 20 54 B2  JSR $b254
  $94E5: EE E4 03  INC $03e4
  $94E8: 60        RTS
  $94E9: AD 41 00  LDA $0041
  $94EC: F0 01     BEQ $94ef
  $94EE: 60        RTS
  $94EF: A9 02     LDA #$02
  $94F1: 20 73 83  JSR $8373
  $94F4: A2 1C     LDX #$1c
  $94F6: A9 0B     LDA #$0b
  $94F8: 85 01     STA $01
  $94FA: A5 01     LDA $01
  $94FC: A0 00     LDY #$00
  $94FE: 20 58 96  JSR $9658
  $9501: E6 01     INC $01
  $9503: A5 01     LDA $01
  $9505: C9 16     CMP #$16
  $9507: D0 F1     BNE $94fa
  $9509: A9 00     LDA #$00
  $950B: 8D 2D 06  STA $062d
  $950E: 8D 2E 06  STA $062e
  $9511: A9 05     LDA #$05
  $9513: 85 1B     STA $1b
  $9515: 20 4E 95  JSR $954e
  $9518: A9 04     LDA #$04
  $951A: 20 58 B4  JSR $b458
  $951D: EE E4 03  INC $03e4
  $9520: 60        RTS
  $9521: CE 2D 06  DEC $062d
  $9524: 10 0D     BPL $9533
  $9526: A9 03     LDA #$03
  $9528: 8D 2D 06  STA $062d
  $952B: AD 2E 06  LDA $062e
  $952E: 49 01     EOR #$01
  $9530: 8D 2E 06  STA $062e
  $9533: A2 08     LDX #$08
  $9535: AD 9F 05  LDA $059f
  $9538: A0 02     LDY #$02
  $953A: 20 58 96  JSR $9658
  $953D: AD B4 05  LDA $05b4
  $9540: F0 08     BEQ $954a
  $9542: AD B9 05  LDA $05b9
  $9545: A0 01     LDY #$01
  $9547: 20 58 96  JSR $9658
  $954A: 20 75 95  JSR $9575
  $954D: 60        RTS
  $954E: A2 00     LDX #$00
  $9550: A0 00     LDY #$00
  $9552: 8A        TXA
  $9553: 29 03     AND #$03
  $9555: F0 07     BEQ $955e
  $9557: B9 69 95  LDA $9569,Y
  $955A: 9D 28 03  STA $0328,X
  $955D: C8        INY
  $955E: E8        INX
  $955F: E0 10     CPX #$10
  $9561: D0 EF     BNE $9552
  $9563: 20 71 84  JSR $8471
  $9566: 15 03     ORA $03,X
  $9568: 60        RTS
  $9569: 0F 30 30  SLO $3030
  $956C: 0F 21 36  SLO $3621
  $956F: 0F 38 26  SLO $2638
  $9572: 0F 10 36  SLO $3610
  $9575: AD E6 03  LDA $03e6
  $9578: F0 01     BEQ $957b
  $957A: 60        RTS
  $957B: A9 40     LDA #$40
  $957D: 20 E0 83  JSR $83e0
  $9580: F0 06     BEQ $9588
  $9582: A9 04     LDA #$04
  $9584: 20 F4 86  JSR $86f4
  $9587: 60        RTS
  $9588: A9 80     LDA #$80
  $958A: 20 E0 83  JSR $83e0
  $958D: F0 18     BEQ $95a7
  $958F: AD B4 05  LDA $05b4
  $9592: F0 13     BEQ $95a7
  $9594: A9 80     LDA #$80
  $9596: CD BB 05  CMP $05bb
  $9599: A9 00     LDA #$00
  $959B: 69 00     ADC #$00
  $959D: 8D 95 05  STA $0595
  $95A0: 20 EF 95  JSR $95ef
  $95A3: 20 6F 8F  JSR $8f6f
  $95A6: 60        RTS
  $95A7: A9 0C     LDA #$0c
  $95A9: 20 E0 83  JSR $83e0
  $95AC: F0 F8     BEQ $95a6
  $95AE: 29 0C     AND #$0c
  $95B0: F0 F4     BEQ $95a6
  $95B2: AE B4 05  LDX $05b4
  $95B5: D0 05     BNE $95bc
  $95B7: EE B4 05  INC $05b4
  $95BA: D0 17     BNE $95d3
  $95BC: AC B3 05  LDY $05b3
  $95BF: 84 00     STY $00
  $95C1: 29 04     AND #$04
  $95C3: F0 07     BEQ $95cc
  $95C5: C0 03     CPY #$03
  $95C7: F0 07     BEQ $95d0
  $95C9: C8        INY
  $95CA: D0 04     BNE $95d0
  $95CC: 98        TYA
  $95CD: F0 01     BEQ $95d0
  $95CF: 88        DEY
  $95D0: 8C B3 05  STY $05b3
  $95D3: AE B3 05  LDX $05b3
  $95D6: BD A8 05  LDA $05a8,X
  $95D9: 8D B9 05  STA $05b9
  $95DC: A5 00     LDA $00
  $95DE: 18        CLC
  $95DF: 20 CA 9B  JSR $9bca
  $95E2: AD B3 05  LDA $05b3
  $95E5: 38        SEC
  $95E6: 20 CA 9B  JSR $9bca
  $95E9: A9 06     LDA #$06
  $95EB: 20 58 B4  JSR $b458
  $95EE: 60        RTS
  $95EF: A9 00     LDA #$00
  $95F1: 8D 9C 06  STA $069c
  $95F4: AD 93 05  LDA $0593
  $95F7: C9 02     CMP #$02
  $95F9: D0 39     BNE $9634
  $95FB: AD 9F 05  LDA $059f
  $95FE: 20 35 96  JSR $9635
  $9601: C9 90     CMP #$90
  $9603: F0 04     BEQ $9609
  $9605: C9 80     CMP #$80
  $9607: D0 2B     BNE $9634
  $9609: AD B9 05  LDA $05b9
  $960C: 20 35 96  JSR $9635
  $960F: C9 92     CMP #$92
  $9611: F0 08     BEQ $961b
  $9613: C9 82     CMP #$82
  $9615: F0 04     BEQ $961b
  $9617: C9 72     CMP #$72
  $9619: D0 19     BNE $9634
  $961B: A9 80     LDA #$80
  $961D: AE E3 05  LDX $05e3
  $9620: D0 02     BNE $9624
  $9622: A9 20     LDA #$20
  $9624: CD BB 05  CMP $05bb
  $9627: A9 00     LDA #$00
  $9629: 69 00     ADC #$00
  $962B: 8D 9C 06  STA $069c
  $962E: 8D 95 05  STA $0595
  $9631: EE 9C 06  INC $069c
  $9634: 60        RTS
  $9635: 20 6F AB  JSR $ab6f
  $9638: 20 AD AA  JSR $aaad
  $963B: AE E3 05  LDX $05e3
  $963E: F0 03     BEQ $9643
  $9640: 20 9C AA  JSR $aa9c
  $9643: AA        TAX
  $9644: 29 F0     AND #$f0
  $9646: 85 00     STA $00
  $9648: 8A        TXA
  $9649: 29 0F     AND #$0f
  $964B: C9 03     CMP #$03
  $964D: 90 06     BCC $9655
  $964F: 49 0F     EOR #$0f
  $9651: 69 05     ADC #$05
  $9653: 29 0F     AND #$0f
  $9655: 05 00     ORA $00
  $9657: 60        RTS
  $9658: C0 02     CPY #$02
  $965A: 08        PHP
  $965B: 84 00     STY $00
  $965D: 20 6F AB  JSR $ab6f
  $9660: A5 00     LDA $00
  $9662: F0 02     BEQ $9666
  $9664: A9 40     LDA #$40
  $9666: 85 04     STA $04
  $9668: A0 09     LDY #$09
  $966A: B1 5D     LDA ($5d),Y
  $966C: 18        CLC
  $966D: 69 1C     ADC #$1c
  $966F: 9D 00 02  STA $0200,X
  $9672: 28        PLP
  $9673: 08        PHP
  $9674: D0 03     BNE $9679
  $9676: 9D 08 02  STA $0208,X
  $9679: 38        SEC
  $967A: E9 08     SBC #$08
  $967C: 9D 04 02  STA $0204,X
  $967F: A0 0D     LDY #$0d
  $9681: B1 5D     LDA ($5d),Y
  $9683: 18        CLC
  $9684: 69 2C     ADC #$2c
  $9686: 9D 03 02  STA $0203,X
  $9689: 9D 07 02  STA $0207,X
  $968C: 28        PLP
  $968D: 08        PHP
  $968E: D0 06     BNE $9696
  $9690: 20 CC 96  JSR $96cc
  $9693: 9D 0B 02  STA $020b,X
  $9696: A9 2A     LDA #$2a
  $9698: 9D 01 02  STA $0201,X
  $969B: A9 28     LDA #$28
  $969D: 9D 05 02  STA $0205,X
  $96A0: A9 03     LDA #$03
  $96A2: A4 00     LDY $00
  $96A4: F0 05     BEQ $96ab
  $96A6: 98        TYA
  $96A7: 38        SEC
  $96A8: ED 2E 06  SBC $062e
  $96AB: 05 04     ORA $04
  $96AD: 9D 02 02  STA $0202,X
  $96B0: 9D 06 02  STA $0206,X
  $96B3: A9 08     LDA #$08
  $96B5: 28        PLP
  $96B6: D0 0C     BNE $96c4
  $96B8: A9 00     LDA #$00
  $96BA: 9D 0A 02  STA $020a,X
  $96BD: A9 AC     LDA #$ac
  $96BF: 9D 09 02  STA $0209,X
  $96C2: A9 0C     LDA #$0c
  $96C4: 85 00     STA $00
  $96C6: 8A        TXA
  $96C7: 18        CLC
  $96C8: 65 00     ADC $00
  $96CA: AA        TAX
  $96CB: 60        RTS
  $96CC: 85 03     STA $03
  $96CE: 38        SEC
  $96CF: E9 2C     SBC #$2c
  $96D1: 29 F0     AND #$f0
  $96D3: 85 02     STA $02
  $96D5: AD B4 05  LDA $05b4
  $96D8: D0 0B     BNE $96e5
  $96DA: AC 93 05  LDY $0593
  $96DD: C0 02     CPY #$02
  $96DF: 38        SEC
  $96E0: D0 12     BNE $96f4
  $96E2: 18        CLC
  $96E3: 90 0F     BCC $96f4
  $96E5: AD B9 05  LDA $05b9
  $96E8: 20 6F AB  JSR $ab6f
  $96EB: A0 0D     LDY #$0d
  $96ED: B1 5D     LDA ($5d),Y
  $96EF: 29 F0     AND #$f0
  $96F1: 38        SEC
  $96F2: E5 02     SBC $02
  $96F4: A9 04     LDA #$04
  $96F6: B0 06     BCS $96fe
  $96F8: A9 00     LDA #$00
  $96FA: 85 04     STA $04
  $96FC: A9 F8     LDA #$f8
  $96FE: 18        CLC
  $96FF: 65 03     ADC $03
  $9701: 60        RTS
  $9702: AD BB 05  LDA $05bb
  $9705: 29 0F     AND #$0f
  $9707: F0 22     BEQ $972b
  $9709: A8        TAY
  $970A: AD A7 05  LDA $05a7
  $970D: 85 00     STA $00
  $970F: C6 00     DEC $00
  $9711: F0 18     BEQ $972b
  $9713: A2 00     LDX #$00
  $9715: BD A8 05  LDA $05a8,X
  $9718: 48        PHA
  $9719: BD A9 05  LDA $05a9,X
  $971C: 9D A8 05  STA $05a8,X
  $971F: E8        INX
  $9720: C6 00     DEC $00
  $9722: D0 F5     BNE $9719
  $9724: 68        PLA
  $9725: 9D A8 05  STA $05a8,X
  $9728: 88        DEY
  $9729: D0 DF     BNE $970a
  $972B: 60        RTS
  $972C: A9 01     LDA #$01
  $972E: 85 00     STA $00
  $9730: AD B4 05  LDA $05b4
  $9733: CD 9F 05  CMP $059f
  $9736: F0 15     BEQ $974d
  $9738: AE E3 05  LDX $05e3
  $973B: F0 03     BEQ $9740
  $973D: 38        SEC
  $973E: E9 0B     SBC #$0b
  $9740: AA        TAX
  $9741: F0 0A     BEQ $974d
  $9743: C9 0B     CMP #$0b
  $9745: F0 10     BEQ $9757
  $9747: AD B4 05  LDA $05b4
  $974A: 20 37 98  JSR $9837
  $974D: EE B4 05  INC $05b4
  $9750: C6 00     DEC $00
  $9752: D0 DC     BNE $9730
  $9754: 68        PLA
  $9755: 68        PLA
  $9756: 60        RTS
  $9757: A9 00     LDA #$00
  $9759: 8D 88 00  STA $0088
  $975C: 60        RTS
  $975D: AD E4 03  LDA $03e4
  $9760: 20 4D 83  JSR $834d
  $9763: 77 97     RRA $97,X
  $9765: A9 97     LDA #$97
  $9767: 9D 97 77  STA $7797,X
  $976A: 89 E1     NOP #$e1
  $976C: 8A        TXA
  $976D: CE 89 D7  DEC $d789
  $9770: 89 30     NOP #$30
  $9772: 8A        TXA
  $9773: FF 97 23  ISB $2397,X
  $9776: 98        TYA
  $9777: AE 9C 06  LDX $069c
  $977A: F0 0F     BEQ $978b
  $977C: AD B9 05  LDA $05b9
  $977F: 8D 9F 05  STA $059f
  $9782: 20 4C AA  JSR $aa4c
  $9785: A9 10     LDA #$10
  $9787: 20 F4 86  JSR $86f4
  $978A: 60        RTS
  $978B: AD 94 05  LDA $0594
  $978E: 8D B4 05  STA $05b4
  $9791: A9 00     LDA #$00
  $9793: 8D A7 05  STA $05a7
  $9796: 8D C1 05  STA $05c1
  $9799: EE E4 03  INC $03e4
  $979C: 60        RTS
  $979D: AD 96 05  LDA $0596
  $97A0: 09 0C     ORA #$0c
  $97A2: 8D 96 05  STA $0596
  $97A5: CE E4 03  DEC $03e4
  $97A8: 60        RTS
  $97A9: AD 83 05  LDA $0583
  $97AC: 29 02     AND #$02
  $97AE: D0 2A     BNE $97da
  $97B0: 20 DB 97  JSR $97db
  $97B3: A9 16     LDA #$16
  $97B5: 20 6F AB  JSR $ab6f
  $97B8: 20 5E AA  JSR $aa5e
  $97BB: 20 61 AA  JSR $aa61
  $97BE: 20 AD AA  JSR $aaad
  $97C1: AD E2 05  LDA $05e2
  $97C4: CD B8 05  CMP $05b8
  $97C7: F0 0B     BEQ $97d4
  $97C9: CD B4 05  CMP $05b4
  $97CC: F0 EA     BEQ $97b8
  $97CE: 8D B4 05  STA $05b4
  $97D1: 4C D7 97  JMP $97d7
  $97D4: EE E4 03  INC $03e4
  $97D7: EE E4 03  INC $03e4
  $97DA: 60        RTS
  $97DB: AE C1 05  LDX $05c1
  $97DE: F0 1E     BEQ $97fe
  $97E0: CA        DEX
  $97E1: F0 0F     BEQ $97f2
  $97E3: E8        INX
  $97E4: 86 00     STX $00
  $97E6: AD BB 05  LDA $05bb
  $97E9: AA        TAX
  $97EA: C5 00     CMP $00
  $97EC: 90 04     BCC $97f2
  $97EE: E5 00     SBC $00
  $97F0: B0 F7     BCS $97e9
  $97F2: BD C2 05  LDA $05c2,X
  $97F5: AE A7 05  LDX $05a7
  $97F8: 9D A8 05  STA $05a8,X
  $97FB: EE A7 05  INC $05a7
  $97FE: 60        RTS
  $97FF: AD 94 05  LDA $0594
  $9802: 20 2C 9E  JSR $9e2c
  $9805: AE 95 05  LDX $0595
  $9808: AD 9C 06  LDA $069c
  $980B: F0 10     BEQ $981d
  $980D: E8        INX
  $980E: 8E 9C 06  STX $069c
  $9811: AD B9 05  LDA $05b9
  $9814: 8D 9F 05  STA $059f
  $9817: A9 10     LDA #$10
  $9819: 20 F4 86  JSR $86f4
  $981C: 60        RTS
  $981D: A9 6C     LDA #$6c
  $981F: 20 EC AD  JSR $adec
  $9822: 60        RTS
  $9823: AD B9 05  LDA $05b9
  $9826: 8D 9F 05  STA $059f
  $9829: A9 03     LDA #$03
  $982B: 20 F4 86  JSR $86f4
  $982E: 20 1C AA  JSR $aa1c
  $9831: A9 00     LDA #$00
  $9833: 8D D5 05  STA $05d5
  $9836: 60        RTS
  $9837: 20 6F AB  JSR $ab6f
  $983A: 20 AD AA  JSR $aaad
  $983D: A9 00     LDA #$00
  $983F: 85 02     STA $02
  $9841: 38        SEC
  $9842: 20 80 98  JSR $9880
  $9845: 18        CLC
  $9846: 20 80 98  JSR $9880
  $9849: AE B4 05  LDX $05b4
  $984C: AD E3 05  LDA $05e3
  $984F: F0 24     BEQ $9875
  $9851: AD 93 05  LDA $0593
  $9854: C9 02     CMP #$02
  $9856: F0 1D     BEQ $9875
  $9858: AD B3 05  LDA $05b3
  $985B: 29 F0     AND #$f0
  $985D: 85 01     STA $01
  $985F: AD E2 05  LDA $05e2
  $9862: 29 F0     AND #$f0
  $9864: 38        SEC
  $9865: E5 01     SBC $01
  $9867: F0 0C     BEQ $9875
  $9869: 08        PHP
  $986A: 68        PLA
  $986B: E0 0B     CPX #$0b
  $986D: 90 02     BCC $9871
  $986F: 49 01     EOR #$01
  $9871: 48        PHA
  $9872: 28        PLP
  $9873: 90 0A     BCC $987f
  $9875: 8A        TXA
  $9876: AE A7 05  LDX $05a7
  $9879: 9D A8 05  STA $05a8,X
  $987C: EE A7 05  INC $05a7
  $987F: 60        RTS
  $9880: 08        PHP
  $9881: AD B3 05  LDA $05b3
  $9884: 90 04     BCC $988a
  $9886: 4A        LSR A
  $9887: 4A        LSR A
  $9888: 4A        LSR A
  $9889: 4A        LSR A
  $988A: 29 0F     AND #$0f
  $988C: 85 01     STA $01
  $988E: 28        PLP
  $988F: AD E2 05  LDA $05e2
  $9892: 90 04     BCC $9898
  $9894: 4A        LSR A
  $9895: 4A        LSR A
  $9896: 4A        LSR A
  $9897: 4A        LSR A
  $9898: 29 0F     AND #$0f
  $989A: 38        SEC
  $989B: E5 01     SBC $01
  $989D: B0 04     BCS $98a3
  $989F: 49 FF     EOR #$ff
  $98A1: 69 01     ADC #$01
  $98A3: CD B7 05  CMP $05b7
  $98A6: F0 0B     BEQ $98b3
  $98A8: 90 07     BCC $98b1
  $98AA: CD B5 05  CMP $05b5
  $98AD: F0 04     BEQ $98b3
  $98AF: 90 02     BCC $98b3
  $98B1: 68        PLA
  $98B2: 68        PLA
  $98B3: 60        RTS
  $98B4: 4C 6F 8F  JMP $8f6f
  $98B7: AD E4 03  LDA $03e4
  $98BA: 20 4D 83  JSR $834d
  $98BD: C5 98     CMP $98
  $98BF: 07 99     SLO $99
  $98C1: 67 8A     RRA $8a
  $98C3: DE 99 A9  DEC $a999,X
  $98C6: 06 20     ASL $20
  $98C8: EC AD A9  CPX $a9ad
  $98CB: 20 8D A0  JSR $a08d
  $98CE: 05 A9     ORA $a9
  $98D0: 00        BRK
  $98D1: 8D A2 05  STA $05a2
  $98D4: 8D C1 05  STA $05c1
  $98D7: 8D 9C 06  STA $069c
  $98DA: A9 00     LDA #$00
  $98DC: 20 A8 B4  JSR $b4a8
  $98DF: AD 96 05  LDA $0596
  $98E2: 09 10     ORA #$10
  $98E4: 8D 96 05  STA $0596
  $98E7: AD 9F 05  LDA $059f
  $98EA: 20 6F AB  JSR $ab6f
  $98ED: 20 AD AA  JSR $aaad
  $98F0: AD E2 05  LDA $05e2
  $98F3: 8D F9 05  STA $05f9
  $98F6: A0 11     LDY #$11
  $98F8: A9 00     LDA #$00
  $98FA: 91 5D     STA ($5d),Y
  $98FC: A9 80     LDA #$80
  $98FE: 20 58 B4  JSR $b458
  $9901: A9 01     LDA #$01
  $9903: 8D 30 06  STA $0630
  $9906: 60        RTS
  $9907: 20 E2 86  JSR $86e2
  $990A: AD 30 06  LDA $0630
  $990D: F0 0F     BEQ $991e
  $990F: A9 00     LDA #$00
  $9911: 8D 30 06  STA $0630
  $9914: AD E3 05  LDA $05e3
  $9917: D0 05     BNE $991e
  $9919: A9 07     LDA #$07
  $991B: 20 58 B4  JSR $b458
  $991E: A9 00     LDA #$00
  $9920: 8D A1 05  STA $05a1
  $9923: AD D5 05  LDA $05d5
  $9926: D0 0C     BNE $9934
  $9928: AD E3 05  LDA $05e3
  $992B: D0 1A     BNE $9947
  $992D: A9 40     LDA #$40
  $992F: 20 E0 83  JSR $83e0
  $9932: F0 13     BEQ $9947
  $9934: A9 04     LDA #$04
  $9936: 20 F4 86  JSR $86f4
  $9939: AD 96 05  LDA $0596
  $993C: 29 EC     AND #$ec
  $993E: 8D 96 05  STA $0596
  $9941: A9 00     LDA #$00
  $9943: 8D E6 05  STA $05e6
  $9946: 60        RTS
  $9947: 20 8E B4  JSR $b48e
  $994A: AD E3 05  LDA $05e3
  $994D: F0 34     BEQ $9983
  $994F: AD 94 05  LDA $0594
  $9952: CD F9 05  CMP $05f9
  $9955: F0 06     BEQ $995d
  $9957: 8D F9 05  STA $05f9
  $995A: 20 80 9E  JSR $9e80
  $995D: 20 86 9E  JSR $9e86
  $9960: 50 21     BVC $9983
  $9962: AD EA 05  LDA $05ea
  $9965: C9 03     CMP #$03
  $9967: F0 1A     BEQ $9983
  $9969: 8D E7 05  STA $05e7
  $996C: A9 00     LDA #$00
  $996E: 8D 9E 05  STA $059e
  $9971: 8D E6 05  STA $05e6
  $9974: AD 96 05  LDA $0596
  $9977: 29 E0     AND #$e0
  $9979: 8D 96 05  STA $0596
  $997C: 20 62 B2  JSR $b262
  $997F: EE E4 03  INC $03e4
  $9982: 60        RTS
  $9983: AD 43 00  LDA $0043
  $9986: 09 02     ORA #$02
  $9988: 8D 43 00  STA $0043
  $998B: 20 04 9A  JSR $9a04
  $998E: 29 0F     AND #$0f
  $9990: F0 26     BEQ $99b8
  $9992: EE A1 05  INC $05a1
  $9995: 29 03     AND #$03
  $9997: F0 17     BEQ $99b0
  $9999: A2 20     LDX #$20
  $999B: A0 00     LDY #$00
  $999D: 4A        LSR A
  $999E: 90 03     BCC $99a3
  $99A0: 20 64 83  JSR $8364
  $99A3: 18        CLC
  $99A4: 8A        TXA
  $99A5: 6D A5 05  ADC $05a5
  $99A8: 8D A5 05  STA $05a5
  $99AB: 98        TYA
  $99AC: 65 16     ADC $16
  $99AE: 85 16     STA $16
  $99B0: AD 43 00  LDA $0043
  $99B3: 29 FD     AND #$fd
  $99B5: 8D 43 00  STA $0043
  $99B8: AD A0 05  LDA $05a0
  $99BB: F0 04     BEQ $99c1
  $99BD: CE A0 05  DEC $05a0
  $99C0: 60        RTS
  $99C1: A9 20     LDA #$20
  $99C3: 8D A0 05  STA $05a0
  $99C6: 38        SEC
  $99C7: A9 01     LDA #$01
  $99C9: 20 0B AA  JSR $aa0b
  $99CC: 20 04 9A  JSR $9a04
  $99CF: 8D 93 06  STA $0693
  $99D2: A2 03     LDX #$03
  $99D4: AD 9F 05  LDA $059f
  $99D7: 20 A8 86  JSR $86a8
  $99DA: EE 30 06  INC $0630
  $99DD: 60        RTS
  $99DE: AE E7 05  LDX $05e7
  $99E1: BD 1E A5  LDA $a51e,X
  $99E4: 20 F4 86  JSR $86f4
  $99E7: 20 C1 9B  JSR $9bc1
  $99EA: 60        RTS
  $99EB: AD 93 06  LDA $0693
  $99EE: 29 0F     AND #$0f
  $99F0: D0 04     BNE $99f6
  $99F2: A8        TAY
  $99F3: 91 5D     STA ($5d),Y
  $99F5: 60        RTS
  $99F6: AA        TAX
  $99F7: A9 01     LDA #$01
  $99F9: 85 70     STA $70
  $99FB: BD 00 9C  LDA $9c00,X
  $99FE: A2 01     LDX #$01
  $9A00: 20 B3 A7  JSR $a7b3
  $9A03: 60        RTS
  $9A04: AD 01 03  LDA $0301
  $9A07: AE E3 05  LDX $05e3
  $9A0A: F0 1D     BEQ $9a29
  $9A0C: A2 00     LDX #$00
  $9A0E: A0 09     LDY #$09
  $9A10: B1 5D     LDA ($5d),Y
  $9A12: C9 30     CMP #$30
  $9A14: 08        PHP
  $9A15: 90 04     BCC $9a1b
  $9A17: 49 FF     EOR #$ff
  $9A19: 69 5F     ADC #$5f
  $9A1B: C9 2C     CMP #$2c
  $9A1D: B0 06     BCS $9a25
  $9A1F: 28        PLP
  $9A20: 08        PHP
  $9A21: E8        INX
  $9A22: 90 01     BCC $9a25
  $9A24: E8        INX
  $9A25: 28        PLP
  $9A26: 8A        TXA
  $9A27: 09 04     ORA #$04
  $9A29: 60        RTS
  $9A2A: A9 21     LDA #$21
  $9A2C: 20 D2 84  JSR $84d2
  $9A2F: 60        RTS
  $9A30: AE E7 05  LDX $05e7
  $9A33: D0 1B     BNE $9a50
  $9A35: AD 9F 05  LDA $059f
  $9A38: C9 0B     CMP #$0b
  $9A3A: 08        PHP
  $9A3B: 20 6F AB  JSR $ab6f
  $9A3E: A0 0E     LDY #$0e
  $9A40: B1 5D     LDA ($5d),Y
  $9A42: 48        PHA
  $9A43: A0 03     LDY #$03
  $9A45: B1 5D     LDA ($5d),Y
  $9A47: A8        TAY
  $9A48: 68        PLA
  $9A49: 28        PLP
  $9A4A: 20 5D AC  JSR $ac5d
  $9A4D: 4C 62 9A  JMP $9a62
  $9A50: BD 44 9B  LDA $9b44,X
  $9A53: AA        TAX
  $9A54: AD 9F 05  LDA $059f
  $9A57: F0 04     BEQ $9a5d
  $9A59: C9 0B     CMP #$0b
  $9A5B: D0 02     BNE $9a5f
  $9A5D: A2 01     LDX #$01
  $9A5F: 20 C4 AB  JSR $abc4
  $9A62: AD E3 05  LDA $05e3
  $9A65: D0 10     BNE $9a77
  $9A67: AD E7 05  LDA $05e7
  $9A6A: C9 03     CMP #$03
  $9A6C: D0 09     BNE $9a77
  $9A6E: 20 A0 86  JSR $86a0
  $9A71: D0 04     BNE $9a77
  $9A73: 46 6E     LSR $6e
  $9A75: 46 6E     LSR $6e
  $9A77: A9 80     LDA #$80
  $9A79: 85 51     STA $51
  $9A7B: A2 00     LDX #$00
  $9A7D: 86 52     STX $52
  $9A7F: 8E EE 05  STX $05ee
  $9A82: A5 6E     LDA $6e
  $9A84: AC E7 05  LDY $05e7
  $9A87: C0 02     CPY #$02
  $9A89: D0 07     BNE $9a92
  $9A8B: 4A        LSR A
  $9A8C: 18        CLC
  $9A8D: 65 6E     ADC $6e
  $9A8F: 90 01     BCC $9a92
  $9A91: E8        INX
  $9A92: 85 4F     STA $4f
  $9A94: 86 50     STX $50
  $9A96: AD BB 05  LDA $05bb
  $9A99: C9 08     CMP #$08
  $9A9B: B0 07     BCS $9aa4
  $9A9D: EE EE 05  INC $05ee
  $9AA0: 06 51     ASL $51
  $9AA2: 26 52     ROL $52
  $9AA4: C9 81     CMP #$81
  $9AA6: 90 02     BCC $9aaa
  $9AA8: E9 81     SBC #$81
  $9AAA: 18        CLC
  $9AAB: 65 51     ADC $51
  $9AAD: 85 51     STA $51
  $9AAF: 90 02     BCC $9ab3
  $9AB1: E6 52     INC $52
  $9AB3: 20 F9 84  JSR $84f9
  $9AB6: A5 53     LDA $53
  $9AB8: 46 55     LSR $55
  $9ABA: 66 54     ROR $54
  $9ABC: 6A        ROR A
  $9ABD: 46 55     LSR $55
  $9ABF: 66 54     ROR $54
  $9AC1: 6A        ROR A
  $9AC2: 8D EC 05  STA $05ec
  $9AC5: A5 54     LDA $54
  $9AC7: 8D ED 05  STA $05ed
  $9ACA: AD E7 05  LDA $05e7
  $9ACD: F0 1F     BEQ $9aee
  $9ACF: C9 01     CMP #$01
  $9AD1: F0 01     BEQ $9ad4
  $9AD3: 60        RTS
  $9AD4: AD B9 05  LDA $05b9
  $9AD7: 20 6F AB  JSR $ab6f
  $9ADA: 20 AD AA  JSR $aaad
  $9ADD: 8D B8 05  STA $05b8
  $9AE0: 48        PHA
  $9AE1: A9 16     LDA #$16
  $9AE3: 20 6F AB  JSR $ab6f
  $9AE6: 68        PLA
  $9AE7: 20 D8 A7  JSR $a7d8
  $9AEA: 20 C9 A7  JSR $a7c9
  $9AED: 60        RTS
  $9AEE: AD 9F 05  LDA $059f
  $9AF1: 20 82 9B  JSR $9b82
  $9AF4: 85 8A     STA $8a
  $9AF6: 20 0F 91  JSR $910f
  $9AF9: 20 6F AB  JSR $ab6f
  $9AFC: 20 AD AA  JSR $aaad
  $9AFF: A0 00     LDY #$00
  $9B01: AE D5 05  LDX $05d5
  $9B04: D0 04     BNE $9b0a
  $9B06: 49 01     EOR #$01
  $9B08: A0 03     LDY #$03
  $9B0A: 85 89     STA $89
  $9B0C: 8C 31 06  STY $0631
  $9B0F: 20 48 9B  JSR $9b48
  $9B12: A9 16     LDA #$16
  $9B14: 20 6F AB  JSR $ab6f
  $9B17: A5 89     LDA $89
  $9B19: 20 D8 A7  JSR $a7d8
  $9B1C: 48        PHA
  $9B1D: 20 C9 A7  JSR $a7c9
  $9B20: 68        PLA
  $9B21: AA        TAX
  $9B22: 10 03     BPL $9b27
  $9B24: 18        CLC
  $9B25: 69 80     ADC #$80
  $9B27: C9 40     CMP #$40
  $9B29: 90 04     BCC $9b2f
  $9B2B: 49 FF     EOR #$ff
  $9B2D: 29 3F     AND #$3f
  $9B2F: C9 20     CMP #$20
  $9B31: 90 10     BCC $9b43
  $9B33: AD 9F 05  LDA $059f
  $9B36: 20 35 96  JSR $9635
  $9B39: C9 92     CMP #$92
  $9B3B: F0 06     BEQ $9b43
  $9B3D: 4E ED 05  LSR $05ed
  $9B40: 6E EC 05  ROR $05ec
  $9B43: 60        RTS
  $9B44: 06 04     ASL $04
  $9B46: 04 05     NOP $05
  $9B48: A0 11     LDY #$11
  $9B4A: B1 5D     LDA ($5d),Y
  $9B4C: F0 02     BEQ $9b50
  $9B4E: A9 04     LDA #$04
  $9B50: 18        CLC
  $9B51: 6D 31 06  ADC $0631
  $9B54: 38        SEC
  $9B55: E5 8A     SBC $8a
  $9B57: 10 02     BPL $9b5b
  $9B59: A9 00     LDA #$00
  $9B5B: AA        TAX
  $9B5C: A0 02     LDY #$02
  $9B5E: B1 5D     LDA ($5d),Y
  $9B60: 4A        LSR A
  $9B61: 4A        LSR A
  $9B62: 4A        LSR A
  $9B63: 4A        LSR A
  $9B64: A8        TAY
  $9B65: 8A        TXA
  $9B66: 18        CLC
  $9B67: 79 71 9C  ADC $9c71,Y
  $9B6A: C9 07     CMP #$07
  $9B6C: 90 02     BCC $9b70
  $9B6E: A9 07     LDA #$07
  $9B70: AA        TAX
  $9B71: BD 81 9C  LDA $9c81,X
  $9B74: 8D 31 06  STA $0631
  $9B77: 60        RTS
  $9B78: A9 92     LDA #$92
  $9B7A: AE E3 05  LDX $05e3
  $9B7D: F0 02     BEQ $9b81
  $9B7F: A9 02     LDA #$02
  $9B81: 60        RTS
  $9B82: 20 6F AB  JSR $ab6f
  $9B85: A0 0D     LDY #$0d
  $9B87: B1 5D     LDA ($5d),Y
  $9B89: AE E3 05  LDX $05e3
  $9B8C: F0 05     BEQ $9b93
  $9B8E: 49 FF     EOR #$ff
  $9B90: 18        CLC
  $9B91: 69 A0     ADC #$a0
  $9B93: 4A        LSR A
  $9B94: 4A        LSR A
  $9B95: 4A        LSR A
  $9B96: 4A        LSR A
  $9B97: 4A        LSR A
  $9B98: 08        PHP
  $9B99: 85 00     STA $00
  $9B9B: A0 09     LDY #$09
  $9B9D: B1 5D     LDA ($5d),Y
  $9B9F: C9 30     CMP #$30
  $9BA1: 90 04     BCC $9ba7
  $9BA3: 49 FF     EOR #$ff
  $9BA5: 69 5F     ADC #$5f
  $9BA7: 29 F0     AND #$f0
  $9BA9: 4A        LSR A
  $9BAA: 4A        LSR A
  $9BAB: 85 01     STA $01
  $9BAD: 4A        LSR A
  $9BAE: 4A        LSR A
  $9BAF: 65 01     ADC $01
  $9BB1: 65 00     ADC $00
  $9BB3: AA        TAX
  $9BB4: BD 37 9C  LDA $9c37,X
  $9BB7: 28        PLP
  $9BB8: B0 04     BCS $9bbe
  $9BBA: 4A        LSR A
  $9BBB: 4A        LSR A
  $9BBC: 4A        LSR A
  $9BBD: 4A        LSR A
  $9BBE: 29 0F     AND #$0f
  $9BC0: 60        RTS
  $9BC1: AD BB 05  LDA $05bb
  $9BC4: 29 01     AND #$01
  $9BC6: 8D 95 05  STA $0595
  $9BC9: 60        RTS
  $9BCA: 08        PHP
  $9BCB: AE 39 03  LDX $0339
  $9BCE: 0A        ASL A
  $9BCF: A8        TAY
  $9BD0: B9 F1 9B  LDA $9bf1,Y
  $9BD3: 9D 3B 03  STA $033b,X
  $9BD6: B9 F2 9B  LDA $9bf2,Y
  $9BD9: 9D 3C 03  STA $033c,X
  $9BDC: A9 01     LDA #$01
  $9BDE: 9D 3A 03  STA $033a,X
  $9BE1: A9 00     LDA #$00
  $9BE3: 28        PLP
  $9BE4: 90 02     BCC $9be8
  $9BE6: A9 AE     LDA #$ae
  $9BE8: 9D 3D 03  STA $033d,X
  $9BEB: A9 01     LDA #$01
  $9BED: 20 A3 84  JSR $84a3
  $9BF0: 60        RTS
  $9BF1: 8B 22     XAA #$22
  $9BF3: CB 22     AXS #$22
  $9BF5: 0B 23     ANC #$23
  $9BF7: 4B 23     ALR #$23
  $9BF9: 89 22     NOP #$22
  $9BFB: C9 22     CMP #$22
  $9BFD: 09 23     ORA #$23
  $9BFF: 49 23     EOR #$23
  $9C01: 40        RTI
  $9C02: C0 FF     CPY #$ff
  $9C04: 80 60     NOP #$60
  $9C06: A0 FF     LDY #$ff
  $9C08: 00        BRK
  $9C09: 20 E0 FF  JSR $ffe0
  $9C0C: FF FF FF  ISB $ffff,X
  $9C0F: FF 02 04  ISB $0402,X
  $9C12: 04 00     NOP $00
  $9C14: 09 00     ORA #$00
  $9C16: 06 A0     ASL $a0
  $9C18: 00        BRK
  $9C19: 60        RTS
  $9C1A: 00        BRK
  $9C1B: 40        RTI
  $9C1C: 00        BRK
  $9C1D: 00        BRK
  $9C1E: 00        BRK
  $9C1F: 40        RTI
  $9C20: 00        BRK
  $9C21: 3E 00 28  ROL $2800,X
  $9C24: 00        BRK
  $9C25: 00        BRK
  $9C26: 00        BRK
  $9C27: 02        ???
  $9C28: 02        ???
  $9C29: 00        BRK
  $9C2A: 02        ???
  $9C2B: 01 01     ORA ($01,X)
  $9C2D: 00        BRK
  $9C2E: 01 02     ORA ($02,X)
  $9C30: 02        ???
  $9C31: 05 03     ORA $03
  $9C33: 0F 0A 00  SLO $000a
  $9C36: 14 A9     NOP $a9,X
  $9C38: 87 65     SAX $65
  $9C3A: 43 33     SRE ($33,X)
  $9C3C: A9 87     LDA #$87
  $9C3E: 65 43     ADC $43
  $9C40: 22        ???
  $9C41: A9 87     LDA #$87
  $9C43: 65 43     ADC $43
  $9C45: 21 50     AND ($50,X)
  $9C47: 00        BRK
  $9C48: 50 00     BVC $9c4a
  $9C4A: 50 00     BVC $9c4c
  $9C4C: 50 00     BVC $9c4e
  $9C4E: 50 00     BVC $9c50
  $9C50: C8        INY
  $9C51: 00        BRK
  $9C52: 00        BRK
  $9C53: 00        BRK
  $9C54: C8        INY
  $9C55: 00        BRK
  $9C56: C8        INY
  $9C57: 00        BRK
  $9C58: 2C 01 7C  BIT $7c01
  $9C5B: 01 C8     ORA ($c8,X)
  $9C5D: 00        BRK
  $9C5E: 00        BRK
  $9C5F: 00        BRK
  $9C60: 00        BRK
  $9C61: 00        BRK
  $9C62: 78        SEI
  $9C63: 00        BRK
  $9C64: C8        INY
  $9C65: 00        BRK
  $9C66: C8        INY
  $9C67: 00        BRK
  $9C68: FA        NOP
  $9C69: 00        BRK
  $9C6A: 1E 19 00  ASL $0019,X
  $9C6D: 32        ???
  $9C6E: 14 28     NOP $28,X
  $9C70: C8        INY
  $9C71: 0C 0B 0A  NOP $0a0b
  $9C74: 09 08     ORA #$08
  $9C76: 07 06     SLO $06
  $9C78: 05 04     ORA $04
  $9C7A: 03 02     SLO ($02,X)
  $9C7C: 01 00     ORA ($00,X)
  $9C7E: 00        BRK
  $9C7F: 00        BRK
  $9C80: 00        BRK
  $9C81: 00        BRK
  $9C82: 06 0C     ASL $0c
  $9C84: 12        ???
  $9C85: 18        CLC
  $9C86: 1E 24 2A  ASL $2a24,X
  $9C89: 01 01     ORA ($01,X)
  $9C8B: 03 AD     SLO ($ad,X)
  $9C8D: E4 03     CPX $03
  $9C8F: 20 4D 83  JSR $834d
  $9C92: 9A        TXS
  $9C93: 9C C3 9C  SHY $9cc3,X
  $9C96: D1 9C     CMP ($9c),Y
  $9C98: F1 9C     SBC ($9c),Y
  $9C9A: 20 D0 86  JSR $86d0
  $9C9D: AD E3 05  LDA $05e3
  $9CA0: 4A        LSR A
  $9CA1: A9 09     LDA #$09
  $9CA3: 90 02     BCC $9ca7
  $9CA5: 69 0A     ADC #$0a
  $9CA7: 8D 9F 05  STA $059f
  $9CAA: 20 4C AA  JSR $aa4c
  $9CAD: A9 00     LDA #$00
  $9CAF: 20 58 B4  JSR $b458
  $9CB2: A5 94     LDA $94
  $9CB4: F0 07     BEQ $9cbd
  $9CB6: EE E4 03  INC $03e4
  $9CB9: EE E4 03  INC $03e4
  $9CBC: 60        RTS
  $9CBD: A9 39     LDA #$39
  $9CBF: 20 EC AD  JSR $adec
  $9CC2: 60        RTS
  $9CC3: 20 E2 86  JSR $86e2
  $9CC6: A9 80     LDA #$80
  $9CC8: 20 E0 83  JSR $83e0
  $9CCB: F0 03     BEQ $9cd0
  $9CCD: EE E4 03  INC $03e4
  $9CD0: 60        RTS
  $9CD1: AD BB 05  LDA $05bb
  $9CD4: 29 03     AND #$03
  $9CD6: 18        CLC
  $9CD7: 69 05     ADC #$05
  $9CD9: AE E3 05  LDX $05e3
  $9CDC: F0 02     BEQ $9ce0
  $9CDE: 69 0B     ADC #$0b
  $9CE0: 8D B9 05  STA $05b9
  $9CE3: 20 70 86  JSR $8670
  $9CE6: A6 94     LDX $94
  $9CE8: BD EF 9C  LDA $9cef,X
  $9CEB: 20 EC AD  JSR $adec
  $9CEE: 60        RTS
  $9CEF: 59 40 AD  EOR $ad40,Y
  $9CF2: B9 05 8D  LDA $8d05,Y
  $9CF5: 9F 05 A9  ??? $a905,Y
  $9CF8: 03 20     SLO ($20,X)
  $9CFA: F4 86     NOP $86,X
  $9CFC: 60        RTS
  $9CFD: AD E4 03  LDA $03e4
  $9D00: 20 4D 83  JSR $834d
  $9D03: 0B 9D     ANC #$9d
  $9D05: 34 9D     NOP $9d,X
  $9D07: 8D 9D 23  STA $239d
  $9D0A: 9E A9 00  SHX $00a9,Y
  $9D0D: 8D B7 05  STA $05b7
  $9D10: 8D B5 05  STA $05b5
  $9D13: 8D D5 05  STA $05d5
  $9D16: AD BB 05  LDA $05bb
  $9D19: 4A        LSR A
  $9D1A: 4C 1F 9D  JMP $9d1f
  $9D1D: C9 F0     CMP #$f0
  $9D1F: A9 00     LDA #$00
  $9D21: B0 02     BCS $9d25
  $9D23: A9 0B     LDA #$0b
  $9D25: 8D B4 05  STA $05b4
  $9D28: 20 62 B2  JSR $b262
  $9D2B: A9 00     LDA #$00
  $9D2D: 8D A7 05  STA $05a7
  $9D30: EE E4 03  INC $03e4
  $9D33: 60        RTS
  $9D34: A9 16     LDA #$16
  $9D36: 20 6F AB  JSR $ab6f
  $9D39: 18        CLC
  $9D3A: AD 94 05  LDA $0594
  $9D3D: 29 F0     AND #$f0
  $9D3F: F0 0D     BEQ $9d4e
  $9D41: 38        SEC
  $9D42: C9 90     CMP #$90
  $9D44: F0 08     BEQ $9d4e
  $9D46: AD BB 05  LDA $05bb
  $9D49: 29 E0     AND #$e0
  $9D4B: 4C 6C 9D  JMP $9d6c
  $9D4E: 08        PHP
  $9D4F: AD BB 05  LDA $05bb
  $9D52: 29 3E     AND #$3e
  $9D54: 4A        LSR A
  $9D55: 4A        LSR A
  $9D56: C9 05     CMP #$05
  $9D58: 90 04     BCC $9d5e
  $9D5A: E9 05     SBC #$05
  $9D5C: 10 F8     BPL $9d56
  $9D5E: 6A        ROR A
  $9D5F: 6A        ROR A
  $9D60: 6A        ROR A
  $9D61: 6A        ROR A
  $9D62: 28        PLP
  $9D63: 90 04     BCC $9d69
  $9D65: 49 FF     EOR #$ff
  $9D67: 69 00     ADC #$00
  $9D69: 18        CLC
  $9D6A: 69 C0     ADC #$c0
  $9D6C: 20 C9 A7  JSR $a7c9
  $9D6F: AD BB 05  LDA $05bb
  $9D72: 29 03     AND #$03
  $9D74: 18        CLC
  $9D75: 69 04     ADC #$04
  $9D77: 85 00     STA $00
  $9D79: 20 5E AA  JSR $aa5e
  $9D7C: 20 61 AA  JSR $aa61
  $9D7F: C6 00     DEC $00
  $9D81: 10 F6     BPL $9d79
  $9D83: 20 AF AA  JSR $aaaf
  $9D86: 8D B3 05  STA $05b3
  $9D89: EE E4 03  INC $03e4
  $9D8C: 60        RTS
  $9D8D: A9 01     LDA #$01
  $9D8F: 85 00     STA $00
  $9D91: A5 00     LDA $00
  $9D93: 18        CLC
  $9D94: 6D B4 05  ADC $05b4
  $9D97: 85 02     STA $02
  $9D99: 20 6F AB  JSR $ab6f
  $9D9C: 20 AD AA  JSR $aaad
  $9D9F: 20 0F 9E  JSR $9e0f
  $9DA2: E6 00     INC $00
  $9DA4: A5 00     LDA $00
  $9DA6: C9 0B     CMP #$0b
  $9DA8: D0 E7     BNE $9d91
  $9DAA: AD A7 05  LDA $05a7
  $9DAD: F0 18     BEQ $9dc7
  $9DAF: 20 02 97  JSR $9702
  $9DB2: A2 00     LDX #$00
  $9DB4: BD A8 05  LDA $05a8,X
  $9DB7: CD 9A 06  CMP $069a
  $9DBA: F0 05     BEQ $9dc1
  $9DBC: CD 9B 06  CMP $069b
  $9DBF: D0 0A     BNE $9dcb
  $9DC1: E8        INX
  $9DC2: EC A7 05  CPX $05a7
  $9DC5: D0 ED     BNE $9db4
  $9DC7: EE B5 05  INC $05b5
  $9DCA: 60        RTS
  $9DCB: 8D 9F 05  STA $059f
  $9DCE: 20 3A AA  JSR $aa3a
  $9DD1: AD 9F 05  LDA $059f
  $9DD4: A2 00     LDX #$00
  $9DD6: C9 0B     CMP #$0b
  $9DD8: 90 01     BCC $9ddb
  $9DDA: E8        INX
  $9DDB: 8E E3 05  STX $05e3
  $9DDE: 20 1C AA  JSR $aa1c
  $9DE1: 20 C1 9B  JSR $9bc1
  $9DE4: AD 94 05  LDA $0594
  $9DE7: 20 2C 9E  JSR $9e2c
  $9DEA: AD 9C 06  LDA $069c
  $9DED: F0 1A     BEQ $9e09
  $9DEF: AD BB 05  LDA $05bb
  $9DF2: C9 60     CMP #$60
  $9DF4: 90 13     BCC $9e09
  $9DF6: C9 B0     CMP #$b0
  $9DF8: A2 01     LDX #$01
  $9DFA: 90 01     BCC $9dfd
  $9DFC: E8        INX
  $9DFD: 8E 9C 06  STX $069c
  $9E00: 20 70 86  JSR $8670
  $9E03: A9 10     LDA #$10
  $9E05: 20 F4 86  JSR $86f4
  $9E08: 60        RTS
  $9E09: A9 74     LDA #$74
  $9E0B: 20 EC AD  JSR $adec
  $9E0E: 60        RTS
  $9E0F: 18        CLC
  $9E10: 20 80 98  JSR $9880
  $9E13: 38        SEC
  $9E14: 20 80 98  JSR $9880
  $9E17: AE A7 05  LDX $05a7
  $9E1A: A5 02     LDA $02
  $9E1C: 9D A8 05  STA $05a8,X
  $9E1F: EE A7 05  INC $05a7
  $9E22: 60        RTS
  $9E23: 20 70 86  JSR $8670
  $9E26: A9 03     LDA #$03
  $9E28: 20 F4 86  JSR $86f4
  $9E2B: 60        RTS
  $9E2C: AE E3 05  LDX $05e3
  $9E2F: F0 03     BEQ $9e34
  $9E31: 20 9C AA  JSR $aa9c
  $9E34: A2 00     LDX #$00
  $9E36: 8E 9C 06  STX $069c
  $9E39: DD 48 9E  CMP $9e48,X
  $9E3C: F0 06     BEQ $9e44
  $9E3E: E8        INX
  $9E3F: E0 08     CPX #$08
  $9E41: D0 F6     BNE $9e39
  $9E43: 60        RTS
  $9E44: EE 9C 06  INC $069c
  $9E47: 60        RTS
  $9E48: 91 92     STA ($92),Y
  $9E4A: 93 94     ??? ($94),Y
  $9E4C: 81 82     STA ($82,X)
  $9E4E: 83 84     SAX ($84,X)
  $9E50: AD E4 03  LDA $03e4
  $9E53: 20 4D 83  JSR $834d
  $9E56: 5E 9E 64  LSR $649e,X
  $9E59: 9E 58 8A  SHX $8a58,Y
  $9E5C: CF 8A A9  DCP $a98a
  $9E5F: 75 20     ADC $20,X
  $9E61: EC AD 60  CPX $60ad
  $9E64: A9 00     LDA #$00
  $9E66: 8D D5 05  STA $05d5
  $9E69: AD E3 05  LDA $05e3
  $9E6C: F0 07     BEQ $9e75
  $9E6E: 20 80 9E  JSR $9e80
  $9E71: EE E4 03  INC $03e4
  $9E74: 60        RTS
  $9E75: A9 00     LDA #$00
  $9E77: 8D E6 05  STA $05e6
  $9E7A: A9 04     LDA #$04
  $9E7C: 20 F4 86  JSR $86f4
  $9E7F: 60        RTS
  $9E80: A9 80     LDA #$80
  $9E82: 8D E8 05  STA $05e8
  $9E85: 60        RTS
  $9E86: 2C E8 05  BIT $05e8
  $9E89: 50 05     BVC $9e90
  $9E8B: A9 00     LDA #$00
  $9E8D: 8D E8 05  STA $05e8
  $9E90: 60        RTS
  $9E91: AD E8 05  LDA $05e8
  $9E94: D0 01     BNE $9e97
  $9E96: 60        RTS
  $9E97: 10 0A     BPL $9ea3
  $9E99: A9 01     LDA #$01
  $9E9B: 8D E8 05  STA $05e8
  $9E9E: A9 00     LDA #$00
  $9EA0: 8D E9 05  STA $05e9
  $9EA3: AD E9 05  LDA $05e9
  $9EA6: 20 4D 83  JSR $834d
  $9EA9: B5 9E     LDA $9e,X
  $9EAB: 27 9F     RLA $9f
  $9EAD: 46 9F     LSR $9f
  $9EAF: 91 9F     STA ($9f),Y
  $9EB1: A4 9F     LDY $9f
  $9EB3: 3F A0 AD  RLA $ada0,X
  $9EB6: 9F 05 20  ??? $2005,Y
  $9EB9: 6F AB 20  RRA $20ab
  $9EBC: AD AA C9  LDA $c9aa
  $9EBF: 02        ???
  $9EC0: F0 04     BEQ $9ec6
  $9EC2: C9 03     CMP #$03
  $9EC4: D0 04     BNE $9eca
  $9EC6: A9 02     LDA #$02
  $9EC8: D0 4C     BNE $9f16
  $9ECA: A2 01     LDX #$01
  $9ECC: AD 9F 05  LDA $059f
  $9ECF: 20 79 A4  JSR $a479
  $9ED2: 0A        ASL A
  $9ED3: 85 00     STA $00
  $9ED5: 0A        ASL A
  $9ED6: 0A        ASL A
  $9ED7: 65 00     ADC $00
  $9ED9: 85 00     STA $00
  $9EDB: AD 93 05  LDA $0593
  $9EDE: C9 02     CMP #$02
  $9EE0: D0 15     BNE $9ef7
  $9EE2: 85 01     STA $01
  $9EE4: A0 09     LDY #$09
  $9EE6: B1 5D     LDA ($5d),Y
  $9EE8: C9 30     CMP #$30
  $9EEA: 90 04     BCC $9ef0
  $9EEC: 49 FF     EOR #$ff
  $9EEE: 69 5F     ADC #$5f
  $9EF0: 4A        LSR A
  $9EF1: 4A        LSR A
  $9EF2: 4A        LSR A
  $9EF3: 4A        LSR A
  $9EF4: 18        CLC
  $9EF5: 65 01     ADC $01
  $9EF7: 48        PHA
  $9EF8: AD BB 05  LDA $05bb
  $9EFB: 0A        ASL A
  $9EFC: 68        PLA
  $9EFD: 2A        ROL A
  $9EFE: 05 00     ORA $00
  $9F00: A8        TAY
  $9F01: A9 08     LDA #$08
  $9F03: 20 EE 83  JSR $83ee
  $9F06: A8        TAY
  $9F07: AD BB 05  LDA $05bb
  $9F0A: 29 0C     AND #$0c
  $9F0C: 4A        LSR A
  $9F0D: 4A        LSR A
  $9F0E: AA        TAX
  $9F0F: 98        TYA
  $9F10: 2A        ROL A
  $9F11: 2A        ROL A
  $9F12: 2A        ROL A
  $9F13: CA        DEX
  $9F14: 10 FB     BPL $9f11
  $9F16: 29 03     AND #$03
  $9F18: 8D EA 05  STA $05ea
  $9F1B: AA        TAX
  $9F1C: BD 23 9F  LDA $9f23,X
  $9F1F: 8D E9 05  STA $05e9
  $9F22: 60        RTS
  $9F23: 03 01     SLO ($01,X)
  $9F25: 02        ???
  $9F26: 02        ???
  $9F27: AD D5 05  LDA $05d5
  $9F2A: F0 15     BEQ $9f41
  $9F2C: A9 01     LDA #$01
  $9F2E: 20 52 A3  JSR $a352
  $9F31: B0 07     BCS $9f3a
  $9F33: A9 02     LDA #$02
  $9F35: 20 52 A3  JSR $a352
  $9F38: 90 07     BCC $9f41
  $9F3A: A9 02     LDA #$02
  $9F3C: AE BB 05  LDX $05bb
  $9F3F: 10 02     BPL $9f43
  $9F41: A9 03     LDA #$03
  $9F43: 4C 59 A0  JMP $a059
  $9F46: A9 00     LDA #$00
  $9F48: 8D E7 05  STA $05e7
  $9F4B: AD 9F 05  LDA $059f
  $9F4E: 20 82 9B  JSR $9b82
  $9F51: 85 00     STA $00
  $9F53: 20 5A 94  JSR $945a
  $9F56: C5 00     CMP $00
  $9F58: 90 08     BCC $9f62
  $9F5A: 20 71 9F  JSR $9f71
  $9F5D: A9 00     LDA #$00
  $9F5F: 4C 59 A0  JMP $a059
  $9F62: A9 01     LDA #$01
  $9F64: AE EA 05  LDX $05ea
  $9F67: E0 03     CPX #$03
  $9F69: F0 02     BEQ $9f6d
  $9F6B: A9 03     LDA #$03
  $9F6D: 8D E9 05  STA $05e9
  $9F70: 60        RTS
  $9F71: 20 1A 91  JSR $911a
  $9F74: AE 9D 06  LDX $069d
  $9F77: CA        DEX
  $9F78: F0 10     BEQ $9f8a
  $9F7A: 86 00     STX $00
  $9F7C: AD BB 05  LDA $05bb
  $9F7F: 29 0F     AND #$0f
  $9F81: C5 00     CMP $00
  $9F83: 90 05     BCC $9f8a
  $9F85: E5 00     SBC $00
  $9F87: 10 F8     BPL $9f81
  $9F89: AA        TAX
  $9F8A: BD 9E 06  LDA $069e,X
  $9F8D: 8D 99 06  STA $0699
  $9F90: 60        RTS
  $9F91: A2 00     LDX #$00
  $9F93: AD 93 05  LDA $0593
  $9F96: C9 02     CMP #$02
  $9F98: D0 02     BNE $9f9c
  $9F9A: E8        INX
  $9F9B: E8        INX
  $9F9C: 8A        TXA
  $9F9D: 20 6E 94  JSR $946e
  $9FA0: EE E9 05  INC $05e9
  $9FA3: 60        RTS
  $9FA4: 20 2C 97  JSR $972c
  $9FA7: AD A7 05  LDA $05a7
  $9FAA: D0 06     BNE $9fb2
  $9FAC: A9 01     LDA #$01
  $9FAE: 8D E9 05  STA $05e9
  $9FB1: 60        RTS
  $9FB2: A2 02     LDX #$02
  $9FB4: AD 9F 05  LDA $059f
  $9FB7: 20 79 A4  JSR $a479
  $9FBA: 0A        ASL A
  $9FBB: 0A        ASL A
  $9FBC: 0A        ASL A
  $9FBD: 85 00     STA $00
  $9FBF: AD BB 05  LDA $05bb
  $9FC2: 29 07     AND #$07
  $9FC4: 05 00     ORA $00
  $9FC6: A8        TAY
  $9FC7: A9 0A     LDA #$0a
  $9FC9: 20 EE 83  JSR $83ee
  $9FCC: 85 00     STA $00
  $9FCE: 29 0F     AND #$0f
  $9FD0: C9 0F     CMP #$0f
  $9FD2: F0 16     BEQ $9fea
  $9FD4: 18        CLC
  $9FD5: 69 0B     ADC #$0b
  $9FD7: A2 00     LDX #$00
  $9FD9: DD A8 05  CMP $05a8,X
  $9FDC: F0 3D     BEQ $a01b
  $9FDE: E8        INX
  $9FDF: EC A7 05  CPX $05a7
  $9FE2: D0 F5     BNE $9fd9
  $9FE4: A5 00     LDA $00
  $9FE6: 29 10     AND #$10
  $9FE8: F0 C2     BEQ $9fac
  $9FEA: AD BB 05  LDA $05bb
  $9FED: 4A        LSR A
  $9FEE: 90 26     BCC $a016
  $9FF0: A0 09     LDY #$09
  $9FF2: B1 5D     LDA ($5d),Y
  $9FF4: 29 F0     AND #$f0
  $9FF6: F0 1E     BEQ $a016
  $9FF8: C9 50     CMP #$50
  $9FFA: F0 1A     BEQ $a016
  $9FFC: A2 00     LDX #$00
  $9FFE: BD A8 05  LDA $05a8,X
  $A001: 20 6F AB  JSR $ab6f
  $A004: A0 09     LDY #$09
  $A006: B1 5D     LDA ($5d),Y
  $A008: 29 F0     AND #$f0
  $A00A: F0 0F     BEQ $a01b
  $A00C: C9 50     CMP #$50
  $A00E: F0 0B     BEQ $a01b
  $A010: E8        INX
  $A011: EC A7 05  CPX $05a7
  $A014: D0 E8     BNE $9ffe
  $A016: 20 02 97  JSR $9702
  $A019: A2 00     LDX #$00
  $A01B: BD A8 05  LDA $05a8,X
  $A01E: 8D B9 05  STA $05b9
  $A021: AD F8 05  LDA $05f8
  $A024: F0 10     BEQ $a036
  $A026: AD 93 05  LDA $0593
  $A029: C9 02     CMP #$02
  $A02B: F0 09     BEQ $a036
  $A02D: A9 01     LDA #$01
  $A02F: 20 6E 94  JSR $946e
  $A032: EE E9 05  INC $05e9
  $A035: 60        RTS
  $A036: 20 EF 95  JSR $95ef
  $A039: A9 01     LDA #$01
  $A03B: 20 59 A0  JSR $a059
  $A03E: 60        RTS
  $A03F: 20 2C 97  JSR $972c
  $A042: AD A7 05  LDA $05a7
  $A045: F0 09     BEQ $a050
  $A047: 20 02 97  JSR $9702
  $A04A: AD A8 05  LDA $05a8
  $A04D: 8D B9 05  STA $05b9
  $A050: 20 EF 95  JSR $95ef
  $A053: A9 01     LDA #$01
  $A055: 20 59 A0  JSR $a059
  $A058: 60        RTS
  $A059: 8D EA 05  STA $05ea
  $A05C: C9 03     CMP #$03
  $A05E: F0 08     BEQ $a068
  $A060: AD 96 05  LDA $0596
  $A063: 29 EF     AND #$ef
  $A065: 8D 96 05  STA $0596
  $A068: AD E8 05  LDA $05e8
  $A06B: 09 40     ORA #$40
  $A06D: 8D E8 05  STA $05e8
  $A070: 60        RTS
  $A071: AD E4 03  LDA $03e4
  $A074: 20 4D 83  JSR $834d
  $A077: 7F A0 A2  RRA $a2a0,X
  $A07A: A0 3C     LDY #$3c
  $A07C: A1 69     LDA ($69,X)
  $A07E: A1 AD     LDA ($ad,X)
  $A080: C1 05     CMP ($05,X)
  $A082: 18        CLC
  $A083: 69 10     ADC #$10
  $A085: 20 58 B4  JSR $b458
  $A088: A9 08     LDA #$08
  $A08A: 20 58 B4  JSR $b458
  $A08D: A9 00     LDA #$00
  $A08F: 8D E4 05  STA $05e4
  $A092: 8D D2 05  STA $05d2
  $A095: AA        TAX
  $A096: 9D CD 05  STA $05cd,X
  $A099: E8        INX
  $A09A: E0 05     CPX #$05
  $A09C: D0 F8     BNE $a096
  $A09E: EE E4 03  INC $03e4
  $A0A1: 60        RTS
  $A0A2: AD E6 03  LDA $03e6
  $A0A5: F0 01     BEQ $a0a8
  $A0A7: 60        RTS
  $A0A8: A9 0F     LDA #$0f
  $A0AA: 20 E0 83  JSR $83e0
  $A0AD: 29 0F     AND #$0f
  $A0AF: F0 17     BEQ $a0c8
  $A0B1: AA        TAX
  $A0B2: AD E4 05  LDA $05e4
  $A0B5: 30 05     BMI $a0bc
  $A0B7: 09 80     ORA #$80
  $A0B9: 8D E4 05  STA $05e4
  $A0BC: 8A        TXA
  $A0BD: A2 00     LDX #$00
  $A0BF: 4A        LSR A
  $A0C0: B0 03     BCS $a0c5
  $A0C2: E8        INX
  $A0C3: D0 FA     BNE $a0bf
  $A0C5: 8E E5 05  STX $05e5
  $A0C8: A9 40     LDA #$40
  $A0CA: 20 E0 83  JSR $83e0
  $A0CD: 29 40     AND #$40
  $A0CF: 08        PHP
  $A0D0: F0 16     BEQ $a0e8
  $A0D2: AD E4 05  LDA $05e4
  $A0D5: 29 0F     AND #$0f
  $A0D7: 09 40     ORA #$40
  $A0D9: 8D E4 05  STA $05e4
  $A0DC: AE D2 05  LDX $05d2
  $A0DF: BD CD 05  LDA $05cd,X
  $A0E2: 8D E5 05  STA $05e5
  $A0E5: 4C 1B A1  JMP $a11b
  $A0E8: A9 80     LDA #$80
  $A0EA: 20 E0 83  JSR $83e0
  $A0ED: 29 80     AND #$80
  $A0EF: F0 2A     BEQ $a11b
  $A0F1: AE D2 05  LDX $05d2
  $A0F4: AD E4 05  LDA $05e4
  $A0F7: 4A        LSR A
  $A0F8: CA        DEX
  $A0F9: 10 FC     BPL $a0f7
  $A0FB: B0 05     BCS $a102
  $A0FD: AD E4 05  LDA $05e4
  $A100: 10 19     BPL $a11b
  $A102: AE D2 05  LDX $05d2
  $A105: AD E5 05  LDA $05e5
  $A108: 9D CD 05  STA $05cd,X
  $A10B: BD 38 A1  LDA $a138,X
  $A10E: 0D E4 05  ORA $05e4
  $A111: 29 0F     AND #$0f
  $A113: 09 40     ORA #$40
  $A115: 8D E4 05  STA $05e4
  $A118: EE E4 03  INC $03e4
  $A11B: 20 8B A1  JSR $a18b
  $A11E: 28        PLP
  $A11F: F0 16     BEQ $a137
  $A121: AE D2 05  LDX $05d2
  $A124: CA        DEX
  $A125: 10 02     BPL $a129
  $A127: A2 00     LDX #$00
  $A129: 8E D2 05  STX $05d2
  $A12C: BD CD 05  LDA $05cd,X
  $A12F: 8D E5 05  STA $05e5
  $A132: A9 08     LDA #$08
  $A134: 20 58 B4  JSR $b458
  $A137: 60        RTS
  $A138: 01 02     ORA ($02,X)
  $A13A: 04 08     NOP $08
  $A13C: EE D2 05  INC $05d2
  $A13F: AD D2 05  LDA $05d2
  $A142: CD C1 05  CMP $05c1
  $A145: D0 04     BNE $a14b
  $A147: EE E4 03  INC $03e4
  $A14A: 60        RTS
  $A14B: CE E4 03  DEC $03e4
  $A14E: AE D2 05  LDX $05d2
  $A151: AD E4 05  LDA $05e4
  $A154: 4A        LSR A
  $A155: CA        DEX
  $A156: 10 FC     BPL $a154
  $A158: 90 09     BCC $a163
  $A15A: AE D2 05  LDX $05d2
  $A15D: BD CD 05  LDA $05cd,X
  $A160: 8D E5 05  STA $05e5
  $A163: A9 08     LDA #$08
  $A165: 20 58 B4  JSR $b458
  $A168: 60        RTS
  $A169: A9 40     LDA #$40
  $A16B: 20 E0 83  JSR $83e0
  $A16E: 29 40     AND #$40
  $A170: F0 0A     BEQ $a17c
  $A172: CE E4 03  DEC $03e4
  $A175: CE E4 03  DEC $03e4
  $A178: CE D2 05  DEC $05d2
  $A17B: 60        RTS
  $A17C: A9 80     LDA #$80
  $A17E: 20 E0 83  JSR $83e0
  $A181: 29 80     AND #$80
  $A183: F0 05     BEQ $a18a
  $A185: A9 0E     LDA #$0e
  $A187: 20 F4 86  JSR $86f4
  $A18A: 60        RTS
  $A18B: AD E4 05  LDA $05e4
  $A18E: 2C E4 05  BIT $05e4
  $A191: 70 13     BVS $a1a6
  $A193: CE E6 05  DEC $05e6
  $A196: 30 01     BMI $a199
  $A198: 60        RTS
  $A199: A9 0D     LDA #$0d
  $A19B: 8D E6 05  STA $05e6
  $A19E: AD E4 05  LDA $05e4
  $A1A1: 49 10     EOR #$10
  $A1A3: 8D E4 05  STA $05e4
  $A1A6: 18        CLC
  $A1A7: AE E5 05  LDX $05e5
  $A1AA: 29 10     AND #$10
  $A1AC: D0 17     BNE $a1c5
  $A1AE: AE D2 05  LDX $05d2
  $A1B1: AD E4 05  LDA $05e4
  $A1B4: 4A        LSR A
  $A1B5: CA        DEX
  $A1B6: 10 FC     BPL $a1b4
  $A1B8: AE E5 05  LDX $05e5
  $A1BB: B0 08     BCS $a1c5
  $A1BD: 38        SEC
  $A1BE: AD E4 05  LDA $05e4
  $A1C1: 30 02     BMI $a1c5
  $A1C3: A2 04     LDX #$04
  $A1C5: 08        PHP
  $A1C6: 8A        TXA
  $A1C7: 18        CLC
  $A1C8: 69 04     ADC #$04
  $A1CA: AE D2 05  LDX $05d2
  $A1CD: 28        PLP
  $A1CE: 20 E3 A3  JSR $a3e3
  $A1D1: AD E4 05  LDA $05e4
  $A1D4: 29 BF     AND #$bf
  $A1D6: 8D E4 05  STA $05e4
  $A1D9: 60        RTS
  $A1DA: AD E4 03  LDA $03e4
  $A1DD: 20 4D 83  JSR $834d
  $A1E0: EC A1 2A  CPX $2aa1
  $A1E3: A2 5C     LDX #$5c
  $A1E5: A2 73     LDX #$73
  $A1E7: A2 9E     LDX #$9e
  $A1E9: A2 CC     LDX #$cc
  $A1EB: A2 AD     LDX #$ad
  $A1ED: 96 05     STX $05,Y
  $A1EF: 29 04     AND #$04
  $A1F1: F0 01     BEQ $a1f4
  $A1F3: 60        RTS
  $A1F4: A9 00     LDA #$00
  $A1F6: 8D DF 03  STA $03df
  $A1F9: 8D A1 05  STA $05a1
  $A1FC: 8D E6 03  STA $03e6
  $A1FF: 8D F3 03  STA $03f3
  $A202: 85 16     STA $16
  $A204: 8D D8 05  STA $05d8
  $A207: 20 88 B4  JSR $b488
  $A20A: AD E6 05  LDA $05e6
  $A20D: C9 01     CMP #$01
  $A20F: F0 15     BEQ $a226
  $A211: AD E3 05  LDA $05e3
  $A214: D0 10     BNE $a226
  $A216: AD CE 04  LDA $04ce
  $A219: F0 0B     BEQ $a226
  $A21B: A9 01     LDA #$01
  $A21D: 8D DE 03  STA $03de
  $A220: A9 0E     LDA #$0e
  $A222: 20 EC AD  JSR $adec
  $A225: 60        RTS
  $A226: EE E4 03  INC $03e4
  $A229: 60        RTS
  $A22A: A9 00     LDA #$00
  $A22C: 8D DE 03  STA $03de
  $A22F: AD E6 05  LDA $05e6
  $A232: C9 01     CMP #$01
  $A234: F0 08     BEQ $a23e
  $A236: AD D5 05  LDA $05d5
  $A239: D0 0C     BNE $a247
  $A23B: 8D C1 05  STA $05c1
  $A23E: A9 03     LDA #$03
  $A240: 8D E4 03  STA $03e4
  $A243: 20 8B A3  JSR $a38b
  $A246: 60        RTS
  $A247: AD 9F 05  LDA $059f
  $A24A: 20 6F AB  JSR $ab6f
  $A24D: A0 00     LDY #$00
  $A24F: B1 5D     LDA ($5d),Y
  $A251: 09 04     ORA #$04
  $A253: 91 5D     STA ($5d),Y
  $A255: EE E4 03  INC $03e4
  $A258: 20 8B A3  JSR $a38b
  $A25B: 60        RTS
  $A25C: A9 00     LDA #$00
  $A25E: 8D D6 05  STA $05d6
  $A261: 8D D7 05  STA $05d7
  $A264: A9 08     LDA #$08
  $A266: AE E6 05  LDX $05e6
  $A269: E0 02     CPX #$02
  $A26B: D0 02     BNE $a26f
  $A26D: A9 9B     LDA #$9b
  $A26F: 20 EC AD  JSR $adec
  $A272: 60        RTS
  $A273: AD D5 05  LDA $05d5
  $A276: F0 0B     BEQ $a283
  $A278: AD D6 05  LDA $05d6
  $A27B: CD C1 05  CMP $05c1
  $A27E: F0 03     BEQ $a283
  $A280: 4C 87 A2  JMP $a287
  $A283: EE E4 03  INC $03e4
  $A286: 60        RTS
  $A287: AD D7 05  LDA $05d7
  $A28A: F0 04     BEQ $a290
  $A28C: CE D7 05  DEC $05d7
  $A28F: 60        RTS
  $A290: A9 04     LDA #$04
  $A292: 8D D7 05  STA $05d7
  $A295: A9 02     LDA #$02
  $A297: 20 C5 83  JSR $83c5
  $A29A: 20 09 C0  JSR $c009
  $A29D: 60        RTS
  $A29E: AD E6 05  LDA $05e6
  $A2A1: C9 01     CMP #$01
  $A2A3: F0 05     BEQ $a2aa
  $A2A5: A9 01     LDA #$01
  $A2A7: 20 A8 B4  JSR $b4a8
  $A2AA: A9 00     LDA #$00
  $A2AC: 8D E4 05  STA $05e4
  $A2AF: 8D E5 05  STA $05e5
  $A2B2: 8D 43 00  STA $0043
  $A2B5: 8D D2 05  STA $05d2
  $A2B8: AD E3 05  LDA $05e3
  $A2BB: F0 06     BEQ $a2c3
  $A2BD: A9 0D     LDA #$0d
  $A2BF: 20 F4 86  JSR $86f4
  $A2C2: 60        RTS
  $A2C3: EE E4 03  INC $03e4
  $A2C6: A9 10     LDA #$10
  $A2C8: 20 58 B4  JSR $b458
  $A2CB: 60        RTS
  $A2CC: AD E6 03  LDA $03e6
  $A2CF: F0 01     BEQ $a2d2
  $A2D1: 60        RTS
  $A2D2: A9 80     LDA #$80
  $A2D4: 20 E0 83  JSR $83e0
  $A2D7: F0 1C     BEQ $a2f5
  $A2D9: AD E4 05  LDA $05e4
  $A2DC: 10 17     BPL $a2f5
  $A2DE: 29 03     AND #$03
  $A2E0: 8D E7 05  STA $05e7
  $A2E3: AA        TAX
  $A2E4: BD 1A A5  LDA $a51a,X
  $A2E7: 20 F4 86  JSR $86f4
  $A2EA: A9 00     LDA #$00
  $A2EC: 8D E5 05  STA $05e5
  $A2EF: A9 01     LDA #$01
  $A2F1: 8D E6 05  STA $05e6
  $A2F4: 60        RTS
  $A2F5: A9 0F     LDA #$0f
  $A2F7: 20 E0 83  JSR $83e0
  $A2FA: F0 2A     BEQ $a326
  $A2FC: 29 0F     AND #$0f
  $A2FE: F0 26     BEQ $a326
  $A300: A2 00     LDX #$00
  $A302: 4A        LSR A
  $A303: B0 03     BCS $a308
  $A305: E8        INX
  $A306: D0 FA     BNE $a302
  $A308: E0 02     CPX #$02
  $A30A: D0 0F     BNE $a31b
  $A30C: AD D5 05  LDA $05d5
  $A30F: F0 09     BEQ $a31a
  $A311: A9 00     LDA #$00
  $A313: 20 52 A3  JSR $a352
  $A316: A2 02     LDX #$02
  $A318: B0 01     BCS $a31b
  $A31A: 60        RTS
  $A31B: 8A        TXA
  $A31C: 09 C0     ORA #$c0
  $A31E: 8D E4 05  STA $05e4
  $A321: A9 00     LDA #$00
  $A323: 8D E5 05  STA $05e5
  $A326: AD E4 05  LDA $05e4
  $A329: 10 0B     BPL $a336
  $A32B: 29 03     AND #$03
  $A32D: AA        TAX
  $A32E: AD E5 05  LDA $05e5
  $A331: F0 04     BEQ $a337
  $A333: CE E5 05  DEC $05e5
  $A336: 60        RTS
  $A337: A9 0D     LDA #$0d
  $A339: 8D E5 05  STA $05e5
  $A33C: AD E4 05  LDA $05e4
  $A33F: 49 40     EOR #$40
  $A341: 8D E4 05  STA $05e4
  $A344: 8A        TXA
  $A345: 18        CLC
  $A346: 2C E4 05  BIT $05e4
  $A349: 70 01     BVS $a34c
  $A34B: 38        SEC
  $A34C: A2 00     LDX #$00
  $A34E: 20 E3 A3  JSR $a3e3
  $A351: 60        RTS
  $A352: A8        TAY
  $A353: 0A        ASL A
  $A354: AA        TAX
  $A355: B9 82 A3  LDA $a382,Y
  $A358: 2D DD 03  AND $03dd
  $A35B: F0 23     BEQ $a380
  $A35D: AD 9F 05  LDA $059f
  $A360: 20 6F AB  JSR $ab6f
  $A363: A0 03     LDY #$03
  $A365: B1 5D     LDA ($5d),Y
  $A367: BC 86 A3  LDY $a386,X
  $A36A: DD 85 A3  CMP $a385,X
  $A36D: F0 09     BEQ $a378
  $A36F: BC 85 A3  LDY $a385,X
  $A372: E8        INX
  $A373: DD 85 A3  CMP $a385,X
  $A376: D0 08     BNE $a380
  $A378: 8E 32 06  STX $0632
  $A37B: 8C 33 06  STY $0633
  $A37E: 38        SEC
  $A37F: 60        RTS
  $A380: 18        CLC
  $A381: 60        RTS
  $A382: 01 20     ORA ($20,X)
  $A384: 10 01     BPL $a387
  $A386: 18        CLC
  $A387: 0F 10 20  SLO $2010
  $A38A: 21 AD     AND ($ad,X)
  $A38C: C1 05     CMP ($05,X)
  $A38E: F0 52     BEQ $a3e2
  $A390: AD BB 05  LDA $05bb
  $A393: 4A        LSR A
  $A394: 08        PHP
  $A395: A9 00     LDA #$00
  $A397: 85 00     STA $00
  $A399: 85 01     STA $01
  $A39B: A6 01     LDX $01
  $A39D: BD C2 05  LDA $05c2,X
  $A3A0: 20 6F AB  JSR $ab6f
  $A3A3: A0 03     LDY #$03
  $A3A5: 28        PLP
  $A3A6: 08        PHP
  $A3A7: B1 5D     LDA ($5d),Y
  $A3A9: 90 04     BCC $a3af
  $A3AB: D0 1A     BNE $a3c7
  $A3AD: F0 02     BEQ $a3b1
  $A3AF: F0 16     BEQ $a3c7
  $A3B1: A6 00     LDX $00
  $A3B3: A4 01     LDY $01
  $A3B5: B9 C2 05  LDA $05c2,Y
  $A3B8: 48        PHA
  $A3B9: BD C2 05  LDA $05c2,X
  $A3BC: 99 C2 05  STA $05c2,Y
  $A3BF: 68        PLA
  $A3C0: 9D C2 05  STA $05c2,X
  $A3C3: 86 01     STX $01
  $A3C5: E6 00     INC $00
  $A3C7: E6 01     INC $01
  $A3C9: A5 01     LDA $01
  $A3CB: CD C1 05  CMP $05c1
  $A3CE: D0 CB     BNE $a39b
  $A3D0: 28        PLP
  $A3D1: AA        TAX
  $A3D2: A0 05     LDY #$05
  $A3D4: AD E3 05  LDA $05e3
  $A3D7: F0 02     BEQ $a3db
  $A3D9: E8        INX
  $A3DA: 88        DEY
  $A3DB: E0 05     CPX #$05
  $A3DD: 90 03     BCC $a3e2
  $A3DF: 8C C1 05  STY $05c1
  $A3E2: 60        RTS
  $A3E3: 08        PHP
  $A3E4: 0A        ASL A
  $A3E5: 0A        ASL A
  $A3E6: A8        TAY
  $A3E7: 8A        TXA
  $A3E8: 0A        ASL A
  $A3E9: 85 00     STA $00
  $A3EB: B9 E2 A4  LDA $a4e2,Y
  $A3EE: 29 0F     AND #$0f
  $A3F0: 85 01     STA $01
  $A3F2: AE 39 03  LDX $0339
  $A3F5: 20 45 A4  JSR $a445
  $A3F8: AD 39 03  LDA $0339
  $A3FB: 18        CLC
  $A3FC: 65 01     ADC $01
  $A3FE: 69 03     ADC #$03
  $A400: AA        TAX
  $A401: 85 02     STA $02
  $A403: E6 00     INC $00
  $A405: 20 45 A4  JSR $a445
  $A408: 28        PLP
  $A409: 90 31     BCC $a43c
  $A40B: B9 E2 A4  LDA $a4e2,Y
  $A40E: 4A        LSR A
  $A40F: 4A        LSR A
  $A410: 4A        LSR A
  $A411: 4A        LSR A
  $A412: 18        CLC
  $A413: 65 02     ADC $02
  $A415: 85 02     STA $02
  $A417: B9 E5 A4  LDA $a4e5,Y
  $A41A: 20 9A AD  JSR $ad9a
  $A41D: A4 67     LDY $67
  $A41F: B1 65     LDA ($65),Y
  $A421: 20 B2 AD  JSR $adb2
  $A424: A6 02     LDX $02
  $A426: 9D 3D 03  STA $033d,X
  $A429: 8A        TXA
  $A42A: 38        SEC
  $A42B: E9 03     SBC #$03
  $A42D: E5 01     SBC $01
  $A42F: AA        TAX
  $A430: 98        TYA
  $A431: 9D 3D 03  STA $033d,X
  $A434: E6 02     INC $02
  $A436: E6 67     INC $67
  $A438: C6 68     DEC $68
  $A43A: D0 E1     BNE $a41d
  $A43C: A5 01     LDA $01
  $A43E: 0A        ASL A
  $A43F: 69 03     ADC #$03
  $A441: 20 A3 84  JSR $84a3
  $A444: 60        RTS
  $A445: A5 00     LDA $00
  $A447: 9D 3C 03  STA $033c,X
  $A44A: A9 00     LDA #$00
  $A44C: 5E 3C 03  LSR $033c,X
  $A44F: 6A        ROR A
  $A450: 5E 3C 03  LSR $033c,X
  $A453: 6A        ROR A
  $A454: 5E 3C 03  LSR $033c,X
  $A457: 6A        ROR A
  $A458: 79 E3 A4  ADC $a4e3,Y
  $A45B: 9D 3B 03  STA $033b,X
  $A45E: BD 3C 03  LDA $033c,X
  $A461: 79 E4 A4  ADC $a4e4,Y
  $A464: 9D 3C 03  STA $033c,X
  $A467: A5 01     LDA $01
  $A469: 85 03     STA $03
  $A46B: 9D 3A 03  STA $033a,X
  $A46E: A9 00     LDA #$00
  $A470: 9D 3D 03  STA $033d,X
  $A473: E8        INX
  $A474: C6 03     DEC $03
  $A476: D0 F8     BNE $a470
  $A478: 60        RTS
  $A479: 48        PHA
  $A47A: 20 6F AB  JSR $ab6f
  $A47D: 8A        TXA
  $A47E: 48        PHA
  $A47F: A9 05     LDA #$05
  $A481: 20 C5 83  JSR $83c5
  $A484: 68        PLA
  $A485: AA        TAX
  $A486: A0 03     LDY #$03
  $A488: B1 5D     LDA ($5d),Y
  $A48A: F0 1D     BEQ $a4a9
  $A48C: C9 1C     CMP #$1c
  $A48E: 90 02     BCC $a492
  $A490: E9 04     SBC #$04
  $A492: 38        SEC
  $A493: E9 0C     SBC #$0c
  $A495: 85 85     STA $85
  $A497: 0A        ASL A
  $A498: 65 85     ADC $85
  $A49A: 85 85     STA $85
  $A49C: 8A        TXA
  $A49D: 65 85     ADC $85
  $A49F: A8        TAY
  $A4A0: A9 06     LDA #$06
  $A4A2: 20 EE 83  JSR $83ee
  $A4A5: AA        TAX
  $A4A6: 68        PLA
  $A4A7: 8A        TXA
  $A4A8: 60        RTS
  $A4A9: AD DC 06  LDA $06dc
  $A4AC: 38        SEC
  $A4AD: E9 02     SBC #$02
  $A4AF: 0A        ASL A
  $A4B0: 0A        ASL A
  $A4B1: 85 85     STA $85
  $A4B3: 0A        ASL A
  $A4B4: 65 85     ADC $85
  $A4B6: 85 85     STA $85
  $A4B8: 8A        TXA
  $A4B9: 0A        ASL A
  $A4BA: 0A        ASL A
  $A4BB: 65 85     ADC $85
  $A4BD: 85 85     STA $85
  $A4BF: 68        PLA
  $A4C0: 20 CC A4  JSR $a4cc
  $A4C3: 05 85     ORA $85
  $A4C5: A8        TAY
  $A4C6: A9 07     LDA #$07
  $A4C8: 20 EE 83  JSR $83ee
  $A4CB: 60        RTS
  $A4CC: C9 0B     CMP #$0b
  $A4CE: 90 02     BCC $a4d2
  $A4D0: E9 0B     SBC #$0b
  $A4D2: A8        TAY
  $A4D3: B9 D7 A4  LDA $a4d7,Y
  $A4D6: 60        RTS
  $A4D7: 00        BRK
  $A4D8: 03 03     SLO ($03,X)
  $A4DA: 03 03     SLO ($03,X)
  $A4DC: 02        ???
  $A4DD: 01 02     ORA ($02,X)
  $A4DF: 01 02     ORA ($02,X)
  $A4E1: 01 16     ORA ($16,X)
  $A4E3: AB 22     ATX #$22
  $A4E5: 27 26     RLA $26
  $A4E7: AB 22     ATX #$22
  $A4E9: 28        PLP
  $A4EA: 06 AB     ASL $ab
  $A4EC: 22        ???
  $A4ED: 57 16     SRE $16,X
  $A4EF: AB 22     ATX #$22
  $A4F1: 29 15     AND #$15
  $A4F3: 6E 22 32  ROR $3222
  $A4F6: 05 6E     ORA $6e
  $A4F8: 22        ???
  $A4F9: 30 05     BMI $a500
  $A4FB: 6E 22 58  ROR $5822
  $A4FE: 05 6E     ORA $6e
  $A500: 22        ???
  $A501: 31 05     AND ($05),Y
  $A503: 6E 22 59  ROR $5922
  $A506: 16 AB     ASL $ab,X
  $A508: 22        ???
  $A509: 34 06     NOP $06,X
  $A50B: AB 22     ATX #$22
  $A50D: 33 06     RLA ($06),Y
  $A50F: AB 22     ATX #$22
  $A511: 60        RTS
  $A512: 03 AB     SLO ($ab,X)
  $A514: 22        ???
  $A515: 65 13     ADC $13
  $A517: AB 22     ATX #$22
  $A519: 64 08     NOP $08
  $A51B: 09 0A     ORA #$0a
  $A51D: 0B 05     ANC #$05
  $A51F: 06 07     ASL $07
  $A521: 03 A2     SLO ($a2,X)
  $A523: 37 20     RLA $20,X
  $A525: 95 82     STA $82,X
  $A527: 60        RTS
  $A528: AD E4 03  LDA $03e4
  $A52B: 20 4D 83  JSR $834d
  $A52E: 32        ???
  $A52F: A5 38     LDA $38
  $A531: A5 A9     LDA $a9
  $A533: 31 20     AND ($20),Y
  $A535: EC AD 60  CPX $60ad
  $A538: EE CA 03  INC $03ca
  $A53B: 60        RTS
  $A53C: A5 1C     LDA $1c
  $A53E: 48        PHA
  $A53F: A9 00     LDA #$00
  $A541: 85 00     STA $00
  $A543: A6 00     LDX $00
  $A545: EC 16 06  CPX $0616
  $A548: F0 29     BEQ $a573
  $A54A: BD 17 06  LDA $0617,X
  $A54D: 48        PHA
  $A54E: 20 6F AB  JSR $ab6f
  $A551: A0 03     LDY #$03
  $A553: B1 5D     LDA ($5d),Y
  $A555: 20 8B 82  JSR $828b
  $A558: A0 0E     LDY #$0e
  $A55A: 91 5D     STA ($5d),Y
  $A55C: 68        PLA
  $A55D: A2 00     LDX #$00
  $A55F: 20 7C AB  JSR $ab7c
  $A562: A0 0F     LDY #$0f
  $A564: A5 6E     LDA $6e
  $A566: 91 5D     STA ($5d),Y
  $A568: A5 6F     LDA $6f
  $A56A: C8        INY
  $A56B: 91 5D     STA ($5d),Y
  $A56D: E6 00     INC $00
  $A56F: E6 00     INC $00
  $A571: D0 D0     BNE $a543
  $A573: 68        PLA
  $A574: 20 C5 83  JSR $83c5
  $A577: 60        RTS
  $A578: AD 88 00  LDA $0088
  $A57B: F0 01     BEQ $a57e
  $A57D: 60        RTS
  $A57E: A9 02     LDA #$02
  $A580: 2C 83 05  BIT $0583
  $A583: F0 15     BEQ $a59a
  $A585: 4D 83 05  EOR $0583
  $A588: 8D 83 05  STA $0583
  $A58B: A9 16     LDA #$16
  $A58D: 20 6F AB  JSR $ab6f
  $A590: AD 94 06  LDA $0694
  $A593: 20 D8 A7  JSR $a7d8
  $A596: 20 C9 A7  JSR $a7c9
  $A599: 60        RTS
  $A59A: 2C 96 05  BIT $0596
  $A59D: F0 31     BEQ $a5d0
  $A59F: 4A        LSR A
  $A5A0: 2C 96 05  BIT $0596
  $A5A3: D0 0B     BNE $a5b0
  $A5A5: 0D 96 05  ORA $0596
  $A5A8: 8D 96 05  STA $0596
  $A5AB: A9 00     LDA #$00
  $A5AD: 8D 98 05  STA $0598
  $A5B0: AD 98 05  LDA $0598
  $A5B3: C9 16     CMP #$16
  $A5B5: D0 0B     BNE $a5c2
  $A5B7: AD 96 05  LDA $0596
  $A5BA: 29 FC     AND #$fc
  $A5BC: 8D 96 05  STA $0596
  $A5BF: 4C D0 A5  JMP $a5d0
  $A5C2: 20 6F AB  JSR $ab6f
  $A5C5: A0 00     LDY #$00
  $A5C7: A9 03     LDA #$03
  $A5C9: 11 5D     ORA ($5d),Y
  $A5CB: 91 5D     STA ($5d),Y
  $A5CD: EE 98 05  INC $0598
  $A5D0: A9 00     LDA #$00
  $A5D2: 85 5F     STA $5f
  $A5D4: A9 04     LDA #$04
  $A5D6: 2C 96 05  BIT $0596
  $A5D9: F0 11     BEQ $a5ec
  $A5DB: 0A        ASL A
  $A5DC: 2C 96 05  BIT $0596
  $A5DF: F0 0B     BEQ $a5ec
  $A5E1: 4D 96 05  EOR $0596
  $A5E4: 8D 96 05  STA $0596
  $A5E7: A9 00     LDA #$00
  $A5E9: 8D C1 05  STA $05c1
  $A5EC: A5 5F     LDA $5f
  $A5EE: 48        PHA
  $A5EF: C9 0B     CMP #$0b
  $A5F1: 90 02     BCC $a5f5
  $A5F3: E9 0B     SBC #$0b
  $A5F5: 85 60     STA $60
  $A5F7: 68        PLA
  $A5F8: 20 6F AB  JSR $ab6f
  $A5FB: A0 00     LDY #$00
  $A5FD: B1 5D     LDA ($5d),Y
  $A5FF: 4A        LSR A
  $A600: 90 03     BCC $a605
  $A602: 20 C6 A6  JSR $a6c6
  $A605: AD 96 05  LDA $0596
  $A608: 29 04     AND #$04
  $A60A: F0 03     BEQ $a60f
  $A60C: 20 03 A7  JSR $a703
  $A60F: 20 02 A7  JSR $a702
  $A612: E6 5F     INC $5f
  $A614: A5 5F     LDA $5f
  $A616: C9 16     CMP #$16
  $A618: D0 D2     BNE $a5ec
  $A61A: 20 70 A6  JSR $a670
  $A61D: A9 04     LDA #$04
  $A61F: 2C 96 05  BIT $0596
  $A622: F0 11     BEQ $a635
  $A624: 4D 96 05  EOR $0596
  $A627: 8D 96 05  STA $0596
  $A62A: A2 00     LDX #$00
  $A62C: AD C1 05  LDA $05c1
  $A62F: F0 01     BEQ $a632
  $A631: E8        INX
  $A632: 8E D5 05  STX $05d5
  $A635: 20 39 A6  JSR $a639
  $A638: 60        RTS
  $A639: AD 96 05  LDA $0596
  $A63C: 29 10     AND #$10
  $A63E: F0 06     BEQ $a646
  $A640: AD 9F 05  LDA $059f
  $A643: 20 4C AA  JSR $aa4c
  $A646: 20 AF AA  JSR $aaaf
  $A649: AD E2 05  LDA $05e2
  $A64C: 8D 94 05  STA $0594
  $A64F: 20 53 A6  JSR $a653
  $A652: 60        RTS
  $A653: AD 90 05  LDA $0590
  $A656: AE E3 05  LDX $05e3
  $A659: F0 05     BEQ $a660
  $A65B: 49 FF     EOR #$ff
  $A65D: 18        CLC
  $A65E: 69 A0     ADC #$a0
  $A660: A2 00     LDX #$00
  $A662: C9 30     CMP #$30
  $A664: 90 06     BCC $a66c
  $A666: E8        INX
  $A667: C9 70     CMP #$70
  $A669: 90 01     BCC $a66c
  $A66B: E8        INX
  $A66C: 8E 93 05  STX $0593
  $A66F: 60        RTS
  $A670: A9 20     LDA #$20
  $A672: 2C 96 05  BIT $0596
  $A675: F0 4E     BEQ $a6c5
  $A677: 4D 96 05  EOR $0596
  $A67A: 8D 96 05  STA $0596
  $A67D: A9 00     LDA #$00
  $A67F: 85 00     STA $00
  $A681: A5 00     LDA $00
  $A683: A2 00     LDX #$00
  $A685: 20 C4 AB  JSR $abc4
  $A688: A0 03     LDY #$03
  $A68A: B1 5D     LDA ($5d),Y
  $A68C: A0 10     LDY #$10
  $A68E: C9 19     CMP #$19
  $A690: D0 10     BNE $a6a2
  $A692: AD A4 06  LDA $06a4
  $A695: C9 05     CMP #$05
  $A697: B0 09     BCS $a6a2
  $A699: A9 00     LDA #$00
  $A69B: 91 5D     STA ($5d),Y
  $A69D: 88        DEY
  $A69E: 91 5D     STA ($5d),Y
  $A6A0: D0 1B     BNE $a6bd
  $A6A2: B1 5D     LDA ($5d),Y
  $A6A4: 88        DEY
  $A6A5: C5 6F     CMP $6f
  $A6A7: 90 06     BCC $a6af
  $A6A9: B1 5D     LDA ($5d),Y
  $A6AB: C5 6E     CMP $6e
  $A6AD: B0 0E     BCS $a6bd
  $A6AF: B1 5D     LDA ($5d),Y
  $A6B1: 18        CLC
  $A6B2: 69 01     ADC #$01
  $A6B4: 91 5D     STA ($5d),Y
  $A6B6: C8        INY
  $A6B7: B1 5D     LDA ($5d),Y
  $A6B9: 69 00     ADC #$00
  $A6BB: 91 5D     STA ($5d),Y
  $A6BD: E6 00     INC $00
  $A6BF: A5 00     LDA $00
  $A6C1: C9 0B     CMP #$0b
  $A6C3: D0 BC     BNE $a681
  $A6C5: 60        RTS
  $A6C6: A0 00     LDY #$00
  $A6C8: B1 5D     LDA ($5d),Y
  $A6CA: 29 02     AND #$02
  $A6CC: F0 09     BEQ $a6d7
  $A6CE: B1 5D     LDA ($5d),Y
  $A6D0: 29 FD     AND #$fd
  $A6D2: 91 5D     STA ($5d),Y
  $A6D4: 20 5E A7  JSR $a75e
  $A6D7: A0 05     LDY #$05
  $A6D9: B1 5D     LDA ($5d),Y
  $A6DB: F0 17     BEQ $a6f4
  $A6DD: 38        SEC
  $A6DE: E9 01     SBC #$01
  $A6E0: 91 5D     STA ($5d),Y
  $A6E2: 20 5E AA  JSR $aa5e
  $A6E5: 20 61 AA  JSR $aa61
  $A6E8: 20 AD AA  JSR $aaad
  $A6EB: A0 02     LDY #$02
  $A6ED: B1 5D     LDA ($5d),Y
  $A6EF: CD E2 05  CMP $05e2
  $A6F2: D0 0D     BNE $a701
  $A6F4: A0 00     LDY #$00
  $A6F6: B1 5D     LDA ($5d),Y
  $A6F8: 29 FC     AND #$fc
  $A6FA: 91 5D     STA ($5d),Y
  $A6FC: 98        TYA
  $A6FD: A0 05     LDY #$05
  $A6FF: 91 5D     STA ($5d),Y
  $A701: 60        RTS
  $A702: 60        RTS
  $A703: A5 5F     LDA $5f
  $A705: CD 9F 05  CMP $059f
  $A708: F0 3E     BEQ $a748
  $A70A: A5 60     LDA $60
  $A70C: F0 3A     BEQ $a748
  $A70E: AD E3 05  LDA $05e3
  $A711: A6 5F     LDX $5f
  $A713: E0 0B     CPX #$0b
  $A715: 90 02     BCC $a719
  $A717: 49 01     EOR #$01
  $A719: 4A        LSR A
  $A71A: 90 2C     BCC $a748
  $A71C: 20 AD AA  JSR $aaad
  $A71F: AD 94 05  LDA $0594
  $A722: CD E2 05  CMP $05e2
  $A725: D0 21     BNE $a748
  $A727: A0 11     LDY #$11
  $A729: B1 5D     LDA ($5d),Y
  $A72B: D0 1B     BNE $a748
  $A72D: A0 00     LDY #$00
  $A72F: B1 5D     LDA ($5d),Y
  $A731: 29 08     AND #$08
  $A733: D0 0B     BNE $a740
  $A735: AE C1 05  LDX $05c1
  $A738: A5 5F     LDA $5f
  $A73A: 9D C2 05  STA $05c2,X
  $A73D: EE C1 05  INC $05c1
  $A740: B1 5D     LDA ($5d),Y
  $A742: 29 F7     AND #$f7
  $A744: 09 04     ORA #$04
  $A746: 91 5D     STA ($5d),Y
  $A748: 60        RTS
  $A749: A0 11     LDY #$11
  $A74B: B1 5D     LDA ($5d),Y
  $A74D: 38        SEC
  $A74E: ED 99 05  SBC $0599
  $A751: 60        RTS
  $A752: 20 49 A7  JSR $a749
  $A755: F0 02     BEQ $a759
  $A757: B0 02     BCS $a75b
  $A759: A9 00     LDA #$00
  $A75B: 91 5D     STA ($5d),Y
  $A75D: 60        RTS
  $A75E: A5 60     LDA $60
  $A760: D0 03     BNE $a765
  $A762: 4C 52 A7  JMP $a752
  $A765: 20 49 A7  JSR $a749
  $A768: F0 05     BEQ $a76f
  $A76A: 90 03     BCC $a76f
  $A76C: 91 5D     STA ($5d),Y
  $A76E: 60        RTS
  $A76F: 49 FF     EOR #$ff
  $A771: 69 01     ADC #$01
  $A773: 48        PHA
  $A774: A9 00     LDA #$00
  $A776: 91 5D     STA ($5d),Y
  $A778: A8        TAY
  $A779: B1 5D     LDA ($5d),Y
  $A77B: 29 04     AND #$04
  $A77D: D0 25     BNE $a7a4
  $A77F: AD E3 05  LDA $05e3
  $A782: A6 5F     LDX $5f
  $A784: E0 0B     CPX #$0b
  $A786: 90 02     BCC $a78a
  $A788: 49 01     EOR #$01
  $A78A: 4A        LSR A
  $A78B: 90 06     BCC $a793
  $A78D: 20 7A A8  JSR $a87a
  $A790: 4C 96 A7  JMP $a796
  $A793: 20 F8 A7  JSR $a7f8
  $A796: A0 02     LDY #$02
  $A798: 91 5D     STA ($5d),Y
  $A79A: 48        PHA
  $A79B: 20 AD AA  JSR $aaad
  $A79E: 68        PLA
  $A79F: CD E2 05  CMP $05e2
  $A7A2: D0 08     BNE $a7ac
  $A7A4: A0 05     LDY #$05
  $A7A6: A9 00     LDA #$00
  $A7A8: 91 5D     STA ($5d),Y
  $A7AA: 68        PLA
  $A7AB: 60        RTS
  $A7AC: 20 D8 A7  JSR $a7d8
  $A7AF: A8        TAY
  $A7B0: 68        PLA
  $A7B1: AA        TAX
  $A7B2: 98        TYA
  $A7B3: 48        PHA
  $A7B4: A0 05     LDY #$05
  $A7B6: 8A        TXA
  $A7B7: 91 5D     STA ($5d),Y
  $A7B9: 68        PLA
  $A7BA: 48        PHA
  $A7BB: 20 7A A9  JSR $a97a
  $A7BE: 68        PLA
  $A7BF: 18        CLC
  $A7C0: 69 40     ADC #$40
  $A7C2: 20 7E A9  JSR $a97e
  $A7C5: 20 33 AA  JSR $aa33
  $A7C8: 60        RTS
  $A7C9: 48        PHA
  $A7CA: 20 B6 84  JSR $84b6
  $A7CD: 20 C2 A9  JSR $a9c2
  $A7D0: 68        PLA
  $A7D1: 20 B3 84  JSR $84b3
  $A7D4: 20 C6 A9  JSR $a9c6
  $A7D7: 60        RTS
  $A7D8: A2 00     LDX #$00
  $A7DA: 86 00     STX $00
  $A7DC: 48        PHA
  $A7DD: 20 2A AB  JSR $ab2a
  $A7E0: A0 0D     LDY #$0d
  $A7E2: 38        SEC
  $A7E3: F1 5D     SBC ($5d),Y
  $A7E5: 20 2E A9  JSR $a92e
  $A7E8: 68        PLA
  $A7E9: 20 36 AB  JSR $ab36
  $A7EC: A0 09     LDY #$09
  $A7EE: 38        SEC
  $A7EF: F1 5D     SBC ($5d),Y
  $A7F1: 20 39 A9  JSR $a939
  $A7F4: 20 46 A9  JSR $a946
  $A7F7: 60        RTS
  $A7F8: AD 96 05  LDA $0596
  $A7FB: 29 10     AND #$10
  $A7FD: F0 0D     BEQ $a80c
  $A7FF: A5 5F     LDA $5f
  $A801: CD 9F 05  CMP $059f
  $A804: D0 06     BNE $a80c
  $A806: 68        PLA
  $A807: 68        PLA
  $A808: 68        PLA
  $A809: 4C EB 99  JMP $99eb
  $A80C: A9 02     LDA #$02
  $A80E: 85 70     STA $70
  $A810: A0 03     LDY #$03
  $A812: B1 5D     LDA ($5d),Y
  $A814: 4A        LSR A
  $A815: AA        TAX
  $A816: BD D8 AC  LDA $acd8,X
  $A819: B0 04     BCS $a81f
  $A81B: 4A        LSR A
  $A81C: 4A        LSR A
  $A81D: 4A        LSR A
  $A81E: 4A        LSR A
  $A81F: 29 0F     AND #$0f
  $A821: 20 4D 83  JSR $834d
  $A824: 26 A8     ROL $a8
  $A826: A5 60     LDA $60
  $A828: 0A        ASL A
  $A829: 0A        ASL A
  $A82A: AA        TAX
  $A82B: AC 93 05  LDY $0593
  $A82E: F0 17     BEQ $a847
  $A830: E8        INX
  $A831: 88        DEY
  $A832: F0 13     BEQ $a847
  $A834: E8        INX
  $A835: AD 8C 05  LDA $058c
  $A838: AC E3 05  LDY $05e3
  $A83B: F0 05     BEQ $a842
  $A83D: 49 FF     EOR #$ff
  $A83F: 18        CLC
  $A840: 69 60     ADC #$60
  $A842: C9 30     CMP #$30
  $A844: 90 01     BCC $a847
  $A846: E8        INX
  $A847: BD 4E A8  LDA $a84e,X
  $A84A: 20 9C AA  JSR $aa9c
  $A84D: 60        RTS
  $A84E: 02        ???
  $A84F: 02        ???
  $A850: 02        ???
  $A851: 03 21     SLO ($21,X)
  $A853: 40        RTI
  $A854: 60        RTS
  $A855: 61 25     ADC ($25,X)
  $A857: 44 64     NOP $64
  $A859: 65 33     ADC $33
  $A85B: 42        ???
  $A85C: 62        ???
  $A85D: 63 13     RRA ($13,X)
  $A85F: 23 42     RLA ($42,X)
  $A861: 43 51     SRE ($51,X)
  $A863: 61 81     ADC ($81,X)
  $A865: 82 75     NOP #$75
  $A867: 85 84     STA $84
  $A869: 95 53     STA $53,X
  $A86B: 63 83     RRA ($83,X)
  $A86D: 84 73     STY $73
  $A86F: 82 92     NOP #$92
  $A871: 93 62     ??? ($62),Y
  $A873: 83 93     SAX ($93,X)
  $A875: 92        ???
  $A876: 71 80     ADC ($80),Y
  $A878: 90 81     BCC $a7fb
  $A87A: A9 03     LDA #$03
  $A87C: 85 70     STA $70
  $A87E: A0 03     LDY #$03
  $A880: B1 5D     LDA ($5d),Y
  $A882: 4A        LSR A
  $A883: AA        TAX
  $A884: BD 08 AD  LDA $ad08,X
  $A887: B0 04     BCS $a88d
  $A889: 4A        LSR A
  $A88A: 4A        LSR A
  $A88B: 4A        LSR A
  $A88C: 4A        LSR A
  $A88D: 29 0F     AND #$0f
  $A88F: 20 4D 83  JSR $834d
  $A892: 94 A8     STY $a8,X
  $A894: AD D5 05  LDA $05d5
  $A897: D0 03     BNE $a89c
  $A899: 4C DB A8  JMP $a8db
  $A89C: A6 60     LDX $60
  $A89E: AD 90 05  LDA $0590
  $A8A1: 20 3E AB  JSR $ab3e
  $A8A4: 85 00     STA $00
  $A8A6: BD 23 A9  LDA $a923,X
  $A8A9: 29 F0     AND #$f0
  $A8AB: C5 00     CMP $00
  $A8AD: F0 1B     BEQ $a8ca
  $A8AF: B0 0D     BCS $a8be
  $A8B1: BD 23 A9  LDA $a923,X
  $A8B4: 0A        ASL A
  $A8B5: 0A        ASL A
  $A8B6: 0A        ASL A
  $A8B7: 0A        ASL A
  $A8B8: C5 00     CMP $00
  $A8BA: F0 0E     BEQ $a8ca
  $A8BC: B0 0C     BCS $a8ca
  $A8BE: 20 3E AB  JSR $ab3e
  $A8C1: 85 00     STA $00
  $A8C3: A0 09     LDY #$09
  $A8C5: B1 5D     LDA ($5d),Y
  $A8C7: 4C D4 A8  JMP $a8d4
  $A8CA: AD 90 05  LDA $0590
  $A8CD: 29 F0     AND #$f0
  $A8CF: 85 00     STA $00
  $A8D1: AD 8C 05  LDA $058c
  $A8D4: 4A        LSR A
  $A8D5: 4A        LSR A
  $A8D6: 4A        LSR A
  $A8D7: 4A        LSR A
  $A8D8: 05 00     ORA $00
  $A8DA: 60        RTS
  $A8DB: AD 90 05  LDA $0590
  $A8DE: 4A        LSR A
  $A8DF: 29 F0     AND #$f0
  $A8E1: 85 00     STA $00
  $A8E3: 0A        ASL A
  $A8E4: 65 00     ADC $00
  $A8E6: 85 00     STA $00
  $A8E8: AD 8C 05  LDA $058c
  $A8EB: 4A        LSR A
  $A8EC: 29 F0     AND #$f0
  $A8EE: 18        CLC
  $A8EF: 65 00     ADC $00
  $A8F1: 4A        LSR A
  $A8F2: 85 00     STA $00
  $A8F4: 4A        LSR A
  $A8F5: 4A        LSR A
  $A8F6: 65 00     ADC $00
  $A8F8: AE E3 05  LDX $05e3
  $A8FB: D0 05     BNE $a902
  $A8FD: 49 FF     EOR #$ff
  $A8FF: 18        CLC
  $A900: 69 8D     ADC #$8d
  $A902: 18        CLC
  $A903: 65 60     ADC $60
  $A905: A8        TAY
  $A906: 88        DEY
  $A907: B1 61     LDA ($61),Y
  $A909: AE E3 05  LDX $05e3
  $A90C: D0 02     BNE $a910
  $A90E: B1 63     LDA ($63),Y
  $A910: C9 FF     CMP #$ff
  $A912: D0 04     BNE $a918
  $A914: AD 94 05  LDA $0594
  $A917: 60        RTS
  $A918: AE E3 05  LDX $05e3
  $A91B: D0 05     BNE $a922
  $A91D: 49 FF     EOR #$ff
  $A91F: 18        CLC
  $A920: 69 96     ADC #$96
  $A922: 60        RTS
  $A923: 00        BRK
  $A924: 05 05     ORA $05
  $A926: 05 05     ORA $05
  $A928: 09 49     ORA #$49
  $A92A: 09 59     ORA #$59
  $A92C: 09 49     ORA #$49
  $A92E: B0 06     BCS $a936
  $A930: 49 FF     EOR #$ff
  $A932: 69 01     ADC #$01
  $A934: E6 00     INC $00
  $A936: 85 59     STA $59
  $A938: 60        RTS
  $A939: B0 08     BCS $a943
  $A93B: 49 FF     EOR #$ff
  $A93D: 69 01     ADC #$01
  $A93F: E6 00     INC $00
  $A941: E6 00     INC $00
  $A943: 85 58     STA $58
  $A945: 60        RTS
  $A946: A9 00     LDA #$00
  $A948: 85 57     STA $57
  $A94A: 85 5C     STA $5c
  $A94C: 20 28 85  JSR $8528
  $A94F: A2 00     LDX #$00
  $A951: BD 76 BB  LDA $bb76,X
  $A954: C5 58     CMP $58
  $A956: F0 04     BEQ $a95c
  $A958: B0 0F     BCS $a969
  $A95A: 90 09     BCC $a965
  $A95C: BD 75 BB  LDA $bb75,X
  $A95F: E5 57     SBC $57
  $A961: F0 06     BEQ $a969
  $A963: B0 04     BCS $a969
  $A965: E8        INX
  $A966: E8        INX
  $A967: D0 E8     BNE $a951
  $A969: 8A        TXA
  $A96A: 4A        LSR A
  $A96B: 46 00     LSR $00
  $A96D: 90 04     BCC $a973
  $A96F: 49 FF     EOR #$ff
  $A971: 29 7F     AND #$7f
  $A973: 46 00     LSR $00
  $A975: 90 02     BCC $a979
  $A977: 49 FF     EOR #$ff
  $A979: 60        RTS
  $A97A: A0 08     LDY #$08
  $A97C: D0 02     BNE $a980
  $A97E: A0 0C     LDY #$0c
  $A980: 18        CLC
  $A981: 69 10     ADC #$10
  $A983: 4A        LSR A
  $A984: 4A        LSR A
  $A985: 4A        LSR A
  $A986: 4A        LSR A
  $A987: 4A        LSR A
  $A988: AA        TAX
  $A989: BD BA A9  LDA $a9ba,X
  $A98C: 85 00     STA $00
  $A98E: A6 70     LDX $70
  $A990: 98        TYA
  $A991: 48        PHA
  $A992: A5 5F     LDA $5f
  $A994: 20 C4 AB  JSR $abc4
  $A997: C6 00     DEC $00
  $A999: 10 06     BPL $a9a1
  $A99B: A9 00     LDA #$00
  $A99D: 85 6E     STA $6e
  $A99F: 85 6F     STA $6f
  $A9A1: A6 6E     LDX $6e
  $A9A3: A4 6F     LDY $6f
  $A9A5: C6 00     DEC $00
  $A9A7: 30 03     BMI $a9ac
  $A9A9: 20 64 83  JSR $8364
  $A9AC: 84 6F     STY $6f
  $A9AE: 68        PLA
  $A9AF: A8        TAY
  $A9B0: A5 6F     LDA $6f
  $A9B2: 91 5D     STA ($5d),Y
  $A9B4: 88        DEY
  $A9B5: 88        DEY
  $A9B6: 8A        TXA
  $A9B7: 91 5D     STA ($5d),Y
  $A9B9: 60        RTS
  $A9BA: 00        BRK
  $A9BB: 01 01     ORA ($01,X)
  $A9BD: 01 00     ORA ($00,X)
  $A9BF: 02        ???
  $A9C0: 02        ???
  $A9C1: 02        ???
  $A9C2: A9 08     LDA #$08
  $A9C4: D0 02     BNE $a9c8
  $A9C6: A9 0C     LDA #$0c
  $A9C8: 48        PHA
  $A9C9: 98        TYA
  $A9CA: 08        PHP
  $A9CB: 10 03     BPL $a9d0
  $A9CD: 20 64 83  JSR $8364
  $A9D0: 86 4F     STX $4f
  $A9D2: 84 50     STY $50
  $A9D4: A9 00     LDA #$00
  $A9D6: 85 51     STA $51
  $A9D8: A9 04     LDA #$04
  $A9DA: 85 52     STA $52
  $A9DC: 20 F9 84  JSR $84f9
  $A9DF: A6 54     LDX $54
  $A9E1: A4 55     LDY $55
  $A9E3: 28        PLP
  $A9E4: 10 03     BPL $a9e9
  $A9E6: 20 64 83  JSR $8364
  $A9E9: 84 4F     STY $4f
  $A9EB: 68        PLA
  $A9EC: A8        TAY
  $A9ED: A5 4F     LDA $4f
  $A9EF: 91 5D     STA ($5d),Y
  $A9F1: 88        DEY
  $A9F2: 88        DEY
  $A9F3: 8A        TXA
  $A9F4: 91 5D     STA ($5d),Y
  $A9F6: 60        RTS
  $A9F7: AD E3 05  LDA $05e3
  $A9FA: 49 01     EOR #$01
  $A9FC: 4C 02 AA  JMP $aa02
  $A9FF: AD E3 05  LDA $05e3
  $AA02: 08        PHP
  $AA03: A9 00     LDA #$00
  $AA05: 28        PLP
  $AA06: F0 02     BEQ $aa0a
  $AA08: A9 0B     LDA #$0b
  $AA0A: 60        RTS
  $AA0B: 8D 99 05  STA $0599
  $AA0E: 20 FD 86  JSR $86fd
  $AA11: A9 02     LDA #$02
  $AA13: 0D 96 05  ORA $0596
  $AA16: 29 FE     AND #$fe
  $AA18: 8D 96 05  STA $0596
  $AA1B: 60        RTS
  $AA1C: A9 00     LDA #$00
  $AA1E: 48        PHA
  $AA1F: 20 6F AB  JSR $ab6f
  $AA22: A0 00     LDY #$00
  $AA24: B1 5D     LDA ($5d),Y
  $AA26: 29 FB     AND #$fb
  $AA28: 91 5D     STA ($5d),Y
  $AA2A: 68        PLA
  $AA2B: 18        CLC
  $AA2C: 69 01     ADC #$01
  $AA2E: C9 16     CMP #$16
  $AA30: D0 EC     BNE $aa1e
  $AA32: 60        RTS
  $AA33: A0 00     LDY #$00
  $AA35: A9 01     LDA #$01
  $AA37: 91 5D     STA ($5d),Y
  $AA39: 60        RTS
  $AA3A: 20 6F AB  JSR $ab6f
  $AA3D: A0 0D     LDY #$0d
  $AA3F: AD 90 05  LDA $0590
  $AA42: 91 5D     STA ($5d),Y
  $AA44: A0 09     LDY #$09
  $AA46: AD 8C 05  LDA $058c
  $AA49: 91 5D     STA ($5d),Y
  $AA4B: 60        RTS
  $AA4C: 20 6F AB  JSR $ab6f
  $AA4F: A0 0D     LDY #$0d
  $AA51: B1 5D     LDA ($5d),Y
  $AA53: 8D 90 05  STA $0590
  $AA56: A0 09     LDY #$09
  $AA58: B1 5D     LDA ($5d),Y
  $AA5A: 8D 8C 05  STA $058c
  $AA5D: 60        RTS
  $AA5E: A0 0A     LDY #$0a
  $AA60: 2C A0 06  BIT $06a0
  $AA63: B1 5D     LDA ($5d),Y
  $AA65: C8        INY
  $AA66: 18        CLC
  $AA67: 71 5D     ADC ($5d),Y
  $AA69: 91 5D     STA ($5d),Y
  $AA6B: C8        INY
  $AA6C: B1 5D     LDA ($5d),Y
  $AA6E: 08        PHP
  $AA6F: C8        INY
  $AA70: 71 5D     ADC ($5d),Y
  $AA72: 91 5D     STA ($5d),Y
  $AA74: 28        PLP
  $AA75: 30 14     BMI $aa8b
  $AA77: C0 09     CPY #$09
  $AA79: F0 08     BEQ $aa83
  $AA7B: C9 A0     CMP #$a0
  $AA7D: 90 1C     BCC $aa9b
  $AA7F: A9 9F     LDA #$9f
  $AA81: D0 16     BNE $aa99
  $AA83: C9 60     CMP #$60
  $AA85: 90 14     BCC $aa9b
  $AA87: A9 5F     LDA #$5f
  $AA89: D0 0E     BNE $aa99
  $AA8B: B1 5D     LDA ($5d),Y
  $AA8D: 10 0C     BPL $aa9b
  $AA8F: C0 0D     CPY #$0d
  $AA91: D0 04     BNE $aa97
  $AA93: C9 A0     CMP #$a0
  $AA95: 90 04     BCC $aa9b
  $AA97: A9 00     LDA #$00
  $AA99: 91 5D     STA ($5d),Y
  $AA9B: 60        RTS
  $AA9C: 48        PHA
  $AA9D: 20 3E AB  JSR $ab3e
  $AAA0: 85 00     STA $00
  $AAA2: 68        PLA
  $AAA3: 20 43 AB  JSR $ab43
  $AAA6: 4A        LSR A
  $AAA7: 4A        LSR A
  $AAA8: 4A        LSR A
  $AAA9: 4A        LSR A
  $AAAA: 05 00     ORA $00
  $AAAC: 60        RTS
  $AAAD: 38        SEC
  $AAAE: 24 18     BIT $18
  $AAB0: 08        PHP
  $AAB1: B0 06     BCS $aab9
  $AAB3: AD 90 05  LDA $0590
  $AAB6: 4C BD AA  JMP $aabd
  $AAB9: A0 0D     LDY #$0d
  $AABB: B1 5D     LDA ($5d),Y
  $AABD: 29 F0     AND #$f0
  $AABF: 8D E2 05  STA $05e2
  $AAC2: 28        PLP
  $AAC3: B0 06     BCS $aacb
  $AAC5: AD 8C 05  LDA $058c
  $AAC8: 4C CF AA  JMP $aacf
  $AACB: A0 09     LDY #$09
  $AACD: B1 5D     LDA ($5d),Y
  $AACF: 4A        LSR A
  $AAD0: 4A        LSR A
  $AAD1: 4A        LSR A
  $AAD2: 4A        LSR A
  $AAD3: 0D E2 05  ORA $05e2
  $AAD6: 8D E2 05  STA $05e2
  $AAD9: 60        RTS
  $AADA: A2 00     LDX #$00
  $AADC: 86 5F     STX $5f
  $AADE: 4D E3 05  EOR $05e3
  $AAE1: 48        PHA
  $AAE2: 20 61 AB  JSR $ab61
  $AAE5: 20 EE AA  JSR $aaee
  $AAE8: 68        PLA
  $AAE9: 49 01     EOR #$01
  $AAEB: 20 61 AB  JSR $ab61
  $AAEE: 86 00     STX $00
  $AAF0: A9 0B     LDA #$0b
  $AAF2: 85 01     STA $01
  $AAF4: A5 5F     LDA $5f
  $AAF6: 20 6F AB  JSR $ab6f
  $AAF9: A0 05     LDY #$05
  $AAFB: A9 00     LDA #$00
  $AAFD: 91 5D     STA ($5d),Y
  $AAFF: C8        INY
  $AB00: C0 0E     CPY #$0e
  $AB02: D0 F9     BNE $aafd
  $AB04: A6 00     LDX $00
  $AB06: BD 75 BC  LDA $bc75,X
  $AB09: C9 FF     CMP #$ff
  $AB0B: F0 11     BEQ $ab1e
  $AB0D: 20 27 AB  JSR $ab27
  $AB10: A0 0D     LDY #$0d
  $AB12: 91 5D     STA ($5d),Y
  $AB14: BD 75 BC  LDA $bc75,X
  $AB17: 20 30 AB  JSR $ab30
  $AB1A: A0 09     LDY #$09
  $AB1C: 91 5D     STA ($5d),Y
  $AB1E: E6 00     INC $00
  $AB20: E6 5F     INC $5f
  $AB22: C6 01     DEC $01
  $AB24: D0 CE     BNE $aaf4
  $AB26: 60        RTS
  $AB27: 20 3E AB  JSR $ab3e
  $AB2A: 29 F0     AND #$f0
  $AB2C: 18        CLC
  $AB2D: 69 08     ADC #$08
  $AB2F: 60        RTS
  $AB30: 20 43 AB  JSR $ab43
  $AB33: 4C 2A AB  JMP $ab2a
  $AB36: 0A        ASL A
  $AB37: 0A        ASL A
  $AB38: 0A        ASL A
  $AB39: 0A        ASL A
  $AB3A: 18        CLC
  $AB3B: 69 08     ADC #$08
  $AB3D: 60        RTS
  $AB3E: 29 F0     AND #$f0
  $AB40: 18        CLC
  $AB41: 90 05     BCC $ab48
  $AB43: 0A        ASL A
  $AB44: 0A        ASL A
  $AB45: 0A        ASL A
  $AB46: 0A        ASL A
  $AB47: 38        SEC
  $AB48: 08        PHP
  $AB49: 48        PHA
  $AB4A: A5 5F     LDA $5f
  $AB4C: C9 0B     CMP #$0b
  $AB4E: 68        PLA
  $AB4F: 90 0E     BCC $ab5f
  $AB51: 28        PLP
  $AB52: 08        PHP
  $AB53: B0 03     BCS $ab58
  $AB55: 69 70     ADC #$70
  $AB57: 2C 69 AF  BIT $af69
  $AB5A: 49 FF     EOR #$ff
  $AB5C: 18        CLC
  $AB5D: 69 01     ADC #$01
  $AB5F: 28        PLP
  $AB60: 60        RTS
  $AB61: 85 00     STA $00
  $AB63: 0A        ASL A
  $AB64: 85 01     STA $01
  $AB66: 0A        ASL A
  $AB67: 0A        ASL A
  $AB68: 18        CLC
  $AB69: 65 00     ADC $00
  $AB6B: 65 01     ADC $01
  $AB6D: AA        TAX
  $AB6E: 60        RTS
  $AB6F: 0A        ASL A
  $AB70: A8        TAY
  $AB71: B9 38 AD  LDA $ad38,Y
  $AB74: 85 5D     STA $5d
  $AB76: B9 39 AD  LDA $ad39,Y
  $AB79: 85 5E     STA $5e
  $AB7B: 60        RTS
  $AB7C: A8        TAY
  $AB7D: A5 1C     LDA $1c
  $AB7F: 48        PHA
  $AB80: 98        TYA
  $AB81: 48        PHA
  $AB82: 8A        TXA
  $AB83: 48        PHA
  $AB84: A9 07     LDA #$07
  $AB86: 20 C5 83  JSR $83c5
  $AB89: 68        PLA
  $AB8A: AA        TAX
  $AB8B: 68        PLA
  $AB8C: 20 C4 AB  JSR $abc4
  $AB8F: 68        PLA
  $AB90: 20 C5 83  JSR $83c5
  $AB93: 60        RTS
  $AB94: 85 6E     STA $6e
  $AB96: 84 6F     STY $6f
  $AB98: A5 1C     LDA $1c
  $AB9A: 48        PHA
  $AB9B: 8A        TXA
  $AB9C: 48        PHA
  $AB9D: A9 07     LDA #$07
  $AB9F: 20 C5 83  JSR $83c5
  $ABA2: 68        PLA
  $ABA3: AA        TAX
  $ABA4: A4 6F     LDY $6f
  $ABA6: A5 6E     LDA $6e
  $ABA8: C0 07     CPY #$07
  $ABAA: F0 0F     BEQ $abbb
  $ABAC: C0 16     CPY #$16
  $ABAE: F0 0B     BEQ $abbb
  $ABB0: C0 1A     CPY #$1a
  $ABB2: F0 07     BEQ $abbb
  $ABB4: 18        CLC
  $ABB5: 20 E8 AB  JSR $abe8
  $ABB8: 4C BF AB  JMP $abbf
  $ABBB: 18        CLC
  $ABBC: 20 9E AC  JSR $ac9e
  $ABBF: 68        PLA
  $ABC0: 20 C5 83  JSR $83c5
  $ABC3: 60        RTS
  $ABC4: 85 6E     STA $6e
  $ABC6: C9 0B     CMP #$0b
  $ABC8: 90 02     BCC $abcc
  $ABCA: E9 0B     SBC #$0b
  $ABCC: A8        TAY
  $ABCD: 08        PHP
  $ABCE: A5 6E     LDA $6e
  $ABD0: 20 6F AB  JSR $ab6f
  $ABD3: A0 0E     LDY #$0e
  $ABD5: B1 5D     LDA ($5d),Y
  $ABD7: 48        PHA
  $ABD8: A0 03     LDY #$03
  $ABDA: B1 5D     LDA ($5d),Y
  $ABDC: A8        TAY
  $ABDD: 68        PLA
  $ABDE: 28        PLP
  $ABDF: D0 03     BNE $abe4
  $ABE1: 4C 9E AC  JMP $ac9e
  $ABE4: 20 E8 AB  JSR $abe8
  $ABE7: 60        RTS
  $ABE8: 86 6F     STX $6f
  $ABEA: 08        PHP
  $ABEB: E0 06     CPX #$06
  $ABED: D0 09     BNE $abf8
  $ABEF: 28        PLP
  $ABF0: A2 00     LDX #$00
  $ABF2: 8E 99 06  STX $0699
  $ABF5: 4C 5D AC  JMP $ac5d
  $ABF8: 28        PLP
  $ABF9: B0 29     BCS $ac24
  $ABFB: 48        PHA
  $ABFC: 88        DEY
  $ABFD: A9 08     LDA #$08
  $ABFF: 20 EE 83  JSR $83ee
  $AC02: 0A        ASL A
  $AC03: 85 6E     STA $6e
  $AC05: 0A        ASL A
  $AC06: 0A        ASL A
  $AC07: 65 6E     ADC $6e
  $AC09: 85 6E     STA $6e
  $AC0B: A5 6F     LDA $6f
  $AC0D: 65 6E     ADC $6e
  $AC0F: A8        TAY
  $AC10: A9 09     LDA #$09
  $AC12: 20 EE 83  JSR $83ee
  $AC15: 68        PLA
  $AC16: 18        CLC
  $AC17: 71 86     ADC ($86),Y
  $AC19: 10 02     BPL $ac1d
  $AC1B: A9 00     LDA #$00
  $AC1D: C9 20     CMP #$20
  $AC1F: 90 02     BCC $ac23
  $AC21: A9 1F     LDA #$1f
  $AC23: 0A        ASL A
  $AC24: A6 6F     LDX $6f
  $AC26: A0 00     LDY #$00
  $AC28: 84 6F     STY $6f
  $AC2A: 0A        ASL A
  $AC2B: 85 6E     STA $6e
  $AC2D: 0A        ASL A
  $AC2E: 0A        ASL A
  $AC2F: 26 6F     ROL $6f
  $AC31: 0A        ASL A
  $AC32: 26 6F     ROL $6f
  $AC34: 38        SEC
  $AC35: E5 6E     SBC $6e
  $AC37: B0 02     BCS $ac3b
  $AC39: C6 6F     DEC $6f
  $AC3B: 18        CLC
  $AC3C: 6D 0C C0  ADC $c00c
  $AC3F: 85 6E     STA $6e
  $AC41: A5 6F     LDA $6f
  $AC43: 6D 0D C0  ADC $c00d
  $AC46: 85 6F     STA $6f
  $AC48: 8A        TXA
  $AC49: C9 04     CMP #$04
  $AC4B: 90 03     BCC $ac50
  $AC4D: 69 03     ADC #$03
  $AC4F: 24 0A     BIT $0a
  $AC51: A8        TAY
  $AC52: B1 6E     LDA ($6e),Y
  $AC54: AA        TAX
  $AC55: C8        INY
  $AC56: B1 6E     LDA ($6e),Y
  $AC58: 85 6F     STA $6f
  $AC5A: 86 6E     STX $6e
  $AC5C: 60        RTS
  $AC5D: 08        PHP
  $AC5E: B0 16     BCS $ac76
  $AC60: 85 6E     STA $6e
  $AC62: A9 01     LDA #$01
  $AC64: 20 EE 83  JSR $83ee
  $AC67: 18        CLC
  $AC68: 65 6E     ADC $6e
  $AC6A: C9 20     CMP #$20
  $AC6C: 90 02     BCC $ac70
  $AC6E: A9 1F     LDA #$1f
  $AC70: AE 99 06  LDX $0699
  $AC73: D0 01     BNE $ac76
  $AC75: 0A        ASL A
  $AC76: 85 6E     STA $6e
  $AC78: 28        PLP
  $AC79: A2 0B     LDX #$0b
  $AC7B: AC 99 06  LDY $0699
  $AC7E: F0 11     BEQ $ac91
  $AC80: 90 02     BCC $ac84
  $AC82: 46 6E     LSR $6e
  $AC84: 88        DEY
  $AC85: A9 0A     LDA #$0a
  $AC87: 20 EE 83  JSR $83ee
  $AC8A: 18        CLC
  $AC8B: 65 6E     ADC $6e
  $AC8D: 85 6E     STA $6e
  $AC8F: A2 14     LDX #$14
  $AC91: A4 6E     LDY $6e
  $AC93: 8A        TXA
  $AC94: 20 EE 83  JSR $83ee
  $AC97: 85 6E     STA $6e
  $AC99: A9 00     LDA #$00
  $AC9B: 85 6F     STA $6f
  $AC9D: 60        RTS
  $AC9E: 86 6F     STX $6f
  $ACA0: B0 1B     BCS $acbd
  $ACA2: 85 6E     STA $6e
  $ACA4: 88        DEY
  $ACA5: A9 08     LDA #$08
  $ACA7: 20 EE 83  JSR $83ee
  $ACAA: 0A        ASL A
  $ACAB: 0A        ASL A
  $ACAC: 05 6F     ORA $6f
  $ACAE: A8        TAY
  $ACAF: A9 15     LDA #$15
  $ACB1: 20 EE 83  JSR $83ee
  $ACB4: 18        CLC
  $ACB5: 65 6E     ADC $6e
  $ACB7: C9 20     CMP #$20
  $ACB9: 90 02     BCC $acbd
  $ACBB: A9 1F     LDA #$1f
  $ACBD: 85 6E     STA $6e
  $ACBF: 0A        ASL A
  $ACC0: 0A        ASL A
  $ACC1: 65 6E     ADC $6e
  $ACC3: A6 6F     LDX $6f
  $ACC5: F0 03     BEQ $acca
  $ACC7: 38        SEC
  $ACC8: 65 6F     ADC $6f
  $ACCA: A8        TAY
  $ACCB: A9 07     LDA #$07
  $ACCD: 20 EE 83  JSR $83ee
  $ACD0: 85 6E     STA $6e
  $ACD2: C8        INY
  $ACD3: B1 86     LDA ($86),Y
  $ACD5: 85 6F     STA $6f
  $ACD7: 60        RTS
  $ACD8: 00        BRK
  $ACD9: 00        BRK
  $ACDA: 00        BRK
  $ACDB: 00        BRK
  $ACDC: 00        BRK
  $ACDD: 00        BRK
  $ACDE: 00        BRK
  $ACDF: 00        BRK
  $ACE0: 00        BRK
  $ACE1: 00        BRK
  $ACE2: 00        BRK
  $ACE3: 00        BRK
  $ACE4: 00        BRK
  $ACE5: 00        BRK
  $ACE6: 00        BRK
  $ACE7: 00        BRK
  $ACE8: 00        BRK
  $ACE9: 00        BRK
  $ACEA: 00        BRK
  $ACEB: 00        BRK
  $ACEC: 00        BRK
  $ACED: 00        BRK
  $ACEE: 00        BRK
  $ACEF: 00        BRK
  $ACF0: 00        BRK
  $ACF1: 00        BRK
  $ACF2: 00        BRK
  $ACF3: 00        BRK
  $ACF4: 00        BRK
  $ACF5: 00        BRK
  $ACF6: 00        BRK
  $ACF7: 00        BRK
  $ACF8: 00        BRK
  $ACF9: 00        BRK
  $ACFA: 00        BRK
  $ACFB: 00        BRK
  $ACFC: 00        BRK
  $ACFD: 00        BRK
  $ACFE: 00        BRK
  $ACFF: 00        BRK
  $AD00: 00        BRK
  $AD01: 00        BRK
  $AD02: 00        BRK
  $AD03: 00        BRK
  $AD04: 00        BRK
  $AD05: 00        BRK
  $AD06: 00        BRK
  $AD07: 00        BRK
  $AD08: 00        BRK
  $AD09: 00        BRK
  $AD0A: 00        BRK
  $AD0B: 00        BRK
  $AD0C: 00        BRK
  $AD0D: 00        BRK
  $AD0E: 00        BRK
  $AD0F: 00        BRK
  $AD10: 00        BRK
  $AD11: 00        BRK
  $AD12: 00        BRK
  $AD13: 00        BRK
  $AD14: 00        BRK
  $AD15: 00        BRK
  $AD16: 00        BRK
  $AD17: 00        BRK
  $AD18: 00        BRK
  $AD19: 00        BRK
  $AD1A: 00        BRK
  $AD1B: 00        BRK
  $AD1C: 00        BRK
  $AD1D: 00        BRK
  $AD1E: 00        BRK
  $AD1F: 00        BRK
  $AD20: 00        BRK
  $AD21: 00        BRK
  $AD22: 00        BRK
  $AD23: 00        BRK
  $AD24: 00        BRK
  $AD25: 00        BRK
  $AD26: 00        BRK
  $AD27: 00        BRK
  $AD28: 00        BRK
  $AD29: 00        BRK
  $AD2A: 00        BRK
  $AD2B: 00        BRK
  $AD2C: 00        BRK
  $AD2D: 00        BRK
  $AD2E: 00        BRK
  $AD2F: 00        BRK
  $AD30: 00        BRK
  $AD31: 00        BRK
  $AD32: 00        BRK
  $AD33: 00        BRK
  $AD34: 00        BRK
  $AD35: 00        BRK
  $AD36: 00        BRK
  $AD37: 00        BRK
  $AD38: F7 03     ISB $03,X
  $AD3A: 09 04     ORA #$04
  $AD3C: 1B 04 2D  SLO $2d04,Y
  $AD3F: 04 3F     NOP $3f
  $AD41: 04 51     NOP $51
  $AD43: 04 63     NOP $63
  $AD45: 04 75     NOP $75
  $AD47: 04 87     NOP $87
  $AD49: 04 99     NOP $99
  $AD4B: 04 AB     NOP $ab
  $AD4D: 04 BD     NOP $bd
  $AD4F: 04 CF     NOP $cf
  $AD51: 04 E1     NOP $e1
  $AD53: 04 F3     NOP $f3
  $AD55: 04 05     NOP $05
  $AD57: 05 17     ORA $17
  $AD59: 05 29     ORA $29
  $AD5B: 05 3B     ORA $3b
  $AD5D: 05 4D     ORA $4d
  $AD5F: 05 5F     ORA $5f
  $AD61: 05 71     ORA $71
  $AD63: 05 83     ORA $83
  $AD65: 05 48     ORA $48
  $AD67: 20 6F AB  JSR $ab6f
  $AD6A: A0 03     LDY #$03
  $AD6C: B1 5D     LDA ($5d),Y
  $AD6E: 08        PHP
  $AD6F: 20 9A AD  JSR $ad9a
  $AD72: 28        PLP
  $AD73: F0 02     BEQ $ad77
  $AD75: 68        PLA
  $AD76: 60        RTS
  $AD77: 68        PLA
  $AD78: C9 0B     CMP #$0b
  $AD7A: 90 02     BCC $ad7e
  $AD7C: E9 0B     SBC #$0b
  $AD7E: A8        TAY
  $AD7F: D0 05     BNE $ad86
  $AD81: A9 61     LDA #$61
  $AD83: 4C 9C AD  JMP $ad9c
  $AD86: A0 3A     LDY #$3a
  $AD88: 18        CLC
  $AD89: 69 3F     ADC #$3f
  $AD8B: C9 48     CMP #$48
  $AD8D: 90 04     BCC $ad93
  $AD8F: E9 0A     SBC #$0a
  $AD91: A0 3F     LDY #$3f
  $AD93: 8C F4 05  STY $05f4
  $AD96: 8D F5 05  STA $05f5
  $AD99: 60        RTS
  $AD9A: 85 69     STA $69
  $AD9C: 0A        ASL A
  $AD9D: A8        TAY
  $AD9E: B9 8B BC  LDA $bc8b,Y
  $ADA1: 85 65     STA $65
  $ADA3: B9 8C BC  LDA $bc8c,Y
  $ADA6: 85 66     STA $66
  $ADA8: A0 00     LDY #$00
  $ADAA: B1 65     LDA ($65),Y
  $ADAC: 85 68     STA $68
  $ADAE: C8        INY
  $ADAF: 84 67     STY $67
  $ADB1: 60        RTS
  $ADB2: A0 00     LDY #$00
  $ADB4: C9 4A     CMP #$4a
  $ADB6: D0 04     BNE $adbc
  $ADB8: A9 04     LDA #$04
  $ADBA: D0 2F     BNE $adeb
  $ADBC: C9 4B     CMP #$4b
  $ADBE: D0 04     BNE $adc4
  $ADC0: A9 D4     LDA #$d4
  $ADC2: D0 27     BNE $adeb
  $ADC4: A8        TAY
  $ADC5: 08        PHP
  $ADC6: A0 00     LDY #$00
  $ADC8: 29 7F     AND #$7f
  $ADCA: C9 6D     CMP #$6d
  $ADCC: 90 05     BCC $add3
  $ADCE: 69 52     ADC #$52
  $ADD0: 28        PLP
  $ADD1: D0 18     BNE $adeb
  $ADD3: C9 4A     CMP #$4a
  $ADD5: 90 0B     BCC $ade2
  $ADD7: E9 4A     SBC #$4a
  $ADD9: A0 58     LDY #$58
  $ADDB: C9 1E     CMP #$1e
  $ADDD: 90 03     BCC $ade2
  $ADDF: C8        INY
  $ADE0: E9 05     SBC #$05
  $ADE2: 18        CLC
  $ADE3: 69 26     ADC #$26
  $ADE5: 28        PLP
  $ADE6: 10 03     BPL $adeb
  $ADE8: 18        CLC
  $ADE9: 69 52     ADC #$52
  $ADEB: 60        RTS
  $ADEC: 48        PHA
  $ADED: 20 EB 86  JSR $86eb
  $ADF0: 68        PLA
  $ADF1: A2 00     LDX #$00
  $ADF3: 8D E1 03  STA $03e1
  $ADF6: 8E 96 06  STX $0696
  $ADF9: A9 80     LDA #$80
  $ADFB: 8D DF 03  STA $03df
  $ADFE: A9 FF     LDA #$ff
  $AE00: 8D 30 00  STA $0030
  $AE03: 60        RTS
  $AE04: A9 00     LDA #$00
  $AE06: 8D EB 05  STA $05eb
  $AE09: A9 25     LDA #$25
  $AE0B: 20 D2 84  JSR $84d2
  $AE0E: 20 5C B2  JSR $b25c
  $AE11: AD DF 03  LDA $03df
  $AE14: D0 03     BNE $ae19
  $AE16: 4C A2 AE  JMP $aea2
  $AE19: A9 07     LDA #$07
  $AE1B: 20 C5 83  JSR $83c5
  $AE1E: AD DF 03  LDA $03df
  $AE21: 10 2D     BPL $ae50
  $AE23: AD 26 C0  LDA $c026
  $AE26: 85 4D     STA $4d
  $AE28: AD E1 03  LDA $03e1
  $AE2B: 0A        ASL A
  $AE2C: 2E 96 06  ROL $0696
  $AE2F: A8        TAY
  $AE30: AD 27 C0  LDA $c027
  $AE33: 6D 96 06  ADC $0696
  $AE36: 85 4E     STA $4e
  $AE38: B1 4D     LDA ($4d),Y
  $AE3A: AA        TAX
  $AE3B: C8        INY
  $AE3C: B1 4D     LDA ($4d),Y
  $AE3E: 86 4D     STX $4d
  $AE40: 85 4E     STA $4e
  $AE42: A9 00     LDA #$00
  $AE44: 8D E0 03  STA $03e0
  $AE47: A9 01     LDA #$01
  $AE49: 8D DF 03  STA $03df
  $AE4C: 20 6D AF  JSR $af6d
  $AE4F: 60        RTS
  $AE50: A9 02     LDA #$02
  $AE52: 2C DF 03  BIT $03df
  $AE55: F0 27     BEQ $ae7e
  $AE57: AE 41 00  LDX $0041
  $AE5A: D0 21     BNE $ae7d
  $AE5C: 4D DF 03  EOR $03df
  $AE5F: 8D DF 03  STA $03df
  $AE62: A0 00     LDY #$00
  $AE64: 8C A1 05  STY $05a1
  $AE67: B1 4D     LDA ($4d),Y
  $AE69: 8D E0 03  STA $03e0
  $AE6C: A5 71     LDA $71
  $AE6E: 20 6A B2  JSR $b26a
  $AE71: A5 72     LDA $72
  $AE73: 20 BE B4  JSR $b4be
  $AE76: A9 00     LDA #$00
  $AE78: 85 74     STA $74
  $AE7A: 20 C5 AE  JSR $aec5
  $AE7D: 60        RTS
  $AE7E: CE E0 03  DEC $03e0
  $AE81: AD E0 03  LDA $03e0
  $AE84: C9 0A     CMP #$0a
  $AE86: B0 16     BCS $ae9e
  $AE88: A9 04     LDA #$04
  $AE8A: 65 4D     ADC $4d
  $AE8C: 85 4D     STA $4d
  $AE8E: 90 02     BCC $ae92
  $AE90: E6 4E     INC $4e
  $AE92: AD DF 03  LDA $03df
  $AE95: 29 FB     AND #$fb
  $AE97: 8D DF 03  STA $03df
  $AE9A: 20 6D AF  JSR $af6d
  $AE9D: 60        RTS
  $AE9E: 20 A2 AE  JSR $aea2
  $AEA1: 60        RTS
  $AEA2: AD 41 00  LDA $0041
  $AEA5: D0 0B     BNE $aeb2
  $AEA7: 20 2A 9A  JSR $9a2a
  $AEAA: A9 26     LDA #$26
  $AEAC: 20 D2 84  JSR $84d2
  $AEAF: 20 CB B4  JSR $b4cb
  $AEB2: A9 31     LDA #$31
  $AEB4: 20 D2 84  JSR $84d2
  $AEB7: A5 6B     LDA $6b
  $AEB9: F0 09     BEQ $aec4
  $AEBB: C6 6B     DEC $6b
  $AEBD: D0 05     BNE $aec4
  $AEBF: A5 6A     LDA $6a
  $AEC1: 20 EF 84  JSR $84ef
  $AEC4: 60        RTS
  $AEC5: A9 00     LDA #$00
  $AEC7: 85 75     STA $75
  $AEC9: 8D CC 03  STA $03cc
  $AECC: 85 7C     STA $7c
  $AECE: 85 74     STA $74
  $AED0: 8D A1 05  STA $05a1
  $AED3: A2 80     LDX #$80
  $AED5: A5 73     LDA $73
  $AED7: 4A        LSR A
  $AED8: 90 02     BCC $aedc
  $AEDA: 86 75     STX $75
  $AEDC: 4A        LSR A
  $AEDD: 90 03     BCC $aee2
  $AEDF: 8E CC 03  STX $03cc
  $AEE2: 4A        LSR A
  $AEE3: 90 02     BCC $aee7
  $AEE5: 86 7C     STX $7c
  $AEE7: 4A        LSR A
  $AEE8: 90 04     BCC $aeee
  $AEEA: 86 74     STX $74
  $AEEC: 46 74     LSR $74
  $AEEE: 4A        LSR A
  $AEEF: 90 03     BCC $aef4
  $AEF1: 8E A1 05  STX $05a1
  $AEF4: 60        RTS
  $AEF5: A0 01     LDY #$01
  $AEF7: B1 4D     LDA ($4d),Y
  $AEF9: C9 F0     CMP #$f0
  $AEFB: 90 03     BCC $af00
  $AEFD: 20 0C AF  JSR $af0c
  $AF00: 20 54 B2  JSR $b254
  $AF03: AD DF 03  LDA $03df
  $AF06: 09 02     ORA #$02
  $AF08: 8D DF 03  STA $03df
  $AF0B: 60        RTS
  $AF0C: 29 07     AND #$07
  $AF0E: 20 4D 83  JSR $834d
  $AF11: 21 AF     AND ($af,X)
  $AF13: 5E AF 5E  LSR $5eaf,X
  $AF16: AF 5E AF  LAX $af5e
  $AF19: 5E AF 5E  LSR $5eaf,X
  $AF1C: AF 5E AF  LAX $af5e
  $AF1F: 5E AF 20  LSR $20af,X
  $AF22: 40        RTI
  $AF23: B2        ???
  $AF24: C9 02     CMP #$02
  $AF26: 90 03     BCC $af2b
  $AF28: A9 34     LDA #$34
  $AF2A: 60        RTS
  $AF2B: 49 80     EOR #$80
  $AF2D: 2A        ROL A
  $AF2E: 2A        ROL A
  $AF2F: 4D E3 05  EOR $05e3
  $AF32: 4A        LSR A
  $AF33: 08        PHP
  $AF34: AD 90 05  LDA $0590
  $AF37: 90 04     BCC $af3d
  $AF39: 49 FF     EOR #$ff
  $AF3B: 69 9F     ADC #$9f
  $AF3D: 4A        LSR A
  $AF3E: 4A        LSR A
  $AF3F: 4A        LSR A
  $AF40: 4A        LSR A
  $AF41: AA        TAX
  $AF42: BD 54 AF  LDA $af54,X
  $AF45: 28        PLP
  $AF46: 90 02     BCC $af4a
  $AF48: E9 0A     SBC #$0a
  $AF4A: AE 8C 05  LDX $058c
  $AF4D: E0 30     CPX #$30
  $AF4F: B0 02     BCS $af53
  $AF51: 69 01     ADC #$01
  $AF53: 60        RTS
  $AF54: 0A        ASL A
  $AF55: 0A        ASL A
  $AF56: 0C 0C 0A  NOP $0a0c
  $AF59: 0E 0E 0E  ASL $0e0e
  $AF5C: 10 12     BPL $af70
  $AF5E: A9 FF     LDA #$ff
  $AF60: 60        RTS
  $AF61: A0 02     LDY #$02
  $AF63: B1 4D     LDA ($4d),Y
  $AF65: 85 71     STA $71
  $AF67: C8        INY
  $AF68: B1 4D     LDA ($4d),Y
  $AF6A: 85 72     STA $72
  $AF6C: 60        RTS
  $AF6D: A9 00     LDA #$00
  $AF6F: 85 00     STA $00
  $AF71: 85 73     STA $73
  $AF73: A4 00     LDY $00
  $AF75: B1 4D     LDA ($4d),Y
  $AF77: C9 F0     CMP #$f0
  $AF79: 90 06     BCC $af81
  $AF7B: 20 92 AF  JSR $af92
  $AF7E: 4C 73 AF  JMP $af73
  $AF81: 98        TYA
  $AF82: 18        CLC
  $AF83: 65 4D     ADC $4d
  $AF85: 85 4D     STA $4d
  $AF87: 90 02     BCC $af8b
  $AF89: E6 4E     INC $4e
  $AF8B: 20 61 AF  JSR $af61
  $AF8E: 20 F5 AE  JSR $aef5
  $AF91: 60        RTS
  $AF92: E6 00     INC $00
  $AF94: 29 0F     AND #$0f
  $AF96: 20 4D 83  JSR $834d
  $AF99: B9 AF D1  LDA $d1af,Y
  $AF9C: AF D7 AF  LAX $afd7
  $AF9F: E5 AF     SBC $af
  $AFA1: F3 AF     ISB ($af),Y
  $AFA3: 01 B0     ORA ($b0,X)
  $AFA5: 07 B0     SLO $b0
  $AFA7: 0D B0 1C  ORA $1cb0
  $AFAA: B0 00     BCS $afac
  $AFAC: 00        BRK
  $AFAD: 00        BRK
  $AFAE: 00        BRK
  $AFAF: 00        BRK
  $AFB0: 00        BRK
  $AFB1: 00        BRK
  $AFB2: 00        BRK
  $AFB3: 00        BRK
  $AFB4: 00        BRK
  $AFB5: 00        BRK
  $AFB6: 00        BRK
  $AFB7: BD AF 20  LDA $20af,X
  $AFBA: 2A        ROL A
  $AFBB: B2        ???
  $AFBC: 60        RTS
  $AFBD: 68        PLA
  $AFBE: 68        PLA
  $AFBF: A9 00     LDA #$00
  $AFC1: 8D DF 03  STA $03df
  $AFC4: 8D BE 03  STA $03be
  $AFC7: 8D 29 00  STA $0029
  $AFCA: EE E4 03  INC $03e4
  $AFCD: 20 E2 86  JSR $86e2
  $AFD0: 60        RTS
  $AFD1: 20 2A B2  JSR $b22a
  $AFD4: 4C CA AF  JMP $afca
  $AFD7: A4 00     LDY $00
  $AFD9: B1 4D     LDA ($4d),Y
  $AFDB: 85 82     STA $82
  $AFDD: E6 00     INC $00
  $AFDF: A9 01     LDA #$01
  $AFE1: 20 3B B2  JSR $b23b
  $AFE4: 60        RTS
  $AFE5: A4 00     LDY $00
  $AFE7: B1 4D     LDA ($4d),Y
  $AFE9: 85 84     STA $84
  $AFEB: E6 00     INC $00
  $AFED: A9 04     LDA #$04
  $AFEF: 20 3B B2  JSR $b23b
  $AFF2: 60        RTS
  $AFF3: A4 00     LDY $00
  $AFF5: B1 4D     LDA ($4d),Y
  $AFF7: 85 83     STA $83
  $AFF9: E6 00     INC $00
  $AFFB: A9 02     LDA #$02
  $AFFD: 20 3B B2  JSR $b23b
  $B000: 60        RTS
  $B001: A9 08     LDA #$08
  $B003: 20 3B B2  JSR $b23b
  $B006: 60        RTS
  $B007: A9 10     LDA #$10
  $B009: 20 3B B2  JSR $b23b
  $B00C: 60        RTS
  $B00D: A4 00     LDY $00
  $B00F: B1 4D     LDA ($4d),Y
  $B011: 85 6A     STA $6a
  $B013: C8        INY
  $B014: B1 4D     LDA ($4d),Y
  $B016: 85 6B     STA $6b
  $B018: C8        INY
  $B019: 84 00     STY $00
  $B01B: 60        RTS
  $B01C: 20 5E B0  JSR $b05e
  $B01F: A4 00     LDY $00
  $B021: B1 4D     LDA ($4d),Y
  $B023: 20 2F B0  JSR $b02f
  $B026: 0A        ASL A
  $B027: 38        SEC
  $B028: 65 00     ADC $00
  $B02A: 85 00     STA $00
  $B02C: 4C 2A B2  JMP $b22a
  $B02F: 20 4D 83  JSR $834d
  $B032: 6C B0 87  JMP ($87b0)
  $B035: B0 92     BCS $afc9
  $B037: B0 9B     BCS $afd4
  $B039: B0 C8     BCS $b003
  $B03B: B0 CB     BCS $b008
  $B03D: B0 D3     BCS $b012
  $B03F: B0 D6     BCS $b017
  $B041: B0 E0     BCS $b023
  $B043: B0 E9     BCS $b02e
  $B045: B0 EF     BCS $b036
  $B047: B0 F3     BCS $b03c
  $B049: B0 8F     BCS $afda
  $B04B: B1 93     LDA ($93),Y
  $B04D: B1 9D     LDA ($9d),Y
  $B04F: B1 AD     LDA ($ad),Y
  $B051: B1 B7     LDA ($b7),Y
  $B053: B1 BA     LDA ($ba),Y
  $B055: B1 BE     LDA ($be),Y
  $B057: B1 D5     LDA ($d5),Y
  $B059: B1 E6     LDA ($e6),Y
  $B05B: B1 18     LDA ($18),Y
  $B05D: B2        ???
  $B05E: AD 8B 05  LDA $058b
  $B061: 29 80     AND #$80
  $B063: 18        CLC
  $B064: 2A        ROL A
  $B065: 2A        ROL A
  $B066: 4D E3 05  EOR $05e3
  $B069: 85 08     STA $08
  $B06B: 60        RTS
  $B06C: AE 99 06  LDX $0699
  $B06F: BD 75 B0  LDA $b075,X
  $B072: 65 08     ADC $08
  $B074: 60        RTS
  $B075: 00        BRK
  $B076: 00        BRK
  $B077: 02        ???
  $B078: 16 02     ASL $02,X
  $B07A: 04 06     NOP $06
  $B07C: 08        PHP
  $B07D: 0A        ASL A
  $B07E: 0C 0E 10  NOP $100e
  $B081: 12        ???
  $B082: 14 18     NOP $18,X
  $B084: 1A        NOP
  $B085: 18        CLC
  $B086: 1C AD A7  NOP $a7ad,X
  $B089: 06 AE     ASL $ae
  $B08B: E3 05     ISB ($05,X)
  $B08D: F0 02     BEQ $b091
  $B08F: 09 04     ORA #$04
  $B091: 60        RTS
  $B092: AD 95 05  LDA $0595
  $B095: 49 01     EOR #$01
  $B097: 0A        ASL A
  $B098: 05 08     ORA $08
  $B09A: 60        RTS
  $B09B: AD 99 06  LDA $0699
  $B09E: F0 27     BEQ $b0c7
  $B0A0: C9 06     CMP #$06
  $B0A2: B0 20     BCS $b0c4
  $B0A4: C9 05     CMP #$05
  $B0A6: D0 14     BNE $b0bc
  $B0A8: AD 9F 05  LDA $059f
  $B0AB: 20 6F AB  JSR $ab6f
  $B0AE: A0 03     LDY #$03
  $B0B0: B1 5D     LDA ($5d),Y
  $B0B2: AA        TAX
  $B0B3: A9 09     LDA #$09
  $B0B5: CA        DEX
  $B0B6: F0 0F     BEQ $b0c7
  $B0B8: A9 0A     LDA #$0a
  $B0BA: D0 0B     BNE $b0c7
  $B0BC: 38        SEC
  $B0BD: E9 01     SBC #$01
  $B0BF: 0A        ASL A
  $B0C0: 38        SEC
  $B0C1: 65 08     ADC $08
  $B0C3: 60        RTS
  $B0C4: 18        CLC
  $B0C5: 69 05     ADC #$05
  $B0C7: 60        RTS
  $B0C8: 4C 92 B0  JMP $b092
  $B0CB: AD BB 05  LDA $05bb
  $B0CE: 29 02     AND #$02
  $B0D0: 05 08     ORA $08
  $B0D2: 60        RTS
  $B0D3: A9 00     LDA #$00
  $B0D5: 60        RTS
  $B0D6: AE C1 05  LDX $05c1
  $B0D9: CA        DEX
  $B0DA: F0 02     BEQ $b0de
  $B0DC: A2 01     LDX #$01
  $B0DE: 8A        TXA
  $B0DF: 60        RTS
  $B0E0: AD 8A 00  LDA $008a
  $B0E3: 4D E3 05  EOR $05e3
  $B0E6: 29 01     AND #$01
  $B0E8: 60        RTS
  $B0E9: AD BB 05  LDA $05bb
  $B0EC: 29 01     AND #$01
  $B0EE: 60        RTS
  $B0EF: AD 32 06  LDA $0632
  $B0F2: 60        RTS
  $B0F3: AD E5 03  LDA $03e5
  $B0F6: F0 04     BEQ $b0fc
  $B0F8: C9 02     CMP #$02
  $B0FA: D0 10     BNE $b10c
  $B0FC: A2 00     LDX #$00
  $B0FE: AD E0 05  LDA $05e0
  $B101: CD E1 05  CMP $05e1
  $B104: F0 04     BEQ $b10a
  $B106: E8        INX
  $B107: B0 01     BCS $b10a
  $B109: E8        INX
  $B10A: 8A        TXA
  $B10B: 60        RTS
  $B10C: AD E5 03  LDA $03e5
  $B10F: C9 04     CMP #$04
  $B111: D0 0A     BNE $b11d
  $B113: AD 9B 05  LDA $059b
  $B116: 38        SEC
  $B117: ED 9C 05  SBC $059c
  $B11A: 4C 24 B1  JMP $b124
  $B11D: AD E0 05  LDA $05e0
  $B120: 38        SEC
  $B121: ED E1 05  SBC $05e1
  $B124: F0 42     BEQ $b168
  $B126: 90 34     BCC $b15c
  $B128: A2 04     LDX #$04
  $B12A: AD DC 06  LDA $06dc
  $B12D: AC 4F 06  LDY $064f
  $B130: C9 06     CMP #$06
  $B132: F0 26     BEQ $b15a
  $B134: E8        INX
  $B135: C9 07     CMP #$07
  $B137: F0 21     BEQ $b15a
  $B139: C0 0D     CPY #$0d
  $B13B: F0 1D     BEQ $b15a
  $B13D: E8        INX
  $B13E: C9 08     CMP #$08
  $B140: F0 18     BEQ $b15a
  $B142: C0 0E     CPY #$0e
  $B144: F0 14     BEQ $b15a
  $B146: E8        INX
  $B147: C9 09     CMP #$09
  $B149: F0 0F     BEQ $b15a
  $B14B: C0 0F     CPY #$0f
  $B14D: F0 0B     BEQ $b15a
  $B14F: A2 03     LDX #$03
  $B151: AD E5 03  LDA $03e5
  $B154: C9 03     CMP #$03
  $B156: D0 02     BNE $b15a
  $B158: A2 08     LDX #$08
  $B15A: 8A        TXA
  $B15B: 60        RTS
  $B15C: A2 0B     LDX #$0b
  $B15E: AD E5 03  LDA $03e5
  $B161: C9 04     CMP #$04
  $B163: F0 01     BEQ $b166
  $B165: CA        DEX
  $B166: 8A        TXA
  $B167: 60        RTS
  $B168: AD E5 03  LDA $03e5
  $B16B: C9 01     CMP #$01
  $B16D: D0 14     BNE $b183
  $B16F: A2 0E     LDX #$0e
  $B171: AD 4F 06  LDA $064f
  $B174: C9 07     CMP #$07
  $B176: 90 09     BCC $b181
  $B178: F0 05     BEQ $b17f
  $B17A: CA        DEX
  $B17B: C9 0D     CMP #$0d
  $B17D: 90 02     BCC $b181
  $B17F: A2 0C     LDX #$0c
  $B181: 8A        TXA
  $B182: 60        RTS
  $B183: A9 09     LDA #$09
  $B185: AE 4F 06  LDX $064f
  $B188: E0 07     CPX #$07
  $B18A: F0 02     BEQ $b18e
  $B18C: A9 0E     LDA #$0e
  $B18E: 60        RTS
  $B18F: AD E3 05  LDA $05e3
  $B192: 60        RTS
  $B193: AD ED 05  LDA $05ed
  $B196: C9 0E     CMP #$0e
  $B198: 08        PHP
  $B199: 68        PLA
  $B19A: 29 01     AND #$01
  $B19C: 60        RTS
  $B19D: A2 00     LDX #$00
  $B19F: AD E3 05  LDA $05e3
  $B1A2: D0 07     BNE $b1ab
  $B1A4: E8        INX
  $B1A5: AD DE 06  LDA $06de
  $B1A8: F0 01     BEQ $b1ab
  $B1AA: E8        INX
  $B1AB: 8A        TXA
  $B1AC: 60        RTS
  $B1AD: A5 08     LDA $08
  $B1AF: AE E3 05  LDX $05e3
  $B1B2: D0 02     BNE $b1b6
  $B1B4: A9 01     LDA #$01
  $B1B6: 60        RTS
  $B1B7: 4C C8 B0  JMP $b0c8
  $B1BA: AD 95 05  LDA $0595
  $B1BD: 60        RTS
  $B1BE: A9 00     LDA #$00
  $B1C0: 20 6F AB  JSR $ab6f
  $B1C3: A0 03     LDY #$03
  $B1C5: A2 00     LDX #$00
  $B1C7: B1 5D     LDA ($5d),Y
  $B1C9: C9 07     CMP #$07
  $B1CB: F0 06     BEQ $b1d3
  $B1CD: E8        INX
  $B1CE: C9 16     CMP #$16
  $B1D0: F0 01     BEQ $b1d3
  $B1D2: E8        INX
  $B1D3: 8A        TXA
  $B1D4: 60        RTS
  $B1D5: AD BB 05  LDA $05bb
  $B1D8: 29 0F     AND #$0f
  $B1DA: C9 03     CMP #$03
  $B1DC: 90 04     BCC $b1e2
  $B1DE: E9 03     SBC #$03
  $B1E0: 10 F8     BPL $b1da
  $B1E2: 0A        ASL A
  $B1E3: 05 08     ORA $08
  $B1E5: 60        RTS
  $B1E6: 20 0F 91  JSR $910f
  $B1E9: 48        PHA
  $B1EA: 20 6F AB  JSR $ab6f
  $B1ED: A0 03     LDY #$03
  $B1EF: B1 5D     LDA ($5d),Y
  $B1F1: A8        TAY
  $B1F2: 68        PLA
  $B1F3: F0 14     BEQ $b209
  $B1F5: A2 06     LDX #$06
  $B1F7: 98        TYA
  $B1F8: F0 1C     BEQ $b216
  $B1FA: A2 02     LDX #$02
  $B1FC: C0 16     CPY #$16
  $B1FE: F0 16     BEQ $b216
  $B200: E8        INX
  $B201: E8        INX
  $B202: C0 1F     CPY #$1f
  $B204: F0 10     BEQ $b216
  $B206: E8        INX
  $B207: D0 0D     BNE $b216
  $B209: A2 00     LDX #$00
  $B20B: C0 07     CPY #$07
  $B20D: F0 07     BEQ $b216
  $B20F: E8        INX
  $B210: C0 16     CPY #$16
  $B212: F0 02     BEQ $b216
  $B214: E8        INX
  $B215: E8        INX
  $B216: 8A        TXA
  $B217: 60        RTS
  $B218: A2 00     LDX #$00
  $B21A: AD A6 06  LDA $06a6
  $B21D: C9 0A     CMP #$0a
  $B21F: F0 04     BEQ $b225
  $B221: E8        INX
  $B222: B0 01     BCS $b225
  $B224: E8        INX
  $B225: 8A        TXA
  $B226: 60        RTS
  $B227: A9 00     LDA #$00
  $B229: 60        RTS
  $B22A: A4 00     LDY $00
  $B22C: B1 4D     LDA ($4d),Y
  $B22E: AA        TAX
  $B22F: C8        INY
  $B230: B1 4D     LDA ($4d),Y
  $B232: 85 4E     STA $4e
  $B234: 86 4D     STX $4d
  $B236: A9 00     LDA #$00
  $B238: 85 00     STA $00
  $B23A: 60        RTS
  $B23B: 05 73     ORA $73
  $B23D: 85 73     STA $73
  $B23F: 60        RTS
  $B240: A5 71     LDA $71
  $B242: C9 FF     CMP #$ff
  $B244: F0 0B     BEQ $b251
  $B246: 4A        LSR A
  $B247: AA        TAX
  $B248: BD 50 BA  LDA $ba50,X
  $B24B: B0 04     BCS $b251
  $B24D: 4A        LSR A
  $B24E: 4A        LSR A
  $B24F: 4A        LSR A
  $B250: 4A        LSR A
  $B251: 29 0F     AND #$0f
  $B253: 60        RTS
  $B254: 8D 40 00  STA $0040
  $B257: A9 80     LDA #$80
  $B259: 85 3C     STA $3c
  $B25B: 60        RTS
  $B25C: A9 20     LDA #$20
  $B25E: 20 D2 84  JSR $84d2
  $B261: 60        RTS
  $B262: A9 00     LDA #$00
  $B264: 85 43     STA $43
  $B266: 8D BC 05  STA $05bc
  $B269: 60        RTS
  $B26A: C9 FF     CMP #$ff
  $B26C: F0 07     BEQ $b275
  $B26E: 8D DA 03  STA $03da
  $B271: A9 80     LDA #$80
  $B273: 85 43     STA $43
  $B275: 60        RTS
  $B276: AD BC 05  LDA $05bc
  $B279: F0 2E     BEQ $b2a9
  $B27B: EE EB 05  INC $05eb
  $B27E: AD D7 03  LDA $03d7
  $B281: 45 74     EOR $74
  $B283: 85 92     STA $92
  $B285: AD D8 03  LDA $03d8
  $B288: 85 39     STA $39
  $B28A: A9 03     LDA #$03
  $B28C: 20 C5 83  JSR $83c5
  $B28F: A9 00     LDA #$00
  $B291: 85 00     STA $00
  $B293: AD D9 03  LDA $03d9
  $B296: 85 38     STA $38
  $B298: A6 00     LDX $00
  $B29A: BD BD 05  LDA $05bd,X
  $B29D: 20 FE B3  JSR $b3fe
  $B2A0: E6 00     INC $00
  $B2A2: A5 00     LDA $00
  $B2A4: CD BC 05  CMP $05bc
  $B2A7: D0 EA     BNE $b293
  $B2A9: 60        RTS
  $B2AA: AD 00 06  LDA $0600
  $B2AD: F0 10     BEQ $b2bf
  $B2AF: AD 19 06  LDA $0619
  $B2B2: 85 39     STA $39
  $B2B4: AD 1A 06  LDA $061a
  $B2B7: 85 38     STA $38
  $B2B9: AD 1E 06  LDA $061e
  $B2BC: 20 F7 B3  JSR $b3f7
  $B2BF: 60        RTS
  $B2C0: 20 52 B4  JSR $b452
  $B2C3: 20 76 B2  JSR $b276
  $B2C6: A5 43     LDA $43
  $B2C8: D0 01     BNE $b2cb
  $B2CA: 60        RTS
  $B2CB: 10 4F     BPL $b31c
  $B2CD: A9 05     LDA #$05
  $B2CF: 20 C5 83  JSR $83c5
  $B2D2: AD DA 03  LDA $03da
  $B2D5: D0 07     BNE $b2de
  $B2D7: 48        PHA
  $B2D8: A9 02     LDA #$02
  $B2DA: 20 73 83  JSR $8373
  $B2DD: 68        PLA
  $B2DE: A2 00     LDX #$00
  $B2E0: 86 46     STX $46
  $B2E2: 0A        ASL A
  $B2E3: 26 46     ROL $46
  $B2E5: 6D 00 C0  ADC $c000
  $B2E8: 85 45     STA $45
  $B2EA: AD 01 C0  LDA $c001
  $B2ED: 6D 46 00  ADC $0046
  $B2F0: 85 46     STA $46
  $B2F2: A0 00     LDY #$00
  $B2F4: B1 45     LDA ($45),Y
  $B2F6: AA        TAX
  $B2F7: C8        INY
  $B2F8: B1 45     LDA ($45),Y
  $B2FA: 86 45     STX $45
  $B2FC: 85 46     STA $46
  $B2FE: A9 00     LDA #$00
  $B300: 85 47     STA $47
  $B302: 85 44     STA $44
  $B304: A9 01     LDA #$01
  $B306: 85 43     STA $43
  $B308: A9 00     LDA #$00
  $B30A: 8D BC 05  STA $05bc
  $B30D: 8D 00 06  STA $0600
  $B310: 8D 1B 06  STA $061b
  $B313: 8D D7 03  STA $03d7
  $B316: 8D 1F 06  STA $061f
  $B319: 4C 2E B3  JMP $b32e
  $B31C: A5 43     LDA $43
  $B31E: 29 02     AND #$02
  $B320: D0 06     BNE $b328
  $B322: A5 44     LDA $44
  $B324: F0 03     BEQ $b329
  $B326: C6 44     DEC $44
  $B328: 60        RTS
  $B329: A9 05     LDA #$05
  $B32B: 20 C5 83  JSR $83c5
  $B32E: AD D7 03  LDA $03d7
  $B331: 85 01     STA $01
  $B333: 29 80     AND #$80
  $B335: 8D D7 03  STA $03d7
  $B338: A4 47     LDY $47
  $B33A: B1 45     LDA ($45),Y
  $B33C: 30 28     BMI $b366
  $B33E: AA        TAX
  $B33F: 29 60     AND #$60
  $B341: 4A        LSR A
  $B342: 4A        LSR A
  $B343: 4A        LSR A
  $B344: 4A        LSR A
  $B345: 4A        LSR A
  $B346: 85 00     STA $00
  $B348: 8A        TXA
  $B349: 29 1F     AND #$1f
  $B34B: 85 44     STA $44
  $B34D: C8        INY
  $B34E: A9 00     LDA #$00
  $B350: 8D BC 05  STA $05bc
  $B353: B1 45     LDA ($45),Y
  $B355: AE BC 05  LDX $05bc
  $B358: 9D BD 05  STA $05bd,X
  $B35B: EE BC 05  INC $05bc
  $B35E: C8        INY
  $B35F: C6 00     DEC $00
  $B361: 10 F0     BPL $b353
  $B363: 84 47     STY $47
  $B365: 60        RTS
  $B366: AA        TAX
  $B367: 29 40     AND #$40
  $B369: D0 12     BNE $b37d
  $B36B: 8A        TXA
  $B36C: 29 3F     AND #$3f
  $B36E: 20 4D 83  JSR $834d
  $B371: 9B B3 A5  TAS $a5b3,Y
  $B374: B3 B4     LAX ($b4),Y
  $B376: B3 C2     LAX ($c2),Y
  $B378: B3 D6     LAX ($d6),Y
  $B37A: B3 E3     LAX ($e3),Y
  $B37C: B3 C8     LAX ($c8),Y
  $B37E: B1 45     LDA ($45),Y
  $B380: 8D 05 06  STA $0605
  $B383: 8D 19 06  STA $0619
  $B386: C8        INY
  $B387: B1 45     LDA ($45),Y
  $B389: 8D 09 06  STA $0609
  $B38C: 8D 1A 06  STA $061a
  $B38F: C8        INY
  $B390: B1 45     LDA ($45),Y
  $B392: C8        INY
  $B393: 84 47     STY $47
  $B395: 20 49 B4  JSR $b449
  $B398: 4C 38 B3  JMP $b338
  $B39B: A9 00     LDA #$00
  $B39D: 85 43     STA $43
  $B39F: A5 01     LDA $01
  $B3A1: 8D D7 03  STA $03d7
  $B3A4: 60        RTS
  $B3A5: A4 47     LDY $47
  $B3A7: C8        INY
  $B3A8: B1 45     LDA ($45),Y
  $B3AA: 85 49     STA $49
  $B3AC: C8        INY
  $B3AD: 84 47     STY $47
  $B3AF: 84 48     STY $48
  $B3B1: 4C 38 B3  JMP $b338
  $B3B4: A4 47     LDY $47
  $B3B6: C8        INY
  $B3B7: C6 49     DEC $49
  $B3B9: F0 02     BEQ $b3bd
  $B3BB: A4 48     LDY $48
  $B3BD: 84 47     STY $47
  $B3BF: 4C 38 B3  JMP $b338
  $B3C2: A4 47     LDY $47
  $B3C4: C8        INY
  $B3C5: B1 45     LDA ($45),Y
  $B3C7: AA        TAX
  $B3C8: C8        INY
  $B3C9: B1 45     LDA ($45),Y
  $B3CB: 86 45     STX $45
  $B3CD: 85 46     STA $46
  $B3CF: A9 00     LDA #$00
  $B3D1: 85 47     STA $47
  $B3D3: 4C 38 B3  JMP $b338
  $B3D6: AD D7 03  LDA $03d7
  $B3D9: 09 40     ORA #$40
  $B3DB: 8D D7 03  STA $03d7
  $B3DE: E6 47     INC $47
  $B3E0: 4C 38 B3  JMP $b338
  $B3E3: A4 47     LDY $47
  $B3E5: C8        INY
  $B3E6: B1 45     LDA ($45),Y
  $B3E8: 8D D8 03  STA $03d8
  $B3EB: C8        INY
  $B3EC: B1 45     LDA ($45),Y
  $B3EE: 8D D9 03  STA $03d9
  $B3F1: C8        INY
  $B3F2: 84 47     STY $47
  $B3F4: 4C 38 B3  JMP $b338
  $B3F7: 48        PHA
  $B3F8: A9 03     LDA #$03
  $B3FA: 20 C5 83  JSR $83c5
  $B3FD: 68        PLA
  $B3FE: 20 00 C0  JSR $c000
  $B401: 60        RTS
  $B402: 08        PHP
  $B403: 84 00     STY $00
  $B405: 85 01     STA $01
  $B407: AE 39 03  LDX $0339
  $B40A: A0 00     LDY #$00
  $B40C: B1 00     LDA ($00),Y
  $B40E: D0 09     BNE $b419
  $B410: 98        TYA
  $B411: 38        SEC
  $B412: E9 03     SBC #$03
  $B414: 20 A3 84  JSR $84a3
  $B417: 68        PLA
  $B418: 60        RTS
  $B419: 9D 3A 03  STA $033a,X
  $B41C: 18        CLC
  $B41D: 69 02     ADC #$02
  $B41F: 85 02     STA $02
  $B421: 86 03     STX $03
  $B423: C8        INY
  $B424: E8        INX
  $B425: B1 00     LDA ($00),Y
  $B427: 9D 3A 03  STA $033a,X
  $B42A: C6 02     DEC $02
  $B42C: 10 F5     BPL $b423
  $B42E: 28        PLP
  $B42F: 08        PHP
  $B430: 90 14     BCC $b446
  $B432: 8A        TXA
  $B433: 48        PHA
  $B434: A6 03     LDX $03
  $B436: A5 19     LDA $19
  $B438: 29 02     AND #$02
  $B43A: F0 08     BEQ $b444
  $B43C: BD 3C 03  LDA $033c,X
  $B43F: 09 08     ORA #$08
  $B441: 9D 3C 03  STA $033c,X
  $B444: 68        PLA
  $B445: AA        TAX
  $B446: 4C 0C B4  JMP $b40c
  $B449: 8D 1E 06  STA $061e
  $B44C: A2 5B     LDX #$5b
  $B44E: 20 95 82  JSR $8295
  $B451: 60        RTS
  $B452: A2 5C     LDX #$5c
  $B454: 20 95 82  JSR $8295
  $B457: 60        RTS
  $B458: AE F3 03  LDX $03f3
  $B45B: 9D F4 03  STA $03f4,X
  $B45E: A2 00     LDX #$00
  $B460: 48        PHA
  $B461: 68        PLA
  $B462: F0 0A     BEQ $b46e
  $B464: 8E EE 03  STX $03ee
  $B467: 30 05     BMI $b46e
  $B469: 8E BE 03  STX $03be
  $B46C: 86 29     STX $29
  $B46E: EE F3 03  INC $03f3
  $B471: AD E6 03  LDA $03e6
  $B474: D0 0B     BNE $b481
  $B476: BD F4 03  LDA $03f4,X
  $B479: 8D EC 03  STA $03ec
  $B47C: A9 80     LDA #$80
  $B47E: 8D E6 03  STA $03e6
  $B481: 60        RTS
  $B482: A9 24     LDA #$24
  $B484: 20 D2 84  JSR $84d2
  $B487: 60        RTS
  $B488: A9 F8     LDA #$f8
  $B48A: 8D 04 02  STA $0204
  $B48D: 60        RTS
  $B48E: AD 8C 05  LDA $058c
  $B491: 4A        LSR A
  $B492: 18        CLC
  $B493: 69 4C     ADC #$4c
  $B495: 8D 07 02  STA $0207
  $B498: AD 90 05  LDA $0590
  $B49B: 18        CLC
  $B49C: 69 60     ADC #$60
  $B49E: 49 FF     EOR #$ff
  $B4A0: 4A        LSR A
  $B4A1: 18        CLC
  $B4A2: 69 82     ADC #$82
  $B4A4: 8D 04 02  STA $0204
  $B4A7: 60        RTS
  $B4A8: 8D DD 05  STA $05dd
  $B4AB: A9 80     LDA #$80
  $B4AD: 8D D8 05  STA $05d8
  $B4B0: 60        RTS
  $B4B1: AD D8 05  LDA $05d8
  $B4B4: F0 07     BEQ $b4bd
  $B4B6: A2 29     LDX #$29
  $B4B8: 20 95 82  JSR $8295
  $B4BB: 68        PLA
  $B4BC: 68        PLA
  $B4BD: 60        RTS
  $B4BE: C9 FF     CMP #$ff
  $B4C0: F0 08     BEQ $b4ca
  $B4C2: 8D BF 03  STA $03bf
  $B4C5: A9 80     LDA #$80
  $B4C7: 8D BE 03  STA $03be
  $B4CA: 60        RTS
  $B4CB: AD EB 05  LDA $05eb
  $B4CE: D0 0D     BNE $b4dd
  $B4D0: 20 82 B4  JSR $b482
  $B4D3: AD E6 03  LDA $03e6
  $B4D6: D0 05     BNE $b4dd
  $B4D8: AD 39 03  LDA $0339
  $B4DB: F0 01     BEQ $b4de
  $B4DD: 60        RTS
  $B4DE: 20 B1 B4  JSR $b4b1
  $B4E1: A9 07     LDA #$07
  $B4E3: 20 C5 83  JSR $83c5
  $B4E6: AD BE 03  LDA $03be
  $B4E9: 30 04     BMI $b4ef
  $B4EB: 4A        LSR A
  $B4EC: B0 4A     BCS $b538
  $B4EE: 60        RTS
  $B4EF: A9 01     LDA #$01
  $B4F1: 8D BE 03  STA $03be
  $B4F4: AE 01 C0  LDX $c001
  $B4F7: AD BF 03  LDA $03bf
  $B4FA: 0A        ASL A
  $B4FB: 90 01     BCC $b4fe
  $B4FD: E8        INX
  $B4FE: 18        CLC
  $B4FF: 6D 00 C0  ADC $c000
  $B502: 85 00     STA $00
  $B504: 90 01     BCC $b507
  $B506: E8        INX
  $B507: 86 01     STX $01
  $B509: A0 00     LDY #$00
  $B50B: B1 00     LDA ($00),Y
  $B50D: 85 27     STA $27
  $B50F: C8        INY
  $B510: B1 00     LDA ($00),Y
  $B512: 85 28     STA $28
  $B514: 30 14     BMI $b52a
  $B516: 09 80     ORA #$80
  $B518: 8D 28 00  STA $0028
  $B51B: 20 0E B7  JSR $b70e
  $B51E: 0A        ASL A
  $B51F: A8        TAY
  $B520: B1 27     LDA ($27),Y
  $B522: AA        TAX
  $B523: C8        INY
  $B524: B1 27     LDA ($27),Y
  $B526: 85 28     STA $28
  $B528: 86 27     STX $27
  $B52A: A9 00     LDA #$00
  $B52C: 8D C0 03  STA $03c0
  $B52F: 8D C4 03  STA $03c4
  $B532: 8D C7 03  STA $03c7
  $B535: 8D C8 03  STA $03c8
  $B538: AD BE 03  LDA $03be
  $B53B: 29 02     AND #$02
  $B53D: F0 09     BEQ $b548
  $B53F: A9 01     LDA #$01
  $B541: 20 C5 83  JSR $83c5
  $B544: 20 03 C0  JSR $c003
  $B547: 60        RTS
  $B548: 20 C0 B8  JSR $b8c0
  $B54B: A9 08     LDA #$08
  $B54D: 2C BE 03  BIT $03be
  $B550: F0 19     BEQ $b56b
  $B552: A9 80     LDA #$80
  $B554: 20 E0 83  JSR $83e0
  $B557: F0 EE     BEQ $b547
  $B559: AD BE 03  LDA $03be
  $B55C: 29 F7     AND #$f7
  $B55E: 8D BE 03  STA $03be
  $B561: AC C0 03  LDY $03c0
  $B564: B1 27     LDA ($27),Y
  $B566: 29 1F     AND #$1f
  $B568: 4C 81 B5  JMP $b581
  $B56B: AD C4 03  LDA $03c4
  $B56E: F0 04     BEQ $b574
  $B570: CE C4 03  DEC $03c4
  $B573: 60        RTS
  $B574: AD C7 03  LDA $03c7
  $B577: F0 03     BEQ $b57c
  $B579: 4C 43 B6  JMP $b643
  $B57C: AC C0 03  LDY $03c0
  $B57F: B1 27     LDA ($27),Y
  $B581: AA        TAX
  $B582: 29 1F     AND #$1f
  $B584: 85 01     STA $01
  $B586: 8A        TXA
  $B587: 29 E0     AND #$e0
  $B589: 85 00     STA $00
  $B58B: 4A        LSR A
  $B58C: 4A        LSR A
  $B58D: 4A        LSR A
  $B58E: 4A        LSR A
  $B58F: 4A        LSR A
  $B590: 20 4D 83  JSR $834d
  $B593: A3 B5     LAX ($b5,X)
  $B595: 0E B6 2B  ASL $2bb6
  $B598: B6 A3     LDX $a3,Y
  $B59A: B5 A3     LDA $a3,X
  $B59C: B5 A3     LDA $a3,X
  $B59E: B5 A3     LDA $a3,X
  $B5A0: B5 08     LDA $08,X
  $B5A2: B6 A9     LDX $a9,Y
  $B5A4: 60        RTS
  $B5A5: C5 00     CMP $00
  $B5A7: D0 06     BNE $b5af
  $B5A9: EE C0 03  INC $03c0
  $B5AC: 20 17 B6  JSR $b617
  $B5AF: AC C0 03  LDY $03c0
  $B5B2: B1 27     LDA ($27),Y
  $B5B4: 29 1F     AND #$1f
  $B5B6: C9 10     CMP #$10
  $B5B8: 29 0F     AND #$0f
  $B5BA: 90 04     BCC $b5c0
  $B5BC: 20 58 B4  JSR $b458
  $B5BF: 60        RTS
  $B5C0: 8D C2 03  STA $03c2
  $B5C3: C9 0A     CMP #$0a
  $B5C5: 90 05     BCC $b5cc
  $B5C7: A9 80     LDA #$80
  $B5C9: 20 58 B4  JSR $b458
  $B5CC: AE C2 03  LDX $03c2
  $B5CF: BD 57 B9  LDA $b957,X
  $B5D2: 8D C7 03  STA $03c7
  $B5D5: AD BE 03  LDA $03be
  $B5D8: 09 02     ORA #$02
  $B5DA: 8D BE 03  STA $03be
  $B5DD: A9 00     LDA #$00
  $B5DF: 8D C3 03  STA $03c3
  $B5E2: 8D C5 03  STA $03c5
  $B5E5: 8D C4 03  STA $03c4
  $B5E8: AD BE 03  LDA $03be
  $B5EB: 29 FB     AND #$fb
  $B5ED: 8D BE 03  STA $03be
  $B5F0: C8        INY
  $B5F1: B1 27     LDA ($27),Y
  $B5F3: C8        INY
  $B5F4: 8C C0 03  STY $03c0
  $B5F7: AC C2 03  LDY $03c2
  $B5FA: C0 0A     CPY #$0a
  $B5FC: B0 04     BCS $b602
  $B5FE: 20 B9 B8  JSR $b8b9
  $B601: 60        RTS
  $B602: A9 00     LDA #$00
  $B604: 8D 29 00  STA $0029
  $B607: 60        RTS
  $B608: A9 00     LDA #$00
  $B60A: 8D BE 03  STA $03be
  $B60D: 60        RTS
  $B60E: AD BE 03  LDA $03be
  $B611: 09 08     ORA #$08
  $B613: 8D BE 03  STA $03be
  $B616: 60        RTS
  $B617: AC C0 03  LDY $03c0
  $B61A: B1 27     LDA ($27),Y
  $B61C: 48        PHA
  $B61D: C8        INY
  $B61E: B1 27     LDA ($27),Y
  $B620: 85 28     STA $28
  $B622: 68        PLA
  $B623: 85 27     STA $27
  $B625: A9 00     LDA #$00
  $B627: 8D C0 03  STA $03c0
  $B62A: 60        RTS
  $B62B: AC C0 03  LDY $03c0
  $B62E: C8        INY
  $B62F: B1 27     LDA ($27),Y
  $B631: C8        INY
  $B632: 8C C0 03  STY $03c0
  $B635: 20 B9 B8  JSR $b8b9
  $B638: A9 80     LDA #$80
  $B63A: 20 58 B4  JSR $b458
  $B63D: A9 C0     LDA #$c0
  $B63F: 8D C4 03  STA $03c4
  $B642: 60        RTS
  $B643: A9 04     LDA #$04
  $B645: 2C BE 03  BIT $03be
  $B648: D0 1C     BNE $b666
  $B64A: 0D BE 03  ORA $03be
  $B64D: 8D BE 03  STA $03be
  $B650: AC C0 03  LDY $03c0
  $B653: EE C0 03  INC $03c0
  $B656: B1 27     LDA ($27),Y
  $B658: C9 FF     CMP #$ff
  $B65A: D0 06     BNE $b662
  $B65C: 20 17 B6  JSR $b617
  $B65F: 4C 50 B6  JMP $b650
  $B662: 8D C4 03  STA $03c4
  $B665: 60        RTS
  $B666: AD BE 03  LDA $03be
  $B669: 29 FB     AND #$fb
  $B66B: 8D BE 03  STA $03be
  $B66E: CE C7 03  DEC $03c7
  $B671: D0 05     BNE $b678
  $B673: A9 40     LDA #$40
  $B675: 8D C4 03  STA $03c4
  $B678: AC C0 03  LDY $03c0
  $B67B: B1 27     LDA ($27),Y
  $B67D: 85 00     STA $00
  $B67F: C8        INY
  $B680: B1 27     LDA ($27),Y
  $B682: 85 01     STA $01
  $B684: C8        INY
  $B685: 8C C0 03  STY $03c0
  $B688: A9 00     LDA #$00
  $B68A: AE C2 03  LDX $03c2
  $B68D: E0 0A     CPX #$0a
  $B68F: 90 02     BCC $b693
  $B691: A9 04     LDA #$04
  $B693: 85 06     STA $06
  $B695: 18        CLC
  $B696: 6D 39 03  ADC $0339
  $B699: 69 11     ADC #$11
  $B69B: 85 05     STA $05
  $B69D: AE 39 03  LDX $0339
  $B6A0: 86 04     STX $04
  $B6A2: A0 2A     LDY #$2a
  $B6A4: A9 00     LDA #$00
  $B6A6: 9D 3A 03  STA $033a,X
  $B6A9: E8        INX
  $B6AA: 88        DEY
  $B6AB: D0 F9     BNE $b6a6
  $B6AD: AD C1 03  LDA $03c1
  $B6B0: EE C1 03  INC $03c1
  $B6B3: 0A        ASL A
  $B6B4: A8        TAY
  $B6B5: A6 04     LDX $04
  $B6B7: A9 00     LDA #$00
  $B6B9: 20 F6 B6  JSR $b6f6
  $B6BC: A6 05     LDX $05
  $B6BE: A9 20     LDA #$20
  $B6C0: 20 F6 B6  JSR $b6f6
  $B6C3: A9 00     LDA #$00
  $B6C5: 85 02     STA $02
  $B6C7: A4 02     LDY $02
  $B6C9: E6 02     INC $02
  $B6CB: B1 00     LDA ($00),Y
  $B6CD: C9 EE     CMP #$ee
  $B6CF: B0 06     BCS $b6d7
  $B6D1: 20 34 B9  JSR $b934
  $B6D4: 4C C7 B6  JMP $b6c7
  $B6D7: C9 FF     CMP #$ff
  $B6D9: D0 09     BNE $b6e4
  $B6DB: A5 06     LDA $06
  $B6DD: 0A        ASL A
  $B6DE: 69 1F     ADC #$1f
  $B6E0: 20 A3 84  JSR $84a3
  $B6E3: 60        RTS
  $B6E4: 38        SEC
  $B6E5: E9 EE     SBC #$ee
  $B6E7: 85 08     STA $08
  $B6E9: C8        INY
  $B6EA: B1 00     LDA ($00),Y
  $B6EC: 85 09     STA $09
  $B6EE: A2 58     LDX #$58
  $B6F0: 20 95 82  JSR $8295
  $B6F3: 4C C7 B6  JMP $b6c7
  $B6F6: 18        CLC
  $B6F7: 79 47 B9  ADC $b947,Y
  $B6FA: 9D 3B 03  STA $033b,X
  $B6FD: A9 00     LDA #$00
  $B6FF: 79 48 B9  ADC $b948,Y
  $B702: 9D 3C 03  STA $033c,X
  $B705: A5 06     LDA $06
  $B707: 18        CLC
  $B708: 69 0E     ADC #$0e
  $B70A: 9D 3A 03  STA $033a,X
  $B70D: 60        RTS
  $B70E: AD BF 03  LDA $03bf
  $B711: 20 4D 83  JSR $834d
  $B714: 7B B7 A5  RRA $a5b7,Y
  $B717: B7 78     LAX $78,Y
  $B719: B7 C2     LAX $c2,Y
  $B71B: B7 0B     LAX $0b,Y
  $B71D: B8        CLV
  $B71E: 0E B8 12  ASL $12b8
  $B721: B8        CLV
  $B722: 12        ???
  $B723: B8        CLV
  $B724: 15 B8     ORA $b8,X
  $B726: 1E B8 2B  ASL $2bb8,X
  $B729: B8        CLV
  $B72A: A5 B7     LDA $b7
  $B72C: B5 B8     LDA $b8,X
  $B72E: 0E B8 0E  ASL $0eb8
  $B731: B8        CLV
  $B732: 36 B8     ROL $b8,X
  $B734: 0E B8 0E  ASL $0eb8
  $B737: B8        CLV
  $B738: 0E B8 0E  ASL $0eb8
  $B73B: B8        CLV
  $B73C: 78        SEI
  $B73D: B7 0E     LAX $0e,Y
  $B73F: B8        CLV
  $B740: 42        ???
  $B741: B8        CLV
  $B742: 0E B8 78  ASL $78b8
  $B745: B7 0E     LAX $0e,Y
  $B747: B8        CLV
  $B748: 78        SEI
  $B749: B7 0E     LAX $0e,Y
  $B74B: B8        CLV
  $B74C: 58        CLI
  $B74D: B8        CLV
  $B74E: 58        CLI
  $B74F: B8        CLV
  $B750: 5C B8 58  NOP $58b8,X
  $B753: B8        CLV
  $B754: 61 B8     ADC ($b8,X)
  $B756: 6C B8 6C  JMP ($6cb8)
  $B759: B8        CLV
  $B75A: 72        ???
  $B75B: B8        CLV
  $B75C: 78        SEI
  $B75D: B7 78     LAX $78,Y
  $B75F: B7 86     LAX $86,Y
  $B761: B8        CLV
  $B762: 89 B8     NOP #$b8
  $B764: 8C B8 89  STY $89b8
  $B767: B8        CLV
  $B768: 90 B8     BCC $b722
  $B76A: 93 B8     ??? ($b8),Y
  $B76C: 78        SEI
  $B76D: B7 61     LAX $61,Y
  $B76F: B8        CLV
  $B770: 96 B8     STX $b8,Y
  $B772: 0E B8 99  ASL $99b8
  $B775: B8        CLV
  $B776: 9C B8 A9  SHY $a9b8,X
  $B779: 00        BRK
  $B77A: 60        RTS
  $B77B: AD 9F 05  LDA $059f
  $B77E: 20 6F AB  JSR $ab6f
  $B781: A0 03     LDY #$03
  $B783: B1 5D     LDA ($5d),Y
  $B785: A8        TAY
  $B786: AE 99 06  LDX $0699
  $B789: BD 93 B7  LDA $b793,X
  $B78C: E0 05     CPX #$05
  $B78E: D0 08     BNE $b798
  $B790: A9 00     LDA #$00
  $B792: C0 01     CPY #$01
  $B794: F0 02     BEQ $b798
  $B796: A9 07     LDA #$07
  $B798: 60        RTS
  $B799: 08        PHP
  $B79A: 02        ???
  $B79B: 03 04     SLO ($04,X)
  $B79D: 05 06     ORA $06
  $B79F: 09 0A     ORA #$0a
  $B7A1: 00        BRK
  $B7A2: 00        BRK
  $B7A3: 00        BRK
  $B7A4: 01 AD     ORA ($ad,X)
  $B7A6: E3 05     ISB ($05,X)
  $B7A8: F0 08     BEQ $b7b2
  $B7AA: AD 99 06  LDA $0699
  $B7AD: F0 02     BEQ $b7b1
  $B7AF: A9 02     LDA #$02
  $B7B1: 60        RTS
  $B7B2: A2 01     LDX #$01
  $B7B4: AD 99 06  LDA $0699
  $B7B7: F0 07     BEQ $b7c0
  $B7B9: E8        INX
  $B7BA: E8        INX
  $B7BB: C9 11     CMP #$11
  $B7BD: D0 01     BNE $b7c0
  $B7BF: E8        INX
  $B7C0: 8A        TXA
  $B7C1: 60        RTS
  $B7C2: AD E3 05  LDA $05e3
  $B7C5: AA        TAX
  $B7C6: 49 01     EOR #$01
  $B7C8: A8        TAY
  $B7C9: BD E0 05  LDA $05e0,X
  $B7CC: 85 00     STA $00
  $B7CE: C9 01     CMP #$01
  $B7D0: D0 07     BNE $b7d9
  $B7D2: B9 E0 05  LDA $05e0,Y
  $B7D5: D0 02     BNE $b7d9
  $B7D7: F0 18     BEQ $b7f1
  $B7D9: B9 E0 05  LDA $05e0,Y
  $B7DC: 38        SEC
  $B7DD: ED 00 00  SBC $0000
  $B7E0: D0 04     BNE $b7e6
  $B7E2: E8        INX
  $B7E3: 8A        TXA
  $B7E4: D0 0B     BNE $b7f1
  $B7E6: A2 03     LDX #$03
  $B7E8: 90 06     BCC $b7f0
  $B7EA: E8        INX
  $B7EB: C9 01     CMP #$01
  $B7ED: F0 01     BEQ $b7f0
  $B7EF: E8        INX
  $B7F0: 8A        TXA
  $B7F1: 85 00     STA $00
  $B7F3: A2 00     LDX #$00
  $B7F5: AD A4 06  LDA $06a4
  $B7F8: C9 03     CMP #$03
  $B7FA: B0 04     BCS $b800
  $B7FC: A2 0C     LDX #$0c
  $B7FE: D0 06     BNE $b806
  $B800: C9 1B     CMP #$1b
  $B802: 90 02     BCC $b806
  $B804: A2 06     LDX #$06
  $B806: 8A        TXA
  $B807: 18        CLC
  $B808: 65 00     ADC $00
  $B80A: 60        RTS
  $B80B: A9 00     LDA #$00
  $B80D: 60        RTS
  $B80E: AD E3 05  LDA $05e3
  $B811: 60        RTS
  $B812: A9 00     LDA #$00
  $B814: 60        RTS
  $B815: A9 00     LDA #$00
  $B817: 20 52 A3  JSR $a352
  $B81A: A9 00     LDA #$00
  $B81C: 2A        ROL A
  $B81D: 60        RTS
  $B81E: AD E3 05  LDA $05e3
  $B821: 0A        ASL A
  $B822: AE C1 05  LDX $05c1
  $B825: CA        DEX
  $B826: F0 02     BEQ $b82a
  $B828: 69 01     ADC #$01
  $B82A: 60        RTS
  $B82B: AE C1 05  LDX $05c1
  $B82E: BD 30 B8  LDA $b830,X
  $B831: 60        RTS
  $B832: 00        BRK
  $B833: 01 02     ORA ($02,X)
  $B835: 02        ???
  $B836: A2 00     LDX #$00
  $B838: AD E7 05  LDA $05e7
  $B83B: C9 03     CMP #$03
  $B83D: F0 01     BEQ $b840
  $B83F: E8        INX
  $B840: 8A        TXA
  $B841: 60        RTS
  $B842: A2 02     LDX #$02
  $B844: AD D3 05  LDA $05d3
  $B847: 29 C0     AND #$c0
  $B849: C9 C0     CMP #$c0
  $B84B: D0 09     BNE $b856
  $B84D: CA        DEX
  $B84E: AD E7 05  LDA $05e7
  $B851: C9 03     CMP #$03
  $B853: F0 01     BEQ $b856
  $B855: CA        DEX
  $B856: 8A        TXA
  $B857: 60        RTS
  $B858: AD 32 06  LDA $0632
  $B85B: 60        RTS
  $B85C: AD 32 06  LDA $0632
  $B85F: 4A        LSR A
  $B860: 60        RTS
  $B861: A9 00     LDA #$00
  $B863: AE C1 05  LDX $05c1
  $B866: CA        DEX
  $B867: F0 02     BEQ $b86b
  $B869: A9 01     LDA #$01
  $B86B: 60        RTS
  $B86C: AD BB 05  LDA $05bb
  $B86F: 29 03     AND #$03
  $B871: 60        RTS
  $B872: AE E5 03  LDX $03e5
  $B875: D0 0B     BNE $b882
  $B877: AD 4F 06  LDA $064f
  $B87A: C9 07     CMP #$07
  $B87C: F0 05     BEQ $b883
  $B87E: C9 0F     CMP #$0f
  $B880: D0 02     BNE $b884
  $B882: E8        INX
  $B883: E8        INX
  $B884: 8A        TXA
  $B885: 60        RTS
  $B886: A9 00     LDA #$00
  $B888: 60        RTS
  $B889: A9 00     LDA #$00
  $B88B: 60        RTS
  $B88C: AD E5 03  LDA $03e5
  $B88F: 60        RTS
  $B890: A9 00     LDA #$00
  $B892: 60        RTS
  $B893: A9 00     LDA #$00
  $B895: 60        RTS
  $B896: A9 00     LDA #$00
  $B898: 60        RTS
  $B899: A9 00     LDA #$00
  $B89B: 60        RTS
  $B89C: AE C1 05  LDX $05c1
  $B89F: AD E3 05  LDA $05e3
  $B8A2: D0 09     BNE $b8ad
  $B8A4: CA        DEX
  $B8A5: E0 03     CPX #$03
  $B8A7: 90 02     BCC $b8ab
  $B8A9: A2 03     LDX #$03
  $B8AB: 8A        TXA
  $B8AC: 60        RTS
  $B8AD: A9 04     LDA #$04
  $B8AF: CA        DEX
  $B8B0: F0 02     BEQ $b8b4
  $B8B2: A9 05     LDA #$05
  $B8B4: 60        RTS
  $B8B5: AD D5 05  LDA $05d5
  $B8B8: 60        RTS
  $B8B9: 85 2F     STA $2f
  $B8BB: A9 80     LDA #$80
  $B8BD: 85 29     STA $29
  $B8BF: 60        RTS
  $B8C0: A5 29     LDA $29
  $B8C2: 30 04     BMI $b8c8
  $B8C4: 4A        LSR A
  $B8C5: B0 27     BCS $b8ee
  $B8C7: 60        RTS
  $B8C8: A9 01     LDA #$01
  $B8CA: 85 29     STA $29
  $B8CC: AD 2F 00  LDA $002f
  $B8CF: C9 FF     CMP #$ff
  $B8D1: D0 02     BNE $b8d5
  $B8D3: A5 30     LDA $30
  $B8D5: A8        TAY
  $B8D6: 0A        ASL A
  $B8D7: AA        TAX
  $B8D8: BD 9A BA  LDA $ba9a,X
  $B8DB: 85 2B     STA $2b
  $B8DD: BD 9B BA  LDA $ba9b,X
  $B8E0: 85 2C     STA $2c
  $B8E2: A9 00     LDA #$00
  $B8E4: 85 2E     STA $2e
  $B8E6: C4 30     CPY $30
  $B8E8: F0 04     BEQ $b8ee
  $B8EA: 84 30     STY $30
  $B8EC: 85 2D     STA $2d
  $B8EE: AD BE 03  LDA $03be
  $B8F1: D0 0C     BNE $b8ff
  $B8F3: 8D 29 00  STA $0029
  $B8F6: AE 2F 00  LDX $002f
  $B8F9: BD 67 B9  LDA $b967,X
  $B8FC: 4C 27 B9  JMP $b927
  $B8FF: A5 2E     LDA $2e
  $B901: F0 03     BEQ $b906
  $B903: C6 2E     DEC $2e
  $B905: 60        RTS
  $B906: A4 2D     LDY $2d
  $B908: B1 2B     LDA ($2b),Y
  $B90A: C9 FF     CMP #$ff
  $B90C: D0 11     BNE $b91f
  $B90E: C8        INY
  $B90F: B1 2B     LDA ($2b),Y
  $B911: AA        TAX
  $B912: C8        INY
  $B913: B1 2B     LDA ($2b),Y
  $B915: 85 2C     STA $2c
  $B917: 86 2B     STX $2b
  $B919: A9 00     LDA #$00
  $B91B: 85 2D     STA $2d
  $B91D: F0 E7     BEQ $b906
  $B91F: 85 2E     STA $2e
  $B921: C8        INY
  $B922: B1 2B     LDA ($2b),Y
  $B924: C8        INY
  $B925: 84 2D     STY $2d
  $B927: 48        PHA
  $B928: A9 02     LDA #$02
  $B92A: 20 C5 83  JSR $83c5
  $B92D: 68        PLA
  $B92E: 20 06 C0  JSR $c006
  $B931: 68        PLA
  $B932: 68        PLA
  $B933: 60        RTS
  $B934: 20 B2 AD  JSR $adb2
  $B937: A6 05     LDX $05
  $B939: 9D 3D 03  STA $033d,X
  $B93C: 98        TYA
  $B93D: A6 04     LDX $04
  $B93F: 9D 3D 03  STA $033d,X
  $B942: E6 05     INC $05
  $B944: E6 04     INC $04
  $B946: 60        RTS
  $B947: 50 22     BVC $b96b
  $B949: 90 22     BCC $b96d
  $B94B: D0 22     BNE $b96f
  $B94D: 10 23     BPL $b972
  $B94F: 4B 22     ALR #$22
  $B951: 8B 22     XAA #$22
  $B953: CB 22     AXS #$22
  $B955: 0B 23     ANC #$23
  $B957: 01 02     ORA ($02,X)
  $B959: 03 04     SLO ($04,X)
  $B95B: 01 02     ORA ($02,X)
  $B95D: 03 04     SLO ($04,X)
  $B95F: 01 02     ORA ($02,X)
  $B961: 01 02     ORA ($02,X)
  $B963: 03 01     SLO ($01,X)
  $B965: 02        ???
  $B966: 03 00     SLO ($00,X)
  $B968: 04 05     NOP $05
  $B96A: 08        PHP
  $B96B: 0E 0F 12  ASL $120f
  $B96E: 14 0F     NOP $0f,X
  $B970: 21 36     AND ($36,X)
  $B972: 30 19     BMI $b98d
  $B974: 10 36     BPL $b9ac
  $B976: 19 11 21  ORA $2111,Y
  $B979: 19 10 11  ORA $1110,Y
  $B97C: 0F 36 11  SLO $1136
  $B97F: 0F 36 30  SLO $3036
  $B982: 0F 11 30  SLO $3011
  $B985: 0F 10 30  SLO $3010
  $B988: 0F 21 36  SLO $3621
  $B98B: 30 19     BMI $b9a6
  $B98D: 31 30     AND ($30),Y
  $B98F: 0F 0F 0F  SLO $0f0f
  $B992: 0F 0F 0F  SLO $0f0f
  $B995: 21 36     AND ($36,X)
  $B997: 30 19     BMI $b9b2
  $B999: 31 30     AND ($30),Y
  $B99B: 19 27 36  ORA $3627,Y
  $B99E: 19 36 30  ORA $3036,Y
  $B9A1: 0F 21 36  SLO $3621
  $B9A4: 30 11     BMI $b9b7
  $B9A6: 21 27     AND ($27,X)
  $B9A8: 21 31     AND ($31,X)
  $B9AA: 30 0F     BMI $b9bb
  $B9AC: 0F 0F 21  SLO $210f
  $B9AF: 36 30     ROL $30,X
  $B9B1: 21 31     AND ($31,X)
  $B9B3: 30 21     BMI $b9d6
  $B9B5: 27 36     RLA $36
  $B9B7: 30 36     BMI $b9ef
  $B9B9: 27 0F     RLA $0f
  $B9BB: 21 36     AND ($36,X)
  $B9BD: 30 19     BMI $b9d8
  $B9BF: 31 30     AND ($30),Y
  $B9C1: 0F 0F 0F  SLO $0f0f
  $B9C4: 0F 0F 0F  SLO $0f0f
  $B9C7: 21 36     AND ($36,X)
  $B9C9: 30 21     BMI $b9ec
  $B9CB: 27 36     RLA $36
  $B9CD: 30 36     BMI $ba05
  $B9CF: 27 0F     RLA $0f
  $B9D1: 0F 0F 0F  SLO $0f0f
  $B9D4: 21 36     AND ($36,X)
  $B9D6: 30 19     BMI $b9f1
  $B9D8: 31 30     AND ($30),Y
  $B9DA: 0F 0F 0F  SLO $0f0f
  $B9DD: 0F 0F 0F  SLO $0f0f
  $B9E0: 0F 25 30  SLO $3025
  $B9E3: 0F 0F 0F  SLO $0f0f
  $B9E6: 0F 0F 0F  SLO $0f0f
  $B9E9: 0F 0F 0F  SLO $0f0f
  $B9EC: 0F 21 30  SLO $3021
  $B9EF: 12        ???
  $B9F0: 26 38     ROL $38
  $B9F2: 21 0F     AND ($0f,X)
  $B9F4: 25 0F     AND $0f
  $B9F6: 23 24     RLA ($24,X)
  $B9F8: 28        PLP
  $B9F9: 0F 25 30  SLO $3025
  $B9FC: 0F 0F 0F  SLO $0f0f
  $B9FF: 0F 0F 0F  SLO $0f0f
  $BA02: 0F 30 0F  SLO $0f30
  $BA05: 0F 1A 30  SLO $301a
  $BA08: 18        CLC
  $BA09: 36 25     ROL $25,X
  $BA0B: 30 21     BMI $ba2e
  $BA0D: 32        ???
  $BA0E: 30 21     BMI $ba31
  $BA10: 10 30     BPL $ba42
  $BA12: 21 21     AND ($21,X)
  $BA14: 36 16     ROL $16,X
  $BA16: 16 36     ASL $36,X
  $BA18: 0F 11 36  SLO $3611
  $BA1B: 0F 30 36  SLO $3630
  $BA1E: 0F 1A 30  SLO $301a
  $BA21: 18        CLC
  $BA22: 36 25     ROL $25,X
  $BA24: 30 0F     BMI $ba35
  $BA26: 3C 21 0F  NOP $0f21,X
  $BA29: 27 0F     RLA $0f
  $BA2B: 30 30     BMI $ba5d
  $BA2D: 21 30     AND ($30,X)
  $BA2F: 25 24     AND $24
  $BA31: 0F 30 27  SLO $2730
  $BA34: 0F 27 2A  SLO $2a27
  $BA37: 0F 11 30  SLO $3011
  $BA3A: 16 36     ASL $36,X
  $BA3C: 25 30     AND $30
  $BA3E: 21 32     AND ($32,X)
  $BA40: 30 21     BMI $ba63
  $BA42: 10 30     BPL $ba74
  $BA44: 21 21     AND ($21,X)
  $BA46: 36 16     ROL $16,X
  $BA48: 16 36     ASL $36,X
  $BA4A: 0F 11 36  SLO $3611
  $BA4D: 0F 30 36  SLO $3630
  $BA50: 00        BRK
  $BA51: 00        BRK
  $BA52: 00        BRK
  $BA53: 00        BRK
  $BA54: 60        RTS
  $BA55: 00        BRK
  $BA56: 00        BRK
  $BA57: 05 10     ORA $10
  $BA59: 14 40     NOP $40,X
  $BA5B: 00        BRK
  $BA5C: 11 11     ORA ($11),Y
  $BA5E: 11 11     ORA ($11),Y
  $BA60: 10 00     BPL $ba62
  $BA62: 01 11     ORA ($11,X)
  $BA64: 01 11     ORA ($11,X)
  $BA66: 10 00     BPL $ba68
  $BA68: 33 00     RLA ($00),Y
  $BA6A: 00        BRK
  $BA6B: 02        ???
  $BA6C: 11 81     ORA ($81),Y
  $BA6E: 01 11     ORA ($11,X)
  $BA70: 01 00     ORA ($00,X)
  $BA72: 01 91     ORA ($91,X)
  $BA74: 10 00     BPL $ba76
  $BA76: 44 90     NOP $90
  $BA78: 09 00     ORA #$00
  $BA7A: 00        BRK
  $BA7B: 00        BRK
  $BA7C: 00        BRK
  $BA7D: 00        BRK
  $BA7E: 00        BRK
  $BA7F: 00        BRK
  $BA80: 00        BRK
  $BA81: 00        BRK
  $BA82: 00        BRK
  $BA83: 26 11     ROL $11
  $BA85: 11 00     ORA ($00),Y
  $BA87: 1E 00 00  ASL $0000,X
  $BA8A: 00        BRK
  $BA8B: 01 E5     ORA ($e5,X)
  $BA8D: 99 8A 69  STA $698a,Y
  $BA90: 59 DB CC  EOR $ccdb,Y
  $BA93: F5 67     SBC $67,X
  $BA95: 96 96     STX $96,Y
  $BA97: 59 CF C0  EOR $c0cf,Y
  $BA9A: AC BA C9  LDY $c9ba
  $BA9D: BA        TSX
  $BA9E: E6 BA     INC $ba
  $BAA0: FB BA 18  ISB $18ba,Y
  $BAA3: BB 3D BB  LAS $bb3d,Y
  $BAA6: 5C BB 69  NOP $69bb,X
  $BAA9: BB 70 BB  LAS $bb70,Y
  $BAAC: 05 00     ORA $00
  $BAAE: 05 01     ORA $01
  $BAB0: 05 02     ORA $02
  $BAB2: 05 01     ORA $01
  $BAB4: 05 02     ORA $02
  $BAB6: 05 03     ORA $03
  $BAB8: 05 02     ORA $02
  $BABA: 05 01     ORA $01
  $BABC: 05 02     ORA $02
  $BABE: 05 03     ORA $03
  $BAC0: 05 02     ORA $02
  $BAC2: 05 01     ORA $01
  $BAC4: 05 00     ORA $00
  $BAC6: FF AC BA  ISB $baac,X
  $BAC9: 05 04     ORA $04
  $BACB: 05 01     ORA $01
  $BACD: 05 02     ORA $02
  $BACF: 05 01     ORA $01
  $BAD1: 05 02     ORA $02
  $BAD3: 05 03     ORA $03
  $BAD5: 05 02     ORA $02
  $BAD7: 05 01     ORA $01
  $BAD9: 05 02     ORA $02
  $BADB: 05 03     ORA $03
  $BADD: 05 02     ORA $02
  $BADF: 05 01     ORA $01
  $BAE1: 05 04     ORA $04
  $BAE3: FF C9 BA  ISB $bac9,X
  $BAE6: 04 05     NOP $05
  $BAE8: 04 06     NOP $06
  $BAEA: 04 07     NOP $07
  $BAEC: 04 06     NOP $06
  $BAEE: 04 07     NOP $07
  $BAF0: 04 06     NOP $06
  $BAF2: 04 07     NOP $07
  $BAF4: 04 06     NOP $06
  $BAF6: 04 05     NOP $05
  $BAF8: FF E6 BA  ISB $bae6,X
  $BAFB: 05 08     ORA $08
  $BAFD: 05 09     ORA $09
  $BAFF: 05 0A     ORA $0a
  $BB01: 05 09     ORA $09
  $BB03: 05 0A     ORA $0a
  $BB05: 05 09     ORA $09
  $BB07: 05 08     ORA $08
  $BB09: 05 09     ORA $09
  $BB0B: 05 0A     ORA $0a
  $BB0D: 05 09     ORA $09
  $BB0F: 05 0A     ORA $0a
  $BB11: 05 09     ORA $09
  $BB13: 05 08     ORA $08
  $BB15: FF FB BA  ISB $bafb,X
  $BB18: 08        PHP
  $BB19: 0B 04     ANC #$04
  $BB1B: 0C 04 0D  NOP $0d04
  $BB1E: 04 0C     NOP $0c
  $BB20: 04 0D     NOP $0d
  $BB22: 04 0C     NOP $0c
  $BB24: 04 0D     NOP $0d
  $BB26: 08        PHP
  $BB27: 0E 04 0C  ASL $0c04
  $BB2A: 04 0D     NOP $0d
  $BB2C: 04 0C     NOP $0c
  $BB2E: 04 0B     NOP $0b
  $BB30: 04 0C     NOP $0c
  $BB32: 08        PHP
  $BB33: 0E 04 0C  ASL $0c04
  $BB36: 04 0D     NOP $0d
  $BB38: 04 0C     NOP $0c
  $BB3A: FF 18 BB  ISB $bb18,X
  $BB3D: 05 0F     ORA $0f
  $BB3F: 05 10     ORA $10
  $BB41: 05 11     ORA $11
  $BB43: 05 10     ORA $10
  $BB45: 05 11     ORA $11
  $BB47: 05 10     ORA $10
  $BB49: 05 0F     ORA $0f
  $BB4B: 05 10     ORA $10
  $BB4D: 05 11     ORA $11
  $BB4F: 05 10     ORA $10
  $BB51: 05 11     ORA $11
  $BB53: 05 10     ORA $10
  $BB55: 05 11     ORA $11
  $BB57: 05 10     ORA $10
  $BB59: FF 3D BB  ISB $bb3d,X
  $BB5C: 0A        ASL A
  $BB5D: 05 0A     ORA $0a
  $BB5F: 06 0F     ASL $0f
  $BB61: 07 05     SLO $05
  $BB63: 12        ???
  $BB64: 05 13     ORA $13
  $BB66: FF 62 BB  ISB $bb62,X
  $BB69: 08        PHP
  $BB6A: 14 08     NOP $08,X
  $BB6C: 15 FF     ORA $ff,X
  $BB6E: 69 BB     ADC #$bb
  $BB70: 80 00     NOP #$00
  $BB72: FF 70 BB  ISB $bb70,X
  $BB75: 06 00     ASL $00
  $BB77: 0D 00 13  ORA $1300
  $BB7A: 00        BRK
  $BB7B: 19 00 20  ORA $2000,Y
  $BB7E: 00        BRK
  $BB7F: 26 00     ROL $00
  $BB81: 2C 00 33  BIT $3300
  $BB84: 00        BRK
  $BB85: 39 00 40  AND $4000,Y
  $BB88: 00        BRK
  $BB89: 47 00     SRE $00
  $BB8B: 4E 00 55  LSR $5500
  $BB8E: 00        BRK
  $BB8F: 5C 00 63  NOP $6300,X
  $BB92: 00        BRK
  $BB93: 6A        ROR A
  $BB94: 00        BRK
  $BB95: 71 00     ADC ($00),Y
  $BB97: 79 00 81  ADC $8100,Y
  $BB9A: 00        BRK
  $BB9B: 89 00     NOP #$00
  $BB9D: 91 00     STA ($00),Y
  $BB9F: 99 00 A2  STA $a200,Y
  $BBA2: 00        BRK
  $BBA3: AB 00     ATX #$00
  $BBA5: B4 00     LDY $00,X
  $BBA7: BE 00 C8  LDX $c800,Y
  $BBAA: 00        BRK
  $BBAB: D2        ???
  $BBAC: 00        BRK
  $BBAD: DD 00 E8  CMP $e800,X
  $BBB0: 00        BRK
  $BBB1: F4 00     NOP $00,X
  $BBB3: 00        BRK
  $BBB4: 01 0D     ORA ($0d,X)
  $BBB6: 01 1A     ORA ($1a,X)
  $BBB8: 01 29     ORA ($29,X)
  $BBBA: 01 38     ORA ($38,X)
  $BBBC: 01 48     ORA ($48,X)
  $BBBE: 01 59     ORA ($59,X)
  $BBC0: 01 6B     ORA ($6b,X)
  $BBC2: 01 7F     ORA ($7f,X)
  $BBC4: 01 94     ORA ($94,X)
  $BBC6: 01 AB     ORA ($ab,X)
  $BBC8: 01 C4     ORA ($c4,X)
  $BBCA: 01 DF     ORA ($df,X)
  $BBCC: 01 FD     ORA ($fd,X)
  $BBCE: 01 1D     ORA ($1d,X)
  $BBD0: 02        ???
  $BBD1: 42        ???
  $BBD2: 02        ???
  $BBD3: 6A        ROR A
  $BBD4: 02        ???
  $BBD5: 98        TYA
  $BBD6: 02        ???
  $BBD7: DB 02 07  DCP $0702,Y
  $BBDA: 03 4C     SLO ($4c,X)
  $BBDC: 03 9D     SLO ($9d,X)
  $BBDE: 03 FE     SLO ($fe,X)
  $BBE0: 03 74     SLO ($74,X)
  $BBE2: 04 07     NOP $07
  $BBE4: 05 C3     ORA $c3
  $BBE6: 05 BE     ORA $be
  $BBE8: 06 1B     ASL $1b
  $BBEA: 08        PHP
  $BBEB: 27 0A     RLA $0a
  $BBED: 8F 0D 5B  SAX $5b0d
  $BBF0: 20 BC 40  JSR $40bc
  $BBF3: FF FF 00  ISB $00ff,X
  $BBF6: 00        BRK
  $BBF7: 00        BRK
  $BBF8: 00        BRK
  $BBF9: 06 00     ASL $00
  $BBFB: 0C 00 12  NOP $1200
  $BBFE: 00        BRK
  $BBFF: 19 00 1F  ORA $1f00,Y
  $BC02: 00        BRK
  $BC03: 25 00     AND $00
  $BC05: 2B 00     ANC #$00
  $BC07: 31 00     AND ($00),Y
  $BC09: 38        SEC
  $BC0A: 00        BRK
  $BC0B: 3E 00 44  ROL $4400,X
  $BC0E: 00        BRK
  $BC0F: 4A        LSR A
  $BC10: 00        BRK
  $BC11: 50 00     BVC $bc13
  $BC13: 56 00     LSR $00,X
  $BC15: 5C 00 61  NOP $6100,X
  $BC18: 00        BRK
  $BC19: 67 00     RRA $00
  $BC1B: 6D 00 73  ADC $7300
  $BC1E: 00        BRK
  $BC1F: 78        SEI
  $BC20: 00        BRK
  $BC21: 7E 00 83  ROR $8300,X
  $BC24: 00        BRK
  $BC25: 88        DEY
  $BC26: 00        BRK
  $BC27: 8E 00 93  STX $9300
  $BC2A: 00        BRK
  $BC2B: 98        TYA
  $BC2C: 00        BRK
  $BC2D: 9D 00 A2  STA $a200,X
  $BC30: 00        BRK
  $BC31: A7 00     LAX $00
  $BC33: AB 00     ATX #$00
  $BC35: B0 00     BCS $bc37
  $BC37: B5 00     LDA $00,X
  $BC39: B9 00 BD  LDA $bd00,Y
  $BC3C: 00        BRK
  $BC3D: C1 00     CMP ($00,X)
  $BC3F: C5 00     CMP $00
  $BC41: C9 00     CMP #$00
  $BC43: CD 00 D1  CMP $d100
  $BC46: 00        BRK
  $BC47: D4 00     NOP $00,X
  $BC49: D8        CLD
  $BC4A: 00        BRK
  $BC4B: DB 00 DE  DCP $de00,Y
  $BC4E: 00        BRK
  $BC4F: E1 00     SBC ($00,X)
  $BC51: E4 00     CPX $00
  $BC53: E7 00     ISB $00
  $BC55: EA        NOP
  $BC56: 00        BRK
  $BC57: EC 00 EE  CPX $ee00
  $BC5A: 00        BRK
  $BC5B: F1 00     SBC ($00),Y
  $BC5D: F3 00     ISB ($00),Y
  $BC5F: F4 00     NOP $00,X
  $BC61: F6 00     INC $00,X
  $BC63: F8        SED
  $BC64: 00        BRK
  $BC65: F9 00 FB  SBC $fb00,Y
  $BC68: 00        BRK
  $BC69: FC 00 FD  NOP $fd00,X
  $BC6C: 00        BRK
  $BC6D: FE 00 FE  INC $fe00,X
  $BC70: 00        BRK
  $BC71: FF 00 00  ISB $0000,X
  $BC74: 01 02     ORA ($02,X)
  $BC76: 30 34     BMI $bcac
  $BC78: 32        ???
  $BC79: 23 41     RLA ($41,X)
  $BC7B: 45 44     EOR $44
  $BC7D: 42        ???
  $BC7E: 43 40     SRE ($40,X)
  $BC80: 02        ???
  $BC81: 21 25     AND ($25,X)
  $BC83: 33 13     RLA ($13),Y
  $BC85: 40        RTI
  $BC86: 45 44     EOR $44
  $BC88: 33 32     RLA ($32),Y
  $BC8A: 41 F0     EOR ($f0,X)
  $BC8C: 05 65     ORA $65
  $BC8E: BD 69 BD  LDA $bd69,X
  $BC91: 6D BD 70  ADC $70bd
  $BC94: BD 74 BD  LDA $bd74,X
  $BC97: 79 BD 7E  ADC $7ebd,Y
  $BC9A: BD 83 BD  LDA $bd83,X
  $BC9D: 87 BD     SAX $bd
  $BC9F: 8B BD     XAA #$bd
  $BCA1: 8E BD 93  STX $93bd
  $BCA4: BD 97 BD  LDA $bd97,X
  $BCA7: 9B BD 9F  TAS $9fbd,Y
  $BCAA: BD A3 BD  LDA $bda3,X
  $BCAD: A7 BD     LAX $bd
  $BCAF: AB BD     ATX #$bd
  $BCB1: AE BD B3  LDX $b3bd
  $BCB4: BD B8 BD  LDA $bdb8,X
  $BCB7: BC BD C2  LDY $c2bd,X
  $BCBA: BD C7 BD  LDA $bdc7,X
  $BCBD: CB BD     AXS #$bd
  $BCBF: CF BD D5  DCP $d5bd
  $BCC2: BD D9 BD  LDA $bdd9,X
  $BCC5: DE BD E3  DEC $e3bd,X
  $BCC8: BD EA BD  LDA $bdea,X
  $BCCB: F1 BD     SBC ($bd),Y
  $BCCD: F6 BD     INC $bd,X
  $BCCF: FC BD 03  NOP $03bd,X
  $BCD2: BE 07 BE  LDX $be07,Y
  $BCD5: 0C BE 12  NOP $12be
  $BCD8: BE 18 BE  LDX $be18,Y
  $BCDB: 1D BE 20  ORA $20be,X
  $BCDE: BE 25 BE  LDX $be25,Y
  $BCE1: 2C BE 34  BIT $34be
  $BCE4: BE 3A BE  LDX $be3a,Y
  $BCE7: 40        RTI
  $BCE8: BE 45 BE  LDX $be45,Y
  $BCEB: 4C BE 52  JMP $52be
  $BCEE: BE 57 BE  LDX $be57,Y
  $BCF1: 5B BE 61  SRE $61be,Y
  $BCF4: BE 66 BE  LDX $be66,Y
  $BCF7: 6B BE     ARR #$be
  $BCF9: 70 BE     BVS $bcb9
  $BCFB: 75 BE     ADC $be,X
  $BCFD: 78        SEI
  $BCFE: BE 7B BE  LDX $be7b,Y
  $BD01: 80 BE     NOP #$be
  $BD03: 84 BE     STY $be
  $BD05: 8B BE     XAA #$be
  $BD07: 91 BE     STA ($be),Y
  $BD09: 9A        TXS
  $BD0A: BE 9E BE  LDX $be9e,Y
  $BD0D: A5 BE     LDA $be
  $BD0F: A9 BE     LDA #$be
  $BD11: AD BE B2  LDA $b2be
  $BD14: BE B9 BE  LDX $beb9,Y
  $BD17: BF BE C4  LAX $c4be,Y
  $BD1A: BE CB BE  LDX $becb,Y
  $BD1D: D1 BE     CMP ($be),Y
  $BD1F: D6 BE     DEC $be,X
  $BD21: DA        NOP
  $BD22: BE E0 BE  LDX $bee0,Y
  $BD25: E5 BE     SBC $be
  $BD27: EB BE     SBC #$be
  $BD29: F0 BE     BEQ $bce9
  $BD2B: F6 BE     INC $be,X
  $BD2D: FF BE 08  ISB $08be,X
  $BD30: BF 11 BF  LAX $bf11,Y
  $BD33: 1A        NOP
  $BD34: BF 23 BF  LAX $bf23,Y
  $BD37: 2C BF 35  BIT $35bf
  $BD3A: BF 3C BF  LAX $bf3c,Y
  $BD3D: 42        ???
  $BD3E: BF 48 BF  LAX $bf48,Y
  $BD41: 4C BF 54  JMP $54bf
  $BD44: BF 58 BF  LAX $bf58,Y
  $BD47: 5C BF 60  NOP $60bf,X
  $BD4A: BF 65 BF  LAX $bf65,Y
  $BD4D: 6C BF 74  JMP ($74bf)
  $BD50: BF 7D BF  LAX $bf7d,Y
  $BD53: 86 BF     STX $bf
  $BD55: 89 BF     NOP #$bf
  $BD57: 8D BF 92  STA $92bf
  $BD5A: BF 97 BF  LAX $bf97,Y
  $BD5D: 9C BF A2  SHY $a2bf,X
  $BD60: BF A7 BF  LAX $bfa7,Y
  $BD63: AC BF 03  LDY $03bf
  $BD66: 11 63     ORA ($63),Y
  $BD68: 0A        ASL A
  $BD69: 03 06     SLO ($06,X)
  $BD6B: 0C 50 02  NOP $0250
  $BD6E: 0F 06 03  SLO $0306
  $BD71: 01 54     ORA ($54,X)
  $BD73: 2B 04     ANC #$04
  $BD75: 01 0B     ORA ($0b,X)
  $BD77: 54 06     NOP $06,X
  $BD79: 04 0F     NOP $0f
  $BD7B: 05 0C     ORA $0c
  $BD7D: 50 04     BVC $bd83
  $BD7F: 22        ???
  $BD80: 27 0A     RLA $0a
  $BD82: 06 03     ASL $03
  $BD84: 01 2B     ORA ($2b,X)
  $BD86: 1F 03 14  SLO $1403,X
  $BD89: 4F 18 02  SRE $0218
  $BD8C: 04 59     NOP $59
  $BD8E: 04 14     NOP $14
  $BD90: 05 54     ORA $54
  $BD92: 13 03     SLO ($03),Y
  $BD94: 01 0B     ORA ($0b,X)
  $BD96: 59 03 0F  EOR $0f03,Y
  $BD99: 08        PHP
  $BD9A: 01 03     ORA ($03,X)
  $BD9C: 0E 02 59  ASL $5902
  $BD9F: 03 1E     SLO ($1e,X)
  $BDA1: 0A        ASL A
  $BDA2: 04 03     NOP $03
  $BDA4: 05 56     ORA $56
  $BDA6: 04 03     NOP $03
  $BDA8: 55 13     EOR $13,X
  $BDAA: 02        ???
  $BDAB: 02        ???
  $BDAC: 0A        ASL A
  $BDAD: 18        CLC
  $BDAE: 04 1E     NOP $1e
  $BDB0: 11 23     ORA ($23),Y
  $BDB2: 1E 04 1A  ASL $1a04,X
  $BDB5: 30 02     BMI $bdb9
  $BDB7: 4F 03 0A  SRE $0a03
  $BDBA: 2B 59     ANC #$59
  $BDBC: 05 2B     ORA $2b
  $BDBE: 05 0B     ORA $0b
  $BDC0: 1E 5B 04  ASL $045b,X
  $BDC3: 0E 27 1E  ASL $1e27
  $BDC6: 10 03     BPL $bdcb
  $BDC8: 1F 0A 06  SLO $060a,X
  $BDCB: 03 1F     SLO ($1f,X)
  $BDCD: 0C 50 05  NOP $0550
  $BDD0: 2B 05     ANC #$05
  $BDD2: 63 23     RRA ($23,X)
  $BDD4: 0B 03     ANC #$03
  $BDD6: 15 2E     ORA $2e,X
  $BDD8: 0F 04 DC  SLO $dc04
  $BDDB: B3 80     LAX ($80),Y
  $BDDD: 8C 04 E8  STY $e804
  $BDE0: 8C 85 A8  STY $a885
  $BDE3: 06 E4     ASL $e4
  $BDE5: 87 93     SAX $93
  $BDE7: A7 48     LAX $48
  $BDE9: 98        TYA
  $BDEA: 06 9C     ASL $9c
  $BDEC: A8        TAY
  $BDED: 94 AD     STY $ad,X
  $BDEF: DC 8C 04  NOP $048c,X
  $BDF2: E9 83     SBC #$83
  $BDF4: 48        PHA
  $BDF5: A8        TAY
  $BDF6: 05 94     ORA $94
  $BDF8: EC A9 84  CPX $84a9
  $BDFB: AD 06 8B  LDA $8b06
  $BDFE: B0 94     BCS $bd94
  $BE00: 81 D9     STA ($d9,X)
  $BE02: 48        PHA
  $BE03: 03 85     SLO ($85,X)
  $BE05: A8        TAY
  $BE06: 91 04     STA ($04),Y
  $BE08: 9E 48 CF  SHX $cf48,Y
  $BE0B: 8C 05 8B  STY $8b05
  $BE0E: B2        ???
  $BE0F: 8C 8F 48  STY $488f
  $BE12: 05 9F     ORA $9f
  $BE14: B0 48     BCS $be5e
  $BE16: A6 48     LDX $48
  $BE18: 04 8B     NOP $8b
  $BE1A: B0 48     BCS $be64
  $BE1C: 93 02     ??? ($02),Y
  $BE1E: E8        INX
  $BE1F: 8C 04 DD  STY $dd04
  $BE22: A7 E5     LAX $e5
  $BE24: A8        TAY
  $BE25: 06 8D     ASL $8d
  $BE27: AD 8F A7  LDA $a78f
  $BE2A: AD D1 07  LDA $07d1
  $BE2D: E7 A9     ISB $a9
  $BE2F: 48        PHA
  $BE30: 8B B0     XAA #$b0
  $BE32: 48        PHA
  $BE33: 93 05     ??? ($05),Y
  $BE35: 9C DC B3  SHY $b3dc,X
  $BE38: AD D1 05  LDA $05d1
  $BE3B: 0C 28 5D  NOP $5d28
  $BE3E: 01 3A     ORA ($3a,X)
  $BE40: 04 02     NOP $02
  $BE42: 1E 01 3A  ASL $3a01,X
  $BE45: 06 06     ASL $06
  $BE47: 31 02     AND ($02),Y
  $BE49: 29 11     AND #$11
  $BE4B: 14 05     NOP $05,X
  $BE4D: E8        INX
  $BE4E: 8C 85 AE  STY $ae85
  $BE51: 93 04     ??? ($04),Y
  $BE53: 8F AE 87  SAX $87ae
  $BE56: A8        TAY
  $BE57: 03 9E     SLO ($9e,X)
  $BE59: 48        PHA
  $BE5A: 87 05     SAX $05
  $BE5C: E8        INX
  $BE5D: AD 90 AD  LDA $ad90
  $BE60: D1 04     CMP ($04),Y
  $BE62: 86 AF     STX $af
  $BE64: AE 90 04  LDX $0490
  $BE67: 0B 11     ANC #$11
  $BE69: 09 01     ORA #$01
  $BE6B: 04 0C     NOP $0c
  $BE6D: 28        PLP
  $BE6E: 5D 07 04  EOR $0407,X
  $BE71: 3A        NOP
  $BE72: 0F 01 3A  SLO $3a01
  $BE75: 02        ???
  $BE76: 15 2D     ORA $2d,X
  $BE78: 02        ???
  $BE79: 07 2D     SLO $2d
  $BE7B: 04 14     NOP $14
  $BE7D: 2D 05 11  AND $1105
  $BE80: 03 15     SLO ($15,X)
  $BE82: 1D 2D 06  ORA $062d,X
  $BE85: 15 0B     ORA $0b,X
  $BE87: 06 4F     ASL $4f
  $BE89: 04 05     NOP $05
  $BE8B: 05 1F     ORA $1f
  $BE8D: 14 1F     NOP $1f,X
  $BE8F: 02        ???
  $BE90: 2B 08     ANC #$08
  $BE92: 00        BRK
  $BE93: 56 1E     LSR $1e,X
  $BE95: 01 2E     ORA ($2e,X)
  $BE97: 10 30     BPL $bec9
  $BE99: 02        ???
  $BE9A: 03 19     SLO ($19,X)
  $BE9C: 14 2B     NOP $2b,X
  $BE9E: 06 21     ASL $21
  $BEA0: 01 2B     ORA ($2b,X)
  $BEA2: 1A        NOP
  $BEA3: 4F 0B 03  SRE $030b
  $BEA6: 1A        NOP
  $BEA7: 26 5D     ROL $5d
  $BEA9: 03 1B     SLO ($1b,X)
  $BEAB: 26 18     ROL $18
  $BEAD: 04 13     NOP $13
  $BEAF: 02        ???
  $BEB0: 1D 02 06  ORA $0602,X
  $BEB3: 80 A8     NOP #$a8
  $BEB5: D7 AD     DCP $ad,X
  $BEB7: 90 AD     BCC $be66
  $BEB9: 05 82     ORA $82
  $BEBB: A8        TAY
  $BEBC: D1 80     CMP ($80),Y
  $BEBE: 81 04     STA ($04,X)
  $BEC0: 81 8F     STA ($8f,X)
  $BEC2: A7 80     LAX $80
  $BEC4: 06 81     ASL $81
  $BEC6: AD D1 A6  LDA $a6d1
  $BEC9: AD DD 05  LDA $05dd
  $BECC: 9E A9 48  SHX $48a9,Y
  $BECF: 8B 80     XAA #$80
  $BED1: 04 E6     NOP $e6
  $BED3: A8        TAY
  $BED4: D0 48     BNE $bf1e
  $BED6: 03 85     SLO ($85,X)
  $BED8: 94 D9     STY $d9,X
  $BEDA: 05 EC     ORA $ec
  $BEDC: A8        TAY
  $BEDD: 93 CF     ??? ($cf),Y
  $BEDF: A8        TAY
  $BEE0: 04 8C     NOP $8c
  $BEE2: EB 81     SBC #$81
  $BEE4: AD 05 EC  LDA $ec05
  $BEE7: 48        PHA
  $BEE8: A6 AD     LDX $ad
  $BEEA: DD 04 9B  CMP $9b04,X
  $BEED: A6 AD     LDX $ad
  $BEEF: 8C 05 95  STY $9505
  $BEF2: 8B DD     XAA #$dd
  $BEF4: 81 91     STA ($91,X)
  $BEF6: 08        PHP
  $BEF7: CF AE 91  DCP $91ae
  $BEFA: 3A        NOP
  $BEFB: 3A        NOP
  $BEFC: 3A        NOP
  $BEFD: 3A        NOP
  $BEFE: 3A        NOP
  $BEFF: 08        PHP
  $BF00: DD A7 E5  CMP $e5a7,X
  $BF03: A8        TAY
  $BF04: 3A        NOP
  $BF05: 3A        NOP
  $BF06: 3A        NOP
  $BF07: 3A        NOP
  $BF08: 08        PHP
  $BF09: E8        INX
  $BF0A: 8C 3A 3A  STY $3a3a
  $BF0D: 3A        NOP
  $BF0E: 3A        NOP
  $BF0F: 3A        NOP
  $BF10: 3A        NOP
  $BF11: 08        PHP
  $BF12: 8B B0     XAA #$b0
  $BF14: 48        PHA
  $BF15: 93 3A     ??? ($3a),Y
  $BF17: 3A        NOP
  $BF18: 3A        NOP
  $BF19: 3A        NOP
  $BF1A: 08        PHP
  $BF1B: 8F AE 87  SAX $87ae
  $BF1E: A8        TAY
  $BF1F: 3A        NOP
  $BF20: 3A        NOP
  $BF21: 3A        NOP
  $BF22: 3A        NOP
  $BF23: 08        PHP
  $BF24: 9E 48 87  SHX $8748,Y
  $BF27: 3A        NOP
  $BF28: 3A        NOP
  $BF29: 3A        NOP
  $BF2A: 3A        NOP
  $BF2B: 3A        NOP
  $BF2C: 08        PHP
  $BF2D: E8        INX
  $BF2E: 8C 85 AE  STY $ae85
  $BF31: 93 3A     ??? ($3a),Y
  $BF33: 3A        NOP
  $BF34: 3A        NOP
  $BF35: 06 89     ASL $89
  $BF37: AD E4 EA  LDA $eae4
  $BF3A: A9 81     LDA #$81
  $BF3C: 05 02     ORA $02
  $BF3E: 53 05     SRE ($05),Y
  $BF40: 14 01     NOP $01,X
  $BF42: 05 48     ORA $48
  $BF44: 48        PHA
  $BF45: 48        PHA
  $BF46: 48        PHA
  $BF47: 48        PHA
  $BF48: 03 E8     SLO ($e8,X)
  $BF4A: AD 90 07  LDA $0790
  $BF4D: 0A        ASL A
  $BF4E: 01 59     ORA ($59,X)
  $BF50: 01 CF     ORA ($cf,X)
  $BF52: AE 91 03  LDX $0391
  $BF55: A9 E6     LDA #$e6
  $BF57: A8        TAY
  $BF58: 03 0A     SLO ($0a,X)
  $BF5A: 14 03     NOP $03,X
  $BF5C: 03 1F     SLO ($1f,X)
  $BF5E: 05 1F     ORA $1f
  $BF60: 04 1B     NOP $1b
  $BF62: 28        PLP
  $BF63: 04 23     NOP $23
  $BF65: 06 0A     ASL $0a
  $BF67: 2D 05 07  AND $0705
  $BF6A: 13 64     SLO ($64),Y
  $BF6C: 07 12     SLO $12
  $BF6E: 06 18     ASL $18
  $BF70: 86 48     STX $48
  $BF72: E8        INX
  $BF73: 48        PHA
  $BF74: 08        PHP
  $BF75: 5D 2E 10  EOR $102e,X
  $BF78: 15 3A     ORA $3a,X
  $BF7A: 08        PHP
  $BF7B: 28        PLP
  $BF7C: 37 08     RLA $08,X
  $BF7E: 5D 2E 10  EOR $102e,X
  $BF81: 15 3A     ORA $3a,X
  $BF83: 13 65     SLO ($65),Y
  $BF85: 37 02     RLA $02,X
  $BF87: 1F 50 03  SLO $0350,X
  $BF8A: 1A        NOP
  $BF8B: 59 27 04  EOR $0427,Y
  $BF8E: 7E 75 0D  ROR $0d75,X
  $BF91: 2D 04 7D  AND $7d04
  $BF94: A4 48     LDY $48
  $BF96: 8C 04 80  STY $8004
  $BF99: A8        TAY
  $BF9A: D3 8C     DCP ($8c),Y
  $BF9C: 05 8B     ORA $8b
  $BF9E: AF A6 48  LAX $48a6
  $BFA1: 94 04     STY $04,X
  $BFA3: 9E AE 99  SHX $99ae,Y
  $BFA6: 48        PHA
  $BFA7: 04 A7     NOP $a7
  $BFA9: 97 85     SAX $85,Y
  $BFAB: 48        PHA
  $BFAC: 04 AA     NOP $aa
  $BFAE: E5 8E     SBC $8e
  $BFB0: AD 00 00  LDA $0000
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