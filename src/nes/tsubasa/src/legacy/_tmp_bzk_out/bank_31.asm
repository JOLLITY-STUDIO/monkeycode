; ===== MMC3 Bank 31 =====
; ROM: 0x03E010-0x04000F
; CPU: $E000-$FFFF
; CDL: code=3951 data=3387 unaccessed=854

  0x03E010 $E000: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x03E011 $E001: C-----  18       CLC  
  0x03E012 $E002: C-----  69 01    ADC  #$01
  0x03E014 $E004: C-----  A0 06    LDY  #$06
  0x03E016 $E006: C-----  18       CLC  
  0x03E017 $E007: C-----  71 34    ADC  ($34),Y
  0x03E019 $E009: C-----  C9 D0    CMP  #$D0
  0x03E01B $E00B: C-----  90 02    BCC  $E00F
  0x03E01D $E00D: C-----  A9 CF    LDA  #$CF
  0x03E01F $E00F: C-----  C9 30    CMP  #$30
  0x03E021 $E011: C-----  B0 02    BCS  $E015
  0x03E023 $E013: C-----  A9 30    LDA  #$30
  0x03E025 $E015: C-----  91 34    STA  ($34),Y
  0x03E027 $E017: C-----  AD 41 04 LDA  $0441
  0x03E02A $E01A: C-----  AE FC 05 LDX  $05FC
  0x03E02D $E01D: C-----  8E 41 04 STX  $0441
  0x03E030 $E020: C-----  8D FC 05 STA  $05FC
  0x03E033 $E023: C-----  20 59 E0 JSR  $E059
  0x03E036 $E026: C-----  A9 FF    LDA  #$FF
  0x03E038 $E028: C-----  8D 1A 06 STA  $061A
  0x03E03B $E02B: C-----  A9 01    LDA  #$01
  0x03E03D $E02D: C-----  8D 1B 06 STA  $061B
  0x03E040 $E030: C-----  20 3E E7 JSR  $E73E
  0x03E043 $E033: C-----  AD FC 05 LDA  $05FC
  0x03E046 $E036: C-----  8D 41 04 STA  $0441
  0x03E049 $E039: C-----  20 EC E6 JSR  $E6EC
  0x03E04C $E03C: C-----  48       PHA  
  0x03E04D $E03D: C-----  A5 22    LDA  $22
  0x03E04F $E03F: C-----  A9 1A    LDA  #$1A
  0x03E051 $E041: C-----  85 24    STA  $24
  0x03E053 $E043: C-----  A9 1B    LDA  #$1B
  0x03E055 $E045: C-----  85 25    STA  $25
  0x03E057 $E047: C-----  20 2D CE JSR  $CE2D
  0x03E05A $E04A: C-----  68       PLA  
  0x03E05B $E04B: C-----  20 1E 80 JSR  $801E
  0x03E05E $E04E: C-----  A9 1B    LDA  #$1B
  0x03E060 $E050: C-----  20 B0 CB JSR  $CBB0
  0x03E063 $E053: C-----  A2 50    LDX  #$50
  0x03E065 $E055: C-----  9A       TXS  
  0x03E066 $E056: C-----  4C DF E0 JMP  $E0DF
  0x03E069 $E059: C-----  AD FC 05 LDA  $05FC
  0x03E06C $E05C: C-----  C9 FF    CMP  #$FF
  0x03E06E $E05E: C-----  F0 13    BEQ  $E073
  0x03E070 $E060: C-----  20 7C CD JSR  $CD7C
  0x03E073 $E063: C-----  A0 06    LDY  #$06
  0x03E075 $E065: C-----  B1 34    LDA  ($34),Y
  0x03E077 $E067: C-----  AA       TAX  
  0x03E078 $E068: C-----  A0 08    LDY  #$08
  0x03E07A $E06A: C-----  B1 34    LDA  ($34),Y
  0x03E07C $E06C: C-----  A8       TAY  
  0x03E07D $E06D: C-----  20 E2 CD JSR  $CDE2
  0x03E080 $E070: C-----  8D 38 06 STA  $0638
  0x03E083 $E073: C-----  60       RTS  
  0x03E084 $E074: C-----  AD FF 05 LDA  $05FF
  0x03E087 $E077: C-----  F0 65    BEQ  $E0DE
  0x03E089 $E079: C-----  A9 0F    LDA  #$0F
  0x03E08B $E07B: C-----  8D 2A 06 STA  $062A
  0x03E08E $E07E: C-----  20 09 E7 JSR  $E709
  0x03E091 $E081: C-----  A9 00    LDA  #$00
  0x03E093 $E083: C-----  48       PHA  
  0x03E094 $E084: C-----  A9 01    LDA  #$01
  0x03E096 $E086: C-----  20 0F CB JSR  $CB0F
  0x03E099 $E089: C-----  68       PLA  
  0x03E09A $E08A: C-----  48       PHA  
  0x03E09B $E08B: C-----  F0 44    BEQ  $E0D1
  0x03E09D $E08D: C-----  C9 0B    CMP  #$0B
  0x03E09F $E08F: C-----  F0 40    BEQ  $E0D1
  0x03E0A1 $E091: C-----  CD 41 04 CMP  $0441
  0x03E0A4 $E094: C-----  F0 3B    BEQ  $E0D1
  0x03E0A6 $E096: C-----  2C 2A 06 BIT  $062A
  0x03E0A9 $E099: C-----  10 14    BPL  $E0AF
  0x03E0AB $E09B: C-----  48       PHA  
  0x03E0AC $E09C: C-----  48       PHA  
  0x03E0AD $E09D: C-----  A5 22    LDA  $22
  0x03E0AF $E09F: C-----  A9 1A    LDA  #$1A
  0x03E0B1 $E0A1: C-----  85 24    STA  $24
  0x03E0B3 $E0A3: C-----  A9 1B    LDA  #$1B
  0x03E0B5 $E0A5: C-----  85 25    STA  $25
  0x03E0B7 $E0A7: C-----  20 2D CE JSR  $CE2D
  0x03E0BA $E0AA: C-----  68       PLA  
  0x03E0BB $E0AB: C-----  20 00 80 JSR  $8000
  0x03E0BE $E0AE: C-----  68       PLA  
  0x03E0BF $E0AF: C-----  85 41    STA  $41
  0x03E0C1 $E0B1: C-----  20 7C CD JSR  $CD7C
  0x03E0C4 $E0B4: C-----  A5 41    LDA  $41
  0x03E0C6 $E0B6: C-----  C9 0B    CMP  #$0B
  0x03E0C8 $E0B8: C-----  AE FB 05 LDX  $05FB
  0x03E0CB $E0BB: C-----  F0 06    BEQ  $E0C3
  0x03E0CD $E0BD: C-----  08       PHP  
  0x03E0CE $E0BE: C-----  68       PLA  
  0x03E0CF $E0BF: C-----  49 01    EOR  #$01
  0x03E0D1 $E0C1: C-----  48       PHA  
  0x03E0D2 $E0C2: C-----  28       PLP  
  0x03E0D3 $E0C3: C-----  A2 21    LDX  #$21
  0x03E0D5 $E0C5: C-----  90 02    BCC  $E0C9
  0x03E0D7 $E0C7: C-----  A2 22    LDX  #$22
  0x03E0D9 $E0C9: C-----  A5 41    LDA  $41
  0x03E0DB $E0CB: C-----  20 08 CE JSR  $CE08
  0x03E0DE $E0CE: C-----  20 54 E8 JSR  $E854
  0x03E0E1 $E0D1: C-----  68       PLA  
  0x03E0E2 $E0D2: C-----  18       CLC  
  0x03E0E3 $E0D3: C-----  69 01    ADC  #$01
  0x03E0E5 $E0D5: C-----  C9 16    CMP  #$16
  0x03E0E7 $E0D7: C-----  D0 AA    BNE  $E083
  0x03E0E9 $E0D9: C-----  A9 00    LDA  #$00
  0x03E0EB $E0DB: C-----  8D FF 05 STA  $05FF
  0x03E0EE $E0DE: C-----  60       RTS  
  0x03E0EF $E0DF: C-----  A9 00    LDA  #$00
  0x03E0F1 $E0E1: C-----  20 7F EF JSR  $EF7F
  0x03E0F4 $E0E4: C-----  A9 01    LDA  #$01
  0x03E0F6 $E0E6: C-----  20 7F EF JSR  $EF7F
  0x03E0F9 $E0E9: C-----  20 33 E2 JSR  $E233
  0x03E0FC $E0EC: C-----  A9 0A    LDA  #$0A
  0x03E0FE $E0EE: C-----  8D 14 06 STA  $0614
  0x03E101 $E0F1: C-----  A9 FF    LDA  #$FF
  0x03E103 $E0F3: C-----  8D 2A 06 STA  $062A
  0x03E106 $E0F6: C-----  20 EC E6 JSR  $E6EC
  0x03E109 $E0F9: C-----  A0 40    LDY  #$40
  0x03E10B $E0FB: C-----  A2 00    LDX  #$00
  0x03E10D $E0FD: C-----  8E 4E 04 STX  $044E
  0x03E110 $E100: C-----  8E 00 06 STX  $0600
  0x03E113 $E103: C-----  AD 41 04 LDA  $0441
  0x03E116 $E106: C-----  C9 0B    CMP  #$0B
  0x03E118 $E108: C-----  90 04    BCC  $E10E
  0x03E11A $E10A: C-----  A2 0B    LDX  #$0B
  0x03E11C $E10C: C-----  A0 00    LDY  #$00
  0x03E11E $E10E: C-----  8E FB 05 STX  $05FB
  0x03E121 $E111: C-----  8C 17 05 STY  $0517
  0x03E124 $E114: C-----  8A       TXA  
  0x03E125 $E115: C-----  D0 0E    BNE  $E125
  0x03E127 $E117: C-----  2C 4C 04 BIT  $044C
  0x03E12A $E11A: C-----  10 26    BPL  $E142
  0x03E12C $E11C: C-----  8D 4C 04 STA  $044C
  0x03E12F $E11F: C-----  8D F1 03 STA  $03F1
  0x03E132 $E122: C-----  4C 42 E1 JMP  $E142
  0x03E135 $E125: C-----  A9 00    LDA  #$00
  0x03E137 $E127: C-----  8D 42 04 STA  $0442
  0x03E13A $E12A: C-----  20 99 CE JSR  $CE99
  0x03E13D $E12D: C-----  8D FD 05 STA  $05FD
  0x03E140 $E130: C-----  AD 41 04 LDA  $0441
  0x03E143 $E133: C-----  20 7C CD JSR  $CD7C
  0x03E146 $E136: C-----  A9 05    LDA  #$05
  0x03E148 $E138: C-----  A0 09    LDY  #$09
  0x03E14A $E13A: C-----  91 34    STA  ($34),Y
  0x03E14C $E13C: C-----  AD FE 05 LDA  $05FE
  0x03E14F $E13F: C-----  8D 17 06 STA  $0617
  0x03E152 $E142: C-----  20 67 E2 JSR  $E267
  0x03E155 $E145: C-----  A9 01    LDA  #$01
  0x03E157 $E147: C-----  20 0F CB JSR  $CB0F
  0x03E15A $E14A: C-----  20 49 E3 JSR  $E349
  0x03E15D $E14D: C-----  AD 14 06 LDA  $0614
  0x03E160 $E150: C-----  F0 06    BEQ  $E158
  0x03E162 $E152: C-----  CE 14 06 DEC  $0614
  0x03E165 $E155: C-----  4C 45 E1 JMP  $E145
  0x03E168 $E158: C-----  A9 0A    LDA  #$0A
  0x03E16A $E15A: C-----  8D 14 06 STA  $0614
  0x03E16D $E15D: C-----  AD 1C 00 LDA  $001C
  0x03E170 $E160: C-----  29 0F    AND  #$0F
  0x03E172 $E162: C-----  F0 22    BEQ  $E186
  0x03E174 $E164: C-----  48       PHA  
  0x03E175 $E165: C-----  A2 20    LDX  #$20
  0x03E177 $E167: C-----  AD 41 04 LDA  $0441
  0x03E17A $E16A: C-----  AC FB 05 LDY  $05FB
  0x03E17D $E16D: C-----  F0 05    BEQ  $E174
  0x03E17F $E16F: C-----  A2 22    LDX  #$22
  0x03E181 $E171: C-----  AD FD 05 LDA  $05FD
  0x03E184 $E174: C-----  20 08 CE JSR  $CE08
  0x03E187 $E177: C-----  68       PLA  
  0x03E188 $E178: C-----  48       PHA  
  0x03E189 $E179: C-----  A0 05    LDY  #$05
  0x03E18B $E17B: C-----  20 F5 E8 JSR  $E8F5
  0x03E18E $E17E: C-----  68       PLA  
  0x03E18F $E17F: C-----  4A       LSR  A
  0x03E190 $E180: C-----  4A       LSR  A
  0x03E191 $E181: C-----  A0 07    LDY  #$07
  0x03E193 $E183: C-----  20 F5 E8 JSR  $E8F5
  0x03E196 $E186: C-----  20 EC E6 JSR  $E6EC
  0x03E199 $E189: C-----  AD 41 04 LDA  $0441
  0x03E19C $E18C: C-----  C9 0B    CMP  #$0B
  0x03E19E $E18E: C-----  90 57    BCC  $E1E7
  0x03E1A0 $E190: C-----  AD FE 05 LDA  $05FE
  0x03E1A3 $E193: C-----  CD 17 06 CMP  $0617
  0x03E1A6 $E196: C-----  F0 4F    BEQ  $E1E7
  0x03E1A8 $E198: C-----  8D 17 06 STA  $0617
  0x03E1AB $E19B: C-----  A9 00    LDA  #$00
  0x03E1AD $E19D: C-----  8D 21 06 STA  $0621
  0x03E1B0 $E1A0: C-----  48       PHA  
  0x03E1B1 $E1A1: C-----  A5 22    LDA  $22
  0x03E1B3 $E1A3: C-----  A9 1C    LDA  #$1C
  0x03E1B5 $E1A5: C-----  85 24    STA  $24
  0x03E1B7 $E1A7: C-----  A9 1D    LDA  #$1D
  0x03E1B9 $E1A9: C-----  85 25    STA  $25
  0x03E1BB $E1AB: C-----  20 2D CE JSR  $CE2D
  0x03E1BE $E1AE: C-----  68       PLA  
  0x03E1BF $E1AF: C-----  20 06 80 JSR  $8006
  0x03E1C2 $E1B2: C-----  AD 3B 04 LDA  $043B
  0x03E1C5 $E1B5: C-----  C9 02    CMP  #$02
  0x03E1C7 $E1B7: C-----  F0 2E    BEQ  $E1E7
  0x03E1C9 $E1B9: C-----  48       PHA  
  0x03E1CA $E1BA: C-----  A5 22    LDA  $22
  0x03E1CC $E1BC: C-----  A9 1A    LDA  #$1A
  0x03E1CE $E1BE: C-----  85 24    STA  $24
  0x03E1D0 $E1C0: C-----  A9 1B    LDA  #$1B
  0x03E1D2 $E1C2: C-----  85 25    STA  $25
  0x03E1D4 $E1C4: C-----  20 2D CE JSR  $CE2D
  0x03E1D7 $E1C7: C-----  68       PLA  
  0x03E1D8 $E1C8: C-----  20 21 80 JSR  $8021
  0x03E1DB $E1CB: C-----  20 46 CC JSR  $CC46
  0x03E1DE $E1CE: C-----  A9 00    LDA  #$00
  0x03E1E0 $E1D0: C-----  8D 2D 06 STA  $062D
  0x03E1E3 $E1D3: C-----  8D 15 06 STA  $0615
  0x03E1E6 $E1D6: C-----  A9 1A    LDA  #$1A
  0x03E1E8 $E1D8: C-----  85 24    STA  $24
  0x03E1EA $E1DA: C-----  A9 1B    LDA  #$1B
  0x03E1EC $E1DC: C-----  85 25    STA  $25
  0x03E1EE $E1DE: C-----  20 2D CE JSR  $CE2D
  0x03E1F1 $E1E1: C-----  A2 50    LDX  #$50
  0x03E1F3 $E1E3: C-----  9A       TXS  
  0x03E1F4 $E1E4: C-----  4C 27 80 JMP  $8027
  0x03E1F7 $E1E7: C-----  A2 00    LDX  #$00
  0x03E1F9 $E1E9: C-----  8E FF 05 STX  $05FF
  0x03E1FC $E1EC: C-----  E8       INX  
  0x03E1FD $E1ED: C-----  8A       TXA  
  0x03E1FE $E1EE: C-----  20 93 D1 JSR  $D193
  0x03E201 $E1F1: C-----  20 7D E2 JSR  $E27D
  0x03E204 $E1F4: C-----  EE 13 06 INC  $0613
  0x03E207 $E1F7: C-----  20 BC E2 JSR  $E2BC
  0x03E20A $E1FA: C-----  20 07 E4 JSR  $E407
  0x03E20D $E1FD: C-----  2C 4B 04 BIT  $044B
  0x03E210 $E200: C-----  10 1C    BPL  $E21E
  0x03E212 $E202: C-----  AD FB 05 LDA  $05FB
  0x03E215 $E205: C-----  D0 17    BNE  $E21E
  0x03E217 $E207: C-----  2C 35 06 BIT  $0635
  0x03E21A $E20A: C-----  10 12    BPL  $E21E
  0x03E21C $E20C: C-----  48       PHA  
  0x03E21D $E20D: C-----  A5 22    LDA  $22
  0x03E21F $E20F: C-----  A9 1A    LDA  #$1A
  0x03E221 $E211: C-----  85 24    STA  $24
  0x03E223 $E213: C-----  A9 1B    LDA  #$1B
  0x03E225 $E215: C-----  85 25    STA  $25
  0x03E227 $E217: C-----  20 2D CE JSR  $CE2D
  0x03E22A $E21A: C-----  68       PLA  
  0x03E22B $E21B: C-----  20 39 80 JSR  $8039
  0x03E22E $E21E: C-----  48       PHA  
  0x03E22F $E21F: C-----  A5 22    LDA  $22
  0x03E231 $E221: C-----  A9 1A    LDA  #$1A
  0x03E233 $E223: C-----  85 24    STA  $24
  0x03E235 $E225: C-----  A9 1B    LDA  #$1B
  0x03E237 $E227: C-----  85 25    STA  $25
  0x03E239 $E229: C-----  20 2D CE JSR  $CE2D
  0x03E23C $E22C: C-----  68       PLA  
  0x03E23D $E22D: C-----  20 33 80 JSR  $8033
  0x03E240 $E230: C-----  4C 45 E1 JMP  $E145
  0x03E243 $E233: C-----  A9 1E    LDA  #$1E
  0x03E245 $E235: C-----  20 B0 CB JSR  $CBB0
  0x03E248 $E238: C-----  48       PHA  
  0x03E249 $E239: C-----  A5 22    LDA  $22
  0x03E24B $E23B: C-----  A9 1C    LDA  #$1C
  0x03E24D $E23D: C-----  85 24    STA  $24
  0x03E24F $E23F: C-----  A9 1D    LDA  #$1D
  0x03E251 $E241: C-----  85 25    STA  $25
  0x03E253 $E243: C-----  20 2D CE JSR  $CE2D
  0x03E256 $E246: C-----  68       PLA  
  0x03E257 $E247: C-----  20 24 80 JSR  $8024
  0x03E25A $E24A: C-----  20 67 E2 JSR  $E267
  0x03E25D $E24D: C-----  A9 80    LDA  #$80
  0x03E25F $E24F: C-----  8D 15 06 STA  $0615
  0x03E262 $E252: C-----  8D 2D 06 STA  $062D
  0x03E265 $E255: C-----  A9 00    LDA  #$00
  0x03E267 $E257: C-----  8D 42 06 STA  $0642
  0x03E26A $E25A: C-----  8D 43 06 STA  $0643
  0x03E26D $E25D: C-----  A9 02    LDA  #$02
  0x03E26F $E25F: C-----  85 8E    STA  $8E
  0x03E271 $E261: C-----  A9 01    LDA  #$01
  0x03E273 $E263: C-----  8D 69 04 STA  $0469
  0x03E276 $E266: C-----  60       RTS  
  0x03E277 $E267: C-----  AD FB 05 LDA  $05FB
  0x03E27A $E26A: C-----  F0 0B    BEQ  $E277
  0x03E27C $E26C: C-----  A9 31    LDA  #$31
  0x03E27E $E26E: C-----  20 7F EF JSR  $EF7F
  0x03E281 $E271: C-----  A9 32    LDA  #$32
  0x03E283 $E273: C-----  20 7F EF JSR  $EF7F
  0x03E286 $E276: C-----  60       RTS  
  0x03E287 $E277: C-----  A9 30    LDA  #$30
  0x03E289 $E279: C-----  20 7F EF JSR  $EF7F
  0x03E28C $E27C: C-----  60       RTS  
  0x03E28D $E27D: C-----  20 77 CD JSR  $CD77
  0x03E290 $E280: C-----  A0 0A    LDY  #$0A
  0x03E292 $E282: C-----  B1 34    LDA  ($34),Y
  0x03E294 $E284: C-----  D0 1C    BNE  $E2A2
  0x03E296 $E286: C-----  AE 35 06 LDX  $0635
  0x03E299 $E289: C-----  AC 37 06 LDY  $0637
  0x03E29C $E28C: C-----  AD FB 05 LDA  $05FB
  0x03E29F $E28F: C-----  F0 05    BEQ  $E296
  0x03E2A1 $E291: C-----  8A       TXA  
  0x03E2A2 $E292: C-----  49 FF    EOR  #$FF
  0x03E2A4 $E294: C-----  AA       TAX  
  0x03E2A5 $E295: C-----  E8       INX  
  0x03E2A6 $E296: C-----  E0 C4    CPX  #$C4
  0x03E2A8 $E298: C-----  90 08    BCC  $E2A2
  0x03E2AA $E29A: C-----  C0 74    CPY  #$74
  0x03E2AC $E29C: C-----  90 04    BCC  $E2A2
  0x03E2AE $E29E: C-----  C0 8C    CPY  #$8C
  0x03E2B0 $E2A0: C-----  90 01    BCC  $E2A3
  0x03E2B2 $E2A2: C-----  60       RTS  
  0x03E2B3 $E2A3: C-----  A9 00    LDA  #$00
  0x03E2B5 $E2A5: C-----  8D 2D 06 STA  $062D
  0x03E2B8 $E2A8: C-----  8D 15 06 STA  $0615
  0x03E2BB $E2AB: C-----  A9 1A    LDA  #$1A
  0x03E2BD $E2AD: C-----  85 24    STA  $24
  0x03E2BF $E2AF: C-----  A9 1B    LDA  #$1B
  0x03E2C1 $E2B1: C-----  85 25    STA  $25
  0x03E2C3 $E2B3: C-----  20 2D CE JSR  $CE2D
  0x03E2C6 $E2B6: C-----  A2 50    LDX  #$50
  0x03E2C8 $E2B8: C-----  9A       TXS  
  0x03E2C9 $E2B9: C-----  4C 09 80 JMP  $8009
  0x03E2CC $E2BC: C-----  EE 18 06 INC  $0618
  0x03E2CF $E2BF: C-----  AD 18 06 LDA  $0618
  0x03E2D2 $E2C2: C-----  C9 01    CMP  #$01
  0x03E2D4 $E2C4: C-----  90 4F    BCC  $E315
  0x03E2D6 $E2C6: C-----  A9 00    LDA  #$00
  0x03E2D8 $E2C8: C-----  8D 18 06 STA  $0618
  0x03E2DB $E2CB: C-----  48       PHA  
  0x03E2DC $E2CC: C-----  CD 41 04 CMP  $0441
  0x03E2DF $E2CF: C-----  F0 3C    BEQ  $E30D
  0x03E2E1 $E2D1: C-----  A2 00    LDX  #$00
  0x03E2E3 $E2D3: C-----  20 08 CE JSR  $CE08
  0x03E2E6 $E2D6: C-----  A2 02    LDX  #$02
  0x03E2E8 $E2D8: C-----  A0 00    LDY  #$00
  0x03E2EA $E2DA: C-----  B1 34    LDA  ($34),Y
  0x03E2EC $E2DC: C-----  A0 01    LDY  #$01
  0x03E2EE $E2DE: C-----  C9 20    CMP  #$20
  0x03E2F0 $E2E0: C-----  D0 0A    BNE  $E2EC
  0x03E2F2 $E2E2: C-----  A2 01    LDX  #$01
  0x03E2F4 $E2E4: C-----  B1 34    LDA  ($34),Y
  0x03E2F6 $E2E6: C-----  C8       INY  
  0x03E2F7 $E2E7: C-----  11 34    ORA  ($34),Y
  0x03E2F9 $E2E9: C-----  F0 22    BEQ  $E30D
  0x03E2FB $E2EB: C-----  88       DEY  
  0x03E2FC $E2EC: C-----  8A       TXA  
  0x03E2FD $E2ED: C-----  18       CLC  
  0x03E2FE $E2EE: C-----  71 34    ADC  ($34),Y
  0x03E300 $E2F0: C-----  AA       TAX  
  0x03E301 $E2F1: C-----  C8       INY  
  0x03E302 $E2F2: C-----  B1 34    LDA  ($34),Y
  0x03E304 $E2F4: C-----  69 00    ADC  #$00
  0x03E306 $E2F6: C-----  A8       TAY  
  0x03E307 $E2F7: C-----  38       SEC  
  0x03E308 $E2F8: C-----  8A       TXA  
  0x03E309 $E2F9: C-----  E5 32    SBC  $32
  0x03E30B $E2FB: C-----  98       TYA  
  0x03E30C $E2FC: C-----  E5 33    SBC  $33
  0x03E30E $E2FE: C-----  90 04    BCC  $E304
  0x03E310 $E300: C-----  A6 32    LDX  $32
  0x03E312 $E302: C-----  A4 33    LDY  $33
  0x03E314 $E304: C-----  98       TYA  
  0x03E315 $E305: C-----  A0 02    LDY  #$02
  0x03E317 $E307: C-----  91 34    STA  ($34),Y
  0x03E319 $E309: C-----  8A       TXA  
  0x03E31A $E30A: C-----  88       DEY  
  0x03E31B $E30B: C-----  91 34    STA  ($34),Y
  0x03E31D $E30D: C-----  68       PLA  
  0x03E31E $E30E: C-----  18       CLC  
  0x03E31F $E30F: C-----  69 01    ADC  #$01
  0x03E321 $E311: C-----  C9 0B    CMP  #$0B
  0x03E323 $E313: C-----  D0 B6    BNE  $E2CB
  0x03E325 $E315: C-----  AD 41 04 LDA  $0441
  0x03E328 $E318: C-----  C9 0B    CMP  #$0B
  0x03E32A $E31A: C-----  B0 2C    BCS  $E348
  0x03E32C $E31C: C-----  20 7C CD JSR  $CD7C
  0x03E32F $E31F: C-----  A2 03    LDX  #$03
  0x03E331 $E321: C-----  A0 00    LDY  #$00
  0x03E333 $E323: C-----  B1 34    LDA  ($34),Y
  0x03E335 $E325: C-----  C9 20    CMP  #$20
  0x03E337 $E327: C-----  D0 02    BNE  $E32B
  0x03E339 $E329: C-----  A2 05    LDX  #$05
  0x03E33B $E32B: C-----  86 3A    STX  $3A
  0x03E33D $E32D: C-----  A0 01    LDY  #$01
  0x03E33F $E32F: C-----  B1 34    LDA  ($34),Y
  0x03E341 $E331: C-----  38       SEC  
  0x03E342 $E332: C-----  E5 3A    SBC  $3A
  0x03E344 $E334: C-----  AA       TAX  
  0x03E345 $E335: C-----  C8       INY  
  0x03E346 $E336: C-----  B1 34    LDA  ($34),Y
  0x03E348 $E338: C-----  E9 00    SBC  #$00
  0x03E34A $E33A: C-----  B0 03    BCS  $E33F
  0x03E34C $E33C: C-----  A2 00    LDX  #$00
  0x03E34E $E33E: C-----  8A       TXA  
  0x03E34F $E33F: C-----  91 34    STA  ($34),Y
  0x03E351 $E341: C-----  8A       TXA  
  0x03E352 $E342: C-----  88       DEY  
  0x03E353 $E343: C-----  91 34    STA  ($34),Y
  0x03E355 $E345: C-----  20 67 E2 JSR  $E267
  0x03E358 $E348: C-----  60       RTS  
  0x03E359 $E349: C-----  A9 00    LDA  #$00
  0x03E35B $E34B: C-----  8D 32 05 STA  $0532
  0x03E35E $E34E: C-----  AD FB 05 LDA  $05FB
  0x03E361 $E351: C-----  D0 50    BNE  $E3A3
  0x03E363 $E353: C-----  AD 15 06 LDA  $0615
  0x03E366 $E356: C-----  09 40    ORA  #$40
  0x03E368 $E358: C-----  8D 15 06 STA  $0615
  0x03E36B $E35B: C-----  AD 1C 00 LDA  $001C
  0x03E36E $E35E: C-----  29 40    AND  #$40
  0x03E370 $E360: C-----  D0 20    BNE  $E382
  0x03E372 $E362: C-----  AD 1C 00 LDA  $001C
  0x03E375 $E365: C-----  29 0F    AND  #$0F
  0x03E377 $E367: C-----  F0 60    BEQ  $E3C9
  0x03E379 $E369: C-----  EE 32 05 INC  $0532
  0x03E37C $E36C: C-----  A2 00    LDX  #$00
  0x03E37E $E36E: C-----  29 02    AND  #$02
  0x03E380 $E370: C-----  D0 02    BNE  $E374
  0x03E382 $E372: C-----  A2 40    LDX  #$40
  0x03E384 $E374: C-----  8E 17 05 STX  $0517
  0x03E387 $E377: C-----  AD 15 06 LDA  $0615
  0x03E38A $E37A: C-----  29 BF    AND  #$BF
  0x03E38C $E37C: C-----  8D 15 06 STA  $0615
  0x03E38F $E37F: C-----  4C C9 E3 JMP  $E3C9
  0x03E392 $E382: C-----  A9 00    LDA  #$00
  0x03E394 $E384: C-----  8D 00 06 STA  $0600
  0x03E397 $E387: C-----  8D 15 06 STA  $0615
  0x03E39A $E38A: C-----  A9 44    LDA  #$44
  0x03E39C $E38C: C-----  20 B0 CB JSR  $CBB0
  0x03E39F $E38F: C-----  20 8B CB JSR  $CB8B
  0x03E3A2 $E392: C-----  A9 1A    LDA  #$1A
  0x03E3A4 $E394: C-----  85 24    STA  $24
  0x03E3A6 $E396: C-----  A9 1B    LDA  #$1B
  0x03E3A8 $E398: C-----  85 25    STA  $25
  0x03E3AA $E39A: C-----  20 2D CE JSR  $CE2D
  0x03E3AD $E39D: C-----  A2 50    LDX  #$50
  0x03E3AF $E39F: C-----  9A       TXS  
  0x03E3B0 $E3A0: C-----  4C 03 80 JMP  $8003
  0x03E3B3 $E3A3: C-----  EE 32 05 INC  $0532
  0x03E3B6 $E3A6: C-----  A9 C0    LDA  #$C0
  0x03E3B8 $E3A8: C-----  2D 1E 00 AND  $001E
  0x03E3BB $E3AB: C-----  F0 1C    BEQ  $E3C9
  0x03E3BD $E3AD: C-----  A2 01    LDX  #$01
  0x03E3BF $E3AF: C-----  A8       TAY  
  0x03E3C0 $E3B0: C-----  30 02    BMI  $E3B4
  0x03E3C2 $E3B2: C-----  A2 FF    LDX  #$FF
  0x03E3C4 $E3B4: C-----  8A       TXA  
  0x03E3C5 $E3B5: C-----  18       CLC  
  0x03E3C6 $E3B6: C-----  6D FD 05 ADC  $05FD
  0x03E3C9 $E3B9: C-----  D0 02    BNE  $E3BD
  0x03E3CB $E3BB: C-----  A9 0A    LDA  #$0A
  0x03E3CD $E3BD: C-----  C9 0B    CMP  #$0B
  0x03E3CF $E3BF: C-----  90 02    BCC  $E3C3
  0x03E3D1 $E3C1: C-----  A9 01    LDA  #$01
  0x03E3D3 $E3C3: C-----  8D FD 05 STA  $05FD
  0x03E3D6 $E3C6: C-----  20 67 E2 JSR  $E267
  0x03E3D9 $E3C9: C-----  60       RTS  
  0x03E3DA $E3CA: C-----  AD FB 05 LDA  $05FB
  0x03E3DD $E3CD: C-----  D0 07    BNE  $E3D6
  0x03E3DF $E3CF: C-----  AD 1C 00 LDA  $001C
  0x03E3E2 $E3D2: C-----  29 0F    AND  #$0F
  0x03E3E4 $E3D4: C-----  F0 30    BEQ  $E406
  0x03E3E6 $E3D6: C-----  AD 41 04 LDA  $0441
  0x03E3E9 $E3D9: C-----  A2 20    LDX  #$20
  0x03E3EB $E3DB: C-----  20 08 CE JSR  $CE08
  0x03E3EE $E3DE: C-----  46 33    LSR  $33
  0x03E3F0 $E3E0: C-----  66 32    ROR  $32
  0x03E3F2 $E3E2: C-----  46 33    LSR  $33
  0x03E3F4 $E3E4: C-----  66 32    ROR  $32
  0x03E3F6 $E3E6: C-----  A6 32    LDX  $32
  0x03E3F8 $E3E8: C-----  A4 33    LDY  $33
  0x03E3FA $E3EA: C-----  2C 17 05 BIT  $0517
  0x03E3FD $E3ED: C-----  70 08    BVS  $E3F7
  0x03E3FF $E3EF: C-----  8A       TXA  
  0x03E400 $E3F0: C-----  49 FF    EOR  #$FF
  0x03E402 $E3F2: C-----  AA       TAX  
  0x03E403 $E3F3: C-----  98       TYA  
  0x03E404 $E3F4: C-----  49 FF    EOR  #$FF
  0x03E406 $E3F6: C-----  A8       TAY  
  0x03E407 $E3F7: C-----  8A       TXA  
  0x03E408 $E3F8: C-----  18       CLC  
  0x03E409 $E3F9: C-----  6D 42 06 ADC  $0642
  0x03E40C $E3FC: C-----  8D 42 06 STA  $0642
  0x03E40F $E3FF: C-----  98       TYA  
  0x03E410 $E400: C-----  6D 43 06 ADC  $0643
  0x03E413 $E403: C-----  8D 43 06 STA  $0643
  0x03E416 $E406: C-----  60       RTS  
  0x03E417 $E407: C-----  20 09 E7 JSR  $E709
  0x03E41A $E40A: C-----  A9 00    LDA  #$00
  0x03E41C $E40C: C-----  48       PHA  
  0x03E41D $E40D: C-----  A9 01    LDA  #$01
  0x03E41F $E40F: C-----  20 0F CB JSR  $CB0F
  0x03E422 $E412: C-----  20 49 E3 JSR  $E349
  0x03E425 $E415: C-----  68       PLA  
  0x03E426 $E416: C-----  48       PHA  
  0x03E427 $E417: C-----  F0 76    BEQ  $E48F
  0x03E429 $E419: C-----  C9 0B    CMP  #$0B
  0x03E42B $E41B: C-----  F0 72    BEQ  $E48F
  0x03E42D $E41D: C-----  AE FB 05 LDX  $05FB
  0x03E430 $E420: C-----  F0 05    BEQ  $E427
  0x03E432 $E422: C-----  CD FD 05 CMP  $05FD
  0x03E435 $E425: C-----  F0 68    BEQ  $E48F
  0x03E437 $E427: C-----  CD 41 04 CMP  $0441
  0x03E43A $E42A: C-----  D0 04    BNE  $E430
  0x03E43C $E42C: C-----  C9 0B    CMP  #$0B
  0x03E43E $E42E: C-----  90 5F    BCC  $E48F
  0x03E440 $E430: C-----  2C 2A 06 BIT  $062A
  0x03E443 $E433: C-----  10 19    BPL  $E44E
  0x03E445 $E435: C-----  CD 41 04 CMP  $0441
  0x03E448 $E438: C-----  F0 14    BEQ  $E44E
  0x03E44A $E43A: C-----  48       PHA  
  0x03E44B $E43B: C-----  48       PHA  
  0x03E44C $E43C: C-----  A5 22    LDA  $22
  0x03E44E $E43E: C-----  A9 1A    LDA  #$1A
  0x03E450 $E440: C-----  85 24    STA  $24
  0x03E452 $E442: C-----  A9 1B    LDA  #$1B
  0x03E454 $E444: C-----  85 25    STA  $25
  0x03E456 $E446: C-----  20 2D CE JSR  $CE2D
  0x03E459 $E449: C-----  68       PLA  
  0x03E45A $E44A: C-----  20 00 80 JSR  $8000
  0x03E45D $E44D: C-----  68       PLA  
  0x03E45E $E44E: C-----  85 41    STA  $41
  0x03E460 $E450: C-----  20 7C CD JSR  $CD7C
  0x03E463 $E453: C-----  A5 41    LDA  $41
  0x03E465 $E455: C-----  C9 0B    CMP  #$0B
  0x03E467 $E457: C-----  AE FB 05 LDX  $05FB
  0x03E46A $E45A: C-----  F0 06    BEQ  $E462
  0x03E46C $E45C: C-----  08       PHP  
  0x03E46D $E45D: C-----  68       PLA  
  0x03E46E $E45E: C-----  49 01    EOR  #$01
  0x03E470 $E460: C-----  48       PHA  
  0x03E471 $E461: C-----  28       PLP  
  0x03E472 $E462: C-----  A2 21    LDX  #$21
  0x03E474 $E464: C-----  90 0C    BCC  $E472
  0x03E476 $E466: C-----  A2 22    LDX  #$22
  0x03E478 $E468: C-----  A0 09    LDY  #$09
  0x03E47A $E46A: C-----  B1 34    LDA  ($34),Y
  0x03E47C $E46C: C-----  C9 F0    CMP  #$F0
  0x03E47E $E46E: C-----  D0 02    BNE  $E472
  0x03E480 $E470: C-----  A2 1F    LDX  #$1F
  0x03E482 $E472: C-----  A5 41    LDA  $41
  0x03E484 $E474: C-----  CD 41 04 CMP  $0441
  0x03E487 $E477: C-----  D0 02    BNE  $E47B
  0x03E489 $E479: C-----  A2 20    LDX  #$20
  0x03E48B $E47B: C-----  20 08 CE JSR  $CE08
  0x03E48E $E47E: C-----  A0 0A    LDY  #$0A
  0x03E490 $E480: C-----  B1 34    LDA  ($34),Y
  0x03E492 $E482: C-----  F0 08    BEQ  $E48C
  0x03E494 $E484: C-----  38       SEC  
  0x03E495 $E485: C-----  E9 01    SBC  #$01
  0x03E497 $E487: C-----  91 34    STA  ($34),Y
  0x03E499 $E489: C-----  4C 8F E4 JMP  $E48F
  0x03E49C $E48C: C-----  20 54 E8 JSR  $E854
  0x03E49F $E48F: C-----  68       PLA  
  0x03E4A0 $E490: C-----  18       CLC  
  0x03E4A1 $E491: C-----  69 01    ADC  #$01
  0x03E4A3 $E493: C-----  C9 16    CMP  #$16
  0x03E4A5 $E495: C-----  F0 03    BEQ  $E49A
  0x03E4A7 $E497: C-----  4C 0C E4 JMP  $E40C
  0x03E4AA $E49A: C-----  A9 00    LDA  #$00
  0x03E4AC $E49C: C-----  8D 00 06 STA  $0600
  0x03E4AF $E49F: C-----  AD 13 06 LDA  $0613
  0x03E4B2 $E4A2: C-----  C9 05    CMP  #$05
  0x03E4B4 $E4A4: C-----  90 0A    BCC  $E4B0
  0x03E4B6 $E4A6: C-----  A9 00    LDA  #$00
  0x03E4B8 $E4A8: C-----  8D 13 06 STA  $0613
  0x03E4BB $E4AB: C-----  A9 07    LDA  #$07
  0x03E4BD $E4AD: C-----  20 D7 E4 JSR  $E4D7
  0x03E4C0 $E4B0: C-----  AD 00 06 LDA  $0600
  0x03E4C3 $E4B3: C-----  D0 01    BNE  $E4B6
  0x03E4C5 $E4B5: C-----  60       RTS  
  0x03E4C6 $E4B6: C-----  A9 00    LDA  #$00
  0x03E4C8 $E4B8: C-----  8D 2D 06 STA  $062D
  0x03E4CB $E4BB: C-----  8D 15 06 STA  $0615
  0x03E4CE $E4BE: C-----  20 8B CB JSR  $CB8B
  0x03E4D1 $E4C1: C-----  A9 2E    LDA  #$2E
  0x03E4D3 $E4C3: C-----  20 B0 CB JSR  $CBB0
  0x03E4D6 $E4C6: C-----  A9 1A    LDA  #$1A
  0x03E4D8 $E4C8: C-----  85 24    STA  $24
  0x03E4DA $E4CA: C-----  A9 1B    LDA  #$1B
  0x03E4DC $E4CC: C-----  85 25    STA  $25
  0x03E4DE $E4CE: C-----  20 2D CE JSR  $CE2D
  0x03E4E1 $E4D1: C-----  A2 50    LDX  #$50
  0x03E4E3 $E4D3: C-----  9A       TXS  
  0x03E4E4 $E4D4: C-----  4C 03 80 JMP  $8003
  0x03E4E7 $E4D7: C-----  85 43    STA  $43
  0x03E4E9 $E4D9: C-----  A9 00    LDA  #$00
  0x03E4EB $E4DB: C-----  8D 00 06 STA  $0600
  0x03E4EE $E4DE: C-----  AD FB 05 LDA  $05FB
  0x03E4F1 $E4E1: C-----  49 0B    EOR  #$0B
  0x03E4F3 $E4E3: C-----  18       CLC  
  0x03E4F4 $E4E4: C-----  69 01    ADC  #$01
  0x03E4F6 $E4E6: C-----  85 41    STA  $41
  0x03E4F8 $E4E8: C-----  A9 0A    LDA  #$0A
  0x03E4FA $E4EA: C-----  85 42    STA  $42
  0x03E4FC $E4EC: C-----  A5 41    LDA  $41
  0x03E4FE $E4EE: C-----  20 7C CD JSR  $CD7C
  0x03E501 $E4F1: C-----  A0 0A    LDY  #$0A
  0x03E503 $E4F3: C-----  B1 34    LDA  ($34),Y
  0x03E505 $E4F5: C-----  D0 03    BNE  $E4FA
  0x03E507 $E4F7: C-----  20 01 E5 JSR  $E501
  0x03E50A $E4FA: C-----  E6 41    INC  $41
  0x03E50C $E4FC: C-----  C6 42    DEC  $42
  0x03E50E $E4FE: C-----  D0 EC    BNE  $E4EC
  0x03E510 $E500: C-----  60       RTS  
  0x03E511 $E501: C-----  A9 00    LDA  #$00
  0x03E513 $E503: C-----  85 44    STA  $44
  0x03E515 $E505: C-----  A0 06    LDY  #$06
  0x03E517 $E507: C-----  B1 34    LDA  ($34),Y
  0x03E519 $E509: C-----  38       SEC  
  0x03E51A $E50A: C-----  ED 35 06 SBC  $0635
  0x03E51D $E50D: C-----  B0 04    BCS  $E513
  0x03E51F $E50F: C-----  49 FF    EOR  #$FF
  0x03E521 $E511: C-----  69 01    ADC  #$01
  0x03E523 $E513: C-----  C5 43    CMP  $43
  0x03E525 $E515: C-----  B0 02    BCS  $E519
  0x03E527 $E517: C-----  E6 44    INC  $44
  0x03E529 $E519: C-----  A0 08    LDY  #$08
  0x03E52B $E51B: C-----  B1 34    LDA  ($34),Y
  0x03E52D $E51D: C-----  38       SEC  
  0x03E52E $E51E: C-----  ED 37 06 SBC  $0637
  0x03E531 $E521: C-----  B0 04    BCS  $E527
  0x03E533 $E523: C-----  49 FF    EOR  #$FF
  0x03E535 $E525: C-----  69 01    ADC  #$01
  0x03E537 $E527: C-----  C5 43    CMP  $43
  0x03E539 $E529: C-----  B0 02    BCS  $E52D
  0x03E53B $E52B: C-----  E6 44    INC  $44
  0x03E53D $E52D: C-----  A5 44    LDA  $44
  0x03E53F $E52F: C-----  C9 02    CMP  #$02
  0x03E541 $E531: C-----  D0 18    BNE  $E54B
  0x03E543 $E533: C-----  AE 00 06 LDX  $0600
  0x03E546 $E536: C-----  E0 05    CPX  #$05
  0x03E548 $E538: C-----  B0 11    BCS  $E54B
  0x03E54A $E53A: C-----  AD FB 05 LDA  $05FB
  0x03E54D $E53D: C-----  F0 04    BEQ  $E543
  0x03E54F $E53F: C-----  E0 04    CPX  #$04
  0x03E551 $E541: C-----  B0 08    BCS  $E54B
  0x03E553 $E543: C-----  A5 41    LDA  $41
  0x03E555 $E545: C-----  9D 01 06 STA  $0601,X
  0x03E558 $E548: C-----  EE 00 06 INC  $0600
  0x03E55B $E54B: C-----  60       RTS  
  0x03E55C $E54C: C-----  A9 00    LDA  #$00
  0x03E55E $E54E: C-----  8D 4E 04 STA  $044E
  0x03E561 $E551: C-----  AD 00 06 LDA  $0600
  0x03E564 $E554: C-----  F0 3A    BEQ  $E590
  0x03E566 $E556: C-----  A2 00    LDX  #$00
  0x03E568 $E558: C-----  A0 00    LDY  #$00
  0x03E56A $E55A: C-----  BD 0B 06 LDA  $060B,X
  0x03E56D $E55D: C-----  C9 05    CMP  #$05
  0x03E56F $E55F: C-----  D0 0D    BNE  $E56E
  0x03E571 $E561: C-----  BD 01 06 LDA  $0601,X
  0x03E574 $E564: C-----  F0 08    BEQ  $E56E
  0x03E576 $E566: C-----  C9 0B    CMP  #$0B
  0x03E578 $E568: C-----  F0 04    BEQ  $E56E
  0x03E57A $E56A: C-----  99 01 06 STA  $0601,Y
  0x03E57D $E56D: C-----  C8       INY  
  0x03E57E $E56E: C-----  E8       INX  
  0x03E57F $E56F: C-----  EC 00 06 CPX  $0600
  0x03E582 $E572: C-----  D0 E6    BNE  $E55A
  0x03E584 $E574: C-----  98       TYA  
  0x03E585 $E575: C-----  F0 19    BEQ  $E590
  0x03E587 $E577: C-----  8C 00 06 STY  $0600
  0x03E58A $E57A: C-----  A9 2E    LDA  #$2E
  0x03E58C $E57C: C-----  20 B0 CB JSR  $CBB0
  0x03E58F $E57F: C-----  A9 1A    LDA  #$1A
  0x03E591 $E581: C-----  85 24    STA  $24
  0x03E593 $E583: C-----  A9 1B    LDA  #$1B
  0x03E595 $E585: C-----  85 25    STA  $25
  0x03E597 $E587: C-----  20 2D CE JSR  $CE2D
  0x03E59A $E58A: C-----  A2 50    LDX  #$50
  0x03E59C $E58C: C-----  9A       TXS  
  0x03E59D $E58D: C-----  4C 03 80 JMP  $8003
  0x03E5A0 $E590: C-----  A2 50    LDX  #$50
  0x03E5A2 $E592: C-----  9A       TXS  
  0x03E5A3 $E593: C-----  4C DF E0 JMP  $E0DF
  0x03E5A6 $E596: C-----  AD E2 00 LDA  $00E2
  0x03E5A9 $E599: C-----  C9 E0    CMP  #$E0
  0x03E5AB $E59B: C-----  B0 1D    BCS  $E5BA
  0x03E5AD $E59D: C-----  20 77 CD JSR  $CD77
  0x03E5B0 $E5A0: C-----  A0 07    LDY  #$07
  0x03E5B2 $E5A2: C-----  B1 34    LDA  ($34),Y
  0x03E5B4 $E5A4: C-----  18       CLC  
  0x03E5B5 $E5A5: C-----  69 1A    ADC  #$1A
  0x03E5B7 $E5A7: C-----  C9 80    CMP  #$80
  0x03E5B9 $E5A9: C-----  90 02    BCC  $E5AD
  0x03E5BB $E5AB: C-----  A9 7F    LDA  #$7F
  0x03E5BD $E5AD: C-----  91 34    STA  ($34),Y
  0x03E5BF $E5AF: C-----  A0 06    LDY  #$06
  0x03E5C1 $E5B1: C-----  A9 04    LDA  #$04
  0x03E5C3 $E5B3: C-----  91 34    STA  ($34),Y
  0x03E5C5 $E5B5: C-----  A9 42    LDA  #$42
  0x03E5C7 $E5B7: C-----  20 B0 CB JSR  $CBB0
  0x03E5CA $E5BA: C-----  48       PHA  
  0x03E5CB $E5BB: C-----  A5 22    LDA  $22
  0x03E5CD $E5BD: C-----  A9 14    LDA  #$14
  0x03E5CF $E5BF: C-----  85 24    STA  $24
  0x03E5D1 $E5C1: C-----  A9 15    LDA  #$15
  0x03E5D3 $E5C3: C-----  85 25    STA  $25
  0x03E5D5 $E5C5: C-----  20 2D CE JSR  $CE2D
  0x03E5D8 $E5C8: C-----  68       PLA  
  0x03E5D9 $E5C9: C-----  20 0C 80 JSR  $800C
  0x03E5DC $E5CC: C-----  A9 01    LDA  #$01
  0x03E5DE $E5CE: C-----  48       PHA  
  0x03E5DF $E5CF: C-----  A5 22    LDA  $22
  0x03E5E1 $E5D1: C-----  A9 1A    LDA  #$1A
  0x03E5E3 $E5D3: C-----  85 24    STA  $24
  0x03E5E5 $E5D5: C-----  A9 1B    LDA  #$1B
  0x03E5E7 $E5D7: C-----  85 25    STA  $25
  0x03E5E9 $E5D9: C-----  20 2D CE JSR  $CE2D
  0x03E5EC $E5DC: C-----  68       PLA  
  0x03E5ED $E5DD: C-----  20 24 80 JSR  $8024
  0x03E5F0 $E5E0: C-----  AE 35 06 LDX  $0635
  0x03E5F3 $E5E3: C-----  AC 37 06 LDY  $0637
  0x03E5F6 $E5E6: C-----  20 E2 CD JSR  $CDE2
  0x03E5F9 $E5E9: C-----  8D FE 05 STA  $05FE
  0x03E5FC $E5EC: C-----  AD 00 06 LDA  $0600
  0x03E5FF $E5EF: C-----  F0 1D    BEQ  $E60E
  0x03E601 $E5F1: C-----  A9 00    LDA  #$00
  0x03E603 $E5F3: C-----  8D 16 06 STA  $0616
  0x03E606 $E5F6: C-----  AE 16 06 LDX  $0616
  0x03E609 $E5F9: C-----  BD 0B 06 LDA  $060B,X
  0x03E60C $E5FC: C-----  C9 05    CMP  #$05
  0x03E60E $E5FE: C-----  D0 03    BNE  $E603
  0x03E610 $E600: C-----  20 16 E6 JSR  $E616
  0x03E613 $E603: C-----  EE 16 06 INC  $0616
  0x03E616 $E606: C-----  AD 16 06 LDA  $0616
  0x03E619 $E609: C-----  CD 00 06 CMP  $0600
  0x03E61C $E60C: C-----  D0 E8    BNE  $E5F6
  0x03E61E $E60E: C-----  A9 04    LDA  #$04
  0x03E620 $E610: C-----  8D 2B 06 STA  $062B
  0x03E623 $E613: C-----  4C 96 DE JMP  $DE96
  0x03E626 $E616: C-----  A9 01    LDA  #$01
  0x03E628 $E618: C-----  8D 3B 04 STA  $043B
  0x03E62B $E61B: C-----  A9 00    LDA  #$00
  0x03E62D $E61D: C-----  8D 3C 04 STA  $043C
  0x03E630 $E620: C-----  A9 02    LDA  #$02
  0x03E632 $E622: C-----  8D 3D 04 STA  $043D
  0x03E635 $E625: C-----  A9 00    LDA  #$00
  0x03E637 $E627: C-----  8D 3E 04 STA  $043E
  0x03E63A $E62A: C-----  BD 01 06 LDA  $0601,X
  0x03E63D $E62D: C-----  F0 48    BEQ  $E677
  0x03E63F $E62F: C-----  C9 0B    CMP  #$0B
  0x03E641 $E631: C-----  F0 44    BEQ  $E677
  0x03E643 $E633: C-----  8D 42 04 STA  $0442
  0x03E646 $E636: C-----  48       PHA  
  0x03E647 $E637: C-----  A5 22    LDA  $22
  0x03E649 $E639: C-----  A9 1C    LDA  #$1C
  0x03E64B $E63B: C-----  85 24    STA  $24
  0x03E64D $E63D: C-----  A9 1D    LDA  #$1D
  0x03E64F $E63F: C-----  85 25    STA  $25
  0x03E651 $E641: C-----  20 2D CE JSR  $CE2D
  0x03E654 $E644: C-----  68       PLA  
  0x03E655 $E645: C-----  20 15 80 JSR  $8015
  0x03E658 $E648: C-----  A5 32    LDA  $32
  0x03E65A $E64A: C-----  18       CLC  
  0x03E65B $E64B: C-----  69 04    ADC  #$04
  0x03E65D $E64D: C-----  90 02    BCC  $E651
  0x03E65F $E64F: ------  .byte $A9
  0x03E660 $E650: ------  .byte $FF
  0x03E661 $E651: C-----  85 32    STA  $32
  0x03E663 $E653: C-----  48       PHA  
  0x03E664 $E654: C-----  A5 22    LDA  $22
  0x03E666 $E656: C-----  A9 1A    LDA  #$1A
  0x03E668 $E658: C-----  85 24    STA  $24
  0x03E66A $E65A: C-----  A9 1B    LDA  #$1B
  0x03E66C $E65C: C-----  85 25    STA  $25
  0x03E66E $E65E: C-----  20 2D CE JSR  $CE2D
  0x03E671 $E661: C-----  68       PLA  
  0x03E672 $E662: C-----  20 12 80 JSR  $8012
  0x03E675 $E665: C-----  48       PHA  
  0x03E676 $E666: C-----  A5 22    LDA  $22
  0x03E678 $E668: C-----  A9 1A    LDA  #$1A
  0x03E67A $E66A: C-----  85 24    STA  $24
  0x03E67C $E66C: C-----  A9 1B    LDA  #$1B
  0x03E67E $E66E: C-----  85 25    STA  $25
  0x03E680 $E670: C-----  20 2D CE JSR  $CE2D
  0x03E683 $E673: C-----  68       PLA  
  0x03E684 $E674: C-----  20 15 80 JSR  $8015
  0x03E687 $E677: C-----  60       RTS  
  0x03E688 $E678: C-----  AD FB 05 LDA  $05FB
  0x03E68B $E67B: C-----  49 0B    EOR  #$0B
  0x03E68D $E67D: C-----  8D FB 05 STA  $05FB
  0x03E690 $E680: C-----  20 93 D0 JSR  $D093
  0x03E693 $E683: C-----  A9 02    LDA  #$02
  0x03E695 $E685: C-----  20 0F CB JSR  $CB0F
  0x03E698 $E688: C-----  A9 00    LDA  #$00
  0x03E69A $E68A: C-----  2C 35 06 BIT  $0635
  0x03E69D $E68D: C-----  10 02    BPL  $E691
  0x03E69F $E68F: C-----  09 01    ORA  #$01
  0x03E6A1 $E691: C-----  2C 37 06 BIT  $0637
  0x03E6A4 $E694: C-----  10 02    BPL  $E698
  0x03E6A6 $E696: C-----  09 02    ORA  #$02
  0x03E6A8 $E698: C-----  85 3A    STA  $3A
  0x03E6AA $E69A: C-----  AD E2 00 LDA  $00E2
  0x03E6AD $E69D: C-----  29 07    AND  #$07
  0x03E6AF $E69F: C-----  0A       ASL  A
  0x03E6B0 $E6A0: C-----  AA       TAX  
  0x03E6B1 $E6A1: C-----  BC D0 E6 LDY  $E6D0,X
  0x03E6B4 $E6A4: C-----  BD CF E6 LDA  $E6CF,X
  0x03E6B7 $E6A7: C-----  AA       TAX  
  0x03E6B8 $E6A8: C-----  46 3A    LSR  $3A
  0x03E6BA $E6AA: C-----  90 04    BCC  $E6B0
  0x03E6BC $E6AC: C-----  8A       TXA  
  0x03E6BD $E6AD: C-----  49 FF    EOR  #$FF
  0x03E6BF $E6AF: C-----  AA       TAX  
  0x03E6C0 $E6B0: C-----  46 3A    LSR  $3A
  0x03E6C2 $E6B2: C-----  90 04    BCC  $E6B8
  0x03E6C4 $E6B4: C-----  98       TYA  
  0x03E6C5 $E6B5: C-----  49 FF    EOR  #$FF
  0x03E6C7 $E6B7: C-----  A8       TAY  
  0x03E6C8 $E6B8: C-----  8E 35 06 STX  $0635
  0x03E6CB $E6BB: C-----  8C 37 06 STY  $0637
  0x03E6CE $E6BE: C-----  20 E2 CD JSR  $CDE2
  0x03E6D1 $E6C1: C-----  8D 38 06 STA  $0638
  0x03E6D4 $E6C4: C-----  8D FE 05 STA  $05FE
  0x03E6D7 $E6C7: C-----  A9 04    LDA  #$04
  0x03E6D9 $E6C9: C-----  8D 2B 06 STA  $062B
  0x03E6DC $E6CC: C-----  4C 96 DE JMP  $DE96
  0x03E6DF $E6CF: -D3---  .byte $4C
  0x03E6E0 $E6D0: -D3---  .byte $54
  0x03E6E1 $E6D1: -D3---  .byte $5C
  0x03E6E2 $E6D2: -D3---  .byte $54
  0x03E6E3 $E6D3: -D3---  .byte $6C
  0x03E6E4 $E6D4: -D3---  .byte $5C
  0x03E6E5 $E6D5: -D3---  .byte $5C
  0x03E6E6 $E6D6: -D3---  .byte $64
  0x03E6E7 $E6D7: -D3---  .byte $74
  0x03E6E8 $E6D8: -D3---  .byte $6C
  0x03E6E9 $E6D9: -D3---  .byte $64
  0x03E6EA $E6DA: -D3---  .byte $74
  0x03E6EB $E6DB: -D3---  .byte $7C
  0x03E6EC $E6DC: -D3---  .byte $7C
  0x03E6ED $E6DD: -D3---  .byte $74
  0x03E6EE $E6DE: -D3---  .byte $8C
  0x03E6EF $E6DF: ------  .byte $AE
  0x03E6F0 $E6E0: ------  .byte $35
  0x03E6F1 $E6E1: ------  .byte $06
  0x03E6F2 $E6E2: ------  .byte $AC
  0x03E6F3 $E6E3: ------  .byte $37
  0x03E6F4 $E6E4: ------  .byte $06
  0x03E6F5 $E6E5: ------  .byte $20
  0x03E6F6 $E6E6: ------  .byte $E2
  0x03E6F7 $E6E7: ------  .byte $CD
  0x03E6F8 $E6E8: ------  .byte $8D
  0x03E6F9 $E6E9: ------  .byte $FE
  0x03E6FA $E6EA: ------  .byte $05
  0x03E6FB $E6EB: ------  .byte $60
  0x03E6FC $E6EC: C-----  AD 41 04 LDA  $0441
  0x03E6FF $E6EF: C-----  20 7C CD JSR  $CD7C
  0x03E702 $E6F2: C-----  A0 06    LDY  #$06
  0x03E704 $E6F4: C-----  B1 34    LDA  ($34),Y
  0x03E706 $E6F6: C-----  8D 35 06 STA  $0635
  0x03E709 $E6F9: C-----  AA       TAX  
  0x03E70A $E6FA: C-----  A0 08    LDY  #$08
  0x03E70C $E6FC: C-----  B1 34    LDA  ($34),Y
  0x03E70E $E6FE: C-----  8D 37 06 STA  $0637
  0x03E711 $E701: C-----  A8       TAY  
  0x03E712 $E702: C-----  20 E2 CD JSR  $CDE2
  0x03E715 $E705: C-----  8D FE 05 STA  $05FE
  0x03E718 $E708: C-----  60       RTS  
  0x03E719 $E709: C-----  AD 2A 06 LDA  $062A
  0x03E71C $E70C: C-----  29 7F    AND  #$7F
  0x03E71E $E70E: C-----  8D 2A 06 STA  $062A
  0x03E721 $E711: C-----  AD 37 06 LDA  $0637
  0x03E724 $E714: C-----  38       SEC  
  0x03E725 $E715: C-----  E9 50    SBC  #$50
  0x03E727 $E717: C-----  29 E0    AND  #$E0
  0x03E729 $E719: C-----  4A       LSR  A
  0x03E72A $E71A: C-----  4A       LSR  A
  0x03E72B $E71B: C-----  4A       LSR  A
  0x03E72C $E71C: C-----  85 3A    STA  $3A
  0x03E72E $E71E: C-----  4A       LSR  A
  0x03E72F $E71F: C-----  4A       LSR  A
  0x03E730 $E720: C-----  65 3A    ADC  $3A
  0x03E732 $E722: C-----  85 3A    STA  $3A
  0x03E734 $E724: C-----  AD 35 06 LDA  $0635
  0x03E737 $E727: C-----  38       SEC  
  0x03E738 $E728: C-----  E9 30    SBC  #$30
  0x03E73A $E72A: C-----  29 E0    AND  #$E0
  0x03E73C $E72C: C-----  4A       LSR  A
  0x03E73D $E72D: C-----  4A       LSR  A
  0x03E73E $E72E: C-----  4A       LSR  A
  0x03E73F $E72F: C-----  4A       LSR  A
  0x03E740 $E730: C-----  4A       LSR  A
  0x03E741 $E731: C-----  65 3A    ADC  $3A
  0x03E743 $E733: C-----  CD 2A 06 CMP  $062A
  0x03E746 $E736: C-----  F0 05    BEQ  $E73D
  0x03E748 $E738: C-----  09 80    ORA  #$80
  0x03E74A $E73A: C-----  8D 2A 06 STA  $062A
  0x03E74D $E73D: C-----  60       RTS  
  0x03E74E $E73E: C-----  A9 00    LDA  #$00
  0x03E750 $E740: C-----  8D 00 06 STA  $0600
  0x03E753 $E743: C-----  8D FF 05 STA  $05FF
  0x03E756 $E746: C-----  AD FE 05 LDA  $05FE
  0x03E759 $E749: C-----  CD 38 06 CMP  $0638
  0x03E75C $E74C: C-----  D0 03    BNE  $E751
  0x03E75E $E74E: C-----  4C CF E7 JMP  $E7CF
  0x03E761 $E751: C-----  A9 2F    LDA  #$2F
  0x03E763 $E753: C-----  85 34    STA  $34
  0x03E765 $E755: C-----  A9 06    LDA  #$06
  0x03E767 $E757: C-----  85 35    STA  $35
  0x03E769 $E759: C-----  20 D0 E7 JSR  $E7D0
  0x03E76C $E75C: C-----  8D 2C 06 STA  $062C
  0x03E76F $E75F: C-----  48       PHA  
  0x03E770 $E760: C-----  20 4A CE JSR  $CE4A
  0x03E773 $E763: C-----  8E 39 06 STX  $0639
  0x03E776 $E766: C-----  8C 3A 06 STY  $063A
  0x03E779 $E769: C-----  68       PLA  
  0x03E77A $E76A: C-----  20 4D CE JSR  $CE4D
  0x03E77D $E76D: C-----  8E 3B 06 STX  $063B
  0x03E780 $E770: C-----  8C 3C 06 STY  $063C
  0x03E783 $E773: C-----  A9 01    LDA  #$01
  0x03E785 $E775: C-----  20 0F CB JSR  $CB0F
  0x03E788 $E778: C-----  AD 39 06 LDA  $0639
  0x03E78B $E77B: C-----  18       CLC  
  0x03E78C $E77C: C-----  6D 34 06 ADC  $0634
  0x03E78F $E77F: C-----  8D 34 06 STA  $0634
  0x03E792 $E782: C-----  AD 3A 06 LDA  $063A
  0x03E795 $E785: C-----  6D 35 06 ADC  $0635
  0x03E798 $E788: C-----  8D 35 06 STA  $0635
  0x03E79B $E78B: C-----  AA       TAX  
  0x03E79C $E78C: C-----  AD 3B 06 LDA  $063B
  0x03E79F $E78F: C-----  18       CLC  
  0x03E7A0 $E790: C-----  6D 36 06 ADC  $0636
  0x03E7A3 $E793: C-----  8D 36 06 STA  $0636
  0x03E7A6 $E796: C-----  AD 3C 06 LDA  $063C
  0x03E7A9 $E799: C-----  6D 37 06 ADC  $0637
  0x03E7AC $E79C: C-----  8D 37 06 STA  $0637
  0x03E7AF $E79F: C-----  A8       TAY  
  0x03E7B0 $E7A0: C-----  20 E2 CD JSR  $CDE2
  0x03E7B3 $E7A3: C-----  C9 FF    CMP  #$FF
  0x03E7B5 $E7A5: C-----  F0 13    BEQ  $E7BA
  0x03E7B7 $E7A7: C-----  CD FE 05 CMP  $05FE
  0x03E7BA $E7AA: C-----  F0 CC    BEQ  $E778
  0x03E7BC $E7AC: C-----  8D FE 05 STA  $05FE
  0x03E7BF $E7AF: C-----  CD 38 06 CMP  $0638
  0x03E7C2 $E7B2: C-----  F0 0C    BEQ  $E7C0
  0x03E7C4 $E7B4: C-----  20 0F 80 JSR  $800F
  0x03E7C7 $E7B7: C-----  4C 73 E7 JMP  $E773
  0x03E7CA $E7BA: C-----  AD 38 06 LDA  $0638
  0x03E7CD $E7BD: C-----  8D FE 05 STA  $05FE
  0x03E7D0 $E7C0: C-----  AD FE 05 LDA  $05FE
  0x03E7D3 $E7C3: C-----  20 C9 CD JSR  $CDC9
  0x03E7D6 $E7C6: C-----  8E 35 06 STX  $0635
  0x03E7D9 $E7C9: C-----  8C 37 06 STY  $0637
  0x03E7DC $E7CC: C-----  20 0C 80 JSR  $800C
  0x03E7DF $E7CF: C-----  60       RTS  
  0x03E7E0 $E7D0: C-----  A0 06    LDY  #$06
  0x03E7E2 $E7D2: C-----  B1 34    LDA  ($34),Y
  0x03E7E4 $E7D4: C-----  AA       TAX  
  0x03E7E5 $E7D5: C-----  A0 08    LDY  #$08
  0x03E7E7 $E7D7: C-----  B1 34    LDA  ($34),Y
  0x03E7E9 $E7D9: C-----  A8       TAY  
  0x03E7EA $E7DA: C-----  20 E2 CD JSR  $CDE2
  0x03E7ED $E7DD: C-----  A0 09    LDY  #$09
  0x03E7EF $E7DF: C-----  D1 34    CMP  ($34),Y
  0x03E7F1 $E7E1: C-----  D0 01    BNE  $E7E4
  0x03E7F3 $E7E3: C-----  60       RTS  
  0x03E7F4 $E7E4: C-----  A0 09    LDY  #$09
  0x03E7F6 $E7E6: C-----  B1 34    LDA  ($34),Y
  0x03E7F8 $E7E8: C-----  C9 F0    CMP  #$F0
  0x03E7FA $E7EA: C-----  D0 03    BNE  $E7EF
  0x03E7FC $E7EC: C-----  AD FE 05 LDA  $05FE
  0x03E7FF $E7EF: C-----  20 C9 CD JSR  $CDC9
  0x03E802 $E7F2: C-----  8A       TXA  
  0x03E803 $E7F3: C-----  85 3A    STA  $3A
  0x03E805 $E7F5: C-----  98       TYA  
  0x03E806 $E7F6: C-----  85 3B    STA  $3B
  0x03E808 $E7F8: C-----  A9 00    LDA  #$00
  0x03E80A $E7FA: C-----  85 3C    STA  $3C
  0x03E80C $E7FC: C-----  A0 06    LDY  #$06
  0x03E80E $E7FE: C-----  B1 34    LDA  ($34),Y
  0x03E810 $E800: C-----  38       SEC  
  0x03E811 $E801: C-----  E5 3A    SBC  $3A
  0x03E813 $E803: C-----  B0 06    BCS  $E80B
  0x03E815 $E805: C-----  49 FF    EOR  #$FF
  0x03E817 $E807: C-----  69 01    ADC  #$01
  0x03E819 $E809: C-----  E6 3C    INC  $3C
  0x03E81B $E80B: C-----  85 71    STA  $71
  0x03E81D $E80D: C-----  A0 08    LDY  #$08
  0x03E81F $E80F: C-----  B1 34    LDA  ($34),Y
  0x03E821 $E811: C-----  38       SEC  
  0x03E822 $E812: C-----  E5 3B    SBC  $3B
  0x03E824 $E814: C-----  B0 08    BCS  $E81E
  0x03E826 $E816: C-----  49 FF    EOR  #$FF
  0x03E828 $E818: C-----  69 01    ADC  #$01
  0x03E82A $E81A: C-----  E6 3C    INC  $3C
  0x03E82C $E81C: C-----  E6 3C    INC  $3C
  0x03E82E $E81E: C-----  85 70    STA  $70
  0x03E830 $E820: C-----  A9 00    LDA  #$00
  0x03E832 $E822: C-----  85 6F    STA  $6F
  0x03E834 $E824: C-----  85 74    STA  $74
  0x03E836 $E826: C-----  20 3C CD JSR  $CD3C
  0x03E839 $E829: C-----  A2 00    LDX  #$00
  0x03E83B $E82B: C-----  BD CD FA LDA  $FACD,X
  0x03E83E $E82E: C-----  C5 70    CMP  $70
  0x03E840 $E830: C-----  F0 04    BEQ  $E836
  0x03E842 $E832: C-----  B0 0F    BCS  $E843
  0x03E844 $E834: C-----  90 09    BCC  $E83F
  0x03E846 $E836: C-----  BD CC FA LDA  $FACC,X
  0x03E849 $E839: C-----  E5 6F    SBC  $6F
  0x03E84B $E83B: C-----  F0 06    BEQ  $E843
  0x03E84D $E83D: C-----  B0 04    BCS  $E843
  0x03E84F $E83F: C-----  E8       INX  
  0x03E850 $E840: C-----  E8       INX  
  0x03E851 $E841: C-----  D0 E8    BNE  $E82B
  0x03E853 $E843: C-----  8A       TXA  
  0x03E854 $E844: C-----  4A       LSR  A
  0x03E855 $E845: C-----  46 3C    LSR  $3C
  0x03E857 $E847: C-----  B0 04    BCS  $E84D
  0x03E859 $E849: C-----  49 FF    EOR  #$FF
  0x03E85B $E84B: C-----  29 7F    AND  #$7F
  0x03E85D $E84D: C-----  46 3C    LSR  $3C
  0x03E85F $E84F: C-----  B0 02    BCS  $E853
  0x03E861 $E851: C-----  49 FF    EOR  #$FF
  0x03E863 $E853: C-----  60       RTS  
  0x03E864 $E854: C-----  A0 0A    LDY  #$0A
  0x03E866 $E856: C-----  B1 34    LDA  ($34),Y
  0x03E868 $E858: C-----  D0 45    BNE  $E89F
  0x03E86A $E85A: C-----  AD FF 05 LDA  $05FF
  0x03E86D $E85D: C-----  85 43    STA  $43
  0x03E86F $E85F: C-----  20 D0 E7 JSR  $E7D0
  0x03E872 $E862: C-----  85 44    STA  $44
  0x03E874 $E864: C-----  A0 06    LDY  #$06
  0x03E876 $E866: C-----  B1 34    LDA  ($34),Y
  0x03E878 $E868: C-----  AA       TAX  
  0x03E879 $E869: C-----  A0 08    LDY  #$08
  0x03E87B $E86B: C-----  B1 34    LDA  ($34),Y
  0x03E87D $E86D: C-----  A8       TAY  
  0x03E87E $E86E: C-----  20 E2 CD JSR  $CDE2
  0x03E881 $E871: C-----  A0 09    LDY  #$09
  0x03E883 $E873: C-----  D1 34    CMP  ($34),Y
  0x03E885 $E875: C-----  F0 21    BEQ  $E898
  0x03E887 $E877: C-----  AA       TAX  
  0x03E888 $E878: C-----  B1 34    LDA  ($34),Y
  0x03E88A $E87A: C-----  C9 F0    CMP  #$F0
  0x03E88C $E87C: C-----  D0 05    BNE  $E883
  0x03E88E $E87E: C-----  EC FE 05 CPX  $05FE
  0x03E891 $E881: C-----  F0 15    BEQ  $E898
  0x03E893 $E883: C-----  A0 07    LDY  #$07
  0x03E895 $E885: C-----  A5 44    LDA  $44
  0x03E897 $E887: C-----  20 A0 E8 JSR  $E8A0
  0x03E89A $E88A: C-----  A5 44    LDA  $44
  0x03E89C $E88C: C-----  18       CLC  
  0x03E89D $E88D: C-----  69 40    ADC  #$40
  0x03E89F $E88F: C-----  A0 05    LDY  #$05
  0x03E8A1 $E891: C-----  20 A0 E8 JSR  $E8A0
  0x03E8A4 $E894: C-----  C6 43    DEC  $43
  0x03E8A6 $E896: C-----  D0 CC    BNE  $E864
  0x03E8A8 $E898: C-----  A0 0A    LDY  #$0A
  0x03E8AA $E89A: C-----  A9 00    LDA  #$00
  0x03E8AC $E89C: C-----  91 34    STA  ($34),Y
  0x03E8AE $E89E: C-----  60       RTS  
  0x03E8AF $E89F: C-----  60       RTS  
  0x03E8B0 $E8A0: C-----  84 46    STY  $46
  0x03E8B2 $E8A2: C-----  18       CLC  
  0x03E8B3 $E8A3: C-----  69 10    ADC  #$10
  0x03E8B5 $E8A5: C-----  4A       LSR  A
  0x03E8B6 $E8A6: C-----  4A       LSR  A
  0x03E8B7 $E8A7: C-----  4A       LSR  A
  0x03E8B8 $E8A8: C-----  4A       LSR  A
  0x03E8B9 $E8A9: C-----  4A       LSR  A
  0x03E8BA $E8AA: C-----  AA       TAX  
  0x03E8BB $E8AB: C-----  BD ED E8 LDA  $E8ED,X
  0x03E8BE $E8AE: C-----  85 47    STA  $47
  0x03E8C0 $E8B0: C-----  A4 32    LDY  $32
  0x03E8C2 $E8B2: C-----  A6 33    LDX  $33
  0x03E8C4 $E8B4: C-----  C6 47    DEC  $47
  0x03E8C6 $E8B6: C-----  10 06    BPL  $E8BE
  0x03E8C8 $E8B8: C-----  A2 00    LDX  #$00
  0x03E8CA $E8BA: C-----  A0 00    LDY  #$00
  0x03E8CC $E8BC: C-----  F0 10    BEQ  $E8CE
  0x03E8CE $E8BE: C-----  C6 47    DEC  $47
  0x03E8D0 $E8C0: C-----  30 0C    BMI  $E8CE
  0x03E8D2 $E8C2: C-----  98       TYA  
  0x03E8D3 $E8C3: C-----  49 FF    EOR  #$FF
  0x03E8D5 $E8C5: C-----  A8       TAY  
  0x03E8D6 $E8C6: C-----  8A       TXA  
  0x03E8D7 $E8C7: C-----  49 FF    EOR  #$FF
  0x03E8D9 $E8C9: C-----  AA       TAX  
  0x03E8DA $E8CA: C-----  C8       INY  
  0x03E8DB $E8CB: C-----  D0 01    BNE  $E8CE
  0x03E8DD $E8CD: C-----  E8       INX  
  0x03E8DE $E8CE: C-----  84 48    STY  $48
  0x03E8E0 $E8D0: C-----  86 49    STX  $49
  0x03E8E2 $E8D2: C-----  A0 0A    LDY  #$0A
  0x03E8E4 $E8D4: C-----  B1 34    LDA  ($34),Y
  0x03E8E6 $E8D6: C-----  38       SEC  
  0x03E8E7 $E8D7: C-----  ED FF 05 SBC  $05FF
  0x03E8EA $E8DA: C-----  10 10    BPL  $E8EC
  0x03E8EC $E8DC: C-----  49 FF    EOR  #$FF
  0x03E8EE $E8DE: C-----  18       CLC  
  0x03E8EF $E8DF: C-----  69 01    ADC  #$01
  0x03E8F1 $E8E1: C-----  F0 09    BEQ  $E8EC
  0x03E8F3 $E8E3: C-----  A5 48    LDA  $48
  0x03E8F5 $E8E5: C-----  A6 49    LDX  $49
  0x03E8F7 $E8E7: C-----  A4 46    LDY  $46
  0x03E8F9 $E8E9: C-----  20 12 E9 JSR  $E912
  0x03E8FC $E8EC: C-----  60       RTS  
  0x03E8FD $E8ED: -D3---  .byte $00
  0x03E8FE $E8EE: -D3---  .byte $01
  0x03E8FF $E8EF: -D3---  .byte $01
  0x03E900 $E8F0: -D3---  .byte $01
  0x03E901 $E8F1: -D3---  .byte $00
  0x03E902 $E8F2: -D3---  .byte $02
  0x03E903 $E8F3: -D3---  .byte $02
  0x03E904 $E8F4: -D3---  .byte $02
  0x03E905 $E8F5: C-----  84 47    STY  $47
  0x03E907 $E8F7: C-----  A4 32    LDY  $32
  0x03E909 $E8F9: C-----  A6 33    LDX  $33
  0x03E90B $E8FB: C-----  29 03    AND  #$03
  0x03E90D $E8FD: C-----  D0 01    BNE  $E900
  0x03E90F $E8FF: C-----  60       RTS  
  0x03E910 $E900: C-----  4A       LSR  A
  0x03E911 $E901: C-----  B0 0C    BCS  $E90F
  0x03E913 $E903: C-----  98       TYA  
  0x03E914 $E904: C-----  49 FF    EOR  #$FF
  0x03E916 $E906: C-----  A8       TAY  
  0x03E917 $E907: C-----  8A       TXA  
  0x03E918 $E908: C-----  49 FF    EOR  #$FF
  0x03E91A $E90A: C-----  AA       TAX  
  0x03E91B $E90B: C-----  C8       INY  
  0x03E91C $E90C: C-----  D0 01    BNE  $E90F
  0x03E91E $E90E: ------  .byte $E8
  0x03E91F $E90F: C-----  98       TYA  
  0x03E920 $E910: C-----  A4 47    LDY  $47
  0x03E922 $E912: C-----  18       CLC  
  0x03E923 $E913: C-----  71 34    ADC  ($34),Y
  0x03E925 $E915: C-----  91 34    STA  ($34),Y
  0x03E927 $E917: C-----  C8       INY  
  0x03E928 $E918: C-----  8A       TXA  
  0x03E929 $E919: C-----  71 34    ADC  ($34),Y
  0x03E92B $E91B: C-----  C0 06    CPY  #$06
  0x03E92D $E91D: C-----  F0 0E    BEQ  $E92D
  0x03E92F $E91F: C-----  A2 50    LDX  #$50
  0x03E931 $E921: C-----  C9 50    CMP  #$50
  0x03E933 $E923: C-----  90 14    BCC  $E939
  0x03E935 $E925: C-----  A2 AF    LDX  #$AF
  0x03E937 $E927: C-----  C9 B0    CMP  #$B0
  0x03E939 $E929: C-----  B0 0E    BCS  $E939
  0x03E93B $E92B: C-----  90 0D    BCC  $E93A
  0x03E93D $E92D: C-----  A2 30    LDX  #$30
  0x03E93F $E92F: C-----  C9 30    CMP  #$30
  0x03E941 $E931: C-----  90 06    BCC  $E939
  0x03E943 $E933: C-----  A2 CF    LDX  #$CF
  0x03E945 $E935: C-----  C9 D0    CMP  #$D0
  0x03E947 $E937: C-----  90 01    BCC  $E93A
  0x03E949 $E939: C-----  8A       TXA  
  0x03E94A $E93A: C-----  91 34    STA  ($34),Y
  0x03E94C $E93C: C-----  60       RTS  
  0x03E94D $E93D: C-----  48       PHA  
  0x03E94E $E93E: C-----  8A       TXA  
  0x03E94F $E93F: C-----  48       PHA  
  0x03E950 $E940: C-----  A9 01    LDA  #$01
  0x03E952 $E942: C-----  20 0F CB JSR  $CB0F
  0x03E955 $E945: C-----  AD 15 05 LDA  $0515
  0x03E958 $E948: C-----  D0 F6    BNE  $E940
  0x03E95A $E94A: C-----  A9 01    LDA  #$01
  0x03E95C $E94C: C-----  8D 15 05 STA  $0515
  0x03E95F $E94F: C-----  A9 00    LDA  #$00
  0x03E961 $E951: C-----  85 3E    STA  $3E
  0x03E963 $E953: C-----  68       PLA  
  0x03E964 $E954: C-----  4A       LSR  A
  0x03E965 $E955: C-----  66 3E    ROR  $3E
  0x03E967 $E957: C-----  4A       LSR  A
  0x03E968 $E958: C-----  66 3E    ROR  $3E
  0x03E96A $E95A: C-----  85 3F    STA  $3F
  0x03E96C $E95C: C-----  68       PLA  
  0x03E96D $E95D: C-----  0A       ASL  A
  0x03E96E $E95E: C-----  66 3A    ROR  $3A
  0x03E970 $E960: C-----  A8       TAY  
  0x03E971 $E961: C-----  18       CLC  
  0x03E972 $E962: C-----  B9 DA E9 LDA  $E9DA,Y
  0x03E975 $E965: C-----  85 3C    STA  $3C
  0x03E977 $E967: C-----  B9 DB E9 LDA  $E9DB,Y
  0x03E97A $E96A: C-----  85 3D    STA  $3D
  0x03E97C $E96C: C-----  A0 00    LDY  #$00
  0x03E97E $E96E: C-----  18       CLC  
  0x03E97F $E96F: C-----  B1 3C    LDA  ($3C),Y
  0x03E981 $E971: C-----  65 3E    ADC  $3E
  0x03E983 $E973: C-----  85 3E    STA  $3E
  0x03E985 $E975: C-----  C8       INY  
  0x03E986 $E976: C-----  B1 3C    LDA  ($3C),Y
  0x03E988 $E978: C-----  65 3F    ADC  $3F
  0x03E98A $E97A: C-----  85 3F    STA  $3F
  0x03E98C $E97C: C-----  C8       INY  
  0x03E98D $E97D: C-----  B1 3C    LDA  ($3C),Y
  0x03E98F $E97F: C-----  29 03    AND  #$03
  0x03E991 $E981: C-----  85 40    STA  $40
  0x03E993 $E983: C-----  B1 3C    LDA  ($3C),Y
  0x03E995 $E985: C-----  4A       LSR  A
  0x03E996 $E986: C-----  4A       LSR  A
  0x03E997 $E987: C-----  85 41    STA  $41
  0x03E999 $E989: C-----  C8       INY  
  0x03E99A $E98A: C-----  A2 00    LDX  #$00
  0x03E99C $E98C: C-----  A5 41    LDA  $41
  0x03E99E $E98E: C-----  9D A5 04 STA  $04A5,X
  0x03E9A1 $E991: C-----  18       CLC  
  0x03E9A2 $E992: C-----  A5 3E    LDA  $3E
  0x03E9A4 $E994: C-----  9D A6 04 STA  $04A6,X
  0x03E9A7 $E997: C-----  69 20    ADC  #$20
  0x03E9A9 $E999: C-----  85 3E    STA  $3E
  0x03E9AB $E99B: C-----  A5 3F    LDA  $3F
  0x03E9AD $E99D: C-----  9D A7 04 STA  $04A7,X
  0x03E9B0 $E9A0: C-----  69 00    ADC  #$00
  0x03E9B2 $E9A2: C-----  85 3F    STA  $3F
  0x03E9B4 $E9A4: C-----  E8       INX  
  0x03E9B5 $E9A5: C-----  E8       INX  
  0x03E9B6 $E9A6: C-----  E8       INX  
  0x03E9B7 $E9A7: C-----  A5 41    LDA  $41
  0x03E9B9 $E9A9: C-----  85 43    STA  $43
  0x03E9BB $E9AB: C-----  2C 3A 00 BIT  $003A
  0x03E9BE $E9AE: C-----  30 11    BMI  $E9C1
  0x03E9C0 $E9B0: C-----  B1 3C    LDA  ($3C),Y
  0x03E9C2 $E9B2: C-----  C8       INY  
  0x03E9C3 $E9B3: C-----  C9 FE    CMP  #$FE
  0x03E9C5 $E9B5: C-----  F0 0A    BEQ  $E9C1
  0x03E9C7 $E9B7: C-----  9D A5 04 STA  $04A5,X
  0x03E9CA $E9BA: C-----  E8       INX  
  0x03E9CB $E9BB: C-----  C6 43    DEC  $43
  0x03E9CD $E9BD: C-----  D0 F1    BNE  $E9B0
  0x03E9CF $E9BF: C-----  F0 0A    BEQ  $E9CB
  0x03E9D1 $E9C1: C-----  A9 00    LDA  #$00
  0x03E9D3 $E9C3: C-----  9D A5 04 STA  $04A5,X
  0x03E9D6 $E9C6: C-----  E8       INX  
  0x03E9D7 $E9C7: C-----  C6 43    DEC  $43
  0x03E9D9 $E9C9: C-----  D0 F8    BNE  $E9C3
  0x03E9DB $E9CB: C-----  A9 00    LDA  #$00
  0x03E9DD $E9CD: C-----  9D A5 04 STA  $04A5,X
  0x03E9E0 $E9D0: C-----  C6 40    DEC  $40
  0x03E9E2 $E9D2: C-----  D0 B8    BNE  $E98C
  0x03E9E4 $E9D4: C-----  A9 80    LDA  #$80
  0x03E9E6 $E9D6: C-----  8D 15 05 STA  $0515
  0x03E9E9 $E9D9: C-----  60       RTS  
  0x03E9EA $E9DA: -D3---  .byte $1C
  0x03E9EB $E9DB: -D3---  .byte $EA
  0x03E9EC $E9DC: -D3---  .byte $29
  0x03E9ED $E9DD: -D3---  .byte $EA
  0x03E9EE $E9DE: -D3---  .byte $34
  0x03E9EF $E9DF: -D3---  .byte $EA
  0x03E9F0 $E9E0: -D3---  .byte $3D
  0x03E9F1 $E9E1: -D3---  .byte $EA
  0x03E9F2 $E9E2: -D3---  .byte $46
  0x03E9F3 $E9E3: -D3---  .byte $EA
  0x03E9F4 $E9E4: -D3---  .byte $51
  0x03E9F5 $E9E5: -D3---  .byte $EA
  0x03E9F6 $E9E6: -D3---  .byte $59
  0x03E9F7 $E9E7: -D3---  .byte $EA
  0x03E9F8 $E9E8: -D3---  .byte $61
  0x03E9F9 $E9E9: -D3---  .byte $EA
  0x03E9FA $E9EA: -D3---  .byte $6A
  0x03E9FB $E9EB: -D3---  .byte $EA
  0x03E9FC $E9EC: -D3---  .byte $73
  0x03E9FD $E9ED: -D3---  .byte $EA
  0x03E9FE $E9EE: -D3---  .byte $7C
  0x03E9FF $E9EF: -D3---  .byte $EA
  0x03EA00 $E9F0: -D3---  .byte $87
  0x03EA01 $E9F1: -D3---  .byte $EA
  0x03EA02 $E9F2: -D3---  .byte $94
  0x03EA03 $E9F3: -D3---  .byte $EA
  0x03EA04 $E9F4: -D3---  .byte $9F
  0x03EA05 $E9F5: -D3---  .byte $EA
  0x03EA06 $E9F6: -D3---  .byte $AC
  0x03EA07 $E9F7: -D3---  .byte $EA
  0x03EA08 $E9F8: -D3---  .byte $B7
  0x03EA09 $E9F9: -D3---  .byte $EA
  0x03EA0A $E9FA: -D3---  .byte $C4
  0x03EA0B $E9FB: -D3---  .byte $EA
  0x03EA0C $E9FC: -D3---  .byte $CE
  0x03EA0D $E9FD: -D3---  .byte $EA
  0x03EA0E $E9FE: -D3---  .byte $DB
  0x03EA0F $E9FF: -D3---  .byte $EA
  0x03EA10 $EA00: -D3---  .byte $E6
  0x03EA11 $EA01: -D3---  .byte $EA
  0x03EA12 $EA02: -D3---  .byte $EF
  0x03EA13 $EA03: -D3---  .byte $EA
  0x03EA14 $EA04: -D3---  .byte $F8
  0x03EA15 $EA05: -D3---  .byte $EA
  0x03EA16 $EA06: -D3---  .byte $01
  0x03EA17 $EA07: -D3---  .byte $EB
  0x03EA18 $EA08: -D3---  .byte $0D
  0x03EA19 $EA09: -D3---  .byte $EB
  0x03EA1A $EA0A: -D3---  .byte $17
  0x03EA1B $EA0B: -D3---  .byte $EB
  0x03EA1C $EA0C: -D3---  .byte $26
  0x03EA1D $EA0D: -D3---  .byte $EB
  0x03EA1E $EA0E: -D3---  .byte $33
  0x03EA1F $EA0F: -D3---  .byte $EB
  0x03EA20 $EA10: -D3---  .byte $3E
  0x03EA21 $EA11: -D3---  .byte $EB
  0x03EA22 $EA12: -D3---  .byte $4C
  0x03EA23 $EA13: -D3---  .byte $EB
  0x03EA24 $EA14: -D3---  .byte $5E
  0x03EA25 $EA15: -D3---  .byte $EB
  0x03EA26 $EA16: -D3---  .byte $67
  0x03EA27 $EA17: -D3---  .byte $EB
  0x03EA28 $EA18: -D3---  .byte $72
  0x03EA29 $EA19: -D3---  .byte $EB
  0x03EA2A $EA1A: -D3---  .byte $7B
  0x03EA2B $EA1B: -D3---  .byte $EB
  0x03EA2C $EA1C: -D3-I-  .byte $AC ; <indirect ref>
  0x03EA2D $EA1D: -D3-I-  .byte $22 ; <indirect ref>
  0x03EA2E $EA1E: -D3-I-  .byte $16 ; <indirect ref>
  0x03EA2F $EA1F: -D3-I-  .byte $94 ; <indirect ref>
  0x03EA30 $EA20: -D3-I-  .byte $00 ; <indirect ref>
  0x03EA31 $EA21: -D3-I-  .byte $94 ; <indirect ref>
  0x03EA32 $EA22: -D3-I-  .byte $00 ; <indirect ref>
  0x03EA33 $EA23: -D3-I-  .byte $00 ; <indirect ref>
  0x03EA34 $EA24: -D3-I-  .byte $54 ; <indirect ref>
  0x03EA35 $EA25: -D3-I-  .byte $68 ; <indirect ref>
  0x03EA36 $EA26: -D3-I-  .byte $5C ; <indirect ref>
  0x03EA37 $EA27: -D3-I-  .byte $69 ; <indirect ref>
  0x03EA38 $EA28: -D3-I-  .byte $00 ; <indirect ref>
  0x03EA39 $EA29: -D3-I-  .byte $AC ; <indirect ref>
  0x03EA3A $EA2A: -D3-I-  .byte $22 ; <indirect ref>
  0x03EA3B $EA2B: -D3-I-  .byte $16 ; <indirect ref>
  0x03EA3C $EA2C: -D3-I-  .byte $00 ; <indirect ref>
  0x03EA3D $EA2D: -D3-I-  .byte $95 ; <indirect ref>
  0x03EA3E $EA2E: -D3-I-  .byte $FE ; <indirect ref>
  0x03EA3F $EA2F: -D3-I-  .byte $00 ; <indirect ref>
  0x03EA40 $EA30: -D3-I-  .byte $5A ; <indirect ref>
  0x03EA41 $EA31: -D3-I-  .byte $4D ; <indirect ref>
  0x03EA42 $EA32: -D3-I-  .byte $00 ; <indirect ref>
  0x03EA43 $EA33: -D3-I-  .byte $00 ; <indirect ref>
  0x03EA44 $EA34: -D3-I-  .byte $AC ; <indirect ref>
  0x03EA45 $EA35: -D3-I-  .byte $22 ; <indirect ref>
  0x03EA46 $EA36: -D3-I-  .byte $16 ; <indirect ref>
  0x03EA47 $EA37: -D3-I-  .byte $FE ; <indirect ref>
  0x03EA48 $EA38: -D3-I-  .byte $4C ; <indirect ref>
  0x03EA49 $EA39: -D3-I-  .byte $71 ; <indirect ref>
  0x03EA4A $EA3A: -D3-I-  .byte $7D ; <indirect ref>
  0x03EA4B $EA3B: -D3-I-  .byte $54 ; <indirect ref>
  0x03EA4C $EA3C: -D3-I-  .byte $00 ; <indirect ref>
  0x03EA4D $EA3D: -D3-I-  .byte $AC ; <indirect ref>
  0x03EA4E $EA3E: -D3-I-  .byte $22 ; <indirect ref>
  0x03EA4F $EA3F: -D3-I-  .byte $16 ; <indirect ref>
  0x03EA50 $EA40: -D3-I-  .byte $FE ; <indirect ref>
  0x03EA51 $EA41: -D3-I-  .byte $6C ; <indirect ref>
  0x03EA52 $EA42: -D3-I-  .byte $6E ; <indirect ref>
  0x03EA53 $EA43: -D3-I-  .byte $3F ; <indirect ref>
  0x03EA54 $EA44: -D3-I-  .byte $52 ; <indirect ref>
  0x03EA55 $EA45: -D3-I-  .byte $7D ; <indirect ref>
  0x03EA56 $EA46: -D3-I-  .byte $AC ; <indirect ref>
  0x03EA57 $EA47: -D3-I-  .byte $22 ; <indirect ref>
  0x03EA58 $EA48: -D3-I-  .byte $12 ; <indirect ref>
  0x03EA59 $EA49: -D3-I-  .byte $00 ; <indirect ref>
  0x03EA5A $EA4A: -D3-I-  .byte $00 ; <indirect ref>
  0x03EA5B $EA4B: -D3-I-  .byte $00 ; <indirect ref>
  0x03EA5C $EA4C: -D3-I-  .byte $95 ; <indirect ref>
  0x03EA5D $EA4D: -D3-I-  .byte $54 ; <indirect ref>
  0x03EA5E $EA4E: -D3-I-  .byte $67 ; <indirect ref>
  0x03EA5F $EA4F: -D3-I-  .byte $6F ; <indirect ref>
  0x03EA60 $EA50: -D3-I-  .byte $5C ; <indirect ref>
  0x03EA61 $EA51: -D3-I-  .byte $AC ; <indirect ref>
  0x03EA62 $EA52: -D3-I-  .byte $22 ; <indirect ref>
  0x03EA63 $EA53: -D3-I-  .byte $12 ; <indirect ref>
  0x03EA64 $EA54: -D3-I-  .byte $FE ; <indirect ref>
  0x03EA65 $EA55: -D3-I-  .byte $00 ; <indirect ref>
  0x03EA66 $EA56: -D3-I-  .byte $4D ; <indirect ref>
  0x03EA67 $EA57: -D3-I-  .byte $69 ; <indirect ref>
  0x03EA68 $EA58: -D3-I-  .byte $7D ; <indirect ref>
  0x03EA69 $EA59: -D3-I-  .byte $AC ; <indirect ref>
  0x03EA6A $EA5A: -D3-I-  .byte $22 ; <indirect ref>
  0x03EA6B $EA5B: -D3-I-  .byte $12 ; <indirect ref>
  0x03EA6C $EA5C: -D3-I-  .byte $FE ; <indirect ref>
  0x03EA6D $EA5D: -D3-I-  .byte $48 ; <indirect ref>
  0x03EA6E $EA5E: -D3-I-  .byte $68 ; <indirect ref>
  0x03EA6F $EA5F: -D3-I-  .byte $41 ; <indirect ref>
  0x03EA70 $EA60: -D3-I-  .byte $7D ; <indirect ref>
  0x03EA71 $EA61: -D3-I-  .byte $6E ; <indirect ref>
  0x03EA72 $EA62: -D3-I-  .byte $22 ; <indirect ref>
  0x03EA73 $EA63: -D3-I-  .byte $16 ; <indirect ref>
  0x03EA74 $EA64: -D3-I-  .byte $FE ; <indirect ref>
  0x03EA75 $EA65: -D3-I-  .byte $00 ; <indirect ref>
  0x03EA76 $EA66: -D3-I-  .byte $50 ; <indirect ref>
  0x03EA77 $EA67: -D3-I-  .byte $6F ; <indirect ref>
  0x03EA78 $EA68: -D3-I-  .byte $48 ; <indirect ref>
  0x03EA79 $EA69: -D3-I-  .byte $69 ; <indirect ref>
  0x03EA7A $EA6A: -D3-I-  .byte $6E ; <indirect ref>
  0x03EA7B $EA6B: -D3-I-  .byte $22 ; <indirect ref>
  0x03EA7C $EA6C: -D3-I-  .byte $16 ; <indirect ref>
  0x03EA7D $EA6D: -D3-I-  .byte $FE ; <indirect ref>
  0x03EA7E $EA6E: -D3-I-  .byte $00 ; <indirect ref>
  0x03EA7F $EA6F: -D3-I-  .byte $4D ; <indirect ref>
  0x03EA80 $EA70: -D3-I-  .byte $46 ; <indirect ref>
  0x03EA81 $EA71: -D3-I-  .byte $42 ; <indirect ref>
  0x03EA82 $EA72: -D3-I-  .byte $50 ; <indirect ref>
  0x03EA83 $EA73: -D3-I-  .byte $6E ; <indirect ref>
  0x03EA84 $EA74: -D3-I-  .byte $22 ; <indirect ref>
  0x03EA85 $EA75: -D3-I-  .byte $16 ; <indirect ref>
  0x03EA86 $EA76: -D3-I-  .byte $FE ; <indirect ref>
  0x03EA87 $EA77: -D3-I-  .byte $00 ; <indirect ref>
  0x03EA88 $EA78: -D3-I-  .byte $46 ; <indirect ref>
  0x03EA89 $EA79: -D3-I-  .byte $60 ; <indirect ref>
  0x03EA8A $EA7A: -D3-I-  .byte $4F ; <indirect ref>
  0x03EA8B $EA7B: -D3-I-  .byte $68 ; <indirect ref>
  0x03EA8C $EA7C: -D3-I-  .byte $6E ; <indirect ref>
  0x03EA8D $EA7D: -D3-I-  .byte $22 ; <indirect ref>
  0x03EA8E $EA7E: -D3-I-  .byte $16 ; <indirect ref>
  0x03EA8F $EA7F: -D3-I-  .byte $00 ; <indirect ref>
  0x03EA90 $EA80: -D3-I-  .byte $95 ; <indirect ref>
  0x03EA91 $EA81: -D3-I-  .byte $FE ; <indirect ref>
  0x03EA92 $EA82: -D3-I-  .byte $00 ; <indirect ref>
  0x03EA93 $EA83: -D3-I-  .byte $5A ; <indirect ref>
  0x03EA94 $EA84: -D3-I-  .byte $6C ; <indirect ref>
  0x03EA95 $EA85: -D3-I-  .byte $7D ; <indirect ref>
  0x03EA96 $EA86: -D3-I-  .byte $50 ; <indirect ref>
  0x03EA97 $EA87: -D3-I-  .byte $6E ; <indirect ref>
  0x03EA98 $EA88: -D3-I-  .byte $22 ; <indirect ref>
  0x03EA99 $EA89: -D3-I-  .byte $16 ; <indirect ref>
  0x03EA9A $EA8A: -D3-I-  .byte $00 ; <indirect ref>
  0x03EA9B $EA8B: -D3-I-  .byte $00 ; <indirect ref>
  0x03EA9C $EA8C: -D3-I-  .byte $00 ; <indirect ref>
  0x03EA9D $EA8D: -D3-I-  .byte $94 ; <indirect ref>
  0x03EA9E $EA8E: -D3-I-  .byte $00 ; <indirect ref>
  0x03EA9F $EA8F: -D3-I-  .byte $00 ; <indirect ref>
  0x03EAA0 $EA90: -D3-I-  .byte $50 ; <indirect ref>
  0x03EAA1 $EA91: -D3-I-  .byte $42 ; <indirect ref>
  0x03EAA2 $EA92: -D3-I-  .byte $46 ; <indirect ref>
  0x03EAA3 $EA93: -D3-I-  .byte $7D ; <indirect ref>
  0x03EAA4 $EA94: -D3-I-  .byte $6E ; <indirect ref>
  0x03EAA5 $EA95: -D3-I-  .byte $22 ; <indirect ref>
  0x03EAA6 $EA96: -D3-I-  .byte $16 ; <indirect ref>
  0x03EAA7 $EA97: -D3-I-  .byte $00 ; <indirect ref>
  0x03EAA8 $EA98: -D3-I-  .byte $94 ; <indirect ref>
  0x03EAA9 $EA99: -D3-I-  .byte $FE ; <indirect ref>
  0x03EAAA $EA9A: -D3-I-  .byte $00 ; <indirect ref>
  0x03EAAB $EA9B: -D3-I-  .byte $5C ; <indirect ref>
  0x03EAAC $EA9C: -D3-I-  .byte $6B ; <indirect ref>
  0x03EAAD $EA9D: -D3-I-  .byte $6F ; <indirect ref>
  0x03EAAE $EA9E: -D3-I-  .byte $48 ; <indirect ref>
  0x03EAAF $EA9F: -D3-I-  .byte $6E ; <indirect ref>
  0x03EAB0 $EAA0: -D3-I-  .byte $22 ; <indirect ref>
  0x03EAB1 $EAA1: -D3-I-  .byte $16 ; <indirect ref>
  0x03EAB2 $EAA2: -D3-I-  .byte $00 ; <indirect ref>
  0x03EAB3 $EAA3: -D3-I-  .byte $00 ; <indirect ref>
  0x03EAB4 $EAA4: -D3-I-  .byte $00 ; <indirect ref>
  0x03EAB5 $EAA5: -D3-I-  .byte $00 ; <indirect ref>
  0x03EAB6 $EAA6: -D3-I-  .byte $94 ; <indirect ref>
  0x03EAB7 $EAA7: -D3-I-  .byte $00 ; <indirect ref>
  0x03EAB8 $EAA8: -D3-I-  .byte $4D ; <indirect ref>
  0x03EAB9 $EAA9: -D3-I-  .byte $46 ; <indirect ref>
  0x03EABA $EAAA: -D3-I-  .byte $42 ; <indirect ref>
  0x03EABB $EAAB: -D3-I-  .byte $5C ; <indirect ref>
  0x03EABC $EAAC: -D3-I-  .byte $6E ; <indirect ref>
  0x03EABD $EAAD: -D3-I-  .byte $22 ; <indirect ref>
  0x03EABE $EAAE: -D3-I-  .byte $16 ; <indirect ref>
  0x03EABF $EAAF: -D3-I-  .byte $00 ; <indirect ref>
  0x03EAC0 $EAB0: -D3-I-  .byte $94 ; <indirect ref>
  0x03EAC1 $EAB1: -D3-I-  .byte $FE ; <indirect ref>
  0x03EAC2 $EAB2: -D3-I-  .byte $00 ; <indirect ref>
  0x03EAC3 $EAB3: -D3-I-  .byte $06 ; <indirect ref>
  0x03EAC4 $EAB4: -D3-I-  .byte $2E ; <indirect ref>
  0x03EAC5 $EAB5: -D3-I-  .byte $22 ; <indirect ref>
  0x03EAC6 $EAB6: -D3-I-  .byte $2E ; <indirect ref>
  0x03EAC7 $EAB7: -D3-I-  .byte $6E ; <indirect ref>
  0x03EAC8 $EAB8: -D3-I-  .byte $22 ; <indirect ref>
  0x03EAC9 $EAB9: -D3-I-  .byte $16 ; <indirect ref>
  0x03EACA $EABA: -D3-I-  .byte $00 ; <indirect ref>
  0x03EACB $EABB: -D3-I-  .byte $95 ; <indirect ref>
  0x03EACC $EABC: -D3-I-  .byte $00 ; <indirect ref>
  0x03EACD $EABD: -D3-I-  .byte $00 ; <indirect ref>
  0x03EACE $EABE: -D3-I-  .byte $94 ; <indirect ref>
  0x03EACF $EABF: -D3-I-  .byte $00 ; <indirect ref>
  0x03EAD0 $EAC0: -D3-I-  .byte $5A ; <indirect ref>
  0x03EAD1 $EAC1: -D3-I-  .byte $6C ; <indirect ref>
  0x03EAD2 $EAC2: -D3-I-  .byte $7D ; <indirect ref>
  0x03EAD3 $EAC3: -D3-I-  .byte $5C ; <indirect ref>
  0x03EAD4 $EAC4: -D3-I-  .byte $6E ; <indirect ref>
  0x03EAD5 $EAC5: -D3-I-  .byte $22 ; <indirect ref>
  0x03EAD6 $EAC6: -D3-I-  .byte $16 ; <indirect ref>
  0x03EAD7 $EAC7: -D3-I-  .byte $95 ; <indirect ref>
  0x03EAD8 $EAC8: -D3-I-  .byte $FE ; <indirect ref>
  0x03EAD9 $EAC9: -D3-I-  .byte $5A ; <indirect ref>
  0x03EADA $EACA: -D3-I-  .byte $4D ; <indirect ref>
  0x03EADB $EACB: -D3-I-  .byte $46 ; <indirect ref>
  0x03EADC $EACC: -D3-I-  .byte $6F ; <indirect ref>
  0x03EADD $EACD: -D3-I-  .byte $54 ; <indirect ref>
  0x03EADE $EACE: -D3-I-  .byte $6E ; <indirect ref>
  0x03EADF $EACF: -D3-I-  .byte $22 ; <indirect ref>
  0x03EAE0 $EAD0: -D3-I-  .byte $16 ; <indirect ref>
  0x03EAE1 $EAD1: -D3-I-  .byte $00 ; <indirect ref>
  0x03EAE2 $EAD2: -D3-I-  .byte $00 ; <indirect ref>
  0x03EAE3 $EAD3: -D3-I-  .byte $00 ; <indirect ref>
  0x03EAE4 $EAD4: -D3-I-  .byte $00 ; <indirect ref>
  0x03EAE5 $EAD5: -D3-I-  .byte $95 ; <indirect ref>
  0x03EAE6 $EAD6: -D3-I-  .byte $00 ; <indirect ref>
  0x03EAE7 $EAD7: -D3-I-  .byte $4D ; <indirect ref>
  0x03EAE8 $EAD8: -D3-I-  .byte $46 ; <indirect ref>
  0x03EAE9 $EAD9: -D3-I-  .byte $42 ; <indirect ref>
  0x03EAEA $EADA: -D3-I-  .byte $5A ; <indirect ref>
  0x03EAEB $EADB: -D3-I-  .byte $6E ; <indirect ref>
  0x03EAEC $EADC: -D3-I-  .byte $22 ; <indirect ref>
  0x03EAED $EADD: -D3-I-  .byte $16 ; <indirect ref>
  0x03EAEE $EADE: -D3-I-  .byte $00 ; <indirect ref>
  0x03EAEF $EADF: -D3-I-  .byte $94 ; <indirect ref>
  0x03EAF0 $EAE0: -D3-I-  .byte $FE ; <indirect ref>
  0x03EAF1 $EAE1: -D3-I-  .byte $03 ; <indirect ref>
  0x03EAF2 $EAE2: -D3-I-  .byte $0A ; <indirect ref>
  0x03EAF3 $EAE3: -D3-I-  .byte $06 ; <indirect ref>
  0x03EAF4 $EAE4: -D3-I-  .byte $15 ; <indirect ref>
  0x03EAF5 $EAE5: -D3-I-  .byte $02 ; <indirect ref>
  0x03EAF6 $EAE6: -D3-I-  .byte $6E ; <indirect ref>
  0x03EAF7 $EAE7: -D3-I-  .byte $22 ; <indirect ref>
  0x03EAF8 $EAE8: -D3-I-  .byte $16 ; <indirect ref>
  0x03EAF9 $EAE9: -D3-I-  .byte $FE ; <indirect ref>
  0x03EAFA $EAEA: -D3-I-  .byte $00 ; <indirect ref>
  0x03EAFB $EAEB: -D3-I-  .byte $5C ; <indirect ref>
  0x03EAFC $EAEC: -D3-I-  .byte $76 ; <indirect ref>
  0x03EAFD $EAED: -D3-I-  .byte $6B ; <indirect ref>
  0x03EAFE $EAEE: -D3-I-  .byte $7D ; <indirect ref>
  0x03EAFF $EAEF: -D3-I-  .byte $6E ; <indirect ref>
  0x03EB00 $EAF0: -D3-I-  .byte $22 ; <indirect ref>
  0x03EB01 $EAF1: -D3-I-  .byte $16 ; <indirect ref>
  0x03EB02 $EAF2: -D3-I-  .byte $FE ; <indirect ref>
  0x03EB03 $EAF3: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB04 $EAF4: -D3-I-  .byte $0E ; <indirect ref>
  0x03EB05 $EAF5: -D3-I-  .byte $28 ; <indirect ref>
  0x03EB06 $EAF6: -D3-I-  .byte $01 ; <indirect ref>
  0x03EB07 $EAF7: -D3-I-  .byte $03 ; <indirect ref>
  0x03EB08 $EAF8: -D3-I-  .byte $6E ; <indirect ref>
  0x03EB09 $EAF9: -D3-I-  .byte $22 ; <indirect ref>
  0x03EB0A $EAFA: -D3-I-  .byte $16 ; <indirect ref>
  0x03EB0B $EAFB: -D3-I-  .byte $FE ; <indirect ref>
  0x03EB0C $EAFC: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB0D $EAFD: -D3-I-  .byte $48 ; <indirect ref>
  0x03EB0E $EAFE: -D3-I-  .byte $68 ; <indirect ref>
  0x03EB0F $EAFF: -D3-I-  .byte $41 ; <indirect ref>
  0x03EB10 $EB00: -D3-I-  .byte $7D ; <indirect ref>
  0x03EB11 $EB01: -D3-I-  .byte $AB ; <indirect ref>
  0x03EB12 $EB02: -D3-I-  .byte $22 ; <indirect ref>
  0x03EB13 $EB03: -D3-I-  .byte $1A ; <indirect ref>
  0x03EB14 $EB04: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB15 $EB05: -D3-I-  .byte $95 ; <indirect ref>
  0x03EB16 $EB06: -D3-I-  .byte $FE ; <indirect ref>
  0x03EB17 $EB07: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB18 $EB08: -D3-I-  .byte $5A ; <indirect ref>
  0x03EB19 $EB09: -D3-I-  .byte $6E ; <indirect ref>
  0x03EB1A $EB0A: -D3-I-  .byte $51 ; <indirect ref>
  0x03EB1B $EB0B: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB1C $EB0C: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB1D $EB0D: -D3-I-  .byte $AB ; <indirect ref>
  0x03EB1E $EB0E: -D3-I-  .byte $22 ; <indirect ref>
  0x03EB1F $EB0F: -D3-I-  .byte $1A ; <indirect ref>
  0x03EB20 $EB10: -D3-I-  .byte $FE ; <indirect ref>
  0x03EB21 $EB11: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB22 $EB12: -D3-I-  .byte $47 ; <indirect ref>
  0x03EB23 $EB13: -D3-I-  .byte $70 ; <indirect ref>
  0x03EB24 $EB14: -D3-I-  .byte $6F ; <indirect ref>
  0x03EB25 $EB15: -D3-I-  .byte $51 ; <indirect ref>
  0x03EB26 $EB16: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB27 $EB17: -D3-I-  .byte $AB ; <indirect ref>
  0x03EB28 $EB18: -D3-I-  .byte $22 ; <indirect ref>
  0x03EB29 $EB19: -D3-I-  .byte $1A ; <indirect ref>
  0x03EB2A $EB1A: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB2B $EB1B: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB2C $EB1C: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB2D $EB1D: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB2E $EB1E: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB2F $EB1F: -D3-I-  .byte $94 ; <indirect ref>
  0x03EB30 $EB20: -D3-I-  .byte $0B ; <indirect ref>
  0x03EB31 $EB21: -D3-I-  .byte $2E ; <indirect ref>
  0x03EB32 $EB22: -D3-I-  .byte $06 ; <indirect ref>
  0x03EB33 $EB23: -D3-I-  .byte $08 ; <indirect ref>
  0x03EB34 $EB24: -D3-I-  .byte $14 ; <indirect ref>
  0x03EB35 $EB25: -D3-I-  .byte $1B ; <indirect ref>
  0x03EB36 $EB26: -D3-I-  .byte $6E ; <indirect ref>
  0x03EB37 $EB27: -D3-I-  .byte $22 ; <indirect ref>
  0x03EB38 $EB28: -D3-I-  .byte $16 ; <indirect ref>
  0x03EB39 $EB29: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB3A $EB2A: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB3B $EB2B: -D3-I-  .byte $94 ; <indirect ref>
  0x03EB3C $EB2C: -D3-I-  .byte $94 ; <indirect ref>
  0x03EB3D $EB2D: -D3-I-  .byte $FE ; <indirect ref>
  0x03EB3E $EB2E: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB3F $EB2F: -D3-I-  .byte $14 ; <indirect ref>
  0x03EB40 $EB30: -D3-I-  .byte $1B ; <indirect ref>
  0x03EB41 $EB31: -D3-I-  .byte $10 ; <indirect ref>
  0x03EB42 $EB32: -D3-I-  .byte $0D ; <indirect ref>
  0x03EB43 $EB33: -D3-I-  .byte $6E ; <indirect ref>
  0x03EB44 $EB34: -D3-I-  .byte $22 ; <indirect ref>
  0x03EB45 $EB35: -D3-I-  .byte $16 ; <indirect ref>
  0x03EB46 $EB36: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB47 $EB37: -D3-I-  .byte $94 ; <indirect ref>
  0x03EB48 $EB38: -D3-I-  .byte $FE ; <indirect ref>
  0x03EB49 $EB39: -D3-I-  .byte $20 ; <indirect ref>
  0x03EB4A $EB3A: -D3-I-  .byte $06 ; <indirect ref>
  0x03EB4B $EB3B: -D3-I-  .byte $1F ; <indirect ref>
  0x03EB4C $EB3C: -D3-I-  .byte $04 ; <indirect ref>
  0x03EB4D $EB3D: -D3-I-  .byte $29 ; <indirect ref>
  0x03EB4E $EB3E: -D3-I-  .byte $AB ; <indirect ref>
  0x03EB4F $EB3F: -D3-I-  .byte $22 ; <indirect ref>
  0x03EB50 $EB40: -D3-I-  .byte $17 ; <indirect ref>
  0x03EB51 $EB41: -D3-I-  .byte $FE ; <indirect ref>
  0x03EB52 $EB42: -D3-I-  .byte $4C ; <indirect ref>
  0x03EB53 $EB43: -D3-I-  .byte $71 ; <indirect ref>
  0x03EB54 $EB44: -D3-I-  .byte $7D ; <indirect ref>
  0x03EB55 $EB45: -D3-I-  .byte $54 ; <indirect ref>
  0x03EB56 $EB46: -D3-I-  .byte $16 ; <indirect ref>
  0x03EB57 $EB47: -D3-I-  .byte $0F ; <indirect ref>
  0x03EB58 $EB48: -D3-I-  .byte $15 ; <indirect ref>
  0x03EB59 $EB49: -D3-I-  .byte $04 ; <indirect ref>
  0x03EB5A $EB4A: -D3-I-  .byte $29 ; <indirect ref>
  0x03EB5B $EB4B: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB5C $EB4C: -D3-I-  .byte $AB ; <indirect ref>
  0x03EB5D $EB4D: -D3-I-  .byte $22 ; <indirect ref>
  0x03EB5E $EB4E: -D3-I-  .byte $17 ; <indirect ref>
  0x03EB5F $EB4F: -D3-I-  .byte $94 ; <indirect ref>
  0x03EB60 $EB50: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB61 $EB51: -D3-I-  .byte $94 ; <indirect ref>
  0x03EB62 $EB52: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB63 $EB53: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB64 $EB54: -D3-I-  .byte $54 ; <indirect ref>
  0x03EB65 $EB55: -D3-I-  .byte $68 ; <indirect ref>
  0x03EB66 $EB56: -D3-I-  .byte $5C ; <indirect ref>
  0x03EB67 $EB57: -D3-I-  .byte $69 ; <indirect ref>
  0x03EB68 $EB58: -D3-I-  .byte $16 ; <indirect ref>
  0x03EB69 $EB59: -D3-I-  .byte $0F ; <indirect ref>
  0x03EB6A $EB5A: -D3-I-  .byte $15 ; <indirect ref>
  0x03EB6B $EB5B: -D3-I-  .byte $04 ; <indirect ref>
  0x03EB6C $EB5C: -D3-I-  .byte $29 ; <indirect ref>
  0x03EB6D $EB5D: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB6E $EB5E: -D3-I-  .byte $6E ; <indirect ref>
  0x03EB6F $EB5F: -D3-I-  .byte $22 ; <indirect ref>
  0x03EB70 $EB60: -D3-I-  .byte $16 ; <indirect ref>
  0x03EB71 $EB61: -D3-I-  .byte $FE ; <indirect ref>
  0x03EB72 $EB62: -D3-I-  .byte $7D ; <indirect ref>
  0x03EB73 $EB63: -D3-I-  .byte $7D ; <indirect ref>
  0x03EB74 $EB64: -D3-I-  .byte $7D ; <indirect ref>
  0x03EB75 $EB65: -D3-I-  .byte $7D ; <indirect ref>
  0x03EB76 $EB66: -D3-I-  .byte $7D ; <indirect ref>
  0x03EB77 $EB67: -D3-I-  .byte $AA ; <indirect ref>
  0x03EB78 $EB68: -D3-I-  .byte $22 ; <indirect ref>
  0x03EB79 $EB69: -D3-I-  .byte $16 ; <indirect ref>
  0x03EB7A $EB6A: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB7B $EB6B: -D3-I-  .byte $94 ; <indirect ref>
  0x03EB7C $EB6C: -D3-I-  .byte $FE ; <indirect ref>
  0x03EB7D $EB6D: -D3-I-  .byte $1B ; <indirect ref>
  0x03EB7E $EB6E: -D3-I-  .byte $10 ; <indirect ref>
  0x03EB7F $EB6F: -D3-I-  .byte $28 ; <indirect ref>
  0x03EB80 $EB70: -D3-I-  .byte $4D ; <indirect ref>
  0x03EB81 $EB71: -D3-I-  .byte $60 ; <indirect ref>
  0x03EB82 $EB72: -D3-I-  .byte $AA ; <indirect ref>
  0x03EB83 $EB73: -D3-I-  .byte $22 ; <indirect ref>
  0x03EB84 $EB74: -D3-I-  .byte $16 ; <indirect ref>
  0x03EB85 $EB75: -D3-I-  .byte $FE ; <indirect ref>
  0x03EB86 $EB76: -D3-I-  .byte $0C ; <indirect ref>
  0x03EB87 $EB77: -D3-I-  .byte $32 ; <indirect ref>
  0x03EB88 $EB78: -D3-I-  .byte $03 ; <indirect ref>
  0x03EB89 $EB79: -D3-I-  .byte $22 ; <indirect ref>
  0x03EB8A $EB7A: -D3-I-  .byte $2E ; <indirect ref>
  0x03EB8B $EB7B: -D3-I-  .byte $AA ; <indirect ref>
  0x03EB8C $EB7C: -D3-I-  .byte $22 ; <indirect ref>
  0x03EB8D $EB7D: -D3-I-  .byte $16 ; <indirect ref>
  0x03EB8E $EB7E: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB8F $EB7F: -D3-I-  .byte $94 ; <indirect ref>
  0x03EB90 $EB80: -D3-I-  .byte $FE ; <indirect ref>
  0x03EB91 $EB81: -D3-I-  .byte $20 ; <indirect ref>
  0x03EB92 $EB82: -D3-I-  .byte $07 ; <indirect ref>
  0x03EB93 $EB83: -D3-I-  .byte $4D ; <indirect ref>
  0x03EB94 $EB84: -D3-I-  .byte $60 ; <indirect ref>
  0x03EB95 $EB85: -D3-I-  .byte $00 ; <indirect ref>
  0x03EB96 $EB86: C-----  A9 01    LDA  #$01
  0x03EB98 $EB88: C-----  20 0F CB JSR  $CB0F
  0x03EB9B $EB8B: C-----  A5 21    LDA  $21
  0x03EB9D $EB8D: C-----  29 1E    AND  #$1E
  0x03EB9F $EB8F: C-----  AE 39 05 LDX  $0539
  0x03EBA2 $EB92: C-----  F0 05    BEQ  $EB99
  0x03EBA4 $EB94: C-----  A5 21    LDA  $21
  0x03EBA6 $EB96: C-----  4D 39 05 EOR  $0539
  0x03EBA9 $EB99: C-----  85 21    STA  $21
  0x03EBAB $EB9B: C-----  20 08 EC JSR  $EC08
  0x03EBAE $EB9E: C-----  20 85 ED JSR  $ED85
  0x03EBB1 $EBA1: C-----  48       PHA  
  0x03EBB2 $EBA2: C-----  A5 22    LDA  $22
  0x03EBB4 $EBA4: C-----  A9 18    LDA  #$18
  0x03EBB6 $EBA6: C-----  85 24    STA  $24
  0x03EBB8 $EBA8: C-----  A9 19    LDA  #$19
  0x03EBBA $EBAA: C-----  85 25    STA  $25
  0x03EBBC $EBAC: C-----  20 2D CE JSR  $CE2D
  0x03EBBF $EBAF: C-----  68       PLA  
  0x03EBC0 $EBB0: C-----  20 03 80 JSR  $8003
  0x03EBC3 $EBB3: C-----  48       PHA  
  0x03EBC4 $EBB4: C-----  A5 22    LDA  $22
  0x03EBC6 $EBB6: C-----  A9 18    LDA  #$18
  0x03EBC8 $EBB8: C-----  85 24    STA  $24
  0x03EBCA $EBBA: C-----  A9 19    LDA  #$19
  0x03EBCC $EBBC: C-----  85 25    STA  $25
  0x03EBCE $EBBE: C-----  20 2D CE JSR  $CE2D
  0x03EBD1 $EBC1: C-----  68       PLA  
  0x03EBD2 $EBC2: C-----  20 06 80 JSR  $8006
  0x03EBD5 $EBC5: C-----  48       PHA  
  0x03EBD6 $EBC6: C-----  A5 22    LDA  $22
  0x03EBD8 $EBC8: C-----  A9 18    LDA  #$18
  0x03EBDA $EBCA: C-----  85 24    STA  $24
  0x03EBDC $EBCC: C-----  A9 19    LDA  #$19
  0x03EBDE $EBCE: C-----  85 25    STA  $25
  0x03EBE0 $EBD0: C-----  20 2D CE JSR  $CE2D
  0x03EBE3 $EBD3: C-----  68       PLA  
  0x03EBE4 $EBD4: C-----  20 09 80 JSR  $8009
  0x03EBE7 $EBD7: C-----  AD 2E 05 LDA  $052E
  0x03EBEA $EBDA: C-----  F0 29    BEQ  $EC05
  0x03EBEC $EBDC: C-----  CE 2E 05 DEC  $052E
  0x03EBEF $EBDF: C-----  D0 24    BNE  $EC05
  0x03EBF1 $EBE1: C-----  AD 2F 05 LDA  $052F
  0x03EBF4 $EBE4: C-----  C9 7E    CMP  #$7E
  0x03EBF6 $EBE6: C-----  90 11    BCC  $EBF9
  0x03EBF8 $EBE8: C-----  C9 7F    CMP  #$7F
  0x03EBFA $EBEA: C-----  F0 07    BEQ  $EBF3
  0x03EBFC $EBEC: C-----  AD 27 00 LDA  $0027
  0x03EBFF $EBEF: C-----  C9 04    CMP  #$04
  0x03EC01 $EBF1: C-----  F0 12    BEQ  $EC05
  0x03EC03 $EBF3: C-----  20 93 D0 JSR  $D093
  0x03EC06 $EBF6: C-----  4C 05 EC JMP  $EC05
  0x03EC09 $EBF9: C-----  2C 3F 06 BIT  $063F
  0x03EC0C $EBFC: C-----  10 04    BPL  $EC02
  0x03EC0E $EBFE: C-----  C9 63    CMP  #$63
  0x03EC10 $EC00: C-----  D0 03    BNE  $EC05
  0x03EC12 $EC02: C-----  20 F1 CB JSR  $CBF1
  0x03EC15 $EC05: C-----  4C 86 EB JMP  $EB86
  0x03EC18 $EC08: C-----  AD 16 05 LDA  $0516
  0x03EC1B $EC0B: C-----  29 81    AND  #$81
  0x03EC1D $EC0D: C-----  D0 01    BNE  $EC10
  0x03EC1F $EC0F: C-----  60       RTS  
  0x03EC20 $EC10: C-----  2C 16 05 BIT  $0516
  0x03EC23 $EC13: C-----  10 1F    BPL  $EC34
  0x03EC25 $EC15: C-----  A9 01    LDA  #$01
  0x03EC27 $EC17: C-----  8D 16 05 STA  $0516
  0x03EC2A $EC1A: C-----  48       PHA  
  0x03EC2B $EC1B: C-----  A5 22    LDA  $22
  0x03EC2D $EC1D: C-----  A9 10    LDA  #$10
  0x03EC2F $EC1F: C-----  85 24    STA  $24
  0x03EC31 $EC21: C-----  A9 11    LDA  #$11
  0x03EC33 $EC23: C-----  85 25    STA  $25
  0x03EC35 $EC25: C-----  20 2D CE JSR  $CE2D
  0x03EC38 $EC28: C-----  68       PLA  
  0x03EC39 $EC29: C-----  20 00 80 JSR  $8000
  0x03EC3C $EC2C: C-----  A9 00    LDA  #$00
  0x03EC3E $EC2E: C-----  8D 22 05 STA  $0522
  0x03EC41 $EC31: C-----  8D 39 05 STA  $0539
  0x03EC44 $EC34: C-----  AE 19 05 LDX  $0519
  0x03EC47 $EC37: C-----  F0 03    BEQ  $EC3C
  0x03EC49 $EC39: C-----  4C 5B ED JMP  $ED5B
  0x03EC4C $EC3C: C-----  A9 00    LDA  #$00
  0x03EC4E $EC3E: C-----  8D 32 05 STA  $0532
  0x03EC51 $EC41: C-----  8D 34 05 STA  $0534
  0x03EC54 $EC44: C-----  8D 36 05 STA  $0536
  0x03EC57 $EC47: C-----  8D 38 05 STA  $0538
  0x03EC5A $EC4A: C-----  8D 39 05 STA  $0539
  0x03EC5D $EC4D: C-----  A9 08    LDA  #$08
  0x03EC5F $EC4F: C-----  2C 16 05 BIT  $0516
  0x03EC62 $EC52: C-----  D0 21    BNE  $EC75
  0x03EC64 $EC54: C-----  AD 16 05 LDA  $0516
  0x03EC67 $EC57: C-----  29 50    AND  #$50
  0x03EC69 $EC59: C-----  C9 50    CMP  #$50
  0x03EC6B $EC5B: C-----  F0 2F    BEQ  $EC8C
  0x03EC6D $EC5D: C-----  2C 16 05 BIT  $0516
  0x03EC70 $EC60: C-----  70 12    BVS  $EC74
  0x03EC72 $EC62: C-----  48       PHA  
  0x03EC73 $EC63: C-----  A5 22    LDA  $22
  0x03EC75 $EC65: C-----  A9 10    LDA  #$10
  0x03EC77 $EC67: C-----  85 24    STA  $24
  0x03EC79 $EC69: C-----  A9 11    LDA  #$11
  0x03EC7B $EC6B: C-----  85 25    STA  $25
  0x03EC7D $EC6D: C-----  20 2D CE JSR  $CE2D
  0x03EC80 $EC70: C-----  68       PLA  
  0x03EC81 $EC71: C-----  20 03 80 JSR  $8003
  0x03EC84 $EC74: C-----  60       RTS  
  0x03EC85 $EC75: C-----  4D 16 05 EOR  $0516
  0x03EC88 $EC78: C-----  8D 16 05 STA  $0516
  0x03EC8B $EC7B: C-----  A9 00    LDA  #$00
  0x03EC8D $EC7D: C-----  8D D2 05 STA  $05D2
  0x03EC90 $EC80: C-----  A9 00    LDA  #$00
  0x03EC92 $EC82: C-----  85 0D    STA  $0D
  0x03EC94 $EC84: C-----  85 0E    STA  $0E
  0x03EC96 $EC86: C-----  A9 00    LDA  #$00
  0x03EC98 $EC88: C-----  8D 16 05 STA  $0516
  0x03EC9B $EC8B: C-----  60       RTS  
  0x03EC9C $EC8C: C-----  AD 16 05 LDA  $0516
  0x03EC9F $EC8F: C-----  29 8F    AND  #$8F
  0x03ECA1 $EC91: C-----  8D 16 05 STA  $0516
  0x03ECA4 $EC94: C-----  AD 23 05 LDA  $0523
  0x03ECA7 $EC97: C-----  8D 19 05 STA  $0519
  0x03ECAA $EC9A: C-----  AD 24 05 LDA  $0524
  0x03ECAD $EC9D: C-----  C9 FF    CMP  #$FF
  0x03ECAF $EC9F: C-----  F0 56    BEQ  $ECF7
  0x03ECB1 $ECA1: C-----  A9 04    LDA  #$04
  0x03ECB3 $ECA3: C-----  2C 16 05 BIT  $0516
  0x03ECB6 $ECA6: C-----  F0 0F    BEQ  $ECB7
  0x03ECB8 $ECA8: C-----  4D 16 05 EOR  $0516
  0x03ECBB $ECAB: C-----  8D 16 05 STA  $0516
  0x03ECBE $ECAE: C-----  A9 00    LDA  #$00
  0x03ECC0 $ECB0: C-----  85 11    STA  $11
  0x03ECC2 $ECB2: C-----  85 12    STA  $12
  0x03ECC4 $ECB4: C-----  20 46 CC JSR  $CC46
  0x03ECC7 $ECB7: C-----  AD 26 05 LDA  $0526
  0x03ECCA $ECBA: C-----  10 0E    BPL  $ECCA
  0x03ECCC $ECBC: C-----  29 7F    AND  #$7F
  0x03ECCE $ECBE: C-----  8D 26 05 STA  $0526
  0x03ECD1 $ECC1: C-----  8D 90 04 STA  $0490
  0x03ECD4 $ECC4: C-----  AD 27 05 LDA  $0527
  0x03ECD7 $ECC7: C-----  8D 91 04 STA  $0491
  0x03ECDA $ECCA: C-----  AD 25 05 LDA  $0525
  0x03ECDD $ECCD: C-----  A2 00    LDX  #$00
  0x03ECDF $ECCF: C-----  20 02 CC JSR  $CC02
  0x03ECE2 $ECD2: C-----  20 D2 CC JSR  $CCD2
  0x03ECE5 $ECD5: -D3-I-  .byte $00 ; <indirect ref>
  0x03ECE6 $ECD6: -D3-I-  .byte $6C ; <indirect ref>
  0x03ECE7 $ECD7: -D3-I-  .byte $04 ; <indirect ref>
  0x03ECE8 $ECD8: C-----  AD CE 05 LDA  $05CE
  0x03ECEB $ECDB: C-----  48       PHA  
  0x03ECEC $ECDC: C-----  A5 22    LDA  $22
  0x03ECEE $ECDE: C-----  A9 0B    LDA  #$0B
  0x03ECF0 $ECE0: C-----  85 24    STA  $24
  0x03ECF2 $ECE2: C-----  A9 0C    LDA  #$0C
  0x03ECF4 $ECE4: C-----  85 25    STA  $25
  0x03ECF6 $ECE6: C-----  20 2D CE JSR  $CE2D
  0x03ECF9 $ECE9: C-----  68       PLA  
  0x03ECFA $ECEA: C-----  20 06 80 JSR  $8006
  0x03ECFD $ECED: C-----  A9 00    LDA  #$00
  0x03ECFF $ECEF: C-----  85 4A    STA  $4A
  0x03ED01 $ECF1: C-----  AD D1 05 LDA  $05D1
  0x03ED04 $ECF4: C-----  8D D2 05 STA  $05D2
  0x03ED07 $ECF7: C-----  AD 28 05 LDA  $0528
  0x03ED0A $ECFA: C-----  C9 FF    CMP  #$FF
  0x03ED0C $ECFC: C-----  F0 08    BEQ  $ED06
  0x03ED0E $ECFE: C-----  8D 3C 05 STA  $053C
  0x03ED11 $ED01: C-----  A9 80    LDA  #$80
  0x03ED13 $ED03: C-----  8D 3A 05 STA  $053A
  0x03ED16 $ED06: C-----  A9 00    LDA  #$00
  0x03ED18 $ED08: C-----  85 0D    STA  $0D
  0x03ED1A $ED0A: C-----  85 0E    STA  $0E
  0x03ED1C $ED0C: C-----  AD 2A 05 LDA  $052A
  0x03ED1F $ED0F: C-----  8D 17 05 STA  $0517
  0x03ED22 $ED12: C-----  AD 29 05 LDA  $0529
  0x03ED25 $ED15: C-----  C9 FF    CMP  #$FF
  0x03ED27 $ED17: C-----  F0 14    BEQ  $ED2D
  0x03ED29 $ED19: C-----  8D EA 05 STA  $05EA
  0x03ED2C $ED1C: C-----  A2 11    LDX  #$11
  0x03ED2E $ED1E: C-----  A9 C8    LDA  #$C8
  0x03ED30 $ED20: C-----  95 01    STA  $01,X
  0x03ED32 $ED22: C-----  A9 18    LDA  #$18
  0x03ED34 $ED24: C-----  95 02    STA  $02,X
  0x03ED36 $ED26: C-----  A9 7F    LDA  #$7F
  0x03ED38 $ED28: C-----  A0 FF    LDY  #$FF
  0x03ED3A $ED2A: C-----  20 E7 CA JSR  $CAE7
  0x03ED3D $ED2D: C-----  AD 2B 05 LDA  $052B
  0x03ED40 $ED30: C-----  09 80    ORA  #$80
  0x03ED42 $ED32: C-----  8D 32 05 STA  $0532
  0x03ED45 $ED35: C-----  AD 2C 05 LDA  $052C
  0x03ED48 $ED38: C-----  09 80    ORA  #$80
  0x03ED4A $ED3A: C-----  8D 36 05 STA  $0536
  0x03ED4D $ED3D: C-----  AD 2D 05 LDA  $052D
  0x03ED50 $ED40: C-----  09 80    ORA  #$80
  0x03ED52 $ED42: C-----  8D 34 05 STA  $0534
  0x03ED55 $ED45: C-----  AD 30 05 LDA  $0530
  0x03ED58 $ED48: C-----  8D 2E 05 STA  $052E
  0x03ED5B $ED4B: C-----  AD 31 05 LDA  $0531
  0x03ED5E $ED4E: C-----  8D 2F 05 STA  $052F
  0x03ED61 $ED51: C-----  A9 00    LDA  #$00
  0x03ED63 $ED53: C-----  85 8E    STA  $8E
  0x03ED65 $ED55: C-----  A9 01    LDA  #$01
  0x03ED67 $ED57: C-----  8D 69 04 STA  $0469
  0x03ED6A $ED5A: C-----  60       RTS  
  0x03ED6B $ED5B: C-----  CA       DEX  
  0x03ED6C $ED5C: C-----  8E 19 05 STX  $0519
  0x03ED6F $ED5F: C-----  E0 28    CPX  #$28
  0x03ED71 $ED61: C-----  B0 21    BCS  $ED84
  0x03ED73 $ED63: C-----  AD 16 05 LDA  $0516
  0x03ED76 $ED66: C-----  29 20    AND  #$20
  0x03ED78 $ED68: C-----  D0 1A    BNE  $ED84
  0x03ED7A $ED6A: C-----  AD 16 05 LDA  $0516
  0x03ED7D $ED6D: C-----  09 20    ORA  #$20
  0x03ED7F $ED6F: C-----  8D 16 05 STA  $0516
  0x03ED82 $ED72: C-----  48       PHA  
  0x03ED83 $ED73: C-----  A5 22    LDA  $22
  0x03ED85 $ED75: C-----  A9 10    LDA  #$10
  0x03ED87 $ED77: C-----  85 24    STA  $24
  0x03ED89 $ED79: C-----  A9 11    LDA  #$11
  0x03ED8B $ED7B: C-----  85 25    STA  $25
  0x03ED8D $ED7D: C-----  20 2D CE JSR  $CE2D
  0x03ED90 $ED80: C-----  68       PLA  
  0x03ED91 $ED81: C-----  20 03 80 JSR  $8003
  0x03ED94 $ED84: C-----  60       RTS  
  0x03ED95 $ED85: C-----  AD D2 05 LDA  $05D2
  0x03ED98 $ED88: C-----  D0 01    BNE  $ED8B
  0x03ED9A $ED8A: C-----  60       RTS  
  0x03ED9B $ED8B: C-----  10 68    BPL  $EDF5
  0x03ED9D $ED8D: C-----  29 7F    AND  #$7F
  0x03ED9F $ED8F: C-----  09 01    ORA  #$01
  0x03EDA1 $ED91: C-----  8D D2 05 STA  $05D2
  0x03EDA4 $ED94: C-----  AD DB 05 LDA  $05DB
  0x03EDA7 $ED97: C-----  8D D3 05 STA  $05D3
  0x03EDAA $ED9A: C-----  AD DC 05 LDA  $05DC
  0x03EDAD $ED9D: C-----  8D D4 05 STA  $05D4
  0x03EDB0 $EDA0: C-----  AD DD 05 LDA  $05DD
  0x03EDB3 $EDA3: C-----  8D D5 05 STA  $05D5
  0x03EDB6 $EDA6: C-----  AE DE 05 LDX  $05DE
  0x03EDB9 $EDA9: C-----  AC DF 05 LDY  $05DF
  0x03EDBC $EDAC: C-----  8E D6 05 STX  $05D6
  0x03EDBF $EDAF: C-----  8C D7 05 STY  $05D7
  0x03EDC2 $EDB2: C-----  AD E0 05 LDA  $05E0
  0x03EDC5 $EDB5: C-----  8D D8 05 STA  $05D8
  0x03EDC8 $EDB8: C-----  AD E1 05 LDA  $05E1
  0x03EDCB $EDBB: C-----  8D D9 05 STA  $05D9
  0x03EDCE $EDBE: C-----  AD E2 05 LDA  $05E2
  0x03EDD1 $EDC1: C-----  8D DA 05 STA  $05DA
  0x03EDD4 $EDC4: C-----  AD D2 05 LDA  $05D2
  0x03EDD7 $EDC7: C-----  29 02    AND  #$02
  0x03EDD9 $EDC9: C-----  F0 2A    BEQ  $EDF5
  0x03EDDB $EDCB: C-----  2C D2 05 BIT  $05D2
  0x03EDDE $EDCE: C-----  50 14    BVC  $EDE4
  0x03EDE0 $EDD0: C-----  A2 0D    LDX  #$0D
  0x03EDE2 $EDD2: C-----  A9 A0    LDA  #$A0
  0x03EDE4 $EDD4: C-----  95 01    STA  $01,X
  0x03EDE6 $EDD6: C-----  A9 0B    LDA  #$0B
  0x03EDE8 $EDD8: C-----  95 02    STA  $02,X
  0x03EDEA $EDDA: C-----  A9 7F    LDA  #$7F
  0x03EDEC $EDDC: C-----  A0 FF    LDY  #$FF
  0x03EDEE $EDDE: C-----  20 E7 CA JSR  $CAE7
  0x03EDF1 $EDE1: C-----  4C F5 ED JMP  $EDF5
  0x03EDF4 $EDE4: C-----  A2 0D    LDX  #$0D
  0x03EDF6 $EDE6: C-----  A9 A0    LDA  #$A0
  0x03EDF8 $EDE8: C-----  95 01    STA  $01,X
  0x03EDFA $EDEA: C-----  A9 0B    LDA  #$0B
  0x03EDFC $EDEC: C-----  95 02    STA  $02,X
  0x03EDFE $EDEE: C-----  A9 80    LDA  #$80
  0x03EE00 $EDF0: C-----  A0 02    LDY  #$02
  0x03EE02 $EDF2: C-----  20 E7 CA JSR  $CAE7
  0x03EE05 $EDF5: C-----  2C D2 05 BIT  $05D2
  0x03EE08 $EDF8: C-----  50 37    BVC  $EE31
  0x03EE0A $EDFA: C-----  18       CLC  
  0x03EE0B $EDFB: C-----  AD D6 05 LDA  $05D6
  0x03EE0E $EDFE: C-----  6D D3 05 ADC  $05D3
  0x03EE11 $EE01: C-----  8D D3 05 STA  $05D3
  0x03EE14 $EE04: C-----  A2 00    LDX  #$00
  0x03EE16 $EE06: C-----  AD D7 05 LDA  $05D7
  0x03EE19 $EE09: C-----  65 4B    ADC  $4B
  0x03EE1B $EE0B: C-----  85 4B    STA  $4B
  0x03EE1D $EE0D: C-----  C9 F0    CMP  #$F0
  0x03EE1F $EE0F: C-----  90 0F    BCC  $EE20
  0x03EE21 $EE11: C-----  E8       INX  
  0x03EE22 $EE12: C-----  A9 10    LDA  #$10
  0x03EE24 $EE14: C-----  2C D7 05 BIT  $05D7
  0x03EE27 $EE17: C-----  10 04    BPL  $EE1D
  0x03EE29 $EE19: C-----  A9 F0    LDA  #$F0
  0x03EE2B $EE1B: C-----  CA       DEX  
  0x03EE2C $EE1C: C-----  CA       DEX  
  0x03EE2D $EE1D: C-----  18       CLC  
  0x03EE2E $EE1E: C-----  65 4B    ADC  $4B
  0x03EE30 $EE20: C-----  85 4B    STA  $4B
  0x03EE32 $EE22: C-----  8D D4 05 STA  $05D4
  0x03EE35 $EE25: C-----  18       CLC  
  0x03EE36 $EE26: C-----  8A       TXA  
  0x03EE37 $EE27: C-----  6D D5 05 ADC  $05D5
  0x03EE3A $EE2A: C-----  8D D5 05 STA  $05D5
  0x03EE3D $EE2D: C-----  20 6D EE JSR  $EE6D
  0x03EE40 $EE30: C-----  60       RTS  
  0x03EE41 $EE31: C-----  A5 20    LDA  $20
  0x03EE43 $EE33: C-----  29 FE    AND  #$FE
  0x03EE45 $EE35: C-----  85 20    STA  $20
  0x03EE47 $EE37: C-----  18       CLC  
  0x03EE48 $EE38: C-----  AD D6 05 LDA  $05D6
  0x03EE4B $EE3B: C-----  6D D3 05 ADC  $05D3
  0x03EE4E $EE3E: C-----  8D D3 05 STA  $05D3
  0x03EE51 $EE41: C-----  AD D7 05 LDA  $05D7
  0x03EE54 $EE44: C-----  6D D4 05 ADC  $05D4
  0x03EE57 $EE47: C-----  8D D4 05 STA  $05D4
  0x03EE5A $EE4A: C-----  85 4A    STA  $4A
  0x03EE5C $EE4C: C-----  AA       TAX  
  0x03EE5D $EE4D: C-----  A9 00    LDA  #$00
  0x03EE5F $EE4F: C-----  2C D7 05 BIT  $05D7
  0x03EE62 $EE52: C-----  10 02    BPL  $EE56
  0x03EE64 $EE54: C-----  A9 FF    LDA  #$FF
  0x03EE66 $EE56: C-----  08       PHP  
  0x03EE67 $EE57: C-----  AA       TAX  
  0x03EE68 $EE58: C-----  6D D5 05 ADC  $05D5
  0x03EE6B $EE5B: C-----  8D D5 05 STA  $05D5
  0x03EE6E $EE5E: C-----  29 01    AND  #$01
  0x03EE70 $EE60: C-----  05 20    ORA  $20
  0x03EE72 $EE62: C-----  85 20    STA  $20
  0x03EE74 $EE64: C-----  8A       TXA  
  0x03EE75 $EE65: C-----  28       PLP  
  0x03EE76 $EE66: C-----  69 00    ADC  #$00
  0x03EE78 $EE68: C-----  AA       TAX  
  0x03EE79 $EE69: C-----  20 6D EE JSR  $EE6D
  0x03EE7C $EE6C: C-----  60       RTS  
  0x03EE7D $EE6D: C-----  AD D2 05 LDA  $05D2
  0x03EE80 $EE70: C-----  29 02    AND  #$02
  0x03EE82 $EE72: C-----  F0 2A    BEQ  $EE9E
  0x03EE84 $EE74: C-----  AE D4 05 LDX  $05D4
  0x03EE87 $EE77: C-----  AC D5 05 LDY  $05D5
  0x03EE8A $EE7A: C-----  10 0C    BPL  $EE88
  0x03EE8C $EE7C: C-----  8A       TXA  
  0x03EE8D $EE7D: C-----  49 FF    EOR  #$FF
  0x03EE8F $EE7F: C-----  AA       TAX  
  0x03EE90 $EE80: C-----  98       TYA  
  0x03EE91 $EE81: C-----  49 FF    EOR  #$FF
  0x03EE93 $EE83: C-----  A8       TAY  
  0x03EE94 $EE84: C-----  E8       INX  
  0x03EE95 $EE85: C-----  D0 01    BNE  $EE88
  0x03EE97 $EE87: C-----  C8       INY  
  0x03EE98 $EE88: C-----  8A       TXA  
  0x03EE99 $EE89: C-----  38       SEC  
  0x03EE9A $EE8A: C-----  ED D9 05 SBC  $05D9
  0x03EE9D $EE8D: C-----  98       TYA  
  0x03EE9E $EE8E: C-----  ED DA 05 SBC  $05DA
  0x03EEA1 $EE91: C-----  90 0B    BCC  $EE9E
  0x03EEA3 $EE93: C-----  A9 00    LDA  #$00
  0x03EEA5 $EE95: C-----  8D D2 05 STA  $05D2
  0x03EEA8 $EE98: C-----  A9 00    LDA  #$00
  0x03EEAA $EE9A: C-----  85 0D    STA  $0D
  0x03EEAC $EE9C: C-----  85 0E    STA  $0E
  0x03EEAE $EE9E: C-----  60       RTS  
  0x03EEAF $EE9F: C-----  48       PHA  
  0x03EEB0 $EEA0: C-----  A5 22    LDA  $22
  0x03EEB2 $EEA2: C-----  A9 14    LDA  #$14
  0x03EEB4 $EEA4: C-----  85 24    STA  $24
  0x03EEB6 $EEA6: C-----  A9 15    LDA  #$15
  0x03EEB8 $EEA8: C-----  85 25    STA  $25
  0x03EEBA $EEAA: C-----  20 2D CE JSR  $CE2D
  0x03EEBD $EEAD: C-----  68       PLA  
  0x03EEBE $EEAE: C-----  20 00 80 JSR  $8000
  0x03EEC1 $EEB1: C-----  A9 00    LDA  #$00
  0x03EEC3 $EEB3: C-----  85 3A    STA  $3A
  0x03EEC5 $EEB5: C-----  85 48    STA  $48
  0x03EEC7 $EEB7: C-----  AE 3D 05 LDX  $053D
  0x03EECA $EEBA: C-----  F0 1E    BEQ  $EEDA
  0x03EECC $EEBC: ------  .byte $A9
  0x03EECD $EEBD: ------  .byte $40
  0x03EECE $EEBE: ------  .byte $38
  0x03EECF $EEBF: ------  .byte $ED
  0x03EED0 $EEC0: ------  .byte $3F
  0x03EED1 $EEC1: ------  .byte $05
  0x03EED2 $EEC2: ------  .byte $CD
  0x03EED3 $EEC3: ------  .byte $3E
  0x03EED4 $EEC4: ------  .byte $05
  0x03EED5 $EEC5: ------  .byte $AD
  0x03EED6 $EEC6: ------  .byte $3E
  0x03EED7 $EEC7: ------  .byte $05
  0x03EED8 $EEC8: ------  .byte $B0
  0x03EED9 $EEC9: ------  .byte $02
  0x03EEDA $EECA: ------  .byte $A9
  0x03EEDB $EECB: ------  .byte $00
  0x03EEDC $EECC: ------  .byte $AA
  0x03EEDD $EECD: ------  .byte $18
  0x03EEDE $EECE: ------  .byte $69
  0x03EEDF $EECF: ------  .byte $08
  0x03EEE0 $EED0: ------  .byte $8D
  0x03EEE1 $EED1: ------  .byte $3E
  0x03EEE2 $EED2: ------  .byte $05
  0x03EEE3 $EED3: ------  .byte $8A
  0x03EEE4 $EED4: ------  .byte $18
  0x03EEE5 $EED5: ------  .byte $6D
  0x03EEE6 $EED6: ------  .byte $3F
  0x03EEE7 $EED7: ------  .byte $05
  0x03EEE8 $EED8: ------  .byte $0A
  0x03EEE9 $EED9: ------  .byte $0A
  0x03EEEA $EEDA: C-----  85 3B    STA  $3B
  0x03EEEC $EEDC: C-----  A5 3A    LDA  $3A
  0x03EEEE $EEDE: C-----  4A       LSR  A
  0x03EEEF $EEDF: C-----  AA       TAX  
  0x03EEF0 $EEE0: C-----  BD 43 05 LDA  $0543,X
  0x03EEF3 $EEE3: C-----  B0 04    BCS  $EEE9
  0x03EEF5 $EEE5: C-----  4A       LSR  A
  0x03EEF6 $EEE6: C-----  4A       LSR  A
  0x03EEF7 $EEE7: C-----  4A       LSR  A
  0x03EEF8 $EEE8: C-----  4A       LSR  A
  0x03EEF9 $EEE9: C-----  29 0F    AND  #$0F
  0x03EEFB $EEEB: C-----  0A       ASL  A
  0x03EEFC $EEEC: C-----  AA       TAX  
  0x03EEFD $EEED: C-----  BD 73 EF LDA  $EF73,X
  0x03EF00 $EEF0: C-----  85 3C    STA  $3C
  0x03EF02 $EEF2: C-----  BD 74 EF LDA  $EF74,X
  0x03EF05 $EEF5: C-----  85 3D    STA  $3D
  0x03EF07 $EEF7: C-----  A0 00    LDY  #$00
  0x03EF09 $EEF9: C-----  B1 3C    LDA  ($3C),Y
  0x03EF0B $EEFB: C-----  10 3B    BPL  $EF38
  0x03EF0D $EEFD: C-----  2C 15 06 BIT  $0615
  0x03EF10 $EF00: C-----  70 12    BVS  $EF14
  0x03EF12 $EF02: C-----  48       PHA  
  0x03EF13 $EF03: C-----  A5 22    LDA  $22
  0x03EF15 $EF05: C-----  A9 14    LDA  #$14
  0x03EF17 $EF07: C-----  85 24    STA  $24
  0x03EF19 $EF09: C-----  A9 15    LDA  #$15
  0x03EF1B $EF0B: C-----  85 25    STA  $25
  0x03EF1D $EF0D: C-----  20 2D CE JSR  $CE2D
  0x03EF20 $EF10: C-----  68       PLA  
  0x03EF21 $EF11: C-----  20 06 80 JSR  $8006
  0x03EF24 $EF14: C-----  48       PHA  
  0x03EF25 $EF15: C-----  A5 22    LDA  $22
  0x03EF27 $EF17: C-----  A9 14    LDA  #$14
  0x03EF29 $EF19: C-----  85 24    STA  $24
  0x03EF2B $EF1B: C-----  A9 15    LDA  #$15
  0x03EF2D $EF1D: C-----  85 25    STA  $25
  0x03EF2F $EF1F: C-----  20 2D CE JSR  $CE2D
  0x03EF32 $EF22: C-----  68       PLA  
  0x03EF33 $EF23: C-----  20 03 80 JSR  $8003
  0x03EF36 $EF26: C-----  48       PHA  
  0x03EF37 $EF27: C-----  A5 22    LDA  $22
  0x03EF39 $EF29: C-----  A9 16    LDA  #$16
  0x03EF3B $EF2B: C-----  85 24    STA  $24
  0x03EF3D $EF2D: C-----  A9 17    LDA  #$17
  0x03EF3F $EF2F: C-----  85 25    STA  $25
  0x03EF41 $EF31: C-----  20 2D CE JSR  $CE2D
  0x03EF44 $EF34: C-----  68       PLA  
  0x03EF45 $EF35: C-----  20 00 80 JSR  $8000
  0x03EF48 $EF38: C-----  E6 3A    INC  $3A
  0x03EF4A $EF3A: C-----  A5 3A    LDA  $3A
  0x03EF4C $EF3C: C-----  C9 06    CMP  #$06
  0x03EF4E $EF3E: C-----  D0 9C    BNE  $EEDC
  0x03EF50 $EF40: C-----  2C 2D 06 BIT  $062D
  0x03EF53 $EF43: C-----  10 12    BPL  $EF57
  0x03EF55 $EF45: C-----  48       PHA  
  0x03EF56 $EF46: C-----  A5 22    LDA  $22
  0x03EF58 $EF48: C-----  A9 14    LDA  #$14
  0x03EF5A $EF4A: C-----  85 24    STA  $24
  0x03EF5C $EF4C: C-----  A9 15    LDA  #$15
  0x03EF5E $EF4E: C-----  85 25    STA  $25
  0x03EF60 $EF50: C-----  20 2D CE JSR  $CE2D
  0x03EF63 $EF53: C-----  68       PLA  
  0x03EF64 $EF54: C-----  20 09 80 JSR  $8009
  0x03EF67 $EF57: C-----  A9 40    LDA  #$40
  0x03EF69 $EF59: C-----  38       SEC  
  0x03EF6A $EF5A: C-----  E5 48    SBC  $48
  0x03EF6C $EF5C: C-----  8D 3F 05 STA  $053F
  0x03EF6F $EF5F: C-----  90 11    BCC  $EF72
  0x03EF71 $EF61: C-----  F0 0F    BEQ  $EF72
  0x03EF73 $EF63: C-----  A8       TAY  
  0x03EF74 $EF64: C-----  A6 3B    LDX  $3B
  0x03EF76 $EF66: C-----  A9 F8    LDA  #$F8
  0x03EF78 $EF68: C-----  9D 00 02 STA  $0200,X
  0x03EF7B $EF6B: C-----  E8       INX  
  0x03EF7C $EF6C: C-----  E8       INX  
  0x03EF7D $EF6D: C-----  E8       INX  
  0x03EF7E $EF6E: C-----  E8       INX  
  0x03EF7F $EF6F: C-----  88       DEY  
  0x03EF80 $EF70: C-----  D0 F6    BNE  $EF68
  0x03EF82 $EF72: C-----  60       RTS  
  0x03EF83 $EF73: -D3---  .byte $47
  0x03EF84 $EF74: -D3---  .byte $05
  0x03EF85 $EF75: -D3---  .byte $5C
  0x03EF86 $EF76: -D3---  .byte $05
  0x03EF87 $EF77: -D3---  .byte $71
  0x03EF88 $EF78: -D3---  .byte $05
  0x03EF89 $EF79: -D3---  .byte $86
  0x03EF8A $EF7A: -D3---  .byte $05
  0x03EF8B $EF7B: -D3---  .byte $9B
  0x03EF8C $EF7C: -D3---  .byte $05
  0x03EF8D $EF7D: -D3---  .byte $B0
  0x03EF8E $EF7E: -D3---  .byte $05
  0x03EF8F $EF7F: C-----  A8       TAY  
  0x03EF90 $EF80: C-----  A5 24    LDA  $24
  0x03EF92 $EF82: C-----  48       PHA  
  0x03EF93 $EF83: C-----  A5 25    LDA  $25
  0x03EF95 $EF85: C-----  48       PHA  
  0x03EF96 $EF86: C-----  98       TYA  
  0x03EF97 $EF87: C-----  48       PHA  
  0x03EF98 $EF88: C-----  A5 22    LDA  $22
  0x03EF9A $EF8A: C-----  A9 18    LDA  #$18
  0x03EF9C $EF8C: C-----  85 24    STA  $24
  0x03EF9E $EF8E: C-----  A9 19    LDA  #$19
  0x03EFA0 $EF90: C-----  85 25    STA  $25
  0x03EFA2 $EF92: C-----  20 2D CE JSR  $CE2D
  0x03EFA5 $EF95: C-----  68       PLA  
  0x03EFA6 $EF96: C-----  20 0C 80 JSR  $800C
  0x03EFA9 $EF99: C-----  68       PLA  
  0x03EFAA $EF9A: C-----  85 25    STA  $25
  0x03EFAC $EF9C: C-----  68       PLA  
  0x03EFAD $EF9D: C-----  85 24    STA  $24
  0x03EFAF $EF9F: C-----  4C 2D CE JMP  $CE2D
  0x03EFB2 $EFA2: C-----  AD 21 06 LDA  $0621
  0x03EFB5 $EFA5: C-----  C9 04    CMP  #$04
  0x03EFB7 $EFA7: C-----  90 01    BCC  $EFAA
  0x03EFB9 $EFA9: C-----  60       RTS  
  0x03EFBA $EFAA: C-----  AD 00 06 LDA  $0600
  0x03EFBD $EFAD: C-----  D0 03    BNE  $EFB2
  0x03EFBF $EFAF: C-----  4C F6 EF JMP  $EFF6
  0x03EFC2 $EFB2: C-----  A9 00    LDA  #$00
  0x03EFC4 $EFB4: C-----  48       PHA  
  0x03EFC5 $EFB5: C-----  A9 01    LDA  #$01
  0x03EFC7 $EFB7: C-----  20 0F CB JSR  $CB0F
  0x03EFCA $EFBA: C-----  AD 15 05 LDA  $0515
  0x03EFCD $EFBD: C-----  D0 F6    BNE  $EFB5
  0x03EFCF $EFBF: C-----  A9 01    LDA  #$01
  0x03EFD1 $EFC1: C-----  8D 15 05 STA  $0515
  0x03EFD4 $EFC4: C-----  68       PLA  
  0x03EFD5 $EFC5: C-----  48       PHA  
  0x03EFD6 $EFC6: C-----  AE 21 06 LDX  $0621
  0x03EFD9 $EFC9: C-----  E0 03    CPX  #$03
  0x03EFDB $EFCB: C-----  D0 02    BNE  $EFCF
  0x03EFDD $EFCD: C-----  A9 05    LDA  #$05
  0x03EFDF $EFCF: C-----  0A       ASL  A
  0x03EFE0 $EFD0: C-----  AA       TAX  
  0x03EFE1 $EFD1: C-----  BD 06 F2 LDA  $F206,X
  0x03EFE4 $EFD4: C-----  85 3A    STA  $3A
  0x03EFE6 $EFD6: C-----  BD 07 F2 LDA  $F207,X
  0x03EFE9 $EFD9: C-----  85 3B    STA  $3B
  0x03EFEB $EFDB: C-----  A9 00    LDA  #$00
  0x03EFED $EFDD: C-----  85 3C    STA  $3C
  0x03EFEF $EFDF: C-----  A9 21    LDA  #$21
  0x03EFF1 $EFE1: C-----  85 3D    STA  $3D
  0x03EFF3 $EFE3: C-----  A2 00    LDX  #$00
  0x03EFF5 $EFE5: C-----  20 14 F1 JSR  $F114
  0x03EFF8 $EFE8: C-----  A9 04    LDA  #$04
  0x03EFFA $EFEA: C-----  20 0F CB JSR  $CB0F
  0x03EFFD $EFED: C-----  68       PLA  
  0x03EFFE $EFEE: C-----  18       CLC  
  0x03EFFF $EFEF: C-----  69 01    ADC  #$01
  0x03F001 $EFF1: C-----  CD 00 06 CMP  $0600
  0x03F004 $EFF4: C-----  D0 BE    BNE  $EFB4
  0x03F006 $EFF6: C-----  AE 21 06 LDX  $0621
  0x03F009 $EFF9: C-----  BD 0F F0 LDA  $F00F,X
  0x03F00C $EFFC: C-----  8D 3D 06 STA  $063D
  0x03F00F $EFFF: C-----  8A       TXA  
  0x03F010 $F000: C-----  D0 11    BNE  $F013
  0x03F012 $F002: C-----  AD 00 06 LDA  $0600
  0x03F015 $F005: C-----  D0 0C    BNE  $F013
  0x03F017 $F007: C-----  A9 02    LDA  #$02
  0x03F019 $F009: C-----  8D 3D 06 STA  $063D
  0x03F01C $F00C: C-----  4C 13 F0 JMP  $F013
  0x03F01F $F00F: -D3---  .byte $00
  0x03F020 $F010: -D3---  .byte $00
  0x03F021 $F011: -D3---  .byte $01
  0x03F022 $F012: -D3---  .byte $00
  0x03F023 $F013: C-----  A9 00    LDA  #$00
  0x03F025 $F015: C-----  48       PHA  
  0x03F026 $F016: C-----  A9 01    LDA  #$01
  0x03F028 $F018: C-----  20 0F CB JSR  $CB0F
  0x03F02B $F01B: C-----  AD 15 05 LDA  $0515
  0x03F02E $F01E: C-----  D0 F6    BNE  $F016
  0x03F030 $F020: C-----  A9 01    LDA  #$01
  0x03F032 $F022: C-----  8D 15 05 STA  $0515
  0x03F035 $F025: C-----  AD 3D 06 LDA  $063D
  0x03F038 $F028: C-----  0A       ASL  A
  0x03F039 $F029: C-----  0A       ASL  A
  0x03F03A $F02A: C-----  A8       TAY  
  0x03F03B $F02B: C-----  B9 5A F1 LDA  $F15A,Y
  0x03F03E $F02E: C-----  85 3C    STA  $3C
  0x03F040 $F030: C-----  B9 5B F1 LDA  $F15B,Y
  0x03F043 $F033: C-----  85 3D    STA  $3D
  0x03F045 $F035: C-----  68       PLA  
  0x03F046 $F036: C-----  48       PHA  
  0x03F047 $F037: C-----  AA       TAX  
  0x03F048 $F038: C-----  18       CLC  
  0x03F049 $F039: C-----  B9 5C F1 LDA  $F15C,Y
  0x03F04C $F03C: C-----  7D 0E F1 ADC  $F10E,X
  0x03F04F $F03F: C-----  8D A6 04 STA  $04A6
  0x03F052 $F042: C-----  AD 3D 06 LDA  $063D
  0x03F055 $F045: C-----  C9 03    CMP  #$03
  0x03F057 $F047: C-----  F0 18    BEQ  $F061
  0x03F059 $F049: C-----  AD CE 05 LDA  $05CE
  0x03F05C $F04C: C-----  29 20    AND  #$20
  0x03F05E $F04E: C-----  0D A6 04 ORA  $04A6
  0x03F061 $F051: C-----  8D A6 04 STA  $04A6
  0x03F064 $F054: C-----  AD CE 05 LDA  $05CE
  0x03F067 $F057: C-----  4A       LSR  A
  0x03F068 $F058: C-----  4A       LSR  A
  0x03F069 $F059: C-----  4A       LSR  A
  0x03F06A $F05A: C-----  4A       LSR  A
  0x03F06B $F05B: C-----  19 5D F1 ORA  $F15D,Y
  0x03F06E $F05E: C-----  4C 64 F0 JMP  $F064
  0x03F071 $F061: C-----  B9 5D F1 LDA  $F15D,Y
  0x03F074 $F064: C-----  8D A7 04 STA  $04A7
  0x03F077 $F067: C-----  A9 01    LDA  #$01
  0x03F079 $F069: C-----  8D A5 04 STA  $04A5
  0x03F07C $F06C: C-----  AD 3D 06 LDA  $063D
  0x03F07F $F06F: C-----  0A       ASL  A
  0x03F080 $F070: C-----  85 3B    STA  $3B
  0x03F082 $F072: C-----  0A       ASL  A
  0x03F083 $F073: C-----  65 3B    ADC  $3B
  0x03F085 $F075: C-----  85 3B    STA  $3B
  0x03F087 $F077: C-----  8A       TXA  
  0x03F088 $F078: C-----  65 3B    ADC  $3B
  0x03F08A $F07A: C-----  AA       TAX  
  0x03F08B $F07B: C-----  BD 6A F1 LDA  $F16A,X
  0x03F08E $F07E: C-----  8D A8 04 STA  $04A8
  0x03F091 $F081: C-----  68       PLA  
  0x03F092 $F082: C-----  48       PHA  
  0x03F093 $F083: C-----  0A       ASL  A
  0x03F094 $F084: C-----  AA       TAX  
  0x03F095 $F085: C-----  BD 82 F1 LDA  $F182,X
  0x03F098 $F088: C-----  85 3A    STA  $3A
  0x03F09A $F08A: C-----  BD 83 F1 LDA  $F183,X
  0x03F09D $F08D: C-----  85 3B    STA  $3B
  0x03F09F $F08F: C-----  A2 04    LDX  #$04
  0x03F0A1 $F091: C-----  20 14 F1 JSR  $F114
  0x03F0A4 $F094: C-----  68       PLA  
  0x03F0A5 $F095: C-----  18       CLC  
  0x03F0A6 $F096: C-----  69 01    ADC  #$01
  0x03F0A8 $F098: C-----  C9 06    CMP  #$06
  0x03F0AA $F09A: C-----  F0 03    BEQ  $F09F
  0x03F0AC $F09C: C-----  4C 15 F0 JMP  $F015
  0x03F0AF $F09F: C-----  AD 3D 06 LDA  $063D
  0x03F0B2 $F0A2: C-----  C9 03    CMP  #$03
  0x03F0B4 $F0A4: C-----  F0 67    BEQ  $F10D
  0x03F0B6 $F0A6: C-----  A9 01    LDA  #$01
  0x03F0B8 $F0A8: C-----  20 0F CB JSR  $CB0F
  0x03F0BB $F0AB: C-----  AD 15 05 LDA  $0515
  0x03F0BE $F0AE: C-----  D0 F6    BNE  $F0A6
  0x03F0C0 $F0B0: C-----  A9 01    LDA  #$01
  0x03F0C2 $F0B2: C-----  8D 15 05 STA  $0515
  0x03F0C5 $F0B5: C-----  A9 01    LDA  #$01
  0x03F0C7 $F0B7: C-----  8D A5 04 STA  $04A5
  0x03F0CA $F0BA: C-----  A9 A2    LDA  #$A2
  0x03F0CC $F0BC: C-----  8D A8 04 STA  $04A8
  0x03F0CF $F0BF: C-----  A9 00    LDA  #$00
  0x03F0D1 $F0C1: C-----  85 3B    STA  $3B
  0x03F0D3 $F0C3: C-----  8D A9 04 STA  $04A9
  0x03F0D6 $F0C6: C-----  AD 3D 06 LDA  $063D
  0x03F0D9 $F0C9: C-----  0A       ASL  A
  0x03F0DA $F0CA: C-----  0A       ASL  A
  0x03F0DB $F0CB: C-----  AA       TAX  
  0x03F0DC $F0CC: C-----  AD 37 06 LDA  $0637
  0x03F0DF $F0CF: C-----  38       SEC  
  0x03F0E0 $F0D0: C-----  E9 50    SBC  #$50
  0x03F0E2 $F0D2: C-----  29 F0    AND  #$F0
  0x03F0E4 $F0D4: C-----  0A       ASL  A
  0x03F0E5 $F0D5: C-----  85 3A    STA  $3A
  0x03F0E7 $F0D7: C-----  26 3B    ROL  $3B
  0x03F0E9 $F0D9: C-----  AD 35 06 LDA  $0635
  0x03F0EC $F0DC: C-----  38       SEC  
  0x03F0ED $F0DD: C-----  E9 30    SBC  #$30
  0x03F0EF $F0DF: C-----  4A       LSR  A
  0x03F0F0 $F0E0: C-----  4A       LSR  A
  0x03F0F1 $F0E1: C-----  4A       LSR  A
  0x03F0F2 $F0E2: C-----  4A       LSR  A
  0x03F0F3 $F0E3: C-----  18       CLC  
  0x03F0F4 $F0E4: C-----  65 3A    ADC  $3A
  0x03F0F6 $F0E6: C-----  85 3A    STA  $3A
  0x03F0F8 $F0E8: C-----  90 02    BCC  $F0EC
  0x03F0FA $F0EA: ------  .byte $E6
  0x03F0FB $F0EB: ------  .byte $3B
  0x03F0FC $F0EC: C-----  18       CLC  
  0x03F0FD $F0ED: C-----  7D 5A F1 ADC  $F15A,X
  0x03F100 $F0F0: C-----  8D A6 04 STA  $04A6
  0x03F103 $F0F3: C-----  BD 5B F1 LDA  $F15B,X
  0x03F106 $F0F6: C-----  65 3B    ADC  $3B
  0x03F108 $F0F8: C-----  8D A7 04 STA  $04A7
  0x03F10B $F0FB: C-----  AD CE 05 LDA  $05CE
  0x03F10E $F0FE: C-----  4A       LSR  A
  0x03F10F $F0FF: C-----  4A       LSR  A
  0x03F110 $F100: C-----  4A       LSR  A
  0x03F111 $F101: C-----  4A       LSR  A
  0x03F112 $F102: C-----  0D A7 04 ORA  $04A7
  0x03F115 $F105: C-----  8D A7 04 STA  $04A7
  0x03F118 $F108: C-----  A9 80    LDA  #$80
  0x03F11A $F10A: C-----  8D 15 05 STA  $0515
  0x03F11D $F10D: C-----  60       RTS  
  0x03F11E $F10E: -D3---  .byte $00
  0x03F11F $F10F: -D3---  .byte $01
  0x03F120 $F110: -D3---  .byte $02
  0x03F121 $F111: -D3---  .byte $08
  0x03F122 $F112: -D3---  .byte $09
  0x03F123 $F113: -D3---  .byte $0A
  0x03F124 $F114: C-----  A0 00    LDY  #$00
  0x03F126 $F116: C-----  B1 3A    LDA  ($3A),Y
  0x03F128 $F118: C-----  9D A5 04 STA  $04A5,X
  0x03F12B $F11B: C-----  F0 37    BEQ  $F154
  0x03F12D $F11D: C-----  85 3E    STA  $3E
  0x03F12F $F11F: C-----  C8       INY  
  0x03F130 $F120: C-----  B1 3A    LDA  ($3A),Y
  0x03F132 $F122: C-----  18       CLC  
  0x03F133 $F123: C-----  65 3C    ADC  $3C
  0x03F135 $F125: C-----  9D A6 04 STA  $04A6,X
  0x03F138 $F128: C-----  08       PHP  
  0x03F139 $F129: C-----  C8       INY  
  0x03F13A $F12A: C-----  A5 3D    LDA  $3D
  0x03F13C $F12C: C-----  C9 22    CMP  #$22
  0x03F13E $F12E: C-----  90 04    BCC  $F134
  0x03F140 $F130: C-----  A9 00    LDA  #$00
  0x03F142 $F132: C-----  F0 07    BEQ  $F13B
  0x03F144 $F134: C-----  AD CE 05 LDA  $05CE
  0x03F147 $F137: C-----  4A       LSR  A
  0x03F148 $F138: C-----  4A       LSR  A
  0x03F149 $F139: C-----  4A       LSR  A
  0x03F14A $F13A: C-----  4A       LSR  A
  0x03F14B $F13B: C-----  11 3A    ORA  ($3A),Y
  0x03F14D $F13D: C-----  28       PLP  
  0x03F14E $F13E: C-----  65 3D    ADC  $3D
  0x03F150 $F140: C-----  9D A7 04 STA  $04A7,X
  0x03F153 $F143: C-----  C8       INY  
  0x03F154 $F144: C-----  E8       INX  
  0x03F155 $F145: C-----  E8       INX  
  0x03F156 $F146: C-----  E8       INX  
  0x03F157 $F147: C-----  B1 3A    LDA  ($3A),Y
  0x03F159 $F149: C-----  9D A5 04 STA  $04A5,X
  0x03F15C $F14C: C-----  C8       INY  
  0x03F15D $F14D: C-----  E8       INX  
  0x03F15E $F14E: C-----  C6 3E    DEC  $3E
  0x03F160 $F150: C-----  D0 F5    BNE  $F147
  0x03F162 $F152: C-----  F0 C2    BEQ  $F116
  0x03F164 $F154: C-----  A9 80    LDA  #$80
  0x03F166 $F156: C-----  8D 15 05 STA  $0515
  0x03F169 $F159: C-----  60       RTS  
  0x03F16A $F15A: -D3---  .byte $42
  0x03F16B $F15B: -D3---  .byte $20
  0x03F16C $F15C: -D3---  .byte $C0
  0x03F16D $F15D: -D3---  .byte $23
  0x03F16E $F15E: -D3---  .byte $42
  0x03F16F $F15F: -D3---  .byte $20
  0x03F170 $F160: -D3---  .byte $C0
  0x03F171 $F161: -D3---  .byte $23
  0x03F172 $F162: -D3---  .byte $42
  0x03F173 $F163: -D3---  .byte $20
  0x03F174 $F164: -D3---  .byte $C0
  0x03F175 $F165: -D3---  .byte $23
  0x03F176 $F166: -D3---  .byte $B4
  0x03F177 $F167: -D3---  .byte $22
  0x03F178 $F168: -D3---  .byte $ED
  0x03F179 $F169: -D3---  .byte $23
  0x03F17A $F16A: -D3---  .byte $3A
  0x03F17B $F16B: -D3---  .byte $0A
  0x03F17C $F16C: -D3---  .byte $0A
  0x03F17D $F16D: -D3---  .byte $03
  0x03F17E $F16E: -D3---  .byte $00
  0x03F17F $F16F: -D3---  .byte $00
  0x03F180 $F170: -D3---  .byte $3F
  0x03F181 $F171: -D3---  .byte $0F
  0x03F182 $F172: -D3---  .byte $0F
  0x03F183 $F173: -D3---  .byte $03
  0x03F184 $F174: -D3---  .byte $00
  0x03F185 $F175: -D3---  .byte $00
  0x03F186 $F176: -D3---  .byte $2A
  0x03F187 $F177: -D3---  .byte $0A
  0x03F188 $F178: -D3---  .byte $0A
  0x03F189 $F179: -D3---  .byte $22
  0x03F18A $F17A: -D3---  .byte $00
  0x03F18B $F17B: -D3---  .byte $00
  0x03F18C $F17C: -D3---  .byte $00
  0x03F18D $F17D: -D3---  .byte $00
  0x03F18E $F17E: -D3---  .byte $00
  0x03F18F $F17F: -D3---  .byte $00
  0x03F190 $F180: -D3---  .byte $00
  0x03F191 $F181: -D3---  .byte $00
  0x03F192 $F182: -D3---  .byte $8E
  0x03F193 $F183: -D3---  .byte $F1
  0x03F194 $F184: -D3---  .byte $99
  0x03F195 $F185: -D3---  .byte $F1
  0x03F196 $F186: -D3---  .byte $A8
  0x03F197 $F187: -D3---  .byte $F1
  0x03F198 $F188: -D3---  .byte $B7
  0x03F199 $F189: -D3---  .byte $F1
  0x03F19A $F18A: -D3---  .byte $CC
  0x03F19B $F18B: -D3---  .byte $F1
  0x03F19C $F18C: -D3---  .byte $E9
  0x03F19D $F18D: -D3---  .byte $F1
  0x03F19E $F18E: -D3-I-  .byte $02 ; <indirect ref>
  0x03F19F $F18F: -D3-I-  .byte $00 ; <indirect ref>
  0x03F1A0 $F190: -D3-I-  .byte $00 ; <indirect ref>
  0x03F1A1 $F191: -D3-I-  .byte $98 ; <indirect ref>
  0x03F1A2 $F192: -D3-I-  .byte $AC ; <indirect ref>
  0x03F1A3 $F193: -D3-I-  .byte $02 ; <indirect ref>
  0x03F1A4 $F194: -D3-I-  .byte $20 ; <indirect ref>
  0x03F1A5 $F195: -D3-I-  .byte $00 ; <indirect ref>
  0x03F1A6 $F196: -D3-I-  .byte $98 ; <indirect ref>
  0x03F1A7 $F197: -D3-I-  .byte $99 ; <indirect ref>
  0x03F1A8 $F198: -D3-I-  .byte $00 ; <indirect ref>
  0x03F1A9 $F199: -D3-I-  .byte $04 ; <indirect ref>
  0x03F1AA $F19A: -D3-I-  .byte $02 ; <indirect ref>
  0x03F1AB $F19B: -D3-I-  .byte $00 ; <indirect ref>
  0x03F1AC $F19C: -D3-I-  .byte $AC ; <indirect ref>
  0x03F1AD $F19D: -D3-I-  .byte $AC ; <indirect ref>
  0x03F1AE $F19E: -D3-I-  .byte $99 ; <indirect ref>
  0x03F1AF $F19F: -D3-I-  .byte $AC ; <indirect ref>
  0x03F1B0 $F1A0: -D3-I-  .byte $04 ; <indirect ref>
  0x03F1B1 $F1A1: -D3-I-  .byte $22 ; <indirect ref>
  0x03F1B2 $F1A2: -D3-I-  .byte $00 ; <indirect ref>
  0x03F1B3 $F1A3: -D3-I-  .byte $A0 ; <indirect ref>
  0x03F1B4 $F1A4: -D3-I-  .byte $A0 ; <indirect ref>
  0x03F1B5 $F1A5: -D3-I-  .byte $AF ; <indirect ref>
  0x03F1B6 $F1A6: -D3-I-  .byte $A0 ; <indirect ref>
  0x03F1B7 $F1A7: -D3-I-  .byte $00 ; <indirect ref>
  0x03F1B8 $F1A8: -D3-I-  .byte $04 ; <indirect ref>
  0x03F1B9 $F1A9: -D3-I-  .byte $06 ; <indirect ref>
  0x03F1BA $F1AA: -D3-I-  .byte $00 ; <indirect ref>
  0x03F1BB $F1AB: -D3-I-  .byte $AC ; <indirect ref>
  0x03F1BC $F1AC: -D3-I-  .byte $AC ; <indirect ref>
  0x03F1BD $F1AD: -D3-I-  .byte $AC ; <indirect ref>
  0x03F1BE $F1AE: -D3-I-  .byte $99 ; <indirect ref>
  0x03F1BF $F1AF: -D3-I-  .byte $04 ; <indirect ref>
  0x03F1C0 $F1B0: -D3-I-  .byte $26 ; <indirect ref>
  0x03F1C1 $F1B1: -D3-I-  .byte $00 ; <indirect ref>
  0x03F1C2 $F1B2: -D3-I-  .byte $A0 ; <indirect ref>
  0x03F1C3 $F1B3: -D3-I-  .byte $A0 ; <indirect ref>
  0x03F1C4 $F1B4: -D3-I-  .byte $98 ; <indirect ref>
  0x03F1C5 $F1B5: -D3-I-  .byte $99 ; <indirect ref>
  0x03F1C6 $F1B6: -D3-I-  .byte $00 ; <indirect ref>
  0x03F1C7 $F1B7: -D3-I-  .byte $02 ; <indirect ref>
  0x03F1C8 $F1B8: -D3-I-  .byte $40 ; <indirect ref>
  0x03F1C9 $F1B9: -D3-I-  .byte $00 ; <indirect ref>
  0x03F1CA $F1BA: -D3-I-  .byte $A1 ; <indirect ref>
  0x03F1CB $F1BB: -D3-I-  .byte $AF ; <indirect ref>
  0x03F1CC $F1BC: -D3-I-  .byte $02 ; <indirect ref>
  0x03F1CD $F1BD: -D3-I-  .byte $60 ; <indirect ref>
  0x03F1CE $F1BE: -D3-I-  .byte $00 ; <indirect ref>
  0x03F1CF $F1BF: -D3-I-  .byte $A3 ; <indirect ref>
  0x03F1D0 $F1C0: -D3-I-  .byte $AF ; <indirect ref>
  0x03F1D1 $F1C1: -D3-I-  .byte $02 ; <indirect ref>
  0x03F1D2 $F1C2: -D3-I-  .byte $80 ; <indirect ref>
  0x03F1D3 $F1C3: -D3-I-  .byte $00 ; <indirect ref>
  0x03F1D4 $F1C4: -D3-I-  .byte $9A ; <indirect ref>
  0x03F1D5 $F1C5: -D3-I-  .byte $9B ; <indirect ref>
  0x03F1D6 $F1C6: -D3-I-  .byte $02 ; <indirect ref>
  0x03F1D7 $F1C7: -D3-I-  .byte $A0 ; <indirect ref>
  0x03F1D8 $F1C8: -D3-I-  .byte $00 ; <indirect ref>
  0x03F1D9 $F1C9: -D3-I-  .byte $9A ; <indirect ref>
  0x03F1DA $F1CA: -D3-I-  .byte $AD ; <indirect ref>
  0x03F1DB $F1CB: -D3-I-  .byte $00 ; <indirect ref>
  0x03F1DC $F1CC: -D3-I-  .byte $04 ; <indirect ref>
  0x03F1DD $F1CD: -D3-I-  .byte $42 ; <indirect ref>
  0x03F1DE $F1CE: -D3-I-  .byte $00 ; <indirect ref>
  0x03F1DF $F1CF: -D3-I-  .byte $A0 ; <indirect ref>
  0x03F1E0 $F1D0: -D3-I-  .byte $A0 ; <indirect ref>
  0x03F1E1 $F1D1: -D3-I-  .byte $A4 ; <indirect ref>
  0x03F1E2 $F1D2: -D3-I-  .byte $A5 ; <indirect ref>
  0x03F1E3 $F1D3: -D3-I-  .byte $04 ; <indirect ref>
  0x03F1E4 $F1D4: -D3-I-  .byte $62 ; <indirect ref>
  0x03F1E5 $F1D5: -D3-I-  .byte $00 ; <indirect ref>
  0x03F1E6 $F1D6: -D3-I-  .byte $A0 ; <indirect ref>
  0x03F1E7 $F1D7: -D3-I-  .byte $A0 ; <indirect ref>
  0x03F1E8 $F1D8: -D3-I-  .byte $A6 ; <indirect ref>
  0x03F1E9 $F1D9: -D3-I-  .byte $A7 ; <indirect ref>
  0x03F1EA $F1DA: -D3-I-  .byte $04 ; <indirect ref>
  0x03F1EB $F1DB: -D3-I-  .byte $82 ; <indirect ref>
  0x03F1EC $F1DC: -D3-I-  .byte $00 ; <indirect ref>
  0x03F1ED $F1DD: -D3-I-  .byte $A0 ; <indirect ref>
  0x03F1EE $F1DE: -D3-I-  .byte $A0 ; <indirect ref>
  0x03F1EF $F1DF: -D3-I-  .byte $AF ; <indirect ref>
  0x03F1F0 $F1E0: -D3-I-  .byte $A0 ; <indirect ref>
  0x03F1F1 $F1E1: -D3-I-  .byte $04 ; <indirect ref>
  0x03F1F2 $F1E2: -D3-I-  .byte $A2 ; <indirect ref>
  0x03F1F3 $F1E3: -D3-I-  .byte $00 ; <indirect ref>
  0x03F1F4 $F1E4: -D3-I-  .byte $AD ; <indirect ref>
  0x03F1F5 $F1E5: -D3-I-  .byte $AD ; <indirect ref>
  0x03F1F6 $F1E6: -D3-I-  .byte $9B ; <indirect ref>
  0x03F1F7 $F1E7: -D3-I-  .byte $AD ; <indirect ref>
  0x03F1F8 $F1E8: -D3-I-  .byte $00 ; <indirect ref>
  0x03F1F9 $F1E9: -D3-I-  .byte $04 ; <indirect ref>
  0x03F1FA $F1EA: -D3-I-  .byte $46 ; <indirect ref>
  0x03F1FB $F1EB: -D3-I-  .byte $00 ; <indirect ref>
  0x03F1FC $F1EC: -D3-I-  .byte $A0 ; <indirect ref>
  0x03F1FD $F1ED: -D3-I-  .byte $A0 ; <indirect ref>
  0x03F1FE $F1EE: -D3-I-  .byte $AE ; <indirect ref>
  0x03F1FF $F1EF: -D3-I-  .byte $A1 ; <indirect ref>
  0x03F200 $F1F0: -D3-I-  .byte $04 ; <indirect ref>
  0x03F201 $F1F1: -D3-I-  .byte $66 ; <indirect ref>
  0x03F202 $F1F2: -D3-I-  .byte $00 ; <indirect ref>
  0x03F203 $F1F3: -D3-I-  .byte $A0 ; <indirect ref>
  0x03F204 $F1F4: -D3-I-  .byte $A0 ; <indirect ref>
  0x03F205 $F1F5: -D3-I-  .byte $AE ; <indirect ref>
  0x03F206 $F1F6: -D3-I-  .byte $A3 ; <indirect ref>
  0x03F207 $F1F7: -D3-I-  .byte $04 ; <indirect ref>
  0x03F208 $F1F8: -D3-I-  .byte $86 ; <indirect ref>
  0x03F209 $F1F9: -D3-I-  .byte $00 ; <indirect ref>
  0x03F20A $F1FA: -D3-I-  .byte $A0 ; <indirect ref>
  0x03F20B $F1FB: -D3-I-  .byte $A0 ; <indirect ref>
  0x03F20C $F1FC: -D3-I-  .byte $9A ; <indirect ref>
  0x03F20D $F1FD: -D3-I-  .byte $9B ; <indirect ref>
  0x03F20E $F1FE: -D3-I-  .byte $04 ; <indirect ref>
  0x03F20F $F1FF: -D3-I-  .byte $A6 ; <indirect ref>
  0x03F210 $F200: -D3-I-  .byte $00 ; <indirect ref>
  0x03F211 $F201: -D3-I-  .byte $AD ; <indirect ref>
  0x03F212 $F202: -D3-I-  .byte $AD ; <indirect ref>
  0x03F213 $F203: -D3-I-  .byte $AD ; <indirect ref>
  0x03F214 $F204: -D3-I-  .byte $9B ; <indirect ref>
  0x03F215 $F205: -D3-I-  .byte $00 ; <indirect ref>
  0x03F216 $F206: -D3---  .byte $12
  0x03F217 $F207: -D3---  .byte $F2
  0x03F218 $F208: -D3---  .byte $2E
  0x03F219 $F209: -D3---  .byte $F2
  0x03F21A $F20A: -D3---  .byte $51
  0x03F21B $F20B: -D3---  .byte $F2
  0x03F21C $F20C: -D3---  .byte $77
  0x03F21D $F20D: -D3---  .byte $F2
  0x03F21E $F20E: -D3---  .byte $AD
  0x03F21F $F20F: -D3---  .byte $F2
  0x03F220 $F210: -D3---  .byte $ED
  0x03F221 $F211: -D3---  .byte $F2
  0x03F222 $F212: -D3-I-  .byte $04 ; <indirect ref>
  0x03F223 $F213: -D3-I-  .byte $4E ; <indirect ref>
  0x03F224 $F214: -D3-I-  .byte $00 ; <indirect ref>
  0x03F225 $F215: -D3-I-  .byte $94 ; <indirect ref>
  0x03F226 $F216: -D3-I-  .byte $95 ; <indirect ref>
  0x03F227 $F217: -D3-I-  .byte $C0 ; <indirect ref>
  0x03F228 $F218: -D3-I-  .byte $C1 ; <indirect ref>
  0x03F229 $F219: -D3-I-  .byte $05 ; <indirect ref>
  0x03F22A $F21A: -D3-I-  .byte $6E ; <indirect ref>
  0x03F22B $F21B: -D3-I-  .byte $00 ; <indirect ref>
  0x03F22C $F21C: -D3-I-  .byte $96 ; <indirect ref>
  0x03F22D $F21D: -D3-I-  .byte $97 ; <indirect ref>
  0x03F22E $F21E: -D3-I-  .byte $80 ; <indirect ref>
  0x03F22F $F21F: -D3-I-  .byte $C2 ; <indirect ref>
  0x03F230 $F220: -D3-I-  .byte $E0 ; <indirect ref>
  0x03F231 $F221: -D3-I-  .byte $03 ; <indirect ref>
  0x03F232 $F222: -D3-I-  .byte $8F ; <indirect ref>
  0x03F233 $F223: -D3-I-  .byte $00 ; <indirect ref>
  0x03F234 $F224: -D3-I-  .byte $9D ; <indirect ref>
  0x03F235 $F225: -D3-I-  .byte $80 ; <indirect ref>
  0x03F236 $F226: -D3-I-  .byte $C8 ; <indirect ref>
  0x03F237 $F227: -D3-I-  .byte $03 ; <indirect ref>
  0x03F238 $F228: -D3-I-  .byte $AF ; <indirect ref>
  0x03F239 $F229: -D3-I-  .byte $00 ; <indirect ref>
  0x03F23A $F22A: -D3-I-  .byte $9F ; <indirect ref>
  0x03F23B $F22B: -D3-I-  .byte $CA ; <indirect ref>
  0x03F23C $F22C: -D3-I-  .byte $E2 ; <indirect ref>
  0x03F23D $F22D: -D3-I-  .byte $00 ; <indirect ref>
  0x03F23E $F22E: -D3-I-  .byte $05 ; <indirect ref>
  0x03F23F $F22F: -D3-I-  .byte $34 ; <indirect ref>
  0x03F240 $F230: -D3-I-  .byte $00 ; <indirect ref>
  0x03F241 $F231: -D3-I-  .byte $C3 ; <indirect ref>
  0x03F242 $F232: -D3-I-  .byte $C6 ; <indirect ref>
  0x03F243 $F233: -D3-I-  .byte $C4 ; <indirect ref>
  0x03F244 $F234: -D3-I-  .byte $C5 ; <indirect ref>
  0x03F245 $F235: -D3-I-  .byte $C7 ; <indirect ref>
  0x03F246 $F236: -D3-I-  .byte $04 ; <indirect ref>
  0x03F247 $F237: -D3-I-  .byte $53 ; <indirect ref>
  0x03F248 $F238: -D3-I-  .byte $00 ; <indirect ref>
  0x03F249 $F239: -D3-I-  .byte $BD ; <indirect ref>
  0x03F24A $F23A: -D3-I-  .byte $C9 ; <indirect ref>
  0x03F24B $F23B: -D3-I-  .byte $80 ; <indirect ref>
  0x03F24C $F23C: -D3-I-  .byte $CC ; <indirect ref>
  0x03F24D $F23D: -D3-I-  .byte $04 ; <indirect ref>
  0x03F24E $F23E: -D3-I-  .byte $73 ; <indirect ref>
  0x03F24F $F23F: -D3-I-  .byte $00 ; <indirect ref>
  0x03F250 $F240: -D3-I-  .byte $BF ; <indirect ref>
  0x03F251 $F241: -D3-I-  .byte $CB ; <indirect ref>
  0x03F252 $F242: -D3-I-  .byte $80 ; <indirect ref>
  0x03F253 $F243: -D3-I-  .byte $CE ; <indirect ref>
  0x03F254 $F244: -D3-I-  .byte $03 ; <indirect ref>
  0x03F255 $F245: -D3-I-  .byte $94 ; <indirect ref>
  0x03F256 $F246: -D3-I-  .byte $00 ; <indirect ref>
  0x03F257 $F247: -D3-I-  .byte $E1 ; <indirect ref>
  0x03F258 $F248: -D3-I-  .byte $BE ; <indirect ref>
  0x03F259 $F249: -D3-I-  .byte $E4 ; <indirect ref>
  0x03F25A $F24A: -D3-I-  .byte $03 ; <indirect ref>
  0x03F25B $F24B: -D3-I-  .byte $B4 ; <indirect ref>
  0x03F25C $F24C: -D3-I-  .byte $00 ; <indirect ref>
  0x03F25D $F24D: -D3-I-  .byte $E3 ; <indirect ref>
  0x03F25E $F24E: -D3-I-  .byte $E6 ; <indirect ref>
  0x03F25F $F24F: -D3-I-  .byte $E7 ; <indirect ref>
  0x03F260 $F250: -D3-I-  .byte $00 ; <indirect ref>
  0x03F261 $F251: -D3-I-  .byte $03 ; <indirect ref>
  0x03F262 $F252: -D3-I-  .byte $2A ; <indirect ref>
  0x03F263 $F253: -D3-I-  .byte $00 ; <indirect ref>
  0x03F264 $F254: -D3-I-  .byte $A8 ; <indirect ref>
  0x03F265 $F255: -D3-I-  .byte $A9 ; <indirect ref>
  0x03F266 $F256: -D3-I-  .byte $9C ; <indirect ref>
  0x03F267 $F257: -D3-I-  .byte $04 ; <indirect ref>
  0x03F268 $F258: -D3-I-  .byte $49 ; <indirect ref>
  0x03F269 $F259: -D3-I-  .byte $00 ; <indirect ref>
  0x03F26A $F25A: -D3-I-  .byte $AA ; <indirect ref>
  0x03F26B $F25B: -D3-I-  .byte $80 ; <indirect ref>
  0x03F26C $F25C: -D3-I-  .byte $AB ; <indirect ref>
  0x03F26D $F25D: -D3-I-  .byte $9E ; <indirect ref>
  0x03F26E $F25E: -D3-I-  .byte $05 ; <indirect ref>
  0x03F26F $F25F: -D3-I-  .byte $69 ; <indirect ref>
  0x03F270 $F260: -D3-I-  .byte $00 ; <indirect ref>
  0x03F271 $F261: -D3-I-  .byte $B0 ; <indirect ref>
  0x03F272 $F262: -D3-I-  .byte $80 ; <indirect ref>
  0x03F273 $F263: -D3-I-  .byte $B1 ; <indirect ref>
  0x03F274 $F264: -D3-I-  .byte $B4 ; <indirect ref>
  0x03F275 $F265: -D3-I-  .byte $B5 ; <indirect ref>
  0x03F276 $F266: -D3-I-  .byte $06 ; <indirect ref>
  0x03F277 $F267: -D3-I-  .byte $88 ; <indirect ref>
  0x03F278 $F268: -D3-I-  .byte $00 ; <indirect ref>
  0x03F279 $F269: -D3-I-  .byte $B2 ; <indirect ref>
  0x03F27A $F26A: -D3-I-  .byte $B3 ; <indirect ref>
  0x03F27B $F26B: -D3-I-  .byte $80 ; <indirect ref>
  0x03F27C $F26C: -D3-I-  .byte $BC ; <indirect ref>
  0x03F27D $F26D: -D3-I-  .byte $B6 ; <indirect ref>
  0x03F27E $F26E: -D3-I-  .byte $B7 ; <indirect ref>
  0x03F27F $F26F: -D3-I-  .byte $04 ; <indirect ref>
  0x03F280 $F270: -D3-I-  .byte $A8 ; <indirect ref>
  0x03F281 $F271: -D3-I-  .byte $00 ; <indirect ref>
  0x03F282 $F272: -D3-I-  .byte $B8 ; <indirect ref>
  0x03F283 $F273: -D3-I-  .byte $BA ; <indirect ref>
  0x03F284 $F274: -D3-I-  .byte $B9 ; <indirect ref>
  0x03F285 $F275: -D3-I-  .byte $BB ; <indirect ref>
  0x03F286 $F276: -D3-I-  .byte $00 ; <indirect ref>
  0x03F287 $F277: -D3-I-  .byte $05 ; <indirect ref>
  0x03F288 $F278: -D3-I-  .byte $1A ; <indirect ref>
  0x03F289 $F279: -D3-I-  .byte $00 ; <indirect ref>
  0x03F28A $F27A: -D3-I-  .byte $D0 ; <indirect ref>
  0x03F28B $F27B: -D3-I-  .byte $D1 ; <indirect ref>
  0x03F28C $F27C: -D3-I-  .byte $D4 ; <indirect ref>
  0x03F28D $F27D: -D3-I-  .byte $D5 ; <indirect ref>
  0x03F28E $F27E: -D3-I-  .byte $FB ; <indirect ref>
  0x03F28F $F27F: -D3-I-  .byte $07 ; <indirect ref>
  0x03F290 $F280: -D3-I-  .byte $39 ; <indirect ref>
  0x03F291 $F281: -D3-I-  .byte $00 ; <indirect ref>
  0x03F292 $F282: -D3-I-  .byte $CD ; <indirect ref>
  0x03F293 $F283: -D3-I-  .byte $D2 ; <indirect ref>
  0x03F294 $F284: -D3-I-  .byte $D3 ; <indirect ref>
  0x03F295 $F285: -D3-I-  .byte $80 ; <indirect ref>
  0x03F296 $F286: -D3-I-  .byte $80 ; <indirect ref>
  0x03F297 $F287: -D3-I-  .byte $D6 ; <indirect ref>
  0x03F298 $F288: -D3-I-  .byte $D7 ; <indirect ref>
  0x03F299 $F289: -D3-I-  .byte $06 ; <indirect ref>
  0x03F29A $F28A: -D3-I-  .byte $59 ; <indirect ref>
  0x03F29B $F28B: -D3-I-  .byte $00 ; <indirect ref>
  0x03F29C $F28C: -D3-I-  .byte $CF ; <indirect ref>
  0x03F29D $F28D: -D3-I-  .byte $D8 ; <indirect ref>
  0x03F29E $F28E: -D3-I-  .byte $80 ; <indirect ref>
  0x03F29F $F28F: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2A0 $F290: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2A1 $F291: -D3-I-  .byte $D9 ; <indirect ref>
  0x03F2A2 $F292: -D3-I-  .byte $07 ; <indirect ref>
  0x03F2A3 $F293: -D3-I-  .byte $79 ; <indirect ref>
  0x03F2A4 $F294: -D3-I-  .byte $00 ; <indirect ref>
  0x03F2A5 $F295: -D3-I-  .byte $E5 ; <indirect ref>
  0x03F2A6 $F296: -D3-I-  .byte $DA ; <indirect ref>
  0x03F2A7 $F297: -D3-I-  .byte $FC ; <indirect ref>
  0x03F2A8 $F298: -D3-I-  .byte $FD ; <indirect ref>
  0x03F2A9 $F299: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2AA $F29A: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2AB $F29B: -D3-I-  .byte $DC ; <indirect ref>
  0x03F2AC $F29C: -D3-I-  .byte $05 ; <indirect ref>
  0x03F2AD $F29D: -D3-I-  .byte $9B ; <indirect ref>
  0x03F2AE $F29E: -D3-I-  .byte $00 ; <indirect ref>
  0x03F2AF $F29F: -D3-I-  .byte $DB ; <indirect ref>
  0x03F2B0 $F2A0: -D3-I-  .byte $DD ; <indirect ref>
  0x03F2B1 $F2A1: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2B2 $F2A2: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2B3 $F2A3: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2B4 $F2A4: -D3-I-  .byte $05 ; <indirect ref>
  0x03F2B5 $F2A5: -D3-I-  .byte $BB ; <indirect ref>
  0x03F2B6 $F2A6: -D3-I-  .byte $00 ; <indirect ref>
  0x03F2B7 $F2A7: -D3-I-  .byte $9F ; <indirect ref>
  0x03F2B8 $F2A8: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2B9 $F2A9: -D3-I-  .byte $BA ; <indirect ref>
  0x03F2BA $F2AA: -D3-I-  .byte $DE ; <indirect ref>
  0x03F2BB $F2AB: -D3-I-  .byte $DF ; <indirect ref>
  0x03F2BC $F2AC: -D3-I-  .byte $00 ; <indirect ref>
  0x03F2BD $F2AD: -D3-I-  .byte $04 ; <indirect ref>
  0x03F2BE $F2AE: -D3-I-  .byte $01 ; <indirect ref>
  0x03F2BF $F2AF: -D3-I-  .byte $00 ; <indirect ref>
  0x03F2C0 $F2B0: -D3-I-  .byte $84 ; <indirect ref>
  0x03F2C1 $F2B1: -D3-I-  .byte $85 ; <indirect ref>
  0x03F2C2 $F2B2: -D3-I-  .byte $90 ; <indirect ref>
  0x03F2C3 $F2B3: -D3-I-  .byte $91 ; <indirect ref>
  0x03F2C4 $F2B4: -D3-I-  .byte $05 ; <indirect ref>
  0x03F2C5 $F2B5: -D3-I-  .byte $20 ; <indirect ref>
  0x03F2C6 $F2B6: -D3-I-  .byte $00 ; <indirect ref>
  0x03F2C7 $F2B7: -D3-I-  .byte $82 ; <indirect ref>
  0x03F2C8 $F2B8: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2C9 $F2B9: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2CA $F2BA: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2CB $F2BB: -D3-I-  .byte $93 ; <indirect ref>
  0x03F2CC $F2BC: -D3-I-  .byte $06 ; <indirect ref>
  0x03F2CD $F2BD: -D3-I-  .byte $40 ; <indirect ref>
  0x03F2CE $F2BE: -D3-I-  .byte $00 ; <indirect ref>
  0x03F2CF $F2BF: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2D0 $F2C0: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2D1 $F2C1: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2D2 $F2C2: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2D3 $F2C3: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2D4 $F2C4: -D3-I-  .byte $88 ; <indirect ref>
  0x03F2D5 $F2C5: -D3-I-  .byte $02 ; <indirect ref>
  0x03F2D6 $F2C6: -D3-I-  .byte $47 ; <indirect ref>
  0x03F2D7 $F2C7: -D3-I-  .byte $00 ; <indirect ref>
  0x03F2D8 $F2C8: -D3-I-  .byte $83 ; <indirect ref>
  0x03F2D9 $F2C9: -D3-I-  .byte $86 ; <indirect ref>
  0x03F2DA $F2CA: -D3-I-  .byte $09 ; <indirect ref>
  0x03F2DB $F2CB: -D3-I-  .byte $60 ; <indirect ref>
  0x03F2DC $F2CC: -D3-I-  .byte $00 ; <indirect ref>
  0x03F2DD $F2CD: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2DE $F2CE: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2DF $F2CF: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2E0 $F2D0: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2E1 $F2D1: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2E2 $F2D2: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2E3 $F2D3: -D3-I-  .byte $8A ; <indirect ref>
  0x03F2E4 $F2D4: -D3-I-  .byte $89 ; <indirect ref>
  0x03F2E5 $F2D5: -D3-I-  .byte $8C ; <indirect ref>
  0x03F2E6 $F2D6: -D3-I-  .byte $08 ; <indirect ref>
  0x03F2E7 $F2D7: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2E8 $F2D8: -D3-I-  .byte $00 ; <indirect ref>
  0x03F2E9 $F2D9: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2EA $F2DA: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2EB $F2DB: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2EC $F2DC: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2ED $F2DD: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2EE $F2DE: -D3-I-  .byte $8D ; <indirect ref>
  0x03F2EF $F2DF: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2F0 $F2E0: -D3-I-  .byte $8B ; <indirect ref>
  0x03F2F1 $F2E1: -D3-I-  .byte $08 ; <indirect ref>
  0x03F2F2 $F2E2: -D3-I-  .byte $A0 ; <indirect ref>
  0x03F2F3 $F2E3: -D3-I-  .byte $00 ; <indirect ref>
  0x03F2F4 $F2E4: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2F5 $F2E5: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2F6 $F2E6: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2F7 $F2E7: -D3-I-  .byte $80 ; <indirect ref>
  0x03F2F8 $F2E8: -D3-I-  .byte $8E ; <indirect ref>
  0x03F2F9 $F2E9: -D3-I-  .byte $8F ; <indirect ref>
  0x03F2FA $F2EA: -D3-I-  .byte $87 ; <indirect ref>
  0x03F2FB $F2EB: -D3-I-  .byte $92 ; <indirect ref>
  0x03F2FC $F2EC: -D3-I-  .byte $00 ; <indirect ref>
  0x03F2FD $F2ED: -D3-I-  .byte $02 ; <indirect ref>
  0x03F2FE $F2EE: -D3-I-  .byte $4F ; <indirect ref>
  0x03F2FF $F2EF: -D3-I-  .byte $00 ; <indirect ref>
  0x03F300 $F2F0: -D3-I-  .byte $D4 ; <indirect ref>
  0x03F301 $F2F1: -D3-I-  .byte $D5 ; <indirect ref>
  0x03F302 $F2F2: -D3-I-  .byte $04 ; <indirect ref>
  0x03F303 $F2F3: -D3-I-  .byte $6D ; <indirect ref>
  0x03F304 $F2F4: -D3-I-  .byte $00 ; <indirect ref>
  0x03F305 $F2F5: -D3-I-  .byte $D2 ; <indirect ref>
  0x03F306 $F2F6: -D3-I-  .byte $D3 ; <indirect ref>
  0x03F307 $F2F7: -D3-I-  .byte $00 ; <indirect ref>
  0x03F308 $F2F8: -D3-I-  .byte $D7 ; <indirect ref>
  0x03F309 $F2F9: -D3-I-  .byte $01 ; <indirect ref>
  0x03F30A $F2FA: -D3-I-  .byte $72 ; <indirect ref>
  0x03F30B $F2FB: -D3-I-  .byte $00 ; <indirect ref>
  0x03F30C $F2FC: -D3-I-  .byte $D6 ; <indirect ref>
  0x03F30D $F2FD: -D3-I-  .byte $06 ; <indirect ref>
  0x03F30E $F2FE: -D3-I-  .byte $8D ; <indirect ref>
  0x03F30F $F2FF: -D3-I-  .byte $00 ; <indirect ref>
  0x03F310 $F300: -D3-I-  .byte $D8 ; <indirect ref>
  0x03F311 $F301: -D3-I-  .byte $00 ; <indirect ref>
  0x03F312 $F302: -D3-I-  .byte $00 ; <indirect ref>
  0x03F313 $F303: -D3-I-  .byte $DD ; <indirect ref>
  0x03F314 $F304: -D3-I-  .byte $D9 ; <indirect ref>
  0x03F315 $F305: -D3-I-  .byte $DC ; <indirect ref>
  0x03F316 $F306: -D3-I-  .byte $05 ; <indirect ref>
  0x03F317 $F307: -D3-I-  .byte $AD ; <indirect ref>
  0x03F318 $F308: -D3-I-  .byte $00 ; <indirect ref>
  0x03F319 $F309: -D3-I-  .byte $DA ; <indirect ref>
  0x03F31A $F30A: -D3-I-  .byte $DB ; <indirect ref>
  0x03F31B $F30B: -D3-I-  .byte $DE ; <indirect ref>
  0x03F31C $F30C: -D3-I-  .byte $DF ; <indirect ref>
  0x03F31D $F30D: -D3-I-  .byte $D1 ; <indirect ref>
  0x03F31E $F30E: -D3-I-  .byte $00 ; <indirect ref>
  0x03F31F $F30F: C-----  A0 29    LDY  #$29
  0x03F321 $F311: C-----  84 30    STY  $30
  0x03F323 $F313: C-----  A0 F3    LDY  #$F3
  0x03F325 $F315: C-----  84 31    STY  $31
  0x03F327 $F317: C-----  0A       ASL  A
  0x03F328 $F318: C-----  90 02    BCC  $F31C
  0x03F32A $F31A: C-----  E6 31    INC  $31
  0x03F32C $F31C: C-----  A8       TAY  
  0x03F32D $F31D: C-----  B1 30    LDA  ($30),Y
  0x03F32F $F31F: C-----  48       PHA  
  0x03F330 $F320: C-----  C8       INY  
  0x03F331 $F321: C-----  B1 30    LDA  ($30),Y
  0x03F333 $F323: C-----  85 31    STA  $31
  0x03F335 $F325: C-----  68       PLA  
  0x03F336 $F326: C-----  85 30    STA  $30
  0x03F338 $F328: C-----  60       RTS  
  0x03F339 $F329: -D3-I-  .byte $EB ; <indirect ref>
  0x03F33A $F32A: -D3-I-  .byte $05 ; <indirect ref>
  0x03F33B $F32B: -D3-I-  .byte $09 ; <indirect ref>
  0x03F33C $F32C: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F33D $F32D: -D3-I-  .byte $0D ; <indirect ref>
  0x03F33E $F32E: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F33F $F32F: -D3-I-  .byte $12 ; <indirect ref>
  0x03F340 $F330: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F341 $F331: -D3-I-  .byte $15 ; <indirect ref>
  0x03F342 $F332: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F343 $F333: -D3-I-  .byte $1A ; <indirect ref>
  0x03F344 $F334: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F345 $F335: -D3-I-  .byte $1F ; <indirect ref>
  0x03F346 $F336: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F347 $F337: -D3-I-  .byte $24 ; <indirect ref>
  0x03F348 $F338: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F349 $F339: -D3-I-  .byte $29 ; <indirect ref>
  0x03F34A $F33A: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F34B $F33B: -D3-I-  .byte $2E ; <indirect ref>
  0x03F34C $F33C: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F34D $F33D: -D3-I-  .byte $34 ; <indirect ref>
  0x03F34E $F33E: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F34F $F33F: -D3-I-  .byte $37 ; <indirect ref>
  0x03F350 $F340: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F351 $F341: -D3-I-  .byte $3C ; <indirect ref>
  0x03F352 $F342: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F353 $F343: -D3-I-  .byte $40 ; <indirect ref>
  0x03F354 $F344: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F355 $F345: -D3-I-  .byte $44 ; <indirect ref>
  0x03F356 $F346: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F357 $F347: -D3-I-  .byte $49 ; <indirect ref>
  0x03F358 $F348: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F359 $F349: -D3-I-  .byte $4E ; <indirect ref>
  0x03F35A $F34A: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F35B $F34B: -D3-I-  .byte $53 ; <indirect ref>
  0x03F35C $F34C: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F35D $F34D: -D3-I-  .byte $57 ; <indirect ref>
  0x03F35E $F34E: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F35F $F34F: -D3-I-  .byte $5B ; <indirect ref>
  0x03F360 $F350: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F361 $F351: -D3-I-  .byte $5E ; <indirect ref>
  0x03F362 $F352: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F363 $F353: -D3-I-  .byte $63 ; <indirect ref>
  0x03F364 $F354: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F365 $F355: -D3-I-  .byte $67 ; <indirect ref>
  0x03F366 $F356: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F367 $F357: -D3-I-  .byte $6B ; <indirect ref>
  0x03F368 $F358: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F369 $F359: -D3-I-  .byte $6F ; <indirect ref>
  0x03F36A $F35A: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F36B $F35B: -D3-I-  .byte $73 ; <indirect ref>
  0x03F36C $F35C: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F36D $F35D: -D3-I-  .byte $76 ; <indirect ref>
  0x03F36E $F35E: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F36F $F35F: -D3-I-  .byte $7B ; <indirect ref>
  0x03F370 $F360: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F371 $F361: -D3-I-  .byte $7F ; <indirect ref>
  0x03F372 $F362: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F373 $F363: -D3-I-  .byte $83 ; <indirect ref>
  0x03F374 $F364: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F375 $F365: -D3-I-  .byte $88 ; <indirect ref>
  0x03F376 $F366: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F377 $F367: -D3-I-  .byte $8D ; <indirect ref>
  0x03F378 $F368: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F379 $F369: -D3-I-  .byte $91 ; <indirect ref>
  0x03F37A $F36A: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F37B $F36B: -D3-I-  .byte $95 ; <indirect ref>
  0x03F37C $F36C: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F37D $F36D: -D3-I-  .byte $9B ; <indirect ref>
  0x03F37E $F36E: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F37F $F36F: -D3-I-  .byte $A1 ; <indirect ref>
  0x03F380 $F370: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F381 $F371: -D3-I-  .byte $A8 ; <indirect ref>
  0x03F382 $F372: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F383 $F373: -D3-I-  .byte $AD ; <indirect ref>
  0x03F384 $F374: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F385 $F375: -D3-I-  .byte $B3 ; <indirect ref>
  0x03F386 $F376: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F387 $F377: -D3-I-  .byte $B7 ; <indirect ref>
  0x03F388 $F378: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F389 $F379: -D3-I-  .byte $BD ; <indirect ref>
  0x03F38A $F37A: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F38B $F37B: -D3-I-  .byte $C0 ; <indirect ref>
  0x03F38C $F37C: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F38D $F37D: -D3-I-  .byte $C4 ; <indirect ref>
  0x03F38E $F37E: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F38F $F37F: -D3-I-  .byte $CA ; <indirect ref>
  0x03F390 $F380: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F391 $F381: -D3-I-  .byte $CF ; <indirect ref>
  0x03F392 $F382: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F393 $F383: -D3-I-  .byte $D6 ; <indirect ref>
  0x03F394 $F384: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F395 $F385: -D3-I-  .byte $DD ; <indirect ref>
  0x03F396 $F386: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F397 $F387: -D3-I-  .byte $E1 ; <indirect ref>
  0x03F398 $F388: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F399 $F389: -D3-I-  .byte $E4 ; <indirect ref>
  0x03F39A $F38A: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F39B $F38B: -D3-I-  .byte $E8 ; <indirect ref>
  0x03F39C $F38C: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F39D $F38D: -D3-I-  .byte $EC ; <indirect ref>
  0x03F39E $F38E: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F39F $F38F: -D3-I-  .byte $F0 ; <indirect ref>
  0x03F3A0 $F390: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F3A1 $F391: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F3A2 $F392: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F3A3 $F393: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F3A4 $F394: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F3A5 $F395: -D3-I-  .byte $FE ; <indirect ref>
  0x03F3A6 $F396: -D3-I-  .byte $F5 ; <indirect ref>
  0x03F3A7 $F397: -D3-I-  .byte $03 ; <indirect ref>
  0x03F3A8 $F398: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3A9 $F399: -D3-I-  .byte $08 ; <indirect ref>
  0x03F3AA $F39A: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3AB $F39B: -D3-I-  .byte $0C ; <indirect ref>
  0x03F3AC $F39C: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3AD $F39D: -D3-I-  .byte $12 ; <indirect ref>
  0x03F3AE $F39E: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3AF $F39F: -D3-I-  .byte $18 ; <indirect ref>
  0x03F3B0 $F3A0: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3B1 $F3A1: -D3-I-  .byte $1F ; <indirect ref>
  0x03F3B2 $F3A2: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3B3 $F3A3: -D3-I-  .byte $25 ; <indirect ref>
  0x03F3B4 $F3A4: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3B5 $F3A5: -D3-I-  .byte $2B ; <indirect ref>
  0x03F3B6 $F3A6: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3B7 $F3A7: -D3-I-  .byte $2F ; <indirect ref>
  0x03F3B8 $F3A8: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3B9 $F3A9: -D3-I-  .byte $34 ; <indirect ref>
  0x03F3BA $F3AA: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3BB $F3AB: -D3-I-  .byte $3A ; <indirect ref>
  0x03F3BC $F3AC: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3BD $F3AD: -D3-I-  .byte $3F ; <indirect ref>
  0x03F3BE $F3AE: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3BF $F3AF: -D3-I-  .byte $43 ; <indirect ref>
  0x03F3C0 $F3B0: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3C1 $F3B1: -D3-I-  .byte $46 ; <indirect ref>
  0x03F3C2 $F3B2: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3C3 $F3B3: -D3-I-  .byte $4A ; <indirect ref>
  0x03F3C4 $F3B4: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3C5 $F3B5: -D3-I-  .byte $4E ; <indirect ref>
  0x03F3C6 $F3B6: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3C7 $F3B7: -D3-I-  .byte $52 ; <indirect ref>
  0x03F3C8 $F3B8: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3C9 $F3B9: -D3-I-  .byte $56 ; <indirect ref>
  0x03F3CA $F3BA: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3CB $F3BB: -D3-I-  .byte $5A ; <indirect ref>
  0x03F3CC $F3BC: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3CD $F3BD: -D3-I-  .byte $5F ; <indirect ref>
  0x03F3CE $F3BE: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3CF $F3BF: -D3-I-  .byte $63 ; <indirect ref>
  0x03F3D0 $F3C0: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3D1 $F3C1: -D3-I-  .byte $68 ; <indirect ref>
  0x03F3D2 $F3C2: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3D3 $F3C3: -D3-I-  .byte $6E ; <indirect ref>
  0x03F3D4 $F3C4: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3D5 $F3C5: -D3-I-  .byte $74 ; <indirect ref>
  0x03F3D6 $F3C6: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3D7 $F3C7: -D3-I-  .byte $7B ; <indirect ref>
  0x03F3D8 $F3C8: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3D9 $F3C9: -D3-I-  .byte $7E ; <indirect ref>
  0x03F3DA $F3CA: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3DB $F3CB: -D3-I-  .byte $81 ; <indirect ref>
  0x03F3DC $F3CC: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3DD $F3CD: -D3-I-  .byte $86 ; <indirect ref>
  0x03F3DE $F3CE: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3DF $F3CF: -D3-I-  .byte $8C ; <indirect ref>
  0x03F3E0 $F3D0: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3E1 $F3D1: -D3-I-  .byte $91 ; <indirect ref>
  0x03F3E2 $F3D2: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3E3 $F3D3: -D3-I-  .byte $96 ; <indirect ref>
  0x03F3E4 $F3D4: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3E5 $F3D5: -D3-I-  .byte $9B ; <indirect ref>
  0x03F3E6 $F3D6: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3E7 $F3D7: -D3-I-  .byte $9F ; <indirect ref>
  0x03F3E8 $F3D8: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3E9 $F3D9: -D3-I-  .byte $A5 ; <indirect ref>
  0x03F3EA $F3DA: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3EB $F3DB: -D3-I-  .byte $AA ; <indirect ref>
  0x03F3EC $F3DC: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3ED $F3DD: -D3-I-  .byte $B1 ; <indirect ref>
  0x03F3EE $F3DE: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3EF $F3DF: -D3-I-  .byte $B7 ; <indirect ref>
  0x03F3F0 $F3E0: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3F1 $F3E1: -D3-I-  .byte $BE ; <indirect ref>
  0x03F3F2 $F3E2: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3F3 $F3E3: -D3-I-  .byte $C3 ; <indirect ref>
  0x03F3F4 $F3E4: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3F5 $F3E5: -D3-I-  .byte $C7 ; <indirect ref>
  0x03F3F6 $F3E6: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3F7 $F3E7: -D3-I-  .byte $CC ; <indirect ref>
  0x03F3F8 $F3E8: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3F9 $F3E9: -D3-I-  .byte $D3 ; <indirect ref>
  0x03F3FA $F3EA: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3FB $F3EB: -D3-I-  .byte $D8 ; <indirect ref>
  0x03F3FC $F3EC: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3FD $F3ED: -D3-I-  .byte $DE ; <indirect ref>
  0x03F3FE $F3EE: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F3FF $F3EF: -D3-I-  .byte $E3 ; <indirect ref>
  0x03F400 $F3F0: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F401 $F3F1: -D3-I-  .byte $EA ; <indirect ref>
  0x03F402 $F3F2: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F403 $F3F3: -D3-I-  .byte $EF ; <indirect ref>
  0x03F404 $F3F4: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F405 $F3F5: -D3-I-  .byte $F3 ; <indirect ref>
  0x03F406 $F3F6: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F407 $F3F7: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F408 $F3F8: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F409 $F3F9: -D3-I-  .byte $FE ; <indirect ref>
  0x03F40A $F3FA: -D3-I-  .byte $F6 ; <indirect ref>
  0x03F40B $F3FB: -D3-I-  .byte $04 ; <indirect ref>
  0x03F40C $F3FC: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F40D $F3FD: -D3-I-  .byte $0A ; <indirect ref>
  0x03F40E $F3FE: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F40F $F3FF: -D3-I-  .byte $0F ; <indirect ref>
  0x03F410 $F400: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F411 $F401: -D3-I-  .byte $13 ; <indirect ref>
  0x03F412 $F402: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F413 $F403: -D3-I-  .byte $18 ; <indirect ref>
  0x03F414 $F404: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F415 $F405: -D3-I-  .byte $1B ; <indirect ref>
  0x03F416 $F406: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F417 $F407: -D3-I-  .byte $22 ; <indirect ref>
  0x03F418 $F408: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F419 $F409: -D3-I-  .byte $28 ; <indirect ref>
  0x03F41A $F40A: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F41B $F40B: -D3-I-  .byte $2D ; <indirect ref>
  0x03F41C $F40C: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F41D $F40D: -D3-I-  .byte $32 ; <indirect ref>
  0x03F41E $F40E: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F41F $F40F: -D3-I-  .byte $38 ; <indirect ref>
  0x03F420 $F410: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F421 $F411: -D3-I-  .byte $3F ; <indirect ref>
  0x03F422 $F412: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F423 $F413: -D3-I-  .byte $45 ; <indirect ref>
  0x03F424 $F414: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F425 $F415: -D3-I-  .byte $4B ; <indirect ref>
  0x03F426 $F416: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F427 $F417: -D3-I-  .byte $51 ; <indirect ref>
  0x03F428 $F418: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F429 $F419: -D3-I-  .byte $56 ; <indirect ref>
  0x03F42A $F41A: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F42B $F41B: -D3-I-  .byte $5A ; <indirect ref>
  0x03F42C $F41C: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F42D $F41D: -D3-I-  .byte $61 ; <indirect ref>
  0x03F42E $F41E: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F42F $F41F: -D3-I-  .byte $69 ; <indirect ref>
  0x03F430 $F420: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F431 $F421: -D3-I-  .byte $6E ; <indirect ref>
  0x03F432 $F422: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F433 $F423: -D3-I-  .byte $75 ; <indirect ref>
  0x03F434 $F424: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F435 $F425: -D3-I-  .byte $7A ; <indirect ref>
  0x03F436 $F426: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F437 $F427: -D3-I-  .byte $80 ; <indirect ref>
  0x03F438 $F428: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F439 $F429: -D3-I-  .byte $84 ; <indirect ref>
  0x03F43A $F42A: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F43B $F42B: -D3-I-  .byte $88 ; <indirect ref>
  0x03F43C $F42C: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F43D $F42D: -D3-I-  .byte $8D ; <indirect ref>
  0x03F43E $F42E: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F43F $F42F: -D3-I-  .byte $91 ; <indirect ref>
  0x03F440 $F430: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F441 $F431: -D3-I-  .byte $95 ; <indirect ref>
  0x03F442 $F432: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F443 $F433: -D3-I-  .byte $9A ; <indirect ref>
  0x03F444 $F434: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F445 $F435: -D3-I-  .byte $9E ; <indirect ref>
  0x03F446 $F436: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F447 $F437: -D3-I-  .byte $A4 ; <indirect ref>
  0x03F448 $F438: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F449 $F439: -D3-I-  .byte $AB ; <indirect ref>
  0x03F44A $F43A: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F44B $F43B: -D3-I-  .byte $AF ; <indirect ref>
  0x03F44C $F43C: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F44D $F43D: -D3-I-  .byte $B3 ; <indirect ref>
  0x03F44E $F43E: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F44F $F43F: -D3-I-  .byte $B9 ; <indirect ref>
  0x03F450 $F440: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F451 $F441: -D3-I-  .byte $BD ; <indirect ref>
  0x03F452 $F442: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F453 $F443: -D3-I-  .byte $C5 ; <indirect ref>
  0x03F454 $F444: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F455 $F445: -D3-I-  .byte $CD ; <indirect ref>
  0x03F456 $F446: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F457 $F447: -D3-I-  .byte $D2 ; <indirect ref>
  0x03F458 $F448: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F459 $F449: -D3-I-  .byte $DB ; <indirect ref>
  0x03F45A $F44A: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F45B $F44B: -D3-I-  .byte $E1 ; <indirect ref>
  0x03F45C $F44C: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F45D $F44D: -D3-I-  .byte $E8 ; <indirect ref>
  0x03F45E $F44E: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F45F $F44F: -D3-I-  .byte $ED ; <indirect ref>
  0x03F460 $F450: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F461 $F451: -D3-I-  .byte $F2 ; <indirect ref>
  0x03F462 $F452: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F463 $F453: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F464 $F454: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F465 $F455: -D3-I-  .byte $FC ; <indirect ref>
  0x03F466 $F456: -D3-I-  .byte $F7 ; <indirect ref>
  0x03F467 $F457: -D3-I-  .byte $01 ; <indirect ref>
  0x03F468 $F458: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F469 $F459: -D3-I-  .byte $08 ; <indirect ref>
  0x03F46A $F45A: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F46B $F45B: -D3-I-  .byte $0E ; <indirect ref>
  0x03F46C $F45C: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F46D $F45D: -D3-I-  .byte $13 ; <indirect ref>
  0x03F46E $F45E: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F46F $F45F: -D3-I-  .byte $18 ; <indirect ref>
  0x03F470 $F460: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F471 $F461: -D3-I-  .byte $20 ; <indirect ref>
  0x03F472 $F462: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F473 $F463: -D3-I-  .byte $26 ; <indirect ref>
  0x03F474 $F464: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F475 $F465: -D3-I-  .byte $2F ; <indirect ref>
  0x03F476 $F466: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F477 $F467: -D3-I-  .byte $3B ; <indirect ref>
  0x03F478 $F468: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F479 $F469: -D3-I-  .byte $44 ; <indirect ref>
  0x03F47A $F46A: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F47B $F46B: -D3-I-  .byte $50 ; <indirect ref>
  0x03F47C $F46C: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F47D $F46D: -D3-I-  .byte $59 ; <indirect ref>
  0x03F47E $F46E: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F47F $F46F: -D3-I-  .byte $64 ; <indirect ref>
  0x03F480 $F470: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F481 $F471: -D3-I-  .byte $6C ; <indirect ref>
  0x03F482 $F472: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F483 $F473: -D3-I-  .byte $79 ; <indirect ref>
  0x03F484 $F474: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F485 $F475: -D3-I-  .byte $82 ; <indirect ref>
  0x03F486 $F476: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F487 $F477: -D3-I-  .byte $8B ; <indirect ref>
  0x03F488 $F478: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F489 $F479: -D3-I-  .byte $97 ; <indirect ref>
  0x03F48A $F47A: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F48B $F47B: -D3-I-  .byte $A2 ; <indirect ref>
  0x03F48C $F47C: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F48D $F47D: -D3-I-  .byte $AE ; <indirect ref>
  0x03F48E $F47E: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F48F $F47F: -D3-I-  .byte $BC ; <indirect ref>
  0x03F490 $F480: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F491 $F481: -D3-I-  .byte $C5 ; <indirect ref>
  0x03F492 $F482: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F493 $F483: -D3-I-  .byte $CB ; <indirect ref>
  0x03F494 $F484: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F495 $F485: -D3-I-  .byte $D6 ; <indirect ref>
  0x03F496 $F486: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F497 $F487: -D3-I-  .byte $DE ; <indirect ref>
  0x03F498 $F488: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F499 $F489: -D3-I-  .byte $E8 ; <indirect ref>
  0x03F49A $F48A: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F49B $F48B: -D3-I-  .byte $F2 ; <indirect ref>
  0x03F49C $F48C: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F49D $F48D: -D3-I-  .byte $FA ; <indirect ref>
  0x03F49E $F48E: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F49F $F48F: -D3-I-  .byte $03 ; <indirect ref>
  0x03F4A0 $F490: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4A1 $F491: -D3-I-  .byte $0D ; <indirect ref>
  0x03F4A2 $F492: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4A3 $F493: -D3-I-  .byte $16 ; <indirect ref>
  0x03F4A4 $F494: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4A5 $F495: -D3-I-  .byte $20 ; <indirect ref>
  0x03F4A6 $F496: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4A7 $F497: -D3-I-  .byte $2A ; <indirect ref>
  0x03F4A8 $F498: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4A9 $F499: -D3-I-  .byte $32 ; <indirect ref>
  0x03F4AA $F49A: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4AB $F49B: -D3-I-  .byte $3A ; <indirect ref>
  0x03F4AC $F49C: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4AD $F49D: -D3-I-  .byte $44 ; <indirect ref>
  0x03F4AE $F49E: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4AF $F49F: -D3-I-  .byte $4D ; <indirect ref>
  0x03F4B0 $F4A0: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4B1 $F4A1: -D3-I-  .byte $57 ; <indirect ref>
  0x03F4B2 $F4A2: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4B3 $F4A3: -D3-I-  .byte $5E ; <indirect ref>
  0x03F4B4 $F4A4: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4B5 $F4A5: -D3-I-  .byte $63 ; <indirect ref>
  0x03F4B6 $F4A6: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4B7 $F4A7: -D3-I-  .byte $6A ; <indirect ref>
  0x03F4B8 $F4A8: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4B9 $F4A9: -D3-I-  .byte $74 ; <indirect ref>
  0x03F4BA $F4AA: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4BB $F4AB: -D3-I-  .byte $7D ; <indirect ref>
  0x03F4BC $F4AC: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4BD $F4AD: -D3-I-  .byte $86 ; <indirect ref>
  0x03F4BE $F4AE: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4BF $F4AF: -D3-I-  .byte $8F ; <indirect ref>
  0x03F4C0 $F4B0: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4C1 $F4B1: -D3-I-  .byte $99 ; <indirect ref>
  0x03F4C2 $F4B2: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4C3 $F4B3: -D3-I-  .byte $9C ; <indirect ref>
  0x03F4C4 $F4B4: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4C5 $F4B5: -D3-I-  .byte $A3 ; <indirect ref>
  0x03F4C6 $F4B6: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4C7 $F4B7: -D3-I-  .byte $AA ; <indirect ref>
  0x03F4C8 $F4B8: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4C9 $F4B9: -D3-I-  .byte $B3 ; <indirect ref>
  0x03F4CA $F4BA: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4CB $F4BB: -D3-I-  .byte $BC ; <indirect ref>
  0x03F4CC $F4BC: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4CD $F4BD: -D3-I-  .byte $C5 ; <indirect ref>
  0x03F4CE $F4BE: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4CF $F4BF: -D3-I-  .byte $CD ; <indirect ref>
  0x03F4D0 $F4C0: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4D1 $F4C1: -D3-I-  .byte $D6 ; <indirect ref>
  0x03F4D2 $F4C2: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4D3 $F4C3: -D3-I-  .byte $E0 ; <indirect ref>
  0x03F4D4 $F4C4: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4D5 $F4C5: -D3-I-  .byte $E5 ; <indirect ref>
  0x03F4D6 $F4C6: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4D7 $F4C7: -D3-I-  .byte $EE ; <indirect ref>
  0x03F4D8 $F4C8: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4D9 $F4C9: -D3-I-  .byte $F8 ; <indirect ref>
  0x03F4DA $F4CA: -D3-I-  .byte $F9 ; <indirect ref>
  0x03F4DB $F4CB: -D3-I-  .byte $00 ; <indirect ref>
  0x03F4DC $F4CC: -D3-I-  .byte $FA ; <indirect ref>
  0x03F4DD $F4CD: -D3-I-  .byte $05 ; <indirect ref>
  0x03F4DE $F4CE: -D3-I-  .byte $FA ; <indirect ref>
  0x03F4DF $F4CF: -D3-I-  .byte $0F ; <indirect ref>
  0x03F4E0 $F4D0: -D3-I-  .byte $FA ; <indirect ref>
  0x03F4E1 $F4D1: -D3-I-  .byte $18 ; <indirect ref>
  0x03F4E2 $F4D2: -D3-I-  .byte $FA ; <indirect ref>
  0x03F4E3 $F4D3: -D3-I-  .byte $20 ; <indirect ref>
  0x03F4E4 $F4D4: -D3-I-  .byte $FA ; <indirect ref>
  0x03F4E5 $F4D5: ------  .byte $29
  0x03F4E6 $F4D6: ------  .byte $FA
  0x03F4E7 $F4D7: -D3-I-  .byte $2E ; <indirect ref>
  0x03F4E8 $F4D8: -D3-I-  .byte $FA ; <indirect ref>
  0x03F4E9 $F4D9: -D3-I-  .byte $34 ; <indirect ref>
  0x03F4EA $F4DA: -D3-I-  .byte $FA ; <indirect ref>
  0x03F4EB $F4DB: -D3-I-  .byte $3F ; <indirect ref>
  0x03F4EC $F4DC: -D3-I-  .byte $FA ; <indirect ref>
  0x03F4ED $F4DD: -D3-I-  .byte $44 ; <indirect ref>
  0x03F4EE $F4DE: -D3-I-  .byte $FA ; <indirect ref>
  0x03F4EF $F4DF: -D3-I-  .byte $48 ; <indirect ref>
  0x03F4F0 $F4E0: -D3-I-  .byte $FA ; <indirect ref>
  0x03F4F1 $F4E1: ------  .byte $4D
  0x03F4F2 $F4E2: ------  .byte $FA
  0x03F4F3 $F4E3: ------  .byte $52
  0x03F4F4 $F4E4: ------  .byte $FA
  0x03F4F5 $F4E5: ------  .byte $57
  0x03F4F6 $F4E6: ------  .byte $FA
  0x03F4F7 $F4E7: ------  .byte $5C
  0x03F4F8 $F4E8: ------  .byte $FA
  0x03F4F9 $F4E9: -D3-I-  .byte $61 ; <indirect ref>
  0x03F4FA $F4EA: -D3-I-  .byte $FA ; <indirect ref>
  0x03F4FB $F4EB: ------  .byte $68
  0x03F4FC $F4EC: ------  .byte $FA
  0x03F4FD $F4ED: ------  .byte $71
  0x03F4FE $F4EE: ------  .byte $FA
  0x03F4FF $F4EF: ------  .byte $79
  0x03F500 $F4F0: ------  .byte $FA
  0x03F501 $F4F1: -D3-I-  .byte $83 ; <indirect ref>
  0x03F502 $F4F2: -D3-I-  .byte $FA ; <indirect ref>
  0x03F503 $F4F3: -D3-I-  .byte $89 ; <indirect ref>
  0x03F504 $F4F4: -D3-I-  .byte $FA ; <indirect ref>
  0x03F505 $F4F5: -D3-I-  .byte $90 ; <indirect ref>
  0x03F506 $F4F6: -D3-I-  .byte $FA ; <indirect ref>
  0x03F507 $F4F7: -D3-I-  .byte $96 ; <indirect ref>
  0x03F508 $F4F8: -D3-I-  .byte $FA ; <indirect ref>
  0x03F509 $F4F9: -D3-I-  .byte $9C ; <indirect ref>
  0x03F50A $F4FA: -D3-I-  .byte $FA ; <indirect ref>
  0x03F50B $F4FB: -D3-I-  .byte $A4 ; <indirect ref>
  0x03F50C $F4FC: -D3-I-  .byte $FA ; <indirect ref>
  0x03F50D $F4FD: -D3-I-  .byte $A9 ; <indirect ref>
  0x03F50E $F4FE: -D3-I-  .byte $FA ; <indirect ref>
  0x03F50F $F4FF: -D3-I-  .byte $B0 ; <indirect ref>
  0x03F510 $F500: -D3-I-  .byte $FA ; <indirect ref>
  0x03F511 $F501: -D3-I-  .byte $B7 ; <indirect ref>
  0x03F512 $F502: -D3-I-  .byte $FA ; <indirect ref>
  0x03F513 $F503: -D3-I-  .byte $C0 ; <indirect ref>
  0x03F514 $F504: -D3-I-  .byte $FA ; <indirect ref>
  0x03F515 $F505: -D3-I-  .byte $C4 ; <indirect ref>
  0x03F516 $F506: -D3-I-  .byte $FA ; <indirect ref>
  0x03F517 $F507: -D3-I-  .byte $C8 ; <indirect ref>
  0x03F518 $F508: -D3-I-  .byte $FA ; <indirect ref>
  0x03F519 $F509: -D3-I-  .byte $12 ; <indirect ref>
  0x03F51A $F50A: -D3-I-  .byte $AF ; <indirect ref>
  0x03F51B $F50B: -D3-I-  .byte $0B ; <indirect ref>
  0x03F51C $F50C: -D3-I-  .byte $FC ; <indirect ref>
  0x03F51D $F50D: -D3-I-  .byte $6A ; <indirect ref>
  0x03F51E $F50E: -D3-I-  .byte $55 ; <indirect ref>
  0x03F51F $F50F: -D3-I-  .byte $7D ; <indirect ref>
  0x03F520 $F510: -D3-I-  .byte $54 ; <indirect ref>
  0x03F521 $F511: -D3-I-  .byte $FC ; <indirect ref>
  0x03F522 $F512: -D3-I-  .byte $68 ; <indirect ref>
  0x03F523 $F513: -D3-I-  .byte $5F ; <indirect ref>
  0x03F524 $F514: -D3-I-  .byte $FC ; <indirect ref>
  0x03F525 $F515: -D3-I-  .byte $5F ; <indirect ref>
  0x03F526 $F516: -D3-I-  .byte $68 ; <indirect ref>
  0x03F527 $F517: -D3-I-  .byte $7D ; <indirect ref>
  0x03F528 $F518: -D3-I-  .byte $56 ; <indirect ref>
  0x03F529 $F519: -D3-I-  .byte $FC ; <indirect ref>
  0x03F52A $F51A: -D3-I-  .byte $41 ; <indirect ref>
  0x03F52B $F51B: -D3-I-  .byte $5F ; <indirect ref>
  0x03F52C $F51C: -D3-I-  .byte $67 ; <indirect ref>
  0x03F52D $F51D: -D3-I-  .byte $43 ; <indirect ref>
  0x03F52E $F51E: -D3-I-  .byte $FC ; <indirect ref>
  0x03F52F $F51F: -D3-I-  .byte $C2 ; <indirect ref>
  0x03F530 $F520: -D3-I-  .byte $54 ; <indirect ref>
  0x03F531 $F521: -D3-I-  .byte $7D ; <indirect ref>
  0x03F532 $F522: -D3-I-  .byte $69 ; <indirect ref>
  0x03F533 $F523: -D3-I-  .byte $FC ; <indirect ref>
  0x03F534 $F524: -D3-I-  .byte $C3 ; <indirect ref>
  0x03F535 $F525: -D3-I-  .byte $51 ; <indirect ref>
  0x03F536 $F526: -D3-I-  .byte $4D ; <indirect ref>
  0x03F537 $F527: -D3-I-  .byte $50 ; <indirect ref>
  0x03F538 $F528: -D3-I-  .byte $FC ; <indirect ref>
  0x03F539 $F529: -D3-I-  .byte $50 ; <indirect ref>
  0x03F53A $F52A: -D3-I-  .byte $5A ; <indirect ref>
  0x03F53B $F52B: -D3-I-  .byte $5F ; <indirect ref>
  0x03F53C $F52C: -D3-I-  .byte $50 ; <indirect ref>
  0x03F53D $F52D: -D3-I-  .byte $FC ; <indirect ref>
  0x03F53E $F52E: -D3-I-  .byte $C3 ; <indirect ref>
  0x03F53F $F52F: -D3-I-  .byte $C4 ; <indirect ref>
  0x03F540 $F530: -D3-I-  .byte $6E ; <indirect ref>
  0x03F541 $F531: -D3-I-  .byte $54 ; <indirect ref>
  0x03F542 $F532: -D3-I-  .byte $6E ; <indirect ref>
  0x03F543 $F533: -D3-I-  .byte $FC ; <indirect ref>
  0x03F544 $F534: -D3-I-  .byte $BA ; <indirect ref>
  0x03F545 $F535: -D3-I-  .byte $43 ; <indirect ref>
  0x03F546 $F536: -D3-I-  .byte $FC ; <indirect ref>
  0x03F547 $F537: -D3-I-  .byte $CF ; <indirect ref>
  0x03F548 $F538: -D3-I-  .byte $67 ; <indirect ref>
  0x03F549 $F539: -D3-I-  .byte $54 ; <indirect ref>
  0x03F54A $F53A: -D3-I-  .byte $6E ; <indirect ref>
  0x03F54B $F53B: -D3-I-  .byte $FC ; <indirect ref>
  0x03F54C $F53C: -D3-I-  .byte $03 ; <indirect ref>
  0x03F54D $F53D: -D3-I-  .byte $27 ; <indirect ref>
  0x03F54E $F53E: -D3-I-  .byte $B2 ; <indirect ref>
  0x03F54F $F53F: -D3-I-  .byte $FC ; <indirect ref>
  0x03F550 $F540: -D3-I-  .byte $07 ; <indirect ref>
  0x03F551 $F541: -D3-I-  .byte $0C ; <indirect ref>
  0x03F552 $F542: -D3-I-  .byte $AA ; <indirect ref>
  0x03F553 $F543: -D3-I-  .byte $FC ; <indirect ref>
  0x03F554 $F544: -D3-I-  .byte $15 ; <indirect ref>
  0x03F555 $F545: -D3-I-  .byte $06 ; <indirect ref>
  0x03F556 $F546: -D3-I-  .byte $24 ; <indirect ref>
  0x03F557 $F547: -D3-I-  .byte $1F ; <indirect ref>
  0x03F558 $F548: -D3-I-  .byte $FC ; <indirect ref>
  0x03F559 $F549: -D3-I-  .byte $23 ; <indirect ref>
  0x03F55A $F54A: -D3-I-  .byte $28 ; <indirect ref>
  0x03F55B $F54B: -D3-I-  .byte $0B ; <indirect ref>
  0x03F55C $F54C: -D3-I-  .byte $07 ; <indirect ref>
  0x03F55D $F54D: -D3-I-  .byte $FC ; <indirect ref>
  0x03F55E $F54E: -D3-I-  .byte $10 ; <indirect ref>
  0x03F55F $F54F: -D3-I-  .byte $06 ; <indirect ref>
  0x03F560 $F550: -D3-I-  .byte $0D ; <indirect ref>
  0x03F561 $F551: -D3-I-  .byte $A1 ; <indirect ref>
  0x03F562 $F552: -D3-I-  .byte $FC ; <indirect ref>
  0x03F563 $F553: -D3-I-  .byte $20 ; <indirect ref>
  0x03F564 $F554: -D3-I-  .byte $0B ; <indirect ref>
  0x03F565 $F555: -D3-I-  .byte $07 ; <indirect ref>
  0x03F566 $F556: -D3-I-  .byte $FC ; <indirect ref>
  0x03F567 $F557: -D3-I-  .byte $02 ; <indirect ref>
  0x03F568 $F558: -D3-I-  .byte $A5 ; <indirect ref>
  0x03F569 $F559: -D3-I-  .byte $2C ; <indirect ref>
  0x03F56A $F55A: -D3-I-  .byte $FC ; <indirect ref>
  0x03F56B $F55B: -D3-I-  .byte $10 ; <indirect ref>
  0x03F56C $F55C: -D3-I-  .byte $07 ; <indirect ref>
  0x03F56D $F55D: -D3-I-  .byte $FC ; <indirect ref>
  0x03F56E $F55E: -D3-I-  .byte $02 ; <indirect ref>
  0x03F56F $F55F: -D3-I-  .byte $0C ; <indirect ref>
  0x03F570 $F560: -D3-I-  .byte $A5 ; <indirect ref>
  0x03F571 $F561: -D3-I-  .byte $07 ; <indirect ref>
  0x03F572 $F562: -D3-I-  .byte $FC ; <indirect ref>
  0x03F573 $F563: -D3-I-  .byte $16 ; <indirect ref>
  0x03F574 $F564: -D3-I-  .byte $2F ; <indirect ref>
  0x03F575 $F565: -D3-I-  .byte $10 ; <indirect ref>
  0x03F576 $F566: -D3-I-  .byte $FC ; <indirect ref>
  0x03F577 $F567: -D3-I-  .byte $07 ; <indirect ref>
  0x03F578 $F568: -D3-I-  .byte $0D ; <indirect ref>
  0x03F579 $F569: -D3-I-  .byte $A1 ; <indirect ref>
  0x03F57A $F56A: -D3-I-  .byte $FC ; <indirect ref>
  0x03F57B $F56B: -D3-I-  .byte $1F ; <indirect ref>
  0x03F57C $F56C: -D3-I-  .byte $0B ; <indirect ref>
  0x03F57D $F56D: -D3-I-  .byte $05 ; <indirect ref>
  0x03F57E $F56E: -D3-I-  .byte $FC ; <indirect ref>
  0x03F57F $F56F: -D3-I-  .byte $06 ; <indirect ref>
  0x03F580 $F570: -D3-I-  .byte $A7 ; <indirect ref>
  0x03F581 $F571: -D3-I-  .byte $05 ; <indirect ref>
  0x03F582 $F572: -D3-I-  .byte $FC ; <indirect ref>
  0x03F583 $F573: -D3-I-  .byte $0B ; <indirect ref>
  0x03F584 $F574: -D3-I-  .byte $19 ; <indirect ref>
  0x03F585 $F575: -D3-I-  .byte $FC ; <indirect ref>
  0x03F586 $F576: -D3-I-  .byte $1B ; <indirect ref>
  0x03F587 $F577: -D3-I-  .byte $31 ; <indirect ref>
  0x03F588 $F578: -D3-I-  .byte $03 ; <indirect ref>
  0x03F589 $F579: -D3-I-  .byte $A0 ; <indirect ref>
  0x03F58A $F57A: -D3-I-  .byte $FC ; <indirect ref>
  0x03F58B $F57B: -D3-I-  .byte $0F ; <indirect ref>
  0x03F58C $F57C: -D3-I-  .byte $03 ; <indirect ref>
  0x03F58D $F57D: -D3-I-  .byte $AA ; <indirect ref>
  0x03F58E $F57E: -D3-I-  .byte $FC ; <indirect ref>
  0x03F58F $F57F: -D3-I-  .byte $A6 ; <indirect ref>
  0x03F590 $F580: -D3-I-  .byte $14 ; <indirect ref>
  0x03F591 $F581: -D3-I-  .byte $03 ; <indirect ref>
  0x03F592 $F582: -D3-I-  .byte $FC ; <indirect ref>
  0x03F593 $F583: -D3-I-  .byte $1F ; <indirect ref>
  0x03F594 $F584: -D3-I-  .byte $12 ; <indirect ref>
  0x03F595 $F585: -D3-I-  .byte $24 ; <indirect ref>
  0x03F596 $F586: -D3-I-  .byte $1F ; <indirect ref>
  0x03F597 $F587: -D3-I-  .byte $FC ; <indirect ref>
  0x03F598 $F588: -D3-I-  .byte $0F ; <indirect ref>
  0x03F599 $F589: -D3-I-  .byte $28 ; <indirect ref>
  0x03F59A $F58A: -D3-I-  .byte $1F ; <indirect ref>
  0x03F59B $F58B: -D3-I-  .byte $11 ; <indirect ref>
  0x03F59C $F58C: -D3-I-  .byte $FC ; <indirect ref>
  0x03F59D $F58D: -D3-I-  .byte $0B ; <indirect ref>
  0x03F59E $F58E: -D3-I-  .byte $2C ; <indirect ref>
  0x03F59F $F58F: -D3-I-  .byte $AA ; <indirect ref>
  0x03F5A0 $F590: -D3-I-  .byte $FC ; <indirect ref>
  0x03F5A1 $F591: -D3-I-  .byte $20 ; <indirect ref>
  0x03F5A2 $F592: -D3-I-  .byte $0D ; <indirect ref>
  0x03F5A3 $F593: -D3-I-  .byte $A1 ; <indirect ref>
  0x03F5A4 $F594: -D3-I-  .byte $FC ; <indirect ref>
  0x03F5A5 $F595: -D3-I-  .byte $2C ; <indirect ref>
  0x03F5A6 $F596: -D3-I-  .byte $06 ; <indirect ref>
  0x03F5A7 $F597: -D3-I-  .byte $AF ; <indirect ref>
  0x03F5A8 $F598: -D3-I-  .byte $24 ; <indirect ref>
  0x03F5A9 $F599: -D3-I-  .byte $0C ; <indirect ref>
  0x03F5AA $F59A: -D3-I-  .byte $FC ; <indirect ref>
  0x03F5AB $F59B: -D3-I-  .byte $2C ; <indirect ref>
  0x03F5AC $F59C: -D3-I-  .byte $06 ; <indirect ref>
  0x03F5AD $F59D: -D3-I-  .byte $0C ; <indirect ref>
  0x03F5AE $F59E: -D3-I-  .byte $1F ; <indirect ref>
  0x03F5AF $F59F: -D3-I-  .byte $AC ; <indirect ref>
  0x03F5B0 $F5A0: -D3-I-  .byte $FC ; <indirect ref>
  0x03F5B1 $F5A1: -D3-I-  .byte $4B ; <indirect ref>
  0x03F5B2 $F5A2: -D3-I-  .byte $54 ; <indirect ref>
  0x03F5B3 $F5A3: -D3-I-  .byte $69 ; <indirect ref>
  0x03F5B4 $F5A4: -D3-I-  .byte $4D ; <indirect ref>
  0x03F5B5 $F5A5: -D3-I-  .byte $53 ; <indirect ref>
  0x03F5B6 $F5A6: -D3-I-  .byte $B5 ; <indirect ref>
  0x03F5B7 $F5A7: -D3-I-  .byte $FC ; <indirect ref>
  0x03F5B8 $F5A8: -D3-I-  .byte $68 ; <indirect ref>
  0x03F5B9 $F5A9: -D3-I-  .byte $C6 ; <indirect ref>
  0x03F5BA $F5AA: -D3-I-  .byte $68 ; <indirect ref>
  0x03F5BB $F5AB: -D3-I-  .byte $45 ; <indirect ref>
  0x03F5BC $F5AC: -D3-I-  .byte $FC ; <indirect ref>
  0x03F5BD $F5AD: -D3-I-  .byte $BE ; <indirect ref>
  0x03F5BE $F5AE: -D3-I-  .byte $3F ; <indirect ref>
  0x03F5BF $F5AF: -D3-I-  .byte $4C ; <indirect ref>
  0x03F5C0 $F5B0: -D3-I-  .byte $69 ; <indirect ref>
  0x03F5C1 $F5B1: -D3-I-  .byte $C3 ; <indirect ref>
  0x03F5C2 $F5B2: -D3-I-  .byte $FC ; <indirect ref>
  0x03F5C3 $F5B3: -D3-I-  .byte $62 ; <indirect ref>
  0x03F5C4 $F5B4: -D3-I-  .byte $45 ; <indirect ref>
  0x03F5C5 $F5B5: -D3-I-  .byte $6E ; <indirect ref>
  0x03F5C6 $F5B6: -D3-I-  .byte $FC ; <indirect ref>
  0x03F5C7 $F5B7: -D3-I-  .byte $54 ; <indirect ref>
  0x03F5C8 $F5B8: -D3-I-  .byte $56 ; <indirect ref>
  0x03F5C9 $F5B9: -D3-I-  .byte $7D ; <indirect ref>
  0x03F5CA $F5BA: -D3-I-  .byte $56 ; <indirect ref>
  0x03F5CB $F5BB: -D3-I-  .byte $72 ; <indirect ref>
  0x03F5CC $F5BC: -D3-I-  .byte $FC ; <indirect ref>
  0x03F5CD $F5BD: -D3-I-  .byte $58 ; <indirect ref>
  0x03F5CE $F5BE: -D3-I-  .byte $42 ; <indirect ref>
  0x03F5CF $F5BF: -D3-I-  .byte $FC ; <indirect ref>
  0x03F5D0 $F5C0: -D3-I-  .byte $B9 ; <indirect ref>
  0x03F5D1 $F5C1: -D3-I-  .byte $B4 ; <indirect ref>
  0x03F5D2 $F5C2: -D3-I-  .byte $6B ; <indirect ref>
  0x03F5D3 $F5C3: -D3-I-  .byte $FC ; <indirect ref>
  0x03F5D4 $F5C4: -D3-I-  .byte $C1 ; <indirect ref>
  0x03F5D5 $F5C5: -D3-I-  .byte $74 ; <indirect ref>
  0x03F5D6 $F5C6: -D3-I-  .byte $43 ; <indirect ref>
  0x03F5D7 $F5C7: -D3-I-  .byte $4E ; <indirect ref>
  0x03F5D8 $F5C8: -D3-I-  .byte $43 ; <indirect ref>
  0x03F5D9 $F5C9: -D3-I-  .byte $FC ; <indirect ref>
  0x03F5DA $F5CA: -D3-I-  .byte $46 ; <indirect ref>
  0x03F5DB $F5CB: -D3-I-  .byte $69 ; <indirect ref>
  0x03F5DC $F5CC: -D3-I-  .byte $6B ; <indirect ref>
  0x03F5DD $F5CD: -D3-I-  .byte $4D ; <indirect ref>
  0x03F5DE $F5CE: -D3-I-  .byte $FC ; <indirect ref>
  0x03F5DF $F5CF: -D3-I-  .byte $4B ; <indirect ref>
  0x03F5E0 $F5D0: -D3-I-  .byte $6E ; <indirect ref>
  0x03F5E1 $F5D1: -D3-I-  .byte $50 ; <indirect ref>
  0x03F5E2 $F5D2: -D3-I-  .byte $5F ; <indirect ref>
  0x03F5E3 $F5D3: -D3-I-  .byte $68 ; <indirect ref>
  0x03F5E4 $F5D4: -D3-I-  .byte $41 ; <indirect ref>
  0x03F5E5 $F5D5: -D3-I-  .byte $FC ; <indirect ref>
  0x03F5E6 $F5D6: -D3-I-  .byte $BA ; <indirect ref>
  0x03F5E7 $F5D7: -D3-I-  .byte $75 ; <indirect ref>
  0x03F5E8 $F5D8: -D3-I-  .byte $54 ; <indirect ref>
  0x03F5E9 $F5D9: -D3-I-  .byte $7D ; <indirect ref>
  0x03F5EA $F5DA: -D3-I-  .byte $68 ; <indirect ref>
  0x03F5EB $F5DB: -D3-I-  .byte $45 ; <indirect ref>
  0x03F5EC $F5DC: -D3-I-  .byte $FC ; <indirect ref>
  0x03F5ED $F5DD: -D3-I-  .byte $A6 ; <indirect ref>
  0x03F5EE $F5DE: -D3-I-  .byte $14 ; <indirect ref>
  0x03F5EF $F5DF: -D3-I-  .byte $03 ; <indirect ref>
  0x03F5F0 $F5E0: -D3-I-  .byte $FC ; <indirect ref>
  0x03F5F1 $F5E1: -D3-I-  .byte $0B ; <indirect ref>
  0x03F5F2 $F5E2: -D3-I-  .byte $19 ; <indirect ref>
  0x03F5F3 $F5E3: -D3-I-  .byte $FC ; <indirect ref>
  0x03F5F4 $F5E4: -D3-I-  .byte $1F ; <indirect ref>
  0x03F5F5 $F5E5: -D3-I-  .byte $0B ; <indirect ref>
  0x03F5F6 $F5E6: -D3-I-  .byte $05 ; <indirect ref>
  0x03F5F7 $F5E7: -D3-I-  .byte $FC ; <indirect ref>
  0x03F5F8 $F5E8: -D3-I-  .byte $06 ; <indirect ref>
  0x03F5F9 $F5E9: -D3-I-  .byte $A7 ; <indirect ref>
  0x03F5FA $F5EA: -D3-I-  .byte $05 ; <indirect ref>
  0x03F5FB $F5EB: -D3-I-  .byte $FC ; <indirect ref>
  0x03F5FC $F5EC: -D3-I-  .byte $0F ; <indirect ref>
  0x03F5FD $F5ED: -D3-I-  .byte $03 ; <indirect ref>
  0x03F5FE $F5EE: -D3-I-  .byte $AA ; <indirect ref>
  0x03F5FF $F5EF: -D3-I-  .byte $FC ; <indirect ref>
  0x03F600 $F5F0: -D3-I-  .byte $15 ; <indirect ref>
  0x03F601 $F5F1: -D3-I-  .byte $06 ; <indirect ref>
  0x03F602 $F5F2: -D3-I-  .byte $16 ; <indirect ref>
  0x03F603 $F5F3: -D3-I-  .byte $0C ; <indirect ref>
  0x03F604 $F5F4: -D3-I-  .byte $FC ; <indirect ref>
  0x03F605 $F5F5: -D3-I-  .byte $20 ; <indirect ref>
  0x03F606 $F5F6: -D3-I-  .byte $0D ; <indirect ref>
  0x03F607 $F5F7: -D3-I-  .byte $A1 ; <indirect ref>
  0x03F608 $F5F8: -D3-I-  .byte $FC ; <indirect ref>
  0x03F609 $F5F9: -D3-I-  .byte $1F ; <indirect ref>
  0x03F60A $F5FA: -D3-I-  .byte $12 ; <indirect ref>
  0x03F60B $F5FB: -D3-I-  .byte $24 ; <indirect ref>
  0x03F60C $F5FC: -D3-I-  .byte $1F ; <indirect ref>
  0x03F60D $F5FD: -D3-I-  .byte $FC ; <indirect ref>
  0x03F60E $F5FE: -D3-I-  .byte $1B ; <indirect ref>
  0x03F60F $F5FF: -D3-I-  .byte $31 ; <indirect ref>
  0x03F610 $F600: -D3-I-  .byte $03 ; <indirect ref>
  0x03F611 $F601: -D3-I-  .byte $A0 ; <indirect ref>
  0x03F612 $F602: -D3-I-  .byte $FC ; <indirect ref>
  0x03F613 $F603: -D3-I-  .byte $0F ; <indirect ref>
  0x03F614 $F604: -D3-I-  .byte $28 ; <indirect ref>
  0x03F615 $F605: -D3-I-  .byte $1F ; <indirect ref>
  0x03F616 $F606: -D3-I-  .byte $11 ; <indirect ref>
  0x03F617 $F607: -D3-I-  .byte $FC ; <indirect ref>
  0x03F618 $F608: -D3-I-  .byte $0B ; <indirect ref>
  0x03F619 $F609: -D3-I-  .byte $2C ; <indirect ref>
  0x03F61A $F60A: -D3-I-  .byte $AA ; <indirect ref>
  0x03F61B $F60B: -D3-I-  .byte $FC ; <indirect ref>
  0x03F61C $F60C: -D3-I-  .byte $2C ; <indirect ref>
  0x03F61D $F60D: -D3-I-  .byte $06 ; <indirect ref>
  0x03F61E $F60E: -D3-I-  .byte $0C ; <indirect ref>
  0x03F61F $F60F: -D3-I-  .byte $1F ; <indirect ref>
  0x03F620 $F610: -D3-I-  .byte $AC ; <indirect ref>
  0x03F621 $F611: -D3-I-  .byte $FC ; <indirect ref>
  0x03F622 $F612: -D3-I-  .byte $67 ; <indirect ref>
  0x03F623 $F613: -D3-I-  .byte $6E ; <indirect ref>
  0x03F624 $F614: -D3-I-  .byte $CE ; <indirect ref>
  0x03F625 $F615: -D3-I-  .byte $45 ; <indirect ref>
  0x03F626 $F616: -D3-I-  .byte $6E ; <indirect ref>
  0x03F627 $F617: -D3-I-  .byte $FC ; <indirect ref>
  0x03F628 $F618: -D3-I-  .byte $C4 ; <indirect ref>
  0x03F629 $F619: -D3-I-  .byte $48 ; <indirect ref>
  0x03F62A $F61A: -D3-I-  .byte $54 ; <indirect ref>
  0x03F62B $F61B: -D3-I-  .byte $68 ; <indirect ref>
  0x03F62C $F61C: -D3-I-  .byte $7D ; <indirect ref>
  0x03F62D $F61D: -D3-I-  .byte $59 ; <indirect ref>
  0x03F62E $F61E: -D3-I-  .byte $FC ; <indirect ref>
  0x03F62F $F61F: -D3-I-  .byte $BE ; <indirect ref>
  0x03F630 $F620: -D3-I-  .byte $3F ; <indirect ref>
  0x03F631 $F621: -D3-I-  .byte $4C ; <indirect ref>
  0x03F632 $F622: -D3-I-  .byte $69 ; <indirect ref>
  0x03F633 $F623: -D3-I-  .byte $C3 ; <indirect ref>
  0x03F634 $F624: -D3-I-  .byte $FC ; <indirect ref>
  0x03F635 $F625: -D3-I-  .byte $46 ; <indirect ref>
  0x03F636 $F626: -D3-I-  .byte $D0 ; <indirect ref>
  0x03F637 $F627: -D3-I-  .byte $6B ; <indirect ref>
  0x03F638 $F628: -D3-I-  .byte $5F ; <indirect ref>
  0x03F639 $F629: -D3-I-  .byte $6E ; <indirect ref>
  0x03F63A $F62A: -D3-I-  .byte $FC ; <indirect ref>
  0x03F63B $F62B: -D3-I-  .byte $46 ; <indirect ref>
  0x03F63C $F62C: -D3-I-  .byte $69 ; <indirect ref>
  0x03F63D $F62D: -D3-I-  .byte $52 ; <indirect ref>
  0x03F63E $F62E: -D3-I-  .byte $FC ; <indirect ref>
  0x03F63F $F62F: -D3-I-  .byte $62 ; <indirect ref>
  0x03F640 $F630: -D3-I-  .byte $6F ; <indirect ref>
  0x03F641 $F631: -D3-I-  .byte $52 ; <indirect ref>
  0x03F642 $F632: -D3-I-  .byte $73 ; <indirect ref>
  0x03F643 $F633: -D3-I-  .byte $FC ; <indirect ref>
  0x03F644 $F634: -D3-I-  .byte $2C ; <indirect ref>
  0x03F645 $F635: -D3-I-  .byte $06 ; <indirect ref>
  0x03F646 $F636: -D3-I-  .byte $AF ; <indirect ref>
  0x03F647 $F637: -D3-I-  .byte $24 ; <indirect ref>
  0x03F648 $F638: -D3-I-  .byte $0C ; <indirect ref>
  0x03F649 $F639: -D3-I-  .byte $FC ; <indirect ref>
  0x03F64A $F63A: -D3-I-  .byte $1B ; <indirect ref>
  0x03F64B $F63B: -D3-I-  .byte $31 ; <indirect ref>
  0x03F64C $F63C: -D3-I-  .byte $03 ; <indirect ref>
  0x03F64D $F63D: -D3-I-  .byte $A0 ; <indirect ref>
  0x03F64E $F63E: -D3-I-  .byte $FC ; <indirect ref>
  0x03F64F $F63F: -D3-I-  .byte $16 ; <indirect ref>
  0x03F650 $F640: -D3-I-  .byte $2F ; <indirect ref>
  0x03F651 $F641: -D3-I-  .byte $10 ; <indirect ref>
  0x03F652 $F642: -D3-I-  .byte $FC ; <indirect ref>
  0x03F653 $F643: -D3-I-  .byte $0B ; <indirect ref>
  0x03F654 $F644: -D3-I-  .byte $19 ; <indirect ref>
  0x03F655 $F645: -D3-I-  .byte $FC ; <indirect ref>
  0x03F656 $F646: -D3-I-  .byte $20 ; <indirect ref>
  0x03F657 $F647: -D3-I-  .byte $0B ; <indirect ref>
  0x03F658 $F648: -D3-I-  .byte $07 ; <indirect ref>
  0x03F659 $F649: -D3-I-  .byte $FC ; <indirect ref>
  0x03F65A $F64A: -D3-I-  .byte $20 ; <indirect ref>
  0x03F65B $F64B: -D3-I-  .byte $0D ; <indirect ref>
  0x03F65C $F64C: -D3-I-  .byte $A1 ; <indirect ref>
  0x03F65D $F64D: -D3-I-  .byte $FC ; <indirect ref>
  0x03F65E $F64E: -D3-I-  .byte $1F ; <indirect ref>
  0x03F65F $F64F: -D3-I-  .byte $0B ; <indirect ref>
  0x03F660 $F650: -D3-I-  .byte $05 ; <indirect ref>
  0x03F661 $F651: -D3-I-  .byte $FC ; <indirect ref>
  0x03F662 $F652: -D3-I-  .byte $06 ; <indirect ref>
  0x03F663 $F653: -D3-I-  .byte $A7 ; <indirect ref>
  0x03F664 $F654: -D3-I-  .byte $05 ; <indirect ref>
  0x03F665 $F655: -D3-I-  .byte $FC ; <indirect ref>
  0x03F666 $F656: -D3-I-  .byte $A6 ; <indirect ref>
  0x03F667 $F657: -D3-I-  .byte $14 ; <indirect ref>
  0x03F668 $F658: -D3-I-  .byte $03 ; <indirect ref>
  0x03F669 $F659: -D3-I-  .byte $FC ; <indirect ref>
  0x03F66A $F65A: -D3-I-  .byte $02 ; <indirect ref>
  0x03F66B $F65B: -D3-I-  .byte $0C ; <indirect ref>
  0x03F66C $F65C: -D3-I-  .byte $A5 ; <indirect ref>
  0x03F66D $F65D: -D3-I-  .byte $07 ; <indirect ref>
  0x03F66E $F65E: -D3-I-  .byte $FC ; <indirect ref>
  0x03F66F $F65F: -D3-I-  .byte $0F ; <indirect ref>
  0x03F670 $F660: -D3-I-  .byte $03 ; <indirect ref>
  0x03F671 $F661: -D3-I-  .byte $AA ; <indirect ref>
  0x03F672 $F662: -D3-I-  .byte $FC ; <indirect ref>
  0x03F673 $F663: -D3-I-  .byte $1F ; <indirect ref>
  0x03F674 $F664: -D3-I-  .byte $12 ; <indirect ref>
  0x03F675 $F665: -D3-I-  .byte $24 ; <indirect ref>
  0x03F676 $F666: -D3-I-  .byte $1F ; <indirect ref>
  0x03F677 $F667: -D3-I-  .byte $FC ; <indirect ref>
  0x03F678 $F668: -D3-I-  .byte $2C ; <indirect ref>
  0x03F679 $F669: -D3-I-  .byte $06 ; <indirect ref>
  0x03F67A $F66A: -D3-I-  .byte $0C ; <indirect ref>
  0x03F67B $F66B: -D3-I-  .byte $1F ; <indirect ref>
  0x03F67C $F66C: -D3-I-  .byte $AC ; <indirect ref>
  0x03F67D $F66D: -D3-I-  .byte $FC ; <indirect ref>
  0x03F67E $F66E: -D3-I-  .byte $68 ; <indirect ref>
  0x03F67F $F66F: -D3-I-  .byte $3F ; <indirect ref>
  0x03F680 $F670: -D3-I-  .byte $5A ; <indirect ref>
  0x03F681 $F671: -D3-I-  .byte $6E ; <indirect ref>
  0x03F682 $F672: -D3-I-  .byte $58 ; <indirect ref>
  0x03F683 $F673: -D3-I-  .byte $FC ; <indirect ref>
  0x03F684 $F674: -D3-I-  .byte $68 ; <indirect ref>
  0x03F685 $F675: -D3-I-  .byte $3F ; <indirect ref>
  0x03F686 $F676: -D3-I-  .byte $C3 ; <indirect ref>
  0x03F687 $F677: -D3-I-  .byte $6E ; <indirect ref>
  0x03F688 $F678: -D3-I-  .byte $48 ; <indirect ref>
  0x03F689 $F679: -D3-I-  .byte $6E ; <indirect ref>
  0x03F68A $F67A: -D3-I-  .byte $FC ; <indirect ref>
  0x03F68B $F67B: -D3-I-  .byte $4C ; <indirect ref>
  0x03F68C $F67C: -D3-I-  .byte $70 ; <indirect ref>
  0x03F68D $F67D: -D3-I-  .byte $FC ; <indirect ref>
  0x03F68E $F67E: -D3-I-  .byte $47 ; <indirect ref>
  0x03F68F $F67F: -D3-I-  .byte $61 ; <indirect ref>
  0x03F690 $F680: -D3-I-  .byte $FC ; <indirect ref>
  0x03F691 $F681: -D3-I-  .byte $5F ; <indirect ref>
  0x03F692 $F682: -D3-I-  .byte $6F ; <indirect ref>
  0x03F693 $F683: -D3-I-  .byte $5A ; <indirect ref>
  0x03F694 $F684: -D3-I-  .byte $7D ; <indirect ref>
  0x03F695 $F685: -D3-I-  .byte $FC ; <indirect ref>
  0x03F696 $F686: -D3-I-  .byte $BA ; <indirect ref>
  0x03F697 $F687: -D3-I-  .byte $70 ; <indirect ref>
  0x03F698 $F688: -D3-I-  .byte $42 ; <indirect ref>
  0x03F699 $F689: -D3-I-  .byte $6F ; <indirect ref>
  0x03F69A $F68A: -D3-I-  .byte $51 ; <indirect ref>
  0x03F69B $F68B: -D3-I-  .byte $FC ; <indirect ref>
  0x03F69C $F68C: -D3-I-  .byte $6B ; <indirect ref>
  0x03F69D $F68D: -D3-I-  .byte $68 ; <indirect ref>
  0x03F69E $F68E: -D3-I-  .byte $5F ; <indirect ref>
  0x03F69F $F68F: -D3-I-  .byte $7D ; <indirect ref>
  0x03F6A0 $F690: -D3-I-  .byte $FC ; <indirect ref>
  0x03F6A1 $F691: -D3-I-  .byte $6B ; <indirect ref>
  0x03F6A2 $F692: -D3-I-  .byte $C5 ; <indirect ref>
  0x03F6A3 $F693: -D3-I-  .byte $4F ; <indirect ref>
  0x03F6A4 $F694: -D3-I-  .byte $6E ; <indirect ref>
  0x03F6A5 $F695: -D3-I-  .byte $FC ; <indirect ref>
  0x03F6A6 $F696: -D3-I-  .byte $C6 ; <indirect ref>
  0x03F6A7 $F697: -D3-I-  .byte $67 ; <indirect ref>
  0x03F6A8 $F698: -D3-I-  .byte $44 ; <indirect ref>
  0x03F6A9 $F699: -D3-I-  .byte $5C ; <indirect ref>
  0x03F6AA $F69A: -D3-I-  .byte $FC ; <indirect ref>
  0x03F6AB $F69B: -D3-I-  .byte $67 ; <indirect ref>
  0x03F6AC $F69C: -D3-I-  .byte $4C ; <indirect ref>
  0x03F6AD $F69D: -D3-I-  .byte $6E ; <indirect ref>
  0x03F6AE $F69E: -D3-I-  .byte $FC ; <indirect ref>
  0x03F6AF $F69F: -D3-I-  .byte $55 ; <indirect ref>
  0x03F6B0 $F6A0: -D3-I-  .byte $D1 ; <indirect ref>
  0x03F6B1 $F6A1: -D3-I-  .byte $6A ; <indirect ref>
  0x03F6B2 $F6A2: -D3-I-  .byte $45 ; <indirect ref>
  0x03F6B3 $F6A3: -D3-I-  .byte $6E ; <indirect ref>
  0x03F6B4 $F6A4: -D3-I-  .byte $FC ; <indirect ref>
  0x03F6B5 $F6A5: -D3-I-  .byte $CE ; <indirect ref>
  0x03F6B6 $F6A6: -D3-I-  .byte $44 ; <indirect ref>
  0x03F6B7 $F6A7: -D3-I-  .byte $7D ; <indirect ref>
  0x03F6B8 $F6A8: -D3-I-  .byte $69 ; <indirect ref>
  0x03F6B9 $F6A9: -D3-I-  .byte $FC ; <indirect ref>
  0x03F6BA $F6AA: -D3-I-  .byte $44 ; <indirect ref>
  0x03F6BB $F6AB: -D3-I-  .byte $4D ; <indirect ref>
  0x03F6BC $F6AC: -D3-I-  .byte $CD ; <indirect ref>
  0x03F6BD $F6AD: -D3-I-  .byte $7D ; <indirect ref>
  0x03F6BE $F6AE: -D3-I-  .byte $56 ; <indirect ref>
  0x03F6BF $F6AF: -D3-I-  .byte $70 ; <indirect ref>
  0x03F6C0 $F6B0: -D3-I-  .byte $FC ; <indirect ref>
  0x03F6C1 $F6B1: -D3-I-  .byte $67 ; <indirect ref>
  0x03F6C2 $F6B2: -D3-I-  .byte $6E ; <indirect ref>
  0x03F6C3 $F6B3: -D3-I-  .byte $CE ; <indirect ref>
  0x03F6C4 $F6B4: -D3-I-  .byte $45 ; <indirect ref>
  0x03F6C5 $F6B5: -D3-I-  .byte $6E ; <indirect ref>
  0x03F6C6 $F6B6: -D3-I-  .byte $FC ; <indirect ref>
  0x03F6C7 $F6B7: -D3-I-  .byte $5D ; <indirect ref>
  0x03F6C8 $F6B8: -D3-I-  .byte $69 ; <indirect ref>
  0x03F6C9 $F6B9: -D3-I-  .byte $55 ; <indirect ref>
  0x03F6CA $F6BA: -D3-I-  .byte $6E ; <indirect ref>
  0x03F6CB $F6BB: -D3-I-  .byte $C1 ; <indirect ref>
  0x03F6CC $F6BC: -D3-I-  .byte $4D ; <indirect ref>
  0x03F6CD $F6BD: -D3-I-  .byte $FC ; <indirect ref>
  0x03F6CE $F6BE: -D3-I-  .byte $42 ; <indirect ref>
  0x03F6CF $F6BF: -D3-I-  .byte $4D ; <indirect ref>
  0x03F6D0 $F6C0: -D3-I-  .byte $67 ; <indirect ref>
  0x03F6D1 $F6C1: -D3-I-  .byte $4D ; <indirect ref>
  0x03F6D2 $F6C2: -D3-I-  .byte $FC ; <indirect ref>
  0x03F6D3 $F6C3: -D3-I-  .byte $68 ; <indirect ref>
  0x03F6D4 $F6C4: -D3-I-  .byte $C5 ; <indirect ref>
  0x03F6D5 $F6C5: -D3-I-  .byte $50 ; <indirect ref>
  0x03F6D6 $F6C6: -D3-I-  .byte $FC ; <indirect ref>
  0x03F6D7 $F6C7: -D3-I-  .byte $CD ; <indirect ref>
  0x03F6D8 $F6C8: -D3-I-  .byte $4D ; <indirect ref>
  0x03F6D9 $F6C9: -D3-I-  .byte $46 ; <indirect ref>
  0x03F6DA $F6CA: -D3-I-  .byte $69 ; <indirect ref>
  0x03F6DB $F6CB: -D3-I-  .byte $FC ; <indirect ref>
  0x03F6DC $F6CC: -D3-I-  .byte $4B ; <indirect ref>
  0x03F6DD $F6CD: -D3-I-  .byte $54 ; <indirect ref>
  0x03F6DE $F6CE: -D3-I-  .byte $69 ; <indirect ref>
  0x03F6DF $F6CF: -D3-I-  .byte $4D ; <indirect ref>
  0x03F6E0 $F6D0: -D3-I-  .byte $53 ; <indirect ref>
  0x03F6E1 $F6D1: -D3-I-  .byte $B5 ; <indirect ref>
  0x03F6E2 $F6D2: -D3-I-  .byte $FC ; <indirect ref>
  0x03F6E3 $F6D3: -D3-I-  .byte $C1 ; <indirect ref>
  0x03F6E4 $F6D4: -D3-I-  .byte $74 ; <indirect ref>
  0x03F6E5 $F6D5: -D3-I-  .byte $41 ; <indirect ref>
  0x03F6E6 $F6D6: -D3-I-  .byte $4D ; <indirect ref>
  0x03F6E7 $F6D7: -D3-I-  .byte $FC ; <indirect ref>
  0x03F6E8 $F6D8: -D3-I-  .byte $C3 ; <indirect ref>
  0x03F6E9 $F6D9: -D3-I-  .byte $C4 ; <indirect ref>
  0x03F6EA $F6DA: -D3-I-  .byte $6E ; <indirect ref>
  0x03F6EB $F6DB: -D3-I-  .byte $54 ; <indirect ref>
  0x03F6EC $F6DC: -D3-I-  .byte $6E ; <indirect ref>
  0x03F6ED $F6DD: -D3-I-  .byte $FC ; <indirect ref>
  0x03F6EE $F6DE: -D3-I-  .byte $B4 ; <indirect ref>
  0x03F6EF $F6DF: -D3-I-  .byte $69 ; <indirect ref>
  0x03F6F0 $F6E0: -D3-I-  .byte $C3 ; <indirect ref>
  0x03F6F1 $F6E1: -D3-I-  .byte $6E ; <indirect ref>
  0x03F6F2 $F6E2: -D3-I-  .byte $FC ; <indirect ref>
  0x03F6F3 $F6E3: -D3-I-  .byte $4C ; <indirect ref>
  0x03F6F4 $F6E4: -D3-I-  .byte $71 ; <indirect ref>
  0x03F6F5 $F6E5: -D3-I-  .byte $55 ; <indirect ref>
  0x03F6F6 $F6E6: -D3-I-  .byte $42 ; <indirect ref>
  0x03F6F7 $F6E7: -D3-I-  .byte $BE ; <indirect ref>
  0x03F6F8 $F6E8: -D3-I-  .byte $7D ; <indirect ref>
  0x03F6F9 $F6E9: -D3-I-  .byte $FC ; <indirect ref>
  0x03F6FA $F6EA: -D3-I-  .byte $5F ; <indirect ref>
  0x03F6FB $F6EB: -D3-I-  .byte $7D ; <indirect ref>
  0x03F6FC $F6EC: -D3-I-  .byte $B4 ; <indirect ref>
  0x03F6FD $F6ED: -D3-I-  .byte $4D ; <indirect ref>
  0x03F6FE $F6EE: -D3-I-  .byte $FC ; <indirect ref>
  0x03F6FF $F6EF: -D3-I-  .byte $46 ; <indirect ref>
  0x03F700 $F6F0: -D3-I-  .byte $69 ; <indirect ref>
  0x03F701 $F6F1: -D3-I-  .byte $52 ; <indirect ref>
  0x03F702 $F6F2: -D3-I-  .byte $FC ; <indirect ref>
  0x03F703 $F6F3: -D3-I-  .byte $62 ; <indirect ref>
  0x03F704 $F6F4: -D3-I-  .byte $6F ; <indirect ref>
  0x03F705 $F6F5: -D3-I-  .byte $52 ; <indirect ref>
  0x03F706 $F6F6: -D3-I-  .byte $73 ; <indirect ref>
  0x03F707 $F6F7: -D3-I-  .byte $FC ; <indirect ref>
  0x03F708 $F6F8: -D3-I-  .byte $4C ; <indirect ref>
  0x03F709 $F6F9: -D3-I-  .byte $75 ; <indirect ref>
  0x03F70A $F6FA: -D3-I-  .byte $4D ; <indirect ref>
  0x03F70B $F6FB: -D3-I-  .byte $50 ; <indirect ref>
  0x03F70C $F6FC: -D3-I-  .byte $7D ; <indirect ref>
  0x03F70D $F6FD: -D3-I-  .byte $FC ; <indirect ref>
  0x03F70E $F6FE: -D3-I-  .byte $46 ; <indirect ref>
  0x03F70F $F6FF: -D3-I-  .byte $D0 ; <indirect ref>
  0x03F710 $F700: -D3-I-  .byte $6B ; <indirect ref>
  0x03F711 $F701: -D3-I-  .byte $5F ; <indirect ref>
  0x03F712 $F702: -D3-I-  .byte $6E ; <indirect ref>
  0x03F713 $F703: -D3-I-  .byte $FC ; <indirect ref>
  0x03F714 $F704: -D3-I-  .byte $60 ; <indirect ref>
  0x03F715 $F705: -D3-I-  .byte $71 ; <indirect ref>
  0x03F716 $F706: -D3-I-  .byte $7D ; <indirect ref>
  0x03F717 $F707: -D3-I-  .byte $67 ; <indirect ref>
  0x03F718 $F708: -D3-I-  .byte $7D ; <indirect ref>
  0x03F719 $F709: -D3-I-  .byte $FC ; <indirect ref>
  0x03F71A $F70A: -D3-I-  .byte $46 ; <indirect ref>
  0x03F71B $F70B: -D3-I-  .byte $69 ; <indirect ref>
  0x03F71C $F70C: -D3-I-  .byte $6B ; <indirect ref>
  0x03F71D $F70D: -D3-I-  .byte $4D ; <indirect ref>
  0x03F71E $F70E: -D3-I-  .byte $FC ; <indirect ref>
  0x03F71F $F70F: -D3-I-  .byte $B9 ; <indirect ref>
  0x03F720 $F710: -D3-I-  .byte $B4 ; <indirect ref>
  0x03F721 $F711: -D3-I-  .byte $6B ; <indirect ref>
  0x03F722 $F712: -D3-I-  .byte $FC ; <indirect ref>
  0x03F723 $F713: -D3-I-  .byte $68 ; <indirect ref>
  0x03F724 $F714: -D3-I-  .byte $C6 ; <indirect ref>
  0x03F725 $F715: -D3-I-  .byte $68 ; <indirect ref>
  0x03F726 $F716: -D3-I-  .byte $45 ; <indirect ref>
  0x03F727 $F717: -D3-I-  .byte $FC ; <indirect ref>
  0x03F728 $F718: -D3-I-  .byte $58 ; <indirect ref>
  0x03F729 $F719: -D3-I-  .byte $42 ; <indirect ref>
  0x03F72A $F71A: -D3-I-  .byte $FC ; <indirect ref>
  0x03F72B $F71B: -D3-I-  .byte $4B ; <indirect ref>
  0x03F72C $F71C: -D3-I-  .byte $6E ; <indirect ref>
  0x03F72D $F71D: -D3-I-  .byte $50 ; <indirect ref>
  0x03F72E $F71E: -D3-I-  .byte $5F ; <indirect ref>
  0x03F72F $F71F: -D3-I-  .byte $68 ; <indirect ref>
  0x03F730 $F720: -D3-I-  .byte $41 ; <indirect ref>
  0x03F731 $F721: -D3-I-  .byte $FC ; <indirect ref>
  0x03F732 $F722: -D3-I-  .byte $54 ; <indirect ref>
  0x03F733 $F723: -D3-I-  .byte $56 ; <indirect ref>
  0x03F734 $F724: -D3-I-  .byte $7D ; <indirect ref>
  0x03F735 $F725: -D3-I-  .byte $56 ; <indirect ref>
  0x03F736 $F726: -D3-I-  .byte $72 ; <indirect ref>
  0x03F737 $F727: -D3-I-  .byte $FC ; <indirect ref>
  0x03F738 $F728: -D3-I-  .byte $C2 ; <indirect ref>
  0x03F739 $F729: -D3-I-  .byte $54 ; <indirect ref>
  0x03F73A $F72A: -D3-I-  .byte $7D ; <indirect ref>
  0x03F73B $F72B: -D3-I-  .byte $69 ; <indirect ref>
  0x03F73C $F72C: -D3-I-  .byte $FC ; <indirect ref>
  0x03F73D $F72D: -D3-I-  .byte $41 ; <indirect ref>
  0x03F73E $F72E: -D3-I-  .byte $5F ; <indirect ref>
  0x03F73F $F72F: -D3-I-  .byte $67 ; <indirect ref>
  0x03F740 $F730: -D3-I-  .byte $43 ; <indirect ref>
  0x03F741 $F731: -D3-I-  .byte $FC ; <indirect ref>
  0x03F742 $F732: -D3-I-  .byte $C1 ; <indirect ref>
  0x03F743 $F733: -D3-I-  .byte $74 ; <indirect ref>
  0x03F744 $F734: -D3-I-  .byte $43 ; <indirect ref>
  0x03F745 $F735: -D3-I-  .byte $4E ; <indirect ref>
  0x03F746 $F736: -D3-I-  .byte $43 ; <indirect ref>
  0x03F747 $F737: -D3-I-  .byte $FC ; <indirect ref>
  0x03F748 $F738: -D3-I-  .byte $BA ; <indirect ref>
  0x03F749 $F739: -D3-I-  .byte $75 ; <indirect ref>
  0x03F74A $F73A: -D3-I-  .byte $54 ; <indirect ref>
  0x03F74B $F73B: -D3-I-  .byte $7D ; <indirect ref>
  0x03F74C $F73C: -D3-I-  .byte $68 ; <indirect ref>
  0x03F74D $F73D: -D3-I-  .byte $45 ; <indirect ref>
  0x03F74E $F73E: -D3-I-  .byte $FC ; <indirect ref>
  0x03F74F $F73F: -D3-I-  .byte $B7 ; <indirect ref>
  0x03F750 $F740: -D3-I-  .byte $69 ; <indirect ref>
  0x03F751 $F741: -D3-I-  .byte $53 ; <indirect ref>
  0x03F752 $F742: -D3-I-  .byte $74 ; <indirect ref>
  0x03F753 $F743: -D3-I-  .byte $4D ; <indirect ref>
  0x03F754 $F744: -D3-I-  .byte $FC ; <indirect ref>
  0x03F755 $F745: -D3-I-  .byte $4A ; <indirect ref>
  0x03F756 $F746: -D3-I-  .byte $42 ; <indirect ref>
  0x03F757 $F747: -D3-I-  .byte $6E ; <indirect ref>
  0x03F758 $F748: -D3-I-  .byte $C5 ; <indirect ref>
  0x03F759 $F749: -D3-I-  .byte $67 ; <indirect ref>
  0x03F75A $F74A: -D3-I-  .byte $FC ; <indirect ref>
  0x03F75B $F74B: -D3-I-  .byte $4B ; <indirect ref>
  0x03F75C $F74C: -D3-I-  .byte $6E ; <indirect ref>
  0x03F75D $F74D: -D3-I-  .byte $CD ; <indirect ref>
  0x03F75E $F74E: -D3-I-  .byte $43 ; <indirect ref>
  0x03F75F $F74F: -D3-I-  .byte $6B ; <indirect ref>
  0x03F760 $F750: -D3-I-  .byte $FC ; <indirect ref>
  0x03F761 $F751: -D3-I-  .byte $15 ; <indirect ref>
  0x03F762 $F752: -D3-I-  .byte $2E ; <indirect ref>
  0x03F763 $F753: -D3-I-  .byte $06 ; <indirect ref>
  0x03F764 $F754: -D3-I-  .byte $12 ; <indirect ref>
  0x03F765 $F755: -D3-I-  .byte $FC ; <indirect ref>
  0x03F766 $F756: -D3-I-  .byte $16 ; <indirect ref>
  0x03F767 $F757: -D3-I-  .byte $1E ; <indirect ref>
  0x03F768 $F758: -D3-I-  .byte $2E ; <indirect ref>
  0x03F769 $F759: -D3-I-  .byte $FC ; <indirect ref>
  0x03F76A $F75A: -D3-I-  .byte $5C ; <indirect ref>
  0x03F76B $F75B: -D3-I-  .byte $69 ; <indirect ref>
  0x03F76C $F75C: -D3-I-  .byte $60 ; <indirect ref>
  0x03F76D $F75D: -D3-I-  .byte $58 ; <indirect ref>
  0x03F76E $F75E: -D3-I-  .byte $6E ; <indirect ref>
  0x03F76F $F75F: -D3-I-  .byte $4E ; <indirect ref>
  0x03F770 $F760: -D3-I-  .byte $FC ; <indirect ref>
  0x03F771 $F761: -D3-I-  .byte $4A ; <indirect ref>
  0x03F772 $F762: -D3-I-  .byte $68 ; <indirect ref>
  0x03F773 $F763: -D3-I-  .byte $6E ; <indirect ref>
  0x03F774 $F764: -D3-I-  .byte $51 ; <indirect ref>
  0x03F775 $F765: -D3-I-  .byte $70 ; <indirect ref>
  0x03F776 $F766: -D3-I-  .byte $6E ; <indirect ref>
  0x03F777 $F767: -D3-I-  .byte $4D ; <indirect ref>
  0x03F778 $F768: -D3-I-  .byte $FC ; <indirect ref>
  0x03F779 $F769: -D3-I-  .byte $B6 ; <indirect ref>
  0x03F77A $F76A: -D3-I-  .byte $6A ; <indirect ref>
  0x03F77B $F76B: -D3-I-  .byte $60 ; <indirect ref>
  0x03F77C $F76C: -D3-I-  .byte $45 ; <indirect ref>
  0x03F77D $F76D: -D3-I-  .byte $FC ; <indirect ref>
  0x03F77E $F76E: -D3-I-  .byte $CD ; <indirect ref>
  0x03F77F $F76F: -D3-I-  .byte $69 ; <indirect ref>
  0x03F780 $F770: -D3-I-  .byte $62 ; <indirect ref>
  0x03F781 $F771: -D3-I-  .byte $42 ; <indirect ref>
  0x03F782 $F772: -D3-I-  .byte $67 ; <indirect ref>
  0x03F783 $F773: -D3-I-  .byte $4D ; <indirect ref>
  0x03F784 $F774: -D3-I-  .byte $FC ; <indirect ref>
  0x03F785 $F775: -D3-I-  .byte $4B ; <indirect ref>
  0x03F786 $F776: -D3-I-  .byte $6E ; <indirect ref>
  0x03F787 $F777: -D3-I-  .byte $54 ; <indirect ref>
  0x03F788 $F778: -D3-I-  .byte $4D ; <indirect ref>
  0x03F789 $F779: -D3-I-  .byte $FC ; <indirect ref>
  0x03F78A $F77A: -D3-I-  .byte $5C ; <indirect ref>
  0x03F78B $F77B: -D3-I-  .byte $67 ; <indirect ref>
  0x03F78C $F77C: -D3-I-  .byte $62 ; <indirect ref>
  0x03F78D $F77D: -D3-I-  .byte $6E ; <indirect ref>
  0x03F78E $F77E: -D3-I-  .byte $B8 ; <indirect ref>
  0x03F78F $F77F: -D3-I-  .byte $FC ; <indirect ref>
  0x03F790 $F780: -D3-I-  .byte $08 ; <indirect ref>
  0x03F791 $F781: -D3-I-  .byte $16 ; <indirect ref>
  0x03F792 $F782: -D3-I-  .byte $20 ; <indirect ref>
  0x03F793 $F783: -D3-I-  .byte $FC ; <indirect ref>
  0x03F794 $F784: -D3-I-  .byte $01 ; <indirect ref>
  0x03F795 $F785: -D3-I-  .byte $07 ; <indirect ref>
  0x03F796 $F786: -D3-I-  .byte $10 ; <indirect ref>
  0x03F797 $F787: -D3-I-  .byte $FC ; <indirect ref>
  0x03F798 $F788: -D3-I-  .byte $10 ; <indirect ref>
  0x03F799 $F789: -D3-I-  .byte $12 ; <indirect ref>
  0x03F79A $F78A: -D3-I-  .byte $15 ; <indirect ref>
  0x03F79B $F78B: -D3-I-  .byte $20 ; <indirect ref>
  0x03F79C $F78C: -D3-I-  .byte $FC ; <indirect ref>
  0x03F79D $F78D: -D3-I-  .byte $21 ; <indirect ref>
  0x03F79E $F78E: -D3-I-  .byte $0B ; <indirect ref>
  0x03F79F $F78F: -D3-I-  .byte $0C ; <indirect ref>
  0x03F7A0 $F790: -D3-I-  .byte $FC ; <indirect ref>
  0x03F7A1 $F791: -D3-I-  .byte $1C ; <indirect ref>
  0x03F7A2 $F792: -D3-I-  .byte $27 ; <indirect ref>
  0x03F7A3 $F793: -D3-I-  .byte $19 ; <indirect ref>
  0x03F7A4 $F794: -D3-I-  .byte $FC ; <indirect ref>
  0x03F7A5 $F795: -D3-I-  .byte $14 ; <indirect ref>
  0x03F7A6 $F796: -D3-I-  .byte $03 ; <indirect ref>
  0x03F7A7 $F797: -D3-I-  .byte $1E ; <indirect ref>
  0x03F7A8 $F798: -D3-I-  .byte $03 ; <indirect ref>
  0x03F7A9 $F799: -D3-I-  .byte $FC ; <indirect ref>
  0x03F7AA $F79A: -D3-I-  .byte $6B ; <indirect ref>
  0x03F7AB $F79B: -D3-I-  .byte $7D ; <indirect ref>
  0x03F7AC $F79C: -D3-I-  .byte $5F ; <indirect ref>
  0x03F7AD $F79D: -D3-I-  .byte $FC ; <indirect ref>
  0x03F7AE $F79E: -D3-I-  .byte $43 ; <indirect ref>
  0x03F7AF $F79F: -D3-I-  .byte $69 ; <indirect ref>
  0x03F7B0 $F7A0: -D3-I-  .byte $B6 ; <indirect ref>
  0x03F7B1 $F7A1: -D3-I-  .byte $41 ; <indirect ref>
  0x03F7B2 $F7A2: -D3-I-  .byte $42 ; <indirect ref>
  0x03F7B3 $F7A3: -D3-I-  .byte $FC ; <indirect ref>
  0x03F7B4 $F7A4: -D3-I-  .byte $5A ; <indirect ref>
  0x03F7B5 $F7A5: -D3-I-  .byte $6E ; <indirect ref>
  0x03F7B6 $F7A6: -D3-I-  .byte $C5 ; <indirect ref>
  0x03F7B7 $F7A7: -D3-I-  .byte $69 ; <indirect ref>
  0x03F7B8 $F7A8: -D3-I-  .byte $B4 ; <indirect ref>
  0x03F7B9 $F7A9: -D3-I-  .byte $7D ; <indirect ref>
  0x03F7BA $F7AA: -D3-I-  .byte $FC ; <indirect ref>
  0x03F7BB $F7AB: -D3-I-  .byte $16 ; <indirect ref>
  0x03F7BC $F7AC: -D3-I-  .byte $1E ; <indirect ref>
  0x03F7BD $F7AD: -D3-I-  .byte $2E ; <indirect ref>
  0x03F7BE $F7AE: -D3-I-  .byte $FC ; <indirect ref>
  0x03F7BF $F7AF: -D3-I-  .byte $4C ; <indirect ref>
  0x03F7C0 $F7B0: -D3-I-  .byte $68 ; <indirect ref>
  0x03F7C1 $F7B1: -D3-I-  .byte $41 ; <indirect ref>
  0x03F7C2 $F7B2: -D3-I-  .byte $FC ; <indirect ref>
  0x03F7C3 $F7B3: -D3-I-  .byte $11 ; <indirect ref>
  0x03F7C4 $F7B4: -D3-I-  .byte $31 ; <indirect ref>
  0x03F7C5 $F7B5: -D3-I-  .byte $03 ; <indirect ref>
  0x03F7C6 $F7B6: -D3-I-  .byte $A4 ; <indirect ref>
  0x03F7C7 $F7B7: -D3-I-  .byte $08 ; <indirect ref>
  0x03F7C8 $F7B8: -D3-I-  .byte $FC ; <indirect ref>
  0x03F7C9 $F7B9: -D3-I-  .byte $42 ; <indirect ref>
  0x03F7CA $F7BA: -D3-I-  .byte $67 ; <indirect ref>
  0x03F7CB $F7BB: -D3-I-  .byte $6E ; <indirect ref>
  0x03F7CC $F7BC: -D3-I-  .byte $FC ; <indirect ref>
  0x03F7CD $F7BD: -D3-I-  .byte $07 ; <indirect ref>
  0x03F7CE $F7BE: -D3-I-  .byte $10 ; <indirect ref>
  0x03F7CF $F7BF: -D3-I-  .byte $11 ; <indirect ref>
  0x03F7D0 $F7C0: -D3-I-  .byte $32 ; <indirect ref>
  0x03F7D1 $F7C1: -D3-I-  .byte $03 ; <indirect ref>
  0x03F7D2 $F7C2: -D3-I-  .byte $0E ; <indirect ref>
  0x03F7D3 $F7C3: -D3-I-  .byte $2E ; <indirect ref>
  0x03F7D4 $F7C4: -D3-I-  .byte $FC ; <indirect ref>
  0x03F7D5 $F7C5: -D3-I-  .byte $4B ; <indirect ref>
  0x03F7D6 $F7C6: -D3-I-  .byte $43 ; <indirect ref>
  0x03F7D7 $F7C7: -D3-I-  .byte $BA ; <indirect ref>
  0x03F7D8 $F7C8: -D3-I-  .byte $41 ; <indirect ref>
  0x03F7D9 $F7C9: -D3-I-  .byte $67 ; <indirect ref>
  0x03F7DA $F7CA: -D3-I-  .byte $C4 ; <indirect ref>
  0x03F7DB $F7CB: -D3-I-  .byte $41 ; <indirect ref>
  0x03F7DC $F7CC: -D3-I-  .byte $FC ; <indirect ref>
  0x03F7DD $F7CD: -D3-I-  .byte $06 ; <indirect ref>
  0x03F7DE $F7CE: -D3-I-  .byte $2E ; <indirect ref>
  0x03F7DF $F7CF: -D3-I-  .byte $0A ; <indirect ref>
  0x03F7E0 $F7D0: -D3-I-  .byte $08 ; <indirect ref>
  0x03F7E1 $F7D1: -D3-I-  .byte $FC ; <indirect ref>
  0x03F7E2 $F7D2: -D3-I-  .byte $C3 ; <indirect ref>
  0x03F7E3 $F7D3: -D3-I-  .byte $4D ; <indirect ref>
  0x03F7E4 $F7D4: -D3-I-  .byte $4A ; <indirect ref>
  0x03F7E5 $F7D5: -D3-I-  .byte $3F ; <indirect ref>
  0x03F7E6 $F7D6: -D3-I-  .byte $BE ; <indirect ref>
  0x03F7E7 $F7D7: -D3-I-  .byte $3F ; <indirect ref>
  0x03F7E8 $F7D8: -D3-I-  .byte $B4 ; <indirect ref>
  0x03F7E9 $F7D9: -D3-I-  .byte $5F ; <indirect ref>
  0x03F7EA $F7DA: -D3-I-  .byte $FC ; <indirect ref>
  0x03F7EB $F7DB: -D3-I-  .byte $D1 ; <indirect ref>
  0x03F7EC $F7DC: -D3-I-  .byte $7D ; <indirect ref>
  0x03F7ED $F7DD: -D3-I-  .byte $67 ; <indirect ref>
  0x03F7EE $F7DE: -D3-I-  .byte $6E ; <indirect ref>
  0x03F7EF $F7DF: -D3-I-  .byte $C2 ; <indirect ref>
  0x03F7F0 $F7E0: -D3-I-  .byte $FC ; <indirect ref>
  0x03F7F1 $F7E1: -D3-I-  .byte $42 ; <indirect ref>
  0x03F7F2 $F7E2: -D3-I-  .byte $6E ; <indirect ref>
  0x03F7F3 $F7E3: -D3-I-  .byte $B6 ; <indirect ref>
  0x03F7F4 $F7E4: -D3-I-  .byte $67 ; <indirect ref>
  0x03F7F5 $F7E5: -D3-I-  .byte $6E ; <indirect ref>
  0x03F7F6 $F7E6: -D3-I-  .byte $C2 ; <indirect ref>
  0x03F7F7 $F7E7: -D3-I-  .byte $FC ; <indirect ref>
  0x03F7F8 $F7E8: -D3-I-  .byte $4F ; <indirect ref>
  0x03F7F9 $F7E9: -D3-I-  .byte $C4 ; <indirect ref>
  0x03F7FA $F7EA: -D3-I-  .byte $44 ; <indirect ref>
  0x03F7FB $F7EB: -D3-I-  .byte $54 ; <indirect ref>
  0x03F7FC $F7EC: -D3-I-  .byte $FC ; <indirect ref>
  0x03F7FD $F7ED: -D3-I-  .byte $5C ; <indirect ref>
  0x03F7FE $F7EE: -D3-I-  .byte $67 ; <indirect ref>
  0x03F7FF $F7EF: -D3-I-  .byte $6E ; <indirect ref>
  0x03F800 $F7F0: -D3-I-  .byte $4D ; <indirect ref>
  0x03F801 $F7F1: -D3-I-  .byte $FC ; <indirect ref>
  0x03F802 $F7F2: -D3-I-  .byte $62 ; <indirect ref>
  0x03F803 $F7F3: -D3-I-  .byte $47 ; <indirect ref>
  0x03F804 $F7F4: -D3-I-  .byte $4C ; <indirect ref>
  0x03F805 $F7F5: -D3-I-  .byte $4A ; <indirect ref>
  0x03F806 $F7F6: -D3-I-  .byte $FC ; <indirect ref>
  0x03F807 $F7F7: -D3-I-  .byte $42 ; <indirect ref>
  0x03F808 $F7F8: -D3-I-  .byte $50 ; <indirect ref>
  0x03F809 $F7F9: -D3-I-  .byte $68 ; <indirect ref>
  0x03F80A $F7FA: -D3-I-  .byte $41 ; <indirect ref>
  0x03F80B $F7FB: -D3-I-  .byte $FC ; <indirect ref>
  0x03F80C $F7FC: -D3-I-  .byte $45 ; <indirect ref>
  0x03F80D $F7FD: -D3-I-  .byte $67 ; <indirect ref>
  0x03F80E $F7FE: -D3-I-  .byte $6E ; <indirect ref>
  0x03F80F $F7FF: -D3-I-  .byte $BE ; <indirect ref>
  0x03F810 $F800: -D3-I-  .byte $FC ; <indirect ref>
  0x03F811 $F801: -D3-I-  .byte $41 ; <indirect ref>
  0x03F812 $F802: -D3-I-  .byte $69 ; <indirect ref>
  0x03F813 $F803: -D3-I-  .byte $BC ; <indirect ref>
  0x03F814 $F804: -D3-I-  .byte $6E ; <indirect ref>
  0x03F815 $F805: -D3-I-  .byte $51 ; <indirect ref>
  0x03F816 $F806: -D3-I-  .byte $6E ; <indirect ref>
  0x03F817 $F807: -D3-I-  .byte $FC ; <indirect ref>
  0x03F818 $F808: -D3-I-  .byte $56 ; <indirect ref>
  0x03F819 $F809: -D3-I-  .byte $4C ; <indirect ref>
  0x03F81A $F80A: -D3-I-  .byte $C2 ; <indirect ref>
  0x03F81B $F80B: -D3-I-  .byte $42 ; <indirect ref>
  0x03F81C $F80C: -D3-I-  .byte $52 ; <indirect ref>
  0x03F81D $F80D: -D3-I-  .byte $FC ; <indirect ref>
  0x03F81E $F80E: -D3-I-  .byte $C5 ; <indirect ref>
  0x03F81F $F80F: -D3-I-  .byte $67 ; <indirect ref>
  0x03F820 $F810: -D3-I-  .byte $BA ; <indirect ref>
  0x03F821 $F811: -D3-I-  .byte $69 ; <indirect ref>
  0x03F822 $F812: -D3-I-  .byte $FC ; <indirect ref>
  0x03F823 $F813: -D3-I-  .byte $4C ; <indirect ref>
  0x03F824 $F814: -D3-I-  .byte $71 ; <indirect ref>
  0x03F825 $F815: -D3-I-  .byte $7D ; <indirect ref>
  0x03F826 $F816: -D3-I-  .byte $54 ; <indirect ref>
  0x03F827 $F817: -D3-I-  .byte $FC ; <indirect ref>
  0x03F828 $F818: -D3-I-  .byte $C7 ; <indirect ref>
  0x03F829 $F819: -D3-I-  .byte $6A ; <indirect ref>
  0x03F82A $F81A: -D3-I-  .byte $7D ; <indirect ref>
  0x03F82B $F81B: -D3-I-  .byte $4C ; <indirect ref>
  0x03F82C $F81C: -D3-I-  .byte $71 ; <indirect ref>
  0x03F82D $F81D: -D3-I-  .byte $7D ; <indirect ref>
  0x03F82E $F81E: -D3-I-  .byte $54 ; <indirect ref>
  0x03F82F $F81F: -D3-I-  .byte $FC ; <indirect ref>
  0x03F830 $F820: -D3-I-  .byte $5D ; <indirect ref>
  0x03F831 $F821: -D3-I-  .byte $C1 ; <indirect ref>
  0x03F832 $F822: -D3-I-  .byte $74 ; <indirect ref>
  0x03F833 $F823: -D3-I-  .byte $6E ; <indirect ref>
  0x03F834 $F824: -D3-I-  .byte $B6 ; <indirect ref>
  0x03F835 $F825: -D3-I-  .byte $FC ; <indirect ref>
  0x03F836 $F826: -D3-I-  .byte $C2 ; <indirect ref>
  0x03F837 $F827: -D3-I-  .byte $67 ; <indirect ref>
  0x03F838 $F828: -D3-I-  .byte $42 ; <indirect ref>
  0x03F839 $F829: -D3-I-  .byte $C5 ; <indirect ref>
  0x03F83A $F82A: -D3-I-  .byte $4C ; <indirect ref>
  0x03F83B $F82B: -D3-I-  .byte $71 ; <indirect ref>
  0x03F83C $F82C: -D3-I-  .byte $7D ; <indirect ref>
  0x03F83D $F82D: -D3-I-  .byte $54 ; <indirect ref>
  0x03F83E $F82E: -D3-I-  .byte $FC ; <indirect ref>
  0x03F83F $F82F: -D3-I-  .byte $C2 ; <indirect ref>
  0x03F840 $F830: -D3-I-  .byte $67 ; <indirect ref>
  0x03F841 $F831: -D3-I-  .byte $42 ; <indirect ref>
  0x03F842 $F832: -D3-I-  .byte $C5 ; <indirect ref>
  0x03F843 $F833: -D3-I-  .byte $45 ; <indirect ref>
  0x03F844 $F834: -D3-I-  .byte $7D ; <indirect ref>
  0x03F845 $F835: -D3-I-  .byte $C3 ; <indirect ref>
  0x03F846 $F836: -D3-I-  .byte $7D ; <indirect ref>
  0x03F847 $F837: -D3-I-  .byte $5D ; <indirect ref>
  0x03F848 $F838: -D3-I-  .byte $6F ; <indirect ref>
  0x03F849 $F839: -D3-I-  .byte $C2 ; <indirect ref>
  0x03F84A $F83A: -D3-I-  .byte $FC ; <indirect ref>
  0x03F84B $F83B: -D3-I-  .byte $1A ; <indirect ref>
  0x03F84C $F83C: -D3-I-  .byte $24 ; <indirect ref>
  0x03F84D $F83D: -D3-I-  .byte $B1 ; <indirect ref>
  0x03F84E $F83E: -D3-I-  .byte $0B ; <indirect ref>
  0x03F84F $F83F: -D3-I-  .byte $4C ; <indirect ref>
  0x03F850 $F840: -D3-I-  .byte $71 ; <indirect ref>
  0x03F851 $F841: -D3-I-  .byte $7D ; <indirect ref>
  0x03F852 $F842: -D3-I-  .byte $54 ; <indirect ref>
  0x03F853 $F843: -D3-I-  .byte $FC ; <indirect ref>
  0x03F854 $F844: -D3-I-  .byte $1A ; <indirect ref>
  0x03F855 $F845: -D3-I-  .byte $24 ; <indirect ref>
  0x03F856 $F846: -D3-I-  .byte $B1 ; <indirect ref>
  0x03F857 $F847: -D3-I-  .byte $0B ; <indirect ref>
  0x03F858 $F848: -D3-I-  .byte $C7 ; <indirect ref>
  0x03F859 $F849: -D3-I-  .byte $6A ; <indirect ref>
  0x03F85A $F84A: -D3-I-  .byte $7D ; <indirect ref>
  0x03F85B $F84B: -D3-I-  .byte $4C ; <indirect ref>
  0x03F85C $F84C: -D3-I-  .byte $71 ; <indirect ref>
  0x03F85D $F84D: -D3-I-  .byte $7D ; <indirect ref>
  0x03F85E $F84E: -D3-I-  .byte $54 ; <indirect ref>
  0x03F85F $F84F: -D3-I-  .byte $FC ; <indirect ref>
  0x03F860 $F850: -D3-I-  .byte $46 ; <indirect ref>
  0x03F861 $F851: -D3-I-  .byte $60 ; <indirect ref>
  0x03F862 $F852: -D3-I-  .byte $4F ; <indirect ref>
  0x03F863 $F853: -D3-I-  .byte $68 ; <indirect ref>
  0x03F864 $F854: -D3-I-  .byte $4C ; <indirect ref>
  0x03F865 $F855: -D3-I-  .byte $71 ; <indirect ref>
  0x03F866 $F856: -D3-I-  .byte $7D ; <indirect ref>
  0x03F867 $F857: -D3-I-  .byte $54 ; <indirect ref>
  0x03F868 $F858: -D3-I-  .byte $FC ; <indirect ref>
  0x03F869 $F859: -D3-I-  .byte $4D ; <indirect ref>
  0x03F86A $F85A: -D3-I-  .byte $46 ; <indirect ref>
  0x03F86B $F85B: -D3-I-  .byte $42 ; <indirect ref>
  0x03F86C $F85C: -D3-I-  .byte $67 ; <indirect ref>
  0x03F86D $F85D: -D3-I-  .byte $C5 ; <indirect ref>
  0x03F86E $F85E: -D3-I-  .byte $5A ; <indirect ref>
  0x03F86F $F85F: -D3-I-  .byte $68 ; <indirect ref>
  0x03F870 $F860: -D3-I-  .byte $49 ; <indirect ref>
  0x03F871 $F861: -D3-I-  .byte $7D ; <indirect ref>
  0x03F872 $F862: -D3-I-  .byte $6E ; <indirect ref>
  0x03F873 $F863: -D3-I-  .byte $FC ; <indirect ref>
  0x03F874 $F864: -D3-I-  .byte $52 ; <indirect ref>
  0x03F875 $F865: -D3-I-  .byte $42 ; <indirect ref>
  0x03F876 $F866: -D3-I-  .byte $6E ; <indirect ref>
  0x03F877 $F867: -D3-I-  .byte $4C ; <indirect ref>
  0x03F878 $F868: -D3-I-  .byte $71 ; <indirect ref>
  0x03F879 $F869: -D3-I-  .byte $7D ; <indirect ref>
  0x03F87A $F86A: -D3-I-  .byte $54 ; <indirect ref>
  0x03F87B $F86B: -D3-I-  .byte $FC ; <indirect ref>
  0x03F87C $F86C: -D3-I-  .byte $4D ; <indirect ref>
  0x03F87D $F86D: -D3-I-  .byte $46 ; <indirect ref>
  0x03F87E $F86E: -D3-I-  .byte $42 ; <indirect ref>
  0x03F87F $F86F: -D3-I-  .byte $67 ; <indirect ref>
  0x03F880 $F870: -D3-I-  .byte $C5 ; <indirect ref>
  0x03F881 $F871: -D3-I-  .byte $52 ; <indirect ref>
  0x03F882 $F872: -D3-I-  .byte $42 ; <indirect ref>
  0x03F883 $F873: -D3-I-  .byte $6E ; <indirect ref>
  0x03F884 $F874: -D3-I-  .byte $4C ; <indirect ref>
  0x03F885 $F875: -D3-I-  .byte $71 ; <indirect ref>
  0x03F886 $F876: -D3-I-  .byte $7D ; <indirect ref>
  0x03F887 $F877: -D3-I-  .byte $54 ; <indirect ref>
  0x03F888 $F878: -D3-I-  .byte $FC ; <indirect ref>
  0x03F889 $F879: -D3-I-  .byte $42 ; <indirect ref>
  0x03F88A $F87A: -D3-I-  .byte $7D ; <indirect ref>
  0x03F88B $F87B: -D3-I-  .byte $B6 ; <indirect ref>
  0x03F88C $F87C: -D3-I-  .byte $69 ; <indirect ref>
  0x03F88D $F87D: -D3-I-  .byte $4C ; <indirect ref>
  0x03F88E $F87E: -D3-I-  .byte $72 ; <indirect ref>
  0x03F88F $F87F: -D3-I-  .byte $6F ; <indirect ref>
  0x03F890 $F880: -D3-I-  .byte $54 ; <indirect ref>
  0x03F891 $F881: -D3-I-  .byte $FC ; <indirect ref>
  0x03F892 $F882: -D3-I-  .byte $50 ; <indirect ref>
  0x03F893 $F883: -D3-I-  .byte $42 ; <indirect ref>
  0x03F894 $F884: -D3-I-  .byte $B4 ; <indirect ref>
  0x03F895 $F885: -D3-I-  .byte $7D ; <indirect ref>
  0x03F896 $F886: -D3-I-  .byte $4C ; <indirect ref>
  0x03F897 $F887: -D3-I-  .byte $72 ; <indirect ref>
  0x03F898 $F888: -D3-I-  .byte $6F ; <indirect ref>
  0x03F899 $F889: -D3-I-  .byte $54 ; <indirect ref>
  0x03F89A $F88A: -D3-I-  .byte $FC ; <indirect ref>
  0x03F89B $F88B: -D3-I-  .byte $58 ; <indirect ref>
  0x03F89C $F88C: -D3-I-  .byte $45 ; <indirect ref>
  0x03F89D $F88D: -D3-I-  .byte $3F ; <indirect ref>
  0x03F89E $F88E: -D3-I-  .byte $50 ; <indirect ref>
  0x03F89F $F88F: -D3-I-  .byte $42 ; <indirect ref>
  0x03F8A0 $F890: -D3-I-  .byte $B4 ; <indirect ref>
  0x03F8A1 $F891: -D3-I-  .byte $7D ; <indirect ref>
  0x03F8A2 $F892: -D3-I-  .byte $4C ; <indirect ref>
  0x03F8A3 $F893: -D3-I-  .byte $72 ; <indirect ref>
  0x03F8A4 $F894: -D3-I-  .byte $6F ; <indirect ref>
  0x03F8A5 $F895: -D3-I-  .byte $54 ; <indirect ref>
  0x03F8A6 $F896: -D3-I-  .byte $FC ; <indirect ref>
  0x03F8A7 $F897: -D3-I-  .byte $45 ; <indirect ref>
  0x03F8A8 $F898: -D3-I-  .byte $7D ; <indirect ref>
  0x03F8A9 $F899: -D3-I-  .byte $C3 ; <indirect ref>
  0x03F8AA $F89A: -D3-I-  .byte $7D ; <indirect ref>
  0x03F8AB $F89B: -D3-I-  .byte $5D ; <indirect ref>
  0x03F8AC $F89C: -D3-I-  .byte $6F ; <indirect ref>
  0x03F8AD $F89D: -D3-I-  .byte $C2 ; <indirect ref>
  0x03F8AE $F89E: -D3-I-  .byte $47 ; <indirect ref>
  0x03F8AF $F89F: -D3-I-  .byte $6F ; <indirect ref>
  0x03F8B0 $F8A0: -D3-I-  .byte $48 ; <indirect ref>
  0x03F8B1 $F8A1: -D3-I-  .byte $FC ; <indirect ref>
  0x03F8B2 $F8A2: -D3-I-  .byte $5A ; <indirect ref>
  0x03F8B3 $F8A3: -D3-I-  .byte $42 ; <indirect ref>
  0x03F8B4 $F8A4: -D3-I-  .byte $CD ; <indirect ref>
  0x03F8B5 $F8A5: -D3-I-  .byte $7D ; <indirect ref>
  0x03F8B6 $F8A6: -D3-I-  .byte $45 ; <indirect ref>
  0x03F8B7 $F8A7: -D3-I-  .byte $7D ; <indirect ref>
  0x03F8B8 $F8A8: -D3-I-  .byte $C3 ; <indirect ref>
  0x03F8B9 $F8A9: -D3-I-  .byte $7D ; <indirect ref>
  0x03F8BA $F8AA: -D3-I-  .byte $5D ; <indirect ref>
  0x03F8BB $F8AB: -D3-I-  .byte $6F ; <indirect ref>
  0x03F8BC $F8AC: -D3-I-  .byte $C2 ; <indirect ref>
  0x03F8BD $F8AD: -D3-I-  .byte $FC ; <indirect ref>
  0x03F8BE $F8AE: -D3-I-  .byte $BA ; <indirect ref>
  0x03F8BF $F8AF: -D3-I-  .byte $70 ; <indirect ref>
  0x03F8C0 $F8B0: -D3-I-  .byte $6E ; <indirect ref>
  0x03F8C1 $F8B1: -D3-I-  .byte $CE ; <indirect ref>
  0x03F8C2 $F8B2: -D3-I-  .byte $6E ; <indirect ref>
  0x03F8C3 $F8B3: -D3-I-  .byte $B6 ; <indirect ref>
  0x03F8C4 $F8B4: -D3-I-  .byte $C7 ; <indirect ref>
  0x03F8C5 $F8B5: -D3-I-  .byte $6A ; <indirect ref>
  0x03F8C6 $F8B6: -D3-I-  .byte $7D ; <indirect ref>
  0x03F8C7 $F8B7: -D3-I-  .byte $4C ; <indirect ref>
  0x03F8C8 $F8B8: -D3-I-  .byte $71 ; <indirect ref>
  0x03F8C9 $F8B9: -D3-I-  .byte $7D ; <indirect ref>
  0x03F8CA $F8BA: -D3-I-  .byte $54 ; <indirect ref>
  0x03F8CB $F8BB: -D3-I-  .byte $FC ; <indirect ref>
  0x03F8CC $F8BC: -D3-I-  .byte $C2 ; <indirect ref>
  0x03F8CD $F8BD: -D3-I-  .byte $67 ; <indirect ref>
  0x03F8CE $F8BE: -D3-I-  .byte $42 ; <indirect ref>
  0x03F8CF $F8BF: -D3-I-  .byte $C5 ; <indirect ref>
  0x03F8D0 $F8C0: -D3-I-  .byte $50 ; <indirect ref>
  0x03F8D1 $F8C1: -D3-I-  .byte $42 ; <indirect ref>
  0x03F8D2 $F8C2: -D3-I-  .byte $B4 ; <indirect ref>
  0x03F8D3 $F8C3: -D3-I-  .byte $7D ; <indirect ref>
  0x03F8D4 $F8C4: -D3-I-  .byte $FC ; <indirect ref>
  0x03F8D5 $F8C5: -D3-I-  .byte $4B ; <indirect ref>
  0x03F8D6 $F8C6: -D3-I-  .byte $42 ; <indirect ref>
  0x03F8D7 $F8C7: -D3-I-  .byte $48 ; <indirect ref>
  0x03F8D8 $F8C8: -D3-I-  .byte $6B ; <indirect ref>
  0x03F8D9 $F8C9: -D3-I-  .byte $6E ; <indirect ref>
  0x03F8DA $F8CA: -D3-I-  .byte $FC ; <indirect ref>
  0x03F8DB $F8CB: -D3-I-  .byte $0B ; <indirect ref>
  0x03F8DC $F8CC: -D3-I-  .byte $19 ; <indirect ref>
  0x03F8DD $F8CD: -D3-I-  .byte $14 ; <indirect ref>
  0x03F8DE $F8CE: -D3-I-  .byte $19 ; <indirect ref>
  0x03F8DF $F8CF: -D3-I-  .byte $4A ; <indirect ref>
  0x03F8E0 $F8D0: -D3-I-  .byte $6E ; <indirect ref>
  0x03F8E1 $F8D1: -D3-I-  .byte $C4 ; <indirect ref>
  0x03F8E2 $F8D2: -D3-I-  .byte $CF ; <indirect ref>
  0x03F8E3 $F8D3: -D3-I-  .byte $6A ; <indirect ref>
  0x03F8E4 $F8D4: -D3-I-  .byte $42 ; <indirect ref>
  0x03F8E5 $F8D5: -D3-I-  .byte $FC ; <indirect ref>
  0x03F8E6 $F8D6: -D3-I-  .byte $C3 ; <indirect ref>
  0x03F8E7 $F8D7: -D3-I-  .byte $55 ; <indirect ref>
  0x03F8E8 $F8D8: -D3-I-  .byte $55 ; <indirect ref>
  0x03F8E9 $F8D9: -D3-I-  .byte $4C ; <indirect ref>
  0x03F8EA $F8DA: -D3-I-  .byte $71 ; <indirect ref>
  0x03F8EB $F8DB: -D3-I-  .byte $7D ; <indirect ref>
  0x03F8EC $F8DC: -D3-I-  .byte $54 ; <indirect ref>
  0x03F8ED $F8DD: -D3-I-  .byte $FC ; <indirect ref>
  0x03F8EE $F8DE: -D3-I-  .byte $C5 ; <indirect ref>
  0x03F8EF $F8DF: -D3-I-  .byte $7D ; <indirect ref>
  0x03F8F0 $F8E0: -D3-I-  .byte $4D ; <indirect ref>
  0x03F8F1 $F8E1: -D3-I-  .byte $50 ; <indirect ref>
  0x03F8F2 $F8E2: -D3-I-  .byte $7D ; <indirect ref>
  0x03F8F3 $F8E3: -D3-I-  .byte $4C ; <indirect ref>
  0x03F8F4 $F8E4: -D3-I-  .byte $71 ; <indirect ref>
  0x03F8F5 $F8E5: -D3-I-  .byte $7D ; <indirect ref>
  0x03F8F6 $F8E6: -D3-I-  .byte $54 ; <indirect ref>
  0x03F8F7 $F8E7: -D3-I-  .byte $FC ; <indirect ref>
  0x03F8F8 $F8E8: -D3-I-  .byte $60 ; <indirect ref>
  0x03F8F9 $F8E9: -D3-I-  .byte $67 ; <indirect ref>
  0x03F8FA $F8EA: -D3-I-  .byte $7D ; <indirect ref>
  0x03F8FB $F8EB: -D3-I-  .byte $BA ; <indirect ref>
  0x03F8FC $F8EC: -D3-I-  .byte $71 ; <indirect ref>
  0x03F8FD $F8ED: -D3-I-  .byte $4C ; <indirect ref>
  0x03F8FE $F8EE: -D3-I-  .byte $71 ; <indirect ref>
  0x03F8FF $F8EF: -D3-I-  .byte $7D ; <indirect ref>
  0x03F900 $F8F0: -D3-I-  .byte $54 ; <indirect ref>
  0x03F901 $F8F1: -D3-I-  .byte $FC ; <indirect ref>
  0x03F902 $F8F2: -D3-I-  .byte $5F ; <indirect ref>
  0x03F903 $F8F3: -D3-I-  .byte $6F ; <indirect ref>
  0x03F904 $F8F4: -D3-I-  .byte $5A ; <indirect ref>
  0x03F905 $F8F5: -D3-I-  .byte $4C ; <indirect ref>
  0x03F906 $F8F6: -D3-I-  .byte $71 ; <indirect ref>
  0x03F907 $F8F7: -D3-I-  .byte $7D ; <indirect ref>
  0x03F908 $F8F8: -D3-I-  .byte $54 ; <indirect ref>
  0x03F909 $F8F9: -D3-I-  .byte $FC ; <indirect ref>
  0x03F90A $F8FA: -D3-I-  .byte $4B ; <indirect ref>
  0x03F90B $F8FB: -D3-I-  .byte $42 ; <indirect ref>
  0x03F90C $F8FC: -D3-I-  .byte $C2 ; <indirect ref>
  0x03F90D $F8FD: -D3-I-  .byte $6C ; <indirect ref>
  0x03F90E $F8FE: -D3-I-  .byte $42 ; <indirect ref>
  0x03F90F $F8FF: -D3-I-  .byte $6E ; <indirect ref>
  0x03F910 $F900: -D3-I-  .byte $BE ; <indirect ref>
  0x03F911 $F901: -D3-I-  .byte $7D ; <indirect ref>
  0x03F912 $F902: -D3-I-  .byte $FC ; <indirect ref>
  0x03F913 $F903: -D3-I-  .byte $4D ; <indirect ref>
  0x03F914 $F904: -D3-I-  .byte $67 ; <indirect ref>
  0x03F915 $F905: -D3-I-  .byte $42 ; <indirect ref>
  0x03F916 $F906: -D3-I-  .byte $BE ; <indirect ref>
  0x03F917 $F907: -D3-I-  .byte $7D ; <indirect ref>
  0x03F918 $F908: -D3-I-  .byte $4C ; <indirect ref>
  0x03F919 $F909: -D3-I-  .byte $71 ; <indirect ref>
  0x03F91A $F90A: -D3-I-  .byte $7D ; <indirect ref>
  0x03F91B $F90B: -D3-I-  .byte $54 ; <indirect ref>
  0x03F91C $F90C: -D3-I-  .byte $FC ; <indirect ref>
  0x03F91D $F90D: -D3-I-  .byte $47 ; <indirect ref>
  0x03F91E $F90E: -D3-I-  .byte $70 ; <indirect ref>
  0x03F91F $F90F: -D3-I-  .byte $59 ; <indirect ref>
  0x03F920 $F910: -D3-I-  .byte $6E ; <indirect ref>
  0x03F921 $F911: -D3-I-  .byte $4C ; <indirect ref>
  0x03F922 $F912: -D3-I-  .byte $71 ; <indirect ref>
  0x03F923 $F913: -D3-I-  .byte $7D ; <indirect ref>
  0x03F924 $F914: -D3-I-  .byte $54 ; <indirect ref>
  0x03F925 $F915: -D3-I-  .byte $FC ; <indirect ref>
  0x03F926 $F916: -D3-I-  .byte $5C ; <indirect ref>
  0x03F927 $F917: -D3-I-  .byte $73 ; <indirect ref>
  0x03F928 $F918: -D3-I-  .byte $42 ; <indirect ref>
  0x03F929 $F919: -D3-I-  .byte $64 ; <indirect ref>
  0x03F92A $F91A: -D3-I-  .byte $7D ; <indirect ref>
  0x03F92B $F91B: -D3-I-  .byte $4C ; <indirect ref>
  0x03F92C $F91C: -D3-I-  .byte $72 ; <indirect ref>
  0x03F92D $F91D: -D3-I-  .byte $6F ; <indirect ref>
  0x03F92E $F91E: -D3-I-  .byte $54 ; <indirect ref>
  0x03F92F $F91F: -D3-I-  .byte $FC ; <indirect ref>
  0x03F930 $F920: -D3-I-  .byte $BE ; <indirect ref>
  0x03F931 $F921: -D3-I-  .byte $42 ; <indirect ref>
  0x03F932 $F922: -D3-I-  .byte $55 ; <indirect ref>
  0x03F933 $F923: -D3-I-  .byte $5F ; <indirect ref>
  0x03F934 $F924: -D3-I-  .byte $42 ; <indirect ref>
  0x03F935 $F925: -D3-I-  .byte $54 ; <indirect ref>
  0x03F936 $F926: -D3-I-  .byte $5D ; <indirect ref>
  0x03F937 $F927: -D3-I-  .byte $6F ; <indirect ref>
  0x03F938 $F928: -D3-I-  .byte $C2 ; <indirect ref>
  0x03F939 $F929: -D3-I-  .byte $FC ; <indirect ref>
  0x03F93A $F92A: -D3-I-  .byte $47 ; <indirect ref>
  0x03F93B $F92B: -D3-I-  .byte $70 ; <indirect ref>
  0x03F93C $F92C: -D3-I-  .byte $59 ; <indirect ref>
  0x03F93D $F92D: -D3-I-  .byte $6E ; <indirect ref>
  0x03F93E $F92E: -D3-I-  .byte $5D ; <indirect ref>
  0x03F93F $F92F: -D3-I-  .byte $6F ; <indirect ref>
  0x03F940 $F930: -D3-I-  .byte $C2 ; <indirect ref>
  0x03F941 $F931: -D3-I-  .byte $FC ; <indirect ref>
  0x03F942 $F932: -D3-I-  .byte $6B ; <indirect ref>
  0x03F943 $F933: -D3-I-  .byte $49 ; <indirect ref>
  0x03F944 $F934: -D3-I-  .byte $6F ; <indirect ref>
  0x03F945 $F935: -D3-I-  .byte $54 ; <indirect ref>
  0x03F946 $F936: -D3-I-  .byte $5D ; <indirect ref>
  0x03F947 $F937: -D3-I-  .byte $6F ; <indirect ref>
  0x03F948 $F938: -D3-I-  .byte $C2 ; <indirect ref>
  0x03F949 $F939: -D3-I-  .byte $FC ; <indirect ref>
  0x03F94A $F93A: -D3-I-  .byte $0C ; <indirect ref>
  0x03F94B $F93B: -D3-I-  .byte $32 ; <indirect ref>
  0x03F94C $F93C: -D3-I-  .byte $03 ; <indirect ref>
  0x03F94D $F93D: -D3-I-  .byte $28 ; <indirect ref>
  0x03F94E $F93E: -D3-I-  .byte $31 ; <indirect ref>
  0x03F94F $F93F: -D3-I-  .byte $03 ; <indirect ref>
  0x03F950 $F940: -D3-I-  .byte $07 ; <indirect ref>
  0x03F951 $F941: -D3-I-  .byte $30 ; <indirect ref>
  0x03F952 $F942: -D3-I-  .byte $08 ; <indirect ref>
  0x03F953 $F943: -D3-I-  .byte $FC ; <indirect ref>
  0x03F954 $F944: -D3-I-  .byte $A8 ; <indirect ref>
  0x03F955 $F945: -D3-I-  .byte $2E ; <indirect ref>
  0x03F956 $F946: -D3-I-  .byte $13 ; <indirect ref>
  0x03F957 $F947: -D3-I-  .byte $2E ; <indirect ref>
  0x03F958 $F948: -D3-I-  .byte $4C ; <indirect ref>
  0x03F959 $F949: -D3-I-  .byte $71 ; <indirect ref>
  0x03F95A $F94A: -D3-I-  .byte $7D ; <indirect ref>
  0x03F95B $F94B: -D3-I-  .byte $54 ; <indirect ref>
  0x03F95C $F94C: -D3-I-  .byte $FC ; <indirect ref>
  0x03F95D $F94D: -D3-I-  .byte $4D ; <indirect ref>
  0x03F95E $F94E: -D3-I-  .byte $67 ; <indirect ref>
  0x03F95F $F94F: -D3-I-  .byte $42 ; <indirect ref>
  0x03F960 $F950: -D3-I-  .byte $BE ; <indirect ref>
  0x03F961 $F951: -D3-I-  .byte $7D ; <indirect ref>
  0x03F962 $F952: -D3-I-  .byte $47 ; <indirect ref>
  0x03F963 $F953: -D3-I-  .byte $70 ; <indirect ref>
  0x03F964 $F954: -D3-I-  .byte $59 ; <indirect ref>
  0x03F965 $F955: -D3-I-  .byte $6E ; <indirect ref>
  0x03F966 $F956: -D3-I-  .byte $FC ; <indirect ref>
  0x03F967 $F957: -D3-I-  .byte $BE ; <indirect ref>
  0x03F968 $F958: -D3-I-  .byte $C5 ; <indirect ref>
  0x03F969 $F959: -D3-I-  .byte $69 ; <indirect ref>
  0x03F96A $F95A: -D3-I-  .byte $42 ; <indirect ref>
  0x03F96B $F95B: -D3-I-  .byte $7D ; <indirect ref>
  0x03F96C $F95C: -D3-I-  .byte $69 ; <indirect ref>
  0x03F96D $F95D: -D3-I-  .byte $FC ; <indirect ref>
  0x03F96E $F95E: -D3-I-  .byte $C2 ; <indirect ref>
  0x03F96F $F95F: -D3-I-  .byte $68 ; <indirect ref>
  0x03F970 $F960: -D3-I-  .byte $C5 ; <indirect ref>
  0x03F971 $F961: -D3-I-  .byte $69 ; <indirect ref>
  0x03F972 $F962: -D3-I-  .byte $FC ; <indirect ref>
  0x03F973 $F963: -D3-I-  .byte $5B ; <indirect ref>
  0x03F974 $F964: -D3-I-  .byte $7D ; <indirect ref>
  0x03F975 $F965: -D3-I-  .byte $69 ; <indirect ref>
  0x03F976 $F966: -D3-I-  .byte $68 ; <indirect ref>
  0x03F977 $F967: -D3-I-  .byte $5C ; <indirect ref>
  0x03F978 $F968: -D3-I-  .byte $54 ; <indirect ref>
  0x03F979 $F969: -D3-I-  .byte $FC ; <indirect ref>
  0x03F97A $F96A: -D3-I-  .byte $A4 ; <indirect ref>
  0x03F97B $F96B: -D3-I-  .byte $03 ; <indirect ref>
  0x03F97C $F96C: -D3-I-  .byte $02 ; <indirect ref>
  0x03F97D $F96D: -D3-I-  .byte $2E ; <indirect ref>
  0x03F97E $F96E: -D3-I-  .byte $15 ; <indirect ref>
  0x03F97F $F96F: -D3-I-  .byte $C2 ; <indirect ref>
  0x03F980 $F970: -D3-I-  .byte $68 ; <indirect ref>
  0x03F981 $F971: -D3-I-  .byte $C5 ; <indirect ref>
  0x03F982 $F972: -D3-I-  .byte $69 ; <indirect ref>
  0x03F983 $F973: -D3-I-  .byte $FC ; <indirect ref>
  0x03F984 $F974: -D3-I-  .byte $07 ; <indirect ref>
  0x03F985 $F975: -D3-I-  .byte $04 ; <indirect ref>
  0x03F986 $F976: -D3-I-  .byte $29 ; <indirect ref>
  0x03F987 $F977: -D3-I-  .byte $5C ; <indirect ref>
  0x03F988 $F978: -D3-I-  .byte $75 ; <indirect ref>
  0x03F989 $F979: -D3-I-  .byte $42 ; <indirect ref>
  0x03F98A $F97A: -D3-I-  .byte $6E ; <indirect ref>
  0x03F98B $F97B: -D3-I-  .byte $54 ; <indirect ref>
  0x03F98C $F97C: -D3-I-  .byte $FC ; <indirect ref>
  0x03F98D $F97D: -D3-I-  .byte $B1 ; <indirect ref>
  0x03F98E $F97E: -D3-I-  .byte $2E ; <indirect ref>
  0x03F98F $F97F: -D3-I-  .byte $0C ; <indirect ref>
  0x03F990 $F980: -D3-I-  .byte $2E ; <indirect ref>
  0x03F991 $F981: -D3-I-  .byte $C2 ; <indirect ref>
  0x03F992 $F982: -D3-I-  .byte $68 ; <indirect ref>
  0x03F993 $F983: -D3-I-  .byte $C5 ; <indirect ref>
  0x03F994 $F984: -D3-I-  .byte $69 ; <indirect ref>
  0x03F995 $F985: -D3-I-  .byte $FC ; <indirect ref>
  0x03F996 $F986: -D3-I-  .byte $0A ; <indirect ref>
  0x03F997 $F987: -D3-I-  .byte $03 ; <indirect ref>
  0x03F998 $F988: -D3-I-  .byte $0F ; <indirect ref>
  0x03F999 $F989: -D3-I-  .byte $08 ; <indirect ref>
  0x03F99A $F98A: -D3-I-  .byte $C2 ; <indirect ref>
  0x03F99B $F98B: -D3-I-  .byte $68 ; <indirect ref>
  0x03F99C $F98C: -D3-I-  .byte $C5 ; <indirect ref>
  0x03F99D $F98D: -D3-I-  .byte $69 ; <indirect ref>
  0x03F99E $F98E: -D3-I-  .byte $FC ; <indirect ref>
  0x03F99F $F98F: -D3-I-  .byte $1A ; <indirect ref>
  0x03F9A0 $F990: -D3-I-  .byte $28 ; <indirect ref>
  0x03F9A1 $F991: -D3-I-  .byte $18 ; <indirect ref>
  0x03F9A2 $F992: -D3-I-  .byte $A7 ; <indirect ref>
  0x03F9A3 $F993: -D3-I-  .byte $20 ; <indirect ref>
  0x03F9A4 $F994: -D3-I-  .byte $C2 ; <indirect ref>
  0x03F9A5 $F995: -D3-I-  .byte $68 ; <indirect ref>
  0x03F9A6 $F996: -D3-I-  .byte $C5 ; <indirect ref>
  0x03F9A7 $F997: -D3-I-  .byte $69 ; <indirect ref>
  0x03F9A8 $F998: -D3-I-  .byte $FC ; <indirect ref>
  0x03F9A9 $F999: -D3-I-  .byte $CD ; <indirect ref>
  0x03F9AA $F99A: -D3-I-  .byte $4D ; <indirect ref>
  0x03F9AB $F99B: -D3-I-  .byte $FC ; <indirect ref>
  0x03F9AC $F99C: -D3-I-  .byte $C2 ; <indirect ref>
  0x03F9AD $F99D: -D3-I-  .byte $67 ; <indirect ref>
  0x03F9AE $F99E: -D3-I-  .byte $42 ; <indirect ref>
  0x03F9AF $F99F: -D3-I-  .byte $C5 ; <indirect ref>
  0x03F9B0 $F9A0: -D3-I-  .byte $CD ; <indirect ref>
  0x03F9B1 $F9A1: -D3-I-  .byte $4D ; <indirect ref>
  0x03F9B2 $F9A2: -D3-I-  .byte $FC ; <indirect ref>
  0x03F9B3 $F9A3: -D3-I-  .byte $46 ; <indirect ref>
  0x03F9B4 $F9A4: -D3-I-  .byte $60 ; <indirect ref>
  0x03F9B5 $F9A5: -D3-I-  .byte $4F ; <indirect ref>
  0x03F9B6 $F9A6: -D3-I-  .byte $68 ; <indirect ref>
  0x03F9B7 $F9A7: -D3-I-  .byte $CD ; <indirect ref>
  0x03F9B8 $F9A8: -D3-I-  .byte $4D ; <indirect ref>
  0x03F9B9 $F9A9: -D3-I-  .byte $FC ; <indirect ref>
  0x03F9BA $F9AA: -D3-I-  .byte $54 ; <indirect ref>
  0x03F9BB $F9AB: -D3-I-  .byte $6F ; <indirect ref>
  0x03F9BC $F9AC: -D3-I-  .byte $CF ; <indirect ref>
  0x03F9BD $F9AD: -D3-I-  .byte $4D ; <indirect ref>
  0x03F9BE $F9AE: -D3-I-  .byte $CE ; <indirect ref>
  0x03F9BF $F9AF: -D3-I-  .byte $6E ; <indirect ref>
  0x03F9C0 $F9B0: -D3-I-  .byte $CD ; <indirect ref>
  0x03F9C1 $F9B1: -D3-I-  .byte $4D ; <indirect ref>
  0x03F9C2 $F9B2: -D3-I-  .byte $FC ; <indirect ref>
  0x03F9C3 $F9B3: -D3-I-  .byte $6C ; <indirect ref>
  0x03F9C4 $F9B4: -D3-I-  .byte $6E ; <indirect ref>
  0x03F9C5 $F9B5: -D3-I-  .byte $52 ; <indirect ref>
  0x03F9C6 $F9B6: -D3-I-  .byte $7D ; <indirect ref>
  0x03F9C7 $F9B7: -D3-I-  .byte $68 ; <indirect ref>
  0x03F9C8 $F9B8: -D3-I-  .byte $50 ; <indirect ref>
  0x03F9C9 $F9B9: -D3-I-  .byte $7D ; <indirect ref>
  0x03F9CA $F9BA: -D3-I-  .byte $6E ; <indirect ref>
  0x03F9CB $F9BB: -D3-I-  .byte $FC ; <indirect ref>
  0x03F9CC $F9BC: -D3-I-  .byte $B8 ; <indirect ref>
  0x03F9CD $F9BD: -D3-I-  .byte $7D ; <indirect ref>
  0x03F9CE $F9BE: -D3-I-  .byte $69 ; <indirect ref>
  0x03F9CF $F9BF: -D3-I-  .byte $C1 ; <indirect ref>
  0x03F9D0 $F9C0: -D3-I-  .byte $6E ; <indirect ref>
  0x03F9D1 $F9C1: -D3-I-  .byte $4A ; <indirect ref>
  0x03F9D2 $F9C2: -D3-I-  .byte $6E ; <indirect ref>
  0x03F9D3 $F9C3: -D3-I-  .byte $C4 ; <indirect ref>
  0x03F9D4 $F9C4: -D3-I-  .byte $FC ; <indirect ref>
  0x03F9D5 $F9C5: -D3-I-  .byte $14 ; <indirect ref>
  0x03F9D6 $F9C6: -D3-I-  .byte $03 ; <indirect ref>
  0x03F9D7 $F9C7: -D3-I-  .byte $1E ; <indirect ref>
  0x03F9D8 $F9C8: -D3-I-  .byte $03 ; <indirect ref>
  0x03F9D9 $F9C9: -D3-I-  .byte $4A ; <indirect ref>
  0x03F9DA $F9CA: -D3-I-  .byte $6E ; <indirect ref>
  0x03F9DB $F9CB: -D3-I-  .byte $C4 ; <indirect ref>
  0x03F9DC $F9CC: -D3-I-  .byte $FC ; <indirect ref>
  0x03F9DD $F9CD: -D3-I-  .byte $BA ; <indirect ref>
  0x03F9DE $F9CE: -D3-I-  .byte $75 ; <indirect ref>
  0x03F9DF $F9CF: -D3-I-  .byte $60 ; <indirect ref>
  0x03F9E0 $F9D0: -D3-I-  .byte $56 ; <indirect ref>
  0x03F9E1 $F9D1: -D3-I-  .byte $41 ; <indirect ref>
  0x03F9E2 $F9D2: -D3-I-  .byte $50 ; <indirect ref>
  0x03F9E3 $F9D3: -D3-I-  .byte $6F ; <indirect ref>
  0x03F9E4 $F9D4: -D3-I-  .byte $48 ; <indirect ref>
  0x03F9E5 $F9D5: -D3-I-  .byte $FC ; <indirect ref>
  0x03F9E6 $F9D6: -D3-I-  .byte $44 ; <indirect ref>
  0x03F9E7 $F9D7: -D3-I-  .byte $6F ; <indirect ref>
  0x03F9E8 $F9D8: -D3-I-  .byte $5C ; <indirect ref>
  0x03F9E9 $F9D9: -D3-I-  .byte $75 ; <indirect ref>
  0x03F9EA $F9DA: -D3-I-  .byte $69 ; <indirect ref>
  0x03F9EB $F9DB: -D3-I-  .byte $0A ; <indirect ref>
  0x03F9EC $F9DC: -D3-I-  .byte $03 ; <indirect ref>
  0x03F9ED $F9DD: -D3-I-  .byte $A3 ; <indirect ref>
  0x03F9EE $F9DE: -D3-I-  .byte $07 ; <indirect ref>
  0x03F9EF $F9DF: -D3-I-  .byte $FC ; <indirect ref>
  0x03F9F0 $F9E0: -D3-I-  .byte $C5 ; <indirect ref>
  0x03F9F1 $F9E1: -D3-I-  .byte $6B ; <indirect ref>
  0x03F9F2 $F9E2: -D3-I-  .byte $6F ; <indirect ref>
  0x03F9F3 $F9E3: -D3-I-  .byte $48 ; <indirect ref>
  0x03F9F4 $F9E4: -D3-I-  .byte $FC ; <indirect ref>
  0x03F9F5 $F9E5: -D3-I-  .byte $A0 ; <indirect ref>
  0x03F9F6 $F9E6: -D3-I-  .byte $2E ; <indirect ref>
  0x03F9F7 $F9E7: -D3-I-  .byte $22 ; <indirect ref>
  0x03F9F8 $F9E8: -D3-I-  .byte $2E ; <indirect ref>
  0x03F9F9 $F9E9: -D3-I-  .byte $C5 ; <indirect ref>
  0x03F9FA $F9EA: -D3-I-  .byte $6B ; <indirect ref>
  0x03F9FB $F9EB: -D3-I-  .byte $6F ; <indirect ref>
  0x03F9FC $F9EC: -D3-I-  .byte $48 ; <indirect ref>
  0x03F9FD $F9ED: -D3-I-  .byte $FC ; <indirect ref>
  0x03F9FE $F9EE: -D3-I-  .byte $4D ; <indirect ref>
  0x03F9FF $F9EF: -D3-I-  .byte $46 ; <indirect ref>
  0x03FA00 $F9F0: -D3-I-  .byte $42 ; <indirect ref>
  0x03FA01 $F9F1: -D3-I-  .byte $67 ; <indirect ref>
  0x03FA02 $F9F2: -D3-I-  .byte $C5 ; <indirect ref>
  0x03FA03 $F9F3: -D3-I-  .byte $C5 ; <indirect ref>
  0x03FA04 $F9F4: -D3-I-  .byte $6B ; <indirect ref>
  0x03FA05 $F9F5: -D3-I-  .byte $6F ; <indirect ref>
  0x03FA06 $F9F6: -D3-I-  .byte $48 ; <indirect ref>
  0x03FA07 $F9F7: -D3-I-  .byte $FC ; <indirect ref>
  0x03FA08 $F9F8: -D3-I-  .byte $CD ; <indirect ref>
  0x03FA09 $F9F9: -D3-I-  .byte $6C ; <indirect ref>
  0x03FA0A $F9FA: -D3-I-  .byte $7D ; <indirect ref>
  0x03FA0B $F9FB: -D3-I-  .byte $C5 ; <indirect ref>
  0x03FA0C $F9FC: -D3-I-  .byte $6B ; <indirect ref>
  0x03FA0D $F9FD: -D3-I-  .byte $6F ; <indirect ref>
  0x03FA0E $F9FE: -D3-I-  .byte $48 ; <indirect ref>
  0x03FA0F $F9FF: -D3-I-  .byte $FC ; <indirect ref>
  0x03FA10 $FA00: -D3-I-  .byte $50 ; <indirect ref>
  0x03FA11 $FA01: -D3-I-  .byte $6F ; <indirect ref>
  0x03FA12 $FA02: -D3-I-  .byte $48 ; <indirect ref>
  0x03FA13 $FA03: -D3-I-  .byte $69 ; <indirect ref>
  0x03FA14 $FA04: -D3-I-  .byte $FC ; <indirect ref>
  0x03FA15 $FA05: -D3-I-  .byte $4D ; <indirect ref>
  0x03FA16 $FA06: -D3-I-  .byte $46 ; <indirect ref>
  0x03FA17 $FA07: -D3-I-  .byte $42 ; <indirect ref>
  0x03FA18 $FA08: -D3-I-  .byte $67 ; <indirect ref>
  0x03FA19 $FA09: -D3-I-  .byte $C5 ; <indirect ref>
  0x03FA1A $FA0A: -D3-I-  .byte $50 ; <indirect ref>
  0x03FA1B $FA0B: -D3-I-  .byte $6F ; <indirect ref>
  0x03FA1C $FA0C: -D3-I-  .byte $48 ; <indirect ref>
  0x03FA1D $FA0D: -D3-I-  .byte $69 ; <indirect ref>
  0x03FA1E $FA0E: -D3-I-  .byte $FC ; <indirect ref>
  0x03FA1F $FA0F: -D3-I-  .byte $46 ; <indirect ref>
  0x03FA20 $FA10: -D3-I-  .byte $60 ; <indirect ref>
  0x03FA21 $FA11: -D3-I-  .byte $4F ; <indirect ref>
  0x03FA22 $FA12: -D3-I-  .byte $68 ; <indirect ref>
  0x03FA23 $FA13: -D3-I-  .byte $50 ; <indirect ref>
  0x03FA24 $FA14: -D3-I-  .byte $6F ; <indirect ref>
  0x03FA25 $FA15: -D3-I-  .byte $48 ; <indirect ref>
  0x03FA26 $FA16: -D3-I-  .byte $69 ; <indirect ref>
  0x03FA27 $FA17: -D3-I-  .byte $FC ; <indirect ref>
  0x03FA28 $FA18: -D3-I-  .byte $CD ; <indirect ref>
  0x03FA29 $FA19: -D3-I-  .byte $6C ; <indirect ref>
  0x03FA2A $FA1A: -D3-I-  .byte $7D ; <indirect ref>
  0x03FA2B $FA1B: -D3-I-  .byte $50 ; <indirect ref>
  0x03FA2C $FA1C: -D3-I-  .byte $6F ; <indirect ref>
  0x03FA2D $FA1D: -D3-I-  .byte $48 ; <indirect ref>
  0x03FA2E $FA1E: -D3-I-  .byte $69 ; <indirect ref>
  0x03FA2F $FA1F: -D3-I-  .byte $FC ; <indirect ref>
  0x03FA30 $FA20: -D3-I-  .byte $50 ; <indirect ref>
  0x03FA31 $FA21: -D3-I-  .byte $42 ; <indirect ref>
  0x03FA32 $FA22: -D3-I-  .byte $B4 ; <indirect ref>
  0x03FA33 $FA23: -D3-I-  .byte $7D ; <indirect ref>
  0x03FA34 $FA24: -D3-I-  .byte $50 ; <indirect ref>
  0x03FA35 $FA25: -D3-I-  .byte $6F ; <indirect ref>
  0x03FA36 $FA26: -D3-I-  .byte $48 ; <indirect ref>
  0x03FA37 $FA27: -D3-I-  .byte $69 ; <indirect ref>
  0x03FA38 $FA28: -D3-I-  .byte $FC ; <indirect ref>
  0x03FA39 $FA29: ------  .byte $50
  0x03FA3A $FA2A: ------  .byte $6F
  0x03FA3B $FA2B: ------  .byte $48
  0x03FA3C $FA2C: ------  .byte $69
  0x03FA3D $FA2D: ------  .byte $FC
  0x03FA3E $FA2E: -D3-I-  .byte $CD ; <indirect ref>
  0x03FA3F $FA2F: -D3-I-  .byte $4D ; <indirect ref>
  0x03FA40 $FA30: -D3-I-  .byte $46 ; <indirect ref>
  0x03FA41 $FA31: -D3-I-  .byte $6F ; <indirect ref>
  0x03FA42 $FA32: -D3-I-  .byte $54 ; <indirect ref>
  0x03FA43 $FA33: -D3-I-  .byte $FC ; <indirect ref>
  0x03FA44 $FA34: -D3-I-  .byte $4D ; <indirect ref>
  0x03FA45 $FA35: -D3-I-  .byte $46 ; <indirect ref>
  0x03FA46 $FA36: -D3-I-  .byte $42 ; <indirect ref>
  0x03FA47 $FA37: -D3-I-  .byte $67 ; <indirect ref>
  0x03FA48 $FA38: -D3-I-  .byte $C5 ; <indirect ref>
  0x03FA49 $FA39: -D3-I-  .byte $CD ; <indirect ref>
  0x03FA4A $FA3A: -D3-I-  .byte $4D ; <indirect ref>
  0x03FA4B $FA3B: -D3-I-  .byte $46 ; <indirect ref>
  0x03FA4C $FA3C: -D3-I-  .byte $6F ; <indirect ref>
  0x03FA4D $FA3D: -D3-I-  .byte $54 ; <indirect ref>
  0x03FA4E $FA3E: -D3-I-  .byte $FC ; <indirect ref>
  0x03FA4F $FA3F: -D3-I-  .byte $54 ; <indirect ref>
  0x03FA50 $FA40: -D3-I-  .byte $67 ; <indirect ref>
  0x03FA51 $FA41: -D3-I-  .byte $6F ; <indirect ref>
  0x03FA52 $FA42: -D3-I-  .byte $CF ; <indirect ref>
  0x03FA53 $FA43: -D3-I-  .byte $FC ; <indirect ref>
  0x03FA54 $FA44: -D3-I-  .byte $4D ; <indirect ref>
  0x03FA55 $FA45: -D3-I-  .byte $69 ; <indirect ref>
  0x03FA56 $FA46: -D3-I-  .byte $7D ; <indirect ref>
  0x03FA57 $FA47: -D3-I-  .byte $FC ; <indirect ref>
  0x03FA58 $FA48: -D3-I-  .byte $48 ; <indirect ref>
  0x03FA59 $FA49: -D3-I-  .byte $68 ; <indirect ref>
  0x03FA5A $FA4A: -D3-I-  .byte $41 ; <indirect ref>
  0x03FA5B $FA4B: -D3-I-  .byte $7D ; <indirect ref>
  0x03FA5C $FA4C: -D3-I-  .byte $FC ; <indirect ref>
  0x03FA5D $FA4D: ------  .byte $48
  0x03FA5E $FA4E: ------  .byte $68
  0x03FA5F $FA4F: ------  .byte $41
  0x03FA60 $FA50: ------  .byte $7D
  0x03FA61 $FA51: ------  .byte $FC
  0x03FA62 $FA52: ------  .byte $0E
  0x03FA63 $FA53: ------  .byte $28
  0x03FA64 $FA54: ------  .byte $01
  0x03FA65 $FA55: ------  .byte $02
  0x03FA66 $FA56: ------  .byte $FC
  0x03FA67 $FA57: ------  .byte $0E
  0x03FA68 $FA58: ------  .byte $28
  0x03FA69 $FA59: ------  .byte $01
  0x03FA6A $FA5A: ------  .byte $02
  0x03FA6B $FA5B: ------  .byte $FC
  0x03FA6C $FA5C: ------  .byte $5C
  0x03FA6D $FA5D: ------  .byte $76
  0x03FA6E $FA5E: ------  .byte $6B
  0x03FA6F $FA5F: ------  .byte $7D
  0x03FA70 $FA60: ------  .byte $FC
  0x03FA71 $FA61: -D3-I-  .byte $47 ; <indirect ref>
  0x03FA72 $FA62: -D3-I-  .byte $70 ; <indirect ref>
  0x03FA73 $FA63: -D3-I-  .byte $6F ; <indirect ref>
  0x03FA74 $FA64: -D3-I-  .byte $51 ; <indirect ref>
  0x03FA75 $FA65: -D3-I-  .byte $6E ; <indirect ref>
  0x03FA76 $FA66: -D3-I-  .byte $B6 ; <indirect ref>
  0x03FA77 $FA67: -D3-I-  .byte $FC ; <indirect ref>
  0x03FA78 $FA68: ------  .byte $6B
  0x03FA79 $FA69: ------  .byte $7D
  0x03FA7A $FA6A: ------  .byte $68
  0x03FA7B $FA6B: ------  .byte $6E
  0x03FA7C $FA6C: ------  .byte $B6
  0x03FA7D $FA6D: ------  .byte $4E
  0x03FA7E $FA6E: ------  .byte $7D
  0x03FA7F $FA6F: ------  .byte $C5
  0x03FA80 $FA70: ------  .byte $FC
  0x03FA81 $FA71: ------  .byte $B1
  0x03FA82 $FA72: ------  .byte $2E
  0x03FA83 $FA73: ------  .byte $0C
  0x03FA84 $FA74: ------  .byte $2E
  0x03FA85 $FA75: ------  .byte $4E
  0x03FA86 $FA76: ------  .byte $7D
  0x03FA87 $FA77: ------  .byte $C5
  0x03FA88 $FA78: ------  .byte $FC
  0x03FA89 $FA79: ------  .byte $AA
  0x03FA8A $FA7A: ------  .byte $02
  0x03FA8B $FA7B: ------  .byte $06
  0x03FA8C $FA7C: ------  .byte $02
  0x03FA8D $FA7D: ------  .byte $13
  0x03FA8E $FA7E: ------  .byte $2E
  0x03FA8F $FA7F: ------  .byte $4E
  0x03FA90 $FA80: ------  .byte $7D
  0x03FA91 $FA81: ------  .byte $C5
  0x03FA92 $FA82: ------  .byte $FC
  0x03FA93 $FA83: -D3-I-  .byte $CD ; <indirect ref>
  0x03FA94 $FA84: -D3-I-  .byte $6E ; <indirect ref>
  0x03FA95 $FA85: -D3-I-  .byte $51 ; <indirect ref>
  0x03FA96 $FA86: -D3-I-  .byte $6E ; <indirect ref>
  0x03FA97 $FA87: -D3-I-  .byte $B6 ; <indirect ref>
  0x03FA98 $FA88: -D3-I-  .byte $FC ; <indirect ref>
  0x03FA99 $FA89: -D3-I-  .byte $0B ; <indirect ref>
  0x03FA9A $FA8A: -D3-I-  .byte $2E ; <indirect ref>
  0x03FA9B $FA8B: -D3-I-  .byte $06 ; <indirect ref>
  0x03FA9C $FA8C: -D3-I-  .byte $08 ; <indirect ref>
  0x03FA9D $FA8D: -D3-I-  .byte $14 ; <indirect ref>
  0x03FA9E $FA8E: -D3-I-  .byte $B0 ; <indirect ref>
  0x03FA9F $FA8F: -D3-I-  .byte $FC ; <indirect ref>
  0x03FAA0 $FA90: -D3-I-  .byte $0D ; <indirect ref>
  0x03FAA1 $FA91: -D3-I-  .byte $29 ; <indirect ref>
  0x03FAA2 $FA92: -D3-I-  .byte $AE ; <indirect ref>
  0x03FAA3 $FA93: -D3-I-  .byte $02 ; <indirect ref>
  0x03FAA4 $FA94: -D3-I-  .byte $00 ; <indirect ref>
  0x03FAA5 $FA95: -D3-I-  .byte $FC ; <indirect ref>
  0x03FAA6 $FA96: -D3-I-  .byte $0D ; <indirect ref>
  0x03FAA7 $FA97: -D3-I-  .byte $AF ; <indirect ref>
  0x03FAA8 $FA98: -D3-I-  .byte $24 ; <indirect ref>
  0x03FAA9 $FA99: -D3-I-  .byte $08 ; <indirect ref>
  0x03FAAA $FA9A: -D3-I-  .byte $00 ; <indirect ref>
  0x03FAAB $FA9B: -D3-I-  .byte $FC ; <indirect ref>
  0x03FAAC $FA9C: -D3-I-  .byte $07 ; <indirect ref>
  0x03FAAD $FA9D: -D3-I-  .byte $32 ; <indirect ref>
  0x03FAAE $FA9E: -D3-I-  .byte $03 ; <indirect ref>
  0x03FAAF $FA9F: -D3-I-  .byte $2A ; <indirect ref>
  0x03FAB0 $FAA0: -D3-I-  .byte $12 ; <indirect ref>
  0x03FAB1 $FAA1: -D3-I-  .byte $15 ; <indirect ref>
  0x03FAB2 $FAA2: -D3-I-  .byte $00 ; <indirect ref>
  0x03FAB3 $FAA3: -D3-I-  .byte $FC ; <indirect ref>
  0x03FAB4 $FAA4: -D3-I-  .byte $03 ; <indirect ref>
  0x03FAB5 $FAA5: -D3-I-  .byte $1F ; <indirect ref>
  0x03FAB6 $FAA6: -D3-I-  .byte $02 ; <indirect ref>
  0x03FAB7 $FAA7: -D3-I-  .byte $00 ; <indirect ref>
  0x03FAB8 $FAA8: -D3-I-  .byte $FC ; <indirect ref>
  0x03FAB9 $FAA9: -D3-I-  .byte $07 ; <indirect ref>
  0x03FABA $FAAA: -D3-I-  .byte $32 ; <indirect ref>
  0x03FABB $FAAB: -D3-I-  .byte $03 ; <indirect ref>
  0x03FABC $FAAC: -D3-I-  .byte $2A ; <indirect ref>
  0x03FABD $FAAD: -D3-I-  .byte $12 ; <indirect ref>
  0x03FABE $FAAE: -D3-I-  .byte $15 ; <indirect ref>
  0x03FABF $FAAF: -D3-I-  .byte $FC ; <indirect ref>
  0x03FAC0 $FAB0: -D3-I-  .byte $4E ; <indirect ref>
  0x03FAC1 $FAB1: -D3-I-  .byte $6E ; <indirect ref>
  0x03FAC2 $FAB2: -D3-I-  .byte $50 ; <indirect ref>
  0x03FAC3 $FAB3: -D3-I-  .byte $68 ; <indirect ref>
  0x03FAC4 $FAB4: -D3-I-  .byte $6E ; <indirect ref>
  0x03FAC5 $FAB5: -D3-I-  .byte $B6 ; <indirect ref>
  0x03FAC6 $FAB6: -D3-I-  .byte $FC ; <indirect ref>
  0x03FAC7 $FAB7: -D3-I-  .byte $D0 ; <indirect ref>
  0x03FAC8 $FAB8: -D3-I-  .byte $55 ; <indirect ref>
  0x03FAC9 $FAB9: -D3-I-  .byte $69 ; <indirect ref>
  0x03FACA $FABA: -D3-I-  .byte $53 ; <indirect ref>
  0x03FACB $FABB: -D3-I-  .byte $74 ; <indirect ref>
  0x03FACC $FABC: -D3-I-  .byte $47 ; <indirect ref>
  0x03FACD $FABD: -D3-I-  .byte $6F ; <indirect ref>
  0x03FACE $FABE: -D3-I-  .byte $48 ; <indirect ref>
  0x03FACF $FABF: -D3-I-  .byte $FC ; <indirect ref>
  0x03FAD0 $FAC0: -D3-I-  .byte $C7 ; <indirect ref>
  0x03FAD1 $FAC1: -D3-I-  .byte $7D ; <indirect ref>
  0x03FAD2 $FAC2: -D3-I-  .byte $69 ; <indirect ref>
  0x03FAD3 $FAC3: -D3-I-  .byte $FC ; <indirect ref>
  0x03FAD4 $FAC4: -D3-I-  .byte $B8 ; <indirect ref>
  0x03FAD5 $FAC5: -D3-I-  .byte $7D ; <indirect ref>
  0x03FAD6 $FAC6: -D3-I-  .byte $69 ; <indirect ref>
  0x03FAD7 $FAC7: -D3-I-  .byte $FC ; <indirect ref>
  0x03FAD8 $FAC8: -D3-I-  .byte $50 ; <indirect ref>
  0x03FAD9 $FAC9: -D3-I-  .byte $42 ; <indirect ref>
  0x03FADA $FACA: -D3-I-  .byte $79 ; <indirect ref>
  0x03FADB $FACB: -D3-I-  .byte $FC ; <indirect ref>
  0x03FADC $FACC: -D3---  .byte $06
  0x03FADD $FACD: -D3---  .byte $00
  0x03FADE $FACE: -D3---  .byte $0D
  0x03FADF $FACF: -D3---  .byte $00
  0x03FAE0 $FAD0: -D3---  .byte $13
  0x03FAE1 $FAD1: -D3---  .byte $00
  0x03FAE2 $FAD2: -D3---  .byte $19
  0x03FAE3 $FAD3: -D3---  .byte $00
  0x03FAE4 $FAD4: -D3---  .byte $20
  0x03FAE5 $FAD5: -D3---  .byte $00
  0x03FAE6 $FAD6: -D3---  .byte $26
  0x03FAE7 $FAD7: -D3---  .byte $00
  0x03FAE8 $FAD8: -D3---  .byte $2C
  0x03FAE9 $FAD9: -D3---  .byte $00
  0x03FAEA $FADA: -D3---  .byte $33
  0x03FAEB $FADB: -D3---  .byte $00
  0x03FAEC $FADC: -D3---  .byte $39
  0x03FAED $FADD: -D3---  .byte $00
  0x03FAEE $FADE: -D3---  .byte $40
  0x03FAEF $FADF: -D3---  .byte $00
  0x03FAF0 $FAE0: -D3---  .byte $47
  0x03FAF1 $FAE1: -D3---  .byte $00
  0x03FAF2 $FAE2: -D3---  .byte $4E
  0x03FAF3 $FAE3: -D3---  .byte $00
  0x03FAF4 $FAE4: -D3---  .byte $55
  0x03FAF5 $FAE5: -D3---  .byte $00
  0x03FAF6 $FAE6: -D3---  .byte $5C
  0x03FAF7 $FAE7: -D3---  .byte $00
  0x03FAF8 $FAE8: -D3---  .byte $63
  0x03FAF9 $FAE9: -D3---  .byte $00
  0x03FAFA $FAEA: -D3---  .byte $6A
  0x03FAFB $FAEB: -D3---  .byte $00
  0x03FAFC $FAEC: -D3---  .byte $71
  0x03FAFD $FAED: -D3---  .byte $00
  0x03FAFE $FAEE: -D3---  .byte $79
  0x03FAFF $FAEF: -D3---  .byte $00
  0x03FB00 $FAF0: -D3---  .byte $81
  0x03FB01 $FAF1: -D3---  .byte $00
  0x03FB02 $FAF2: -D3---  .byte $89
  0x03FB03 $FAF3: -D3---  .byte $00
  0x03FB04 $FAF4: -D3---  .byte $91
  0x03FB05 $FAF5: -D3---  .byte $00
  0x03FB06 $FAF6: -D3---  .byte $99
  0x03FB07 $FAF7: -D3---  .byte $00
  0x03FB08 $FAF8: -D3---  .byte $A2
  0x03FB09 $FAF9: -D3---  .byte $00
  0x03FB0A $FAFA: -D3---  .byte $AB
  0x03FB0B $FAFB: -D3---  .byte $00
  0x03FB0C $FAFC: -D3---  .byte $B4
  0x03FB0D $FAFD: -D3---  .byte $00
  0x03FB0E $FAFE: -D3---  .byte $BE
  0x03FB0F $FAFF: -D3---  .byte $00
  0x03FB10 $FB00: -D3---  .byte $C8
  0x03FB11 $FB01: -D3---  .byte $00
  0x03FB12 $FB02: -D3---  .byte $D2
  0x03FB13 $FB03: -D3---  .byte $00
  0x03FB14 $FB04: -D3---  .byte $DD
  0x03FB15 $FB05: -D3---  .byte $00
  0x03FB16 $FB06: -D3---  .byte $E8
  0x03FB17 $FB07: -D3---  .byte $00
  0x03FB18 $FB08: -D3---  .byte $F4
  0x03FB19 $FB09: -D3---  .byte $00
  0x03FB1A $FB0A: -D3---  .byte $00
  0x03FB1B $FB0B: -D3---  .byte $01
  0x03FB1C $FB0C: -D3---  .byte $0D
  0x03FB1D $FB0D: -D3---  .byte $01
  0x03FB1E $FB0E: -D3---  .byte $1A
  0x03FB1F $FB0F: -D3---  .byte $01
  0x03FB20 $FB10: -D3---  .byte $29
  0x03FB21 $FB11: -D3---  .byte $01
  0x03FB22 $FB12: -D3---  .byte $38
  0x03FB23 $FB13: -D3---  .byte $01
  0x03FB24 $FB14: -D3---  .byte $48
  0x03FB25 $FB15: -D3---  .byte $01
  0x03FB26 $FB16: -D3---  .byte $59
  0x03FB27 $FB17: -D3---  .byte $01
  0x03FB28 $FB18: -D3---  .byte $6B
  0x03FB29 $FB19: -D3---  .byte $01
  0x03FB2A $FB1A: -D3---  .byte $7F
  0x03FB2B $FB1B: -D3---  .byte $01
  0x03FB2C $FB1C: -D3---  .byte $94
  0x03FB2D $FB1D: -D3---  .byte $01
  0x03FB2E $FB1E: -D3---  .byte $AB
  0x03FB2F $FB1F: -D3---  .byte $01
  0x03FB30 $FB20: -D3---  .byte $C4
  0x03FB31 $FB21: -D3---  .byte $01
  0x03FB32 $FB22: -D3---  .byte $DF
  0x03FB33 $FB23: -D3---  .byte $01
  0x03FB34 $FB24: -D3---  .byte $FD
  0x03FB35 $FB25: -D3---  .byte $01
  0x03FB36 $FB26: -D3---  .byte $1D
  0x03FB37 $FB27: -D3---  .byte $02
  0x03FB38 $FB28: -D3---  .byte $42
  0x03FB39 $FB29: -D3---  .byte $02
  0x03FB3A $FB2A: -D3---  .byte $6A
  0x03FB3B $FB2B: -D3---  .byte $02
  0x03FB3C $FB2C: -D3---  .byte $98
  0x03FB3D $FB2D: -D3---  .byte $02
  0x03FB3E $FB2E: -D3---  .byte $DB
  0x03FB3F $FB2F: -D3---  .byte $02
  0x03FB40 $FB30: -D3---  .byte $07
  0x03FB41 $FB31: -D3---  .byte $03
  0x03FB42 $FB32: -D3---  .byte $4C
  0x03FB43 $FB33: -D3---  .byte $03
  0x03FB44 $FB34: -D3---  .byte $9D
  0x03FB45 $FB35: -D3---  .byte $03
  0x03FB46 $FB36: -D3---  .byte $FE
  0x03FB47 $FB37: -D3---  .byte $03
  0x03FB48 $FB38: -D3---  .byte $74
  0x03FB49 $FB39: -D3---  .byte $04
  0x03FB4A $FB3A: -D3---  .byte $07
  0x03FB4B $FB3B: -D3---  .byte $05
  0x03FB4C $FB3C: -D3---  .byte $C3
  0x03FB4D $FB3D: -D3---  .byte $05
  0x03FB4E $FB3E: -D3---  .byte $BE
  0x03FB4F $FB3F: -D3---  .byte $06
  0x03FB50 $FB40: -D3---  .byte $1B
  0x03FB51 $FB41: -D3---  .byte $08
  0x03FB52 $FB42: -D3---  .byte $27
  0x03FB53 $FB43: -D3---  .byte $0A
  0x03FB54 $FB44: -D3---  .byte $8F
  0x03FB55 $FB45: -D3---  .byte $0D
  0x03FB56 $FB46: -D3---  .byte $5B
  0x03FB57 $FB47: -D3---  .byte $20
  0x03FB58 $FB48: -D3---  .byte $BC
  0x03FB59 $FB49: -D3---  .byte $40
  0x03FB5A $FB4A: -D3---  .byte $FF
  0x03FB5B $FB4B: -D3---  .byte $FF
  0x03FB5C $FB4C: -D3---  .byte $00
  0x03FB5D $FB4D: -D3---  .byte $00
  0x03FB5E $FB4E: -D3---  .byte $00
  0x03FB5F $FB4F: -D3---  .byte $00
  0x03FB60 $FB50: -D3---  .byte $06
  0x03FB61 $FB51: -D3---  .byte $00
  0x03FB62 $FB52: -D3---  .byte $0C
  0x03FB63 $FB53: -D3---  .byte $00
  0x03FB64 $FB54: -D3---  .byte $12
  0x03FB65 $FB55: -D3---  .byte $00
  0x03FB66 $FB56: -D3---  .byte $19
  0x03FB67 $FB57: -D3---  .byte $00
  0x03FB68 $FB58: -D3---  .byte $1F
  0x03FB69 $FB59: -D3---  .byte $00
  0x03FB6A $FB5A: -D3---  .byte $25
  0x03FB6B $FB5B: -D3---  .byte $00
  0x03FB6C $FB5C: -D3---  .byte $2B
  0x03FB6D $FB5D: -D3---  .byte $00
  0x03FB6E $FB5E: -D3---  .byte $31
  0x03FB6F $FB5F: -D3---  .byte $00
  0x03FB70 $FB60: -D3---  .byte $38
  0x03FB71 $FB61: -D3---  .byte $00
  0x03FB72 $FB62: -D3---  .byte $3E
  0x03FB73 $FB63: -D3---  .byte $00
  0x03FB74 $FB64: -D3---  .byte $44
  0x03FB75 $FB65: -D3---  .byte $00
  0x03FB76 $FB66: -D3---  .byte $4A
  0x03FB77 $FB67: -D3---  .byte $00
  0x03FB78 $FB68: -D3---  .byte $50
  0x03FB79 $FB69: -D3---  .byte $00
  0x03FB7A $FB6A: -D3---  .byte $56
  0x03FB7B $FB6B: -D3---  .byte $00
  0x03FB7C $FB6C: -D3---  .byte $5C
  0x03FB7D $FB6D: -D3---  .byte $00
  0x03FB7E $FB6E: -D3---  .byte $61
  0x03FB7F $FB6F: -D3---  .byte $00
  0x03FB80 $FB70: -D3---  .byte $67
  0x03FB81 $FB71: -D3---  .byte $00
  0x03FB82 $FB72: -D3---  .byte $6D
  0x03FB83 $FB73: -D3---  .byte $00
  0x03FB84 $FB74: -D3---  .byte $73
  0x03FB85 $FB75: -D3---  .byte $00
  0x03FB86 $FB76: -D3---  .byte $78
  0x03FB87 $FB77: -D3---  .byte $00
  0x03FB88 $FB78: -D3---  .byte $7E
  0x03FB89 $FB79: -D3---  .byte $00
  0x03FB8A $FB7A: -D3---  .byte $83
  0x03FB8B $FB7B: -D3---  .byte $00
  0x03FB8C $FB7C: -D3---  .byte $88
  0x03FB8D $FB7D: -D3---  .byte $00
  0x03FB8E $FB7E: -D3---  .byte $8E
  0x03FB8F $FB7F: -D3---  .byte $00
  0x03FB90 $FB80: -D3---  .byte $93
  0x03FB91 $FB81: -D3---  .byte $00
  0x03FB92 $FB82: -D3---  .byte $98
  0x03FB93 $FB83: -D3---  .byte $00
  0x03FB94 $FB84: -D3---  .byte $9D
  0x03FB95 $FB85: -D3---  .byte $00
  0x03FB96 $FB86: -D3---  .byte $A2
  0x03FB97 $FB87: -D3---  .byte $00
  0x03FB98 $FB88: -D3---  .byte $A7
  0x03FB99 $FB89: -D3---  .byte $00
  0x03FB9A $FB8A: -D3---  .byte $AB
  0x03FB9B $FB8B: -D3---  .byte $00
  0x03FB9C $FB8C: -D3---  .byte $B0
  0x03FB9D $FB8D: -D3---  .byte $00
  0x03FB9E $FB8E: -D3---  .byte $B5
  0x03FB9F $FB8F: -D3---  .byte $00
  0x03FBA0 $FB90: -D3---  .byte $B9
  0x03FBA1 $FB91: -D3---  .byte $00
  0x03FBA2 $FB92: -D3---  .byte $BD
  0x03FBA3 $FB93: -D3---  .byte $00
  0x03FBA4 $FB94: -D3---  .byte $C1
  0x03FBA5 $FB95: -D3---  .byte $00
  0x03FBA6 $FB96: -D3---  .byte $C5
  0x03FBA7 $FB97: -D3---  .byte $00
  0x03FBA8 $FB98: -D3---  .byte $C9
  0x03FBA9 $FB99: -D3---  .byte $00
  0x03FBAA $FB9A: -D3---  .byte $CD
  0x03FBAB $FB9B: -D3---  .byte $00
  0x03FBAC $FB9C: -D3---  .byte $D1
  0x03FBAD $FB9D: -D3---  .byte $00
  0x03FBAE $FB9E: -D3---  .byte $D4
  0x03FBAF $FB9F: -D3---  .byte $00
  0x03FBB0 $FBA0: -D3---  .byte $D8
  0x03FBB1 $FBA1: -D3---  .byte $00
  0x03FBB2 $FBA2: -D3---  .byte $DB
  0x03FBB3 $FBA3: -D3---  .byte $00
  0x03FBB4 $FBA4: -D3---  .byte $DE
  0x03FBB5 $FBA5: -D3---  .byte $00
  0x03FBB6 $FBA6: -D3---  .byte $E1
  0x03FBB7 $FBA7: -D3---  .byte $00
  0x03FBB8 $FBA8: -D3---  .byte $E4
  0x03FBB9 $FBA9: -D3---  .byte $00
  0x03FBBA $FBAA: -D3---  .byte $E7
  0x03FBBB $FBAB: -D3---  .byte $00
  0x03FBBC $FBAC: -D3---  .byte $EA
  0x03FBBD $FBAD: -D3---  .byte $00
  0x03FBBE $FBAE: -D3---  .byte $EC
  0x03FBBF $FBAF: -D3---  .byte $00
  0x03FBC0 $FBB0: -D3---  .byte $EE
  0x03FBC1 $FBB1: -D3---  .byte $00
  0x03FBC2 $FBB2: -D3---  .byte $F1
  0x03FBC3 $FBB3: -D3---  .byte $00
  0x03FBC4 $FBB4: -D3---  .byte $F3
  0x03FBC5 $FBB5: -D3---  .byte $00
  0x03FBC6 $FBB6: -D3---  .byte $F4
  0x03FBC7 $FBB7: -D3---  .byte $00
  0x03FBC8 $FBB8: -D3---  .byte $F6
  0x03FBC9 $FBB9: -D3---  .byte $00
  0x03FBCA $FBBA: -D3---  .byte $F8
  0x03FBCB $FBBB: -D3---  .byte $00
  0x03FBCC $FBBC: -D3---  .byte $F9
  0x03FBCD $FBBD: -D3---  .byte $00
  0x03FBCE $FBBE: -D3---  .byte $FB
  0x03FBCF $FBBF: -D3---  .byte $00
  0x03FBD0 $FBC0: -D3---  .byte $FC
  0x03FBD1 $FBC1: -D3---  .byte $00
  0x03FBD2 $FBC2: -D3---  .byte $FD
  0x03FBD3 $FBC3: -D3---  .byte $00
  0x03FBD4 $FBC4: -D3---  .byte $FE
  0x03FBD5 $FBC5: -D3---  .byte $00
  0x03FBD6 $FBC6: -D3---  .byte $FE
  0x03FBD7 $FBC7: -D3---  .byte $00
  0x03FBD8 $FBC8: -D3---  .byte $FF
  0x03FBD9 $FBC9: -D3---  .byte $00
  0x03FBDA $FBCA: -D3---  .byte $00
  0x03FBDB $FBCB: -D3---  .byte $01
  0x03FBDC $FBCC: -D3-I-  .byte $00 ; <indirect ref>
  0x03FBDD $FBCD: -D3-I-  .byte $00 ; <indirect ref>
  0x03FBDE $FBCE: -D3-I-  .byte $30 ; <indirect ref>
  0x03FBDF $FBCF: -D3-I-  .byte $36 ; <indirect ref>
  0x03FBE0 $FBD0: -D3-I-  .byte $25 ; <indirect ref>
  0x03FBE1 $FBD1: -D3-I-  .byte $30 ; <indirect ref>
  0x03FBE2 $FBD2: -D3-I-  .byte $1A ; <indirect ref>
  0x03FBE3 $FBD3: -D3-I-  .byte $00 ; <indirect ref>
  0x03FBE4 $FBD4: -D3-I-  .byte $18 ; <indirect ref>
  0x03FBE5 $FBD5: -D3-I-  .byte $1A ; <indirect ref>
  0x03FBE6 $FBD6: -D3-I-  .byte $18 ; <indirect ref>
  0x03FBE7 $FBD7: -D3-I-  .byte $30 ; <indirect ref>
  0x03FBE8 $FBD8: -D3-I-  .byte $21 ; <indirect ref>
  0x03FBE9 $FBD9: -D3-I-  .byte $10 ; <indirect ref>
  0x03FBEA $FBDA: -D3-I-  .byte $30 ; <indirect ref>
  0x03FBEB $FBDB: -D3-I-  .byte $36 ; <indirect ref>
  0x03FBEC $FBDC: -D3-I-  .byte $25 ; <indirect ref>
  0x03FBED $FBDD: -D3-I-  .byte $30 ; <indirect ref>
  0x03FBEE $FBDE: -D3-I-  .byte $19 ; <indirect ref>
  0x03FBEF $FBDF: -D3-I-  .byte $00 ; <indirect ref>
  0x03FBF0 $FBE0: -D3-I-  .byte $2A ; <indirect ref>
  0x03FBF1 $FBE1: -D3-I-  .byte $21 ; <indirect ref>
  0x03FBF2 $FBE2: -D3-I-  .byte $3A ; <indirect ref>
  0x03FBF3 $FBE3: -D3-I-  .byte $1A ; <indirect ref>
  0x03FBF4 $FBE4: -D3-I-  .byte $1A ; <indirect ref>
  0x03FBF5 $FBE5: -D3-I-  .byte $10 ; <indirect ref>
  0x03FBF6 $FBE6: -D3-I-  .byte $30 ; <indirect ref>
  0x03FBF7 $FBE7: -D3-I-  .byte $36 ; <indirect ref>
  0x03FBF8 $FBE8: -D3-I-  .byte $25 ; <indirect ref>
  0x03FBF9 $FBE9: -D3-I-  .byte $30 ; <indirect ref>
  0x03FBFA $FBEA: -D3-I-  .byte $21 ; <indirect ref>
  0x03FBFB $FBEB: -D3-I-  .byte $31 ; <indirect ref>
  0x03FBFC $FBEC: -D3-I-  .byte $30 ; <indirect ref>
  0x03FBFD $FBED: -D3-I-  .byte $21 ; <indirect ref>
  0x03FBFE $FBEE: -D3-I-  .byte $10 ; <indirect ref>
  0x03FBFF $FBEF: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC00 $FBF0: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC01 $FBF1: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC02 $FBF2: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC03 $FBF3: -D3-I-  .byte $21 ; <indirect ref>
  0x03FC04 $FBF4: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC05 $FBF5: -D3-I-  .byte $31 ; <indirect ref>
  0x03FC06 $FBF6: -D3-I-  .byte $21 ; <indirect ref>
  0x03FC07 $FBF7: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC08 $FBF8: -D3-I-  .byte $37 ; <indirect ref>
  0x03FC09 $FBF9: -D3-I-  .byte $21 ; <indirect ref>
  0x03FC0A $FBFA: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC0B $FBFB: -D3-I-  .byte $37 ; <indirect ref>
  0x03FC0C $FBFC: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC0D $FBFD: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC0E $FBFE: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC0F $FBFF: -D3-I-  .byte $21 ; <indirect ref>
  0x03FC10 $FC00: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC11 $FC01: -D3-I-  .byte $27 ; <indirect ref>
  0x03FC12 $FC02: -D3-I-  .byte $21 ; <indirect ref>
  0x03FC13 $FC03: -D3-I-  .byte $11 ; <indirect ref>
  0x03FC14 $FC04: -D3-I-  .byte $16 ; <indirect ref>
  0x03FC15 $FC05: -D3-I-  .byte $21 ; <indirect ref>
  0x03FC16 $FC06: -D3-I-  .byte $11 ; <indirect ref>
  0x03FC17 $FC07: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC18 $FC08: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC19 $FC09: -D3-I-  .byte $25 ; <indirect ref>
  0x03FC1A $FC0A: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC1B $FC0B: -D3-I-  .byte $21 ; <indirect ref>
  0x03FC1C $FC0C: -D3-I-  .byte $27 ; <indirect ref>
  0x03FC1D $FC0D: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC1E $FC0E: -D3-I-  .byte $21 ; <indirect ref>
  0x03FC1F $FC0F: -D3-I-  .byte $27 ; <indirect ref>
  0x03FC20 $FC10: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC21 $FC11: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC22 $FC12: -D3-I-  .byte $27 ; <indirect ref>
  0x03FC23 $FC13: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC24 $FC14: -D3-I-  .byte $1A ; <indirect ref>
  0x03FC25 $FC15: -D3-I-  .byte $18 ; <indirect ref>
  0x03FC26 $FC16: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC27 $FC17: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC28 $FC18: -D3-I-  .byte $25 ; <indirect ref>
  0x03FC29 $FC19: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC2A $FC1A: -D3-I-  .byte $21 ; <indirect ref>
  0x03FC2B $FC1B: -D3-I-  .byte $31 ; <indirect ref>
  0x03FC2C $FC1C: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC2D $FC1D: -D3-I-  .byte $3A ; <indirect ref>
  0x03FC2E $FC1E: -D3-I-  .byte $1A ; <indirect ref>
  0x03FC2F $FC1F: -D3-I-  .byte $1A ; <indirect ref>
  0x03FC30 $FC20: -D3-I-  .byte $1A ; <indirect ref>
  0x03FC31 $FC21: -D3-I-  .byte $10 ; <indirect ref>
  0x03FC32 $FC22: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC33 $FC23: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC34 $FC24: -D3-I-  .byte $25 ; <indirect ref>
  0x03FC35 $FC25: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC36 $FC26: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC37 $FC27: -D3-I-  .byte $21 ; <indirect ref>
  0x03FC38 $FC28: -D3-I-  .byte $07 ; <indirect ref>
  0x03FC39 $FC29: -D3-I-  .byte $21 ; <indirect ref>
  0x03FC3A $FC2A: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC3B $FC2B: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC3C $FC2C: -D3-I-  .byte $2A ; <indirect ref>
  0x03FC3D $FC2D: -D3-I-  .byte $10 ; <indirect ref>
  0x03FC3E $FC2E: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC3F $FC2F: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC40 $FC30: -D3-I-  .byte $25 ; <indirect ref>
  0x03FC41 $FC31: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC42 $FC32: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC43 $FC33: -D3-I-  .byte $21 ; <indirect ref>
  0x03FC44 $FC34: -D3-I-  .byte $07 ; <indirect ref>
  0x03FC45 $FC35: -D3-I-  .byte $21 ; <indirect ref>
  0x03FC46 $FC36: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC47 $FC37: -D3-I-  .byte $15 ; <indirect ref>
  0x03FC48 $FC38: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC49 $FC39: -D3-I-  .byte $10 ; <indirect ref>
  0x03FC4A $FC3A: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC4B $FC3B: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC4C $FC3C: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC4D $FC3D: -D3-I-  .byte $00 ; <indirect ref>
  0x03FC4E $FC3E: -D3-I-  .byte $31 ; <indirect ref>
  0x03FC4F $FC3F: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC50 $FC40: -D3-I-  .byte $10 ; <indirect ref>
  0x03FC51 $FC41: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC52 $FC42: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC53 $FC43: -D3-I-  .byte $00 ; <indirect ref>
  0x03FC54 $FC44: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC55 $FC45: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC56 $FC46: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC57 $FC47: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC58 $FC48: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC59 $FC49: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC5A $FC4A: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC5B $FC4B: -D3-I-  .byte $17 ; <indirect ref>
  0x03FC5C $FC4C: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC5D $FC4D: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC5E $FC4E: -D3-I-  .byte $31 ; <indirect ref>
  0x03FC5F $FC4F: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC60 $FC50: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC61 $FC51: -D3-I-  .byte $31 ; <indirect ref>
  0x03FC62 $FC52: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC63 $FC53: -D3-I-  .byte $07 ; <indirect ref>
  0x03FC64 $FC54: -D3-I-  .byte $18 ; <indirect ref>
  0x03FC65 $FC55: -D3-I-  .byte $28 ; <indirect ref>
  0x03FC66 $FC56: -D3-I-  .byte $00 ; <indirect ref>
  0x03FC67 $FC57: -D3-I-  .byte $00 ; <indirect ref>
  0x03FC68 $FC58: -D3-I-  .byte $00 ; <indirect ref>
  0x03FC69 $FC59: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC6A $FC5A: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC6B $FC5B: -D3-I-  .byte $11 ; <indirect ref>
  0x03FC6C $FC5C: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC6D $FC5D: -D3-I-  .byte $27 ; <indirect ref>
  0x03FC6E $FC5E: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC6F $FC5F: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC70 $FC60: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC71 $FC61: -D3-I-  .byte $31 ; <indirect ref>
  0x03FC72 $FC62: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC73 $FC63: -D3-I-  .byte $00 ; <indirect ref>
  0x03FC74 $FC64: -D3-I-  .byte $00 ; <indirect ref>
  0x03FC75 $FC65: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC76 $FC66: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC77 $FC67: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC78 $FC68: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC79 $FC69: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC7A $FC6A: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC7B $FC6B: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC7C $FC6C: -D3-I-  .byte $16 ; <indirect ref>
  0x03FC7D $FC6D: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC7E $FC6E: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC7F $FC6F: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC80 $FC70: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC81 $FC71: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC82 $FC72: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC83 $FC73: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC84 $FC74: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC85 $FC75: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC86 $FC76: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC87 $FC77: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC88 $FC78: -D3-I-  .byte $19 ; <indirect ref>
  0x03FC89 $FC79: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC8A $FC7A: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC8B $FC7B: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC8C $FC7C: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC8D $FC7D: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC8E $FC7E: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC8F $FC7F: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC90 $FC80: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC91 $FC81: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC92 $FC82: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC93 $FC83: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC94 $FC84: -D3-I-  .byte $16 ; <indirect ref>
  0x03FC95 $FC85: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC96 $FC86: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC97 $FC87: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC98 $FC88: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC99 $FC89: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC9A $FC8A: -D3-I-  .byte $30 ; <indirect ref>
  0x03FC9B $FC8B: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC9C $FC8C: -D3-I-  .byte $0F ; <indirect ref>
  0x03FC9D $FC8D: -D3-I-  .byte $07 ; <indirect ref>
  0x03FC9E $FC8E: -D3-I-  .byte $36 ; <indirect ref>
  0x03FC9F $FC8F: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCA0 $FC90: -D3-I-  .byte $16 ; <indirect ref>
  0x03FCA1 $FC91: -D3-I-  .byte $36 ; <indirect ref>
  0x03FCA2 $FC92: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCA3 $FC93: -D3-I-  .byte $30 ; <indirect ref>
  0x03FCA4 $FC94: -D3-I-  .byte $36 ; <indirect ref>
  0x03FCA5 $FC95: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCA6 $FC96: -D3-I-  .byte $30 ; <indirect ref>
  0x03FCA7 $FC97: -D3-I-  .byte $36 ; <indirect ref>
  0x03FCA8 $FC98: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCA9 $FC99: -D3-I-  .byte $00 ; <indirect ref>
  0x03FCAA $FC9A: -D3-I-  .byte $36 ; <indirect ref>
  0x03FCAB $FC9B: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCAC $FC9C: -D3-I-  .byte $16 ; <indirect ref>
  0x03FCAD $FC9D: -D3-I-  .byte $36 ; <indirect ref>
  0x03FCAE $FC9E: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCAF $FC9F: -D3-I-  .byte $30 ; <indirect ref>
  0x03FCB0 $FCA0: -D3-I-  .byte $36 ; <indirect ref>
  0x03FCB1 $FCA1: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCB2 $FCA2: -D3-I-  .byte $30 ; <indirect ref>
  0x03FCB3 $FCA3: -D3-I-  .byte $36 ; <indirect ref>
  0x03FCB4 $FCA4: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCB5 $FCA5: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCB6 $FCA6: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCB7 $FCA7: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCB8 $FCA8: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCB9 $FCA9: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCBA $FCAA: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCBB $FCAB: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCBC $FCAC: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCBD $FCAD: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCBE $FCAE: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCBF $FCAF: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCC0 $FCB0: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCC1 $FCB1: -D3-I-  .byte $26 ; <indirect ref>
  0x03FCC2 $FCB2: -D3-I-  .byte $30 ; <indirect ref>
  0x03FCC3 $FCB3: -D3-I-  .byte $26 ; <indirect ref>
  0x03FCC4 $FCB4: -D3-I-  .byte $25 ; <indirect ref>
  0x03FCC5 $FCB5: -D3-I-  .byte $30 ; <indirect ref>
  0x03FCC6 $FCB6: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCC7 $FCB7: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCC8 $FCB8: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCC9 $FCB9: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCCA $FCBA: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCCB $FCBB: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCCC $FCBC: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCCD $FCBD: -D3-I-  .byte $27 ; <indirect ref>
  0x03FCCE $FCBE: -D3-I-  .byte $36 ; <indirect ref>
  0x03FCCF $FCBF: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCD0 $FCC0: -D3-I-  .byte $31 ; <indirect ref>
  0x03FCD1 $FCC1: -D3-I-  .byte $30 ; <indirect ref>
  0x03FCD2 $FCC2: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCD3 $FCC3: -D3-I-  .byte $31 ; <indirect ref>
  0x03FCD4 $FCC4: -D3-I-  .byte $27 ; <indirect ref>
  0x03FCD5 $FCC5: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCD6 $FCC6: -D3-I-  .byte $30 ; <indirect ref>
  0x03FCD7 $FCC7: -D3-I-  .byte $36 ; <indirect ref>
  0x03FCD8 $FCC8: -D3-I-  .byte $05 ; <indirect ref>
  0x03FCD9 $FCC9: -D3-I-  .byte $16 ; <indirect ref>
  0x03FCDA $FCCA: -D3-I-  .byte $15 ; <indirect ref>
  0x03FCDB $FCCB: -D3-I-  .byte $30 ; <indirect ref>
  0x03FCDC $FCCC: -D3-I-  .byte $27 ; <indirect ref>
  0x03FCDD $FCCD: -D3-I-  .byte $37 ; <indirect ref>
  0x03FCDE $FCCE: -D3-I-  .byte $10 ; <indirect ref>
  0x03FCDF $FCCF: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCE0 $FCD0: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCE1 $FCD1: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCE2 $FCD2: -D3-I-  .byte $00 ; <indirect ref>
  0x03FCE3 $FCD3: -D3-I-  .byte $30 ; <indirect ref>
  0x03FCE4 $FCD4: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCE5 $FCD5: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCE6 $FCD6: -D3-I-  .byte $30 ; <indirect ref>
  0x03FCE7 $FCD7: -D3-I-  .byte $36 ; <indirect ref>
  0x03FCE8 $FCD8: -D3-I-  .byte $25 ; <indirect ref>
  0x03FCE9 $FCD9: -D3-I-  .byte $30 ; <indirect ref>
  0x03FCEA $FCDA: -D3-I-  .byte $11 ; <indirect ref>
  0x03FCEB $FCDB: -D3-I-  .byte $00 ; <indirect ref>
  0x03FCEC $FCDC: -D3-I-  .byte $30 ; <indirect ref>
  0x03FCED $FCDD: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCEE $FCDE: -D3-I-  .byte $15 ; <indirect ref>
  0x03FCEF $FCDF: -D3-I-  .byte $25 ; <indirect ref>
  0x03FCF0 $FCE0: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCF1 $FCE1: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCF2 $FCE2: -D3-I-  .byte $35 ; <indirect ref>
  0x03FCF3 $FCE3: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCF4 $FCE4: -D3-I-  .byte $31 ; <indirect ref>
  0x03FCF5 $FCE5: -D3-I-  .byte $35 ; <indirect ref>
  0x03FCF6 $FCE6: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCF7 $FCE7: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCF8 $FCE8: -D3-I-  .byte $35 ; <indirect ref>
  0x03FCF9 $FCE9: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCFA $FCEA: -D3-I-  .byte $30 ; <indirect ref>
  0x03FCFB $FCEB: -D3-I-  .byte $35 ; <indirect ref>
  0x03FCFC $FCEC: -D3-I-  .byte $0F ; <indirect ref>
  0x03FCFD $FCED: -D3-I-  .byte $16 ; <indirect ref>
  0x03FCFE $FCEE: -D3-I-  .byte $35 ; <indirect ref>
  0x03FCFF $FCEF: -D3-I-  .byte $0F ; <indirect ref>
  0x03FD00 $FCF0: -D3-I-  .byte $31 ; <indirect ref>
  0x03FD01 $FCF1: -D3-I-  .byte $35 ; <indirect ref>
  0x03FD02 $FCF2: -D3-I-  .byte $0F ; <indirect ref>
  0x03FD03 $FCF3: -D3-I-  .byte $0F ; <indirect ref>
  0x03FD04 $FCF4: -D3-I-  .byte $35 ; <indirect ref>
  0x03FD05 $FCF5: -D3-I-  .byte $0F ; <indirect ref>
  0x03FD06 $FCF6: -D3-I-  .byte $30 ; <indirect ref>
  0x03FD07 $FCF7: -D3-I-  .byte $35 ; <indirect ref>
  0x03FD08 $FCF8: -D3-I-  .byte $21 ; <indirect ref>
  0x03FD09 $FCF9: -D3-I-  .byte $0F ; <indirect ref>
  0x03FD0A $FCFA: -D3-I-  .byte $30 ; <indirect ref>
  0x03FD0B $FCFB: -D3-I-  .byte $21 ; <indirect ref>
  0x03FD0C $FCFC: -D3-I-  .byte $36 ; <indirect ref>
  0x03FD0D $FCFD: -D3-I-  .byte $27 ; <indirect ref>
  0x03FD0E $FCFE: -D3-I-  .byte $21 ; <indirect ref>
  0x03FD0F $FCFF: -D3-I-  .byte $16 ; <indirect ref>
  0x03FD10 $FD00: -D3-I-  .byte $16 ; <indirect ref>
  0x03FD11 $FD01: -D3-I-  .byte $21 ; <indirect ref>
  0x03FD12 $FD02: -D3-I-  .byte $16 ; <indirect ref>
  0x03FD13 $FD03: -D3-I-  .byte $30 ; <indirect ref>
  0x03FD14 $FD04: -D3-I-  .byte $0F ; <indirect ref>
  0x03FD15 $FD05: -D3-I-  .byte $36 ; <indirect ref>
  0x03FD16 $FD06: -D3-I-  .byte $27 ; <indirect ref>
  0x03FD17 $FD07: -D3-I-  .byte $0F ; <indirect ref>
  0x03FD18 $FD08: -D3-I-  .byte $0F ; <indirect ref>
  0x03FD19 $FD09: -D3-I-  .byte $27 ; <indirect ref>
  0x03FD1A $FD0A: -D3-I-  .byte $0F ; <indirect ref>
  0x03FD1B $FD0B: -D3-I-  .byte $30 ; <indirect ref>
  0x03FD1C $FD0C: -D3-I-  .byte $0F ; <indirect ref>
  0x03FD1D $FD0D: -D3-I-  .byte $0F ; <indirect ref>
  0x03FD1E $FD0E: -D3-I-  .byte $36 ; <indirect ref>
  0x03FD1F $FD0F: -D3-I-  .byte $30 ; <indirect ref>
  0x03FD20 $FD10: ------  .byte $FF
  0x03FD21 $FD11: ------  .byte $FF
  0x03FD22 $FD12: ------  .byte $FF
  0x03FD23 $FD13: ------  .byte $FF
  0x03FD24 $FD14: ------  .byte $FF
  0x03FD25 $FD15: ------  .byte $FF
  0x03FD26 $FD16: ------  .byte $FF
  0x03FD27 $FD17: ------  .byte $FF
  0x03FD28 $FD18: ------  .byte $FF
  0x03FD29 $FD19: ------  .byte $FF
  0x03FD2A $FD1A: ------  .byte $FF
  0x03FD2B $FD1B: ------  .byte $FF
  0x03FD2C $FD1C: ------  .byte $FF
  0x03FD2D $FD1D: ------  .byte $FF
  0x03FD2E $FD1E: ------  .byte $FF
  0x03FD2F $FD1F: ------  .byte $FF
  0x03FD30 $FD20: ------  .byte $FF
  0x03FD31 $FD21: ------  .byte $FF
  0x03FD32 $FD22: ------  .byte $FF
  0x03FD33 $FD23: ------  .byte $FF
  0x03FD34 $FD24: ------  .byte $FF
  0x03FD35 $FD25: ------  .byte $FF
  0x03FD36 $FD26: ------  .byte $FF
  0x03FD37 $FD27: ------  .byte $FF
  0x03FD38 $FD28: ------  .byte $FF
  0x03FD39 $FD29: ------  .byte $FF
  0x03FD3A $FD2A: ------  .byte $FF
  0x03FD3B $FD2B: ------  .byte $FF
  0x03FD3C $FD2C: ------  .byte $FF
  0x03FD3D $FD2D: ------  .byte $FF
  0x03FD3E $FD2E: ------  .byte $FF
  0x03FD3F $FD2F: ------  .byte $FF
  0x03FD40 $FD30: ------  .byte $FF
  0x03FD41 $FD31: ------  .byte $FF
  0x03FD42 $FD32: ------  .byte $FF
  0x03FD43 $FD33: ------  .byte $FF
  0x03FD44 $FD34: ------  .byte $FF
  0x03FD45 $FD35: ------  .byte $FF
  0x03FD46 $FD36: ------  .byte $FF
  0x03FD47 $FD37: ------  .byte $FF
  0x03FD48 $FD38: ------  .byte $FF
  0x03FD49 $FD39: ------  .byte $FF
  0x03FD4A $FD3A: ------  .byte $FF
  0x03FD4B $FD3B: ------  .byte $FF
  0x03FD4C $FD3C: ------  .byte $FF
  0x03FD4D $FD3D: ------  .byte $FF
  0x03FD4E $FD3E: ------  .byte $FF
  0x03FD4F $FD3F: ------  .byte $FF
  0x03FD50 $FD40: ------  .byte $FF
  0x03FD51 $FD41: ------  .byte $FF
  0x03FD52 $FD42: ------  .byte $FF
  0x03FD53 $FD43: ------  .byte $FF
  0x03FD54 $FD44: ------  .byte $FF
  0x03FD55 $FD45: ------  .byte $FF
  0x03FD56 $FD46: ------  .byte $FF
  0x03FD57 $FD47: ------  .byte $FF
  0x03FD58 $FD48: ------  .byte $FF
  0x03FD59 $FD49: ------  .byte $FF
  0x03FD5A $FD4A: ------  .byte $FF
  0x03FD5B $FD4B: ------  .byte $FF
  0x03FD5C $FD4C: ------  .byte $FF
  0x03FD5D $FD4D: ------  .byte $FF
  0x03FD5E $FD4E: ------  .byte $FF
  0x03FD5F $FD4F: ------  .byte $FF
  0x03FD60 $FD50: ------  .byte $FF
  0x03FD61 $FD51: ------  .byte $FF
  0x03FD62 $FD52: ------  .byte $FF
  0x03FD63 $FD53: ------  .byte $FF
  0x03FD64 $FD54: ------  .byte $FF
  0x03FD65 $FD55: ------  .byte $FF
  0x03FD66 $FD56: ------  .byte $FF
  0x03FD67 $FD57: ------  .byte $FF
  0x03FD68 $FD58: ------  .byte $FF
  0x03FD69 $FD59: ------  .byte $FF
  0x03FD6A $FD5A: ------  .byte $FF
  0x03FD6B $FD5B: ------  .byte $FF
  0x03FD6C $FD5C: ------  .byte $FF
  0x03FD6D $FD5D: ------  .byte $FF
  0x03FD6E $FD5E: ------  .byte $FF
  0x03FD6F $FD5F: ------  .byte $FF
  0x03FD70 $FD60: ------  .byte $FF
  0x03FD71 $FD61: ------  .byte $FF
  0x03FD72 $FD62: ------  .byte $FF
  0x03FD73 $FD63: ------  .byte $FF
  0x03FD74 $FD64: ------  .byte $FF
  0x03FD75 $FD65: ------  .byte $FF
  0x03FD76 $FD66: ------  .byte $FF
  0x03FD77 $FD67: ------  .byte $FF
  0x03FD78 $FD68: ------  .byte $FF
  0x03FD79 $FD69: ------  .byte $FF
  0x03FD7A $FD6A: ------  .byte $FF
  0x03FD7B $FD6B: ------  .byte $FF
  0x03FD7C $FD6C: ------  .byte $FF
  0x03FD7D $FD6D: ------  .byte $FF
  0x03FD7E $FD6E: ------  .byte $FF
  0x03FD7F $FD6F: ------  .byte $FF
  0x03FD80 $FD70: ------  .byte $FF
  0x03FD81 $FD71: ------  .byte $FF
  0x03FD82 $FD72: ------  .byte $FF
  0x03FD83 $FD73: ------  .byte $FF
  0x03FD84 $FD74: ------  .byte $FF
  0x03FD85 $FD75: ------  .byte $FF
  0x03FD86 $FD76: ------  .byte $FF
  0x03FD87 $FD77: ------  .byte $FF
  0x03FD88 $FD78: ------  .byte $FF
  0x03FD89 $FD79: ------  .byte $FF
  0x03FD8A $FD7A: ------  .byte $FF
  0x03FD8B $FD7B: ------  .byte $FF
  0x03FD8C $FD7C: ------  .byte $FF
  0x03FD8D $FD7D: ------  .byte $FF
  0x03FD8E $FD7E: ------  .byte $FF
  0x03FD8F $FD7F: ------  .byte $FF
  0x03FD90 $FD80: ------  .byte $FF
  0x03FD91 $FD81: ------  .byte $FF
  0x03FD92 $FD82: ------  .byte $FF
  0x03FD93 $FD83: ------  .byte $FF
  0x03FD94 $FD84: ------  .byte $FF
  0x03FD95 $FD85: ------  .byte $FF
  0x03FD96 $FD86: ------  .byte $FF
  0x03FD97 $FD87: ------  .byte $FF
  0x03FD98 $FD88: ------  .byte $FF
  0x03FD99 $FD89: ------  .byte $FF
  0x03FD9A $FD8A: ------  .byte $FF
  0x03FD9B $FD8B: ------  .byte $FF
  0x03FD9C $FD8C: ------  .byte $FF
  0x03FD9D $FD8D: ------  .byte $FF
  0x03FD9E $FD8E: ------  .byte $FF
  0x03FD9F $FD8F: ------  .byte $FF
  0x03FDA0 $FD90: ------  .byte $FF
  0x03FDA1 $FD91: ------  .byte $FF
  0x03FDA2 $FD92: ------  .byte $FF
  0x03FDA3 $FD93: ------  .byte $FF
  0x03FDA4 $FD94: ------  .byte $FF
  0x03FDA5 $FD95: ------  .byte $FF
  0x03FDA6 $FD96: ------  .byte $FF
  0x03FDA7 $FD97: ------  .byte $FF
  0x03FDA8 $FD98: ------  .byte $FF
  0x03FDA9 $FD99: ------  .byte $FF
  0x03FDAA $FD9A: ------  .byte $FF
  0x03FDAB $FD9B: ------  .byte $FF
  0x03FDAC $FD9C: ------  .byte $FF
  0x03FDAD $FD9D: ------  .byte $FF
  0x03FDAE $FD9E: ------  .byte $FF
  0x03FDAF $FD9F: ------  .byte $FF
  0x03FDB0 $FDA0: ------  .byte $FF
  0x03FDB1 $FDA1: ------  .byte $FF
  0x03FDB2 $FDA2: ------  .byte $FF
  0x03FDB3 $FDA3: ------  .byte $FF
  0x03FDB4 $FDA4: ------  .byte $FF
  0x03FDB5 $FDA5: ------  .byte $FF
  0x03FDB6 $FDA6: ------  .byte $FF
  0x03FDB7 $FDA7: ------  .byte $FF
  0x03FDB8 $FDA8: ------  .byte $FF
  0x03FDB9 $FDA9: ------  .byte $FF
  0x03FDBA $FDAA: ------  .byte $FF
  0x03FDBB $FDAB: ------  .byte $FF
  0x03FDBC $FDAC: ------  .byte $FF
  0x03FDBD $FDAD: ------  .byte $FF
  0x03FDBE $FDAE: ------  .byte $FF
  0x03FDBF $FDAF: ------  .byte $FF
  0x03FDC0 $FDB0: ------  .byte $FF
  0x03FDC1 $FDB1: ------  .byte $FF
  0x03FDC2 $FDB2: ------  .byte $FF
  0x03FDC3 $FDB3: ------  .byte $FF
  0x03FDC4 $FDB4: ------  .byte $FF
  0x03FDC5 $FDB5: ------  .byte $FF
  0x03FDC6 $FDB6: ------  .byte $FF
  0x03FDC7 $FDB7: ------  .byte $FF
  0x03FDC8 $FDB8: ------  .byte $FF
  0x03FDC9 $FDB9: ------  .byte $FF
  0x03FDCA $FDBA: ------  .byte $FF
  0x03FDCB $FDBB: ------  .byte $FF
  0x03FDCC $FDBC: ------  .byte $FF
  0x03FDCD $FDBD: ------  .byte $FF
  0x03FDCE $FDBE: ------  .byte $FF
  0x03FDCF $FDBF: ------  .byte $FF
  0x03FDD0 $FDC0: ------  .byte $FF
  0x03FDD1 $FDC1: ------  .byte $FF
  0x03FDD2 $FDC2: ------  .byte $FF
  0x03FDD3 $FDC3: ------  .byte $FF
  0x03FDD4 $FDC4: ------  .byte $FF
  0x03FDD5 $FDC5: ------  .byte $FF
  0x03FDD6 $FDC6: ------  .byte $FF
  0x03FDD7 $FDC7: ------  .byte $FF
  0x03FDD8 $FDC8: ------  .byte $FF
  0x03FDD9 $FDC9: ------  .byte $FF
  0x03FDDA $FDCA: ------  .byte $FF
  0x03FDDB $FDCB: ------  .byte $FF
  0x03FDDC $FDCC: ------  .byte $FF
  0x03FDDD $FDCD: ------  .byte $FF
  0x03FDDE $FDCE: ------  .byte $FF
  0x03FDDF $FDCF: ------  .byte $FF
  0x03FDE0 $FDD0: ------  .byte $FF
  0x03FDE1 $FDD1: ------  .byte $FF
  0x03FDE2 $FDD2: ------  .byte $FF
  0x03FDE3 $FDD3: ------  .byte $FF
  0x03FDE4 $FDD4: ------  .byte $FF
  0x03FDE5 $FDD5: ------  .byte $FF
  0x03FDE6 $FDD6: ------  .byte $FF
  0x03FDE7 $FDD7: ------  .byte $FF
  0x03FDE8 $FDD8: ------  .byte $FF
  0x03FDE9 $FDD9: ------  .byte $FF
  0x03FDEA $FDDA: ------  .byte $FF
  0x03FDEB $FDDB: ------  .byte $FF
  0x03FDEC $FDDC: ------  .byte $FF
  0x03FDED $FDDD: ------  .byte $FF
  0x03FDEE $FDDE: ------  .byte $FF
  0x03FDEF $FDDF: ------  .byte $FF
  0x03FDF0 $FDE0: ------  .byte $FF
  0x03FDF1 $FDE1: ------  .byte $FF
  0x03FDF2 $FDE2: ------  .byte $FF
  0x03FDF3 $FDE3: ------  .byte $FF
  0x03FDF4 $FDE4: ------  .byte $FF
  0x03FDF5 $FDE5: ------  .byte $FF
  0x03FDF6 $FDE6: ------  .byte $FF
  0x03FDF7 $FDE7: ------  .byte $FF
  0x03FDF8 $FDE8: ------  .byte $FF
  0x03FDF9 $FDE9: ------  .byte $FF
  0x03FDFA $FDEA: ------  .byte $FF
  0x03FDFB $FDEB: ------  .byte $FF
  0x03FDFC $FDEC: ------  .byte $FF
  0x03FDFD $FDED: ------  .byte $FF
  0x03FDFE $FDEE: ------  .byte $FF
  0x03FDFF $FDEF: ------  .byte $FF
  0x03FE00 $FDF0: ------  .byte $FF
  0x03FE01 $FDF1: ------  .byte $FF
  0x03FE02 $FDF2: ------  .byte $FF
  0x03FE03 $FDF3: ------  .byte $FF
  0x03FE04 $FDF4: ------  .byte $FF
  0x03FE05 $FDF5: ------  .byte $FF
  0x03FE06 $FDF6: ------  .byte $FF
  0x03FE07 $FDF7: ------  .byte $FF
  0x03FE08 $FDF8: ------  .byte $FF
  0x03FE09 $FDF9: ------  .byte $FF
  0x03FE0A $FDFA: ------  .byte $FF
  0x03FE0B $FDFB: ------  .byte $FF
  0x03FE0C $FDFC: ------  .byte $FF
  0x03FE0D $FDFD: ------  .byte $FF
  0x03FE0E $FDFE: ------  .byte $FF
  0x03FE0F $FDFF: ------  .byte $FF
  0x03FE10 $FE00: ------  .byte $FF
  0x03FE11 $FE01: ------  .byte $FF
  0x03FE12 $FE02: ------  .byte $FF
  0x03FE13 $FE03: ------  .byte $FF
  0x03FE14 $FE04: ------  .byte $FF
  0x03FE15 $FE05: ------  .byte $FF
  0x03FE16 $FE06: ------  .byte $FF
  0x03FE17 $FE07: ------  .byte $FF
  0x03FE18 $FE08: ------  .byte $FF
  0x03FE19 $FE09: ------  .byte $FF
  0x03FE1A $FE0A: ------  .byte $FF
  0x03FE1B $FE0B: ------  .byte $FF
  0x03FE1C $FE0C: ------  .byte $FF
  0x03FE1D $FE0D: ------  .byte $FF
  0x03FE1E $FE0E: ------  .byte $FF
  0x03FE1F $FE0F: ------  .byte $FF
  0x03FE20 $FE10: ------  .byte $FF
  0x03FE21 $FE11: ------  .byte $FF
  0x03FE22 $FE12: ------  .byte $FF
  0x03FE23 $FE13: ------  .byte $FF
  0x03FE24 $FE14: ------  .byte $FF
  0x03FE25 $FE15: ------  .byte $FF
  0x03FE26 $FE16: ------  .byte $FF
  0x03FE27 $FE17: ------  .byte $FF
  0x03FE28 $FE18: ------  .byte $FF
  0x03FE29 $FE19: ------  .byte $FF
  0x03FE2A $FE1A: ------  .byte $FF
  0x03FE2B $FE1B: ------  .byte $FF
  0x03FE2C $FE1C: ------  .byte $FF
  0x03FE2D $FE1D: ------  .byte $FF
  0x03FE2E $FE1E: ------  .byte $FF
  0x03FE2F $FE1F: ------  .byte $FF
  0x03FE30 $FE20: ------  .byte $FF
  0x03FE31 $FE21: ------  .byte $FF
  0x03FE32 $FE22: ------  .byte $FF
  0x03FE33 $FE23: ------  .byte $FF
  0x03FE34 $FE24: ------  .byte $FF
  0x03FE35 $FE25: ------  .byte $FF
  0x03FE36 $FE26: ------  .byte $FF
  0x03FE37 $FE27: ------  .byte $FF
  0x03FE38 $FE28: ------  .byte $FF
  0x03FE39 $FE29: ------  .byte $FF
  0x03FE3A $FE2A: ------  .byte $FF
  0x03FE3B $FE2B: ------  .byte $FF
  0x03FE3C $FE2C: ------  .byte $FF
  0x03FE3D $FE2D: ------  .byte $FF
  0x03FE3E $FE2E: ------  .byte $FF
  0x03FE3F $FE2F: ------  .byte $FF
  0x03FE40 $FE30: ------  .byte $FF
  0x03FE41 $FE31: ------  .byte $FF
  0x03FE42 $FE32: ------  .byte $FF
  0x03FE43 $FE33: ------  .byte $FF
  0x03FE44 $FE34: ------  .byte $FF
  0x03FE45 $FE35: ------  .byte $FF
  0x03FE46 $FE36: ------  .byte $FF
  0x03FE47 $FE37: ------  .byte $FF
  0x03FE48 $FE38: ------  .byte $FF
  0x03FE49 $FE39: ------  .byte $FF
  0x03FE4A $FE3A: ------  .byte $FF
  0x03FE4B $FE3B: ------  .byte $FF
  0x03FE4C $FE3C: ------  .byte $FF
  0x03FE4D $FE3D: ------  .byte $FF
  0x03FE4E $FE3E: ------  .byte $FF
  0x03FE4F $FE3F: ------  .byte $FF
  0x03FE50 $FE40: ------  .byte $FF
  0x03FE51 $FE41: ------  .byte $FF
  0x03FE52 $FE42: ------  .byte $FF
  0x03FE53 $FE43: ------  .byte $FF
  0x03FE54 $FE44: ------  .byte $FF
  0x03FE55 $FE45: ------  .byte $FF
  0x03FE56 $FE46: ------  .byte $FF
  0x03FE57 $FE47: ------  .byte $FF
  0x03FE58 $FE48: ------  .byte $FF
  0x03FE59 $FE49: ------  .byte $FF
  0x03FE5A $FE4A: ------  .byte $FF
  0x03FE5B $FE4B: ------  .byte $FF
  0x03FE5C $FE4C: ------  .byte $FF
  0x03FE5D $FE4D: ------  .byte $FF
  0x03FE5E $FE4E: ------  .byte $FF
  0x03FE5F $FE4F: ------  .byte $FF
  0x03FE60 $FE50: ------  .byte $FF
  0x03FE61 $FE51: ------  .byte $FF
  0x03FE62 $FE52: ------  .byte $FF
  0x03FE63 $FE53: ------  .byte $FF
  0x03FE64 $FE54: ------  .byte $FF
  0x03FE65 $FE55: ------  .byte $FF
  0x03FE66 $FE56: ------  .byte $FF
  0x03FE67 $FE57: ------  .byte $FF
  0x03FE68 $FE58: ------  .byte $FF
  0x03FE69 $FE59: ------  .byte $FF
  0x03FE6A $FE5A: ------  .byte $FF
  0x03FE6B $FE5B: ------  .byte $FF
  0x03FE6C $FE5C: ------  .byte $FF
  0x03FE6D $FE5D: ------  .byte $FF
  0x03FE6E $FE5E: ------  .byte $FF
  0x03FE6F $FE5F: ------  .byte $FF
  0x03FE70 $FE60: ------  .byte $FF
  0x03FE71 $FE61: ------  .byte $FF
  0x03FE72 $FE62: ------  .byte $FF
  0x03FE73 $FE63: ------  .byte $FF
  0x03FE74 $FE64: ------  .byte $FF
  0x03FE75 $FE65: ------  .byte $FF
  0x03FE76 $FE66: ------  .byte $FF
  0x03FE77 $FE67: ------  .byte $FF
  0x03FE78 $FE68: ------  .byte $FF
  0x03FE79 $FE69: ------  .byte $FF
  0x03FE7A $FE6A: ------  .byte $FF
  0x03FE7B $FE6B: ------  .byte $FF
  0x03FE7C $FE6C: ------  .byte $FF
  0x03FE7D $FE6D: ------  .byte $FF
  0x03FE7E $FE6E: ------  .byte $FF
  0x03FE7F $FE6F: ------  .byte $FF
  0x03FE80 $FE70: ------  .byte $FF
  0x03FE81 $FE71: ------  .byte $FF
  0x03FE82 $FE72: ------  .byte $FF
  0x03FE83 $FE73: ------  .byte $FF
  0x03FE84 $FE74: ------  .byte $FF
  0x03FE85 $FE75: ------  .byte $FF
  0x03FE86 $FE76: ------  .byte $FF
  0x03FE87 $FE77: ------  .byte $FF
  0x03FE88 $FE78: ------  .byte $FF
  0x03FE89 $FE79: ------  .byte $FF
  0x03FE8A $FE7A: ------  .byte $FF
  0x03FE8B $FE7B: ------  .byte $FF
  0x03FE8C $FE7C: ------  .byte $FF
  0x03FE8D $FE7D: ------  .byte $FF
  0x03FE8E $FE7E: ------  .byte $FF
  0x03FE8F $FE7F: ------  .byte $FF
  0x03FE90 $FE80: ------  .byte $FF
  0x03FE91 $FE81: ------  .byte $FF
  0x03FE92 $FE82: ------  .byte $FF
  0x03FE93 $FE83: ------  .byte $FF
  0x03FE94 $FE84: ------  .byte $FF
  0x03FE95 $FE85: ------  .byte $FF
  0x03FE96 $FE86: ------  .byte $FF
  0x03FE97 $FE87: ------  .byte $FF
  0x03FE98 $FE88: ------  .byte $FF
  0x03FE99 $FE89: ------  .byte $FF
  0x03FE9A $FE8A: ------  .byte $FF
  0x03FE9B $FE8B: ------  .byte $FF
  0x03FE9C $FE8C: ------  .byte $FF
  0x03FE9D $FE8D: ------  .byte $FF
  0x03FE9E $FE8E: ------  .byte $FF
  0x03FE9F $FE8F: ------  .byte $FF
  0x03FEA0 $FE90: ------  .byte $FF
  0x03FEA1 $FE91: ------  .byte $FF
  0x03FEA2 $FE92: ------  .byte $FF
  0x03FEA3 $FE93: ------  .byte $FF
  0x03FEA4 $FE94: ------  .byte $FF
  0x03FEA5 $FE95: ------  .byte $FF
  0x03FEA6 $FE96: ------  .byte $FF
  0x03FEA7 $FE97: ------  .byte $FF
  0x03FEA8 $FE98: ------  .byte $FF
  0x03FEA9 $FE99: ------  .byte $FF
  0x03FEAA $FE9A: ------  .byte $FF
  0x03FEAB $FE9B: ------  .byte $FF
  0x03FEAC $FE9C: ------  .byte $FF
  0x03FEAD $FE9D: ------  .byte $FF
  0x03FEAE $FE9E: ------  .byte $FF
  0x03FEAF $FE9F: ------  .byte $FF
  0x03FEB0 $FEA0: ------  .byte $FF
  0x03FEB1 $FEA1: ------  .byte $FF
  0x03FEB2 $FEA2: ------  .byte $FF
  0x03FEB3 $FEA3: ------  .byte $FF
  0x03FEB4 $FEA4: ------  .byte $FF
  0x03FEB5 $FEA5: ------  .byte $FF
  0x03FEB6 $FEA6: ------  .byte $FF
  0x03FEB7 $FEA7: ------  .byte $FF
  0x03FEB8 $FEA8: ------  .byte $FF
  0x03FEB9 $FEA9: ------  .byte $FF
  0x03FEBA $FEAA: ------  .byte $FF
  0x03FEBB $FEAB: ------  .byte $FF
  0x03FEBC $FEAC: ------  .byte $FF
  0x03FEBD $FEAD: ------  .byte $FF
  0x03FEBE $FEAE: ------  .byte $FF
  0x03FEBF $FEAF: ------  .byte $FF
  0x03FEC0 $FEB0: ------  .byte $FF
  0x03FEC1 $FEB1: ------  .byte $FF
  0x03FEC2 $FEB2: ------  .byte $FF
  0x03FEC3 $FEB3: ------  .byte $FF
  0x03FEC4 $FEB4: ------  .byte $FF
  0x03FEC5 $FEB5: ------  .byte $FF
  0x03FEC6 $FEB6: ------  .byte $FF
  0x03FEC7 $FEB7: ------  .byte $FF
  0x03FEC8 $FEB8: ------  .byte $FF
  0x03FEC9 $FEB9: ------  .byte $FF
  0x03FECA $FEBA: ------  .byte $FF
  0x03FECB $FEBB: ------  .byte $FF
  0x03FECC $FEBC: ------  .byte $FF
  0x03FECD $FEBD: ------  .byte $FF
  0x03FECE $FEBE: ------  .byte $FF
  0x03FECF $FEBF: ------  .byte $FF
  0x03FED0 $FEC0: ------  .byte $FF
  0x03FED1 $FEC1: ------  .byte $FF
  0x03FED2 $FEC2: ------  .byte $FF
  0x03FED3 $FEC3: ------  .byte $FF
  0x03FED4 $FEC4: ------  .byte $FF
  0x03FED5 $FEC5: ------  .byte $FF
  0x03FED6 $FEC6: ------  .byte $FF
  0x03FED7 $FEC7: ------  .byte $FF
  0x03FED8 $FEC8: ------  .byte $FF
  0x03FED9 $FEC9: ------  .byte $FF
  0x03FEDA $FECA: ------  .byte $FF
  0x03FEDB $FECB: ------  .byte $FF
  0x03FEDC $FECC: ------  .byte $FF
  0x03FEDD $FECD: ------  .byte $FF
  0x03FEDE $FECE: ------  .byte $FF
  0x03FEDF $FECF: ------  .byte $FF
  0x03FEE0 $FED0: ------  .byte $FF
  0x03FEE1 $FED1: ------  .byte $FF
  0x03FEE2 $FED2: ------  .byte $FF
  0x03FEE3 $FED3: ------  .byte $FF
  0x03FEE4 $FED4: ------  .byte $FF
  0x03FEE5 $FED5: ------  .byte $FF
  0x03FEE6 $FED6: ------  .byte $FF
  0x03FEE7 $FED7: ------  .byte $FF
  0x03FEE8 $FED8: ------  .byte $FF
  0x03FEE9 $FED9: ------  .byte $FF
  0x03FEEA $FEDA: ------  .byte $FF
  0x03FEEB $FEDB: ------  .byte $FF
  0x03FEEC $FEDC: ------  .byte $FF
  0x03FEED $FEDD: ------  .byte $FF
  0x03FEEE $FEDE: ------  .byte $FF
  0x03FEEF $FEDF: ------  .byte $FF
  0x03FEF0 $FEE0: ------  .byte $FF
  0x03FEF1 $FEE1: ------  .byte $FF
  0x03FEF2 $FEE2: ------  .byte $FF
  0x03FEF3 $FEE3: ------  .byte $FF
  0x03FEF4 $FEE4: ------  .byte $FF
  0x03FEF5 $FEE5: ------  .byte $FF
  0x03FEF6 $FEE6: ------  .byte $FF
  0x03FEF7 $FEE7: ------  .byte $FF
  0x03FEF8 $FEE8: ------  .byte $FF
  0x03FEF9 $FEE9: ------  .byte $FF
  0x03FEFA $FEEA: ------  .byte $FF
  0x03FEFB $FEEB: ------  .byte $FF
  0x03FEFC $FEEC: ------  .byte $FF
  0x03FEFD $FEED: ------  .byte $FF
  0x03FEFE $FEEE: ------  .byte $FF
  0x03FEFF $FEEF: ------  .byte $FF
  0x03FF00 $FEF0: ------  .byte $FF
  0x03FF01 $FEF1: ------  .byte $FF
  0x03FF02 $FEF2: ------  .byte $FF
  0x03FF03 $FEF3: ------  .byte $FF
  0x03FF04 $FEF4: ------  .byte $FF
  0x03FF05 $FEF5: ------  .byte $FF
  0x03FF06 $FEF6: ------  .byte $FF
  0x03FF07 $FEF7: ------  .byte $FF
  0x03FF08 $FEF8: ------  .byte $FF
  0x03FF09 $FEF9: ------  .byte $FF
  0x03FF0A $FEFA: ------  .byte $FF
  0x03FF0B $FEFB: ------  .byte $FF
  0x03FF0C $FEFC: ------  .byte $FF
  0x03FF0D $FEFD: ------  .byte $FF
  0x03FF0E $FEFE: ------  .byte $FF
  0x03FF0F $FEFF: ------  .byte $FF
  0x03FF10 $FF00: ------  .byte $FF
  0x03FF11 $FF01: ------  .byte $FF
  0x03FF12 $FF02: ------  .byte $FF
  0x03FF13 $FF03: ------  .byte $FF
  0x03FF14 $FF04: ------  .byte $FF
  0x03FF15 $FF05: ------  .byte $FF
  0x03FF16 $FF06: ------  .byte $FF
  0x03FF17 $FF07: ------  .byte $FF
  0x03FF18 $FF08: ------  .byte $FF
  0x03FF19 $FF09: ------  .byte $FF
  0x03FF1A $FF0A: ------  .byte $FF
  0x03FF1B $FF0B: ------  .byte $FF
  0x03FF1C $FF0C: ------  .byte $FF
  0x03FF1D $FF0D: ------  .byte $FF
  0x03FF1E $FF0E: ------  .byte $FF
  0x03FF1F $FF0F: ------  .byte $FF
  0x03FF20 $FF10: ------  .byte $FF
  0x03FF21 $FF11: ------  .byte $FF
  0x03FF22 $FF12: ------  .byte $FF
  0x03FF23 $FF13: ------  .byte $FF
  0x03FF24 $FF14: ------  .byte $FF
  0x03FF25 $FF15: ------  .byte $FF
  0x03FF26 $FF16: ------  .byte $FF
  0x03FF27 $FF17: ------  .byte $FF
  0x03FF28 $FF18: ------  .byte $FF
  0x03FF29 $FF19: ------  .byte $FF
  0x03FF2A $FF1A: ------  .byte $FF
  0x03FF2B $FF1B: ------  .byte $FF
  0x03FF2C $FF1C: ------  .byte $FF
  0x03FF2D $FF1D: ------  .byte $FF
  0x03FF2E $FF1E: ------  .byte $FF
  0x03FF2F $FF1F: ------  .byte $FF
  0x03FF30 $FF20: ------  .byte $FF
  0x03FF31 $FF21: ------  .byte $FF
  0x03FF32 $FF22: ------  .byte $FF
  0x03FF33 $FF23: ------  .byte $FF
  0x03FF34 $FF24: ------  .byte $FF
  0x03FF35 $FF25: ------  .byte $FF
  0x03FF36 $FF26: ------  .byte $FF
  0x03FF37 $FF27: ------  .byte $FF
  0x03FF38 $FF28: ------  .byte $FF
  0x03FF39 $FF29: ------  .byte $FF
  0x03FF3A $FF2A: ------  .byte $FF
  0x03FF3B $FF2B: ------  .byte $FF
  0x03FF3C $FF2C: ------  .byte $FF
  0x03FF3D $FF2D: ------  .byte $FF
  0x03FF3E $FF2E: ------  .byte $FF
  0x03FF3F $FF2F: ------  .byte $FF
  0x03FF40 $FF30: ------  .byte $FF
  0x03FF41 $FF31: ------  .byte $FF
  0x03FF42 $FF32: ------  .byte $FF
  0x03FF43 $FF33: ------  .byte $FF
  0x03FF44 $FF34: ------  .byte $FF
  0x03FF45 $FF35: ------  .byte $FF
  0x03FF46 $FF36: ------  .byte $FF
  0x03FF47 $FF37: ------  .byte $FF
  0x03FF48 $FF38: ------  .byte $FF
  0x03FF49 $FF39: ------  .byte $FF
  0x03FF4A $FF3A: ------  .byte $FF
  0x03FF4B $FF3B: ------  .byte $FF
  0x03FF4C $FF3C: ------  .byte $FF
  0x03FF4D $FF3D: ------  .byte $FF
  0x03FF4E $FF3E: ------  .byte $FF
  0x03FF4F $FF3F: ------  .byte $FF
  0x03FF50 $FF40: ------  .byte $FF
  0x03FF51 $FF41: ------  .byte $FF
  0x03FF52 $FF42: ------  .byte $FF
  0x03FF53 $FF43: ------  .byte $FF
  0x03FF54 $FF44: ------  .byte $FF
  0x03FF55 $FF45: ------  .byte $FF
  0x03FF56 $FF46: ------  .byte $FF
  0x03FF57 $FF47: ------  .byte $FF
  0x03FF58 $FF48: ------  .byte $FF
  0x03FF59 $FF49: ------  .byte $FF
  0x03FF5A $FF4A: ------  .byte $FF
  0x03FF5B $FF4B: ------  .byte $FF
  0x03FF5C $FF4C: ------  .byte $FF
  0x03FF5D $FF4D: ------  .byte $FF
  0x03FF5E $FF4E: ------  .byte $FF
  0x03FF5F $FF4F: ------  .byte $FF
  0x03FF60 $FF50: ------  .byte $FF
  0x03FF61 $FF51: ------  .byte $FF
  0x03FF62 $FF52: ------  .byte $FF
  0x03FF63 $FF53: ------  .byte $FF
  0x03FF64 $FF54: ------  .byte $FF
  0x03FF65 $FF55: ------  .byte $FF
  0x03FF66 $FF56: ------  .byte $FF
  0x03FF67 $FF57: ------  .byte $FF
  0x03FF68 $FF58: ------  .byte $FF
  0x03FF69 $FF59: ------  .byte $FF
  0x03FF6A $FF5A: ------  .byte $FF
  0x03FF6B $FF5B: ------  .byte $FF
  0x03FF6C $FF5C: ------  .byte $FF
  0x03FF6D $FF5D: ------  .byte $FF
  0x03FF6E $FF5E: ------  .byte $FF
  0x03FF6F $FF5F: ------  .byte $FF
  0x03FF70 $FF60: ------  .byte $FF
  0x03FF71 $FF61: ------  .byte $FF
  0x03FF72 $FF62: ------  .byte $FF
  0x03FF73 $FF63: ------  .byte $FF
  0x03FF74 $FF64: ------  .byte $FF
  0x03FF75 $FF65: ------  .byte $FF
  0x03FF76 $FF66: ------  .byte $FF
  0x03FF77 $FF67: ------  .byte $FF
  0x03FF78 $FF68: ------  .byte $FF
  0x03FF79 $FF69: ------  .byte $FF
  0x03FF7A $FF6A: ------  .byte $FF
  0x03FF7B $FF6B: ------  .byte $FF
  0x03FF7C $FF6C: ------  .byte $FF
  0x03FF7D $FF6D: ------  .byte $FF
  0x03FF7E $FF6E: ------  .byte $FF
  0x03FF7F $FF6F: ------  .byte $FF
  0x03FF80 $FF70: ------  .byte $FF
  0x03FF81 $FF71: ------  .byte $FF
  0x03FF82 $FF72: ------  .byte $FF
  0x03FF83 $FF73: ------  .byte $FF
  0x03FF84 $FF74: ------  .byte $FF
  0x03FF85 $FF75: ------  .byte $FF
  0x03FF86 $FF76: ------  .byte $FF
  0x03FF87 $FF77: ------  .byte $FF
  0x03FF88 $FF78: ------  .byte $FF
  0x03FF89 $FF79: ------  .byte $FF
  0x03FF8A $FF7A: ------  .byte $FF
  0x03FF8B $FF7B: ------  .byte $FF
  0x03FF8C $FF7C: ------  .byte $FF
  0x03FF8D $FF7D: ------  .byte $FF
  0x03FF8E $FF7E: ------  .byte $FF
  0x03FF8F $FF7F: ------  .byte $FF
  0x03FF90 $FF80: ------  .byte $FF
  0x03FF91 $FF81: ------  .byte $FF
  0x03FF92 $FF82: ------  .byte $FF
  0x03FF93 $FF83: ------  .byte $FF
  0x03FF94 $FF84: ------  .byte $FF
  0x03FF95 $FF85: ------  .byte $FF
  0x03FF96 $FF86: ------  .byte $FF
  0x03FF97 $FF87: ------  .byte $FF
  0x03FF98 $FF88: ------  .byte $FF
  0x03FF99 $FF89: ------  .byte $FF
  0x03FF9A $FF8A: ------  .byte $FF
  0x03FF9B $FF8B: ------  .byte $FF
  0x03FF9C $FF8C: ------  .byte $FF
  0x03FF9D $FF8D: ------  .byte $FF
  0x03FF9E $FF8E: ------  .byte $FF
  0x03FF9F $FF8F: ------  .byte $FF
  0x03FFA0 $FF90: ------  .byte $FF
  0x03FFA1 $FF91: ------  .byte $FF
  0x03FFA2 $FF92: ------  .byte $FF
  0x03FFA3 $FF93: ------  .byte $FF
  0x03FFA4 $FF94: ------  .byte $FF
  0x03FFA5 $FF95: ------  .byte $FF
  0x03FFA6 $FF96: ------  .byte $FF
  0x03FFA7 $FF97: ------  .byte $FF
  0x03FFA8 $FF98: ------  .byte $FF
  0x03FFA9 $FF99: ------  .byte $FF
  0x03FFAA $FF9A: ------  .byte $FF
  0x03FFAB $FF9B: ------  .byte $FF
  0x03FFAC $FF9C: ------  .byte $FF
  0x03FFAD $FF9D: ------  .byte $FF
  0x03FFAE $FF9E: ------  .byte $FF
  0x03FFAF $FF9F: ------  .byte $FF
  0x03FFB0 $FFA0: ------  .byte $FF
  0x03FFB1 $FFA1: ------  .byte $FF
  0x03FFB2 $FFA2: ------  .byte $FF
  0x03FFB3 $FFA3: ------  .byte $FF
  0x03FFB4 $FFA4: ------  .byte $FF
  0x03FFB5 $FFA5: ------  .byte $FF
  0x03FFB6 $FFA6: ------  .byte $FF
  0x03FFB7 $FFA7: ------  .byte $FF
  0x03FFB8 $FFA8: ------  .byte $FF
  0x03FFB9 $FFA9: ------  .byte $FF
  0x03FFBA $FFAA: ------  .byte $FF
  0x03FFBB $FFAB: ------  .byte $FF
  0x03FFBC $FFAC: ------  .byte $FF
  0x03FFBD $FFAD: ------  .byte $FF
  0x03FFBE $FFAE: ------  .byte $FF
  0x03FFBF $FFAF: ------  .byte $FF
  0x03FFC0 $FFB0: ------  .byte $FF
  0x03FFC1 $FFB1: ------  .byte $FF
  0x03FFC2 $FFB2: ------  .byte $FF
  0x03FFC3 $FFB3: ------  .byte $FF
  0x03FFC4 $FFB4: ------  .byte $FF
  0x03FFC5 $FFB5: ------  .byte $FF
  0x03FFC6 $FFB6: ------  .byte $FF
  0x03FFC7 $FFB7: ------  .byte $FF
  0x03FFC8 $FFB8: ------  .byte $FF
  0x03FFC9 $FFB9: ------  .byte $FF
  0x03FFCA $FFBA: ------  .byte $FF
  0x03FFCB $FFBB: ------  .byte $FF
  0x03FFCC $FFBC: ------  .byte $FF
  0x03FFCD $FFBD: ------  .byte $FF
  0x03FFCE $FFBE: ------  .byte $FF
  0x03FFCF $FFBF: ------  .byte $FF
  0x03FFD0 $FFC0: ------  .byte $FF
  0x03FFD1 $FFC1: ------  .byte $FF
  0x03FFD2 $FFC2: ------  .byte $FF
  0x03FFD3 $FFC3: ------  .byte $FF
  0x03FFD4 $FFC4: ------  .byte $FF
  0x03FFD5 $FFC5: ------  .byte $FF
  0x03FFD6 $FFC6: ------  .byte $FF
  0x03FFD7 $FFC7: ------  .byte $FF
  0x03FFD8 $FFC8: ------  .byte $FF
  0x03FFD9 $FFC9: ------  .byte $FF
  0x03FFDA $FFCA: ------  .byte $FF
  0x03FFDB $FFCB: ------  .byte $FF
  0x03FFDC $FFCC: ------  .byte $FF
  0x03FFDD $FFCD: ------  .byte $FF
  0x03FFDE $FFCE: ------  .byte $FF
  0x03FFDF $FFCF: ------  .byte $FF
  0x03FFE0 $FFD0: ------  .byte $FF
  0x03FFE1 $FFD1: ------  .byte $FF
  0x03FFE2 $FFD2: ------  .byte $FF
  0x03FFE3 $FFD3: ------  .byte $FF
  0x03FFE4 $FFD4: ------  .byte $FF
  0x03FFE5 $FFD5: ------  .byte $FF
  0x03FFE6 $FFD6: ------  .byte $FF
  0x03FFE7 $FFD7: ------  .byte $FF
  0x03FFE8 $FFD8: ------  .byte $FF
  0x03FFE9 $FFD9: ------  .byte $FF
  0x03FFEA $FFDA: ------  .byte $FF
  0x03FFEB $FFDB: ------  .byte $FF
  0x03FFEC $FFDC: ------  .byte $FF
  0x03FFED $FFDD: ------  .byte $FF
  0x03FFEE $FFDE: ------  .byte $FF
  0x03FFEF $FFDF: ------  .byte $FF
  0x03FFF0 $FFE0: ------  .byte $FF
  0x03FFF1 $FFE1: ------  .byte $FF
  0x03FFF2 $FFE2: ------  .byte $FF
  0x03FFF3 $FFE3: ------  .byte $FF
  0x03FFF4 $FFE4: ------  .byte $FF
  0x03FFF5 $FFE5: ------  .byte $FF
  0x03FFF6 $FFE6: ------  .byte $FF
  0x03FFF7 $FFE7: ------  .byte $FF
  0x03FFF8 $FFE8: ------  .byte $FF
  0x03FFF9 $FFE9: ------  .byte $FF
  0x03FFFA $FFEA: ------  .byte $FF
  0x03FFFB $FFEB: ------  .byte $FF
  0x03FFFC $FFEC: ------  .byte $FF
  0x03FFFD $FFED: ------  .byte $FF
  0x03FFFE $FFEE: ------  .byte $FF
  0x03FFFF $FFEF: ------  .byte $FF
  0x040000 $FFF0: C-----  A9 00    LDA  #$00
  0x040002 $FFF2: C-----  8D 00 80 STA  $8000
  0x040005 $FFF5: C-----  4C 03 C5 JMP  $C503
  0x040008 $FFF8: ------  .byte $00
  0x040009 $FFF9: ------  .byte $00
  0x04000A $FFFA: -D3---  .byte $00
  0x04000B $FFFB: -D3---  .byte $C5
  0x04000C $FFFC: -D3---  .byte $F0
  0x04000D $FFFD: -D3---  .byte $FF
  0x04000E $FFFE: -D3---  .byte $06
  0x04000F $FFFF: -D3---  .byte $C5