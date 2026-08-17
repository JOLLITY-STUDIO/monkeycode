; bank_31.asm 分片 2/7 (原文件行 1001-2000, 共 6131 行)

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