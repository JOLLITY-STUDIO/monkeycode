; bank_26.asm 分片 4/5 (原文件行 3001-4000, 共 4071 行)

C - - - - - 0x03583E 0D:982E: 48        PHA
C - - - - - 0x03583F 0D:982F: A9 01     LDA #$01
C - - - - - 0x035841 0D:9831: 20 15 C5  JSR $C515
C - - - - - 0x035844 0D:9834: AD 15 05  LDA ram_0515
C - - - - - 0x035847 0D:9837: D0 F6     BNE $982F
C - - - - - 0x035849 0D:9839: A9 01     LDA #$01
C - - - - - 0x03584B 0D:983B: 8D 15 05  STA ram_0515
C - - - - - 0x03584E 0D:983E: A0 01     LDY #$01
C - - - - - 0x035850 0D:9840: 8C A5 04  STY ram_04A5
C - - - - - 0x035853 0D:9843: 88        DEY
C - - - - - 0x035854 0D:9844: 8C A9 04  STY ram_04A9
C - - - - - 0x035857 0D:9847: 8E A8 04  STX ram_04A8
C - - - - - 0x03585A 0D:984A: 68        PLA
C - - - - - 0x03585B 0D:984B: 8C A6 04  STY ram_04A6
C - - - - - 0x03585E 0D:984E: 4A        LSR
C - - - - - 0x03585F 0D:984F: 6E A6 04  ROR ram_04A6
C - - - - - 0x035862 0D:9852: 4A        LSR
C - - - - - 0x035863 0D:9853: 6E A6 04  ROR ram_04A6
C - - - - - 0x035866 0D:9856: 48        PHA
C - - - - - 0x035867 0D:9857: AD A6 04  LDA ram_04A6
C - - - - - 0x03586A 0D:985A: 69 02     ADC #$02
C - - - - - 0x03586C 0D:985C: 8D A6 04  STA ram_04A6
C - - - - - 0x03586F 0D:985F: 68        PLA
C - - - - - 0x035870 0D:9860: 69 21     ADC #$21
C - - - - - 0x035872 0D:9862: 8D A7 04  STA ram_04A7
C - - - - - 0x035875 0D:9865: A9 80     LDA #$80
C - - - - - 0x035877 0D:9867: 8D 15 05  STA ram_0515
C - - - - - 0x03587A 0D:986A: 60        RTS
C - - - - - 0x03587B 0D:986B: A9 01     LDA #$01
C - - - - - 0x03587D 0D:986D: 8D 41 04  STA ram_0441
C - - - - - 0x035880 0D:9870: A9 3F     LDA #$3F
C - - - - - 0x035882 0D:9872: 20 2A C5  JSR $C52A
C - - - - - 0x035885 0D:9875: A9 40     LDA #$40
C - - - - - 0x035887 0D:9877: 20 2A C5  JSR $C52A
C - - - - - 0x03588A 0D:987A: 60        RTS
C - - - - - 0x03588B 0D:987B: A9 37     LDA #$37
C - - - - - 0x03588D 0D:987D: 20 4E C5  JSR $C54E
C - - - - - 0x035890 0D:9880: A9 00     LDA #$00
C - - - - - 0x035892 0D:9882: 85 11     STA ram_0011
C - - - - - 0x035894 0D:9884: 85 12     STA ram_0012
C - - - - - 0x035896 0D:9886: A9 01     LDA #$01
C - - - - - 0x035898 0D:9888: 20 15 C5  JSR $C515
C - - - - - 0x03589B 0D:988B: 20 2D C5  JSR $C52D
C - - - - - 0x03589E 0D:988E: A9 2E     LDA #$2E
C - - - - - 0x0358A0 0D:9890: 85 87     STA ram_0087
C - - - - - 0x0358A2 0D:9892: A9 00     LDA #$00
C - - - - - 0x0358A4 0D:9894: 8D 2D 06  STA ram_062D
C - - - - - 0x0358A7 0D:9897: 20 0C 99  JSR $990C
C - - - - - 0x0358AA 0D:989A: A9 33     LDA #$33
C - - - - - 0x0358AC 0D:989C: 20 2A C5  JSR $C52A
C - - - - - 0x0358AF 0D:989F: A9 04     LDA #$04
C - - - - - 0x0358B1 0D:98A1: 8D 24 06  STA ram_0624
C - - - - - 0x0358B4 0D:98A4: 20 1B 9D  JSR $9D1B
C - - - - - 0x0358B7 0D:98A7: A9 01     LDA #$01
C - - - - - 0x0358B9 0D:98A9: 20 15 C5  JSR $C515
C - - - - - 0x0358BC 0D:98AC: A9 0C     LDA #$0C
C - - - - - 0x0358BE 0D:98AE: 2D 1E 00  AND a: ram_001E
C - - - - - 0x0358C1 0D:98B1: F0 0B     BEQ $98BE
C - - - - - 0x0358C3 0D:98B3: AD 24 06  LDA ram_0624
C - - - - - 0x0358C6 0D:98B6: 49 40     EOR #$40
C - - - - - 0x0358C8 0D:98B8: 8D 24 06  STA ram_0624
C - - - - - 0x0358CB 0D:98BB: 20 1B 9D  JSR $9D1B
C - - - - - 0x0358CE 0D:98BE: 2C 1C 00  BIT a: ram_001C
C - - - - - 0x0358D1 0D:98C1: 10 E4     BPL $98A7
C - - - - - 0x0358D3 0D:98C3: 20 0C 99  JSR $990C
C - - - - - 0x0358D6 0D:98C6: 2C 24 06  BIT ram_0624
C - - - - - 0x0358D9 0D:98C9: 70 05     BVS $98D0
C - - - - - 0x0358DB 0D:98CB: A9 02     LDA #$02
C - - - - - 0x0358DD 0D:98CD: 85 87     STA ram_0087
C - - - - - 0x0358DF 0D:98CF: 60        RTS
C - - - - - 0x0358E0 0D:98D0: A9 00     LDA #$00
C - - - - - 0x0358E2 0D:98D2: 8D 24 06  STA ram_0624
C D 0 - - - 0x0358E5 0D:98D5: A9 34     LDA #$34
C - - - - - 0x0358E7 0D:98D7: 20 2A C5  JSR $C52A
C - - - - - 0x0358EA 0D:98DA: A9 03     LDA #$03
C - - - - - 0x0358EC 0D:98DC: 8D 3D 06  STA ram_063D
C - - - - - 0x0358EF 0D:98DF: 20 66 C5  JSR $C566
C - - - - - 0x0358F2 0D:98E2: A9 85     LDA #$85
C - - - - - 0x0358F4 0D:98E4: 8D 2D 06  STA ram_062D
C - - - - - 0x0358F7 0D:98E7: AD 24 06  LDA ram_0624
C - - - - - 0x0358FA 0D:98EA: 8D 22 06  STA ram_0622
C - - - - - 0x0358FD 0D:98ED: A9 04     LDA #$04
C - - - - - 0x0358FF 0D:98EF: 20 63 C5  JSR $C563
C - - - - - 0x035902 0D:98F2: 90 9E     BCC $9892
C - - - - - 0x035904 0D:98F4: C9 04     CMP #$04
C - - - - - 0x035906 0D:98F6: F0 9A     BEQ $9892
C - - - - - 0x035908 0D:98F8: 8D 24 06  STA ram_0624
C - - - - - 0x03590B 0D:98FB: 20 01 99  JSR $9901
C - - - - - 0x03590E 0D:98FE: 4C D5 98  JMP $98D5
C - - - - - 0x035911 0D:9901: 20 09 C5  JSR $C509
- D 0 - I - 0x035914 0D:9904: 1A        .byte $1A   ; 
- D 0 - I - 0x035915 0D:9905: 99        .byte $99   ; 
- D 0 - I - 0x035916 0D:9906: 3A        .byte $3A   ; 
- D 0 - I - 0x035917 0D:9907: 99        .byte $99   ; 
- D 0 - I - 0x035918 0D:9908: 50        .byte $50   ; <P>
- D 0 - I - 0x035919 0D:9909: 99        .byte $99   ; 
- D 0 - I - 0x03591A 0D:990A: AD        .byte $AD   ; 
- D 0 - I - 0x03591B 0D:990B: 9B        .byte $9B   ; 
C D 0 - - - 0x03591C 0D:990C: 20 2D C5  JSR $C52D
C - - - - - 0x03591F 0D:990F: A9 00     LDA #$00
C - - - - - 0x035921 0D:9911: 20 2A C5  JSR $C52A
C - - - - - 0x035924 0D:9914: A9 01     LDA #$01
C - - - - - 0x035926 0D:9916: 20 2A C5  JSR $C52A
C - - - - - 0x035929 0D:9919: 60        RTS
C - - J - - 0x03592A 0D:991A: A9 35     LDA #$35
C - - - - - 0x03592C 0D:991C: 20 2A C5  JSR $C52A
C - - - - - 0x03592F 0D:991F: AD 2C 00  LDA a: ram_002C
C - - - - - 0x035932 0D:9922: 8D 22 06  STA ram_0622
C - - - - - 0x035935 0D:9925: AD 2C 00  LDA a: ram_002C
C - - - - - 0x035938 0D:9928: 8D 27 06  STA ram_0627
C - - - - - 0x03593B 0D:992B: A9 05     LDA #$05
C - - - - - 0x03593D 0D:992D: 20 63 C5  JSR $C563
C - - - - - 0x035940 0D:9930: AE 27 06  LDX ram_0627
C - - - - - 0x035943 0D:9933: 90 01     BCC $9936
C - - - - - 0x035945 0D:9935: AA        TAX
C - - - - - 0x035946 0D:9936: 8E 2C 00  STX a: ram_002C
C - - - - - 0x035949 0D:9939: 60        RTS
C - - J - - 0x03594A 0D:993A: A9 36     LDA #$36
C - - - - - 0x03594C 0D:993C: 20 2A C5  JSR $C52A
C - - - - - 0x03594F 0D:993F: AD 2D 00  LDA a: ram_002D
C - - - - - 0x035952 0D:9942: 8D 22 06  STA ram_0622
C - - - - - 0x035955 0D:9945: A9 06     LDA #$06
C - - - - - 0x035957 0D:9947: 20 63 C5  JSR $C563
C - - - - - 0x03595A 0D:994A: 90 03     BCC $994F
C - - - - - 0x03595C 0D:994C: 8D 2D 00  STA a: ram_002D
C - - - - - 0x03595F 0D:994F: 60        RTS
C - - J - - 0x035960 0D:9950: AD 2A 00  LDA a: ram_002A
C - - - - - 0x035963 0D:9953: C9 02     CMP #$02
C - - - - - 0x035965 0D:9955: F0 03     BEQ $995A
C - - - - - 0x035967 0D:9957: 4C C7 9A  JMP $9AC7
C - - - - - 0x03596A 0D:995A: A9 37     LDA #$37
C - - - - - 0x03596C 0D:995C: 20 2A C5  JSR $C52A
C - - - - - 0x03596F 0D:995F: A9 00     LDA #$00
C - - - - - 0x035971 0D:9961: 8D 22 06  STA ram_0622
C - - - - - 0x035974 0D:9964: A9 07     LDA #$07
C - - - - - 0x035976 0D:9966: 20 63 C5  JSR $C563
C - - - - - 0x035979 0D:9969: B0 01     BCS $996C
C - - - - - 0x03597B 0D:996B: 60        RTS
C - - - - - 0x03597C 0D:996C: 20 72 99  JSR $9972
C - - - - - 0x03597F 0D:996F: 4C 0C 99  JMP $990C
C - - - - - 0x035982 0D:9972: 20 09 C5  JSR $C509
- D 0 - I - 0x035985 0D:9975: 79        .byte $79   ; <y>
- D 0 - I - 0x035986 0D:9976: 99        .byte $99   ; 
- D 0 - I - 0x035987 0D:9977: C7        .byte $C7   ; 
- D 0 - I - 0x035988 0D:9978: 9A        .byte $9A   ; 
C - - J - - 0x035989 0D:9979: AD 50 04  LDA ram_0450
C - - - - - 0x03598C 0D:997C: C9 03     CMP #$03
C - - - - - 0x03598E 0D:997E: 90 12     BCC $9992
C - - - - - 0x035990 0D:9980: A9 38     LDA #$38
C - - - - - 0x035992 0D:9982: 20 2A C5  JSR $C52A
C - - - - - 0x035995 0D:9985: A9 01     LDA #$01
C - - - - - 0x035997 0D:9987: 20 15 C5  JSR $C515
C - - - - - 0x03599A 0D:998A: A9 C0     LDA #$C0
C - - - - - 0x03599C 0D:998C: 2D 1E 00  AND a: ram_001E
C - - - - - 0x03599F 0D:998F: F0 F4     BEQ $9985
C - - - - - 0x0359A1 0D:9991: 60        RTS
C - - - - - 0x0359A2 0D:9992: A9 00     LDA #$00
C - - - - - 0x0359A4 0D:9994: 8D 2D 06  STA ram_062D
C - - - - - 0x0359A7 0D:9997: A9 3A     LDA #$3A
C - - - - - 0x0359A9 0D:9999: 20 2A C5  JSR $C52A
C - - - - - 0x0359AC 0D:999C: A9 00     LDA #$00
C - - - - - 0x0359AE 0D:999E: 48        PHA
C - - - - - 0x0359AF 0D:999F: 20 AC 9A  JSR $9AAC
C - - - - - 0x0359B2 0D:99A2: 90 09     BCC $99AD
C - - - - - 0x0359B4 0D:99A4: 68        PLA
C - - - - - 0x0359B5 0D:99A5: 48        PHA
C - - - - - 0x0359B6 0D:99A6: A0 2C     LDY #$2C
C - - - - - 0x0359B8 0D:99A8: A2 B2     LDX #$B2
C - - - - - 0x0359BA 0D:99AA: 20 41 9F  JSR $9F41
C - - - - - 0x0359BD 0D:99AD: 68        PLA
C - - - - - 0x0359BE 0D:99AE: 18        CLC
C - - - - - 0x0359BF 0D:99AF: 69 01     ADC #$01
C - - - - - 0x0359C1 0D:99B1: C9 0A     CMP #$0A
C - - - - - 0x0359C3 0D:99B3: D0 E9     BNE $999E
C - - - - - 0x0359C5 0D:99B5: A9 00     LDA #$00
C - - - - - 0x0359C7 0D:99B7: 48        PHA
C - - - - - 0x0359C8 0D:99B8: 20 AC 9A  JSR $9AAC
C - - - - - 0x0359CB 0D:99BB: 68        PLA
C - - - - - 0x0359CC 0D:99BC: 90 07     BCC $99C5
C - - - - - 0x0359CE 0D:99BE: 18        CLC
C - - - - - 0x0359CF 0D:99BF: 69 01     ADC #$01
C - - - - - 0x0359D1 0D:99C1: C9 0A     CMP #$0A
C - - - - - 0x0359D3 0D:99C3: D0 F2     BNE $99B7
C - - - - - 0x0359D5 0D:99C5: 8D 25 06  STA ram_0625
C - - - - - 0x0359D8 0D:99C8: A0 2C     LDY #$2C
C - - - - - 0x0359DA 0D:99CA: 20 37 9F  JSR $9F37
C - - - - - 0x0359DD 0D:99CD: A9 01     LDA #$01
C - - - - - 0x0359DF 0D:99CF: 20 15 C5  JSR $C515
C - - - - - 0x0359E2 0D:99D2: AD 25 06  LDA ram_0625
C - - - - - 0x0359E5 0D:99D5: 20 90 9B  JSR $9B90
C - - - - - 0x0359E8 0D:99D8: 90 24     BCC $99FE
C - - - - - 0x0359EA 0D:99DA: BD 0F 9F  LDA $9F0F,X
C - - - - - 0x0359ED 0D:99DD: 48        PHA
C - - - - - 0x0359EE 0D:99DE: 20 AC 9A  JSR $9AAC
C - - - - - 0x0359F1 0D:99E1: 68        PLA
C - - - - - 0x0359F2 0D:99E2: 90 08     BCC $99EC
C - - - - - 0x0359F4 0D:99E4: A6 3A     LDX ram_003A
C - - - - - 0x0359F6 0D:99E6: 20 A4 9B  JSR $9BA4
C - - - - - 0x0359F9 0D:99E9: 4C DA 99  JMP $99DA
C - - - - - 0x0359FC 0D:99EC: 48        PHA
C - - - - - 0x0359FD 0D:99ED: AD 25 06  LDA ram_0625
C - - - - - 0x035A00 0D:99F0: A0 2C     LDY #$2C
C - - - - - 0x035A02 0D:99F2: 20 3F 9F  JSR $9F3F
C - - - - - 0x035A05 0D:99F5: 68        PLA
C - - - - - 0x035A06 0D:99F6: 8D 25 06  STA ram_0625
C - - - - - 0x035A09 0D:99F9: A0 2C     LDY #$2C
C - - - - - 0x035A0B 0D:99FB: 20 37 9F  JSR $9F37
C - - - - - 0x035A0E 0D:99FE: A9 80     LDA #$80
C - - - - - 0x035A10 0D:9A00: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035A13 0D:9A03: D0 08     BNE $9A0D
C - - - - - 0x035A15 0D:9A05: A9 40     LDA #$40
C - - - - - 0x035A17 0D:9A07: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035A1A 0D:9A0A: F0 C1     BEQ $99CD
C - - - - - 0x035A1C 0D:9A0C: 60        RTS
C - - - - - 0x035A1D 0D:9A0D: A9 3B     LDA #$3B
C - - - - - 0x035A1F 0D:9A0F: 20 2A C5  JSR $C52A
C - - - - - 0x035A22 0D:9A12: A9 01     LDA #$01
C - - - - - 0x035A24 0D:9A14: AE 25 06  LDX ram_0625
C - - - - - 0x035A27 0D:9A17: E0 08     CPX #$08
C - - - - - 0x035A29 0D:9A19: 90 02     BCC $9A1D
C - - - - - 0x035A2B 0D:9A1B: A9 00     LDA #$00
C - - - - - 0x035A2D 0D:9A1D: 8D 26 06  STA ram_0626
C - - - - - 0x035A30 0D:9A20: A0 16     LDY #$16
C - - - - - 0x035A32 0D:9A22: 20 37 9F  JSR $9F37
C - - - - - 0x035A35 0D:9A25: A9 01     LDA #$01
C - - - - - 0x035A37 0D:9A27: 20 15 C5  JSR $C515
C - - - - - 0x035A3A 0D:9A2A: AD 26 06  LDA ram_0626
C - - - - - 0x035A3D 0D:9A2D: F0 1A     BEQ $9A49
C - - - - - 0x035A3F 0D:9A2F: 20 90 9B  JSR $9B90
C - - - - - 0x035A42 0D:9A32: 90 15     BCC $9A49
C - - - - - 0x035A44 0D:9A34: BD B7 9E  LDA $9EB7,X
C - - - - - 0x035A47 0D:9A37: 48        PHA
C - - - - - 0x035A48 0D:9A38: AD 26 06  LDA ram_0626
C - - - - - 0x035A4B 0D:9A3B: A0 16     LDY #$16
C - - - - - 0x035A4D 0D:9A3D: 20 3F 9F  JSR $9F3F
C - - - - - 0x035A50 0D:9A40: 68        PLA
C - - - - - 0x035A51 0D:9A41: 8D 26 06  STA ram_0626
C - - - - - 0x035A54 0D:9A44: A0 16     LDY #$16
C - - - - - 0x035A56 0D:9A46: 20 37 9F  JSR $9F37
C - - - - - 0x035A59 0D:9A49: A9 40     LDA #$40
C - - - - - 0x035A5B 0D:9A4B: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035A5E 0D:9A4E: F0 03     BEQ $9A53
C - - - - - 0x035A60 0D:9A50: 4C 79 99  JMP $9979
C - - - - - 0x035A63 0D:9A53: A9 80     LDA #$80
C - - - - - 0x035A65 0D:9A55: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035A68 0D:9A58: F0 CB     BEQ $9A25
C - - - - - 0x035A6A 0D:9A5A: AD 25 06  LDA ram_0625
C - - - - - 0x035A6D 0D:9A5D: 18        CLC
C - - - - - 0x035A6E 0D:9A5E: 69 16     ADC #$16
C - - - - - 0x035A70 0D:9A60: 20 0C C5  JSR $C50C
C - - - - - 0x035A73 0D:9A63: A5 34     LDA ram_0034
C - - - - - 0x035A75 0D:9A65: 85 3A     STA ram_003A
C - - - - - 0x035A77 0D:9A67: A5 35     LDA ram_0035
C - - - - - 0x035A79 0D:9A69: 85 3B     STA ram_003B
C - - - - - 0x035A7B 0D:9A6B: AD 26 06  LDA ram_0626
C - - - - - 0x035A7E 0D:9A6E: 20 0C C5  JSR $C50C
C - - - - - 0x035A81 0D:9A71: A0 00     LDY #$00
C - - - - - 0x035A83 0D:9A73: B1 3A     LDA (ram_003A),Y
C - - - - - 0x035A85 0D:9A75: AA        TAX
C - - - - - 0x035A86 0D:9A76: B1 34     LDA (ram_0034),Y
C - - - - - 0x035A88 0D:9A78: 91 3A     STA (ram_003A),Y
C - - - - - 0x035A8A 0D:9A7A: 8A        TXA
C - - - - - 0x035A8B 0D:9A7B: 91 34     STA (ram_0034),Y
C - - - - - 0x035A8D 0D:9A7D: C8        INY
C - - - - - 0x035A8E 0D:9A7E: C0 04     CPY #$04
C - - - - - 0x035A90 0D:9A80: D0 F1     BNE $9A73
C - - - - - 0x035A92 0D:9A82: A0 00     LDY #$00
C - - - - - 0x035A94 0D:9A84: B1 3A     LDA (ram_003A),Y
C - - - - - 0x035A96 0D:9A86: AE 50 04  LDX ram_0450
C - - - - - 0x035A99 0D:9A89: 9D 51 04  STA ram_0451,X
C - - - - - 0x035A9C 0D:9A8C: E8        INX
C - - - - - 0x035A9D 0D:9A8D: 8E 50 04  STX ram_0450
C - - - - - 0x035AA0 0D:9A90: A9 3B     LDA #$3B
C - - - - - 0x035AA2 0D:9A92: 20 2A C5  JSR $C52A
C - - - - - 0x035AA5 0D:9A95: A9 01     LDA #$01
C - - - - - 0x035AA7 0D:9A97: 20 15 C5  JSR $C515
C - - - - - 0x035AAA 0D:9A9A: AD 1C 00  LDA a: ram_001C
C - - - - - 0x035AAD 0D:9A9D: 29 C0     AND #$C0
C - - - - - 0x035AAF 0D:9A9F: F0 F4     BEQ $9A95
C - - - - - 0x035AB1 0D:9AA1: AE 50 04  LDX ram_0450
C - - - - - 0x035AB4 0D:9AA4: E0 03     CPX #$03
C - - - - - 0x035AB6 0D:9AA6: B0 03     BCS $9AAB
C - - - - - 0x035AB8 0D:9AA8: 4C 79 99  JMP $9979
C - - - - - 0x035ABB 0D:9AAB: 60        RTS
C - - - - - 0x035ABC 0D:9AAC: 18        CLC
C - - - - - 0x035ABD 0D:9AAD: 69 16     ADC #$16
C - - - - - 0x035ABF 0D:9AAF: 20 0C C5  JSR $C50C
C - - - - - 0x035AC2 0D:9AB2: A0 00     LDY #$00
C - - - - - 0x035AC4 0D:9AB4: B1 34     LDA (ram_0034),Y
C - - - - - 0x035AC6 0D:9AB6: AE 50 04  LDX ram_0450
C - - - - - 0x035AC9 0D:9AB9: F0 0A     BEQ $9AC5
C - - - - - 0x035ACB 0D:9ABB: DD 50 04  CMP ram_0450,X
C - - - - - 0x035ACE 0D:9ABE: D0 02     BNE $9AC2
C - - - - - 0x035AD0 0D:9AC0: 38        SEC
C - - - - - 0x035AD1 0D:9AC1: 60        RTS
C - - - - - 0x035AD2 0D:9AC2: CA        DEX
C - - - - - 0x035AD3 0D:9AC3: D0 F6     BNE $9ABB
C - - - - - 0x035AD5 0D:9AC5: 18        CLC
C - - - - - 0x035AD6 0D:9AC6: 60        RTS
C D 0 - - - 0x035AD7 0D:9AC7: A9 00     LDA #$00
C - - - - - 0x035AD9 0D:9AC9: 8D 2D 06  STA ram_062D
C - - - - - 0x035ADC 0D:9ACC: A9 39     LDA #$39
C - - - - - 0x035ADE 0D:9ACE: 20 2A C5  JSR $C52A
C - - - - - 0x035AE1 0D:9AD1: A9 01     LDA #$01
C - - - - - 0x035AE3 0D:9AD3: 8D 25 06  STA ram_0625
C - - - - - 0x035AE6 0D:9AD6: A0 16     LDY #$16
C - - - - - 0x035AE8 0D:9AD8: 20 37 9F  JSR $9F37
C D 0 - - - 0x035AEB 0D:9ADB: A9 01     LDA #$01
C - - - - - 0x035AED 0D:9ADD: 20 15 C5  JSR $C515
C - - - - - 0x035AF0 0D:9AE0: AD 25 06  LDA ram_0625
C - - - - - 0x035AF3 0D:9AE3: 20 90 9B  JSR $9B90
C - - - - - 0x035AF6 0D:9AE6: 90 15     BCC $9AFD
C - - - - - 0x035AF8 0D:9AE8: BD B7 9E  LDA $9EB7,X
C - - - - - 0x035AFB 0D:9AEB: 48        PHA
C - - - - - 0x035AFC 0D:9AEC: AD 25 06  LDA ram_0625
C - - - - - 0x035AFF 0D:9AEF: A0 16     LDY #$16
C - - - - - 0x035B01 0D:9AF1: 20 3F 9F  JSR $9F3F
C - - - - - 0x035B04 0D:9AF4: 68        PLA
C - - - - - 0x035B05 0D:9AF5: 8D 25 06  STA ram_0625
C - - - - - 0x035B08 0D:9AF8: A0 16     LDY #$16
C - - - - - 0x035B0A 0D:9AFA: 20 37 9F  JSR $9F37
C - - - - - 0x035B0D 0D:9AFD: A9 80     LDA #$80
C - - - - - 0x035B0F 0D:9AFF: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035B12 0D:9B02: D0 0B     BNE $9B0F
C - - - - - 0x035B14 0D:9B04: A9 40     LDA #$40
C - - - - - 0x035B16 0D:9B06: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035B19 0D:9B09: F0 D0     BEQ $9ADB
C - - - - - 0x035B1B 0D:9B0B: 20 0C 99  JSR $990C
C - - - - - 0x035B1E 0D:9B0E: 60        RTS
C - - - - - 0x035B1F 0D:9B0F: A9 01     LDA #$01
C - - - - - 0x035B21 0D:9B11: CD 25 06  CMP ram_0625
C - - - - - 0x035B24 0D:9B14: D0 02     BNE $9B18
C - - - - - 0x035B26 0D:9B16: A9 02     LDA #$02
C - - - - - 0x035B28 0D:9B18: 8D 26 06  STA ram_0626
C - - - - - 0x035B2B 0D:9B1B: A0 16     LDY #$16
C - - - - - 0x035B2D 0D:9B1D: 20 37 9F  JSR $9F37
C - - - - - 0x035B30 0D:9B20: A9 01     LDA #$01
C - - - - - 0x035B32 0D:9B22: 20 15 C5  JSR $C515
C - - - - - 0x035B35 0D:9B25: AD 26 06  LDA ram_0626
C - - - - - 0x035B38 0D:9B28: 20 90 9B  JSR $9B90
C - - - - - 0x035B3B 0D:9B2B: 90 22     BCC $9B4F
C - - - - - 0x035B3D 0D:9B2D: BD B7 9E  LDA $9EB7,X
C - - - - - 0x035B40 0D:9B30: CD 25 06  CMP ram_0625
C - - - - - 0x035B43 0D:9B33: D0 08     BNE $9B3D
C - - - - - 0x035B45 0D:9B35: A6 3A     LDX ram_003A
C - - - - - 0x035B47 0D:9B37: 20 A4 9B  JSR $9BA4
C - - - - - 0x035B4A 0D:9B3A: BD B7 9E  LDA $9EB7,X
C - - - - - 0x035B4D 0D:9B3D: 48        PHA
C - - - - - 0x035B4E 0D:9B3E: AD 26 06  LDA ram_0626
C - - - - - 0x035B51 0D:9B41: A0 16     LDY #$16
C - - - - - 0x035B53 0D:9B43: 20 3F 9F  JSR $9F3F
C - - - - - 0x035B56 0D:9B46: 68        PLA
C - - - - - 0x035B57 0D:9B47: 8D 26 06  STA ram_0626
C - - - - - 0x035B5A 0D:9B4A: A0 16     LDY #$16
C - - - - - 0x035B5C 0D:9B4C: 20 37 9F  JSR $9F37
C - - - - - 0x035B5F 0D:9B4F: A9 80     LDA #$80
C - - - - - 0x035B61 0D:9B51: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035B64 0D:9B54: D0 12     BNE $9B68
C - - - - - 0x035B66 0D:9B56: A9 40     LDA #$40
C - - - - - 0x035B68 0D:9B58: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035B6B 0D:9B5B: F0 C3     BEQ $9B20
C - - - - - 0x035B6D 0D:9B5D: AD 26 06  LDA ram_0626
C - - - - - 0x035B70 0D:9B60: A0 16     LDY #$16
C - - - - - 0x035B72 0D:9B62: 20 3F 9F  JSR $9F3F
C - - - - - 0x035B75 0D:9B65: 4C DB 9A  JMP $9ADB
C - - - - - 0x035B78 0D:9B68: AD 25 06  LDA ram_0625
C - - - - - 0x035B7B 0D:9B6B: 20 0C C5  JSR $C50C
C - - - - - 0x035B7E 0D:9B6E: A5 34     LDA ram_0034
C - - - - - 0x035B80 0D:9B70: 85 3A     STA ram_003A
C - - - - - 0x035B82 0D:9B72: A5 35     LDA ram_0035
C - - - - - 0x035B84 0D:9B74: 85 3B     STA ram_003B
C - - - - - 0x035B86 0D:9B76: AD 26 06  LDA ram_0626
C - - - - - 0x035B89 0D:9B79: 20 0C C5  JSR $C50C
C - - - - - 0x035B8C 0D:9B7C: A0 00     LDY #$00
C - - - - - 0x035B8E 0D:9B7E: B1 3A     LDA (ram_003A),Y
C - - - - - 0x035B90 0D:9B80: AA        TAX
C - - - - - 0x035B91 0D:9B81: B1 34     LDA (ram_0034),Y
C - - - - - 0x035B93 0D:9B83: 91 3A     STA (ram_003A),Y
C - - - - - 0x035B95 0D:9B85: 8A        TXA
C - - - - - 0x035B96 0D:9B86: 91 34     STA (ram_0034),Y
C - - - - - 0x035B98 0D:9B88: C8        INY
C - - - - - 0x035B99 0D:9B89: C0 04     CPY #$04
C - - - - - 0x035B9B 0D:9B8B: D0 F1     BNE $9B7E
C - - - - - 0x035B9D 0D:9B8D: 4C C7 9A  JMP $9AC7
C - - - - - 0x035BA0 0D:9B90: 48        PHA
C - - - - - 0x035BA1 0D:9B91: A9 0F     LDA #$0F
C - - - - - 0x035BA3 0D:9B93: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035BA6 0D:9B96: D0 03     BNE $9B9B
C - - - - - 0x035BA8 0D:9B98: 68        PLA
C - - - - - 0x035BA9 0D:9B99: 18        CLC
C - - - - - 0x035BAA 0D:9B9A: 60        RTS
C - - - - - 0x035BAB 0D:9B9B: A2 00     LDX #$00
C - - - - - 0x035BAD 0D:9B9D: 4A        LSR
C - - - - - 0x035BAE 0D:9B9E: B0 03     BCS $9BA3
C - - - - - 0x035BB0 0D:9BA0: E8        INX
C - - - - - 0x035BB1 0D:9BA1: D0 FA     BNE $9B9D
C - - - - - 0x035BB3 0D:9BA3: 68        PLA
C - - - - - 0x035BB4 0D:9BA4: 86 3A     STX ram_003A
C - - - - - 0x035BB6 0D:9BA6: 0A        ASL
C - - - - - 0x035BB7 0D:9BA7: 0A        ASL
C - - - - - 0x035BB8 0D:9BA8: 65 3A     ADC ram_003A
C - - - - - 0x035BBA 0D:9BAA: AA        TAX
C - - - - - 0x035BBB 0D:9BAB: 38        SEC
C - - - - - 0x035BBC 0D:9BAC: 60        RTS
C - - J - - 0x035BBD 0D:9BAD: A9 00     LDA #$00
C - - - - - 0x035BBF 0D:9BAF: 8D 2D 06  STA ram_062D
C - - - - - 0x035BC2 0D:9BB2: A9 3C     LDA #$3C
C - - - - - 0x035BC4 0D:9BB4: 20 2A C5  JSR $C52A
C - - - - - 0x035BC7 0D:9BB7: A9 01     LDA #$01
C - - - - - 0x035BC9 0D:9BB9: 20 15 C5  JSR $C515
C - - - - - 0x035BCC 0D:9BBC: A9 80     LDA #$80
C - - - - - 0x035BCE 0D:9BBE: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035BD1 0D:9BC1: D0 09     BNE $9BCC
C - - - - - 0x035BD3 0D:9BC3: A9 40     LDA #$40
C - - - - - 0x035BD5 0D:9BC5: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035BD8 0D:9BC8: D0 21     BNE $9BEB
C - - - - - 0x035BDA 0D:9BCA: F0 EB     BEQ $9BB7
C - - - - - 0x035BDC 0D:9BCC: AD 2A 00  LDA a: ram_002A
C - - - - - 0x035BDF 0D:9BCF: C9 02     CMP #$02
C - - - - - 0x035BE1 0D:9BD1: D0 18     BNE $9BEB
C - - - - - 0x035BE3 0D:9BD3: A9 3D     LDA #$3D
C - - - - - 0x035BE5 0D:9BD5: 20 2A C5  JSR $C52A
C - - - - - 0x035BE8 0D:9BD8: A9 01     LDA #$01
C - - - - - 0x035BEA 0D:9BDA: 20 15 C5  JSR $C515
C - - - - - 0x035BED 0D:9BDD: A9 40     LDA #$40
C - - - - - 0x035BEF 0D:9BDF: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035BF2 0D:9BE2: D0 C9     BNE $9BAD
C - - - - - 0x035BF4 0D:9BE4: A9 80     LDA #$80
C - - - - - 0x035BF6 0D:9BE6: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035BF9 0D:9BE9: F0 ED     BEQ $9BD8
C - - - - - 0x035BFB 0D:9BEB: 4C 0C 99  JMP $990C
C - - - - - 0x035BFE 0D:9BEE: C9 FF     CMP #$FF
C - - - - - 0x035C00 0D:9BF0: F0 1C     BEQ $9C0E
C - - - - - 0x035C02 0D:9BF2: 20 36 C5  JSR $C536
C - - - - - 0x035C05 0D:9BF5: AD FB 05  LDA ram_05FB
C - - - - - 0x035C08 0D:9BF8: F0 0A     BEQ $9C04
C - - - - - 0x035C0A 0D:9BFA: 98        TYA
C - - - - - 0x035C0B 0D:9BFB: 49 FF     EOR #$FF
C - - - - - 0x035C0D 0D:9BFD: A8        TAY
C - - - - - 0x035C0E 0D:9BFE: 8A        TXA
C - - - - - 0x035C0F 0D:9BFF: 49 FF     EOR #$FF
C - - - - - 0x035C11 0D:9C01: AA        TAX
C - - - - - 0x035C12 0D:9C02: C8        INY
C - - - - - 0x035C13 0D:9C03: E8        INX
C - - - - - 0x035C14 0D:9C04: 98        TYA
C - - - - - 0x035C15 0D:9C05: A0 08     LDY #$08
C - - - - - 0x035C17 0D:9C07: 91 34     STA (ram_0034),Y
C - - - - - 0x035C19 0D:9C09: 8A        TXA
C - - - - - 0x035C1A 0D:9C0A: A0 06     LDY #$06
C - - - - - 0x035C1C 0D:9C0C: 91 34     STA (ram_0034),Y
C - - - - - 0x035C1E 0D:9C0E: 60        RTS
C - - - - - 0x035C1F 0D:9C0F: AD FC 05  LDA ram_05FC
C - - - - - 0x035C22 0D:9C12: 8D 26 06  STA ram_0626
C - - - - - 0x035C25 0D:9C15: 20 1F 9C  JSR $9C1F
C - - - - - 0x035C28 0D:9C18: AD 26 06  LDA ram_0626
C - - - - - 0x035C2B 0D:9C1B: 8D FC 05  STA ram_05FC
C - - - - - 0x035C2E 0D:9C1E: 60        RTS
C - - - - - 0x035C2F 0D:9C1F: A9 28     LDA #$28
C - - - - - 0x035C31 0D:9C21: 20 2A C5  JSR $C52A
C - - - - - 0x035C34 0D:9C24: A9 00     LDA #$00
C - - - - - 0x035C36 0D:9C26: 8D 24 06  STA ram_0624
C - - - - - 0x035C39 0D:9C29: 20 1B 9D  JSR $9D1B
C - - - - - 0x035C3C 0D:9C2C: A9 01     LDA #$01
C - - - - - 0x035C3E 0D:9C2E: 20 15 C5  JSR $C515
C - - - - - 0x035C41 0D:9C31: A9 0C     LDA #$0C
C - - - - - 0x035C43 0D:9C33: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035C46 0D:9C36: F0 0B     BEQ $9C43
C - - - - - 0x035C48 0D:9C38: AD 24 06  LDA ram_0624
C - - - - - 0x035C4B 0D:9C3B: 49 40     EOR #$40
C - - - - - 0x035C4D 0D:9C3D: 8D 24 06  STA ram_0624
C - - - - - 0x035C50 0D:9C40: 20 1B 9D  JSR $9D1B
C - - - - - 0x035C53 0D:9C43: A9 40     LDA #$40
C - - - - - 0x035C55 0D:9C45: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035C58 0D:9C48: F0 02     BEQ $9C4C
C - - - - - 0x035C5A 0D:9C4A: 18        CLC
C - - - - - 0x035C5B 0D:9C4B: 60        RTS
C - - - - - 0x035C5C 0D:9C4C: A9 80     LDA #$80
C - - - - - 0x035C5E 0D:9C4E: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035C61 0D:9C51: F0 D9     BEQ $9C2C
C - - - - - 0x035C63 0D:9C53: 2C 24 06  BIT ram_0624
C - - - - - 0x035C66 0D:9C56: 70 02     BVS $9C5A
C - - - - - 0x035C68 0D:9C58: 38        SEC
C - - - - - 0x035C69 0D:9C59: 60        RTS
C - - - - - 0x035C6A 0D:9C5A: A9 38     LDA #$38
C - - - - - 0x035C6C 0D:9C5C: 20 4E C5  JSR $C54E
C - - - - - 0x035C6F 0D:9C5F: A9 29     LDA #$29
C - - - - - 0x035C71 0D:9C61: 20 2A C5  JSR $C52A
C - - - - - 0x035C74 0D:9C64: A9 01     LDA #$01
C - - - - - 0x035C76 0D:9C66: 8D 25 06  STA ram_0625
C - - - - - 0x035C79 0D:9C69: 20 1B 9D  JSR $9D1B
C - - - - - 0x035C7C 0D:9C6C: AD FE 05  LDA ram_05FE
C - - - - - 0x035C7F 0D:9C6F: 8D 24 06  STA ram_0624
C - - - - - 0x035C82 0D:9C72: A9 01     LDA #$01
C - - - - - 0x035C84 0D:9C74: 20 15 C5  JSR $C515
C - - - - - 0x035C87 0D:9C77: A9 84     LDA #$84
C - - - - - 0x035C89 0D:9C79: 8D 2D 06  STA ram_062D
C - - - - - 0x035C8C 0D:9C7C: A9 0C     LDA #$0C
C - - - - - 0x035C8E 0D:9C7E: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035C91 0D:9C81: F0 0B     BEQ $9C8E
C - - - - - 0x035C93 0D:9C83: AD 25 06  LDA ram_0625
C - - - - - 0x035C96 0D:9C86: 49 40     EOR #$40
C - - - - - 0x035C98 0D:9C88: 8D 25 06  STA ram_0625
C - - - - - 0x035C9B 0D:9C8B: 20 1B 9D  JSR $9D1B
C - - - - - 0x035C9E 0D:9C8E: A9 80     LDA #$80
C - - - - - 0x035CA0 0D:9C90: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035CA3 0D:9C93: F0 DD     BEQ $9C72
C - - - - - 0x035CA5 0D:9C95: 2C 25 06  BIT ram_0625
C - - - - - 0x035CA8 0D:9C98: 50 07     BVC $9CA1
C - - - - - 0x035CAA 0D:9C9A: A9 00     LDA #$00
C - - - - - 0x035CAC 0D:9C9C: 8D 2D 06  STA ram_062D
C - - - - - 0x035CAF 0D:9C9F: 38        SEC
C - - - - - 0x035CB0 0D:9CA0: 60        RTS
C - - - - - 0x035CB1 0D:9CA1: A9 81     LDA #$81
C - - - - - 0x035CB3 0D:9CA3: 20 1B 9D  JSR $9D1B
C - - - - - 0x035CB6 0D:9CA6: A9 81     LDA #$81
C - - - - - 0x035CB8 0D:9CA8: 8D 2D 06  STA ram_062D
C - - - - - 0x035CBB 0D:9CAB: 20 D4 9D  JSR $9DD4
C - - - - - 0x035CBE 0D:9CAE: A9 01     LDA #$01
C - - - - - 0x035CC0 0D:9CB0: 20 15 C5  JSR $C515
C - - - - - 0x035CC3 0D:9CB3: 20 9B 9D  JSR $9D9B
C - - - - - 0x035CC6 0D:9CB6: CD 24 06  CMP ram_0624
C - - - - - 0x035CC9 0D:9CB9: 8D 24 06  STA ram_0624
C - - - - - 0x035CCC 0D:9CBC: F0 03     BEQ $9CC1
C - - - - - 0x035CCE 0D:9CBE: 20 D4 9D  JSR $9DD4
C - - - - - 0x035CD1 0D:9CC1: A9 40     LDA #$40
C - - - - - 0x035CD3 0D:9CC3: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035CD6 0D:9CC6: F0 09     BEQ $9CD1
C - - - - - 0x035CD8 0D:9CC8: AD 25 06  LDA ram_0625
C - - - - - 0x035CDB 0D:9CCB: 20 1B 9D  JSR $9D1B
C - - - - - 0x035CDE 0D:9CCE: 4C 72 9C  JMP $9C72
C - - - - - 0x035CE1 0D:9CD1: A9 80     LDA #$80
C - - - - - 0x035CE3 0D:9CD3: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035CE6 0D:9CD6: F0 D6     BEQ $9CAE
C - - - - - 0x035CE8 0D:9CD8: AD FC 05  LDA ram_05FC
C - - - - - 0x035CEB 0D:9CDB: C9 FF     CMP #$FF
C - - - - - 0x035CED 0D:9CDD: F0 CF     BEQ $9CAE
C - - - - - 0x035CEF 0D:9CDF: AD 24 06  LDA ram_0624
C - - - - - 0x035CF2 0D:9CE2: 8D 16 06  STA ram_0616
C - - - - - 0x035CF5 0D:9CE5: A9 01     LDA #$01
C - - - - - 0x035CF7 0D:9CE7: 20 15 C5  JSR $C515
C - - - - - 0x035CFA 0D:9CEA: 20 9B 9D  JSR $9D9B
C - - - - - 0x035CFD 0D:9CED: CD 24 06  CMP ram_0624
C - - - - - 0x035D00 0D:9CF0: 8D 24 06  STA ram_0624
C - - - - - 0x035D03 0D:9CF3: F0 03     BEQ $9CF8
C - - - - - 0x035D05 0D:9CF5: 20 BD 9D  JSR $9DBD
C - - - - - 0x035D08 0D:9CF8: A9 40     LDA #$40
C - - - - - 0x035D0A 0D:9CFA: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035D0D 0D:9CFD: F0 0C     BEQ $9D0B
- - - - - - 0x035D0F 0D:9CFF: AD        .byte $AD   ; 
- - - - - - 0x035D10 0D:9D00: 16        .byte $16   ; 
- - - - - - 0x035D11 0D:9D01: 06        .byte $06   ; 
- - - - - - 0x035D12 0D:9D02: 8D        .byte $8D   ; 
- - - - - - 0x035D13 0D:9D03: 24        .byte $24   ; 
- - - - - - 0x035D14 0D:9D04: 06        .byte $06   ; 
- - - - - - 0x035D15 0D:9D05: 20        .byte $20   ; 
- - - - - - 0x035D16 0D:9D06: BD        .byte $BD   ; 
- - - - - - 0x035D17 0D:9D07: 9D        .byte $9D   ; 
- - - - - - 0x035D18 0D:9D08: 4C        .byte $4C   ; <L>
- - - - - - 0x035D19 0D:9D09: AE        .byte $AE   ; 
- - - - - - 0x035D1A 0D:9D0A: 9C        .byte $9C   ; 
C - - - - - 0x035D1B 0D:9D0B: A9 80     LDA #$80
C - - - - - 0x035D1D 0D:9D0D: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035D20 0D:9D10: F0 D3     BEQ $9CE5
C - - - - - 0x035D22 0D:9D12: AD 25 06  LDA ram_0625
C - - - - - 0x035D25 0D:9D15: 20 1B 9D  JSR $9D1B
C - - - - - 0x035D28 0D:9D18: 4C 72 9C  JMP $9C72
C - - - - - 0x035D2B 0D:9D1B: 48        PHA
C - - - - - 0x035D2C 0D:9D1C: A9 01     LDA #$01
C - - - - - 0x035D2E 0D:9D1E: 20 15 C5  JSR $C515
C - - - - - 0x035D31 0D:9D21: AD 15 05  LDA ram_0515
C - - - - - 0x035D34 0D:9D24: D0 F6     BNE $9D1C
C - - - - - 0x035D36 0D:9D26: A9 01     LDA #$01
C - - - - - 0x035D38 0D:9D28: 8D 15 05  STA ram_0515
C - - - - - 0x035D3B 0D:9D2B: 68        PLA
C - - - - - 0x035D3C 0D:9D2C: 8D A5 04  STA ram_04A5
C - - - - - 0x035D3F 0D:9D2F: 29 0F     AND #$0F
C - - - - - 0x035D41 0D:9D31: 0A        ASL
C - - - - - 0x035D42 0D:9D32: 0A        ASL
C - - - - - 0x035D43 0D:9D33: AA        TAX
C - - - - - 0x035D44 0D:9D34: BD 82 9D  LDA $9D82,X
C - - - - - 0x035D47 0D:9D37: 8D A6 04  STA ram_04A6
C - - - - - 0x035D4A 0D:9D3A: BD 83 9D  LDA $9D83,X
C - - - - - 0x035D4D 0D:9D3D: 8D A7 04  STA ram_04A7
C - - - - - 0x035D50 0D:9D40: BD 84 9D  LDA $9D84,X
C - - - - - 0x035D53 0D:9D43: 8D AA 04  STA ram_04AA
C - - - - - 0x035D56 0D:9D46: BD 85 9D  LDA $9D85,X
C - - - - - 0x035D59 0D:9D49: 8D AB 04  STA ram_04AB
C - - - - - 0x035D5C 0D:9D4C: AD A5 04  LDA ram_04A5
C - - - - - 0x035D5F 0D:9D4F: 29 0F     AND #$0F
C - - - - - 0x035D61 0D:9D51: AA        TAX
C - - - - - 0x035D62 0D:9D52: A9 00     LDA #$00
C - - - - - 0x035D64 0D:9D54: 2C A5 04  BIT ram_04A5
C - - - - - 0x035D67 0D:9D57: 30 05     BMI $9D5E
C - - - - - 0x035D69 0D:9D59: 70 03     BVS $9D5E
C - - - - - 0x035D6B 0D:9D5B: BD 96 9D  LDA $9D96,X
C - - - - - 0x035D6E 0D:9D5E: 8D A8 04  STA ram_04A8
C - - - - - 0x035D71 0D:9D61: A9 00     LDA #$00
C - - - - - 0x035D73 0D:9D63: 2C A5 04  BIT ram_04A5
C - - - - - 0x035D76 0D:9D66: 30 05     BMI $9D6D
C - - - - - 0x035D78 0D:9D68: 50 03     BVC $9D6D
C - - - - - 0x035D7A 0D:9D6A: BD 96 9D  LDA $9D96,X
C - - - - - 0x035D7D 0D:9D6D: 8D AC 04  STA ram_04AC
C - - - - - 0x035D80 0D:9D70: A2 01     LDX #$01
C - - - - - 0x035D82 0D:9D72: 8E A5 04  STX ram_04A5
C - - - - - 0x035D85 0D:9D75: 8E A9 04  STX ram_04A9
C - - - - - 0x035D88 0D:9D78: CA        DEX
C - - - - - 0x035D89 0D:9D79: 8E AD 04  STX ram_04AD
C - - - - - 0x035D8C 0D:9D7C: A9 80     LDA #$80
C - - - - - 0x035D8E 0D:9D7E: 8D 15 05  STA ram_0515
C - - - - - 0x035D91 0D:9D81: 60        RTS
- D 0 - - - 0x035D92 0D:9D82: CC        .byte $CC   ; 
- D 0 - - - 0x035D93 0D:9D83: 22        .byte $22   ; 
- D 0 - - - 0x035D94 0D:9D84: 0C        .byte $0C   ; 
- D 0 - - - 0x035D95 0D:9D85: 23        .byte $23   ; 
- D 0 - - - 0x035D96 0D:9D86: 89        .byte $89   ; 
- D 0 - - - 0x035D97 0D:9D87: 22        .byte $22   ; 
- D 0 - - - 0x035D98 0D:9D88: C9        .byte $C9   ; 
- D 0 - - - 0x035D99 0D:9D89: 22        .byte $22   ; 
- D 0 - - - 0x035D9A 0D:9D8A: C9        .byte $C9   ; 
- D 0 - - - 0x035D9B 0D:9D8B: 22        .byte $22   ; 
- D 0 - - - 0x035D9C 0D:9D8C: 09        .byte $09   ; 
- D 0 - - - 0x035D9D 0D:9D8D: 23        .byte $23   ; 
- D 0 - - - 0x035D9E 0D:9D8E: CC        .byte $CC   ; 
- D 0 - - - 0x035D9F 0D:9D8F: 22        .byte $22   ; 
- D 0 - - - 0x035DA0 0D:9D90: 0C        .byte $0C   ; 
- D 0 - - - 0x035DA1 0D:9D91: 23        .byte $23   ; 
- D 0 - - - 0x035DA2 0D:9D92: C9        .byte $C9   ; 
- D 0 - - - 0x035DA3 0D:9D93: 22        .byte $22   ; 
- D 0 - - - 0x035DA4 0D:9D94: 09        .byte $09   ; 
- D 0 - - - 0x035DA5 0D:9D95: 23        .byte $23   ; 
- D 0 - - - 0x035DA6 0D:9D96: F6        .byte $F6   ; 
- D 0 - - - 0x035DA7 0D:9D97: F6        .byte $F6   ; 
- D 0 - - - 0x035DA8 0D:9D98: F6        .byte $F6   ; 
- D 0 - - - 0x035DA9 0D:9D99: F6        .byte $F6   ; 
- D 0 - - - 0x035DAA 0D:9D9A: B1        .byte $B1   ; 
C - - - - - 0x035DAB 0D:9D9B: A9 0F     LDA #$0F
C - - - - - 0x035DAD 0D:9D9D: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035DB0 0D:9DA0: F0 13     BEQ $9DB5
C - - - - - 0x035DB2 0D:9DA2: A2 00     LDX #$00
C - - - - - 0x035DB4 0D:9DA4: 4A        LSR
C - - - - - 0x035DB5 0D:9DA5: B0 03     BCS $9DAA
C - - - - - 0x035DB7 0D:9DA7: E8        INX
C - - - - - 0x035DB8 0D:9DA8: D0 FA     BNE $9DA4
C - - - - - 0x035DBA 0D:9DAA: BD B9 9D  LDA $9DB9,X
C - - - - - 0x035DBD 0D:9DAD: 18        CLC
C - - - - - 0x035DBE 0D:9DAE: 6D 24 06  ADC ram_0624
C - - - - - 0x035DC1 0D:9DB1: C9 F0     CMP #$F0
C - - - - - 0x035DC3 0D:9DB3: 90 03     BCC $9DB8
C - - - - - 0x035DC5 0D:9DB5: AD 24 06  LDA ram_0624
C - - - - - 0x035DC8 0D:9DB8: 60        RTS
- D 0 - - - 0x035DC9 0D:9DB9: 0C        .byte $0C   ; 
- D 0 - - - 0x035DCA 0D:9DBA: F4        .byte $F4   ; 
- D 0 - - - 0x035DCB 0D:9DBB: 01        .byte $01   ; 
- D 0 - - - 0x035DCC 0D:9DBC: FF        .byte $FF   ; 
C - - - - - 0x035DCD 0D:9DBD: AD FC 05  LDA ram_05FC
C - - - - - 0x035DD0 0D:9DC0: 20 0C C5  JSR $C50C
C - - - - - 0x035DD3 0D:9DC3: AD 24 06  LDA ram_0624
C - - - - - 0x035DD6 0D:9DC6: 20 36 C5  JSR $C536
C - - - - - 0x035DD9 0D:9DC9: 98        TYA
C - - - - - 0x035DDA 0D:9DCA: A0 08     LDY #$08
C - - - - - 0x035DDC 0D:9DCC: 91 34     STA (ram_0034),Y
C - - - - - 0x035DDE 0D:9DCE: 8A        TXA
C - - - - - 0x035DDF 0D:9DCF: A0 06     LDY #$06
C - - - - - 0x035DE1 0D:9DD1: 91 34     STA (ram_0034),Y
C - - - - - 0x035DE3 0D:9DD3: 60        RTS
C - - - - - 0x035DE4 0D:9DD4: A9 01     LDA #$01
C - - - - - 0x035DE6 0D:9DD6: 85 3A     STA ram_003A
C - - - - - 0x035DE8 0D:9DD8: A5 3A     LDA ram_003A
C - - - - - 0x035DEA 0D:9DDA: CD 41 04  CMP ram_0441
C - - - - - 0x035DED 0D:9DDD: F0 15     BEQ $9DF4
C - - - - - 0x035DEF 0D:9DDF: 20 0C C5  JSR $C50C
C - - - - - 0x035DF2 0D:9DE2: A0 06     LDY #$06
C - - - - - 0x035DF4 0D:9DE4: B1 34     LDA (ram_0034),Y
C - - - - - 0x035DF6 0D:9DE6: AA        TAX
C - - - - - 0x035DF7 0D:9DE7: A0 08     LDY #$08
C - - - - - 0x035DF9 0D:9DE9: B1 34     LDA (ram_0034),Y
C - - - - - 0x035DFB 0D:9DEB: A8        TAY
C - - - - - 0x035DFC 0D:9DEC: 20 39 C5  JSR $C539
C - - - - - 0x035DFF 0D:9DEF: CD 24 06  CMP ram_0624
C - - - - - 0x035E02 0D:9DF2: F0 0E     BEQ $9E02
C - - - - - 0x035E04 0D:9DF4: E6 3A     INC ram_003A
C - - - - - 0x035E06 0D:9DF6: A5 3A     LDA ram_003A
C - - - - - 0x035E08 0D:9DF8: C9 0B     CMP #$0B
C - - - - - 0x035E0A 0D:9DFA: D0 DC     BNE $9DD8
C - - - - - 0x035E0C 0D:9DFC: A2 FF     LDX #$FF
C - - - - - 0x035E0E 0D:9DFE: A9 1C     LDA #$1C
C - - - - - 0x035E10 0D:9E00: D0 04     BNE $9E06
C - - - - - 0x035E12 0D:9E02: A9 1D     LDA #$1D
C - - - - - 0x035E14 0D:9E04: A6 3A     LDX ram_003A
C - - - - - 0x035E16 0D:9E06: 8E FC 05  STX ram_05FC
C - - - - - 0x035E19 0D:9E09: 20 2A C5  JSR $C52A
C - - - - - 0x035E1C 0D:9E0C: 60        RTS
C - - - - - 0x035E1D 0D:9E0D: 85 3A     STA ram_003A
C - - - - - 0x035E1F 0D:9E0F: 0A        ASL
C - - - - - 0x035E20 0D:9E10: AA        TAX
C - - - - - 0x035E21 0D:9E11: BD F0 9F  LDA $9FF0,X
C - - - - - 0x035E24 0D:9E14: 85 3C     STA ram_003C
C - - - - - 0x035E26 0D:9E16: BD F1 9F  LDA $9FF1,X
C - - - - - 0x035E29 0D:9E19: 85 3D     STA ram_003D
C - - - - - 0x035E2B 0D:9E1B: A9 00     LDA #$00
C - - - - - 0x035E2D 0D:9E1D: 85 3B     STA ram_003B
C - - - - - 0x035E2F 0D:9E1F: A5 3B     LDA ram_003B
C - - - - - 0x035E31 0D:9E21: 20 0C C5  JSR $C50C
C - - - - - 0x035E34 0D:9E24: A6 3B     LDX ram_003B
C - - - - - 0x035E36 0D:9E26: EC 41 04  CPX ram_0441
C - - - - - 0x035E39 0D:9E29: F0 1B     BEQ $9E46
C - - - - - 0x035E3B 0D:9E2B: AC FB 05  LDY ram_05FB
C - - - - - 0x035E3E 0D:9E2E: E0 0B     CPX #$0B
C - - - - - 0x035E40 0D:9E30: 90 08     BCC $9E3A
C - - - - - 0x035E42 0D:9E32: 8A        TXA
C - - - - - 0x035E43 0D:9E33: E9 0B     SBC #$0B
C - - - - - 0x035E45 0D:9E35: AA        TAX
C - - - - - 0x035E46 0D:9E36: 98        TYA
C - - - - - 0x035E47 0D:9E37: 49 0B     EOR #$0B
C - - - - - 0x035E49 0D:9E39: A8        TAY
C - - - - - 0x035E4A 0D:9E3A: 86 3E     STX ram_003E
C - - - - - 0x035E4C 0D:9E3C: 98        TYA
C - - - - - 0x035E4D 0D:9E3D: 18        CLC
C - - - - - 0x035E4E 0D:9E3E: 65 3E     ADC ram_003E
C - - - - - 0x035E50 0D:9E40: A8        TAY
C - - - - - 0x035E51 0D:9E41: B1 3C     LDA (ram_003C),Y
C - - - - - 0x035E53 0D:9E43: 4C 4B 9E  JMP $9E4B
C - - - - - 0x035E56 0D:9E46: A6 3A     LDX ram_003A
C - - - - - 0x035E58 0D:9E48: BD F8 A0  LDA $A0F8,X
C D 0 - - - 0x035E5B 0D:9E4B: 20 EE 9B  JSR $9BEE
C - - - - - 0x035E5E 0D:9E4E: E6 3B     INC ram_003B
C - - - - - 0x035E60 0D:9E50: A5 3B     LDA ram_003B
C - - - - - 0x035E62 0D:9E52: C9 16     CMP #$16
C - - - - - 0x035E64 0D:9E54: D0 C9     BNE $9E1F
C - - - - - 0x035E66 0D:9E56: 20 45 C6  JSR $C645
C - - - - - 0x035E69 0D:9E59: 60        RTS
C - - - - - 0x035E6A 0D:9E5A: 48        PHA
C - - - - - 0x035E6B 0D:9E5B: A9 01     LDA #$01
C - - - - - 0x035E6D 0D:9E5D: 20 15 C5  JSR $C515
C - - - - - 0x035E70 0D:9E60: 20 2D C5  JSR $C52D
C - - - - - 0x035E73 0D:9E63: 68        PLA
C - - - - - 0x035E74 0D:9E64: AE FB 05  LDX ram_05FB
C - - - - - 0x035E77 0D:9E67: F0 06     BEQ $9E6F
C - - - - - 0x035E79 0D:9E69: A9 14     LDA #$14
C - - - - - 0x035E7B 0D:9E6B: 8D 41 04  STA ram_0441
C - - - - - 0x035E7E 0D:9E6E: 60        RTS
C - - - - - 0x035E7F 0D:9E6F: 20 2A C5  JSR $C52A
C - - - - - 0x035E82 0D:9E72: A9 01     LDA #$01
C - - - - - 0x035E84 0D:9E74: 8D 41 04  STA ram_0441
C - - - - - 0x035E87 0D:9E77: A0 00     LDY #$00
C - - - - - 0x035E89 0D:9E79: 20 3B 9F  JSR $9F3B
C - - - - - 0x035E8C 0D:9E7C: A9 01     LDA #$01
C - - - - - 0x035E8E 0D:9E7E: 20 15 C5  JSR $C515
C - - - - - 0x035E91 0D:9E81: A9 0F     LDA #$0F
C - - - - - 0x035E93 0D:9E83: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035E96 0D:9E86: F0 27     BEQ $9EAF
C - - - - - 0x035E98 0D:9E88: A2 00     LDX #$00
C - - - - - 0x035E9A 0D:9E8A: 4A        LSR
C - - - - - 0x035E9B 0D:9E8B: B0 03     BCS $9E90
C - - - - - 0x035E9D 0D:9E8D: E8        INX
C - - - - - 0x035E9E 0D:9E8E: D0 FA     BNE $9E8A
C - - - - - 0x035EA0 0D:9E90: 86 3A     STX ram_003A
C - - - - - 0x035EA2 0D:9E92: AD 41 04  LDA ram_0441
C - - - - - 0x035EA5 0D:9E95: 0A        ASL
C - - - - - 0x035EA6 0D:9E96: 0A        ASL
C - - - - - 0x035EA7 0D:9E97: 65 3A     ADC ram_003A
C - - - - - 0x035EA9 0D:9E99: AA        TAX
C - - - - - 0x035EAA 0D:9E9A: BD B7 9E  LDA $9EB7,X
C - - - - - 0x035EAD 0D:9E9D: 48        PHA
C - - - - - 0x035EAE 0D:9E9E: AD 41 04  LDA ram_0441
C - - - - - 0x035EB1 0D:9EA1: A0 00     LDY #$00
C - - - - - 0x035EB3 0D:9EA3: 20 3F 9F  JSR $9F3F
C - - - - - 0x035EB6 0D:9EA6: 68        PLA
C - - - - - 0x035EB7 0D:9EA7: 8D 41 04  STA ram_0441
C - - - - - 0x035EBA 0D:9EAA: A0 00     LDY #$00
C - - - - - 0x035EBC 0D:9EAC: 20 3B 9F  JSR $9F3B
C - - - - - 0x035EBF 0D:9EAF: A9 80     LDA #$80
C - - - - - 0x035EC1 0D:9EB1: 2D 1E 00  AND a: ram_001E
C - - - - - 0x035EC4 0D:9EB4: F0 C6     BEQ $9E7C
C - - - - - 0x035EC6 0D:9EB6: 60        RTS
- - - - - - 0x035EC7 0D:9EB7: FF        .byte $FF   ; 
- - - - - - 0x035EC8 0D:9EB8: FF        .byte $FF   ; 
- - - - - - 0x035EC9 0D:9EB9: FF        .byte $FF   ; 
- - - - - - 0x035ECA 0D:9EBA: FF        .byte $FF   ; 
- D 0 - - - 0x035ECB 0D:9EBB: 05        .byte $05   ; 
- D 0 - - - 0x035ECC 0D:9EBC: 09        .byte $09   ; 
- D 0 - - - 0x035ECD 0D:9EBD: 02        .byte $02   ; 
- D 0 - - - 0x035ECE 0D:9EBE: 04        .byte $04   ; 
- D 0 - - - 0x035ECF 0D:9EBF: 06        .byte $06   ; 
- - - - - - 0x035ED0 0D:9EC0: 0A        .byte $0A   ; 
- D 0 - - - 0x035ED1 0D:9EC1: 03        .byte $03   ; 
- D 0 - - - 0x035ED2 0D:9EC2: 01        .byte $01   ; 
- D 0 - - - 0x035ED3 0D:9EC3: 07        .byte $07   ; 
- D 0 - - - 0x035ED4 0D:9EC4: 07        .byte $07   ; 
- D 0 - - - 0x035ED5 0D:9EC5: 04        .byte $04   ; 
- D 0 - - - 0x035ED6 0D:9EC6: 02        .byte $02   ; 
- D 0 - - - 0x035ED7 0D:9EC7: 08        .byte $08   ; 
- - - - - - 0x035ED8 0D:9EC8: 08        .byte $08   ; 
- - - - - - 0x035ED9 0D:9EC9: 01        .byte $01   ; 
- D 0 - - - 0x035EDA 0D:9ECA: 03        .byte $03   ; 
- D 0 - - - 0x035EDB 0D:9ECB: 09        .byte $09   ; 
- D 0 - - - 0x035EDC 0D:9ECC: 01        .byte $01   ; 
- D 0 - - - 0x035EDD 0D:9ECD: 06        .byte $06   ; 
- D 0 - - - 0x035EDE 0D:9ECE: 08        .byte $08   ; 
- D 0 - - - 0x035EDF 0D:9ECF: 0A        .byte $0A   ; 
- D 0 - - - 0x035EE0 0D:9ED0: 02        .byte $02   ; 
- D 0 - - - 0x035EE1 0D:9ED1: 07        .byte $07   ; 
- D 0 - - - 0x035EE2 0D:9ED2: 05        .byte $05   ; 
- D 0 - - - 0x035EE3 0D:9ED3: 03        .byte $03   ; 
- D 0 - - - 0x035EE4 0D:9ED4: 03        .byte $03   ; 
- D 0 - - - 0x035EE5 0D:9ED5: 08        .byte $08   ; 
- D 0 - - - 0x035EE6 0D:9ED6: 06        .byte $06   ; 
- - - - - - 0x035EE7 0D:9ED7: 04        .byte $04   ; 
- - - - - - 0x035EE8 0D:9ED8: 04        .byte $04   ; 
- D 0 - - - 0x035EE9 0D:9ED9: 05        .byte $05   ; 
- D 0 - - - 0x035EEA 0D:9EDA: 07        .byte $07   ; 
- D 0 - - - 0x035EEB 0D:9EDB: 01        .byte $01   ; 
- D 0 - - - 0x035EEC 0D:9EDC: 05        .byte $05   ; 
- D 0 - - - 0x035EED 0D:9EDD: 0A        .byte $0A   ; 
- - - - - - 0x035EEE 0D:9EDE: 0A        .byte $0A   ; 
- D 0 - - - 0x035EEF 0D:9EDF: 02        .byte $02   ; 
- D 0 - - - 0x035EF0 0D:9EE0: 06        .byte $06   ; 
- D 0 - - - 0x035EF1 0D:9EE1: 09        .byte $09   ; 
- D 0 - - - 0x035EF2 0D:9EE2: 09        .byte $09   ; 
- - - - - - 0x035EF3 0D:9EE3: 03        .byte $03   ; 
- - - - - - 0x035EF4 0D:9EE4: 07        .byte $07   ; 
- - - - - - 0x035EF5 0D:9EE5: 09        .byte $09   ; 
- - - - - - 0x035EF6 0D:9EE6: 0A        .byte $0A   ; 
- - - - - - 0x035EF7 0D:9EE7: 05        .byte $05   ; 
- - - - - - 0x035EF8 0D:9EE8: 09        .byte $09   ; 
- - - - - - 0x035EF9 0D:9EE9: 02        .byte $02   ; 
- - - - - - 0x035EFA 0D:9EEA: 04        .byte $04   ; 
- - - - - - 0x035EFB 0D:9EEB: 06        .byte $06   ; 
- - - - - - 0x035EFC 0D:9EEC: 0A        .byte $0A   ; 
- - - - - - 0x035EFD 0D:9EED: 03        .byte $03   ; 
- - - - - - 0x035EFE 0D:9EEE: 01        .byte $01   ; 
- - - - - - 0x035EFF 0D:9EEF: 07        .byte $07   ; 
- - - - - - 0x035F00 0D:9EF0: 00        .byte $00   ; 
- - - - - - 0x035F01 0D:9EF1: 04        .byte $04   ; 
- - - - - - 0x035F02 0D:9EF2: 02        .byte $02   ; 
- - - - - - 0x035F03 0D:9EF3: 08        .byte $08   ; 
- - - - - - 0x035F04 0D:9EF4: 00        .byte $00   ; 
- - - - - - 0x035F05 0D:9EF5: 01        .byte $01   ; 
- - - - - - 0x035F06 0D:9EF6: 03        .byte $03   ; 
- - - - - - 0x035F07 0D:9EF7: 09        .byte $09   ; 
- - - - - - 0x035F08 0D:9EF8: 01        .byte $01   ; 
- - - - - - 0x035F09 0D:9EF9: 06        .byte $06   ; 
- - - - - - 0x035F0A 0D:9EFA: 08        .byte $08   ; 
- - - - - - 0x035F0B 0D:9EFB: 0A        .byte $0A   ; 
- - - - - - 0x035F0C 0D:9EFC: 02        .byte $02   ; 
- - - - - - 0x035F0D 0D:9EFD: 07        .byte $07   ; 
- - - - - - 0x035F0E 0D:9EFE: 05        .byte $05   ; 
- - - - - - 0x035F0F 0D:9EFF: 00        .byte $00   ; 
- - - - - - 0x035F10 0D:9F00: 03        .byte $03   ; 
- - - - - - 0x035F11 0D:9F01: 08        .byte $08   ; 
- - - - - - 0x035F12 0D:9F02: 06        .byte $06   ; 
- - - - - - 0x035F13 0D:9F03: 00        .byte $00   ; 
- - - - - - 0x035F14 0D:9F04: 04        .byte $04   ; 
- - - - - - 0x035F15 0D:9F05: 05        .byte $05   ; 
- - - - - - 0x035F16 0D:9F06: 07        .byte $07   ; 
- - - - - - 0x035F17 0D:9F07: 01        .byte $01   ; 
- - - - - - 0x035F18 0D:9F08: 05        .byte $05   ; 
- - - - - - 0x035F19 0D:9F09: 0A        .byte $0A   ; 
- - - - - - 0x035F1A 0D:9F0A: 00        .byte $00   ; 
- - - - - - 0x035F1B 0D:9F0B: 02        .byte $02   ; 
- - - - - - 0x035F1C 0D:9F0C: 06        .byte $06   ; 
- - - - - - 0x035F1D 0D:9F0D: 00        .byte $00   ; 
- - - - - - 0x035F1E 0D:9F0E: 09        .byte $09   ; 
- D 0 - - - 0x035F1F 0D:9F0F: 03        .byte $03   ; 
- - - - - - 0x035F20 0D:9F10: 06        .byte $06   ; 
- D 0 - - - 0x035F21 0D:9F11: 01        .byte $01   ; 
- - - - - - 0x035F22 0D:9F12: 02        .byte $02   ; 
- D 0 - - - 0x035F23 0D:9F13: 04        .byte $04   ; 
- D 0 - - - 0x035F24 0D:9F14: 08        .byte $08   ; 
- D 0 - - - 0x035F25 0D:9F15: 02        .byte $02   ; 
- D 0 - - - 0x035F26 0D:9F16: 00        .byte $00   ; 
- D 0 - - - 0x035F27 0D:9F17: 05        .byte $05   ; 
- - - - - - 0x035F28 0D:9F18: 09        .byte $09   ; 
- D 0 - - - 0x035F29 0D:9F19: 00        .byte $00   ; 
- D 0 - - - 0x035F2A 0D:9F1A: 01        .byte $01   ; 
- D 0 - - - 0x035F2B 0D:9F1B: 06        .byte $06   ; 
- D 0 - - - 0x035F2C 0D:9F1C: 00        .byte $00   ; 
- D 0 - - - 0x035F2D 0D:9F1D: 04        .byte $04   ; 
- D 0 - - - 0x035F2E 0D:9F1E: 05        .byte $05   ; 
- D 0 - - - 0x035F2F 0D:9F1F: 07        .byte $07   ; 
- D 0 - - - 0x035F30 0D:9F20: 01        .byte $01   ; 
- D 0 - - - 0x035F31 0D:9F21: 05        .byte $05   ; 
- D 0 - - - 0x035F32 0D:9F22: 03        .byte $03   ; 
- D 0 - - - 0x035F33 0D:9F23: 09        .byte $09   ; 
- D 0 - - - 0x035F34 0D:9F24: 02        .byte $02   ; 
- D 0 - - - 0x035F35 0D:9F25: 03        .byte $03   ; 
- D 0 - - - 0x035F36 0D:9F26: 04        .byte $04   ; 
- D 0 - - - 0x035F37 0D:9F27: 08        .byte $08   ; 
- D 0 - - - 0x035F38 0D:9F28: 03        .byte $03   ; 
- D 0 - - - 0x035F39 0D:9F29: 07        .byte $07   ; 
- - - - - - 0x035F3A 0D:9F2A: 07        .byte $07   ; 
- D 0 - - - 0x035F3B 0D:9F2B: 09        .byte $09   ; 
- D 0 - - - 0x035F3C 0D:9F2C: 04        .byte $04   ; 
- - - - - - 0x035F3D 0D:9F2D: 06        .byte $06   ; 
- - - - - - 0x035F3E 0D:9F2E: 06        .byte $06   ; 
- - - - - - 0x035F3F 0D:9F2F: 01        .byte $01   ; 
- - - - - - 0x035F40 0D:9F30: 07        .byte $07   ; 
- D 0 - - - 0x035F41 0D:9F31: 09        .byte $09   ; 
- - - - - - 0x035F42 0D:9F32: 09        .byte $09   ; 
- D 0 - - - 0x035F43 0D:9F33: 02        .byte $02   ; 
- D 0 - - - 0x035F44 0D:9F34: 05        .byte $05   ; 
- D 0 - - - 0x035F45 0D:9F35: 08        .byte $08   ; 
- D 0 - - - 0x035F46 0D:9F36: 08        .byte $08   ; 
C - - - - - 0x035F47 0D:9F37: A2 B1     LDX #$B1
C - - - - - 0x035F49 0D:9F39: D0 06     BNE $9F41
C - - - - - 0x035F4B 0D:9F3B: A2 F6     LDX #$F6
C - - - - - 0x035F4D 0D:9F3D: D0 02     BNE $9F41
C - - - - - 0x035F4F 0D:9F3F: A2 00     LDX #$00
C - - - - - 0x035F51 0D:9F41: 48        PHA
C - - - - - 0x035F52 0D:9F42: A9 01     LDA #$01
C - - - - - 0x035F54 0D:9F44: 20 15 C5  JSR $C515
C - - - - - 0x035F57 0D:9F47: AD 15 05  LDA ram_0515
C - - - - - 0x035F5A 0D:9F4A: D0 F6     BNE $9F42
C - - - - - 0x035F5C 0D:9F4C: A9 01     LDA #$01
C - - - - - 0x035F5E 0D:9F4E: 8D 15 05  STA ram_0515
C - - - - - 0x035F61 0D:9F51: 8E A8 04  STX ram_04A8
C - - - - - 0x035F64 0D:9F54: 8C A5 04  STY ram_04A5
C - - - - - 0x035F67 0D:9F57: 68        PLA
C - - - - - 0x035F68 0D:9F58: 0A        ASL
C - - - - - 0x035F69 0D:9F59: 6D A5 04  ADC ram_04A5
C - - - - - 0x035F6C 0D:9F5C: AA        TAX
C - - - - - 0x035F6D 0D:9F5D: A9 01     LDA #$01
C - - - - - 0x035F6F 0D:9F5F: 8D A5 04  STA ram_04A5
C - - - - - 0x035F72 0D:9F62: BD 79 9F  LDA $9F79,X
C - - - - - 0x035F75 0D:9F65: 8D A6 04  STA ram_04A6
C - - - - - 0x035F78 0D:9F68: BD 7A 9F  LDA $9F7A,X
C - - - - - 0x035F7B 0D:9F6B: 8D A7 04  STA ram_04A7
C - - - - - 0x035F7E 0D:9F6E: A9 00     LDA #$00
C - - - - - 0x035F80 0D:9F70: 8D A9 04  STA ram_04A9
C - - - - - 0x035F83 0D:9F73: A9 80     LDA #$80
C - - - - - 0x035F85 0D:9F75: 8D 15 05  STA ram_0515
C - - - - - 0x035F88 0D:9F78: 60        RTS
- - - - - - 0x035F89 0D:9F79: 18        .byte $18   ; 
- - - - - - 0x035F8A 0D:9F7A: 23        .byte $23   ; 
- D 0 - - - 0x035F8B 0D:9F7B: 8A        .byte $8A   ; 
- D 0 - - - 0x035F8C 0D:9F7C: 22        .byte $22   ; 
- D 0 - - - 0x035F8D 0D:9F7D: CA        .byte $CA   ; 
- D 0 - - - 0x035F8E 0D:9F7E: 22        .byte $22   ; 
- D 0 - - - 0x035F8F 0D:9F7F: 0A        .byte $0A   ; 
- D 0 - - - 0x035F90 0D:9F80: 23        .byte $23   ; 
- D 0 - - - 0x035F91 0D:9F81: 4A        .byte $4A   ; <J>
- D 0 - - - 0x035F92 0D:9F82: 23        .byte $23   ; 
- D 0 - - - 0x035F93 0D:9F83: 91        .byte $91   ; 
- D 0 - - - 0x035F94 0D:9F84: 22        .byte $22   ; 
- D 0 - - - 0x035F95 0D:9F85: D1        .byte $D1   ; 
- D 0 - - - 0x035F96 0D:9F86: 22        .byte $22   ; 
- D 0 - - - 0x035F97 0D:9F87: 11        .byte $11   ; 
- D 0 - - - 0x035F98 0D:9F88: 23        .byte $23   ; 
- D 0 - - - 0x035F99 0D:9F89: 51        .byte $51   ; <Q>
- D 0 - - - 0x035F9A 0D:9F8A: 23        .byte $23   ; 
- D 0 - - - 0x035F9B 0D:9F8B: 98        .byte $98   ; 
- D 0 - - - 0x035F9C 0D:9F8C: 22        .byte $22   ; 
- D 0 - - - 0x035F9D 0D:9F8D: D8        .byte $D8   ; 
- D 0 - - - 0x035F9E 0D:9F8E: 22        .byte $22   ; 
- D 0 - - - 0x035F9F 0D:9F8F: 16        .byte $16   ; 
- D 0 - - - 0x035FA0 0D:9F90: 23        .byte $23   ; 
- D 0 - - - 0x035FA1 0D:9F91: 84        .byte $84   ; 
- D 0 - - - 0x035FA2 0D:9F92: 22        .byte $22   ; 
- D 0 - - - 0x035FA3 0D:9F93: C4        .byte $C4   ; 
- D 0 - - - 0x035FA4 0D:9F94: 22        .byte $22   ; 
- D 0 - - - 0x035FA5 0D:9F95: 04        .byte $04   ; 
- D 0 - - - 0x035FA6 0D:9F96: 23        .byte $23   ; 
- D 0 - - - 0x035FA7 0D:9F97: 44        .byte $44   ; <D>
- D 0 - - - 0x035FA8 0D:9F98: 23        .byte $23   ; 
- D 0 - - - 0x035FA9 0D:9F99: 8D        .byte $8D   ; 
- D 0 - - - 0x035FAA 0D:9F9A: 22        .byte $22   ; 
- D 0 - - - 0x035FAB 0D:9F9B: CD        .byte $CD   ; 
- D 0 - - - 0x035FAC 0D:9F9C: 22        .byte $22   ; 
- D 0 - - - 0x035FAD 0D:9F9D: 0D        .byte $0D   ; 
- D 0 - - - 0x035FAE 0D:9F9E: 23        .byte $23   ; 
- D 0 - - - 0x035FAF 0D:9F9F: 4D        .byte $4D   ; <M>
- D 0 - - - 0x035FB0 0D:9FA0: 23        .byte $23   ; 
- D 0 - - - 0x035FB1 0D:9FA1: 96        .byte $96   ; 
- D 0 - - - 0x035FB2 0D:9FA2: 22        .byte $22   ; 
- D 0 - - - 0x035FB3 0D:9FA3: D6        .byte $D6   ; 
- D 0 - - - 0x035FB4 0D:9FA4: 22        .byte $22   ; 
- D 0 - - - 0x035FB5 0D:9FA5: C2        .byte $C2   ; 
- D 0 - - - 0x035FB6 0D:9FA6: 22        .byte $22   ; 
- D 0 - - - 0x035FB7 0D:9FA7: 02        .byte $02   ; 
- D 0 - - - 0x035FB8 0D:9FA8: 23        .byte $23   ; 
- D 0 - - - 0x035FB9 0D:9FA9: 42        .byte $42   ; <B>
- D 0 - - - 0x035FBA 0D:9FAA: 23        .byte $23   ; 
- D 0 - - - 0x035FBB 0D:9FAB: C9        .byte $C9   ; 
- D 0 - - - 0x035FBC 0D:9FAC: 22        .byte $22   ; 
- D 0 - - - 0x035FBD 0D:9FAD: 09        .byte $09   ; 
- D 0 - - - 0x035FBE 0D:9FAE: 23        .byte $23   ; 
- D 0 - - - 0x035FBF 0D:9FAF: 49        .byte $49   ; <I>
- D 0 - - - 0x035FC0 0D:9FB0: 23        .byte $23   ; 
- D 0 - - - 0x035FC1 0D:9FB1: D0        .byte $D0   ; 
- D 0 - - - 0x035FC2 0D:9FB2: 22        .byte $22   ; 
- D 0 - - - 0x035FC3 0D:9FB3: 10        .byte $10   ; 
- D 0 - - - 0x035FC4 0D:9FB4: 23        .byte $23   ; 
- D 0 - - - 0x035FC5 0D:9FB5: 17        .byte $17   ; 
- D 0 - - - 0x035FC6 0D:9FB6: 23        .byte $23   ; 
- D 0 - - - 0x035FC7 0D:9FB7: 57        .byte $57   ; <W>
- D 0 - - - 0x035FC8 0D:9FB8: 23        .byte $23   ; 
- D 0 - - - 0x035FC9 0D:9FB9: C3        .byte $C3   ; 
- D 0 - - - 0x035FCA 0D:9FBA: 9F        .byte $9F   ; 
- D 0 - - - 0x035FCB 0D:9FBB: CD        .byte $CD   ; 
- D 0 - - - 0x035FCC 0D:9FBC: 9F        .byte $9F   ; 