; bank_00.asm 分片 5/5 (原文件行 4001-4621, 共 4621 行)

C - - - - - 0x001BF5 00:9BE5: 84 E6     STY ram_00E6
C - - - - - 0x001BF7 00:9BE7: A8        TAY
C - - - - - 0x001BF8 00:9BE8: A9 01     LDA #$01
C - - - - - 0x001BFA 00:9BEA: 20 A8 9F  JSR $9FA8
C - - - - - 0x001BFD 00:9BED: A5 1E     LDA ram_001E
C - - - - - 0x001BFF 00:9BEF: 20 E7 9C  JSR $9CE7
C - - - - - 0x001C02 00:9BF2: A5 1E     LDA ram_001E
C - - - - - 0x001C04 00:9BF4: 29 90     AND #$90
C - - - - - 0x001C06 00:9BF6: 10 F0     BPL $9BE8
C - - - - - 0x001C08 00:9BF8: B9 68 04  LDA ram_0468,Y
C - - - - - 0x001C0B 00:9BFB: AA        TAX
C - - - - - 0x001C0C 00:9BFC: 38        SEC
C - - - - - 0x001C0D 00:9BFD: E5 E7     SBC ram_00E7
C - - - - - 0x001C0F 00:9BFF: 4A        LSR
C - - - - - 0x001C10 00:9C00: 4A        LSR
C - - - - - 0x001C11 00:9C01: 4A        LSR
C - - - - - 0x001C12 00:9C02: 85 E7     STA ram_00E7
C - - - - - 0x001C14 00:9C04: A9 F8     LDA #$F8
C - - - - - 0x001C16 00:9C06: 99 68 04  STA ram_0468,Y
C - - - - - 0x001C19 00:9C09: A5 E7     LDA ram_00E7
C - - - - - 0x001C1B 00:9C0B: 18        CLC
C - - - - - 0x001C1C 00:9C0C: 60        RTS
C - - - - - 0x001C1D 00:9C0D: A9 01     LDA #$01
C - - - - - 0x001C1F 00:9C0F: 20 A8 9F  JSR $9FA8
C - - - - - 0x001C22 00:9C12: A5 1E     LDA ram_001E
C - - - - - 0x001C24 00:9C14: 20 E7 9C  JSR $9CE7
C - - - - - 0x001C27 00:9C17: A5 1E     LDA ram_001E
C - - - - - 0x001C29 00:9C19: 29 90     AND #$90
C - - - - - 0x001C2B 00:9C1B: D0 DB     BNE $9BF8
C - - - - - 0x001C2D 00:9C1D: 24 1E     BIT ram_001E
C - - - - - 0x001C2F 00:9C1F: 50 EC     BVC $9C0D
C - - - - - 0x001C31 00:9C21: A9 F8     LDA #$F8
C - - - - - 0x001C33 00:9C23: 99 68 04  STA ram_0468,Y
C - - - - - 0x001C36 00:9C26: 38        SEC
C - - - - - 0x001C37 00:9C27: 60        RTS
C D 0 - - - 0x001C38 00:9C28: 84 E6     STY ram_00E6
C - - - - - 0x001C3A 00:9C2A: 86 E7     STX ram_00E7
C - - - - - 0x001C3C 00:9C2C: A8        TAY
C - - - - - 0x001C3D 00:9C2D: B1 E6     LDA (ram_00E6),Y
C - - - - - 0x001C3F 00:9C2F: AA        TAX
C - - - - - 0x001C40 00:9C30: C8        INY
C - - - - - 0x001C41 00:9C31: B1 E6     LDA (ram_00E6),Y
C - - - - - 0x001C43 00:9C33: 85 E7     STA ram_00E7
C - - - - - 0x001C45 00:9C35: 86 E6     STX ram_00E6
C - - - - - 0x001C47 00:9C37: 6C E6 00  JMP (ram_00E6)
C - - - - - 0x001C4A 00:9C3A: A9 00     LDA #$00
C - - - - - 0x001C4C 00:9C3C: 85 E9     STA ram_00E9
C - - - - - 0x001C4E 00:9C3E: 84 E6     STY ram_00E6
C - - - - - 0x001C50 00:9C40: 86 E7     STX ram_00E7
C - - - - - 0x001C52 00:9C42: A0 00     LDY #$00
C - - - - - 0x001C54 00:9C44: B1 E6     LDA (ram_00E6),Y
C - - - - - 0x001C56 00:9C46: AA        TAX
C - - - - - 0x001C57 00:9C47: C8        INY
C - - - - - 0x001C58 00:9C48: B1 E6     LDA (ram_00E6),Y
C - - - - - 0x001C5A 00:9C4A: 85 E8     STA ram_00E8
C - - - - - 0x001C5C 00:9C4C: C5 E9     CMP ram_00E9
C - - - - - 0x001C5E 00:9C4E: D0 03     BNE $9C53
C - - - - - 0x001C60 00:9C50: 18        CLC
C - - - - - 0x001C61 00:9C51: 69 10     ADC #$10
C - - - - - 0x001C63 00:9C53: 9D 68 04  STA ram_0468,X
C - - - - - 0x001C66 00:9C56: E8        INX
C - - - - - 0x001C67 00:9C57: C8        INY
C - - - - - 0x001C68 00:9C58: B1 E6     LDA (ram_00E6),Y
C - - - - - 0x001C6A 00:9C5A: 9D 68 04  STA ram_0468,X
C - - - - - 0x001C6D 00:9C5D: E8        INX
C - - - - - 0x001C6E 00:9C5E: C8        INY
C - - - - - 0x001C6F 00:9C5F: C0 05     CPY #$05
C - - - - - 0x001C71 00:9C61: D0 F5     BNE $9C58
C - - - - - 0x001C73 00:9C63: B1 E6     LDA (ram_00E6),Y
C - - - - - 0x001C75 00:9C65: 85 E6     STA ram_00E6
C - - - - - 0x001C77 00:9C67: 8A        TXA
C - - - - - 0x001C78 00:9C68: 38        SEC
C - - - - - 0x001C79 00:9C69: E9 04     SBC #$04
C - - - - - 0x001C7B 00:9C6B: A8        TAY
C - - - - - 0x001C7C 00:9C6C: A5 E8     LDA ram_00E8
C - - - - - 0x001C7E 00:9C6E: 85 E7     STA ram_00E7
C - - - - - 0x001C80 00:9C70: 60        RTS
C - - - - - 0x001C81 00:9C71: A9 10     LDA #$10
C D 0 - - - 0x001C83 00:9C73: 85 E8     STA ram_00E8
C - - - - - 0x001C85 00:9C75: A5 1C     LDA ram_001C
C - - - - - 0x001C87 00:9C77: 20 E7 9C  JSR $9CE7
C - - - - - 0x001C8A 00:9C7A: 90 4C     BCC $9CC8
C - - - - - 0x001C8C 00:9C7C: A6 E9     LDX ram_00E9
C - - - - - 0x001C8E 00:9C7E: E0 FF     CPX #$FF
C - - - - - 0x001C90 00:9C80: F0 07     BEQ $9C89
C - - - - - 0x001C92 00:9C82: C5 E9     CMP ram_00E9
C - - - - - 0x001C94 00:9C84: F0 EF     BEQ $9C75
C - - - - - 0x001C96 00:9C86: 4C B3 9C  JMP $9CB3
C - - - - - 0x001C99 00:9C89: C5 EB     CMP ram_00EB
C - - - - - 0x001C9B 00:9C8B: F0 E8     BEQ $9C75
C - - - - - 0x001C9D 00:9C8D: AD 5C 05  LDA ram_055C
C - - - - - 0x001CA0 00:9C90: C9 B8     CMP #$B8
C - - - - - 0x001CA2 00:9C92: 90 03     BCC $9C97
C - - - - - 0x001CA4 00:9C94: 38        SEC
C - - - - - 0x001CA5 00:9C95: E9 10     SBC #$10
C - - - - - 0x001CA7 00:9C97: A8        TAY
C - - - - - 0x001CA8 00:9C98: AE 5F 05  LDX ram_055F
C - - - - - 0x001CAB 00:9C9B: 20 08 9D  JSR $9D08
C - - - - - 0x001CAE 00:9C9E: A0 00     LDY #$00
C - - - - - 0x001CB0 00:9CA0: B1 34     LDA (ram_0034),Y
C - - - - - 0x001CB2 00:9CA2: A0 F4     LDY #$F4
C - - - - - 0x001CB4 00:9CA4: CD 51 04  CMP ram_0451
C - - - - - 0x001CB7 00:9CA7: F0 CC     BEQ $9C75
C - - - - - 0x001CB9 00:9CA9: CD 52 04  CMP ram_0452
C - - - - - 0x001CBC 00:9CAC: F0 C7     BEQ $9C75
C - - - - - 0x001CBE 00:9CAE: CD 53 04  CMP ram_0453
C - - - - - 0x001CC1 00:9CB1: F0 C2     BEQ $9C75
C D 0 - - - 0x001CC3 00:9CB3: A9 01     LDA #$01
C - - - - - 0x001CC5 00:9CB5: 20 A8 9F  JSR $9FA8
C - - - - - 0x001CC8 00:9CB8: A6 1C     LDX ram_001C
C - - - - - 0x001CCA 00:9CBA: BD E2 9E  LDA $9EE2,X
C - - - - - 0x001CCD 00:9CBD: F0 09     BEQ $9CC8
C - - - - - 0x001CCF 00:9CBF: C6 E8     DEC ram_00E8
C - - - - - 0x001CD1 00:9CC1: D0 F0     BNE $9CB3
C - - - - - 0x001CD3 00:9CC3: A9 08     LDA #$08
C - - - - - 0x001CD5 00:9CC5: 4C 73 9C  JMP $9C73
C - - - - - 0x001CD8 00:9CC8: 60        RTS
C - - - - - 0x001CD9 00:9CC9: A9 00     LDA #$00
C - - - - - 0x001CDB 00:9CCB: 20 D3 9C  JSR $9CD3
C - - - - - 0x001CDE 00:9CCE: 20 71 9C  JSR $9C71
C - - - - - 0x001CE1 00:9CD1: A9 02     LDA #$02
C - - - - - 0x001CE3 00:9CD3: BE 6B 04  LDX ram_046B,Y
C - - - - - 0x001CE6 00:9CD6: 30 0E     BMI $9CE6
C - - - - - 0x001CE8 00:9CD8: 48        PHA
C - - - - - 0x001CE9 00:9CD9: B9 68 04  LDA ram_0468,Y
C - - - - - 0x001CEC 00:9CDC: 38        SEC
C - - - - - 0x001CED 00:9CDD: E5 E7     SBC ram_00E7
C - - - - - 0x001CEF 00:9CDF: 4A        LSR
C - - - - - 0x001CF0 00:9CE0: 4A        LSR
C - - - - - 0x001CF1 00:9CE1: AA        TAX
C - - - - - 0x001CF2 00:9CE2: 68        PLA
C - - - - - 0x001CF3 00:9CE3: 9D 6A 04  STA ram_046A,X
C - - - - - 0x001CF6 00:9CE6: 60        RTS
C - - - - - 0x001CF7 00:9CE7: 29 0F     AND #$0F
C - - - - - 0x001CF9 00:9CE9: AA        TAX
C - - - - - 0x001CFA 00:9CEA: BD E2 9E  LDA $9EE2,X
C - - - - - 0x001CFD 00:9CED: F0 17     BEQ $9D06
C - - - - - 0x001CFF 00:9CEF: 18        CLC
C - - - - - 0x001D00 00:9CF0: 79 68 04  ADC ram_0468,Y
C - - - - - 0x001D03 00:9CF3: C5 E7     CMP ram_00E7
C - - - - - 0x001D05 00:9CF5: B0 02     BCS $9CF9
C - - - - - 0x001D07 00:9CF7: A5 E6     LDA ram_00E6
C - - - - - 0x001D09 00:9CF9: C5 E6     CMP ram_00E6
C - - - - - 0x001D0B 00:9CFB: F0 04     BEQ $9D01
C - - - - - 0x001D0D 00:9CFD: 90 02     BCC $9D01
C - - - - - 0x001D0F 00:9CFF: A5 E7     LDA ram_00E7
C - - - - - 0x001D11 00:9D01: 99 68 04  STA ram_0468,Y
C - - - - - 0x001D14 00:9D04: 38        SEC
C - - - - - 0x001D15 00:9D05: 60        RTS
C - - - - - 0x001D16 00:9D06: 18        CLC
C - - - - - 0x001D17 00:9D07: 60        RTS
C - - - - - 0x001D18 00:9D08: 8A        TXA
C - - - - - 0x001D19 00:9D09: 30 0F     BMI $9D1A
C - - - - - 0x001D1B 00:9D0B: 98        TYA
C - - - - - 0x001D1C 00:9D0C: 49 FF     EOR #$FF
C - - - - - 0x001D1E 00:9D0E: 38        SEC
C - - - - - 0x001D1F 00:9D0F: E9 28     SBC #$28
C - - - - - 0x001D21 00:9D11: 4A        LSR
C - - - - - 0x001D22 00:9D12: 4A        LSR
C - - - - - 0x001D23 00:9D13: 4A        LSR
C - - - - - 0x001D24 00:9D14: 4A        LSR
C - - - - - 0x001D25 00:9D15: 85 ED     STA ram_00ED
C - - - - - 0x001D27 00:9D17: 4C 0C C5  JMP $C50C
C - - - - - 0x001D2A 00:9D1A: 98        TYA
C - - - - - 0x001D2B 00:9D1B: 4A        LSR
C - - - - - 0x001D2C 00:9D1C: 4A        LSR
C - - - - - 0x001D2D 00:9D1D: 4A        LSR
C - - - - - 0x001D2E 00:9D1E: 4A        LSR
C - - - - - 0x001D2F 00:9D1F: 18        CLC
C - - - - - 0x001D30 00:9D20: 69 14     ADC #$14
C - - - - - 0x001D32 00:9D22: 85 ED     STA ram_00ED
C - - - - - 0x001D34 00:9D24: 4C 0C C5  JMP $C50C
C - - - - - 0x001D37 00:9D27: 84 E6     STY ram_00E6
C - - - - - 0x001D39 00:9D29: 86 E7     STX ram_00E7
C - - - - - 0x001D3B 00:9D2B: A0 00     LDY #$00
C - - - - - 0x001D3D 00:9D2D: B1 E6     LDA (ram_00E6),Y
C - - - - - 0x001D3F 00:9D2F: 85 E8     STA ram_00E8
C - - - - - 0x001D41 00:9D31: C8        INY
C - - - - - 0x001D42 00:9D32: B1 E6     LDA (ram_00E6),Y
C - - - - - 0x001D44 00:9D34: 85 E9     STA ram_00E9
C - - - - - 0x001D46 00:9D36: 84 EB     STY ram_00EB
C - - - - - 0x001D48 00:9D38: 20 58 9D  JSR $9D58
C - - - - - 0x001D4B 00:9D3B: AA        TAX
C - - - - - 0x001D4C 00:9D3C: E6 EB     INC ram_00EB
C - - - - - 0x001D4E 00:9D3E: A5 EB     LDA ram_00EB
C - - - - - 0x001D50 00:9D40: 18        CLC
C - - - - - 0x001D51 00:9D41: 65 E6     ADC ram_00E6
C - - - - - 0x001D53 00:9D43: 85 E6     STA ram_00E6
C - - - - - 0x001D55 00:9D45: A5 E7     LDA ram_00E7
C - - - - - 0x001D57 00:9D47: 69 00     ADC #$00
C - - - - - 0x001D59 00:9D49: 85 E7     STA ram_00E7
C - - - - - 0x001D5B 00:9D4B: E0 FF     CPX #$FF
C - - - - - 0x001D5D 00:9D4D: D0 DC     BNE $9D2B
C - - - - - 0x001D5F 00:9D4F: 60        RTS
C D 0 - - - 0x001D60 00:9D50: 84 E6     STY ram_00E6
C - - - - - 0x001D62 00:9D52: 86 E7     STX ram_00E7
C - - - - - 0x001D64 00:9D54: A9 FF     LDA #$FF
C - - - - - 0x001D66 00:9D56: 85 EB     STA ram_00EB
C D 0 - - - 0x001D68 00:9D58: E6 EB     INC ram_00EB
C - - - - - 0x001D6A 00:9D5A: A4 EB     LDY ram_00EB
C - - - - - 0x001D6C 00:9D5C: B1 E6     LDA (ram_00E6),Y
C - - - - - 0x001D6E 00:9D5E: C9 FC     CMP #$FC
C - - - - - 0x001D70 00:9D60: B0 10     BCS $9D72
C - - - - - 0x001D72 00:9D62: A4 E8     LDY ram_00E8
C - - - - - 0x001D74 00:9D64: A6 E9     LDX ram_00E9
C - - - - - 0x001D76 00:9D66: 20 CA 88  JSR $88CA
C - - - - - 0x001D79 00:9D69: E6 E8     INC ram_00E8
C - - - - - 0x001D7B 00:9D6B: D0 02     BNE $9D6F
- - - - - - 0x001D7D 00:9D6D: E6        .byte $E6   ; 
- - - - - - 0x001D7E 00:9D6E: E9        .byte $E9   ; 
C - - - - - 0x001D7F 00:9D6F: 4C 58 9D  JMP $9D58
C - - - - - 0x001D82 00:9D72: 60        RTS
C - - - - - 0x001D83 00:9D73: 85 E8     STA ram_00E8
C - - - - - 0x001D85 00:9D75: 20 28 9B  JSR $9B28
C - - - - - 0x001D88 00:9D78: A5 E8     LDA ram_00E8
C - - - - - 0x001D8A 00:9D7A: 29 3F     AND #$3F
C - - - - - 0x001D8C 00:9D7C: 85 E8     STA ram_00E8
C - - - - - 0x001D8E 00:9D7E: A0 00     LDY #$00
C - - - - - 0x001D90 00:9D80: B1 E6     LDA (ram_00E6),Y
C - - - - - 0x001D92 00:9D82: 9D E8 05  STA ram_05E8,X
C - - - - - 0x001D95 00:9D85: C8        INY
C - - - - - 0x001D96 00:9D86: E8        INX
C - - - - - 0x001D97 00:9D87: C6 E8     DEC ram_00E8
C - - - - - 0x001D99 00:9D89: D0 F5     BNE $9D80
C - - - - - 0x001D9B 00:9D8B: 4C 5E 9B  JMP $9B5E
C - - - - - 0x001D9E 00:9D8E: 85 EC     STA ram_00EC
C - - - - - 0x001DA0 00:9D90: A9 02     LDA #$02
C - - - - - 0x001DA2 00:9D92: 20 28 9B  JSR $9B28
C - - - - - 0x001DA5 00:9D95: A5 EC     LDA ram_00EC
C - - - - - 0x001DA7 00:9D97: 4A        LSR
C - - - - - 0x001DA8 00:9D98: 4A        LSR
C - - - - - 0x001DA9 00:9D99: 4A        LSR
C - - - - - 0x001DAA 00:9D9A: 4A        LSR
C - - - - - 0x001DAB 00:9D9B: D0 02     BNE $9D9F
C - - - - - 0x001DAD 00:9D9D: A9 CD     LDA #$CD
C - - - - - 0x001DAF 00:9D9F: 18        CLC
C - - - - - 0x001DB0 00:9DA0: 69 33     ADC #$33
C - - - - - 0x001DB2 00:9DA2: 9D E8 05  STA ram_05E8,X
C - - - - - 0x001DB5 00:9DA5: E8        INX
C - - - - - 0x001DB6 00:9DA6: A5 EC     LDA ram_00EC
C - - - - - 0x001DB8 00:9DA8: 29 0F     AND #$0F
C - - - - - 0x001DBA 00:9DAA: 18        CLC
C - - - - - 0x001DBB 00:9DAB: 69 33     ADC #$33
C - - - - - 0x001DBD 00:9DAD: 9D E8 05  STA ram_05E8,X
C - - - - - 0x001DC0 00:9DB0: E8        INX
C - - - - - 0x001DC1 00:9DB1: 20 5E 9B  JSR $9B5E
C - - - - - 0x001DC4 00:9DB4: 60        RTS
C - - - - - 0x001DC5 00:9DB5: A9 04     LDA #$04
C - - - - - 0x001DC7 00:9DB7: 20 28 9B  JSR $9B28
C - - - - - 0x001DCA 00:9DBA: A9 00     LDA #$00
C - - - - - 0x001DCC 00:9DBC: 85 E7     STA ram_00E7
C - - - - - 0x001DCE 00:9DBE: A5 ED     LDA ram_00ED
C - - - - - 0x001DD0 00:9DC0: 20 DA 9D  JSR $9DDA
C - - - - - 0x001DD3 00:9DC3: A5 ED     LDA ram_00ED
C - - - - - 0x001DD5 00:9DC5: 20 DE 9D  JSR $9DDE
C - - - - - 0x001DD8 00:9DC8: A5 EC     LDA ram_00EC
C - - - - - 0x001DDA 00:9DCA: 20 DA 9D  JSR $9DDA
C - - - - - 0x001DDD 00:9DCD: A9 33     LDA #$33
C - - - - - 0x001DDF 00:9DCF: 85 E7     STA ram_00E7
C - - - - - 0x001DE1 00:9DD1: A5 EC     LDA ram_00EC
C - - - - - 0x001DE3 00:9DD3: 20 DE 9D  JSR $9DDE
C - - - - - 0x001DE6 00:9DD6: 20 5E 9B  JSR $9B5E
C - - - - - 0x001DE9 00:9DD9: 60        RTS
C - - - - - 0x001DEA 00:9DDA: 4A        LSR
C - - - - - 0x001DEB 00:9DDB: 4A        LSR
C - - - - - 0x001DEC 00:9DDC: 4A        LSR
C - - - - - 0x001DED 00:9DDD: 4A        LSR
C - - - - - 0x001DEE 00:9DDE: 29 0F     AND #$0F
C - - - - - 0x001DF0 00:9DE0: F0 04     BEQ $9DE6
C - - - - - 0x001DF2 00:9DE2: A0 33     LDY #$33
C - - - - - 0x001DF4 00:9DE4: 84 E7     STY ram_00E7
C - - - - - 0x001DF6 00:9DE6: 18        CLC
C - - - - - 0x001DF7 00:9DE7: 65 E7     ADC ram_00E7
C - - - - - 0x001DF9 00:9DE9: 9D E8 05  STA ram_05E8,X
C - - - - - 0x001DFC 00:9DEC: E8        INX
C - - - - - 0x001DFD 00:9DED: 60        RTS
C - - - - - 0x001DFE 00:9DEE: 85 ED     STA ram_00ED
C - - - - - 0x001E00 00:9DF0: A9 00     LDA #$00
C - - - - - 0x001E02 00:9DF2: 85 EC     STA ram_00EC
C - - - - - 0x001E04 00:9DF4: A0 08     LDY #$08
C - - - - - 0x001E06 00:9DF6: 06 EC     ASL ram_00EC
C - - - - - 0x001E08 00:9DF8: 26 ED     ROL ram_00ED
C - - - - - 0x001E0A 00:9DFA: 90 0C     BCC $9E08
C - - - - - 0x001E0C 00:9DFC: 8A        TXA
C - - - - - 0x001E0D 00:9DFD: 18        CLC
C - - - - - 0x001E0E 00:9DFE: 65 EC     ADC ram_00EC
C - - - - - 0x001E10 00:9E00: 85 EC     STA ram_00EC
C - - - - - 0x001E12 00:9E02: A5 ED     LDA ram_00ED
C - - - - - 0x001E14 00:9E04: 69 00     ADC #$00
C - - - - - 0x001E16 00:9E06: 85 ED     STA ram_00ED
C - - - - - 0x001E18 00:9E08: 88        DEY
C - - - - - 0x001E19 00:9E09: D0 EB     BNE $9DF6
C - - - - - 0x001E1B 00:9E0B: 60        RTS
C - - - - - 0x001E1C 00:9E0C: A9 00     LDA #$00
C - - - - - 0x001E1E 00:9E0E: 85 E8     STA ram_00E8
C - - - - - 0x001E20 00:9E10: 85 E9     STA ram_00E9
C - - - - - 0x001E22 00:9E12: A2 10     LDX #$10
C - - - - - 0x001E24 00:9E14: 06 EC     ASL ram_00EC
C - - - - - 0x001E26 00:9E16: 26 ED     ROL ram_00ED
C - - - - - 0x001E28 00:9E18: 26 E8     ROL ram_00E8
C - - - - - 0x001E2A 00:9E1A: 26 E9     ROL ram_00E9
C - - - - - 0x001E2C 00:9E1C: A5 E8     LDA ram_00E8
C - - - - - 0x001E2E 00:9E1E: 38        SEC
C - - - - - 0x001E2F 00:9E1F: E5 EA     SBC ram_00EA
C - - - - - 0x001E31 00:9E21: A8        TAY
C - - - - - 0x001E32 00:9E22: A5 E9     LDA ram_00E9
C - - - - - 0x001E34 00:9E24: E5 EB     SBC ram_00EB
C - - - - - 0x001E36 00:9E26: 90 0A     BCC $9E32
C - - - - - 0x001E38 00:9E28: 85 E9     STA ram_00E9
C - - - - - 0x001E3A 00:9E2A: 84 E8     STY ram_00E8
C - - - - - 0x001E3C 00:9E2C: E6 EC     INC ram_00EC
C - - - - - 0x001E3E 00:9E2E: D0 02     BNE $9E32
- - - - - - 0x001E40 00:9E30: E6        .byte $E6   ; 
- - - - - - 0x001E41 00:9E31: ED        .byte $ED   ; 
C - - - - - 0x001E42 00:9E32: CA        DEX
C - - - - - 0x001E43 00:9E33: D0 DF     BNE $9E14
C - - - - - 0x001E45 00:9E35: 60        RTS
C - - - - - 0x001E46 00:9E36: A9 00     LDA #$00
C - - - - - 0x001E48 00:9E38: 85 EA     STA ram_00EA
C - - - - - 0x001E4A 00:9E3A: A2 08     LDX #$08
C - - - - - 0x001E4C 00:9E3C: 06 ED     ASL ram_00ED
C - - - - - 0x001E4E 00:9E3E: 26 EA     ROL ram_00EA
C - - - - - 0x001E50 00:9E40: A5 EA     LDA ram_00EA
C - - - - - 0x001E52 00:9E42: 38        SEC
C - - - - - 0x001E53 00:9E43: E5 EC     SBC ram_00EC
C - - - - - 0x001E55 00:9E45: 90 04     BCC $9E4B
C - - - - - 0x001E57 00:9E47: 85 EA     STA ram_00EA
C - - - - - 0x001E59 00:9E49: E6 ED     INC ram_00ED
C - - - - - 0x001E5B 00:9E4B: CA        DEX
C - - - - - 0x001E5C 00:9E4C: D0 EE     BNE $9E3C
C - - - - - 0x001E5E 00:9E4E: 60        RTS
C - - - - - 0x001E5F 00:9E4F: A9 0A     LDA #$0A
C - - - - - 0x001E61 00:9E51: 85 EA     STA ram_00EA
C - - - - - 0x001E63 00:9E53: A9 00     LDA #$00
C - - - - - 0x001E65 00:9E55: 85 EB     STA ram_00EB
C - - - - - 0x001E67 00:9E57: A9 03     LDA #$03
C - - - - - 0x001E69 00:9E59: 85 E6     STA ram_00E6
C - - - - - 0x001E6B 00:9E5B: 20 0C 9E  JSR $9E0C
C - - - - - 0x001E6E 00:9E5E: A5 E8     LDA ram_00E8
C - - - - - 0x001E70 00:9E60: 85 E7     STA ram_00E7
C - - - - - 0x001E72 00:9E62: 20 0C 9E  JSR $9E0C
C - - - - - 0x001E75 00:9E65: A5 E8     LDA ram_00E8
C - - - - - 0x001E77 00:9E67: 0A        ASL
C - - - - - 0x001E78 00:9E68: 0A        ASL
C - - - - - 0x001E79 00:9E69: 0A        ASL
C - - - - - 0x001E7A 00:9E6A: 0A        ASL
C - - - - - 0x001E7B 00:9E6B: 05 E7     ORA ram_00E7
C - - - - - 0x001E7D 00:9E6D: 48        PHA
C - - - - - 0x001E7E 00:9E6E: C6 E6     DEC ram_00E6
C - - - - - 0x001E80 00:9E70: D0 E9     BNE $9E5B
C - - - - - 0x001E82 00:9E72: 68        PLA
C - - - - - 0x001E83 00:9E73: 85 EA     STA ram_00EA
C - - - - - 0x001E85 00:9E75: 68        PLA
C - - - - - 0x001E86 00:9E76: 85 E9     STA ram_00E9
C - - - - - 0x001E88 00:9E78: 68        PLA
C - - - - - 0x001E89 00:9E79: 85 E8     STA ram_00E8
C - - - - - 0x001E8B 00:9E7B: 60        RTS
C - - - - - 0x001E8C 00:9E7C: 85 ED     STA ram_00ED
C - - - - - 0x001E8E 00:9E7E: A9 0A     LDA #$0A
C - - - - - 0x001E90 00:9E80: 85 EC     STA ram_00EC
C - - - - - 0x001E92 00:9E82: 20 36 9E  JSR $9E36
C - - - - - 0x001E95 00:9E85: A5 EA     LDA ram_00EA
C - - - - - 0x001E97 00:9E87: 85 EB     STA ram_00EB
C - - - - - 0x001E99 00:9E89: 20 36 9E  JSR $9E36
C - - - - - 0x001E9C 00:9E8C: A5 EA     LDA ram_00EA
C - - - - - 0x001E9E 00:9E8E: 0A        ASL
C - - - - - 0x001E9F 00:9E8F: 0A        ASL
C - - - - - 0x001EA0 00:9E90: 0A        ASL
C - - - - - 0x001EA1 00:9E91: 0A        ASL
C - - - - - 0x001EA2 00:9E92: 05 EB     ORA ram_00EB
C - - - - - 0x001EA4 00:9E94: 85 EB     STA ram_00EB
C - - - - - 0x001EA6 00:9E96: 20 36 9E  JSR $9E36
C - - - - - 0x001EA9 00:9E99: A5 EA     LDA ram_00EA
C - - - - - 0x001EAB 00:9E9B: 85 ED     STA ram_00ED
C - - - - - 0x001EAD 00:9E9D: A5 EB     LDA ram_00EB
C - - - - - 0x001EAF 00:9E9F: 85 EC     STA ram_00EC
C - - - - - 0x001EB1 00:9EA1: 60        RTS
- D 0 - - - 0x001EB2 00:9EA2: 0F        .byte $0F   ; 
- D 0 - - - 0x001EB3 00:9EA3: 00        .byte $00   ; 
- D 0 - - - 0x001EB4 00:9EA4: 00        .byte $00   ; 
- D 0 - - - 0x001EB5 00:9EA5: 00        .byte $00   ; 
- D 0 - - - 0x001EB6 00:9EA6: 00        .byte $00   ; 
- D 0 - - - 0x001EB7 00:9EA7: 00        .byte $00   ; 
- D 0 - - - 0x001EB8 00:9EA8: 00        .byte $00   ; 
- D 0 - - - 0x001EB9 00:9EA9: 00        .byte $00   ; 
- D 0 - - - 0x001EBA 00:9EAA: 00        .byte $00   ; 
- D 0 - - - 0x001EBB 00:9EAB: 00        .byte $00   ; 
- D 0 - - - 0x001EBC 00:9EAC: 00        .byte $00   ; 
- D 0 - - - 0x001EBD 00:9EAD: 00        .byte $00   ; 
- D 0 - - - 0x001EBE 00:9EAE: 00        .byte $00   ; 
- D 0 - - - 0x001EBF 00:9EAF: 00        .byte $00   ; 
- D 0 - - - 0x001EC0 00:9EB0: 00        .byte $00   ; 
- D 0 - - - 0x001EC1 00:9EB1: 00        .byte $00   ; 
- D 0 - - - 0x001EC2 00:9EB2: 0F        .byte $0F   ; 
- D 0 - - - 0x001EC3 00:9EB3: 00        .byte $00   ; 
- D 0 - - - 0x001EC4 00:9EB4: 00        .byte $00   ; 
- D 0 - - - 0x001EC5 00:9EB5: 00        .byte $00   ; 
- D 0 - - - 0x001EC6 00:9EB6: 00        .byte $00   ; 
- D 0 - - - 0x001EC7 00:9EB7: 00        .byte $00   ; 
- D 0 - - - 0x001EC8 00:9EB8: 10        .byte $10   ; 
- D 0 - - - 0x001EC9 00:9EB9: 10        .byte $10   ; 
- D 0 - - - 0x001ECA 00:9EBA: 20        .byte $20   ; 
- D 0 - - - 0x001ECB 00:9EBB: 20        .byte $20   ; 
- D 0 - - - 0x001ECC 00:9EBC: 30        .byte $30   ; <0>
- D 0 - - - 0x001ECD 00:9EBD: 30        .byte $30   ; <0>
- D 0 - - - 0x001ECE 00:9EBE: 20        .byte $20   ; 
- D 0 - - - 0x001ECF 00:9EBF: 20        .byte $20   ; 
- D 0 - - - 0x001ED0 00:9EC0: 10        .byte $10   ; 
- D 0 - - - 0x001ED1 00:9EC1: 10        .byte $10   ; 
- D 0 - - - 0x001ED2 00:9EC2: 0F        .byte $0F   ; 
- D 0 - - - 0x001ED3 00:9EC3: 00        .byte $00   ; 
- D 0 - - - 0x001ED4 00:9EC4: 00        .byte $00   ; 
- D 0 - - - 0x001ED5 00:9EC5: 00        .byte $00   ; 
- D 0 - - - 0x001ED6 00:9EC6: 10        .byte $10   ; 
- D 0 - - - 0x001ED7 00:9EC7: 10        .byte $10   ; 
- D 0 - - - 0x001ED8 00:9EC8: 10        .byte $10   ; 
- D 0 - - - 0x001ED9 00:9EC9: 20        .byte $20   ; 
- D 0 - - - 0x001EDA 00:9ECA: 20        .byte $20   ; 
- D 0 - - - 0x001EDB 00:9ECB: 20        .byte $20   ; 
- D 0 - - - 0x001EDC 00:9ECC: 30        .byte $30   ; <0>
- D 0 - - - 0x001EDD 00:9ECD: 30        .byte $30   ; <0>
- D 0 - - - 0x001EDE 00:9ECE: 30        .byte $30   ; <0>
- D 0 - - - 0x001EDF 00:9ECF: 20        .byte $20   ; 
- D 0 - - - 0x001EE0 00:9ED0: 20        .byte $20   ; 
- D 0 - - - 0x001EE1 00:9ED1: 20        .byte $20   ; 
- D 0 - - - 0x001EE2 00:9ED2: 0F        .byte $0F   ; 
- D 0 - - - 0x001EE3 00:9ED3: 00        .byte $00   ; 
- D 0 - - - 0x001EE4 00:9ED4: 10        .byte $10   ; 
- D 0 - - - 0x001EE5 00:9ED5: 10        .byte $10   ; 
- D 0 - - - 0x001EE6 00:9ED6: 10        .byte $10   ; 
- D 0 - - - 0x001EE7 00:9ED7: 20        .byte $20   ; 
- D 0 - - - 0x001EE8 00:9ED8: 20        .byte $20   ; 
- D 0 - - - 0x001EE9 00:9ED9: 30        .byte $30   ; <0>
- D 0 - - - 0x001EEA 00:9EDA: 30        .byte $30   ; <0>
- D 0 - - - 0x001EEB 00:9EDB: 30        .byte $30   ; <0>
- D 0 - - - 0x001EEC 00:9EDC: 30        .byte $30   ; <0>
- D 0 - - - 0x001EED 00:9EDD: 30        .byte $30   ; <0>
- D 0 - - - 0x001EEE 00:9EDE: 30        .byte $30   ; <0>
- D 0 - - - 0x001EEF 00:9EDF: 30        .byte $30   ; <0>
- D 0 - - - 0x001EF0 00:9EE0: 30        .byte $30   ; <0>
- D 0 - - - 0x001EF1 00:9EE1: 30        .byte $30   ; <0>
- D 0 - - - 0x001EF2 00:9EE2: 00        .byte $00   ; 
- D 0 - - - 0x001EF3 00:9EE3: 00        .byte $00   ; 
- D 0 - - - 0x001EF4 00:9EE4: 00        .byte $00   ; 
- - - - - - 0x001EF5 00:9EE5: 00        .byte $00   ; 
- D 0 - - - 0x001EF6 00:9EE6: 10        .byte $10   ; 
- - - - - - 0x001EF7 00:9EE7: 00        .byte $00   ; 
- - - - - - 0x001EF8 00:9EE8: 00        .byte $00   ; 
- - - - - - 0x001EF9 00:9EE9: 00        .byte $00   ; 
- D 0 - - - 0x001EFA 00:9EEA: F0        .byte $F0   ; 
- - - - - - 0x001EFB 00:9EEB: 00        .byte $00   ; 
- - - - - - 0x001EFC 00:9EEC: 00        .byte $00   ; 
C D 0 - - - 0x001EFD 00:9EED: A2 01     LDX #$01
C - - - - - 0x001EFF 00:9EEF: B5 00     LDA ram_0000,X
C - - - - - 0x001F01 00:9EF1: F0 08     BEQ $9EFB
C - - - - - 0x001F03 00:9EF3: C9 FF     CMP #$FF
C - - - - - 0x001F05 00:9EF5: F0 5B     BEQ $9F52
C - - - - - 0x001F07 00:9EF7: D6 00     DEC ram_0000,X
C - - - - - 0x001F09 00:9EF9: F0 14     BEQ $9F0F
C D 0 - - - 0x001F0B 00:9EFB: 8A        TXA
C - - - - - 0x001F0C 00:9EFC: 18        CLC
C - - - - - 0x001F0D 00:9EFD: 69 04     ADC #$04
C - - - - - 0x001F0F 00:9EFF: AA        TAX
C - - - - - 0x001F10 00:9F00: E0 19     CPX #$19
C - - - - - 0x001F12 00:9F02: D0 EB     BNE $9EEF
C - - - - - 0x001F14 00:9F04: A5 1B     LDA ram_001B
C - - - - - 0x001F16 00:9F06: 10 FC     BPL $9F04
C - - - - - 0x001F18 00:9F08: 29 7F     AND #$7F
C - - - - - 0x001F1A 00:9F0A: 85 1B     STA ram_001B
C - - - - - 0x001F1C 00:9F0C: 4C ED 9E  JMP $9EED
C - - - - - 0x001F1F 00:9F0F: 86 00     STX ram_0000
C - - - - - 0x001F21 00:9F11: A9 07     LDA #$07
C - - - - - 0x001F23 00:9F13: 05 22     ORA ram_0022
C - - - - - 0x001F25 00:9F15: 85 23     STA ram_0023
C - - - - - 0x001F27 00:9F17: 8D 00 80  STA $8000
C - - - - - 0x001F2A 00:9F1A: B5 03     LDA ram_0003,X
C - - - - - 0x001F2C 00:9F1C: 85 25     STA ram_0025
C - - - - - 0x001F2E 00:9F1E: 8D 01 80  STA $8001
C - - - - - 0x001F31 00:9F21: A9 06     LDA #$06
C - - - - - 0x001F33 00:9F23: 05 22     ORA ram_0022
C - - - - - 0x001F35 00:9F25: 85 23     STA ram_0023
C - - - - - 0x001F37 00:9F27: 8D 00 80  STA $8000
C - - - - - 0x001F3A 00:9F2A: B5 02     LDA ram_0002,X
C - - - - - 0x001F3C 00:9F2C: 85 24     STA ram_0024
C - - - - - 0x001F3E 00:9F2E: 8D 01 80  STA $8001
C - - - - - 0x001F41 00:9F31: B5 01     LDA ram_0001,X
C - - - - - 0x001F43 00:9F33: AA        TAX
C - - - - - 0x001F44 00:9F34: 9A        TXS
C - - - - - 0x001F45 00:9F35: 68        PLA
C - - - - - 0x001F46 00:9F36: 85 E6     STA ram_00E6
C - - - - - 0x001F48 00:9F38: 68        PLA
C - - - - - 0x001F49 00:9F39: 85 E7     STA ram_00E7
C - - - - - 0x001F4B 00:9F3B: 68        PLA
C - - - - - 0x001F4C 00:9F3C: 85 E8     STA ram_00E8
C - - - - - 0x001F4E 00:9F3E: 68        PLA
C - - - - - 0x001F4F 00:9F3F: 85 E9     STA ram_00E9
C - - - - - 0x001F51 00:9F41: 68        PLA
C - - - - - 0x001F52 00:9F42: 85 EA     STA ram_00EA
C - - - - - 0x001F54 00:9F44: 68        PLA
C - - - - - 0x001F55 00:9F45: 85 EB     STA ram_00EB
C - - - - - 0x001F57 00:9F47: 68        PLA
C - - - - - 0x001F58 00:9F48: 85 EC     STA ram_00EC
C - - - - - 0x001F5A 00:9F4A: 68        PLA
C - - - - - 0x001F5B 00:9F4B: 85 ED     STA ram_00ED
C - - - - - 0x001F5D 00:9F4D: 68        PLA
C - - - - - 0x001F5E 00:9F4E: A8        TAY
C - - - - - 0x001F5F 00:9F4F: 68        PLA
C - - - - - 0x001F60 00:9F50: AA        TAX
C - - - - - 0x001F61 00:9F51: 60        RTS
C - - - - - 0x001F62 00:9F52: 86 00     STX ram_0000
C - - - - - 0x001F64 00:9F54: A9 06     LDA #$06
C - - - - - 0x001F66 00:9F56: 05 22     ORA ram_0022
C - - - - - 0x001F68 00:9F58: 85 23     STA ram_0023
C - - - - - 0x001F6A 00:9F5A: 8D 00 80  STA $8000
C - - - - - 0x001F6D 00:9F5D: B5 02     LDA ram_0002,X
C - - - - - 0x001F6F 00:9F5F: 85 24     STA ram_0024
C - - - - - 0x001F71 00:9F61: 8D 01 80  STA $8001
C - - - - - 0x001F74 00:9F64: B5 01     LDA ram_0001,X
C D 0 - - - 0x001F76 00:9F66: AA        TAX
C - - - - - 0x001F77 00:9F67: 9A        TXS
C - - - - - 0x001F78 00:9F68: 60        RTS
C - - - - - 0x001F79 00:9F69: 95 02     STA ram_0002,X
C - - - - - 0x001F7B 00:9F6B: 88        DEY
C - - - - - 0x001F7C 00:9F6C: 88        DEY
C - - - - - 0x001F7D 00:9F6D: B5 00     LDA ram_0000,X
C - - - - - 0x001F7F 00:9F6F: 99 01 01  STA ram_0101,Y
C - - - - - 0x001F82 00:9F72: B5 01     LDA ram_0001,X
C - - - - - 0x001F84 00:9F74: 99 02 01  STA ram_0102,Y
C - - - - - 0x001F87 00:9F77: 94 01     STY ram_0001,X
C - - - - - 0x001F89 00:9F79: A9 FF     LDA #$FF
C - - - - - 0x001F8B 00:9F7B: 95 00     STA ram_0000,X
C - - - - - 0x001F8D 00:9F7D: 60        RTS
C D 0 - - - 0x001F8E 00:9F7E: A9 00     LDA #$00
C - - - - - 0x001F90 00:9F80: A6 00     LDX ram_0000
C - - - - - 0x001F92 00:9F82: 95 00     STA ram_0000,X
C - - - - - 0x001F94 00:9F84: 95 01     STA ram_0001,X
C - - - - - 0x001F96 00:9F86: 4C FB 9E  JMP $9EFB
C - - - - - 0x001F99 00:9F89: B5 01     LDA ram_0001,X
C - - - - - 0x001F9B 00:9F8B: F0 08     BEQ $9F95
C - - - - - 0x001F9D 00:9F8D: B5 00     LDA ram_0000,X
C - - - - - 0x001F9F 00:9F8F: D0 04     BNE $9F95
C - - - - - 0x001FA1 00:9F91: A9 01     LDA #$01
C - - - - - 0x001FA3 00:9F93: 95 00     STA ram_0000,X
C - - - - - 0x001FA5 00:9F95: 60        RTS
C - - - - - 0x001FA6 00:9F96: B5 00     LDA ram_0000,X
C - - - - - 0x001FA8 00:9F98: C9 FF     CMP #$FF
C - - - - - 0x001FAA 00:9F9A: D0 05     BNE $9FA1
C - - - - - 0x001FAC 00:9F9C: A9 01     LDA #$01
C - - - - - 0x001FAE 00:9F9E: 20 A8 9F  JSR $9FA8
C - - - - - 0x001FB1 00:9FA1: A9 00     LDA #$00
C - - - - - 0x001FB3 00:9FA3: 95 00     STA ram_0000,X
C - - - - - 0x001FB5 00:9FA5: 60        RTS
- D 0 - - - 0x001FB6 00:9FA6: A9        .byte $A9   ; 
- - - - - - 0x001FB7 00:9FA7: 00        .byte $00   ; 
C - - - - - 0x001FB8 00:9FA8: 85 19     STA ram_0019
C - - - - - 0x001FBA 00:9FAA: 8A        TXA
C - - - - - 0x001FBB 00:9FAB: 48        PHA
C - - - - - 0x001FBC 00:9FAC: 98        TYA
C - - - - - 0x001FBD 00:9FAD: 48        PHA
C - - - - - 0x001FBE 00:9FAE: A5 ED     LDA ram_00ED
C - - - - - 0x001FC0 00:9FB0: 48        PHA
C - - - - - 0x001FC1 00:9FB1: A5 EC     LDA ram_00EC
C - - - - - 0x001FC3 00:9FB3: 48        PHA
C - - - - - 0x001FC4 00:9FB4: A5 EB     LDA ram_00EB
C - - - - - 0x001FC6 00:9FB6: 48        PHA
C - - - - - 0x001FC7 00:9FB7: A5 EA     LDA ram_00EA
C - - - - - 0x001FC9 00:9FB9: 48        PHA
C - - - - - 0x001FCA 00:9FBA: A5 E9     LDA ram_00E9
C - - - - - 0x001FCC 00:9FBC: 48        PHA
C - - - - - 0x001FCD 00:9FBD: A5 E8     LDA ram_00E8
C - - - - - 0x001FCF 00:9FBF: 48        PHA
C - - - - - 0x001FD0 00:9FC0: A5 E7     LDA ram_00E7
C - - - - - 0x001FD2 00:9FC2: 48        PHA
C - - - - - 0x001FD3 00:9FC3: A5 E6     LDA ram_00E6
C - - - - - 0x001FD5 00:9FC5: 48        PHA
C - - - - - 0x001FD6 00:9FC6: BA        TSX
C - - - - - 0x001FD7 00:9FC7: 8A        TXA
C - - - - - 0x001FD8 00:9FC8: A6 00     LDX ram_0000
C - - - - - 0x001FDA 00:9FCA: 95 01     STA ram_0001,X
C - - - - - 0x001FDC 00:9FCC: AD 24 00  LDA a: ram_0024
C - - - - - 0x001FDF 00:9FCF: 95 02     STA ram_0002,X
C - - - - - 0x001FE1 00:9FD1: AD 25 00  LDA a: ram_0025
C - - - - - 0x001FE4 00:9FD4: 95 03     STA ram_0003,X
C - - - - - 0x001FE6 00:9FD6: A5 19     LDA ram_0019
C - - - - - 0x001FE8 00:9FD8: F0 04     BEQ $9FDE
C - - - - - 0x001FEA 00:9FDA: C9 FF     CMP #$FF
C - - - - - 0x001FEC 00:9FDC: D0 02     BNE $9FE0
C - - - - - 0x001FEE 00:9FDE: A9 FE     LDA #$FE
C - - - - - 0x001FF0 00:9FE0: 95 00     STA ram_0000,X
C - - - - - 0x001FF2 00:9FE2: 4C FB 9E  JMP $9EFB
- - - - - - 0x001FF5 00:9FE5: FF        .byte $FF   ; 
- - - - - - 0x001FF6 00:9FE6: FF        .byte $FF   ; 
- - - - - - 0x001FF7 00:9FE7: FF        .byte $FF   ; 
- - - - - - 0x001FF8 00:9FE8: FF        .byte $FF   ; 
- - - - - - 0x001FF9 00:9FE9: FF        .byte $FF   ; 
- - - - - - 0x001FFA 00:9FEA: FF        .byte $FF   ; 
- - - - - - 0x001FFB 00:9FEB: FF        .byte $FF   ; 
- - - - - - 0x001FFC 00:9FEC: FF        .byte $FF   ; 
- - - - - - 0x001FFD 00:9FED: FF        .byte $FF   ; 
- - - - - - 0x001FFE 00:9FEE: FF        .byte $FF   ; 
- - - - - - 0x001FFF 00:9FEF: FF        .byte $FF   ; 
- - - - - - 0x002000 00:9FF0: FF        .byte $FF   ; 
- - - - - - 0x002001 00:9FF1: FF        .byte $FF   ; 
- - - - - - 0x002002 00:9FF2: FF        .byte $FF   ; 
- - - - - - 0x002003 00:9FF3: FF        .byte $FF   ; 
- - - - - - 0x002004 00:9FF4: FF        .byte $FF   ; 
- - - - - - 0x002005 00:9FF5: FF        .byte $FF   ; 
- - - - - - 0x002006 00:9FF6: FF        .byte $FF   ; 
- - - - - - 0x002007 00:9FF7: FF        .byte $FF   ; 
- - - - - - 0x002008 00:9FF8: FF        .byte $FF   ; 
- - - - - - 0x002009 00:9FF9: FF        .byte $FF   ; 
- - - - - - 0x00200A 00:9FFA: FF        .byte $FF   ; 
- - - - - - 0x00200B 00:9FFB: FF        .byte $FF   ; 
- - - - - - 0x00200C 00:9FFC: FF        .byte $FF   ; 
- - - - - - 0x00200D 00:9FFD: FF        .byte $FF   ; 
- - - - - - 0x00200E 00:9FFE: FF        .byte $FF   ; 
- - - - - - 0x00200F 00:9FFF: FF        .byte $FF   ; 



