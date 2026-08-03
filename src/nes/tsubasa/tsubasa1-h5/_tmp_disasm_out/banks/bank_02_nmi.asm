; PRG Bank $02
; CPU Address Range: $8000 - $BFFF
; ROM Offset: $8000
; ============================================================

  $8000: 4C 1E C0  JMP $c01e
  $8003: 4C FF C2  JMP $c2ff
  $8006: 4C 55 C3  JMP $c355
  $8009: 4C 62 C3  JMP $c362
  $800C: 4C 16 C4  JMP $c416
  $800F: 4C 75 C3  JMP $c375
  $8012: 4C BA C3  JMP $c3ba
  $8015: 4C BA C3  JMP $c3ba
  $8018: 4C AA C7  JMP $c7aa
  $801B: 4C 60 C9  JMP $c960
  $801E: A5 3C     LDA $3c
  $8020: 10 32     BPL $8054
  $8022: A2 03     LDX #$03
  $8024: AD 40 00  LDA $0040
  $8027: C9 FF     CMP #$ff
  $8029: F0 1D     BEQ $8048
  $802B: 85 4F     STA $4f
  $802D: A9 38     LDA #$38
  $802F: 85 51     STA $51
  $8031: A9 00     LDA #$00
  $8033: 85 50     STA $50
  $8035: 85 52     STA $52
  $8037: 20 44 80  JSR $8044
  $803A: A5 53     LDA $53
  $803C: 69 C8     ADC #$c8
  $803E: 85 3E     STA $3e
  $8040: A5 54     LDA $54
  $8042: 69 CA     ADC #$ca
  $8044: 85 3F     STA $3f
  $8046: A2 00     LDX #$00
  $8048: A9 01     LDA #$01
  $804A: 85 3C     STA $3c
  $804C: 85 41     STA $41
  $804E: A9 00     LDA #$00
  $8050: 85 3D     STA $3d
  $8052: 86 42     STX $42
  $8054: A5 3C     LDA $3c
  $8056: 4A        LSR A
  $8057: 90 05     BCC $805e
  $8059: AD 39 03  LDA $0339
  $805C: F0 01     BEQ $805f
  $805E: 60        RTS
  $805F: A5 42     LDA $42
  $8061: 20 17 80  JSR $8017
  $8064: 6C C0 63  JMP ($63c0)
  $8067: C1 73     CMP ($73,X)
  $8069: C1 13     CMP ($13,X)
  $806B: C2 A9     NOP #$a9
  $806D: 04 85     NOP $85
  $806F: 00        BRK
  $8070: AD 39 03  LDA $0339
  $8073: 85 05     STA $05
  $8075: A5 3D     LDA $3d
  $8077: 0A        ASL A
  $8078: A8        TAY
  $8079: B1 3E     LDA ($3e),Y
  $807B: 48        PHA
  $807C: AA        TAX
  $807D: C8        INY
  $807E: B1 3E     LDA ($3e),Y
  $8080: 48        PHA
  $8081: 8A        TXA
  $8082: 38        SEC
  $8083: E9 58     SBC #$58
  $8085: AA        TAX
  $8086: 68        PLA
  $8087: 48        PHA
  $8088: E9 D8     SBC #$d8
  $808A: 85 02     STA $02
  $808C: 8A        TXA
  $808D: 46 02     LSR $02
  $808F: 6A        ROR A
  $8090: 46 02     LSR $02
  $8092: 6A        ROR A
  $8093: 46 02     LSR $02
  $8095: 6A        ROR A
  $8096: 46 02     LSR $02
  $8098: 6A        ROR A
  $8099: 18        CLC
  $809A: 69 88     ADC #$88
  $809C: 85 03     STA $03
  $809E: A5 02     LDA $02
  $80A0: 69 F0     ADC #$f0
  $80A2: 85 04     STA $04
  $80A4: A0 00     LDY #$00
  $80A6: B1 03     LDA ($03),Y
  $80A8: 85 02     STA $02
  $80AA: 68        PLA
  $80AB: 85 04     STA $04
  $80AD: 68        PLA
  $80AE: 85 03     STA $03
  $80B0: A9 00     LDA #$00
  $80B2: 85 01     STA $01
  $80B4: A9 00     LDA #$00
  $80B6: 85 06     STA $06
  $80B8: A6 05     LDX $05
  $80BA: A4 06     LDY $06
  $80BC: B1 03     LDA ($03),Y
  $80BE: 9D 3D 03  STA $033d,X
  $80C1: C8        INY
  $80C2: B1 03     LDA ($03),Y
  $80C4: 9D 3E 03  STA $033e,X
  $80C7: C8        INY
  $80C8: B1 03     LDA ($03),Y
  $80CA: 9D 5D 03  STA $035d,X
  $80CD: C8        INY
  $80CE: B1 03     LDA ($03),Y
  $80D0: 9D 5E 03  STA $035e,X
  $80D3: C8        INY
  $80D4: 84 06     STY $06
  $80D6: 8A        TXA
  $80D7: E8        INX
  $80D8: E8        INX
  $80D9: 86 05     STX $05
  $80DB: 29 FC     AND #$fc
  $80DD: 4A        LSR A
  $80DE: 4A        LSR A
  $80DF: 85 07     STA $07
  $80E1: A5 3D     LDA $3d
  $80E3: 18        CLC
  $80E4: 69 04     ADC #$04
  $80E6: A8        TAY
  $80E7: 29 F8     AND #$f8
  $80E9: 05 07     ORA $07
  $80EB: AA        TAX
  $80EC: 98        TYA
  $80ED: 29 04     AND #$04
  $80EF: 4A        LSR A
  $80F0: 85 07     STA $07
  $80F2: A5 05     LDA $05
  $80F4: 29 02     AND #$02
  $80F6: 4A        LSR A
  $80F7: 05 07     ORA $07
  $80F9: 49 01     EOR #$01
  $80FB: A8        TAY
  $80FC: B9 2D F3  LDA $f32d,Y
  $80FF: 3D 9D 03  AND $039d,X
  $8102: 9D 9D 03  STA $039d,X
  $8105: A9 00     LDA #$00
  $8107: 06 02     ASL $02
  $8109: 2A        ROL A
  $810A: 06 02     ASL $02
  $810C: 2A        ROL A
  $810D: 88        DEY
  $810E: 30 04     BMI $8114
  $8110: 0A        ASL A
  $8111: 0A        ASL A
  $8112: 90 F9     BCC $810d
  $8114: 1D 9D 03  ORA $039d,X
  $8117: 9D 9D 03  STA $039d,X
  $811A: E6 01     INC $01
  $811C: A5 01     LDA $01
  $811E: C9 04     CMP #$04
  $8120: D0 96     BNE $80b8
  $8122: E6 3D     INC $3d
  $8124: C6 00     DEC $00
  $8126: F0 03     BEQ $812b
  $8128: 4C 75 C0  JMP $c075
  $812B: 20 1A C2  JSR $c21a
  $812E: 48        PHA
  $812F: AE 39 03  LDX $0339
  $8132: A9 00     LDA #$00
  $8134: 9D 3C 03  STA $033c,X
  $8137: A5 3D     LDA $3d
  $8139: 29 FC     AND #$fc
  $813B: 0A        ASL A
  $813C: 0A        ASL A
  $813D: 3E 3C 03  ROL $033c,X
  $8140: 0A        ASL A
  $8141: 3E 3C 03  ROL $033c,X
  $8144: 0A        ASL A
  $8145: 3E 3C 03  ROL $033c,X
  $8148: 9D 3B 03  STA $033b,X
  $814B: 68        PLA
  $814C: 7D 3C 03  ADC $033c,X
  $814F: 9D 3C 03  STA $033c,X
  $8152: A9 40     LDA #$40
  $8154: 9D 3A 03  STA $033a,X
  $8157: 20 2F 80  JSR $802f
  $815A: A5 3D     LDA $3d
  $815C: C9 1C     CMP #$1c
  $815E: 90 02     BCC $8162
  $8160: E6 42     INC $42
  $8162: 60        RTS
  $8163: 20 1A C2  JSR $c21a
  $8166: 09 03     ORA #$03
  $8168: 8D 9C 03  STA $039c
  $816B: 20 23 80  JSR $8023
  $816E: 9A        TXS
  $816F: 03 E6     SLO ($e6,X)
  $8171: 42        ???
  $8172: 60        RTS
  $8173: A5 19     LDA $19
  $8175: 49 02     EOR #$02
  $8177: 85 19     STA $19
  $8179: A9 00     LDA #$00
  $817B: 85 16     STA $16
  $817D: A5 71     LDA $71
  $817F: C9 FF     CMP #$ff
  $8181: F0 10     BEQ $8193
  $8183: A9 00     LDA #$00
  $8185: 85 43     STA $43
  $8187: 8D BC 05  STA $05bc
  $818A: 8D 1B 06  STA $061b
  $818D: 8D 00 06  STA $0600
  $8190: 8D 1F 06  STA $061f
  $8193: AC 40 00  LDY $0040
  $8196: B9 0B F2  LDA $f20b,Y
  $8199: 48        PHA
  $819A: 29 1F     AND #$1f
  $819C: 85 1A     STA $1a
  $819E: 68        PLA
  $819F: 29 E0     AND #$e0
  $81A1: 4A        LSR A
  $81A2: 4A        LSR A
  $81A3: 4A        LSR A
  $81A4: 85 00     STA $00
  $81A6: 4A        LSR A
  $81A7: 18        CLC
  $81A8: 65 00     ADC $00
  $81AA: A8        TAY
  $81AB: A2 00     LDX #$00
  $81AD: 8A        TXA
  $81AE: 29 03     AND #$03
  $81B0: F0 07     BEQ $81b9
  $81B2: B9 49 F2  LDA $f249,Y
  $81B5: 9D 20 03  STA $0320,X
  $81B8: C8        INY
  $81B9: E8        INX
  $81BA: E0 08     CPX #$08
  $81BC: D0 EF     BNE $81ad
  $81BE: A5 71     LDA $71
  $81C0: C9 FF     CMP #$ff
  $81C2: F0 36     BEQ $81fa
  $81C4: 20 4A 80  JSR $804a
  $81C7: AA        TAX
  $81C8: C9 02     CMP #$02
  $81CA: B0 06     BCS $81d2
  $81CC: 20 25 C2  JSR $c225
  $81CF: 4C FA C1  JMP $c1fa
  $81D2: CA        DEX
  $81D3: E0 01     CPX #$01
  $81D5: D0 07     BNE $81de
  $81D7: AE DE 06  LDX $06de
  $81DA: F0 02     BEQ $81de
  $81DC: A2 01     LDX #$01
  $81DE: 8A        TXA
  $81DF: 0A        ASL A
  $81E0: 0A        ASL A
  $81E1: 85 00     STA $00
  $81E3: 0A        ASL A
  $81E4: 65 00     ADC $00
  $81E6: AA        TAX
  $81E7: A0 00     LDY #$00
  $81E9: 98        TYA
  $81EA: 29 03     AND #$03
  $81EC: F0 07     BEQ $81f5
  $81EE: BD 79 F2  LDA $f279,X
  $81F1: 99 28 03  STA $0328,Y
  $81F4: E8        INX
  $81F5: C8        INY
  $81F6: C0 10     CPY #$10
  $81F8: D0 EF     BNE $81e9
  $81FA: A5 73     LDA $73
  $81FC: 29 10     AND #$10
  $81FE: F0 0B     BEQ $820b
  $8200: A9 80     LDA #$80
  $8202: 8D A1 05  STA $05a1
  $8205: 20 FF C2  JSR $c2ff
  $8208: 4C 10 C2  JMP $c210
  $820B: 20 23 80  JSR $8023
  $820E: 15 03     ORA $03,X
  $8210: E6 42     INC $42
  $8212: 60        RTS
  $8213: A9 00     LDA #$00
  $8215: 85 3C     STA $3c
  $8217: 85 41     STA $41
  $8219: 60        RTS
  $821A: A5 19     LDA $19
  $821C: 4A        LSR A
  $821D: 4A        LSR A
  $821E: A9 20     LDA #$20
  $8220: B0 02     BCS $8224
  $8222: A9 28     LDA #$28
  $8224: 60        RTS
  $8225: 4A        LSR A
  $8226: B0 0E     BCS $8236
  $8228: AD 9F 05  LDA $059f
  $822B: A6 71     LDX $71
  $822D: E0 23     CPX #$23
  $822F: D0 1A     BNE $824b
  $8231: AD B9 05  LDA $05b9
  $8234: 10 15     BPL $824b
  $8236: AE D2 05  LDX $05d2
  $8239: BD C2 05  LDA $05c2,X
  $823C: AE DE 03  LDX $03de
  $823F: F0 0A     BEQ $824b
  $8241: AD E3 05  LDA $05e3
  $8244: 4A        LSR A
  $8245: A9 00     LDA #$00
  $8247: B0 02     BCS $824b
  $8249: A9 0B     LDA #$0b
  $824B: 4C 4E C2  JMP $c24e
  $824E: AA        TAX
  $824F: C9 0B     CMP #$0b
  $8251: 90 02     BCC $8255
  $8253: E9 0B     SBC #$0b
  $8255: 8D DB 03  STA $03db
  $8258: 8A        TXA
  $8259: 20 47 80  JSR $8047
  $825C: A0 03     LDY #$03
  $825E: B1 5D     LDA ($5d),Y
  $8260: 48        PHA
  $8261: A8        TAY
  $8262: A2 00     LDX #$00
  $8264: C0 27     CPY #$27
  $8266: B0 03     BCS $826b
  $8268: 88        DEY
  $8269: 10 22     BPL $828d
  $826B: AC DC 06  LDY $06dc
  $826E: E8        INX
  $826F: E8        INX
  $8270: E8        INX
  $8271: E8        INX
  $8272: AD DB 03  LDA $03db
  $8275: C9 00     CMP #$00
  $8277: D0 0C     BNE $8285
  $8279: 98        TYA
  $827A: 18        CLC
  $827B: 69 22     ADC #$22
  $827D: C9 2C     CMP #$2c
  $827F: 90 1F     BCC $82a0
  $8281: 69 02     ADC #$02
  $8283: D0 1B     BNE $82a0
  $8285: C0 0A     CPY #$0a
  $8287: 90 04     BCC $828d
  $8289: 98        TYA
  $828A: E9 0A     SBC #$0a
  $828C: A8        TAY
  $828D: AD DE 06  LDA $06de
  $8290: F0 02     BEQ $8294
  $8292: E8        INX
  $8293: E8        INX
  $8294: BD E7 FA  LDA $fae7,X
  $8297: 85 00     STA $00
  $8299: BD E8 FA  LDA $fae8,X
  $829C: 85 01     STA $01
  $829E: B1 00     LDA ($00),Y
  $82A0: 20 CD C2  JSR $c2cd
  $82A3: 68        PLA
  $82A4: A8        TAY
  $82A5: 88        DEY
  $82A6: 10 0D     BPL $82b5
  $82A8: A9 08     LDA #$08
  $82AA: AC DB 03  LDY $03db
  $82AD: C0 00     CPY #$00
  $82AF: D0 12     BNE $82c3
  $82B1: A9 0D     LDA #$0d
  $82B3: D0 0E     BNE $82c3
  $82B5: 98        TYA
  $82B6: 4A        LSR A
  $82B7: A8        TAY
  $82B8: B9 D4 FA  LDA $fad4,Y
  $82BB: B0 04     BCS $82c1
  $82BD: 4A        LSR A
  $82BE: 4A        LSR A
  $82BF: 4A        LSR A
  $82C0: 4A        LSR A
  $82C1: 29 0F     AND #$0f
  $82C3: C9 09     CMP #$09
  $82C5: 90 02     BCC $82c9
  $82C7: E9 09     SBC #$09
  $82C9: 8D D6 03  STA $03d6
  $82CC: 60        RTS
  $82CD: 0A        ASL A
  $82CE: 0A        ASL A
  $82CF: A8        TAY
  $82D0: B9 43 FB  LDA $fb43,Y
  $82D3: 48        PHA
  $82D4: A2 00     LDX #$00
  $82D6: 8A        TXA
  $82D7: 29 03     AND #$03
  $82D9: F0 1D     BEQ $82f8
  $82DB: C9 01     CMP #$01
  $82DD: F0 10     BEQ $82ef
  $82DF: C9 03     CMP #$03
  $82E1: F0 10     BEQ $82f3
  $82E3: B9 44 FB  LDA $fb44,Y
  $82E6: C8        INY
  $82E7: E0 0E     CPX #$0e
  $82E9: D0 0A     BNE $82f5
  $82EB: A9 30     LDA #$30
  $82ED: D0 06     BNE $82f5
  $82EF: A9 0F     LDA #$0f
  $82F1: D0 02     BNE $82f5
  $82F3: 68        PLA
  $82F4: 48        PHA
  $82F5: 9D 28 03  STA $0328,X
  $82F8: E8        INX
  $82F9: E0 10     CPX #$10
  $82FB: D0 D9     BNE $82d6
  $82FD: 68        PLA
  $82FE: 60        RTS
  $82FF: AD A1 05  LDA $05a1
  $8302: F0 0E     BEQ $8312
  $8304: 10 07     BPL $830d
  $8306: A9 01     LDA #$01
  $8308: 8D A1 05  STA $05a1
  $830B: D0 06     BNE $8313
  $830D: CE A2 05  DEC $05a2
  $8310: 30 01     BMI $8313
  $8312: 60        RTS
  $8313: EE EB 05  INC $05eb
  $8316: A9 06     LDA #$06
  $8318: AE A4 05  LDX $05a4
  $831B: F0 02     BEQ $831f
  $831D: A9 04     LDA #$04
  $831F: 8D A2 05  STA $05a2
  $8322: A2 03     LDX #$03
  $8324: A9 1A     LDA #$1a
  $8326: 9D 24 03  STA $0324,X
  $8329: CA        DEX
  $832A: D0 FA     BNE $8326
  $832C: AE A3 05  LDX $05a3
  $832F: A9 04     LDA #$04
  $8331: 2C 01 03  BIT $0301
  $8334: F0 07     BEQ $833d
  $8336: CA        DEX
  $8337: 10 0B     BPL $8344
  $8339: A2 02     LDX #$02
  $833B: D0 07     BNE $8344
  $833D: E8        INX
  $833E: E0 03     CPX #$03
  $8340: D0 02     BNE $8344
  $8342: A2 00     LDX #$00
  $8344: 8E A3 05  STX $05a3
  $8347: A9 3A     LDA #$3a
  $8349: BC 31 F3  LDY $f331,X
  $834C: 99 24 03  STA $0324,Y
  $834F: 20 23 80  JSR $8023
  $8352: 15 03     ORA $03,X
  $8354: 60        RTS
  $8355: 0A        ASL A
  $8356: AA        TAX
  $8357: BD 86 F5  LDA $f586,X
  $835A: A8        TAY
  $835B: BD 87 F5  LDA $f587,X
  $835E: 18        CLC
  $835F: 4C 4D 80  JMP $804d
  $8362: AD D6 05  LDA $05d6
  $8365: 0A        ASL A
  $8366: AA        TAX
  $8367: BD 3C F3  LDA $f33c,X
  $836A: A8        TAY
  $836B: BD 3D F3  LDA $f33d,X
  $836E: 38        SEC
  $836F: EE D6 05  INC $05d6
  $8372: 4C 4D 80  JMP $804d
  $8375: AD CC 03  LDA $03cc
  $8378: F0 31     BEQ $83ab
  $837A: 10 12     BPL $838e
  $837C: A6 83     LDX $83
  $837E: BD B6 C3  LDA $c3b6,X
  $8381: 8D CD 03  STA $03cd
  $8384: A9 01     LDA #$01
  $8386: 8D CC 03  STA $03cc
  $8389: A9 00     LDA #$00
  $838B: 8D CE 03  STA $03ce
  $838E: CE CD 03  DEC $03cd
  $8391: 10 07     BPL $839a
  $8393: A9 00     LDA #$00
  $8395: 8D CC 03  STA $03cc
  $8398: F0 11     BEQ $83ab
  $839A: CE CE 03  DEC $03ce
  $839D: 30 01     BMI $83a0
  $839F: 60        RTS
  $83A0: A9 03     LDA #$03
  $83A2: 8D CE 03  STA $03ce
  $83A5: A5 18     LDA $18
  $83A7: 49 01     EOR #$01
  $83A9: 29 01     AND #$01
  $83AB: 85 00     STA $00
  $83AD: A5 18     LDA $18
  $83AF: 29 FE     AND #$fe
  $83B1: 05 00     ORA $00
  $83B3: 85 18     STA $18
  $83B5: 60        RTS
  $83B6: 10 1E     BPL $83d6
  $83B8: 30 78     BMI $8432
  $83BA: A5 7C     LDA $7c
  $83BC: F0 2B     BEQ $83e9
  $83BE: 10 1C     BPL $83dc
  $83C0: A5 84     LDA $84
  $83C2: 0A        ASL A
  $83C3: AA        TAX
  $83C4: BD 36 FA  LDA $fa36,X
  $83C7: 85 7E     STA $7e
  $83C9: BD 37 FA  LDA $fa37,X
  $83CC: 85 7F     STA $7f
  $83CE: A0 00     LDY #$00
  $83D0: B1 7E     LDA ($7e),Y
  $83D2: 85 80     STA $80
  $83D4: C8        INY
  $83D5: 84 7D     STY $7d
  $83D7: 84 7C     STY $7c
  $83D9: 4C EA C3  JMP $c3ea
  $83DC: C6 80     DEC $80
  $83DE: D0 05     BNE $83e5
  $83E0: A9 00     LDA #$00
  $83E2: 85 7C     STA $7c
  $83E4: 60        RTS
  $83E5: C6 81     DEC $81
  $83E7: 30 01     BMI $83ea
  $83E9: 60        RTS
  $83EA: A4 7D     LDY $7d
  $83EC: B1 7E     LDA ($7e),Y
  $83EE: C9 FF     CMP #$ff
  $83F0: D0 06     BNE $83f8
  $83F2: A0 01     LDY #$01
  $83F4: 84 7D     STY $7d
  $83F6: D0 F2     BNE $83ea
  $83F8: AA        TAX
  $83F9: 4A        LSR A
  $83FA: 4A        LSR A
  $83FB: 8D 21 03  STA $0321
  $83FE: 8A        TXA
  $83FF: 29 03     AND #$03
  $8401: AA        TAX
  $8402: BD 12 C4  LDA $c412,X
  $8405: 85 81     STA $81
  $8407: E6 7D     INC $7d
  $8409: 20 23 80  JSR $8023
  $840C: 15 03     ORA $03,X
  $840E: EE EB 05  INC $05eb
  $8411: 60        RTS
  $8412: 01 04     ORA ($04,X)
  $8414: 08        PHP
  $8415: 10 A9     BPL $83c0
  $8417: 00        BRK
  $8418: 8D 92 06  STA $0692
  $841B: AD E6 03  LDA $03e6
  $841E: D0 01     BNE $8421
  $8420: 60        RTS
  $8421: 10 18     BPL $843b
  $8423: A9 01     LDA #$01
  $8425: 8D E6 03  STA $03e6
  $8428: A9 06     LDA #$06
  $842A: 8D E7 03  STA $03e7
  $842D: A2 00     LDX #$00
  $842F: AD EC 03  LDA $03ec
  $8432: C9 10     CMP #$10
  $8434: B0 02     BCS $8438
  $8436: A2 02     LDX #$02
  $8438: 8E ED 03  STX $03ed
  $843B: AD 39 03  LDA $0339
  $843E: F0 01     BEQ $8441
  $8440: 60        RTS
  $8441: AD ED 03  LDA $03ed
  $8444: 20 17 80  JSR $8017
  $8447: 51 C4     EOR ($c4),Y
  $8449: 95 C4     STA $c4,X
  $844B: C5 C4     CMP $c4
  $844D: 06 C5     ASL $c5
  $844F: 4D C5 AE  EOR $aec5
  $8452: 39 03 A0  AND $a003,Y
  $8455: 36 A9     ROL $a9,X
  $8457: 00        BRK
  $8458: 9D 3A 03  STA $033a,X
  $845B: E8        INX
  $845C: 88        DEY
  $845D: D0 F9     BNE $8458
  $845F: AE 39 03  LDX $0339
  $8462: A9 18     LDA #$18
  $8464: 9D 3A 03  STA $033a,X
  $8467: 9D 55 03  STA $0355,X
  $846A: 18        CLC
  $846B: A0 22     LDY #$22
  $846D: AD E7 03  LDA $03e7
  $8470: 6A        ROR A
  $8471: 6A        ROR A
  $8472: 6A        ROR A
  $8473: 90 01     BCC $8476
  $8475: C8        INY
  $8476: 09 08     ORA #$08
  $8478: 9D 3B 03  STA $033b,X
  $847B: 09 20     ORA #$20
  $847D: 9D 56 03  STA $0356,X
  $8480: 98        TYA
  $8481: 9D 3C 03  STA $033c,X
  $8484: 9D 57 03  STA $0357,X
  $8487: A9 33     LDA #$33
  $8489: 20 2F 80  JSR $802f
  $848C: CE E7 03  DEC $03e7
  $848F: 10 03     BPL $8494
  $8491: EE ED 03  INC $03ed
  $8494: 60        RTS
  $8495: AE 39 03  LDX $0339
  $8498: A9 20     LDA #$20
  $849A: 9D 3A 03  STA $033a,X
  $849D: A9 E0     LDA #$e0
  $849F: 9D 3B 03  STA $033b,X
  $84A2: A9 23     LDA #$23
  $84A4: 9D 3C 03  STA $033c,X
  $84A7: A0 20     LDY #$20
  $84A9: A9 00     LDA #$00
  $84AB: 9D 3D 03  STA $033d,X
  $84AE: E8        INX
  $84AF: 88        DEY
  $84B0: D0 F9     BNE $84ab
  $84B2: A9 20     LDA #$20
  $84B4: 20 2F 80  JSR $802f
  $84B7: EE ED 03  INC $03ed
  $84BA: AD EC 03  LDA $03ec
  $84BD: 10 05     BPL $84c4
  $84BF: A9 04     LDA #$04
  $84C1: 8D ED 03  STA $03ed
  $84C4: 60        RTS
  $84C5: AD EC 03  LDA $03ec
  $84C8: 0A        ASL A
  $84C9: AA        TAX
  $84CA: BD 37 F7  LDA $f737,X
  $84CD: 85 00     STA $00
  $84CF: BD 38 F7  LDA $f738,X
  $84D2: 85 01     STA $01
  $84D4: A0 00     LDY #$00
  $84D6: B1 00     LDA ($00),Y
  $84D8: 8D E7 03  STA $03e7
  $84DB: C8        INY
  $84DC: B1 00     LDA ($00),Y
  $84DE: 8D E8 03  STA $03e8
  $84E1: C8        INY
  $84E2: B1 00     LDA ($00),Y
  $84E4: 8D E9 03  STA $03e9
  $84E7: C8        INY
  $84E8: B1 00     LDA ($00),Y
  $84EA: 8D EA 03  STA $03ea
  $84ED: C8        INY
  $84EE: B1 00     LDA ($00),Y
  $84F0: AA        TAX
  $84F1: 8D EF 03  STA $03ef
  $84F4: C8        INY
  $84F5: B1 00     LDA ($00),Y
  $84F7: 9D EF 03  STA $03ef,X
  $84FA: CA        DEX
  $84FB: D0 F7     BNE $84f4
  $84FD: A9 00     LDA #$00
  $84FF: 8D EB 03  STA $03eb
  $8502: EE ED 03  INC $03ed
  $8505: 60        RTS
  $8506: AE 39 03  LDX $0339
  $8509: 20 70 C5  JSR $c570
  $850C: AD 39 03  LDA $0339
  $850F: 18        CLC
  $8510: 6D EA 03  ADC $03ea
  $8513: 69 03     ADC #$03
  $8515: 85 01     STA $01
  $8517: AA        TAX
  $8518: 20 70 C5  JSR $c570
  $851B: AD EF 03  LDA $03ef
  $851E: 85 00     STA $00
  $8520: A4 00     LDY $00
  $8522: B9 EF 03  LDA $03ef,Y
  $8525: 0A        ASL A
  $8526: AA        TAX
  $8527: BD D2 F7  LDA $f7d2,X
  $852A: 85 02     STA $02
  $852C: BD D3 F7  LDA $f7d3,X
  $852F: 85 03     STA $03
  $8531: 20 9B C5  JSR $c59b
  $8534: C6 00     DEC $00
  $8536: D0 E8     BNE $8520
  $8538: EE EB 03  INC $03eb
  $853B: AD EA 03  LDA $03ea
  $853E: 0A        ASL A
  $853F: 69 03     ADC #$03
  $8541: 20 2F 80  JSR $802f
  $8544: CE E9 03  DEC $03e9
  $8547: D0 03     BNE $854c
  $8549: EE ED 03  INC $03ed
  $854C: 60        RTS
  $854D: CE F3 03  DEC $03f3
  $8550: F0 18     BEQ $856a
  $8552: AE F3 03  LDX $03f3
  $8555: A0 00     LDY #$00
  $8557: B9 F5 03  LDA $03f5,Y
  $855A: 99 F4 03  STA $03f4,Y
  $855D: C8        INY
  $855E: CA        DEX
  $855F: D0 F6     BNE $8557
  $8561: AD F4 03  LDA $03f4
  $8564: 8D EC 03  STA $03ec
  $8567: A9 80     LDA #$80
  $8569: 2C A9 00  BIT $00a9
  $856C: 8D E6 03  STA $03e6
  $856F: 60        RTS
  $8570: AD EA 03  LDA $03ea
  $8573: 9D 3A 03  STA $033a,X
  $8576: A8        TAY
  $8577: AD E7 03  LDA $03e7
  $857A: 9D 3B 03  STA $033b,X
  $857D: AD E8 03  LDA $03e8
  $8580: 9D 3C 03  STA $033c,X
  $8583: A9 00     LDA #$00
  $8585: 9D 3D 03  STA $033d,X
  $8588: E8        INX
  $8589: 88        DEY
  $858A: D0 F9     BNE $8585
  $858C: AD E7 03  LDA $03e7
  $858F: 18        CLC
  $8590: 69 20     ADC #$20
  $8592: 8D E7 03  STA $03e7
  $8595: 90 03     BCC $859a
  $8597: EE E8 03  INC $03e8
  $859A: 60        RTS
  $859B: AD EB 03  LDA $03eb
  $859E: 0A        ASL A
  $859F: 8D 05 00  STA $0005
  $85A2: AE 39 03  LDX $0339
  $85A5: 20 B0 C5  JSR $c5b0
  $85A8: EE 05 00  INC $0005
  $85AB: A6 01     LDX $01
  $85AD: 4C B0 C5  JMP $c5b0
  $85B0: A9 00     LDA #$00
  $85B2: 85 06     STA $06
  $85B4: 86 04     STX $04
  $85B6: A0 01     LDY #$01
  $85B8: 8A        TXA
  $85B9: 18        CLC
  $85BA: 71 02     ADC ($02),Y
  $85BC: AA        TAX
  $85BD: 88        DEY
  $85BE: B1 02     LDA ($02),Y
  $85C0: C5 05     CMP $05
  $85C2: F0 21     BEQ $85e5
  $85C4: B0 50     BCS $8616
  $85C6: E6 06     INC $06
  $85C8: A0 02     LDY #$02
  $85CA: 71 02     ADC ($02),Y
  $85CC: E9 00     SBC #$00
  $85CE: C5 05     CMP $05
  $85D0: F0 13     BEQ $85e5
  $85D2: 90 42     BCC $8616
  $85D4: A9 06     LDA #$06
  $85D6: 9D 3D 03  STA $033d,X
  $85D9: A0 03     LDY #$03
  $85DB: 8A        TXA
  $85DC: 18        CLC
  $85DD: 71 02     ADC ($02),Y
  $85DF: AA        TAX
  $85E0: CA        DEX
  $85E1: A9 07     LDA #$07
  $85E3: D0 2E     BNE $8613
  $85E5: A9 18     LDA #$18
  $85E7: C6 06     DEC $06
  $85E9: 08        PHP
  $85EA: 30 02     BMI $85ee
  $85EC: A9 1A     LDA #$1a
  $85EE: 9D 3D 03  STA $033d,X
  $85F1: E8        INX
  $85F2: A0 03     LDY #$03
  $85F4: B1 02     LDA ($02),Y
  $85F6: 85 06     STA $06
  $85F8: C6 06     DEC $06
  $85FA: C6 06     DEC $06
  $85FC: A9 04     LDA #$04
  $85FE: 28        PLP
  $85FF: 08        PHP
  $8600: 30 02     BMI $8604
  $8602: A9 05     LDA #$05
  $8604: 9D 3D 03  STA $033d,X
  $8607: E8        INX
  $8608: C6 06     DEC $06
  $860A: D0 F8     BNE $8604
  $860C: A9 19     LDA #$19
  $860E: 28        PLP
  $860F: 30 02     BMI $8613
  $8611: A9 1B     LDA #$1b
  $8613: 9D 3D 03  STA $033d,X
  $8616: A0 04     LDY #$04
  $8618: B1 02     LDA ($02),Y
  $861A: F0 3D     BEQ $8659
  $861C: 85 06     STA $06
  $861E: C8        INY
  $861F: 84 07     STY $07
  $8621: A9 00     LDA #$00
  $8623: 85 08     STA $08
  $8625: A4 07     LDY $07
  $8627: B1 02     LDA ($02),Y
  $8629: 0A        ASL A
  $862A: AA        TAX
  $862B: BD A8 F8  LDA $f8a8,X
  $862E: 85 0A     STA $0a
  $8630: BD A9 F8  LDA $f8a9,X
  $8633: 85 0B     STA $0b
  $8635: A0 00     LDY #$00
  $8637: B1 0A     LDA ($0a),Y
  $8639: AA        TAX
  $863A: 4A        LSR A
  $863B: 4A        LSR A
  $863C: 4A        LSR A
  $863D: 4A        LSR A
  $863E: A0 00     LDY #$00
  $8640: 18        CLC
  $8641: 71 02     ADC ($02),Y
  $8643: C5 05     CMP $05
  $8645: F0 09     BEQ $8650
  $8647: E6 08     INC $08
  $8649: 38        SEC
  $864A: E9 01     SBC #$01
  $864C: C5 05     CMP $05
  $864E: D0 03     BNE $8653
  $8650: 20 6B C6  JSR $c66b
  $8653: E6 07     INC $07
  $8655: C6 06     DEC $06
  $8657: D0 C8     BNE $8621
  $8659: 60        RTS
  $865A: 20 29 80  JSR $8029
  $865D: C6 08     DEC $08
  $865F: D0 03     BNE $8664
  $8661: 98        TYA
  $8662: F0 03     BEQ $8667
  $8664: 9D 3D 03  STA $033d,X
  $8667: E8        INX
  $8668: E6 08     INC $08
  $866A: 60        RTS
  $866B: 8A        TXA
  $866C: 29 0F     AND #$0f
  $866E: A0 01     LDY #$01
  $8670: 84 0D     STY $0d
  $8672: 18        CLC
  $8673: 71 02     ADC ($02),Y
  $8675: 65 04     ADC $04
  $8677: AA        TAX
  $8678: A4 0D     LDY $0d
  $867A: B1 0A     LDA ($0a),Y
  $867C: C9 FF     CMP #$ff
  $867E: D0 0B     BNE $868b
  $8680: C8        INY
  $8681: 84 0D     STY $0d
  $8683: B1 0A     LDA ($0a),Y
  $8685: 20 93 C6  JSR $c693
  $8688: 4C 8E C6  JMP $c68e
  $868B: 20 5A C6  JSR $c65a
  $868E: E6 0D     INC $0d
  $8690: D0 E6     BNE $8678
  $8692: 60        RTS
  $8693: 86 0E     STX $0e
  $8695: 38        SEC
  $8696: E9 E4     SBC #$e4
  $8698: 20 17 80  JSR $8017
  $869B: 94 C7     STY $c7,X
  $869D: E4 C7     CPX $c7
  $869F: 01 C8     ORA ($c8,X)
  $86A1: 70 C7     BVS $866a
  $86A3: 74 C7     NOP $c7,X
  $86A5: 78        SEI
  $86A6: C7 E9     DCP $e9
  $86A8: C7 5E     DCP $5e
  $86AA: C7 F8     DCP $f8
  $86AC: C7 7F     DCP $7f
  $86AE: C7 83     DCP $83
  $86B0: C7 87     DCP $87
  $86B2: C7 D3     DCP $d3
  $86B4: C6 4C     DEC $4c
  $86B6: C7 DE     DCP $de
  $86B8: C7 06     DCP $06
  $86BA: C8        INY
  $86BB: 23 C8     RLA ($c8,X)
  $86BD: 31 C8     AND ($c8),Y
  $86BF: 3F C8 D8  RLA $d8c8,X
  $86C2: C7 F2     DCP $f2
  $86C4: C7 1D     DCP $1d
  $86C6: C8        INY
  $86C7: 2B C8     ANC #$c8
  $86C9: 39 C8 4E  AND $4ec8,Y
  $86CC: C8        INY
  $86CD: 57 C8     SRE $c8,X
  $86CF: 62        ???
  $86D0: C8        INY
  $86D1: B3 C8     LAX ($c8),Y
  $86D3: AD A1 06  LDA $06a1
  $86D6: 85 57     STA $57
  $86D8: AD A2 06  LDA $06a2
  $86DB: 85 58     STA $58
  $86DD: A9 06     LDA #$06
  $86DF: 85 59     STA $59
  $86E1: A9 00     LDA #$00
  $86E3: 85 5C     STA $5c
  $86E5: 20 41 80  JSR $8041
  $86E8: A5 5A     LDA $5a
  $86EA: 0A        ASL A
  $86EB: 85 5A     STA $5a
  $86ED: 0A        ASL A
  $86EE: 0A        ASL A
  $86EF: 65 5A     ADC $5a
  $86F1: 8D A3 06  STA $06a3
  $86F4: A5 57     LDA $57
  $86F6: 8D A4 06  STA $06a4
  $86F9: 38        SEC
  $86FA: 20 0D C7  JSR $c70d
  $86FD: A9 61     LDA #$61
  $86FF: 20 5D C6  JSR $c65d
  $8702: 18        CLC
  $8703: AD A3 06  LDA $06a3
  $8706: 20 0D C7  JSR $c70d
  $8709: EE 92 06  INC $0692
  $870C: 60        RTS
  $870D: 08        PHP
  $870E: 85 57     STA $57
  $8710: A9 00     LDA #$00
  $8712: 85 58     STA $58
  $8714: 85 5C     STA $5c
  $8716: A9 0A     LDA #$0a
  $8718: 85 59     STA $59
  $871A: 20 41 80  JSR $8041
  $871D: 28        PLP
  $871E: A5 57     LDA $57
  $8720: D0 05     BNE $8727
  $8722: 90 03     BCC $8727
  $8724: E8        INX
  $8725: D0 03     BNE $872a
  $8727: 20 2C C7  JSR $c72c
  $872A: A5 5A     LDA $5a
  $872C: 18        CLC
  $872D: 69 64     ADC #$64
  $872F: A0 00     LDY #$00
  $8731: 4C 5D C6  JMP $c65d
  $8734: 48        PHA
  $8735: 4A        LSR A
  $8736: 4A        LSR A
  $8737: 4A        LSR A
  $8738: 4A        LSR A
  $8739: 20 3F C7  JSR $c73f
  $873C: 68        PLA
  $873D: 29 0F     AND #$0f
  $873F: C9 0A     CMP #$0a
  $8741: 90 02     BCC $8745
  $8743: 69 52     ADC #$52
  $8745: 69 64     ADC #$64
  $8747: A0 00     LDY #$00
  $8749: 4C 5D C6  JMP $c65d
  $874C: AD EE 03  LDA $03ee
  $874F: 4A        LSR A
  $8750: A8        TAY
  $8751: B9 A8 05  LDA $05a8,Y
  $8754: 20 53 80  JSR $8053
  $8757: 20 26 C9  JSR $c926
  $875A: EE EE 03  INC $03ee
  $875D: 60        RTS
  $875E: AD EE 03  LDA $03ee
  $8761: 4A        LSR A
  $8762: A8        TAY
  $8763: B9 C2 05  LDA $05c2,Y
  $8766: 20 53 80  JSR $8053
  $8769: 20 26 C9  JSR $c926
  $876C: EE EE 03  INC $03ee
  $876F: 60        RTS
  $8770: A2 03     LDX #$03
  $8772: D0 06     BNE $877a
  $8774: A2 02     LDX #$02
  $8776: D0 02     BNE $877a
  $8778: A2 01     LDX #$01
  $877A: A9 00     LDA #$00
  $877C: 4C 17 C8  JMP $c817
  $877F: A2 07     LDX #$07
  $8781: D0 08     BNE $878b
  $8783: A2 08     LDX #$08
  $8785: D0 04     BNE $878b
  $8787: A2 09     LDX #$09
  $8789: D0 00     BNE $878b
  $878B: AC D2 05  LDY $05d2
  $878E: B9 C2 05  LDA $05c2,Y
  $8791: 4C 17 C8  JMP $c817
  $8794: AD EE 03  LDA $03ee
  $8797: EE EE 03  INC $03ee
  $879A: 4A        LSR A
  $879B: A8        TAY
  $879C: B9 9E 06  LDA $069e,Y
  $879F: 8D 99 06  STA $0699
  $87A2: 20 AA C7  JSR $c7aa
  $87A5: A6 0E     LDX $0e
  $87A7: 4C 26 C9  JMP $c926
  $87AA: AD 99 06  LDA $0699
  $87AD: 0A        ASL A
  $87AE: A8        TAY
  $87AF: B9 E2 F3  LDA $f3e2,Y
  $87B2: 85 65     STA $65
  $87B4: B9 E3 F3  LDA $f3e3,Y
  $87B7: 85 66     STA $66
  $87B9: A0 00     LDY #$00
  $87BB: B1 65     LDA ($65),Y
  $87BD: 85 68     STA $68
  $87BF: 8D 81 06  STA $0681
  $87C2: AA        TAX
  $87C3: C8        INY
  $87C4: 84 67     STY $67
  $87C6: B1 65     LDA ($65),Y
  $87C8: 99 81 06  STA $0681,Y
  $87CB: C8        INY
  $87CC: CA        DEX
  $87CD: D0 F7     BNE $87c6
  $87CF: A9 81     LDA #$81
  $87D1: 85 65     STA $65
  $87D3: A9 06     LDA #$06
  $87D5: 85 66     STA $66
  $87D7: 60        RTS
  $87D8: AD B9 05  LDA $05b9
  $87DB: 4C EC C8  JMP $c8ec
  $87DE: AD 9F 05  LDA $059f
  $87E1: 4C EC C8  JMP $c8ec
  $87E4: A9 00     LDA #$00
  $87E6: 4C EC C8  JMP $c8ec
  $87E9: AC D2 05  LDY $05d2
  $87EC: B9 C2 05  LDA $05c2,Y
  $87EF: 4C EC C8  JMP $c8ec
  $87F2: AD B9 05  LDA $05b9
  $87F5: 4C 09 C8  JMP $c809
  $87F8: AC D2 05  LDY $05d2
  $87FB: B9 C2 05  LDA $05c2,Y
  $87FE: 4C 09 C8  JMP $c809
  $8801: A9 00     LDA #$00
  $8803: 4C 09 C8  JMP $c809
  $8806: AD 9F 05  LDA $059f
  $8809: 20 47 80  JSR $8047
  $880C: A0 10     LDY #$10
  $880E: B1 5D     LDA ($5d),Y
  $8810: AA        TAX
  $8811: 88        DEY
  $8812: B1 5D     LDA ($5d),Y
  $8814: 4C BC C8  JMP $c8bc
  $8817: 20 50 80  JSR $8050
  $881A: 4C 47 C8  JMP $c847
  $881D: AD B9 05  LDA $05b9
  $8820: 4C 26 C8  JMP $c826
  $8823: AD 9F 05  LDA $059f
  $8826: A2 05     LDX #$05
  $8828: 4C 17 C8  JMP $c817
  $882B: AD B9 05  LDA $05b9
  $882E: 4C 34 C8  JMP $c834
  $8831: AD 9F 05  LDA $059f
  $8834: A2 04     LDX #$04
  $8836: 4C 17 C8  JMP $c817
  $8839: AD B9 05  LDA $05b9
  $883C: 4C 42 C8  JMP $c842
  $883F: AD 9F 05  LDA $059f
  $8842: A2 06     LDX #$06
  $8844: 4C 17 C8  JMP $c817
  $8847: A5 6E     LDA $6e
  $8849: A2 00     LDX #$00
  $884B: 4C BC C8  JMP $c8bc
  $884E: E6 0D     INC $0d
  $8850: A4 0D     LDY $0d
  $8852: B1 0A     LDA ($0a),Y
  $8854: 4C B6 C8  JMP $c8b6
  $8857: AD DE 06  LDA $06de
  $885A: F0 02     BEQ $885e
  $885C: A9 01     LDA #$01
  $885E: 18        CLC
  $885F: 4C 66 C8  JMP $c866
  $8862: AD DC 06  LDA $06dc
  $8865: 38        SEC
  $8866: 08        PHP
  $8867: C9 16     CMP #$16
  $8869: D0 02     BNE $886d
  $886B: A9 09     LDA #$09
  $886D: 48        PHA
  $886E: 18        CLC
  $886F: 69 3A     ADC #$3a
  $8871: 20 56 80  JSR $8056
  $8874: 68        PLA
  $8875: 48        PHA
  $8876: 4A        LSR A
  $8877: 4A        LSR A
  $8878: 4A        LSR A
  $8879: A8        TAY
  $887A: B9 B0 C8  LDA $c8b0,Y
  $887D: 85 0F     STA $0f
  $887F: 68        PLA
  $8880: 29 07     AND #$07
  $8882: A8        TAY
  $8883: 06 0F     ASL $0f
  $8885: 88        DEY
  $8886: 10 FB     BPL $8883
  $8888: 08        PHP
  $8889: A9 03     LDA #$03
  $888B: 69 00     ADC #$00
  $888D: 85 68     STA $68
  $888F: 20 26 C9  JSR $c926
  $8892: 28        PLP
  $8893: B0 01     BCS $8896
  $8895: E8        INX
  $8896: 86 0E     STX $0e
  $8898: 28        PLP
  $8899: A0 00     LDY #$00
  $889B: 90 01     BCC $889e
  $889D: C8        INY
  $889E: B9 E0 05  LDA $05e0,Y
  $88A1: AE E5 03  LDX $03e5
  $88A4: E0 04     CPX #$04
  $88A6: D0 03     BNE $88ab
  $88A8: B9 9B 05  LDA $059b,Y
  $88AB: A2 00     LDX #$00
  $88AD: 4C BC C8  JMP $c8bc
  $88B0: 80 49     NOP #$49
  $88B2: 38        SEC
  $88B3: 68        PLA
  $88B4: 68        PLA
  $88B5: 60        RTS
  $88B6: 20 56 80  JSR $8056
  $88B9: 4C 26 C9  JMP $c926
  $88BC: EE 92 06  INC $0692
  $88BF: 85 57     STA $57
  $88C1: 86 58     STX $58
  $88C3: A9 0A     LDA #$0a
  $88C5: 85 59     STA $59
  $88C7: A9 00     LDA #$00
  $88C9: 85 5C     STA $5c
  $88CB: 20 41 80  JSR $8041
  $88CE: A5 5A     LDA $5a
  $88D0: 20 DF C8  JSR $c8df
  $88D3: A5 58     LDA $58
  $88D5: D0 F4     BNE $88cb
  $88D7: A5 57     LDA $57
  $88D9: F0 10     BEQ $88eb
  $88DB: C9 0A     CMP #$0a
  $88DD: B0 EC     BCS $88cb
  $88DF: 18        CLC
  $88E0: 69 64     ADC #$64
  $88E2: A0 00     LDY #$00
  $88E4: A6 0E     LDX $0e
  $88E6: C6 0E     DEC $0e
  $88E8: 20 5D C6  JSR $c65d
  $88EB: 60        RTS
  $88EC: 48        PHA
  $88ED: C9 0B     CMP #$0b
  $88EF: 90 02     BCC $88f3
  $88F1: E9 0B     SBC #$0b
  $88F3: 0A        ASL A
  $88F4: A8        TAY
  $88F5: B9 11 C9  LDA $c911,Y
  $88F8: 48        PHA
  $88F9: B9 10 C9  LDA $c910,Y
  $88FC: 20 5A C6  JSR $c65a
  $88FF: 68        PLA
  $8900: 20 5A C6  JSR $c65a
  $8903: A9 00     LDA #$00
  $8905: A8        TAY
  $8906: 20 5D C6  JSR $c65d
  $8909: 68        PLA
  $890A: 20 53 80  JSR $8053
  $890D: 4C 26 C9  JMP $c926
  $8910: 72        ???
  $8911: 75 6F     ADC $6f,X
  $8913: 71 6F     ADC ($6f),Y
  $8915: 71 6F     ADC ($6f),Y
  $8917: 71 6F     ADC ($6f),Y
  $8919: 71 76     ADC ($76),Y
  $891B: 71 71     ADC ($71),Y
  $891D: 7B 76 71  RRA $7176,Y
  $8920: 6E 71 76  ROR $7671
  $8923: 71 71     ADC ($71),Y
  $8925: 7B A4 67  RRA $67a4,Y
  $8928: B1 65     LDA ($65),Y
  $892A: 20 5A C6  JSR $c65a
  $892D: E6 67     INC $67
  $892F: C6 68     DEC $68
  $8931: D0 F3     BNE $8926
  $8933: 60        RTS
  $8934: AD DD 05  LDA $05dd
  $8937: 0A        ASL A
  $8938: AA        TAX
  $8939: A9 00     LDA #$00
  $893B: 8D DD 05  STA $05dd
  $893E: BD C2 CA  LDA $cac2,X
  $8941: 8D DA 05  STA $05da
  $8944: BC C3 CA  LDY $cac3,X
  $8947: E0 02     CPX #$02
  $8949: D0 0B     BNE $8956
  $894B: EE DD 05  INC $05dd
  $894E: A5 19     LDA $19
  $8950: 29 02     AND #$02
  $8952: F0 02     BEQ $8956
  $8954: A0 28     LDY #$28
  $8956: 8C DB 05  STY $05db
  $8959: AD DD 05  LDA $05dd
  $895C: 8D D9 05  STA $05d9
  $895F: 60        RTS
  $8960: AD D8 05  LDA $05d8
  $8963: D0 01     BNE $8966
  $8965: 60        RTS
  $8966: 10 0D     BPL $8975
  $8968: A9 01     LDA #$01
  $896A: 8D D8 05  STA $05d8
  $896D: A9 00     LDA #$00
  $896F: 8D DC 05  STA $05dc
  $8972: 20 34 C9  JSR $c934
  $8975: AD DC 05  LDA $05dc
  $8978: 20 17 80  JSR $8017
  $897B: 81 C9     STA ($c9,X)
  $897D: FC C9 62  NOP $62c9,X
  $8980: CA        DEX
  $8981: A9 04     LDA #$04
  $8983: 85 00     STA $00
  $8985: AE 39 03  LDX $0339
  $8988: AD D9 05  LDA $05d9
  $898B: 0A        ASL A
  $898C: 0A        ASL A
  $898D: 0A        ASL A
  $898E: 0A        ASL A
  $898F: 0A        ASL A
  $8990: 08        PHP
  $8991: 85 01     STA $01
  $8993: 18        CLC
  $8994: 6D DA 05  ADC $05da
  $8997: 9D 3B 03  STA $033b,X
  $899A: AD DB 05  LDA $05db
  $899D: 69 00     ADC #$00
  $899F: 28        PLP
  $89A0: 69 00     ADC #$00
  $89A2: 9D 3C 03  STA $033c,X
  $89A5: A9 06     LDA #$06
  $89A7: 9D 3A 03  STA $033a,X
  $89AA: 85 01     STA $01
  $89AC: A9 00     LDA #$00
  $89AE: 85 02     STA $02
  $89B0: AD D9 05  LDA $05d9
  $89B3: 0A        ASL A
  $89B4: 85 03     STA $03
  $89B6: 0A        ASL A
  $89B7: 65 03     ADC $03
  $89B9: A8        TAY
  $89BA: C9 06     CMP #$06
  $89BC: D0 07     BNE $89c5
  $89BE: AD DD 05  LDA $05dd
  $89C1: F0 02     BEQ $89c5
  $89C3: E6 02     INC $02
  $89C5: A5 02     LDA $02
  $89C7: 08        PHP
  $89C8: B9 74 CA  LDA $ca74,Y
  $89CB: 28        PLP
  $89CC: 08        PHP
  $89CD: F0 03     BEQ $89d2
  $89CF: B9 B6 CA  LDA $cab6,Y
  $89D2: 9D 3D 03  STA $033d,X
  $89D5: C8        INY
  $89D6: E8        INX
  $89D7: C6 01     DEC $01
  $89D9: D0 ED     BNE $89c8
  $89DB: 68        PLA
  $89DC: 8A        TXA
  $89DD: A9 06     LDA #$06
  $89DF: 20 2F 80  JSR $802f
  $89E2: EE D9 05  INC $05d9
  $89E5: A2 0C     LDX #$0c
  $89E7: AD DD 05  LDA $05dd
  $89EA: F0 01     BEQ $89ed
  $89EC: CA        DEX
  $89ED: EC D9 05  CPX $05d9
  $89F0: F0 06     BEQ $89f8
  $89F2: C6 00     DEC $00
  $89F4: D0 8F     BNE $8985
  $89F6: F0 03     BEQ $89fb
  $89F8: EE DC 05  INC $05dc
  $89FB: 60        RTS
  $89FC: AD DD 05  LDA $05dd
  $89FF: F0 5D     BEQ $8a5e
  $8A01: A2 00     LDX #$00
  $8A03: BC 68 CA  LDY $ca68,X
  $8A06: BD 69 CA  LDA $ca69,X
  $8A09: 39 9D 03  AND $039d,Y
  $8A0C: 99 9D 03  STA $039d,Y
  $8A0F: E8        INX
  $8A10: E8        INX
  $8A11: E0 10     CPX #$10
  $8A13: D0 EE     BNE $8a03
  $8A15: 20 23 80  JSR $8023
  $8A18: 9A        TXS
  $8A19: 03 AE     SLO ($ae,X)
  $8A1B: 39 03 A9  AND $a903,Y
  $8A1E: 01 9D     ORA ($9d,X)
  $8A20: 3A        NOP
  $8A21: 03 A9     SLO ($a9,X)
  $8A23: EE 9D 3D  INC $3d9d
  $8A26: 03 AD     SLO ($ad,X)
  $8A28: 94 05     STY $05,X
  $8A2A: 29 0F     AND #$0f
  $8A2C: 18        CLC
  $8A2D: 69 82     ADC #$82
  $8A2F: 9D 3B 03  STA $033b,X
  $8A32: AD 94 05  LDA $0594
  $8A35: 29 F0     AND #$f0
  $8A37: 49 F0     EOR #$f0
  $8A39: 18        CLC
  $8A3A: 69 A0     ADC #$a0
  $8A3C: 0A        ASL A
  $8A3D: 08        PHP
  $8A3E: 18        CLC
  $8A3F: 7D 3B 03  ADC $033b,X
  $8A42: 9D 3B 03  STA $033b,X
  $8A45: A0 20     LDY #$20
  $8A47: A5 19     LDA $19
  $8A49: 29 02     AND #$02
  $8A4B: F0 02     BEQ $8a4f
  $8A4D: A0 28     LDY #$28
  $8A4F: 90 01     BCC $8a52
  $8A51: C8        INY
  $8A52: 98        TYA
  $8A53: 28        PLP
  $8A54: 69 00     ADC #$00
  $8A56: 9D 3C 03  STA $033c,X
  $8A59: A9 01     LDA #$01
  $8A5B: 20 2F 80  JSR $802f
  $8A5E: EE DC 05  INC $05dc
  $8A61: 60        RTS
  $8A62: A9 00     LDA #$00
  $8A64: 8D D8 05  STA $05d8
  $8A67: 60        RTS
  $8A68: 08        PHP
  $8A69: 33 09     RLA ($09),Y
  $8A6B: 00        BRK
  $8A6C: 10 33     BPL $8aa1
  $8A6E: 11 00     ORA ($00),Y
  $8A70: 18        CLC
  $8A71: F3 19     ISB ($19),Y
  $8A73: F0 E4     BEQ $8a59
  $8A75: E4 E0     CPX $e0
  $8A77: E1 E4     SBC ($e4,X)
  $8A79: E4 E6     CPX $e6
  $8A7B: E6 EC     INC $ec
  $8A7D: ED E7 E7  SBC $e7e7
  $8A80: E6 EC     INC $ec
  $8A82: E5 E5     SBC $e5
  $8A84: ED E7 E6  SBC $e6e7
  $8A87: FF FF FF  ISB $ffff,X
  $8A8A: FF E7 E6  ISB $e6e7,X
  $8A8D: FF FF FF  ISB $ffff,X
  $8A90: FF E7 EC  ISB $ece7,X
  $8A93: E5 E8     SBC $e8
  $8A95: E9 E5     SBC #$e5
  $8A97: ED E6 FF  SBC $ffe6
  $8A9A: EA        NOP
  $8A9B: EB FF     SBC #$ff
  $8A9D: E7 E6     ISB $e6
  $8A9F: FF FF FF  ISB $ffff,X
  $8AA2: FF E7 E6  ISB $e6e7,X
  $8AA5: E5 E5     SBC $e5
  $8AA7: E5 E5     SBC $e5
  $8AA9: E7 E6     ISB $e6
  $8AAB: E6 E5     INC $e5
  $8AAD: E5 E7     SBC $e7
  $8AAF: E7 EC     ISB $ec
  $8AB1: EC EC ED  CPX $edec
  $8AB4: ED ED EF  SBC $efed
  $8AB7: EF E2 E3  ISB $e3e2
  $8ABA: EF EF E2  ISB $e2ef
  $8ABD: E2 E0     NOP #$e0
  $8ABF: E1 E4     SBC ($e4,X)
  $8AC1: E4 0A     CPX $0a
  $8AC3: 22        ???
  $8AC4: 62        ???
  $8AC5: 20 0E 22  JSR $220e
  $8AC8: 58        CLI
  $8AC9: D9 68 D8  CMP $d868,Y
  $8ACC: 58        CLI
  $8ACD: D9 58 D9  CMP $d958,Y
  $8AD0: 78        SEI
  $8AD1: D8        CLD
  $8AD2: 88        DEY
  $8AD3: D8        CLD
  $8AD4: 98        TYA
  $8AD5: D8        CLD
  $8AD6: E8        INX
  $8AD7: E6 A8     INC $a8
  $8AD9: D8        CLD
  $8ADA: B8        CLV
  $8ADB: D8        CLD
  $8ADC: C8        INY
  $8ADD: D8        CLD
  $8ADE: D8        CLD
  $8ADF: D8        CLD
  $8AE0: E8        INX
  $8AE1: D8        CLD
  $8AE2: F8        SED
  $8AE3: D8        CLD
  $8AE4: 08        PHP
  $8AE5: D9 E8 D8  CMP $d8e8,Y
  $8AE8: E8        INX
  $8AE9: DA        NOP
  $8AEA: E8        INX
  $8AEB: DA        NOP
  $8AEC: E8        INX
  $8AED: DA        NOP
  $8AEE: E8        INX
  $8AEF: DA        NOP
  $8AF0: 58        CLI
  $8AF1: D8        CLD
  $8AF2: 58        CLI
  $8AF3: D8        CLD
  $8AF4: 58        CLI
  $8AF5: D8        CLD
  $8AF6: 58        CLI
  $8AF7: D8        CLD
  $8AF8: 58        CLI
  $8AF9: D8        CLD
  $8AFA: 58        CLI
  $8AFB: D8        CLD
  $8AFC: 58        CLI
  $8AFD: D8        CLD
  $8AFE: 58        CLI
  $8AFF: D8        CLD
  $8B00: 58        CLI
  $8B01: D9 58 D9  CMP $d958,Y
  $8B04: 28        PLP
  $8B05: D9 58 D9  CMP $d958,Y
  $8B08: 88        DEY
  $8B09: D8        CLD
  $8B0A: 98        TYA
  $8B0B: D8        CLD
  $8B0C: 38        SEC
  $8B0D: D9 78 D8  CMP $d878,Y
  $8B10: B8        CLV
  $8B11: D8        CLD
  $8B12: C8        INY
  $8B13: D8        CLD
  $8B14: D8        CLD
  $8B15: D8        CLD
  $8B16: E8        INX
  $8B17: D8        CLD
  $8B18: F8        SED
  $8B19: D8        CLD
  $8B1A: 48        PHA
  $8B1B: D9 E8 D8  CMP $d8e8,Y
  $8B1E: F8        SED
  $8B1F: D8        CLD
  $8B20: E8        INX
  $8B21: DA        NOP
  $8B22: E8        INX
  $8B23: DA        NOP
  $8B24: E8        INX
  $8B25: DA        NOP
  $8B26: E8        INX
  $8B27: DA        NOP
  $8B28: 58        CLI
  $8B29: D8        CLD
  $8B2A: 58        CLI
  $8B2B: D8        CLD
  $8B2C: 58        CLI
  $8B2D: D8        CLD
  $8B2E: 58        CLI
  $8B2F: D8        CLD
  $8B30: 58        CLI
  $8B31: D8        CLD
  $8B32: 58        CLI
  $8B33: D8        CLD
  $8B34: 58        CLI
  $8B35: D8        CLD
  $8B36: 58        CLI
  $8B37: D8        CLD
  $8B38: 58        CLI
  $8B39: D9 68 D8  CMP $d868,Y
  $8B3C: 58        CLI
  $8B3D: D9 58 D9  CMP $d958,Y
  $8B40: 78        SEI
  $8B41: D8        CLD
  $8B42: 88        DEY
  $8B43: D8        CLD
  $8B44: 98        TYA
  $8B45: D8        CLD
  $8B46: E8        INX
  $8B47: E6 A8     INC $a8
  $8B49: D8        CLD
  $8B4A: B8        CLV
  $8B4B: D8        CLD
  $8B4C: C8        INY
  $8B4D: D8        CLD
  $8B4E: D8        CLD
  $8B4F: D8        CLD
  $8B50: E8        INX
  $8B51: D8        CLD
  $8B52: F8        SED
  $8B53: D8        CLD
  $8B54: 08        PHP
  $8B55: D9 E8 D8  CMP $d8e8,Y
  $8B58: 58        CLI
  $8B59: D8        CLD
  $8B5A: 58        CLI
  $8B5B: D8        CLD
  $8B5C: 58        CLI
  $8B5D: D8        CLD
  $8B5E: 58        CLI
  $8B5F: D8        CLD
  $8B60: 58        CLI
  $8B61: D8        CLD
  $8B62: 58        CLI
  $8B63: D8        CLD
  $8B64: 58        CLI
  $8B65: D8        CLD
  $8B66: 58        CLI
  $8B67: D8        CLD
  $8B68: 58        CLI
  $8B69: D8        CLD
  $8B6A: 58        CLI
  $8B6B: D8        CLD
  $8B6C: 58        CLI
  $8B6D: D8        CLD
  $8B6E: 58        CLI
  $8B6F: D8        CLD
  $8B70: 58        CLI
  $8B71: D9 58 D9  CMP $d958,Y
  $8B74: 28        PLP
  $8B75: D9 58 D9  CMP $d958,Y
  $8B78: 88        DEY
  $8B79: D8        CLD
  $8B7A: 98        TYA
  $8B7B: D8        CLD
  $8B7C: 38        SEC
  $8B7D: D9 78 D8  CMP $d878,Y
  $8B80: B8        CLV
  $8B81: D8        CLD
  $8B82: C8        INY
  $8B83: D8        CLD
  $8B84: D8        CLD
  $8B85: D8        CLD
  $8B86: E8        INX
  $8B87: D8        CLD
  $8B88: F8        SED
  $8B89: D8        CLD
  $8B8A: 48        PHA
  $8B8B: D9 E8 D8  CMP $d8e8,Y
  $8B8E: F8        SED
  $8B8F: D8        CLD
  $8B90: 58        CLI
  $8B91: D8        CLD
  $8B92: 58        CLI
  $8B93: D8        CLD
  $8B94: 58        CLI
  $8B95: D8        CLD
  $8B96: 58        CLI
  $8B97: D8        CLD
  $8B98: 58        CLI
  $8B99: D8        CLD
  $8B9A: 58        CLI
  $8B9B: D8        CLD
  $8B9C: 58        CLI
  $8B9D: D8        CLD
  $8B9E: 58        CLI
  $8B9F: D8        CLD
  $8BA0: 58        CLI
  $8BA1: D8        CLD
  $8BA2: 58        CLI
  $8BA3: D8        CLD
  $8BA4: 58        CLI
  $8BA5: D8        CLD
  $8BA6: 58        CLI
  $8BA7: D8        CLD
  $8BA8: 58        CLI
  $8BA9: D9 68 D9  CMP $d968,Y
  $8BAC: 58        CLI
  $8BAD: D9 58 D9  CMP $d958,Y
  $8BB0: 78        SEI
  $8BB1: D8        CLD
  $8BB2: 88        DEY
  $8BB3: D8        CLD
  $8BB4: 98        TYA
  $8BB5: D8        CLD
  $8BB6: E8        INX
  $8BB7: E6 A8     INC $a8
  $8BB9: D8        CLD
  $8BBA: B8        CLV
  $8BBB: D8        CLD
  $8BBC: C8        INY
  $8BBD: D8        CLD
  $8BBE: D8        CLD
  $8BBF: D8        CLD
  $8BC0: E8        INX
  $8BC1: D8        CLD
  $8BC2: F8        SED
  $8BC3: D8        CLD
  $8BC4: 78        SEI
  $8BC5: D9 E8 D8  CMP $d8e8,Y
  $8BC8: 58        CLI
  $8BC9: D8        CLD
  $8BCA: 58        CLI
  $8BCB: D8        CLD
  $8BCC: 58        CLI
  $8BCD: D8        CLD
  $8BCE: 58        CLI
  $8BCF: D8        CLD
  $8BD0: 58        CLI
  $8BD1: D8        CLD
  $8BD2: 58        CLI
  $8BD3: D8        CLD
  $8BD4: 58        CLI
  $8BD5: D8        CLD
  $8BD6: 58        CLI
  $8BD7: D8        CLD
  $8BD8: 58        CLI
  $8BD9: D8        CLD
  $8BDA: 58        CLI
  $8BDB: D8        CLD
  $8BDC: 58        CLI
  $8BDD: D8        CLD
  $8BDE: 58        CLI
  $8BDF: D8        CLD
  $8BE0: 58        CLI
  $8BE1: D9 58 D9  CMP $d958,Y
  $8BE4: 88        DEY
  $8BE5: D9 58 D9  CMP $d958,Y
  $8BE8: 88        DEY
  $8BE9: D8        CLD
  $8BEA: 98        TYA
  $8BEB: D8        CLD
  $8BEC: A8        TAY
  $8BED: D9 78 D8  CMP $d878,Y
  $8BF0: B8        CLV
  $8BF1: D8        CLD
  $8BF2: C8        INY
  $8BF3: D8        CLD
  $8BF4: D8        CLD
  $8BF5: D8        CLD
  $8BF6: E8        INX
  $8BF7: D8        CLD
  $8BF8: F8        SED
  $8BF9: D8        CLD
  $8BFA: 98        TYA
  $8BFB: D9 E8 D8  CMP $d8e8,Y
  $8BFE: F8        SED
  $8BFF: D8        CLD
  $8C00: 58        CLI
  $8C01: D8        CLD
  $8C02: 58        CLI
  $8C03: D8        CLD
  $8C04: 58        CLI
  $8C05: D8        CLD
  $8C06: 58        CLI
  $8C07: D8        CLD
  $8C08: 58        CLI
  $8C09: D8        CLD
  $8C0A: 58        CLI
  $8C0B: D8        CLD
  $8C0C: 58        CLI
  $8C0D: D8        CLD
  $8C0E: 58        CLI
  $8C0F: D8        CLD
  $8C10: 58        CLI
  $8C11: D8        CLD
  $8C12: 58        CLI
  $8C13: D8        CLD
  $8C14: 58        CLI
  $8C15: D8        CLD
  $8C16: 58        CLI
  $8C17: D8        CLD
  $8C18: 78        SEI
  $8C19: D8        CLD
  $8C1A: C8        INY
  $8C1B: D9 D8 D9  CMP $d9d8,Y
  $8C1E: E8        INX
  $8C1F: D9 F8 D9  CMP $d9f8,Y
  $8C22: 08        PHP
  $8C23: DA        NOP
  $8C24: 18        CLC
  $8C25: DA        NOP
  $8C26: 28        PLP
  $8C27: DA        NOP
  $8C28: 38        SEC
  $8C29: DA        NOP
  $8C2A: 48        PHA
  $8C2B: DA        NOP
  $8C2C: 68        PLA
  $8C2D: DA        NOP
  $8C2E: 78        SEI
  $8C2F: DA        NOP
  $8C30: A8        TAY
  $8C31: DA        NOP
  $8C32: B8        CLV
  $8C33: DA        NOP
  $8C34: C8        INY
  $8C35: DA        NOP
  $8C36: D8        CLD
  $8C37: DA        NOP
  $8C38: E8        INX
  $8C39: DA        NOP
  $8C3A: E8        INX
  $8C3B: DA        NOP
  $8C3C: F8        SED
  $8C3D: DA        NOP
  $8C3E: 08        PHP
  $8C3F: DB 58 D8  DCP $d858,Y
  $8C42: 58        CLI
  $8C43: D8        CLD
  $8C44: 58        CLI
  $8C45: D8        CLD
  $8C46: 58        CLI
  $8C47: D8        CLD
  $8C48: 58        CLI
  $8C49: D8        CLD
  $8C4A: 58        CLI
  $8C4B: D8        CLD
  $8C4C: 58        CLI
  $8C4D: D8        CLD
  $8C4E: 58        CLI
  $8C4F: D8        CLD
  $8C50: 18        CLC
  $8C51: DB 38 DB  DCP $db38,Y
  $8C54: 48        PHA
  $8C55: DB 78 D8  DCP $d878,Y
  $8C58: 58        CLI
  $8C59: DB 68 DB  DCP $db68,Y
  $8C5C: 78        SEI
  $8C5D: DB 88 DB  DCP $db88,Y
  $8C60: 98        TYA
  $8C61: DB A8 DB  DCP $dba8,Y
  $8C64: B8        CLV
  $8C65: DB C8 DB  DCP $dbc8,Y
  $8C68: D8        CLD
  $8C69: DB E8 DB  DCP $dbe8,Y
  $8C6C: F8        SED
  $8C6D: DB 08 DC  DCP $dc08,Y
  $8C70: 18        CLC
  $8C71: DC 28 DC  NOP $dc28,X
  $8C74: E8        INX
  $8C75: DA        NOP
  $8C76: E8        INX
  $8C77: DA        NOP
  $8C78: 58        CLI
  $8C79: D8        CLD
  $8C7A: 58        CLI
  $8C7B: D8        CLD
  $8C7C: 58        CLI
  $8C7D: D8        CLD
  $8C7E: 58        CLI
  $8C7F: D8        CLD
  $8C80: 58        CLI
  $8C81: D8        CLD
  $8C82: 58        CLI
  $8C83: D8        CLD
  $8C84: 58        CLI
  $8C85: D8        CLD
  $8C86: 58        CLI
  $8C87: D8        CLD
  $8C88: 78        SEI
  $8C89: D8        CLD
  $8C8A: C8        INY
  $8C8B: D9 D8 D9  CMP $d9d8,Y
  $8C8E: E8        INX
  $8C8F: D9 F8 D9  CMP $d9f8,Y
  $8C92: 08        PHP
  $8C93: DA        NOP
  $8C94: 18        CLC
  $8C95: DA        NOP
  $8C96: 28        PLP
  $8C97: DA        NOP
  $8C98: 38        SEC
  $8C99: DA        NOP
  $8C9A: 48        PHA
  $8C9B: DA        NOP
  $8C9C: C8        INY
  $8C9D: E1 D8     SBC ($d8,X)
  $8C9F: E1 A8     SBC ($a8,X)
  $8CA1: DA        NOP
  $8CA2: B8        CLV
  $8CA3: DA        NOP
  $8CA4: 48        PHA
  $8CA5: DC 58 DC  NOP $dc58,X
  $8CA8: E8        INX
  $8CA9: DA        NOP
  $8CAA: E8        INX
  $8CAB: DA        NOP
  $8CAC: 68        PLA
  $8CAD: DC 78 DC  NOP $dc78,X
  $8CB0: 58        CLI
  $8CB1: D8        CLD
  $8CB2: 58        CLI
  $8CB3: D8        CLD
  $8CB4: 58        CLI
  $8CB5: D8        CLD
  $8CB6: 58        CLI
  $8CB7: D8        CLD
  $8CB8: 58        CLI
  $8CB9: D8        CLD
  $8CBA: 58        CLI
  $8CBB: D8        CLD
  $8CBC: 58        CLI
  $8CBD: D8        CLD
  $8CBE: 58        CLI
  $8CBF: D8        CLD
  $8CC0: 18        CLC
  $8CC1: DB 38 DB  DCP $db38,Y
  $8CC4: 48        PHA
  $8CC5: DB 78 D8  DCP $d878,Y
  $8CC8: 58        CLI
  $8CC9: DB 68 DB  DCP $db68,Y
  $8CCC: 78        SEI
  $8CCD: DB 88 DB  DCP $db88,Y
  $8CD0: E8        INX
  $8CD1: E1 F8     SBC ($f8,X)
  $8CD3: E1 B8     SBC ($b8,X)
  $8CD5: DB C8 DB  DCP $dbc8,Y
  $8CD8: 08        PHP
  $8CD9: E2 18     NOP #$18
  $8CDB: E2 F8     NOP #$f8
  $8CDD: DB 08 DC  DCP $dc08,Y
  $8CE0: 28        PLP
  $8CE1: E2 38     NOP #$38
  $8CE3: E2 E8     NOP #$e8
  $8CE5: DA        NOP
  $8CE6: E8        INX
  $8CE7: DA        NOP
  $8CE8: 58        CLI
  $8CE9: D8        CLD
  $8CEA: 58        CLI
  $8CEB: D8        CLD
  $8CEC: 58        CLI
  $8CED: D8        CLD
  $8CEE: 58        CLI
  $8CEF: D8        CLD
  $8CF0: 58        CLI
  $8CF1: D8        CLD
  $8CF2: 58        CLI
  $8CF3: D8        CLD
  $8CF4: 58        CLI
  $8CF5: D8        CLD
  $8CF6: 58        CLI
  $8CF7: D8        CLD
  $8CF8: 58        CLI
  $8CF9: D9 B8 DC  CMP $dcb8,Y
  $8CFC: 58        CLI
  $8CFD: D9 58 D9  CMP $d958,Y
  $8D00: 78        SEI
  $8D01: D8        CLD
  $8D02: 78        SEI
  $8D03: D8        CLD
  $8D04: 78        SEI
  $8D05: D8        CLD
  $8D06: 78        SEI
  $8D07: D8        CLD
  $8D08: F8        SED
  $8D09: D8        CLD
  $8D0A: A8        TAY
  $8D0B: D8        CLD
  $8D0C: E8        INX
  $8D0D: D8        CLD
  $8D0E: F8        SED
  $8D0F: D8        CLD
  $8D10: A8        TAY
  $8D11: D8        CLD
  $8D12: C8        INY
  $8D13: DC F8 D8  NOP $d8f8,X
  $8D16: A8        TAY
  $8D17: D8        CLD
  $8D18: E8        INX
  $8D19: DA        NOP
  $8D1A: E8        INX
  $8D1B: DA        NOP
  $8D1C: E8        INX
  $8D1D: DA        NOP
  $8D1E: E8        INX
  $8D1F: DA        NOP
  $8D20: 58        CLI
  $8D21: D8        CLD
  $8D22: 58        CLI
  $8D23: D8        CLD
  $8D24: 58        CLI
  $8D25: D8        CLD
  $8D26: 58        CLI
  $8D27: D8        CLD
  $8D28: 58        CLI
  $8D29: D8        CLD
  $8D2A: 58        CLI
  $8D2B: D8        CLD
  $8D2C: 58        CLI
  $8D2D: D8        CLD
  $8D2E: 58        CLI
  $8D2F: D8        CLD
  $8D30: 88        DEY
  $8D31: DC 58 D9  NOP $d958,X
  $8D34: B8        CLV
  $8D35: D9 58 D9  CMP $d958,Y
  $8D38: 98        TYA
  $8D39: DC 78 D8  NOP $d878,X
  $8D3C: 78        SEI
  $8D3D: D8        CLD
  $8D3E: 78        SEI
  $8D3F: D8        CLD
  $8D40: E8        INX
  $8D41: D8        CLD
  $8D42: F8        SED
  $8D43: D8        CLD
  $8D44: A8        TAY
  $8D45: D8        CLD
  $8D46: E8        INX
  $8D47: D8        CLD
  $8D48: F8        SED
  $8D49: D8        CLD
  $8D4A: A8        TAY
  $8D4B: D8        CLD
  $8D4C: A8        TAY
  $8D4D: DC F8 D8  NOP $d8f8,X
  $8D50: E8        INX
  $8D51: DA        NOP
  $8D52: E8        INX
  $8D53: DA        NOP
  $8D54: E8        INX
  $8D55: DA        NOP
  $8D56: E8        INX
  $8D57: DA        NOP
  $8D58: 58        CLI
  $8D59: D8        CLD
  $8D5A: 58        CLI
  $8D5B: D8        CLD
  $8D5C: 58        CLI
  $8D5D: D8        CLD
  $8D5E: 58        CLI
  $8D5F: D8        CLD
  $8D60: 58        CLI
  $8D61: D8        CLD
  $8D62: 58        CLI
  $8D63: D8        CLD
  $8D64: 58        CLI
  $8D65: D8        CLD
  $8D66: 58        CLI
  $8D67: D8        CLD
  $8D68: 58        CLI
  $8D69: D9 B8 DC  CMP $dcb8,Y
  $8D6C: 58        CLI
  $8D6D: D9 58 D9  CMP $d958,Y
  $8D70: 78        SEI
  $8D71: D8        CLD
  $8D72: 78        SEI
  $8D73: D8        CLD
  $8D74: 78        SEI
  $8D75: D8        CLD
  $8D76: 78        SEI
  $8D77: D8        CLD
  $8D78: F8        SED
  $8D79: D8        CLD
  $8D7A: A8        TAY
  $8D7B: D8        CLD
  $8D7C: E8        INX
  $8D7D: D8        CLD
  $8D7E: F8        SED
  $8D7F: D8        CLD
  $8D80: A8        TAY
  $8D81: D8        CLD
  $8D82: C8        INY
  $8D83: DC F8 D8  NOP $d8f8,X
  $8D86: A8        TAY
  $8D87: D8        CLD
  $8D88: 58        CLI
  $8D89: D8        CLD
  $8D8A: 58        CLI
  $8D8B: D8        CLD
  $8D8C: 58        CLI
  $8D8D: D8        CLD
  $8D8E: 58        CLI
  $8D8F: D8        CLD
  $8D90: 58        CLI
  $8D91: D8        CLD
  $8D92: 58        CLI
  $8D93: D8        CLD
  $8D94: 58        CLI
  $8D95: D8        CLD
  $8D96: 58        CLI
  $8D97: D8        CLD
  $8D98: 58        CLI
  $8D99: D8        CLD
  $8D9A: 58        CLI
  $8D9B: D8        CLD
  $8D9C: 58        CLI
  $8D9D: D8        CLD
  $8D9E: 58        CLI
  $8D9F: D8        CLD
  $8DA0: 88        DEY
  $8DA1: DC 58 D9  NOP $d958,X
  $8DA4: B8        CLV
  $8DA5: D9 58 D9  CMP $d958,Y
  $8DA8: 98        TYA
  $8DA9: DC 78 D8  NOP $d878,X
  $8DAC: 78        SEI
  $8DAD: D8        CLD
  $8DAE: 78        SEI
  $8DAF: D8        CLD
  $8DB0: E8        INX
  $8DB1: D8        CLD
  $8DB2: F8        SED
  $8DB3: D8        CLD
  $8DB4: A8        TAY
  $8DB5: D8        CLD
  $8DB6: E8        INX
  $8DB7: D8        CLD
  $8DB8: F8        SED
  $8DB9: D8        CLD
  $8DBA: A8        TAY
  $8DBB: D8        CLD
  $8DBC: A8        TAY
  $8DBD: DC F8 D8  NOP $d8f8,X
  $8DC0: 58        CLI
  $8DC1: D8        CLD
  $8DC2: 58        CLI
  $8DC3: D8        CLD
  $8DC4: 58        CLI
  $8DC5: D8        CLD
  $8DC6: 58        CLI
  $8DC7: D8        CLD
  $8DC8: 58        CLI
  $8DC9: D8        CLD
  $8DCA: 58        CLI
  $8DCB: D8        CLD
  $8DCC: 58        CLI
  $8DCD: D8        CLD
  $8DCE: 58        CLI
  $8DCF: D8        CLD
  $8DD0: 58        CLI
  $8DD1: D8        CLD
  $8DD2: 58        CLI
  $8DD3: D8        CLD
  $8DD4: 58        CLI
  $8DD5: D8        CLD
  $8DD6: 58        CLI
  $8DD7: D8        CLD
  $8DD8: E8        INX
  $8DD9: DC F8 DC  NOP $dcf8,X
  $8DDC: 58        CLI
  $8DDD: D9 58 D9  CMP $d958,Y
  $8DE0: 78        SEI
  $8DE1: D8        CLD
  $8DE2: 78        SEI
  $8DE3: D8        CLD
  $8DE4: 78        SEI
  $8DE5: D8        CLD
  $8DE6: 78        SEI
  $8DE7: D8        CLD
  $8DE8: F8        SED
  $8DE9: D8        CLD
  $8DEA: A8        TAY
  $8DEB: D8        CLD
  $8DEC: E8        INX
  $8DED: D8        CLD
  $8DEE: F8        SED
  $8DEF: D8        CLD
  $8DF0: A8        TAY
  $8DF1: D8        CLD
  $8DF2: 18        CLC
  $8DF3: DD F8 D8  CMP $d8f8,X
  $8DF6: A8        TAY
  $8DF7: D8        CLD
  $8DF8: 58        CLI
  $8DF9: D8        CLD
  $8DFA: 58        CLI
  $8DFB: D8        CLD
  $8DFC: 58        CLI
  $8DFD: D8        CLD
  $8DFE: 58        CLI
  $8DFF: D8        CLD
  $8E00: 58        CLI
  $8E01: D8        CLD
  $8E02: 58        CLI
  $8E03: D8        CLD
  $8E04: 58        CLI
  $8E05: D8        CLD
  $8E06: 58        CLI
  $8E07: D8        CLD
  $8E08: 58        CLI
  $8E09: D8        CLD
  $8E0A: 58        CLI
  $8E0B: D8        CLD
  $8E0C: 58        CLI
  $8E0D: D8        CLD
  $8E0E: 58        CLI
  $8E0F: D8        CLD
  $8E10: 28        PLP
  $8E11: DB 58 D9  DCP $d958,Y
  $8E14: 88        DEY
  $8E15: DA        NOP
  $8E16: 98        TYA
  $8E17: DA        NOP
  $8E18: D8        CLD
  $8E19: DC 78 D8  NOP $d878,X
  $8E1C: 78        SEI
  $8E1D: D8        CLD
  $8E1E: 78        SEI
  $8E1F: D8        CLD
  $8E20: E8        INX
  $8E21: D8        CLD
  $8E22: F8        SED
  $8E23: D8        CLD
  $8E24: A8        TAY
  $8E25: D8        CLD
  $8E26: E8        INX
  $8E27: D8        CLD
  $8E28: F8        SED
  $8E29: D8        CLD
  $8E2A: A8        TAY
  $8E2B: D8        CLD
  $8E2C: 08        PHP
  $8E2D: DD F8 D8  CMP $d8f8,X
  $8E30: 58        CLI
  $8E31: D8        CLD
  $8E32: 58        CLI
  $8E33: D8        CLD
  $8E34: 58        CLI
  $8E35: D8        CLD
  $8E36: 58        CLI
  $8E37: D8        CLD
  $8E38: 58        CLI
  $8E39: D8        CLD
  $8E3A: 58        CLI
  $8E3B: D8        CLD
  $8E3C: 58        CLI
  $8E3D: D8        CLD
  $8E3E: 58        CLI
  $8E3F: D8        CLD
  $8E40: 58        CLI
  $8E41: D8        CLD
  $8E42: 58        CLI
  $8E43: D8        CLD
  $8E44: 58        CLI
  $8E45: D8        CLD
  $8E46: 58        CLI
  $8E47: D8        CLD
  $8E48: 78        SEI
  $8E49: D8        CLD
  $8E4A: 78        SEI
  $8E4B: D8        CLD
  $8E4C: 78        SEI
  $8E4D: D8        CLD
  $8E4E: 78        SEI
  $8E4F: D8        CLD
  $8E50: F8        SED
  $8E51: E2 08     NOP #$08
  $8E53: E3 18     ISB ($18,X)
  $8E55: E3 28     ISB ($28,X)
  $8E57: E3 E8     ISB ($e8,X)
  $8E59: E3 F8     ISB ($f8,X)
  $8E5B: E3 58     ISB ($58,X)
  $8E5D: E3 68     ISB ($68,X)
  $8E5F: E3 08     ISB ($08,X)
  $8E61: E4 18     CPX $18
  $8E63: E4 88     CPX $88
  $8E65: E3 98     ISB ($98,X)
  $8E67: E3 18     ISB ($18,X)
  $8E69: DC 28 DC  NOP $dc28,X
  $8E6C: E8        INX
  $8E6D: DA        NOP
  $8E6E: E8        INX
  $8E6F: DA        NOP
  $8E70: 58        CLI
  $8E71: D8        CLD
  $8E72: 58        CLI
  $8E73: D8        CLD
  $8E74: 58        CLI
  $8E75: D8        CLD
  $8E76: 58        CLI
  $8E77: D8        CLD
  $8E78: 58        CLI
  $8E79: D8        CLD
  $8E7A: 58        CLI
  $8E7B: D8        CLD
  $8E7C: 58        CLI
  $8E7D: D8        CLD
  $8E7E: 58        CLI
  $8E7F: D8        CLD
  $8E80: 78        SEI
  $8E81: D8        CLD
  $8E82: 78        SEI
  $8E83: D8        CLD
  $8E84: 78        SEI
  $8E85: D8        CLD
  $8E86: 78        SEI
  $8E87: D8        CLD
  $8E88: 48        PHA
  $8E89: E2 58     NOP #$58
  $8E8B: E2 68     NOP #$68
  $8E8D: E2 78     NOP #$78
  $8E8F: E2 88     NOP #$88
  $8E91: E2 98     NOP #$98
  $8E93: E2 A8     NOP #$a8
  $8E95: E3 B8     ISB ($b8,X)
  $8E97: E3 C8     ISB ($c8,X)
  $8E99: E2 D8     NOP #$d8
  $8E9B: E2 C8     NOP #$c8
  $8E9D: E3 D8     ISB ($d8,X)
  $8E9F: E3 E8     ISB ($e8,X)
  $8EA1: DA        NOP
  $8EA2: E8        INX
  $8EA3: DA        NOP
  $8EA4: F8        SED
  $8EA5: DA        NOP
  $8EA6: 08        PHP
  $8EA7: DB 58 D8  DCP $d858,Y
  $8EAA: 58        CLI
  $8EAB: D8        CLD
  $8EAC: 58        CLI
  $8EAD: D8        CLD
  $8EAE: 58        CLI
  $8EAF: D8        CLD
  $8EB0: 58        CLI
  $8EB1: D8        CLD
  $8EB2: 58        CLI
  $8EB3: D8        CLD
  $8EB4: 58        CLI
  $8EB5: D8        CLD
  $8EB6: 58        CLI
  $8EB7: D8        CLD
  $8EB8: 78        SEI
  $8EB9: D8        CLD
  $8EBA: 78        SEI
  $8EBB: D8        CLD
  $8EBC: 78        SEI
  $8EBD: D8        CLD
  $8EBE: 78        SEI
  $8EBF: D8        CLD
  $8EC0: F8        SED
  $8EC1: E2 08     NOP #$08
  $8EC3: E3 18     ISB ($18,X)
  $8EC5: E3 28     ISB ($28,X)
  $8EC7: E3 38     ISB ($38,X)
  $8EC9: E3 48     ISB ($48,X)
  $8ECB: E3 58     ISB ($58,X)
  $8ECD: E3 68     ISB ($68,X)
  $8ECF: E3 08     ISB ($08,X)
  $8ED1: E2 78     NOP #$78
  $8ED3: E3 88     ISB ($88,X)
  $8ED5: E3 98     ISB ($98,X)
  $8ED7: E3 28     ISB ($28,X)
  $8ED9: E2 38     NOP #$38
  $8EDB: E2 E8     NOP #$e8
  $8EDD: DA        NOP
  $8EDE: E8        INX
  $8EDF: DA        NOP
  $8EE0: 58        CLI
  $8EE1: D8        CLD
  $8EE2: 58        CLI
  $8EE3: D8        CLD
  $8EE4: 58        CLI
  $8EE5: D8        CLD
  $8EE6: 58        CLI
  $8EE7: D8        CLD
  $8EE8: 58        CLI
  $8EE9: D8        CLD
  $8EEA: 58        CLI
  $8EEB: D8        CLD
  $8EEC: 58        CLI
  $8EED: D8        CLD
  $8EEE: 58        CLI
  $8EEF: D8        CLD
  $8EF0: 78        SEI
  $8EF1: D8        CLD
  $8EF2: 78        SEI
  $8EF3: D8        CLD
  $8EF4: 78        SEI
  $8EF5: D8        CLD
  $8EF6: 78        SEI
  $8EF7: D8        CLD
  $8EF8: 48        PHA
  $8EF9: E2 58     NOP #$58
  $8EFB: E2 68     NOP #$68
  $8EFD: E2 78     NOP #$78
  $8EFF: E2 88     NOP #$88
  $8F01: E2 98     NOP #$98
  $8F03: E2 A8     NOP #$a8
  $8F05: E2 B8     NOP #$b8
  $8F07: E2 C8     NOP #$c8
  $8F09: E2 D8     NOP #$d8
  $8F0B: E2 E8     NOP #$e8
  $8F0D: E2 58     NOP #$58
  $8F0F: DC E8 DA  NOP $dae8,X
  $8F12: E8        INX
  $8F13: DA        NOP
  $8F14: 68        PLA
  $8F15: DC 78 DC  NOP $dc78,X
  $8F18: 58        CLI
  $8F19: D8        CLD
  $8F1A: 58        CLI
  $8F1B: D8        CLD
  $8F1C: 58        CLI
  $8F1D: D8        CLD
  $8F1E: 58        CLI
  $8F1F: D8        CLD
  $8F20: 58        CLI
  $8F21: D8        CLD
  $8F22: 58        CLI
  $8F23: D8        CLD
  $8F24: 58        CLI
  $8F25: D8        CLD
  $8F26: 58        CLI
  $8F27: D8        CLD
  $8F28: 58        CLI
  $8F29: D9 58 D9  CMP $d958,Y
  $8F2C: 58        CLI
  $8F2D: D9 58 D9  CMP $d958,Y
  $8F30: C8        INY
  $8F31: EC E8 EC  CPX $ece8
  $8F34: A8        TAY
  $8F35: E8        INX
  $8F36: D8        CLD
  $8F37: EC C8 EC  CPX $ecc8
  $8F3A: F8        SED
  $8F3B: EC 08 ED  CPX $ed08
  $8F3E: D8        CLD
  $8F3F: EC C8 EC  CPX $ecc8
  $8F42: 18        CLC
  $8F43: ED 28 ED  SBC $ed28
  $8F46: 38        SEC
  $8F47: ED 48 ED  SBC $ed48
  $8F4A: 58        CLI
  $8F4B: ED 68 ED  SBC $ed68
  $8F4E: 78        SEI
  $8F4F: ED 88 ED  SBC $ed88
  $8F52: 98        TYA
  $8F53: ED A8 ED  SBC $eda8
  $8F56: B8        CLV
  $8F57: ED 58 D9  SBC $d958
  $8F5A: 58        CLI
  $8F5B: D9 58 D9  CMP $d958,Y
  $8F5E: 58        CLI
  $8F5F: D9 58 D9  CMP $d958,Y
  $8F62: 58        CLI
  $8F63: D9 58 D9  CMP $d958,Y
  $8F66: 58        CLI
  $8F67: D9 C8 ED  CMP $edc8,Y
  $8F6A: A8        TAY
  $8F6B: E8        INX
  $8F6C: A8        TAY
  $8F6D: E8        INX
  $8F6E: D8        CLD
  $8F6F: ED E8 ED  SBC $ede8
  $8F72: F8        SED
  $8F73: ED 08 EE  SBC $ee08
  $8F76: 18        CLC
  $8F77: EE 28 EE  INC $ee28
  $8F7A: 38        SEC
  $8F7B: EE 48 EE  INC $ee48
  $8F7E: 58        CLI
  $8F7F: EE 68 EE  INC $ee68
  $8F82: 78        SEI
  $8F83: EE 88 EE  INC $ee88
  $8F86: 98        TYA
  $8F87: EE 68 EE  INC $ee68
  $8F8A: A8        TAY
  $8F8B: EE B8 EE  INC $eeb8
  $8F8E: C8        INY
  $8F8F: EE 58 D9  INC $d958
  $8F92: 58        CLI
  $8F93: D9 58 D9  CMP $d958,Y
  $8F96: 58        CLI
  $8F97: D9 D8 EE  CMP $eed8,Y
  $8F9A: E8        INX
  $8F9B: EE F8 EE  INC $eef8
  $8F9E: D8        CLD
  $8F9F: EE 08 EF  INC $ef08
  $8FA2: 18        CLC
  $8FA3: EF 28 EF  ISB $ef28
  $8FA6: 38        SEC
  $8FA7: EF 08 EF  ISB $ef08
  $8FAA: 48        PHA
  $8FAB: EF 58 EF  ISB $ef58
  $8FAE: 38        SEC
  $8FAF: EF 68 EF  ISB $ef68
  $8FB2: 78        SEI
  $8FB3: EF 88 EF  ISB $ef88
  $8FB6: 98        TYA
  $8FB7: EF A8 EF  ISB $efa8
  $8FBA: B8        CLV
  $8FBB: EF C8 EF  ISB $efc8
  $8FBE: D8        CLD
  $8FBF: EF E8 EF  ISB $efe8
  $8FC2: F8        SED
  $8FC3: EF 08 F0  ISB $f008
  $8FC6: 18        CLC
  $8FC7: F0 48     BEQ $9011
  $8FC9: F0 28     BEQ $8ff3
  $8FCB: F0 38     BEQ $9005
  $8FCD: F0 18     BEQ $8fe7
  $8FCF: F0 58     BEQ $9029
  $8FD1: D9 58 D9  CMP $d958,Y
  $8FD4: 28        PLP
  $8FD5: E6 38     INC $38
  $8FD7: E6 58     INC $58
  $8FD9: D9 58 D9  CMP $d958,Y
  $8FDC: 48        PHA
  $8FDD: E6 58     INC $58
  $8FDF: E6 58     INC $58
  $8FE1: D9 58 D9  CMP $d958,Y
  $8FE4: 58        CLI
  $8FE5: D9 58 D9  CMP $d958,Y
  $8FE8: 68        PLA
  $8FE9: E6 B8     INC $b8
  $8FEB: DC 58 D9  NOP $d958,X
  $8FEE: 58        CLI
  $8FEF: D9 78 E6  CMP $e678,Y
  $8FF2: 58        CLI
  $8FF3: D9 58 D9  CMP $d958,Y
  $8FF6: 58        CLI
  $8FF7: D9 58 DD  CMP $dd58,Y
  $8FFA: 68        PLA
  $8FFB: E6 58     INC $58
  $8FFD: D9 58 D9  CMP $d958,Y
  $9000: 58        CLI
  $9001: DF 78 E6  DCP $e678,X
  $9004: 58        CLI
  $9005: D9 58 D9  CMP $d958,Y
  $9008: 68        PLA
  $9009: DD 78 DD  CMP $dd78,X
  $900C: 58        CLI
  $900D: D9 58 D9  CMP $d958,Y
  $9010: 88        DEY
  $9011: DD 98 DD  CMP $dd98,X
  $9014: 58        CLI
  $9015: D9 58 D9  CMP $d958,Y
  $9018: 58        CLI
  $9019: D9 58 D9  CMP $d958,Y
  $901C: 58        CLI
  $901D: D9 68 D8  CMP $d868,Y
  $9020: 58        CLI
  $9021: D9 58 D9  CMP $d958,Y
  $9024: 58        CLI
  $9025: D9 A8 DD  CMP $dda8,Y
  $9028: 58        CLI
  $9029: D9 58 D9  CMP $d958,Y
  $902C: 58        CLI
  $902D: D9 C8 DD  CMP $ddc8,Y
  $9030: D8        CLD
  $9031: DD 58 D9  CMP $d958,X
  $9034: A8        TAY
  $9035: DD F8 DD  CMP $ddf8,X
  $9038: 08        PHP
  $9039: DE 58 D9  DEC $d958,X
  $903C: C8        INY
  $903D: DD E8 DD  CMP $dde8,X
  $9040: 18        CLC
  $9041: DE F8 E4  DEC $e4f8,X
  $9044: 08        PHP
  $9045: E5 58     SBC $58
  $9047: D9 B8 DD  CMP $ddb8,Y
  $904A: 28        PLP
  $904B: DE 28 DE  DEC $de28,X
  $904E: 28        PLP
  $904F: DE 38 DE  DEC $de38,X
  $9052: A8        TAY
  $9053: D8        CLD
  $9054: E8        INX
  $9055: D8        CLD
  $9056: F8        SED
  $9057: D8        CLD
  $9058: 38        SEC
  $9059: DE 48 DE  DEC $de48,X
  $905C: F8        SED
  $905D: D8        CLD
  $905E: A8        TAY
  $905F: D8        CLD
  $9060: 58        CLI
  $9061: DE 68 DE  DEC $de68,X
  $9064: 78        SEI
  $9065: DE 78 DE  DEC $de78,X
  $9068: 88        DEY
  $9069: DE 98 DE  DEC $de98,X
  $906C: 58        CLI
  $906D: D8        CLD
  $906E: 58        CLI
  $906F: D8        CLD
  $9070: A8        TAY
  $9071: DE 58 D8  DEC $d858,X
  $9074: 58        CLI
  $9075: D8        CLD
  $9076: 58        CLI
  $9077: D8        CLD
  $9078: 28        PLP
  $9079: D9 E8 E4  CMP $e4e8,Y
  $907C: E8        INX
  $907D: E4 C8     CPX $c8
  $907F: DE B8 DE  DEC $deb8,X
  $9082: 28        PLP
  $9083: DE 28 DE  DEC $de28,X
  $9086: D8        CLD
  $9087: DE F8 D8  DEC $d8f8,X
  $908A: A8        TAY
  $908B: D8        CLD
  $908C: E8        INX
  $908D: D8        CLD
  $908E: E8        INX
  $908F: DE A8 D8  DEC $d8a8,X
  $9092: E8        INX
  $9093: D8        CLD
  $9094: F8        SED
  $9095: DE E8 DE  DEC $dee8,X
  $9098: 78        SEI
  $9099: DE 78 DE  DEC $de78,X
  $909C: 08        PHP
  $909D: DF 18 DF  DCP $df18,X
  $90A0: 58        CLI
  $90A1: D8        CLD
  $90A2: 58        CLI
  $90A3: D8        CLD
  $90A4: 28        PLP
  $90A5: DF 38 DF  DCP $df38,X
  $90A8: 58        CLI
  $90A9: D8        CLD
  $90AA: 58        CLI
  $90AB: D8        CLD
  $90AC: 58        CLI
  $90AD: D8        CLD
  $90AE: 48        PHA
  $90AF: DF 18 E1  DCP $e118,X
  $90B2: 58        CLI
  $90B3: D9 58 D9  CMP $d958,Y
  $90B6: 58        CLI
  $90B7: D9 28 E1  CMP $e128,Y
  $90BA: 58        CLI
  $90BB: D9 58 D9  CMP $d958,Y
  $90BE: 58        CLI
  $90BF: D9 38 E1  CMP $e138,Y
  $90C2: 58        CLI
  $90C3: D9 48 E1  CMP $e148,Y
  $90C6: 58        CLI
  $90C7: E1 B8     SBC ($b8,X)
  $90C9: DD 28 DE  CMP $de28,X
  $90CC: 78        SEI
  $90CD: E1 88     SBC ($88,X)
  $90CF: E1 38     SBC ($38,X)
  $90D1: DE A8 D8  DEC $d8a8,X
  $90D4: E8        INX
  $90D5: D8        CLD
  $90D6: F8        SED
  $90D7: D8        CLD
  $90D8: 38        SEC
  $90D9: DE E8 D8  DEC $d8e8,X
  $90DC: F8        SED
  $90DD: D8        CLD
  $90DE: A8        TAY
  $90DF: D8        CLD
  $90E0: 58        CLI
  $90E1: DE 58 D8  DEC $d858,X
  $90E4: 58        CLI
  $90E5: D8        CLD
  $90E6: 58        CLI
  $90E7: D8        CLD
  $90E8: 58        CLI
  $90E9: D9 58 D9  CMP $d958,Y
  $90EC: 58        CLI
  $90ED: D9 B8 E1  CMP $e1b8,Y
  $90F0: 98        TYA
  $90F1: E1 58     SBC ($58,X)
  $90F3: D9 58 D9  CMP $d958,Y
  $90F6: A8        TAY
  $90F7: E1 58     SBC ($58,X)
  $90F9: D9 58 D9  CMP $d958,Y
  $90FC: 58        CLI
  $90FD: D9 68 E1  CMP $e168,Y
  $9100: 28        PLP
  $9101: DE 28 DE  DEC $de28,X
  $9104: 28        PLP
  $9105: DE D8 DE  DEC $ded8,X
  $9108: F8        SED
  $9109: D8        CLD
  $910A: A8        TAY
  $910B: D8        CLD
  $910C: E8        INX
  $910D: D8        CLD
  $910E: E8        INX
  $910F: DE A8 D8  DEC $d8a8,X
  $9112: E8        INX
  $9113: D8        CLD
  $9114: F8        SED
  $9115: D8        CLD
  $9116: E8        INX
  $9117: DE 58 D8  DEC $d858,X
  $911A: 58        CLI
  $911B: D8        CLD
  $911C: 58        CLI
  $911D: D8        CLD
  $911E: 18        CLC
  $911F: DF 68 DF  DCP $df68,X
  $9122: 68        PLA
  $9123: DF 68 DF  DCP $df68,X
  $9126: 68        PLA
  $9127: DF 68 DF  DCP $df68,X
  $912A: 78        SEI
  $912B: DF 88 DF  DCP $df88,X
  $912E: 68        PLA
  $912F: DF 68 DF  DCP $df68,X
  $9132: 98        TYA
  $9133: DF A8 DF  DCP $dfa8,X
  $9136: 68        PLA
  $9137: DF 68 DF  DCP $df68,X
  $913A: B8        CLV
  $913B: DF C8 DF  DCP $dfc8,X
  $913E: 68        PLA
  $913F: DF 68 DF  DCP $df68,X
  $9142: D8        CLD
  $9143: DF E8 DF  DCP $dfe8,X
  $9146: 68        PLA
  $9147: DF 68 DF  DCP $df68,X
  $914A: F8        SED
  $914B: DF 08 E0  DCP $e008,X
  $914E: 68        PLA
  $914F: DF 78 F0  DCP $f078,X
  $9152: 68        PLA
  $9153: DF 68 DF  DCP $df68,X
  $9156: 68        PLA
  $9157: DF 68 DF  DCP $df68,X
  $915A: 68        PLA
  $915B: DF 68 DF  DCP $df68,X
  $915E: 68        PLA
  $915F: DF 68 DF  DCP $df68,X
  $9162: 18        CLC
  $9163: E0 28     CPX #$28
  $9165: E0 68     CPX #$68
  $9167: DF 68 DF  DCP $df68,X
  $916A: 38        SEC
  $916B: E0 48     CPX #$48
  $916D: E0 68     CPX #$68
  $916F: DF 68 DF  DCP $df68,X
  $9172: 58        CLI
  $9173: E0 68     CPX #$68
  $9175: E0 68     CPX #$68
  $9177: DF 68 DF  DCP $df68,X
  $917A: 78        SEI
  $917B: E0 88     CPX #$88
  $917D: E0 68     CPX #$68
  $917F: DF 68 DF  DCP $df68,X
  $9182: 98        TYA
  $9183: E0 08     CPX #$08
  $9185: E0 68     CPX #$68
  $9187: DF 78 F0  DCP $f078,X
  $918A: 68        PLA
  $918B: DF 68 DF  DCP $df68,X
  $918E: 68        PLA
  $918F: DF 28 E4  DCP $e428,X
  $9192: 28        PLP
  $9193: E4 28     CPX $28
  $9195: E4 28     CPX $28
  $9197: E4 28     CPX $28
  $9199: E4 28     CPX $28
  $919B: E4 28     CPX $28
  $919D: E4 28     CPX $28
  $919F: E4 28     CPX $28
  $91A1: E4 28     CPX $28
  $91A3: E4 28     CPX $28
  $91A5: E4 28     CPX $28
  $91A7: E4 28     CPX $28
  $91A9: E4 28     CPX $28
  $91AB: E4 28     CPX $28
  $91AD: E4 28     CPX $28
  $91AF: E4 28     CPX $28
  $91B1: E4 28     CPX $28
  $91B3: E4 28     CPX $28
  $91B5: E4 28     CPX $28
  $91B7: E4 28     CPX $28
  $91B9: E4 38     CPX $38
  $91BB: E4 48     CPX $48
  $91BD: E4 28     CPX $28
  $91BF: E4 28     CPX $28
  $91C1: E4 28     CPX $28
  $91C3: E4 28     CPX $28
  $91C5: E4 28     CPX $28
  $91C7: E4 78     CPX $78
  $91C9: D8        CLD
  $91CA: 78        SEI
  $91CB: D8        CLD
  $91CC: 78        SEI
  $91CD: D8        CLD
  $91CE: 78        SEI
  $91CF: D8        CLD
  $91D0: 58        CLI
  $91D1: E4 68     CPX $68
  $91D3: E4 78     CPX $78
  $91D5: E4 88     CPX $88
  $91D7: E4 98     CPX $98
  $91D9: E4 98     CPX $98
  $91DB: DB A8 E4  DCP $e4a8,Y
  $91DE: B8        CLV
  $91DF: DB B8 E4  DCP $e4b8,Y
  $91E2: C8        INY
  $91E3: E4 D8     CPX $d8
  $91E5: E4 F8     CPX $f8
  $91E7: DB E8 DA  DCP $dae8,Y
  $91EA: E8        INX
  $91EB: DA        NOP
  $91EC: E8        INX
  $91ED: DA        NOP
  $91EE: E8        INX
  $91EF: DA        NOP
  $91F0: 58        CLI
  $91F1: D8        CLD
  $91F2: 58        CLI
  $91F3: D8        CLD
  $91F4: 58        CLI
  $91F5: D8        CLD
  $91F6: 58        CLI
  $91F7: D8        CLD
  $91F8: 58        CLI
  $91F9: D8        CLD
  $91FA: 58        CLI
  $91FB: D8        CLD
  $91FC: 58        CLI
  $91FD: D8        CLD
  $91FE: 58        CLI
  $91FF: D8        CLD
  $9200: 58        CLI
  $9201: D9 58 D9  CMP $d958,Y
  $9204: 58        CLI
  $9205: D9 68 D8  CMP $d868,Y
  $9208: 98        TYA
  $9209: E1 58     SBC ($58,X)
  $920B: D9 58 D9  CMP $d958,Y
  $920E: 58        CLI
  $920F: D9 58 D9  CMP $d958,Y
  $9212: 58        CLI
  $9213: D9 58 D9  CMP $d958,Y
  $9216: 58        CLI
  $9217: D9 58 D9  CMP $d958,Y
  $921A: 58        CLI
  $921B: D9 98 E1  CMP $e198,Y
  $921E: 58        CLI
  $921F: D9 58 D9  CMP $d958,Y
  $9222: 28        PLP
  $9223: D9 58 D9  CMP $d958,Y
  $9226: 58        CLI
  $9227: D9 78 D8  CMP $d878,Y
  $922A: 38        SEC
  $922B: DC 78 D8  NOP $d878,X
  $922E: 78        SEI
  $922F: D8        CLD
  $9230: B8        CLV
  $9231: E6 B8     INC $b8
  $9233: E6 B8     INC $b8
  $9235: E6 B8     INC $b8
  $9237: E6 58     INC $58
  $9239: D9 58 D9  CMP $d958,Y
  $923C: 58        CLI
  $923D: D9 58 D9  CMP $d958,Y
  $9240: 78        SEI
  $9241: D8        CLD
  $9242: 98        TYA
  $9243: EB 08     SBC #$08
  $9245: EB 78     SBC #$78
  $9247: D8        CLD
  $9248: F8        SED
  $9249: D8        CLD
  $924A: 18        CLC
  $924B: EB 28     SBC #$28
  $924D: EB F8     SBC #$f8
  $924F: D8        CLD
  $9250: A8        TAY
  $9251: D8        CLD
  $9252: 38        SEC
  $9253: EB 48     SBC #$48
  $9255: EB A8     SBC #$a8
  $9257: D8        CLD
  $9258: E8        INX
  $9259: DA        NOP
  $925A: 58        CLI
  $925B: EB 68     SBC #$68
  $925D: EB E8     SBC #$e8
  $925F: DA        NOP
  $9260: 58        CLI
  $9261: D8        CLD
  $9262: 58        CLI
  $9263: D8        CLD
  $9264: 58        CLI
  $9265: D8        CLD
  $9266: 58        CLI
  $9267: D8        CLD
  $9268: 58        CLI
  $9269: D8        CLD
  $926A: 58        CLI
  $926B: D8        CLD
  $926C: 58        CLI
  $926D: D8        CLD
  $926E: 58        CLI
  $926F: D8        CLD
  $9270: A8        TAY
  $9271: E8        INX
  $9272: A8        TAY
  $9273: E8        INX
  $9274: A8        TAY
  $9275: E8        INX
  $9276: A8        TAY
  $9277: E8        INX
  $9278: A8        TAY
  $9279: EB B8     SBC #$b8
  $927B: EB B8     SBC #$b8
  $927D: EB C8     SBC #$c8
  $927F: EB D8     SBC #$d8
  $9281: EB E8     SBC #$e8
  $9283: EB F8     SBC #$f8
  $9285: EB 08     SBC #$08
  $9287: EC 18 EC  CPX $ec18
  $928A: 28        PLP
  $928B: EC 38 EC  CPX $ec38
  $928E: 48        PHA
  $928F: EC 58 EC  CPX $ec58
  $9292: 68        PLA
  $9293: EC 78 EC  CPX $ec78
  $9296: 88        DEY
  $9297: EC 18 EC  CPX $ec18
  $929A: 28        PLP
  $929B: EC 38 EC  CPX $ec38
  $929E: 48        PHA
  $929F: EC 98 EC  CPX $ec98
  $92A2: A8        TAY
  $92A3: EC A8 EC  CPX $eca8
  $92A6: B8        CLV
  $92A7: EC 58 D9  CPX $d958
  $92AA: 58        CLI
  $92AB: D9 58 D9  CMP $d958,Y
  $92AE: 88        DEY
  $92AF: E6 B8     INC $b8
  $92B1: DC 58 D9  NOP $d958,X
  $92B4: 58        CLI
  $92B5: D9 58 D9  CMP $d958,Y
  $92B8: 58        CLI
  $92B9: D9 58 D9  CMP $d958,Y
  $92BC: 58        CLI
  $92BD: D9 58 D9  CMP $d958,Y
  $92C0: 58        CLI
  $92C1: D9 58 D9  CMP $d958,Y
  $92C4: 98        TYA
  $92C5: E1 58     SBC ($58,X)
  $92C7: D9 98 E6  CMP $e698,Y
  $92CA: 98        TYA
  $92CB: E1 58     SBC ($58,X)
  $92CD: D9 58 D9  CMP $d958,Y
  $92D0: A8        TAY
  $92D1: E6 58     INC $58
  $92D3: D9 58 D9  CMP $d958,Y
  $92D6: 58        CLI
  $92D7: D9 58 D9  CMP $d958,Y
  $92DA: 58        CLI
  $92DB: D9 28 D9  CMP $d928,Y
  $92DE: D8        CLD
  $92DF: E6 58     INC $58
  $92E1: D9 98 E1  CMP $e198,Y
  $92E4: 58        CLI
  $92E5: D9 58 D9  CMP $d958,Y
  $92E8: 58        CLI
  $92E9: D9 58 D9  CMP $d958,Y
  $92EC: 58        CLI
  $92ED: D9 88 E6  CMP $e688,Y
  $92F0: 88        DEY
  $92F1: E6 58     INC $58
  $92F3: D9 58 D9  CMP $d958,Y
  $92F6: 58        CLI
  $92F7: D9 58 D9  CMP $d958,Y
  $92FA: 58        CLI
  $92FB: D9 98 E1  CMP $e198,Y
  $92FE: 58        CLI
  $92FF: D9 58 D9  CMP $d958,Y
  $9302: 58        CLI
  $9303: D9 58 D9  CMP $d958,Y
  $9306: 58        CLI
  $9307: D9 58 D9  CMP $d958,Y
  $930A: 58        CLI
  $930B: D9 58 D9  CMP $d958,Y
  $930E: 58        CLI
  $930F: D9 28 D9  CMP $d928,Y
  $9312: 58        CLI
  $9313: D9 58 D9  CMP $d958,Y
  $9316: C8        INY
  $9317: E6 68     INC $68
  $9319: DF 68 DF  DCP $df68,X
  $931C: 68        PLA
  $931D: DF 68 DF  DCP $df68,X
  $9320: 68        PLA
  $9321: DF F8 E6  DCP $e6f8,X
  $9324: 08        PHP
  $9325: E7 68     ISB $68
  $9327: DF 68 DF  DCP $df68,X
  $932A: 18        CLC
  $932B: E7 28     ISB $28
  $932D: E7 68     ISB $68
  $932F: DF 68 DF  DCP $df68,X
  $9332: 18        CLC
  $9333: E7 28     ISB $28
  $9335: E7 68     ISB $68
  $9337: DF 68 DF  DCP $df68,X
  $933A: 18        CLC
  $933B: E7 28     ISB $28
  $933D: E7 68     ISB $68
  $933F: DF 68 DF  DCP $df68,X
  $9342: 18        CLC
  $9343: E7 28     ISB $28
  $9345: E7 68     ISB $68
  $9347: DF A8 E8  DCP $e8a8,X
  $934A: 68        PLA
  $934B: DF 68 DF  DCP $df68,X
  $934E: 68        PLA
  $934F: DF 68 DF  DCP $df68,X
  $9352: 68        PLA
  $9353: DF 68 DF  DCP $df68,X
  $9356: 68        PLA
  $9357: DF 68 DF  DCP $df68,X
  $935A: 38        SEC
  $935B: E7 48     ISB $48
  $935D: E7 68     ISB $68
  $935F: DF 68 DF  DCP $df68,X
  $9362: 58        CLI
  $9363: E7 68     ISB $68
  $9365: E7 68     ISB $68
  $9367: DF 68 DF  DCP $df68,X
  $936A: 58        CLI
  $936B: E7 68     ISB $68
  $936D: E7 68     ISB $68
  $936F: DF 68 DF  DCP $df68,X
  $9372: 58        CLI
  $9373: E7 68     ISB $68
  $9375: E7 68     ISB $68
  $9377: DF 68 DF  DCP $df68,X
  $937A: 58        CLI
  $937B: E7 68     ISB $68
  $937D: E7 68     ISB $68
  $937F: DF A8 E8  DCP $e8a8,X
  $9382: 68        PLA
  $9383: DF 68 DF  DCP $df68,X
  $9386: 68        PLA
  $9387: DF 68 DF  DCP $df68,X
  $938A: 68        PLA
  $938B: DF 68 DF  DCP $df68,X
  $938E: 68        PLA
  $938F: DF 68 DF  DCP $df68,X
  $9392: 68        PLA
  $9393: DF 68 DF  DCP $df68,X
  $9396: 68        PLA
  $9397: DF 68 DF  DCP $df68,X
  $939A: 78        SEI
  $939B: E7 88     ISB $88
  $939D: E7 68     ISB $68
  $939F: DF 68 DF  DCP $df68,X
  $93A2: 78        SEI
  $93A3: E7 88     ISB $88
  $93A5: E7 68     ISB $68
  $93A7: DF 68 DF  DCP $df68,X
  $93AA: 78        SEI
  $93AB: E7 88     ISB $88
  $93AD: E7 68     ISB $68
  $93AF: DF 68 DF  DCP $df68,X
  $93B2: 78        SEI
  $93B3: E7 88     ISB $88
  $93B5: E7 68     ISB $68
  $93B7: DF 58 D9  DCP $d958,X
  $93BA: 68        PLA
  $93BB: DF 68 DF  DCP $df68,X
  $93BE: 68        PLA
  $93BF: DF 68 DF  DCP $df68,X
  $93C2: 68        PLA
  $93C3: DF 68 DF  DCP $df68,X
  $93C6: 68        PLA
  $93C7: DF 68 DF  DCP $df68,X
  $93CA: 68        PLA
  $93CB: DF 68 DF  DCP $df68,X
  $93CE: 68        PLA
  $93CF: DF 68 DF  DCP $df68,X
  $93D2: 98        TYA
  $93D3: E7 A8     ISB $a8
  $93D5: E7 68     ISB $68
  $93D7: DF 68 DF  DCP $df68,X
  $93DA: 98        TYA
  $93DB: E7 A8     ISB $a8
  $93DD: E7 68     ISB $68
  $93DF: DF 68 DF  DCP $df68,X
  $93E2: 98        TYA
  $93E3: E7 A8     ISB $a8
  $93E5: E7 68     ISB $68
  $93E7: DF 68 DF  DCP $df68,X
  $93EA: 98        TYA
  $93EB: E7 A8     ISB $a8
  $93ED: E7 68     ISB $68
  $93EF: DF 58 D9  DCP $d958,X
  $93F2: 68        PLA
  $93F3: DF 68 DF  DCP $df68,X
  $93F6: 68        PLA
  $93F7: DF 58 D9  DCP $d958,X
  $93FA: 58        CLI
  $93FB: D9 B8 DC  CMP $dcb8,Y
  $93FE: 58        CLI
  $93FF: D9 98 E1  CMP $e198,Y
  $9402: 58        CLI
  $9403: D9 58 D9  CMP $d958,Y
  $9406: 58        CLI
  $9407: D9 58 D9  CMP $d958,Y
  $940A: 58        CLI
  $940B: D9 58 D9  CMP $d958,Y
  $940E: 68        PLA
  $940F: D8        CLD
  $9410: 98        TYA
  $9411: E9 98     SBC #$98
  $9413: E9 98     SBC #$98
  $9415: E9 98     SBC #$98
  $9417: E9 F8     SBC #$f8
  $9419: E7 F8     ISB $f8
  $941B: E7 F8     ISB $f8
  $941D: E7 F8     ISB $f8
  $941F: E7 08     ISB $08
  $9421: E8        INX
  $9422: 08        PHP
  $9423: E8        INX
  $9424: 08        PHP
  $9425: E8        INX
  $9426: 08        PHP
  $9427: E8        INX
  $9428: 18        CLC
  $9429: E8        INX
  $942A: 18        CLC
  $942B: E8        INX
  $942C: 18        CLC
  $942D: E8        INX
  $942E: 18        CLC
  $942F: E8        INX
  $9430: 58        CLI
  $9431: D9 58 D9  CMP $d958,Y
  $9434: 58        CLI
  $9435: D9 58 D9  CMP $d958,Y
  $9438: 58        CLI
  $9439: D9 58 D9  CMP $d958,Y
  $943C: 58        CLI
  $943D: D9 58 D9  CMP $d958,Y
  $9440: 28        PLP
  $9441: E8        INX
  $9442: A8        TAY
  $9443: E8        INX
  $9444: B8        CLV
  $9445: E8        INX
  $9446: 38        SEC
  $9447: E8        INX
  $9448: 48        PHA
  $9449: E8        INX
  $944A: C8        INY
  $944B: E8        INX
  $944C: D8        CLD
  $944D: E8        INX
  $944E: 58        CLI
  $944F: E8        INX
  $9450: 68        PLA
  $9451: E8        INX
  $9452: E8        INX
  $9453: E8        INX
  $9454: F8        SED
  $9455: E8        INX
  $9456: 78        SEI
  $9457: E8        INX
  $9458: 88        DEY
  $9459: E8        INX
  $945A: 08        PHP
  $945B: E9 18     SBC #$18
  $945D: E9 98     SBC #$98
  $945F: E8        INX
  $9460: 58        CLI
  $9461: D9 58 D9  CMP $d958,Y
  $9464: 58        CLI
  $9465: D9 58 D9  CMP $d958,Y
  $9468: 58        CLI
  $9469: D9 58 D9  CMP $d958,Y
  $946C: 58        CLI
  $946D: D9 58 D9  CMP $d958,Y
  $9470: 58        CLI
  $9471: D9 58 D9  CMP $d958,Y
  $9474: 58        CLI
  $9475: D9 58 D9  CMP $d958,Y
  $9478: 28        PLP
  $9479: E8        INX
  $947A: 28        PLP
  $947B: E9 A8     SBC #$a8
  $947D: E8        INX
  $947E: 38        SEC
  $947F: E8        INX
  $9480: 48        PHA
  $9481: E8        INX
  $9482: 38        SEC
  $9483: E9 48     SBC #$48
  $9485: E9 58     SBC #$58
  $9487: E8        INX
  $9488: 68        PLA
  $9489: E8        INX
  $948A: 58        CLI
  $948B: E9 68     SBC #$68
  $948D: E9 78     SBC #$78
  $948F: E8        INX
  $9490: 88        DEY
  $9491: E8        INX
  $9492: 78        SEI
  $9493: E9 88     SBC #$88
  $9495: E9 98     SBC #$98
  $9497: E8        INX
  $9498: 58        CLI
  $9499: D9 58 D9  CMP $d958,Y
  $949C: 58        CLI
  $949D: D9 58 D9  CMP $d958,Y
  $94A0: 58        CLI
  $94A1: D9 58 D9  CMP $d958,Y
  $94A4: 58        CLI
  $94A5: D9 58 D9  CMP $d958,Y
  $94A8: 58        CLI
  $94A9: D9 B8 DC  CMP $dcb8,Y
  $94AC: 58        CLI
  $94AD: D9 58 D9  CMP $d958,Y
  $94B0: 28        PLP
  $94B1: D9 58 D9  CMP $d958,Y
  $94B4: 58        CLI
  $94B5: D9 68 D8  CMP $d868,Y
  $94B8: 38        SEC
  $94B9: DC C8 D9  NOP $d9c8,X
  $94BC: D8        CLD
  $94BD: D9 E8 D9  CMP $d9e8,Y
  $94C0: F8        SED
  $94C1: D9 08 DA  CMP $da08,Y
  $94C4: 18        CLC
  $94C5: DA        NOP
  $94C6: 28        PLP
  $94C7: DA        NOP
  $94C8: 38        SEC
  $94C9: DA        NOP
  $94CA: 48        PHA
  $94CB: DA        NOP
  $94CC: C8        INY
  $94CD: E1 D8     SBC ($d8,X)
  $94CF: E1 A8     SBC ($a8,X)
  $94D1: DA        NOP
  $94D2: B8        CLV
  $94D3: DA        NOP
  $94D4: 48        PHA
  $94D5: DC 58 DC  NOP $dc58,X
  $94D8: 58        CLI
  $94D9: D9 58 D9  CMP $d958,Y
  $94DC: 58        CLI
  $94DD: D9 58 D9  CMP $d958,Y
  $94E0: 58        CLI
  $94E1: D9 68 D8  CMP $d868,Y
  $94E4: 58        CLI
  $94E5: D9 58 D9  CMP $d958,Y
  $94E8: 68        PLA
  $94E9: D8        CLD
  $94EA: 58        CLI
  $94EB: D9 58 D9  CMP $d958,Y
  $94EE: 28        PLP
  $94EF: D9 18 DB  CMP $db18,Y
  $94F2: 38        SEC
  $94F3: DB 48 DB  DCP $db48,Y
  $94F6: 38        SEC
  $94F7: DC 58 DB  NOP $db58,X
  $94FA: 68        PLA
  $94FB: DB 78 DB  DCP $db78,Y
  $94FE: 88        DEY
  $94FF: DB E8 E1  DCP $e1e8,Y
  $9502: F8        SED
  $9503: E1 B8     SBC ($b8,X)
  $9505: DB C8 DB  DCP $dbc8,Y
  $9508: 08        PHP
  $9509: E2 18     NOP #$18
  $950B: E2 F8     NOP #$f8
  $950D: DB 08 DC  DCP $dc08,Y
  $9510: B8        CLV
  $9511: DC 58 D9  NOP $d958,X
  $9514: 58        CLI
  $9515: D9 58 D9  CMP $d958,Y
  $9518: 58        CLI
  $9519: D9 58 D9  CMP $d958,Y
  $951C: 98        TYA
  $951D: E1 58     SBC ($58,X)
  $951F: D9 58 D9  CMP $d958,Y
  $9522: 28        PLP
  $9523: D9 58 D9  CMP $d958,Y
  $9526: 58        CLI
  $9527: D9 78 D8  CMP $d878,Y
  $952A: 38        SEC
  $952B: DC 78 D8  NOP $d878,X
  $952E: 78        SEI
  $952F: D8        CLD
  $9530: 48        PHA
  $9531: E2 58     NOP #$58
  $9533: E2 68     NOP #$68
  $9535: E2 78     NOP #$78
  $9537: E2 88     NOP #$88
  $9539: E2 98     NOP #$98
  $953B: E2 A8     NOP #$a8
  $953D: E2 B8     NOP #$b8
  $953F: E2 C8     NOP #$c8
  $9541: E2 D8     NOP #$d8
  $9543: E2 E8     NOP #$e8
  $9545: E2 58     NOP #$58
  $9547: DC 58 D9  NOP $d958,X
  $954A: 58        CLI
  $954B: D9 B8 DC  CMP $dcb8,Y
  $954E: 58        CLI
  $954F: D9 58 D9  CMP $d958,Y
  $9552: 58        CLI
  $9553: D9 58 D9  CMP $d958,Y
  $9556: 58        CLI
  $9557: D9 88 E6  CMP $e688,Y
  $955A: 58        CLI
  $955B: D9 28 D9  CMP $d928,Y
  $955E: 58        CLI
  $955F: D9 78 D8  CMP $d878,Y
  $9562: 78        SEI
  $9563: D8        CLD
  $9564: 38        SEC
  $9565: DC 78 D8  NOP $d878,X
  $9568: F8        SED
  $9569: E2 08     NOP #$08
  $956B: E3 18     ISB ($18,X)
  $956D: E3 28     ISB ($28,X)
  $956F: E3 38     ISB ($38,X)
  $9571: E3 48     ISB ($48,X)
  $9573: E3 58     ISB ($58,X)
  $9575: E3 68     ISB ($68,X)
  $9577: E3 08     ISB ($08,X)
  $9579: E2 78     NOP #$78
  $957B: E3 88     ISB ($88,X)
  $957D: E3 98     ISB ($98,X)
  $957F: E3 58     ISB ($58,X)
  $9581: D9 88 DC  CMP $dc88,Y
  $9584: 58        CLI
  $9585: D9 68 D8  CMP $d868,Y
  $9588: 78        SEI
  $9589: D8        CLD
  $958A: 98        TYA
  $958B: DC 78 D8  NOP $d878,X
  $958E: 78        SEI
  $958F: D8        CLD
  $9590: E8        INX
  $9591: D8        CLD
  $9592: F8        SED
  $9593: D8        CLD
  $9594: A8        TAY
  $9595: D8        CLD
  $9596: E8        INX
  $9597: D8        CLD
  $9598: A8        TAY
  $9599: D8        CLD
  $959A: E8        INX
  $959B: D8        CLD
  $959C: F8        SED
  $959D: D8        CLD
  $959E: A8        TAY
  $959F: D8        CLD
  $95A0: 58        CLI
  $95A1: D8        CLD
  $95A2: 58        CLI
  $95A3: D8        CLD
  $95A4: 58        CLI
  $95A5: D8        CLD
  $95A6: 58        CLI
  $95A7: D8        CLD
  $95A8: 58        CLI
  $95A9: D8        CLD
  $95AA: 58        CLI
  $95AB: D8        CLD
  $95AC: 58        CLI
  $95AD: D8        CLD
  $95AE: 58        CLI
  $95AF: D8        CLD
  $95B0: 58        CLI
  $95B1: D8        CLD
  $95B2: 58        CLI
  $95B3: D8        CLD
  $95B4: 58        CLI
  $95B5: D8        CLD
  $95B6: 58        CLI
  $95B7: D8        CLD
  $95B8: 68        PLA
  $95B9: DF 68 DF  DCP $df68,X
  $95BC: 68        PLA
  $95BD: DF 68 DF  DCP $df68,X
  $95C0: 68        PLA
  $95C1: DF 68 DF  DCP $df68,X
  $95C4: 68        PLA
  $95C5: DF 68 DF  DCP $df68,X
  $95C8: 68        PLA
  $95C9: DF 68 DF  DCP $df68,X
  $95CC: 68        PLA
  $95CD: DF 68 DF  DCP $df68,X
  $95D0: 68        PLA
  $95D1: DF 68 DF  DCP $df68,X
  $95D4: 68        PLA
  $95D5: DF 68 DF  DCP $df68,X
  $95D8: 68        PLA
  $95D9: DF 68 DF  DCP $df68,X
  $95DC: 68        PLA
  $95DD: DF 68 DF  DCP $df68,X
  $95E0: 68        PLA
  $95E1: DF 68 DF  DCP $df68,X
  $95E4: 68        PLA
  $95E5: DF 68 DF  DCP $df68,X
  $95E8: 58        CLI
  $95E9: D9 68 DF  CMP $df68,Y
  $95EC: 68        PLA
  $95ED: DF 68 DF  DCP $df68,X
  $95F0: 68        PLA
  $95F1: DF 68 DF  DCP $df68,X
  $95F4: 68        PLA
  $95F5: DF 68 DF  DCP $df68,X
  $95F8: 68        PLA
  $95F9: DF 68 DF  DCP $df68,X
  $95FC: 68        PLA
  $95FD: DF 68 DF  DCP $df68,X
  $9600: 68        PLA
  $9601: DF A8 E8  DCP $e8a8,X
  $9604: 68        PLA
  $9605: F0 68     BEQ $966f
  $9607: DF 68 DF  DCP $df68,X
  $960A: 68        PLA
  $960B: F0 A8     BEQ $95b5
  $960D: E8        INX
  $960E: 68        PLA
  $960F: DF 68 DF  DCP $df68,X
  $9612: A8        TAY
  $9613: E8        INX
  $9614: A8        TAY
  $9615: E8        INX
  $9616: 68        PLA
  $9617: DF 68 DF  DCP $df68,X
  $961A: A8        TAY
  $961B: E8        INX
  $961C: A8        TAY
  $961D: E8        INX
  $961E: 68        PLA
  $961F: DF 58 D9  DCP $d958,X
  $9622: 68        PLA
  $9623: DF 68 DF  DCP $df68,X
  $9626: 68        PLA
  $9627: DF 58 F0  DCP $f058,X
  $962A: 58        CLI
  $962B: F0 58     BEQ $9685
  $962D: F0 58     BEQ $9687
  $962F: F0 58     BEQ $9689
  $9631: F0 58     BEQ $968b
  $9633: F0 58     BEQ $968d
  $9635: F0 58     BEQ $968f
  $9637: F0 58     BEQ $9691
  $9639: F0 58     BEQ $9693
  $963B: F0 58     BEQ $9695
  $963D: F0 58     BEQ $9697
  $963F: F0 58     BEQ $9699
  $9641: F0 58     BEQ $969b
  $9643: F0 58     BEQ $969d
  $9645: F0 58     BEQ $969f
  $9647: F0 58     BEQ $96a1
  $9649: F0 58     BEQ $96a3
  $964B: F0 58     BEQ $96a5
  $964D: F0 58     BEQ $96a7
  $964F: F0 58     BEQ $96a9
  $9651: F0 58     BEQ $96ab
  $9653: F0 58     BEQ $96ad
  $9655: F0 58     BEQ $96af
  $9657: F0 58     BEQ $96b1
  $9659: F0 58     BEQ $96b3
  $965B: F0 58     BEQ $96b5
  $965D: F0 58     BEQ $96b7
  $965F: F0 B8     BEQ $9619
  $9661: D9 58 D9  CMP $d958,Y
  $9664: 68        PLA
  $9665: D8        CLD
  $9666: 58        CLI
  $9667: D9 78 D8  CMP $d878,Y
  $966A: 78        SEI
  $966B: D8        CLD
  $966C: 78        SEI
  $966D: D8        CLD
  $966E: 78        SEI
  $966F: D8        CLD
  $9670: B8        CLV
  $9671: E6 B8     INC $b8
  $9673: E6 B8     INC $b8
  $9675: E6 B8     INC $b8
  $9677: E6 A8     INC $a8
  $9679: E9 A8     SBC #$a8
  $967B: E9 A8     SBC #$a8
  $967D: E9 A8     SBC #$a8
  $967F: E9 B8     SBC #$b8
  $9681: E9 B8     SBC #$b8
  $9683: E9 B8     SBC #$b8
  $9685: E9 B8     SBC #$b8
  $9687: E9 58     SBC #$58
  $9689: D8        CLD
  $968A: 58        CLI
  $968B: D8        CLD
  $968C: 58        CLI
  $968D: D8        CLD
  $968E: 58        CLI
  $968F: D8        CLD
  $9690: 58        CLI
  $9691: D8        CLD
  $9692: 58        CLI
  $9693: D8        CLD
  $9694: 58        CLI
  $9695: D8        CLD
  $9696: 58        CLI
  $9697: D8        CLD
  $9698: 28        PLP
  $9699: E4 28     CPX $28
  $969B: E4 28     CPX $28
  $969D: E4 28     CPX $28
  $969F: E4 28     CPX $28
  $96A1: E4 28     CPX $28
  $96A3: E4 28     CPX $28
  $96A5: E4 28     CPX $28
  $96A7: E4 28     CPX $28
  $96A9: E4 28     CPX $28
  $96AB: E4 28     CPX $28
  $96AD: E4 28     CPX $28
  $96AF: E4 28     CPX $28
  $96B1: E4 28     CPX $28
  $96B3: E4 28     CPX $28
  $96B5: E4 28     CPX $28
  $96B7: E4 28     CPX $28
  $96B9: E4 28     CPX $28
  $96BB: E4 28     CPX $28
  $96BD: E4 28     CPX $28
  $96BF: E4 28     CPX $28
  $96C1: E4 28     CPX $28
  $96C3: E4 28     CPX $28
  $96C5: E4 28     CPX $28
  $96C7: E4 28     CPX $28
  $96C9: E4 28     CPX $28
  $96CB: E4 28     CPX $28
  $96CD: E4 28     CPX $28
  $96CF: E4 58     CPX $58
  $96D1: D9 58 D9  CMP $d958,Y
  $96D4: 58        CLI
  $96D5: D9 58 D9  CMP $d958,Y
  $96D8: 58        CLI
  $96D9: D9 58 D9  CMP $d958,Y
  $96DC: 58        CLI
  $96DD: D9 58 D9  CMP $d958,Y
  $96E0: 58        CLI
  $96E1: D9 58 D9  CMP $d958,Y
  $96E4: 58        CLI
  $96E5: D9 58 D9  CMP $d958,Y
  $96E8: C8        INY
  $96E9: E9 D8     SBC #$d8
  $96EB: E9 E8     SBC #$e8
  $96ED: E9 58     SBC #$58
  $96EF: D9 F8 E9  CMP $e9f8,Y
  $96F2: 08        PHP
  $96F3: EA        NOP
  $96F4: 18        CLC
  $96F5: EA        NOP
  $96F6: 58        CLI
  $96F7: D9 28 EA  CMP $ea28,Y
  $96FA: A8        TAY
  $96FB: E8        INX
  $96FC: 38        SEC
  $96FD: EA        NOP
  $96FE: 58        CLI
  $96FF: D9 58 D9  CMP $d958,Y
  $9702: 58        CLI
  $9703: D9 58 D9  CMP $d958,Y
  $9706: 58        CLI
  $9707: D9 58 D9  CMP $d958,Y
  $970A: 58        CLI
  $970B: D9 58 D9  CMP $d958,Y
  $970E: 58        CLI
  $970F: D9 58 D9  CMP $d958,Y
  $9712: 58        CLI
  $9713: D9 58 D9  CMP $d958,Y
  $9716: 58        CLI
  $9717: D9 58 D9  CMP $d958,Y
  $971A: 58        CLI
  $971B: D9 58 D9  CMP $d958,Y
  $971E: 58        CLI
  $971F: D9 58 D9  CMP $d958,Y
  $9722: C8        INY
  $9723: E9 D8     SBC #$d8
  $9725: E9 E8     SBC #$e8
  $9727: E9 58     SBC #$58
  $9729: D9 F8 E9  CMP $e9f8,Y
  $972C: 08        PHP
  $972D: EA        NOP
  $972E: 18        CLC
  $972F: EA        NOP
  $9730: 58        CLI
  $9731: D9 28 EA  CMP $ea28,Y
  $9734: A8        TAY
  $9735: E8        INX
  $9736: 38        SEC
  $9737: EA        NOP
  $9738: 58        CLI
  $9739: D9 58 D9  CMP $d958,Y
  $973C: 58        CLI
  $973D: D9 58 D9  CMP $d958,Y
  $9740: 58        CLI
  $9741: D9 58 D9  CMP $d958,Y
  $9744: 58        CLI
  $9745: D9 58 D9  CMP $d958,Y
  $9748: 58        CLI
  $9749: D9 58 D9  CMP $d958,Y
  $974C: 58        CLI
  $974D: D9 58 D9  CMP $d958,Y
  $9750: 58        CLI
  $9751: D9 58 D9  CMP $d958,Y
  $9754: 58        CLI
  $9755: D9 58 D9  CMP $d958,Y
  $9758: 48        PHA
  $9759: EA        NOP
  $975A: A8        TAY
  $975B: E8        INX
  $975C: 58        CLI
  $975D: EA        NOP
  $975E: 58        CLI
  $975F: D9 48 EA  CMP $ea48,Y
  $9762: A8        TAY
  $9763: E8        INX
  $9764: 58        CLI
  $9765: EA        NOP
  $9766: 58        CLI
  $9767: D9 48 EA  CMP $ea48,Y
  $976A: A8        TAY
  $976B: E8        INX
  $976C: 58        CLI
  $976D: EA        NOP
  $976E: 58        CLI
  $976F: D9 58 D9  CMP $d958,Y
  $9772: 58        CLI
  $9773: D9 58 D9  CMP $d958,Y
  $9776: 58        CLI
  $9777: D9 58 D9  CMP $d958,Y
  $977A: 58        CLI
  $977B: D9 58 D9  CMP $d958,Y
  $977E: 58        CLI
  $977F: D9 58 D9  CMP $d958,Y
  $9782: 58        CLI
  $9783: D9 58 D9  CMP $d958,Y
  $9786: 58        CLI
  $9787: D9 58 D9  CMP $d958,Y
  $978A: 58        CLI
  $978B: D9 58 D9  CMP $d958,Y
  $978E: 58        CLI
  $978F: D9 58 D9  CMP $d958,Y
  $9792: 48        PHA
  $9793: EA        NOP
  $9794: A8        TAY
  $9795: E8        INX
  $9796: 58        CLI
  $9797: EA        NOP
  $9798: 58        CLI
  $9799: D9 48 EA  CMP $ea48,Y
  $979C: A8        TAY
  $979D: E8        INX
  $979E: 58        CLI
  $979F: EA        NOP
  $97A0: 58        CLI
  $97A1: D9 48 EA  CMP $ea48,Y
  $97A4: A8        TAY
  $97A5: E8        INX
  $97A6: 58        CLI
  $97A7: EA        NOP
  $97A8: 58        CLI
  $97A9: D9 58 D9  CMP $d958,Y
  $97AC: 58        CLI
  $97AD: D9 58 D9  CMP $d958,Y
  $97B0: 58        CLI
  $97B1: D9 58 D9  CMP $d958,Y
  $97B4: 58        CLI
  $97B5: D9 58 D9  CMP $d958,Y
  $97B8: 58        CLI
  $97B9: D9 58 D9  CMP $d958,Y
  $97BC: F8        SED
  $97BD: EA        NOP
  $97BE: 58        CLI
  $97BF: D9 58 D9  CMP $d958,Y
  $97C2: 58        CLI
  $97C3: D9 F8 EA  CMP $eaf8,Y
  $97C6: 58        CLI
  $97C7: D9 58 D9  CMP $d958,Y
  $97CA: 58        CLI
  $97CB: D9 F8 EA  CMP $eaf8,Y
  $97CE: 58        CLI
  $97CF: D9 58 D9  CMP $d958,Y
  $97D2: 28        PLP
  $97D3: DD 58 D9  CMP $d958,X
  $97D6: 58        CLI
  $97D7: D9 58 D9  CMP $d958,Y
  $97DA: 38        SEC
  $97DB: DD 58 D9  CMP $d958,X
  $97DE: 58        CLI
  $97DF: D9 58 D9  CMP $d958,Y
  $97E2: 48        PHA
  $97E3: DD 58 D9  CMP $d958,X
  $97E6: 58        CLI
  $97E7: D9 68 EA  CMP $ea68,Y
  $97EA: 68        PLA
  $97EB: EA        NOP
  $97EC: 68        PLA
  $97ED: EA        NOP
  $97EE: 68        PLA
  $97EF: EA        NOP
  $97F0: 68        PLA
  $97F1: EA        NOP
  $97F2: 68        PLA
  $97F3: EA        NOP
  $97F4: 68        PLA
  $97F5: EA        NOP
  $97F6: 68        PLA
  $97F7: EA        NOP
  $97F8: 68        PLA
  $97F9: EA        NOP
  $97FA: 78        SEI
  $97FB: EA        NOP
  $97FC: 88        DEY
  $97FD: EA        NOP
  $97FE: 68        PLA
  $97FF: EA        NOP
  $9800: 68        PLA
  $9801: EA        NOP
  $9802: 98        TYA
  $9803: EA        NOP
  $9804: A8        TAY
  $9805: EA        NOP
  $9806: 68        PLA
  $9807: EA        NOP
  $9808: 68        PLA
  $9809: EA        NOP
  $980A: B8        CLV
  $980B: EA        NOP
  $980C: C8        INY
  $980D: EA        NOP
  $980E: 68        PLA
  $980F: EA        NOP
  $9810: 68        PLA
  $9811: EA        NOP
  $9812: D8        CLD
  $9813: EA        NOP
  $9814: E8        INX
  $9815: EA        NOP
  $9816: 68        PLA
  $9817: EA        NOP
  $9818: 68        PLA
  $9819: EA        NOP
  $981A: 68        PLA
  $981B: EA        NOP
  $981C: 68        PLA
  $981D: EA        NOP
  $981E: 68        PLA
  $981F: EA        NOP
  $9820: 58        CLI
  $9821: D9 58 D9  CMP $d958,Y
  $9824: 58        CLI
  $9825: D9 58 D9  CMP $d958,Y
  $9828: 78        SEI
  $9829: D8        CLD
  $982A: 78        SEI
  $982B: D8        CLD
  $982C: 78        SEI
  $982D: D8        CLD
  $982E: 78        SEI
  $982F: D8        CLD
  $9830: F8        SED
  $9831: D8        CLD
  $9832: 78        SEI
  $9833: EB 88     SBC #$88
  $9835: EB F8     SBC #$f8
  $9837: D8        CLD
  $9838: A8        TAY
  $9839: D8        CLD
  $983A: 38        SEC
  $983B: EB 48     SBC #$48
  $983D: EB A8     SBC #$a8
  $983F: D8        CLD
  $9840: E8        INX
  $9841: DA        NOP
  $9842: 58        CLI
  $9843: EB 68     SBC #$68
  $9845: EB E8     SBC #$e8
  $9847: DA        NOP
  $9848: 58        CLI
  $9849: D8        CLD
  $984A: 58        CLI
  $984B: D8        CLD
  $984C: 58        CLI
  $984D: D8        CLD
  $984E: 58        CLI
  $984F: D8        CLD
  $9850: 58        CLI
  $9851: D8        CLD
  $9852: 58        CLI
  $9853: D8        CLD
  $9854: 58        CLI
  $9855: D8        CLD
  $9856: 58        CLI
  $9857: D8        CLD
  $9858: FF FF FF  ISB $ffff,X
  $985B: FF FF FF  ISB $ffff,X
  $985E: FF FF FF  ISB $ffff,X
  $9861: FF FF FF  ISB $ffff,X
  $9864: FF FF FF  ISB $ffff,X
  $9867: FF FF FF  ISB $ffff,X
  $986A: FF FF 20  ISB $20ff,X
  $986D: 21 22     AND ($22,X)
  $986F: 23 24     RLA ($24,X)
  $9871: 25 26     AND $26
  $9873: 27 FF     RLA $ff
  $9875: FF FF FF  ISB $ffff,X
  $9878: FF FF 1A  ISB $1aff,X
  $987B: 1A        NOP
  $987C: FF FF 1A  ISB $1aff,X
  $987F: 1A        NOP
  $9880: FF FF 1A  ISB $1aff,X
  $9883: 1A        NOP
  $9884: FF FF 1A  ISB $1aff,X
  $9887: 1A        NOP
  $9888: FF FF 1A  ISB $1aff,X
  $988B: 1A        NOP
  $988C: FF FF 1A  ISB $1aff,X
  $988F: 1A        NOP
  $9890: FF FF 1A  ISB $1aff,X
  $9893: 1A        NOP
  $9894: FF FF FF  ISB $ffff,X
  $9897: 1E FF FF  ASL $ffff,X
  $989A: 1E FF 1E  ASL $1eff,X
  $989D: 1E 10 11  ASL $1110,X
  $98A0: 1E 1E 11  ASL $111e,X
  $98A3: 15 FF     ORA $ff,X
  $98A5: FF FF 1E  ISB $1eff,X
  $98A8: 04 05     NOP $05
  $98AA: 06 07     ASL $07
  $98AC: 04 08     NOP $08
  $98AE: 0A        ASL A
  $98AF: 06 09     ASL $09
  $98B1: 0C 0B 0E  NOP $0e0b
  $98B4: 04 05     NOP $05
  $98B6: 06 07     ASL $07
  $98B8: 04 08     NOP $08
  $98BA: 0A        ASL A
  $98BB: 06 09     ASL $09
  $98BD: 0C 0B 0E  NOP $0e0b
  $98C0: 04 05     NOP $05
  $98C2: 06 07     ASL $07
  $98C4: 0D 0D 0A  ORA $0a0d
  $98C7: 06 18     ASL $18
  $98C9: 19 0B 0E  ORA $0e0b,Y
  $98CC: 12        ???
  $98CD: 13 0F     SLO ($0f),Y
  $98CF: 0F 13 17  SLO $1713
  $98D2: 0F 0F 0D  SLO $0d0f
  $98D5: 0D 0A 06  ORA $060a
  $98D8: 0D 1C 06  ORA $061c
  $98DB: 07 04     SLO $04
  $98DD: 08        PHP
  $98DE: 0A        ASL A
  $98DF: 06 09     ASL $09
  $98E1: 0C 0B 0E  NOP $0e0b
  $98E4: 04 08     NOP $08
  $98E6: 0A        ASL A
  $98E7: 06 04     ASL $04
  $98E9: 08        PHP
  $98EA: 0A        ASL A
  $98EB: 06 09     ASL $09
  $98ED: 0C 0B 0E  NOP $0e0b
  $98F0: 04 05     NOP $05
  $98F2: 06 07     ASL $07
  $98F4: 04 08     NOP $08
  $98F6: 0A        ASL A
  $98F7: 06 09     ASL $09
  $98F9: 0C 0B 0E  NOP $0e0b
  $98FC: 04 05     NOP $05
  $98FE: 06 07     ASL $07
  $9900: 04 08     NOP $08
  $9902: 0A        ASL A
  $9903: 06 09     ASL $09
  $9905: 0C 0B 0E  NOP $0e0b
  $9908: 04 05     NOP $05
  $990A: 06 07     ASL $07
  $990C: 04 08     NOP $08
  $990E: 0A        ASL A
  $990F: 30 09     BMI $991a
  $9911: 0C 31 34  NOP $3431
  $9914: 04 05     NOP $05
  $9916: 06 07     ASL $07
  $9918: 02        ???
  $9919: 02        ???
  $991A: 1B 1B 02  SLO $021b,Y
  $991D: 02        ???
  $991E: 1B 1B 67  SLO $671b,Y
  $9921: 54 1B     NOP $1b,X
  $9923: 02        ???
  $9924: 02        ???
  $9925: 02        ???
  $9926: 02        ???
  $9927: 02        ???
  $9928: FF FF FF  ISB $ffff,X
  $992B: FF FF FF  ISB $ffff,X
  $992E: FF FF FF  ISB $ffff,X
  $9931: FF 28 29  ISB $2928,X
  $9934: FF FF 2C  ISB $2cff,X
  $9937: FF FF FF  ISB $ffff,X
  $993A: 1E FF FF  ASL $ffff,X
  $993D: FF 1A 1A  ISB $1a1a,X
  $9940: 2A        ROL A
  $9941: 2B 1B     ANC #$1b
  $9943: 1B 2E 2F  SLO $2f2e,Y
  $9946: 1B 1B 04  SLO $041b,Y
  $9949: 05 06     ORA $06
  $994B: 07 04     SLO $04
  $994D: 08        PHP
  $994E: 30 31     BMI $9981
  $9950: 09 0C     ORA #$0c
  $9952: 34 0E     NOP $0e,X
  $9954: 04 05     NOP $05
  $9956: 06 07     ASL $07
  $9958: FF FF FF  ISB $ffff,X
  $995B: FF FF FF  ISB $ffff,X
  $995E: FF FF FF  ISB $ffff,X
  $9961: FF FF FF  ISB $ffff,X
  $9964: FF FF FF  ISB $ffff,X
  $9967: FF FF FF  ISB $ffff,X
  $996A: FF FF FF  ISB $ffff,X
  $996D: 20 FF 22  JSR $22ff
  $9970: 21 24     AND ($24,X)
  $9972: 23 26     RLA ($26,X)
  $9974: 25 FF     AND $ff
  $9976: 27 FF     RLA $ff
  $9978: 04 05     NOP $05
  $997A: 06 07     ASL $07
  $997C: 32        ???
  $997D: 33 2D     RLA ($2d),Y
  $997F: 38        SEC
  $9980: 33 33     RLA ($33),Y
  $9982: 39 38 33  AND $3338,Y
  $9985: 36 38     ROL $38,X
  $9987: 3C FF FF  NOP $ffff,X
  $998A: FF FF FF  ISB $ffff,X
  $998D: FF FF 28  ISB $28ff,X
  $9990: FF FF 29  ISB $29ff,X
  $9993: 2C FF FF  BIT $ffff
  $9996: FF FF 32  ISB $32ff,X
  $9999: 33 2D     RLA ($2d),Y
  $999B: 38        SEC
  $999C: 33 33     RLA ($33),Y
  $999E: 39 38 33  AND $3338,Y
  $99A1: 36 38     ROL $38,X
  $99A3: 3C 04 05  NOP $0504,X
  $99A6: 06 07     ASL $07
  $99A8: FF FF 1E  ISB $1eff,X
  $99AB: FF FF 2A  ISB $2aff,X
  $99AE: 1A        NOP
  $99AF: 1B 2B 2E  SLO $2e2b,Y
  $99B2: 1B 1B 2F  SLO $2f1b,Y
  $99B5: FF 1B 1A  ISB $1a1b,X
  $99B8: FF FF FF  ISB $ffff,X
  $99BB: FF FF FF  ISB $ffff,X
  $99BE: FF FF 20  ISB $20ff,X
  $99C1: 21 22     AND ($22,X)
  $99C3: 23 24     RLA ($24,X)
  $99C5: 25 26     AND $26
  $99C7: 27 FF     RLA $ff
  $99C9: FF 1A 1A  ISB $1a1a,X
  $99CC: FF FF 1A  ISB $1aff,X
  $99CF: 1A        NOP
  $99D0: FF FF 1A  ISB $1aff,X
  $99D3: 1A        NOP
  $99D4: FF FF 1A  ISB $1aff,X
  $99D7: FF FF FF  ISB $ffff,X
  $99DA: 1E 1E FF  ASL $ff1e,X
  $99DD: FF FF FF  ISB $ffff,X
  $99E0: 1E 1E 10  ASL $101e,X
  $99E3: 11 1E     ORA ($1e),Y
  $99E5: 1E 11 15  ASL $1511,X
  $99E8: FF FF FF  ISB $ffff,X
  $99EB: FF FF FF  ISB $ffff,X
  $99EE: 1E 1E FF  ASL $ff1e,X
  $99F1: FF FF 1A  ISB $1aff,X
  $99F4: FF FF 1A  ISB $1aff,X
  $99F7: 1A        NOP
  $99F8: 08        PHP
  $99F9: 04 69     NOP $69
  $99FB: C0 08     CPY #$08
  $99FD: 08        PHP
  $99FE: C1 66     CMP ($66,X)
  $9A00: 04 04     NOP $04
  $9A02: 6C 69 05  JMP ($0569)
  $9A05: 04 6E     NOP $6e
  $9A07: 6C 08 04  JMP ($0408)
  $9A0A: 69 66     ADC #$66
  $9A0C: 08        PHP
  $9A0D: 08        PHP
  $9A0E: C0 C1     CPY #$c1
  $9A10: 04 04     NOP $04
  $9A12: 6C 69 05  JMP ($0569)
  $9A15: 0D 6E 69  ORA $696e
  $9A18: 0D 0D 66  ORA $660d
  $9A1B: C0 0D     CPY #$0d
  $9A1D: 0D C1 6C  ORA $6cc1
  $9A20: 12        ???
  $9A21: 13 6F     SLO ($6f),Y
  $9A23: 6F 13 17  RRA $1713
  $9A26: 6F 6F 0D  RRA $0d6f
  $9A29: 0D C0 C1  ORA $c1c0
  $9A2C: 0D 0D 6C  ORA $6c0d
  $9A2F: 69 1C     ADC #$1c
  $9A31: 08        PHP
  $9A32: 6E 6C 04  ROR $046c
  $9A35: 04 69     NOP $69
  $9A37: C0 0A     CPY #$0a
  $9A39: C2 08     NOP #$08
  $9A3B: 08        PHP
  $9A3C: C3 0A     DCP ($0a,X)
  $9A3E: 04 04     NOP $04
  $9A40: 06 06     ASL $06
  $9A42: 05 08     ORA $08
  $9A44: 07 06     SLO $06
  $9A46: 04 04     NOP $04
  $9A48: 0A        ASL A
  $9A49: C2 08     NOP #$08
  $9A4B: 08        PHP
  $9A4C: C2 C3     NOP #$c3
  $9A4E: 04 04     NOP $04
  $9A50: 06 06     ASL $06
  $9A52: 05 08     ORA $08
  $9A54: 07 0A     SLO $0a
  $9A56: 04 08     NOP $08
  $9A58: 3B 3B 38  RLA $383b,Y
  $9A5B: 38        SEC
  $9A5C: 3B 3E 38  RLA $383e,Y
  $9A5F: 3C 09 0C  NOP $0c09,X
  $9A62: 0B 0E     ANC #$0e
  $9A64: 04 05     NOP $05
  $9A66: 06 07     ASL $07
  $9A68: 06 C2     ASL $c2
  $9A6A: 08        PHP
  $9A6B: 04 C3     NOP $c3
  $9A6D: 06 04     ASL $04
  $9A6F: 05 0F     ORA $0f
  $9A71: 0F 08 04  SLO $0408
  $9A74: 0F 0F 08  SLO $080f
  $9A77: 08        PHP
  $9A78: C2 C3     NOP #$c3
  $9A7A: 04 04     NOP $04
  $9A7C: 06 06     ASL $06
  $9A7E: 05 04     ORA $04
  $9A80: 07 0A     SLO $0a
  $9A82: 08        PHP
  $9A83: 04 06     NOP $06
  $9A85: C2 08     NOP #$08
  $9A87: 08        PHP
  $9A88: FF FF FF  ISB $ffff,X
  $9A8B: FF FF FF  ISB $ffff,X
  $9A8E: FF FF FF  ISB $ffff,X
  $9A91: 20 FF 22  JSR $22ff
  $9A94: 21 24     AND ($24,X)
  $9A96: 23 26     RLA ($26,X)
  $9A98: 25 FF     AND $ff
  $9A9A: 27 FF     RLA $ff
  $9A9C: FF FF FF  ISB $ffff,X
  $9A9F: FF FF FF  ISB $ffff,X
  $9AA2: FF FF FF  ISB $ffff,X
  $9AA5: FF FF FF  ISB $ffff,X
  $9AA8: C1 66     CMP ($66,X)
  $9AAA: C3 0A     DCP ($0a,X)
  $9AAC: 6C 69 06  JMP ($0669)
  $9AAF: 06 6E     ASL $6e
  $9AB1: 6C 07 06  JMP ($0607)
  $9AB4: 69 66     ADC #$66
  $9AB6: 0A        ASL A
  $9AB7: 06 C0     ASL $c0
  $9AB9: C1 C2     CMP ($c2,X)
  $9ABB: C3 6C     DCP ($6c,X)
  $9ABD: 69 06     ADC #$06
  $9ABF: 06 6E     ASL $6e
  $9AC1: 69 07     ADC #$07
  $9AC3: 0A        ASL A
  $9AC4: 66 C0     ROR $c0
  $9AC6: 06 C2     ASL $c2
  $9AC8: C1 6C     CMP ($6c,X)
  $9ACA: C3 06     DCP ($06,X)
  $9ACC: 69 6E     ADC #$6e
  $9ACE: 06 07     ASL $07
  $9AD0: 3A        NOP
  $9AD1: 3B 2D 38  RLA $382d,Y
  $9AD4: 3B 3B 38  RLA $383b,Y
  $9AD7: 37 3B     RLA $3b,X
  $9AD9: 3B 38 38  RLA $3838,Y
  $9ADC: 3B 3B 38  RLA $383b,Y
  $9ADF: 38        SEC
  $9AE0: 3E C0 3C  ROL $3cc0,X
  $9AE3: C2 C1     NOP #$c1
  $9AE5: 66 C3     ROR $c3
  $9AE7: 0A        ASL A
  $9AE8: FF FF E5  ISB $e5ff,X
  $9AEB: E5 FF     SBC $ff
  $9AED: FF E5 E5  ISB $e5e5,X
  $9AF0: FF FF E5  ISB $e5ff,X
  $9AF3: E5 FF     SBC $ff
  $9AF5: FF E5 E5  ISB $e5e5,X
  $9AF8: FF FF E5  ISB $e5ff,X
  $9AFB: E5 FF     SBC $ff
  $9AFD: FF E5 E5  ISB $e5e5,X
  $9B00: 3F 6A E5  RLA $e56a,X
  $9B03: E5 6A     SBC $6a
  $9B05: 3D E5 E5  AND $e5e5,X
  $9B08: 6A        ROR A
  $9B09: 6A        ROR A
  $9B0A: E5 E5     SBC $e5
  $9B0C: 6A        ROR A
  $9B0D: 6A        ROR A
  $9B0E: E5 E5     SBC $e5
  $9B10: 6B FF     ARR #$ff
  $9B12: E5 E5     SBC $e5
  $9B14: FF FF E5  ISB $e5ff,X
  $9B17: E5 FF     SBC $ff
  $9B19: FF 1A 1A  ISB $1a1a,X
  $9B1C: FF FF 1A  ISB $1aff,X
  $9B1F: FF FF FF  ISB $ffff,X
  $9B22: 1E 1E FF  ASL $ff1e,X
  $9B25: FF FF FF  ISB $ffff,X
  $9B28: FF FF FF  ISB $ffff,X
  $9B2B: 28        PLP
  $9B2C: FF FF 29  ISB $29ff,X
  $9B2F: 2C FF FF  BIT $ffff
  $9B32: FF FF FF  ISB $ffff,X
  $9B35: FF FF FF  ISB $ffff,X
  $9B38: 1E 1E 10  ASL $101e,X
  $9B3B: 11 1E     ORA ($1e),Y
  $9B3D: 1E 11 15  ASL $1511,X
  $9B40: FF FF FF  ISB $ffff,X
  $9B43: FF FF FF  ISB $ffff,X
  $9B46: 1E 1E FF  ASL $ff1e,X
  $9B49: FF FF 1A  ISB $1aff,X
  $9B4C: FF FF 1A  ISB $1aff,X
  $9B4F: 1A        NOP
  $9B50: FF FF 1A  ISB $1aff,X
  $9B53: 1A        NOP
  $9B54: FF FF 1A  ISB $1aff,X
  $9B57: 1A        NOP
  $9B58: 04 04     NOP $04
  $9B5A: 6C 69 05  JMP ($0569)
  $9B5D: 0D 6E 69  ORA $696e
  $9B60: 0D 0D 66  ORA $660d
  $9B63: C0 0D     CPY #$0d
  $9B65: 0D C1 6C  ORA $6cc1
  $9B68: 12        ???
  $9B69: 13 6F     SLO ($6f),Y
  $9B6B: 6F 13 17  RRA $1713
  $9B6E: 6F 6F 0D  RRA $0d6f
  $9B71: 0D C0 C1  ORA $c1c0
  $9B74: 0D 0D 6C  ORA $6c0d
  $9B77: 69 1C     ADC #$1c
  $9B79: 08        PHP
  $9B7A: 6E 6C 04  ROR $046c
  $9B7D: 04 69     NOP $69
  $9B7F: C0 08     CPY #$08
  $9B81: 08        PHP
  $9B82: C1 66     CMP ($66,X)
  $9B84: 04 04     NOP $04
  $9B86: 6C 69 05  JMP ($0569)
  $9B89: 08        PHP
  $9B8A: 6E 66 04  ROR $0466
  $9B8D: 08        PHP
  $9B8E: 6C 69 04  JMP ($0469)
  $9B91: 08        PHP
  $9B92: C0 C1     CPY #$c1
  $9B94: 08        PHP
  $9B95: 04 66     NOP $66
  $9B97: 6C 06 06  JMP ($0606)
  $9B9A: 05 08     ORA $08
  $9B9C: 07 0A     SLO $0a
  $9B9E: 04 08     NOP $08
  $9BA0: 06 C2     ASL $c2
  $9BA2: 08        PHP
  $9BA3: 04 C3     NOP $c3
  $9BA5: 06 04     ASL $04
  $9BA7: 05 0F     ORA $0f
  $9BA9: 0F 08 04  SLO $0408
  $9BAC: 0F 0F 08  SLO $080f
  $9BAF: 08        PHP
  $9BB0: C2 C3     NOP #$c3
  $9BB2: 04 04     NOP $04
  $9BB4: 06 06     ASL $06
  $9BB6: 05 04     ORA $04
  $9BB8: 07 0A     SLO $0a
  $9BBA: 08        PHP
  $9BBB: 04 06     NOP $06
  $9BBD: C2 08     NOP #$08
  $9BBF: 08        PHP
  $9BC0: C3 0A     DCP ($0a,X)
  $9BC2: 04 04     NOP $04
  $9BC4: 06 06     ASL $06
  $9BC6: 05 08     ORA $08
  $9BC8: 07 0A     SLO $0a
  $9BCA: 04 08     NOP $08
  $9BCC: 06 0A     ASL $0a
  $9BCE: 04 08     NOP $08
  $9BD0: C2 C3     NOP #$c3
  $9BD2: 08        PHP
  $9BD3: 04 0A     NOP $0a
  $9BD5: 06 04     ASL $04
  $9BD7: 05 6E     ORA $6e
  $9BD9: 69 07     ADC #$07
  $9BDB: 0A        ASL A
  $9BDC: 66 3A     ROR $3a
  $9BDE: 06 2D     ASL $2d
  $9BE0: 3B 3B 38  RLA $383b,Y
  $9BE3: 38        SEC
  $9BE4: 3B 3B 37  RLA $373b,Y
  $9BE7: 38        SEC
  $9BE8: 3B 3B 38  RLA $383b,Y
  $9BEB: 38        SEC
  $9BEC: 3B 3E 38  RLA $383e,Y
  $9BEF: 3C 6C 69  NOP $696c,X
  $9BF2: 06 06     ASL $06
  $9BF4: 6E 6C 07  ROR $076c
  $9BF7: 06 69     ASL $69
  $9BF9: C0 0A     CPY #$0a
  $9BFB: C2 C1     NOP #$c1
  $9BFD: 66 C3     ROR $c3
  $9BFF: 0A        ASL A
  $9C00: 6C 69 06  JMP ($0669)
  $9C03: 06 6E     ASL $6e
  $9C05: 66 07     ROR $07
  $9C07: 0A        ASL A
  $9C08: 6C 69 06  JMP ($0669)
  $9C0B: 0A        ASL A
  $9C0C: C0 C1     CPY #$c1
  $9C0E: C2 C3     NOP #$c3
  $9C10: 66 6C     ROR $6c
  $9C12: 0A        ASL A
  $9C13: 06 69     ASL $69
  $9C15: 6E 06 07  ROR $0706
  $9C18: FF FF E5  ISB $e5ff,X
  $9C1B: E5 FF     SBC $ff
  $9C1D: 3F E5 E5  RLA $e5e5,X
  $9C20: 6A        ROR A
  $9C21: 6A        ROR A
  $9C22: E5 E5     SBC $e5
  $9C24: 3D 6A E5  AND $e56a,X
  $9C27: E5 6A     SBC $6a
  $9C29: 6A        ROR A
  $9C2A: E5 E5     SBC $e5
  $9C2C: 6A        ROR A
  $9C2D: 6B E5     ARR #$e5
  $9C2F: E5 FF     SBC $ff
  $9C31: FF E5 E5  ISB $e5e5,X
  $9C34: FF FF E5  ISB $e5ff,X
  $9C37: E5 FF     SBC $ff
  $9C39: FF 1A 1A  ISB $1a1a,X
  $9C3C: FF FF 1A  ISB $1aff,X
  $9C3F: 1A        NOP
  $9C40: 2A        ROL A
  $9C41: 2B 1B     ANC #$1b
  $9C43: 1B 2E 2F  SLO $2f2e,Y
  $9C46: 1B 1B C1  SLO $c11b,Y
  $9C49: 6C C3 06  JMP ($06c3)
  $9C4C: 69 6E     ADC #$6e
  $9C4E: 06 07     ASL $07
  $9C50: 69 66     ADC #$66
  $9C52: 0A        ASL A
  $9C53: 06 42     ASL $42
  $9C55: 43 48     SRE ($48,X)
  $9C57: 38        SEC
  $9C58: 43 43     SRE ($43,X)
  $9C5A: 38        SEC
  $9C5B: 38        SEC
  $9C5C: 43 43     SRE ($43,X)
  $9C5E: 35 49     AND $49,X
  $9C60: 43 43     SRE ($43,X)
  $9C62: 38        SEC
  $9C63: 38        SEC
  $9C64: 43 43     SRE ($43,X)
  $9C66: 38        SEC
  $9C67: 38        SEC
  $9C68: FF FF E5  ISB $e5ff,X
  $9C6B: E5 FF     SBC $ff
  $9C6D: FF E5 E5  ISB $e5e5,X
  $9C70: FF FF E5  ISB $e5ff,X
  $9C73: E5 4A     SBC $4a
  $9C75: 4B 60     ALR #$60
  $9C77: 61 4B     ADC ($4b,X)
  $9C79: 4B 61     ALR #$61
  $9C7B: 61 1D     ADC ($1d,X)
  $9C7D: 62        ???
  $9C7E: 1F 68 4B  SLO $4b68,X
  $9C81: 4B 61     ALR #$61
  $9C83: 61 4B     ADC ($4b,X)
  $9C85: 4B 61     ALR #$61
  $9C87: 61 FF     ADC ($ff,X)
  $9C89: FF 28 29  ISB $2928,X
  $9C8C: FF FF 2C  ISB $2cff,X
  $9C8F: FF FF FF  ISB $ffff,X
  $9C92: FF FF FF  ISB $ffff,X
  $9C95: FF FF FF  ISB $ffff,X
  $9C98: 2A        ROL A
  $9C99: 2B 1B     ANC #$1b
  $9C9B: 1B 2E 2F  SLO $2f2e,Y
  $9C9E: 1B 1B FF  SLO $ff1b,Y
  $9CA1: FF 1A 1A  ISB $1a1a,X
  $9CA4: FF FF 1A  ISB $1aff,X
  $9CA7: 1A        NOP
  $9CA8: 04 08     NOP $08
  $9CAA: 0A        ASL A
  $9CAB: 06 09     ASL $09
  $9CAD: 0C 0B 30  NOP $300b
  $9CB0: 04 05     NOP $05
  $9CB2: 31 34     AND ($34),Y
  $9CB4: 04 08     NOP $08
  $9CB6: 0A        ASL A
  $9CB7: 06 20     ASL $20
  $9CB9: 21 22     AND ($22,X)
  $9CBB: 23 24     RLA ($24,X)
  $9CBD: 25 26     AND $26
  $9CBF: 27 FF     RLA $ff
  $9CC1: FF FF FF  ISB $ffff,X
  $9CC4: FF FF FF  ISB $ffff,X
  $9CC7: FF 04 08  ISB $0804,X
  $9CCA: 0A        ASL A
  $9CCB: 06 09     ASL $09
  $9CCD: 0C 30 31  NOP $3130
  $9CD0: 04 05     NOP $05
  $9CD2: 34 07     NOP $07,X
  $9CD4: 04 08     NOP $08
  $9CD6: 0A        ASL A
  $9CD7: 06 FF     ASL $ff
  $9CD9: 2A        ROL A
  $9CDA: 1A        NOP
  $9CDB: 1B 2B 2E  SLO $2e2b,Y
  $9CDE: 1B 1B 2F  SLO $2f1b,Y
  $9CE1: FF 1B 1A  ISB $1a1b,X
  $9CE4: FF FF 1A  ISB $1aff,X
  $9CE7: 1A        NOP
  $9CE8: FF FF FF  ISB $ffff,X
  $9CEB: FF FF FF  ISB $ffff,X
  $9CEE: FF FF FF  ISB $ffff,X
  $9CF1: FF FF FF  ISB $ffff,X
  $9CF4: FF 20 FF  ISB $ff20,X
  $9CF7: 22        ???
  $9CF8: 21 24     AND ($24,X)
  $9CFA: 23 26     RLA ($26,X)
  $9CFC: 25 FF     AND $ff
  $9CFE: 27 FF     RLA $ff
  $9D00: FF FF FF  ISB $ffff,X
  $9D03: FF FF FF  ISB $ffff,X
  $9D06: FF FF 04  ISB $04ff,X
  $9D09: 08        PHP
  $9D0A: 0A        ASL A
  $9D0B: 06 32     ASL $32
  $9D0D: 33 2D     RLA ($2d),Y
  $9D0F: 38        SEC
  $9D10: 33 33     RLA ($33),Y
  $9D12: 39 38 33  AND $3338,Y
  $9D15: 36 38     ROL $38,X
  $9D17: 3C 32 33  NOP $3332,X
  $9D1A: 2D 38 33  AND $3338
  $9D1D: 33 39     RLA ($39),Y
  $9D1F: 38        SEC
  $9D20: 33 36     RLA ($36),Y
  $9D22: 38        SEC
  $9D23: 3C 04 08  NOP $0804,X
  $9D26: 0A        ASL A
  $9D27: 06 FF     ASL $ff
  $9D29: FF FF 72  ISB $72ff,X
  $9D2C: 71 74     ADC ($74),Y
  $9D2E: 73 76     RRA ($76),Y
  $9D30: 75 FF     ADC $ff,X
  $9D32: FF FF FF  ISB $ffff,X
  $9D35: FF FF FF  ISB $ffff,X
  $9D38: FF 78 FF  ISB $ff78,X
  $9D3B: 7A        NOP
  $9D3C: 79 7C 7E  ADC $7e7c,Y
  $9D3F: 7E 7D 7B  ROR $7b7d,X
  $9D42: 7F D1 FF  RRA $ffd1,X
  $9D45: FF FF FF  ISB $ffff,X
  $9D48: FF D0 FF  ISB $ffd0,X
  $9D4B: FF 7E D4  ISB $d47e,X
  $9D4E: D6 77     DEC $77,X
  $9D50: D5 FF     CMP $ff,X
  $9D52: D7 FF     DCP $ff,X
  $9D54: FF FF FF  ISB $ffff,X
  $9D57: FF 51 51  ISB $5151,X
  $9D5A: 51 51     EOR ($51),Y
  $9D5C: 51 51     EOR ($51),Y
  $9D5E: 51 51     EOR ($51),Y
  $9D60: 51 54     EOR ($54),Y
  $9D62: 51 51     EOR ($51),Y
  $9D64: 52        ???
  $9D65: 53 51     SRE ($51),Y
  $9D67: 54 FF     NOP $ff,X
  $9D69: FF FF FF  ISB $ffff,X
  $9D6C: FF FF FF  ISB $ffff,X
  $9D6F: FF FF FF  ISB $ffff,X
  $9D72: FF FF FF  ISB $ffff,X
  $9D75: FF FF 20  ISB $20ff,X
  $9D78: FF FF 21  ISB $21ff,X
  $9D7B: 24 FF     BIT $ff
  $9D7D: FF 25 FF  ISB $ff25,X
  $9D80: FF FF FF  ISB $ffff,X
  $9D83: FF FF FF  ISB $ffff,X
  $9D86: FF FF FF  ISB $ffff,X
  $9D89: FF FF FF  ISB $ffff,X
  $9D8C: FF FF FF  ISB $ffff,X
  $9D8F: FF FF FF  ISB $ffff,X
  $9D92: FF FF FF  ISB $ffff,X
  $9D95: 22        ???
  $9D96: FF FF 23  ISB $23ff,X
  $9D99: 26 FF     ROL $ff
  $9D9B: FF 27 FF  ISB $ff27,X
  $9D9E: FF FF FF  ISB $ffff,X
  $9DA1: FF FF FF  ISB $ffff,X
  $9DA4: FF FF FF  ISB $ffff,X
  $9DA7: FF FF FF  ISB $ffff,X
  $9DAA: FF FF FF  ISB $ffff,X
  $9DAD: FF FF FF  ISB $ffff,X
  $9DB0: FF FF FF  ISB $ffff,X
  $9DB3: 55 FF     EOR $ff,X
  $9DB5: 55 56     EOR $56,X
  $9DB7: 57 18     SRE $18,X
  $9DB9: 18        CLC
  $9DBA: 1A        NOP
  $9DBB: 1A        NOP
  $9DBC: 18        CLC
  $9DBD: 18        CLC
  $9DBE: 1A        NOP
  $9DBF: 1A        NOP
  $9DC0: 18        CLC
  $9DC1: 18        CLC
  $9DC2: 1A        NOP
  $9DC3: 1A        NOP
  $9DC4: 18        CLC
  $9DC5: 19 1A 1B  ORA $1b1a,Y
  $9DC8: FF FF FF  ISB $ffff,X
  $9DCB: 55 FF     EOR $ff,X
  $9DCD: 55 56     EOR $56,X
  $9DCF: 57 56     SRE $56,X
  $9DD1: 57 5C     SRE $5c,X
  $9DD3: 5D 5C 5D  EOR $5d5c,X
  $9DD6: 5D 5D FF  EOR $ff5d,X
  $9DD9: FF FF 20  ISB $20ff,X
  $9DDC: FF FF 21  ISB $21ff,X
  $9DDF: 24 FF     BIT $ff
  $9DE1: FF 25 FF  ISB $ff25,X
  $9DE4: FF FF FF  ISB $ffff,X
  $9DE7: FF 5D 5D  ISB $5d5d,X
  $9DEA: 5D 5D 5D  EOR $5d5d,X
  $9DED: 5D 5D 5D  EOR $5d5d,X
  $9DF0: 5D 5D 5D  EOR $5d5d,X
  $9DF3: 5D 5D 5D  EOR $5d5d,X
  $9DF6: 5D 5D 56  EOR $565d,X
  $9DF9: 57 5C     SRE $5c,X
  $9DFB: 5D 5C 5D  EOR $5d5c,X
  $9DFE: 5D 5D 5D  EOR $5d5d,X
  $9E01: 5D 5D 5D  EOR $5d5d,X
  $9E04: 5D 5D 5D  EOR $5d5d,X
  $9E07: 5D FF 22  EOR $22ff,X
  $9E0A: FF FF 23  ISB $23ff,X
  $9E0D: 26 FF     ROL $ff
  $9E0F: FF 27 FF  ISB $ff27,X
  $9E12: FF FF FF  ISB $ffff,X
  $9E15: FF FF FF  ISB $ffff,X
  $9E18: 42        ???
  $9E19: 42        ???
  $9E1A: 48        PHA
  $9E1B: 48        PHA
  $9E1C: 42        ???
  $9E1D: 42        ???
  $9E1E: 48        PHA
  $9E1F: 48        PHA
  $9E20: 42        ???
  $9E21: 12        ???
  $9E22: 48        PHA
  $9E23: 48        PHA
  $9E24: 10 FF     BPL $9e25
  $9E26: 12        ???
  $9E27: 13 FF     SLO ($ff),Y
  $9E29: FF 01 01  ISB $0101,X
  $9E2C: FF FF 01  ISB $01ff,X
  $9E2F: 01 FF     ORA ($ff,X)
  $9E31: FF 01 01  ISB $0101,X
  $9E34: FF FF 01  ISB $01ff,X
  $9E37: 01 30     ORA ($30,X)
  $9E39: 30 32     BMI $9e6d
  $9E3B: 32        ???
  $9E3C: 30 30     BMI $9e6e
  $9E3E: 32        ???
  $9E3F: 32        ???
  $9E40: 30 30     BMI $9e72
  $9E42: 32        ???
  $9E43: 32        ???
  $9E44: 30 31     BMI $9e77
  $9E46: 32        ???
  $9E47: 33 04     RLA ($04),Y
  $9E49: 08        PHP
  $9E4A: 0A        ASL A
  $9E4B: 06 09     ASL $09
  $9E4D: 0C 0B 39  NOP $390b
  $9E50: 04 05     NOP $05
  $9E52: 06 07     ASL $07
  $9E54: 04 08     NOP $08
  $9E56: 0A        ASL A
  $9E57: 06 0F     ASL $0f
  $9E59: 0F 0F 0F  SLO $0f0f
  $9E5C: 0F 0F 0F  SLO $0f0f
  $9E5F: 0F 0F 0F  SLO $0f0f
  $9E62: 0F 0F 0F  SLO $0f0f
  $9E65: 11 0F     ORA ($0f),Y
  $9E67: 11 FF     ORA ($ff),Y
  $9E69: FF FF 4A  ISB $4aff,X
  $9E6C: 4A        LSR A
  $9E6D: 4B 61     ALR #$61
  $9E6F: FF 90 90  ISB $9090,X
  $9E72: FF FF 90  ISB $90ff,X
  $9E75: 90 FF     BCC $9e76
  $9E77: FF 90 90  ISB $9090,X
  $9E7A: FF FF 90  ISB $90ff,X
  $9E7D: 90 FF     BCC $9e7e
  $9E7F: FF 90 90  ISB $9090,X
  $9E82: FF FF 90  ISB $90ff,X
  $9E85: 90 FF     BCC $9e86
  $9E87: FF 0F 0F  ISB $0f0f,X
  $9E8A: 0F 0F 0F  SLO $0f0f
  $9E8D: 0F 0F 0F  SLO $0f0f
  $9E90: 0F 0F 0F  SLO $0f0f
  $9E93: 0F 0F 11  SLO $110f
  $9E96: 0F 60 4A  SLO $4a60
  $9E99: 61 61     ADC ($61,X)
  $9E9B: FF FF FF  ISB $ffff,X
  $9E9E: FF FF FF  ISB $ffff,X
  $9EA1: FF FF FF  ISB $ffff,X
  $9EA4: FF FF FF  ISB $ffff,X
  $9EA7: FF 4C 4C  ISB $4c4c,X
  $9EAA: FF FF 4C  ISB $4cff,X
  $9EAD: 4C FF FF  JMP $ffff
  $9EB0: 4C 4C FF  JMP $ff4c
  $9EB3: 68        PLA
  $9EB4: 62        ???
  $9EB5: 63 69     RRA ($69,X)
  $9EB7: FF FF FF  ISB $ffff,X
  $9EBA: 01 01     ORA ($01,X)
  $9EBC: FF FF 01  ISB $01ff,X
  $9EBF: 01 2A     ORA ($2a,X)
  $9EC1: 2B 2D     ANC #$2d
  $9EC3: 2D 2E 2F  AND $2f2e
  $9EC6: 2D 2D FF  AND $ff2d
  $9EC9: 15 16     ORA $16,X
  $9ECB: 17 17     SLO $17,X
  $9ECD: 43 49     SRE ($49,X)
  $9ECF: 49 43     EOR #$43
  $9ED1: 43 49     SRE ($49,X)
  $9ED3: 49 43     EOR #$43
  $9ED5: 43 49     SRE ($49,X)
  $9ED7: 49 1C     EOR #$1c
  $9ED9: 1D 1E 1F  ORA $1f1e,X
  $9EDC: 1D 1D 1F  ORA $1f1d,X
  $9EDF: 1F 1D 1D  SLO $1d1d,X
  $9EE2: 1F 1F 1D  SLO $1d1f,X
  $9EE5: 1D 1F 1F  ORA $1f1f,X
  $9EE8: 34 35     NOP $35,X
  $9EEA: 36 37     ROL $37,X
  $9EEC: 35 35     AND $35,X
  $9EEE: 37 37     RLA $37,X
  $9EF0: 35 35     AND $35,X
  $9EF2: 37 37     RLA $37,X
  $9EF4: 35 35     AND $35,X
  $9EF6: 37 37     RLA $37,X
  $9EF8: 09 0C     ORA #$0c
  $9EFA: 0B 0E     ANC #$0e
  $9EFC: 04 05     NOP $05
  $9EFE: 06 07     ASL $07
  $9F00: 04 08     NOP $08
  $9F02: 38        SEC
  $9F03: 06 09     ASL $09
  $9F05: 0C 0B 0E  NOP $0e0b
  $9F08: 90 90     BCC $9e9a
  $9F0A: FF FF 90  ISB $90ff,X
  $9F0D: 90 FF     BCC $9f0e
  $9F0F: FF 4E 4F  ISB $4f4e,X
  $9F12: FF 64 FF  ISB $ff64,X
  $9F15: FF 4F FF  ISB $ff4f,X
  $9F18: 14 0D     NOP $0d,X
  $9F1A: 14 0D     NOP $0d,X
  $9F1C: 0D 0D 0D  ORA $0d0d
  $9F1F: 0D 0D 0D  ORA $0d0d
  $9F22: 0D 0D 0D  ORA $0d0d
  $9F25: 0D 0D 0D  ORA $0d0d
  $9F28: FF FF FF  ISB $ffff,X
  $9F2B: FF FF FF  ISB $ffff,X
  $9F2E: FF FF FF  ISB $ffff,X
  $9F31: FF FF FF  ISB $ffff,X
  $9F34: 64 4F     NOP $4f
  $9F36: FF 64 14  ISB $1464,X
  $9F39: 0D 65 0D  ORA $0d65
  $9F3C: 0D 0D 0D  ORA $0d0d
  $9F3F: 0D 0D 0D  ORA $0d0d
  $9F42: 0D 0D 0D  ORA $0d0d
  $9F45: 0D 0D 0D  ORA $0d0d
  $9F48: 66 67     ROR $67
  $9F4A: FF 6C 4C  ISB $4c6c,X
  $9F4D: 4C 6D FF  JMP $ff6d
  $9F50: 4C 4C FF  JMP $ff4c
  $9F53: FF 4C 4C  ISB $4c4c,X
  $9F56: FF FF 51  ISB $51ff,X
  $9F59: 51 51     EOR ($51),Y
  $9F5B: 51 51     EOR ($51),Y
  $9F5D: 51 51     EOR ($51),Y
  $9F5F: 51 51     EOR ($51),Y
  $9F61: 51 51     EOR ($51),Y
  $9F63: 51 51     EOR ($51),Y
  $9F65: 51 51     EOR ($51),Y
  $9F67: 51 00     EOR ($00),Y
  $9F69: 00        BRK
  $9F6A: 00        BRK
  $9F6B: 00        BRK
  $9F6C: 00        BRK
  $9F6D: 00        BRK
  $9F6E: 00        BRK
  $9F6F: 00        BRK
  $9F70: 00        BRK
  $9F71: 00        BRK
  $9F72: 00        BRK
  $9F73: 00        BRK
  $9F74: 00        BRK
  $9F75: 00        BRK
  $9F76: 00        BRK
  $9F77: 00        BRK
  $9F78: 00        BRK
  $9F79: 00        BRK
  $9F7A: 22        ???
  $9F7B: 01 00     ORA ($00,X)
  $9F7D: 00        BRK
  $9F7E: 04 FF     NOP $ff
  $9F80: 00        BRK
  $9F81: 00        BRK
  $9F82: 03 05     SLO ($05,X)
  $9F84: 00        BRK
  $9F85: 00        BRK
  $9F86: 10 03     BPL $9f8b
  $9F88: 00        BRK
  $9F89: 00        BRK
  $9F8A: 11 0D     ORA ($0d),Y
  $9F8C: 00        BRK
  $9F8D: 00        BRK
  $9F8E: 14 15     NOP $15,X
  $9F90: 00        BRK
  $9F91: 00        BRK
  $9F92: 40        RTI
  $9F93: 41 00     EOR ($00,X)
  $9F95: 00        BRK
  $9F96: 44 45     NOP $45
  $9F98: 28        PLP
  $9F99: 29 08     AND #$08
  $9F9B: 09 06     ORA #$06
  $9F9D: FF FF FF  ISB $ffff,X
  $9FA0: FF FF FF  ISB $ffff,X
  $9FA3: FF FF 07  ISB $07ff,X
  $9FA6: 00        BRK
  $9FA7: 00        BRK
  $9FA8: 12        ???
  $9FA9: 13 00     SLO ($00),Y
  $9FAB: 0C 16 17  NOP $1716
  $9FAE: 1C 1D 42  NOP $421d,X
  $9FB1: 43 48     SRE ($48,X)
  $9FB3: 49 46     EOR #$46
  $9FB5: 47 18     SRE $18
  $9FB7: 19 0A FF  ORA $ff0a,Y
  $9FBA: 20 21 0E  JSR $0e21
  $9FBD: 00        BRK
  $9FBE: 24 25     BIT $25
  $9FC0: 0B 00     ANC #$00
  $9FC2: 30 00     BMI $9fc4
  $9FC4: 00        BRK
  $9FC5: 00        BRK
  $9FC6: 00        BRK
  $9FC7: 00        BRK
  $9FC8: 0F 1A 60  SLO $601a
  $9FCB: 02        ???
  $9FCC: 1A        NOP
  $9FCD: 1B 02 31  SLO $3102,Y
  $9FD0: 4A        LSR A
  $9FD1: 4B 34     ALR #$34
  $9FD3: 35 1E     AND $1e,X
  $9FD5: 1F 61 64  SLO $6461,X
  $9FD8: 02        ???
  $9FD9: 02        ???
  $9FDA: 02        ???
  $9FDB: 26 26     ROL $26
  $9FDD: 27 2C     RLA $2c
  $9FDF: 2D 32 33  AND $3332
  $9FE2: 38        SEC
  $9FE3: 39 00 37  AND $3700,Y
  $9FE6: 3C 3D 62  NOP $623d,X
  $9FE9: 63 68     RRA ($68,X)
  $9FEB: FF 36 FF  ISB $ff36,X
  $9FEE: FF FF FF  ISB $ffff,X
  $9FF1: FF FF FF  ISB $ffff,X
  $9FF4: FF FF 02  ISB $02ff,X
  $9FF7: 69 26     ADC #$26
  $9FF9: 2C 00 00  BIT $0000
  $9FFC: FF FF 00  ISB $00ff,X
  $9FFF: 00        BRK
  $A000: FF FF 00  ISB $00ff,X
  $A003: 00        BRK
  $A004: 23 FF     RLA ($ff,X)
  $A006: 00        BRK
  $A007: 00        BRK
  $A008: FF FF 00  ISB $00ff,X
  $A00B: 00        BRK
  $A00C: FF FF 00  ISB $00ff,X
  $A00F: 00        BRK
  $A010: 02        ???
  $A011: 02        ???
  $A012: 00        BRK
  $A013: 00        BRK
  $A014: 02        ???
  $A015: 02        ???
  $A016: 00        BRK
  $A017: 00        BRK
  $A018: 00        BRK
  $A019: 00        BRK
  $A01A: 22        ???
  $A01B: 50 00     BVC $a01d
  $A01D: 00        BRK
  $A01E: 00        BRK
  $A01F: 00        BRK
  $A020: 00        BRK
  $A021: 00        BRK
  $A022: 00        BRK
  $A023: 00        BRK
  $A024: 00        BRK
  $A025: 00        BRK
  $A026: 00        BRK
  $A027: 00        BRK
  $A028: 00        BRK
  $A029: 00        BRK
  $A02A: 00        BRK
  $A02B: 00        BRK
  $A02C: 00        BRK
  $A02D: 00        BRK
  $A02E: 51 15     EOR ($15),Y
  $A030: 00        BRK
  $A031: 00        BRK
  $A032: 40        RTI
  $A033: 41 00     EOR ($00,X)
  $A035: 00        BRK
  $A036: 44 45     NOP $45
  $A038: 52        ???
  $A039: 53 4C     SRE ($4c),Y
  $A03B: 4D 00 00  EOR $0000
  $A03E: 00        BRK
  $A03F: 58        CLI
  $A040: 56 00     LSR $00,X
  $A042: 00        BRK
  $A043: 00        BRK
  $A044: 00        BRK
  $A045: 00        BRK
  $A046: 00        BRK
  $A047: 00        BRK
  $A048: 00        BRK
  $A049: 00        BRK
  $A04A: 00        BRK
  $A04B: 00        BRK
  $A04C: 54 55     NOP $55,X
  $A04E: 00        BRK
  $A04F: 59 42 43  EOR $4342,Y
  $A052: 5C 49 46  NOP $4649,X
  $A055: 47 18     SRE $18
  $A057: 19 0A 4E  ORA $4e0a,Y
  $A05A: 20 65 00  JSR $0065
  $A05D: 4F 70 00  SRE $0070
  $A060: 00        BRK
  $A061: 00        BRK
  $A062: 00        BRK
  $A063: 00        BRK
  $A064: 00        BRK
  $A065: 00        BRK
  $A066: 00        BRK
  $A067: 00        BRK
  $A068: 00        BRK
  $A069: 5A        NOP
  $A06A: 71 74     ADC ($74),Y
  $A06C: 5B 5E 57  SRE $575e,Y
  $A06F: 31 4A     AND ($4a),Y
  $A071: 4B 34     ALR #$34
  $A073: 35 1E     AND $1e,X
  $A075: 1F 61 64  SLO $6461,X
  $A078: 02        ???
  $A079: 02        ???
  $A07A: 02        ???
  $A07B: 26 66     ROL $66
  $A07D: 67 2C     RRA $2c
  $A07F: FF 72 00  ISB $0072,X
  $A082: 6C 6D 00  JMP ($006d)
  $A085: 73 78     RRA ($78),Y
  $A087: 79 76 63  ADC $6376,Y
  $A08A: 7C FF 36  NOP $36ff,X
  $A08D: FF FF FF  ISB $ffff,X
  $A090: FF FF FF  ISB $ffff,X
  $A093: FF FF FF  ISB $ffff,X
  $A096: 02        ???
  $A097: 69 26     ADC #$26
  $A099: 2C 00 00  BIT $0000
  $A09C: FF FF 00  ISB $00ff,X
  $A09F: 00        BRK
  $A0A0: FF FF 00  ISB $00ff,X
  $A0A3: 00        BRK
  $A0A4: FF FF 00  ISB $00ff,X
  $A0A7: 00        BRK
  $A0A8: 00        BRK
  $A0A9: 00        BRK
  $A0AA: 22        ???
  $A0AB: 01 00     ORA ($00,X)
  $A0AD: 00        BRK
  $A0AE: 04 2A     NOP $2a
  $A0B0: 00        BRK
  $A0B1: 00        BRK
  $A0B2: 00        BRK
  $A0B3: 00        BRK
  $A0B4: 00        BRK
  $A0B5: 00        BRK
  $A0B6: 00        BRK
  $A0B7: 00        BRK
  $A0B8: 00        BRK
  $A0B9: 00        BRK
  $A0BA: 2B 0D     ANC #$0d
  $A0BC: 00        BRK
  $A0BD: 00        BRK
  $A0BE: 14 15     NOP $15,X
  $A0C0: 00        BRK
  $A0C1: 00        BRK
  $A0C2: 40        RTI
  $A0C3: 41 00     EOR ($00,X)
  $A0C5: 00        BRK
  $A0C6: 44 45     NOP $45
  $A0C8: 28        PLP
  $A0C9: 29 08     AND #$08
  $A0CB: 09 06     ORA #$06
  $A0CD: 2E FF 6F  ROL $6fff
  $A0D0: 2F 00 00  RLA $0000
  $A0D3: 00        BRK
  $A0D4: 00        BRK
  $A0D5: 00        BRK
  $A0D6: 00        BRK
  $A0D7: 00        BRK
  $A0D8: 00        BRK
  $A0D9: 3A        NOP
  $A0DA: 00        BRK
  $A0DB: FF 16 17  ISB $1716,X
  $A0DE: 1C 1D 42  NOP $421d,X
  $A0E1: 43 48     SRE ($48,X)
  $A0E3: 49 46     EOR #$46
  $A0E5: 47 18     SRE $18
  $A0E7: 19 0A FF  ORA $ff0a,Y
  $A0EA: 20 21 3B  JSR $3b21
  $A0ED: 5A        NOP
  $A0EE: 24 3F     BIT $3f
  $A0F0: 00        BRK
  $A0F1: 00        BRK
  $A0F2: 6A        ROR A
  $A0F3: 00        BRK
  $A0F4: 00        BRK
  $A0F5: 00        BRK
  $A0F6: 00        BRK
  $A0F7: 00        BRK
  $A0F8: 3E 1A 60  ROL $601a,X
  $A0FB: 02        ???
  $A0FC: 1A        NOP
  $A0FD: 1B 02 31  SLO $3102,Y
  $A100: 4A        LSR A
  $A101: 4B 34     ALR #$34
  $A103: 35 1E     AND $1e,X
  $A105: 1F 61 64  SLO $6461,X
  $A108: 02        ???
  $A109: 02        ???
  $A10A: 02        ???
  $A10B: 26 26     ROL $26
  $A10D: 27 2C     RLA $2c
  $A10F: 2D 6B 6E  AND $6e6b
  $A112: 38        SEC
  $A113: 39 00 37  AND $3700,Y
  $A116: 3C 3D 48  NOP $483d,X
  $A119: 48        PHA
  $A11A: 40        RTI
  $A11B: 40        RTI
  $A11C: 48        PHA
  $A11D: 12        ???
  $A11E: 40        RTI
  $A11F: 40        RTI
  $A120: 10 FF     BPL $a121
  $A122: 12        ???
  $A123: 10 FF     BPL $a124
  $A125: FF FF FF  ISB $ffff,X
  $A128: 42        ???
  $A129: 42        ???
  $A12A: 48        PHA
  $A12B: 48        PHA
  $A12C: 42        ???
  $A12D: 42        ???
  $A12E: 48        PHA
  $A12F: 48        PHA
  $A130: 42        ???
  $A131: 12        ???
  $A132: 48        PHA
  $A133: 48        PHA
  $A134: 10 FF     BPL $a135
  $A136: 12        ???
  $A137: 13 18     SLO ($18),Y
  $A139: 18        CLC
  $A13A: 18        CLC
  $A13B: 18        CLC
  $A13C: 18        CLC
  $A13D: 18        CLC
  $A13E: 18        CLC
  $A13F: 18        CLC
  $A140: 18        CLC
  $A141: 18        CLC
  $A142: 18        CLC
  $A143: 18        CLC
  $A144: 18        CLC
  $A145: 19 18 19  ORA $1918,Y
  $A148: FF FF FF  ISB $ffff,X
  $A14B: FF FF FF  ISB $ffff,X
  $A14E: FF FF FF  ISB $ffff,X
  $A151: FF FF FF  ISB $ffff,X
  $A154: FF 28 FF  ISB $ff28,X
  $A157: 29 FF     AND #$ff
  $A159: FF 2C FF  ISB $ff2c,X
  $A15C: FF FF FF  ISB $ffff,X
  $A15F: FF FF FF  ISB $ffff,X
  $A162: FF FF FF  ISB $ffff,X
  $A165: FF FF FF  ISB $ffff,X
  $A168: 1C 1D 1C  NOP $1c1d,X
  $A16B: 1D 1D 1D  ORA $1d1d,X
  $A16E: 1D 1D 1D  ORA $1d1d,X
  $A171: 1D 1D 1D  ORA $1d1d,X
  $A174: 1D 1D 1D  ORA $1d1d,X
  $A177: 1D FF FF  ORA $ffff,X
  $A17A: 01 01     ORA ($01,X)
  $A17C: FF FF 01  ISB $01ff,X
  $A17F: 01 FF     ORA ($ff,X)
  $A181: FF 01 01  ISB $0101,X
  $A184: 2A        ROL A
  $A185: 2B 2D     ANC #$2d
  $A187: 2D 2E 2F  AND $2f2e
  $A18A: 2D 2D FF  AND $ff2d
  $A18D: FF 01 01  ISB $0101,X
  $A190: FF FF 01  ISB $01ff,X
  $A193: 01 FF     ORA ($ff,X)
  $A195: FF 01 01  ISB $0101,X
  $A198: FF FF FF  ISB $ffff,X
  $A19B: FF FF FF  ISB $ffff,X
  $A19E: FF FF 20  ISB $20ff,X
  $A1A1: 21 22     AND ($22,X)
  $A1A3: 23 24     RLA ($24,X)
  $A1A5: 25 26     AND $26
  $A1A7: 27 FF     RLA $ff
  $A1A9: 15 16     ORA $16,X
  $A1AB: 17 17     SLO $17,X
  $A1AD: 43 49     SRE ($49,X)
  $A1AF: 49 43     EOR #$43
  $A1B1: 43 49     SRE ($49,X)
  $A1B3: 49 43     EOR #$43
  $A1B5: 43 49     SRE ($49,X)
  $A1B7: 49 FF     EOR #$ff
  $A1B9: FF FF FF  ISB $ffff,X
  $A1BC: FF 15 15  ISB $1515,X
  $A1BF: 17 17     SLO $17,X
  $A1C1: 49 41     EOR #$41
  $A1C3: 41 49     EOR ($49,X)
  $A1C5: 49 41     EOR #$41
  $A1C7: 41 06     EOR ($06,X)
  $A1C9: C2 08     NOP #$08
  $A1CB: 04 C3     NOP $c3
  $A1CD: 06 04     ASL $04
  $A1CF: 05 0F     ORA $0f
  $A1D1: 0F 08 04  SLO $0408
  $A1D4: 0F 0F 40  SLO $400f
  $A1D7: 41 C2     EOR ($c2,X)
  $A1D9: C3 41     DCP ($41,X)
  $A1DB: 41 06     EOR ($06,X)
  $A1DD: 06 41     ASL $41
  $A1DF: 41 07     EOR ($07,X)
  $A1E1: 0A        ASL A
  $A1E2: 41 41     EOR ($41,X)
  $A1E4: 06 C2     ASL $c2
  $A1E6: 41 41     EOR ($41,X)
  $A1E8: 06 06     ASL $06
  $A1EA: 41 41     EOR ($41,X)
  $A1EC: 07 0A     SLO $0a
  $A1EE: 41 41     EOR ($41,X)
  $A1F0: 06 C2     ASL $c2
  $A1F2: 41 41     EOR ($41,X)
  $A1F4: C3 06     DCP ($06,X)
  $A1F6: 41 41     EOR ($41,X)
  $A1F8: 0F 0F 41  SLO $410f
  $A1FB: 44 0F     NOP $0f
  $A1FD: 0F 08 08  SLO $0808
  $A200: C2 C3     NOP #$c3
  $A202: 04 04     NOP $04
  $A204: 06 06     ASL $06
  $A206: 05 04     ORA $04
  $A208: 43 43     SRE ($43,X)
  $A20A: 38        SEC
  $A20B: 38        SEC
  $A20C: 43 43     SRE ($43,X)
  $A20E: 38        SEC
  $A20F: 38        SEC
  $A210: 43 43     SRE ($43,X)
  $A212: 35 49     AND $49,X
  $A214: 43 43     SRE ($43,X)
  $A216: 38        SEC
  $A217: 38        SEC
  $A218: 43 46     SRE ($46,X)
  $A21A: 38        SEC
  $A21B: 4C C0 C1  JMP $c1c0
  $A21E: C2 C3     NOP #$c3
  $A220: 6C 69 06  JMP ($0669)
  $A223: 06 6E     ASL $6e
  $A225: 6C 07 06  JMP ($0607)
  $A228: 4B 4B     ALR #$4b
  $A22A: 61 61     ADC ($61,X)
  $A22C: 4B 4B     ALR #$4b
  $A22E: 61 61     ADC ($61,X)
  $A230: 1D 62 1F  ORA $1f62,X
  $A233: 68        PLA
  $A234: 4B 4B     ALR #$4b
  $A236: 61 61     ADC ($61,X)
  $A238: 4B 4E     ALR #$4e
  $A23A: 61 64     ADC ($64,X)
  $A23C: FF FF E5  ISB $e5ff,X
  $A23F: E5 FF     SBC $ff
  $A241: FF E5 E5  ISB $e5e5,X
  $A244: FF FF E5  ISB $e5ff,X
  $A247: E5 08     SBC $08
  $A249: 04 66     NOP $66
  $A24B: 6C 08 04  JMP ($0408)
  $A24E: 69 C0     ADC #$c0
  $A250: 08        PHP
  $A251: 08        PHP
  $A252: C1 66     CMP ($66,X)
  $A254: 04 04     NOP $04
  $A256: 6C 69 05  JMP ($0569)
  $A259: 04 6E     NOP $6e
  $A25B: 6C 08 04  JMP ($0408)
  $A25E: 69 66     ADC #$66
  $A260: 08        PHP
  $A261: 08        PHP
  $A262: C0 C1     CPY #$c1
  $A264: 04 04     NOP $04
  $A266: 6C 69 05  JMP ($0569)
  $A269: 08        PHP
  $A26A: 6E 69 04  ROR $0469
  $A26D: 08        PHP
  $A26E: 66 C0     ROR $c0
  $A270: 08        PHP
  $A271: 04 C1     NOP $c1
  $A273: 6C 04 05  JMP ($0504)
  $A276: 69 6E     ADC #$6e
  $A278: 08        PHP
  $A279: 04 69     NOP $69
  $A27B: 66 08     ROR $08
  $A27D: 08        PHP
  $A27E: C0 C1     CPY #$c1
  $A280: 04 04     NOP $04
  $A282: 6C 69 05  JMP ($0569)
  $A285: 08        PHP
  $A286: 6E 6C 0A  ROR $0a6c
  $A289: 06 08     ASL $08
  $A28B: 04 0A     NOP $0a
  $A28D: C2 08     NOP #$08
  $A28F: 08        PHP
  $A290: C3 0A     DCP ($0a,X)
  $A292: 04 04     NOP $04
  $A294: 06 06     ASL $06
  $A296: 05 08     ORA $08
  $A298: 07 06     SLO $06
  $A29A: 04 04     NOP $04
  $A29C: 0A        ASL A
  $A29D: 06 08     ASL $08
  $A29F: 08        PHP
  $A2A0: C2 C3     NOP #$c3
  $A2A2: 04 04     NOP $04
  $A2A4: 06 06     ASL $06
  $A2A6: 05 08     ORA $08
  $A2A8: 07 0A     SLO $0a
  $A2AA: 04 08     NOP $08
  $A2AC: 06 C2     ASL $c2
  $A2AE: 08        PHP
  $A2AF: 04 C3     NOP $c3
  $A2B1: 06 04     ASL $04
  $A2B3: 05 06     ORA $06
  $A2B5: 07 40     SLO $40
  $A2B7: 41 0A     EOR ($0a,X)
  $A2B9: 06 41     ASL $41
  $A2BB: 41 C2     EOR ($c2,X)
  $A2BD: C3 41     DCP ($41,X)
  $A2BF: 41 06     EOR ($06,X)
  $A2C1: 06 41     ASL $41
  $A2C3: 41 07     EOR ($07,X)
  $A2C5: 0A        ASL A
  $A2C6: 41 41     EOR ($41,X)
  $A2C8: 69 C0     ADC #$c0
  $A2CA: 0A        ASL A
  $A2CB: C2 C1     NOP #$c1
  $A2CD: 66 C3     ROR $c3
  $A2CF: 0A        ASL A
  $A2D0: 6C 69 06  JMP ($0669)
  $A2D3: 06 6E     ASL $6e
  $A2D5: 6C 07 06  JMP ($0607)
  $A2D8: 69 66     ADC #$66
  $A2DA: 0A        ASL A
  $A2DB: 06 C0     ASL $c0
  $A2DD: C1 C2     CMP ($c2,X)
  $A2DF: C3 6C     DCP ($6c,X)
  $A2E1: 69 06     ADC #$06
  $A2E3: 06 6E     ASL $6e
  $A2E5: 69 07     ADC #$07
  $A2E7: 0A        ASL A
  $A2E8: 66 C0     ROR $c0
  $A2EA: 06 C2     ASL $c2
  $A2EC: C1 6C     CMP ($6c,X)
  $A2EE: C3 06     DCP ($06,X)
  $A2F0: 69 6E     ADC #$6e
  $A2F2: 06 07     ASL $07
  $A2F4: 42        ???
  $A2F5: 43 48     SRE ($48,X)
  $A2F7: 38        SEC
  $A2F8: 08        PHP
  $A2F9: 08        PHP
  $A2FA: C0 C1     CPY #$c1
  $A2FC: 04 04     NOP $04
  $A2FE: 6C 69 05  JMP ($0569)
  $A301: 08        PHP
  $A302: 6E 69 04  ROR $0469
  $A305: 08        PHP
  $A306: 66 C0     ROR $c0
  $A308: 08        PHP
  $A309: 04 C1     NOP $c1
  $A30B: 6C 04 05  JMP ($0504)
  $A30E: 69 6E     ADC #$6e
  $A310: 08        PHP
  $A311: 04 69     NOP $69
  $A313: 66 08     ROR $08
  $A315: 08        PHP
  $A316: C0 C1     CPY #$c1
  $A318: 04 04     NOP $04
  $A31A: 6C 69 05  JMP ($0569)
  $A31D: 08        PHP
  $A31E: 6E 6C 04  ROR $046c
  $A321: 04 69     NOP $69
  $A323: C0 08     CPY #$08
  $A325: 08        PHP
  $A326: C1 66     CMP ($66,X)
  $A328: 04 04     NOP $04
  $A32A: 6C 69 05  JMP ($0569)
  $A32D: 08        PHP
  $A32E: 6E 66 04  ROR $0466
  $A331: 08        PHP
  $A332: 6C 69 04  JMP ($0469)
  $A335: 08        PHP
  $A336: C0 C1     CPY #$c1
  $A338: C2 C3     NOP #$c3
  $A33A: 41 41     EOR ($41,X)
  $A33C: 06 06     ASL $06
  $A33E: 41 41     EOR ($41,X)
  $A340: 07 0A     SLO $0a
  $A342: 41 41     EOR ($41,X)
  $A344: 06 C2     ASL $c2
  $A346: 41 41     EOR ($41,X)
  $A348: C3 06     DCP ($06,X)
  $A34A: 41 44     EOR ($44,X)
  $A34C: 06 07     ASL $07
  $A34E: 08        PHP
  $A34F: 04 0A     NOP $0a
  $A351: 06 08     ASL $08
  $A353: 08        PHP
  $A354: C2 C3     NOP #$c3
  $A356: 04 04     NOP $04
  $A358: 06 06     ASL $06
  $A35A: 05 04     ORA $04
  $A35C: 07 0A     SLO $0a
  $A35E: 08        PHP
  $A35F: 04 06     NOP $06
  $A361: C2 08     NOP #$08
  $A363: 08        PHP
  $A364: C3 0A     DCP ($0a,X)
  $A366: 04 04     NOP $04
  $A368: 06 06     ASL $06
  $A36A: 05 08     ORA $08
  $A36C: 07 0A     SLO $0a
  $A36E: 04 08     NOP $08
  $A370: 06 0A     ASL $0a
  $A372: 04 08     NOP $08
  $A374: C2 C3     NOP #$c3
  $A376: 08        PHP
  $A377: 04 43     NOP $43
  $A379: 46 38     LSR $38
  $A37B: 4C 69 66  JMP $6669
  $A37E: 0A        ASL A
  $A37F: 06 C0     ASL $c0
  $A381: C1 C2     CMP ($c2,X)
  $A383: C3 6C     DCP ($6c,X)
  $A385: 69 06     ADC #$06
  $A387: 06 6E     ASL $6e
  $A389: 6C 07 06  JMP ($0607)
  $A38C: 69 C0     ADC #$c0
  $A38E: 0A        ASL A
  $A38F: C2 C1     NOP #$c1
  $A391: 66 C3     ROR $c3
  $A393: 0A        ASL A
  $A394: 6C 69 06  JMP ($0669)
  $A397: 06 6E     ASL $6e
  $A399: 66 07     ROR $07
  $A39B: 0A        ASL A
  $A39C: 6C 69 06  JMP ($0669)
  $A39F: 0A        ASL A
  $A3A0: C0 C1     CPY #$c1
  $A3A2: C2 C3     NOP #$c3
  $A3A4: 66 6C     ROR $6c
  $A3A6: 0A        ASL A
  $A3A7: 06 07     ASL $07
  $A3A9: 0A        ASL A
  $A3AA: 04 08     NOP $08
  $A3AC: 06 C2     ASL $c2
  $A3AE: 08        PHP
  $A3AF: 04 C3     NOP $c3
  $A3B1: 06 04     ASL $04
  $A3B3: 05 06     ORA $06
  $A3B5: 07 08     SLO $08
  $A3B7: 04 0A     NOP $0a
  $A3B9: 06 08     ASL $08
  $A3BB: 08        PHP
  $A3BC: C2 C3     NOP #$c3
  $A3BE: 04 04     NOP $04
  $A3C0: 06 06     ASL $06
  $A3C2: 05 04     ORA $04
  $A3C4: 07 0A     SLO $0a
  $A3C6: 08        PHP
  $A3C7: 04 66     NOP $66
  $A3C9: C0 06     CPY #$06
  $A3CB: C2 C1     NOP #$c1
  $A3CD: 6C C3 06  JMP ($06c3)
  $A3D0: 3A        NOP
  $A3D1: 3B 2D 38  RLA $382d,Y
  $A3D4: 3B 3B 38  RLA $383b,Y
  $A3D7: 37 3B     RLA $3b,X
  $A3D9: 3B 38 38  RLA $3838,Y
  $A3DC: 3B 3B 38  RLA $383b,Y
  $A3DF: 38        SEC
  $A3E0: 3E 6C 3C  ROL $3c6c,X
  $A3E3: 06 69     ASL $69
  $A3E5: C0 0A     CPY #$0a
  $A3E7: C2 C2     NOP #$c2
  $A3E9: C3 04     DCP ($04,X)
  $A3EB: 04 06     NOP $06
  $A3ED: 06 05     ASL $05
  $A3EF: 08        PHP
  $A3F0: 07 0A     SLO $0a
  $A3F2: 04 08     NOP $08
  $A3F4: 06 C2     ASL $c2
  $A3F6: 08        PHP
  $A3F7: 04 C3     NOP $c3
  $A3F9: 06 04     ASL $04
  $A3FB: 05 06     ORA $06
  $A3FD: 07 08     SLO $08
  $A3FF: 04 0A     NOP $0a
  $A401: 06 08     ASL $08
  $A403: 08        PHP
  $A404: C2 C3     NOP #$c3
  $A406: 04 04     NOP $04
  $A408: 6C 69 06  JMP ($0669)
  $A40B: 06 6E     ASL $6e
  $A40D: 3A        NOP
  $A40E: 07 2D     SLO $2d
  $A410: 3B 3B 38  RLA $383b,Y
  $A413: 38        SEC
  $A414: 3B 3B 37  RLA $373b,Y
  $A417: 38        SEC
  $A418: 3B 3B 38  RLA $383b,Y
  $A41B: 38        SEC
  $A41C: 3B 3E 38  RLA $383e,Y
  $A41F: 3C C0 C1  NOP $c1c0,X
  $A422: C2 C3     NOP #$c3
  $A424: 6C 69 06  JMP ($0669)
  $A427: 06 DD     ASL $dd
  $A429: DF DF DD  DCP $dddf,X
  $A42C: DD DF DF  CMP $dfdf,X
  $A42F: DD DD DF  CMP $dfdd,X
  $A432: DF DD DD  DCP $dddd,X
  $A435: DF DF DD  DCP $dddf,X
  $A438: DD DF DF  CMP $dfdf,X
  $A43B: DD DD DF  CMP $dfdd,X
  $A43E: DF DD DD  DCP $dddd,X
  $A441: DF DF F4  DCP $f4df,X
  $A444: DD DF F5  CMP $f5df,X
  $A447: FA        NOP
  $A448: DD DF 00  CMP $00df,X
  $A44B: FB DD DF  ISB $dfdd,Y
  $A44E: FE DD DD  INC $dddd,X
  $A451: DF DF DD  DCP $dddf,X
  $A454: DD DF DF  CMP $dfdf,X
  $A457: DD 04 04  CMP $0404,X
  $A45A: 6C 69 05  JMP ($0569)
  $A45D: 04 6E     NOP $6e
  $A45F: 6C 08 04  JMP ($0408)
  $A462: 69 66     ADC #$66
  $A464: 08        PHP
  $A465: 08        PHP
  $A466: C0 C1     CPY #$c1
  $A468: 04 04     NOP $04
  $A46A: 6C 69 05  JMP ($0569)
  $A46D: 08        PHP
  $A46E: 6E 69 04  ROR $0469
  $A471: 08        PHP
  $A472: 66 C0     ROR $c0
  $A474: 08        PHP
  $A475: 04 C1     NOP $c1
  $A477: 6C 04 05  JMP ($0504)
  $A47A: 69 6E     ADC #$6e
  $A47C: 08        PHP
  $A47D: 04 69     NOP $69
  $A47F: 66 08     ROR $08
  $A481: 08        PHP
  $A482: C0 C1     CPY #$c1
  $A484: 04 04     NOP $04
  $A486: 6C 69 05  JMP ($0569)
  $A489: 08        PHP
  $A48A: 6E 6C 04  ROR $046c
  $A48D: 04 69     NOP $69
  $A48F: C0 08     CPY #$08
  $A491: 08        PHP
  $A492: C1 66     CMP ($66,X)
  $A494: 04 04     NOP $04
  $A496: 6C 69 06  JMP ($0669)
  $A499: 06 05     ASL $05
  $A49B: 08        PHP
  $A49C: 07 06     SLO $06
  $A49E: 04 04     NOP $04
  $A4A0: 0A        ASL A
  $A4A1: 06 08     ASL $08
  $A4A3: 08        PHP
  $A4A4: C2 C3     NOP #$c3
  $A4A6: 04 04     NOP $04
  $A4A8: 06 07     ASL $07
  $A4AA: 08        PHP
  $A4AB: 04 0A     NOP $0a
  $A4AD: 06 08     ASL $08
  $A4AF: 08        PHP
  $A4B0: C2 C3     NOP #$c3
  $A4B2: 04 04     NOP $04
  $A4B4: 06 06     ASL $06
  $A4B6: 05 04     ORA $04
  $A4B8: 6E 6C 07  ROR $076c
  $A4BB: 06 69     ASL $69
  $A4BD: 66 0A     ROR $0a
  $A4BF: 06 C0     ASL $c0
  $A4C1: C1 C2     CMP ($c2,X)
  $A4C3: C3 6C     DCP ($6c,X)
  $A4C5: 69 06     ADC #$06
  $A4C7: 06 6E     ASL $6e
  $A4C9: 69 07     ADC #$07
  $A4CB: 0A        ASL A
  $A4CC: 66 C0     ROR $c0
  $A4CE: 06 C2     ASL $c2
  $A4D0: C1 6C     CMP ($6c,X)
  $A4D2: C3 06     DCP ($06,X)
  $A4D4: 69 6E     ADC #$6e
  $A4D6: 06 07     ASL $07
  $A4D8: 69 66     ADC #$66
  $A4DA: 0A        ASL A
  $A4DB: 06 C0     ASL $c0
  $A4DD: C1 C2     CMP ($c2,X)
  $A4DF: C3 6C     DCP ($6c,X)
  $A4E1: 69 06     ADC #$06
  $A4E3: 06 6E     ASL $6e
  $A4E5: 6C 07 06  JMP ($0607)
  $A4E8: FF FF FF  ISB $ffff,X
  $A4EB: FF FF FF  ISB $ffff,X
  $A4EE: FF FF FF  ISB $ffff,X
  $A4F1: FF FF FF  ISB $ffff,X
  $A4F4: FF FF FF  ISB $ffff,X
  $A4F7: FF FF FF  ISB $ffff,X
  $A4FA: FF FF FF  ISB $ffff,X
  $A4FD: FF FF FF  ISB $ffff,X
  $A500: FF FF FF  ISB $ffff,X
  $A503: FF 20 21  ISB $2120,X
  $A506: 22        ???
  $A507: 23 24     RLA ($24,X)
  $A509: 25 26     AND $26
  $A50B: 27 FF     RLA $ff
  $A50D: FF FF FF  ISB $ffff,X
  $A510: FF FF FF  ISB $ffff,X
  $A513: FF FF FF  ISB $ffff,X
  $A516: FF FF 08  ISB $08ff,X
  $A519: 04 C1     NOP $c1
  $A51B: 6C C8 C9  JMP ($c9c8)
  $A51E: CA        DEX
  $A51F: CB 08     AXS #$08
  $A521: 04 69     NOP $69
  $A523: 66 08     ROR $08
  $A525: 08        PHP
  $A526: C0 C1     CPY #$c1
  $A528: C3 06     DCP ($06,X)
  $A52A: 04 05     NOP $05
  $A52C: CC 07 C4  CPY $c407
  $A52F: 04 0A     NOP $0a
  $A531: 06 08     ASL $08
  $A533: 08        PHP
  $A534: C2 C3     NOP #$c3
  $A536: 04 04     NOP $04
  $A538: 6C 69 06  JMP ($0669)
  $A53B: 06 6E     ASL $6e
  $A53D: 69 07     ADC #$07
  $A53F: 0A        ASL A
  $A540: 66 C0     ROR $c0
  $A542: 06 C2     ASL $c2
  $A544: C1 6C     CMP ($6c,X)
  $A546: C3 06     DCP ($06,X)
  $A548: 69 6E     ADC #$6e
  $A54A: 06 07     ASL $07
  $A54C: C6 66     DEC $66
  $A54E: CC 06 C0  CPY $c006
  $A551: C1 C2     CMP ($c2,X)
  $A553: C3 6C     DCP ($6c,X)
  $A555: 69 06     ADC #$06
  $A557: 06 FF     ASL $ff
  $A559: FF FF FF  ISB $ffff,X
  $A55C: CE FF CE  DEC $ceff
  $A55F: FF FF FF  ISB $ffff,X
  $A562: FF FF FF  ISB $ffff,X
  $A565: FF FF FF  ISB $ffff,X
  $A568: FF FF FF  ISB $ffff,X
  $A56B: C7 CF     DCP $cf
  $A56D: E5 FF     SBC $ff
  $A56F: FF E5 E5  ISB $e5e5,X
  $A572: 01 FF     ORA ($ff,X)
  $A574: E5 E5     SBC $e5
  $A576: FF FF E5  ISB $e5ff,X
  $A579: E5 FF     SBC $ff
  $A57B: FF E5 E5  ISB $e5e5,X
  $A57E: FF FF E5  ISB $e5ff,X
  $A581: E5 FF     SBC $ff
  $A583: FF E5 E5  ISB $e5e5,X
  $A586: FF FF FF  ISB $ffff,X
  $A589: FF FF FF  ISB $ffff,X
  $A58C: FF FF FF  ISB $ffff,X
  $A58F: FF FF FF  ISB $ffff,X
  $A592: FF FF FF  ISB $ffff,X
  $A595: FF FF C7  ISB $c7ff,X
  $A598: 63 A3     RRA ($a3,X)
  $A59A: FF FF 16  ISB $16ff,X
  $A59D: 14 FF     NOP $ff,X
  $A59F: FF FF FF  ISB $ffff,X
  $A5A2: FF FF FF  ISB $ffff,X
  $A5A5: FF FF FF  ISB $ffff,X
  $A5A8: 05 08     ORA $08
  $A5AA: 6E 69 04  ROR $0469
  $A5AD: 08        PHP
  $A5AE: 66 C0     ROR $c0
  $A5B0: 08        PHP
  $A5B1: 04 C1     NOP $c1
  $A5B3: 6C C8 C9  JMP ($c9c8)
  $A5B6: CA        DEX
  $A5B7: CB 07     AXS #$07
  $A5B9: 0A        ASL A
  $A5BA: 04 08     NOP $08
  $A5BC: 06 C2     ASL $c2
  $A5BE: 08        PHP
  $A5BF: 04 C3     NOP $c3
  $A5C1: 06 04     ASL $04
  $A5C3: 05 CC     ORA $cc
  $A5C5: 07 C4     SLO $c4
  $A5C7: 04 66     NOP $66
  $A5C9: C0 06     CPY #$06
  $A5CB: C2 C1     NOP #$c1
  $A5CD: 6C C3 06  JMP ($06c3)
  $A5D0: 69 6E     ADC #$6e
  $A5D2: 06 07     ASL $07
  $A5D4: C6 66     DEC $66
  $A5D6: CC 06 C0  CPY $c006
  $A5D9: C1 C2     CMP ($c2,X)
  $A5DB: C3 6C     DCP ($6c,X)
  $A5DD: 69 06     ADC #$06
  $A5DF: 06 6E     ASL $6e
  $A5E1: 6C 07 06  JMP ($0607)
  $A5E4: 69 C0     ADC #$c0
  $A5E6: 0A        ASL A
  $A5E7: C2 FF     NOP #$ff
  $A5E9: FF FF FF  ISB $ffff,X
  $A5EC: FF FF FF  ISB $ffff,X
  $A5EF: FF FF FF  ISB $ffff,X
  $A5F2: FF FF CE  ISB $ceff,X
  $A5F5: FF CE FF  ISB $ffce,X
  $A5F8: E5 E5     SBC $e5
  $A5FA: FF FF E5  ISB $e5ff,X
  $A5FD: E5 FF     SBC $ff
  $A5FF: E3 E5     ISB ($e5,X)
  $A601: E5 FF     SBC $ff
  $A603: FF CE FF  ISB $ffce,X
  $A606: CD FF FF  CMP $ffff
  $A609: FF FF FF  ISB $ffff,X
  $A60C: FF FF FF  ISB $ffff,X
  $A60F: FF A1 A2  ISB $a2a1,X
  $A612: FF FF A3  ISB $a3ff,X
  $A615: A9 FF     LDA #$ff
  $A617: FF FF FF  ISB $ffff,X
  $A61A: CD FF FF  CMP $ffff
  $A61D: FF FF FF  ISB $ffff,X
  $A620: FF FF FF  ISB $ffff,X
  $A623: FF FF FF  ISB $ffff,X
  $A626: FF FF FF  ISB $ffff,X
  $A629: FF FF FF  ISB $ffff,X
  $A62C: FF FF FF  ISB $ffff,X
  $A62F: FF FF FF  ISB $ffff,X
  $A632: FF 20 FF  ISB $ff20,X
  $A635: FF 21 24  ISB $2421,X
  $A638: FF FF 25  ISB $25ff,X
  $A63B: FF FF FF  ISB $ffff,X
  $A63E: FF FF FF  ISB $ffff,X
  $A641: FF FF FF  ISB $ffff,X
  $A644: FF FF FF  ISB $ffff,X
  $A647: FF FF FF  ISB $ffff,X
  $A64A: FF FF FF  ISB $ffff,X
  $A64D: FF FF FF  ISB $ffff,X
  $A650: FF 22 FF  ISB $ff22,X
  $A653: FF 23 26  ISB $2623,X
  $A656: FF FF 27  ISB $27ff,X
  $A659: FF FF FF  ISB $ffff,X
  $A65C: FF FF FF  ISB $ffff,X
  $A65F: FF FF FF  ISB $ffff,X
  $A662: FF FF FF  ISB $ffff,X
  $A665: FF FF FF  ISB $ffff,X
  $A668: 50 FF     BVC $a669
  $A66A: 52        ???
  $A66B: 53 FF     SRE ($ff),Y
  $A66D: FF 50 FF  ISB $ff50,X
  $A670: FF FF FF  ISB $ffff,X
  $A673: FF FF FF  ISB $ffff,X
  $A676: FF FF 51  ISB $51ff,X
  $A679: 54 51     NOP $51,X
  $A67B: 51 52     EOR ($52),Y
  $A67D: 53 51     SRE ($51),Y
  $A67F: 54 50     NOP $50,X
  $A681: FF 52 53  ISB $5352,X
  $A684: FF FF 50  ISB $50ff,X
  $A687: FF FF FF  ISB $ffff,X
  $A68A: FF FF 20  ISB $20ff,X
  $A68D: 25 22     AND $22
  $A68F: 23 20     RLA ($20,X)
  $A691: 21 26     AND ($26,X)
  $A693: 23 24     RLA ($24,X)
  $A695: 25 26     AND $26
  $A697: 27 FF     RLA $ff
  $A699: FF FF FF  ISB $ffff,X
  $A69C: 28        PLP
  $A69D: 29 2A     AND #$2a
  $A69F: 2B 2C     ANC #$2c
  $A6A1: FF 2E 2F  ISB $2f2e,X
  $A6A4: FF FF FF  ISB $ffff,X
  $A6A7: FF FF 29  ISB $29ff,X
  $A6AA: FF 22 2B  ISB $2b22,X
  $A6AD: 2E 23 26  ROL $2623
  $A6B0: 23 2E     RLA ($2e,X)
  $A6B2: 27 22     RLA $22
  $A6B4: 24 25     BIT $25
  $A6B6: 26 27     ROL $27
  $A6B8: 04 04     NOP $04
  $A6BA: 06 06     ASL $06
  $A6BC: 08        PHP
  $A6BD: 09 0A     ORA #$0a
  $A6BF: 0B 0C     ANC #$0c
  $A6C1: 04 0E     NOP $0e
  $A6C3: 06 08     ASL $08
  $A6C5: 05 06     ORA $06
  $A6C7: 07 28     SLO $28
  $A6C9: 29 2A     AND #$2a
  $A6CB: 2B 24     ANC #$24
  $A6CD: 25 2E     AND $2e
  $A6CF: 2E FF FF  ROL $ffff
  $A6D2: 2F 20 FF  RLA $ff20
  $A6D5: FF 25 FF  ISB $ff25,X
  $A6D8: FF 28 28  ISB $2828,X
  $A6DB: 29 29     AND #$29
  $A6DD: 2C 2B 2E  BIT $2e2b
  $A6E0: FF FF 2C  ISB $2cff,X
  $A6E3: FF FF FF  ISB $ffff,X
  $A6E6: FF FF FF  ISB $ffff,X
  $A6E9: FF 1E FF  ISB $ff1e,X
  $A6EC: FF FF 1A  ISB $1aff,X
  $A6EF: 1A        NOP
  $A6F0: FF FF 1A  ISB $1aff,X
  $A6F3: 1A        NOP
  $A6F4: FF FF 1A  ISB $1aff,X
  $A6F7: 1A        NOP
  $A6F8: 00        BRK
  $A6F9: 00        BRK
  $A6FA: 00        BRK
  $A6FB: 00        BRK
  $A6FC: 00        BRK
  $A6FD: 00        BRK
  $A6FE: FF FF 00  ISB $00ff,X
  $A701: 00        BRK
  $A702: FD 02 00  SBC $0002,X
  $A705: 00        BRK
  $A706: 03 FA     SLO ($fa,X)
  $A708: 00        BRK
  $A709: 00        BRK
  $A70A: FB FA 00  ISB $00fa,Y
  $A70D: 00        BRK
  $A70E: FB FA 00  ISB $00fa,Y
  $A711: 00        BRK
  $A712: FB FA 00  ISB $00fa,Y
  $A715: 00        BRK
  $A716: 00        BRK
  $A717: 00        BRK
  $A718: 00        BRK
  $A719: 00        BRK
  $A71A: 00        BRK
  $A71B: 00        BRK
  $A71C: FF FF FF  ISB $ffff,X
  $A71F: FF FD 02  ISB $02fd,X
  $A722: FD 02 03  SBC $0302,X
  $A725: FF 03 FA  ISB $fa03,X
  $A728: 01 FF     ORA ($ff,X)
  $A72A: FB FA 01  ISB $01fa,Y
  $A72D: FF FB FA  ISB $fafb,X
  $A730: 01 FF     ORA ($ff,X)
  $A732: FB FA 00  ISB $00fa,Y
  $A735: 00        BRK
  $A736: 00        BRK
  $A737: 00        BRK
  $A738: 00        BRK
  $A739: 00        BRK
  $A73A: 00        BRK
  $A73B: 00        BRK
  $A73C: 00        BRK
  $A73D: 00        BRK
  $A73E: FB FA 00  ISB $00fa,Y
  $A741: 00        BRK
  $A742: FB FA 00  ISB $00fa,Y
  $A745: 00        BRK
  $A746: FB FA 00  ISB $00fa,Y
  $A749: 00        BRK
  $A74A: FB 03 00  ISB $0003,Y
  $A74D: 00        BRK
  $A74E: 02        ???
  $A74F: FC 00 00  NOP $0000,X
  $A752: FF FF 00  ISB $00ff,X
  $A755: 00        BRK
  $A756: 00        BRK
  $A757: 00        BRK
  $A758: 00        BRK
  $A759: 00        BRK
  $A75A: 00        BRK
  $A75B: 00        BRK
  $A75C: 01 FF     ORA ($ff,X)
  $A75E: FB FA 01  ISB $01fa,Y
  $A761: FF FB FA  ISB $fafb,X
  $A764: 01 FF     ORA ($ff,X)
  $A766: FB FA 01  ISB $01fa,Y
  $A769: 03 FB     SLO ($fb,X)
  $A76B: 03 02     SLO ($02,X)
  $A76D: FC 02 FC  NOP $fc02,X
  $A770: FF FF FF  ISB $ffff,X
  $A773: FF 00 00  ISB $0000,X
  $A776: 00        BRK
  $A777: 00        BRK
  $A778: FF FF FF  ISB $ffff,X
  $A77B: FF FF FF  ISB $ffff,X
  $A77E: FF FF FF  ISB $ffff,X
  $A781: FF FF FF  ISB $ffff,X
  $A784: FA        NOP
  $A785: FB FA FB  ISB $fbfa,Y
  $A788: FE FD FD  INC $fdfd,X
  $A78B: FE FE FD  INC $fdfe,X
  $A78E: FD FE FE  SBC $fefe,X
  $A791: FD FD FE  SBC $fefd,X
  $A794: FE FD FD  INC $fdfd,X
  $A797: FE F8 F9  INC $f9f8,X
  $A79A: F9 F8 F8  SBC $f8f8,Y
  $A79D: F9 F9 F8  SBC $f8f9,Y
  $A7A0: F8        SED
  $A7A1: F9 F9 F8  SBC $f8f9,Y
  $A7A4: F8        SED
  $A7A5: F9 F9 F8  SBC $f8f9,Y
  $A7A8: FC F7 FC  NOP $fcf7,X
  $A7AB: F7 FF     ISB $ff,X
  $A7AD: FF FF FF  ISB $ffff,X
  $A7B0: FF FF FF  ISB $ffff,X
  $A7B3: FF FF FF  ISB $ffff,X
  $A7B6: FF FF A0  ISB $a0ff,X
  $A7B9: A0 A2     LDY #$a2
  $A7BB: A2 A0     LDX #$a0
  $A7BD: A0 A2     LDY #$a2
  $A7BF: A2 A0     LDX #$a0
  $A7C1: A0 A2     LDY #$a2
  $A7C3: A2 A0     LDX #$a0
  $A7C5: A0 A2     LDY #$a2
  $A7C7: A2 A8     LDX #$a8
  $A7C9: A8        TAY
  $A7CA: A2 A2     LDX #$a2
  $A7CC: A8        TAY
  $A7CD: A8        TAY
  $A7CE: A2 A2     LDX #$a2
  $A7D0: A8        TAY
  $A7D1: A8        TAY
  $A7D2: A2 A2     LDX #$a2
  $A7D4: A8        TAY
  $A7D5: A8        TAY
  $A7D6: A2 A2     LDX #$a2
  $A7D8: AA        TAX
  $A7D9: AA        TAX
  $A7DA: A1 A1     LDA ($a1,X)
  $A7DC: AA        TAX
  $A7DD: AA        TAX
  $A7DE: A1 A1     LDA ($a1,X)
  $A7E0: AA        TAX
  $A7E1: AA        TAX
  $A7E2: A1 A1     LDA ($a1,X)
  $A7E4: AA        TAX
  $A7E5: AA        TAX
  $A7E6: A1 A1     LDA ($a1,X)
  $A7E8: A3 A3     LAX ($a3,X)
  $A7EA: A9 A9     LDA #$a9
  $A7EC: A3 A3     LAX ($a3,X)
  $A7EE: A9 A9     LDA #$a9
  $A7F0: A3 A3     LAX ($a3,X)
  $A7F2: A9 A9     LDA #$a9
  $A7F4: A3 A3     LAX ($a3,X)
  $A7F6: A9 A9     LDA #$a9
  $A7F8: AB AB     ATX #$ab
  $A7FA: A4 A4     LDY $a4
  $A7FC: AB AB     ATX #$ab
  $A7FE: A4 A4     LDY $a4
  $A800: AB AB     ATX #$ab
  $A802: A4 A4     LDY $a4
  $A804: AB AB     ATX #$ab
  $A806: A4 A4     LDY $a4
  $A808: A6 A6     LDX $a6
  $A80A: AC AC A6  LDY $a6ac
  $A80D: A6 AC     LDX $ac
  $A80F: AC A6 A6  LDY $a6a6
  $A812: AC AC A6  LDY $a6ac
  $A815: A6 AC     LDX $ac
  $A817: AC AE AE  LDY $aeae
  $A81A: A5 A5     LDA $a5
  $A81C: AE AE A5  LDX $a5ae
  $A81F: A5 AE     LDA $ae
  $A821: AE A5 A5  LDX $a5a5
  $A824: AE AE A5  LDX $a5ae
  $A827: A5 FF     LDA $ff
  $A829: FF FF FF  ISB $ffff,X
  $A82C: FF FF FF  ISB $ffff,X
  $A82F: FF FF FF  ISB $ffff,X
  $A832: FF FF FF  ISB $ffff,X
  $A835: FF FF FF  ISB $ffff,X
  $A838: FF FF FF  ISB $ffff,X
  $A83B: FF FF FF  ISB $ffff,X
  $A83E: FF FF FF  ISB $ffff,X
  $A841: FF FF FF  ISB $ffff,X
  $A844: FF FF FF  ISB $ffff,X
  $A847: FF FF FF  ISB $ffff,X
  $A84A: FF FF FF  ISB $ffff,X
  $A84D: FF FF FF  ISB $ffff,X
  $A850: FF FF FF  ISB $ffff,X
  $A853: FF FF FF  ISB $ffff,X
  $A856: 01 01     ORA ($01,X)
  $A858: FF FF 01  ISB $01ff,X
  $A85B: 01 FF     ORA ($ff,X)
  $A85D: FF FF FF  ISB $ffff,X
  $A860: FF FF FF  ISB $ffff,X
  $A863: FF FF FF  ISB $ffff,X
  $A866: FF FF FF  ISB $ffff,X
  $A869: FF FF FF  ISB $ffff,X
  $A86C: FF FF FF  ISB $ffff,X
  $A86F: FF FF FF  ISB $ffff,X
  $A872: FF FF 08  ISB $08ff,X
  $A875: 08        PHP
  $A876: 0A        ASL A
  $A877: 06 08     ASL $08
  $A879: 08        PHP
  $A87A: 0A        ASL A
  $A87B: 06 FF     ASL $ff
  $A87D: FF FF FF  ISB $ffff,X
  $A880: FF FF FF  ISB $ffff,X
  $A883: FF FF FF  ISB $ffff,X
  $A886: FF FF FF  ISB $ffff,X
  $A889: FF FF FF  ISB $ffff,X
  $A88C: FF FF FF  ISB $ffff,X
  $A88F: FF FF FF  ISB $ffff,X
  $A892: FF FF 09  ISB $09ff,X
  $A895: 0C 0B 0E  NOP $0e0b
  $A898: 09 0C     ORA #$0c
  $A89A: 0B 0E     ANC #$0e
  $A89C: FF FF FF  ISB $ffff,X
  $A89F: FF FF FF  ISB $ffff,X
  $A8A2: FF FF FF  ISB $ffff,X
  $A8A5: FF FF FF  ISB $ffff,X
  $A8A8: FF FF FF  ISB $ffff,X
  $A8AB: FF FF FF  ISB $ffff,X
  $A8AE: FF FF FF  ISB $ffff,X
  $A8B1: FF FF FF  ISB $ffff,X
  $A8B4: FF FF FF  ISB $ffff,X
  $A8B7: FF FF FF  ISB $ffff,X
  $A8BA: FF FF FF  ISB $ffff,X
  $A8BD: FF FF 76  ISB $76ff,X
  $A8C0: FF FF 77  ISB $77ff,X
  $A8C3: FF FF FF  ISB $ffff,X
  $A8C6: FF FF FF  ISB $ffff,X
  $A8C9: 58        CLI
  $A8CA: 01 85     ORA ($85,X)
  $A8CC: 59 FF 01  EOR $01ff,Y
  $A8CF: 01 FF     ORA ($ff,X)
  $A8D1: 5A        NOP
  $A8D2: 01 01     ORA ($01,X)
  $A8D4: 5B 70 86  SRE $8670,Y
  $A8D7: 01 71     ORA ($71,X)
  $A8D9: 5E 01 87  LSR $8701,X
  $A8DC: 5F 74 88  SRE $8874,X
  $A8DF: 89 75     NOP #$75
  $A8E1: 73 8A     RRA ($8a),Y
  $A8E3: 8B FF     XAA #$ff
  $A8E5: FF 01 01  ISB $0101,X
  $A8E8: 09 81     ORA #$81
  $A8EA: 3C 3D 08  NOP $083d,X
  $A8ED: 05 06     ORA $06
  $A8EF: 07 08     SLO $08
  $A8F1: 84 3A     STY $3a
  $A8F3: 3B 82 0C  RLA $0c82,Y
  $A8F6: 3E 3F 08  ROL $083f,X
  $A8F9: 05 6A     ORA $6a
  $A8FB: 6B 83     ARR #$83
  $A8FD: 08        PHP
  $A8FE: 6E 6F 09  ROR $096f
  $A901: 0C 80 0E  NOP $0e80
  $A904: 08        PHP
  $A905: 05 06     ORA $06
  $A907: 07 04     SLO $04
  $A909: 05 0A     ORA $0a
  $A90B: 07 08     SLO $08
  $A90D: 04 0A     NOP $0a
  $A90F: 0A        ASL A
  $A910: 09 0C     ORA #$0c
  $A912: 0B 0E     ANC #$0e
  $A914: 08        PHP
  $A915: 05 0A     ORA $0a
  $A917: 07 7B     SLO $7b
  $A919: 7C 06 72  NOP $7206,X
  $A91C: 7D 7E 0B  ADC $0b7e,X
  $A91F: 0E 7F 05  ASL $057f
  $A922: 06 07     ASL $07
  $A924: 08        PHP
  $A925: 08        PHP
  $A926: 06 0A     ASL $0a
  $A928: FF FF FF  ISB $ffff,X
  $A92B: FF FF FF  ISB $ffff,X
  $A92E: FF 8D FF  ISB $ff8d,X
  $A931: FF 8C FF  ISB $ff8c,X
  $A934: FF FF FF  ISB $ffff,X
  $A937: FF FF FF  ISB $ffff,X
  $A93A: 01 01     ORA ($01,X)
  $A93C: AE AD A1  LDX $a1ad
  $A93F: A4 AC     LDY $ac
  $A941: AB A5     ATX #$a5
  $A943: B0 AA     BCS $a8ef
  $A945: A9 B1     LDA #$b1
  $A947: 01 A8     ORA ($a8,X)
  $A949: A7 01     LAX $01
  $A94B: B4 A6     LDY $a6,X
  $A94D: FF 01 01  ISB $0101,X
  $A950: FF A3 01  ISB $01a3,X
  $A953: 01 A2     ORA ($a2,X)
  $A955: FF B5 01  ISB $01b5,X
  $A958: 09 0C     ORA #$0c
  $A95A: 0B 0E     ANC #$0e
  $A95C: 08        PHP
  $A95D: 05 06     ORA $06
  $A95F: 94 08     STY $08,X
  $A961: A0 95     LDY #$95
  $A963: 96 09     STX $09,Y
  $A965: 0C 97 98  NOP $9897
  $A968: 08        PHP
  $A969: 9F 99 9C  ??? $9c99,Y
  $A96C: 9E 08 9D  SHX $9d08,Y
  $A96F: 8E 09 0C  STX $0c09
  $A972: 0B 0E     ANC #$0e
  $A974: 9B 05 9A  TAS $9a05,Y
  $A977: 8F 08 05  SAX $0508
  $A97A: 06 07     ASL $07
  $A97C: 08        PHP
  $A97D: 79 0A 06  ADC $060a,Y
  $A980: 7A        NOP
  $A981: 91 0B     STA ($0b),Y
  $A983: 0E 92 93  ASL $9392
  $A986: 78        SEI
  $A987: 07 08     SLO $08
  $A989: 08        PHP
  $A98A: 0A        ASL A
  $A98B: 0A        ASL A
  $A98C: 09 0C     ORA #$0c
  $A98E: 0B 0E     ANC #$0e
  $A990: 08        PHP
  $A991: 05 0A     ORA $0a
  $A993: 07 04     SLO $04
  $A995: 08        PHP
  $A996: 06 0A     ASL $0a
  $A998: 1A        NOP
  $A999: 1A        NOP
  $A99A: 0A        ASL A
  $A99B: 0A        ASL A
  $A99C: 1A        NOP
  $A99D: 1A        NOP
  $A99E: 07 0A     SLO $0a
  $A9A0: 1A        NOP
  $A9A1: 1A        NOP
  $A9A2: 0A        ASL A
  $A9A3: 0A        ASL A
  $A9A4: 1A        NOP
  $A9A5: 1A        NOP
  $A9A6: 07 0A     SLO $0a
  $A9A8: 08        PHP
  $A9A9: 09 0A     ORA #$0a
  $A9AB: 0B 0C     ANC #$0c
  $A9AD: 04 0E     NOP $0e
  $A9AF: 06 08     ASL $08
  $A9B1: 05 06     ORA $06
  $A9B3: 07 04     SLO $04
  $A9B5: 04 06     NOP $06
  $A9B7: 06 FF     ASL $ff
  $A9B9: FF E5 E5  ISB $e5e5,X
  $A9BC: FF FF E5  ISB $e5ff,X
  $A9BF: E5 FF     SBC $ff
  $A9C1: FF E5 E5  ISB $e5e5,X
  $A9C4: FF FF E5  ISB $e5ff,X
  $A9C7: E5 FF     SBC $ff
  $A9C9: FF FF FF  ISB $ffff,X
  $A9CC: FF FF FF  ISB $ffff,X
  $A9CF: FF 5D 7B  ISB $7b5d,X
  $A9D2: 5F 7E 22  SRE $227e,X
  $A9D5: 01 28     ORA ($28,X)
  $A9D7: 29 04     AND #$04
  $A9D9: FF 06 FF  ISB $ff06,X
  $A9DC: FF FF FF  ISB $ffff,X
  $A9DF: FF FF FF  ISB $ffff,X
  $A9E2: FF FF 14  ISB $14ff,X
  $A9E5: 15 16     ORA $16,X
  $A9E7: 17 40     SLO $40,X
  $A9E9: 41 42     EOR ($42,X)
  $A9EB: 43 44     SRE ($44,X)
  $A9ED: 45 46     EOR $46
  $A9EF: 47 FF     SRE $ff
  $A9F1: FF FF FF  ISB $ffff,X
  $A9F4: FF FF FF  ISB $ffff,X
  $A9F7: FF FF FF  ISB $ffff,X
  $A9FA: FF FF FF  ISB $ffff,X
  $A9FD: FF FF FF  ISB $ffff,X
  $AA00: 75 7F     ADC $7f,X
  $AA02: 77 D4     RRA $d4,X
  $AA04: 0A        ASL A
  $AA05: FF FF FF  ISB $ffff,X
  $AA08: FF FF FF  ISB $ffff,X
  $AA0B: FF FF FF  ISB $ffff,X
  $AA0E: FF FF FF  ISB $ffff,X
  $AA11: FF FF FF  ISB $ffff,X
  $AA14: FF 1D FF  ISB $ff1d,X
  $AA17: D6 48     DEC $48,X
  $AA19: 49 D7     EOR #$d7
  $AA1B: 4B 18     ALR #$18
  $AA1D: 19 1E 1F  ORA $1f1e,Y
  $AA20: FF FF FF  ISB $ffff,X
  $AA23: FF FF FF  ISB $ffff,X
  $AA26: FF FF FF  ISB $ffff,X
  $AA29: FF FF FF  ISB $ffff,X
  $AA2C: FF FF FF  ISB $ffff,X
  $AA2F: FF 7D D5  ISB $d57d,X
  $AA32: FF FF FF  ISB $ffff,X
  $AA35: FF FF FF  ISB $ffff,X
  $AA38: FF DF FF  ISB $ffdf,X
  $AA3B: FF DC DD  ISB $dddc,X
  $AA3E: FF FF FF  ISB $ffff,X
  $AA41: FF FF FF  ISB $ffff,X
  $AA44: FF FF FF  ISB $ffff,X
  $AA47: FF FF FF  ISB $ffff,X
  $AA4A: FF FF FF  ISB $ffff,X
  $AA4D: FF FF FF  ISB $ffff,X
  $AA50: FF FF FF  ISB $ffff,X
  $AA53: FF FF FF  ISB $ffff,X
  $AA56: FF FF FF  ISB $ffff,X
  $AA59: FF FF FF  ISB $ffff,X
  $AA5C: FF FF FF  ISB $ffff,X
  $AA5F: FF FF FF  ISB $ffff,X
  $AA62: FF FF FF  ISB $ffff,X
  $AA65: FF FF FF  ISB $ffff,X
  $AA68: 00        BRK
  $AA69: 00        BRK
  $AA6A: 00        BRK
  $AA6B: 00        BRK
  $AA6C: 00        BRK
  $AA6D: 00        BRK
  $AA6E: 00        BRK
  $AA6F: 00        BRK
  $AA70: 00        BRK
  $AA71: 00        BRK
  $AA72: 00        BRK
  $AA73: 00        BRK
  $AA74: 00        BRK
  $AA75: 00        BRK
  $AA76: 00        BRK
  $AA77: 00        BRK
  $AA78: FF FF FF  ISB $ffff,X
  $AA7B: FF FF FF  ISB $ffff,X
  $AA7E: FF FF FF  ISB $ffff,X
  $AA81: FF FF FF  ISB $ffff,X
  $AA84: FF FF FF  ISB $ffff,X
  $AA87: 71 FF     ADC ($ff),Y
  $AA89: FF 74 75  ISB $7574,X
  $AA8C: FF FF FF  ISB $ffff,X
  $AA8F: FF FF FF  ISB $ffff,X
  $AA92: FF FF FF  ISB $ffff,X
  $AA95: FF FF FF  ISB $ffff,X
  $AA98: FF FF FF  ISB $ffff,X
  $AA9B: FF FF FF  ISB $ffff,X
  $AA9E: FF FF FF  ISB $ffff,X
  $AAA1: FF FF FF  ISB $ffff,X
  $AAA4: 72        ???
  $AAA5: 73 78     RRA ($78),Y
  $AAA7: 79 76 FF  ADC $ff76,Y
  $AAAA: 7C 7D FF  NOP $ff7d,X
  $AAAD: FF 7B FF  ISB $ff7b,X
  $AAB0: FF FF FF  ISB $ffff,X
  $AAB3: FF FF FF  ISB $ffff,X
  $AAB6: FF FF FF  ISB $ffff,X
  $AAB9: FF FF FF  ISB $ffff,X
  $AABC: FF FF FF  ISB $ffff,X
  $AABF: FF FF FF  ISB $ffff,X
  $AAC2: FF FF 7A  ISB $7aff,X
  $AAC5: 7E D0 7E  ROR $7ed0,X
  $AAC8: 7E 7F D4  ROR $d47f,X
  $AACB: D5 D1     CMP $d1,X
  $AACD: FF FF FF  ISB $ffff,X
  $AAD0: FF FF FF  ISB $ffff,X
  $AAD3: FF FF FF  ISB $ffff,X
  $AAD6: FF FF FF  ISB $ffff,X
  $AAD9: FF FF FF  ISB $ffff,X
  $AADC: FF FF FF  ISB $ffff,X
  $AADF: FF FF FF  ISB $ffff,X
  $AAE2: FF FF FF  ISB $ffff,X
  $AAE5: D6 FF     DEC $ff,X
  $AAE7: DC 77 D7  NOP $d777,X
  $AAEA: C5 DD     CMP $dd
  $AAEC: FF FF FF  ISB $ffff,X
  $AAEF: FF FF FF  ISB $ffff,X
  $AAF2: FF FF FF  ISB $ffff,X
  $AAF5: FF FF FF  ISB $ffff,X
  $AAF8: 7E 7E 7E  ROR $7e7e,X
  $AAFB: 7E 7E 7E  ROR $7e7e,X
  $AAFE: 7E 7E 7E  ROR $7e7e,X
  $AB01: 7E 7E 7E  ROR $7e7e,X
  $AB04: 7E 7E 7E  ROR $7e7e,X
  $AB07: 7E 1E 1E  ROR $1e1e,X
  $AB0A: 11 15     ORA ($15),Y
  $AB0C: FF FF FF  ISB $ffff,X
  $AB0F: 1E FF FF  ASL $ffff,X
  $AB12: 1E FF FF  ASL $ffff,X
  $AB15: FF 1A 1A  ISB $1a1a,X
  $AB18: 04 05     NOP $05
  $AB1A: 40        RTI
  $AB1B: 41 0D     EOR ($0d,X)
  $AB1D: 0D 41 41  ORA $4141
  $AB20: 18        CLC
  $AB21: 19 41 41  ORA $4141,Y
  $AB24: 12        ???
  $AB25: 13 41     SLO ($41),Y
  $AB27: 41 13     EOR ($13,X)
  $AB29: 17 41     SLO $41,X
  $AB2B: 41 0D     EOR ($0d,X)
  $AB2D: 0D 41 41  ORA $4141
  $AB30: 0D 1C 41  ORA $411c
  $AB33: 41 04     EOR ($04,X)
  $AB35: 08        PHP
  $AB36: 41 44     EOR ($44,X)
  $AB38: 42        ???
  $AB39: 43 48     SRE ($48,X)
  $AB3B: 38        SEC
  $AB3C: 43 43     SRE ($43,X)
  $AB3E: 38        SEC
  $AB3F: 38        SEC
  $AB40: 43 43     SRE ($43,X)
  $AB42: 38        SEC
  $AB43: 38        SEC
  $AB44: 43 43     SRE ($43,X)
  $AB46: 38        SEC
  $AB47: 38        SEC
  $AB48: 43 43     SRE ($43,X)
  $AB4A: 38        SEC
  $AB4B: 38        SEC
  $AB4C: 43 43     SRE ($43,X)
  $AB4E: 38        SEC
  $AB4F: 38        SEC
  $AB50: 43 43     SRE ($43,X)
  $AB52: 38        SEC
  $AB53: 38        SEC
  $AB54: 43 46     SRE ($46,X)
  $AB56: 38        SEC
  $AB57: 4C 4A 4B  JMP $4b4a
  $AB5A: 60        RTS
  $AB5B: 61 4B     ADC ($4b,X)
  $AB5D: 4B 61     ALR #$61
  $AB5F: 61 4B     ADC ($4b,X)
  $AB61: 4B 61     ALR #$61
  $AB63: 61 4B     ADC ($4b,X)
  $AB65: 4B 61     ALR #$61
  $AB67: 61 4B     ADC ($4b,X)
  $AB69: 4B 61     ALR #$61
  $AB6B: 61 4B     ADC ($4b,X)
  $AB6D: 4B 61     ALR #$61
  $AB6F: 61 4B     ADC ($4b,X)
  $AB71: 4B 61     ALR #$61
  $AB73: 61 4B     ADC ($4b,X)
  $AB75: 4E 61 64  LSR $6461
  $AB78: 04 05     NOP $05
  $AB7A: 40        RTI
  $AB7B: 41 04     EOR ($04,X)
  $AB7D: 08        PHP
  $AB7E: 41 41     EOR ($41,X)
  $AB80: 09 0C     ORA #$0c
  $AB82: 41 41     EOR ($41,X)
  $AB84: 04 05     NOP $05
  $AB86: 41 41     EOR ($41,X)
  $AB88: 04 08     NOP $08
  $AB8A: 41 41     EOR ($41,X)
  $AB8C: 09 0C     ORA #$0c
  $AB8E: 41 41     EOR ($41,X)
  $AB90: 04 05     NOP $05
  $AB92: 41 41     EOR ($41,X)
  $AB94: 04 08     NOP $08
  $AB96: 41 44     EOR ($44,X)
  $AB98: FF FF 1A  ISB $1aff,X
  $AB9B: 1A        NOP
  $AB9C: FF FF FF  ISB $ffff,X
  $AB9F: 1E FF FF  ASL $ffff,X
  $ABA2: 1E FF 1E  ASL $1eff,X
  $ABA5: 1E 10 11  ASL $1110,X
  $ABA8: FF FF FF  ISB $ffff,X
  $ABAB: FF FF FF  ISB $ffff,X
  $ABAE: FF FC FF  ISB $fffc,X
  $ABB1: FF FD FD  ISB $fdfd,X
  $ABB4: FF FF FD  ISB $fdff,X
  $ABB7: FD FF FF  SBC $ffff,X
  $ABBA: FD FD FF  SBC $fffd,X
  $ABBD: FF FD FD  ISB $fdfd,X
  $ABC0: FF FF FD  ISB $fdff,X
  $ABC3: FD FF FF  SBC $ffff,X
  $ABC6: FD FD FF  SBC $fffd,X
  $ABC9: FF FD FD  ISB $fdfd,X
  $ABCC: FF FF FD  ISB $fdff,X
  $ABCF: FD FF FF  SBC $ffff,X
  $ABD2: F7 FF     ISB $ff,X
  $ABD4: FF FF FF  ISB $ffff,X
  $ABD7: FF FF FF  ISB $ffff,X
  $ABDA: FF FF FF  ISB $ffff,X
  $ABDD: FE FF FE  INC $feff,X
  $ABE0: FF FF E5  ISB $e5ff,X
  $ABE3: E5 FF     SBC $ff
  $ABE5: FF E5 E5  ISB $e5e5,X
  $ABE8: FF FF E5  ISB $e5ff,X
  $ABEB: E5 FF     SBC $ff
  $ABED: FF E5 E5  ISB $e5e5,X
  $ABF0: E7 FF     ISB $ff
  $ABF2: ED E5 FF  SBC $ffe5
  $ABF5: E7 E5     ISB $e5
  $ABF7: ED FF FF  SBC $ffff
  $ABFA: E5 E5     SBC $e5
  $ABFC: E7 FF     ISB $ff
  $ABFE: ED E5 FF  SBC $ffe5
  $AC01: E7 E5     ISB $e5
  $AC03: ED FF FF  SBC $ffff
  $AC06: E5 E5     SBC $e5
  $AC08: E7 FF     ISB $ff
  $AC0A: ED E5 FF  SBC $ffe5
  $AC0D: FF E5 E5  ISB $e5e5,X
  $AC10: FE FF FE  INC $feff,X
  $AC13: FF FF FF  ISB $ffff,X
  $AC16: FF FF FF  ISB $ffff,X
  $AC19: FF FF FF  ISB $ffff,X
  $AC1C: FF FE FF  ISB $fffe,X
  $AC1F: FE FF FF  INC $ffff,X
  $AC22: FF FF FF  ISB $ffff,X
  $AC25: FF FF FF  ISB $ffff,X
  $AC28: FF FF FF  ISB $ffff,X
  $AC2B: FF FF FF  ISB $ffff,X
  $AC2E: FF FF E7  ISB $e7ff,X
  $AC31: FF E7 FF  ISB $ffe7,X
  $AC34: FF E7 FF  ISB $ffe7,X
  $AC37: E7 FF     ISB $ff
  $AC39: FF FF FF  ISB $ffff,X
  $AC3C: E7 FF     ISB $ff
  $AC3E: E7 FF     ISB $ff
  $AC40: FF E7 FF  ISB $ffe7,X
  $AC43: E7 FF     ISB $ff
  $AC45: FF FF FF  ISB $ffff,X
  $AC48: E7 FF     ISB $ff
  $AC4A: E7 FF     ISB $ff
  $AC4C: FF FF FF  ISB $ffff,X
  $AC4F: FF FE FF  ISB $fffe,X
  $AC52: FE FF FF  INC $ffff,X
  $AC55: FF FF FF  ISB $ffff,X
  $AC58: FF FF FF  ISB $ffff,X
  $AC5B: FF FF FE  ISB $feff,X
  $AC5E: FF FE E5  ISB $e5fe,X
  $AC61: E5 FF     SBC $ff
  $AC63: FF E5 E5  ISB $e5e5,X
  $AC66: FF FF E5  ISB $e5ff,X
  $AC69: E5 FF     SBC $ff
  $AC6B: FF E5 E5  ISB $e5e5,X
  $AC6E: FF FF ED  ISB $edff,X
  $AC71: E5 E7     SBC $e7
  $AC73: FF E5 ED  ISB $ede5,X
  $AC76: FF E7 E5  ISB $e5e7,X
  $AC79: E5 FF     SBC $ff
  $AC7B: FF ED E5  ISB $e5ed,X
  $AC7E: E7 FF     ISB $ff
  $AC80: E5 ED     SBC $ed
  $AC82: FF E7 E5  ISB $e5e7,X
  $AC85: E5 FF     SBC $ff
  $AC87: FF ED E5  ISB $e5ed,X
  $AC8A: E7 FF     ISB $ff
  $AC8C: E5 E5     SBC $e5
  $AC8E: FF FF FE  ISB $feff,X
  $AC91: FF FE FF  ISB $fffe,X
  $AC94: FF FF FF  ISB $ffff,X
  $AC97: FF FF FF  ISB $ffff,X
  $AC9A: FF FF FF  ISB $ffff,X
  $AC9D: F8        SED
  $AC9E: FF FF FD  ISB $fdff,X
  $ACA1: FD FF FF  SBC $ffff,X
  $ACA4: FD FD FF  SBC $fffd,X
  $ACA7: FF FD FD  ISB $fdfd,X
  $ACAA: FF FF FD  ISB $fdff,X
  $ACAD: FD FF FF  SBC $ffff,X
  $ACB0: FD FD FF  SBC $fffd,X
  $ACB3: FF FD FD  ISB $fdfd,X
  $ACB6: FF FF FD  ISB $fdff,X
  $ACB9: FD FF FF  SBC $ffff,X
  $ACBC: FD FD FF  SBC $fffd,X
  $ACBF: FF F9 FF  ISB $fff9,X
  $ACC2: FF FF FF  ISB $ffff,X
  $ACC5: FF FF FF  ISB $ffff,X
  $ACC8: FF FF FF  ISB $ffff,X
  $ACCB: FF FF FF  ISB $ffff,X
  $ACCE: FF FF FF  ISB $ffff,X
  $ACD1: FF FF FF  ISB $ffff,X
  $ACD4: FF FF FF  ISB $ffff,X
  $ACD7: FF FF FF  ISB $ffff,X
  $ACDA: FF FF FF  ISB $ffff,X
  $ACDD: FF FF FF  ISB $ffff,X
  $ACE0: FF FF FF  ISB $ffff,X
  $ACE3: FF FF FF  ISB $ffff,X
  $ACE6: FF FF FF  ISB $ffff,X
  $ACE9: FF FF FF  ISB $ffff,X
  $ACEC: FF FF FF  ISB $ffff,X
  $ACEF: FF 6D 88  ISB $886d,X
  $ACF2: 6D 8A FF  ADC $ff8a
  $ACF5: FF FF FF  ISB $ffff,X
  $ACF8: FF FF FF  ISB $ffff,X
  $ACFB: FF D1 D6  ISB $d6d1,X
  $ACFE: D3 DC     DCP ($dc),Y
  $AD00: 6D A0 87  ADC $87a0
  $AD03: A2 89     LDX #$89
  $AD05: 8C 8B 8E  STY $8e8b
  $AD08: 8D FF 8F  STA $8fff
  $AD0B: 9A        TXS
  $AD0C: FF FF FF  ISB $ffff,X
  $AD0F: FF FF FF  ISB $ffff,X
  $AD12: FF FF FF  ISB $ffff,X
  $AD15: FF FF FF  ISB $ffff,X
  $AD18: FF FF FF  ISB $ffff,X
  $AD1B: FF D9 3A  ISB $3ad9,X
  $AD1E: FF DA 3A  ISB $3ada,X
  $AD21: A8        TAY
  $AD22: 3A        NOP
  $AD23: AA        TAX
  $AD24: A1 A4     LDA ($a4,X)
  $AD26: A3 A6     LAX ($a6,X)
  $AD28: A5 B0     LDA $b0
  $AD2A: FF B2 FF  ISB $ffb2,X
  $AD2D: FF FF FF  ISB $ffff,X
  $AD30: FF FF FF  ISB $ffff,X
  $AD33: FF FF FF  ISB $ffff,X
  $AD36: FF FF FF  ISB $ffff,X
  $AD39: D5 FF     CMP $ff,X
  $AD3B: D7 FF     DCP $ff,X
  $AD3D: FF FF FF  ISB $ffff,X
  $AD40: FF FF FF  ISB $ffff,X
  $AD43: FF FF FF  ISB $ffff,X
  $AD46: FF FF FF  ISB $ffff,X
  $AD49: FF FF FF  ISB $ffff,X
  $AD4C: FF FF FF  ISB $ffff,X
  $AD4F: FF FF FF  ISB $ffff,X
  $AD52: FF FF FF  ISB $ffff,X
  $AD55: E0 FF     CPX #$ff
  $AD57: E2 E1     NOP #$e1
  $AD59: EB E3     SBC #$e3
  $AD5B: FF E4 E5  ISB $e5e4,X
  $AD5E: E6 E7     INC $e7
  $AD60: 3A        NOP
  $AD61: 3A        NOP
  $AD62: 3A        NOP
  $AD63: 3A        NOP
  $AD64: A9 AC     LDA #$ac
  $AD66: AB AE     ATX #$ae
  $AD68: AD FF FF  LDA $ffff
  $AD6B: FF FF FF  ISB $ffff,X
  $AD6E: C4 FF     CPY $ff
  $AD70: FF DB FF  ISB $ffdb,X
  $AD73: FF DE FF  ISB $ffde,X
  $AD76: FF F0 FF  ISB $fff0,X
  $AD79: DD F1 DF  CMP $dff1,X
  $AD7C: FF FF FF  ISB $ffff,X
  $AD7F: FF FF FF  ISB $ffff,X
  $AD82: FF FF FF  ISB $ffff,X
  $AD85: FF FF FF  ISB $ffff,X
  $AD88: FF FF FF  ISB $ffff,X
  $AD8B: FF FF FF  ISB $ffff,X
  $AD8E: FF FF FF  ISB $ffff,X
  $AD91: FF FF FF  ISB $ffff,X
  $AD94: CF E8 FF  DCP $ffe8
  $AD97: EA        NOP
  $AD98: E9 D0     SBC #$d0
  $AD9A: 3A        NOP
  $AD9B: 3A        NOP
  $AD9C: EC ED EE  CPX $eeed
  $AD9F: EF 3A 3A  ISB $3a3a
  $ADA2: 3A        NOP
  $ADA3: 3A        NOP
  $ADA4: 3A        NOP
  $ADA5: 3A        NOP
  $ADA6: 3A        NOP
  $ADA7: 3A        NOP
  $ADA8: A7 C3     LAX $c3
  $ADAA: AF C9 C6  LAX $c6c9
  $ADAD: C7 CC     DCP $cc
  $ADAF: CD FF D4  CMP $d4ff
  $ADB2: FF C1 F4  ISB $f4c1,X
  $ADB5: F2        ???
  $ADB6: F5 3A     SBC $3a,X
  $ADB8: F3 FF     ISB ($ff),Y
  $ADBA: F6 FF     INC $ff,X
  $ADBC: FF FF FF  ISB $ffff,X
  $ADBF: FF FF FF  ISB $ffff,X
  $ADC2: FF FF FF  ISB $ffff,X
  $ADC5: FF FF FF  ISB $ffff,X
  $ADC8: FF FF FF  ISB $ffff,X
  $ADCB: FF FF FF  ISB $ffff,X
  $ADCE: FF FF FF  ISB $ffff,X
  $ADD1: FF FF FF  ISB $ffff,X
  $ADD4: 6D 88 6D  ADC $6d88
  $ADD7: 8A        TXA
  $ADD8: FF 97 FF  ISB $ff97,X
  $ADDB: BB FF FF  LAS $ffff,Y
  $ADDE: FF FF FF  ISB $ffff,X
  $ADE1: FF FF FF  ISB $ffff,X
  $ADE4: FF FF FF  ISB $ffff,X
  $ADE7: FF FF FF  ISB $ffff,X
  $ADEA: FF FF FF  ISB $ffff,X
  $ADED: FF FF FF  ISB $ffff,X
  $ADF0: FF FF FF  ISB $ffff,X
  $ADF3: FF 6D A0  ISB $a06d,X
  $ADF6: 87 A2     SAX $a2
  $ADF8: 89 8C     NOP #$8c
  $ADFA: 8B 8E     XAA #$8e
  $ADFC: 8D FF 8F  STA $8fff
  $ADFF: 9A        TXS
  $AE00: FF FF FF  ISB $ffff,X
  $AE03: FF FF FF  ISB $ffff,X
  $AE06: FF FF FF  ISB $ffff,X
  $AE09: FF FF FF  ISB $ffff,X
  $AE0C: FF FF FF  ISB $ffff,X
  $AE0F: FF FF FF  ISB $ffff,X
  $AE12: 9B 9E FF  TAS $ff9e,Y
  $AE15: FF 9F FF  ISB $ff9f,X
  $AE18: FF BC FF  ISB $ffbc,X
  $AE1B: BD FF FF  LDA $ffff,X
  $AE1E: FF FF FF  ISB $ffff,X
  $AE21: FF FF FF  ISB $ffff,X
  $AE24: FF FF FF  ISB $ffff,X
  $AE27: FF FF FF  ISB $ffff,X
  $AE2A: FF FF FF  ISB $ffff,X
  $AE2D: FF FF FF  ISB $ffff,X
  $AE30: FF FF FF  ISB $ffff,X
  $AE33: FF 3A A8  ISB $a83a,X
  $AE36: 3A        NOP
  $AE37: AA        TAX
  $AE38: A1 A4     LDA ($a4,X)
  $AE3A: A3 A6     LAX ($a6,X)
  $AE3C: A5 B0     LDA $b0
  $AE3E: FF B2 FF  ISB $ffb2,X
  $AE41: FF FF FF  ISB $ffff,X
  $AE44: FF FF FF  ISB $ffff,X
  $AE47: FF FF FF  ISB $ffff,X
  $AE4A: FF FF FF  ISB $ffff,X
  $AE4D: 91 FF     STA ($ff),Y
  $AE4F: 99 B1 B4  STA $b4b1,Y
  $AE52: FF FF B5  ISB $b5ff,X
  $AE55: B7 FF     LAX $ff,Y
  $AE57: B8        CLV
  $AE58: FF BE FF  ISB $ffbe,X
  $AE5B: BF FF FF  LAX $ffff,Y
  $AE5E: FF FF FF  ISB $ffff,X
  $AE61: FF FF FF  ISB $ffff,X
  $AE64: FF FF FF  ISB $ffff,X
  $AE67: FF FF FF  ISB $ffff,X
  $AE6A: FF FF FF  ISB $ffff,X
  $AE6D: FF FF FF  ISB $ffff,X
  $AE70: FF FF FF  ISB $ffff,X
  $AE73: FF 3A 3A  ISB $3a3a,X
  $AE76: 3A        NOP
  $AE77: 3A        NOP
  $AE78: A9 AC     LDA #$ac
  $AE7A: AB AE     ATX #$ae
  $AE7C: AD FF FF  LDA $ffff
  $AE7F: FF FF FF  ISB $ffff,X
  $AE82: FF 90 FF  ISB $ff90,X
  $AE85: FF 94 95  ISB $9594,X
  $AE88: FF FF C0  ISB $c0ff,X
  $AE8B: FF FF FF  ISB $ffff,X
  $AE8E: C4 FF     CPY $ff
  $AE90: FF FF FF  ISB $ffff,X
  $AE93: B3 FF     LAX ($ff),Y
  $AE95: BA        TSX
  $AE96: B6 3A     LDX $3a,Y
  $AE98: B9 C5 3A  LDA $3ac5,Y
  $AE9B: CA        DEX
  $AE9C: FF FF FF  ISB $ffff,X
  $AE9F: FF FF FF  ISB $ffff,X
  $AEA2: FF FF FF  ISB $ffff,X
  $AEA5: FF FF FF  ISB $ffff,X
  $AEA8: 3A        NOP
  $AEA9: 3A        NOP
  $AEAA: 3A        NOP
  $AEAB: 3A        NOP
  $AEAC: A7 FF     LAX $ff
  $AEAE: AF FF 92  LAX $92ff
  $AEB1: 93 98     ??? ($98),Y
  $AEB3: 3A        NOP
  $AEB4: 96 FF     STX $ff,Y
  $AEB6: 9C 9D C2  SHY $c29d,X
  $AEB9: C3 C8     DCP ($c8,X)
  $AEBB: C9 C6     CMP #$c6
  $AEBD: C7 CC     DCP $cc
  $AEBF: CD D2 3A  CMP $3ad2
  $AEC2: D8        CLD
  $AEC3: 3A        NOP
  $AEC4: 3A        NOP
  $AEC5: 3A        NOP
  $AEC6: 3A        NOP
  $AEC7: 3A        NOP
  $AEC8: 3A        NOP
  $AEC9: CB 3A     AXS #$3a
  $AECB: CE FF FF  DEC $ffff
  $AECE: FF FF FF  ISB $ffff,X
  $AED1: FF FF FF  ISB $ffff,X
  $AED4: FF FF FF  ISB $ffff,X
  $AED7: FF 00 00  ISB $0000,X
  $AEDA: 00        BRK
  $AEDB: 00        BRK
  $AEDC: 00        BRK
  $AEDD: 00        BRK
  $AEDE: 00        BRK
  $AEDF: 00        BRK
  $AEE0: 00        BRK
  $AEE1: 00        BRK
  $AEE2: 00        BRK
  $AEE3: 00        BRK
  $AEE4: 00        BRK
  $AEE5: 00        BRK
  $AEE6: 00        BRK
  $AEE7: 00        BRK
  $AEE8: 00        BRK
  $AEE9: 00        BRK
  $AEEA: 00        BRK
  $AEEB: 00        BRK
  $AEEC: 00        BRK
  $AEED: 00        BRK
  $AEEE: 00        BRK
  $AEEF: E1 00     SBC ($00,X)
  $AEF1: E5 E4     SBC $e4
  $AEF3: C7 00     DCP $00
  $AEF5: 00        BRK
  $AEF6: CD CF 00  CMP $00cf
  $AEF9: 00        BRK
  $AEFA: 00        BRK
  $AEFB: DB 00 DC  DCP $dc00,Y
  $AEFE: DB DE 00  DCP $00de,Y
  $AF01: 00        BRK
  $AF02: 00        BRK
  $AF03: 00        BRK
  $AF04: 00        BRK
  $AF05: 00        BRK
  $AF06: 00        BRK
  $AF07: 00        BRK
  $AF08: 00        BRK
  $AF09: 00        BRK
  $AF0A: 00        BRK
  $AF0B: 00        BRK
  $AF0C: 00        BRK
  $AF0D: 00        BRK
  $AF0E: 00        BRK
  $AF0F: 00        BRK
  $AF10: 00        BRK
  $AF11: 00        BRK
  $AF12: 00        BRK
  $AF13: 00        BRK
  $AF14: F6 FE     INC $fe,X
  $AF16: FD FF FE  SBC $feff,X
  $AF19: FE FF FF  INC $ffff,X
  $AF1C: FE FE FF  INC $fffe,X
  $AF1F: FF FE FE  ISB $fefe,X
  $AF22: FF FF FE  ISB $feff,X
  $AF25: FE FF FF  INC $ffff,X
  $AF28: F6 FE     INC $fe,X
  $AF2A: FD FF FE  SBC $feff,X
  $AF2D: FE FF FF  INC $ffff,X
  $AF30: FE FE FF  INC $fffe,X
  $AF33: FF FE FE  ISB $fefe,X
  $AF36: FF FF FE  ISB $feff,X
  $AF39: FE FF FF  INC $ffff,X
  $AF3C: F7 00     ISB $00,X
  $AF3E: F7 00     ISB $00,X
  $AF40: 00        BRK
  $AF41: 00        BRK
  $AF42: 00        BRK
  $AF43: 00        BRK
  $AF44: 00        BRK
  $AF45: 00        BRK
  $AF46: 00        BRK
  $AF47: 00        BRK
  $AF48: FE FE FF  INC $fffe,X
  $AF4B: FF FD FF  ISB $fffd,X
  $AF4E: FD FF FF  SBC $ffff,X
  $AF51: FF FF FF  ISB $ffff,X
  $AF54: FF FF FF  ISB $ffff,X
  $AF57: FF FD FF  ISB $fffd,X
  $AF5A: FD FF FF  SBC $ffff,X
  $AF5D: FF FF FF  ISB $ffff,X
  $AF60: FF FF FF  ISB $ffff,X
  $AF63: FF F6 FE  ISB $fef6,X
  $AF66: FD FF 00  SBC $00ff,X
  $AF69: 00        BRK
  $AF6A: 00        BRK
  $AF6B: 00        BRK
  $AF6C: 00        BRK
  $AF6D: 00        BRK
  $AF6E: 00        BRK
  $AF6F: 00        BRK
  $AF70: 00        BRK
  $AF71: 00        BRK
  $AF72: 00        BRK
  $AF73: F6 F6     INC $f6,X
  $AF75: FE FD FF  INC $fffd,X
  $AF78: FD FF FD  SBC $fdff,X
  $AF7B: FF FD FF  ISB $fffd,X
  $AF7E: FD FF FF  SBC $ffff,X
  $AF81: FF FF FF  ISB $ffff,X
  $AF84: D2        ???
  $AF85: D3 D8     DCP ($d8),Y
  $AF87: FF D6 D7  ISB $d7d6,X
  $AF8A: FD DD FF  SBC $ffdd,X
  $AF8D: FF FF FF  ISB $ffff,X
  $AF90: FF FF FF  ISB $ffff,X
  $AF93: FF FD FF  ISB $fffd,X
  $AF96: FD FF F6  SBC $f6ff,X
  $AF99: FE FD FF  INC $fffd,X
  $AF9C: F7 00     ISB $00,X
  $AF9E: F6 F7     INC $f7,X
  $AFA0: 00        BRK
  $AFA1: 00        BRK
  $AFA2: 00        BRK
  $AFA3: 00        BRK
  $AFA4: 00        BRK
  $AFA5: 00        BRK
  $AFA6: 00        BRK
  $AFA7: 00        BRK
  $AFA8: 00        BRK
  $AFA9: 00        BRK
  $AFAA: 00        BRK
  $AFAB: 00        BRK
  $AFAC: 00        BRK
  $AFAD: 00        BRK
  $AFAE: 00        BRK
  $AFAF: 00        BRK
  $AFB0: 00        BRK
  $AFB1: FC 00 00  NOP $0000,X
  $AFB4: FD FF FC  SBC $fcff,X
  $AFB7: D9 FD FF  CMP $fffd,Y
  $AFBA: FD FF FD  SBC $fdff,X
  $AFBD: FF FD FF  ISB $fffd,X
  $AFC0: FF FF FF  ISB $ffff,X
  $AFC3: FF DA FF  ISB $ffda,X
  $AFC6: F0 F1     BEQ $afb9
  $AFC8: FD DF F4  SBC $f4df,X
  $AFCB: F5 FF     SBC $ff,X
  $AFCD: FF FF FF  ISB $ffff,X
  $AFD0: FF FF FF  ISB $ffff,X
  $AFD3: FF FD FF  ISB $fffd,X
  $AFD6: FD FF FD  SBC $fdff,X
  $AFD9: FF FC D9  ISB $d9fc,X
  $AFDC: FC F7 F7  NOP $f7f7,X
  $AFDF: 00        BRK
  $AFE0: 00        BRK
  $AFE1: 00        BRK
  $AFE2: 00        BRK
  $AFE3: 00        BRK
  $AFE4: 00        BRK
  $AFE5: 00        BRK
  $AFE6: 00        BRK
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
  $AFF1: 00        BRK
  $AFF2: 00        BRK
  $AFF3: 00        BRK
  $AFF4: FD FF FC  SBC $fcff,X
  $AFF7: D9 FF FF  CMP $ffff,Y
  $AFFA: D9 D9 FD  CMP $fdd9,Y
  $AFFD: FF FD FF  ISB $fffd,X
  $B000: FF FF FF  ISB $ffff,X
  $B003: FF FF FF  ISB $ffff,X
  $B006: FF FF FD  ISB $fdff,X
  $B009: FF FD FF  ISB $fffd,X
  $B00C: FF FF FF  ISB $ffff,X
  $B00F: FF FF FF  ISB $ffff,X
  $B012: FF FF FD  ISB $fdff,X
  $B015: FF FC D9  ISB $d9fc,X
  $B018: FF FF D9  ISB $d9ff,X
  $B01B: D9 F7 00  CMP $00f7,Y
  $B01E: F7 00     ISB $00,X
  $B020: 00        BRK
  $B021: 00        BRK
  $B022: 00        BRK
  $B023: 00        BRK
  $B024: 00        BRK
  $B025: 00        BRK
  $B026: 00        BRK
  $B027: 00        BRK
  $B028: FF FF D9  ISB $d9ff,X
  $B02B: D9 FF FF  CMP $ffff,Y
  $B02E: D9 D9 FF  CMP $ffd9,Y
  $B031: FF D9 D9  ISB $d9d9,X
  $B034: FF FF D9  ISB $d9ff,X
  $B037: D9 FD FF  CMP $fffd,Y
  $B03A: FC D9 FF  NOP $ffd9,X
  $B03D: FF D9 D9  ISB $d9d9,X
  $B040: FF FF D9  ISB $d9ff,X
  $B043: D9 FF FF  CMP $ffff,Y
  $B046: D9 D9 00  CMP $00d9,Y
  $B049: 00        BRK
  $B04A: FF 00 00  ISB $0000,X
  $B04D: 00        BRK
  $B04E: 00        BRK
  $B04F: 00        BRK
  $B050: 00        BRK
  $B051: 00        BRK
  $B052: 00        BRK
  $B053: 00        BRK
  $B054: FD FF FC  SBC $fcff,X
  $B057: D9 FF FF  CMP $ffff,Y
  $B05A: FF FF FF  ISB $ffff,X
  $B05D: FF FF FF  ISB $ffff,X
  $B060: FF FF FF  ISB $ffff,X
  $B063: FF FF FF  ISB $ffff,X
  $B066: FF FF FF  ISB $ffff,X
  $B069: FF FF FF  ISB $ffff,X
  $B06C: 20 21 22  JSR $2221
  $B06F: 23 24     RLA ($24,X)
  $B071: 25 26     AND $26
  $B073: 27 FF     RLA $ff
  $B075: FF FF FF  ISB $ffff,X
  $B078: 00        BRK
  $B079: 00        BRK
  $B07A: FF 00 00  ISB $0000,X
  $B07D: 00        BRK
  $B07E: 00        BRK
  $B07F: 00        BRK
  $B080: 00        BRK
  $B081: 00        BRK
  $B082: 00        BRK
  $B083: 00        BRK
  $B084: 00        BRK
  $B085: 00        BRK
  $B086: 00        BRK
  $B087: 00        BRK
  $B088: 00        BRK
  $B089: AA        TAX
  $B08A: AA        TAX
  $B08B: AA        TAX
  $B08C: AF FF FF  LAX $ffff
  $B08F: FF FF FF  ISB $ffff,X
  $B092: FF FF AA  ISB $aaff,X
  $B095: AA        TAX
  $B096: AA        TAX
  $B097: FF AA AA  ISB $aaaa,X
  $B09A: FF AA FF  ISB $ffaa,X
  $B09D: AA        TAX
  $B09E: AA        TAX
  $B09F: FF FF FF  ISB $ffff,X
  $B0A2: FF FF FF  ISB $ffff,X
  $B0A5: FF FF FF  ISB $ffff,X
  $B0A8: FF FF FF  ISB $ffff,X
  $B0AB: AA        TAX
  $B0AC: AA        TAX
  $B0AD: FF FF FF  ISB $ffff,X
  $B0B0: FF 00 00  ISB $0000,X
  $B0B3: 00        BRK
  $B0B4: FF AA FF  ISB $ffaa,X
  $B0B7: FF FF FF  ISB $ffff,X
  $B0BA: FF FF FF  ISB $ffff,X
  $B0BD: FF FF FF  ISB $ffff,X
  $B0C0: FF FF FF  ISB $ffff,X
  $B0C3: FF 00 00  ISB $0000,X
  $B0C6: AA        TAX
  $B0C7: FF FF 00  ISB $00ff,X
  $B0CA: 00        BRK
  $B0CB: AA        TAX
  $B0CC: AA        TAX
  $B0CD: FF AA FF  ISB $ffaa,X
  $B0D0: AA        TAX
  $B0D1: AA        TAX
  $B0D2: AA        TAX
  $B0D3: FF FF AA  ISB $aaff,X
  $B0D6: AA        TAX
  $B0D7: AA        TAX
  $B0D8: FF FE AF  ISB $affe,X
  $B0DB: FE AF FF  INC $ffaf,X
  $B0DE: FF FF AB  ISB $abff,X
  $B0E1: FF FF AB  ISB $abff,X
  $B0E4: AA        TAX
  $B0E5: FF FF FF  ISB $ffff,X
  $B0E8: 00        BRK
  $B0E9: 00        BRK
  $B0EA: 00        BRK
  $B0EB: 00        BRK
  $B0EC: 00        BRK
  $B0ED: 00        BRK
  $B0EE: FA        NOP
  $B0EF: AA        TAX
  $B0F0: FF FF FF  ISB $ffff,X
  $B0F3: 00        BRK
  $B0F4: 00        BRK
  $B0F5: 00        BRK
  $B0F6: 00        BRK
  $B0F7: 00        BRK
  $B0F8: FF AA AA  ISB $aaaa,X
  $B0FB: AA        TAX
  $B0FC: AA        TAX
  $B0FD: AA        TAX
  $B0FE: AF AA FF  LAX $ffaa
  $B101: EE FF FF  INC $ffff
  $B104: AB AA     ATX #$aa
  $B106: BF AA BF  LAX $bfaa,Y
  $B109: AA        TAX
  $B10A: FF EE FF  ISB $ffee,X
  $B10D: AA        TAX
  $B10E: AA        TAX
  $B10F: AE AA AE  LDX $aeaa
  $B112: AA        TAX
  $B113: FF FF FF  ISB $ffff,X
  $B116: FF AA AA  ISB $aaaa,X
  $B119: FF AA AA  ISB $aaaa,X
  $B11C: AA        TAX
  $B11D: FF FF FF  ISB $ffff,X
  $B120: FF FF FF  ISB $ffff,X
  $B123: FF FF 00  ISB $00ff,X
  $B126: 00        BRK
  $B127: FF FF FF  ISB $ffff,X
  $B12A: FF FF FF  ISB $ffff,X
  $B12D: FF FF FF  ISB $ffff,X
  $B130: FF FF FF  ISB $ffff,X
  $B133: FF FF FF  ISB $ffff,X
  $B136: FF FF FF  ISB $ffff,X
  $B139: FF FF FF  ISB $ffff,X
  $B13C: FF FF FF  ISB $ffff,X
  $B13F: FF FF FF  ISB $ffff,X
  $B142: FF FF FF  ISB $ffff,X
  $B145: 00        BRK
  $B146: 00        BRK
  $B147: 00        BRK
  $B148: FF FF FF  ISB $ffff,X
  $B14B: FF FF FF  ISB $ffff,X
  $B14E: FF FF FF  ISB $ffff,X
  $B151: AA        TAX
  $B152: AA        TAX
  $B153: AA        TAX
  $B154: FF FF FF  ISB $ffff,X
  $B157: FF 00 00  ISB $0000,X
  $B15A: 00        BRK
  $B15B: 00        BRK
  $B15C: 00        BRK
  $B15D: FF FF FF  ISB $ffff,X
  $B160: FF 00 00  ISB $0000,X
  $B163: 00        BRK
  $B164: 00        BRK
  $B165: AA        TAX
  $B166: AA        TAX
  $B167: AA        TAX
  $B168: AA        TAX
  $B169: FF FF AA  ISB $aaff,X
  $B16C: AA        TAX
  $B16D: AA        TAX
  $B16E: FF AA AA  ISB $aaaa,X
  $B171: AA        TAX
  $B172: AA        TAX
  $B173: AA        TAX
  $B174: AA        TAX
  $B175: AA        TAX
  $B176: AA        TAX
  $B177: AA        TAX
  $B178: AA        TAX
  $B179: AA        TAX
  $B17A: FF FF FF  ISB $ffff,X
  $B17D: FF AA AA  ISB $aaaa,X
  $B180: AA        TAX
  $B181: AA        TAX
  $B182: FF FF FF  ISB $ffff,X
  $B185: AB EA     ATX #$ea
  $B187: AB EA     ATX #$ea
  $B189: AB EA     ATX #$ea
  $B18B: AB EA     ATX #$ea
  $B18D: FF FF FF  ISB $ffff,X
  $B190: FF FF FF  ISB $ffff,X
  $B193: FF FF FF  ISB $ffff,X
  $B196: FF FF FF  ISB $ffff,X
  $B199: FF FF FF  ISB $ffff,X
  $B19C: AA        TAX
  $B19D: FF 00 AF  ISB $af00,X
  $B1A0: FF FA AF  ISB $affa,X
  $B1A3: FF FA AF  ISB $affa,X
  $B1A6: FA        NOP
  $B1A7: AF FA FF  LAX $fffa
  $B1AA: FF FF FF  ISB $ffff,X
  $B1AD: FF FF FF  ISB $ffff,X
  $B1B0: FF FF AA  ISB $aaff,X
  $B1B3: EA        NOP
  $B1B4: FF FF FF  ISB $ffff,X
  $B1B7: FF 00 00  ISB $0000,X
  $B1BA: FF FF AB  ISB $abff,X
  $B1BD: FF FF FF  ISB $ffff,X
  $B1C0: FA        NOP
  $B1C1: AA        TAX
  $B1C2: AA        TAX
  $B1C3: AF FA AA  LAX $aafa
  $B1C6: AA        TAX
  $B1C7: AF FA AA  LAX $aafa
  $B1CA: AA        TAX
  $B1CB: AF FF FF  LAX $ffff
  $B1CE: FF AB EA  ISB $eaab,X
  $B1D1: FF FF FF  ISB $ffff,X
  $B1D4: FE FF EA  INC $eaff,X
  $B1D7: AB FF     ATX #$ff
  $B1D9: FF EA AB  ISB $abea,X
  $B1DC: FF FF EA  ISB $eaff,X
  $B1DF: AB EA     ATX #$ea
  $B1E1: AB FF     ATX #$ff
  $B1E3: FF EA AB  ISB $abea,X
  $B1E6: BF FF EA  LAX $eaff,Y
  $B1E9: AB FF     ATX #$ff
  $B1EB: FF EA FF  ISB $ffea,X
  $B1EE: FF EA 00  ISB $00ea,X
  $B1F1: 00        BRK
  $B1F2: 00        BRK
  $B1F3: 00        BRK
  $B1F4: 00        BRK
  $B1F5: 00        BRK
  $B1F6: 00        BRK
  $B1F7: 00        BRK
  $B1F8: 00        BRK
  $B1F9: 00        BRK
  $B1FA: 00        BRK
  $B1FB: 00        BRK
  $B1FC: 00        BRK
  $B1FD: 00        BRK
  $B1FE: 00        BRK
  $B1FF: 00        BRK
  $B200: 00        BRK
  $B201: 00        BRK
  $B202: 00        BRK
  $B203: 00        BRK
  $B204: 00        BRK
  $B205: 00        BRK
  $B206: 00        BRK
  $B207: 80 AA     NOP #$aa
  $B209: FF 00 0C  ISB $0c00,X
  $B20C: 0C 0C 0C  NOP $0c0c
  $B20F: 0C 0C 0C  NOP $0c0c
  $B212: 0C 0C 0C  NOP $0c0c
  $B215: 0C 0C 0C  NOP $0c0c
  $B218: 0C 0C 0C  NOP $0c0c
  $B21B: 0C 0C 0C  NOP $0c0c
  $B21E: 0C 90 70  NOP $7090
  $B221: 2A        ROL A
  $B222: 02        ???
  $B223: 02        ???
  $B224: 02        ???
  $B225: 02        ???
  $B226: 02        ???
  $B227: 02        ???
  $B228: F6 F6     INC $f6,X
  $B22A: 0F 0C 0C  SLO $0c0c
  $B22D: 0C C0 0C  NOP $0cc0
  $B230: 0C D9 D9  NOP $d9d9
  $B233: B0 B0     BCS $b1e5
  $B235: 0C A2 A2  NOP $a2a2
  $B238: 0C 0C 0C  NOP $0c0c
  $B23B: 0C 0C B0  NOP $b00c
  $B23E: AC C0 0C  LDY $0cc0
  $B241: 0F 56 56  SLO $5656
  $B244: 56 56     LSR $56,X
  $B246: 21 21     AND ($21,X)
  $B248: 0C 21 31  NOP $3121
  $B24B: 30 21     BMI $b26e
  $B24D: 10 30     BPL $b27f
  $B24F: 0F 33 0F  SLO $0f33
  $B252: 1A        NOP
  $B253: 30 36     BMI $b28b
  $B255: 0F 30 0F  SLO $0f30
  $B258: 25 0F     AND $0f
  $B25A: 0F 0F 36  SLO $360f
  $B25D: 30 21     BMI $b280
  $B25F: 36 11     ROL $11,X
  $B261: 0F 36 30  SLO $3036
  $B264: 21 36     AND ($36,X)
  $B266: 30 0F     BMI $b277
  $B268: 0F 0F 21  SLO $210f
  $B26B: 31 30     AND ($30),Y
  $B26D: 1A        NOP
  $B26E: 30 10     BMI $b280
  $B270: 0F 30 10  SLO $1030
  $B273: 21 11     AND ($11,X)
  $B275: 30 10     BMI $b287
  $B277: 11 27     ORA ($27),Y
  $B279: 0F 36 30  SLO $3036
  $B27C: 0F 31 30  SLO $3031
  $B27F: 0F 36 11  SLO $1136
  $B282: 0F 07 25  SLO $2507
  $B285: 0F 36 30  SLO $3036
  $B288: 0F 31 30  SLO $3031
  $B28B: 0F 36 30  SLO $3036
  $B28E: 0F 07 25  SLO $2507
  $B291: 0F 17 36  SLO $3617
  $B294: 0F 0F 36  SLO $360f
  $B297: 0F 0F 0F  SLO $0f0f
  $B29A: 0F 30 36  SLO $3630
  $B29D: 0F 0F 0F  SLO $0f0f
  $B2A0: 0F 10 30  SLO $3010
  $B2A3: 30 36     BMI $b2db
  $B2A5: 27 0F     RLA $0f
  $B2A7: 31 30     AND ($30),Y
  $B2A9: 0F 00 36  SLO $3600
  $B2AC: 0F 30 36  SLO $3630
  $B2AF: 0F 0F 36  SLO $360f
  $B2B2: 0F 30 36  SLO $3630
  $B2B5: 0F 00 36  SLO $3600
  $B2B8: 0F 11 36  SLO $3611
  $B2BB: 0F 0F 36  SLO $360f
  $B2BE: 0F 30 36  SLO $3630
  $B2C1: 0F 15 36  SLO $3615
  $B2C4: 0F 11 36  SLO $3611
  $B2C7: 0F 0F 36  SLO $360f
  $B2CA: 0F 30 36  SLO $3630
  $B2CD: 0F 07 36  SLO $3607
  $B2D0: 0F 11 36  SLO $3611
  $B2D3: 0F 0F 36  SLO $360f
  $B2D6: 0F 30 36  SLO $3630
  $B2D9: 0F 0F 36  SLO $360f
  $B2DC: 0F 19 36  SLO $3619
  $B2DF: 0F 0F 36  SLO $360f
  $B2E2: 0F 30 36  SLO $3630
  $B2E5: 0F 00 36  SLO $3600
  $B2E8: 0F 16 36  SLO $3616
  $B2EB: 0F 0F 36  SLO $360f
  $B2EE: 0F 30 36  SLO $3630
  $B2F1: 0F 0F 26  SLO $260f
  $B2F4: 0F 0F 26  SLO $260f
  $B2F7: 0F 11 26  SLO $2611
  $B2FA: 0F 30 26  SLO $2630
  $B2FD: 0F 37 35  SLO $3537
  $B300: 0F 30 35  SLO $3530
  $B303: 0F 21 35  SLO $3521
  $B306: 0F 30 35  SLO $3530
  $B309: 0F 16 35  SLO $3516
  $B30C: 0F 23 35  SLO $3523
  $B30F: 0F 1A 35  SLO $351a
  $B312: 0F 30 35  SLO $3530
  $B315: 0F 37 35  SLO $3537
  $B318: 0F 23 35  SLO $3523
  $B31B: 0F 1A 35  SLO $351a
  $B31E: 0F 30 35  SLO $3530
  $B321: 0F 37 35  SLO $3537
  $B324: 0F 16 35  SLO $3516
  $B327: 0F 21 35  SLO $3521
  $B32A: 0F 30 35  SLO $3530
  $B32D: FC F3 CF  NOP $cff3,X
  $B330: 3F 01 03  RLA $0301,X
  $B333: 02        ???
  $B334: 00        BRK
  $B335: 04 05     NOP $05
  $B337: 08        PHP
  $B338: 0E 0F 12  ASL $120f
  $B33B: 14 46     NOP $46,X
  $B33D: F3 66     ISB ($66),Y
  $B33F: F3 84     ISB ($84),Y
  $B341: F3 AB     ISB ($ab),Y
  $B343: F3 C5     ISB ($c5),Y
  $B345: F3 02     ISB ($02),Y
  $B347: 89 21     NOP #$21
  $B349: 81 84     STA ($84,X)
  $B34B: 05 A7     ORA $a7
  $B34D: 21 89     AND ($89,X)
  $B34F: 82 83     NOP #$83
  $B351: 86 8C     STX $8c
  $B353: 06 C7     ASL $c7
  $B355: 21 8B     AND ($8b,X)
  $B357: 88        DEY
  $B358: 00        BRK
  $B359: 00        BRK
  $B35A: 8D 98 06  STA $0698
  $B35D: E8        INX
  $B35E: 21 8A     AND ($8a,X)
  $B360: 00        BRK
  $B361: 8E 8F 9A  STX $9a8f
  $B364: 80 00     NOP #$00
  $B366: 02        ???
  $B367: 92        ???
  $B368: 21 94     AND ($94,X)
  $B36A: 95 04     STA $04,X
  $B36C: B2        ???
  $B36D: 21 96     AND ($96,X)
  $B36F: 00        BRK
  $B370: 99 9C 06  STA $069c,Y
  $B373: CF 21 85  DCP $8521
  $B376: 90 91     BCC $b309
  $B378: 00        BRK
  $B379: 00        BRK
  $B37A: 9D 05 F0  STA $f005,X
  $B37D: 21 92     AND ($92,X)
  $B37F: 93 97     ??? ($97),Y
  $B381: 00        BRK
  $B382: 9F 00 08  ??? $0800,Y
  $B385: 95 21     STA $21,X
  $B387: 4D 58 4F  EOR $4f58
  $B38A: 70 73     BVS $b3ff
  $B38C: 79 7C 7D  ADC $7d7c,Y
  $B38F: 07 B6     SLO $b6
  $B391: 21 5A     AND ($5a,X)
  $B393: 65 72     ADC $72
  $B395: 00        BRK
  $B396: 00        BRK
  $B397: 00        BRK
  $B398: 7F 05 D9  RRA $d905,X
  $B39B: 21 67     AND ($67,X)
  $B39D: 00        BRK
  $B39E: 00        BRK
  $B39F: 00        BRK
  $B3A0: 78        SEI
  $B3A1: 06 F9     ASL $f9
  $B3A3: 21 6D     AND ($6d,X)
  $B3A5: 00        BRK
  $B3A6: 00        BRK
  $B3A7: 7A        NOP
  $B3A8: 7B 7E 00  RRA $007e,Y
  $B3AB: 04 8D     NOP $8d
  $B3AD: 21 59     AND ($59,X)
  $B3AF: 5C 5D 57  NOP $575d,X
  $B3B2: 04 AC     NOP $ac
  $B3B4: 21 75     AND ($75,X)
  $B3B6: 5B 5E 5F  SRE $5f5e,Y
  $B3B9: 03 CC     SLO ($cc,X)
  $B3BB: 21 77     AND ($77,X)
  $B3BD: 71 74     ADC ($74),Y
  $B3BF: 02        ???
  $B3C0: ED 21 00  SBC $0021
  $B3C3: 76 00     ROR $00,X
  $B3C5: 02        ???
  $B3C6: 84 21     STY $21
  $B3C8: 45 50     EOR $50
  $B3CA: 03 A3     SLO ($a3,X)
  $B3CC: 21 55     AND ($55,X)
  $B3CE: 47 52     SRE $52
  $B3D0: 05 C2     ORA $c2
  $B3D2: 21 54     AND ($54,X)
  $B3D4: 00        BRK
  $B3D5: 00        BRK
  $B3D6: 00        BRK
  $B3D7: 51 06     EOR ($06),Y
  $B3D9: E1 21     SBC ($21,X)
  $B3DB: 56 00     LSR $00,X
  $B3DD: 00        BRK
  $B3DE: 00        BRK
  $B3DF: 00        BRK
  $B3E0: 53 00     SRE ($00),Y
  $B3E2: 06 F4     ASL $f4
  $B3E4: 0B F4     ANC #$f4
  $B3E6: 13 F4     SLO ($f4),Y
  $B3E8: 19 F4 22  ORA $22f4,Y
  $B3EB: F4 2D     NOP $2d,X
  $B3ED: F4 36     NOP $36,X
  $B3EF: F4 40     NOP $40,X
  $B3F1: F4 49     NOP $49,X
  $B3F3: F4 52     NOP $52,X
  $B3F5: F4 5B     NOP $5b,X
  $B3F7: F4 66     NOP $66,X
  $B3F9: F4 6F     NOP $6f,X
  $B3FB: F4 78     NOP $78,X
  $B3FD: F4 82     NOP $82,X
  $B3FF: F4 8A     NOP $8a,X
  $B401: F4 95     NOP $95,X
  $B403: F4 A2     NOP $a2,X
  $B405: F4 04     NOP $04,X
  $B407: 8B B0     XAA #$b0
  $B409: 48        PHA
  $B40A: 93 07     ??? ($07),Y
  $B40C: E7 A9     ISB $a9
  $B40E: 48        PHA
  $B40F: 8B B0     XAA #$b0
  $B411: 48        PHA
  $B412: 93 05     ??? ($05),Y
  $B414: 9C DC B3  SHY $b3dc,X
  $B417: AD D1 08  LDA $08d1
  $B41A: D9 81 E4  CMP $e481,Y
  $B41D: AD D1 9C  LDA $9cd1
  $B420: AE DD 0A  LDX $0add
  $B423: 84 48     STY $48
  $B425: E3 48     ISB ($48,X)
  $B427: 9C AE DD  SHY $ddae,X
  $B42A: 86 AE     STX $ae
  $B42C: 87 08     SAX $08
  $B42E: DD A6 81  CMP $81a6,X
  $B431: E5 8B     SBC $8b
  $B433: B0 48     BCS $b47d
  $B435: 93 09     ??? ($09),Y
  $B437: 8C A6 81  STY $81a6
  $B43A: D9 48 8B  CMP $8b48,Y
  $B43D: B0 48     BCS $b487
  $B43F: 93 08     ??? ($08),Y
  $B441: 85 9F     STA $9f
  $B443: 8E A7 8B  STX $8ba7
  $B446: B0 48     BCS $b490
  $B448: 93 08     ??? ($08),Y
  $B44A: 81 48     STA ($48,X)
  $B44C: D1 A8     CMP ($a8),Y
  $B44E: 8B B1     XAA #$b1
  $B450: AE 93 08  LDX $0893
  $B453: 8F 81 CF  SAX $cf81
  $B456: 48        PHA
  $B457: 8B B1     XAA #$b1
  $B459: AE 93 0A  LDX $0a93
  $B45C: 97 84     SAX $84,Y
  $B45E: 8F 81 CF  SAX $cf81
  $B461: 48        PHA
  $B462: 8B B1     XAA #$b1
  $B464: AE 93 08  LDX $0893
  $B467: 19 23 65  ORA $6523,Y
  $B46A: 0A        ASL A
  $B46B: 8B B0     XAA #$b0
  $B46D: 48        PHA
  $B46E: 93 08     ??? ($08),Y
  $B470: 86 AF     STX $af
  $B472: 98        TYA
  $B473: AD 8B B0  LDA $b08b
  $B476: 48        PHA
  $B477: 93 09     ??? ($09),Y
  $B479: 9B B4 81  TAS $81b4,Y
  $B47C: A3 48     LAX ($48,X)
  $B47E: 8B B1     XAA #$b1
  $B480: AE 93 07  LDX $0793
  $B483: 91 81     STA ($81),Y
  $B485: AD 8B B0  LDA $b08b
  $B488: 48        PHA
  $B489: 93 0A     ??? ($0a),Y
  $B48B: 8C 85 81  STY $8185
  $B48E: A6 E5     LDX $e5
  $B490: 99 A7 88  STA $88a7,Y
  $B493: 48        PHA
  $B494: AD 0C 8C  LDA $8c0c
  $B497: 85 81     STA $81
  $B499: A6 E5     LDX $e5
  $B49B: 91 81     STA ($81),Y
  $B49D: AD 8B B0  LDA $b08b
  $B4A0: 48        PHA
  $B4A1: 93 08     ??? ($08),Y
  $B4A3: DD A6 81  CMP $81a6,X
  $B4A6: E5 8F     SBC $8f
  $B4A8: 81 CF     STA ($cf,X)
  $B4AA: 48        PHA
  $B4AB: BD F4 DA  LDA $daf4,X
  $B4AE: F4 F7     NOP $f7,X
  $B4B0: F4 0C     NOP $0c,X
  $B4B2: F5 29     SBC $29,X
  $B4B4: F5 4E     SBC $4e,X
  $B4B6: F5 6D     SBC $6d,X
  $B4B8: F5 7A     SBC $7a,X
  $B4BA: F5 81     SBC $81,X
  $B4BC: F5 05     SBC $05,X
  $B4BE: 00        BRK
  $B4BF: 05 01     ORA $01
  $B4C1: 05 02     ORA $02
  $B4C3: 05 01     ORA $01
  $B4C5: 05 02     ORA $02
  $B4C7: 05 03     ORA $03
  $B4C9: 05 02     ORA $02
  $B4CB: 05 01     ORA $01
  $B4CD: 05 02     ORA $02
  $B4CF: 05 03     ORA $03
  $B4D1: 05 02     ORA $02
  $B4D3: 05 01     ORA $01
  $B4D5: 05 00     ORA $00
  $B4D7: FF BD F4  ISB $f4bd,X
  $B4DA: 05 04     ORA $04
  $B4DC: 05 01     ORA $01
  $B4DE: 05 02     ORA $02
  $B4E0: 05 01     ORA $01
  $B4E2: 05 02     ORA $02
  $B4E4: 05 03     ORA $03
  $B4E6: 05 02     ORA $02
  $B4E8: 05 01     ORA $01
  $B4EA: 05 02     ORA $02
  $B4EC: 05 03     ORA $03
  $B4EE: 05 02     ORA $02
  $B4F0: 05 01     ORA $01
  $B4F2: 05 04     ORA $04
  $B4F4: FF DA F4  ISB $f4da,X
  $B4F7: 04 05     NOP $05
  $B4F9: 04 06     NOP $06
  $B4FB: 04 07     NOP $07
  $B4FD: 04 06     NOP $06
  $B4FF: 04 07     NOP $07
  $B501: 04 06     NOP $06
  $B503: 04 07     NOP $07
  $B505: 04 06     NOP $06
  $B507: 04 05     NOP $05
  $B509: FF F7 F4  ISB $f4f7,X
  $B50C: 05 08     ORA $08
  $B50E: 05 09     ORA $09
  $B510: 05 0A     ORA $0a
  $B512: 05 09     ORA $09
  $B514: 05 0A     ORA $0a
  $B516: 05 09     ORA $09
  $B518: 05 08     ORA $08
  $B51A: 05 09     ORA $09
  $B51C: 05 0A     ORA $0a
  $B51E: 05 09     ORA $09
  $B520: 05 0A     ORA $0a
  $B522: 05 09     ORA $09
  $B524: 05 08     ORA $08
  $B526: FF 0C F5  ISB $f50c,X
  $B529: 08        PHP
  $B52A: 0B 04     ANC #$04
  $B52C: 0C 04 0D  NOP $0d04
  $B52F: 04 0C     NOP $0c
  $B531: 04 0D     NOP $0d
  $B533: 04 0C     NOP $0c
  $B535: 04 0D     NOP $0d
  $B537: 08        PHP
  $B538: 0E 04 0C  ASL $0c04
  $B53B: 04 0D     NOP $0d
  $B53D: 04 0C     NOP $0c
  $B53F: 04 0B     NOP $0b
  $B541: 04 0C     NOP $0c
  $B543: 08        PHP
  $B544: 0E 04 0C  ASL $0c04
  $B547: 04 0D     NOP $0d
  $B549: 04 0C     NOP $0c
  $B54B: FF 29 F5  ISB $f529,X
  $B54E: 05 0F     ORA $0f
  $B550: 05 10     ORA $10
  $B552: 05 11     ORA $11
  $B554: 05 10     ORA $10
  $B556: 05 11     ORA $11
  $B558: 05 10     ORA $10
  $B55A: 05 0F     ORA $0f
  $B55C: 05 10     ORA $10
  $B55E: 05 11     ORA $11
  $B560: 05 10     ORA $10
  $B562: 05 11     ORA $11
  $B564: 05 10     ORA $10
  $B566: 05 11     ORA $11
  $B568: 05 10     ORA $10
  $B56A: FF 4E F5  ISB $f54e,X
  $B56D: 0A        ASL A
  $B56E: 05 0A     ORA $0a
  $B570: 06 0F     ASL $0f
  $B572: 07 05     SLO $05
  $B574: 12        ???
  $B575: 05 13     ORA $13
  $B577: FF 73 F5  ISB $f573,X
  $B57A: 08        PHP
  $B57B: 14 08     NOP $08,X
  $B57D: 15 FF     ORA $ff,X
  $B57F: 7A        NOP
  $B580: F5 80     SBC $80,X
  $B582: 00        BRK
  $B583: FF 81 F5  ISB $f581,X
  $B586: B2        ???
  $B587: F5 D7     SBC $d7,X
  $B589: F5 DC     SBC $dc,X
  $B58B: F5 E1     SBC $e1,X
  $B58D: F5 E6     SBC $e6,X
  $B58F: F5 0B     SBC $0b,X
  $B591: F6 30     INC $30,X
  $B593: F6 35     INC $35,X
  $B595: F6 3A     INC $3a,X
  $B597: F6 5F     INC $5f,X
  $B599: F6 64     INC $64,X
  $B59B: F6 69     INC $69,X
  $B59D: F6 8E     INC $8e,X
  $B59F: F6 93     INC $93,X
  $B5A1: F6 98     INC $98,X
  $B5A3: F6 9D     INC $9d,X
  $B5A5: F6 C2     INC $c2,X
  $B5A7: F6 CC     INC $cc,X
  $B5A9: F6 D6     INC $d6,X
  $B5AB: F6 FB     INC $fb,X
  $B5AD: F6 09     INC $09,X
  $B5AF: F7 2E     ISB $2e,X
  $B5B1: F7 04     ISB $04,X
  $B5B3: C8        INY
  $B5B4: 22        ???
  $B5B5: 00        BRK
  $B5B6: B1 B4     LDA ($b4),Y
  $B5B8: B5 04     LDA $04,X
  $B5BA: E8        INX
  $B5BB: 22        ???
  $B5BC: 00        BRK
  $B5BD: B3 B6     LAX ($b6),Y
  $B5BF: B7 04     LAX $04,Y
  $B5C1: 08        PHP
  $B5C2: 23 00     RLA ($00,X)
  $B5C4: B9 BC BD  LDA $bdbc,Y
  $B5C7: 04 28     NOP $28
  $B5C9: 23 00     RLA ($00,X)
  $B5CB: BB BE BF  LAS $bfbe,Y
  $B5CE: 01 EA     ORA ($ea,X)
  $B5D0: 23 50     RLA ($50,X)
  $B5D2: 01 F2     ORA ($f2,X)
  $B5D4: 23 05     RLA ($05,X)
  $B5D6: 00        BRK
  $B5D7: 01 EA     ORA ($ea,X)
  $B5D9: 22        ???
  $B5DA: B0 00     BCS $b5dc
  $B5DC: 01 EA     ORA ($ea,X)
  $B5DE: 22        ???
  $B5DF: B2        ???
  $B5E0: 00        BRK
  $B5E1: 01 EA     ORA ($ea,X)
  $B5E3: 22        ???
  $B5E4: B8        CLV
  $B5E5: 00        BRK
  $B5E6: 04 C8     NOP $c8
  $B5E8: 22        ???
  $B5E9: 00        BRK
  $B5EA: F2        ???
  $B5EB: F3 F6     ISB ($f6),Y
  $B5ED: 04 E8     NOP $e8
  $B5EF: 22        ???
  $B5F0: 00        BRK
  $B5F1: B3 B6     LAX ($b6),Y
  $B5F3: B7 04     LAX $04,Y
  $B5F5: 08        PHP
  $B5F6: 23 00     RLA ($00,X)
  $B5F8: B9 BC BD  LDA $bdbc,Y
  $B5FB: 04 28     NOP $28
  $B5FD: 23 00     RLA ($00,X)
  $B5FF: BB BE BF  LAS $bfbe,Y
  $B602: 01 EA     ORA ($ea,X)
  $B604: 23 50     RLA ($50,X)
  $B606: 01 F2     ORA ($f2,X)
  $B608: 23 05     RLA ($05,X)
  $B60A: 00        BRK
  $B60B: 04 C8     NOP $c8
  $B60D: 22        ???
  $B60E: 00        BRK
  $B60F: B1 D9     LDA ($d9),Y
  $B611: DC 04 E8  NOP $e804,X
  $B614: 22        ???
  $B615: 00        BRK
  $B616: B3 DB     LAX ($db),Y
  $B618: DE 04 08  DEC $0804,X
  $B61B: 23 00     RLA ($00,X)
  $B61D: B9 BC BD  LDA $bdbc,Y
  $B620: 04 28     NOP $28
  $B622: 23 00     RLA ($00,X)
  $B624: BB BE BF  LAS $bfbe,Y
  $B627: 01 EA     ORA ($ea,X)
  $B629: 23 50     RLA ($50,X)
  $B62B: 01 F2     ORA ($f2,X)
  $B62D: 23 05     RLA ($05,X)
  $B62F: 00        BRK
  $B630: 01 EA     ORA ($ea,X)
  $B632: 22        ???
  $B633: D8        CLD
  $B634: 00        BRK
  $B635: 01 EA     ORA ($ea,X)
  $B637: 22        ???
  $B638: DA        NOP
  $B639: 00        BRK
  $B63A: 04 C8     NOP $c8
  $B63C: 22        ???
  $B63D: 00        BRK
  $B63E: B1 B4     LDA ($b4),Y
  $B640: B5 04     LDA $04,X
  $B642: E8        INX
  $B643: 22        ???
  $B644: 00        BRK
  $B645: F0 F1     BEQ $b638
  $B647: F4 04     NOP $04,X
  $B649: 08        PHP
  $B64A: 23 00     RLA ($00,X)
  $B64C: B9 BC BD  LDA $bdbc,Y
  $B64F: 04 28     NOP $28
  $B651: 23 00     RLA ($00,X)
  $B653: BB BE BF  LAS $bfbe,Y
  $B656: 01 EA     ORA ($ea,X)
  $B658: 23 50     RLA ($50,X)
  $B65A: 01 F2     ORA ($f2,X)
  $B65C: 23 05     RLA ($05,X)
  $B65E: 00        BRK
  $B65F: 01 EA     ORA ($ea,X)
  $B661: 22        ???
  $B662: EE 00 01  INC $0100
  $B665: EA        NOP
  $B666: 22        ???
  $B667: D3 00     DCP ($00),Y
  $B669: 04 C8     NOP $c8
  $B66B: 22        ???
  $B66C: 00        BRK
  $B66D: F2        ???
  $B66E: F3 F6     ISB ($f6),Y
  $B670: 04 E8     NOP $e8
  $B672: 22        ???
  $B673: 00        BRK
  $B674: B3 B0     LAX ($b0),Y
  $B676: B7 04     LAX $04,Y
  $B678: 08        PHP
  $B679: 23 00     RLA ($00,X)
  $B67B: B9 BC BD  LDA $bdbc,Y
  $B67E: 04 28     NOP $28
  $B680: 23 00     RLA ($00,X)
  $B682: BB BE BF  LAS $bfbe,Y
  $B685: 01 EA     ORA ($ea,X)
  $B687: 23 50     RLA ($50,X)
  $B689: 01 F2     ORA ($f2,X)
  $B68B: 23 05     RLA ($05,X)
  $B68D: 00        BRK
  $B68E: 01 EA     ORA ($ea,X)
  $B690: 22        ???
  $B691: D6 00     DEC $00,X
  $B693: 01 EA     ORA ($ea,X)
  $B695: 22        ???
  $B696: D7 00     DCP $00,X
  $B698: 01 EA     ORA ($ea,X)
  $B69A: 22        ???
  $B69B: F5 00     SBC $00,X
  $B69D: 04 C8     NOP $c8
  $B69F: 22        ???
  $B6A0: 00        BRK
  $B6A1: BA        TSX
  $B6A2: B4 B5     LDY $b5,X
  $B6A4: 04 E8     NOP $e8
  $B6A6: 22        ???
  $B6A7: 00        BRK
  $B6A8: 22        ???
  $B6A9: F1 F4     SBC ($f4),Y
  $B6AB: 04 08     NOP $08
  $B6AD: 23 00     RLA ($00,X)
  $B6AF: 23 BC     RLA ($bc,X)
  $B6B1: BD 04 28  LDA $2804,X
  $B6B4: 23 00     RLA ($00,X)
  $B6B6: 20 BE BF  JSR $bfbe
  $B6B9: 01 EA     ORA ($ea,X)
  $B6BB: 23 50     RLA ($50,X)
  $B6BD: 01 F2     ORA ($f2,X)
  $B6BF: 23 05     RLA ($05,X)
  $B6C1: 00        BRK
  $B6C2: 01 C9     ORA ($c9,X)
  $B6C4: 22        ???
  $B6C5: DD 02 E9  CMP $e902,X
  $B6C8: 22        ???
  $B6C9: DF EE 00  DCP $00ee,X
  $B6CC: 01 C9     ORA ($c9,X)
  $B6CE: 22        ???
  $B6CF: BA        TSX
  $B6D0: 02        ???
  $B6D1: E9 22     SBC #$22
  $B6D3: 22        ???
  $B6D4: D3 00     DCP ($00),Y
  $B6D6: 04 C8     NOP $c8
  $B6D8: 22        ???
  $B6D9: 00        BRK
  $B6DA: 00        BRK
  $B6DB: 00        BRK
  $B6DC: 00        BRK
  $B6DD: 04 E8     NOP $e8
  $B6DF: 22        ???
  $B6E0: 00        BRK
  $B6E1: 00        BRK
  $B6E2: 0C 0D 04  NOP $040d
  $B6E5: 08        PHP
  $B6E6: 23 00     RLA ($00,X)
  $B6E8: 0B 0E     ANC #$0e
  $B6EA: 0F 04 28  SLO $2804
  $B6ED: 23 00     RLA ($00,X)
  $B6EF: 21 24     AND ($24,X)
  $B6F1: 25 01     AND $01
  $B6F3: EA        NOP
  $B6F4: 23 50     RLA ($50,X)
  $B6F6: 01 F2     ORA ($f2,X)
  $B6F8: 23 05     RLA ($05,X)
  $B6FA: 00        BRK
  $B6FB: 02        ???
  $B6FC: E9 22     SBC #$22
  $B6FE: 08        PHP
  $B6FF: 09 01     ORA #$01
  $B701: 09 23     ORA #$23
  $B703: 0A        ASL A
  $B704: 01 29     ORA ($29,X)
  $B706: 23 20     RLA ($20,X)
  $B708: 00        BRK
  $B709: 04 C8     NOP $c8
  $B70B: 22        ???
  $B70C: 00        BRK
  $B70D: 00        BRK
  $B70E: 00        BRK
  $B70F: 70 04     BVS $b715
  $B711: E8        INX
  $B712: 22        ???
  $B713: 00        BRK
  $B714: 00        BRK
  $B715: 00        BRK
  $B716: 72        ???
  $B717: 04 08     NOP $08
  $B719: 23 00     RLA ($00,X)
  $B71B: 0B 0E     ANC #$0e
  $B71D: 0F 04 28  SLO $2804
  $B720: 23 00     RLA ($00,X)
  $B722: 21 24     AND ($24,X)
  $B724: 25 01     AND $01
  $B726: EA        NOP
  $B727: 23 50     RLA ($50,X)
  $B729: 01 F2     ORA ($f2,X)
  $B72B: 23 05     RLA ($05,X)
  $B72D: 00        BRK
  $B72E: 01 CB     ORA ($cb,X)
  $B730: 22        ???
  $B731: 71 01     ADC ($01),Y
  $B733: EB 22     SBC #$22
  $B735: 73 00     RRA ($00),Y
  $B737: 67 F7     RRA $f7
  $B739: 67 F7     RRA $f7
  $B73B: 67 F7     RRA $f7
  $B73D: 89 F7     NOP #$f7
  $B73F: 75 F7     ADC $f7,X
  $B741: A1 F7     LDA ($f7,X)
  $B743: 8F F7 95  SAX $95f7
  $B746: F7 9B     ISB $9b,X
  $B748: F7 C6     ISB $c6,X
  $B74A: F7 CC     ISB $cc,X
  $B74C: F7 95     ISB $95,X
  $B74E: F7 95     ISB $95,X
  $B750: F7 95     ISB $95,X
  $B752: F7 95     ISB $95,X
  $B754: F7 95     ISB $95,X
  $B756: F7 6E     ISB $6e,X
  $B758: F7 AD     ISB $ad,X
  $B75A: F7 B3     ISB $b3,X
  $B75C: F7 B9     ISB $b9,X
  $B75E: F7 A7     ISB $a7,X
  $B760: F7 BF     ISB $bf,X
  $B762: F7 7B     ISB $7b,X
  $B764: F7 82     ISB $82,X
  $B766: F7 00     ISB $00,X
  $B768: 22        ???
  $B769: 05 08     ORA $08
  $B76B: 02        ???
  $B76C: 00        BRK
  $B76D: 01 08     ORA ($08,X)
  $B76F: 22        ???
  $B770: 06 18     ASL $18
  $B772: 02        ???
  $B773: 02        ???
  $B774: 03 08     SLO ($08,X)
  $B776: 22        ???
  $B777: 06 0A     ASL $0a
  $B779: 01 04     ORA ($04,X)
  $B77B: 08        PHP
  $B77C: 22        ???
  $B77D: 06 18     ASL $18
  $B77F: 02        ???
  $B780: 08        PHP
  $B781: 13 08     SLO ($08),Y
  $B783: 22        ???
  $B784: 06 18     ASL $18
  $B786: 02        ???
  $B787: 09 0F     ORA #$0f
  $B789: 00        BRK
  $B78A: 22        ???
  $B78B: 06 08     ASL $08
  $B78D: 01 0A     ORA ($0a,X)
  $B78F: 12        ???
  $B790: 22        ???
  $B791: 06 0C     ASL $0c
  $B793: 01 0B     ORA ($0b,X)
  $B795: 12        ???
  $B796: 22        ???
  $B797: 06 0C     ASL $0c
  $B799: 01 10     ORA ($10,X)
  $B79B: 14 22     NOP $22,X
  $B79D: 06 0C     ASL $0c
  $B79F: 01 07     ORA ($07,X)
  $B7A1: 08        PHP
  $B7A2: 22        ???
  $B7A3: 03 0F     SLO ($0f,X)
  $B7A5: 01 05     ORA ($05,X)
  $B7A7: 08        PHP
  $B7A8: 22        ???
  $B7A9: 06 18     ASL $18
  $B7AB: 01 06     ORA ($06,X)
  $B7AD: 08        PHP
  $B7AE: 22        ???
  $B7AF: 06 18     ASL $18
  $B7B1: 01 0C     ORA ($0c,X)
  $B7B3: 08        PHP
  $B7B4: 22        ???
  $B7B5: 06 18     ASL $18
  $B7B7: 01 0D     ORA ($0d,X)
  $B7B9: 08        PHP
  $B7BA: 22        ???
  $B7BB: 06 18     ASL $18
  $B7BD: 01 0E     ORA ($0e,X)
  $B7BF: 08        PHP
  $B7C0: 22        ???
  $B7C1: 06 18     ASL $18
  $B7C3: 02        ???
  $B7C4: 02        ???
  $B7C5: 0F 08 22  SLO $2208
  $B7C8: 04 0F     NOP $0f
  $B7CA: 01 11     ORA ($11,X)
  $B7CC: 08        PHP
  $B7CD: 22        ???
  $B7CE: 05 0F     ORA $0f
  $B7D0: 01 12     ORA ($12,X)
  $B7D2: FA        NOP
  $B7D3: F7 00     ISB $00,X
  $B7D5: F8        SED
  $B7D6: 07 F8     SLO $f8
  $B7D8: 0D F8 17  ORA $17f8
  $B7DB: F8        SED
  $B7DC: 35 F8     AND $f8,X
  $B7DE: 3B F8 49  RLA $49f8,Y
  $B7E1: F8        SED
  $B7E2: 21 F8     AND ($f8,X)
  $B7E4: 27 F8     RLA $f8
  $B7E6: 2D F8 71  AND $71f8
  $B7E9: F8        SED
  $B7EA: 53 F8     SRE ($f8),Y
  $B7EC: 5B F8 65  SRE $65f8,Y
  $B7EF: F8        SED
  $B7F0: 7B F8 85  RRA $85f8,Y
  $B7F3: F8        SED
  $B7F4: 8F F8 96  SAX $96f8
  $B7F7: F8        SED
  $B7F8: 9E F8 02  SHX $02f8,Y
  $B7FB: 01 03     ORA ($03,X)
  $B7FD: 07 01     SLO $01
  $B7FF: 00        BRK
  $B800: 05 01     ORA $01
  $B802: 05 07     ORA $07
  $B804: 02        ???
  $B805: 01 02     ORA ($02,X)
  $B807: 02        ???
  $B808: 02        ???
  $B809: 06 08     ASL $08
  $B80B: 01 03     ORA ($03,X)
  $B80D: 02        ???
  $B80E: 0A        ASL A
  $B80F: 0A        ASL A
  $B810: 0C 05 04  NOP $0405
  $B813: 05 06     ORA $06
  $B815: 07 08     SLO $08
  $B817: 02        ???
  $B818: 02        ???
  $B819: 0A        ASL A
  $B81A: 08        PHP
  $B81B: 05 09     ORA $09
  $B81D: 12        ???
  $B81E: 13 14     SLO ($14),Y
  $B820: 15 02     ORA $02,X
  $B822: 00        BRK
  $B823: 06 0A     ASL $0a
  $B825: 01 29     ORA ($29,X)
  $B827: 02        ???
  $B828: 00        BRK
  $B829: 06 0A     ASL $0a
  $B82B: 01 2A     ORA ($2a,X)
  $B82D: 02        ???
  $B82E: 01 06     ORA ($06,X)
  $B830: 07 03     SLO $03
  $B832: 2B 2C     ANC #$2c
  $B834: 2D 02 00  AND $0002
  $B837: 04 0F     NOP $0f
  $B839: 01 0A     ORA ($0a,X)
  $B83B: 02        ???
  $B83C: 00        BRK
  $B83D: 0A        ASL A
  $B83E: 0C 09 11  NOP $1109
  $B841: 1B 1C 1D  SLO $1d1c,Y
  $B844: 1E 20 21  ASL $2120,X
  $B847: 22        ???
  $B848: 23 02     RLA ($02,X)
  $B84A: 00        BRK
  $B84B: 0A        ASL A
  $B84C: 0C 05 1F  NOP $1f05
  $B84F: 0D 0E 0F  ORA $0f0e
  $B852: 10 02     BPL $b856
  $B854: 00        BRK
  $B855: 04 0C     NOP $0c
  $B857: 03 11     SLO ($11,X)
  $B859: 1B 20 02  SLO $0220,Y
  $B85C: 00        BRK
  $B85D: 06 0C     ASL $0c
  $B85F: 05 11     ORA $11
  $B861: 1B 1C 20  SLO $201c,Y
  $B864: 21 02     AND ($02,X)
  $B866: 00        BRK
  $B867: 08        PHP
  $B868: 0C 07 11  NOP $1107
  $B86B: 1B 1C 1D  SLO $1d1c,Y
  $B86E: 20 21 22  JSR $2221
  $B871: 02        ???
  $B872: 00        BRK
  $B873: 0A        ASL A
  $B874: 0C 05 16  NOP $1605
  $B877: 17 18     SLO $18,X
  $B879: 19 1A 02  ORA $021a,Y
  $B87C: 0A        ASL A
  $B87D: 0A        ASL A
  $B87E: 0C 05 24  NOP $2405
  $B881: 25 26     AND $26
  $B883: 27 28     RLA $28
  $B885: 02        ???
  $B886: 00        BRK
  $B887: 0A        ASL A
  $B888: 0C 05 04  NOP $0405
  $B88B: 05 06     ORA $06
  $B88D: 07 08     SLO $08
  $B88F: 02        ???
  $B890: 00        BRK
  $B891: 06 0F     ASL $0f
  $B893: 02        ???
  $B894: 0A        ASL A
  $B895: 0B 02     ANC #$02
  $B897: 00        BRK
  $B898: 08        PHP
  $B899: 0F 03 0A  SLO $0a03
  $B89C: 0B 0C     ANC #$0c
  $B89E: 02        ???
  $B89F: 0A        ASL A
  $B8A0: 0A        ASL A
  $B8A1: 0C 05 04  NOP $0405
  $B8A4: 05 06     ORA $06
  $B8A6: 07 08     SLO $08
  $B8A8: 04 F9     NOP $f9
  $B8AA: 09 F9     ORA #$f9
  $B8AC: 0E F9 13  ASL $13f9
  $B8AF: F9 1C F9  SBC $f91c,Y
  $B8B2: 21 F9     AND ($f9,X)
  $B8B4: 29 F9     AND #$f9
  $B8B6: 31 F9     AND ($f9),Y
  $B8B8: 39 F9 41  AND $41f9,Y
  $B8BB: F9 4A F9  SBC $f94a,Y
  $B8BE: 4F F9 54  SRE $54f9
  $B8C1: F9 59 F9  SBC $f959,Y
  $B8C4: 61 F9     ADC ($f9,X)
  $B8C6: 69 F9     ADC #$f9
  $B8C8: 71 F9     ADC ($f9),Y
  $B8CA: 79 F9 82  ADC $82f9,Y
  $B8CD: F9 87 F9  SBC $f987,Y
  $B8D0: 8C F9 91  STY $91f9
  $B8D3: F9 96 F9  SBC $f996,Y
  $B8D6: 9B F9 A3  TAS $a3f9,Y
  $B8D9: F9 AB F9  SBC $f9ab,Y
  $B8DC: B3 F9     LAX ($f9),Y
  $B8DE: BB F9 C0  LAS $c0f9,Y
  $B8E1: F9 C5 F9  SBC $f9c5,Y
  $B8E4: CA        DEX
  $B8E5: F9 CF F9  SBC $f9cf,Y
  $B8E8: D4 F9     NOP $f9,X
  $B8EA: DA        NOP
  $B8EB: F9 E0 F9  SBC $f9e0,Y
  $B8EE: E6 F9     INC $f9
  $B8F0: EC F9 F1  CPX $f1f9
  $B8F3: F9 F9 F9  SBC $f9f9,Y
  $B8F6: 06 FA     ASL $fa
  $B8F8: 12        ???
  $B8F9: FA        NOP
  $B8FA: 1A        NOP
  $B8FB: FA        NOP
  $B8FC: 20 FA 26  JSR $26fa
  $B8FF: FA        NOP
  $B900: 2C FA 31  BIT $31fa
  $B903: FA        NOP
  $B904: 11 FF     ORA ($ff),Y
  $B906: F0 FF     BEQ $b907
  $B908: FF 11 FF  ISB $ff11,X
  $B90B: FD FF FF  SBC $ffff,X
  $B90E: 31 FF     AND ($ff),Y
  $B910: FE FF FF  INC $ffff,X
  $B913: 21 5D     AND ($5d,X)
  $B915: 02        ???
  $B916: 0C 28 3A  NOP $3a28
  $B919: 37 FF     RLA $ff,X
  $B91B: FF 02 FF  ISB $ff02,X
  $B91E: F2        ???
  $B91F: FF FF 21  ISB $21ff,X
  $B922: FF FC 50  ISB $50fc,X
  $B925: FF F3 FF  ISB $fff3,X
  $B928: FF 41 FF  ISB $ff41,X
  $B92B: FC 51 FF  NOP $ff51,X
  $B92E: F4 FF     NOP $ff,X
  $B930: FF 61 FF  ISB $ff61,X
  $B933: FC 52 FF  NOP $ff52,X
  $B936: F5 FF     SBC $ff,X
  $B938: FF 81 FF  ISB $ff81,X
  $B93B: FC 53 FF  NOP $ff53,X
  $B93E: F6 FF     INC $ff,X
  $B940: FF 01 59  ISB $5901,X
  $B943: 29 15     AND #$15
  $B945: E8        INX
  $B946: 8C 37 FF  STY $ff37
  $B949: FF 22 FF  ISB $ff22,X
  $B94C: E4 FF     CPX $ff
  $B94E: FF 42 FF  ISB $ff42,X
  $B951: E4 FF     CPX $ff
  $B953: FF 62 FF  ISB $ff62,X
  $B956: E4 FF     CPX $ff
  $B958: FF 21 FF  ISB $ff21,X
  $B95B: FC 50 FF  NOP $ff50,X
  $B95E: EC FF FF  CPX $ffff
  $B961: 41 FF     EOR ($ff,X)
  $B963: FC 54 FF  NOP $ff54,X
  $B966: ED FF FF  SBC $ffff
  $B969: 61 FF     ADC ($ff,X)
  $B96B: FC 55 FF  NOP $ff55,X
  $B96E: EE FF FF  INC $ffff
  $B971: 81 FF     STA ($ff,X)
  $B973: FC 56 FF  NOP $ff56,X
  $B976: EF FF FF  ISB $ffff
  $B979: 03 5D     SLO ($5d,X)
  $B97B: 02        ???
  $B97C: 0C 28 3A  NOP $3a28
  $B97F: 37 FF     RLA $ff,X
  $B981: FF 22 FF  ISB $ff22,X
  $B984: F1 FF     SBC ($ff),Y
  $B986: FF 42 FF  ISB $ff42,X
  $B989: F1 FF     SBC ($ff),Y
  $B98B: FF 62 FF  ISB $ff62,X
  $B98E: F1 FF     SBC ($ff),Y
  $B990: FF 82 FF  ISB $ff82,X
  $B993: F1 FF     SBC ($ff),Y
  $B995: FF 02 FF  ISB $ff02,X
  $B998: F7 FF     ISB $ff,X
  $B99A: FF 21 FF  ISB $ff21,X
  $B99D: FC 50 FF  NOP $ff50,X
  $B9A0: F8        SED
  $B9A1: FF FF 41  ISB $41ff,X
  $B9A4: FF FC 51  ISB $51fc,X
  $B9A7: FF F9 FF  ISB $fff9,X
  $B9AA: FF 61 FF  ISB $ff61,X
  $B9AD: FC 52 FF  NOP $ff52,X
  $B9B0: FA        NOP
  $B9B1: FF FF 81  ISB $81ff,X
  $B9B4: FF FC 53  ISB $53fc,X
  $B9B7: FF FB FF  ISB $fffb,X
  $B9BA: FF 21 FF  ISB $ff21,X
  $B9BD: EB FF     SBC #$ff
  $B9BF: FF 41 FF  ISB $ff41,X
  $B9C2: EB FF     SBC #$ff
  $B9C4: FF 61 FF  ISB $ff61,X
  $B9C7: EB FF     SBC #$ff
  $B9C9: FF 81 FF  ISB $ff81,X
  $B9CC: EB FF     SBC #$ff
  $B9CE: FF 02 FF  ISB $ff02,X
  $B9D1: EA        NOP
  $B9D2: FF FF 26  ISB $26ff,X
  $B9D5: FF FC 59  ISB $59fc,X
  $B9D8: FF FF 46  ISB $46ff,X
  $B9DB: FF FC 59  ISB $59fc,X
  $B9DE: FF FF 66  ISB $66ff,X
  $B9E1: FF FC 59  ISB $59fc,X
  $B9E4: FF FF 86  ISB $86ff,X
  $B9E7: FF FC 59  ISB $59fc,X
  $B9EA: FF FF 02  ISB $02ff,X
  $B9ED: FF E5 FF  ISB $ffe5,X
  $B9F0: FF 21 FF  ISB $ff21,X
  $B9F3: FC 50 FF  NOP $ff50,X
  $B9F6: E6 FF     INC $ff
  $B9F8: FF 41 FF  ISB $ff41,X
  $B9FB: FC 5A 3A  NOP $3a5a,X
  $B9FE: 3A        NOP
  $B9FF: 3A        NOP
  $BA00: 3A        NOP
  $BA01: 3A        NOP
  $BA02: FF E7 FF  ISB $ffe7,X
  $BA05: FF 61 FF  ISB $ff61,X
  $BA08: FC 34 3A  NOP $3a34,X
  $BA0B: 3A        NOP
  $BA0C: 3A        NOP
  $BA0D: 3A        NOP
  $BA0E: FF E8 FF  ISB $ffe8,X
  $BA11: FF 81 FF  ISB $ff81,X
  $BA14: FC 52 FF  NOP $ff52,X
  $BA17: E9 FF     SBC #$ff
  $BA19: FF 21 FF  ISB $ff21,X
  $BA1C: FC 62 FF  NOP $ff62,X
  $BA1F: FF 21 FF  ISB $ff21,X
  $BA22: FC 63 FF  NOP $ff63,X
  $BA25: FF 01 FF  ISB $ff01,X
  $BA28: FC 66 FF  NOP $ff66,X
  $BA2B: FF 21 FF  ISB $ff21,X
  $BA2E: FD FF FF  SBC $ffff,X
  $BA31: 41 FF     EOR ($ff,X)
  $BA33: FE FF FF  INC $ffff,X
  $BA36: 60        RTS
  $BA37: FA        NOP
  $BA38: 64 FA     NOP $fa
  $BA3A: 68        PLA
  $BA3B: FA        NOP
  $BA3C: 6C FA 74  JMP ($74fa)
  $BA3F: FA        NOP
  $BA40: 7A        NOP
  $BA41: FA        NOP
  $BA42: 80 FA     NOP #$fa
  $BA44: 88        DEY
  $BA45: FA        NOP
  $BA46: 90 FA     BCC $ba42
  $BA48: 98        TYA
  $BA49: FA        NOP
  $BA4A: 9F FA A7  ??? $a7fa,Y
  $BA4D: FA        NOP
  $BA4E: AF FA B9  LAX $b9fa
  $BA51: FA        NOP
  $BA52: BC FA BF  LDY $bffa,X
  $BA55: FA        NOP
  $BA56: C2 FA     NOP #$fa
  $BA58: C5 FA     CMP $fa
  $BA5A: C8        INY
  $BA5B: FA        NOP
  $BA5C: CB FA     AXS #$fa
  $BA5E: D1 FA     CMP ($fa),Y
  $BA60: 1E C1 3D  ASL $3dc1,X
  $BA63: FF 3C C1  ISB $c13c,X
  $BA66: 95 FF     STA $ff,X
  $BA68: 3C 95 85  NOP $8595,X
  $BA6B: FF CE 85  ISB $85ce,X
  $BA6E: 8D 95 9D  STA $9d95
  $BA71: A5 AD     LDA $ad
  $BA73: FF 5A C1  ISB $c15a,X
  $BA76: 45 DD     EOR $dd
  $BA78: 3D FF 5A  AND $5aff,X
  $BA7B: C1 AD     CMP ($ad,X)
  $BA7D: 85 3D     STA $3d
  $BA7F: FF 5A C1  ISB $c15a,X
  $BA82: 95 3D     STA $3d,X
  $BA84: C1 6D     CMP ($6d,X)
  $BA86: 3D FF 5A  AND $5aff,X
  $BA89: C1 85     CMP ($85,X)
  $BA8B: 45 AD     EOR $ad
  $BA8D: 9D 3D FF  STA $ff3d,X
  $BA90: 5A        NOP
  $BA91: C1 DD     CMP ($dd,X)
  $BA93: 3D C1 95  AND $95c1,X
  $BA96: 3D FF 5A  AND $5aff,X
  $BA99: C1 95     CMP ($95,X)
  $BA9B: 45 DD     EOR $dd
  $BA9D: 3D FF 5A  AND $5aff,X
  $BAA0: C1 9D     CMP ($9d,X)
  $BAA2: 3D C1 6D  AND $6dc1,X
  $BAA5: 3D FF 5A  AND $5aff,X
  $BAA8: C1 95     CMP ($95,X)
  $BAAA: 3D C1 45  AND $45c1,X
  $BAAD: 3D FF 5A  AND $5aff,X
  $BAB0: C1 45     CMP ($45,X)
  $BAB2: DD 3D 9D  CMP $9d3d,X
  $BAB5: 45 95     EOR $95
  $BAB7: 3D FF 01  AND $01ff,X
  $BABA: 84 FF     STY $ff
  $BABC: 01 9C     ORA ($9c,X)
  $BABE: FF 01 AC  ISB $ac01,X
  $BAC1: FF 01 DC  ISB $dc01,X
  $BAC4: FF 01 44  ISB $4401,X
  $BAC7: FF 01 94  ISB $9401,X
  $BACA: FF 3C C1  ISB $c13c,X
  $BACD: 85 DD     STA $dd
  $BACF: 3D FF 01  AND $01ff,X
  $BAD2: 3C FF 05  NOP $05ff,X
  $BAD5: 31 68     AND ($68),Y
  $BAD7: D8        CLD
  $BAD8: 88        DEY
  $BAD9: 86 84     STX $84
  $BADB: 33 41     RLA ($41),Y
  $BADD: 27 4B     RLA $4b
  $BADF: 22        ???
  $BAE0: 29 25     AND #$25
  $BAE2: 22        ???
  $BAE3: C1 40     CMP ($40,X)
  $BAE5: 48        PHA
  $BAE6: 2A        ROL A
  $BAE7: EF FA 06  ISB $06fa
  $BAEA: FB 2C FB  ISB $fb2c,Y
  $BAED: 36 FB     ROL $fb,X
  $BAEF: 00        BRK
  $BAF0: 01 02     ORA ($02,X)
  $BAF2: 00        BRK
  $BAF3: 00        BRK
  $BAF4: 00        BRK
  $BAF5: 23 00     RLA ($00,X)
  $BAF7: 00        BRK
  $BAF8: 00        BRK
  $BAF9: 00        BRK
  $BAFA: 05 06     ORA $06
  $BAFC: 08        PHP
  $BAFD: 09 09     ORA #$09
  $BAFF: 0D 0C 0F  ORA $0f0c
  $BB02: 10 10     BPL $bb14
  $BB04: 2B 10     ANC #$10
  $BB06: 11 14     ORA ($14),Y
  $BB08: 12        ???
  $BB09: 11 11     ORA ($11),Y
  $BB0B: 11 2E     ORA ($2e),Y
  $BB0D: 11 11     ORA ($11),Y
  $BB0F: 11 11     ORA ($11),Y
  $BB11: 11 11     ORA ($11),Y
  $BB13: 12        ???
  $BB14: 11 11     ORA ($11),Y
  $BB16: 14 12     NOP $12,X
  $BB18: 14 11     NOP $11,X
  $BB1A: 11 2C     ORA ($2c),Y
  $BB1C: 11 12     ORA ($12),Y
  $BB1E: 13 2D     SLO ($2d),Y
  $BB20: 11 15     ORA ($15),Y
  $BB22: 15 17     ORA $17,X
  $BB24: 31 20     AND ($20),Y
  $BB26: 20 22 21  JSR $2122
  $BB29: 22        ???
  $BB2A: 21 3A     AND ($3a,X)
  $BB2C: 00        BRK
  $BB2D: 00        BRK
  $BB2E: 03 04     SLO ($04,X)
  $BB30: 07 09     SLO $09
  $BB32: 0A        ASL A
  $BB33: 0B 0E     ANC #$0e
  $BB35: 10 15     BPL $bb4c
  $BB37: 16 18     ASL $18,X
  $BB39: 19 1A 1B  ORA $1b1a,Y
  $BB3C: 1C 1D 1E  NOP $1e1d,X
  $BB3F: 1F 20 21  SLO $2120,X
  $BB42: 3C 36 0F  NOP $0f36,X
  $BB45: 30 11     BMI $bb58
  $BB47: 36 00     ROL $00,X
  $BB49: 30 11     BMI $bb5c
  $BB4B: 36 07     ROL $07,X
  $BB4D: 30 11     BMI $bb60
  $BB4F: 36 0F     ROL $0f,X
  $BB51: 27 00     RLA $00
  $BB53: 36 0F     ROL $0f,X
  $BB55: 14 30     NOP $30,X
  $BB57: 36 00     ROL $00,X
  $BB59: 14 30     NOP $30,X
  $BB5B: 36 07     ROL $07,X
  $BB5D: 14 30     NOP $30,X
  $BB5F: 36 0F     ROL $0f,X
  $BB61: 12        ???
  $BB62: 31 36     AND ($36),Y
  $BB64: 07 12     SLO $12
  $BB66: 31 36     AND ($36),Y
  $BB68: 0F 19 30  SLO $3019
  $BB6B: 36 0F     ROL $0f,X
  $BB6D: 00        BRK
  $BB6E: 00        BRK
  $BB6F: 36 0F     ROL $0f,X
  $BB71: 16 16     ASL $16,X
  $BB73: 36 07     ROL $07,X
  $BB75: 16 16     ASL $16,X
  $BB77: 36 00     ROL $00,X
  $BB79: 16 16     ASL $16,X
  $BB7B: 36 0F     ROL $0f,X
  $BB7D: 37 00     RLA $00,X
  $BB7F: 36 00     ROL $00,X
  $BB81: 37 00     RLA $00,X
  $BB83: 36 0F     ROL $0f,X
  $BB85: 00        BRK
  $BB86: 0F 36 0F  SLO $0f36
  $BB89: 11 30     ORA ($30),Y
  $BB8B: 36 07     ROL $07,X
  $BB8D: 11 30     ORA ($30),Y
  $BB8F: 36 15     ROL $15,X
  $BB91: 11 30     ORA ($30),Y
  $BB93: 36 00     ROL $00,X
  $BB95: 11 30     ORA ($30),Y
  $BB97: 35 16     AND $16,X
  $BB99: 2C 0F 36  BIT $360f
  $BB9C: 0F 31 30  SLO $3031
  $BB9F: 26 0F     ROL $0f
  $BBA1: 31 30     AND ($30),Y
  $BBA3: 35 37     AND $37,X
  $BBA5: 30 11     BMI $bbb8
  $BBA7: 35 27     AND $27,X
  $BBA9: 37 37     RLA $37,X
  $BBAB: 26 0F     ROL $0f
  $BBAD: 37 0F     RLA $0f,X
  $BBAF: 35 37     AND $37,X
  $BBB1: 16 16     ASL $16,X
  $BBB3: 35 27     AND $27,X
  $BBB5: 16 30     ASL $30,X
  $BBB7: 26 0F     ROL $0f
  $BBB9: 29 16     AND #$16
  $BBBB: 35 0F     AND $0f,X
  $BBBD: 16 11     ASL $11,X
  $BBBF: 35 27     AND $27,X
  $BBC1: 30 16     BMI $bbd9
  $BBC3: 35 37     AND $37,X
  $BBC5: 23 30     RLA ($30,X)
  $BBC7: 35 27     AND $27,X
  $BBC9: 30 0F     BMI $bbda
  $BBCB: 35 37     AND $37,X
  $BBCD: 30 0F     BMI $bbde
  $BBCF: 36 0F     ROL $0f,X
  $BBD1: 19 00 36  ORA $3600,Y
  $BBD4: 06 37     ASL $37
  $BBD6: 00        BRK
  $BBD7: 36 11     ROL $11,X
  $BBD9: 2C 16 36  BIT $3616
  $BBDC: 06 16     ASL $16
  $BBDE: 19 36 11  ORA $1136,Y
  $BBE1: 27 37     RLA $37
  $BBE3: 36 06     ROL $06,X
  $BBE5: 37 11     RLA $11,X
  $BBE7: 36 11     ROL $11,X
  $BBE9: 19 19 36  ORA $3619,Y
  $BBEC: 0A        ASL A
  $BBED: 16 16     ASL $16,X
  $BBEF: 36 24     ROL $24,X
  $BBF1: 30 16     BMI $bc09
  $BBF3: 36 21     ROL $21,X
  $BBF5: 00        BRK
  $BBF6: 19 36 30  ORA $3036,Y
  $BBF9: 00        BRK
  $BBFA: 21 36     AND ($36,X)
  $BBFC: 0F 19 00  SLO $0019
  $BBFF: 36 16     ROL $16,X
  $BC01: 10 00     BPL $bc03
  $BC03: 26 0F     ROL $0f
  $BC05: 00        BRK
  $BC06: 0F 35 37  SLO $3735
  $BC09: 10 00     BPL $bc0b
  $BC0B: 35 27     AND $27,X
  $BC0D: 37 00     RLA $00,X
  $BC0F: 26 0F     ROL $0f
  $BC11: 11 00     ORA ($00),Y
  $BC13: 35 16     AND $16,X
  $BC15: 37 00     RLA $00,X
  $BC17: 35 27     AND $27,X
  $BC19: 19 37 26  ORA $2637,Y
  $BC1C: 0F 16 11  SLO $1116
  $BC1F: 35 0F     AND $0f,X
  $BC21: 11 11     ORA ($11),Y
  $BC23: 35 27     AND $27,X
  $BC25: 16 29     ASL $29,X
  $BC27: 35 37     AND $37,X
  $BC29: 29 16     AND #$16
  $BC2B: 35 37     AND $37,X
  $BC2D: 16 00     ASL $00,X
  $BC2F: 26 00     ROL $00
  $BC31: 30 16     BMI $bc49
  $BC33: 26 0F     ROL $0f
  $BC35: 00        BRK
  $BC36: 0F 00 00  SLO $0000
  $BC39: 00        BRK
  $BC3A: 00        BRK
  $BC3B: 00        BRK
  $BC3C: 00        BRK
  $BC3D: 00        BRK
  $BC3E: 00        BRK
  $BC3F: 00        BRK
  $BC40: 00        BRK
  $BC41: 00        BRK
  $BC42: 00        BRK
  $BC43: 00        BRK
  $BC44: 00        BRK
  $BC45: 00        BRK
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