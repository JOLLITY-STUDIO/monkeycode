; bank_30.asm 分片 3/5 (原文件行 2001-3000, 共 4835 行)

C - - - - - 0x03CB45 0F:CB35: A5 20     LDA ram_0020
C - - - - - 0x03CB47 0F:CB37: 29 7F     AND #$7F
C - - - - - 0x03CB49 0F:CB39: 85 20     STA ram_0020
C - - - - - 0x03CB4B 0F:CB3B: 8D 00 20  STA $2000
C - - - - - 0x03CB4E 0F:CB3E: A9 06     LDA #$06
C - - - - - 0x03CB50 0F:CB40: 8D 01 20  STA $2001
C - - - - - 0x03CB53 0F:CB43: A9 20     LDA #$20
C - - - - - 0x03CB55 0F:CB45: 20 5C CB  JSR $CB5C
C - - - - - 0x03CB58 0F:CB48: A9 24     LDA #$24
C - - - - - 0x03CB5A 0F:CB4A: 20 5C CB  JSR $CB5C
C - - - - - 0x03CB5D 0F:CB4D: A9 1E     LDA #$1E
C - - - - - 0x03CB5F 0F:CB4F: 8D 01 20  STA $2001
C - - - - - 0x03CB62 0F:CB52: A5 20     LDA ram_0020
C - - - - - 0x03CB64 0F:CB54: 09 80     ORA #$80
C - - - - - 0x03CB66 0F:CB56: 85 20     STA ram_0020
C - - - - - 0x03CB68 0F:CB58: 8D 00 20  STA $2000
C - - - - - 0x03CB6B 0F:CB5B: 60        RTS
C - - - - - 0x03CB6C 0F:CB5C: 2C 02 20  BIT $2002
C - - - - - 0x03CB6F 0F:CB5F: 8D 06 20  STA $2006
C - - - - - 0x03CB72 0F:CB62: A9 00     LDA #$00
C - - - - - 0x03CB74 0F:CB64: 8D 06 20  STA $2006
C - - - - - 0x03CB77 0F:CB67: A9 00     LDA #$00
C - - - - - 0x03CB79 0F:CB69: A2 C0     LDX #$C0
C - - - - - 0x03CB7B 0F:CB6B: A0 04     LDY #$04
C - - - - - 0x03CB7D 0F:CB6D: 8D 07 20  STA $2007
C - - - - - 0x03CB80 0F:CB70: CA        DEX
C - - - - - 0x03CB81 0F:CB71: D0 FA     BNE $CB6D
C - - - - - 0x03CB83 0F:CB73: 88        DEY
C - - - - - 0x03CB84 0F:CB74: D0 F7     BNE $CB6D
C - - - - - 0x03CB86 0F:CB76: 8A        TXA
C - - - - - 0x03CB87 0F:CB77: A2 40     LDX #$40
C - - - - - 0x03CB89 0F:CB79: 8D 07 20  STA $2007
C - - - - - 0x03CB8C 0F:CB7C: CA        DEX
C - - - - - 0x03CB8D 0F:CB7D: D0 FA     BNE $CB79
C - - - - - 0x03CB8F 0F:CB7F: 2C 02 20  BIT $2002
C - - - - - 0x03CB92 0F:CB82: A9 00     LDA #$00
C - - - - - 0x03CB94 0F:CB84: 8D 05 20  STA $2005
C - - - - - 0x03CB97 0F:CB87: 8D 05 20  STA $2005
C - - - - - 0x03CB9A 0F:CB8A: 60        RTS
C - - - - - 0x03CB9B 0F:CB8B: A0 00     LDY #$00
C - - - - - 0x03CB9D 0F:CB8D: A9 F8     LDA #$F8
C - - - - - 0x03CB9F 0F:CB8F: 99 00 02  STA ram_0200,Y
C - - - - - 0x03CBA2 0F:CB92: C8        INY
C - - - - - 0x03CBA3 0F:CB93: C8        INY
C - - - - - 0x03CBA4 0F:CB94: C8        INY
C - - - - - 0x03CBA5 0F:CB95: C8        INY
C - - - - - 0x03CBA6 0F:CB96: D0 F7     BNE $CB8F
C - - - - - 0x03CBA8 0F:CB98: 60        RTS
C D 2 - - - 0x03CBA9 0F:CB99: 0A        ASL
C - - - - - 0x03CBAA 0F:CB9A: A8        TAY
C - - - - - 0x03CBAB 0F:CB9B: 68        PLA
C - - - - - 0x03CBAC 0F:CB9C: 85 36     STA ram_0036
C - - - - - 0x03CBAE 0F:CB9E: 68        PLA
C - - - - - 0x03CBAF 0F:CB9F: 85 37     STA ram_0037
C - - - - - 0x03CBB1 0F:CBA1: C8        INY
C - - - - - 0x03CBB2 0F:CBA2: B1 36     LDA (ram_0036),Y
C - - - - - 0x03CBB4 0F:CBA4: 48        PHA
C - - - - - 0x03CBB5 0F:CBA5: C8        INY
C - - - - - 0x03CBB6 0F:CBA6: B1 36     LDA (ram_0036),Y
C - - - - - 0x03CBB8 0F:CBA8: 85 37     STA ram_0037
C - - - - - 0x03CBBA 0F:CBAA: 68        PLA
C - - - - - 0x03CBBB 0F:CBAB: 85 36     STA ram_0036
C - - - - - 0x03CBBD 0F:CBAD: 6C 36 00  JMP (ram_0036)
C D 2 - - - 0x03CBC0 0F:CBB0: 8D 18 05  STA ram_0518
C - - - - - 0x03CBC3 0F:CBB3: A9 80     LDA #$80
C - - - - - 0x03CBC5 0F:CBB5: 8D 16 05  STA ram_0516
C - - - - - 0x03CBC8 0F:CBB8: A9 00     LDA #$00
C - - - - - 0x03CBCA 0F:CBBA: 85 05     STA ram_0005
C - - - - - 0x03CBCC 0F:CBBC: A9 00     LDA #$00
C - - - - - 0x03CBCE 0F:CBBE: 20 0F CB  JSR $CB0F
C - - - - - 0x03CBD1 0F:CBC1: 60        RTS
C D 2 - - - 0x03CBD2 0F:CBC2: A0 00     LDY #$00
C - - - - - 0x03CBD4 0F:CBC4: C9 A0     CMP #$A0
C - - - - - 0x03CBD6 0F:CBC6: 90 28     BCC $CBF0
C - - - - - 0x03CBD8 0F:CBC8: A0 94     LDY #$94
C - - - - - 0x03CBDA 0F:CBCA: C9 C8     CMP #$C8
C - - - - - 0x03CBDC 0F:CBCC: 90 0C     BCC $CBDA
C - - - - - 0x03CBDE 0F:CBCE: A0 95     LDY #$95
C - - - - - 0x03CBE0 0F:CBD0: E9 AE     SBC #$AE
C - - - - - 0x03CBE2 0F:CBD2: C9 1F     CMP #$1F
C - - - - - 0x03CBE4 0F:CBD4: 90 1A     BCC $CBF0
C - - - - - 0x03CBE6 0F:CBD6: E9 05     SBC #$05
C - - - - - 0x03CBE8 0F:CBD8: B0 13     BCS $CBED
C - - - - - 0x03CBEA 0F:CBDA: C9 B4     CMP #$B4
C - - - - - 0x03CBEC 0F:CBDC: 08        PHP
C - - - - - 0x03CBED 0F:CBDD: 90 02     BCC $CBE1
C - - - - - 0x03CBEF 0F:CBDF: E9 14     SBC #$14
C - - - - - 0x03CBF1 0F:CBE1: 38        SEC
C - - - - - 0x03CBF2 0F:CBE2: E9 9A     SBC #$9A
C - - - - - 0x03CBF4 0F:CBE4: C9 15     CMP #$15
C - - - - - 0x03CBF6 0F:CBE6: 90 02     BCC $CBEA
C - - - - - 0x03CBF8 0F:CBE8: 69 04     ADC #$04
C - - - - - 0x03CBFA 0F:CBEA: 28        PLP
C - - - - - 0x03CBFB 0F:CBEB: 90 03     BCC $CBF0
C - - - - - 0x03CBFD 0F:CBED: 18        CLC
C - - - - - 0x03CBFE 0F:CBEE: 69 40     ADC #$40
C - - - - - 0x03CC00 0F:CBF0: 60        RTS
C D 2 - - - 0x03CC01 0F:CBF1: A2 00     LDX #$00
C - - - - - 0x03CC03 0F:CBF3: BC 00 07  LDY ram_0700,X
C - - - - - 0x03CC06 0F:CBF6: F0 06     BEQ $CBFE
C - - - - - 0x03CC08 0F:CBF8: E8        INX
C - - - - - 0x03CC09 0F:CBF9: E0 05     CPX #$05
C - - - - - 0x03CC0B 0F:CBFB: D0 F6     BNE $CBF3
- - - - - - 0x03CC0D 0F:CBFD: 60        .byte $60   ; 
C - - - - - 0x03CC0E 0F:CBFE: 9D 00 07  STA ram_0700,X
C - - - - - 0x03CC11 0F:CC01: 60        RTS
C D 2 - - - 0x03CC12 0F:CC02: A0 00     LDY #$00
C - - - - - 0x03CC14 0F:CC04: 84 66     STY ram_0066
C - - - - - 0x03CC16 0F:CC06: 0A        ASL
C - - - - - 0x03CC17 0F:CC07: 26 66     ROL ram_0066
C - - - - - 0x03CC19 0F:CC09: 0A        ASL
C - - - - - 0x03CC1A 0F:CC0A: A8        TAY
C - - - - - 0x03CC1B 0F:CC0B: 26 66     ROL ram_0066
C - - - - - 0x03CC1D 0F:CC0D: 0A        ASL
C - - - - - 0x03CC1E 0F:CC0E: 26 66     ROL ram_0066
C - - - - - 0x03CC20 0F:CC10: 85 65     STA ram_0065
C - - - - - 0x03CC22 0F:CC12: 98        TYA
C - - - - - 0x03CC23 0F:CC13: 65 65     ADC ram_0065
C - - - - - 0x03CC25 0F:CC15: 90 02     BCC $CC19
C - - - - - 0x03CC27 0F:CC17: E6 66     INC ram_0066
C - - - - - 0x03CC29 0F:CC19: 18        CLC
C - - - - - 0x03CC2A 0F:CC1A: 69 CC     ADC #$CC
C - - - - - 0x03CC2C 0F:CC1C: 85 65     STA ram_0065
C - - - - - 0x03CC2E 0F:CC1E: A5 66     LDA ram_0066
C - - - - - 0x03CC30 0F:CC20: 69 FB     ADC #$FB
C - - - - - 0x03CC32 0F:CC22: 85 66     STA ram_0066
C - - - - - 0x03CC34 0F:CC24: A9 10     LDA #$10
C - - - - - 0x03CC36 0F:CC26: 8D 6C 04  STA ram_046C
C - - - - - 0x03CC39 0F:CC29: A0 00     LDY #$00
C - - - - - 0x03CC3B 0F:CC2B: 8A        TXA
C - - - - - 0x03CC3C 0F:CC2C: 29 03     AND #$03
C - - - - - 0x03CC3E 0F:CC2E: F0 05     BEQ $CC35
C - - - - - 0x03CC40 0F:CC30: B1 65     LDA (ram_0065),Y
C - - - - - 0x03CC42 0F:CC32: C8        INY
C - - - - - 0x03CC43 0F:CC33: D0 02     BNE $CC37
C - - - - - 0x03CC45 0F:CC35: A9 0F     LDA #$0F
C - - - - - 0x03CC47 0F:CC37: 9D 6F 04  STA ram_046F,X
C - - - - - 0x03CC4A 0F:CC3A: E8        INX
C - - - - - 0x03CC4B 0F:CC3B: CE 6C 04  DEC ram_046C
C - - - - - 0x03CC4E 0F:CC3E: D0 EB     BNE $CC2B
C - - - - - 0x03CC50 0F:CC40: A9 20     LDA #$20
C - - - - - 0x03CC52 0F:CC42: 8D 6C 04  STA ram_046C
C - - - - - 0x03CC55 0F:CC45: 60        RTS
C D 2 - - - 0x03CC56 0F:CC46: A9 00     LDA #$00
C - - - - - 0x03CC58 0F:CC48: 8D F4 05  STA ram_05F4
C - - - - - 0x03CC5B 0F:CC4B: A9 06     LDA #$06
C - - - - - 0x03CC5D 0F:CC4D: 48        PHA
C - - - - - 0x03CC5E 0F:CC4E: A9 01     LDA #$01
C - - - - - 0x03CC60 0F:CC50: 20 0F CB  JSR $CB0F
C - - - - - 0x03CC63 0F:CC53: AD 15 05  LDA ram_0515
C - - - - - 0x03CC66 0F:CC56: D0 F6     BNE $CC4E
C - - - - - 0x03CC68 0F:CC58: A9 01     LDA #$01
C - - - - - 0x03CC6A 0F:CC5A: 8D 15 05  STA ram_0515
C - - - - - 0x03CC6D 0F:CC5D: A0 4F     LDY #$4F
C - - - - - 0x03CC6F 0F:CC5F: A2 00     LDX #$00
C - - - - - 0x03CC71 0F:CC61: 8A        TXA
C - - - - - 0x03CC72 0F:CC62: 9D A5 04  STA ram_04A5,X
C - - - - - 0x03CC75 0F:CC65: E8        INX
C - - - - - 0x03CC76 0F:CC66: 88        DEY
C - - - - - 0x03CC77 0F:CC67: D0 F9     BNE $CC62
C - - - - - 0x03CC79 0F:CC69: A9 18     LDA #$18
C - - - - - 0x03CC7B 0F:CC6B: 8D A5 04  STA ram_04A5
C - - - - - 0x03CC7E 0F:CC6E: 8D C0 04  STA ram_04C0
C - - - - - 0x03CC81 0F:CC71: A9 20     LDA #$20
C - - - - - 0x03CC83 0F:CC73: 8D A6 04  STA ram_04A6
C - - - - - 0x03CC86 0F:CC76: 68        PLA
C - - - - - 0x03CC87 0F:CC77: 48        PHA
C - - - - - 0x03CC88 0F:CC78: 09 08     ORA #$08
C - - - - - 0x03CC8A 0F:CC7A: 4A        LSR
C - - - - - 0x03CC8B 0F:CC7B: 6E A6 04  ROR ram_04A6
C - - - - - 0x03CC8E 0F:CC7E: 4A        LSR
C - - - - - 0x03CC8F 0F:CC7F: 6E A6 04  ROR ram_04A6
C - - - - - 0x03CC92 0F:CC82: 09 20     ORA #$20
C - - - - - 0x03CC94 0F:CC84: 8D A7 04  STA ram_04A7
C - - - - - 0x03CC97 0F:CC87: 8D C2 04  STA ram_04C2
C - - - - - 0x03CC9A 0F:CC8A: AD A6 04  LDA ram_04A6
C - - - - - 0x03CC9D 0F:CC8D: 18        CLC
C - - - - - 0x03CC9E 0F:CC8E: 69 20     ADC #$20
C - - - - - 0x03CCA0 0F:CC90: 8D C1 04  STA ram_04C1
C - - - - - 0x03CCA3 0F:CC93: A9 80     LDA #$80
C - - - - - 0x03CCA5 0F:CC95: 8D 15 05  STA ram_0515
C - - - - - 0x03CCA8 0F:CC98: 68        PLA
C - - - - - 0x03CCA9 0F:CC99: 38        SEC
C - - - - - 0x03CCAA 0F:CC9A: E9 01     SBC #$01
C - - - - - 0x03CCAC 0F:CC9C: 10 AF     BPL $CC4D
C - - - - - 0x03CCAE 0F:CC9E: A9 01     LDA #$01
C - - - - - 0x03CCB0 0F:CCA0: 20 0F CB  JSR $CB0F
C - - - - - 0x03CCB3 0F:CCA3: AD 15 05  LDA ram_0515
C - - - - - 0x03CCB6 0F:CCA6: D0 F6     BNE $CC9E
C - - - - - 0x03CCB8 0F:CCA8: A9 01     LDA #$01
C - - - - - 0x03CCBA 0F:CCAA: 8D 15 05  STA ram_0515
C - - - - - 0x03CCBD 0F:CCAD: A9 20     LDA #$20
C - - - - - 0x03CCBF 0F:CCAF: 8D A5 04  STA ram_04A5
C - - - - - 0x03CCC2 0F:CCB2: A9 E0     LDA #$E0
C - - - - - 0x03CCC4 0F:CCB4: 8D A6 04  STA ram_04A6
C - - - - - 0x03CCC7 0F:CCB7: A9 23     LDA #$23
C - - - - - 0x03CCC9 0F:CCB9: 8D A7 04  STA ram_04A7
C - - - - - 0x03CCCC 0F:CCBC: A2 00     LDX #$00
C - - - - - 0x03CCCE 0F:CCBE: 8A        TXA
C - - - - - 0x03CCCF 0F:CCBF: 9D A8 04  STA ram_04A8,X
C - - - - - 0x03CCD2 0F:CCC2: E8        INX
C - - - - - 0x03CCD3 0F:CCC3: E0 21     CPX #$21
C - - - - - 0x03CCD5 0F:CCC5: D0 F8     BNE $CCBF
C - - - - - 0x03CCD7 0F:CCC7: A9 80     LDA #$80
C - - - - - 0x03CCD9 0F:CCC9: 8D 15 05  STA ram_0515
C - - - - - 0x03CCDC 0F:CCCC: A9 01     LDA #$01
C - - - - - 0x03CCDE 0F:CCCE: 20 0F CB  JSR $CB0F
C - - - - - 0x03CCE1 0F:CCD1: 60        RTS
C D 2 - - - 0x03CCE2 0F:CCD2: BA        TSX
C - - - - - 0x03CCE3 0F:CCD3: BD 01 01  LDA ram_0101,X
C - - - - - 0x03CCE6 0F:CCD6: 85 75     STA ram_0075
C - - - - - 0x03CCE8 0F:CCD8: 48        PHA
C - - - - - 0x03CCE9 0F:CCD9: BD 02 01  LDA ram_0102,X
C - - - - - 0x03CCEC 0F:CCDC: 85 76     STA ram_0076
C - - - - - 0x03CCEE 0F:CCDE: 68        PLA
C - - - - - 0x03CCEF 0F:CCDF: 18        CLC
C - - - - - 0x03CCF0 0F:CCE0: 69 03     ADC #$03
C - - - - - 0x03CCF2 0F:CCE2: 9D 01 01  STA ram_0101,X
C - - - - - 0x03CCF5 0F:CCE5: 90 03     BCC $CCEA
- - - - - - 0x03CCF7 0F:CCE7: FE        .byte $FE   ; 
- - - - - - 0x03CCF8 0F:CCE8: 02        .byte $02   ; 
- - - - - - 0x03CCF9 0F:CCE9: 01        .byte $01   ; 
C - - - - - 0x03CCFA 0F:CCEA: 98        TYA
C - - - - - 0x03CCFB 0F:CCEB: 48        PHA
C - - - - - 0x03CCFC 0F:CCEC: AD 98 04  LDA ram_0498
C - - - - - 0x03CCFF 0F:CCEF: 0A        ASL
C - - - - - 0x03CD00 0F:CCF0: 6D 98 04  ADC ram_0498
C - - - - - 0x03CD03 0F:CCF3: AA        TAX
C - - - - - 0x03CD04 0F:CCF4: A0 01     LDY #$01
C - - - - - 0x03CD06 0F:CCF6: B1 75     LDA (ram_0075),Y
C - - - - - 0x03CD08 0F:CCF8: 9D 99 04  STA ram_0499,X
C - - - - - 0x03CD0B 0F:CCFB: C8        INY
C - - - - - 0x03CD0C 0F:CCFC: B1 75     LDA (ram_0075),Y
C - - - - - 0x03CD0E 0F:CCFE: 9D 9A 04  STA ram_049A,X
C - - - - - 0x03CD11 0F:CD01: C8        INY
C - - - - - 0x03CD12 0F:CD02: B1 75     LDA (ram_0075),Y
C - - - - - 0x03CD14 0F:CD04: 9D 9B 04  STA ram_049B,X
C - - - - - 0x03CD17 0F:CD07: EE 98 04  INC ram_0498
C - - - - - 0x03CD1A 0F:CD0A: 68        PLA
C - - - - - 0x03CD1B 0F:CD0B: A8        TAY
C - - - - - 0x03CD1C 0F:CD0C: 60        RTS
C D 2 - - - 0x03CD1D 0F:CD0D: 8A        TXA
C - - - - - 0x03CD1E 0F:CD0E: 48        PHA
C - - - - - 0x03CD1F 0F:CD0F: A9 00     LDA #$00
C - - - - - 0x03CD21 0F:CD11: 85 6B     STA ram_006B
C - - - - - 0x03CD23 0F:CD13: 85 6C     STA ram_006C
C - - - - - 0x03CD25 0F:CD15: 85 6D     STA ram_006D
C - - - - - 0x03CD27 0F:CD17: 85 6E     STA ram_006E
C - - - - - 0x03CD29 0F:CD19: A2 10     LDX #$10
C - - - - - 0x03CD2B 0F:CD1B: 66 68     ROR ram_0068
C - - - - - 0x03CD2D 0F:CD1D: 66 67     ROR ram_0067
C - - - - - 0x03CD2F 0F:CD1F: 90 0D     BCC $CD2E
C - - - - - 0x03CD31 0F:CD21: 18        CLC
C - - - - - 0x03CD32 0F:CD22: A5 6D     LDA ram_006D
C - - - - - 0x03CD34 0F:CD24: 65 69     ADC ram_0069
C - - - - - 0x03CD36 0F:CD26: 85 6D     STA ram_006D
C - - - - - 0x03CD38 0F:CD28: A5 6E     LDA ram_006E
C - - - - - 0x03CD3A 0F:CD2A: 65 6A     ADC ram_006A
C - - - - - 0x03CD3C 0F:CD2C: 85 6E     STA ram_006E
C - - - - - 0x03CD3E 0F:CD2E: 66 6E     ROR ram_006E
C - - - - - 0x03CD40 0F:CD30: 66 6D     ROR ram_006D
C - - - - - 0x03CD42 0F:CD32: 66 6C     ROR ram_006C
C - - - - - 0x03CD44 0F:CD34: 66 6B     ROR ram_006B
C - - - - - 0x03CD46 0F:CD36: CA        DEX
C - - - - - 0x03CD47 0F:CD37: D0 E2     BNE $CD1B
C - - - - - 0x03CD49 0F:CD39: 68        PLA
C - - - - - 0x03CD4A 0F:CD3A: AA        TAX
C - - - - - 0x03CD4B 0F:CD3B: 60        RTS
C D 2 - - - 0x03CD4C 0F:CD3C: 8A        TXA
C - - - - - 0x03CD4D 0F:CD3D: 48        PHA
C - - - - - 0x03CD4E 0F:CD3E: A9 00     LDA #$00
C - - - - - 0x03CD50 0F:CD40: 85 72     STA ram_0072
C - - - - - 0x03CD52 0F:CD42: 85 73     STA ram_0073
C - - - - - 0x03CD54 0F:CD44: A2 10     LDX #$10
C - - - - - 0x03CD56 0F:CD46: 26 6F     ROL ram_006F
C - - - - - 0x03CD58 0F:CD48: 26 70     ROL ram_0070
C - - - - - 0x03CD5A 0F:CD4A: 26 72     ROL ram_0072
C - - - - - 0x03CD5C 0F:CD4C: 26 73     ROL ram_0073
C - - - - - 0x03CD5E 0F:CD4E: B0 10     BCS $CD60
C - - - - - 0x03CD60 0F:CD50: A5 73     LDA ram_0073
C - - - - - 0x03CD62 0F:CD52: C5 74     CMP ram_0074
C - - - - - 0x03CD64 0F:CD54: F0 04     BEQ $CD5A
C - - - - - 0x03CD66 0F:CD56: 90 15     BCC $CD6D
C - - - - - 0x03CD68 0F:CD58: B0 06     BCS $CD60
C - - - - - 0x03CD6A 0F:CD5A: A5 72     LDA ram_0072
C - - - - - 0x03CD6C 0F:CD5C: C5 71     CMP ram_0071
C - - - - - 0x03CD6E 0F:CD5E: 90 0D     BCC $CD6D
C - - - - - 0x03CD70 0F:CD60: A5 72     LDA ram_0072
C - - - - - 0x03CD72 0F:CD62: E5 71     SBC ram_0071
C - - - - - 0x03CD74 0F:CD64: 85 72     STA ram_0072
C - - - - - 0x03CD76 0F:CD66: A5 73     LDA ram_0073
C - - - - - 0x03CD78 0F:CD68: E5 74     SBC ram_0074
C - - - - - 0x03CD7A 0F:CD6A: 85 73     STA ram_0073
C - - - - - 0x03CD7C 0F:CD6C: 38        SEC
C - - - - - 0x03CD7D 0F:CD6D: 26 6F     ROL ram_006F
C - - - - - 0x03CD7F 0F:CD6F: 26 70     ROL ram_0070
C - - - - - 0x03CD81 0F:CD71: CA        DEX
C - - - - - 0x03CD82 0F:CD72: D0 D6     BNE $CD4A
C - - - - - 0x03CD84 0F:CD74: 68        PLA
C - - - - - 0x03CD85 0F:CD75: AA        TAX
C - - - - - 0x03CD86 0F:CD76: 60        RTS
C D 2 - - - 0x03CD87 0F:CD77: AD FB 05  LDA ram_05FB
C - - - - - 0x03CD8A 0F:CD7A: 49 0B     EOR #$0B
C D 2 - - - 0x03CD8C 0F:CD7C: 0A        ASL
C - - - - - 0x03CD8D 0F:CD7D: A8        TAY
C - - - - - 0x03CD8E 0F:CD7E: B9 89 CD  LDA $CD89,Y
C - - - - - 0x03CD91 0F:CD81: 85 34     STA ram_0034
C - - - - - 0x03CD93 0F:CD83: B9 8A CD  LDA $CD8A,Y
C - - - - - 0x03CD96 0F:CD86: 85 35     STA ram_0035
C - - - - - 0x03CD98 0F:CD88: 60        RTS
- D 2 - - - 0x03CD99 0F:CD89: 00        .byte $00   ; 
- D 2 - - - 0x03CD9A 0F:CD8A: 03        .byte $03   ; 
- D 2 - - - 0x03CD9B 0F:CD8B: 0C        .byte $0C   ; 
- D 2 - - - 0x03CD9C 0F:CD8C: 03        .byte $03   ; 
- D 2 - - - 0x03CD9D 0F:CD8D: 18        .byte $18   ; 
- D 2 - - - 0x03CD9E 0F:CD8E: 03        .byte $03   ; 
- D 2 - - - 0x03CD9F 0F:CD8F: 24        .byte $24   ; 
- D 2 - - - 0x03CDA0 0F:CD90: 03        .byte $03   ; 
- D 2 - - - 0x03CDA1 0F:CD91: 30        .byte $30   ; <0>
- D 2 - - - 0x03CDA2 0F:CD92: 03        .byte $03   ; 
- D 2 - - - 0x03CDA3 0F:CD93: 3C        .byte $3C   ; 
- D 2 - - - 0x03CDA4 0F:CD94: 03        .byte $03   ; 
- D 2 - - - 0x03CDA5 0F:CD95: 48        .byte $48   ; <H>
- D 2 - - - 0x03CDA6 0F:CD96: 03        .byte $03   ; 
- D 2 - - - 0x03CDA7 0F:CD97: 54        .byte $54   ; <T>
- D 2 - - - 0x03CDA8 0F:CD98: 03        .byte $03   ; 
- D 2 - - - 0x03CDA9 0F:CD99: 60        .byte $60   ; 
- D 2 - - - 0x03CDAA 0F:CD9A: 03        .byte $03   ; 
- D 2 - - - 0x03CDAB 0F:CD9B: 6C        .byte $6C   ; <l>
- D 2 - - - 0x03CDAC 0F:CD9C: 03        .byte $03   ; 
- D 2 - - - 0x03CDAD 0F:CD9D: 78        .byte $78   ; <x>
- D 2 - - - 0x03CDAE 0F:CD9E: 03        .byte $03   ; 
- D 2 - - - 0x03CDAF 0F:CD9F: 84        .byte $84   ; 
- D 2 - - - 0x03CDB0 0F:CDA0: 03        .byte $03   ; 
- D 2 - - - 0x03CDB1 0F:CDA1: 90        .byte $90   ; 
- D 2 - - - 0x03CDB2 0F:CDA2: 03        .byte $03   ; 
- D 2 - - - 0x03CDB3 0F:CDA3: 9C        .byte $9C   ; 
- D 2 - - - 0x03CDB4 0F:CDA4: 03        .byte $03   ; 
- D 2 - - - 0x03CDB5 0F:CDA5: A8        .byte $A8   ; 
- D 2 - - - 0x03CDB6 0F:CDA6: 03        .byte $03   ; 
- D 2 - - - 0x03CDB7 0F:CDA7: B4        .byte $B4   ; 
- D 2 - - - 0x03CDB8 0F:CDA8: 03        .byte $03   ; 
- D 2 - - - 0x03CDB9 0F:CDA9: C0        .byte $C0   ; 
- D 2 - - - 0x03CDBA 0F:CDAA: 03        .byte $03   ; 
- D 2 - - - 0x03CDBB 0F:CDAB: CC        .byte $CC   ; 
- D 2 - - - 0x03CDBC 0F:CDAC: 03        .byte $03   ; 
- D 2 - - - 0x03CDBD 0F:CDAD: D8        .byte $D8   ; 
- D 2 - - - 0x03CDBE 0F:CDAE: 03        .byte $03   ; 
- D 2 - - - 0x03CDBF 0F:CDAF: E4        .byte $E4   ; 
- D 2 - - - 0x03CDC0 0F:CDB0: 03        .byte $03   ; 
- D 2 - - - 0x03CDC1 0F:CDB1: F0        .byte $F0   ; 
- D 2 - - - 0x03CDC2 0F:CDB2: 03        .byte $03   ; 
- D 2 - - - 0x03CDC3 0F:CDB3: FC        .byte $FC   ; 
- D 2 - - - 0x03CDC4 0F:CDB4: 03        .byte $03   ; 
- D 2 - - - 0x03CDC5 0F:CDB5: 08        .byte $08   ; 
- D 2 - - - 0x03CDC6 0F:CDB6: 04        .byte $04   ; 
- D 2 - - - 0x03CDC7 0F:CDB7: 0C        .byte $0C   ; 
- D 2 - - - 0x03CDC8 0F:CDB8: 04        .byte $04   ; 
- D 2 - - - 0x03CDC9 0F:CDB9: 10        .byte $10   ; 
- D 2 - - - 0x03CDCA 0F:CDBA: 04        .byte $04   ; 
- D 2 - - - 0x03CDCB 0F:CDBB: 14        .byte $14   ; 
- D 2 - - - 0x03CDCC 0F:CDBC: 04        .byte $04   ; 
- D 2 - - - 0x03CDCD 0F:CDBD: 18        .byte $18   ; 
- D 2 - - - 0x03CDCE 0F:CDBE: 04        .byte $04   ; 
- D 2 - - - 0x03CDCF 0F:CDBF: 1C        .byte $1C   ; 
- D 2 - - - 0x03CDD0 0F:CDC0: 04        .byte $04   ; 
- D 2 - - - 0x03CDD1 0F:CDC1: 20        .byte $20   ; 
- D 2 - - - 0x03CDD2 0F:CDC2: 04        .byte $04   ; 
- D 2 - - - 0x03CDD3 0F:CDC3: 24        .byte $24   ; 
- D 2 - - - 0x03CDD4 0F:CDC4: 04        .byte $04   ; 
- D 2 - - - 0x03CDD5 0F:CDC5: 28        .byte $28   ; 
- D 2 - - - 0x03CDD6 0F:CDC6: 04        .byte $04   ; 
- D 2 - - - 0x03CDD7 0F:CDC7: 2C        .byte $2C   ; 
- D 2 - - - 0x03CDD8 0F:CDC8: 04        .byte $04   ; 
C D 2 - - - 0x03CDD9 0F:CDC9: A2 00     LDX #$00
C - - - - - 0x03CDDB 0F:CDCB: C9 0C     CMP #$0C
C - - - - - 0x03CDDD 0F:CDCD: 90 05     BCC $CDD4
C - - - - - 0x03CDDF 0F:CDCF: E9 0C     SBC #$0C
C - - - - - 0x03CDE1 0F:CDD1: E8        INX
C - - - - - 0x03CDE2 0F:CDD2: D0 F7     BNE $CDCB
C - - - - - 0x03CDE4 0F:CDD4: 0A        ASL
C - - - - - 0x03CDE5 0F:CDD5: 0A        ASL
C - - - - - 0x03CDE6 0F:CDD6: 0A        ASL
C - - - - - 0x03CDE7 0F:CDD7: 69 54     ADC #$54
C - - - - - 0x03CDE9 0F:CDD9: A8        TAY
C - - - - - 0x03CDEA 0F:CDDA: 8A        TXA
C - - - - - 0x03CDEB 0F:CDDB: 0A        ASL
C - - - - - 0x03CDEC 0F:CDDC: 0A        ASL
C - - - - - 0x03CDED 0F:CDDD: 0A        ASL
C - - - - - 0x03CDEE 0F:CDDE: 69 34     ADC #$34
C - - - - - 0x03CDF0 0F:CDE0: AA        TAX
C - - - - - 0x03CDF1 0F:CDE1: 60        RTS
C D 2 - - - 0x03CDF2 0F:CDE2: 8A        TXA
C - - - - - 0x03CDF3 0F:CDE3: 38        SEC
C - - - - - 0x03CDF4 0F:CDE4: E9 30     SBC #$30
C - - - - - 0x03CDF6 0F:CDE6: 90 1D     BCC $CE05
C - - - - - 0x03CDF8 0F:CDE8: C9 A0     CMP #$A0
C - - - - - 0x03CDFA 0F:CDEA: B0 19     BCS $CE05
C - - - - - 0x03CDFC 0F:CDEC: 4A        LSR
C - - - - - 0x03CDFD 0F:CDED: 4A        LSR
C - - - - - 0x03CDFE 0F:CDEE: 4A        LSR
C - - - - - 0x03CDFF 0F:CDEF: AA        TAX
C - - - - - 0x03CE00 0F:CDF0: 98        TYA
C - - - - - 0x03CE01 0F:CDF1: 38        SEC
C - - - - - 0x03CE02 0F:CDF2: E9 50     SBC #$50
C - - - - - 0x03CE04 0F:CDF4: 90 0F     BCC $CE05
C - - - - - 0x03CE06 0F:CDF6: C9 60     CMP #$60
C - - - - - 0x03CE08 0F:CDF8: B0 0B     BCS $CE05
C - - - - - 0x03CE0A 0F:CDFA: 4A        LSR
C - - - - - 0x03CE0B 0F:CDFB: 4A        LSR
C - - - - - 0x03CE0C 0F:CDFC: 4A        LSR
C - - - - - 0x03CE0D 0F:CDFD: CA        DEX
C - - - - - 0x03CE0E 0F:CDFE: 30 07     BMI $CE07
C - - - - - 0x03CE10 0F:CE00: 18        CLC
C - - - - - 0x03CE11 0F:CE01: 69 0C     ADC #$0C
C - - - - - 0x03CE13 0F:CE03: D0 F8     BNE $CDFD
C - - - - - 0x03CE15 0F:CE05: A9 FF     LDA #$FF
C - - - - - 0x03CE17 0F:CE07: 60        RTS
C D 2 - - - 0x03CE18 0F:CE08: A8        TAY
C - - - - - 0x03CE19 0F:CE09: AD 24 00  LDA a: ram_0024
C - - - - - 0x03CE1C 0F:CE0C: 48        PHA
C - - - - - 0x03CE1D 0F:CE0D: AD 25 00  LDA a: ram_0025
C - - - - - 0x03CE20 0F:CE10: 48        PHA
C - - - - - 0x03CE21 0F:CE11: 98        TYA
C - - - - - 0x03CE22 0F:CE12: 48        PHA
C - - - - - 0x03CE23 0F:CE13: A5 22     LDA ram_0022
C - - - - - 0x03CE25 0F:CE15: A9 1C     LDA #$1C
C - - - - - 0x03CE27 0F:CE17: 85 24     STA ram_0024
C - - - - - 0x03CE29 0F:CE19: A9 1D     LDA #$1D
C - - - - - 0x03CE2B 0F:CE1B: 85 25     STA ram_0025
C - - - - - 0x03CE2D 0F:CE1D: 20 2D CE  JSR $CE2D
C - - - - - 0x03CE30 0F:CE20: 68        PLA
C - - - - - 0x03CE31 0F:CE21: 20 00 80  JSR $8000
C - - - - - 0x03CE34 0F:CE24: 68        PLA
C - - - - - 0x03CE35 0F:CE25: 85 25     STA ram_0025
C - - - - - 0x03CE37 0F:CE27: 68        PLA
C - - - - - 0x03CE38 0F:CE28: 85 24     STA ram_0024
C - - - - - 0x03CE3A 0F:CE2A: 4C 2D CE  JMP $CE2D
C D 2 - - - 0x03CE3D 0F:CE2D: A5 22     LDA ram_0022
C - - - - - 0x03CE3F 0F:CE2F: 09 06     ORA #$06
C - - - - - 0x03CE41 0F:CE31: 85 23     STA ram_0023
C - - - - - 0x03CE43 0F:CE33: 8D 00 80  STA $8000
C - - - - - 0x03CE46 0F:CE36: A5 24     LDA ram_0024
C - - - - - 0x03CE48 0F:CE38: 8D 01 80  STA $8001
C - - - - - 0x03CE4B 0F:CE3B: A5 22     LDA ram_0022
C - - - - - 0x03CE4D 0F:CE3D: 09 07     ORA #$07
C - - - - - 0x03CE4F 0F:CE3F: 85 23     STA ram_0023
C - - - - - 0x03CE51 0F:CE41: 8D 00 80  STA $8000
C - - - - - 0x03CE54 0F:CE44: A5 25     LDA ram_0025
C - - - - - 0x03CE56 0F:CE46: 8D 01 80  STA $8001
C - - - - - 0x03CE59 0F:CE49: 60        RTS
C D 2 - - - 0x03CE5A 0F:CE4A: 18        CLC
C - - - - - 0x03CE5B 0F:CE4B: 69 40     ADC #$40
C D 2 - - - 0x03CE5D 0F:CE4D: 0A        ASL
C - - - - - 0x03CE5E 0F:CE4E: 08        PHP
C - - - - - 0x03CE5F 0F:CE4F: 10 02     BPL $CE53
C - - - - - 0x03CE61 0F:CE51: 49 FF     EOR #$FF
C - - - - - 0x03CE63 0F:CE53: 29 7E     AND #$7E
C - - - - - 0x03CE65 0F:CE55: AA        TAX
C - - - - - 0x03CE66 0F:CE56: BD 4D FB  LDA $FB4D,X
C - - - - - 0x03CE69 0F:CE59: A8        TAY
C - - - - - 0x03CE6A 0F:CE5A: BD 4C FB  LDA $FB4C,X
C - - - - - 0x03CE6D 0F:CE5D: AA        TAX
C - - - - - 0x03CE6E 0F:CE5E: 28        PLP
C - - - - - 0x03CE6F 0F:CE5F: 90 0C     BCC $CE6D
C - - - - - 0x03CE71 0F:CE61: 8A        TXA
C - - - - - 0x03CE72 0F:CE62: 49 FF     EOR #$FF
C - - - - - 0x03CE74 0F:CE64: AA        TAX
C - - - - - 0x03CE75 0F:CE65: 98        TYA
C - - - - - 0x03CE76 0F:CE66: 49 FF     EOR #$FF
C - - - - - 0x03CE78 0F:CE68: A8        TAY
C - - - - - 0x03CE79 0F:CE69: E8        INX
C - - - - - 0x03CE7A 0F:CE6A: D0 01     BNE $CE6D
C - - - - - 0x03CE7C 0F:CE6C: C8        INY
C - - - - - 0x03CE7D 0F:CE6D: 60        RTS
C D 2 - - - 0x03CE7E 0F:CE6E: 85 36     STA ram_0036
C - - - - - 0x03CE80 0F:CE70: 0A        ASL
C - - - - - 0x03CE81 0F:CE71: 65 36     ADC ram_0036
C - - - - - 0x03CE83 0F:CE73: 85 36     STA ram_0036
C - - - - - 0x03CE85 0F:CE75: A9 80     LDA #$80
C - - - - - 0x03CE87 0F:CE77: 85 37     STA ram_0037
C - - - - - 0x03CE89 0F:CE79: A5 24     LDA ram_0024
C - - - - - 0x03CE8B 0F:CE7B: 48        PHA
C - - - - - 0x03CE8C 0F:CE7C: A5 25     LDA ram_0025
C - - - - - 0x03CE8E 0F:CE7E: 48        PHA
C - - - - - 0x03CE8F 0F:CE7F: A9 1C     LDA #$1C
C - - - - - 0x03CE91 0F:CE81: 85 24     STA ram_0024
C - - - - - 0x03CE93 0F:CE83: A9 1D     LDA #$1D
C - - - - - 0x03CE95 0F:CE85: 85 25     STA ram_0025
C D 2 - - - 0x03CE97 0F:CE87: 20 2D CE  JSR $CE2D
C - - - - - 0x03CE9A 0F:CE8A: 20 96 CE  JSR $CE96
C - - - - - 0x03CE9D 0F:CE8D: 68        PLA
C - - - - - 0x03CE9E 0F:CE8E: 85 25     STA ram_0025
C - - - - - 0x03CEA0 0F:CE90: 68        PLA
C - - - - - 0x03CEA1 0F:CE91: 85 24     STA ram_0024
C - - - - - 0x03CEA3 0F:CE93: 4C 2D CE  JMP $CE2D
C - - - - - 0x03CEA6 0F:CE96: 6C 36 00  JMP (ram_0036)
C D 2 - - - 0x03CEA9 0F:CE99: 85 46     STA ram_0046
C - - - - - 0x03CEAB 0F:CE9B: E6 46     INC ram_0046
C - - - - - 0x03CEAD 0F:CE9D: A9 08     LDA #$08
C - - - - - 0x03CEAF 0F:CE9F: 85 47     STA ram_0047
C D 2 - - - 0x03CEB1 0F:CEA1: A5 46     LDA ram_0046
C - - - - - 0x03CEB3 0F:CEA3: 85 48     STA ram_0048
C - - - - - 0x03CEB5 0F:CEA5: A9 0A     LDA #$0A
C - - - - - 0x03CEB7 0F:CEA7: 85 49     STA ram_0049
C - - - - - 0x03CEB9 0F:CEA9: A5 48     LDA ram_0048
C - - - - - 0x03CEBB 0F:CEAB: CD 41 04  CMP ram_0441
C - - - - - 0x03CEBE 0F:CEAE: F0 13     BEQ $CEC3
C - - - - - 0x03CEC0 0F:CEB0: CD 42 04  CMP ram_0442
C - - - - - 0x03CEC3 0F:CEB3: F0 0E     BEQ $CEC3
C - - - - - 0x03CEC5 0F:CEB5: 20 7C CD  JSR $CD7C
C - - - - - 0x03CEC8 0F:CEB8: A0 0A     LDY #$0A
C - - - - - 0x03CECA 0F:CEBA: B1 34     LDA (ram_0034),Y
C - - - - - 0x03CECC 0F:CEBC: D0 05     BNE $CEC3
C - - - - - 0x03CECE 0F:CEBE: 20 D6 CE  JSR $CED6
C - - - - - 0x03CED1 0F:CEC1: B0 10     BCS $CED3
C - - - - - 0x03CED3 0F:CEC3: E6 48     INC ram_0048
C - - - - - 0x03CED5 0F:CEC5: C6 49     DEC ram_0049
C - - - - - 0x03CED7 0F:CEC7: D0 E0     BNE $CEA9
C - - - - - 0x03CED9 0F:CEC9: A5 47     LDA ram_0047
C - - - - - 0x03CEDB 0F:CECB: 18        CLC
C - - - - - 0x03CEDC 0F:CECC: 69 08     ADC #$08
C - - - - - 0x03CEDE 0F:CECE: 85 47     STA ram_0047
C - - - - - 0x03CEE0 0F:CED0: 4C A1 CE  JMP $CEA1
C - - - - - 0x03CEE3 0F:CED3: A5 48     LDA ram_0048
C - - - - - 0x03CEE5 0F:CED5: 60        RTS
C - - - - - 0x03CEE6 0F:CED6: A0 06     LDY #$06
C - - - - - 0x03CEE8 0F:CED8: B1 34     LDA (ram_0034),Y
C - - - - - 0x03CEEA 0F:CEDA: 38        SEC
C - - - - - 0x03CEEB 0F:CEDB: ED 35 06  SBC ram_0635
C - - - - - 0x03CEEE 0F:CEDE: B0 04     BCS $CEE4
C - - - - - 0x03CEF0 0F:CEE0: 49 FF     EOR #$FF
C - - - - - 0x03CEF2 0F:CEE2: 69 01     ADC #$01
C - - - - - 0x03CEF4 0F:CEE4: C5 47     CMP ram_0047
C - - - - - 0x03CEF6 0F:CEE6: B0 14     BCS $CEFC
C - - - - - 0x03CEF8 0F:CEE8: A0 08     LDY #$08
C - - - - - 0x03CEFA 0F:CEEA: B1 34     LDA (ram_0034),Y
C - - - - - 0x03CEFC 0F:CEEC: 38        SEC
C - - - - - 0x03CEFD 0F:CEED: ED 37 06  SBC ram_0637
C - - - - - 0x03CF00 0F:CEF0: B0 04     BCS $CEF6
C - - - - - 0x03CF02 0F:CEF2: 49 FF     EOR #$FF
C - - - - - 0x03CF04 0F:CEF4: 69 01     ADC #$01
C - - - - - 0x03CF06 0F:CEF6: C5 47     CMP ram_0047
C - - - - - 0x03CF08 0F:CEF8: B0 02     BCS $CEFC
C - - - - - 0x03CF0A 0F:CEFA: 38        SEC
C - - - - - 0x03CF0B 0F:CEFB: 60        RTS
C - - - - - 0x03CF0C 0F:CEFC: 18        CLC
C - - - - - 0x03CF0D 0F:CEFD: 60        RTS
C D 2 - - - 0x03CF0E 0F:CEFE: 48        PHA
C - - - - - 0x03CF0F 0F:CEFF: A9 00     LDA #$00
C - - - - - 0x03CF11 0F:CF01: 8D 69 04  STA ram_0469
C - - - - - 0x03CF14 0F:CF04: A9 00     LDA #$00
C - - - - - 0x03CF16 0F:CF06: 8D 69 04  STA ram_0469
C - - - - - 0x03CF19 0F:CF09: 8D 00 E0  STA $E000
C - - - - - 0x03CF1C 0F:CF0C: 20 8B CB  JSR $CB8B
C - - - - - 0x03CF1F 0F:CF0F: 20 35 CB  JSR $CB35
C - - - - - 0x03CF22 0F:CF12: A5 20     LDA ram_0020
C - - - - - 0x03CF24 0F:CF14: 29 7F     AND #$7F
C - - - - - 0x03CF26 0F:CF16: 8D 00 20  STA $2000
C - - - - - 0x03CF29 0F:CF19: 85 20     STA ram_0020
C - - - - - 0x03CF2B 0F:CF1B: 68        PLA
C - - - - - 0x03CF2C 0F:CF1C: 4C 00 C4  JMP $C400
C - - - - - 0x03CF2F 0F:CF1F: A9 68     LDA #$68
C - - - - - 0x03CF31 0F:CF21: 85 3A     STA ram_003A
C - - - - - 0x03CF33 0F:CF23: A9 04     LDA #$04
C - - - - - 0x03CF35 0F:CF25: 85 3B     STA ram_003B
C - - - - - 0x03CF37 0F:CF27: A9 97     LDA #$97
C - - - - - 0x03CF39 0F:CF29: 85 3C     STA ram_003C
C - - - - - 0x03CF3B 0F:CF2B: A9 02     LDA #$02
C - - - - - 0x03CF3D 0F:CF2D: 85 3D     STA ram_003D
C - - - - - 0x03CF3F 0F:CF2F: A9 00     LDA #$00
C - - - - - 0x03CF41 0F:CF31: A8        TAY
C - - - - - 0x03CF42 0F:CF32: 91 3A     STA (ram_003A),Y
C - - - - - 0x03CF44 0F:CF34: C8        INY
C - - - - - 0x03CF45 0F:CF35: D0 FB     BNE $CF32
C - - - - - 0x03CF47 0F:CF37: E6 3B     INC ram_003B
C - - - - - 0x03CF49 0F:CF39: C6 3D     DEC ram_003D
C - - - - - 0x03CF4B 0F:CF3B: D0 F5     BNE $CF32
C - - - - - 0x03CF4D 0F:CF3D: 91 3A     STA (ram_003A),Y
C - - - - - 0x03CF4F 0F:CF3F: C8        INY
C - - - - - 0x03CF50 0F:CF40: C6 3C     DEC ram_003C
C - - - - - 0x03CF52 0F:CF42: D0 F9     BNE $CF3D
C - - - - - 0x03CF54 0F:CF44: A2 A5     LDX #$A5
C - - - - - 0x03CF56 0F:CF46: A9 00     LDA #$00
C - - - - - 0x03CF58 0F:CF48: 9D 3A 00  STA a: ram_003A,X
C - - - - - 0x03CF5B 0F:CF4B: CA        DEX
C - - - - - 0x03CF5C 0F:CF4C: D0 FA     BNE $CF48
C - - - - - 0x03CF5E 0F:CF4E: 60        RTS
C D 2 - - - 0x03CF5F 0F:CF4F: A9 00     LDA #$00
C - - - - - 0x03CF61 0F:CF51: 48        PHA
C - - - - - 0x03CF62 0F:CF52: 20 7C CD  JSR $CD7C
C - - - - - 0x03CF65 0F:CF55: A0 0A     LDY #$0A
C - - - - - 0x03CF67 0F:CF57: A9 00     LDA #$00
C - - - - - 0x03CF69 0F:CF59: 91 34     STA (ram_0034),Y
C - - - - - 0x03CF6B 0F:CF5B: 68        PLA
C - - - - - 0x03CF6C 0F:CF5C: 48        PHA
C - - - - - 0x03CF6D 0F:CF5D: F0 04     BEQ $CF63
C - - - - - 0x03CF6F 0F:CF5F: C9 0B     CMP #$0B
C - - - - - 0x03CF71 0F:CF61: D0 06     BNE $CF69
C - - - - - 0x03CF73 0F:CF63: A0 07     LDY #$07
C - - - - - 0x03CF75 0F:CF65: A9 00     LDA #$00
C - - - - - 0x03CF77 0F:CF67: 91 34     STA (ram_0034),Y
C - - - - - 0x03CF79 0F:CF69: 68        PLA
C - - - - - 0x03CF7A 0F:CF6A: 18        CLC
C - - - - - 0x03CF7B 0F:CF6B: 69 01     ADC #$01
C - - - - - 0x03CF7D 0F:CF6D: C9 16     CMP #$16
C - - - - - 0x03CF7F 0F:CF6F: D0 E0     BNE $CF51
C - - - - - 0x03CF81 0F:CF71: 60        RTS
C D 2 - - - 0x03CF82 0F:CF72: 48        PHA
C - - - - - 0x03CF83 0F:CF73: A5 22     LDA ram_0022
C - - - - - 0x03CF85 0F:CF75: A9 1A     LDA #$1A
C - - - - - 0x03CF87 0F:CF77: 85 24     STA ram_0024
C - - - - - 0x03CF89 0F:CF79: A9 1B     LDA #$1B
C - - - - - 0x03CF8B 0F:CF7B: 85 25     STA ram_0025
C - - - - - 0x03CF8D 0F:CF7D: 20 2D CE  JSR $CE2D
C - - - - - 0x03CF90 0F:CF80: 68        PLA
C - - - - - 0x03CF91 0F:CF81: 20 2A 80  JSR $802A
C - - - - - 0x03CF94 0F:CF84: A9 18     LDA #$18
C - - - - - 0x03CF96 0F:CF86: 85 24     STA ram_0024
C - - - - - 0x03CF98 0F:CF88: A9 19     LDA #$19
C - - - - - 0x03CF9A 0F:CF8A: 85 25     STA ram_0025
C - - - - - 0x03CF9C 0F:CF8C: 4C 2D CE  JMP $CE2D
C D 2 - - - 0x03CF9F 0F:CF8F: 8D 23 06  STA ram_0623
C - - - - - 0x03CFA2 0F:CF92: AA        TAX
C - - - - - 0x03CFA3 0F:CF93: BD 02 D0  LDA $D002,X
C - - - - - 0x03CFA6 0F:CF96: 8D FF 02  STA ram_02FF
C - - - - - 0x03CFA9 0F:CF99: BD 1A D0  LDA $D01A,X
C - - - - - 0x03CFAC 0F:CF9C: 8D FD 02  STA ram_02FD
C - - - - - 0x03CFAF 0F:CF9F: A9 03     LDA #$03
C - - - - - 0x03CFB1 0F:CFA1: 8D FE 02  STA ram_02FE
C - - - - - 0x03CFB4 0F:CFA4: A9 01     LDA #$01
C - - - - - 0x03CFB6 0F:CFA6: 20 0F CB  JSR $CB0F
C - - - - - 0x03CFB9 0F:CFA9: AD 22 06  LDA ram_0622
C - - - - - 0x03CFBC 0F:CFAC: 0A        ASL
C - - - - - 0x03CFBD 0F:CFAD: 0A        ASL
C - - - - - 0x03CFBE 0F:CFAE: 0A        ASL
C - - - - - 0x03CFBF 0F:CFAF: 0A        ASL
C - - - - - 0x03CFC0 0F:CFB0: AE 23 06  LDX ram_0623
C - - - - - 0x03CFC3 0F:CFB3: 18        CLC
C - - - - - 0x03CFC4 0F:CFB4: 7D 0A D0  ADC $D00A,X
C - - - - - 0x03CFC7 0F:CFB7: 8D FC 02  STA ram_02FC
C - - - - - 0x03CFCA 0F:CFBA: A9 0C     LDA #$0C
C - - - - - 0x03CFCC 0F:CFBC: 2D 1E 00  AND a: ram_001E
C - - - - - 0x03CFCF 0F:CFBF: F0 26     BEQ $CFE7
C - - - - - 0x03CFD1 0F:CFC1: A2 01     LDX #$01
C - - - - - 0x03CFD3 0F:CFC3: 29 08     AND #$08
C - - - - - 0x03CFD5 0F:CFC5: F0 02     BEQ $CFC9
C - - - - - 0x03CFD7 0F:CFC7: A2 FF     LDX #$FF
C - - - - - 0x03CFD9 0F:CFC9: 8A        TXA
C - - - - - 0x03CFDA 0F:CFCA: 18        CLC
C - - - - - 0x03CFDB 0F:CFCB: 6D 22 06  ADC ram_0622
C - - - - - 0x03CFDE 0F:CFCE: 30 17     BMI $CFE7
C - - - - - 0x03CFE0 0F:CFD0: AE 23 06  LDX ram_0623
C - - - - - 0x03CFE3 0F:CFD3: DD 12 D0  CMP $D012,X
C - - - - - 0x03CFE6 0F:CFD6: F0 02     BEQ $CFDA
C - - - - - 0x03CFE8 0F:CFD8: B0 0D     BCS $CFE7
C - - - - - 0x03CFEA 0F:CFDA: 8D 22 06  STA ram_0622
C - - - - - 0x03CFED 0F:CFDD: AE 23 06  LDX ram_0623
C - - - - - 0x03CFF0 0F:CFE0: E0 05     CPX #$05
C - - - - - 0x03CFF2 0F:CFE2: D0 03     BNE $CFE7
C - - - - - 0x03CFF4 0F:CFE4: 8D 2C 00  STA a: ram_002C
C - - - - - 0x03CFF7 0F:CFE7: A9 80     LDA #$80
C - - - - - 0x03CFF9 0F:CFE9: 2D 1E 00  AND a: ram_001E
C - - - - - 0x03CFFC 0F:CFEC: D0 0A     BNE $CFF8
C - - - - - 0x03CFFE 0F:CFEE: A9 40     LDA #$40
C - - - - - 0x03D000 0F:CFF0: 2D 1E 00  AND a: ram_001E
C - - - - - 0x03D003 0F:CFF3: F0 AF     BEQ $CFA4
C - - - - - 0x03D005 0F:CFF5: 18        CLC
C - - - - - 0x03D006 0F:CFF6: 90 04     BCC $CFFC
C - - - - - 0x03D008 0F:CFF8: 38        SEC
C - - - - - 0x03D009 0F:CFF9: AD 22 06  LDA ram_0622
C - - - - - 0x03D00C 0F:CFFC: A2 F8     LDX #$F8
C - - - - - 0x03D00E 0F:CFFE: 8E FC 02  STX ram_02FC
C - - - - - 0x03D011 0F:D001: 60        RTS
- - - - - - 0x03D012 0F:D002: 48        .byte $48   ; <H>
- D 2 - - - 0x03D013 0F:D003: 48        .byte $48   ; <H>
- D 2 - - - 0x03D014 0F:D004: 48        .byte $48   ; <H>
- D 2 - - - 0x03D015 0F:D005: 48        .byte $48   ; <H>
- D 2 - - - 0x03D016 0F:D006: 40        .byte $40   ; 
- D 2 - - - 0x03D017 0F:D007: 48        .byte $48   ; <H>
- D 2 - - - 0x03D018 0F:D008: 48        .byte $48   ; <H>
- D 2 - - - 0x03D019 0F:D009: 48        .byte $48   ; <H>
- - - - - - 0x03D01A 0F:D00A: 9A        .byte $9A   ; 
- D 2 - - - 0x03D01B 0F:D00B: 9A        .byte $9A   ; 
- D 2 - - - 0x03D01C 0F:D00C: 9A        .byte $9A   ; 
- D 2 - - - 0x03D01D 0F:D00D: 9A        .byte $9A   ; 
- D 2 - - - 0x03D01E 0F:D00E: 92        .byte $92   ; 
- D 2 - - - 0x03D01F 0F:D00F: A2        .byte $A2   ; 
- D 2 - - - 0x03D020 0F:D010: B2        .byte $B2   ; 
- D 2 - - - 0x03D021 0F:D011: C2        .byte $C2   ; 
- - - - - - 0x03D022 0F:D012: 00        .byte $00   ; 
- D 2 - - - 0x03D023 0F:D013: 01        .byte $01   ; 
- D 2 - - - 0x03D024 0F:D014: 02        .byte $02   ; 
- D 2 - - - 0x03D025 0F:D015: 03        .byte $03   ; 
- D 2 - - - 0x03D026 0F:D016: 04        .byte $04   ; 
- D 2 - - - 0x03D027 0F:D017: 03        .byte $03   ; 
- D 2 - - - 0x03D028 0F:D018: 02        .byte $02   ; 
- D 2 - - - 0x03D029 0F:D019: 01        .byte $01   ; 
- - - - - - 0x03D02A 0F:D01A: 11        .byte $11   ; 
- D 2 - - - 0x03D02B 0F:D01B: 11        .byte $11   ; 
- D 2 - - - 0x03D02C 0F:D01C: 11        .byte $11   ; 
- D 2 - - - 0x03D02D 0F:D01D: 11        .byte $11   ; 
- D 2 - - - 0x03D02E 0F:D01E: 71        .byte $71   ; <q>
- D 2 - - - 0x03D02F 0F:D01F: 71        .byte $71   ; <q>
- D 2 - - - 0x03D030 0F:D020: 71        .byte $71   ; <q>
- D 2 - - - 0x03D031 0F:D021: 71        .byte $71   ; <q>
C D 2 - - - 0x03D032 0F:D022: AD 27 00  LDA a: ram_0027
C - - - - - 0x03D035 0F:D025: C9 01     CMP #$01
C - - - - - 0x03D037 0F:D027: F0 07     BEQ $D030
C - - - - - 0x03D039 0F:D029: C9 02     CMP #$02
C - - - - - 0x03D03B 0F:D02B: F0 03     BEQ $D030
- - - - - - 0x03D03D 0F:D02D: 4C        .byte $4C   ; <L>
- - - - - - 0x03D03E 0F:D02E: 92        .byte $92   ; 
- - - - - - 0x03D03F 0F:D02F: D0        .byte $D0   ; 
C - - - - - 0x03D040 0F:D030: A9 00     LDA #$00
C - - - - - 0x03D042 0F:D032: 48        PHA
C - - - - - 0x03D043 0F:D033: A2 00     LDX #$00
C - - - - - 0x03D045 0F:D035: 20 08 CE  JSR $CE08
C - - - - - 0x03D048 0F:D038: A5 33     LDA ram_0033
C - - - - - 0x03D04A 0F:D03A: 85 37     STA ram_0037
C - - - - - 0x03D04C 0F:D03C: A5 32     LDA ram_0032
C - - - - - 0x03D04E 0F:D03E: 85 36     STA ram_0036
C - - - - - 0x03D050 0F:D040: A0 00     LDY #$00
C - - - - - 0x03D052 0F:D042: B1 34     LDA (ram_0034),Y
C - - - - - 0x03D054 0F:D044: C9 20     CMP #$20
C - - - - - 0x03D056 0F:D046: D0 0C     BNE $D054
C - - - - - 0x03D058 0F:D048: A2 04     LDX #$04
C - - - - - 0x03D05A 0F:D04A: AD 27 00  LDA a: ram_0027
C - - - - - 0x03D05D 0F:D04D: C9 01     CMP #$01
C - - - - - 0x03D05F 0F:D04F: F0 0D     BEQ $D05E
C - - - - - 0x03D061 0F:D051: CA        DEX
C - - - - - 0x03D062 0F:D052: D0 0A     BNE $D05E
C - - - - - 0x03D064 0F:D054: A2 03     LDX #$03
C - - - - - 0x03D066 0F:D056: AD 27 00  LDA a: ram_0027
C - - - - - 0x03D069 0F:D059: C9 01     CMP #$01
C - - - - - 0x03D06B 0F:D05B: F0 01     BEQ $D05E
C - - - - - 0x03D06D 0F:D05D: CA        DEX
C - - - - - 0x03D06E 0F:D05E: 46 33     LSR ram_0033
C - - - - - 0x03D070 0F:D060: 66 32     ROR ram_0032
C - - - - - 0x03D072 0F:D062: CA        DEX
C - - - - - 0x03D073 0F:D063: D0 F9     BNE $D05E
C - - - - - 0x03D075 0F:D065: A0 01     LDY #$01
C - - - - - 0x03D077 0F:D067: B1 34     LDA (ram_0034),Y
C - - - - - 0x03D079 0F:D069: 18        CLC
C - - - - - 0x03D07A 0F:D06A: 65 32     ADC ram_0032
C - - - - - 0x03D07C 0F:D06C: AA        TAX
C - - - - - 0x03D07D 0F:D06D: C8        INY
C - - - - - 0x03D07E 0F:D06E: B1 34     LDA (ram_0034),Y
C - - - - - 0x03D080 0F:D070: 65 33     ADC ram_0033
C - - - - - 0x03D082 0F:D072: C5 37     CMP ram_0037
C - - - - - 0x03D084 0F:D074: 08        PHP
C - - - - - 0x03D085 0F:D075: 90 02     BCC $D079
C - - - - - 0x03D087 0F:D077: A5 37     LDA ram_0037
C - - - - - 0x03D089 0F:D079: 91 34     STA (ram_0034),Y
C - - - - - 0x03D08B 0F:D07B: 8A        TXA
C - - - - - 0x03D08C 0F:D07C: 28        PLP
C - - - - - 0x03D08D 0F:D07D: 90 08     BCC $D087
C - - - - - 0x03D08F 0F:D07F: D0 04     BNE $D085
C - - - - - 0x03D091 0F:D081: C5 36     CMP ram_0036
C - - - - - 0x03D093 0F:D083: 90 02     BCC $D087
C - - - - - 0x03D095 0F:D085: A5 36     LDA ram_0036
C - - - - - 0x03D097 0F:D087: 88        DEY
C - - - - - 0x03D098 0F:D088: 91 34     STA (ram_0034),Y
C - - - - - 0x03D09A 0F:D08A: 68        PLA
C - - - - - 0x03D09B 0F:D08B: 18        CLC
C - - - - - 0x03D09C 0F:D08C: 69 01     ADC #$01
C - - - - - 0x03D09E 0F:D08E: C9 0B     CMP #$0B
C - - - - - 0x03D0A0 0F:D090: D0 A0     BNE $D032
C - - - - - 0x03D0A2 0F:D092: 60        RTS
C D 2 - - - 0x03D0A3 0F:D093: A9 32     LDA #$32
C - - - - - 0x03D0A5 0F:D095: 2C 3E 06  BIT ram_063E
C - - - - - 0x03D0A8 0F:D098: 30 0E     BMI $D0A8
C - - - - - 0x03D0AA 0F:D09A: AE FB 05  LDX ram_05FB
C - - - - - 0x03D0AD 0F:D09D: F0 02     BEQ $D0A1
C - - - - - 0x03D0AF 0F:D09F: A2 01     LDX #$01
C - - - - - 0x03D0B1 0F:D0A1: BD 2A 00  LDA a: ram_002A,X
C - - - - - 0x03D0B4 0F:D0A4: AA        TAX
C - - - - - 0x03D0B5 0F:D0A5: BD AC D0  LDA $D0AC,X
C - - - - - 0x03D0B8 0F:D0A8: 20 F1 CB  JSR $CBF1
C - - - - - 0x03D0BB 0F:D0AB: 60        RTS
- D 2 - - - 0x03D0BC 0F:D0AC: 3C        .byte $3C   ; 
- D 2 - - - 0x03D0BD 0F:D0AD: 39        .byte $39   ; <9>
- D 2 - - - 0x03D0BE 0F:D0AE: 3F        .byte $3F   ; 
- D 2 - - - 0x03D0BF 0F:D0AF: 35        .byte $35   ; <5>
- D 2 - - - 0x03D0C0 0F:D0B0: 35        .byte $35   ; <5>
- D 2 - - - 0x03D0C1 0F:D0B1: 35        .byte $35   ; <5>
- D 2 - - - 0x03D0C2 0F:D0B2: 35        .byte $35   ; <5>
- D 2 - - - 0x03D0C3 0F:D0B3: 35        .byte $35   ; <5>
- D 2 - - - 0x03D0C4 0F:D0B4: 40        .byte $40   ; 
- D 2 - - - 0x03D0C5 0F:D0B5: 34        .byte $34   ; <4>
- D 2 - - - 0x03D0C6 0F:D0B6: 34        .byte $34   ; <4>
- D 2 - - - 0x03D0C7 0F:D0B7: 34        .byte $34   ; <4>
- D 2 - - - 0x03D0C8 0F:D0B8: 34        .byte $34   ; <4>
- D 2 - - - 0x03D0C9 0F:D0B9: 34        .byte $34   ; <4>
- D 2 - - - 0x03D0CA 0F:D0BA: 37        .byte $37   ; <7>
- D 2 - - - 0x03D0CB 0F:D0BB: 3B        .byte $3B   ; 
- D 2 - - - 0x03D0CC 0F:D0BC: 3B        .byte $3B   ; 
- D 2 - - - 0x03D0CD 0F:D0BD: 3B        .byte $3B   ; 
- D 2 - - - 0x03D0CE 0F:D0BE: 3B        .byte $3B   ; 
- D 2 - - - 0x03D0CF 0F:D0BF: 3A        .byte $3A   ; 
- D 2 - - - 0x03D0D0 0F:D0C0: 3A        .byte $3A   ; 
- D 2 - - - 0x03D0D1 0F:D0C1: 3A        .byte $3A   ; 
- D 2 - - - 0x03D0D2 0F:D0C2: 3A        .byte $3A   ; 
- D 2 - - - 0x03D0D3 0F:D0C3: 3A        .byte $3A   ; 
- D 2 - - - 0x03D0D4 0F:D0C4: 3A        .byte $3A   ; 
- D 2 - - - 0x03D0D5 0F:D0C5: 36        .byte $36   ; <6>
- D 2 - - - 0x03D0D6 0F:D0C6: 36        .byte $36   ; <6>
- D 2 - - - 0x03D0D7 0F:D0C7: 36        .byte $36   ; <6>
- D 2 - - - 0x03D0D8 0F:D0C8: 36        .byte $36   ; <6>
- D 2 - - - 0x03D0D9 0F:D0C9: 36        .byte $36   ; <6>
- D 2 - - - 0x03D0DA 0F:D0CA: 3D        .byte $3D   ; 
- D 2 - - - 0x03D0DB 0F:D0CB: 3D        .byte $3D   ; 
- D 2 - - - 0x03D0DC 0F:D0CC: 3D        .byte $3D   ; 
- D 2 - - - 0x03D0DD 0F:D0CD: 3D        .byte $3D   ; 
- D 2 - - - 0x03D0DE 0F:D0CE: 38        .byte $38   ; <8>
- D 2 - - - 0x03D0DF 0F:D0CF: 3E        .byte $3E   ; 
- - - - - - 0x03D0E0 0F:D0D0: 3E        .byte $3E   ; 
C D 2 - - - 0x03D0E1 0F:D0D1: AD 2A 00  LDA a: ram_002A
C - - - - - 0x03D0E4 0F:D0D4: C9 02     CMP #$02
C - - - - - 0x03D0E6 0F:D0D6: D0 37     BNE $D10F
C - - - - - 0x03D0E8 0F:D0D8: A9 00     LDA #$00
C - - - - - 0x03D0EA 0F:D0DA: 48        PHA
C - - - - - 0x03D0EB 0F:D0DB: C9 0B     CMP #$0B
C - - - - - 0x03D0ED 0F:D0DD: 90 02     BCC $D0E1
C - - - - - 0x03D0EF 0F:D0DF: 69 0A     ADC #$0A
C - - - - - 0x03D0F1 0F:D0E1: 20 7C CD  JSR $CD7C
C - - - - - 0x03D0F4 0F:D0E4: A0 00     LDY #$00
C - - - - - 0x03D0F6 0F:D0E6: B1 34     LDA (ram_0034),Y
C - - - - - 0x03D0F8 0F:D0E8: AA        TAX
C - - - - - 0x03D0F9 0F:D0E9: 68        PLA
C - - - - - 0x03D0FA 0F:D0EA: E0 20     CPX #$20
C - - - - - 0x03D0FC 0F:D0EC: F0 08     BEQ $D0F6
C - - - - - 0x03D0FE 0F:D0EE: 18        CLC
C - - - - - 0x03D0FF 0F:D0EF: 69 01     ADC #$01
C - - - - - 0x03D101 0F:D0F1: C9 16     CMP #$16
C - - - - - 0x03D103 0F:D0F3: D0 E5     BNE $D0DA
- - - - - - 0x03D105 0F:D0F5: 60        .byte $60   ; 
C - - - - - 0x03D106 0F:D0F6: A2 00     LDX #$00
C - - - - - 0x03D108 0F:D0F8: AD 4D 04  LDA ram_044D
C - - - - - 0x03D10B 0F:D0FB: D0 0F     BNE $D10C
C - - - - - 0x03D10D 0F:D0FD: A0 01     LDY #$01
C - - - - - 0x03D10F 0F:D0FF: B1 34     LDA (ram_0034),Y
C - - - - - 0x03D111 0F:D101: 38        SEC
C - - - - - 0x03D112 0F:D102: E9 64     SBC #$64
C - - - - - 0x03D114 0F:D104: C8        INY
C - - - - - 0x03D115 0F:D105: B1 34     LDA (ram_0034),Y
C - - - - - 0x03D117 0F:D107: E9 00     SBC #$00
C - - - - - 0x03D119 0F:D109: 10 01     BPL $D10C
C - - - - - 0x03D11B 0F:D10B: E8        INX
C - - - - - 0x03D11C 0F:D10C: 8E 4D 04  STX ram_044D
C - - - - - 0x03D11F 0F:D10F: 60        RTS
C - - - - - 0x03D120 0F:D110: A9 12     LDA #$12
C - - - - - 0x03D122 0F:D112: 85 24     STA ram_0024
C - - - - - 0x03D124 0F:D114: A9 13     LDA #$13
C - - - - - 0x03D126 0F:D116: 85 25     STA ram_0025
C - - - - - 0x03D128 0F:D118: 20 2D CE  JSR $CE2D
C - - - - - 0x03D12B 0F:D11B: 4C 00 B0  JMP $B000
C - - - - - 0x03D12E 0F:D11E: AD 27 00  LDA a: ram_0027
C - - - - - 0x03D131 0F:D121: C9 05     CMP #$05
C - - - - - 0x03D133 0F:D123: D0 03     BNE $D128
C - - - - - 0x03D135 0F:D125: 4C 10 D1  JMP $D110
C - - - - - 0x03D138 0F:D128: A9 00     LDA #$00
C - - - - - 0x03D13A 0F:D12A: 8D 3E 06  STA ram_063E
C - - - - - 0x03D13D 0F:D12D: 8D 40 06  STA ram_0640
C - - - - - 0x03D140 0F:D130: 8D 41 06  STA ram_0641
C - - - - - 0x03D143 0F:D133: 8D 13 06  STA ram_0613
C - - - - - 0x03D146 0F:D136: AD 27 00  LDA a: ram_0027
C - - - - - 0x03D149 0F:D139: C9 04     CMP #$04
C - - - - - 0x03D14B 0F:D13B: D0 12     BNE $D14F
C - - - - - 0x03D14D 0F:D13D: 48        PHA
C - - - - - 0x03D14E 0F:D13E: A5 22     LDA ram_0022
C - - - - - 0x03D150 0F:D140: A9 1A     LDA #$1A
C - - - - - 0x03D152 0F:D142: 85 24     STA ram_0024
C - - - - - 0x03D154 0F:D144: A9 1B     LDA #$1B
C - - - - - 0x03D156 0F:D146: 85 25     STA ram_0025
C - - - - - 0x03D158 0F:D148: 20 2D CE  JSR $CE2D
C - - - - - 0x03D15B 0F:D14B: 68        PLA
C - - - - - 0x03D15C 0F:D14C: 20 30 80  JSR $8030
C - - - - - 0x03D15F 0F:D14F: 8D 29 06  STA ram_0629
C - - - - - 0x03D162 0F:D152: 0A        ASL
C - - - - - 0x03D163 0F:D153: 85 3A     STA ram_003A
C - - - - - 0x03D165 0F:D155: A9 08     LDA #$08
C - - - - - 0x03D167 0F:D157: AE 2B 00  LDX a: ram_002B
C - - - - - 0x03D16A 0F:D15A: E0 0E     CPX #$0E
C - - - - - 0x03D16C 0F:D15C: F0 0A     BEQ $D168
C - - - - - 0x03D16E 0F:D15E: E0 12     CPX #$12
C - - - - - 0x03D170 0F:D160: F0 06     BEQ $D168
C - - - - - 0x03D172 0F:D162: E0 1A     CPX #$1A
C - - - - - 0x03D174 0F:D164: B0 02     BCS $D168
C - - - - - 0x03D176 0F:D166: A9 00     LDA #$00
C - - - - - 0x03D178 0F:D168: 18        CLC
C - - - - - 0x03D179 0F:D169: 65 3A     ADC ram_003A
C - - - - - 0x03D17B 0F:D16B: AA        TAX
C - - - - - 0x03D17C 0F:D16C: BD 83 D1  LDA $D183,X
C - - - - - 0x03D17F 0F:D16F: 8D F7 05  STA ram_05F7
C - - - - - 0x03D182 0F:D172: BD 84 D1  LDA $D184,X
C - - - - - 0x03D185 0F:D175: 8D F8 05  STA ram_05F8
C - - - - - 0x03D188 0F:D178: A9 00     LDA #$00
C - - - - - 0x03D18A 0F:D17A: 8D F9 05  STA ram_05F9
C - - - - - 0x03D18D 0F:D17D: A2 50     LDX #$50
C - - - - - 0x03D18F 0F:D17F: 9A        TXS
C - - - - - 0x03D190 0F:D180: 4C AA DA  JMP $DAAA
- D 2 - - - 0x03D193 0F:D183: B4        .byte $B4   ; 
- D 2 - - - 0x03D194 0F:D184: 00        .byte $00   ; 
- D 2 - - - 0x03D195 0F:D185: B4        .byte $B4   ; 
- D 2 - - - 0x03D196 0F:D186: 00        .byte $00   ; 
- D 2 - - - 0x03D197 0F:D187: 5A        .byte $5A   ; <Z>
- D 2 - - - 0x03D198 0F:D188: 00        .byte $00   ; 
- D 2 - - - 0x03D199 0F:D189: 5A        .byte $5A   ; <Z>
- D 2 - - - 0x03D19A 0F:D18A: 00        .byte $00   ; 
- D 2 - - - 0x03D19B 0F:D18B: D2        .byte $D2   ; 
- D 2 - - - 0x03D19C 0F:D18C: 00        .byte $00   ; 
- D 2 - - - 0x03D19D 0F:D18D: D2        .byte $D2   ; 
- D 2 - - - 0x03D19E 0F:D18E: 00        .byte $00   ; 
- D 2 - - - 0x03D19F 0F:D18F: 5A        .byte $5A   ; <Z>
- D 2 - - - 0x03D1A0 0F:D190: 00        .byte $00   ; 
- D 2 - - - 0x03D1A1 0F:D191: 5A        .byte $5A   ; <Z>
- D 2 - - - 0x03D1A2 0F:D192: 00        .byte $00   ; 
C D 2 - - - 0x03D1A3 0F:D193: AA        TAX
C - - - - - 0x03D1A4 0F:D194: 18        CLC
C - - - - - 0x03D1A5 0F:D195: 6D FF 05  ADC ram_05FF
C - - - - - 0x03D1A8 0F:D198: 8D FF 05  STA ram_05FF
C - - - - - 0x03D1AB 0F:D19B: 8A        TXA
C - - - - - 0x03D1AC 0F:D19C: 48        PHA
C - - - - - 0x03D1AD 0F:D19D: 20 35 D2  JSR $D235
C - - - - - 0x03D1B0 0F:D1A0: 68        PLA
C - - - - - 0x03D1B1 0F:D1A1: AE F8 05  LDX ram_05F8
C - - - - - 0x03D1B4 0F:D1A4: D0 08     BNE $D1AE
C - - - - - 0x03D1B6 0F:D1A6: EC F7 05  CPX ram_05F7
C - - - - - 0x03D1B9 0F:D1A9: D0 03     BNE $D1AE
C - - - - - 0x03D1BB 0F:D1AB: 4C 20 D2  JMP $D220
C - - - - - 0x03D1BE 0F:D1AE: 49 FF     EOR #$FF
C - - - - - 0x03D1C0 0F:D1B0: 18        CLC
C - - - - - 0x03D1C1 0F:D1B1: 69 01     ADC #$01
C - - - - - 0x03D1C3 0F:D1B3: D0 03     BNE $D1B8
C - - - - - 0x03D1C5 0F:D1B5: 4C 1F D2  JMP $D21F
C - - - - - 0x03D1C8 0F:D1B8: 18        CLC
C - - - - - 0x03D1C9 0F:D1B9: 6D F7 05  ADC ram_05F7
C - - - - - 0x03D1CC 0F:D1BC: AA        TAX
C - - - - - 0x03D1CD 0F:D1BD: AD F8 05  LDA ram_05F8
C - - - - - 0x03D1D0 0F:D1C0: 69 FF     ADC #$FF
C - - - - - 0x03D1D2 0F:D1C2: 10 03     BPL $D1C7
C - - - - - 0x03D1D4 0F:D1C4: A9 00     LDA #$00
C - - - - - 0x03D1D6 0F:D1C6: AA        TAX
C - - - - - 0x03D1D7 0F:D1C7: 8D F8 05  STA ram_05F8
C - - - - - 0x03D1DA 0F:D1CA: 8E F7 05  STX ram_05F7
C - - - - - 0x03D1DD 0F:D1CD: A9 00     LDA #$00
C - - - - - 0x03D1DF 0F:D1CF: 20 7F EF  JSR $EF7F
C - - - - - 0x03D1E2 0F:D1D2: 2C 3E 06  BIT ram_063E
C - - - - - 0x03D1E5 0F:D1D5: 30 14     BMI $D1EB
C - - - - - 0x03D1E7 0F:D1D7: AD F7 05  LDA ram_05F7
C - - - - - 0x03D1EA 0F:D1DA: C9 1E     CMP #$1E
C - - - - - 0x03D1EC 0F:D1DC: B0 0D     BCS $D1EB
C - - - - - 0x03D1EE 0F:D1DE: AD 3E 06  LDA ram_063E
C - - - - - 0x03D1F1 0F:D1E1: 09 80     ORA #$80
C - - - - - 0x03D1F3 0F:D1E3: 8D 3E 06  STA ram_063E
C - - - - - 0x03D1F6 0F:D1E6: A9 32     LDA #$32
C - - - - - 0x03D1F8 0F:D1E8: 20 F1 CB  JSR $CBF1
C - - - - - 0x03D1FB 0F:D1EB: AD F8 05  LDA ram_05F8
C - - - - - 0x03D1FE 0F:D1EE: 0D F7 05  ORA ram_05F7
C - - - - - 0x03D201 0F:D1F1: D0 2C     BNE $D21F
C - - - - - 0x03D203 0F:D1F3: A9 00     LDA #$00
C - - - - - 0x03D205 0F:D1F5: 2C E2 00  BIT a: ram_00E2
C - - - - - 0x03D208 0F:D1F8: 10 02     BPL $D1FC
C - - - - - 0x03D20A 0F:D1FA: A9 0C     LDA #$0C
C - - - - - 0x03D20C 0F:D1FC: 18        CLC
C - - - - - 0x03D20D 0F:D1FD: 6D F9 05  ADC ram_05F9
C - - - - - 0x03D210 0F:D200: 8D F9 05  STA ram_05F9
C - - - - - 0x03D213 0F:D203: F0 1A     BEQ $D21F
C - - - - - 0x03D215 0F:D205: A9 00     LDA #$00
C - - - - - 0x03D217 0F:D207: 8D 2D 06  STA ram_062D
C - - - - - 0x03D21A 0F:D20A: AD 15 06  LDA ram_0615
C - - - - - 0x03D21D 0F:D20D: 29 BF     AND #$BF
C - - - - - 0x03D21F 0F:D20F: 8D 15 06  STA ram_0615
C - - - - - 0x03D222 0F:D212: A9 43     LDA #$43
C - - - - - 0x03D224 0F:D214: 20 B0 CB  JSR $CBB0
C - - - - - 0x03D227 0F:D217: 2C 15 06  BIT ram_0615
C - - - - - 0x03D22A 0F:D21A: 10 03     BPL $D21F
C - - - - - 0x03D22C 0F:D21C: 20 33 E2  JSR $E233
C D 2 - - - 0x03D22F 0F:D21F: 60        RTS
C D 2 - - - 0x03D230 0F:D220: 49 FF     EOR #$FF
C - - - - - 0x03D232 0F:D222: 18        CLC
C - - - - - 0x03D233 0F:D223: 69 01     ADC #$01
C - - - - - 0x03D235 0F:D225: 18        CLC
C - - - - - 0x03D236 0F:D226: 6D F9 05  ADC ram_05F9
C - - - - - 0x03D239 0F:D229: 10 06     BPL $D231
C - - - - - 0x03D23B 0F:D22B: A2 50     LDX #$50
C - - - - - 0x03D23D 0F:D22D: 9A        TXS
C - - - - - 0x03D23E 0F:D22E: 4C 98 DA  JMP $DA98
C - - - - - 0x03D241 0F:D231: 8D F9 05  STA ram_05F9
C - - - - - 0x03D244 0F:D234: 60        RTS
C - - - - - 0x03D245 0F:D235: 49 FF     EOR #$FF
C - - - - - 0x03D247 0F:D237: 18        CLC
C - - - - - 0x03D248 0F:D238: 69 01     ADC #$01
C - - - - - 0x03D24A 0F:D23A: AA        TAX
C - - - - - 0x03D24B 0F:D23B: 2C 49 04  BIT ram_0449
C - - - - - 0x03D24E 0F:D23E: 10 0E     BPL $D24E
C - - - - - 0x03D250 0F:D240: 18        CLC
C - - - - - 0x03D251 0F:D241: 6D 4A 04  ADC ram_044A
C - - - - - 0x03D254 0F:D244: 8D 4A 04  STA ram_044A