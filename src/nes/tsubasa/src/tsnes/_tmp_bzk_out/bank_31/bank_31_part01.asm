; bank_31.asm 分片 1/7 (原文件行 1-1000, 共 6131 行)

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