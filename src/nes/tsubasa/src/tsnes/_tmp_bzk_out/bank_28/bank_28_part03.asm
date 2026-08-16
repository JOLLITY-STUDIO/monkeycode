; bank_28.asm 分片 3/7 (原文件行 2001-3000, 共 6754 行)

C - - - - - 0x038CE1 0E:8CD1: F0 F4     BEQ $8CC7
C - - - - - 0x038CE3 0E:8CD3: 60        RTS
C - - J - - 0x038CE4 0E:8CD4: A4 46     LDY ram_0046
C - - - - - 0x038CE6 0E:8CD6: C8        INY
C - - - - - 0x038CE7 0E:8CD7: B1 48     LDA (ram_0048),Y
C - - - - - 0x038CE9 0E:8CD9: C9 FF     CMP #$FF
C - - - - - 0x038CEB 0E:8CDB: F0 1A     BEQ $8CF7
C - - - - - 0x038CED 0E:8CDD: 85 45     STA ram_0045
C - - - - - 0x038CEF 0E:8CDF: A9 01     LDA #$01
C - - - - - 0x038CF1 0E:8CE1: 48        PHA
C - - - - - 0x038CF2 0E:8CE2: 20 0C C5  JSR $C50C
C - - - - - 0x038CF5 0E:8CE5: A0 00     LDY #$00
C - - - - - 0x038CF7 0E:8CE7: B1 34     LDA (ram_0034),Y
C - - - - - 0x038CF9 0E:8CE9: C5 45     CMP ram_0045
C - - - - - 0x038CFB 0E:8CEB: F0 09     BEQ $8CF6
C - - - - - 0x038CFD 0E:8CED: 68        PLA
C - - - - - 0x038CFE 0E:8CEE: 18        CLC
C - - - - - 0x038CFF 0E:8CEF: 69 01     ADC #$01
C - - - - - 0x038D01 0E:8CF1: C9 0B     CMP #$0B
C - - - - - 0x038D03 0E:8CF3: D0 EC     BNE $8CE1
C - - - - - 0x038D05 0E:8CF5: 60        RTS
C - - - - - 0x038D06 0E:8CF6: 68        PLA
C - - - - - 0x038D07 0E:8CF7: 4C C7 8C  JMP $8CC7
C - - J - - 0x038D0A 0E:8CFA: A4 46     LDY ram_0046
C - - - - - 0x038D0C 0E:8CFC: C8        INY
C - - - - - 0x038D0D 0E:8CFD: B1 48     LDA (ram_0048),Y
C - - - - - 0x038D0F 0E:8CFF: C9 FF     CMP #$FF
C - - - - - 0x038D11 0E:8D01: D0 03     BNE $8D06
C - - - - - 0x038D13 0E:8D03: 4C C7 8C  JMP $8CC7
C - - - - - 0x038D16 0E:8D06: A9 01     LDA #$01
C - - - - - 0x038D18 0E:8D08: 48        PHA
C - - - - - 0x038D19 0E:8D09: 20 0C C5  JSR $C50C
C - - - - - 0x038D1C 0E:8D0C: A0 00     LDY #$00
C - - - - - 0x038D1E 0E:8D0E: B1 34     LDA (ram_0034),Y
C - - - - - 0x038D20 0E:8D10: C9 1C     CMP #$1C
C - - - - - 0x038D22 0E:8D12: F0 09     BEQ $8D1D
C - - - - - 0x038D24 0E:8D14: 68        PLA
C - - - - - 0x038D25 0E:8D15: 18        CLC
C - - - - - 0x038D26 0E:8D16: 69 01     ADC #$01
C - - - - - 0x038D28 0E:8D18: C9 0B     CMP #$0B
C - - - - - 0x038D2A 0E:8D1A: D0 EC     BNE $8D08
C - - - - - 0x038D2C 0E:8D1C: 60        RTS
C - - - - - 0x038D2D 0E:8D1D: 68        PLA
C - - - - - 0x038D2E 0E:8D1E: 4C D4 8C  JMP $8CD4
C - - J - - 0x038D31 0E:8D21: 2C 49 04  BIT ram_0449
C - - - - - 0x038D34 0E:8D24: 10 03     BPL $8D29
C - - - - - 0x038D36 0E:8D26: 4C D4 8C  JMP $8CD4
C - - - - - 0x038D39 0E:8D29: 60        RTS
C - - J - - 0x038D3A 0E:8D2A: AD 21 06  LDA ram_0621
C - - - - - 0x038D3D 0E:8D2D: C9 04     CMP #$04
C - - - - - 0x038D3F 0E:8D2F: F0 0C     BEQ $8D3D
C - - - - - 0x038D41 0E:8D31: AD 2B 00  LDA a: ram_002B
C - - - - - 0x038D44 0E:8D34: C9 21     CMP #$21
C - - - - - 0x038D46 0E:8D36: B0 06     BCS $8D3E
C - - - - - 0x038D48 0E:8D38: AD 48 04  LDA ram_0448
C - - - - - 0x038D4B 0E:8D3B: D0 01     BNE $8D3E
C - - - - - 0x038D4D 0E:8D3D: 60        RTS
C - - - - - 0x038D4E 0E:8D3E: 4C C7 8C  JMP $8CC7
C - - J - - 0x038D51 0E:8D41: AD 4E 04  LDA ram_044E
C - - - - - 0x038D54 0E:8D44: D0 07     BNE $8D4D
C - - - - - 0x038D56 0E:8D46: A0 00     LDY #$00
C - - - - - 0x038D58 0E:8D48: B1 48     LDA (ram_0048),Y
C - - - - - 0x038D5A 0E:8D4A: 4C 11 8E  JMP $8E11
C - - - - - 0x038D5D 0E:8D4D: 60        RTS
C - - J - - 0x038D5E 0E:8D4E: A0 00     LDY #$00
C - - - - - 0x038D60 0E:8D50: B1 48     LDA (ram_0048),Y
C - - - - - 0x038D62 0E:8D52: 4C 11 8E  JMP $8E11
C - - J - - 0x038D65 0E:8D55: 4C E2 8D  JMP $8DE2
C D 0 - - - 0x038D68 0E:8D58: A8        TAY
C - - - - - 0x038D69 0E:8D59: D0 03     BNE $8D5E
C - - - - - 0x038D6B 0E:8D5B: 4C A6 8D  JMP $8DA6
C - - - - - 0x038D6E 0E:8D5E: C9 0B     CMP #$0B
C - - - - - 0x038D70 0E:8D60: D0 03     BNE $8D65
- - - - - - 0x038D72 0E:8D62: 4C        .byte $4C   ; <L>
- - - - - - 0x038D73 0E:8D63: A6        .byte $A6   ; 
- - - - - - 0x038D74 0E:8D64: 8D        .byte $8D   ; 
C - - - - - 0x038D75 0E:8D65: E0 03     CPX #$03
C - - - - - 0x038D77 0E:8D67: B0 1F     BCS $8D88
C - - - - - 0x038D79 0E:8D69: AC 4E 04  LDY ram_044E
C - - - - - 0x038D7C 0E:8D6C: F0 04     BEQ $8D72
C - - - - - 0x038D7E 0E:8D6E: E0 02     CPX #$02
C - - - - - 0x038D80 0E:8D70: D0 16     BNE $8D88
C - - - - - 0x038D82 0E:8D72: 20 C9 8D  JSR $8DC9
C - - - - - 0x038D85 0E:8D75: AD 30 04  LDA ram_0430
C - - - - - 0x038D88 0E:8D78: 18        CLC
C - - - - - 0x038D89 0E:8D79: 69 04     ADC #$04
C - - - - - 0x038D8B 0E:8D7B: 0A        ASL
C - - - - - 0x038D8C 0E:8D7C: A8        TAY
C - - - - - 0x038D8D 0E:8D7D: B1 48     LDA (ram_0048),Y
C - - - - - 0x038D8F 0E:8D7F: C8        INY
C - - - - - 0x038D90 0E:8D80: D1 48     CMP (ram_0048),Y
C - - - - - 0x038D92 0E:8D82: D0 0A     BNE $8D8E
C - - - - - 0x038D94 0E:8D84: C9 00     CMP #$00
C - - - - - 0x038D96 0E:8D86: D0 06     BNE $8D8E
C - - - - - 0x038D98 0E:8D88: A9 00     LDA #$00
C - - - - - 0x038D9A 0E:8D8A: 8D 30 04  STA ram_0430
C - - - - - 0x038D9D 0E:8D8D: 60        RTS
C - - - - - 0x038D9E 0E:8D8E: AA        TAX
C - - - - - 0x038D9F 0E:8D8F: B1 48     LDA (ram_0048),Y
C - - - - - 0x038DA1 0E:8D91: 85 49     STA ram_0049
C - - - - - 0x038DA3 0E:8D93: 86 48     STX ram_0048
C - - - - - 0x038DA5 0E:8D95: AD 30 04  LDA ram_0430
C - - - - - 0x038DA8 0E:8D98: A2 00     LDX #$00
C - - - - - 0x038DAA 0E:8D9A: 8E 30 04  STX ram_0430
C - - - - - 0x038DAD 0E:8D9D: 20 09 C5  JSR $C509
- D 0 - I - 0x038DB0 0E:8DA0: E2        .byte $E2   ; 
- D 0 - I - 0x038DB1 0E:8DA1: 8D        .byte $8D   ; 
- D 0 - I - 0x038DB2 0E:8DA2: E2        .byte $E2   ; 
- D 0 - I - 0x038DB3 0E:8DA3: 8D        .byte $8D   ; 
- D 0 - I - 0x038DB4 0E:8DA4: E2        .byte $E2   ; 
- D 0 - I - 0x038DB5 0E:8DA5: 8D        .byte $8D   ; 
C D 0 - - - 0x038DB6 0E:8DA6: E0 00     CPX #$00
C - - - - - 0x038DB8 0E:8DA8: D0 10     BNE $8DBA
C - - - - - 0x038DBA 0E:8DAA: 20 C9 8D  JSR $8DC9
C - - - - - 0x038DBD 0E:8DAD: A0 00     LDY #$00
C - - - - - 0x038DBF 0E:8DAF: B1 48     LDA (ram_0048),Y
C - - - - - 0x038DC1 0E:8DB1: C8        INY
C - - - - - 0x038DC2 0E:8DB2: D1 48     CMP (ram_0048),Y
C - - - - - 0x038DC4 0E:8DB4: D0 0A     BNE $8DC0
C - - - - - 0x038DC6 0E:8DB6: C9 00     CMP #$00
C - - - - - 0x038DC8 0E:8DB8: D0 06     BNE $8DC0
C - - - - - 0x038DCA 0E:8DBA: A9 00     LDA #$00
C - - - - - 0x038DCC 0E:8DBC: 8D 30 04  STA ram_0430
C - - - - - 0x038DCF 0E:8DBF: 60        RTS
C - - - - - 0x038DD0 0E:8DC0: 8D 31 04  STA ram_0431
C - - - - - 0x038DD3 0E:8DC3: A9 01     LDA #$01
C - - - - - 0x038DD5 0E:8DC5: 8D 30 04  STA ram_0430
C - - - - - 0x038DD8 0E:8DC8: 60        RTS
C - - - - - 0x038DD9 0E:8DC9: 8E 30 04  STX ram_0430
C - - - - - 0x038DDC 0E:8DCC: 85 47     STA ram_0047
C - - - - - 0x038DDE 0E:8DCE: 20 0C C5  JSR $C50C
C - - - - - 0x038DE1 0E:8DD1: A0 00     LDY #$00
C - - - - - 0x038DE3 0E:8DD3: B1 34     LDA (ram_0034),Y
C - - - - - 0x038DE5 0E:8DD5: 0A        ASL
C - - - - - 0x038DE6 0E:8DD6: AA        TAX
C - - - - - 0x038DE7 0E:8DD7: BD 1B 8E  LDA $8E1B,X
C - - - - - 0x038DEA 0E:8DDA: 85 48     STA ram_0048
C - - - - - 0x038DEC 0E:8DDC: BD 1C 8E  LDA $8E1C,X
C - - - - - 0x038DEF 0E:8DDF: 85 49     STA ram_0049
C - - - - - 0x038DF1 0E:8DE1: 60        RTS
C D 0 - - - 0x038DF2 0E:8DE2: A0 00     LDY #$00
C - - - - - 0x038DF4 0E:8DE4: B1 48     LDA (ram_0048),Y
C - - - - - 0x038DF6 0E:8DE6: 10 05     BPL $8DED
C - - - - - 0x038DF8 0E:8DE8: 29 7F     AND #$7F
C - - - - - 0x038DFA 0E:8DEA: 4C 11 8E  JMP $8E11
C - - - - - 0x038DFD 0E:8DED: C8        INY
C - - - - - 0x038DFE 0E:8DEE: B1 48     LDA (ram_0048),Y
C - - - - - 0x038E00 0E:8DF0: 85 45     STA ram_0045
C - - - - - 0x038E02 0E:8DF2: A9 01     LDA #$01
C - - - - - 0x038E04 0E:8DF4: 48        PHA
C - - - - - 0x038E05 0E:8DF5: 20 0C C5  JSR $C50C
C - - - - - 0x038E08 0E:8DF8: A0 00     LDY #$00
C - - - - - 0x038E0A 0E:8DFA: B1 34     LDA (ram_0034),Y
C - - - - - 0x038E0C 0E:8DFC: C5 45     CMP ram_0045
C - - - - - 0x038E0E 0E:8DFE: F0 09     BEQ $8E09
C - - - - - 0x038E10 0E:8E00: 68        PLA
C - - - - - 0x038E11 0E:8E01: 18        CLC
C - - - - - 0x038E12 0E:8E02: 69 01     ADC #$01
C - - - - - 0x038E14 0E:8E04: C9 0B     CMP #$0B
C - - - - - 0x038E16 0E:8E06: D0 EC     BNE $8DF4
C - - - - - 0x038E18 0E:8E08: 60        RTS
C - - - - - 0x038E19 0E:8E09: 68        PLA
C - - - - - 0x038E1A 0E:8E0A: A0 00     LDY #$00
C - - - - - 0x038E1C 0E:8E0C: B1 48     LDA (ram_0048),Y
C - - - - - 0x038E1E 0E:8E0E: 4C 11 8E  JMP $8E11
C D 0 - - - 0x038E21 0E:8E11: AE 30 04  LDX ram_0430
C - - - - - 0x038E24 0E:8E14: 9D 31 04  STA ram_0431,X
C - - - - - 0x038E27 0E:8E17: EE 30 04  INC ram_0430
C - - - - - 0x038E2A 0E:8E1A: 60        RTS
- D 0 - - - 0x038E2B 0E:8E1B: 07        .byte $07   ; 
- D 0 - - - 0x038E2C 0E:8E1C: 8F        .byte $8F   ; 
- D 0 - - - 0x038E2D 0E:8E1D: 17        .byte $17   ; 
- D 0 - - - 0x038E2E 0E:8E1E: 8F        .byte $8F   ; 
- - - - - - 0x038E2F 0E:8E1F: 07        .byte $07   ; 
- - - - - - 0x038E30 0E:8E20: 8F        .byte $8F   ; 
- D 0 - - - 0x038E31 0E:8E21: 07        .byte $07   ; 
- D 0 - - - 0x038E32 0E:8E22: 8F        .byte $8F   ; 
- D 0 - - - 0x038E33 0E:8E23: 07        .byte $07   ; 
- D 0 - - - 0x038E34 0E:8E24: 8F        .byte $8F   ; 
- D 0 - - - 0x038E35 0E:8E25: 07        .byte $07   ; 
- D 0 - - - 0x038E36 0E:8E26: 8F        .byte $8F   ; 
- D 0 - - - 0x038E37 0E:8E27: 07        .byte $07   ; 
- D 0 - - - 0x038E38 0E:8E28: 8F        .byte $8F   ; 
- D 0 - - - 0x038E39 0E:8E29: 07        .byte $07   ; 
- D 0 - - - 0x038E3A 0E:8E2A: 8F        .byte $8F   ; 
- D 0 - - - 0x038E3B 0E:8E2B: 07        .byte $07   ; 
- D 0 - - - 0x038E3C 0E:8E2C: 8F        .byte $8F   ; 
- D 0 - - - 0x038E3D 0E:8E2D: 07        .byte $07   ; 
- D 0 - - - 0x038E3E 0E:8E2E: 8F        .byte $8F   ; 
- D 0 - - - 0x038E3F 0E:8E2F: 07        .byte $07   ; 
- D 0 - - - 0x038E40 0E:8E30: 8F        .byte $8F   ; 
- D 0 - - - 0x038E41 0E:8E31: 07        .byte $07   ; 
- D 0 - - - 0x038E42 0E:8E32: 8F        .byte $8F   ; 
- D 0 - - - 0x038E43 0E:8E33: 07        .byte $07   ; 
- D 0 - - - 0x038E44 0E:8E34: 8F        .byte $8F   ; 
- D 0 - - - 0x038E45 0E:8E35: 07        .byte $07   ; 
- D 0 - - - 0x038E46 0E:8E36: 8F        .byte $8F   ; 
- D 0 - - - 0x038E47 0E:8E37: 07        .byte $07   ; 
- D 0 - - - 0x038E48 0E:8E38: 8F        .byte $8F   ; 
- - - - - - 0x038E49 0E:8E39: 07        .byte $07   ; 
- - - - - - 0x038E4A 0E:8E3A: 8F        .byte $8F   ; 
- D 0 - - - 0x038E4B 0E:8E3B: 07        .byte $07   ; 
- D 0 - - - 0x038E4C 0E:8E3C: 8F        .byte $8F   ; 
- D 0 - - - 0x038E4D 0E:8E3D: 25        .byte $25   ; 
- D 0 - - - 0x038E4E 0E:8E3E: 8F        .byte $8F   ; 
- D 0 - - - 0x038E4F 0E:8E3F: 07        .byte $07   ; 
- D 0 - - - 0x038E50 0E:8E40: 8F        .byte $8F   ; 
- D 0 - - - 0x038E51 0E:8E41: 07        .byte $07   ; 
- D 0 - - - 0x038E52 0E:8E42: 8F        .byte $8F   ; 
- D 0 - - - 0x038E53 0E:8E43: 33        .byte $33   ; <3>
- D 0 - - - 0x038E54 0E:8E44: 8F        .byte $8F   ; 
- D 0 - - - 0x038E55 0E:8E45: 41        .byte $41   ; <A>
- D 0 - - - 0x038E56 0E:8E46: 8F        .byte $8F   ; 
- D 0 - - - 0x038E57 0E:8E47: 07        .byte $07   ; 
- D 0 - - - 0x038E58 0E:8E48: 8F        .byte $8F   ; 
- D 0 - - - 0x038E59 0E:8E49: 4F        .byte $4F   ; <O>
- D 0 - - - 0x038E5A 0E:8E4A: 8F        .byte $8F   ; 
- D 0 - - - 0x038E5B 0E:8E4B: 5D        .byte $5D   ; 
- D 0 - - - 0x038E5C 0E:8E4C: 8F        .byte $8F   ; 
- D 0 - - - 0x038E5D 0E:8E4D: 6B        .byte $6B   ; <k>
- D 0 - - - 0x038E5E 0E:8E4E: 8F        .byte $8F   ; 
- D 0 - - - 0x038E5F 0E:8E4F: 79        .byte $79   ; <y>
- D 0 - - - 0x038E60 0E:8E50: 8F        .byte $8F   ; 
- D 0 - - - 0x038E61 0E:8E51: 87        .byte $87   ; 
- D 0 - - - 0x038E62 0E:8E52: 8F        .byte $8F   ; 
- D 0 - - - 0x038E63 0E:8E53: 95        .byte $95   ; 
- D 0 - - - 0x038E64 0E:8E54: 8F        .byte $8F   ; 
- D 0 - - - 0x038E65 0E:8E55: A3        .byte $A3   ; 
- D 0 - - - 0x038E66 0E:8E56: 8F        .byte $8F   ; 
- D 0 - - - 0x038E67 0E:8E57: 07        .byte $07   ; 
- D 0 - - - 0x038E68 0E:8E58: 8F        .byte $8F   ; 
- D 0 - - - 0x038E69 0E:8E59: B1        .byte $B1   ; 
- D 0 - - - 0x038E6A 0E:8E5A: 8F        .byte $8F   ; 
- D 0 - - - 0x038E6B 0E:8E5B: BF        .byte $BF   ; 
- D 0 - - - 0x038E6C 0E:8E5C: 8F        .byte $8F   ; 
- - - - - - 0x038E6D 0E:8E5D: 07        .byte $07   ; 
- - - - - - 0x038E6E 0E:8E5E: 8F        .byte $8F   ; 
- - - - - - 0x038E6F 0E:8E5F: 07        .byte $07   ; 
- - - - - - 0x038E70 0E:8E60: 8F        .byte $8F   ; 
- D 0 - - - 0x038E71 0E:8E61: CD        .byte $CD   ; 
- D 0 - - - 0x038E72 0E:8E62: 8F        .byte $8F   ; 
- D 0 - - - 0x038E73 0E:8E63: DB        .byte $DB   ; 
- D 0 - - - 0x038E74 0E:8E64: 8F        .byte $8F   ; 
- D 0 - - - 0x038E75 0E:8E65: 07        .byte $07   ; 
- D 0 - - - 0x038E76 0E:8E66: 8F        .byte $8F   ; 
- - - - - - 0x038E77 0E:8E67: 07        .byte $07   ; 
- - - - - - 0x038E78 0E:8E68: 8F        .byte $8F   ; 
- D 0 - - - 0x038E79 0E:8E69: E9        .byte $E9   ; 
- D 0 - - - 0x038E7A 0E:8E6A: 8F        .byte $8F   ; 
- D 0 - - - 0x038E7B 0E:8E6B: F7        .byte $F7   ; 
- D 0 - - - 0x038E7C 0E:8E6C: 8F        .byte $8F   ; 
- D 0 - - - 0x038E7D 0E:8E6D: 05        .byte $05   ; 
- D 0 - - - 0x038E7E 0E:8E6E: 90        .byte $90   ; 
- D 0 - - - 0x038E7F 0E:8E6F: 13        .byte $13   ; 
- D 0 - - - 0x038E80 0E:8E70: 90        .byte $90   ; 
- D 0 - - - 0x038E81 0E:8E71: 21        .byte $21   ; 
- D 0 - - - 0x038E82 0E:8E72: 90        .byte $90   ; 
- D 0 - - - 0x038E83 0E:8E73: 2F        .byte $2F   ; 
- D 0 - - - 0x038E84 0E:8E74: 90        .byte $90   ; 
- D 0 - - - 0x038E85 0E:8E75: 3D        .byte $3D   ; 
- D 0 - - - 0x038E86 0E:8E76: 90        .byte $90   ; 
- D 0 - - - 0x038E87 0E:8E77: 4B        .byte $4B   ; <K>
- D 0 - - - 0x038E88 0E:8E78: 90        .byte $90   ; 
- D 0 - - - 0x038E89 0E:8E79: 59        .byte $59   ; <Y>
- D 0 - - - 0x038E8A 0E:8E7A: 90        .byte $90   ; 
- D 0 - - - 0x038E8B 0E:8E7B: 67        .byte $67   ; <g>
- D 0 - - - 0x038E8C 0E:8E7C: 90        .byte $90   ; 
- D 0 - - - 0x038E8D 0E:8E7D: 75        .byte $75   ; <u>
- D 0 - - - 0x038E8E 0E:8E7E: 90        .byte $90   ; 
- D 0 - - - 0x038E8F 0E:8E7F: 83        .byte $83   ; 
- D 0 - - - 0x038E90 0E:8E80: 90        .byte $90   ; 
- D 0 - - - 0x038E91 0E:8E81: 07        .byte $07   ; 
- D 0 - - - 0x038E92 0E:8E82: 8F        .byte $8F   ; 
- D 0 - - - 0x038E93 0E:8E83: 91        .byte $91   ; 
- D 0 - - - 0x038E94 0E:8E84: 90        .byte $90   ; 
- D 0 - - - 0x038E95 0E:8E85: 9F        .byte $9F   ; 
- D 0 - - - 0x038E96 0E:8E86: 90        .byte $90   ; 
- D 0 - - - 0x038E97 0E:8E87: AD        .byte $AD   ; 
- D 0 - - - 0x038E98 0E:8E88: 90        .byte $90   ; 
- D 0 - - - 0x038E99 0E:8E89: 07        .byte $07   ; 
- D 0 - - - 0x038E9A 0E:8E8A: 8F        .byte $8F   ; 
- D 0 - - - 0x038E9B 0E:8E8B: BB        .byte $BB   ; 
- D 0 - - - 0x038E9C 0E:8E8C: 90        .byte $90   ; 
- - - - - - 0x038E9D 0E:8E8D: 07        .byte $07   ; 
- - - - - - 0x038E9E 0E:8E8E: 8F        .byte $8F   ; 
- D 0 - - - 0x038E9F 0E:8E8F: C9        .byte $C9   ; 
- D 0 - - - 0x038EA0 0E:8E90: 90        .byte $90   ; 
- D 0 - - - 0x038EA1 0E:8E91: D7        .byte $D7   ; 
- D 0 - - - 0x038EA2 0E:8E92: 90        .byte $90   ; 
- D 0 - - - 0x038EA3 0E:8E93: 07        .byte $07   ; 
- D 0 - - - 0x038EA4 0E:8E94: 8F        .byte $8F   ; 
- D 0 - - - 0x038EA5 0E:8E95: E5        .byte $E5   ; 
- D 0 - - - 0x038EA6 0E:8E96: 90        .byte $90   ; 
- D 0 - - - 0x038EA7 0E:8E97: F3        .byte $F3   ; 
- D 0 - - - 0x038EA8 0E:8E98: 90        .byte $90   ; 
- D 0 - - - 0x038EA9 0E:8E99: 01        .byte $01   ; 
- D 0 - - - 0x038EAA 0E:8E9A: 91        .byte $91   ; 
- D 0 - - - 0x038EAB 0E:8E9B: 07        .byte $07   ; 
- D 0 - - - 0x038EAC 0E:8E9C: 8F        .byte $8F   ; 
- D 0 - - - 0x038EAD 0E:8E9D: 0F        .byte $0F   ; 
- D 0 - - - 0x038EAE 0E:8E9E: 91        .byte $91   ; 
- D 0 - - - 0x038EAF 0E:8E9F: 1D        .byte $1D   ; 
- D 0 - - - 0x038EB0 0E:8EA0: 91        .byte $91   ; 
- D 0 - - - 0x038EB1 0E:8EA1: 2B        .byte $2B   ; 
- D 0 - - - 0x038EB2 0E:8EA2: 91        .byte $91   ; 
- D 0 - - - 0x038EB3 0E:8EA3: 39        .byte $39   ; <9>
- D 0 - - - 0x038EB4 0E:8EA4: 91        .byte $91   ; 
- D 0 - - - 0x038EB5 0E:8EA5: 47        .byte $47   ; <G>
- D 0 - - - 0x038EB6 0E:8EA6: 91        .byte $91   ; 
- D 0 - - - 0x038EB7 0E:8EA7: 55        .byte $55   ; <U>
- D 0 - - - 0x038EB8 0E:8EA8: 91        .byte $91   ; 
- D 0 - - - 0x038EB9 0E:8EA9: 63        .byte $63   ; <c>
- D 0 - - - 0x038EBA 0E:8EAA: 91        .byte $91   ; 
- D 0 - - - 0x038EBB 0E:8EAB: 71        .byte $71   ; <q>
- D 0 - - - 0x038EBC 0E:8EAC: 91        .byte $91   ; 
- D 0 - - - 0x038EBD 0E:8EAD: 7F        .byte $7F   ; 
- D 0 - - - 0x038EBE 0E:8EAE: 91        .byte $91   ; 
- D 0 - - - 0x038EBF 0E:8EAF: 8D        .byte $8D   ; 
- D 0 - - - 0x038EC0 0E:8EB0: 91        .byte $91   ; 
- D 0 - - - 0x038EC1 0E:8EB1: 9B        .byte $9B   ; 
- D 0 - - - 0x038EC2 0E:8EB2: 91        .byte $91   ; 
- - - - - - 0x038EC3 0E:8EB3: 07        .byte $07   ; 
- - - - - - 0x038EC4 0E:8EB4: 8F        .byte $8F   ; 
- D 0 - - - 0x038EC5 0E:8EB5: A9        .byte $A9   ; 
- D 0 - - - 0x038EC6 0E:8EB6: 91        .byte $91   ; 
- D 0 - - - 0x038EC7 0E:8EB7: B7        .byte $B7   ; 
- D 0 - - - 0x038EC8 0E:8EB8: 91        .byte $91   ; 
- D 0 - - - 0x038EC9 0E:8EB9: C5        .byte $C5   ; 
- D 0 - - - 0x038ECA 0E:8EBA: 91        .byte $91   ; 
- D 0 - - - 0x038ECB 0E:8EBB: D3        .byte $D3   ; 
- D 0 - - - 0x038ECC 0E:8EBC: 91        .byte $91   ; 
- D 0 - - - 0x038ECD 0E:8EBD: 07        .byte $07   ; 
- D 0 - - - 0x038ECE 0E:8EBE: 8F        .byte $8F   ; 
- D 0 - - - 0x038ECF 0E:8EBF: E1        .byte $E1   ; 
- D 0 - - - 0x038ED0 0E:8EC0: 91        .byte $91   ; 
- D 0 - - - 0x038ED1 0E:8EC1: 07        .byte $07   ; 
- D 0 - - - 0x038ED2 0E:8EC2: 8F        .byte $8F   ; 
- D 0 - - - 0x038ED3 0E:8EC3: 07        .byte $07   ; 
- D 0 - - - 0x038ED4 0E:8EC4: 8F        .byte $8F   ; 
- D 0 - - - 0x038ED5 0E:8EC5: 07        .byte $07   ; 
- D 0 - - - 0x038ED6 0E:8EC6: 8F        .byte $8F   ; 
- D 0 - - - 0x038ED7 0E:8EC7: FD        .byte $FD   ; 
- D 0 - - - 0x038ED8 0E:8EC8: 91        .byte $91   ; 
- D 0 - - - 0x038ED9 0E:8EC9: 0B        .byte $0B   ; 
- D 0 - - - 0x038EDA 0E:8ECA: 92        .byte $92   ; 
- D 0 - - - 0x038EDB 0E:8ECB: 19        .byte $19   ; 
- D 0 - - - 0x038EDC 0E:8ECC: 92        .byte $92   ; 
- D 0 - - - 0x038EDD 0E:8ECD: 07        .byte $07   ; 
- D 0 - - - 0x038EDE 0E:8ECE: 8F        .byte $8F   ; 
- D 0 - - - 0x038EDF 0E:8ECF: 27        .byte $27   ; 
- D 0 - - - 0x038EE0 0E:8ED0: 92        .byte $92   ; 
- - - - - - 0x038EE1 0E:8ED1: 07        .byte $07   ; 
- - - - - - 0x038EE2 0E:8ED2: 8F        .byte $8F   ; 
- D 0 - - - 0x038EE3 0E:8ED3: 35        .byte $35   ; <5>
- D 0 - - - 0x038EE4 0E:8ED4: 92        .byte $92   ; 
- D 0 - - - 0x038EE5 0E:8ED5: 43        .byte $43   ; <C>
- D 0 - - - 0x038EE6 0E:8ED6: 92        .byte $92   ; 
- D 0 - - - 0x038EE7 0E:8ED7: 51        .byte $51   ; <Q>
- D 0 - - - 0x038EE8 0E:8ED8: 92        .byte $92   ; 
- D 0 - - - 0x038EE9 0E:8ED9: 5F        .byte $5F   ; 
- D 0 - - - 0x038EEA 0E:8EDA: 92        .byte $92   ; 
- D 0 - - - 0x038EEB 0E:8EDB: 6D        .byte $6D   ; <m>
- D 0 - - - 0x038EEC 0E:8EDC: 92        .byte $92   ; 
- D 0 - - - 0x038EED 0E:8EDD: 07        .byte $07   ; 
- D 0 - - - 0x038EEE 0E:8EDE: 8F        .byte $8F   ; 
- D 0 - - - 0x038EEF 0E:8EDF: 7B        .byte $7B   ; 
- D 0 - - - 0x038EF0 0E:8EE0: 92        .byte $92   ; 
- D 0 - - - 0x038EF1 0E:8EE1: 89        .byte $89   ; 
- D 0 - - - 0x038EF2 0E:8EE2: 92        .byte $92   ; 
- D 0 - - - 0x038EF3 0E:8EE3: 07        .byte $07   ; 
- D 0 - - - 0x038EF4 0E:8EE4: 8F        .byte $8F   ; 
- D 0 - - - 0x038EF5 0E:8EE5: 97        .byte $97   ; 
- D 0 - - - 0x038EF6 0E:8EE6: 92        .byte $92   ; 
- D 0 - - - 0x038EF7 0E:8EE7: A5        .byte $A5   ; 
- D 0 - - - 0x038EF8 0E:8EE8: 92        .byte $92   ; 
- D 0 - - - 0x038EF9 0E:8EE9: 07        .byte $07   ; 
- D 0 - - - 0x038EFA 0E:8EEA: 8F        .byte $8F   ; 
- D 0 - - - 0x038EFB 0E:8EEB: B3        .byte $B3   ; 
- D 0 - - - 0x038EFC 0E:8EEC: 92        .byte $92   ; 
- - - - - - 0x038EFD 0E:8EED: 07        .byte $07   ; 
- - - - - - 0x038EFE 0E:8EEE: 8F        .byte $8F   ; 
- D 0 - - - 0x038EFF 0E:8EEF: C1        .byte $C1   ; 
- D 0 - - - 0x038F00 0E:8EF0: 92        .byte $92   ; 
- D 0 - - - 0x038F01 0E:8EF1: CF        .byte $CF   ; 
- D 0 - - - 0x038F02 0E:8EF2: 92        .byte $92   ; 
- D 0 - - - 0x038F03 0E:8EF3: DD        .byte $DD   ; 
- D 0 - - - 0x038F04 0E:8EF4: 92        .byte $92   ; 
- D 0 - - - 0x038F05 0E:8EF5: EB        .byte $EB   ; 
- D 0 - - - 0x038F06 0E:8EF6: 92        .byte $92   ; 
- D 0 - - - 0x038F07 0E:8EF7: F9        .byte $F9   ; 
- D 0 - - - 0x038F08 0E:8EF8: 92        .byte $92   ; 
- D 0 - - - 0x038F09 0E:8EF9: 07        .byte $07   ; 
- D 0 - - - 0x038F0A 0E:8EFA: 93        .byte $93   ; 
- D 0 - - - 0x038F0B 0E:8EFB: 07        .byte $07   ; 
- D 0 - - - 0x038F0C 0E:8EFC: 8F        .byte $8F   ; 
- D 0 - - - 0x038F0D 0E:8EFD: 07        .byte $07   ; 
- D 0 - - - 0x038F0E 0E:8EFE: 8F        .byte $8F   ; 
- D 0 - - - 0x038F0F 0E:8EFF: 15        .byte $15   ; 
- D 0 - - - 0x038F10 0E:8F00: 93        .byte $93   ; 
- D 0 - - - 0x038F11 0E:8F01: 23        .byte $23   ; 
- D 0 - - - 0x038F12 0E:8F02: 93        .byte $93   ; 
- D 0 - - - 0x038F13 0E:8F03: 31        .byte $31   ; <1>
- D 0 - - - 0x038F14 0E:8F04: 93        .byte $93   ; 
- D 0 - - - 0x038F15 0E:8F05: 3F        .byte $3F   ; 
- D 0 - - - 0x038F16 0E:8F06: 93        .byte $93   ; 
- D 0 - I - 0x038F17 0E:8F07: 00        .byte $00   ; 
- D 0 - I - 0x038F18 0E:8F08: 00        .byte $00   ; 
- D 0 - I - 0x038F19 0E:8F09: 00        .byte $00   ; 
- D 0 - I - 0x038F1A 0E:8F0A: 00        .byte $00   ; 
- D 0 - I - 0x038F1B 0E:8F0B: 00        .byte $00   ; 
- D 0 - I - 0x038F1C 0E:8F0C: 00        .byte $00   ; 
- D 0 - I - 0x038F1D 0E:8F0D: 00        .byte $00   ; 
- D 0 - I - 0x038F1E 0E:8F0E: 00        .byte $00   ; 
- D 0 - I - 0x038F1F 0E:8F0F: 00        .byte $00   ; 
- D 0 - I - 0x038F20 0E:8F10: 00        .byte $00   ; 
- D 0 - I - 0x038F21 0E:8F11: 00        .byte $00   ; 
- D 0 - I - 0x038F22 0E:8F12: 00        .byte $00   ; 
- D 0 - I - 0x038F23 0E:8F13: 00        .byte $00   ; 
- D 0 - I - 0x038F24 0E:8F14: 00        .byte $00   ; 
- - - - - - 0x038F25 0E:8F15: 00        .byte $00   ; 
- - - - - - 0x038F26 0E:8F16: 00        .byte $00   ; 
- D 0 - I - 0x038F27 0E:8F17: 4D        .byte $4D   ; <M>
- D 0 - I - 0x038F28 0E:8F18: 93        .byte $93   ; 
- D 0 - I - 0x038F29 0E:8F19: 0A        .byte $0A   ; 
- D 0 - I - 0x038F2A 0E:8F1A: 94        .byte $94   ; 
- D 0 - I - 0x038F2B 0E:8F1B: 10        .byte $10   ; 
- D 0 - I - 0x038F2C 0E:8F1C: 94        .byte $94   ; 
- D 0 - I - 0x038F2D 0E:8F1D: 25        .byte $25   ; 
- D 0 - I - 0x038F2E 0E:8F1E: 94        .byte $94   ; 
- D 0 - I - 0x038F2F 0E:8F1F: 00        .byte $00   ; 
- D 0 - I - 0x038F30 0E:8F20: 00        .byte $00   ; 
- D 0 - I - 0x038F31 0E:8F21: 00        .byte $00   ; 
- D 0 - I - 0x038F32 0E:8F22: 00        .byte $00   ; 
- D 0 - I - 0x038F33 0E:8F23: 00        .byte $00   ; 
- D 0 - I - 0x038F34 0E:8F24: 00        .byte $00   ; 
- D 0 - I - 0x038F35 0E:8F25: 58        .byte $58   ; <X>
- D 0 - I - 0x038F36 0E:8F26: 93        .byte $93   ; 
- D 0 - I - 0x038F37 0E:8F27: 00        .byte $00   ; 
- D 0 - I - 0x038F38 0E:8F28: 00        .byte $00   ; 
- D 0 - I - 0x038F39 0E:8F29: 00        .byte $00   ; 
- D 0 - I - 0x038F3A 0E:8F2A: 00        .byte $00   ; 
- D 0 - I - 0x038F3B 0E:8F2B: 27        .byte $27   ; 
- D 0 - I - 0x038F3C 0E:8F2C: 94        .byte $94   ; 
- D 0 - I - 0x038F3D 0E:8F2D: 00        .byte $00   ; 
- D 0 - I - 0x038F3E 0E:8F2E: 00        .byte $00   ; 
- D 0 - I - 0x038F3F 0E:8F2F: 00        .byte $00   ; 
- D 0 - I - 0x038F40 0E:8F30: 00        .byte $00   ; 
- D 0 - I - 0x038F41 0E:8F31: 00        .byte $00   ; 
- D 0 - I - 0x038F42 0E:8F32: 00        .byte $00   ; 
- D 0 - I - 0x038F43 0E:8F33: 00        .byte $00   ; 
- D 0 - I - 0x038F44 0E:8F34: 00        .byte $00   ; 
- D 0 - I - 0x038F45 0E:8F35: 00        .byte $00   ; 
- D 0 - I - 0x038F46 0E:8F36: 00        .byte $00   ; 
- D 0 - I - 0x038F47 0E:8F37: 00        .byte $00   ; 
- D 0 - I - 0x038F48 0E:8F38: 00        .byte $00   ; 
- D 0 - I - 0x038F49 0E:8F39: 00        .byte $00   ; 
- D 0 - I - 0x038F4A 0E:8F3A: 00        .byte $00   ; 
- D 0 - I - 0x038F4B 0E:8F3B: 36        .byte $36   ; <6>
- D 0 - I - 0x038F4C 0E:8F3C: 94        .byte $94   ; 
- D 0 - I - 0x038F4D 0E:8F3D: 00        .byte $00   ; 
- D 0 - I - 0x038F4E 0E:8F3E: 00        .byte $00   ; 
- D 0 - I - 0x038F4F 0E:8F3F: 00        .byte $00   ; 
- D 0 - I - 0x038F50 0E:8F40: 00        .byte $00   ; 
- D 0 - I - 0x038F51 0E:8F41: 5D        .byte $5D   ; 
- D 0 - I - 0x038F52 0E:8F42: 93        .byte $93   ; 
- D 0 - I - 0x038F53 0E:8F43: 00        .byte $00   ; 
- D 0 - I - 0x038F54 0E:8F44: 00        .byte $00   ; 
- D 0 - I - 0x038F55 0E:8F45: 00        .byte $00   ; 
- D 0 - I - 0x038F56 0E:8F46: 00        .byte $00   ; 
- D 0 - I - 0x038F57 0E:8F47: 00        .byte $00   ; 
- D 0 - I - 0x038F58 0E:8F48: 00        .byte $00   ; 
- D 0 - I - 0x038F59 0E:8F49: 00        .byte $00   ; 
- D 0 - I - 0x038F5A 0E:8F4A: 00        .byte $00   ; 
- D 0 - I - 0x038F5B 0E:8F4B: 00        .byte $00   ; 
- D 0 - I - 0x038F5C 0E:8F4C: 00        .byte $00   ; 
- D 0 - I - 0x038F5D 0E:8F4D: 00        .byte $00   ; 
- D 0 - I - 0x038F5E 0E:8F4E: 00        .byte $00   ; 
- D 0 - I - 0x038F5F 0E:8F4F: 60        .byte $60   ; 
- D 0 - I - 0x038F60 0E:8F50: 93        .byte $93   ; 
- D 0 - I - 0x038F61 0E:8F51: 00        .byte $00   ; 
- D 0 - I - 0x038F62 0E:8F52: 00        .byte $00   ; 
- D 0 - I - 0x038F63 0E:8F53: 00        .byte $00   ; 
- D 0 - I - 0x038F64 0E:8F54: 00        .byte $00   ; 
- D 0 - I - 0x038F65 0E:8F55: 29        .byte $29   ; 
- D 0 - I - 0x038F66 0E:8F56: 94        .byte $94   ; 
- D 0 - I - 0x038F67 0E:8F57: 37        .byte $37   ; <7>
- D 0 - I - 0x038F68 0E:8F58: 94        .byte $94   ; 
- D 0 - I - 0x038F69 0E:8F59: 46        .byte $46   ; <F>
- D 0 - I - 0x038F6A 0E:8F5A: 94        .byte $94   ; 
- D 0 - I - 0x038F6B 0E:8F5B: 5A        .byte $5A   ; <Z>
- D 0 - I - 0x038F6C 0E:8F5C: 94        .byte $94   ; 
- D 0 - I - 0x038F6D 0E:8F5D: 69        .byte $69   ; <i>
- D 0 - I - 0x038F6E 0E:8F5E: 93        .byte $93   ; 
- D 0 - I - 0x038F6F 0E:8F5F: 00        .byte $00   ; 
- D 0 - I - 0x038F70 0E:8F60: 00        .byte $00   ; 
- D 0 - I - 0x038F71 0E:8F61: 00        .byte $00   ; 
- D 0 - I - 0x038F72 0E:8F62: 00        .byte $00   ; 
- D 0 - I - 0x038F73 0E:8F63: 2B        .byte $2B   ; 
- D 0 - I - 0x038F74 0E:8F64: 94        .byte $94   ; 
- D 0 - I - 0x038F75 0E:8F65: 39        .byte $39   ; <9>
- D 0 - I - 0x038F76 0E:8F66: 94        .byte $94   ; 
- D 0 - I - 0x038F77 0E:8F67: 48        .byte $48   ; <H>
- D 0 - I - 0x038F78 0E:8F68: 94        .byte $94   ; 
- D 0 - I - 0x038F79 0E:8F69: 5C        .byte $5C   ; 
- D 0 - I - 0x038F7A 0E:8F6A: 94        .byte $94   ; 
- D 0 - I - 0x038F7B 0E:8F6B: 72        .byte $72   ; <r>
- D 0 - I - 0x038F7C 0E:8F6C: 93        .byte $93   ; 
- D 0 - I - 0x038F7D 0E:8F6D: 00        .byte $00   ; 
- D 0 - I - 0x038F7E 0E:8F6E: 00        .byte $00   ; 
- D 0 - I - 0x038F7F 0E:8F6F: 00        .byte $00   ; 
- D 0 - I - 0x038F80 0E:8F70: 00        .byte $00   ; 
- D 0 - I - 0x038F81 0E:8F71: 00        .byte $00   ; 
- D 0 - I - 0x038F82 0E:8F72: 00        .byte $00   ; 
- D 0 - I - 0x038F83 0E:8F73: 00        .byte $00   ; 
- D 0 - I - 0x038F84 0E:8F74: 00        .byte $00   ; 
- D 0 - I - 0x038F85 0E:8F75: 00        .byte $00   ; 
- D 0 - I - 0x038F86 0E:8F76: 00        .byte $00   ; 
- D 0 - I - 0x038F87 0E:8F77: 00        .byte $00   ; 
- D 0 - I - 0x038F88 0E:8F78: 00        .byte $00   ; 
- D 0 - I - 0x038F89 0E:8F79: 74        .byte $74   ; <t>
- D 0 - I - 0x038F8A 0E:8F7A: 93        .byte $93   ; 
- D 0 - I - 0x038F8B 0E:8F7B: 00        .byte $00   ; 
- D 0 - I - 0x038F8C 0E:8F7C: 00        .byte $00   ; 
- D 0 - I - 0x038F8D 0E:8F7D: 11        .byte $11   ; 
- D 0 - I - 0x038F8E 0E:8F7E: 94        .byte $94   ; 
- D 0 - I - 0x038F8F 0E:8F7F: 2D        .byte $2D   ; 
- D 0 - I - 0x038F90 0E:8F80: 94        .byte $94   ; 
- D 0 - I - 0x038F91 0E:8F81: 00        .byte $00   ; 
- D 0 - I - 0x038F92 0E:8F82: 00        .byte $00   ; 
- D 0 - I - 0x038F93 0E:8F83: 4A        .byte $4A   ; <J>
- D 0 - I - 0x038F94 0E:8F84: 94        .byte $94   ; 
- D 0 - I - 0x038F95 0E:8F85: 00        .byte $00   ; 
- D 0 - I - 0x038F96 0E:8F86: 00        .byte $00   ; 
- D 0 - I - 0x038F97 0E:8F87: 78        .byte $78   ; <x>
- D 0 - I - 0x038F98 0E:8F88: 93        .byte $93   ; 
- D 0 - I - 0x038F99 0E:8F89: 0B        .byte $0B   ; 
- D 0 - I - 0x038F9A 0E:8F8A: 94        .byte $94   ; 
- D 0 - I - 0x038F9B 0E:8F8B: 00        .byte $00   ; 
- D 0 - I - 0x038F9C 0E:8F8C: 00        .byte $00   ; 
- D 0 - I - 0x038F9D 0E:8F8D: 00        .byte $00   ; 
- D 0 - I - 0x038F9E 0E:8F8E: 00        .byte $00   ; 
- - - - - - 0x038F9F 0E:8F8F: 00        .byte $00   ; 
- - - - - - 0x038FA0 0E:8F90: 00        .byte $00   ; 
- D 0 - I - 0x038FA1 0E:8F91: 4B        .byte $4B   ; <K>
- D 0 - I - 0x038FA2 0E:8F92: 94        .byte $94   ; 
- D 0 - I - 0x038FA3 0E:8F93: 00        .byte $00   ; 
- D 0 - I - 0x038FA4 0E:8F94: 00        .byte $00   ; 
- D 0 - I - 0x038FA5 0E:8F95: 7A        .byte $7A   ; <z>
- D 0 - I - 0x038FA6 0E:8F96: 93        .byte $93   ; 
- D 0 - I - 0x038FA7 0E:8F97: 00        .byte $00   ; 
- D 0 - I - 0x038FA8 0E:8F98: 00        .byte $00   ; 
- D 0 - I - 0x038FA9 0E:8F99: 12        .byte $12   ; 
- D 0 - I - 0x038FAA 0E:8F9A: 94        .byte $94   ; 
- D 0 - I - 0x038FAB 0E:8F9B: 00        .byte $00   ; 
- D 0 - I - 0x038FAC 0E:8F9C: 00        .byte $00   ; 
- D 0 - I - 0x038FAD 0E:8F9D: 3B        .byte $3B   ; 
- D 0 - I - 0x038FAE 0E:8F9E: 94        .byte $94   ; 
- D 0 - I - 0x038FAF 0E:8F9F: 4C        .byte $4C   ; <L>
- D 0 - I - 0x038FB0 0E:8FA0: 94        .byte $94   ; 
- D 0 - I - 0x038FB1 0E:8FA1: 00        .byte $00   ; 
- D 0 - I - 0x038FB2 0E:8FA2: 00        .byte $00   ; 
- D 0 - I - 0x038FB3 0E:8FA3: 7D        .byte $7D   ; 
- D 0 - I - 0x038FB4 0E:8FA4: 93        .byte $93   ; 
- D 0 - I - 0x038FB5 0E:8FA5: 00        .byte $00   ; 
- D 0 - I - 0x038FB6 0E:8FA6: 00        .byte $00   ; 
- D 0 - I - 0x038FB7 0E:8FA7: 00        .byte $00   ; 
- D 0 - I - 0x038FB8 0E:8FA8: 00        .byte $00   ; 
- D 0 - I - 0x038FB9 0E:8FA9: 00        .byte $00   ; 
- D 0 - I - 0x038FBA 0E:8FAA: 00        .byte $00   ; 
- D 0 - I - 0x038FBB 0E:8FAB: 00        .byte $00   ; 
- D 0 - I - 0x038FBC 0E:8FAC: 00        .byte $00   ; 
- D 0 - I - 0x038FBD 0E:8FAD: 00        .byte $00   ; 
- D 0 - I - 0x038FBE 0E:8FAE: 00        .byte $00   ; 
- D 0 - I - 0x038FBF 0E:8FAF: 00        .byte $00   ; 
- D 0 - I - 0x038FC0 0E:8FB0: 00        .byte $00   ; 
- D 0 - I - 0x038FC1 0E:8FB1: 00        .byte $00   ; 
- D 0 - I - 0x038FC2 0E:8FB2: 00        .byte $00   ; 
- D 0 - I - 0x038FC3 0E:8FB3: 00        .byte $00   ; 
- D 0 - I - 0x038FC4 0E:8FB4: 00        .byte $00   ; 
- D 0 - I - 0x038FC5 0E:8FB5: 00        .byte $00   ; 
- D 0 - I - 0x038FC6 0E:8FB6: 00        .byte $00   ; 
- D 0 - I - 0x038FC7 0E:8FB7: 2F        .byte $2F   ; 
- D 0 - I - 0x038FC8 0E:8FB8: 94        .byte $94   ; 
- D 0 - I - 0x038FC9 0E:8FB9: 00        .byte $00   ; 
- D 0 - I - 0x038FCA 0E:8FBA: 00        .byte $00   ; 
- D 0 - I - 0x038FCB 0E:8FBB: 00        .byte $00   ; 
- D 0 - I - 0x038FCC 0E:8FBC: 00        .byte $00   ; 
- D 0 - I - 0x038FCD 0E:8FBD: 00        .byte $00   ; 
- D 0 - I - 0x038FCE 0E:8FBE: 00        .byte $00   ; 
- D 0 - I - 0x038FCF 0E:8FBF: 80        .byte $80   ; 
- D 0 - I - 0x038FD0 0E:8FC0: 93        .byte $93   ; 
- D 0 - I - 0x038FD1 0E:8FC1: 00        .byte $00   ; 
- D 0 - I - 0x038FD2 0E:8FC2: 00        .byte $00   ; 
- D 0 - I - 0x038FD3 0E:8FC3: 00        .byte $00   ; 
- D 0 - I - 0x038FD4 0E:8FC4: 00        .byte $00   ; 
- D 0 - I - 0x038FD5 0E:8FC5: 00        .byte $00   ; 
- D 0 - I - 0x038FD6 0E:8FC6: 00        .byte $00   ; 
- D 0 - I - 0x038FD7 0E:8FC7: 00        .byte $00   ; 
- D 0 - I - 0x038FD8 0E:8FC8: 00        .byte $00   ; 
- D 0 - I - 0x038FD9 0E:8FC9: 00        .byte $00   ; 
- D 0 - I - 0x038FDA 0E:8FCA: 00        .byte $00   ; 
- D 0 - I - 0x038FDB 0E:8FCB: 00        .byte $00   ; 
- D 0 - I - 0x038FDC 0E:8FCC: 00        .byte $00   ; 
- D 0 - I - 0x038FDD 0E:8FCD: 82        .byte $82   ; 
- D 0 - I - 0x038FDE 0E:8FCE: 93        .byte $93   ; 
- D 0 - I - 0x038FDF 0E:8FCF: 00        .byte $00   ; 
- D 0 - I - 0x038FE0 0E:8FD0: 00        .byte $00   ; 
- D 0 - I - 0x038FE1 0E:8FD1: 00        .byte $00   ; 
- D 0 - I - 0x038FE2 0E:8FD2: 00        .byte $00   ; 
- D 0 - I - 0x038FE3 0E:8FD3: 00        .byte $00   ; 
- D 0 - I - 0x038FE4 0E:8FD4: 00        .byte $00   ; 
- - - - - - 0x038FE5 0E:8FD5: 00        .byte $00   ; 
- - - - - - 0x038FE6 0E:8FD6: 00        .byte $00   ; 
- D 0 - I - 0x038FE7 0E:8FD7: 00        .byte $00   ; 
- D 0 - I - 0x038FE8 0E:8FD8: 00        .byte $00   ; 
- D 0 - I - 0x038FE9 0E:8FD9: 00        .byte $00   ; 
- D 0 - I - 0x038FEA 0E:8FDA: 00        .byte $00   ; 
- D 0 - I - 0x038FEB 0E:8FDB: 84        .byte $84   ; 
- D 0 - I - 0x038FEC 0E:8FDC: 93        .byte $93   ; 
- D 0 - I - 0x038FED 0E:8FDD: 00        .byte $00   ; 
- D 0 - I - 0x038FEE 0E:8FDE: 00        .byte $00   ; 
- D 0 - I - 0x038FEF 0E:8FDF: 00        .byte $00   ; 
- D 0 - I - 0x038FF0 0E:8FE0: 00        .byte $00   ; 
- D 0 - I - 0x038FF1 0E:8FE1: 00        .byte $00   ; 
- D 0 - I - 0x038FF2 0E:8FE2: 00        .byte $00   ; 
- - - - - - 0x038FF3 0E:8FE3: 00        .byte $00   ; 
- - - - - - 0x038FF4 0E:8FE4: 00        .byte $00   ; 
- D 0 - I - 0x038FF5 0E:8FE5: 00        .byte $00   ; 
- D 0 - I - 0x038FF6 0E:8FE6: 00        .byte $00   ; 
- D 0 - I - 0x038FF7 0E:8FE7: 00        .byte $00   ; 
- D 0 - I - 0x038FF8 0E:8FE8: 00        .byte $00   ; 
- D 0 - I - 0x038FF9 0E:8FE9: 86        .byte $86   ; 
- D 0 - I - 0x038FFA 0E:8FEA: 93        .byte $93   ; 
- D 0 - I - 0x038FFB 0E:8FEB: 00        .byte $00   ; 
- D 0 - I - 0x038FFC 0E:8FEC: 00        .byte $00   ; 
- D 0 - I - 0x038FFD 0E:8FED: 00        .byte $00   ; 
- D 0 - I - 0x038FFE 0E:8FEE: 00        .byte $00   ; 
- D 0 - I - 0x038FFF 0E:8FEF: 00        .byte $00   ; 
- D 0 - I - 0x039000 0E:8FF0: 00        .byte $00   ; 
- - - - - - 0x039001 0E:8FF1: 00        .byte $00   ; 
- - - - - - 0x039002 0E:8FF2: 00        .byte $00   ; 
- D 0 - I - 0x039003 0E:8FF3: 00        .byte $00   ; 
- D 0 - I - 0x039004 0E:8FF4: 00        .byte $00   ; 
- D 0 - I - 0x039005 0E:8FF5: 00        .byte $00   ; 
- D 0 - I - 0x039006 0E:8FF6: 00        .byte $00   ; 
- D 0 - I - 0x039007 0E:8FF7: 88        .byte $88   ; 
- D 0 - I - 0x039008 0E:8FF8: 93        .byte $93   ; 
- D 0 - I - 0x039009 0E:8FF9: 00        .byte $00   ; 
- D 0 - I - 0x03900A 0E:8FFA: 00        .byte $00   ; 
- D 0 - I - 0x03900B 0E:8FFB: 13        .byte $13   ; 
- D 0 - I - 0x03900C 0E:8FFC: 94        .byte $94   ; 
- D 0 - I - 0x03900D 0E:8FFD: 00        .byte $00   ; 
- D 0 - I - 0x03900E 0E:8FFE: 00        .byte $00   ; 
- - - - - - 0x03900F 0E:8FFF: 00        .byte $00   ; 
- - - - - - 0x039010 0E:9000: 00        .byte $00   ; 
- D 0 - I - 0x039011 0E:9001: 00        .byte $00   ; 
- D 0 - I - 0x039012 0E:9002: 00        .byte $00   ; 
- D 0 - I - 0x039013 0E:9003: 00        .byte $00   ; 
- D 0 - I - 0x039014 0E:9004: 00        .byte $00   ; 
- D 0 - I - 0x039015 0E:9005: 8A        .byte $8A   ; 
- D 0 - I - 0x039016 0E:9006: 93        .byte $93   ; 
- D 0 - I - 0x039017 0E:9007: 00        .byte $00   ; 
- D 0 - I - 0x039018 0E:9008: 00        .byte $00   ; 
- D 0 - I - 0x039019 0E:9009: 14        .byte $14   ; 
- D 0 - I - 0x03901A 0E:900A: 94        .byte $94   ; 
- - - - - - 0x03901B 0E:900B: 00        .byte $00   ; 
- - - - - - 0x03901C 0E:900C: 00        .byte $00   ; 
- - - - - - 0x03901D 0E:900D: 00        .byte $00   ; 
- - - - - - 0x03901E 0E:900E: 00        .byte $00   ; 
- D 0 - I - 0x03901F 0E:900F: 00        .byte $00   ; 
- D 0 - I - 0x039020 0E:9010: 00        .byte $00   ; 
- D 0 - I - 0x039021 0E:9011: 00        .byte $00   ; 
- D 0 - I - 0x039022 0E:9012: 00        .byte $00   ; 
- D 0 - I - 0x039023 0E:9013: 8C        .byte $8C   ; 
- D 0 - I - 0x039024 0E:9014: 93        .byte $93   ; 
- D 0 - I - 0x039025 0E:9015: 00        .byte $00   ; 
- D 0 - I - 0x039026 0E:9016: 00        .byte $00   ; 
- D 0 - I - 0x039027 0E:9017: 00        .byte $00   ; 
- D 0 - I - 0x039028 0E:9018: 00        .byte $00   ; 
- D 0 - I - 0x039029 0E:9019: 00        .byte $00   ; 
- D 0 - I - 0x03902A 0E:901A: 00        .byte $00   ; 
- D 0 - I - 0x03902B 0E:901B: 3C        .byte $3C   ; 
- D 0 - I - 0x03902C 0E:901C: 94        .byte $94   ; 
- D 0 - I - 0x03902D 0E:901D: 4D        .byte $4D   ; <M>
- D 0 - I - 0x03902E 0E:901E: 94        .byte $94   ; 
- D 0 - I - 0x03902F 0E:901F: 00        .byte $00   ; 
- D 0 - I - 0x039030 0E:9020: 00        .byte $00   ; 
- D 0 - I - 0x039031 0E:9021: 8E        .byte $8E   ; 
- D 0 - I - 0x039032 0E:9022: 93        .byte $93   ; 
- D 0 - I - 0x039033 0E:9023: 00        .byte $00   ; 
- D 0 - I - 0x039034 0E:9024: 00        .byte $00   ; 
- D 0 - I - 0x039035 0E:9025: 15        .byte $15   ; 
- D 0 - I - 0x039036 0E:9026: 94        .byte $94   ; 
- - - - - - 0x039037 0E:9027: 00        .byte $00   ; 
- - - - - - 0x039038 0E:9028: 00        .byte $00   ; 
- - - - - - 0x039039 0E:9029: 00        .byte $00   ; 
- - - - - - 0x03903A 0E:902A: 00        .byte $00   ; 
- D 0 - I - 0x03903B 0E:902B: 00        .byte $00   ; 
- D 0 - I - 0x03903C 0E:902C: 00        .byte $00   ; 
- D 0 - I - 0x03903D 0E:902D: 00        .byte $00   ; 
- D 0 - I - 0x03903E 0E:902E: 00        .byte $00   ; 
- D 0 - I - 0x03903F 0E:902F: 91        .byte $91   ; 
- D 0 - I - 0x039040 0E:9030: 93        .byte $93   ; 
- D 0 - I - 0x039041 0E:9031: 00        .byte $00   ; 
- D 0 - I - 0x039042 0E:9032: 00        .byte $00   ; 
- D 0 - I - 0x039043 0E:9033: 00        .byte $00   ; 
- D 0 - I - 0x039044 0E:9034: 00        .byte $00   ; 
- D 0 - I - 0x039045 0E:9035: 00        .byte $00   ; 
- D 0 - I - 0x039046 0E:9036: 00        .byte $00   ; 
- D 0 - I - 0x039047 0E:9037: 00        .byte $00   ; 
- D 0 - I - 0x039048 0E:9038: 00        .byte $00   ; 
- D 0 - I - 0x039049 0E:9039: 00        .byte $00   ; 
- D 0 - I - 0x03904A 0E:903A: 00        .byte $00   ; 
- D 0 - I - 0x03904B 0E:903B: 00        .byte $00   ; 
- D 0 - I - 0x03904C 0E:903C: 00        .byte $00   ; 
- D 0 - I - 0x03904D 0E:903D: 93        .byte $93   ; 
- D 0 - I - 0x03904E 0E:903E: 93        .byte $93   ; 
- D 0 - I - 0x03904F 0E:903F: 00        .byte $00   ; 
- D 0 - I - 0x039050 0E:9040: 00        .byte $00   ; 
- D 0 - I - 0x039051 0E:9041: 00        .byte $00   ; 
- D 0 - I - 0x039052 0E:9042: 00        .byte $00   ; 
- D 0 - I - 0x039053 0E:9043: 00        .byte $00   ; 
- D 0 - I - 0x039054 0E:9044: 00        .byte $00   ; 
- - - - - - 0x039055 0E:9045: 00        .byte $00   ; 
- - - - - - 0x039056 0E:9046: 00        .byte $00   ; 
- D 0 - I - 0x039057 0E:9047: 00        .byte $00   ; 
- D 0 - I - 0x039058 0E:9048: 00        .byte $00   ; 
- D 0 - I - 0x039059 0E:9049: 00        .byte $00   ; 
- D 0 - I - 0x03905A 0E:904A: 00        .byte $00   ; 
- D 0 - I - 0x03905B 0E:904B: 95        .byte $95   ; 
- D 0 - I - 0x03905C 0E:904C: 93        .byte $93   ; 
- D 0 - I - 0x03905D 0E:904D: 00        .byte $00   ; 
- D 0 - I - 0x03905E 0E:904E: 00        .byte $00   ; 
- D 0 - I - 0x03905F 0E:904F: 16        .byte $16   ; 
- D 0 - I - 0x039060 0E:9050: 94        .byte $94   ; 
- D 0 - I - 0x039061 0E:9051: 00        .byte $00   ; 
- D 0 - I - 0x039062 0E:9052: 00        .byte $00   ; 
- D 0 - I - 0x039063 0E:9053: 3D        .byte $3D   ; 
- D 0 - I - 0x039064 0E:9054: 94        .byte $94   ; 
- D 0 - I - 0x039065 0E:9055: 4E        .byte $4E   ; <N>
- D 0 - I - 0x039066 0E:9056: 94        .byte $94   ; 
- D 0 - I - 0x039067 0E:9057: 00        .byte $00   ; 
- D 0 - I - 0x039068 0E:9058: 00        .byte $00   ; 
- D 0 - I - 0x039069 0E:9059: 98        .byte $98   ; 
- D 0 - I - 0x03906A 0E:905A: 93        .byte $93   ; 
- D 0 - I - 0x03906B 0E:905B: 00        .byte $00   ; 
- D 0 - I - 0x03906C 0E:905C: 00        .byte $00   ; 
- D 0 - I - 0x03906D 0E:905D: 00        .byte $00   ; 
- D 0 - I - 0x03906E 0E:905E: 00        .byte $00   ; 
- D 0 - I - 0x03906F 0E:905F: 00        .byte $00   ; 
- D 0 - I - 0x039070 0E:9060: 00        .byte $00   ; 
- D 0 - I - 0x039071 0E:9061: 00        .byte $00   ; 
- D 0 - I - 0x039072 0E:9062: 00        .byte $00   ; 
- D 0 - I - 0x039073 0E:9063: 00        .byte $00   ; 
- D 0 - I - 0x039074 0E:9064: 00        .byte $00   ; 
- D 0 - I - 0x039075 0E:9065: 00        .byte $00   ; 
- D 0 - I - 0x039076 0E:9066: 00        .byte $00   ; 
- D 0 - I - 0x039077 0E:9067: 9A        .byte $9A   ; 
- D 0 - I - 0x039078 0E:9068: 93        .byte $93   ; 
- D 0 - I - 0x039079 0E:9069: 00        .byte $00   ; 
- D 0 - I - 0x03907A 0E:906A: 00        .byte $00   ; 
- D 0 - I - 0x03907B 0E:906B: 00        .byte $00   ; 
- D 0 - I - 0x03907C 0E:906C: 00        .byte $00   ; 
- D 0 - I - 0x03907D 0E:906D: 31        .byte $31   ; <1>
- D 0 - I - 0x03907E 0E:906E: 94        .byte $94   ; 
- D 0 - I - 0x03907F 0E:906F: 3E        .byte $3E   ; 
- D 0 - I - 0x039080 0E:9070: 94        .byte $94   ; 
- D 0 - I - 0x039081 0E:9071: 4F        .byte $4F   ; <O>
- D 0 - I - 0x039082 0E:9072: 94        .byte $94   ; 
- D 0 - I - 0x039083 0E:9073: 5E        .byte $5E   ; 
- D 0 - I - 0x039084 0E:9074: 94        .byte $94   ; 
- D 0 - I - 0x039085 0E:9075: 9F        .byte $9F   ; 
- D 0 - I - 0x039086 0E:9076: 93        .byte $93   ; 
- D 0 - I - 0x039087 0E:9077: 00        .byte $00   ; 
- D 0 - I - 0x039088 0E:9078: 00        .byte $00   ; 
- D 0 - I - 0x039089 0E:9079: 00        .byte $00   ; 
- D 0 - I - 0x03908A 0E:907A: 00        .byte $00   ; 
- D 0 - I - 0x03908B 0E:907B: 31        .byte $31   ; <1>
- D 0 - I - 0x03908C 0E:907C: 94        .byte $94   ; 
- D 0 - I - 0x03908D 0E:907D: 00        .byte $00   ; 
- D 0 - I - 0x03908E 0E:907E: 00        .byte $00   ; 
- D 0 - I - 0x03908F 0E:907F: 00        .byte $00   ; 
- D 0 - I - 0x039090 0E:9080: 00        .byte $00   ; 
- D 0 - I - 0x039091 0E:9081: 00        .byte $00   ; 
- D 0 - I - 0x039092 0E:9082: 00        .byte $00   ; 
- D 0 - I - 0x039093 0E:9083: A4        .byte $A4   ; 
- D 0 - I - 0x039094 0E:9084: 93        .byte $93   ; 
- D 0 - I - 0x039095 0E:9085: 0C        .byte $0C   ; 
- D 0 - I - 0x039096 0E:9086: 94        .byte $94   ; 
- D 0 - I - 0x039097 0E:9087: 00        .byte $00   ; 
- D 0 - I - 0x039098 0E:9088: 00        .byte $00   ; 
- D 0 - I - 0x039099 0E:9089: 00        .byte $00   ; 
- D 0 - I - 0x03909A 0E:908A: 00        .byte $00   ; 
- - - - - - 0x03909B 0E:908B: 00        .byte $00   ; 
- - - - - - 0x03909C 0E:908C: 00        .byte $00   ; 
- D 0 - I - 0x03909D 0E:908D: 50        .byte $50   ; <P>
- D 0 - I - 0x03909E 0E:908E: 94        .byte $94   ; 
- - - - - - 0x03909F 0E:908F: 00        .byte $00   ; 
- - - - - - 0x0390A0 0E:9090: 00        .byte $00   ; 
- D 0 - I - 0x0390A1 0E:9091: A6        .byte $A6   ; 
- D 0 - I - 0x0390A2 0E:9092: 93        .byte $93   ; 
- D 0 - I - 0x0390A3 0E:9093: 00        .byte $00   ; 
- D 0 - I - 0x0390A4 0E:9094: 00        .byte $00   ; 
- D 0 - I - 0x0390A5 0E:9095: 00        .byte $00   ; 
- D 0 - I - 0x0390A6 0E:9096: 00        .byte $00   ; 
- D 0 - I - 0x0390A7 0E:9097: 00        .byte $00   ; 
- D 0 - I - 0x0390A8 0E:9098: 00        .byte $00   ; 
- D 0 - I - 0x0390A9 0E:9099: 00        .byte $00   ; 
- D 0 - I - 0x0390AA 0E:909A: 00        .byte $00   ; 
- D 0 - I - 0x0390AB 0E:909B: 00        .byte $00   ; 
- D 0 - I - 0x0390AC 0E:909C: 00        .byte $00   ; 
- D 0 - I - 0x0390AD 0E:909D: 00        .byte $00   ; 
- D 0 - I - 0x0390AE 0E:909E: 00        .byte $00   ; 
- D 0 - I - 0x0390AF 0E:909F: A8        .byte $A8   ; 
- D 0 - I - 0x0390B0 0E:90A0: 93        .byte $93   ; 
- D 0 - I - 0x0390B1 0E:90A1: 00        .byte $00   ; 
- D 0 - I - 0x0390B2 0E:90A2: 00        .byte $00   ; 
- D 0 - I - 0x0390B3 0E:90A3: 00        .byte $00   ; 
- D 0 - I - 0x0390B4 0E:90A4: 00        .byte $00   ; 
- D 0 - I - 0x0390B5 0E:90A5: 00        .byte $00   ; 
- D 0 - I - 0x0390B6 0E:90A6: 00        .byte $00   ; 
- D 0 - I - 0x0390B7 0E:90A7: 00        .byte $00   ; 
- D 0 - I - 0x0390B8 0E:90A8: 00        .byte $00   ; 
- D 0 - I - 0x0390B9 0E:90A9: 00        .byte $00   ; 
- D 0 - I - 0x0390BA 0E:90AA: 00        .byte $00   ; 
- D 0 - I - 0x0390BB 0E:90AB: 00        .byte $00   ; 
- D 0 - I - 0x0390BC 0E:90AC: 00        .byte $00   ; 
- D 0 - I - 0x0390BD 0E:90AD: AB        .byte $AB   ; 
- D 0 - I - 0x0390BE 0E:90AE: 93        .byte $93   ; 
- D 0 - I - 0x0390BF 0E:90AF: 00        .byte $00   ; 
- D 0 - I - 0x0390C0 0E:90B0: 00        .byte $00   ; 
- D 0 - I - 0x0390C1 0E:90B1: 17        .byte $17   ; 
- D 0 - I - 0x0390C2 0E:90B2: 94        .byte $94   ; 
- D 0 - I - 0x0390C3 0E:90B3: 32        .byte $32   ; <2>
- D 0 - I - 0x0390C4 0E:90B4: 94        .byte $94   ; 
- - - - - - 0x0390C5 0E:90B5: 00        .byte $00   ; 
- - - - - - 0x0390C6 0E:90B6: 00        .byte $00   ; 
- D 0 - I - 0x0390C7 0E:90B7: 51        .byte $51   ; <Q>
- D 0 - I - 0x0390C8 0E:90B8: 94        .byte $94   ; 
- D 0 - I - 0x0390C9 0E:90B9: 00        .byte $00   ; 
- D 0 - I - 0x0390CA 0E:90BA: 00        .byte $00   ; 
- D 0 - I - 0x0390CB 0E:90BB: 00        .byte $00   ; 
- D 0 - I - 0x0390CC 0E:90BC: 00        .byte $00   ; 
- D 0 - I - 0x0390CD 0E:90BD: 00        .byte $00   ; 
- D 0 - I - 0x0390CE 0E:90BE: 00        .byte $00   ; 
- D 0 - I - 0x0390CF 0E:90BF: 00        .byte $00   ; 
- D 0 - I - 0x0390D0 0E:90C0: 00        .byte $00   ; 
- D 0 - I - 0x0390D1 0E:90C1: 32        .byte $32   ; <2>
- D 0 - I - 0x0390D2 0E:90C2: 94        .byte $94   ; 
- D 0 - I - 0x0390D3 0E:90C3: 00        .byte $00   ; 
- D 0 - I - 0x0390D4 0E:90C4: 00        .byte $00   ; 
- D 0 - I - 0x0390D5 0E:90C5: 00        .byte $00   ; 
- D 0 - I - 0x0390D6 0E:90C6: 00        .byte $00   ; 
- D 0 - I - 0x0390D7 0E:90C7: 00        .byte $00   ; 
- D 0 - I - 0x0390D8 0E:90C8: 00        .byte $00   ; 
- D 0 - I - 0x0390D9 0E:90C9: AF        .byte $AF   ; 
- D 0 - I - 0x0390DA 0E:90CA: 93        .byte $93   ; 
- D 0 - I - 0x0390DB 0E:90CB: 00        .byte $00   ; 
- D 0 - I - 0x0390DC 0E:90CC: 00        .byte $00   ; 
- D 0 - I - 0x0390DD 0E:90CD: 00        .byte $00   ; 
- D 0 - I - 0x0390DE 0E:90CE: 00        .byte $00   ; 
- D 0 - I - 0x0390DF 0E:90CF: 00        .byte $00   ; 
- D 0 - I - 0x0390E0 0E:90D0: 00        .byte $00   ; 
- D 0 - I - 0x0390E1 0E:90D1: 00        .byte $00   ; 
- D 0 - I - 0x0390E2 0E:90D2: 00        .byte $00   ; 
- D 0 - I - 0x0390E3 0E:90D3: 00        .byte $00   ; 
- D 0 - I - 0x0390E4 0E:90D4: 00        .byte $00   ; 
- D 0 - I - 0x0390E5 0E:90D5: 00        .byte $00   ; 
- D 0 - I - 0x0390E6 0E:90D6: 00        .byte $00   ; 
- D 0 - I - 0x0390E7 0E:90D7: B1        .byte $B1   ; 
- D 0 - I - 0x0390E8 0E:90D8: 93        .byte $93   ; 
- D 0 - I - 0x0390E9 0E:90D9: 00        .byte $00   ; 
- D 0 - I - 0x0390EA 0E:90DA: 00        .byte $00   ; 
- D 0 - I - 0x0390EB 0E:90DB: 00        .byte $00   ; 
- D 0 - I - 0x0390EC 0E:90DC: 00        .byte $00   ; 
- D 0 - I - 0x0390ED 0E:90DD: 00        .byte $00   ; 
- D 0 - I - 0x0390EE 0E:90DE: 00        .byte $00   ; 
- D 0 - I - 0x0390EF 0E:90DF: 00        .byte $00   ; 
- D 0 - I - 0x0390F0 0E:90E0: 00        .byte $00   ; 
- D 0 - I - 0x0390F1 0E:90E1: 00        .byte $00   ; 
- D 0 - I - 0x0390F2 0E:90E2: 00        .byte $00   ; 
- D 0 - I - 0x0390F3 0E:90E3: 00        .byte $00   ; 
- D 0 - I - 0x0390F4 0E:90E4: 00        .byte $00   ; 
- D 0 - I - 0x0390F5 0E:90E5: B3        .byte $B3   ; 
- D 0 - I - 0x0390F6 0E:90E6: 93        .byte $93   ; 
- D 0 - I - 0x0390F7 0E:90E7: 00        .byte $00   ; 
- D 0 - I - 0x0390F8 0E:90E8: 00        .byte $00   ; 
- D 0 - I - 0x0390F9 0E:90E9: 00        .byte $00   ; 
- D 0 - I - 0x0390FA 0E:90EA: 00        .byte $00   ; 
- D 0 - I - 0x0390FB 0E:90EB: 00        .byte $00   ; 
- D 0 - I - 0x0390FC 0E:90EC: 00        .byte $00   ; 
- D 0 - I - 0x0390FD 0E:90ED: 00        .byte $00   ; 
- D 0 - I - 0x0390FE 0E:90EE: 00        .byte $00   ; 
- D 0 - I - 0x0390FF 0E:90EF: 00        .byte $00   ; 
- D 0 - I - 0x039100 0E:90F0: 00        .byte $00   ; 
- D 0 - I - 0x039101 0E:90F1: 00        .byte $00   ; 
- D 0 - I - 0x039102 0E:90F2: 00        .byte $00   ; 
- D 0 - I - 0x039103 0E:90F3: 00        .byte $00   ; 
- D 0 - I - 0x039104 0E:90F4: 00        .byte $00   ; 
- D 0 - I - 0x039105 0E:90F5: 00        .byte $00   ; 
- D 0 - I - 0x039106 0E:90F6: 00        .byte $00   ; 
- D 0 - I - 0x039107 0E:90F7: 18        .byte $18   ; 
- D 0 - I - 0x039108 0E:90F8: 94        .byte $94   ; 
- D 0 - I - 0x039109 0E:90F9: 00        .byte $00   ; 
- D 0 - I - 0x03910A 0E:90FA: 00        .byte $00   ; 
- D 0 - I - 0x03910B 0E:90FB: 00        .byte $00   ; 
- D 0 - I - 0x03910C 0E:90FC: 00        .byte $00   ; 
- D 0 - I - 0x03910D 0E:90FD: 00        .byte $00   ; 
- D 0 - I - 0x03910E 0E:90FE: 00        .byte $00   ; 
- D 0 - I - 0x03910F 0E:90FF: 00        .byte $00   ; 
- D 0 - I - 0x039110 0E:9100: 00        .byte $00   ; 
- D 0 - I - 0x039111 0E:9101: 00        .byte $00   ; 
- D 0 - I - 0x039112 0E:9102: 00        .byte $00   ; 
- D 0 - I - 0x039113 0E:9103: 0D        .byte $0D   ; 
- D 0 - I - 0x039114 0E:9104: 94        .byte $94   ; 
- D 0 - I - 0x039115 0E:9105: 00        .byte $00   ; 
- D 0 - I - 0x039116 0E:9106: 00        .byte $00   ; 
- D 0 - I - 0x039117 0E:9107: 00        .byte $00   ; 
- D 0 - I - 0x039118 0E:9108: 00        .byte $00   ; 
- D 0 - I - 0x039119 0E:9109: 00        .byte $00   ; 
- D 0 - I - 0x03911A 0E:910A: 00        .byte $00   ; 
- D 0 - I - 0x03911B 0E:910B: 00        .byte $00   ; 
- D 0 - I - 0x03911C 0E:910C: 00        .byte $00   ; 
- D 0 - I - 0x03911D 0E:910D: 00        .byte $00   ; 
- D 0 - I - 0x03911E 0E:910E: 00        .byte $00   ; 
- D 0 - I - 0x03911F 0E:910F: B5        .byte $B5   ; 
- D 0 - I - 0x039120 0E:9110: 93        .byte $93   ; 
- D 0 - I - 0x039121 0E:9111: 00        .byte $00   ; 
- D 0 - I - 0x039122 0E:9112: 00        .byte $00   ; 
- D 0 - I - 0x039123 0E:9113: 19        .byte $19   ; 
- D 0 - I - 0x039124 0E:9114: 94        .byte $94   ; 
- D 0 - I - 0x039125 0E:9115: 00        .byte $00   ; 
- D 0 - I - 0x039126 0E:9116: 00        .byte $00   ; 
- - - - - - 0x039127 0E:9117: 00        .byte $00   ; 
- - - - - - 0x039128 0E:9118: 00        .byte $00   ; 
- D 0 - I - 0x039129 0E:9119: 52        .byte $52   ; <R>
- D 0 - I - 0x03912A 0E:911A: 94        .byte $94   ; 
- D 0 - I - 0x03912B 0E:911B: 00        .byte $00   ; 
- D 0 - I - 0x03912C 0E:911C: 00        .byte $00   ; 
- D 0 - I - 0x03912D 0E:911D: B9        .byte $B9   ; 
- D 0 - I - 0x03912E 0E:911E: 93        .byte $93   ; 
- D 0 - I - 0x03912F 0E:911F: 00        .byte $00   ; 
- D 0 - I - 0x039130 0E:9120: 00        .byte $00   ; 
- D 0 - I - 0x039131 0E:9121: 00        .byte $00   ; 
- D 0 - I - 0x039132 0E:9122: 00        .byte $00   ; 
- D 0 - I - 0x039133 0E:9123: 00        .byte $00   ; 
- D 0 - I - 0x039134 0E:9124: 00        .byte $00   ; 
- D 0 - I - 0x039135 0E:9125: 00        .byte $00   ; 
- D 0 - I - 0x039136 0E:9126: 00        .byte $00   ; 
- D 0 - I - 0x039137 0E:9127: 00        .byte $00   ; 
- D 0 - I - 0x039138 0E:9128: 00        .byte $00   ; 
- D 0 - I - 0x039139 0E:9129: 00        .byte $00   ; 
- D 0 - I - 0x03913A 0E:912A: 00        .byte $00   ; 
- D 0 - I - 0x03913B 0E:912B: BC        .byte $BC   ; 
- D 0 - I - 0x03913C 0E:912C: 93        .byte $93   ; 
- D 0 - I - 0x03913D 0E:912D: 00        .byte $00   ; 
- D 0 - I - 0x03913E 0E:912E: 00        .byte $00   ; 
- D 0 - I - 0x03913F 0E:912F: 00        .byte $00   ; 
- D 0 - I - 0x039140 0E:9130: 00        .byte $00   ; 
- D 0 - I - 0x039141 0E:9131: 00        .byte $00   ; 
- D 0 - I - 0x039142 0E:9132: 00        .byte $00   ; 
- D 0 - I - 0x039143 0E:9133: 00        .byte $00   ; 
- D 0 - I - 0x039144 0E:9134: 00        .byte $00   ; 
- D 0 - I - 0x039145 0E:9135: 00        .byte $00   ; 
- D 0 - I - 0x039146 0E:9136: 00        .byte $00   ; 
- D 0 - I - 0x039147 0E:9137: 00        .byte $00   ; 
- D 0 - I - 0x039148 0E:9138: 00        .byte $00   ; 
- D 0 - I - 0x039149 0E:9139: BE        .byte $BE   ; 
- D 0 - I - 0x03914A 0E:913A: 93        .byte $93   ; 
- D 0 - I - 0x03914B 0E:913B: 00        .byte $00   ; 
- D 0 - I - 0x03914C 0E:913C: 00        .byte $00   ; 
- D 0 - I - 0x03914D 0E:913D: 00        .byte $00   ; 
- D 0 - I - 0x03914E 0E:913E: 00        .byte $00   ; 
- D 0 - I - 0x03914F 0E:913F: 00        .byte $00   ; 
- D 0 - I - 0x039150 0E:9140: 00        .byte $00   ; 
- D 0 - I - 0x039151 0E:9141: 00        .byte $00   ; 
- D 0 - I - 0x039152 0E:9142: 00        .byte $00   ; 
- D 0 - I - 0x039153 0E:9143: 00        .byte $00   ; 
- D 0 - I - 0x039154 0E:9144: 00        .byte $00   ; 
- D 0 - I - 0x039155 0E:9145: 00        .byte $00   ; 
- D 0 - I - 0x039156 0E:9146: 00        .byte $00   ; 
- D 0 - I - 0x039157 0E:9147: C1        .byte $C1   ; 
- D 0 - I - 0x039158 0E:9148: 93        .byte $93   ; 
- D 0 - I - 0x039159 0E:9149: 00        .byte $00   ; 
- D 0 - I - 0x03915A 0E:914A: 00        .byte $00   ; 
- D 0 - I - 0x03915B 0E:914B: 00        .byte $00   ; 
- D 0 - I - 0x03915C 0E:914C: 00        .byte $00   ; 
- D 0 - I - 0x03915D 0E:914D: 00        .byte $00   ; 
- D 0 - I - 0x03915E 0E:914E: 00        .byte $00   ; 
- D 0 - I - 0x03915F 0E:914F: 00        .byte $00   ; 
- D 0 - I - 0x039160 0E:9150: 00        .byte $00   ; 
- D 0 - I - 0x039161 0E:9151: 00        .byte $00   ; 
- D 0 - I - 0x039162 0E:9152: 00        .byte $00   ; 
- D 0 - I - 0x039163 0E:9153: 00        .byte $00   ; 
- D 0 - I - 0x039164 0E:9154: 00        .byte $00   ; 
- D 0 - I - 0x039165 0E:9155: C3        .byte $C3   ; 
- D 0 - I - 0x039166 0E:9156: 93        .byte $93   ; 
- D 0 - I - 0x039167 0E:9157: 00        .byte $00   ; 
- D 0 - I - 0x039168 0E:9158: 00        .byte $00   ; 
- D 0 - I - 0x039169 0E:9159: 00        .byte $00   ; 