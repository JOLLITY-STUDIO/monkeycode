.segment "???"
.include "bank_ram.inc"
; 0x03E010-0x04000F

- - - - - - 0x03E010 0F:8000: FF        .byte $FF   ; 
- - - - - - 0x03E011 0F:8001: 18        .byte $18   ; 
C - - - - - 0x03E012 0F:8002: 69 01     ADC #$01
C - - - - - 0x03E014 0F:8004: A0 06     LDY #$06
C - - - - - 0x03E016 0F:8006: 18        CLC
C - - - - - 0x03E017 0F:8007: 71 34     ADC (ram_0034),Y
C - - - - - 0x03E019 0F:8009: C9 D0     CMP #$D0
C - - - - - 0x03E01B 0F:800B: 90 02     BCC $800F
C - - - - - 0x03E01D 0F:800D: A9 CF     LDA #$CF
C - - - - - 0x03E01F 0F:800F: C9 30     CMP #$30
C - - - - - 0x03E021 0F:8011: B0 02     BCS $8015
C - - - - - 0x03E023 0F:8013: A9 30     LDA #$30
C - - - - - 0x03E025 0F:8015: 91 34     STA (ram_0034),Y
C - - - - - 0x03E027 0F:8017: AD 41 04  LDA ram_0441
C - - - - - 0x03E02A 0F:801A: AE FC 05  LDX ram_05FC
C - - - - - 0x03E02D 0F:801D: 8E 41 04  STX ram_0441
C - - - - - 0x03E030 0F:8020: 8D FC 05  STA ram_05FC
C - - - - - 0x03E033 0F:8023: 20 59 E0  JSR $E059
C - - - - - 0x03E036 0F:8026: A9 FF     LDA #$FF
C - - - - - 0x03E038 0F:8028: 8D 1A 06  STA ram_061A
C - - - - - 0x03E03B 0F:802B: A9 01     LDA #$01
C - - - - - 0x03E03D 0F:802D: 8D 1B 06  STA ram_061B
C - - - - - 0x03E040 0F:8030: 20 3E E7  JSR $E73E
C - - - - - 0x03E043 0F:8033: AD FC 05  LDA ram_05FC
C - - - - - 0x03E046 0F:8036: 8D 41 04  STA ram_0441
C - - - - - 0x03E049 0F:8039: 20 EC E6  JSR $E6EC
C - - - - - 0x03E04C 0F:803C: 48        PHA
C - - - - - 0x03E04D 0F:803D: A5 22     LDA ram_0022
C - - - - - 0x03E04F 0F:803F: A9 1A     LDA #$1A
C - - - - - 0x03E051 0F:8041: 85 24     STA ram_0024
C - - - - - 0x03E053 0F:8043: A9 1B     LDA #$1B
C - - - - - 0x03E055 0F:8045: 85 25     STA ram_0025
C - - - - - 0x03E057 0F:8047: 20 2D CE  JSR $CE2D
C - - - - - 0x03E05A 0F:804A: 68        PLA
C - - - - - 0x03E05B 0F:804B: 20 1E 80  JSR $801E
C - - - - - 0x03E05E 0F:804E: A9 1B     LDA #$1B
C - - - - - 0x03E060 0F:8050: 20 B0 CB  JSR $CBB0
C - - - - - 0x03E063 0F:8053: A2 50     LDX #$50
C - - - - - 0x03E065 0F:8055: 9A        TXS
C - - - - - 0x03E066 0F:8056: 4C DF E0  JMP $E0DF
C D 3 - - - 0x03E069 0F:8059: AD FC 05  LDA ram_05FC
C - - - - - 0x03E06C 0F:805C: C9 FF     CMP #$FF
C - - - - - 0x03E06E 0F:805E: F0 13     BEQ $8073
C - - - - - 0x03E070 0F:8060: 20 7C CD  JSR $CD7C
C - - - - - 0x03E073 0F:8063: A0 06     LDY #$06
C - - - - - 0x03E075 0F:8065: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E077 0F:8067: AA        TAX
C - - - - - 0x03E078 0F:8068: A0 08     LDY #$08
C - - - - - 0x03E07A 0F:806A: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E07C 0F:806C: A8        TAY
C - - - - - 0x03E07D 0F:806D: 20 E2 CD  JSR $CDE2
C - - - - - 0x03E080 0F:8070: 8D 38 06  STA ram_0638
C - - - - - 0x03E083 0F:8073: 60        RTS
C D 3 - - - 0x03E084 0F:8074: AD FF 05  LDA ram_05FF
C - - - - - 0x03E087 0F:8077: F0 65     BEQ $80DE
C - - - - - 0x03E089 0F:8079: A9 0F     LDA #$0F
C - - - - - 0x03E08B 0F:807B: 8D 2A 06  STA ram_062A
C - - - - - 0x03E08E 0F:807E: 20 09 E7  JSR $E709
C - - - - - 0x03E091 0F:8081: A9 00     LDA #$00
C - - - - - 0x03E093 0F:8083: 48        PHA
C - - - - - 0x03E094 0F:8084: A9 01     LDA #$01
C - - - - - 0x03E096 0F:8086: 20 0F CB  JSR $CB0F
C - - - - - 0x03E099 0F:8089: 68        PLA
C - - - - - 0x03E09A 0F:808A: 48        PHA
C - - - - - 0x03E09B 0F:808B: F0 44     BEQ $80D1
C - - - - - 0x03E09D 0F:808D: C9 0B     CMP #$0B
C - - - - - 0x03E09F 0F:808F: F0 40     BEQ $80D1
C - - - - - 0x03E0A1 0F:8091: CD 41 04  CMP ram_0441
C - - - - - 0x03E0A4 0F:8094: F0 3B     BEQ $80D1
C - - - - - 0x03E0A6 0F:8096: 2C 2A 06  BIT ram_062A
C - - - - - 0x03E0A9 0F:8099: 10 14     BPL $80AF
C - - - - - 0x03E0AB 0F:809B: 48        PHA
C - - - - - 0x03E0AC 0F:809C: 48        PHA
C - - - - - 0x03E0AD 0F:809D: A5 22     LDA ram_0022
C - - - - - 0x03E0AF 0F:809F: A9 1A     LDA #$1A
C - - - - - 0x03E0B1 0F:80A1: 85 24     STA ram_0024
C - - - - - 0x03E0B3 0F:80A3: A9 1B     LDA #$1B
C - - - - - 0x03E0B5 0F:80A5: 85 25     STA ram_0025
C - - - - - 0x03E0B7 0F:80A7: 20 2D CE  JSR $CE2D
C - - - - - 0x03E0BA 0F:80AA: 68        PLA
C - - - - - 0x03E0BB 0F:80AB: 20 00 80  JSR $8000
C - - - - - 0x03E0BE 0F:80AE: 68        PLA
C - - - - - 0x03E0BF 0F:80AF: 85 41     STA ram_0041
C - - - - - 0x03E0C1 0F:80B1: 20 7C CD  JSR $CD7C
C - - - - - 0x03E0C4 0F:80B4: A5 41     LDA ram_0041
C - - - - - 0x03E0C6 0F:80B6: C9 0B     CMP #$0B
C - - - - - 0x03E0C8 0F:80B8: AE FB 05  LDX ram_05FB
C - - - - - 0x03E0CB 0F:80BB: F0 06     BEQ $80C3
C - - - - - 0x03E0CD 0F:80BD: 08        PHP
C - - - - - 0x03E0CE 0F:80BE: 68        PLA
C - - - - - 0x03E0CF 0F:80BF: 49 01     EOR #$01
C - - - - - 0x03E0D1 0F:80C1: 48        PHA
C - - - - - 0x03E0D2 0F:80C2: 28        PLP
C - - - - - 0x03E0D3 0F:80C3: A2 21     LDX #$21
C - - - - - 0x03E0D5 0F:80C5: 90 02     BCC $80C9
C - - - - - 0x03E0D7 0F:80C7: A2 22     LDX #$22
C - - - - - 0x03E0D9 0F:80C9: A5 41     LDA ram_0041
C - - - - - 0x03E0DB 0F:80CB: 20 08 CE  JSR $CE08
C - - - - - 0x03E0DE 0F:80CE: 20 54 E8  JSR $E854
C - - - - - 0x03E0E1 0F:80D1: 68        PLA
C - - - - - 0x03E0E2 0F:80D2: 18        CLC
C - - - - - 0x03E0E3 0F:80D3: 69 01     ADC #$01
C - - - - - 0x03E0E5 0F:80D5: C9 16     CMP #$16
C - - - - - 0x03E0E7 0F:80D7: D0 AA     BNE $8083
C - - - - - 0x03E0E9 0F:80D9: A9 00     LDA #$00
C - - - - - 0x03E0EB 0F:80DB: 8D FF 05  STA ram_05FF
C - - - - - 0x03E0EE 0F:80DE: 60        RTS
C D 3 - - - 0x03E0EF 0F:80DF: A9 00     LDA #$00
C - - - - - 0x03E0F1 0F:80E1: 20 7F EF  JSR $EF7F
C - - - - - 0x03E0F4 0F:80E4: A9 01     LDA #$01
C - - - - - 0x03E0F6 0F:80E6: 20 7F EF  JSR $EF7F
C - - - - - 0x03E0F9 0F:80E9: 20 33 E2  JSR $E233
C - - - - - 0x03E0FC 0F:80EC: A9 0A     LDA #$0A
C - - - - - 0x03E0FE 0F:80EE: 8D 14 06  STA ram_0614
C - - - - - 0x03E101 0F:80F1: A9 FF     LDA #$FF
C - - - - - 0x03E103 0F:80F3: 8D 2A 06  STA ram_062A
C - - - - - 0x03E106 0F:80F6: 20 EC E6  JSR $E6EC
C - - - - - 0x03E109 0F:80F9: A0 40     LDY #$40
C - - - - - 0x03E10B 0F:80FB: A2 00     LDX #$00
C - - - - - 0x03E10D 0F:80FD: 8E 4E 04  STX ram_044E
C - - - - - 0x03E110 0F:8100: 8E 00 06  STX ram_0600
C - - - - - 0x03E113 0F:8103: AD 41 04  LDA ram_0441
C - - - - - 0x03E116 0F:8106: C9 0B     CMP #$0B
C - - - - - 0x03E118 0F:8108: 90 04     BCC $810E
C - - - - - 0x03E11A 0F:810A: A2 0B     LDX #$0B
C - - - - - 0x03E11C 0F:810C: A0 00     LDY #$00
C - - - - - 0x03E11E 0F:810E: 8E FB 05  STX ram_05FB
C - - - - - 0x03E121 0F:8111: 8C 17 05  STY ram_0517
C - - - - - 0x03E124 0F:8114: 8A        TXA
C - - - - - 0x03E125 0F:8115: D0 0E     BNE $8125
C - - - - - 0x03E127 0F:8117: 2C 4C 04  BIT ram_044C
C - - - - - 0x03E12A 0F:811A: 10 26     BPL $8142
C - - - - - 0x03E12C 0F:811C: 8D 4C 04  STA ram_044C
C - - - - - 0x03E12F 0F:811F: 8D F1 03  STA ram_03F1
C - - - - - 0x03E132 0F:8122: 4C 42 E1  JMP $E142
C - - - - - 0x03E135 0F:8125: A9 00     LDA #$00
C - - - - - 0x03E137 0F:8127: 8D 42 04  STA ram_0442
C - - - - - 0x03E13A 0F:812A: 20 99 CE  JSR $CE99
C - - - - - 0x03E13D 0F:812D: 8D FD 05  STA ram_05FD
C - - - - - 0x03E140 0F:8130: AD 41 04  LDA ram_0441
C - - - - - 0x03E143 0F:8133: 20 7C CD  JSR $CD7C
C - - - - - 0x03E146 0F:8136: A9 05     LDA #$05
C - - - - - 0x03E148 0F:8138: A0 09     LDY #$09
C - - - - - 0x03E14A 0F:813A: 91 34     STA (ram_0034),Y
C - - - - - 0x03E14C 0F:813C: AD FE 05  LDA ram_05FE
C - - - - - 0x03E14F 0F:813F: 8D 17 06  STA ram_0617
C - - - - - 0x03E152 0F:8142: 20 67 E2  JSR $E267
C D 3 - - - 0x03E155 0F:8145: A9 01     LDA #$01
C - - - - - 0x03E157 0F:8147: 20 0F CB  JSR $CB0F
C - - - - - 0x03E15A 0F:814A: 20 49 E3  JSR $E349
C - - - - - 0x03E15D 0F:814D: AD 14 06  LDA ram_0614
C - - - - - 0x03E160 0F:8150: F0 06     BEQ $8158
C - - - - - 0x03E162 0F:8152: CE 14 06  DEC ram_0614
C - - - - - 0x03E165 0F:8155: 4C 45 E1  JMP $E145
C - - - - - 0x03E168 0F:8158: A9 0A     LDA #$0A
C - - - - - 0x03E16A 0F:815A: 8D 14 06  STA ram_0614
C - - - - - 0x03E16D 0F:815D: AD 1C 00  LDA a: ram_001C
C - - - - - 0x03E170 0F:8160: 29 0F     AND #$0F
C - - - - - 0x03E172 0F:8162: F0 22     BEQ $8186
C - - - - - 0x03E174 0F:8164: 48        PHA
C - - - - - 0x03E175 0F:8165: A2 20     LDX #$20
C - - - - - 0x03E177 0F:8167: AD 41 04  LDA ram_0441
C - - - - - 0x03E17A 0F:816A: AC FB 05  LDY ram_05FB
C - - - - - 0x03E17D 0F:816D: F0 05     BEQ $8174
C - - - - - 0x03E17F 0F:816F: A2 22     LDX #$22
C - - - - - 0x03E181 0F:8171: AD FD 05  LDA ram_05FD
C - - - - - 0x03E184 0F:8174: 20 08 CE  JSR $CE08
C - - - - - 0x03E187 0F:8177: 68        PLA
C - - - - - 0x03E188 0F:8178: 48        PHA
C - - - - - 0x03E189 0F:8179: A0 05     LDY #$05
C - - - - - 0x03E18B 0F:817B: 20 F5 E8  JSR $E8F5
C - - - - - 0x03E18E 0F:817E: 68        PLA
C - - - - - 0x03E18F 0F:817F: 4A        LSR
C - - - - - 0x03E190 0F:8180: 4A        LSR
C - - - - - 0x03E191 0F:8181: A0 07     LDY #$07
C - - - - - 0x03E193 0F:8183: 20 F5 E8  JSR $E8F5
C - - - - - 0x03E196 0F:8186: 20 EC E6  JSR $E6EC
C - - - - - 0x03E199 0F:8189: AD 41 04  LDA ram_0441
C - - - - - 0x03E19C 0F:818C: C9 0B     CMP #$0B
C - - - - - 0x03E19E 0F:818E: 90 57     BCC $81E7
C - - - - - 0x03E1A0 0F:8190: AD FE 05  LDA ram_05FE
C - - - - - 0x03E1A3 0F:8193: CD 17 06  CMP ram_0617
C - - - - - 0x03E1A6 0F:8196: F0 4F     BEQ $81E7
C - - - - - 0x03E1A8 0F:8198: 8D 17 06  STA ram_0617
C - - - - - 0x03E1AB 0F:819B: A9 00     LDA #$00
C - - - - - 0x03E1AD 0F:819D: 8D 21 06  STA ram_0621
C - - - - - 0x03E1B0 0F:81A0: 48        PHA
C - - - - - 0x03E1B1 0F:81A1: A5 22     LDA ram_0022
C - - - - - 0x03E1B3 0F:81A3: A9 1C     LDA #$1C
C - - - - - 0x03E1B5 0F:81A5: 85 24     STA ram_0024
C - - - - - 0x03E1B7 0F:81A7: A9 1D     LDA #$1D
C - - - - - 0x03E1B9 0F:81A9: 85 25     STA ram_0025
C - - - - - 0x03E1BB 0F:81AB: 20 2D CE  JSR $CE2D
C - - - - - 0x03E1BE 0F:81AE: 68        PLA
C - - - - - 0x03E1BF 0F:81AF: 20 06 80  JSR $8006
C - - - - - 0x03E1C2 0F:81B2: AD 3B 04  LDA ram_043B
C - - - - - 0x03E1C5 0F:81B5: C9 02     CMP #$02
C - - - - - 0x03E1C7 0F:81B7: F0 2E     BEQ $81E7
C - - - - - 0x03E1C9 0F:81B9: 48        PHA
C - - - - - 0x03E1CA 0F:81BA: A5 22     LDA ram_0022
C - - - - - 0x03E1CC 0F:81BC: A9 1A     LDA #$1A
C - - - - - 0x03E1CE 0F:81BE: 85 24     STA ram_0024
C - - - - - 0x03E1D0 0F:81C0: A9 1B     LDA #$1B
C - - - - - 0x03E1D2 0F:81C2: 85 25     STA ram_0025
C - - - - - 0x03E1D4 0F:81C4: 20 2D CE  JSR $CE2D
C - - - - - 0x03E1D7 0F:81C7: 68        PLA
C - - - - - 0x03E1D8 0F:81C8: 20 21 80  JSR $8021
C - - - - - 0x03E1DB 0F:81CB: 20 46 CC  JSR $CC46
C - - - - - 0x03E1DE 0F:81CE: A9 00     LDA #$00
C - - - - - 0x03E1E0 0F:81D0: 8D 2D 06  STA ram_062D
C - - - - - 0x03E1E3 0F:81D3: 8D 15 06  STA ram_0615
C - - - - - 0x03E1E6 0F:81D6: A9 1A     LDA #$1A
C - - - - - 0x03E1E8 0F:81D8: 85 24     STA ram_0024
C - - - - - 0x03E1EA 0F:81DA: A9 1B     LDA #$1B
C - - - - - 0x03E1EC 0F:81DC: 85 25     STA ram_0025
C - - - - - 0x03E1EE 0F:81DE: 20 2D CE  JSR $CE2D
C - - - - - 0x03E1F1 0F:81E1: A2 50     LDX #$50
C - - - - - 0x03E1F3 0F:81E3: 9A        TXS
C - - - - - 0x03E1F4 0F:81E4: 4C 27 80  JMP $8027
C - - - - - 0x03E1F7 0F:81E7: A2 00     LDX #$00
C - - - - - 0x03E1F9 0F:81E9: 8E FF 05  STX ram_05FF
C - - - - - 0x03E1FC 0F:81EC: E8        INX
C - - - - - 0x03E1FD 0F:81ED: 8A        TXA
C - - - - - 0x03E1FE 0F:81EE: 20 93 D1  JSR $D193
C - - - - - 0x03E201 0F:81F1: 20 7D E2  JSR $E27D
C - - - - - 0x03E204 0F:81F4: EE 13 06  INC ram_0613
C - - - - - 0x03E207 0F:81F7: 20 BC E2  JSR $E2BC
C - - - - - 0x03E20A 0F:81FA: 20 07 E4  JSR $E407
C - - - - - 0x03E20D 0F:81FD: 2C 4B 04  BIT ram_044B
C - - - - - 0x03E210 0F:8200: 10 1C     BPL $821E
C - - - - - 0x03E212 0F:8202: AD FB 05  LDA ram_05FB
C - - - - - 0x03E215 0F:8205: D0 17     BNE $821E
C - - - - - 0x03E217 0F:8207: 2C 35 06  BIT ram_0635
C - - - - - 0x03E21A 0F:820A: 10 12     BPL $821E
C - - - - - 0x03E21C 0F:820C: 48        PHA
C - - - - - 0x03E21D 0F:820D: A5 22     LDA ram_0022
C - - - - - 0x03E21F 0F:820F: A9 1A     LDA #$1A
C - - - - - 0x03E221 0F:8211: 85 24     STA ram_0024
C - - - - - 0x03E223 0F:8213: A9 1B     LDA #$1B
C - - - - - 0x03E225 0F:8215: 85 25     STA ram_0025
C - - - - - 0x03E227 0F:8217: 20 2D CE  JSR $CE2D
C - - - - - 0x03E22A 0F:821A: 68        PLA
C - - - - - 0x03E22B 0F:821B: 20 39 80  JSR $8039
C - - - - - 0x03E22E 0F:821E: 48        PHA
C - - - - - 0x03E22F 0F:821F: A5 22     LDA ram_0022
C - - - - - 0x03E231 0F:8221: A9 1A     LDA #$1A
C - - - - - 0x03E233 0F:8223: 85 24     STA ram_0024
C - - - - - 0x03E235 0F:8225: A9 1B     LDA #$1B
C - - - - - 0x03E237 0F:8227: 85 25     STA ram_0025
C - - - - - 0x03E239 0F:8229: 20 2D CE  JSR $CE2D
C - - - - - 0x03E23C 0F:822C: 68        PLA
C - - - - - 0x03E23D 0F:822D: 20 33 80  JSR $8033
C - - - - - 0x03E240 0F:8230: 4C 45 E1  JMP $E145
C - - - - - 0x03E243 0F:8233: A9 1E     LDA #$1E
C - - - - - 0x03E245 0F:8235: 20 B0 CB  JSR $CBB0
C - - - - - 0x03E248 0F:8238: 48        PHA
C - - - - - 0x03E249 0F:8239: A5 22     LDA ram_0022
C - - - - - 0x03E24B 0F:823B: A9 1C     LDA #$1C
C - - - - - 0x03E24D 0F:823D: 85 24     STA ram_0024
C - - - - - 0x03E24F 0F:823F: A9 1D     LDA #$1D
C - - - - - 0x03E251 0F:8241: 85 25     STA ram_0025
C - - - - - 0x03E253 0F:8243: 20 2D CE  JSR $CE2D
C - - - - - 0x03E256 0F:8246: 68        PLA
C - - - - - 0x03E257 0F:8247: 20 24 80  JSR $8024
C - - - - - 0x03E25A 0F:824A: 20 67 E2  JSR $E267
C - - - - - 0x03E25D 0F:824D: A9 80     LDA #$80
C - - - - - 0x03E25F 0F:824F: 8D 15 06  STA ram_0615
C - - - - - 0x03E262 0F:8252: 8D 2D 06  STA ram_062D
C - - - - - 0x03E265 0F:8255: A9 00     LDA #$00
C - - - - - 0x03E267 0F:8257: 8D 42 06  STA ram_0642
C - - - - - 0x03E26A 0F:825A: 8D 43 06  STA ram_0643
C - - - - - 0x03E26D 0F:825D: A9 02     LDA #$02
C - - - - - 0x03E26F 0F:825F: 85 8E     STA ram_008E
C - - - - - 0x03E271 0F:8261: A9 01     LDA #$01
C - - - - - 0x03E273 0F:8263: 8D 69 04  STA ram_0469
C - - - - - 0x03E276 0F:8266: 60        RTS
C - - - - - 0x03E277 0F:8267: AD FB 05  LDA ram_05FB
C - - - - - 0x03E27A 0F:826A: F0 0B     BEQ $8277
C - - - - - 0x03E27C 0F:826C: A9 31     LDA #$31
C - - - - - 0x03E27E 0F:826E: 20 7F EF  JSR $EF7F
C - - - - - 0x03E281 0F:8271: A9 32     LDA #$32
C - - - - - 0x03E283 0F:8273: 20 7F EF  JSR $EF7F
C - - - - - 0x03E286 0F:8276: 60        RTS
C - - - - - 0x03E287 0F:8277: A9 30     LDA #$30
C - - - - - 0x03E289 0F:8279: 20 7F EF  JSR $EF7F
C - - - - - 0x03E28C 0F:827C: 60        RTS
C - - - - - 0x03E28D 0F:827D: 20 77 CD  JSR $CD77
C - - - - - 0x03E290 0F:8280: A0 0A     LDY #$0A
C - - - - - 0x03E292 0F:8282: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E294 0F:8284: D0 1C     BNE $82A2
C - - - - - 0x03E296 0F:8286: AE 35 06  LDX ram_0635
C - - - - - 0x03E299 0F:8289: AC 37 06  LDY ram_0637
C - - - - - 0x03E29C 0F:828C: AD FB 05  LDA ram_05FB
C - - - - - 0x03E29F 0F:828F: F0 05     BEQ $8296
C - - - - - 0x03E2A1 0F:8291: 8A        TXA
C - - - - - 0x03E2A2 0F:8292: 49 FF     EOR #$FF
C - - - - - 0x03E2A4 0F:8294: AA        TAX
C - - - - - 0x03E2A5 0F:8295: E8        INX
C - - - - - 0x03E2A6 0F:8296: E0 C4     CPX #$C4
C - - - - - 0x03E2A8 0F:8298: 90 08     BCC $82A2
C - - - - - 0x03E2AA 0F:829A: C0 74     CPY #$74
C - - - - - 0x03E2AC 0F:829C: 90 04     BCC $82A2
C - - - - - 0x03E2AE 0F:829E: C0 8C     CPY #$8C
C - - - - - 0x03E2B0 0F:82A0: 90 01     BCC $82A3
C - - - - - 0x03E2B2 0F:82A2: 60        RTS
C - - - - - 0x03E2B3 0F:82A3: A9 00     LDA #$00
C - - - - - 0x03E2B5 0F:82A5: 8D 2D 06  STA ram_062D
C - - - - - 0x03E2B8 0F:82A8: 8D 15 06  STA ram_0615
C - - - - - 0x03E2BB 0F:82AB: A9 1A     LDA #$1A
C - - - - - 0x03E2BD 0F:82AD: 85 24     STA ram_0024
C - - - - - 0x03E2BF 0F:82AF: A9 1B     LDA #$1B
C - - - - - 0x03E2C1 0F:82B1: 85 25     STA ram_0025
C - - - - - 0x03E2C3 0F:82B3: 20 2D CE  JSR $CE2D
C - - - - - 0x03E2C6 0F:82B6: A2 50     LDX #$50
C - - - - - 0x03E2C8 0F:82B8: 9A        TXS
C - - - - - 0x03E2C9 0F:82B9: 4C 09 80  JMP $8009
C - - - - - 0x03E2CC 0F:82BC: EE 18 06  INC ram_0618
C - - - - - 0x03E2CF 0F:82BF: AD 18 06  LDA ram_0618
C - - - - - 0x03E2D2 0F:82C2: C9 01     CMP #$01
C - - - - - 0x03E2D4 0F:82C4: 90 4F     BCC $8315
C - - - - - 0x03E2D6 0F:82C6: A9 00     LDA #$00
C - - - - - 0x03E2D8 0F:82C8: 8D 18 06  STA ram_0618
C - - - - - 0x03E2DB 0F:82CB: 48        PHA
C - - - - - 0x03E2DC 0F:82CC: CD 41 04  CMP ram_0441
C - - - - - 0x03E2DF 0F:82CF: F0 3C     BEQ $830D
C - - - - - 0x03E2E1 0F:82D1: A2 00     LDX #$00
C - - - - - 0x03E2E3 0F:82D3: 20 08 CE  JSR $CE08
C - - - - - 0x03E2E6 0F:82D6: A2 02     LDX #$02
C - - - - - 0x03E2E8 0F:82D8: A0 00     LDY #$00
C - - - - - 0x03E2EA 0F:82DA: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E2EC 0F:82DC: A0 01     LDY #$01
C - - - - - 0x03E2EE 0F:82DE: C9 20     CMP #$20
C - - - - - 0x03E2F0 0F:82E0: D0 0A     BNE $82EC
C - - - - - 0x03E2F2 0F:82E2: A2 01     LDX #$01
C - - - - - 0x03E2F4 0F:82E4: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E2F6 0F:82E6: C8        INY
C - - - - - 0x03E2F7 0F:82E7: 11 34     ORA (ram_0034),Y
C - - - - - 0x03E2F9 0F:82E9: F0 22     BEQ $830D
C - - - - - 0x03E2FB 0F:82EB: 88        DEY
C - - - - - 0x03E2FC 0F:82EC: 8A        TXA
C - - - - - 0x03E2FD 0F:82ED: 18        CLC
C - - - - - 0x03E2FE 0F:82EE: 71 34     ADC (ram_0034),Y
C - - - - - 0x03E300 0F:82F0: AA        TAX
C - - - - - 0x03E301 0F:82F1: C8        INY
C - - - - - 0x03E302 0F:82F2: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E304 0F:82F4: 69 00     ADC #$00
C - - - - - 0x03E306 0F:82F6: A8        TAY
C - - - - - 0x03E307 0F:82F7: 38        SEC
C - - - - - 0x03E308 0F:82F8: 8A        TXA
C - - - - - 0x03E309 0F:82F9: E5 32     SBC ram_0032
C - - - - - 0x03E30B 0F:82FB: 98        TYA
C - - - - - 0x03E30C 0F:82FC: E5 33     SBC ram_0033
C - - - - - 0x03E30E 0F:82FE: 90 04     BCC $8304
C - - - - - 0x03E310 0F:8300: A6 32     LDX ram_0032
C - - - - - 0x03E312 0F:8302: A4 33     LDY ram_0033
C - - - - - 0x03E314 0F:8304: 98        TYA
C - - - - - 0x03E315 0F:8305: A0 02     LDY #$02
C - - - - - 0x03E317 0F:8307: 91 34     STA (ram_0034),Y
C - - - - - 0x03E319 0F:8309: 8A        TXA
C - - - - - 0x03E31A 0F:830A: 88        DEY
C - - - - - 0x03E31B 0F:830B: 91 34     STA (ram_0034),Y
C - - - - - 0x03E31D 0F:830D: 68        PLA
C - - - - - 0x03E31E 0F:830E: 18        CLC
C - - - - - 0x03E31F 0F:830F: 69 01     ADC #$01
C - - - - - 0x03E321 0F:8311: C9 0B     CMP #$0B
C - - - - - 0x03E323 0F:8313: D0 B6     BNE $82CB
C - - - - - 0x03E325 0F:8315: AD 41 04  LDA ram_0441
C - - - - - 0x03E328 0F:8318: C9 0B     CMP #$0B
C - - - - - 0x03E32A 0F:831A: B0 2C     BCS $8348
C - - - - - 0x03E32C 0F:831C: 20 7C CD  JSR $CD7C
C - - - - - 0x03E32F 0F:831F: A2 03     LDX #$03
C - - - - - 0x03E331 0F:8321: A0 00     LDY #$00
C - - - - - 0x03E333 0F:8323: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E335 0F:8325: C9 20     CMP #$20
C - - - - - 0x03E337 0F:8327: D0 02     BNE $832B
C - - - - - 0x03E339 0F:8329: A2 05     LDX #$05
C - - - - - 0x03E33B 0F:832B: 86 3A     STX ram_003A
C - - - - - 0x03E33D 0F:832D: A0 01     LDY #$01
C - - - - - 0x03E33F 0F:832F: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E341 0F:8331: 38        SEC
C - - - - - 0x03E342 0F:8332: E5 3A     SBC ram_003A
C - - - - - 0x03E344 0F:8334: AA        TAX
C - - - - - 0x03E345 0F:8335: C8        INY
C - - - - - 0x03E346 0F:8336: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E348 0F:8338: E9 00     SBC #$00
C - - - - - 0x03E34A 0F:833A: B0 03     BCS $833F
C - - - - - 0x03E34C 0F:833C: A2 00     LDX #$00
C - - - - - 0x03E34E 0F:833E: 8A        TXA
C - - - - - 0x03E34F 0F:833F: 91 34     STA (ram_0034),Y
C - - - - - 0x03E351 0F:8341: 8A        TXA
C - - - - - 0x03E352 0F:8342: 88        DEY
C - - - - - 0x03E353 0F:8343: 91 34     STA (ram_0034),Y
C - - - - - 0x03E355 0F:8345: 20 67 E2  JSR $E267
C - - - - - 0x03E358 0F:8348: 60        RTS
C - - - - - 0x03E359 0F:8349: A9 00     LDA #$00
C - - - - - 0x03E35B 0F:834B: 8D 32 05  STA ram_0532
C - - - - - 0x03E35E 0F:834E: AD FB 05  LDA ram_05FB
C - - - - - 0x03E361 0F:8351: D0 50     BNE $83A3
C - - - - - 0x03E363 0F:8353: AD 15 06  LDA ram_0615
C - - - - - 0x03E366 0F:8356: 09 40     ORA #$40
C - - - - - 0x03E368 0F:8358: 8D 15 06  STA ram_0615
C - - - - - 0x03E36B 0F:835B: AD 1C 00  LDA a: ram_001C
C - - - - - 0x03E36E 0F:835E: 29 40     AND #$40
C - - - - - 0x03E370 0F:8360: D0 20     BNE $8382
C - - - - - 0x03E372 0F:8362: AD 1C 00  LDA a: ram_001C
C - - - - - 0x03E375 0F:8365: 29 0F     AND #$0F
C - - - - - 0x03E377 0F:8367: F0 60     BEQ $83C9
C - - - - - 0x03E379 0F:8369: EE 32 05  INC ram_0532
C - - - - - 0x03E37C 0F:836C: A2 00     LDX #$00
C - - - - - 0x03E37E 0F:836E: 29 02     AND #$02
C - - - - - 0x03E380 0F:8370: D0 02     BNE $8374
C - - - - - 0x03E382 0F:8372: A2 40     LDX #$40
C - - - - - 0x03E384 0F:8374: 8E 17 05  STX ram_0517
C - - - - - 0x03E387 0F:8377: AD 15 06  LDA ram_0615
C - - - - - 0x03E38A 0F:837A: 29 BF     AND #$BF
C - - - - - 0x03E38C 0F:837C: 8D 15 06  STA ram_0615
C - - - - - 0x03E38F 0F:837F: 4C C9 E3  JMP $E3C9
C - - - - - 0x03E392 0F:8382: A9 00     LDA #$00
C - - - - - 0x03E394 0F:8384: 8D 00 06  STA ram_0600
C - - - - - 0x03E397 0F:8387: 8D 15 06  STA ram_0615
C - - - - - 0x03E39A 0F:838A: A9 44     LDA #$44
C - - - - - 0x03E39C 0F:838C: 20 B0 CB  JSR $CBB0
C - - - - - 0x03E39F 0F:838F: 20 8B CB  JSR $CB8B
C - - - - - 0x03E3A2 0F:8392: A9 1A     LDA #$1A
C - - - - - 0x03E3A4 0F:8394: 85 24     STA ram_0024
C - - - - - 0x03E3A6 0F:8396: A9 1B     LDA #$1B
C - - - - - 0x03E3A8 0F:8398: 85 25     STA ram_0025
C - - - - - 0x03E3AA 0F:839A: 20 2D CE  JSR $CE2D
C - - - - - 0x03E3AD 0F:839D: A2 50     LDX #$50
C - - - - - 0x03E3AF 0F:839F: 9A        TXS
C - - - - - 0x03E3B0 0F:83A0: 4C 03 80  JMP $8003
C - - - - - 0x03E3B3 0F:83A3: EE 32 05  INC ram_0532
C - - - - - 0x03E3B6 0F:83A6: A9 C0     LDA #$C0
C - - - - - 0x03E3B8 0F:83A8: 2D 1E 00  AND a: ram_001E
C - - - - - 0x03E3BB 0F:83AB: F0 1C     BEQ $83C9
C - - - - - 0x03E3BD 0F:83AD: A2 01     LDX #$01
C - - - - - 0x03E3BF 0F:83AF: A8        TAY
C - - - - - 0x03E3C0 0F:83B0: 30 02     BMI $83B4
C - - - - - 0x03E3C2 0F:83B2: A2 FF     LDX #$FF
C - - - - - 0x03E3C4 0F:83B4: 8A        TXA
C - - - - - 0x03E3C5 0F:83B5: 18        CLC
C - - - - - 0x03E3C6 0F:83B6: 6D FD 05  ADC ram_05FD
C - - - - - 0x03E3C9 0F:83B9: D0 02     BNE $83BD
C - - - - - 0x03E3CB 0F:83BB: A9 0A     LDA #$0A
C - - - - - 0x03E3CD 0F:83BD: C9 0B     CMP #$0B
C - - - - - 0x03E3CF 0F:83BF: 90 02     BCC $83C3
C - - - - - 0x03E3D1 0F:83C1: A9 01     LDA #$01
C - - - - - 0x03E3D3 0F:83C3: 8D FD 05  STA ram_05FD
C - - - - - 0x03E3D6 0F:83C6: 20 67 E2  JSR $E267
C D 3 - - - 0x03E3D9 0F:83C9: 60        RTS
C - - - - - 0x03E3DA 0F:83CA: AD FB 05  LDA ram_05FB
C - - - - - 0x03E3DD 0F:83CD: D0 07     BNE $83D6
C - - - - - 0x03E3DF 0F:83CF: AD 1C 00  LDA a: ram_001C
C - - - - - 0x03E3E2 0F:83D2: 29 0F     AND #$0F
C - - - - - 0x03E3E4 0F:83D4: F0 30     BEQ $8406
C - - - - - 0x03E3E6 0F:83D6: AD 41 04  LDA ram_0441
C - - - - - 0x03E3E9 0F:83D9: A2 20     LDX #$20
C - - - - - 0x03E3EB 0F:83DB: 20 08 CE  JSR $CE08
C - - - - - 0x03E3EE 0F:83DE: 46 33     LSR ram_0033
C - - - - - 0x03E3F0 0F:83E0: 66 32     ROR ram_0032
C - - - - - 0x03E3F2 0F:83E2: 46 33     LSR ram_0033
C - - - - - 0x03E3F4 0F:83E4: 66 32     ROR ram_0032
C - - - - - 0x03E3F6 0F:83E6: A6 32     LDX ram_0032
C - - - - - 0x03E3F8 0F:83E8: A4 33     LDY ram_0033
C - - - - - 0x03E3FA 0F:83EA: 2C 17 05  BIT ram_0517
C - - - - - 0x03E3FD 0F:83ED: 70 08     BVS $83F7
C - - - - - 0x03E3FF 0F:83EF: 8A        TXA
C - - - - - 0x03E400 0F:83F0: 49 FF     EOR #$FF
C - - - - - 0x03E402 0F:83F2: AA        TAX
C - - - - - 0x03E403 0F:83F3: 98        TYA
C - - - - - 0x03E404 0F:83F4: 49 FF     EOR #$FF
C - - - - - 0x03E406 0F:83F6: A8        TAY
C - - - - - 0x03E407 0F:83F7: 8A        TXA
C - - - - - 0x03E408 0F:83F8: 18        CLC
C - - - - - 0x03E409 0F:83F9: 6D 42 06  ADC ram_0642
C - - - - - 0x03E40C 0F:83FC: 8D 42 06  STA ram_0642
C - - - - - 0x03E40F 0F:83FF: 98        TYA
C - - - - - 0x03E410 0F:8400: 6D 43 06  ADC ram_0643
C - - - - - 0x03E413 0F:8403: 8D 43 06  STA ram_0643
C - - - - - 0x03E416 0F:8406: 60        RTS
C - - - - - 0x03E417 0F:8407: 20 09 E7  JSR $E709
C - - - - - 0x03E41A 0F:840A: A9 00     LDA #$00
C D 3 - - - 0x03E41C 0F:840C: 48        PHA
C - - - - - 0x03E41D 0F:840D: A9 01     LDA #$01
C - - - - - 0x03E41F 0F:840F: 20 0F CB  JSR $CB0F
C - - - - - 0x03E422 0F:8412: 20 49 E3  JSR $E349
C - - - - - 0x03E425 0F:8415: 68        PLA
C - - - - - 0x03E426 0F:8416: 48        PHA
C - - - - - 0x03E427 0F:8417: F0 76     BEQ $848F
C - - - - - 0x03E429 0F:8419: C9 0B     CMP #$0B
C - - - - - 0x03E42B 0F:841B: F0 72     BEQ $848F
C - - - - - 0x03E42D 0F:841D: AE FB 05  LDX ram_05FB
C - - - - - 0x03E430 0F:8420: F0 05     BEQ $8427
C - - - - - 0x03E432 0F:8422: CD FD 05  CMP ram_05FD
C - - - - - 0x03E435 0F:8425: F0 68     BEQ $848F
C - - - - - 0x03E437 0F:8427: CD 41 04  CMP ram_0441
C - - - - - 0x03E43A 0F:842A: D0 04     BNE $8430
C - - - - - 0x03E43C 0F:842C: C9 0B     CMP #$0B
C - - - - - 0x03E43E 0F:842E: 90 5F     BCC $848F
C - - - - - 0x03E440 0F:8430: 2C 2A 06  BIT ram_062A
C - - - - - 0x03E443 0F:8433: 10 19     BPL $844E
C - - - - - 0x03E445 0F:8435: CD 41 04  CMP ram_0441
C - - - - - 0x03E448 0F:8438: F0 14     BEQ $844E
C - - - - - 0x03E44A 0F:843A: 48        PHA
C - - - - - 0x03E44B 0F:843B: 48        PHA
C - - - - - 0x03E44C 0F:843C: A5 22     LDA ram_0022
C - - - - - 0x03E44E 0F:843E: A9 1A     LDA #$1A
C - - - - - 0x03E450 0F:8440: 85 24     STA ram_0024
C - - - - - 0x03E452 0F:8442: A9 1B     LDA #$1B
C - - - - - 0x03E454 0F:8444: 85 25     STA ram_0025
C - - - - - 0x03E456 0F:8446: 20 2D CE  JSR $CE2D
C - - - - - 0x03E459 0F:8449: 68        PLA
C - - - - - 0x03E45A 0F:844A: 20 00 80  JSR $8000
C - - - - - 0x03E45D 0F:844D: 68        PLA
C - - - - - 0x03E45E 0F:844E: 85 41     STA ram_0041
C - - - - - 0x03E460 0F:8450: 20 7C CD  JSR $CD7C
C - - - - - 0x03E463 0F:8453: A5 41     LDA ram_0041
C - - - - - 0x03E465 0F:8455: C9 0B     CMP #$0B
C - - - - - 0x03E467 0F:8457: AE FB 05  LDX ram_05FB
C - - - - - 0x03E46A 0F:845A: F0 06     BEQ $8462
C - - - - - 0x03E46C 0F:845C: 08        PHP
C - - - - - 0x03E46D 0F:845D: 68        PLA
C - - - - - 0x03E46E 0F:845E: 49 01     EOR #$01
C - - - - - 0x03E470 0F:8460: 48        PHA
C - - - - - 0x03E471 0F:8461: 28        PLP
C - - - - - 0x03E472 0F:8462: A2 21     LDX #$21
C - - - - - 0x03E474 0F:8464: 90 0C     BCC $8472
C - - - - - 0x03E476 0F:8466: A2 22     LDX #$22
C - - - - - 0x03E478 0F:8468: A0 09     LDY #$09
C - - - - - 0x03E47A 0F:846A: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E47C 0F:846C: C9 F0     CMP #$F0
C - - - - - 0x03E47E 0F:846E: D0 02     BNE $8472
C - - - - - 0x03E480 0F:8470: A2 1F     LDX #$1F
C - - - - - 0x03E482 0F:8472: A5 41     LDA ram_0041
C - - - - - 0x03E484 0F:8474: CD 41 04  CMP ram_0441
C - - - - - 0x03E487 0F:8477: D0 02     BNE $847B
C - - - - - 0x03E489 0F:8479: A2 20     LDX #$20
C - - - - - 0x03E48B 0F:847B: 20 08 CE  JSR $CE08
C - - - - - 0x03E48E 0F:847E: A0 0A     LDY #$0A
C - - - - - 0x03E490 0F:8480: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E492 0F:8482: F0 08     BEQ $848C
C - - - - - 0x03E494 0F:8484: 38        SEC
C - - - - - 0x03E495 0F:8485: E9 01     SBC #$01
C - - - - - 0x03E497 0F:8487: 91 34     STA (ram_0034),Y
C - - - - - 0x03E499 0F:8489: 4C 8F E4  JMP $E48F
C - - - - - 0x03E49C 0F:848C: 20 54 E8  JSR $E854
C D 3 - - - 0x03E49F 0F:848F: 68        PLA
C - - - - - 0x03E4A0 0F:8490: 18        CLC
C - - - - - 0x03E4A1 0F:8491: 69 01     ADC #$01
C - - - - - 0x03E4A3 0F:8493: C9 16     CMP #$16
C - - - - - 0x03E4A5 0F:8495: F0 03     BEQ $849A
C - - - - - 0x03E4A7 0F:8497: 4C 0C E4  JMP $E40C
C - - - - - 0x03E4AA 0F:849A: A9 00     LDA #$00
C - - - - - 0x03E4AC 0F:849C: 8D 00 06  STA ram_0600
C - - - - - 0x03E4AF 0F:849F: AD 13 06  LDA ram_0613
C - - - - - 0x03E4B2 0F:84A2: C9 05     CMP #$05
C - - - - - 0x03E4B4 0F:84A4: 90 0A     BCC $84B0
C - - - - - 0x03E4B6 0F:84A6: A9 00     LDA #$00
C - - - - - 0x03E4B8 0F:84A8: 8D 13 06  STA ram_0613
C - - - - - 0x03E4BB 0F:84AB: A9 07     LDA #$07
C - - - - - 0x03E4BD 0F:84AD: 20 D7 E4  JSR $E4D7
C - - - - - 0x03E4C0 0F:84B0: AD 00 06  LDA ram_0600
C - - - - - 0x03E4C3 0F:84B3: D0 01     BNE $84B6
C - - - - - 0x03E4C5 0F:84B5: 60        RTS
C - - - - - 0x03E4C6 0F:84B6: A9 00     LDA #$00
C - - - - - 0x03E4C8 0F:84B8: 8D 2D 06  STA ram_062D
C - - - - - 0x03E4CB 0F:84BB: 8D 15 06  STA ram_0615
C - - - - - 0x03E4CE 0F:84BE: 20 8B CB  JSR $CB8B
C - - - - - 0x03E4D1 0F:84C1: A9 2E     LDA #$2E
C - - - - - 0x03E4D3 0F:84C3: 20 B0 CB  JSR $CBB0
C - - - - - 0x03E4D6 0F:84C6: A9 1A     LDA #$1A
C - - - - - 0x03E4D8 0F:84C8: 85 24     STA ram_0024
C - - - - - 0x03E4DA 0F:84CA: A9 1B     LDA #$1B
C - - - - - 0x03E4DC 0F:84CC: 85 25     STA ram_0025
C - - - - - 0x03E4DE 0F:84CE: 20 2D CE  JSR $CE2D
C - - - - - 0x03E4E1 0F:84D1: A2 50     LDX #$50
C - - - - - 0x03E4E3 0F:84D3: 9A        TXS
C - - - - - 0x03E4E4 0F:84D4: 4C 03 80  JMP $8003
C D 3 - - - 0x03E4E7 0F:84D7: 85 43     STA ram_0043
C - - - - - 0x03E4E9 0F:84D9: A9 00     LDA #$00
C - - - - - 0x03E4EB 0F:84DB: 8D 00 06  STA ram_0600
C - - - - - 0x03E4EE 0F:84DE: AD FB 05  LDA ram_05FB
C - - - - - 0x03E4F1 0F:84E1: 49 0B     EOR #$0B
C - - - - - 0x03E4F3 0F:84E3: 18        CLC
C - - - - - 0x03E4F4 0F:84E4: 69 01     ADC #$01
C - - - - - 0x03E4F6 0F:84E6: 85 41     STA ram_0041
C - - - - - 0x03E4F8 0F:84E8: A9 0A     LDA #$0A
C - - - - - 0x03E4FA 0F:84EA: 85 42     STA ram_0042
C - - - - - 0x03E4FC 0F:84EC: A5 41     LDA ram_0041
C - - - - - 0x03E4FE 0F:84EE: 20 7C CD  JSR $CD7C
C - - - - - 0x03E501 0F:84F1: A0 0A     LDY #$0A
C - - - - - 0x03E503 0F:84F3: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E505 0F:84F5: D0 03     BNE $84FA
C - - - - - 0x03E507 0F:84F7: 20 01 E5  JSR $E501
C - - - - - 0x03E50A 0F:84FA: E6 41     INC ram_0041
C - - - - - 0x03E50C 0F:84FC: C6 42     DEC ram_0042
C - - - - - 0x03E50E 0F:84FE: D0 EC     BNE $84EC
C - - - - - 0x03E510 0F:8500: 60        RTS
C - - - - - 0x03E511 0F:8501: A9 00     LDA #$00
C - - - - - 0x03E513 0F:8503: 85 44     STA ram_0044
C - - - - - 0x03E515 0F:8505: A0 06     LDY #$06
C - - - - - 0x03E517 0F:8507: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E519 0F:8509: 38        SEC
C - - - - - 0x03E51A 0F:850A: ED 35 06  SBC ram_0635
C - - - - - 0x03E51D 0F:850D: B0 04     BCS $8513
C - - - - - 0x03E51F 0F:850F: 49 FF     EOR #$FF
C - - - - - 0x03E521 0F:8511: 69 01     ADC #$01
C - - - - - 0x03E523 0F:8513: C5 43     CMP ram_0043
C - - - - - 0x03E525 0F:8515: B0 02     BCS $8519
C - - - - - 0x03E527 0F:8517: E6 44     INC ram_0044
C - - - - - 0x03E529 0F:8519: A0 08     LDY #$08
C - - - - - 0x03E52B 0F:851B: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E52D 0F:851D: 38        SEC
C - - - - - 0x03E52E 0F:851E: ED 37 06  SBC ram_0637
C - - - - - 0x03E531 0F:8521: B0 04     BCS $8527
C - - - - - 0x03E533 0F:8523: 49 FF     EOR #$FF
C - - - - - 0x03E535 0F:8525: 69 01     ADC #$01
C - - - - - 0x03E537 0F:8527: C5 43     CMP ram_0043
C - - - - - 0x03E539 0F:8529: B0 02     BCS $852D
C - - - - - 0x03E53B 0F:852B: E6 44     INC ram_0044
C - - - - - 0x03E53D 0F:852D: A5 44     LDA ram_0044
C - - - - - 0x03E53F 0F:852F: C9 02     CMP #$02
C - - - - - 0x03E541 0F:8531: D0 18     BNE $854B
C - - - - - 0x03E543 0F:8533: AE 00 06  LDX ram_0600
C - - - - - 0x03E546 0F:8536: E0 05     CPX #$05
C - - - - - 0x03E548 0F:8538: B0 11     BCS $854B
C - - - - - 0x03E54A 0F:853A: AD FB 05  LDA ram_05FB
C - - - - - 0x03E54D 0F:853D: F0 04     BEQ $8543
C - - - - - 0x03E54F 0F:853F: E0 04     CPX #$04
C - - - - - 0x03E551 0F:8541: B0 08     BCS $854B
C - - - - - 0x03E553 0F:8543: A5 41     LDA ram_0041
C - - - - - 0x03E555 0F:8545: 9D 01 06  STA ram_0601,X
C - - - - - 0x03E558 0F:8548: EE 00 06  INC ram_0600
C - - - - - 0x03E55B 0F:854B: 60        RTS
C D 3 - - - 0x03E55C 0F:854C: A9 00     LDA #$00
C - - - - - 0x03E55E 0F:854E: 8D 4E 04  STA ram_044E
C - - - - - 0x03E561 0F:8551: AD 00 06  LDA ram_0600
C - - - - - 0x03E564 0F:8554: F0 3A     BEQ $8590
C - - - - - 0x03E566 0F:8556: A2 00     LDX #$00
C - - - - - 0x03E568 0F:8558: A0 00     LDY #$00
C - - - - - 0x03E56A 0F:855A: BD 0B 06  LDA ram_060B,X
C - - - - - 0x03E56D 0F:855D: C9 05     CMP #$05
C - - - - - 0x03E56F 0F:855F: D0 0D     BNE $856E
C - - - - - 0x03E571 0F:8561: BD 01 06  LDA ram_0601,X
C - - - - - 0x03E574 0F:8564: F0 08     BEQ $856E
C - - - - - 0x03E576 0F:8566: C9 0B     CMP #$0B
C - - - - - 0x03E578 0F:8568: F0 04     BEQ $856E
C - - - - - 0x03E57A 0F:856A: 99 01 06  STA ram_0601,Y
C - - - - - 0x03E57D 0F:856D: C8        INY
C - - - - - 0x03E57E 0F:856E: E8        INX
C - - - - - 0x03E57F 0F:856F: EC 00 06  CPX ram_0600
C - - - - - 0x03E582 0F:8572: D0 E6     BNE $855A
C - - - - - 0x03E584 0F:8574: 98        TYA
C - - - - - 0x03E585 0F:8575: F0 19     BEQ $8590
C - - - - - 0x03E587 0F:8577: 8C 00 06  STY ram_0600
C - - - - - 0x03E58A 0F:857A: A9 2E     LDA #$2E
C - - - - - 0x03E58C 0F:857C: 20 B0 CB  JSR $CBB0
C - - - - - 0x03E58F 0F:857F: A9 1A     LDA #$1A
C - - - - - 0x03E591 0F:8581: 85 24     STA ram_0024
C - - - - - 0x03E593 0F:8583: A9 1B     LDA #$1B
C - - - - - 0x03E595 0F:8585: 85 25     STA ram_0025
C - - - - - 0x03E597 0F:8587: 20 2D CE  JSR $CE2D
C - - - - - 0x03E59A 0F:858A: A2 50     LDX #$50
C - - - - - 0x03E59C 0F:858C: 9A        TXS
C - - - - - 0x03E59D 0F:858D: 4C 03 80  JMP $8003
C - - - - - 0x03E5A0 0F:8590: A2 50     LDX #$50
C - - - - - 0x03E5A2 0F:8592: 9A        TXS
C - - - - - 0x03E5A3 0F:8593: 4C DF E0  JMP $E0DF
C D 3 - - - 0x03E5A6 0F:8596: AD E2 00  LDA a: ram_00E2
C - - - - - 0x03E5A9 0F:8599: C9 E0     CMP #$E0
C - - - - - 0x03E5AB 0F:859B: B0 1D     BCS $85BA
C - - - - - 0x03E5AD 0F:859D: 20 77 CD  JSR $CD77
C - - - - - 0x03E5B0 0F:85A0: A0 07     LDY #$07
C - - - - - 0x03E5B2 0F:85A2: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E5B4 0F:85A4: 18        CLC
C - - - - - 0x03E5B5 0F:85A5: 69 1A     ADC #$1A
C - - - - - 0x03E5B7 0F:85A7: C9 80     CMP #$80
C - - - - - 0x03E5B9 0F:85A9: 90 02     BCC $85AD
C - - - - - 0x03E5BB 0F:85AB: A9 7F     LDA #$7F
C - - - - - 0x03E5BD 0F:85AD: 91 34     STA (ram_0034),Y
C - - - - - 0x03E5BF 0F:85AF: A0 06     LDY #$06
C - - - - - 0x03E5C1 0F:85B1: A9 04     LDA #$04
C - - - - - 0x03E5C3 0F:85B3: 91 34     STA (ram_0034),Y
C - - - - - 0x03E5C5 0F:85B5: A9 42     LDA #$42
C - - - - - 0x03E5C7 0F:85B7: 20 B0 CB  JSR $CBB0
C - - - - - 0x03E5CA 0F:85BA: 48        PHA
C - - - - - 0x03E5CB 0F:85BB: A5 22     LDA ram_0022
C - - - - - 0x03E5CD 0F:85BD: A9 14     LDA #$14
C - - - - - 0x03E5CF 0F:85BF: 85 24     STA ram_0024
C - - - - - 0x03E5D1 0F:85C1: A9 15     LDA #$15
C - - - - - 0x03E5D3 0F:85C3: 85 25     STA ram_0025
C - - - - - 0x03E5D5 0F:85C5: 20 2D CE  JSR $CE2D
C - - - - - 0x03E5D8 0F:85C8: 68        PLA
C - - - - - 0x03E5D9 0F:85C9: 20 0C 80  JSR $800C
C - - - - - 0x03E5DC 0F:85CC: A9 01     LDA #$01
C - - - - - 0x03E5DE 0F:85CE: 48        PHA
C - - - - - 0x03E5DF 0F:85CF: A5 22     LDA ram_0022
C - - - - - 0x03E5E1 0F:85D1: A9 1A     LDA #$1A
C - - - - - 0x03E5E3 0F:85D3: 85 24     STA ram_0024
C - - - - - 0x03E5E5 0F:85D5: A9 1B     LDA #$1B
C - - - - - 0x03E5E7 0F:85D7: 85 25     STA ram_0025
C - - - - - 0x03E5E9 0F:85D9: 20 2D CE  JSR $CE2D
C - - - - - 0x03E5EC 0F:85DC: 68        PLA
C - - - - - 0x03E5ED 0F:85DD: 20 24 80  JSR $8024
C - - - - - 0x03E5F0 0F:85E0: AE 35 06  LDX ram_0635
C - - - - - 0x03E5F3 0F:85E3: AC 37 06  LDY ram_0637
C - - - - - 0x03E5F6 0F:85E6: 20 E2 CD  JSR $CDE2
C - - - - - 0x03E5F9 0F:85E9: 8D FE 05  STA ram_05FE
C - - - - - 0x03E5FC 0F:85EC: AD 00 06  LDA ram_0600
C - - - - - 0x03E5FF 0F:85EF: F0 1D     BEQ $860E
C - - - - - 0x03E601 0F:85F1: A9 00     LDA #$00
C - - - - - 0x03E603 0F:85F3: 8D 16 06  STA ram_0616
C - - - - - 0x03E606 0F:85F6: AE 16 06  LDX ram_0616
C - - - - - 0x03E609 0F:85F9: BD 0B 06  LDA ram_060B,X
C - - - - - 0x03E60C 0F:85FC: C9 05     CMP #$05
C - - - - - 0x03E60E 0F:85FE: D0 03     BNE $8603
C - - - - - 0x03E610 0F:8600: 20 16 E6  JSR $E616
C - - - - - 0x03E613 0F:8603: EE 16 06  INC ram_0616
C - - - - - 0x03E616 0F:8606: AD 16 06  LDA ram_0616
C - - - - - 0x03E619 0F:8609: CD 00 06  CMP ram_0600
C - - - - - 0x03E61C 0F:860C: D0 E8     BNE $85F6
C - - - - - 0x03E61E 0F:860E: A9 04     LDA #$04
C - - - - - 0x03E620 0F:8610: 8D 2B 06  STA ram_062B
C - - - - - 0x03E623 0F:8613: 4C 96 DE  JMP $DE96
C - - - - - 0x03E626 0F:8616: A9 01     LDA #$01
C - - - - - 0x03E628 0F:8618: 8D 3B 04  STA ram_043B
C - - - - - 0x03E62B 0F:861B: A9 00     LDA #$00
C - - - - - 0x03E62D 0F:861D: 8D 3C 04  STA ram_043C
C - - - - - 0x03E630 0F:8620: A9 02     LDA #$02
C - - - - - 0x03E632 0F:8622: 8D 3D 04  STA ram_043D
C - - - - - 0x03E635 0F:8625: A9 00     LDA #$00
C - - - - - 0x03E637 0F:8627: 8D 3E 04  STA ram_043E
C - - - - - 0x03E63A 0F:862A: BD 01 06  LDA ram_0601,X
C - - - - - 0x03E63D 0F:862D: F0 48     BEQ $8677
C - - - - - 0x03E63F 0F:862F: C9 0B     CMP #$0B
C - - - - - 0x03E641 0F:8631: F0 44     BEQ $8677
C - - - - - 0x03E643 0F:8633: 8D 42 04  STA ram_0442
C - - - - - 0x03E646 0F:8636: 48        PHA
C - - - - - 0x03E647 0F:8637: A5 22     LDA ram_0022
C - - - - - 0x03E649 0F:8639: A9 1C     LDA #$1C
C - - - - - 0x03E64B 0F:863B: 85 24     STA ram_0024
C - - - - - 0x03E64D 0F:863D: A9 1D     LDA #$1D
C - - - - - 0x03E64F 0F:863F: 85 25     STA ram_0025
C - - - - - 0x03E651 0F:8641: 20 2D CE  JSR $CE2D
C - - - - - 0x03E654 0F:8644: 68        PLA
C - - - - - 0x03E655 0F:8645: 20 15 80  JSR $8015
C - - - - - 0x03E658 0F:8648: A5 32     LDA ram_0032
C - - - - - 0x03E65A 0F:864A: 18        CLC
C - - - - - 0x03E65B 0F:864B: 69 04     ADC #$04
C - - - - - 0x03E65D 0F:864D: 90 02     BCC $8651
- - - - - - 0x03E65F 0F:864F: A9        .byte $A9   ; 
- - - - - - 0x03E660 0F:8650: FF        .byte $FF   ; 
C - - - - - 0x03E661 0F:8651: 85 32     STA ram_0032
C - - - - - 0x03E663 0F:8653: 48        PHA
C - - - - - 0x03E664 0F:8654: A5 22     LDA ram_0022
C - - - - - 0x03E666 0F:8656: A9 1A     LDA #$1A
C - - - - - 0x03E668 0F:8658: 85 24     STA ram_0024
C - - - - - 0x03E66A 0F:865A: A9 1B     LDA #$1B
C - - - - - 0x03E66C 0F:865C: 85 25     STA ram_0025
C - - - - - 0x03E66E 0F:865E: 20 2D CE  JSR $CE2D
C - - - - - 0x03E671 0F:8661: 68        PLA
C - - - - - 0x03E672 0F:8662: 20 12 80  JSR $8012
C - - - - - 0x03E675 0F:8665: 48        PHA
C - - - - - 0x03E676 0F:8666: A5 22     LDA ram_0022
C - - - - - 0x03E678 0F:8668: A9 1A     LDA #$1A
C - - - - - 0x03E67A 0F:866A: 85 24     STA ram_0024
C - - - - - 0x03E67C 0F:866C: A9 1B     LDA #$1B
C - - - - - 0x03E67E 0F:866E: 85 25     STA ram_0025
C - - - - - 0x03E680 0F:8670: 20 2D CE  JSR $CE2D
C - - - - - 0x03E683 0F:8673: 68        PLA
C - - - - - 0x03E684 0F:8674: 20 15 80  JSR $8015
C - - - - - 0x03E687 0F:8677: 60        RTS
C D 3 - - - 0x03E688 0F:8678: AD FB 05  LDA ram_05FB
C - - - - - 0x03E68B 0F:867B: 49 0B     EOR #$0B
C - - - - - 0x03E68D 0F:867D: 8D FB 05  STA ram_05FB
C - - - - - 0x03E690 0F:8680: 20 93 D0  JSR $D093
C - - - - - 0x03E693 0F:8683: A9 02     LDA #$02
C - - - - - 0x03E695 0F:8685: 20 0F CB  JSR $CB0F
C D 3 - - - 0x03E698 0F:8688: A9 00     LDA #$00
C - - - - - 0x03E69A 0F:868A: 2C 35 06  BIT ram_0635
C - - - - - 0x03E69D 0F:868D: 10 02     BPL $8691
C - - - - - 0x03E69F 0F:868F: 09 01     ORA #$01
C - - - - - 0x03E6A1 0F:8691: 2C 37 06  BIT ram_0637
C - - - - - 0x03E6A4 0F:8694: 10 02     BPL $8698
C - - - - - 0x03E6A6 0F:8696: 09 02     ORA #$02
C - - - - - 0x03E6A8 0F:8698: 85 3A     STA ram_003A
C - - - - - 0x03E6AA 0F:869A: AD E2 00  LDA a: ram_00E2
C - - - - - 0x03E6AD 0F:869D: 29 07     AND #$07
C - - - - - 0x03E6AF 0F:869F: 0A        ASL
C - - - - - 0x03E6B0 0F:86A0: AA        TAX
C - - - - - 0x03E6B1 0F:86A1: BC D0 E6  LDY $E6D0,X
C - - - - - 0x03E6B4 0F:86A4: BD CF E6  LDA $E6CF,X
C - - - - - 0x03E6B7 0F:86A7: AA        TAX
C - - - - - 0x03E6B8 0F:86A8: 46 3A     LSR ram_003A
C - - - - - 0x03E6BA 0F:86AA: 90 04     BCC $86B0
C - - - - - 0x03E6BC 0F:86AC: 8A        TXA
C - - - - - 0x03E6BD 0F:86AD: 49 FF     EOR #$FF
C - - - - - 0x03E6BF 0F:86AF: AA        TAX
C - - - - - 0x03E6C0 0F:86B0: 46 3A     LSR ram_003A
C - - - - - 0x03E6C2 0F:86B2: 90 04     BCC $86B8
C - - - - - 0x03E6C4 0F:86B4: 98        TYA
C - - - - - 0x03E6C5 0F:86B5: 49 FF     EOR #$FF
C - - - - - 0x03E6C7 0F:86B7: A8        TAY
C - - - - - 0x03E6C8 0F:86B8: 8E 35 06  STX ram_0635
C - - - - - 0x03E6CB 0F:86BB: 8C 37 06  STY ram_0637
C - - - - - 0x03E6CE 0F:86BE: 20 E2 CD  JSR $CDE2
C - - - - - 0x03E6D1 0F:86C1: 8D 38 06  STA ram_0638
C - - - - - 0x03E6D4 0F:86C4: 8D FE 05  STA ram_05FE
C - - - - - 0x03E6D7 0F:86C7: A9 04     LDA #$04
C - - - - - 0x03E6D9 0F:86C9: 8D 2B 06  STA ram_062B
C - - - - - 0x03E6DC 0F:86CC: 4C 96 DE  JMP $DE96
- D 3 - - - 0x03E6DF 0F:86CF: 4C        .byte $4C   ; <L>
- D 3 - - - 0x03E6E0 0F:86D0: 54        .byte $54   ; <T>
- D 3 - - - 0x03E6E1 0F:86D1: 5C        .byte $5C   ; 
- D 3 - - - 0x03E6E2 0F:86D2: 54        .byte $54   ; <T>
- D 3 - - - 0x03E6E3 0F:86D3: 6C        .byte $6C   ; <l>
- D 3 - - - 0x03E6E4 0F:86D4: 5C        .byte $5C   ; 
- D 3 - - - 0x03E6E5 0F:86D5: 5C        .byte $5C   ; 
- D 3 - - - 0x03E6E6 0F:86D6: 64        .byte $64   ; <d>
- D 3 - - - 0x03E6E7 0F:86D7: 74        .byte $74   ; <t>
- D 3 - - - 0x03E6E8 0F:86D8: 6C        .byte $6C   ; <l>
- D 3 - - - 0x03E6E9 0F:86D9: 64        .byte $64   ; <d>
- D 3 - - - 0x03E6EA 0F:86DA: 74        .byte $74   ; <t>
- D 3 - - - 0x03E6EB 0F:86DB: 7C        .byte $7C   ; 
- D 3 - - - 0x03E6EC 0F:86DC: 7C        .byte $7C   ; 
- D 3 - - - 0x03E6ED 0F:86DD: 74        .byte $74   ; <t>
- D 3 - - - 0x03E6EE 0F:86DE: 8C        .byte $8C   ; 
- - - - - - 0x03E6EF 0F:86DF: AE        .byte $AE   ; 
- - - - - - 0x03E6F0 0F:86E0: 35        .byte $35   ; <5>
- - - - - - 0x03E6F1 0F:86E1: 06        .byte $06   ; 
- - - - - - 0x03E6F2 0F:86E2: AC        .byte $AC   ; 
- - - - - - 0x03E6F3 0F:86E3: 37        .byte $37   ; <7>
- - - - - - 0x03E6F4 0F:86E4: 06        .byte $06   ; 
- - - - - - 0x03E6F5 0F:86E5: 20        .byte $20   ; 
- - - - - - 0x03E6F6 0F:86E6: E2        .byte $E2   ; 
- - - - - - 0x03E6F7 0F:86E7: CD        .byte $CD   ; 
- - - - - - 0x03E6F8 0F:86E8: 8D        .byte $8D   ; 
- - - - - - 0x03E6F9 0F:86E9: FE        .byte $FE   ; 
- - - - - - 0x03E6FA 0F:86EA: 05        .byte $05   ; 
- - - - - - 0x03E6FB 0F:86EB: 60        .byte $60   ; 
C D 3 - - - 0x03E6FC 0F:86EC: AD 41 04  LDA ram_0441
C - - - - - 0x03E6FF 0F:86EF: 20 7C CD  JSR $CD7C
C - - - - - 0x03E702 0F:86F2: A0 06     LDY #$06
C - - - - - 0x03E704 0F:86F4: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E706 0F:86F6: 8D 35 06  STA ram_0635
C - - - - - 0x03E709 0F:86F9: AA        TAX
C - - - - - 0x03E70A 0F:86FA: A0 08     LDY #$08
C - - - - - 0x03E70C 0F:86FC: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E70E 0F:86FE: 8D 37 06  STA ram_0637
C - - - - - 0x03E711 0F:8701: A8        TAY
C - - - - - 0x03E712 0F:8702: 20 E2 CD  JSR $CDE2
C - - - - - 0x03E715 0F:8705: 8D FE 05  STA ram_05FE
C - - - - - 0x03E718 0F:8708: 60        RTS
C - - - - - 0x03E719 0F:8709: AD 2A 06  LDA ram_062A
C - - - - - 0x03E71C 0F:870C: 29 7F     AND #$7F
C - - - - - 0x03E71E 0F:870E: 8D 2A 06  STA ram_062A
C - - - - - 0x03E721 0F:8711: AD 37 06  LDA ram_0637
C - - - - - 0x03E724 0F:8714: 38        SEC
C - - - - - 0x03E725 0F:8715: E9 50     SBC #$50
C - - - - - 0x03E727 0F:8717: 29 E0     AND #$E0
C - - - - - 0x03E729 0F:8719: 4A        LSR
C - - - - - 0x03E72A 0F:871A: 4A        LSR
C - - - - - 0x03E72B 0F:871B: 4A        LSR
C - - - - - 0x03E72C 0F:871C: 85 3A     STA ram_003A
C - - - - - 0x03E72E 0F:871E: 4A        LSR
C - - - - - 0x03E72F 0F:871F: 4A        LSR
C - - - - - 0x03E730 0F:8720: 65 3A     ADC ram_003A
C - - - - - 0x03E732 0F:8722: 85 3A     STA ram_003A
C - - - - - 0x03E734 0F:8724: AD 35 06  LDA ram_0635
C - - - - - 0x03E737 0F:8727: 38        SEC
C - - - - - 0x03E738 0F:8728: E9 30     SBC #$30
C - - - - - 0x03E73A 0F:872A: 29 E0     AND #$E0
C - - - - - 0x03E73C 0F:872C: 4A        LSR
C - - - - - 0x03E73D 0F:872D: 4A        LSR
C - - - - - 0x03E73E 0F:872E: 4A        LSR
C - - - - - 0x03E73F 0F:872F: 4A        LSR
C - - - - - 0x03E740 0F:8730: 4A        LSR
C - - - - - 0x03E741 0F:8731: 65 3A     ADC ram_003A
C - - - - - 0x03E743 0F:8733: CD 2A 06  CMP ram_062A
C - - - - - 0x03E746 0F:8736: F0 05     BEQ $873D
C - - - - - 0x03E748 0F:8738: 09 80     ORA #$80
C - - - - - 0x03E74A 0F:873A: 8D 2A 06  STA ram_062A
C - - - - - 0x03E74D 0F:873D: 60        RTS
C D 3 - - - 0x03E74E 0F:873E: A9 00     LDA #$00
C - - - - - 0x03E750 0F:8740: 8D 00 06  STA ram_0600
C - - - - - 0x03E753 0F:8743: 8D FF 05  STA ram_05FF
C - - - - - 0x03E756 0F:8746: AD FE 05  LDA ram_05FE
C - - - - - 0x03E759 0F:8749: CD 38 06  CMP ram_0638
C - - - - - 0x03E75C 0F:874C: D0 03     BNE $8751
C - - - - - 0x03E75E 0F:874E: 4C CF E7  JMP $E7CF
C - - - - - 0x03E761 0F:8751: A9 2F     LDA #$2F
C - - - - - 0x03E763 0F:8753: 85 34     STA ram_0034
C - - - - - 0x03E765 0F:8755: A9 06     LDA #$06
C - - - - - 0x03E767 0F:8757: 85 35     STA ram_0035
C - - - - - 0x03E769 0F:8759: 20 D0 E7  JSR $E7D0
C - - - - - 0x03E76C 0F:875C: 8D 2C 06  STA ram_062C
C - - - - - 0x03E76F 0F:875F: 48        PHA
C - - - - - 0x03E770 0F:8760: 20 4A CE  JSR $CE4A
C - - - - - 0x03E773 0F:8763: 8E 39 06  STX ram_0639
C - - - - - 0x03E776 0F:8766: 8C 3A 06  STY ram_063A
C - - - - - 0x03E779 0F:8769: 68        PLA
C - - - - - 0x03E77A 0F:876A: 20 4D CE  JSR $CE4D
C - - - - - 0x03E77D 0F:876D: 8E 3B 06  STX ram_063B
C - - - - - 0x03E780 0F:8770: 8C 3C 06  STY ram_063C
C D 3 - - - 0x03E783 0F:8773: A9 01     LDA #$01
C - - - - - 0x03E785 0F:8775: 20 0F CB  JSR $CB0F
C - - - - - 0x03E788 0F:8778: AD 39 06  LDA ram_0639
C - - - - - 0x03E78B 0F:877B: 18        CLC
C - - - - - 0x03E78C 0F:877C: 6D 34 06  ADC ram_0634
C - - - - - 0x03E78F 0F:877F: 8D 34 06  STA ram_0634
C - - - - - 0x03E792 0F:8782: AD 3A 06  LDA ram_063A
C - - - - - 0x03E795 0F:8785: 6D 35 06  ADC ram_0635
C - - - - - 0x03E798 0F:8788: 8D 35 06  STA ram_0635
C - - - - - 0x03E79B 0F:878B: AA        TAX
C - - - - - 0x03E79C 0F:878C: AD 3B 06  LDA ram_063B
C - - - - - 0x03E79F 0F:878F: 18        CLC
C - - - - - 0x03E7A0 0F:8790: 6D 36 06  ADC ram_0636
C - - - - - 0x03E7A3 0F:8793: 8D 36 06  STA ram_0636
C - - - - - 0x03E7A6 0F:8796: AD 3C 06  LDA ram_063C
C - - - - - 0x03E7A9 0F:8799: 6D 37 06  ADC ram_0637
C - - - - - 0x03E7AC 0F:879C: 8D 37 06  STA ram_0637
C - - - - - 0x03E7AF 0F:879F: A8        TAY
C - - - - - 0x03E7B0 0F:87A0: 20 E2 CD  JSR $CDE2
C - - - - - 0x03E7B3 0F:87A3: C9 FF     CMP #$FF
C - - - - - 0x03E7B5 0F:87A5: F0 13     BEQ $87BA
C - - - - - 0x03E7B7 0F:87A7: CD FE 05  CMP ram_05FE
C - - - - - 0x03E7BA 0F:87AA: F0 CC     BEQ $8778
C - - - - - 0x03E7BC 0F:87AC: 8D FE 05  STA ram_05FE
C - - - - - 0x03E7BF 0F:87AF: CD 38 06  CMP ram_0638
C - - - - - 0x03E7C2 0F:87B2: F0 0C     BEQ $87C0
C - - - - - 0x03E7C4 0F:87B4: 20 0F 80  JSR $800F
C - - - - - 0x03E7C7 0F:87B7: 4C 73 E7  JMP $E773
C - - - - - 0x03E7CA 0F:87BA: AD 38 06  LDA ram_0638
C - - - - - 0x03E7CD 0F:87BD: 8D FE 05  STA ram_05FE
C - - - - - 0x03E7D0 0F:87C0: AD FE 05  LDA ram_05FE
C - - - - - 0x03E7D3 0F:87C3: 20 C9 CD  JSR $CDC9
C - - - - - 0x03E7D6 0F:87C6: 8E 35 06  STX ram_0635
C - - - - - 0x03E7D9 0F:87C9: 8C 37 06  STY ram_0637
C - - - - - 0x03E7DC 0F:87CC: 20 0C 80  JSR $800C
C D 3 - - - 0x03E7DF 0F:87CF: 60        RTS
C - - - - - 0x03E7E0 0F:87D0: A0 06     LDY #$06
C - - - - - 0x03E7E2 0F:87D2: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E7E4 0F:87D4: AA        TAX
C - - - - - 0x03E7E5 0F:87D5: A0 08     LDY #$08
C - - - - - 0x03E7E7 0F:87D7: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E7E9 0F:87D9: A8        TAY
C - - - - - 0x03E7EA 0F:87DA: 20 E2 CD  JSR $CDE2
C - - - - - 0x03E7ED 0F:87DD: A0 09     LDY #$09
C - - - - - 0x03E7EF 0F:87DF: D1 34     CMP (ram_0034),Y
C - - - - - 0x03E7F1 0F:87E1: D0 01     BNE $87E4
C - - - - - 0x03E7F3 0F:87E3: 60        RTS
C - - - - - 0x03E7F4 0F:87E4: A0 09     LDY #$09
C - - - - - 0x03E7F6 0F:87E6: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E7F8 0F:87E8: C9 F0     CMP #$F0
C - - - - - 0x03E7FA 0F:87EA: D0 03     BNE $87EF
C - - - - - 0x03E7FC 0F:87EC: AD FE 05  LDA ram_05FE
C - - - - - 0x03E7FF 0F:87EF: 20 C9 CD  JSR $CDC9
C - - - - - 0x03E802 0F:87F2: 8A        TXA
C - - - - - 0x03E803 0F:87F3: 85 3A     STA ram_003A
C - - - - - 0x03E805 0F:87F5: 98        TYA
C - - - - - 0x03E806 0F:87F6: 85 3B     STA ram_003B
C - - - - - 0x03E808 0F:87F8: A9 00     LDA #$00
C - - - - - 0x03E80A 0F:87FA: 85 3C     STA ram_003C
C - - - - - 0x03E80C 0F:87FC: A0 06     LDY #$06
C - - - - - 0x03E80E 0F:87FE: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E810 0F:8800: 38        SEC
C - - - - - 0x03E811 0F:8801: E5 3A     SBC ram_003A
C - - - - - 0x03E813 0F:8803: B0 06     BCS $880B
C - - - - - 0x03E815 0F:8805: 49 FF     EOR #$FF
C - - - - - 0x03E817 0F:8807: 69 01     ADC #$01
C - - - - - 0x03E819 0F:8809: E6 3C     INC ram_003C
C - - - - - 0x03E81B 0F:880B: 85 71     STA ram_0071
C - - - - - 0x03E81D 0F:880D: A0 08     LDY #$08
C - - - - - 0x03E81F 0F:880F: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E821 0F:8811: 38        SEC
C - - - - - 0x03E822 0F:8812: E5 3B     SBC ram_003B
C - - - - - 0x03E824 0F:8814: B0 08     BCS $881E
C - - - - - 0x03E826 0F:8816: 49 FF     EOR #$FF
C - - - - - 0x03E828 0F:8818: 69 01     ADC #$01
C - - - - - 0x03E82A 0F:881A: E6 3C     INC ram_003C
C - - - - - 0x03E82C 0F:881C: E6 3C     INC ram_003C
C - - - - - 0x03E82E 0F:881E: 85 70     STA ram_0070
C - - - - - 0x03E830 0F:8820: A9 00     LDA #$00
C - - - - - 0x03E832 0F:8822: 85 6F     STA ram_006F
C - - - - - 0x03E834 0F:8824: 85 74     STA ram_0074
C - - - - - 0x03E836 0F:8826: 20 3C CD  JSR $CD3C
C - - - - - 0x03E839 0F:8829: A2 00     LDX #$00
C - - - - - 0x03E83B 0F:882B: BD CD FA  LDA $FACD,X
C - - - - - 0x03E83E 0F:882E: C5 70     CMP ram_0070
C - - - - - 0x03E840 0F:8830: F0 04     BEQ $8836
C - - - - - 0x03E842 0F:8832: B0 0F     BCS $8843
C - - - - - 0x03E844 0F:8834: 90 09     BCC $883F
C - - - - - 0x03E846 0F:8836: BD CC FA  LDA $FACC,X
C - - - - - 0x03E849 0F:8839: E5 6F     SBC ram_006F
C - - - - - 0x03E84B 0F:883B: F0 06     BEQ $8843
C - - - - - 0x03E84D 0F:883D: B0 04     BCS $8843
C - - - - - 0x03E84F 0F:883F: E8        INX
C - - - - - 0x03E850 0F:8840: E8        INX
C - - - - - 0x03E851 0F:8841: D0 E8     BNE $882B
C - - - - - 0x03E853 0F:8843: 8A        TXA
C - - - - - 0x03E854 0F:8844: 4A        LSR
C - - - - - 0x03E855 0F:8845: 46 3C     LSR ram_003C
C - - - - - 0x03E857 0F:8847: B0 04     BCS $884D
C - - - - - 0x03E859 0F:8849: 49 FF     EOR #$FF
C - - - - - 0x03E85B 0F:884B: 29 7F     AND #$7F
C - - - - - 0x03E85D 0F:884D: 46 3C     LSR ram_003C
C - - - - - 0x03E85F 0F:884F: B0 02     BCS $8853
C - - - - - 0x03E861 0F:8851: 49 FF     EOR #$FF
C - - - - - 0x03E863 0F:8853: 60        RTS
C - - - - - 0x03E864 0F:8854: A0 0A     LDY #$0A
C - - - - - 0x03E866 0F:8856: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E868 0F:8858: D0 45     BNE $889F
C - - - - - 0x03E86A 0F:885A: AD FF 05  LDA ram_05FF
C - - - - - 0x03E86D 0F:885D: 85 43     STA ram_0043
C - - - - - 0x03E86F 0F:885F: 20 D0 E7  JSR $E7D0
C - - - - - 0x03E872 0F:8862: 85 44     STA ram_0044
C - - - - - 0x03E874 0F:8864: A0 06     LDY #$06
C - - - - - 0x03E876 0F:8866: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E878 0F:8868: AA        TAX
C - - - - - 0x03E879 0F:8869: A0 08     LDY #$08
C - - - - - 0x03E87B 0F:886B: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E87D 0F:886D: A8        TAY
C - - - - - 0x03E87E 0F:886E: 20 E2 CD  JSR $CDE2
C - - - - - 0x03E881 0F:8871: A0 09     LDY #$09
C - - - - - 0x03E883 0F:8873: D1 34     CMP (ram_0034),Y
C - - - - - 0x03E885 0F:8875: F0 21     BEQ $8898
C - - - - - 0x03E887 0F:8877: AA        TAX
C - - - - - 0x03E888 0F:8878: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E88A 0F:887A: C9 F0     CMP #$F0
C - - - - - 0x03E88C 0F:887C: D0 05     BNE $8883
C - - - - - 0x03E88E 0F:887E: EC FE 05  CPX ram_05FE
C - - - - - 0x03E891 0F:8881: F0 15     BEQ $8898
C - - - - - 0x03E893 0F:8883: A0 07     LDY #$07
C - - - - - 0x03E895 0F:8885: A5 44     LDA ram_0044
C - - - - - 0x03E897 0F:8887: 20 A0 E8  JSR $E8A0
C - - - - - 0x03E89A 0F:888A: A5 44     LDA ram_0044
C - - - - - 0x03E89C 0F:888C: 18        CLC
C - - - - - 0x03E89D 0F:888D: 69 40     ADC #$40
C - - - - - 0x03E89F 0F:888F: A0 05     LDY #$05
C - - - - - 0x03E8A1 0F:8891: 20 A0 E8  JSR $E8A0
C - - - - - 0x03E8A4 0F:8894: C6 43     DEC ram_0043
C - - - - - 0x03E8A6 0F:8896: D0 CC     BNE $8864
C - - - - - 0x03E8A8 0F:8898: A0 0A     LDY #$0A
C - - - - - 0x03E8AA 0F:889A: A9 00     LDA #$00
C - - - - - 0x03E8AC 0F:889C: 91 34     STA (ram_0034),Y
C - - - - - 0x03E8AE 0F:889E: 60        RTS
C - - - - - 0x03E8AF 0F:889F: 60        RTS
C - - - - - 0x03E8B0 0F:88A0: 84 46     STY ram_0046
C - - - - - 0x03E8B2 0F:88A2: 18        CLC
C - - - - - 0x03E8B3 0F:88A3: 69 10     ADC #$10
C - - - - - 0x03E8B5 0F:88A5: 4A        LSR
C - - - - - 0x03E8B6 0F:88A6: 4A        LSR
C - - - - - 0x03E8B7 0F:88A7: 4A        LSR
C - - - - - 0x03E8B8 0F:88A8: 4A        LSR
C - - - - - 0x03E8B9 0F:88A9: 4A        LSR
C - - - - - 0x03E8BA 0F:88AA: AA        TAX
C - - - - - 0x03E8BB 0F:88AB: BD ED E8  LDA $E8ED,X
C - - - - - 0x03E8BE 0F:88AE: 85 47     STA ram_0047
C - - - - - 0x03E8C0 0F:88B0: A4 32     LDY ram_0032
C - - - - - 0x03E8C2 0F:88B2: A6 33     LDX ram_0033
C - - - - - 0x03E8C4 0F:88B4: C6 47     DEC ram_0047
C - - - - - 0x03E8C6 0F:88B6: 10 06     BPL $88BE
C - - - - - 0x03E8C8 0F:88B8: A2 00     LDX #$00
C - - - - - 0x03E8CA 0F:88BA: A0 00     LDY #$00
C - - - - - 0x03E8CC 0F:88BC: F0 10     BEQ $88CE
C - - - - - 0x03E8CE 0F:88BE: C6 47     DEC ram_0047
C - - - - - 0x03E8D0 0F:88C0: 30 0C     BMI $88CE
C - - - - - 0x03E8D2 0F:88C2: 98        TYA
C - - - - - 0x03E8D3 0F:88C3: 49 FF     EOR #$FF
C - - - - - 0x03E8D5 0F:88C5: A8        TAY
C - - - - - 0x03E8D6 0F:88C6: 8A        TXA
C - - - - - 0x03E8D7 0F:88C7: 49 FF     EOR #$FF
C - - - - - 0x03E8D9 0F:88C9: AA        TAX
C - - - - - 0x03E8DA 0F:88CA: C8        INY
C - - - - - 0x03E8DB 0F:88CB: D0 01     BNE $88CE
C - - - - - 0x03E8DD 0F:88CD: E8        INX
C - - - - - 0x03E8DE 0F:88CE: 84 48     STY ram_0048
C - - - - - 0x03E8E0 0F:88D0: 86 49     STX ram_0049
C - - - - - 0x03E8E2 0F:88D2: A0 0A     LDY #$0A
C - - - - - 0x03E8E4 0F:88D4: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E8E6 0F:88D6: 38        SEC
C - - - - - 0x03E8E7 0F:88D7: ED FF 05  SBC ram_05FF
C - - - - - 0x03E8EA 0F:88DA: 10 10     BPL $88EC
C - - - - - 0x03E8EC 0F:88DC: 49 FF     EOR #$FF
C - - - - - 0x03E8EE 0F:88DE: 18        CLC
C - - - - - 0x03E8EF 0F:88DF: 69 01     ADC #$01
C - - - - - 0x03E8F1 0F:88E1: F0 09     BEQ $88EC
C - - - - - 0x03E8F3 0F:88E3: A5 48     LDA ram_0048
C - - - - - 0x03E8F5 0F:88E5: A6 49     LDX ram_0049
C - - - - - 0x03E8F7 0F:88E7: A4 46     LDY ram_0046
C - - - - - 0x03E8F9 0F:88E9: 20 12 E9  JSR $E912
C - - - - - 0x03E8FC 0F:88EC: 60        RTS
- D 3 - - - 0x03E8FD 0F:88ED: 00        .byte $00   ; 
- D 3 - - - 0x03E8FE 0F:88EE: 01        .byte $01   ; 
- D 3 - - - 0x03E8FF 0F:88EF: 01        .byte $01   ; 
- D 3 - - - 0x03E900 0F:88F0: 01        .byte $01   ; 
- D 3 - - - 0x03E901 0F:88F1: 00        .byte $00   ; 
- D 3 - - - 0x03E902 0F:88F2: 02        .byte $02   ; 
- D 3 - - - 0x03E903 0F:88F3: 02        .byte $02   ; 
- D 3 - - - 0x03E904 0F:88F4: 02        .byte $02   ; 
C - - - - - 0x03E905 0F:88F5: 84 47     STY ram_0047
C - - - - - 0x03E907 0F:88F7: A4 32     LDY ram_0032
C - - - - - 0x03E909 0F:88F9: A6 33     LDX ram_0033
C - - - - - 0x03E90B 0F:88FB: 29 03     AND #$03
C - - - - - 0x03E90D 0F:88FD: D0 01     BNE $8900
C - - - - - 0x03E90F 0F:88FF: 60        RTS
C - - - - - 0x03E910 0F:8900: 4A        LSR
C - - - - - 0x03E911 0F:8901: B0 0C     BCS $890F
C - - - - - 0x03E913 0F:8903: 98        TYA
C - - - - - 0x03E914 0F:8904: 49 FF     EOR #$FF
C - - - - - 0x03E916 0F:8906: A8        TAY
C - - - - - 0x03E917 0F:8907: 8A        TXA
C - - - - - 0x03E918 0F:8908: 49 FF     EOR #$FF
C - - - - - 0x03E91A 0F:890A: AA        TAX
C - - - - - 0x03E91B 0F:890B: C8        INY
C - - - - - 0x03E91C 0F:890C: D0 01     BNE $890F
- - - - - - 0x03E91E 0F:890E: E8        .byte $E8   ; 
C - - - - - 0x03E91F 0F:890F: 98        TYA
C - - - - - 0x03E920 0F:8910: A4 47     LDY ram_0047
C - - - - - 0x03E922 0F:8912: 18        CLC
C - - - - - 0x03E923 0F:8913: 71 34     ADC (ram_0034),Y
C - - - - - 0x03E925 0F:8915: 91 34     STA (ram_0034),Y
C - - - - - 0x03E927 0F:8917: C8        INY
C - - - - - 0x03E928 0F:8918: 8A        TXA
C - - - - - 0x03E929 0F:8919: 71 34     ADC (ram_0034),Y
C - - - - - 0x03E92B 0F:891B: C0 06     CPY #$06
C - - - - - 0x03E92D 0F:891D: F0 0E     BEQ $892D
C - - - - - 0x03E92F 0F:891F: A2 50     LDX #$50
C - - - - - 0x03E931 0F:8921: C9 50     CMP #$50
C - - - - - 0x03E933 0F:8923: 90 14     BCC $8939
C - - - - - 0x03E935 0F:8925: A2 AF     LDX #$AF
C - - - - - 0x03E937 0F:8927: C9 B0     CMP #$B0
C - - - - - 0x03E939 0F:8929: B0 0E     BCS $8939
C - - - - - 0x03E93B 0F:892B: 90 0D     BCC $893A
C - - - - - 0x03E93D 0F:892D: A2 30     LDX #$30
C - - - - - 0x03E93F 0F:892F: C9 30     CMP #$30
C - - - - - 0x03E941 0F:8931: 90 06     BCC $8939
C - - - - - 0x03E943 0F:8933: A2 CF     LDX #$CF
C - - - - - 0x03E945 0F:8935: C9 D0     CMP #$D0
C - - - - - 0x03E947 0F:8937: 90 01     BCC $893A
C - - - - - 0x03E949 0F:8939: 8A        TXA
C - - - - - 0x03E94A 0F:893A: 91 34     STA (ram_0034),Y
C - - - - - 0x03E94C 0F:893C: 60        RTS
C D 3 - - - 0x03E94D 0F:893D: 48        PHA
C - - - - - 0x03E94E 0F:893E: 8A        TXA
C - - - - - 0x03E94F 0F:893F: 48        PHA
C - - - - - 0x03E950 0F:8940: A9 01     LDA #$01
C - - - - - 0x03E952 0F:8942: 20 0F CB  JSR $CB0F
C - - - - - 0x03E955 0F:8945: AD 15 05  LDA ram_0515
C - - - - - 0x03E958 0F:8948: D0 F6     BNE $8940
C - - - - - 0x03E95A 0F:894A: A9 01     LDA #$01
C - - - - - 0x03E95C 0F:894C: 8D 15 05  STA ram_0515
C - - - - - 0x03E95F 0F:894F: A9 00     LDA #$00
C - - - - - 0x03E961 0F:8951: 85 3E     STA ram_003E
C - - - - - 0x03E963 0F:8953: 68        PLA
C - - - - - 0x03E964 0F:8954: 4A        LSR
C - - - - - 0x03E965 0F:8955: 66 3E     ROR ram_003E
C - - - - - 0x03E967 0F:8957: 4A        LSR
C - - - - - 0x03E968 0F:8958: 66 3E     ROR ram_003E
C - - - - - 0x03E96A 0F:895A: 85 3F     STA ram_003F
C - - - - - 0x03E96C 0F:895C: 68        PLA
C - - - - - 0x03E96D 0F:895D: 0A        ASL
C - - - - - 0x03E96E 0F:895E: 66 3A     ROR ram_003A
C - - - - - 0x03E970 0F:8960: A8        TAY
C - - - - - 0x03E971 0F:8961: 18        CLC
C - - - - - 0x03E972 0F:8962: B9 DA E9  LDA $E9DA,Y
C - - - - - 0x03E975 0F:8965: 85 3C     STA ram_003C
C - - - - - 0x03E977 0F:8967: B9 DB E9  LDA $E9DB,Y
C - - - - - 0x03E97A 0F:896A: 85 3D     STA ram_003D
C - - - - - 0x03E97C 0F:896C: A0 00     LDY #$00
C - - - - - 0x03E97E 0F:896E: 18        CLC
C - - - - - 0x03E97F 0F:896F: B1 3C     LDA (ram_003C),Y
C - - - - - 0x03E981 0F:8971: 65 3E     ADC ram_003E
C - - - - - 0x03E983 0F:8973: 85 3E     STA ram_003E
C - - - - - 0x03E985 0F:8975: C8        INY
C - - - - - 0x03E986 0F:8976: B1 3C     LDA (ram_003C),Y
C - - - - - 0x03E988 0F:8978: 65 3F     ADC ram_003F
C - - - - - 0x03E98A 0F:897A: 85 3F     STA ram_003F
C - - - - - 0x03E98C 0F:897C: C8        INY
C - - - - - 0x03E98D 0F:897D: B1 3C     LDA (ram_003C),Y
C - - - - - 0x03E98F 0F:897F: 29 03     AND #$03
C - - - - - 0x03E991 0F:8981: 85 40     STA ram_0040
C - - - - - 0x03E993 0F:8983: B1 3C     LDA (ram_003C),Y
C - - - - - 0x03E995 0F:8985: 4A        LSR
C - - - - - 0x03E996 0F:8986: 4A        LSR
C - - - - - 0x03E997 0F:8987: 85 41     STA ram_0041
C - - - - - 0x03E999 0F:8989: C8        INY
C - - - - - 0x03E99A 0F:898A: A2 00     LDX #$00
C - - - - - 0x03E99C 0F:898C: A5 41     LDA ram_0041
C - - - - - 0x03E99E 0F:898E: 9D A5 04  STA ram_04A5,X
C - - - - - 0x03E9A1 0F:8991: 18        CLC
C - - - - - 0x03E9A2 0F:8992: A5 3E     LDA ram_003E
C - - - - - 0x03E9A4 0F:8994: 9D A6 04  STA ram_04A6,X
C - - - - - 0x03E9A7 0F:8997: 69 20     ADC #$20
C - - - - - 0x03E9A9 0F:8999: 85 3E     STA ram_003E
C - - - - - 0x03E9AB 0F:899B: A5 3F     LDA ram_003F
C - - - - - 0x03E9AD 0F:899D: 9D A7 04  STA ram_04A7,X
C - - - - - 0x03E9B0 0F:89A0: 69 00     ADC #$00
C - - - - - 0x03E9B2 0F:89A2: 85 3F     STA ram_003F
C - - - - - 0x03E9B4 0F:89A4: E8        INX
C - - - - - 0x03E9B5 0F:89A5: E8        INX
C - - - - - 0x03E9B6 0F:89A6: E8        INX
C - - - - - 0x03E9B7 0F:89A7: A5 41     LDA ram_0041
C - - - - - 0x03E9B9 0F:89A9: 85 43     STA ram_0043
C - - - - - 0x03E9BB 0F:89AB: 2C 3A 00  BIT a: ram_003A
C - - - - - 0x03E9BE 0F:89AE: 30 11     BMI $89C1
C - - - - - 0x03E9C0 0F:89B0: B1 3C     LDA (ram_003C),Y
C - - - - - 0x03E9C2 0F:89B2: C8        INY
C - - - - - 0x03E9C3 0F:89B3: C9 FE     CMP #$FE
C - - - - - 0x03E9C5 0F:89B5: F0 0A     BEQ $89C1
C - - - - - 0x03E9C7 0F:89B7: 9D A5 04  STA ram_04A5,X
C - - - - - 0x03E9CA 0F:89BA: E8        INX
C - - - - - 0x03E9CB 0F:89BB: C6 43     DEC ram_0043
C - - - - - 0x03E9CD 0F:89BD: D0 F1     BNE $89B0
C - - - - - 0x03E9CF 0F:89BF: F0 0A     BEQ $89CB
C - - - - - 0x03E9D1 0F:89C1: A9 00     LDA #$00
C - - - - - 0x03E9D3 0F:89C3: 9D A5 04  STA ram_04A5,X
C - - - - - 0x03E9D6 0F:89C6: E8        INX
C - - - - - 0x03E9D7 0F:89C7: C6 43     DEC ram_0043
C - - - - - 0x03E9D9 0F:89C9: D0 F8     BNE $89C3
C - - - - - 0x03E9DB 0F:89CB: A9 00     LDA #$00
C - - - - - 0x03E9DD 0F:89CD: 9D A5 04  STA ram_04A5,X
C - - - - - 0x03E9E0 0F:89D0: C6 40     DEC ram_0040
C - - - - - 0x03E9E2 0F:89D2: D0 B8     BNE $898C
C - - - - - 0x03E9E4 0F:89D4: A9 80     LDA #$80
C - - - - - 0x03E9E6 0F:89D6: 8D 15 05  STA ram_0515
C - - - - - 0x03E9E9 0F:89D9: 60        RTS
- D 3 - - - 0x03E9EA 0F:89DA: 1C        .byte $1C   ; 
- D 3 - - - 0x03E9EB 0F:89DB: EA        .byte $EA   ; 
- D 3 - - - 0x03E9EC 0F:89DC: 29        .byte $29   ; 
- D 3 - - - 0x03E9ED 0F:89DD: EA        .byte $EA   ; 
- D 3 - - - 0x03E9EE 0F:89DE: 34        .byte $34   ; <4>
- D 3 - - - 0x03E9EF 0F:89DF: EA        .byte $EA   ; 
- D 3 - - - 0x03E9F0 0F:89E0: 3D        .byte $3D   ; 
- D 3 - - - 0x03E9F1 0F:89E1: EA        .byte $EA   ; 
- D 3 - - - 0x03E9F2 0F:89E2: 46        .byte $46   ; <F>
- D 3 - - - 0x03E9F3 0F:89E3: EA        .byte $EA   ; 
- D 3 - - - 0x03E9F4 0F:89E4: 51        .byte $51   ; <Q>
- D 3 - - - 0x03E9F5 0F:89E5: EA        .byte $EA   ; 
- D 3 - - - 0x03E9F6 0F:89E6: 59        .byte $59   ; <Y>
- D 3 - - - 0x03E9F7 0F:89E7: EA        .byte $EA   ; 
- D 3 - - - 0x03E9F8 0F:89E8: 61        .byte $61   ; <a>
- D 3 - - - 0x03E9F9 0F:89E9: EA        .byte $EA   ; 
- D 3 - - - 0x03E9FA 0F:89EA: 6A        .byte $6A   ; <j>
- D 3 - - - 0x03E9FB 0F:89EB: EA        .byte $EA   ; 
- D 3 - - - 0x03E9FC 0F:89EC: 73        .byte $73   ; <s>
- D 3 - - - 0x03E9FD 0F:89ED: EA        .byte $EA   ; 
- D 3 - - - 0x03E9FE 0F:89EE: 7C        .byte $7C   ; 
- D 3 - - - 0x03E9FF 0F:89EF: EA        .byte $EA   ; 
- D 3 - - - 0x03EA00 0F:89F0: 87        .byte $87   ; 
- D 3 - - - 0x03EA01 0F:89F1: EA        .byte $EA   ; 
- D 3 - - - 0x03EA02 0F:89F2: 94        .byte $94   ; 
- D 3 - - - 0x03EA03 0F:89F3: EA        .byte $EA   ; 
- D 3 - - - 0x03EA04 0F:89F4: 9F        .byte $9F   ; 
- D 3 - - - 0x03EA05 0F:89F5: EA        .byte $EA   ; 
- D 3 - - - 0x03EA06 0F:89F6: AC        .byte $AC   ; 
- D 3 - - - 0x03EA07 0F:89F7: EA        .byte $EA   ; 
- D 3 - - - 0x03EA08 0F:89F8: B7        .byte $B7   ; 
- D 3 - - - 0x03EA09 0F:89F9: EA        .byte $EA   ; 
- D 3 - - - 0x03EA0A 0F:89FA: C4        .byte $C4   ; 
- D 3 - - - 0x03EA0B 0F:89FB: EA        .byte $EA   ; 
- D 3 - - - 0x03EA0C 0F:89FC: CE        .byte $CE   ; 
- D 3 - - - 0x03EA0D 0F:89FD: EA        .byte $EA   ; 
- D 3 - - - 0x03EA0E 0F:89FE: DB        .byte $DB   ; 
- D 3 - - - 0x03EA0F 0F:89FF: EA        .byte $EA   ; 
- D 3 - - - 0x03EA10 0F:8A00: E6        .byte $E6   ; 
- D 3 - - - 0x03EA11 0F:8A01: EA        .byte $EA   ; 
- D 3 - - - 0x03EA12 0F:8A02: EF        .byte $EF   ; 
- D 3 - - - 0x03EA13 0F:8A03: EA        .byte $EA   ; 
- D 3 - - - 0x03EA14 0F:8A04: F8        .byte $F8   ; 
- D 3 - - - 0x03EA15 0F:8A05: EA        .byte $EA   ; 
- D 3 - - - 0x03EA16 0F:8A06: 01        .byte $01   ; 
- D 3 - - - 0x03EA17 0F:8A07: EB        .byte $EB   ; 
- D 3 - - - 0x03EA18 0F:8A08: 0D        .byte $0D   ; 
- D 3 - - - 0x03EA19 0F:8A09: EB        .byte $EB   ; 
- D 3 - - - 0x03EA1A 0F:8A0A: 17        .byte $17   ; 
- D 3 - - - 0x03EA1B 0F:8A0B: EB        .byte $EB   ; 
- D 3 - - - 0x03EA1C 0F:8A0C: 26        .byte $26   ; 
- D 3 - - - 0x03EA1D 0F:8A0D: EB        .byte $EB   ; 
- D 3 - - - 0x03EA1E 0F:8A0E: 33        .byte $33   ; <3>
- D 3 - - - 0x03EA1F 0F:8A0F: EB        .byte $EB   ; 
- D 3 - - - 0x03EA20 0F:8A10: 3E        .byte $3E   ; 
- D 3 - - - 0x03EA21 0F:8A11: EB        .byte $EB   ; 
- D 3 - - - 0x03EA22 0F:8A12: 4C        .byte $4C   ; <L>
- D 3 - - - 0x03EA23 0F:8A13: EB        .byte $EB   ; 
- D 3 - - - 0x03EA24 0F:8A14: 5E        .byte $5E   ; 
- D 3 - - - 0x03EA25 0F:8A15: EB        .byte $EB   ; 
- D 3 - - - 0x03EA26 0F:8A16: 67        .byte $67   ; <g>
- D 3 - - - 0x03EA27 0F:8A17: EB        .byte $EB   ; 
- D 3 - - - 0x03EA28 0F:8A18: 72        .byte $72   ; <r>
- D 3 - - - 0x03EA29 0F:8A19: EB        .byte $EB   ; 
- D 3 - - - 0x03EA2A 0F:8A1A: 7B        .byte $7B   ; 
- D 3 - - - 0x03EA2B 0F:8A1B: EB        .byte $EB   ; 
- D 3 - I - 0x03EA2C 0F:8A1C: AC        .byte $AC   ; 
- D 3 - I - 0x03EA2D 0F:8A1D: 22        .byte $22   ; 
- D 3 - I - 0x03EA2E 0F:8A1E: 16        .byte $16   ; 
- D 3 - I - 0x03EA2F 0F:8A1F: 94        .byte $94   ; 
- D 3 - I - 0x03EA30 0F:8A20: 00        .byte $00   ; 
- D 3 - I - 0x03EA31 0F:8A21: 94        .byte $94   ; 
- D 3 - I - 0x03EA32 0F:8A22: 00        .byte $00   ; 
- D 3 - I - 0x03EA33 0F:8A23: 00        .byte $00   ; 
- D 3 - I - 0x03EA34 0F:8A24: 54        .byte $54   ; <T>
- D 3 - I - 0x03EA35 0F:8A25: 68        .byte $68   ; <h>
- D 3 - I - 0x03EA36 0F:8A26: 5C        .byte $5C   ; 
- D 3 - I - 0x03EA37 0F:8A27: 69        .byte $69   ; <i>
- D 3 - I - 0x03EA38 0F:8A28: 00        .byte $00   ; 
- D 3 - I - 0x03EA39 0F:8A29: AC        .byte $AC   ; 
- D 3 - I - 0x03EA3A 0F:8A2A: 22        .byte $22   ; 
- D 3 - I - 0x03EA3B 0F:8A2B: 16        .byte $16   ; 
- D 3 - I - 0x03EA3C 0F:8A2C: 00        .byte $00   ; 
- D 3 - I - 0x03EA3D 0F:8A2D: 95        .byte $95   ; 
- D 3 - I - 0x03EA3E 0F:8A2E: FE        .byte $FE   ; 
- D 3 - I - 0x03EA3F 0F:8A2F: 00        .byte $00   ; 
- D 3 - I - 0x03EA40 0F:8A30: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03EA41 0F:8A31: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03EA42 0F:8A32: 00        .byte $00   ; 
- D 3 - I - 0x03EA43 0F:8A33: 00        .byte $00   ; 
- D 3 - I - 0x03EA44 0F:8A34: AC        .byte $AC   ; 
- D 3 - I - 0x03EA45 0F:8A35: 22        .byte $22   ; 
- D 3 - I - 0x03EA46 0F:8A36: 16        .byte $16   ; 
- D 3 - I - 0x03EA47 0F:8A37: FE        .byte $FE   ; 
- D 3 - I - 0x03EA48 0F:8A38: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03EA49 0F:8A39: 71        .byte $71   ; <q>
- D 3 - I - 0x03EA4A 0F:8A3A: 7D        .byte $7D   ; 
- D 3 - I - 0x03EA4B 0F:8A3B: 54        .byte $54   ; <T>
- D 3 - I - 0x03EA4C 0F:8A3C: 00        .byte $00   ; 
- D 3 - I - 0x03EA4D 0F:8A3D: AC        .byte $AC   ; 
- D 3 - I - 0x03EA4E 0F:8A3E: 22        .byte $22   ; 
- D 3 - I - 0x03EA4F 0F:8A3F: 16        .byte $16   ; 
- D 3 - I - 0x03EA50 0F:8A40: FE        .byte $FE   ; 
- D 3 - I - 0x03EA51 0F:8A41: 6C        .byte $6C   ; <l>
- D 3 - I - 0x03EA52 0F:8A42: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EA53 0F:8A43: 3F        .byte $3F   ; 
- D 3 - I - 0x03EA54 0F:8A44: 52        .byte $52   ; <R>
- D 3 - I - 0x03EA55 0F:8A45: 7D        .byte $7D   ; 
- D 3 - I - 0x03EA56 0F:8A46: AC        .byte $AC   ; 
- D 3 - I - 0x03EA57 0F:8A47: 22        .byte $22   ; 
- D 3 - I - 0x03EA58 0F:8A48: 12        .byte $12   ; 
- D 3 - I - 0x03EA59 0F:8A49: 00        .byte $00   ; 
- D 3 - I - 0x03EA5A 0F:8A4A: 00        .byte $00   ; 
- D 3 - I - 0x03EA5B 0F:8A4B: 00        .byte $00   ; 
- D 3 - I - 0x03EA5C 0F:8A4C: 95        .byte $95   ; 
- D 3 - I - 0x03EA5D 0F:8A4D: 54        .byte $54   ; <T>
- D 3 - I - 0x03EA5E 0F:8A4E: 67        .byte $67   ; <g>
- D 3 - I - 0x03EA5F 0F:8A4F: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03EA60 0F:8A50: 5C        .byte $5C   ; 
- D 3 - I - 0x03EA61 0F:8A51: AC        .byte $AC   ; 
- D 3 - I - 0x03EA62 0F:8A52: 22        .byte $22   ; 
- D 3 - I - 0x03EA63 0F:8A53: 12        .byte $12   ; 
- D 3 - I - 0x03EA64 0F:8A54: FE        .byte $FE   ; 
- D 3 - I - 0x03EA65 0F:8A55: 00        .byte $00   ; 
- D 3 - I - 0x03EA66 0F:8A56: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03EA67 0F:8A57: 69        .byte $69   ; <i>
- D 3 - I - 0x03EA68 0F:8A58: 7D        .byte $7D   ; 
- D 3 - I - 0x03EA69 0F:8A59: AC        .byte $AC   ; 
- D 3 - I - 0x03EA6A 0F:8A5A: 22        .byte $22   ; 
- D 3 - I - 0x03EA6B 0F:8A5B: 12        .byte $12   ; 
- D 3 - I - 0x03EA6C 0F:8A5C: FE        .byte $FE   ; 
- D 3 - I - 0x03EA6D 0F:8A5D: 48        .byte $48   ; <H>
- D 3 - I - 0x03EA6E 0F:8A5E: 68        .byte $68   ; <h>
- D 3 - I - 0x03EA6F 0F:8A5F: 41        .byte $41   ; <A>
- D 3 - I - 0x03EA70 0F:8A60: 7D        .byte $7D   ; 
- D 3 - I - 0x03EA71 0F:8A61: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EA72 0F:8A62: 22        .byte $22   ; 
- D 3 - I - 0x03EA73 0F:8A63: 16        .byte $16   ; 
- D 3 - I - 0x03EA74 0F:8A64: FE        .byte $FE   ; 
- D 3 - I - 0x03EA75 0F:8A65: 00        .byte $00   ; 
- D 3 - I - 0x03EA76 0F:8A66: 50        .byte $50   ; <P>
- D 3 - I - 0x03EA77 0F:8A67: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03EA78 0F:8A68: 48        .byte $48   ; <H>
- D 3 - I - 0x03EA79 0F:8A69: 69        .byte $69   ; <i>
- D 3 - I - 0x03EA7A 0F:8A6A: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EA7B 0F:8A6B: 22        .byte $22   ; 
- D 3 - I - 0x03EA7C 0F:8A6C: 16        .byte $16   ; 
- D 3 - I - 0x03EA7D 0F:8A6D: FE        .byte $FE   ; 
- D 3 - I - 0x03EA7E 0F:8A6E: 00        .byte $00   ; 
- D 3 - I - 0x03EA7F 0F:8A6F: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03EA80 0F:8A70: 46        .byte $46   ; <F>
- D 3 - I - 0x03EA81 0F:8A71: 42        .byte $42   ; <B>
- D 3 - I - 0x03EA82 0F:8A72: 50        .byte $50   ; <P>
- D 3 - I - 0x03EA83 0F:8A73: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EA84 0F:8A74: 22        .byte $22   ; 
- D 3 - I - 0x03EA85 0F:8A75: 16        .byte $16   ; 
- D 3 - I - 0x03EA86 0F:8A76: FE        .byte $FE   ; 
- D 3 - I - 0x03EA87 0F:8A77: 00        .byte $00   ; 
- D 3 - I - 0x03EA88 0F:8A78: 46        .byte $46   ; <F>
- D 3 - I - 0x03EA89 0F:8A79: 60        .byte $60   ; 
- D 3 - I - 0x03EA8A 0F:8A7A: 4F        .byte $4F   ; <O>
- D 3 - I - 0x03EA8B 0F:8A7B: 68        .byte $68   ; <h>
- D 3 - I - 0x03EA8C 0F:8A7C: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EA8D 0F:8A7D: 22        .byte $22   ; 
- D 3 - I - 0x03EA8E 0F:8A7E: 16        .byte $16   ; 
- D 3 - I - 0x03EA8F 0F:8A7F: 00        .byte $00   ; 
- D 3 - I - 0x03EA90 0F:8A80: 95        .byte $95   ; 
- D 3 - I - 0x03EA91 0F:8A81: FE        .byte $FE   ; 
- D 3 - I - 0x03EA92 0F:8A82: 00        .byte $00   ; 
- D 3 - I - 0x03EA93 0F:8A83: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03EA94 0F:8A84: 6C        .byte $6C   ; <l>
- D 3 - I - 0x03EA95 0F:8A85: 7D        .byte $7D   ; 
- D 3 - I - 0x03EA96 0F:8A86: 50        .byte $50   ; <P>
- D 3 - I - 0x03EA97 0F:8A87: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EA98 0F:8A88: 22        .byte $22   ; 
- D 3 - I - 0x03EA99 0F:8A89: 16        .byte $16   ; 
- D 3 - I - 0x03EA9A 0F:8A8A: 00        .byte $00   ; 
- D 3 - I - 0x03EA9B 0F:8A8B: 00        .byte $00   ; 
- D 3 - I - 0x03EA9C 0F:8A8C: 00        .byte $00   ; 
- D 3 - I - 0x03EA9D 0F:8A8D: 94        .byte $94   ; 
- D 3 - I - 0x03EA9E 0F:8A8E: 00        .byte $00   ; 
- D 3 - I - 0x03EA9F 0F:8A8F: 00        .byte $00   ; 
- D 3 - I - 0x03EAA0 0F:8A90: 50        .byte $50   ; <P>
- D 3 - I - 0x03EAA1 0F:8A91: 42        .byte $42   ; <B>
- D 3 - I - 0x03EAA2 0F:8A92: 46        .byte $46   ; <F>
- D 3 - I - 0x03EAA3 0F:8A93: 7D        .byte $7D   ; 
- D 3 - I - 0x03EAA4 0F:8A94: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EAA5 0F:8A95: 22        .byte $22   ; 
- D 3 - I - 0x03EAA6 0F:8A96: 16        .byte $16   ; 
- D 3 - I - 0x03EAA7 0F:8A97: 00        .byte $00   ; 
- D 3 - I - 0x03EAA8 0F:8A98: 94        .byte $94   ; 
- D 3 - I - 0x03EAA9 0F:8A99: FE        .byte $FE   ; 
- D 3 - I - 0x03EAAA 0F:8A9A: 00        .byte $00   ; 
- D 3 - I - 0x03EAAB 0F:8A9B: 5C        .byte $5C   ; 
- D 3 - I - 0x03EAAC 0F:8A9C: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03EAAD 0F:8A9D: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03EAAE 0F:8A9E: 48        .byte $48   ; <H>
- D 3 - I - 0x03EAAF 0F:8A9F: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EAB0 0F:8AA0: 22        .byte $22   ; 
- D 3 - I - 0x03EAB1 0F:8AA1: 16        .byte $16   ; 
- D 3 - I - 0x03EAB2 0F:8AA2: 00        .byte $00   ; 
- D 3 - I - 0x03EAB3 0F:8AA3: 00        .byte $00   ; 
- D 3 - I - 0x03EAB4 0F:8AA4: 00        .byte $00   ; 
- D 3 - I - 0x03EAB5 0F:8AA5: 00        .byte $00   ; 
- D 3 - I - 0x03EAB6 0F:8AA6: 94        .byte $94   ; 
- D 3 - I - 0x03EAB7 0F:8AA7: 00        .byte $00   ; 
- D 3 - I - 0x03EAB8 0F:8AA8: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03EAB9 0F:8AA9: 46        .byte $46   ; <F>
- D 3 - I - 0x03EABA 0F:8AAA: 42        .byte $42   ; <B>
- D 3 - I - 0x03EABB 0F:8AAB: 5C        .byte $5C   ; 
- D 3 - I - 0x03EABC 0F:8AAC: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EABD 0F:8AAD: 22        .byte $22   ; 
- D 3 - I - 0x03EABE 0F:8AAE: 16        .byte $16   ; 
- D 3 - I - 0x03EABF 0F:8AAF: 00        .byte $00   ; 
- D 3 - I - 0x03EAC0 0F:8AB0: 94        .byte $94   ; 
- D 3 - I - 0x03EAC1 0F:8AB1: FE        .byte $FE   ; 
- D 3 - I - 0x03EAC2 0F:8AB2: 00        .byte $00   ; 
- D 3 - I - 0x03EAC3 0F:8AB3: 06        .byte $06   ; 
- D 3 - I - 0x03EAC4 0F:8AB4: 2E        .byte $2E   ; 
- D 3 - I - 0x03EAC5 0F:8AB5: 22        .byte $22   ; 
- D 3 - I - 0x03EAC6 0F:8AB6: 2E        .byte $2E   ; 
- D 3 - I - 0x03EAC7 0F:8AB7: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EAC8 0F:8AB8: 22        .byte $22   ; 
- D 3 - I - 0x03EAC9 0F:8AB9: 16        .byte $16   ; 
- D 3 - I - 0x03EACA 0F:8ABA: 00        .byte $00   ; 
- D 3 - I - 0x03EACB 0F:8ABB: 95        .byte $95   ; 
- D 3 - I - 0x03EACC 0F:8ABC: 00        .byte $00   ; 
- D 3 - I - 0x03EACD 0F:8ABD: 00        .byte $00   ; 
- D 3 - I - 0x03EACE 0F:8ABE: 94        .byte $94   ; 
- D 3 - I - 0x03EACF 0F:8ABF: 00        .byte $00   ; 
- D 3 - I - 0x03EAD0 0F:8AC0: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03EAD1 0F:8AC1: 6C        .byte $6C   ; <l>
- D 3 - I - 0x03EAD2 0F:8AC2: 7D        .byte $7D   ; 
- D 3 - I - 0x03EAD3 0F:8AC3: 5C        .byte $5C   ; 
- D 3 - I - 0x03EAD4 0F:8AC4: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EAD5 0F:8AC5: 22        .byte $22   ; 
- D 3 - I - 0x03EAD6 0F:8AC6: 16        .byte $16   ; 
- D 3 - I - 0x03EAD7 0F:8AC7: 95        .byte $95   ; 
- D 3 - I - 0x03EAD8 0F:8AC8: FE        .byte $FE   ; 
- D 3 - I - 0x03EAD9 0F:8AC9: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03EADA 0F:8ACA: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03EADB 0F:8ACB: 46        .byte $46   ; <F>
- D 3 - I - 0x03EADC 0F:8ACC: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03EADD 0F:8ACD: 54        .byte $54   ; <T>
- D 3 - I - 0x03EADE 0F:8ACE: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EADF 0F:8ACF: 22        .byte $22   ; 
- D 3 - I - 0x03EAE0 0F:8AD0: 16        .byte $16   ; 
- D 3 - I - 0x03EAE1 0F:8AD1: 00        .byte $00   ; 
- D 3 - I - 0x03EAE2 0F:8AD2: 00        .byte $00   ; 
- D 3 - I - 0x03EAE3 0F:8AD3: 00        .byte $00   ; 
- D 3 - I - 0x03EAE4 0F:8AD4: 00        .byte $00   ; 
- D 3 - I - 0x03EAE5 0F:8AD5: 95        .byte $95   ; 
- D 3 - I - 0x03EAE6 0F:8AD6: 00        .byte $00   ; 
- D 3 - I - 0x03EAE7 0F:8AD7: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03EAE8 0F:8AD8: 46        .byte $46   ; <F>
- D 3 - I - 0x03EAE9 0F:8AD9: 42        .byte $42   ; <B>
- D 3 - I - 0x03EAEA 0F:8ADA: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03EAEB 0F:8ADB: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EAEC 0F:8ADC: 22        .byte $22   ; 
- D 3 - I - 0x03EAED 0F:8ADD: 16        .byte $16   ; 
- D 3 - I - 0x03EAEE 0F:8ADE: 00        .byte $00   ; 
- D 3 - I - 0x03EAEF 0F:8ADF: 94        .byte $94   ; 
- D 3 - I - 0x03EAF0 0F:8AE0: FE        .byte $FE   ; 
- D 3 - I - 0x03EAF1 0F:8AE1: 03        .byte $03   ; 
- D 3 - I - 0x03EAF2 0F:8AE2: 0A        .byte $0A   ; 
- D 3 - I - 0x03EAF3 0F:8AE3: 06        .byte $06   ; 
- D 3 - I - 0x03EAF4 0F:8AE4: 15        .byte $15   ; 
- D 3 - I - 0x03EAF5 0F:8AE5: 02        .byte $02   ; 
- D 3 - I - 0x03EAF6 0F:8AE6: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EAF7 0F:8AE7: 22        .byte $22   ; 
- D 3 - I - 0x03EAF8 0F:8AE8: 16        .byte $16   ; 
- D 3 - I - 0x03EAF9 0F:8AE9: FE        .byte $FE   ; 
- D 3 - I - 0x03EAFA 0F:8AEA: 00        .byte $00   ; 
- D 3 - I - 0x03EAFB 0F:8AEB: 5C        .byte $5C   ; 
- D 3 - I - 0x03EAFC 0F:8AEC: 76        .byte $76   ; <v>
- D 3 - I - 0x03EAFD 0F:8AED: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03EAFE 0F:8AEE: 7D        .byte $7D   ; 
- D 3 - I - 0x03EAFF 0F:8AEF: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EB00 0F:8AF0: 22        .byte $22   ; 
- D 3 - I - 0x03EB01 0F:8AF1: 16        .byte $16   ; 
- D 3 - I - 0x03EB02 0F:8AF2: FE        .byte $FE   ; 
- D 3 - I - 0x03EB03 0F:8AF3: 00        .byte $00   ; 
- D 3 - I - 0x03EB04 0F:8AF4: 0E        .byte $0E   ; 
- D 3 - I - 0x03EB05 0F:8AF5: 28        .byte $28   ; 
- D 3 - I - 0x03EB06 0F:8AF6: 01        .byte $01   ; 
- D 3 - I - 0x03EB07 0F:8AF7: 03        .byte $03   ; 
- D 3 - I - 0x03EB08 0F:8AF8: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EB09 0F:8AF9: 22        .byte $22   ; 
- D 3 - I - 0x03EB0A 0F:8AFA: 16        .byte $16   ; 
- D 3 - I - 0x03EB0B 0F:8AFB: FE        .byte $FE   ; 
- D 3 - I - 0x03EB0C 0F:8AFC: 00        .byte $00   ; 
- D 3 - I - 0x03EB0D 0F:8AFD: 48        .byte $48   ; <H>
- D 3 - I - 0x03EB0E 0F:8AFE: 68        .byte $68   ; <h>
- D 3 - I - 0x03EB0F 0F:8AFF: 41        .byte $41   ; <A>
- D 3 - I - 0x03EB10 0F:8B00: 7D        .byte $7D   ; 
- D 3 - I - 0x03EB11 0F:8B01: AB        .byte $AB   ; 
- D 3 - I - 0x03EB12 0F:8B02: 22        .byte $22   ; 
- D 3 - I - 0x03EB13 0F:8B03: 1A        .byte $1A   ; 
- D 3 - I - 0x03EB14 0F:8B04: 00        .byte $00   ; 
- D 3 - I - 0x03EB15 0F:8B05: 95        .byte $95   ; 
- D 3 - I - 0x03EB16 0F:8B06: FE        .byte $FE   ; 
- D 3 - I - 0x03EB17 0F:8B07: 00        .byte $00   ; 
- D 3 - I - 0x03EB18 0F:8B08: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03EB19 0F:8B09: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EB1A 0F:8B0A: 51        .byte $51   ; <Q>
- D 3 - I - 0x03EB1B 0F:8B0B: 00        .byte $00   ; 
- D 3 - I - 0x03EB1C 0F:8B0C: 00        .byte $00   ; 
- D 3 - I - 0x03EB1D 0F:8B0D: AB        .byte $AB   ; 
- D 3 - I - 0x03EB1E 0F:8B0E: 22        .byte $22   ; 
- D 3 - I - 0x03EB1F 0F:8B0F: 1A        .byte $1A   ; 
- D 3 - I - 0x03EB20 0F:8B10: FE        .byte $FE   ; 
- D 3 - I - 0x03EB21 0F:8B11: 00        .byte $00   ; 
- D 3 - I - 0x03EB22 0F:8B12: 47        .byte $47   ; <G>
- D 3 - I - 0x03EB23 0F:8B13: 70        .byte $70   ; <p>
- D 3 - I - 0x03EB24 0F:8B14: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03EB25 0F:8B15: 51        .byte $51   ; <Q>
- D 3 - I - 0x03EB26 0F:8B16: 00        .byte $00   ; 
- D 3 - I - 0x03EB27 0F:8B17: AB        .byte $AB   ; 
- D 3 - I - 0x03EB28 0F:8B18: 22        .byte $22   ; 
- D 3 - I - 0x03EB29 0F:8B19: 1A        .byte $1A   ; 
- D 3 - I - 0x03EB2A 0F:8B1A: 00        .byte $00   ; 
- D 3 - I - 0x03EB2B 0F:8B1B: 00        .byte $00   ; 
- D 3 - I - 0x03EB2C 0F:8B1C: 00        .byte $00   ; 
- D 3 - I - 0x03EB2D 0F:8B1D: 00        .byte $00   ; 
- D 3 - I - 0x03EB2E 0F:8B1E: 00        .byte $00   ; 
- D 3 - I - 0x03EB2F 0F:8B1F: 94        .byte $94   ; 
- D 3 - I - 0x03EB30 0F:8B20: 0B        .byte $0B   ; 
- D 3 - I - 0x03EB31 0F:8B21: 2E        .byte $2E   ; 
- D 3 - I - 0x03EB32 0F:8B22: 06        .byte $06   ; 
- D 3 - I - 0x03EB33 0F:8B23: 08        .byte $08   ; 
- D 3 - I - 0x03EB34 0F:8B24: 14        .byte $14   ; 
- D 3 - I - 0x03EB35 0F:8B25: 1B        .byte $1B   ; 
- D 3 - I - 0x03EB36 0F:8B26: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EB37 0F:8B27: 22        .byte $22   ; 
- D 3 - I - 0x03EB38 0F:8B28: 16        .byte $16   ; 
- D 3 - I - 0x03EB39 0F:8B29: 00        .byte $00   ; 
- D 3 - I - 0x03EB3A 0F:8B2A: 00        .byte $00   ; 
- D 3 - I - 0x03EB3B 0F:8B2B: 94        .byte $94   ; 
- D 3 - I - 0x03EB3C 0F:8B2C: 94        .byte $94   ; 
- D 3 - I - 0x03EB3D 0F:8B2D: FE        .byte $FE   ; 
- D 3 - I - 0x03EB3E 0F:8B2E: 00        .byte $00   ; 
- D 3 - I - 0x03EB3F 0F:8B2F: 14        .byte $14   ; 
- D 3 - I - 0x03EB40 0F:8B30: 1B        .byte $1B   ; 
- D 3 - I - 0x03EB41 0F:8B31: 10        .byte $10   ; 
- D 3 - I - 0x03EB42 0F:8B32: 0D        .byte $0D   ; 
- D 3 - I - 0x03EB43 0F:8B33: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EB44 0F:8B34: 22        .byte $22   ; 
- D 3 - I - 0x03EB45 0F:8B35: 16        .byte $16   ; 
- D 3 - I - 0x03EB46 0F:8B36: 00        .byte $00   ; 
- D 3 - I - 0x03EB47 0F:8B37: 94        .byte $94   ; 
- D 3 - I - 0x03EB48 0F:8B38: FE        .byte $FE   ; 
- D 3 - I - 0x03EB49 0F:8B39: 20        .byte $20   ; 
- D 3 - I - 0x03EB4A 0F:8B3A: 06        .byte $06   ; 
- D 3 - I - 0x03EB4B 0F:8B3B: 1F        .byte $1F   ; 
- D 3 - I - 0x03EB4C 0F:8B3C: 04        .byte $04   ; 
- D 3 - I - 0x03EB4D 0F:8B3D: 29        .byte $29   ; 
- D 3 - I - 0x03EB4E 0F:8B3E: AB        .byte $AB   ; 
- D 3 - I - 0x03EB4F 0F:8B3F: 22        .byte $22   ; 
- D 3 - I - 0x03EB50 0F:8B40: 17        .byte $17   ; 
- D 3 - I - 0x03EB51 0F:8B41: FE        .byte $FE   ; 
- D 3 - I - 0x03EB52 0F:8B42: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03EB53 0F:8B43: 71        .byte $71   ; <q>
- D 3 - I - 0x03EB54 0F:8B44: 7D        .byte $7D   ; 
- D 3 - I - 0x03EB55 0F:8B45: 54        .byte $54   ; <T>
- D 3 - I - 0x03EB56 0F:8B46: 16        .byte $16   ; 
- D 3 - I - 0x03EB57 0F:8B47: 0F        .byte $0F   ; 
- D 3 - I - 0x03EB58 0F:8B48: 15        .byte $15   ; 
- D 3 - I - 0x03EB59 0F:8B49: 04        .byte $04   ; 
- D 3 - I - 0x03EB5A 0F:8B4A: 29        .byte $29   ; 
- D 3 - I - 0x03EB5B 0F:8B4B: 00        .byte $00   ; 
- D 3 - I - 0x03EB5C 0F:8B4C: AB        .byte $AB   ; 
- D 3 - I - 0x03EB5D 0F:8B4D: 22        .byte $22   ; 
- D 3 - I - 0x03EB5E 0F:8B4E: 17        .byte $17   ; 
- D 3 - I - 0x03EB5F 0F:8B4F: 94        .byte $94   ; 
- D 3 - I - 0x03EB60 0F:8B50: 00        .byte $00   ; 
- D 3 - I - 0x03EB61 0F:8B51: 94        .byte $94   ; 
- D 3 - I - 0x03EB62 0F:8B52: 00        .byte $00   ; 
- D 3 - I - 0x03EB63 0F:8B53: 00        .byte $00   ; 
- D 3 - I - 0x03EB64 0F:8B54: 54        .byte $54   ; <T>
- D 3 - I - 0x03EB65 0F:8B55: 68        .byte $68   ; <h>
- D 3 - I - 0x03EB66 0F:8B56: 5C        .byte $5C   ; 
- D 3 - I - 0x03EB67 0F:8B57: 69        .byte $69   ; <i>
- D 3 - I - 0x03EB68 0F:8B58: 16        .byte $16   ; 
- D 3 - I - 0x03EB69 0F:8B59: 0F        .byte $0F   ; 
- D 3 - I - 0x03EB6A 0F:8B5A: 15        .byte $15   ; 
- D 3 - I - 0x03EB6B 0F:8B5B: 04        .byte $04   ; 
- D 3 - I - 0x03EB6C 0F:8B5C: 29        .byte $29   ; 
- D 3 - I - 0x03EB6D 0F:8B5D: 00        .byte $00   ; 
- D 3 - I - 0x03EB6E 0F:8B5E: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EB6F 0F:8B5F: 22        .byte $22   ; 
- D 3 - I - 0x03EB70 0F:8B60: 16        .byte $16   ; 
- D 3 - I - 0x03EB71 0F:8B61: FE        .byte $FE   ; 
- D 3 - I - 0x03EB72 0F:8B62: 7D        .byte $7D   ; 
- D 3 - I - 0x03EB73 0F:8B63: 7D        .byte $7D   ; 
- D 3 - I - 0x03EB74 0F:8B64: 7D        .byte $7D   ; 
- D 3 - I - 0x03EB75 0F:8B65: 7D        .byte $7D   ; 
- D 3 - I - 0x03EB76 0F:8B66: 7D        .byte $7D   ; 
- D 3 - I - 0x03EB77 0F:8B67: AA        .byte $AA   ; 
- D 3 - I - 0x03EB78 0F:8B68: 22        .byte $22   ; 
- D 3 - I - 0x03EB79 0F:8B69: 16        .byte $16   ; 
- D 3 - I - 0x03EB7A 0F:8B6A: 00        .byte $00   ; 
- D 3 - I - 0x03EB7B 0F:8B6B: 94        .byte $94   ; 
- D 3 - I - 0x03EB7C 0F:8B6C: FE        .byte $FE   ; 
- D 3 - I - 0x03EB7D 0F:8B6D: 1B        .byte $1B   ; 
- D 3 - I - 0x03EB7E 0F:8B6E: 10        .byte $10   ; 
- D 3 - I - 0x03EB7F 0F:8B6F: 28        .byte $28   ; 
- D 3 - I - 0x03EB80 0F:8B70: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03EB81 0F:8B71: 60        .byte $60   ; 
- D 3 - I - 0x03EB82 0F:8B72: AA        .byte $AA   ; 
- D 3 - I - 0x03EB83 0F:8B73: 22        .byte $22   ; 
- D 3 - I - 0x03EB84 0F:8B74: 16        .byte $16   ; 
- D 3 - I - 0x03EB85 0F:8B75: FE        .byte $FE   ; 
- D 3 - I - 0x03EB86 0F:8B76: 0C        .byte $0C   ; 
- D 3 - I - 0x03EB87 0F:8B77: 32        .byte $32   ; <2>
- D 3 - I - 0x03EB88 0F:8B78: 03        .byte $03   ; 
- D 3 - I - 0x03EB89 0F:8B79: 22        .byte $22   ; 
- D 3 - I - 0x03EB8A 0F:8B7A: 2E        .byte $2E   ; 
- D 3 - I - 0x03EB8B 0F:8B7B: AA        .byte $AA   ; 
- D 3 - I - 0x03EB8C 0F:8B7C: 22        .byte $22   ; 
- D 3 - I - 0x03EB8D 0F:8B7D: 16        .byte $16   ; 
- D 3 - I - 0x03EB8E 0F:8B7E: 00        .byte $00   ; 
- D 3 - I - 0x03EB8F 0F:8B7F: 94        .byte $94   ; 
- D 3 - I - 0x03EB90 0F:8B80: FE        .byte $FE   ; 
- D 3 - I - 0x03EB91 0F:8B81: 20        .byte $20   ; 
- D 3 - I - 0x03EB92 0F:8B82: 07        .byte $07   ; 
- D 3 - I - 0x03EB93 0F:8B83: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03EB94 0F:8B84: 60        .byte $60   ; 
- D 3 - I - 0x03EB95 0F:8B85: 00        .byte $00   ; 
C D 3 - - - 0x03EB96 0F:8B86: A9 01     LDA #$01
C - - - - - 0x03EB98 0F:8B88: 20 0F CB  JSR $CB0F
C - - - - - 0x03EB9B 0F:8B8B: A5 21     LDA ram_0021
C - - - - - 0x03EB9D 0F:8B8D: 29 1E     AND #$1E
C - - - - - 0x03EB9F 0F:8B8F: AE 39 05  LDX ram_0539
C - - - - - 0x03EBA2 0F:8B92: F0 05     BEQ $8B99
C - - - - - 0x03EBA4 0F:8B94: A5 21     LDA ram_0021
C - - - - - 0x03EBA6 0F:8B96: 4D 39 05  EOR ram_0539
C - - - - - 0x03EBA9 0F:8B99: 85 21     STA ram_0021
C - - - - - 0x03EBAB 0F:8B9B: 20 08 EC  JSR $EC08
C - - - - - 0x03EBAE 0F:8B9E: 20 85 ED  JSR $ED85
C - - - - - 0x03EBB1 0F:8BA1: 48        PHA
C - - - - - 0x03EBB2 0F:8BA2: A5 22     LDA ram_0022
C - - - - - 0x03EBB4 0F:8BA4: A9 18     LDA #$18
C - - - - - 0x03EBB6 0F:8BA6: 85 24     STA ram_0024
C - - - - - 0x03EBB8 0F:8BA8: A9 19     LDA #$19
C - - - - - 0x03EBBA 0F:8BAA: 85 25     STA ram_0025
C - - - - - 0x03EBBC 0F:8BAC: 20 2D CE  JSR $CE2D
C - - - - - 0x03EBBF 0F:8BAF: 68        PLA
C - - - - - 0x03EBC0 0F:8BB0: 20 03 80  JSR $8003
C - - - - - 0x03EBC3 0F:8BB3: 48        PHA
C - - - - - 0x03EBC4 0F:8BB4: A5 22     LDA ram_0022
C - - - - - 0x03EBC6 0F:8BB6: A9 18     LDA #$18
C - - - - - 0x03EBC8 0F:8BB8: 85 24     STA ram_0024
C - - - - - 0x03EBCA 0F:8BBA: A9 19     LDA #$19
C - - - - - 0x03EBCC 0F:8BBC: 85 25     STA ram_0025
C - - - - - 0x03EBCE 0F:8BBE: 20 2D CE  JSR $CE2D
C - - - - - 0x03EBD1 0F:8BC1: 68        PLA
C - - - - - 0x03EBD2 0F:8BC2: 20 06 80  JSR $8006
C - - - - - 0x03EBD5 0F:8BC5: 48        PHA
C - - - - - 0x03EBD6 0F:8BC6: A5 22     LDA ram_0022
C - - - - - 0x03EBD8 0F:8BC8: A9 18     LDA #$18
C - - - - - 0x03EBDA 0F:8BCA: 85 24     STA ram_0024
C - - - - - 0x03EBDC 0F:8BCC: A9 19     LDA #$19
C - - - - - 0x03EBDE 0F:8BCE: 85 25     STA ram_0025
C - - - - - 0x03EBE0 0F:8BD0: 20 2D CE  JSR $CE2D
C - - - - - 0x03EBE3 0F:8BD3: 68        PLA
C - - - - - 0x03EBE4 0F:8BD4: 20 09 80  JSR $8009
C - - - - - 0x03EBE7 0F:8BD7: AD 2E 05  LDA ram_052E
C - - - - - 0x03EBEA 0F:8BDA: F0 29     BEQ $8C05
C - - - - - 0x03EBEC 0F:8BDC: CE 2E 05  DEC ram_052E
C - - - - - 0x03EBEF 0F:8BDF: D0 24     BNE $8C05
C - - - - - 0x03EBF1 0F:8BE1: AD 2F 05  LDA ram_052F
C - - - - - 0x03EBF4 0F:8BE4: C9 7E     CMP #$7E
C - - - - - 0x03EBF6 0F:8BE6: 90 11     BCC $8BF9
C - - - - - 0x03EBF8 0F:8BE8: C9 7F     CMP #$7F
C - - - - - 0x03EBFA 0F:8BEA: F0 07     BEQ $8BF3
C - - - - - 0x03EBFC 0F:8BEC: AD 27 00  LDA a: ram_0027
C - - - - - 0x03EBFF 0F:8BEF: C9 04     CMP #$04
C - - - - - 0x03EC01 0F:8BF1: F0 12     BEQ $8C05
C - - - - - 0x03EC03 0F:8BF3: 20 93 D0  JSR $D093
C - - - - - 0x03EC06 0F:8BF6: 4C 05 EC  JMP $EC05
C - - - - - 0x03EC09 0F:8BF9: 2C 3F 06  BIT ram_063F
C - - - - - 0x03EC0C 0F:8BFC: 10 04     BPL $8C02
C - - - - - 0x03EC0E 0F:8BFE: C9 63     CMP #$63
C - - - - - 0x03EC10 0F:8C00: D0 03     BNE $8C05
C - - - - - 0x03EC12 0F:8C02: 20 F1 CB  JSR $CBF1
C D 3 - - - 0x03EC15 0F:8C05: 4C 86 EB  JMP $EB86
C - - - - - 0x03EC18 0F:8C08: AD 16 05  LDA ram_0516
C - - - - - 0x03EC1B 0F:8C0B: 29 81     AND #$81
C - - - - - 0x03EC1D 0F:8C0D: D0 01     BNE $8C10
C - - - - - 0x03EC1F 0F:8C0F: 60        RTS
C - - - - - 0x03EC20 0F:8C10: 2C 16 05  BIT ram_0516
C - - - - - 0x03EC23 0F:8C13: 10 1F     BPL $8C34
C - - - - - 0x03EC25 0F:8C15: A9 01     LDA #$01
C - - - - - 0x03EC27 0F:8C17: 8D 16 05  STA ram_0516
C - - - - - 0x03EC2A 0F:8C1A: 48        PHA
C - - - - - 0x03EC2B 0F:8C1B: A5 22     LDA ram_0022
C - - - - - 0x03EC2D 0F:8C1D: A9 10     LDA #$10
C - - - - - 0x03EC2F 0F:8C1F: 85 24     STA ram_0024
C - - - - - 0x03EC31 0F:8C21: A9 11     LDA #$11
C - - - - - 0x03EC33 0F:8C23: 85 25     STA ram_0025
C - - - - - 0x03EC35 0F:8C25: 20 2D CE  JSR $CE2D
C - - - - - 0x03EC38 0F:8C28: 68        PLA
C - - - - - 0x03EC39 0F:8C29: 20 00 80  JSR $8000
C - - - - - 0x03EC3C 0F:8C2C: A9 00     LDA #$00
C - - - - - 0x03EC3E 0F:8C2E: 8D 22 05  STA ram_0522
C - - - - - 0x03EC41 0F:8C31: 8D 39 05  STA ram_0539
C - - - - - 0x03EC44 0F:8C34: AE 19 05  LDX ram_0519
C - - - - - 0x03EC47 0F:8C37: F0 03     BEQ $8C3C
C - - - - - 0x03EC49 0F:8C39: 4C 5B ED  JMP $ED5B
C - - - - - 0x03EC4C 0F:8C3C: A9 00     LDA #$00
C - - - - - 0x03EC4E 0F:8C3E: 8D 32 05  STA ram_0532
C - - - - - 0x03EC51 0F:8C41: 8D 34 05  STA ram_0534
C - - - - - 0x03EC54 0F:8C44: 8D 36 05  STA ram_0536
C - - - - - 0x03EC57 0F:8C47: 8D 38 05  STA ram_0538
C - - - - - 0x03EC5A 0F:8C4A: 8D 39 05  STA ram_0539
C - - - - - 0x03EC5D 0F:8C4D: A9 08     LDA #$08
C - - - - - 0x03EC5F 0F:8C4F: 2C 16 05  BIT ram_0516
C - - - - - 0x03EC62 0F:8C52: D0 21     BNE $8C75
C - - - - - 0x03EC64 0F:8C54: AD 16 05  LDA ram_0516
C - - - - - 0x03EC67 0F:8C57: 29 50     AND #$50
C - - - - - 0x03EC69 0F:8C59: C9 50     CMP #$50
C - - - - - 0x03EC6B 0F:8C5B: F0 2F     BEQ $8C8C
C - - - - - 0x03EC6D 0F:8C5D: 2C 16 05  BIT ram_0516
C - - - - - 0x03EC70 0F:8C60: 70 12     BVS $8C74
C - - - - - 0x03EC72 0F:8C62: 48        PHA
C - - - - - 0x03EC73 0F:8C63: A5 22     LDA ram_0022
C - - - - - 0x03EC75 0F:8C65: A9 10     LDA #$10
C - - - - - 0x03EC77 0F:8C67: 85 24     STA ram_0024
C - - - - - 0x03EC79 0F:8C69: A9 11     LDA #$11
C - - - - - 0x03EC7B 0F:8C6B: 85 25     STA ram_0025
C - - - - - 0x03EC7D 0F:8C6D: 20 2D CE  JSR $CE2D
C - - - - - 0x03EC80 0F:8C70: 68        PLA
C - - - - - 0x03EC81 0F:8C71: 20 03 80  JSR $8003
C - - - - - 0x03EC84 0F:8C74: 60        RTS
C - - - - - 0x03EC85 0F:8C75: 4D 16 05  EOR ram_0516
C - - - - - 0x03EC88 0F:8C78: 8D 16 05  STA ram_0516
C - - - - - 0x03EC8B 0F:8C7B: A9 00     LDA #$00
C - - - - - 0x03EC8D 0F:8C7D: 8D D2 05  STA ram_05D2
C - - - - - 0x03EC90 0F:8C80: A9 00     LDA #$00
C - - - - - 0x03EC92 0F:8C82: 85 0D     STA ram_000D
C - - - - - 0x03EC94 0F:8C84: 85 0E     STA ram_000E
C - - - - - 0x03EC96 0F:8C86: A9 00     LDA #$00
C - - - - - 0x03EC98 0F:8C88: 8D 16 05  STA ram_0516
C - - - - - 0x03EC9B 0F:8C8B: 60        RTS
C - - - - - 0x03EC9C 0F:8C8C: AD 16 05  LDA ram_0516
C - - - - - 0x03EC9F 0F:8C8F: 29 8F     AND #$8F
C - - - - - 0x03ECA1 0F:8C91: 8D 16 05  STA ram_0516
C - - - - - 0x03ECA4 0F:8C94: AD 23 05  LDA ram_0523
C - - - - - 0x03ECA7 0F:8C97: 8D 19 05  STA ram_0519
C - - - - - 0x03ECAA 0F:8C9A: AD 24 05  LDA ram_0524
C - - - - - 0x03ECAD 0F:8C9D: C9 FF     CMP #$FF
C - - - - - 0x03ECAF 0F:8C9F: F0 56     BEQ $8CF7
C - - - - - 0x03ECB1 0F:8CA1: A9 04     LDA #$04
C - - - - - 0x03ECB3 0F:8CA3: 2C 16 05  BIT ram_0516
C - - - - - 0x03ECB6 0F:8CA6: F0 0F     BEQ $8CB7
C - - - - - 0x03ECB8 0F:8CA8: 4D 16 05  EOR ram_0516
C - - - - - 0x03ECBB 0F:8CAB: 8D 16 05  STA ram_0516
C - - - - - 0x03ECBE 0F:8CAE: A9 00     LDA #$00
C - - - - - 0x03ECC0 0F:8CB0: 85 11     STA ram_0011
C - - - - - 0x03ECC2 0F:8CB2: 85 12     STA ram_0012
C - - - - - 0x03ECC4 0F:8CB4: 20 46 CC  JSR $CC46
C - - - - - 0x03ECC7 0F:8CB7: AD 26 05  LDA ram_0526
C - - - - - 0x03ECCA 0F:8CBA: 10 0E     BPL $8CCA
C - - - - - 0x03ECCC 0F:8CBC: 29 7F     AND #$7F
C - - - - - 0x03ECCE 0F:8CBE: 8D 26 05  STA ram_0526
C - - - - - 0x03ECD1 0F:8CC1: 8D 90 04  STA ram_0490
C - - - - - 0x03ECD4 0F:8CC4: AD 27 05  LDA ram_0527
C - - - - - 0x03ECD7 0F:8CC7: 8D 91 04  STA ram_0491
C - - - - - 0x03ECDA 0F:8CCA: AD 25 05  LDA ram_0525
C - - - - - 0x03ECDD 0F:8CCD: A2 00     LDX #$00
C - - - - - 0x03ECDF 0F:8CCF: 20 02 CC  JSR $CC02
C - - - - - 0x03ECE2 0F:8CD2: 20 D2 CC  JSR $CCD2
- D 3 - I - 0x03ECE5 0F:8CD5: 00        .byte $00   ; 
- D 3 - I - 0x03ECE6 0F:8CD6: 6C        .byte $6C   ; <l>
- D 3 - I - 0x03ECE7 0F:8CD7: 04        .byte $04   ; 
C - - - - - 0x03ECE8 0F:8CD8: AD CE 05  LDA ram_05CE
C - - - - - 0x03ECEB 0F:8CDB: 48        PHA
C - - - - - 0x03ECEC 0F:8CDC: A5 22     LDA ram_0022
C - - - - - 0x03ECEE 0F:8CDE: A9 0B     LDA #$0B
C - - - - - 0x03ECF0 0F:8CE0: 85 24     STA ram_0024
C - - - - - 0x03ECF2 0F:8CE2: A9 0C     LDA #$0C
C - - - - - 0x03ECF4 0F:8CE4: 85 25     STA ram_0025
C - - - - - 0x03ECF6 0F:8CE6: 20 2D CE  JSR $CE2D
C - - - - - 0x03ECF9 0F:8CE9: 68        PLA
C - - - - - 0x03ECFA 0F:8CEA: 20 06 80  JSR $8006
C - - - - - 0x03ECFD 0F:8CED: A9 00     LDA #$00
C - - - - - 0x03ECFF 0F:8CEF: 85 4A     STA ram_004A
C - - - - - 0x03ED01 0F:8CF1: AD D1 05  LDA ram_05D1
C - - - - - 0x03ED04 0F:8CF4: 8D D2 05  STA ram_05D2
C - - - - - 0x03ED07 0F:8CF7: AD 28 05  LDA ram_0528
C - - - - - 0x03ED0A 0F:8CFA: C9 FF     CMP #$FF
C - - - - - 0x03ED0C 0F:8CFC: F0 08     BEQ $8D06
C - - - - - 0x03ED0E 0F:8CFE: 8D 3C 05  STA ram_053C
C - - - - - 0x03ED11 0F:8D01: A9 80     LDA #$80
C - - - - - 0x03ED13 0F:8D03: 8D 3A 05  STA ram_053A
C - - - - - 0x03ED16 0F:8D06: A9 00     LDA #$00
C - - - - - 0x03ED18 0F:8D08: 85 0D     STA ram_000D
C - - - - - 0x03ED1A 0F:8D0A: 85 0E     STA ram_000E
C - - - - - 0x03ED1C 0F:8D0C: AD 2A 05  LDA ram_052A
C - - - - - 0x03ED1F 0F:8D0F: 8D 17 05  STA ram_0517
C - - - - - 0x03ED22 0F:8D12: AD 29 05  LDA ram_0529
C - - - - - 0x03ED25 0F:8D15: C9 FF     CMP #$FF
C - - - - - 0x03ED27 0F:8D17: F0 14     BEQ $8D2D
C - - - - - 0x03ED29 0F:8D19: 8D EA 05  STA ram_05EA
C - - - - - 0x03ED2C 0F:8D1C: A2 11     LDX #$11
C - - - - - 0x03ED2E 0F:8D1E: A9 C8     LDA #$C8
C - - - - - 0x03ED30 0F:8D20: 95 01     STA ram_0001,X
C - - - - - 0x03ED32 0F:8D22: A9 18     LDA #$18
C - - - - - 0x03ED34 0F:8D24: 95 02     STA ram_0002,X
C - - - - - 0x03ED36 0F:8D26: A9 7F     LDA #$7F
C - - - - - 0x03ED38 0F:8D28: A0 FF     LDY #$FF
C - - - - - 0x03ED3A 0F:8D2A: 20 E7 CA  JSR $CAE7
C - - - - - 0x03ED3D 0F:8D2D: AD 2B 05  LDA ram_052B
C - - - - - 0x03ED40 0F:8D30: 09 80     ORA #$80
C - - - - - 0x03ED42 0F:8D32: 8D 32 05  STA ram_0532
C - - - - - 0x03ED45 0F:8D35: AD 2C 05  LDA ram_052C
C - - - - - 0x03ED48 0F:8D38: 09 80     ORA #$80
C - - - - - 0x03ED4A 0F:8D3A: 8D 36 05  STA ram_0536
C - - - - - 0x03ED4D 0F:8D3D: AD 2D 05  LDA ram_052D
C - - - - - 0x03ED50 0F:8D40: 09 80     ORA #$80
C - - - - - 0x03ED52 0F:8D42: 8D 34 05  STA ram_0534
C - - - - - 0x03ED55 0F:8D45: AD 30 05  LDA ram_0530
C - - - - - 0x03ED58 0F:8D48: 8D 2E 05  STA ram_052E
C - - - - - 0x03ED5B 0F:8D4B: AD 31 05  LDA ram_0531
C - - - - - 0x03ED5E 0F:8D4E: 8D 2F 05  STA ram_052F
C - - - - - 0x03ED61 0F:8D51: A9 00     LDA #$00
C - - - - - 0x03ED63 0F:8D53: 85 8E     STA ram_008E
C - - - - - 0x03ED65 0F:8D55: A9 01     LDA #$01
C - - - - - 0x03ED67 0F:8D57: 8D 69 04  STA ram_0469
C - - - - - 0x03ED6A 0F:8D5A: 60        RTS
C D 3 - - - 0x03ED6B 0F:8D5B: CA        DEX
C - - - - - 0x03ED6C 0F:8D5C: 8E 19 05  STX ram_0519
C - - - - - 0x03ED6F 0F:8D5F: E0 28     CPX #$28
C - - - - - 0x03ED71 0F:8D61: B0 21     BCS $8D84
C - - - - - 0x03ED73 0F:8D63: AD 16 05  LDA ram_0516
C - - - - - 0x03ED76 0F:8D66: 29 20     AND #$20
C - - - - - 0x03ED78 0F:8D68: D0 1A     BNE $8D84
C - - - - - 0x03ED7A 0F:8D6A: AD 16 05  LDA ram_0516
C - - - - - 0x03ED7D 0F:8D6D: 09 20     ORA #$20
C - - - - - 0x03ED7F 0F:8D6F: 8D 16 05  STA ram_0516
C - - - - - 0x03ED82 0F:8D72: 48        PHA
C - - - - - 0x03ED83 0F:8D73: A5 22     LDA ram_0022
C - - - - - 0x03ED85 0F:8D75: A9 10     LDA #$10
C - - - - - 0x03ED87 0F:8D77: 85 24     STA ram_0024
C - - - - - 0x03ED89 0F:8D79: A9 11     LDA #$11
C - - - - - 0x03ED8B 0F:8D7B: 85 25     STA ram_0025
C - - - - - 0x03ED8D 0F:8D7D: 20 2D CE  JSR $CE2D
C - - - - - 0x03ED90 0F:8D80: 68        PLA
C - - - - - 0x03ED91 0F:8D81: 20 03 80  JSR $8003
C - - - - - 0x03ED94 0F:8D84: 60        RTS
C - - - - - 0x03ED95 0F:8D85: AD D2 05  LDA ram_05D2
C - - - - - 0x03ED98 0F:8D88: D0 01     BNE $8D8B
C - - - - - 0x03ED9A 0F:8D8A: 60        RTS
C - - - - - 0x03ED9B 0F:8D8B: 10 68     BPL $8DF5
C - - - - - 0x03ED9D 0F:8D8D: 29 7F     AND #$7F
C - - - - - 0x03ED9F 0F:8D8F: 09 01     ORA #$01
C - - - - - 0x03EDA1 0F:8D91: 8D D2 05  STA ram_05D2
C - - - - - 0x03EDA4 0F:8D94: AD DB 05  LDA ram_05DB
C - - - - - 0x03EDA7 0F:8D97: 8D D3 05  STA ram_05D3
C - - - - - 0x03EDAA 0F:8D9A: AD DC 05  LDA ram_05DC
C - - - - - 0x03EDAD 0F:8D9D: 8D D4 05  STA ram_05D4
C - - - - - 0x03EDB0 0F:8DA0: AD DD 05  LDA ram_05DD
C - - - - - 0x03EDB3 0F:8DA3: 8D D5 05  STA ram_05D5
C - - - - - 0x03EDB6 0F:8DA6: AE DE 05  LDX ram_05DE
C - - - - - 0x03EDB9 0F:8DA9: AC DF 05  LDY ram_05DF
C - - - - - 0x03EDBC 0F:8DAC: 8E D6 05  STX ram_05D6
C - - - - - 0x03EDBF 0F:8DAF: 8C D7 05  STY ram_05D7
C - - - - - 0x03EDC2 0F:8DB2: AD E0 05  LDA ram_05E0
C - - - - - 0x03EDC5 0F:8DB5: 8D D8 05  STA ram_05D8
C - - - - - 0x03EDC8 0F:8DB8: AD E1 05  LDA ram_05E1
C - - - - - 0x03EDCB 0F:8DBB: 8D D9 05  STA ram_05D9
C - - - - - 0x03EDCE 0F:8DBE: AD E2 05  LDA ram_05E2
C - - - - - 0x03EDD1 0F:8DC1: 8D DA 05  STA ram_05DA
C - - - - - 0x03EDD4 0F:8DC4: AD D2 05  LDA ram_05D2
C - - - - - 0x03EDD7 0F:8DC7: 29 02     AND #$02
C - - - - - 0x03EDD9 0F:8DC9: F0 2A     BEQ $8DF5
C - - - - - 0x03EDDB 0F:8DCB: 2C D2 05  BIT ram_05D2
C - - - - - 0x03EDDE 0F:8DCE: 50 14     BVC $8DE4
C - - - - - 0x03EDE0 0F:8DD0: A2 0D     LDX #$0D
C - - - - - 0x03EDE2 0F:8DD2: A9 A0     LDA #$A0
C - - - - - 0x03EDE4 0F:8DD4: 95 01     STA ram_0001,X
C - - - - - 0x03EDE6 0F:8DD6: A9 0B     LDA #$0B
C - - - - - 0x03EDE8 0F:8DD8: 95 02     STA ram_0002,X
C - - - - - 0x03EDEA 0F:8DDA: A9 7F     LDA #$7F
C - - - - - 0x03EDEC 0F:8DDC: A0 FF     LDY #$FF
C - - - - - 0x03EDEE 0F:8DDE: 20 E7 CA  JSR $CAE7
C - - - - - 0x03EDF1 0F:8DE1: 4C F5 ED  JMP $EDF5
C - - - - - 0x03EDF4 0F:8DE4: A2 0D     LDX #$0D
C - - - - - 0x03EDF6 0F:8DE6: A9 A0     LDA #$A0
C - - - - - 0x03EDF8 0F:8DE8: 95 01     STA ram_0001,X
C - - - - - 0x03EDFA 0F:8DEA: A9 0B     LDA #$0B
C - - - - - 0x03EDFC 0F:8DEC: 95 02     STA ram_0002,X
C - - - - - 0x03EDFE 0F:8DEE: A9 80     LDA #$80
C - - - - - 0x03EE00 0F:8DF0: A0 02     LDY #$02
C - - - - - 0x03EE02 0F:8DF2: 20 E7 CA  JSR $CAE7
C D 3 - - - 0x03EE05 0F:8DF5: 2C D2 05  BIT ram_05D2
C - - - - - 0x03EE08 0F:8DF8: 50 37     BVC $8E31
C - - - - - 0x03EE0A 0F:8DFA: 18        CLC
C - - - - - 0x03EE0B 0F:8DFB: AD D6 05  LDA ram_05D6
C - - - - - 0x03EE0E 0F:8DFE: 6D D3 05  ADC ram_05D3
C - - - - - 0x03EE11 0F:8E01: 8D D3 05  STA ram_05D3
C - - - - - 0x03EE14 0F:8E04: A2 00     LDX #$00
C - - - - - 0x03EE16 0F:8E06: AD D7 05  LDA ram_05D7
C - - - - - 0x03EE19 0F:8E09: 65 4B     ADC ram_004B
C - - - - - 0x03EE1B 0F:8E0B: 85 4B     STA ram_004B
C - - - - - 0x03EE1D 0F:8E0D: C9 F0     CMP #$F0
C - - - - - 0x03EE1F 0F:8E0F: 90 0F     BCC $8E20
C - - - - - 0x03EE21 0F:8E11: E8        INX
C - - - - - 0x03EE22 0F:8E12: A9 10     LDA #$10
C - - - - - 0x03EE24 0F:8E14: 2C D7 05  BIT ram_05D7
C - - - - - 0x03EE27 0F:8E17: 10 04     BPL $8E1D
C - - - - - 0x03EE29 0F:8E19: A9 F0     LDA #$F0
C - - - - - 0x03EE2B 0F:8E1B: CA        DEX
C - - - - - 0x03EE2C 0F:8E1C: CA        DEX
C - - - - - 0x03EE2D 0F:8E1D: 18        CLC
C - - - - - 0x03EE2E 0F:8E1E: 65 4B     ADC ram_004B
C - - - - - 0x03EE30 0F:8E20: 85 4B     STA ram_004B
C - - - - - 0x03EE32 0F:8E22: 8D D4 05  STA ram_05D4
C - - - - - 0x03EE35 0F:8E25: 18        CLC
C - - - - - 0x03EE36 0F:8E26: 8A        TXA
C - - - - - 0x03EE37 0F:8E27: 6D D5 05  ADC ram_05D5
C - - - - - 0x03EE3A 0F:8E2A: 8D D5 05  STA ram_05D5
C - - - - - 0x03EE3D 0F:8E2D: 20 6D EE  JSR $EE6D
C - - - - - 0x03EE40 0F:8E30: 60        RTS
C - - - - - 0x03EE41 0F:8E31: A5 20     LDA ram_0020
C - - - - - 0x03EE43 0F:8E33: 29 FE     AND #$FE
C - - - - - 0x03EE45 0F:8E35: 85 20     STA ram_0020
C - - - - - 0x03EE47 0F:8E37: 18        CLC
C - - - - - 0x03EE48 0F:8E38: AD D6 05  LDA ram_05D6
C - - - - - 0x03EE4B 0F:8E3B: 6D D3 05  ADC ram_05D3
C - - - - - 0x03EE4E 0F:8E3E: 8D D3 05  STA ram_05D3
C - - - - - 0x03EE51 0F:8E41: AD D7 05  LDA ram_05D7
C - - - - - 0x03EE54 0F:8E44: 6D D4 05  ADC ram_05D4
C - - - - - 0x03EE57 0F:8E47: 8D D4 05  STA ram_05D4
C - - - - - 0x03EE5A 0F:8E4A: 85 4A     STA ram_004A
C - - - - - 0x03EE5C 0F:8E4C: AA        TAX
C - - - - - 0x03EE5D 0F:8E4D: A9 00     LDA #$00
C - - - - - 0x03EE5F 0F:8E4F: 2C D7 05  BIT ram_05D7
C - - - - - 0x03EE62 0F:8E52: 10 02     BPL $8E56
C - - - - - 0x03EE64 0F:8E54: A9 FF     LDA #$FF
C - - - - - 0x03EE66 0F:8E56: 08        PHP
C - - - - - 0x03EE67 0F:8E57: AA        TAX
C - - - - - 0x03EE68 0F:8E58: 6D D5 05  ADC ram_05D5
C - - - - - 0x03EE6B 0F:8E5B: 8D D5 05  STA ram_05D5
C - - - - - 0x03EE6E 0F:8E5E: 29 01     AND #$01
C - - - - - 0x03EE70 0F:8E60: 05 20     ORA ram_0020
C - - - - - 0x03EE72 0F:8E62: 85 20     STA ram_0020
C - - - - - 0x03EE74 0F:8E64: 8A        TXA
C - - - - - 0x03EE75 0F:8E65: 28        PLP
C - - - - - 0x03EE76 0F:8E66: 69 00     ADC #$00
C - - - - - 0x03EE78 0F:8E68: AA        TAX
C - - - - - 0x03EE79 0F:8E69: 20 6D EE  JSR $EE6D
C - - - - - 0x03EE7C 0F:8E6C: 60        RTS
C - - - - - 0x03EE7D 0F:8E6D: AD D2 05  LDA ram_05D2
C - - - - - 0x03EE80 0F:8E70: 29 02     AND #$02
C - - - - - 0x03EE82 0F:8E72: F0 2A     BEQ $8E9E
C - - - - - 0x03EE84 0F:8E74: AE D4 05  LDX ram_05D4
C - - - - - 0x03EE87 0F:8E77: AC D5 05  LDY ram_05D5
C - - - - - 0x03EE8A 0F:8E7A: 10 0C     BPL $8E88
C - - - - - 0x03EE8C 0F:8E7C: 8A        TXA
C - - - - - 0x03EE8D 0F:8E7D: 49 FF     EOR #$FF
C - - - - - 0x03EE8F 0F:8E7F: AA        TAX
C - - - - - 0x03EE90 0F:8E80: 98        TYA
C - - - - - 0x03EE91 0F:8E81: 49 FF     EOR #$FF
C - - - - - 0x03EE93 0F:8E83: A8        TAY
C - - - - - 0x03EE94 0F:8E84: E8        INX
C - - - - - 0x03EE95 0F:8E85: D0 01     BNE $8E88
C - - - - - 0x03EE97 0F:8E87: C8        INY
C - - - - - 0x03EE98 0F:8E88: 8A        TXA
C - - - - - 0x03EE99 0F:8E89: 38        SEC
C - - - - - 0x03EE9A 0F:8E8A: ED D9 05  SBC ram_05D9
C - - - - - 0x03EE9D 0F:8E8D: 98        TYA
C - - - - - 0x03EE9E 0F:8E8E: ED DA 05  SBC ram_05DA
C - - - - - 0x03EEA1 0F:8E91: 90 0B     BCC $8E9E
C - - - - - 0x03EEA3 0F:8E93: A9 00     LDA #$00
C - - - - - 0x03EEA5 0F:8E95: 8D D2 05  STA ram_05D2
C - - - - - 0x03EEA8 0F:8E98: A9 00     LDA #$00
C - - - - - 0x03EEAA 0F:8E9A: 85 0D     STA ram_000D
C - - - - - 0x03EEAC 0F:8E9C: 85 0E     STA ram_000E
C - - - - - 0x03EEAE 0F:8E9E: 60        RTS
C - - - - - 0x03EEAF 0F:8E9F: 48        PHA
C - - - - - 0x03EEB0 0F:8EA0: A5 22     LDA ram_0022
C - - - - - 0x03EEB2 0F:8EA2: A9 14     LDA #$14
C - - - - - 0x03EEB4 0F:8EA4: 85 24     STA ram_0024
C - - - - - 0x03EEB6 0F:8EA6: A9 15     LDA #$15
C - - - - - 0x03EEB8 0F:8EA8: 85 25     STA ram_0025
C - - - - - 0x03EEBA 0F:8EAA: 20 2D CE  JSR $CE2D
C - - - - - 0x03EEBD 0F:8EAD: 68        PLA
C - - - - - 0x03EEBE 0F:8EAE: 20 00 80  JSR $8000
C - - - - - 0x03EEC1 0F:8EB1: A9 00     LDA #$00
C - - - - - 0x03EEC3 0F:8EB3: 85 3A     STA ram_003A
C - - - - - 0x03EEC5 0F:8EB5: 85 48     STA ram_0048
C - - - - - 0x03EEC7 0F:8EB7: AE 3D 05  LDX ram_053D
C - - - - - 0x03EECA 0F:8EBA: F0 1E     BEQ $8EDA
- - - - - - 0x03EECC 0F:8EBC: A9        .byte $A9   ; 
- - - - - - 0x03EECD 0F:8EBD: 40        .byte $40   ; 
- - - - - - 0x03EECE 0F:8EBE: 38        .byte $38   ; <8>
- - - - - - 0x03EECF 0F:8EBF: ED        .byte $ED   ; 
- - - - - - 0x03EED0 0F:8EC0: 3F        .byte $3F   ; 
- - - - - - 0x03EED1 0F:8EC1: 05        .byte $05   ; 
- - - - - - 0x03EED2 0F:8EC2: CD        .byte $CD   ; 
- - - - - - 0x03EED3 0F:8EC3: 3E        .byte $3E   ; 
- - - - - - 0x03EED4 0F:8EC4: 05        .byte $05   ; 
- - - - - - 0x03EED5 0F:8EC5: AD        .byte $AD   ; 
- - - - - - 0x03EED6 0F:8EC6: 3E        .byte $3E   ; 
- - - - - - 0x03EED7 0F:8EC7: 05        .byte $05   ; 
- - - - - - 0x03EED8 0F:8EC8: B0        .byte $B0   ; 
- - - - - - 0x03EED9 0F:8EC9: 02        .byte $02   ; 
- - - - - - 0x03EEDA 0F:8ECA: A9        .byte $A9   ; 
- - - - - - 0x03EEDB 0F:8ECB: 00        .byte $00   ; 
- - - - - - 0x03EEDC 0F:8ECC: AA        .byte $AA   ; 
- - - - - - 0x03EEDD 0F:8ECD: 18        .byte $18   ; 
- - - - - - 0x03EEDE 0F:8ECE: 69        .byte $69   ; <i>
- - - - - - 0x03EEDF 0F:8ECF: 08        .byte $08   ; 
- - - - - - 0x03EEE0 0F:8ED0: 8D        .byte $8D   ; 
- - - - - - 0x03EEE1 0F:8ED1: 3E        .byte $3E   ; 
- - - - - - 0x03EEE2 0F:8ED2: 05        .byte $05   ; 
- - - - - - 0x03EEE3 0F:8ED3: 8A        .byte $8A   ; 
- - - - - - 0x03EEE4 0F:8ED4: 18        .byte $18   ; 
- - - - - - 0x03EEE5 0F:8ED5: 6D        .byte $6D   ; <m>
- - - - - - 0x03EEE6 0F:8ED6: 3F        .byte $3F   ; 
- - - - - - 0x03EEE7 0F:8ED7: 05        .byte $05   ; 
- - - - - - 0x03EEE8 0F:8ED8: 0A        .byte $0A   ; 
- - - - - - 0x03EEE9 0F:8ED9: 0A        .byte $0A   ; 
C - - - - - 0x03EEEA 0F:8EDA: 85 3B     STA ram_003B
C - - - - - 0x03EEEC 0F:8EDC: A5 3A     LDA ram_003A
C - - - - - 0x03EEEE 0F:8EDE: 4A        LSR
C - - - - - 0x03EEEF 0F:8EDF: AA        TAX
C - - - - - 0x03EEF0 0F:8EE0: BD 43 05  LDA ram_0543,X
C - - - - - 0x03EEF3 0F:8EE3: B0 04     BCS $8EE9
C - - - - - 0x03EEF5 0F:8EE5: 4A        LSR
C - - - - - 0x03EEF6 0F:8EE6: 4A        LSR
C - - - - - 0x03EEF7 0F:8EE7: 4A        LSR
C - - - - - 0x03EEF8 0F:8EE8: 4A        LSR
C - - - - - 0x03EEF9 0F:8EE9: 29 0F     AND #$0F
C - - - - - 0x03EEFB 0F:8EEB: 0A        ASL
C - - - - - 0x03EEFC 0F:8EEC: AA        TAX
C - - - - - 0x03EEFD 0F:8EED: BD 73 EF  LDA $EF73,X
C - - - - - 0x03EF00 0F:8EF0: 85 3C     STA ram_003C
C - - - - - 0x03EF02 0F:8EF2: BD 74 EF  LDA $EF74,X
C - - - - - 0x03EF05 0F:8EF5: 85 3D     STA ram_003D
C - - - - - 0x03EF07 0F:8EF7: A0 00     LDY #$00
C - - - - - 0x03EF09 0F:8EF9: B1 3C     LDA (ram_003C),Y
C - - - - - 0x03EF0B 0F:8EFB: 10 3B     BPL $8F38
C - - - - - 0x03EF0D 0F:8EFD: 2C 15 06  BIT ram_0615
C - - - - - 0x03EF10 0F:8F00: 70 12     BVS $8F14
C - - - - - 0x03EF12 0F:8F02: 48        PHA
C - - - - - 0x03EF13 0F:8F03: A5 22     LDA ram_0022
C - - - - - 0x03EF15 0F:8F05: A9 14     LDA #$14
C - - - - - 0x03EF17 0F:8F07: 85 24     STA ram_0024
C - - - - - 0x03EF19 0F:8F09: A9 15     LDA #$15
C - - - - - 0x03EF1B 0F:8F0B: 85 25     STA ram_0025
C - - - - - 0x03EF1D 0F:8F0D: 20 2D CE  JSR $CE2D
C - - - - - 0x03EF20 0F:8F10: 68        PLA
C - - - - - 0x03EF21 0F:8F11: 20 06 80  JSR $8006
C - - - - - 0x03EF24 0F:8F14: 48        PHA
C - - - - - 0x03EF25 0F:8F15: A5 22     LDA ram_0022
C - - - - - 0x03EF27 0F:8F17: A9 14     LDA #$14
C - - - - - 0x03EF29 0F:8F19: 85 24     STA ram_0024
C - - - - - 0x03EF2B 0F:8F1B: A9 15     LDA #$15
C - - - - - 0x03EF2D 0F:8F1D: 85 25     STA ram_0025
C - - - - - 0x03EF2F 0F:8F1F: 20 2D CE  JSR $CE2D
C - - - - - 0x03EF32 0F:8F22: 68        PLA
C - - - - - 0x03EF33 0F:8F23: 20 03 80  JSR $8003
C - - - - - 0x03EF36 0F:8F26: 48        PHA
C - - - - - 0x03EF37 0F:8F27: A5 22     LDA ram_0022
C - - - - - 0x03EF39 0F:8F29: A9 16     LDA #$16
C - - - - - 0x03EF3B 0F:8F2B: 85 24     STA ram_0024
C - - - - - 0x03EF3D 0F:8F2D: A9 17     LDA #$17
C - - - - - 0x03EF3F 0F:8F2F: 85 25     STA ram_0025
C - - - - - 0x03EF41 0F:8F31: 20 2D CE  JSR $CE2D
C - - - - - 0x03EF44 0F:8F34: 68        PLA
C - - - - - 0x03EF45 0F:8F35: 20 00 80  JSR $8000
C - - - - - 0x03EF48 0F:8F38: E6 3A     INC ram_003A
C - - - - - 0x03EF4A 0F:8F3A: A5 3A     LDA ram_003A
C - - - - - 0x03EF4C 0F:8F3C: C9 06     CMP #$06
C - - - - - 0x03EF4E 0F:8F3E: D0 9C     BNE $8EDC
C - - - - - 0x03EF50 0F:8F40: 2C 2D 06  BIT ram_062D
C - - - - - 0x03EF53 0F:8F43: 10 12     BPL $8F57
C - - - - - 0x03EF55 0F:8F45: 48        PHA
C - - - - - 0x03EF56 0F:8F46: A5 22     LDA ram_0022
C - - - - - 0x03EF58 0F:8F48: A9 14     LDA #$14
C - - - - - 0x03EF5A 0F:8F4A: 85 24     STA ram_0024
C - - - - - 0x03EF5C 0F:8F4C: A9 15     LDA #$15
C - - - - - 0x03EF5E 0F:8F4E: 85 25     STA ram_0025
C - - - - - 0x03EF60 0F:8F50: 20 2D CE  JSR $CE2D
C - - - - - 0x03EF63 0F:8F53: 68        PLA
C - - - - - 0x03EF64 0F:8F54: 20 09 80  JSR $8009
C - - - - - 0x03EF67 0F:8F57: A9 40     LDA #$40
C - - - - - 0x03EF69 0F:8F59: 38        SEC
C - - - - - 0x03EF6A 0F:8F5A: E5 48     SBC ram_0048
C - - - - - 0x03EF6C 0F:8F5C: 8D 3F 05  STA ram_053F
C - - - - - 0x03EF6F 0F:8F5F: 90 11     BCC $8F72
C - - - - - 0x03EF71 0F:8F61: F0 0F     BEQ $8F72
C - - - - - 0x03EF73 0F:8F63: A8        TAY
C - - - - - 0x03EF74 0F:8F64: A6 3B     LDX ram_003B
C - - - - - 0x03EF76 0F:8F66: A9 F8     LDA #$F8
C - - - - - 0x03EF78 0F:8F68: 9D 00 02  STA ram_0200,X
C - - - - - 0x03EF7B 0F:8F6B: E8        INX
C - - - - - 0x03EF7C 0F:8F6C: E8        INX
C - - - - - 0x03EF7D 0F:8F6D: E8        INX
C - - - - - 0x03EF7E 0F:8F6E: E8        INX
C - - - - - 0x03EF7F 0F:8F6F: 88        DEY
C - - - - - 0x03EF80 0F:8F70: D0 F6     BNE $8F68
C - - - - - 0x03EF82 0F:8F72: 60        RTS
- D 3 - - - 0x03EF83 0F:8F73: 47        .byte $47   ; <G>
- D 3 - - - 0x03EF84 0F:8F74: 05        .byte $05   ; 
- D 3 - - - 0x03EF85 0F:8F75: 5C        .byte $5C   ; 
- D 3 - - - 0x03EF86 0F:8F76: 05        .byte $05   ; 
- D 3 - - - 0x03EF87 0F:8F77: 71        .byte $71   ; <q>
- D 3 - - - 0x03EF88 0F:8F78: 05        .byte $05   ; 
- D 3 - - - 0x03EF89 0F:8F79: 86        .byte $86   ; 
- D 3 - - - 0x03EF8A 0F:8F7A: 05        .byte $05   ; 
- D 3 - - - 0x03EF8B 0F:8F7B: 9B        .byte $9B   ; 
- D 3 - - - 0x03EF8C 0F:8F7C: 05        .byte $05   ; 
- D 3 - - - 0x03EF8D 0F:8F7D: B0        .byte $B0   ; 
- D 3 - - - 0x03EF8E 0F:8F7E: 05        .byte $05   ; 
C D 3 - - - 0x03EF8F 0F:8F7F: A8        TAY
C - - - - - 0x03EF90 0F:8F80: A5 24     LDA ram_0024
C - - - - - 0x03EF92 0F:8F82: 48        PHA
C - - - - - 0x03EF93 0F:8F83: A5 25     LDA ram_0025
C - - - - - 0x03EF95 0F:8F85: 48        PHA
C - - - - - 0x03EF96 0F:8F86: 98        TYA
C - - - - - 0x03EF97 0F:8F87: 48        PHA
C - - - - - 0x03EF98 0F:8F88: A5 22     LDA ram_0022
C - - - - - 0x03EF9A 0F:8F8A: A9 18     LDA #$18
C - - - - - 0x03EF9C 0F:8F8C: 85 24     STA ram_0024
C - - - - - 0x03EF9E 0F:8F8E: A9 19     LDA #$19
C - - - - - 0x03EFA0 0F:8F90: 85 25     STA ram_0025
C - - - - - 0x03EFA2 0F:8F92: 20 2D CE  JSR $CE2D
C - - - - - 0x03EFA5 0F:8F95: 68        PLA
C - - - - - 0x03EFA6 0F:8F96: 20 0C 80  JSR $800C
C - - - - - 0x03EFA9 0F:8F99: 68        PLA
C - - - - - 0x03EFAA 0F:8F9A: 85 25     STA ram_0025
C - - - - - 0x03EFAC 0F:8F9C: 68        PLA
C - - - - - 0x03EFAD 0F:8F9D: 85 24     STA ram_0024
C - - - - - 0x03EFAF 0F:8F9F: 4C 2D CE  JMP $CE2D
C - - - - - 0x03EFB2 0F:8FA2: AD 21 06  LDA ram_0621
C - - - - - 0x03EFB5 0F:8FA5: C9 04     CMP #$04
C - - - - - 0x03EFB7 0F:8FA7: 90 01     BCC $8FAA
C - - - - - 0x03EFB9 0F:8FA9: 60        RTS
C - - - - - 0x03EFBA 0F:8FAA: AD 00 06  LDA ram_0600
C - - - - - 0x03EFBD 0F:8FAD: D0 03     BNE $8FB2
C - - - - - 0x03EFBF 0F:8FAF: 4C F6 EF  JMP $EFF6
C - - - - - 0x03EFC2 0F:8FB2: A9 00     LDA #$00
C - - - - - 0x03EFC4 0F:8FB4: 48        PHA
C - - - - - 0x03EFC5 0F:8FB5: A9 01     LDA #$01
C - - - - - 0x03EFC7 0F:8FB7: 20 0F CB  JSR $CB0F
C - - - - - 0x03EFCA 0F:8FBA: AD 15 05  LDA ram_0515
C - - - - - 0x03EFCD 0F:8FBD: D0 F6     BNE $8FB5
C - - - - - 0x03EFCF 0F:8FBF: A9 01     LDA #$01
C - - - - - 0x03EFD1 0F:8FC1: 8D 15 05  STA ram_0515
C - - - - - 0x03EFD4 0F:8FC4: 68        PLA
C - - - - - 0x03EFD5 0F:8FC5: 48        PHA
C - - - - - 0x03EFD6 0F:8FC6: AE 21 06  LDX ram_0621
C - - - - - 0x03EFD9 0F:8FC9: E0 03     CPX #$03
C - - - - - 0x03EFDB 0F:8FCB: D0 02     BNE $8FCF
C - - - - - 0x03EFDD 0F:8FCD: A9 05     LDA #$05
C - - - - - 0x03EFDF 0F:8FCF: 0A        ASL
C - - - - - 0x03EFE0 0F:8FD0: AA        TAX
C - - - - - 0x03EFE1 0F:8FD1: BD 06 F2  LDA $F206,X
C - - - - - 0x03EFE4 0F:8FD4: 85 3A     STA ram_003A
C - - - - - 0x03EFE6 0F:8FD6: BD 07 F2  LDA $F207,X
C - - - - - 0x03EFE9 0F:8FD9: 85 3B     STA ram_003B
C - - - - - 0x03EFEB 0F:8FDB: A9 00     LDA #$00
C - - - - - 0x03EFED 0F:8FDD: 85 3C     STA ram_003C
C - - - - - 0x03EFEF 0F:8FDF: A9 21     LDA #$21
C - - - - - 0x03EFF1 0F:8FE1: 85 3D     STA ram_003D
C - - - - - 0x03EFF3 0F:8FE3: A2 00     LDX #$00
C - - - - - 0x03EFF5 0F:8FE5: 20 14 F1  JSR $F114
C - - - - - 0x03EFF8 0F:8FE8: A9 04     LDA #$04
C - - - - - 0x03EFFA 0F:8FEA: 20 0F CB  JSR $CB0F
C - - - - - 0x03EFFD 0F:8FED: 68        PLA
C - - - - - 0x03EFFE 0F:8FEE: 18        CLC
C - - - - - 0x03EFFF 0F:8FEF: 69 01     ADC #$01
C - - - - - 0x03F001 0F:8FF1: CD 00 06  CMP ram_0600
C - - - - - 0x03F004 0F:8FF4: D0 BE     BNE $8FB4
C D 3 - - - 0x03F006 0F:8FF6: AE 21 06  LDX ram_0621
C - - - - - 0x03F009 0F:8FF9: BD 0F F0  LDA $F00F,X
C - - - - - 0x03F00C 0F:8FFC: 8D 3D 06  STA ram_063D
C - - - - - 0x03F00F 0F:8FFF: 8A        TXA
C - - - - - 0x03F010 0F:9000: D0 11     BNE $9013
C - - - - - 0x03F012 0F:9002: AD 00 06  LDA ram_0600
C - - - - - 0x03F015 0F:9005: D0 0C     BNE $9013
C - - - - - 0x03F017 0F:9007: A9 02     LDA #$02
C - - - - - 0x03F019 0F:9009: 8D 3D 06  STA ram_063D
C - - - - - 0x03F01C 0F:900C: 4C 13 F0  JMP $F013
- D 3 - - - 0x03F01F 0F:900F: 00        .byte $00   ; 
- D 3 - - - 0x03F020 0F:9010: 00        .byte $00   ; 
- D 3 - - - 0x03F021 0F:9011: 01        .byte $01   ; 
- D 3 - - - 0x03F022 0F:9012: 00        .byte $00   ; 
C D 3 - - - 0x03F023 0F:9013: A9 00     LDA #$00
C D 3 - - - 0x03F025 0F:9015: 48        PHA
C - - - - - 0x03F026 0F:9016: A9 01     LDA #$01
C - - - - - 0x03F028 0F:9018: 20 0F CB  JSR $CB0F
C - - - - - 0x03F02B 0F:901B: AD 15 05  LDA ram_0515
C - - - - - 0x03F02E 0F:901E: D0 F6     BNE $9016
C - - - - - 0x03F030 0F:9020: A9 01     LDA #$01
C - - - - - 0x03F032 0F:9022: 8D 15 05  STA ram_0515
C - - - - - 0x03F035 0F:9025: AD 3D 06  LDA ram_063D
C - - - - - 0x03F038 0F:9028: 0A        ASL
C - - - - - 0x03F039 0F:9029: 0A        ASL
C - - - - - 0x03F03A 0F:902A: A8        TAY
C - - - - - 0x03F03B 0F:902B: B9 5A F1  LDA $F15A,Y
C - - - - - 0x03F03E 0F:902E: 85 3C     STA ram_003C
C - - - - - 0x03F040 0F:9030: B9 5B F1  LDA $F15B,Y
C - - - - - 0x03F043 0F:9033: 85 3D     STA ram_003D
C - - - - - 0x03F045 0F:9035: 68        PLA
C - - - - - 0x03F046 0F:9036: 48        PHA
C - - - - - 0x03F047 0F:9037: AA        TAX
C - - - - - 0x03F048 0F:9038: 18        CLC
C - - - - - 0x03F049 0F:9039: B9 5C F1  LDA $F15C,Y
C - - - - - 0x03F04C 0F:903C: 7D 0E F1  ADC $F10E,X
C - - - - - 0x03F04F 0F:903F: 8D A6 04  STA ram_04A6
C - - - - - 0x03F052 0F:9042: AD 3D 06  LDA ram_063D
C - - - - - 0x03F055 0F:9045: C9 03     CMP #$03
C - - - - - 0x03F057 0F:9047: F0 18     BEQ $9061
C - - - - - 0x03F059 0F:9049: AD CE 05  LDA ram_05CE
C - - - - - 0x03F05C 0F:904C: 29 20     AND #$20
C - - - - - 0x03F05E 0F:904E: 0D A6 04  ORA ram_04A6
C - - - - - 0x03F061 0F:9051: 8D A6 04  STA ram_04A6
C - - - - - 0x03F064 0F:9054: AD CE 05  LDA ram_05CE
C - - - - - 0x03F067 0F:9057: 4A        LSR
C - - - - - 0x03F068 0F:9058: 4A        LSR
C - - - - - 0x03F069 0F:9059: 4A        LSR
C - - - - - 0x03F06A 0F:905A: 4A        LSR
C - - - - - 0x03F06B 0F:905B: 19 5D F1  ORA $F15D,Y
C - - - - - 0x03F06E 0F:905E: 4C 64 F0  JMP $F064
C - - - - - 0x03F071 0F:9061: B9 5D F1  LDA $F15D,Y
C D 3 - - - 0x03F074 0F:9064: 8D A7 04  STA ram_04A7
C - - - - - 0x03F077 0F:9067: A9 01     LDA #$01
C - - - - - 0x03F079 0F:9069: 8D A5 04  STA ram_04A5
C - - - - - 0x03F07C 0F:906C: AD 3D 06  LDA ram_063D
C - - - - - 0x03F07F 0F:906F: 0A        ASL
C - - - - - 0x03F080 0F:9070: 85 3B     STA ram_003B
C - - - - - 0x03F082 0F:9072: 0A        ASL
C - - - - - 0x03F083 0F:9073: 65 3B     ADC ram_003B
C - - - - - 0x03F085 0F:9075: 85 3B     STA ram_003B
C - - - - - 0x03F087 0F:9077: 8A        TXA
C - - - - - 0x03F088 0F:9078: 65 3B     ADC ram_003B
C - - - - - 0x03F08A 0F:907A: AA        TAX
C - - - - - 0x03F08B 0F:907B: BD 6A F1  LDA $F16A,X
C - - - - - 0x03F08E 0F:907E: 8D A8 04  STA ram_04A8
C - - - - - 0x03F091 0F:9081: 68        PLA
C - - - - - 0x03F092 0F:9082: 48        PHA
C - - - - - 0x03F093 0F:9083: 0A        ASL
C - - - - - 0x03F094 0F:9084: AA        TAX
C - - - - - 0x03F095 0F:9085: BD 82 F1  LDA $F182,X
C - - - - - 0x03F098 0F:9088: 85 3A     STA ram_003A
C - - - - - 0x03F09A 0F:908A: BD 83 F1  LDA $F183,X
C - - - - - 0x03F09D 0F:908D: 85 3B     STA ram_003B
C - - - - - 0x03F09F 0F:908F: A2 04     LDX #$04
C - - - - - 0x03F0A1 0F:9091: 20 14 F1  JSR $F114
C - - - - - 0x03F0A4 0F:9094: 68        PLA
C - - - - - 0x03F0A5 0F:9095: 18        CLC
C - - - - - 0x03F0A6 0F:9096: 69 01     ADC #$01
C - - - - - 0x03F0A8 0F:9098: C9 06     CMP #$06
C - - - - - 0x03F0AA 0F:909A: F0 03     BEQ $909F
C - - - - - 0x03F0AC 0F:909C: 4C 15 F0  JMP $F015
C - - - - - 0x03F0AF 0F:909F: AD 3D 06  LDA ram_063D
C - - - - - 0x03F0B2 0F:90A2: C9 03     CMP #$03
C - - - - - 0x03F0B4 0F:90A4: F0 67     BEQ $910D
C - - - - - 0x03F0B6 0F:90A6: A9 01     LDA #$01
C - - - - - 0x03F0B8 0F:90A8: 20 0F CB  JSR $CB0F
C - - - - - 0x03F0BB 0F:90AB: AD 15 05  LDA ram_0515
C - - - - - 0x03F0BE 0F:90AE: D0 F6     BNE $90A6
C - - - - - 0x03F0C0 0F:90B0: A9 01     LDA #$01
C - - - - - 0x03F0C2 0F:90B2: 8D 15 05  STA ram_0515
C - - - - - 0x03F0C5 0F:90B5: A9 01     LDA #$01
C - - - - - 0x03F0C7 0F:90B7: 8D A5 04  STA ram_04A5
C - - - - - 0x03F0CA 0F:90BA: A9 A2     LDA #$A2
C - - - - - 0x03F0CC 0F:90BC: 8D A8 04  STA ram_04A8
C - - - - - 0x03F0CF 0F:90BF: A9 00     LDA #$00
C - - - - - 0x03F0D1 0F:90C1: 85 3B     STA ram_003B
C - - - - - 0x03F0D3 0F:90C3: 8D A9 04  STA ram_04A9
C - - - - - 0x03F0D6 0F:90C6: AD 3D 06  LDA ram_063D
C - - - - - 0x03F0D9 0F:90C9: 0A        ASL
C - - - - - 0x03F0DA 0F:90CA: 0A        ASL
C - - - - - 0x03F0DB 0F:90CB: AA        TAX
C - - - - - 0x03F0DC 0F:90CC: AD 37 06  LDA ram_0637
C - - - - - 0x03F0DF 0F:90CF: 38        SEC
C - - - - - 0x03F0E0 0F:90D0: E9 50     SBC #$50
C - - - - - 0x03F0E2 0F:90D2: 29 F0     AND #$F0
C - - - - - 0x03F0E4 0F:90D4: 0A        ASL
C - - - - - 0x03F0E5 0F:90D5: 85 3A     STA ram_003A
C - - - - - 0x03F0E7 0F:90D7: 26 3B     ROL ram_003B
C - - - - - 0x03F0E9 0F:90D9: AD 35 06  LDA ram_0635
C - - - - - 0x03F0EC 0F:90DC: 38        SEC
C - - - - - 0x03F0ED 0F:90DD: E9 30     SBC #$30
C - - - - - 0x03F0EF 0F:90DF: 4A        LSR
C - - - - - 0x03F0F0 0F:90E0: 4A        LSR
C - - - - - 0x03F0F1 0F:90E1: 4A        LSR
C - - - - - 0x03F0F2 0F:90E2: 4A        LSR
C - - - - - 0x03F0F3 0F:90E3: 18        CLC
C - - - - - 0x03F0F4 0F:90E4: 65 3A     ADC ram_003A
C - - - - - 0x03F0F6 0F:90E6: 85 3A     STA ram_003A
C - - - - - 0x03F0F8 0F:90E8: 90 02     BCC $90EC
- - - - - - 0x03F0FA 0F:90EA: E6        .byte $E6   ; 
- - - - - - 0x03F0FB 0F:90EB: 3B        .byte $3B   ; 
C - - - - - 0x03F0FC 0F:90EC: 18        CLC
C - - - - - 0x03F0FD 0F:90ED: 7D 5A F1  ADC $F15A,X
C - - - - - 0x03F100 0F:90F0: 8D A6 04  STA ram_04A6
C - - - - - 0x03F103 0F:90F3: BD 5B F1  LDA $F15B,X
C - - - - - 0x03F106 0F:90F6: 65 3B     ADC ram_003B
C - - - - - 0x03F108 0F:90F8: 8D A7 04  STA ram_04A7
C - - - - - 0x03F10B 0F:90FB: AD CE 05  LDA ram_05CE
C - - - - - 0x03F10E 0F:90FE: 4A        LSR
C - - - - - 0x03F10F 0F:90FF: 4A        LSR
C - - - - - 0x03F110 0F:9100: 4A        LSR
C - - - - - 0x03F111 0F:9101: 4A        LSR
C - - - - - 0x03F112 0F:9102: 0D A7 04  ORA ram_04A7
C - - - - - 0x03F115 0F:9105: 8D A7 04  STA ram_04A7
C - - - - - 0x03F118 0F:9108: A9 80     LDA #$80
C - - - - - 0x03F11A 0F:910A: 8D 15 05  STA ram_0515
C - - - - - 0x03F11D 0F:910D: 60        RTS
- D 3 - - - 0x03F11E 0F:910E: 00        .byte $00   ; 
- D 3 - - - 0x03F11F 0F:910F: 01        .byte $01   ; 
- D 3 - - - 0x03F120 0F:9110: 02        .byte $02   ; 
- D 3 - - - 0x03F121 0F:9111: 08        .byte $08   ; 
- D 3 - - - 0x03F122 0F:9112: 09        .byte $09   ; 
- D 3 - - - 0x03F123 0F:9113: 0A        .byte $0A   ; 
C - - - - - 0x03F124 0F:9114: A0 00     LDY #$00
C - - - - - 0x03F126 0F:9116: B1 3A     LDA (ram_003A),Y
C - - - - - 0x03F128 0F:9118: 9D A5 04  STA ram_04A5,X
C - - - - - 0x03F12B 0F:911B: F0 37     BEQ $9154
C - - - - - 0x03F12D 0F:911D: 85 3E     STA ram_003E
C - - - - - 0x03F12F 0F:911F: C8        INY
C - - - - - 0x03F130 0F:9120: B1 3A     LDA (ram_003A),Y
C - - - - - 0x03F132 0F:9122: 18        CLC
C - - - - - 0x03F133 0F:9123: 65 3C     ADC ram_003C
C - - - - - 0x03F135 0F:9125: 9D A6 04  STA ram_04A6,X
C - - - - - 0x03F138 0F:9128: 08        PHP
C - - - - - 0x03F139 0F:9129: C8        INY
C - - - - - 0x03F13A 0F:912A: A5 3D     LDA ram_003D
C - - - - - 0x03F13C 0F:912C: C9 22     CMP #$22
C - - - - - 0x03F13E 0F:912E: 90 04     BCC $9134
C - - - - - 0x03F140 0F:9130: A9 00     LDA #$00
C - - - - - 0x03F142 0F:9132: F0 07     BEQ $913B
C - - - - - 0x03F144 0F:9134: AD CE 05  LDA ram_05CE
C - - - - - 0x03F147 0F:9137: 4A        LSR
C - - - - - 0x03F148 0F:9138: 4A        LSR
C - - - - - 0x03F149 0F:9139: 4A        LSR
C - - - - - 0x03F14A 0F:913A: 4A        LSR
C - - - - - 0x03F14B 0F:913B: 11 3A     ORA (ram_003A),Y
C - - - - - 0x03F14D 0F:913D: 28        PLP
C - - - - - 0x03F14E 0F:913E: 65 3D     ADC ram_003D
C - - - - - 0x03F150 0F:9140: 9D A7 04  STA ram_04A7,X
C - - - - - 0x03F153 0F:9143: C8        INY
C - - - - - 0x03F154 0F:9144: E8        INX
C - - - - - 0x03F155 0F:9145: E8        INX
C - - - - - 0x03F156 0F:9146: E8        INX
C - - - - - 0x03F157 0F:9147: B1 3A     LDA (ram_003A),Y
C - - - - - 0x03F159 0F:9149: 9D A5 04  STA ram_04A5,X
C - - - - - 0x03F15C 0F:914C: C8        INY
C - - - - - 0x03F15D 0F:914D: E8        INX
C - - - - - 0x03F15E 0F:914E: C6 3E     DEC ram_003E
C - - - - - 0x03F160 0F:9150: D0 F5     BNE $9147
C - - - - - 0x03F162 0F:9152: F0 C2     BEQ $9116
C - - - - - 0x03F164 0F:9154: A9 80     LDA #$80
C - - - - - 0x03F166 0F:9156: 8D 15 05  STA ram_0515
C - - - - - 0x03F169 0F:9159: 60        RTS
- D 3 - - - 0x03F16A 0F:915A: 42        .byte $42   ; <B>
- D 3 - - - 0x03F16B 0F:915B: 20        .byte $20   ; 
- D 3 - - - 0x03F16C 0F:915C: C0        .byte $C0   ; 
- D 3 - - - 0x03F16D 0F:915D: 23        .byte $23   ; 
- D 3 - - - 0x03F16E 0F:915E: 42        .byte $42   ; <B>
- D 3 - - - 0x03F16F 0F:915F: 20        .byte $20   ; 
- D 3 - - - 0x03F170 0F:9160: C0        .byte $C0   ; 
- D 3 - - - 0x03F171 0F:9161: 23        .byte $23   ; 
- D 3 - - - 0x03F172 0F:9162: 42        .byte $42   ; <B>
- D 3 - - - 0x03F173 0F:9163: 20        .byte $20   ; 
- D 3 - - - 0x03F174 0F:9164: C0        .byte $C0   ; 
- D 3 - - - 0x03F175 0F:9165: 23        .byte $23   ; 
- D 3 - - - 0x03F176 0F:9166: B4        .byte $B4   ; 
- D 3 - - - 0x03F177 0F:9167: 22        .byte $22   ; 
- D 3 - - - 0x03F178 0F:9168: ED        .byte $ED   ; 
- D 3 - - - 0x03F179 0F:9169: 23        .byte $23   ; 
- D 3 - - - 0x03F17A 0F:916A: 3A        .byte $3A   ; 
- D 3 - - - 0x03F17B 0F:916B: 0A        .byte $0A   ; 
- D 3 - - - 0x03F17C 0F:916C: 0A        .byte $0A   ; 
- D 3 - - - 0x03F17D 0F:916D: 03        .byte $03   ; 
- D 3 - - - 0x03F17E 0F:916E: 00        .byte $00   ; 
- D 3 - - - 0x03F17F 0F:916F: 00        .byte $00   ; 
- D 3 - - - 0x03F180 0F:9170: 3F        .byte $3F   ; 
- D 3 - - - 0x03F181 0F:9171: 0F        .byte $0F   ; 
- D 3 - - - 0x03F182 0F:9172: 0F        .byte $0F   ; 
- D 3 - - - 0x03F183 0F:9173: 03        .byte $03   ; 
- D 3 - - - 0x03F184 0F:9174: 00        .byte $00   ; 
- D 3 - - - 0x03F185 0F:9175: 00        .byte $00   ; 
- D 3 - - - 0x03F186 0F:9176: 2A        .byte $2A   ; 
- D 3 - - - 0x03F187 0F:9177: 0A        .byte $0A   ; 
- D 3 - - - 0x03F188 0F:9178: 0A        .byte $0A   ; 
- D 3 - - - 0x03F189 0F:9179: 22        .byte $22   ; 
- D 3 - - - 0x03F18A 0F:917A: 00        .byte $00   ; 
- D 3 - - - 0x03F18B 0F:917B: 00        .byte $00   ; 
- D 3 - - - 0x03F18C 0F:917C: 00        .byte $00   ; 
- D 3 - - - 0x03F18D 0F:917D: 00        .byte $00   ; 
- D 3 - - - 0x03F18E 0F:917E: 00        .byte $00   ; 
- D 3 - - - 0x03F18F 0F:917F: 00        .byte $00   ; 
- D 3 - - - 0x03F190 0F:9180: 00        .byte $00   ; 
- D 3 - - - 0x03F191 0F:9181: 00        .byte $00   ; 
- D 3 - - - 0x03F192 0F:9182: 8E        .byte $8E   ; 
- D 3 - - - 0x03F193 0F:9183: F1        .byte $F1   ; 
- D 3 - - - 0x03F194 0F:9184: 99        .byte $99   ; 
- D 3 - - - 0x03F195 0F:9185: F1        .byte $F1   ; 
- D 3 - - - 0x03F196 0F:9186: A8        .byte $A8   ; 
- D 3 - - - 0x03F197 0F:9187: F1        .byte $F1   ; 
- D 3 - - - 0x03F198 0F:9188: B7        .byte $B7   ; 
- D 3 - - - 0x03F199 0F:9189: F1        .byte $F1   ; 
- D 3 - - - 0x03F19A 0F:918A: CC        .byte $CC   ; 
- D 3 - - - 0x03F19B 0F:918B: F1        .byte $F1   ; 
- D 3 - - - 0x03F19C 0F:918C: E9        .byte $E9   ; 
- D 3 - - - 0x03F19D 0F:918D: F1        .byte $F1   ; 
- D 3 - I - 0x03F19E 0F:918E: 02        .byte $02   ; 
- D 3 - I - 0x03F19F 0F:918F: 00        .byte $00   ; 
- D 3 - I - 0x03F1A0 0F:9190: 00        .byte $00   ; 
- D 3 - I - 0x03F1A1 0F:9191: 98        .byte $98   ; 
- D 3 - I - 0x03F1A2 0F:9192: AC        .byte $AC   ; 
- D 3 - I - 0x03F1A3 0F:9193: 02        .byte $02   ; 
- D 3 - I - 0x03F1A4 0F:9194: 20        .byte $20   ; 
- D 3 - I - 0x03F1A5 0F:9195: 00        .byte $00   ; 
- D 3 - I - 0x03F1A6 0F:9196: 98        .byte $98   ; 
- D 3 - I - 0x03F1A7 0F:9197: 99        .byte $99   ; 
- D 3 - I - 0x03F1A8 0F:9198: 00        .byte $00   ; 
- D 3 - I - 0x03F1A9 0F:9199: 04        .byte $04   ; 
- D 3 - I - 0x03F1AA 0F:919A: 02        .byte $02   ; 
- D 3 - I - 0x03F1AB 0F:919B: 00        .byte $00   ; 
- D 3 - I - 0x03F1AC 0F:919C: AC        .byte $AC   ; 
- D 3 - I - 0x03F1AD 0F:919D: AC        .byte $AC   ; 
- D 3 - I - 0x03F1AE 0F:919E: 99        .byte $99   ; 
- D 3 - I - 0x03F1AF 0F:919F: AC        .byte $AC   ; 
- D 3 - I - 0x03F1B0 0F:91A0: 04        .byte $04   ; 
- D 3 - I - 0x03F1B1 0F:91A1: 22        .byte $22   ; 
- D 3 - I - 0x03F1B2 0F:91A2: 00        .byte $00   ; 
- D 3 - I - 0x03F1B3 0F:91A3: A0        .byte $A0   ; 
- D 3 - I - 0x03F1B4 0F:91A4: A0        .byte $A0   ; 
- D 3 - I - 0x03F1B5 0F:91A5: AF        .byte $AF   ; 
- D 3 - I - 0x03F1B6 0F:91A6: A0        .byte $A0   ; 
- D 3 - I - 0x03F1B7 0F:91A7: 00        .byte $00   ; 
- D 3 - I - 0x03F1B8 0F:91A8: 04        .byte $04   ; 
- D 3 - I - 0x03F1B9 0F:91A9: 06        .byte $06   ; 
- D 3 - I - 0x03F1BA 0F:91AA: 00        .byte $00   ; 
- D 3 - I - 0x03F1BB 0F:91AB: AC        .byte $AC   ; 
- D 3 - I - 0x03F1BC 0F:91AC: AC        .byte $AC   ; 
- D 3 - I - 0x03F1BD 0F:91AD: AC        .byte $AC   ; 
- D 3 - I - 0x03F1BE 0F:91AE: 99        .byte $99   ; 
- D 3 - I - 0x03F1BF 0F:91AF: 04        .byte $04   ; 
- D 3 - I - 0x03F1C0 0F:91B0: 26        .byte $26   ; 
- D 3 - I - 0x03F1C1 0F:91B1: 00        .byte $00   ; 
- D 3 - I - 0x03F1C2 0F:91B2: A0        .byte $A0   ; 
- D 3 - I - 0x03F1C3 0F:91B3: A0        .byte $A0   ; 
- D 3 - I - 0x03F1C4 0F:91B4: 98        .byte $98   ; 
- D 3 - I - 0x03F1C5 0F:91B5: 99        .byte $99   ; 
- D 3 - I - 0x03F1C6 0F:91B6: 00        .byte $00   ; 
- D 3 - I - 0x03F1C7 0F:91B7: 02        .byte $02   ; 
- D 3 - I - 0x03F1C8 0F:91B8: 40        .byte $40   ; 
- D 3 - I - 0x03F1C9 0F:91B9: 00        .byte $00   ; 
- D 3 - I - 0x03F1CA 0F:91BA: A1        .byte $A1   ; 
- D 3 - I - 0x03F1CB 0F:91BB: AF        .byte $AF   ; 
- D 3 - I - 0x03F1CC 0F:91BC: 02        .byte $02   ; 
- D 3 - I - 0x03F1CD 0F:91BD: 60        .byte $60   ; 
- D 3 - I - 0x03F1CE 0F:91BE: 00        .byte $00   ; 
- D 3 - I - 0x03F1CF 0F:91BF: A3        .byte $A3   ; 
- D 3 - I - 0x03F1D0 0F:91C0: AF        .byte $AF   ; 
- D 3 - I - 0x03F1D1 0F:91C1: 02        .byte $02   ; 
- D 3 - I - 0x03F1D2 0F:91C2: 80        .byte $80   ; 
- D 3 - I - 0x03F1D3 0F:91C3: 00        .byte $00   ; 
- D 3 - I - 0x03F1D4 0F:91C4: 9A        .byte $9A   ; 
- D 3 - I - 0x03F1D5 0F:91C5: 9B        .byte $9B   ; 
- D 3 - I - 0x03F1D6 0F:91C6: 02        .byte $02   ; 
- D 3 - I - 0x03F1D7 0F:91C7: A0        .byte $A0   ; 
- D 3 - I - 0x03F1D8 0F:91C8: 00        .byte $00   ; 
- D 3 - I - 0x03F1D9 0F:91C9: 9A        .byte $9A   ; 
- D 3 - I - 0x03F1DA 0F:91CA: AD        .byte $AD   ; 
- D 3 - I - 0x03F1DB 0F:91CB: 00        .byte $00   ; 
- D 3 - I - 0x03F1DC 0F:91CC: 04        .byte $04   ; 
- D 3 - I - 0x03F1DD 0F:91CD: 42        .byte $42   ; <B>
- D 3 - I - 0x03F1DE 0F:91CE: 00        .byte $00   ; 
- D 3 - I - 0x03F1DF 0F:91CF: A0        .byte $A0   ; 
- D 3 - I - 0x03F1E0 0F:91D0: A0        .byte $A0   ; 
- D 3 - I - 0x03F1E1 0F:91D1: A4        .byte $A4   ; 
- D 3 - I - 0x03F1E2 0F:91D2: A5        .byte $A5   ; 
- D 3 - I - 0x03F1E3 0F:91D3: 04        .byte $04   ; 
- D 3 - I - 0x03F1E4 0F:91D4: 62        .byte $62   ; <b>
- D 3 - I - 0x03F1E5 0F:91D5: 00        .byte $00   ; 
- D 3 - I - 0x03F1E6 0F:91D6: A0        .byte $A0   ; 
- D 3 - I - 0x03F1E7 0F:91D7: A0        .byte $A0   ; 
- D 3 - I - 0x03F1E8 0F:91D8: A6        .byte $A6   ; 
- D 3 - I - 0x03F1E9 0F:91D9: A7        .byte $A7   ; 
- D 3 - I - 0x03F1EA 0F:91DA: 04        .byte $04   ; 
- D 3 - I - 0x03F1EB 0F:91DB: 82        .byte $82   ; 
- D 3 - I - 0x03F1EC 0F:91DC: 00        .byte $00   ; 
- D 3 - I - 0x03F1ED 0F:91DD: A0        .byte $A0   ; 
- D 3 - I - 0x03F1EE 0F:91DE: A0        .byte $A0   ; 
- D 3 - I - 0x03F1EF 0F:91DF: AF        .byte $AF   ; 
- D 3 - I - 0x03F1F0 0F:91E0: A0        .byte $A0   ; 
- D 3 - I - 0x03F1F1 0F:91E1: 04        .byte $04   ; 
- D 3 - I - 0x03F1F2 0F:91E2: A2        .byte $A2   ; 
- D 3 - I - 0x03F1F3 0F:91E3: 00        .byte $00   ; 
- D 3 - I - 0x03F1F4 0F:91E4: AD        .byte $AD   ; 
- D 3 - I - 0x03F1F5 0F:91E5: AD        .byte $AD   ; 
- D 3 - I - 0x03F1F6 0F:91E6: 9B        .byte $9B   ; 
- D 3 - I - 0x03F1F7 0F:91E7: AD        .byte $AD   ; 
- D 3 - I - 0x03F1F8 0F:91E8: 00        .byte $00   ; 
- D 3 - I - 0x03F1F9 0F:91E9: 04        .byte $04   ; 
- D 3 - I - 0x03F1FA 0F:91EA: 46        .byte $46   ; <F>
- D 3 - I - 0x03F1FB 0F:91EB: 00        .byte $00   ; 
- D 3 - I - 0x03F1FC 0F:91EC: A0        .byte $A0   ; 
- D 3 - I - 0x03F1FD 0F:91ED: A0        .byte $A0   ; 
- D 3 - I - 0x03F1FE 0F:91EE: AE        .byte $AE   ; 
- D 3 - I - 0x03F1FF 0F:91EF: A1        .byte $A1   ; 
- D 3 - I - 0x03F200 0F:91F0: 04        .byte $04   ; 
- D 3 - I - 0x03F201 0F:91F1: 66        .byte $66   ; <f>
- D 3 - I - 0x03F202 0F:91F2: 00        .byte $00   ; 
- D 3 - I - 0x03F203 0F:91F3: A0        .byte $A0   ; 
- D 3 - I - 0x03F204 0F:91F4: A0        .byte $A0   ; 
- D 3 - I - 0x03F205 0F:91F5: AE        .byte $AE   ; 
- D 3 - I - 0x03F206 0F:91F6: A3        .byte $A3   ; 
- D 3 - I - 0x03F207 0F:91F7: 04        .byte $04   ; 
- D 3 - I - 0x03F208 0F:91F8: 86        .byte $86   ; 
- D 3 - I - 0x03F209 0F:91F9: 00        .byte $00   ; 
- D 3 - I - 0x03F20A 0F:91FA: A0        .byte $A0   ; 
- D 3 - I - 0x03F20B 0F:91FB: A0        .byte $A0   ; 
- D 3 - I - 0x03F20C 0F:91FC: 9A        .byte $9A   ; 
- D 3 - I - 0x03F20D 0F:91FD: 9B        .byte $9B   ; 
- D 3 - I - 0x03F20E 0F:91FE: 04        .byte $04   ; 
- D 3 - I - 0x03F20F 0F:91FF: A6        .byte $A6   ; 
- D 3 - I - 0x03F210 0F:9200: 00        .byte $00   ; 
- D 3 - I - 0x03F211 0F:9201: AD        .byte $AD   ; 
- D 3 - I - 0x03F212 0F:9202: AD        .byte $AD   ; 
- D 3 - I - 0x03F213 0F:9203: AD        .byte $AD   ; 
- D 3 - I - 0x03F214 0F:9204: 9B        .byte $9B   ; 
- D 3 - I - 0x03F215 0F:9205: 00        .byte $00   ; 
- D 3 - - - 0x03F216 0F:9206: 12        .byte $12   ; 
- D 3 - - - 0x03F217 0F:9207: F2        .byte $F2   ; 
- D 3 - - - 0x03F218 0F:9208: 2E        .byte $2E   ; 
- D 3 - - - 0x03F219 0F:9209: F2        .byte $F2   ; 
- D 3 - - - 0x03F21A 0F:920A: 51        .byte $51   ; <Q>
- D 3 - - - 0x03F21B 0F:920B: F2        .byte $F2   ; 
- D 3 - - - 0x03F21C 0F:920C: 77        .byte $77   ; <w>
- D 3 - - - 0x03F21D 0F:920D: F2        .byte $F2   ; 
- D 3 - - - 0x03F21E 0F:920E: AD        .byte $AD   ; 
- D 3 - - - 0x03F21F 0F:920F: F2        .byte $F2   ; 
- D 3 - - - 0x03F220 0F:9210: ED        .byte $ED   ; 
- D 3 - - - 0x03F221 0F:9211: F2        .byte $F2   ; 
- D 3 - I - 0x03F222 0F:9212: 04        .byte $04   ; 
- D 3 - I - 0x03F223 0F:9213: 4E        .byte $4E   ; <N>
- D 3 - I - 0x03F224 0F:9214: 00        .byte $00   ; 
- D 3 - I - 0x03F225 0F:9215: 94        .byte $94   ; 
- D 3 - I - 0x03F226 0F:9216: 95        .byte $95   ; 
- D 3 - I - 0x03F227 0F:9217: C0        .byte $C0   ; 
- D 3 - I - 0x03F228 0F:9218: C1        .byte $C1   ; 
- D 3 - I - 0x03F229 0F:9219: 05        .byte $05   ; 
- D 3 - I - 0x03F22A 0F:921A: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F22B 0F:921B: 00        .byte $00   ; 
- D 3 - I - 0x03F22C 0F:921C: 96        .byte $96   ; 
- D 3 - I - 0x03F22D 0F:921D: 97        .byte $97   ; 
- D 3 - I - 0x03F22E 0F:921E: 80        .byte $80   ; 
- D 3 - I - 0x03F22F 0F:921F: C2        .byte $C2   ; 
- D 3 - I - 0x03F230 0F:9220: E0        .byte $E0   ; 
- D 3 - I - 0x03F231 0F:9221: 03        .byte $03   ; 
- D 3 - I - 0x03F232 0F:9222: 8F        .byte $8F   ; 
- D 3 - I - 0x03F233 0F:9223: 00        .byte $00   ; 
- D 3 - I - 0x03F234 0F:9224: 9D        .byte $9D   ; 
- D 3 - I - 0x03F235 0F:9225: 80        .byte $80   ; 
- D 3 - I - 0x03F236 0F:9226: C8        .byte $C8   ; 
- D 3 - I - 0x03F237 0F:9227: 03        .byte $03   ; 
- D 3 - I - 0x03F238 0F:9228: AF        .byte $AF   ; 
- D 3 - I - 0x03F239 0F:9229: 00        .byte $00   ; 
- D 3 - I - 0x03F23A 0F:922A: 9F        .byte $9F   ; 
- D 3 - I - 0x03F23B 0F:922B: CA        .byte $CA   ; 
- D 3 - I - 0x03F23C 0F:922C: E2        .byte $E2   ; 
- D 3 - I - 0x03F23D 0F:922D: 00        .byte $00   ; 
- D 3 - I - 0x03F23E 0F:922E: 05        .byte $05   ; 
- D 3 - I - 0x03F23F 0F:922F: 34        .byte $34   ; <4>
- D 3 - I - 0x03F240 0F:9230: 00        .byte $00   ; 
- D 3 - I - 0x03F241 0F:9231: C3        .byte $C3   ; 
- D 3 - I - 0x03F242 0F:9232: C6        .byte $C6   ; 
- D 3 - I - 0x03F243 0F:9233: C4        .byte $C4   ; 
- D 3 - I - 0x03F244 0F:9234: C5        .byte $C5   ; 
- D 3 - I - 0x03F245 0F:9235: C7        .byte $C7   ; 
- D 3 - I - 0x03F246 0F:9236: 04        .byte $04   ; 
- D 3 - I - 0x03F247 0F:9237: 53        .byte $53   ; <S>
- D 3 - I - 0x03F248 0F:9238: 00        .byte $00   ; 
- D 3 - I - 0x03F249 0F:9239: BD        .byte $BD   ; 
- D 3 - I - 0x03F24A 0F:923A: C9        .byte $C9   ; 
- D 3 - I - 0x03F24B 0F:923B: 80        .byte $80   ; 
- D 3 - I - 0x03F24C 0F:923C: CC        .byte $CC   ; 
- D 3 - I - 0x03F24D 0F:923D: 04        .byte $04   ; 
- D 3 - I - 0x03F24E 0F:923E: 73        .byte $73   ; <s>
- D 3 - I - 0x03F24F 0F:923F: 00        .byte $00   ; 
- D 3 - I - 0x03F250 0F:9240: BF        .byte $BF   ; 
- D 3 - I - 0x03F251 0F:9241: CB        .byte $CB   ; 
- D 3 - I - 0x03F252 0F:9242: 80        .byte $80   ; 
- D 3 - I - 0x03F253 0F:9243: CE        .byte $CE   ; 
- D 3 - I - 0x03F254 0F:9244: 03        .byte $03   ; 
- D 3 - I - 0x03F255 0F:9245: 94        .byte $94   ; 
- D 3 - I - 0x03F256 0F:9246: 00        .byte $00   ; 
- D 3 - I - 0x03F257 0F:9247: E1        .byte $E1   ; 
- D 3 - I - 0x03F258 0F:9248: BE        .byte $BE   ; 
- D 3 - I - 0x03F259 0F:9249: E4        .byte $E4   ; 
- D 3 - I - 0x03F25A 0F:924A: 03        .byte $03   ; 
- D 3 - I - 0x03F25B 0F:924B: B4        .byte $B4   ; 
- D 3 - I - 0x03F25C 0F:924C: 00        .byte $00   ; 
- D 3 - I - 0x03F25D 0F:924D: E3        .byte $E3   ; 
- D 3 - I - 0x03F25E 0F:924E: E6        .byte $E6   ; 
- D 3 - I - 0x03F25F 0F:924F: E7        .byte $E7   ; 
- D 3 - I - 0x03F260 0F:9250: 00        .byte $00   ; 
- D 3 - I - 0x03F261 0F:9251: 03        .byte $03   ; 
- D 3 - I - 0x03F262 0F:9252: 2A        .byte $2A   ; 
- D 3 - I - 0x03F263 0F:9253: 00        .byte $00   ; 
- D 3 - I - 0x03F264 0F:9254: A8        .byte $A8   ; 
- D 3 - I - 0x03F265 0F:9255: A9        .byte $A9   ; 
- D 3 - I - 0x03F266 0F:9256: 9C        .byte $9C   ; 
- D 3 - I - 0x03F267 0F:9257: 04        .byte $04   ; 
- D 3 - I - 0x03F268 0F:9258: 49        .byte $49   ; <I>
- D 3 - I - 0x03F269 0F:9259: 00        .byte $00   ; 
- D 3 - I - 0x03F26A 0F:925A: AA        .byte $AA   ; 
- D 3 - I - 0x03F26B 0F:925B: 80        .byte $80   ; 
- D 3 - I - 0x03F26C 0F:925C: AB        .byte $AB   ; 
- D 3 - I - 0x03F26D 0F:925D: 9E        .byte $9E   ; 
- D 3 - I - 0x03F26E 0F:925E: 05        .byte $05   ; 
- D 3 - I - 0x03F26F 0F:925F: 69        .byte $69   ; <i>
- D 3 - I - 0x03F270 0F:9260: 00        .byte $00   ; 
- D 3 - I - 0x03F271 0F:9261: B0        .byte $B0   ; 
- D 3 - I - 0x03F272 0F:9262: 80        .byte $80   ; 
- D 3 - I - 0x03F273 0F:9263: B1        .byte $B1   ; 
- D 3 - I - 0x03F274 0F:9264: B4        .byte $B4   ; 
- D 3 - I - 0x03F275 0F:9265: B5        .byte $B5   ; 
- D 3 - I - 0x03F276 0F:9266: 06        .byte $06   ; 
- D 3 - I - 0x03F277 0F:9267: 88        .byte $88   ; 
- D 3 - I - 0x03F278 0F:9268: 00        .byte $00   ; 
- D 3 - I - 0x03F279 0F:9269: B2        .byte $B2   ; 
- D 3 - I - 0x03F27A 0F:926A: B3        .byte $B3   ; 
- D 3 - I - 0x03F27B 0F:926B: 80        .byte $80   ; 
- D 3 - I - 0x03F27C 0F:926C: BC        .byte $BC   ; 
- D 3 - I - 0x03F27D 0F:926D: B6        .byte $B6   ; 
- D 3 - I - 0x03F27E 0F:926E: B7        .byte $B7   ; 
- D 3 - I - 0x03F27F 0F:926F: 04        .byte $04   ; 
- D 3 - I - 0x03F280 0F:9270: A8        .byte $A8   ; 
- D 3 - I - 0x03F281 0F:9271: 00        .byte $00   ; 
- D 3 - I - 0x03F282 0F:9272: B8        .byte $B8   ; 
- D 3 - I - 0x03F283 0F:9273: BA        .byte $BA   ; 
- D 3 - I - 0x03F284 0F:9274: B9        .byte $B9   ; 
- D 3 - I - 0x03F285 0F:9275: BB        .byte $BB   ; 
- D 3 - I - 0x03F286 0F:9276: 00        .byte $00   ; 
- D 3 - I - 0x03F287 0F:9277: 05        .byte $05   ; 
- D 3 - I - 0x03F288 0F:9278: 1A        .byte $1A   ; 
- D 3 - I - 0x03F289 0F:9279: 00        .byte $00   ; 
- D 3 - I - 0x03F28A 0F:927A: D0        .byte $D0   ; 
- D 3 - I - 0x03F28B 0F:927B: D1        .byte $D1   ; 
- D 3 - I - 0x03F28C 0F:927C: D4        .byte $D4   ; 
- D 3 - I - 0x03F28D 0F:927D: D5        .byte $D5   ; 
- D 3 - I - 0x03F28E 0F:927E: FB        .byte $FB   ; 
- D 3 - I - 0x03F28F 0F:927F: 07        .byte $07   ; 
- D 3 - I - 0x03F290 0F:9280: 39        .byte $39   ; <9>
- D 3 - I - 0x03F291 0F:9281: 00        .byte $00   ; 
- D 3 - I - 0x03F292 0F:9282: CD        .byte $CD   ; 
- D 3 - I - 0x03F293 0F:9283: D2        .byte $D2   ; 
- D 3 - I - 0x03F294 0F:9284: D3        .byte $D3   ; 
- D 3 - I - 0x03F295 0F:9285: 80        .byte $80   ; 
- D 3 - I - 0x03F296 0F:9286: 80        .byte $80   ; 
- D 3 - I - 0x03F297 0F:9287: D6        .byte $D6   ; 
- D 3 - I - 0x03F298 0F:9288: D7        .byte $D7   ; 
- D 3 - I - 0x03F299 0F:9289: 06        .byte $06   ; 
- D 3 - I - 0x03F29A 0F:928A: 59        .byte $59   ; <Y>
- D 3 - I - 0x03F29B 0F:928B: 00        .byte $00   ; 
- D 3 - I - 0x03F29C 0F:928C: CF        .byte $CF   ; 
- D 3 - I - 0x03F29D 0F:928D: D8        .byte $D8   ; 
- D 3 - I - 0x03F29E 0F:928E: 80        .byte $80   ; 
- D 3 - I - 0x03F29F 0F:928F: 80        .byte $80   ; 
- D 3 - I - 0x03F2A0 0F:9290: 80        .byte $80   ; 
- D 3 - I - 0x03F2A1 0F:9291: D9        .byte $D9   ; 
- D 3 - I - 0x03F2A2 0F:9292: 07        .byte $07   ; 
- D 3 - I - 0x03F2A3 0F:9293: 79        .byte $79   ; <y>
- D 3 - I - 0x03F2A4 0F:9294: 00        .byte $00   ; 
- D 3 - I - 0x03F2A5 0F:9295: E5        .byte $E5   ; 
- D 3 - I - 0x03F2A6 0F:9296: DA        .byte $DA   ; 
- D 3 - I - 0x03F2A7 0F:9297: FC        .byte $FC   ; 
- D 3 - I - 0x03F2A8 0F:9298: FD        .byte $FD   ; 
- D 3 - I - 0x03F2A9 0F:9299: 80        .byte $80   ; 
- D 3 - I - 0x03F2AA 0F:929A: 80        .byte $80   ; 
- D 3 - I - 0x03F2AB 0F:929B: DC        .byte $DC   ; 
- D 3 - I - 0x03F2AC 0F:929C: 05        .byte $05   ; 
- D 3 - I - 0x03F2AD 0F:929D: 9B        .byte $9B   ; 
- D 3 - I - 0x03F2AE 0F:929E: 00        .byte $00   ; 
- D 3 - I - 0x03F2AF 0F:929F: DB        .byte $DB   ; 
- D 3 - I - 0x03F2B0 0F:92A0: DD        .byte $DD   ; 
- D 3 - I - 0x03F2B1 0F:92A1: 80        .byte $80   ; 
- D 3 - I - 0x03F2B2 0F:92A2: 80        .byte $80   ; 
- D 3 - I - 0x03F2B3 0F:92A3: 80        .byte $80   ; 
- D 3 - I - 0x03F2B4 0F:92A4: 05        .byte $05   ; 
- D 3 - I - 0x03F2B5 0F:92A5: BB        .byte $BB   ; 
- D 3 - I - 0x03F2B6 0F:92A6: 00        .byte $00   ; 
- D 3 - I - 0x03F2B7 0F:92A7: 9F        .byte $9F   ; 
- D 3 - I - 0x03F2B8 0F:92A8: 80        .byte $80   ; 
- D 3 - I - 0x03F2B9 0F:92A9: BA        .byte $BA   ; 
- D 3 - I - 0x03F2BA 0F:92AA: DE        .byte $DE   ; 
- D 3 - I - 0x03F2BB 0F:92AB: DF        .byte $DF   ; 
- D 3 - I - 0x03F2BC 0F:92AC: 00        .byte $00   ; 
- D 3 - I - 0x03F2BD 0F:92AD: 04        .byte $04   ; 
- D 3 - I - 0x03F2BE 0F:92AE: 01        .byte $01   ; 
- D 3 - I - 0x03F2BF 0F:92AF: 00        .byte $00   ; 
- D 3 - I - 0x03F2C0 0F:92B0: 84        .byte $84   ; 
- D 3 - I - 0x03F2C1 0F:92B1: 85        .byte $85   ; 
- D 3 - I - 0x03F2C2 0F:92B2: 90        .byte $90   ; 
- D 3 - I - 0x03F2C3 0F:92B3: 91        .byte $91   ; 
- D 3 - I - 0x03F2C4 0F:92B4: 05        .byte $05   ; 
- D 3 - I - 0x03F2C5 0F:92B5: 20        .byte $20   ; 
- D 3 - I - 0x03F2C6 0F:92B6: 00        .byte $00   ; 
- D 3 - I - 0x03F2C7 0F:92B7: 82        .byte $82   ; 
- D 3 - I - 0x03F2C8 0F:92B8: 80        .byte $80   ; 
- D 3 - I - 0x03F2C9 0F:92B9: 80        .byte $80   ; 
- D 3 - I - 0x03F2CA 0F:92BA: 80        .byte $80   ; 
- D 3 - I - 0x03F2CB 0F:92BB: 93        .byte $93   ; 
- D 3 - I - 0x03F2CC 0F:92BC: 06        .byte $06   ; 
- D 3 - I - 0x03F2CD 0F:92BD: 40        .byte $40   ; 
- D 3 - I - 0x03F2CE 0F:92BE: 00        .byte $00   ; 
- D 3 - I - 0x03F2CF 0F:92BF: 80        .byte $80   ; 
- D 3 - I - 0x03F2D0 0F:92C0: 80        .byte $80   ; 
- D 3 - I - 0x03F2D1 0F:92C1: 80        .byte $80   ; 
- D 3 - I - 0x03F2D2 0F:92C2: 80        .byte $80   ; 
- D 3 - I - 0x03F2D3 0F:92C3: 80        .byte $80   ; 
- D 3 - I - 0x03F2D4 0F:92C4: 88        .byte $88   ; 
- D 3 - I - 0x03F2D5 0F:92C5: 02        .byte $02   ; 
- D 3 - I - 0x03F2D6 0F:92C6: 47        .byte $47   ; <G>
- D 3 - I - 0x03F2D7 0F:92C7: 00        .byte $00   ; 
- D 3 - I - 0x03F2D8 0F:92C8: 83        .byte $83   ; 
- D 3 - I - 0x03F2D9 0F:92C9: 86        .byte $86   ; 
- D 3 - I - 0x03F2DA 0F:92CA: 09        .byte $09   ; 
- D 3 - I - 0x03F2DB 0F:92CB: 60        .byte $60   ; 
- D 3 - I - 0x03F2DC 0F:92CC: 00        .byte $00   ; 
- D 3 - I - 0x03F2DD 0F:92CD: 80        .byte $80   ; 
- D 3 - I - 0x03F2DE 0F:92CE: 80        .byte $80   ; 
- D 3 - I - 0x03F2DF 0F:92CF: 80        .byte $80   ; 
- D 3 - I - 0x03F2E0 0F:92D0: 80        .byte $80   ; 
- D 3 - I - 0x03F2E1 0F:92D1: 80        .byte $80   ; 
- D 3 - I - 0x03F2E2 0F:92D2: 80        .byte $80   ; 
- D 3 - I - 0x03F2E3 0F:92D3: 8A        .byte $8A   ; 
- D 3 - I - 0x03F2E4 0F:92D4: 89        .byte $89   ; 
- D 3 - I - 0x03F2E5 0F:92D5: 8C        .byte $8C   ; 
- D 3 - I - 0x03F2E6 0F:92D6: 08        .byte $08   ; 
- D 3 - I - 0x03F2E7 0F:92D7: 80        .byte $80   ; 
- D 3 - I - 0x03F2E8 0F:92D8: 00        .byte $00   ; 
- D 3 - I - 0x03F2E9 0F:92D9: 80        .byte $80   ; 
- D 3 - I - 0x03F2EA 0F:92DA: 80        .byte $80   ; 
- D 3 - I - 0x03F2EB 0F:92DB: 80        .byte $80   ; 
- D 3 - I - 0x03F2EC 0F:92DC: 80        .byte $80   ; 
- D 3 - I - 0x03F2ED 0F:92DD: 80        .byte $80   ; 
- D 3 - I - 0x03F2EE 0F:92DE: 8D        .byte $8D   ; 
- D 3 - I - 0x03F2EF 0F:92DF: 80        .byte $80   ; 
- D 3 - I - 0x03F2F0 0F:92E0: 8B        .byte $8B   ; 
- D 3 - I - 0x03F2F1 0F:92E1: 08        .byte $08   ; 
- D 3 - I - 0x03F2F2 0F:92E2: A0        .byte $A0   ; 
- D 3 - I - 0x03F2F3 0F:92E3: 00        .byte $00   ; 
- D 3 - I - 0x03F2F4 0F:92E4: 80        .byte $80   ; 
- D 3 - I - 0x03F2F5 0F:92E5: 80        .byte $80   ; 
- D 3 - I - 0x03F2F6 0F:92E6: 80        .byte $80   ; 
- D 3 - I - 0x03F2F7 0F:92E7: 80        .byte $80   ; 
- D 3 - I - 0x03F2F8 0F:92E8: 8E        .byte $8E   ; 
- D 3 - I - 0x03F2F9 0F:92E9: 8F        .byte $8F   ; 
- D 3 - I - 0x03F2FA 0F:92EA: 87        .byte $87   ; 
- D 3 - I - 0x03F2FB 0F:92EB: 92        .byte $92   ; 
- D 3 - I - 0x03F2FC 0F:92EC: 00        .byte $00   ; 
- D 3 - I - 0x03F2FD 0F:92ED: 02        .byte $02   ; 
- D 3 - I - 0x03F2FE 0F:92EE: 4F        .byte $4F   ; <O>
- D 3 - I - 0x03F2FF 0F:92EF: 00        .byte $00   ; 
- D 3 - I - 0x03F300 0F:92F0: D4        .byte $D4   ; 
- D 3 - I - 0x03F301 0F:92F1: D5        .byte $D5   ; 
- D 3 - I - 0x03F302 0F:92F2: 04        .byte $04   ; 
- D 3 - I - 0x03F303 0F:92F3: 6D        .byte $6D   ; <m>
- D 3 - I - 0x03F304 0F:92F4: 00        .byte $00   ; 
- D 3 - I - 0x03F305 0F:92F5: D2        .byte $D2   ; 
- D 3 - I - 0x03F306 0F:92F6: D3        .byte $D3   ; 
- D 3 - I - 0x03F307 0F:92F7: 00        .byte $00   ; 
- D 3 - I - 0x03F308 0F:92F8: D7        .byte $D7   ; 
- D 3 - I - 0x03F309 0F:92F9: 01        .byte $01   ; 
- D 3 - I - 0x03F30A 0F:92FA: 72        .byte $72   ; <r>
- D 3 - I - 0x03F30B 0F:92FB: 00        .byte $00   ; 
- D 3 - I - 0x03F30C 0F:92FC: D6        .byte $D6   ; 
- D 3 - I - 0x03F30D 0F:92FD: 06        .byte $06   ; 
- D 3 - I - 0x03F30E 0F:92FE: 8D        .byte $8D   ; 
- D 3 - I - 0x03F30F 0F:92FF: 00        .byte $00   ; 
- D 3 - I - 0x03F310 0F:9300: D8        .byte $D8   ; 
- D 3 - I - 0x03F311 0F:9301: 00        .byte $00   ; 
- D 3 - I - 0x03F312 0F:9302: 00        .byte $00   ; 
- D 3 - I - 0x03F313 0F:9303: DD        .byte $DD   ; 
- D 3 - I - 0x03F314 0F:9304: D9        .byte $D9   ; 
- D 3 - I - 0x03F315 0F:9305: DC        .byte $DC   ; 
- D 3 - I - 0x03F316 0F:9306: 05        .byte $05   ; 
- D 3 - I - 0x03F317 0F:9307: AD        .byte $AD   ; 
- D 3 - I - 0x03F318 0F:9308: 00        .byte $00   ; 
- D 3 - I - 0x03F319 0F:9309: DA        .byte $DA   ; 
- D 3 - I - 0x03F31A 0F:930A: DB        .byte $DB   ; 
- D 3 - I - 0x03F31B 0F:930B: DE        .byte $DE   ; 
- D 3 - I - 0x03F31C 0F:930C: DF        .byte $DF   ; 
- D 3 - I - 0x03F31D 0F:930D: D1        .byte $D1   ; 
- D 3 - I - 0x03F31E 0F:930E: 00        .byte $00   ; 
C D 3 - - - 0x03F31F 0F:930F: A0 29     LDY #$29
C - - - - - 0x03F321 0F:9311: 84 30     STY ram_0030
C - - - - - 0x03F323 0F:9313: A0 F3     LDY #$F3
C - - - - - 0x03F325 0F:9315: 84 31     STY ram_0031
C - - - - - 0x03F327 0F:9317: 0A        ASL
C - - - - - 0x03F328 0F:9318: 90 02     BCC $931C
C - - - - - 0x03F32A 0F:931A: E6 31     INC ram_0031
C - - - - - 0x03F32C 0F:931C: A8        TAY
C - - - - - 0x03F32D 0F:931D: B1 30     LDA (ram_0030),Y
C - - - - - 0x03F32F 0F:931F: 48        PHA
C - - - - - 0x03F330 0F:9320: C8        INY
C - - - - - 0x03F331 0F:9321: B1 30     LDA (ram_0030),Y
C - - - - - 0x03F333 0F:9323: 85 31     STA ram_0031
C - - - - - 0x03F335 0F:9325: 68        PLA
C - - - - - 0x03F336 0F:9326: 85 30     STA ram_0030
C - - - - - 0x03F338 0F:9328: 60        RTS
- D 3 - I - 0x03F339 0F:9329: EB        .byte $EB   ; 
- D 3 - I - 0x03F33A 0F:932A: 05        .byte $05   ; 
- D 3 - I - 0x03F33B 0F:932B: 09        .byte $09   ; 
- D 3 - I - 0x03F33C 0F:932C: F5        .byte $F5   ; 
- D 3 - I - 0x03F33D 0F:932D: 0D        .byte $0D   ; 
- D 3 - I - 0x03F33E 0F:932E: F5        .byte $F5   ; 
- D 3 - I - 0x03F33F 0F:932F: 12        .byte $12   ; 
- D 3 - I - 0x03F340 0F:9330: F5        .byte $F5   ; 
- D 3 - I - 0x03F341 0F:9331: 15        .byte $15   ; 
- D 3 - I - 0x03F342 0F:9332: F5        .byte $F5   ; 
- D 3 - I - 0x03F343 0F:9333: 1A        .byte $1A   ; 
- D 3 - I - 0x03F344 0F:9334: F5        .byte $F5   ; 
- D 3 - I - 0x03F345 0F:9335: 1F        .byte $1F   ; 
- D 3 - I - 0x03F346 0F:9336: F5        .byte $F5   ; 
- D 3 - I - 0x03F347 0F:9337: 24        .byte $24   ; 
- D 3 - I - 0x03F348 0F:9338: F5        .byte $F5   ; 
- D 3 - I - 0x03F349 0F:9339: 29        .byte $29   ; 
- D 3 - I - 0x03F34A 0F:933A: F5        .byte $F5   ; 
- D 3 - I - 0x03F34B 0F:933B: 2E        .byte $2E   ; 
- D 3 - I - 0x03F34C 0F:933C: F5        .byte $F5   ; 
- D 3 - I - 0x03F34D 0F:933D: 34        .byte $34   ; <4>
- D 3 - I - 0x03F34E 0F:933E: F5        .byte $F5   ; 
- D 3 - I - 0x03F34F 0F:933F: 37        .byte $37   ; <7>
- D 3 - I - 0x03F350 0F:9340: F5        .byte $F5   ; 
- D 3 - I - 0x03F351 0F:9341: 3C        .byte $3C   ; 
- D 3 - I - 0x03F352 0F:9342: F5        .byte $F5   ; 
- D 3 - I - 0x03F353 0F:9343: 40        .byte $40   ; 
- D 3 - I - 0x03F354 0F:9344: F5        .byte $F5   ; 
- D 3 - I - 0x03F355 0F:9345: 44        .byte $44   ; <D>
- D 3 - I - 0x03F356 0F:9346: F5        .byte $F5   ; 
- D 3 - I - 0x03F357 0F:9347: 49        .byte $49   ; <I>
- D 3 - I - 0x03F358 0F:9348: F5        .byte $F5   ; 
- D 3 - I - 0x03F359 0F:9349: 4E        .byte $4E   ; <N>
- D 3 - I - 0x03F35A 0F:934A: F5        .byte $F5   ; 
- D 3 - I - 0x03F35B 0F:934B: 53        .byte $53   ; <S>
- D 3 - I - 0x03F35C 0F:934C: F5        .byte $F5   ; 
- D 3 - I - 0x03F35D 0F:934D: 57        .byte $57   ; <W>
- D 3 - I - 0x03F35E 0F:934E: F5        .byte $F5   ; 
- D 3 - I - 0x03F35F 0F:934F: 5B        .byte $5B   ; 
- D 3 - I - 0x03F360 0F:9350: F5        .byte $F5   ; 
- D 3 - I - 0x03F361 0F:9351: 5E        .byte $5E   ; 
- D 3 - I - 0x03F362 0F:9352: F5        .byte $F5   ; 
- D 3 - I - 0x03F363 0F:9353: 63        .byte $63   ; <c>
- D 3 - I - 0x03F364 0F:9354: F5        .byte $F5   ; 
- D 3 - I - 0x03F365 0F:9355: 67        .byte $67   ; <g>
- D 3 - I - 0x03F366 0F:9356: F5        .byte $F5   ; 
- D 3 - I - 0x03F367 0F:9357: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F368 0F:9358: F5        .byte $F5   ; 
- D 3 - I - 0x03F369 0F:9359: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F36A 0F:935A: F5        .byte $F5   ; 
- D 3 - I - 0x03F36B 0F:935B: 73        .byte $73   ; <s>
- D 3 - I - 0x03F36C 0F:935C: F5        .byte $F5   ; 
- D 3 - I - 0x03F36D 0F:935D: 76        .byte $76   ; <v>
- D 3 - I - 0x03F36E 0F:935E: F5        .byte $F5   ; 
- D 3 - I - 0x03F36F 0F:935F: 7B        .byte $7B   ; 
- D 3 - I - 0x03F370 0F:9360: F5        .byte $F5   ; 
- D 3 - I - 0x03F371 0F:9361: 7F        .byte $7F   ; 
- D 3 - I - 0x03F372 0F:9362: F5        .byte $F5   ; 
- D 3 - I - 0x03F373 0F:9363: 83        .byte $83   ; 
- D 3 - I - 0x03F374 0F:9364: F5        .byte $F5   ; 
- D 3 - I - 0x03F375 0F:9365: 88        .byte $88   ; 
- D 3 - I - 0x03F376 0F:9366: F5        .byte $F5   ; 
- D 3 - I - 0x03F377 0F:9367: 8D        .byte $8D   ; 
- D 3 - I - 0x03F378 0F:9368: F5        .byte $F5   ; 
- D 3 - I - 0x03F379 0F:9369: 91        .byte $91   ; 
- D 3 - I - 0x03F37A 0F:936A: F5        .byte $F5   ; 
- D 3 - I - 0x03F37B 0F:936B: 95        .byte $95   ; 
- D 3 - I - 0x03F37C 0F:936C: F5        .byte $F5   ; 
- D 3 - I - 0x03F37D 0F:936D: 9B        .byte $9B   ; 
- D 3 - I - 0x03F37E 0F:936E: F5        .byte $F5   ; 
- D 3 - I - 0x03F37F 0F:936F: A1        .byte $A1   ; 
- D 3 - I - 0x03F380 0F:9370: F5        .byte $F5   ; 
- D 3 - I - 0x03F381 0F:9371: A8        .byte $A8   ; 
- D 3 - I - 0x03F382 0F:9372: F5        .byte $F5   ; 
- D 3 - I - 0x03F383 0F:9373: AD        .byte $AD   ; 
- D 3 - I - 0x03F384 0F:9374: F5        .byte $F5   ; 
- D 3 - I - 0x03F385 0F:9375: B3        .byte $B3   ; 
- D 3 - I - 0x03F386 0F:9376: F5        .byte $F5   ; 
- D 3 - I - 0x03F387 0F:9377: B7        .byte $B7   ; 
- D 3 - I - 0x03F388 0F:9378: F5        .byte $F5   ; 
- D 3 - I - 0x03F389 0F:9379: BD        .byte $BD   ; 
- D 3 - I - 0x03F38A 0F:937A: F5        .byte $F5   ; 
- D 3 - I - 0x03F38B 0F:937B: C0        .byte $C0   ; 
- D 3 - I - 0x03F38C 0F:937C: F5        .byte $F5   ; 
- D 3 - I - 0x03F38D 0F:937D: C4        .byte $C4   ; 
- D 3 - I - 0x03F38E 0F:937E: F5        .byte $F5   ; 
- D 3 - I - 0x03F38F 0F:937F: CA        .byte $CA   ; 
- D 3 - I - 0x03F390 0F:9380: F5        .byte $F5   ; 
- D 3 - I - 0x03F391 0F:9381: CF        .byte $CF   ; 
- D 3 - I - 0x03F392 0F:9382: F5        .byte $F5   ; 
- D 3 - I - 0x03F393 0F:9383: D6        .byte $D6   ; 
- D 3 - I - 0x03F394 0F:9384: F5        .byte $F5   ; 
- D 3 - I - 0x03F395 0F:9385: DD        .byte $DD   ; 
- D 3 - I - 0x03F396 0F:9386: F5        .byte $F5   ; 
- D 3 - I - 0x03F397 0F:9387: E1        .byte $E1   ; 
- D 3 - I - 0x03F398 0F:9388: F5        .byte $F5   ; 
- D 3 - I - 0x03F399 0F:9389: E4        .byte $E4   ; 
- D 3 - I - 0x03F39A 0F:938A: F5        .byte $F5   ; 
- D 3 - I - 0x03F39B 0F:938B: E8        .byte $E8   ; 
- D 3 - I - 0x03F39C 0F:938C: F5        .byte $F5   ; 
- D 3 - I - 0x03F39D 0F:938D: EC        .byte $EC   ; 
- D 3 - I - 0x03F39E 0F:938E: F5        .byte $F5   ; 
- D 3 - I - 0x03F39F 0F:938F: F0        .byte $F0   ; 
- D 3 - I - 0x03F3A0 0F:9390: F5        .byte $F5   ; 
- D 3 - I - 0x03F3A1 0F:9391: F5        .byte $F5   ; 
- D 3 - I - 0x03F3A2 0F:9392: F5        .byte $F5   ; 
- D 3 - I - 0x03F3A3 0F:9393: F9        .byte $F9   ; 
- D 3 - I - 0x03F3A4 0F:9394: F5        .byte $F5   ; 
- D 3 - I - 0x03F3A5 0F:9395: FE        .byte $FE   ; 
- D 3 - I - 0x03F3A6 0F:9396: F5        .byte $F5   ; 
- D 3 - I - 0x03F3A7 0F:9397: 03        .byte $03   ; 
- D 3 - I - 0x03F3A8 0F:9398: F6        .byte $F6   ; 
- D 3 - I - 0x03F3A9 0F:9399: 08        .byte $08   ; 
- D 3 - I - 0x03F3AA 0F:939A: F6        .byte $F6   ; 
- D 3 - I - 0x03F3AB 0F:939B: 0C        .byte $0C   ; 
- D 3 - I - 0x03F3AC 0F:939C: F6        .byte $F6   ; 
- D 3 - I - 0x03F3AD 0F:939D: 12        .byte $12   ; 
- D 3 - I - 0x03F3AE 0F:939E: F6        .byte $F6   ; 
- D 3 - I - 0x03F3AF 0F:939F: 18        .byte $18   ; 
- D 3 - I - 0x03F3B0 0F:93A0: F6        .byte $F6   ; 
- D 3 - I - 0x03F3B1 0F:93A1: 1F        .byte $1F   ; 
- D 3 - I - 0x03F3B2 0F:93A2: F6        .byte $F6   ; 
- D 3 - I - 0x03F3B3 0F:93A3: 25        .byte $25   ; 
- D 3 - I - 0x03F3B4 0F:93A4: F6        .byte $F6   ; 
- D 3 - I - 0x03F3B5 0F:93A5: 2B        .byte $2B   ; 
- D 3 - I - 0x03F3B6 0F:93A6: F6        .byte $F6   ; 
- D 3 - I - 0x03F3B7 0F:93A7: 2F        .byte $2F   ; 
- D 3 - I - 0x03F3B8 0F:93A8: F6        .byte $F6   ; 
- D 3 - I - 0x03F3B9 0F:93A9: 34        .byte $34   ; <4>
- D 3 - I - 0x03F3BA 0F:93AA: F6        .byte $F6   ; 
- D 3 - I - 0x03F3BB 0F:93AB: 3A        .byte $3A   ; 
- D 3 - I - 0x03F3BC 0F:93AC: F6        .byte $F6   ; 
- D 3 - I - 0x03F3BD 0F:93AD: 3F        .byte $3F   ; 
- D 3 - I - 0x03F3BE 0F:93AE: F6        .byte $F6   ; 
- D 3 - I - 0x03F3BF 0F:93AF: 43        .byte $43   ; <C>
- D 3 - I - 0x03F3C0 0F:93B0: F6        .byte $F6   ; 
- D 3 - I - 0x03F3C1 0F:93B1: 46        .byte $46   ; <F>
- D 3 - I - 0x03F3C2 0F:93B2: F6        .byte $F6   ; 
- D 3 - I - 0x03F3C3 0F:93B3: 4A        .byte $4A   ; <J>
- D 3 - I - 0x03F3C4 0F:93B4: F6        .byte $F6   ; 
- D 3 - I - 0x03F3C5 0F:93B5: 4E        .byte $4E   ; <N>
- D 3 - I - 0x03F3C6 0F:93B6: F6        .byte $F6   ; 
- D 3 - I - 0x03F3C7 0F:93B7: 52        .byte $52   ; <R>
- D 3 - I - 0x03F3C8 0F:93B8: F6        .byte $F6   ; 
- D 3 - I - 0x03F3C9 0F:93B9: 56        .byte $56   ; <V>
- D 3 - I - 0x03F3CA 0F:93BA: F6        .byte $F6   ; 
- D 3 - I - 0x03F3CB 0F:93BB: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03F3CC 0F:93BC: F6        .byte $F6   ; 
- D 3 - I - 0x03F3CD 0F:93BD: 5F        .byte $5F   ; 
- D 3 - I - 0x03F3CE 0F:93BE: F6        .byte $F6   ; 
- D 3 - I - 0x03F3CF 0F:93BF: 63        .byte $63   ; <c>
- D 3 - I - 0x03F3D0 0F:93C0: F6        .byte $F6   ; 
- D 3 - I - 0x03F3D1 0F:93C1: 68        .byte $68   ; <h>
- D 3 - I - 0x03F3D2 0F:93C2: F6        .byte $F6   ; 
- D 3 - I - 0x03F3D3 0F:93C3: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F3D4 0F:93C4: F6        .byte $F6   ; 
- D 3 - I - 0x03F3D5 0F:93C5: 74        .byte $74   ; <t>
- D 3 - I - 0x03F3D6 0F:93C6: F6        .byte $F6   ; 
- D 3 - I - 0x03F3D7 0F:93C7: 7B        .byte $7B   ; 
- D 3 - I - 0x03F3D8 0F:93C8: F6        .byte $F6   ; 
- D 3 - I - 0x03F3D9 0F:93C9: 7E        .byte $7E   ; 
- D 3 - I - 0x03F3DA 0F:93CA: F6        .byte $F6   ; 
- D 3 - I - 0x03F3DB 0F:93CB: 81        .byte $81   ; 
- D 3 - I - 0x03F3DC 0F:93CC: F6        .byte $F6   ; 
- D 3 - I - 0x03F3DD 0F:93CD: 86        .byte $86   ; 
- D 3 - I - 0x03F3DE 0F:93CE: F6        .byte $F6   ; 
- D 3 - I - 0x03F3DF 0F:93CF: 8C        .byte $8C   ; 
- D 3 - I - 0x03F3E0 0F:93D0: F6        .byte $F6   ; 
- D 3 - I - 0x03F3E1 0F:93D1: 91        .byte $91   ; 
- D 3 - I - 0x03F3E2 0F:93D2: F6        .byte $F6   ; 
- D 3 - I - 0x03F3E3 0F:93D3: 96        .byte $96   ; 
- D 3 - I - 0x03F3E4 0F:93D4: F6        .byte $F6   ; 
- D 3 - I - 0x03F3E5 0F:93D5: 9B        .byte $9B   ; 
- D 3 - I - 0x03F3E6 0F:93D6: F6        .byte $F6   ; 
- D 3 - I - 0x03F3E7 0F:93D7: 9F        .byte $9F   ; 
- D 3 - I - 0x03F3E8 0F:93D8: F6        .byte $F6   ; 
- D 3 - I - 0x03F3E9 0F:93D9: A5        .byte $A5   ; 
- D 3 - I - 0x03F3EA 0F:93DA: F6        .byte $F6   ; 
- D 3 - I - 0x03F3EB 0F:93DB: AA        .byte $AA   ; 
- D 3 - I - 0x03F3EC 0F:93DC: F6        .byte $F6   ; 
- D 3 - I - 0x03F3ED 0F:93DD: B1        .byte $B1   ; 
- D 3 - I - 0x03F3EE 0F:93DE: F6        .byte $F6   ; 
- D 3 - I - 0x03F3EF 0F:93DF: B7        .byte $B7   ; 
- D 3 - I - 0x03F3F0 0F:93E0: F6        .byte $F6   ; 
- D 3 - I - 0x03F3F1 0F:93E1: BE        .byte $BE   ; 
- D 3 - I - 0x03F3F2 0F:93E2: F6        .byte $F6   ; 
- D 3 - I - 0x03F3F3 0F:93E3: C3        .byte $C3   ; 
- D 3 - I - 0x03F3F4 0F:93E4: F6        .byte $F6   ; 
- D 3 - I - 0x03F3F5 0F:93E5: C7        .byte $C7   ; 
- D 3 - I - 0x03F3F6 0F:93E6: F6        .byte $F6   ; 
- D 3 - I - 0x03F3F7 0F:93E7: CC        .byte $CC   ; 
- D 3 - I - 0x03F3F8 0F:93E8: F6        .byte $F6   ; 
- D 3 - I - 0x03F3F9 0F:93E9: D3        .byte $D3   ; 
- D 3 - I - 0x03F3FA 0F:93EA: F6        .byte $F6   ; 
- D 3 - I - 0x03F3FB 0F:93EB: D8        .byte $D8   ; 
- D 3 - I - 0x03F3FC 0F:93EC: F6        .byte $F6   ; 
- D 3 - I - 0x03F3FD 0F:93ED: DE        .byte $DE   ; 
- D 3 - I - 0x03F3FE 0F:93EE: F6        .byte $F6   ; 
- D 3 - I - 0x03F3FF 0F:93EF: E3        .byte $E3   ; 
- D 3 - I - 0x03F400 0F:93F0: F6        .byte $F6   ; 
- D 3 - I - 0x03F401 0F:93F1: EA        .byte $EA   ; 
- D 3 - I - 0x03F402 0F:93F2: F6        .byte $F6   ; 
- D 3 - I - 0x03F403 0F:93F3: EF        .byte $EF   ; 
- D 3 - I - 0x03F404 0F:93F4: F6        .byte $F6   ; 
- D 3 - I - 0x03F405 0F:93F5: F3        .byte $F3   ; 
- D 3 - I - 0x03F406 0F:93F6: F6        .byte $F6   ; 
- D 3 - I - 0x03F407 0F:93F7: F8        .byte $F8   ; 
- D 3 - I - 0x03F408 0F:93F8: F6        .byte $F6   ; 
- D 3 - I - 0x03F409 0F:93F9: FE        .byte $FE   ; 
- D 3 - I - 0x03F40A 0F:93FA: F6        .byte $F6   ; 
- D 3 - I - 0x03F40B 0F:93FB: 04        .byte $04   ; 
- D 3 - I - 0x03F40C 0F:93FC: F7        .byte $F7   ; 
- D 3 - I - 0x03F40D 0F:93FD: 0A        .byte $0A   ; 
- D 3 - I - 0x03F40E 0F:93FE: F7        .byte $F7   ; 
- D 3 - I - 0x03F40F 0F:93FF: 0F        .byte $0F   ; 
- D 3 - I - 0x03F410 0F:9400: F7        .byte $F7   ; 
- D 3 - I - 0x03F411 0F:9401: 13        .byte $13   ; 
- D 3 - I - 0x03F412 0F:9402: F7        .byte $F7   ; 
- D 3 - I - 0x03F413 0F:9403: 18        .byte $18   ; 
- D 3 - I - 0x03F414 0F:9404: F7        .byte $F7   ; 
- D 3 - I - 0x03F415 0F:9405: 1B        .byte $1B   ; 
- D 3 - I - 0x03F416 0F:9406: F7        .byte $F7   ; 
- D 3 - I - 0x03F417 0F:9407: 22        .byte $22   ; 
- D 3 - I - 0x03F418 0F:9408: F7        .byte $F7   ; 
- D 3 - I - 0x03F419 0F:9409: 28        .byte $28   ; 
- D 3 - I - 0x03F41A 0F:940A: F7        .byte $F7   ; 
- D 3 - I - 0x03F41B 0F:940B: 2D        .byte $2D   ; 
- D 3 - I - 0x03F41C 0F:940C: F7        .byte $F7   ; 
- D 3 - I - 0x03F41D 0F:940D: 32        .byte $32   ; <2>
- D 3 - I - 0x03F41E 0F:940E: F7        .byte $F7   ; 
- D 3 - I - 0x03F41F 0F:940F: 38        .byte $38   ; <8>
- D 3 - I - 0x03F420 0F:9410: F7        .byte $F7   ; 
- D 3 - I - 0x03F421 0F:9411: 3F        .byte $3F   ; 
- D 3 - I - 0x03F422 0F:9412: F7        .byte $F7   ; 
- D 3 - I - 0x03F423 0F:9413: 45        .byte $45   ; <E>
- D 3 - I - 0x03F424 0F:9414: F7        .byte $F7   ; 
- D 3 - I - 0x03F425 0F:9415: 4B        .byte $4B   ; <K>
- D 3 - I - 0x03F426 0F:9416: F7        .byte $F7   ; 
- D 3 - I - 0x03F427 0F:9417: 51        .byte $51   ; <Q>
- D 3 - I - 0x03F428 0F:9418: F7        .byte $F7   ; 
- D 3 - I - 0x03F429 0F:9419: 56        .byte $56   ; <V>
- D 3 - I - 0x03F42A 0F:941A: F7        .byte $F7   ; 
- D 3 - I - 0x03F42B 0F:941B: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03F42C 0F:941C: F7        .byte $F7   ; 
- D 3 - I - 0x03F42D 0F:941D: 61        .byte $61   ; <a>
- D 3 - I - 0x03F42E 0F:941E: F7        .byte $F7   ; 
- D 3 - I - 0x03F42F 0F:941F: 69        .byte $69   ; <i>
- D 3 - I - 0x03F430 0F:9420: F7        .byte $F7   ; 
- D 3 - I - 0x03F431 0F:9421: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F432 0F:9422: F7        .byte $F7   ; 
- D 3 - I - 0x03F433 0F:9423: 75        .byte $75   ; <u>
- D 3 - I - 0x03F434 0F:9424: F7        .byte $F7   ; 
- D 3 - I - 0x03F435 0F:9425: 7A        .byte $7A   ; <z>
- D 3 - I - 0x03F436 0F:9426: F7        .byte $F7   ; 
- D 3 - I - 0x03F437 0F:9427: 80        .byte $80   ; 
- D 3 - I - 0x03F438 0F:9428: F7        .byte $F7   ; 
- D 3 - I - 0x03F439 0F:9429: 84        .byte $84   ; 
- D 3 - I - 0x03F43A 0F:942A: F7        .byte $F7   ; 
- D 3 - I - 0x03F43B 0F:942B: 88        .byte $88   ; 
- D 3 - I - 0x03F43C 0F:942C: F7        .byte $F7   ; 
- D 3 - I - 0x03F43D 0F:942D: 8D        .byte $8D   ; 
- D 3 - I - 0x03F43E 0F:942E: F7        .byte $F7   ; 
- D 3 - I - 0x03F43F 0F:942F: 91        .byte $91   ; 
- D 3 - I - 0x03F440 0F:9430: F7        .byte $F7   ; 
- D 3 - I - 0x03F441 0F:9431: 95        .byte $95   ; 
- D 3 - I - 0x03F442 0F:9432: F7        .byte $F7   ; 
- D 3 - I - 0x03F443 0F:9433: 9A        .byte $9A   ; 
- D 3 - I - 0x03F444 0F:9434: F7        .byte $F7   ; 
- D 3 - I - 0x03F445 0F:9435: 9E        .byte $9E   ; 
- D 3 - I - 0x03F446 0F:9436: F7        .byte $F7   ; 
- D 3 - I - 0x03F447 0F:9437: A4        .byte $A4   ; 
- D 3 - I - 0x03F448 0F:9438: F7        .byte $F7   ; 
- D 3 - I - 0x03F449 0F:9439: AB        .byte $AB   ; 
- D 3 - I - 0x03F44A 0F:943A: F7        .byte $F7   ; 
- D 3 - I - 0x03F44B 0F:943B: AF        .byte $AF   ; 
- D 3 - I - 0x03F44C 0F:943C: F7        .byte $F7   ; 
- D 3 - I - 0x03F44D 0F:943D: B3        .byte $B3   ; 
- D 3 - I - 0x03F44E 0F:943E: F7        .byte $F7   ; 
- D 3 - I - 0x03F44F 0F:943F: B9        .byte $B9   ; 
- D 3 - I - 0x03F450 0F:9440: F7        .byte $F7   ; 
- D 3 - I - 0x03F451 0F:9441: BD        .byte $BD   ; 
- D 3 - I - 0x03F452 0F:9442: F7        .byte $F7   ; 
- D 3 - I - 0x03F453 0F:9443: C5        .byte $C5   ; 
- D 3 - I - 0x03F454 0F:9444: F7        .byte $F7   ; 
- D 3 - I - 0x03F455 0F:9445: CD        .byte $CD   ; 
- D 3 - I - 0x03F456 0F:9446: F7        .byte $F7   ; 
- D 3 - I - 0x03F457 0F:9447: D2        .byte $D2   ; 
- D 3 - I - 0x03F458 0F:9448: F7        .byte $F7   ; 
- D 3 - I - 0x03F459 0F:9449: DB        .byte $DB   ; 
- D 3 - I - 0x03F45A 0F:944A: F7        .byte $F7   ; 
- D 3 - I - 0x03F45B 0F:944B: E1        .byte $E1   ; 
- D 3 - I - 0x03F45C 0F:944C: F7        .byte $F7   ; 
- D 3 - I - 0x03F45D 0F:944D: E8        .byte $E8   ; 
- D 3 - I - 0x03F45E 0F:944E: F7        .byte $F7   ; 
- D 3 - I - 0x03F45F 0F:944F: ED        .byte $ED   ; 
- D 3 - I - 0x03F460 0F:9450: F7        .byte $F7   ; 
- D 3 - I - 0x03F461 0F:9451: F2        .byte $F2   ; 
- D 3 - I - 0x03F462 0F:9452: F7        .byte $F7   ; 
- D 3 - I - 0x03F463 0F:9453: F7        .byte $F7   ; 
- D 3 - I - 0x03F464 0F:9454: F7        .byte $F7   ; 
- D 3 - I - 0x03F465 0F:9455: FC        .byte $FC   ; 
- D 3 - I - 0x03F466 0F:9456: F7        .byte $F7   ; 
- D 3 - I - 0x03F467 0F:9457: 01        .byte $01   ; 
- D 3 - I - 0x03F468 0F:9458: F8        .byte $F8   ; 
- D 3 - I - 0x03F469 0F:9459: 08        .byte $08   ; 
- D 3 - I - 0x03F46A 0F:945A: F8        .byte $F8   ; 
- D 3 - I - 0x03F46B 0F:945B: 0E        .byte $0E   ; 
- D 3 - I - 0x03F46C 0F:945C: F8        .byte $F8   ; 
- D 3 - I - 0x03F46D 0F:945D: 13        .byte $13   ; 
- D 3 - I - 0x03F46E 0F:945E: F8        .byte $F8   ; 
- D 3 - I - 0x03F46F 0F:945F: 18        .byte $18   ; 
- D 3 - I - 0x03F470 0F:9460: F8        .byte $F8   ; 
- D 3 - I - 0x03F471 0F:9461: 20        .byte $20   ; 
- D 3 - I - 0x03F472 0F:9462: F8        .byte $F8   ; 
- D 3 - I - 0x03F473 0F:9463: 26        .byte $26   ; 
- D 3 - I - 0x03F474 0F:9464: F8        .byte $F8   ; 
- D 3 - I - 0x03F475 0F:9465: 2F        .byte $2F   ; 
- D 3 - I - 0x03F476 0F:9466: F8        .byte $F8   ; 
- D 3 - I - 0x03F477 0F:9467: 3B        .byte $3B   ; 
- D 3 - I - 0x03F478 0F:9468: F8        .byte $F8   ; 
- D 3 - I - 0x03F479 0F:9469: 44        .byte $44   ; <D>
- D 3 - I - 0x03F47A 0F:946A: F8        .byte $F8   ; 
- D 3 - I - 0x03F47B 0F:946B: 50        .byte $50   ; <P>
- D 3 - I - 0x03F47C 0F:946C: F8        .byte $F8   ; 
- D 3 - I - 0x03F47D 0F:946D: 59        .byte $59   ; <Y>
- D 3 - I - 0x03F47E 0F:946E: F8        .byte $F8   ; 
- D 3 - I - 0x03F47F 0F:946F: 64        .byte $64   ; <d>
- D 3 - I - 0x03F480 0F:9470: F8        .byte $F8   ; 
- D 3 - I - 0x03F481 0F:9471: 6C        .byte $6C   ; <l>
- D 3 - I - 0x03F482 0F:9472: F8        .byte $F8   ; 
- D 3 - I - 0x03F483 0F:9473: 79        .byte $79   ; <y>
- D 3 - I - 0x03F484 0F:9474: F8        .byte $F8   ; 
- D 3 - I - 0x03F485 0F:9475: 82        .byte $82   ; 
- D 3 - I - 0x03F486 0F:9476: F8        .byte $F8   ; 
- D 3 - I - 0x03F487 0F:9477: 8B        .byte $8B   ; 
- D 3 - I - 0x03F488 0F:9478: F8        .byte $F8   ; 
- D 3 - I - 0x03F489 0F:9479: 97        .byte $97   ; 
- D 3 - I - 0x03F48A 0F:947A: F8        .byte $F8   ; 
- D 3 - I - 0x03F48B 0F:947B: A2        .byte $A2   ; 
- D 3 - I - 0x03F48C 0F:947C: F8        .byte $F8   ; 
- D 3 - I - 0x03F48D 0F:947D: AE        .byte $AE   ; 
- D 3 - I - 0x03F48E 0F:947E: F8        .byte $F8   ; 
- D 3 - I - 0x03F48F 0F:947F: BC        .byte $BC   ; 
- D 3 - I - 0x03F490 0F:9480: F8        .byte $F8   ; 
- D 3 - I - 0x03F491 0F:9481: C5        .byte $C5   ; 
- D 3 - I - 0x03F492 0F:9482: F8        .byte $F8   ; 
- D 3 - I - 0x03F493 0F:9483: CB        .byte $CB   ; 
- D 3 - I - 0x03F494 0F:9484: F8        .byte $F8   ; 
- D 3 - I - 0x03F495 0F:9485: D6        .byte $D6   ; 
- D 3 - I - 0x03F496 0F:9486: F8        .byte $F8   ; 
- D 3 - I - 0x03F497 0F:9487: DE        .byte $DE   ; 
- D 3 - I - 0x03F498 0F:9488: F8        .byte $F8   ; 
- D 3 - I - 0x03F499 0F:9489: E8        .byte $E8   ; 
- D 3 - I - 0x03F49A 0F:948A: F8        .byte $F8   ; 
- D 3 - I - 0x03F49B 0F:948B: F2        .byte $F2   ; 
- D 3 - I - 0x03F49C 0F:948C: F8        .byte $F8   ; 
- D 3 - I - 0x03F49D 0F:948D: FA        .byte $FA   ; 
- D 3 - I - 0x03F49E 0F:948E: F8        .byte $F8   ; 
- D 3 - I - 0x03F49F 0F:948F: 03        .byte $03   ; 
- D 3 - I - 0x03F4A0 0F:9490: F9        .byte $F9   ; 
- D 3 - I - 0x03F4A1 0F:9491: 0D        .byte $0D   ; 
- D 3 - I - 0x03F4A2 0F:9492: F9        .byte $F9   ; 
- D 3 - I - 0x03F4A3 0F:9493: 16        .byte $16   ; 
- D 3 - I - 0x03F4A4 0F:9494: F9        .byte $F9   ; 
- D 3 - I - 0x03F4A5 0F:9495: 20        .byte $20   ; 
- D 3 - I - 0x03F4A6 0F:9496: F9        .byte $F9   ; 
- D 3 - I - 0x03F4A7 0F:9497: 2A        .byte $2A   ; 
- D 3 - I - 0x03F4A8 0F:9498: F9        .byte $F9   ; 
- D 3 - I - 0x03F4A9 0F:9499: 32        .byte $32   ; <2>
- D 3 - I - 0x03F4AA 0F:949A: F9        .byte $F9   ; 
- D 3 - I - 0x03F4AB 0F:949B: 3A        .byte $3A   ; 
- D 3 - I - 0x03F4AC 0F:949C: F9        .byte $F9   ; 
- D 3 - I - 0x03F4AD 0F:949D: 44        .byte $44   ; <D>
- D 3 - I - 0x03F4AE 0F:949E: F9        .byte $F9   ; 
- D 3 - I - 0x03F4AF 0F:949F: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F4B0 0F:94A0: F9        .byte $F9   ; 
- D 3 - I - 0x03F4B1 0F:94A1: 57        .byte $57   ; <W>
- D 3 - I - 0x03F4B2 0F:94A2: F9        .byte $F9   ; 
- D 3 - I - 0x03F4B3 0F:94A3: 5E        .byte $5E   ; 
- D 3 - I - 0x03F4B4 0F:94A4: F9        .byte $F9   ; 
- D 3 - I - 0x03F4B5 0F:94A5: 63        .byte $63   ; <c>
- D 3 - I - 0x03F4B6 0F:94A6: F9        .byte $F9   ; 
- D 3 - I - 0x03F4B7 0F:94A7: 6A        .byte $6A   ; <j>
- D 3 - I - 0x03F4B8 0F:94A8: F9        .byte $F9   ; 
- D 3 - I - 0x03F4B9 0F:94A9: 74        .byte $74   ; <t>
- D 3 - I - 0x03F4BA 0F:94AA: F9        .byte $F9   ; 
- D 3 - I - 0x03F4BB 0F:94AB: 7D        .byte $7D   ; 
- D 3 - I - 0x03F4BC 0F:94AC: F9        .byte $F9   ; 
- D 3 - I - 0x03F4BD 0F:94AD: 86        .byte $86   ; 
- D 3 - I - 0x03F4BE 0F:94AE: F9        .byte $F9   ; 
- D 3 - I - 0x03F4BF 0F:94AF: 8F        .byte $8F   ; 
- D 3 - I - 0x03F4C0 0F:94B0: F9        .byte $F9   ; 
- D 3 - I - 0x03F4C1 0F:94B1: 99        .byte $99   ; 
- D 3 - I - 0x03F4C2 0F:94B2: F9        .byte $F9   ; 
- D 3 - I - 0x03F4C3 0F:94B3: 9C        .byte $9C   ; 
- D 3 - I - 0x03F4C4 0F:94B4: F9        .byte $F9   ; 
- D 3 - I - 0x03F4C5 0F:94B5: A3        .byte $A3   ; 
- D 3 - I - 0x03F4C6 0F:94B6: F9        .byte $F9   ; 
- D 3 - I - 0x03F4C7 0F:94B7: AA        .byte $AA   ; 
- D 3 - I - 0x03F4C8 0F:94B8: F9        .byte $F9   ; 
- D 3 - I - 0x03F4C9 0F:94B9: B3        .byte $B3   ; 
- D 3 - I - 0x03F4CA 0F:94BA: F9        .byte $F9   ; 
- D 3 - I - 0x03F4CB 0F:94BB: BC        .byte $BC   ; 
- D 3 - I - 0x03F4CC 0F:94BC: F9        .byte $F9   ; 
- D 3 - I - 0x03F4CD 0F:94BD: C5        .byte $C5   ; 
- D 3 - I - 0x03F4CE 0F:94BE: F9        .byte $F9   ; 
- D 3 - I - 0x03F4CF 0F:94BF: CD        .byte $CD   ; 
- D 3 - I - 0x03F4D0 0F:94C0: F9        .byte $F9   ; 
- D 3 - I - 0x03F4D1 0F:94C1: D6        .byte $D6   ; 
- D 3 - I - 0x03F4D2 0F:94C2: F9        .byte $F9   ; 
- D 3 - I - 0x03F4D3 0F:94C3: E0        .byte $E0   ; 
- D 3 - I - 0x03F4D4 0F:94C4: F9        .byte $F9   ; 
- D 3 - I - 0x03F4D5 0F:94C5: E5        .byte $E5   ; 
- D 3 - I - 0x03F4D6 0F:94C6: F9        .byte $F9   ; 
- D 3 - I - 0x03F4D7 0F:94C7: EE        .byte $EE   ; 
- D 3 - I - 0x03F4D8 0F:94C8: F9        .byte $F9   ; 
- D 3 - I - 0x03F4D9 0F:94C9: F8        .byte $F8   ; 
- D 3 - I - 0x03F4DA 0F:94CA: F9        .byte $F9   ; 
- D 3 - I - 0x03F4DB 0F:94CB: 00        .byte $00   ; 
- D 3 - I - 0x03F4DC 0F:94CC: FA        .byte $FA   ; 
- D 3 - I - 0x03F4DD 0F:94CD: 05        .byte $05   ; 
- D 3 - I - 0x03F4DE 0F:94CE: FA        .byte $FA   ; 
- D 3 - I - 0x03F4DF 0F:94CF: 0F        .byte $0F   ; 
- D 3 - I - 0x03F4E0 0F:94D0: FA        .byte $FA   ; 
- D 3 - I - 0x03F4E1 0F:94D1: 18        .byte $18   ; 
- D 3 - I - 0x03F4E2 0F:94D2: FA        .byte $FA   ; 
- D 3 - I - 0x03F4E3 0F:94D3: 20        .byte $20   ; 
- D 3 - I - 0x03F4E4 0F:94D4: FA        .byte $FA   ; 
- - - - - - 0x03F4E5 0F:94D5: 29        .byte $29   ; 
- - - - - - 0x03F4E6 0F:94D6: FA        .byte $FA   ; 
- D 3 - I - 0x03F4E7 0F:94D7: 2E        .byte $2E   ; 
- D 3 - I - 0x03F4E8 0F:94D8: FA        .byte $FA   ; 
- D 3 - I - 0x03F4E9 0F:94D9: 34        .byte $34   ; <4>
- D 3 - I - 0x03F4EA 0F:94DA: FA        .byte $FA   ; 
- D 3 - I - 0x03F4EB 0F:94DB: 3F        .byte $3F   ; 
- D 3 - I - 0x03F4EC 0F:94DC: FA        .byte $FA   ; 
- D 3 - I - 0x03F4ED 0F:94DD: 44        .byte $44   ; <D>
- D 3 - I - 0x03F4EE 0F:94DE: FA        .byte $FA   ; 
- D 3 - I - 0x03F4EF 0F:94DF: 48        .byte $48   ; <H>
- D 3 - I - 0x03F4F0 0F:94E0: FA        .byte $FA   ; 
- - - - - - 0x03F4F1 0F:94E1: 4D        .byte $4D   ; <M>
- - - - - - 0x03F4F2 0F:94E2: FA        .byte $FA   ; 
- - - - - - 0x03F4F3 0F:94E3: 52        .byte $52   ; <R>
- - - - - - 0x03F4F4 0F:94E4: FA        .byte $FA   ; 
- - - - - - 0x03F4F5 0F:94E5: 57        .byte $57   ; <W>
- - - - - - 0x03F4F6 0F:94E6: FA        .byte $FA   ; 
- - - - - - 0x03F4F7 0F:94E7: 5C        .byte $5C   ; 
- - - - - - 0x03F4F8 0F:94E8: FA        .byte $FA   ; 
- D 3 - I - 0x03F4F9 0F:94E9: 61        .byte $61   ; <a>
- D 3 - I - 0x03F4FA 0F:94EA: FA        .byte $FA   ; 
- - - - - - 0x03F4FB 0F:94EB: 68        .byte $68   ; <h>
- - - - - - 0x03F4FC 0F:94EC: FA        .byte $FA   ; 
- - - - - - 0x03F4FD 0F:94ED: 71        .byte $71   ; <q>
- - - - - - 0x03F4FE 0F:94EE: FA        .byte $FA   ; 
- - - - - - 0x03F4FF 0F:94EF: 79        .byte $79   ; <y>
- - - - - - 0x03F500 0F:94F0: FA        .byte $FA   ; 
- D 3 - I - 0x03F501 0F:94F1: 83        .byte $83   ; 
- D 3 - I - 0x03F502 0F:94F2: FA        .byte $FA   ; 
- D 3 - I - 0x03F503 0F:94F3: 89        .byte $89   ; 
- D 3 - I - 0x03F504 0F:94F4: FA        .byte $FA   ; 
- D 3 - I - 0x03F505 0F:94F5: 90        .byte $90   ; 
- D 3 - I - 0x03F506 0F:94F6: FA        .byte $FA   ; 
- D 3 - I - 0x03F507 0F:94F7: 96        .byte $96   ; 
- D 3 - I - 0x03F508 0F:94F8: FA        .byte $FA   ; 
- D 3 - I - 0x03F509 0F:94F9: 9C        .byte $9C   ; 
- D 3 - I - 0x03F50A 0F:94FA: FA        .byte $FA   ; 
- D 3 - I - 0x03F50B 0F:94FB: A4        .byte $A4   ; 
- D 3 - I - 0x03F50C 0F:94FC: FA        .byte $FA   ; 
- D 3 - I - 0x03F50D 0F:94FD: A9        .byte $A9   ; 
- D 3 - I - 0x03F50E 0F:94FE: FA        .byte $FA   ; 
- D 3 - I - 0x03F50F 0F:94FF: B0        .byte $B0   ; 
- D 3 - I - 0x03F510 0F:9500: FA        .byte $FA   ; 
- D 3 - I - 0x03F511 0F:9501: B7        .byte $B7   ; 
- D 3 - I - 0x03F512 0F:9502: FA        .byte $FA   ; 
- D 3 - I - 0x03F513 0F:9503: C0        .byte $C0   ; 
- D 3 - I - 0x03F514 0F:9504: FA        .byte $FA   ; 
- D 3 - I - 0x03F515 0F:9505: C4        .byte $C4   ; 
- D 3 - I - 0x03F516 0F:9506: FA        .byte $FA   ; 
- D 3 - I - 0x03F517 0F:9507: C8        .byte $C8   ; 
- D 3 - I - 0x03F518 0F:9508: FA        .byte $FA   ; 
- D 3 - I - 0x03F519 0F:9509: 12        .byte $12   ; 
- D 3 - I - 0x03F51A 0F:950A: AF        .byte $AF   ; 
- D 3 - I - 0x03F51B 0F:950B: 0B        .byte $0B   ; 
- D 3 - I - 0x03F51C 0F:950C: FC        .byte $FC   ; 
- D 3 - I - 0x03F51D 0F:950D: 6A        .byte $6A   ; <j>
- D 3 - I - 0x03F51E 0F:950E: 55        .byte $55   ; <U>
- D 3 - I - 0x03F51F 0F:950F: 7D        .byte $7D   ; 
- D 3 - I - 0x03F520 0F:9510: 54        .byte $54   ; <T>
- D 3 - I - 0x03F521 0F:9511: FC        .byte $FC   ; 
- D 3 - I - 0x03F522 0F:9512: 68        .byte $68   ; <h>
- D 3 - I - 0x03F523 0F:9513: 5F        .byte $5F   ; 
- D 3 - I - 0x03F524 0F:9514: FC        .byte $FC   ; 
- D 3 - I - 0x03F525 0F:9515: 5F        .byte $5F   ; 
- D 3 - I - 0x03F526 0F:9516: 68        .byte $68   ; <h>
- D 3 - I - 0x03F527 0F:9517: 7D        .byte $7D   ; 
- D 3 - I - 0x03F528 0F:9518: 56        .byte $56   ; <V>
- D 3 - I - 0x03F529 0F:9519: FC        .byte $FC   ; 
- D 3 - I - 0x03F52A 0F:951A: 41        .byte $41   ; <A>
- D 3 - I - 0x03F52B 0F:951B: 5F        .byte $5F   ; 
- D 3 - I - 0x03F52C 0F:951C: 67        .byte $67   ; <g>
- D 3 - I - 0x03F52D 0F:951D: 43        .byte $43   ; <C>
- D 3 - I - 0x03F52E 0F:951E: FC        .byte $FC   ; 
- D 3 - I - 0x03F52F 0F:951F: C2        .byte $C2   ; 
- D 3 - I - 0x03F530 0F:9520: 54        .byte $54   ; <T>
- D 3 - I - 0x03F531 0F:9521: 7D        .byte $7D   ; 
- D 3 - I - 0x03F532 0F:9522: 69        .byte $69   ; <i>
- D 3 - I - 0x03F533 0F:9523: FC        .byte $FC   ; 
- D 3 - I - 0x03F534 0F:9524: C3        .byte $C3   ; 
- D 3 - I - 0x03F535 0F:9525: 51        .byte $51   ; <Q>
- D 3 - I - 0x03F536 0F:9526: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F537 0F:9527: 50        .byte $50   ; <P>
- D 3 - I - 0x03F538 0F:9528: FC        .byte $FC   ; 
- D 3 - I - 0x03F539 0F:9529: 50        .byte $50   ; <P>
- D 3 - I - 0x03F53A 0F:952A: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03F53B 0F:952B: 5F        .byte $5F   ; 
- D 3 - I - 0x03F53C 0F:952C: 50        .byte $50   ; <P>
- D 3 - I - 0x03F53D 0F:952D: FC        .byte $FC   ; 
- D 3 - I - 0x03F53E 0F:952E: C3        .byte $C3   ; 
- D 3 - I - 0x03F53F 0F:952F: C4        .byte $C4   ; 
- D 3 - I - 0x03F540 0F:9530: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F541 0F:9531: 54        .byte $54   ; <T>
- D 3 - I - 0x03F542 0F:9532: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F543 0F:9533: FC        .byte $FC   ; 
- D 3 - I - 0x03F544 0F:9534: BA        .byte $BA   ; 
- D 3 - I - 0x03F545 0F:9535: 43        .byte $43   ; <C>
- D 3 - I - 0x03F546 0F:9536: FC        .byte $FC   ; 
- D 3 - I - 0x03F547 0F:9537: CF        .byte $CF   ; 
- D 3 - I - 0x03F548 0F:9538: 67        .byte $67   ; <g>
- D 3 - I - 0x03F549 0F:9539: 54        .byte $54   ; <T>
- D 3 - I - 0x03F54A 0F:953A: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F54B 0F:953B: FC        .byte $FC   ; 
- D 3 - I - 0x03F54C 0F:953C: 03        .byte $03   ; 
- D 3 - I - 0x03F54D 0F:953D: 27        .byte $27   ; 
- D 3 - I - 0x03F54E 0F:953E: B2        .byte $B2   ; 
- D 3 - I - 0x03F54F 0F:953F: FC        .byte $FC   ; 
- D 3 - I - 0x03F550 0F:9540: 07        .byte $07   ; 
- D 3 - I - 0x03F551 0F:9541: 0C        .byte $0C   ; 
- D 3 - I - 0x03F552 0F:9542: AA        .byte $AA   ; 
- D 3 - I - 0x03F553 0F:9543: FC        .byte $FC   ; 
- D 3 - I - 0x03F554 0F:9544: 15        .byte $15   ; 
- D 3 - I - 0x03F555 0F:9545: 06        .byte $06   ; 
- D 3 - I - 0x03F556 0F:9546: 24        .byte $24   ; 
- D 3 - I - 0x03F557 0F:9547: 1F        .byte $1F   ; 
- D 3 - I - 0x03F558 0F:9548: FC        .byte $FC   ; 
- D 3 - I - 0x03F559 0F:9549: 23        .byte $23   ; 
- D 3 - I - 0x03F55A 0F:954A: 28        .byte $28   ; 
- D 3 - I - 0x03F55B 0F:954B: 0B        .byte $0B   ; 
- D 3 - I - 0x03F55C 0F:954C: 07        .byte $07   ; 
- D 3 - I - 0x03F55D 0F:954D: FC        .byte $FC   ; 
- D 3 - I - 0x03F55E 0F:954E: 10        .byte $10   ; 
- D 3 - I - 0x03F55F 0F:954F: 06        .byte $06   ; 
- D 3 - I - 0x03F560 0F:9550: 0D        .byte $0D   ; 
- D 3 - I - 0x03F561 0F:9551: A1        .byte $A1   ; 
- D 3 - I - 0x03F562 0F:9552: FC        .byte $FC   ; 
- D 3 - I - 0x03F563 0F:9553: 20        .byte $20   ; 
- D 3 - I - 0x03F564 0F:9554: 0B        .byte $0B   ; 
- D 3 - I - 0x03F565 0F:9555: 07        .byte $07   ; 
- D 3 - I - 0x03F566 0F:9556: FC        .byte $FC   ; 
- D 3 - I - 0x03F567 0F:9557: 02        .byte $02   ; 
- D 3 - I - 0x03F568 0F:9558: A5        .byte $A5   ; 
- D 3 - I - 0x03F569 0F:9559: 2C        .byte $2C   ; 
- D 3 - I - 0x03F56A 0F:955A: FC        .byte $FC   ; 
- D 3 - I - 0x03F56B 0F:955B: 10        .byte $10   ; 
- D 3 - I - 0x03F56C 0F:955C: 07        .byte $07   ; 
- D 3 - I - 0x03F56D 0F:955D: FC        .byte $FC   ; 
- D 3 - I - 0x03F56E 0F:955E: 02        .byte $02   ; 
- D 3 - I - 0x03F56F 0F:955F: 0C        .byte $0C   ; 
- D 3 - I - 0x03F570 0F:9560: A5        .byte $A5   ; 
- D 3 - I - 0x03F571 0F:9561: 07        .byte $07   ; 
- D 3 - I - 0x03F572 0F:9562: FC        .byte $FC   ; 
- D 3 - I - 0x03F573 0F:9563: 16        .byte $16   ; 
- D 3 - I - 0x03F574 0F:9564: 2F        .byte $2F   ; 
- D 3 - I - 0x03F575 0F:9565: 10        .byte $10   ; 
- D 3 - I - 0x03F576 0F:9566: FC        .byte $FC   ; 
- D 3 - I - 0x03F577 0F:9567: 07        .byte $07   ; 
- D 3 - I - 0x03F578 0F:9568: 0D        .byte $0D   ; 
- D 3 - I - 0x03F579 0F:9569: A1        .byte $A1   ; 
- D 3 - I - 0x03F57A 0F:956A: FC        .byte $FC   ; 
- D 3 - I - 0x03F57B 0F:956B: 1F        .byte $1F   ; 
- D 3 - I - 0x03F57C 0F:956C: 0B        .byte $0B   ; 
- D 3 - I - 0x03F57D 0F:956D: 05        .byte $05   ; 
- D 3 - I - 0x03F57E 0F:956E: FC        .byte $FC   ; 
- D 3 - I - 0x03F57F 0F:956F: 06        .byte $06   ; 
- D 3 - I - 0x03F580 0F:9570: A7        .byte $A7   ; 
- D 3 - I - 0x03F581 0F:9571: 05        .byte $05   ; 
- D 3 - I - 0x03F582 0F:9572: FC        .byte $FC   ; 
- D 3 - I - 0x03F583 0F:9573: 0B        .byte $0B   ; 
- D 3 - I - 0x03F584 0F:9574: 19        .byte $19   ; 
- D 3 - I - 0x03F585 0F:9575: FC        .byte $FC   ; 
- D 3 - I - 0x03F586 0F:9576: 1B        .byte $1B   ; 
- D 3 - I - 0x03F587 0F:9577: 31        .byte $31   ; <1>
- D 3 - I - 0x03F588 0F:9578: 03        .byte $03   ; 
- D 3 - I - 0x03F589 0F:9579: A0        .byte $A0   ; 
- D 3 - I - 0x03F58A 0F:957A: FC        .byte $FC   ; 
- D 3 - I - 0x03F58B 0F:957B: 0F        .byte $0F   ; 
- D 3 - I - 0x03F58C 0F:957C: 03        .byte $03   ; 
- D 3 - I - 0x03F58D 0F:957D: AA        .byte $AA   ; 
- D 3 - I - 0x03F58E 0F:957E: FC        .byte $FC   ; 
- D 3 - I - 0x03F58F 0F:957F: A6        .byte $A6   ; 
- D 3 - I - 0x03F590 0F:9580: 14        .byte $14   ; 
- D 3 - I - 0x03F591 0F:9581: 03        .byte $03   ; 
- D 3 - I - 0x03F592 0F:9582: FC        .byte $FC   ; 
- D 3 - I - 0x03F593 0F:9583: 1F        .byte $1F   ; 
- D 3 - I - 0x03F594 0F:9584: 12        .byte $12   ; 
- D 3 - I - 0x03F595 0F:9585: 24        .byte $24   ; 
- D 3 - I - 0x03F596 0F:9586: 1F        .byte $1F   ; 
- D 3 - I - 0x03F597 0F:9587: FC        .byte $FC   ; 
- D 3 - I - 0x03F598 0F:9588: 0F        .byte $0F   ; 
- D 3 - I - 0x03F599 0F:9589: 28        .byte $28   ; 
- D 3 - I - 0x03F59A 0F:958A: 1F        .byte $1F   ; 
- D 3 - I - 0x03F59B 0F:958B: 11        .byte $11   ; 
- D 3 - I - 0x03F59C 0F:958C: FC        .byte $FC   ; 
- D 3 - I - 0x03F59D 0F:958D: 0B        .byte $0B   ; 
- D 3 - I - 0x03F59E 0F:958E: 2C        .byte $2C   ; 
- D 3 - I - 0x03F59F 0F:958F: AA        .byte $AA   ; 
- D 3 - I - 0x03F5A0 0F:9590: FC        .byte $FC   ; 
- D 3 - I - 0x03F5A1 0F:9591: 20        .byte $20   ; 
- D 3 - I - 0x03F5A2 0F:9592: 0D        .byte $0D   ; 
- D 3 - I - 0x03F5A3 0F:9593: A1        .byte $A1   ; 
- D 3 - I - 0x03F5A4 0F:9594: FC        .byte $FC   ; 
- D 3 - I - 0x03F5A5 0F:9595: 2C        .byte $2C   ; 
- D 3 - I - 0x03F5A6 0F:9596: 06        .byte $06   ; 
- D 3 - I - 0x03F5A7 0F:9597: AF        .byte $AF   ; 
- D 3 - I - 0x03F5A8 0F:9598: 24        .byte $24   ; 
- D 3 - I - 0x03F5A9 0F:9599: 0C        .byte $0C   ; 
- D 3 - I - 0x03F5AA 0F:959A: FC        .byte $FC   ; 
- D 3 - I - 0x03F5AB 0F:959B: 2C        .byte $2C   ; 
- D 3 - I - 0x03F5AC 0F:959C: 06        .byte $06   ; 
- D 3 - I - 0x03F5AD 0F:959D: 0C        .byte $0C   ; 
- D 3 - I - 0x03F5AE 0F:959E: 1F        .byte $1F   ; 
- D 3 - I - 0x03F5AF 0F:959F: AC        .byte $AC   ; 
- D 3 - I - 0x03F5B0 0F:95A0: FC        .byte $FC   ; 
- D 3 - I - 0x03F5B1 0F:95A1: 4B        .byte $4B   ; <K>
- D 3 - I - 0x03F5B2 0F:95A2: 54        .byte $54   ; <T>
- D 3 - I - 0x03F5B3 0F:95A3: 69        .byte $69   ; <i>
- D 3 - I - 0x03F5B4 0F:95A4: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F5B5 0F:95A5: 53        .byte $53   ; <S>
- D 3 - I - 0x03F5B6 0F:95A6: B5        .byte $B5   ; 
- D 3 - I - 0x03F5B7 0F:95A7: FC        .byte $FC   ; 
- D 3 - I - 0x03F5B8 0F:95A8: 68        .byte $68   ; <h>
- D 3 - I - 0x03F5B9 0F:95A9: C6        .byte $C6   ; 
- D 3 - I - 0x03F5BA 0F:95AA: 68        .byte $68   ; <h>
- D 3 - I - 0x03F5BB 0F:95AB: 45        .byte $45   ; <E>
- D 3 - I - 0x03F5BC 0F:95AC: FC        .byte $FC   ; 
- D 3 - I - 0x03F5BD 0F:95AD: BE        .byte $BE   ; 
- D 3 - I - 0x03F5BE 0F:95AE: 3F        .byte $3F   ; 
- D 3 - I - 0x03F5BF 0F:95AF: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F5C0 0F:95B0: 69        .byte $69   ; <i>
- D 3 - I - 0x03F5C1 0F:95B1: C3        .byte $C3   ; 
- D 3 - I - 0x03F5C2 0F:95B2: FC        .byte $FC   ; 
- D 3 - I - 0x03F5C3 0F:95B3: 62        .byte $62   ; <b>
- D 3 - I - 0x03F5C4 0F:95B4: 45        .byte $45   ; <E>
- D 3 - I - 0x03F5C5 0F:95B5: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F5C6 0F:95B6: FC        .byte $FC   ; 
- D 3 - I - 0x03F5C7 0F:95B7: 54        .byte $54   ; <T>
- D 3 - I - 0x03F5C8 0F:95B8: 56        .byte $56   ; <V>
- D 3 - I - 0x03F5C9 0F:95B9: 7D        .byte $7D   ; 
- D 3 - I - 0x03F5CA 0F:95BA: 56        .byte $56   ; <V>
- D 3 - I - 0x03F5CB 0F:95BB: 72        .byte $72   ; <r>
- D 3 - I - 0x03F5CC 0F:95BC: FC        .byte $FC   ; 
- D 3 - I - 0x03F5CD 0F:95BD: 58        .byte $58   ; <X>
- D 3 - I - 0x03F5CE 0F:95BE: 42        .byte $42   ; <B>
- D 3 - I - 0x03F5CF 0F:95BF: FC        .byte $FC   ; 
- D 3 - I - 0x03F5D0 0F:95C0: B9        .byte $B9   ; 
- D 3 - I - 0x03F5D1 0F:95C1: B4        .byte $B4   ; 
- D 3 - I - 0x03F5D2 0F:95C2: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F5D3 0F:95C3: FC        .byte $FC   ; 
- D 3 - I - 0x03F5D4 0F:95C4: C1        .byte $C1   ; 
- D 3 - I - 0x03F5D5 0F:95C5: 74        .byte $74   ; <t>
- D 3 - I - 0x03F5D6 0F:95C6: 43        .byte $43   ; <C>
- D 3 - I - 0x03F5D7 0F:95C7: 4E        .byte $4E   ; <N>
- D 3 - I - 0x03F5D8 0F:95C8: 43        .byte $43   ; <C>
- D 3 - I - 0x03F5D9 0F:95C9: FC        .byte $FC   ; 
- D 3 - I - 0x03F5DA 0F:95CA: 46        .byte $46   ; <F>
- D 3 - I - 0x03F5DB 0F:95CB: 69        .byte $69   ; <i>
- D 3 - I - 0x03F5DC 0F:95CC: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F5DD 0F:95CD: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F5DE 0F:95CE: FC        .byte $FC   ; 
- D 3 - I - 0x03F5DF 0F:95CF: 4B        .byte $4B   ; <K>
- D 3 - I - 0x03F5E0 0F:95D0: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F5E1 0F:95D1: 50        .byte $50   ; <P>
- D 3 - I - 0x03F5E2 0F:95D2: 5F        .byte $5F   ; 
- D 3 - I - 0x03F5E3 0F:95D3: 68        .byte $68   ; <h>
- D 3 - I - 0x03F5E4 0F:95D4: 41        .byte $41   ; <A>
- D 3 - I - 0x03F5E5 0F:95D5: FC        .byte $FC   ; 
- D 3 - I - 0x03F5E6 0F:95D6: BA        .byte $BA   ; 
- D 3 - I - 0x03F5E7 0F:95D7: 75        .byte $75   ; <u>
- D 3 - I - 0x03F5E8 0F:95D8: 54        .byte $54   ; <T>
- D 3 - I - 0x03F5E9 0F:95D9: 7D        .byte $7D   ; 
- D 3 - I - 0x03F5EA 0F:95DA: 68        .byte $68   ; <h>
- D 3 - I - 0x03F5EB 0F:95DB: 45        .byte $45   ; <E>
- D 3 - I - 0x03F5EC 0F:95DC: FC        .byte $FC   ; 
- D 3 - I - 0x03F5ED 0F:95DD: A6        .byte $A6   ; 
- D 3 - I - 0x03F5EE 0F:95DE: 14        .byte $14   ; 
- D 3 - I - 0x03F5EF 0F:95DF: 03        .byte $03   ; 
- D 3 - I - 0x03F5F0 0F:95E0: FC        .byte $FC   ; 
- D 3 - I - 0x03F5F1 0F:95E1: 0B        .byte $0B   ; 
- D 3 - I - 0x03F5F2 0F:95E2: 19        .byte $19   ; 
- D 3 - I - 0x03F5F3 0F:95E3: FC        .byte $FC   ; 
- D 3 - I - 0x03F5F4 0F:95E4: 1F        .byte $1F   ; 
- D 3 - I - 0x03F5F5 0F:95E5: 0B        .byte $0B   ; 
- D 3 - I - 0x03F5F6 0F:95E6: 05        .byte $05   ; 
- D 3 - I - 0x03F5F7 0F:95E7: FC        .byte $FC   ; 
- D 3 - I - 0x03F5F8 0F:95E8: 06        .byte $06   ; 
- D 3 - I - 0x03F5F9 0F:95E9: A7        .byte $A7   ; 
- D 3 - I - 0x03F5FA 0F:95EA: 05        .byte $05   ; 
- D 3 - I - 0x03F5FB 0F:95EB: FC        .byte $FC   ; 
- D 3 - I - 0x03F5FC 0F:95EC: 0F        .byte $0F   ; 
- D 3 - I - 0x03F5FD 0F:95ED: 03        .byte $03   ; 
- D 3 - I - 0x03F5FE 0F:95EE: AA        .byte $AA   ; 
- D 3 - I - 0x03F5FF 0F:95EF: FC        .byte $FC   ; 
- D 3 - I - 0x03F600 0F:95F0: 15        .byte $15   ; 
- D 3 - I - 0x03F601 0F:95F1: 06        .byte $06   ; 
- D 3 - I - 0x03F602 0F:95F2: 16        .byte $16   ; 
- D 3 - I - 0x03F603 0F:95F3: 0C        .byte $0C   ; 
- D 3 - I - 0x03F604 0F:95F4: FC        .byte $FC   ; 
- D 3 - I - 0x03F605 0F:95F5: 20        .byte $20   ; 
- D 3 - I - 0x03F606 0F:95F6: 0D        .byte $0D   ; 
- D 3 - I - 0x03F607 0F:95F7: A1        .byte $A1   ; 
- D 3 - I - 0x03F608 0F:95F8: FC        .byte $FC   ; 
- D 3 - I - 0x03F609 0F:95F9: 1F        .byte $1F   ; 
- D 3 - I - 0x03F60A 0F:95FA: 12        .byte $12   ; 
- D 3 - I - 0x03F60B 0F:95FB: 24        .byte $24   ; 
- D 3 - I - 0x03F60C 0F:95FC: 1F        .byte $1F   ; 
- D 3 - I - 0x03F60D 0F:95FD: FC        .byte $FC   ; 
- D 3 - I - 0x03F60E 0F:95FE: 1B        .byte $1B   ; 
- D 3 - I - 0x03F60F 0F:95FF: 31        .byte $31   ; <1>
- D 3 - I - 0x03F610 0F:9600: 03        .byte $03   ; 
- D 3 - I - 0x03F611 0F:9601: A0        .byte $A0   ; 
- D 3 - I - 0x03F612 0F:9602: FC        .byte $FC   ; 
- D 3 - I - 0x03F613 0F:9603: 0F        .byte $0F   ; 
- D 3 - I - 0x03F614 0F:9604: 28        .byte $28   ; 
- D 3 - I - 0x03F615 0F:9605: 1F        .byte $1F   ; 
- D 3 - I - 0x03F616 0F:9606: 11        .byte $11   ; 
- D 3 - I - 0x03F617 0F:9607: FC        .byte $FC   ; 
- D 3 - I - 0x03F618 0F:9608: 0B        .byte $0B   ; 
- D 3 - I - 0x03F619 0F:9609: 2C        .byte $2C   ; 
- D 3 - I - 0x03F61A 0F:960A: AA        .byte $AA   ; 
- D 3 - I - 0x03F61B 0F:960B: FC        .byte $FC   ; 
- D 3 - I - 0x03F61C 0F:960C: 2C        .byte $2C   ; 
- D 3 - I - 0x03F61D 0F:960D: 06        .byte $06   ; 
- D 3 - I - 0x03F61E 0F:960E: 0C        .byte $0C   ; 
- D 3 - I - 0x03F61F 0F:960F: 1F        .byte $1F   ; 
- D 3 - I - 0x03F620 0F:9610: AC        .byte $AC   ; 
- D 3 - I - 0x03F621 0F:9611: FC        .byte $FC   ; 
- D 3 - I - 0x03F622 0F:9612: 67        .byte $67   ; <g>
- D 3 - I - 0x03F623 0F:9613: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F624 0F:9614: CE        .byte $CE   ; 
- D 3 - I - 0x03F625 0F:9615: 45        .byte $45   ; <E>
- D 3 - I - 0x03F626 0F:9616: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F627 0F:9617: FC        .byte $FC   ; 
- D 3 - I - 0x03F628 0F:9618: C4        .byte $C4   ; 
- D 3 - I - 0x03F629 0F:9619: 48        .byte $48   ; <H>
- D 3 - I - 0x03F62A 0F:961A: 54        .byte $54   ; <T>
- D 3 - I - 0x03F62B 0F:961B: 68        .byte $68   ; <h>
- D 3 - I - 0x03F62C 0F:961C: 7D        .byte $7D   ; 
- D 3 - I - 0x03F62D 0F:961D: 59        .byte $59   ; <Y>
- D 3 - I - 0x03F62E 0F:961E: FC        .byte $FC   ; 
- D 3 - I - 0x03F62F 0F:961F: BE        .byte $BE   ; 
- D 3 - I - 0x03F630 0F:9620: 3F        .byte $3F   ; 
- D 3 - I - 0x03F631 0F:9621: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F632 0F:9622: 69        .byte $69   ; <i>
- D 3 - I - 0x03F633 0F:9623: C3        .byte $C3   ; 
- D 3 - I - 0x03F634 0F:9624: FC        .byte $FC   ; 
- D 3 - I - 0x03F635 0F:9625: 46        .byte $46   ; <F>
- D 3 - I - 0x03F636 0F:9626: D0        .byte $D0   ; 
- D 3 - I - 0x03F637 0F:9627: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F638 0F:9628: 5F        .byte $5F   ; 
- D 3 - I - 0x03F639 0F:9629: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F63A 0F:962A: FC        .byte $FC   ; 
- D 3 - I - 0x03F63B 0F:962B: 46        .byte $46   ; <F>
- D 3 - I - 0x03F63C 0F:962C: 69        .byte $69   ; <i>
- D 3 - I - 0x03F63D 0F:962D: 52        .byte $52   ; <R>
- D 3 - I - 0x03F63E 0F:962E: FC        .byte $FC   ; 
- D 3 - I - 0x03F63F 0F:962F: 62        .byte $62   ; <b>
- D 3 - I - 0x03F640 0F:9630: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F641 0F:9631: 52        .byte $52   ; <R>
- D 3 - I - 0x03F642 0F:9632: 73        .byte $73   ; <s>
- D 3 - I - 0x03F643 0F:9633: FC        .byte $FC   ; 
- D 3 - I - 0x03F644 0F:9634: 2C        .byte $2C   ; 
- D 3 - I - 0x03F645 0F:9635: 06        .byte $06   ; 
- D 3 - I - 0x03F646 0F:9636: AF        .byte $AF   ; 
- D 3 - I - 0x03F647 0F:9637: 24        .byte $24   ; 
- D 3 - I - 0x03F648 0F:9638: 0C        .byte $0C   ; 
- D 3 - I - 0x03F649 0F:9639: FC        .byte $FC   ; 
- D 3 - I - 0x03F64A 0F:963A: 1B        .byte $1B   ; 
- D 3 - I - 0x03F64B 0F:963B: 31        .byte $31   ; <1>
- D 3 - I - 0x03F64C 0F:963C: 03        .byte $03   ; 
- D 3 - I - 0x03F64D 0F:963D: A0        .byte $A0   ; 
- D 3 - I - 0x03F64E 0F:963E: FC        .byte $FC   ; 
- D 3 - I - 0x03F64F 0F:963F: 16        .byte $16   ; 
- D 3 - I - 0x03F650 0F:9640: 2F        .byte $2F   ; 
- D 3 - I - 0x03F651 0F:9641: 10        .byte $10   ; 
- D 3 - I - 0x03F652 0F:9642: FC        .byte $FC   ; 
- D 3 - I - 0x03F653 0F:9643: 0B        .byte $0B   ; 
- D 3 - I - 0x03F654 0F:9644: 19        .byte $19   ; 
- D 3 - I - 0x03F655 0F:9645: FC        .byte $FC   ; 
- D 3 - I - 0x03F656 0F:9646: 20        .byte $20   ; 
- D 3 - I - 0x03F657 0F:9647: 0B        .byte $0B   ; 
- D 3 - I - 0x03F658 0F:9648: 07        .byte $07   ; 
- D 3 - I - 0x03F659 0F:9649: FC        .byte $FC   ; 
- D 3 - I - 0x03F65A 0F:964A: 20        .byte $20   ; 
- D 3 - I - 0x03F65B 0F:964B: 0D        .byte $0D   ; 
- D 3 - I - 0x03F65C 0F:964C: A1        .byte $A1   ; 
- D 3 - I - 0x03F65D 0F:964D: FC        .byte $FC   ; 
- D 3 - I - 0x03F65E 0F:964E: 1F        .byte $1F   ; 
- D 3 - I - 0x03F65F 0F:964F: 0B        .byte $0B   ; 
- D 3 - I - 0x03F660 0F:9650: 05        .byte $05   ; 
- D 3 - I - 0x03F661 0F:9651: FC        .byte $FC   ; 
- D 3 - I - 0x03F662 0F:9652: 06        .byte $06   ; 
- D 3 - I - 0x03F663 0F:9653: A7        .byte $A7   ; 
- D 3 - I - 0x03F664 0F:9654: 05        .byte $05   ; 
- D 3 - I - 0x03F665 0F:9655: FC        .byte $FC   ; 
- D 3 - I - 0x03F666 0F:9656: A6        .byte $A6   ; 
- D 3 - I - 0x03F667 0F:9657: 14        .byte $14   ; 
- D 3 - I - 0x03F668 0F:9658: 03        .byte $03   ; 
- D 3 - I - 0x03F669 0F:9659: FC        .byte $FC   ; 
- D 3 - I - 0x03F66A 0F:965A: 02        .byte $02   ; 
- D 3 - I - 0x03F66B 0F:965B: 0C        .byte $0C   ; 
- D 3 - I - 0x03F66C 0F:965C: A5        .byte $A5   ; 
- D 3 - I - 0x03F66D 0F:965D: 07        .byte $07   ; 
- D 3 - I - 0x03F66E 0F:965E: FC        .byte $FC   ; 
- D 3 - I - 0x03F66F 0F:965F: 0F        .byte $0F   ; 
- D 3 - I - 0x03F670 0F:9660: 03        .byte $03   ; 
- D 3 - I - 0x03F671 0F:9661: AA        .byte $AA   ; 
- D 3 - I - 0x03F672 0F:9662: FC        .byte $FC   ; 
- D 3 - I - 0x03F673 0F:9663: 1F        .byte $1F   ; 
- D 3 - I - 0x03F674 0F:9664: 12        .byte $12   ; 
- D 3 - I - 0x03F675 0F:9665: 24        .byte $24   ; 
- D 3 - I - 0x03F676 0F:9666: 1F        .byte $1F   ; 
- D 3 - I - 0x03F677 0F:9667: FC        .byte $FC   ; 
- D 3 - I - 0x03F678 0F:9668: 2C        .byte $2C   ; 
- D 3 - I - 0x03F679 0F:9669: 06        .byte $06   ; 
- D 3 - I - 0x03F67A 0F:966A: 0C        .byte $0C   ; 
- D 3 - I - 0x03F67B 0F:966B: 1F        .byte $1F   ; 
- D 3 - I - 0x03F67C 0F:966C: AC        .byte $AC   ; 
- D 3 - I - 0x03F67D 0F:966D: FC        .byte $FC   ; 
- D 3 - I - 0x03F67E 0F:966E: 68        .byte $68   ; <h>
- D 3 - I - 0x03F67F 0F:966F: 3F        .byte $3F   ; 
- D 3 - I - 0x03F680 0F:9670: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03F681 0F:9671: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F682 0F:9672: 58        .byte $58   ; <X>
- D 3 - I - 0x03F683 0F:9673: FC        .byte $FC   ; 
- D 3 - I - 0x03F684 0F:9674: 68        .byte $68   ; <h>
- D 3 - I - 0x03F685 0F:9675: 3F        .byte $3F   ; 
- D 3 - I - 0x03F686 0F:9676: C3        .byte $C3   ; 
- D 3 - I - 0x03F687 0F:9677: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F688 0F:9678: 48        .byte $48   ; <H>
- D 3 - I - 0x03F689 0F:9679: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F68A 0F:967A: FC        .byte $FC   ; 
- D 3 - I - 0x03F68B 0F:967B: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F68C 0F:967C: 70        .byte $70   ; <p>
- D 3 - I - 0x03F68D 0F:967D: FC        .byte $FC   ; 
- D 3 - I - 0x03F68E 0F:967E: 47        .byte $47   ; <G>
- D 3 - I - 0x03F68F 0F:967F: 61        .byte $61   ; <a>
- D 3 - I - 0x03F690 0F:9680: FC        .byte $FC   ; 
- D 3 - I - 0x03F691 0F:9681: 5F        .byte $5F   ; 
- D 3 - I - 0x03F692 0F:9682: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F693 0F:9683: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03F694 0F:9684: 7D        .byte $7D   ; 
- D 3 - I - 0x03F695 0F:9685: FC        .byte $FC   ; 
- D 3 - I - 0x03F696 0F:9686: BA        .byte $BA   ; 
- D 3 - I - 0x03F697 0F:9687: 70        .byte $70   ; <p>
- D 3 - I - 0x03F698 0F:9688: 42        .byte $42   ; <B>
- D 3 - I - 0x03F699 0F:9689: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F69A 0F:968A: 51        .byte $51   ; <Q>
- D 3 - I - 0x03F69B 0F:968B: FC        .byte $FC   ; 
- D 3 - I - 0x03F69C 0F:968C: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F69D 0F:968D: 68        .byte $68   ; <h>
- D 3 - I - 0x03F69E 0F:968E: 5F        .byte $5F   ; 
- D 3 - I - 0x03F69F 0F:968F: 7D        .byte $7D   ; 
- D 3 - I - 0x03F6A0 0F:9690: FC        .byte $FC   ; 
- D 3 - I - 0x03F6A1 0F:9691: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F6A2 0F:9692: C5        .byte $C5   ; 
- D 3 - I - 0x03F6A3 0F:9693: 4F        .byte $4F   ; <O>
- D 3 - I - 0x03F6A4 0F:9694: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F6A5 0F:9695: FC        .byte $FC   ; 
- D 3 - I - 0x03F6A6 0F:9696: C6        .byte $C6   ; 
- D 3 - I - 0x03F6A7 0F:9697: 67        .byte $67   ; <g>
- D 3 - I - 0x03F6A8 0F:9698: 44        .byte $44   ; <D>
- D 3 - I - 0x03F6A9 0F:9699: 5C        .byte $5C   ; 
- D 3 - I - 0x03F6AA 0F:969A: FC        .byte $FC   ; 
- D 3 - I - 0x03F6AB 0F:969B: 67        .byte $67   ; <g>
- D 3 - I - 0x03F6AC 0F:969C: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F6AD 0F:969D: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F6AE 0F:969E: FC        .byte $FC   ; 
- D 3 - I - 0x03F6AF 0F:969F: 55        .byte $55   ; <U>
- D 3 - I - 0x03F6B0 0F:96A0: D1        .byte $D1   ; 
- D 3 - I - 0x03F6B1 0F:96A1: 6A        .byte $6A   ; <j>
- D 3 - I - 0x03F6B2 0F:96A2: 45        .byte $45   ; <E>
- D 3 - I - 0x03F6B3 0F:96A3: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F6B4 0F:96A4: FC        .byte $FC   ; 
- D 3 - I - 0x03F6B5 0F:96A5: CE        .byte $CE   ; 
- D 3 - I - 0x03F6B6 0F:96A6: 44        .byte $44   ; <D>
- D 3 - I - 0x03F6B7 0F:96A7: 7D        .byte $7D   ; 
- D 3 - I - 0x03F6B8 0F:96A8: 69        .byte $69   ; <i>
- D 3 - I - 0x03F6B9 0F:96A9: FC        .byte $FC   ; 
- D 3 - I - 0x03F6BA 0F:96AA: 44        .byte $44   ; <D>
- D 3 - I - 0x03F6BB 0F:96AB: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F6BC 0F:96AC: CD        .byte $CD   ; 
- D 3 - I - 0x03F6BD 0F:96AD: 7D        .byte $7D   ; 
- D 3 - I - 0x03F6BE 0F:96AE: 56        .byte $56   ; <V>
- D 3 - I - 0x03F6BF 0F:96AF: 70        .byte $70   ; <p>
- D 3 - I - 0x03F6C0 0F:96B0: FC        .byte $FC   ; 
- D 3 - I - 0x03F6C1 0F:96B1: 67        .byte $67   ; <g>
- D 3 - I - 0x03F6C2 0F:96B2: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F6C3 0F:96B3: CE        .byte $CE   ; 
- D 3 - I - 0x03F6C4 0F:96B4: 45        .byte $45   ; <E>
- D 3 - I - 0x03F6C5 0F:96B5: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F6C6 0F:96B6: FC        .byte $FC   ; 
- D 3 - I - 0x03F6C7 0F:96B7: 5D        .byte $5D   ; 
- D 3 - I - 0x03F6C8 0F:96B8: 69        .byte $69   ; <i>
- D 3 - I - 0x03F6C9 0F:96B9: 55        .byte $55   ; <U>
- D 3 - I - 0x03F6CA 0F:96BA: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F6CB 0F:96BB: C1        .byte $C1   ; 
- D 3 - I - 0x03F6CC 0F:96BC: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F6CD 0F:96BD: FC        .byte $FC   ; 
- D 3 - I - 0x03F6CE 0F:96BE: 42        .byte $42   ; <B>
- D 3 - I - 0x03F6CF 0F:96BF: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F6D0 0F:96C0: 67        .byte $67   ; <g>
- D 3 - I - 0x03F6D1 0F:96C1: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F6D2 0F:96C2: FC        .byte $FC   ; 
- D 3 - I - 0x03F6D3 0F:96C3: 68        .byte $68   ; <h>
- D 3 - I - 0x03F6D4 0F:96C4: C5        .byte $C5   ; 
- D 3 - I - 0x03F6D5 0F:96C5: 50        .byte $50   ; <P>
- D 3 - I - 0x03F6D6 0F:96C6: FC        .byte $FC   ; 
- D 3 - I - 0x03F6D7 0F:96C7: CD        .byte $CD   ; 
- D 3 - I - 0x03F6D8 0F:96C8: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F6D9 0F:96C9: 46        .byte $46   ; <F>
- D 3 - I - 0x03F6DA 0F:96CA: 69        .byte $69   ; <i>
- D 3 - I - 0x03F6DB 0F:96CB: FC        .byte $FC   ; 
- D 3 - I - 0x03F6DC 0F:96CC: 4B        .byte $4B   ; <K>
- D 3 - I - 0x03F6DD 0F:96CD: 54        .byte $54   ; <T>
- D 3 - I - 0x03F6DE 0F:96CE: 69        .byte $69   ; <i>
- D 3 - I - 0x03F6DF 0F:96CF: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F6E0 0F:96D0: 53        .byte $53   ; <S>
- D 3 - I - 0x03F6E1 0F:96D1: B5        .byte $B5   ; 
- D 3 - I - 0x03F6E2 0F:96D2: FC        .byte $FC   ; 
- D 3 - I - 0x03F6E3 0F:96D3: C1        .byte $C1   ; 
- D 3 - I - 0x03F6E4 0F:96D4: 74        .byte $74   ; <t>
- D 3 - I - 0x03F6E5 0F:96D5: 41        .byte $41   ; <A>
- D 3 - I - 0x03F6E6 0F:96D6: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F6E7 0F:96D7: FC        .byte $FC   ; 
- D 3 - I - 0x03F6E8 0F:96D8: C3        .byte $C3   ; 
- D 3 - I - 0x03F6E9 0F:96D9: C4        .byte $C4   ; 
- D 3 - I - 0x03F6EA 0F:96DA: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F6EB 0F:96DB: 54        .byte $54   ; <T>
- D 3 - I - 0x03F6EC 0F:96DC: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F6ED 0F:96DD: FC        .byte $FC   ; 
- D 3 - I - 0x03F6EE 0F:96DE: B4        .byte $B4   ; 
- D 3 - I - 0x03F6EF 0F:96DF: 69        .byte $69   ; <i>
- D 3 - I - 0x03F6F0 0F:96E0: C3        .byte $C3   ; 
- D 3 - I - 0x03F6F1 0F:96E1: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F6F2 0F:96E2: FC        .byte $FC   ; 
- D 3 - I - 0x03F6F3 0F:96E3: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F6F4 0F:96E4: 71        .byte $71   ; <q>
- D 3 - I - 0x03F6F5 0F:96E5: 55        .byte $55   ; <U>
- D 3 - I - 0x03F6F6 0F:96E6: 42        .byte $42   ; <B>
- D 3 - I - 0x03F6F7 0F:96E7: BE        .byte $BE   ; 
- D 3 - I - 0x03F6F8 0F:96E8: 7D        .byte $7D   ; 
- D 3 - I - 0x03F6F9 0F:96E9: FC        .byte $FC   ; 
- D 3 - I - 0x03F6FA 0F:96EA: 5F        .byte $5F   ; 
- D 3 - I - 0x03F6FB 0F:96EB: 7D        .byte $7D   ; 
- D 3 - I - 0x03F6FC 0F:96EC: B4        .byte $B4   ; 
- D 3 - I - 0x03F6FD 0F:96ED: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F6FE 0F:96EE: FC        .byte $FC   ; 
- D 3 - I - 0x03F6FF 0F:96EF: 46        .byte $46   ; <F>
- D 3 - I - 0x03F700 0F:96F0: 69        .byte $69   ; <i>
- D 3 - I - 0x03F701 0F:96F1: 52        .byte $52   ; <R>
- D 3 - I - 0x03F702 0F:96F2: FC        .byte $FC   ; 
- D 3 - I - 0x03F703 0F:96F3: 62        .byte $62   ; <b>
- D 3 - I - 0x03F704 0F:96F4: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F705 0F:96F5: 52        .byte $52   ; <R>
- D 3 - I - 0x03F706 0F:96F6: 73        .byte $73   ; <s>
- D 3 - I - 0x03F707 0F:96F7: FC        .byte $FC   ; 
- D 3 - I - 0x03F708 0F:96F8: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F709 0F:96F9: 75        .byte $75   ; <u>
- D 3 - I - 0x03F70A 0F:96FA: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F70B 0F:96FB: 50        .byte $50   ; <P>
- D 3 - I - 0x03F70C 0F:96FC: 7D        .byte $7D   ; 
- D 3 - I - 0x03F70D 0F:96FD: FC        .byte $FC   ; 
- D 3 - I - 0x03F70E 0F:96FE: 46        .byte $46   ; <F>
- D 3 - I - 0x03F70F 0F:96FF: D0        .byte $D0   ; 
- D 3 - I - 0x03F710 0F:9700: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F711 0F:9701: 5F        .byte $5F   ; 
- D 3 - I - 0x03F712 0F:9702: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F713 0F:9703: FC        .byte $FC   ; 
- D 3 - I - 0x03F714 0F:9704: 60        .byte $60   ; 
- D 3 - I - 0x03F715 0F:9705: 71        .byte $71   ; <q>
- D 3 - I - 0x03F716 0F:9706: 7D        .byte $7D   ; 
- D 3 - I - 0x03F717 0F:9707: 67        .byte $67   ; <g>
- D 3 - I - 0x03F718 0F:9708: 7D        .byte $7D   ; 
- D 3 - I - 0x03F719 0F:9709: FC        .byte $FC   ; 
- D 3 - I - 0x03F71A 0F:970A: 46        .byte $46   ; <F>
- D 3 - I - 0x03F71B 0F:970B: 69        .byte $69   ; <i>
- D 3 - I - 0x03F71C 0F:970C: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F71D 0F:970D: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F71E 0F:970E: FC        .byte $FC   ; 
- D 3 - I - 0x03F71F 0F:970F: B9        .byte $B9   ; 
- D 3 - I - 0x03F720 0F:9710: B4        .byte $B4   ; 
- D 3 - I - 0x03F721 0F:9711: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F722 0F:9712: FC        .byte $FC   ; 
- D 3 - I - 0x03F723 0F:9713: 68        .byte $68   ; <h>
- D 3 - I - 0x03F724 0F:9714: C6        .byte $C6   ; 
- D 3 - I - 0x03F725 0F:9715: 68        .byte $68   ; <h>
- D 3 - I - 0x03F726 0F:9716: 45        .byte $45   ; <E>
- D 3 - I - 0x03F727 0F:9717: FC        .byte $FC   ; 
- D 3 - I - 0x03F728 0F:9718: 58        .byte $58   ; <X>
- D 3 - I - 0x03F729 0F:9719: 42        .byte $42   ; <B>
- D 3 - I - 0x03F72A 0F:971A: FC        .byte $FC   ; 
- D 3 - I - 0x03F72B 0F:971B: 4B        .byte $4B   ; <K>
- D 3 - I - 0x03F72C 0F:971C: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F72D 0F:971D: 50        .byte $50   ; <P>
- D 3 - I - 0x03F72E 0F:971E: 5F        .byte $5F   ; 
- D 3 - I - 0x03F72F 0F:971F: 68        .byte $68   ; <h>
- D 3 - I - 0x03F730 0F:9720: 41        .byte $41   ; <A>
- D 3 - I - 0x03F731 0F:9721: FC        .byte $FC   ; 
- D 3 - I - 0x03F732 0F:9722: 54        .byte $54   ; <T>
- D 3 - I - 0x03F733 0F:9723: 56        .byte $56   ; <V>
- D 3 - I - 0x03F734 0F:9724: 7D        .byte $7D   ; 
- D 3 - I - 0x03F735 0F:9725: 56        .byte $56   ; <V>
- D 3 - I - 0x03F736 0F:9726: 72        .byte $72   ; <r>
- D 3 - I - 0x03F737 0F:9727: FC        .byte $FC   ; 
- D 3 - I - 0x03F738 0F:9728: C2        .byte $C2   ; 
- D 3 - I - 0x03F739 0F:9729: 54        .byte $54   ; <T>
- D 3 - I - 0x03F73A 0F:972A: 7D        .byte $7D   ; 
- D 3 - I - 0x03F73B 0F:972B: 69        .byte $69   ; <i>
- D 3 - I - 0x03F73C 0F:972C: FC        .byte $FC   ; 
- D 3 - I - 0x03F73D 0F:972D: 41        .byte $41   ; <A>
- D 3 - I - 0x03F73E 0F:972E: 5F        .byte $5F   ; 
- D 3 - I - 0x03F73F 0F:972F: 67        .byte $67   ; <g>
- D 3 - I - 0x03F740 0F:9730: 43        .byte $43   ; <C>
- D 3 - I - 0x03F741 0F:9731: FC        .byte $FC   ; 
- D 3 - I - 0x03F742 0F:9732: C1        .byte $C1   ; 
- D 3 - I - 0x03F743 0F:9733: 74        .byte $74   ; <t>
- D 3 - I - 0x03F744 0F:9734: 43        .byte $43   ; <C>
- D 3 - I - 0x03F745 0F:9735: 4E        .byte $4E   ; <N>
- D 3 - I - 0x03F746 0F:9736: 43        .byte $43   ; <C>
- D 3 - I - 0x03F747 0F:9737: FC        .byte $FC   ; 
- D 3 - I - 0x03F748 0F:9738: BA        .byte $BA   ; 
- D 3 - I - 0x03F749 0F:9739: 75        .byte $75   ; <u>
- D 3 - I - 0x03F74A 0F:973A: 54        .byte $54   ; <T>
- D 3 - I - 0x03F74B 0F:973B: 7D        .byte $7D   ; 
- D 3 - I - 0x03F74C 0F:973C: 68        .byte $68   ; <h>
- D 3 - I - 0x03F74D 0F:973D: 45        .byte $45   ; <E>
- D 3 - I - 0x03F74E 0F:973E: FC        .byte $FC   ; 
- D 3 - I - 0x03F74F 0F:973F: B7        .byte $B7   ; 
- D 3 - I - 0x03F750 0F:9740: 69        .byte $69   ; <i>
- D 3 - I - 0x03F751 0F:9741: 53        .byte $53   ; <S>
- D 3 - I - 0x03F752 0F:9742: 74        .byte $74   ; <t>
- D 3 - I - 0x03F753 0F:9743: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F754 0F:9744: FC        .byte $FC   ; 
- D 3 - I - 0x03F755 0F:9745: 4A        .byte $4A   ; <J>
- D 3 - I - 0x03F756 0F:9746: 42        .byte $42   ; <B>
- D 3 - I - 0x03F757 0F:9747: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F758 0F:9748: C5        .byte $C5   ; 
- D 3 - I - 0x03F759 0F:9749: 67        .byte $67   ; <g>
- D 3 - I - 0x03F75A 0F:974A: FC        .byte $FC   ; 
- D 3 - I - 0x03F75B 0F:974B: 4B        .byte $4B   ; <K>
- D 3 - I - 0x03F75C 0F:974C: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F75D 0F:974D: CD        .byte $CD   ; 
- D 3 - I - 0x03F75E 0F:974E: 43        .byte $43   ; <C>
- D 3 - I - 0x03F75F 0F:974F: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F760 0F:9750: FC        .byte $FC   ; 
- D 3 - I - 0x03F761 0F:9751: 15        .byte $15   ; 
- D 3 - I - 0x03F762 0F:9752: 2E        .byte $2E   ; 
- D 3 - I - 0x03F763 0F:9753: 06        .byte $06   ; 
- D 3 - I - 0x03F764 0F:9754: 12        .byte $12   ; 
- D 3 - I - 0x03F765 0F:9755: FC        .byte $FC   ; 
- D 3 - I - 0x03F766 0F:9756: 16        .byte $16   ; 
- D 3 - I - 0x03F767 0F:9757: 1E        .byte $1E   ; 
- D 3 - I - 0x03F768 0F:9758: 2E        .byte $2E   ; 
- D 3 - I - 0x03F769 0F:9759: FC        .byte $FC   ; 
- D 3 - I - 0x03F76A 0F:975A: 5C        .byte $5C   ; 
- D 3 - I - 0x03F76B 0F:975B: 69        .byte $69   ; <i>
- D 3 - I - 0x03F76C 0F:975C: 60        .byte $60   ; 
- D 3 - I - 0x03F76D 0F:975D: 58        .byte $58   ; <X>
- D 3 - I - 0x03F76E 0F:975E: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F76F 0F:975F: 4E        .byte $4E   ; <N>
- D 3 - I - 0x03F770 0F:9760: FC        .byte $FC   ; 
- D 3 - I - 0x03F771 0F:9761: 4A        .byte $4A   ; <J>
- D 3 - I - 0x03F772 0F:9762: 68        .byte $68   ; <h>
- D 3 - I - 0x03F773 0F:9763: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F774 0F:9764: 51        .byte $51   ; <Q>
- D 3 - I - 0x03F775 0F:9765: 70        .byte $70   ; <p>
- D 3 - I - 0x03F776 0F:9766: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F777 0F:9767: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F778 0F:9768: FC        .byte $FC   ; 
- D 3 - I - 0x03F779 0F:9769: B6        .byte $B6   ; 
- D 3 - I - 0x03F77A 0F:976A: 6A        .byte $6A   ; <j>
- D 3 - I - 0x03F77B 0F:976B: 60        .byte $60   ; 
- D 3 - I - 0x03F77C 0F:976C: 45        .byte $45   ; <E>
- D 3 - I - 0x03F77D 0F:976D: FC        .byte $FC   ; 
- D 3 - I - 0x03F77E 0F:976E: CD        .byte $CD   ; 
- D 3 - I - 0x03F77F 0F:976F: 69        .byte $69   ; <i>
- D 3 - I - 0x03F780 0F:9770: 62        .byte $62   ; <b>
- D 3 - I - 0x03F781 0F:9771: 42        .byte $42   ; <B>
- D 3 - I - 0x03F782 0F:9772: 67        .byte $67   ; <g>
- D 3 - I - 0x03F783 0F:9773: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F784 0F:9774: FC        .byte $FC   ; 
- D 3 - I - 0x03F785 0F:9775: 4B        .byte $4B   ; <K>
- D 3 - I - 0x03F786 0F:9776: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F787 0F:9777: 54        .byte $54   ; <T>
- D 3 - I - 0x03F788 0F:9778: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F789 0F:9779: FC        .byte $FC   ; 
- D 3 - I - 0x03F78A 0F:977A: 5C        .byte $5C   ; 
- D 3 - I - 0x03F78B 0F:977B: 67        .byte $67   ; <g>
- D 3 - I - 0x03F78C 0F:977C: 62        .byte $62   ; <b>
- D 3 - I - 0x03F78D 0F:977D: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F78E 0F:977E: B8        .byte $B8   ; 
- D 3 - I - 0x03F78F 0F:977F: FC        .byte $FC   ; 
- D 3 - I - 0x03F790 0F:9780: 08        .byte $08   ; 
- D 3 - I - 0x03F791 0F:9781: 16        .byte $16   ; 
- D 3 - I - 0x03F792 0F:9782: 20        .byte $20   ; 
- D 3 - I - 0x03F793 0F:9783: FC        .byte $FC   ; 
- D 3 - I - 0x03F794 0F:9784: 01        .byte $01   ; 
- D 3 - I - 0x03F795 0F:9785: 07        .byte $07   ; 
- D 3 - I - 0x03F796 0F:9786: 10        .byte $10   ; 
- D 3 - I - 0x03F797 0F:9787: FC        .byte $FC   ; 
- D 3 - I - 0x03F798 0F:9788: 10        .byte $10   ; 
- D 3 - I - 0x03F799 0F:9789: 12        .byte $12   ; 
- D 3 - I - 0x03F79A 0F:978A: 15        .byte $15   ; 
- D 3 - I - 0x03F79B 0F:978B: 20        .byte $20   ; 
- D 3 - I - 0x03F79C 0F:978C: FC        .byte $FC   ; 
- D 3 - I - 0x03F79D 0F:978D: 21        .byte $21   ; 
- D 3 - I - 0x03F79E 0F:978E: 0B        .byte $0B   ; 
- D 3 - I - 0x03F79F 0F:978F: 0C        .byte $0C   ; 
- D 3 - I - 0x03F7A0 0F:9790: FC        .byte $FC   ; 
- D 3 - I - 0x03F7A1 0F:9791: 1C        .byte $1C   ; 
- D 3 - I - 0x03F7A2 0F:9792: 27        .byte $27   ; 
- D 3 - I - 0x03F7A3 0F:9793: 19        .byte $19   ; 
- D 3 - I - 0x03F7A4 0F:9794: FC        .byte $FC   ; 
- D 3 - I - 0x03F7A5 0F:9795: 14        .byte $14   ; 
- D 3 - I - 0x03F7A6 0F:9796: 03        .byte $03   ; 
- D 3 - I - 0x03F7A7 0F:9797: 1E        .byte $1E   ; 
- D 3 - I - 0x03F7A8 0F:9798: 03        .byte $03   ; 
- D 3 - I - 0x03F7A9 0F:9799: FC        .byte $FC   ; 
- D 3 - I - 0x03F7AA 0F:979A: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F7AB 0F:979B: 7D        .byte $7D   ; 
- D 3 - I - 0x03F7AC 0F:979C: 5F        .byte $5F   ; 
- D 3 - I - 0x03F7AD 0F:979D: FC        .byte $FC   ; 
- D 3 - I - 0x03F7AE 0F:979E: 43        .byte $43   ; <C>
- D 3 - I - 0x03F7AF 0F:979F: 69        .byte $69   ; <i>
- D 3 - I - 0x03F7B0 0F:97A0: B6        .byte $B6   ; 
- D 3 - I - 0x03F7B1 0F:97A1: 41        .byte $41   ; <A>
- D 3 - I - 0x03F7B2 0F:97A2: 42        .byte $42   ; <B>
- D 3 - I - 0x03F7B3 0F:97A3: FC        .byte $FC   ; 
- D 3 - I - 0x03F7B4 0F:97A4: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03F7B5 0F:97A5: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F7B6 0F:97A6: C5        .byte $C5   ; 
- D 3 - I - 0x03F7B7 0F:97A7: 69        .byte $69   ; <i>
- D 3 - I - 0x03F7B8 0F:97A8: B4        .byte $B4   ; 
- D 3 - I - 0x03F7B9 0F:97A9: 7D        .byte $7D   ; 
- D 3 - I - 0x03F7BA 0F:97AA: FC        .byte $FC   ; 
- D 3 - I - 0x03F7BB 0F:97AB: 16        .byte $16   ; 
- D 3 - I - 0x03F7BC 0F:97AC: 1E        .byte $1E   ; 
- D 3 - I - 0x03F7BD 0F:97AD: 2E        .byte $2E   ; 
- D 3 - I - 0x03F7BE 0F:97AE: FC        .byte $FC   ; 
- D 3 - I - 0x03F7BF 0F:97AF: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F7C0 0F:97B0: 68        .byte $68   ; <h>
- D 3 - I - 0x03F7C1 0F:97B1: 41        .byte $41   ; <A>
- D 3 - I - 0x03F7C2 0F:97B2: FC        .byte $FC   ; 
- D 3 - I - 0x03F7C3 0F:97B3: 11        .byte $11   ; 
- D 3 - I - 0x03F7C4 0F:97B4: 31        .byte $31   ; <1>
- D 3 - I - 0x03F7C5 0F:97B5: 03        .byte $03   ; 
- D 3 - I - 0x03F7C6 0F:97B6: A4        .byte $A4   ; 
- D 3 - I - 0x03F7C7 0F:97B7: 08        .byte $08   ; 
- D 3 - I - 0x03F7C8 0F:97B8: FC        .byte $FC   ; 
- D 3 - I - 0x03F7C9 0F:97B9: 42        .byte $42   ; <B>
- D 3 - I - 0x03F7CA 0F:97BA: 67        .byte $67   ; <g>
- D 3 - I - 0x03F7CB 0F:97BB: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F7CC 0F:97BC: FC        .byte $FC   ; 
- D 3 - I - 0x03F7CD 0F:97BD: 07        .byte $07   ; 
- D 3 - I - 0x03F7CE 0F:97BE: 10        .byte $10   ; 
- D 3 - I - 0x03F7CF 0F:97BF: 11        .byte $11   ; 
- D 3 - I - 0x03F7D0 0F:97C0: 32        .byte $32   ; <2>
- D 3 - I - 0x03F7D1 0F:97C1: 03        .byte $03   ; 
- D 3 - I - 0x03F7D2 0F:97C2: 0E        .byte $0E   ; 
- D 3 - I - 0x03F7D3 0F:97C3: 2E        .byte $2E   ; 
- D 3 - I - 0x03F7D4 0F:97C4: FC        .byte $FC   ; 
- D 3 - I - 0x03F7D5 0F:97C5: 4B        .byte $4B   ; <K>
- D 3 - I - 0x03F7D6 0F:97C6: 43        .byte $43   ; <C>
- D 3 - I - 0x03F7D7 0F:97C7: BA        .byte $BA   ; 
- D 3 - I - 0x03F7D8 0F:97C8: 41        .byte $41   ; <A>
- D 3 - I - 0x03F7D9 0F:97C9: 67        .byte $67   ; <g>
- D 3 - I - 0x03F7DA 0F:97CA: C4        .byte $C4   ; 
- D 3 - I - 0x03F7DB 0F:97CB: 41        .byte $41   ; <A>
- D 3 - I - 0x03F7DC 0F:97CC: FC        .byte $FC   ; 
- D 3 - I - 0x03F7DD 0F:97CD: 06        .byte $06   ; 
- D 3 - I - 0x03F7DE 0F:97CE: 2E        .byte $2E   ; 
- D 3 - I - 0x03F7DF 0F:97CF: 0A        .byte $0A   ; 
- D 3 - I - 0x03F7E0 0F:97D0: 08        .byte $08   ; 
- D 3 - I - 0x03F7E1 0F:97D1: FC        .byte $FC   ; 
- D 3 - I - 0x03F7E2 0F:97D2: C3        .byte $C3   ; 
- D 3 - I - 0x03F7E3 0F:97D3: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F7E4 0F:97D4: 4A        .byte $4A   ; <J>
- D 3 - I - 0x03F7E5 0F:97D5: 3F        .byte $3F   ; 
- D 3 - I - 0x03F7E6 0F:97D6: BE        .byte $BE   ; 
- D 3 - I - 0x03F7E7 0F:97D7: 3F        .byte $3F   ; 
- D 3 - I - 0x03F7E8 0F:97D8: B4        .byte $B4   ; 
- D 3 - I - 0x03F7E9 0F:97D9: 5F        .byte $5F   ; 
- D 3 - I - 0x03F7EA 0F:97DA: FC        .byte $FC   ; 
- D 3 - I - 0x03F7EB 0F:97DB: D1        .byte $D1   ; 
- D 3 - I - 0x03F7EC 0F:97DC: 7D        .byte $7D   ; 
- D 3 - I - 0x03F7ED 0F:97DD: 67        .byte $67   ; <g>
- D 3 - I - 0x03F7EE 0F:97DE: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F7EF 0F:97DF: C2        .byte $C2   ; 
- D 3 - I - 0x03F7F0 0F:97E0: FC        .byte $FC   ; 
- D 3 - I - 0x03F7F1 0F:97E1: 42        .byte $42   ; <B>
- D 3 - I - 0x03F7F2 0F:97E2: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F7F3 0F:97E3: B6        .byte $B6   ; 
- D 3 - I - 0x03F7F4 0F:97E4: 67        .byte $67   ; <g>
- D 3 - I - 0x03F7F5 0F:97E5: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F7F6 0F:97E6: C2        .byte $C2   ; 
- D 3 - I - 0x03F7F7 0F:97E7: FC        .byte $FC   ; 
- D 3 - I - 0x03F7F8 0F:97E8: 4F        .byte $4F   ; <O>
- D 3 - I - 0x03F7F9 0F:97E9: C4        .byte $C4   ; 
- D 3 - I - 0x03F7FA 0F:97EA: 44        .byte $44   ; <D>
- D 3 - I - 0x03F7FB 0F:97EB: 54        .byte $54   ; <T>
- D 3 - I - 0x03F7FC 0F:97EC: FC        .byte $FC   ; 
- D 3 - I - 0x03F7FD 0F:97ED: 5C        .byte $5C   ; 
- D 3 - I - 0x03F7FE 0F:97EE: 67        .byte $67   ; <g>
- D 3 - I - 0x03F7FF 0F:97EF: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F800 0F:97F0: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F801 0F:97F1: FC        .byte $FC   ; 
- D 3 - I - 0x03F802 0F:97F2: 62        .byte $62   ; <b>
- D 3 - I - 0x03F803 0F:97F3: 47        .byte $47   ; <G>
- D 3 - I - 0x03F804 0F:97F4: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F805 0F:97F5: 4A        .byte $4A   ; <J>
- D 3 - I - 0x03F806 0F:97F6: FC        .byte $FC   ; 
- D 3 - I - 0x03F807 0F:97F7: 42        .byte $42   ; <B>
- D 3 - I - 0x03F808 0F:97F8: 50        .byte $50   ; <P>
- D 3 - I - 0x03F809 0F:97F9: 68        .byte $68   ; <h>
- D 3 - I - 0x03F80A 0F:97FA: 41        .byte $41   ; <A>
- D 3 - I - 0x03F80B 0F:97FB: FC        .byte $FC   ; 
- D 3 - I - 0x03F80C 0F:97FC: 45        .byte $45   ; <E>
- D 3 - I - 0x03F80D 0F:97FD: 67        .byte $67   ; <g>
- D 3 - I - 0x03F80E 0F:97FE: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F80F 0F:97FF: BE        .byte $BE   ; 
- D 3 - I - 0x03F810 0F:9800: FC        .byte $FC   ; 
- D 3 - I - 0x03F811 0F:9801: 41        .byte $41   ; <A>
- D 3 - I - 0x03F812 0F:9802: 69        .byte $69   ; <i>
- D 3 - I - 0x03F813 0F:9803: BC        .byte $BC   ; 
- D 3 - I - 0x03F814 0F:9804: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F815 0F:9805: 51        .byte $51   ; <Q>
- D 3 - I - 0x03F816 0F:9806: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F817 0F:9807: FC        .byte $FC   ; 
- D 3 - I - 0x03F818 0F:9808: 56        .byte $56   ; <V>
- D 3 - I - 0x03F819 0F:9809: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F81A 0F:980A: C2        .byte $C2   ; 
- D 3 - I - 0x03F81B 0F:980B: 42        .byte $42   ; <B>
- D 3 - I - 0x03F81C 0F:980C: 52        .byte $52   ; <R>
- D 3 - I - 0x03F81D 0F:980D: FC        .byte $FC   ; 
- D 3 - I - 0x03F81E 0F:980E: C5        .byte $C5   ; 
- D 3 - I - 0x03F81F 0F:980F: 67        .byte $67   ; <g>
- D 3 - I - 0x03F820 0F:9810: BA        .byte $BA   ; 
- D 3 - I - 0x03F821 0F:9811: 69        .byte $69   ; <i>
- D 3 - I - 0x03F822 0F:9812: FC        .byte $FC   ; 
- D 3 - I - 0x03F823 0F:9813: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F824 0F:9814: 71        .byte $71   ; <q>
- D 3 - I - 0x03F825 0F:9815: 7D        .byte $7D   ; 
- D 3 - I - 0x03F826 0F:9816: 54        .byte $54   ; <T>
- D 3 - I - 0x03F827 0F:9817: FC        .byte $FC   ; 
- D 3 - I - 0x03F828 0F:9818: C7        .byte $C7   ; 
- D 3 - I - 0x03F829 0F:9819: 6A        .byte $6A   ; <j>
- D 3 - I - 0x03F82A 0F:981A: 7D        .byte $7D   ; 
- D 3 - I - 0x03F82B 0F:981B: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F82C 0F:981C: 71        .byte $71   ; <q>
- D 3 - I - 0x03F82D 0F:981D: 7D        .byte $7D   ; 
- D 3 - I - 0x03F82E 0F:981E: 54        .byte $54   ; <T>
- D 3 - I - 0x03F82F 0F:981F: FC        .byte $FC   ; 
- D 3 - I - 0x03F830 0F:9820: 5D        .byte $5D   ; 
- D 3 - I - 0x03F831 0F:9821: C1        .byte $C1   ; 
- D 3 - I - 0x03F832 0F:9822: 74        .byte $74   ; <t>
- D 3 - I - 0x03F833 0F:9823: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F834 0F:9824: B6        .byte $B6   ; 
- D 3 - I - 0x03F835 0F:9825: FC        .byte $FC   ; 
- D 3 - I - 0x03F836 0F:9826: C2        .byte $C2   ; 
- D 3 - I - 0x03F837 0F:9827: 67        .byte $67   ; <g>
- D 3 - I - 0x03F838 0F:9828: 42        .byte $42   ; <B>
- D 3 - I - 0x03F839 0F:9829: C5        .byte $C5   ; 
- D 3 - I - 0x03F83A 0F:982A: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F83B 0F:982B: 71        .byte $71   ; <q>
- D 3 - I - 0x03F83C 0F:982C: 7D        .byte $7D   ; 
- D 3 - I - 0x03F83D 0F:982D: 54        .byte $54   ; <T>
- D 3 - I - 0x03F83E 0F:982E: FC        .byte $FC   ; 
- D 3 - I - 0x03F83F 0F:982F: C2        .byte $C2   ; 
- D 3 - I - 0x03F840 0F:9830: 67        .byte $67   ; <g>
- D 3 - I - 0x03F841 0F:9831: 42        .byte $42   ; <B>
- D 3 - I - 0x03F842 0F:9832: C5        .byte $C5   ; 
- D 3 - I - 0x03F843 0F:9833: 45        .byte $45   ; <E>
- D 3 - I - 0x03F844 0F:9834: 7D        .byte $7D   ; 
- D 3 - I - 0x03F845 0F:9835: C3        .byte $C3   ; 
- D 3 - I - 0x03F846 0F:9836: 7D        .byte $7D   ; 
- D 3 - I - 0x03F847 0F:9837: 5D        .byte $5D   ; 
- D 3 - I - 0x03F848 0F:9838: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F849 0F:9839: C2        .byte $C2   ; 
- D 3 - I - 0x03F84A 0F:983A: FC        .byte $FC   ; 
- D 3 - I - 0x03F84B 0F:983B: 1A        .byte $1A   ; 
- D 3 - I - 0x03F84C 0F:983C: 24        .byte $24   ; 
- D 3 - I - 0x03F84D 0F:983D: B1        .byte $B1   ; 
- D 3 - I - 0x03F84E 0F:983E: 0B        .byte $0B   ; 
- D 3 - I - 0x03F84F 0F:983F: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F850 0F:9840: 71        .byte $71   ; <q>
- D 3 - I - 0x03F851 0F:9841: 7D        .byte $7D   ; 
- D 3 - I - 0x03F852 0F:9842: 54        .byte $54   ; <T>
- D 3 - I - 0x03F853 0F:9843: FC        .byte $FC   ; 
- D 3 - I - 0x03F854 0F:9844: 1A        .byte $1A   ; 
- D 3 - I - 0x03F855 0F:9845: 24        .byte $24   ; 
- D 3 - I - 0x03F856 0F:9846: B1        .byte $B1   ; 
- D 3 - I - 0x03F857 0F:9847: 0B        .byte $0B   ; 
- D 3 - I - 0x03F858 0F:9848: C7        .byte $C7   ; 
- D 3 - I - 0x03F859 0F:9849: 6A        .byte $6A   ; <j>
- D 3 - I - 0x03F85A 0F:984A: 7D        .byte $7D   ; 
- D 3 - I - 0x03F85B 0F:984B: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F85C 0F:984C: 71        .byte $71   ; <q>
- D 3 - I - 0x03F85D 0F:984D: 7D        .byte $7D   ; 
- D 3 - I - 0x03F85E 0F:984E: 54        .byte $54   ; <T>
- D 3 - I - 0x03F85F 0F:984F: FC        .byte $FC   ; 
- D 3 - I - 0x03F860 0F:9850: 46        .byte $46   ; <F>
- D 3 - I - 0x03F861 0F:9851: 60        .byte $60   ; 
- D 3 - I - 0x03F862 0F:9852: 4F        .byte $4F   ; <O>
- D 3 - I - 0x03F863 0F:9853: 68        .byte $68   ; <h>
- D 3 - I - 0x03F864 0F:9854: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F865 0F:9855: 71        .byte $71   ; <q>
- D 3 - I - 0x03F866 0F:9856: 7D        .byte $7D   ; 
- D 3 - I - 0x03F867 0F:9857: 54        .byte $54   ; <T>
- D 3 - I - 0x03F868 0F:9858: FC        .byte $FC   ; 
- D 3 - I - 0x03F869 0F:9859: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F86A 0F:985A: 46        .byte $46   ; <F>
- D 3 - I - 0x03F86B 0F:985B: 42        .byte $42   ; <B>
- D 3 - I - 0x03F86C 0F:985C: 67        .byte $67   ; <g>
- D 3 - I - 0x03F86D 0F:985D: C5        .byte $C5   ; 
- D 3 - I - 0x03F86E 0F:985E: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03F86F 0F:985F: 68        .byte $68   ; <h>
- D 3 - I - 0x03F870 0F:9860: 49        .byte $49   ; <I>
- D 3 - I - 0x03F871 0F:9861: 7D        .byte $7D   ; 
- D 3 - I - 0x03F872 0F:9862: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F873 0F:9863: FC        .byte $FC   ; 
- D 3 - I - 0x03F874 0F:9864: 52        .byte $52   ; <R>
- D 3 - I - 0x03F875 0F:9865: 42        .byte $42   ; <B>
- D 3 - I - 0x03F876 0F:9866: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F877 0F:9867: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F878 0F:9868: 71        .byte $71   ; <q>
- D 3 - I - 0x03F879 0F:9869: 7D        .byte $7D   ; 
- D 3 - I - 0x03F87A 0F:986A: 54        .byte $54   ; <T>
- D 3 - I - 0x03F87B 0F:986B: FC        .byte $FC   ; 
- D 3 - I - 0x03F87C 0F:986C: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F87D 0F:986D: 46        .byte $46   ; <F>
- D 3 - I - 0x03F87E 0F:986E: 42        .byte $42   ; <B>
- D 3 - I - 0x03F87F 0F:986F: 67        .byte $67   ; <g>
- D 3 - I - 0x03F880 0F:9870: C5        .byte $C5   ; 
- D 3 - I - 0x03F881 0F:9871: 52        .byte $52   ; <R>
- D 3 - I - 0x03F882 0F:9872: 42        .byte $42   ; <B>
- D 3 - I - 0x03F883 0F:9873: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F884 0F:9874: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F885 0F:9875: 71        .byte $71   ; <q>
- D 3 - I - 0x03F886 0F:9876: 7D        .byte $7D   ; 
- D 3 - I - 0x03F887 0F:9877: 54        .byte $54   ; <T>
- D 3 - I - 0x03F888 0F:9878: FC        .byte $FC   ; 
- D 3 - I - 0x03F889 0F:9879: 42        .byte $42   ; <B>
- D 3 - I - 0x03F88A 0F:987A: 7D        .byte $7D   ; 
- D 3 - I - 0x03F88B 0F:987B: B6        .byte $B6   ; 
- D 3 - I - 0x03F88C 0F:987C: 69        .byte $69   ; <i>
- D 3 - I - 0x03F88D 0F:987D: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F88E 0F:987E: 72        .byte $72   ; <r>
- D 3 - I - 0x03F88F 0F:987F: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F890 0F:9880: 54        .byte $54   ; <T>
- D 3 - I - 0x03F891 0F:9881: FC        .byte $FC   ; 
- D 3 - I - 0x03F892 0F:9882: 50        .byte $50   ; <P>
- D 3 - I - 0x03F893 0F:9883: 42        .byte $42   ; <B>
- D 3 - I - 0x03F894 0F:9884: B4        .byte $B4   ; 
- D 3 - I - 0x03F895 0F:9885: 7D        .byte $7D   ; 
- D 3 - I - 0x03F896 0F:9886: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F897 0F:9887: 72        .byte $72   ; <r>
- D 3 - I - 0x03F898 0F:9888: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F899 0F:9889: 54        .byte $54   ; <T>
- D 3 - I - 0x03F89A 0F:988A: FC        .byte $FC   ; 
- D 3 - I - 0x03F89B 0F:988B: 58        .byte $58   ; <X>
- D 3 - I - 0x03F89C 0F:988C: 45        .byte $45   ; <E>
- D 3 - I - 0x03F89D 0F:988D: 3F        .byte $3F   ; 
- D 3 - I - 0x03F89E 0F:988E: 50        .byte $50   ; <P>
- D 3 - I - 0x03F89F 0F:988F: 42        .byte $42   ; <B>
- D 3 - I - 0x03F8A0 0F:9890: B4        .byte $B4   ; 
- D 3 - I - 0x03F8A1 0F:9891: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8A2 0F:9892: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F8A3 0F:9893: 72        .byte $72   ; <r>
- D 3 - I - 0x03F8A4 0F:9894: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F8A5 0F:9895: 54        .byte $54   ; <T>
- D 3 - I - 0x03F8A6 0F:9896: FC        .byte $FC   ; 
- D 3 - I - 0x03F8A7 0F:9897: 45        .byte $45   ; <E>
- D 3 - I - 0x03F8A8 0F:9898: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8A9 0F:9899: C3        .byte $C3   ; 
- D 3 - I - 0x03F8AA 0F:989A: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8AB 0F:989B: 5D        .byte $5D   ; 
- D 3 - I - 0x03F8AC 0F:989C: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F8AD 0F:989D: C2        .byte $C2   ; 
- D 3 - I - 0x03F8AE 0F:989E: 47        .byte $47   ; <G>
- D 3 - I - 0x03F8AF 0F:989F: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F8B0 0F:98A0: 48        .byte $48   ; <H>
- D 3 - I - 0x03F8B1 0F:98A1: FC        .byte $FC   ; 
- D 3 - I - 0x03F8B2 0F:98A2: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03F8B3 0F:98A3: 42        .byte $42   ; <B>
- D 3 - I - 0x03F8B4 0F:98A4: CD        .byte $CD   ; 
- D 3 - I - 0x03F8B5 0F:98A5: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8B6 0F:98A6: 45        .byte $45   ; <E>
- D 3 - I - 0x03F8B7 0F:98A7: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8B8 0F:98A8: C3        .byte $C3   ; 
- D 3 - I - 0x03F8B9 0F:98A9: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8BA 0F:98AA: 5D        .byte $5D   ; 
- D 3 - I - 0x03F8BB 0F:98AB: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F8BC 0F:98AC: C2        .byte $C2   ; 
- D 3 - I - 0x03F8BD 0F:98AD: FC        .byte $FC   ; 
- D 3 - I - 0x03F8BE 0F:98AE: BA        .byte $BA   ; 
- D 3 - I - 0x03F8BF 0F:98AF: 70        .byte $70   ; <p>
- D 3 - I - 0x03F8C0 0F:98B0: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F8C1 0F:98B1: CE        .byte $CE   ; 
- D 3 - I - 0x03F8C2 0F:98B2: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F8C3 0F:98B3: B6        .byte $B6   ; 
- D 3 - I - 0x03F8C4 0F:98B4: C7        .byte $C7   ; 
- D 3 - I - 0x03F8C5 0F:98B5: 6A        .byte $6A   ; <j>
- D 3 - I - 0x03F8C6 0F:98B6: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8C7 0F:98B7: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F8C8 0F:98B8: 71        .byte $71   ; <q>
- D 3 - I - 0x03F8C9 0F:98B9: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8CA 0F:98BA: 54        .byte $54   ; <T>
- D 3 - I - 0x03F8CB 0F:98BB: FC        .byte $FC   ; 
- D 3 - I - 0x03F8CC 0F:98BC: C2        .byte $C2   ; 
- D 3 - I - 0x03F8CD 0F:98BD: 67        .byte $67   ; <g>
- D 3 - I - 0x03F8CE 0F:98BE: 42        .byte $42   ; <B>
- D 3 - I - 0x03F8CF 0F:98BF: C5        .byte $C5   ; 
- D 3 - I - 0x03F8D0 0F:98C0: 50        .byte $50   ; <P>
- D 3 - I - 0x03F8D1 0F:98C1: 42        .byte $42   ; <B>
- D 3 - I - 0x03F8D2 0F:98C2: B4        .byte $B4   ; 
- D 3 - I - 0x03F8D3 0F:98C3: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8D4 0F:98C4: FC        .byte $FC   ; 
- D 3 - I - 0x03F8D5 0F:98C5: 4B        .byte $4B   ; <K>
- D 3 - I - 0x03F8D6 0F:98C6: 42        .byte $42   ; <B>
- D 3 - I - 0x03F8D7 0F:98C7: 48        .byte $48   ; <H>
- D 3 - I - 0x03F8D8 0F:98C8: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F8D9 0F:98C9: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F8DA 0F:98CA: FC        .byte $FC   ; 
- D 3 - I - 0x03F8DB 0F:98CB: 0B        .byte $0B   ; 
- D 3 - I - 0x03F8DC 0F:98CC: 19        .byte $19   ; 
- D 3 - I - 0x03F8DD 0F:98CD: 14        .byte $14   ; 
- D 3 - I - 0x03F8DE 0F:98CE: 19        .byte $19   ; 
- D 3 - I - 0x03F8DF 0F:98CF: 4A        .byte $4A   ; <J>
- D 3 - I - 0x03F8E0 0F:98D0: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F8E1 0F:98D1: C4        .byte $C4   ; 
- D 3 - I - 0x03F8E2 0F:98D2: CF        .byte $CF   ; 
- D 3 - I - 0x03F8E3 0F:98D3: 6A        .byte $6A   ; <j>
- D 3 - I - 0x03F8E4 0F:98D4: 42        .byte $42   ; <B>
- D 3 - I - 0x03F8E5 0F:98D5: FC        .byte $FC   ; 
- D 3 - I - 0x03F8E6 0F:98D6: C3        .byte $C3   ; 
- D 3 - I - 0x03F8E7 0F:98D7: 55        .byte $55   ; <U>
- D 3 - I - 0x03F8E8 0F:98D8: 55        .byte $55   ; <U>
- D 3 - I - 0x03F8E9 0F:98D9: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F8EA 0F:98DA: 71        .byte $71   ; <q>
- D 3 - I - 0x03F8EB 0F:98DB: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8EC 0F:98DC: 54        .byte $54   ; <T>
- D 3 - I - 0x03F8ED 0F:98DD: FC        .byte $FC   ; 
- D 3 - I - 0x03F8EE 0F:98DE: C5        .byte $C5   ; 
- D 3 - I - 0x03F8EF 0F:98DF: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8F0 0F:98E0: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F8F1 0F:98E1: 50        .byte $50   ; <P>
- D 3 - I - 0x03F8F2 0F:98E2: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8F3 0F:98E3: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F8F4 0F:98E4: 71        .byte $71   ; <q>
- D 3 - I - 0x03F8F5 0F:98E5: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8F6 0F:98E6: 54        .byte $54   ; <T>
- D 3 - I - 0x03F8F7 0F:98E7: FC        .byte $FC   ; 
- D 3 - I - 0x03F8F8 0F:98E8: 60        .byte $60   ; 
- D 3 - I - 0x03F8F9 0F:98E9: 67        .byte $67   ; <g>
- D 3 - I - 0x03F8FA 0F:98EA: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8FB 0F:98EB: BA        .byte $BA   ; 
- D 3 - I - 0x03F8FC 0F:98EC: 71        .byte $71   ; <q>
- D 3 - I - 0x03F8FD 0F:98ED: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F8FE 0F:98EE: 71        .byte $71   ; <q>
- D 3 - I - 0x03F8FF 0F:98EF: 7D        .byte $7D   ; 
- D 3 - I - 0x03F900 0F:98F0: 54        .byte $54   ; <T>
- D 3 - I - 0x03F901 0F:98F1: FC        .byte $FC   ; 
- D 3 - I - 0x03F902 0F:98F2: 5F        .byte $5F   ; 
- D 3 - I - 0x03F903 0F:98F3: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F904 0F:98F4: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03F905 0F:98F5: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F906 0F:98F6: 71        .byte $71   ; <q>
- D 3 - I - 0x03F907 0F:98F7: 7D        .byte $7D   ; 
- D 3 - I - 0x03F908 0F:98F8: 54        .byte $54   ; <T>
- D 3 - I - 0x03F909 0F:98F9: FC        .byte $FC   ; 
- D 3 - I - 0x03F90A 0F:98FA: 4B        .byte $4B   ; <K>
- D 3 - I - 0x03F90B 0F:98FB: 42        .byte $42   ; <B>
- D 3 - I - 0x03F90C 0F:98FC: C2        .byte $C2   ; 
- D 3 - I - 0x03F90D 0F:98FD: 6C        .byte $6C   ; <l>
- D 3 - I - 0x03F90E 0F:98FE: 42        .byte $42   ; <B>
- D 3 - I - 0x03F90F 0F:98FF: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F910 0F:9900: BE        .byte $BE   ; 
- D 3 - I - 0x03F911 0F:9901: 7D        .byte $7D   ; 
- D 3 - I - 0x03F912 0F:9902: FC        .byte $FC   ; 
- D 3 - I - 0x03F913 0F:9903: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F914 0F:9904: 67        .byte $67   ; <g>
- D 3 - I - 0x03F915 0F:9905: 42        .byte $42   ; <B>
- D 3 - I - 0x03F916 0F:9906: BE        .byte $BE   ; 
- D 3 - I - 0x03F917 0F:9907: 7D        .byte $7D   ; 
- D 3 - I - 0x03F918 0F:9908: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F919 0F:9909: 71        .byte $71   ; <q>
- D 3 - I - 0x03F91A 0F:990A: 7D        .byte $7D   ; 
- D 3 - I - 0x03F91B 0F:990B: 54        .byte $54   ; <T>
- D 3 - I - 0x03F91C 0F:990C: FC        .byte $FC   ; 
- D 3 - I - 0x03F91D 0F:990D: 47        .byte $47   ; <G>
- D 3 - I - 0x03F91E 0F:990E: 70        .byte $70   ; <p>
- D 3 - I - 0x03F91F 0F:990F: 59        .byte $59   ; <Y>
- D 3 - I - 0x03F920 0F:9910: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F921 0F:9911: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F922 0F:9912: 71        .byte $71   ; <q>
- D 3 - I - 0x03F923 0F:9913: 7D        .byte $7D   ; 
- D 3 - I - 0x03F924 0F:9914: 54        .byte $54   ; <T>
- D 3 - I - 0x03F925 0F:9915: FC        .byte $FC   ; 
- D 3 - I - 0x03F926 0F:9916: 5C        .byte $5C   ; 
- D 3 - I - 0x03F927 0F:9917: 73        .byte $73   ; <s>
- D 3 - I - 0x03F928 0F:9918: 42        .byte $42   ; <B>
- D 3 - I - 0x03F929 0F:9919: 64        .byte $64   ; <d>
- D 3 - I - 0x03F92A 0F:991A: 7D        .byte $7D   ; 
- D 3 - I - 0x03F92B 0F:991B: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F92C 0F:991C: 72        .byte $72   ; <r>
- D 3 - I - 0x03F92D 0F:991D: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F92E 0F:991E: 54        .byte $54   ; <T>
- D 3 - I - 0x03F92F 0F:991F: FC        .byte $FC   ; 
- D 3 - I - 0x03F930 0F:9920: BE        .byte $BE   ; 
- D 3 - I - 0x03F931 0F:9921: 42        .byte $42   ; <B>
- D 3 - I - 0x03F932 0F:9922: 55        .byte $55   ; <U>
- D 3 - I - 0x03F933 0F:9923: 5F        .byte $5F   ; 
- D 3 - I - 0x03F934 0F:9924: 42        .byte $42   ; <B>
- D 3 - I - 0x03F935 0F:9925: 54        .byte $54   ; <T>
- D 3 - I - 0x03F936 0F:9926: 5D        .byte $5D   ; 
- D 3 - I - 0x03F937 0F:9927: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F938 0F:9928: C2        .byte $C2   ; 
- D 3 - I - 0x03F939 0F:9929: FC        .byte $FC   ; 
- D 3 - I - 0x03F93A 0F:992A: 47        .byte $47   ; <G>
- D 3 - I - 0x03F93B 0F:992B: 70        .byte $70   ; <p>
- D 3 - I - 0x03F93C 0F:992C: 59        .byte $59   ; <Y>
- D 3 - I - 0x03F93D 0F:992D: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F93E 0F:992E: 5D        .byte $5D   ; 
- D 3 - I - 0x03F93F 0F:992F: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F940 0F:9930: C2        .byte $C2   ; 
- D 3 - I - 0x03F941 0F:9931: FC        .byte $FC   ; 
- D 3 - I - 0x03F942 0F:9932: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F943 0F:9933: 49        .byte $49   ; <I>
- D 3 - I - 0x03F944 0F:9934: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F945 0F:9935: 54        .byte $54   ; <T>
- D 3 - I - 0x03F946 0F:9936: 5D        .byte $5D   ; 
- D 3 - I - 0x03F947 0F:9937: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F948 0F:9938: C2        .byte $C2   ; 
- D 3 - I - 0x03F949 0F:9939: FC        .byte $FC   ; 
- D 3 - I - 0x03F94A 0F:993A: 0C        .byte $0C   ; 
- D 3 - I - 0x03F94B 0F:993B: 32        .byte $32   ; <2>
- D 3 - I - 0x03F94C 0F:993C: 03        .byte $03   ; 
- D 3 - I - 0x03F94D 0F:993D: 28        .byte $28   ; 
- D 3 - I - 0x03F94E 0F:993E: 31        .byte $31   ; <1>
- D 3 - I - 0x03F94F 0F:993F: 03        .byte $03   ; 
- D 3 - I - 0x03F950 0F:9940: 07        .byte $07   ; 
- D 3 - I - 0x03F951 0F:9941: 30        .byte $30   ; <0>
- D 3 - I - 0x03F952 0F:9942: 08        .byte $08   ; 
- D 3 - I - 0x03F953 0F:9943: FC        .byte $FC   ; 
- D 3 - I - 0x03F954 0F:9944: A8        .byte $A8   ; 
- D 3 - I - 0x03F955 0F:9945: 2E        .byte $2E   ; 
- D 3 - I - 0x03F956 0F:9946: 13        .byte $13   ; 
- D 3 - I - 0x03F957 0F:9947: 2E        .byte $2E   ; 
- D 3 - I - 0x03F958 0F:9948: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F959 0F:9949: 71        .byte $71   ; <q>
- D 3 - I - 0x03F95A 0F:994A: 7D        .byte $7D   ; 
- D 3 - I - 0x03F95B 0F:994B: 54        .byte $54   ; <T>
- D 3 - I - 0x03F95C 0F:994C: FC        .byte $FC   ; 
- D 3 - I - 0x03F95D 0F:994D: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F95E 0F:994E: 67        .byte $67   ; <g>
- D 3 - I - 0x03F95F 0F:994F: 42        .byte $42   ; <B>
- D 3 - I - 0x03F960 0F:9950: BE        .byte $BE   ; 
- D 3 - I - 0x03F961 0F:9951: 7D        .byte $7D   ; 
- D 3 - I - 0x03F962 0F:9952: 47        .byte $47   ; <G>
- D 3 - I - 0x03F963 0F:9953: 70        .byte $70   ; <p>
- D 3 - I - 0x03F964 0F:9954: 59        .byte $59   ; <Y>
- D 3 - I - 0x03F965 0F:9955: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F966 0F:9956: FC        .byte $FC   ; 
- D 3 - I - 0x03F967 0F:9957: BE        .byte $BE   ; 
- D 3 - I - 0x03F968 0F:9958: C5        .byte $C5   ; 
- D 3 - I - 0x03F969 0F:9959: 69        .byte $69   ; <i>
- D 3 - I - 0x03F96A 0F:995A: 42        .byte $42   ; <B>
- D 3 - I - 0x03F96B 0F:995B: 7D        .byte $7D   ; 
- D 3 - I - 0x03F96C 0F:995C: 69        .byte $69   ; <i>
- D 3 - I - 0x03F96D 0F:995D: FC        .byte $FC   ; 
- D 3 - I - 0x03F96E 0F:995E: C2        .byte $C2   ; 
- D 3 - I - 0x03F96F 0F:995F: 68        .byte $68   ; <h>
- D 3 - I - 0x03F970 0F:9960: C5        .byte $C5   ; 
- D 3 - I - 0x03F971 0F:9961: 69        .byte $69   ; <i>
- D 3 - I - 0x03F972 0F:9962: FC        .byte $FC   ; 
- D 3 - I - 0x03F973 0F:9963: 5B        .byte $5B   ; 
- D 3 - I - 0x03F974 0F:9964: 7D        .byte $7D   ; 
- D 3 - I - 0x03F975 0F:9965: 69        .byte $69   ; <i>
- D 3 - I - 0x03F976 0F:9966: 68        .byte $68   ; <h>
- D 3 - I - 0x03F977 0F:9967: 5C        .byte $5C   ; 
- D 3 - I - 0x03F978 0F:9968: 54        .byte $54   ; <T>
- D 3 - I - 0x03F979 0F:9969: FC        .byte $FC   ; 
- D 3 - I - 0x03F97A 0F:996A: A4        .byte $A4   ; 
- D 3 - I - 0x03F97B 0F:996B: 03        .byte $03   ; 
- D 3 - I - 0x03F97C 0F:996C: 02        .byte $02   ; 
- D 3 - I - 0x03F97D 0F:996D: 2E        .byte $2E   ; 
- D 3 - I - 0x03F97E 0F:996E: 15        .byte $15   ; 
- D 3 - I - 0x03F97F 0F:996F: C2        .byte $C2   ; 
- D 3 - I - 0x03F980 0F:9970: 68        .byte $68   ; <h>
- D 3 - I - 0x03F981 0F:9971: C5        .byte $C5   ; 
- D 3 - I - 0x03F982 0F:9972: 69        .byte $69   ; <i>
- D 3 - I - 0x03F983 0F:9973: FC        .byte $FC   ; 
- D 3 - I - 0x03F984 0F:9974: 07        .byte $07   ; 
- D 3 - I - 0x03F985 0F:9975: 04        .byte $04   ; 
- D 3 - I - 0x03F986 0F:9976: 29        .byte $29   ; 
- D 3 - I - 0x03F987 0F:9977: 5C        .byte $5C   ; 
- D 3 - I - 0x03F988 0F:9978: 75        .byte $75   ; <u>
- D 3 - I - 0x03F989 0F:9979: 42        .byte $42   ; <B>
- D 3 - I - 0x03F98A 0F:997A: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F98B 0F:997B: 54        .byte $54   ; <T>
- D 3 - I - 0x03F98C 0F:997C: FC        .byte $FC   ; 
- D 3 - I - 0x03F98D 0F:997D: B1        .byte $B1   ; 
- D 3 - I - 0x03F98E 0F:997E: 2E        .byte $2E   ; 
- D 3 - I - 0x03F98F 0F:997F: 0C        .byte $0C   ; 
- D 3 - I - 0x03F990 0F:9980: 2E        .byte $2E   ; 
- D 3 - I - 0x03F991 0F:9981: C2        .byte $C2   ; 
- D 3 - I - 0x03F992 0F:9982: 68        .byte $68   ; <h>
- D 3 - I - 0x03F993 0F:9983: C5        .byte $C5   ; 
- D 3 - I - 0x03F994 0F:9984: 69        .byte $69   ; <i>
- D 3 - I - 0x03F995 0F:9985: FC        .byte $FC   ; 
- D 3 - I - 0x03F996 0F:9986: 0A        .byte $0A   ; 
- D 3 - I - 0x03F997 0F:9987: 03        .byte $03   ; 
- D 3 - I - 0x03F998 0F:9988: 0F        .byte $0F   ; 
- D 3 - I - 0x03F999 0F:9989: 08        .byte $08   ; 
- D 3 - I - 0x03F99A 0F:998A: C2        .byte $C2   ; 
- D 3 - I - 0x03F99B 0F:998B: 68        .byte $68   ; <h>
- D 3 - I - 0x03F99C 0F:998C: C5        .byte $C5   ; 
- D 3 - I - 0x03F99D 0F:998D: 69        .byte $69   ; <i>
- D 3 - I - 0x03F99E 0F:998E: FC        .byte $FC   ; 
- D 3 - I - 0x03F99F 0F:998F: 1A        .byte $1A   ; 
- D 3 - I - 0x03F9A0 0F:9990: 28        .byte $28   ; 
- D 3 - I - 0x03F9A1 0F:9991: 18        .byte $18   ; 
- D 3 - I - 0x03F9A2 0F:9992: A7        .byte $A7   ; 
- D 3 - I - 0x03F9A3 0F:9993: 20        .byte $20   ; 
- D 3 - I - 0x03F9A4 0F:9994: C2        .byte $C2   ; 
- D 3 - I - 0x03F9A5 0F:9995: 68        .byte $68   ; <h>
- D 3 - I - 0x03F9A6 0F:9996: C5        .byte $C5   ; 
- D 3 - I - 0x03F9A7 0F:9997: 69        .byte $69   ; <i>
- D 3 - I - 0x03F9A8 0F:9998: FC        .byte $FC   ; 
- D 3 - I - 0x03F9A9 0F:9999: CD        .byte $CD   ; 
- D 3 - I - 0x03F9AA 0F:999A: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F9AB 0F:999B: FC        .byte $FC   ; 
- D 3 - I - 0x03F9AC 0F:999C: C2        .byte $C2   ; 
- D 3 - I - 0x03F9AD 0F:999D: 67        .byte $67   ; <g>
- D 3 - I - 0x03F9AE 0F:999E: 42        .byte $42   ; <B>
- D 3 - I - 0x03F9AF 0F:999F: C5        .byte $C5   ; 
- D 3 - I - 0x03F9B0 0F:99A0: CD        .byte $CD   ; 
- D 3 - I - 0x03F9B1 0F:99A1: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F9B2 0F:99A2: FC        .byte $FC   ; 
- D 3 - I - 0x03F9B3 0F:99A3: 46        .byte $46   ; <F>
- D 3 - I - 0x03F9B4 0F:99A4: 60        .byte $60   ; 
- D 3 - I - 0x03F9B5 0F:99A5: 4F        .byte $4F   ; <O>
- D 3 - I - 0x03F9B6 0F:99A6: 68        .byte $68   ; <h>
- D 3 - I - 0x03F9B7 0F:99A7: CD        .byte $CD   ; 
- D 3 - I - 0x03F9B8 0F:99A8: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F9B9 0F:99A9: FC        .byte $FC   ; 
- D 3 - I - 0x03F9BA 0F:99AA: 54        .byte $54   ; <T>
- D 3 - I - 0x03F9BB 0F:99AB: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F9BC 0F:99AC: CF        .byte $CF   ; 
- D 3 - I - 0x03F9BD 0F:99AD: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F9BE 0F:99AE: CE        .byte $CE   ; 
- D 3 - I - 0x03F9BF 0F:99AF: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F9C0 0F:99B0: CD        .byte $CD   ; 
- D 3 - I - 0x03F9C1 0F:99B1: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F9C2 0F:99B2: FC        .byte $FC   ; 
- D 3 - I - 0x03F9C3 0F:99B3: 6C        .byte $6C   ; <l>
- D 3 - I - 0x03F9C4 0F:99B4: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F9C5 0F:99B5: 52        .byte $52   ; <R>
- D 3 - I - 0x03F9C6 0F:99B6: 7D        .byte $7D   ; 
- D 3 - I - 0x03F9C7 0F:99B7: 68        .byte $68   ; <h>
- D 3 - I - 0x03F9C8 0F:99B8: 50        .byte $50   ; <P>
- D 3 - I - 0x03F9C9 0F:99B9: 7D        .byte $7D   ; 
- D 3 - I - 0x03F9CA 0F:99BA: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F9CB 0F:99BB: FC        .byte $FC   ; 
- D 3 - I - 0x03F9CC 0F:99BC: B8        .byte $B8   ; 
- D 3 - I - 0x03F9CD 0F:99BD: 7D        .byte $7D   ; 
- D 3 - I - 0x03F9CE 0F:99BE: 69        .byte $69   ; <i>
- D 3 - I - 0x03F9CF 0F:99BF: C1        .byte $C1   ; 
- D 3 - I - 0x03F9D0 0F:99C0: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F9D1 0F:99C1: 4A        .byte $4A   ; <J>
- D 3 - I - 0x03F9D2 0F:99C2: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F9D3 0F:99C3: C4        .byte $C4   ; 
- D 3 - I - 0x03F9D4 0F:99C4: FC        .byte $FC   ; 
- D 3 - I - 0x03F9D5 0F:99C5: 14        .byte $14   ; 
- D 3 - I - 0x03F9D6 0F:99C6: 03        .byte $03   ; 
- D 3 - I - 0x03F9D7 0F:99C7: 1E        .byte $1E   ; 
- D 3 - I - 0x03F9D8 0F:99C8: 03        .byte $03   ; 
- D 3 - I - 0x03F9D9 0F:99C9: 4A        .byte $4A   ; <J>
- D 3 - I - 0x03F9DA 0F:99CA: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F9DB 0F:99CB: C4        .byte $C4   ; 
- D 3 - I - 0x03F9DC 0F:99CC: FC        .byte $FC   ; 
- D 3 - I - 0x03F9DD 0F:99CD: BA        .byte $BA   ; 
- D 3 - I - 0x03F9DE 0F:99CE: 75        .byte $75   ; <u>
- D 3 - I - 0x03F9DF 0F:99CF: 60        .byte $60   ; 
- D 3 - I - 0x03F9E0 0F:99D0: 56        .byte $56   ; <V>
- D 3 - I - 0x03F9E1 0F:99D1: 41        .byte $41   ; <A>
- D 3 - I - 0x03F9E2 0F:99D2: 50        .byte $50   ; <P>
- D 3 - I - 0x03F9E3 0F:99D3: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F9E4 0F:99D4: 48        .byte $48   ; <H>
- D 3 - I - 0x03F9E5 0F:99D5: FC        .byte $FC   ; 
- D 3 - I - 0x03F9E6 0F:99D6: 44        .byte $44   ; <D>
- D 3 - I - 0x03F9E7 0F:99D7: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F9E8 0F:99D8: 5C        .byte $5C   ; 
- D 3 - I - 0x03F9E9 0F:99D9: 75        .byte $75   ; <u>
- D 3 - I - 0x03F9EA 0F:99DA: 69        .byte $69   ; <i>
- D 3 - I - 0x03F9EB 0F:99DB: 0A        .byte $0A   ; 
- D 3 - I - 0x03F9EC 0F:99DC: 03        .byte $03   ; 
- D 3 - I - 0x03F9ED 0F:99DD: A3        .byte $A3   ; 
- D 3 - I - 0x03F9EE 0F:99DE: 07        .byte $07   ; 
- D 3 - I - 0x03F9EF 0F:99DF: FC        .byte $FC   ; 
- D 3 - I - 0x03F9F0 0F:99E0: C5        .byte $C5   ; 
- D 3 - I - 0x03F9F1 0F:99E1: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F9F2 0F:99E2: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F9F3 0F:99E3: 48        .byte $48   ; <H>
- D 3 - I - 0x03F9F4 0F:99E4: FC        .byte $FC   ; 
- D 3 - I - 0x03F9F5 0F:99E5: A0        .byte $A0   ; 
- D 3 - I - 0x03F9F6 0F:99E6: 2E        .byte $2E   ; 
- D 3 - I - 0x03F9F7 0F:99E7: 22        .byte $22   ; 
- D 3 - I - 0x03F9F8 0F:99E8: 2E        .byte $2E   ; 
- D 3 - I - 0x03F9F9 0F:99E9: C5        .byte $C5   ; 
- D 3 - I - 0x03F9FA 0F:99EA: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F9FB 0F:99EB: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F9FC 0F:99EC: 48        .byte $48   ; <H>
- D 3 - I - 0x03F9FD 0F:99ED: FC        .byte $FC   ; 
- D 3 - I - 0x03F9FE 0F:99EE: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F9FF 0F:99EF: 46        .byte $46   ; <F>
- D 3 - I - 0x03FA00 0F:99F0: 42        .byte $42   ; <B>
- D 3 - I - 0x03FA01 0F:99F1: 67        .byte $67   ; <g>
- D 3 - I - 0x03FA02 0F:99F2: C5        .byte $C5   ; 
- D 3 - I - 0x03FA03 0F:99F3: C5        .byte $C5   ; 
- D 3 - I - 0x03FA04 0F:99F4: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03FA05 0F:99F5: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03FA06 0F:99F6: 48        .byte $48   ; <H>
- D 3 - I - 0x03FA07 0F:99F7: FC        .byte $FC   ; 
- D 3 - I - 0x03FA08 0F:99F8: CD        .byte $CD   ; 
- D 3 - I - 0x03FA09 0F:99F9: 6C        .byte $6C   ; <l>
- D 3 - I - 0x03FA0A 0F:99FA: 7D        .byte $7D   ; 
- D 3 - I - 0x03FA0B 0F:99FB: C5        .byte $C5   ; 
- D 3 - I - 0x03FA0C 0F:99FC: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03FA0D 0F:99FD: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03FA0E 0F:99FE: 48        .byte $48   ; <H>
- D 3 - I - 0x03FA0F 0F:99FF: FC        .byte $FC   ; 
- D 3 - I - 0x03FA10 0F:9A00: 50        .byte $50   ; <P>
- D 3 - I - 0x03FA11 0F:9A01: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03FA12 0F:9A02: 48        .byte $48   ; <H>
- D 3 - I - 0x03FA13 0F:9A03: 69        .byte $69   ; <i>
- D 3 - I - 0x03FA14 0F:9A04: FC        .byte $FC   ; 
- D 3 - I - 0x03FA15 0F:9A05: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03FA16 0F:9A06: 46        .byte $46   ; <F>
- D 3 - I - 0x03FA17 0F:9A07: 42        .byte $42   ; <B>
- D 3 - I - 0x03FA18 0F:9A08: 67        .byte $67   ; <g>
- D 3 - I - 0x03FA19 0F:9A09: C5        .byte $C5   ; 
- D 3 - I - 0x03FA1A 0F:9A0A: 50        .byte $50   ; <P>
- D 3 - I - 0x03FA1B 0F:9A0B: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03FA1C 0F:9A0C: 48        .byte $48   ; <H>
- D 3 - I - 0x03FA1D 0F:9A0D: 69        .byte $69   ; <i>
- D 3 - I - 0x03FA1E 0F:9A0E: FC        .byte $FC   ; 
- D 3 - I - 0x03FA1F 0F:9A0F: 46        .byte $46   ; <F>
- D 3 - I - 0x03FA20 0F:9A10: 60        .byte $60   ; 
- D 3 - I - 0x03FA21 0F:9A11: 4F        .byte $4F   ; <O>
- D 3 - I - 0x03FA22 0F:9A12: 68        .byte $68   ; <h>
- D 3 - I - 0x03FA23 0F:9A13: 50        .byte $50   ; <P>
- D 3 - I - 0x03FA24 0F:9A14: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03FA25 0F:9A15: 48        .byte $48   ; <H>
- D 3 - I - 0x03FA26 0F:9A16: 69        .byte $69   ; <i>
- D 3 - I - 0x03FA27 0F:9A17: FC        .byte $FC   ; 
- D 3 - I - 0x03FA28 0F:9A18: CD        .byte $CD   ; 
- D 3 - I - 0x03FA29 0F:9A19: 6C        .byte $6C   ; <l>
- D 3 - I - 0x03FA2A 0F:9A1A: 7D        .byte $7D   ; 
- D 3 - I - 0x03FA2B 0F:9A1B: 50        .byte $50   ; <P>
- D 3 - I - 0x03FA2C 0F:9A1C: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03FA2D 0F:9A1D: 48        .byte $48   ; <H>
- D 3 - I - 0x03FA2E 0F:9A1E: 69        .byte $69   ; <i>
- D 3 - I - 0x03FA2F 0F:9A1F: FC        .byte $FC   ; 
- D 3 - I - 0x03FA30 0F:9A20: 50        .byte $50   ; <P>
- D 3 - I - 0x03FA31 0F:9A21: 42        .byte $42   ; <B>
- D 3 - I - 0x03FA32 0F:9A22: B4        .byte $B4   ; 
- D 3 - I - 0x03FA33 0F:9A23: 7D        .byte $7D   ; 
- D 3 - I - 0x03FA34 0F:9A24: 50        .byte $50   ; <P>
- D 3 - I - 0x03FA35 0F:9A25: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03FA36 0F:9A26: 48        .byte $48   ; <H>
- D 3 - I - 0x03FA37 0F:9A27: 69        .byte $69   ; <i>
- D 3 - I - 0x03FA38 0F:9A28: FC        .byte $FC   ; 
- - - - - - 0x03FA39 0F:9A29: 50        .byte $50   ; <P>
- - - - - - 0x03FA3A 0F:9A2A: 6F        .byte $6F   ; <o>
- - - - - - 0x03FA3B 0F:9A2B: 48        .byte $48   ; <H>
- - - - - - 0x03FA3C 0F:9A2C: 69        .byte $69   ; <i>
- - - - - - 0x03FA3D 0F:9A2D: FC        .byte $FC   ; 
- D 3 - I - 0x03FA3E 0F:9A2E: CD        .byte $CD   ; 
- D 3 - I - 0x03FA3F 0F:9A2F: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03FA40 0F:9A30: 46        .byte $46   ; <F>
- D 3 - I - 0x03FA41 0F:9A31: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03FA42 0F:9A32: 54        .byte $54   ; <T>
- D 3 - I - 0x03FA43 0F:9A33: FC        .byte $FC   ; 
- D 3 - I - 0x03FA44 0F:9A34: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03FA45 0F:9A35: 46        .byte $46   ; <F>
- D 3 - I - 0x03FA46 0F:9A36: 42        .byte $42   ; <B>
- D 3 - I - 0x03FA47 0F:9A37: 67        .byte $67   ; <g>
- D 3 - I - 0x03FA48 0F:9A38: C5        .byte $C5   ; 
- D 3 - I - 0x03FA49 0F:9A39: CD        .byte $CD   ; 
- D 3 - I - 0x03FA4A 0F:9A3A: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03FA4B 0F:9A3B: 46        .byte $46   ; <F>
- D 3 - I - 0x03FA4C 0F:9A3C: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03FA4D 0F:9A3D: 54        .byte $54   ; <T>
- D 3 - I - 0x03FA4E 0F:9A3E: FC        .byte $FC   ; 
- D 3 - I - 0x03FA4F 0F:9A3F: 54        .byte $54   ; <T>
- D 3 - I - 0x03FA50 0F:9A40: 67        .byte $67   ; <g>
- D 3 - I - 0x03FA51 0F:9A41: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03FA52 0F:9A42: CF        .byte $CF   ; 
- D 3 - I - 0x03FA53 0F:9A43: FC        .byte $FC   ; 
- D 3 - I - 0x03FA54 0F:9A44: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03FA55 0F:9A45: 69        .byte $69   ; <i>
- D 3 - I - 0x03FA56 0F:9A46: 7D        .byte $7D   ; 
- D 3 - I - 0x03FA57 0F:9A47: FC        .byte $FC   ; 
- D 3 - I - 0x03FA58 0F:9A48: 48        .byte $48   ; <H>
- D 3 - I - 0x03FA59 0F:9A49: 68        .byte $68   ; <h>
- D 3 - I - 0x03FA5A 0F:9A4A: 41        .byte $41   ; <A>
- D 3 - I - 0x03FA5B 0F:9A4B: 7D        .byte $7D   ; 
- D 3 - I - 0x03FA5C 0F:9A4C: FC        .byte $FC   ; 
- - - - - - 0x03FA5D 0F:9A4D: 48        .byte $48   ; <H>
- - - - - - 0x03FA5E 0F:9A4E: 68        .byte $68   ; <h>
- - - - - - 0x03FA5F 0F:9A4F: 41        .byte $41   ; <A>
- - - - - - 0x03FA60 0F:9A50: 7D        .byte $7D   ; 
- - - - - - 0x03FA61 0F:9A51: FC        .byte $FC   ; 
- - - - - - 0x03FA62 0F:9A52: 0E        .byte $0E   ; 
- - - - - - 0x03FA63 0F:9A53: 28        .byte $28   ; 
- - - - - - 0x03FA64 0F:9A54: 01        .byte $01   ; 
- - - - - - 0x03FA65 0F:9A55: 02        .byte $02   ; 
- - - - - - 0x03FA66 0F:9A56: FC        .byte $FC   ; 
- - - - - - 0x03FA67 0F:9A57: 0E        .byte $0E   ; 
- - - - - - 0x03FA68 0F:9A58: 28        .byte $28   ; 
- - - - - - 0x03FA69 0F:9A59: 01        .byte $01   ; 
- - - - - - 0x03FA6A 0F:9A5A: 02        .byte $02   ; 
- - - - - - 0x03FA6B 0F:9A5B: FC        .byte $FC   ; 
- - - - - - 0x03FA6C 0F:9A5C: 5C        .byte $5C   ; 
- - - - - - 0x03FA6D 0F:9A5D: 76        .byte $76   ; <v>
- - - - - - 0x03FA6E 0F:9A5E: 6B        .byte $6B   ; <k>
- - - - - - 0x03FA6F 0F:9A5F: 7D        .byte $7D   ; 
- - - - - - 0x03FA70 0F:9A60: FC        .byte $FC   ; 
- D 3 - I - 0x03FA71 0F:9A61: 47        .byte $47   ; <G>
- D 3 - I - 0x03FA72 0F:9A62: 70        .byte $70   ; <p>
- D 3 - I - 0x03FA73 0F:9A63: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03FA74 0F:9A64: 51        .byte $51   ; <Q>
- D 3 - I - 0x03FA75 0F:9A65: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03FA76 0F:9A66: B6        .byte $B6   ; 
- D 3 - I - 0x03FA77 0F:9A67: FC        .byte $FC   ; 
- - - - - - 0x03FA78 0F:9A68: 6B        .byte $6B   ; <k>
- - - - - - 0x03FA79 0F:9A69: 7D        .byte $7D   ; 
- - - - - - 0x03FA7A 0F:9A6A: 68        .byte $68   ; <h>
- - - - - - 0x03FA7B 0F:9A6B: 6E        .byte $6E   ; <n>
- - - - - - 0x03FA7C 0F:9A6C: B6        .byte $B6   ; 
- - - - - - 0x03FA7D 0F:9A6D: 4E        .byte $4E   ; <N>
- - - - - - 0x03FA7E 0F:9A6E: 7D        .byte $7D   ; 
- - - - - - 0x03FA7F 0F:9A6F: C5        .byte $C5   ; 
- - - - - - 0x03FA80 0F:9A70: FC        .byte $FC   ; 
- - - - - - 0x03FA81 0F:9A71: B1        .byte $B1   ; 
- - - - - - 0x03FA82 0F:9A72: 2E        .byte $2E   ; 
- - - - - - 0x03FA83 0F:9A73: 0C        .byte $0C   ; 
- - - - - - 0x03FA84 0F:9A74: 2E        .byte $2E   ; 
- - - - - - 0x03FA85 0F:9A75: 4E        .byte $4E   ; <N>
- - - - - - 0x03FA86 0F:9A76: 7D        .byte $7D   ; 
- - - - - - 0x03FA87 0F:9A77: C5        .byte $C5   ; 
- - - - - - 0x03FA88 0F:9A78: FC        .byte $FC   ; 
- - - - - - 0x03FA89 0F:9A79: AA        .byte $AA   ; 
- - - - - - 0x03FA8A 0F:9A7A: 02        .byte $02   ; 
- - - - - - 0x03FA8B 0F:9A7B: 06        .byte $06   ; 
- - - - - - 0x03FA8C 0F:9A7C: 02        .byte $02   ; 
- - - - - - 0x03FA8D 0F:9A7D: 13        .byte $13   ; 
- - - - - - 0x03FA8E 0F:9A7E: 2E        .byte $2E   ; 
- - - - - - 0x03FA8F 0F:9A7F: 4E        .byte $4E   ; <N>
- - - - - - 0x03FA90 0F:9A80: 7D        .byte $7D   ; 
- - - - - - 0x03FA91 0F:9A81: C5        .byte $C5   ; 
- - - - - - 0x03FA92 0F:9A82: FC        .byte $FC   ; 
- D 3 - I - 0x03FA93 0F:9A83: CD        .byte $CD   ; 
- D 3 - I - 0x03FA94 0F:9A84: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03FA95 0F:9A85: 51        .byte $51   ; <Q>
- D 3 - I - 0x03FA96 0F:9A86: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03FA97 0F:9A87: B6        .byte $B6   ; 
- D 3 - I - 0x03FA98 0F:9A88: FC        .byte $FC   ; 
- D 3 - I - 0x03FA99 0F:9A89: 0B        .byte $0B   ; 
- D 3 - I - 0x03FA9A 0F:9A8A: 2E        .byte $2E   ; 
- D 3 - I - 0x03FA9B 0F:9A8B: 06        .byte $06   ; 
- D 3 - I - 0x03FA9C 0F:9A8C: 08        .byte $08   ; 
- D 3 - I - 0x03FA9D 0F:9A8D: 14        .byte $14   ; 
- D 3 - I - 0x03FA9E 0F:9A8E: B0        .byte $B0   ; 
- D 3 - I - 0x03FA9F 0F:9A8F: FC        .byte $FC   ; 
- D 3 - I - 0x03FAA0 0F:9A90: 0D        .byte $0D   ; 
- D 3 - I - 0x03FAA1 0F:9A91: 29        .byte $29   ; 
- D 3 - I - 0x03FAA2 0F:9A92: AE        .byte $AE   ; 
- D 3 - I - 0x03FAA3 0F:9A93: 02        .byte $02   ; 
- D 3 - I - 0x03FAA4 0F:9A94: 00        .byte $00   ; 
- D 3 - I - 0x03FAA5 0F:9A95: FC        .byte $FC   ; 
- D 3 - I - 0x03FAA6 0F:9A96: 0D        .byte $0D   ; 
- D 3 - I - 0x03FAA7 0F:9A97: AF        .byte $AF   ; 
- D 3 - I - 0x03FAA8 0F:9A98: 24        .byte $24   ; 
- D 3 - I - 0x03FAA9 0F:9A99: 08        .byte $08   ; 
- D 3 - I - 0x03FAAA 0F:9A9A: 00        .byte $00   ; 
- D 3 - I - 0x03FAAB 0F:9A9B: FC        .byte $FC   ; 
- D 3 - I - 0x03FAAC 0F:9A9C: 07        .byte $07   ; 
- D 3 - I - 0x03FAAD 0F:9A9D: 32        .byte $32   ; <2>
- D 3 - I - 0x03FAAE 0F:9A9E: 03        .byte $03   ; 
- D 3 - I - 0x03FAAF 0F:9A9F: 2A        .byte $2A   ; 
- D 3 - I - 0x03FAB0 0F:9AA0: 12        .byte $12   ; 
- D 3 - I - 0x03FAB1 0F:9AA1: 15        .byte $15   ; 
- D 3 - I - 0x03FAB2 0F:9AA2: 00        .byte $00   ; 
- D 3 - I - 0x03FAB3 0F:9AA3: FC        .byte $FC   ; 
- D 3 - I - 0x03FAB4 0F:9AA4: 03        .byte $03   ; 
- D 3 - I - 0x03FAB5 0F:9AA5: 1F        .byte $1F   ; 
- D 3 - I - 0x03FAB6 0F:9AA6: 02        .byte $02   ; 
- D 3 - I - 0x03FAB7 0F:9AA7: 00        .byte $00   ; 
- D 3 - I - 0x03FAB8 0F:9AA8: FC        .byte $FC   ; 
- D 3 - I - 0x03FAB9 0F:9AA9: 07        .byte $07   ; 
- D 3 - I - 0x03FABA 0F:9AAA: 32        .byte $32   ; <2>
- D 3 - I - 0x03FABB 0F:9AAB: 03        .byte $03   ; 
- D 3 - I - 0x03FABC 0F:9AAC: 2A        .byte $2A   ; 
- D 3 - I - 0x03FABD 0F:9AAD: 12        .byte $12   ; 
- D 3 - I - 0x03FABE 0F:9AAE: 15        .byte $15   ; 
- D 3 - I - 0x03FABF 0F:9AAF: FC        .byte $FC   ; 
- D 3 - I - 0x03FAC0 0F:9AB0: 4E        .byte $4E   ; <N>
- D 3 - I - 0x03FAC1 0F:9AB1: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03FAC2 0F:9AB2: 50        .byte $50   ; <P>
- D 3 - I - 0x03FAC3 0F:9AB3: 68        .byte $68   ; <h>
- D 3 - I - 0x03FAC4 0F:9AB4: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03FAC5 0F:9AB5: B6        .byte $B6   ; 
- D 3 - I - 0x03FAC6 0F:9AB6: FC        .byte $FC   ; 
- D 3 - I - 0x03FAC7 0F:9AB7: D0        .byte $D0   ; 
- D 3 - I - 0x03FAC8 0F:9AB8: 55        .byte $55   ; <U>
- D 3 - I - 0x03FAC9 0F:9AB9: 69        .byte $69   ; <i>
- D 3 - I - 0x03FACA 0F:9ABA: 53        .byte $53   ; <S>
- D 3 - I - 0x03FACB 0F:9ABB: 74        .byte $74   ; <t>
- D 3 - I - 0x03FACC 0F:9ABC: 47        .byte $47   ; <G>
- D 3 - I - 0x03FACD 0F:9ABD: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03FACE 0F:9ABE: 48        .byte $48   ; <H>
- D 3 - I - 0x03FACF 0F:9ABF: FC        .byte $FC   ; 
- D 3 - I - 0x03FAD0 0F:9AC0: C7        .byte $C7   ; 
- D 3 - I - 0x03FAD1 0F:9AC1: 7D        .byte $7D   ; 
- D 3 - I - 0x03FAD2 0F:9AC2: 69        .byte $69   ; <i>
- D 3 - I - 0x03FAD3 0F:9AC3: FC        .byte $FC   ; 
- D 3 - I - 0x03FAD4 0F:9AC4: B8        .byte $B8   ; 
- D 3 - I - 0x03FAD5 0F:9AC5: 7D        .byte $7D   ; 
- D 3 - I - 0x03FAD6 0F:9AC6: 69        .byte $69   ; <i>
- D 3 - I - 0x03FAD7 0F:9AC7: FC        .byte $FC   ; 
- D 3 - I - 0x03FAD8 0F:9AC8: 50        .byte $50   ; <P>
- D 3 - I - 0x03FAD9 0F:9AC9: 42        .byte $42   ; <B>
- D 3 - I - 0x03FADA 0F:9ACA: 79        .byte $79   ; <y>
- D 3 - I - 0x03FADB 0F:9ACB: FC        .byte $FC   ; 
- D 3 - - - 0x03FADC 0F:9ACC: 06        .byte $06   ; 
- D 3 - - - 0x03FADD 0F:9ACD: 00        .byte $00   ; 
- D 3 - - - 0x03FADE 0F:9ACE: 0D        .byte $0D   ; 
- D 3 - - - 0x03FADF 0F:9ACF: 00        .byte $00   ; 
- D 3 - - - 0x03FAE0 0F:9AD0: 13        .byte $13   ; 
- D 3 - - - 0x03FAE1 0F:9AD1: 00        .byte $00   ; 
- D 3 - - - 0x03FAE2 0F:9AD2: 19        .byte $19   ; 
- D 3 - - - 0x03FAE3 0F:9AD3: 00        .byte $00   ; 
- D 3 - - - 0x03FAE4 0F:9AD4: 20        .byte $20   ; 
- D 3 - - - 0x03FAE5 0F:9AD5: 00        .byte $00   ; 
- D 3 - - - 0x03FAE6 0F:9AD6: 26        .byte $26   ; 
- D 3 - - - 0x03FAE7 0F:9AD7: 00        .byte $00   ; 
- D 3 - - - 0x03FAE8 0F:9AD8: 2C        .byte $2C   ; 
- D 3 - - - 0x03FAE9 0F:9AD9: 00        .byte $00   ; 
- D 3 - - - 0x03FAEA 0F:9ADA: 33        .byte $33   ; <3>
- D 3 - - - 0x03FAEB 0F:9ADB: 00        .byte $00   ; 
- D 3 - - - 0x03FAEC 0F:9ADC: 39        .byte $39   ; <9>
- D 3 - - - 0x03FAED 0F:9ADD: 00        .byte $00   ; 
- D 3 - - - 0x03FAEE 0F:9ADE: 40        .byte $40   ; 
- D 3 - - - 0x03FAEF 0F:9ADF: 00        .byte $00   ; 
- D 3 - - - 0x03FAF0 0F:9AE0: 47        .byte $47   ; <G>
- D 3 - - - 0x03FAF1 0F:9AE1: 00        .byte $00   ; 
- D 3 - - - 0x03FAF2 0F:9AE2: 4E        .byte $4E   ; <N>
- D 3 - - - 0x03FAF3 0F:9AE3: 00        .byte $00   ; 
- D 3 - - - 0x03FAF4 0F:9AE4: 55        .byte $55   ; <U>
- D 3 - - - 0x03FAF5 0F:9AE5: 00        .byte $00   ; 
- D 3 - - - 0x03FAF6 0F:9AE6: 5C        .byte $5C   ; 
- D 3 - - - 0x03FAF7 0F:9AE7: 00        .byte $00   ; 
- D 3 - - - 0x03FAF8 0F:9AE8: 63        .byte $63   ; <c>
- D 3 - - - 0x03FAF9 0F:9AE9: 00        .byte $00   ; 
- D 3 - - - 0x03FAFA 0F:9AEA: 6A        .byte $6A   ; <j>
- D 3 - - - 0x03FAFB 0F:9AEB: 00        .byte $00   ; 
- D 3 - - - 0x03FAFC 0F:9AEC: 71        .byte $71   ; <q>
- D 3 - - - 0x03FAFD 0F:9AED: 00        .byte $00   ; 
- D 3 - - - 0x03FAFE 0F:9AEE: 79        .byte $79   ; <y>
- D 3 - - - 0x03FAFF 0F:9AEF: 00        .byte $00   ; 
- D 3 - - - 0x03FB00 0F:9AF0: 81        .byte $81   ; 
- D 3 - - - 0x03FB01 0F:9AF1: 00        .byte $00   ; 
- D 3 - - - 0x03FB02 0F:9AF2: 89        .byte $89   ; 
- D 3 - - - 0x03FB03 0F:9AF3: 00        .byte $00   ; 
- D 3 - - - 0x03FB04 0F:9AF4: 91        .byte $91   ; 
- D 3 - - - 0x03FB05 0F:9AF5: 00        .byte $00   ; 
- D 3 - - - 0x03FB06 0F:9AF6: 99        .byte $99   ; 
- D 3 - - - 0x03FB07 0F:9AF7: 00        .byte $00   ; 
- D 3 - - - 0x03FB08 0F:9AF8: A2        .byte $A2   ; 
- D 3 - - - 0x03FB09 0F:9AF9: 00        .byte $00   ; 
- D 3 - - - 0x03FB0A 0F:9AFA: AB        .byte $AB   ; 
- D 3 - - - 0x03FB0B 0F:9AFB: 00        .byte $00   ; 
- D 3 - - - 0x03FB0C 0F:9AFC: B4        .byte $B4   ; 
- D 3 - - - 0x03FB0D 0F:9AFD: 00        .byte $00   ; 
- D 3 - - - 0x03FB0E 0F:9AFE: BE        .byte $BE   ; 
- D 3 - - - 0x03FB0F 0F:9AFF: 00        .byte $00   ; 
- D 3 - - - 0x03FB10 0F:9B00: C8        .byte $C8   ; 
- D 3 - - - 0x03FB11 0F:9B01: 00        .byte $00   ; 
- D 3 - - - 0x03FB12 0F:9B02: D2        .byte $D2   ; 
- D 3 - - - 0x03FB13 0F:9B03: 00        .byte $00   ; 
- D 3 - - - 0x03FB14 0F:9B04: DD        .byte $DD   ; 
- D 3 - - - 0x03FB15 0F:9B05: 00        .byte $00   ; 
- D 3 - - - 0x03FB16 0F:9B06: E8        .byte $E8   ; 
- D 3 - - - 0x03FB17 0F:9B07: 00        .byte $00   ; 
- D 3 - - - 0x03FB18 0F:9B08: F4        .byte $F4   ; 
- D 3 - - - 0x03FB19 0F:9B09: 00        .byte $00   ; 
- D 3 - - - 0x03FB1A 0F:9B0A: 00        .byte $00   ; 
- D 3 - - - 0x03FB1B 0F:9B0B: 01        .byte $01   ; 
- D 3 - - - 0x03FB1C 0F:9B0C: 0D        .byte $0D   ; 
- D 3 - - - 0x03FB1D 0F:9B0D: 01        .byte $01   ; 
- D 3 - - - 0x03FB1E 0F:9B0E: 1A        .byte $1A   ; 
- D 3 - - - 0x03FB1F 0F:9B0F: 01        .byte $01   ; 
- D 3 - - - 0x03FB20 0F:9B10: 29        .byte $29   ; 
- D 3 - - - 0x03FB21 0F:9B11: 01        .byte $01   ; 
- D 3 - - - 0x03FB22 0F:9B12: 38        .byte $38   ; <8>
- D 3 - - - 0x03FB23 0F:9B13: 01        .byte $01   ; 
- D 3 - - - 0x03FB24 0F:9B14: 48        .byte $48   ; <H>
- D 3 - - - 0x03FB25 0F:9B15: 01        .byte $01   ; 
- D 3 - - - 0x03FB26 0F:9B16: 59        .byte $59   ; <Y>
- D 3 - - - 0x03FB27 0F:9B17: 01        .byte $01   ; 
- D 3 - - - 0x03FB28 0F:9B18: 6B        .byte $6B   ; <k>
- D 3 - - - 0x03FB29 0F:9B19: 01        .byte $01   ; 
- D 3 - - - 0x03FB2A 0F:9B1A: 7F        .byte $7F   ; 
- D 3 - - - 0x03FB2B 0F:9B1B: 01        .byte $01   ; 
- D 3 - - - 0x03FB2C 0F:9B1C: 94        .byte $94   ; 
- D 3 - - - 0x03FB2D 0F:9B1D: 01        .byte $01   ; 
- D 3 - - - 0x03FB2E 0F:9B1E: AB        .byte $AB   ; 
- D 3 - - - 0x03FB2F 0F:9B1F: 01        .byte $01   ; 
- D 3 - - - 0x03FB30 0F:9B20: C4        .byte $C4   ; 
- D 3 - - - 0x03FB31 0F:9B21: 01        .byte $01   ; 
- D 3 - - - 0x03FB32 0F:9B22: DF        .byte $DF   ; 
- D 3 - - - 0x03FB33 0F:9B23: 01        .byte $01   ; 
- D 3 - - - 0x03FB34 0F:9B24: FD        .byte $FD   ; 
- D 3 - - - 0x03FB35 0F:9B25: 01        .byte $01   ; 
- D 3 - - - 0x03FB36 0F:9B26: 1D        .byte $1D   ; 
- D 3 - - - 0x03FB37 0F:9B27: 02        .byte $02   ; 
- D 3 - - - 0x03FB38 0F:9B28: 42        .byte $42   ; <B>
- D 3 - - - 0x03FB39 0F:9B29: 02        .byte $02   ; 
- D 3 - - - 0x03FB3A 0F:9B2A: 6A        .byte $6A   ; <j>
- D 3 - - - 0x03FB3B 0F:9B2B: 02        .byte $02   ; 
- D 3 - - - 0x03FB3C 0F:9B2C: 98        .byte $98   ; 
- D 3 - - - 0x03FB3D 0F:9B2D: 02        .byte $02   ; 
- D 3 - - - 0x03FB3E 0F:9B2E: DB        .byte $DB   ; 
- D 3 - - - 0x03FB3F 0F:9B2F: 02        .byte $02   ; 
- D 3 - - - 0x03FB40 0F:9B30: 07        .byte $07   ; 
- D 3 - - - 0x03FB41 0F:9B31: 03        .byte $03   ; 
- D 3 - - - 0x03FB42 0F:9B32: 4C        .byte $4C   ; <L>
- D 3 - - - 0x03FB43 0F:9B33: 03        .byte $03   ; 
- D 3 - - - 0x03FB44 0F:9B34: 9D        .byte $9D   ; 
- D 3 - - - 0x03FB45 0F:9B35: 03        .byte $03   ; 
- D 3 - - - 0x03FB46 0F:9B36: FE        .byte $FE   ; 
- D 3 - - - 0x03FB47 0F:9B37: 03        .byte $03   ; 
- D 3 - - - 0x03FB48 0F:9B38: 74        .byte $74   ; <t>
- D 3 - - - 0x03FB49 0F:9B39: 04        .byte $04   ; 
- D 3 - - - 0x03FB4A 0F:9B3A: 07        .byte $07   ; 
- D 3 - - - 0x03FB4B 0F:9B3B: 05        .byte $05   ; 
- D 3 - - - 0x03FB4C 0F:9B3C: C3        .byte $C3   ; 
- D 3 - - - 0x03FB4D 0F:9B3D: 05        .byte $05   ; 
- D 3 - - - 0x03FB4E 0F:9B3E: BE        .byte $BE   ; 
- D 3 - - - 0x03FB4F 0F:9B3F: 06        .byte $06   ; 
- D 3 - - - 0x03FB50 0F:9B40: 1B        .byte $1B   ; 
- D 3 - - - 0x03FB51 0F:9B41: 08        .byte $08   ; 
- D 3 - - - 0x03FB52 0F:9B42: 27        .byte $27   ; 
- D 3 - - - 0x03FB53 0F:9B43: 0A        .byte $0A   ; 
- D 3 - - - 0x03FB54 0F:9B44: 8F        .byte $8F   ; 
- D 3 - - - 0x03FB55 0F:9B45: 0D        .byte $0D   ; 
- D 3 - - - 0x03FB56 0F:9B46: 5B        .byte $5B   ; 
- D 3 - - - 0x03FB57 0F:9B47: 20        .byte $20   ; 
- D 3 - - - 0x03FB58 0F:9B48: BC        .byte $BC   ; 
- D 3 - - - 0x03FB59 0F:9B49: 40        .byte $40   ; 
- D 3 - - - 0x03FB5A 0F:9B4A: FF        .byte $FF   ; 
- D 3 - - - 0x03FB5B 0F:9B4B: FF        .byte $FF   ; 
- D 3 - - - 0x03FB5C 0F:9B4C: 00        .byte $00   ; 
- D 3 - - - 0x03FB5D 0F:9B4D: 00        .byte $00   ; 
- D 3 - - - 0x03FB5E 0F:9B4E: 00        .byte $00   ; 
- D 3 - - - 0x03FB5F 0F:9B4F: 00        .byte $00   ; 
- D 3 - - - 0x03FB60 0F:9B50: 06        .byte $06   ; 
- D 3 - - - 0x03FB61 0F:9B51: 00        .byte $00   ; 
- D 3 - - - 0x03FB62 0F:9B52: 0C        .byte $0C   ; 
- D 3 - - - 0x03FB63 0F:9B53: 00        .byte $00   ; 
- D 3 - - - 0x03FB64 0F:9B54: 12        .byte $12   ; 
- D 3 - - - 0x03FB65 0F:9B55: 00        .byte $00   ; 
- D 3 - - - 0x03FB66 0F:9B56: 19        .byte $19   ; 
- D 3 - - - 0x03FB67 0F:9B57: 00        .byte $00   ; 
- D 3 - - - 0x03FB68 0F:9B58: 1F        .byte $1F   ; 
- D 3 - - - 0x03FB69 0F:9B59: 00        .byte $00   ; 
- D 3 - - - 0x03FB6A 0F:9B5A: 25        .byte $25   ; 
- D 3 - - - 0x03FB6B 0F:9B5B: 00        .byte $00   ; 
- D 3 - - - 0x03FB6C 0F:9B5C: 2B        .byte $2B   ; 
- D 3 - - - 0x03FB6D 0F:9B5D: 00        .byte $00   ; 
- D 3 - - - 0x03FB6E 0F:9B5E: 31        .byte $31   ; <1>
- D 3 - - - 0x03FB6F 0F:9B5F: 00        .byte $00   ; 
- D 3 - - - 0x03FB70 0F:9B60: 38        .byte $38   ; <8>
- D 3 - - - 0x03FB71 0F:9B61: 00        .byte $00   ; 
- D 3 - - - 0x03FB72 0F:9B62: 3E        .byte $3E   ; 
- D 3 - - - 0x03FB73 0F:9B63: 00        .byte $00   ; 
- D 3 - - - 0x03FB74 0F:9B64: 44        .byte $44   ; <D>
- D 3 - - - 0x03FB75 0F:9B65: 00        .byte $00   ; 
- D 3 - - - 0x03FB76 0F:9B66: 4A        .byte $4A   ; <J>
- D 3 - - - 0x03FB77 0F:9B67: 00        .byte $00   ; 
- D 3 - - - 0x03FB78 0F:9B68: 50        .byte $50   ; <P>
- D 3 - - - 0x03FB79 0F:9B69: 00        .byte $00   ; 
- D 3 - - - 0x03FB7A 0F:9B6A: 56        .byte $56   ; <V>
- D 3 - - - 0x03FB7B 0F:9B6B: 00        .byte $00   ; 
- D 3 - - - 0x03FB7C 0F:9B6C: 5C        .byte $5C   ; 
- D 3 - - - 0x03FB7D 0F:9B6D: 00        .byte $00   ; 
- D 3 - - - 0x03FB7E 0F:9B6E: 61        .byte $61   ; <a>
- D 3 - - - 0x03FB7F 0F:9B6F: 00        .byte $00   ; 
- D 3 - - - 0x03FB80 0F:9B70: 67        .byte $67   ; <g>
- D 3 - - - 0x03FB81 0F:9B71: 00        .byte $00   ; 
- D 3 - - - 0x03FB82 0F:9B72: 6D        .byte $6D   ; <m>
- D 3 - - - 0x03FB83 0F:9B73: 00        .byte $00   ; 
- D 3 - - - 0x03FB84 0F:9B74: 73        .byte $73   ; <s>
- D 3 - - - 0x03FB85 0F:9B75: 00        .byte $00   ; 
- D 3 - - - 0x03FB86 0F:9B76: 78        .byte $78   ; <x>
- D 3 - - - 0x03FB87 0F:9B77: 00        .byte $00   ; 
- D 3 - - - 0x03FB88 0F:9B78: 7E        .byte $7E   ; 
- D 3 - - - 0x03FB89 0F:9B79: 00        .byte $00   ; 
- D 3 - - - 0x03FB8A 0F:9B7A: 83        .byte $83   ; 
- D 3 - - - 0x03FB8B 0F:9B7B: 00        .byte $00   ; 
- D 3 - - - 0x03FB8C 0F:9B7C: 88        .byte $88   ; 
- D 3 - - - 0x03FB8D 0F:9B7D: 00        .byte $00   ; 
- D 3 - - - 0x03FB8E 0F:9B7E: 8E        .byte $8E   ; 
- D 3 - - - 0x03FB8F 0F:9B7F: 00        .byte $00   ; 
- D 3 - - - 0x03FB90 0F:9B80: 93        .byte $93   ; 
- D 3 - - - 0x03FB91 0F:9B81: 00        .byte $00   ; 
- D 3 - - - 0x03FB92 0F:9B82: 98        .byte $98   ; 
- D 3 - - - 0x03FB93 0F:9B83: 00        .byte $00   ; 
- D 3 - - - 0x03FB94 0F:9B84: 9D        .byte $9D   ; 
- D 3 - - - 0x03FB95 0F:9B85: 00        .byte $00   ; 
- D 3 - - - 0x03FB96 0F:9B86: A2        .byte $A2   ; 
- D 3 - - - 0x03FB97 0F:9B87: 00        .byte $00   ; 
- D 3 - - - 0x03FB98 0F:9B88: A7        .byte $A7   ; 
- D 3 - - - 0x03FB99 0F:9B89: 00        .byte $00   ; 
- D 3 - - - 0x03FB9A 0F:9B8A: AB        .byte $AB   ; 
- D 3 - - - 0x03FB9B 0F:9B8B: 00        .byte $00   ; 
- D 3 - - - 0x03FB9C 0F:9B8C: B0        .byte $B0   ; 
- D 3 - - - 0x03FB9D 0F:9B8D: 00        .byte $00   ; 
- D 3 - - - 0x03FB9E 0F:9B8E: B5        .byte $B5   ; 
- D 3 - - - 0x03FB9F 0F:9B8F: 00        .byte $00   ; 
- D 3 - - - 0x03FBA0 0F:9B90: B9        .byte $B9   ; 
- D 3 - - - 0x03FBA1 0F:9B91: 00        .byte $00   ; 
- D 3 - - - 0x03FBA2 0F:9B92: BD        .byte $BD   ; 
- D 3 - - - 0x03FBA3 0F:9B93: 00        .byte $00   ; 
- D 3 - - - 0x03FBA4 0F:9B94: C1        .byte $C1   ; 
- D 3 - - - 0x03FBA5 0F:9B95: 00        .byte $00   ; 
- D 3 - - - 0x03FBA6 0F:9B96: C5        .byte $C5   ; 
- D 3 - - - 0x03FBA7 0F:9B97: 00        .byte $00   ; 
- D 3 - - - 0x03FBA8 0F:9B98: C9        .byte $C9   ; 
- D 3 - - - 0x03FBA9 0F:9B99: 00        .byte $00   ; 
- D 3 - - - 0x03FBAA 0F:9B9A: CD        .byte $CD   ; 
- D 3 - - - 0x03FBAB 0F:9B9B: 00        .byte $00   ; 
- D 3 - - - 0x03FBAC 0F:9B9C: D1        .byte $D1   ; 
- D 3 - - - 0x03FBAD 0F:9B9D: 00        .byte $00   ; 
- D 3 - - - 0x03FBAE 0F:9B9E: D4        .byte $D4   ; 
- D 3 - - - 0x03FBAF 0F:9B9F: 00        .byte $00   ; 
- D 3 - - - 0x03FBB0 0F:9BA0: D8        .byte $D8   ; 
- D 3 - - - 0x03FBB1 0F:9BA1: 00        .byte $00   ; 
- D 3 - - - 0x03FBB2 0F:9BA2: DB        .byte $DB   ; 
- D 3 - - - 0x03FBB3 0F:9BA3: 00        .byte $00   ; 
- D 3 - - - 0x03FBB4 0F:9BA4: DE        .byte $DE   ; 
- D 3 - - - 0x03FBB5 0F:9BA5: 00        .byte $00   ; 
- D 3 - - - 0x03FBB6 0F:9BA6: E1        .byte $E1   ; 
- D 3 - - - 0x03FBB7 0F:9BA7: 00        .byte $00   ; 
- D 3 - - - 0x03FBB8 0F:9BA8: E4        .byte $E4   ; 
- D 3 - - - 0x03FBB9 0F:9BA9: 00        .byte $00   ; 
- D 3 - - - 0x03FBBA 0F:9BAA: E7        .byte $E7   ; 
- D 3 - - - 0x03FBBB 0F:9BAB: 00        .byte $00   ; 
- D 3 - - - 0x03FBBC 0F:9BAC: EA        .byte $EA   ; 
- D 3 - - - 0x03FBBD 0F:9BAD: 00        .byte $00   ; 
- D 3 - - - 0x03FBBE 0F:9BAE: EC        .byte $EC   ; 
- D 3 - - - 0x03FBBF 0F:9BAF: 00        .byte $00   ; 
- D 3 - - - 0x03FBC0 0F:9BB0: EE        .byte $EE   ; 
- D 3 - - - 0x03FBC1 0F:9BB1: 00        .byte $00   ; 
- D 3 - - - 0x03FBC2 0F:9BB2: F1        .byte $F1   ; 
- D 3 - - - 0x03FBC3 0F:9BB3: 00        .byte $00   ; 
- D 3 - - - 0x03FBC4 0F:9BB4: F3        .byte $F3   ; 
- D 3 - - - 0x03FBC5 0F:9BB5: 00        .byte $00   ; 
- D 3 - - - 0x03FBC6 0F:9BB6: F4        .byte $F4   ; 
- D 3 - - - 0x03FBC7 0F:9BB7: 00        .byte $00   ; 
- D 3 - - - 0x03FBC8 0F:9BB8: F6        .byte $F6   ; 
- D 3 - - - 0x03FBC9 0F:9BB9: 00        .byte $00   ; 
- D 3 - - - 0x03FBCA 0F:9BBA: F8        .byte $F8   ; 
- D 3 - - - 0x03FBCB 0F:9BBB: 00        .byte $00   ; 
- D 3 - - - 0x03FBCC 0F:9BBC: F9        .byte $F9   ; 
- D 3 - - - 0x03FBCD 0F:9BBD: 00        .byte $00   ; 
- D 3 - - - 0x03FBCE 0F:9BBE: FB        .byte $FB   ; 
- D 3 - - - 0x03FBCF 0F:9BBF: 00        .byte $00   ; 
- D 3 - - - 0x03FBD0 0F:9BC0: FC        .byte $FC   ; 
- D 3 - - - 0x03FBD1 0F:9BC1: 00        .byte $00   ; 
- D 3 - - - 0x03FBD2 0F:9BC2: FD        .byte $FD   ; 
- D 3 - - - 0x03FBD3 0F:9BC3: 00        .byte $00   ; 
- D 3 - - - 0x03FBD4 0F:9BC4: FE        .byte $FE   ; 
- D 3 - - - 0x03FBD5 0F:9BC5: 00        .byte $00   ; 
- D 3 - - - 0x03FBD6 0F:9BC6: FE        .byte $FE   ; 
- D 3 - - - 0x03FBD7 0F:9BC7: 00        .byte $00   ; 
- D 3 - - - 0x03FBD8 0F:9BC8: FF        .byte $FF   ; 
- D 3 - - - 0x03FBD9 0F:9BC9: 00        .byte $00   ; 
- D 3 - - - 0x03FBDA 0F:9BCA: 00        .byte $00   ; 
- D 3 - - - 0x03FBDB 0F:9BCB: 01        .byte $01   ; 
- D 3 - I - 0x03FBDC 0F:9BCC: 00        .byte $00   ; 
- D 3 - I - 0x03FBDD 0F:9BCD: 00        .byte $00   ; 
- D 3 - I - 0x03FBDE 0F:9BCE: 30        .byte $30   ; <0>
- D 3 - I - 0x03FBDF 0F:9BCF: 36        .byte $36   ; <6>
- D 3 - I - 0x03FBE0 0F:9BD0: 25        .byte $25   ; 
- D 3 - I - 0x03FBE1 0F:9BD1: 30        .byte $30   ; <0>
- D 3 - I - 0x03FBE2 0F:9BD2: 1A        .byte $1A   ; 
- D 3 - I - 0x03FBE3 0F:9BD3: 00        .byte $00   ; 
- D 3 - I - 0x03FBE4 0F:9BD4: 18        .byte $18   ; 
- D 3 - I - 0x03FBE5 0F:9BD5: 1A        .byte $1A   ; 
- D 3 - I - 0x03FBE6 0F:9BD6: 18        .byte $18   ; 
- D 3 - I - 0x03FBE7 0F:9BD7: 30        .byte $30   ; <0>
- D 3 - I - 0x03FBE8 0F:9BD8: 21        .byte $21   ; 
- D 3 - I - 0x03FBE9 0F:9BD9: 10        .byte $10   ; 
- D 3 - I - 0x03FBEA 0F:9BDA: 30        .byte $30   ; <0>
- D 3 - I - 0x03FBEB 0F:9BDB: 36        .byte $36   ; <6>
- D 3 - I - 0x03FBEC 0F:9BDC: 25        .byte $25   ; 
- D 3 - I - 0x03FBED 0F:9BDD: 30        .byte $30   ; <0>
- D 3 - I - 0x03FBEE 0F:9BDE: 19        .byte $19   ; 
- D 3 - I - 0x03FBEF 0F:9BDF: 00        .byte $00   ; 
- D 3 - I - 0x03FBF0 0F:9BE0: 2A        .byte $2A   ; 
- D 3 - I - 0x03FBF1 0F:9BE1: 21        .byte $21   ; 
- D 3 - I - 0x03FBF2 0F:9BE2: 3A        .byte $3A   ; 
- D 3 - I - 0x03FBF3 0F:9BE3: 1A        .byte $1A   ; 
- D 3 - I - 0x03FBF4 0F:9BE4: 1A        .byte $1A   ; 
- D 3 - I - 0x03FBF5 0F:9BE5: 10        .byte $10   ; 
- D 3 - I - 0x03FBF6 0F:9BE6: 30        .byte $30   ; <0>
- D 3 - I - 0x03FBF7 0F:9BE7: 36        .byte $36   ; <6>
- D 3 - I - 0x03FBF8 0F:9BE8: 25        .byte $25   ; 
- D 3 - I - 0x03FBF9 0F:9BE9: 30        .byte $30   ; <0>
- D 3 - I - 0x03FBFA 0F:9BEA: 21        .byte $21   ; 
- D 3 - I - 0x03FBFB 0F:9BEB: 31        .byte $31   ; <1>
- D 3 - I - 0x03FBFC 0F:9BEC: 30        .byte $30   ; <0>
- D 3 - I - 0x03FBFD 0F:9BED: 21        .byte $21   ; 
- D 3 - I - 0x03FBFE 0F:9BEE: 10        .byte $10   ; 
- D 3 - I - 0x03FBFF 0F:9BEF: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC00 0F:9BF0: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC01 0F:9BF1: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC02 0F:9BF2: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC03 0F:9BF3: 21        .byte $21   ; 
- D 3 - I - 0x03FC04 0F:9BF4: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC05 0F:9BF5: 31        .byte $31   ; <1>
- D 3 - I - 0x03FC06 0F:9BF6: 21        .byte $21   ; 
- D 3 - I - 0x03FC07 0F:9BF7: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC08 0F:9BF8: 37        .byte $37   ; <7>
- D 3 - I - 0x03FC09 0F:9BF9: 21        .byte $21   ; 
- D 3 - I - 0x03FC0A 0F:9BFA: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC0B 0F:9BFB: 37        .byte $37   ; <7>
- D 3 - I - 0x03FC0C 0F:9BFC: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC0D 0F:9BFD: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC0E 0F:9BFE: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC0F 0F:9BFF: 21        .byte $21   ; 
- D 3 - I - 0x03FC10 0F:9C00: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC11 0F:9C01: 27        .byte $27   ; 
- D 3 - I - 0x03FC12 0F:9C02: 21        .byte $21   ; 
- D 3 - I - 0x03FC13 0F:9C03: 11        .byte $11   ; 
- D 3 - I - 0x03FC14 0F:9C04: 16        .byte $16   ; 
- D 3 - I - 0x03FC15 0F:9C05: 21        .byte $21   ; 
- D 3 - I - 0x03FC16 0F:9C06: 11        .byte $11   ; 
- D 3 - I - 0x03FC17 0F:9C07: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC18 0F:9C08: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC19 0F:9C09: 25        .byte $25   ; 
- D 3 - I - 0x03FC1A 0F:9C0A: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC1B 0F:9C0B: 21        .byte $21   ; 
- D 3 - I - 0x03FC1C 0F:9C0C: 27        .byte $27   ; 
- D 3 - I - 0x03FC1D 0F:9C0D: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC1E 0F:9C0E: 21        .byte $21   ; 
- D 3 - I - 0x03FC1F 0F:9C0F: 27        .byte $27   ; 
- D 3 - I - 0x03FC20 0F:9C10: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC21 0F:9C11: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC22 0F:9C12: 27        .byte $27   ; 
- D 3 - I - 0x03FC23 0F:9C13: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC24 0F:9C14: 1A        .byte $1A   ; 
- D 3 - I - 0x03FC25 0F:9C15: 18        .byte $18   ; 
- D 3 - I - 0x03FC26 0F:9C16: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC27 0F:9C17: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC28 0F:9C18: 25        .byte $25   ; 
- D 3 - I - 0x03FC29 0F:9C19: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC2A 0F:9C1A: 21        .byte $21   ; 
- D 3 - I - 0x03FC2B 0F:9C1B: 31        .byte $31   ; <1>
- D 3 - I - 0x03FC2C 0F:9C1C: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC2D 0F:9C1D: 3A        .byte $3A   ; 
- D 3 - I - 0x03FC2E 0F:9C1E: 1A        .byte $1A   ; 
- D 3 - I - 0x03FC2F 0F:9C1F: 1A        .byte $1A   ; 
- D 3 - I - 0x03FC30 0F:9C20: 1A        .byte $1A   ; 
- D 3 - I - 0x03FC31 0F:9C21: 10        .byte $10   ; 
- D 3 - I - 0x03FC32 0F:9C22: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC33 0F:9C23: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC34 0F:9C24: 25        .byte $25   ; 
- D 3 - I - 0x03FC35 0F:9C25: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC36 0F:9C26: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC37 0F:9C27: 21        .byte $21   ; 
- D 3 - I - 0x03FC38 0F:9C28: 07        .byte $07   ; 
- D 3 - I - 0x03FC39 0F:9C29: 21        .byte $21   ; 
- D 3 - I - 0x03FC3A 0F:9C2A: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC3B 0F:9C2B: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC3C 0F:9C2C: 2A        .byte $2A   ; 
- D 3 - I - 0x03FC3D 0F:9C2D: 10        .byte $10   ; 
- D 3 - I - 0x03FC3E 0F:9C2E: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC3F 0F:9C2F: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC40 0F:9C30: 25        .byte $25   ; 
- D 3 - I - 0x03FC41 0F:9C31: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC42 0F:9C32: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC43 0F:9C33: 21        .byte $21   ; 
- D 3 - I - 0x03FC44 0F:9C34: 07        .byte $07   ; 
- D 3 - I - 0x03FC45 0F:9C35: 21        .byte $21   ; 
- D 3 - I - 0x03FC46 0F:9C36: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC47 0F:9C37: 15        .byte $15   ; 
- D 3 - I - 0x03FC48 0F:9C38: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC49 0F:9C39: 10        .byte $10   ; 
- D 3 - I - 0x03FC4A 0F:9C3A: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC4B 0F:9C3B: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC4C 0F:9C3C: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC4D 0F:9C3D: 00        .byte $00   ; 
- D 3 - I - 0x03FC4E 0F:9C3E: 31        .byte $31   ; <1>
- D 3 - I - 0x03FC4F 0F:9C3F: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC50 0F:9C40: 10        .byte $10   ; 
- D 3 - I - 0x03FC51 0F:9C41: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC52 0F:9C42: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC53 0F:9C43: 00        .byte $00   ; 
- D 3 - I - 0x03FC54 0F:9C44: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC55 0F:9C45: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC56 0F:9C46: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC57 0F:9C47: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC58 0F:9C48: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC59 0F:9C49: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC5A 0F:9C4A: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC5B 0F:9C4B: 17        .byte $17   ; 
- D 3 - I - 0x03FC5C 0F:9C4C: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC5D 0F:9C4D: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC5E 0F:9C4E: 31        .byte $31   ; <1>
- D 3 - I - 0x03FC5F 0F:9C4F: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC60 0F:9C50: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC61 0F:9C51: 31        .byte $31   ; <1>
- D 3 - I - 0x03FC62 0F:9C52: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC63 0F:9C53: 07        .byte $07   ; 
- D 3 - I - 0x03FC64 0F:9C54: 18        .byte $18   ; 
- D 3 - I - 0x03FC65 0F:9C55: 28        .byte $28   ; 
- D 3 - I - 0x03FC66 0F:9C56: 00        .byte $00   ; 
- D 3 - I - 0x03FC67 0F:9C57: 00        .byte $00   ; 
- D 3 - I - 0x03FC68 0F:9C58: 00        .byte $00   ; 
- D 3 - I - 0x03FC69 0F:9C59: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC6A 0F:9C5A: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC6B 0F:9C5B: 11        .byte $11   ; 
- D 3 - I - 0x03FC6C 0F:9C5C: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC6D 0F:9C5D: 27        .byte $27   ; 
- D 3 - I - 0x03FC6E 0F:9C5E: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC6F 0F:9C5F: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC70 0F:9C60: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC71 0F:9C61: 31        .byte $31   ; <1>
- D 3 - I - 0x03FC72 0F:9C62: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC73 0F:9C63: 00        .byte $00   ; 
- D 3 - I - 0x03FC74 0F:9C64: 00        .byte $00   ; 
- D 3 - I - 0x03FC75 0F:9C65: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC76 0F:9C66: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC77 0F:9C67: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC78 0F:9C68: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC79 0F:9C69: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC7A 0F:9C6A: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC7B 0F:9C6B: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC7C 0F:9C6C: 16        .byte $16   ; 
- D 3 - I - 0x03FC7D 0F:9C6D: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC7E 0F:9C6E: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC7F 0F:9C6F: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC80 0F:9C70: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC81 0F:9C71: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC82 0F:9C72: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC83 0F:9C73: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC84 0F:9C74: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC85 0F:9C75: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC86 0F:9C76: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC87 0F:9C77: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC88 0F:9C78: 19        .byte $19   ; 
- D 3 - I - 0x03FC89 0F:9C79: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC8A 0F:9C7A: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC8B 0F:9C7B: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC8C 0F:9C7C: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC8D 0F:9C7D: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC8E 0F:9C7E: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC8F 0F:9C7F: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC90 0F:9C80: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC91 0F:9C81: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC92 0F:9C82: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC93 0F:9C83: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC94 0F:9C84: 16        .byte $16   ; 
- D 3 - I - 0x03FC95 0F:9C85: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC96 0F:9C86: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC97 0F:9C87: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC98 0F:9C88: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC99 0F:9C89: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC9A 0F:9C8A: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC9B 0F:9C8B: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC9C 0F:9C8C: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC9D 0F:9C8D: 07        .byte $07   ; 
- D 3 - I - 0x03FC9E 0F:9C8E: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC9F 0F:9C8F: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCA0 0F:9C90: 16        .byte $16   ; 
- D 3 - I - 0x03FCA1 0F:9C91: 36        .byte $36   ; <6>
- D 3 - I - 0x03FCA2 0F:9C92: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCA3 0F:9C93: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCA4 0F:9C94: 36        .byte $36   ; <6>
- D 3 - I - 0x03FCA5 0F:9C95: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCA6 0F:9C96: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCA7 0F:9C97: 36        .byte $36   ; <6>
- D 3 - I - 0x03FCA8 0F:9C98: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCA9 0F:9C99: 00        .byte $00   ; 
- D 3 - I - 0x03FCAA 0F:9C9A: 36        .byte $36   ; <6>
- D 3 - I - 0x03FCAB 0F:9C9B: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCAC 0F:9C9C: 16        .byte $16   ; 
- D 3 - I - 0x03FCAD 0F:9C9D: 36        .byte $36   ; <6>
- D 3 - I - 0x03FCAE 0F:9C9E: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCAF 0F:9C9F: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCB0 0F:9CA0: 36        .byte $36   ; <6>
- D 3 - I - 0x03FCB1 0F:9CA1: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCB2 0F:9CA2: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCB3 0F:9CA3: 36        .byte $36   ; <6>
- D 3 - I - 0x03FCB4 0F:9CA4: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCB5 0F:9CA5: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCB6 0F:9CA6: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCB7 0F:9CA7: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCB8 0F:9CA8: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCB9 0F:9CA9: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCBA 0F:9CAA: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCBB 0F:9CAB: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCBC 0F:9CAC: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCBD 0F:9CAD: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCBE 0F:9CAE: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCBF 0F:9CAF: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCC0 0F:9CB0: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCC1 0F:9CB1: 26        .byte $26   ; 
- D 3 - I - 0x03FCC2 0F:9CB2: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCC3 0F:9CB3: 26        .byte $26   ; 
- D 3 - I - 0x03FCC4 0F:9CB4: 25        .byte $25   ; 
- D 3 - I - 0x03FCC5 0F:9CB5: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCC6 0F:9CB6: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCC7 0F:9CB7: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCC8 0F:9CB8: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCC9 0F:9CB9: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCCA 0F:9CBA: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCCB 0F:9CBB: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCCC 0F:9CBC: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCCD 0F:9CBD: 27        .byte $27   ; 
- D 3 - I - 0x03FCCE 0F:9CBE: 36        .byte $36   ; <6>
- D 3 - I - 0x03FCCF 0F:9CBF: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCD0 0F:9CC0: 31        .byte $31   ; <1>
- D 3 - I - 0x03FCD1 0F:9CC1: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCD2 0F:9CC2: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCD3 0F:9CC3: 31        .byte $31   ; <1>
- D 3 - I - 0x03FCD4 0F:9CC4: 27        .byte $27   ; 
- D 3 - I - 0x03FCD5 0F:9CC5: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCD6 0F:9CC6: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCD7 0F:9CC7: 36        .byte $36   ; <6>
- D 3 - I - 0x03FCD8 0F:9CC8: 05        .byte $05   ; 
- D 3 - I - 0x03FCD9 0F:9CC9: 16        .byte $16   ; 
- D 3 - I - 0x03FCDA 0F:9CCA: 15        .byte $15   ; 
- D 3 - I - 0x03FCDB 0F:9CCB: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCDC 0F:9CCC: 27        .byte $27   ; 
- D 3 - I - 0x03FCDD 0F:9CCD: 37        .byte $37   ; <7>
- D 3 - I - 0x03FCDE 0F:9CCE: 10        .byte $10   ; 
- D 3 - I - 0x03FCDF 0F:9CCF: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCE0 0F:9CD0: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCE1 0F:9CD1: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCE2 0F:9CD2: 00        .byte $00   ; 
- D 3 - I - 0x03FCE3 0F:9CD3: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCE4 0F:9CD4: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCE5 0F:9CD5: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCE6 0F:9CD6: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCE7 0F:9CD7: 36        .byte $36   ; <6>
- D 3 - I - 0x03FCE8 0F:9CD8: 25        .byte $25   ; 
- D 3 - I - 0x03FCE9 0F:9CD9: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCEA 0F:9CDA: 11        .byte $11   ; 
- D 3 - I - 0x03FCEB 0F:9CDB: 00        .byte $00   ; 
- D 3 - I - 0x03FCEC 0F:9CDC: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCED 0F:9CDD: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCEE 0F:9CDE: 15        .byte $15   ; 
- D 3 - I - 0x03FCEF 0F:9CDF: 25        .byte $25   ; 
- D 3 - I - 0x03FCF0 0F:9CE0: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCF1 0F:9CE1: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCF2 0F:9CE2: 35        .byte $35   ; <5>
- D 3 - I - 0x03FCF3 0F:9CE3: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCF4 0F:9CE4: 31        .byte $31   ; <1>
- D 3 - I - 0x03FCF5 0F:9CE5: 35        .byte $35   ; <5>
- D 3 - I - 0x03FCF6 0F:9CE6: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCF7 0F:9CE7: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCF8 0F:9CE8: 35        .byte $35   ; <5>
- D 3 - I - 0x03FCF9 0F:9CE9: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCFA 0F:9CEA: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCFB 0F:9CEB: 35        .byte $35   ; <5>
- D 3 - I - 0x03FCFC 0F:9CEC: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCFD 0F:9CED: 16        .byte $16   ; 
- D 3 - I - 0x03FCFE 0F:9CEE: 35        .byte $35   ; <5>
- D 3 - I - 0x03FCFF 0F:9CEF: 0F        .byte $0F   ; 
- D 3 - I - 0x03FD00 0F:9CF0: 31        .byte $31   ; <1>
- D 3 - I - 0x03FD01 0F:9CF1: 35        .byte $35   ; <5>
- D 3 - I - 0x03FD02 0F:9CF2: 0F        .byte $0F   ; 
- D 3 - I - 0x03FD03 0F:9CF3: 0F        .byte $0F   ; 
- D 3 - I - 0x03FD04 0F:9CF4: 35        .byte $35   ; <5>
- D 3 - I - 0x03FD05 0F:9CF5: 0F        .byte $0F   ; 
- D 3 - I - 0x03FD06 0F:9CF6: 30        .byte $30   ; <0>
- D 3 - I - 0x03FD07 0F:9CF7: 35        .byte $35   ; <5>
- D 3 - I - 0x03FD08 0F:9CF8: 21        .byte $21   ; 
- D 3 - I - 0x03FD09 0F:9CF9: 0F        .byte $0F   ; 
- D 3 - I - 0x03FD0A 0F:9CFA: 30        .byte $30   ; <0>
- D 3 - I - 0x03FD0B 0F:9CFB: 21        .byte $21   ; 
- D 3 - I - 0x03FD0C 0F:9CFC: 36        .byte $36   ; <6>
- D 3 - I - 0x03FD0D 0F:9CFD: 27        .byte $27   ; 
- D 3 - I - 0x03FD0E 0F:9CFE: 21        .byte $21   ; 
- D 3 - I - 0x03FD0F 0F:9CFF: 16        .byte $16   ; 
- D 3 - I - 0x03FD10 0F:9D00: 16        .byte $16   ; 
- D 3 - I - 0x03FD11 0F:9D01: 21        .byte $21   ; 
- D 3 - I - 0x03FD12 0F:9D02: 16        .byte $16   ; 
- D 3 - I - 0x03FD13 0F:9D03: 30        .byte $30   ; <0>
- D 3 - I - 0x03FD14 0F:9D04: 0F        .byte $0F   ; 
- D 3 - I - 0x03FD15 0F:9D05: 36        .byte $36   ; <6>
- D 3 - I - 0x03FD16 0F:9D06: 27        .byte $27   ; 
- D 3 - I - 0x03FD17 0F:9D07: 0F        .byte $0F   ; 
- D 3 - I - 0x03FD18 0F:9D08: 0F        .byte $0F   ; 
- D 3 - I - 0x03FD19 0F:9D09: 27        .byte $27   ; 
- D 3 - I - 0x03FD1A 0F:9D0A: 0F        .byte $0F   ; 
- D 3 - I - 0x03FD1B 0F:9D0B: 30        .byte $30   ; <0>
- D 3 - I - 0x03FD1C 0F:9D0C: 0F        .byte $0F   ; 
- D 3 - I - 0x03FD1D 0F:9D0D: 0F        .byte $0F   ; 
- D 3 - I - 0x03FD1E 0F:9D0E: 36        .byte $36   ; <6>
- D 3 - I - 0x03FD1F 0F:9D0F: 30        .byte $30   ; <0>
- - - - - - 0x03FD20 0F:9D10: FF        .byte $FF   ; 
- - - - - - 0x03FD21 0F:9D11: FF        .byte $FF   ; 
- - - - - - 0x03FD22 0F:9D12: FF        .byte $FF   ; 
- - - - - - 0x03FD23 0F:9D13: FF        .byte $FF   ; 
- - - - - - 0x03FD24 0F:9D14: FF        .byte $FF   ; 
- - - - - - 0x03FD25 0F:9D15: FF        .byte $FF   ; 
- - - - - - 0x03FD26 0F:9D16: FF        .byte $FF   ; 
- - - - - - 0x03FD27 0F:9D17: FF        .byte $FF   ; 
- - - - - - 0x03FD28 0F:9D18: FF        .byte $FF   ; 
- - - - - - 0x03FD29 0F:9D19: FF        .byte $FF   ; 
- - - - - - 0x03FD2A 0F:9D1A: FF        .byte $FF   ; 
- - - - - - 0x03FD2B 0F:9D1B: FF        .byte $FF   ; 
- - - - - - 0x03FD2C 0F:9D1C: FF        .byte $FF   ; 
- - - - - - 0x03FD2D 0F:9D1D: FF        .byte $FF   ; 
- - - - - - 0x03FD2E 0F:9D1E: FF        .byte $FF   ; 
- - - - - - 0x03FD2F 0F:9D1F: FF        .byte $FF   ; 
- - - - - - 0x03FD30 0F:9D20: FF        .byte $FF   ; 
- - - - - - 0x03FD31 0F:9D21: FF        .byte $FF   ; 
- - - - - - 0x03FD32 0F:9D22: FF        .byte $FF   ; 
- - - - - - 0x03FD33 0F:9D23: FF        .byte $FF   ; 
- - - - - - 0x03FD34 0F:9D24: FF        .byte $FF   ; 
- - - - - - 0x03FD35 0F:9D25: FF        .byte $FF   ; 
- - - - - - 0x03FD36 0F:9D26: FF        .byte $FF   ; 
- - - - - - 0x03FD37 0F:9D27: FF        .byte $FF   ; 
- - - - - - 0x03FD38 0F:9D28: FF        .byte $FF   ; 
- - - - - - 0x03FD39 0F:9D29: FF        .byte $FF   ; 
- - - - - - 0x03FD3A 0F:9D2A: FF        .byte $FF   ; 
- - - - - - 0x03FD3B 0F:9D2B: FF        .byte $FF   ; 
- - - - - - 0x03FD3C 0F:9D2C: FF        .byte $FF   ; 
- - - - - - 0x03FD3D 0F:9D2D: FF        .byte $FF   ; 
- - - - - - 0x03FD3E 0F:9D2E: FF        .byte $FF   ; 
- - - - - - 0x03FD3F 0F:9D2F: FF        .byte $FF   ; 
- - - - - - 0x03FD40 0F:9D30: FF        .byte $FF   ; 
- - - - - - 0x03FD41 0F:9D31: FF        .byte $FF   ; 
- - - - - - 0x03FD42 0F:9D32: FF        .byte $FF   ; 
- - - - - - 0x03FD43 0F:9D33: FF        .byte $FF   ; 
- - - - - - 0x03FD44 0F:9D34: FF        .byte $FF   ; 
- - - - - - 0x03FD45 0F:9D35: FF        .byte $FF   ; 
- - - - - - 0x03FD46 0F:9D36: FF        .byte $FF   ; 
- - - - - - 0x03FD47 0F:9D37: FF        .byte $FF   ; 
- - - - - - 0x03FD48 0F:9D38: FF        .byte $FF   ; 
- - - - - - 0x03FD49 0F:9D39: FF        .byte $FF   ; 
- - - - - - 0x03FD4A 0F:9D3A: FF        .byte $FF   ; 
- - - - - - 0x03FD4B 0F:9D3B: FF        .byte $FF   ; 
- - - - - - 0x03FD4C 0F:9D3C: FF        .byte $FF   ; 
- - - - - - 0x03FD4D 0F:9D3D: FF        .byte $FF   ; 
- - - - - - 0x03FD4E 0F:9D3E: FF        .byte $FF   ; 
- - - - - - 0x03FD4F 0F:9D3F: FF        .byte $FF   ; 
- - - - - - 0x03FD50 0F:9D40: FF        .byte $FF   ; 
- - - - - - 0x03FD51 0F:9D41: FF        .byte $FF   ; 
- - - - - - 0x03FD52 0F:9D42: FF        .byte $FF   ; 
- - - - - - 0x03FD53 0F:9D43: FF        .byte $FF   ; 
- - - - - - 0x03FD54 0F:9D44: FF        .byte $FF   ; 
- - - - - - 0x03FD55 0F:9D45: FF        .byte $FF   ; 
- - - - - - 0x03FD56 0F:9D46: FF        .byte $FF   ; 
- - - - - - 0x03FD57 0F:9D47: FF        .byte $FF   ; 
- - - - - - 0x03FD58 0F:9D48: FF        .byte $FF   ; 
- - - - - - 0x03FD59 0F:9D49: FF        .byte $FF   ; 
- - - - - - 0x03FD5A 0F:9D4A: FF        .byte $FF   ; 
- - - - - - 0x03FD5B 0F:9D4B: FF        .byte $FF   ; 
- - - - - - 0x03FD5C 0F:9D4C: FF        .byte $FF   ; 
- - - - - - 0x03FD5D 0F:9D4D: FF        .byte $FF   ; 
- - - - - - 0x03FD5E 0F:9D4E: FF        .byte $FF   ; 
- - - - - - 0x03FD5F 0F:9D4F: FF        .byte $FF   ; 
- - - - - - 0x03FD60 0F:9D50: FF        .byte $FF   ; 
- - - - - - 0x03FD61 0F:9D51: FF        .byte $FF   ; 
- - - - - - 0x03FD62 0F:9D52: FF        .byte $FF   ; 
- - - - - - 0x03FD63 0F:9D53: FF        .byte $FF   ; 
- - - - - - 0x03FD64 0F:9D54: FF        .byte $FF   ; 
- - - - - - 0x03FD65 0F:9D55: FF        .byte $FF   ; 
- - - - - - 0x03FD66 0F:9D56: FF        .byte $FF   ; 
- - - - - - 0x03FD67 0F:9D57: FF        .byte $FF   ; 
- - - - - - 0x03FD68 0F:9D58: FF        .byte $FF   ; 
- - - - - - 0x03FD69 0F:9D59: FF        .byte $FF   ; 
- - - - - - 0x03FD6A 0F:9D5A: FF        .byte $FF   ; 
- - - - - - 0x03FD6B 0F:9D5B: FF        .byte $FF   ; 
- - - - - - 0x03FD6C 0F:9D5C: FF        .byte $FF   ; 
- - - - - - 0x03FD6D 0F:9D5D: FF        .byte $FF   ; 
- - - - - - 0x03FD6E 0F:9D5E: FF        .byte $FF   ; 
- - - - - - 0x03FD6F 0F:9D5F: FF        .byte $FF   ; 
- - - - - - 0x03FD70 0F:9D60: FF        .byte $FF   ; 
- - - - - - 0x03FD71 0F:9D61: FF        .byte $FF   ; 
- - - - - - 0x03FD72 0F:9D62: FF        .byte $FF   ; 
- - - - - - 0x03FD73 0F:9D63: FF        .byte $FF   ; 
- - - - - - 0x03FD74 0F:9D64: FF        .byte $FF   ; 
- - - - - - 0x03FD75 0F:9D65: FF        .byte $FF   ; 
- - - - - - 0x03FD76 0F:9D66: FF        .byte $FF   ; 
- - - - - - 0x03FD77 0F:9D67: FF        .byte $FF   ; 
- - - - - - 0x03FD78 0F:9D68: FF        .byte $FF   ; 
- - - - - - 0x03FD79 0F:9D69: FF        .byte $FF   ; 
- - - - - - 0x03FD7A 0F:9D6A: FF        .byte $FF   ; 
- - - - - - 0x03FD7B 0F:9D6B: FF        .byte $FF   ; 
- - - - - - 0x03FD7C 0F:9D6C: FF        .byte $FF   ; 
- - - - - - 0x03FD7D 0F:9D6D: FF        .byte $FF   ; 
- - - - - - 0x03FD7E 0F:9D6E: FF        .byte $FF   ; 
- - - - - - 0x03FD7F 0F:9D6F: FF        .byte $FF   ; 
- - - - - - 0x03FD80 0F:9D70: FF        .byte $FF   ; 
- - - - - - 0x03FD81 0F:9D71: FF        .byte $FF   ; 
- - - - - - 0x03FD82 0F:9D72: FF        .byte $FF   ; 
- - - - - - 0x03FD83 0F:9D73: FF        .byte $FF   ; 
- - - - - - 0x03FD84 0F:9D74: FF        .byte $FF   ; 
- - - - - - 0x03FD85 0F:9D75: FF        .byte $FF   ; 
- - - - - - 0x03FD86 0F:9D76: FF        .byte $FF   ; 
- - - - - - 0x03FD87 0F:9D77: FF        .byte $FF   ; 
- - - - - - 0x03FD88 0F:9D78: FF        .byte $FF   ; 
- - - - - - 0x03FD89 0F:9D79: FF        .byte $FF   ; 
- - - - - - 0x03FD8A 0F:9D7A: FF        .byte $FF   ; 
- - - - - - 0x03FD8B 0F:9D7B: FF        .byte $FF   ; 
- - - - - - 0x03FD8C 0F:9D7C: FF        .byte $FF   ; 
- - - - - - 0x03FD8D 0F:9D7D: FF        .byte $FF   ; 
- - - - - - 0x03FD8E 0F:9D7E: FF        .byte $FF   ; 
- - - - - - 0x03FD8F 0F:9D7F: FF        .byte $FF   ; 
- - - - - - 0x03FD90 0F:9D80: FF        .byte $FF   ; 
- - - - - - 0x03FD91 0F:9D81: FF        .byte $FF   ; 
- - - - - - 0x03FD92 0F:9D82: FF        .byte $FF   ; 
- - - - - - 0x03FD93 0F:9D83: FF        .byte $FF   ; 
- - - - - - 0x03FD94 0F:9D84: FF        .byte $FF   ; 
- - - - - - 0x03FD95 0F:9D85: FF        .byte $FF   ; 
- - - - - - 0x03FD96 0F:9D86: FF        .byte $FF   ; 
- - - - - - 0x03FD97 0F:9D87: FF        .byte $FF   ; 
- - - - - - 0x03FD98 0F:9D88: FF        .byte $FF   ; 
- - - - - - 0x03FD99 0F:9D89: FF        .byte $FF   ; 
- - - - - - 0x03FD9A 0F:9D8A: FF        .byte $FF   ; 
- - - - - - 0x03FD9B 0F:9D8B: FF        .byte $FF   ; 
- - - - - - 0x03FD9C 0F:9D8C: FF        .byte $FF   ; 
- - - - - - 0x03FD9D 0F:9D8D: FF        .byte $FF   ; 
- - - - - - 0x03FD9E 0F:9D8E: FF        .byte $FF   ; 
- - - - - - 0x03FD9F 0F:9D8F: FF        .byte $FF   ; 
- - - - - - 0x03FDA0 0F:9D90: FF        .byte $FF   ; 
- - - - - - 0x03FDA1 0F:9D91: FF        .byte $FF   ; 
- - - - - - 0x03FDA2 0F:9D92: FF        .byte $FF   ; 
- - - - - - 0x03FDA3 0F:9D93: FF        .byte $FF   ; 
- - - - - - 0x03FDA4 0F:9D94: FF        .byte $FF   ; 
- - - - - - 0x03FDA5 0F:9D95: FF        .byte $FF   ; 
- - - - - - 0x03FDA6 0F:9D96: FF        .byte $FF   ; 
- - - - - - 0x03FDA7 0F:9D97: FF        .byte $FF   ; 
- - - - - - 0x03FDA8 0F:9D98: FF        .byte $FF   ; 
- - - - - - 0x03FDA9 0F:9D99: FF        .byte $FF   ; 
- - - - - - 0x03FDAA 0F:9D9A: FF        .byte $FF   ; 
- - - - - - 0x03FDAB 0F:9D9B: FF        .byte $FF   ; 
- - - - - - 0x03FDAC 0F:9D9C: FF        .byte $FF   ; 
- - - - - - 0x03FDAD 0F:9D9D: FF        .byte $FF   ; 
- - - - - - 0x03FDAE 0F:9D9E: FF        .byte $FF   ; 
- - - - - - 0x03FDAF 0F:9D9F: FF        .byte $FF   ; 
- - - - - - 0x03FDB0 0F:9DA0: FF        .byte $FF   ; 
- - - - - - 0x03FDB1 0F:9DA1: FF        .byte $FF   ; 
- - - - - - 0x03FDB2 0F:9DA2: FF        .byte $FF   ; 
- - - - - - 0x03FDB3 0F:9DA3: FF        .byte $FF   ; 
- - - - - - 0x03FDB4 0F:9DA4: FF        .byte $FF   ; 
- - - - - - 0x03FDB5 0F:9DA5: FF        .byte $FF   ; 
- - - - - - 0x03FDB6 0F:9DA6: FF        .byte $FF   ; 
- - - - - - 0x03FDB7 0F:9DA7: FF        .byte $FF   ; 
- - - - - - 0x03FDB8 0F:9DA8: FF        .byte $FF   ; 
- - - - - - 0x03FDB9 0F:9DA9: FF        .byte $FF   ; 
- - - - - - 0x03FDBA 0F:9DAA: FF        .byte $FF   ; 
- - - - - - 0x03FDBB 0F:9DAB: FF        .byte $FF   ; 
- - - - - - 0x03FDBC 0F:9DAC: FF        .byte $FF   ; 
- - - - - - 0x03FDBD 0F:9DAD: FF        .byte $FF   ; 
- - - - - - 0x03FDBE 0F:9DAE: FF        .byte $FF   ; 
- - - - - - 0x03FDBF 0F:9DAF: FF        .byte $FF   ; 
- - - - - - 0x03FDC0 0F:9DB0: FF        .byte $FF   ; 
- - - - - - 0x03FDC1 0F:9DB1: FF        .byte $FF   ; 
- - - - - - 0x03FDC2 0F:9DB2: FF        .byte $FF   ; 
- - - - - - 0x03FDC3 0F:9DB3: FF        .byte $FF   ; 
- - - - - - 0x03FDC4 0F:9DB4: FF        .byte $FF   ; 
- - - - - - 0x03FDC5 0F:9DB5: FF        .byte $FF   ; 
- - - - - - 0x03FDC6 0F:9DB6: FF        .byte $FF   ; 
- - - - - - 0x03FDC7 0F:9DB7: FF        .byte $FF   ; 
- - - - - - 0x03FDC8 0F:9DB8: FF        .byte $FF   ; 
- - - - - - 0x03FDC9 0F:9DB9: FF        .byte $FF   ; 
- - - - - - 0x03FDCA 0F:9DBA: FF        .byte $FF   ; 
- - - - - - 0x03FDCB 0F:9DBB: FF        .byte $FF   ; 
- - - - - - 0x03FDCC 0F:9DBC: FF        .byte $FF   ; 
- - - - - - 0x03FDCD 0F:9DBD: FF        .byte $FF   ; 
- - - - - - 0x03FDCE 0F:9DBE: FF        .byte $FF   ; 
- - - - - - 0x03FDCF 0F:9DBF: FF        .byte $FF   ; 
- - - - - - 0x03FDD0 0F:9DC0: FF        .byte $FF   ; 
- - - - - - 0x03FDD1 0F:9DC1: FF        .byte $FF   ; 
- - - - - - 0x03FDD2 0F:9DC2: FF        .byte $FF   ; 
- - - - - - 0x03FDD3 0F:9DC3: FF        .byte $FF   ; 
- - - - - - 0x03FDD4 0F:9DC4: FF        .byte $FF   ; 
- - - - - - 0x03FDD5 0F:9DC5: FF        .byte $FF   ; 
- - - - - - 0x03FDD6 0F:9DC6: FF        .byte $FF   ; 
- - - - - - 0x03FDD7 0F:9DC7: FF        .byte $FF   ; 
- - - - - - 0x03FDD8 0F:9DC8: FF        .byte $FF   ; 
- - - - - - 0x03FDD9 0F:9DC9: FF        .byte $FF   ; 
- - - - - - 0x03FDDA 0F:9DCA: FF        .byte $FF   ; 
- - - - - - 0x03FDDB 0F:9DCB: FF        .byte $FF   ; 
- - - - - - 0x03FDDC 0F:9DCC: FF        .byte $FF   ; 
- - - - - - 0x03FDDD 0F:9DCD: FF        .byte $FF   ; 
- - - - - - 0x03FDDE 0F:9DCE: FF        .byte $FF   ; 
- - - - - - 0x03FDDF 0F:9DCF: FF        .byte $FF   ; 
- - - - - - 0x03FDE0 0F:9DD0: FF        .byte $FF   ; 
- - - - - - 0x03FDE1 0F:9DD1: FF        .byte $FF   ; 
- - - - - - 0x03FDE2 0F:9DD2: FF        .byte $FF   ; 
- - - - - - 0x03FDE3 0F:9DD3: FF        .byte $FF   ; 
- - - - - - 0x03FDE4 0F:9DD4: FF        .byte $FF   ; 
- - - - - - 0x03FDE5 0F:9DD5: FF        .byte $FF   ; 
- - - - - - 0x03FDE6 0F:9DD6: FF        .byte $FF   ; 
- - - - - - 0x03FDE7 0F:9DD7: FF        .byte $FF   ; 
- - - - - - 0x03FDE8 0F:9DD8: FF        .byte $FF   ; 
- - - - - - 0x03FDE9 0F:9DD9: FF        .byte $FF   ; 
- - - - - - 0x03FDEA 0F:9DDA: FF        .byte $FF   ; 
- - - - - - 0x03FDEB 0F:9DDB: FF        .byte $FF   ; 
- - - - - - 0x03FDEC 0F:9DDC: FF        .byte $FF   ; 
- - - - - - 0x03FDED 0F:9DDD: FF        .byte $FF   ; 
- - - - - - 0x03FDEE 0F:9DDE: FF        .byte $FF   ; 
- - - - - - 0x03FDEF 0F:9DDF: FF        .byte $FF   ; 
- - - - - - 0x03FDF0 0F:9DE0: FF        .byte $FF   ; 
- - - - - - 0x03FDF1 0F:9DE1: FF        .byte $FF   ; 
- - - - - - 0x03FDF2 0F:9DE2: FF        .byte $FF   ; 
- - - - - - 0x03FDF3 0F:9DE3: FF        .byte $FF   ; 
- - - - - - 0x03FDF4 0F:9DE4: FF        .byte $FF   ; 
- - - - - - 0x03FDF5 0F:9DE5: FF        .byte $FF   ; 
- - - - - - 0x03FDF6 0F:9DE6: FF        .byte $FF   ; 
- - - - - - 0x03FDF7 0F:9DE7: FF        .byte $FF   ; 
- - - - - - 0x03FDF8 0F:9DE8: FF        .byte $FF   ; 
- - - - - - 0x03FDF9 0F:9DE9: FF        .byte $FF   ; 
- - - - - - 0x03FDFA 0F:9DEA: FF        .byte $FF   ; 
- - - - - - 0x03FDFB 0F:9DEB: FF        .byte $FF   ; 
- - - - - - 0x03FDFC 0F:9DEC: FF        .byte $FF   ; 
- - - - - - 0x03FDFD 0F:9DED: FF        .byte $FF   ; 
- - - - - - 0x03FDFE 0F:9DEE: FF        .byte $FF   ; 
- - - - - - 0x03FDFF 0F:9DEF: FF        .byte $FF   ; 
- - - - - - 0x03FE00 0F:9DF0: FF        .byte $FF   ; 
- - - - - - 0x03FE01 0F:9DF1: FF        .byte $FF   ; 
- - - - - - 0x03FE02 0F:9DF2: FF        .byte $FF   ; 
- - - - - - 0x03FE03 0F:9DF3: FF        .byte $FF   ; 
- - - - - - 0x03FE04 0F:9DF4: FF        .byte $FF   ; 
- - - - - - 0x03FE05 0F:9DF5: FF        .byte $FF   ; 
- - - - - - 0x03FE06 0F:9DF6: FF        .byte $FF   ; 
- - - - - - 0x03FE07 0F:9DF7: FF        .byte $FF   ; 
- - - - - - 0x03FE08 0F:9DF8: FF        .byte $FF   ; 
- - - - - - 0x03FE09 0F:9DF9: FF        .byte $FF   ; 
- - - - - - 0x03FE0A 0F:9DFA: FF        .byte $FF   ; 
- - - - - - 0x03FE0B 0F:9DFB: FF        .byte $FF   ; 
- - - - - - 0x03FE0C 0F:9DFC: FF        .byte $FF   ; 
- - - - - - 0x03FE0D 0F:9DFD: FF        .byte $FF   ; 
- - - - - - 0x03FE0E 0F:9DFE: FF        .byte $FF   ; 
- - - - - - 0x03FE0F 0F:9DFF: FF        .byte $FF   ; 
- - - - - - 0x03FE10 0F:9E00: FF        .byte $FF   ; 
- - - - - - 0x03FE11 0F:9E01: FF        .byte $FF   ; 
- - - - - - 0x03FE12 0F:9E02: FF        .byte $FF   ; 
- - - - - - 0x03FE13 0F:9E03: FF        .byte $FF   ; 
- - - - - - 0x03FE14 0F:9E04: FF        .byte $FF   ; 
- - - - - - 0x03FE15 0F:9E05: FF        .byte $FF   ; 
- - - - - - 0x03FE16 0F:9E06: FF        .byte $FF   ; 
- - - - - - 0x03FE17 0F:9E07: FF        .byte $FF   ; 
- - - - - - 0x03FE18 0F:9E08: FF        .byte $FF   ; 
- - - - - - 0x03FE19 0F:9E09: FF        .byte $FF   ; 
- - - - - - 0x03FE1A 0F:9E0A: FF        .byte $FF   ; 
- - - - - - 0x03FE1B 0F:9E0B: FF        .byte $FF   ; 
- - - - - - 0x03FE1C 0F:9E0C: FF        .byte $FF   ; 
- - - - - - 0x03FE1D 0F:9E0D: FF        .byte $FF   ; 
- - - - - - 0x03FE1E 0F:9E0E: FF        .byte $FF   ; 
- - - - - - 0x03FE1F 0F:9E0F: FF        .byte $FF   ; 
- - - - - - 0x03FE20 0F:9E10: FF        .byte $FF   ; 
- - - - - - 0x03FE21 0F:9E11: FF        .byte $FF   ; 
- - - - - - 0x03FE22 0F:9E12: FF        .byte $FF   ; 
- - - - - - 0x03FE23 0F:9E13: FF        .byte $FF   ; 
- - - - - - 0x03FE24 0F:9E14: FF        .byte $FF   ; 
- - - - - - 0x03FE25 0F:9E15: FF        .byte $FF   ; 
- - - - - - 0x03FE26 0F:9E16: FF        .byte $FF   ; 
- - - - - - 0x03FE27 0F:9E17: FF        .byte $FF   ; 
- - - - - - 0x03FE28 0F:9E18: FF        .byte $FF   ; 
- - - - - - 0x03FE29 0F:9E19: FF        .byte $FF   ; 
- - - - - - 0x03FE2A 0F:9E1A: FF        .byte $FF   ; 
- - - - - - 0x03FE2B 0F:9E1B: FF        .byte $FF   ; 
- - - - - - 0x03FE2C 0F:9E1C: FF        .byte $FF   ; 
- - - - - - 0x03FE2D 0F:9E1D: FF        .byte $FF   ; 
- - - - - - 0x03FE2E 0F:9E1E: FF        .byte $FF   ; 
- - - - - - 0x03FE2F 0F:9E1F: FF        .byte $FF   ; 
- - - - - - 0x03FE30 0F:9E20: FF        .byte $FF   ; 
- - - - - - 0x03FE31 0F:9E21: FF        .byte $FF   ; 
- - - - - - 0x03FE32 0F:9E22: FF        .byte $FF   ; 
- - - - - - 0x03FE33 0F:9E23: FF        .byte $FF   ; 
- - - - - - 0x03FE34 0F:9E24: FF        .byte $FF   ; 
- - - - - - 0x03FE35 0F:9E25: FF        .byte $FF   ; 
- - - - - - 0x03FE36 0F:9E26: FF        .byte $FF   ; 
- - - - - - 0x03FE37 0F:9E27: FF        .byte $FF   ; 
- - - - - - 0x03FE38 0F:9E28: FF        .byte $FF   ; 
- - - - - - 0x03FE39 0F:9E29: FF        .byte $FF   ; 
- - - - - - 0x03FE3A 0F:9E2A: FF        .byte $FF   ; 
- - - - - - 0x03FE3B 0F:9E2B: FF        .byte $FF   ; 
- - - - - - 0x03FE3C 0F:9E2C: FF        .byte $FF   ; 
- - - - - - 0x03FE3D 0F:9E2D: FF        .byte $FF   ; 
- - - - - - 0x03FE3E 0F:9E2E: FF        .byte $FF   ; 
- - - - - - 0x03FE3F 0F:9E2F: FF        .byte $FF   ; 
- - - - - - 0x03FE40 0F:9E30: FF        .byte $FF   ; 
- - - - - - 0x03FE41 0F:9E31: FF        .byte $FF   ; 
- - - - - - 0x03FE42 0F:9E32: FF        .byte $FF   ; 
- - - - - - 0x03FE43 0F:9E33: FF        .byte $FF   ; 
- - - - - - 0x03FE44 0F:9E34: FF        .byte $FF   ; 
- - - - - - 0x03FE45 0F:9E35: FF        .byte $FF   ; 
- - - - - - 0x03FE46 0F:9E36: FF        .byte $FF   ; 
- - - - - - 0x03FE47 0F:9E37: FF        .byte $FF   ; 
- - - - - - 0x03FE48 0F:9E38: FF        .byte $FF   ; 
- - - - - - 0x03FE49 0F:9E39: FF        .byte $FF   ; 
- - - - - - 0x03FE4A 0F:9E3A: FF        .byte $FF   ; 
- - - - - - 0x03FE4B 0F:9E3B: FF        .byte $FF   ; 
- - - - - - 0x03FE4C 0F:9E3C: FF        .byte $FF   ; 
- - - - - - 0x03FE4D 0F:9E3D: FF        .byte $FF   ; 
- - - - - - 0x03FE4E 0F:9E3E: FF        .byte $FF   ; 
- - - - - - 0x03FE4F 0F:9E3F: FF        .byte $FF   ; 
- - - - - - 0x03FE50 0F:9E40: FF        .byte $FF   ; 
- - - - - - 0x03FE51 0F:9E41: FF        .byte $FF   ; 
- - - - - - 0x03FE52 0F:9E42: FF        .byte $FF   ; 
- - - - - - 0x03FE53 0F:9E43: FF        .byte $FF   ; 
- - - - - - 0x03FE54 0F:9E44: FF        .byte $FF   ; 
- - - - - - 0x03FE55 0F:9E45: FF        .byte $FF   ; 
- - - - - - 0x03FE56 0F:9E46: FF        .byte $FF   ; 
- - - - - - 0x03FE57 0F:9E47: FF        .byte $FF   ; 
- - - - - - 0x03FE58 0F:9E48: FF        .byte $FF   ; 
- - - - - - 0x03FE59 0F:9E49: FF        .byte $FF   ; 
- - - - - - 0x03FE5A 0F:9E4A: FF        .byte $FF   ; 
- - - - - - 0x03FE5B 0F:9E4B: FF        .byte $FF   ; 
- - - - - - 0x03FE5C 0F:9E4C: FF        .byte $FF   ; 
- - - - - - 0x03FE5D 0F:9E4D: FF        .byte $FF   ; 
- - - - - - 0x03FE5E 0F:9E4E: FF        .byte $FF   ; 
- - - - - - 0x03FE5F 0F:9E4F: FF        .byte $FF   ; 
- - - - - - 0x03FE60 0F:9E50: FF        .byte $FF   ; 
- - - - - - 0x03FE61 0F:9E51: FF        .byte $FF   ; 
- - - - - - 0x03FE62 0F:9E52: FF        .byte $FF   ; 
- - - - - - 0x03FE63 0F:9E53: FF        .byte $FF   ; 
- - - - - - 0x03FE64 0F:9E54: FF        .byte $FF   ; 
- - - - - - 0x03FE65 0F:9E55: FF        .byte $FF   ; 
- - - - - - 0x03FE66 0F:9E56: FF        .byte $FF   ; 
- - - - - - 0x03FE67 0F:9E57: FF        .byte $FF   ; 
- - - - - - 0x03FE68 0F:9E58: FF        .byte $FF   ; 
- - - - - - 0x03FE69 0F:9E59: FF        .byte $FF   ; 
- - - - - - 0x03FE6A 0F:9E5A: FF        .byte $FF   ; 
- - - - - - 0x03FE6B 0F:9E5B: FF        .byte $FF   ; 
- - - - - - 0x03FE6C 0F:9E5C: FF        .byte $FF   ; 
- - - - - - 0x03FE6D 0F:9E5D: FF        .byte $FF   ; 
- - - - - - 0x03FE6E 0F:9E5E: FF        .byte $FF   ; 
- - - - - - 0x03FE6F 0F:9E5F: FF        .byte $FF   ; 
- - - - - - 0x03FE70 0F:9E60: FF        .byte $FF   ; 
- - - - - - 0x03FE71 0F:9E61: FF        .byte $FF   ; 
- - - - - - 0x03FE72 0F:9E62: FF        .byte $FF   ; 
- - - - - - 0x03FE73 0F:9E63: FF        .byte $FF   ; 
- - - - - - 0x03FE74 0F:9E64: FF        .byte $FF   ; 
- - - - - - 0x03FE75 0F:9E65: FF        .byte $FF   ; 
- - - - - - 0x03FE76 0F:9E66: FF        .byte $FF   ; 
- - - - - - 0x03FE77 0F:9E67: FF        .byte $FF   ; 
- - - - - - 0x03FE78 0F:9E68: FF        .byte $FF   ; 
- - - - - - 0x03FE79 0F:9E69: FF        .byte $FF   ; 
- - - - - - 0x03FE7A 0F:9E6A: FF        .byte $FF   ; 
- - - - - - 0x03FE7B 0F:9E6B: FF        .byte $FF   ; 
- - - - - - 0x03FE7C 0F:9E6C: FF        .byte $FF   ; 
- - - - - - 0x03FE7D 0F:9E6D: FF        .byte $FF   ; 
- - - - - - 0x03FE7E 0F:9E6E: FF        .byte $FF   ; 
- - - - - - 0x03FE7F 0F:9E6F: FF        .byte $FF   ; 
- - - - - - 0x03FE80 0F:9E70: FF        .byte $FF   ; 
- - - - - - 0x03FE81 0F:9E71: FF        .byte $FF   ; 
- - - - - - 0x03FE82 0F:9E72: FF        .byte $FF   ; 
- - - - - - 0x03FE83 0F:9E73: FF        .byte $FF   ; 
- - - - - - 0x03FE84 0F:9E74: FF        .byte $FF   ; 
- - - - - - 0x03FE85 0F:9E75: FF        .byte $FF   ; 
- - - - - - 0x03FE86 0F:9E76: FF        .byte $FF   ; 
- - - - - - 0x03FE87 0F:9E77: FF        .byte $FF   ; 
- - - - - - 0x03FE88 0F:9E78: FF        .byte $FF   ; 
- - - - - - 0x03FE89 0F:9E79: FF        .byte $FF   ; 
- - - - - - 0x03FE8A 0F:9E7A: FF        .byte $FF   ; 
- - - - - - 0x03FE8B 0F:9E7B: FF        .byte $FF   ; 
- - - - - - 0x03FE8C 0F:9E7C: FF        .byte $FF   ; 
- - - - - - 0x03FE8D 0F:9E7D: FF        .byte $FF   ; 
- - - - - - 0x03FE8E 0F:9E7E: FF        .byte $FF   ; 
- - - - - - 0x03FE8F 0F:9E7F: FF        .byte $FF   ; 
- - - - - - 0x03FE90 0F:9E80: FF        .byte $FF   ; 
- - - - - - 0x03FE91 0F:9E81: FF        .byte $FF   ; 
- - - - - - 0x03FE92 0F:9E82: FF        .byte $FF   ; 
- - - - - - 0x03FE93 0F:9E83: FF        .byte $FF   ; 
- - - - - - 0x03FE94 0F:9E84: FF        .byte $FF   ; 
- - - - - - 0x03FE95 0F:9E85: FF        .byte $FF   ; 
- - - - - - 0x03FE96 0F:9E86: FF        .byte $FF   ; 
- - - - - - 0x03FE97 0F:9E87: FF        .byte $FF   ; 
- - - - - - 0x03FE98 0F:9E88: FF        .byte $FF   ; 
- - - - - - 0x03FE99 0F:9E89: FF        .byte $FF   ; 
- - - - - - 0x03FE9A 0F:9E8A: FF        .byte $FF   ; 
- - - - - - 0x03FE9B 0F:9E8B: FF        .byte $FF   ; 
- - - - - - 0x03FE9C 0F:9E8C: FF        .byte $FF   ; 
- - - - - - 0x03FE9D 0F:9E8D: FF        .byte $FF   ; 
- - - - - - 0x03FE9E 0F:9E8E: FF        .byte $FF   ; 
- - - - - - 0x03FE9F 0F:9E8F: FF        .byte $FF   ; 
- - - - - - 0x03FEA0 0F:9E90: FF        .byte $FF   ; 
- - - - - - 0x03FEA1 0F:9E91: FF        .byte $FF   ; 
- - - - - - 0x03FEA2 0F:9E92: FF        .byte $FF   ; 
- - - - - - 0x03FEA3 0F:9E93: FF        .byte $FF   ; 
- - - - - - 0x03FEA4 0F:9E94: FF        .byte $FF   ; 
- - - - - - 0x03FEA5 0F:9E95: FF        .byte $FF   ; 
- - - - - - 0x03FEA6 0F:9E96: FF        .byte $FF   ; 
- - - - - - 0x03FEA7 0F:9E97: FF        .byte $FF   ; 
- - - - - - 0x03FEA8 0F:9E98: FF        .byte $FF   ; 
- - - - - - 0x03FEA9 0F:9E99: FF        .byte $FF   ; 
- - - - - - 0x03FEAA 0F:9E9A: FF        .byte $FF   ; 
- - - - - - 0x03FEAB 0F:9E9B: FF        .byte $FF   ; 
- - - - - - 0x03FEAC 0F:9E9C: FF        .byte $FF   ; 
- - - - - - 0x03FEAD 0F:9E9D: FF        .byte $FF   ; 
- - - - - - 0x03FEAE 0F:9E9E: FF        .byte $FF   ; 
- - - - - - 0x03FEAF 0F:9E9F: FF        .byte $FF   ; 
- - - - - - 0x03FEB0 0F:9EA0: FF        .byte $FF   ; 
- - - - - - 0x03FEB1 0F:9EA1: FF        .byte $FF   ; 
- - - - - - 0x03FEB2 0F:9EA2: FF        .byte $FF   ; 
- - - - - - 0x03FEB3 0F:9EA3: FF        .byte $FF   ; 
- - - - - - 0x03FEB4 0F:9EA4: FF        .byte $FF   ; 
- - - - - - 0x03FEB5 0F:9EA5: FF        .byte $FF   ; 
- - - - - - 0x03FEB6 0F:9EA6: FF        .byte $FF   ; 
- - - - - - 0x03FEB7 0F:9EA7: FF        .byte $FF   ; 
- - - - - - 0x03FEB8 0F:9EA8: FF        .byte $FF   ; 
- - - - - - 0x03FEB9 0F:9EA9: FF        .byte $FF   ; 
- - - - - - 0x03FEBA 0F:9EAA: FF        .byte $FF   ; 
- - - - - - 0x03FEBB 0F:9EAB: FF        .byte $FF   ; 
- - - - - - 0x03FEBC 0F:9EAC: FF        .byte $FF   ; 
- - - - - - 0x03FEBD 0F:9EAD: FF        .byte $FF   ; 
- - - - - - 0x03FEBE 0F:9EAE: FF        .byte $FF   ; 
- - - - - - 0x03FEBF 0F:9EAF: FF        .byte $FF   ; 
- - - - - - 0x03FEC0 0F:9EB0: FF        .byte $FF   ; 
- - - - - - 0x03FEC1 0F:9EB1: FF        .byte $FF   ; 
- - - - - - 0x03FEC2 0F:9EB2: FF        .byte $FF   ; 
- - - - - - 0x03FEC3 0F:9EB3: FF        .byte $FF   ; 
- - - - - - 0x03FEC4 0F:9EB4: FF        .byte $FF   ; 
- - - - - - 0x03FEC5 0F:9EB5: FF        .byte $FF   ; 
- - - - - - 0x03FEC6 0F:9EB6: FF        .byte $FF   ; 
- - - - - - 0x03FEC7 0F:9EB7: FF        .byte $FF   ; 
- - - - - - 0x03FEC8 0F:9EB8: FF        .byte $FF   ; 
- - - - - - 0x03FEC9 0F:9EB9: FF        .byte $FF   ; 
- - - - - - 0x03FECA 0F:9EBA: FF        .byte $FF   ; 
- - - - - - 0x03FECB 0F:9EBB: FF        .byte $FF   ; 
- - - - - - 0x03FECC 0F:9EBC: FF        .byte $FF   ; 
- - - - - - 0x03FECD 0F:9EBD: FF        .byte $FF   ; 
- - - - - - 0x03FECE 0F:9EBE: FF        .byte $FF   ; 
- - - - - - 0x03FECF 0F:9EBF: FF        .byte $FF   ; 
- - - - - - 0x03FED0 0F:9EC0: FF        .byte $FF   ; 
- - - - - - 0x03FED1 0F:9EC1: FF        .byte $FF   ; 
- - - - - - 0x03FED2 0F:9EC2: FF        .byte $FF   ; 
- - - - - - 0x03FED3 0F:9EC3: FF        .byte $FF   ; 
- - - - - - 0x03FED4 0F:9EC4: FF        .byte $FF   ; 
- - - - - - 0x03FED5 0F:9EC5: FF        .byte $FF   ; 
- - - - - - 0x03FED6 0F:9EC6: FF        .byte $FF   ; 
- - - - - - 0x03FED7 0F:9EC7: FF        .byte $FF   ; 
- - - - - - 0x03FED8 0F:9EC8: FF        .byte $FF   ; 
- - - - - - 0x03FED9 0F:9EC9: FF        .byte $FF   ; 
- - - - - - 0x03FEDA 0F:9ECA: FF        .byte $FF   ; 
- - - - - - 0x03FEDB 0F:9ECB: FF        .byte $FF   ; 
- - - - - - 0x03FEDC 0F:9ECC: FF        .byte $FF   ; 
- - - - - - 0x03FEDD 0F:9ECD: FF        .byte $FF   ; 
- - - - - - 0x03FEDE 0F:9ECE: FF        .byte $FF   ; 
- - - - - - 0x03FEDF 0F:9ECF: FF        .byte $FF   ; 
- - - - - - 0x03FEE0 0F:9ED0: FF        .byte $FF   ; 
- - - - - - 0x03FEE1 0F:9ED1: FF        .byte $FF   ; 
- - - - - - 0x03FEE2 0F:9ED2: FF        .byte $FF   ; 
- - - - - - 0x03FEE3 0F:9ED3: FF        .byte $FF   ; 
- - - - - - 0x03FEE4 0F:9ED4: FF        .byte $FF   ; 
- - - - - - 0x03FEE5 0F:9ED5: FF        .byte $FF   ; 
- - - - - - 0x03FEE6 0F:9ED6: FF        .byte $FF   ; 
- - - - - - 0x03FEE7 0F:9ED7: FF        .byte $FF   ; 
- - - - - - 0x03FEE8 0F:9ED8: FF        .byte $FF   ; 
- - - - - - 0x03FEE9 0F:9ED9: FF        .byte $FF   ; 
- - - - - - 0x03FEEA 0F:9EDA: FF        .byte $FF   ; 
- - - - - - 0x03FEEB 0F:9EDB: FF        .byte $FF   ; 
- - - - - - 0x03FEEC 0F:9EDC: FF        .byte $FF   ; 
- - - - - - 0x03FEED 0F:9EDD: FF        .byte $FF   ; 
- - - - - - 0x03FEEE 0F:9EDE: FF        .byte $FF   ; 
- - - - - - 0x03FEEF 0F:9EDF: FF        .byte $FF   ; 
- - - - - - 0x03FEF0 0F:9EE0: FF        .byte $FF   ; 
- - - - - - 0x03FEF1 0F:9EE1: FF        .byte $FF   ; 
- - - - - - 0x03FEF2 0F:9EE2: FF        .byte $FF   ; 
- - - - - - 0x03FEF3 0F:9EE3: FF        .byte $FF   ; 
- - - - - - 0x03FEF4 0F:9EE4: FF        .byte $FF   ; 
- - - - - - 0x03FEF5 0F:9EE5: FF        .byte $FF   ; 
- - - - - - 0x03FEF6 0F:9EE6: FF        .byte $FF   ; 
- - - - - - 0x03FEF7 0F:9EE7: FF        .byte $FF   ; 
- - - - - - 0x03FEF8 0F:9EE8: FF        .byte $FF   ; 
- - - - - - 0x03FEF9 0F:9EE9: FF        .byte $FF   ; 
- - - - - - 0x03FEFA 0F:9EEA: FF        .byte $FF   ; 
- - - - - - 0x03FEFB 0F:9EEB: FF        .byte $FF   ; 
- - - - - - 0x03FEFC 0F:9EEC: FF        .byte $FF   ; 
- - - - - - 0x03FEFD 0F:9EED: FF        .byte $FF   ; 
- - - - - - 0x03FEFE 0F:9EEE: FF        .byte $FF   ; 
- - - - - - 0x03FEFF 0F:9EEF: FF        .byte $FF   ; 
- - - - - - 0x03FF00 0F:9EF0: FF        .byte $FF   ; 
- - - - - - 0x03FF01 0F:9EF1: FF        .byte $FF   ; 
- - - - - - 0x03FF02 0F:9EF2: FF        .byte $FF   ; 
- - - - - - 0x03FF03 0F:9EF3: FF        .byte $FF   ; 
- - - - - - 0x03FF04 0F:9EF4: FF        .byte $FF   ; 
- - - - - - 0x03FF05 0F:9EF5: FF        .byte $FF   ; 
- - - - - - 0x03FF06 0F:9EF6: FF        .byte $FF   ; 
- - - - - - 0x03FF07 0F:9EF7: FF        .byte $FF   ; 
- - - - - - 0x03FF08 0F:9EF8: FF        .byte $FF   ; 
- - - - - - 0x03FF09 0F:9EF9: FF        .byte $FF   ; 
- - - - - - 0x03FF0A 0F:9EFA: FF        .byte $FF   ; 
- - - - - - 0x03FF0B 0F:9EFB: FF        .byte $FF   ; 
- - - - - - 0x03FF0C 0F:9EFC: FF        .byte $FF   ; 
- - - - - - 0x03FF0D 0F:9EFD: FF        .byte $FF   ; 
- - - - - - 0x03FF0E 0F:9EFE: FF        .byte $FF   ; 
- - - - - - 0x03FF0F 0F:9EFF: FF        .byte $FF   ; 
- - - - - - 0x03FF10 0F:9F00: FF        .byte $FF   ; 
- - - - - - 0x03FF11 0F:9F01: FF        .byte $FF   ; 
- - - - - - 0x03FF12 0F:9F02: FF        .byte $FF   ; 
- - - - - - 0x03FF13 0F:9F03: FF        .byte $FF   ; 
- - - - - - 0x03FF14 0F:9F04: FF        .byte $FF   ; 
- - - - - - 0x03FF15 0F:9F05: FF        .byte $FF   ; 
- - - - - - 0x03FF16 0F:9F06: FF        .byte $FF   ; 
- - - - - - 0x03FF17 0F:9F07: FF        .byte $FF   ; 
- - - - - - 0x03FF18 0F:9F08: FF        .byte $FF   ; 
- - - - - - 0x03FF19 0F:9F09: FF        .byte $FF   ; 
- - - - - - 0x03FF1A 0F:9F0A: FF        .byte $FF   ; 
- - - - - - 0x03FF1B 0F:9F0B: FF        .byte $FF   ; 
- - - - - - 0x03FF1C 0F:9F0C: FF        .byte $FF   ; 
- - - - - - 0x03FF1D 0F:9F0D: FF        .byte $FF   ; 
- - - - - - 0x03FF1E 0F:9F0E: FF        .byte $FF   ; 
- - - - - - 0x03FF1F 0F:9F0F: FF        .byte $FF   ; 
- - - - - - 0x03FF20 0F:9F10: FF        .byte $FF   ; 
- - - - - - 0x03FF21 0F:9F11: FF        .byte $FF   ; 
- - - - - - 0x03FF22 0F:9F12: FF        .byte $FF   ; 
- - - - - - 0x03FF23 0F:9F13: FF        .byte $FF   ; 
- - - - - - 0x03FF24 0F:9F14: FF        .byte $FF   ; 
- - - - - - 0x03FF25 0F:9F15: FF        .byte $FF   ; 
- - - - - - 0x03FF26 0F:9F16: FF        .byte $FF   ; 
- - - - - - 0x03FF27 0F:9F17: FF        .byte $FF   ; 
- - - - - - 0x03FF28 0F:9F18: FF        .byte $FF   ; 
- - - - - - 0x03FF29 0F:9F19: FF        .byte $FF   ; 
- - - - - - 0x03FF2A 0F:9F1A: FF        .byte $FF   ; 
- - - - - - 0x03FF2B 0F:9F1B: FF        .byte $FF   ; 
- - - - - - 0x03FF2C 0F:9F1C: FF        .byte $FF   ; 
- - - - - - 0x03FF2D 0F:9F1D: FF        .byte $FF   ; 
- - - - - - 0x03FF2E 0F:9F1E: FF        .byte $FF   ; 
- - - - - - 0x03FF2F 0F:9F1F: FF        .byte $FF   ; 
- - - - - - 0x03FF30 0F:9F20: FF        .byte $FF   ; 
- - - - - - 0x03FF31 0F:9F21: FF        .byte $FF   ; 
- - - - - - 0x03FF32 0F:9F22: FF        .byte $FF   ; 
- - - - - - 0x03FF33 0F:9F23: FF        .byte $FF   ; 
- - - - - - 0x03FF34 0F:9F24: FF        .byte $FF   ; 
- - - - - - 0x03FF35 0F:9F25: FF        .byte $FF   ; 
- - - - - - 0x03FF36 0F:9F26: FF        .byte $FF   ; 
- - - - - - 0x03FF37 0F:9F27: FF        .byte $FF   ; 
- - - - - - 0x03FF38 0F:9F28: FF        .byte $FF   ; 
- - - - - - 0x03FF39 0F:9F29: FF        .byte $FF   ; 
- - - - - - 0x03FF3A 0F:9F2A: FF        .byte $FF   ; 
- - - - - - 0x03FF3B 0F:9F2B: FF        .byte $FF   ; 
- - - - - - 0x03FF3C 0F:9F2C: FF        .byte $FF   ; 
- - - - - - 0x03FF3D 0F:9F2D: FF        .byte $FF   ; 
- - - - - - 0x03FF3E 0F:9F2E: FF        .byte $FF   ; 
- - - - - - 0x03FF3F 0F:9F2F: FF        .byte $FF   ; 
- - - - - - 0x03FF40 0F:9F30: FF        .byte $FF   ; 
- - - - - - 0x03FF41 0F:9F31: FF        .byte $FF   ; 
- - - - - - 0x03FF42 0F:9F32: FF        .byte $FF   ; 
- - - - - - 0x03FF43 0F:9F33: FF        .byte $FF   ; 
- - - - - - 0x03FF44 0F:9F34: FF        .byte $FF   ; 
- - - - - - 0x03FF45 0F:9F35: FF        .byte $FF   ; 
- - - - - - 0x03FF46 0F:9F36: FF        .byte $FF   ; 
- - - - - - 0x03FF47 0F:9F37: FF        .byte $FF   ; 
- - - - - - 0x03FF48 0F:9F38: FF        .byte $FF   ; 
- - - - - - 0x03FF49 0F:9F39: FF        .byte $FF   ; 
- - - - - - 0x03FF4A 0F:9F3A: FF        .byte $FF   ; 
- - - - - - 0x03FF4B 0F:9F3B: FF        .byte $FF   ; 
- - - - - - 0x03FF4C 0F:9F3C: FF        .byte $FF   ; 
- - - - - - 0x03FF4D 0F:9F3D: FF        .byte $FF   ; 
- - - - - - 0x03FF4E 0F:9F3E: FF        .byte $FF   ; 
- - - - - - 0x03FF4F 0F:9F3F: FF        .byte $FF   ; 
- - - - - - 0x03FF50 0F:9F40: FF        .byte $FF   ; 
- - - - - - 0x03FF51 0F:9F41: FF        .byte $FF   ; 
- - - - - - 0x03FF52 0F:9F42: FF        .byte $FF   ; 
- - - - - - 0x03FF53 0F:9F43: FF        .byte $FF   ; 
- - - - - - 0x03FF54 0F:9F44: FF        .byte $FF   ; 
- - - - - - 0x03FF55 0F:9F45: FF        .byte $FF   ; 
- - - - - - 0x03FF56 0F:9F46: FF        .byte $FF   ; 
- - - - - - 0x03FF57 0F:9F47: FF        .byte $FF   ; 
- - - - - - 0x03FF58 0F:9F48: FF        .byte $FF   ; 
- - - - - - 0x03FF59 0F:9F49: FF        .byte $FF   ; 
- - - - - - 0x03FF5A 0F:9F4A: FF        .byte $FF   ; 
- - - - - - 0x03FF5B 0F:9F4B: FF        .byte $FF   ; 
- - - - - - 0x03FF5C 0F:9F4C: FF        .byte $FF   ; 
- - - - - - 0x03FF5D 0F:9F4D: FF        .byte $FF   ; 
- - - - - - 0x03FF5E 0F:9F4E: FF        .byte $FF   ; 
- - - - - - 0x03FF5F 0F:9F4F: FF        .byte $FF   ; 
- - - - - - 0x03FF60 0F:9F50: FF        .byte $FF   ; 
- - - - - - 0x03FF61 0F:9F51: FF        .byte $FF   ; 
- - - - - - 0x03FF62 0F:9F52: FF        .byte $FF   ; 
- - - - - - 0x03FF63 0F:9F53: FF        .byte $FF   ; 
- - - - - - 0x03FF64 0F:9F54: FF        .byte $FF   ; 
- - - - - - 0x03FF65 0F:9F55: FF        .byte $FF   ; 
- - - - - - 0x03FF66 0F:9F56: FF        .byte $FF   ; 
- - - - - - 0x03FF67 0F:9F57: FF        .byte $FF   ; 
- - - - - - 0x03FF68 0F:9F58: FF        .byte $FF   ; 
- - - - - - 0x03FF69 0F:9F59: FF        .byte $FF   ; 
- - - - - - 0x03FF6A 0F:9F5A: FF        .byte $FF   ; 
- - - - - - 0x03FF6B 0F:9F5B: FF        .byte $FF   ; 
- - - - - - 0x03FF6C 0F:9F5C: FF        .byte $FF   ; 
- - - - - - 0x03FF6D 0F:9F5D: FF        .byte $FF   ; 
- - - - - - 0x03FF6E 0F:9F5E: FF        .byte $FF   ; 
- - - - - - 0x03FF6F 0F:9F5F: FF        .byte $FF   ; 
- - - - - - 0x03FF70 0F:9F60: FF        .byte $FF   ; 
- - - - - - 0x03FF71 0F:9F61: FF        .byte $FF   ; 
- - - - - - 0x03FF72 0F:9F62: FF        .byte $FF   ; 
- - - - - - 0x03FF73 0F:9F63: FF        .byte $FF   ; 
- - - - - - 0x03FF74 0F:9F64: FF        .byte $FF   ; 
- - - - - - 0x03FF75 0F:9F65: FF        .byte $FF   ; 
- - - - - - 0x03FF76 0F:9F66: FF        .byte $FF   ; 
- - - - - - 0x03FF77 0F:9F67: FF        .byte $FF   ; 
- - - - - - 0x03FF78 0F:9F68: FF        .byte $FF   ; 
- - - - - - 0x03FF79 0F:9F69: FF        .byte $FF   ; 
- - - - - - 0x03FF7A 0F:9F6A: FF        .byte $FF   ; 
- - - - - - 0x03FF7B 0F:9F6B: FF        .byte $FF   ; 
- - - - - - 0x03FF7C 0F:9F6C: FF        .byte $FF   ; 
- - - - - - 0x03FF7D 0F:9F6D: FF        .byte $FF   ; 
- - - - - - 0x03FF7E 0F:9F6E: FF        .byte $FF   ; 
- - - - - - 0x03FF7F 0F:9F6F: FF        .byte $FF   ; 
- - - - - - 0x03FF80 0F:9F70: FF        .byte $FF   ; 
- - - - - - 0x03FF81 0F:9F71: FF        .byte $FF   ; 
- - - - - - 0x03FF82 0F:9F72: FF        .byte $FF   ; 
- - - - - - 0x03FF83 0F:9F73: FF        .byte $FF   ; 
- - - - - - 0x03FF84 0F:9F74: FF        .byte $FF   ; 
- - - - - - 0x03FF85 0F:9F75: FF        .byte $FF   ; 
- - - - - - 0x03FF86 0F:9F76: FF        .byte $FF   ; 
- - - - - - 0x03FF87 0F:9F77: FF        .byte $FF   ; 
- - - - - - 0x03FF88 0F:9F78: FF        .byte $FF   ; 
- - - - - - 0x03FF89 0F:9F79: FF        .byte $FF   ; 
- - - - - - 0x03FF8A 0F:9F7A: FF        .byte $FF   ; 
- - - - - - 0x03FF8B 0F:9F7B: FF        .byte $FF   ; 
- - - - - - 0x03FF8C 0F:9F7C: FF        .byte $FF   ; 
- - - - - - 0x03FF8D 0F:9F7D: FF        .byte $FF   ; 
- - - - - - 0x03FF8E 0F:9F7E: FF        .byte $FF   ; 
- - - - - - 0x03FF8F 0F:9F7F: FF        .byte $FF   ; 
- - - - - - 0x03FF90 0F:9F80: FF        .byte $FF   ; 
- - - - - - 0x03FF91 0F:9F81: FF        .byte $FF   ; 
- - - - - - 0x03FF92 0F:9F82: FF        .byte $FF   ; 
- - - - - - 0x03FF93 0F:9F83: FF        .byte $FF   ; 
- - - - - - 0x03FF94 0F:9F84: FF        .byte $FF   ; 
- - - - - - 0x03FF95 0F:9F85: FF        .byte $FF   ; 
- - - - - - 0x03FF96 0F:9F86: FF        .byte $FF   ; 
- - - - - - 0x03FF97 0F:9F87: FF        .byte $FF   ; 
- - - - - - 0x03FF98 0F:9F88: FF        .byte $FF   ; 
- - - - - - 0x03FF99 0F:9F89: FF        .byte $FF   ; 
- - - - - - 0x03FF9A 0F:9F8A: FF        .byte $FF   ; 
- - - - - - 0x03FF9B 0F:9F8B: FF        .byte $FF   ; 
- - - - - - 0x03FF9C 0F:9F8C: FF        .byte $FF   ; 
- - - - - - 0x03FF9D 0F:9F8D: FF        .byte $FF   ; 
- - - - - - 0x03FF9E 0F:9F8E: FF        .byte $FF   ; 
- - - - - - 0x03FF9F 0F:9F8F: FF        .byte $FF   ; 
- - - - - - 0x03FFA0 0F:9F90: FF        .byte $FF   ; 
- - - - - - 0x03FFA1 0F:9F91: FF        .byte $FF   ; 
- - - - - - 0x03FFA2 0F:9F92: FF        .byte $FF   ; 
- - - - - - 0x03FFA3 0F:9F93: FF        .byte $FF   ; 
- - - - - - 0x03FFA4 0F:9F94: FF        .byte $FF   ; 
- - - - - - 0x03FFA5 0F:9F95: FF        .byte $FF   ; 
- - - - - - 0x03FFA6 0F:9F96: FF        .byte $FF   ; 
- - - - - - 0x03FFA7 0F:9F97: FF        .byte $FF   ; 
- - - - - - 0x03FFA8 0F:9F98: FF        .byte $FF   ; 
- - - - - - 0x03FFA9 0F:9F99: FF        .byte $FF   ; 
- - - - - - 0x03FFAA 0F:9F9A: FF        .byte $FF   ; 
- - - - - - 0x03FFAB 0F:9F9B: FF        .byte $FF   ; 
- - - - - - 0x03FFAC 0F:9F9C: FF        .byte $FF   ; 
- - - - - - 0x03FFAD 0F:9F9D: FF        .byte $FF   ; 
- - - - - - 0x03FFAE 0F:9F9E: FF        .byte $FF   ; 
- - - - - - 0x03FFAF 0F:9F9F: FF        .byte $FF   ; 
- - - - - - 0x03FFB0 0F:9FA0: FF        .byte $FF   ; 
- - - - - - 0x03FFB1 0F:9FA1: FF        .byte $FF   ; 
- - - - - - 0x03FFB2 0F:9FA2: FF        .byte $FF   ; 
- - - - - - 0x03FFB3 0F:9FA3: FF        .byte $FF   ; 
- - - - - - 0x03FFB4 0F:9FA4: FF        .byte $FF   ; 
- - - - - - 0x03FFB5 0F:9FA5: FF        .byte $FF   ; 
- - - - - - 0x03FFB6 0F:9FA6: FF        .byte $FF   ; 
- - - - - - 0x03FFB7 0F:9FA7: FF        .byte $FF   ; 
- - - - - - 0x03FFB8 0F:9FA8: FF        .byte $FF   ; 
- - - - - - 0x03FFB9 0F:9FA9: FF        .byte $FF   ; 
- - - - - - 0x03FFBA 0F:9FAA: FF        .byte $FF   ; 
- - - - - - 0x03FFBB 0F:9FAB: FF        .byte $FF   ; 
- - - - - - 0x03FFBC 0F:9FAC: FF        .byte $FF   ; 
- - - - - - 0x03FFBD 0F:9FAD: FF        .byte $FF   ; 
- - - - - - 0x03FFBE 0F:9FAE: FF        .byte $FF   ; 
- - - - - - 0x03FFBF 0F:9FAF: FF        .byte $FF   ; 
- - - - - - 0x03FFC0 0F:9FB0: FF        .byte $FF   ; 
- - - - - - 0x03FFC1 0F:9FB1: FF        .byte $FF   ; 
- - - - - - 0x03FFC2 0F:9FB2: FF        .byte $FF   ; 
- - - - - - 0x03FFC3 0F:9FB3: FF        .byte $FF   ; 
- - - - - - 0x03FFC4 0F:9FB4: FF        .byte $FF   ; 
- - - - - - 0x03FFC5 0F:9FB5: FF        .byte $FF   ; 
- - - - - - 0x03FFC6 0F:9FB6: FF        .byte $FF   ; 
- - - - - - 0x03FFC7 0F:9FB7: FF        .byte $FF   ; 
- - - - - - 0x03FFC8 0F:9FB8: FF        .byte $FF   ; 
- - - - - - 0x03FFC9 0F:9FB9: FF        .byte $FF   ; 
- - - - - - 0x03FFCA 0F:9FBA: FF        .byte $FF   ; 
- - - - - - 0x03FFCB 0F:9FBB: FF        .byte $FF   ; 
- - - - - - 0x03FFCC 0F:9FBC: FF        .byte $FF   ; 
- - - - - - 0x03FFCD 0F:9FBD: FF        .byte $FF   ; 
- - - - - - 0x03FFCE 0F:9FBE: FF        .byte $FF   ; 
- - - - - - 0x03FFCF 0F:9FBF: FF        .byte $FF   ; 
- - - - - - 0x03FFD0 0F:9FC0: FF        .byte $FF   ; 
- - - - - - 0x03FFD1 0F:9FC1: FF        .byte $FF   ; 
- - - - - - 0x03FFD2 0F:9FC2: FF        .byte $FF   ; 
- - - - - - 0x03FFD3 0F:9FC3: FF        .byte $FF   ; 
- - - - - - 0x03FFD4 0F:9FC4: FF        .byte $FF   ; 
- - - - - - 0x03FFD5 0F:9FC5: FF        .byte $FF   ; 
- - - - - - 0x03FFD6 0F:9FC6: FF        .byte $FF   ; 
- - - - - - 0x03FFD7 0F:9FC7: FF        .byte $FF   ; 
- - - - - - 0x03FFD8 0F:9FC8: FF        .byte $FF   ; 
- - - - - - 0x03FFD9 0F:9FC9: FF        .byte $FF   ; 
- - - - - - 0x03FFDA 0F:9FCA: FF        .byte $FF   ; 
- - - - - - 0x03FFDB 0F:9FCB: FF        .byte $FF   ; 
- - - - - - 0x03FFDC 0F:9FCC: FF        .byte $FF   ; 
- - - - - - 0x03FFDD 0F:9FCD: FF        .byte $FF   ; 
- - - - - - 0x03FFDE 0F:9FCE: FF        .byte $FF   ; 
- - - - - - 0x03FFDF 0F:9FCF: FF        .byte $FF   ; 
- - - - - - 0x03FFE0 0F:9FD0: FF        .byte $FF   ; 
- - - - - - 0x03FFE1 0F:9FD1: FF        .byte $FF   ; 
- - - - - - 0x03FFE2 0F:9FD2: FF        .byte $FF   ; 
- - - - - - 0x03FFE3 0F:9FD3: FF        .byte $FF   ; 
- - - - - - 0x03FFE4 0F:9FD4: FF        .byte $FF   ; 
- - - - - - 0x03FFE5 0F:9FD5: FF        .byte $FF   ; 
- - - - - - 0x03FFE6 0F:9FD6: FF        .byte $FF   ; 
- - - - - - 0x03FFE7 0F:9FD7: FF        .byte $FF   ; 
- - - - - - 0x03FFE8 0F:9FD8: FF        .byte $FF   ; 
- - - - - - 0x03FFE9 0F:9FD9: FF        .byte $FF   ; 
- - - - - - 0x03FFEA 0F:9FDA: FF        .byte $FF   ; 
- - - - - - 0x03FFEB 0F:9FDB: FF        .byte $FF   ; 
- - - - - - 0x03FFEC 0F:9FDC: FF        .byte $FF   ; 
- - - - - - 0x03FFED 0F:9FDD: FF        .byte $FF   ; 
- - - - - - 0x03FFEE 0F:9FDE: FF        .byte $FF   ; 
- - - - - - 0x03FFEF 0F:9FDF: FF        .byte $FF   ; 
- - - - - - 0x03FFF0 0F:9FE0: FF        .byte $FF   ; 
- - - - - - 0x03FFF1 0F:9FE1: FF        .byte $FF   ; 
- - - - - - 0x03FFF2 0F:9FE2: FF        .byte $FF   ; 
- - - - - - 0x03FFF3 0F:9FE3: FF        .byte $FF   ; 
- - - - - - 0x03FFF4 0F:9FE4: FF        .byte $FF   ; 
- - - - - - 0x03FFF5 0F:9FE5: FF        .byte $FF   ; 
- - - - - - 0x03FFF6 0F:9FE6: FF        .byte $FF   ; 
- - - - - - 0x03FFF7 0F:9FE7: FF        .byte $FF   ; 
- - - - - - 0x03FFF8 0F:9FE8: FF        .byte $FF   ; 
- - - - - - 0x03FFF9 0F:9FE9: FF        .byte $FF   ; 
- - - - - - 0x03FFFA 0F:9FEA: FF        .byte $FF   ; 
- - - - - - 0x03FFFB 0F:9FEB: FF        .byte $FF   ; 
- - - - - - 0x03FFFC 0F:9FEC: FF        .byte $FF   ; 
- - - - - - 0x03FFFD 0F:9FED: FF        .byte $FF   ; 
- - - - - - 0x03FFFE 0F:9FEE: FF        .byte $FF   ; 
- - - - - - 0x03FFFF 0F:9FEF: FF        .byte $FF   ; 
C - - - - - 0x040000 0F:9FF0: A9 00     LDA #$00
C - - - - - 0x040002 0F:9FF2: 8D 00 80  STA $8000
C - - - - - 0x040005 0F:9FF5: 4C 03 C5  JMP $C503
- - - - - - 0x040008 0F:9FF8: 00        .byte $00   ; 
- - - - - - 0x040009 0F:9FF9: 00        .byte $00   ; 
- D 3 - - - 0x04000A 0F:9FFA: 00        .byte $00   ; 
- D 3 - - - 0x04000B 0F:9FFB: C5        .byte $C5   ; 
- D 3 - - - 0x04000C 0F:9FFC: F0        .byte $F0   ; 
- D 3 - - - 0x04000D 0F:9FFD: FF        .byte $FF   ; 
- D 3 - - - 0x04000E 0F:9FFE: 06        .byte $06   ; 
- D 3 - - - 0x04000F 0F:9FFF: C5        .byte $C5   ; 



