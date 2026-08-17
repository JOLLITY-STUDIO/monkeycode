; bank_26.asm 分片 2/5 (原文件行 1001-2000, 共 4071 行)

C - - - - - 0x034852 0D:8842: 20 15 C5  JSR $C515
C - - - - - 0x034855 0D:8845: AD 4E 04  LDA ram_044E
C - - - - - 0x034858 0D:8848: 48        PHA
C - - - - - 0x034859 0D:8849: A9 00     LDA #$00
C - - - - - 0x03485B 0D:884B: 8D 4E 04  STA ram_044E
C - - - - - 0x03485E 0D:884E: AE 16 06  LDX ram_0616
C - - - - - 0x034861 0D:8851: BD 01 06  LDA ram_0601,X
C - - - - - 0x034864 0D:8854: 8D 42 04  STA ram_0442
C - - - - - 0x034867 0D:8857: AE 1B 06  LDX ram_061B
C - - - - - 0x03486A 0D:885A: BD 8B 88  LDA $888B,X
C - - - - - 0x03486D 0D:885D: 8D 3D 04  STA ram_043D
C - - - - - 0x034870 0D:8860: A9 00     LDA #$00
C - - - - - 0x034872 0D:8862: 8D 3E 04  STA ram_043E
C - - - - - 0x034875 0D:8865: AD 42 04  LDA ram_0442
C - - - - - 0x034878 0D:8868: A9 07     LDA #$07
C - - - - - 0x03487A 0D:886A: 20 4B C5  JSR $C54B
C - - - - - 0x03487D 0D:886D: 20 8D 88  JSR $888D
C - - - - - 0x034880 0D:8870: 68        PLA
C - - - - - 0x034881 0D:8871: 8D 4E 04  STA ram_044E
C - - - - - 0x034884 0D:8874: 20 A8 88  JSR $88A8
C - - - - - 0x034887 0D:8877: EE 16 06  INC ram_0616
C - - - - - 0x03488A 0D:887A: AD 16 06  LDA ram_0616
C - - - - - 0x03488D 0D:887D: CD 00 06  CMP ram_0600
C - - - - - 0x034890 0D:8880: D0 BE     BNE $8840
C - - - - - 0x034892 0D:8882: A9 00     LDA #$00
C - - - - - 0x034894 0D:8884: 8D 00 06  STA ram_0600
C - - - - - 0x034897 0D:8887: 8D FF 05  STA ram_05FF
C - - - - - 0x03489A 0D:888A: 60        RTS
- D 0 - - - 0x03489B 0D:888B: 00        .byte $00   ; 
- D 0 - - - 0x03489C 0D:888C: 02        .byte $02   ; 
C D 0 - - - 0x03489D 0D:888D: A9 00     LDA #$00
C - - - - - 0x03489F 0D:888F: 85 3A     STA ram_003A
C - - - - - 0x0348A1 0D:8891: AD 3B 04  LDA ram_043B
C - - - - - 0x0348A4 0D:8894: 0A        ASL
C - - - - - 0x0348A5 0D:8895: 0A        ASL
C - - - - - 0x0348A6 0D:8896: 6D 3D 04  ADC ram_043D
C - - - - - 0x0348A9 0D:8899: AA        TAX
C - - - - - 0x0348AA 0D:889A: 0A        ASL
C - - - - - 0x0348AB 0D:889B: 85 3B     STA ram_003B
C - - - - - 0x0348AD 0D:889D: A9 05     LDA #$05
C - - - - - 0x0348AF 0D:889F: BC EB 88  LDY $88EB,X
C - - - - - 0x0348B2 0D:88A2: 20 E9 8E  JSR $8EE9
C - - - - - 0x0348B5 0D:88A5: 4C 32 81  JMP $8132
C D 0 - - - 0x0348B8 0D:88A8: A9 0B     LDA #$0B
C - - - - - 0x0348BA 0D:88AA: 20 4E C5  JSR $C54E
C - - - - - 0x0348BD 0D:88AD: AD 12 06  LDA ram_0612
C - - - - - 0x0348C0 0D:88B0: 20 09 C5  JSR $C509
- D 0 - I - 0x0348C3 0D:88B3: 69        .byte $69   ; <i>
- D 0 - I - 0x0348C4 0D:88B4: 81        .byte $81   ; 
- D 0 - I - 0x0348C5 0D:88B5: 9C        .byte $9C   ; 
- D 0 - I - 0x0348C6 0D:88B6: 81        .byte $81   ; 
- D 0 - I - 0x0348C7 0D:88B7: BB        .byte $BB   ; 
- D 0 - I - 0x0348C8 0D:88B8: 88        .byte $88   ; 
- D 0 - I - 0x0348C9 0D:88B9: D5        .byte $D5   ; 
- D 0 - I - 0x0348CA 0D:88BA: 88        .byte $88   ; 
C - - J - - 0x0348CB 0D:88BB: 20 C8 8B  JSR $8BC8
C - - - - - 0x0348CE 0D:88BE: AD 42 04  LDA ram_0442
C - - - - - 0x0348D1 0D:88C1: 20 0C C5  JSR $C50C
C - - - - - 0x0348D4 0D:88C4: A0 06     LDY #$06
C - - - - - 0x0348D6 0D:88C6: B1 34     LDA (ram_0034),Y
C - - - - - 0x0348D8 0D:88C8: 8D 35 06  STA ram_0635
C - - - - - 0x0348DB 0D:88CB: A0 08     LDY #$08
C - - - - - 0x0348DD 0D:88CD: B1 34     LDA (ram_0034),Y
C - - - - - 0x0348DF 0D:88CF: 8D 37 06  STA ram_0637
C - - - - - 0x0348E2 0D:88D2: 4C BC 81  JMP $81BC
C - - J - - 0x0348E5 0D:88D5: 20 C8 8B  JSR $8BC8
C - - - - - 0x0348E8 0D:88D8: 18        CLC
C - - - - - 0x0348E9 0D:88D9: 20 95 90  JSR $9095
C - - - - - 0x0348EC 0D:88DC: AD 42 04  LDA ram_0442
C - - - - - 0x0348EF 0D:88DF: 20 6E 8E  JSR $8E6E
C - - - - - 0x0348F2 0D:88E2: 20 06 C6  JSR $C606
C - - - - - 0x0348F5 0D:88E5: A2 50     LDX #$50
C - - - - - 0x0348F7 0D:88E7: 9A        TXS
C - - - - - 0x0348F8 0D:88E8: 4C 0F C6  JMP $C60F
- D 0 - - - 0x0348FB 0D:88EB: 80        .byte $80   ; 
- - - - - - 0x0348FC 0D:88EC: 00        .byte $00   ; 
- - - - - - 0x0348FD 0D:88ED: 00        .byte $00   ; 
- - - - - - 0x0348FE 0D:88EE: 00        .byte $00   ; 
- - - - - - 0x0348FF 0D:88EF: 00        .byte $00   ; 
- - - - - - 0x034900 0D:88F0: 00        .byte $00   ; 
- D 0 - - - 0x034901 0D:88F1: 80        .byte $80   ; 
- - - - - - 0x034902 0D:88F2: 00        .byte $00   ; 
C D 0 - - - 0x034903 0D:88F3: A9 00     LDA #$00
C - - - - - 0x034905 0D:88F5: 8D 3B 04  STA ram_043B
C - - - - - 0x034908 0D:88F8: AD FB 05  LDA ram_05FB
C - - - - - 0x03490B 0D:88FB: 49 0B     EOR #$0B
C - - - - - 0x03490D 0D:88FD: 8D 42 04  STA ram_0442
C - - - - - 0x034910 0D:8900: AD E2 00  LDA a: ram_00E2
C - - - - - 0x034913 0D:8903: A0 00     LDY #$00
C - - - - - 0x034915 0D:8905: D9 28 89  CMP $8928,Y
C - - - - - 0x034918 0D:8908: B0 05     BCS $890F
C - - - - - 0x03491A 0D:890A: F0 03     BEQ $890F
C - - - - - 0x03491C 0D:890C: C8        INY
C - - - - - 0x03491D 0D:890D: D0 F6     BNE $8905
C - - - - - 0x03491F 0D:890F: 20 48 81  JSR $8148
C - - - - - 0x034922 0D:8912: A9 00     LDA #$00
C - - - - - 0x034924 0D:8914: 8D 16 06  STA ram_0616
C - - - - - 0x034927 0D:8917: A9 0C     LDA #$0C
C - - - - - 0x034929 0D:8919: 20 4E C5  JSR $C54E
C - - - - - 0x03492C 0D:891C: AD 12 06  LDA ram_0612
C - - - - - 0x03492F 0D:891F: 20 09 C5  JSR $C509
- D 0 - I - 0x034932 0D:8922: AC        .byte $AC   ; 
- D 0 - I - 0x034933 0D:8923: 85        .byte $85   ; 
- D 0 - I - 0x034934 0D:8924: 05        .byte $05   ; 
- D 0 - I - 0x034935 0D:8925: 86        .byte $86   ; 
- D 0 - I - 0x034936 0D:8926: 1C        .byte $1C   ; 
- D 0 - I - 0x034937 0D:8927: 86        .byte $86   ; 
- D 0 - - - 0x034938 0D:8928: 10        .byte $10   ; 
- D 0 - - - 0x034939 0D:8929: 00        .byte $00   ; 
C D 0 - - - 0x03493A 0D:892A: A0 00     LDY #$00
C - - - - - 0x03493C 0D:892C: A9 00     LDA #$00
C - - - - - 0x03493E 0D:892E: 8D 3B 04  STA ram_043B
C - - - - - 0x034941 0D:8931: 8D 3C 04  STA ram_043C
C - - - - - 0x034944 0D:8934: AD E2 00  LDA a: ram_00E2
C - - - - - 0x034947 0D:8937: D9 75 89  CMP $8975,Y
C - - - - - 0x03494A 0D:893A: B0 05     BCS $8941
C - - - - - 0x03494C 0D:893C: F0 03     BEQ $8941
C - - - - - 0x03494E 0D:893E: C8        INY
C - - - - - 0x03494F 0D:893F: D0 F6     BNE $8937
C - - - - - 0x034951 0D:8941: 20 48 81  JSR $8148
C - - - - - 0x034954 0D:8944: A9 0D     LDA #$0D
C - - - - - 0x034956 0D:8946: 20 4E C5  JSR $C54E
C - - - - - 0x034959 0D:8949: AD 12 06  LDA ram_0612
C - - - - - 0x03495C 0D:894C: 20 09 C5  JSR $C509
- D 0 - I - 0x03495F 0D:894F: 55        .byte $55   ; <U>
- D 0 - I - 0x034960 0D:8950: 89        .byte $89   ; 
- D 0 - I - 0x034961 0D:8951: 55        .byte $55   ; <U>
- D 0 - I - 0x034962 0D:8952: 89        .byte $89   ; 
- D 0 - I - 0x034963 0D:8953: 72        .byte $72   ; <r>
- D 0 - I - 0x034964 0D:8954: 89        .byte $89   ; 
C - - J - - 0x034965 0D:8955: 2C 4C 04  BIT ram_044C
C - - - - - 0x034968 0D:8958: 10 15     BPL $896F
C - - - - - 0x03496A 0D:895A: AD 41 04  LDA ram_0441
C - - - - - 0x03496D 0D:895D: C9 14     CMP #$14
C - - - - - 0x03496F 0D:895F: D0 0E     BNE $896F
C - - - - - 0x034971 0D:8961: 20 70 90  JSR $9070
C - - - - - 0x034974 0D:8964: 20 E3 85  JSR $85E3
C - - - - - 0x034977 0D:8967: A9 47     LDA #$47
C - - - - - 0x034979 0D:8969: 20 4E C5  JSR $C54E
C - - - - - 0x03497C 0D:896C: 4C BC 85  JMP $85BC
C - - - - - 0x03497F 0D:896F: 4C AC 85  JMP $85AC
C - - J - - 0x034982 0D:8972: 4C DF 8B  JMP $8BDF
- D 0 - - - 0x034985 0D:8975: 56        .byte $56   ; <V>
- D 0 - - - 0x034986 0D:8976: 45        .byte $45   ; <E>
- D 0 - - - 0x034987 0D:8977: 00        .byte $00   ; 
C D 0 - - - 0x034988 0D:8978: A9 02     LDA #$02
C - - - - - 0x03498A 0D:897A: 20 4B C5  JSR $C54B
C - - - - - 0x03498D 0D:897D: 20 72 8F  JSR $8F72
C - - - - - 0x034990 0D:8980: A9 0E     LDA #$0E
C - - - - - 0x034992 0D:8982: 20 4E C5  JSR $C54E
C - - - - - 0x034995 0D:8985: AD 00 06  LDA ram_0600
C - - - - - 0x034998 0D:8988: D0 09     BNE $8993
C - - - - - 0x03499A 0D:898A: 8D 12 06  STA ram_0612
C - - - - - 0x03499D 0D:898D: 20 DD 90  JSR $90DD
C - - - - - 0x0349A0 0D:8990: 4C 6F 8A  JMP $8A6F
C - - - - - 0x0349A3 0D:8993: A9 00     LDA #$00
C - - - - - 0x0349A5 0D:8995: 8D 16 06  STA ram_0616
C - - - - - 0x0349A8 0D:8998: AE 16 06  LDX ram_0616
C - - - - - 0x0349AB 0D:899B: BD 0B 06  LDA ram_060B,X
C - - - - - 0x0349AE 0D:899E: C9 06     CMP #$06
C - - - - - 0x0349B0 0D:89A0: F0 19     BEQ $89BB
C - - - - - 0x0349B2 0D:89A2: 8D 3D 04  STA ram_043D
C - - - - - 0x0349B5 0D:89A5: BD 01 06  LDA ram_0601,X
C - - - - - 0x0349B8 0D:89A8: 8D 42 04  STA ram_0442
C - - - - - 0x0349BB 0D:89AB: BD 06 06  LDA ram_0606,X
C - - - - - 0x0349BE 0D:89AE: 8D 3E 04  STA ram_043E
C - - - - - 0x0349C1 0D:89B1: A9 0F     LDA #$0F
C - - - - - 0x0349C3 0D:89B3: 20 4E C5  JSR $C54E
C - - - - - 0x0349C6 0D:89B6: A9 14     LDA #$14
C - - - - - 0x0349C8 0D:89B8: 20 15 C5  JSR $C515
C - - - - - 0x0349CB 0D:89BB: EE 16 06  INC ram_0616
C - - - - - 0x0349CE 0D:89BE: AD 16 06  LDA ram_0616
C - - - - - 0x0349D1 0D:89C1: CD 00 06  CMP ram_0600
C - - - - - 0x0349D4 0D:89C4: D0 D2     BNE $8998
C - - - - - 0x0349D6 0D:89C6: A9 04     LDA #$04
C - - - - - 0x0349D8 0D:89C8: 20 4E C5  JSR $C54E
C - - - - - 0x0349DB 0D:89CB: A9 00     LDA #$00
C - - - - - 0x0349DD 0D:89CD: 8D 16 06  STA ram_0616
C D 0 - - - 0x0349E0 0D:89D0: A9 01     LDA #$01
C - - - - - 0x0349E2 0D:89D2: 20 15 C5  JSR $C515
C - - - - - 0x0349E5 0D:89D5: A9 00     LDA #$00
C - - - - - 0x0349E7 0D:89D7: 8D 12 06  STA ram_0612
C - - - - - 0x0349EA 0D:89DA: AE 16 06  LDX ram_0616
C - - - - - 0x0349ED 0D:89DD: BD 01 06  LDA ram_0601,X
C - - - - - 0x0349F0 0D:89E0: 8D 42 04  STA ram_0442
C - - - - - 0x0349F3 0D:89E3: BD 06 06  LDA ram_0606,X
C - - - - - 0x0349F6 0D:89E6: 8D 3E 04  STA ram_043E
C - - - - - 0x0349F9 0D:89E9: BD 0B 06  LDA ram_060B,X
C - - - - - 0x0349FC 0D:89EC: 8D 3D 04  STA ram_043D
C - - - - - 0x0349FF 0D:89EF: C9 06     CMP #$06
C - - - - - 0x034A01 0D:89F1: D0 03     BNE $89F6
C - - - - - 0x034A03 0D:89F3: 4C 4F 8A  JMP $8A4F
C - - - - - 0x034A06 0D:89F6: C9 05     CMP #$05
C - - - - - 0x034A08 0D:89F8: D0 03     BNE $89FD
C - - - - - 0x034A0A 0D:89FA: 4C 4F 8A  JMP $8A4F
C - - - - - 0x034A0D 0D:89FD: A9 07     LDA #$07
C - - - - - 0x034A0F 0D:89FF: 20 4B C5  JSR $C54B
C - - - - - 0x034A12 0D:8A02: 20 F3 8F  JSR $8FF3
C - - - - - 0x034A15 0D:8A05: AE 3B 04  LDX ram_043B
C - - - - - 0x034A18 0D:8A08: BD 63 8A  LDA $8A63,X
C - - - - - 0x034A1B 0D:8A0B: 0A        ASL
C - - - - - 0x034A1C 0D:8A0C: 0A        ASL
C - - - - - 0x034A1D 0D:8A0D: AE 3D 04  LDX ram_043D
C - - - - - 0x034A20 0D:8A10: 7D 6A 8A  ADC $8A6A,X
C - - - - - 0x034A23 0D:8A13: AA        TAX
C - - - - - 0x034A24 0D:8A14: 0A        ASL
C - - - - - 0x034A25 0D:8A15: 85 3B     STA ram_003B
C - - - - - 0x034A27 0D:8A17: A9 08     LDA #$08
C - - - - - 0x034A29 0D:8A19: BC E1 83  LDY $83E1,X
C - - - - - 0x034A2C 0D:8A1C: 20 E9 8E  JSR $8EE9
C - - - - - 0x034A2F 0D:8A1F: DD AC 8A  CMP $8AAC,X
C - - - - - 0x034A32 0D:8A22: B0 04     BCS $8A28
C - - - - - 0x034A34 0D:8A24: E8        INX
C - - - - - 0x034A35 0D:8A25: C8        INY
C - - - - - 0x034A36 0D:8A26: D0 F7     BNE $8A1F
C - - - - - 0x034A38 0D:8A28: 20 48 81  JSR $8148
C - - - - - 0x034A3B 0D:8A2B: A9 11     LDA #$11
C - - - - - 0x034A3D 0D:8A2D: A2 01     LDX #$01
C - - - - - 0x034A3F 0D:8A2F: AC 12 06  LDY ram_0612
C - - - - - 0x034A42 0D:8A32: C0 02     CPY #$02
C - - - - - 0x034A44 0D:8A34: 90 03     BCC $8A39
C - - - - - 0x034A46 0D:8A36: CA        DEX
C - - - - - 0x034A47 0D:8A37: A9 10     LDA #$10
C - - - - - 0x034A49 0D:8A39: 48        PHA
C - - - - - 0x034A4A 0D:8A3A: 8A        TXA
C - - - - - 0x034A4B 0D:8A3B: 4A        LSR
C - - - - - 0x034A4C 0D:8A3C: 20 95 90  JSR $9095
C - - - - - 0x034A4F 0D:8A3F: 68        PLA
C - - - - - 0x034A50 0D:8A40: 20 4E C5  JSR $C54E
C - - - - - 0x034A53 0D:8A43: A9 12     LDA #$12
C - - - - - 0x034A55 0D:8A45: 20 4E C5  JSR $C54E
C - - - - - 0x034A58 0D:8A48: AC 12 06  LDY ram_0612
C - - - - - 0x034A5B 0D:8A4B: C0 02     CPY #$02
C - - - - - 0x034A5D 0D:8A4D: B0 11     BCS $8A60
C D 0 - - - 0x034A5F 0D:8A4F: EE 16 06  INC ram_0616
C - - - - - 0x034A62 0D:8A52: AD 16 06  LDA ram_0616
C - - - - - 0x034A65 0D:8A55: CD 00 06  CMP ram_0600
C - - - - - 0x034A68 0D:8A58: F0 03     BEQ $8A5D
C - - - - - 0x034A6A 0D:8A5A: 4C D0 89  JMP $89D0
C - - - - - 0x034A6D 0D:8A5D: 20 85 90  JSR $9085
C - - - - - 0x034A70 0D:8A60: 4C 6F 8A  JMP $8A6F
- - - - - - 0x034A73 0D:8A63: 00        .byte $00   ; 
- D 0 - - - 0x034A74 0D:8A64: 00        .byte $00   ; 
- - - - - - 0x034A75 0D:8A65: 00        .byte $00   ; 
- - - - - - 0x034A76 0D:8A66: 00        .byte $00   ; 
- D 0 - - - 0x034A77 0D:8A67: 01        .byte $01   ; 
- - - - - - 0x034A78 0D:8A68: 00        .byte $00   ; 
- D 0 - - - 0x034A79 0D:8A69: 02        .byte $02   ; 
- - - - - - 0x034A7A 0D:8A6A: 00        .byte $00   ; 
- - - - - - 0x034A7B 0D:8A6B: 00        .byte $00   ; 
- D 0 - - - 0x034A7C 0D:8A6C: 00        .byte $00   ; 
- - - - - - 0x034A7D 0D:8A6D: 00        .byte $00   ; 
- D 0 - - - 0x034A7E 0D:8A6E: 01        .byte $01   ; 
C D 0 - - - 0x034A7F 0D:8A6F: 20 06 C6  JSR $C606
C - - - - - 0x034A82 0D:8A72: AD 12 06  LDA ram_0612
C - - - - - 0x034A85 0D:8A75: 20 09 C5  JSR $C509
- D 0 - I - 0x034A88 0D:8A78: 80        .byte $80   ; 
- D 0 - I - 0x034A89 0D:8A79: 8A        .byte $8A   ; 
- D 0 - I - 0x034A8A 0D:8A7A: 80        .byte $80   ; 
- D 0 - I - 0x034A8B 0D:8A7B: 8A        .byte $8A   ; 
- D 0 - I - 0x034A8C 0D:8A7C: DF        .byte $DF   ; 
- D 0 - I - 0x034A8D 0D:8A7D: 8B        .byte $8B   ; 
- D 0 - I - 0x034A8E 0D:8A7E: 9C        .byte $9C   ; 
- D 0 - I - 0x034A8F 0D:8A7F: 8A        .byte $8A   ; 
C - - J - - 0x034A90 0D:8A80: 20 BA 8B  JSR $8BBA
C - - - - - 0x034A93 0D:8A83: A9 13     LDA #$13
C - - - - - 0x034A95 0D:8A85: 20 4E C5  JSR $C54E
C - - - - - 0x034A98 0D:8A88: AD 3B 04  LDA ram_043B
C - - - - - 0x034A9B 0D:8A8B: 20 09 C5  JSR $C509
- - - - - - 0x034A9E 0D:8A8E: 00        .byte $00   ; 
- - - - - - 0x034A9F 0D:8A8F: 00        .byte $00   ; 
- D 0 - I - 0x034AA0 0D:8A90: 12        .byte $12   ; 
- D 0 - I - 0x034AA1 0D:8A91: C6        .byte $C6   ; 
- - - - - - 0x034AA2 0D:8A92: 00        .byte $00   ; 
- - - - - - 0x034AA3 0D:8A93: 00        .byte $00   ; 
- - - - - - 0x034AA4 0D:8A94: 00        .byte $00   ; 
- - - - - - 0x034AA5 0D:8A95: 00        .byte $00   ; 
- D 0 - I - 0x034AA6 0D:8A96: 27        .byte $27   ; 
- D 0 - I - 0x034AA7 0D:8A97: C6        .byte $C6   ; 
- - - - - - 0x034AA8 0D:8A98: 00        .byte $00   ; 
- - - - - - 0x034AA9 0D:8A99: 00        .byte $00   ; 
- D 0 - I - 0x034AAA 0D:8A9A: 2D        .byte $2D   ; 
- D 0 - I - 0x034AAB 0D:8A9B: C6        .byte $C6   ; 
C - - J - - 0x034AAC 0D:8A9C: 20 C8 8B  JSR $8BC8
C - - - - - 0x034AAF 0D:8A9F: AD 3D 04  LDA ram_043D
C - - - - - 0x034AB2 0D:8AA2: C9 02     CMP #$02
C - - - - - 0x034AB4 0D:8AA4: D0 03     BNE $8AA9
C - - - - - 0x034AB6 0D:8AA6: 4C DE 81  JMP $81DE
C - - - - - 0x034AB9 0D:8AA9: 4C DF 8B  JMP $8BDF
- D 0 - - - 0x034ABC 0D:8AAC: A0        .byte $A0   ; 
- D 0 - - - 0x034ABD 0D:8AAD: 60        .byte $60   ; 
- D 0 - - - 0x034ABE 0D:8AAE: 40        .byte $40   ; 
- D 0 - - - 0x034ABF 0D:8AAF: 00        .byte $00   ; 
C D 0 - - - 0x034AC0 0D:8AB0: AD 41 04  LDA ram_0441
C - - - - - 0x034AC3 0D:8AB3: A2 02     LDX #$02
C - - - - - 0x034AC5 0D:8AB5: 20 3A 8B  JSR $8B3A
C - - - - - 0x034AC8 0D:8AB8: AD E2 00  LDA a: ram_00E2
C - - - - - 0x034ACB 0D:8ABB: 29 03     AND #$03
C - - - - - 0x034ACD 0D:8ABD: C9 03     CMP #$03
C - - - - - 0x034ACF 0D:8ABF: D0 02     BNE $8AC3
C - - - - - 0x034AD1 0D:8AC1: A9 00     LDA #$00
C - - - - - 0x034AD3 0D:8AC3: 18        CLC
C - - - - - 0x034AD4 0D:8AC4: 69 03     ADC #$03
C - - - - - 0x034AD6 0D:8AC6: 85 3A     STA ram_003A
C - - - - - 0x034AD8 0D:8AC8: AD FB 05  LDA ram_05FB
C - - - - - 0x034ADB 0D:8ACB: 49 0B     EOR #$0B
C - - - - - 0x034ADD 0D:8ACD: 18        CLC
C - - - - - 0x034ADE 0D:8ACE: 65 3A     ADC ram_003A
C - - - - - 0x034AE0 0D:8AD0: 8D 42 04  STA ram_0442
C - - - - - 0x034AE3 0D:8AD3: 8D 01 06  STA ram_0601
C - - - - - 0x034AE6 0D:8AD6: A2 03     LDX #$03
C - - - - - 0x034AE8 0D:8AD8: 20 3A 8B  JSR $8B3A
C - - - - - 0x034AEB 0D:8ADB: A9 00     LDA #$00
C - - - - - 0x034AED 0D:8ADD: 8D 3D 04  STA ram_043D
C - - - - - 0x034AF0 0D:8AE0: A9 00     LDA #$00
C - - - - - 0x034AF2 0D:8AE2: 8D 3E 04  STA ram_043E
C - - - - - 0x034AF5 0D:8AE5: 8D 4E 04  STA ram_044E
C - - - - - 0x034AF8 0D:8AE8: 20 72 8F  JSR $8F72
C - - - - - 0x034AFB 0D:8AEB: A9 07     LDA #$07
C - - - - - 0x034AFD 0D:8AED: 20 4B C5  JSR $C54B
C - - - - - 0x034B00 0D:8AF0: A9 0A     LDA #$0A
C - - - - - 0x034B02 0D:8AF2: A2 00     LDX #$00
C - - - - - 0x034B04 0D:8AF4: 86 3B     STX ram_003B
C - - - - - 0x034B06 0D:8AF6: A2 80     LDX #$80
C - - - - - 0x034B08 0D:8AF8: 20 E9 8E  JSR $8EE9
C - - - - - 0x034B0B 0D:8AFB: A0 00     LDY #$00
C - - - - - 0x034B0D 0D:8AFD: AE 12 06  LDX ram_0612
C - - - - - 0x034B10 0D:8B00: D0 08     BNE $8B0A
C - - - - - 0x034B12 0D:8B02: D9 46 8B  CMP $8B46,Y
C - - - - - 0x034B15 0D:8B05: B0 03     BCS $8B0A
C - - - - - 0x034B17 0D:8B07: C8        INY
C - - - - - 0x034B18 0D:8B08: D0 F8     BNE $8B02
C - - - - - 0x034B1A 0D:8B0A: 20 48 81  JSR $8148
C - - - - - 0x034B1D 0D:8B0D: AD 41 04  LDA ram_0441
C - - - - - 0x034B20 0D:8B10: A2 FE     LDX #$FE
C - - - - - 0x034B22 0D:8B12: 20 3A 8B  JSR $8B3A
C - - - - - 0x034B25 0D:8B15: AD 42 04  LDA ram_0442
C - - - - - 0x034B28 0D:8B18: A2 FD     LDX #$FD
C - - - - - 0x034B2A 0D:8B1A: 20 3A 8B  JSR $8B3A
C - - - - - 0x034B2D 0D:8B1D: A9 14     LDA #$14
C - - - - - 0x034B2F 0D:8B1F: 20 4E C5  JSR $C54E
C - - - - - 0x034B32 0D:8B22: A9 00     LDA #$00
C - - - - - 0x034B34 0D:8B24: 8D 1A 06  STA ram_061A
C - - - - - 0x034B37 0D:8B27: A9 02     LDA #$02
C - - - - - 0x034B39 0D:8B29: 8D FF 05  STA ram_05FF
C - - - - - 0x034B3C 0D:8B2C: AD 12 06  LDA ram_0612
C - - - - - 0x034B3F 0D:8B2F: 20 09 C5  JSR $C509
- D 0 - I - 0x034B42 0D:8B32: 1B        .byte $1B   ; 
- D 0 - I - 0x034B43 0D:8B33: C6        .byte $C6   ; 
- D 0 - I - 0x034B44 0D:8B34: 1B        .byte $1B   ; 
- D 0 - I - 0x034B45 0D:8B35: C6        .byte $C6   ; 
- D 0 - I - 0x034B46 0D:8B36: DF        .byte $DF   ; 
- D 0 - I - 0x034B47 0D:8B37: 8B        .byte $8B   ; 
- D 0 - I - 0x034B48 0D:8B38: D5        .byte $D5   ; 
- D 0 - I - 0x034B49 0D:8B39: 88        .byte $88   ; 
C - - - - - 0x034B4A 0D:8B3A: 20 0C C5  JSR $C50C
C - - - - - 0x034B4D 0D:8B3D: A0 03     LDY #$03
C - - - - - 0x034B4F 0D:8B3F: 8A        TXA
C - - - - - 0x034B50 0D:8B40: 18        CLC
C - - - - - 0x034B51 0D:8B41: 71 34     ADC (ram_0034),Y
C - - - - - 0x034B53 0D:8B43: 91 34     STA (ram_0034),Y
C - - - - - 0x034B55 0D:8B45: 60        RTS
- D 0 - - - 0x034B56 0D:8B46: A0        .byte $A0   ; 
- D 0 - - - 0x034B57 0D:8B47: 60        .byte $60   ; 
- D 0 - - - 0x034B58 0D:8B48: 40        .byte $40   ; 
- D 0 - - - 0x034B59 0D:8B49: 00        .byte $00   ; 
C D 0 - - - 0x034B5A 0D:8B4A: 20 9C 8B  JSR $8B9C
C - - - - - 0x034B5D 0D:8B4D: B0 01     BCS $8B50
C - - - - - 0x034B5F 0D:8B4F: 60        RTS
C - - - - - 0x034B60 0D:8B50: 20 24 C6  JSR $C624
C - - - - - 0x034B63 0D:8B53: A9 00     LDA #$00
C - - - - - 0x034B65 0D:8B55: 8D 00 06  STA ram_0600
C - - - - - 0x034B68 0D:8B58: 8A        TXA
C - - - - - 0x034B69 0D:8B59: A2 02     LDX #$02
C - - - - - 0x034B6B 0D:8B5B: 4D FB 05  EOR ram_05FB
C - - - - - 0x034B6E 0D:8B5E: F0 02     BEQ $8B62
C - - - - - 0x034B70 0D:8B60: A2 01     LDX #$01
C - - - - - 0x034B72 0D:8B62: 8E 21 06  STX ram_0621
C - - - - - 0x034B75 0D:8B65: A9 FF     LDA #$FF
C - - - - - 0x034B77 0D:8B67: 8D 1A 06  STA ram_061A
C - - - - - 0x034B7A 0D:8B6A: 20 E1 87  JSR $87E1
C - - - - - 0x034B7D 0D:8B6D: A2 50     LDX #$50
C - - - - - 0x034B7F 0D:8B6F: 9A        TXS
C - - - - - 0x034B80 0D:8B70: 4C 73 8B  JMP $8B73
C D 0 - - - 0x034B83 0D:8B73: A9 0A     LDA #$0A
C - - - - - 0x034B85 0D:8B75: 20 09 C6  JSR $C609
C - - - - - 0x034B88 0D:8B78: A9 3F     LDA #$3F
C - - - - - 0x034B8A 0D:8B7A: AE 21 06  LDX ram_0621
C - - - - - 0x034B8D 0D:8B7D: E0 02     CPX #$02
C - - - - - 0x034B8F 0D:8B7F: F0 05     BEQ $8B86
C - - - - - 0x034B91 0D:8B81: 20 8F 84  JSR $848F
C - - - - - 0x034B94 0D:8B84: A9 2F     LDA #$2F
C - - - - - 0x034B96 0D:8B86: 20 4E C5  JSR $C54E
C - - - - - 0x034B99 0D:8B89: 20 86 8E  JSR $8E86
C - - - - - 0x034B9C 0D:8B8C: 20 00 C6  JSR $C600
C - - - - - 0x034B9F 0D:8B8F: AD 21 06  LDA ram_0621
C - - - - - 0x034BA2 0D:8B92: C9 01     CMP #$01
C - - - - - 0x034BA4 0D:8B94: D0 03     BNE $8B99
C - - - - - 0x034BA6 0D:8B96: 4C 98 82  JMP $8298
C - - - - - 0x034BA9 0D:8B99: 4C 78 89  JMP $8978
C - - - - - 0x034BAC 0D:8B9C: AD 37 06  LDA ram_0637
C - - - - - 0x034BAF 0D:8B9F: C9 60     CMP #$60
C - - - - - 0x034BB1 0D:8BA1: 90 13     BCC $8BB6
C - - - - - 0x034BB3 0D:8BA3: C9 A0     CMP #$A0
C - - - - - 0x034BB5 0D:8BA5: B0 0F     BCS $8BB6
C - - - - - 0x034BB7 0D:8BA7: A2 00     LDX #$00
C - - - - - 0x034BB9 0D:8BA9: AD 35 06  LDA ram_0635
C - - - - - 0x034BBC 0D:8BAC: C9 50     CMP #$50
C - - - - - 0x034BBE 0D:8BAE: 90 08     BCC $8BB8
C - - - - - 0x034BC0 0D:8BB0: A2 0B     LDX #$0B
C - - - - - 0x034BC2 0D:8BB2: C9 B0     CMP #$B0
C - - - - - 0x034BC4 0D:8BB4: B0 02     BCS $8BB8
C - - - - - 0x034BC6 0D:8BB6: 18        CLC
C - - - - - 0x034BC7 0D:8BB7: 60        RTS
C - - - - - 0x034BC8 0D:8BB8: 38        SEC
C - - - - - 0x034BC9 0D:8BB9: 60        RTS
C - - - - - 0x034BCA 0D:8BBA: AD 00 06  LDA ram_0600
C - - - - - 0x034BCD 0D:8BBD: F0 08     BEQ $8BC7
C - - - - - 0x034BCF 0D:8BBF: AD 41 04  LDA ram_0441
C - - - - - 0x034BD2 0D:8BC2: A2 01     LDX #$01
C - - - - - 0x034BD4 0D:8BC4: 4C D4 8B  JMP $8BD4
C - - - - - 0x034BD7 0D:8BC7: 60        RTS
C - - - - - 0x034BD8 0D:8BC8: A2 03     LDX #$03
C - - - - - 0x034BDA 0D:8BCA: AD 42 04  LDA ram_0442
C - - - - - 0x034BDD 0D:8BCD: F0 05     BEQ $8BD4
C - - - - - 0x034BDF 0D:8BCF: C9 0B     CMP #$0B
C - - - - - 0x034BE1 0D:8BD1: F0 01     BEQ $8BD4
C - - - - - 0x034BE3 0D:8BD3: CA        DEX
C D 0 - - - 0x034BE4 0D:8BD4: 20 0C C5  JSR $C50C
C - - - - - 0x034BE7 0D:8BD7: A0 00     LDY #$00
C - - - - - 0x034BE9 0D:8BD9: B1 34     LDA (ram_0034),Y
C - - - - - 0x034BEB 0D:8BDB: 20 C8 C4  JSR $C4C8
C - - - - - 0x034BEE 0D:8BDE: 60        RTS
C D 0 - - - 0x034BEF 0D:8BDF: 20 70 90  JSR $9070
C - - - - - 0x034BF2 0D:8BE2: 20 6D 8C  JSR $8C6D
C D 0 - - - 0x034BF5 0D:8BE5: 20 06 C6  JSR $C606
C - - - - - 0x034BF8 0D:8BE8: 20 42 8C  JSR $8C42
C - - - - - 0x034BFB 0D:8BEB: B0 25     BCS $8C12
C - - - - - 0x034BFD 0D:8BED: A9 00     LDA #$00
C - - - - - 0x034BFF 0D:8BEF: 20 48 C5  JSR $C548
C - - - - - 0x034C02 0D:8BF2: 85 3A     STA ram_003A
C - - - - - 0x034C04 0D:8BF4: A5 47     LDA ram_0047
C - - - - - 0x034C06 0D:8BF6: 48        PHA
C - - - - - 0x034C07 0D:8BF7: A9 0B     LDA #$0B
C - - - - - 0x034C09 0D:8BF9: 20 48 C5  JSR $C548
C - - - - - 0x034C0C 0D:8BFC: AA        TAX
C - - - - - 0x034C0D 0D:8BFD: 68        PLA
C - - - - - 0x034C0E 0D:8BFE: C5 47     CMP ram_0047
C - - - - - 0x034C10 0D:8C00: 90 0E     BCC $8C10
C - - - - - 0x034C12 0D:8C02: F0 05     BEQ $8C09
C - - - - - 0x034C14 0D:8C04: 86 3A     STX ram_003A
C - - - - - 0x034C16 0D:8C06: 4C 10 8C  JMP $8C10
C - - - - - 0x034C19 0D:8C09: 2C E2 00  BIT a: ram_00E2
C - - - - - 0x034C1C 0D:8C0C: 10 02     BPL $8C10
C - - - - - 0x034C1E 0D:8C0E: 86 3A     STX ram_003A
C D 0 - - - 0x034C20 0D:8C10: A5 3A     LDA ram_003A
C - - - - - 0x034C22 0D:8C12: 20 6E 8E  JSR $8E6E
C - - - - - 0x034C25 0D:8C15: AD 41 04  LDA ram_0441
C - - - - - 0x034C28 0D:8C18: 20 0C C5  JSR $C50C
C - - - - - 0x034C2B 0D:8C1B: A0 06     LDY #$06
C - - - - - 0x034C2D 0D:8C1D: AD 35 06  LDA ram_0635
C - - - - - 0x034C30 0D:8C20: 91 34     STA (ram_0034),Y
C - - - - - 0x034C32 0D:8C22: A0 08     LDY #$08
C - - - - - 0x034C34 0D:8C24: AD 37 06  LDA ram_0637
C - - - - - 0x034C37 0D:8C27: 91 34     STA (ram_0034),Y
C - - - - - 0x034C39 0D:8C29: A9 00     LDA #$00
C - - - - - 0x034C3B 0D:8C2B: 8D 3C 04  STA ram_043C
C - - - - - 0x034C3E 0D:8C2E: 20 24 C6  JSR $C624
C - - - - - 0x034C41 0D:8C31: 20 4A 8B  JSR $8B4A
C - - - - - 0x034C44 0D:8C34: A9 2C     LDA #$2C
C - - - - - 0x034C46 0D:8C36: 20 4E C5  JSR $C54E
C - - - - - 0x034C49 0D:8C39: 20 86 8E  JSR $8E86
C - - - - - 0x034C4C 0D:8C3C: A2 50     LDX #$50
C - - - - - 0x034C4E 0D:8C3E: 9A        TXS
C - - - - - 0x034C4F 0D:8C3F: 4C 0F C6  JMP $C60F
C - - - - - 0x034C52 0D:8C42: AD 00 06  LDA ram_0600
C - - - - - 0x034C55 0D:8C45: F0 18     BEQ $8C5F
C - - - - - 0x034C57 0D:8C47: A2 00     LDX #$00
C - - - - - 0x034C59 0D:8C49: BD 01 06  LDA ram_0601,X
C - - - - - 0x034C5C 0D:8C4C: F0 0B     BEQ $8C59
C - - - - - 0x034C5E 0D:8C4E: C9 0B     CMP #$0B
C - - - - - 0x034C60 0D:8C50: F0 07     BEQ $8C59
C - - - - - 0x034C62 0D:8C52: BD 0B 06  LDA ram_060B,X
C - - - - - 0x034C65 0D:8C55: C9 05     CMP #$05
C - - - - - 0x034C67 0D:8C57: F0 08     BEQ $8C61
C - - - - - 0x034C69 0D:8C59: E8        INX
C - - - - - 0x034C6A 0D:8C5A: EC 00 06  CPX ram_0600
C - - - - - 0x034C6D 0D:8C5D: D0 EA     BNE $8C49
C - - - - - 0x034C6F 0D:8C5F: 18        CLC
C - - - - - 0x034C70 0D:8C60: 60        RTS
C - - - - - 0x034C71 0D:8C61: AD E2 00  LDA a: ram_00E2
C - - - - - 0x034C74 0D:8C64: C9 40     CMP #$40
C - - - - - 0x034C76 0D:8C66: B0 F7     BCS $8C5F
C - - - - - 0x034C78 0D:8C68: BD 01 06  LDA ram_0601,X
C - - - - - 0x034C7B 0D:8C6B: 38        SEC
C - - - - - 0x034C7C 0D:8C6C: 60        RTS
C - - - - - 0x034C7D 0D:8C6D: AD E2 00  LDA a: ram_00E2
C - - - - - 0x034C80 0D:8C70: 29 83     AND #$83
C - - - - - 0x034C82 0D:8C72: AE 37 06  LDX ram_0637
C - - - - - 0x034C85 0D:8C75: 20 92 8C  JSR $8C92
C - - - - - 0x034C88 0D:8C78: 8D 37 06  STA ram_0637
C - - - - - 0x034C8B 0D:8C7B: AD E3 00  LDA a: ram_00E3
C - - - - - 0x034C8E 0D:8C7E: 29 83     AND #$83
C - - - - - 0x034C90 0D:8C80: 8D 2C 06  STA ram_062C
C - - - - - 0x034C93 0D:8C83: AE 35 06  LDX ram_0635
C - - - - - 0x034C96 0D:8C86: 20 92 8C  JSR $8C92
C - - - - - 0x034C99 0D:8C89: 8D 35 06  STA ram_0635
C - - - - - 0x034C9C 0D:8C8C: A9 00     LDA #$00
C - - - - - 0x034C9E 0D:8C8E: 20 A4 8C  JSR $8CA4
C - - - - - 0x034CA1 0D:8C91: 60        RTS
C - - - - - 0x034CA2 0D:8C92: 0A        ASL
C - - - - - 0x034CA3 0D:8C93: 08        PHP
C - - - - - 0x034CA4 0D:8C94: 0A        ASL
C - - - - - 0x034CA5 0D:8C95: 0A        ASL
C - - - - - 0x034CA6 0D:8C96: 28        PLP
C - - - - - 0x034CA7 0D:8C97: 90 04     BCC $8C9D
C - - - - - 0x034CA9 0D:8C99: 49 FF     EOR #$FF
C - - - - - 0x034CAB 0D:8C9B: 69 00     ADC #$00
C - - - - - 0x034CAD 0D:8C9D: 85 3A     STA ram_003A
C - - - - - 0x034CAF 0D:8C9F: 8A        TXA
C - - - - - 0x034CB0 0D:8CA0: 18        CLC
C - - - - - 0x034CB1 0D:8CA1: 65 3A     ADC ram_003A
C - - - - - 0x034CB3 0D:8CA3: 60        RTS
C D 0 - - - 0x034CB4 0D:8CA4: 4A        LSR
C - - - - - 0x034CB5 0D:8CA5: 08        PHP
C - - - - - 0x034CB6 0D:8CA6: AD 35 06  LDA ram_0635
C - - - - - 0x034CB9 0D:8CA9: C9 30     CMP #$30
C - - - - - 0x034CBB 0D:8CAB: 90 1E     BCC $8CCB
C - - - - - 0x034CBD 0D:8CAD: C9 D0     CMP #$D0
C - - - - - 0x034CBF 0D:8CAF: B0 1A     BCS $8CCB
C - - - - - 0x034CC1 0D:8CB1: AD 37 06  LDA ram_0637
C - - - - - 0x034CC4 0D:8CB4: C9 50     CMP #$50
C - - - - - 0x034CC6 0D:8CB6: 90 06     BCC $8CBE
C - - - - - 0x034CC8 0D:8CB8: C9 B0     CMP #$B0
C - - - - - 0x034CCA 0D:8CBA: B0 02     BCS $8CBE
C - - - - - 0x034CCC 0D:8CBC: 28        PLP
C - - - - - 0x034CCD 0D:8CBD: 60        RTS
C - - - - - 0x034CCE 0D:8CBE: 28        PLP
C - - - - - 0x034CCF 0D:8CBF: 20 EA 8C  JSR $8CEA
C - - - - - 0x034CD2 0D:8CC2: 20 5A C5  JSR $C55A
C - - - - - 0x034CD5 0D:8CC5: A2 50     LDX #$50
C - - - - - 0x034CD7 0D:8CC7: 9A        TXS
C - - - - - 0x034CD8 0D:8CC8: 4C 1C 91  JMP $911C
C - - - - - 0x034CDB 0D:8CCB: 28        PLP
C - - - - - 0x034CDC 0D:8CCC: 20 EA 8C  JSR $8CEA
C - - - - - 0x034CDF 0D:8CCF: 20 5A C5  JSR $C55A
C - - - - - 0x034CE2 0D:8CD2: AD FB 05  LDA ram_05FB
C - - - - - 0x034CE5 0D:8CD5: F0 02     BEQ $8CD9
C - - - - - 0x034CE7 0D:8CD7: A9 80     LDA #$80
C - - - - - 0x034CE9 0D:8CD9: 4D 35 06  EOR ram_0635
C - - - - - 0x034CEC 0D:8CDC: 10 06     BPL $8CE4
C - - - - - 0x034CEE 0D:8CDE: A2 50     LDX #$50
C - - - - - 0x034CF0 0D:8CE0: 9A        TXS
C - - - - - 0x034CF1 0D:8CE1: 4C EE 92  JMP $92EE
C - - - - - 0x034CF4 0D:8CE4: A2 50     LDX #$50
C - - - - - 0x034CF6 0D:8CE6: 9A        TXS
C - - - - - 0x034CF7 0D:8CE7: 4C 5E 95  JMP $955E
C - - - - - 0x034CFA 0D:8CEA: 90 08     BCC $8CF4
C - - - - - 0x034CFC 0D:8CEC: AD FB 05  LDA ram_05FB
C - - - - - 0x034CFF 0D:8CEF: 49 0B     EOR #$0B
C - - - - - 0x034D01 0D:8CF1: 8D FB 05  STA ram_05FB
C - - - - - 0x034D04 0D:8CF4: 60        RTS
C - - - - - 0x034D05 0D:8CF5: 48        PHA
C - - - - - 0x034D06 0D:8CF6: 20 51 C5  JSR $C551
C - - - - - 0x034D09 0D:8CF9: 68        PLA
C - - - - - 0x034D0A 0D:8CFA: A0 07     LDY #$07
C - - - - - 0x034D0C 0D:8CFC: 18        CLC
C - - - - - 0x034D0D 0D:8CFD: 71 34     ADC (ram_0034),Y
C - - - - - 0x034D0F 0D:8CFF: 10 02     BPL $8D03
- - - - - - 0x034D11 0D:8D01: A9        .byte $A9   ; 
- - - - - - 0x034D12 0D:8D02: 7F        .byte $7F   ; 
C - - - - - 0x034D13 0D:8D03: 91 34     STA (ram_0034),Y
C - - - - - 0x034D15 0D:8D05: 60        RTS
C - - - - - 0x034D16 0D:8D06: 08        PHP
C - - - - - 0x034D17 0D:8D07: 0A        ASL
C - - - - - 0x034D18 0D:8D08: AA        TAX
C - - - - - 0x034D19 0D:8D09: BD 93 8D  LDA $8D93,X
C - - - - - 0x034D1C 0D:8D0C: 85 3C     STA ram_003C
C - - - - - 0x034D1E 0D:8D0E: BD 94 8D  LDA $8D94,X
C - - - - - 0x034D21 0D:8D11: 85 3D     STA ram_003D
C - - - - - 0x034D23 0D:8D13: AD E2 00  LDA a: ram_00E2
C - - - - - 0x034D26 0D:8D16: 6D E3 00  ADC a: ram_00E3
C - - - - - 0x034D29 0D:8D19: 6A        ROR
C - - - - - 0x034D2A 0D:8D1A: A2 00     LDX #$00
C - - - - - 0x034D2C 0D:8D1C: 28        PLP
C - - - - - 0x034D2D 0D:8D1D: 10 2B     BPL $8D4A
C - - - - - 0x034D2F 0D:8D1F: 24 3A     BIT ram_003A
C - - - - - 0x034D31 0D:8D21: 30 27     BMI $8D4A
C - - - - - 0x034D33 0D:8D23: AC 21 06  LDY ram_0621
C - - - - - 0x034D36 0D:8D26: C0 04     CPY #$04
C - - - - - 0x034D38 0D:8D28: D0 09     BNE $8D33
C - - - - - 0x034D3A 0D:8D2A: AC 42 04  LDY ram_0442
C - - - - - 0x034D3D 0D:8D2D: F0 0B     BEQ $8D3A
C - - - - - 0x034D3F 0D:8D2F: C0 0B     CPY #$0B
C - - - - - 0x034D41 0D:8D31: F0 07     BEQ $8D3A
C - - - - - 0x034D43 0D:8D33: AC E3 00  LDY a: ram_00E3
C - - - - - 0x034D46 0D:8D36: C0 F8     CPY #$F8
C - - - - - 0x034D48 0D:8D38: 90 10     BCC $8D4A
C - - - - - 0x034D4A 0D:8D3A: E8        INX
C - - - - - 0x034D4B 0D:8D3B: A8        TAY
C - - - - - 0x034D4C 0D:8D3C: AD 3E 04  LDA ram_043E
C - - - - - 0x034D4F 0D:8D3F: 09 80     ORA #$80
C - - - - - 0x034D51 0D:8D41: 8D 3E 04  STA ram_043E
C - - - - - 0x034D54 0D:8D44: 98        TYA
C - - - - - 0x034D55 0D:8D45: 29 7F     AND #$7F
C - - - - - 0x034D57 0D:8D47: 4C 60 8D  JMP $8D60
C - - - - - 0x034D5A 0D:8D4A: A4 3B     LDY ram_003B
C D 0 - - - 0x034D5C 0D:8D4C: D1 3C     CMP (ram_003C),Y
C - - - - - 0x034D5E 0D:8D4E: 90 07     BCC $8D57
C - - - - - 0x034D60 0D:8D50: F0 05     BEQ $8D57
C - - - - - 0x034D62 0D:8D52: F1 3C     SBC (ram_003C),Y
C - - - - - 0x034D64 0D:8D54: 4C 4C 8D  JMP $8D4C
C - - - - - 0x034D67 0D:8D57: A2 00     LDX #$00
C - - - - - 0x034D69 0D:8D59: C8        INY
C - - - - - 0x034D6A 0D:8D5A: 18        CLC
C - - - - - 0x034D6B 0D:8D5B: 71 3C     ADC (ram_003C),Y
C - - - - - 0x034D6D 0D:8D5D: 90 01     BCC $8D60
C - - - - - 0x034D6F 0D:8D5F: E8        INX
C D 0 - - - 0x034D70 0D:8D60: 24 3A     BIT ram_003A
C - - - - - 0x034D72 0D:8D62: 10 10     BPL $8D74
C - - - - - 0x034D74 0D:8D64: 46 33     LSR ram_0033
C - - - - - 0x034D76 0D:8D66: 66 32     ROR ram_0032
C - - - - - 0x034D78 0D:8D68: 46 33     LSR ram_0033
C - - - - - 0x034D7A 0D:8D6A: 66 32     ROR ram_0032
C - - - - - 0x034D7C 0D:8D6C: 46 33     LSR ram_0033
C - - - - - 0x034D7E 0D:8D6E: 66 32     ROR ram_0032
C - - - - - 0x034D80 0D:8D70: 46 33     LSR ram_0033
C - - - - - 0x034D82 0D:8D72: 66 32     ROR ram_0032
C - - - - - 0x034D84 0D:8D74: 85 67     STA ram_0067
C - - - - - 0x034D86 0D:8D76: 86 68     STX ram_0068
C - - - - - 0x034D88 0D:8D78: A5 32     LDA ram_0032
C - - - - - 0x034D8A 0D:8D7A: 85 69     STA ram_0069
C - - - - - 0x034D8C 0D:8D7C: A5 33     LDA ram_0033
C - - - - - 0x034D8E 0D:8D7E: 85 6A     STA ram_006A
C - - - - - 0x034D90 0D:8D80: 20 21 C5  JSR $C521
C - - - - - 0x034D93 0D:8D83: A9 00     LDA #$00
C - - - - - 0x034D95 0D:8D85: 8D 74 00  STA a: ram_0074
C - - - - - 0x034D98 0D:8D88: A5 6C     LDA ram_006C
C - - - - - 0x034D9A 0D:8D8A: A4 6D     LDY ram_006D
C - - - - - 0x034D9C 0D:8D8C: F0 02     BEQ $8D90
C - - - - - 0x034D9E 0D:8D8E: A9 FF     LDA #$FF
C - - - - - 0x034DA0 0D:8D90: 85 71     STA ram_0071
C - - - - - 0x034DA2 0D:8D92: 60        RTS
- D 0 - - - 0x034DA3 0D:8D93: A9        .byte $A9   ; 
- D 0 - - - 0x034DA4 0D:8D94: 8D        .byte $8D   ; 
- D 0 - - - 0x034DA5 0D:8D95: C9        .byte $C9   ; 
- D 0 - - - 0x034DA6 0D:8D96: 8D        .byte $8D   ; 
- - - - - - 0x034DA7 0D:8D97: C9        .byte $C9   ; 
- - - - - - 0x034DA8 0D:8D98: 8D        .byte $8D   ; 
- D 0 - - - 0x034DA9 0D:8D99: E9        .byte $E9   ; 
- D 0 - - - 0x034DAA 0D:8D9A: 8D        .byte $8D   ; 
- D 0 - - - 0x034DAB 0D:8D9B: EB        .byte $EB   ; 
- D 0 - - - 0x034DAC 0D:8D9C: 8D        .byte $8D   ; 
- D 0 - - - 0x034DAD 0D:8D9D: F7        .byte $F7   ; 
- D 0 - - - 0x034DAE 0D:8D9E: 8D        .byte $8D   ; 
- - - - - - 0x034DAF 0D:8D9F: 17        .byte $17   ; 
- - - - - - 0x034DB0 0D:8DA0: 8E        .byte $8E   ; 
- - - - - - 0x034DB1 0D:8DA1: 17        .byte $17   ; 
- - - - - - 0x034DB2 0D:8DA2: 8E        .byte $8E   ; 
- D 0 - - - 0x034DB3 0D:8DA3: 17        .byte $17   ; 
- D 0 - - - 0x034DB4 0D:8DA4: 8E        .byte $8E   ; 
- D 0 - - - 0x034DB5 0D:8DA5: 31        .byte $31   ; <1>
- D 0 - - - 0x034DB6 0D:8DA6: 8E        .byte $8E   ; 
- D 0 - - - 0x034DB7 0D:8DA7: 2F        .byte $2F   ; 
- D 0 - - - 0x034DB8 0D:8DA8: 8E        .byte $8E   ; 
- D 0 - I - 0x034DB9 0D:8DA9: C0        .byte $C0   ; 
- D 0 - I - 0x034DBA 0D:8DAA: 40        .byte $40   ; 
- D 0 - I - 0x034DBB 0D:8DAB: 99        .byte $99   ; 
- D 0 - I - 0x034DBC 0D:8DAC: 00        .byte $00   ; 
- D 0 - I - 0x034DBD 0D:8DAD: 99        .byte $99   ; 
- D 0 - I - 0x034DBE 0D:8DAE: 00        .byte $00   ; 
- - - - - - 0x034DBF 0D:8DAF: 00        .byte $00   ; 
- - - - - - 0x034DC0 0D:8DB0: 00        .byte $00   ; 
- D 0 - I - 0x034DC1 0D:8DB1: 99        .byte $99   ; 
- D 0 - I - 0x034DC2 0D:8DB2: 00        .byte $00   ; 
- D 0 - I - 0x034DC3 0D:8DB3: 99        .byte $99   ; 
- D 0 - I - 0x034DC4 0D:8DB4: 00        .byte $00   ; 
- D 0 - I - 0x034DC5 0D:8DB5: C0        .byte $C0   ; 
- D 0 - I - 0x034DC6 0D:8DB6: 40        .byte $40   ; 
- - - - - - 0x034DC7 0D:8DB7: 00        .byte $00   ; 
- - - - - - 0x034DC8 0D:8DB8: 00        .byte $00   ; 
- D 0 - I - 0x034DC9 0D:8DB9: 99        .byte $99   ; 
- D 0 - I - 0x034DCA 0D:8DBA: 00        .byte $00   ; 
- D 0 - I - 0x034DCB 0D:8DBB: C0        .byte $C0   ; 
- D 0 - I - 0x034DCC 0D:8DBC: 40        .byte $40   ; 
- D 0 - I - 0x034DCD 0D:8DBD: 99        .byte $99   ; 
- D 0 - I - 0x034DCE 0D:8DBE: 00        .byte $00   ; 
- - - - - - 0x034DCF 0D:8DBF: 00        .byte $00   ; 
- - - - - - 0x034DD0 0D:8DC0: 00        .byte $00   ; 
- D 0 - I - 0x034DD1 0D:8DC1: 99        .byte $99   ; 
- D 0 - I - 0x034DD2 0D:8DC2: 00        .byte $00   ; 
- D 0 - I - 0x034DD3 0D:8DC3: 99        .byte $99   ; 
- D 0 - I - 0x034DD4 0D:8DC4: 00        .byte $00   ; 
- D 0 - I - 0x034DD5 0D:8DC5: C0        .byte $C0   ; 
- D 0 - I - 0x034DD6 0D:8DC6: 40        .byte $40   ; 
- - - - - - 0x034DD7 0D:8DC7: 00        .byte $00   ; 
- - - - - - 0x034DD8 0D:8DC8: 00        .byte $00   ; 
- D 0 - I - 0x034DD9 0D:8DC9: 80        .byte $80   ; 
- D 0 - I - 0x034DDA 0D:8DCA: 80        .byte $80   ; 
- D 0 - I - 0x034DDB 0D:8DCB: C0        .byte $C0   ; 
- D 0 - I - 0x034DDC 0D:8DCC: 40        .byte $40   ; 
- D 0 - I - 0x034DDD 0D:8DCD: C0        .byte $C0   ; 
- D 0 - I - 0x034DDE 0D:8DCE: 40        .byte $40   ; 
- - - - - - 0x034DDF 0D:8DCF: 00        .byte $00   ; 
- - - - - - 0x034DE0 0D:8DD0: 00        .byte $00   ; 
- D 0 - I - 0x034DE1 0D:8DD1: 99        .byte $99   ; 
- D 0 - I - 0x034DE2 0D:8DD2: 00        .byte $00   ; 
- D 0 - I - 0x034DE3 0D:8DD3: 80        .byte $80   ; 
- D 0 - I - 0x034DE4 0D:8DD4: 80        .byte $80   ; 
- D 0 - I - 0x034DE5 0D:8DD5: 80        .byte $80   ; 
- D 0 - I - 0x034DE6 0D:8DD6: 80        .byte $80   ; 
- - - - - - 0x034DE7 0D:8DD7: 00        .byte $00   ; 
- - - - - - 0x034DE8 0D:8DD8: 00        .byte $00   ; 
- D 0 - I - 0x034DE9 0D:8DD9: 99        .byte $99   ; 
- D 0 - I - 0x034DEA 0D:8DDA: 00        .byte $00   ; 
- D 0 - I - 0x034DEB 0D:8DDB: C0        .byte $C0   ; 
- D 0 - I - 0x034DEC 0D:8DDC: 40        .byte $40   ; 
- D 0 - I - 0x034DED 0D:8DDD: 80        .byte $80   ; 
- D 0 - I - 0x034DEE 0D:8DDE: 80        .byte $80   ; 
- - - - - - 0x034DEF 0D:8DDF: 00        .byte $00   ; 
- - - - - - 0x034DF0 0D:8DE0: 00        .byte $00   ; 
- D 0 - I - 0x034DF1 0D:8DE1: C0        .byte $C0   ; 
- D 0 - I - 0x034DF2 0D:8DE2: 40        .byte $40   ; 
- D 0 - I - 0x034DF3 0D:8DE3: 99        .byte $99   ; 
- D 0 - I - 0x034DF4 0D:8DE4: 00        .byte $00   ; 
- D 0 - I - 0x034DF5 0D:8DE5: 99        .byte $99   ; 
- D 0 - I - 0x034DF6 0D:8DE6: 00        .byte $00   ; 
- - - - - - 0x034DF7 0D:8DE7: 00        .byte $00   ; 
- - - - - - 0x034DF8 0D:8DE8: 00        .byte $00   ; 
- D 0 - I - 0x034DF9 0D:8DE9: 80        .byte $80   ; 
- D 0 - I - 0x034DFA 0D:8DEA: 80        .byte $80   ; 
- D 0 - I - 0x034DFB 0D:8DEB: B3        .byte $B3   ; 
- D 0 - I - 0x034DFC 0D:8DEC: 00        .byte $00   ; 
- D 0 - I - 0x034DFD 0D:8DED: DA        .byte $DA   ; 
- D 0 - I - 0x034DFE 0D:8DEE: 25        .byte $25   ; 
- - - - - - 0x034DFF 0D:8DEF: 00        .byte $00   ; 
- - - - - - 0x034E00 0D:8DF0: 00        .byte $00   ; 
- - - - - - 0x034E01 0D:8DF1: 00        .byte $00   ; 
- - - - - - 0x034E02 0D:8DF2: 00        .byte $00   ; 
- D 0 - I - 0x034E03 0D:8DF3: CD        .byte $CD   ; 
- D 0 - I - 0x034E04 0D:8DF4: 32        .byte $32   ; <2>
- D 0 - I - 0x034E05 0D:8DF5: BF        .byte $BF   ; 
- D 0 - I - 0x034E06 0D:8DF6: 00        .byte $00   ; 
- D 0 - I - 0x034E07 0D:8DF7: C0        .byte $C0   ; 
- D 0 - I - 0x034E08 0D:8DF8: 40        .byte $40   ; 
- - - - - - 0x034E09 0D:8DF9: 00        .byte $00   ; 
- - - - - - 0x034E0A 0D:8DFA: 00        .byte $00   ; 
- - - - - - 0x034E0B 0D:8DFB: 00        .byte $00   ; 
- - - - - - 0x034E0C 0D:8DFC: 00        .byte $00   ; 
- - - - - - 0x034E0D 0D:8DFD: 00        .byte $00   ; 
- - - - - - 0x034E0E 0D:8DFE: 00        .byte $00   ; 
- - - - - - 0x034E0F 0D:8DFF: 00        .byte $00   ; 
- - - - - - 0x034E10 0D:8E00: 00        .byte $00   ; 
- - - - - - 0x034E11 0D:8E01: 00        .byte $00   ; 
- - - - - - 0x034E12 0D:8E02: 00        .byte $00   ; 
- D 0 - I - 0x034E13 0D:8E03: E6        .byte $E6   ; 
- D 0 - I - 0x034E14 0D:8E04: 00        .byte $00   ; 
- - - - - - 0x034E15 0D:8E05: 00        .byte $00   ; 
- - - - - - 0x034E16 0D:8E06: 00        .byte $00   ; 
- - - - - - 0x034E17 0D:8E07: 00        .byte $00   ; 
- - - - - - 0x034E18 0D:8E08: 00        .byte $00   ; 
- - - - - - 0x034E19 0D:8E09: 00        .byte $00   ; 
- - - - - - 0x034E1A 0D:8E0A: 00        .byte $00   ; 
- - - - - - 0x034E1B 0D:8E0B: 00        .byte $00   ; 
- - - - - - 0x034E1C 0D:8E0C: 00        .byte $00   ; 
- - - - - - 0x034E1D 0D:8E0D: 00        .byte $00   ; 
- - - - - - 0x034E1E 0D:8E0E: 00        .byte $00   ; 
- - - - - - 0x034E1F 0D:8E0F: 00        .byte $00   ; 
- - - - - - 0x034E20 0D:8E10: 00        .byte $00   ; 
- - - - - - 0x034E21 0D:8E11: 00        .byte $00   ; 
- - - - - - 0x034E22 0D:8E12: 00        .byte $00   ; 
- D 0 - I - 0x034E23 0D:8E13: 80        .byte $80   ; 
- D 0 - I - 0x034E24 0D:8E14: 80        .byte $80   ; 
- - - - - - 0x034E25 0D:8E15: 00        .byte $00   ; 
- - - - - - 0x034E26 0D:8E16: 00        .byte $00   ; 
- D 0 - I - 0x034E27 0D:8E17: 80        .byte $80   ; 
- D 0 - I - 0x034E28 0D:8E18: 80        .byte $80   ; 
- D 0 - I - 0x034E29 0D:8E19: 80        .byte $80   ; 
- D 0 - I - 0x034E2A 0D:8E1A: 80        .byte $80   ; 
- - - - - - 0x034E2B 0D:8E1B: 00        .byte $00   ; 
- - - - - - 0x034E2C 0D:8E1C: 00        .byte $00   ; 
- - - - - - 0x034E2D 0D:8E1D: 00        .byte $00   ; 
- - - - - - 0x034E2E 0D:8E1E: 00        .byte $00   ; 
- D 0 - I - 0x034E2F 0D:8E1F: C0        .byte $C0   ; 
- D 0 - I - 0x034E30 0D:8E20: 40        .byte $40   ; 
- D 0 - I - 0x034E31 0D:8E21: 80        .byte $80   ; 
- D 0 - I - 0x034E32 0D:8E22: 80        .byte $80   ; 
- - - - - - 0x034E33 0D:8E23: 00        .byte $00   ; 
- - - - - - 0x034E34 0D:8E24: 00        .byte $00   ; 
- - - - - - 0x034E35 0D:8E25: 00        .byte $00   ; 
- - - - - - 0x034E36 0D:8E26: 00        .byte $00   ; 
- D 0 - I - 0x034E37 0D:8E27: 99        .byte $99   ; 
- D 0 - I - 0x034E38 0D:8E28: 00        .byte $00   ; 
- D 0 - I - 0x034E39 0D:8E29: C0        .byte $C0   ; 
- D 0 - I - 0x034E3A 0D:8E2A: 40        .byte $40   ; 
- - - - - - 0x034E3B 0D:8E2B: 00        .byte $00   ; 
- - - - - - 0x034E3C 0D:8E2C: 00        .byte $00   ; 
- - - - - - 0x034E3D 0D:8E2D: 00        .byte $00   ; 
- - - - - - 0x034E3E 0D:8E2E: 00        .byte $00   ; 
- D 0 - I - 0x034E3F 0D:8E2F: 80        .byte $80   ; 
- D 0 - I - 0x034E40 0D:8E30: 80        .byte $80   ; 
- D 0 - I - 0x034E41 0D:8E31: 80        .byte $80   ; 
- D 0 - I - 0x034E42 0D:8E32: 80        .byte $80   ; 
C - - - - - 0x034E43 0D:8E33: AD 00 06  LDA ram_0600
C - - - - - 0x034E46 0D:8E36: F0 35     BEQ $8E6D
C - - - - - 0x034E48 0D:8E38: AE 3D 04  LDX ram_043D
C - - - - - 0x034E4B 0D:8E3B: AD 42 04  LDA ram_0442
C - - - - - 0x034E4E 0D:8E3E: F0 04     BEQ $8E44
C - - - - - 0x034E50 0D:8E40: C9 0B     CMP #$0B
C - - - - - 0x034E52 0D:8E42: D0 06     BNE $8E4A
C - - - - - 0x034E54 0D:8E44: E0 04     CPX #$04
C - - - - - 0x034E56 0D:8E46: F0 25     BEQ $8E6D
C - - - - - 0x034E58 0D:8E48: D0 08     BNE $8E52
C - - - - - 0x034E5A 0D:8E4A: E0 05     CPX #$05
C - - - - - 0x034E5C 0D:8E4C: F0 1F     BEQ $8E6D
C - - - - - 0x034E5E 0D:8E4E: E0 06     CPX #$06
C - - - - - 0x034E60 0D:8E50: F0 1B     BEQ $8E6D
C - - - - - 0x034E62 0D:8E52: 20 9C 8B  JSR $8B9C
C - - - - - 0x034E65 0D:8E55: AD 12 06  LDA ram_0612
C - - - - - 0x034E68 0D:8E58: D0 13     BNE $8E6D
C - - - - - 0x034E6A 0D:8E5A: A9 0F     LDA #$0F
C - - - - - 0x034E6C 0D:8E5C: B0 02     BCS $8E60
C - - - - - 0x034E6E 0D:8E5E: A9 3F     LDA #$3F
C - - - - - 0x034E70 0D:8E60: CD E2 00  CMP a: ram_00E2
C - - - - - 0x034E73 0D:8E63: 90 08     BCC $8E6D
C - - - - - 0x034E75 0D:8E65: A9 04     LDA #$04
C - - - - - 0x034E77 0D:8E67: 8D 12 06  STA ram_0612
C - - - - - 0x034E7A 0D:8E6A: 20 5A C5  JSR $C55A
C - - - - - 0x034E7D 0D:8E6D: 60        RTS
C - - - - - 0x034E7E 0D:8E6E: 8D 41 04  STA ram_0441
C - - - - - 0x034E81 0D:8E71: A2 00     LDX #$00
C - - - - - 0x034E83 0D:8E73: C9 0B     CMP #$0B
C - - - - - 0x034E85 0D:8E75: 90 02     BCC $8E79
C - - - - - 0x034E87 0D:8E77: A2 0B     LDX #$0B
C - - - - - 0x034E89 0D:8E79: 8A        TXA
C - - - - - 0x034E8A 0D:8E7A: 4D FB 05  EOR ram_05FB
C - - - - - 0x034E8D 0D:8E7D: 8E FB 05  STX ram_05FB
C - - - - - 0x034E90 0D:8E80: F0 03     BEQ $8E85
C - - - - - 0x034E92 0D:8E82: 20 6F C5  JSR $C56F
C - - - - - 0x034E95 0D:8E85: 60        RTS
C D 0 - - - 0x034E96 0D:8E86: AD 46 04  LDA ram_0446
C - - - - - 0x034E99 0D:8E89: C9 05     CMP #$05
C - - - - - 0x034E9B 0D:8E8B: F0 5B     BEQ $8EE8
C - - - - - 0x034E9D 0D:8E8D: C9 04     CMP #$04
C - - - - - 0x034E9F 0D:8E8F: D0 57     BNE $8EE8
C - - - - - 0x034EA1 0D:8E91: AD FB 05  LDA ram_05FB
C - - - - - 0x034EA4 0D:8E94: D0 52     BNE $8EE8
C - - - - - 0x034EA6 0D:8E96: AD 41 04  LDA ram_0441
C - - - - - 0x034EA9 0D:8E99: 20 0C C5  JSR $C50C
C - - - - - 0x034EAC 0D:8E9C: A0 00     LDY #$00
C - - - - - 0x034EAE 0D:8E9E: B1 34     LDA (ram_0034),Y
C - - - - - 0x034EB0 0D:8EA0: C9 01     CMP #$01
C - - - - - 0x034EB2 0D:8EA2: F0 44     BEQ $8EE8
C - - - - - 0x034EB4 0D:8EA4: A0 06     LDY #$06
C - - - - - 0x034EB6 0D:8EA6: B1 34     LDA (ram_0034),Y
C - - - - - 0x034EB8 0D:8EA8: 10 3E     BPL $8EE8
C - - - - - 0x034EBA 0D:8EAA: AD 41 04  LDA ram_0441
C - - - - - 0x034EBD 0D:8EAD: 8D FC 05  STA ram_05FC
C - - - - - 0x034EC0 0D:8EB0: A9 01     LDA #$01
C - - - - - 0x034EC2 0D:8EB2: 48        PHA
C - - - - - 0x034EC3 0D:8EB3: 20 0C C5  JSR $C50C
C - - - - - 0x034EC6 0D:8EB6: A0 00     LDY #$00
C - - - - - 0x034EC8 0D:8EB8: B1 34     LDA (ram_0034),Y
C - - - - - 0x034ECA 0D:8EBA: C9 01     CMP #$01
C - - - - - 0x034ECC 0D:8EBC: F0 06     BEQ $8EC4
C - - - - - 0x034ECE 0D:8EBE: 68        PLA
C - - - - - 0x034ECF 0D:8EBF: 18        CLC
C - - - - - 0x034ED0 0D:8EC0: 69 01     ADC #$01
C - - - - - 0x034ED2 0D:8EC2: D0 EE     BNE $8EB2
C - - - - - 0x034ED4 0D:8EC4: 68        PLA
C - - - - - 0x034ED5 0D:8EC5: 8D 41 04  STA ram_0441
C - - - - - 0x034ED8 0D:8EC8: EE 46 04  INC ram_0446
C - - - - - 0x034EDB 0D:8ECB: A9 00     LDA #$00
C - - - - - 0x034EDD 0D:8ECD: 8D 15 06  STA ram_0615
C - - - - - 0x034EE0 0D:8ED0: 8D 2D 06  STA ram_062D
C - - - - - 0x034EE3 0D:8ED3: A9 17     LDA #$17
C - - - - - 0x034EE5 0D:8ED5: 20 4E C5  JSR $C54E
C - - - - - 0x034EE8 0D:8ED8: A9 00     LDA #$00
C - - - - - 0x034EEA 0D:8EDA: 8D 3B 04  STA ram_043B
C - - - - - 0x034EED 0D:8EDD: A9 04     LDA #$04
C - - - - - 0x034EEF 0D:8EDF: 8D 3C 04  STA ram_043C
C - - - - - 0x034EF2 0D:8EE2: A2 50     LDX #$50
C - - - - - 0x034EF4 0D:8EE4: 9A        TXS
C - - - - - 0x034EF5 0D:8EE5: 4C AC 85  JMP $85AC
C - - - - - 0x034EF8 0D:8EE8: 60        RTS
C - - - - - 0x034EF9 0D:8EE9: 20 06 8D  JSR $8D06
C - - - - - 0x034EFC 0D:8EEC: A5 71     LDA ram_0071
C - - - - - 0x034EFE 0D:8EEE: 4A        LSR
C - - - - - 0x034EFF 0D:8EEF: 4A        LSR
C - - - - - 0x034F00 0D:8EF0: 8D 19 06  STA ram_0619
C - - - - - 0x034F03 0D:8EF3: AD 1D 06  LDA ram_061D
C - - - - - 0x034F06 0D:8EF6: 85 70     STA ram_0070
C - - - - - 0x034F08 0D:8EF8: AD 1C 06  LDA ram_061C
C - - - - - 0x034F0B 0D:8EFB: 0A        ASL
C - - - - - 0x034F0C 0D:8EFC: 26 70     ROL ram_0070
C - - - - - 0x034F0E 0D:8EFE: 0A        ASL
C - - - - - 0x034F0F 0D:8EFF: 26 70     ROL ram_0070
C - - - - - 0x034F11 0D:8F01: 0A        ASL
C - - - - - 0x034F12 0D:8F02: 26 70     ROL ram_0070
C - - - - - 0x034F14 0D:8F04: 0A        ASL
C - - - - - 0x034F15 0D:8F05: 26 70     ROL ram_0070
C - - - - - 0x034F17 0D:8F07: 0A        ASL
C - - - - - 0x034F18 0D:8F08: 26 70     ROL ram_0070
C - - - - - 0x034F1A 0D:8F0A: 0A        ASL
C - - - - - 0x034F1B 0D:8F0B: 26 70     ROL ram_0070
C - - - - - 0x034F1D 0D:8F0D: 85 6F     STA ram_006F
C - - - - - 0x034F1F 0D:8F0F: 20 1E C5  JSR $C51E
C - - - - - 0x034F22 0D:8F12: A5 6F     LDA ram_006F
C - - - - - 0x034F24 0D:8F14: A4 70     LDY ram_0070
C - - - - - 0x034F26 0D:8F16: F0 02     BEQ $8F1A
C - - - - - 0x034F28 0D:8F18: A9 FF     LDA #$FF
C - - - - - 0x034F2A 0D:8F1A: A2 00     LDX #$00
C - - - - - 0x034F2C 0D:8F1C: A0 00     LDY #$00
C - - - - - 0x034F2E 0D:8F1E: 60        RTS
C - - - - - 0x034F2F 0D:8F1F: 20 06 8D  JSR $8D06
C - - - - - 0x034F32 0D:8F22: AD 1C 06  LDA ram_061C
C - - - - - 0x034F35 0D:8F25: 85 67     STA ram_0067
C - - - - - 0x034F37 0D:8F27: AD 1D 06  LDA ram_061D
C - - - - - 0x034F3A 0D:8F2A: 85 68     STA ram_0068
C - - - - - 0x034F3C 0D:8F2C: A9 C0     LDA #$C0
C - - - - - 0x034F3E 0D:8F2E: 85 69     STA ram_0069
C - - - - - 0x034F40 0D:8F30: A9 00     LDA #$00
C - - - - - 0x034F42 0D:8F32: 85 6A     STA ram_006A
C - - - - - 0x034F44 0D:8F34: 20 21 C5  JSR $C521
C - - - - - 0x034F47 0D:8F37: A5 6B     LDA ram_006B
C - - - - - 0x034F49 0D:8F39: 85 6F     STA ram_006F
C - - - - - 0x034F4B 0D:8F3B: A5 6C     LDA ram_006C
C - - - - - 0x034F4D 0D:8F3D: 85 70     STA ram_0070
C - - - - - 0x034F4F 0D:8F3F: 20 1E C5  JSR $C51E
C - - - - - 0x034F52 0D:8F42: A5 6F     LDA ram_006F
C - - - - - 0x034F54 0D:8F44: A4 70     LDY ram_0070
C - - - - - 0x034F56 0D:8F46: F0 02     BEQ $8F4A
C - - - - - 0x034F58 0D:8F48: A9 FF     LDA #$FF
C - - - - - 0x034F5A 0D:8F4A: 85 3A     STA ram_003A
C - - - - - 0x034F5C 0D:8F4C: 20 59 8F  JSR $8F59
C - - - - - 0x034F5F 0D:8F4F: 18        CLC
C - - - - - 0x034F60 0D:8F50: 65 3A     ADC ram_003A
C - - - - - 0x034F62 0D:8F52: 90 02     BCC $8F56
C - - - - - 0x034F64 0D:8F54: A9 FF     LDA #$FF
C - - - - - 0x034F66 0D:8F56: A0 00     LDY #$00
C - - - - - 0x034F68 0D:8F58: 60        RTS
C - - - - - 0x034F69 0D:8F59: 20 51 C5  JSR $C551
C - - - - - 0x034F6C 0D:8F5C: A0 05     LDY #$05
C - - - - - 0x034F6E 0D:8F5E: B1 34     LDA (ram_0034),Y
C - - - - - 0x034F70 0D:8F60: 38        SEC
C - - - - - 0x034F71 0D:8F61: ED 2B 06  SBC ram_062B
C - - - - - 0x034F74 0D:8F64: B0 02     BCS $8F68
C - - - - - 0x034F76 0D:8F66: A9 00     LDA #$00
C - - - - - 0x034F78 0D:8F68: A0 07     LDY #$07
C - - - - - 0x034F7A 0D:8F6A: 18        CLC
C - - - - - 0x034F7B 0D:8F6B: 71 34     ADC (ram_0034),Y
C - - - - - 0x034F7D 0D:8F6D: 90 02     BCC $8F71
- - - - - - 0x034F7F 0D:8F6F: A9        .byte $A9   ; 
- - - - - - 0x034F80 0D:8F70: FF        .byte $FF   ; 
C - - - - - 0x034F81 0D:8F71: 60        RTS
C D 0 - - - 0x034F82 0D:8F72: AD 41 04  LDA ram_0441
C - - - - - 0x034F85 0D:8F75: A9 06     LDA #$06
C - - - - - 0x034F87 0D:8F77: 20 4B C5  JSR $C54B
C - - - - - 0x034F8A 0D:8F7A: A9 00     LDA #$00
C - - - - - 0x034F8C 0D:8F7C: 85 3A     STA ram_003A
C - - - - - 0x034F8E 0D:8F7E: AD FB 05  LDA ram_05FB
C - - - - - 0x034F91 0D:8F81: D0 17     BNE $8F9A
C - - - - - 0x034F93 0D:8F83: AD 3B 04  LDA ram_043B
C - - - - - 0x034F96 0D:8F86: C9 02     CMP #$02
C - - - - - 0x034F98 0D:8F88: D0 0D     BNE $8F97
C - - - - - 0x034F9A 0D:8F8A: AD 00 06  LDA ram_0600
C - - - - - 0x034F9D 0D:8F8D: D0 08     BNE $8F97
C - - - - - 0x034F9F 0D:8F8F: A9 00     LDA #$00
C - - - - - 0x034FA1 0D:8F91: 8D 3F 04  STA ram_043F
C - - - - - 0x034FA4 0D:8F94: 8D 40 04  STA ram_0440
C - - - - - 0x034FA7 0D:8F97: 20 FB 8F  JSR $8FFB
C - - - - - 0x034FAA 0D:8F9A: 24 3A     BIT ram_003A
C - - - - - 0x034FAC 0D:8F9C: 30 0F     BMI $8FAD
C - - - - - 0x034FAE 0D:8F9E: AD E2 00  LDA a: ram_00E2
C - - - - - 0x034FB1 0D:8FA1: C9 08     CMP #$08
C - - - - - 0x034FB3 0D:8FA3: B0 08     BCS $8FAD
C - - - - - 0x034FB5 0D:8FA5: AD 3C 04  LDA ram_043C
C - - - - - 0x034FB8 0D:8FA8: 09 80     ORA #$80
C - - - - - 0x034FBA 0D:8FAA: 8D 3C 04  STA ram_043C
C - - - - - 0x034FBD 0D:8FAD: A2 00     LDX #$00
C - - - - - 0x034FBF 0D:8FAF: AD E2 00  LDA a: ram_00E2
C - - - - - 0x034FC2 0D:8FB2: 6D E3 00  ADC a: ram_00E3
C - - - - - 0x034FC5 0D:8FB5: 6A        ROR
C - - - - - 0x034FC6 0D:8FB6: 09 80     ORA #$80
C - - - - - 0x034FC8 0D:8FB8: 2C 3C 04  BIT ram_043C
C - - - - - 0x034FCB 0D:8FBB: 10 03     BPL $8FC0
C - - - - - 0x034FCD 0D:8FBD: E8        INX
C - - - - - 0x034FCE 0D:8FBE: 29 7F     AND #$7F
C - - - - - 0x034FD0 0D:8FC0: 69 00     ADC #$00
C - - - - - 0x034FD2 0D:8FC2: 90 01     BCC $8FC5
C - - - - - 0x034FD4 0D:8FC4: E8        INX
C - - - - - 0x034FD5 0D:8FC5: 85 67     STA ram_0067
C - - - - - 0x034FD7 0D:8FC7: 86 68     STX ram_0068
C - - - - - 0x034FD9 0D:8FC9: 24 3A     BIT ram_003A
C - - - - - 0x034FDB 0D:8FCB: 10 10     BPL $8FDD
C - - - - - 0x034FDD 0D:8FCD: 46 33     LSR ram_0033
C - - - - - 0x034FDF 0D:8FCF: 66 32     ROR ram_0032
C - - - - - 0x034FE1 0D:8FD1: 46 33     LSR ram_0033
C - - - - - 0x034FE3 0D:8FD3: 66 32     ROR ram_0032
C - - - - - 0x034FE5 0D:8FD5: 46 33     LSR ram_0033