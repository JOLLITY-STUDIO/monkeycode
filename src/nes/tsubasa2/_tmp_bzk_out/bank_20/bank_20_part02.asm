; bank_20.asm 分片 2/8 (原文件行 1001-2000, 共 7234 行)

C - - - - - 0x0286DD 0A:86CD: E6 48     INC ram_0048
C D 0 - - - 0x0286DF 0A:86CF: E6 46     INC ram_0046
C - - - - - 0x0286E1 0A:86D1: A5 46     LDA ram_0046
C - - - - - 0x0286E3 0A:86D3: C9 16     CMP #$16
C - - - - - 0x0286E5 0A:86D5: F0 03     BEQ $86DA
C - - - - - 0x0286E7 0A:86D7: 4C 37 86  JMP $8637
C - - - - - 0x0286EA 0A:86DA: 60        RTS
C - - - - - 0x0286EB 0A:86DB: 20 0C C5  JSR $C50C
C - - - - - 0x0286EE 0A:86DE: AD 2D 06  LDA ram_062D
C - - - - - 0x0286F1 0A:86E1: 29 0F     AND #$0F
C - - - - - 0x0286F3 0A:86E3: 20 09 C5  JSR $C509
- D 0 - I - 0x0286F6 0A:86E6: 1D        .byte $1D   ; 
- D 0 - I - 0x0286F7 0A:86E7: 87        .byte $87   ; 
- D 0 - I - 0x0286F8 0A:86E8: 1D        .byte $1D   ; 
- D 0 - I - 0x0286F9 0A:86E9: 87        .byte $87   ; 
- D 0 - I - 0x0286FA 0A:86EA: 1F        .byte $1F   ; 
- D 0 - I - 0x0286FB 0A:86EB: 87        .byte $87   ; 
- D 0 - I - 0x0286FC 0A:86EC: 3B        .byte $3B   ; 
- D 0 - I - 0x0286FD 0A:86ED: 87        .byte $87   ; 
- D 0 - I - 0x0286FE 0A:86EE: 1D        .byte $1D   ; 
- D 0 - I - 0x0286FF 0A:86EF: 87        .byte $87   ; 
- - - - - - 0x028700 0A:86F0: 00        .byte $00   ; 
- - - - - - 0x028701 0A:86F1: 00        .byte $00   ; 
C - - - - - 0x028702 0A:86F2: A5 46     LDA ram_0046
C - - - - - 0x028704 0A:86F4: CD FD 05  CMP ram_05FD
C - - - - - 0x028707 0A:86F7: D0 23     BNE $871C
C - - - - - 0x028709 0A:86F9: AD 2E 06  LDA ram_062E
C - - - - - 0x02870C 0A:86FC: D0 11     BNE $870F
C - - - - - 0x02870E 0A:86FE: A0 07     LDY #$07
C - - - - - 0x028710 0A:8700: AD 2D 06  LDA ram_062D
C - - - - - 0x028713 0A:8703: 49 40     EOR #$40
C - - - - - 0x028715 0A:8705: 8D 2D 06  STA ram_062D
C - - - - - 0x028718 0A:8708: 70 02     BVS $870C
C - - - - - 0x02871A 0A:870A: A0 04     LDY #$04
C - - - - - 0x02871C 0A:870C: 8C 2E 06  STY ram_062E
C - - - - - 0x02871F 0A:870F: CE 2E 06  DEC ram_062E
C - - - - - 0x028722 0A:8712: A5 46     LDA ram_0046
C - - - - - 0x028724 0A:8714: 2C 2D 06  BIT ram_062D
C - - - - - 0x028727 0A:8717: 70 03     BVS $871C
C - - - - - 0x028729 0A:8719: 18        CLC
C - - - - - 0x02872A 0A:871A: 69 0B     ADC #$0B
C - - - - - 0x02872C 0A:871C: 60        RTS
C - - J - - 0x02872D 0A:871D: 38        SEC
C - - - - - 0x02872E 0A:871E: 60        RTS
C - - J - - 0x02872F 0A:871F: A5 46     LDA ram_0046
C - - - - - 0x028731 0A:8721: C9 0B     CMP #$0B
C - - - - - 0x028733 0A:8723: B0 14     BCS $8739
C - - - - - 0x028735 0A:8725: CD 41 04  CMP ram_0441
C - - - - - 0x028738 0A:8728: F0 0F     BEQ $8739
C - - - - - 0x02873A 0A:872A: AE 30 04  LDX ram_0430
C - - - - - 0x02873D 0A:872D: F0 08     BEQ $8737
C - - - - - 0x02873F 0A:872F: DD 30 04  CMP ram_0430,X
C - - - - - 0x028742 0A:8732: F0 05     BEQ $8739
C - - - - - 0x028744 0A:8734: CA        DEX
C - - - - - 0x028745 0A:8735: D0 F8     BNE $872F
C - - - - - 0x028747 0A:8737: 18        CLC
C - - - - - 0x028748 0A:8738: 60        RTS
C - - - - - 0x028749 0A:8739: 38        SEC
C - - - - - 0x02874A 0A:873A: 60        RTS
C - - J - - 0x02874B 0A:873B: A5 46     LDA ram_0046
C - - - - - 0x02874D 0A:873D: CD 41 04  CMP ram_0441
C - - - - - 0x028750 0A:8740: F0 0F     BEQ $8751
C - - - - - 0x028752 0A:8742: AE 00 06  LDX ram_0600
C - - - - - 0x028755 0A:8745: F0 08     BEQ $874F
C - - - - - 0x028757 0A:8747: DD 00 06  CMP ram_0600,X
C - - - - - 0x02875A 0A:874A: F0 05     BEQ $8751
C - - - - - 0x02875C 0A:874C: CA        DEX
C - - - - - 0x02875D 0A:874D: D0 F8     BNE $8747
C - - - - - 0x02875F 0A:874F: 38        SEC
C - - - - - 0x028760 0A:8750: 60        RTS
C - - - - - 0x028761 0A:8751: 18        CLC
C - - - - - 0x028762 0A:8752: 60        RTS
C - - - - - 0x028763 0A:8753: AD 2D 06  LDA ram_062D
C - - - - - 0x028766 0A:8756: 29 0F     AND #$0F
C - - - - - 0x028768 0A:8758: 20 09 C5  JSR $C509
- D 0 - I - 0x02876B 0A:875B: 67        .byte $67   ; <g>
- D 0 - I - 0x02876C 0A:875C: 87        .byte $87   ; 
- D 0 - I - 0x02876D 0A:875D: 68        .byte $68   ; <h>
- D 0 - I - 0x02876E 0A:875E: 87        .byte $87   ; 
- D 0 - I - 0x02876F 0A:875F: 71        .byte $71   ; <q>
- D 0 - I - 0x028770 0A:8760: 87        .byte $87   ; 
- D 0 - I - 0x028771 0A:8761: 84        .byte $84   ; 
- D 0 - I - 0x028772 0A:8762: 87        .byte $87   ; 
- D 0 - I - 0x028773 0A:8763: 67        .byte $67   ; <g>
- D 0 - I - 0x028774 0A:8764: 87        .byte $87   ; 
- - - - - - 0x028775 0A:8765: 00        .byte $00   ; 
- - - - - - 0x028776 0A:8766: 00        .byte $00   ; 
C - - J - - 0x028777 0A:8767: 60        RTS
C - - J - - 0x028778 0A:8768: AD 24 06  LDA ram_0624
C - - - - - 0x02877B 0A:876B: 20 36 C5  JSR $C536
C - - - - - 0x02877E 0A:876E: 4C E7 87  JMP $87E7
C - - J - - 0x028781 0A:8771: AD FC 05  LDA ram_05FC
C - - - - - 0x028784 0A:8774: 20 0C C5  JSR $C50C
C - - - - - 0x028787 0A:8777: A0 06     LDY #$06
C - - - - - 0x028789 0A:8779: B1 34     LDA (ram_0034),Y
C - - - - - 0x02878B 0A:877B: AA        TAX
C - - - - - 0x02878C 0A:877C: A0 08     LDY #$08
C - - - - - 0x02878E 0A:877E: B1 34     LDA (ram_0034),Y
C - - - - - 0x028790 0A:8780: A8        TAY
C - - - - - 0x028791 0A:8781: 4C E7 87  JMP $87E7
C - - J - - 0x028794 0A:8784: AD 24 06  LDA ram_0624
C - - - - - 0x028797 0A:8787: 20 A7 87  JSR $87A7
C - - - - - 0x02879A 0A:878A: 48        PHA
C - - - - - 0x02879B 0A:878B: AD 24 06  LDA ram_0624
C - - - - - 0x02879E 0A:878E: 20 C7 87  JSR $87C7
C - - - - - 0x0287A1 0A:8791: 68        PLA
C - - - - - 0x0287A2 0A:8792: AA        TAX
C - - - - - 0x0287A3 0A:8793: 4C E7 87  JMP $87E7
C D 0 - - - 0x0287A6 0A:8796: A9 10     LDA #$10
C - - - - - 0x0287A8 0A:8798: 20 A7 87  JSR $87A7
C - - - - - 0x0287AB 0A:879B: 8D 35 06  STA ram_0635
C - - - - - 0x0287AE 0A:879E: A9 10     LDA #$10
C - - - - - 0x0287B0 0A:87A0: 20 C7 87  JSR $87C7
C - - - - - 0x0287B3 0A:87A3: 8D 37 06  STA ram_0637
C - - - - - 0x0287B6 0A:87A6: 60        RTS
C - - - - - 0x0287B7 0A:87A7: 85 3E     STA ram_003E
C - - - - - 0x0287B9 0A:87A9: AD 2C 06  LDA ram_062C
C - - - - - 0x0287BC 0A:87AC: 20 45 C5  JSR $C545
C - - - - - 0x0287BF 0A:87AF: 86 3C     STX ram_003C
C - - - - - 0x0287C1 0A:87B1: 84 3D     STY ram_003D
C - - - - - 0x0287C3 0A:87B3: AE 39 06  LDX ram_0639
C - - - - - 0x0287C6 0A:87B6: AC 35 06  LDY ram_0635
C - - - - - 0x0287C9 0A:87B9: 18        CLC
C - - - - - 0x0287CA 0A:87BA: 8A        TXA
C - - - - - 0x0287CB 0A:87BB: 65 3C     ADC ram_003C
C - - - - - 0x0287CD 0A:87BD: AA        TAX
C - - - - - 0x0287CE 0A:87BE: 98        TYA
C - - - - - 0x0287CF 0A:87BF: 65 3D     ADC ram_003D
C - - - - - 0x0287D1 0A:87C1: A8        TAY
C - - - - - 0x0287D2 0A:87C2: C6 3E     DEC ram_003E
C - - - - - 0x0287D4 0A:87C4: 10 F3     BPL $87B9
C - - - - - 0x0287D6 0A:87C6: 60        RTS
C - - - - - 0x0287D7 0A:87C7: 85 3E     STA ram_003E
C - - - - - 0x0287D9 0A:87C9: AD 2C 06  LDA ram_062C
C - - - - - 0x0287DC 0A:87CC: 20 42 C5  JSR $C542
C - - - - - 0x0287DF 0A:87CF: 86 3C     STX ram_003C
C - - - - - 0x0287E1 0A:87D1: 84 3D     STY ram_003D
C - - - - - 0x0287E3 0A:87D3: AE 3B 06  LDX ram_063B
C - - - - - 0x0287E6 0A:87D6: AC 37 06  LDY ram_0637
C - - - - - 0x0287E9 0A:87D9: 18        CLC
C - - - - - 0x0287EA 0A:87DA: 8A        TXA
C - - - - - 0x0287EB 0A:87DB: 65 3C     ADC ram_003C
C - - - - - 0x0287ED 0A:87DD: AA        TAX
C - - - - - 0x0287EE 0A:87DE: 98        TYA
C - - - - - 0x0287EF 0A:87DF: 65 3D     ADC ram_003D
C - - - - - 0x0287F1 0A:87E1: A8        TAY
C - - - - - 0x0287F2 0A:87E2: C6 3E     DEC ram_003E
C - - - - - 0x0287F4 0A:87E4: 10 F3     BPL $87D9
C - - - - - 0x0287F6 0A:87E6: 60        RTS
C D 0 - - - 0x0287F7 0A:87E7: 8A        TXA
C - - - - - 0x0287F8 0A:87E8: 18        CLC
C - - - - - 0x0287F9 0A:87E9: 69 FD     ADC #$FD
C - - - - - 0x0287FB 0A:87EB: A6 3B     LDX ram_003B
C - - - - - 0x0287FD 0A:87ED: 9D 03 02  STA ram_0203,X
C - - - - - 0x028800 0A:87F0: 98        TYA
C - - - - - 0x028801 0A:87F1: 18        CLC
C - - - - - 0x028802 0A:87F2: 69 C7     ADC #$C7
C - - - - - 0x028804 0A:87F4: 9D 00 02  STA ram_0200,X
C - - - - - 0x028807 0A:87F7: A9 3C     LDA #$3C
C - - - - - 0x028809 0A:87F9: AC 2D 06  LDY ram_062D
C - - - - - 0x02880C 0A:87FC: C0 83     CPY #$83
C - - - - - 0x02880E 0A:87FE: 08        PHP
C - - - - - 0x02880F 0A:87FF: A0 01     LDY #$01
C - - - - - 0x028811 0A:8801: 28        PLP
C - - - - - 0x028812 0A:8802: D0 04     BNE $8808
C - - - - - 0x028814 0A:8804: A0 03     LDY #$03
C - - - - - 0x028816 0A:8806: A9 11     LDA #$11
C - - - - - 0x028818 0A:8808: 9D 01 02  STA ram_0201,X
C - - - - - 0x02881B 0A:880B: 98        TYA
C - - - - - 0x02881C 0A:880C: 9D 02 02  STA ram_0202,X
C - - - - - 0x02881F 0A:880F: E8        INX
C - - - - - 0x028820 0A:8810: E8        INX
C - - - - - 0x028821 0A:8811: E8        INX
C - - - - - 0x028822 0A:8812: E8        INX
C - - - - - 0x028823 0A:8813: 86 3B     STX ram_003B
C - - - - - 0x028825 0A:8815: E6 48     INC ram_0048
C - - - - - 0x028827 0A:8817: A9 01     LDA #$01
C - - - - - 0x028829 0A:8819: 8D 32 05  STA ram_0532
C - - - - - 0x02882C 0A:881C: 60        RTS
C - - - - - 0x02882D 0A:881D: AC 40 06  LDY ram_0640
C - - - - - 0x028830 0A:8820: D0 12     BNE $8834
C - - - - - 0x028832 0A:8822: AC 41 06  LDY ram_0641
C - - - - - 0x028835 0A:8825: C8        INY
C - - - - - 0x028836 0A:8826: C0 03     CPY #$03
C - - - - - 0x028838 0A:8828: D0 02     BNE $882C
C - - - - - 0x02883A 0A:882A: A0 00     LDY #$00
C - - - - - 0x02883C 0A:882C: 8C 41 06  STY ram_0641
C - - - - - 0x02883F 0A:882F: A9 04     LDA #$04
C - - - - - 0x028841 0A:8831: 8D 40 06  STA ram_0640
C - - - - - 0x028844 0A:8834: A9 00     LDA #$00
C - - - - - 0x028846 0A:8836: AC FB 05  LDY ram_05FB
C - - - - - 0x028849 0A:8839: 08        PHP
C - - - - - 0x02884A 0A:883A: AC 41 06  LDY ram_0641
C - - - - - 0x02884D 0A:883D: 28        PLP
C - - - - - 0x02884E 0A:883E: D0 07     BNE $8847
C - - - - - 0x028850 0A:8840: 98        TYA
C - - - - - 0x028851 0A:8841: 18        CLC
C - - - - - 0x028852 0A:8842: 69 03     ADC #$03
C - - - - - 0x028854 0A:8844: A8        TAY
C - - - - - 0x028855 0A:8845: A9 80     LDA #$80
C - - - - - 0x028857 0A:8847: 2C 37 06  BIT ram_0637
C - - - - - 0x02885A 0A:884A: 30 02     BMI $884E
C - - - - - 0x02885C 0A:884C: 49 80     EOR #$80
C - - - - - 0x02885E 0A:884E: 1D 02 02  ORA ram_0202,X
C - - - - - 0x028861 0A:8851: 9D 02 02  STA ram_0202,X
C - - - - - 0x028864 0A:8854: B9 5B 88  LDA $885B,Y
C - - - - - 0x028867 0A:8857: CE 40 06  DEC ram_0640
C - - - - - 0x02886A 0A:885A: 60        RTS
- D 0 - - - 0x02886B 0A:885B: 36        .byte $36   ; <6>
- D 0 - - - 0x02886C 0A:885C: 37        .byte $37   ; <7>
- D 0 - - - 0x02886D 0A:885D: 3D        .byte $3D   ; 
- D 0 - - - 0x02886E 0A:885E: 3D        .byte $3D   ; 
- D 0 - - - 0x02886F 0A:885F: 37        .byte $37   ; <7>
- D 0 - - - 0x028870 0A:8860: 36        .byte $36   ; <6>
C D 0 - - - 0x028871 0A:8861: AD 2C 00  LDA a: ram_002C
C - - - - - 0x028874 0A:8864: 0A        ASL
C - - - - - 0x028875 0A:8865: 85 46     STA ram_0046
C - - - - - 0x028877 0A:8867: 0A        ASL
C - - - - - 0x028878 0A:8868: 0A        ASL
C - - - - - 0x028879 0A:8869: 65 46     ADC ram_0046
C - - - - - 0x02887B 0A:886B: AA        TAX
C - - - - - 0x02887C 0A:886C: A9 00     LDA #$00
C - - - - - 0x02887E 0A:886E: 85 46     STA ram_0046
C - - - - - 0x028880 0A:8870: A4 46     LDY ram_0046
C - - - - - 0x028882 0A:8872: B9 D0 88  LDA $88D0,Y
C - - - - - 0x028885 0A:8875: A4 3B     LDY ram_003B
C - - - - - 0x028887 0A:8877: 99 01 02  STA ram_0201,Y
C - - - - - 0x02888A 0A:887A: BD A8 88  LDA $88A8,X
C - - - - - 0x02888D 0A:887D: 48        PHA
C - - - - - 0x02888E 0A:887E: 29 F0     AND #$F0
C - - - - - 0x028890 0A:8880: 4A        LSR
C - - - - - 0x028891 0A:8881: 18        CLC
C - - - - - 0x028892 0A:8882: 69 A0     ADC #$A0
C - - - - - 0x028894 0A:8884: 99 03 02  STA ram_0203,Y
C - - - - - 0x028897 0A:8887: 68        PLA
C - - - - - 0x028898 0A:8888: 29 0F     AND #$0F
C - - - - - 0x02889A 0A:888A: 0A        ASL
C - - - - - 0x02889B 0A:888B: 0A        ASL
C - - - - - 0x02889C 0A:888C: 69 A2     ADC #$A2
C - - - - - 0x02889E 0A:888E: 99 00 02  STA ram_0200,Y
C - - - - - 0x0288A1 0A:8891: A9 00     LDA #$00
C - - - - - 0x0288A3 0A:8893: 99 02 02  STA ram_0202,Y
C - - - - - 0x0288A6 0A:8896: E8        INX
C - - - - - 0x0288A7 0A:8897: C8        INY
C - - - - - 0x0288A8 0A:8898: C8        INY
C - - - - - 0x0288A9 0A:8899: C8        INY
C - - - - - 0x0288AA 0A:889A: C8        INY
C - - - - - 0x0288AB 0A:889B: 84 3B     STY ram_003B
C - - - - - 0x0288AD 0A:889D: E6 48     INC ram_0048
C - - - - - 0x0288AF 0A:889F: E6 46     INC ram_0046
C - - - - - 0x0288B1 0A:88A1: A5 46     LDA ram_0046
C - - - - - 0x0288B3 0A:88A3: C9 0A     CMP #$0A
C - - - - - 0x0288B5 0A:88A5: D0 C9     BNE $8870
C - - - - - 0x0288B7 0A:88A7: 60        RTS
- D 0 - - - 0x0288B8 0A:88A8: 30        .byte $30   ; <0>
- D 0 - - - 0x0288B9 0A:88A9: 3A        .byte $3A   ; 
- D 0 - - - 0x0288BA 0A:88AA: 35        .byte $35   ; <5>
- D 0 - - - 0x0288BB 0A:88AB: 25        .byte $25   ; 
- D 0 - - - 0x0288BC 0A:88AC: 52        .byte $52   ; <R>
- D 0 - - - 0x0288BD 0A:88AD: 7A        .byte $7A   ; <z>
- D 0 - - - 0x0288BE 0A:88AE: 58        .byte $58   ; <X>
- D 0 - - - 0x0288BF 0A:88AF: 75        .byte $75   ; <u>
- D 0 - - - 0x0288C0 0A:88B0: 55        .byte $55   ; <U>
- D 0 - - - 0x0288C1 0A:88B1: 70        .byte $70   ; <p>
- D 0 - - - 0x0288C2 0A:88B2: 20        .byte $20   ; 
- D 0 - - - 0x0288C3 0A:88B3: 2A        .byte $2A   ; 
- D 0 - - - 0x0288C4 0A:88B4: 25        .byte $25   ; 
- D 0 - - - 0x0288C5 0A:88B5: 15        .byte $15   ; 
- D 0 - - - 0x0288C6 0A:88B6: 51        .byte $51   ; <Q>
- D 0 - - - 0x0288C7 0A:88B7: 59        .byte $59   ; <Y>
- D 0 - - - 0x0288C8 0A:88B8: 46        .byte $46   ; <F>
- D 0 - - - 0x0288C9 0A:88B9: 77        .byte $77   ; <w>
- D 0 - - - 0x0288CA 0A:88BA: 44        .byte $44   ; <D>
- D 0 - - - 0x0288CB 0A:88BB: 73        .byte $73   ; <s>
- D 0 - - - 0x0288CC 0A:88BC: 20        .byte $20   ; 
- D 0 - - - 0x0288CD 0A:88BD: 2A        .byte $2A   ; 
- D 0 - - - 0x0288CE 0A:88BE: 25        .byte $25   ; 
- D 0 - - - 0x0288CF 0A:88BF: 43        .byte $43   ; <C>
- D 0 - - - 0x0288D0 0A:88C0: 51        .byte $51   ; <Q>
- D 0 - - - 0x0288D1 0A:88C1: 59        .byte $59   ; <Y>
- D 0 - - - 0x0288D2 0A:88C2: 47        .byte $47   ; <G>
- D 0 - - - 0x0288D3 0A:88C3: 77        .byte $77   ; <w>
- D 0 - - - 0x0288D4 0A:88C4: 55        .byte $55   ; <U>
- D 0 - - - 0x0288D5 0A:88C5: 73        .byte $73   ; <s>
- D 0 - - - 0x0288D6 0A:88C6: 20        .byte $20   ; 
- D 0 - - - 0x0288D7 0A:88C7: 2A        .byte $2A   ; 
- D 0 - - - 0x0288D8 0A:88C8: 24        .byte $24   ; 
- D 0 - - - 0x0288D9 0A:88C9: 26        .byte $26   ; 
- D 0 - - - 0x0288DA 0A:88CA: 45        .byte $45   ; <E>
- D 0 - - - 0x0288DB 0A:88CB: 7A        .byte $7A   ; <z>
- D 0 - - - 0x0288DC 0A:88CC: 48        .byte $48   ; <H>
- D 0 - - - 0x0288DD 0A:88CD: 75        .byte $75   ; <u>
- D 0 - - - 0x0288DE 0A:88CE: 63        .byte $63   ; <c>
- D 0 - - - 0x0288DF 0A:88CF: 42        .byte $42   ; <B>
- D 0 - - - 0x0288E0 0A:88D0: 1C        .byte $1C   ; 
- D 0 - - - 0x0288E1 0A:88D1: 1D        .byte $1D   ; 
- D 0 - - - 0x0288E2 0A:88D2: 1E        .byte $1E   ; 
- D 0 - - - 0x0288E3 0A:88D3: 1F        .byte $1F   ; 
- D 0 - - - 0x0288E4 0A:88D4: 30        .byte $30   ; <0>
- D 0 - - - 0x0288E5 0A:88D5: 31        .byte $31   ; <1>
- D 0 - - - 0x0288E6 0A:88D6: 32        .byte $32   ; <2>
- D 0 - - - 0x0288E7 0A:88D7: 33        .byte $33   ; <3>
- D 0 - - - 0x0288E8 0A:88D8: 34        .byte $34   ; <4>
- D 0 - - - 0x0288E9 0A:88D9: 35        .byte $35   ; <5>
- D 0 - - - 0x0288EA 0A:88DA: 1D        .byte $1D   ; 
- D 0 - - - 0x0288EB 0A:88DB: FD        .byte $FD   ; 
- D 0 - - - 0x0288EC 0A:88DC: FD        .byte $FD   ; 
- D 0 - - - 0x0288ED 0A:88DD: FD        .byte $FD   ; 
- D 0 - - - 0x0288EE 0A:88DE: FD        .byte $FD   ; 
- D 0 - - - 0x0288EF 0A:88DF: 2C        .byte $2C   ; 
- D 0 - - - 0x0288F0 0A:88E0: C7        .byte $C7   ; 
- D 0 - - - 0x0288F1 0A:88E1: C7        .byte $C7   ; 
- D 0 - - - 0x0288F2 0A:88E2: C7        .byte $C7   ; 
- D 0 - - - 0x0288F3 0A:88E3: C7        .byte $C7   ; 
- D 0 - - - 0x0288F4 0A:88E4: 47        .byte $47   ; <G>
- D 0 - - - 0x0288F5 0A:88E5: 05        .byte $05   ; 
- D 0 - - - 0x0288F6 0A:88E6: 5C        .byte $5C   ; 
- D 0 - - - 0x0288F7 0A:88E7: 05        .byte $05   ; 
- D 0 - - - 0x0288F8 0A:88E8: 71        .byte $71   ; <q>
- D 0 - - - 0x0288F9 0A:88E9: 05        .byte $05   ; 
- D 0 - - - 0x0288FA 0A:88EA: 86        .byte $86   ; 
- D 0 - - - 0x0288FB 0A:88EB: 05        .byte $05   ; 
- D 0 - - - 0x0288FC 0A:88EC: 9B        .byte $9B   ; 
- D 0 - - - 0x0288FD 0A:88ED: 05        .byte $05   ; 
- D 0 - - - 0x0288FE 0A:88EE: B0        .byte $B0   ; 
- D 0 - - - 0x0288FF 0A:88EF: 05        .byte $05   ; 
- D 0 - - - 0x028900 0A:88F0: 08        .byte $08   ; 
- D 0 - - - 0x028901 0A:88F1: 00        .byte $00   ; 
- D 0 - - - 0x028902 0A:88F2: 0F        .byte $0F   ; 
- D 0 - - - 0x028903 0A:88F3: 06        .byte $06   ; 
- D 0 - - - 0x028904 0A:88F4: 04        .byte $04   ; 
- D 0 - - - 0x028905 0A:88F5: 09        .byte $09   ; 
- D 0 - - - 0x028906 0A:88F6: 05        .byte $05   ; 
- D 0 - - - 0x028907 0A:88F7: 08        .byte $08   ; 
- D 0 - - - 0x028908 0A:88F8: 08        .byte $08   ; 
- D 0 - - - 0x028909 0A:88F9: 01        .byte $01   ; 
- D 0 - - - 0x02890A 0A:88FA: 02        .byte $02   ; 
- D 0 - - - 0x02890B 0A:88FB: 08        .byte $08   ; 
- D 0 - - - 0x02890C 0A:88FC: 09        .byte $09   ; 
- D 0 - - - 0x02890D 0A:88FD: 04        .byte $04   ; 
- D 0 - - - 0x02890E 0A:88FE: 08        .byte $08   ; 
- D 0 - - - 0x02890F 0A:88FF: 10        .byte $10   ; 
- D 0 - - - 0x028910 0A:8900: 08        .byte $08   ; 
- D 0 - - - 0x028911 0A:8901: 02        .byte $02   ; 
- D 0 - - - 0x028912 0A:8902: 01        .byte $01   ; 
- D 0 - - - 0x028913 0A:8903: 03        .byte $03   ; 
- D 0 - - - 0x028914 0A:8904: 06        .byte $06   ; 
- D 0 - - - 0x028915 0A:8905: 0B        .byte $0B   ; 
- D 0 - - - 0x028916 0A:8906: 05        .byte $05   ; 
- D 0 - - - 0x028917 0A:8907: 03        .byte $03   ; 
- D 0 - - - 0x028918 0A:8908: 03        .byte $03   ; 
- D 0 - - - 0x028919 0A:8909: 01        .byte $01   ; 
- D 0 - - - 0x02891A 0A:890A: 07        .byte $07   ; 
- D 0 - - - 0x02891B 0A:890B: 04        .byte $04   ; 
- D 0 - - - 0x02891C 0A:890C: 04        .byte $04   ; 
- D 0 - - - 0x02891D 0A:890D: 02        .byte $02   ; 
- D 0 - - - 0x02891E 0A:890E: 02        .byte $02   ; 
- D 0 - - - 0x02891F 0A:890F: 04        .byte $04   ; 
- D 0 - - - 0x028920 0A:8910: 02        .byte $02   ; 
- D 0 - - - 0x028921 0A:8911: 0C        .byte $0C   ; 
- D 0 - - - 0x028922 0A:8912: 0E        .byte $0E   ; 
- D 0 - - - 0x028923 0A:8913: 03        .byte $03   ; 
- D 0 - - - 0x028924 0A:8914: 01        .byte $01   ; 
- D 0 - - - 0x028925 0A:8915: 0B        .byte $0B   ; 
- D 0 - - - 0x028926 0A:8916: 0F        .byte $0F   ; 
- D 0 - - - 0x028927 0A:8917: 06        .byte $06   ; 
- D 0 - - - 0x028928 0A:8918: 02        .byte $02   ; 
- D 0 - - - 0x028929 0A:8919: 07        .byte $07   ; 
- D 0 - - - 0x02892A 0A:891A: 04        .byte $04   ; 
- D 0 - - - 0x02892B 0A:891B: 0A        .byte $0A   ; 
- D 0 - - - 0x02892C 0A:891C: 09        .byte $09   ; 
- D 0 - - - 0x02892D 0A:891D: 08        .byte $08   ; 
- D 0 - - - 0x02892E 0A:891E: 04        .byte $04   ; 
- D 0 - - - 0x02892F 0A:891F: 01        .byte $01   ; 
- D 0 - - - 0x028930 0A:8920: 03        .byte $03   ; 
- D 0 - - - 0x028931 0A:8921: 03        .byte $03   ; 
- D 0 - - - 0x028932 0A:8922: 04        .byte $04   ; 
- D 0 - - - 0x028933 0A:8923: 11        .byte $11   ; 
- D 0 - - - 0x028934 0A:8924: 02        .byte $02   ; 
- D 0 - - - 0x028935 0A:8925: 02        .byte $02   ; 
- D 0 - - - 0x028936 0A:8926: 07        .byte $07   ; 
- D 0 - - - 0x028937 0A:8927: 02        .byte $02   ; 
- D 0 - - - 0x028938 0A:8928: 04        .byte $04   ; 
- D 0 - - - 0x028939 0A:8929: 0E        .byte $0E   ; 
- D 0 - - - 0x02893A 0A:892A: 09        .byte $09   ; 
- D 0 - - - 0x02893B 0A:892B: 02        .byte $02   ; 
- D 0 - - - 0x02893C 0A:892C: 0B        .byte $0B   ; 
- D 0 - - - 0x02893D 0A:892D: 01        .byte $01   ; 
- D 0 - - - 0x02893E 0A:892E: 04        .byte $04   ; 
- D 0 - - - 0x02893F 0A:892F: 02        .byte $02   ; 
- D 0 - - - 0x028940 0A:8930: 0C        .byte $0C   ; 
- D 0 - - - 0x028941 0A:8931: 07        .byte $07   ; 
- D 0 - - - 0x028942 0A:8932: 0B        .byte $0B   ; 
- D 0 - - - 0x028943 0A:8933: 01        .byte $01   ; 
- D 0 - - - 0x028944 0A:8934: 02        .byte $02   ; 
- D 0 - - - 0x028945 0A:8935: 02        .byte $02   ; 
- D 0 - - - 0x028946 0A:8936: 03        .byte $03   ; 
- D 0 - - - 0x028947 0A:8937: 03        .byte $03   ; 
- D 0 - - - 0x028948 0A:8938: 04        .byte $04   ; 
- D 0 - - - 0x028949 0A:8939: 06        .byte $06   ; 
- D 0 - - - 0x02894A 0A:893A: 04        .byte $04   ; 
- D 0 - - - 0x02894B 0A:893B: 02        .byte $02   ; 
- D 0 - - - 0x02894C 0A:893C: 0E        .byte $0E   ; 
- D 0 - - - 0x02894D 0A:893D: 06        .byte $06   ; 
- D 0 - - - 0x02894E 0A:893E: 06        .byte $06   ; 
- D 0 - - - 0x02894F 0A:893F: 07        .byte $07   ; 
- D 0 - - - 0x028950 0A:8940: 0A        .byte $0A   ; 
- D 0 - - - 0x028951 0A:8941: 06        .byte $06   ; 
- D 0 - - - 0x028952 0A:8942: 11        .byte $11   ; 
- D 0 - - - 0x028953 0A:8943: 01        .byte $01   ; 
- D 0 - - - 0x028954 0A:8944: 04        .byte $04   ; 
- D 0 - - - 0x028955 0A:8945: 05        .byte $05   ; 
- D 0 - - - 0x028956 0A:8946: 0F        .byte $0F   ; 
- D 0 - - - 0x028957 0A:8947: 04        .byte $04   ; 
- D 0 - - - 0x028958 0A:8948: 01        .byte $01   ; 
- D 0 - - - 0x028959 0A:8949: 0B        .byte $0B   ; 
- D 0 - - - 0x02895A 0A:894A: 09        .byte $09   ; 
- D 0 - - - 0x02895B 0A:894B: 0F        .byte $0F   ; 
- D 0 - - - 0x02895C 0A:894C: 02        .byte $02   ; 
- D 0 - - - 0x02895D 0A:894D: 09        .byte $09   ; 
- D 0 - - - 0x02895E 0A:894E: 0B        .byte $0B   ; 
- D 0 - - - 0x02895F 0A:894F: 03        .byte $03   ; 
- D 0 - - - 0x028960 0A:8950: 05        .byte $05   ; 
- D 0 - - - 0x028961 0A:8951: 01        .byte $01   ; 
- D 0 - - - 0x028962 0A:8952: 01        .byte $01   ; 
- D 0 - - - 0x028963 0A:8953: 00        .byte $00   ; 
- D 0 - - - 0x028964 0A:8954: 03        .byte $03   ; 
- D 0 - - - 0x028965 0A:8955: 04        .byte $04   ; 
- D 0 - - - 0x028966 0A:8956: 02        .byte $02   ; 
- D 0 - - - 0x028967 0A:8957: 0B        .byte $0B   ; 
- D 0 - - - 0x028968 0A:8958: 01        .byte $01   ; 
- D 0 - - - 0x028969 0A:8959: 0D        .byte $0D   ; 
- D 0 - - - 0x02896A 0A:895A: 0A        .byte $0A   ; 
- D 0 - - - 0x02896B 0A:895B: 07        .byte $07   ; 
- D 0 - - - 0x02896C 0A:895C: 01        .byte $01   ; 
- D 0 - - - 0x02896D 0A:895D: 02        .byte $02   ; 
- D 0 - - - 0x02896E 0A:895E: 09        .byte $09   ; 
- D 0 - - - 0x02896F 0A:895F: 06        .byte $06   ; 
- D 0 - - - 0x028970 0A:8960: 05        .byte $05   ; 
- D 0 - - - 0x028971 0A:8961: 09        .byte $09   ; 
- D 0 - - - 0x028972 0A:8962: 04        .byte $04   ; 
- D 0 - - - 0x028973 0A:8963: 08        .byte $08   ; 
- D 0 - - - 0x028974 0A:8964: 0E        .byte $0E   ; 
- D 0 - - - 0x028975 0A:8965: 0B        .byte $0B   ; 
- - - - - - 0x028976 0A:8966: 60        .byte $60   ; 
- - - - - - 0x028977 0A:8967: 60        .byte $60   ; 
- D 0 - I - 0x028978 0A:8968: 48        .byte $48   ; <H>
- D 0 - I - 0x028979 0A:8969: 8B        .byte $8B   ; 
- D 0 - I - 0x02897A 0A:896A: 5C        .byte $5C   ; 
- D 0 - I - 0x02897B 0A:896B: 8B        .byte $8B   ; 
- D 0 - I - 0x02897C 0A:896C: 6A        .byte $6A   ; <j>
- D 0 - I - 0x02897D 0A:896D: 8B        .byte $8B   ; 
- D 0 - I - 0x02897E 0A:896E: 78        .byte $78   ; <x>
- D 0 - I - 0x02897F 0A:896F: 8B        .byte $8B   ; 
- D 0 - I - 0x028980 0A:8970: 86        .byte $86   ; 
- D 0 - I - 0x028981 0A:8971: 8B        .byte $8B   ; 
- D 0 - I - 0x028982 0A:8972: 94        .byte $94   ; 
- D 0 - I - 0x028983 0A:8973: 8B        .byte $8B   ; 
- D 0 - I - 0x028984 0A:8974: B4        .byte $B4   ; 
- D 0 - I - 0x028985 0A:8975: 8B        .byte $8B   ; 
- D 0 - I - 0x028986 0A:8976: CA        .byte $CA   ; 
- D 0 - I - 0x028987 0A:8977: 8B        .byte $8B   ; 
- D 0 - I - 0x028988 0A:8978: E0        .byte $E0   ; 
- D 0 - I - 0x028989 0A:8979: 8B        .byte $8B   ; 
- D 0 - I - 0x02898A 0A:897A: EE        .byte $EE   ; 
- D 0 - I - 0x02898B 0A:897B: 8B        .byte $8B   ; 
- - - - - - 0x02898C 0A:897C: 04        .byte $04   ; 
- - - - - - 0x02898D 0A:897D: 8C        .byte $8C   ; 
- D 0 - I - 0x02898E 0A:897E: 12        .byte $12   ; 
- D 0 - I - 0x02898F 0A:897F: 8C        .byte $8C   ; 
- D 0 - I - 0x028990 0A:8980: 28        .byte $28   ; 
- D 0 - I - 0x028991 0A:8981: 8C        .byte $8C   ; 
- D 0 - I - 0x028992 0A:8982: 3C        .byte $3C   ; 
- D 0 - I - 0x028993 0A:8983: 8C        .byte $8C   ; 
- D 0 - I - 0x028994 0A:8984: 4A        .byte $4A   ; <J>
- D 0 - I - 0x028995 0A:8985: 8C        .byte $8C   ; 
- D 0 - I - 0x028996 0A:8986: 61        .byte $61   ; <a>
- D 0 - I - 0x028997 0A:8987: 8C        .byte $8C   ; 
- D 0 - I - 0x028998 0A:8988: 78        .byte $78   ; <x>
- D 0 - I - 0x028999 0A:8989: 8C        .byte $8C   ; 
- D 0 - I - 0x02899A 0A:898A: 86        .byte $86   ; 
- D 0 - I - 0x02899B 0A:898B: 8C        .byte $8C   ; 
- D 0 - I - 0x02899C 0A:898C: 94        .byte $94   ; 
- D 0 - I - 0x02899D 0A:898D: 8C        .byte $8C   ; 
- D 0 - I - 0x02899E 0A:898E: A2        .byte $A2   ; 
- D 0 - I - 0x02899F 0A:898F: 8C        .byte $8C   ; 
- D 0 - I - 0x0289A0 0A:8990: B9        .byte $B9   ; 
- D 0 - I - 0x0289A1 0A:8991: 8C        .byte $8C   ; 
- D 0 - I - 0x0289A2 0A:8992: D0        .byte $D0   ; 
- D 0 - I - 0x0289A3 0A:8993: 8C        .byte $8C   ; 
- D 0 - I - 0x0289A4 0A:8994: DE        .byte $DE   ; 
- D 0 - I - 0x0289A5 0A:8995: 8C        .byte $8C   ; 
- D 0 - I - 0x0289A6 0A:8996: EC        .byte $EC   ; 
- D 0 - I - 0x0289A7 0A:8997: 8C        .byte $8C   ; 
- D 0 - I - 0x0289A8 0A:8998: 09        .byte $09   ; 
- D 0 - I - 0x0289A9 0A:8999: 8D        .byte $8D   ; 
- D 0 - I - 0x0289AA 0A:899A: 1F        .byte $1F   ; 
- D 0 - I - 0x0289AB 0A:899B: 8D        .byte $8D   ; 
- D 0 - I - 0x0289AC 0A:899C: 52        .byte $52   ; <R>
- D 0 - I - 0x0289AD 0A:899D: 8D        .byte $8D   ; 
- D 0 - I - 0x0289AE 0A:899E: 60        .byte $60   ; 
- D 0 - I - 0x0289AF 0A:899F: 8D        .byte $8D   ; 
- D 0 - I - 0x0289B0 0A:89A0: 89        .byte $89   ; 
- D 0 - I - 0x0289B1 0A:89A1: 8D        .byte $8D   ; 
- D 0 - I - 0x0289B2 0A:89A2: 97        .byte $97   ; 
- D 0 - I - 0x0289B3 0A:89A3: 8D        .byte $8D   ; 
- D 0 - I - 0x0289B4 0A:89A4: A5        .byte $A5   ; 
- D 0 - I - 0x0289B5 0A:89A5: 8D        .byte $8D   ; 
- D 0 - I - 0x0289B6 0A:89A6: B3        .byte $B3   ; 
- D 0 - I - 0x0289B7 0A:89A7: 8D        .byte $8D   ; 
- D 0 - I - 0x0289B8 0A:89A8: C1        .byte $C1   ; 
- D 0 - I - 0x0289B9 0A:89A9: 8D        .byte $8D   ; 
- D 0 - I - 0x0289BA 0A:89AA: CF        .byte $CF   ; 
- D 0 - I - 0x0289BB 0A:89AB: 8D        .byte $8D   ; 
- D 0 - I - 0x0289BC 0A:89AC: 05        .byte $05   ; 
- D 0 - I - 0x0289BD 0A:89AD: 8E        .byte $8E   ; 
- D 0 - I - 0x0289BE 0A:89AE: 1B        .byte $1B   ; 
- D 0 - I - 0x0289BF 0A:89AF: 8E        .byte $8E   ; 
- D 0 - I - 0x0289C0 0A:89B0: 32        .byte $32   ; <2>
- D 0 - I - 0x0289C1 0A:89B1: 8E        .byte $8E   ; 
- D 0 - I - 0x0289C2 0A:89B2: 5B        .byte $5B   ; 
- D 0 - I - 0x0289C3 0A:89B3: 8E        .byte $8E   ; 
- D 0 - I - 0x0289C4 0A:89B4: 7A        .byte $7A   ; <z>
- D 0 - I - 0x0289C5 0A:89B5: 8E        .byte $8E   ; 
- D 0 - I - 0x0289C6 0A:89B6: 8E        .byte $8E   ; 
- D 0 - I - 0x0289C7 0A:89B7: 8E        .byte $8E   ; 
- D 0 - I - 0x0289C8 0A:89B8: C6        .byte $C6   ; 
- D 0 - I - 0x0289C9 0A:89B9: 8E        .byte $8E   ; 
- D 0 - I - 0x0289CA 0A:89BA: E5        .byte $E5   ; 
- D 0 - I - 0x0289CB 0A:89BB: 8E        .byte $8E   ; 
- D 0 - I - 0x0289CC 0A:89BC: F3        .byte $F3   ; 
- D 0 - I - 0x0289CD 0A:89BD: 8E        .byte $8E   ; 
- D 0 - I - 0x0289CE 0A:89BE: 29        .byte $29   ; 
- D 0 - I - 0x0289CF 0A:89BF: 8F        .byte $8F   ; 
- D 0 - I - 0x0289D0 0A:89C0: 53        .byte $53   ; <S>
- D 0 - I - 0x0289D1 0A:89C1: 8F        .byte $8F   ; 
- D 0 - I - 0x0289D2 0A:89C2: 7C        .byte $7C   ; 
- D 0 - I - 0x0289D3 0A:89C3: 8F        .byte $8F   ; 
- D 0 - I - 0x0289D4 0A:89C4: 99        .byte $99   ; 
- D 0 - I - 0x0289D5 0A:89C5: 8F        .byte $8F   ; 
- D 0 - I - 0x0289D6 0A:89C6: A7        .byte $A7   ; 
- D 0 - I - 0x0289D7 0A:89C7: 8F        .byte $8F   ; 
- D 0 - I - 0x0289D8 0A:89C8: BE        .byte $BE   ; 
- D 0 - I - 0x0289D9 0A:89C9: 8F        .byte $8F   ; 
- D 0 - I - 0x0289DA 0A:89CA: CC        .byte $CC   ; 
- D 0 - I - 0x0289DB 0A:89CB: 8F        .byte $8F   ; 
- D 0 - I - 0x0289DC 0A:89CC: E2        .byte $E2   ; 
- D 0 - I - 0x0289DD 0A:89CD: 8F        .byte $8F   ; 
- D 0 - I - 0x0289DE 0A:89CE: F9        .byte $F9   ; 
- D 0 - I - 0x0289DF 0A:89CF: 8F        .byte $8F   ; 
- D 0 - I - 0x0289E0 0A:89D0: 3A        .byte $3A   ; 
- D 0 - I - 0x0289E1 0A:89D1: 90        .byte $90   ; 
- D 0 - I - 0x0289E2 0A:89D2: 6F        .byte $6F   ; <o>
- D 0 - I - 0x0289E3 0A:89D3: 90        .byte $90   ; 
- D 0 - I - 0x0289E4 0A:89D4: A5        .byte $A5   ; 
- D 0 - I - 0x0289E5 0A:89D5: 90        .byte $90   ; 
- D 0 - I - 0x0289E6 0A:89D6: B3        .byte $B3   ; 
- D 0 - I - 0x0289E7 0A:89D7: 90        .byte $90   ; 
- D 0 - I - 0x0289E8 0A:89D8: CD        .byte $CD   ; 
- D 0 - I - 0x0289E9 0A:89D9: 90        .byte $90   ; 
- D 0 - I - 0x0289EA 0A:89DA: D2        .byte $D2   ; 
- D 0 - I - 0x0289EB 0A:89DB: 90        .byte $90   ; 
- D 0 - I - 0x0289EC 0A:89DC: D7        .byte $D7   ; 
- D 0 - I - 0x0289ED 0A:89DD: 90        .byte $90   ; 
- D 0 - I - 0x0289EE 0A:89DE: 0C        .byte $0C   ; 
- D 0 - I - 0x0289EF 0A:89DF: 91        .byte $91   ; 
- D 0 - I - 0x0289F0 0A:89E0: 41        .byte $41   ; <A>
- D 0 - I - 0x0289F1 0A:89E1: 91        .byte $91   ; 
- D 0 - I - 0x0289F2 0A:89E2: 52        .byte $52   ; <R>
- D 0 - I - 0x0289F3 0A:89E3: 91        .byte $91   ; 
- D 0 - I - 0x0289F4 0A:89E4: 60        .byte $60   ; 
- D 0 - I - 0x0289F5 0A:89E5: 91        .byte $91   ; 
- D 0 - I - 0x0289F6 0A:89E6: 77        .byte $77   ; <w>
- D 0 - I - 0x0289F7 0A:89E7: 91        .byte $91   ; 
- D 0 - I - 0x0289F8 0A:89E8: 8E        .byte $8E   ; 
- D 0 - I - 0x0289F9 0A:89E9: 91        .byte $91   ; 
- D 0 - I - 0x0289FA 0A:89EA: A5        .byte $A5   ; 
- D 0 - I - 0x0289FB 0A:89EB: 91        .byte $91   ; 
- D 0 - I - 0x0289FC 0A:89EC: BC        .byte $BC   ; 
- D 0 - I - 0x0289FD 0A:89ED: 91        .byte $91   ; 
- D 0 - I - 0x0289FE 0A:89EE: CA        .byte $CA   ; 
- D 0 - I - 0x0289FF 0A:89EF: 91        .byte $91   ; 
- D 0 - I - 0x028A00 0A:89F0: D8        .byte $D8   ; 
- D 0 - I - 0x028A01 0A:89F1: 91        .byte $91   ; 
- D 0 - I - 0x028A02 0A:89F2: E6        .byte $E6   ; 
- D 0 - I - 0x028A03 0A:89F3: 91        .byte $91   ; 
- D 0 - I - 0x028A04 0A:89F4: F4        .byte $F4   ; 
- D 0 - I - 0x028A05 0A:89F5: 91        .byte $91   ; 
- D 0 - I - 0x028A06 0A:89F6: 02        .byte $02   ; 
- D 0 - I - 0x028A07 0A:89F7: 92        .byte $92   ; 
- D 0 - I - 0x028A08 0A:89F8: 10        .byte $10   ; 
- D 0 - I - 0x028A09 0A:89F9: 92        .byte $92   ; 
- D 0 - I - 0x028A0A 0A:89FA: 1E        .byte $1E   ; 
- D 0 - I - 0x028A0B 0A:89FB: 92        .byte $92   ; 
- D 0 - I - 0x028A0C 0A:89FC: 32        .byte $32   ; <2>
- D 0 - I - 0x028A0D 0A:89FD: 92        .byte $92   ; 
- D 0 - I - 0x028A0E 0A:89FE: 40        .byte $40   ; 
- D 0 - I - 0x028A0F 0A:89FF: 92        .byte $92   ; 
- D 0 - I - 0x028A10 0A:8A00: 45        .byte $45   ; <E>
- D 0 - I - 0x028A11 0A:8A01: 92        .byte $92   ; 
- D 0 - I - 0x028A12 0A:8A02: 53        .byte $53   ; <S>
- D 0 - I - 0x028A13 0A:8A03: 92        .byte $92   ; 
- D 0 - I - 0x028A14 0A:8A04: 61        .byte $61   ; <a>
- D 0 - I - 0x028A15 0A:8A05: 92        .byte $92   ; 
- D 0 - I - 0x028A16 0A:8A06: 6F        .byte $6F   ; <o>
- D 0 - I - 0x028A17 0A:8A07: 92        .byte $92   ; 
- D 0 - I - 0x028A18 0A:8A08: 7D        .byte $7D   ; 
- D 0 - I - 0x028A19 0A:8A09: 92        .byte $92   ; 
- D 0 - I - 0x028A1A 0A:8A0A: 8B        .byte $8B   ; 
- D 0 - I - 0x028A1B 0A:8A0B: 92        .byte $92   ; 
- D 0 - I - 0x028A1C 0A:8A0C: 9F        .byte $9F   ; 
- D 0 - I - 0x028A1D 0A:8A0D: 92        .byte $92   ; 
- - - - - - 0x028A1E 0A:8A0E: AD        .byte $AD   ; 
- - - - - - 0x028A1F 0A:8A0F: 92        .byte $92   ; 
- D 0 - I - 0x028A20 0A:8A10: BB        .byte $BB   ; 
- D 0 - I - 0x028A21 0A:8A11: 92        .byte $92   ; 
- D 0 - I - 0x028A22 0A:8A12: C9        .byte $C9   ; 
- D 0 - I - 0x028A23 0A:8A13: 92        .byte $92   ; 
- D 0 - I - 0x028A24 0A:8A14: D7        .byte $D7   ; 
- D 0 - I - 0x028A25 0A:8A15: 92        .byte $92   ; 
- D 0 - I - 0x028A26 0A:8A16: E5        .byte $E5   ; 
- D 0 - I - 0x028A27 0A:8A17: 92        .byte $92   ; 
- D 0 - I - 0x028A28 0A:8A18: F3        .byte $F3   ; 
- D 0 - I - 0x028A29 0A:8A19: 92        .byte $92   ; 
- D 0 - I - 0x028A2A 0A:8A1A: 0D        .byte $0D   ; 
- D 0 - I - 0x028A2B 0A:8A1B: 93        .byte $93   ; 
- D 0 - I - 0x028A2C 0A:8A1C: 23        .byte $23   ; 
- D 0 - I - 0x028A2D 0A:8A1D: 93        .byte $93   ; 
- D 0 - I - 0x028A2E 0A:8A1E: 3D        .byte $3D   ; 
- D 0 - I - 0x028A2F 0A:8A1F: 93        .byte $93   ; 
- D 0 - I - 0x028A30 0A:8A20: 57        .byte $57   ; <W>
- D 0 - I - 0x028A31 0A:8A21: 93        .byte $93   ; 
- D 0 - I - 0x028A32 0A:8A22: 71        .byte $71   ; <q>
- D 0 - I - 0x028A33 0A:8A23: 93        .byte $93   ; 
- D 0 - I - 0x028A34 0A:8A24: 7F        .byte $7F   ; 
- D 0 - I - 0x028A35 0A:8A25: 93        .byte $93   ; 
- D 0 - I - 0x028A36 0A:8A26: 8D        .byte $8D   ; 
- D 0 - I - 0x028A37 0A:8A27: 93        .byte $93   ; 
- D 0 - I - 0x028A38 0A:8A28: A4        .byte $A4   ; 
- D 0 - I - 0x028A39 0A:8A29: 93        .byte $93   ; 
- D 0 - I - 0x028A3A 0A:8A2A: EC        .byte $EC   ; 
- D 0 - I - 0x028A3B 0A:8A2B: 93        .byte $93   ; 
- D 0 - I - 0x028A3C 0A:8A2C: 03        .byte $03   ; 
- D 0 - I - 0x028A3D 0A:8A2D: 94        .byte $94   ; 
- D 0 - I - 0x028A3E 0A:8A2E: 11        .byte $11   ; 
- D 0 - I - 0x028A3F 0A:8A2F: 94        .byte $94   ; 
- D 0 - I - 0x028A40 0A:8A30: 25        .byte $25   ; 
- D 0 - I - 0x028A41 0A:8A31: 94        .byte $94   ; 
- - - - - - 0x028A42 0A:8A32: 33        .byte $33   ; <3>
- - - - - - 0x028A43 0A:8A33: 94        .byte $94   ; 
- D 0 - I - 0x028A44 0A:8A34: 41        .byte $41   ; <A>
- D 0 - I - 0x028A45 0A:8A35: 94        .byte $94   ; 
- D 0 - I - 0x028A46 0A:8A36: 56        .byte $56   ; <V>
- D 0 - I - 0x028A47 0A:8A37: 94        .byte $94   ; 
- D 0 - I - 0x028A48 0A:8A38: 6A        .byte $6A   ; <j>
- D 0 - I - 0x028A49 0A:8A39: 94        .byte $94   ; 
- D 0 - I - 0x028A4A 0A:8A3A: 7E        .byte $7E   ; 
- D 0 - I - 0x028A4B 0A:8A3B: 94        .byte $94   ; 
- D 0 - I - 0x028A4C 0A:8A3C: 8C        .byte $8C   ; 
- D 0 - I - 0x028A4D 0A:8A3D: 94        .byte $94   ; 
- D 0 - I - 0x028A4E 0A:8A3E: A2        .byte $A2   ; 
- D 0 - I - 0x028A4F 0A:8A3F: 94        .byte $94   ; 
- D 0 - I - 0x028A50 0A:8A40: BC        .byte $BC   ; 
- D 0 - I - 0x028A51 0A:8A41: 94        .byte $94   ; 
- D 0 - I - 0x028A52 0A:8A42: F4        .byte $F4   ; 
- D 0 - I - 0x028A53 0A:8A43: 94        .byte $94   ; 
- D 0 - I - 0x028A54 0A:8A44: 2C        .byte $2C   ; 
- D 0 - I - 0x028A55 0A:8A45: 95        .byte $95   ; 
- D 0 - I - 0x028A56 0A:8A46: 49        .byte $49   ; <I>
- D 0 - I - 0x028A57 0A:8A47: 95        .byte $95   ; 
- D 0 - I - 0x028A58 0A:8A48: 79        .byte $79   ; <y>
- D 0 - I - 0x028A59 0A:8A49: 95        .byte $95   ; 
- D 0 - I - 0x028A5A 0A:8A4A: 87        .byte $87   ; 
- D 0 - I - 0x028A5B 0A:8A4B: 95        .byte $95   ; 
- D 0 - I - 0x028A5C 0A:8A4C: 98        .byte $98   ; 
- D 0 - I - 0x028A5D 0A:8A4D: 95        .byte $95   ; 
- D 0 - I - 0x028A5E 0A:8A4E: A6        .byte $A6   ; 
- D 0 - I - 0x028A5F 0A:8A4F: 95        .byte $95   ; 
- D 0 - I - 0x028A60 0A:8A50: B4        .byte $B4   ; 
- D 0 - I - 0x028A61 0A:8A51: 95        .byte $95   ; 
- D 0 - I - 0x028A62 0A:8A52: E6        .byte $E6   ; 
- D 0 - I - 0x028A63 0A:8A53: 95        .byte $95   ; 
- D 0 - I - 0x028A64 0A:8A54: F5        .byte $F5   ; 
- D 0 - I - 0x028A65 0A:8A55: 95        .byte $95   ; 
- D 0 - I - 0x028A66 0A:8A56: 03        .byte $03   ; 
- D 0 - I - 0x028A67 0A:8A57: 96        .byte $96   ; 
- D 0 - I - 0x028A68 0A:8A58: 18        .byte $18   ; 
- D 0 - I - 0x028A69 0A:8A59: 96        .byte $96   ; 
- D 0 - I - 0x028A6A 0A:8A5A: 51        .byte $51   ; <Q>
- D 0 - I - 0x028A6B 0A:8A5B: 96        .byte $96   ; 
- D 0 - I - 0x028A6C 0A:8A5C: 5F        .byte $5F   ; 
- D 0 - I - 0x028A6D 0A:8A5D: 96        .byte $96   ; 
- D 0 - I - 0x028A6E 0A:8A5E: 89        .byte $89   ; 
- D 0 - I - 0x028A6F 0A:8A5F: 96        .byte $96   ; 
- D 0 - I - 0x028A70 0A:8A60: 97        .byte $97   ; 
- D 0 - I - 0x028A71 0A:8A61: 96        .byte $96   ; 
- D 0 - I - 0x028A72 0A:8A62: D2        .byte $D2   ; 
- D 0 - I - 0x028A73 0A:8A63: 96        .byte $96   ; 
- D 0 - I - 0x028A74 0A:8A64: 3B        .byte $3B   ; 
- D 0 - I - 0x028A75 0A:8A65: 97        .byte $97   ; 
- D 0 - I - 0x028A76 0A:8A66: 49        .byte $49   ; <I>
- D 0 - I - 0x028A77 0A:8A67: 97        .byte $97   ; 
- D 0 - I - 0x028A78 0A:8A68: 60        .byte $60   ; 
- D 0 - I - 0x028A79 0A:8A69: 97        .byte $97   ; 
- D 0 - I - 0x028A7A 0A:8A6A: 6E        .byte $6E   ; <n>
- D 0 - I - 0x028A7B 0A:8A6B: 97        .byte $97   ; 
- D 0 - I - 0x028A7C 0A:8A6C: 84        .byte $84   ; 
- D 0 - I - 0x028A7D 0A:8A6D: 97        .byte $97   ; 
- D 0 - I - 0x028A7E 0A:8A6E: 98        .byte $98   ; 
- D 0 - I - 0x028A7F 0A:8A6F: 97        .byte $97   ; 
- D 0 - I - 0x028A80 0A:8A70: AF        .byte $AF   ; 
- D 0 - I - 0x028A81 0A:8A71: 97        .byte $97   ; 
- D 0 - I - 0x028A82 0A:8A72: BD        .byte $BD   ; 
- D 0 - I - 0x028A83 0A:8A73: 97        .byte $97   ; 
- D 0 - I - 0x028A84 0A:8A74: D1        .byte $D1   ; 
- D 0 - I - 0x028A85 0A:8A75: 97        .byte $97   ; 
- D 0 - I - 0x028A86 0A:8A76: E7        .byte $E7   ; 
- D 0 - I - 0x028A87 0A:8A77: 97        .byte $97   ; 
- D 0 - I - 0x028A88 0A:8A78: F7        .byte $F7   ; 
- D 0 - I - 0x028A89 0A:8A79: 97        .byte $97   ; 
- D 0 - I - 0x028A8A 0A:8A7A: 07        .byte $07   ; 
- D 0 - I - 0x028A8B 0A:8A7B: 98        .byte $98   ; 
- D 0 - I - 0x028A8C 0A:8A7C: 17        .byte $17   ; 
- D 0 - I - 0x028A8D 0A:8A7D: 98        .byte $98   ; 
- D 0 - I - 0x028A8E 0A:8A7E: 27        .byte $27   ; 
- D 0 - I - 0x028A8F 0A:8A7F: 98        .byte $98   ; 
- D 0 - I - 0x028A90 0A:8A80: 35        .byte $35   ; <5>
- D 0 - I - 0x028A91 0A:8A81: 98        .byte $98   ; 
- D 0 - I - 0x028A92 0A:8A82: 63        .byte $63   ; <c>
- D 0 - I - 0x028A93 0A:8A83: 98        .byte $98   ; 
- D 0 - I - 0x028A94 0A:8A84: 71        .byte $71   ; <q>
- D 0 - I - 0x028A95 0A:8A85: 98        .byte $98   ; 
- D 0 - I - 0x028A96 0A:8A86: 85        .byte $85   ; 
- D 0 - I - 0x028A97 0A:8A87: 98        .byte $98   ; 
- D 0 - I - 0x028A98 0A:8A88: AB        .byte $AB   ; 
- D 0 - I - 0x028A99 0A:8A89: 98        .byte $98   ; 
- D 0 - I - 0x028A9A 0A:8A8A: C5        .byte $C5   ; 
- D 0 - I - 0x028A9B 0A:8A8B: 98        .byte $98   ; 
- D 0 - I - 0x028A9C 0A:8A8C: D4        .byte $D4   ; 
- D 0 - I - 0x028A9D 0A:8A8D: 98        .byte $98   ; 
- D 0 - I - 0x028A9E 0A:8A8E: 13        .byte $13   ; 
- D 0 - I - 0x028A9F 0A:8A8F: 99        .byte $99   ; 
- D 0 - I - 0x028AA0 0A:8A90: 22        .byte $22   ; 
- D 0 - I - 0x028AA1 0A:8A91: 99        .byte $99   ; 
- D 0 - I - 0x028AA2 0A:8A92: 31        .byte $31   ; <1>
- D 0 - I - 0x028AA3 0A:8A93: 99        .byte $99   ; 
- D 0 - I - 0x028AA4 0A:8A94: 6C        .byte $6C   ; <l>
- D 0 - I - 0x028AA5 0A:8A95: 99        .byte $99   ; 
- D 0 - I - 0x028AA6 0A:8A96: 7B        .byte $7B   ; 
- D 0 - I - 0x028AA7 0A:8A97: 99        .byte $99   ; 
- D 0 - I - 0x028AA8 0A:8A98: 81        .byte $81   ; 
- D 0 - I - 0x028AA9 0A:8A99: 99        .byte $99   ; 
- D 0 - I - 0x028AAA 0A:8A9A: 90        .byte $90   ; 
- D 0 - I - 0x028AAB 0A:8A9B: 99        .byte $99   ; 
- D 0 - I - 0x028AAC 0A:8A9C: 96        .byte $96   ; 
- D 0 - I - 0x028AAD 0A:8A9D: 99        .byte $99   ; 
- D 0 - I - 0x028AAE 0A:8A9E: A5        .byte $A5   ; 
- D 0 - I - 0x028AAF 0A:8A9F: 99        .byte $99   ; 
- D 0 - I - 0x028AB0 0A:8AA0: AB        .byte $AB   ; 
- D 0 - I - 0x028AB1 0A:8AA1: 99        .byte $99   ; 
- D 0 - I - 0x028AB2 0A:8AA2: B1        .byte $B1   ; 
- D 0 - I - 0x028AB3 0A:8AA3: 99        .byte $99   ; 
- D 0 - I - 0x028AB4 0A:8AA4: D4        .byte $D4   ; 
- D 0 - I - 0x028AB5 0A:8AA5: 99        .byte $99   ; 
- D 0 - I - 0x028AB6 0A:8AA6: DA        .byte $DA   ; 
- D 0 - I - 0x028AB7 0A:8AA7: 99        .byte $99   ; 
- D 0 - I - 0x028AB8 0A:8AA8: E0        .byte $E0   ; 
- D 0 - I - 0x028AB9 0A:8AA9: 99        .byte $99   ; 
- D 0 - I - 0x028ABA 0A:8AAA: E6        .byte $E6   ; 
- D 0 - I - 0x028ABB 0A:8AAB: 99        .byte $99   ; 
- D 0 - I - 0x028ABC 0A:8AAC: EC        .byte $EC   ; 
- D 0 - I - 0x028ABD 0A:8AAD: 99        .byte $99   ; 
- D 0 - I - 0x028ABE 0A:8AAE: F2        .byte $F2   ; 
- D 0 - I - 0x028ABF 0A:8AAF: 99        .byte $99   ; 
- D 0 - I - 0x028AC0 0A:8AB0: F8        .byte $F8   ; 
- D 0 - I - 0x028AC1 0A:8AB1: 99        .byte $99   ; 
- D 0 - I - 0x028AC2 0A:8AB2: 07        .byte $07   ; 
- D 0 - I - 0x028AC3 0A:8AB3: 9A        .byte $9A   ; 
- D 0 - I - 0x028AC4 0A:8AB4: 42        .byte $42   ; <B>
- D 0 - I - 0x028AC5 0A:8AB5: 9A        .byte $9A   ; 
- D 0 - I - 0x028AC6 0A:8AB6: 50        .byte $50   ; <P>
- D 0 - I - 0x028AC7 0A:8AB7: 9A        .byte $9A   ; 
- D 0 - I - 0x028AC8 0A:8AB8: 8B        .byte $8B   ; 
- D 0 - I - 0x028AC9 0A:8AB9: 9A        .byte $9A   ; 
- D 0 - I - 0x028ACA 0A:8ABA: 9A        .byte $9A   ; 
- D 0 - I - 0x028ACB 0A:8ABB: 9A        .byte $9A   ; 
- D 0 - I - 0x028ACC 0A:8ABC: A0        .byte $A0   ; 
- D 0 - I - 0x028ACD 0A:8ABD: 9A        .byte $9A   ; 
- D 0 - I - 0x028ACE 0A:8ABE: AF        .byte $AF   ; 
- D 0 - I - 0x028ACF 0A:8ABF: 9A        .byte $9A   ; 
- D 0 - I - 0x028AD0 0A:8AC0: BE        .byte $BE   ; 
- D 0 - I - 0x028AD1 0A:8AC1: 9A        .byte $9A   ; 
- D 0 - I - 0x028AD2 0A:8AC2: D5        .byte $D5   ; 
- D 0 - I - 0x028AD3 0A:8AC3: 9A        .byte $9A   ; 
- D 0 - I - 0x028AD4 0A:8AC4: E4        .byte $E4   ; 
- D 0 - I - 0x028AD5 0A:8AC5: 9A        .byte $9A   ; 
- D 0 - I - 0x028AD6 0A:8AC6: F3        .byte $F3   ; 
- D 0 - I - 0x028AD7 0A:8AC7: 9A        .byte $9A   ; 
- D 0 - I - 0x028AD8 0A:8AC8: 02        .byte $02   ; 
- D 0 - I - 0x028AD9 0A:8AC9: 9B        .byte $9B   ; 
- D 0 - I - 0x028ADA 0A:8ACA: 11        .byte $11   ; 
- D 0 - I - 0x028ADB 0A:8ACB: 9B        .byte $9B   ; 
- D 0 - I - 0x028ADC 0A:8ACC: 20        .byte $20   ; 
- D 0 - I - 0x028ADD 0A:8ACD: 9B        .byte $9B   ; 
- D 0 - I - 0x028ADE 0A:8ACE: 2F        .byte $2F   ; 
- D 0 - I - 0x028ADF 0A:8ACF: 9B        .byte $9B   ; 
- D 0 - I - 0x028AE0 0A:8AD0: 35        .byte $35   ; <5>
- D 0 - I - 0x028AE1 0A:8AD1: 9B        .byte $9B   ; 
- D 0 - I - 0x028AE2 0A:8AD2: 44        .byte $44   ; <D>
- D 0 - I - 0x028AE3 0A:8AD3: 9B        .byte $9B   ; 
- D 0 - I - 0x028AE4 0A:8AD4: 53        .byte $53   ; <S>
- D 0 - I - 0x028AE5 0A:8AD5: 9B        .byte $9B   ; 
- D 0 - I - 0x028AE6 0A:8AD6: 62        .byte $62   ; <b>
- D 0 - I - 0x028AE7 0A:8AD7: 9B        .byte $9B   ; 
- D 0 - I - 0x028AE8 0A:8AD8: 71        .byte $71   ; <q>
- D 0 - I - 0x028AE9 0A:8AD9: 9B        .byte $9B   ; 
- D 0 - I - 0x028AEA 0A:8ADA: 80        .byte $80   ; 
- D 0 - I - 0x028AEB 0A:8ADB: 9B        .byte $9B   ; 
- D 0 - I - 0x028AEC 0A:8ADC: 8F        .byte $8F   ; 
- D 0 - I - 0x028AED 0A:8ADD: 9B        .byte $9B   ; 
- D 0 - I - 0x028AEE 0A:8ADE: 9E        .byte $9E   ; 
- D 0 - I - 0x028AEF 0A:8ADF: 9B        .byte $9B   ; 
- D 0 - I - 0x028AF0 0A:8AE0: AD        .byte $AD   ; 
- D 0 - I - 0x028AF1 0A:8AE1: 9B        .byte $9B   ; 
- D 0 - I - 0x028AF2 0A:8AE2: BC        .byte $BC   ; 
- D 0 - I - 0x028AF3 0A:8AE3: 9B        .byte $9B   ; 
- D 0 - I - 0x028AF4 0A:8AE4: CB        .byte $CB   ; 
- D 0 - I - 0x028AF5 0A:8AE5: 9B        .byte $9B   ; 
- D 0 - I - 0x028AF6 0A:8AE6: 06        .byte $06   ; 
- D 0 - I - 0x028AF7 0A:8AE7: 9C        .byte $9C   ; 
- D 0 - I - 0x028AF8 0A:8AE8: 38        .byte $38   ; <8>
- D 0 - I - 0x028AF9 0A:8AE9: 9C        .byte $9C   ; 
- D 0 - I - 0x028AFA 0A:8AEA: 46        .byte $46   ; <F>
- D 0 - I - 0x028AFB 0A:8AEB: 9C        .byte $9C   ; 
- D 0 - I - 0x028AFC 0A:8AEC: 54        .byte $54   ; <T>
- D 0 - I - 0x028AFD 0A:8AED: 9C        .byte $9C   ; 
- D 0 - I - 0x028AFE 0A:8AEE: 62        .byte $62   ; <b>
- D 0 - I - 0x028AFF 0A:8AEF: 9C        .byte $9C   ; 
- D 0 - I - 0x028B00 0A:8AF0: 70        .byte $70   ; <p>
- D 0 - I - 0x028B01 0A:8AF1: 9C        .byte $9C   ; 
- D 0 - I - 0x028B02 0A:8AF2: 93        .byte $93   ; 
- D 0 - I - 0x028B03 0A:8AF3: 9C        .byte $9C   ; 
- D 0 - I - 0x028B04 0A:8AF4: AD        .byte $AD   ; 
- D 0 - I - 0x028B05 0A:8AF5: 9C        .byte $9C   ; 
- D 0 - I - 0x028B06 0A:8AF6: D7        .byte $D7   ; 
- D 0 - I - 0x028B07 0A:8AF7: 9C        .byte $9C   ; 
- D 0 - I - 0x028B08 0A:8AF8: FB        .byte $FB   ; 
- D 0 - I - 0x028B09 0A:8AF9: 9C        .byte $9C   ; 
- D 0 - I - 0x028B0A 0A:8AFA: 0F        .byte $0F   ; 
- D 0 - I - 0x028B0B 0A:8AFB: 9D        .byte $9D   ; 
- D 0 - I - 0x028B0C 0A:8AFC: 34        .byte $34   ; <4>
- D 0 - I - 0x028B0D 0A:8AFD: 9D        .byte $9D   ; 
- D 0 - I - 0x028B0E 0A:8AFE: 79        .byte $79   ; <y>
- D 0 - I - 0x028B0F 0A:8AFF: 9D        .byte $9D   ; 
- D 0 - I - 0x028B10 0A:8B00: 87        .byte $87   ; 
- D 0 - I - 0x028B11 0A:8B01: 9D        .byte $9D   ; 
- D 0 - I - 0x028B12 0A:8B02: A4        .byte $A4   ; 
- D 0 - I - 0x028B13 0A:8B03: 9D        .byte $9D   ; 
- D 0 - I - 0x028B14 0A:8B04: B8        .byte $B8   ; 
- D 0 - I - 0x028B15 0A:8B05: 9D        .byte $9D   ; 
- D 0 - I - 0x028B16 0A:8B06: E9        .byte $E9   ; 
- D 0 - I - 0x028B17 0A:8B07: 9D        .byte $9D   ; 
- D 0 - I - 0x028B18 0A:8B08: 07        .byte $07   ; 
- D 0 - I - 0x028B19 0A:8B09: 9E        .byte $9E   ; 
- D 0 - I - 0x028B1A 0A:8B0A: 21        .byte $21   ; 
- D 0 - I - 0x028B1B 0A:8B0B: 9E        .byte $9E   ; 
- D 0 - I - 0x028B1C 0A:8B0C: 3B        .byte $3B   ; 
- D 0 - I - 0x028B1D 0A:8B0D: 9E        .byte $9E   ; 
- D 0 - I - 0x028B1E 0A:8B0E: 55        .byte $55   ; <U>
- D 0 - I - 0x028B1F 0A:8B0F: 9E        .byte $9E   ; 
- D 0 - I - 0x028B20 0A:8B10: 6B        .byte $6B   ; <k>
- D 0 - I - 0x028B21 0A:8B11: 9E        .byte $9E   ; 
- D 0 - I - 0x028B22 0A:8B12: 7A        .byte $7A   ; <z>
- D 0 - I - 0x028B23 0A:8B13: 9E        .byte $9E   ; 
- D 0 - I - 0x028B24 0A:8B14: 89        .byte $89   ; 
- D 0 - I - 0x028B25 0A:8B15: 9E        .byte $9E   ; 
- D 0 - I - 0x028B26 0A:8B16: 97        .byte $97   ; 
- D 0 - I - 0x028B27 0A:8B17: 9E        .byte $9E   ; 
- D 0 - I - 0x028B28 0A:8B18: A5        .byte $A5   ; 
- D 0 - I - 0x028B29 0A:8B19: 9E        .byte $9E   ; 
- D 0 - I - 0x028B2A 0A:8B1A: B3        .byte $B3   ; 
- D 0 - I - 0x028B2B 0A:8B1B: 9E        .byte $9E   ; 
- D 0 - I - 0x028B2C 0A:8B1C: C1        .byte $C1   ; 
- D 0 - I - 0x028B2D 0A:8B1D: 9E        .byte $9E   ; 
- D 0 - I - 0x028B2E 0A:8B1E: CF        .byte $CF   ; 
- D 0 - I - 0x028B2F 0A:8B1F: 9E        .byte $9E   ; 
- D 0 - I - 0x028B30 0A:8B20: 1F        .byte $1F   ; 
- D 0 - I - 0x028B31 0A:8B21: 9F        .byte $9F   ; 
- D 0 - I - 0x028B32 0A:8B22: 3C        .byte $3C   ; 
- D 0 - I - 0x028B33 0A:8B23: 9F        .byte $9F   ; 
- D 0 - I - 0x028B34 0A:8B24: 56        .byte $56   ; <V>
- D 0 - I - 0x028B35 0A:8B25: 9F        .byte $9F   ; 
- D 0 - I - 0x028B36 0A:8B26: 6D        .byte $6D   ; <m>
- D 0 - I - 0x028B37 0A:8B27: 9F        .byte $9F   ; 
- D 0 - I - 0x028B38 0A:8B28: A8        .byte $A8   ; 
- D 0 - I - 0x028B39 0A:8B29: 9F        .byte $9F   ; 
- D 0 - I - 0x028B3A 0A:8B2A: C4        .byte $C4   ; 
- D 0 - I - 0x028B3B 0A:8B2B: 9F        .byte $9F   ; 
- D 0 - I - 0x028B3C 0A:8B2C: C9        .byte $C9   ; 
- D 0 - I - 0x028B3D 0A:8B2D: 9F        .byte $9F   ; 
- D 0 - I - 0x028B3E 0A:8B2E: 4C        .byte $4C   ; <L>
- D 0 - I - 0x028B3F 0A:8B2F: A0        .byte $A0   ; 
- D 0 - I - 0x028B40 0A:8B30: 66        .byte $66   ; <f>
- D 0 - I - 0x028B41 0A:8B31: A0        .byte $A0   ; 
- D 0 - I - 0x028B42 0A:8B32: 8F        .byte $8F   ; 
- D 0 - I - 0x028B43 0A:8B33: A0        .byte $A0   ; 
- D 0 - I - 0x028B44 0A:8B34: A3        .byte $A3   ; 
- D 0 - I - 0x028B45 0A:8B35: A0        .byte $A0   ; 
- D 0 - I - 0x028B46 0A:8B36: A8        .byte $A8   ; 
- D 0 - I - 0x028B47 0A:8B37: A0        .byte $A0   ; 
- D 0 - I - 0x028B48 0A:8B38: BE        .byte $BE   ; 
- D 0 - I - 0x028B49 0A:8B39: A0        .byte $A0   ; 
- D 0 - I - 0x028B4A 0A:8B3A: EA        .byte $EA   ; 
- D 0 - I - 0x028B4B 0A:8B3B: A0        .byte $A0   ; 
- D 0 - I - 0x028B4C 0A:8B3C: F8        .byte $F8   ; 
- D 0 - I - 0x028B4D 0A:8B3D: A0        .byte $A0   ; 
- D 0 - I - 0x028B4E 0A:8B3E: 06        .byte $06   ; 
- D 0 - I - 0x028B4F 0A:8B3F: A1        .byte $A1   ; 
- D 0 - I - 0x028B50 0A:8B40: 1D        .byte $1D   ; 
- D 0 - I - 0x028B51 0A:8B41: A1        .byte $A1   ; 
- D 0 - I - 0x028B52 0A:8B42: 30        .byte $30   ; <0>
- D 0 - I - 0x028B53 0A:8B43: A1        .byte $A1   ; 
- D 0 - I - 0x028B54 0A:8B44: 3E        .byte $3E   ; 
- D 0 - I - 0x028B55 0A:8B45: A1        .byte $A1   ; 
- D 0 - I - 0x028B56 0A:8B46: 79        .byte $79   ; <y>
- D 0 - I - 0x028B57 0A:8B47: A1        .byte $A1   ; 
- D 0 - I - 0x028B58 0A:8B48: F5        .byte $F5   ; 
- D 0 - I - 0x028B59 0A:8B49: 0B        .byte $0B   ; 
- D 0 - I - 0x028B5A 0A:8B4A: F4        .byte $F4   ; 
- D 0 - I - 0x028B5B 0A:8B4B: 1F        .byte $1F   ; 
- D 0 - I - 0x028B5C 0A:8B4C: 00        .byte $00   ; 
- D 0 - I - 0x028B5D 0A:8B4D: 00        .byte $00   ; 
- D 0 - I - 0x028B5E 0A:8B4E: 00        .byte $00   ; 
- D 0 - I - 0x028B5F 0A:8B4F: F6        .byte $F6   ; 
- D 0 - I - 0x028B60 0A:8B50: 00        .byte $00   ; 
- D 0 - I - 0x028B61 0A:8B51: F6        .byte $F6   ; 
- D 0 - I - 0x028B62 0A:8B52: 15        .byte $15   ; 
- D 0 - I - 0x028B63 0A:8B53: F6        .byte $F6   ; 
- D 0 - I - 0x028B64 0A:8B54: 2A        .byte $2A   ; 
- D 0 - I - 0x028B65 0A:8B55: F6        .byte $F6   ; 
- D 0 - I - 0x028B66 0A:8B56: 3F        .byte $3F   ; 
- D 0 - I - 0x028B67 0A:8B57: F6        .byte $F6   ; 
- D 0 - I - 0x028B68 0A:8B58: 54        .byte $54   ; <T>
- D 0 - I - 0x028B69 0A:8B59: F6        .byte $F6   ; 
- D 0 - I - 0x028B6A 0A:8B5A: 69        .byte $69   ; <i>
- D 0 - I - 0x028B6B 0A:8B5B: F0        .byte $F0   ; 
- D 0 - I - 0x028B6C 0A:8B5C: F5        .byte $F5   ; 
- D 0 - I - 0x028B6D 0A:8B5D: 09        .byte $09   ; 
- D 0 - I - 0x028B6E 0A:8B5E: F4        .byte $F4   ; 
- D 0 - I - 0x028B6F 0A:8B5F: 04        .byte $04   ; 
- D 0 - I - 0x028B70 0A:8B60: 05        .byte $05   ; 
- D 0 - I - 0x028B71 0A:8B61: 00        .byte $00   ; 
- D 0 - I - 0x028B72 0A:8B62: 00        .byte $00   ; 
- D 0 - I - 0x028B73 0A:8B63: F1        .byte $F1   ; 
- D 0 - I - 0x028B74 0A:8B64: 0B        .byte $0B   ; 
- D 0 - I - 0x028B75 0A:8B65: BA        .byte $BA   ; 
- D 0 - I - 0x028B76 0A:8B66: B8        .byte $B8   ; 
- D 0 - I - 0x028B77 0A:8B67: F3        .byte $F3   ; 
- D 0 - I - 0x028B78 0A:8B68: 00        .byte $00   ; 
- D 0 - I - 0x028B79 0A:8B69: F0        .byte $F0   ; 
- D 0 - I - 0x028B7A 0A:8B6A: F5        .byte $F5   ; 
- D 0 - I - 0x028B7B 0A:8B6B: 83        .byte $83   ; 
- D 0 - I - 0x028B7C 0A:8B6C: F4        .byte $F4   ; 
- D 0 - I - 0x028B7D 0A:8B6D: 12        .byte $12   ; 
- D 0 - I - 0x028B7E 0A:8B6E: 00        .byte $00   ; 
- D 0 - I - 0x028B7F 0A:8B6F: 00        .byte $00   ; 
- D 0 - I - 0x028B80 0A:8B70: 00        .byte $00   ; 
- D 0 - I - 0x028B81 0A:8B71: F1        .byte $F1   ; 
- D 0 - I - 0x028B82 0A:8B72: 00        .byte $00   ; 
- D 0 - I - 0x028B83 0A:8B73: 01        .byte $01   ; 
- D 0 - I - 0x028B84 0A:8B74: 00        .byte $00   ; 
- D 0 - I - 0x028B85 0A:8B75: C3        .byte $C3   ; 
- D 0 - I - 0x028B86 0A:8B76: 01        .byte $01   ; 
- D 0 - I - 0x028B87 0A:8B77: F0        .byte $F0   ; 
- D 0 - I - 0x028B88 0A:8B78: F5        .byte $F5   ; 
- D 0 - I - 0x028B89 0A:8B79: 83        .byte $83   ; 
- D 0 - I - 0x028B8A 0A:8B7A: F4        .byte $F4   ; 
- D 0 - I - 0x028B8B 0A:8B7B: 18        .byte $18   ; 
- D 0 - I - 0x028B8C 0A:8B7C: 19        .byte $19   ; 
- D 0 - I - 0x028B8D 0A:8B7D: 1A        .byte $1A   ; 
- D 0 - I - 0x028B8E 0A:8B7E: 1B        .byte $1B   ; 
- D 0 - I - 0x028B8F 0A:8B7F: F1        .byte $F1   ; 
- D 0 - I - 0x028B90 0A:8B80: 46        .byte $46   ; <F>
- D 0 - I - 0x028B91 0A:8B81: 40        .byte $40   ; 
- D 0 - I - 0x028B92 0A:8B82: E8        .byte $E8   ; 
- D 0 - I - 0x028B93 0A:8B83: BB        .byte $BB   ; 
- D 0 - I - 0x028B94 0A:8B84: 00        .byte $00   ; 
- D 0 - I - 0x028B95 0A:8B85: F0        .byte $F0   ; 
- D 0 - I - 0x028B96 0A:8B86: F5        .byte $F5   ; 
- D 0 - I - 0x028B97 0A:8B87: 83        .byte $83   ; 
- D 0 - I - 0x028B98 0A:8B88: F4        .byte $F4   ; 
- D 0 - I - 0x028B99 0A:8B89: 18        .byte $18   ; 
- D 0 - I - 0x028B9A 0A:8B8A: 19        .byte $19   ; 
- D 0 - I - 0x028B9B 0A:8B8B: 1A        .byte $1A   ; 
- D 0 - I - 0x028B9C 0A:8B8C: 2B        .byte $2B   ; 
- D 0 - I - 0x028B9D 0A:8B8D: F1        .byte $F1   ; 
- D 0 - I - 0x028B9E 0A:8B8E: 37        .byte $37   ; <7>
- D 0 - I - 0x028B9F 0A:8B8F: 05        .byte $05   ; 
- D 0 - I - 0x028BA0 0A:8B90: 18        .byte $18   ; 
- D 0 - I - 0x028BA1 0A:8B91: CB        .byte $CB   ; 