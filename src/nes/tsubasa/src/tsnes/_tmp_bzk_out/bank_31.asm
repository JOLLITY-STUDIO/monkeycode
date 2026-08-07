.segment "???"
.include "bank_ram.inc"
; 0x03E010-0x04000F

- - - - - - 0x03E010 0F:E000: FF        .byte $FF   ; 
- - - - - - 0x03E011 0F:E001: 18        .byte $18   ; 
C - - - - - 0x03E012 0F:E002: 69 01     ADC #$01
C - - - - - 0x03E014 0F:E004: A0 06     LDY #$06
C - - - - - 0x03E016 0F:E006: 18        CLC
C - - - - - 0x03E017 0F:E007: 71 34     ADC (ram_0034),Y
C - - - - - 0x03E019 0F:E009: C9 D0     CMP #$D0
C - - - - - 0x03E01B 0F:E00B: 90 02     BCC $E00F
C - - - - - 0x03E01D 0F:E00D: A9 CF     LDA #$CF
C - - - - - 0x03E01F 0F:E00F: C9 30     CMP #$30
C - - - - - 0x03E021 0F:E011: B0 02     BCS $E015
C - - - - - 0x03E023 0F:E013: A9 30     LDA #$30
C - - - - - 0x03E025 0F:E015: 91 34     STA (ram_0034),Y
C - - - - - 0x03E027 0F:E017: AD 41 04  LDA ram_0441
C - - - - - 0x03E02A 0F:E01A: AE FC 05  LDX ram_05FC
C - - - - - 0x03E02D 0F:E01D: 8E 41 04  STX ram_0441
C - - - - - 0x03E030 0F:E020: 8D FC 05  STA ram_05FC
C - - - - - 0x03E033 0F:E023: 20 59 E0  JSR $E059
C - - - - - 0x03E036 0F:E026: A9 FF     LDA #$FF
C - - - - - 0x03E038 0F:E028: 8D 1A 06  STA ram_061A
C - - - - - 0x03E03B 0F:E02B: A9 01     LDA #$01
C - - - - - 0x03E03D 0F:E02D: 8D 1B 06  STA ram_061B
C - - - - - 0x03E040 0F:E030: 20 3E E7  JSR $E73E
C - - - - - 0x03E043 0F:E033: AD FC 05  LDA ram_05FC
C - - - - - 0x03E046 0F:E036: 8D 41 04  STA ram_0441
C - - - - - 0x03E049 0F:E039: 20 EC E6  JSR $E6EC
C - - - - - 0x03E04C 0F:E03C: 48        PHA
C - - - - - 0x03E04D 0F:E03D: A5 22     LDA ram_0022
C - - - - - 0x03E04F 0F:E03F: A9 1A     LDA #$1A
C - - - - - 0x03E051 0F:E041: 85 24     STA ram_0024
C - - - - - 0x03E053 0F:E043: A9 1B     LDA #$1B
C - - - - - 0x03E055 0F:E045: 85 25     STA ram_0025
C - - - - - 0x03E057 0F:E047: 20 2D CE  JSR $CE2D
C - - - - - 0x03E05A 0F:E04A: 68        PLA
C - - - - - 0x03E05B 0F:E04B: 20 1E 80  JSR $801E
C - - - - - 0x03E05E 0F:E04E: A9 1B     LDA #$1B
C - - - - - 0x03E060 0F:E050: 20 B0 CB  JSR $CBB0
C - - - - - 0x03E063 0F:E053: A2 50     LDX #$50
C - - - - - 0x03E065 0F:E055: 9A        TXS
C - - - - - 0x03E066 0F:E056: 4C DF E0  JMP $E0DF
C D 3 - - - 0x03E069 0F:E059: AD FC 05  LDA ram_05FC
C - - - - - 0x03E06C 0F:E05C: C9 FF     CMP #$FF
C - - - - - 0x03E06E 0F:E05E: F0 13     BEQ $E073
C - - - - - 0x03E070 0F:E060: 20 7C CD  JSR $CD7C
C - - - - - 0x03E073 0F:E063: A0 06     LDY #$06
C - - - - - 0x03E075 0F:E065: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E077 0F:E067: AA        TAX
C - - - - - 0x03E078 0F:E068: A0 08     LDY #$08
C - - - - - 0x03E07A 0F:E06A: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E07C 0F:E06C: A8        TAY
C - - - - - 0x03E07D 0F:E06D: 20 E2 CD  JSR $CDE2
C - - - - - 0x03E080 0F:E070: 8D 38 06  STA ram_0638
C - - - - - 0x03E083 0F:E073: 60        RTS
C D 3 - - - 0x03E084 0F:E074: AD FF 05  LDA ram_05FF
C - - - - - 0x03E087 0F:E077: F0 65     BEQ $E0DE
C - - - - - 0x03E089 0F:E079: A9 0F     LDA #$0F
C - - - - - 0x03E08B 0F:E07B: 8D 2A 06  STA ram_062A
C - - - - - 0x03E08E 0F:E07E: 20 09 E7  JSR $E709
C - - - - - 0x03E091 0F:E081: A9 00     LDA #$00
C - - - - - 0x03E093 0F:E083: 48        PHA
C - - - - - 0x03E094 0F:E084: A9 01     LDA #$01
C - - - - - 0x03E096 0F:E086: 20 0F CB  JSR $CB0F
C - - - - - 0x03E099 0F:E089: 68        PLA
C - - - - - 0x03E09A 0F:E08A: 48        PHA
C - - - - - 0x03E09B 0F:E08B: F0 44     BEQ $E0D1
C - - - - - 0x03E09D 0F:E08D: C9 0B     CMP #$0B
C - - - - - 0x03E09F 0F:E08F: F0 40     BEQ $E0D1
C - - - - - 0x03E0A1 0F:E091: CD 41 04  CMP ram_0441
C - - - - - 0x03E0A4 0F:E094: F0 3B     BEQ $E0D1
C - - - - - 0x03E0A6 0F:E096: 2C 2A 06  BIT ram_062A
C - - - - - 0x03E0A9 0F:E099: 10 14     BPL $E0AF
C - - - - - 0x03E0AB 0F:E09B: 48        PHA
C - - - - - 0x03E0AC 0F:E09C: 48        PHA
C - - - - - 0x03E0AD 0F:E09D: A5 22     LDA ram_0022
C - - - - - 0x03E0AF 0F:E09F: A9 1A     LDA #$1A
C - - - - - 0x03E0B1 0F:E0A1: 85 24     STA ram_0024
C - - - - - 0x03E0B3 0F:E0A3: A9 1B     LDA #$1B
C - - - - - 0x03E0B5 0F:E0A5: 85 25     STA ram_0025
C - - - - - 0x03E0B7 0F:E0A7: 20 2D CE  JSR $CE2D
C - - - - - 0x03E0BA 0F:E0AA: 68        PLA
C - - - - - 0x03E0BB 0F:E0AB: 20 00 80  JSR $8000
C - - - - - 0x03E0BE 0F:E0AE: 68        PLA
C - - - - - 0x03E0BF 0F:E0AF: 85 41     STA ram_0041
C - - - - - 0x03E0C1 0F:E0B1: 20 7C CD  JSR $CD7C
C - - - - - 0x03E0C4 0F:E0B4: A5 41     LDA ram_0041
C - - - - - 0x03E0C6 0F:E0B6: C9 0B     CMP #$0B
C - - - - - 0x03E0C8 0F:E0B8: AE FB 05  LDX ram_05FB
C - - - - - 0x03E0CB 0F:E0BB: F0 06     BEQ $E0C3
C - - - - - 0x03E0CD 0F:E0BD: 08        PHP
C - - - - - 0x03E0CE 0F:E0BE: 68        PLA
C - - - - - 0x03E0CF 0F:E0BF: 49 01     EOR #$01
C - - - - - 0x03E0D1 0F:E0C1: 48        PHA
C - - - - - 0x03E0D2 0F:E0C2: 28        PLP
C - - - - - 0x03E0D3 0F:E0C3: A2 21     LDX #$21
C - - - - - 0x03E0D5 0F:E0C5: 90 02     BCC $E0C9
C - - - - - 0x03E0D7 0F:E0C7: A2 22     LDX #$22
C - - - - - 0x03E0D9 0F:E0C9: A5 41     LDA ram_0041
C - - - - - 0x03E0DB 0F:E0CB: 20 08 CE  JSR $CE08
C - - - - - 0x03E0DE 0F:E0CE: 20 54 E8  JSR $E854
C - - - - - 0x03E0E1 0F:E0D1: 68        PLA
C - - - - - 0x03E0E2 0F:E0D2: 18        CLC
C - - - - - 0x03E0E3 0F:E0D3: 69 01     ADC #$01
C - - - - - 0x03E0E5 0F:E0D5: C9 16     CMP #$16
C - - - - - 0x03E0E7 0F:E0D7: D0 AA     BNE $E083
C - - - - - 0x03E0E9 0F:E0D9: A9 00     LDA #$00
C - - - - - 0x03E0EB 0F:E0DB: 8D FF 05  STA ram_05FF
C - - - - - 0x03E0EE 0F:E0DE: 60        RTS
C D 3 - - - 0x03E0EF 0F:E0DF: A9 00     LDA #$00
C - - - - - 0x03E0F1 0F:E0E1: 20 7F EF  JSR $EF7F
C - - - - - 0x03E0F4 0F:E0E4: A9 01     LDA #$01
C - - - - - 0x03E0F6 0F:E0E6: 20 7F EF  JSR $EF7F
C - - - - - 0x03E0F9 0F:E0E9: 20 33 E2  JSR $E233
C - - - - - 0x03E0FC 0F:E0EC: A9 0A     LDA #$0A
C - - - - - 0x03E0FE 0F:E0EE: 8D 14 06  STA ram_0614
C - - - - - 0x03E101 0F:E0F1: A9 FF     LDA #$FF
C - - - - - 0x03E103 0F:E0F3: 8D 2A 06  STA ram_062A
C - - - - - 0x03E106 0F:E0F6: 20 EC E6  JSR $E6EC
C - - - - - 0x03E109 0F:E0F9: A0 40     LDY #$40
C - - - - - 0x03E10B 0F:E0FB: A2 00     LDX #$00
C - - - - - 0x03E10D 0F:E0FD: 8E 4E 04  STX ram_044E
C - - - - - 0x03E110 0F:E100: 8E 00 06  STX ram_0600
C - - - - - 0x03E113 0F:E103: AD 41 04  LDA ram_0441
C - - - - - 0x03E116 0F:E106: C9 0B     CMP #$0B
C - - - - - 0x03E118 0F:E108: 90 04     BCC $E10E
C - - - - - 0x03E11A 0F:E10A: A2 0B     LDX #$0B
C - - - - - 0x03E11C 0F:E10C: A0 00     LDY #$00
C - - - - - 0x03E11E 0F:E10E: 8E FB 05  STX ram_05FB
C - - - - - 0x03E121 0F:E111: 8C 17 05  STY ram_0517
C - - - - - 0x03E124 0F:E114: 8A        TXA
C - - - - - 0x03E125 0F:E115: D0 0E     BNE $E125
C - - - - - 0x03E127 0F:E117: 2C 4C 04  BIT ram_044C
C - - - - - 0x03E12A 0F:E11A: 10 26     BPL $E142
C - - - - - 0x03E12C 0F:E11C: 8D 4C 04  STA ram_044C
C - - - - - 0x03E12F 0F:E11F: 8D F1 03  STA ram_03F1
C - - - - - 0x03E132 0F:E122: 4C 42 E1  JMP $E142
C - - - - - 0x03E135 0F:E125: A9 00     LDA #$00
C - - - - - 0x03E137 0F:E127: 8D 42 04  STA ram_0442
C - - - - - 0x03E13A 0F:E12A: 20 99 CE  JSR $CE99
C - - - - - 0x03E13D 0F:E12D: 8D FD 05  STA ram_05FD
C - - - - - 0x03E140 0F:E130: AD 41 04  LDA ram_0441
C - - - - - 0x03E143 0F:E133: 20 7C CD  JSR $CD7C
C - - - - - 0x03E146 0F:E136: A9 05     LDA #$05
C - - - - - 0x03E148 0F:E138: A0 09     LDY #$09
C - - - - - 0x03E14A 0F:E13A: 91 34     STA (ram_0034),Y
C - - - - - 0x03E14C 0F:E13C: AD FE 05  LDA ram_05FE
C - - - - - 0x03E14F 0F:E13F: 8D 17 06  STA ram_0617
C - - - - - 0x03E152 0F:E142: 20 67 E2  JSR $E267
C D 3 - - - 0x03E155 0F:E145: A9 01     LDA #$01
C - - - - - 0x03E157 0F:E147: 20 0F CB  JSR $CB0F
C - - - - - 0x03E15A 0F:E14A: 20 49 E3  JSR $E349
C - - - - - 0x03E15D 0F:E14D: AD 14 06  LDA ram_0614
C - - - - - 0x03E160 0F:E150: F0 06     BEQ $E158
C - - - - - 0x03E162 0F:E152: CE 14 06  DEC ram_0614
C - - - - - 0x03E165 0F:E155: 4C 45 E1  JMP $E145
C - - - - - 0x03E168 0F:E158: A9 0A     LDA #$0A
C - - - - - 0x03E16A 0F:E15A: 8D 14 06  STA ram_0614
C - - - - - 0x03E16D 0F:E15D: AD 1C 00  LDA a: ram_001C
C - - - - - 0x03E170 0F:E160: 29 0F     AND #$0F
C - - - - - 0x03E172 0F:E162: F0 22     BEQ $E186
C - - - - - 0x03E174 0F:E164: 48        PHA
C - - - - - 0x03E175 0F:E165: A2 20     LDX #$20
C - - - - - 0x03E177 0F:E167: AD 41 04  LDA ram_0441
C - - - - - 0x03E17A 0F:E16A: AC FB 05  LDY ram_05FB
C - - - - - 0x03E17D 0F:E16D: F0 05     BEQ $E174
C - - - - - 0x03E17F 0F:E16F: A2 22     LDX #$22
C - - - - - 0x03E181 0F:E171: AD FD 05  LDA ram_05FD
C - - - - - 0x03E184 0F:E174: 20 08 CE  JSR $CE08
C - - - - - 0x03E187 0F:E177: 68        PLA
C - - - - - 0x03E188 0F:E178: 48        PHA
C - - - - - 0x03E189 0F:E179: A0 05     LDY #$05
C - - - - - 0x03E18B 0F:E17B: 20 F5 E8  JSR $E8F5
C - - - - - 0x03E18E 0F:E17E: 68        PLA
C - - - - - 0x03E18F 0F:E17F: 4A        LSR
C - - - - - 0x03E190 0F:E180: 4A        LSR
C - - - - - 0x03E191 0F:E181: A0 07     LDY #$07
C - - - - - 0x03E193 0F:E183: 20 F5 E8  JSR $E8F5
C - - - - - 0x03E196 0F:E186: 20 EC E6  JSR $E6EC
C - - - - - 0x03E199 0F:E189: AD 41 04  LDA ram_0441
C - - - - - 0x03E19C 0F:E18C: C9 0B     CMP #$0B
C - - - - - 0x03E19E 0F:E18E: 90 57     BCC $E1E7
C - - - - - 0x03E1A0 0F:E190: AD FE 05  LDA ram_05FE
C - - - - - 0x03E1A3 0F:E193: CD 17 06  CMP ram_0617
C - - - - - 0x03E1A6 0F:E196: F0 4F     BEQ $E1E7
C - - - - - 0x03E1A8 0F:E198: 8D 17 06  STA ram_0617
C - - - - - 0x03E1AB 0F:E19B: A9 00     LDA #$00
C - - - - - 0x03E1AD 0F:E19D: 8D 21 06  STA ram_0621
C - - - - - 0x03E1B0 0F:E1A0: 48        PHA
C - - - - - 0x03E1B1 0F:E1A1: A5 22     LDA ram_0022
C - - - - - 0x03E1B3 0F:E1A3: A9 1C     LDA #$1C
C - - - - - 0x03E1B5 0F:E1A5: 85 24     STA ram_0024
C - - - - - 0x03E1B7 0F:E1A7: A9 1D     LDA #$1D
C - - - - - 0x03E1B9 0F:E1A9: 85 25     STA ram_0025
C - - - - - 0x03E1BB 0F:E1AB: 20 2D CE  JSR $CE2D
C - - - - - 0x03E1BE 0F:E1AE: 68        PLA
C - - - - - 0x03E1BF 0F:E1AF: 20 06 80  JSR $8006
C - - - - - 0x03E1C2 0F:E1B2: AD 3B 04  LDA ram_043B
C - - - - - 0x03E1C5 0F:E1B5: C9 02     CMP #$02
C - - - - - 0x03E1C7 0F:E1B7: F0 2E     BEQ $E1E7
C - - - - - 0x03E1C9 0F:E1B9: 48        PHA
C - - - - - 0x03E1CA 0F:E1BA: A5 22     LDA ram_0022
C - - - - - 0x03E1CC 0F:E1BC: A9 1A     LDA #$1A
C - - - - - 0x03E1CE 0F:E1BE: 85 24     STA ram_0024
C - - - - - 0x03E1D0 0F:E1C0: A9 1B     LDA #$1B
C - - - - - 0x03E1D2 0F:E1C2: 85 25     STA ram_0025
C - - - - - 0x03E1D4 0F:E1C4: 20 2D CE  JSR $CE2D
C - - - - - 0x03E1D7 0F:E1C7: 68        PLA
C - - - - - 0x03E1D8 0F:E1C8: 20 21 80  JSR $8021
C - - - - - 0x03E1DB 0F:E1CB: 20 46 CC  JSR $CC46
C - - - - - 0x03E1DE 0F:E1CE: A9 00     LDA #$00
C - - - - - 0x03E1E0 0F:E1D0: 8D 2D 06  STA ram_062D
C - - - - - 0x03E1E3 0F:E1D3: 8D 15 06  STA ram_0615
C - - - - - 0x03E1E6 0F:E1D6: A9 1A     LDA #$1A
C - - - - - 0x03E1E8 0F:E1D8: 85 24     STA ram_0024
C - - - - - 0x03E1EA 0F:E1DA: A9 1B     LDA #$1B
C - - - - - 0x03E1EC 0F:E1DC: 85 25     STA ram_0025
C - - - - - 0x03E1EE 0F:E1DE: 20 2D CE  JSR $CE2D
C - - - - - 0x03E1F1 0F:E1E1: A2 50     LDX #$50
C - - - - - 0x03E1F3 0F:E1E3: 9A        TXS
C - - - - - 0x03E1F4 0F:E1E4: 4C 27 80  JMP $8027
C - - - - - 0x03E1F7 0F:E1E7: A2 00     LDX #$00
C - - - - - 0x03E1F9 0F:E1E9: 8E FF 05  STX ram_05FF
C - - - - - 0x03E1FC 0F:E1EC: E8        INX
C - - - - - 0x03E1FD 0F:E1ED: 8A        TXA
C - - - - - 0x03E1FE 0F:E1EE: 20 93 D1  JSR $D193
C - - - - - 0x03E201 0F:E1F1: 20 7D E2  JSR $E27D
C - - - - - 0x03E204 0F:E1F4: EE 13 06  INC ram_0613
C - - - - - 0x03E207 0F:E1F7: 20 BC E2  JSR $E2BC
C - - - - - 0x03E20A 0F:E1FA: 20 07 E4  JSR $E407
C - - - - - 0x03E20D 0F:E1FD: 2C 4B 04  BIT ram_044B
C - - - - - 0x03E210 0F:E200: 10 1C     BPL $E21E
C - - - - - 0x03E212 0F:E202: AD FB 05  LDA ram_05FB
C - - - - - 0x03E215 0F:E205: D0 17     BNE $E21E
C - - - - - 0x03E217 0F:E207: 2C 35 06  BIT ram_0635
C - - - - - 0x03E21A 0F:E20A: 10 12     BPL $E21E
C - - - - - 0x03E21C 0F:E20C: 48        PHA
C - - - - - 0x03E21D 0F:E20D: A5 22     LDA ram_0022
C - - - - - 0x03E21F 0F:E20F: A9 1A     LDA #$1A
C - - - - - 0x03E221 0F:E211: 85 24     STA ram_0024
C - - - - - 0x03E223 0F:E213: A9 1B     LDA #$1B
C - - - - - 0x03E225 0F:E215: 85 25     STA ram_0025
C - - - - - 0x03E227 0F:E217: 20 2D CE  JSR $CE2D
C - - - - - 0x03E22A 0F:E21A: 68        PLA
C - - - - - 0x03E22B 0F:E21B: 20 39 80  JSR $8039
C - - - - - 0x03E22E 0F:E21E: 48        PHA
C - - - - - 0x03E22F 0F:E21F: A5 22     LDA ram_0022
C - - - - - 0x03E231 0F:E221: A9 1A     LDA #$1A
C - - - - - 0x03E233 0F:E223: 85 24     STA ram_0024
C - - - - - 0x03E235 0F:E225: A9 1B     LDA #$1B
C - - - - - 0x03E237 0F:E227: 85 25     STA ram_0025
C - - - - - 0x03E239 0F:E229: 20 2D CE  JSR $CE2D
C - - - - - 0x03E23C 0F:E22C: 68        PLA
C - - - - - 0x03E23D 0F:E22D: 20 33 80  JSR $8033
C - - - - - 0x03E240 0F:E230: 4C 45 E1  JMP $E145
C D 3 - - - 0x03E243 0F:E233: A9 1E     LDA #$1E
C - - - - - 0x03E245 0F:E235: 20 B0 CB  JSR $CBB0
C - - - - - 0x03E248 0F:E238: 48        PHA
C - - - - - 0x03E249 0F:E239: A5 22     LDA ram_0022
C - - - - - 0x03E24B 0F:E23B: A9 1C     LDA #$1C
C - - - - - 0x03E24D 0F:E23D: 85 24     STA ram_0024
C - - - - - 0x03E24F 0F:E23F: A9 1D     LDA #$1D
C - - - - - 0x03E251 0F:E241: 85 25     STA ram_0025
C - - - - - 0x03E253 0F:E243: 20 2D CE  JSR $CE2D
C - - - - - 0x03E256 0F:E246: 68        PLA
C - - - - - 0x03E257 0F:E247: 20 24 80  JSR $8024
C - - - - - 0x03E25A 0F:E24A: 20 67 E2  JSR $E267
C - - - - - 0x03E25D 0F:E24D: A9 80     LDA #$80
C - - - - - 0x03E25F 0F:E24F: 8D 15 06  STA ram_0615
C - - - - - 0x03E262 0F:E252: 8D 2D 06  STA ram_062D
C - - - - - 0x03E265 0F:E255: A9 00     LDA #$00
C - - - - - 0x03E267 0F:E257: 8D 42 06  STA ram_0642
C - - - - - 0x03E26A 0F:E25A: 8D 43 06  STA ram_0643
C - - - - - 0x03E26D 0F:E25D: A9 02     LDA #$02
C - - - - - 0x03E26F 0F:E25F: 85 8E     STA ram_008E
C - - - - - 0x03E271 0F:E261: A9 01     LDA #$01
C - - - - - 0x03E273 0F:E263: 8D 69 04  STA ram_0469
C - - - - - 0x03E276 0F:E266: 60        RTS
C - - - - - 0x03E277 0F:E267: AD FB 05  LDA ram_05FB
C - - - - - 0x03E27A 0F:E26A: F0 0B     BEQ $E277
C - - - - - 0x03E27C 0F:E26C: A9 31     LDA #$31
C - - - - - 0x03E27E 0F:E26E: 20 7F EF  JSR $EF7F
C - - - - - 0x03E281 0F:E271: A9 32     LDA #$32
C - - - - - 0x03E283 0F:E273: 20 7F EF  JSR $EF7F
C - - - - - 0x03E286 0F:E276: 60        RTS
C - - - - - 0x03E287 0F:E277: A9 30     LDA #$30
C - - - - - 0x03E289 0F:E279: 20 7F EF  JSR $EF7F
C - - - - - 0x03E28C 0F:E27C: 60        RTS
C - - - - - 0x03E28D 0F:E27D: 20 77 CD  JSR $CD77
C - - - - - 0x03E290 0F:E280: A0 0A     LDY #$0A
C - - - - - 0x03E292 0F:E282: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E294 0F:E284: D0 1C     BNE $E2A2
C - - - - - 0x03E296 0F:E286: AE 35 06  LDX ram_0635
C - - - - - 0x03E299 0F:E289: AC 37 06  LDY ram_0637
C - - - - - 0x03E29C 0F:E28C: AD FB 05  LDA ram_05FB
C - - - - - 0x03E29F 0F:E28F: F0 05     BEQ $E296
C - - - - - 0x03E2A1 0F:E291: 8A        TXA
C - - - - - 0x03E2A2 0F:E292: 49 FF     EOR #$FF
C - - - - - 0x03E2A4 0F:E294: AA        TAX
C - - - - - 0x03E2A5 0F:E295: E8        INX
C - - - - - 0x03E2A6 0F:E296: E0 C4     CPX #$C4
C - - - - - 0x03E2A8 0F:E298: 90 08     BCC $E2A2
C - - - - - 0x03E2AA 0F:E29A: C0 74     CPY #$74
C - - - - - 0x03E2AC 0F:E29C: 90 04     BCC $E2A2
C - - - - - 0x03E2AE 0F:E29E: C0 8C     CPY #$8C
C - - - - - 0x03E2B0 0F:E2A0: 90 01     BCC $E2A3
C - - - - - 0x03E2B2 0F:E2A2: 60        RTS
C - - - - - 0x03E2B3 0F:E2A3: A9 00     LDA #$00
C - - - - - 0x03E2B5 0F:E2A5: 8D 2D 06  STA ram_062D
C - - - - - 0x03E2B8 0F:E2A8: 8D 15 06  STA ram_0615
C - - - - - 0x03E2BB 0F:E2AB: A9 1A     LDA #$1A
C - - - - - 0x03E2BD 0F:E2AD: 85 24     STA ram_0024
C - - - - - 0x03E2BF 0F:E2AF: A9 1B     LDA #$1B
C - - - - - 0x03E2C1 0F:E2B1: 85 25     STA ram_0025
C - - - - - 0x03E2C3 0F:E2B3: 20 2D CE  JSR $CE2D
C - - - - - 0x03E2C6 0F:E2B6: A2 50     LDX #$50
C - - - - - 0x03E2C8 0F:E2B8: 9A        TXS
C - - - - - 0x03E2C9 0F:E2B9: 4C 09 80  JMP $8009
C - - - - - 0x03E2CC 0F:E2BC: EE 18 06  INC ram_0618
C - - - - - 0x03E2CF 0F:E2BF: AD 18 06  LDA ram_0618
C - - - - - 0x03E2D2 0F:E2C2: C9 01     CMP #$01
C - - - - - 0x03E2D4 0F:E2C4: 90 4F     BCC $E315
C - - - - - 0x03E2D6 0F:E2C6: A9 00     LDA #$00
C - - - - - 0x03E2D8 0F:E2C8: 8D 18 06  STA ram_0618
C - - - - - 0x03E2DB 0F:E2CB: 48        PHA
C - - - - - 0x03E2DC 0F:E2CC: CD 41 04  CMP ram_0441
C - - - - - 0x03E2DF 0F:E2CF: F0 3C     BEQ $E30D
C - - - - - 0x03E2E1 0F:E2D1: A2 00     LDX #$00
C - - - - - 0x03E2E3 0F:E2D3: 20 08 CE  JSR $CE08
C - - - - - 0x03E2E6 0F:E2D6: A2 02     LDX #$02
C - - - - - 0x03E2E8 0F:E2D8: A0 00     LDY #$00
C - - - - - 0x03E2EA 0F:E2DA: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E2EC 0F:E2DC: A0 01     LDY #$01
C - - - - - 0x03E2EE 0F:E2DE: C9 20     CMP #$20
C - - - - - 0x03E2F0 0F:E2E0: D0 0A     BNE $E2EC
C - - - - - 0x03E2F2 0F:E2E2: A2 01     LDX #$01
C - - - - - 0x03E2F4 0F:E2E4: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E2F6 0F:E2E6: C8        INY
C - - - - - 0x03E2F7 0F:E2E7: 11 34     ORA (ram_0034),Y
C - - - - - 0x03E2F9 0F:E2E9: F0 22     BEQ $E30D
C - - - - - 0x03E2FB 0F:E2EB: 88        DEY
C - - - - - 0x03E2FC 0F:E2EC: 8A        TXA
C - - - - - 0x03E2FD 0F:E2ED: 18        CLC
C - - - - - 0x03E2FE 0F:E2EE: 71 34     ADC (ram_0034),Y
C - - - - - 0x03E300 0F:E2F0: AA        TAX
C - - - - - 0x03E301 0F:E2F1: C8        INY
C - - - - - 0x03E302 0F:E2F2: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E304 0F:E2F4: 69 00     ADC #$00
C - - - - - 0x03E306 0F:E2F6: A8        TAY
C - - - - - 0x03E307 0F:E2F7: 38        SEC
C - - - - - 0x03E308 0F:E2F8: 8A        TXA
C - - - - - 0x03E309 0F:E2F9: E5 32     SBC ram_0032
C - - - - - 0x03E30B 0F:E2FB: 98        TYA
C - - - - - 0x03E30C 0F:E2FC: E5 33     SBC ram_0033
C - - - - - 0x03E30E 0F:E2FE: 90 04     BCC $E304
C - - - - - 0x03E310 0F:E300: A6 32     LDX ram_0032
C - - - - - 0x03E312 0F:E302: A4 33     LDY ram_0033
C - - - - - 0x03E314 0F:E304: 98        TYA
C - - - - - 0x03E315 0F:E305: A0 02     LDY #$02
C - - - - - 0x03E317 0F:E307: 91 34     STA (ram_0034),Y
C - - - - - 0x03E319 0F:E309: 8A        TXA
C - - - - - 0x03E31A 0F:E30A: 88        DEY
C - - - - - 0x03E31B 0F:E30B: 91 34     STA (ram_0034),Y
C - - - - - 0x03E31D 0F:E30D: 68        PLA
C - - - - - 0x03E31E 0F:E30E: 18        CLC
C - - - - - 0x03E31F 0F:E30F: 69 01     ADC #$01
C - - - - - 0x03E321 0F:E311: C9 0B     CMP #$0B
C - - - - - 0x03E323 0F:E313: D0 B6     BNE $E2CB
C - - - - - 0x03E325 0F:E315: AD 41 04  LDA ram_0441
C - - - - - 0x03E328 0F:E318: C9 0B     CMP #$0B
C - - - - - 0x03E32A 0F:E31A: B0 2C     BCS $E348
C - - - - - 0x03E32C 0F:E31C: 20 7C CD  JSR $CD7C
C - - - - - 0x03E32F 0F:E31F: A2 03     LDX #$03
C - - - - - 0x03E331 0F:E321: A0 00     LDY #$00
C - - - - - 0x03E333 0F:E323: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E335 0F:E325: C9 20     CMP #$20
C - - - - - 0x03E337 0F:E327: D0 02     BNE $E32B
C - - - - - 0x03E339 0F:E329: A2 05     LDX #$05
C - - - - - 0x03E33B 0F:E32B: 86 3A     STX ram_003A
C - - - - - 0x03E33D 0F:E32D: A0 01     LDY #$01
C - - - - - 0x03E33F 0F:E32F: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E341 0F:E331: 38        SEC
C - - - - - 0x03E342 0F:E332: E5 3A     SBC ram_003A
C - - - - - 0x03E344 0F:E334: AA        TAX
C - - - - - 0x03E345 0F:E335: C8        INY
C - - - - - 0x03E346 0F:E336: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E348 0F:E338: E9 00     SBC #$00
C - - - - - 0x03E34A 0F:E33A: B0 03     BCS $E33F
C - - - - - 0x03E34C 0F:E33C: A2 00     LDX #$00
C - - - - - 0x03E34E 0F:E33E: 8A        TXA
C - - - - - 0x03E34F 0F:E33F: 91 34     STA (ram_0034),Y
C - - - - - 0x03E351 0F:E341: 8A        TXA
C - - - - - 0x03E352 0F:E342: 88        DEY
C - - - - - 0x03E353 0F:E343: 91 34     STA (ram_0034),Y
C - - - - - 0x03E355 0F:E345: 20 67 E2  JSR $E267
C - - - - - 0x03E358 0F:E348: 60        RTS
C - - - - - 0x03E359 0F:E349: A9 00     LDA #$00
C - - - - - 0x03E35B 0F:E34B: 8D 32 05  STA ram_0532
C - - - - - 0x03E35E 0F:E34E: AD FB 05  LDA ram_05FB
C - - - - - 0x03E361 0F:E351: D0 50     BNE $E3A3
C - - - - - 0x03E363 0F:E353: AD 15 06  LDA ram_0615
C - - - - - 0x03E366 0F:E356: 09 40     ORA #$40
C - - - - - 0x03E368 0F:E358: 8D 15 06  STA ram_0615
C - - - - - 0x03E36B 0F:E35B: AD 1C 00  LDA a: ram_001C
C - - - - - 0x03E36E 0F:E35E: 29 40     AND #$40
C - - - - - 0x03E370 0F:E360: D0 20     BNE $E382
C - - - - - 0x03E372 0F:E362: AD 1C 00  LDA a: ram_001C
C - - - - - 0x03E375 0F:E365: 29 0F     AND #$0F
C - - - - - 0x03E377 0F:E367: F0 60     BEQ $E3C9
C - - - - - 0x03E379 0F:E369: EE 32 05  INC ram_0532
C - - - - - 0x03E37C 0F:E36C: A2 00     LDX #$00
C - - - - - 0x03E37E 0F:E36E: 29 02     AND #$02
C - - - - - 0x03E380 0F:E370: D0 02     BNE $E374
C - - - - - 0x03E382 0F:E372: A2 40     LDX #$40
C - - - - - 0x03E384 0F:E374: 8E 17 05  STX ram_0517
C - - - - - 0x03E387 0F:E377: AD 15 06  LDA ram_0615
C - - - - - 0x03E38A 0F:E37A: 29 BF     AND #$BF
C - - - - - 0x03E38C 0F:E37C: 8D 15 06  STA ram_0615
C - - - - - 0x03E38F 0F:E37F: 4C C9 E3  JMP $E3C9
C - - - - - 0x03E392 0F:E382: A9 00     LDA #$00
C - - - - - 0x03E394 0F:E384: 8D 00 06  STA ram_0600
C - - - - - 0x03E397 0F:E387: 8D 15 06  STA ram_0615
C - - - - - 0x03E39A 0F:E38A: A9 44     LDA #$44
C - - - - - 0x03E39C 0F:E38C: 20 B0 CB  JSR $CBB0
C - - - - - 0x03E39F 0F:E38F: 20 8B CB  JSR $CB8B
C - - - - - 0x03E3A2 0F:E392: A9 1A     LDA #$1A
C - - - - - 0x03E3A4 0F:E394: 85 24     STA ram_0024
C - - - - - 0x03E3A6 0F:E396: A9 1B     LDA #$1B
C - - - - - 0x03E3A8 0F:E398: 85 25     STA ram_0025
C - - - - - 0x03E3AA 0F:E39A: 20 2D CE  JSR $CE2D
C - - - - - 0x03E3AD 0F:E39D: A2 50     LDX #$50
C - - - - - 0x03E3AF 0F:E39F: 9A        TXS
C - - - - - 0x03E3B0 0F:E3A0: 4C 03 80  JMP $8003
C - - - - - 0x03E3B3 0F:E3A3: EE 32 05  INC ram_0532
C - - - - - 0x03E3B6 0F:E3A6: A9 C0     LDA #$C0
C - - - - - 0x03E3B8 0F:E3A8: 2D 1E 00  AND a: ram_001E
C - - - - - 0x03E3BB 0F:E3AB: F0 1C     BEQ $E3C9
C - - - - - 0x03E3BD 0F:E3AD: A2 01     LDX #$01
C - - - - - 0x03E3BF 0F:E3AF: A8        TAY
C - - - - - 0x03E3C0 0F:E3B0: 30 02     BMI $E3B4
C - - - - - 0x03E3C2 0F:E3B2: A2 FF     LDX #$FF
C - - - - - 0x03E3C4 0F:E3B4: 8A        TXA
C - - - - - 0x03E3C5 0F:E3B5: 18        CLC
C - - - - - 0x03E3C6 0F:E3B6: 6D FD 05  ADC ram_05FD
C - - - - - 0x03E3C9 0F:E3B9: D0 02     BNE $E3BD
C - - - - - 0x03E3CB 0F:E3BB: A9 0A     LDA #$0A
C - - - - - 0x03E3CD 0F:E3BD: C9 0B     CMP #$0B
C - - - - - 0x03E3CF 0F:E3BF: 90 02     BCC $E3C3
C - - - - - 0x03E3D1 0F:E3C1: A9 01     LDA #$01
C - - - - - 0x03E3D3 0F:E3C3: 8D FD 05  STA ram_05FD
C - - - - - 0x03E3D6 0F:E3C6: 20 67 E2  JSR $E267
C D 3 - - - 0x03E3D9 0F:E3C9: 60        RTS
C - - - - - 0x03E3DA 0F:E3CA: AD FB 05  LDA ram_05FB
C - - - - - 0x03E3DD 0F:E3CD: D0 07     BNE $E3D6
C - - - - - 0x03E3DF 0F:E3CF: AD 1C 00  LDA a: ram_001C
C - - - - - 0x03E3E2 0F:E3D2: 29 0F     AND #$0F
C - - - - - 0x03E3E4 0F:E3D4: F0 30     BEQ $E406
C - - - - - 0x03E3E6 0F:E3D6: AD 41 04  LDA ram_0441
C - - - - - 0x03E3E9 0F:E3D9: A2 20     LDX #$20
C - - - - - 0x03E3EB 0F:E3DB: 20 08 CE  JSR $CE08
C - - - - - 0x03E3EE 0F:E3DE: 46 33     LSR ram_0033
C - - - - - 0x03E3F0 0F:E3E0: 66 32     ROR ram_0032
C - - - - - 0x03E3F2 0F:E3E2: 46 33     LSR ram_0033
C - - - - - 0x03E3F4 0F:E3E4: 66 32     ROR ram_0032
C - - - - - 0x03E3F6 0F:E3E6: A6 32     LDX ram_0032
C - - - - - 0x03E3F8 0F:E3E8: A4 33     LDY ram_0033
C - - - - - 0x03E3FA 0F:E3EA: 2C 17 05  BIT ram_0517
C - - - - - 0x03E3FD 0F:E3ED: 70 08     BVS $E3F7
C - - - - - 0x03E3FF 0F:E3EF: 8A        TXA
C - - - - - 0x03E400 0F:E3F0: 49 FF     EOR #$FF
C - - - - - 0x03E402 0F:E3F2: AA        TAX
C - - - - - 0x03E403 0F:E3F3: 98        TYA
C - - - - - 0x03E404 0F:E3F4: 49 FF     EOR #$FF
C - - - - - 0x03E406 0F:E3F6: A8        TAY
C - - - - - 0x03E407 0F:E3F7: 8A        TXA
C - - - - - 0x03E408 0F:E3F8: 18        CLC
C - - - - - 0x03E409 0F:E3F9: 6D 42 06  ADC ram_0642
C - - - - - 0x03E40C 0F:E3FC: 8D 42 06  STA ram_0642
C - - - - - 0x03E40F 0F:E3FF: 98        TYA
C - - - - - 0x03E410 0F:E400: 6D 43 06  ADC ram_0643
C - - - - - 0x03E413 0F:E403: 8D 43 06  STA ram_0643
C - - - - - 0x03E416 0F:E406: 60        RTS
C - - - - - 0x03E417 0F:E407: 20 09 E7  JSR $E709
C - - - - - 0x03E41A 0F:E40A: A9 00     LDA #$00
C D 3 - - - 0x03E41C 0F:E40C: 48        PHA
C - - - - - 0x03E41D 0F:E40D: A9 01     LDA #$01
C - - - - - 0x03E41F 0F:E40F: 20 0F CB  JSR $CB0F
C - - - - - 0x03E422 0F:E412: 20 49 E3  JSR $E349
C - - - - - 0x03E425 0F:E415: 68        PLA
C - - - - - 0x03E426 0F:E416: 48        PHA
C - - - - - 0x03E427 0F:E417: F0 76     BEQ $E48F
C - - - - - 0x03E429 0F:E419: C9 0B     CMP #$0B
C - - - - - 0x03E42B 0F:E41B: F0 72     BEQ $E48F
C - - - - - 0x03E42D 0F:E41D: AE FB 05  LDX ram_05FB
C - - - - - 0x03E430 0F:E420: F0 05     BEQ $E427
C - - - - - 0x03E432 0F:E422: CD FD 05  CMP ram_05FD
C - - - - - 0x03E435 0F:E425: F0 68     BEQ $E48F
C - - - - - 0x03E437 0F:E427: CD 41 04  CMP ram_0441
C - - - - - 0x03E43A 0F:E42A: D0 04     BNE $E430
C - - - - - 0x03E43C 0F:E42C: C9 0B     CMP #$0B
C - - - - - 0x03E43E 0F:E42E: 90 5F     BCC $E48F
C - - - - - 0x03E440 0F:E430: 2C 2A 06  BIT ram_062A
C - - - - - 0x03E443 0F:E433: 10 19     BPL $E44E
C - - - - - 0x03E445 0F:E435: CD 41 04  CMP ram_0441
C - - - - - 0x03E448 0F:E438: F0 14     BEQ $E44E
C - - - - - 0x03E44A 0F:E43A: 48        PHA
C - - - - - 0x03E44B 0F:E43B: 48        PHA
C - - - - - 0x03E44C 0F:E43C: A5 22     LDA ram_0022
C - - - - - 0x03E44E 0F:E43E: A9 1A     LDA #$1A
C - - - - - 0x03E450 0F:E440: 85 24     STA ram_0024
C - - - - - 0x03E452 0F:E442: A9 1B     LDA #$1B
C - - - - - 0x03E454 0F:E444: 85 25     STA ram_0025
C - - - - - 0x03E456 0F:E446: 20 2D CE  JSR $CE2D
C - - - - - 0x03E459 0F:E449: 68        PLA
C - - - - - 0x03E45A 0F:E44A: 20 00 80  JSR $8000
C - - - - - 0x03E45D 0F:E44D: 68        PLA
C - - - - - 0x03E45E 0F:E44E: 85 41     STA ram_0041
C - - - - - 0x03E460 0F:E450: 20 7C CD  JSR $CD7C
C - - - - - 0x03E463 0F:E453: A5 41     LDA ram_0041
C - - - - - 0x03E465 0F:E455: C9 0B     CMP #$0B
C - - - - - 0x03E467 0F:E457: AE FB 05  LDX ram_05FB
C - - - - - 0x03E46A 0F:E45A: F0 06     BEQ $E462
C - - - - - 0x03E46C 0F:E45C: 08        PHP
C - - - - - 0x03E46D 0F:E45D: 68        PLA
C - - - - - 0x03E46E 0F:E45E: 49 01     EOR #$01
C - - - - - 0x03E470 0F:E460: 48        PHA
C - - - - - 0x03E471 0F:E461: 28        PLP
C - - - - - 0x03E472 0F:E462: A2 21     LDX #$21
C - - - - - 0x03E474 0F:E464: 90 0C     BCC $E472
C - - - - - 0x03E476 0F:E466: A2 22     LDX #$22
C - - - - - 0x03E478 0F:E468: A0 09     LDY #$09
C - - - - - 0x03E47A 0F:E46A: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E47C 0F:E46C: C9 F0     CMP #$F0
C - - - - - 0x03E47E 0F:E46E: D0 02     BNE $E472
C - - - - - 0x03E480 0F:E470: A2 1F     LDX #$1F
C - - - - - 0x03E482 0F:E472: A5 41     LDA ram_0041
C - - - - - 0x03E484 0F:E474: CD 41 04  CMP ram_0441
C - - - - - 0x03E487 0F:E477: D0 02     BNE $E47B
C - - - - - 0x03E489 0F:E479: A2 20     LDX #$20
C - - - - - 0x03E48B 0F:E47B: 20 08 CE  JSR $CE08
C - - - - - 0x03E48E 0F:E47E: A0 0A     LDY #$0A
C - - - - - 0x03E490 0F:E480: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E492 0F:E482: F0 08     BEQ $E48C
C - - - - - 0x03E494 0F:E484: 38        SEC
C - - - - - 0x03E495 0F:E485: E9 01     SBC #$01
C - - - - - 0x03E497 0F:E487: 91 34     STA (ram_0034),Y
C - - - - - 0x03E499 0F:E489: 4C 8F E4  JMP $E48F
C - - - - - 0x03E49C 0F:E48C: 20 54 E8  JSR $E854
C D 3 - - - 0x03E49F 0F:E48F: 68        PLA
C - - - - - 0x03E4A0 0F:E490: 18        CLC
C - - - - - 0x03E4A1 0F:E491: 69 01     ADC #$01
C - - - - - 0x03E4A3 0F:E493: C9 16     CMP #$16
C - - - - - 0x03E4A5 0F:E495: F0 03     BEQ $E49A
C - - - - - 0x03E4A7 0F:E497: 4C 0C E4  JMP $E40C
C - - - - - 0x03E4AA 0F:E49A: A9 00     LDA #$00
C - - - - - 0x03E4AC 0F:E49C: 8D 00 06  STA ram_0600
C - - - - - 0x03E4AF 0F:E49F: AD 13 06  LDA ram_0613
C - - - - - 0x03E4B2 0F:E4A2: C9 05     CMP #$05
C - - - - - 0x03E4B4 0F:E4A4: 90 0A     BCC $E4B0
C - - - - - 0x03E4B6 0F:E4A6: A9 00     LDA #$00
C - - - - - 0x03E4B8 0F:E4A8: 8D 13 06  STA ram_0613
C - - - - - 0x03E4BB 0F:E4AB: A9 07     LDA #$07
C - - - - - 0x03E4BD 0F:E4AD: 20 D7 E4  JSR $E4D7
C - - - - - 0x03E4C0 0F:E4B0: AD 00 06  LDA ram_0600
C - - - - - 0x03E4C3 0F:E4B3: D0 01     BNE $E4B6
C - - - - - 0x03E4C5 0F:E4B5: 60        RTS
C - - - - - 0x03E4C6 0F:E4B6: A9 00     LDA #$00
C - - - - - 0x03E4C8 0F:E4B8: 8D 2D 06  STA ram_062D
C - - - - - 0x03E4CB 0F:E4BB: 8D 15 06  STA ram_0615
C - - - - - 0x03E4CE 0F:E4BE: 20 8B CB  JSR $CB8B
C - - - - - 0x03E4D1 0F:E4C1: A9 2E     LDA #$2E
C - - - - - 0x03E4D3 0F:E4C3: 20 B0 CB  JSR $CBB0
C - - - - - 0x03E4D6 0F:E4C6: A9 1A     LDA #$1A
C - - - - - 0x03E4D8 0F:E4C8: 85 24     STA ram_0024
C - - - - - 0x03E4DA 0F:E4CA: A9 1B     LDA #$1B
C - - - - - 0x03E4DC 0F:E4CC: 85 25     STA ram_0025
C - - - - - 0x03E4DE 0F:E4CE: 20 2D CE  JSR $CE2D
C - - - - - 0x03E4E1 0F:E4D1: A2 50     LDX #$50
C - - - - - 0x03E4E3 0F:E4D3: 9A        TXS
C - - - - - 0x03E4E4 0F:E4D4: 4C 03 80  JMP $8003
C D 3 - - - 0x03E4E7 0F:E4D7: 85 43     STA ram_0043
C - - - - - 0x03E4E9 0F:E4D9: A9 00     LDA #$00
C - - - - - 0x03E4EB 0F:E4DB: 8D 00 06  STA ram_0600
C - - - - - 0x03E4EE 0F:E4DE: AD FB 05  LDA ram_05FB
C - - - - - 0x03E4F1 0F:E4E1: 49 0B     EOR #$0B
C - - - - - 0x03E4F3 0F:E4E3: 18        CLC
C - - - - - 0x03E4F4 0F:E4E4: 69 01     ADC #$01
C - - - - - 0x03E4F6 0F:E4E6: 85 41     STA ram_0041
C - - - - - 0x03E4F8 0F:E4E8: A9 0A     LDA #$0A
C - - - - - 0x03E4FA 0F:E4EA: 85 42     STA ram_0042
C - - - - - 0x03E4FC 0F:E4EC: A5 41     LDA ram_0041
C - - - - - 0x03E4FE 0F:E4EE: 20 7C CD  JSR $CD7C
C - - - - - 0x03E501 0F:E4F1: A0 0A     LDY #$0A
C - - - - - 0x03E503 0F:E4F3: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E505 0F:E4F5: D0 03     BNE $E4FA
C - - - - - 0x03E507 0F:E4F7: 20 01 E5  JSR $E501
C - - - - - 0x03E50A 0F:E4FA: E6 41     INC ram_0041
C - - - - - 0x03E50C 0F:E4FC: C6 42     DEC ram_0042
C - - - - - 0x03E50E 0F:E4FE: D0 EC     BNE $E4EC
C - - - - - 0x03E510 0F:E500: 60        RTS
C - - - - - 0x03E511 0F:E501: A9 00     LDA #$00
C - - - - - 0x03E513 0F:E503: 85 44     STA ram_0044
C - - - - - 0x03E515 0F:E505: A0 06     LDY #$06
C - - - - - 0x03E517 0F:E507: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E519 0F:E509: 38        SEC
C - - - - - 0x03E51A 0F:E50A: ED 35 06  SBC ram_0635
C - - - - - 0x03E51D 0F:E50D: B0 04     BCS $E513
C - - - - - 0x03E51F 0F:E50F: 49 FF     EOR #$FF
C - - - - - 0x03E521 0F:E511: 69 01     ADC #$01
C - - - - - 0x03E523 0F:E513: C5 43     CMP ram_0043
C - - - - - 0x03E525 0F:E515: B0 02     BCS $E519
C - - - - - 0x03E527 0F:E517: E6 44     INC ram_0044
C - - - - - 0x03E529 0F:E519: A0 08     LDY #$08
C - - - - - 0x03E52B 0F:E51B: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E52D 0F:E51D: 38        SEC
C - - - - - 0x03E52E 0F:E51E: ED 37 06  SBC ram_0637
C - - - - - 0x03E531 0F:E521: B0 04     BCS $E527
C - - - - - 0x03E533 0F:E523: 49 FF     EOR #$FF
C - - - - - 0x03E535 0F:E525: 69 01     ADC #$01
C - - - - - 0x03E537 0F:E527: C5 43     CMP ram_0043
C - - - - - 0x03E539 0F:E529: B0 02     BCS $E52D
C - - - - - 0x03E53B 0F:E52B: E6 44     INC ram_0044
C - - - - - 0x03E53D 0F:E52D: A5 44     LDA ram_0044
C - - - - - 0x03E53F 0F:E52F: C9 02     CMP #$02
C - - - - - 0x03E541 0F:E531: D0 18     BNE $E54B
C - - - - - 0x03E543 0F:E533: AE 00 06  LDX ram_0600
C - - - - - 0x03E546 0F:E536: E0 05     CPX #$05
C - - - - - 0x03E548 0F:E538: B0 11     BCS $E54B
C - - - - - 0x03E54A 0F:E53A: AD FB 05  LDA ram_05FB
C - - - - - 0x03E54D 0F:E53D: F0 04     BEQ $E543
C - - - - - 0x03E54F 0F:E53F: E0 04     CPX #$04
C - - - - - 0x03E551 0F:E541: B0 08     BCS $E54B
C - - - - - 0x03E553 0F:E543: A5 41     LDA ram_0041
C - - - - - 0x03E555 0F:E545: 9D 01 06  STA ram_0601,X
C - - - - - 0x03E558 0F:E548: EE 00 06  INC ram_0600
C - - - - - 0x03E55B 0F:E54B: 60        RTS
C D 3 - - - 0x03E55C 0F:E54C: A9 00     LDA #$00
C - - - - - 0x03E55E 0F:E54E: 8D 4E 04  STA ram_044E
C - - - - - 0x03E561 0F:E551: AD 00 06  LDA ram_0600
C - - - - - 0x03E564 0F:E554: F0 3A     BEQ $E590
C - - - - - 0x03E566 0F:E556: A2 00     LDX #$00
C - - - - - 0x03E568 0F:E558: A0 00     LDY #$00
C - - - - - 0x03E56A 0F:E55A: BD 0B 06  LDA ram_060B,X
C - - - - - 0x03E56D 0F:E55D: C9 05     CMP #$05
C - - - - - 0x03E56F 0F:E55F: D0 0D     BNE $E56E
C - - - - - 0x03E571 0F:E561: BD 01 06  LDA ram_0601,X
C - - - - - 0x03E574 0F:E564: F0 08     BEQ $E56E
C - - - - - 0x03E576 0F:E566: C9 0B     CMP #$0B
C - - - - - 0x03E578 0F:E568: F0 04     BEQ $E56E
C - - - - - 0x03E57A 0F:E56A: 99 01 06  STA ram_0601,Y
C - - - - - 0x03E57D 0F:E56D: C8        INY
C - - - - - 0x03E57E 0F:E56E: E8        INX
C - - - - - 0x03E57F 0F:E56F: EC 00 06  CPX ram_0600
C - - - - - 0x03E582 0F:E572: D0 E6     BNE $E55A
C - - - - - 0x03E584 0F:E574: 98        TYA
C - - - - - 0x03E585 0F:E575: F0 19     BEQ $E590
C - - - - - 0x03E587 0F:E577: 8C 00 06  STY ram_0600
C - - - - - 0x03E58A 0F:E57A: A9 2E     LDA #$2E
C - - - - - 0x03E58C 0F:E57C: 20 B0 CB  JSR $CBB0
C - - - - - 0x03E58F 0F:E57F: A9 1A     LDA #$1A
C - - - - - 0x03E591 0F:E581: 85 24     STA ram_0024
C - - - - - 0x03E593 0F:E583: A9 1B     LDA #$1B
C - - - - - 0x03E595 0F:E585: 85 25     STA ram_0025
C - - - - - 0x03E597 0F:E587: 20 2D CE  JSR $CE2D
C - - - - - 0x03E59A 0F:E58A: A2 50     LDX #$50
C - - - - - 0x03E59C 0F:E58C: 9A        TXS
C - - - - - 0x03E59D 0F:E58D: 4C 03 80  JMP $8003
C - - - - - 0x03E5A0 0F:E590: A2 50     LDX #$50
C - - - - - 0x03E5A2 0F:E592: 9A        TXS
C - - - - - 0x03E5A3 0F:E593: 4C DF E0  JMP $E0DF
C D 3 - - - 0x03E5A6 0F:E596: AD E2 00  LDA a: ram_00E2
C - - - - - 0x03E5A9 0F:E599: C9 E0     CMP #$E0
C - - - - - 0x03E5AB 0F:E59B: B0 1D     BCS $E5BA
C - - - - - 0x03E5AD 0F:E59D: 20 77 CD  JSR $CD77
C - - - - - 0x03E5B0 0F:E5A0: A0 07     LDY #$07
C - - - - - 0x03E5B2 0F:E5A2: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E5B4 0F:E5A4: 18        CLC
C - - - - - 0x03E5B5 0F:E5A5: 69 1A     ADC #$1A
C - - - - - 0x03E5B7 0F:E5A7: C9 80     CMP #$80
C - - - - - 0x03E5B9 0F:E5A9: 90 02     BCC $E5AD
C - - - - - 0x03E5BB 0F:E5AB: A9 7F     LDA #$7F
C - - - - - 0x03E5BD 0F:E5AD: 91 34     STA (ram_0034),Y
C - - - - - 0x03E5BF 0F:E5AF: A0 06     LDY #$06
C - - - - - 0x03E5C1 0F:E5B1: A9 04     LDA #$04
C - - - - - 0x03E5C3 0F:E5B3: 91 34     STA (ram_0034),Y
C - - - - - 0x03E5C5 0F:E5B5: A9 42     LDA #$42
C - - - - - 0x03E5C7 0F:E5B7: 20 B0 CB  JSR $CBB0
C - - - - - 0x03E5CA 0F:E5BA: 48        PHA
C - - - - - 0x03E5CB 0F:E5BB: A5 22     LDA ram_0022
C - - - - - 0x03E5CD 0F:E5BD: A9 14     LDA #$14
C - - - - - 0x03E5CF 0F:E5BF: 85 24     STA ram_0024
C - - - - - 0x03E5D1 0F:E5C1: A9 15     LDA #$15
C - - - - - 0x03E5D3 0F:E5C3: 85 25     STA ram_0025
C - - - - - 0x03E5D5 0F:E5C5: 20 2D CE  JSR $CE2D
C - - - - - 0x03E5D8 0F:E5C8: 68        PLA
C - - - - - 0x03E5D9 0F:E5C9: 20 0C 80  JSR $800C
C - - - - - 0x03E5DC 0F:E5CC: A9 01     LDA #$01
C - - - - - 0x03E5DE 0F:E5CE: 48        PHA
C - - - - - 0x03E5DF 0F:E5CF: A5 22     LDA ram_0022
C - - - - - 0x03E5E1 0F:E5D1: A9 1A     LDA #$1A
C - - - - - 0x03E5E3 0F:E5D3: 85 24     STA ram_0024
C - - - - - 0x03E5E5 0F:E5D5: A9 1B     LDA #$1B
C - - - - - 0x03E5E7 0F:E5D7: 85 25     STA ram_0025
C - - - - - 0x03E5E9 0F:E5D9: 20 2D CE  JSR $CE2D
C - - - - - 0x03E5EC 0F:E5DC: 68        PLA
C - - - - - 0x03E5ED 0F:E5DD: 20 24 80  JSR $8024
C - - - - - 0x03E5F0 0F:E5E0: AE 35 06  LDX ram_0635
C - - - - - 0x03E5F3 0F:E5E3: AC 37 06  LDY ram_0637
C - - - - - 0x03E5F6 0F:E5E6: 20 E2 CD  JSR $CDE2
C - - - - - 0x03E5F9 0F:E5E9: 8D FE 05  STA ram_05FE
C - - - - - 0x03E5FC 0F:E5EC: AD 00 06  LDA ram_0600
C - - - - - 0x03E5FF 0F:E5EF: F0 1D     BEQ $E60E
C - - - - - 0x03E601 0F:E5F1: A9 00     LDA #$00
C - - - - - 0x03E603 0F:E5F3: 8D 16 06  STA ram_0616
C - - - - - 0x03E606 0F:E5F6: AE 16 06  LDX ram_0616
C - - - - - 0x03E609 0F:E5F9: BD 0B 06  LDA ram_060B,X
C - - - - - 0x03E60C 0F:E5FC: C9 05     CMP #$05
C - - - - - 0x03E60E 0F:E5FE: D0 03     BNE $E603
C - - - - - 0x03E610 0F:E600: 20 16 E6  JSR $E616
C - - - - - 0x03E613 0F:E603: EE 16 06  INC ram_0616
C - - - - - 0x03E616 0F:E606: AD 16 06  LDA ram_0616
C - - - - - 0x03E619 0F:E609: CD 00 06  CMP ram_0600
C - - - - - 0x03E61C 0F:E60C: D0 E8     BNE $E5F6
C - - - - - 0x03E61E 0F:E60E: A9 04     LDA #$04
C - - - - - 0x03E620 0F:E610: 8D 2B 06  STA ram_062B
C - - - - - 0x03E623 0F:E613: 4C 96 DE  JMP $DE96
C - - - - - 0x03E626 0F:E616: A9 01     LDA #$01
C - - - - - 0x03E628 0F:E618: 8D 3B 04  STA ram_043B
C - - - - - 0x03E62B 0F:E61B: A9 00     LDA #$00
C - - - - - 0x03E62D 0F:E61D: 8D 3C 04  STA ram_043C
C - - - - - 0x03E630 0F:E620: A9 02     LDA #$02
C - - - - - 0x03E632 0F:E622: 8D 3D 04  STA ram_043D
C - - - - - 0x03E635 0F:E625: A9 00     LDA #$00
C - - - - - 0x03E637 0F:E627: 8D 3E 04  STA ram_043E
C - - - - - 0x03E63A 0F:E62A: BD 01 06  LDA ram_0601,X
C - - - - - 0x03E63D 0F:E62D: F0 48     BEQ $E677
C - - - - - 0x03E63F 0F:E62F: C9 0B     CMP #$0B
C - - - - - 0x03E641 0F:E631: F0 44     BEQ $E677
C - - - - - 0x03E643 0F:E633: 8D 42 04  STA ram_0442
C - - - - - 0x03E646 0F:E636: 48        PHA
C - - - - - 0x03E647 0F:E637: A5 22     LDA ram_0022
C - - - - - 0x03E649 0F:E639: A9 1C     LDA #$1C
C - - - - - 0x03E64B 0F:E63B: 85 24     STA ram_0024
C - - - - - 0x03E64D 0F:E63D: A9 1D     LDA #$1D
C - - - - - 0x03E64F 0F:E63F: 85 25     STA ram_0025
C - - - - - 0x03E651 0F:E641: 20 2D CE  JSR $CE2D
C - - - - - 0x03E654 0F:E644: 68        PLA
C - - - - - 0x03E655 0F:E645: 20 15 80  JSR $8015
C - - - - - 0x03E658 0F:E648: A5 32     LDA ram_0032
C - - - - - 0x03E65A 0F:E64A: 18        CLC
C - - - - - 0x03E65B 0F:E64B: 69 04     ADC #$04
C - - - - - 0x03E65D 0F:E64D: 90 02     BCC $E651
- - - - - - 0x03E65F 0F:E64F: A9        .byte $A9   ; 
- - - - - - 0x03E660 0F:E650: FF        .byte $FF   ; 
C - - - - - 0x03E661 0F:E651: 85 32     STA ram_0032
C - - - - - 0x03E663 0F:E653: 48        PHA
C - - - - - 0x03E664 0F:E654: A5 22     LDA ram_0022
C - - - - - 0x03E666 0F:E656: A9 1A     LDA #$1A
C - - - - - 0x03E668 0F:E658: 85 24     STA ram_0024
C - - - - - 0x03E66A 0F:E65A: A9 1B     LDA #$1B
C - - - - - 0x03E66C 0F:E65C: 85 25     STA ram_0025
C - - - - - 0x03E66E 0F:E65E: 20 2D CE  JSR $CE2D
C - - - - - 0x03E671 0F:E661: 68        PLA
C - - - - - 0x03E672 0F:E662: 20 12 80  JSR $8012
C - - - - - 0x03E675 0F:E665: 48        PHA
C - - - - - 0x03E676 0F:E666: A5 22     LDA ram_0022
C - - - - - 0x03E678 0F:E668: A9 1A     LDA #$1A
C - - - - - 0x03E67A 0F:E66A: 85 24     STA ram_0024
C - - - - - 0x03E67C 0F:E66C: A9 1B     LDA #$1B
C - - - - - 0x03E67E 0F:E66E: 85 25     STA ram_0025
C - - - - - 0x03E680 0F:E670: 20 2D CE  JSR $CE2D
C - - - - - 0x03E683 0F:E673: 68        PLA
C - - - - - 0x03E684 0F:E674: 20 15 80  JSR $8015
C - - - - - 0x03E687 0F:E677: 60        RTS
C D 3 - - - 0x03E688 0F:E678: AD FB 05  LDA ram_05FB
C - - - - - 0x03E68B 0F:E67B: 49 0B     EOR #$0B
C - - - - - 0x03E68D 0F:E67D: 8D FB 05  STA ram_05FB
C - - - - - 0x03E690 0F:E680: 20 93 D0  JSR $D093
C - - - - - 0x03E693 0F:E683: A9 02     LDA #$02
C - - - - - 0x03E695 0F:E685: 20 0F CB  JSR $CB0F
C D 3 - - - 0x03E698 0F:E688: A9 00     LDA #$00
C - - - - - 0x03E69A 0F:E68A: 2C 35 06  BIT ram_0635
C - - - - - 0x03E69D 0F:E68D: 10 02     BPL $E691
C - - - - - 0x03E69F 0F:E68F: 09 01     ORA #$01
C - - - - - 0x03E6A1 0F:E691: 2C 37 06  BIT ram_0637
C - - - - - 0x03E6A4 0F:E694: 10 02     BPL $E698
C - - - - - 0x03E6A6 0F:E696: 09 02     ORA #$02
C - - - - - 0x03E6A8 0F:E698: 85 3A     STA ram_003A
C - - - - - 0x03E6AA 0F:E69A: AD E2 00  LDA a: ram_00E2
C - - - - - 0x03E6AD 0F:E69D: 29 07     AND #$07
C - - - - - 0x03E6AF 0F:E69F: 0A        ASL
C - - - - - 0x03E6B0 0F:E6A0: AA        TAX
C - - - - - 0x03E6B1 0F:E6A1: BC D0 E6  LDY $E6D0,X
C - - - - - 0x03E6B4 0F:E6A4: BD CF E6  LDA $E6CF,X
C - - - - - 0x03E6B7 0F:E6A7: AA        TAX
C - - - - - 0x03E6B8 0F:E6A8: 46 3A     LSR ram_003A
C - - - - - 0x03E6BA 0F:E6AA: 90 04     BCC $E6B0
C - - - - - 0x03E6BC 0F:E6AC: 8A        TXA
C - - - - - 0x03E6BD 0F:E6AD: 49 FF     EOR #$FF
C - - - - - 0x03E6BF 0F:E6AF: AA        TAX
C - - - - - 0x03E6C0 0F:E6B0: 46 3A     LSR ram_003A
C - - - - - 0x03E6C2 0F:E6B2: 90 04     BCC $E6B8
C - - - - - 0x03E6C4 0F:E6B4: 98        TYA
C - - - - - 0x03E6C5 0F:E6B5: 49 FF     EOR #$FF
C - - - - - 0x03E6C7 0F:E6B7: A8        TAY
C - - - - - 0x03E6C8 0F:E6B8: 8E 35 06  STX ram_0635
C - - - - - 0x03E6CB 0F:E6BB: 8C 37 06  STY ram_0637
C - - - - - 0x03E6CE 0F:E6BE: 20 E2 CD  JSR $CDE2
C - - - - - 0x03E6D1 0F:E6C1: 8D 38 06  STA ram_0638
C - - - - - 0x03E6D4 0F:E6C4: 8D FE 05  STA ram_05FE
C - - - - - 0x03E6D7 0F:E6C7: A9 04     LDA #$04
C - - - - - 0x03E6D9 0F:E6C9: 8D 2B 06  STA ram_062B
C - - - - - 0x03E6DC 0F:E6CC: 4C 96 DE  JMP $DE96
- D 3 - - - 0x03E6DF 0F:E6CF: 4C        .byte $4C   ; <L>
- D 3 - - - 0x03E6E0 0F:E6D0: 54        .byte $54   ; <T>
- D 3 - - - 0x03E6E1 0F:E6D1: 5C        .byte $5C   ; 
- D 3 - - - 0x03E6E2 0F:E6D2: 54        .byte $54   ; <T>
- D 3 - - - 0x03E6E3 0F:E6D3: 6C        .byte $6C   ; <l>
- D 3 - - - 0x03E6E4 0F:E6D4: 5C        .byte $5C   ; 
- D 3 - - - 0x03E6E5 0F:E6D5: 5C        .byte $5C   ; 
- D 3 - - - 0x03E6E6 0F:E6D6: 64        .byte $64   ; <d>
- D 3 - - - 0x03E6E7 0F:E6D7: 74        .byte $74   ; <t>
- D 3 - - - 0x03E6E8 0F:E6D8: 6C        .byte $6C   ; <l>
- D 3 - - - 0x03E6E9 0F:E6D9: 64        .byte $64   ; <d>
- D 3 - - - 0x03E6EA 0F:E6DA: 74        .byte $74   ; <t>
- D 3 - - - 0x03E6EB 0F:E6DB: 7C        .byte $7C   ; 
- D 3 - - - 0x03E6EC 0F:E6DC: 7C        .byte $7C   ; 
- D 3 - - - 0x03E6ED 0F:E6DD: 74        .byte $74   ; <t>
- D 3 - - - 0x03E6EE 0F:E6DE: 8C        .byte $8C   ; 
- - - - - - 0x03E6EF 0F:E6DF: AE        .byte $AE   ; 
- - - - - - 0x03E6F0 0F:E6E0: 35        .byte $35   ; <5>
- - - - - - 0x03E6F1 0F:E6E1: 06        .byte $06   ; 
- - - - - - 0x03E6F2 0F:E6E2: AC        .byte $AC   ; 
- - - - - - 0x03E6F3 0F:E6E3: 37        .byte $37   ; <7>
- - - - - - 0x03E6F4 0F:E6E4: 06        .byte $06   ; 
- - - - - - 0x03E6F5 0F:E6E5: 20        .byte $20   ; 
- - - - - - 0x03E6F6 0F:E6E6: E2        .byte $E2   ; 
- - - - - - 0x03E6F7 0F:E6E7: CD        .byte $CD   ; 
- - - - - - 0x03E6F8 0F:E6E8: 8D        .byte $8D   ; 
- - - - - - 0x03E6F9 0F:E6E9: FE        .byte $FE   ; 
- - - - - - 0x03E6FA 0F:E6EA: 05        .byte $05   ; 
- - - - - - 0x03E6FB 0F:E6EB: 60        .byte $60   ; 
C D 3 - - - 0x03E6FC 0F:E6EC: AD 41 04  LDA ram_0441
C - - - - - 0x03E6FF 0F:E6EF: 20 7C CD  JSR $CD7C
C - - - - - 0x03E702 0F:E6F2: A0 06     LDY #$06
C - - - - - 0x03E704 0F:E6F4: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E706 0F:E6F6: 8D 35 06  STA ram_0635
C - - - - - 0x03E709 0F:E6F9: AA        TAX
C - - - - - 0x03E70A 0F:E6FA: A0 08     LDY #$08
C - - - - - 0x03E70C 0F:E6FC: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E70E 0F:E6FE: 8D 37 06  STA ram_0637
C - - - - - 0x03E711 0F:E701: A8        TAY
C - - - - - 0x03E712 0F:E702: 20 E2 CD  JSR $CDE2
C - - - - - 0x03E715 0F:E705: 8D FE 05  STA ram_05FE
C - - - - - 0x03E718 0F:E708: 60        RTS
C - - - - - 0x03E719 0F:E709: AD 2A 06  LDA ram_062A
C - - - - - 0x03E71C 0F:E70C: 29 7F     AND #$7F
C - - - - - 0x03E71E 0F:E70E: 8D 2A 06  STA ram_062A
C - - - - - 0x03E721 0F:E711: AD 37 06  LDA ram_0637
C - - - - - 0x03E724 0F:E714: 38        SEC
C - - - - - 0x03E725 0F:E715: E9 50     SBC #$50
C - - - - - 0x03E727 0F:E717: 29 E0     AND #$E0
C - - - - - 0x03E729 0F:E719: 4A        LSR
C - - - - - 0x03E72A 0F:E71A: 4A        LSR
C - - - - - 0x03E72B 0F:E71B: 4A        LSR
C - - - - - 0x03E72C 0F:E71C: 85 3A     STA ram_003A
C - - - - - 0x03E72E 0F:E71E: 4A        LSR
C - - - - - 0x03E72F 0F:E71F: 4A        LSR
C - - - - - 0x03E730 0F:E720: 65 3A     ADC ram_003A
C - - - - - 0x03E732 0F:E722: 85 3A     STA ram_003A
C - - - - - 0x03E734 0F:E724: AD 35 06  LDA ram_0635
C - - - - - 0x03E737 0F:E727: 38        SEC
C - - - - - 0x03E738 0F:E728: E9 30     SBC #$30
C - - - - - 0x03E73A 0F:E72A: 29 E0     AND #$E0
C - - - - - 0x03E73C 0F:E72C: 4A        LSR
C - - - - - 0x03E73D 0F:E72D: 4A        LSR
C - - - - - 0x03E73E 0F:E72E: 4A        LSR
C - - - - - 0x03E73F 0F:E72F: 4A        LSR
C - - - - - 0x03E740 0F:E730: 4A        LSR
C - - - - - 0x03E741 0F:E731: 65 3A     ADC ram_003A
C - - - - - 0x03E743 0F:E733: CD 2A 06  CMP ram_062A
C - - - - - 0x03E746 0F:E736: F0 05     BEQ $E73D
C - - - - - 0x03E748 0F:E738: 09 80     ORA #$80
C - - - - - 0x03E74A 0F:E73A: 8D 2A 06  STA ram_062A
C - - - - - 0x03E74D 0F:E73D: 60        RTS
C D 3 - - - 0x03E74E 0F:E73E: A9 00     LDA #$00
C - - - - - 0x03E750 0F:E740: 8D 00 06  STA ram_0600
C - - - - - 0x03E753 0F:E743: 8D FF 05  STA ram_05FF
C - - - - - 0x03E756 0F:E746: AD FE 05  LDA ram_05FE
C - - - - - 0x03E759 0F:E749: CD 38 06  CMP ram_0638
C - - - - - 0x03E75C 0F:E74C: D0 03     BNE $E751
C - - - - - 0x03E75E 0F:E74E: 4C CF E7  JMP $E7CF
C - - - - - 0x03E761 0F:E751: A9 2F     LDA #$2F
C - - - - - 0x03E763 0F:E753: 85 34     STA ram_0034
C - - - - - 0x03E765 0F:E755: A9 06     LDA #$06
C - - - - - 0x03E767 0F:E757: 85 35     STA ram_0035
C - - - - - 0x03E769 0F:E759: 20 D0 E7  JSR $E7D0
C - - - - - 0x03E76C 0F:E75C: 8D 2C 06  STA ram_062C
C - - - - - 0x03E76F 0F:E75F: 48        PHA
C - - - - - 0x03E770 0F:E760: 20 4A CE  JSR $CE4A
C - - - - - 0x03E773 0F:E763: 8E 39 06  STX ram_0639
C - - - - - 0x03E776 0F:E766: 8C 3A 06  STY ram_063A
C - - - - - 0x03E779 0F:E769: 68        PLA
C - - - - - 0x03E77A 0F:E76A: 20 4D CE  JSR $CE4D
C - - - - - 0x03E77D 0F:E76D: 8E 3B 06  STX ram_063B
C - - - - - 0x03E780 0F:E770: 8C 3C 06  STY ram_063C
C D 3 - - - 0x03E783 0F:E773: A9 01     LDA #$01
C - - - - - 0x03E785 0F:E775: 20 0F CB  JSR $CB0F
C - - - - - 0x03E788 0F:E778: AD 39 06  LDA ram_0639
C - - - - - 0x03E78B 0F:E77B: 18        CLC
C - - - - - 0x03E78C 0F:E77C: 6D 34 06  ADC ram_0634
C - - - - - 0x03E78F 0F:E77F: 8D 34 06  STA ram_0634
C - - - - - 0x03E792 0F:E782: AD 3A 06  LDA ram_063A
C - - - - - 0x03E795 0F:E785: 6D 35 06  ADC ram_0635
C - - - - - 0x03E798 0F:E788: 8D 35 06  STA ram_0635
C - - - - - 0x03E79B 0F:E78B: AA        TAX
C - - - - - 0x03E79C 0F:E78C: AD 3B 06  LDA ram_063B
C - - - - - 0x03E79F 0F:E78F: 18        CLC
C - - - - - 0x03E7A0 0F:E790: 6D 36 06  ADC ram_0636
C - - - - - 0x03E7A3 0F:E793: 8D 36 06  STA ram_0636
C - - - - - 0x03E7A6 0F:E796: AD 3C 06  LDA ram_063C
C - - - - - 0x03E7A9 0F:E799: 6D 37 06  ADC ram_0637
C - - - - - 0x03E7AC 0F:E79C: 8D 37 06  STA ram_0637
C - - - - - 0x03E7AF 0F:E79F: A8        TAY
C - - - - - 0x03E7B0 0F:E7A0: 20 E2 CD  JSR $CDE2
C - - - - - 0x03E7B3 0F:E7A3: C9 FF     CMP #$FF
C - - - - - 0x03E7B5 0F:E7A5: F0 13     BEQ $E7BA
C - - - - - 0x03E7B7 0F:E7A7: CD FE 05  CMP ram_05FE
C - - - - - 0x03E7BA 0F:E7AA: F0 CC     BEQ $E778
C - - - - - 0x03E7BC 0F:E7AC: 8D FE 05  STA ram_05FE
C - - - - - 0x03E7BF 0F:E7AF: CD 38 06  CMP ram_0638
C - - - - - 0x03E7C2 0F:E7B2: F0 0C     BEQ $E7C0
C - - - - - 0x03E7C4 0F:E7B4: 20 0F 80  JSR $800F
C - - - - - 0x03E7C7 0F:E7B7: 4C 73 E7  JMP $E773
C - - - - - 0x03E7CA 0F:E7BA: AD 38 06  LDA ram_0638
C - - - - - 0x03E7CD 0F:E7BD: 8D FE 05  STA ram_05FE
C - - - - - 0x03E7D0 0F:E7C0: AD FE 05  LDA ram_05FE
C - - - - - 0x03E7D3 0F:E7C3: 20 C9 CD  JSR $CDC9
C - - - - - 0x03E7D6 0F:E7C6: 8E 35 06  STX ram_0635
C - - - - - 0x03E7D9 0F:E7C9: 8C 37 06  STY ram_0637
C - - - - - 0x03E7DC 0F:E7CC: 20 0C 80  JSR $800C
C D 3 - - - 0x03E7DF 0F:E7CF: 60        RTS
C - - - - - 0x03E7E0 0F:E7D0: A0 06     LDY #$06
C - - - - - 0x03E7E2 0F:E7D2: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E7E4 0F:E7D4: AA        TAX
C - - - - - 0x03E7E5 0F:E7D5: A0 08     LDY #$08
C - - - - - 0x03E7E7 0F:E7D7: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E7E9 0F:E7D9: A8        TAY
C - - - - - 0x03E7EA 0F:E7DA: 20 E2 CD  JSR $CDE2
C - - - - - 0x03E7ED 0F:E7DD: A0 09     LDY #$09
C - - - - - 0x03E7EF 0F:E7DF: D1 34     CMP (ram_0034),Y
C - - - - - 0x03E7F1 0F:E7E1: D0 01     BNE $E7E4
C - - - - - 0x03E7F3 0F:E7E3: 60        RTS
C - - - - - 0x03E7F4 0F:E7E4: A0 09     LDY #$09
C - - - - - 0x03E7F6 0F:E7E6: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E7F8 0F:E7E8: C9 F0     CMP #$F0
C - - - - - 0x03E7FA 0F:E7EA: D0 03     BNE $E7EF
C - - - - - 0x03E7FC 0F:E7EC: AD FE 05  LDA ram_05FE
C - - - - - 0x03E7FF 0F:E7EF: 20 C9 CD  JSR $CDC9
C - - - - - 0x03E802 0F:E7F2: 8A        TXA
C - - - - - 0x03E803 0F:E7F3: 85 3A     STA ram_003A
C - - - - - 0x03E805 0F:E7F5: 98        TYA
C - - - - - 0x03E806 0F:E7F6: 85 3B     STA ram_003B
C - - - - - 0x03E808 0F:E7F8: A9 00     LDA #$00
C - - - - - 0x03E80A 0F:E7FA: 85 3C     STA ram_003C
C - - - - - 0x03E80C 0F:E7FC: A0 06     LDY #$06
C - - - - - 0x03E80E 0F:E7FE: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E810 0F:E800: 38        SEC
C - - - - - 0x03E811 0F:E801: E5 3A     SBC ram_003A
C - - - - - 0x03E813 0F:E803: B0 06     BCS $E80B
C - - - - - 0x03E815 0F:E805: 49 FF     EOR #$FF
C - - - - - 0x03E817 0F:E807: 69 01     ADC #$01
C - - - - - 0x03E819 0F:E809: E6 3C     INC ram_003C
C - - - - - 0x03E81B 0F:E80B: 85 71     STA ram_0071
C - - - - - 0x03E81D 0F:E80D: A0 08     LDY #$08
C - - - - - 0x03E81F 0F:E80F: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E821 0F:E811: 38        SEC
C - - - - - 0x03E822 0F:E812: E5 3B     SBC ram_003B
C - - - - - 0x03E824 0F:E814: B0 08     BCS $E81E
C - - - - - 0x03E826 0F:E816: 49 FF     EOR #$FF
C - - - - - 0x03E828 0F:E818: 69 01     ADC #$01
C - - - - - 0x03E82A 0F:E81A: E6 3C     INC ram_003C
C - - - - - 0x03E82C 0F:E81C: E6 3C     INC ram_003C
C - - - - - 0x03E82E 0F:E81E: 85 70     STA ram_0070
C - - - - - 0x03E830 0F:E820: A9 00     LDA #$00
C - - - - - 0x03E832 0F:E822: 85 6F     STA ram_006F
C - - - - - 0x03E834 0F:E824: 85 74     STA ram_0074
C - - - - - 0x03E836 0F:E826: 20 3C CD  JSR $CD3C
C - - - - - 0x03E839 0F:E829: A2 00     LDX #$00
C - - - - - 0x03E83B 0F:E82B: BD CD FA  LDA $FACD,X
C - - - - - 0x03E83E 0F:E82E: C5 70     CMP ram_0070
C - - - - - 0x03E840 0F:E830: F0 04     BEQ $E836
C - - - - - 0x03E842 0F:E832: B0 0F     BCS $E843
C - - - - - 0x03E844 0F:E834: 90 09     BCC $E83F
C - - - - - 0x03E846 0F:E836: BD CC FA  LDA $FACC,X
C - - - - - 0x03E849 0F:E839: E5 6F     SBC ram_006F
C - - - - - 0x03E84B 0F:E83B: F0 06     BEQ $E843
C - - - - - 0x03E84D 0F:E83D: B0 04     BCS $E843
C - - - - - 0x03E84F 0F:E83F: E8        INX
C - - - - - 0x03E850 0F:E840: E8        INX
C - - - - - 0x03E851 0F:E841: D0 E8     BNE $E82B
C - - - - - 0x03E853 0F:E843: 8A        TXA
C - - - - - 0x03E854 0F:E844: 4A        LSR
C - - - - - 0x03E855 0F:E845: 46 3C     LSR ram_003C
C - - - - - 0x03E857 0F:E847: B0 04     BCS $E84D
C - - - - - 0x03E859 0F:E849: 49 FF     EOR #$FF
C - - - - - 0x03E85B 0F:E84B: 29 7F     AND #$7F
C - - - - - 0x03E85D 0F:E84D: 46 3C     LSR ram_003C
C - - - - - 0x03E85F 0F:E84F: B0 02     BCS $E853
C - - - - - 0x03E861 0F:E851: 49 FF     EOR #$FF
C - - - - - 0x03E863 0F:E853: 60        RTS
C - - - - - 0x03E864 0F:E854: A0 0A     LDY #$0A
C - - - - - 0x03E866 0F:E856: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E868 0F:E858: D0 45     BNE $E89F
C - - - - - 0x03E86A 0F:E85A: AD FF 05  LDA ram_05FF
C - - - - - 0x03E86D 0F:E85D: 85 43     STA ram_0043
C - - - - - 0x03E86F 0F:E85F: 20 D0 E7  JSR $E7D0
C - - - - - 0x03E872 0F:E862: 85 44     STA ram_0044
C - - - - - 0x03E874 0F:E864: A0 06     LDY #$06
C - - - - - 0x03E876 0F:E866: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E878 0F:E868: AA        TAX
C - - - - - 0x03E879 0F:E869: A0 08     LDY #$08
C - - - - - 0x03E87B 0F:E86B: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E87D 0F:E86D: A8        TAY
C - - - - - 0x03E87E 0F:E86E: 20 E2 CD  JSR $CDE2
C - - - - - 0x03E881 0F:E871: A0 09     LDY #$09
C - - - - - 0x03E883 0F:E873: D1 34     CMP (ram_0034),Y
C - - - - - 0x03E885 0F:E875: F0 21     BEQ $E898
C - - - - - 0x03E887 0F:E877: AA        TAX
C - - - - - 0x03E888 0F:E878: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E88A 0F:E87A: C9 F0     CMP #$F0
C - - - - - 0x03E88C 0F:E87C: D0 05     BNE $E883
C - - - - - 0x03E88E 0F:E87E: EC FE 05  CPX ram_05FE
C - - - - - 0x03E891 0F:E881: F0 15     BEQ $E898
C - - - - - 0x03E893 0F:E883: A0 07     LDY #$07
C - - - - - 0x03E895 0F:E885: A5 44     LDA ram_0044
C - - - - - 0x03E897 0F:E887: 20 A0 E8  JSR $E8A0
C - - - - - 0x03E89A 0F:E88A: A5 44     LDA ram_0044
C - - - - - 0x03E89C 0F:E88C: 18        CLC
C - - - - - 0x03E89D 0F:E88D: 69 40     ADC #$40
C - - - - - 0x03E89F 0F:E88F: A0 05     LDY #$05
C - - - - - 0x03E8A1 0F:E891: 20 A0 E8  JSR $E8A0
C - - - - - 0x03E8A4 0F:E894: C6 43     DEC ram_0043
C - - - - - 0x03E8A6 0F:E896: D0 CC     BNE $E864
C - - - - - 0x03E8A8 0F:E898: A0 0A     LDY #$0A
C - - - - - 0x03E8AA 0F:E89A: A9 00     LDA #$00
C - - - - - 0x03E8AC 0F:E89C: 91 34     STA (ram_0034),Y
C - - - - - 0x03E8AE 0F:E89E: 60        RTS
C - - - - - 0x03E8AF 0F:E89F: 60        RTS
C - - - - - 0x03E8B0 0F:E8A0: 84 46     STY ram_0046
C - - - - - 0x03E8B2 0F:E8A2: 18        CLC
C - - - - - 0x03E8B3 0F:E8A3: 69 10     ADC #$10
C - - - - - 0x03E8B5 0F:E8A5: 4A        LSR
C - - - - - 0x03E8B6 0F:E8A6: 4A        LSR
C - - - - - 0x03E8B7 0F:E8A7: 4A        LSR
C - - - - - 0x03E8B8 0F:E8A8: 4A        LSR
C - - - - - 0x03E8B9 0F:E8A9: 4A        LSR
C - - - - - 0x03E8BA 0F:E8AA: AA        TAX
C - - - - - 0x03E8BB 0F:E8AB: BD ED E8  LDA $E8ED,X
C - - - - - 0x03E8BE 0F:E8AE: 85 47     STA ram_0047
C - - - - - 0x03E8C0 0F:E8B0: A4 32     LDY ram_0032
C - - - - - 0x03E8C2 0F:E8B2: A6 33     LDX ram_0033
C - - - - - 0x03E8C4 0F:E8B4: C6 47     DEC ram_0047
C - - - - - 0x03E8C6 0F:E8B6: 10 06     BPL $E8BE
C - - - - - 0x03E8C8 0F:E8B8: A2 00     LDX #$00
C - - - - - 0x03E8CA 0F:E8BA: A0 00     LDY #$00
C - - - - - 0x03E8CC 0F:E8BC: F0 10     BEQ $E8CE
C - - - - - 0x03E8CE 0F:E8BE: C6 47     DEC ram_0047
C - - - - - 0x03E8D0 0F:E8C0: 30 0C     BMI $E8CE
C - - - - - 0x03E8D2 0F:E8C2: 98        TYA
C - - - - - 0x03E8D3 0F:E8C3: 49 FF     EOR #$FF
C - - - - - 0x03E8D5 0F:E8C5: A8        TAY
C - - - - - 0x03E8D6 0F:E8C6: 8A        TXA
C - - - - - 0x03E8D7 0F:E8C7: 49 FF     EOR #$FF
C - - - - - 0x03E8D9 0F:E8C9: AA        TAX
C - - - - - 0x03E8DA 0F:E8CA: C8        INY
C - - - - - 0x03E8DB 0F:E8CB: D0 01     BNE $E8CE
C - - - - - 0x03E8DD 0F:E8CD: E8        INX
C - - - - - 0x03E8DE 0F:E8CE: 84 48     STY ram_0048
C - - - - - 0x03E8E0 0F:E8D0: 86 49     STX ram_0049
C - - - - - 0x03E8E2 0F:E8D2: A0 0A     LDY #$0A
C - - - - - 0x03E8E4 0F:E8D4: B1 34     LDA (ram_0034),Y
C - - - - - 0x03E8E6 0F:E8D6: 38        SEC
C - - - - - 0x03E8E7 0F:E8D7: ED FF 05  SBC ram_05FF
C - - - - - 0x03E8EA 0F:E8DA: 10 10     BPL $E8EC
C - - - - - 0x03E8EC 0F:E8DC: 49 FF     EOR #$FF
C - - - - - 0x03E8EE 0F:E8DE: 18        CLC
C - - - - - 0x03E8EF 0F:E8DF: 69 01     ADC #$01
C - - - - - 0x03E8F1 0F:E8E1: F0 09     BEQ $E8EC
C - - - - - 0x03E8F3 0F:E8E3: A5 48     LDA ram_0048
C - - - - - 0x03E8F5 0F:E8E5: A6 49     LDX ram_0049
C - - - - - 0x03E8F7 0F:E8E7: A4 46     LDY ram_0046
C - - - - - 0x03E8F9 0F:E8E9: 20 12 E9  JSR $E912
C - - - - - 0x03E8FC 0F:E8EC: 60        RTS
- D 3 - - - 0x03E8FD 0F:E8ED: 00        .byte $00   ; 
- D 3 - - - 0x03E8FE 0F:E8EE: 01        .byte $01   ; 
- D 3 - - - 0x03E8FF 0F:E8EF: 01        .byte $01   ; 
- D 3 - - - 0x03E900 0F:E8F0: 01        .byte $01   ; 
- D 3 - - - 0x03E901 0F:E8F1: 00        .byte $00   ; 
- D 3 - - - 0x03E902 0F:E8F2: 02        .byte $02   ; 
- D 3 - - - 0x03E903 0F:E8F3: 02        .byte $02   ; 
- D 3 - - - 0x03E904 0F:E8F4: 02        .byte $02   ; 
C - - - - - 0x03E905 0F:E8F5: 84 47     STY ram_0047
C - - - - - 0x03E907 0F:E8F7: A4 32     LDY ram_0032
C - - - - - 0x03E909 0F:E8F9: A6 33     LDX ram_0033
C - - - - - 0x03E90B 0F:E8FB: 29 03     AND #$03
C - - - - - 0x03E90D 0F:E8FD: D0 01     BNE $E900
C - - - - - 0x03E90F 0F:E8FF: 60        RTS
C - - - - - 0x03E910 0F:E900: 4A        LSR
C - - - - - 0x03E911 0F:E901: B0 0C     BCS $E90F
C - - - - - 0x03E913 0F:E903: 98        TYA
C - - - - - 0x03E914 0F:E904: 49 FF     EOR #$FF
C - - - - - 0x03E916 0F:E906: A8        TAY
C - - - - - 0x03E917 0F:E907: 8A        TXA
C - - - - - 0x03E918 0F:E908: 49 FF     EOR #$FF
C - - - - - 0x03E91A 0F:E90A: AA        TAX
C - - - - - 0x03E91B 0F:E90B: C8        INY
C - - - - - 0x03E91C 0F:E90C: D0 01     BNE $E90F
- - - - - - 0x03E91E 0F:E90E: E8        .byte $E8   ; 
C - - - - - 0x03E91F 0F:E90F: 98        TYA
C - - - - - 0x03E920 0F:E910: A4 47     LDY ram_0047
C - - - - - 0x03E922 0F:E912: 18        CLC
C - - - - - 0x03E923 0F:E913: 71 34     ADC (ram_0034),Y
C - - - - - 0x03E925 0F:E915: 91 34     STA (ram_0034),Y
C - - - - - 0x03E927 0F:E917: C8        INY
C - - - - - 0x03E928 0F:E918: 8A        TXA
C - - - - - 0x03E929 0F:E919: 71 34     ADC (ram_0034),Y
C - - - - - 0x03E92B 0F:E91B: C0 06     CPY #$06
C - - - - - 0x03E92D 0F:E91D: F0 0E     BEQ $E92D
C - - - - - 0x03E92F 0F:E91F: A2 50     LDX #$50
C - - - - - 0x03E931 0F:E921: C9 50     CMP #$50
C - - - - - 0x03E933 0F:E923: 90 14     BCC $E939
C - - - - - 0x03E935 0F:E925: A2 AF     LDX #$AF
C - - - - - 0x03E937 0F:E927: C9 B0     CMP #$B0
C - - - - - 0x03E939 0F:E929: B0 0E     BCS $E939
C - - - - - 0x03E93B 0F:E92B: 90 0D     BCC $E93A
C - - - - - 0x03E93D 0F:E92D: A2 30     LDX #$30
C - - - - - 0x03E93F 0F:E92F: C9 30     CMP #$30
C - - - - - 0x03E941 0F:E931: 90 06     BCC $E939
C - - - - - 0x03E943 0F:E933: A2 CF     LDX #$CF
C - - - - - 0x03E945 0F:E935: C9 D0     CMP #$D0
C - - - - - 0x03E947 0F:E937: 90 01     BCC $E93A
C - - - - - 0x03E949 0F:E939: 8A        TXA
C - - - - - 0x03E94A 0F:E93A: 91 34     STA (ram_0034),Y
C - - - - - 0x03E94C 0F:E93C: 60        RTS
C D 3 - - - 0x03E94D 0F:E93D: 48        PHA
C - - - - - 0x03E94E 0F:E93E: 8A        TXA
C - - - - - 0x03E94F 0F:E93F: 48        PHA
C - - - - - 0x03E950 0F:E940: A9 01     LDA #$01
C - - - - - 0x03E952 0F:E942: 20 0F CB  JSR $CB0F
C - - - - - 0x03E955 0F:E945: AD 15 05  LDA ram_0515
C - - - - - 0x03E958 0F:E948: D0 F6     BNE $E940
C - - - - - 0x03E95A 0F:E94A: A9 01     LDA #$01
C - - - - - 0x03E95C 0F:E94C: 8D 15 05  STA ram_0515
C - - - - - 0x03E95F 0F:E94F: A9 00     LDA #$00
C - - - - - 0x03E961 0F:E951: 85 3E     STA ram_003E
C - - - - - 0x03E963 0F:E953: 68        PLA
C - - - - - 0x03E964 0F:E954: 4A        LSR
C - - - - - 0x03E965 0F:E955: 66 3E     ROR ram_003E
C - - - - - 0x03E967 0F:E957: 4A        LSR
C - - - - - 0x03E968 0F:E958: 66 3E     ROR ram_003E
C - - - - - 0x03E96A 0F:E95A: 85 3F     STA ram_003F
C - - - - - 0x03E96C 0F:E95C: 68        PLA
C - - - - - 0x03E96D 0F:E95D: 0A        ASL
C - - - - - 0x03E96E 0F:E95E: 66 3A     ROR ram_003A
C - - - - - 0x03E970 0F:E960: A8        TAY
C - - - - - 0x03E971 0F:E961: 18        CLC
C - - - - - 0x03E972 0F:E962: B9 DA E9  LDA $E9DA,Y
C - - - - - 0x03E975 0F:E965: 85 3C     STA ram_003C
C - - - - - 0x03E977 0F:E967: B9 DB E9  LDA $E9DB,Y
C - - - - - 0x03E97A 0F:E96A: 85 3D     STA ram_003D
C - - - - - 0x03E97C 0F:E96C: A0 00     LDY #$00
C - - - - - 0x03E97E 0F:E96E: 18        CLC
C - - - - - 0x03E97F 0F:E96F: B1 3C     LDA (ram_003C),Y
C - - - - - 0x03E981 0F:E971: 65 3E     ADC ram_003E
C - - - - - 0x03E983 0F:E973: 85 3E     STA ram_003E
C - - - - - 0x03E985 0F:E975: C8        INY
C - - - - - 0x03E986 0F:E976: B1 3C     LDA (ram_003C),Y
C - - - - - 0x03E988 0F:E978: 65 3F     ADC ram_003F
C - - - - - 0x03E98A 0F:E97A: 85 3F     STA ram_003F
C - - - - - 0x03E98C 0F:E97C: C8        INY
C - - - - - 0x03E98D 0F:E97D: B1 3C     LDA (ram_003C),Y
C - - - - - 0x03E98F 0F:E97F: 29 03     AND #$03
C - - - - - 0x03E991 0F:E981: 85 40     STA ram_0040
C - - - - - 0x03E993 0F:E983: B1 3C     LDA (ram_003C),Y
C - - - - - 0x03E995 0F:E985: 4A        LSR
C - - - - - 0x03E996 0F:E986: 4A        LSR
C - - - - - 0x03E997 0F:E987: 85 41     STA ram_0041
C - - - - - 0x03E999 0F:E989: C8        INY
C - - - - - 0x03E99A 0F:E98A: A2 00     LDX #$00
C - - - - - 0x03E99C 0F:E98C: A5 41     LDA ram_0041
C - - - - - 0x03E99E 0F:E98E: 9D A5 04  STA ram_04A5,X
C - - - - - 0x03E9A1 0F:E991: 18        CLC
C - - - - - 0x03E9A2 0F:E992: A5 3E     LDA ram_003E
C - - - - - 0x03E9A4 0F:E994: 9D A6 04  STA ram_04A6,X
C - - - - - 0x03E9A7 0F:E997: 69 20     ADC #$20
C - - - - - 0x03E9A9 0F:E999: 85 3E     STA ram_003E
C - - - - - 0x03E9AB 0F:E99B: A5 3F     LDA ram_003F
C - - - - - 0x03E9AD 0F:E99D: 9D A7 04  STA ram_04A7,X
C - - - - - 0x03E9B0 0F:E9A0: 69 00     ADC #$00
C - - - - - 0x03E9B2 0F:E9A2: 85 3F     STA ram_003F
C - - - - - 0x03E9B4 0F:E9A4: E8        INX
C - - - - - 0x03E9B5 0F:E9A5: E8        INX
C - - - - - 0x03E9B6 0F:E9A6: E8        INX
C - - - - - 0x03E9B7 0F:E9A7: A5 41     LDA ram_0041
C - - - - - 0x03E9B9 0F:E9A9: 85 43     STA ram_0043
C - - - - - 0x03E9BB 0F:E9AB: 2C 3A 00  BIT a: ram_003A
C - - - - - 0x03E9BE 0F:E9AE: 30 11     BMI $E9C1
C - - - - - 0x03E9C0 0F:E9B0: B1 3C     LDA (ram_003C),Y
C - - - - - 0x03E9C2 0F:E9B2: C8        INY
C - - - - - 0x03E9C3 0F:E9B3: C9 FE     CMP #$FE
C - - - - - 0x03E9C5 0F:E9B5: F0 0A     BEQ $E9C1
C - - - - - 0x03E9C7 0F:E9B7: 9D A5 04  STA ram_04A5,X
C - - - - - 0x03E9CA 0F:E9BA: E8        INX
C - - - - - 0x03E9CB 0F:E9BB: C6 43     DEC ram_0043
C - - - - - 0x03E9CD 0F:E9BD: D0 F1     BNE $E9B0
C - - - - - 0x03E9CF 0F:E9BF: F0 0A     BEQ $E9CB
C - - - - - 0x03E9D1 0F:E9C1: A9 00     LDA #$00
C - - - - - 0x03E9D3 0F:E9C3: 9D A5 04  STA ram_04A5,X
C - - - - - 0x03E9D6 0F:E9C6: E8        INX
C - - - - - 0x03E9D7 0F:E9C7: C6 43     DEC ram_0043
C - - - - - 0x03E9D9 0F:E9C9: D0 F8     BNE $E9C3
C - - - - - 0x03E9DB 0F:E9CB: A9 00     LDA #$00
C - - - - - 0x03E9DD 0F:E9CD: 9D A5 04  STA ram_04A5,X
C - - - - - 0x03E9E0 0F:E9D0: C6 40     DEC ram_0040
C - - - - - 0x03E9E2 0F:E9D2: D0 B8     BNE $E98C
C - - - - - 0x03E9E4 0F:E9D4: A9 80     LDA #$80
C - - - - - 0x03E9E6 0F:E9D6: 8D 15 05  STA ram_0515
C - - - - - 0x03E9E9 0F:E9D9: 60        RTS
- D 3 - - - 0x03E9EA 0F:E9DA: 1C        .byte $1C   ; 
- D 3 - - - 0x03E9EB 0F:E9DB: EA        .byte $EA   ; 
- D 3 - - - 0x03E9EC 0F:E9DC: 29        .byte $29   ; 
- D 3 - - - 0x03E9ED 0F:E9DD: EA        .byte $EA   ; 
- D 3 - - - 0x03E9EE 0F:E9DE: 34        .byte $34   ; <4>
- D 3 - - - 0x03E9EF 0F:E9DF: EA        .byte $EA   ; 
- D 3 - - - 0x03E9F0 0F:E9E0: 3D        .byte $3D   ; 
- D 3 - - - 0x03E9F1 0F:E9E1: EA        .byte $EA   ; 
- D 3 - - - 0x03E9F2 0F:E9E2: 46        .byte $46   ; <F>
- D 3 - - - 0x03E9F3 0F:E9E3: EA        .byte $EA   ; 
- D 3 - - - 0x03E9F4 0F:E9E4: 51        .byte $51   ; <Q>
- D 3 - - - 0x03E9F5 0F:E9E5: EA        .byte $EA   ; 
- D 3 - - - 0x03E9F6 0F:E9E6: 59        .byte $59   ; <Y>
- D 3 - - - 0x03E9F7 0F:E9E7: EA        .byte $EA   ; 
- D 3 - - - 0x03E9F8 0F:E9E8: 61        .byte $61   ; <a>
- D 3 - - - 0x03E9F9 0F:E9E9: EA        .byte $EA   ; 
- D 3 - - - 0x03E9FA 0F:E9EA: 6A        .byte $6A   ; <j>
- D 3 - - - 0x03E9FB 0F:E9EB: EA        .byte $EA   ; 
- D 3 - - - 0x03E9FC 0F:E9EC: 73        .byte $73   ; <s>
- D 3 - - - 0x03E9FD 0F:E9ED: EA        .byte $EA   ; 
- D 3 - - - 0x03E9FE 0F:E9EE: 7C        .byte $7C   ; 
- D 3 - - - 0x03E9FF 0F:E9EF: EA        .byte $EA   ; 
- D 3 - - - 0x03EA00 0F:E9F0: 87        .byte $87   ; 
- D 3 - - - 0x03EA01 0F:E9F1: EA        .byte $EA   ; 
- D 3 - - - 0x03EA02 0F:E9F2: 94        .byte $94   ; 
- D 3 - - - 0x03EA03 0F:E9F3: EA        .byte $EA   ; 
- D 3 - - - 0x03EA04 0F:E9F4: 9F        .byte $9F   ; 
- D 3 - - - 0x03EA05 0F:E9F5: EA        .byte $EA   ; 
- D 3 - - - 0x03EA06 0F:E9F6: AC        .byte $AC   ; 
- D 3 - - - 0x03EA07 0F:E9F7: EA        .byte $EA   ; 
- D 3 - - - 0x03EA08 0F:E9F8: B7        .byte $B7   ; 
- D 3 - - - 0x03EA09 0F:E9F9: EA        .byte $EA   ; 
- D 3 - - - 0x03EA0A 0F:E9FA: C4        .byte $C4   ; 
- D 3 - - - 0x03EA0B 0F:E9FB: EA        .byte $EA   ; 
- D 3 - - - 0x03EA0C 0F:E9FC: CE        .byte $CE   ; 
- D 3 - - - 0x03EA0D 0F:E9FD: EA        .byte $EA   ; 
- D 3 - - - 0x03EA0E 0F:E9FE: DB        .byte $DB   ; 
- D 3 - - - 0x03EA0F 0F:E9FF: EA        .byte $EA   ; 
- D 3 - - - 0x03EA10 0F:EA00: E6        .byte $E6   ; 
- D 3 - - - 0x03EA11 0F:EA01: EA        .byte $EA   ; 
- D 3 - - - 0x03EA12 0F:EA02: EF        .byte $EF   ; 
- D 3 - - - 0x03EA13 0F:EA03: EA        .byte $EA   ; 
- D 3 - - - 0x03EA14 0F:EA04: F8        .byte $F8   ; 
- D 3 - - - 0x03EA15 0F:EA05: EA        .byte $EA   ; 
- D 3 - - - 0x03EA16 0F:EA06: 01        .byte $01   ; 
- D 3 - - - 0x03EA17 0F:EA07: EB        .byte $EB   ; 
- D 3 - - - 0x03EA18 0F:EA08: 0D        .byte $0D   ; 
- D 3 - - - 0x03EA19 0F:EA09: EB        .byte $EB   ; 
- D 3 - - - 0x03EA1A 0F:EA0A: 17        .byte $17   ; 
- D 3 - - - 0x03EA1B 0F:EA0B: EB        .byte $EB   ; 
- D 3 - - - 0x03EA1C 0F:EA0C: 26        .byte $26   ; 
- D 3 - - - 0x03EA1D 0F:EA0D: EB        .byte $EB   ; 
- D 3 - - - 0x03EA1E 0F:EA0E: 33        .byte $33   ; <3>
- D 3 - - - 0x03EA1F 0F:EA0F: EB        .byte $EB   ; 
- D 3 - - - 0x03EA20 0F:EA10: 3E        .byte $3E   ; 
- D 3 - - - 0x03EA21 0F:EA11: EB        .byte $EB   ; 
- D 3 - - - 0x03EA22 0F:EA12: 4C        .byte $4C   ; <L>
- D 3 - - - 0x03EA23 0F:EA13: EB        .byte $EB   ; 
- D 3 - - - 0x03EA24 0F:EA14: 5E        .byte $5E   ; 
- D 3 - - - 0x03EA25 0F:EA15: EB        .byte $EB   ; 
- D 3 - - - 0x03EA26 0F:EA16: 67        .byte $67   ; <g>
- D 3 - - - 0x03EA27 0F:EA17: EB        .byte $EB   ; 
- D 3 - - - 0x03EA28 0F:EA18: 72        .byte $72   ; <r>
- D 3 - - - 0x03EA29 0F:EA19: EB        .byte $EB   ; 
- D 3 - - - 0x03EA2A 0F:EA1A: 7B        .byte $7B   ; 
- D 3 - - - 0x03EA2B 0F:EA1B: EB        .byte $EB   ; 
- D 3 - I - 0x03EA2C 0F:EA1C: AC        .byte $AC   ; 
- D 3 - I - 0x03EA2D 0F:EA1D: 22        .byte $22   ; 
- D 3 - I - 0x03EA2E 0F:EA1E: 16        .byte $16   ; 
- D 3 - I - 0x03EA2F 0F:EA1F: 94        .byte $94   ; 
- D 3 - I - 0x03EA30 0F:EA20: 00        .byte $00   ; 
- D 3 - I - 0x03EA31 0F:EA21: 94        .byte $94   ; 
- D 3 - I - 0x03EA32 0F:EA22: 00        .byte $00   ; 
- D 3 - I - 0x03EA33 0F:EA23: 00        .byte $00   ; 
- D 3 - I - 0x03EA34 0F:EA24: 54        .byte $54   ; <T>
- D 3 - I - 0x03EA35 0F:EA25: 68        .byte $68   ; <h>
- D 3 - I - 0x03EA36 0F:EA26: 5C        .byte $5C   ; 
- D 3 - I - 0x03EA37 0F:EA27: 69        .byte $69   ; <i>
- D 3 - I - 0x03EA38 0F:EA28: 00        .byte $00   ; 
- D 3 - I - 0x03EA39 0F:EA29: AC        .byte $AC   ; 
- D 3 - I - 0x03EA3A 0F:EA2A: 22        .byte $22   ; 
- D 3 - I - 0x03EA3B 0F:EA2B: 16        .byte $16   ; 
- D 3 - I - 0x03EA3C 0F:EA2C: 00        .byte $00   ; 
- D 3 - I - 0x03EA3D 0F:EA2D: 95        .byte $95   ; 
- D 3 - I - 0x03EA3E 0F:EA2E: FE        .byte $FE   ; 
- D 3 - I - 0x03EA3F 0F:EA2F: 00        .byte $00   ; 
- D 3 - I - 0x03EA40 0F:EA30: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03EA41 0F:EA31: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03EA42 0F:EA32: 00        .byte $00   ; 
- D 3 - I - 0x03EA43 0F:EA33: 00        .byte $00   ; 
- D 3 - I - 0x03EA44 0F:EA34: AC        .byte $AC   ; 
- D 3 - I - 0x03EA45 0F:EA35: 22        .byte $22   ; 
- D 3 - I - 0x03EA46 0F:EA36: 16        .byte $16   ; 
- D 3 - I - 0x03EA47 0F:EA37: FE        .byte $FE   ; 
- D 3 - I - 0x03EA48 0F:EA38: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03EA49 0F:EA39: 71        .byte $71   ; <q>
- D 3 - I - 0x03EA4A 0F:EA3A: 7D        .byte $7D   ; 
- D 3 - I - 0x03EA4B 0F:EA3B: 54        .byte $54   ; <T>
- D 3 - I - 0x03EA4C 0F:EA3C: 00        .byte $00   ; 
- D 3 - I - 0x03EA4D 0F:EA3D: AC        .byte $AC   ; 
- D 3 - I - 0x03EA4E 0F:EA3E: 22        .byte $22   ; 
- D 3 - I - 0x03EA4F 0F:EA3F: 16        .byte $16   ; 
- D 3 - I - 0x03EA50 0F:EA40: FE        .byte $FE   ; 
- D 3 - I - 0x03EA51 0F:EA41: 6C        .byte $6C   ; <l>
- D 3 - I - 0x03EA52 0F:EA42: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EA53 0F:EA43: 3F        .byte $3F   ; 
- D 3 - I - 0x03EA54 0F:EA44: 52        .byte $52   ; <R>
- D 3 - I - 0x03EA55 0F:EA45: 7D        .byte $7D   ; 
- D 3 - I - 0x03EA56 0F:EA46: AC        .byte $AC   ; 
- D 3 - I - 0x03EA57 0F:EA47: 22        .byte $22   ; 
- D 3 - I - 0x03EA58 0F:EA48: 12        .byte $12   ; 
- D 3 - I - 0x03EA59 0F:EA49: 00        .byte $00   ; 
- D 3 - I - 0x03EA5A 0F:EA4A: 00        .byte $00   ; 
- D 3 - I - 0x03EA5B 0F:EA4B: 00        .byte $00   ; 
- D 3 - I - 0x03EA5C 0F:EA4C: 95        .byte $95   ; 
- D 3 - I - 0x03EA5D 0F:EA4D: 54        .byte $54   ; <T>
- D 3 - I - 0x03EA5E 0F:EA4E: 67        .byte $67   ; <g>
- D 3 - I - 0x03EA5F 0F:EA4F: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03EA60 0F:EA50: 5C        .byte $5C   ; 
- D 3 - I - 0x03EA61 0F:EA51: AC        .byte $AC   ; 
- D 3 - I - 0x03EA62 0F:EA52: 22        .byte $22   ; 
- D 3 - I - 0x03EA63 0F:EA53: 12        .byte $12   ; 
- D 3 - I - 0x03EA64 0F:EA54: FE        .byte $FE   ; 
- D 3 - I - 0x03EA65 0F:EA55: 00        .byte $00   ; 
- D 3 - I - 0x03EA66 0F:EA56: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03EA67 0F:EA57: 69        .byte $69   ; <i>
- D 3 - I - 0x03EA68 0F:EA58: 7D        .byte $7D   ; 
- D 3 - I - 0x03EA69 0F:EA59: AC        .byte $AC   ; 
- D 3 - I - 0x03EA6A 0F:EA5A: 22        .byte $22   ; 
- D 3 - I - 0x03EA6B 0F:EA5B: 12        .byte $12   ; 
- D 3 - I - 0x03EA6C 0F:EA5C: FE        .byte $FE   ; 
- D 3 - I - 0x03EA6D 0F:EA5D: 48        .byte $48   ; <H>
- D 3 - I - 0x03EA6E 0F:EA5E: 68        .byte $68   ; <h>
- D 3 - I - 0x03EA6F 0F:EA5F: 41        .byte $41   ; <A>
- D 3 - I - 0x03EA70 0F:EA60: 7D        .byte $7D   ; 
- D 3 - I - 0x03EA71 0F:EA61: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EA72 0F:EA62: 22        .byte $22   ; 
- D 3 - I - 0x03EA73 0F:EA63: 16        .byte $16   ; 
- D 3 - I - 0x03EA74 0F:EA64: FE        .byte $FE   ; 
- D 3 - I - 0x03EA75 0F:EA65: 00        .byte $00   ; 
- D 3 - I - 0x03EA76 0F:EA66: 50        .byte $50   ; <P>
- D 3 - I - 0x03EA77 0F:EA67: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03EA78 0F:EA68: 48        .byte $48   ; <H>
- D 3 - I - 0x03EA79 0F:EA69: 69        .byte $69   ; <i>
- D 3 - I - 0x03EA7A 0F:EA6A: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EA7B 0F:EA6B: 22        .byte $22   ; 
- D 3 - I - 0x03EA7C 0F:EA6C: 16        .byte $16   ; 
- D 3 - I - 0x03EA7D 0F:EA6D: FE        .byte $FE   ; 
- D 3 - I - 0x03EA7E 0F:EA6E: 00        .byte $00   ; 
- D 3 - I - 0x03EA7F 0F:EA6F: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03EA80 0F:EA70: 46        .byte $46   ; <F>
- D 3 - I - 0x03EA81 0F:EA71: 42        .byte $42   ; <B>
- D 3 - I - 0x03EA82 0F:EA72: 50        .byte $50   ; <P>
- D 3 - I - 0x03EA83 0F:EA73: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EA84 0F:EA74: 22        .byte $22   ; 
- D 3 - I - 0x03EA85 0F:EA75: 16        .byte $16   ; 
- D 3 - I - 0x03EA86 0F:EA76: FE        .byte $FE   ; 
- D 3 - I - 0x03EA87 0F:EA77: 00        .byte $00   ; 
- D 3 - I - 0x03EA88 0F:EA78: 46        .byte $46   ; <F>
- D 3 - I - 0x03EA89 0F:EA79: 60        .byte $60   ; 
- D 3 - I - 0x03EA8A 0F:EA7A: 4F        .byte $4F   ; <O>
- D 3 - I - 0x03EA8B 0F:EA7B: 68        .byte $68   ; <h>
- D 3 - I - 0x03EA8C 0F:EA7C: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EA8D 0F:EA7D: 22        .byte $22   ; 
- D 3 - I - 0x03EA8E 0F:EA7E: 16        .byte $16   ; 
- D 3 - I - 0x03EA8F 0F:EA7F: 00        .byte $00   ; 
- D 3 - I - 0x03EA90 0F:EA80: 95        .byte $95   ; 
- D 3 - I - 0x03EA91 0F:EA81: FE        .byte $FE   ; 
- D 3 - I - 0x03EA92 0F:EA82: 00        .byte $00   ; 
- D 3 - I - 0x03EA93 0F:EA83: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03EA94 0F:EA84: 6C        .byte $6C   ; <l>
- D 3 - I - 0x03EA95 0F:EA85: 7D        .byte $7D   ; 
- D 3 - I - 0x03EA96 0F:EA86: 50        .byte $50   ; <P>
- D 3 - I - 0x03EA97 0F:EA87: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EA98 0F:EA88: 22        .byte $22   ; 
- D 3 - I - 0x03EA99 0F:EA89: 16        .byte $16   ; 
- D 3 - I - 0x03EA9A 0F:EA8A: 00        .byte $00   ; 
- D 3 - I - 0x03EA9B 0F:EA8B: 00        .byte $00   ; 
- D 3 - I - 0x03EA9C 0F:EA8C: 00        .byte $00   ; 
- D 3 - I - 0x03EA9D 0F:EA8D: 94        .byte $94   ; 
- D 3 - I - 0x03EA9E 0F:EA8E: 00        .byte $00   ; 
- D 3 - I - 0x03EA9F 0F:EA8F: 00        .byte $00   ; 
- D 3 - I - 0x03EAA0 0F:EA90: 50        .byte $50   ; <P>
- D 3 - I - 0x03EAA1 0F:EA91: 42        .byte $42   ; <B>
- D 3 - I - 0x03EAA2 0F:EA92: 46        .byte $46   ; <F>
- D 3 - I - 0x03EAA3 0F:EA93: 7D        .byte $7D   ; 
- D 3 - I - 0x03EAA4 0F:EA94: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EAA5 0F:EA95: 22        .byte $22   ; 
- D 3 - I - 0x03EAA6 0F:EA96: 16        .byte $16   ; 
- D 3 - I - 0x03EAA7 0F:EA97: 00        .byte $00   ; 
- D 3 - I - 0x03EAA8 0F:EA98: 94        .byte $94   ; 
- D 3 - I - 0x03EAA9 0F:EA99: FE        .byte $FE   ; 
- D 3 - I - 0x03EAAA 0F:EA9A: 00        .byte $00   ; 
- D 3 - I - 0x03EAAB 0F:EA9B: 5C        .byte $5C   ; 
- D 3 - I - 0x03EAAC 0F:EA9C: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03EAAD 0F:EA9D: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03EAAE 0F:EA9E: 48        .byte $48   ; <H>
- D 3 - I - 0x03EAAF 0F:EA9F: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EAB0 0F:EAA0: 22        .byte $22   ; 
- D 3 - I - 0x03EAB1 0F:EAA1: 16        .byte $16   ; 
- D 3 - I - 0x03EAB2 0F:EAA2: 00        .byte $00   ; 
- D 3 - I - 0x03EAB3 0F:EAA3: 00        .byte $00   ; 
- D 3 - I - 0x03EAB4 0F:EAA4: 00        .byte $00   ; 
- D 3 - I - 0x03EAB5 0F:EAA5: 00        .byte $00   ; 
- D 3 - I - 0x03EAB6 0F:EAA6: 94        .byte $94   ; 
- D 3 - I - 0x03EAB7 0F:EAA7: 00        .byte $00   ; 
- D 3 - I - 0x03EAB8 0F:EAA8: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03EAB9 0F:EAA9: 46        .byte $46   ; <F>
- D 3 - I - 0x03EABA 0F:EAAA: 42        .byte $42   ; <B>
- D 3 - I - 0x03EABB 0F:EAAB: 5C        .byte $5C   ; 
- D 3 - I - 0x03EABC 0F:EAAC: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EABD 0F:EAAD: 22        .byte $22   ; 
- D 3 - I - 0x03EABE 0F:EAAE: 16        .byte $16   ; 
- D 3 - I - 0x03EABF 0F:EAAF: 00        .byte $00   ; 
- D 3 - I - 0x03EAC0 0F:EAB0: 94        .byte $94   ; 
- D 3 - I - 0x03EAC1 0F:EAB1: FE        .byte $FE   ; 
- D 3 - I - 0x03EAC2 0F:EAB2: 00        .byte $00   ; 
- D 3 - I - 0x03EAC3 0F:EAB3: 06        .byte $06   ; 
- D 3 - I - 0x03EAC4 0F:EAB4: 2E        .byte $2E   ; 
- D 3 - I - 0x03EAC5 0F:EAB5: 22        .byte $22   ; 
- D 3 - I - 0x03EAC6 0F:EAB6: 2E        .byte $2E   ; 
- D 3 - I - 0x03EAC7 0F:EAB7: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EAC8 0F:EAB8: 22        .byte $22   ; 
- D 3 - I - 0x03EAC9 0F:EAB9: 16        .byte $16   ; 
- D 3 - I - 0x03EACA 0F:EABA: 00        .byte $00   ; 
- D 3 - I - 0x03EACB 0F:EABB: 95        .byte $95   ; 
- D 3 - I - 0x03EACC 0F:EABC: 00        .byte $00   ; 
- D 3 - I - 0x03EACD 0F:EABD: 00        .byte $00   ; 
- D 3 - I - 0x03EACE 0F:EABE: 94        .byte $94   ; 
- D 3 - I - 0x03EACF 0F:EABF: 00        .byte $00   ; 
- D 3 - I - 0x03EAD0 0F:EAC0: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03EAD1 0F:EAC1: 6C        .byte $6C   ; <l>
- D 3 - I - 0x03EAD2 0F:EAC2: 7D        .byte $7D   ; 
- D 3 - I - 0x03EAD3 0F:EAC3: 5C        .byte $5C   ; 
- D 3 - I - 0x03EAD4 0F:EAC4: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EAD5 0F:EAC5: 22        .byte $22   ; 
- D 3 - I - 0x03EAD6 0F:EAC6: 16        .byte $16   ; 
- D 3 - I - 0x03EAD7 0F:EAC7: 95        .byte $95   ; 
- D 3 - I - 0x03EAD8 0F:EAC8: FE        .byte $FE   ; 
- D 3 - I - 0x03EAD9 0F:EAC9: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03EADA 0F:EACA: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03EADB 0F:EACB: 46        .byte $46   ; <F>
- D 3 - I - 0x03EADC 0F:EACC: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03EADD 0F:EACD: 54        .byte $54   ; <T>
- D 3 - I - 0x03EADE 0F:EACE: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EADF 0F:EACF: 22        .byte $22   ; 
- D 3 - I - 0x03EAE0 0F:EAD0: 16        .byte $16   ; 
- D 3 - I - 0x03EAE1 0F:EAD1: 00        .byte $00   ; 
- D 3 - I - 0x03EAE2 0F:EAD2: 00        .byte $00   ; 
- D 3 - I - 0x03EAE3 0F:EAD3: 00        .byte $00   ; 
- D 3 - I - 0x03EAE4 0F:EAD4: 00        .byte $00   ; 
- D 3 - I - 0x03EAE5 0F:EAD5: 95        .byte $95   ; 
- D 3 - I - 0x03EAE6 0F:EAD6: 00        .byte $00   ; 
- D 3 - I - 0x03EAE7 0F:EAD7: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03EAE8 0F:EAD8: 46        .byte $46   ; <F>
- D 3 - I - 0x03EAE9 0F:EAD9: 42        .byte $42   ; <B>
- D 3 - I - 0x03EAEA 0F:EADA: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03EAEB 0F:EADB: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EAEC 0F:EADC: 22        .byte $22   ; 
- D 3 - I - 0x03EAED 0F:EADD: 16        .byte $16   ; 
- D 3 - I - 0x03EAEE 0F:EADE: 00        .byte $00   ; 
- D 3 - I - 0x03EAEF 0F:EADF: 94        .byte $94   ; 
- D 3 - I - 0x03EAF0 0F:EAE0: FE        .byte $FE   ; 
- D 3 - I - 0x03EAF1 0F:EAE1: 03        .byte $03   ; 
- D 3 - I - 0x03EAF2 0F:EAE2: 0A        .byte $0A   ; 
- D 3 - I - 0x03EAF3 0F:EAE3: 06        .byte $06   ; 
- D 3 - I - 0x03EAF4 0F:EAE4: 15        .byte $15   ; 
- D 3 - I - 0x03EAF5 0F:EAE5: 02        .byte $02   ; 
- D 3 - I - 0x03EAF6 0F:EAE6: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EAF7 0F:EAE7: 22        .byte $22   ; 
- D 3 - I - 0x03EAF8 0F:EAE8: 16        .byte $16   ; 
- D 3 - I - 0x03EAF9 0F:EAE9: FE        .byte $FE   ; 
- D 3 - I - 0x03EAFA 0F:EAEA: 00        .byte $00   ; 
- D 3 - I - 0x03EAFB 0F:EAEB: 5C        .byte $5C   ; 
- D 3 - I - 0x03EAFC 0F:EAEC: 76        .byte $76   ; <v>
- D 3 - I - 0x03EAFD 0F:EAED: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03EAFE 0F:EAEE: 7D        .byte $7D   ; 
- D 3 - I - 0x03EAFF 0F:EAEF: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EB00 0F:EAF0: 22        .byte $22   ; 
- D 3 - I - 0x03EB01 0F:EAF1: 16        .byte $16   ; 
- D 3 - I - 0x03EB02 0F:EAF2: FE        .byte $FE   ; 
- D 3 - I - 0x03EB03 0F:EAF3: 00        .byte $00   ; 
- D 3 - I - 0x03EB04 0F:EAF4: 0E        .byte $0E   ; 
- D 3 - I - 0x03EB05 0F:EAF5: 28        .byte $28   ; 
- D 3 - I - 0x03EB06 0F:EAF6: 01        .byte $01   ; 
- D 3 - I - 0x03EB07 0F:EAF7: 03        .byte $03   ; 
- D 3 - I - 0x03EB08 0F:EAF8: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EB09 0F:EAF9: 22        .byte $22   ; 
- D 3 - I - 0x03EB0A 0F:EAFA: 16        .byte $16   ; 
- D 3 - I - 0x03EB0B 0F:EAFB: FE        .byte $FE   ; 
- D 3 - I - 0x03EB0C 0F:EAFC: 00        .byte $00   ; 
- D 3 - I - 0x03EB0D 0F:EAFD: 48        .byte $48   ; <H>
- D 3 - I - 0x03EB0E 0F:EAFE: 68        .byte $68   ; <h>
- D 3 - I - 0x03EB0F 0F:EAFF: 41        .byte $41   ; <A>
- D 3 - I - 0x03EB10 0F:EB00: 7D        .byte $7D   ; 
- D 3 - I - 0x03EB11 0F:EB01: AB        .byte $AB   ; 
- D 3 - I - 0x03EB12 0F:EB02: 22        .byte $22   ; 
- D 3 - I - 0x03EB13 0F:EB03: 1A        .byte $1A   ; 
- D 3 - I - 0x03EB14 0F:EB04: 00        .byte $00   ; 
- D 3 - I - 0x03EB15 0F:EB05: 95        .byte $95   ; 
- D 3 - I - 0x03EB16 0F:EB06: FE        .byte $FE   ; 
- D 3 - I - 0x03EB17 0F:EB07: 00        .byte $00   ; 
- D 3 - I - 0x03EB18 0F:EB08: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03EB19 0F:EB09: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EB1A 0F:EB0A: 51        .byte $51   ; <Q>
- D 3 - I - 0x03EB1B 0F:EB0B: 00        .byte $00   ; 
- D 3 - I - 0x03EB1C 0F:EB0C: 00        .byte $00   ; 
- D 3 - I - 0x03EB1D 0F:EB0D: AB        .byte $AB   ; 
- D 3 - I - 0x03EB1E 0F:EB0E: 22        .byte $22   ; 
- D 3 - I - 0x03EB1F 0F:EB0F: 1A        .byte $1A   ; 
- D 3 - I - 0x03EB20 0F:EB10: FE        .byte $FE   ; 
- D 3 - I - 0x03EB21 0F:EB11: 00        .byte $00   ; 
- D 3 - I - 0x03EB22 0F:EB12: 47        .byte $47   ; <G>
- D 3 - I - 0x03EB23 0F:EB13: 70        .byte $70   ; <p>
- D 3 - I - 0x03EB24 0F:EB14: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03EB25 0F:EB15: 51        .byte $51   ; <Q>
- D 3 - I - 0x03EB26 0F:EB16: 00        .byte $00   ; 
- D 3 - I - 0x03EB27 0F:EB17: AB        .byte $AB   ; 
- D 3 - I - 0x03EB28 0F:EB18: 22        .byte $22   ; 
- D 3 - I - 0x03EB29 0F:EB19: 1A        .byte $1A   ; 
- D 3 - I - 0x03EB2A 0F:EB1A: 00        .byte $00   ; 
- D 3 - I - 0x03EB2B 0F:EB1B: 00        .byte $00   ; 
- D 3 - I - 0x03EB2C 0F:EB1C: 00        .byte $00   ; 
- D 3 - I - 0x03EB2D 0F:EB1D: 00        .byte $00   ; 
- D 3 - I - 0x03EB2E 0F:EB1E: 00        .byte $00   ; 
- D 3 - I - 0x03EB2F 0F:EB1F: 94        .byte $94   ; 
- D 3 - I - 0x03EB30 0F:EB20: 0B        .byte $0B   ; 
- D 3 - I - 0x03EB31 0F:EB21: 2E        .byte $2E   ; 
- D 3 - I - 0x03EB32 0F:EB22: 06        .byte $06   ; 
- D 3 - I - 0x03EB33 0F:EB23: 08        .byte $08   ; 
- D 3 - I - 0x03EB34 0F:EB24: 14        .byte $14   ; 
- D 3 - I - 0x03EB35 0F:EB25: 1B        .byte $1B   ; 
- D 3 - I - 0x03EB36 0F:EB26: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EB37 0F:EB27: 22        .byte $22   ; 
- D 3 - I - 0x03EB38 0F:EB28: 16        .byte $16   ; 
- D 3 - I - 0x03EB39 0F:EB29: 00        .byte $00   ; 
- D 3 - I - 0x03EB3A 0F:EB2A: 00        .byte $00   ; 
- D 3 - I - 0x03EB3B 0F:EB2B: 94        .byte $94   ; 
- D 3 - I - 0x03EB3C 0F:EB2C: 94        .byte $94   ; 
- D 3 - I - 0x03EB3D 0F:EB2D: FE        .byte $FE   ; 
- D 3 - I - 0x03EB3E 0F:EB2E: 00        .byte $00   ; 
- D 3 - I - 0x03EB3F 0F:EB2F: 14        .byte $14   ; 
- D 3 - I - 0x03EB40 0F:EB30: 1B        .byte $1B   ; 
- D 3 - I - 0x03EB41 0F:EB31: 10        .byte $10   ; 
- D 3 - I - 0x03EB42 0F:EB32: 0D        .byte $0D   ; 
- D 3 - I - 0x03EB43 0F:EB33: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EB44 0F:EB34: 22        .byte $22   ; 
- D 3 - I - 0x03EB45 0F:EB35: 16        .byte $16   ; 
- D 3 - I - 0x03EB46 0F:EB36: 00        .byte $00   ; 
- D 3 - I - 0x03EB47 0F:EB37: 94        .byte $94   ; 
- D 3 - I - 0x03EB48 0F:EB38: FE        .byte $FE   ; 
- D 3 - I - 0x03EB49 0F:EB39: 20        .byte $20   ; 
- D 3 - I - 0x03EB4A 0F:EB3A: 06        .byte $06   ; 
- D 3 - I - 0x03EB4B 0F:EB3B: 1F        .byte $1F   ; 
- D 3 - I - 0x03EB4C 0F:EB3C: 04        .byte $04   ; 
- D 3 - I - 0x03EB4D 0F:EB3D: 29        .byte $29   ; 
- D 3 - I - 0x03EB4E 0F:EB3E: AB        .byte $AB   ; 
- D 3 - I - 0x03EB4F 0F:EB3F: 22        .byte $22   ; 
- D 3 - I - 0x03EB50 0F:EB40: 17        .byte $17   ; 
- D 3 - I - 0x03EB51 0F:EB41: FE        .byte $FE   ; 
- D 3 - I - 0x03EB52 0F:EB42: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03EB53 0F:EB43: 71        .byte $71   ; <q>
- D 3 - I - 0x03EB54 0F:EB44: 7D        .byte $7D   ; 
- D 3 - I - 0x03EB55 0F:EB45: 54        .byte $54   ; <T>
- D 3 - I - 0x03EB56 0F:EB46: 16        .byte $16   ; 
- D 3 - I - 0x03EB57 0F:EB47: 0F        .byte $0F   ; 
- D 3 - I - 0x03EB58 0F:EB48: 15        .byte $15   ; 
- D 3 - I - 0x03EB59 0F:EB49: 04        .byte $04   ; 
- D 3 - I - 0x03EB5A 0F:EB4A: 29        .byte $29   ; 
- D 3 - I - 0x03EB5B 0F:EB4B: 00        .byte $00   ; 
- D 3 - I - 0x03EB5C 0F:EB4C: AB        .byte $AB   ; 
- D 3 - I - 0x03EB5D 0F:EB4D: 22        .byte $22   ; 
- D 3 - I - 0x03EB5E 0F:EB4E: 17        .byte $17   ; 
- D 3 - I - 0x03EB5F 0F:EB4F: 94        .byte $94   ; 
- D 3 - I - 0x03EB60 0F:EB50: 00        .byte $00   ; 
- D 3 - I - 0x03EB61 0F:EB51: 94        .byte $94   ; 
- D 3 - I - 0x03EB62 0F:EB52: 00        .byte $00   ; 
- D 3 - I - 0x03EB63 0F:EB53: 00        .byte $00   ; 
- D 3 - I - 0x03EB64 0F:EB54: 54        .byte $54   ; <T>
- D 3 - I - 0x03EB65 0F:EB55: 68        .byte $68   ; <h>
- D 3 - I - 0x03EB66 0F:EB56: 5C        .byte $5C   ; 
- D 3 - I - 0x03EB67 0F:EB57: 69        .byte $69   ; <i>
- D 3 - I - 0x03EB68 0F:EB58: 16        .byte $16   ; 
- D 3 - I - 0x03EB69 0F:EB59: 0F        .byte $0F   ; 
- D 3 - I - 0x03EB6A 0F:EB5A: 15        .byte $15   ; 
- D 3 - I - 0x03EB6B 0F:EB5B: 04        .byte $04   ; 
- D 3 - I - 0x03EB6C 0F:EB5C: 29        .byte $29   ; 
- D 3 - I - 0x03EB6D 0F:EB5D: 00        .byte $00   ; 
- D 3 - I - 0x03EB6E 0F:EB5E: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03EB6F 0F:EB5F: 22        .byte $22   ; 
- D 3 - I - 0x03EB70 0F:EB60: 16        .byte $16   ; 
- D 3 - I - 0x03EB71 0F:EB61: FE        .byte $FE   ; 
- D 3 - I - 0x03EB72 0F:EB62: 7D        .byte $7D   ; 
- D 3 - I - 0x03EB73 0F:EB63: 7D        .byte $7D   ; 
- D 3 - I - 0x03EB74 0F:EB64: 7D        .byte $7D   ; 
- D 3 - I - 0x03EB75 0F:EB65: 7D        .byte $7D   ; 
- D 3 - I - 0x03EB76 0F:EB66: 7D        .byte $7D   ; 
- D 3 - I - 0x03EB77 0F:EB67: AA        .byte $AA   ; 
- D 3 - I - 0x03EB78 0F:EB68: 22        .byte $22   ; 
- D 3 - I - 0x03EB79 0F:EB69: 16        .byte $16   ; 
- D 3 - I - 0x03EB7A 0F:EB6A: 00        .byte $00   ; 
- D 3 - I - 0x03EB7B 0F:EB6B: 94        .byte $94   ; 
- D 3 - I - 0x03EB7C 0F:EB6C: FE        .byte $FE   ; 
- D 3 - I - 0x03EB7D 0F:EB6D: 1B        .byte $1B   ; 
- D 3 - I - 0x03EB7E 0F:EB6E: 10        .byte $10   ; 
- D 3 - I - 0x03EB7F 0F:EB6F: 28        .byte $28   ; 
- D 3 - I - 0x03EB80 0F:EB70: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03EB81 0F:EB71: 60        .byte $60   ; 
- D 3 - I - 0x03EB82 0F:EB72: AA        .byte $AA   ; 
- D 3 - I - 0x03EB83 0F:EB73: 22        .byte $22   ; 
- D 3 - I - 0x03EB84 0F:EB74: 16        .byte $16   ; 
- D 3 - I - 0x03EB85 0F:EB75: FE        .byte $FE   ; 
- D 3 - I - 0x03EB86 0F:EB76: 0C        .byte $0C   ; 
- D 3 - I - 0x03EB87 0F:EB77: 32        .byte $32   ; <2>
- D 3 - I - 0x03EB88 0F:EB78: 03        .byte $03   ; 
- D 3 - I - 0x03EB89 0F:EB79: 22        .byte $22   ; 
- D 3 - I - 0x03EB8A 0F:EB7A: 2E        .byte $2E   ; 
- D 3 - I - 0x03EB8B 0F:EB7B: AA        .byte $AA   ; 
- D 3 - I - 0x03EB8C 0F:EB7C: 22        .byte $22   ; 
- D 3 - I - 0x03EB8D 0F:EB7D: 16        .byte $16   ; 
- D 3 - I - 0x03EB8E 0F:EB7E: 00        .byte $00   ; 
- D 3 - I - 0x03EB8F 0F:EB7F: 94        .byte $94   ; 
- D 3 - I - 0x03EB90 0F:EB80: FE        .byte $FE   ; 
- D 3 - I - 0x03EB91 0F:EB81: 20        .byte $20   ; 
- D 3 - I - 0x03EB92 0F:EB82: 07        .byte $07   ; 
- D 3 - I - 0x03EB93 0F:EB83: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03EB94 0F:EB84: 60        .byte $60   ; 
- D 3 - I - 0x03EB95 0F:EB85: 00        .byte $00   ; 
C D 3 - - - 0x03EB96 0F:EB86: A9 01     LDA #$01
C - - - - - 0x03EB98 0F:EB88: 20 0F CB  JSR $CB0F
C - - - - - 0x03EB9B 0F:EB8B: A5 21     LDA ram_0021
C - - - - - 0x03EB9D 0F:EB8D: 29 1E     AND #$1E
C - - - - - 0x03EB9F 0F:EB8F: AE 39 05  LDX ram_0539
C - - - - - 0x03EBA2 0F:EB92: F0 05     BEQ $EB99
C - - - - - 0x03EBA4 0F:EB94: A5 21     LDA ram_0021
C - - - - - 0x03EBA6 0F:EB96: 4D 39 05  EOR ram_0539
C - - - - - 0x03EBA9 0F:EB99: 85 21     STA ram_0021
C - - - - - 0x03EBAB 0F:EB9B: 20 08 EC  JSR $EC08
C - - - - - 0x03EBAE 0F:EB9E: 20 85 ED  JSR $ED85
C - - - - - 0x03EBB1 0F:EBA1: 48        PHA
C - - - - - 0x03EBB2 0F:EBA2: A5 22     LDA ram_0022
C - - - - - 0x03EBB4 0F:EBA4: A9 18     LDA #$18
C - - - - - 0x03EBB6 0F:EBA6: 85 24     STA ram_0024
C - - - - - 0x03EBB8 0F:EBA8: A9 19     LDA #$19
C - - - - - 0x03EBBA 0F:EBAA: 85 25     STA ram_0025
C - - - - - 0x03EBBC 0F:EBAC: 20 2D CE  JSR $CE2D
C - - - - - 0x03EBBF 0F:EBAF: 68        PLA
C - - - - - 0x03EBC0 0F:EBB0: 20 03 80  JSR $8003
C - - - - - 0x03EBC3 0F:EBB3: 48        PHA
C - - - - - 0x03EBC4 0F:EBB4: A5 22     LDA ram_0022
C - - - - - 0x03EBC6 0F:EBB6: A9 18     LDA #$18
C - - - - - 0x03EBC8 0F:EBB8: 85 24     STA ram_0024
C - - - - - 0x03EBCA 0F:EBBA: A9 19     LDA #$19
C - - - - - 0x03EBCC 0F:EBBC: 85 25     STA ram_0025
C - - - - - 0x03EBCE 0F:EBBE: 20 2D CE  JSR $CE2D
C - - - - - 0x03EBD1 0F:EBC1: 68        PLA
C - - - - - 0x03EBD2 0F:EBC2: 20 06 80  JSR $8006
C - - - - - 0x03EBD5 0F:EBC5: 48        PHA
C - - - - - 0x03EBD6 0F:EBC6: A5 22     LDA ram_0022
C - - - - - 0x03EBD8 0F:EBC8: A9 18     LDA #$18
C - - - - - 0x03EBDA 0F:EBCA: 85 24     STA ram_0024
C - - - - - 0x03EBDC 0F:EBCC: A9 19     LDA #$19
C - - - - - 0x03EBDE 0F:EBCE: 85 25     STA ram_0025
C - - - - - 0x03EBE0 0F:EBD0: 20 2D CE  JSR $CE2D
C - - - - - 0x03EBE3 0F:EBD3: 68        PLA
C - - - - - 0x03EBE4 0F:EBD4: 20 09 80  JSR $8009
C - - - - - 0x03EBE7 0F:EBD7: AD 2E 05  LDA ram_052E
C - - - - - 0x03EBEA 0F:EBDA: F0 29     BEQ $EC05
C - - - - - 0x03EBEC 0F:EBDC: CE 2E 05  DEC ram_052E
C - - - - - 0x03EBEF 0F:EBDF: D0 24     BNE $EC05
C - - - - - 0x03EBF1 0F:EBE1: AD 2F 05  LDA ram_052F
C - - - - - 0x03EBF4 0F:EBE4: C9 7E     CMP #$7E
C - - - - - 0x03EBF6 0F:EBE6: 90 11     BCC $EBF9
C - - - - - 0x03EBF8 0F:EBE8: C9 7F     CMP #$7F
C - - - - - 0x03EBFA 0F:EBEA: F0 07     BEQ $EBF3
C - - - - - 0x03EBFC 0F:EBEC: AD 27 00  LDA a: ram_0027
C - - - - - 0x03EBFF 0F:EBEF: C9 04     CMP #$04
C - - - - - 0x03EC01 0F:EBF1: F0 12     BEQ $EC05
C - - - - - 0x03EC03 0F:EBF3: 20 93 D0  JSR $D093
C - - - - - 0x03EC06 0F:EBF6: 4C 05 EC  JMP $EC05
C - - - - - 0x03EC09 0F:EBF9: 2C 3F 06  BIT ram_063F
C - - - - - 0x03EC0C 0F:EBFC: 10 04     BPL $EC02
C - - - - - 0x03EC0E 0F:EBFE: C9 63     CMP #$63
C - - - - - 0x03EC10 0F:EC00: D0 03     BNE $EC05
C - - - - - 0x03EC12 0F:EC02: 20 F1 CB  JSR $CBF1
C D 3 - - - 0x03EC15 0F:EC05: 4C 86 EB  JMP $EB86
C - - - - - 0x03EC18 0F:EC08: AD 16 05  LDA ram_0516
C - - - - - 0x03EC1B 0F:EC0B: 29 81     AND #$81
C - - - - - 0x03EC1D 0F:EC0D: D0 01     BNE $EC10
C - - - - - 0x03EC1F 0F:EC0F: 60        RTS
C - - - - - 0x03EC20 0F:EC10: 2C 16 05  BIT ram_0516
C - - - - - 0x03EC23 0F:EC13: 10 1F     BPL $EC34
C - - - - - 0x03EC25 0F:EC15: A9 01     LDA #$01
C - - - - - 0x03EC27 0F:EC17: 8D 16 05  STA ram_0516
C - - - - - 0x03EC2A 0F:EC1A: 48        PHA
C - - - - - 0x03EC2B 0F:EC1B: A5 22     LDA ram_0022
C - - - - - 0x03EC2D 0F:EC1D: A9 10     LDA #$10
C - - - - - 0x03EC2F 0F:EC1F: 85 24     STA ram_0024
C - - - - - 0x03EC31 0F:EC21: A9 11     LDA #$11
C - - - - - 0x03EC33 0F:EC23: 85 25     STA ram_0025
C - - - - - 0x03EC35 0F:EC25: 20 2D CE  JSR $CE2D
C - - - - - 0x03EC38 0F:EC28: 68        PLA
C - - - - - 0x03EC39 0F:EC29: 20 00 80  JSR $8000
C - - - - - 0x03EC3C 0F:EC2C: A9 00     LDA #$00
C - - - - - 0x03EC3E 0F:EC2E: 8D 22 05  STA ram_0522
C - - - - - 0x03EC41 0F:EC31: 8D 39 05  STA ram_0539
C - - - - - 0x03EC44 0F:EC34: AE 19 05  LDX ram_0519
C - - - - - 0x03EC47 0F:EC37: F0 03     BEQ $EC3C
C - - - - - 0x03EC49 0F:EC39: 4C 5B ED  JMP $ED5B
C - - - - - 0x03EC4C 0F:EC3C: A9 00     LDA #$00
C - - - - - 0x03EC4E 0F:EC3E: 8D 32 05  STA ram_0532
C - - - - - 0x03EC51 0F:EC41: 8D 34 05  STA ram_0534
C - - - - - 0x03EC54 0F:EC44: 8D 36 05  STA ram_0536
C - - - - - 0x03EC57 0F:EC47: 8D 38 05  STA ram_0538
C - - - - - 0x03EC5A 0F:EC4A: 8D 39 05  STA ram_0539
C - - - - - 0x03EC5D 0F:EC4D: A9 08     LDA #$08
C - - - - - 0x03EC5F 0F:EC4F: 2C 16 05  BIT ram_0516
C - - - - - 0x03EC62 0F:EC52: D0 21     BNE $EC75
C - - - - - 0x03EC64 0F:EC54: AD 16 05  LDA ram_0516
C - - - - - 0x03EC67 0F:EC57: 29 50     AND #$50
C - - - - - 0x03EC69 0F:EC59: C9 50     CMP #$50
C - - - - - 0x03EC6B 0F:EC5B: F0 2F     BEQ $EC8C
C - - - - - 0x03EC6D 0F:EC5D: 2C 16 05  BIT ram_0516
C - - - - - 0x03EC70 0F:EC60: 70 12     BVS $EC74
C - - - - - 0x03EC72 0F:EC62: 48        PHA
C - - - - - 0x03EC73 0F:EC63: A5 22     LDA ram_0022
C - - - - - 0x03EC75 0F:EC65: A9 10     LDA #$10
C - - - - - 0x03EC77 0F:EC67: 85 24     STA ram_0024
C - - - - - 0x03EC79 0F:EC69: A9 11     LDA #$11
C - - - - - 0x03EC7B 0F:EC6B: 85 25     STA ram_0025
C - - - - - 0x03EC7D 0F:EC6D: 20 2D CE  JSR $CE2D
C - - - - - 0x03EC80 0F:EC70: 68        PLA
C - - - - - 0x03EC81 0F:EC71: 20 03 80  JSR $8003
C - - - - - 0x03EC84 0F:EC74: 60        RTS
C - - - - - 0x03EC85 0F:EC75: 4D 16 05  EOR ram_0516
C - - - - - 0x03EC88 0F:EC78: 8D 16 05  STA ram_0516
C - - - - - 0x03EC8B 0F:EC7B: A9 00     LDA #$00
C - - - - - 0x03EC8D 0F:EC7D: 8D D2 05  STA ram_05D2
C - - - - - 0x03EC90 0F:EC80: A9 00     LDA #$00
C - - - - - 0x03EC92 0F:EC82: 85 0D     STA ram_000D
C - - - - - 0x03EC94 0F:EC84: 85 0E     STA ram_000E
C - - - - - 0x03EC96 0F:EC86: A9 00     LDA #$00
C - - - - - 0x03EC98 0F:EC88: 8D 16 05  STA ram_0516
C - - - - - 0x03EC9B 0F:EC8B: 60        RTS
C - - - - - 0x03EC9C 0F:EC8C: AD 16 05  LDA ram_0516
C - - - - - 0x03EC9F 0F:EC8F: 29 8F     AND #$8F
C - - - - - 0x03ECA1 0F:EC91: 8D 16 05  STA ram_0516
C - - - - - 0x03ECA4 0F:EC94: AD 23 05  LDA ram_0523
C - - - - - 0x03ECA7 0F:EC97: 8D 19 05  STA ram_0519
C - - - - - 0x03ECAA 0F:EC9A: AD 24 05  LDA ram_0524
C - - - - - 0x03ECAD 0F:EC9D: C9 FF     CMP #$FF
C - - - - - 0x03ECAF 0F:EC9F: F0 56     BEQ $ECF7
C - - - - - 0x03ECB1 0F:ECA1: A9 04     LDA #$04
C - - - - - 0x03ECB3 0F:ECA3: 2C 16 05  BIT ram_0516
C - - - - - 0x03ECB6 0F:ECA6: F0 0F     BEQ $ECB7
C - - - - - 0x03ECB8 0F:ECA8: 4D 16 05  EOR ram_0516
C - - - - - 0x03ECBB 0F:ECAB: 8D 16 05  STA ram_0516
C - - - - - 0x03ECBE 0F:ECAE: A9 00     LDA #$00
C - - - - - 0x03ECC0 0F:ECB0: 85 11     STA ram_0011
C - - - - - 0x03ECC2 0F:ECB2: 85 12     STA ram_0012
C - - - - - 0x03ECC4 0F:ECB4: 20 46 CC  JSR $CC46
C - - - - - 0x03ECC7 0F:ECB7: AD 26 05  LDA ram_0526
C - - - - - 0x03ECCA 0F:ECBA: 10 0E     BPL $ECCA
C - - - - - 0x03ECCC 0F:ECBC: 29 7F     AND #$7F
C - - - - - 0x03ECCE 0F:ECBE: 8D 26 05  STA ram_0526
C - - - - - 0x03ECD1 0F:ECC1: 8D 90 04  STA ram_0490
C - - - - - 0x03ECD4 0F:ECC4: AD 27 05  LDA ram_0527
C - - - - - 0x03ECD7 0F:ECC7: 8D 91 04  STA ram_0491
C - - - - - 0x03ECDA 0F:ECCA: AD 25 05  LDA ram_0525
C - - - - - 0x03ECDD 0F:ECCD: A2 00     LDX #$00
C - - - - - 0x03ECDF 0F:ECCF: 20 02 CC  JSR $CC02
C - - - - - 0x03ECE2 0F:ECD2: 20 D2 CC  JSR $CCD2
- D 3 - I - 0x03ECE5 0F:ECD5: 00        .byte $00   ; 
- D 3 - I - 0x03ECE6 0F:ECD6: 6C        .byte $6C   ; <l>
- D 3 - I - 0x03ECE7 0F:ECD7: 04        .byte $04   ; 
C - - - - - 0x03ECE8 0F:ECD8: AD CE 05  LDA ram_05CE
C - - - - - 0x03ECEB 0F:ECDB: 48        PHA
C - - - - - 0x03ECEC 0F:ECDC: A5 22     LDA ram_0022
C - - - - - 0x03ECEE 0F:ECDE: A9 0B     LDA #$0B
C - - - - - 0x03ECF0 0F:ECE0: 85 24     STA ram_0024
C - - - - - 0x03ECF2 0F:ECE2: A9 0C     LDA #$0C
C - - - - - 0x03ECF4 0F:ECE4: 85 25     STA ram_0025
C - - - - - 0x03ECF6 0F:ECE6: 20 2D CE  JSR $CE2D
C - - - - - 0x03ECF9 0F:ECE9: 68        PLA
C - - - - - 0x03ECFA 0F:ECEA: 20 06 80  JSR $8006
C - - - - - 0x03ECFD 0F:ECED: A9 00     LDA #$00
C - - - - - 0x03ECFF 0F:ECEF: 85 4A     STA ram_004A
C - - - - - 0x03ED01 0F:ECF1: AD D1 05  LDA ram_05D1
C - - - - - 0x03ED04 0F:ECF4: 8D D2 05  STA ram_05D2
C - - - - - 0x03ED07 0F:ECF7: AD 28 05  LDA ram_0528
C - - - - - 0x03ED0A 0F:ECFA: C9 FF     CMP #$FF
C - - - - - 0x03ED0C 0F:ECFC: F0 08     BEQ $ED06
C - - - - - 0x03ED0E 0F:ECFE: 8D 3C 05  STA ram_053C
C - - - - - 0x03ED11 0F:ED01: A9 80     LDA #$80
C - - - - - 0x03ED13 0F:ED03: 8D 3A 05  STA ram_053A
C - - - - - 0x03ED16 0F:ED06: A9 00     LDA #$00
C - - - - - 0x03ED18 0F:ED08: 85 0D     STA ram_000D
C - - - - - 0x03ED1A 0F:ED0A: 85 0E     STA ram_000E
C - - - - - 0x03ED1C 0F:ED0C: AD 2A 05  LDA ram_052A
C - - - - - 0x03ED1F 0F:ED0F: 8D 17 05  STA ram_0517
C - - - - - 0x03ED22 0F:ED12: AD 29 05  LDA ram_0529
C - - - - - 0x03ED25 0F:ED15: C9 FF     CMP #$FF
C - - - - - 0x03ED27 0F:ED17: F0 14     BEQ $ED2D
C - - - - - 0x03ED29 0F:ED19: 8D EA 05  STA ram_05EA
C - - - - - 0x03ED2C 0F:ED1C: A2 11     LDX #$11
C - - - - - 0x03ED2E 0F:ED1E: A9 C8     LDA #$C8
C - - - - - 0x03ED30 0F:ED20: 95 01     STA ram_0001,X
C - - - - - 0x03ED32 0F:ED22: A9 18     LDA #$18
C - - - - - 0x03ED34 0F:ED24: 95 02     STA ram_0002,X
C - - - - - 0x03ED36 0F:ED26: A9 7F     LDA #$7F
C - - - - - 0x03ED38 0F:ED28: A0 FF     LDY #$FF
C - - - - - 0x03ED3A 0F:ED2A: 20 E7 CA  JSR $CAE7
C - - - - - 0x03ED3D 0F:ED2D: AD 2B 05  LDA ram_052B
C - - - - - 0x03ED40 0F:ED30: 09 80     ORA #$80
C - - - - - 0x03ED42 0F:ED32: 8D 32 05  STA ram_0532
C - - - - - 0x03ED45 0F:ED35: AD 2C 05  LDA ram_052C
C - - - - - 0x03ED48 0F:ED38: 09 80     ORA #$80
C - - - - - 0x03ED4A 0F:ED3A: 8D 36 05  STA ram_0536
C - - - - - 0x03ED4D 0F:ED3D: AD 2D 05  LDA ram_052D
C - - - - - 0x03ED50 0F:ED40: 09 80     ORA #$80
C - - - - - 0x03ED52 0F:ED42: 8D 34 05  STA ram_0534
C - - - - - 0x03ED55 0F:ED45: AD 30 05  LDA ram_0530
C - - - - - 0x03ED58 0F:ED48: 8D 2E 05  STA ram_052E
C - - - - - 0x03ED5B 0F:ED4B: AD 31 05  LDA ram_0531
C - - - - - 0x03ED5E 0F:ED4E: 8D 2F 05  STA ram_052F
C - - - - - 0x03ED61 0F:ED51: A9 00     LDA #$00
C - - - - - 0x03ED63 0F:ED53: 85 8E     STA ram_008E
C - - - - - 0x03ED65 0F:ED55: A9 01     LDA #$01
C - - - - - 0x03ED67 0F:ED57: 8D 69 04  STA ram_0469
C - - - - - 0x03ED6A 0F:ED5A: 60        RTS
C D 3 - - - 0x03ED6B 0F:ED5B: CA        DEX
C - - - - - 0x03ED6C 0F:ED5C: 8E 19 05  STX ram_0519
C - - - - - 0x03ED6F 0F:ED5F: E0 28     CPX #$28
C - - - - - 0x03ED71 0F:ED61: B0 21     BCS $ED84
C - - - - - 0x03ED73 0F:ED63: AD 16 05  LDA ram_0516
C - - - - - 0x03ED76 0F:ED66: 29 20     AND #$20
C - - - - - 0x03ED78 0F:ED68: D0 1A     BNE $ED84
C - - - - - 0x03ED7A 0F:ED6A: AD 16 05  LDA ram_0516
C - - - - - 0x03ED7D 0F:ED6D: 09 20     ORA #$20
C - - - - - 0x03ED7F 0F:ED6F: 8D 16 05  STA ram_0516
C - - - - - 0x03ED82 0F:ED72: 48        PHA
C - - - - - 0x03ED83 0F:ED73: A5 22     LDA ram_0022
C - - - - - 0x03ED85 0F:ED75: A9 10     LDA #$10
C - - - - - 0x03ED87 0F:ED77: 85 24     STA ram_0024
C - - - - - 0x03ED89 0F:ED79: A9 11     LDA #$11
C - - - - - 0x03ED8B 0F:ED7B: 85 25     STA ram_0025
C - - - - - 0x03ED8D 0F:ED7D: 20 2D CE  JSR $CE2D
C - - - - - 0x03ED90 0F:ED80: 68        PLA
C - - - - - 0x03ED91 0F:ED81: 20 03 80  JSR $8003
C - - - - - 0x03ED94 0F:ED84: 60        RTS
C - - - - - 0x03ED95 0F:ED85: AD D2 05  LDA ram_05D2
C - - - - - 0x03ED98 0F:ED88: D0 01     BNE $ED8B
C - - - - - 0x03ED9A 0F:ED8A: 60        RTS
C - - - - - 0x03ED9B 0F:ED8B: 10 68     BPL $EDF5
C - - - - - 0x03ED9D 0F:ED8D: 29 7F     AND #$7F
C - - - - - 0x03ED9F 0F:ED8F: 09 01     ORA #$01
C - - - - - 0x03EDA1 0F:ED91: 8D D2 05  STA ram_05D2
C - - - - - 0x03EDA4 0F:ED94: AD DB 05  LDA ram_05DB
C - - - - - 0x03EDA7 0F:ED97: 8D D3 05  STA ram_05D3
C - - - - - 0x03EDAA 0F:ED9A: AD DC 05  LDA ram_05DC
C - - - - - 0x03EDAD 0F:ED9D: 8D D4 05  STA ram_05D4
C - - - - - 0x03EDB0 0F:EDA0: AD DD 05  LDA ram_05DD
C - - - - - 0x03EDB3 0F:EDA3: 8D D5 05  STA ram_05D5
C - - - - - 0x03EDB6 0F:EDA6: AE DE 05  LDX ram_05DE
C - - - - - 0x03EDB9 0F:EDA9: AC DF 05  LDY ram_05DF
C - - - - - 0x03EDBC 0F:EDAC: 8E D6 05  STX ram_05D6
C - - - - - 0x03EDBF 0F:EDAF: 8C D7 05  STY ram_05D7
C - - - - - 0x03EDC2 0F:EDB2: AD E0 05  LDA ram_05E0
C - - - - - 0x03EDC5 0F:EDB5: 8D D8 05  STA ram_05D8
C - - - - - 0x03EDC8 0F:EDB8: AD E1 05  LDA ram_05E1
C - - - - - 0x03EDCB 0F:EDBB: 8D D9 05  STA ram_05D9
C - - - - - 0x03EDCE 0F:EDBE: AD E2 05  LDA ram_05E2
C - - - - - 0x03EDD1 0F:EDC1: 8D DA 05  STA ram_05DA
C - - - - - 0x03EDD4 0F:EDC4: AD D2 05  LDA ram_05D2
C - - - - - 0x03EDD7 0F:EDC7: 29 02     AND #$02
C - - - - - 0x03EDD9 0F:EDC9: F0 2A     BEQ $EDF5
C - - - - - 0x03EDDB 0F:EDCB: 2C D2 05  BIT ram_05D2
C - - - - - 0x03EDDE 0F:EDCE: 50 14     BVC $EDE4
C - - - - - 0x03EDE0 0F:EDD0: A2 0D     LDX #$0D
C - - - - - 0x03EDE2 0F:EDD2: A9 A0     LDA #$A0
C - - - - - 0x03EDE4 0F:EDD4: 95 01     STA ram_0001,X
C - - - - - 0x03EDE6 0F:EDD6: A9 0B     LDA #$0B
C - - - - - 0x03EDE8 0F:EDD8: 95 02     STA ram_0002,X
C - - - - - 0x03EDEA 0F:EDDA: A9 7F     LDA #$7F
C - - - - - 0x03EDEC 0F:EDDC: A0 FF     LDY #$FF
C - - - - - 0x03EDEE 0F:EDDE: 20 E7 CA  JSR $CAE7
C - - - - - 0x03EDF1 0F:EDE1: 4C F5 ED  JMP $EDF5
C - - - - - 0x03EDF4 0F:EDE4: A2 0D     LDX #$0D
C - - - - - 0x03EDF6 0F:EDE6: A9 A0     LDA #$A0
C - - - - - 0x03EDF8 0F:EDE8: 95 01     STA ram_0001,X
C - - - - - 0x03EDFA 0F:EDEA: A9 0B     LDA #$0B
C - - - - - 0x03EDFC 0F:EDEC: 95 02     STA ram_0002,X
C - - - - - 0x03EDFE 0F:EDEE: A9 80     LDA #$80
C - - - - - 0x03EE00 0F:EDF0: A0 02     LDY #$02
C - - - - - 0x03EE02 0F:EDF2: 20 E7 CA  JSR $CAE7
C D 3 - - - 0x03EE05 0F:EDF5: 2C D2 05  BIT ram_05D2
C - - - - - 0x03EE08 0F:EDF8: 50 37     BVC $EE31
C - - - - - 0x03EE0A 0F:EDFA: 18        CLC
C - - - - - 0x03EE0B 0F:EDFB: AD D6 05  LDA ram_05D6
C - - - - - 0x03EE0E 0F:EDFE: 6D D3 05  ADC ram_05D3
C - - - - - 0x03EE11 0F:EE01: 8D D3 05  STA ram_05D3
C - - - - - 0x03EE14 0F:EE04: A2 00     LDX #$00
C - - - - - 0x03EE16 0F:EE06: AD D7 05  LDA ram_05D7
C - - - - - 0x03EE19 0F:EE09: 65 4B     ADC ram_004B
C - - - - - 0x03EE1B 0F:EE0B: 85 4B     STA ram_004B
C - - - - - 0x03EE1D 0F:EE0D: C9 F0     CMP #$F0
C - - - - - 0x03EE1F 0F:EE0F: 90 0F     BCC $EE20
C - - - - - 0x03EE21 0F:EE11: E8        INX
C - - - - - 0x03EE22 0F:EE12: A9 10     LDA #$10
C - - - - - 0x03EE24 0F:EE14: 2C D7 05  BIT ram_05D7
C - - - - - 0x03EE27 0F:EE17: 10 04     BPL $EE1D
C - - - - - 0x03EE29 0F:EE19: A9 F0     LDA #$F0
C - - - - - 0x03EE2B 0F:EE1B: CA        DEX
C - - - - - 0x03EE2C 0F:EE1C: CA        DEX
C - - - - - 0x03EE2D 0F:EE1D: 18        CLC
C - - - - - 0x03EE2E 0F:EE1E: 65 4B     ADC ram_004B
C - - - - - 0x03EE30 0F:EE20: 85 4B     STA ram_004B
C - - - - - 0x03EE32 0F:EE22: 8D D4 05  STA ram_05D4
C - - - - - 0x03EE35 0F:EE25: 18        CLC
C - - - - - 0x03EE36 0F:EE26: 8A        TXA
C - - - - - 0x03EE37 0F:EE27: 6D D5 05  ADC ram_05D5
C - - - - - 0x03EE3A 0F:EE2A: 8D D5 05  STA ram_05D5
C - - - - - 0x03EE3D 0F:EE2D: 20 6D EE  JSR $EE6D
C - - - - - 0x03EE40 0F:EE30: 60        RTS
C - - - - - 0x03EE41 0F:EE31: A5 20     LDA ram_0020
C - - - - - 0x03EE43 0F:EE33: 29 FE     AND #$FE
C - - - - - 0x03EE45 0F:EE35: 85 20     STA ram_0020
C - - - - - 0x03EE47 0F:EE37: 18        CLC
C - - - - - 0x03EE48 0F:EE38: AD D6 05  LDA ram_05D6
C - - - - - 0x03EE4B 0F:EE3B: 6D D3 05  ADC ram_05D3
C - - - - - 0x03EE4E 0F:EE3E: 8D D3 05  STA ram_05D3
C - - - - - 0x03EE51 0F:EE41: AD D7 05  LDA ram_05D7
C - - - - - 0x03EE54 0F:EE44: 6D D4 05  ADC ram_05D4
C - - - - - 0x03EE57 0F:EE47: 8D D4 05  STA ram_05D4
C - - - - - 0x03EE5A 0F:EE4A: 85 4A     STA ram_004A
C - - - - - 0x03EE5C 0F:EE4C: AA        TAX
C - - - - - 0x03EE5D 0F:EE4D: A9 00     LDA #$00
C - - - - - 0x03EE5F 0F:EE4F: 2C D7 05  BIT ram_05D7
C - - - - - 0x03EE62 0F:EE52: 10 02     BPL $EE56
C - - - - - 0x03EE64 0F:EE54: A9 FF     LDA #$FF
C - - - - - 0x03EE66 0F:EE56: 08        PHP
C - - - - - 0x03EE67 0F:EE57: AA        TAX
C - - - - - 0x03EE68 0F:EE58: 6D D5 05  ADC ram_05D5
C - - - - - 0x03EE6B 0F:EE5B: 8D D5 05  STA ram_05D5
C - - - - - 0x03EE6E 0F:EE5E: 29 01     AND #$01
C - - - - - 0x03EE70 0F:EE60: 05 20     ORA ram_0020
C - - - - - 0x03EE72 0F:EE62: 85 20     STA ram_0020
C - - - - - 0x03EE74 0F:EE64: 8A        TXA
C - - - - - 0x03EE75 0F:EE65: 28        PLP
C - - - - - 0x03EE76 0F:EE66: 69 00     ADC #$00
C - - - - - 0x03EE78 0F:EE68: AA        TAX
C - - - - - 0x03EE79 0F:EE69: 20 6D EE  JSR $EE6D
C - - - - - 0x03EE7C 0F:EE6C: 60        RTS
C - - - - - 0x03EE7D 0F:EE6D: AD D2 05  LDA ram_05D2
C - - - - - 0x03EE80 0F:EE70: 29 02     AND #$02
C - - - - - 0x03EE82 0F:EE72: F0 2A     BEQ $EE9E
C - - - - - 0x03EE84 0F:EE74: AE D4 05  LDX ram_05D4
C - - - - - 0x03EE87 0F:EE77: AC D5 05  LDY ram_05D5
C - - - - - 0x03EE8A 0F:EE7A: 10 0C     BPL $EE88
C - - - - - 0x03EE8C 0F:EE7C: 8A        TXA
C - - - - - 0x03EE8D 0F:EE7D: 49 FF     EOR #$FF
C - - - - - 0x03EE8F 0F:EE7F: AA        TAX
C - - - - - 0x03EE90 0F:EE80: 98        TYA
C - - - - - 0x03EE91 0F:EE81: 49 FF     EOR #$FF
C - - - - - 0x03EE93 0F:EE83: A8        TAY
C - - - - - 0x03EE94 0F:EE84: E8        INX
C - - - - - 0x03EE95 0F:EE85: D0 01     BNE $EE88
C - - - - - 0x03EE97 0F:EE87: C8        INY
C - - - - - 0x03EE98 0F:EE88: 8A        TXA
C - - - - - 0x03EE99 0F:EE89: 38        SEC
C - - - - - 0x03EE9A 0F:EE8A: ED D9 05  SBC ram_05D9
C - - - - - 0x03EE9D 0F:EE8D: 98        TYA
C - - - - - 0x03EE9E 0F:EE8E: ED DA 05  SBC ram_05DA
C - - - - - 0x03EEA1 0F:EE91: 90 0B     BCC $EE9E
C - - - - - 0x03EEA3 0F:EE93: A9 00     LDA #$00
C - - - - - 0x03EEA5 0F:EE95: 8D D2 05  STA ram_05D2
C - - - - - 0x03EEA8 0F:EE98: A9 00     LDA #$00
C - - - - - 0x03EEAA 0F:EE9A: 85 0D     STA ram_000D
C - - - - - 0x03EEAC 0F:EE9C: 85 0E     STA ram_000E
C - - - - - 0x03EEAE 0F:EE9E: 60        RTS
C - - - - - 0x03EEAF 0F:EE9F: 48        PHA
C - - - - - 0x03EEB0 0F:EEA0: A5 22     LDA ram_0022
C - - - - - 0x03EEB2 0F:EEA2: A9 14     LDA #$14
C - - - - - 0x03EEB4 0F:EEA4: 85 24     STA ram_0024
C - - - - - 0x03EEB6 0F:EEA6: A9 15     LDA #$15
C - - - - - 0x03EEB8 0F:EEA8: 85 25     STA ram_0025
C - - - - - 0x03EEBA 0F:EEAA: 20 2D CE  JSR $CE2D
C - - - - - 0x03EEBD 0F:EEAD: 68        PLA
C - - - - - 0x03EEBE 0F:EEAE: 20 00 80  JSR $8000
C - - - - - 0x03EEC1 0F:EEB1: A9 00     LDA #$00
C - - - - - 0x03EEC3 0F:EEB3: 85 3A     STA ram_003A
C - - - - - 0x03EEC5 0F:EEB5: 85 48     STA ram_0048
C - - - - - 0x03EEC7 0F:EEB7: AE 3D 05  LDX ram_053D
C - - - - - 0x03EECA 0F:EEBA: F0 1E     BEQ $EEDA
- - - - - - 0x03EECC 0F:EEBC: A9        .byte $A9   ; 
- - - - - - 0x03EECD 0F:EEBD: 40        .byte $40   ; 
- - - - - - 0x03EECE 0F:EEBE: 38        .byte $38   ; <8>
- - - - - - 0x03EECF 0F:EEBF: ED        .byte $ED   ; 
- - - - - - 0x03EED0 0F:EEC0: 3F        .byte $3F   ; 
- - - - - - 0x03EED1 0F:EEC1: 05        .byte $05   ; 
- - - - - - 0x03EED2 0F:EEC2: CD        .byte $CD   ; 
- - - - - - 0x03EED3 0F:EEC3: 3E        .byte $3E   ; 
- - - - - - 0x03EED4 0F:EEC4: 05        .byte $05   ; 
- - - - - - 0x03EED5 0F:EEC5: AD        .byte $AD   ; 
- - - - - - 0x03EED6 0F:EEC6: 3E        .byte $3E   ; 
- - - - - - 0x03EED7 0F:EEC7: 05        .byte $05   ; 
- - - - - - 0x03EED8 0F:EEC8: B0        .byte $B0   ; 
- - - - - - 0x03EED9 0F:EEC9: 02        .byte $02   ; 
- - - - - - 0x03EEDA 0F:EECA: A9        .byte $A9   ; 
- - - - - - 0x03EEDB 0F:EECB: 00        .byte $00   ; 
- - - - - - 0x03EEDC 0F:EECC: AA        .byte $AA   ; 
- - - - - - 0x03EEDD 0F:EECD: 18        .byte $18   ; 
- - - - - - 0x03EEDE 0F:EECE: 69        .byte $69   ; <i>
- - - - - - 0x03EEDF 0F:EECF: 08        .byte $08   ; 
- - - - - - 0x03EEE0 0F:EED0: 8D        .byte $8D   ; 
- - - - - - 0x03EEE1 0F:EED1: 3E        .byte $3E   ; 
- - - - - - 0x03EEE2 0F:EED2: 05        .byte $05   ; 
- - - - - - 0x03EEE3 0F:EED3: 8A        .byte $8A   ; 
- - - - - - 0x03EEE4 0F:EED4: 18        .byte $18   ; 
- - - - - - 0x03EEE5 0F:EED5: 6D        .byte $6D   ; <m>
- - - - - - 0x03EEE6 0F:EED6: 3F        .byte $3F   ; 
- - - - - - 0x03EEE7 0F:EED7: 05        .byte $05   ; 
- - - - - - 0x03EEE8 0F:EED8: 0A        .byte $0A   ; 
- - - - - - 0x03EEE9 0F:EED9: 0A        .byte $0A   ; 
C - - - - - 0x03EEEA 0F:EEDA: 85 3B     STA ram_003B
C - - - - - 0x03EEEC 0F:EEDC: A5 3A     LDA ram_003A
C - - - - - 0x03EEEE 0F:EEDE: 4A        LSR
C - - - - - 0x03EEEF 0F:EEDF: AA        TAX
C - - - - - 0x03EEF0 0F:EEE0: BD 43 05  LDA ram_0543,X
C - - - - - 0x03EEF3 0F:EEE3: B0 04     BCS $EEE9
C - - - - - 0x03EEF5 0F:EEE5: 4A        LSR
C - - - - - 0x03EEF6 0F:EEE6: 4A        LSR
C - - - - - 0x03EEF7 0F:EEE7: 4A        LSR
C - - - - - 0x03EEF8 0F:EEE8: 4A        LSR
C - - - - - 0x03EEF9 0F:EEE9: 29 0F     AND #$0F
C - - - - - 0x03EEFB 0F:EEEB: 0A        ASL
C - - - - - 0x03EEFC 0F:EEEC: AA        TAX
C - - - - - 0x03EEFD 0F:EEED: BD 73 EF  LDA $EF73,X
C - - - - - 0x03EF00 0F:EEF0: 85 3C     STA ram_003C
C - - - - - 0x03EF02 0F:EEF2: BD 74 EF  LDA $EF74,X
C - - - - - 0x03EF05 0F:EEF5: 85 3D     STA ram_003D
C - - - - - 0x03EF07 0F:EEF7: A0 00     LDY #$00
C - - - - - 0x03EF09 0F:EEF9: B1 3C     LDA (ram_003C),Y
C - - - - - 0x03EF0B 0F:EEFB: 10 3B     BPL $EF38
C - - - - - 0x03EF0D 0F:EEFD: 2C 15 06  BIT ram_0615
C - - - - - 0x03EF10 0F:EF00: 70 12     BVS $EF14
C - - - - - 0x03EF12 0F:EF02: 48        PHA
C - - - - - 0x03EF13 0F:EF03: A5 22     LDA ram_0022
C - - - - - 0x03EF15 0F:EF05: A9 14     LDA #$14
C - - - - - 0x03EF17 0F:EF07: 85 24     STA ram_0024
C - - - - - 0x03EF19 0F:EF09: A9 15     LDA #$15
C - - - - - 0x03EF1B 0F:EF0B: 85 25     STA ram_0025
C - - - - - 0x03EF1D 0F:EF0D: 20 2D CE  JSR $CE2D
C - - - - - 0x03EF20 0F:EF10: 68        PLA
C - - - - - 0x03EF21 0F:EF11: 20 06 80  JSR $8006
C - - - - - 0x03EF24 0F:EF14: 48        PHA
C - - - - - 0x03EF25 0F:EF15: A5 22     LDA ram_0022
C - - - - - 0x03EF27 0F:EF17: A9 14     LDA #$14
C - - - - - 0x03EF29 0F:EF19: 85 24     STA ram_0024
C - - - - - 0x03EF2B 0F:EF1B: A9 15     LDA #$15
C - - - - - 0x03EF2D 0F:EF1D: 85 25     STA ram_0025
C - - - - - 0x03EF2F 0F:EF1F: 20 2D CE  JSR $CE2D
C - - - - - 0x03EF32 0F:EF22: 68        PLA
C - - - - - 0x03EF33 0F:EF23: 20 03 80  JSR $8003
C - - - - - 0x03EF36 0F:EF26: 48        PHA
C - - - - - 0x03EF37 0F:EF27: A5 22     LDA ram_0022
C - - - - - 0x03EF39 0F:EF29: A9 16     LDA #$16
C - - - - - 0x03EF3B 0F:EF2B: 85 24     STA ram_0024
C - - - - - 0x03EF3D 0F:EF2D: A9 17     LDA #$17
C - - - - - 0x03EF3F 0F:EF2F: 85 25     STA ram_0025
C - - - - - 0x03EF41 0F:EF31: 20 2D CE  JSR $CE2D
C - - - - - 0x03EF44 0F:EF34: 68        PLA
C - - - - - 0x03EF45 0F:EF35: 20 00 80  JSR $8000
C - - - - - 0x03EF48 0F:EF38: E6 3A     INC ram_003A
C - - - - - 0x03EF4A 0F:EF3A: A5 3A     LDA ram_003A
C - - - - - 0x03EF4C 0F:EF3C: C9 06     CMP #$06
C - - - - - 0x03EF4E 0F:EF3E: D0 9C     BNE $EEDC
C - - - - - 0x03EF50 0F:EF40: 2C 2D 06  BIT ram_062D
C - - - - - 0x03EF53 0F:EF43: 10 12     BPL $EF57
C - - - - - 0x03EF55 0F:EF45: 48        PHA
C - - - - - 0x03EF56 0F:EF46: A5 22     LDA ram_0022
C - - - - - 0x03EF58 0F:EF48: A9 14     LDA #$14
C - - - - - 0x03EF5A 0F:EF4A: 85 24     STA ram_0024
C - - - - - 0x03EF5C 0F:EF4C: A9 15     LDA #$15
C - - - - - 0x03EF5E 0F:EF4E: 85 25     STA ram_0025
C - - - - - 0x03EF60 0F:EF50: 20 2D CE  JSR $CE2D
C - - - - - 0x03EF63 0F:EF53: 68        PLA
C - - - - - 0x03EF64 0F:EF54: 20 09 80  JSR $8009
C - - - - - 0x03EF67 0F:EF57: A9 40     LDA #$40
C - - - - - 0x03EF69 0F:EF59: 38        SEC
C - - - - - 0x03EF6A 0F:EF5A: E5 48     SBC ram_0048
C - - - - - 0x03EF6C 0F:EF5C: 8D 3F 05  STA ram_053F
C - - - - - 0x03EF6F 0F:EF5F: 90 11     BCC $EF72
C - - - - - 0x03EF71 0F:EF61: F0 0F     BEQ $EF72
C - - - - - 0x03EF73 0F:EF63: A8        TAY
C - - - - - 0x03EF74 0F:EF64: A6 3B     LDX ram_003B
C - - - - - 0x03EF76 0F:EF66: A9 F8     LDA #$F8
C - - - - - 0x03EF78 0F:EF68: 9D 00 02  STA ram_0200,X
C - - - - - 0x03EF7B 0F:EF6B: E8        INX
C - - - - - 0x03EF7C 0F:EF6C: E8        INX
C - - - - - 0x03EF7D 0F:EF6D: E8        INX
C - - - - - 0x03EF7E 0F:EF6E: E8        INX
C - - - - - 0x03EF7F 0F:EF6F: 88        DEY
C - - - - - 0x03EF80 0F:EF70: D0 F6     BNE $EF68
C - - - - - 0x03EF82 0F:EF72: 60        RTS
- D 3 - - - 0x03EF83 0F:EF73: 47        .byte $47   ; <G>
- D 3 - - - 0x03EF84 0F:EF74: 05        .byte $05   ; 
- D 3 - - - 0x03EF85 0F:EF75: 5C        .byte $5C   ; 
- D 3 - - - 0x03EF86 0F:EF76: 05        .byte $05   ; 
- D 3 - - - 0x03EF87 0F:EF77: 71        .byte $71   ; <q>
- D 3 - - - 0x03EF88 0F:EF78: 05        .byte $05   ; 
- D 3 - - - 0x03EF89 0F:EF79: 86        .byte $86   ; 
- D 3 - - - 0x03EF8A 0F:EF7A: 05        .byte $05   ; 
- D 3 - - - 0x03EF8B 0F:EF7B: 9B        .byte $9B   ; 
- D 3 - - - 0x03EF8C 0F:EF7C: 05        .byte $05   ; 
- D 3 - - - 0x03EF8D 0F:EF7D: B0        .byte $B0   ; 
- D 3 - - - 0x03EF8E 0F:EF7E: 05        .byte $05   ; 
C D 3 - - - 0x03EF8F 0F:EF7F: A8        TAY
C - - - - - 0x03EF90 0F:EF80: A5 24     LDA ram_0024
C - - - - - 0x03EF92 0F:EF82: 48        PHA
C - - - - - 0x03EF93 0F:EF83: A5 25     LDA ram_0025
C - - - - - 0x03EF95 0F:EF85: 48        PHA
C - - - - - 0x03EF96 0F:EF86: 98        TYA
C - - - - - 0x03EF97 0F:EF87: 48        PHA
C - - - - - 0x03EF98 0F:EF88: A5 22     LDA ram_0022
C - - - - - 0x03EF9A 0F:EF8A: A9 18     LDA #$18
C - - - - - 0x03EF9C 0F:EF8C: 85 24     STA ram_0024
C - - - - - 0x03EF9E 0F:EF8E: A9 19     LDA #$19
C - - - - - 0x03EFA0 0F:EF90: 85 25     STA ram_0025
C - - - - - 0x03EFA2 0F:EF92: 20 2D CE  JSR $CE2D
C - - - - - 0x03EFA5 0F:EF95: 68        PLA
C - - - - - 0x03EFA6 0F:EF96: 20 0C 80  JSR $800C
C - - - - - 0x03EFA9 0F:EF99: 68        PLA
C - - - - - 0x03EFAA 0F:EF9A: 85 25     STA ram_0025
C - - - - - 0x03EFAC 0F:EF9C: 68        PLA
C - - - - - 0x03EFAD 0F:EF9D: 85 24     STA ram_0024
C - - - - - 0x03EFAF 0F:EF9F: 4C 2D CE  JMP $CE2D
C - - - - - 0x03EFB2 0F:EFA2: AD 21 06  LDA ram_0621
C - - - - - 0x03EFB5 0F:EFA5: C9 04     CMP #$04
C - - - - - 0x03EFB7 0F:EFA7: 90 01     BCC $EFAA
C - - - - - 0x03EFB9 0F:EFA9: 60        RTS
C - - - - - 0x03EFBA 0F:EFAA: AD 00 06  LDA ram_0600
C - - - - - 0x03EFBD 0F:EFAD: D0 03     BNE $EFB2
C - - - - - 0x03EFBF 0F:EFAF: 4C F6 EF  JMP $EFF6
C - - - - - 0x03EFC2 0F:EFB2: A9 00     LDA #$00
C - - - - - 0x03EFC4 0F:EFB4: 48        PHA
C - - - - - 0x03EFC5 0F:EFB5: A9 01     LDA #$01
C - - - - - 0x03EFC7 0F:EFB7: 20 0F CB  JSR $CB0F
C - - - - - 0x03EFCA 0F:EFBA: AD 15 05  LDA ram_0515
C - - - - - 0x03EFCD 0F:EFBD: D0 F6     BNE $EFB5
C - - - - - 0x03EFCF 0F:EFBF: A9 01     LDA #$01
C - - - - - 0x03EFD1 0F:EFC1: 8D 15 05  STA ram_0515
C - - - - - 0x03EFD4 0F:EFC4: 68        PLA
C - - - - - 0x03EFD5 0F:EFC5: 48        PHA
C - - - - - 0x03EFD6 0F:EFC6: AE 21 06  LDX ram_0621
C - - - - - 0x03EFD9 0F:EFC9: E0 03     CPX #$03
C - - - - - 0x03EFDB 0F:EFCB: D0 02     BNE $EFCF
C - - - - - 0x03EFDD 0F:EFCD: A9 05     LDA #$05
C - - - - - 0x03EFDF 0F:EFCF: 0A        ASL
C - - - - - 0x03EFE0 0F:EFD0: AA        TAX
C - - - - - 0x03EFE1 0F:EFD1: BD 06 F2  LDA $F206,X
C - - - - - 0x03EFE4 0F:EFD4: 85 3A     STA ram_003A
C - - - - - 0x03EFE6 0F:EFD6: BD 07 F2  LDA $F207,X
C - - - - - 0x03EFE9 0F:EFD9: 85 3B     STA ram_003B
C - - - - - 0x03EFEB 0F:EFDB: A9 00     LDA #$00
C - - - - - 0x03EFED 0F:EFDD: 85 3C     STA ram_003C
C - - - - - 0x03EFEF 0F:EFDF: A9 21     LDA #$21
C - - - - - 0x03EFF1 0F:EFE1: 85 3D     STA ram_003D
C - - - - - 0x03EFF3 0F:EFE3: A2 00     LDX #$00
C - - - - - 0x03EFF5 0F:EFE5: 20 14 F1  JSR $F114
C - - - - - 0x03EFF8 0F:EFE8: A9 04     LDA #$04
C - - - - - 0x03EFFA 0F:EFEA: 20 0F CB  JSR $CB0F
C - - - - - 0x03EFFD 0F:EFED: 68        PLA
C - - - - - 0x03EFFE 0F:EFEE: 18        CLC
C - - - - - 0x03EFFF 0F:EFEF: 69 01     ADC #$01
C - - - - - 0x03F001 0F:EFF1: CD 00 06  CMP ram_0600
C - - - - - 0x03F004 0F:EFF4: D0 BE     BNE $EFB4
C D 3 - - - 0x03F006 0F:EFF6: AE 21 06  LDX ram_0621
C - - - - - 0x03F009 0F:EFF9: BD 0F F0  LDA $F00F,X
C - - - - - 0x03F00C 0F:EFFC: 8D 3D 06  STA ram_063D
C - - - - - 0x03F00F 0F:EFFF: 8A        TXA
C - - - - - 0x03F010 0F:F000: D0 11     BNE $F013
C - - - - - 0x03F012 0F:F002: AD 00 06  LDA ram_0600
C - - - - - 0x03F015 0F:F005: D0 0C     BNE $F013
C - - - - - 0x03F017 0F:F007: A9 02     LDA #$02
C - - - - - 0x03F019 0F:F009: 8D 3D 06  STA ram_063D
C - - - - - 0x03F01C 0F:F00C: 4C 13 F0  JMP $F013
- D 3 - - - 0x03F01F 0F:F00F: 00        .byte $00   ; 
- D 3 - - - 0x03F020 0F:F010: 00        .byte $00   ; 
- D 3 - - - 0x03F021 0F:F011: 01        .byte $01   ; 
- D 3 - - - 0x03F022 0F:F012: 00        .byte $00   ; 
C D 3 - - - 0x03F023 0F:F013: A9 00     LDA #$00
C D 3 - - - 0x03F025 0F:F015: 48        PHA
C - - - - - 0x03F026 0F:F016: A9 01     LDA #$01
C - - - - - 0x03F028 0F:F018: 20 0F CB  JSR $CB0F
C - - - - - 0x03F02B 0F:F01B: AD 15 05  LDA ram_0515
C - - - - - 0x03F02E 0F:F01E: D0 F6     BNE $F016
C - - - - - 0x03F030 0F:F020: A9 01     LDA #$01
C - - - - - 0x03F032 0F:F022: 8D 15 05  STA ram_0515
C - - - - - 0x03F035 0F:F025: AD 3D 06  LDA ram_063D
C - - - - - 0x03F038 0F:F028: 0A        ASL
C - - - - - 0x03F039 0F:F029: 0A        ASL
C - - - - - 0x03F03A 0F:F02A: A8        TAY
C - - - - - 0x03F03B 0F:F02B: B9 5A F1  LDA $F15A,Y
C - - - - - 0x03F03E 0F:F02E: 85 3C     STA ram_003C
C - - - - - 0x03F040 0F:F030: B9 5B F1  LDA $F15B,Y
C - - - - - 0x03F043 0F:F033: 85 3D     STA ram_003D
C - - - - - 0x03F045 0F:F035: 68        PLA
C - - - - - 0x03F046 0F:F036: 48        PHA
C - - - - - 0x03F047 0F:F037: AA        TAX
C - - - - - 0x03F048 0F:F038: 18        CLC
C - - - - - 0x03F049 0F:F039: B9 5C F1  LDA $F15C,Y
C - - - - - 0x03F04C 0F:F03C: 7D 0E F1  ADC $F10E,X
C - - - - - 0x03F04F 0F:F03F: 8D A6 04  STA ram_04A6
C - - - - - 0x03F052 0F:F042: AD 3D 06  LDA ram_063D
C - - - - - 0x03F055 0F:F045: C9 03     CMP #$03
C - - - - - 0x03F057 0F:F047: F0 18     BEQ $F061
C - - - - - 0x03F059 0F:F049: AD CE 05  LDA ram_05CE
C - - - - - 0x03F05C 0F:F04C: 29 20     AND #$20
C - - - - - 0x03F05E 0F:F04E: 0D A6 04  ORA ram_04A6
C - - - - - 0x03F061 0F:F051: 8D A6 04  STA ram_04A6
C - - - - - 0x03F064 0F:F054: AD CE 05  LDA ram_05CE
C - - - - - 0x03F067 0F:F057: 4A        LSR
C - - - - - 0x03F068 0F:F058: 4A        LSR
C - - - - - 0x03F069 0F:F059: 4A        LSR
C - - - - - 0x03F06A 0F:F05A: 4A        LSR
C - - - - - 0x03F06B 0F:F05B: 19 5D F1  ORA $F15D,Y
C - - - - - 0x03F06E 0F:F05E: 4C 64 F0  JMP $F064
C - - - - - 0x03F071 0F:F061: B9 5D F1  LDA $F15D,Y
C D 3 - - - 0x03F074 0F:F064: 8D A7 04  STA ram_04A7
C - - - - - 0x03F077 0F:F067: A9 01     LDA #$01
C - - - - - 0x03F079 0F:F069: 8D A5 04  STA ram_04A5
C - - - - - 0x03F07C 0F:F06C: AD 3D 06  LDA ram_063D
C - - - - - 0x03F07F 0F:F06F: 0A        ASL
C - - - - - 0x03F080 0F:F070: 85 3B     STA ram_003B
C - - - - - 0x03F082 0F:F072: 0A        ASL
C - - - - - 0x03F083 0F:F073: 65 3B     ADC ram_003B
C - - - - - 0x03F085 0F:F075: 85 3B     STA ram_003B
C - - - - - 0x03F087 0F:F077: 8A        TXA
C - - - - - 0x03F088 0F:F078: 65 3B     ADC ram_003B
C - - - - - 0x03F08A 0F:F07A: AA        TAX
C - - - - - 0x03F08B 0F:F07B: BD 6A F1  LDA $F16A,X
C - - - - - 0x03F08E 0F:F07E: 8D A8 04  STA ram_04A8
C - - - - - 0x03F091 0F:F081: 68        PLA
C - - - - - 0x03F092 0F:F082: 48        PHA
C - - - - - 0x03F093 0F:F083: 0A        ASL
C - - - - - 0x03F094 0F:F084: AA        TAX
C - - - - - 0x03F095 0F:F085: BD 82 F1  LDA $F182,X
C - - - - - 0x03F098 0F:F088: 85 3A     STA ram_003A
C - - - - - 0x03F09A 0F:F08A: BD 83 F1  LDA $F183,X
C - - - - - 0x03F09D 0F:F08D: 85 3B     STA ram_003B
C - - - - - 0x03F09F 0F:F08F: A2 04     LDX #$04
C - - - - - 0x03F0A1 0F:F091: 20 14 F1  JSR $F114
C - - - - - 0x03F0A4 0F:F094: 68        PLA
C - - - - - 0x03F0A5 0F:F095: 18        CLC
C - - - - - 0x03F0A6 0F:F096: 69 01     ADC #$01
C - - - - - 0x03F0A8 0F:F098: C9 06     CMP #$06
C - - - - - 0x03F0AA 0F:F09A: F0 03     BEQ $F09F
C - - - - - 0x03F0AC 0F:F09C: 4C 15 F0  JMP $F015
C - - - - - 0x03F0AF 0F:F09F: AD 3D 06  LDA ram_063D
C - - - - - 0x03F0B2 0F:F0A2: C9 03     CMP #$03
C - - - - - 0x03F0B4 0F:F0A4: F0 67     BEQ $F10D
C - - - - - 0x03F0B6 0F:F0A6: A9 01     LDA #$01
C - - - - - 0x03F0B8 0F:F0A8: 20 0F CB  JSR $CB0F
C - - - - - 0x03F0BB 0F:F0AB: AD 15 05  LDA ram_0515
C - - - - - 0x03F0BE 0F:F0AE: D0 F6     BNE $F0A6
C - - - - - 0x03F0C0 0F:F0B0: A9 01     LDA #$01
C - - - - - 0x03F0C2 0F:F0B2: 8D 15 05  STA ram_0515
C - - - - - 0x03F0C5 0F:F0B5: A9 01     LDA #$01
C - - - - - 0x03F0C7 0F:F0B7: 8D A5 04  STA ram_04A5
C - - - - - 0x03F0CA 0F:F0BA: A9 A2     LDA #$A2
C - - - - - 0x03F0CC 0F:F0BC: 8D A8 04  STA ram_04A8
C - - - - - 0x03F0CF 0F:F0BF: A9 00     LDA #$00
C - - - - - 0x03F0D1 0F:F0C1: 85 3B     STA ram_003B
C - - - - - 0x03F0D3 0F:F0C3: 8D A9 04  STA ram_04A9
C - - - - - 0x03F0D6 0F:F0C6: AD 3D 06  LDA ram_063D
C - - - - - 0x03F0D9 0F:F0C9: 0A        ASL
C - - - - - 0x03F0DA 0F:F0CA: 0A        ASL
C - - - - - 0x03F0DB 0F:F0CB: AA        TAX
C - - - - - 0x03F0DC 0F:F0CC: AD 37 06  LDA ram_0637
C - - - - - 0x03F0DF 0F:F0CF: 38        SEC
C - - - - - 0x03F0E0 0F:F0D0: E9 50     SBC #$50
C - - - - - 0x03F0E2 0F:F0D2: 29 F0     AND #$F0
C - - - - - 0x03F0E4 0F:F0D4: 0A        ASL
C - - - - - 0x03F0E5 0F:F0D5: 85 3A     STA ram_003A
C - - - - - 0x03F0E7 0F:F0D7: 26 3B     ROL ram_003B
C - - - - - 0x03F0E9 0F:F0D9: AD 35 06  LDA ram_0635
C - - - - - 0x03F0EC 0F:F0DC: 38        SEC
C - - - - - 0x03F0ED 0F:F0DD: E9 30     SBC #$30
C - - - - - 0x03F0EF 0F:F0DF: 4A        LSR
C - - - - - 0x03F0F0 0F:F0E0: 4A        LSR
C - - - - - 0x03F0F1 0F:F0E1: 4A        LSR
C - - - - - 0x03F0F2 0F:F0E2: 4A        LSR
C - - - - - 0x03F0F3 0F:F0E3: 18        CLC
C - - - - - 0x03F0F4 0F:F0E4: 65 3A     ADC ram_003A
C - - - - - 0x03F0F6 0F:F0E6: 85 3A     STA ram_003A
C - - - - - 0x03F0F8 0F:F0E8: 90 02     BCC $F0EC
- - - - - - 0x03F0FA 0F:F0EA: E6        .byte $E6   ; 
- - - - - - 0x03F0FB 0F:F0EB: 3B        .byte $3B   ; 
C - - - - - 0x03F0FC 0F:F0EC: 18        CLC
C - - - - - 0x03F0FD 0F:F0ED: 7D 5A F1  ADC $F15A,X
C - - - - - 0x03F100 0F:F0F0: 8D A6 04  STA ram_04A6
C - - - - - 0x03F103 0F:F0F3: BD 5B F1  LDA $F15B,X
C - - - - - 0x03F106 0F:F0F6: 65 3B     ADC ram_003B
C - - - - - 0x03F108 0F:F0F8: 8D A7 04  STA ram_04A7
C - - - - - 0x03F10B 0F:F0FB: AD CE 05  LDA ram_05CE
C - - - - - 0x03F10E 0F:F0FE: 4A        LSR
C - - - - - 0x03F10F 0F:F0FF: 4A        LSR
C - - - - - 0x03F110 0F:F100: 4A        LSR
C - - - - - 0x03F111 0F:F101: 4A        LSR
C - - - - - 0x03F112 0F:F102: 0D A7 04  ORA ram_04A7
C - - - - - 0x03F115 0F:F105: 8D A7 04  STA ram_04A7
C - - - - - 0x03F118 0F:F108: A9 80     LDA #$80
C - - - - - 0x03F11A 0F:F10A: 8D 15 05  STA ram_0515
C - - - - - 0x03F11D 0F:F10D: 60        RTS
- D 3 - - - 0x03F11E 0F:F10E: 00        .byte $00   ; 
- D 3 - - - 0x03F11F 0F:F10F: 01        .byte $01   ; 
- D 3 - - - 0x03F120 0F:F110: 02        .byte $02   ; 
- D 3 - - - 0x03F121 0F:F111: 08        .byte $08   ; 
- D 3 - - - 0x03F122 0F:F112: 09        .byte $09   ; 
- D 3 - - - 0x03F123 0F:F113: 0A        .byte $0A   ; 
C - - - - - 0x03F124 0F:F114: A0 00     LDY #$00
C - - - - - 0x03F126 0F:F116: B1 3A     LDA (ram_003A),Y
C - - - - - 0x03F128 0F:F118: 9D A5 04  STA ram_04A5,X
C - - - - - 0x03F12B 0F:F11B: F0 37     BEQ $F154
C - - - - - 0x03F12D 0F:F11D: 85 3E     STA ram_003E
C - - - - - 0x03F12F 0F:F11F: C8        INY
C - - - - - 0x03F130 0F:F120: B1 3A     LDA (ram_003A),Y
C - - - - - 0x03F132 0F:F122: 18        CLC
C - - - - - 0x03F133 0F:F123: 65 3C     ADC ram_003C
C - - - - - 0x03F135 0F:F125: 9D A6 04  STA ram_04A6,X
C - - - - - 0x03F138 0F:F128: 08        PHP
C - - - - - 0x03F139 0F:F129: C8        INY
C - - - - - 0x03F13A 0F:F12A: A5 3D     LDA ram_003D
C - - - - - 0x03F13C 0F:F12C: C9 22     CMP #$22
C - - - - - 0x03F13E 0F:F12E: 90 04     BCC $F134
C - - - - - 0x03F140 0F:F130: A9 00     LDA #$00
C - - - - - 0x03F142 0F:F132: F0 07     BEQ $F13B
C - - - - - 0x03F144 0F:F134: AD CE 05  LDA ram_05CE
C - - - - - 0x03F147 0F:F137: 4A        LSR
C - - - - - 0x03F148 0F:F138: 4A        LSR
C - - - - - 0x03F149 0F:F139: 4A        LSR
C - - - - - 0x03F14A 0F:F13A: 4A        LSR
C - - - - - 0x03F14B 0F:F13B: 11 3A     ORA (ram_003A),Y
C - - - - - 0x03F14D 0F:F13D: 28        PLP
C - - - - - 0x03F14E 0F:F13E: 65 3D     ADC ram_003D
C - - - - - 0x03F150 0F:F140: 9D A7 04  STA ram_04A7,X
C - - - - - 0x03F153 0F:F143: C8        INY
C - - - - - 0x03F154 0F:F144: E8        INX
C - - - - - 0x03F155 0F:F145: E8        INX
C - - - - - 0x03F156 0F:F146: E8        INX
C - - - - - 0x03F157 0F:F147: B1 3A     LDA (ram_003A),Y
C - - - - - 0x03F159 0F:F149: 9D A5 04  STA ram_04A5,X
C - - - - - 0x03F15C 0F:F14C: C8        INY
C - - - - - 0x03F15D 0F:F14D: E8        INX
C - - - - - 0x03F15E 0F:F14E: C6 3E     DEC ram_003E
C - - - - - 0x03F160 0F:F150: D0 F5     BNE $F147
C - - - - - 0x03F162 0F:F152: F0 C2     BEQ $F116
C - - - - - 0x03F164 0F:F154: A9 80     LDA #$80
C - - - - - 0x03F166 0F:F156: 8D 15 05  STA ram_0515
C - - - - - 0x03F169 0F:F159: 60        RTS
- D 3 - - - 0x03F16A 0F:F15A: 42        .byte $42   ; <B>
- D 3 - - - 0x03F16B 0F:F15B: 20        .byte $20   ; 
- D 3 - - - 0x03F16C 0F:F15C: C0        .byte $C0   ; 
- D 3 - - - 0x03F16D 0F:F15D: 23        .byte $23   ; 
- D 3 - - - 0x03F16E 0F:F15E: 42        .byte $42   ; <B>
- D 3 - - - 0x03F16F 0F:F15F: 20        .byte $20   ; 
- D 3 - - - 0x03F170 0F:F160: C0        .byte $C0   ; 
- D 3 - - - 0x03F171 0F:F161: 23        .byte $23   ; 
- D 3 - - - 0x03F172 0F:F162: 42        .byte $42   ; <B>
- D 3 - - - 0x03F173 0F:F163: 20        .byte $20   ; 
- D 3 - - - 0x03F174 0F:F164: C0        .byte $C0   ; 
- D 3 - - - 0x03F175 0F:F165: 23        .byte $23   ; 
- D 3 - - - 0x03F176 0F:F166: B4        .byte $B4   ; 
- D 3 - - - 0x03F177 0F:F167: 22        .byte $22   ; 
- D 3 - - - 0x03F178 0F:F168: ED        .byte $ED   ; 
- D 3 - - - 0x03F179 0F:F169: 23        .byte $23   ; 
- D 3 - - - 0x03F17A 0F:F16A: 3A        .byte $3A   ; 
- D 3 - - - 0x03F17B 0F:F16B: 0A        .byte $0A   ; 
- D 3 - - - 0x03F17C 0F:F16C: 0A        .byte $0A   ; 
- D 3 - - - 0x03F17D 0F:F16D: 03        .byte $03   ; 
- D 3 - - - 0x03F17E 0F:F16E: 00        .byte $00   ; 
- D 3 - - - 0x03F17F 0F:F16F: 00        .byte $00   ; 
- D 3 - - - 0x03F180 0F:F170: 3F        .byte $3F   ; 
- D 3 - - - 0x03F181 0F:F171: 0F        .byte $0F   ; 
- D 3 - - - 0x03F182 0F:F172: 0F        .byte $0F   ; 
- D 3 - - - 0x03F183 0F:F173: 03        .byte $03   ; 
- D 3 - - - 0x03F184 0F:F174: 00        .byte $00   ; 
- D 3 - - - 0x03F185 0F:F175: 00        .byte $00   ; 
- D 3 - - - 0x03F186 0F:F176: 2A        .byte $2A   ; 
- D 3 - - - 0x03F187 0F:F177: 0A        .byte $0A   ; 
- D 3 - - - 0x03F188 0F:F178: 0A        .byte $0A   ; 
- D 3 - - - 0x03F189 0F:F179: 22        .byte $22   ; 
- D 3 - - - 0x03F18A 0F:F17A: 00        .byte $00   ; 
- D 3 - - - 0x03F18B 0F:F17B: 00        .byte $00   ; 
- D 3 - - - 0x03F18C 0F:F17C: 00        .byte $00   ; 
- D 3 - - - 0x03F18D 0F:F17D: 00        .byte $00   ; 
- D 3 - - - 0x03F18E 0F:F17E: 00        .byte $00   ; 
- D 3 - - - 0x03F18F 0F:F17F: 00        .byte $00   ; 
- D 3 - - - 0x03F190 0F:F180: 00        .byte $00   ; 
- D 3 - - - 0x03F191 0F:F181: 00        .byte $00   ; 
- D 3 - - - 0x03F192 0F:F182: 8E        .byte $8E   ; 
- D 3 - - - 0x03F193 0F:F183: F1        .byte $F1   ; 
- D 3 - - - 0x03F194 0F:F184: 99        .byte $99   ; 
- D 3 - - - 0x03F195 0F:F185: F1        .byte $F1   ; 
- D 3 - - - 0x03F196 0F:F186: A8        .byte $A8   ; 
- D 3 - - - 0x03F197 0F:F187: F1        .byte $F1   ; 
- D 3 - - - 0x03F198 0F:F188: B7        .byte $B7   ; 
- D 3 - - - 0x03F199 0F:F189: F1        .byte $F1   ; 
- D 3 - - - 0x03F19A 0F:F18A: CC        .byte $CC   ; 
- D 3 - - - 0x03F19B 0F:F18B: F1        .byte $F1   ; 
- D 3 - - - 0x03F19C 0F:F18C: E9        .byte $E9   ; 
- D 3 - - - 0x03F19D 0F:F18D: F1        .byte $F1   ; 
- D 3 - I - 0x03F19E 0F:F18E: 02        .byte $02   ; 
- D 3 - I - 0x03F19F 0F:F18F: 00        .byte $00   ; 
- D 3 - I - 0x03F1A0 0F:F190: 00        .byte $00   ; 
- D 3 - I - 0x03F1A1 0F:F191: 98        .byte $98   ; 
- D 3 - I - 0x03F1A2 0F:F192: AC        .byte $AC   ; 
- D 3 - I - 0x03F1A3 0F:F193: 02        .byte $02   ; 
- D 3 - I - 0x03F1A4 0F:F194: 20        .byte $20   ; 
- D 3 - I - 0x03F1A5 0F:F195: 00        .byte $00   ; 
- D 3 - I - 0x03F1A6 0F:F196: 98        .byte $98   ; 
- D 3 - I - 0x03F1A7 0F:F197: 99        .byte $99   ; 
- D 3 - I - 0x03F1A8 0F:F198: 00        .byte $00   ; 
- D 3 - I - 0x03F1A9 0F:F199: 04        .byte $04   ; 
- D 3 - I - 0x03F1AA 0F:F19A: 02        .byte $02   ; 
- D 3 - I - 0x03F1AB 0F:F19B: 00        .byte $00   ; 
- D 3 - I - 0x03F1AC 0F:F19C: AC        .byte $AC   ; 
- D 3 - I - 0x03F1AD 0F:F19D: AC        .byte $AC   ; 
- D 3 - I - 0x03F1AE 0F:F19E: 99        .byte $99   ; 
- D 3 - I - 0x03F1AF 0F:F19F: AC        .byte $AC   ; 
- D 3 - I - 0x03F1B0 0F:F1A0: 04        .byte $04   ; 
- D 3 - I - 0x03F1B1 0F:F1A1: 22        .byte $22   ; 
- D 3 - I - 0x03F1B2 0F:F1A2: 00        .byte $00   ; 
- D 3 - I - 0x03F1B3 0F:F1A3: A0        .byte $A0   ; 
- D 3 - I - 0x03F1B4 0F:F1A4: A0        .byte $A0   ; 
- D 3 - I - 0x03F1B5 0F:F1A5: AF        .byte $AF   ; 
- D 3 - I - 0x03F1B6 0F:F1A6: A0        .byte $A0   ; 
- D 3 - I - 0x03F1B7 0F:F1A7: 00        .byte $00   ; 
- D 3 - I - 0x03F1B8 0F:F1A8: 04        .byte $04   ; 
- D 3 - I - 0x03F1B9 0F:F1A9: 06        .byte $06   ; 
- D 3 - I - 0x03F1BA 0F:F1AA: 00        .byte $00   ; 
- D 3 - I - 0x03F1BB 0F:F1AB: AC        .byte $AC   ; 
- D 3 - I - 0x03F1BC 0F:F1AC: AC        .byte $AC   ; 
- D 3 - I - 0x03F1BD 0F:F1AD: AC        .byte $AC   ; 
- D 3 - I - 0x03F1BE 0F:F1AE: 99        .byte $99   ; 
- D 3 - I - 0x03F1BF 0F:F1AF: 04        .byte $04   ; 
- D 3 - I - 0x03F1C0 0F:F1B0: 26        .byte $26   ; 
- D 3 - I - 0x03F1C1 0F:F1B1: 00        .byte $00   ; 
- D 3 - I - 0x03F1C2 0F:F1B2: A0        .byte $A0   ; 
- D 3 - I - 0x03F1C3 0F:F1B3: A0        .byte $A0   ; 
- D 3 - I - 0x03F1C4 0F:F1B4: 98        .byte $98   ; 
- D 3 - I - 0x03F1C5 0F:F1B5: 99        .byte $99   ; 
- D 3 - I - 0x03F1C6 0F:F1B6: 00        .byte $00   ; 
- D 3 - I - 0x03F1C7 0F:F1B7: 02        .byte $02   ; 
- D 3 - I - 0x03F1C8 0F:F1B8: 40        .byte $40   ; 
- D 3 - I - 0x03F1C9 0F:F1B9: 00        .byte $00   ; 
- D 3 - I - 0x03F1CA 0F:F1BA: A1        .byte $A1   ; 
- D 3 - I - 0x03F1CB 0F:F1BB: AF        .byte $AF   ; 
- D 3 - I - 0x03F1CC 0F:F1BC: 02        .byte $02   ; 
- D 3 - I - 0x03F1CD 0F:F1BD: 60        .byte $60   ; 
- D 3 - I - 0x03F1CE 0F:F1BE: 00        .byte $00   ; 
- D 3 - I - 0x03F1CF 0F:F1BF: A3        .byte $A3   ; 
- D 3 - I - 0x03F1D0 0F:F1C0: AF        .byte $AF   ; 
- D 3 - I - 0x03F1D1 0F:F1C1: 02        .byte $02   ; 
- D 3 - I - 0x03F1D2 0F:F1C2: 80        .byte $80   ; 
- D 3 - I - 0x03F1D3 0F:F1C3: 00        .byte $00   ; 
- D 3 - I - 0x03F1D4 0F:F1C4: 9A        .byte $9A   ; 
- D 3 - I - 0x03F1D5 0F:F1C5: 9B        .byte $9B   ; 
- D 3 - I - 0x03F1D6 0F:F1C6: 02        .byte $02   ; 
- D 3 - I - 0x03F1D7 0F:F1C7: A0        .byte $A0   ; 
- D 3 - I - 0x03F1D8 0F:F1C8: 00        .byte $00   ; 
- D 3 - I - 0x03F1D9 0F:F1C9: 9A        .byte $9A   ; 
- D 3 - I - 0x03F1DA 0F:F1CA: AD        .byte $AD   ; 
- D 3 - I - 0x03F1DB 0F:F1CB: 00        .byte $00   ; 
- D 3 - I - 0x03F1DC 0F:F1CC: 04        .byte $04   ; 
- D 3 - I - 0x03F1DD 0F:F1CD: 42        .byte $42   ; <B>
- D 3 - I - 0x03F1DE 0F:F1CE: 00        .byte $00   ; 
- D 3 - I - 0x03F1DF 0F:F1CF: A0        .byte $A0   ; 
- D 3 - I - 0x03F1E0 0F:F1D0: A0        .byte $A0   ; 
- D 3 - I - 0x03F1E1 0F:F1D1: A4        .byte $A4   ; 
- D 3 - I - 0x03F1E2 0F:F1D2: A5        .byte $A5   ; 
- D 3 - I - 0x03F1E3 0F:F1D3: 04        .byte $04   ; 
- D 3 - I - 0x03F1E4 0F:F1D4: 62        .byte $62   ; <b>
- D 3 - I - 0x03F1E5 0F:F1D5: 00        .byte $00   ; 
- D 3 - I - 0x03F1E6 0F:F1D6: A0        .byte $A0   ; 
- D 3 - I - 0x03F1E7 0F:F1D7: A0        .byte $A0   ; 
- D 3 - I - 0x03F1E8 0F:F1D8: A6        .byte $A6   ; 
- D 3 - I - 0x03F1E9 0F:F1D9: A7        .byte $A7   ; 
- D 3 - I - 0x03F1EA 0F:F1DA: 04        .byte $04   ; 
- D 3 - I - 0x03F1EB 0F:F1DB: 82        .byte $82   ; 
- D 3 - I - 0x03F1EC 0F:F1DC: 00        .byte $00   ; 
- D 3 - I - 0x03F1ED 0F:F1DD: A0        .byte $A0   ; 
- D 3 - I - 0x03F1EE 0F:F1DE: A0        .byte $A0   ; 
- D 3 - I - 0x03F1EF 0F:F1DF: AF        .byte $AF   ; 
- D 3 - I - 0x03F1F0 0F:F1E0: A0        .byte $A0   ; 
- D 3 - I - 0x03F1F1 0F:F1E1: 04        .byte $04   ; 
- D 3 - I - 0x03F1F2 0F:F1E2: A2        .byte $A2   ; 
- D 3 - I - 0x03F1F3 0F:F1E3: 00        .byte $00   ; 
- D 3 - I - 0x03F1F4 0F:F1E4: AD        .byte $AD   ; 
- D 3 - I - 0x03F1F5 0F:F1E5: AD        .byte $AD   ; 
- D 3 - I - 0x03F1F6 0F:F1E6: 9B        .byte $9B   ; 
- D 3 - I - 0x03F1F7 0F:F1E7: AD        .byte $AD   ; 
- D 3 - I - 0x03F1F8 0F:F1E8: 00        .byte $00   ; 
- D 3 - I - 0x03F1F9 0F:F1E9: 04        .byte $04   ; 
- D 3 - I - 0x03F1FA 0F:F1EA: 46        .byte $46   ; <F>
- D 3 - I - 0x03F1FB 0F:F1EB: 00        .byte $00   ; 
- D 3 - I - 0x03F1FC 0F:F1EC: A0        .byte $A0   ; 
- D 3 - I - 0x03F1FD 0F:F1ED: A0        .byte $A0   ; 
- D 3 - I - 0x03F1FE 0F:F1EE: AE        .byte $AE   ; 
- D 3 - I - 0x03F1FF 0F:F1EF: A1        .byte $A1   ; 
- D 3 - I - 0x03F200 0F:F1F0: 04        .byte $04   ; 
- D 3 - I - 0x03F201 0F:F1F1: 66        .byte $66   ; <f>
- D 3 - I - 0x03F202 0F:F1F2: 00        .byte $00   ; 
- D 3 - I - 0x03F203 0F:F1F3: A0        .byte $A0   ; 
- D 3 - I - 0x03F204 0F:F1F4: A0        .byte $A0   ; 
- D 3 - I - 0x03F205 0F:F1F5: AE        .byte $AE   ; 
- D 3 - I - 0x03F206 0F:F1F6: A3        .byte $A3   ; 
- D 3 - I - 0x03F207 0F:F1F7: 04        .byte $04   ; 
- D 3 - I - 0x03F208 0F:F1F8: 86        .byte $86   ; 
- D 3 - I - 0x03F209 0F:F1F9: 00        .byte $00   ; 
- D 3 - I - 0x03F20A 0F:F1FA: A0        .byte $A0   ; 
- D 3 - I - 0x03F20B 0F:F1FB: A0        .byte $A0   ; 
- D 3 - I - 0x03F20C 0F:F1FC: 9A        .byte $9A   ; 
- D 3 - I - 0x03F20D 0F:F1FD: 9B        .byte $9B   ; 
- D 3 - I - 0x03F20E 0F:F1FE: 04        .byte $04   ; 
- D 3 - I - 0x03F20F 0F:F1FF: A6        .byte $A6   ; 
- D 3 - I - 0x03F210 0F:F200: 00        .byte $00   ; 
- D 3 - I - 0x03F211 0F:F201: AD        .byte $AD   ; 
- D 3 - I - 0x03F212 0F:F202: AD        .byte $AD   ; 
- D 3 - I - 0x03F213 0F:F203: AD        .byte $AD   ; 
- D 3 - I - 0x03F214 0F:F204: 9B        .byte $9B   ; 
- D 3 - I - 0x03F215 0F:F205: 00        .byte $00   ; 
- D 3 - - - 0x03F216 0F:F206: 12        .byte $12   ; 
- D 3 - - - 0x03F217 0F:F207: F2        .byte $F2   ; 
- D 3 - - - 0x03F218 0F:F208: 2E        .byte $2E   ; 
- D 3 - - - 0x03F219 0F:F209: F2        .byte $F2   ; 
- D 3 - - - 0x03F21A 0F:F20A: 51        .byte $51   ; <Q>
- D 3 - - - 0x03F21B 0F:F20B: F2        .byte $F2   ; 
- D 3 - - - 0x03F21C 0F:F20C: 77        .byte $77   ; <w>
- D 3 - - - 0x03F21D 0F:F20D: F2        .byte $F2   ; 
- D 3 - - - 0x03F21E 0F:F20E: AD        .byte $AD   ; 
- D 3 - - - 0x03F21F 0F:F20F: F2        .byte $F2   ; 
- D 3 - - - 0x03F220 0F:F210: ED        .byte $ED   ; 
- D 3 - - - 0x03F221 0F:F211: F2        .byte $F2   ; 
- D 3 - I - 0x03F222 0F:F212: 04        .byte $04   ; 
- D 3 - I - 0x03F223 0F:F213: 4E        .byte $4E   ; <N>
- D 3 - I - 0x03F224 0F:F214: 00        .byte $00   ; 
- D 3 - I - 0x03F225 0F:F215: 94        .byte $94   ; 
- D 3 - I - 0x03F226 0F:F216: 95        .byte $95   ; 
- D 3 - I - 0x03F227 0F:F217: C0        .byte $C0   ; 
- D 3 - I - 0x03F228 0F:F218: C1        .byte $C1   ; 
- D 3 - I - 0x03F229 0F:F219: 05        .byte $05   ; 
- D 3 - I - 0x03F22A 0F:F21A: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F22B 0F:F21B: 00        .byte $00   ; 
- D 3 - I - 0x03F22C 0F:F21C: 96        .byte $96   ; 
- D 3 - I - 0x03F22D 0F:F21D: 97        .byte $97   ; 
- D 3 - I - 0x03F22E 0F:F21E: 80        .byte $80   ; 
- D 3 - I - 0x03F22F 0F:F21F: C2        .byte $C2   ; 
- D 3 - I - 0x03F230 0F:F220: E0        .byte $E0   ; 
- D 3 - I - 0x03F231 0F:F221: 03        .byte $03   ; 
- D 3 - I - 0x03F232 0F:F222: 8F        .byte $8F   ; 
- D 3 - I - 0x03F233 0F:F223: 00        .byte $00   ; 
- D 3 - I - 0x03F234 0F:F224: 9D        .byte $9D   ; 
- D 3 - I - 0x03F235 0F:F225: 80        .byte $80   ; 
- D 3 - I - 0x03F236 0F:F226: C8        .byte $C8   ; 
- D 3 - I - 0x03F237 0F:F227: 03        .byte $03   ; 
- D 3 - I - 0x03F238 0F:F228: AF        .byte $AF   ; 
- D 3 - I - 0x03F239 0F:F229: 00        .byte $00   ; 
- D 3 - I - 0x03F23A 0F:F22A: 9F        .byte $9F   ; 
- D 3 - I - 0x03F23B 0F:F22B: CA        .byte $CA   ; 
- D 3 - I - 0x03F23C 0F:F22C: E2        .byte $E2   ; 
- D 3 - I - 0x03F23D 0F:F22D: 00        .byte $00   ; 
- D 3 - I - 0x03F23E 0F:F22E: 05        .byte $05   ; 
- D 3 - I - 0x03F23F 0F:F22F: 34        .byte $34   ; <4>
- D 3 - I - 0x03F240 0F:F230: 00        .byte $00   ; 
- D 3 - I - 0x03F241 0F:F231: C3        .byte $C3   ; 
- D 3 - I - 0x03F242 0F:F232: C6        .byte $C6   ; 
- D 3 - I - 0x03F243 0F:F233: C4        .byte $C4   ; 
- D 3 - I - 0x03F244 0F:F234: C5        .byte $C5   ; 
- D 3 - I - 0x03F245 0F:F235: C7        .byte $C7   ; 
- D 3 - I - 0x03F246 0F:F236: 04        .byte $04   ; 
- D 3 - I - 0x03F247 0F:F237: 53        .byte $53   ; <S>
- D 3 - I - 0x03F248 0F:F238: 00        .byte $00   ; 
- D 3 - I - 0x03F249 0F:F239: BD        .byte $BD   ; 
- D 3 - I - 0x03F24A 0F:F23A: C9        .byte $C9   ; 
- D 3 - I - 0x03F24B 0F:F23B: 80        .byte $80   ; 
- D 3 - I - 0x03F24C 0F:F23C: CC        .byte $CC   ; 
- D 3 - I - 0x03F24D 0F:F23D: 04        .byte $04   ; 
- D 3 - I - 0x03F24E 0F:F23E: 73        .byte $73   ; <s>
- D 3 - I - 0x03F24F 0F:F23F: 00        .byte $00   ; 
- D 3 - I - 0x03F250 0F:F240: BF        .byte $BF   ; 
- D 3 - I - 0x03F251 0F:F241: CB        .byte $CB   ; 
- D 3 - I - 0x03F252 0F:F242: 80        .byte $80   ; 
- D 3 - I - 0x03F253 0F:F243: CE        .byte $CE   ; 
- D 3 - I - 0x03F254 0F:F244: 03        .byte $03   ; 
- D 3 - I - 0x03F255 0F:F245: 94        .byte $94   ; 
- D 3 - I - 0x03F256 0F:F246: 00        .byte $00   ; 
- D 3 - I - 0x03F257 0F:F247: E1        .byte $E1   ; 
- D 3 - I - 0x03F258 0F:F248: BE        .byte $BE   ; 
- D 3 - I - 0x03F259 0F:F249: E4        .byte $E4   ; 
- D 3 - I - 0x03F25A 0F:F24A: 03        .byte $03   ; 
- D 3 - I - 0x03F25B 0F:F24B: B4        .byte $B4   ; 
- D 3 - I - 0x03F25C 0F:F24C: 00        .byte $00   ; 
- D 3 - I - 0x03F25D 0F:F24D: E3        .byte $E3   ; 
- D 3 - I - 0x03F25E 0F:F24E: E6        .byte $E6   ; 
- D 3 - I - 0x03F25F 0F:F24F: E7        .byte $E7   ; 
- D 3 - I - 0x03F260 0F:F250: 00        .byte $00   ; 
- D 3 - I - 0x03F261 0F:F251: 03        .byte $03   ; 
- D 3 - I - 0x03F262 0F:F252: 2A        .byte $2A   ; 
- D 3 - I - 0x03F263 0F:F253: 00        .byte $00   ; 
- D 3 - I - 0x03F264 0F:F254: A8        .byte $A8   ; 
- D 3 - I - 0x03F265 0F:F255: A9        .byte $A9   ; 
- D 3 - I - 0x03F266 0F:F256: 9C        .byte $9C   ; 
- D 3 - I - 0x03F267 0F:F257: 04        .byte $04   ; 
- D 3 - I - 0x03F268 0F:F258: 49        .byte $49   ; <I>
- D 3 - I - 0x03F269 0F:F259: 00        .byte $00   ; 
- D 3 - I - 0x03F26A 0F:F25A: AA        .byte $AA   ; 
- D 3 - I - 0x03F26B 0F:F25B: 80        .byte $80   ; 
- D 3 - I - 0x03F26C 0F:F25C: AB        .byte $AB   ; 
- D 3 - I - 0x03F26D 0F:F25D: 9E        .byte $9E   ; 
- D 3 - I - 0x03F26E 0F:F25E: 05        .byte $05   ; 
- D 3 - I - 0x03F26F 0F:F25F: 69        .byte $69   ; <i>
- D 3 - I - 0x03F270 0F:F260: 00        .byte $00   ; 
- D 3 - I - 0x03F271 0F:F261: B0        .byte $B0   ; 
- D 3 - I - 0x03F272 0F:F262: 80        .byte $80   ; 
- D 3 - I - 0x03F273 0F:F263: B1        .byte $B1   ; 
- D 3 - I - 0x03F274 0F:F264: B4        .byte $B4   ; 
- D 3 - I - 0x03F275 0F:F265: B5        .byte $B5   ; 
- D 3 - I - 0x03F276 0F:F266: 06        .byte $06   ; 
- D 3 - I - 0x03F277 0F:F267: 88        .byte $88   ; 
- D 3 - I - 0x03F278 0F:F268: 00        .byte $00   ; 
- D 3 - I - 0x03F279 0F:F269: B2        .byte $B2   ; 
- D 3 - I - 0x03F27A 0F:F26A: B3        .byte $B3   ; 
- D 3 - I - 0x03F27B 0F:F26B: 80        .byte $80   ; 
- D 3 - I - 0x03F27C 0F:F26C: BC        .byte $BC   ; 
- D 3 - I - 0x03F27D 0F:F26D: B6        .byte $B6   ; 
- D 3 - I - 0x03F27E 0F:F26E: B7        .byte $B7   ; 
- D 3 - I - 0x03F27F 0F:F26F: 04        .byte $04   ; 
- D 3 - I - 0x03F280 0F:F270: A8        .byte $A8   ; 
- D 3 - I - 0x03F281 0F:F271: 00        .byte $00   ; 
- D 3 - I - 0x03F282 0F:F272: B8        .byte $B8   ; 
- D 3 - I - 0x03F283 0F:F273: BA        .byte $BA   ; 
- D 3 - I - 0x03F284 0F:F274: B9        .byte $B9   ; 
- D 3 - I - 0x03F285 0F:F275: BB        .byte $BB   ; 
- D 3 - I - 0x03F286 0F:F276: 00        .byte $00   ; 
- D 3 - I - 0x03F287 0F:F277: 05        .byte $05   ; 
- D 3 - I - 0x03F288 0F:F278: 1A        .byte $1A   ; 
- D 3 - I - 0x03F289 0F:F279: 00        .byte $00   ; 
- D 3 - I - 0x03F28A 0F:F27A: D0        .byte $D0   ; 
- D 3 - I - 0x03F28B 0F:F27B: D1        .byte $D1   ; 
- D 3 - I - 0x03F28C 0F:F27C: D4        .byte $D4   ; 
- D 3 - I - 0x03F28D 0F:F27D: D5        .byte $D5   ; 
- D 3 - I - 0x03F28E 0F:F27E: FB        .byte $FB   ; 
- D 3 - I - 0x03F28F 0F:F27F: 07        .byte $07   ; 
- D 3 - I - 0x03F290 0F:F280: 39        .byte $39   ; <9>
- D 3 - I - 0x03F291 0F:F281: 00        .byte $00   ; 
- D 3 - I - 0x03F292 0F:F282: CD        .byte $CD   ; 
- D 3 - I - 0x03F293 0F:F283: D2        .byte $D2   ; 
- D 3 - I - 0x03F294 0F:F284: D3        .byte $D3   ; 
- D 3 - I - 0x03F295 0F:F285: 80        .byte $80   ; 
- D 3 - I - 0x03F296 0F:F286: 80        .byte $80   ; 
- D 3 - I - 0x03F297 0F:F287: D6        .byte $D6   ; 
- D 3 - I - 0x03F298 0F:F288: D7        .byte $D7   ; 
- D 3 - I - 0x03F299 0F:F289: 06        .byte $06   ; 
- D 3 - I - 0x03F29A 0F:F28A: 59        .byte $59   ; <Y>
- D 3 - I - 0x03F29B 0F:F28B: 00        .byte $00   ; 
- D 3 - I - 0x03F29C 0F:F28C: CF        .byte $CF   ; 
- D 3 - I - 0x03F29D 0F:F28D: D8        .byte $D8   ; 
- D 3 - I - 0x03F29E 0F:F28E: 80        .byte $80   ; 
- D 3 - I - 0x03F29F 0F:F28F: 80        .byte $80   ; 
- D 3 - I - 0x03F2A0 0F:F290: 80        .byte $80   ; 
- D 3 - I - 0x03F2A1 0F:F291: D9        .byte $D9   ; 
- D 3 - I - 0x03F2A2 0F:F292: 07        .byte $07   ; 
- D 3 - I - 0x03F2A3 0F:F293: 79        .byte $79   ; <y>
- D 3 - I - 0x03F2A4 0F:F294: 00        .byte $00   ; 
- D 3 - I - 0x03F2A5 0F:F295: E5        .byte $E5   ; 
- D 3 - I - 0x03F2A6 0F:F296: DA        .byte $DA   ; 
- D 3 - I - 0x03F2A7 0F:F297: FC        .byte $FC   ; 
- D 3 - I - 0x03F2A8 0F:F298: FD        .byte $FD   ; 
- D 3 - I - 0x03F2A9 0F:F299: 80        .byte $80   ; 
- D 3 - I - 0x03F2AA 0F:F29A: 80        .byte $80   ; 
- D 3 - I - 0x03F2AB 0F:F29B: DC        .byte $DC   ; 
- D 3 - I - 0x03F2AC 0F:F29C: 05        .byte $05   ; 
- D 3 - I - 0x03F2AD 0F:F29D: 9B        .byte $9B   ; 
- D 3 - I - 0x03F2AE 0F:F29E: 00        .byte $00   ; 
- D 3 - I - 0x03F2AF 0F:F29F: DB        .byte $DB   ; 
- D 3 - I - 0x03F2B0 0F:F2A0: DD        .byte $DD   ; 
- D 3 - I - 0x03F2B1 0F:F2A1: 80        .byte $80   ; 
- D 3 - I - 0x03F2B2 0F:F2A2: 80        .byte $80   ; 
- D 3 - I - 0x03F2B3 0F:F2A3: 80        .byte $80   ; 
- D 3 - I - 0x03F2B4 0F:F2A4: 05        .byte $05   ; 
- D 3 - I - 0x03F2B5 0F:F2A5: BB        .byte $BB   ; 
- D 3 - I - 0x03F2B6 0F:F2A6: 00        .byte $00   ; 
- D 3 - I - 0x03F2B7 0F:F2A7: 9F        .byte $9F   ; 
- D 3 - I - 0x03F2B8 0F:F2A8: 80        .byte $80   ; 
- D 3 - I - 0x03F2B9 0F:F2A9: BA        .byte $BA   ; 
- D 3 - I - 0x03F2BA 0F:F2AA: DE        .byte $DE   ; 
- D 3 - I - 0x03F2BB 0F:F2AB: DF        .byte $DF   ; 
- D 3 - I - 0x03F2BC 0F:F2AC: 00        .byte $00   ; 
- D 3 - I - 0x03F2BD 0F:F2AD: 04        .byte $04   ; 
- D 3 - I - 0x03F2BE 0F:F2AE: 01        .byte $01   ; 
- D 3 - I - 0x03F2BF 0F:F2AF: 00        .byte $00   ; 
- D 3 - I - 0x03F2C0 0F:F2B0: 84        .byte $84   ; 
- D 3 - I - 0x03F2C1 0F:F2B1: 85        .byte $85   ; 
- D 3 - I - 0x03F2C2 0F:F2B2: 90        .byte $90   ; 
- D 3 - I - 0x03F2C3 0F:F2B3: 91        .byte $91   ; 
- D 3 - I - 0x03F2C4 0F:F2B4: 05        .byte $05   ; 
- D 3 - I - 0x03F2C5 0F:F2B5: 20        .byte $20   ; 
- D 3 - I - 0x03F2C6 0F:F2B6: 00        .byte $00   ; 
- D 3 - I - 0x03F2C7 0F:F2B7: 82        .byte $82   ; 
- D 3 - I - 0x03F2C8 0F:F2B8: 80        .byte $80   ; 
- D 3 - I - 0x03F2C9 0F:F2B9: 80        .byte $80   ; 
- D 3 - I - 0x03F2CA 0F:F2BA: 80        .byte $80   ; 
- D 3 - I - 0x03F2CB 0F:F2BB: 93        .byte $93   ; 
- D 3 - I - 0x03F2CC 0F:F2BC: 06        .byte $06   ; 
- D 3 - I - 0x03F2CD 0F:F2BD: 40        .byte $40   ; 
- D 3 - I - 0x03F2CE 0F:F2BE: 00        .byte $00   ; 
- D 3 - I - 0x03F2CF 0F:F2BF: 80        .byte $80   ; 
- D 3 - I - 0x03F2D0 0F:F2C0: 80        .byte $80   ; 
- D 3 - I - 0x03F2D1 0F:F2C1: 80        .byte $80   ; 
- D 3 - I - 0x03F2D2 0F:F2C2: 80        .byte $80   ; 
- D 3 - I - 0x03F2D3 0F:F2C3: 80        .byte $80   ; 
- D 3 - I - 0x03F2D4 0F:F2C4: 88        .byte $88   ; 
- D 3 - I - 0x03F2D5 0F:F2C5: 02        .byte $02   ; 
- D 3 - I - 0x03F2D6 0F:F2C6: 47        .byte $47   ; <G>
- D 3 - I - 0x03F2D7 0F:F2C7: 00        .byte $00   ; 
- D 3 - I - 0x03F2D8 0F:F2C8: 83        .byte $83   ; 
- D 3 - I - 0x03F2D9 0F:F2C9: 86        .byte $86   ; 
- D 3 - I - 0x03F2DA 0F:F2CA: 09        .byte $09   ; 
- D 3 - I - 0x03F2DB 0F:F2CB: 60        .byte $60   ; 
- D 3 - I - 0x03F2DC 0F:F2CC: 00        .byte $00   ; 
- D 3 - I - 0x03F2DD 0F:F2CD: 80        .byte $80   ; 
- D 3 - I - 0x03F2DE 0F:F2CE: 80        .byte $80   ; 
- D 3 - I - 0x03F2DF 0F:F2CF: 80        .byte $80   ; 
- D 3 - I - 0x03F2E0 0F:F2D0: 80        .byte $80   ; 
- D 3 - I - 0x03F2E1 0F:F2D1: 80        .byte $80   ; 
- D 3 - I - 0x03F2E2 0F:F2D2: 80        .byte $80   ; 
- D 3 - I - 0x03F2E3 0F:F2D3: 8A        .byte $8A   ; 
- D 3 - I - 0x03F2E4 0F:F2D4: 89        .byte $89   ; 
- D 3 - I - 0x03F2E5 0F:F2D5: 8C        .byte $8C   ; 
- D 3 - I - 0x03F2E6 0F:F2D6: 08        .byte $08   ; 
- D 3 - I - 0x03F2E7 0F:F2D7: 80        .byte $80   ; 
- D 3 - I - 0x03F2E8 0F:F2D8: 00        .byte $00   ; 
- D 3 - I - 0x03F2E9 0F:F2D9: 80        .byte $80   ; 
- D 3 - I - 0x03F2EA 0F:F2DA: 80        .byte $80   ; 
- D 3 - I - 0x03F2EB 0F:F2DB: 80        .byte $80   ; 
- D 3 - I - 0x03F2EC 0F:F2DC: 80        .byte $80   ; 
- D 3 - I - 0x03F2ED 0F:F2DD: 80        .byte $80   ; 
- D 3 - I - 0x03F2EE 0F:F2DE: 8D        .byte $8D   ; 
- D 3 - I - 0x03F2EF 0F:F2DF: 80        .byte $80   ; 
- D 3 - I - 0x03F2F0 0F:F2E0: 8B        .byte $8B   ; 
- D 3 - I - 0x03F2F1 0F:F2E1: 08        .byte $08   ; 
- D 3 - I - 0x03F2F2 0F:F2E2: A0        .byte $A0   ; 
- D 3 - I - 0x03F2F3 0F:F2E3: 00        .byte $00   ; 
- D 3 - I - 0x03F2F4 0F:F2E4: 80        .byte $80   ; 
- D 3 - I - 0x03F2F5 0F:F2E5: 80        .byte $80   ; 
- D 3 - I - 0x03F2F6 0F:F2E6: 80        .byte $80   ; 
- D 3 - I - 0x03F2F7 0F:F2E7: 80        .byte $80   ; 
- D 3 - I - 0x03F2F8 0F:F2E8: 8E        .byte $8E   ; 
- D 3 - I - 0x03F2F9 0F:F2E9: 8F        .byte $8F   ; 
- D 3 - I - 0x03F2FA 0F:F2EA: 87        .byte $87   ; 
- D 3 - I - 0x03F2FB 0F:F2EB: 92        .byte $92   ; 
- D 3 - I - 0x03F2FC 0F:F2EC: 00        .byte $00   ; 
- D 3 - I - 0x03F2FD 0F:F2ED: 02        .byte $02   ; 
- D 3 - I - 0x03F2FE 0F:F2EE: 4F        .byte $4F   ; <O>
- D 3 - I - 0x03F2FF 0F:F2EF: 00        .byte $00   ; 
- D 3 - I - 0x03F300 0F:F2F0: D4        .byte $D4   ; 
- D 3 - I - 0x03F301 0F:F2F1: D5        .byte $D5   ; 
- D 3 - I - 0x03F302 0F:F2F2: 04        .byte $04   ; 
- D 3 - I - 0x03F303 0F:F2F3: 6D        .byte $6D   ; <m>
- D 3 - I - 0x03F304 0F:F2F4: 00        .byte $00   ; 
- D 3 - I - 0x03F305 0F:F2F5: D2        .byte $D2   ; 
- D 3 - I - 0x03F306 0F:F2F6: D3        .byte $D3   ; 
- D 3 - I - 0x03F307 0F:F2F7: 00        .byte $00   ; 
- D 3 - I - 0x03F308 0F:F2F8: D7        .byte $D7   ; 
- D 3 - I - 0x03F309 0F:F2F9: 01        .byte $01   ; 
- D 3 - I - 0x03F30A 0F:F2FA: 72        .byte $72   ; <r>
- D 3 - I - 0x03F30B 0F:F2FB: 00        .byte $00   ; 
- D 3 - I - 0x03F30C 0F:F2FC: D6        .byte $D6   ; 
- D 3 - I - 0x03F30D 0F:F2FD: 06        .byte $06   ; 
- D 3 - I - 0x03F30E 0F:F2FE: 8D        .byte $8D   ; 
- D 3 - I - 0x03F30F 0F:F2FF: 00        .byte $00   ; 
- D 3 - I - 0x03F310 0F:F300: D8        .byte $D8   ; 
- D 3 - I - 0x03F311 0F:F301: 00        .byte $00   ; 
- D 3 - I - 0x03F312 0F:F302: 00        .byte $00   ; 
- D 3 - I - 0x03F313 0F:F303: DD        .byte $DD   ; 
- D 3 - I - 0x03F314 0F:F304: D9        .byte $D9   ; 
- D 3 - I - 0x03F315 0F:F305: DC        .byte $DC   ; 
- D 3 - I - 0x03F316 0F:F306: 05        .byte $05   ; 
- D 3 - I - 0x03F317 0F:F307: AD        .byte $AD   ; 
- D 3 - I - 0x03F318 0F:F308: 00        .byte $00   ; 
- D 3 - I - 0x03F319 0F:F309: DA        .byte $DA   ; 
- D 3 - I - 0x03F31A 0F:F30A: DB        .byte $DB   ; 
- D 3 - I - 0x03F31B 0F:F30B: DE        .byte $DE   ; 
- D 3 - I - 0x03F31C 0F:F30C: DF        .byte $DF   ; 
- D 3 - I - 0x03F31D 0F:F30D: D1        .byte $D1   ; 
- D 3 - I - 0x03F31E 0F:F30E: 00        .byte $00   ; 
C D 3 - - - 0x03F31F 0F:F30F: A0 29     LDY #$29
C - - - - - 0x03F321 0F:F311: 84 30     STY ram_0030
C - - - - - 0x03F323 0F:F313: A0 F3     LDY #$F3
C - - - - - 0x03F325 0F:F315: 84 31     STY ram_0031
C - - - - - 0x03F327 0F:F317: 0A        ASL
C - - - - - 0x03F328 0F:F318: 90 02     BCC $F31C
C - - - - - 0x03F32A 0F:F31A: E6 31     INC ram_0031
C - - - - - 0x03F32C 0F:F31C: A8        TAY
C - - - - - 0x03F32D 0F:F31D: B1 30     LDA (ram_0030),Y
C - - - - - 0x03F32F 0F:F31F: 48        PHA
C - - - - - 0x03F330 0F:F320: C8        INY
C - - - - - 0x03F331 0F:F321: B1 30     LDA (ram_0030),Y
C - - - - - 0x03F333 0F:F323: 85 31     STA ram_0031
C - - - - - 0x03F335 0F:F325: 68        PLA
C - - - - - 0x03F336 0F:F326: 85 30     STA ram_0030
C - - - - - 0x03F338 0F:F328: 60        RTS
- D 3 - I - 0x03F339 0F:F329: EB        .byte $EB   ; 
- D 3 - I - 0x03F33A 0F:F32A: 05        .byte $05   ; 
- D 3 - I - 0x03F33B 0F:F32B: 09        .byte $09   ; 
- D 3 - I - 0x03F33C 0F:F32C: F5        .byte $F5   ; 
- D 3 - I - 0x03F33D 0F:F32D: 0D        .byte $0D   ; 
- D 3 - I - 0x03F33E 0F:F32E: F5        .byte $F5   ; 
- D 3 - I - 0x03F33F 0F:F32F: 12        .byte $12   ; 
- D 3 - I - 0x03F340 0F:F330: F5        .byte $F5   ; 
- D 3 - I - 0x03F341 0F:F331: 15        .byte $15   ; 
- D 3 - I - 0x03F342 0F:F332: F5        .byte $F5   ; 
- D 3 - I - 0x03F343 0F:F333: 1A        .byte $1A   ; 
- D 3 - I - 0x03F344 0F:F334: F5        .byte $F5   ; 
- D 3 - I - 0x03F345 0F:F335: 1F        .byte $1F   ; 
- D 3 - I - 0x03F346 0F:F336: F5        .byte $F5   ; 
- D 3 - I - 0x03F347 0F:F337: 24        .byte $24   ; 
- D 3 - I - 0x03F348 0F:F338: F5        .byte $F5   ; 
- D 3 - I - 0x03F349 0F:F339: 29        .byte $29   ; 
- D 3 - I - 0x03F34A 0F:F33A: F5        .byte $F5   ; 
- D 3 - I - 0x03F34B 0F:F33B: 2E        .byte $2E   ; 
- D 3 - I - 0x03F34C 0F:F33C: F5        .byte $F5   ; 
- D 3 - I - 0x03F34D 0F:F33D: 34        .byte $34   ; <4>
- D 3 - I - 0x03F34E 0F:F33E: F5        .byte $F5   ; 
- D 3 - I - 0x03F34F 0F:F33F: 37        .byte $37   ; <7>
- D 3 - I - 0x03F350 0F:F340: F5        .byte $F5   ; 
- D 3 - I - 0x03F351 0F:F341: 3C        .byte $3C   ; 
- D 3 - I - 0x03F352 0F:F342: F5        .byte $F5   ; 
- D 3 - I - 0x03F353 0F:F343: 40        .byte $40   ; 
- D 3 - I - 0x03F354 0F:F344: F5        .byte $F5   ; 
- D 3 - I - 0x03F355 0F:F345: 44        .byte $44   ; <D>
- D 3 - I - 0x03F356 0F:F346: F5        .byte $F5   ; 
- D 3 - I - 0x03F357 0F:F347: 49        .byte $49   ; <I>
- D 3 - I - 0x03F358 0F:F348: F5        .byte $F5   ; 
- D 3 - I - 0x03F359 0F:F349: 4E        .byte $4E   ; <N>
- D 3 - I - 0x03F35A 0F:F34A: F5        .byte $F5   ; 
- D 3 - I - 0x03F35B 0F:F34B: 53        .byte $53   ; <S>
- D 3 - I - 0x03F35C 0F:F34C: F5        .byte $F5   ; 
- D 3 - I - 0x03F35D 0F:F34D: 57        .byte $57   ; <W>
- D 3 - I - 0x03F35E 0F:F34E: F5        .byte $F5   ; 
- D 3 - I - 0x03F35F 0F:F34F: 5B        .byte $5B   ; 
- D 3 - I - 0x03F360 0F:F350: F5        .byte $F5   ; 
- D 3 - I - 0x03F361 0F:F351: 5E        .byte $5E   ; 
- D 3 - I - 0x03F362 0F:F352: F5        .byte $F5   ; 
- D 3 - I - 0x03F363 0F:F353: 63        .byte $63   ; <c>
- D 3 - I - 0x03F364 0F:F354: F5        .byte $F5   ; 
- D 3 - I - 0x03F365 0F:F355: 67        .byte $67   ; <g>
- D 3 - I - 0x03F366 0F:F356: F5        .byte $F5   ; 
- D 3 - I - 0x03F367 0F:F357: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F368 0F:F358: F5        .byte $F5   ; 
- D 3 - I - 0x03F369 0F:F359: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F36A 0F:F35A: F5        .byte $F5   ; 
- D 3 - I - 0x03F36B 0F:F35B: 73        .byte $73   ; <s>
- D 3 - I - 0x03F36C 0F:F35C: F5        .byte $F5   ; 
- D 3 - I - 0x03F36D 0F:F35D: 76        .byte $76   ; <v>
- D 3 - I - 0x03F36E 0F:F35E: F5        .byte $F5   ; 
- D 3 - I - 0x03F36F 0F:F35F: 7B        .byte $7B   ; 
- D 3 - I - 0x03F370 0F:F360: F5        .byte $F5   ; 
- D 3 - I - 0x03F371 0F:F361: 7F        .byte $7F   ; 
- D 3 - I - 0x03F372 0F:F362: F5        .byte $F5   ; 
- D 3 - I - 0x03F373 0F:F363: 83        .byte $83   ; 
- D 3 - I - 0x03F374 0F:F364: F5        .byte $F5   ; 
- D 3 - I - 0x03F375 0F:F365: 88        .byte $88   ; 
- D 3 - I - 0x03F376 0F:F366: F5        .byte $F5   ; 
- D 3 - I - 0x03F377 0F:F367: 8D        .byte $8D   ; 
- D 3 - I - 0x03F378 0F:F368: F5        .byte $F5   ; 
- D 3 - I - 0x03F379 0F:F369: 91        .byte $91   ; 
- D 3 - I - 0x03F37A 0F:F36A: F5        .byte $F5   ; 
- D 3 - I - 0x03F37B 0F:F36B: 95        .byte $95   ; 
- D 3 - I - 0x03F37C 0F:F36C: F5        .byte $F5   ; 
- D 3 - I - 0x03F37D 0F:F36D: 9B        .byte $9B   ; 
- D 3 - I - 0x03F37E 0F:F36E: F5        .byte $F5   ; 
- D 3 - I - 0x03F37F 0F:F36F: A1        .byte $A1   ; 
- D 3 - I - 0x03F380 0F:F370: F5        .byte $F5   ; 
- D 3 - I - 0x03F381 0F:F371: A8        .byte $A8   ; 
- D 3 - I - 0x03F382 0F:F372: F5        .byte $F5   ; 
- D 3 - I - 0x03F383 0F:F373: AD        .byte $AD   ; 
- D 3 - I - 0x03F384 0F:F374: F5        .byte $F5   ; 
- D 3 - I - 0x03F385 0F:F375: B3        .byte $B3   ; 
- D 3 - I - 0x03F386 0F:F376: F5        .byte $F5   ; 
- D 3 - I - 0x03F387 0F:F377: B7        .byte $B7   ; 
- D 3 - I - 0x03F388 0F:F378: F5        .byte $F5   ; 
- D 3 - I - 0x03F389 0F:F379: BD        .byte $BD   ; 
- D 3 - I - 0x03F38A 0F:F37A: F5        .byte $F5   ; 
- D 3 - I - 0x03F38B 0F:F37B: C0        .byte $C0   ; 
- D 3 - I - 0x03F38C 0F:F37C: F5        .byte $F5   ; 
- D 3 - I - 0x03F38D 0F:F37D: C4        .byte $C4   ; 
- D 3 - I - 0x03F38E 0F:F37E: F5        .byte $F5   ; 
- D 3 - I - 0x03F38F 0F:F37F: CA        .byte $CA   ; 
- D 3 - I - 0x03F390 0F:F380: F5        .byte $F5   ; 
- D 3 - I - 0x03F391 0F:F381: CF        .byte $CF   ; 
- D 3 - I - 0x03F392 0F:F382: F5        .byte $F5   ; 
- D 3 - I - 0x03F393 0F:F383: D6        .byte $D6   ; 
- D 3 - I - 0x03F394 0F:F384: F5        .byte $F5   ; 
- D 3 - I - 0x03F395 0F:F385: DD        .byte $DD   ; 
- D 3 - I - 0x03F396 0F:F386: F5        .byte $F5   ; 
- D 3 - I - 0x03F397 0F:F387: E1        .byte $E1   ; 
- D 3 - I - 0x03F398 0F:F388: F5        .byte $F5   ; 
- D 3 - I - 0x03F399 0F:F389: E4        .byte $E4   ; 
- D 3 - I - 0x03F39A 0F:F38A: F5        .byte $F5   ; 
- D 3 - I - 0x03F39B 0F:F38B: E8        .byte $E8   ; 
- D 3 - I - 0x03F39C 0F:F38C: F5        .byte $F5   ; 
- D 3 - I - 0x03F39D 0F:F38D: EC        .byte $EC   ; 
- D 3 - I - 0x03F39E 0F:F38E: F5        .byte $F5   ; 
- D 3 - I - 0x03F39F 0F:F38F: F0        .byte $F0   ; 
- D 3 - I - 0x03F3A0 0F:F390: F5        .byte $F5   ; 
- D 3 - I - 0x03F3A1 0F:F391: F5        .byte $F5   ; 
- D 3 - I - 0x03F3A2 0F:F392: F5        .byte $F5   ; 
- D 3 - I - 0x03F3A3 0F:F393: F9        .byte $F9   ; 
- D 3 - I - 0x03F3A4 0F:F394: F5        .byte $F5   ; 
- D 3 - I - 0x03F3A5 0F:F395: FE        .byte $FE   ; 
- D 3 - I - 0x03F3A6 0F:F396: F5        .byte $F5   ; 
- D 3 - I - 0x03F3A7 0F:F397: 03        .byte $03   ; 
- D 3 - I - 0x03F3A8 0F:F398: F6        .byte $F6   ; 
- D 3 - I - 0x03F3A9 0F:F399: 08        .byte $08   ; 
- D 3 - I - 0x03F3AA 0F:F39A: F6        .byte $F6   ; 
- D 3 - I - 0x03F3AB 0F:F39B: 0C        .byte $0C   ; 
- D 3 - I - 0x03F3AC 0F:F39C: F6        .byte $F6   ; 
- D 3 - I - 0x03F3AD 0F:F39D: 12        .byte $12   ; 
- D 3 - I - 0x03F3AE 0F:F39E: F6        .byte $F6   ; 
- D 3 - I - 0x03F3AF 0F:F39F: 18        .byte $18   ; 
- D 3 - I - 0x03F3B0 0F:F3A0: F6        .byte $F6   ; 
- D 3 - I - 0x03F3B1 0F:F3A1: 1F        .byte $1F   ; 
- D 3 - I - 0x03F3B2 0F:F3A2: F6        .byte $F6   ; 
- D 3 - I - 0x03F3B3 0F:F3A3: 25        .byte $25   ; 
- D 3 - I - 0x03F3B4 0F:F3A4: F6        .byte $F6   ; 
- D 3 - I - 0x03F3B5 0F:F3A5: 2B        .byte $2B   ; 
- D 3 - I - 0x03F3B6 0F:F3A6: F6        .byte $F6   ; 
- D 3 - I - 0x03F3B7 0F:F3A7: 2F        .byte $2F   ; 
- D 3 - I - 0x03F3B8 0F:F3A8: F6        .byte $F6   ; 
- D 3 - I - 0x03F3B9 0F:F3A9: 34        .byte $34   ; <4>
- D 3 - I - 0x03F3BA 0F:F3AA: F6        .byte $F6   ; 
- D 3 - I - 0x03F3BB 0F:F3AB: 3A        .byte $3A   ; 
- D 3 - I - 0x03F3BC 0F:F3AC: F6        .byte $F6   ; 
- D 3 - I - 0x03F3BD 0F:F3AD: 3F        .byte $3F   ; 
- D 3 - I - 0x03F3BE 0F:F3AE: F6        .byte $F6   ; 
- D 3 - I - 0x03F3BF 0F:F3AF: 43        .byte $43   ; <C>
- D 3 - I - 0x03F3C0 0F:F3B0: F6        .byte $F6   ; 
- D 3 - I - 0x03F3C1 0F:F3B1: 46        .byte $46   ; <F>
- D 3 - I - 0x03F3C2 0F:F3B2: F6        .byte $F6   ; 
- D 3 - I - 0x03F3C3 0F:F3B3: 4A        .byte $4A   ; <J>
- D 3 - I - 0x03F3C4 0F:F3B4: F6        .byte $F6   ; 
- D 3 - I - 0x03F3C5 0F:F3B5: 4E        .byte $4E   ; <N>
- D 3 - I - 0x03F3C6 0F:F3B6: F6        .byte $F6   ; 
- D 3 - I - 0x03F3C7 0F:F3B7: 52        .byte $52   ; <R>
- D 3 - I - 0x03F3C8 0F:F3B8: F6        .byte $F6   ; 
- D 3 - I - 0x03F3C9 0F:F3B9: 56        .byte $56   ; <V>
- D 3 - I - 0x03F3CA 0F:F3BA: F6        .byte $F6   ; 
- D 3 - I - 0x03F3CB 0F:F3BB: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03F3CC 0F:F3BC: F6        .byte $F6   ; 
- D 3 - I - 0x03F3CD 0F:F3BD: 5F        .byte $5F   ; 
- D 3 - I - 0x03F3CE 0F:F3BE: F6        .byte $F6   ; 
- D 3 - I - 0x03F3CF 0F:F3BF: 63        .byte $63   ; <c>
- D 3 - I - 0x03F3D0 0F:F3C0: F6        .byte $F6   ; 
- D 3 - I - 0x03F3D1 0F:F3C1: 68        .byte $68   ; <h>
- D 3 - I - 0x03F3D2 0F:F3C2: F6        .byte $F6   ; 
- D 3 - I - 0x03F3D3 0F:F3C3: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F3D4 0F:F3C4: F6        .byte $F6   ; 
- D 3 - I - 0x03F3D5 0F:F3C5: 74        .byte $74   ; <t>
- D 3 - I - 0x03F3D6 0F:F3C6: F6        .byte $F6   ; 
- D 3 - I - 0x03F3D7 0F:F3C7: 7B        .byte $7B   ; 
- D 3 - I - 0x03F3D8 0F:F3C8: F6        .byte $F6   ; 
- D 3 - I - 0x03F3D9 0F:F3C9: 7E        .byte $7E   ; 
- D 3 - I - 0x03F3DA 0F:F3CA: F6        .byte $F6   ; 
- D 3 - I - 0x03F3DB 0F:F3CB: 81        .byte $81   ; 
- D 3 - I - 0x03F3DC 0F:F3CC: F6        .byte $F6   ; 
- D 3 - I - 0x03F3DD 0F:F3CD: 86        .byte $86   ; 
- D 3 - I - 0x03F3DE 0F:F3CE: F6        .byte $F6   ; 
- D 3 - I - 0x03F3DF 0F:F3CF: 8C        .byte $8C   ; 
- D 3 - I - 0x03F3E0 0F:F3D0: F6        .byte $F6   ; 
- D 3 - I - 0x03F3E1 0F:F3D1: 91        .byte $91   ; 
- D 3 - I - 0x03F3E2 0F:F3D2: F6        .byte $F6   ; 
- D 3 - I - 0x03F3E3 0F:F3D3: 96        .byte $96   ; 
- D 3 - I - 0x03F3E4 0F:F3D4: F6        .byte $F6   ; 
- D 3 - I - 0x03F3E5 0F:F3D5: 9B        .byte $9B   ; 
- D 3 - I - 0x03F3E6 0F:F3D6: F6        .byte $F6   ; 
- D 3 - I - 0x03F3E7 0F:F3D7: 9F        .byte $9F   ; 
- D 3 - I - 0x03F3E8 0F:F3D8: F6        .byte $F6   ; 
- D 3 - I - 0x03F3E9 0F:F3D9: A5        .byte $A5   ; 
- D 3 - I - 0x03F3EA 0F:F3DA: F6        .byte $F6   ; 
- D 3 - I - 0x03F3EB 0F:F3DB: AA        .byte $AA   ; 
- D 3 - I - 0x03F3EC 0F:F3DC: F6        .byte $F6   ; 
- D 3 - I - 0x03F3ED 0F:F3DD: B1        .byte $B1   ; 
- D 3 - I - 0x03F3EE 0F:F3DE: F6        .byte $F6   ; 
- D 3 - I - 0x03F3EF 0F:F3DF: B7        .byte $B7   ; 
- D 3 - I - 0x03F3F0 0F:F3E0: F6        .byte $F6   ; 
- D 3 - I - 0x03F3F1 0F:F3E1: BE        .byte $BE   ; 
- D 3 - I - 0x03F3F2 0F:F3E2: F6        .byte $F6   ; 
- D 3 - I - 0x03F3F3 0F:F3E3: C3        .byte $C3   ; 
- D 3 - I - 0x03F3F4 0F:F3E4: F6        .byte $F6   ; 
- D 3 - I - 0x03F3F5 0F:F3E5: C7        .byte $C7   ; 
- D 3 - I - 0x03F3F6 0F:F3E6: F6        .byte $F6   ; 
- D 3 - I - 0x03F3F7 0F:F3E7: CC        .byte $CC   ; 
- D 3 - I - 0x03F3F8 0F:F3E8: F6        .byte $F6   ; 
- D 3 - I - 0x03F3F9 0F:F3E9: D3        .byte $D3   ; 
- D 3 - I - 0x03F3FA 0F:F3EA: F6        .byte $F6   ; 
- D 3 - I - 0x03F3FB 0F:F3EB: D8        .byte $D8   ; 
- D 3 - I - 0x03F3FC 0F:F3EC: F6        .byte $F6   ; 
- D 3 - I - 0x03F3FD 0F:F3ED: DE        .byte $DE   ; 
- D 3 - I - 0x03F3FE 0F:F3EE: F6        .byte $F6   ; 
- D 3 - I - 0x03F3FF 0F:F3EF: E3        .byte $E3   ; 
- D 3 - I - 0x03F400 0F:F3F0: F6        .byte $F6   ; 
- D 3 - I - 0x03F401 0F:F3F1: EA        .byte $EA   ; 
- D 3 - I - 0x03F402 0F:F3F2: F6        .byte $F6   ; 
- D 3 - I - 0x03F403 0F:F3F3: EF        .byte $EF   ; 
- D 3 - I - 0x03F404 0F:F3F4: F6        .byte $F6   ; 
- D 3 - I - 0x03F405 0F:F3F5: F3        .byte $F3   ; 
- D 3 - I - 0x03F406 0F:F3F6: F6        .byte $F6   ; 
- D 3 - I - 0x03F407 0F:F3F7: F8        .byte $F8   ; 
- D 3 - I - 0x03F408 0F:F3F8: F6        .byte $F6   ; 
- D 3 - I - 0x03F409 0F:F3F9: FE        .byte $FE   ; 
- D 3 - I - 0x03F40A 0F:F3FA: F6        .byte $F6   ; 
- D 3 - I - 0x03F40B 0F:F3FB: 04        .byte $04   ; 
- D 3 - I - 0x03F40C 0F:F3FC: F7        .byte $F7   ; 
- D 3 - I - 0x03F40D 0F:F3FD: 0A        .byte $0A   ; 
- D 3 - I - 0x03F40E 0F:F3FE: F7        .byte $F7   ; 
- D 3 - I - 0x03F40F 0F:F3FF: 0F        .byte $0F   ; 
- D 3 - I - 0x03F410 0F:F400: F7        .byte $F7   ; 
- D 3 - I - 0x03F411 0F:F401: 13        .byte $13   ; 
- D 3 - I - 0x03F412 0F:F402: F7        .byte $F7   ; 
- D 3 - I - 0x03F413 0F:F403: 18        .byte $18   ; 
- D 3 - I - 0x03F414 0F:F404: F7        .byte $F7   ; 
- D 3 - I - 0x03F415 0F:F405: 1B        .byte $1B   ; 
- D 3 - I - 0x03F416 0F:F406: F7        .byte $F7   ; 
- D 3 - I - 0x03F417 0F:F407: 22        .byte $22   ; 
- D 3 - I - 0x03F418 0F:F408: F7        .byte $F7   ; 
- D 3 - I - 0x03F419 0F:F409: 28        .byte $28   ; 
- D 3 - I - 0x03F41A 0F:F40A: F7        .byte $F7   ; 
- D 3 - I - 0x03F41B 0F:F40B: 2D        .byte $2D   ; 
- D 3 - I - 0x03F41C 0F:F40C: F7        .byte $F7   ; 
- D 3 - I - 0x03F41D 0F:F40D: 32        .byte $32   ; <2>
- D 3 - I - 0x03F41E 0F:F40E: F7        .byte $F7   ; 
- D 3 - I - 0x03F41F 0F:F40F: 38        .byte $38   ; <8>
- D 3 - I - 0x03F420 0F:F410: F7        .byte $F7   ; 
- D 3 - I - 0x03F421 0F:F411: 3F        .byte $3F   ; 
- D 3 - I - 0x03F422 0F:F412: F7        .byte $F7   ; 
- D 3 - I - 0x03F423 0F:F413: 45        .byte $45   ; <E>
- D 3 - I - 0x03F424 0F:F414: F7        .byte $F7   ; 
- D 3 - I - 0x03F425 0F:F415: 4B        .byte $4B   ; <K>
- D 3 - I - 0x03F426 0F:F416: F7        .byte $F7   ; 
- D 3 - I - 0x03F427 0F:F417: 51        .byte $51   ; <Q>
- D 3 - I - 0x03F428 0F:F418: F7        .byte $F7   ; 
- D 3 - I - 0x03F429 0F:F419: 56        .byte $56   ; <V>
- D 3 - I - 0x03F42A 0F:F41A: F7        .byte $F7   ; 
- D 3 - I - 0x03F42B 0F:F41B: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03F42C 0F:F41C: F7        .byte $F7   ; 
- D 3 - I - 0x03F42D 0F:F41D: 61        .byte $61   ; <a>
- D 3 - I - 0x03F42E 0F:F41E: F7        .byte $F7   ; 
- D 3 - I - 0x03F42F 0F:F41F: 69        .byte $69   ; <i>
- D 3 - I - 0x03F430 0F:F420: F7        .byte $F7   ; 
- D 3 - I - 0x03F431 0F:F421: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F432 0F:F422: F7        .byte $F7   ; 
- D 3 - I - 0x03F433 0F:F423: 75        .byte $75   ; <u>
- D 3 - I - 0x03F434 0F:F424: F7        .byte $F7   ; 
- D 3 - I - 0x03F435 0F:F425: 7A        .byte $7A   ; <z>
- D 3 - I - 0x03F436 0F:F426: F7        .byte $F7   ; 
- D 3 - I - 0x03F437 0F:F427: 80        .byte $80   ; 
- D 3 - I - 0x03F438 0F:F428: F7        .byte $F7   ; 
- D 3 - I - 0x03F439 0F:F429: 84        .byte $84   ; 
- D 3 - I - 0x03F43A 0F:F42A: F7        .byte $F7   ; 
- D 3 - I - 0x03F43B 0F:F42B: 88        .byte $88   ; 
- D 3 - I - 0x03F43C 0F:F42C: F7        .byte $F7   ; 
- D 3 - I - 0x03F43D 0F:F42D: 8D        .byte $8D   ; 
- D 3 - I - 0x03F43E 0F:F42E: F7        .byte $F7   ; 
- D 3 - I - 0x03F43F 0F:F42F: 91        .byte $91   ; 
- D 3 - I - 0x03F440 0F:F430: F7        .byte $F7   ; 
- D 3 - I - 0x03F441 0F:F431: 95        .byte $95   ; 
- D 3 - I - 0x03F442 0F:F432: F7        .byte $F7   ; 
- D 3 - I - 0x03F443 0F:F433: 9A        .byte $9A   ; 
- D 3 - I - 0x03F444 0F:F434: F7        .byte $F7   ; 
- D 3 - I - 0x03F445 0F:F435: 9E        .byte $9E   ; 
- D 3 - I - 0x03F446 0F:F436: F7        .byte $F7   ; 
- D 3 - I - 0x03F447 0F:F437: A4        .byte $A4   ; 
- D 3 - I - 0x03F448 0F:F438: F7        .byte $F7   ; 
- D 3 - I - 0x03F449 0F:F439: AB        .byte $AB   ; 
- D 3 - I - 0x03F44A 0F:F43A: F7        .byte $F7   ; 
- D 3 - I - 0x03F44B 0F:F43B: AF        .byte $AF   ; 
- D 3 - I - 0x03F44C 0F:F43C: F7        .byte $F7   ; 
- D 3 - I - 0x03F44D 0F:F43D: B3        .byte $B3   ; 
- D 3 - I - 0x03F44E 0F:F43E: F7        .byte $F7   ; 
- D 3 - I - 0x03F44F 0F:F43F: B9        .byte $B9   ; 
- D 3 - I - 0x03F450 0F:F440: F7        .byte $F7   ; 
- D 3 - I - 0x03F451 0F:F441: BD        .byte $BD   ; 
- D 3 - I - 0x03F452 0F:F442: F7        .byte $F7   ; 
- D 3 - I - 0x03F453 0F:F443: C5        .byte $C5   ; 
- D 3 - I - 0x03F454 0F:F444: F7        .byte $F7   ; 
- D 3 - I - 0x03F455 0F:F445: CD        .byte $CD   ; 
- D 3 - I - 0x03F456 0F:F446: F7        .byte $F7   ; 
- D 3 - I - 0x03F457 0F:F447: D2        .byte $D2   ; 
- D 3 - I - 0x03F458 0F:F448: F7        .byte $F7   ; 
- D 3 - I - 0x03F459 0F:F449: DB        .byte $DB   ; 
- D 3 - I - 0x03F45A 0F:F44A: F7        .byte $F7   ; 
- D 3 - I - 0x03F45B 0F:F44B: E1        .byte $E1   ; 
- D 3 - I - 0x03F45C 0F:F44C: F7        .byte $F7   ; 
- D 3 - I - 0x03F45D 0F:F44D: E8        .byte $E8   ; 
- D 3 - I - 0x03F45E 0F:F44E: F7        .byte $F7   ; 
- D 3 - I - 0x03F45F 0F:F44F: ED        .byte $ED   ; 
- D 3 - I - 0x03F460 0F:F450: F7        .byte $F7   ; 
- D 3 - I - 0x03F461 0F:F451: F2        .byte $F2   ; 
- D 3 - I - 0x03F462 0F:F452: F7        .byte $F7   ; 
- D 3 - I - 0x03F463 0F:F453: F7        .byte $F7   ; 
- D 3 - I - 0x03F464 0F:F454: F7        .byte $F7   ; 
- D 3 - I - 0x03F465 0F:F455: FC        .byte $FC   ; 
- D 3 - I - 0x03F466 0F:F456: F7        .byte $F7   ; 
- D 3 - I - 0x03F467 0F:F457: 01        .byte $01   ; 
- D 3 - I - 0x03F468 0F:F458: F8        .byte $F8   ; 
- D 3 - I - 0x03F469 0F:F459: 08        .byte $08   ; 
- D 3 - I - 0x03F46A 0F:F45A: F8        .byte $F8   ; 
- D 3 - I - 0x03F46B 0F:F45B: 0E        .byte $0E   ; 
- D 3 - I - 0x03F46C 0F:F45C: F8        .byte $F8   ; 
- D 3 - I - 0x03F46D 0F:F45D: 13        .byte $13   ; 
- D 3 - I - 0x03F46E 0F:F45E: F8        .byte $F8   ; 
- D 3 - I - 0x03F46F 0F:F45F: 18        .byte $18   ; 
- D 3 - I - 0x03F470 0F:F460: F8        .byte $F8   ; 
- D 3 - I - 0x03F471 0F:F461: 20        .byte $20   ; 
- D 3 - I - 0x03F472 0F:F462: F8        .byte $F8   ; 
- D 3 - I - 0x03F473 0F:F463: 26        .byte $26   ; 
- D 3 - I - 0x03F474 0F:F464: F8        .byte $F8   ; 
- D 3 - I - 0x03F475 0F:F465: 2F        .byte $2F   ; 
- D 3 - I - 0x03F476 0F:F466: F8        .byte $F8   ; 
- D 3 - I - 0x03F477 0F:F467: 3B        .byte $3B   ; 
- D 3 - I - 0x03F478 0F:F468: F8        .byte $F8   ; 
- D 3 - I - 0x03F479 0F:F469: 44        .byte $44   ; <D>
- D 3 - I - 0x03F47A 0F:F46A: F8        .byte $F8   ; 
- D 3 - I - 0x03F47B 0F:F46B: 50        .byte $50   ; <P>
- D 3 - I - 0x03F47C 0F:F46C: F8        .byte $F8   ; 
- D 3 - I - 0x03F47D 0F:F46D: 59        .byte $59   ; <Y>
- D 3 - I - 0x03F47E 0F:F46E: F8        .byte $F8   ; 
- D 3 - I - 0x03F47F 0F:F46F: 64        .byte $64   ; <d>
- D 3 - I - 0x03F480 0F:F470: F8        .byte $F8   ; 
- D 3 - I - 0x03F481 0F:F471: 6C        .byte $6C   ; <l>
- D 3 - I - 0x03F482 0F:F472: F8        .byte $F8   ; 
- D 3 - I - 0x03F483 0F:F473: 79        .byte $79   ; <y>
- D 3 - I - 0x03F484 0F:F474: F8        .byte $F8   ; 
- D 3 - I - 0x03F485 0F:F475: 82        .byte $82   ; 
- D 3 - I - 0x03F486 0F:F476: F8        .byte $F8   ; 
- D 3 - I - 0x03F487 0F:F477: 8B        .byte $8B   ; 
- D 3 - I - 0x03F488 0F:F478: F8        .byte $F8   ; 
- D 3 - I - 0x03F489 0F:F479: 97        .byte $97   ; 
- D 3 - I - 0x03F48A 0F:F47A: F8        .byte $F8   ; 
- D 3 - I - 0x03F48B 0F:F47B: A2        .byte $A2   ; 
- D 3 - I - 0x03F48C 0F:F47C: F8        .byte $F8   ; 
- D 3 - I - 0x03F48D 0F:F47D: AE        .byte $AE   ; 
- D 3 - I - 0x03F48E 0F:F47E: F8        .byte $F8   ; 
- D 3 - I - 0x03F48F 0F:F47F: BC        .byte $BC   ; 
- D 3 - I - 0x03F490 0F:F480: F8        .byte $F8   ; 
- D 3 - I - 0x03F491 0F:F481: C5        .byte $C5   ; 
- D 3 - I - 0x03F492 0F:F482: F8        .byte $F8   ; 
- D 3 - I - 0x03F493 0F:F483: CB        .byte $CB   ; 
- D 3 - I - 0x03F494 0F:F484: F8        .byte $F8   ; 
- D 3 - I - 0x03F495 0F:F485: D6        .byte $D6   ; 
- D 3 - I - 0x03F496 0F:F486: F8        .byte $F8   ; 
- D 3 - I - 0x03F497 0F:F487: DE        .byte $DE   ; 
- D 3 - I - 0x03F498 0F:F488: F8        .byte $F8   ; 
- D 3 - I - 0x03F499 0F:F489: E8        .byte $E8   ; 
- D 3 - I - 0x03F49A 0F:F48A: F8        .byte $F8   ; 
- D 3 - I - 0x03F49B 0F:F48B: F2        .byte $F2   ; 
- D 3 - I - 0x03F49C 0F:F48C: F8        .byte $F8   ; 
- D 3 - I - 0x03F49D 0F:F48D: FA        .byte $FA   ; 
- D 3 - I - 0x03F49E 0F:F48E: F8        .byte $F8   ; 
- D 3 - I - 0x03F49F 0F:F48F: 03        .byte $03   ; 
- D 3 - I - 0x03F4A0 0F:F490: F9        .byte $F9   ; 
- D 3 - I - 0x03F4A1 0F:F491: 0D        .byte $0D   ; 
- D 3 - I - 0x03F4A2 0F:F492: F9        .byte $F9   ; 
- D 3 - I - 0x03F4A3 0F:F493: 16        .byte $16   ; 
- D 3 - I - 0x03F4A4 0F:F494: F9        .byte $F9   ; 
- D 3 - I - 0x03F4A5 0F:F495: 20        .byte $20   ; 
- D 3 - I - 0x03F4A6 0F:F496: F9        .byte $F9   ; 
- D 3 - I - 0x03F4A7 0F:F497: 2A        .byte $2A   ; 
- D 3 - I - 0x03F4A8 0F:F498: F9        .byte $F9   ; 
- D 3 - I - 0x03F4A9 0F:F499: 32        .byte $32   ; <2>
- D 3 - I - 0x03F4AA 0F:F49A: F9        .byte $F9   ; 
- D 3 - I - 0x03F4AB 0F:F49B: 3A        .byte $3A   ; 
- D 3 - I - 0x03F4AC 0F:F49C: F9        .byte $F9   ; 
- D 3 - I - 0x03F4AD 0F:F49D: 44        .byte $44   ; <D>
- D 3 - I - 0x03F4AE 0F:F49E: F9        .byte $F9   ; 
- D 3 - I - 0x03F4AF 0F:F49F: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F4B0 0F:F4A0: F9        .byte $F9   ; 
- D 3 - I - 0x03F4B1 0F:F4A1: 57        .byte $57   ; <W>
- D 3 - I - 0x03F4B2 0F:F4A2: F9        .byte $F9   ; 
- D 3 - I - 0x03F4B3 0F:F4A3: 5E        .byte $5E   ; 
- D 3 - I - 0x03F4B4 0F:F4A4: F9        .byte $F9   ; 
- D 3 - I - 0x03F4B5 0F:F4A5: 63        .byte $63   ; <c>
- D 3 - I - 0x03F4B6 0F:F4A6: F9        .byte $F9   ; 
- D 3 - I - 0x03F4B7 0F:F4A7: 6A        .byte $6A   ; <j>
- D 3 - I - 0x03F4B8 0F:F4A8: F9        .byte $F9   ; 
- D 3 - I - 0x03F4B9 0F:F4A9: 74        .byte $74   ; <t>
- D 3 - I - 0x03F4BA 0F:F4AA: F9        .byte $F9   ; 
- D 3 - I - 0x03F4BB 0F:F4AB: 7D        .byte $7D   ; 
- D 3 - I - 0x03F4BC 0F:F4AC: F9        .byte $F9   ; 
- D 3 - I - 0x03F4BD 0F:F4AD: 86        .byte $86   ; 
- D 3 - I - 0x03F4BE 0F:F4AE: F9        .byte $F9   ; 
- D 3 - I - 0x03F4BF 0F:F4AF: 8F        .byte $8F   ; 
- D 3 - I - 0x03F4C0 0F:F4B0: F9        .byte $F9   ; 
- D 3 - I - 0x03F4C1 0F:F4B1: 99        .byte $99   ; 
- D 3 - I - 0x03F4C2 0F:F4B2: F9        .byte $F9   ; 
- D 3 - I - 0x03F4C3 0F:F4B3: 9C        .byte $9C   ; 
- D 3 - I - 0x03F4C4 0F:F4B4: F9        .byte $F9   ; 
- D 3 - I - 0x03F4C5 0F:F4B5: A3        .byte $A3   ; 
- D 3 - I - 0x03F4C6 0F:F4B6: F9        .byte $F9   ; 
- D 3 - I - 0x03F4C7 0F:F4B7: AA        .byte $AA   ; 
- D 3 - I - 0x03F4C8 0F:F4B8: F9        .byte $F9   ; 
- D 3 - I - 0x03F4C9 0F:F4B9: B3        .byte $B3   ; 
- D 3 - I - 0x03F4CA 0F:F4BA: F9        .byte $F9   ; 
- D 3 - I - 0x03F4CB 0F:F4BB: BC        .byte $BC   ; 
- D 3 - I - 0x03F4CC 0F:F4BC: F9        .byte $F9   ; 
- D 3 - I - 0x03F4CD 0F:F4BD: C5        .byte $C5   ; 
- D 3 - I - 0x03F4CE 0F:F4BE: F9        .byte $F9   ; 
- D 3 - I - 0x03F4CF 0F:F4BF: CD        .byte $CD   ; 
- D 3 - I - 0x03F4D0 0F:F4C0: F9        .byte $F9   ; 
- D 3 - I - 0x03F4D1 0F:F4C1: D6        .byte $D6   ; 
- D 3 - I - 0x03F4D2 0F:F4C2: F9        .byte $F9   ; 
- D 3 - I - 0x03F4D3 0F:F4C3: E0        .byte $E0   ; 
- D 3 - I - 0x03F4D4 0F:F4C4: F9        .byte $F9   ; 
- D 3 - I - 0x03F4D5 0F:F4C5: E5        .byte $E5   ; 
- D 3 - I - 0x03F4D6 0F:F4C6: F9        .byte $F9   ; 
- D 3 - I - 0x03F4D7 0F:F4C7: EE        .byte $EE   ; 
- D 3 - I - 0x03F4D8 0F:F4C8: F9        .byte $F9   ; 
- D 3 - I - 0x03F4D9 0F:F4C9: F8        .byte $F8   ; 
- D 3 - I - 0x03F4DA 0F:F4CA: F9        .byte $F9   ; 
- D 3 - I - 0x03F4DB 0F:F4CB: 00        .byte $00   ; 
- D 3 - I - 0x03F4DC 0F:F4CC: FA        .byte $FA   ; 
- D 3 - I - 0x03F4DD 0F:F4CD: 05        .byte $05   ; 
- D 3 - I - 0x03F4DE 0F:F4CE: FA        .byte $FA   ; 
- D 3 - I - 0x03F4DF 0F:F4CF: 0F        .byte $0F   ; 
- D 3 - I - 0x03F4E0 0F:F4D0: FA        .byte $FA   ; 
- D 3 - I - 0x03F4E1 0F:F4D1: 18        .byte $18   ; 
- D 3 - I - 0x03F4E2 0F:F4D2: FA        .byte $FA   ; 
- D 3 - I - 0x03F4E3 0F:F4D3: 20        .byte $20   ; 
- D 3 - I - 0x03F4E4 0F:F4D4: FA        .byte $FA   ; 
- - - - - - 0x03F4E5 0F:F4D5: 29        .byte $29   ; 
- - - - - - 0x03F4E6 0F:F4D6: FA        .byte $FA   ; 
- D 3 - I - 0x03F4E7 0F:F4D7: 2E        .byte $2E   ; 
- D 3 - I - 0x03F4E8 0F:F4D8: FA        .byte $FA   ; 
- D 3 - I - 0x03F4E9 0F:F4D9: 34        .byte $34   ; <4>
- D 3 - I - 0x03F4EA 0F:F4DA: FA        .byte $FA   ; 
- D 3 - I - 0x03F4EB 0F:F4DB: 3F        .byte $3F   ; 
- D 3 - I - 0x03F4EC 0F:F4DC: FA        .byte $FA   ; 
- D 3 - I - 0x03F4ED 0F:F4DD: 44        .byte $44   ; <D>
- D 3 - I - 0x03F4EE 0F:F4DE: FA        .byte $FA   ; 
- D 3 - I - 0x03F4EF 0F:F4DF: 48        .byte $48   ; <H>
- D 3 - I - 0x03F4F0 0F:F4E0: FA        .byte $FA   ; 
- - - - - - 0x03F4F1 0F:F4E1: 4D        .byte $4D   ; <M>
- - - - - - 0x03F4F2 0F:F4E2: FA        .byte $FA   ; 
- - - - - - 0x03F4F3 0F:F4E3: 52        .byte $52   ; <R>
- - - - - - 0x03F4F4 0F:F4E4: FA        .byte $FA   ; 
- - - - - - 0x03F4F5 0F:F4E5: 57        .byte $57   ; <W>
- - - - - - 0x03F4F6 0F:F4E6: FA        .byte $FA   ; 
- - - - - - 0x03F4F7 0F:F4E7: 5C        .byte $5C   ; 
- - - - - - 0x03F4F8 0F:F4E8: FA        .byte $FA   ; 
- D 3 - I - 0x03F4F9 0F:F4E9: 61        .byte $61   ; <a>
- D 3 - I - 0x03F4FA 0F:F4EA: FA        .byte $FA   ; 
- - - - - - 0x03F4FB 0F:F4EB: 68        .byte $68   ; <h>
- - - - - - 0x03F4FC 0F:F4EC: FA        .byte $FA   ; 
- - - - - - 0x03F4FD 0F:F4ED: 71        .byte $71   ; <q>
- - - - - - 0x03F4FE 0F:F4EE: FA        .byte $FA   ; 
- - - - - - 0x03F4FF 0F:F4EF: 79        .byte $79   ; <y>
- - - - - - 0x03F500 0F:F4F0: FA        .byte $FA   ; 
- D 3 - I - 0x03F501 0F:F4F1: 83        .byte $83   ; 
- D 3 - I - 0x03F502 0F:F4F2: FA        .byte $FA   ; 
- D 3 - I - 0x03F503 0F:F4F3: 89        .byte $89   ; 
- D 3 - I - 0x03F504 0F:F4F4: FA        .byte $FA   ; 
- D 3 - I - 0x03F505 0F:F4F5: 90        .byte $90   ; 
- D 3 - I - 0x03F506 0F:F4F6: FA        .byte $FA   ; 
- D 3 - I - 0x03F507 0F:F4F7: 96        .byte $96   ; 
- D 3 - I - 0x03F508 0F:F4F8: FA        .byte $FA   ; 
- D 3 - I - 0x03F509 0F:F4F9: 9C        .byte $9C   ; 
- D 3 - I - 0x03F50A 0F:F4FA: FA        .byte $FA   ; 
- D 3 - I - 0x03F50B 0F:F4FB: A4        .byte $A4   ; 
- D 3 - I - 0x03F50C 0F:F4FC: FA        .byte $FA   ; 
- D 3 - I - 0x03F50D 0F:F4FD: A9        .byte $A9   ; 
- D 3 - I - 0x03F50E 0F:F4FE: FA        .byte $FA   ; 
- D 3 - I - 0x03F50F 0F:F4FF: B0        .byte $B0   ; 
- D 3 - I - 0x03F510 0F:F500: FA        .byte $FA   ; 
- D 3 - I - 0x03F511 0F:F501: B7        .byte $B7   ; 
- D 3 - I - 0x03F512 0F:F502: FA        .byte $FA   ; 
- D 3 - I - 0x03F513 0F:F503: C0        .byte $C0   ; 
- D 3 - I - 0x03F514 0F:F504: FA        .byte $FA   ; 
- D 3 - I - 0x03F515 0F:F505: C4        .byte $C4   ; 
- D 3 - I - 0x03F516 0F:F506: FA        .byte $FA   ; 
- D 3 - I - 0x03F517 0F:F507: C8        .byte $C8   ; 
- D 3 - I - 0x03F518 0F:F508: FA        .byte $FA   ; 
- D 3 - I - 0x03F519 0F:F509: 12        .byte $12   ; 
- D 3 - I - 0x03F51A 0F:F50A: AF        .byte $AF   ; 
- D 3 - I - 0x03F51B 0F:F50B: 0B        .byte $0B   ; 
- D 3 - I - 0x03F51C 0F:F50C: FC        .byte $FC   ; 
- D 3 - I - 0x03F51D 0F:F50D: 6A        .byte $6A   ; <j>
- D 3 - I - 0x03F51E 0F:F50E: 55        .byte $55   ; <U>
- D 3 - I - 0x03F51F 0F:F50F: 7D        .byte $7D   ; 
- D 3 - I - 0x03F520 0F:F510: 54        .byte $54   ; <T>
- D 3 - I - 0x03F521 0F:F511: FC        .byte $FC   ; 
- D 3 - I - 0x03F522 0F:F512: 68        .byte $68   ; <h>
- D 3 - I - 0x03F523 0F:F513: 5F        .byte $5F   ; 
- D 3 - I - 0x03F524 0F:F514: FC        .byte $FC   ; 
- D 3 - I - 0x03F525 0F:F515: 5F        .byte $5F   ; 
- D 3 - I - 0x03F526 0F:F516: 68        .byte $68   ; <h>
- D 3 - I - 0x03F527 0F:F517: 7D        .byte $7D   ; 
- D 3 - I - 0x03F528 0F:F518: 56        .byte $56   ; <V>
- D 3 - I - 0x03F529 0F:F519: FC        .byte $FC   ; 
- D 3 - I - 0x03F52A 0F:F51A: 41        .byte $41   ; <A>
- D 3 - I - 0x03F52B 0F:F51B: 5F        .byte $5F   ; 
- D 3 - I - 0x03F52C 0F:F51C: 67        .byte $67   ; <g>
- D 3 - I - 0x03F52D 0F:F51D: 43        .byte $43   ; <C>
- D 3 - I - 0x03F52E 0F:F51E: FC        .byte $FC   ; 
- D 3 - I - 0x03F52F 0F:F51F: C2        .byte $C2   ; 
- D 3 - I - 0x03F530 0F:F520: 54        .byte $54   ; <T>
- D 3 - I - 0x03F531 0F:F521: 7D        .byte $7D   ; 
- D 3 - I - 0x03F532 0F:F522: 69        .byte $69   ; <i>
- D 3 - I - 0x03F533 0F:F523: FC        .byte $FC   ; 
- D 3 - I - 0x03F534 0F:F524: C3        .byte $C3   ; 
- D 3 - I - 0x03F535 0F:F525: 51        .byte $51   ; <Q>
- D 3 - I - 0x03F536 0F:F526: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F537 0F:F527: 50        .byte $50   ; <P>
- D 3 - I - 0x03F538 0F:F528: FC        .byte $FC   ; 
- D 3 - I - 0x03F539 0F:F529: 50        .byte $50   ; <P>
- D 3 - I - 0x03F53A 0F:F52A: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03F53B 0F:F52B: 5F        .byte $5F   ; 
- D 3 - I - 0x03F53C 0F:F52C: 50        .byte $50   ; <P>
- D 3 - I - 0x03F53D 0F:F52D: FC        .byte $FC   ; 
- D 3 - I - 0x03F53E 0F:F52E: C3        .byte $C3   ; 
- D 3 - I - 0x03F53F 0F:F52F: C4        .byte $C4   ; 
- D 3 - I - 0x03F540 0F:F530: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F541 0F:F531: 54        .byte $54   ; <T>
- D 3 - I - 0x03F542 0F:F532: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F543 0F:F533: FC        .byte $FC   ; 
- D 3 - I - 0x03F544 0F:F534: BA        .byte $BA   ; 
- D 3 - I - 0x03F545 0F:F535: 43        .byte $43   ; <C>
- D 3 - I - 0x03F546 0F:F536: FC        .byte $FC   ; 
- D 3 - I - 0x03F547 0F:F537: CF        .byte $CF   ; 
- D 3 - I - 0x03F548 0F:F538: 67        .byte $67   ; <g>
- D 3 - I - 0x03F549 0F:F539: 54        .byte $54   ; <T>
- D 3 - I - 0x03F54A 0F:F53A: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F54B 0F:F53B: FC        .byte $FC   ; 
- D 3 - I - 0x03F54C 0F:F53C: 03        .byte $03   ; 
- D 3 - I - 0x03F54D 0F:F53D: 27        .byte $27   ; 
- D 3 - I - 0x03F54E 0F:F53E: B2        .byte $B2   ; 
- D 3 - I - 0x03F54F 0F:F53F: FC        .byte $FC   ; 
- D 3 - I - 0x03F550 0F:F540: 07        .byte $07   ; 
- D 3 - I - 0x03F551 0F:F541: 0C        .byte $0C   ; 
- D 3 - I - 0x03F552 0F:F542: AA        .byte $AA   ; 
- D 3 - I - 0x03F553 0F:F543: FC        .byte $FC   ; 
- D 3 - I - 0x03F554 0F:F544: 15        .byte $15   ; 
- D 3 - I - 0x03F555 0F:F545: 06        .byte $06   ; 
- D 3 - I - 0x03F556 0F:F546: 24        .byte $24   ; 
- D 3 - I - 0x03F557 0F:F547: 1F        .byte $1F   ; 
- D 3 - I - 0x03F558 0F:F548: FC        .byte $FC   ; 
- D 3 - I - 0x03F559 0F:F549: 23        .byte $23   ; 
- D 3 - I - 0x03F55A 0F:F54A: 28        .byte $28   ; 
- D 3 - I - 0x03F55B 0F:F54B: 0B        .byte $0B   ; 
- D 3 - I - 0x03F55C 0F:F54C: 07        .byte $07   ; 
- D 3 - I - 0x03F55D 0F:F54D: FC        .byte $FC   ; 
- D 3 - I - 0x03F55E 0F:F54E: 10        .byte $10   ; 
- D 3 - I - 0x03F55F 0F:F54F: 06        .byte $06   ; 
- D 3 - I - 0x03F560 0F:F550: 0D        .byte $0D   ; 
- D 3 - I - 0x03F561 0F:F551: A1        .byte $A1   ; 
- D 3 - I - 0x03F562 0F:F552: FC        .byte $FC   ; 
- D 3 - I - 0x03F563 0F:F553: 20        .byte $20   ; 
- D 3 - I - 0x03F564 0F:F554: 0B        .byte $0B   ; 
- D 3 - I - 0x03F565 0F:F555: 07        .byte $07   ; 
- D 3 - I - 0x03F566 0F:F556: FC        .byte $FC   ; 
- D 3 - I - 0x03F567 0F:F557: 02        .byte $02   ; 
- D 3 - I - 0x03F568 0F:F558: A5        .byte $A5   ; 
- D 3 - I - 0x03F569 0F:F559: 2C        .byte $2C   ; 
- D 3 - I - 0x03F56A 0F:F55A: FC        .byte $FC   ; 
- D 3 - I - 0x03F56B 0F:F55B: 10        .byte $10   ; 
- D 3 - I - 0x03F56C 0F:F55C: 07        .byte $07   ; 
- D 3 - I - 0x03F56D 0F:F55D: FC        .byte $FC   ; 
- D 3 - I - 0x03F56E 0F:F55E: 02        .byte $02   ; 
- D 3 - I - 0x03F56F 0F:F55F: 0C        .byte $0C   ; 
- D 3 - I - 0x03F570 0F:F560: A5        .byte $A5   ; 
- D 3 - I - 0x03F571 0F:F561: 07        .byte $07   ; 
- D 3 - I - 0x03F572 0F:F562: FC        .byte $FC   ; 
- D 3 - I - 0x03F573 0F:F563: 16        .byte $16   ; 
- D 3 - I - 0x03F574 0F:F564: 2F        .byte $2F   ; 
- D 3 - I - 0x03F575 0F:F565: 10        .byte $10   ; 
- D 3 - I - 0x03F576 0F:F566: FC        .byte $FC   ; 
- D 3 - I - 0x03F577 0F:F567: 07        .byte $07   ; 
- D 3 - I - 0x03F578 0F:F568: 0D        .byte $0D   ; 
- D 3 - I - 0x03F579 0F:F569: A1        .byte $A1   ; 
- D 3 - I - 0x03F57A 0F:F56A: FC        .byte $FC   ; 
- D 3 - I - 0x03F57B 0F:F56B: 1F        .byte $1F   ; 
- D 3 - I - 0x03F57C 0F:F56C: 0B        .byte $0B   ; 
- D 3 - I - 0x03F57D 0F:F56D: 05        .byte $05   ; 
- D 3 - I - 0x03F57E 0F:F56E: FC        .byte $FC   ; 
- D 3 - I - 0x03F57F 0F:F56F: 06        .byte $06   ; 
- D 3 - I - 0x03F580 0F:F570: A7        .byte $A7   ; 
- D 3 - I - 0x03F581 0F:F571: 05        .byte $05   ; 
- D 3 - I - 0x03F582 0F:F572: FC        .byte $FC   ; 
- D 3 - I - 0x03F583 0F:F573: 0B        .byte $0B   ; 
- D 3 - I - 0x03F584 0F:F574: 19        .byte $19   ; 
- D 3 - I - 0x03F585 0F:F575: FC        .byte $FC   ; 
- D 3 - I - 0x03F586 0F:F576: 1B        .byte $1B   ; 
- D 3 - I - 0x03F587 0F:F577: 31        .byte $31   ; <1>
- D 3 - I - 0x03F588 0F:F578: 03        .byte $03   ; 
- D 3 - I - 0x03F589 0F:F579: A0        .byte $A0   ; 
- D 3 - I - 0x03F58A 0F:F57A: FC        .byte $FC   ; 
- D 3 - I - 0x03F58B 0F:F57B: 0F        .byte $0F   ; 
- D 3 - I - 0x03F58C 0F:F57C: 03        .byte $03   ; 
- D 3 - I - 0x03F58D 0F:F57D: AA        .byte $AA   ; 
- D 3 - I - 0x03F58E 0F:F57E: FC        .byte $FC   ; 
- D 3 - I - 0x03F58F 0F:F57F: A6        .byte $A6   ; 
- D 3 - I - 0x03F590 0F:F580: 14        .byte $14   ; 
- D 3 - I - 0x03F591 0F:F581: 03        .byte $03   ; 
- D 3 - I - 0x03F592 0F:F582: FC        .byte $FC   ; 
- D 3 - I - 0x03F593 0F:F583: 1F        .byte $1F   ; 
- D 3 - I - 0x03F594 0F:F584: 12        .byte $12   ; 
- D 3 - I - 0x03F595 0F:F585: 24        .byte $24   ; 
- D 3 - I - 0x03F596 0F:F586: 1F        .byte $1F   ; 
- D 3 - I - 0x03F597 0F:F587: FC        .byte $FC   ; 
- D 3 - I - 0x03F598 0F:F588: 0F        .byte $0F   ; 
- D 3 - I - 0x03F599 0F:F589: 28        .byte $28   ; 
- D 3 - I - 0x03F59A 0F:F58A: 1F        .byte $1F   ; 
- D 3 - I - 0x03F59B 0F:F58B: 11        .byte $11   ; 
- D 3 - I - 0x03F59C 0F:F58C: FC        .byte $FC   ; 
- D 3 - I - 0x03F59D 0F:F58D: 0B        .byte $0B   ; 
- D 3 - I - 0x03F59E 0F:F58E: 2C        .byte $2C   ; 
- D 3 - I - 0x03F59F 0F:F58F: AA        .byte $AA   ; 
- D 3 - I - 0x03F5A0 0F:F590: FC        .byte $FC   ; 
- D 3 - I - 0x03F5A1 0F:F591: 20        .byte $20   ; 
- D 3 - I - 0x03F5A2 0F:F592: 0D        .byte $0D   ; 
- D 3 - I - 0x03F5A3 0F:F593: A1        .byte $A1   ; 
- D 3 - I - 0x03F5A4 0F:F594: FC        .byte $FC   ; 
- D 3 - I - 0x03F5A5 0F:F595: 2C        .byte $2C   ; 
- D 3 - I - 0x03F5A6 0F:F596: 06        .byte $06   ; 
- D 3 - I - 0x03F5A7 0F:F597: AF        .byte $AF   ; 
- D 3 - I - 0x03F5A8 0F:F598: 24        .byte $24   ; 
- D 3 - I - 0x03F5A9 0F:F599: 0C        .byte $0C   ; 
- D 3 - I - 0x03F5AA 0F:F59A: FC        .byte $FC   ; 
- D 3 - I - 0x03F5AB 0F:F59B: 2C        .byte $2C   ; 
- D 3 - I - 0x03F5AC 0F:F59C: 06        .byte $06   ; 
- D 3 - I - 0x03F5AD 0F:F59D: 0C        .byte $0C   ; 
- D 3 - I - 0x03F5AE 0F:F59E: 1F        .byte $1F   ; 
- D 3 - I - 0x03F5AF 0F:F59F: AC        .byte $AC   ; 
- D 3 - I - 0x03F5B0 0F:F5A0: FC        .byte $FC   ; 
- D 3 - I - 0x03F5B1 0F:F5A1: 4B        .byte $4B   ; <K>
- D 3 - I - 0x03F5B2 0F:F5A2: 54        .byte $54   ; <T>
- D 3 - I - 0x03F5B3 0F:F5A3: 69        .byte $69   ; <i>
- D 3 - I - 0x03F5B4 0F:F5A4: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F5B5 0F:F5A5: 53        .byte $53   ; <S>
- D 3 - I - 0x03F5B6 0F:F5A6: B5        .byte $B5   ; 
- D 3 - I - 0x03F5B7 0F:F5A7: FC        .byte $FC   ; 
- D 3 - I - 0x03F5B8 0F:F5A8: 68        .byte $68   ; <h>
- D 3 - I - 0x03F5B9 0F:F5A9: C6        .byte $C6   ; 
- D 3 - I - 0x03F5BA 0F:F5AA: 68        .byte $68   ; <h>
- D 3 - I - 0x03F5BB 0F:F5AB: 45        .byte $45   ; <E>
- D 3 - I - 0x03F5BC 0F:F5AC: FC        .byte $FC   ; 
- D 3 - I - 0x03F5BD 0F:F5AD: BE        .byte $BE   ; 
- D 3 - I - 0x03F5BE 0F:F5AE: 3F        .byte $3F   ; 
- D 3 - I - 0x03F5BF 0F:F5AF: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F5C0 0F:F5B0: 69        .byte $69   ; <i>
- D 3 - I - 0x03F5C1 0F:F5B1: C3        .byte $C3   ; 
- D 3 - I - 0x03F5C2 0F:F5B2: FC        .byte $FC   ; 
- D 3 - I - 0x03F5C3 0F:F5B3: 62        .byte $62   ; <b>
- D 3 - I - 0x03F5C4 0F:F5B4: 45        .byte $45   ; <E>
- D 3 - I - 0x03F5C5 0F:F5B5: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F5C6 0F:F5B6: FC        .byte $FC   ; 
- D 3 - I - 0x03F5C7 0F:F5B7: 54        .byte $54   ; <T>
- D 3 - I - 0x03F5C8 0F:F5B8: 56        .byte $56   ; <V>
- D 3 - I - 0x03F5C9 0F:F5B9: 7D        .byte $7D   ; 
- D 3 - I - 0x03F5CA 0F:F5BA: 56        .byte $56   ; <V>
- D 3 - I - 0x03F5CB 0F:F5BB: 72        .byte $72   ; <r>
- D 3 - I - 0x03F5CC 0F:F5BC: FC        .byte $FC   ; 
- D 3 - I - 0x03F5CD 0F:F5BD: 58        .byte $58   ; <X>
- D 3 - I - 0x03F5CE 0F:F5BE: 42        .byte $42   ; <B>
- D 3 - I - 0x03F5CF 0F:F5BF: FC        .byte $FC   ; 
- D 3 - I - 0x03F5D0 0F:F5C0: B9        .byte $B9   ; 
- D 3 - I - 0x03F5D1 0F:F5C1: B4        .byte $B4   ; 
- D 3 - I - 0x03F5D2 0F:F5C2: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F5D3 0F:F5C3: FC        .byte $FC   ; 
- D 3 - I - 0x03F5D4 0F:F5C4: C1        .byte $C1   ; 
- D 3 - I - 0x03F5D5 0F:F5C5: 74        .byte $74   ; <t>
- D 3 - I - 0x03F5D6 0F:F5C6: 43        .byte $43   ; <C>
- D 3 - I - 0x03F5D7 0F:F5C7: 4E        .byte $4E   ; <N>
- D 3 - I - 0x03F5D8 0F:F5C8: 43        .byte $43   ; <C>
- D 3 - I - 0x03F5D9 0F:F5C9: FC        .byte $FC   ; 
- D 3 - I - 0x03F5DA 0F:F5CA: 46        .byte $46   ; <F>
- D 3 - I - 0x03F5DB 0F:F5CB: 69        .byte $69   ; <i>
- D 3 - I - 0x03F5DC 0F:F5CC: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F5DD 0F:F5CD: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F5DE 0F:F5CE: FC        .byte $FC   ; 
- D 3 - I - 0x03F5DF 0F:F5CF: 4B        .byte $4B   ; <K>
- D 3 - I - 0x03F5E0 0F:F5D0: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F5E1 0F:F5D1: 50        .byte $50   ; <P>
- D 3 - I - 0x03F5E2 0F:F5D2: 5F        .byte $5F   ; 
- D 3 - I - 0x03F5E3 0F:F5D3: 68        .byte $68   ; <h>
- D 3 - I - 0x03F5E4 0F:F5D4: 41        .byte $41   ; <A>
- D 3 - I - 0x03F5E5 0F:F5D5: FC        .byte $FC   ; 
- D 3 - I - 0x03F5E6 0F:F5D6: BA        .byte $BA   ; 
- D 3 - I - 0x03F5E7 0F:F5D7: 75        .byte $75   ; <u>
- D 3 - I - 0x03F5E8 0F:F5D8: 54        .byte $54   ; <T>
- D 3 - I - 0x03F5E9 0F:F5D9: 7D        .byte $7D   ; 
- D 3 - I - 0x03F5EA 0F:F5DA: 68        .byte $68   ; <h>
- D 3 - I - 0x03F5EB 0F:F5DB: 45        .byte $45   ; <E>
- D 3 - I - 0x03F5EC 0F:F5DC: FC        .byte $FC   ; 
- D 3 - I - 0x03F5ED 0F:F5DD: A6        .byte $A6   ; 
- D 3 - I - 0x03F5EE 0F:F5DE: 14        .byte $14   ; 
- D 3 - I - 0x03F5EF 0F:F5DF: 03        .byte $03   ; 
- D 3 - I - 0x03F5F0 0F:F5E0: FC        .byte $FC   ; 
- D 3 - I - 0x03F5F1 0F:F5E1: 0B        .byte $0B   ; 
- D 3 - I - 0x03F5F2 0F:F5E2: 19        .byte $19   ; 
- D 3 - I - 0x03F5F3 0F:F5E3: FC        .byte $FC   ; 
- D 3 - I - 0x03F5F4 0F:F5E4: 1F        .byte $1F   ; 
- D 3 - I - 0x03F5F5 0F:F5E5: 0B        .byte $0B   ; 
- D 3 - I - 0x03F5F6 0F:F5E6: 05        .byte $05   ; 
- D 3 - I - 0x03F5F7 0F:F5E7: FC        .byte $FC   ; 
- D 3 - I - 0x03F5F8 0F:F5E8: 06        .byte $06   ; 
- D 3 - I - 0x03F5F9 0F:F5E9: A7        .byte $A7   ; 
- D 3 - I - 0x03F5FA 0F:F5EA: 05        .byte $05   ; 
- D 3 - I - 0x03F5FB 0F:F5EB: FC        .byte $FC   ; 
- D 3 - I - 0x03F5FC 0F:F5EC: 0F        .byte $0F   ; 
- D 3 - I - 0x03F5FD 0F:F5ED: 03        .byte $03   ; 
- D 3 - I - 0x03F5FE 0F:F5EE: AA        .byte $AA   ; 
- D 3 - I - 0x03F5FF 0F:F5EF: FC        .byte $FC   ; 
- D 3 - I - 0x03F600 0F:F5F0: 15        .byte $15   ; 
- D 3 - I - 0x03F601 0F:F5F1: 06        .byte $06   ; 
- D 3 - I - 0x03F602 0F:F5F2: 16        .byte $16   ; 
- D 3 - I - 0x03F603 0F:F5F3: 0C        .byte $0C   ; 
- D 3 - I - 0x03F604 0F:F5F4: FC        .byte $FC   ; 
- D 3 - I - 0x03F605 0F:F5F5: 20        .byte $20   ; 
- D 3 - I - 0x03F606 0F:F5F6: 0D        .byte $0D   ; 
- D 3 - I - 0x03F607 0F:F5F7: A1        .byte $A1   ; 
- D 3 - I - 0x03F608 0F:F5F8: FC        .byte $FC   ; 
- D 3 - I - 0x03F609 0F:F5F9: 1F        .byte $1F   ; 
- D 3 - I - 0x03F60A 0F:F5FA: 12        .byte $12   ; 
- D 3 - I - 0x03F60B 0F:F5FB: 24        .byte $24   ; 
- D 3 - I - 0x03F60C 0F:F5FC: 1F        .byte $1F   ; 
- D 3 - I - 0x03F60D 0F:F5FD: FC        .byte $FC   ; 
- D 3 - I - 0x03F60E 0F:F5FE: 1B        .byte $1B   ; 
- D 3 - I - 0x03F60F 0F:F5FF: 31        .byte $31   ; <1>
- D 3 - I - 0x03F610 0F:F600: 03        .byte $03   ; 
- D 3 - I - 0x03F611 0F:F601: A0        .byte $A0   ; 
- D 3 - I - 0x03F612 0F:F602: FC        .byte $FC   ; 
- D 3 - I - 0x03F613 0F:F603: 0F        .byte $0F   ; 
- D 3 - I - 0x03F614 0F:F604: 28        .byte $28   ; 
- D 3 - I - 0x03F615 0F:F605: 1F        .byte $1F   ; 
- D 3 - I - 0x03F616 0F:F606: 11        .byte $11   ; 
- D 3 - I - 0x03F617 0F:F607: FC        .byte $FC   ; 
- D 3 - I - 0x03F618 0F:F608: 0B        .byte $0B   ; 
- D 3 - I - 0x03F619 0F:F609: 2C        .byte $2C   ; 
- D 3 - I - 0x03F61A 0F:F60A: AA        .byte $AA   ; 
- D 3 - I - 0x03F61B 0F:F60B: FC        .byte $FC   ; 
- D 3 - I - 0x03F61C 0F:F60C: 2C        .byte $2C   ; 
- D 3 - I - 0x03F61D 0F:F60D: 06        .byte $06   ; 
- D 3 - I - 0x03F61E 0F:F60E: 0C        .byte $0C   ; 
- D 3 - I - 0x03F61F 0F:F60F: 1F        .byte $1F   ; 
- D 3 - I - 0x03F620 0F:F610: AC        .byte $AC   ; 
- D 3 - I - 0x03F621 0F:F611: FC        .byte $FC   ; 
- D 3 - I - 0x03F622 0F:F612: 67        .byte $67   ; <g>
- D 3 - I - 0x03F623 0F:F613: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F624 0F:F614: CE        .byte $CE   ; 
- D 3 - I - 0x03F625 0F:F615: 45        .byte $45   ; <E>
- D 3 - I - 0x03F626 0F:F616: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F627 0F:F617: FC        .byte $FC   ; 
- D 3 - I - 0x03F628 0F:F618: C4        .byte $C4   ; 
- D 3 - I - 0x03F629 0F:F619: 48        .byte $48   ; <H>
- D 3 - I - 0x03F62A 0F:F61A: 54        .byte $54   ; <T>
- D 3 - I - 0x03F62B 0F:F61B: 68        .byte $68   ; <h>
- D 3 - I - 0x03F62C 0F:F61C: 7D        .byte $7D   ; 
- D 3 - I - 0x03F62D 0F:F61D: 59        .byte $59   ; <Y>
- D 3 - I - 0x03F62E 0F:F61E: FC        .byte $FC   ; 
- D 3 - I - 0x03F62F 0F:F61F: BE        .byte $BE   ; 
- D 3 - I - 0x03F630 0F:F620: 3F        .byte $3F   ; 
- D 3 - I - 0x03F631 0F:F621: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F632 0F:F622: 69        .byte $69   ; <i>
- D 3 - I - 0x03F633 0F:F623: C3        .byte $C3   ; 
- D 3 - I - 0x03F634 0F:F624: FC        .byte $FC   ; 
- D 3 - I - 0x03F635 0F:F625: 46        .byte $46   ; <F>
- D 3 - I - 0x03F636 0F:F626: D0        .byte $D0   ; 
- D 3 - I - 0x03F637 0F:F627: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F638 0F:F628: 5F        .byte $5F   ; 
- D 3 - I - 0x03F639 0F:F629: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F63A 0F:F62A: FC        .byte $FC   ; 
- D 3 - I - 0x03F63B 0F:F62B: 46        .byte $46   ; <F>
- D 3 - I - 0x03F63C 0F:F62C: 69        .byte $69   ; <i>
- D 3 - I - 0x03F63D 0F:F62D: 52        .byte $52   ; <R>
- D 3 - I - 0x03F63E 0F:F62E: FC        .byte $FC   ; 
- D 3 - I - 0x03F63F 0F:F62F: 62        .byte $62   ; <b>
- D 3 - I - 0x03F640 0F:F630: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F641 0F:F631: 52        .byte $52   ; <R>
- D 3 - I - 0x03F642 0F:F632: 73        .byte $73   ; <s>
- D 3 - I - 0x03F643 0F:F633: FC        .byte $FC   ; 
- D 3 - I - 0x03F644 0F:F634: 2C        .byte $2C   ; 
- D 3 - I - 0x03F645 0F:F635: 06        .byte $06   ; 
- D 3 - I - 0x03F646 0F:F636: AF        .byte $AF   ; 
- D 3 - I - 0x03F647 0F:F637: 24        .byte $24   ; 
- D 3 - I - 0x03F648 0F:F638: 0C        .byte $0C   ; 
- D 3 - I - 0x03F649 0F:F639: FC        .byte $FC   ; 
- D 3 - I - 0x03F64A 0F:F63A: 1B        .byte $1B   ; 
- D 3 - I - 0x03F64B 0F:F63B: 31        .byte $31   ; <1>
- D 3 - I - 0x03F64C 0F:F63C: 03        .byte $03   ; 
- D 3 - I - 0x03F64D 0F:F63D: A0        .byte $A0   ; 
- D 3 - I - 0x03F64E 0F:F63E: FC        .byte $FC   ; 
- D 3 - I - 0x03F64F 0F:F63F: 16        .byte $16   ; 
- D 3 - I - 0x03F650 0F:F640: 2F        .byte $2F   ; 
- D 3 - I - 0x03F651 0F:F641: 10        .byte $10   ; 
- D 3 - I - 0x03F652 0F:F642: FC        .byte $FC   ; 
- D 3 - I - 0x03F653 0F:F643: 0B        .byte $0B   ; 
- D 3 - I - 0x03F654 0F:F644: 19        .byte $19   ; 
- D 3 - I - 0x03F655 0F:F645: FC        .byte $FC   ; 
- D 3 - I - 0x03F656 0F:F646: 20        .byte $20   ; 
- D 3 - I - 0x03F657 0F:F647: 0B        .byte $0B   ; 
- D 3 - I - 0x03F658 0F:F648: 07        .byte $07   ; 
- D 3 - I - 0x03F659 0F:F649: FC        .byte $FC   ; 
- D 3 - I - 0x03F65A 0F:F64A: 20        .byte $20   ; 
- D 3 - I - 0x03F65B 0F:F64B: 0D        .byte $0D   ; 
- D 3 - I - 0x03F65C 0F:F64C: A1        .byte $A1   ; 
- D 3 - I - 0x03F65D 0F:F64D: FC        .byte $FC   ; 
- D 3 - I - 0x03F65E 0F:F64E: 1F        .byte $1F   ; 
- D 3 - I - 0x03F65F 0F:F64F: 0B        .byte $0B   ; 
- D 3 - I - 0x03F660 0F:F650: 05        .byte $05   ; 
- D 3 - I - 0x03F661 0F:F651: FC        .byte $FC   ; 
- D 3 - I - 0x03F662 0F:F652: 06        .byte $06   ; 
- D 3 - I - 0x03F663 0F:F653: A7        .byte $A7   ; 
- D 3 - I - 0x03F664 0F:F654: 05        .byte $05   ; 
- D 3 - I - 0x03F665 0F:F655: FC        .byte $FC   ; 
- D 3 - I - 0x03F666 0F:F656: A6        .byte $A6   ; 
- D 3 - I - 0x03F667 0F:F657: 14        .byte $14   ; 
- D 3 - I - 0x03F668 0F:F658: 03        .byte $03   ; 
- D 3 - I - 0x03F669 0F:F659: FC        .byte $FC   ; 
- D 3 - I - 0x03F66A 0F:F65A: 02        .byte $02   ; 
- D 3 - I - 0x03F66B 0F:F65B: 0C        .byte $0C   ; 
- D 3 - I - 0x03F66C 0F:F65C: A5        .byte $A5   ; 
- D 3 - I - 0x03F66D 0F:F65D: 07        .byte $07   ; 
- D 3 - I - 0x03F66E 0F:F65E: FC        .byte $FC   ; 
- D 3 - I - 0x03F66F 0F:F65F: 0F        .byte $0F   ; 
- D 3 - I - 0x03F670 0F:F660: 03        .byte $03   ; 
- D 3 - I - 0x03F671 0F:F661: AA        .byte $AA   ; 
- D 3 - I - 0x03F672 0F:F662: FC        .byte $FC   ; 
- D 3 - I - 0x03F673 0F:F663: 1F        .byte $1F   ; 
- D 3 - I - 0x03F674 0F:F664: 12        .byte $12   ; 
- D 3 - I - 0x03F675 0F:F665: 24        .byte $24   ; 
- D 3 - I - 0x03F676 0F:F666: 1F        .byte $1F   ; 
- D 3 - I - 0x03F677 0F:F667: FC        .byte $FC   ; 
- D 3 - I - 0x03F678 0F:F668: 2C        .byte $2C   ; 
- D 3 - I - 0x03F679 0F:F669: 06        .byte $06   ; 
- D 3 - I - 0x03F67A 0F:F66A: 0C        .byte $0C   ; 
- D 3 - I - 0x03F67B 0F:F66B: 1F        .byte $1F   ; 
- D 3 - I - 0x03F67C 0F:F66C: AC        .byte $AC   ; 
- D 3 - I - 0x03F67D 0F:F66D: FC        .byte $FC   ; 
- D 3 - I - 0x03F67E 0F:F66E: 68        .byte $68   ; <h>
- D 3 - I - 0x03F67F 0F:F66F: 3F        .byte $3F   ; 
- D 3 - I - 0x03F680 0F:F670: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03F681 0F:F671: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F682 0F:F672: 58        .byte $58   ; <X>
- D 3 - I - 0x03F683 0F:F673: FC        .byte $FC   ; 
- D 3 - I - 0x03F684 0F:F674: 68        .byte $68   ; <h>
- D 3 - I - 0x03F685 0F:F675: 3F        .byte $3F   ; 
- D 3 - I - 0x03F686 0F:F676: C3        .byte $C3   ; 
- D 3 - I - 0x03F687 0F:F677: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F688 0F:F678: 48        .byte $48   ; <H>
- D 3 - I - 0x03F689 0F:F679: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F68A 0F:F67A: FC        .byte $FC   ; 
- D 3 - I - 0x03F68B 0F:F67B: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F68C 0F:F67C: 70        .byte $70   ; <p>
- D 3 - I - 0x03F68D 0F:F67D: FC        .byte $FC   ; 
- D 3 - I - 0x03F68E 0F:F67E: 47        .byte $47   ; <G>
- D 3 - I - 0x03F68F 0F:F67F: 61        .byte $61   ; <a>
- D 3 - I - 0x03F690 0F:F680: FC        .byte $FC   ; 
- D 3 - I - 0x03F691 0F:F681: 5F        .byte $5F   ; 
- D 3 - I - 0x03F692 0F:F682: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F693 0F:F683: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03F694 0F:F684: 7D        .byte $7D   ; 
- D 3 - I - 0x03F695 0F:F685: FC        .byte $FC   ; 
- D 3 - I - 0x03F696 0F:F686: BA        .byte $BA   ; 
- D 3 - I - 0x03F697 0F:F687: 70        .byte $70   ; <p>
- D 3 - I - 0x03F698 0F:F688: 42        .byte $42   ; <B>
- D 3 - I - 0x03F699 0F:F689: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F69A 0F:F68A: 51        .byte $51   ; <Q>
- D 3 - I - 0x03F69B 0F:F68B: FC        .byte $FC   ; 
- D 3 - I - 0x03F69C 0F:F68C: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F69D 0F:F68D: 68        .byte $68   ; <h>
- D 3 - I - 0x03F69E 0F:F68E: 5F        .byte $5F   ; 
- D 3 - I - 0x03F69F 0F:F68F: 7D        .byte $7D   ; 
- D 3 - I - 0x03F6A0 0F:F690: FC        .byte $FC   ; 
- D 3 - I - 0x03F6A1 0F:F691: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F6A2 0F:F692: C5        .byte $C5   ; 
- D 3 - I - 0x03F6A3 0F:F693: 4F        .byte $4F   ; <O>
- D 3 - I - 0x03F6A4 0F:F694: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F6A5 0F:F695: FC        .byte $FC   ; 
- D 3 - I - 0x03F6A6 0F:F696: C6        .byte $C6   ; 
- D 3 - I - 0x03F6A7 0F:F697: 67        .byte $67   ; <g>
- D 3 - I - 0x03F6A8 0F:F698: 44        .byte $44   ; <D>
- D 3 - I - 0x03F6A9 0F:F699: 5C        .byte $5C   ; 
- D 3 - I - 0x03F6AA 0F:F69A: FC        .byte $FC   ; 
- D 3 - I - 0x03F6AB 0F:F69B: 67        .byte $67   ; <g>
- D 3 - I - 0x03F6AC 0F:F69C: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F6AD 0F:F69D: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F6AE 0F:F69E: FC        .byte $FC   ; 
- D 3 - I - 0x03F6AF 0F:F69F: 55        .byte $55   ; <U>
- D 3 - I - 0x03F6B0 0F:F6A0: D1        .byte $D1   ; 
- D 3 - I - 0x03F6B1 0F:F6A1: 6A        .byte $6A   ; <j>
- D 3 - I - 0x03F6B2 0F:F6A2: 45        .byte $45   ; <E>
- D 3 - I - 0x03F6B3 0F:F6A3: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F6B4 0F:F6A4: FC        .byte $FC   ; 
- D 3 - I - 0x03F6B5 0F:F6A5: CE        .byte $CE   ; 
- D 3 - I - 0x03F6B6 0F:F6A6: 44        .byte $44   ; <D>
- D 3 - I - 0x03F6B7 0F:F6A7: 7D        .byte $7D   ; 
- D 3 - I - 0x03F6B8 0F:F6A8: 69        .byte $69   ; <i>
- D 3 - I - 0x03F6B9 0F:F6A9: FC        .byte $FC   ; 
- D 3 - I - 0x03F6BA 0F:F6AA: 44        .byte $44   ; <D>
- D 3 - I - 0x03F6BB 0F:F6AB: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F6BC 0F:F6AC: CD        .byte $CD   ; 
- D 3 - I - 0x03F6BD 0F:F6AD: 7D        .byte $7D   ; 
- D 3 - I - 0x03F6BE 0F:F6AE: 56        .byte $56   ; <V>
- D 3 - I - 0x03F6BF 0F:F6AF: 70        .byte $70   ; <p>
- D 3 - I - 0x03F6C0 0F:F6B0: FC        .byte $FC   ; 
- D 3 - I - 0x03F6C1 0F:F6B1: 67        .byte $67   ; <g>
- D 3 - I - 0x03F6C2 0F:F6B2: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F6C3 0F:F6B3: CE        .byte $CE   ; 
- D 3 - I - 0x03F6C4 0F:F6B4: 45        .byte $45   ; <E>
- D 3 - I - 0x03F6C5 0F:F6B5: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F6C6 0F:F6B6: FC        .byte $FC   ; 
- D 3 - I - 0x03F6C7 0F:F6B7: 5D        .byte $5D   ; 
- D 3 - I - 0x03F6C8 0F:F6B8: 69        .byte $69   ; <i>
- D 3 - I - 0x03F6C9 0F:F6B9: 55        .byte $55   ; <U>
- D 3 - I - 0x03F6CA 0F:F6BA: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F6CB 0F:F6BB: C1        .byte $C1   ; 
- D 3 - I - 0x03F6CC 0F:F6BC: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F6CD 0F:F6BD: FC        .byte $FC   ; 
- D 3 - I - 0x03F6CE 0F:F6BE: 42        .byte $42   ; <B>
- D 3 - I - 0x03F6CF 0F:F6BF: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F6D0 0F:F6C0: 67        .byte $67   ; <g>
- D 3 - I - 0x03F6D1 0F:F6C1: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F6D2 0F:F6C2: FC        .byte $FC   ; 
- D 3 - I - 0x03F6D3 0F:F6C3: 68        .byte $68   ; <h>
- D 3 - I - 0x03F6D4 0F:F6C4: C5        .byte $C5   ; 
- D 3 - I - 0x03F6D5 0F:F6C5: 50        .byte $50   ; <P>
- D 3 - I - 0x03F6D6 0F:F6C6: FC        .byte $FC   ; 
- D 3 - I - 0x03F6D7 0F:F6C7: CD        .byte $CD   ; 
- D 3 - I - 0x03F6D8 0F:F6C8: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F6D9 0F:F6C9: 46        .byte $46   ; <F>
- D 3 - I - 0x03F6DA 0F:F6CA: 69        .byte $69   ; <i>
- D 3 - I - 0x03F6DB 0F:F6CB: FC        .byte $FC   ; 
- D 3 - I - 0x03F6DC 0F:F6CC: 4B        .byte $4B   ; <K>
- D 3 - I - 0x03F6DD 0F:F6CD: 54        .byte $54   ; <T>
- D 3 - I - 0x03F6DE 0F:F6CE: 69        .byte $69   ; <i>
- D 3 - I - 0x03F6DF 0F:F6CF: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F6E0 0F:F6D0: 53        .byte $53   ; <S>
- D 3 - I - 0x03F6E1 0F:F6D1: B5        .byte $B5   ; 
- D 3 - I - 0x03F6E2 0F:F6D2: FC        .byte $FC   ; 
- D 3 - I - 0x03F6E3 0F:F6D3: C1        .byte $C1   ; 
- D 3 - I - 0x03F6E4 0F:F6D4: 74        .byte $74   ; <t>
- D 3 - I - 0x03F6E5 0F:F6D5: 41        .byte $41   ; <A>
- D 3 - I - 0x03F6E6 0F:F6D6: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F6E7 0F:F6D7: FC        .byte $FC   ; 
- D 3 - I - 0x03F6E8 0F:F6D8: C3        .byte $C3   ; 
- D 3 - I - 0x03F6E9 0F:F6D9: C4        .byte $C4   ; 
- D 3 - I - 0x03F6EA 0F:F6DA: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F6EB 0F:F6DB: 54        .byte $54   ; <T>
- D 3 - I - 0x03F6EC 0F:F6DC: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F6ED 0F:F6DD: FC        .byte $FC   ; 
- D 3 - I - 0x03F6EE 0F:F6DE: B4        .byte $B4   ; 
- D 3 - I - 0x03F6EF 0F:F6DF: 69        .byte $69   ; <i>
- D 3 - I - 0x03F6F0 0F:F6E0: C3        .byte $C3   ; 
- D 3 - I - 0x03F6F1 0F:F6E1: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F6F2 0F:F6E2: FC        .byte $FC   ; 
- D 3 - I - 0x03F6F3 0F:F6E3: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F6F4 0F:F6E4: 71        .byte $71   ; <q>
- D 3 - I - 0x03F6F5 0F:F6E5: 55        .byte $55   ; <U>
- D 3 - I - 0x03F6F6 0F:F6E6: 42        .byte $42   ; <B>
- D 3 - I - 0x03F6F7 0F:F6E7: BE        .byte $BE   ; 
- D 3 - I - 0x03F6F8 0F:F6E8: 7D        .byte $7D   ; 
- D 3 - I - 0x03F6F9 0F:F6E9: FC        .byte $FC   ; 
- D 3 - I - 0x03F6FA 0F:F6EA: 5F        .byte $5F   ; 
- D 3 - I - 0x03F6FB 0F:F6EB: 7D        .byte $7D   ; 
- D 3 - I - 0x03F6FC 0F:F6EC: B4        .byte $B4   ; 
- D 3 - I - 0x03F6FD 0F:F6ED: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F6FE 0F:F6EE: FC        .byte $FC   ; 
- D 3 - I - 0x03F6FF 0F:F6EF: 46        .byte $46   ; <F>
- D 3 - I - 0x03F700 0F:F6F0: 69        .byte $69   ; <i>
- D 3 - I - 0x03F701 0F:F6F1: 52        .byte $52   ; <R>
- D 3 - I - 0x03F702 0F:F6F2: FC        .byte $FC   ; 
- D 3 - I - 0x03F703 0F:F6F3: 62        .byte $62   ; <b>
- D 3 - I - 0x03F704 0F:F6F4: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F705 0F:F6F5: 52        .byte $52   ; <R>
- D 3 - I - 0x03F706 0F:F6F6: 73        .byte $73   ; <s>
- D 3 - I - 0x03F707 0F:F6F7: FC        .byte $FC   ; 
- D 3 - I - 0x03F708 0F:F6F8: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F709 0F:F6F9: 75        .byte $75   ; <u>
- D 3 - I - 0x03F70A 0F:F6FA: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F70B 0F:F6FB: 50        .byte $50   ; <P>
- D 3 - I - 0x03F70C 0F:F6FC: 7D        .byte $7D   ; 
- D 3 - I - 0x03F70D 0F:F6FD: FC        .byte $FC   ; 
- D 3 - I - 0x03F70E 0F:F6FE: 46        .byte $46   ; <F>
- D 3 - I - 0x03F70F 0F:F6FF: D0        .byte $D0   ; 
- D 3 - I - 0x03F710 0F:F700: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F711 0F:F701: 5F        .byte $5F   ; 
- D 3 - I - 0x03F712 0F:F702: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F713 0F:F703: FC        .byte $FC   ; 
- D 3 - I - 0x03F714 0F:F704: 60        .byte $60   ; 
- D 3 - I - 0x03F715 0F:F705: 71        .byte $71   ; <q>
- D 3 - I - 0x03F716 0F:F706: 7D        .byte $7D   ; 
- D 3 - I - 0x03F717 0F:F707: 67        .byte $67   ; <g>
- D 3 - I - 0x03F718 0F:F708: 7D        .byte $7D   ; 
- D 3 - I - 0x03F719 0F:F709: FC        .byte $FC   ; 
- D 3 - I - 0x03F71A 0F:F70A: 46        .byte $46   ; <F>
- D 3 - I - 0x03F71B 0F:F70B: 69        .byte $69   ; <i>
- D 3 - I - 0x03F71C 0F:F70C: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F71D 0F:F70D: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F71E 0F:F70E: FC        .byte $FC   ; 
- D 3 - I - 0x03F71F 0F:F70F: B9        .byte $B9   ; 
- D 3 - I - 0x03F720 0F:F710: B4        .byte $B4   ; 
- D 3 - I - 0x03F721 0F:F711: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F722 0F:F712: FC        .byte $FC   ; 
- D 3 - I - 0x03F723 0F:F713: 68        .byte $68   ; <h>
- D 3 - I - 0x03F724 0F:F714: C6        .byte $C6   ; 
- D 3 - I - 0x03F725 0F:F715: 68        .byte $68   ; <h>
- D 3 - I - 0x03F726 0F:F716: 45        .byte $45   ; <E>
- D 3 - I - 0x03F727 0F:F717: FC        .byte $FC   ; 
- D 3 - I - 0x03F728 0F:F718: 58        .byte $58   ; <X>
- D 3 - I - 0x03F729 0F:F719: 42        .byte $42   ; <B>
- D 3 - I - 0x03F72A 0F:F71A: FC        .byte $FC   ; 
- D 3 - I - 0x03F72B 0F:F71B: 4B        .byte $4B   ; <K>
- D 3 - I - 0x03F72C 0F:F71C: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F72D 0F:F71D: 50        .byte $50   ; <P>
- D 3 - I - 0x03F72E 0F:F71E: 5F        .byte $5F   ; 
- D 3 - I - 0x03F72F 0F:F71F: 68        .byte $68   ; <h>
- D 3 - I - 0x03F730 0F:F720: 41        .byte $41   ; <A>
- D 3 - I - 0x03F731 0F:F721: FC        .byte $FC   ; 
- D 3 - I - 0x03F732 0F:F722: 54        .byte $54   ; <T>
- D 3 - I - 0x03F733 0F:F723: 56        .byte $56   ; <V>
- D 3 - I - 0x03F734 0F:F724: 7D        .byte $7D   ; 
- D 3 - I - 0x03F735 0F:F725: 56        .byte $56   ; <V>
- D 3 - I - 0x03F736 0F:F726: 72        .byte $72   ; <r>
- D 3 - I - 0x03F737 0F:F727: FC        .byte $FC   ; 
- D 3 - I - 0x03F738 0F:F728: C2        .byte $C2   ; 
- D 3 - I - 0x03F739 0F:F729: 54        .byte $54   ; <T>
- D 3 - I - 0x03F73A 0F:F72A: 7D        .byte $7D   ; 
- D 3 - I - 0x03F73B 0F:F72B: 69        .byte $69   ; <i>
- D 3 - I - 0x03F73C 0F:F72C: FC        .byte $FC   ; 
- D 3 - I - 0x03F73D 0F:F72D: 41        .byte $41   ; <A>
- D 3 - I - 0x03F73E 0F:F72E: 5F        .byte $5F   ; 
- D 3 - I - 0x03F73F 0F:F72F: 67        .byte $67   ; <g>
- D 3 - I - 0x03F740 0F:F730: 43        .byte $43   ; <C>
- D 3 - I - 0x03F741 0F:F731: FC        .byte $FC   ; 
- D 3 - I - 0x03F742 0F:F732: C1        .byte $C1   ; 
- D 3 - I - 0x03F743 0F:F733: 74        .byte $74   ; <t>
- D 3 - I - 0x03F744 0F:F734: 43        .byte $43   ; <C>
- D 3 - I - 0x03F745 0F:F735: 4E        .byte $4E   ; <N>
- D 3 - I - 0x03F746 0F:F736: 43        .byte $43   ; <C>
- D 3 - I - 0x03F747 0F:F737: FC        .byte $FC   ; 
- D 3 - I - 0x03F748 0F:F738: BA        .byte $BA   ; 
- D 3 - I - 0x03F749 0F:F739: 75        .byte $75   ; <u>
- D 3 - I - 0x03F74A 0F:F73A: 54        .byte $54   ; <T>
- D 3 - I - 0x03F74B 0F:F73B: 7D        .byte $7D   ; 
- D 3 - I - 0x03F74C 0F:F73C: 68        .byte $68   ; <h>
- D 3 - I - 0x03F74D 0F:F73D: 45        .byte $45   ; <E>
- D 3 - I - 0x03F74E 0F:F73E: FC        .byte $FC   ; 
- D 3 - I - 0x03F74F 0F:F73F: B7        .byte $B7   ; 
- D 3 - I - 0x03F750 0F:F740: 69        .byte $69   ; <i>
- D 3 - I - 0x03F751 0F:F741: 53        .byte $53   ; <S>
- D 3 - I - 0x03F752 0F:F742: 74        .byte $74   ; <t>
- D 3 - I - 0x03F753 0F:F743: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F754 0F:F744: FC        .byte $FC   ; 
- D 3 - I - 0x03F755 0F:F745: 4A        .byte $4A   ; <J>
- D 3 - I - 0x03F756 0F:F746: 42        .byte $42   ; <B>
- D 3 - I - 0x03F757 0F:F747: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F758 0F:F748: C5        .byte $C5   ; 
- D 3 - I - 0x03F759 0F:F749: 67        .byte $67   ; <g>
- D 3 - I - 0x03F75A 0F:F74A: FC        .byte $FC   ; 
- D 3 - I - 0x03F75B 0F:F74B: 4B        .byte $4B   ; <K>
- D 3 - I - 0x03F75C 0F:F74C: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F75D 0F:F74D: CD        .byte $CD   ; 
- D 3 - I - 0x03F75E 0F:F74E: 43        .byte $43   ; <C>
- D 3 - I - 0x03F75F 0F:F74F: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F760 0F:F750: FC        .byte $FC   ; 
- D 3 - I - 0x03F761 0F:F751: 15        .byte $15   ; 
- D 3 - I - 0x03F762 0F:F752: 2E        .byte $2E   ; 
- D 3 - I - 0x03F763 0F:F753: 06        .byte $06   ; 
- D 3 - I - 0x03F764 0F:F754: 12        .byte $12   ; 
- D 3 - I - 0x03F765 0F:F755: FC        .byte $FC   ; 
- D 3 - I - 0x03F766 0F:F756: 16        .byte $16   ; 
- D 3 - I - 0x03F767 0F:F757: 1E        .byte $1E   ; 
- D 3 - I - 0x03F768 0F:F758: 2E        .byte $2E   ; 
- D 3 - I - 0x03F769 0F:F759: FC        .byte $FC   ; 
- D 3 - I - 0x03F76A 0F:F75A: 5C        .byte $5C   ; 
- D 3 - I - 0x03F76B 0F:F75B: 69        .byte $69   ; <i>
- D 3 - I - 0x03F76C 0F:F75C: 60        .byte $60   ; 
- D 3 - I - 0x03F76D 0F:F75D: 58        .byte $58   ; <X>
- D 3 - I - 0x03F76E 0F:F75E: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F76F 0F:F75F: 4E        .byte $4E   ; <N>
- D 3 - I - 0x03F770 0F:F760: FC        .byte $FC   ; 
- D 3 - I - 0x03F771 0F:F761: 4A        .byte $4A   ; <J>
- D 3 - I - 0x03F772 0F:F762: 68        .byte $68   ; <h>
- D 3 - I - 0x03F773 0F:F763: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F774 0F:F764: 51        .byte $51   ; <Q>
- D 3 - I - 0x03F775 0F:F765: 70        .byte $70   ; <p>
- D 3 - I - 0x03F776 0F:F766: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F777 0F:F767: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F778 0F:F768: FC        .byte $FC   ; 
- D 3 - I - 0x03F779 0F:F769: B6        .byte $B6   ; 
- D 3 - I - 0x03F77A 0F:F76A: 6A        .byte $6A   ; <j>
- D 3 - I - 0x03F77B 0F:F76B: 60        .byte $60   ; 
- D 3 - I - 0x03F77C 0F:F76C: 45        .byte $45   ; <E>
- D 3 - I - 0x03F77D 0F:F76D: FC        .byte $FC   ; 
- D 3 - I - 0x03F77E 0F:F76E: CD        .byte $CD   ; 
- D 3 - I - 0x03F77F 0F:F76F: 69        .byte $69   ; <i>
- D 3 - I - 0x03F780 0F:F770: 62        .byte $62   ; <b>
- D 3 - I - 0x03F781 0F:F771: 42        .byte $42   ; <B>
- D 3 - I - 0x03F782 0F:F772: 67        .byte $67   ; <g>
- D 3 - I - 0x03F783 0F:F773: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F784 0F:F774: FC        .byte $FC   ; 
- D 3 - I - 0x03F785 0F:F775: 4B        .byte $4B   ; <K>
- D 3 - I - 0x03F786 0F:F776: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F787 0F:F777: 54        .byte $54   ; <T>
- D 3 - I - 0x03F788 0F:F778: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F789 0F:F779: FC        .byte $FC   ; 
- D 3 - I - 0x03F78A 0F:F77A: 5C        .byte $5C   ; 
- D 3 - I - 0x03F78B 0F:F77B: 67        .byte $67   ; <g>
- D 3 - I - 0x03F78C 0F:F77C: 62        .byte $62   ; <b>
- D 3 - I - 0x03F78D 0F:F77D: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F78E 0F:F77E: B8        .byte $B8   ; 
- D 3 - I - 0x03F78F 0F:F77F: FC        .byte $FC   ; 
- D 3 - I - 0x03F790 0F:F780: 08        .byte $08   ; 
- D 3 - I - 0x03F791 0F:F781: 16        .byte $16   ; 
- D 3 - I - 0x03F792 0F:F782: 20        .byte $20   ; 
- D 3 - I - 0x03F793 0F:F783: FC        .byte $FC   ; 
- D 3 - I - 0x03F794 0F:F784: 01        .byte $01   ; 
- D 3 - I - 0x03F795 0F:F785: 07        .byte $07   ; 
- D 3 - I - 0x03F796 0F:F786: 10        .byte $10   ; 
- D 3 - I - 0x03F797 0F:F787: FC        .byte $FC   ; 
- D 3 - I - 0x03F798 0F:F788: 10        .byte $10   ; 
- D 3 - I - 0x03F799 0F:F789: 12        .byte $12   ; 
- D 3 - I - 0x03F79A 0F:F78A: 15        .byte $15   ; 
- D 3 - I - 0x03F79B 0F:F78B: 20        .byte $20   ; 
- D 3 - I - 0x03F79C 0F:F78C: FC        .byte $FC   ; 
- D 3 - I - 0x03F79D 0F:F78D: 21        .byte $21   ; 
- D 3 - I - 0x03F79E 0F:F78E: 0B        .byte $0B   ; 
- D 3 - I - 0x03F79F 0F:F78F: 0C        .byte $0C   ; 
- D 3 - I - 0x03F7A0 0F:F790: FC        .byte $FC   ; 
- D 3 - I - 0x03F7A1 0F:F791: 1C        .byte $1C   ; 
- D 3 - I - 0x03F7A2 0F:F792: 27        .byte $27   ; 
- D 3 - I - 0x03F7A3 0F:F793: 19        .byte $19   ; 
- D 3 - I - 0x03F7A4 0F:F794: FC        .byte $FC   ; 
- D 3 - I - 0x03F7A5 0F:F795: 14        .byte $14   ; 
- D 3 - I - 0x03F7A6 0F:F796: 03        .byte $03   ; 
- D 3 - I - 0x03F7A7 0F:F797: 1E        .byte $1E   ; 
- D 3 - I - 0x03F7A8 0F:F798: 03        .byte $03   ; 
- D 3 - I - 0x03F7A9 0F:F799: FC        .byte $FC   ; 
- D 3 - I - 0x03F7AA 0F:F79A: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F7AB 0F:F79B: 7D        .byte $7D   ; 
- D 3 - I - 0x03F7AC 0F:F79C: 5F        .byte $5F   ; 
- D 3 - I - 0x03F7AD 0F:F79D: FC        .byte $FC   ; 
- D 3 - I - 0x03F7AE 0F:F79E: 43        .byte $43   ; <C>
- D 3 - I - 0x03F7AF 0F:F79F: 69        .byte $69   ; <i>
- D 3 - I - 0x03F7B0 0F:F7A0: B6        .byte $B6   ; 
- D 3 - I - 0x03F7B1 0F:F7A1: 41        .byte $41   ; <A>
- D 3 - I - 0x03F7B2 0F:F7A2: 42        .byte $42   ; <B>
- D 3 - I - 0x03F7B3 0F:F7A3: FC        .byte $FC   ; 
- D 3 - I - 0x03F7B4 0F:F7A4: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03F7B5 0F:F7A5: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F7B6 0F:F7A6: C5        .byte $C5   ; 
- D 3 - I - 0x03F7B7 0F:F7A7: 69        .byte $69   ; <i>
- D 3 - I - 0x03F7B8 0F:F7A8: B4        .byte $B4   ; 
- D 3 - I - 0x03F7B9 0F:F7A9: 7D        .byte $7D   ; 
- D 3 - I - 0x03F7BA 0F:F7AA: FC        .byte $FC   ; 
- D 3 - I - 0x03F7BB 0F:F7AB: 16        .byte $16   ; 
- D 3 - I - 0x03F7BC 0F:F7AC: 1E        .byte $1E   ; 
- D 3 - I - 0x03F7BD 0F:F7AD: 2E        .byte $2E   ; 
- D 3 - I - 0x03F7BE 0F:F7AE: FC        .byte $FC   ; 
- D 3 - I - 0x03F7BF 0F:F7AF: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F7C0 0F:F7B0: 68        .byte $68   ; <h>
- D 3 - I - 0x03F7C1 0F:F7B1: 41        .byte $41   ; <A>
- D 3 - I - 0x03F7C2 0F:F7B2: FC        .byte $FC   ; 
- D 3 - I - 0x03F7C3 0F:F7B3: 11        .byte $11   ; 
- D 3 - I - 0x03F7C4 0F:F7B4: 31        .byte $31   ; <1>
- D 3 - I - 0x03F7C5 0F:F7B5: 03        .byte $03   ; 
- D 3 - I - 0x03F7C6 0F:F7B6: A4        .byte $A4   ; 
- D 3 - I - 0x03F7C7 0F:F7B7: 08        .byte $08   ; 
- D 3 - I - 0x03F7C8 0F:F7B8: FC        .byte $FC   ; 
- D 3 - I - 0x03F7C9 0F:F7B9: 42        .byte $42   ; <B>
- D 3 - I - 0x03F7CA 0F:F7BA: 67        .byte $67   ; <g>
- D 3 - I - 0x03F7CB 0F:F7BB: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F7CC 0F:F7BC: FC        .byte $FC   ; 
- D 3 - I - 0x03F7CD 0F:F7BD: 07        .byte $07   ; 
- D 3 - I - 0x03F7CE 0F:F7BE: 10        .byte $10   ; 
- D 3 - I - 0x03F7CF 0F:F7BF: 11        .byte $11   ; 
- D 3 - I - 0x03F7D0 0F:F7C0: 32        .byte $32   ; <2>
- D 3 - I - 0x03F7D1 0F:F7C1: 03        .byte $03   ; 
- D 3 - I - 0x03F7D2 0F:F7C2: 0E        .byte $0E   ; 
- D 3 - I - 0x03F7D3 0F:F7C3: 2E        .byte $2E   ; 
- D 3 - I - 0x03F7D4 0F:F7C4: FC        .byte $FC   ; 
- D 3 - I - 0x03F7D5 0F:F7C5: 4B        .byte $4B   ; <K>
- D 3 - I - 0x03F7D6 0F:F7C6: 43        .byte $43   ; <C>
- D 3 - I - 0x03F7D7 0F:F7C7: BA        .byte $BA   ; 
- D 3 - I - 0x03F7D8 0F:F7C8: 41        .byte $41   ; <A>
- D 3 - I - 0x03F7D9 0F:F7C9: 67        .byte $67   ; <g>
- D 3 - I - 0x03F7DA 0F:F7CA: C4        .byte $C4   ; 
- D 3 - I - 0x03F7DB 0F:F7CB: 41        .byte $41   ; <A>
- D 3 - I - 0x03F7DC 0F:F7CC: FC        .byte $FC   ; 
- D 3 - I - 0x03F7DD 0F:F7CD: 06        .byte $06   ; 
- D 3 - I - 0x03F7DE 0F:F7CE: 2E        .byte $2E   ; 
- D 3 - I - 0x03F7DF 0F:F7CF: 0A        .byte $0A   ; 
- D 3 - I - 0x03F7E0 0F:F7D0: 08        .byte $08   ; 
- D 3 - I - 0x03F7E1 0F:F7D1: FC        .byte $FC   ; 
- D 3 - I - 0x03F7E2 0F:F7D2: C3        .byte $C3   ; 
- D 3 - I - 0x03F7E3 0F:F7D3: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F7E4 0F:F7D4: 4A        .byte $4A   ; <J>
- D 3 - I - 0x03F7E5 0F:F7D5: 3F        .byte $3F   ; 
- D 3 - I - 0x03F7E6 0F:F7D6: BE        .byte $BE   ; 
- D 3 - I - 0x03F7E7 0F:F7D7: 3F        .byte $3F   ; 
- D 3 - I - 0x03F7E8 0F:F7D8: B4        .byte $B4   ; 
- D 3 - I - 0x03F7E9 0F:F7D9: 5F        .byte $5F   ; 
- D 3 - I - 0x03F7EA 0F:F7DA: FC        .byte $FC   ; 
- D 3 - I - 0x03F7EB 0F:F7DB: D1        .byte $D1   ; 
- D 3 - I - 0x03F7EC 0F:F7DC: 7D        .byte $7D   ; 
- D 3 - I - 0x03F7ED 0F:F7DD: 67        .byte $67   ; <g>
- D 3 - I - 0x03F7EE 0F:F7DE: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F7EF 0F:F7DF: C2        .byte $C2   ; 
- D 3 - I - 0x03F7F0 0F:F7E0: FC        .byte $FC   ; 
- D 3 - I - 0x03F7F1 0F:F7E1: 42        .byte $42   ; <B>
- D 3 - I - 0x03F7F2 0F:F7E2: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F7F3 0F:F7E3: B6        .byte $B6   ; 
- D 3 - I - 0x03F7F4 0F:F7E4: 67        .byte $67   ; <g>
- D 3 - I - 0x03F7F5 0F:F7E5: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F7F6 0F:F7E6: C2        .byte $C2   ; 
- D 3 - I - 0x03F7F7 0F:F7E7: FC        .byte $FC   ; 
- D 3 - I - 0x03F7F8 0F:F7E8: 4F        .byte $4F   ; <O>
- D 3 - I - 0x03F7F9 0F:F7E9: C4        .byte $C4   ; 
- D 3 - I - 0x03F7FA 0F:F7EA: 44        .byte $44   ; <D>
- D 3 - I - 0x03F7FB 0F:F7EB: 54        .byte $54   ; <T>
- D 3 - I - 0x03F7FC 0F:F7EC: FC        .byte $FC   ; 
- D 3 - I - 0x03F7FD 0F:F7ED: 5C        .byte $5C   ; 
- D 3 - I - 0x03F7FE 0F:F7EE: 67        .byte $67   ; <g>
- D 3 - I - 0x03F7FF 0F:F7EF: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F800 0F:F7F0: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F801 0F:F7F1: FC        .byte $FC   ; 
- D 3 - I - 0x03F802 0F:F7F2: 62        .byte $62   ; <b>
- D 3 - I - 0x03F803 0F:F7F3: 47        .byte $47   ; <G>
- D 3 - I - 0x03F804 0F:F7F4: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F805 0F:F7F5: 4A        .byte $4A   ; <J>
- D 3 - I - 0x03F806 0F:F7F6: FC        .byte $FC   ; 
- D 3 - I - 0x03F807 0F:F7F7: 42        .byte $42   ; <B>
- D 3 - I - 0x03F808 0F:F7F8: 50        .byte $50   ; <P>
- D 3 - I - 0x03F809 0F:F7F9: 68        .byte $68   ; <h>
- D 3 - I - 0x03F80A 0F:F7FA: 41        .byte $41   ; <A>
- D 3 - I - 0x03F80B 0F:F7FB: FC        .byte $FC   ; 
- D 3 - I - 0x03F80C 0F:F7FC: 45        .byte $45   ; <E>
- D 3 - I - 0x03F80D 0F:F7FD: 67        .byte $67   ; <g>
- D 3 - I - 0x03F80E 0F:F7FE: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F80F 0F:F7FF: BE        .byte $BE   ; 
- D 3 - I - 0x03F810 0F:F800: FC        .byte $FC   ; 
- D 3 - I - 0x03F811 0F:F801: 41        .byte $41   ; <A>
- D 3 - I - 0x03F812 0F:F802: 69        .byte $69   ; <i>
- D 3 - I - 0x03F813 0F:F803: BC        .byte $BC   ; 
- D 3 - I - 0x03F814 0F:F804: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F815 0F:F805: 51        .byte $51   ; <Q>
- D 3 - I - 0x03F816 0F:F806: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F817 0F:F807: FC        .byte $FC   ; 
- D 3 - I - 0x03F818 0F:F808: 56        .byte $56   ; <V>
- D 3 - I - 0x03F819 0F:F809: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F81A 0F:F80A: C2        .byte $C2   ; 
- D 3 - I - 0x03F81B 0F:F80B: 42        .byte $42   ; <B>
- D 3 - I - 0x03F81C 0F:F80C: 52        .byte $52   ; <R>
- D 3 - I - 0x03F81D 0F:F80D: FC        .byte $FC   ; 
- D 3 - I - 0x03F81E 0F:F80E: C5        .byte $C5   ; 
- D 3 - I - 0x03F81F 0F:F80F: 67        .byte $67   ; <g>
- D 3 - I - 0x03F820 0F:F810: BA        .byte $BA   ; 
- D 3 - I - 0x03F821 0F:F811: 69        .byte $69   ; <i>
- D 3 - I - 0x03F822 0F:F812: FC        .byte $FC   ; 
- D 3 - I - 0x03F823 0F:F813: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F824 0F:F814: 71        .byte $71   ; <q>
- D 3 - I - 0x03F825 0F:F815: 7D        .byte $7D   ; 
- D 3 - I - 0x03F826 0F:F816: 54        .byte $54   ; <T>
- D 3 - I - 0x03F827 0F:F817: FC        .byte $FC   ; 
- D 3 - I - 0x03F828 0F:F818: C7        .byte $C7   ; 
- D 3 - I - 0x03F829 0F:F819: 6A        .byte $6A   ; <j>
- D 3 - I - 0x03F82A 0F:F81A: 7D        .byte $7D   ; 
- D 3 - I - 0x03F82B 0F:F81B: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F82C 0F:F81C: 71        .byte $71   ; <q>
- D 3 - I - 0x03F82D 0F:F81D: 7D        .byte $7D   ; 
- D 3 - I - 0x03F82E 0F:F81E: 54        .byte $54   ; <T>
- D 3 - I - 0x03F82F 0F:F81F: FC        .byte $FC   ; 
- D 3 - I - 0x03F830 0F:F820: 5D        .byte $5D   ; 
- D 3 - I - 0x03F831 0F:F821: C1        .byte $C1   ; 
- D 3 - I - 0x03F832 0F:F822: 74        .byte $74   ; <t>
- D 3 - I - 0x03F833 0F:F823: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F834 0F:F824: B6        .byte $B6   ; 
- D 3 - I - 0x03F835 0F:F825: FC        .byte $FC   ; 
- D 3 - I - 0x03F836 0F:F826: C2        .byte $C2   ; 
- D 3 - I - 0x03F837 0F:F827: 67        .byte $67   ; <g>
- D 3 - I - 0x03F838 0F:F828: 42        .byte $42   ; <B>
- D 3 - I - 0x03F839 0F:F829: C5        .byte $C5   ; 
- D 3 - I - 0x03F83A 0F:F82A: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F83B 0F:F82B: 71        .byte $71   ; <q>
- D 3 - I - 0x03F83C 0F:F82C: 7D        .byte $7D   ; 
- D 3 - I - 0x03F83D 0F:F82D: 54        .byte $54   ; <T>
- D 3 - I - 0x03F83E 0F:F82E: FC        .byte $FC   ; 
- D 3 - I - 0x03F83F 0F:F82F: C2        .byte $C2   ; 
- D 3 - I - 0x03F840 0F:F830: 67        .byte $67   ; <g>
- D 3 - I - 0x03F841 0F:F831: 42        .byte $42   ; <B>
- D 3 - I - 0x03F842 0F:F832: C5        .byte $C5   ; 
- D 3 - I - 0x03F843 0F:F833: 45        .byte $45   ; <E>
- D 3 - I - 0x03F844 0F:F834: 7D        .byte $7D   ; 
- D 3 - I - 0x03F845 0F:F835: C3        .byte $C3   ; 
- D 3 - I - 0x03F846 0F:F836: 7D        .byte $7D   ; 
- D 3 - I - 0x03F847 0F:F837: 5D        .byte $5D   ; 
- D 3 - I - 0x03F848 0F:F838: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F849 0F:F839: C2        .byte $C2   ; 
- D 3 - I - 0x03F84A 0F:F83A: FC        .byte $FC   ; 
- D 3 - I - 0x03F84B 0F:F83B: 1A        .byte $1A   ; 
- D 3 - I - 0x03F84C 0F:F83C: 24        .byte $24   ; 
- D 3 - I - 0x03F84D 0F:F83D: B1        .byte $B1   ; 
- D 3 - I - 0x03F84E 0F:F83E: 0B        .byte $0B   ; 
- D 3 - I - 0x03F84F 0F:F83F: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F850 0F:F840: 71        .byte $71   ; <q>
- D 3 - I - 0x03F851 0F:F841: 7D        .byte $7D   ; 
- D 3 - I - 0x03F852 0F:F842: 54        .byte $54   ; <T>
- D 3 - I - 0x03F853 0F:F843: FC        .byte $FC   ; 
- D 3 - I - 0x03F854 0F:F844: 1A        .byte $1A   ; 
- D 3 - I - 0x03F855 0F:F845: 24        .byte $24   ; 
- D 3 - I - 0x03F856 0F:F846: B1        .byte $B1   ; 
- D 3 - I - 0x03F857 0F:F847: 0B        .byte $0B   ; 
- D 3 - I - 0x03F858 0F:F848: C7        .byte $C7   ; 
- D 3 - I - 0x03F859 0F:F849: 6A        .byte $6A   ; <j>
- D 3 - I - 0x03F85A 0F:F84A: 7D        .byte $7D   ; 
- D 3 - I - 0x03F85B 0F:F84B: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F85C 0F:F84C: 71        .byte $71   ; <q>
- D 3 - I - 0x03F85D 0F:F84D: 7D        .byte $7D   ; 
- D 3 - I - 0x03F85E 0F:F84E: 54        .byte $54   ; <T>
- D 3 - I - 0x03F85F 0F:F84F: FC        .byte $FC   ; 
- D 3 - I - 0x03F860 0F:F850: 46        .byte $46   ; <F>
- D 3 - I - 0x03F861 0F:F851: 60        .byte $60   ; 
- D 3 - I - 0x03F862 0F:F852: 4F        .byte $4F   ; <O>
- D 3 - I - 0x03F863 0F:F853: 68        .byte $68   ; <h>
- D 3 - I - 0x03F864 0F:F854: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F865 0F:F855: 71        .byte $71   ; <q>
- D 3 - I - 0x03F866 0F:F856: 7D        .byte $7D   ; 
- D 3 - I - 0x03F867 0F:F857: 54        .byte $54   ; <T>
- D 3 - I - 0x03F868 0F:F858: FC        .byte $FC   ; 
- D 3 - I - 0x03F869 0F:F859: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F86A 0F:F85A: 46        .byte $46   ; <F>
- D 3 - I - 0x03F86B 0F:F85B: 42        .byte $42   ; <B>
- D 3 - I - 0x03F86C 0F:F85C: 67        .byte $67   ; <g>
- D 3 - I - 0x03F86D 0F:F85D: C5        .byte $C5   ; 
- D 3 - I - 0x03F86E 0F:F85E: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03F86F 0F:F85F: 68        .byte $68   ; <h>
- D 3 - I - 0x03F870 0F:F860: 49        .byte $49   ; <I>
- D 3 - I - 0x03F871 0F:F861: 7D        .byte $7D   ; 
- D 3 - I - 0x03F872 0F:F862: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F873 0F:F863: FC        .byte $FC   ; 
- D 3 - I - 0x03F874 0F:F864: 52        .byte $52   ; <R>
- D 3 - I - 0x03F875 0F:F865: 42        .byte $42   ; <B>
- D 3 - I - 0x03F876 0F:F866: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F877 0F:F867: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F878 0F:F868: 71        .byte $71   ; <q>
- D 3 - I - 0x03F879 0F:F869: 7D        .byte $7D   ; 
- D 3 - I - 0x03F87A 0F:F86A: 54        .byte $54   ; <T>
- D 3 - I - 0x03F87B 0F:F86B: FC        .byte $FC   ; 
- D 3 - I - 0x03F87C 0F:F86C: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F87D 0F:F86D: 46        .byte $46   ; <F>
- D 3 - I - 0x03F87E 0F:F86E: 42        .byte $42   ; <B>
- D 3 - I - 0x03F87F 0F:F86F: 67        .byte $67   ; <g>
- D 3 - I - 0x03F880 0F:F870: C5        .byte $C5   ; 
- D 3 - I - 0x03F881 0F:F871: 52        .byte $52   ; <R>
- D 3 - I - 0x03F882 0F:F872: 42        .byte $42   ; <B>
- D 3 - I - 0x03F883 0F:F873: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F884 0F:F874: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F885 0F:F875: 71        .byte $71   ; <q>
- D 3 - I - 0x03F886 0F:F876: 7D        .byte $7D   ; 
- D 3 - I - 0x03F887 0F:F877: 54        .byte $54   ; <T>
- D 3 - I - 0x03F888 0F:F878: FC        .byte $FC   ; 
- D 3 - I - 0x03F889 0F:F879: 42        .byte $42   ; <B>
- D 3 - I - 0x03F88A 0F:F87A: 7D        .byte $7D   ; 
- D 3 - I - 0x03F88B 0F:F87B: B6        .byte $B6   ; 
- D 3 - I - 0x03F88C 0F:F87C: 69        .byte $69   ; <i>
- D 3 - I - 0x03F88D 0F:F87D: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F88E 0F:F87E: 72        .byte $72   ; <r>
- D 3 - I - 0x03F88F 0F:F87F: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F890 0F:F880: 54        .byte $54   ; <T>
- D 3 - I - 0x03F891 0F:F881: FC        .byte $FC   ; 
- D 3 - I - 0x03F892 0F:F882: 50        .byte $50   ; <P>
- D 3 - I - 0x03F893 0F:F883: 42        .byte $42   ; <B>
- D 3 - I - 0x03F894 0F:F884: B4        .byte $B4   ; 
- D 3 - I - 0x03F895 0F:F885: 7D        .byte $7D   ; 
- D 3 - I - 0x03F896 0F:F886: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F897 0F:F887: 72        .byte $72   ; <r>
- D 3 - I - 0x03F898 0F:F888: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F899 0F:F889: 54        .byte $54   ; <T>
- D 3 - I - 0x03F89A 0F:F88A: FC        .byte $FC   ; 
- D 3 - I - 0x03F89B 0F:F88B: 58        .byte $58   ; <X>
- D 3 - I - 0x03F89C 0F:F88C: 45        .byte $45   ; <E>
- D 3 - I - 0x03F89D 0F:F88D: 3F        .byte $3F   ; 
- D 3 - I - 0x03F89E 0F:F88E: 50        .byte $50   ; <P>
- D 3 - I - 0x03F89F 0F:F88F: 42        .byte $42   ; <B>
- D 3 - I - 0x03F8A0 0F:F890: B4        .byte $B4   ; 
- D 3 - I - 0x03F8A1 0F:F891: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8A2 0F:F892: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F8A3 0F:F893: 72        .byte $72   ; <r>
- D 3 - I - 0x03F8A4 0F:F894: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F8A5 0F:F895: 54        .byte $54   ; <T>
- D 3 - I - 0x03F8A6 0F:F896: FC        .byte $FC   ; 
- D 3 - I - 0x03F8A7 0F:F897: 45        .byte $45   ; <E>
- D 3 - I - 0x03F8A8 0F:F898: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8A9 0F:F899: C3        .byte $C3   ; 
- D 3 - I - 0x03F8AA 0F:F89A: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8AB 0F:F89B: 5D        .byte $5D   ; 
- D 3 - I - 0x03F8AC 0F:F89C: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F8AD 0F:F89D: C2        .byte $C2   ; 
- D 3 - I - 0x03F8AE 0F:F89E: 47        .byte $47   ; <G>
- D 3 - I - 0x03F8AF 0F:F89F: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F8B0 0F:F8A0: 48        .byte $48   ; <H>
- D 3 - I - 0x03F8B1 0F:F8A1: FC        .byte $FC   ; 
- D 3 - I - 0x03F8B2 0F:F8A2: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03F8B3 0F:F8A3: 42        .byte $42   ; <B>
- D 3 - I - 0x03F8B4 0F:F8A4: CD        .byte $CD   ; 
- D 3 - I - 0x03F8B5 0F:F8A5: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8B6 0F:F8A6: 45        .byte $45   ; <E>
- D 3 - I - 0x03F8B7 0F:F8A7: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8B8 0F:F8A8: C3        .byte $C3   ; 
- D 3 - I - 0x03F8B9 0F:F8A9: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8BA 0F:F8AA: 5D        .byte $5D   ; 
- D 3 - I - 0x03F8BB 0F:F8AB: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F8BC 0F:F8AC: C2        .byte $C2   ; 
- D 3 - I - 0x03F8BD 0F:F8AD: FC        .byte $FC   ; 
- D 3 - I - 0x03F8BE 0F:F8AE: BA        .byte $BA   ; 
- D 3 - I - 0x03F8BF 0F:F8AF: 70        .byte $70   ; <p>
- D 3 - I - 0x03F8C0 0F:F8B0: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F8C1 0F:F8B1: CE        .byte $CE   ; 
- D 3 - I - 0x03F8C2 0F:F8B2: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F8C3 0F:F8B3: B6        .byte $B6   ; 
- D 3 - I - 0x03F8C4 0F:F8B4: C7        .byte $C7   ; 
- D 3 - I - 0x03F8C5 0F:F8B5: 6A        .byte $6A   ; <j>
- D 3 - I - 0x03F8C6 0F:F8B6: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8C7 0F:F8B7: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F8C8 0F:F8B8: 71        .byte $71   ; <q>
- D 3 - I - 0x03F8C9 0F:F8B9: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8CA 0F:F8BA: 54        .byte $54   ; <T>
- D 3 - I - 0x03F8CB 0F:F8BB: FC        .byte $FC   ; 
- D 3 - I - 0x03F8CC 0F:F8BC: C2        .byte $C2   ; 
- D 3 - I - 0x03F8CD 0F:F8BD: 67        .byte $67   ; <g>
- D 3 - I - 0x03F8CE 0F:F8BE: 42        .byte $42   ; <B>
- D 3 - I - 0x03F8CF 0F:F8BF: C5        .byte $C5   ; 
- D 3 - I - 0x03F8D0 0F:F8C0: 50        .byte $50   ; <P>
- D 3 - I - 0x03F8D1 0F:F8C1: 42        .byte $42   ; <B>
- D 3 - I - 0x03F8D2 0F:F8C2: B4        .byte $B4   ; 
- D 3 - I - 0x03F8D3 0F:F8C3: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8D4 0F:F8C4: FC        .byte $FC   ; 
- D 3 - I - 0x03F8D5 0F:F8C5: 4B        .byte $4B   ; <K>
- D 3 - I - 0x03F8D6 0F:F8C6: 42        .byte $42   ; <B>
- D 3 - I - 0x03F8D7 0F:F8C7: 48        .byte $48   ; <H>
- D 3 - I - 0x03F8D8 0F:F8C8: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F8D9 0F:F8C9: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F8DA 0F:F8CA: FC        .byte $FC   ; 
- D 3 - I - 0x03F8DB 0F:F8CB: 0B        .byte $0B   ; 
- D 3 - I - 0x03F8DC 0F:F8CC: 19        .byte $19   ; 
- D 3 - I - 0x03F8DD 0F:F8CD: 14        .byte $14   ; 
- D 3 - I - 0x03F8DE 0F:F8CE: 19        .byte $19   ; 
- D 3 - I - 0x03F8DF 0F:F8CF: 4A        .byte $4A   ; <J>
- D 3 - I - 0x03F8E0 0F:F8D0: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F8E1 0F:F8D1: C4        .byte $C4   ; 
- D 3 - I - 0x03F8E2 0F:F8D2: CF        .byte $CF   ; 
- D 3 - I - 0x03F8E3 0F:F8D3: 6A        .byte $6A   ; <j>
- D 3 - I - 0x03F8E4 0F:F8D4: 42        .byte $42   ; <B>
- D 3 - I - 0x03F8E5 0F:F8D5: FC        .byte $FC   ; 
- D 3 - I - 0x03F8E6 0F:F8D6: C3        .byte $C3   ; 
- D 3 - I - 0x03F8E7 0F:F8D7: 55        .byte $55   ; <U>
- D 3 - I - 0x03F8E8 0F:F8D8: 55        .byte $55   ; <U>
- D 3 - I - 0x03F8E9 0F:F8D9: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F8EA 0F:F8DA: 71        .byte $71   ; <q>
- D 3 - I - 0x03F8EB 0F:F8DB: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8EC 0F:F8DC: 54        .byte $54   ; <T>
- D 3 - I - 0x03F8ED 0F:F8DD: FC        .byte $FC   ; 
- D 3 - I - 0x03F8EE 0F:F8DE: C5        .byte $C5   ; 
- D 3 - I - 0x03F8EF 0F:F8DF: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8F0 0F:F8E0: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F8F1 0F:F8E1: 50        .byte $50   ; <P>
- D 3 - I - 0x03F8F2 0F:F8E2: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8F3 0F:F8E3: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F8F4 0F:F8E4: 71        .byte $71   ; <q>
- D 3 - I - 0x03F8F5 0F:F8E5: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8F6 0F:F8E6: 54        .byte $54   ; <T>
- D 3 - I - 0x03F8F7 0F:F8E7: FC        .byte $FC   ; 
- D 3 - I - 0x03F8F8 0F:F8E8: 60        .byte $60   ; 
- D 3 - I - 0x03F8F9 0F:F8E9: 67        .byte $67   ; <g>
- D 3 - I - 0x03F8FA 0F:F8EA: 7D        .byte $7D   ; 
- D 3 - I - 0x03F8FB 0F:F8EB: BA        .byte $BA   ; 
- D 3 - I - 0x03F8FC 0F:F8EC: 71        .byte $71   ; <q>
- D 3 - I - 0x03F8FD 0F:F8ED: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F8FE 0F:F8EE: 71        .byte $71   ; <q>
- D 3 - I - 0x03F8FF 0F:F8EF: 7D        .byte $7D   ; 
- D 3 - I - 0x03F900 0F:F8F0: 54        .byte $54   ; <T>
- D 3 - I - 0x03F901 0F:F8F1: FC        .byte $FC   ; 
- D 3 - I - 0x03F902 0F:F8F2: 5F        .byte $5F   ; 
- D 3 - I - 0x03F903 0F:F8F3: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F904 0F:F8F4: 5A        .byte $5A   ; <Z>
- D 3 - I - 0x03F905 0F:F8F5: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F906 0F:F8F6: 71        .byte $71   ; <q>
- D 3 - I - 0x03F907 0F:F8F7: 7D        .byte $7D   ; 
- D 3 - I - 0x03F908 0F:F8F8: 54        .byte $54   ; <T>
- D 3 - I - 0x03F909 0F:F8F9: FC        .byte $FC   ; 
- D 3 - I - 0x03F90A 0F:F8FA: 4B        .byte $4B   ; <K>
- D 3 - I - 0x03F90B 0F:F8FB: 42        .byte $42   ; <B>
- D 3 - I - 0x03F90C 0F:F8FC: C2        .byte $C2   ; 
- D 3 - I - 0x03F90D 0F:F8FD: 6C        .byte $6C   ; <l>
- D 3 - I - 0x03F90E 0F:F8FE: 42        .byte $42   ; <B>
- D 3 - I - 0x03F90F 0F:F8FF: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F910 0F:F900: BE        .byte $BE   ; 
- D 3 - I - 0x03F911 0F:F901: 7D        .byte $7D   ; 
- D 3 - I - 0x03F912 0F:F902: FC        .byte $FC   ; 
- D 3 - I - 0x03F913 0F:F903: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F914 0F:F904: 67        .byte $67   ; <g>
- D 3 - I - 0x03F915 0F:F905: 42        .byte $42   ; <B>
- D 3 - I - 0x03F916 0F:F906: BE        .byte $BE   ; 
- D 3 - I - 0x03F917 0F:F907: 7D        .byte $7D   ; 
- D 3 - I - 0x03F918 0F:F908: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F919 0F:F909: 71        .byte $71   ; <q>
- D 3 - I - 0x03F91A 0F:F90A: 7D        .byte $7D   ; 
- D 3 - I - 0x03F91B 0F:F90B: 54        .byte $54   ; <T>
- D 3 - I - 0x03F91C 0F:F90C: FC        .byte $FC   ; 
- D 3 - I - 0x03F91D 0F:F90D: 47        .byte $47   ; <G>
- D 3 - I - 0x03F91E 0F:F90E: 70        .byte $70   ; <p>
- D 3 - I - 0x03F91F 0F:F90F: 59        .byte $59   ; <Y>
- D 3 - I - 0x03F920 0F:F910: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F921 0F:F911: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F922 0F:F912: 71        .byte $71   ; <q>
- D 3 - I - 0x03F923 0F:F913: 7D        .byte $7D   ; 
- D 3 - I - 0x03F924 0F:F914: 54        .byte $54   ; <T>
- D 3 - I - 0x03F925 0F:F915: FC        .byte $FC   ; 
- D 3 - I - 0x03F926 0F:F916: 5C        .byte $5C   ; 
- D 3 - I - 0x03F927 0F:F917: 73        .byte $73   ; <s>
- D 3 - I - 0x03F928 0F:F918: 42        .byte $42   ; <B>
- D 3 - I - 0x03F929 0F:F919: 64        .byte $64   ; <d>
- D 3 - I - 0x03F92A 0F:F91A: 7D        .byte $7D   ; 
- D 3 - I - 0x03F92B 0F:F91B: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F92C 0F:F91C: 72        .byte $72   ; <r>
- D 3 - I - 0x03F92D 0F:F91D: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F92E 0F:F91E: 54        .byte $54   ; <T>
- D 3 - I - 0x03F92F 0F:F91F: FC        .byte $FC   ; 
- D 3 - I - 0x03F930 0F:F920: BE        .byte $BE   ; 
- D 3 - I - 0x03F931 0F:F921: 42        .byte $42   ; <B>
- D 3 - I - 0x03F932 0F:F922: 55        .byte $55   ; <U>
- D 3 - I - 0x03F933 0F:F923: 5F        .byte $5F   ; 
- D 3 - I - 0x03F934 0F:F924: 42        .byte $42   ; <B>
- D 3 - I - 0x03F935 0F:F925: 54        .byte $54   ; <T>
- D 3 - I - 0x03F936 0F:F926: 5D        .byte $5D   ; 
- D 3 - I - 0x03F937 0F:F927: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F938 0F:F928: C2        .byte $C2   ; 
- D 3 - I - 0x03F939 0F:F929: FC        .byte $FC   ; 
- D 3 - I - 0x03F93A 0F:F92A: 47        .byte $47   ; <G>
- D 3 - I - 0x03F93B 0F:F92B: 70        .byte $70   ; <p>
- D 3 - I - 0x03F93C 0F:F92C: 59        .byte $59   ; <Y>
- D 3 - I - 0x03F93D 0F:F92D: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F93E 0F:F92E: 5D        .byte $5D   ; 
- D 3 - I - 0x03F93F 0F:F92F: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F940 0F:F930: C2        .byte $C2   ; 
- D 3 - I - 0x03F941 0F:F931: FC        .byte $FC   ; 
- D 3 - I - 0x03F942 0F:F932: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F943 0F:F933: 49        .byte $49   ; <I>
- D 3 - I - 0x03F944 0F:F934: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F945 0F:F935: 54        .byte $54   ; <T>
- D 3 - I - 0x03F946 0F:F936: 5D        .byte $5D   ; 
- D 3 - I - 0x03F947 0F:F937: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F948 0F:F938: C2        .byte $C2   ; 
- D 3 - I - 0x03F949 0F:F939: FC        .byte $FC   ; 
- D 3 - I - 0x03F94A 0F:F93A: 0C        .byte $0C   ; 
- D 3 - I - 0x03F94B 0F:F93B: 32        .byte $32   ; <2>
- D 3 - I - 0x03F94C 0F:F93C: 03        .byte $03   ; 
- D 3 - I - 0x03F94D 0F:F93D: 28        .byte $28   ; 
- D 3 - I - 0x03F94E 0F:F93E: 31        .byte $31   ; <1>
- D 3 - I - 0x03F94F 0F:F93F: 03        .byte $03   ; 
- D 3 - I - 0x03F950 0F:F940: 07        .byte $07   ; 
- D 3 - I - 0x03F951 0F:F941: 30        .byte $30   ; <0>
- D 3 - I - 0x03F952 0F:F942: 08        .byte $08   ; 
- D 3 - I - 0x03F953 0F:F943: FC        .byte $FC   ; 
- D 3 - I - 0x03F954 0F:F944: A8        .byte $A8   ; 
- D 3 - I - 0x03F955 0F:F945: 2E        .byte $2E   ; 
- D 3 - I - 0x03F956 0F:F946: 13        .byte $13   ; 
- D 3 - I - 0x03F957 0F:F947: 2E        .byte $2E   ; 
- D 3 - I - 0x03F958 0F:F948: 4C        .byte $4C   ; <L>
- D 3 - I - 0x03F959 0F:F949: 71        .byte $71   ; <q>
- D 3 - I - 0x03F95A 0F:F94A: 7D        .byte $7D   ; 
- D 3 - I - 0x03F95B 0F:F94B: 54        .byte $54   ; <T>
- D 3 - I - 0x03F95C 0F:F94C: FC        .byte $FC   ; 
- D 3 - I - 0x03F95D 0F:F94D: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F95E 0F:F94E: 67        .byte $67   ; <g>
- D 3 - I - 0x03F95F 0F:F94F: 42        .byte $42   ; <B>
- D 3 - I - 0x03F960 0F:F950: BE        .byte $BE   ; 
- D 3 - I - 0x03F961 0F:F951: 7D        .byte $7D   ; 
- D 3 - I - 0x03F962 0F:F952: 47        .byte $47   ; <G>
- D 3 - I - 0x03F963 0F:F953: 70        .byte $70   ; <p>
- D 3 - I - 0x03F964 0F:F954: 59        .byte $59   ; <Y>
- D 3 - I - 0x03F965 0F:F955: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F966 0F:F956: FC        .byte $FC   ; 
- D 3 - I - 0x03F967 0F:F957: BE        .byte $BE   ; 
- D 3 - I - 0x03F968 0F:F958: C5        .byte $C5   ; 
- D 3 - I - 0x03F969 0F:F959: 69        .byte $69   ; <i>
- D 3 - I - 0x03F96A 0F:F95A: 42        .byte $42   ; <B>
- D 3 - I - 0x03F96B 0F:F95B: 7D        .byte $7D   ; 
- D 3 - I - 0x03F96C 0F:F95C: 69        .byte $69   ; <i>
- D 3 - I - 0x03F96D 0F:F95D: FC        .byte $FC   ; 
- D 3 - I - 0x03F96E 0F:F95E: C2        .byte $C2   ; 
- D 3 - I - 0x03F96F 0F:F95F: 68        .byte $68   ; <h>
- D 3 - I - 0x03F970 0F:F960: C5        .byte $C5   ; 
- D 3 - I - 0x03F971 0F:F961: 69        .byte $69   ; <i>
- D 3 - I - 0x03F972 0F:F962: FC        .byte $FC   ; 
- D 3 - I - 0x03F973 0F:F963: 5B        .byte $5B   ; 
- D 3 - I - 0x03F974 0F:F964: 7D        .byte $7D   ; 
- D 3 - I - 0x03F975 0F:F965: 69        .byte $69   ; <i>
- D 3 - I - 0x03F976 0F:F966: 68        .byte $68   ; <h>
- D 3 - I - 0x03F977 0F:F967: 5C        .byte $5C   ; 
- D 3 - I - 0x03F978 0F:F968: 54        .byte $54   ; <T>
- D 3 - I - 0x03F979 0F:F969: FC        .byte $FC   ; 
- D 3 - I - 0x03F97A 0F:F96A: A4        .byte $A4   ; 
- D 3 - I - 0x03F97B 0F:F96B: 03        .byte $03   ; 
- D 3 - I - 0x03F97C 0F:F96C: 02        .byte $02   ; 
- D 3 - I - 0x03F97D 0F:F96D: 2E        .byte $2E   ; 
- D 3 - I - 0x03F97E 0F:F96E: 15        .byte $15   ; 
- D 3 - I - 0x03F97F 0F:F96F: C2        .byte $C2   ; 
- D 3 - I - 0x03F980 0F:F970: 68        .byte $68   ; <h>
- D 3 - I - 0x03F981 0F:F971: C5        .byte $C5   ; 
- D 3 - I - 0x03F982 0F:F972: 69        .byte $69   ; <i>
- D 3 - I - 0x03F983 0F:F973: FC        .byte $FC   ; 
- D 3 - I - 0x03F984 0F:F974: 07        .byte $07   ; 
- D 3 - I - 0x03F985 0F:F975: 04        .byte $04   ; 
- D 3 - I - 0x03F986 0F:F976: 29        .byte $29   ; 
- D 3 - I - 0x03F987 0F:F977: 5C        .byte $5C   ; 
- D 3 - I - 0x03F988 0F:F978: 75        .byte $75   ; <u>
- D 3 - I - 0x03F989 0F:F979: 42        .byte $42   ; <B>
- D 3 - I - 0x03F98A 0F:F97A: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F98B 0F:F97B: 54        .byte $54   ; <T>
- D 3 - I - 0x03F98C 0F:F97C: FC        .byte $FC   ; 
- D 3 - I - 0x03F98D 0F:F97D: B1        .byte $B1   ; 
- D 3 - I - 0x03F98E 0F:F97E: 2E        .byte $2E   ; 
- D 3 - I - 0x03F98F 0F:F97F: 0C        .byte $0C   ; 
- D 3 - I - 0x03F990 0F:F980: 2E        .byte $2E   ; 
- D 3 - I - 0x03F991 0F:F981: C2        .byte $C2   ; 
- D 3 - I - 0x03F992 0F:F982: 68        .byte $68   ; <h>
- D 3 - I - 0x03F993 0F:F983: C5        .byte $C5   ; 
- D 3 - I - 0x03F994 0F:F984: 69        .byte $69   ; <i>
- D 3 - I - 0x03F995 0F:F985: FC        .byte $FC   ; 
- D 3 - I - 0x03F996 0F:F986: 0A        .byte $0A   ; 
- D 3 - I - 0x03F997 0F:F987: 03        .byte $03   ; 
- D 3 - I - 0x03F998 0F:F988: 0F        .byte $0F   ; 
- D 3 - I - 0x03F999 0F:F989: 08        .byte $08   ; 
- D 3 - I - 0x03F99A 0F:F98A: C2        .byte $C2   ; 
- D 3 - I - 0x03F99B 0F:F98B: 68        .byte $68   ; <h>
- D 3 - I - 0x03F99C 0F:F98C: C5        .byte $C5   ; 
- D 3 - I - 0x03F99D 0F:F98D: 69        .byte $69   ; <i>
- D 3 - I - 0x03F99E 0F:F98E: FC        .byte $FC   ; 
- D 3 - I - 0x03F99F 0F:F98F: 1A        .byte $1A   ; 
- D 3 - I - 0x03F9A0 0F:F990: 28        .byte $28   ; 
- D 3 - I - 0x03F9A1 0F:F991: 18        .byte $18   ; 
- D 3 - I - 0x03F9A2 0F:F992: A7        .byte $A7   ; 
- D 3 - I - 0x03F9A3 0F:F993: 20        .byte $20   ; 
- D 3 - I - 0x03F9A4 0F:F994: C2        .byte $C2   ; 
- D 3 - I - 0x03F9A5 0F:F995: 68        .byte $68   ; <h>
- D 3 - I - 0x03F9A6 0F:F996: C5        .byte $C5   ; 
- D 3 - I - 0x03F9A7 0F:F997: 69        .byte $69   ; <i>
- D 3 - I - 0x03F9A8 0F:F998: FC        .byte $FC   ; 
- D 3 - I - 0x03F9A9 0F:F999: CD        .byte $CD   ; 
- D 3 - I - 0x03F9AA 0F:F99A: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F9AB 0F:F99B: FC        .byte $FC   ; 
- D 3 - I - 0x03F9AC 0F:F99C: C2        .byte $C2   ; 
- D 3 - I - 0x03F9AD 0F:F99D: 67        .byte $67   ; <g>
- D 3 - I - 0x03F9AE 0F:F99E: 42        .byte $42   ; <B>
- D 3 - I - 0x03F9AF 0F:F99F: C5        .byte $C5   ; 
- D 3 - I - 0x03F9B0 0F:F9A0: CD        .byte $CD   ; 
- D 3 - I - 0x03F9B1 0F:F9A1: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F9B2 0F:F9A2: FC        .byte $FC   ; 
- D 3 - I - 0x03F9B3 0F:F9A3: 46        .byte $46   ; <F>
- D 3 - I - 0x03F9B4 0F:F9A4: 60        .byte $60   ; 
- D 3 - I - 0x03F9B5 0F:F9A5: 4F        .byte $4F   ; <O>
- D 3 - I - 0x03F9B6 0F:F9A6: 68        .byte $68   ; <h>
- D 3 - I - 0x03F9B7 0F:F9A7: CD        .byte $CD   ; 
- D 3 - I - 0x03F9B8 0F:F9A8: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F9B9 0F:F9A9: FC        .byte $FC   ; 
- D 3 - I - 0x03F9BA 0F:F9AA: 54        .byte $54   ; <T>
- D 3 - I - 0x03F9BB 0F:F9AB: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F9BC 0F:F9AC: CF        .byte $CF   ; 
- D 3 - I - 0x03F9BD 0F:F9AD: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F9BE 0F:F9AE: CE        .byte $CE   ; 
- D 3 - I - 0x03F9BF 0F:F9AF: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F9C0 0F:F9B0: CD        .byte $CD   ; 
- D 3 - I - 0x03F9C1 0F:F9B1: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F9C2 0F:F9B2: FC        .byte $FC   ; 
- D 3 - I - 0x03F9C3 0F:F9B3: 6C        .byte $6C   ; <l>
- D 3 - I - 0x03F9C4 0F:F9B4: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F9C5 0F:F9B5: 52        .byte $52   ; <R>
- D 3 - I - 0x03F9C6 0F:F9B6: 7D        .byte $7D   ; 
- D 3 - I - 0x03F9C7 0F:F9B7: 68        .byte $68   ; <h>
- D 3 - I - 0x03F9C8 0F:F9B8: 50        .byte $50   ; <P>
- D 3 - I - 0x03F9C9 0F:F9B9: 7D        .byte $7D   ; 
- D 3 - I - 0x03F9CA 0F:F9BA: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F9CB 0F:F9BB: FC        .byte $FC   ; 
- D 3 - I - 0x03F9CC 0F:F9BC: B8        .byte $B8   ; 
- D 3 - I - 0x03F9CD 0F:F9BD: 7D        .byte $7D   ; 
- D 3 - I - 0x03F9CE 0F:F9BE: 69        .byte $69   ; <i>
- D 3 - I - 0x03F9CF 0F:F9BF: C1        .byte $C1   ; 
- D 3 - I - 0x03F9D0 0F:F9C0: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F9D1 0F:F9C1: 4A        .byte $4A   ; <J>
- D 3 - I - 0x03F9D2 0F:F9C2: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F9D3 0F:F9C3: C4        .byte $C4   ; 
- D 3 - I - 0x03F9D4 0F:F9C4: FC        .byte $FC   ; 
- D 3 - I - 0x03F9D5 0F:F9C5: 14        .byte $14   ; 
- D 3 - I - 0x03F9D6 0F:F9C6: 03        .byte $03   ; 
- D 3 - I - 0x03F9D7 0F:F9C7: 1E        .byte $1E   ; 
- D 3 - I - 0x03F9D8 0F:F9C8: 03        .byte $03   ; 
- D 3 - I - 0x03F9D9 0F:F9C9: 4A        .byte $4A   ; <J>
- D 3 - I - 0x03F9DA 0F:F9CA: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03F9DB 0F:F9CB: C4        .byte $C4   ; 
- D 3 - I - 0x03F9DC 0F:F9CC: FC        .byte $FC   ; 
- D 3 - I - 0x03F9DD 0F:F9CD: BA        .byte $BA   ; 
- D 3 - I - 0x03F9DE 0F:F9CE: 75        .byte $75   ; <u>
- D 3 - I - 0x03F9DF 0F:F9CF: 60        .byte $60   ; 
- D 3 - I - 0x03F9E0 0F:F9D0: 56        .byte $56   ; <V>
- D 3 - I - 0x03F9E1 0F:F9D1: 41        .byte $41   ; <A>
- D 3 - I - 0x03F9E2 0F:F9D2: 50        .byte $50   ; <P>
- D 3 - I - 0x03F9E3 0F:F9D3: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F9E4 0F:F9D4: 48        .byte $48   ; <H>
- D 3 - I - 0x03F9E5 0F:F9D5: FC        .byte $FC   ; 
- D 3 - I - 0x03F9E6 0F:F9D6: 44        .byte $44   ; <D>
- D 3 - I - 0x03F9E7 0F:F9D7: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F9E8 0F:F9D8: 5C        .byte $5C   ; 
- D 3 - I - 0x03F9E9 0F:F9D9: 75        .byte $75   ; <u>
- D 3 - I - 0x03F9EA 0F:F9DA: 69        .byte $69   ; <i>
- D 3 - I - 0x03F9EB 0F:F9DB: 0A        .byte $0A   ; 
- D 3 - I - 0x03F9EC 0F:F9DC: 03        .byte $03   ; 
- D 3 - I - 0x03F9ED 0F:F9DD: A3        .byte $A3   ; 
- D 3 - I - 0x03F9EE 0F:F9DE: 07        .byte $07   ; 
- D 3 - I - 0x03F9EF 0F:F9DF: FC        .byte $FC   ; 
- D 3 - I - 0x03F9F0 0F:F9E0: C5        .byte $C5   ; 
- D 3 - I - 0x03F9F1 0F:F9E1: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F9F2 0F:F9E2: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F9F3 0F:F9E3: 48        .byte $48   ; <H>
- D 3 - I - 0x03F9F4 0F:F9E4: FC        .byte $FC   ; 
- D 3 - I - 0x03F9F5 0F:F9E5: A0        .byte $A0   ; 
- D 3 - I - 0x03F9F6 0F:F9E6: 2E        .byte $2E   ; 
- D 3 - I - 0x03F9F7 0F:F9E7: 22        .byte $22   ; 
- D 3 - I - 0x03F9F8 0F:F9E8: 2E        .byte $2E   ; 
- D 3 - I - 0x03F9F9 0F:F9E9: C5        .byte $C5   ; 
- D 3 - I - 0x03F9FA 0F:F9EA: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03F9FB 0F:F9EB: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03F9FC 0F:F9EC: 48        .byte $48   ; <H>
- D 3 - I - 0x03F9FD 0F:F9ED: FC        .byte $FC   ; 
- D 3 - I - 0x03F9FE 0F:F9EE: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03F9FF 0F:F9EF: 46        .byte $46   ; <F>
- D 3 - I - 0x03FA00 0F:F9F0: 42        .byte $42   ; <B>
- D 3 - I - 0x03FA01 0F:F9F1: 67        .byte $67   ; <g>
- D 3 - I - 0x03FA02 0F:F9F2: C5        .byte $C5   ; 
- D 3 - I - 0x03FA03 0F:F9F3: C5        .byte $C5   ; 
- D 3 - I - 0x03FA04 0F:F9F4: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03FA05 0F:F9F5: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03FA06 0F:F9F6: 48        .byte $48   ; <H>
- D 3 - I - 0x03FA07 0F:F9F7: FC        .byte $FC   ; 
- D 3 - I - 0x03FA08 0F:F9F8: CD        .byte $CD   ; 
- D 3 - I - 0x03FA09 0F:F9F9: 6C        .byte $6C   ; <l>
- D 3 - I - 0x03FA0A 0F:F9FA: 7D        .byte $7D   ; 
- D 3 - I - 0x03FA0B 0F:F9FB: C5        .byte $C5   ; 
- D 3 - I - 0x03FA0C 0F:F9FC: 6B        .byte $6B   ; <k>
- D 3 - I - 0x03FA0D 0F:F9FD: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03FA0E 0F:F9FE: 48        .byte $48   ; <H>
- D 3 - I - 0x03FA0F 0F:F9FF: FC        .byte $FC   ; 
- D 3 - I - 0x03FA10 0F:FA00: 50        .byte $50   ; <P>
- D 3 - I - 0x03FA11 0F:FA01: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03FA12 0F:FA02: 48        .byte $48   ; <H>
- D 3 - I - 0x03FA13 0F:FA03: 69        .byte $69   ; <i>
- D 3 - I - 0x03FA14 0F:FA04: FC        .byte $FC   ; 
- D 3 - I - 0x03FA15 0F:FA05: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03FA16 0F:FA06: 46        .byte $46   ; <F>
- D 3 - I - 0x03FA17 0F:FA07: 42        .byte $42   ; <B>
- D 3 - I - 0x03FA18 0F:FA08: 67        .byte $67   ; <g>
- D 3 - I - 0x03FA19 0F:FA09: C5        .byte $C5   ; 
- D 3 - I - 0x03FA1A 0F:FA0A: 50        .byte $50   ; <P>
- D 3 - I - 0x03FA1B 0F:FA0B: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03FA1C 0F:FA0C: 48        .byte $48   ; <H>
- D 3 - I - 0x03FA1D 0F:FA0D: 69        .byte $69   ; <i>
- D 3 - I - 0x03FA1E 0F:FA0E: FC        .byte $FC   ; 
- D 3 - I - 0x03FA1F 0F:FA0F: 46        .byte $46   ; <F>
- D 3 - I - 0x03FA20 0F:FA10: 60        .byte $60   ; 
- D 3 - I - 0x03FA21 0F:FA11: 4F        .byte $4F   ; <O>
- D 3 - I - 0x03FA22 0F:FA12: 68        .byte $68   ; <h>
- D 3 - I - 0x03FA23 0F:FA13: 50        .byte $50   ; <P>
- D 3 - I - 0x03FA24 0F:FA14: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03FA25 0F:FA15: 48        .byte $48   ; <H>
- D 3 - I - 0x03FA26 0F:FA16: 69        .byte $69   ; <i>
- D 3 - I - 0x03FA27 0F:FA17: FC        .byte $FC   ; 
- D 3 - I - 0x03FA28 0F:FA18: CD        .byte $CD   ; 
- D 3 - I - 0x03FA29 0F:FA19: 6C        .byte $6C   ; <l>
- D 3 - I - 0x03FA2A 0F:FA1A: 7D        .byte $7D   ; 
- D 3 - I - 0x03FA2B 0F:FA1B: 50        .byte $50   ; <P>
- D 3 - I - 0x03FA2C 0F:FA1C: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03FA2D 0F:FA1D: 48        .byte $48   ; <H>
- D 3 - I - 0x03FA2E 0F:FA1E: 69        .byte $69   ; <i>
- D 3 - I - 0x03FA2F 0F:FA1F: FC        .byte $FC   ; 
- D 3 - I - 0x03FA30 0F:FA20: 50        .byte $50   ; <P>
- D 3 - I - 0x03FA31 0F:FA21: 42        .byte $42   ; <B>
- D 3 - I - 0x03FA32 0F:FA22: B4        .byte $B4   ; 
- D 3 - I - 0x03FA33 0F:FA23: 7D        .byte $7D   ; 
- D 3 - I - 0x03FA34 0F:FA24: 50        .byte $50   ; <P>
- D 3 - I - 0x03FA35 0F:FA25: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03FA36 0F:FA26: 48        .byte $48   ; <H>
- D 3 - I - 0x03FA37 0F:FA27: 69        .byte $69   ; <i>
- D 3 - I - 0x03FA38 0F:FA28: FC        .byte $FC   ; 
- - - - - - 0x03FA39 0F:FA29: 50        .byte $50   ; <P>
- - - - - - 0x03FA3A 0F:FA2A: 6F        .byte $6F   ; <o>
- - - - - - 0x03FA3B 0F:FA2B: 48        .byte $48   ; <H>
- - - - - - 0x03FA3C 0F:FA2C: 69        .byte $69   ; <i>
- - - - - - 0x03FA3D 0F:FA2D: FC        .byte $FC   ; 
- D 3 - I - 0x03FA3E 0F:FA2E: CD        .byte $CD   ; 
- D 3 - I - 0x03FA3F 0F:FA2F: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03FA40 0F:FA30: 46        .byte $46   ; <F>
- D 3 - I - 0x03FA41 0F:FA31: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03FA42 0F:FA32: 54        .byte $54   ; <T>
- D 3 - I - 0x03FA43 0F:FA33: FC        .byte $FC   ; 
- D 3 - I - 0x03FA44 0F:FA34: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03FA45 0F:FA35: 46        .byte $46   ; <F>
- D 3 - I - 0x03FA46 0F:FA36: 42        .byte $42   ; <B>
- D 3 - I - 0x03FA47 0F:FA37: 67        .byte $67   ; <g>
- D 3 - I - 0x03FA48 0F:FA38: C5        .byte $C5   ; 
- D 3 - I - 0x03FA49 0F:FA39: CD        .byte $CD   ; 
- D 3 - I - 0x03FA4A 0F:FA3A: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03FA4B 0F:FA3B: 46        .byte $46   ; <F>
- D 3 - I - 0x03FA4C 0F:FA3C: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03FA4D 0F:FA3D: 54        .byte $54   ; <T>
- D 3 - I - 0x03FA4E 0F:FA3E: FC        .byte $FC   ; 
- D 3 - I - 0x03FA4F 0F:FA3F: 54        .byte $54   ; <T>
- D 3 - I - 0x03FA50 0F:FA40: 67        .byte $67   ; <g>
- D 3 - I - 0x03FA51 0F:FA41: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03FA52 0F:FA42: CF        .byte $CF   ; 
- D 3 - I - 0x03FA53 0F:FA43: FC        .byte $FC   ; 
- D 3 - I - 0x03FA54 0F:FA44: 4D        .byte $4D   ; <M>
- D 3 - I - 0x03FA55 0F:FA45: 69        .byte $69   ; <i>
- D 3 - I - 0x03FA56 0F:FA46: 7D        .byte $7D   ; 
- D 3 - I - 0x03FA57 0F:FA47: FC        .byte $FC   ; 
- D 3 - I - 0x03FA58 0F:FA48: 48        .byte $48   ; <H>
- D 3 - I - 0x03FA59 0F:FA49: 68        .byte $68   ; <h>
- D 3 - I - 0x03FA5A 0F:FA4A: 41        .byte $41   ; <A>
- D 3 - I - 0x03FA5B 0F:FA4B: 7D        .byte $7D   ; 
- D 3 - I - 0x03FA5C 0F:FA4C: FC        .byte $FC   ; 
- - - - - - 0x03FA5D 0F:FA4D: 48        .byte $48   ; <H>
- - - - - - 0x03FA5E 0F:FA4E: 68        .byte $68   ; <h>
- - - - - - 0x03FA5F 0F:FA4F: 41        .byte $41   ; <A>
- - - - - - 0x03FA60 0F:FA50: 7D        .byte $7D   ; 
- - - - - - 0x03FA61 0F:FA51: FC        .byte $FC   ; 
- - - - - - 0x03FA62 0F:FA52: 0E        .byte $0E   ; 
- - - - - - 0x03FA63 0F:FA53: 28        .byte $28   ; 
- - - - - - 0x03FA64 0F:FA54: 01        .byte $01   ; 
- - - - - - 0x03FA65 0F:FA55: 02        .byte $02   ; 
- - - - - - 0x03FA66 0F:FA56: FC        .byte $FC   ; 
- - - - - - 0x03FA67 0F:FA57: 0E        .byte $0E   ; 
- - - - - - 0x03FA68 0F:FA58: 28        .byte $28   ; 
- - - - - - 0x03FA69 0F:FA59: 01        .byte $01   ; 
- - - - - - 0x03FA6A 0F:FA5A: 02        .byte $02   ; 
- - - - - - 0x03FA6B 0F:FA5B: FC        .byte $FC   ; 
- - - - - - 0x03FA6C 0F:FA5C: 5C        .byte $5C   ; 
- - - - - - 0x03FA6D 0F:FA5D: 76        .byte $76   ; <v>
- - - - - - 0x03FA6E 0F:FA5E: 6B        .byte $6B   ; <k>
- - - - - - 0x03FA6F 0F:FA5F: 7D        .byte $7D   ; 
- - - - - - 0x03FA70 0F:FA60: FC        .byte $FC   ; 
- D 3 - I - 0x03FA71 0F:FA61: 47        .byte $47   ; <G>
- D 3 - I - 0x03FA72 0F:FA62: 70        .byte $70   ; <p>
- D 3 - I - 0x03FA73 0F:FA63: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03FA74 0F:FA64: 51        .byte $51   ; <Q>
- D 3 - I - 0x03FA75 0F:FA65: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03FA76 0F:FA66: B6        .byte $B6   ; 
- D 3 - I - 0x03FA77 0F:FA67: FC        .byte $FC   ; 
- - - - - - 0x03FA78 0F:FA68: 6B        .byte $6B   ; <k>
- - - - - - 0x03FA79 0F:FA69: 7D        .byte $7D   ; 
- - - - - - 0x03FA7A 0F:FA6A: 68        .byte $68   ; <h>
- - - - - - 0x03FA7B 0F:FA6B: 6E        .byte $6E   ; <n>
- - - - - - 0x03FA7C 0F:FA6C: B6        .byte $B6   ; 
- - - - - - 0x03FA7D 0F:FA6D: 4E        .byte $4E   ; <N>
- - - - - - 0x03FA7E 0F:FA6E: 7D        .byte $7D   ; 
- - - - - - 0x03FA7F 0F:FA6F: C5        .byte $C5   ; 
- - - - - - 0x03FA80 0F:FA70: FC        .byte $FC   ; 
- - - - - - 0x03FA81 0F:FA71: B1        .byte $B1   ; 
- - - - - - 0x03FA82 0F:FA72: 2E        .byte $2E   ; 
- - - - - - 0x03FA83 0F:FA73: 0C        .byte $0C   ; 
- - - - - - 0x03FA84 0F:FA74: 2E        .byte $2E   ; 
- - - - - - 0x03FA85 0F:FA75: 4E        .byte $4E   ; <N>
- - - - - - 0x03FA86 0F:FA76: 7D        .byte $7D   ; 
- - - - - - 0x03FA87 0F:FA77: C5        .byte $C5   ; 
- - - - - - 0x03FA88 0F:FA78: FC        .byte $FC   ; 
- - - - - - 0x03FA89 0F:FA79: AA        .byte $AA   ; 
- - - - - - 0x03FA8A 0F:FA7A: 02        .byte $02   ; 
- - - - - - 0x03FA8B 0F:FA7B: 06        .byte $06   ; 
- - - - - - 0x03FA8C 0F:FA7C: 02        .byte $02   ; 
- - - - - - 0x03FA8D 0F:FA7D: 13        .byte $13   ; 
- - - - - - 0x03FA8E 0F:FA7E: 2E        .byte $2E   ; 
- - - - - - 0x03FA8F 0F:FA7F: 4E        .byte $4E   ; <N>
- - - - - - 0x03FA90 0F:FA80: 7D        .byte $7D   ; 
- - - - - - 0x03FA91 0F:FA81: C5        .byte $C5   ; 
- - - - - - 0x03FA92 0F:FA82: FC        .byte $FC   ; 
- D 3 - I - 0x03FA93 0F:FA83: CD        .byte $CD   ; 
- D 3 - I - 0x03FA94 0F:FA84: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03FA95 0F:FA85: 51        .byte $51   ; <Q>
- D 3 - I - 0x03FA96 0F:FA86: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03FA97 0F:FA87: B6        .byte $B6   ; 
- D 3 - I - 0x03FA98 0F:FA88: FC        .byte $FC   ; 
- D 3 - I - 0x03FA99 0F:FA89: 0B        .byte $0B   ; 
- D 3 - I - 0x03FA9A 0F:FA8A: 2E        .byte $2E   ; 
- D 3 - I - 0x03FA9B 0F:FA8B: 06        .byte $06   ; 
- D 3 - I - 0x03FA9C 0F:FA8C: 08        .byte $08   ; 
- D 3 - I - 0x03FA9D 0F:FA8D: 14        .byte $14   ; 
- D 3 - I - 0x03FA9E 0F:FA8E: B0        .byte $B0   ; 
- D 3 - I - 0x03FA9F 0F:FA8F: FC        .byte $FC   ; 
- D 3 - I - 0x03FAA0 0F:FA90: 0D        .byte $0D   ; 
- D 3 - I - 0x03FAA1 0F:FA91: 29        .byte $29   ; 
- D 3 - I - 0x03FAA2 0F:FA92: AE        .byte $AE   ; 
- D 3 - I - 0x03FAA3 0F:FA93: 02        .byte $02   ; 
- D 3 - I - 0x03FAA4 0F:FA94: 00        .byte $00   ; 
- D 3 - I - 0x03FAA5 0F:FA95: FC        .byte $FC   ; 
- D 3 - I - 0x03FAA6 0F:FA96: 0D        .byte $0D   ; 
- D 3 - I - 0x03FAA7 0F:FA97: AF        .byte $AF   ; 
- D 3 - I - 0x03FAA8 0F:FA98: 24        .byte $24   ; 
- D 3 - I - 0x03FAA9 0F:FA99: 08        .byte $08   ; 
- D 3 - I - 0x03FAAA 0F:FA9A: 00        .byte $00   ; 
- D 3 - I - 0x03FAAB 0F:FA9B: FC        .byte $FC   ; 
- D 3 - I - 0x03FAAC 0F:FA9C: 07        .byte $07   ; 
- D 3 - I - 0x03FAAD 0F:FA9D: 32        .byte $32   ; <2>
- D 3 - I - 0x03FAAE 0F:FA9E: 03        .byte $03   ; 
- D 3 - I - 0x03FAAF 0F:FA9F: 2A        .byte $2A   ; 
- D 3 - I - 0x03FAB0 0F:FAA0: 12        .byte $12   ; 
- D 3 - I - 0x03FAB1 0F:FAA1: 15        .byte $15   ; 
- D 3 - I - 0x03FAB2 0F:FAA2: 00        .byte $00   ; 
- D 3 - I - 0x03FAB3 0F:FAA3: FC        .byte $FC   ; 
- D 3 - I - 0x03FAB4 0F:FAA4: 03        .byte $03   ; 
- D 3 - I - 0x03FAB5 0F:FAA5: 1F        .byte $1F   ; 
- D 3 - I - 0x03FAB6 0F:FAA6: 02        .byte $02   ; 
- D 3 - I - 0x03FAB7 0F:FAA7: 00        .byte $00   ; 
- D 3 - I - 0x03FAB8 0F:FAA8: FC        .byte $FC   ; 
- D 3 - I - 0x03FAB9 0F:FAA9: 07        .byte $07   ; 
- D 3 - I - 0x03FABA 0F:FAAA: 32        .byte $32   ; <2>
- D 3 - I - 0x03FABB 0F:FAAB: 03        .byte $03   ; 
- D 3 - I - 0x03FABC 0F:FAAC: 2A        .byte $2A   ; 
- D 3 - I - 0x03FABD 0F:FAAD: 12        .byte $12   ; 
- D 3 - I - 0x03FABE 0F:FAAE: 15        .byte $15   ; 
- D 3 - I - 0x03FABF 0F:FAAF: FC        .byte $FC   ; 
- D 3 - I - 0x03FAC0 0F:FAB0: 4E        .byte $4E   ; <N>
- D 3 - I - 0x03FAC1 0F:FAB1: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03FAC2 0F:FAB2: 50        .byte $50   ; <P>
- D 3 - I - 0x03FAC3 0F:FAB3: 68        .byte $68   ; <h>
- D 3 - I - 0x03FAC4 0F:FAB4: 6E        .byte $6E   ; <n>
- D 3 - I - 0x03FAC5 0F:FAB5: B6        .byte $B6   ; 
- D 3 - I - 0x03FAC6 0F:FAB6: FC        .byte $FC   ; 
- D 3 - I - 0x03FAC7 0F:FAB7: D0        .byte $D0   ; 
- D 3 - I - 0x03FAC8 0F:FAB8: 55        .byte $55   ; <U>
- D 3 - I - 0x03FAC9 0F:FAB9: 69        .byte $69   ; <i>
- D 3 - I - 0x03FACA 0F:FABA: 53        .byte $53   ; <S>
- D 3 - I - 0x03FACB 0F:FABB: 74        .byte $74   ; <t>
- D 3 - I - 0x03FACC 0F:FABC: 47        .byte $47   ; <G>
- D 3 - I - 0x03FACD 0F:FABD: 6F        .byte $6F   ; <o>
- D 3 - I - 0x03FACE 0F:FABE: 48        .byte $48   ; <H>
- D 3 - I - 0x03FACF 0F:FABF: FC        .byte $FC   ; 
- D 3 - I - 0x03FAD0 0F:FAC0: C7        .byte $C7   ; 
- D 3 - I - 0x03FAD1 0F:FAC1: 7D        .byte $7D   ; 
- D 3 - I - 0x03FAD2 0F:FAC2: 69        .byte $69   ; <i>
- D 3 - I - 0x03FAD3 0F:FAC3: FC        .byte $FC   ; 
- D 3 - I - 0x03FAD4 0F:FAC4: B8        .byte $B8   ; 
- D 3 - I - 0x03FAD5 0F:FAC5: 7D        .byte $7D   ; 
- D 3 - I - 0x03FAD6 0F:FAC6: 69        .byte $69   ; <i>
- D 3 - I - 0x03FAD7 0F:FAC7: FC        .byte $FC   ; 
- D 3 - I - 0x03FAD8 0F:FAC8: 50        .byte $50   ; <P>
- D 3 - I - 0x03FAD9 0F:FAC9: 42        .byte $42   ; <B>
- D 3 - I - 0x03FADA 0F:FACA: 79        .byte $79   ; <y>
- D 3 - I - 0x03FADB 0F:FACB: FC        .byte $FC   ; 
- D 3 - - - 0x03FADC 0F:FACC: 06        .byte $06   ; 
- D 3 - - - 0x03FADD 0F:FACD: 00        .byte $00   ; 
- D 3 - - - 0x03FADE 0F:FACE: 0D        .byte $0D   ; 
- D 3 - - - 0x03FADF 0F:FACF: 00        .byte $00   ; 
- D 3 - - - 0x03FAE0 0F:FAD0: 13        .byte $13   ; 
- D 3 - - - 0x03FAE1 0F:FAD1: 00        .byte $00   ; 
- D 3 - - - 0x03FAE2 0F:FAD2: 19        .byte $19   ; 
- D 3 - - - 0x03FAE3 0F:FAD3: 00        .byte $00   ; 
- D 3 - - - 0x03FAE4 0F:FAD4: 20        .byte $20   ; 
- D 3 - - - 0x03FAE5 0F:FAD5: 00        .byte $00   ; 
- D 3 - - - 0x03FAE6 0F:FAD6: 26        .byte $26   ; 
- D 3 - - - 0x03FAE7 0F:FAD7: 00        .byte $00   ; 
- D 3 - - - 0x03FAE8 0F:FAD8: 2C        .byte $2C   ; 
- D 3 - - - 0x03FAE9 0F:FAD9: 00        .byte $00   ; 
- D 3 - - - 0x03FAEA 0F:FADA: 33        .byte $33   ; <3>
- D 3 - - - 0x03FAEB 0F:FADB: 00        .byte $00   ; 
- D 3 - - - 0x03FAEC 0F:FADC: 39        .byte $39   ; <9>
- D 3 - - - 0x03FAED 0F:FADD: 00        .byte $00   ; 
- D 3 - - - 0x03FAEE 0F:FADE: 40        .byte $40   ; 
- D 3 - - - 0x03FAEF 0F:FADF: 00        .byte $00   ; 
- D 3 - - - 0x03FAF0 0F:FAE0: 47        .byte $47   ; <G>
- D 3 - - - 0x03FAF1 0F:FAE1: 00        .byte $00   ; 
- D 3 - - - 0x03FAF2 0F:FAE2: 4E        .byte $4E   ; <N>
- D 3 - - - 0x03FAF3 0F:FAE3: 00        .byte $00   ; 
- D 3 - - - 0x03FAF4 0F:FAE4: 55        .byte $55   ; <U>
- D 3 - - - 0x03FAF5 0F:FAE5: 00        .byte $00   ; 
- D 3 - - - 0x03FAF6 0F:FAE6: 5C        .byte $5C   ; 
- D 3 - - - 0x03FAF7 0F:FAE7: 00        .byte $00   ; 
- D 3 - - - 0x03FAF8 0F:FAE8: 63        .byte $63   ; <c>
- D 3 - - - 0x03FAF9 0F:FAE9: 00        .byte $00   ; 
- D 3 - - - 0x03FAFA 0F:FAEA: 6A        .byte $6A   ; <j>
- D 3 - - - 0x03FAFB 0F:FAEB: 00        .byte $00   ; 
- D 3 - - - 0x03FAFC 0F:FAEC: 71        .byte $71   ; <q>
- D 3 - - - 0x03FAFD 0F:FAED: 00        .byte $00   ; 
- D 3 - - - 0x03FAFE 0F:FAEE: 79        .byte $79   ; <y>
- D 3 - - - 0x03FAFF 0F:FAEF: 00        .byte $00   ; 
- D 3 - - - 0x03FB00 0F:FAF0: 81        .byte $81   ; 
- D 3 - - - 0x03FB01 0F:FAF1: 00        .byte $00   ; 
- D 3 - - - 0x03FB02 0F:FAF2: 89        .byte $89   ; 
- D 3 - - - 0x03FB03 0F:FAF3: 00        .byte $00   ; 
- D 3 - - - 0x03FB04 0F:FAF4: 91        .byte $91   ; 
- D 3 - - - 0x03FB05 0F:FAF5: 00        .byte $00   ; 
- D 3 - - - 0x03FB06 0F:FAF6: 99        .byte $99   ; 
- D 3 - - - 0x03FB07 0F:FAF7: 00        .byte $00   ; 
- D 3 - - - 0x03FB08 0F:FAF8: A2        .byte $A2   ; 
- D 3 - - - 0x03FB09 0F:FAF9: 00        .byte $00   ; 
- D 3 - - - 0x03FB0A 0F:FAFA: AB        .byte $AB   ; 
- D 3 - - - 0x03FB0B 0F:FAFB: 00        .byte $00   ; 
- D 3 - - - 0x03FB0C 0F:FAFC: B4        .byte $B4   ; 
- D 3 - - - 0x03FB0D 0F:FAFD: 00        .byte $00   ; 
- D 3 - - - 0x03FB0E 0F:FAFE: BE        .byte $BE   ; 
- D 3 - - - 0x03FB0F 0F:FAFF: 00        .byte $00   ; 
- D 3 - - - 0x03FB10 0F:FB00: C8        .byte $C8   ; 
- D 3 - - - 0x03FB11 0F:FB01: 00        .byte $00   ; 
- D 3 - - - 0x03FB12 0F:FB02: D2        .byte $D2   ; 
- D 3 - - - 0x03FB13 0F:FB03: 00        .byte $00   ; 
- D 3 - - - 0x03FB14 0F:FB04: DD        .byte $DD   ; 
- D 3 - - - 0x03FB15 0F:FB05: 00        .byte $00   ; 
- D 3 - - - 0x03FB16 0F:FB06: E8        .byte $E8   ; 
- D 3 - - - 0x03FB17 0F:FB07: 00        .byte $00   ; 
- D 3 - - - 0x03FB18 0F:FB08: F4        .byte $F4   ; 
- D 3 - - - 0x03FB19 0F:FB09: 00        .byte $00   ; 
- D 3 - - - 0x03FB1A 0F:FB0A: 00        .byte $00   ; 
- D 3 - - - 0x03FB1B 0F:FB0B: 01        .byte $01   ; 
- D 3 - - - 0x03FB1C 0F:FB0C: 0D        .byte $0D   ; 
- D 3 - - - 0x03FB1D 0F:FB0D: 01        .byte $01   ; 
- D 3 - - - 0x03FB1E 0F:FB0E: 1A        .byte $1A   ; 
- D 3 - - - 0x03FB1F 0F:FB0F: 01        .byte $01   ; 
- D 3 - - - 0x03FB20 0F:FB10: 29        .byte $29   ; 
- D 3 - - - 0x03FB21 0F:FB11: 01        .byte $01   ; 
- D 3 - - - 0x03FB22 0F:FB12: 38        .byte $38   ; <8>
- D 3 - - - 0x03FB23 0F:FB13: 01        .byte $01   ; 
- D 3 - - - 0x03FB24 0F:FB14: 48        .byte $48   ; <H>
- D 3 - - - 0x03FB25 0F:FB15: 01        .byte $01   ; 
- D 3 - - - 0x03FB26 0F:FB16: 59        .byte $59   ; <Y>
- D 3 - - - 0x03FB27 0F:FB17: 01        .byte $01   ; 
- D 3 - - - 0x03FB28 0F:FB18: 6B        .byte $6B   ; <k>
- D 3 - - - 0x03FB29 0F:FB19: 01        .byte $01   ; 
- D 3 - - - 0x03FB2A 0F:FB1A: 7F        .byte $7F   ; 
- D 3 - - - 0x03FB2B 0F:FB1B: 01        .byte $01   ; 
- D 3 - - - 0x03FB2C 0F:FB1C: 94        .byte $94   ; 
- D 3 - - - 0x03FB2D 0F:FB1D: 01        .byte $01   ; 
- D 3 - - - 0x03FB2E 0F:FB1E: AB        .byte $AB   ; 
- D 3 - - - 0x03FB2F 0F:FB1F: 01        .byte $01   ; 
- D 3 - - - 0x03FB30 0F:FB20: C4        .byte $C4   ; 
- D 3 - - - 0x03FB31 0F:FB21: 01        .byte $01   ; 
- D 3 - - - 0x03FB32 0F:FB22: DF        .byte $DF   ; 
- D 3 - - - 0x03FB33 0F:FB23: 01        .byte $01   ; 
- D 3 - - - 0x03FB34 0F:FB24: FD        .byte $FD   ; 
- D 3 - - - 0x03FB35 0F:FB25: 01        .byte $01   ; 
- D 3 - - - 0x03FB36 0F:FB26: 1D        .byte $1D   ; 
- D 3 - - - 0x03FB37 0F:FB27: 02        .byte $02   ; 
- D 3 - - - 0x03FB38 0F:FB28: 42        .byte $42   ; <B>
- D 3 - - - 0x03FB39 0F:FB29: 02        .byte $02   ; 
- D 3 - - - 0x03FB3A 0F:FB2A: 6A        .byte $6A   ; <j>
- D 3 - - - 0x03FB3B 0F:FB2B: 02        .byte $02   ; 
- D 3 - - - 0x03FB3C 0F:FB2C: 98        .byte $98   ; 
- D 3 - - - 0x03FB3D 0F:FB2D: 02        .byte $02   ; 
- D 3 - - - 0x03FB3E 0F:FB2E: DB        .byte $DB   ; 
- D 3 - - - 0x03FB3F 0F:FB2F: 02        .byte $02   ; 
- D 3 - - - 0x03FB40 0F:FB30: 07        .byte $07   ; 
- D 3 - - - 0x03FB41 0F:FB31: 03        .byte $03   ; 
- D 3 - - - 0x03FB42 0F:FB32: 4C        .byte $4C   ; <L>
- D 3 - - - 0x03FB43 0F:FB33: 03        .byte $03   ; 
- D 3 - - - 0x03FB44 0F:FB34: 9D        .byte $9D   ; 
- D 3 - - - 0x03FB45 0F:FB35: 03        .byte $03   ; 
- D 3 - - - 0x03FB46 0F:FB36: FE        .byte $FE   ; 
- D 3 - - - 0x03FB47 0F:FB37: 03        .byte $03   ; 
- D 3 - - - 0x03FB48 0F:FB38: 74        .byte $74   ; <t>
- D 3 - - - 0x03FB49 0F:FB39: 04        .byte $04   ; 
- D 3 - - - 0x03FB4A 0F:FB3A: 07        .byte $07   ; 
- D 3 - - - 0x03FB4B 0F:FB3B: 05        .byte $05   ; 
- D 3 - - - 0x03FB4C 0F:FB3C: C3        .byte $C3   ; 
- D 3 - - - 0x03FB4D 0F:FB3D: 05        .byte $05   ; 
- D 3 - - - 0x03FB4E 0F:FB3E: BE        .byte $BE   ; 
- D 3 - - - 0x03FB4F 0F:FB3F: 06        .byte $06   ; 
- D 3 - - - 0x03FB50 0F:FB40: 1B        .byte $1B   ; 
- D 3 - - - 0x03FB51 0F:FB41: 08        .byte $08   ; 
- D 3 - - - 0x03FB52 0F:FB42: 27        .byte $27   ; 
- D 3 - - - 0x03FB53 0F:FB43: 0A        .byte $0A   ; 
- D 3 - - - 0x03FB54 0F:FB44: 8F        .byte $8F   ; 
- D 3 - - - 0x03FB55 0F:FB45: 0D        .byte $0D   ; 
- D 3 - - - 0x03FB56 0F:FB46: 5B        .byte $5B   ; 
- D 3 - - - 0x03FB57 0F:FB47: 20        .byte $20   ; 
- D 3 - - - 0x03FB58 0F:FB48: BC        .byte $BC   ; 
- D 3 - - - 0x03FB59 0F:FB49: 40        .byte $40   ; 
- D 3 - - - 0x03FB5A 0F:FB4A: FF        .byte $FF   ; 
- D 3 - - - 0x03FB5B 0F:FB4B: FF        .byte $FF   ; 
- D 3 - - - 0x03FB5C 0F:FB4C: 00        .byte $00   ; 
- D 3 - - - 0x03FB5D 0F:FB4D: 00        .byte $00   ; 
- D 3 - - - 0x03FB5E 0F:FB4E: 00        .byte $00   ; 
- D 3 - - - 0x03FB5F 0F:FB4F: 00        .byte $00   ; 
- D 3 - - - 0x03FB60 0F:FB50: 06        .byte $06   ; 
- D 3 - - - 0x03FB61 0F:FB51: 00        .byte $00   ; 
- D 3 - - - 0x03FB62 0F:FB52: 0C        .byte $0C   ; 
- D 3 - - - 0x03FB63 0F:FB53: 00        .byte $00   ; 
- D 3 - - - 0x03FB64 0F:FB54: 12        .byte $12   ; 
- D 3 - - - 0x03FB65 0F:FB55: 00        .byte $00   ; 
- D 3 - - - 0x03FB66 0F:FB56: 19        .byte $19   ; 
- D 3 - - - 0x03FB67 0F:FB57: 00        .byte $00   ; 
- D 3 - - - 0x03FB68 0F:FB58: 1F        .byte $1F   ; 
- D 3 - - - 0x03FB69 0F:FB59: 00        .byte $00   ; 
- D 3 - - - 0x03FB6A 0F:FB5A: 25        .byte $25   ; 
- D 3 - - - 0x03FB6B 0F:FB5B: 00        .byte $00   ; 
- D 3 - - - 0x03FB6C 0F:FB5C: 2B        .byte $2B   ; 
- D 3 - - - 0x03FB6D 0F:FB5D: 00        .byte $00   ; 
- D 3 - - - 0x03FB6E 0F:FB5E: 31        .byte $31   ; <1>
- D 3 - - - 0x03FB6F 0F:FB5F: 00        .byte $00   ; 
- D 3 - - - 0x03FB70 0F:FB60: 38        .byte $38   ; <8>
- D 3 - - - 0x03FB71 0F:FB61: 00        .byte $00   ; 
- D 3 - - - 0x03FB72 0F:FB62: 3E        .byte $3E   ; 
- D 3 - - - 0x03FB73 0F:FB63: 00        .byte $00   ; 
- D 3 - - - 0x03FB74 0F:FB64: 44        .byte $44   ; <D>
- D 3 - - - 0x03FB75 0F:FB65: 00        .byte $00   ; 
- D 3 - - - 0x03FB76 0F:FB66: 4A        .byte $4A   ; <J>
- D 3 - - - 0x03FB77 0F:FB67: 00        .byte $00   ; 
- D 3 - - - 0x03FB78 0F:FB68: 50        .byte $50   ; <P>
- D 3 - - - 0x03FB79 0F:FB69: 00        .byte $00   ; 
- D 3 - - - 0x03FB7A 0F:FB6A: 56        .byte $56   ; <V>
- D 3 - - - 0x03FB7B 0F:FB6B: 00        .byte $00   ; 
- D 3 - - - 0x03FB7C 0F:FB6C: 5C        .byte $5C   ; 
- D 3 - - - 0x03FB7D 0F:FB6D: 00        .byte $00   ; 
- D 3 - - - 0x03FB7E 0F:FB6E: 61        .byte $61   ; <a>
- D 3 - - - 0x03FB7F 0F:FB6F: 00        .byte $00   ; 
- D 3 - - - 0x03FB80 0F:FB70: 67        .byte $67   ; <g>
- D 3 - - - 0x03FB81 0F:FB71: 00        .byte $00   ; 
- D 3 - - - 0x03FB82 0F:FB72: 6D        .byte $6D   ; <m>
- D 3 - - - 0x03FB83 0F:FB73: 00        .byte $00   ; 
- D 3 - - - 0x03FB84 0F:FB74: 73        .byte $73   ; <s>
- D 3 - - - 0x03FB85 0F:FB75: 00        .byte $00   ; 
- D 3 - - - 0x03FB86 0F:FB76: 78        .byte $78   ; <x>
- D 3 - - - 0x03FB87 0F:FB77: 00        .byte $00   ; 
- D 3 - - - 0x03FB88 0F:FB78: 7E        .byte $7E   ; 
- D 3 - - - 0x03FB89 0F:FB79: 00        .byte $00   ; 
- D 3 - - - 0x03FB8A 0F:FB7A: 83        .byte $83   ; 
- D 3 - - - 0x03FB8B 0F:FB7B: 00        .byte $00   ; 
- D 3 - - - 0x03FB8C 0F:FB7C: 88        .byte $88   ; 
- D 3 - - - 0x03FB8D 0F:FB7D: 00        .byte $00   ; 
- D 3 - - - 0x03FB8E 0F:FB7E: 8E        .byte $8E   ; 
- D 3 - - - 0x03FB8F 0F:FB7F: 00        .byte $00   ; 
- D 3 - - - 0x03FB90 0F:FB80: 93        .byte $93   ; 
- D 3 - - - 0x03FB91 0F:FB81: 00        .byte $00   ; 
- D 3 - - - 0x03FB92 0F:FB82: 98        .byte $98   ; 
- D 3 - - - 0x03FB93 0F:FB83: 00        .byte $00   ; 
- D 3 - - - 0x03FB94 0F:FB84: 9D        .byte $9D   ; 
- D 3 - - - 0x03FB95 0F:FB85: 00        .byte $00   ; 
- D 3 - - - 0x03FB96 0F:FB86: A2        .byte $A2   ; 
- D 3 - - - 0x03FB97 0F:FB87: 00        .byte $00   ; 
- D 3 - - - 0x03FB98 0F:FB88: A7        .byte $A7   ; 
- D 3 - - - 0x03FB99 0F:FB89: 00        .byte $00   ; 
- D 3 - - - 0x03FB9A 0F:FB8A: AB        .byte $AB   ; 
- D 3 - - - 0x03FB9B 0F:FB8B: 00        .byte $00   ; 
- D 3 - - - 0x03FB9C 0F:FB8C: B0        .byte $B0   ; 
- D 3 - - - 0x03FB9D 0F:FB8D: 00        .byte $00   ; 
- D 3 - - - 0x03FB9E 0F:FB8E: B5        .byte $B5   ; 
- D 3 - - - 0x03FB9F 0F:FB8F: 00        .byte $00   ; 
- D 3 - - - 0x03FBA0 0F:FB90: B9        .byte $B9   ; 
- D 3 - - - 0x03FBA1 0F:FB91: 00        .byte $00   ; 
- D 3 - - - 0x03FBA2 0F:FB92: BD        .byte $BD   ; 
- D 3 - - - 0x03FBA3 0F:FB93: 00        .byte $00   ; 
- D 3 - - - 0x03FBA4 0F:FB94: C1        .byte $C1   ; 
- D 3 - - - 0x03FBA5 0F:FB95: 00        .byte $00   ; 
- D 3 - - - 0x03FBA6 0F:FB96: C5        .byte $C5   ; 
- D 3 - - - 0x03FBA7 0F:FB97: 00        .byte $00   ; 
- D 3 - - - 0x03FBA8 0F:FB98: C9        .byte $C9   ; 
- D 3 - - - 0x03FBA9 0F:FB99: 00        .byte $00   ; 
- D 3 - - - 0x03FBAA 0F:FB9A: CD        .byte $CD   ; 
- D 3 - - - 0x03FBAB 0F:FB9B: 00        .byte $00   ; 
- D 3 - - - 0x03FBAC 0F:FB9C: D1        .byte $D1   ; 
- D 3 - - - 0x03FBAD 0F:FB9D: 00        .byte $00   ; 
- D 3 - - - 0x03FBAE 0F:FB9E: D4        .byte $D4   ; 
- D 3 - - - 0x03FBAF 0F:FB9F: 00        .byte $00   ; 
- D 3 - - - 0x03FBB0 0F:FBA0: D8        .byte $D8   ; 
- D 3 - - - 0x03FBB1 0F:FBA1: 00        .byte $00   ; 
- D 3 - - - 0x03FBB2 0F:FBA2: DB        .byte $DB   ; 
- D 3 - - - 0x03FBB3 0F:FBA3: 00        .byte $00   ; 
- D 3 - - - 0x03FBB4 0F:FBA4: DE        .byte $DE   ; 
- D 3 - - - 0x03FBB5 0F:FBA5: 00        .byte $00   ; 
- D 3 - - - 0x03FBB6 0F:FBA6: E1        .byte $E1   ; 
- D 3 - - - 0x03FBB7 0F:FBA7: 00        .byte $00   ; 
- D 3 - - - 0x03FBB8 0F:FBA8: E4        .byte $E4   ; 
- D 3 - - - 0x03FBB9 0F:FBA9: 00        .byte $00   ; 
- D 3 - - - 0x03FBBA 0F:FBAA: E7        .byte $E7   ; 
- D 3 - - - 0x03FBBB 0F:FBAB: 00        .byte $00   ; 
- D 3 - - - 0x03FBBC 0F:FBAC: EA        .byte $EA   ; 
- D 3 - - - 0x03FBBD 0F:FBAD: 00        .byte $00   ; 
- D 3 - - - 0x03FBBE 0F:FBAE: EC        .byte $EC   ; 
- D 3 - - - 0x03FBBF 0F:FBAF: 00        .byte $00   ; 
- D 3 - - - 0x03FBC0 0F:FBB0: EE        .byte $EE   ; 
- D 3 - - - 0x03FBC1 0F:FBB1: 00        .byte $00   ; 
- D 3 - - - 0x03FBC2 0F:FBB2: F1        .byte $F1   ; 
- D 3 - - - 0x03FBC3 0F:FBB3: 00        .byte $00   ; 
- D 3 - - - 0x03FBC4 0F:FBB4: F3        .byte $F3   ; 
- D 3 - - - 0x03FBC5 0F:FBB5: 00        .byte $00   ; 
- D 3 - - - 0x03FBC6 0F:FBB6: F4        .byte $F4   ; 
- D 3 - - - 0x03FBC7 0F:FBB7: 00        .byte $00   ; 
- D 3 - - - 0x03FBC8 0F:FBB8: F6        .byte $F6   ; 
- D 3 - - - 0x03FBC9 0F:FBB9: 00        .byte $00   ; 
- D 3 - - - 0x03FBCA 0F:FBBA: F8        .byte $F8   ; 
- D 3 - - - 0x03FBCB 0F:FBBB: 00        .byte $00   ; 
- D 3 - - - 0x03FBCC 0F:FBBC: F9        .byte $F9   ; 
- D 3 - - - 0x03FBCD 0F:FBBD: 00        .byte $00   ; 
- D 3 - - - 0x03FBCE 0F:FBBE: FB        .byte $FB   ; 
- D 3 - - - 0x03FBCF 0F:FBBF: 00        .byte $00   ; 
- D 3 - - - 0x03FBD0 0F:FBC0: FC        .byte $FC   ; 
- D 3 - - - 0x03FBD1 0F:FBC1: 00        .byte $00   ; 
- D 3 - - - 0x03FBD2 0F:FBC2: FD        .byte $FD   ; 
- D 3 - - - 0x03FBD3 0F:FBC3: 00        .byte $00   ; 
- D 3 - - - 0x03FBD4 0F:FBC4: FE        .byte $FE   ; 
- D 3 - - - 0x03FBD5 0F:FBC5: 00        .byte $00   ; 
- D 3 - - - 0x03FBD6 0F:FBC6: FE        .byte $FE   ; 
- D 3 - - - 0x03FBD7 0F:FBC7: 00        .byte $00   ; 
- D 3 - - - 0x03FBD8 0F:FBC8: FF        .byte $FF   ; 
- D 3 - - - 0x03FBD9 0F:FBC9: 00        .byte $00   ; 
- D 3 - - - 0x03FBDA 0F:FBCA: 00        .byte $00   ; 
- D 3 - - - 0x03FBDB 0F:FBCB: 01        .byte $01   ; 
- D 3 - I - 0x03FBDC 0F:FBCC: 00        .byte $00   ; 
- D 3 - I - 0x03FBDD 0F:FBCD: 00        .byte $00   ; 
- D 3 - I - 0x03FBDE 0F:FBCE: 30        .byte $30   ; <0>
- D 3 - I - 0x03FBDF 0F:FBCF: 36        .byte $36   ; <6>
- D 3 - I - 0x03FBE0 0F:FBD0: 25        .byte $25   ; 
- D 3 - I - 0x03FBE1 0F:FBD1: 30        .byte $30   ; <0>
- D 3 - I - 0x03FBE2 0F:FBD2: 1A        .byte $1A   ; 
- D 3 - I - 0x03FBE3 0F:FBD3: 00        .byte $00   ; 
- D 3 - I - 0x03FBE4 0F:FBD4: 18        .byte $18   ; 
- D 3 - I - 0x03FBE5 0F:FBD5: 1A        .byte $1A   ; 
- D 3 - I - 0x03FBE6 0F:FBD6: 18        .byte $18   ; 
- D 3 - I - 0x03FBE7 0F:FBD7: 30        .byte $30   ; <0>
- D 3 - I - 0x03FBE8 0F:FBD8: 21        .byte $21   ; 
- D 3 - I - 0x03FBE9 0F:FBD9: 10        .byte $10   ; 
- D 3 - I - 0x03FBEA 0F:FBDA: 30        .byte $30   ; <0>
- D 3 - I - 0x03FBEB 0F:FBDB: 36        .byte $36   ; <6>
- D 3 - I - 0x03FBEC 0F:FBDC: 25        .byte $25   ; 
- D 3 - I - 0x03FBED 0F:FBDD: 30        .byte $30   ; <0>
- D 3 - I - 0x03FBEE 0F:FBDE: 19        .byte $19   ; 
- D 3 - I - 0x03FBEF 0F:FBDF: 00        .byte $00   ; 
- D 3 - I - 0x03FBF0 0F:FBE0: 2A        .byte $2A   ; 
- D 3 - I - 0x03FBF1 0F:FBE1: 21        .byte $21   ; 
- D 3 - I - 0x03FBF2 0F:FBE2: 3A        .byte $3A   ; 
- D 3 - I - 0x03FBF3 0F:FBE3: 1A        .byte $1A   ; 
- D 3 - I - 0x03FBF4 0F:FBE4: 1A        .byte $1A   ; 
- D 3 - I - 0x03FBF5 0F:FBE5: 10        .byte $10   ; 
- D 3 - I - 0x03FBF6 0F:FBE6: 30        .byte $30   ; <0>
- D 3 - I - 0x03FBF7 0F:FBE7: 36        .byte $36   ; <6>
- D 3 - I - 0x03FBF8 0F:FBE8: 25        .byte $25   ; 
- D 3 - I - 0x03FBF9 0F:FBE9: 30        .byte $30   ; <0>
- D 3 - I - 0x03FBFA 0F:FBEA: 21        .byte $21   ; 
- D 3 - I - 0x03FBFB 0F:FBEB: 31        .byte $31   ; <1>
- D 3 - I - 0x03FBFC 0F:FBEC: 30        .byte $30   ; <0>
- D 3 - I - 0x03FBFD 0F:FBED: 21        .byte $21   ; 
- D 3 - I - 0x03FBFE 0F:FBEE: 10        .byte $10   ; 
- D 3 - I - 0x03FBFF 0F:FBEF: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC00 0F:FBF0: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC01 0F:FBF1: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC02 0F:FBF2: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC03 0F:FBF3: 21        .byte $21   ; 
- D 3 - I - 0x03FC04 0F:FBF4: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC05 0F:FBF5: 31        .byte $31   ; <1>
- D 3 - I - 0x03FC06 0F:FBF6: 21        .byte $21   ; 
- D 3 - I - 0x03FC07 0F:FBF7: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC08 0F:FBF8: 37        .byte $37   ; <7>
- D 3 - I - 0x03FC09 0F:FBF9: 21        .byte $21   ; 
- D 3 - I - 0x03FC0A 0F:FBFA: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC0B 0F:FBFB: 37        .byte $37   ; <7>
- D 3 - I - 0x03FC0C 0F:FBFC: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC0D 0F:FBFD: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC0E 0F:FBFE: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC0F 0F:FBFF: 21        .byte $21   ; 
- D 3 - I - 0x03FC10 0F:FC00: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC11 0F:FC01: 27        .byte $27   ; 
- D 3 - I - 0x03FC12 0F:FC02: 21        .byte $21   ; 
- D 3 - I - 0x03FC13 0F:FC03: 11        .byte $11   ; 
- D 3 - I - 0x03FC14 0F:FC04: 16        .byte $16   ; 
- D 3 - I - 0x03FC15 0F:FC05: 21        .byte $21   ; 
- D 3 - I - 0x03FC16 0F:FC06: 11        .byte $11   ; 
- D 3 - I - 0x03FC17 0F:FC07: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC18 0F:FC08: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC19 0F:FC09: 25        .byte $25   ; 
- D 3 - I - 0x03FC1A 0F:FC0A: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC1B 0F:FC0B: 21        .byte $21   ; 
- D 3 - I - 0x03FC1C 0F:FC0C: 27        .byte $27   ; 
- D 3 - I - 0x03FC1D 0F:FC0D: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC1E 0F:FC0E: 21        .byte $21   ; 
- D 3 - I - 0x03FC1F 0F:FC0F: 27        .byte $27   ; 
- D 3 - I - 0x03FC20 0F:FC10: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC21 0F:FC11: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC22 0F:FC12: 27        .byte $27   ; 
- D 3 - I - 0x03FC23 0F:FC13: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC24 0F:FC14: 1A        .byte $1A   ; 
- D 3 - I - 0x03FC25 0F:FC15: 18        .byte $18   ; 
- D 3 - I - 0x03FC26 0F:FC16: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC27 0F:FC17: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC28 0F:FC18: 25        .byte $25   ; 
- D 3 - I - 0x03FC29 0F:FC19: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC2A 0F:FC1A: 21        .byte $21   ; 
- D 3 - I - 0x03FC2B 0F:FC1B: 31        .byte $31   ; <1>
- D 3 - I - 0x03FC2C 0F:FC1C: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC2D 0F:FC1D: 3A        .byte $3A   ; 
- D 3 - I - 0x03FC2E 0F:FC1E: 1A        .byte $1A   ; 
- D 3 - I - 0x03FC2F 0F:FC1F: 1A        .byte $1A   ; 
- D 3 - I - 0x03FC30 0F:FC20: 1A        .byte $1A   ; 
- D 3 - I - 0x03FC31 0F:FC21: 10        .byte $10   ; 
- D 3 - I - 0x03FC32 0F:FC22: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC33 0F:FC23: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC34 0F:FC24: 25        .byte $25   ; 
- D 3 - I - 0x03FC35 0F:FC25: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC36 0F:FC26: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC37 0F:FC27: 21        .byte $21   ; 
- D 3 - I - 0x03FC38 0F:FC28: 07        .byte $07   ; 
- D 3 - I - 0x03FC39 0F:FC29: 21        .byte $21   ; 
- D 3 - I - 0x03FC3A 0F:FC2A: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC3B 0F:FC2B: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC3C 0F:FC2C: 2A        .byte $2A   ; 
- D 3 - I - 0x03FC3D 0F:FC2D: 10        .byte $10   ; 
- D 3 - I - 0x03FC3E 0F:FC2E: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC3F 0F:FC2F: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC40 0F:FC30: 25        .byte $25   ; 
- D 3 - I - 0x03FC41 0F:FC31: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC42 0F:FC32: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC43 0F:FC33: 21        .byte $21   ; 
- D 3 - I - 0x03FC44 0F:FC34: 07        .byte $07   ; 
- D 3 - I - 0x03FC45 0F:FC35: 21        .byte $21   ; 
- D 3 - I - 0x03FC46 0F:FC36: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC47 0F:FC37: 15        .byte $15   ; 
- D 3 - I - 0x03FC48 0F:FC38: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC49 0F:FC39: 10        .byte $10   ; 
- D 3 - I - 0x03FC4A 0F:FC3A: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC4B 0F:FC3B: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC4C 0F:FC3C: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC4D 0F:FC3D: 00        .byte $00   ; 
- D 3 - I - 0x03FC4E 0F:FC3E: 31        .byte $31   ; <1>
- D 3 - I - 0x03FC4F 0F:FC3F: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC50 0F:FC40: 10        .byte $10   ; 
- D 3 - I - 0x03FC51 0F:FC41: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC52 0F:FC42: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC53 0F:FC43: 00        .byte $00   ; 
- D 3 - I - 0x03FC54 0F:FC44: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC55 0F:FC45: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC56 0F:FC46: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC57 0F:FC47: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC58 0F:FC48: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC59 0F:FC49: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC5A 0F:FC4A: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC5B 0F:FC4B: 17        .byte $17   ; 
- D 3 - I - 0x03FC5C 0F:FC4C: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC5D 0F:FC4D: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC5E 0F:FC4E: 31        .byte $31   ; <1>
- D 3 - I - 0x03FC5F 0F:FC4F: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC60 0F:FC50: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC61 0F:FC51: 31        .byte $31   ; <1>
- D 3 - I - 0x03FC62 0F:FC52: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC63 0F:FC53: 07        .byte $07   ; 
- D 3 - I - 0x03FC64 0F:FC54: 18        .byte $18   ; 
- D 3 - I - 0x03FC65 0F:FC55: 28        .byte $28   ; 
- D 3 - I - 0x03FC66 0F:FC56: 00        .byte $00   ; 
- D 3 - I - 0x03FC67 0F:FC57: 00        .byte $00   ; 
- D 3 - I - 0x03FC68 0F:FC58: 00        .byte $00   ; 
- D 3 - I - 0x03FC69 0F:FC59: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC6A 0F:FC5A: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC6B 0F:FC5B: 11        .byte $11   ; 
- D 3 - I - 0x03FC6C 0F:FC5C: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC6D 0F:FC5D: 27        .byte $27   ; 
- D 3 - I - 0x03FC6E 0F:FC5E: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC6F 0F:FC5F: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC70 0F:FC60: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC71 0F:FC61: 31        .byte $31   ; <1>
- D 3 - I - 0x03FC72 0F:FC62: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC73 0F:FC63: 00        .byte $00   ; 
- D 3 - I - 0x03FC74 0F:FC64: 00        .byte $00   ; 
- D 3 - I - 0x03FC75 0F:FC65: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC76 0F:FC66: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC77 0F:FC67: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC78 0F:FC68: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC79 0F:FC69: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC7A 0F:FC6A: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC7B 0F:FC6B: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC7C 0F:FC6C: 16        .byte $16   ; 
- D 3 - I - 0x03FC7D 0F:FC6D: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC7E 0F:FC6E: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC7F 0F:FC6F: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC80 0F:FC70: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC81 0F:FC71: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC82 0F:FC72: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC83 0F:FC73: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC84 0F:FC74: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC85 0F:FC75: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC86 0F:FC76: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC87 0F:FC77: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC88 0F:FC78: 19        .byte $19   ; 
- D 3 - I - 0x03FC89 0F:FC79: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC8A 0F:FC7A: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC8B 0F:FC7B: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC8C 0F:FC7C: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC8D 0F:FC7D: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC8E 0F:FC7E: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC8F 0F:FC7F: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC90 0F:FC80: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC91 0F:FC81: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC92 0F:FC82: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC93 0F:FC83: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC94 0F:FC84: 16        .byte $16   ; 
- D 3 - I - 0x03FC95 0F:FC85: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC96 0F:FC86: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC97 0F:FC87: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC98 0F:FC88: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC99 0F:FC89: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC9A 0F:FC8A: 30        .byte $30   ; <0>
- D 3 - I - 0x03FC9B 0F:FC8B: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC9C 0F:FC8C: 0F        .byte $0F   ; 
- D 3 - I - 0x03FC9D 0F:FC8D: 07        .byte $07   ; 
- D 3 - I - 0x03FC9E 0F:FC8E: 36        .byte $36   ; <6>
- D 3 - I - 0x03FC9F 0F:FC8F: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCA0 0F:FC90: 16        .byte $16   ; 
- D 3 - I - 0x03FCA1 0F:FC91: 36        .byte $36   ; <6>
- D 3 - I - 0x03FCA2 0F:FC92: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCA3 0F:FC93: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCA4 0F:FC94: 36        .byte $36   ; <6>
- D 3 - I - 0x03FCA5 0F:FC95: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCA6 0F:FC96: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCA7 0F:FC97: 36        .byte $36   ; <6>
- D 3 - I - 0x03FCA8 0F:FC98: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCA9 0F:FC99: 00        .byte $00   ; 
- D 3 - I - 0x03FCAA 0F:FC9A: 36        .byte $36   ; <6>
- D 3 - I - 0x03FCAB 0F:FC9B: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCAC 0F:FC9C: 16        .byte $16   ; 
- D 3 - I - 0x03FCAD 0F:FC9D: 36        .byte $36   ; <6>
- D 3 - I - 0x03FCAE 0F:FC9E: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCAF 0F:FC9F: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCB0 0F:FCA0: 36        .byte $36   ; <6>
- D 3 - I - 0x03FCB1 0F:FCA1: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCB2 0F:FCA2: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCB3 0F:FCA3: 36        .byte $36   ; <6>
- D 3 - I - 0x03FCB4 0F:FCA4: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCB5 0F:FCA5: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCB6 0F:FCA6: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCB7 0F:FCA7: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCB8 0F:FCA8: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCB9 0F:FCA9: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCBA 0F:FCAA: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCBB 0F:FCAB: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCBC 0F:FCAC: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCBD 0F:FCAD: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCBE 0F:FCAE: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCBF 0F:FCAF: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCC0 0F:FCB0: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCC1 0F:FCB1: 26        .byte $26   ; 
- D 3 - I - 0x03FCC2 0F:FCB2: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCC3 0F:FCB3: 26        .byte $26   ; 
- D 3 - I - 0x03FCC4 0F:FCB4: 25        .byte $25   ; 
- D 3 - I - 0x03FCC5 0F:FCB5: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCC6 0F:FCB6: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCC7 0F:FCB7: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCC8 0F:FCB8: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCC9 0F:FCB9: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCCA 0F:FCBA: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCCB 0F:FCBB: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCCC 0F:FCBC: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCCD 0F:FCBD: 27        .byte $27   ; 
- D 3 - I - 0x03FCCE 0F:FCBE: 36        .byte $36   ; <6>
- D 3 - I - 0x03FCCF 0F:FCBF: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCD0 0F:FCC0: 31        .byte $31   ; <1>
- D 3 - I - 0x03FCD1 0F:FCC1: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCD2 0F:FCC2: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCD3 0F:FCC3: 31        .byte $31   ; <1>
- D 3 - I - 0x03FCD4 0F:FCC4: 27        .byte $27   ; 
- D 3 - I - 0x03FCD5 0F:FCC5: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCD6 0F:FCC6: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCD7 0F:FCC7: 36        .byte $36   ; <6>
- D 3 - I - 0x03FCD8 0F:FCC8: 05        .byte $05   ; 
- D 3 - I - 0x03FCD9 0F:FCC9: 16        .byte $16   ; 
- D 3 - I - 0x03FCDA 0F:FCCA: 15        .byte $15   ; 
- D 3 - I - 0x03FCDB 0F:FCCB: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCDC 0F:FCCC: 27        .byte $27   ; 
- D 3 - I - 0x03FCDD 0F:FCCD: 37        .byte $37   ; <7>
- D 3 - I - 0x03FCDE 0F:FCCE: 10        .byte $10   ; 
- D 3 - I - 0x03FCDF 0F:FCCF: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCE0 0F:FCD0: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCE1 0F:FCD1: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCE2 0F:FCD2: 00        .byte $00   ; 
- D 3 - I - 0x03FCE3 0F:FCD3: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCE4 0F:FCD4: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCE5 0F:FCD5: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCE6 0F:FCD6: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCE7 0F:FCD7: 36        .byte $36   ; <6>
- D 3 - I - 0x03FCE8 0F:FCD8: 25        .byte $25   ; 
- D 3 - I - 0x03FCE9 0F:FCD9: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCEA 0F:FCDA: 11        .byte $11   ; 
- D 3 - I - 0x03FCEB 0F:FCDB: 00        .byte $00   ; 
- D 3 - I - 0x03FCEC 0F:FCDC: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCED 0F:FCDD: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCEE 0F:FCDE: 15        .byte $15   ; 
- D 3 - I - 0x03FCEF 0F:FCDF: 25        .byte $25   ; 
- D 3 - I - 0x03FCF0 0F:FCE0: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCF1 0F:FCE1: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCF2 0F:FCE2: 35        .byte $35   ; <5>
- D 3 - I - 0x03FCF3 0F:FCE3: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCF4 0F:FCE4: 31        .byte $31   ; <1>
- D 3 - I - 0x03FCF5 0F:FCE5: 35        .byte $35   ; <5>
- D 3 - I - 0x03FCF6 0F:FCE6: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCF7 0F:FCE7: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCF8 0F:FCE8: 35        .byte $35   ; <5>
- D 3 - I - 0x03FCF9 0F:FCE9: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCFA 0F:FCEA: 30        .byte $30   ; <0>
- D 3 - I - 0x03FCFB 0F:FCEB: 35        .byte $35   ; <5>
- D 3 - I - 0x03FCFC 0F:FCEC: 0F        .byte $0F   ; 
- D 3 - I - 0x03FCFD 0F:FCED: 16        .byte $16   ; 
- D 3 - I - 0x03FCFE 0F:FCEE: 35        .byte $35   ; <5>
- D 3 - I - 0x03FCFF 0F:FCEF: 0F        .byte $0F   ; 
- D 3 - I - 0x03FD00 0F:FCF0: 31        .byte $31   ; <1>
- D 3 - I - 0x03FD01 0F:FCF1: 35        .byte $35   ; <5>
- D 3 - I - 0x03FD02 0F:FCF2: 0F        .byte $0F   ; 
- D 3 - I - 0x03FD03 0F:FCF3: 0F        .byte $0F   ; 
- D 3 - I - 0x03FD04 0F:FCF4: 35        .byte $35   ; <5>
- D 3 - I - 0x03FD05 0F:FCF5: 0F        .byte $0F   ; 
- D 3 - I - 0x03FD06 0F:FCF6: 30        .byte $30   ; <0>
- D 3 - I - 0x03FD07 0F:FCF7: 35        .byte $35   ; <5>
- D 3 - I - 0x03FD08 0F:FCF8: 21        .byte $21   ; 
- D 3 - I - 0x03FD09 0F:FCF9: 0F        .byte $0F   ; 
- D 3 - I - 0x03FD0A 0F:FCFA: 30        .byte $30   ; <0>
- D 3 - I - 0x03FD0B 0F:FCFB: 21        .byte $21   ; 
- D 3 - I - 0x03FD0C 0F:FCFC: 36        .byte $36   ; <6>
- D 3 - I - 0x03FD0D 0F:FCFD: 27        .byte $27   ; 
- D 3 - I - 0x03FD0E 0F:FCFE: 21        .byte $21   ; 
- D 3 - I - 0x03FD0F 0F:FCFF: 16        .byte $16   ; 
- D 3 - I - 0x03FD10 0F:FD00: 16        .byte $16   ; 
- D 3 - I - 0x03FD11 0F:FD01: 21        .byte $21   ; 
- D 3 - I - 0x03FD12 0F:FD02: 16        .byte $16   ; 
- D 3 - I - 0x03FD13 0F:FD03: 30        .byte $30   ; <0>
- D 3 - I - 0x03FD14 0F:FD04: 0F        .byte $0F   ; 
- D 3 - I - 0x03FD15 0F:FD05: 36        .byte $36   ; <6>
- D 3 - I - 0x03FD16 0F:FD06: 27        .byte $27   ; 
- D 3 - I - 0x03FD17 0F:FD07: 0F        .byte $0F   ; 
- D 3 - I - 0x03FD18 0F:FD08: 0F        .byte $0F   ; 
- D 3 - I - 0x03FD19 0F:FD09: 27        .byte $27   ; 
- D 3 - I - 0x03FD1A 0F:FD0A: 0F        .byte $0F   ; 
- D 3 - I - 0x03FD1B 0F:FD0B: 30        .byte $30   ; <0>
- D 3 - I - 0x03FD1C 0F:FD0C: 0F        .byte $0F   ; 
- D 3 - I - 0x03FD1D 0F:FD0D: 0F        .byte $0F   ; 
- D 3 - I - 0x03FD1E 0F:FD0E: 36        .byte $36   ; <6>
- D 3 - I - 0x03FD1F 0F:FD0F: 30        .byte $30   ; <0>
- - - - - - 0x03FD20 0F:FD10: FF        .byte $FF   ; 
- - - - - - 0x03FD21 0F:FD11: FF        .byte $FF   ; 
- - - - - - 0x03FD22 0F:FD12: FF        .byte $FF   ; 
- - - - - - 0x03FD23 0F:FD13: FF        .byte $FF   ; 
- - - - - - 0x03FD24 0F:FD14: FF        .byte $FF   ; 
- - - - - - 0x03FD25 0F:FD15: FF        .byte $FF   ; 
- - - - - - 0x03FD26 0F:FD16: FF        .byte $FF   ; 
- - - - - - 0x03FD27 0F:FD17: FF        .byte $FF   ; 
- - - - - - 0x03FD28 0F:FD18: FF        .byte $FF   ; 
- - - - - - 0x03FD29 0F:FD19: FF        .byte $FF   ; 
- - - - - - 0x03FD2A 0F:FD1A: FF        .byte $FF   ; 
- - - - - - 0x03FD2B 0F:FD1B: FF        .byte $FF   ; 
- - - - - - 0x03FD2C 0F:FD1C: FF        .byte $FF   ; 
- - - - - - 0x03FD2D 0F:FD1D: FF        .byte $FF   ; 
- - - - - - 0x03FD2E 0F:FD1E: FF        .byte $FF   ; 
- - - - - - 0x03FD2F 0F:FD1F: FF        .byte $FF   ; 
- - - - - - 0x03FD30 0F:FD20: FF        .byte $FF   ; 
- - - - - - 0x03FD31 0F:FD21: FF        .byte $FF   ; 
- - - - - - 0x03FD32 0F:FD22: FF        .byte $FF   ; 
- - - - - - 0x03FD33 0F:FD23: FF        .byte $FF   ; 
- - - - - - 0x03FD34 0F:FD24: FF        .byte $FF   ; 
- - - - - - 0x03FD35 0F:FD25: FF        .byte $FF   ; 
- - - - - - 0x03FD36 0F:FD26: FF        .byte $FF   ; 
- - - - - - 0x03FD37 0F:FD27: FF        .byte $FF   ; 
- - - - - - 0x03FD38 0F:FD28: FF        .byte $FF   ; 
- - - - - - 0x03FD39 0F:FD29: FF        .byte $FF   ; 
- - - - - - 0x03FD3A 0F:FD2A: FF        .byte $FF   ; 
- - - - - - 0x03FD3B 0F:FD2B: FF        .byte $FF   ; 
- - - - - - 0x03FD3C 0F:FD2C: FF        .byte $FF   ; 
- - - - - - 0x03FD3D 0F:FD2D: FF        .byte $FF   ; 
- - - - - - 0x03FD3E 0F:FD2E: FF        .byte $FF   ; 
- - - - - - 0x03FD3F 0F:FD2F: FF        .byte $FF   ; 
- - - - - - 0x03FD40 0F:FD30: FF        .byte $FF   ; 
- - - - - - 0x03FD41 0F:FD31: FF        .byte $FF   ; 
- - - - - - 0x03FD42 0F:FD32: FF        .byte $FF   ; 
- - - - - - 0x03FD43 0F:FD33: FF        .byte $FF   ; 
- - - - - - 0x03FD44 0F:FD34: FF        .byte $FF   ; 
- - - - - - 0x03FD45 0F:FD35: FF        .byte $FF   ; 
- - - - - - 0x03FD46 0F:FD36: FF        .byte $FF   ; 
- - - - - - 0x03FD47 0F:FD37: FF        .byte $FF   ; 
- - - - - - 0x03FD48 0F:FD38: FF        .byte $FF   ; 
- - - - - - 0x03FD49 0F:FD39: FF        .byte $FF   ; 
- - - - - - 0x03FD4A 0F:FD3A: FF        .byte $FF   ; 
- - - - - - 0x03FD4B 0F:FD3B: FF        .byte $FF   ; 
- - - - - - 0x03FD4C 0F:FD3C: FF        .byte $FF   ; 
- - - - - - 0x03FD4D 0F:FD3D: FF        .byte $FF   ; 
- - - - - - 0x03FD4E 0F:FD3E: FF        .byte $FF   ; 
- - - - - - 0x03FD4F 0F:FD3F: FF        .byte $FF   ; 
- - - - - - 0x03FD50 0F:FD40: FF        .byte $FF   ; 
- - - - - - 0x03FD51 0F:FD41: FF        .byte $FF   ; 
- - - - - - 0x03FD52 0F:FD42: FF        .byte $FF   ; 
- - - - - - 0x03FD53 0F:FD43: FF        .byte $FF   ; 
- - - - - - 0x03FD54 0F:FD44: FF        .byte $FF   ; 
- - - - - - 0x03FD55 0F:FD45: FF        .byte $FF   ; 
- - - - - - 0x03FD56 0F:FD46: FF        .byte $FF   ; 
- - - - - - 0x03FD57 0F:FD47: FF        .byte $FF   ; 
- - - - - - 0x03FD58 0F:FD48: FF        .byte $FF   ; 
- - - - - - 0x03FD59 0F:FD49: FF        .byte $FF   ; 
- - - - - - 0x03FD5A 0F:FD4A: FF        .byte $FF   ; 
- - - - - - 0x03FD5B 0F:FD4B: FF        .byte $FF   ; 
- - - - - - 0x03FD5C 0F:FD4C: FF        .byte $FF   ; 
- - - - - - 0x03FD5D 0F:FD4D: FF        .byte $FF   ; 
- - - - - - 0x03FD5E 0F:FD4E: FF        .byte $FF   ; 
- - - - - - 0x03FD5F 0F:FD4F: FF        .byte $FF   ; 
- - - - - - 0x03FD60 0F:FD50: FF        .byte $FF   ; 
- - - - - - 0x03FD61 0F:FD51: FF        .byte $FF   ; 
- - - - - - 0x03FD62 0F:FD52: FF        .byte $FF   ; 
- - - - - - 0x03FD63 0F:FD53: FF        .byte $FF   ; 
- - - - - - 0x03FD64 0F:FD54: FF        .byte $FF   ; 
- - - - - - 0x03FD65 0F:FD55: FF        .byte $FF   ; 
- - - - - - 0x03FD66 0F:FD56: FF        .byte $FF   ; 
- - - - - - 0x03FD67 0F:FD57: FF        .byte $FF   ; 
- - - - - - 0x03FD68 0F:FD58: FF        .byte $FF   ; 
- - - - - - 0x03FD69 0F:FD59: FF        .byte $FF   ; 
- - - - - - 0x03FD6A 0F:FD5A: FF        .byte $FF   ; 
- - - - - - 0x03FD6B 0F:FD5B: FF        .byte $FF   ; 
- - - - - - 0x03FD6C 0F:FD5C: FF        .byte $FF   ; 
- - - - - - 0x03FD6D 0F:FD5D: FF        .byte $FF   ; 
- - - - - - 0x03FD6E 0F:FD5E: FF        .byte $FF   ; 
- - - - - - 0x03FD6F 0F:FD5F: FF        .byte $FF   ; 
- - - - - - 0x03FD70 0F:FD60: FF        .byte $FF   ; 
- - - - - - 0x03FD71 0F:FD61: FF        .byte $FF   ; 
- - - - - - 0x03FD72 0F:FD62: FF        .byte $FF   ; 
- - - - - - 0x03FD73 0F:FD63: FF        .byte $FF   ; 
- - - - - - 0x03FD74 0F:FD64: FF        .byte $FF   ; 
- - - - - - 0x03FD75 0F:FD65: FF        .byte $FF   ; 
- - - - - - 0x03FD76 0F:FD66: FF        .byte $FF   ; 
- - - - - - 0x03FD77 0F:FD67: FF        .byte $FF   ; 
- - - - - - 0x03FD78 0F:FD68: FF        .byte $FF   ; 
- - - - - - 0x03FD79 0F:FD69: FF        .byte $FF   ; 
- - - - - - 0x03FD7A 0F:FD6A: FF        .byte $FF   ; 
- - - - - - 0x03FD7B 0F:FD6B: FF        .byte $FF   ; 
- - - - - - 0x03FD7C 0F:FD6C: FF        .byte $FF   ; 
- - - - - - 0x03FD7D 0F:FD6D: FF        .byte $FF   ; 
- - - - - - 0x03FD7E 0F:FD6E: FF        .byte $FF   ; 
- - - - - - 0x03FD7F 0F:FD6F: FF        .byte $FF   ; 
- - - - - - 0x03FD80 0F:FD70: FF        .byte $FF   ; 
- - - - - - 0x03FD81 0F:FD71: FF        .byte $FF   ; 
- - - - - - 0x03FD82 0F:FD72: FF        .byte $FF   ; 
- - - - - - 0x03FD83 0F:FD73: FF        .byte $FF   ; 
- - - - - - 0x03FD84 0F:FD74: FF        .byte $FF   ; 
- - - - - - 0x03FD85 0F:FD75: FF        .byte $FF   ; 
- - - - - - 0x03FD86 0F:FD76: FF        .byte $FF   ; 
- - - - - - 0x03FD87 0F:FD77: FF        .byte $FF   ; 
- - - - - - 0x03FD88 0F:FD78: FF        .byte $FF   ; 
- - - - - - 0x03FD89 0F:FD79: FF        .byte $FF   ; 
- - - - - - 0x03FD8A 0F:FD7A: FF        .byte $FF   ; 
- - - - - - 0x03FD8B 0F:FD7B: FF        .byte $FF   ; 
- - - - - - 0x03FD8C 0F:FD7C: FF        .byte $FF   ; 
- - - - - - 0x03FD8D 0F:FD7D: FF        .byte $FF   ; 
- - - - - - 0x03FD8E 0F:FD7E: FF        .byte $FF   ; 
- - - - - - 0x03FD8F 0F:FD7F: FF        .byte $FF   ; 
- - - - - - 0x03FD90 0F:FD80: FF        .byte $FF   ; 
- - - - - - 0x03FD91 0F:FD81: FF        .byte $FF   ; 
- - - - - - 0x03FD92 0F:FD82: FF        .byte $FF   ; 
- - - - - - 0x03FD93 0F:FD83: FF        .byte $FF   ; 
- - - - - - 0x03FD94 0F:FD84: FF        .byte $FF   ; 
- - - - - - 0x03FD95 0F:FD85: FF        .byte $FF   ; 
- - - - - - 0x03FD96 0F:FD86: FF        .byte $FF   ; 
- - - - - - 0x03FD97 0F:FD87: FF        .byte $FF   ; 
- - - - - - 0x03FD98 0F:FD88: FF        .byte $FF   ; 
- - - - - - 0x03FD99 0F:FD89: FF        .byte $FF   ; 
- - - - - - 0x03FD9A 0F:FD8A: FF        .byte $FF   ; 
- - - - - - 0x03FD9B 0F:FD8B: FF        .byte $FF   ; 
- - - - - - 0x03FD9C 0F:FD8C: FF        .byte $FF   ; 
- - - - - - 0x03FD9D 0F:FD8D: FF        .byte $FF   ; 
- - - - - - 0x03FD9E 0F:FD8E: FF        .byte $FF   ; 
- - - - - - 0x03FD9F 0F:FD8F: FF        .byte $FF   ; 
- - - - - - 0x03FDA0 0F:FD90: FF        .byte $FF   ; 
- - - - - - 0x03FDA1 0F:FD91: FF        .byte $FF   ; 
- - - - - - 0x03FDA2 0F:FD92: FF        .byte $FF   ; 
- - - - - - 0x03FDA3 0F:FD93: FF        .byte $FF   ; 
- - - - - - 0x03FDA4 0F:FD94: FF        .byte $FF   ; 
- - - - - - 0x03FDA5 0F:FD95: FF        .byte $FF   ; 
- - - - - - 0x03FDA6 0F:FD96: FF        .byte $FF   ; 
- - - - - - 0x03FDA7 0F:FD97: FF        .byte $FF   ; 
- - - - - - 0x03FDA8 0F:FD98: FF        .byte $FF   ; 
- - - - - - 0x03FDA9 0F:FD99: FF        .byte $FF   ; 
- - - - - - 0x03FDAA 0F:FD9A: FF        .byte $FF   ; 
- - - - - - 0x03FDAB 0F:FD9B: FF        .byte $FF   ; 
- - - - - - 0x03FDAC 0F:FD9C: FF        .byte $FF   ; 
- - - - - - 0x03FDAD 0F:FD9D: FF        .byte $FF   ; 
- - - - - - 0x03FDAE 0F:FD9E: FF        .byte $FF   ; 
- - - - - - 0x03FDAF 0F:FD9F: FF        .byte $FF   ; 
- - - - - - 0x03FDB0 0F:FDA0: FF        .byte $FF   ; 
- - - - - - 0x03FDB1 0F:FDA1: FF        .byte $FF   ; 
- - - - - - 0x03FDB2 0F:FDA2: FF        .byte $FF   ; 
- - - - - - 0x03FDB3 0F:FDA3: FF        .byte $FF   ; 
- - - - - - 0x03FDB4 0F:FDA4: FF        .byte $FF   ; 
- - - - - - 0x03FDB5 0F:FDA5: FF        .byte $FF   ; 
- - - - - - 0x03FDB6 0F:FDA6: FF        .byte $FF   ; 
- - - - - - 0x03FDB7 0F:FDA7: FF        .byte $FF   ; 
- - - - - - 0x03FDB8 0F:FDA8: FF        .byte $FF   ; 
- - - - - - 0x03FDB9 0F:FDA9: FF        .byte $FF   ; 
- - - - - - 0x03FDBA 0F:FDAA: FF        .byte $FF   ; 
- - - - - - 0x03FDBB 0F:FDAB: FF        .byte $FF   ; 
- - - - - - 0x03FDBC 0F:FDAC: FF        .byte $FF   ; 
- - - - - - 0x03FDBD 0F:FDAD: FF        .byte $FF   ; 
- - - - - - 0x03FDBE 0F:FDAE: FF        .byte $FF   ; 
- - - - - - 0x03FDBF 0F:FDAF: FF        .byte $FF   ; 
- - - - - - 0x03FDC0 0F:FDB0: FF        .byte $FF   ; 
- - - - - - 0x03FDC1 0F:FDB1: FF        .byte $FF   ; 
- - - - - - 0x03FDC2 0F:FDB2: FF        .byte $FF   ; 
- - - - - - 0x03FDC3 0F:FDB3: FF        .byte $FF   ; 
- - - - - - 0x03FDC4 0F:FDB4: FF        .byte $FF   ; 
- - - - - - 0x03FDC5 0F:FDB5: FF        .byte $FF   ; 
- - - - - - 0x03FDC6 0F:FDB6: FF        .byte $FF   ; 
- - - - - - 0x03FDC7 0F:FDB7: FF        .byte $FF   ; 
- - - - - - 0x03FDC8 0F:FDB8: FF        .byte $FF   ; 
- - - - - - 0x03FDC9 0F:FDB9: FF        .byte $FF   ; 
- - - - - - 0x03FDCA 0F:FDBA: FF        .byte $FF   ; 
- - - - - - 0x03FDCB 0F:FDBB: FF        .byte $FF   ; 
- - - - - - 0x03FDCC 0F:FDBC: FF        .byte $FF   ; 
- - - - - - 0x03FDCD 0F:FDBD: FF        .byte $FF   ; 
- - - - - - 0x03FDCE 0F:FDBE: FF        .byte $FF   ; 
- - - - - - 0x03FDCF 0F:FDBF: FF        .byte $FF   ; 
- - - - - - 0x03FDD0 0F:FDC0: FF        .byte $FF   ; 
- - - - - - 0x03FDD1 0F:FDC1: FF        .byte $FF   ; 
- - - - - - 0x03FDD2 0F:FDC2: FF        .byte $FF   ; 
- - - - - - 0x03FDD3 0F:FDC3: FF        .byte $FF   ; 
- - - - - - 0x03FDD4 0F:FDC4: FF        .byte $FF   ; 
- - - - - - 0x03FDD5 0F:FDC5: FF        .byte $FF   ; 
- - - - - - 0x03FDD6 0F:FDC6: FF        .byte $FF   ; 
- - - - - - 0x03FDD7 0F:FDC7: FF        .byte $FF   ; 
- - - - - - 0x03FDD8 0F:FDC8: FF        .byte $FF   ; 
- - - - - - 0x03FDD9 0F:FDC9: FF        .byte $FF   ; 
- - - - - - 0x03FDDA 0F:FDCA: FF        .byte $FF   ; 
- - - - - - 0x03FDDB 0F:FDCB: FF        .byte $FF   ; 
- - - - - - 0x03FDDC 0F:FDCC: FF        .byte $FF   ; 
- - - - - - 0x03FDDD 0F:FDCD: FF        .byte $FF   ; 
- - - - - - 0x03FDDE 0F:FDCE: FF        .byte $FF   ; 
- - - - - - 0x03FDDF 0F:FDCF: FF        .byte $FF   ; 
- - - - - - 0x03FDE0 0F:FDD0: FF        .byte $FF   ; 
- - - - - - 0x03FDE1 0F:FDD1: FF        .byte $FF   ; 
- - - - - - 0x03FDE2 0F:FDD2: FF        .byte $FF   ; 
- - - - - - 0x03FDE3 0F:FDD3: FF        .byte $FF   ; 
- - - - - - 0x03FDE4 0F:FDD4: FF        .byte $FF   ; 
- - - - - - 0x03FDE5 0F:FDD5: FF        .byte $FF   ; 
- - - - - - 0x03FDE6 0F:FDD6: FF        .byte $FF   ; 
- - - - - - 0x03FDE7 0F:FDD7: FF        .byte $FF   ; 
- - - - - - 0x03FDE8 0F:FDD8: FF        .byte $FF   ; 
- - - - - - 0x03FDE9 0F:FDD9: FF        .byte $FF   ; 
- - - - - - 0x03FDEA 0F:FDDA: FF        .byte $FF   ; 
- - - - - - 0x03FDEB 0F:FDDB: FF        .byte $FF   ; 
- - - - - - 0x03FDEC 0F:FDDC: FF        .byte $FF   ; 
- - - - - - 0x03FDED 0F:FDDD: FF        .byte $FF   ; 
- - - - - - 0x03FDEE 0F:FDDE: FF        .byte $FF   ; 
- - - - - - 0x03FDEF 0F:FDDF: FF        .byte $FF   ; 
- - - - - - 0x03FDF0 0F:FDE0: FF        .byte $FF   ; 
- - - - - - 0x03FDF1 0F:FDE1: FF        .byte $FF   ; 
- - - - - - 0x03FDF2 0F:FDE2: FF        .byte $FF   ; 
- - - - - - 0x03FDF3 0F:FDE3: FF        .byte $FF   ; 
- - - - - - 0x03FDF4 0F:FDE4: FF        .byte $FF   ; 
- - - - - - 0x03FDF5 0F:FDE5: FF        .byte $FF   ; 
- - - - - - 0x03FDF6 0F:FDE6: FF        .byte $FF   ; 
- - - - - - 0x03FDF7 0F:FDE7: FF        .byte $FF   ; 
- - - - - - 0x03FDF8 0F:FDE8: FF        .byte $FF   ; 
- - - - - - 0x03FDF9 0F:FDE9: FF        .byte $FF   ; 
- - - - - - 0x03FDFA 0F:FDEA: FF        .byte $FF   ; 
- - - - - - 0x03FDFB 0F:FDEB: FF        .byte $FF   ; 
- - - - - - 0x03FDFC 0F:FDEC: FF        .byte $FF   ; 
- - - - - - 0x03FDFD 0F:FDED: FF        .byte $FF   ; 
- - - - - - 0x03FDFE 0F:FDEE: FF        .byte $FF   ; 
- - - - - - 0x03FDFF 0F:FDEF: FF        .byte $FF   ; 
- - - - - - 0x03FE00 0F:FDF0: FF        .byte $FF   ; 
- - - - - - 0x03FE01 0F:FDF1: FF        .byte $FF   ; 
- - - - - - 0x03FE02 0F:FDF2: FF        .byte $FF   ; 
- - - - - - 0x03FE03 0F:FDF3: FF        .byte $FF   ; 
- - - - - - 0x03FE04 0F:FDF4: FF        .byte $FF   ; 
- - - - - - 0x03FE05 0F:FDF5: FF        .byte $FF   ; 
- - - - - - 0x03FE06 0F:FDF6: FF        .byte $FF   ; 
- - - - - - 0x03FE07 0F:FDF7: FF        .byte $FF   ; 
- - - - - - 0x03FE08 0F:FDF8: FF        .byte $FF   ; 
- - - - - - 0x03FE09 0F:FDF9: FF        .byte $FF   ; 
- - - - - - 0x03FE0A 0F:FDFA: FF        .byte $FF   ; 
- - - - - - 0x03FE0B 0F:FDFB: FF        .byte $FF   ; 
- - - - - - 0x03FE0C 0F:FDFC: FF        .byte $FF   ; 
- - - - - - 0x03FE0D 0F:FDFD: FF        .byte $FF   ; 
- - - - - - 0x03FE0E 0F:FDFE: FF        .byte $FF   ; 
- - - - - - 0x03FE0F 0F:FDFF: FF        .byte $FF   ; 
- - - - - - 0x03FE10 0F:FE00: FF        .byte $FF   ; 
- - - - - - 0x03FE11 0F:FE01: FF        .byte $FF   ; 
- - - - - - 0x03FE12 0F:FE02: FF        .byte $FF   ; 
- - - - - - 0x03FE13 0F:FE03: FF        .byte $FF   ; 
- - - - - - 0x03FE14 0F:FE04: FF        .byte $FF   ; 
- - - - - - 0x03FE15 0F:FE05: FF        .byte $FF   ; 
- - - - - - 0x03FE16 0F:FE06: FF        .byte $FF   ; 
- - - - - - 0x03FE17 0F:FE07: FF        .byte $FF   ; 
- - - - - - 0x03FE18 0F:FE08: FF        .byte $FF   ; 
- - - - - - 0x03FE19 0F:FE09: FF        .byte $FF   ; 
- - - - - - 0x03FE1A 0F:FE0A: FF        .byte $FF   ; 
- - - - - - 0x03FE1B 0F:FE0B: FF        .byte $FF   ; 
- - - - - - 0x03FE1C 0F:FE0C: FF        .byte $FF   ; 
- - - - - - 0x03FE1D 0F:FE0D: FF        .byte $FF   ; 
- - - - - - 0x03FE1E 0F:FE0E: FF        .byte $FF   ; 
- - - - - - 0x03FE1F 0F:FE0F: FF        .byte $FF   ; 
- - - - - - 0x03FE20 0F:FE10: FF        .byte $FF   ; 
- - - - - - 0x03FE21 0F:FE11: FF        .byte $FF   ; 
- - - - - - 0x03FE22 0F:FE12: FF        .byte $FF   ; 
- - - - - - 0x03FE23 0F:FE13: FF        .byte $FF   ; 
- - - - - - 0x03FE24 0F:FE14: FF        .byte $FF   ; 
- - - - - - 0x03FE25 0F:FE15: FF        .byte $FF   ; 
- - - - - - 0x03FE26 0F:FE16: FF        .byte $FF   ; 
- - - - - - 0x03FE27 0F:FE17: FF        .byte $FF   ; 
- - - - - - 0x03FE28 0F:FE18: FF        .byte $FF   ; 
- - - - - - 0x03FE29 0F:FE19: FF        .byte $FF   ; 
- - - - - - 0x03FE2A 0F:FE1A: FF        .byte $FF   ; 
- - - - - - 0x03FE2B 0F:FE1B: FF        .byte $FF   ; 
- - - - - - 0x03FE2C 0F:FE1C: FF        .byte $FF   ; 
- - - - - - 0x03FE2D 0F:FE1D: FF        .byte $FF   ; 
- - - - - - 0x03FE2E 0F:FE1E: FF        .byte $FF   ; 
- - - - - - 0x03FE2F 0F:FE1F: FF        .byte $FF   ; 
- - - - - - 0x03FE30 0F:FE20: FF        .byte $FF   ; 
- - - - - - 0x03FE31 0F:FE21: FF        .byte $FF   ; 
- - - - - - 0x03FE32 0F:FE22: FF        .byte $FF   ; 
- - - - - - 0x03FE33 0F:FE23: FF        .byte $FF   ; 
- - - - - - 0x03FE34 0F:FE24: FF        .byte $FF   ; 
- - - - - - 0x03FE35 0F:FE25: FF        .byte $FF   ; 
- - - - - - 0x03FE36 0F:FE26: FF        .byte $FF   ; 
- - - - - - 0x03FE37 0F:FE27: FF        .byte $FF   ; 
- - - - - - 0x03FE38 0F:FE28: FF        .byte $FF   ; 
- - - - - - 0x03FE39 0F:FE29: FF        .byte $FF   ; 
- - - - - - 0x03FE3A 0F:FE2A: FF        .byte $FF   ; 
- - - - - - 0x03FE3B 0F:FE2B: FF        .byte $FF   ; 
- - - - - - 0x03FE3C 0F:FE2C: FF        .byte $FF   ; 
- - - - - - 0x03FE3D 0F:FE2D: FF        .byte $FF   ; 
- - - - - - 0x03FE3E 0F:FE2E: FF        .byte $FF   ; 
- - - - - - 0x03FE3F 0F:FE2F: FF        .byte $FF   ; 
- - - - - - 0x03FE40 0F:FE30: FF        .byte $FF   ; 
- - - - - - 0x03FE41 0F:FE31: FF        .byte $FF   ; 
- - - - - - 0x03FE42 0F:FE32: FF        .byte $FF   ; 
- - - - - - 0x03FE43 0F:FE33: FF        .byte $FF   ; 
- - - - - - 0x03FE44 0F:FE34: FF        .byte $FF   ; 
- - - - - - 0x03FE45 0F:FE35: FF        .byte $FF   ; 
- - - - - - 0x03FE46 0F:FE36: FF        .byte $FF   ; 
- - - - - - 0x03FE47 0F:FE37: FF        .byte $FF   ; 
- - - - - - 0x03FE48 0F:FE38: FF        .byte $FF   ; 
- - - - - - 0x03FE49 0F:FE39: FF        .byte $FF   ; 
- - - - - - 0x03FE4A 0F:FE3A: FF        .byte $FF   ; 
- - - - - - 0x03FE4B 0F:FE3B: FF        .byte $FF   ; 
- - - - - - 0x03FE4C 0F:FE3C: FF        .byte $FF   ; 
- - - - - - 0x03FE4D 0F:FE3D: FF        .byte $FF   ; 
- - - - - - 0x03FE4E 0F:FE3E: FF        .byte $FF   ; 
- - - - - - 0x03FE4F 0F:FE3F: FF        .byte $FF   ; 
- - - - - - 0x03FE50 0F:FE40: FF        .byte $FF   ; 
- - - - - - 0x03FE51 0F:FE41: FF        .byte $FF   ; 
- - - - - - 0x03FE52 0F:FE42: FF        .byte $FF   ; 
- - - - - - 0x03FE53 0F:FE43: FF        .byte $FF   ; 
- - - - - - 0x03FE54 0F:FE44: FF        .byte $FF   ; 
- - - - - - 0x03FE55 0F:FE45: FF        .byte $FF   ; 
- - - - - - 0x03FE56 0F:FE46: FF        .byte $FF   ; 
- - - - - - 0x03FE57 0F:FE47: FF        .byte $FF   ; 
- - - - - - 0x03FE58 0F:FE48: FF        .byte $FF   ; 
- - - - - - 0x03FE59 0F:FE49: FF        .byte $FF   ; 
- - - - - - 0x03FE5A 0F:FE4A: FF        .byte $FF   ; 
- - - - - - 0x03FE5B 0F:FE4B: FF        .byte $FF   ; 
- - - - - - 0x03FE5C 0F:FE4C: FF        .byte $FF   ; 
- - - - - - 0x03FE5D 0F:FE4D: FF        .byte $FF   ; 
- - - - - - 0x03FE5E 0F:FE4E: FF        .byte $FF   ; 
- - - - - - 0x03FE5F 0F:FE4F: FF        .byte $FF   ; 
- - - - - - 0x03FE60 0F:FE50: FF        .byte $FF   ; 
- - - - - - 0x03FE61 0F:FE51: FF        .byte $FF   ; 
- - - - - - 0x03FE62 0F:FE52: FF        .byte $FF   ; 
- - - - - - 0x03FE63 0F:FE53: FF        .byte $FF   ; 
- - - - - - 0x03FE64 0F:FE54: FF        .byte $FF   ; 
- - - - - - 0x03FE65 0F:FE55: FF        .byte $FF   ; 
- - - - - - 0x03FE66 0F:FE56: FF        .byte $FF   ; 
- - - - - - 0x03FE67 0F:FE57: FF        .byte $FF   ; 
- - - - - - 0x03FE68 0F:FE58: FF        .byte $FF   ; 
- - - - - - 0x03FE69 0F:FE59: FF        .byte $FF   ; 
- - - - - - 0x03FE6A 0F:FE5A: FF        .byte $FF   ; 
- - - - - - 0x03FE6B 0F:FE5B: FF        .byte $FF   ; 
- - - - - - 0x03FE6C 0F:FE5C: FF        .byte $FF   ; 
- - - - - - 0x03FE6D 0F:FE5D: FF        .byte $FF   ; 
- - - - - - 0x03FE6E 0F:FE5E: FF        .byte $FF   ; 
- - - - - - 0x03FE6F 0F:FE5F: FF        .byte $FF   ; 
- - - - - - 0x03FE70 0F:FE60: FF        .byte $FF   ; 
- - - - - - 0x03FE71 0F:FE61: FF        .byte $FF   ; 
- - - - - - 0x03FE72 0F:FE62: FF        .byte $FF   ; 
- - - - - - 0x03FE73 0F:FE63: FF        .byte $FF   ; 
- - - - - - 0x03FE74 0F:FE64: FF        .byte $FF   ; 
- - - - - - 0x03FE75 0F:FE65: FF        .byte $FF   ; 
- - - - - - 0x03FE76 0F:FE66: FF        .byte $FF   ; 
- - - - - - 0x03FE77 0F:FE67: FF        .byte $FF   ; 
- - - - - - 0x03FE78 0F:FE68: FF        .byte $FF   ; 
- - - - - - 0x03FE79 0F:FE69: FF        .byte $FF   ; 
- - - - - - 0x03FE7A 0F:FE6A: FF        .byte $FF   ; 
- - - - - - 0x03FE7B 0F:FE6B: FF        .byte $FF   ; 
- - - - - - 0x03FE7C 0F:FE6C: FF        .byte $FF   ; 
- - - - - - 0x03FE7D 0F:FE6D: FF        .byte $FF   ; 
- - - - - - 0x03FE7E 0F:FE6E: FF        .byte $FF   ; 
- - - - - - 0x03FE7F 0F:FE6F: FF        .byte $FF   ; 
- - - - - - 0x03FE80 0F:FE70: FF        .byte $FF   ; 
- - - - - - 0x03FE81 0F:FE71: FF        .byte $FF   ; 
- - - - - - 0x03FE82 0F:FE72: FF        .byte $FF   ; 
- - - - - - 0x03FE83 0F:FE73: FF        .byte $FF   ; 
- - - - - - 0x03FE84 0F:FE74: FF        .byte $FF   ; 
- - - - - - 0x03FE85 0F:FE75: FF        .byte $FF   ; 
- - - - - - 0x03FE86 0F:FE76: FF        .byte $FF   ; 
- - - - - - 0x03FE87 0F:FE77: FF        .byte $FF   ; 
- - - - - - 0x03FE88 0F:FE78: FF        .byte $FF   ; 
- - - - - - 0x03FE89 0F:FE79: FF        .byte $FF   ; 
- - - - - - 0x03FE8A 0F:FE7A: FF        .byte $FF   ; 
- - - - - - 0x03FE8B 0F:FE7B: FF        .byte $FF   ; 
- - - - - - 0x03FE8C 0F:FE7C: FF        .byte $FF   ; 
- - - - - - 0x03FE8D 0F:FE7D: FF        .byte $FF   ; 
- - - - - - 0x03FE8E 0F:FE7E: FF        .byte $FF   ; 
- - - - - - 0x03FE8F 0F:FE7F: FF        .byte $FF   ; 
- - - - - - 0x03FE90 0F:FE80: FF        .byte $FF   ; 
- - - - - - 0x03FE91 0F:FE81: FF        .byte $FF   ; 
- - - - - - 0x03FE92 0F:FE82: FF        .byte $FF   ; 
- - - - - - 0x03FE93 0F:FE83: FF        .byte $FF   ; 
- - - - - - 0x03FE94 0F:FE84: FF        .byte $FF   ; 
- - - - - - 0x03FE95 0F:FE85: FF        .byte $FF   ; 
- - - - - - 0x03FE96 0F:FE86: FF        .byte $FF   ; 
- - - - - - 0x03FE97 0F:FE87: FF        .byte $FF   ; 
- - - - - - 0x03FE98 0F:FE88: FF        .byte $FF   ; 
- - - - - - 0x03FE99 0F:FE89: FF        .byte $FF   ; 
- - - - - - 0x03FE9A 0F:FE8A: FF        .byte $FF   ; 
- - - - - - 0x03FE9B 0F:FE8B: FF        .byte $FF   ; 
- - - - - - 0x03FE9C 0F:FE8C: FF        .byte $FF   ; 
- - - - - - 0x03FE9D 0F:FE8D: FF        .byte $FF   ; 
- - - - - - 0x03FE9E 0F:FE8E: FF        .byte $FF   ; 
- - - - - - 0x03FE9F 0F:FE8F: FF        .byte $FF   ; 
- - - - - - 0x03FEA0 0F:FE90: FF        .byte $FF   ; 
- - - - - - 0x03FEA1 0F:FE91: FF        .byte $FF   ; 
- - - - - - 0x03FEA2 0F:FE92: FF        .byte $FF   ; 
- - - - - - 0x03FEA3 0F:FE93: FF        .byte $FF   ; 
- - - - - - 0x03FEA4 0F:FE94: FF        .byte $FF   ; 
- - - - - - 0x03FEA5 0F:FE95: FF        .byte $FF   ; 
- - - - - - 0x03FEA6 0F:FE96: FF        .byte $FF   ; 
- - - - - - 0x03FEA7 0F:FE97: FF        .byte $FF   ; 
- - - - - - 0x03FEA8 0F:FE98: FF        .byte $FF   ; 
- - - - - - 0x03FEA9 0F:FE99: FF        .byte $FF   ; 
- - - - - - 0x03FEAA 0F:FE9A: FF        .byte $FF   ; 
- - - - - - 0x03FEAB 0F:FE9B: FF        .byte $FF   ; 
- - - - - - 0x03FEAC 0F:FE9C: FF        .byte $FF   ; 
- - - - - - 0x03FEAD 0F:FE9D: FF        .byte $FF   ; 
- - - - - - 0x03FEAE 0F:FE9E: FF        .byte $FF   ; 
- - - - - - 0x03FEAF 0F:FE9F: FF        .byte $FF   ; 
- - - - - - 0x03FEB0 0F:FEA0: FF        .byte $FF   ; 
- - - - - - 0x03FEB1 0F:FEA1: FF        .byte $FF   ; 
- - - - - - 0x03FEB2 0F:FEA2: FF        .byte $FF   ; 
- - - - - - 0x03FEB3 0F:FEA3: FF        .byte $FF   ; 
- - - - - - 0x03FEB4 0F:FEA4: FF        .byte $FF   ; 
- - - - - - 0x03FEB5 0F:FEA5: FF        .byte $FF   ; 
- - - - - - 0x03FEB6 0F:FEA6: FF        .byte $FF   ; 
- - - - - - 0x03FEB7 0F:FEA7: FF        .byte $FF   ; 
- - - - - - 0x03FEB8 0F:FEA8: FF        .byte $FF   ; 
- - - - - - 0x03FEB9 0F:FEA9: FF        .byte $FF   ; 
- - - - - - 0x03FEBA 0F:FEAA: FF        .byte $FF   ; 
- - - - - - 0x03FEBB 0F:FEAB: FF        .byte $FF   ; 
- - - - - - 0x03FEBC 0F:FEAC: FF        .byte $FF   ; 
- - - - - - 0x03FEBD 0F:FEAD: FF        .byte $FF   ; 
- - - - - - 0x03FEBE 0F:FEAE: FF        .byte $FF   ; 
- - - - - - 0x03FEBF 0F:FEAF: FF        .byte $FF   ; 
- - - - - - 0x03FEC0 0F:FEB0: FF        .byte $FF   ; 
- - - - - - 0x03FEC1 0F:FEB1: FF        .byte $FF   ; 
- - - - - - 0x03FEC2 0F:FEB2: FF        .byte $FF   ; 
- - - - - - 0x03FEC3 0F:FEB3: FF        .byte $FF   ; 
- - - - - - 0x03FEC4 0F:FEB4: FF        .byte $FF   ; 
- - - - - - 0x03FEC5 0F:FEB5: FF        .byte $FF   ; 
- - - - - - 0x03FEC6 0F:FEB6: FF        .byte $FF   ; 
- - - - - - 0x03FEC7 0F:FEB7: FF        .byte $FF   ; 
- - - - - - 0x03FEC8 0F:FEB8: FF        .byte $FF   ; 
- - - - - - 0x03FEC9 0F:FEB9: FF        .byte $FF   ; 
- - - - - - 0x03FECA 0F:FEBA: FF        .byte $FF   ; 
- - - - - - 0x03FECB 0F:FEBB: FF        .byte $FF   ; 
- - - - - - 0x03FECC 0F:FEBC: FF        .byte $FF   ; 
- - - - - - 0x03FECD 0F:FEBD: FF        .byte $FF   ; 
- - - - - - 0x03FECE 0F:FEBE: FF        .byte $FF   ; 
- - - - - - 0x03FECF 0F:FEBF: FF        .byte $FF   ; 
- - - - - - 0x03FED0 0F:FEC0: FF        .byte $FF   ; 
- - - - - - 0x03FED1 0F:FEC1: FF        .byte $FF   ; 
- - - - - - 0x03FED2 0F:FEC2: FF        .byte $FF   ; 
- - - - - - 0x03FED3 0F:FEC3: FF        .byte $FF   ; 
- - - - - - 0x03FED4 0F:FEC4: FF        .byte $FF   ; 
- - - - - - 0x03FED5 0F:FEC5: FF        .byte $FF   ; 
- - - - - - 0x03FED6 0F:FEC6: FF        .byte $FF   ; 
- - - - - - 0x03FED7 0F:FEC7: FF        .byte $FF   ; 
- - - - - - 0x03FED8 0F:FEC8: FF        .byte $FF   ; 
- - - - - - 0x03FED9 0F:FEC9: FF        .byte $FF   ; 
- - - - - - 0x03FEDA 0F:FECA: FF        .byte $FF   ; 
- - - - - - 0x03FEDB 0F:FECB: FF        .byte $FF   ; 
- - - - - - 0x03FEDC 0F:FECC: FF        .byte $FF   ; 
- - - - - - 0x03FEDD 0F:FECD: FF        .byte $FF   ; 
- - - - - - 0x03FEDE 0F:FECE: FF        .byte $FF   ; 
- - - - - - 0x03FEDF 0F:FECF: FF        .byte $FF   ; 
- - - - - - 0x03FEE0 0F:FED0: FF        .byte $FF   ; 
- - - - - - 0x03FEE1 0F:FED1: FF        .byte $FF   ; 
- - - - - - 0x03FEE2 0F:FED2: FF        .byte $FF   ; 
- - - - - - 0x03FEE3 0F:FED3: FF        .byte $FF   ; 
- - - - - - 0x03FEE4 0F:FED4: FF        .byte $FF   ; 
- - - - - - 0x03FEE5 0F:FED5: FF        .byte $FF   ; 
- - - - - - 0x03FEE6 0F:FED6: FF        .byte $FF   ; 
- - - - - - 0x03FEE7 0F:FED7: FF        .byte $FF   ; 
- - - - - - 0x03FEE8 0F:FED8: FF        .byte $FF   ; 
- - - - - - 0x03FEE9 0F:FED9: FF        .byte $FF   ; 
- - - - - - 0x03FEEA 0F:FEDA: FF        .byte $FF   ; 
- - - - - - 0x03FEEB 0F:FEDB: FF        .byte $FF   ; 
- - - - - - 0x03FEEC 0F:FEDC: FF        .byte $FF   ; 
- - - - - - 0x03FEED 0F:FEDD: FF        .byte $FF   ; 
- - - - - - 0x03FEEE 0F:FEDE: FF        .byte $FF   ; 
- - - - - - 0x03FEEF 0F:FEDF: FF        .byte $FF   ; 
- - - - - - 0x03FEF0 0F:FEE0: FF        .byte $FF   ; 
- - - - - - 0x03FEF1 0F:FEE1: FF        .byte $FF   ; 
- - - - - - 0x03FEF2 0F:FEE2: FF        .byte $FF   ; 
- - - - - - 0x03FEF3 0F:FEE3: FF        .byte $FF   ; 
- - - - - - 0x03FEF4 0F:FEE4: FF        .byte $FF   ; 
- - - - - - 0x03FEF5 0F:FEE5: FF        .byte $FF   ; 
- - - - - - 0x03FEF6 0F:FEE6: FF        .byte $FF   ; 
- - - - - - 0x03FEF7 0F:FEE7: FF        .byte $FF   ; 
- - - - - - 0x03FEF8 0F:FEE8: FF        .byte $FF   ; 
- - - - - - 0x03FEF9 0F:FEE9: FF        .byte $FF   ; 
- - - - - - 0x03FEFA 0F:FEEA: FF        .byte $FF   ; 
- - - - - - 0x03FEFB 0F:FEEB: FF        .byte $FF   ; 
- - - - - - 0x03FEFC 0F:FEEC: FF        .byte $FF   ; 
- - - - - - 0x03FEFD 0F:FEED: FF        .byte $FF   ; 
- - - - - - 0x03FEFE 0F:FEEE: FF        .byte $FF   ; 
- - - - - - 0x03FEFF 0F:FEEF: FF        .byte $FF   ; 
- - - - - - 0x03FF00 0F:FEF0: FF        .byte $FF   ; 
- - - - - - 0x03FF01 0F:FEF1: FF        .byte $FF   ; 
- - - - - - 0x03FF02 0F:FEF2: FF        .byte $FF   ; 
- - - - - - 0x03FF03 0F:FEF3: FF        .byte $FF   ; 
- - - - - - 0x03FF04 0F:FEF4: FF        .byte $FF   ; 
- - - - - - 0x03FF05 0F:FEF5: FF        .byte $FF   ; 
- - - - - - 0x03FF06 0F:FEF6: FF        .byte $FF   ; 
- - - - - - 0x03FF07 0F:FEF7: FF        .byte $FF   ; 
- - - - - - 0x03FF08 0F:FEF8: FF        .byte $FF   ; 
- - - - - - 0x03FF09 0F:FEF9: FF        .byte $FF   ; 
- - - - - - 0x03FF0A 0F:FEFA: FF        .byte $FF   ; 
- - - - - - 0x03FF0B 0F:FEFB: FF        .byte $FF   ; 
- - - - - - 0x03FF0C 0F:FEFC: FF        .byte $FF   ; 
- - - - - - 0x03FF0D 0F:FEFD: FF        .byte $FF   ; 
- - - - - - 0x03FF0E 0F:FEFE: FF        .byte $FF   ; 
- - - - - - 0x03FF0F 0F:FEFF: FF        .byte $FF   ; 
- - - - - - 0x03FF10 0F:FF00: FF        .byte $FF   ; 
- - - - - - 0x03FF11 0F:FF01: FF        .byte $FF   ; 
- - - - - - 0x03FF12 0F:FF02: FF        .byte $FF   ; 
- - - - - - 0x03FF13 0F:FF03: FF        .byte $FF   ; 
- - - - - - 0x03FF14 0F:FF04: FF        .byte $FF   ; 
- - - - - - 0x03FF15 0F:FF05: FF        .byte $FF   ; 
- - - - - - 0x03FF16 0F:FF06: FF        .byte $FF   ; 
- - - - - - 0x03FF17 0F:FF07: FF        .byte $FF   ; 
- - - - - - 0x03FF18 0F:FF08: FF        .byte $FF   ; 
- - - - - - 0x03FF19 0F:FF09: FF        .byte $FF   ; 
- - - - - - 0x03FF1A 0F:FF0A: FF        .byte $FF   ; 
- - - - - - 0x03FF1B 0F:FF0B: FF        .byte $FF   ; 
- - - - - - 0x03FF1C 0F:FF0C: FF        .byte $FF   ; 
- - - - - - 0x03FF1D 0F:FF0D: FF        .byte $FF   ; 
- - - - - - 0x03FF1E 0F:FF0E: FF        .byte $FF   ; 
- - - - - - 0x03FF1F 0F:FF0F: FF        .byte $FF   ; 
- - - - - - 0x03FF20 0F:FF10: FF        .byte $FF   ; 
- - - - - - 0x03FF21 0F:FF11: FF        .byte $FF   ; 
- - - - - - 0x03FF22 0F:FF12: FF        .byte $FF   ; 
- - - - - - 0x03FF23 0F:FF13: FF        .byte $FF   ; 
- - - - - - 0x03FF24 0F:FF14: FF        .byte $FF   ; 
- - - - - - 0x03FF25 0F:FF15: FF        .byte $FF   ; 
- - - - - - 0x03FF26 0F:FF16: FF        .byte $FF   ; 
- - - - - - 0x03FF27 0F:FF17: FF        .byte $FF   ; 
- - - - - - 0x03FF28 0F:FF18: FF        .byte $FF   ; 
- - - - - - 0x03FF29 0F:FF19: FF        .byte $FF   ; 
- - - - - - 0x03FF2A 0F:FF1A: FF        .byte $FF   ; 
- - - - - - 0x03FF2B 0F:FF1B: FF        .byte $FF   ; 
- - - - - - 0x03FF2C 0F:FF1C: FF        .byte $FF   ; 
- - - - - - 0x03FF2D 0F:FF1D: FF        .byte $FF   ; 
- - - - - - 0x03FF2E 0F:FF1E: FF        .byte $FF   ; 
- - - - - - 0x03FF2F 0F:FF1F: FF        .byte $FF   ; 
- - - - - - 0x03FF30 0F:FF20: FF        .byte $FF   ; 
- - - - - - 0x03FF31 0F:FF21: FF        .byte $FF   ; 
- - - - - - 0x03FF32 0F:FF22: FF        .byte $FF   ; 
- - - - - - 0x03FF33 0F:FF23: FF        .byte $FF   ; 
- - - - - - 0x03FF34 0F:FF24: FF        .byte $FF   ; 
- - - - - - 0x03FF35 0F:FF25: FF        .byte $FF   ; 
- - - - - - 0x03FF36 0F:FF26: FF        .byte $FF   ; 
- - - - - - 0x03FF37 0F:FF27: FF        .byte $FF   ; 
- - - - - - 0x03FF38 0F:FF28: FF        .byte $FF   ; 
- - - - - - 0x03FF39 0F:FF29: FF        .byte $FF   ; 
- - - - - - 0x03FF3A 0F:FF2A: FF        .byte $FF   ; 
- - - - - - 0x03FF3B 0F:FF2B: FF        .byte $FF   ; 
- - - - - - 0x03FF3C 0F:FF2C: FF        .byte $FF   ; 
- - - - - - 0x03FF3D 0F:FF2D: FF        .byte $FF   ; 
- - - - - - 0x03FF3E 0F:FF2E: FF        .byte $FF   ; 
- - - - - - 0x03FF3F 0F:FF2F: FF        .byte $FF   ; 
- - - - - - 0x03FF40 0F:FF30: FF        .byte $FF   ; 
- - - - - - 0x03FF41 0F:FF31: FF        .byte $FF   ; 
- - - - - - 0x03FF42 0F:FF32: FF        .byte $FF   ; 
- - - - - - 0x03FF43 0F:FF33: FF        .byte $FF   ; 
- - - - - - 0x03FF44 0F:FF34: FF        .byte $FF   ; 
- - - - - - 0x03FF45 0F:FF35: FF        .byte $FF   ; 
- - - - - - 0x03FF46 0F:FF36: FF        .byte $FF   ; 
- - - - - - 0x03FF47 0F:FF37: FF        .byte $FF   ; 
- - - - - - 0x03FF48 0F:FF38: FF        .byte $FF   ; 
- - - - - - 0x03FF49 0F:FF39: FF        .byte $FF   ; 
- - - - - - 0x03FF4A 0F:FF3A: FF        .byte $FF   ; 
- - - - - - 0x03FF4B 0F:FF3B: FF        .byte $FF   ; 
- - - - - - 0x03FF4C 0F:FF3C: FF        .byte $FF   ; 
- - - - - - 0x03FF4D 0F:FF3D: FF        .byte $FF   ; 
- - - - - - 0x03FF4E 0F:FF3E: FF        .byte $FF   ; 
- - - - - - 0x03FF4F 0F:FF3F: FF        .byte $FF   ; 
- - - - - - 0x03FF50 0F:FF40: FF        .byte $FF   ; 
- - - - - - 0x03FF51 0F:FF41: FF        .byte $FF   ; 
- - - - - - 0x03FF52 0F:FF42: FF        .byte $FF   ; 
- - - - - - 0x03FF53 0F:FF43: FF        .byte $FF   ; 
- - - - - - 0x03FF54 0F:FF44: FF        .byte $FF   ; 
- - - - - - 0x03FF55 0F:FF45: FF        .byte $FF   ; 
- - - - - - 0x03FF56 0F:FF46: FF        .byte $FF   ; 
- - - - - - 0x03FF57 0F:FF47: FF        .byte $FF   ; 
- - - - - - 0x03FF58 0F:FF48: FF        .byte $FF   ; 
- - - - - - 0x03FF59 0F:FF49: FF        .byte $FF   ; 
- - - - - - 0x03FF5A 0F:FF4A: FF        .byte $FF   ; 
- - - - - - 0x03FF5B 0F:FF4B: FF        .byte $FF   ; 
- - - - - - 0x03FF5C 0F:FF4C: FF        .byte $FF   ; 
- - - - - - 0x03FF5D 0F:FF4D: FF        .byte $FF   ; 
- - - - - - 0x03FF5E 0F:FF4E: FF        .byte $FF   ; 
- - - - - - 0x03FF5F 0F:FF4F: FF        .byte $FF   ; 
- - - - - - 0x03FF60 0F:FF50: FF        .byte $FF   ; 
- - - - - - 0x03FF61 0F:FF51: FF        .byte $FF   ; 
- - - - - - 0x03FF62 0F:FF52: FF        .byte $FF   ; 
- - - - - - 0x03FF63 0F:FF53: FF        .byte $FF   ; 
- - - - - - 0x03FF64 0F:FF54: FF        .byte $FF   ; 
- - - - - - 0x03FF65 0F:FF55: FF        .byte $FF   ; 
- - - - - - 0x03FF66 0F:FF56: FF        .byte $FF   ; 
- - - - - - 0x03FF67 0F:FF57: FF        .byte $FF   ; 
- - - - - - 0x03FF68 0F:FF58: FF        .byte $FF   ; 
- - - - - - 0x03FF69 0F:FF59: FF        .byte $FF   ; 
- - - - - - 0x03FF6A 0F:FF5A: FF        .byte $FF   ; 
- - - - - - 0x03FF6B 0F:FF5B: FF        .byte $FF   ; 
- - - - - - 0x03FF6C 0F:FF5C: FF        .byte $FF   ; 
- - - - - - 0x03FF6D 0F:FF5D: FF        .byte $FF   ; 
- - - - - - 0x03FF6E 0F:FF5E: FF        .byte $FF   ; 
- - - - - - 0x03FF6F 0F:FF5F: FF        .byte $FF   ; 
- - - - - - 0x03FF70 0F:FF60: FF        .byte $FF   ; 
- - - - - - 0x03FF71 0F:FF61: FF        .byte $FF   ; 
- - - - - - 0x03FF72 0F:FF62: FF        .byte $FF   ; 
- - - - - - 0x03FF73 0F:FF63: FF        .byte $FF   ; 
- - - - - - 0x03FF74 0F:FF64: FF        .byte $FF   ; 
- - - - - - 0x03FF75 0F:FF65: FF        .byte $FF   ; 
- - - - - - 0x03FF76 0F:FF66: FF        .byte $FF   ; 
- - - - - - 0x03FF77 0F:FF67: FF        .byte $FF   ; 
- - - - - - 0x03FF78 0F:FF68: FF        .byte $FF   ; 
- - - - - - 0x03FF79 0F:FF69: FF        .byte $FF   ; 
- - - - - - 0x03FF7A 0F:FF6A: FF        .byte $FF   ; 
- - - - - - 0x03FF7B 0F:FF6B: FF        .byte $FF   ; 
- - - - - - 0x03FF7C 0F:FF6C: FF        .byte $FF   ; 
- - - - - - 0x03FF7D 0F:FF6D: FF        .byte $FF   ; 
- - - - - - 0x03FF7E 0F:FF6E: FF        .byte $FF   ; 
- - - - - - 0x03FF7F 0F:FF6F: FF        .byte $FF   ; 
- - - - - - 0x03FF80 0F:FF70: FF        .byte $FF   ; 
- - - - - - 0x03FF81 0F:FF71: FF        .byte $FF   ; 
- - - - - - 0x03FF82 0F:FF72: FF        .byte $FF   ; 
- - - - - - 0x03FF83 0F:FF73: FF        .byte $FF   ; 
- - - - - - 0x03FF84 0F:FF74: FF        .byte $FF   ; 
- - - - - - 0x03FF85 0F:FF75: FF        .byte $FF   ; 
- - - - - - 0x03FF86 0F:FF76: FF        .byte $FF   ; 
- - - - - - 0x03FF87 0F:FF77: FF        .byte $FF   ; 
- - - - - - 0x03FF88 0F:FF78: FF        .byte $FF   ; 
- - - - - - 0x03FF89 0F:FF79: FF        .byte $FF   ; 
- - - - - - 0x03FF8A 0F:FF7A: FF        .byte $FF   ; 
- - - - - - 0x03FF8B 0F:FF7B: FF        .byte $FF   ; 
- - - - - - 0x03FF8C 0F:FF7C: FF        .byte $FF   ; 
- - - - - - 0x03FF8D 0F:FF7D: FF        .byte $FF   ; 
- - - - - - 0x03FF8E 0F:FF7E: FF        .byte $FF   ; 
- - - - - - 0x03FF8F 0F:FF7F: FF        .byte $FF   ; 
- - - - - - 0x03FF90 0F:FF80: FF        .byte $FF   ; 
- - - - - - 0x03FF91 0F:FF81: FF        .byte $FF   ; 
- - - - - - 0x03FF92 0F:FF82: FF        .byte $FF   ; 
- - - - - - 0x03FF93 0F:FF83: FF        .byte $FF   ; 
- - - - - - 0x03FF94 0F:FF84: FF        .byte $FF   ; 
- - - - - - 0x03FF95 0F:FF85: FF        .byte $FF   ; 
- - - - - - 0x03FF96 0F:FF86: FF        .byte $FF   ; 
- - - - - - 0x03FF97 0F:FF87: FF        .byte $FF   ; 
- - - - - - 0x03FF98 0F:FF88: FF        .byte $FF   ; 
- - - - - - 0x03FF99 0F:FF89: FF        .byte $FF   ; 
- - - - - - 0x03FF9A 0F:FF8A: FF        .byte $FF   ; 
- - - - - - 0x03FF9B 0F:FF8B: FF        .byte $FF   ; 
- - - - - - 0x03FF9C 0F:FF8C: FF        .byte $FF   ; 
- - - - - - 0x03FF9D 0F:FF8D: FF        .byte $FF   ; 
- - - - - - 0x03FF9E 0F:FF8E: FF        .byte $FF   ; 
- - - - - - 0x03FF9F 0F:FF8F: FF        .byte $FF   ; 
- - - - - - 0x03FFA0 0F:FF90: FF        .byte $FF   ; 
- - - - - - 0x03FFA1 0F:FF91: FF        .byte $FF   ; 
- - - - - - 0x03FFA2 0F:FF92: FF        .byte $FF   ; 
- - - - - - 0x03FFA3 0F:FF93: FF        .byte $FF   ; 
- - - - - - 0x03FFA4 0F:FF94: FF        .byte $FF   ; 
- - - - - - 0x03FFA5 0F:FF95: FF        .byte $FF   ; 
- - - - - - 0x03FFA6 0F:FF96: FF        .byte $FF   ; 
- - - - - - 0x03FFA7 0F:FF97: FF        .byte $FF   ; 
- - - - - - 0x03FFA8 0F:FF98: FF        .byte $FF   ; 
- - - - - - 0x03FFA9 0F:FF99: FF        .byte $FF   ; 
- - - - - - 0x03FFAA 0F:FF9A: FF        .byte $FF   ; 
- - - - - - 0x03FFAB 0F:FF9B: FF        .byte $FF   ; 
- - - - - - 0x03FFAC 0F:FF9C: FF        .byte $FF   ; 
- - - - - - 0x03FFAD 0F:FF9D: FF        .byte $FF   ; 
- - - - - - 0x03FFAE 0F:FF9E: FF        .byte $FF   ; 
- - - - - - 0x03FFAF 0F:FF9F: FF        .byte $FF   ; 
- - - - - - 0x03FFB0 0F:FFA0: FF        .byte $FF   ; 
- - - - - - 0x03FFB1 0F:FFA1: FF        .byte $FF   ; 
- - - - - - 0x03FFB2 0F:FFA2: FF        .byte $FF   ; 
- - - - - - 0x03FFB3 0F:FFA3: FF        .byte $FF   ; 
- - - - - - 0x03FFB4 0F:FFA4: FF        .byte $FF   ; 
- - - - - - 0x03FFB5 0F:FFA5: FF        .byte $FF   ; 
- - - - - - 0x03FFB6 0F:FFA6: FF        .byte $FF   ; 
- - - - - - 0x03FFB7 0F:FFA7: FF        .byte $FF   ; 
- - - - - - 0x03FFB8 0F:FFA8: FF        .byte $FF   ; 
- - - - - - 0x03FFB9 0F:FFA9: FF        .byte $FF   ; 
- - - - - - 0x03FFBA 0F:FFAA: FF        .byte $FF   ; 
- - - - - - 0x03FFBB 0F:FFAB: FF        .byte $FF   ; 
- - - - - - 0x03FFBC 0F:FFAC: FF        .byte $FF   ; 
- - - - - - 0x03FFBD 0F:FFAD: FF        .byte $FF   ; 
- - - - - - 0x03FFBE 0F:FFAE: FF        .byte $FF   ; 
- - - - - - 0x03FFBF 0F:FFAF: FF        .byte $FF   ; 
- - - - - - 0x03FFC0 0F:FFB0: FF        .byte $FF   ; 
- - - - - - 0x03FFC1 0F:FFB1: FF        .byte $FF   ; 
- - - - - - 0x03FFC2 0F:FFB2: FF        .byte $FF   ; 
- - - - - - 0x03FFC3 0F:FFB3: FF        .byte $FF   ; 
- - - - - - 0x03FFC4 0F:FFB4: FF        .byte $FF   ; 
- - - - - - 0x03FFC5 0F:FFB5: FF        .byte $FF   ; 
- - - - - - 0x03FFC6 0F:FFB6: FF        .byte $FF   ; 
- - - - - - 0x03FFC7 0F:FFB7: FF        .byte $FF   ; 
- - - - - - 0x03FFC8 0F:FFB8: FF        .byte $FF   ; 
- - - - - - 0x03FFC9 0F:FFB9: FF        .byte $FF   ; 
- - - - - - 0x03FFCA 0F:FFBA: FF        .byte $FF   ; 
- - - - - - 0x03FFCB 0F:FFBB: FF        .byte $FF   ; 
- - - - - - 0x03FFCC 0F:FFBC: FF        .byte $FF   ; 
- - - - - - 0x03FFCD 0F:FFBD: FF        .byte $FF   ; 
- - - - - - 0x03FFCE 0F:FFBE: FF        .byte $FF   ; 
- - - - - - 0x03FFCF 0F:FFBF: FF        .byte $FF   ; 
- - - - - - 0x03FFD0 0F:FFC0: FF        .byte $FF   ; 
- - - - - - 0x03FFD1 0F:FFC1: FF        .byte $FF   ; 
- - - - - - 0x03FFD2 0F:FFC2: FF        .byte $FF   ; 
- - - - - - 0x03FFD3 0F:FFC3: FF        .byte $FF   ; 
- - - - - - 0x03FFD4 0F:FFC4: FF        .byte $FF   ; 
- - - - - - 0x03FFD5 0F:FFC5: FF        .byte $FF   ; 
- - - - - - 0x03FFD6 0F:FFC6: FF        .byte $FF   ; 
- - - - - - 0x03FFD7 0F:FFC7: FF        .byte $FF   ; 
- - - - - - 0x03FFD8 0F:FFC8: FF        .byte $FF   ; 
- - - - - - 0x03FFD9 0F:FFC9: FF        .byte $FF   ; 
- - - - - - 0x03FFDA 0F:FFCA: FF        .byte $FF   ; 
- - - - - - 0x03FFDB 0F:FFCB: FF        .byte $FF   ; 
- - - - - - 0x03FFDC 0F:FFCC: FF        .byte $FF   ; 
- - - - - - 0x03FFDD 0F:FFCD: FF        .byte $FF   ; 
- - - - - - 0x03FFDE 0F:FFCE: FF        .byte $FF   ; 
- - - - - - 0x03FFDF 0F:FFCF: FF        .byte $FF   ; 
- - - - - - 0x03FFE0 0F:FFD0: FF        .byte $FF   ; 
- - - - - - 0x03FFE1 0F:FFD1: FF        .byte $FF   ; 
- - - - - - 0x03FFE2 0F:FFD2: FF        .byte $FF   ; 
- - - - - - 0x03FFE3 0F:FFD3: FF        .byte $FF   ; 
- - - - - - 0x03FFE4 0F:FFD4: FF        .byte $FF   ; 
- - - - - - 0x03FFE5 0F:FFD5: FF        .byte $FF   ; 
- - - - - - 0x03FFE6 0F:FFD6: FF        .byte $FF   ; 
- - - - - - 0x03FFE7 0F:FFD7: FF        .byte $FF   ; 
- - - - - - 0x03FFE8 0F:FFD8: FF        .byte $FF   ; 
- - - - - - 0x03FFE9 0F:FFD9: FF        .byte $FF   ; 
- - - - - - 0x03FFEA 0F:FFDA: FF        .byte $FF   ; 
- - - - - - 0x03FFEB 0F:FFDB: FF        .byte $FF   ; 
- - - - - - 0x03FFEC 0F:FFDC: FF        .byte $FF   ; 
- - - - - - 0x03FFED 0F:FFDD: FF        .byte $FF   ; 
- - - - - - 0x03FFEE 0F:FFDE: FF        .byte $FF   ; 
- - - - - - 0x03FFEF 0F:FFDF: FF        .byte $FF   ; 
- - - - - - 0x03FFF0 0F:FFE0: FF        .byte $FF   ; 
- - - - - - 0x03FFF1 0F:FFE1: FF        .byte $FF   ; 
- - - - - - 0x03FFF2 0F:FFE2: FF        .byte $FF   ; 
- - - - - - 0x03FFF3 0F:FFE3: FF        .byte $FF   ; 
- - - - - - 0x03FFF4 0F:FFE4: FF        .byte $FF   ; 
- - - - - - 0x03FFF5 0F:FFE5: FF        .byte $FF   ; 
- - - - - - 0x03FFF6 0F:FFE6: FF        .byte $FF   ; 
- - - - - - 0x03FFF7 0F:FFE7: FF        .byte $FF   ; 
- - - - - - 0x03FFF8 0F:FFE8: FF        .byte $FF   ; 
- - - - - - 0x03FFF9 0F:FFE9: FF        .byte $FF   ; 
- - - - - - 0x03FFFA 0F:FFEA: FF        .byte $FF   ; 
- - - - - - 0x03FFFB 0F:FFEB: FF        .byte $FF   ; 
- - - - - - 0x03FFFC 0F:FFEC: FF        .byte $FF   ; 
- - - - - - 0x03FFFD 0F:FFED: FF        .byte $FF   ; 
- - - - - - 0x03FFFE 0F:FFEE: FF        .byte $FF   ; 
- - - - - - 0x03FFFF 0F:FFEF: FF        .byte $FF   ; 
C - - - - - 0x040000 0F:FFF0: A9 00     LDA #$00
C - - - - - 0x040002 0F:FFF2: 8D 00 80  STA $8000
C - - - - - 0x040005 0F:FFF5: 4C 03 C5  JMP $C503
- - - - - - 0x040008 0F:FFF8: 00        .byte $00   ; 
- - - - - - 0x040009 0F:FFF9: 00        .byte $00   ; 
- D 3 - - - 0x04000A 0F:FFFA: 00        .byte $00   ; 
- D 3 - - - 0x04000B 0F:FFFB: C5        .byte $C5   ; 
- D 3 - - - 0x04000C 0F:FFFC: F0        .byte $F0   ; 
- D 3 - - - 0x04000D 0F:FFFD: FF        .byte $FF   ; 
- D 3 - - - 0x04000E 0F:FFFE: 06        .byte $06   ; 
- D 3 - - - 0x04000F 0F:FFFF: C5        .byte $C5   ; 



