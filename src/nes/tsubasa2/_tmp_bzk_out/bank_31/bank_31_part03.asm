; bank_31.asm 分片 3/7 (原文件行 2001-3000, 共 6131 行)

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