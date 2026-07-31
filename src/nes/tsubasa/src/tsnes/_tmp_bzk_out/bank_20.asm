.segment "???"
.include "bank_ram.inc"
; 0x028010-0x02A00F

- - - - - - 0x028010 0A:8000: 4C        .byte $4C   ; <L>
- - - - - - 0x028011 0A:8001: 0F        .byte $0F   ; 
C - - - - - 0x028012 0A:8002: 80        UNDEFINED
C - - - - - 0x028013 0A:8003: 4C DC 84  JMP $84DC
C - - - - - 0x028016 0A:8006: 4C D9 83  JMP $83D9
C - - - - - 0x028019 0A:8009: 4C 24 86  JMP $8624
C - - - - - 0x02801C 0A:800C: 4C 96 87  JMP $8796
C D 0 - - - 0x02801F 0A:800F: AD 3A 05  LDA ram_053A
C - - - - - 0x028022 0A:8012: F0 6F     BEQ $8083
C - - - - - 0x028024 0A:8014: 10 51     BPL $8067
C - - - - - 0x028026 0A:8016: A2 01     LDX #$01
C - - - - - 0x028028 0A:8018: 8E 3A 05  STX ram_053A
C - - - - - 0x02802B 0A:801B: AD 3C 05  LDA ram_053C
C - - - - - 0x02802E 0A:801E: A2 68     LDX #$68
C - - - - - 0x028030 0A:8020: 86 4C     STX ram_004C
C - - - - - 0x028032 0A:8022: A2 89     LDX #$89
C - - - - - 0x028034 0A:8024: 86 4D     STX ram_004D
C - - - - - 0x028036 0A:8026: 0A        ASL
C - - - - - 0x028037 0A:8027: 90 02     BCC $802B
C - - - - - 0x028039 0A:8029: E6 4D     INC ram_004D
C - - - - - 0x02803B 0A:802B: A8        TAY
C - - - - - 0x02803C 0A:802C: B1 4C     LDA (ram_004C),Y
C - - - - - 0x02803E 0A:802E: AA        TAX
C - - - - - 0x02803F 0A:802F: C8        INY
C - - - - - 0x028040 0A:8030: B1 4C     LDA (ram_004C),Y
C - - - - - 0x028042 0A:8032: 86 4C     STX ram_004C
C - - - - - 0x028044 0A:8034: 85 4D     STA ram_004D
C - - - - - 0x028046 0A:8036: A2 00     LDX #$00
C - - - - - 0x028048 0A:8038: A9 00     LDA #$00
C - - - - - 0x02804A 0A:803A: 9D 47 05  STA ram_0547,X
C - - - - - 0x02804D 0A:803D: 8A        TXA
C - - - - - 0x02804E 0A:803E: 18        CLC
C - - - - - 0x02804F 0A:803F: 69 15     ADC #$15
C - - - - - 0x028051 0A:8041: AA        TAX
C - - - - - 0x028052 0A:8042: C9 7E     CMP #$7E
C - - - - - 0x028054 0A:8044: D0 F2     BNE $8038
C - - - - - 0x028056 0A:8046: A9 01     LDA #$01
C - - - - - 0x028058 0A:8048: 8D 3B 05  STA ram_053B
C - - - - - 0x02805B 0A:804B: A9 00     LDA #$00
C - - - - - 0x02805D 0A:804D: 8D 3D 05  STA ram_053D
C - - - - - 0x028060 0A:8050: 8D 40 05  STA ram_0540
C - - - - - 0x028063 0A:8053: A9 FF     LDA #$FF
C - - - - - 0x028065 0A:8055: 8D 41 05  STA ram_0541
C - - - - - 0x028068 0A:8058: A9 01     LDA #$01
C - - - - - 0x02806A 0A:805A: 8D 43 05  STA ram_0543
C - - - - - 0x02806D 0A:805D: A9 23     LDA #$23
C - - - - - 0x02806F 0A:805F: 8D 44 05  STA ram_0544
C - - - - - 0x028072 0A:8062: A9 45     LDA #$45
C - - - - - 0x028074 0A:8064: 8D 45 05  STA ram_0545
C - - - - - 0x028077 0A:8067: CE 3B 05  DEC ram_053B
C - - - - - 0x02807A 0A:806A: F0 01     BEQ $806D
C - - - - - 0x02807C 0A:806C: 60        RTS
C D 0 - - - 0x02807D 0A:806D: A0 00     LDY #$00
C - - - - - 0x02807F 0A:806F: B1 4C     LDA (ram_004C),Y
C - - - - - 0x028081 0A:8071: C9 F0     CMP #$F0
C - - - - - 0x028083 0A:8073: 90 06     BCC $807B
C - - - - - 0x028085 0A:8075: 20 84 80  JSR $8084
C - - - - - 0x028088 0A:8078: 4C 6D 80  JMP $806D
C - - - - - 0x02808B 0A:807B: 8D 3B 05  STA ram_053B
C - - - - - 0x02808E 0A:807E: A9 01     LDA #$01
C - - - - - 0x028090 0A:8080: 20 CF 83  JSR $83CF
C - - - - - 0x028093 0A:8083: 60        RTS
C - - - - - 0x028094 0A:8084: 38        SEC
C - - - - - 0x028095 0A:8085: E9 F0     SBC #$F0
C - - - - - 0x028097 0A:8087: 20 09 C5  JSR $C509
- D 0 - I - 0x02809A 0A:808A: A2        .byte $A2   ; 
- D 0 - I - 0x02809B 0A:808B: 80        .byte $80   ; 
- D 0 - I - 0x02809C 0A:808C: AA        .byte $AA   ; 
- D 0 - I - 0x02809D 0A:808D: 80        .byte $80   ; 
- - - - - - 0x02809E 0A:808E: 2B        .byte $2B   ; 
- - - - - - 0x02809F 0A:808F: 81        .byte $81   ; 
- - - - - - 0x0280A0 0A:8090: 38        .byte $38   ; <8>
- - - - - - 0x0280A1 0A:8091: 81        .byte $81   ; 
- D 0 - I - 0x0280A2 0A:8092: 42        .byte $42   ; <B>
- D 0 - I - 0x0280A3 0A:8093: 81        .byte $81   ; 
- D 0 - I - 0x0280A4 0A:8094: 53        .byte $53   ; <S>
- D 0 - I - 0x0280A5 0A:8095: 81        .byte $81   ; 
- D 0 - I - 0x0280A6 0A:8096: AE        .byte $AE   ; 
- D 0 - I - 0x0280A7 0A:8097: 83        .byte $83   ; 
- D 0 - I - 0x0280A8 0A:8098: BD        .byte $BD   ; 
- D 0 - I - 0x0280A9 0A:8099: 83        .byte $83   ; 
- D 0 - I - 0x0280AA 0A:809A: 6F        .byte $6F   ; <o>
- D 0 - I - 0x0280AB 0A:809B: 81        .byte $81   ; 
- D 0 - I - 0x0280AC 0A:809C: 7C        .byte $7C   ; 
- D 0 - I - 0x0280AD 0A:809D: 81        .byte $81   ; 
- D 0 - I - 0x0280AE 0A:809E: 95        .byte $95   ; 
- D 0 - I - 0x0280AF 0A:809F: 81        .byte $81   ; 
- D 0 - I - 0x0280B0 0A:80A0: A9        .byte $A9   ; 
- D 0 - I - 0x0280B1 0A:80A1: 81        .byte $81   ; 
C - - J - - 0x0280B2 0A:80A2: 68        PLA
C - - - - - 0x0280B3 0A:80A3: 68        PLA
C - - - - - 0x0280B4 0A:80A4: A9 00     LDA #$00
C - - - - - 0x0280B6 0A:80A6: 8D 3A 05  STA ram_053A
C - - - - - 0x0280B9 0A:80A9: 60        RTS
C - - J - - 0x0280BA 0A:80AA: A0 05     LDY #$05
C - - - - - 0x0280BC 0A:80AC: B1 4C     LDA (ram_004C),Y
C - - - - - 0x0280BE 0A:80AE: 29 1C     AND #$1C
C - - - - - 0x0280C0 0A:80B0: 4A        LSR
C - - - - - 0x0280C1 0A:80B1: AA        TAX
C - - - - - 0x0280C2 0A:80B2: BD E4 88  LDA $88E4,X
C - - - - - 0x0280C5 0A:80B5: 85 3A     STA ram_003A
C - - - - - 0x0280C7 0A:80B7: BD E5 88  LDA $88E5,X
C - - - - - 0x0280CA 0A:80BA: 85 3B     STA ram_003B
C - - - - - 0x0280CC 0A:80BC: A0 00     LDY #$00
C - - - - - 0x0280CE 0A:80BE: 98        TYA
C - - - - - 0x0280CF 0A:80BF: 91 3A     STA (ram_003A),Y
C - - - - - 0x0280D1 0A:80C1: C8        INY
C - - - - - 0x0280D2 0A:80C2: C0 15     CPY #$15
C - - - - - 0x0280D4 0A:80C4: D0 F9     BNE $80BF
C - - - - - 0x0280D6 0A:80C6: A0 01     LDY #$01
C - - - - - 0x0280D8 0A:80C8: B1 4C     LDA (ram_004C),Y
C - - - - - 0x0280DA 0A:80CA: A2 B4     LDX #$B4
C - - - - - 0x0280DC 0A:80CC: 86 3E     STX ram_003E
C - - - - - 0x0280DE 0A:80CE: A2 A1     LDX #$A1
C - - - - - 0x0280E0 0A:80D0: 0A        ASL
C - - - - - 0x0280E1 0A:80D1: 90 01     BCC $80D4
C - - - - - 0x0280E3 0A:80D3: E8        INX
C - - - - - 0x0280E4 0A:80D4: 86 3F     STX ram_003F
C - - - - - 0x0280E6 0A:80D6: A8        TAY
C - - - - - 0x0280E7 0A:80D7: B1 3E     LDA (ram_003E),Y
C - - - - - 0x0280E9 0A:80D9: AA        TAX
C - - - - - 0x0280EA 0A:80DA: C8        INY
C - - - - - 0x0280EB 0A:80DB: B1 3E     LDA (ram_003E),Y
C - - - - - 0x0280ED 0A:80DD: A0 02     LDY #$02
C - - - - - 0x0280EF 0A:80DF: 91 3A     STA (ram_003A),Y
C - - - - - 0x0280F1 0A:80E1: 88        DEY
C - - - - - 0x0280F2 0A:80E2: 8A        TXA
C - - - - - 0x0280F3 0A:80E3: 91 3A     STA (ram_003A),Y
C - - - - - 0x0280F5 0A:80E5: A0 02     LDY #$02
C - - - - - 0x0280F7 0A:80E7: B1 4C     LDA (ram_004C),Y
C - - - - - 0x0280F9 0A:80E9: A2 47     LDX #$47
C - - - - - 0x0280FB 0A:80EB: 86 3E     STX ram_003E
C - - - - - 0x0280FD 0A:80ED: A2 AC     LDX #$AC
C - - - - - 0x0280FF 0A:80EF: 0A        ASL
C - - - - - 0x028100 0A:80F0: 90 01     BCC $80F3
C - - - - - 0x028102 0A:80F2: E8        INX
C - - - - - 0x028103 0A:80F3: 86 3F     STX ram_003F
C - - - - - 0x028105 0A:80F5: A8        TAY
C - - - - - 0x028106 0A:80F6: B1 3E     LDA (ram_003E),Y
C - - - - - 0x028108 0A:80F8: AA        TAX
C - - - - - 0x028109 0A:80F9: C8        INY
C - - - - - 0x02810A 0A:80FA: B1 3E     LDA (ram_003E),Y
C - - - - - 0x02810C 0A:80FC: A0 04     LDY #$04
C - - - - - 0x02810E 0A:80FE: 91 3A     STA (ram_003A),Y
C - - - - - 0x028110 0A:8100: 88        DEY
C - - - - - 0x028111 0A:8101: 8A        TXA
C - - - - - 0x028112 0A:8102: 91 3A     STA (ram_003A),Y
C - - - - - 0x028114 0A:8104: A0 03     LDY #$03
C - - - - - 0x028116 0A:8106: B1 4C     LDA (ram_004C),Y
C - - - - - 0x028118 0A:8108: A0 08     LDY #$08
C - - - - - 0x02811A 0A:810A: 91 3A     STA (ram_003A),Y
C - - - - - 0x02811C 0A:810C: A0 04     LDY #$04
C - - - - - 0x02811E 0A:810E: B1 4C     LDA (ram_004C),Y
C - - - - - 0x028120 0A:8110: A0 0C     LDY #$0C
C - - - - - 0x028122 0A:8112: 91 3A     STA (ram_003A),Y
C - - - - - 0x028124 0A:8114: A0 05     LDY #$05
C - - - - - 0x028126 0A:8116: B1 4C     LDA (ram_004C),Y
C - - - - - 0x028128 0A:8118: AA        TAX
C - - - - - 0x028129 0A:8119: 29 03     AND #$03
C - - - - - 0x02812B 0A:811B: 85 3C     STA ram_003C
C - - - - - 0x02812D 0A:811D: 05 3C     ORA ram_003C
C - - - - - 0x02812F 0A:811F: 09 80     ORA #$80
C - - - - - 0x028131 0A:8121: A0 00     LDY #$00
C - - - - - 0x028133 0A:8123: 91 3A     STA (ram_003A),Y
C - - - - - 0x028135 0A:8125: A9 06     LDA #$06
C - - - - - 0x028137 0A:8127: 20 CF 83  JSR $83CF
C - - - - - 0x02813A 0A:812A: 60        RTS
- - - - - - 0x02813B 0A:812B: A9        .byte $A9   ; 
- - - - - - 0x02813C 0A:812C: 00        .byte $00   ; 
- - - - - - 0x02813D 0A:812D: 8D        .byte $8D   ; 
- - - - - - 0x02813E 0A:812E: 3E        .byte $3E   ; 
- - - - - - 0x02813F 0A:812F: 05        .byte $05   ; 
- - - - - - 0x028140 0A:8130: A9        .byte $A9   ; 
- - - - - - 0x028141 0A:8131: 01        .byte $01   ; 
- - - - - - 0x028142 0A:8132: 8D        .byte $8D   ; 
- - - - - - 0x028143 0A:8133: 3D        .byte $3D   ; 
- - - - - - 0x028144 0A:8134: 05        .byte $05   ; 
- - - - - - 0x028145 0A:8135: 4C        .byte $4C   ; <L>
- - - - - - 0x028146 0A:8136: CF        .byte $CF   ; 
- - - - - - 0x028147 0A:8137: 83        .byte $83   ; 
- - - - - - 0x028148 0A:8138: A9        .byte $A9   ; 
- - - - - - 0x028149 0A:8139: 00        .byte $00   ; 
- - - - - - 0x02814A 0A:813A: 8D        .byte $8D   ; 
- - - - - - 0x02814B 0A:813B: 3D        .byte $3D   ; 
- - - - - - 0x02814C 0A:813C: 05        .byte $05   ; 
- - - - - - 0x02814D 0A:813D: A9        .byte $A9   ; 
- - - - - - 0x02814E 0A:813E: 01        .byte $01   ; 
- - - - - - 0x02814F 0A:813F: 4C        .byte $4C   ; <L>
- - - - - - 0x028150 0A:8140: CF        .byte $CF   ; 
- - - - - - 0x028151 0A:8141: 83        .byte $83   ; 
C - - J - - 0x028152 0A:8142: A0 01     LDY #$01
C - - - - - 0x028154 0A:8144: B1 4C     LDA (ram_004C),Y
C - - - - - 0x028156 0A:8146: 99 93 04  STA ram_0493,Y
C - - - - - 0x028159 0A:8149: C8        INY
C - - - - - 0x02815A 0A:814A: C0 05     CPY #$05
C - - - - - 0x02815C 0A:814C: D0 F6     BNE $8144
C - - - - - 0x02815E 0A:814E: A9 05     LDA #$05
C - - - - - 0x028160 0A:8150: 4C CF 83  JMP $83CF
C - - J - - 0x028163 0A:8153: A0 01     LDY #$01
C - - - - - 0x028165 0A:8155: B1 4C     LDA (ram_004C),Y
C - - - - - 0x028167 0A:8157: 10 06     BPL $815F
C - - - - - 0x028169 0A:8159: 20 BA 81  JSR $81BA
C - - - - - 0x02816C 0A:815C: 4C 64 81  JMP $8164
C - - - - - 0x02816F 0A:815F: A2 10     LDX #$10
C - - - - - 0x028171 0A:8161: 20 30 C5  JSR $C530
C D 0 - - - 0x028174 0A:8164: 20 33 C5  JSR $C533
- D 0 - I - 0x028177 0A:8167: 00        .byte $00   ; 
- D 0 - I - 0x028178 0A:8168: 6C        .byte $6C   ; <l>
- D 0 - I - 0x028179 0A:8169: 04        .byte $04   ; 
C - - - - - 0x02817A 0A:816A: A9 02     LDA #$02
C - - - - - 0x02817C 0A:816C: 4C CF 83  JMP $83CF
C - - J - - 0x02817F 0A:816F: A0 01     LDY #$01
C - - - - - 0x028181 0A:8171: B1 4C     LDA (ram_004C),Y
C - - - - - 0x028183 0A:8173: AA        TAX
C - - - - - 0x028184 0A:8174: C8        INY
C - - - - - 0x028185 0A:8175: B1 4C     LDA (ram_004C),Y
C - - - - - 0x028187 0A:8177: 86 4C     STX ram_004C
C - - - - - 0x028189 0A:8179: 85 4D     STA ram_004D
C - - - - - 0x02818B 0A:817B: 60        RTS
C - - J - - 0x02818C 0A:817C: A0 01     LDY #$01
C - - - - - 0x02818E 0A:817E: B1 4C     LDA (ram_004C),Y
C - - - - - 0x028190 0A:8180: 8D 42 05  STA ram_0542
C - - - - - 0x028193 0A:8183: C8        INY
C - - - - - 0x028194 0A:8184: 98        TYA
C - - - - - 0x028195 0A:8185: 18        CLC
C - - - - - 0x028196 0A:8186: 65 4C     ADC ram_004C
C - - - - - 0x028198 0A:8188: 85 4E     STA ram_004E
C - - - - - 0x02819A 0A:818A: A5 4D     LDA ram_004D
C - - - - - 0x02819C 0A:818C: 69 00     ADC #$00
C - - - - - 0x02819E 0A:818E: 85 4F     STA ram_004F
C - - - - - 0x0281A0 0A:8190: A9 02     LDA #$02
C - - - - - 0x0281A2 0A:8192: 4C CF 83  JMP $83CF
C - - J - - 0x0281A5 0A:8195: A9 01     LDA #$01
C - - - - - 0x0281A7 0A:8197: CE 42 05  DEC ram_0542
C - - - - - 0x0281AA 0A:819A: F0 0A     BEQ $81A6
C - - - - - 0x0281AC 0A:819C: A5 4E     LDA ram_004E
C - - - - - 0x0281AE 0A:819E: 85 4C     STA ram_004C
C - - - - - 0x0281B0 0A:81A0: A5 4F     LDA ram_004F
C - - - - - 0x0281B2 0A:81A2: 85 4D     STA ram_004D
C - - - - - 0x0281B4 0A:81A4: A9 00     LDA #$00
C - - - - - 0x0281B6 0A:81A6: 4C CF 83  JMP $83CF
C - - J - - 0x0281B9 0A:81A9: A0 01     LDY #$01
C - - - - - 0x0281BB 0A:81AB: B1 4C     LDA (ram_004C),Y
C - - - - - 0x0281BD 0A:81AD: 99 42 05  STA ram_0542,Y
C - - - - - 0x0281C0 0A:81B0: C8        INY
C - - - - - 0x0281C1 0A:81B1: C0 04     CPY #$04
C - - - - - 0x0281C3 0A:81B3: D0 F6     BNE $81AB
C - - - - - 0x0281C5 0A:81B5: A9 04     LDA #$04
C - - - - - 0x0281C7 0A:81B7: 4C CF 83  JMP $83CF
C - - - - - 0x0281CA 0A:81BA: 29 7F     AND #$7F
C - - - - - 0x0281CC 0A:81BC: 20 09 C5  JSR $C509
- D 0 - I - 0x0281CF 0A:81BF: CF        .byte $CF   ; 
- D 0 - I - 0x0281D0 0A:81C0: 81        .byte $81   ; 
- D 0 - I - 0x0281D1 0A:81C1: E9        .byte $E9   ; 
- D 0 - I - 0x0281D2 0A:81C2: 81        .byte $81   ; 
- D 0 - I - 0x0281D3 0A:81C3: DB        .byte $DB   ; 
- D 0 - I - 0x0281D4 0A:81C4: 81        .byte $81   ; 
- D 0 - I - 0x0281D5 0A:81C5: E1        .byte $E1   ; 
- D 0 - I - 0x0281D6 0A:81C6: 81        .byte $81   ; 
- D 0 - I - 0x0281D7 0A:81C7: BC        .byte $BC   ; 
- D 0 - I - 0x0281D8 0A:81C8: 82        .byte $82   ; 
- D 0 - I - 0x0281D9 0A:81C9: 7F        .byte $7F   ; 
- D 0 - I - 0x0281DA 0A:81CA: 83        .byte $83   ; 
- - - - - - 0x0281DB 0A:81CB: 7F        .byte $7F   ; 
- - - - - - 0x0281DC 0A:81CC: 83        .byte $83   ; 
- D 0 - I - 0x0281DD 0A:81CD: D5        .byte $D5   ; 
- D 0 - I - 0x0281DE 0A:81CE: 81        .byte $81   ; 
C - - J - - 0x0281DF 0A:81CF: AD 41 04  LDA ram_0441
C - - - - - 0x0281E2 0A:81D2: 4C EC 81  JMP $81EC
C - - J - - 0x0281E5 0A:81D5: AD FC 05  LDA ram_05FC
C - - - - - 0x0281E8 0A:81D8: 4C EC 81  JMP $81EC
C - - J - - 0x0281EB 0A:81DB: AD FB 05  LDA ram_05FB
C - - - - - 0x0281EE 0A:81DE: 4C EC 81  JMP $81EC
C - - J - - 0x0281F1 0A:81E1: AD FB 05  LDA ram_05FB
C - - - - - 0x0281F4 0A:81E4: 49 0B     EOR #$0B
C - - - - - 0x0281F6 0A:81E6: 4C EC 81  JMP $81EC
C - - J - - 0x0281F9 0A:81E9: AD 42 04  LDA ram_0442
C D 0 - - - 0x0281FC 0A:81EC: 85 3A     STA ram_003A
C - - - - - 0x0281FE 0A:81EE: 20 0C C5  JSR $C50C
C - - - - - 0x028201 0A:81F1: 20 6A 82  JSR $826A
C - - - - - 0x028204 0A:81F4: A0 00     LDY #$00
C - - - - - 0x028206 0A:81F6: B1 34     LDA (ram_0034),Y
C - - - - - 0x028208 0A:81F8: F0 07     BEQ $8201
C - - - - - 0x02820A 0A:81FA: 20 82 82  JSR $8282
C - - - - - 0x02820D 0A:81FD: A2 00     LDX #$00
C - - - - - 0x02820F 0A:81FF: F0 12     BEQ $8213
C - - - - - 0x028211 0A:8201: AD 2B 00  LDA a: ram_002B
C - - - - - 0x028214 0A:8204: 38        SEC
C - - - - - 0x028215 0A:8205: E9 03     SBC #$03
C - - - - - 0x028217 0A:8207: A2 02     LDX #$02
C - - - - - 0x028219 0A:8209: A4 3A     LDY ram_003A
C - - - - - 0x02821B 0A:820B: F0 04     BEQ $8211
C - - - - - 0x02821D 0A:820D: C0 0B     CPY #$0B
C - - - - - 0x02821F 0A:820F: D0 02     BNE $8213
C - - - - - 0x028221 0A:8211: A2 04     LDX #$04
C - - - - - 0x028223 0A:8213: 85 3A     STA ram_003A
C - - - - - 0x028225 0A:8215: A0 00     LDY #$00
C - - - - - 0x028227 0A:8217: 84 3B     STY ram_003B
C - - - - - 0x028229 0A:8219: A8        TAY
C - - - - - 0x02822A 0A:821A: 0A        ASL
C - - - - - 0x02822B 0A:821B: 26 3B     ROL ram_003B
C - - - - - 0x02822D 0A:821D: 0A        ASL
C - - - - - 0x02822E 0A:821E: 26 3B     ROL ram_003B
C - - - - - 0x028230 0A:8220: 65 3A     ADC ram_003A
C - - - - - 0x028232 0A:8222: 85 3A     STA ram_003A
C - - - - - 0x028234 0A:8224: A9 00     LDA #$00
C - - - - - 0x028236 0A:8226: 65 3B     ADC ram_003B
C - - - - - 0x028238 0A:8228: 85 3B     STA ram_003B
C - - - - - 0x02823A 0A:822A: 18        CLC
C - - - - - 0x02823B 0A:822B: A5 3A     LDA ram_003A
C - - - - - 0x02823D 0A:822D: 7D 64 82  ADC $8264,X
C - - - - - 0x028240 0A:8230: 85 3A     STA ram_003A
C - - - - - 0x028242 0A:8232: A5 3B     LDA ram_003B
C - - - - - 0x028244 0A:8234: 7D 65 82  ADC $8265,X
C - - - - - 0x028247 0A:8237: 85 3B     STA ram_003B
C - - - - - 0x028249 0A:8239: A0 00     LDY #$00
C - - - - - 0x02824B 0A:823B: B1 3A     LDA (ram_003A),Y
C - - - - - 0x02824D 0A:823D: C8        INY
C - - - - - 0x02824E 0A:823E: 48        PHA
C - - - - - 0x02824F 0A:823F: A2 00     LDX #$00
C - - - - - 0x028251 0A:8241: 8A        TXA
C - - - - - 0x028252 0A:8242: 29 03     AND #$03
C - - - - - 0x028254 0A:8244: F0 17     BEQ $825D
C - - - - - 0x028256 0A:8246: C9 01     CMP #$01
C - - - - - 0x028258 0A:8248: F0 0E     BEQ $8258
C - - - - - 0x02825A 0A:824A: C9 02     CMP #$02
C - - - - - 0x02825C 0A:824C: F0 05     BEQ $8253
C - - - - - 0x02825E 0A:824E: 68        PLA
C - - - - - 0x02825F 0A:824F: 48        PHA
C - - - - - 0x028260 0A:8250: 4C 5A 82  JMP $825A
C - - - - - 0x028263 0A:8253: B1 3A     LDA (ram_003A),Y
C - - - - - 0x028265 0A:8255: C8        INY
C - - - - - 0x028266 0A:8256: D0 02     BNE $825A
C - - - - - 0x028268 0A:8258: A9 0F     LDA #$0F
C D 0 - - - 0x02826A 0A:825A: 9D 7F 04  STA ram_047F,X
C - - - - - 0x02826D 0A:825D: E8        INX
C - - - - - 0x02826E 0A:825E: E0 10     CPX #$10
C - - - - - 0x028270 0A:8260: D0 DF     BNE $8241
C - - - - - 0x028272 0A:8262: 68        PLA
C - - - - - 0x028273 0A:8263: 60        RTS
- D 0 - - - 0x028274 0A:8264: 0C        .byte $0C   ; 
- D 0 - - - 0x028275 0A:8265: B8        .byte $B8   ; 
- D 0 - - - 0x028276 0A:8266: C7        .byte $C7   ; 
- D 0 - - - 0x028277 0A:8267: B6        .byte $B6   ; 
- D 0 - - - 0x028278 0A:8268: 67        .byte $67   ; <g>
- D 0 - - - 0x028279 0A:8269: B7        .byte $B7   ; 
C - - - - - 0x02827A 0A:826A: A0 00     LDY #$00
C - - - - - 0x02827C 0A:826C: B1 34     LDA (ram_0034),Y
C - - - - - 0x02827E 0A:826E: 08        PHP
C - - - - - 0x02827F 0A:826F: AA        TAX
C - - - - - 0x028280 0A:8270: BD F0 88  LDA $88F0,X
C - - - - - 0x028283 0A:8273: 28        PLP
C - - - - - 0x028284 0A:8274: D0 08     BNE $827E
C - - - - - 0x028286 0A:8276: A6 3A     LDX ram_003A
C - - - - - 0x028288 0A:8278: E0 0B     CPX #$0B
C - - - - - 0x02828A 0A:827A: D0 02     BNE $827E
C - - - - - 0x02828C 0A:827C: A9 04     LDA #$04
C - - - - - 0x02828E 0A:827E: 8D 46 05  STA ram_0546
C - - - - - 0x028291 0A:8281: 60        RTS
C - - - - - 0x028292 0A:8282: A2 01     LDX #$01
C - - - - - 0x028294 0A:8284: 85 3B     STA ram_003B
C - - - - - 0x028296 0A:8286: C9 01     CMP #$01
C - - - - - 0x028298 0A:8288: F0 0C     BEQ $8296
C - - - - - 0x02829A 0A:828A: A2 00     LDX #$00
C - - - - - 0x02829C 0A:828C: C9 0F     CMP #$0F
C - - - - - 0x02829E 0A:828E: 90 06     BCC $8296
C - - - - - 0x0282A0 0A:8290: C9 17     CMP #$17
C - - - - - 0x0282A2 0A:8292: B0 02     BCS $8296
C - - - - - 0x0282A4 0A:8294: A2 02     LDX #$02
C - - - - - 0x0282A6 0A:8296: 8A        TXA
C - - - - - 0x0282A7 0A:8297: 20 09 C5  JSR $C509
- D 0 - I - 0x0282AA 0A:829A: A0        .byte $A0   ; 
- D 0 - I - 0x0282AB 0A:829B: 82        .byte $82   ; 
- D 0 - I - 0x0282AC 0A:829C: A3        .byte $A3   ; 
- D 0 - I - 0x0282AD 0A:829D: 82        .byte $82   ; 
- D 0 - I - 0x0282AE 0A:829E: AD        .byte $AD   ; 
- D 0 - I - 0x0282AF 0A:829F: 82        .byte $82   ; 
C - - J - - 0x0282B0 0A:82A0: A5 3B     LDA ram_003B
C - - - - - 0x0282B2 0A:82A2: 60        RTS
C - - J - - 0x0282B3 0A:82A3: A9 01     LDA #$01
C - - - - - 0x0282B5 0A:82A5: AE 2A 00  LDX a: ram_002A
C - - - - - 0x0282B8 0A:82A8: F0 02     BEQ $82AC
C - - - - - 0x0282BA 0A:82AA: A9 76     LDA #$76
C - - - - - 0x0282BC 0A:82AC: 60        RTS
C - - J - - 0x0282BD 0A:82AD: A9 00     LDA #$00
C - - - - - 0x0282BF 0A:82AF: AE 2A 00  LDX a: ram_002A
C - - - - - 0x0282C2 0A:82B2: E0 01     CPX #$01
C - - - - - 0x0282C4 0A:82B4: F0 02     BEQ $82B8
C - - - - - 0x0282C6 0A:82B6: A9 68     LDA #$68
C - - - - - 0x0282C8 0A:82B8: 18        CLC
C - - - - - 0x0282C9 0A:82B9: 65 3B     ADC ram_003B
C - - - - - 0x0282CB 0A:82BB: 60        RTS
C - - J - - 0x0282CC 0A:82BC: A0 02     LDY #$02
C - - - - - 0x0282CE 0A:82BE: B1 4C     LDA (ram_004C),Y
C - - - - - 0x0282D0 0A:82C0: 10 03     BPL $82C5
C - - - - - 0x0282D2 0A:82C2: 20 16 83  JSR $8316
C - - - - - 0x0282D5 0A:82C5: A2 00     LDX #$00
C - - - - - 0x0282D7 0A:82C7: 86 3B     STX ram_003B
C - - - - - 0x0282D9 0A:82C9: 0A        ASL
C - - - - - 0x0282DA 0A:82CA: 26 3B     ROL ram_003B
C - - - - - 0x0282DC 0A:82CC: 0A        ASL
C - - - - - 0x0282DD 0A:82CD: 26 3B     ROL ram_003B
C - - - - - 0x0282DF 0A:82CF: 0A        ASL
C - - - - - 0x0282E0 0A:82D0: 26 3B     ROL ram_003B
C - - - - - 0x0282E2 0A:82D2: 0A        ASL
C - - - - - 0x0282E3 0A:82D3: 26 3B     ROL ram_003B
C - - - - - 0x0282E5 0A:82D5: 69 CF     ADC #$CF
C - - - - - 0x0282E7 0A:82D7: 85 3A     STA ram_003A
C - - - - - 0x0282E9 0A:82D9: A5 3B     LDA ram_003B
C - - - - - 0x0282EB 0A:82DB: 69 BA     ADC #$BA
C - - - - - 0x0282ED 0A:82DD: 85 3B     STA ram_003B
C - - - - - 0x0282EF 0A:82DF: BD F6 82  LDA $82F6,X
C - - - - - 0x0282F2 0A:82E2: 10 05     BPL $82E9
C - - - - - 0x0282F4 0A:82E4: 29 7F     AND #$7F
C - - - - - 0x0282F6 0A:82E6: A8        TAY
C - - - - - 0x0282F7 0A:82E7: B1 3A     LDA (ram_003A),Y
C - - - - - 0x0282F9 0A:82E9: 9D 6F 04  STA ram_046F,X
C - - - - - 0x0282FC 0A:82EC: E8        INX
C - - - - - 0x0282FD 0A:82ED: E0 20     CPX #$20
C - - - - - 0x0282FF 0A:82EF: D0 EE     BNE $82DF
C - - - - - 0x028301 0A:82F1: A9 01     LDA #$01
C - - - - - 0x028303 0A:82F3: 4C CF 83  JMP $83CF
- D 0 - - - 0x028306 0A:82F6: 0F        .byte $0F   ; 
- D 0 - - - 0x028307 0A:82F7: 0F        .byte $0F   ; 
- D 0 - - - 0x028308 0A:82F8: 0F        .byte $0F   ; 
- D 0 - - - 0x028309 0A:82F9: 30        .byte $30   ; <0>
- D 0 - - - 0x02830A 0A:82FA: 0F        .byte $0F   ; 
- D 0 - - - 0x02830B 0A:82FB: 21        .byte $21   ; 
- D 0 - - - 0x02830C 0A:82FC: 89        .byte $89   ; 
- D 0 - - - 0x02830D 0A:82FD: 8A        .byte $8A   ; 
- D 0 - - - 0x02830E 0A:82FE: 0F        .byte $0F   ; 
- D 0 - - - 0x02830F 0A:82FF: 21        .byte $21   ; 
- D 0 - - - 0x028310 0A:8300: 8B        .byte $8B   ; 
- D 0 - - - 0x028311 0A:8301: 8C        .byte $8C   ; 
- D 0 - - - 0x028312 0A:8302: 0F        .byte $0F   ; 
- D 0 - - - 0x028313 0A:8303: 21        .byte $21   ; 
- D 0 - - - 0x028314 0A:8304: 8D        .byte $8D   ; 
- D 0 - - - 0x028315 0A:8305: 8E        .byte $8E   ; 
- D 0 - - - 0x028316 0A:8306: 0F        .byte $0F   ; 
- D 0 - - - 0x028317 0A:8307: 0F        .byte $0F   ; 
- D 0 - - - 0x028318 0A:8308: 80        .byte $80   ; 
- D 0 - - - 0x028319 0A:8309: 81        .byte $81   ; 
- D 0 - - - 0x02831A 0A:830A: 0F        .byte $0F   ; 
- D 0 - - - 0x02831B 0A:830B: 0F        .byte $0F   ; 
- D 0 - - - 0x02831C 0A:830C: 82        .byte $82   ; 
- D 0 - - - 0x02831D 0A:830D: 83        .byte $83   ; 
- D 0 - - - 0x02831E 0A:830E: 0F        .byte $0F   ; 
- D 0 - - - 0x02831F 0A:830F: 0F        .byte $0F   ; 
- D 0 - - - 0x028320 0A:8310: 84        .byte $84   ; 
- D 0 - - - 0x028321 0A:8311: 85        .byte $85   ; 
- D 0 - - - 0x028322 0A:8312: 0F        .byte $0F   ; 
- D 0 - - - 0x028323 0A:8313: 86        .byte $86   ; 
- D 0 - - - 0x028324 0A:8314: 87        .byte $87   ; 
- D 0 - - - 0x028325 0A:8315: 88        .byte $88   ; 
C - - - - - 0x028326 0A:8316: 29 7F     AND #$7F
C - - - - - 0x028328 0A:8318: 20 09 C5  JSR $C509
- D 0 - I - 0x02832B 0A:831B: 2B        .byte $2B   ; 
- D 0 - I - 0x02832C 0A:831C: 83        .byte $83   ; 
- D 0 - I - 0x02832D 0A:831D: 35        .byte $35   ; <5>
- D 0 - I - 0x02832E 0A:831E: 83        .byte $83   ; 
- D 0 - I - 0x02832F 0A:831F: 42        .byte $42   ; <B>
- D 0 - I - 0x028330 0A:8320: 83        .byte $83   ; 
- D 0 - I - 0x028331 0A:8321: 47        .byte $47   ; <G>
- D 0 - I - 0x028332 0A:8322: 83        .byte $83   ; 
- D 0 - I - 0x028333 0A:8323: 61        .byte $61   ; <a>
- D 0 - I - 0x028334 0A:8324: 83        .byte $83   ; 
- D 0 - I - 0x028335 0A:8325: 65        .byte $65   ; <e>
- D 0 - I - 0x028336 0A:8326: 83        .byte $83   ; 
- - - - - - 0x028337 0A:8327: 6A        .byte $6A   ; <j>
- - - - - - 0x028338 0A:8328: 83        .byte $83   ; 
- - - - - - 0x028339 0A:8329: 7B        .byte $7B   ; 
- - - - - - 0x02833A 0A:832A: 83        .byte $83   ; 
C - - J - - 0x02833B 0A:832B: A9 00     LDA #$00
C - - - - - 0x02833D 0A:832D: AE 2A 00  LDX a: ram_002A
C - - - - - 0x028340 0A:8330: F0 02     BEQ $8334
C - - - - - 0x028342 0A:8332: A9 01     LDA #$01
C - - - - - 0x028344 0A:8334: 60        RTS
C - - J - - 0x028345 0A:8335: A9 03     LDA #$03
C - - - - - 0x028347 0A:8337: AE 2A 00  LDX a: ram_002A
C - - - - - 0x02834A 0A:833A: E0 01     CPX #$01
C - - - - - 0x02834C 0A:833C: F0 03     BEQ $8341
C - - - - - 0x02834E 0A:833E: 18        CLC
C - - - - - 0x02834F 0A:833F: 69 01     ADC #$01
C - - - - - 0x028351 0A:8341: 60        RTS
C - - J - - 0x028352 0A:8342: A9 05     LDA #$05
C - - - - - 0x028354 0A:8344: 4C 37 83  JMP $8337
C - - J - - 0x028357 0A:8347: 18        CLC
C - - - - - 0x028358 0A:8348: 08        PHP
C - - - - - 0x028359 0A:8349: A9 2E     LDA #$2E
C - - - - - 0x02835B 0A:834B: AE 2B 00  LDX a: ram_002B
C - - - - - 0x02835E 0A:834E: E0 12     CPX #$12
C - - - - - 0x028360 0A:8350: F0 0B     BEQ $835D
C - - - - - 0x028362 0A:8352: A9 07     LDA #$07
C - - - - - 0x028364 0A:8354: AE 2A 00  LDX a: ram_002A
C - - - - - 0x028367 0A:8357: E0 01     CPX #$01
C - - - - - 0x028369 0A:8359: F0 02     BEQ $835D
C - - - - - 0x02836B 0A:835B: A9 09     LDA #$09
C - - - - - 0x02836D 0A:835D: 28        PLP
C - - - - - 0x02836E 0A:835E: 69 00     ADC #$00
C - - - - - 0x028370 0A:8360: 60        RTS
C - - J - - 0x028371 0A:8361: 38        SEC
C - - - - - 0x028372 0A:8362: 4C 48 83  JMP $8348
C - - J - - 0x028375 0A:8365: A9 0B     LDA #$0B
C - - - - - 0x028377 0A:8367: 4C 37 83  JMP $8337
- - - - - - 0x02837A 0A:836A: 18        .byte $18   ; 
- - - - - - 0x02837B 0A:836B: 08        .byte $08   ; 
- - - - - - 0x02837C 0A:836C: A9        .byte $A9   ; 
- - - - - - 0x02837D 0A:836D: 15        .byte $15   ; 
- - - - - - 0x02837E 0A:836E: AE        .byte $AE   ; 
- - - - - - 0x02837F 0A:836F: 2A        .byte $2A   ; 
- - - - - - 0x028380 0A:8370: 00        .byte $00   ; 
- - - - - - 0x028381 0A:8371: E0        .byte $E0   ; 
- - - - - - 0x028382 0A:8372: 02        .byte $02   ; 
- - - - - - 0x028383 0A:8373: F0        .byte $F0   ; 
- - - - - - 0x028384 0A:8374: 02        .byte $02   ; 
- - - - - - 0x028385 0A:8375: A9        .byte $A9   ; 
- - - - - - 0x028386 0A:8376: 26        .byte $26   ; 
- - - - - - 0x028387 0A:8377: 28        .byte $28   ; 
- - - - - - 0x028388 0A:8378: 69        .byte $69   ; <i>
- - - - - - 0x028389 0A:8379: 00        .byte $00   ; 
- - - - - - 0x02838A 0A:837A: 60        .byte $60   ; 
- - - - - - 0x02838B 0A:837B: 38        .byte $38   ; <8>
- - - - - - 0x02838C 0A:837C: 4C        .byte $4C   ; <L>
- - - - - - 0x02838D 0A:837D: 6B        .byte $6B   ; <k>
- - - - - - 0x02838E 0A:837E: 83        .byte $83   ; 
C - - J - - 0x02838F 0A:837F: A2 00     LDX #$00
C - - - - - 0x028391 0A:8381: AD FB 05  LDA ram_05FB
C - - - - - 0x028394 0A:8384: F0 01     BEQ $8387
C - - - - - 0x028396 0A:8386: E8        INX
C - - - - - 0x028397 0A:8387: BD 2A 00  LDA a: ram_002A,X
C - - - - - 0x02839A 0A:838A: 0A        ASL
C - - - - - 0x02839B 0A:838B: A8        TAY
C - - - - - 0x02839C 0A:838C: A2 00     LDX #$00
C - - - - - 0x02839E 0A:838E: BD A6 83  LDA $83A6,X
C - - - - - 0x0283A1 0A:8391: 9D 7F 04  STA ram_047F,X
C - - - - - 0x0283A4 0A:8394: E8        INX
C - - - - - 0x0283A5 0A:8395: E0 08     CPX #$08
C - - - - - 0x0283A7 0A:8397: D0 F5     BNE $838E
C - - - - - 0x0283A9 0A:8399: B9 87 BA  LDA $BA87,Y
C - - - - - 0x0283AC 0A:839C: 8D 81 04  STA ram_0481
C - - - - - 0x0283AF 0A:839F: B9 88 BA  LDA $BA88,Y
C - - - - - 0x0283B2 0A:83A2: 8D 82 04  STA ram_0482
C - - - - - 0x0283B5 0A:83A5: 60        RTS
- D 0 - - - 0x0283B6 0A:83A6: 0F        .byte $0F   ; 
- D 0 - - - 0x0283B7 0A:83A7: 0F        .byte $0F   ; 
- D 0 - - - 0x0283B8 0A:83A8: 00        .byte $00   ; 
- D 0 - - - 0x0283B9 0A:83A9: 00        .byte $00   ; 
- D 0 - - - 0x0283BA 0A:83AA: 0F        .byte $0F   ; 
- D 0 - - - 0x0283BB 0A:83AB: 0F        .byte $0F   ; 
- D 0 - - - 0x0283BC 0A:83AC: 30        .byte $30   ; <0>
- D 0 - - - 0x0283BD 0A:83AD: 00        .byte $00   ; 
C - - J - - 0x0283BE 0A:83AE: A0 01     LDY #$01
C - - - - - 0x0283C0 0A:83B0: B1 4C     LDA (ram_004C),Y
C - - - - - 0x0283C2 0A:83B2: AA        TAX
C - - - - - 0x0283C3 0A:83B3: A9 00     LDA #$00
C - - - - - 0x0283C5 0A:83B5: 9D 47 05  STA ram_0547,X
C - - - - - 0x0283C8 0A:83B8: A9 02     LDA #$02
C - - - - - 0x0283CA 0A:83BA: 4C CF 83  JMP $83CF
C - - J - - 0x0283CD 0A:83BD: A0 01     LDY #$01
C - - - - - 0x0283CF 0A:83BF: B1 4C     LDA (ram_004C),Y
C - - - - - 0x0283D1 0A:83C1: 8D 40 05  STA ram_0540
C - - - - - 0x0283D4 0A:83C4: C8        INY
C - - - - - 0x0283D5 0A:83C5: B1 4C     LDA (ram_004C),Y
C - - - - - 0x0283D7 0A:83C7: 8D 41 05  STA ram_0541
C - - - - - 0x0283DA 0A:83CA: A9 03     LDA #$03
C - - - - - 0x0283DC 0A:83CC: 4C CF 83  JMP $83CF
C D 0 - - - 0x0283DF 0A:83CF: 18        CLC
C - - - - - 0x0283E0 0A:83D0: 65 4C     ADC ram_004C
C - - - - - 0x0283E2 0A:83D2: 85 4C     STA ram_004C
C - - - - - 0x0283E4 0A:83D4: 90 02     BCC $83D8
C - - - - - 0x0283E6 0A:83D6: E6 4D     INC ram_004D
C - - - - - 0x0283E8 0A:83D8: 60        RTS
C D 0 - - - 0x0283E9 0A:83D9: A0 10     LDY #$10
C - - - - - 0x0283EB 0A:83DB: B1 3C     LDA (ram_003C),Y
C - - - - - 0x0283ED 0A:83DD: F0 0A     BEQ $83E9
C - - - - - 0x0283EF 0A:83DF: C9 FF     CMP #$FF
C - - - - - 0x0283F1 0A:83E1: F0 05     BEQ $83E8
C - - - - - 0x0283F3 0A:83E3: 38        SEC
C - - - - - 0x0283F4 0A:83E4: E9 01     SBC #$01
C - - - - - 0x0283F6 0A:83E6: 91 3C     STA (ram_003C),Y
C - - - - - 0x0283F8 0A:83E8: 60        RTS
C - - - - - 0x0283F9 0A:83E9: A0 00     LDY #$00
C - - - - - 0x0283FB 0A:83EB: B1 3C     LDA (ram_003C),Y
C - - - - - 0x0283FD 0A:83ED: 29 9F     AND #$9F
C - - - - - 0x0283FF 0A:83EF: 91 3C     STA (ram_003C),Y
C - - - - - 0x028401 0A:83F1: A0 13     LDY #$13
C - - - - - 0x028403 0A:83F3: A9 00     LDA #$00
C - - - - - 0x028405 0A:83F5: 91 3C     STA (ram_003C),Y
C - - - - - 0x028407 0A:83F7: C8        INY
C - - - - - 0x028408 0A:83F8: 91 3C     STA (ram_003C),Y
C - - - - - 0x02840A 0A:83FA: A0 03     LDY #$03
C - - - - - 0x02840C 0A:83FC: B1 3C     LDA (ram_003C),Y
C - - - - - 0x02840E 0A:83FE: 85 3E     STA ram_003E
C - - - - - 0x028410 0A:8400: C8        INY
C - - - - - 0x028411 0A:8401: B1 3C     LDA (ram_003C),Y
C - - - - - 0x028413 0A:8403: 85 3F     STA ram_003F
C - - - - - 0x028415 0A:8405: A0 00     LDY #$00
C - - - - - 0x028417 0A:8407: 84 40     STY ram_0040
C D 0 - - - 0x028419 0A:8409: A4 40     LDY ram_0040
C - - - - - 0x02841B 0A:840B: E6 40     INC ram_0040
C - - - - - 0x02841D 0A:840D: B1 3E     LDA (ram_003E),Y
C - - - - - 0x02841F 0A:840F: C9 F0     CMP #$F0
C - - - - - 0x028421 0A:8411: 90 06     BCC $8419
C - - - - - 0x028423 0A:8413: 20 38 84  JSR $8438
C - - - - - 0x028426 0A:8416: 4C 09 84  JMP $8409
C - - - - - 0x028429 0A:8419: AA        TAX
C - - - - - 0x02842A 0A:841A: C8        INY
C - - - - - 0x02842B 0A:841B: 98        TYA
C - - - - - 0x02842C 0A:841C: 48        PHA
C - - - - - 0x02842D 0A:841D: B1 3E     LDA (ram_003E),Y
C - - - - - 0x02842F 0A:841F: A0 12     LDY #$12
C - - - - - 0x028431 0A:8421: 91 3C     STA (ram_003C),Y
C - - - - - 0x028433 0A:8423: 8A        TXA
C - - - - - 0x028434 0A:8424: A0 10     LDY #$10
C - - - - - 0x028436 0A:8426: 91 3C     STA (ram_003C),Y
C - - - - - 0x028438 0A:8428: 68        PLA
C - - - - - 0x028439 0A:8429: A0 03     LDY #$03
C - - - - - 0x02843B 0A:842B: 38        SEC
C - - - - - 0x02843C 0A:842C: 65 3E     ADC ram_003E
C - - - - - 0x02843E 0A:842E: 91 3C     STA (ram_003C),Y
C - - - - - 0x028440 0A:8430: C8        INY
C - - - - - 0x028441 0A:8431: A9 00     LDA #$00
C - - - - - 0x028443 0A:8433: 65 3F     ADC ram_003F
C - - - - - 0x028445 0A:8435: 91 3C     STA (ram_003C),Y
C - - - - - 0x028447 0A:8437: 60        RTS
C - - - - - 0x028448 0A:8438: 38        SEC
C - - - - - 0x028449 0A:8439: E9 F0     SBC #$F0
C - - - - - 0x02844B 0A:843B: 20 09 C5  JSR $C509
- D 0 - I - 0x02844E 0A:843E: 50        .byte $50   ; <P>
- D 0 - I - 0x02844F 0A:843F: 84        .byte $84   ; 
- D 0 - I - 0x028450 0A:8440: 59        .byte $59   ; <Y>
- D 0 - I - 0x028451 0A:8441: 84        .byte $84   ; 
- D 0 - I - 0x028452 0A:8442: 5D        .byte $5D   ; 
- D 0 - I - 0x028453 0A:8443: 84        .byte $84   ; 
- D 0 - I - 0x028454 0A:8444: 66        .byte $66   ; <f>
- D 0 - I - 0x028455 0A:8445: 84        .byte $84   ; 
- D 0 - I - 0x028456 0A:8446: 77        .byte $77   ; <w>
- D 0 - I - 0x028457 0A:8447: 84        .byte $84   ; 
- D 0 - I - 0x028458 0A:8448: 96        .byte $96   ; 
- D 0 - I - 0x028459 0A:8449: 84        .byte $84   ; 
- D 0 - I - 0x02845A 0A:844A: B3        .byte $B3   ; 
- D 0 - I - 0x02845B 0A:844B: 84        .byte $84   ; 
- D 0 - I - 0x02845C 0A:844C: C7        .byte $C7   ; 
- D 0 - I - 0x02845D 0A:844D: 84        .byte $84   ; 
- D 0 - I - 0x02845E 0A:844E: D2        .byte $D2   ; 
- D 0 - I - 0x02845F 0A:844F: 84        .byte $84   ; 
C D 0 - - - 0x028460 0A:8450: A0 10     LDY #$10
C - - - - - 0x028462 0A:8452: A9 FF     LDA #$FF
C - - - - - 0x028464 0A:8454: 91 3C     STA (ram_003C),Y
C - - - - - 0x028466 0A:8456: 68        PLA
C - - - - - 0x028467 0A:8457: 68        PLA
C - - - - - 0x028468 0A:8458: 60        RTS
C - - J - - 0x028469 0A:8459: A9 20     LDA #$20
C - - - - - 0x02846B 0A:845B: D0 02     BNE $845F
C - - J - - 0x02846D 0A:845D: A9 40     LDA #$40
C - - - - - 0x02846F 0A:845F: A0 00     LDY #$00
C - - - - - 0x028471 0A:8461: 11 3C     ORA (ram_003C),Y
C - - - - - 0x028473 0A:8463: 91 3C     STA (ram_003C),Y
C - - - - - 0x028475 0A:8465: 60        RTS
C - - J - - 0x028476 0A:8466: A4 40     LDY ram_0040
C - - - - - 0x028478 0A:8468: B1 3E     LDA (ram_003E),Y
C - - - - - 0x02847A 0A:846A: AA        TAX
C - - - - - 0x02847B 0A:846B: C8        INY
C - - - - - 0x02847C 0A:846C: B1 3E     LDA (ram_003E),Y
C - - - - - 0x02847E 0A:846E: 85 3F     STA ram_003F
C - - - - - 0x028480 0A:8470: 86 3E     STX ram_003E
C - - - - - 0x028482 0A:8472: A9 00     LDA #$00
C - - - - - 0x028484 0A:8474: 85 40     STA ram_0040
C - - - - - 0x028486 0A:8476: 60        RTS
C - - J - - 0x028487 0A:8477: A4 40     LDY ram_0040
C - - - - - 0x028489 0A:8479: B1 3E     LDA (ram_003E),Y
C - - - - - 0x02848B 0A:847B: 48        PHA
C - - - - - 0x02848C 0A:847C: C8        INY
C - - - - - 0x02848D 0A:847D: 84 40     STY ram_0040
C - - - - - 0x02848F 0A:847F: 98        TYA
C - - - - - 0x028490 0A:8480: A6 3F     LDX ram_003F
C - - - - - 0x028492 0A:8482: 18        CLC
C - - - - - 0x028493 0A:8483: 65 3E     ADC ram_003E
C - - - - - 0x028495 0A:8485: 90 01     BCC $8488
- - - - - - 0x028497 0A:8487: E8        .byte $E8   ; 
C - - - - - 0x028498 0A:8488: A0 0E     LDY #$0E
C - - - - - 0x02849A 0A:848A: 91 3C     STA (ram_003C),Y
C - - - - - 0x02849C 0A:848C: 8A        TXA
C - - - - - 0x02849D 0A:848D: C8        INY
C - - - - - 0x02849E 0A:848E: 91 3C     STA (ram_003C),Y
C - - - - - 0x0284A0 0A:8490: A0 0D     LDY #$0D
C - - - - - 0x0284A2 0A:8492: 68        PLA
C - - - - - 0x0284A3 0A:8493: 91 3C     STA (ram_003C),Y
C - - - - - 0x0284A5 0A:8495: 60        RTS
C - - J - - 0x0284A6 0A:8496: A0 0D     LDY #$0D
C - - - - - 0x0284A8 0A:8498: B1 3C     LDA (ram_003C),Y
C - - - - - 0x0284AA 0A:849A: 38        SEC
C - - - - - 0x0284AB 0A:849B: E9 01     SBC #$01
C - - - - - 0x0284AD 0A:849D: D0 01     BNE $84A0
C - - - - - 0x0284AF 0A:849F: 60        RTS
C - - - - - 0x0284B0 0A:84A0: 91 3C     STA (ram_003C),Y
C - - - - - 0x0284B2 0A:84A2: A0 0E     LDY #$0E
C - - - - - 0x0284B4 0A:84A4: B1 3C     LDA (ram_003C),Y
C - - - - - 0x0284B6 0A:84A6: AA        TAX
C - - - - - 0x0284B7 0A:84A7: C8        INY
C - - - - - 0x0284B8 0A:84A8: B1 3C     LDA (ram_003C),Y
C - - - - - 0x0284BA 0A:84AA: 85 3F     STA ram_003F
C - - - - - 0x0284BC 0A:84AC: 86 3E     STX ram_003E
C - - - - - 0x0284BE 0A:84AE: A9 00     LDA #$00
C - - - - - 0x0284C0 0A:84B0: 85 40     STA ram_0040
C - - - - - 0x0284C2 0A:84B2: 60        RTS
C - - J - - 0x0284C3 0A:84B3: A4 40     LDY ram_0040
C - - - - - 0x0284C5 0A:84B5: B1 3E     LDA (ram_003E),Y
C - - - - - 0x0284C7 0A:84B7: AA        TAX
C - - - - - 0x0284C8 0A:84B8: C8        INY
C - - - - - 0x0284C9 0A:84B9: B1 3E     LDA (ram_003E),Y
C - - - - - 0x0284CB 0A:84BB: C8        INY
C - - - - - 0x0284CC 0A:84BC: 84 40     STY ram_0040
C - - - - - 0x0284CE 0A:84BE: A0 14     LDY #$14
C - - - - - 0x0284D0 0A:84C0: 91 3C     STA (ram_003C),Y
C - - - - - 0x0284D2 0A:84C2: 88        DEY
C - - - - - 0x0284D3 0A:84C3: 8A        TXA
C - - - - - 0x0284D4 0A:84C4: 91 3C     STA (ram_003C),Y
C - - - - - 0x0284D6 0A:84C6: 60        RTS
C - - J - - 0x0284D7 0A:84C7: A4 40     LDY ram_0040
C - - - - - 0x0284D9 0A:84C9: B1 3E     LDA (ram_003E),Y
C - - - - - 0x0284DB 0A:84CB: A0 12     LDY #$12
C - - - - - 0x0284DD 0A:84CD: 91 3C     STA (ram_003C),Y
C - - - - - 0x0284DF 0A:84CF: 4C 50 84  JMP $8450
C - - J - - 0x0284E2 0A:84D2: A4 40     LDY ram_0040
C - - - - - 0x0284E4 0A:84D4: E6 40     INC ram_0040
C - - - - - 0x0284E6 0A:84D6: B1 3E     LDA (ram_003E),Y
C - - - - - 0x0284E8 0A:84D8: 8D 46 05  STA ram_0546
C - - - - - 0x0284EB 0A:84DB: 60        RTS
C D 0 - - - 0x0284EC 0A:84DC: A0 11     LDY #$11
C - - - - - 0x0284EE 0A:84DE: B1 3C     LDA (ram_003C),Y
C - - - - - 0x0284F0 0A:84E0: F0 0D     BEQ $84EF
C - - - - - 0x0284F2 0A:84E2: C9 FF     CMP #$FF
C - - - - - 0x0284F4 0A:84E4: D0 01     BNE $84E7
C - - - - - 0x0284F6 0A:84E6: 60        RTS
C - - - - - 0x0284F7 0A:84E7: 38        SEC
C - - - - - 0x0284F8 0A:84E8: E9 01     SBC #$01
C - - - - - 0x0284FA 0A:84EA: 91 3C     STA (ram_003C),Y
C - - - - - 0x0284FC 0A:84EC: 4C 2A 85  JMP $852A
C - - - - - 0x0284FF 0A:84EF: 85 40     STA ram_0040
C - - - - - 0x028501 0A:84F1: A0 01     LDY #$01
C - - - - - 0x028503 0A:84F3: B1 3C     LDA (ram_003C),Y
C - - - - - 0x028505 0A:84F5: 85 3E     STA ram_003E
C - - - - - 0x028507 0A:84F7: C8        INY
C - - - - - 0x028508 0A:84F8: B1 3C     LDA (ram_003C),Y
C - - - - - 0x02850A 0A:84FA: 85 3F     STA ram_003F
C - - - - - 0x02850C 0A:84FC: A0 00     LDY #$00
C - - - - - 0x02850E 0A:84FE: B1 3C     LDA (ram_003C),Y
C - - - - - 0x028510 0A:8500: 29 10     AND #$10
C - - - - - 0x028512 0A:8502: F0 0B     BEQ $850F
C - - - - - 0x028514 0A:8504: A9 04     LDA #$04
C - - - - - 0x028516 0A:8506: 18        CLC
C - - - - - 0x028517 0A:8507: 65 3E     ADC ram_003E
C - - - - - 0x028519 0A:8509: 85 3E     STA ram_003E
C - - - - - 0x02851B 0A:850B: 90 02     BCC $850F
C - - - - - 0x02851D 0A:850D: E6 3F     INC ram_003F
C - - - - - 0x02851F 0A:850F: A0 00     LDY #$00
C - - - - - 0x028521 0A:8511: B1 3C     LDA (ram_003C),Y
C - - - - - 0x028523 0A:8513: 29 EF     AND #$EF
C - - - - - 0x028525 0A:8515: 91 3C     STA (ram_003C),Y
C - - - - - 0x028527 0A:8517: 20 7A 85  JSR $857A
C - - - - - 0x02852A 0A:851A: A5 40     LDA ram_0040
C - - - - - 0x02852C 0A:851C: A0 01     LDY #$01
C - - - - - 0x02852E 0A:851E: 18        CLC
C - - - - - 0x02852F 0A:851F: 65 3E     ADC ram_003E
C - - - - - 0x028531 0A:8521: 91 3C     STA (ram_003C),Y
C - - - - - 0x028533 0A:8523: C8        INY
C - - - - - 0x028534 0A:8524: A5 3F     LDA ram_003F
C - - - - - 0x028536 0A:8526: 69 00     ADC #$00
C - - - - - 0x028538 0A:8528: 91 3C     STA (ram_003C),Y
C D 0 - - - 0x02853A 0A:852A: A9 00     LDA #$00
C - - - - - 0x02853C 0A:852C: 85 42     STA ram_0042
C - - - - - 0x02853E 0A:852E: 85 43     STA ram_0043
C - - - - - 0x028540 0A:8530: A0 00     LDY #$00
C - - - - - 0x028542 0A:8532: B1 3C     LDA (ram_003C),Y
C - - - - - 0x028544 0A:8534: 29 FC     AND #$FC
C - - - - - 0x028546 0A:8536: 85 41     STA ram_0041
C - - - - - 0x028548 0A:8538: B1 3C     LDA (ram_003C),Y
C - - - - - 0x02854A 0A:853A: 4A        LSR
C - - - - - 0x02854B 0A:853B: 26 42     ROL ram_0042
C - - - - - 0x02854D 0A:853D: 4A        LSR
C - - - - - 0x02854E 0A:853E: 26 43     ROL ram_0043
C - - - - - 0x028550 0A:8540: A2 00     LDX #$00
C - - - - - 0x028552 0A:8542: A0 05     LDY #$05
C - - - - - 0x028554 0A:8544: 20 F2 85  JSR $85F2
C - - - - - 0x028557 0A:8547: A2 01     LDX #$01
C - - - - - 0x028559 0A:8549: A0 09     LDY #$09
C - - - - - 0x02855B 0A:854B: 20 F2 85  JSR $85F2
C - - - - - 0x02855E 0A:854E: A9 00     LDA #$00
C - - - - - 0x028560 0A:8550: 46 43     LSR ram_0043
C - - - - - 0x028562 0A:8552: 2A        ROL
C - - - - - 0x028563 0A:8553: 46 42     LSR ram_0042
C - - - - - 0x028565 0A:8555: 2A        ROL
C - - - - - 0x028566 0A:8556: 05 41     ORA ram_0041
C - - - - - 0x028568 0A:8558: A0 00     LDY #$00
C - - - - - 0x02856A 0A:855A: 91 3C     STA (ram_003C),Y
C - - - - - 0x02856C 0A:855C: 29 10     AND #$10
C - - - - - 0x02856E 0A:855E: F0 19     BEQ $8579
C - - - - - 0x028570 0A:8560: A0 01     LDY #$01
C - - - - - 0x028572 0A:8562: B1 3C     LDA (ram_003C),Y
C - - - - - 0x028574 0A:8564: 85 3E     STA ram_003E
C - - - - - 0x028576 0A:8566: C8        INY
C - - - - - 0x028577 0A:8567: B1 3C     LDA (ram_003C),Y
C - - - - - 0x028579 0A:8569: 85 3F     STA ram_003F
C - - - - - 0x02857B 0A:856B: A2 05     LDX #$05
C - - - - - 0x02857D 0A:856D: A0 01     LDY #$01
C - - - - - 0x02857F 0A:856F: 20 0D 86  JSR $860D
C - - - - - 0x028582 0A:8572: A2 09     LDX #$09
C - - - - - 0x028584 0A:8574: A0 03     LDY #$03
C - - - - - 0x028586 0A:8576: 20 0D 86  JSR $860D
C - - - - - 0x028589 0A:8579: 60        RTS
C D 0 - - - 0x02858A 0A:857A: A4 40     LDY ram_0040
C - - - - - 0x02858C 0A:857C: E6 40     INC ram_0040
C - - - - - 0x02858E 0A:857E: B1 3E     LDA (ram_003E),Y
C - - - - - 0x028590 0A:8580: 20 09 C5  JSR $C509
- D 0 - I - 0x028593 0A:8583: A0        .byte $A0   ; 
- D 0 - I - 0x028594 0A:8584: 85        .byte $85   ; 
- D 0 - I - 0x028595 0A:8585: A9        .byte $A9   ; 
- D 0 - I - 0x028596 0A:8586: 85        .byte $85   ; 
- D 0 - I - 0x028597 0A:8587: D5        .byte $D5   ; 
- D 0 - I - 0x028598 0A:8588: 85        .byte $85   ; 
- D 0 - I - 0x028599 0A:8589: E1        .byte $E1   ; 
- D 0 - I - 0x02859A 0A:858A: 85        .byte $85   ; 
- D 0 - I - 0x02859B 0A:858B: 8D        .byte $8D   ; 
- D 0 - I - 0x02859C 0A:858C: 85        .byte $85   ; 
C - - J - - 0x02859D 0A:858D: A4 40     LDY ram_0040
C - - - - - 0x02859F 0A:858F: B1 3E     LDA (ram_003E),Y
C - - - - - 0x0285A1 0A:8591: AA        TAX
C - - - - - 0x0285A2 0A:8592: C8        INY
C - - - - - 0x0285A3 0A:8593: B1 3E     LDA (ram_003E),Y
C - - - - - 0x0285A5 0A:8595: 85 3F     STA ram_003F
C - - - - - 0x0285A7 0A:8597: 86 3E     STX ram_003E
C - - - - - 0x0285A9 0A:8599: A9 00     LDA #$00
C - - - - - 0x0285AB 0A:859B: 85 40     STA ram_0040
C - - - - - 0x0285AD 0A:859D: 4C 7A 85  JMP $857A
C - - J - - 0x0285B0 0A:85A0: A0 11     LDY #$11
C - - - - - 0x0285B2 0A:85A2: A9 FF     LDA #$FF
C - - - - - 0x0285B4 0A:85A4: 91 3C     STA (ram_003C),Y
C - - - - - 0x0285B6 0A:85A6: 68        PLA
C - - - - - 0x0285B7 0A:85A7: 68        PLA
C - - - - - 0x0285B8 0A:85A8: 60        RTS
C - - J - - 0x0285B9 0A:85A9: 20 E7 85  JSR $85E7
C - - - - - 0x0285BC 0A:85AC: A4 40     LDY ram_0040
C - - - - - 0x0285BE 0A:85AE: B1 3E     LDA (ram_003E),Y
C - - - - - 0x0285C0 0A:85B0: AA        TAX
C - - - - - 0x0285C1 0A:85B1: C8        INY
C - - - - - 0x0285C2 0A:85B2: B1 3E     LDA (ram_003E),Y
C - - - - - 0x0285C4 0A:85B4: C8        INY
C - - - - - 0x0285C5 0A:85B5: 84 40     STY ram_0040
C - - - - - 0x0285C7 0A:85B7: A0 07     LDY #$07
C - - - - - 0x0285C9 0A:85B9: 91 3C     STA (ram_003C),Y
C - - - - - 0x0285CB 0A:85BB: 88        DEY
C - - - - - 0x0285CC 0A:85BC: 88        DEY
C - - - - - 0x0285CD 0A:85BD: 8A        TXA
C - - - - - 0x0285CE 0A:85BE: 91 3C     STA (ram_003C),Y
C - - - - - 0x0285D0 0A:85C0: A4 40     LDY ram_0040
C - - - - - 0x0285D2 0A:85C2: B1 3E     LDA (ram_003E),Y
C - - - - - 0x0285D4 0A:85C4: AA        TAX
C - - - - - 0x0285D5 0A:85C5: C8        INY
C - - - - - 0x0285D6 0A:85C6: B1 3E     LDA (ram_003E),Y
C - - - - - 0x0285D8 0A:85C8: C8        INY
C - - - - - 0x0285D9 0A:85C9: 84 40     STY ram_0040
C - - - - - 0x0285DB 0A:85CB: A0 0B     LDY #$0B
C - - - - - 0x0285DD 0A:85CD: 91 3C     STA (ram_003C),Y
C - - - - - 0x0285DF 0A:85CF: 88        DEY
C - - - - - 0x0285E0 0A:85D0: 88        DEY
C - - - - - 0x0285E1 0A:85D1: 8A        TXA
C - - - - - 0x0285E2 0A:85D2: 91 3C     STA (ram_003C),Y
C - - - - - 0x0285E4 0A:85D4: 60        RTS
C - - J - - 0x0285E5 0A:85D5: 20 E7 85  JSR $85E7
C D 0 - - - 0x0285E8 0A:85D8: A0 00     LDY #$00
C - - - - - 0x0285EA 0A:85DA: B1 3C     LDA (ram_003C),Y
C - - - - - 0x0285EC 0A:85DC: 09 10     ORA #$10
C - - - - - 0x0285EE 0A:85DE: 91 3C     STA (ram_003C),Y
C - - - - - 0x0285F0 0A:85E0: 60        RTS
C - - J - - 0x0285F1 0A:85E1: 20 A9 85  JSR $85A9
C - - - - - 0x0285F4 0A:85E4: 4C D8 85  JMP $85D8
C - - - - - 0x0285F7 0A:85E7: A4 40     LDY ram_0040
C - - - - - 0x0285F9 0A:85E9: B1 3E     LDA (ram_003E),Y
C - - - - - 0x0285FB 0A:85EB: A0 11     LDY #$11
C - - - - - 0x0285FD 0A:85ED: 91 3C     STA (ram_003C),Y
C - - - - - 0x0285FF 0A:85EF: E6 40     INC ram_0040
C - - - - - 0x028601 0A:85F1: 60        RTS
C - - - - - 0x028602 0A:85F2: 18        CLC
C - - - - - 0x028603 0A:85F3: B1 3C     LDA (ram_003C),Y
C - - - - - 0x028605 0A:85F5: C8        INY
C - - - - - 0x028606 0A:85F6: 71 3C     ADC (ram_003C),Y
C - - - - - 0x028608 0A:85F8: 91 3C     STA (ram_003C),Y
C - - - - - 0x02860A 0A:85FA: C8        INY
C - - - - - 0x02860B 0A:85FB: B1 3C     LDA (ram_003C),Y
C - - - - - 0x02860D 0A:85FD: 10 02     BPL $8601
C - - - - - 0x02860F 0A:85FF: D6 42     DEC ram_0042,X
C - - - - - 0x028611 0A:8601: C8        INY
C - - - - - 0x028612 0A:8602: 71 3C     ADC (ram_003C),Y
C - - - - - 0x028614 0A:8604: 91 3C     STA (ram_003C),Y
C - - - - - 0x028616 0A:8606: B5 42     LDA ram_0042,X
C - - - - - 0x028618 0A:8608: 69 00     ADC #$00
C - - - - - 0x02861A 0A:860A: 95 42     STA ram_0042,X
C - - - - - 0x02861C 0A:860C: 60        RTS
C - - - - - 0x02861D 0A:860D: B1 3E     LDA (ram_003E),Y
C - - - - - 0x02861F 0A:860F: 48        PHA
C - - - - - 0x028620 0A:8610: 88        DEY
C - - - - - 0x028621 0A:8611: B1 3E     LDA (ram_003E),Y
C - - - - - 0x028623 0A:8613: 48        PHA
C - - - - - 0x028624 0A:8614: 8A        TXA
C - - - - - 0x028625 0A:8615: A8        TAY
C - - - - - 0x028626 0A:8616: 68        PLA
C - - - - - 0x028627 0A:8617: 18        CLC
C - - - - - 0x028628 0A:8618: 71 3C     ADC (ram_003C),Y
C - - - - - 0x02862A 0A:861A: 91 3C     STA (ram_003C),Y
C - - - - - 0x02862C 0A:861C: C8        INY
C - - - - - 0x02862D 0A:861D: C8        INY
C - - - - - 0x02862E 0A:861E: 68        PLA
C - - - - - 0x02862F 0A:861F: 71 3C     ADC (ram_003C),Y
C - - - - - 0x028631 0A:8621: 91 3C     STA (ram_003C),Y
C - - - - - 0x028633 0A:8623: 60        RTS
C D 0 - - - 0x028634 0A:8624: AD 2D 06  LDA ram_062D
C - - - - - 0x028637 0A:8627: 29 0F     AND #$0F
C - - - - - 0x028639 0A:8629: C9 05     CMP #$05
C - - - - - 0x02863B 0A:862B: D0 03     BNE $8630
C - - - - - 0x02863D 0A:862D: 4C 61 88  JMP $8861
C - - - - - 0x028640 0A:8630: 20 53 87  JSR $8753
C - - - - - 0x028643 0A:8633: A9 00     LDA #$00
C - - - - - 0x028645 0A:8635: 85 46     STA ram_0046
C D 0 - - - 0x028647 0A:8637: A5 46     LDA ram_0046
C - - - - - 0x028649 0A:8639: D0 03     BNE $863E
C - - - - - 0x02864B 0A:863B: 4C CF 86  JMP $86CF
C - - - - - 0x02864E 0A:863E: C9 0B     CMP #$0B
C - - - - - 0x028650 0A:8640: D0 03     BNE $8645
C - - - - - 0x028652 0A:8642: 4C CF 86  JMP $86CF
C - - - - - 0x028655 0A:8645: 20 DB 86  JSR $86DB
C - - - - - 0x028658 0A:8648: B0 03     BCS $864D
C - - - - - 0x02865A 0A:864A: 4C CF 86  JMP $86CF
C - - - - - 0x02865D 0A:864D: A6 3B     LDX ram_003B
C - - - - - 0x02865F 0A:864F: A0 06     LDY #$06
C - - - - - 0x028661 0A:8651: B1 34     LDA (ram_0034),Y
C - - - - - 0x028663 0A:8653: C9 34     CMP #$34
C - - - - - 0x028665 0A:8655: B0 02     BCS $8659
C - - - - - 0x028667 0A:8657: A9 34     LDA #$34
C - - - - - 0x028669 0A:8659: C9 CC     CMP #$CC
C - - - - - 0x02866B 0A:865B: 90 02     BCC $865F
C - - - - - 0x02866D 0A:865D: A9 CC     LDA #$CC
C - - - - - 0x02866F 0A:865F: 48        PHA
C - - - - - 0x028670 0A:8660: AD 2D 06  LDA ram_062D
C - - - - - 0x028673 0A:8663: 29 0F     AND #$0F
C - - - - - 0x028675 0A:8665: A8        TAY
C - - - - - 0x028676 0A:8666: 68        PLA
C - - - - - 0x028677 0A:8667: 18        CLC
C - - - - - 0x028678 0A:8668: 79 DA 88  ADC $88DA,Y
C - - - - - 0x02867B 0A:866B: 9D 03 02  STA ram_0203,X
C - - - - - 0x02867E 0A:866E: A0 08     LDY #$08
C - - - - - 0x028680 0A:8670: B1 34     LDA (ram_0034),Y
C - - - - - 0x028682 0A:8672: C9 54     CMP #$54
C - - - - - 0x028684 0A:8674: B0 02     BCS $8678
C - - - - - 0x028686 0A:8676: A9 54     LDA #$54
C - - - - - 0x028688 0A:8678: C9 AC     CMP #$AC
C - - - - - 0x02868A 0A:867A: 90 02     BCC $867E
C - - - - - 0x02868C 0A:867C: A9 AC     LDA #$AC
C - - - - - 0x02868E 0A:867E: 48        PHA
C - - - - - 0x02868F 0A:867F: AD 2D 06  LDA ram_062D
C - - - - - 0x028692 0A:8682: 29 0F     AND #$0F
C - - - - - 0x028694 0A:8684: A8        TAY
C - - - - - 0x028695 0A:8685: 68        PLA
C - - - - - 0x028696 0A:8686: 18        CLC
C - - - - - 0x028697 0A:8687: 79 DF 88  ADC $88DF,Y
C - - - - - 0x02869A 0A:868A: 9D 00 02  STA ram_0200,X
C - - - - - 0x02869D 0A:868D: A9 03     LDA #$03
C - - - - - 0x02869F 0A:868F: 9D 02 02  STA ram_0202,X
C - - - - - 0x0286A2 0A:8692: 2C 15 06  BIT ram_0615
C - - - - - 0x0286A5 0A:8695: 10 11     BPL $86A8
C - - - - - 0x0286A7 0A:8697: AD FB 05  LDA ram_05FB
C - - - - - 0x0286AA 0A:869A: F0 0C     BEQ $86A8
C - - - - - 0x0286AC 0A:869C: A5 46     LDA ram_0046
C - - - - - 0x0286AE 0A:869E: C9 0B     CMP #$0B
C - - - - - 0x0286B0 0A:86A0: B0 06     BCS $86A8
C - - - - - 0x0286B2 0A:86A2: 20 F2 86  JSR $86F2
C - - - - - 0x0286B5 0A:86A5: 4C B5 86  JMP $86B5
C - - - - - 0x0286B8 0A:86A8: A5 46     LDA ram_0046
C - - - - - 0x0286BA 0A:86AA: CD 41 04  CMP ram_0441
C - - - - - 0x0286BD 0A:86AD: D0 06     BNE $86B5
C - - - - - 0x0286BF 0A:86AF: 20 1D 88  JSR $881D
C - - - - - 0x0286C2 0A:86B2: 4C C4 86  JMP $86C4
C D 0 - - - 0x0286C5 0A:86B5: C9 0B     CMP #$0B
C - - - - - 0x0286C7 0A:86B7: 90 02     BCC $86BB
C - - - - - 0x0286C9 0A:86B9: E9 01     SBC #$01
C - - - - - 0x0286CB 0A:86BB: 18        CLC
C - - - - - 0x0286CC 0A:86BC: 69 11     ADC #$11
C - - - - - 0x0286CE 0A:86BE: C9 20     CMP #$20
C - - - - - 0x0286D0 0A:86C0: 90 02     BCC $86C4
C - - - - - 0x0286D2 0A:86C2: 69 0F     ADC #$0F
C D 0 - - - 0x0286D4 0A:86C4: 9D 01 02  STA ram_0201,X
C - - - - - 0x0286D7 0A:86C7: E8        INX
C - - - - - 0x0286D8 0A:86C8: E8        INX
C - - - - - 0x0286D9 0A:86C9: E8        INX
C - - - - - 0x0286DA 0A:86CA: E8        INX
C - - - - - 0x0286DB 0A:86CB: 86 3B     STX ram_003B
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
- D 0 - I - 0x028BA2 0A:8B92: 01        .byte $01   ; 
- D 0 - I - 0x028BA3 0A:8B93: F0        .byte $F0   ; 
- D 0 - I - 0x028BA4 0A:8B94: F5        .byte $F5   ; 
- D 0 - I - 0x028BA5 0A:8B95: 81        .byte $81   ; 
- D 0 - I - 0x028BA6 0A:8B96: F4        .byte $F4   ; 
- D 0 - I - 0x028BA7 0A:8B97: 24        .byte $24   ; 
- D 0 - I - 0x028BA8 0A:8B98: 25        .byte $25   ; 
- D 0 - I - 0x028BA9 0A:8B99: 26        .byte $26   ; 
- D 0 - I - 0x028BAA 0A:8B9A: 4F        .byte $4F   ; <O>
- D 0 - I - 0x028BAB 0A:8B9B: F1        .byte $F1   ; 
- D 0 - I - 0x028BAC 0A:8B9C: 02        .byte $02   ; 
- D 0 - I - 0x028BAD 0A:8B9D: 07        .byte $07   ; 
- D 0 - I - 0x028BAE 0A:8B9E: E4        .byte $E4   ; 
- D 0 - I - 0x028BAF 0A:8B9F: CF        .byte $CF   ; 
- D 0 - I - 0x028BB0 0A:8BA0: 00        .byte $00   ; 
- D 0 - I - 0x028BB1 0A:8BA1: F1        .byte $F1   ; 
- D 0 - I - 0x028BB2 0A:8BA2: 01        .byte $01   ; 
- D 0 - I - 0x028BB3 0A:8BA3: 06        .byte $06   ; 
- D 0 - I - 0x028BB4 0A:8BA4: F8        .byte $F8   ; 
- D 0 - I - 0x028BB5 0A:8BA5: BB        .byte $BB   ; 
- D 0 - I - 0x028BB6 0A:8BA6: 04        .byte $04   ; 
- D 0 - I - 0x028BB7 0A:8BA7: 01        .byte $01   ; 
- D 0 - I - 0x028BB8 0A:8BA8: FB        .byte $FB   ; 
- D 0 - I - 0x028BB9 0A:8BA9: 01        .byte $01   ; 
- D 0 - I - 0x028BBA 0A:8BAA: 23        .byte $23   ; 
- D 0 - I - 0x028BBB 0A:8BAB: 45        .byte $45   ; <E>
- D 0 - I - 0x028BBC 0A:8BAC: 01        .byte $01   ; 
- D 0 - I - 0x028BBD 0A:8BAD: FB        .byte $FB   ; 
- D 0 - I - 0x028BBE 0A:8BAE: 10        .byte $10   ; 
- D 0 - I - 0x028BBF 0A:8BAF: 23        .byte $23   ; 
- D 0 - I - 0x028BC0 0A:8BB0: 45        .byte $45   ; <E>
- D 0 - I - 0x028BC1 0A:8BB1: F8        .byte $F8   ; 
- D 0 - I - 0x028BC2 0A:8BB2: A7        .byte $A7   ; 
- D 0 - I - 0x028BC3 0A:8BB3: 8B        .byte $8B   ; 
- D 0 - I - 0x028BC4 0A:8BB4: F5        .byte $F5   ; 
- D 0 - I - 0x028BC5 0A:8BB5: 81        .byte $81   ; 
- D 0 - I - 0x028BC6 0A:8BB6: F4        .byte $F4   ; 
- D 0 - I - 0x028BC7 0A:8BB7: 24        .byte $24   ; 
- D 0 - I - 0x028BC8 0A:8BB8: 25        .byte $25   ; 
- D 0 - I - 0x028BC9 0A:8BB9: 26        .byte $26   ; 
- D 0 - I - 0x028BCA 0A:8BBA: 4F        .byte $4F   ; <O>
- D 0 - I - 0x028BCB 0A:8BBB: F1        .byte $F1   ; 
- D 0 - I - 0x028BCC 0A:8BBC: 04        .byte $04   ; 
- D 0 - I - 0x028BCD 0A:8BBD: 07        .byte $07   ; 
- D 0 - I - 0x028BCE 0A:8BBE: 50        .byte $50   ; <P>
- D 0 - I - 0x028BCF 0A:8BBF: 04        .byte $04   ; 
- D 0 - I - 0x028BD0 0A:8BC0: 02        .byte $02   ; 
- D 0 - I - 0x028BD1 0A:8BC1: F1        .byte $F1   ; 
- D 0 - I - 0x028BD2 0A:8BC2: 03        .byte $03   ; 
- D 0 - I - 0x028BD3 0A:8BC3: 06        .byte $06   ; 
- D 0 - I - 0x028BD4 0A:8BC4: 10        .byte $10   ; 
- D 0 - I - 0x028BD5 0A:8BC5: B3        .byte $B3   ; 
- D 0 - I - 0x028BD6 0A:8BC6: 05        .byte $05   ; 
- D 0 - I - 0x028BD7 0A:8BC7: F8        .byte $F8   ; 
- D 0 - I - 0x028BD8 0A:8BC8: A7        .byte $A7   ; 
- D 0 - I - 0x028BD9 0A:8BC9: 8B        .byte $8B   ; 
- D 0 - I - 0x028BDA 0A:8BCA: F5        .byte $F5   ; 
- D 0 - I - 0x028BDB 0A:8BCB: 81        .byte $81   ; 
- D 0 - I - 0x028BDC 0A:8BCC: F4        .byte $F4   ; 
- D 0 - I - 0x028BDD 0A:8BCD: 24        .byte $24   ; 
- D 0 - I - 0x028BDE 0A:8BCE: 25        .byte $25   ; 
- D 0 - I - 0x028BDF 0A:8BCF: 26        .byte $26   ; 
- D 0 - I - 0x028BE0 0A:8BD0: 4F        .byte $4F   ; <O>
- D 0 - I - 0x028BE1 0A:8BD1: F1        .byte $F1   ; 
- D 0 - I - 0x028BE2 0A:8BD2: 06        .byte $06   ; 
- D 0 - I - 0x028BE3 0A:8BD3: 07        .byte $07   ; 
- D 0 - I - 0x028BE4 0A:8BD4: 58        .byte $58   ; <X>
- D 0 - I - 0x028BE5 0A:8BD5: EF        .byte $EF   ; 
- D 0 - I - 0x028BE6 0A:8BD6: 00        .byte $00   ; 
- D 0 - I - 0x028BE7 0A:8BD7: F1        .byte $F1   ; 
- D 0 - I - 0x028BE8 0A:8BD8: 05        .byte $05   ; 
- D 0 - I - 0x028BE9 0A:8BD9: 06        .byte $06   ; 
- D 0 - I - 0x028BEA 0A:8BDA: 10        .byte $10   ; 
- D 0 - I - 0x028BEB 0A:8BDB: B3        .byte $B3   ; 
- D 0 - I - 0x028BEC 0A:8BDC: 05        .byte $05   ; 
- D 0 - I - 0x028BED 0A:8BDD: F8        .byte $F8   ; 
- D 0 - I - 0x028BEE 0A:8BDE: A7        .byte $A7   ; 
- D 0 - I - 0x028BEF 0A:8BDF: 8B        .byte $8B   ; 
- D 0 - I - 0x028BF0 0A:8BE0: F5        .byte $F5   ; 
- D 0 - I - 0x028BF1 0A:8BE1: 81        .byte $81   ; 
- D 0 - I - 0x028BF2 0A:8BE2: F4        .byte $F4   ; 
- D 0 - I - 0x028BF3 0A:8BE3: 24        .byte $24   ; 
- D 0 - I - 0x028BF4 0A:8BE4: 25        .byte $25   ; 
- D 0 - I - 0x028BF5 0A:8BE5: 26        .byte $26   ; 
- D 0 - I - 0x028BF6 0A:8BE6: 4F        .byte $4F   ; <O>
- D 0 - I - 0x028BF7 0A:8BE7: F1        .byte $F1   ; 
- D 0 - I - 0x028BF8 0A:8BE8: 00        .byte $00   ; 
- D 0 - I - 0x028BF9 0A:8BE9: 08        .byte $08   ; 
- D 0 - I - 0x028BFA 0A:8BEA: F8        .byte $F8   ; 
- D 0 - I - 0x028BFB 0A:8BEB: BB        .byte $BB   ; 
- D 0 - I - 0x028BFC 0A:8BEC: 00        .byte $00   ; 
- D 0 - I - 0x028BFD 0A:8BED: F0        .byte $F0   ; 
- D 0 - I - 0x028BFE 0A:8BEE: F5        .byte $F5   ; 
- D 0 - I - 0x028BFF 0A:8BEF: 81        .byte $81   ; 
- D 0 - I - 0x028C00 0A:8BF0: F4        .byte $F4   ; 
- D 0 - I - 0x028C01 0A:8BF1: 24        .byte $24   ; 
- D 0 - I - 0x028C02 0A:8BF2: 25        .byte $25   ; 
- D 0 - I - 0x028C03 0A:8BF3: 26        .byte $26   ; 
- D 0 - I - 0x028C04 0A:8BF4: 4F        .byte $4F   ; <O>
- D 0 - I - 0x028C05 0A:8BF5: F1        .byte $F1   ; 
- D 0 - I - 0x028C06 0A:8BF6: 09        .byte $09   ; 
- D 0 - I - 0x028C07 0A:8BF7: 07        .byte $07   ; 
- D 0 - I - 0x028C08 0A:8BF8: 32        .byte $32   ; <2>
- D 0 - I - 0x028C09 0A:8BF9: FE        .byte $FE   ; 
- D 0 - I - 0x028C0A 0A:8BFA: 00        .byte $00   ; 
- D 0 - I - 0x028C0B 0A:8BFB: F1        .byte $F1   ; 
- D 0 - I - 0x028C0C 0A:8BFC: DA        .byte $DA   ; 
- D 0 - I - 0x028C0D 0A:8BFD: 06        .byte $06   ; 
- D 0 - I - 0x028C0E 0A:8BFE: 11        .byte $11   ; 
- D 0 - I - 0x028C0F 0A:8BFF: B2        .byte $B2   ; 
- D 0 - I - 0x028C10 0A:8C00: 05        .byte $05   ; 
- D 0 - I - 0x028C11 0A:8C01: F8        .byte $F8   ; 
- D 0 - I - 0x028C12 0A:8C02: A7        .byte $A7   ; 
- D 0 - I - 0x028C13 0A:8C03: 8B        .byte $8B   ; 
- - - - - - 0x028C14 0A:8C04: F5        .byte $F5   ; 
- - - - - - 0x028C15 0A:8C05: 09        .byte $09   ; 
- - - - - - 0x028C16 0A:8C06: F4        .byte $F4   ; 
- - - - - - 0x028C17 0A:8C07: 04        .byte $04   ; 
- - - - - - 0x028C18 0A:8C08: 05        .byte $05   ; 
- - - - - - 0x028C19 0A:8C09: 00        .byte $00   ; 
- - - - - - 0x028C1A 0A:8C0A: 00        .byte $00   ; 
- - - - - - 0x028C1B 0A:8C0B: F1        .byte $F1   ; 
- - - - - - 0x028C1C 0A:8C0C: 0D        .byte $0D   ; 
- - - - - - 0x028C1D 0A:8C0D: C4        .byte $C4   ; 
- - - - - - 0x028C1E 0A:8C0E: 98        .byte $98   ; 
- - - - - - 0x028C1F 0A:8C0F: E3        .byte $E3   ; 
- - - - - - 0x028C20 0A:8C10: 00        .byte $00   ; 
- - - - - - 0x028C21 0A:8C11: F0        .byte $F0   ; 
- D 0 - I - 0x028C22 0A:8C12: F5        .byte $F5   ; 
- D 0 - I - 0x028C23 0A:8C13: 81        .byte $81   ; 
- D 0 - I - 0x028C24 0A:8C14: F4        .byte $F4   ; 
- D 0 - I - 0x028C25 0A:8C15: 24        .byte $24   ; 
- D 0 - I - 0x028C26 0A:8C16: 25        .byte $25   ; 
- D 0 - I - 0x028C27 0A:8C17: 26        .byte $26   ; 
- D 0 - I - 0x028C28 0A:8C18: 4F        .byte $4F   ; <O>
- D 0 - I - 0x028C29 0A:8C19: F1        .byte $F1   ; 
- D 0 - I - 0x028C2A 0A:8C1A: 0A        .byte $0A   ; 
- D 0 - I - 0x028C2B 0A:8C1B: 0A        .byte $0A   ; 
- D 0 - I - 0x028C2C 0A:8C1C: F0        .byte $F0   ; 
- D 0 - I - 0x028C2D 0A:8C1D: BB        .byte $BB   ; 
- D 0 - I - 0x028C2E 0A:8C1E: 00        .byte $00   ; 
- D 0 - I - 0x028C2F 0A:8C1F: F1        .byte $F1   ; 
- D 0 - I - 0x028C30 0A:8C20: 01        .byte $01   ; 
- D 0 - I - 0x028C31 0A:8C21: 09        .byte $09   ; 
- D 0 - I - 0x028C32 0A:8C22: F8        .byte $F8   ; 
- D 0 - I - 0x028C33 0A:8C23: BB        .byte $BB   ; 
- D 0 - I - 0x028C34 0A:8C24: 04        .byte $04   ; 
- D 0 - I - 0x028C35 0A:8C25: F8        .byte $F8   ; 
- D 0 - I - 0x028C36 0A:8C26: A7        .byte $A7   ; 
- D 0 - I - 0x028C37 0A:8C27: 8B        .byte $8B   ; 
- D 0 - I - 0x028C38 0A:8C28: F5        .byte $F5   ; 
- D 0 - I - 0x028C39 0A:8C29: 81        .byte $81   ; 
- D 0 - I - 0x028C3A 0A:8C2A: F4        .byte $F4   ; 
- D 0 - I - 0x028C3B 0A:8C2B: 24        .byte $24   ; 
- D 0 - I - 0x028C3C 0A:8C2C: 25        .byte $25   ; 
- D 0 - I - 0x028C3D 0A:8C2D: 26        .byte $26   ; 
- D 0 - I - 0x028C3E 0A:8C2E: 4F        .byte $4F   ; <O>
- D 0 - I - 0x028C3F 0A:8C2F: F1        .byte $F1   ; 
- D 0 - I - 0x028C40 0A:8C30: 05        .byte $05   ; 
- D 0 - I - 0x028C41 0A:8C31: 09        .byte $09   ; 
- D 0 - I - 0x028C42 0A:8C32: 10        .byte $10   ; 
- D 0 - I - 0x028C43 0A:8C33: B3        .byte $B3   ; 
- D 0 - I - 0x028C44 0A:8C34: 05        .byte $05   ; 
- D 0 - I - 0x028C45 0A:8C35: F1        .byte $F1   ; 
- D 0 - I - 0x028C46 0A:8C36: 06        .byte $06   ; 
- D 0 - I - 0x028C47 0A:8C37: 0A        .byte $0A   ; 
- D 0 - I - 0x028C48 0A:8C38: 58        .byte $58   ; <X>
- D 0 - I - 0x028C49 0A:8C39: EF        .byte $EF   ; 
- D 0 - I - 0x028C4A 0A:8C3A: 00        .byte $00   ; 
- D 0 - I - 0x028C4B 0A:8C3B: F0        .byte $F0   ; 
- D 0 - I - 0x028C4C 0A:8C3C: F5        .byte $F5   ; 
- D 0 - I - 0x028C4D 0A:8C3D: 81        .byte $81   ; 
- D 0 - I - 0x028C4E 0A:8C3E: F4        .byte $F4   ; 
- D 0 - I - 0x028C4F 0A:8C3F: 24        .byte $24   ; 
- D 0 - I - 0x028C50 0A:8C40: 25        .byte $25   ; 
- D 0 - I - 0x028C51 0A:8C41: 26        .byte $26   ; 
- D 0 - I - 0x028C52 0A:8C42: 4F        .byte $4F   ; <O>
- D 0 - I - 0x028C53 0A:8C43: F1        .byte $F1   ; 
- D 0 - I - 0x028C54 0A:8C44: 00        .byte $00   ; 
- D 0 - I - 0x028C55 0A:8C45: 3A        .byte $3A   ; 
- D 0 - I - 0x028C56 0A:8C46: F8        .byte $F8   ; 
- D 0 - I - 0x028C57 0A:8C47: BB        .byte $BB   ; 
- D 0 - I - 0x028C58 0A:8C48: 00        .byte $00   ; 
- D 0 - I - 0x028C59 0A:8C49: F0        .byte $F0   ; 
- D 0 - I - 0x028C5A 0A:8C4A: F5        .byte $F5   ; 
- D 0 - I - 0x028C5B 0A:8C4B: 09        .byte $09   ; 
- D 0 - I - 0x028C5C 0A:8C4C: F4        .byte $F4   ; 
- D 0 - I - 0x028C5D 0A:8C4D: 04        .byte $04   ; 
- D 0 - I - 0x028C5E 0A:8C4E: 05        .byte $05   ; 
- D 0 - I - 0x028C5F 0A:8C4F: 00        .byte $00   ; 
- D 0 - I - 0x028C60 0A:8C50: 00        .byte $00   ; 
- D 0 - I - 0x028C61 0A:8C51: F7        .byte $F7   ; 
- D 0 - I - 0x028C62 0A:8C52: 03        .byte $03   ; 
- D 0 - I - 0x028C63 0A:8C53: 7B        .byte $7B   ; 
- D 0 - I - 0x028C64 0A:8C54: F1        .byte $F1   ; 
- D 0 - I - 0x028C65 0A:8C55: 00        .byte $00   ; 
- D 0 - I - 0x028C66 0A:8C56: 00        .byte $00   ; 
- D 0 - I - 0x028C67 0A:8C57: 80        .byte $80   ; 
- D 0 - I - 0x028C68 0A:8C58: FB        .byte $FB   ; 
- D 0 - I - 0x028C69 0A:8C59: 00        .byte $00   ; 
- D 0 - I - 0x028C6A 0A:8C5A: F1        .byte $F1   ; 
- D 0 - I - 0x028C6B 0A:8C5B: 3B        .byte $3B   ; 
- D 0 - I - 0x028C6C 0A:8C5C: BA        .byte $BA   ; 
- D 0 - I - 0x028C6D 0A:8C5D: D0        .byte $D0   ; 
- D 0 - I - 0x028C6E 0A:8C5E: C3        .byte $C3   ; 
- D 0 - I - 0x028C6F 0A:8C5F: 04        .byte $04   ; 
- D 0 - I - 0x028C70 0A:8C60: F0        .byte $F0   ; 
- D 0 - I - 0x028C71 0A:8C61: F5        .byte $F5   ; 
- D 0 - I - 0x028C72 0A:8C62: 09        .byte $09   ; 
- D 0 - I - 0x028C73 0A:8C63: F4        .byte $F4   ; 
- D 0 - I - 0x028C74 0A:8C64: 04        .byte $04   ; 
- D 0 - I - 0x028C75 0A:8C65: 05        .byte $05   ; 
- D 0 - I - 0x028C76 0A:8C66: 00        .byte $00   ; 
- D 0 - I - 0x028C77 0A:8C67: 00        .byte $00   ; 
- D 0 - I - 0x028C78 0A:8C68: F7        .byte $F7   ; 
- D 0 - I - 0x028C79 0A:8C69: 03        .byte $03   ; 
- D 0 - I - 0x028C7A 0A:8C6A: 7B        .byte $7B   ; 
- D 0 - I - 0x028C7B 0A:8C6B: F1        .byte $F1   ; 
- D 0 - I - 0x028C7C 0A:8C6C: 3C        .byte $3C   ; 
- D 0 - I - 0x028C7D 0A:8C6D: CF        .byte $CF   ; 
- D 0 - I - 0x028C7E 0A:8C6E: E0        .byte $E0   ; 
- D 0 - I - 0x028C7F 0A:8C6F: 7B        .byte $7B   ; 
- D 0 - I - 0x028C80 0A:8C70: 04        .byte $04   ; 
- D 0 - I - 0x028C81 0A:8C71: F1        .byte $F1   ; 
- D 0 - I - 0x028C82 0A:8C72: 00        .byte $00   ; 
- D 0 - I - 0x028C83 0A:8C73: 00        .byte $00   ; 
- D 0 - I - 0x028C84 0A:8C74: 80        .byte $80   ; 
- D 0 - I - 0x028C85 0A:8C75: FB        .byte $FB   ; 
- D 0 - I - 0x028C86 0A:8C76: 00        .byte $00   ; 
- D 0 - I - 0x028C87 0A:8C77: F0        .byte $F0   ; 
- D 0 - I - 0x028C88 0A:8C78: F5        .byte $F5   ; 
- D 0 - I - 0x028C89 0A:8C79: 09        .byte $09   ; 
- D 0 - I - 0x028C8A 0A:8C7A: F4        .byte $F4   ; 
- D 0 - I - 0x028C8B 0A:8C7B: 04        .byte $04   ; 
- D 0 - I - 0x028C8C 0A:8C7C: 05        .byte $05   ; 
- D 0 - I - 0x028C8D 0A:8C7D: 00        .byte $00   ; 
- D 0 - I - 0x028C8E 0A:8C7E: 00        .byte $00   ; 
- D 0 - I - 0x028C8F 0A:8C7F: F1        .byte $F1   ; 
- D 0 - I - 0x028C90 0A:8C80: 48        .byte $48   ; <H>
- D 0 - I - 0x028C91 0A:8C81: C4        .byte $C4   ; 
- D 0 - I - 0x028C92 0A:8C82: 98        .byte $98   ; 
- D 0 - I - 0x028C93 0A:8C83: A4        .byte $A4   ; 
- D 0 - I - 0x028C94 0A:8C84: 00        .byte $00   ; 
- D 0 - I - 0x028C95 0A:8C85: F0        .byte $F0   ; 
- D 0 - I - 0x028C96 0A:8C86: F5        .byte $F5   ; 
- D 0 - I - 0x028C97 0A:8C87: 09        .byte $09   ; 
- D 0 - I - 0x028C98 0A:8C88: F4        .byte $F4   ; 
- D 0 - I - 0x028C99 0A:8C89: 04        .byte $04   ; 
- D 0 - I - 0x028C9A 0A:8C8A: 05        .byte $05   ; 
- D 0 - I - 0x028C9B 0A:8C8B: 00        .byte $00   ; 
- D 0 - I - 0x028C9C 0A:8C8C: 00        .byte $00   ; 
- D 0 - I - 0x028C9D 0A:8C8D: F1        .byte $F1   ; 
- D 0 - I - 0x028C9E 0A:8C8E: 00        .byte $00   ; 
- D 0 - I - 0x028C9F 0A:8C8F: BA        .byte $BA   ; 
- D 0 - I - 0x028CA0 0A:8C90: 00        .byte $00   ; 
- D 0 - I - 0x028CA1 0A:8C91: C3        .byte $C3   ; 
- D 0 - I - 0x028CA2 0A:8C92: 01        .byte $01   ; 
- D 0 - I - 0x028CA3 0A:8C93: F0        .byte $F0   ; 
- D 0 - I - 0x028CA4 0A:8C94: F5        .byte $F5   ; 
- D 0 - I - 0x028CA5 0A:8C95: 09        .byte $09   ; 
- D 0 - I - 0x028CA6 0A:8C96: F4        .byte $F4   ; 
- D 0 - I - 0x028CA7 0A:8C97: 04        .byte $04   ; 
- D 0 - I - 0x028CA8 0A:8C98: 05        .byte $05   ; 
- D 0 - I - 0x028CA9 0A:8C99: 00        .byte $00   ; 
- D 0 - I - 0x028CAA 0A:8C9A: 00        .byte $00   ; 
- D 0 - I - 0x028CAB 0A:8C9B: F1        .byte $F1   ; 
- D 0 - I - 0x028CAC 0A:8C9C: 5F        .byte $5F   ; 
- D 0 - I - 0x028CAD 0A:8C9D: CF        .byte $CF   ; 
- D 0 - I - 0x028CAE 0A:8C9E: 98        .byte $98   ; 
- D 0 - I - 0x028CAF 0A:8C9F: AB        .byte $AB   ; 
- D 0 - I - 0x028CB0 0A:8CA0: 00        .byte $00   ; 
- D 0 - I - 0x028CB1 0A:8CA1: F0        .byte $F0   ; 
- D 0 - I - 0x028CB2 0A:8CA2: F5        .byte $F5   ; 
- D 0 - I - 0x028CB3 0A:8CA3: 81        .byte $81   ; 
- D 0 - I - 0x028CB4 0A:8CA4: F4        .byte $F4   ; 
- D 0 - I - 0x028CB5 0A:8CA5: 1C        .byte $1C   ; 
- D 0 - I - 0x028CB6 0A:8CA6: 1D        .byte $1D   ; 
- D 0 - I - 0x028CB7 0A:8CA7: 00        .byte $00   ; 
- D 0 - I - 0x028CB8 0A:8CA8: 00        .byte $00   ; 
- D 0 - I - 0x028CB9 0A:8CA9: F7        .byte $F7   ; 
- D 0 - I - 0x028CBA 0A:8CAA: 03        .byte $03   ; 
- D 0 - I - 0x028CBB 0A:8CAB: 7B        .byte $7B   ; 
- D 0 - I - 0x028CBC 0A:8CAC: F1        .byte $F1   ; 
- D 0 - I - 0x028CBD 0A:8CAD: 76        .byte $76   ; <v>
- D 0 - I - 0x028CBE 0A:8CAE: 0D        .byte $0D   ; 
- D 0 - I - 0x028CBF 0A:8CAF: 80        .byte $80   ; 
- D 0 - I - 0x028CC0 0A:8CB0: 23        .byte $23   ; 
- D 0 - I - 0x028CC1 0A:8CB1: 06        .byte $06   ; 
- D 0 - I - 0x028CC2 0A:8CB2: F1        .byte $F1   ; 
- D 0 - I - 0x028CC3 0A:8CB3: 00        .byte $00   ; 
- D 0 - I - 0x028CC4 0A:8CB4: 00        .byte $00   ; 
- D 0 - I - 0x028CC5 0A:8CB5: 80        .byte $80   ; 
- D 0 - I - 0x028CC6 0A:8CB6: FB        .byte $FB   ; 
- D 0 - I - 0x028CC7 0A:8CB7: 00        .byte $00   ; 
- D 0 - I - 0x028CC8 0A:8CB8: F0        .byte $F0   ; 
- D 0 - I - 0x028CC9 0A:8CB9: F5        .byte $F5   ; 
- D 0 - I - 0x028CCA 0A:8CBA: 81        .byte $81   ; 
- D 0 - I - 0x028CCB 0A:8CBB: F4        .byte $F4   ; 
- D 0 - I - 0x028CCC 0A:8CBC: 1C        .byte $1C   ; 
- D 0 - I - 0x028CCD 0A:8CBD: 1D        .byte $1D   ; 
- D 0 - I - 0x028CCE 0A:8CBE: 00        .byte $00   ; 
- D 0 - I - 0x028CCF 0A:8CBF: 00        .byte $00   ; 
- D 0 - I - 0x028CD0 0A:8CC0: F7        .byte $F7   ; 
- D 0 - I - 0x028CD1 0A:8CC1: 03        .byte $03   ; 
- D 0 - I - 0x028CD2 0A:8CC2: 7B        .byte $7B   ; 
- D 0 - I - 0x028CD3 0A:8CC3: F1        .byte $F1   ; 
- D 0 - I - 0x028CD4 0A:8CC4: 76        .byte $76   ; <v>
- D 0 - I - 0x028CD5 0A:8CC5: 0F        .byte $0F   ; 
- D 0 - I - 0x028CD6 0A:8CC6: 80        .byte $80   ; 
- D 0 - I - 0x028CD7 0A:8CC7: 23        .byte $23   ; 
- D 0 - I - 0x028CD8 0A:8CC8: 06        .byte $06   ; 
- D 0 - I - 0x028CD9 0A:8CC9: F1        .byte $F1   ; 
- D 0 - I - 0x028CDA 0A:8CCA: 00        .byte $00   ; 
- D 0 - I - 0x028CDB 0A:8CCB: 00        .byte $00   ; 
- D 0 - I - 0x028CDC 0A:8CCC: 80        .byte $80   ; 
- D 0 - I - 0x028CDD 0A:8CCD: FB        .byte $FB   ; 
- D 0 - I - 0x028CDE 0A:8CCE: 00        .byte $00   ; 
- D 0 - I - 0x028CDF 0A:8CCF: F0        .byte $F0   ; 
- D 0 - I - 0x028CE0 0A:8CD0: F5        .byte $F5   ; 
- D 0 - I - 0x028CE1 0A:8CD1: 81        .byte $81   ; 
- D 0 - I - 0x028CE2 0A:8CD2: F4        .byte $F4   ; 
- D 0 - I - 0x028CE3 0A:8CD3: 28        .byte $28   ; 
- D 0 - I - 0x028CE4 0A:8CD4: 29        .byte $29   ; 
- D 0 - I - 0x028CE5 0A:8CD5: 2A        .byte $2A   ; 
- D 0 - I - 0x028CE6 0A:8CD6: 0B        .byte $0B   ; 
- D 0 - I - 0x028CE7 0A:8CD7: F1        .byte $F1   ; 
- D 0 - I - 0x028CE8 0A:8CD8: 0E        .byte $0E   ; 
- D 0 - I - 0x028CE9 0A:8CD9: 3C        .byte $3C   ; 
- D 0 - I - 0x028CEA 0A:8CDA: E8        .byte $E8   ; 
- D 0 - I - 0x028CEB 0A:8CDB: BB        .byte $BB   ; 
- D 0 - I - 0x028CEC 0A:8CDC: 00        .byte $00   ; 
- D 0 - I - 0x028CED 0A:8CDD: F0        .byte $F0   ; 
- D 0 - I - 0x028CEE 0A:8CDE: F5        .byte $F5   ; 
- D 0 - I - 0x028CEF 0A:8CDF: 83        .byte $83   ; 
- D 0 - I - 0x028CF0 0A:8CE0: F4        .byte $F4   ; 
- D 0 - I - 0x028CF1 0A:8CE1: 18        .byte $18   ; 
- D 0 - I - 0x028CF2 0A:8CE2: 19        .byte $19   ; 
- D 0 - I - 0x028CF3 0A:8CE3: 1A        .byte $1A   ; 
- D 0 - I - 0x028CF4 0A:8CE4: 1B        .byte $1B   ; 
- D 0 - I - 0x028CF5 0A:8CE5: F1        .byte $F1   ; 
- D 0 - I - 0x028CF6 0A:8CE6: 99        .byte $99   ; 
- D 0 - I - 0x028CF7 0A:8CE7: 40        .byte $40   ; 
- D 0 - I - 0x028CF8 0A:8CE8: D0        .byte $D0   ; 
- D 0 - I - 0x028CF9 0A:8CE9: BB        .byte $BB   ; 
- D 0 - I - 0x028CFA 0A:8CEA: 00        .byte $00   ; 
- D 0 - I - 0x028CFB 0A:8CEB: F0        .byte $F0   ; 
- D 0 - I - 0x028CFC 0A:8CEC: F5        .byte $F5   ; 
- D 0 - I - 0x028CFD 0A:8CED: 83        .byte $83   ; 
- D 0 - I - 0x028CFE 0A:8CEE: F4        .byte $F4   ; 
- D 0 - I - 0x028CFF 0A:8CEF: 18        .byte $18   ; 
- D 0 - I - 0x028D00 0A:8CF0: 19        .byte $19   ; 
- D 0 - I - 0x028D01 0A:8CF1: 1A        .byte $1A   ; 
- D 0 - I - 0x028D02 0A:8CF2: 1B        .byte $1B   ; 
- D 0 - I - 0x028D03 0A:8CF3: F1        .byte $F1   ; 
- D 0 - I - 0x028D04 0A:8CF4: 11        .byte $11   ; 
- D 0 - I - 0x028D05 0A:8CF5: 15        .byte $15   ; 
- D 0 - I - 0x028D06 0A:8CF6: 64        .byte $64   ; <d>
- D 0 - I - 0x028D07 0A:8CF7: EF        .byte $EF   ; 
- D 0 - I - 0x028D08 0A:8CF8: 00        .byte $00   ; 
- D 0 - I - 0x028D09 0A:8CF9: F1        .byte $F1   ; 
- D 0 - I - 0x028D0A 0A:8CFA: 9A        .byte $9A   ; 
- D 0 - I - 0x028D0B 0A:8CFB: 14        .byte $14   ; 
- D 0 - I - 0x028D0C 0A:8CFC: CE        .byte $CE   ; 
- D 0 - I - 0x028D0D 0A:8CFD: B7        .byte $B7   ; 
- D 0 - I - 0x028D0E 0A:8CFE: 04        .byte $04   ; 
- D 0 - I - 0x028D0F 0A:8CFF: 1E        .byte $1E   ; 
- D 0 - I - 0x028D10 0A:8D00: F6        .byte $F6   ; 
- D 0 - I - 0x028D11 0A:8D01: 00        .byte $00   ; 
- D 0 - I - 0x028D12 0A:8D02: F1        .byte $F1   ; 
- D 0 - I - 0x028D13 0A:8D03: 10        .byte $10   ; 
- D 0 - I - 0x028D14 0A:8D04: 40        .byte $40   ; 
- D 0 - I - 0x028D15 0A:8D05: E8        .byte $E8   ; 
- D 0 - I - 0x028D16 0A:8D06: BB        .byte $BB   ; 
- D 0 - I - 0x028D17 0A:8D07: 04        .byte $04   ; 
- D 0 - I - 0x028D18 0A:8D08: F0        .byte $F0   ; 
- D 0 - I - 0x028D19 0A:8D09: F5        .byte $F5   ; 
- D 0 - I - 0x028D1A 0A:8D0A: 83        .byte $83   ; 
- D 0 - I - 0x028D1B 0A:8D0B: F4        .byte $F4   ; 
- D 0 - I - 0x028D1C 0A:8D0C: 18        .byte $18   ; 
- D 0 - I - 0x028D1D 0A:8D0D: 19        .byte $19   ; 
- D 0 - I - 0x028D1E 0A:8D0E: 1A        .byte $1A   ; 
- D 0 - I - 0x028D1F 0A:8D0F: 1B        .byte $1B   ; 
- D 0 - I - 0x028D20 0A:8D10: F1        .byte $F1   ; 
- D 0 - I - 0x028D21 0A:8D11: 12        .byte $12   ; 
- D 0 - I - 0x028D22 0A:8D12: 15        .byte $15   ; 
- D 0 - I - 0x028D23 0A:8D13: 40        .byte $40   ; 
- D 0 - I - 0x028D24 0A:8D14: CB        .byte $CB   ; 
- D 0 - I - 0x028D25 0A:8D15: 00        .byte $00   ; 
- D 0 - I - 0x028D26 0A:8D16: F1        .byte $F1   ; 
- D 0 - I - 0x028D27 0A:8D17: 9B        .byte $9B   ; 
- D 0 - I - 0x028D28 0A:8D18: 14        .byte $14   ; 
- D 0 - I - 0x028D29 0A:8D19: DC        .byte $DC   ; 
- D 0 - I - 0x028D2A 0A:8D1A: C6        .byte $C6   ; 
- D 0 - I - 0x028D2B 0A:8D1B: 04        .byte $04   ; 
- D 0 - I - 0x028D2C 0A:8D1C: F8        .byte $F8   ; 
- D 0 - I - 0x028D2D 0A:8D1D: A7        .byte $A7   ; 
- D 0 - I - 0x028D2E 0A:8D1E: 8B        .byte $8B   ; 
- D 0 - I - 0x028D2F 0A:8D1F: F5        .byte $F5   ; 
- D 0 - I - 0x028D30 0A:8D20: 80        .byte $80   ; 
- D 0 - I - 0x028D31 0A:8D21: F4        .byte $F4   ; 
- D 0 - I - 0x028D32 0A:8D22: 0C        .byte $0C   ; 
- D 0 - I - 0x028D33 0A:8D23: 0D        .byte $0D   ; 
- D 0 - I - 0x028D34 0A:8D24: 0E        .byte $0E   ; 
- D 0 - I - 0x028D35 0A:8D25: 0F        .byte $0F   ; 
- D 0 - I - 0x028D36 0A:8D26: F7        .byte $F7   ; 
- D 0 - I - 0x028D37 0A:8D27: 03        .byte $03   ; 
- D 0 - I - 0x028D38 0A:8D28: 7B        .byte $7B   ; 
- D 0 - I - 0x028D39 0A:8D29: F1        .byte $F1   ; 
- D 0 - I - 0x028D3A 0A:8D2A: 00        .byte $00   ; 
- D 0 - I - 0x028D3B 0A:8D2B: 00        .byte $00   ; 
- D 0 - I - 0x028D3C 0A:8D2C: 80        .byte $80   ; 
- D 0 - I - 0x028D3D 0A:8D2D: FB        .byte $FB   ; 
- D 0 - I - 0x028D3E 0A:8D2E: 00        .byte $00   ; 
- D 0 - I - 0x028D3F 0A:8D2F: F1        .byte $F1   ; 
- D 0 - I - 0x028D40 0A:8D30: 9D        .byte $9D   ; 
- D 0 - I - 0x028D41 0A:8D31: 1E        .byte $1E   ; 
- D 0 - I - 0x028D42 0A:8D32: 7C        .byte $7C   ; 
- D 0 - I - 0x028D43 0A:8D33: 9F        .byte $9F   ; 
- D 0 - I - 0x028D44 0A:8D34: 04        .byte $04   ; 
- D 0 - I - 0x028D45 0A:8D35: F1        .byte $F1   ; 
- D 0 - I - 0x028D46 0A:8D36: 24        .byte $24   ; 
- D 0 - I - 0x028D47 0A:8D37: 1D        .byte $1D   ; 
- D 0 - I - 0x028D48 0A:8D38: F0        .byte $F0   ; 
- D 0 - I - 0x028D49 0A:8D39: C3        .byte $C3   ; 
- D 0 - I - 0x028D4A 0A:8D3A: 08        .byte $08   ; 
- D 0 - I - 0x028D4B 0A:8D3B: 1E        .byte $1E   ; 
- D 0 - I - 0x028D4C 0A:8D3C: F6        .byte $F6   ; 
- D 0 - I - 0x028D4D 0A:8D3D: 15        .byte $15   ; 
- D 0 - I - 0x028D4E 0A:8D3E: F1        .byte $F1   ; 
- D 0 - I - 0x028D4F 0A:8D3F: 00        .byte $00   ; 
- D 0 - I - 0x028D50 0A:8D40: 47        .byte $47   ; <G>
- D 0 - I - 0x028D51 0A:8D41: EB        .byte $EB   ; 
- D 0 - I - 0x028D52 0A:8D42: C1        .byte $C1   ; 
- D 0 - I - 0x028D53 0A:8D43: 08        .byte $08   ; 
- D 0 - I - 0x028D54 0A:8D44: 02        .byte $02   ; 
- D 0 - I - 0x028D55 0A:8D45: F1        .byte $F1   ; 
- D 0 - I - 0x028D56 0A:8D46: E7        .byte $E7   ; 
- D 0 - I - 0x028D57 0A:8D47: 1E        .byte $1E   ; 
- D 0 - I - 0x028D58 0A:8D48: FC        .byte $FC   ; 
- D 0 - I - 0x028D59 0A:8D49: B3        .byte $B3   ; 
- D 0 - I - 0x028D5A 0A:8D4A: 04        .byte $04   ; 
- D 0 - I - 0x028D5B 0A:8D4B: F1        .byte $F1   ; 
- D 0 - I - 0x028D5C 0A:8D4C: 26        .byte $26   ; 
- D 0 - I - 0x028D5D 0A:8D4D: 20        .byte $20   ; 
- D 0 - I - 0x028D5E 0A:8D4E: EB        .byte $EB   ; 
- D 0 - I - 0x028D5F 0A:8D4F: C1        .byte $C1   ; 
- D 0 - I - 0x028D60 0A:8D50: 08        .byte $08   ; 
- D 0 - I - 0x028D61 0A:8D51: F0        .byte $F0   ; 
- D 0 - I - 0x028D62 0A:8D52: F5        .byte $F5   ; 
- D 0 - I - 0x028D63 0A:8D53: 09        .byte $09   ; 
- D 0 - I - 0x028D64 0A:8D54: F4        .byte $F4   ; 
- D 0 - I - 0x028D65 0A:8D55: 04        .byte $04   ; 
- D 0 - I - 0x028D66 0A:8D56: 05        .byte $05   ; 
- D 0 - I - 0x028D67 0A:8D57: 00        .byte $00   ; 
- D 0 - I - 0x028D68 0A:8D58: 00        .byte $00   ; 
- D 0 - I - 0x028D69 0A:8D59: F1        .byte $F1   ; 
- D 0 - I - 0x028D6A 0A:8D5A: 60        .byte $60   ; 
- D 0 - I - 0x028D6B 0A:8D5B: CF        .byte $CF   ; 
- D 0 - I - 0x028D6C 0A:8D5C: 98        .byte $98   ; 
- D 0 - I - 0x028D6D 0A:8D5D: E3        .byte $E3   ; 
- D 0 - I - 0x028D6E 0A:8D5E: 00        .byte $00   ; 
- D 0 - I - 0x028D6F 0A:8D5F: F0        .byte $F0   ; 
- D 0 - I - 0x028D70 0A:8D60: F5        .byte $F5   ; 
- D 0 - I - 0x028D71 0A:8D61: 83        .byte $83   ; 
- D 0 - I - 0x028D72 0A:8D62: F4        .byte $F4   ; 
- D 0 - I - 0x028D73 0A:8D63: 18        .byte $18   ; 
- D 0 - I - 0x028D74 0A:8D64: 19        .byte $19   ; 
- D 0 - I - 0x028D75 0A:8D65: 1A        .byte $1A   ; 
- D 0 - I - 0x028D76 0A:8D66: 1B        .byte $1B   ; 
- D 0 - I - 0x028D77 0A:8D67: F1        .byte $F1   ; 
- D 0 - I - 0x028D78 0A:8D68: 49        .byte $49   ; <I>
- D 0 - I - 0x028D79 0A:8D69: 15        .byte $15   ; 
- D 0 - I - 0x028D7A 0A:8D6A: 40        .byte $40   ; 
- D 0 - I - 0x028D7B 0A:8D6B: CB        .byte $CB   ; 
- D 0 - I - 0x028D7C 0A:8D6C: 00        .byte $00   ; 
- D 0 - I - 0x028D7D 0A:8D6D: F1        .byte $F1   ; 
- D 0 - I - 0x028D7E 0A:8D6E: A5        .byte $A5   ; 
- D 0 - I - 0x028D7F 0A:8D6F: 14        .byte $14   ; 
- D 0 - I - 0x028D80 0A:8D70: DC        .byte $DC   ; 
- D 0 - I - 0x028D81 0A:8D71: C6        .byte $C6   ; 
- D 0 - I - 0x028D82 0A:8D72: 04        .byte $04   ; 
- D 0 - I - 0x028D83 0A:8D73: F9        .byte $F9   ; 
- D 0 - I - 0x028D84 0A:8D74: 0F        .byte $0F   ; 
- D 0 - I - 0x028D85 0A:8D75: 01        .byte $01   ; 
- D 0 - I - 0x028D86 0A:8D76: FB        .byte $FB   ; 
- D 0 - I - 0x028D87 0A:8D77: 10        .byte $10   ; 
- D 0 - I - 0x028D88 0A:8D78: 23        .byte $23   ; 
- D 0 - I - 0x028D89 0A:8D79: 45        .byte $45   ; <E>
- D 0 - I - 0x028D8A 0A:8D7A: 01        .byte $01   ; 
- D 0 - I - 0x028D8B 0A:8D7B: FB        .byte $FB   ; 
- D 0 - I - 0x028D8C 0A:8D7C: 01        .byte $01   ; 
- D 0 - I - 0x028D8D 0A:8D7D: 23        .byte $23   ; 
- D 0 - I - 0x028D8E 0A:8D7E: 45        .byte $45   ; <E>
- D 0 - I - 0x028D8F 0A:8D7F: FA        .byte $FA   ; 
- D 0 - I - 0x028D90 0A:8D80: F6        .byte $F6   ; 
- D 0 - I - 0x028D91 0A:8D81: 00        .byte $00   ; 
- D 0 - I - 0x028D92 0A:8D82: F1        .byte $F1   ; 
- D 0 - I - 0x028D93 0A:8D83: 4A        .byte $4A   ; <J>
- D 0 - I - 0x028D94 0A:8D84: 40        .byte $40   ; 
- D 0 - I - 0x028D95 0A:8D85: 08        .byte $08   ; 
- D 0 - I - 0x028D96 0A:8D86: BB        .byte $BB   ; 
- D 0 - I - 0x028D97 0A:8D87: 05        .byte $05   ; 
- D 0 - I - 0x028D98 0A:8D88: F0        .byte $F0   ; 
- D 0 - I - 0x028D99 0A:8D89: F5        .byte $F5   ; 
- D 0 - I - 0x028D9A 0A:8D8A: 81        .byte $81   ; 
- D 0 - I - 0x028D9B 0A:8D8B: F4        .byte $F4   ; 
- D 0 - I - 0x028D9C 0A:8D8C: 13        .byte $13   ; 
- D 0 - I - 0x028D9D 0A:8D8D: 00        .byte $00   ; 
- D 0 - I - 0x028D9E 0A:8D8E: 00        .byte $00   ; 
- D 0 - I - 0x028D9F 0A:8D8F: 00        .byte $00   ; 
- D 0 - I - 0x028DA0 0A:8D90: F1        .byte $F1   ; 
- D 0 - I - 0x028DA1 0A:8D91: 90        .byte $90   ; 
- D 0 - I - 0x028DA2 0A:8D92: 2A        .byte $2A   ; 
- D 0 - I - 0x028DA3 0A:8D93: 00        .byte $00   ; 
- D 0 - I - 0x028DA4 0A:8D94: CB        .byte $CB   ; 
- D 0 - I - 0x028DA5 0A:8D95: 01        .byte $01   ; 
- D 0 - I - 0x028DA6 0A:8D96: F0        .byte $F0   ; 
- D 0 - I - 0x028DA7 0A:8D97: F5        .byte $F5   ; 
- D 0 - I - 0x028DA8 0A:8D98: 09        .byte $09   ; 
- D 0 - I - 0x028DA9 0A:8D99: F4        .byte $F4   ; 
- D 0 - I - 0x028DAA 0A:8D9A: 04        .byte $04   ; 
- D 0 - I - 0x028DAB 0A:8D9B: 05        .byte $05   ; 
- D 0 - I - 0x028DAC 0A:8D9C: 00        .byte $00   ; 
- D 0 - I - 0x028DAD 0A:8D9D: 00        .byte $00   ; 
- D 0 - I - 0x028DAE 0A:8D9E: F1        .byte $F1   ; 
- D 0 - I - 0x028DAF 0A:8D9F: 61        .byte $61   ; <a>
- D 0 - I - 0x028DB0 0A:8DA0: C4        .byte $C4   ; 
- D 0 - I - 0x028DB1 0A:8DA1: 00        .byte $00   ; 
- D 0 - I - 0x028DB2 0A:8DA2: EB        .byte $EB   ; 
- D 0 - I - 0x028DB3 0A:8DA3: 01        .byte $01   ; 
- D 0 - I - 0x028DB4 0A:8DA4: F0        .byte $F0   ; 
- D 0 - I - 0x028DB5 0A:8DA5: F5        .byte $F5   ; 
- D 0 - I - 0x028DB6 0A:8DA6: 09        .byte $09   ; 
- D 0 - I - 0x028DB7 0A:8DA7: F4        .byte $F4   ; 
- D 0 - I - 0x028DB8 0A:8DA8: 04        .byte $04   ; 
- D 0 - I - 0x028DB9 0A:8DA9: 05        .byte $05   ; 
- D 0 - I - 0x028DBA 0A:8DAA: 00        .byte $00   ; 
- D 0 - I - 0x028DBB 0A:8DAB: 00        .byte $00   ; 
- D 0 - I - 0x028DBC 0A:8DAC: F1        .byte $F1   ; 
- D 0 - I - 0x028DBD 0A:8DAD: 73        .byte $73   ; <s>
- D 0 - I - 0x028DBE 0A:8DAE: 72        .byte $72   ; <r>
- D 0 - I - 0x028DBF 0A:8DAF: 9F        .byte $9F   ; 
- D 0 - I - 0x028DC0 0A:8DB0: BB        .byte $BB   ; 
- D 0 - I - 0x028DC1 0A:8DB1: 00        .byte $00   ; 
- D 0 - I - 0x028DC2 0A:8DB2: F0        .byte $F0   ; 
- D 0 - I - 0x028DC3 0A:8DB3: F5        .byte $F5   ; 
- D 0 - I - 0x028DC4 0A:8DB4: 09        .byte $09   ; 
- D 0 - I - 0x028DC5 0A:8DB5: F4        .byte $F4   ; 
- D 0 - I - 0x028DC6 0A:8DB6: 04        .byte $04   ; 
- D 0 - I - 0x028DC7 0A:8DB7: 05        .byte $05   ; 
- D 0 - I - 0x028DC8 0A:8DB8: 00        .byte $00   ; 
- D 0 - I - 0x028DC9 0A:8DB9: 00        .byte $00   ; 
- D 0 - I - 0x028DCA 0A:8DBA: F1        .byte $F1   ; 
- D 0 - I - 0x028DCB 0A:8DBB: 00        .byte $00   ; 
- D 0 - I - 0x028DCC 0A:8DBC: 71        .byte $71   ; <q>
- D 0 - I - 0x028DCD 0A:8DBD: 00        .byte $00   ; 
- D 0 - I - 0x028DCE 0A:8DBE: BB        .byte $BB   ; 
- D 0 - I - 0x028DCF 0A:8DBF: 01        .byte $01   ; 
- D 0 - I - 0x028DD0 0A:8DC0: F0        .byte $F0   ; 
- D 0 - I - 0x028DD1 0A:8DC1: F5        .byte $F5   ; 
- D 0 - I - 0x028DD2 0A:8DC2: 81        .byte $81   ; 
- D 0 - I - 0x028DD3 0A:8DC3: F4        .byte $F4   ; 
- D 0 - I - 0x028DD4 0A:8DC4: 13        .byte $13   ; 
- D 0 - I - 0x028DD5 0A:8DC5: 00        .byte $00   ; 
- D 0 - I - 0x028DD6 0A:8DC6: 00        .byte $00   ; 
- D 0 - I - 0x028DD7 0A:8DC7: 00        .byte $00   ; 
- D 0 - I - 0x028DD8 0A:8DC8: F1        .byte $F1   ; 
- D 0 - I - 0x028DD9 0A:8DC9: 38        .byte $38   ; <8>
- D 0 - I - 0x028DDA 0A:8DCA: 2A        .byte $2A   ; 
- D 0 - I - 0x028DDB 0A:8DCB: 00        .byte $00   ; 
- D 0 - I - 0x028DDC 0A:8DCC: CB        .byte $CB   ; 
- D 0 - I - 0x028DDD 0A:8DCD: 01        .byte $01   ; 
- D 0 - I - 0x028DDE 0A:8DCE: F0        .byte $F0   ; 
- D 0 - I - 0x028DDF 0A:8DCF: F5        .byte $F5   ; 
- D 0 - I - 0x028DE0 0A:8DD0: 81        .byte $81   ; 
- D 0 - I - 0x028DE1 0A:8DD1: F4        .byte $F4   ; 
- D 0 - I - 0x028DE2 0A:8DD2: 28        .byte $28   ; 
- D 0 - I - 0x028DE3 0A:8DD3: 29        .byte $29   ; 
- D 0 - I - 0x028DE4 0A:8DD4: 2A        .byte $2A   ; 
- D 0 - I - 0x028DE5 0A:8DD5: 0B        .byte $0B   ; 
- D 0 - I - 0x028DE6 0A:8DD6: F1        .byte $F1   ; 
- D 0 - I - 0x028DE7 0A:8DD7: 4C        .byte $4C   ; <L>
- D 0 - I - 0x028DE8 0A:8DD8: 12        .byte $12   ; 
- D 0 - I - 0x028DE9 0A:8DD9: 70        .byte $70   ; <p>
- D 0 - I - 0x028DEA 0A:8DDA: CB        .byte $CB   ; 
- D 0 - I - 0x028DEB 0A:8DDB: 00        .byte $00   ; 
- D 0 - I - 0x028DEC 0A:8DDC: F1        .byte $F1   ; 
- D 0 - I - 0x028DED 0A:8DDD: 4B        .byte $4B   ; <K>
- D 0 - I - 0x028DEE 0A:8DDE: 10        .byte $10   ; 
- D 0 - I - 0x028DEF 0A:8DDF: 23        .byte $23   ; 
- D 0 - I - 0x028DF0 0A:8DE0: C0        .byte $C0   ; 
- D 0 - I - 0x028DF1 0A:8DE1: 05        .byte $05   ; 
- D 0 - I - 0x028DF2 0A:8DE2: F9        .byte $F9   ; 
- D 0 - I - 0x028DF3 0A:8DE3: 0C        .byte $0C   ; 
- D 0 - I - 0x028DF4 0A:8DE4: 01        .byte $01   ; 
- D 0 - I - 0x028DF5 0A:8DE5: FB        .byte $FB   ; 
- D 0 - I - 0x028DF6 0A:8DE6: 10        .byte $10   ; 
- D 0 - I - 0x028DF7 0A:8DE7: 23        .byte $23   ; 
- D 0 - I - 0x028DF8 0A:8DE8: 45        .byte $45   ; <E>
- D 0 - I - 0x028DF9 0A:8DE9: 01        .byte $01   ; 
- D 0 - I - 0x028DFA 0A:8DEA: FB        .byte $FB   ; 
- D 0 - I - 0x028DFB 0A:8DEB: 01        .byte $01   ; 
- D 0 - I - 0x028DFC 0A:8DEC: 23        .byte $23   ; 
- D 0 - I - 0x028DFD 0A:8DED: 45        .byte $45   ; <E>
- D 0 - I - 0x028DFE 0A:8DEE: FA        .byte $FA   ; 
- D 0 - I - 0x028DFF 0A:8DEF: F6        .byte $F6   ; 
- D 0 - I - 0x028E00 0A:8DF0: 00        .byte $00   ; 
- D 0 - I - 0x028E01 0A:8DF1: F1        .byte $F1   ; 
- D 0 - I - 0x028E02 0A:8DF2: 00        .byte $00   ; 
- D 0 - I - 0x028E03 0A:8DF3: 37        .byte $37   ; <7>
- D 0 - I - 0x028E04 0A:8DF4: 20        .byte $20   ; 
- D 0 - I - 0x028E05 0A:8DF5: BB        .byte $BB   ; 
- D 0 - I - 0x028E06 0A:8DF6: 05        .byte $05   ; 
- D 0 - I - 0x028E07 0A:8DF7: 02        .byte $02   ; 
- D 0 - I - 0x028E08 0A:8DF8: F1        .byte $F1   ; 
- D 0 - I - 0x028E09 0A:8DF9: DE        .byte $DE   ; 
- D 0 - I - 0x028E0A 0A:8DFA: 12        .byte $12   ; 
- D 0 - I - 0x028E0B 0A:8DFB: 16        .byte $16   ; 
- D 0 - I - 0x028E0C 0A:8DFC: CB        .byte $CB   ; 
- D 0 - I - 0x028E0D 0A:8DFD: 01        .byte $01   ; 
- D 0 - I - 0x028E0E 0A:8DFE: F1        .byte $F1   ; 
- D 0 - I - 0x028E0F 0A:8DFF: 4B        .byte $4B   ; <K>
- D 0 - I - 0x028E10 0A:8E00: 10        .byte $10   ; 
- D 0 - I - 0x028E11 0A:8E01: 20        .byte $20   ; 
- D 0 - I - 0x028E12 0A:8E02: BB        .byte $BB   ; 
- D 0 - I - 0x028E13 0A:8E03: 05        .byte $05   ; 
- D 0 - I - 0x028E14 0A:8E04: F0        .byte $F0   ; 
- D 0 - I - 0x028E15 0A:8E05: F5        .byte $F5   ; 
- D 0 - I - 0x028E16 0A:8E06: 81        .byte $81   ; 
- D 0 - I - 0x028E17 0A:8E07: F4        .byte $F4   ; 
- D 0 - I - 0x028E18 0A:8E08: 28        .byte $28   ; 
- D 0 - I - 0x028E19 0A:8E09: 29        .byte $29   ; 
- D 0 - I - 0x028E1A 0A:8E0A: 2A        .byte $2A   ; 
- D 0 - I - 0x028E1B 0A:8E0B: 2B        .byte $2B   ; 
- D 0 - I - 0x028E1C 0A:8E0C: F1        .byte $F1   ; 
- D 0 - I - 0x028E1D 0A:8E0D: 4E        .byte $4E   ; <N>
- D 0 - I - 0x028E1E 0A:8E0E: 12        .byte $12   ; 
- D 0 - I - 0x028E1F 0A:8E0F: 70        .byte $70   ; <p>
- D 0 - I - 0x028E20 0A:8E10: CB        .byte $CB   ; 
- D 0 - I - 0x028E21 0A:8E11: 00        .byte $00   ; 
- D 0 - I - 0x028E22 0A:8E12: F1        .byte $F1   ; 
- D 0 - I - 0x028E23 0A:8E13: 4D        .byte $4D   ; <M>
- D 0 - I - 0x028E24 0A:8E14: 10        .byte $10   ; 
- D 0 - I - 0x028E25 0A:8E15: 28        .byte $28   ; 
- D 0 - I - 0x028E26 0A:8E16: C3        .byte $C3   ; 
- D 0 - I - 0x028E27 0A:8E17: 05        .byte $05   ; 
- D 0 - I - 0x028E28 0A:8E18: F8        .byte $F8   ; 
- D 0 - I - 0x028E29 0A:8E19: A7        .byte $A7   ; 
- D 0 - I - 0x028E2A 0A:8E1A: 8B        .byte $8B   ; 
- D 0 - I - 0x028E2B 0A:8E1B: F5        .byte $F5   ; 
- D 0 - I - 0x028E2C 0A:8E1C: 83        .byte $83   ; 
- D 0 - I - 0x028E2D 0A:8E1D: F4        .byte $F4   ; 
- D 0 - I - 0x028E2E 0A:8E1E: 18        .byte $18   ; 
- D 0 - I - 0x028E2F 0A:8E1F: 19        .byte $19   ; 
- D 0 - I - 0x028E30 0A:8E20: 1A        .byte $1A   ; 
- D 0 - I - 0x028E31 0A:8E21: 2B        .byte $2B   ; 
- D 0 - I - 0x028E32 0A:8E22: F7        .byte $F7   ; 
- D 0 - I - 0x028E33 0A:8E23: 03        .byte $03   ; 
- D 0 - I - 0x028E34 0A:8E24: 7B        .byte $7B   ; 
- D 0 - I - 0x028E35 0A:8E25: F1        .byte $F1   ; 
- D 0 - I - 0x028E36 0A:8E26: 00        .byte $00   ; 
- D 0 - I - 0x028E37 0A:8E27: 00        .byte $00   ; 
- D 0 - I - 0x028E38 0A:8E28: 80        .byte $80   ; 
- D 0 - I - 0x028E39 0A:8E29: FB        .byte $FB   ; 
- D 0 - I - 0x028E3A 0A:8E2A: 00        .byte $00   ; 
- D 0 - I - 0x028E3B 0A:8E2B: F1        .byte $F1   ; 
- D 0 - I - 0x028E3C 0A:8E2C: E8        .byte $E8   ; 
- D 0 - I - 0x028E3D 0A:8E2D: 05        .byte $05   ; 
- D 0 - I - 0x028E3E 0A:8E2E: F8        .byte $F8   ; 
- D 0 - I - 0x028E3F 0A:8E2F: C3        .byte $C3   ; 
- D 0 - I - 0x028E40 0A:8E30: 04        .byte $04   ; 
- D 0 - I - 0x028E41 0A:8E31: F0        .byte $F0   ; 
- D 0 - I - 0x028E42 0A:8E32: F5        .byte $F5   ; 
- D 0 - I - 0x028E43 0A:8E33: 83        .byte $83   ; 
- D 0 - I - 0x028E44 0A:8E34: F4        .byte $F4   ; 
- D 0 - I - 0x028E45 0A:8E35: 18        .byte $18   ; 
- D 0 - I - 0x028E46 0A:8E36: 19        .byte $19   ; 
- D 0 - I - 0x028E47 0A:8E37: 1A        .byte $1A   ; 
- D 0 - I - 0x028E48 0A:8E38: 1B        .byte $1B   ; 
- D 0 - I - 0x028E49 0A:8E39: F7        .byte $F7   ; 
- D 0 - I - 0x028E4A 0A:8E3A: 03        .byte $03   ; 
- D 0 - I - 0x028E4B 0A:8E3B: 7B        .byte $7B   ; 
- D 0 - I - 0x028E4C 0A:8E3C: F1        .byte $F1   ; 
- D 0 - I - 0x028E4D 0A:8E3D: 00        .byte $00   ; 
- D 0 - I - 0x028E4E 0A:8E3E: 00        .byte $00   ; 
- D 0 - I - 0x028E4F 0A:8E3F: 80        .byte $80   ; 
- D 0 - I - 0x028E50 0A:8E40: FB        .byte $FB   ; 
- D 0 - I - 0x028E51 0A:8E41: 00        .byte $00   ; 
- D 0 - I - 0x028E52 0A:8E42: F1        .byte $F1   ; 
- D 0 - I - 0x028E53 0A:8E43: 14        .byte $14   ; 
- D 0 - I - 0x028E54 0A:8E44: 15        .byte $15   ; 
- D 0 - I - 0x028E55 0A:8E45: 56        .byte $56   ; <V>
- D 0 - I - 0x028E56 0A:8E46: 7C        .byte $7C   ; 
- D 0 - I - 0x028E57 0A:8E47: 04        .byte $04   ; 
- D 0 - I - 0x028E58 0A:8E48: F1        .byte $F1   ; 
- D 0 - I - 0x028E59 0A:8E49: 4A        .byte $4A   ; <J>
- D 0 - I - 0x028E5A 0A:8E4A: 80        .byte $80   ; 
- D 0 - I - 0x028E5B 0A:8E4B: E8        .byte $E8   ; 
- D 0 - I - 0x028E5C 0A:8E4C: BB        .byte $BB   ; 
- D 0 - I - 0x028E5D 0A:8E4D: 08        .byte $08   ; 
- D 0 - I - 0x028E5E 0A:8E4E: 01        .byte $01   ; 
- D 0 - I - 0x028E5F 0A:8E4F: FB        .byte $FB   ; 
- D 0 - I - 0x028E60 0A:8E50: 01        .byte $01   ; 
- D 0 - I - 0x028E61 0A:8E51: 23        .byte $23   ; 
- D 0 - I - 0x028E62 0A:8E52: 45        .byte $45   ; <E>
- D 0 - I - 0x028E63 0A:8E53: 01        .byte $01   ; 
- D 0 - I - 0x028E64 0A:8E54: FB        .byte $FB   ; 
- D 0 - I - 0x028E65 0A:8E55: 02        .byte $02   ; 
- D 0 - I - 0x028E66 0A:8E56: 13        .byte $13   ; 
- D 0 - I - 0x028E67 0A:8E57: 45        .byte $45   ; <E>
- D 0 - I - 0x028E68 0A:8E58: F8        .byte $F8   ; 
- D 0 - I - 0x028E69 0A:8E59: 4E        .byte $4E   ; <N>
- D 0 - I - 0x028E6A 0A:8E5A: 8E        .byte $8E   ; 
- D 0 - I - 0x028E6B 0A:8E5B: F5        .byte $F5   ; 
- D 0 - I - 0x028E6C 0A:8E5C: 83        .byte $83   ; 
- D 0 - I - 0x028E6D 0A:8E5D: F4        .byte $F4   ; 
- D 0 - I - 0x028E6E 0A:8E5E: 18        .byte $18   ; 
- D 0 - I - 0x028E6F 0A:8E5F: 19        .byte $19   ; 
- D 0 - I - 0x028E70 0A:8E60: 1A        .byte $1A   ; 
- D 0 - I - 0x028E71 0A:8E61: 1B        .byte $1B   ; 
- D 0 - I - 0x028E72 0A:8E62: F7        .byte $F7   ; 
- D 0 - I - 0x028E73 0A:8E63: 03        .byte $03   ; 
- D 0 - I - 0x028E74 0A:8E64: 7B        .byte $7B   ; 
- D 0 - I - 0x028E75 0A:8E65: F1        .byte $F1   ; 
- D 0 - I - 0x028E76 0A:8E66: 00        .byte $00   ; 
- D 0 - I - 0x028E77 0A:8E67: 00        .byte $00   ; 
- D 0 - I - 0x028E78 0A:8E68: 80        .byte $80   ; 
- D 0 - I - 0x028E79 0A:8E69: FB        .byte $FB   ; 
- D 0 - I - 0x028E7A 0A:8E6A: 00        .byte $00   ; 
- D 0 - I - 0x028E7B 0A:8E6B: F1        .byte $F1   ; 
- D 0 - I - 0x028E7C 0A:8E6C: 14        .byte $14   ; 
- D 0 - I - 0x028E7D 0A:8E6D: 15        .byte $15   ; 
- D 0 - I - 0x028E7E 0A:8E6E: 39        .byte $39   ; <9>
- D 0 - I - 0x028E7F 0A:8E6F: 7E        .byte $7E   ; 
- D 0 - I - 0x028E80 0A:8E70: 04        .byte $04   ; 
- D 0 - I - 0x028E81 0A:8E71: F1        .byte $F1   ; 
- D 0 - I - 0x028E82 0A:8E72: 13        .byte $13   ; 
- D 0 - I - 0x028E83 0A:8E73: 17        .byte $17   ; 
- D 0 - I - 0x028E84 0A:8E74: 04        .byte $04   ; 
- D 0 - I - 0x028E85 0A:8E75: BB        .byte $BB   ; 
- D 0 - I - 0x028E86 0A:8E76: 09        .byte $09   ; 
- D 0 - I - 0x028E87 0A:8E77: F8        .byte $F8   ; 
- D 0 - I - 0x028E88 0A:8E78: 4E        .byte $4E   ; <N>
- D 0 - I - 0x028E89 0A:8E79: 8E        .byte $8E   ; 
- D 0 - I - 0x028E8A 0A:8E7A: F5        .byte $F5   ; 
- D 0 - I - 0x028E8B 0A:8E7B: 83        .byte $83   ; 
- D 0 - I - 0x028E8C 0A:8E7C: F4        .byte $F4   ; 
- D 0 - I - 0x028E8D 0A:8E7D: 2A        .byte $2A   ; 
- D 0 - I - 0x028E8E 0A:8E7E: 2B        .byte $2B   ; 
- D 0 - I - 0x028E8F 0A:8E7F: 00        .byte $00   ; 
- D 0 - I - 0x028E90 0A:8E80: 00        .byte $00   ; 
- D 0 - I - 0x028E91 0A:8E81: F1        .byte $F1   ; 
- D 0 - I - 0x028E92 0A:8E82: 16        .byte $16   ; 
- D 0 - I - 0x028E93 0A:8E83: 04        .byte $04   ; 
- D 0 - I - 0x028E94 0A:8E84: 90        .byte $90   ; 
- D 0 - I - 0x028E95 0A:8E85: 9B        .byte $9B   ; 
- D 0 - I - 0x028E96 0A:8E86: 00        .byte $00   ; 
- D 0 - I - 0x028E97 0A:8E87: F1        .byte $F1   ; 
- D 0 - I - 0x028E98 0A:8E88: 15        .byte $15   ; 
- D 0 - I - 0x028E99 0A:8E89: 03        .byte $03   ; 
- D 0 - I - 0x028E9A 0A:8E8A: F6        .byte $F6   ; 
- D 0 - I - 0x028E9B 0A:8E8B: D5        .byte $D5   ; 
- D 0 - I - 0x028E9C 0A:8E8C: 04        .byte $04   ; 
- D 0 - I - 0x028E9D 0A:8E8D: F0        .byte $F0   ; 
- D 0 - I - 0x028E9E 0A:8E8E: F5        .byte $F5   ; 
- D 0 - I - 0x028E9F 0A:8E8F: 83        .byte $83   ; 
- D 0 - I - 0x028EA0 0A:8E90: F4        .byte $F4   ; 
- D 0 - I - 0x028EA1 0A:8E91: 18        .byte $18   ; 
- D 0 - I - 0x028EA2 0A:8E92: 19        .byte $19   ; 
- D 0 - I - 0x028EA3 0A:8E93: 1A        .byte $1A   ; 
- D 0 - I - 0x028EA4 0A:8E94: 1B        .byte $1B   ; 
- D 0 - I - 0x028EA5 0A:8E95: F1        .byte $F1   ; 
- D 0 - I - 0x028EA6 0A:8E96: 17        .byte $17   ; 
- D 0 - I - 0x028EA7 0A:8E97: 15        .byte $15   ; 
- D 0 - I - 0x028EA8 0A:8E98: 39        .byte $39   ; <9>
- D 0 - I - 0x028EA9 0A:8E99: 7E        .byte $7E   ; 
- D 0 - I - 0x028EAA 0A:8E9A: 00        .byte $00   ; 
- D 0 - I - 0x028EAB 0A:8E9B: F1        .byte $F1   ; 
- D 0 - I - 0x028EAC 0A:8E9C: 52        .byte $52   ; <R>
- D 0 - I - 0x028EAD 0A:8E9D: 17        .byte $17   ; 
- D 0 - I - 0x028EAE 0A:8E9E: 02        .byte $02   ; 
- D 0 - I - 0x028EAF 0A:8E9F: BD        .byte $BD   ; 
- D 0 - I - 0x028EB0 0A:8EA0: 05        .byte $05   ; 
- D 0 - I - 0x028EB1 0A:8EA1: F9        .byte $F9   ; 
- D 0 - I - 0x028EB2 0A:8EA2: 0F        .byte $0F   ; 
- D 0 - I - 0x028EB3 0A:8EA3: 01        .byte $01   ; 
- D 0 - I - 0x028EB4 0A:8EA4: FB        .byte $FB   ; 
- D 0 - I - 0x028EB5 0A:8EA5: 10        .byte $10   ; 
- D 0 - I - 0x028EB6 0A:8EA6: 23        .byte $23   ; 
- D 0 - I - 0x028EB7 0A:8EA7: 45        .byte $45   ; <E>
- D 0 - I - 0x028EB8 0A:8EA8: 01        .byte $01   ; 
- D 0 - I - 0x028EB9 0A:8EA9: FB        .byte $FB   ; 
- D 0 - I - 0x028EBA 0A:8EAA: 01        .byte $01   ; 
- D 0 - I - 0x028EBB 0A:8EAB: 23        .byte $23   ; 
- D 0 - I - 0x028EBC 0A:8EAC: 45        .byte $45   ; <E>
- D 0 - I - 0x028EBD 0A:8EAD: FA        .byte $FA   ; 
- D 0 - I - 0x028EBE 0A:8EAE: F6        .byte $F6   ; 
- D 0 - I - 0x028EBF 0A:8EAF: 00        .byte $00   ; 
- D 0 - I - 0x028EC0 0A:8EB0: F1        .byte $F1   ; 
- D 0 - I - 0x028EC1 0A:8EB1: 00        .byte $00   ; 
- D 0 - I - 0x028EC2 0A:8EB2: CE        .byte $CE   ; 
- D 0 - I - 0x028EC3 0A:8EB3: F4        .byte $F4   ; 
- D 0 - I - 0x028EC4 0A:8EB4: C3        .byte $C3   ; 
- D 0 - I - 0x028EC5 0A:8EB5: 04        .byte $04   ; 
- D 0 - I - 0x028EC6 0A:8EB6: 04        .byte $04   ; 
- D 0 - I - 0x028EC7 0A:8EB7: F1        .byte $F1   ; 
- D 0 - I - 0x028EC8 0A:8EB8: 1B        .byte $1B   ; 
- D 0 - I - 0x028EC9 0A:8EB9: 15        .byte $15   ; 
- D 0 - I - 0x028ECA 0A:8EBA: E6        .byte $E6   ; 
- D 0 - I - 0x028ECB 0A:8EBB: DD        .byte $DD   ; 
- D 0 - I - 0x028ECC 0A:8EBC: 00        .byte $00   ; 
- D 0 - I - 0x028ECD 0A:8EBD: F1        .byte $F1   ; 
- D 0 - I - 0x028ECE 0A:8EBE: 53        .byte $53   ; <S>
- D 0 - I - 0x028ECF 0A:8EBF: 17        .byte $17   ; 
- D 0 - I - 0x028ED0 0A:8EC0: F4        .byte $F4   ; 
- D 0 - I - 0x028ED1 0A:8EC1: C3        .byte $C3   ; 
- D 0 - I - 0x028ED2 0A:8EC2: 04        .byte $04   ; 
- D 0 - I - 0x028ED3 0A:8EC3: F8        .byte $F8   ; 
- D 0 - I - 0x028ED4 0A:8EC4: A7        .byte $A7   ; 
- D 0 - I - 0x028ED5 0A:8EC5: 8B        .byte $8B   ; 
- D 0 - I - 0x028ED6 0A:8EC6: F5        .byte $F5   ; 
- D 0 - I - 0x028ED7 0A:8EC7: 09        .byte $09   ; 
- D 0 - I - 0x028ED8 0A:8EC8: F4        .byte $F4   ; 
- D 0 - I - 0x028ED9 0A:8EC9: 04        .byte $04   ; 
- D 0 - I - 0x028EDA 0A:8ECA: 05        .byte $05   ; 
- D 0 - I - 0x028EDB 0A:8ECB: 00        .byte $00   ; 
- D 0 - I - 0x028EDC 0A:8ECC: 00        .byte $00   ; 
- D 0 - I - 0x028EDD 0A:8ECD: F7        .byte $F7   ; 
- D 0 - I - 0x028EDE 0A:8ECE: 03        .byte $03   ; 
- D 0 - I - 0x028EDF 0A:8ECF: 73        .byte $73   ; <s>
- D 0 - I - 0x028EE0 0A:8ED0: F1        .byte $F1   ; 
- D 0 - I - 0x028EE1 0A:8ED1: 75        .byte $75   ; <u>
- D 0 - I - 0x028EE2 0A:8ED2: 71        .byte $71   ; <q>
- D 0 - I - 0x028EE3 0A:8ED3: 00        .byte $00   ; 
- D 0 - I - 0x028EE4 0A:8ED4: C3        .byte $C3   ; 
- D 0 - I - 0x028EE5 0A:8ED5: 01        .byte $01   ; 
- D 0 - I - 0x028EE6 0A:8ED6: 0A        .byte $0A   ; 
- D 0 - I - 0x028EE7 0A:8ED7: F1        .byte $F1   ; 
- D 0 - I - 0x028EE8 0A:8ED8: D9        .byte $D9   ; 
- D 0 - I - 0x028EE9 0A:8ED9: 71        .byte $71   ; <q>
- D 0 - I - 0x028EEA 0A:8EDA: 00        .byte $00   ; 
- D 0 - I - 0x028EEB 0A:8EDB: C3        .byte $C3   ; 
- D 0 - I - 0x028EEC 0A:8EDC: 05        .byte $05   ; 
- D 0 - I - 0x028EED 0A:8EDD: 0A        .byte $0A   ; 
- D 0 - I - 0x028EEE 0A:8EDE: F1        .byte $F1   ; 
- D 0 - I - 0x028EEF 0A:8EDF: 00        .byte $00   ; 
- D 0 - I - 0x028EF0 0A:8EE0: 71        .byte $71   ; <q>
- D 0 - I - 0x028EF1 0A:8EE1: 00        .byte $00   ; 
- D 0 - I - 0x028EF2 0A:8EE2: C3        .byte $C3   ; 
- D 0 - I - 0x028EF3 0A:8EE3: 09        .byte $09   ; 
- D 0 - I - 0x028EF4 0A:8EE4: F0        .byte $F0   ; 
- D 0 - I - 0x028EF5 0A:8EE5: F5        .byte $F5   ; 
- D 0 - I - 0x028EF6 0A:8EE6: 09        .byte $09   ; 
- D 0 - I - 0x028EF7 0A:8EE7: F4        .byte $F4   ; 
- D 0 - I - 0x028EF8 0A:8EE8: 04        .byte $04   ; 
- D 0 - I - 0x028EF9 0A:8EE9: 05        .byte $05   ; 
- D 0 - I - 0x028EFA 0A:8EEA: 00        .byte $00   ; 
- D 0 - I - 0x028EFB 0A:8EEB: 00        .byte $00   ; 
- D 0 - I - 0x028EFC 0A:8EEC: F1        .byte $F1   ; 
- D 0 - I - 0x028EFD 0A:8EED: 87        .byte $87   ; 
- D 0 - I - 0x028EFE 0A:8EEE: 71        .byte $71   ; <q>
- D 0 - I - 0x028EFF 0A:8EEF: 00        .byte $00   ; 
- D 0 - I - 0x028F00 0A:8EF0: EB        .byte $EB   ; 
- D 0 - I - 0x028F01 0A:8EF1: 01        .byte $01   ; 
- D 0 - I - 0x028F02 0A:8EF2: F0        .byte $F0   ; 
- D 0 - I - 0x028F03 0A:8EF3: F5        .byte $F5   ; 
- D 0 - I - 0x028F04 0A:8EF4: 83        .byte $83   ; 
- D 0 - I - 0x028F05 0A:8EF5: F4        .byte $F4   ; 
- D 0 - I - 0x028F06 0A:8EF6: 18        .byte $18   ; 
- D 0 - I - 0x028F07 0A:8EF7: 19        .byte $19   ; 
- D 0 - I - 0x028F08 0A:8EF8: 1A        .byte $1A   ; 
- D 0 - I - 0x028F09 0A:8EF9: 1B        .byte $1B   ; 
- D 0 - I - 0x028F0A 0A:8EFA: F1        .byte $F1   ; 
- D 0 - I - 0x028F0B 0A:8EFB: 17        .byte $17   ; 
- D 0 - I - 0x028F0C 0A:8EFC: 15        .byte $15   ; 
- D 0 - I - 0x028F0D 0A:8EFD: 56        .byte $56   ; <V>
- D 0 - I - 0x028F0E 0A:8EFE: 7C        .byte $7C   ; 
- D 0 - I - 0x028F0F 0A:8EFF: 00        .byte $00   ; 
- D 0 - I - 0x028F10 0A:8F00: F1        .byte $F1   ; 
- D 0 - I - 0x028F11 0A:8F01: 08        .byte $08   ; 
- D 0 - I - 0x028F12 0A:8F02: 80        .byte $80   ; 
- D 0 - I - 0x028F13 0A:8F03: E6        .byte $E6   ; 
- D 0 - I - 0x028F14 0A:8F04: BC        .byte $BC   ; 
- D 0 - I - 0x028F15 0A:8F05: 04        .byte $04   ; 
- D 0 - I - 0x028F16 0A:8F06: F9        .byte $F9   ; 
- D 0 - I - 0x028F17 0A:8F07: 0F        .byte $0F   ; 
- D 0 - I - 0x028F18 0A:8F08: 01        .byte $01   ; 
- D 0 - I - 0x028F19 0A:8F09: FB        .byte $FB   ; 
- D 0 - I - 0x028F1A 0A:8F0A: 10        .byte $10   ; 
- D 0 - I - 0x028F1B 0A:8F0B: 23        .byte $23   ; 
- D 0 - I - 0x028F1C 0A:8F0C: 45        .byte $45   ; <E>
- D 0 - I - 0x028F1D 0A:8F0D: 01        .byte $01   ; 
- D 0 - I - 0x028F1E 0A:8F0E: FB        .byte $FB   ; 
- D 0 - I - 0x028F1F 0A:8F0F: 01        .byte $01   ; 
- D 0 - I - 0x028F20 0A:8F10: 23        .byte $23   ; 
- D 0 - I - 0x028F21 0A:8F11: 45        .byte $45   ; <E>
- D 0 - I - 0x028F22 0A:8F12: FA        .byte $FA   ; 
- D 0 - I - 0x028F23 0A:8F13: F6        .byte $F6   ; 
- D 0 - I - 0x028F24 0A:8F14: 00        .byte $00   ; 
- D 0 - I - 0x028F25 0A:8F15: F1        .byte $F1   ; 
- D 0 - I - 0x028F26 0A:8F16: 00        .byte $00   ; 
- D 0 - I - 0x028F27 0A:8F17: 7F        .byte $7F   ; 
- D 0 - I - 0x028F28 0A:8F18: F8        .byte $F8   ; 
- D 0 - I - 0x028F29 0A:8F19: C3        .byte $C3   ; 
- D 0 - I - 0x028F2A 0A:8F1A: 04        .byte $04   ; 
- D 0 - I - 0x028F2B 0A:8F1B: 04        .byte $04   ; 
- D 0 - I - 0x028F2C 0A:8F1C: F1        .byte $F1   ; 
- D 0 - I - 0x028F2D 0A:8F1D: 1B        .byte $1B   ; 
- D 0 - I - 0x028F2E 0A:8F1E: 15        .byte $15   ; 
- D 0 - I - 0x028F2F 0A:8F1F: 06        .byte $06   ; 
- D 0 - I - 0x028F30 0A:8F20: DD        .byte $DD   ; 
- D 0 - I - 0x028F31 0A:8F21: 01        .byte $01   ; 
- D 0 - I - 0x028F32 0A:8F22: F1        .byte $F1   ; 
- D 0 - I - 0x028F33 0A:8F23: 1C        .byte $1C   ; 
- D 0 - I - 0x028F34 0A:8F24: 80        .byte $80   ; 
- D 0 - I - 0x028F35 0A:8F25: F8        .byte $F8   ; 
- D 0 - I - 0x028F36 0A:8F26: C3        .byte $C3   ; 
- D 0 - I - 0x028F37 0A:8F27: 04        .byte $04   ; 
- D 0 - I - 0x028F38 0A:8F28: F0        .byte $F0   ; 
- D 0 - I - 0x028F39 0A:8F29: F5        .byte $F5   ; 
- D 0 - I - 0x028F3A 0A:8F2A: 83        .byte $83   ; 
- D 0 - I - 0x028F3B 0A:8F2B: F4        .byte $F4   ; 
- D 0 - I - 0x028F3C 0A:8F2C: 2A        .byte $2A   ; 
- D 0 - I - 0x028F3D 0A:8F2D: 2B        .byte $2B   ; 
- D 0 - I - 0x028F3E 0A:8F2E: 00        .byte $00   ; 
- D 0 - I - 0x028F3F 0A:8F2F: 00        .byte $00   ; 
- D 0 - I - 0x028F40 0A:8F30: F1        .byte $F1   ; 
- D 0 - I - 0x028F41 0A:8F31: 19        .byte $19   ; 
- D 0 - I - 0x028F42 0A:8F32: 04        .byte $04   ; 
- D 0 - I - 0x028F43 0A:8F33: 90        .byte $90   ; 
- D 0 - I - 0x028F44 0A:8F34: 9B        .byte $9B   ; 
- D 0 - I - 0x028F45 0A:8F35: 00        .byte $00   ; 
- D 0 - I - 0x028F46 0A:8F36: F1        .byte $F1   ; 
- D 0 - I - 0x028F47 0A:8F37: 18        .byte $18   ; 
- D 0 - I - 0x028F48 0A:8F38: 03        .byte $03   ; 
- D 0 - I - 0x028F49 0A:8F39: FA        .byte $FA   ; 
- D 0 - I - 0x028F4A 0A:8F3A: D0        .byte $D0   ; 
- D 0 - I - 0x028F4B 0A:8F3B: 04        .byte $04   ; 
- D 0 - I - 0x028F4C 0A:8F3C: 1E        .byte $1E   ; 
- D 0 - I - 0x028F4D 0A:8F3D: F6        .byte $F6   ; 
- D 0 - I - 0x028F4E 0A:8F3E: 00        .byte $00   ; 
- D 0 - I - 0x028F4F 0A:8F3F: F1        .byte $F1   ; 
- D 0 - I - 0x028F50 0A:8F40: 00        .byte $00   ; 
- D 0 - I - 0x028F51 0A:8F41: 3E        .byte $3E   ; 
- D 0 - I - 0x028F52 0A:8F42: 00        .byte $00   ; 
- D 0 - I - 0x028F53 0A:8F43: CB        .byte $CB   ; 
- D 0 - I - 0x028F54 0A:8F44: 05        .byte $05   ; 
- D 0 - I - 0x028F55 0A:8F45: 04        .byte $04   ; 
- D 0 - I - 0x028F56 0A:8F46: F1        .byte $F1   ; 
- D 0 - I - 0x028F57 0A:8F47: 1D        .byte $1D   ; 
- D 0 - I - 0x028F58 0A:8F48: 04        .byte $04   ; 
- D 0 - I - 0x028F59 0A:8F49: 1C        .byte $1C   ; 
- D 0 - I - 0x028F5A 0A:8F4A: AB        .byte $AB   ; 
- D 0 - I - 0x028F5B 0A:8F4B: 01        .byte $01   ; 
- D 0 - I - 0x028F5C 0A:8F4C: F1        .byte $F1   ; 
- D 0 - I - 0x028F5D 0A:8F4D: 18        .byte $18   ; 
- D 0 - I - 0x028F5E 0A:8F4E: 03        .byte $03   ; 
- D 0 - I - 0x028F5F 0A:8F4F: 00        .byte $00   ; 
- D 0 - I - 0x028F60 0A:8F50: CB        .byte $CB   ; 
- D 0 - I - 0x028F61 0A:8F51: 05        .byte $05   ; 
- D 0 - I - 0x028F62 0A:8F52: F0        .byte $F0   ; 
- D 0 - I - 0x028F63 0A:8F53: F5        .byte $F5   ; 
- D 0 - I - 0x028F64 0A:8F54: 83        .byte $83   ; 
- D 0 - I - 0x028F65 0A:8F55: F4        .byte $F4   ; 
- D 0 - I - 0x028F66 0A:8F56: 18        .byte $18   ; 
- D 0 - I - 0x028F67 0A:8F57: 19        .byte $19   ; 
- D 0 - I - 0x028F68 0A:8F58: 1A        .byte $1A   ; 
- D 0 - I - 0x028F69 0A:8F59: 1B        .byte $1B   ; 
- D 0 - I - 0x028F6A 0A:8F5A: F1        .byte $F1   ; 
- D 0 - I - 0x028F6B 0A:8F5B: 17        .byte $17   ; 
- D 0 - I - 0x028F6C 0A:8F5C: 15        .byte $15   ; 
- D 0 - I - 0x028F6D 0A:8F5D: 56        .byte $56   ; <V>
- D 0 - I - 0x028F6E 0A:8F5E: 7C        .byte $7C   ; 
- D 0 - I - 0x028F6F 0A:8F5F: 00        .byte $00   ; 
- D 0 - I - 0x028F70 0A:8F60: F1        .byte $F1   ; 
- D 0 - I - 0x028F71 0A:8F61: 08        .byte $08   ; 
- D 0 - I - 0x028F72 0A:8F62: 80        .byte $80   ; 
- D 0 - I - 0x028F73 0A:8F63: E6        .byte $E6   ; 
- D 0 - I - 0x028F74 0A:8F64: BC        .byte $BC   ; 
- D 0 - I - 0x028F75 0A:8F65: 04        .byte $04   ; 
- D 0 - I - 0x028F76 0A:8F66: F9        .byte $F9   ; 
- D 0 - I - 0x028F77 0A:8F67: 0F        .byte $0F   ; 
- D 0 - I - 0x028F78 0A:8F68: 01        .byte $01   ; 
- D 0 - I - 0x028F79 0A:8F69: FB        .byte $FB   ; 
- D 0 - I - 0x028F7A 0A:8F6A: 10        .byte $10   ; 
- D 0 - I - 0x028F7B 0A:8F6B: 23        .byte $23   ; 
- D 0 - I - 0x028F7C 0A:8F6C: 45        .byte $45   ; <E>
- D 0 - I - 0x028F7D 0A:8F6D: 01        .byte $01   ; 
- D 0 - I - 0x028F7E 0A:8F6E: FB        .byte $FB   ; 
- D 0 - I - 0x028F7F 0A:8F6F: 01        .byte $01   ; 
- D 0 - I - 0x028F80 0A:8F70: 23        .byte $23   ; 
- D 0 - I - 0x028F81 0A:8F71: 45        .byte $45   ; <E>
- D 0 - I - 0x028F82 0A:8F72: FA        .byte $FA   ; 
- D 0 - I - 0x028F83 0A:8F73: F6        .byte $F6   ; 
- D 0 - I - 0x028F84 0A:8F74: 00        .byte $00   ; 
- D 0 - I - 0x028F85 0A:8F75: F1        .byte $F1   ; 
- D 0 - I - 0x028F86 0A:8F76: 00        .byte $00   ; 
- D 0 - I - 0x028F87 0A:8F77: 7F        .byte $7F   ; 
- D 0 - I - 0x028F88 0A:8F78: F8        .byte $F8   ; 
- D 0 - I - 0x028F89 0A:8F79: C3        .byte $C3   ; 
- D 0 - I - 0x028F8A 0A:8F7A: 04        .byte $04   ; 
- D 0 - I - 0x028F8B 0A:8F7B: F0        .byte $F0   ; 
- D 0 - I - 0x028F8C 0A:8F7C: F5        .byte $F5   ; 
- D 0 - I - 0x028F8D 0A:8F7D: 83        .byte $83   ; 
- D 0 - I - 0x028F8E 0A:8F7E: F4        .byte $F4   ; 
- D 0 - I - 0x028F8F 0A:8F7F: 2A        .byte $2A   ; 
- D 0 - I - 0x028F90 0A:8F80: 2B        .byte $2B   ; 
- D 0 - I - 0x028F91 0A:8F81: 00        .byte $00   ; 
- D 0 - I - 0x028F92 0A:8F82: 00        .byte $00   ; 
- D 0 - I - 0x028F93 0A:8F83: F1        .byte $F1   ; 
- D 0 - I - 0x028F94 0A:8F84: 19        .byte $19   ; 
- D 0 - I - 0x028F95 0A:8F85: 04        .byte $04   ; 
- D 0 - I - 0x028F96 0A:8F86: 90        .byte $90   ; 
- D 0 - I - 0x028F97 0A:8F87: 9B        .byte $9B   ; 
- D 0 - I - 0x028F98 0A:8F88: 00        .byte $00   ; 
- D 0 - I - 0x028F99 0A:8F89: F1        .byte $F1   ; 
- D 0 - I - 0x028F9A 0A:8F8A: 18        .byte $18   ; 
- D 0 - I - 0x028F9B 0A:8F8B: 03        .byte $03   ; 
- D 0 - I - 0x028F9C 0A:8F8C: FA        .byte $FA   ; 
- D 0 - I - 0x028F9D 0A:8F8D: D0        .byte $D0   ; 
- D 0 - I - 0x028F9E 0A:8F8E: 04        .byte $04   ; 
- D 0 - I - 0x028F9F 0A:8F8F: 1E        .byte $1E   ; 
- D 0 - I - 0x028FA0 0A:8F90: F6        .byte $F6   ; 
- D 0 - I - 0x028FA1 0A:8F91: 00        .byte $00   ; 
- D 0 - I - 0x028FA2 0A:8F92: F1        .byte $F1   ; 
- D 0 - I - 0x028FA3 0A:8F93: 00        .byte $00   ; 
- D 0 - I - 0x028FA4 0A:8F94: 3E        .byte $3E   ; 
- D 0 - I - 0x028FA5 0A:8F95: 00        .byte $00   ; 
- D 0 - I - 0x028FA6 0A:8F96: CB        .byte $CB   ; 
- D 0 - I - 0x028FA7 0A:8F97: 05        .byte $05   ; 
- D 0 - I - 0x028FA8 0A:8F98: F0        .byte $F0   ; 
- D 0 - I - 0x028FA9 0A:8F99: F5        .byte $F5   ; 
- D 0 - I - 0x028FAA 0A:8F9A: 81        .byte $81   ; 
- D 0 - I - 0x028FAB 0A:8F9B: F4        .byte $F4   ; 
- D 0 - I - 0x028FAC 0A:8F9C: 24        .byte $24   ; 
- D 0 - I - 0x028FAD 0A:8F9D: 25        .byte $25   ; 
- D 0 - I - 0x028FAE 0A:8F9E: 26        .byte $26   ; 
- D 0 - I - 0x028FAF 0A:8F9F: 4F        .byte $4F   ; <O>
- D 0 - I - 0x028FB0 0A:8FA0: F1        .byte $F1   ; 
- D 0 - I - 0x028FB1 0A:8FA1: 9C        .byte $9C   ; 
- D 0 - I - 0x028FB2 0A:8FA2: 38        .byte $38   ; <8>
- D 0 - I - 0x028FB3 0A:8FA3: 08        .byte $08   ; 
- D 0 - I - 0x028FB4 0A:8FA4: BB        .byte $BB   ; 
- D 0 - I - 0x028FB5 0A:8FA5: 01        .byte $01   ; 
- D 0 - I - 0x028FB6 0A:8FA6: F0        .byte $F0   ; 
- D 0 - I - 0x028FB7 0A:8FA7: F5        .byte $F5   ; 
- D 0 - I - 0x028FB8 0A:8FA8: 09        .byte $09   ; 
- D 0 - I - 0x028FB9 0A:8FA9: F4        .byte $F4   ; 
- D 0 - I - 0x028FBA 0A:8FAA: 04        .byte $04   ; 
- D 0 - I - 0x028FBB 0A:8FAB: 05        .byte $05   ; 
- D 0 - I - 0x028FBC 0A:8FAC: 00        .byte $00   ; 
- D 0 - I - 0x028FBD 0A:8FAD: 00        .byte $00   ; 
- D 0 - I - 0x028FBE 0A:8FAE: F7        .byte $F7   ; 
- D 0 - I - 0x028FBF 0A:8FAF: 03        .byte $03   ; 
- D 0 - I - 0x028FC0 0A:8FB0: 7B        .byte $7B   ; 
- D 0 - I - 0x028FC1 0A:8FB1: F1        .byte $F1   ; 
- D 0 - I - 0x028FC2 0A:8FB2: 00        .byte $00   ; 
- D 0 - I - 0x028FC3 0A:8FB3: 00        .byte $00   ; 
- D 0 - I - 0x028FC4 0A:8FB4: 80        .byte $80   ; 
- D 0 - I - 0x028FC5 0A:8FB5: FB        .byte $FB   ; 
- D 0 - I - 0x028FC6 0A:8FB6: 00        .byte $00   ; 
- D 0 - I - 0x028FC7 0A:8FB7: F1        .byte $F1   ; 
- D 0 - I - 0x028FC8 0A:8FB8: 88        .byte $88   ; 
- D 0 - I - 0x028FC9 0A:8FB9: 71        .byte $71   ; <q>
- D 0 - I - 0x028FCA 0A:8FBA: D0        .byte $D0   ; 
- D 0 - I - 0x028FCB 0A:8FBB: C3        .byte $C3   ; 
- D 0 - I - 0x028FCC 0A:8FBC: 04        .byte $04   ; 
- D 0 - I - 0x028FCD 0A:8FBD: F0        .byte $F0   ; 
- D 0 - I - 0x028FCE 0A:8FBE: F5        .byte $F5   ; 
- D 0 - I - 0x028FCF 0A:8FBF: 81        .byte $81   ; 
- D 0 - I - 0x028FD0 0A:8FC0: F4        .byte $F4   ; 
- D 0 - I - 0x028FD1 0A:8FC1: 24        .byte $24   ; 
- D 0 - I - 0x028FD2 0A:8FC2: 25        .byte $25   ; 
- D 0 - I - 0x028FD3 0A:8FC3: 26        .byte $26   ; 
- D 0 - I - 0x028FD4 0A:8FC4: 4F        .byte $4F   ; <O>
- D 0 - I - 0x028FD5 0A:8FC5: F1        .byte $F1   ; 
- D 0 - I - 0x028FD6 0A:8FC6: 1F        .byte $1F   ; 
- D 0 - I - 0x028FD7 0A:8FC7: 3A        .byte $3A   ; 
- D 0 - I - 0x028FD8 0A:8FC8: 08        .byte $08   ; 
- D 0 - I - 0x028FD9 0A:8FC9: BB        .byte $BB   ; 
- D 0 - I - 0x028FDA 0A:8FCA: 01        .byte $01   ; 
- D 0 - I - 0x028FDB 0A:8FCB: F0        .byte $F0   ; 
- D 0 - I - 0x028FDC 0A:8FCC: F5        .byte $F5   ; 
- D 0 - I - 0x028FDD 0A:8FCD: 81        .byte $81   ; 
- D 0 - I - 0x028FDE 0A:8FCE: F4        .byte $F4   ; 
- D 0 - I - 0x028FDF 0A:8FCF: 24        .byte $24   ; 
- D 0 - I - 0x028FE0 0A:8FD0: 25        .byte $25   ; 
- D 0 - I - 0x028FE1 0A:8FD1: 26        .byte $26   ; 
- D 0 - I - 0x028FE2 0A:8FD2: 4F        .byte $4F   ; <O>
- D 0 - I - 0x028FE3 0A:8FD3: F1        .byte $F1   ; 
- D 0 - I - 0x028FE4 0A:8FD4: 04        .byte $04   ; 
- D 0 - I - 0x028FE5 0A:8FD5: 0A        .byte $0A   ; 
- D 0 - I - 0x028FE6 0A:8FD6: 50        .byte $50   ; <P>
- D 0 - I - 0x028FE7 0A:8FD7: 03        .byte $03   ; 
- D 0 - I - 0x028FE8 0A:8FD8: 02        .byte $02   ; 
- D 0 - I - 0x028FE9 0A:8FD9: F1        .byte $F1   ; 
- D 0 - I - 0x028FEA 0A:8FDA: 03        .byte $03   ; 
- D 0 - I - 0x028FEB 0A:8FDB: 09        .byte $09   ; 
- D 0 - I - 0x028FEC 0A:8FDC: 10        .byte $10   ; 
- D 0 - I - 0x028FED 0A:8FDD: B3        .byte $B3   ; 
- D 0 - I - 0x028FEE 0A:8FDE: 05        .byte $05   ; 
- D 0 - I - 0x028FEF 0A:8FDF: F8        .byte $F8   ; 
- D 0 - I - 0x028FF0 0A:8FE0: A7        .byte $A7   ; 
- D 0 - I - 0x028FF1 0A:8FE1: 8B        .byte $8B   ; 
- D 0 - I - 0x028FF2 0A:8FE2: F5        .byte $F5   ; 
- D 0 - I - 0x028FF3 0A:8FE3: 09        .byte $09   ; 
- D 0 - I - 0x028FF4 0A:8FE4: F4        .byte $F4   ; 
- D 0 - I - 0x028FF5 0A:8FE5: 04        .byte $04   ; 
- D 0 - I - 0x028FF6 0A:8FE6: 05        .byte $05   ; 
- D 0 - I - 0x028FF7 0A:8FE7: 00        .byte $00   ; 
- D 0 - I - 0x028FF8 0A:8FE8: 00        .byte $00   ; 
- D 0 - I - 0x028FF9 0A:8FE9: F7        .byte $F7   ; 
- D 0 - I - 0x028FFA 0A:8FEA: 03        .byte $03   ; 
- D 0 - I - 0x028FFB 0A:8FEB: 7B        .byte $7B   ; 
- D 0 - I - 0x028FFC 0A:8FEC: F1        .byte $F1   ; 
- D 0 - I - 0x028FFD 0A:8FED: 89        .byte $89   ; 
- D 0 - I - 0x028FFE 0A:8FEE: 23        .byte $23   ; 
- D 0 - I - 0x028FFF 0A:8FEF: C0        .byte $C0   ; 
- D 0 - I - 0x029000 0A:8FF0: 7B        .byte $7B   ; 
- D 0 - I - 0x029001 0A:8FF1: 04        .byte $04   ; 
- D 0 - I - 0x029002 0A:8FF2: F1        .byte $F1   ; 
- D 0 - I - 0x029003 0A:8FF3: 00        .byte $00   ; 
- D 0 - I - 0x029004 0A:8FF4: 00        .byte $00   ; 
- D 0 - I - 0x029005 0A:8FF5: 80        .byte $80   ; 
- D 0 - I - 0x029006 0A:8FF6: FB        .byte $FB   ; 
- D 0 - I - 0x029007 0A:8FF7: 00        .byte $00   ; 
- D 0 - I - 0x029008 0A:8FF8: F0        .byte $F0   ; 
- D 0 - I - 0x029009 0A:8FF9: F5        .byte $F5   ; 
- D 0 - I - 0x02900A 0A:8FFA: 81        .byte $81   ; 
- D 0 - I - 0x02900B 0A:8FFB: F4        .byte $F4   ; 
- D 0 - I - 0x02900C 0A:8FFC: 08        .byte $08   ; 
- D 0 - I - 0x02900D 0A:8FFD: 09        .byte $09   ; 
- D 0 - I - 0x02900E 0A:8FFE: 0A        .byte $0A   ; 
- D 0 - I - 0x02900F 0A:8FFF: 0B        .byte $0B   ; 
- D 0 - I - 0x029010 0A:9000: F1        .byte $F1   ; 
- D 0 - I - 0x029011 0A:9001: 21        .byte $21   ; 
- D 0 - I - 0x029012 0A:9002: 49        .byte $49   ; <I>
- D 0 - I - 0x029013 0A:9003: 80        .byte $80   ; 
- D 0 - I - 0x029014 0A:9004: 8F        .byte $8F   ; 
- D 0 - I - 0x029015 0A:9005: 00        .byte $00   ; 
- D 0 - I - 0x029016 0A:9006: F1        .byte $F1   ; 
- D 0 - I - 0x029017 0A:9007: 20        .byte $20   ; 
- D 0 - I - 0x029018 0A:9008: 59        .byte $59   ; <Y>
- D 0 - I - 0x029019 0A:9009: 98        .byte $98   ; 
- D 0 - I - 0x02901A 0A:900A: BB        .byte $BB   ; 
- D 0 - I - 0x02901B 0A:900B: 04        .byte $04   ; 
- D 0 - I - 0x02901C 0A:900C: F1        .byte $F1   ; 
- D 0 - I - 0x02901D 0A:900D: 20        .byte $20   ; 
- D 0 - I - 0x02901E 0A:900E: 5A        .byte $5A   ; <Z>
- D 0 - I - 0x02901F 0A:900F: 98        .byte $98   ; 
- D 0 - I - 0x029020 0A:9010: BB        .byte $BB   ; 
- D 0 - I - 0x029021 0A:9011: 08        .byte $08   ; 
- D 0 - I - 0x029022 0A:9012: F1        .byte $F1   ; 
- D 0 - I - 0x029023 0A:9013: 20        .byte $20   ; 
- D 0 - I - 0x029024 0A:9014: 5B        .byte $5B   ; 
- D 0 - I - 0x029025 0A:9015: 98        .byte $98   ; 
- D 0 - I - 0x029026 0A:9016: BB        .byte $BB   ; 
- D 0 - I - 0x029027 0A:9017: 0C        .byte $0C   ; 
- D 0 - I - 0x029028 0A:9018: 2A        .byte $2A   ; 
- D 0 - I - 0x029029 0A:9019: F4        .byte $F4   ; 
- D 0 - I - 0x02902A 0A:901A: 16        .byte $16   ; 
- D 0 - I - 0x02902B 0A:901B: 17        .byte $17   ; 
- D 0 - I - 0x02902C 0A:901C: 2D        .byte $2D   ; 
- D 0 - I - 0x02902D 0A:901D: 53        .byte $53   ; <S>
- D 0 - I - 0x02902E 0A:901E: F6        .byte $F6   ; 
- D 0 - I - 0x02902F 0A:901F: 00        .byte $00   ; 
- D 0 - I - 0x029030 0A:9020: F6        .byte $F6   ; 
- D 0 - I - 0x029031 0A:9021: 2A        .byte $2A   ; 
- D 0 - I - 0x029032 0A:9022: F6        .byte $F6   ; 
- D 0 - I - 0x029033 0A:9023: 3F        .byte $3F   ; 
- D 0 - I - 0x029034 0A:9024: F1        .byte $F1   ; 
- D 0 - I - 0x029035 0A:9025: 00        .byte $00   ; 
- D 0 - I - 0x029036 0A:9026: 45        .byte $45   ; <E>
- D 0 - I - 0x029037 0A:9027: 28        .byte $28   ; 
- D 0 - I - 0x029038 0A:9028: C3        .byte $C3   ; 
- D 0 - I - 0x029039 0A:9029: 05        .byte $05   ; 
- D 0 - I - 0x02903A 0A:902A: 04        .byte $04   ; 
- D 0 - I - 0x02903B 0A:902B: F1        .byte $F1   ; 
- D 0 - I - 0x02903C 0A:902C: 23        .byte $23   ; 
- D 0 - I - 0x02903D 0A:902D: 1A        .byte $1A   ; 
- D 0 - I - 0x02903E 0A:902E: 58        .byte $58   ; <X>
- D 0 - I - 0x02903F 0A:902F: EB        .byte $EB   ; 
- D 0 - I - 0x029040 0A:9030: 01        .byte $01   ; 
- D 0 - I - 0x029041 0A:9031: F1        .byte $F1   ; 
- D 0 - I - 0x029042 0A:9032: 22        .byte $22   ; 
- D 0 - I - 0x029043 0A:9033: 18        .byte $18   ; 
- D 0 - I - 0x029044 0A:9034: 28        .byte $28   ; 
- D 0 - I - 0x029045 0A:9035: C3        .byte $C3   ; 
- D 0 - I - 0x029046 0A:9036: 05        .byte $05   ; 
- D 0 - I - 0x029047 0A:9037: F8        .byte $F8   ; 
- D 0 - I - 0x029048 0A:9038: A7        .byte $A7   ; 
- D 0 - I - 0x029049 0A:9039: 8B        .byte $8B   ; 
- D 0 - I - 0x02904A 0A:903A: F5        .byte $F5   ; 
- D 0 - I - 0x02904B 0A:903B: 81        .byte $81   ; 
- D 0 - I - 0x02904C 0A:903C: F4        .byte $F4   ; 
- D 0 - I - 0x02904D 0A:903D: 0C        .byte $0C   ; 
- D 0 - I - 0x02904E 0A:903E: 0D        .byte $0D   ; 
- D 0 - I - 0x02904F 0A:903F: 0E        .byte $0E   ; 
- D 0 - I - 0x029050 0A:9040: 0F        .byte $0F   ; 
- D 0 - I - 0x029051 0A:9041: F7        .byte $F7   ; 
- D 0 - I - 0x029052 0A:9042: 03        .byte $03   ; 
- D 0 - I - 0x029053 0A:9043: 7B        .byte $7B   ; 
- D 0 - I - 0x029054 0A:9044: F1        .byte $F1   ; 
- D 0 - I - 0x029055 0A:9045: 00        .byte $00   ; 
- D 0 - I - 0x029056 0A:9046: 00        .byte $00   ; 
- D 0 - I - 0x029057 0A:9047: 80        .byte $80   ; 
- D 0 - I - 0x029058 0A:9048: FB        .byte $FB   ; 
- D 0 - I - 0x029059 0A:9049: 00        .byte $00   ; 
- D 0 - I - 0x02905A 0A:904A: F1        .byte $F1   ; 
- D 0 - I - 0x02905B 0A:904B: 9D        .byte $9D   ; 
- D 0 - I - 0x02905C 0A:904C: 1E        .byte $1E   ; 
- D 0 - I - 0x02905D 0A:904D: 90        .byte $90   ; 
- D 0 - I - 0x02905E 0A:904E: 97        .byte $97   ; 
- D 0 - I - 0x02905F 0A:904F: 04        .byte $04   ; 
- D 0 - I - 0x029060 0A:9050: F1        .byte $F1   ; 
- D 0 - I - 0x029061 0A:9051: 24        .byte $24   ; 
- D 0 - I - 0x029062 0A:9052: 1D        .byte $1D   ; 
- D 0 - I - 0x029063 0A:9053: 20        .byte $20   ; 
- D 0 - I - 0x029064 0A:9054: C3        .byte $C3   ; 
- D 0 - I - 0x029065 0A:9055: 09        .byte $09   ; 
- D 0 - I - 0x029066 0A:9056: 1E        .byte $1E   ; 
- D 0 - I - 0x029067 0A:9057: F6        .byte $F6   ; 
- D 0 - I - 0x029068 0A:9058: 00        .byte $00   ; 
- D 0 - I - 0x029069 0A:9059: F6        .byte $F6   ; 
- D 0 - I - 0x02906A 0A:905A: 15        .byte $15   ; 
- D 0 - I - 0x02906B 0A:905B: F1        .byte $F1   ; 
- D 0 - I - 0x02906C 0A:905C: 25        .byte $25   ; 
- D 0 - I - 0x02906D 0A:905D: 48        .byte $48   ; <H>
- D 0 - I - 0x02906E 0A:905E: 10        .byte $10   ; 
- D 0 - I - 0x02906F 0A:905F: BB        .byte $BB   ; 
- D 0 - I - 0x029070 0A:9060: 09        .byte $09   ; 
- D 0 - I - 0x029071 0A:9061: 02        .byte $02   ; 
- D 0 - I - 0x029072 0A:9062: F1        .byte $F1   ; 
- D 0 - I - 0x029073 0A:9063: 27        .byte $27   ; 
- D 0 - I - 0x029074 0A:9064: 1E        .byte $1E   ; 
- D 0 - I - 0x029075 0A:9065: F4        .byte $F4   ; 
- D 0 - I - 0x029076 0A:9066: AB        .byte $AB   ; 
- D 0 - I - 0x029077 0A:9067: 04        .byte $04   ; 
- D 0 - I - 0x029078 0A:9068: F1        .byte $F1   ; 
- D 0 - I - 0x029079 0A:9069: 26        .byte $26   ; 
- D 0 - I - 0x02907A 0A:906A: 21        .byte $21   ; 
- D 0 - I - 0x02907B 0A:906B: 08        .byte $08   ; 
- D 0 - I - 0x02907C 0A:906C: BB        .byte $BB   ; 
- D 0 - I - 0x02907D 0A:906D: 09        .byte $09   ; 
- D 0 - I - 0x02907E 0A:906E: F0        .byte $F0   ; 
- D 0 - I - 0x02907F 0A:906F: F5        .byte $F5   ; 
- D 0 - I - 0x029080 0A:9070: 81        .byte $81   ; 
- D 0 - I - 0x029081 0A:9071: F4        .byte $F4   ; 
- D 0 - I - 0x029082 0A:9072: 24        .byte $24   ; 
- D 0 - I - 0x029083 0A:9073: 25        .byte $25   ; 
- D 0 - I - 0x029084 0A:9074: 26        .byte $26   ; 
- D 0 - I - 0x029085 0A:9075: 4F        .byte $4F   ; <O>
- D 0 - I - 0x029086 0A:9076: F1        .byte $F1   ; 
- D 0 - I - 0x029087 0A:9077: 0C        .byte $0C   ; 
- D 0 - I - 0x029088 0A:9078: 0A        .byte $0A   ; 
- D 0 - I - 0x029089 0A:9079: 48        .byte $48   ; <H>
- D 0 - I - 0x02908A 0A:907A: FC        .byte $FC   ; 
- D 0 - I - 0x02908B 0A:907B: 00        .byte $00   ; 
- D 0 - I - 0x02908C 0A:907C: F1        .byte $F1   ; 
- D 0 - I - 0x02908D 0A:907D: DA        .byte $DA   ; 
- D 0 - I - 0x02908E 0A:907E: 09        .byte $09   ; 
- D 0 - I - 0x02908F 0A:907F: 10        .byte $10   ; 
- D 0 - I - 0x029090 0A:9080: B3        .byte $B3   ; 
- D 0 - I - 0x029091 0A:9081: 05        .byte $05   ; 
- D 0 - I - 0x029092 0A:9082: F9        .byte $F9   ; 
- D 0 - I - 0x029093 0A:9083: 0F        .byte $0F   ; 
- D 0 - I - 0x029094 0A:9084: 01        .byte $01   ; 
- D 0 - I - 0x029095 0A:9085: FB        .byte $FB   ; 
- D 0 - I - 0x029096 0A:9086: 10        .byte $10   ; 
- D 0 - I - 0x029097 0A:9087: 23        .byte $23   ; 
- D 0 - I - 0x029098 0A:9088: 45        .byte $45   ; <E>
- D 0 - I - 0x029099 0A:9089: 01        .byte $01   ; 
- D 0 - I - 0x02909A 0A:908A: FB        .byte $FB   ; 
- D 0 - I - 0x02909B 0A:908B: 01        .byte $01   ; 
- D 0 - I - 0x02909C 0A:908C: 23        .byte $23   ; 
- D 0 - I - 0x02909D 0A:908D: 45        .byte $45   ; <E>
- D 0 - I - 0x02909E 0A:908E: FA        .byte $FA   ; 
- D 0 - I - 0x02909F 0A:908F: F6        .byte $F6   ; 
- D 0 - I - 0x0290A0 0A:9090: 00        .byte $00   ; 
- D 0 - I - 0x0290A1 0A:9091: F1        .byte $F1   ; 
- D 0 - I - 0x0290A2 0A:9092: 00        .byte $00   ; 
- D 0 - I - 0x0290A3 0A:9093: 3B        .byte $3B   ; 
- D 0 - I - 0x0290A4 0A:9094: FA        .byte $FA   ; 
- D 0 - I - 0x0290A5 0A:9095: BB        .byte $BB   ; 
- D 0 - I - 0x0290A6 0A:9096: 04        .byte $04   ; 
- D 0 - I - 0x0290A7 0A:9097: 04        .byte $04   ; 
- D 0 - I - 0x0290A8 0A:9098: F1        .byte $F1   ; 
- D 0 - I - 0x0290A9 0A:9099: A6        .byte $A6   ; 
- D 0 - I - 0x0290AA 0A:909A: 0A        .byte $0A   ; 
- D 0 - I - 0x0290AB 0A:909B: F2        .byte $F2   ; 
- D 0 - I - 0x0290AC 0A:909C: BB        .byte $BB   ; 
- D 0 - I - 0x0290AD 0A:909D: 00        .byte $00   ; 
- D 0 - I - 0x0290AE 0A:909E: F1        .byte $F1   ; 
- D 0 - I - 0x0290AF 0A:909F: 26        .byte $26   ; 
- D 0 - I - 0x0290B0 0A:90A0: 09        .byte $09   ; 
- D 0 - I - 0x0290B1 0A:90A1: FA        .byte $FA   ; 
- D 0 - I - 0x0290B2 0A:90A2: BB        .byte $BB   ; 
- D 0 - I - 0x0290B3 0A:90A3: 04        .byte $04   ; 
- D 0 - I - 0x0290B4 0A:90A4: F0        .byte $F0   ; 
- D 0 - I - 0x0290B5 0A:90A5: F5        .byte $F5   ; 
- D 0 - I - 0x0290B6 0A:90A6: 09        .byte $09   ; 
- D 0 - I - 0x0290B7 0A:90A7: F4        .byte $F4   ; 
- D 0 - I - 0x0290B8 0A:90A8: 04        .byte $04   ; 
- D 0 - I - 0x0290B9 0A:90A9: 05        .byte $05   ; 
- D 0 - I - 0x0290BA 0A:90AA: 00        .byte $00   ; 
- D 0 - I - 0x0290BB 0A:90AB: 00        .byte $00   ; 
- D 0 - I - 0x0290BC 0A:90AC: F1        .byte $F1   ; 
- D 0 - I - 0x0290BD 0A:90AD: 8A        .byte $8A   ; 
- D 0 - I - 0x0290BE 0A:90AE: BA        .byte $BA   ; 
- D 0 - I - 0x0290BF 0A:90AF: 00        .byte $00   ; 
- D 0 - I - 0x0290C0 0A:90B0: EB        .byte $EB   ; 
- D 0 - I - 0x0290C1 0A:90B1: 01        .byte $01   ; 
- D 0 - I - 0x0290C2 0A:90B2: F0        .byte $F0   ; 
- D 0 - I - 0x0290C3 0A:90B3: F5        .byte $F5   ; 
- D 0 - I - 0x0290C4 0A:90B4: 81        .byte $81   ; 
- D 0 - I - 0x0290C5 0A:90B5: F4        .byte $F4   ; 
- D 0 - I - 0x0290C6 0A:90B6: 08        .byte $08   ; 
- D 0 - I - 0x0290C7 0A:90B7: 09        .byte $09   ; 
- D 0 - I - 0x0290C8 0A:90B8: 0A        .byte $0A   ; 
- D 0 - I - 0x0290C9 0A:90B9: 0B        .byte $0B   ; 
- D 0 - I - 0x0290CA 0A:90BA: F1        .byte $F1   ; 
- D 0 - I - 0x0290CB 0A:90BB: 54        .byte $54   ; <T>
- D 0 - I - 0x0290CC 0A:90BC: 4B        .byte $4B   ; <K>
- D 0 - I - 0x0290CD 0A:90BD: B0        .byte $B0   ; 
- D 0 - I - 0x0290CE 0A:90BE: BB        .byte $BB   ; 
- D 0 - I - 0x0290CF 0A:90BF: 01        .byte $01   ; 
- D 0 - I - 0x0290D0 0A:90C0: F1        .byte $F1   ; 
- D 0 - I - 0x0290D1 0A:90C1: 54        .byte $54   ; <T>
- D 0 - I - 0x0290D2 0A:90C2: 4D        .byte $4D   ; <M>
- D 0 - I - 0x0290D3 0A:90C3: B0        .byte $B0   ; 
- D 0 - I - 0x0290D4 0A:90C4: BB        .byte $BB   ; 
- D 0 - I - 0x0290D5 0A:90C5: 05        .byte $05   ; 
- D 0 - I - 0x0290D6 0A:90C6: F1        .byte $F1   ; 
- D 0 - I - 0x0290D7 0A:90C7: 54        .byte $54   ; <T>
- D 0 - I - 0x0290D8 0A:90C8: 4F        .byte $4F   ; <O>
- D 0 - I - 0x0290D9 0A:90C9: B0        .byte $B0   ; 
- D 0 - I - 0x0290DA 0A:90CA: BB        .byte $BB   ; 
- D 0 - I - 0x0290DB 0A:90CB: 09        .byte $09   ; 
- D 0 - I - 0x0290DC 0A:90CC: F0        .byte $F0   ; 
- D 0 - I - 0x0290DD 0A:90CD: F5        .byte $F5   ; 
- D 0 - I - 0x0290DE 0A:90CE: 80        .byte $80   ; 
- D 0 - I - 0x0290DF 0A:90CF: F8        .byte $F8   ; 
- D 0 - I - 0x0290E0 0A:90D0: FB        .byte $FB   ; 
- D 0 - I - 0x0290E1 0A:90D1: 8F        .byte $8F   ; 
- D 0 - I - 0x0290E2 0A:90D2: F5        .byte $F5   ; 
- D 0 - I - 0x0290E3 0A:90D3: 80        .byte $80   ; 
- D 0 - I - 0x0290E4 0A:90D4: F8        .byte $F8   ; 
- D 0 - I - 0x0290E5 0A:90D5: 3C        .byte $3C   ; 
- D 0 - I - 0x0290E6 0A:90D6: 90        .byte $90   ; 
- D 0 - I - 0x0290E7 0A:90D7: F5        .byte $F5   ; 
- D 0 - I - 0x0290E8 0A:90D8: 83        .byte $83   ; 
- D 0 - I - 0x0290E9 0A:90D9: F4        .byte $F4   ; 
- D 0 - I - 0x0290EA 0A:90DA: 18        .byte $18   ; 
- D 0 - I - 0x0290EB 0A:90DB: 19        .byte $19   ; 
- D 0 - I - 0x0290EC 0A:90DC: 1A        .byte $1A   ; 
- D 0 - I - 0x0290ED 0A:90DD: 1B        .byte $1B   ; 
- D 0 - I - 0x0290EE 0A:90DE: F7        .byte $F7   ; 
- D 0 - I - 0x0290EF 0A:90DF: 23        .byte $23   ; 
- D 0 - I - 0x0290F0 0A:90E0: 5B        .byte $5B   ; 
- D 0 - I - 0x0290F1 0A:90E1: F1        .byte $F1   ; 
- D 0 - I - 0x0290F2 0A:90E2: 00        .byte $00   ; 
- D 0 - I - 0x0290F3 0A:90E3: 00        .byte $00   ; 
- D 0 - I - 0x0290F4 0A:90E4: 80        .byte $80   ; 
- D 0 - I - 0x0290F5 0A:90E5: A3        .byte $A3   ; 
- D 0 - I - 0x0290F6 0A:90E6: 00        .byte $00   ; 
- D 0 - I - 0x0290F7 0A:90E7: F1        .byte $F1   ; 
- D 0 - I - 0x0290F8 0A:90E8: 00        .byte $00   ; 
- D 0 - I - 0x0290F9 0A:90E9: 00        .byte $00   ; 
- D 0 - I - 0x0290FA 0A:90EA: 80        .byte $80   ; 
- D 0 - I - 0x0290FB 0A:90EB: DB        .byte $DB   ; 
- D 0 - I - 0x0290FC 0A:90EC: 04        .byte $04   ; 
- D 0 - I - 0x0290FD 0A:90ED: F1        .byte $F1   ; 
- D 0 - I - 0x0290FE 0A:90EE: 00        .byte $00   ; 
- D 0 - I - 0x0290FF 0A:90EF: 70        .byte $70   ; <p>
- D 0 - I - 0x029100 0A:90F0: 00        .byte $00   ; 
- D 0 - I - 0x029101 0A:90F1: BB        .byte $BB   ; 
- D 0 - I - 0x029102 0A:90F2: 09        .byte $09   ; 
- D 0 - I - 0x029103 0A:90F3: F1        .byte $F1   ; 
- D 0 - I - 0x029104 0A:90F4: E5        .byte $E5   ; 
- D 0 - I - 0x029105 0A:90F5: 1B        .byte $1B   ; 
- D 0 - I - 0x029106 0A:90F6: 00        .byte $00   ; 
- D 0 - I - 0x029107 0A:90F7: BB        .byte $BB   ; 
- D 0 - I - 0x029108 0A:90F8: 0D        .byte $0D   ; 
- D 0 - I - 0x029109 0A:90F9: F1        .byte $F1   ; 
- D 0 - I - 0x02910A 0A:90FA: E6        .byte $E6   ; 
- D 0 - I - 0x02910B 0A:90FB: 1F        .byte $1F   ; 
- D 0 - I - 0x02910C 0A:90FC: 00        .byte $00   ; 
- D 0 - I - 0x02910D 0A:90FD: BB        .byte $BB   ; 
- D 0 - I - 0x02910E 0A:90FE: 11        .byte $11   ; 
- D 0 - I - 0x02910F 0A:90FF: 96        .byte $96   ; 
- D 0 - I - 0x029110 0A:9100: F7        .byte $F7   ; 
- D 0 - I - 0x029111 0A:9101: 03        .byte $03   ; 
- D 0 - I - 0x029112 0A:9102: 7B        .byte $7B   ; 
- D 0 - I - 0x029113 0A:9103: F6        .byte $F6   ; 
- D 0 - I - 0x029114 0A:9104: 00        .byte $00   ; 
- D 0 - I - 0x029115 0A:9105: F6        .byte $F6   ; 
- D 0 - I - 0x029116 0A:9106: 15        .byte $15   ; 
- D 0 - I - 0x029117 0A:9107: F6        .byte $F6   ; 
- D 0 - I - 0x029118 0A:9108: 3F        .byte $3F   ; 
- D 0 - I - 0x029119 0A:9109: F6        .byte $F6   ; 
- D 0 - I - 0x02911A 0A:910A: 54        .byte $54   ; <T>
- D 0 - I - 0x02911B 0A:910B: F0        .byte $F0   ; 
- D 0 - I - 0x02911C 0A:910C: F5        .byte $F5   ; 
- D 0 - I - 0x02911D 0A:910D: 80        .byte $80   ; 
- D 0 - I - 0x02911E 0A:910E: F4        .byte $F4   ; 
- D 0 - I - 0x02911F 0A:910F: 0C        .byte $0C   ; 
- D 0 - I - 0x029120 0A:9110: 0D        .byte $0D   ; 
- D 0 - I - 0x029121 0A:9111: 0E        .byte $0E   ; 
- D 0 - I - 0x029122 0A:9112: 0F        .byte $0F   ; 
- D 0 - I - 0x029123 0A:9113: F7        .byte $F7   ; 
- D 0 - I - 0x029124 0A:9114: 03        .byte $03   ; 
- D 0 - I - 0x029125 0A:9115: 7B        .byte $7B   ; 
- D 0 - I - 0x029126 0A:9116: F1        .byte $F1   ; 
- D 0 - I - 0x029127 0A:9117: 9E        .byte $9E   ; 
- D 0 - I - 0x029128 0A:9118: 1E        .byte $1E   ; 
- D 0 - I - 0x029129 0A:9119: 68        .byte $68   ; <h>
- D 0 - I - 0x02912A 0A:911A: 93        .byte $93   ; 
- D 0 - I - 0x02912B 0A:911B: 05        .byte $05   ; 
- D 0 - I - 0x02912C 0A:911C: F1        .byte $F1   ; 
- D 0 - I - 0x02912D 0A:911D: 28        .byte $28   ; 
- D 0 - I - 0x02912E 0A:911E: 1C        .byte $1C   ; 
- D 0 - I - 0x02912F 0A:911F: C8        .byte $C8   ; 
- D 0 - I - 0x029130 0A:9120: BB        .byte $BB   ; 
- D 0 - I - 0x029131 0A:9121: 08        .byte $08   ; 
- D 0 - I - 0x029132 0A:9122: 1E        .byte $1E   ; 
- D 0 - I - 0x029133 0A:9123: F6        .byte $F6   ; 
- D 0 - I - 0x029134 0A:9124: 15        .byte $15   ; 
- D 0 - I - 0x029135 0A:9125: F1        .byte $F1   ; 
- D 0 - I - 0x029136 0A:9126: 29        .byte $29   ; 
- D 0 - I - 0x029137 0A:9127: 47        .byte $47   ; <G>
- D 0 - I - 0x029138 0A:9128: E0        .byte $E0   ; 
- D 0 - I - 0x029139 0A:9129: BB        .byte $BB   ; 
- D 0 - I - 0x02913A 0A:912A: 08        .byte $08   ; 
- D 0 - I - 0x02913B 0A:912B: 02        .byte $02   ; 
- D 0 - I - 0x02913C 0A:912C: F1        .byte $F1   ; 
- D 0 - I - 0x02913D 0A:912D: 2A        .byte $2A   ; 
- D 0 - I - 0x02913E 0A:912E: 20        .byte $20   ; 
- D 0 - I - 0x02913F 0A:912F: E8        .byte $E8   ; 
- D 0 - I - 0x029140 0A:9130: BB        .byte $BB   ; 
- D 0 - I - 0x029141 0A:9131: 08        .byte $08   ; 
- D 0 - I - 0x029142 0A:9132: F1        .byte $F1   ; 
- D 0 - I - 0x029143 0A:9133: 00        .byte $00   ; 
- D 0 - I - 0x029144 0A:9134: 00        .byte $00   ; 
- D 0 - I - 0x029145 0A:9135: 80        .byte $80   ; 
- D 0 - I - 0x029146 0A:9136: FB        .byte $FB   ; 
- D 0 - I - 0x029147 0A:9137: 00        .byte $00   ; 
- D 0 - I - 0x029148 0A:9138: F1        .byte $F1   ; 
- D 0 - I - 0x029149 0A:9139: 9F        .byte $9F   ; 
- D 0 - I - 0x02914A 0A:913A: 1E        .byte $1E   ; 
- D 0 - I - 0x02914B 0A:913B: FC        .byte $FC   ; 
- D 0 - I - 0x02914C 0A:913C: AB        .byte $AB   ; 
- D 0 - I - 0x02914D 0A:913D: 04        .byte $04   ; 
- D 0 - I - 0x02914E 0A:913E: F8        .byte $F8   ; 
- D 0 - I - 0x02914F 0A:913F: 4E        .byte $4E   ; <N>
- D 0 - I - 0x029150 0A:9140: 8E        .byte $8E   ; 
- D 0 - I - 0x029151 0A:9141: F5        .byte $F5   ; 
- D 0 - I - 0x029152 0A:9142: 09        .byte $09   ; 
- D 0 - I - 0x029153 0A:9143: F4        .byte $F4   ; 
- D 0 - I - 0x029154 0A:9144: 04        .byte $04   ; 
- D 0 - I - 0x029155 0A:9145: 05        .byte $05   ; 
- D 0 - I - 0x029156 0A:9146: 00        .byte $00   ; 
- D 0 - I - 0x029157 0A:9147: 00        .byte $00   ; 
- D 0 - I - 0x029158 0A:9148: F7        .byte $F7   ; 
- D 0 - I - 0x029159 0A:9149: 23        .byte $23   ; 
- D 0 - I - 0x02915A 0A:914A: 5B        .byte $5B   ; 
- D 0 - I - 0x02915B 0A:914B: F1        .byte $F1   ; 
- D 0 - I - 0x02915C 0A:914C: 8D        .byte $8D   ; 
- D 0 - I - 0x02915D 0A:914D: CF        .byte $CF   ; 
- D 0 - I - 0x02915E 0A:914E: 98        .byte $98   ; 
- D 0 - I - 0x02915F 0A:914F: C3        .byte $C3   ; 
- D 0 - I - 0x029160 0A:9150: 00        .byte $00   ; 
- D 0 - I - 0x029161 0A:9151: F0        .byte $F0   ; 
- D 0 - I - 0x029162 0A:9152: F5        .byte $F5   ; 
- D 0 - I - 0x029163 0A:9153: 09        .byte $09   ; 
- D 0 - I - 0x029164 0A:9154: F4        .byte $F4   ; 
- D 0 - I - 0x029165 0A:9155: 04        .byte $04   ; 
- D 0 - I - 0x029166 0A:9156: 05        .byte $05   ; 
- D 0 - I - 0x029167 0A:9157: 00        .byte $00   ; 
- D 0 - I - 0x029168 0A:9158: 00        .byte $00   ; 
- D 0 - I - 0x029169 0A:9159: F1        .byte $F1   ; 
- D 0 - I - 0x02916A 0A:915A: 00        .byte $00   ; 
- D 0 - I - 0x02916B 0A:915B: EC        .byte $EC   ; 
- D 0 - I - 0x02916C 0A:915C: 00        .byte $00   ; 
- D 0 - I - 0x02916D 0A:915D: C3        .byte $C3   ; 
- D 0 - I - 0x02916E 0A:915E: 01        .byte $01   ; 
- D 0 - I - 0x02916F 0A:915F: F0        .byte $F0   ; 
- D 0 - I - 0x029170 0A:9160: F5        .byte $F5   ; 
- D 0 - I - 0x029171 0A:9161: 80        .byte $80   ; 
- D 0 - I - 0x029172 0A:9162: F4        .byte $F4   ; 
- D 0 - I - 0x029173 0A:9163: 1C        .byte $1C   ; 
- D 0 - I - 0x029174 0A:9164: 1D        .byte $1D   ; 
- D 0 - I - 0x029175 0A:9165: 00        .byte $00   ; 
- D 0 - I - 0x029176 0A:9166: 00        .byte $00   ; 
- D 0 - I - 0x029177 0A:9167: F7        .byte $F7   ; 
- D 0 - I - 0x029178 0A:9168: 03        .byte $03   ; 
- D 0 - I - 0x029179 0A:9169: 7B        .byte $7B   ; 
- D 0 - I - 0x02917A 0A:916A: F1        .byte $F1   ; 
- D 0 - I - 0x02917B 0A:916B: 95        .byte $95   ; 
- D 0 - I - 0x02917C 0A:916C: 0C        .byte $0C   ; 
- D 0 - I - 0x02917D 0A:916D: 7F        .byte $7F   ; 
- D 0 - I - 0x02917E 0A:916E: 23        .byte $23   ; 
- D 0 - I - 0x02917F 0A:916F: 07        .byte $07   ; 
- D 0 - I - 0x029180 0A:9170: F1        .byte $F1   ; 
- D 0 - I - 0x029181 0A:9171: 00        .byte $00   ; 
- D 0 - I - 0x029182 0A:9172: 00        .byte $00   ; 
- D 0 - I - 0x029183 0A:9173: 80        .byte $80   ; 
- D 0 - I - 0x029184 0A:9174: FB        .byte $FB   ; 
- D 0 - I - 0x029185 0A:9175: 00        .byte $00   ; 
- D 0 - I - 0x029186 0A:9176: F0        .byte $F0   ; 
- D 0 - I - 0x029187 0A:9177: F5        .byte $F5   ; 
- D 0 - I - 0x029188 0A:9178: 80        .byte $80   ; 
- D 0 - I - 0x029189 0A:9179: F4        .byte $F4   ; 
- D 0 - I - 0x02918A 0A:917A: 1C        .byte $1C   ; 
- D 0 - I - 0x02918B 0A:917B: 1D        .byte $1D   ; 
- D 0 - I - 0x02918C 0A:917C: 00        .byte $00   ; 
- D 0 - I - 0x02918D 0A:917D: 00        .byte $00   ; 
- D 0 - I - 0x02918E 0A:917E: F7        .byte $F7   ; 
- D 0 - I - 0x02918F 0A:917F: 03        .byte $03   ; 
- D 0 - I - 0x029190 0A:9180: 7B        .byte $7B   ; 
- D 0 - I - 0x029191 0A:9181: F1        .byte $F1   ; 
- D 0 - I - 0x029192 0A:9182: 95        .byte $95   ; 
- D 0 - I - 0x029193 0A:9183: 0E        .byte $0E   ; 
- D 0 - I - 0x029194 0A:9184: 7F        .byte $7F   ; 
- D 0 - I - 0x029195 0A:9185: 23        .byte $23   ; 
- D 0 - I - 0x029196 0A:9186: 07        .byte $07   ; 
- D 0 - I - 0x029197 0A:9187: F1        .byte $F1   ; 
- D 0 - I - 0x029198 0A:9188: 00        .byte $00   ; 
- D 0 - I - 0x029199 0A:9189: 00        .byte $00   ; 
- D 0 - I - 0x02919A 0A:918A: 80        .byte $80   ; 
- D 0 - I - 0x02919B 0A:918B: FB        .byte $FB   ; 
- D 0 - I - 0x02919C 0A:918C: 00        .byte $00   ; 
- D 0 - I - 0x02919D 0A:918D: F0        .byte $F0   ; 
- D 0 - I - 0x02919E 0A:918E: F5        .byte $F5   ; 
- D 0 - I - 0x02919F 0A:918F: 09        .byte $09   ; 
- D 0 - I - 0x0291A0 0A:9190: F4        .byte $F4   ; 
- D 0 - I - 0x0291A1 0A:9191: 04        .byte $04   ; 
- D 0 - I - 0x0291A2 0A:9192: 05        .byte $05   ; 
- D 0 - I - 0x0291A3 0A:9193: 00        .byte $00   ; 
- D 0 - I - 0x0291A4 0A:9194: 00        .byte $00   ; 
- D 0 - I - 0x0291A5 0A:9195: F7        .byte $F7   ; 
- D 0 - I - 0x0291A6 0A:9196: 03        .byte $03   ; 
- D 0 - I - 0x0291A7 0A:9197: 7B        .byte $7B   ; 
- D 0 - I - 0x0291A8 0A:9198: F1        .byte $F1   ; 
- D 0 - I - 0x0291A9 0A:9199: 8F        .byte $8F   ; 
- D 0 - I - 0x0291AA 0A:919A: BC        .byte $BC   ; 
- D 0 - I - 0x0291AB 0A:919B: A0        .byte $A0   ; 
- D 0 - I - 0x0291AC 0A:919C: A3        .byte $A3   ; 
- D 0 - I - 0x0291AD 0A:919D: 04        .byte $04   ; 
- D 0 - I - 0x0291AE 0A:919E: F1        .byte $F1   ; 
- D 0 - I - 0x0291AF 0A:919F: 00        .byte $00   ; 
- D 0 - I - 0x0291B0 0A:91A0: 00        .byte $00   ; 
- D 0 - I - 0x0291B1 0A:91A1: 78        .byte $78   ; <x>
- D 0 - I - 0x0291B2 0A:91A2: FB        .byte $FB   ; 
- D 0 - I - 0x0291B3 0A:91A3: 00        .byte $00   ; 
- D 0 - I - 0x0291B4 0A:91A4: F0        .byte $F0   ; 
- D 0 - I - 0x0291B5 0A:91A5: F5        .byte $F5   ; 
- D 0 - I - 0x0291B6 0A:91A6: 09        .byte $09   ; 
- D 0 - I - 0x0291B7 0A:91A7: F4        .byte $F4   ; 
- D 0 - I - 0x0291B8 0A:91A8: 04        .byte $04   ; 
- D 0 - I - 0x0291B9 0A:91A9: 05        .byte $05   ; 
- D 0 - I - 0x0291BA 0A:91AA: 00        .byte $00   ; 
- D 0 - I - 0x0291BB 0A:91AB: 00        .byte $00   ; 
- D 0 - I - 0x0291BC 0A:91AC: F7        .byte $F7   ; 
- D 0 - I - 0x0291BD 0A:91AD: 03        .byte $03   ; 
- D 0 - I - 0x0291BE 0A:91AE: 7B        .byte $7B   ; 
- D 0 - I - 0x0291BF 0A:91AF: F1        .byte $F1   ; 
- D 0 - I - 0x0291C0 0A:91B0: 91        .byte $91   ; 
- D 0 - I - 0x0291C1 0A:91B1: BC        .byte $BC   ; 
- D 0 - I - 0x0291C2 0A:91B2: C0        .byte $C0   ; 
- D 0 - I - 0x0291C3 0A:91B3: EB        .byte $EB   ; 
- D 0 - I - 0x0291C4 0A:91B4: 04        .byte $04   ; 
- D 0 - I - 0x0291C5 0A:91B5: F1        .byte $F1   ; 
- D 0 - I - 0x0291C6 0A:91B6: 00        .byte $00   ; 
- D 0 - I - 0x0291C7 0A:91B7: 00        .byte $00   ; 
- D 0 - I - 0x0291C8 0A:91B8: 80        .byte $80   ; 
- D 0 - I - 0x0291C9 0A:91B9: FB        .byte $FB   ; 
- D 0 - I - 0x0291CA 0A:91BA: 00        .byte $00   ; 
- D 0 - I - 0x0291CB 0A:91BB: F0        .byte $F0   ; 
- D 0 - I - 0x0291CC 0A:91BC: F5        .byte $F5   ; 
- D 0 - I - 0x0291CD 0A:91BD: 09        .byte $09   ; 
- D 0 - I - 0x0291CE 0A:91BE: F4        .byte $F4   ; 
- D 0 - I - 0x0291CF 0A:91BF: 06        .byte $06   ; 
- D 0 - I - 0x0291D0 0A:91C0: 00        .byte $00   ; 
- D 0 - I - 0x0291D1 0A:91C1: 00        .byte $00   ; 
- D 0 - I - 0x0291D2 0A:91C2: 00        .byte $00   ; 
- D 0 - I - 0x0291D3 0A:91C3: F1        .byte $F1   ; 
- D 0 - I - 0x0291D4 0A:91C4: 77        .byte $77   ; <w>
- D 0 - I - 0x0291D5 0A:91C5: B4        .byte $B4   ; 
- D 0 - I - 0x0291D6 0A:91C6: 40        .byte $40   ; 
- D 0 - I - 0x0291D7 0A:91C7: EB        .byte $EB   ; 
- D 0 - I - 0x0291D8 0A:91C8: 01        .byte $01   ; 
- D 0 - I - 0x0291D9 0A:91C9: F0        .byte $F0   ; 
- D 0 - I - 0x0291DA 0A:91CA: F5        .byte $F5   ; 
- D 0 - I - 0x0291DB 0A:91CB: 09        .byte $09   ; 
- D 0 - I - 0x0291DC 0A:91CC: F4        .byte $F4   ; 
- D 0 - I - 0x0291DD 0A:91CD: 04        .byte $04   ; 
- D 0 - I - 0x0291DE 0A:91CE: 05        .byte $05   ; 
- D 0 - I - 0x0291DF 0A:91CF: 00        .byte $00   ; 
- D 0 - I - 0x0291E0 0A:91D0: 00        .byte $00   ; 
- D 0 - I - 0x0291E1 0A:91D1: F1        .byte $F1   ; 
- D 0 - I - 0x0291E2 0A:91D2: 00        .byte $00   ; 
- D 0 - I - 0x0291E3 0A:91D3: 34        .byte $34   ; <4>
- D 0 - I - 0x0291E4 0A:91D4: 08        .byte $08   ; 
- D 0 - I - 0x0291E5 0A:91D5: CB        .byte $CB   ; 
- D 0 - I - 0x0291E6 0A:91D6: 01        .byte $01   ; 
- D 0 - I - 0x0291E7 0A:91D7: F0        .byte $F0   ; 
- D 0 - I - 0x0291E8 0A:91D8: F5        .byte $F5   ; 
- D 0 - I - 0x0291E9 0A:91D9: 09        .byte $09   ; 
- D 0 - I - 0x0291EA 0A:91DA: F4        .byte $F4   ; 
- D 0 - I - 0x0291EB 0A:91DB: 3B        .byte $3B   ; 
- D 0 - I - 0x0291EC 0A:91DC: 47        .byte $47   ; <G>
- D 0 - I - 0x0291ED 0A:91DD: 00        .byte $00   ; 
- D 0 - I - 0x0291EE 0A:91DE: 00        .byte $00   ; 
- D 0 - I - 0x0291EF 0A:91DF: F1        .byte $F1   ; 
- D 0 - I - 0x0291F0 0A:91E0: 00        .byte $00   ; 
- D 0 - I - 0x0291F1 0A:91E1: 35        .byte $35   ; <5>
- D 0 - I - 0x0291F2 0A:91E2: 00        .byte $00   ; 
- D 0 - I - 0x0291F3 0A:91E3: CB        .byte $CB   ; 
- D 0 - I - 0x0291F4 0A:91E4: 01        .byte $01   ; 
- D 0 - I - 0x0291F5 0A:91E5: F0        .byte $F0   ; 
- D 0 - I - 0x0291F6 0A:91E6: F5        .byte $F5   ; 
- D 0 - I - 0x0291F7 0A:91E7: 09        .byte $09   ; 
- D 0 - I - 0x0291F8 0A:91E8: F4        .byte $F4   ; 
- D 0 - I - 0x0291F9 0A:91E9: 3B        .byte $3B   ; 
- D 0 - I - 0x0291FA 0A:91EA: 47        .byte $47   ; <G>
- D 0 - I - 0x0291FB 0A:91EB: 00        .byte $00   ; 
- D 0 - I - 0x0291FC 0A:91EC: 00        .byte $00   ; 
- D 0 - I - 0x0291FD 0A:91ED: F1        .byte $F1   ; 
- D 0 - I - 0x0291FE 0A:91EE: 00        .byte $00   ; 
- D 0 - I - 0x0291FF 0A:91EF: 36        .byte $36   ; <6>
- D 0 - I - 0x029200 0A:91F0: 00        .byte $00   ; 
- D 0 - I - 0x029201 0A:91F1: CB        .byte $CB   ; 
- D 0 - I - 0x029202 0A:91F2: 01        .byte $01   ; 
- D 0 - I - 0x029203 0A:91F3: F0        .byte $F0   ; 
- D 0 - I - 0x029204 0A:91F4: F5        .byte $F5   ; 
- D 0 - I - 0x029205 0A:91F5: 0B        .byte $0B   ; 
- D 0 - I - 0x029206 0A:91F6: F4        .byte $F4   ; 
- D 0 - I - 0x029207 0A:91F7: 43        .byte $43   ; <C>
- D 0 - I - 0x029208 0A:91F8: 45        .byte $45   ; <E>
- D 0 - I - 0x029209 0A:91F9: 47        .byte $47   ; <G>
- D 0 - I - 0x02920A 0A:91FA: 44        .byte $44   ; <D>
- D 0 - I - 0x02920B 0A:91FB: F1        .byte $F1   ; 
- D 0 - I - 0x02920C 0A:91FC: 00        .byte $00   ; 
- D 0 - I - 0x02920D 0A:91FD: 24        .byte $24   ; 
- D 0 - I - 0x02920E 0A:91FE: F0        .byte $F0   ; 
- D 0 - I - 0x02920F 0A:91FF: BB        .byte $BB   ; 
- D 0 - I - 0x029210 0A:9200: 00        .byte $00   ; 
- D 0 - I - 0x029211 0A:9201: F0        .byte $F0   ; 
- D 0 - I - 0x029212 0A:9202: F5        .byte $F5   ; 
- D 0 - I - 0x029213 0A:9203: 0B        .byte $0B   ; 
- D 0 - I - 0x029214 0A:9204: F4        .byte $F4   ; 
- D 0 - I - 0x029215 0A:9205: 43        .byte $43   ; <C>
- D 0 - I - 0x029216 0A:9206: 45        .byte $45   ; <E>
- D 0 - I - 0x029217 0A:9207: 47        .byte $47   ; <G>
- D 0 - I - 0x029218 0A:9208: 44        .byte $44   ; <D>
- D 0 - I - 0x029219 0A:9209: F1        .byte $F1   ; 
- D 0 - I - 0x02921A 0A:920A: 00        .byte $00   ; 
- D 0 - I - 0x02921B 0A:920B: 25        .byte $25   ; 
- D 0 - I - 0x02921C 0A:920C: F0        .byte $F0   ; 
- D 0 - I - 0x02921D 0A:920D: BB        .byte $BB   ; 
- D 0 - I - 0x02921E 0A:920E: 00        .byte $00   ; 
- D 0 - I - 0x02921F 0A:920F: F0        .byte $F0   ; 
- D 0 - I - 0x029220 0A:9210: F5        .byte $F5   ; 
- D 0 - I - 0x029221 0A:9211: 0B        .byte $0B   ; 
- D 0 - I - 0x029222 0A:9212: F4        .byte $F4   ; 
- D 0 - I - 0x029223 0A:9213: 43        .byte $43   ; <C>
- D 0 - I - 0x029224 0A:9214: 45        .byte $45   ; <E>
- D 0 - I - 0x029225 0A:9215: 47        .byte $47   ; <G>
- D 0 - I - 0x029226 0A:9216: 44        .byte $44   ; <D>
- D 0 - I - 0x029227 0A:9217: F1        .byte $F1   ; 
- D 0 - I - 0x029228 0A:9218: 00        .byte $00   ; 
- D 0 - I - 0x029229 0A:9219: 26        .byte $26   ; 
- D 0 - I - 0x02922A 0A:921A: F0        .byte $F0   ; 
- D 0 - I - 0x02922B 0A:921B: BB        .byte $BB   ; 
- D 0 - I - 0x02922C 0A:921C: 00        .byte $00   ; 
- D 0 - I - 0x02922D 0A:921D: F0        .byte $F0   ; 
- D 0 - I - 0x02922E 0A:921E: F5        .byte $F5   ; 
- D 0 - I - 0x02922F 0A:921F: 81        .byte $81   ; 
- D 0 - I - 0x029230 0A:9220: F4        .byte $F4   ; 
- D 0 - I - 0x029231 0A:9221: 04        .byte $04   ; 
- D 0 - I - 0x029232 0A:9222: 05        .byte $05   ; 
- D 0 - I - 0x029233 0A:9223: 0F        .byte $0F   ; 
- D 0 - I - 0x029234 0A:9224: 00        .byte $00   ; 
- D 0 - I - 0x029235 0A:9225: F1        .byte $F1   ; 
- D 0 - I - 0x029236 0A:9226: 32        .byte $32   ; <2>
- D 0 - I - 0x029237 0A:9227: C0        .byte $C0   ; 
- D 0 - I - 0x029238 0A:9228: 88        .byte $88   ; 
- D 0 - I - 0x029239 0A:9229: E3        .byte $E3   ; 
- D 0 - I - 0x02923A 0A:922A: 00        .byte $00   ; 
- D 0 - I - 0x02923B 0A:922B: F1        .byte $F1   ; 
- D 0 - I - 0x02923C 0A:922C: 07        .byte $07   ; 
- D 0 - I - 0x02923D 0A:922D: 2B        .byte $2B   ; 
- D 0 - I - 0x02923E 0A:922E: 50        .byte $50   ; <P>
- D 0 - I - 0x02923F 0A:922F: DB        .byte $DB   ; 
- D 0 - I - 0x029240 0A:9230: 05        .byte $05   ; 
- D 0 - I - 0x029241 0A:9231: F0        .byte $F0   ; 
- D 0 - I - 0x029242 0A:9232: F5        .byte $F5   ; 
- D 0 - I - 0x029243 0A:9233: 81        .byte $81   ; 
- D 0 - I - 0x029244 0A:9234: F4        .byte $F4   ; 
- D 0 - I - 0x029245 0A:9235: 0C        .byte $0C   ; 
- D 0 - I - 0x029246 0A:9236: 0D        .byte $0D   ; 
- D 0 - I - 0x029247 0A:9237: 0E        .byte $0E   ; 
- D 0 - I - 0x029248 0A:9238: 0F        .byte $0F   ; 
- D 0 - I - 0x029249 0A:9239: F1        .byte $F1   ; 
- D 0 - I - 0x02924A 0A:923A: 29        .byte $29   ; 
- D 0 - I - 0x02924B 0A:923B: 3F        .byte $3F   ; 
- D 0 - I - 0x02924C 0A:923C: F8        .byte $F8   ; 
- D 0 - I - 0x02924D 0A:923D: B3        .byte $B3   ; 
- D 0 - I - 0x02924E 0A:923E: 04        .byte $04   ; 
- D 0 - I - 0x02924F 0A:923F: F0        .byte $F0   ; 
- D 0 - I - 0x029250 0A:9240: F5        .byte $F5   ; 
- D 0 - I - 0x029251 0A:9241: 80        .byte $80   ; 
- D 0 - I - 0x029252 0A:9242: F8        .byte $F8   ; 
- D 0 - I - 0x029253 0A:9243: 48        .byte $48   ; <H>
- D 0 - I - 0x029254 0A:9244: 9C        .byte $9C   ; 
- D 0 - I - 0x029255 0A:9245: F5        .byte $F5   ; 
- D 0 - I - 0x029256 0A:9246: 09        .byte $09   ; 
- D 0 - I - 0x029257 0A:9247: F4        .byte $F4   ; 
- D 0 - I - 0x029258 0A:9248: 04        .byte $04   ; 
- D 0 - I - 0x029259 0A:9249: 05        .byte $05   ; 
- D 0 - I - 0x02925A 0A:924A: 00        .byte $00   ; 
- D 0 - I - 0x02925B 0A:924B: 00        .byte $00   ; 
- D 0 - I - 0x02925C 0A:924C: F1        .byte $F1   ; 
- D 0 - I - 0x02925D 0A:924D: 7E        .byte $7E   ; 
- D 0 - I - 0x02925E 0A:924E: BA        .byte $BA   ; 
- D 0 - I - 0x02925F 0A:924F: E0        .byte $E0   ; 
- D 0 - I - 0x029260 0A:9250: BB        .byte $BB   ; 
- D 0 - I - 0x029261 0A:9251: 00        .byte $00   ; 
- D 0 - I - 0x029262 0A:9252: F0        .byte $F0   ; 
- D 0 - I - 0x029263 0A:9253: F5        .byte $F5   ; 
- D 0 - I - 0x029264 0A:9254: 83        .byte $83   ; 
- D 0 - I - 0x029265 0A:9255: F4        .byte $F4   ; 
- D 0 - I - 0x029266 0A:9256: 1B        .byte $1B   ; 
- D 0 - I - 0x029267 0A:9257: 00        .byte $00   ; 
- D 0 - I - 0x029268 0A:9258: 00        .byte $00   ; 
- D 0 - I - 0x029269 0A:9259: 00        .byte $00   ; 
- D 0 - I - 0x02926A 0A:925A: F1        .byte $F1   ; 
- D 0 - I - 0x02926B 0A:925B: 00        .byte $00   ; 
- D 0 - I - 0x02926C 0A:925C: 2C        .byte $2C   ; 
- D 0 - I - 0x02926D 0A:925D: 00        .byte $00   ; 
- D 0 - I - 0x02926E 0A:925E: BB        .byte $BB   ; 
- D 0 - I - 0x02926F 0A:925F: 01        .byte $01   ; 
- D 0 - I - 0x029270 0A:9260: F0        .byte $F0   ; 
- D 0 - I - 0x029271 0A:9261: F5        .byte $F5   ; 
- D 0 - I - 0x029272 0A:9262: 0A        .byte $0A   ; 
- D 0 - I - 0x029273 0A:9263: F4        .byte $F4   ; 
- D 0 - I - 0x029274 0A:9264: 2C        .byte $2C   ; 
- D 0 - I - 0x029275 0A:9265: 0B        .byte $0B   ; 
- D 0 - I - 0x029276 0A:9266: 05        .byte $05   ; 
- D 0 - I - 0x029277 0A:9267: 07        .byte $07   ; 
- D 0 - I - 0x029278 0A:9268: F1        .byte $F1   ; 
- D 0 - I - 0x029279 0A:9269: 00        .byte $00   ; 
- D 0 - I - 0x02927A 0A:926A: 27        .byte $27   ; 
- D 0 - I - 0x02927B 0A:926B: 10        .byte $10   ; 
- D 0 - I - 0x02927C 0A:926C: CB        .byte $CB   ; 
- D 0 - I - 0x02927D 0A:926D: 01        .byte $01   ; 
- D 0 - I - 0x02927E 0A:926E: F0        .byte $F0   ; 
- D 0 - I - 0x02927F 0A:926F: F5        .byte $F5   ; 
- D 0 - I - 0x029280 0A:9270: 09        .byte $09   ; 
- D 0 - I - 0x029281 0A:9271: F4        .byte $F4   ; 
- D 0 - I - 0x029282 0A:9272: 04        .byte $04   ; 
- D 0 - I - 0x029283 0A:9273: 05        .byte $05   ; 
- D 0 - I - 0x029284 0A:9274: 00        .byte $00   ; 
- D 0 - I - 0x029285 0A:9275: 00        .byte $00   ; 
- D 0 - I - 0x029286 0A:9276: F1        .byte $F1   ; 
- D 0 - I - 0x029287 0A:9277: 35        .byte $35   ; <5>
- D 0 - I - 0x029288 0A:9278: 28        .byte $28   ; 
- D 0 - I - 0x029289 0A:9279: 00        .byte $00   ; 
- D 0 - I - 0x02928A 0A:927A: B7        .byte $B7   ; 
- D 0 - I - 0x02928B 0A:927B: 01        .byte $01   ; 
- D 0 - I - 0x02928C 0A:927C: F0        .byte $F0   ; 
- D 0 - I - 0x02928D 0A:927D: F5        .byte $F5   ; 
- D 0 - I - 0x02928E 0A:927E: 81        .byte $81   ; 
- D 0 - I - 0x02928F 0A:927F: F4        .byte $F4   ; 
- D 0 - I - 0x029290 0A:9280: 28        .byte $28   ; 
- D 0 - I - 0x029291 0A:9281: 29        .byte $29   ; 
- D 0 - I - 0x029292 0A:9282: 2A        .byte $2A   ; 
- D 0 - I - 0x029293 0A:9283: 0B        .byte $0B   ; 
- D 0 - I - 0x029294 0A:9284: F1        .byte $F1   ; 
- D 0 - I - 0x029295 0A:9285: 00        .byte $00   ; 
- D 0 - I - 0x029296 0A:9286: 11        .byte $11   ; 
- D 0 - I - 0x029297 0A:9287: E8        .byte $E8   ; 
- D 0 - I - 0x029298 0A:9288: BB        .byte $BB   ; 
- D 0 - I - 0x029299 0A:9289: 00        .byte $00   ; 
- D 0 - I - 0x02929A 0A:928A: F0        .byte $F0   ; 
- D 0 - I - 0x02929B 0A:928B: F5        .byte $F5   ; 
- D 0 - I - 0x02929C 0A:928C: 09        .byte $09   ; 
- D 0 - I - 0x02929D 0A:928D: F4        .byte $F4   ; 
- D 0 - I - 0x02929E 0A:928E: 04        .byte $04   ; 
- D 0 - I - 0x02929F 0A:928F: 05        .byte $05   ; 
- D 0 - I - 0x0292A0 0A:9290: 00        .byte $00   ; 
- D 0 - I - 0x0292A1 0A:9291: 00        .byte $00   ; 
- D 0 - I - 0x0292A2 0A:9292: F1        .byte $F1   ; 
- D 0 - I - 0x0292A3 0A:9293: 00        .byte $00   ; 
- D 0 - I - 0x0292A4 0A:9294: 00        .byte $00   ; 
- D 0 - I - 0x0292A5 0A:9295: 80        .byte $80   ; 
- D 0 - I - 0x0292A6 0A:9296: FB        .byte $FB   ; 
- D 0 - I - 0x0292A7 0A:9297: 00        .byte $00   ; 
- D 0 - I - 0x0292A8 0A:9298: F1        .byte $F1   ; 
- D 0 - I - 0x0292A9 0A:9299: E8        .byte $E8   ; 
- D 0 - I - 0x0292AA 0A:929A: BA        .byte $BA   ; 
- D 0 - I - 0x0292AB 0A:929B: FC        .byte $FC   ; 
- D 0 - I - 0x0292AC 0A:929C: C3        .byte $C3   ; 
- D 0 - I - 0x0292AD 0A:929D: 04        .byte $04   ; 
- D 0 - I - 0x0292AE 0A:929E: F0        .byte $F0   ; 
- D 0 - I - 0x0292AF 0A:929F: F5        .byte $F5   ; 
- D 0 - I - 0x0292B0 0A:92A0: 09        .byte $09   ; 
- D 0 - I - 0x0292B1 0A:92A1: F4        .byte $F4   ; 
- D 0 - I - 0x0292B2 0A:92A2: 04        .byte $04   ; 
- D 0 - I - 0x0292B3 0A:92A3: 05        .byte $05   ; 
- D 0 - I - 0x0292B4 0A:92A4: 00        .byte $00   ; 
- D 0 - I - 0x0292B5 0A:92A5: 00        .byte $00   ; 
- D 0 - I - 0x0292B6 0A:92A6: F1        .byte $F1   ; 
- D 0 - I - 0x0292B7 0A:92A7: 7A        .byte $7A   ; <z>
- D 0 - I - 0x0292B8 0A:92A8: BD        .byte $BD   ; 
- D 0 - I - 0x0292B9 0A:92A9: E0        .byte $E0   ; 
- D 0 - I - 0x0292BA 0A:92AA: E3        .byte $E3   ; 
- D 0 - I - 0x0292BB 0A:92AB: 00        .byte $00   ; 
- D 0 - I - 0x0292BC 0A:92AC: F0        .byte $F0   ; 
- - - - - - 0x0292BD 0A:92AD: F5        .byte $F5   ; 
- - - - - - 0x0292BE 0A:92AE: 09        .byte $09   ; 
- - - - - - 0x0292BF 0A:92AF: F4        .byte $F4   ; 
- - - - - - 0x0292C0 0A:92B0: 04        .byte $04   ; 
- - - - - - 0x0292C1 0A:92B1: 05        .byte $05   ; 
- - - - - - 0x0292C2 0A:92B2: 00        .byte $00   ; 
- - - - - - 0x0292C3 0A:92B3: 00        .byte $00   ; 
- - - - - - 0x0292C4 0A:92B4: F1        .byte $F1   ; 
- - - - - - 0x0292C5 0A:92B5: 7B        .byte $7B   ; 
- - - - - - 0x0292C6 0A:92B6: BC        .byte $BC   ; 
- - - - - - 0x0292C7 0A:92B7: A8        .byte $A8   ; 
- - - - - - 0x0292C8 0A:92B8: EB        .byte $EB   ; 
- - - - - - 0x0292C9 0A:92B9: 00        .byte $00   ; 
- - - - - - 0x0292CA 0A:92BA: F0        .byte $F0   ; 
- D 0 - I - 0x0292CB 0A:92BB: F5        .byte $F5   ; 
- D 0 - I - 0x0292CC 0A:92BC: 09        .byte $09   ; 
- D 0 - I - 0x0292CD 0A:92BD: F4        .byte $F4   ; 
- D 0 - I - 0x0292CE 0A:92BE: 04        .byte $04   ; 
- D 0 - I - 0x0292CF 0A:92BF: 05        .byte $05   ; 
- D 0 - I - 0x0292D0 0A:92C0: 00        .byte $00   ; 
- D 0 - I - 0x0292D1 0A:92C1: 00        .byte $00   ; 
- D 0 - I - 0x0292D2 0A:92C2: F1        .byte $F1   ; 
- D 0 - I - 0x0292D3 0A:92C3: 7F        .byte $7F   ; 
- D 0 - I - 0x0292D4 0A:92C4: C0        .byte $C0   ; 
- D 0 - I - 0x0292D5 0A:92C5: 60        .byte $60   ; 
- D 0 - I - 0x0292D6 0A:92C6: A3        .byte $A3   ; 
- D 0 - I - 0x0292D7 0A:92C7: 01        .byte $01   ; 
- D 0 - I - 0x0292D8 0A:92C8: F0        .byte $F0   ; 
- D 0 - I - 0x0292D9 0A:92C9: F5        .byte $F5   ; 
- D 0 - I - 0x0292DA 0A:92CA: 09        .byte $09   ; 
- D 0 - I - 0x0292DB 0A:92CB: F4        .byte $F4   ; 
- D 0 - I - 0x0292DC 0A:92CC: 04        .byte $04   ; 
- D 0 - I - 0x0292DD 0A:92CD: 05        .byte $05   ; 
- D 0 - I - 0x0292DE 0A:92CE: 00        .byte $00   ; 
- D 0 - I - 0x0292DF 0A:92CF: 00        .byte $00   ; 
- D 0 - I - 0x0292E0 0A:92D0: F1        .byte $F1   ; 
- D 0 - I - 0x0292E1 0A:92D1: 80        .byte $80   ; 
- D 0 - I - 0x0292E2 0A:92D2: C0        .byte $C0   ; 
- D 0 - I - 0x0292E3 0A:92D3: E0        .byte $E0   ; 
- D 0 - I - 0x0292E4 0A:92D4: A3        .byte $A3   ; 
- D 0 - I - 0x0292E5 0A:92D5: 00        .byte $00   ; 
- D 0 - I - 0x0292E6 0A:92D6: F0        .byte $F0   ; 
- D 0 - I - 0x0292E7 0A:92D7: F5        .byte $F5   ; 
- D 0 - I - 0x0292E8 0A:92D8: 09        .byte $09   ; 
- D 0 - I - 0x0292E9 0A:92D9: F4        .byte $F4   ; 
- D 0 - I - 0x0292EA 0A:92DA: 04        .byte $04   ; 
- D 0 - I - 0x0292EB 0A:92DB: 05        .byte $05   ; 
- D 0 - I - 0x0292EC 0A:92DC: 00        .byte $00   ; 
- D 0 - I - 0x0292ED 0A:92DD: 00        .byte $00   ; 
- D 0 - I - 0x0292EE 0A:92DE: F1        .byte $F1   ; 
- D 0 - I - 0x0292EF 0A:92DF: 7C        .byte $7C   ; 
- D 0 - I - 0x0292F0 0A:92E0: BA        .byte $BA   ; 
- D 0 - I - 0x0292F1 0A:92E1: 90        .byte $90   ; 
- D 0 - I - 0x0292F2 0A:92E2: AB        .byte $AB   ; 
- D 0 - I - 0x0292F3 0A:92E3: 00        .byte $00   ; 
- D 0 - I - 0x0292F4 0A:92E4: F0        .byte $F0   ; 
- D 0 - I - 0x0292F5 0A:92E5: F5        .byte $F5   ; 
- D 0 - I - 0x0292F6 0A:92E6: 83        .byte $83   ; 
- D 0 - I - 0x0292F7 0A:92E7: F4        .byte $F4   ; 
- D 0 - I - 0x0292F8 0A:92E8: 2A        .byte $2A   ; 
- D 0 - I - 0x0292F9 0A:92E9: 2B        .byte $2B   ; 
- D 0 - I - 0x0292FA 0A:92EA: 00        .byte $00   ; 
- D 0 - I - 0x0292FB 0A:92EB: 00        .byte $00   ; 
- D 0 - I - 0x0292FC 0A:92EC: F1        .byte $F1   ; 
- D 0 - I - 0x0292FD 0A:92ED: 36        .byte $36   ; <6>
- D 0 - I - 0x0292FE 0A:92EE: 02        .byte $02   ; 
- D 0 - I - 0x0292FF 0A:92EF: 10        .byte $10   ; 
- D 0 - I - 0x029300 0A:92F0: D3        .byte $D3   ; 
- D 0 - I - 0x029301 0A:92F1: 01        .byte $01   ; 
- D 0 - I - 0x029302 0A:92F2: F0        .byte $F0   ; 
- D 0 - I - 0x029303 0A:92F3: F5        .byte $F5   ; 
- D 0 - I - 0x029304 0A:92F4: 81        .byte $81   ; 
- D 0 - I - 0x029305 0A:92F5: F4        .byte $F4   ; 
- D 0 - I - 0x029306 0A:92F6: 08        .byte $08   ; 
- D 0 - I - 0x029307 0A:92F7: 09        .byte $09   ; 
- D 0 - I - 0x029308 0A:92F8: 0A        .byte $0A   ; 
- D 0 - I - 0x029309 0A:92F9: 0B        .byte $0B   ; 
- D 0 - I - 0x02930A 0A:92FA: F1        .byte $F1   ; 
- D 0 - I - 0x02930B 0A:92FB: 98        .byte $98   ; 
- D 0 - I - 0x02930C 0A:92FC: 4B        .byte $4B   ; <K>
- D 0 - I - 0x02930D 0A:92FD: 90        .byte $90   ; 
- D 0 - I - 0x02930E 0A:92FE: B3        .byte $B3   ; 
- D 0 - I - 0x02930F 0A:92FF: 01        .byte $01   ; 
- D 0 - I - 0x029310 0A:9300: F1        .byte $F1   ; 
- D 0 - I - 0x029311 0A:9301: 98        .byte $98   ; 
- D 0 - I - 0x029312 0A:9302: 4D        .byte $4D   ; <M>
- D 0 - I - 0x029313 0A:9303: 90        .byte $90   ; 
- D 0 - I - 0x029314 0A:9304: B3        .byte $B3   ; 
- D 0 - I - 0x029315 0A:9305: 05        .byte $05   ; 
- D 0 - I - 0x029316 0A:9306: F1        .byte $F1   ; 
- D 0 - I - 0x029317 0A:9307: 98        .byte $98   ; 
- D 0 - I - 0x029318 0A:9308: 4F        .byte $4F   ; <O>
- D 0 - I - 0x029319 0A:9309: 90        .byte $90   ; 
- D 0 - I - 0x02931A 0A:930A: B3        .byte $B3   ; 
- D 0 - I - 0x02931B 0A:930B: 09        .byte $09   ; 
- D 0 - I - 0x02931C 0A:930C: F0        .byte $F0   ; 
- D 0 - I - 0x02931D 0A:930D: F5        .byte $F5   ; 
- D 0 - I - 0x02931E 0A:930E: 83        .byte $83   ; 
- D 0 - I - 0x02931F 0A:930F: F4        .byte $F4   ; 
- D 0 - I - 0x029320 0A:9310: 18        .byte $18   ; 
- D 0 - I - 0x029321 0A:9311: 19        .byte $19   ; 
- D 0 - I - 0x029322 0A:9312: 1A        .byte $1A   ; 
- D 0 - I - 0x029323 0A:9313: 1B        .byte $1B   ; 
- D 0 - I - 0x029324 0A:9314: F1        .byte $F1   ; 
- D 0 - I - 0x029325 0A:9315: E3        .byte $E3   ; 
- D 0 - I - 0x029326 0A:9316: 15        .byte $15   ; 
- D 0 - I - 0x029327 0A:9317: 64        .byte $64   ; <d>
- D 0 - I - 0x029328 0A:9318: EF        .byte $EF   ; 
- D 0 - I - 0x029329 0A:9319: 00        .byte $00   ; 
- D 0 - I - 0x02932A 0A:931A: F1        .byte $F1   ; 
- D 0 - I - 0x02932B 0A:931B: 9A        .byte $9A   ; 
- D 0 - I - 0x02932C 0A:931C: 14        .byte $14   ; 
- D 0 - I - 0x02932D 0A:931D: D0        .byte $D0   ; 
- D 0 - I - 0x02932E 0A:931E: B3        .byte $B3   ; 
- D 0 - I - 0x02932F 0A:931F: 04        .byte $04   ; 
- D 0 - I - 0x029330 0A:9320: F8        .byte $F8   ; 
- D 0 - I - 0x029331 0A:9321: A7        .byte $A7   ; 
- D 0 - I - 0x029332 0A:9322: 8B        .byte $8B   ; 
- D 0 - I - 0x029333 0A:9323: F5        .byte $F5   ; 
- D 0 - I - 0x029334 0A:9324: 81        .byte $81   ; 
- D 0 - I - 0x029335 0A:9325: F4        .byte $F4   ; 
- D 0 - I - 0x029336 0A:9326: 08        .byte $08   ; 
- D 0 - I - 0x029337 0A:9327: 09        .byte $09   ; 
- D 0 - I - 0x029338 0A:9328: 0A        .byte $0A   ; 
- D 0 - I - 0x029339 0A:9329: 0B        .byte $0B   ; 
- D 0 - I - 0x02933A 0A:932A: F1        .byte $F1   ; 
- D 0 - I - 0x02933B 0A:932B: 8B        .byte $8B   ; 
- D 0 - I - 0x02933C 0A:932C: 4B        .byte $4B   ; <K>
- D 0 - I - 0x02933D 0A:932D: 80        .byte $80   ; 
- D 0 - I - 0x02933E 0A:932E: BB        .byte $BB   ; 
- D 0 - I - 0x02933F 0A:932F: 01        .byte $01   ; 
- D 0 - I - 0x029340 0A:9330: F1        .byte $F1   ; 
- D 0 - I - 0x029341 0A:9331: 8B        .byte $8B   ; 
- D 0 - I - 0x029342 0A:9332: 4D        .byte $4D   ; <M>
- D 0 - I - 0x029343 0A:9333: 80        .byte $80   ; 
- D 0 - I - 0x029344 0A:9334: BB        .byte $BB   ; 
- D 0 - I - 0x029345 0A:9335: 05        .byte $05   ; 
- D 0 - I - 0x029346 0A:9336: F1        .byte $F1   ; 
- D 0 - I - 0x029347 0A:9337: 8B        .byte $8B   ; 
- D 0 - I - 0x029348 0A:9338: 4F        .byte $4F   ; <O>
- D 0 - I - 0x029349 0A:9339: 80        .byte $80   ; 
- D 0 - I - 0x02934A 0A:933A: BB        .byte $BB   ; 
- D 0 - I - 0x02934B 0A:933B: 09        .byte $09   ; 
- D 0 - I - 0x02934C 0A:933C: F0        .byte $F0   ; 
- D 0 - I - 0x02934D 0A:933D: F5        .byte $F5   ; 
- D 0 - I - 0x02934E 0A:933E: 81        .byte $81   ; 
- D 0 - I - 0x02934F 0A:933F: F4        .byte $F4   ; 
- D 0 - I - 0x029350 0A:9340: 08        .byte $08   ; 
- D 0 - I - 0x029351 0A:9341: 09        .byte $09   ; 
- D 0 - I - 0x029352 0A:9342: 0A        .byte $0A   ; 
- D 0 - I - 0x029353 0A:9343: 0B        .byte $0B   ; 
- D 0 - I - 0x029354 0A:9344: F1        .byte $F1   ; 
- D 0 - I - 0x029355 0A:9345: 8C        .byte $8C   ; 
- D 0 - I - 0x029356 0A:9346: 4B        .byte $4B   ; <K>
- D 0 - I - 0x029357 0A:9347: 80        .byte $80   ; 
- D 0 - I - 0x029358 0A:9348: BB        .byte $BB   ; 
- D 0 - I - 0x029359 0A:9349: 01        .byte $01   ; 
- D 0 - I - 0x02935A 0A:934A: F1        .byte $F1   ; 
- D 0 - I - 0x02935B 0A:934B: 8C        .byte $8C   ; 
- D 0 - I - 0x02935C 0A:934C: 4D        .byte $4D   ; <M>
- D 0 - I - 0x02935D 0A:934D: 80        .byte $80   ; 
- D 0 - I - 0x02935E 0A:934E: BB        .byte $BB   ; 
- D 0 - I - 0x02935F 0A:934F: 05        .byte $05   ; 
- D 0 - I - 0x029360 0A:9350: F1        .byte $F1   ; 
- D 0 - I - 0x029361 0A:9351: 8C        .byte $8C   ; 
- D 0 - I - 0x029362 0A:9352: 4F        .byte $4F   ; <O>
- D 0 - I - 0x029363 0A:9353: 80        .byte $80   ; 
- D 0 - I - 0x029364 0A:9354: BB        .byte $BB   ; 
- D 0 - I - 0x029365 0A:9355: 09        .byte $09   ; 
- D 0 - I - 0x029366 0A:9356: F0        .byte $F0   ; 
- D 0 - I - 0x029367 0A:9357: F5        .byte $F5   ; 
- D 0 - I - 0x029368 0A:9358: 80        .byte $80   ; 
- D 0 - I - 0x029369 0A:9359: F4        .byte $F4   ; 
- D 0 - I - 0x02936A 0A:935A: 08        .byte $08   ; 
- D 0 - I - 0x02936B 0A:935B: 09        .byte $09   ; 
- D 0 - I - 0x02936C 0A:935C: 0A        .byte $0A   ; 
- D 0 - I - 0x02936D 0A:935D: 0B        .byte $0B   ; 
- D 0 - I - 0x02936E 0A:935E: F1        .byte $F1   ; 
- D 0 - I - 0x02936F 0A:935F: 00        .byte $00   ; 
- D 0 - I - 0x029370 0A:9360: CD        .byte $CD   ; 
- D 0 - I - 0x029371 0A:9361: 00        .byte $00   ; 
- D 0 - I - 0x029372 0A:9362: C3        .byte $C3   ; 
- D 0 - I - 0x029373 0A:9363: 0D        .byte $0D   ; 
- D 0 - I - 0x029374 0A:9364: F1        .byte $F1   ; 
- D 0 - I - 0x029375 0A:9365: 00        .byte $00   ; 
- D 0 - I - 0x029376 0A:9366: CA        .byte $CA   ; 
- D 0 - I - 0x029377 0A:9367: 00        .byte $00   ; 
- D 0 - I - 0x029378 0A:9368: C3        .byte $C3   ; 
- D 0 - I - 0x029379 0A:9369: 01        .byte $01   ; 
- D 0 - I - 0x02937A 0A:936A: F1        .byte $F1   ; 
- D 0 - I - 0x02937B 0A:936B: 00        .byte $00   ; 
- D 0 - I - 0x02937C 0A:936C: CB        .byte $CB   ; 
- D 0 - I - 0x02937D 0A:936D: 00        .byte $00   ; 
- D 0 - I - 0x02937E 0A:936E: C3        .byte $C3   ; 
- D 0 - I - 0x02937F 0A:936F: 05        .byte $05   ; 
- D 0 - I - 0x029380 0A:9370: F0        .byte $F0   ; 
- D 0 - I - 0x029381 0A:9371: F5        .byte $F5   ; 
- D 0 - I - 0x029382 0A:9372: 09        .byte $09   ; 
- D 0 - I - 0x029383 0A:9373: F4        .byte $F4   ; 
- D 0 - I - 0x029384 0A:9374: 04        .byte $04   ; 
- D 0 - I - 0x029385 0A:9375: 05        .byte $05   ; 
- D 0 - I - 0x029386 0A:9376: 00        .byte $00   ; 
- D 0 - I - 0x029387 0A:9377: 00        .byte $00   ; 
- D 0 - I - 0x029388 0A:9378: F1        .byte $F1   ; 
- D 0 - I - 0x029389 0A:9379: 93        .byte $93   ; 
- D 0 - I - 0x02938A 0A:937A: C4        .byte $C4   ; 
- D 0 - I - 0x02938B 0A:937B: A0        .byte $A0   ; 
- D 0 - I - 0x02938C 0A:937C: A3        .byte $A3   ; 
- D 0 - I - 0x02938D 0A:937D: 00        .byte $00   ; 
- D 0 - I - 0x02938E 0A:937E: F0        .byte $F0   ; 
- D 0 - I - 0x02938F 0A:937F: F5        .byte $F5   ; 
- D 0 - I - 0x029390 0A:9380: 09        .byte $09   ; 
- D 0 - I - 0x029391 0A:9381: F4        .byte $F4   ; 
- D 0 - I - 0x029392 0A:9382: 04        .byte $04   ; 
- D 0 - I - 0x029393 0A:9383: 05        .byte $05   ; 
- D 0 - I - 0x029394 0A:9384: 00        .byte $00   ; 
- D 0 - I - 0x029395 0A:9385: 00        .byte $00   ; 
- D 0 - I - 0x029396 0A:9386: F1        .byte $F1   ; 
- D 0 - I - 0x029397 0A:9387: 94        .byte $94   ; 
- D 0 - I - 0x029398 0A:9388: BA        .byte $BA   ; 
- D 0 - I - 0x029399 0A:9389: 80        .byte $80   ; 
- D 0 - I - 0x02939A 0A:938A: E3        .byte $E3   ; 
- D 0 - I - 0x02939B 0A:938B: 00        .byte $00   ; 
- D 0 - I - 0x02939C 0A:938C: F0        .byte $F0   ; 
- D 0 - I - 0x02939D 0A:938D: F5        .byte $F5   ; 
- D 0 - I - 0x02939E 0A:938E: 09        .byte $09   ; 
- D 0 - I - 0x02939F 0A:938F: F4        .byte $F4   ; 
- D 0 - I - 0x0293A0 0A:9390: 04        .byte $04   ; 
- D 0 - I - 0x0293A1 0A:9391: 05        .byte $05   ; 
- D 0 - I - 0x0293A2 0A:9392: 00        .byte $00   ; 
- D 0 - I - 0x0293A3 0A:9393: 00        .byte $00   ; 
- D 0 - I - 0x0293A4 0A:9394: F7        .byte $F7   ; 
- D 0 - I - 0x0293A5 0A:9395: 03        .byte $03   ; 
- D 0 - I - 0x0293A6 0A:9396: 7B        .byte $7B   ; 
- D 0 - I - 0x0293A7 0A:9397: F1        .byte $F1   ; 
- D 0 - I - 0x0293A8 0A:9398: 00        .byte $00   ; 
- D 0 - I - 0x0293A9 0A:9399: 00        .byte $00   ; 
- D 0 - I - 0x0293AA 0A:939A: 80        .byte $80   ; 
- D 0 - I - 0x0293AB 0A:939B: FB        .byte $FB   ; 
- D 0 - I - 0x0293AC 0A:939C: 00        .byte $00   ; 
- D 0 - I - 0x0293AD 0A:939D: F1        .byte $F1   ; 
- D 0 - I - 0x0293AE 0A:939E: E9        .byte $E9   ; 
- D 0 - I - 0x0293AF 0A:939F: CF        .byte $CF   ; 
- D 0 - I - 0x0293B0 0A:93A0: 00        .byte $00   ; 
- D 0 - I - 0x0293B1 0A:93A1: 83        .byte $83   ; 
- D 0 - I - 0x0293B2 0A:93A2: 05        .byte $05   ; 
- D 0 - I - 0x0293B3 0A:93A3: F0        .byte $F0   ; 
- D 0 - I - 0x0293B4 0A:93A4: F5        .byte $F5   ; 
- D 0 - I - 0x0293B5 0A:93A5: 80        .byte $80   ; 
- D 0 - I - 0x0293B6 0A:93A6: F4        .byte $F4   ; 
- D 0 - I - 0x0293B7 0A:93A7: 08        .byte $08   ; 
- D 0 - I - 0x0293B8 0A:93A8: 09        .byte $09   ; 
- D 0 - I - 0x0293B9 0A:93A9: 0A        .byte $0A   ; 
- D 0 - I - 0x0293BA 0A:93AA: 0B        .byte $0B   ; 
- D 0 - I - 0x0293BB 0A:93AB: F1        .byte $F1   ; 
- D 0 - I - 0x0293BC 0A:93AC: 3A        .byte $3A   ; 
- D 0 - I - 0x0293BD 0A:93AD: 56        .byte $56   ; <V>
- D 0 - I - 0x0293BE 0A:93AE: E0        .byte $E0   ; 
- D 0 - I - 0x0293BF 0A:93AF: BB        .byte $BB   ; 
- D 0 - I - 0x0293C0 0A:93B0: 08        .byte $08   ; 
- D 0 - I - 0x0293C1 0A:93B1: F1        .byte $F1   ; 
- D 0 - I - 0x0293C2 0A:93B2: 3A        .byte $3A   ; 
- D 0 - I - 0x0293C3 0A:93B3: 4C        .byte $4C   ; <L>
- D 0 - I - 0x0293C4 0A:93B4: E0        .byte $E0   ; 
- D 0 - I - 0x0293C5 0A:93B5: BB        .byte $BB   ; 
- D 0 - I - 0x0293C6 0A:93B6: 00        .byte $00   ; 
- D 0 - I - 0x0293C7 0A:93B7: F1        .byte $F1   ; 
- D 0 - I - 0x0293C8 0A:93B8: 3A        .byte $3A   ; 
- D 0 - I - 0x0293C9 0A:93B9: 4E        .byte $4E   ; <N>
- D 0 - I - 0x0293CA 0A:93BA: E0        .byte $E0   ; 
- D 0 - I - 0x0293CB 0A:93BB: BB        .byte $BB   ; 
- D 0 - I - 0x0293CC 0A:93BC: 04        .byte $04   ; 
- D 0 - I - 0x0293CD 0A:93BD: 14        .byte $14   ; 
- D 0 - I - 0x0293CE 0A:93BE: F1        .byte $F1   ; 
- D 0 - I - 0x0293CF 0A:93BF: 3F        .byte $3F   ; 
- D 0 - I - 0x0293D0 0A:93C0: 49        .byte $49   ; <I>
- D 0 - I - 0x0293D1 0A:93C1: 28        .byte $28   ; 
- D 0 - I - 0x0293D2 0A:93C2: EB        .byte $EB   ; 
- D 0 - I - 0x0293D3 0A:93C3: 01        .byte $01   ; 
- D 0 - I - 0x0293D4 0A:93C4: F1        .byte $F1   ; 
- D 0 - I - 0x0293D5 0A:93C5: 3E        .byte $3E   ; 
- D 0 - I - 0x0293D6 0A:93C6: 5C        .byte $5C   ; 
- D 0 - I - 0x0293D7 0A:93C7: 00        .byte $00   ; 
- D 0 - I - 0x0293D8 0A:93C8: C3        .byte $C3   ; 
- D 0 - I - 0x0293D9 0A:93C9: 05        .byte $05   ; 
- D 0 - I - 0x0293DA 0A:93CA: F1        .byte $F1   ; 
- D 0 - I - 0x0293DB 0A:93CB: 3E        .byte $3E   ; 
- D 0 - I - 0x0293DC 0A:93CC: 5D        .byte $5D   ; 
- D 0 - I - 0x0293DD 0A:93CD: 00        .byte $00   ; 
- D 0 - I - 0x0293DE 0A:93CE: C3        .byte $C3   ; 
- D 0 - I - 0x0293DF 0A:93CF: 09        .byte $09   ; 
- D 0 - I - 0x0293E0 0A:93D0: F1        .byte $F1   ; 
- D 0 - I - 0x0293E1 0A:93D1: 3E        .byte $3E   ; 
- D 0 - I - 0x0293E2 0A:93D2: 5E        .byte $5E   ; 
- D 0 - I - 0x0293E3 0A:93D3: 00        .byte $00   ; 
- D 0 - I - 0x0293E4 0A:93D4: C3        .byte $C3   ; 
- D 0 - I - 0x0293E5 0A:93D5: 0D        .byte $0D   ; 
- D 0 - I - 0x0293E6 0A:93D6: 14        .byte $14   ; 
- D 0 - I - 0x0293E7 0A:93D7: F6        .byte $F6   ; 
- D 0 - I - 0x0293E8 0A:93D8: 3F        .byte $3F   ; 
- D 0 - I - 0x0293E9 0A:93D9: F1        .byte $F1   ; 
- D 0 - I - 0x0293EA 0A:93DA: 3D        .byte $3D   ; 
- D 0 - I - 0x0293EB 0A:93DB: 56        .byte $56   ; <V>
- D 0 - I - 0x0293EC 0A:93DC: AB        .byte $AB   ; 
- D 0 - I - 0x0293ED 0A:93DD: C3        .byte $C3   ; 
- D 0 - I - 0x0293EE 0A:93DE: 08        .byte $08   ; 
- D 0 - I - 0x0293EF 0A:93DF: F1        .byte $F1   ; 
- D 0 - I - 0x0293F0 0A:93E0: 3D        .byte $3D   ; 
- D 0 - I - 0x0293F1 0A:93E1: 4C        .byte $4C   ; <L>
- D 0 - I - 0x0293F2 0A:93E2: AB        .byte $AB   ; 
- D 0 - I - 0x0293F3 0A:93E3: C3        .byte $C3   ; 
- D 0 - I - 0x0293F4 0A:93E4: 00        .byte $00   ; 
- D 0 - I - 0x0293F5 0A:93E5: F1        .byte $F1   ; 
- D 0 - I - 0x0293F6 0A:93E6: 3D        .byte $3D   ; 
- D 0 - I - 0x0293F7 0A:93E7: 4E        .byte $4E   ; <N>
- D 0 - I - 0x0293F8 0A:93E8: AB        .byte $AB   ; 
- D 0 - I - 0x0293F9 0A:93E9: C3        .byte $C3   ; 
- D 0 - I - 0x0293FA 0A:93EA: 04        .byte $04   ; 
- D 0 - I - 0x0293FB 0A:93EB: F0        .byte $F0   ; 
- D 0 - I - 0x0293FC 0A:93EC: F5        .byte $F5   ; 
- D 0 - I - 0x0293FD 0A:93ED: 80        .byte $80   ; 
- D 0 - I - 0x0293FE 0A:93EE: F4        .byte $F4   ; 
- D 0 - I - 0x0293FF 0A:93EF: 10        .byte $10   ; 
- D 0 - I - 0x029400 0A:93F0: 11        .byte $11   ; 
- D 0 - I - 0x029401 0A:93F1: 12        .byte $12   ; 
- D 0 - I - 0x029402 0A:93F2: 00        .byte $00   ; 
- D 0 - I - 0x029403 0A:93F3: F1        .byte $F1   ; 
- D 0 - I - 0x029404 0A:93F4: DB        .byte $DB   ; 
- D 0 - I - 0x029405 0A:93F5: 2D        .byte $2D   ; 
- D 0 - I - 0x029406 0A:93F6: 18        .byte $18   ; 
- D 0 - I - 0x029407 0A:93F7: B3        .byte $B3   ; 
- D 0 - I - 0x029408 0A:93F8: 01        .byte $01   ; 
- D 0 - I - 0x029409 0A:93F9: F1        .byte $F1   ; 
- D 0 - I - 0x02940A 0A:93FA: 59        .byte $59   ; <Y>
- D 0 - I - 0x02940B 0A:93FB: 2E        .byte $2E   ; 
- D 0 - I - 0x02940C 0A:93FC: 20        .byte $20   ; 
- D 0 - I - 0x02940D 0A:93FD: AB        .byte $AB   ; 
- D 0 - I - 0x02940E 0A:93FE: 05        .byte $05   ; 
- D 0 - I - 0x02940F 0A:93FF: 64        .byte $64   ; <d>
- D 0 - I - 0x029410 0A:9400: F6        .byte $F6   ; 
- D 0 - I - 0x029411 0A:9401: 15        .byte $15   ; 
- D 0 - I - 0x029412 0A:9402: F0        .byte $F0   ; 
- D 0 - I - 0x029413 0A:9403: F5        .byte $F5   ; 
- D 0 - I - 0x029414 0A:9404: 85        .byte $85   ; 
- D 0 - I - 0x029415 0A:9405: F4        .byte $F4   ; 
- D 0 - I - 0x029416 0A:9406: 41        .byte $41   ; <A>
- D 0 - I - 0x029417 0A:9407: 04        .byte $04   ; 
- D 0 - I - 0x029418 0A:9408: 00        .byte $00   ; 
- D 0 - I - 0x029419 0A:9409: 00        .byte $00   ; 
- D 0 - I - 0x02941A 0A:940A: F1        .byte $F1   ; 
- D 0 - I - 0x02941B 0A:940B: 00        .byte $00   ; 
- D 0 - I - 0x02941C 0A:940C: 2F        .byte $2F   ; 
- D 0 - I - 0x02941D 0A:940D: 00        .byte $00   ; 
- D 0 - I - 0x02941E 0A:940E: D3        .byte $D3   ; 
- D 0 - I - 0x02941F 0A:940F: 01        .byte $01   ; 
- D 0 - I - 0x029420 0A:9410: F0        .byte $F0   ; 
- D 0 - I - 0x029421 0A:9411: F5        .byte $F5   ; 
- D 0 - I - 0x029422 0A:9412: 80        .byte $80   ; 
- D 0 - I - 0x029423 0A:9413: F4        .byte $F4   ; 
- D 0 - I - 0x029424 0A:9414: 04        .byte $04   ; 
- D 0 - I - 0x029425 0A:9415: 05        .byte $05   ; 
- D 0 - I - 0x029426 0A:9416: 23        .byte $23   ; 
- D 0 - I - 0x029427 0A:9417: 00        .byte $00   ; 
- D 0 - I - 0x029428 0A:9418: F1        .byte $F1   ; 
- D 0 - I - 0x029429 0A:9419: A8        .byte $A8   ; 
- D 0 - I - 0x02942A 0A:941A: CF        .byte $CF   ; 
- D 0 - I - 0x02942B 0A:941B: 10        .byte $10   ; 
- D 0 - I - 0x02942C 0A:941C: D3        .byte $D3   ; 
- D 0 - I - 0x02942D 0A:941D: 01        .byte $01   ; 
- D 0 - I - 0x02942E 0A:941E: F1        .byte $F1   ; 
- D 0 - I - 0x02942F 0A:941F: 5A        .byte $5A   ; <Z>
- D 0 - I - 0x029430 0A:9420: E7        .byte $E7   ; 
- D 0 - I - 0x029431 0A:9421: 10        .byte $10   ; 
- D 0 - I - 0x029432 0A:9422: CB        .byte $CB   ; 
- D 0 - I - 0x029433 0A:9423: 05        .byte $05   ; 
- D 0 - I - 0x029434 0A:9424: F0        .byte $F0   ; 
- D 0 - I - 0x029435 0A:9425: F5        .byte $F5   ; 
- D 0 - I - 0x029436 0A:9426: 80        .byte $80   ; 
- D 0 - I - 0x029437 0A:9427: F4        .byte $F4   ; 
- D 0 - I - 0x029438 0A:9428: 13        .byte $13   ; 
- D 0 - I - 0x029439 0A:9429: 00        .byte $00   ; 
- D 0 - I - 0x02943A 0A:942A: 00        .byte $00   ; 
- D 0 - I - 0x02943B 0A:942B: 00        .byte $00   ; 
- D 0 - I - 0x02943C 0A:942C: F1        .byte $F1   ; 
- D 0 - I - 0x02943D 0A:942D: 40        .byte $40   ; 
- D 0 - I - 0x02943E 0A:942E: 29        .byte $29   ; 
- D 0 - I - 0x02943F 0A:942F: D8        .byte $D8   ; 
- D 0 - I - 0x029440 0A:9430: CB        .byte $CB   ; 
- D 0 - I - 0x029441 0A:9431: 00        .byte $00   ; 
- D 0 - I - 0x029442 0A:9432: F0        .byte $F0   ; 
- - - - - - 0x029443 0A:9433: F5        .byte $F5   ; 
- - - - - - 0x029444 0A:9434: 09        .byte $09   ; 
- - - - - - 0x029445 0A:9435: F4        .byte $F4   ; 
- - - - - - 0x029446 0A:9436: 06        .byte $06   ; 
- - - - - - 0x029447 0A:9437: 00        .byte $00   ; 
- - - - - - 0x029448 0A:9438: 00        .byte $00   ; 
- - - - - - 0x029449 0A:9439: 00        .byte $00   ; 
- - - - - - 0x02944A 0A:943A: F1        .byte $F1   ; 
- - - - - - 0x02944B 0A:943B: 5C        .byte $5C   ; 
- - - - - - 0x02944C 0A:943C: B5        .byte $B5   ; 
- - - - - - 0x02944D 0A:943D: 00        .byte $00   ; 
- - - - - - 0x02944E 0A:943E: 93        .byte $93   ; 
- - - - - - 0x02944F 0A:943F: 01        .byte $01   ; 
- - - - - - 0x029450 0A:9440: F0        .byte $F0   ; 
- D 0 - I - 0x029451 0A:9441: F5        .byte $F5   ; 
- D 0 - I - 0x029452 0A:9442: 80        .byte $80   ; 
- D 0 - I - 0x029453 0A:9443: F4        .byte $F4   ; 
- D 0 - I - 0x029454 0A:9444: 04        .byte $04   ; 
- D 0 - I - 0x029455 0A:9445: 05        .byte $05   ; 
- D 0 - I - 0x029456 0A:9446: 22        .byte $22   ; 
- D 0 - I - 0x029457 0A:9447: 00        .byte $00   ; 
- D 0 - I - 0x029458 0A:9448: F1        .byte $F1   ; 
- D 0 - I - 0x029459 0A:9449: 5D        .byte $5D   ; 
- D 0 - I - 0x02945A 0A:944A: 31        .byte $31   ; <1>
- D 0 - I - 0x02945B 0A:944B: B0        .byte $B0   ; 
- D 0 - I - 0x02945C 0A:944C: D3        .byte $D3   ; 
- D 0 - I - 0x02945D 0A:944D: 04        .byte $04   ; 
- D 0 - I - 0x02945E 0A:944E: 06        .byte $06   ; 
- D 0 - I - 0x02945F 0A:944F: F1        .byte $F1   ; 
- D 0 - I - 0x029460 0A:9450: A9        .byte $A9   ; 
- D 0 - I - 0x029461 0A:9451: C4        .byte $C4   ; 
- D 0 - I - 0x029462 0A:9452: B8        .byte $B8   ; 
- D 0 - I - 0x029463 0A:9453: DB        .byte $DB   ; 
- D 0 - I - 0x029464 0A:9454: 00        .byte $00   ; 
- D 0 - I - 0x029465 0A:9455: F0        .byte $F0   ; 
- D 0 - I - 0x029466 0A:9456: F5        .byte $F5   ; 
- D 0 - I - 0x029467 0A:9457: 09        .byte $09   ; 
- D 0 - I - 0x029468 0A:9458: F4        .byte $F4   ; 
- D 0 - I - 0x029469 0A:9459: 04        .byte $04   ; 
- D 0 - I - 0x02946A 0A:945A: 05        .byte $05   ; 
- D 0 - I - 0x02946B 0A:945B: 00        .byte $00   ; 
- D 0 - I - 0x02946C 0A:945C: 00        .byte $00   ; 
- D 0 - I - 0x02946D 0A:945D: F1        .byte $F1   ; 
- D 0 - I - 0x02946E 0A:945E: 00        .byte $00   ; 
- D 0 - I - 0x02946F 0A:945F: 00        .byte $00   ; 
- D 0 - I - 0x029470 0A:9460: 80        .byte $80   ; 
- D 0 - I - 0x029471 0A:9461: FB        .byte $FB   ; 
- D 0 - I - 0x029472 0A:9462: 00        .byte $00   ; 
- D 0 - I - 0x029473 0A:9463: F1        .byte $F1   ; 
- D 0 - I - 0x029474 0A:9464: EA        .byte $EA   ; 
- D 0 - I - 0x029475 0A:9465: 23        .byte $23   ; 
- D 0 - I - 0x029476 0A:9466: 70        .byte $70   ; <p>
- D 0 - I - 0x029477 0A:9467: CB        .byte $CB   ; 
- D 0 - I - 0x029478 0A:9468: 05        .byte $05   ; 
- D 0 - I - 0x029479 0A:9469: F0        .byte $F0   ; 
- D 0 - I - 0x02947A 0A:946A: F5        .byte $F5   ; 
- D 0 - I - 0x02947B 0A:946B: 80        .byte $80   ; 
- D 0 - I - 0x02947C 0A:946C: F4        .byte $F4   ; 
- D 0 - I - 0x02947D 0A:946D: 04        .byte $04   ; 
- D 0 - I - 0x02947E 0A:946E: 05        .byte $05   ; 
- D 0 - I - 0x02947F 0A:946F: 20        .byte $20   ; 
- D 0 - I - 0x029480 0A:9470: 21        .byte $21   ; 
- D 0 - I - 0x029481 0A:9471: F1        .byte $F1   ; 
- D 0 - I - 0x029482 0A:9472: AA        .byte $AA   ; 
- D 0 - I - 0x029483 0A:9473: C6        .byte $C6   ; 
- D 0 - I - 0x029484 0A:9474: 90        .byte $90   ; 
- D 0 - I - 0x029485 0A:9475: CB        .byte $CB   ; 
- D 0 - I - 0x029486 0A:9476: 00        .byte $00   ; 
- D 0 - I - 0x029487 0A:9477: F1        .byte $F1   ; 
- D 0 - I - 0x029488 0A:9478: 5E        .byte $5E   ; 
- D 0 - I - 0x029489 0A:9479: 32        .byte $32   ; <2>
- D 0 - I - 0x02948A 0A:947A: 80        .byte $80   ; 
- D 0 - I - 0x02948B 0A:947B: 9B        .byte $9B   ; 
- D 0 - I - 0x02948C 0A:947C: 05        .byte $05   ; 
- D 0 - I - 0x02948D 0A:947D: F0        .byte $F0   ; 
- D 0 - I - 0x02948E 0A:947E: F5        .byte $F5   ; 
- D 0 - I - 0x02948F 0A:947F: 80        .byte $80   ; 
- D 0 - I - 0x029490 0A:9480: F4        .byte $F4   ; 
- D 0 - I - 0x029491 0A:9481: 16        .byte $16   ; 
- D 0 - I - 0x029492 0A:9482: 17        .byte $17   ; 
- D 0 - I - 0x029493 0A:9483: 2D        .byte $2D   ; 
- D 0 - I - 0x029494 0A:9484: 53        .byte $53   ; <S>
- D 0 - I - 0x029495 0A:9485: F1        .byte $F1   ; 
- D 0 - I - 0x029496 0A:9486: 00        .byte $00   ; 
- D 0 - I - 0x029497 0A:9487: 46        .byte $46   ; <F>
- D 0 - I - 0x029498 0A:9488: 08        .byte $08   ; 
- D 0 - I - 0x029499 0A:9489: BB        .byte $BB   ; 
- D 0 - I - 0x02949A 0A:948A: 01        .byte $01   ; 
- D 0 - I - 0x02949B 0A:948B: F0        .byte $F0   ; 
- D 0 - I - 0x02949C 0A:948C: F5        .byte $F5   ; 
- D 0 - I - 0x02949D 0A:948D: 80        .byte $80   ; 
- D 0 - I - 0x02949E 0A:948E: F4        .byte $F4   ; 
- D 0 - I - 0x02949F 0A:948F: 04        .byte $04   ; 
- D 0 - I - 0x0294A0 0A:9490: 05        .byte $05   ; 
- D 0 - I - 0x0294A1 0A:9491: 20        .byte $20   ; 
- D 0 - I - 0x0294A2 0A:9492: 21        .byte $21   ; 
- D 0 - I - 0x0294A3 0A:9493: F1        .byte $F1   ; 
- D 0 - I - 0x0294A4 0A:9494: AB        .byte $AB   ; 
- D 0 - I - 0x0294A5 0A:9495: CF        .byte $CF   ; 
- D 0 - I - 0x0294A6 0A:9496: E8        .byte $E8   ; 
- D 0 - I - 0x0294A7 0A:9497: DB        .byte $DB   ; 
- D 0 - I - 0x0294A8 0A:9498: 00        .byte $00   ; 
- D 0 - I - 0x0294A9 0A:9499: F1        .byte $F1   ; 
- D 0 - I - 0x0294AA 0A:949A: 2D        .byte $2D   ; 
- D 0 - I - 0x0294AB 0A:949B: 33        .byte $33   ; <3>
- D 0 - I - 0x0294AC 0A:949C: F8        .byte $F8   ; 
- D 0 - I - 0x0294AD 0A:949D: CB        .byte $CB   ; 
- D 0 - I - 0x0294AE 0A:949E: 04        .byte $04   ; 
- D 0 - I - 0x0294AF 0A:949F: F8        .byte $F8   ; 
- D 0 - I - 0x0294B0 0A:94A0: A7        .byte $A7   ; 
- D 0 - I - 0x0294B1 0A:94A1: 8B        .byte $8B   ; 
- D 0 - I - 0x0294B2 0A:94A2: F5        .byte $F5   ; 
- D 0 - I - 0x0294B3 0A:94A3: 80        .byte $80   ; 
- D 0 - I - 0x0294B4 0A:94A4: F4        .byte $F4   ; 
- D 0 - I - 0x0294B5 0A:94A5: 08        .byte $08   ; 
- D 0 - I - 0x0294B6 0A:94A6: 09        .byte $09   ; 
- D 0 - I - 0x0294B7 0A:94A7: 0A        .byte $0A   ; 
- D 0 - I - 0x0294B8 0A:94A8: 0B        .byte $0B   ; 
- D 0 - I - 0x0294B9 0A:94A9: F1        .byte $F1   ; 
- D 0 - I - 0x0294BA 0A:94AA: 42        .byte $42   ; <B>
- D 0 - I - 0x0294BB 0A:94AB: 4C        .byte $4C   ; <L>
- D 0 - I - 0x0294BC 0A:94AC: 80        .byte $80   ; 
- D 0 - I - 0x0294BD 0A:94AD: BB        .byte $BB   ; 
- D 0 - I - 0x0294BE 0A:94AE: 00        .byte $00   ; 
- D 0 - I - 0x0294BF 0A:94AF: F1        .byte $F1   ; 
- D 0 - I - 0x0294C0 0A:94B0: 42        .byte $42   ; <B>
- D 0 - I - 0x0294C1 0A:94B1: 4E        .byte $4E   ; <N>
- D 0 - I - 0x0294C2 0A:94B2: 80        .byte $80   ; 
- D 0 - I - 0x0294C3 0A:94B3: BB        .byte $BB   ; 
- D 0 - I - 0x0294C4 0A:94B4: 04        .byte $04   ; 
- D 0 - I - 0x0294C5 0A:94B5: F1        .byte $F1   ; 
- D 0 - I - 0x0294C6 0A:94B6: 42        .byte $42   ; <B>
- D 0 - I - 0x0294C7 0A:94B7: 50        .byte $50   ; <P>
- D 0 - I - 0x0294C8 0A:94B8: 80        .byte $80   ; 
- D 0 - I - 0x0294C9 0A:94B9: BB        .byte $BB   ; 
- D 0 - I - 0x0294CA 0A:94BA: 08        .byte $08   ; 
- D 0 - I - 0x0294CB 0A:94BB: F0        .byte $F0   ; 
- D 0 - I - 0x0294CC 0A:94BC: F5        .byte $F5   ; 
- D 0 - I - 0x0294CD 0A:94BD: 80        .byte $80   ; 
- D 0 - I - 0x0294CE 0A:94BE: F4        .byte $F4   ; 
- D 0 - I - 0x0294CF 0A:94BF: 24        .byte $24   ; 
- D 0 - I - 0x0294D0 0A:94C0: 25        .byte $25   ; 
- D 0 - I - 0x0294D1 0A:94C1: 26        .byte $26   ; 
- D 0 - I - 0x0294D2 0A:94C2: 4F        .byte $4F   ; <O>
- D 0 - I - 0x0294D3 0A:94C3: F1        .byte $F1   ; 
- D 0 - I - 0x0294D4 0A:94C4: 1A        .byte $1A   ; 
- D 0 - I - 0x0294D5 0A:94C5: 07        .byte $07   ; 
- D 0 - I - 0x0294D6 0A:94C6: 4C        .byte $4C   ; <L>
- D 0 - I - 0x0294D7 0A:94C7: 76        .byte $76   ; <v>
- D 0 - I - 0x0294D8 0A:94C8: 00        .byte $00   ; 
- D 0 - I - 0x0294D9 0A:94C9: F1        .byte $F1   ; 
- D 0 - I - 0x0294DA 0A:94CA: A0        .byte $A0   ; 
- D 0 - I - 0x0294DB 0A:94CB: 06        .byte $06   ; 
- D 0 - I - 0x0294DC 0A:94CC: 10        .byte $10   ; 
- D 0 - I - 0x0294DD 0A:94CD: B3        .byte $B3   ; 
- D 0 - I - 0x0294DE 0A:94CE: 05        .byte $05   ; 
- D 0 - I - 0x0294DF 0A:94CF: F9        .byte $F9   ; 
- D 0 - I - 0x0294E0 0A:94D0: 0F        .byte $0F   ; 
- D 0 - I - 0x0294E1 0A:94D1: 01        .byte $01   ; 
- D 0 - I - 0x0294E2 0A:94D2: FB        .byte $FB   ; 
- D 0 - I - 0x0294E3 0A:94D3: 10        .byte $10   ; 
- D 0 - I - 0x0294E4 0A:94D4: 23        .byte $23   ; 
- D 0 - I - 0x0294E5 0A:94D5: 45        .byte $45   ; <E>
- D 0 - I - 0x0294E6 0A:94D6: 01        .byte $01   ; 
- D 0 - I - 0x0294E7 0A:94D7: FB        .byte $FB   ; 
- D 0 - I - 0x0294E8 0A:94D8: 01        .byte $01   ; 
- D 0 - I - 0x0294E9 0A:94D9: 23        .byte $23   ; 
- D 0 - I - 0x0294EA 0A:94DA: 45        .byte $45   ; <E>
- D 0 - I - 0x0294EB 0A:94DB: FA        .byte $FA   ; 
- D 0 - I - 0x0294EC 0A:94DC: F6        .byte $F6   ; 
- D 0 - I - 0x0294ED 0A:94DD: 00        .byte $00   ; 
- D 0 - I - 0x0294EE 0A:94DE: F1        .byte $F1   ; 
- D 0 - I - 0x0294EF 0A:94DF: 00        .byte $00   ; 
- D 0 - I - 0x0294F0 0A:94E0: 39        .byte $39   ; <9>
- D 0 - I - 0x0294F1 0A:94E1: F9        .byte $F9   ; 
- D 0 - I - 0x0294F2 0A:94E2: BB        .byte $BB   ; 
- D 0 - I - 0x0294F3 0A:94E3: 04        .byte $04   ; 
- D 0 - I - 0x0294F4 0A:94E4: 04        .byte $04   ; 
- D 0 - I - 0x0294F5 0A:94E5: F1        .byte $F1   ; 
- D 0 - I - 0x0294F6 0A:94E6: A1        .byte $A1   ; 
- D 0 - I - 0x0294F7 0A:94E7: 07        .byte $07   ; 
- D 0 - I - 0x0294F8 0A:94E8: E4        .byte $E4   ; 
- D 0 - I - 0x0294F9 0A:94E9: CF        .byte $CF   ; 
- D 0 - I - 0x0294FA 0A:94EA: 00        .byte $00   ; 
- D 0 - I - 0x0294FB 0A:94EB: F1        .byte $F1   ; 
- D 0 - I - 0x0294FC 0A:94EC: 26        .byte $26   ; 
- D 0 - I - 0x0294FD 0A:94ED: 06        .byte $06   ; 
- D 0 - I - 0x0294FE 0A:94EE: F9        .byte $F9   ; 
- D 0 - I - 0x0294FF 0A:94EF: BB        .byte $BB   ; 
- D 0 - I - 0x029500 0A:94F0: 04        .byte $04   ; 
- D 0 - I - 0x029501 0A:94F1: F8        .byte $F8   ; 
- D 0 - I - 0x029502 0A:94F2: A7        .byte $A7   ; 
- D 0 - I - 0x029503 0A:94F3: 8B        .byte $8B   ; 
- D 0 - I - 0x029504 0A:94F4: F5        .byte $F5   ; 
- D 0 - I - 0x029505 0A:94F5: 80        .byte $80   ; 
- D 0 - I - 0x029506 0A:94F6: F4        .byte $F4   ; 
- D 0 - I - 0x029507 0A:94F7: 24        .byte $24   ; 
- D 0 - I - 0x029508 0A:94F8: 25        .byte $25   ; 
- D 0 - I - 0x029509 0A:94F9: 26        .byte $26   ; 
- D 0 - I - 0x02950A 0A:94FA: 4F        .byte $4F   ; <O>
- D 0 - I - 0x02950B 0A:94FB: F1        .byte $F1   ; 
- D 0 - I - 0x02950C 0A:94FC: A2        .byte $A2   ; 
- D 0 - I - 0x02950D 0A:94FD: 0A        .byte $0A   ; 
- D 0 - I - 0x02950E 0A:94FE: 5F        .byte $5F   ; 
- D 0 - I - 0x02950F 0A:94FF: 7B        .byte $7B   ; 
- D 0 - I - 0x029510 0A:9500: 00        .byte $00   ; 
- D 0 - I - 0x029511 0A:9501: F1        .byte $F1   ; 
- D 0 - I - 0x029512 0A:9502: A0        .byte $A0   ; 
- D 0 - I - 0x029513 0A:9503: 09        .byte $09   ; 
- D 0 - I - 0x029514 0A:9504: 10        .byte $10   ; 
- D 0 - I - 0x029515 0A:9505: B3        .byte $B3   ; 
- D 0 - I - 0x029516 0A:9506: 05        .byte $05   ; 
- D 0 - I - 0x029517 0A:9507: F9        .byte $F9   ; 
- D 0 - I - 0x029518 0A:9508: 0F        .byte $0F   ; 
- D 0 - I - 0x029519 0A:9509: 01        .byte $01   ; 
- D 0 - I - 0x02951A 0A:950A: FB        .byte $FB   ; 
- D 0 - I - 0x02951B 0A:950B: 10        .byte $10   ; 
- D 0 - I - 0x02951C 0A:950C: 23        .byte $23   ; 
- D 0 - I - 0x02951D 0A:950D: 45        .byte $45   ; <E>
- D 0 - I - 0x02951E 0A:950E: 01        .byte $01   ; 
- D 0 - I - 0x02951F 0A:950F: FB        .byte $FB   ; 
- D 0 - I - 0x029520 0A:9510: 01        .byte $01   ; 
- D 0 - I - 0x029521 0A:9511: 23        .byte $23   ; 
- D 0 - I - 0x029522 0A:9512: 45        .byte $45   ; <E>
- D 0 - I - 0x029523 0A:9513: FA        .byte $FA   ; 
- D 0 - I - 0x029524 0A:9514: F6        .byte $F6   ; 
- D 0 - I - 0x029525 0A:9515: 00        .byte $00   ; 
- D 0 - I - 0x029526 0A:9516: F1        .byte $F1   ; 
- D 0 - I - 0x029527 0A:9517: 00        .byte $00   ; 
- D 0 - I - 0x029528 0A:9518: 3B        .byte $3B   ; 
- D 0 - I - 0x029529 0A:9519: F9        .byte $F9   ; 
- D 0 - I - 0x02952A 0A:951A: BB        .byte $BB   ; 
- D 0 - I - 0x02952B 0A:951B: 04        .byte $04   ; 
- D 0 - I - 0x02952C 0A:951C: 04        .byte $04   ; 
- D 0 - I - 0x02952D 0A:951D: F1        .byte $F1   ; 
- D 0 - I - 0x02952E 0A:951E: A3        .byte $A3   ; 
- D 0 - I - 0x02952F 0A:951F: 0A        .byte $0A   ; 
- D 0 - I - 0x029530 0A:9520: F0        .byte $F0   ; 
- D 0 - I - 0x029531 0A:9521: BB        .byte $BB   ; 
- D 0 - I - 0x029532 0A:9522: 00        .byte $00   ; 
- D 0 - I - 0x029533 0A:9523: F1        .byte $F1   ; 
- D 0 - I - 0x029534 0A:9524: 26        .byte $26   ; 
- D 0 - I - 0x029535 0A:9525: 09        .byte $09   ; 
- D 0 - I - 0x029536 0A:9526: F9        .byte $F9   ; 
- D 0 - I - 0x029537 0A:9527: BB        .byte $BB   ; 
- D 0 - I - 0x029538 0A:9528: 04        .byte $04   ; 
- D 0 - I - 0x029539 0A:9529: F8        .byte $F8   ; 
- D 0 - I - 0x02953A 0A:952A: A7        .byte $A7   ; 
- D 0 - I - 0x02953B 0A:952B: 8B        .byte $8B   ; 
- D 0 - I - 0x02953C 0A:952C: F5        .byte $F5   ; 
- D 0 - I - 0x02953D 0A:952D: 80        .byte $80   ; 
- D 0 - I - 0x02953E 0A:952E: F4        .byte $F4   ; 
- D 0 - I - 0x02953F 0A:952F: 0C        .byte $0C   ; 
- D 0 - I - 0x029540 0A:9530: 0D        .byte $0D   ; 
- D 0 - I - 0x029541 0A:9531: 0E        .byte $0E   ; 
- D 0 - I - 0x029542 0A:9532: 0F        .byte $0F   ; 
- D 0 - I - 0x029543 0A:9533: F1        .byte $F1   ; 
- D 0 - I - 0x029544 0A:9534: 33        .byte $33   ; <3>
- D 0 - I - 0x029545 0A:9535: 1E        .byte $1E   ; 
- D 0 - I - 0x029546 0A:9536: 60        .byte $60   ; 
- D 0 - I - 0x029547 0A:9537: 97        .byte $97   ; 
- D 0 - I - 0x029548 0A:9538: 04        .byte $04   ; 
- D 0 - I - 0x029549 0A:9539: F1        .byte $F1   ; 
- D 0 - I - 0x02954A 0A:953A: 24        .byte $24   ; 
- D 0 - I - 0x02954B 0A:953B: 1D        .byte $1D   ; 
- D 0 - I - 0x02954C 0A:953C: 20        .byte $20   ; 
- D 0 - I - 0x02954D 0A:953D: B7        .byte $B7   ; 
- D 0 - I - 0x02954E 0A:953E: 09        .byte $09   ; 
- D 0 - I - 0x02954F 0A:953F: 1E        .byte $1E   ; 
- D 0 - I - 0x029550 0A:9540: F6        .byte $F6   ; 
- D 0 - I - 0x029551 0A:9541: 2A        .byte $2A   ; 
- D 0 - I - 0x029552 0A:9542: F1        .byte $F1   ; 
- D 0 - I - 0x029553 0A:9543: 34        .byte $34   ; <4>
- D 0 - I - 0x029554 0A:9544: 21        .byte $21   ; 
- D 0 - I - 0x029555 0A:9545: 10        .byte $10   ; 
- D 0 - I - 0x029556 0A:9546: B7        .byte $B7   ; 
- D 0 - I - 0x029557 0A:9547: 01        .byte $01   ; 
- D 0 - I - 0x029558 0A:9548: F0        .byte $F0   ; 
- D 0 - I - 0x029559 0A:9549: F5        .byte $F5   ; 
- D 0 - I - 0x02955A 0A:954A: 80        .byte $80   ; 
- D 0 - I - 0x02955B 0A:954B: F4        .byte $F4   ; 
- D 0 - I - 0x02955C 0A:954C: 08        .byte $08   ; 
- D 0 - I - 0x02955D 0A:954D: 09        .byte $09   ; 
- D 0 - I - 0x02955E 0A:954E: 0A        .byte $0A   ; 
- D 0 - I - 0x02955F 0A:954F: 0B        .byte $0B   ; 
- D 0 - I - 0x029560 0A:9550: F1        .byte $F1   ; 
- D 0 - I - 0x029561 0A:9551: 33        .byte $33   ; <3>
- D 0 - I - 0x029562 0A:9552: 49        .byte $49   ; <I>
- D 0 - I - 0x029563 0A:9553: 60        .byte $60   ; 
- D 0 - I - 0x029564 0A:9554: E3        .byte $E3   ; 
- D 0 - I - 0x029565 0A:9555: 04        .byte $04   ; 
- D 0 - I - 0x029566 0A:9556: F1        .byte $F1   ; 
- D 0 - I - 0x029567 0A:9557: 67        .byte $67   ; <g>
- D 0 - I - 0x029568 0A:9558: 94        .byte $94   ; 
- D 0 - I - 0x029569 0A:9559: F0        .byte $F0   ; 
- D 0 - I - 0x02956A 0A:955A: BB        .byte $BB   ; 
- D 0 - I - 0x02956B 0A:955B: 00        .byte $00   ; 
- D 0 - I - 0x02956C 0A:955C: F1        .byte $F1   ; 
- D 0 - I - 0x02956D 0A:955D: 67        .byte $67   ; <g>
- D 0 - I - 0x02956E 0A:955E: 95        .byte $95   ; 
- D 0 - I - 0x02956F 0A:955F: F0        .byte $F0   ; 
- D 0 - I - 0x029570 0A:9560: BB        .byte $BB   ; 
- D 0 - I - 0x029571 0A:9561: 08        .byte $08   ; 
- D 0 - I - 0x029572 0A:9562: F1        .byte $F1   ; 
- D 0 - I - 0x029573 0A:9563: 67        .byte $67   ; <g>
- D 0 - I - 0x029574 0A:9564: 96        .byte $96   ; 
- D 0 - I - 0x029575 0A:9565: F0        .byte $F0   ; 
- D 0 - I - 0x029576 0A:9566: BB        .byte $BB   ; 
- D 0 - I - 0x029577 0A:9567: 0C        .byte $0C   ; 
- D 0 - I - 0x029578 0A:9568: 1E        .byte $1E   ; 
- D 0 - I - 0x029579 0A:9569: F4        .byte $F4   ; 
- D 0 - I - 0x02957A 0A:956A: 0A        .byte $0A   ; 
- D 0 - I - 0x02957B 0A:956B: 0B        .byte $0B   ; 
- D 0 - I - 0x02957C 0A:956C: 00        .byte $00   ; 
- D 0 - I - 0x02957D 0A:956D: 0B        .byte $0B   ; 
- D 0 - I - 0x02957E 0A:956E: F6        .byte $F6   ; 
- D 0 - I - 0x02957F 0A:956F: 2A        .byte $2A   ; 
- D 0 - I - 0x029580 0A:9570: F6        .byte $F6   ; 
- D 0 - I - 0x029581 0A:9571: 3F        .byte $3F   ; 
- D 0 - I - 0x029582 0A:9572: F1        .byte $F1   ; 
- D 0 - I - 0x029583 0A:9573: 68        .byte $68   ; <h>
- D 0 - I - 0x029584 0A:9574: 85        .byte $85   ; 
- D 0 - I - 0x029585 0A:9575: 20        .byte $20   ; 
- D 0 - I - 0x029586 0A:9576: C3        .byte $C3   ; 
- D 0 - I - 0x029587 0A:9577: 01        .byte $01   ; 
- D 0 - I - 0x029588 0A:9578: F0        .byte $F0   ; 
- D 0 - I - 0x029589 0A:9579: F5        .byte $F5   ; 
- D 0 - I - 0x02958A 0A:957A: 09        .byte $09   ; 
- D 0 - I - 0x02958B 0A:957B: F4        .byte $F4   ; 
- D 0 - I - 0x02958C 0A:957C: 04        .byte $04   ; 
- D 0 - I - 0x02958D 0A:957D: 05        .byte $05   ; 
- D 0 - I - 0x02958E 0A:957E: 00        .byte $00   ; 
- D 0 - I - 0x02958F 0A:957F: 00        .byte $00   ; 
- D 0 - I - 0x029590 0A:9580: F1        .byte $F1   ; 
- D 0 - I - 0x029591 0A:9581: 81        .byte $81   ; 
- D 0 - I - 0x029592 0A:9582: C0        .byte $C0   ; 
- D 0 - I - 0x029593 0A:9583: C0        .byte $C0   ; 
- D 0 - I - 0x029594 0A:9584: EB        .byte $EB   ; 
- D 0 - I - 0x029595 0A:9585: 00        .byte $00   ; 
- D 0 - I - 0x029596 0A:9586: F0        .byte $F0   ; 
- D 0 - I - 0x029597 0A:9587: F5        .byte $F5   ; 
- D 0 - I - 0x029598 0A:9588: 80        .byte $80   ; 
- D 0 - I - 0x029599 0A:9589: F4        .byte $F4   ; 
- D 0 - I - 0x02959A 0A:958A: 13        .byte $13   ; 
- D 0 - I - 0x02959B 0A:958B: 00        .byte $00   ; 
- D 0 - I - 0x02959C 0A:958C: 00        .byte $00   ; 
- D 0 - I - 0x02959D 0A:958D: 00        .byte $00   ; 
- D 0 - I - 0x02959E 0A:958E: F1        .byte $F1   ; 
- D 0 - I - 0x02959F 0A:958F: 40        .byte $40   ; 
- D 0 - I - 0x0295A0 0A:9590: 7E        .byte $7E   ; 
- D 0 - I - 0x0295A1 0A:9591: D8        .byte $D8   ; 
- D 0 - I - 0x0295A2 0A:9592: CB        .byte $CB   ; 
- D 0 - I - 0x0295A3 0A:9593: 00        .byte $00   ; 
- D 0 - I - 0x0295A4 0A:9594: F0        .byte $F0   ; 
- - - - - - 0x0295A5 0A:9595: F8        .byte $F8   ; 
- - - - - - 0x0295A6 0A:9596: A7        .byte $A7   ; 
- - - - - - 0x0295A7 0A:9597: 8B        .byte $8B   ; 
- D 0 - I - 0x0295A8 0A:9598: F5        .byte $F5   ; 
- D 0 - I - 0x0295A9 0A:9599: 09        .byte $09   ; 
- D 0 - I - 0x0295AA 0A:959A: F4        .byte $F4   ; 
- D 0 - I - 0x0295AB 0A:959B: 04        .byte $04   ; 
- D 0 - I - 0x0295AC 0A:959C: 05        .byte $05   ; 
- D 0 - I - 0x0295AD 0A:959D: 00        .byte $00   ; 
- D 0 - I - 0x0295AE 0A:959E: 00        .byte $00   ; 
- D 0 - I - 0x0295AF 0A:959F: F1        .byte $F1   ; 
- D 0 - I - 0x0295B0 0A:95A0: 96        .byte $96   ; 
- D 0 - I - 0x0295B1 0A:95A1: C0        .byte $C0   ; 
- D 0 - I - 0x0295B2 0A:95A2: D0        .byte $D0   ; 
- D 0 - I - 0x0295B3 0A:95A3: 9B        .byte $9B   ; 
- D 0 - I - 0x0295B4 0A:95A4: 00        .byte $00   ; 
- D 0 - I - 0x0295B5 0A:95A5: F0        .byte $F0   ; 
- D 0 - I - 0x0295B6 0A:95A6: F5        .byte $F5   ; 
- D 0 - I - 0x0295B7 0A:95A7: 09        .byte $09   ; 
- D 0 - I - 0x0295B8 0A:95A8: F4        .byte $F4   ; 
- D 0 - I - 0x0295B9 0A:95A9: 04        .byte $04   ; 
- D 0 - I - 0x0295BA 0A:95AA: 05        .byte $05   ; 
- D 0 - I - 0x0295BB 0A:95AB: 00        .byte $00   ; 
- D 0 - I - 0x0295BC 0A:95AC: 00        .byte $00   ; 
- D 0 - I - 0x0295BD 0A:95AD: F1        .byte $F1   ; 
- D 0 - I - 0x0295BE 0A:95AE: 97        .byte $97   ; 
- D 0 - I - 0x0295BF 0A:95AF: C0        .byte $C0   ; 
- D 0 - I - 0x0295C0 0A:95B0: 00        .byte $00   ; 
- D 0 - I - 0x0295C1 0A:95B1: E3        .byte $E3   ; 
- D 0 - I - 0x0295C2 0A:95B2: 01        .byte $01   ; 
- D 0 - I - 0x0295C3 0A:95B3: F0        .byte $F0   ; 
- D 0 - I - 0x0295C4 0A:95B4: F5        .byte $F5   ; 
- D 0 - I - 0x0295C5 0A:95B5: 09        .byte $09   ; 
- D 0 - I - 0x0295C6 0A:95B6: F4        .byte $F4   ; 
- D 0 - I - 0x0295C7 0A:95B7: 04        .byte $04   ; 
- D 0 - I - 0x0295C8 0A:95B8: 05        .byte $05   ; 
- D 0 - I - 0x0295C9 0A:95B9: 00        .byte $00   ; 
- D 0 - I - 0x0295CA 0A:95BA: 00        .byte $00   ; 
- D 0 - I - 0x0295CB 0A:95BB: F7        .byte $F7   ; 
- D 0 - I - 0x0295CC 0A:95BC: 2B        .byte $2B   ; 
- D 0 - I - 0x0295CD 0A:95BD: 53        .byte $53   ; <S>
- D 0 - I - 0x0295CE 0A:95BE: F1        .byte $F1   ; 
- D 0 - I - 0x0295CF 0A:95BF: 00        .byte $00   ; 
- D 0 - I - 0x0295D0 0A:95C0: 00        .byte $00   ; 
- D 0 - I - 0x0295D1 0A:95C1: 80        .byte $80   ; 
- D 0 - I - 0x0295D2 0A:95C2: A3        .byte $A3   ; 
- D 0 - I - 0x0295D3 0A:95C3: 00        .byte $00   ; 
- D 0 - I - 0x0295D4 0A:95C4: F1        .byte $F1   ; 
- D 0 - I - 0x0295D5 0A:95C5: 00        .byte $00   ; 
- D 0 - I - 0x0295D6 0A:95C6: 00        .byte $00   ; 
- D 0 - I - 0x0295D7 0A:95C7: 80        .byte $80   ; 
- D 0 - I - 0x0295D8 0A:95C8: DB        .byte $DB   ; 
- D 0 - I - 0x0295D9 0A:95C9: 04        .byte $04   ; 
- D 0 - I - 0x0295DA 0A:95CA: F1        .byte $F1   ; 
- D 0 - I - 0x0295DB 0A:95CB: B1        .byte $B1   ; 
- D 0 - I - 0x0295DC 0A:95CC: C4        .byte $C4   ; 
- D 0 - I - 0x0295DD 0A:95CD: 90        .byte $90   ; 
- D 0 - I - 0x0295DE 0A:95CE: 93        .byte $93   ; 
- D 0 - I - 0x0295DF 0A:95CF: 08        .byte $08   ; 
- D 0 - I - 0x0295E0 0A:95D0: 03        .byte $03   ; 
- D 0 - I - 0x0295E1 0A:95D1: F1        .byte $F1   ; 
- D 0 - I - 0x0295E2 0A:95D2: B1        .byte $B1   ; 
- D 0 - I - 0x0295E3 0A:95D3: C4        .byte $C4   ; 
- D 0 - I - 0x0295E4 0A:95D4: 90        .byte $90   ; 
- D 0 - I - 0x0295E5 0A:95D5: 93        .byte $93   ; 
- D 0 - I - 0x0295E6 0A:95D6: 0C        .byte $0C   ; 
- D 0 - I - 0x0295E7 0A:95D7: 03        .byte $03   ; 
- D 0 - I - 0x0295E8 0A:95D8: F1        .byte $F1   ; 
- D 0 - I - 0x0295E9 0A:95D9: B1        .byte $B1   ; 
- D 0 - I - 0x0295EA 0A:95DA: C4        .byte $C4   ; 
- D 0 - I - 0x0295EB 0A:95DB: 90        .byte $90   ; 
- D 0 - I - 0x0295EC 0A:95DC: 93        .byte $93   ; 
- D 0 - I - 0x0295ED 0A:95DD: 10        .byte $10   ; 
- D 0 - I - 0x0295EE 0A:95DE: 03        .byte $03   ; 
- D 0 - I - 0x0295EF 0A:95DF: F1        .byte $F1   ; 
- D 0 - I - 0x0295F0 0A:95E0: B1        .byte $B1   ; 
- D 0 - I - 0x0295F1 0A:95E1: C4        .byte $C4   ; 
- D 0 - I - 0x0295F2 0A:95E2: 90        .byte $90   ; 
- D 0 - I - 0x0295F3 0A:95E3: 93        .byte $93   ; 
- D 0 - I - 0x0295F4 0A:95E4: 14        .byte $14   ; 
- D 0 - I - 0x0295F5 0A:95E5: F0        .byte $F0   ; 
- D 0 - I - 0x0295F6 0A:95E6: F5        .byte $F5   ; 
- D 0 - I - 0x0295F7 0A:95E7: 84        .byte $84   ; 
- D 0 - I - 0x0295F8 0A:95E8: 16        .byte $16   ; 
- D 0 - I - 0x0295F9 0A:95E9: F4        .byte $F4   ; 
- D 0 - I - 0x0295FA 0A:95EA: 2D        .byte $2D   ; 
- D 0 - I - 0x0295FB 0A:95EB: 00        .byte $00   ; 
- D 0 - I - 0x0295FC 0A:95EC: 00        .byte $00   ; 
- D 0 - I - 0x0295FD 0A:95ED: 00        .byte $00   ; 
- D 0 - I - 0x0295FE 0A:95EE: F1        .byte $F1   ; 
- D 0 - I - 0x0295FF 0A:95EF: CB        .byte $CB   ; 
- D 0 - I - 0x029600 0A:95F0: B3        .byte $B3   ; 
- D 0 - I - 0x029601 0A:95F1: 53        .byte $53   ; <S>
- D 0 - I - 0x029602 0A:95F2: C3        .byte $C3   ; 
- D 0 - I - 0x029603 0A:95F3: 00        .byte $00   ; 
- D 0 - I - 0x029604 0A:95F4: F0        .byte $F0   ; 
- D 0 - I - 0x029605 0A:95F5: F5        .byte $F5   ; 
- D 0 - I - 0x029606 0A:95F6: 80        .byte $80   ; 
- D 0 - I - 0x029607 0A:95F7: F4        .byte $F4   ; 
- D 0 - I - 0x029608 0A:95F8: 28        .byte $28   ; 
- D 0 - I - 0x029609 0A:95F9: 29        .byte $29   ; 
- D 0 - I - 0x02960A 0A:95FA: 2A        .byte $2A   ; 
- D 0 - I - 0x02960B 0A:95FB: 0B        .byte $0B   ; 
- D 0 - I - 0x02960C 0A:95FC: F1        .byte $F1   ; 
- D 0 - I - 0x02960D 0A:95FD: 39        .byte $39   ; <9>
- D 0 - I - 0x02960E 0A:95FE: 11        .byte $11   ; 
- D 0 - I - 0x02960F 0A:95FF: E8        .byte $E8   ; 
- D 0 - I - 0x029610 0A:9600: BB        .byte $BB   ; 
- D 0 - I - 0x029611 0A:9601: 00        .byte $00   ; 
- D 0 - I - 0x029612 0A:9602: F0        .byte $F0   ; 
- D 0 - I - 0x029613 0A:9603: F5        .byte $F5   ; 
- D 0 - I - 0x029614 0A:9604: 82        .byte $82   ; 
- D 0 - I - 0x029615 0A:9605: F4        .byte $F4   ; 
- D 0 - I - 0x029616 0A:9606: 04        .byte $04   ; 
- D 0 - I - 0x029617 0A:9607: 05        .byte $05   ; 
- D 0 - I - 0x029618 0A:9608: 22        .byte $22   ; 
- D 0 - I - 0x029619 0A:9609: 00        .byte $00   ; 
- D 0 - I - 0x02961A 0A:960A: F1        .byte $F1   ; 
- D 0 - I - 0x02961B 0A:960B: 5D        .byte $5D   ; 
- D 0 - I - 0x02961C 0A:960C: 83        .byte $83   ; 
- D 0 - I - 0x02961D 0A:960D: B8        .byte $B8   ; 
- D 0 - I - 0x02961E 0A:960E: D3        .byte $D3   ; 
- D 0 - I - 0x02961F 0A:960F: 04        .byte $04   ; 
- D 0 - I - 0x029620 0A:9610: 06        .byte $06   ; 
- D 0 - I - 0x029621 0A:9611: F1        .byte $F1   ; 
- D 0 - I - 0x029622 0A:9612: A9        .byte $A9   ; 
- D 0 - I - 0x029623 0A:9613: C4        .byte $C4   ; 
- D 0 - I - 0x029624 0A:9614: B8        .byte $B8   ; 
- D 0 - I - 0x029625 0A:9615: DB        .byte $DB   ; 
- D 0 - I - 0x029626 0A:9616: 00        .byte $00   ; 
- D 0 - I - 0x029627 0A:9617: F0        .byte $F0   ; 
- D 0 - I - 0x029628 0A:9618: F5        .byte $F5   ; 
- D 0 - I - 0x029629 0A:9619: 80        .byte $80   ; 
- D 0 - I - 0x02962A 0A:961A: F4        .byte $F4   ; 
- D 0 - I - 0x02962B 0A:961B: 08        .byte $08   ; 
- D 0 - I - 0x02962C 0A:961C: 09        .byte $09   ; 
- D 0 - I - 0x02962D 0A:961D: 0A        .byte $0A   ; 
- D 0 - I - 0x02962E 0A:961E: 0B        .byte $0B   ; 
- D 0 - I - 0x02962F 0A:961F: F1        .byte $F1   ; 
- D 0 - I - 0x029630 0A:9620: 62        .byte $62   ; <b>
- D 0 - I - 0x029631 0A:9621: 5E        .byte $5E   ; 
- D 0 - I - 0x029632 0A:9622: 20        .byte $20   ; 
- D 0 - I - 0x029633 0A:9623: BB        .byte $BB   ; 
- D 0 - I - 0x029634 0A:9624: 0D        .byte $0D   ; 
- D 0 - I - 0x029635 0A:9625: F1        .byte $F1   ; 
- D 0 - I - 0x029636 0A:9626: 62        .byte $62   ; <b>
- D 0 - I - 0x029637 0A:9627: 5D        .byte $5D   ; 
- D 0 - I - 0x029638 0A:9628: 20        .byte $20   ; 
- D 0 - I - 0x029639 0A:9629: BB        .byte $BB   ; 
- D 0 - I - 0x02963A 0A:962A: 09        .byte $09   ; 
- D 0 - I - 0x02963B 0A:962B: F1        .byte $F1   ; 
- D 0 - I - 0x02963C 0A:962C: 62        .byte $62   ; <b>
- D 0 - I - 0x02963D 0A:962D: 5C        .byte $5C   ; 
- D 0 - I - 0x02963E 0A:962E: 20        .byte $20   ; 
- D 0 - I - 0x02963F 0A:962F: BB        .byte $BB   ; 
- D 0 - I - 0x029640 0A:9630: 05        .byte $05   ; 
- D 0 - I - 0x029641 0A:9631: F1        .byte $F1   ; 
- D 0 - I - 0x029642 0A:9632: 63        .byte $63   ; <c>
- D 0 - I - 0x029643 0A:9633: 49        .byte $49   ; <I>
- D 0 - I - 0x029644 0A:9634: A0        .byte $A0   ; 
- D 0 - I - 0x029645 0A:9635: 9F        .byte $9F   ; 
- D 0 - I - 0x029646 0A:9636: 00        .byte $00   ; 
- D 0 - I - 0x029647 0A:9637: 14        .byte $14   ; 
- D 0 - I - 0x029648 0A:9638: F4        .byte $F4   ; 
- D 0 - I - 0x029649 0A:9639: 0A        .byte $0A   ; 
- D 0 - I - 0x02964A 0A:963A: 0B        .byte $0B   ; 
- D 0 - I - 0x02964B 0A:963B: 00        .byte $00   ; 
- D 0 - I - 0x02964C 0A:963C: 00        .byte $00   ; 
- D 0 - I - 0x02964D 0A:963D: F6        .byte $F6   ; 
- D 0 - I - 0x02964E 0A:963E: 00        .byte $00   ; 
- D 0 - I - 0x02964F 0A:963F: F6        .byte $F6   ; 
- D 0 - I - 0x029650 0A:9640: 2A        .byte $2A   ; 
- D 0 - I - 0x029651 0A:9641: F6        .byte $F6   ; 
- D 0 - I - 0x029652 0A:9642: 3F        .byte $3F   ; 
- D 0 - I - 0x029653 0A:9643: F1        .byte $F1   ; 
- D 0 - I - 0x029654 0A:9644: 00        .byte $00   ; 
- D 0 - I - 0x029655 0A:9645: 85        .byte $85   ; 
- D 0 - I - 0x029656 0A:9646: 08        .byte $08   ; 
- D 0 - I - 0x029657 0A:9647: BB        .byte $BB   ; 
- D 0 - I - 0x029658 0A:9648: 05        .byte $05   ; 
- D 0 - I - 0x029659 0A:9649: 02        .byte $02   ; 
- D 0 - I - 0x02965A 0A:964A: F1        .byte $F1   ; 
- D 0 - I - 0x02965B 0A:964B: 8E        .byte $8E   ; 
- D 0 - I - 0x02965C 0A:964C: 84        .byte $84   ; 
- D 0 - I - 0x02965D 0A:964D: 0C        .byte $0C   ; 
- D 0 - I - 0x02965E 0A:964E: BB        .byte $BB   ; 
- D 0 - I - 0x02965F 0A:964F: 05        .byte $05   ; 
- D 0 - I - 0x029660 0A:9650: F0        .byte $F0   ; 
- D 0 - I - 0x029661 0A:9651: F5        .byte $F5   ; 
- D 0 - I - 0x029662 0A:9652: 09        .byte $09   ; 
- D 0 - I - 0x029663 0A:9653: F4        .byte $F4   ; 
- D 0 - I - 0x029664 0A:9654: 60        .byte $60   ; 
- D 0 - I - 0x029665 0A:9655: 61        .byte $61   ; <a>
- D 0 - I - 0x029666 0A:9656: 62        .byte $62   ; <b>
- D 0 - I - 0x029667 0A:9657: 63        .byte $63   ; <c>
- D 0 - I - 0x029668 0A:9658: F1        .byte $F1   ; 
- D 0 - I - 0x029669 0A:9659: 00        .byte $00   ; 
- D 0 - I - 0x02966A 0A:965A: 79        .byte $79   ; <y>
- D 0 - I - 0x02966B 0A:965B: F0        .byte $F0   ; 
- D 0 - I - 0x02966C 0A:965C: BB        .byte $BB   ; 
- D 0 - I - 0x02966D 0A:965D: 00        .byte $00   ; 
- D 0 - I - 0x02966E 0A:965E: F0        .byte $F0   ; 
- D 0 - I - 0x02966F 0A:965F: F5        .byte $F5   ; 
- D 0 - I - 0x029670 0A:9660: 80        .byte $80   ; 
- D 0 - I - 0x029671 0A:9661: F4        .byte $F4   ; 
- D 0 - I - 0x029672 0A:9662: 0C        .byte $0C   ; 
- D 0 - I - 0x029673 0A:9663: 0D        .byte $0D   ; 
- D 0 - I - 0x029674 0A:9664: 0E        .byte $0E   ; 
- D 0 - I - 0x029675 0A:9665: 0F        .byte $0F   ; 
- D 0 - I - 0x029676 0A:9666: F1        .byte $F1   ; 
- D 0 - I - 0x029677 0A:9667: 65        .byte $65   ; <e>
- D 0 - I - 0x029678 0A:9668: 1E        .byte $1E   ; 
- D 0 - I - 0x029679 0A:9669: D0        .byte $D0   ; 
- D 0 - I - 0x02967A 0A:966A: 93        .byte $93   ; 
- D 0 - I - 0x02967B 0A:966B: 00        .byte $00   ; 
- D 0 - I - 0x02967C 0A:966C: F1        .byte $F1   ; 
- D 0 - I - 0x02967D 0A:966D: 64        .byte $64   ; <d>
- D 0 - I - 0x02967E 0A:966E: 1D        .byte $1D   ; 
- D 0 - I - 0x02967F 0A:966F: 1F        .byte $1F   ; 
- D 0 - I - 0x029680 0A:9670: B7        .byte $B7   ; 
- D 0 - I - 0x029681 0A:9671: 05        .byte $05   ; 
- D 0 - I - 0x029682 0A:9672: 14        .byte $14   ; 
- D 0 - I - 0x029683 0A:9673: F6        .byte $F6   ; 
- D 0 - I - 0x029684 0A:9674: 00        .byte $00   ; 
- D 0 - I - 0x029685 0A:9675: F1        .byte $F1   ; 
- D 0 - I - 0x029686 0A:9676: 00        .byte $00   ; 
- D 0 - I - 0x029687 0A:9677: 3F        .byte $3F   ; 
- D 0 - I - 0x029688 0A:9678: 16        .byte $16   ; 
- D 0 - I - 0x029689 0A:9679: B3        .byte $B3   ; 
- D 0 - I - 0x02968A 0A:967A: 05        .byte $05   ; 
- D 0 - I - 0x02968B 0A:967B: 04        .byte $04   ; 
- D 0 - I - 0x02968C 0A:967C: F1        .byte $F1   ; 
- D 0 - I - 0x02968D 0A:967D: 66        .byte $66   ; <f>
- D 0 - I - 0x02968E 0A:967E: 1D        .byte $1D   ; 
- D 0 - I - 0x02968F 0A:967F: 16        .byte $16   ; 
- D 0 - I - 0x029690 0A:9680: B3        .byte $B3   ; 
- D 0 - I - 0x029691 0A:9681: 05        .byte $05   ; 
- D 0 - I - 0x029692 0A:9682: F1        .byte $F1   ; 
- D 0 - I - 0x029693 0A:9683: A7        .byte $A7   ; 
- D 0 - I - 0x029694 0A:9684: 22        .byte $22   ; 
- D 0 - I - 0x029695 0A:9685: 0E        .byte $0E   ; 
- D 0 - I - 0x029696 0A:9686: AF        .byte $AF   ; 
- D 0 - I - 0x029697 0A:9687: 01        .byte $01   ; 
- D 0 - I - 0x029698 0A:9688: F0        .byte $F0   ; 
- D 0 - I - 0x029699 0A:9689: F5        .byte $F5   ; 
- D 0 - I - 0x02969A 0A:968A: 09        .byte $09   ; 
- D 0 - I - 0x02969B 0A:968B: F4        .byte $F4   ; 
- D 0 - I - 0x02969C 0A:968C: 04        .byte $04   ; 
- D 0 - I - 0x02969D 0A:968D: 05        .byte $05   ; 
- D 0 - I - 0x02969E 0A:968E: 00        .byte $00   ; 
- D 0 - I - 0x02969F 0A:968F: 00        .byte $00   ; 
- D 0 - I - 0x0296A0 0A:9690: F1        .byte $F1   ; 
- D 0 - I - 0x0296A1 0A:9691: 83        .byte $83   ; 
- D 0 - I - 0x0296A2 0A:9692: BA        .byte $BA   ; 
- D 0 - I - 0x0296A3 0A:9693: B8        .byte $B8   ; 
- D 0 - I - 0x0296A4 0A:9694: BB        .byte $BB   ; 
- D 0 - I - 0x0296A5 0A:9695: 00        .byte $00   ; 
- D 0 - I - 0x0296A6 0A:9696: F0        .byte $F0   ; 
- D 0 - I - 0x0296A7 0A:9697: F5        .byte $F5   ; 
- D 0 - I - 0x0296A8 0A:9698: 87        .byte $87   ; 
- D 0 - I - 0x0296A9 0A:9699: F4        .byte $F4   ; 
- D 0 - I - 0x0296AA 0A:969A: 08        .byte $08   ; 
- D 0 - I - 0x0296AB 0A:969B: 09        .byte $09   ; 
- D 0 - I - 0x0296AC 0A:969C: 0A        .byte $0A   ; 
- D 0 - I - 0x0296AD 0A:969D: 0B        .byte $0B   ; 
- D 0 - I - 0x0296AE 0A:969E: F1        .byte $F1   ; 
- D 0 - I - 0x0296AF 0A:969F: AC        .byte $AC   ; 
- D 0 - I - 0x0296B0 0A:96A0: 49        .byte $49   ; <I>
- D 0 - I - 0x0296B1 0A:96A1: 9C        .byte $9C   ; 
- D 0 - I - 0x0296B2 0A:96A2: 63        .byte $63   ; <c>
- D 0 - I - 0x0296B3 0A:96A3: 00        .byte $00   ; 
- D 0 - I - 0x0296B4 0A:96A4: F1        .byte $F1   ; 
- D 0 - I - 0x0296B5 0A:96A5: 67        .byte $67   ; <g>
- D 0 - I - 0x0296B6 0A:96A6: 94        .byte $94   ; 
- D 0 - I - 0x0296B7 0A:96A7: F0        .byte $F0   ; 
- D 0 - I - 0x0296B8 0A:96A8: B3        .byte $B3   ; 
- D 0 - I - 0x0296B9 0A:96A9: 04        .byte $04   ; 
- D 0 - I - 0x0296BA 0A:96AA: F1        .byte $F1   ; 
- D 0 - I - 0x0296BB 0A:96AB: 67        .byte $67   ; <g>
- D 0 - I - 0x0296BC 0A:96AC: 95        .byte $95   ; 
- D 0 - I - 0x0296BD 0A:96AD: F0        .byte $F0   ; 
- D 0 - I - 0x0296BE 0A:96AE: B3        .byte $B3   ; 
- D 0 - I - 0x0296BF 0A:96AF: 08        .byte $08   ; 
- D 0 - I - 0x0296C0 0A:96B0: F1        .byte $F1   ; 
- D 0 - I - 0x0296C1 0A:96B1: 67        .byte $67   ; <g>
- D 0 - I - 0x0296C2 0A:96B2: 96        .byte $96   ; 
- D 0 - I - 0x0296C3 0A:96B3: F0        .byte $F0   ; 
- D 0 - I - 0x0296C4 0A:96B4: B3        .byte $B3   ; 
- D 0 - I - 0x0296C5 0A:96B5: 0C        .byte $0C   ; 
- D 0 - I - 0x0296C6 0A:96B6: 16        .byte $16   ; 
- D 0 - I - 0x0296C7 0A:96B7: F4        .byte $F4   ; 
- D 0 - I - 0x0296C8 0A:96B8: 0A        .byte $0A   ; 
- D 0 - I - 0x0296C9 0A:96B9: 0B        .byte $0B   ; 
- D 0 - I - 0x0296CA 0A:96BA: 00        .byte $00   ; 
- D 0 - I - 0x0296CB 0A:96BB: 00        .byte $00   ; 
- D 0 - I - 0x0296CC 0A:96BC: F6        .byte $F6   ; 
- D 0 - I - 0x0296CD 0A:96BD: 00        .byte $00   ; 
- D 0 - I - 0x0296CE 0A:96BE: F6        .byte $F6   ; 
- D 0 - I - 0x0296CF 0A:96BF: 2A        .byte $2A   ; 
- D 0 - I - 0x0296D0 0A:96C0: F6        .byte $F6   ; 
- D 0 - I - 0x0296D1 0A:96C1: 3F        .byte $3F   ; 
- D 0 - I - 0x0296D2 0A:96C2: F1        .byte $F1   ; 
- D 0 - I - 0x0296D3 0A:96C3: 00        .byte $00   ; 
- D 0 - I - 0x0296D4 0A:96C4: 84        .byte $84   ; 
- D 0 - I - 0x0296D5 0A:96C5: 20        .byte $20   ; 
- D 0 - I - 0x0296D6 0A:96C6: BB        .byte $BB   ; 
- D 0 - I - 0x0296D7 0A:96C7: 05        .byte $05   ; 
- D 0 - I - 0x0296D8 0A:96C8: 04        .byte $04   ; 
- D 0 - I - 0x0296D9 0A:96C9: F1        .byte $F1   ; 
- D 0 - I - 0x0296DA 0A:96CA: 68        .byte $68   ; <h>
- D 0 - I - 0x0296DB 0A:96CB: 85        .byte $85   ; 
- D 0 - I - 0x0296DC 0A:96CC: 20        .byte $20   ; 
- D 0 - I - 0x0296DD 0A:96CD: BB        .byte $BB   ; 
- D 0 - I - 0x0296DE 0A:96CE: 05        .byte $05   ; 
- D 0 - I - 0x0296DF 0A:96CF: F8        .byte $F8   ; 
- D 0 - I - 0x0296E0 0A:96D0: 0C        .byte $0C   ; 
- D 0 - I - 0x0296E1 0A:96D1: 99        .byte $99   ; 
- D 0 - I - 0x0296E2 0A:96D2: F5        .byte $F5   ; 
- D 0 - I - 0x0296E3 0A:96D3: 83        .byte $83   ; 
- D 0 - I - 0x0296E4 0A:96D4: F4        .byte $F4   ; 
- D 0 - I - 0x0296E5 0A:96D5: 18        .byte $18   ; 
- D 0 - I - 0x0296E6 0A:96D6: 19        .byte $19   ; 
- D 0 - I - 0x0296E7 0A:96D7: 1A        .byte $1A   ; 
- D 0 - I - 0x0296E8 0A:96D8: 2B        .byte $2B   ; 
- D 0 - I - 0x0296E9 0A:96D9: F7        .byte $F7   ; 
- D 0 - I - 0x0296EA 0A:96DA: 03        .byte $03   ; 
- D 0 - I - 0x0296EB 0A:96DB: 7B        .byte $7B   ; 
- D 0 - I - 0x0296EC 0A:96DC: F1        .byte $F1   ; 
- D 0 - I - 0x0296ED 0A:96DD: 30        .byte $30   ; <0>
- D 0 - I - 0x0296EE 0A:96DE: 00        .byte $00   ; 
- D 0 - I - 0x0296EF 0A:96DF: 80        .byte $80   ; 
- D 0 - I - 0x0296F0 0A:96E0: 9B        .byte $9B   ; 
- D 0 - I - 0x0296F1 0A:96E1: 04        .byte $04   ; 
- D 0 - I - 0x0296F2 0A:96E2: F1        .byte $F1   ; 
- D 0 - I - 0x0296F3 0A:96E3: 43        .byte $43   ; <C>
- D 0 - I - 0x0296F4 0A:96E4: 00        .byte $00   ; 
- D 0 - I - 0x0296F5 0A:96E5: 80        .byte $80   ; 
- D 0 - I - 0x0296F6 0A:96E6: E4        .byte $E4   ; 
- D 0 - I - 0x0296F7 0A:96E7: 08        .byte $08   ; 
- D 0 - I - 0x0296F8 0A:96E8: F1        .byte $F1   ; 
- D 0 - I - 0x0296F9 0A:96E9: 2C        .byte $2C   ; 
- D 0 - I - 0x0296FA 0A:96EA: ED        .byte $ED   ; 
- D 0 - I - 0x0296FB 0A:96EB: 70        .byte $70   ; <p>
- D 0 - I - 0x0296FC 0A:96EC: C3        .byte $C3   ; 
- D 0 - I - 0x0296FD 0A:96ED: 11        .byte $11   ; 
- D 0 - I - 0x0296FE 0A:96EE: C0        .byte $C0   ; 
- D 0 - I - 0x0296FF 0A:96EF: F7        .byte $F7   ; 
- D 0 - I - 0x029700 0A:96F0: 1C        .byte $1C   ; 
- D 0 - I - 0x029701 0A:96F1: 63        .byte $63   ; <c>
- D 0 - I - 0x029702 0A:96F2: F1        .byte $F1   ; 
- D 0 - I - 0x029703 0A:96F3: 00        .byte $00   ; 
- D 0 - I - 0x029704 0A:96F4: 00        .byte $00   ; 
- D 0 - I - 0x029705 0A:96F5: 80        .byte $80   ; 
- D 0 - I - 0x029706 0A:96F6: E3        .byte $E3   ; 
- D 0 - I - 0x029707 0A:96F7: 0C        .byte $0C   ; 
- D 0 - I - 0x029708 0A:96F8: 10        .byte $10   ; 
- D 0 - I - 0x029709 0A:96F9: F7        .byte $F7   ; 
- D 0 - I - 0x02970A 0A:96FA: 24        .byte $24   ; 
- D 0 - I - 0x02970B 0A:96FB: 5B        .byte $5B   ; 
- D 0 - I - 0x02970C 0A:96FC: F1        .byte $F1   ; 
- D 0 - I - 0x02970D 0A:96FD: 00        .byte $00   ; 
- D 0 - I - 0x02970E 0A:96FE: 00        .byte $00   ; 
- D 0 - I - 0x02970F 0A:96FF: 80        .byte $80   ; 
- D 0 - I - 0x029710 0A:9700: A4        .byte $A4   ; 
- D 0 - I - 0x029711 0A:9701: 00        .byte $00   ; 
- D 0 - I - 0x029712 0A:9702: F1        .byte $F1   ; 
- D 0 - I - 0x029713 0A:9703: 00        .byte $00   ; 
- D 0 - I - 0x029714 0A:9704: 00        .byte $00   ; 
- D 0 - I - 0x029715 0A:9705: 80        .byte $80   ; 
- D 0 - I - 0x029716 0A:9706: DB        .byte $DB   ; 
- D 0 - I - 0x029717 0A:9707: 0C        .byte $0C   ; 
- D 0 - I - 0x029718 0A:9708: 10        .byte $10   ; 
- D 0 - I - 0x029719 0A:9709: F7        .byte $F7   ; 
- D 0 - I - 0x02971A 0A:970A: 2B        .byte $2B   ; 
- D 0 - I - 0x02971B 0A:970B: 53        .byte $53   ; <S>
- D 0 - I - 0x02971C 0A:970C: F1        .byte $F1   ; 
- D 0 - I - 0x02971D 0A:970D: 00        .byte $00   ; 
- D 0 - I - 0x02971E 0A:970E: 00        .byte $00   ; 
- D 0 - I - 0x02971F 0A:970F: 80        .byte $80   ; 
- D 0 - I - 0x029720 0A:9710: AB        .byte $AB   ; 
- D 0 - I - 0x029721 0A:9711: 00        .byte $00   ; 
- D 0 - I - 0x029722 0A:9712: F1        .byte $F1   ; 
- D 0 - I - 0x029723 0A:9713: 00        .byte $00   ; 
- D 0 - I - 0x029724 0A:9714: 00        .byte $00   ; 
- D 0 - I - 0x029725 0A:9715: 80        .byte $80   ; 
- D 0 - I - 0x029726 0A:9716: D3        .byte $D3   ; 
- D 0 - I - 0x029727 0A:9717: 0C        .byte $0C   ; 
- D 0 - I - 0x029728 0A:9718: 10        .byte $10   ; 
- D 0 - I - 0x029729 0A:9719: F7        .byte $F7   ; 
- D 0 - I - 0x02972A 0A:971A: 33        .byte $33   ; <3>
- D 0 - I - 0x02972B 0A:971B: 4B        .byte $4B   ; <K>
- D 0 - I - 0x02972C 0A:971C: F1        .byte $F1   ; 
- D 0 - I - 0x02972D 0A:971D: 00        .byte $00   ; 
- D 0 - I - 0x02972E 0A:971E: 00        .byte $00   ; 
- D 0 - I - 0x02972F 0A:971F: 80        .byte $80   ; 
- D 0 - I - 0x029730 0A:9720: B3        .byte $B3   ; 
- D 0 - I - 0x029731 0A:9721: 00        .byte $00   ; 
- D 0 - I - 0x029732 0A:9722: F1        .byte $F1   ; 
- D 0 - I - 0x029733 0A:9723: 00        .byte $00   ; 
- D 0 - I - 0x029734 0A:9724: 00        .byte $00   ; 
- D 0 - I - 0x029735 0A:9725: 80        .byte $80   ; 
- D 0 - I - 0x029736 0A:9726: CB        .byte $CB   ; 
- D 0 - I - 0x029737 0A:9727: 0C        .byte $0C   ; 
- D 0 - I - 0x029738 0A:9728: 60        .byte $60   ; 
- D 0 - I - 0x029739 0A:9729: F7        .byte $F7   ; 
- D 0 - I - 0x02973A 0A:972A: 03        .byte $03   ; 
- D 0 - I - 0x02973B 0A:972B: 7B        .byte $7B   ; 
- D 0 - I - 0x02973C 0A:972C: F6        .byte $F6   ; 
- D 0 - I - 0x02973D 0A:972D: 00        .byte $00   ; 
- D 0 - I - 0x02973E 0A:972E: F6        .byte $F6   ; 
- D 0 - I - 0x02973F 0A:972F: 15        .byte $15   ; 
- D 0 - I - 0x029740 0A:9730: F6        .byte $F6   ; 
- D 0 - I - 0x029741 0A:9731: 2A        .byte $2A   ; 
- D 0 - I - 0x029742 0A:9732: F6        .byte $F6   ; 
- D 0 - I - 0x029743 0A:9733: 3F        .byte $3F   ; 
- D 0 - I - 0x029744 0A:9734: F1        .byte $F1   ; 
- D 0 - I - 0x029745 0A:9735: 2E        .byte $2E   ; 
- D 0 - I - 0x029746 0A:9736: 17        .byte $17   ; 
- D 0 - I - 0x029747 0A:9737: 00        .byte $00   ; 
- D 0 - I - 0x029748 0A:9738: C3        .byte $C3   ; 
- D 0 - I - 0x029749 0A:9739: 11        .byte $11   ; 
- D 0 - I - 0x02974A 0A:973A: F0        .byte $F0   ; 
- D 0 - I - 0x02974B 0A:973B: F5        .byte $F5   ; 
- D 0 - I - 0x02974C 0A:973C: 09        .byte $09   ; 
- D 0 - I - 0x02974D 0A:973D: F4        .byte $F4   ; 
- D 0 - I - 0x02974E 0A:973E: 06        .byte $06   ; 
- D 0 - I - 0x02974F 0A:973F: 00        .byte $00   ; 
- D 0 - I - 0x029750 0A:9740: 00        .byte $00   ; 
- D 0 - I - 0x029751 0A:9741: 00        .byte $00   ; 
- D 0 - I - 0x029752 0A:9742: F1        .byte $F1   ; 
- D 0 - I - 0x029753 0A:9743: 84        .byte $84   ; 
- D 0 - I - 0x029754 0A:9744: B6        .byte $B6   ; 
- D 0 - I - 0x029755 0A:9745: E0        .byte $E0   ; 
- D 0 - I - 0x029756 0A:9746: 63        .byte $63   ; <c>
- D 0 - I - 0x029757 0A:9747: 00        .byte $00   ; 
- D 0 - I - 0x029758 0A:9748: F0        .byte $F0   ; 
- D 0 - I - 0x029759 0A:9749: F5        .byte $F5   ; 
- D 0 - I - 0x02975A 0A:974A: 82        .byte $82   ; 
- D 0 - I - 0x02975B 0A:974B: F4        .byte $F4   ; 
- D 0 - I - 0x02975C 0A:974C: 04        .byte $04   ; 
- D 0 - I - 0x02975D 0A:974D: 05        .byte $05   ; 
- D 0 - I - 0x02975E 0A:974E: 22        .byte $22   ; 
- D 0 - I - 0x02975F 0A:974F: 00        .byte $00   ; 
- D 0 - I - 0x029760 0A:9750: F1        .byte $F1   ; 
- D 0 - I - 0x029761 0A:9751: 00        .byte $00   ; 
- D 0 - I - 0x029762 0A:9752: 8A        .byte $8A   ; 
- D 0 - I - 0x029763 0A:9753: 20        .byte $20   ; 
- D 0 - I - 0x029764 0A:9754: CB        .byte $CB   ; 
- D 0 - I - 0x029765 0A:9755: 05        .byte $05   ; 
- D 0 - I - 0x029766 0A:9756: 06        .byte $06   ; 
- D 0 - I - 0x029767 0A:9757: F1        .byte $F1   ; 
- D 0 - I - 0x029768 0A:9758: 69        .byte $69   ; <i>
- D 0 - I - 0x029769 0A:9759: BA        .byte $BA   ; 
- D 0 - I - 0x02976A 0A:975A: 18        .byte $18   ; 
- D 0 - I - 0x02976B 0A:975B: D3        .byte $D3   ; 
- D 0 - I - 0x02976C 0A:975C: 01        .byte $01   ; 
- D 0 - I - 0x02976D 0A:975D: F8        .byte $F8   ; 
- D 0 - I - 0x02976E 0A:975E: A7        .byte $A7   ; 
- D 0 - I - 0x02976F 0A:975F: 8B        .byte $8B   ; 
- D 0 - I - 0x029770 0A:9760: F5        .byte $F5   ; 
- D 0 - I - 0x029771 0A:9761: 09        .byte $09   ; 
- D 0 - I - 0x029772 0A:9762: F4        .byte $F4   ; 
- D 0 - I - 0x029773 0A:9763: 06        .byte $06   ; 
- D 0 - I - 0x029774 0A:9764: 00        .byte $00   ; 
- D 0 - I - 0x029775 0A:9765: 00        .byte $00   ; 
- D 0 - I - 0x029776 0A:9766: 00        .byte $00   ; 
- D 0 - I - 0x029777 0A:9767: F1        .byte $F1   ; 
- D 0 - I - 0x029778 0A:9768: 85        .byte $85   ; 
- D 0 - I - 0x029779 0A:9769: B7        .byte $B7   ; 
- D 0 - I - 0x02977A 0A:976A: 60        .byte $60   ; 
- D 0 - I - 0x02977B 0A:976B: 93        .byte $93   ; 
- D 0 - I - 0x02977C 0A:976C: 00        .byte $00   ; 
- D 0 - I - 0x02977D 0A:976D: F0        .byte $F0   ; 
- D 0 - I - 0x02977E 0A:976E: F5        .byte $F5   ; 
- D 0 - I - 0x02977F 0A:976F: 80        .byte $80   ; 
- D 0 - I - 0x029780 0A:9770: F4        .byte $F4   ; 
- D 0 - I - 0x029781 0A:9771: 04        .byte $04   ; 
- D 0 - I - 0x029782 0A:9772: 05        .byte $05   ; 
- D 0 - I - 0x029783 0A:9773: 23        .byte $23   ; 
- D 0 - I - 0x029784 0A:9774: 00        .byte $00   ; 
- D 0 - I - 0x029785 0A:9775: F1        .byte $F1   ; 
- D 0 - I - 0x029786 0A:9776: AE        .byte $AE   ; 
- D 0 - I - 0x029787 0A:9777: BA        .byte $BA   ; 
- D 0 - I - 0x029788 0A:9778: D0        .byte $D0   ; 
- D 0 - I - 0x029789 0A:9779: B5        .byte $B5   ; 
- D 0 - I - 0x02978A 0A:977A: 00        .byte $00   ; 
- D 0 - I - 0x02978B 0A:977B: F1        .byte $F1   ; 
- D 0 - I - 0x02978C 0A:977C: 6A        .byte $6A   ; <j>
- D 0 - I - 0x02978D 0A:977D: 8B        .byte $8B   ; 
- D 0 - I - 0x02978E 0A:977E: C0        .byte $C0   ; 
- D 0 - I - 0x02978F 0A:977F: C5        .byte $C5   ; 
- D 0 - I - 0x029790 0A:9780: 04        .byte $04   ; 
- D 0 - I - 0x029791 0A:9781: F8        .byte $F8   ; 
- D 0 - I - 0x029792 0A:9782: A7        .byte $A7   ; 
- D 0 - I - 0x029793 0A:9783: 8B        .byte $8B   ; 
- D 0 - I - 0x029794 0A:9784: F5        .byte $F5   ; 
- D 0 - I - 0x029795 0A:9785: 80        .byte $80   ; 
- D 0 - I - 0x029796 0A:9786: F4        .byte $F4   ; 
- D 0 - I - 0x029797 0A:9787: 04        .byte $04   ; 
- D 0 - I - 0x029798 0A:9788: 05        .byte $05   ; 
- D 0 - I - 0x029799 0A:9789: 23        .byte $23   ; 
- D 0 - I - 0x02979A 0A:978A: 00        .byte $00   ; 
- D 0 - I - 0x02979B 0A:978B: F1        .byte $F1   ; 
- D 0 - I - 0x02979C 0A:978C: AF        .byte $AF   ; 
- D 0 - I - 0x02979D 0A:978D: BA        .byte $BA   ; 
- D 0 - I - 0x02979E 0A:978E: D0        .byte $D0   ; 
- D 0 - I - 0x02979F 0A:978F: D7        .byte $D7   ; 
- D 0 - I - 0x0297A0 0A:9790: 00        .byte $00   ; 
- D 0 - I - 0x0297A1 0A:9791: F1        .byte $F1   ; 
- D 0 - I - 0x0297A2 0A:9792: 00        .byte $00   ; 
- D 0 - I - 0x0297A3 0A:9793: 30        .byte $30   ; <0>
- D 0 - I - 0x0297A4 0A:9794: C8        .byte $C8   ; 
- D 0 - I - 0x0297A5 0A:9795: CF        .byte $CF   ; 
- D 0 - I - 0x0297A6 0A:9796: 04        .byte $04   ; 
- D 0 - I - 0x0297A7 0A:9797: F0        .byte $F0   ; 
- D 0 - I - 0x0297A8 0A:9798: F5        .byte $F5   ; 
- D 0 - I - 0x0297A9 0A:9799: 80        .byte $80   ; 
- D 0 - I - 0x0297AA 0A:979A: F4        .byte $F4   ; 
- D 0 - I - 0x0297AB 0A:979B: 04        .byte $04   ; 
- D 0 - I - 0x0297AC 0A:979C: 05        .byte $05   ; 
- D 0 - I - 0x0297AD 0A:979D: 22        .byte $22   ; 
- D 0 - I - 0x0297AE 0A:979E: 00        .byte $00   ; 
- D 0 - I - 0x0297AF 0A:979F: F1        .byte $F1   ; 
- D 0 - I - 0x0297B0 0A:97A0: 00        .byte $00   ; 
- D 0 - I - 0x0297B1 0A:97A1: 31        .byte $31   ; <1>
- D 0 - I - 0x0297B2 0A:97A2: E4        .byte $E4   ; 
- D 0 - I - 0x0297B3 0A:97A3: CB        .byte $CB   ; 
- D 0 - I - 0x0297B4 0A:97A4: 04        .byte $04   ; 
- D 0 - I - 0x0297B5 0A:97A5: 06        .byte $06   ; 
- D 0 - I - 0x0297B6 0A:97A6: F1        .byte $F1   ; 
- D 0 - I - 0x0297B7 0A:97A7: B0        .byte $B0   ; 
- D 0 - I - 0x0297B8 0A:97A8: BA        .byte $BA   ; 
- D 0 - I - 0x0297B9 0A:97A9: E8        .byte $E8   ; 
- D 0 - I - 0x0297BA 0A:97AA: DB        .byte $DB   ; 
- D 0 - I - 0x0297BB 0A:97AB: 00        .byte $00   ; 
- D 0 - I - 0x0297BC 0A:97AC: F8        .byte $F8   ; 
- D 0 - I - 0x0297BD 0A:97AD: A7        .byte $A7   ; 
- D 0 - I - 0x0297BE 0A:97AE: 8B        .byte $8B   ; 
- D 0 - I - 0x0297BF 0A:97AF: F5        .byte $F5   ; 
- D 0 - I - 0x0297C0 0A:97B0: 09        .byte $09   ; 
- D 0 - I - 0x0297C1 0A:97B1: F4        .byte $F4   ; 
- D 0 - I - 0x0297C2 0A:97B2: 04        .byte $04   ; 
- D 0 - I - 0x0297C3 0A:97B3: 05        .byte $05   ; 
- D 0 - I - 0x0297C4 0A:97B4: 00        .byte $00   ; 
- D 0 - I - 0x0297C5 0A:97B5: 00        .byte $00   ; 
- D 0 - I - 0x0297C6 0A:97B6: F1        .byte $F1   ; 
- D 0 - I - 0x0297C7 0A:97B7: 86        .byte $86   ; 
- D 0 - I - 0x0297C8 0A:97B8: C4        .byte $C4   ; 
- D 0 - I - 0x0297C9 0A:97B9: A8        .byte $A8   ; 
- D 0 - I - 0x0297CA 0A:97BA: AB        .byte $AB   ; 
- D 0 - I - 0x0297CB 0A:97BB: 00        .byte $00   ; 
- D 0 - I - 0x0297CC 0A:97BC: F0        .byte $F0   ; 
- D 0 - I - 0x0297CD 0A:97BD: F5        .byte $F5   ; 
- D 0 - I - 0x0297CE 0A:97BE: 83        .byte $83   ; 
- D 0 - I - 0x0297CF 0A:97BF: F4        .byte $F4   ; 
- D 0 - I - 0x0297D0 0A:97C0: 04        .byte $04   ; 
- D 0 - I - 0x0297D1 0A:97C1: 05        .byte $05   ; 
- D 0 - I - 0x0297D2 0A:97C2: 1E        .byte $1E   ; 
- D 0 - I - 0x0297D3 0A:97C3: 1F        .byte $1F   ; 
- D 0 - I - 0x0297D4 0A:97C4: F1        .byte $F1   ; 
- D 0 - I - 0x0297D5 0A:97C5: 00        .byte $00   ; 
- D 0 - I - 0x0297D6 0A:97C6: 8E        .byte $8E   ; 
- D 0 - I - 0x0297D7 0A:97C7: 00        .byte $00   ; 
- D 0 - I - 0x0297D8 0A:97C8: EB        .byte $EB   ; 
- D 0 - I - 0x0297D9 0A:97C9: 01        .byte $01   ; 
- D 0 - I - 0x0297DA 0A:97CA: F1        .byte $F1   ; 
- D 0 - I - 0x0297DB 0A:97CB: 00        .byte $00   ; 
- D 0 - I - 0x0297DC 0A:97CC: 8C        .byte $8C   ; 
- D 0 - I - 0x0297DD 0A:97CD: 00        .byte $00   ; 
- D 0 - I - 0x0297DE 0A:97CE: D3        .byte $D3   ; 
- D 0 - I - 0x0297DF 0A:97CF: 05        .byte $05   ; 
- D 0 - I - 0x0297E0 0A:97D0: F0        .byte $F0   ; 
- D 0 - I - 0x0297E1 0A:97D1: F5        .byte $F5   ; 
- D 0 - I - 0x0297E2 0A:97D2: 83        .byte $83   ; 
- D 0 - I - 0x0297E3 0A:97D3: F4        .byte $F4   ; 
- D 0 - I - 0x0297E4 0A:97D4: 04        .byte $04   ; 
- D 0 - I - 0x0297E5 0A:97D5: 05        .byte $05   ; 
- D 0 - I - 0x0297E6 0A:97D6: 1E        .byte $1E   ; 
- D 0 - I - 0x0297E7 0A:97D7: 1F        .byte $1F   ; 
- D 0 - I - 0x0297E8 0A:97D8: F1        .byte $F1   ; 
- D 0 - I - 0x0297E9 0A:97D9: 6C        .byte $6C   ; <l>
- D 0 - I - 0x0297EA 0A:97DA: B8        .byte $B8   ; 
- D 0 - I - 0x0297EB 0A:97DB: 00        .byte $00   ; 
- D 0 - I - 0x0297EC 0A:97DC: EB        .byte $EB   ; 
- D 0 - I - 0x0297ED 0A:97DD: 01        .byte $01   ; 
- D 0 - I - 0x0297EE 0A:97DE: F1        .byte $F1   ; 
- D 0 - I - 0x0297EF 0A:97DF: 6B        .byte $6B   ; <k>
- D 0 - I - 0x0297F0 0A:97E0: 8D        .byte $8D   ; 
- D 0 - I - 0x0297F1 0A:97E1: 10        .byte $10   ; 
- D 0 - I - 0x0297F2 0A:97E2: C7        .byte $C7   ; 
- D 0 - I - 0x0297F3 0A:97E3: 05        .byte $05   ; 
- D 0 - I - 0x0297F4 0A:97E4: F8        .byte $F8   ; 
- D 0 - I - 0x0297F5 0A:97E5: A7        .byte $A7   ; 
- D 0 - I - 0x0297F6 0A:97E6: 8B        .byte $8B   ; 
- D 0 - I - 0x0297F7 0A:97E7: F5        .byte $F5   ; 
- D 0 - I - 0x0297F8 0A:97E8: 83        .byte $83   ; 
- D 0 - I - 0x0297F9 0A:97E9: F4        .byte $F4   ; 
- D 0 - I - 0x0297FA 0A:97EA: 04        .byte $04   ; 
- D 0 - I - 0x0297FB 0A:97EB: 05        .byte $05   ; 
- D 0 - I - 0x0297FC 0A:97EC: 1E        .byte $1E   ; 
- D 0 - I - 0x0297FD 0A:97ED: 1F        .byte $1F   ; 
- D 0 - I - 0x0297FE 0A:97EE: F1        .byte $F1   ; 
- D 0 - I - 0x0297FF 0A:97EF: 6D        .byte $6D   ; <m>
- D 0 - I - 0x029800 0A:97F0: B8        .byte $B8   ; 
- D 0 - I - 0x029801 0A:97F1: 00        .byte $00   ; 
- D 0 - I - 0x029802 0A:97F2: EB        .byte $EB   ; 
- D 0 - I - 0x029803 0A:97F3: 01        .byte $01   ; 
- D 0 - I - 0x029804 0A:97F4: F8        .byte $F8   ; 
- D 0 - I - 0x029805 0A:97F5: DE        .byte $DE   ; 
- D 0 - I - 0x029806 0A:97F6: 97        .byte $97   ; 
- D 0 - I - 0x029807 0A:97F7: F5        .byte $F5   ; 
- D 0 - I - 0x029808 0A:97F8: 83        .byte $83   ; 
- D 0 - I - 0x029809 0A:97F9: F4        .byte $F4   ; 
- D 0 - I - 0x02980A 0A:97FA: 04        .byte $04   ; 
- D 0 - I - 0x02980B 0A:97FB: 05        .byte $05   ; 
- D 0 - I - 0x02980C 0A:97FC: 1E        .byte $1E   ; 
- D 0 - I - 0x02980D 0A:97FD: 1F        .byte $1F   ; 
- D 0 - I - 0x02980E 0A:97FE: F1        .byte $F1   ; 
- D 0 - I - 0x02980F 0A:97FF: 6E        .byte $6E   ; <n>
- D 0 - I - 0x029810 0A:9800: B8        .byte $B8   ; 
- D 0 - I - 0x029811 0A:9801: 00        .byte $00   ; 
- D 0 - I - 0x029812 0A:9802: EB        .byte $EB   ; 
- D 0 - I - 0x029813 0A:9803: 01        .byte $01   ; 
- D 0 - I - 0x029814 0A:9804: F8        .byte $F8   ; 
- D 0 - I - 0x029815 0A:9805: DE        .byte $DE   ; 
- D 0 - I - 0x029816 0A:9806: 97        .byte $97   ; 
- D 0 - I - 0x029817 0A:9807: F5        .byte $F5   ; 
- D 0 - I - 0x029818 0A:9808: 83        .byte $83   ; 
- D 0 - I - 0x029819 0A:9809: F4        .byte $F4   ; 
- D 0 - I - 0x02981A 0A:980A: 04        .byte $04   ; 
- D 0 - I - 0x02981B 0A:980B: 05        .byte $05   ; 
- D 0 - I - 0x02981C 0A:980C: 1E        .byte $1E   ; 
- D 0 - I - 0x02981D 0A:980D: 1F        .byte $1F   ; 
- D 0 - I - 0x02981E 0A:980E: F1        .byte $F1   ; 
- D 0 - I - 0x02981F 0A:980F: 6C        .byte $6C   ; <l>
- D 0 - I - 0x029820 0A:9810: B8        .byte $B8   ; 
- D 0 - I - 0x029821 0A:9811: 00        .byte $00   ; 
- D 0 - I - 0x029822 0A:9812: EB        .byte $EB   ; 
- D 0 - I - 0x029823 0A:9813: 01        .byte $01   ; 
- D 0 - I - 0x029824 0A:9814: F8        .byte $F8   ; 
- D 0 - I - 0x029825 0A:9815: CA        .byte $CA   ; 
- D 0 - I - 0x029826 0A:9816: 97        .byte $97   ; 
- D 0 - I - 0x029827 0A:9817: F5        .byte $F5   ; 
- D 0 - I - 0x029828 0A:9818: 83        .byte $83   ; 
- D 0 - I - 0x029829 0A:9819: F4        .byte $F4   ; 
- D 0 - I - 0x02982A 0A:981A: 04        .byte $04   ; 
- D 0 - I - 0x02982B 0A:981B: 05        .byte $05   ; 
- D 0 - I - 0x02982C 0A:981C: 1E        .byte $1E   ; 
- D 0 - I - 0x02982D 0A:981D: 1F        .byte $1F   ; 
- D 0 - I - 0x02982E 0A:981E: F1        .byte $F1   ; 
- D 0 - I - 0x02982F 0A:981F: 6E        .byte $6E   ; <n>
- D 0 - I - 0x029830 0A:9820: B8        .byte $B8   ; 
- D 0 - I - 0x029831 0A:9821: 00        .byte $00   ; 
- D 0 - I - 0x029832 0A:9822: EB        .byte $EB   ; 
- D 0 - I - 0x029833 0A:9823: 01        .byte $01   ; 
- D 0 - I - 0x029834 0A:9824: F8        .byte $F8   ; 
- D 0 - I - 0x029835 0A:9825: CA        .byte $CA   ; 
- D 0 - I - 0x029836 0A:9826: 97        .byte $97   ; 
- D 0 - I - 0x029837 0A:9827: F5        .byte $F5   ; 
- D 0 - I - 0x029838 0A:9828: 80        .byte $80   ; 
- D 0 - I - 0x029839 0A:9829: F4        .byte $F4   ; 
- D 0 - I - 0x02983A 0A:982A: 20        .byte $20   ; 
- D 0 - I - 0x02983B 0A:982B: 21        .byte $21   ; 
- D 0 - I - 0x02983C 0A:982C: 00        .byte $00   ; 
- D 0 - I - 0x02983D 0A:982D: 00        .byte $00   ; 
- D 0 - I - 0x02983E 0A:982E: F1        .byte $F1   ; 
- D 0 - I - 0x02983F 0A:982F: 00        .byte $00   ; 
- D 0 - I - 0x029840 0A:9830: 8F        .byte $8F   ; 
- D 0 - I - 0x029841 0A:9831: 10        .byte $10   ; 
- D 0 - I - 0x029842 0A:9832: BB        .byte $BB   ; 
- D 0 - I - 0x029843 0A:9833: 01        .byte $01   ; 
- D 0 - I - 0x029844 0A:9834: F0        .byte $F0   ; 
- D 0 - I - 0x029845 0A:9835: F5        .byte $F5   ; 
- D 0 - I - 0x029846 0A:9836: 85        .byte $85   ; 
- D 0 - I - 0x029847 0A:9837: F4        .byte $F4   ; 
- D 0 - I - 0x029848 0A:9838: 06        .byte $06   ; 
- D 0 - I - 0x029849 0A:9839: 07        .byte $07   ; 
- D 0 - I - 0x02984A 0A:983A: 00        .byte $00   ; 
- D 0 - I - 0x02984B 0A:983B: 00        .byte $00   ; 
- D 0 - I - 0x02984C 0A:983C: F1        .byte $F1   ; 
- D 0 - I - 0x02984D 0A:983D: 00        .byte $00   ; 
- D 0 - I - 0x02984E 0A:983E: 64        .byte $64   ; <d>
- D 0 - I - 0x02984F 0A:983F: 10        .byte $10   ; 
- D 0 - I - 0x029850 0A:9840: D3        .byte $D3   ; 
- D 0 - I - 0x029851 0A:9841: 01        .byte $01   ; 
- D 0 - I - 0x029852 0A:9842: 10        .byte $10   ; 
- D 0 - I - 0x029853 0A:9843: F1        .byte $F1   ; 
- D 0 - I - 0x029854 0A:9844: 00        .byte $00   ; 
- D 0 - I - 0x029855 0A:9845: 65        .byte $65   ; <e>
- D 0 - I - 0x029856 0A:9846: 30        .byte $30   ; <0>
- D 0 - I - 0x029857 0A:9847: CB        .byte $CB   ; 
- D 0 - I - 0x029858 0A:9848: 05        .byte $05   ; 
- D 0 - I - 0x029859 0A:9849: 04        .byte $04   ; 
- D 0 - I - 0x02985A 0A:984A: F1        .byte $F1   ; 
- D 0 - I - 0x02985B 0A:984B: 00        .byte $00   ; 
- D 0 - I - 0x02985C 0A:984C: 67        .byte $67   ; <g>
- D 0 - I - 0x02985D 0A:984D: 00        .byte $00   ; 
- D 0 - I - 0x02985E 0A:984E: D3        .byte $D3   ; 
- D 0 - I - 0x02985F 0A:984F: 05        .byte $05   ; 
- D 0 - I - 0x029860 0A:9850: F1        .byte $F1   ; 
- D 0 - I - 0x029861 0A:9851: 00        .byte $00   ; 
- D 0 - I - 0x029862 0A:9852: 66        .byte $66   ; <f>
- D 0 - I - 0x029863 0A:9853: 00        .byte $00   ; 
- D 0 - I - 0x029864 0A:9854: D3        .byte $D3   ; 
- D 0 - I - 0x029865 0A:9855: 01        .byte $01   ; 
- D 0 - I - 0x029866 0A:9856: 06        .byte $06   ; 
- D 0 - I - 0x029867 0A:9857: F6        .byte $F6   ; 
- D 0 - I - 0x029868 0A:9858: 15        .byte $15   ; 
- D 0 - I - 0x029869 0A:9859: F1        .byte $F1   ; 
- D 0 - I - 0x02986A 0A:985A: 00        .byte $00   ; 
- D 0 - I - 0x02986B 0A:985B: 68        .byte $68   ; <h>
- D 0 - I - 0x02986C 0A:985C: C0        .byte $C0   ; 
- D 0 - I - 0x02986D 0A:985D: C3        .byte $C3   ; 
- D 0 - I - 0x02986E 0A:985E: 00        .byte $00   ; 
- D 0 - I - 0x02986F 0A:985F: 02        .byte $02   ; 
- D 0 - I - 0x029870 0A:9860: F6        .byte $F6   ; 
- D 0 - I - 0x029871 0A:9861: 00        .byte $00   ; 
- D 0 - I - 0x029872 0A:9862: F0        .byte $F0   ; 
- D 0 - I - 0x029873 0A:9863: F5        .byte $F5   ; 
- D 0 - I - 0x029874 0A:9864: 80        .byte $80   ; 
- D 0 - I - 0x029875 0A:9865: F4        .byte $F4   ; 
- D 0 - I - 0x029876 0A:9866: 20        .byte $20   ; 
- D 0 - I - 0x029877 0A:9867: 21        .byte $21   ; 
- D 0 - I - 0x029878 0A:9868: 00        .byte $00   ; 
- D 0 - I - 0x029879 0A:9869: 00        .byte $00   ; 
- D 0 - I - 0x02987A 0A:986A: F1        .byte $F1   ; 
- D 0 - I - 0x02987B 0A:986B: 00        .byte $00   ; 
- D 0 - I - 0x02987C 0A:986C: 90        .byte $90   ; 
- D 0 - I - 0x02987D 0A:986D: 10        .byte $10   ; 
- D 0 - I - 0x02987E 0A:986E: BB        .byte $BB   ; 
- D 0 - I - 0x02987F 0A:986F: 01        .byte $01   ; 
- D 0 - I - 0x029880 0A:9870: F0        .byte $F0   ; 
- D 0 - I - 0x029881 0A:9871: F5        .byte $F5   ; 
- D 0 - I - 0x029882 0A:9872: 80        .byte $80   ; 
- D 0 - I - 0x029883 0A:9873: F4        .byte $F4   ; 
- D 0 - I - 0x029884 0A:9874: 10        .byte $10   ; 
- D 0 - I - 0x029885 0A:9875: 11        .byte $11   ; 
- D 0 - I - 0x029886 0A:9876: 12        .byte $12   ; 
- D 0 - I - 0x029887 0A:9877: 13        .byte $13   ; 
- D 0 - I - 0x029888 0A:9878: F1        .byte $F1   ; 
- D 0 - I - 0x029889 0A:9879: D0        .byte $D0   ; 
- D 0 - I - 0x02988A 0A:987A: 2E        .byte $2E   ; 
- D 0 - I - 0x02988B 0A:987B: 20        .byte $20   ; 
- D 0 - I - 0x02988C 0A:987C: B3        .byte $B3   ; 
- D 0 - I - 0x02988D 0A:987D: 05        .byte $05   ; 
- D 0 - I - 0x02988E 0A:987E: F1        .byte $F1   ; 
- D 0 - I - 0x02988F 0A:987F: B2        .byte $B2   ; 
- D 0 - I - 0x029890 0A:9880: 2D        .byte $2D   ; 
- D 0 - I - 0x029891 0A:9881: 18        .byte $18   ; 
- D 0 - I - 0x029892 0A:9882: BB        .byte $BB   ; 
- D 0 - I - 0x029893 0A:9883: 01        .byte $01   ; 
- D 0 - I - 0x029894 0A:9884: F0        .byte $F0   ; 
- D 0 - I - 0x029895 0A:9885: F5        .byte $F5   ; 
- D 0 - I - 0x029896 0A:9886: 0A        .byte $0A   ; 
- D 0 - I - 0x029897 0A:9887: F4        .byte $F4   ; 
- D 0 - I - 0x029898 0A:9888: 2C        .byte $2C   ; 
- D 0 - I - 0x029899 0A:9889: 0B        .byte $0B   ; 
- D 0 - I - 0x02989A 0A:988A: 05        .byte $05   ; 
- D 0 - I - 0x02989B 0A:988B: 07        .byte $07   ; 
- D 0 - I - 0x02989C 0A:988C: F1        .byte $F1   ; 
- D 0 - I - 0x02989D 0A:988D: 00        .byte $00   ; 
- D 0 - I - 0x02989E 0A:988E: 91        .byte $91   ; 
- D 0 - I - 0x02989F 0A:988F: 00        .byte $00   ; 
- D 0 - I - 0x0298A0 0A:9890: D3        .byte $D3   ; 
- D 0 - I - 0x0298A1 0A:9891: 01        .byte $01   ; 
- D 0 - I - 0x0298A2 0A:9892: F1        .byte $F1   ; 
- D 0 - I - 0x0298A3 0A:9893: 70        .byte $70   ; <p>
- D 0 - I - 0x0298A4 0A:9894: 92        .byte $92   ; 
- D 0 - I - 0x0298A5 0A:9895: 28        .byte $28   ; 
- D 0 - I - 0x0298A6 0A:9896: C3        .byte $C3   ; 
- D 0 - I - 0x0298A7 0A:9897: 05        .byte $05   ; 
- D 0 - I - 0x0298A8 0A:9898: F1        .byte $F1   ; 
- D 0 - I - 0x0298A9 0A:9899: 70        .byte $70   ; <p>
- D 0 - I - 0x0298AA 0A:989A: 92        .byte $92   ; 
- D 0 - I - 0x0298AB 0A:989B: 00        .byte $00   ; 
- D 0 - I - 0x0298AC 0A:989C: C3        .byte $C3   ; 
- D 0 - I - 0x0298AD 0A:989D: 08        .byte $08   ; 
- D 0 - I - 0x0298AE 0A:989E: F1        .byte $F1   ; 
- D 0 - I - 0x0298AF 0A:989F: 71        .byte $71   ; <q>
- D 0 - I - 0x0298B0 0A:98A0: 93        .byte $93   ; 
- D 0 - I - 0x0298B1 0A:98A1: B8        .byte $B8   ; 
- D 0 - I - 0x0298B2 0A:98A2: B3        .byte $B3   ; 
- D 0 - I - 0x0298B3 0A:98A3: 0C        .byte $0C   ; 
- D 0 - I - 0x0298B4 0A:98A4: F1        .byte $F1   ; 
- D 0 - I - 0x0298B5 0A:98A5: 71        .byte $71   ; <q>
- D 0 - I - 0x0298B6 0A:98A6: 93        .byte $93   ; 
- D 0 - I - 0x0298B7 0A:98A7: 00        .byte $00   ; 
- D 0 - I - 0x0298B8 0A:98A8: B3        .byte $B3   ; 
- D 0 - I - 0x0298B9 0A:98A9: 10        .byte $10   ; 
- D 0 - I - 0x0298BA 0A:98AA: F0        .byte $F0   ; 
- D 0 - I - 0x0298BB 0A:98AB: F5        .byte $F5   ; 
- D 0 - I - 0x0298BC 0A:98AC: 80        .byte $80   ; 
- D 0 - I - 0x0298BD 0A:98AD: F4        .byte $F4   ; 
- D 0 - I - 0x0298BE 0A:98AE: 08        .byte $08   ; 
- D 0 - I - 0x0298BF 0A:98AF: 09        .byte $09   ; 
- D 0 - I - 0x0298C0 0A:98B0: 0A        .byte $0A   ; 
- D 0 - I - 0x0298C1 0A:98B1: 0B        .byte $0B   ; 
- D 0 - I - 0x0298C2 0A:98B2: F1        .byte $F1   ; 
- D 0 - I - 0x0298C3 0A:98B3: 00        .byte $00   ; 
- D 0 - I - 0x0298C4 0A:98B4: 58        .byte $58   ; <X>
- D 0 - I - 0x0298C5 0A:98B5: 00        .byte $00   ; 
- D 0 - I - 0x0298C6 0A:98B6: C3        .byte $C3   ; 
- D 0 - I - 0x0298C7 0A:98B7: 09        .byte $09   ; 
- D 0 - I - 0x0298C8 0A:98B8: F1        .byte $F1   ; 
- D 0 - I - 0x0298C9 0A:98B9: 00        .byte $00   ; 
- D 0 - I - 0x0298CA 0A:98BA: 4B        .byte $4B   ; <K>
- D 0 - I - 0x0298CB 0A:98BB: 00        .byte $00   ; 
- D 0 - I - 0x0298CC 0A:98BC: C3        .byte $C3   ; 
- D 0 - I - 0x0298CD 0A:98BD: 01        .byte $01   ; 
- D 0 - I - 0x0298CE 0A:98BE: F1        .byte $F1   ; 
- D 0 - I - 0x0298CF 0A:98BF: 00        .byte $00   ; 
- D 0 - I - 0x0298D0 0A:98C0: 4D        .byte $4D   ; <M>
- D 0 - I - 0x0298D1 0A:98C1: 00        .byte $00   ; 
- D 0 - I - 0x0298D2 0A:98C2: C3        .byte $C3   ; 
- D 0 - I - 0x0298D3 0A:98C3: 05        .byte $05   ; 
- D 0 - I - 0x0298D4 0A:98C4: F0        .byte $F0   ; 
- D 0 - I - 0x0298D5 0A:98C5: F5        .byte $F5   ; 
- D 0 - I - 0x0298D6 0A:98C6: 84        .byte $84   ; 
- D 0 - I - 0x0298D7 0A:98C7: 80        .byte $80   ; 
- D 0 - I - 0x0298D8 0A:98C8: F4        .byte $F4   ; 
- D 0 - I - 0x0298D9 0A:98C9: 33        .byte $33   ; <3>
- D 0 - I - 0x0298DA 0A:98CA: 00        .byte $00   ; 
- D 0 - I - 0x0298DB 0A:98CB: 00        .byte $00   ; 
- D 0 - I - 0x0298DC 0A:98CC: 00        .byte $00   ; 
- D 0 - I - 0x0298DD 0A:98CD: F1        .byte $F1   ; 
- D 0 - I - 0x0298DE 0A:98CE: 00        .byte $00   ; 
- D 0 - I - 0x0298DF 0A:98CF: 98        .byte $98   ; 
- D 0 - I - 0x0298E0 0A:98D0: 00        .byte $00   ; 
- D 0 - I - 0x0298E1 0A:98D1: D3        .byte $D3   ; 
- D 0 - I - 0x0298E2 0A:98D2: 01        .byte $01   ; 
- D 0 - I - 0x0298E3 0A:98D3: F0        .byte $F0   ; 
- D 0 - I - 0x0298E4 0A:98D4: F5        .byte $F5   ; 
- D 0 - I - 0x0298E5 0A:98D5: 0F        .byte $0F   ; 
- D 0 - I - 0x0298E6 0A:98D6: F4        .byte $F4   ; 
- D 0 - I - 0x0298E7 0A:98D7: 08        .byte $08   ; 
- D 0 - I - 0x0298E8 0A:98D8: 09        .byte $09   ; 
- D 0 - I - 0x0298E9 0A:98D9: 0A        .byte $0A   ; 
- D 0 - I - 0x0298EA 0A:98DA: 0B        .byte $0B   ; 
- D 0 - I - 0x0298EB 0A:98DB: F1        .byte $F1   ; 
- D 0 - I - 0x0298EC 0A:98DC: AC        .byte $AC   ; 
- D 0 - I - 0x0298ED 0A:98DD: 49        .byte $49   ; <I>
- D 0 - I - 0x0298EE 0A:98DE: 9C        .byte $9C   ; 
- D 0 - I - 0x0298EF 0A:98DF: 63        .byte $63   ; <c>
- D 0 - I - 0x0298F0 0A:98E0: 00        .byte $00   ; 
- D 0 - I - 0x0298F1 0A:98E1: F1        .byte $F1   ; 
- D 0 - I - 0x0298F2 0A:98E2: 67        .byte $67   ; <g>
- D 0 - I - 0x0298F3 0A:98E3: D3        .byte $D3   ; 
- D 0 - I - 0x0298F4 0A:98E4: F0        .byte $F0   ; 
- D 0 - I - 0x0298F5 0A:98E5: B3        .byte $B3   ; 
- D 0 - I - 0x0298F6 0A:98E6: 04        .byte $04   ; 
- D 0 - I - 0x0298F7 0A:98E7: F1        .byte $F1   ; 
- D 0 - I - 0x0298F8 0A:98E8: 67        .byte $67   ; <g>
- D 0 - I - 0x0298F9 0A:98E9: 95        .byte $95   ; 
- D 0 - I - 0x0298FA 0A:98EA: F0        .byte $F0   ; 
- D 0 - I - 0x0298FB 0A:98EB: B3        .byte $B3   ; 
- D 0 - I - 0x0298FC 0A:98EC: 08        .byte $08   ; 
- D 0 - I - 0x0298FD 0A:98ED: F1        .byte $F1   ; 
- D 0 - I - 0x0298FE 0A:98EE: 67        .byte $67   ; <g>
- D 0 - I - 0x0298FF 0A:98EF: 96        .byte $96   ; 
- D 0 - I - 0x029900 0A:98F0: F0        .byte $F0   ; 
- D 0 - I - 0x029901 0A:98F1: B3        .byte $B3   ; 
- D 0 - I - 0x029902 0A:98F2: 0C        .byte $0C   ; 
- D 0 - I - 0x029903 0A:98F3: 16        .byte $16   ; 
- D 0 - I - 0x029904 0A:98F4: F4        .byte $F4   ; 
- D 0 - I - 0x029905 0A:98F5: 0A        .byte $0A   ; 
- D 0 - I - 0x029906 0A:98F6: 0B        .byte $0B   ; 
- D 0 - I - 0x029907 0A:98F7: 00        .byte $00   ; 
- D 0 - I - 0x029908 0A:98F8: 00        .byte $00   ; 
- D 0 - I - 0x029909 0A:98F9: F6        .byte $F6   ; 
- D 0 - I - 0x02990A 0A:98FA: 00        .byte $00   ; 
- D 0 - I - 0x02990B 0A:98FB: F6        .byte $F6   ; 
- D 0 - I - 0x02990C 0A:98FC: 2A        .byte $2A   ; 
- D 0 - I - 0x02990D 0A:98FD: F6        .byte $F6   ; 
- D 0 - I - 0x02990E 0A:98FE: 3F        .byte $3F   ; 
- D 0 - I - 0x02990F 0A:98FF: F1        .byte $F1   ; 
- D 0 - I - 0x029910 0A:9900: 00        .byte $00   ; 
- D 0 - I - 0x029911 0A:9901: DA        .byte $DA   ; 
- D 0 - I - 0x029912 0A:9902: 20        .byte $20   ; 
- D 0 - I - 0x029913 0A:9903: BB        .byte $BB   ; 
- D 0 - I - 0x029914 0A:9904: 05        .byte $05   ; 
- D 0 - I - 0x029915 0A:9905: 04        .byte $04   ; 
- D 0 - I - 0x029916 0A:9906: F1        .byte $F1   ; 
- D 0 - I - 0x029917 0A:9907: 68        .byte $68   ; <h>
- D 0 - I - 0x029918 0A:9908: E0        .byte $E0   ; 
- D 0 - I - 0x029919 0A:9909: 20        .byte $20   ; 
- D 0 - I - 0x02991A 0A:990A: BB        .byte $BB   ; 
- D 0 - I - 0x02991B 0A:990B: 05        .byte $05   ; 
- D 0 - I - 0x02991C 0A:990C: F1        .byte $F1   ; 
- D 0 - I - 0x02991D 0A:990D: AD        .byte $AD   ; 
- D 0 - I - 0x02991E 0A:990E: 86        .byte $86   ; 
- D 0 - I - 0x02991F 0A:990F: 08        .byte $08   ; 
- D 0 - I - 0x029920 0A:9910: EB        .byte $EB   ; 
- D 0 - I - 0x029921 0A:9911: 01        .byte $01   ; 
- D 0 - I - 0x029922 0A:9912: F0        .byte $F0   ; 
- D 0 - I - 0x029923 0A:9913: F5        .byte $F5   ; 
- D 0 - I - 0x029924 0A:9914: 84        .byte $84   ; 
- D 0 - I - 0x029925 0A:9915: 02        .byte $02   ; 
- D 0 - I - 0x029926 0A:9916: F4        .byte $F4   ; 
- D 0 - I - 0x029927 0A:9917: 38        .byte $38   ; <8>
- D 0 - I - 0x029928 0A:9918: 39        .byte $39   ; <9>
- D 0 - I - 0x029929 0A:9919: 42        .byte $42   ; <B>
- D 0 - I - 0x02992A 0A:991A: 41        .byte $41   ; <A>
- D 0 - I - 0x02992B 0A:991B: F1        .byte $F1   ; 
- D 0 - I - 0x02992C 0A:991C: 00        .byte $00   ; 
- D 0 - I - 0x02992D 0A:991D: B1        .byte $B1   ; 
- D 0 - I - 0x02992E 0A:991E: 10        .byte $10   ; 
- D 0 - I - 0x02992F 0A:991F: CB        .byte $CB   ; 
- D 0 - I - 0x029930 0A:9920: 01        .byte $01   ; 
- D 0 - I - 0x029931 0A:9921: F0        .byte $F0   ; 
- D 0 - I - 0x029932 0A:9922: F5        .byte $F5   ; 
- D 0 - I - 0x029933 0A:9923: 84        .byte $84   ; 
- D 0 - I - 0x029934 0A:9924: 81        .byte $81   ; 
- D 0 - I - 0x029935 0A:9925: F4        .byte $F4   ; 
- D 0 - I - 0x029936 0A:9926: 38        .byte $38   ; <8>
- D 0 - I - 0x029937 0A:9927: 39        .byte $39   ; <9>
- D 0 - I - 0x029938 0A:9928: 42        .byte $42   ; <B>
- D 0 - I - 0x029939 0A:9929: 41        .byte $41   ; <A>
- D 0 - I - 0x02993A 0A:992A: F1        .byte $F1   ; 
- D 0 - I - 0x02993B 0A:992B: 00        .byte $00   ; 
- D 0 - I - 0x02993C 0A:992C: AE        .byte $AE   ; 
- D 0 - I - 0x02993D 0A:992D: 10        .byte $10   ; 
- D 0 - I - 0x02993E 0A:992E: CB        .byte $CB   ; 
- D 0 - I - 0x02993F 0A:992F: 01        .byte $01   ; 
- D 0 - I - 0x029940 0A:9930: F0        .byte $F0   ; 
- D 0 - I - 0x029941 0A:9931: F5        .byte $F5   ; 
- D 0 - I - 0x029942 0A:9932: 10        .byte $10   ; 
- D 0 - I - 0x029943 0A:9933: F4        .byte $F4   ; 
- D 0 - I - 0x029944 0A:9934: 08        .byte $08   ; 
- D 0 - I - 0x029945 0A:9935: 09        .byte $09   ; 
- D 0 - I - 0x029946 0A:9936: 0A        .byte $0A   ; 
- D 0 - I - 0x029947 0A:9937: 0B        .byte $0B   ; 
- D 0 - I - 0x029948 0A:9938: F1        .byte $F1   ; 
- D 0 - I - 0x029949 0A:9939: AC        .byte $AC   ; 
- D 0 - I - 0x02994A 0A:993A: 49        .byte $49   ; <I>
- D 0 - I - 0x02994B 0A:993B: 9C        .byte $9C   ; 
- D 0 - I - 0x02994C 0A:993C: 63        .byte $63   ; <c>
- D 0 - I - 0x02994D 0A:993D: 00        .byte $00   ; 
- D 0 - I - 0x02994E 0A:993E: F1        .byte $F1   ; 
- D 0 - I - 0x02994F 0A:993F: 67        .byte $67   ; <g>
- D 0 - I - 0x029950 0A:9940: D4        .byte $D4   ; 
- D 0 - I - 0x029951 0A:9941: F0        .byte $F0   ; 
- D 0 - I - 0x029952 0A:9942: B3        .byte $B3   ; 
- D 0 - I - 0x029953 0A:9943: 04        .byte $04   ; 
- D 0 - I - 0x029954 0A:9944: F1        .byte $F1   ; 
- D 0 - I - 0x029955 0A:9945: 67        .byte $67   ; <g>
- D 0 - I - 0x029956 0A:9946: 95        .byte $95   ; 
- D 0 - I - 0x029957 0A:9947: F0        .byte $F0   ; 
- D 0 - I - 0x029958 0A:9948: B3        .byte $B3   ; 
- D 0 - I - 0x029959 0A:9949: 08        .byte $08   ; 
- D 0 - I - 0x02995A 0A:994A: F1        .byte $F1   ; 
- D 0 - I - 0x02995B 0A:994B: 67        .byte $67   ; <g>
- D 0 - I - 0x02995C 0A:994C: 96        .byte $96   ; 
- D 0 - I - 0x02995D 0A:994D: F0        .byte $F0   ; 
- D 0 - I - 0x02995E 0A:994E: B3        .byte $B3   ; 
- D 0 - I - 0x02995F 0A:994F: 0C        .byte $0C   ; 
- D 0 - I - 0x029960 0A:9950: 16        .byte $16   ; 
- D 0 - I - 0x029961 0A:9951: F4        .byte $F4   ; 
- D 0 - I - 0x029962 0A:9952: 0A        .byte $0A   ; 
- D 0 - I - 0x029963 0A:9953: 0B        .byte $0B   ; 
- D 0 - I - 0x029964 0A:9954: 00        .byte $00   ; 
- D 0 - I - 0x029965 0A:9955: 00        .byte $00   ; 
- D 0 - I - 0x029966 0A:9956: F6        .byte $F6   ; 
- D 0 - I - 0x029967 0A:9957: 00        .byte $00   ; 
- D 0 - I - 0x029968 0A:9958: F6        .byte $F6   ; 
- D 0 - I - 0x029969 0A:9959: 2A        .byte $2A   ; 
- D 0 - I - 0x02996A 0A:995A: F6        .byte $F6   ; 
- D 0 - I - 0x02996B 0A:995B: 3F        .byte $3F   ; 
- D 0 - I - 0x02996C 0A:995C: F1        .byte $F1   ; 
- D 0 - I - 0x02996D 0A:995D: 00        .byte $00   ; 
- D 0 - I - 0x02996E 0A:995E: DB        .byte $DB   ; 
- D 0 - I - 0x02996F 0A:995F: 20        .byte $20   ; 
- D 0 - I - 0x029970 0A:9960: BB        .byte $BB   ; 
- D 0 - I - 0x029971 0A:9961: 05        .byte $05   ; 
- D 0 - I - 0x029972 0A:9962: 04        .byte $04   ; 
- D 0 - I - 0x029973 0A:9963: F1        .byte $F1   ; 
- D 0 - I - 0x029974 0A:9964: 68        .byte $68   ; <h>
- D 0 - I - 0x029975 0A:9965: E1        .byte $E1   ; 
- D 0 - I - 0x029976 0A:9966: 20        .byte $20   ; 
- D 0 - I - 0x029977 0A:9967: BB        .byte $BB   ; 
- D 0 - I - 0x029978 0A:9968: 05        .byte $05   ; 
- D 0 - I - 0x029979 0A:9969: F8        .byte $F8   ; 
- D 0 - I - 0x02997A 0A:996A: 0C        .byte $0C   ; 
- D 0 - I - 0x02997B 0A:996B: 99        .byte $99   ; 
- D 0 - I - 0x02997C 0A:996C: F5        .byte $F5   ; 
- D 0 - I - 0x02997D 0A:996D: 84        .byte $84   ; 
- D 0 - I - 0x02997E 0A:996E: 82        .byte $82   ; 
- D 0 - I - 0x02997F 0A:996F: F4        .byte $F4   ; 
- D 0 - I - 0x029980 0A:9970: 36        .byte $36   ; <6>
- D 0 - I - 0x029981 0A:9971: 37        .byte $37   ; <7>
- D 0 - I - 0x029982 0A:9972: 00        .byte $00   ; 
- D 0 - I - 0x029983 0A:9973: 00        .byte $00   ; 
- D 0 - I - 0x029984 0A:9974: F1        .byte $F1   ; 
- D 0 - I - 0x029985 0A:9975: 00        .byte $00   ; 
- D 0 - I - 0x029986 0A:9976: 9E        .byte $9E   ; 
- D 0 - I - 0x029987 0A:9977: 00        .byte $00   ; 
- D 0 - I - 0x029988 0A:9978: D3        .byte $D3   ; 
- D 0 - I - 0x029989 0A:9979: 01        .byte $01   ; 
- D 0 - I - 0x02998A 0A:997A: F0        .byte $F0   ; 
- D 0 - I - 0x02998B 0A:997B: F5        .byte $F5   ; 
- D 0 - I - 0x02998C 0A:997C: 84        .byte $84   ; 
- D 0 - I - 0x02998D 0A:997D: 06        .byte $06   ; 
- D 0 - I - 0x02998E 0A:997E: F8        .byte $F8   ; 
- D 0 - I - 0x02998F 0A:997F: 6F        .byte $6F   ; <o>
- D 0 - I - 0x029990 0A:9980: 99        .byte $99   ; 
- D 0 - I - 0x029991 0A:9981: F5        .byte $F5   ; 
- D 0 - I - 0x029992 0A:9982: 84        .byte $84   ; 
- D 0 - I - 0x029993 0A:9983: 83        .byte $83   ; 
- D 0 - I - 0x029994 0A:9984: F4        .byte $F4   ; 
- D 0 - I - 0x029995 0A:9985: 34        .byte $34   ; <4>
- D 0 - I - 0x029996 0A:9986: 00        .byte $00   ; 
- D 0 - I - 0x029997 0A:9987: 00        .byte $00   ; 
- D 0 - I - 0x029998 0A:9988: 00        .byte $00   ; 
- D 0 - I - 0x029999 0A:9989: F1        .byte $F1   ; 
- D 0 - I - 0x02999A 0A:998A: 00        .byte $00   ; 
- D 0 - I - 0x02999B 0A:998B: 9D        .byte $9D   ; 
- D 0 - I - 0x02999C 0A:998C: 00        .byte $00   ; 
- D 0 - I - 0x02999D 0A:998D: D3        .byte $D3   ; 
- D 0 - I - 0x02999E 0A:998E: 01        .byte $01   ; 
- D 0 - I - 0x02999F 0A:998F: F0        .byte $F0   ; 
- D 0 - I - 0x0299A0 0A:9990: F5        .byte $F5   ; 
- D 0 - I - 0x0299A1 0A:9991: 84        .byte $84   ; 
- D 0 - I - 0x0299A2 0A:9992: 09        .byte $09   ; 
- D 0 - I - 0x0299A3 0A:9993: F8        .byte $F8   ; 
- D 0 - I - 0x0299A4 0A:9994: 84        .byte $84   ; 
- D 0 - I - 0x0299A5 0A:9995: 99        .byte $99   ; 
- D 0 - I - 0x0299A6 0A:9996: F5        .byte $F5   ; 
- D 0 - I - 0x0299A7 0A:9997: 84        .byte $84   ; 
- D 0 - I - 0x0299A8 0A:9998: 85        .byte $85   ; 
- D 0 - I - 0x0299A9 0A:9999: F4        .byte $F4   ; 
- D 0 - I - 0x0299AA 0A:999A: 36        .byte $36   ; <6>
- D 0 - I - 0x0299AB 0A:999B: 37        .byte $37   ; <7>
- D 0 - I - 0x0299AC 0A:999C: 00        .byte $00   ; 
- D 0 - I - 0x0299AD 0A:999D: 00        .byte $00   ; 
- D 0 - I - 0x0299AE 0A:999E: F1        .byte $F1   ; 
- D 0 - I - 0x0299AF 0A:999F: 00        .byte $00   ; 
- D 0 - I - 0x0299B0 0A:99A0: AA        .byte $AA   ; 
- D 0 - I - 0x0299B1 0A:99A1: 00        .byte $00   ; 
- D 0 - I - 0x0299B2 0A:99A2: D3        .byte $D3   ; 
- D 0 - I - 0x0299B3 0A:99A3: 01        .byte $01   ; 
- D 0 - I - 0x0299B4 0A:99A4: F0        .byte $F0   ; 
- D 0 - I - 0x0299B5 0A:99A5: F5        .byte $F5   ; 
- D 0 - I - 0x0299B6 0A:99A6: 84        .byte $84   ; 
- D 0 - I - 0x0299B7 0A:99A7: 0C        .byte $0C   ; 
- D 0 - I - 0x0299B8 0A:99A8: F8        .byte $F8   ; 
- D 0 - I - 0x0299B9 0A:99A9: 99        .byte $99   ; 
- D 0 - I - 0x0299BA 0A:99AA: 99        .byte $99   ; 
- D 0 - I - 0x0299BB 0A:99AB: F5        .byte $F5   ; 
- D 0 - I - 0x0299BC 0A:99AC: 84        .byte $84   ; 
- D 0 - I - 0x0299BD 0A:99AD: 0D        .byte $0D   ; 
- D 0 - I - 0x0299BE 0A:99AE: F8        .byte $F8   ; 
- D 0 - I - 0x0299BF 0A:99AF: B2        .byte $B2   ; 
- D 0 - I - 0x0299C0 0A:99B0: 9A        .byte $9A   ; 
- D 0 - I - 0x0299C1 0A:99B1: F5        .byte $F5   ; 
- D 0 - I - 0x0299C2 0A:99B2: 80        .byte $80   ; 
- D 0 - I - 0x0299C3 0A:99B3: F4        .byte $F4   ; 
- D 0 - I - 0x0299C4 0A:99B4: 10        .byte $10   ; 
- D 0 - I - 0x0299C5 0A:99B5: 11        .byte $11   ; 
- D 0 - I - 0x0299C6 0A:99B6: 12        .byte $12   ; 
- D 0 - I - 0x0299C7 0A:99B7: 13        .byte $13   ; 
- D 0 - I - 0x0299C8 0A:99B8: F7        .byte $F7   ; 
- D 0 - I - 0x0299C9 0A:99B9: 23        .byte $23   ; 
- D 0 - I - 0x0299CA 0A:99BA: 5B        .byte $5B   ; 
- D 0 - I - 0x0299CB 0A:99BB: F1        .byte $F1   ; 
- D 0 - I - 0x0299CC 0A:99BC: D2        .byte $D2   ; 
- D 0 - I - 0x0299CD 0A:99BD: 2E        .byte $2E   ; 
- D 0 - I - 0x0299CE 0A:99BE: 20        .byte $20   ; 
- D 0 - I - 0x0299CF 0A:99BF: BB        .byte $BB   ; 
- D 0 - I - 0x0299D0 0A:99C0: 0D        .byte $0D   ; 
- D 0 - I - 0x0299D1 0A:99C1: F1        .byte $F1   ; 
- D 0 - I - 0x0299D2 0A:99C2: D1        .byte $D1   ; 
- D 0 - I - 0x0299D3 0A:99C3: 2D        .byte $2D   ; 
- D 0 - I - 0x0299D4 0A:99C4: 18        .byte $18   ; 
- D 0 - I - 0x0299D5 0A:99C5: C3        .byte $C3   ; 
- D 0 - I - 0x0299D6 0A:99C6: 09        .byte $09   ; 
- D 0 - I - 0x0299D7 0A:99C7: F1        .byte $F1   ; 
- D 0 - I - 0x0299D8 0A:99C8: 00        .byte $00   ; 
- D 0 - I - 0x0299D9 0A:99C9: 00        .byte $00   ; 
- D 0 - I - 0x0299DA 0A:99CA: 80        .byte $80   ; 
- D 0 - I - 0x0299DB 0A:99CB: A3        .byte $A3   ; 
- D 0 - I - 0x0299DC 0A:99CC: 04        .byte $04   ; 
- D 0 - I - 0x0299DD 0A:99CD: F1        .byte $F1   ; 
- D 0 - I - 0x0299DE 0A:99CE: 00        .byte $00   ; 
- D 0 - I - 0x0299DF 0A:99CF: 00        .byte $00   ; 
- D 0 - I - 0x0299E0 0A:99D0: 80        .byte $80   ; 
- D 0 - I - 0x0299E1 0A:99D1: DB        .byte $DB   ; 
- D 0 - I - 0x0299E2 0A:99D2: 00        .byte $00   ; 
- D 0 - I - 0x0299E3 0A:99D3: F0        .byte $F0   ; 
- D 0 - I - 0x0299E4 0A:99D4: F5        .byte $F5   ; 
- D 0 - I - 0x0299E5 0A:99D5: 84        .byte $84   ; 
- D 0 - I - 0x0299E6 0A:99D6: 0F        .byte $0F   ; 
- D 0 - I - 0x0299E7 0A:99D7: F8        .byte $F8   ; 
- D 0 - I - 0x0299E8 0A:99D8: 05        .byte $05   ; 
- D 0 - I - 0x0299E9 0A:99D9: 9B        .byte $9B   ; 
- D 0 - I - 0x0299EA 0A:99DA: F5        .byte $F5   ; 
- D 0 - I - 0x0299EB 0A:99DB: 84        .byte $84   ; 
- D 0 - I - 0x0299EC 0A:99DC: 10        .byte $10   ; 
- D 0 - I - 0x0299ED 0A:99DD: F8        .byte $F8   ; 
- D 0 - I - 0x0299EE 0A:99DE: D8        .byte $D8   ; 
- D 0 - I - 0x0299EF 0A:99DF: 9A        .byte $9A   ; 
- D 0 - I - 0x0299F0 0A:99E0: F5        .byte $F5   ; 
- D 0 - I - 0x0299F1 0A:99E1: 84        .byte $84   ; 
- D 0 - I - 0x0299F2 0A:99E2: 11        .byte $11   ; 
- D 0 - I - 0x0299F3 0A:99E3: F8        .byte $F8   ; 
- D 0 - I - 0x0299F4 0A:99E4: A3        .byte $A3   ; 
- D 0 - I - 0x0299F5 0A:99E5: 9A        .byte $9A   ; 
- D 0 - I - 0x0299F6 0A:99E6: F5        .byte $F5   ; 
- D 0 - I - 0x0299F7 0A:99E7: 84        .byte $84   ; 
- D 0 - I - 0x0299F8 0A:99E8: 12        .byte $12   ; 
- D 0 - I - 0x0299F9 0A:99E9: F8        .byte $F8   ; 
- D 0 - I - 0x0299FA 0A:99EA: F6        .byte $F6   ; 
- D 0 - I - 0x0299FB 0A:99EB: 9A        .byte $9A   ; 
- D 0 - I - 0x0299FC 0A:99EC: F5        .byte $F5   ; 
- D 0 - I - 0x0299FD 0A:99ED: 84        .byte $84   ; 
- D 0 - I - 0x0299FE 0A:99EE: 13        .byte $13   ; 
- D 0 - I - 0x0299FF 0A:99EF: F8        .byte $F8   ; 
- D 0 - I - 0x029A00 0A:99F0: 14        .byte $14   ; 
- D 0 - I - 0x029A01 0A:99F1: 9B        .byte $9B   ; 
- D 0 - I - 0x029A02 0A:99F2: F5        .byte $F5   ; 
- D 0 - I - 0x029A03 0A:99F3: 84        .byte $84   ; 
- D 0 - I - 0x029A04 0A:99F4: 14        .byte $14   ; 
- D 0 - I - 0x029A05 0A:99F5: F8        .byte $F8   ; 
- D 0 - I - 0x029A06 0A:99F6: E7        .byte $E7   ; 
- D 0 - I - 0x029A07 0A:99F7: 9A        .byte $9A   ; 
- D 0 - I - 0x029A08 0A:99F8: F5        .byte $F5   ; 
- D 0 - I - 0x029A09 0A:99F9: 84        .byte $84   ; 
- D 0 - I - 0x029A0A 0A:99FA: 15        .byte $15   ; 
- D 0 - I - 0x029A0B 0A:99FB: F4        .byte $F4   ; 
- D 0 - I - 0x029A0C 0A:99FC: 38        .byte $38   ; <8>
- D 0 - I - 0x029A0D 0A:99FD: 39        .byte $39   ; <9>
- D 0 - I - 0x029A0E 0A:99FE: 42        .byte $42   ; <B>
- D 0 - I - 0x029A0F 0A:99FF: 41        .byte $41   ; <A>
- D 0 - I - 0x029A10 0A:9A00: F1        .byte $F1   ; 
- D 0 - I - 0x029A11 0A:9A01: 00        .byte $00   ; 
- D 0 - I - 0x029A12 0A:9A02: B0        .byte $B0   ; 
- D 0 - I - 0x029A13 0A:9A03: 10        .byte $10   ; 
- D 0 - I - 0x029A14 0A:9A04: CB        .byte $CB   ; 
- D 0 - I - 0x029A15 0A:9A05: 01        .byte $01   ; 
- D 0 - I - 0x029A16 0A:9A06: F0        .byte $F0   ; 
- D 0 - I - 0x029A17 0A:9A07: F5        .byte $F5   ; 
- D 0 - I - 0x029A18 0A:9A08: 80        .byte $80   ; 
- D 0 - I - 0x029A19 0A:9A09: F4        .byte $F4   ; 
- D 0 - I - 0x029A1A 0A:9A0A: 08        .byte $08   ; 
- D 0 - I - 0x029A1B 0A:9A0B: 09        .byte $09   ; 
- D 0 - I - 0x029A1C 0A:9A0C: 0A        .byte $0A   ; 
- D 0 - I - 0x029A1D 0A:9A0D: 0B        .byte $0B   ; 
- D 0 - I - 0x029A1E 0A:9A0E: F1        .byte $F1   ; 
- D 0 - I - 0x029A1F 0A:9A0F: AC        .byte $AC   ; 
- D 0 - I - 0x029A20 0A:9A10: 49        .byte $49   ; <I>
- D 0 - I - 0x029A21 0A:9A11: 9C        .byte $9C   ; 
- D 0 - I - 0x029A22 0A:9A12: 63        .byte $63   ; <c>
- D 0 - I - 0x029A23 0A:9A13: 00        .byte $00   ; 
- D 0 - I - 0x029A24 0A:9A14: F1        .byte $F1   ; 
- D 0 - I - 0x029A25 0A:9A15: 67        .byte $67   ; <g>
- D 0 - I - 0x029A26 0A:9A16: D5        .byte $D5   ; 
- D 0 - I - 0x029A27 0A:9A17: F0        .byte $F0   ; 
- D 0 - I - 0x029A28 0A:9A18: B3        .byte $B3   ; 
- D 0 - I - 0x029A29 0A:9A19: 04        .byte $04   ; 
- D 0 - I - 0x029A2A 0A:9A1A: F1        .byte $F1   ; 
- D 0 - I - 0x029A2B 0A:9A1B: 67        .byte $67   ; <g>
- D 0 - I - 0x029A2C 0A:9A1C: D9        .byte $D9   ; 
- D 0 - I - 0x029A2D 0A:9A1D: F0        .byte $F0   ; 
- D 0 - I - 0x029A2E 0A:9A1E: B3        .byte $B3   ; 
- D 0 - I - 0x029A2F 0A:9A1F: 08        .byte $08   ; 
- D 0 - I - 0x029A30 0A:9A20: F1        .byte $F1   ; 
- D 0 - I - 0x029A31 0A:9A21: 67        .byte $67   ; <g>
- D 0 - I - 0x029A32 0A:9A22: 96        .byte $96   ; 
- D 0 - I - 0x029A33 0A:9A23: F0        .byte $F0   ; 
- D 0 - I - 0x029A34 0A:9A24: B3        .byte $B3   ; 
- D 0 - I - 0x029A35 0A:9A25: 0C        .byte $0C   ; 
- D 0 - I - 0x029A36 0A:9A26: 16        .byte $16   ; 
- D 0 - I - 0x029A37 0A:9A27: F4        .byte $F4   ; 
- D 0 - I - 0x029A38 0A:9A28: 0A        .byte $0A   ; 
- D 0 - I - 0x029A39 0A:9A29: 0B        .byte $0B   ; 
- D 0 - I - 0x029A3A 0A:9A2A: 00        .byte $00   ; 
- D 0 - I - 0x029A3B 0A:9A2B: 00        .byte $00   ; 
- D 0 - I - 0x029A3C 0A:9A2C: F6        .byte $F6   ; 
- D 0 - I - 0x029A3D 0A:9A2D: 00        .byte $00   ; 
- D 0 - I - 0x029A3E 0A:9A2E: F6        .byte $F6   ; 
- D 0 - I - 0x029A3F 0A:9A2F: 2A        .byte $2A   ; 
- D 0 - I - 0x029A40 0A:9A30: F6        .byte $F6   ; 
- D 0 - I - 0x029A41 0A:9A31: 3F        .byte $3F   ; 
- D 0 - I - 0x029A42 0A:9A32: F1        .byte $F1   ; 
- D 0 - I - 0x029A43 0A:9A33: 00        .byte $00   ; 
- D 0 - I - 0x029A44 0A:9A34: DC        .byte $DC   ; 
- D 0 - I - 0x029A45 0A:9A35: 20        .byte $20   ; 
- D 0 - I - 0x029A46 0A:9A36: BB        .byte $BB   ; 
- D 0 - I - 0x029A47 0A:9A37: 05        .byte $05   ; 
- D 0 - I - 0x029A48 0A:9A38: 04        .byte $04   ; 
- D 0 - I - 0x029A49 0A:9A39: F1        .byte $F1   ; 
- D 0 - I - 0x029A4A 0A:9A3A: 68        .byte $68   ; <h>
- D 0 - I - 0x029A4B 0A:9A3B: E2        .byte $E2   ; 
- D 0 - I - 0x029A4C 0A:9A3C: 20        .byte $20   ; 
- D 0 - I - 0x029A4D 0A:9A3D: BB        .byte $BB   ; 
- D 0 - I - 0x029A4E 0A:9A3E: 05        .byte $05   ; 
- D 0 - I - 0x029A4F 0A:9A3F: F8        .byte $F8   ; 
- D 0 - I - 0x029A50 0A:9A40: 0C        .byte $0C   ; 
- D 0 - I - 0x029A51 0A:9A41: 99        .byte $99   ; 
- D 0 - I - 0x029A52 0A:9A42: F5        .byte $F5   ; 
- D 0 - I - 0x029A53 0A:9A43: 1A        .byte $1A   ; 
- D 0 - I - 0x029A54 0A:9A44: F4        .byte $F4   ; 
- D 0 - I - 0x029A55 0A:9A45: 38        .byte $38   ; <8>
- D 0 - I - 0x029A56 0A:9A46: 39        .byte $39   ; <9>
- D 0 - I - 0x029A57 0A:9A47: 42        .byte $42   ; <B>
- D 0 - I - 0x029A58 0A:9A48: 41        .byte $41   ; <A>
- D 0 - I - 0x029A59 0A:9A49: F1        .byte $F1   ; 
- D 0 - I - 0x029A5A 0A:9A4A: 00        .byte $00   ; 
- D 0 - I - 0x029A5B 0A:9A4B: AF        .byte $AF   ; 
- D 0 - I - 0x029A5C 0A:9A4C: 10        .byte $10   ; 
- D 0 - I - 0x029A5D 0A:9A4D: CB        .byte $CB   ; 
- D 0 - I - 0x029A5E 0A:9A4E: 01        .byte $01   ; 
- D 0 - I - 0x029A5F 0A:9A4F: F0        .byte $F0   ; 
- D 0 - I - 0x029A60 0A:9A50: F5        .byte $F5   ; 
- D 0 - I - 0x029A61 0A:9A51: 80        .byte $80   ; 
- D 0 - I - 0x029A62 0A:9A52: F4        .byte $F4   ; 
- D 0 - I - 0x029A63 0A:9A53: 08        .byte $08   ; 
- D 0 - I - 0x029A64 0A:9A54: 09        .byte $09   ; 
- D 0 - I - 0x029A65 0A:9A55: 0A        .byte $0A   ; 
- D 0 - I - 0x029A66 0A:9A56: 0B        .byte $0B   ; 
- D 0 - I - 0x029A67 0A:9A57: F1        .byte $F1   ; 
- D 0 - I - 0x029A68 0A:9A58: AC        .byte $AC   ; 
- D 0 - I - 0x029A69 0A:9A59: 49        .byte $49   ; <I>
- D 0 - I - 0x029A6A 0A:9A5A: 9C        .byte $9C   ; 
- D 0 - I - 0x029A6B 0A:9A5B: 63        .byte $63   ; <c>
- D 0 - I - 0x029A6C 0A:9A5C: 00        .byte $00   ; 
- D 0 - I - 0x029A6D 0A:9A5D: F1        .byte $F1   ; 
- D 0 - I - 0x029A6E 0A:9A5E: 67        .byte $67   ; <g>
- D 0 - I - 0x029A6F 0A:9A5F: D6        .byte $D6   ; 
- D 0 - I - 0x029A70 0A:9A60: F0        .byte $F0   ; 
- D 0 - I - 0x029A71 0A:9A61: B3        .byte $B3   ; 
- D 0 - I - 0x029A72 0A:9A62: 04        .byte $04   ; 
- D 0 - I - 0x029A73 0A:9A63: F1        .byte $F1   ; 
- D 0 - I - 0x029A74 0A:9A64: 67        .byte $67   ; <g>
- D 0 - I - 0x029A75 0A:9A65: 95        .byte $95   ; 
- D 0 - I - 0x029A76 0A:9A66: F0        .byte $F0   ; 
- D 0 - I - 0x029A77 0A:9A67: B3        .byte $B3   ; 
- D 0 - I - 0x029A78 0A:9A68: 08        .byte $08   ; 
- D 0 - I - 0x029A79 0A:9A69: F1        .byte $F1   ; 
- D 0 - I - 0x029A7A 0A:9A6A: 67        .byte $67   ; <g>
- D 0 - I - 0x029A7B 0A:9A6B: 96        .byte $96   ; 
- D 0 - I - 0x029A7C 0A:9A6C: F0        .byte $F0   ; 
- D 0 - I - 0x029A7D 0A:9A6D: B3        .byte $B3   ; 
- D 0 - I - 0x029A7E 0A:9A6E: 0C        .byte $0C   ; 
- D 0 - I - 0x029A7F 0A:9A6F: 16        .byte $16   ; 
- D 0 - I - 0x029A80 0A:9A70: F4        .byte $F4   ; 
- D 0 - I - 0x029A81 0A:9A71: 0A        .byte $0A   ; 
- D 0 - I - 0x029A82 0A:9A72: 0B        .byte $0B   ; 
- D 0 - I - 0x029A83 0A:9A73: 00        .byte $00   ; 
- D 0 - I - 0x029A84 0A:9A74: 00        .byte $00   ; 
- D 0 - I - 0x029A85 0A:9A75: F6        .byte $F6   ; 
- D 0 - I - 0x029A86 0A:9A76: 00        .byte $00   ; 
- D 0 - I - 0x029A87 0A:9A77: F6        .byte $F6   ; 
- D 0 - I - 0x029A88 0A:9A78: 2A        .byte $2A   ; 
- D 0 - I - 0x029A89 0A:9A79: F6        .byte $F6   ; 
- D 0 - I - 0x029A8A 0A:9A7A: 3F        .byte $3F   ; 
- D 0 - I - 0x029A8B 0A:9A7B: F1        .byte $F1   ; 
- D 0 - I - 0x029A8C 0A:9A7C: 00        .byte $00   ; 
- D 0 - I - 0x029A8D 0A:9A7D: DD        .byte $DD   ; 
- D 0 - I - 0x029A8E 0A:9A7E: 20        .byte $20   ; 
- D 0 - I - 0x029A8F 0A:9A7F: BB        .byte $BB   ; 
- D 0 - I - 0x029A90 0A:9A80: 05        .byte $05   ; 
- D 0 - I - 0x029A91 0A:9A81: 04        .byte $04   ; 
- D 0 - I - 0x029A92 0A:9A82: F1        .byte $F1   ; 
- D 0 - I - 0x029A93 0A:9A83: 68        .byte $68   ; <h>
- D 0 - I - 0x029A94 0A:9A84: E3        .byte $E3   ; 
- D 0 - I - 0x029A95 0A:9A85: 20        .byte $20   ; 
- D 0 - I - 0x029A96 0A:9A86: BB        .byte $BB   ; 
- D 0 - I - 0x029A97 0A:9A87: 05        .byte $05   ; 
- D 0 - I - 0x029A98 0A:9A88: F8        .byte $F8   ; 
- D 0 - I - 0x029A99 0A:9A89: 0C        .byte $0C   ; 
- D 0 - I - 0x029A9A 0A:9A8A: 99        .byte $99   ; 
- D 0 - I - 0x029A9B 0A:9A8B: F5        .byte $F5   ; 
- D 0 - I - 0x029A9C 0A:9A8C: 84        .byte $84   ; 
- D 0 - I - 0x029A9D 0A:9A8D: 18        .byte $18   ; 
- D 0 - I - 0x029A9E 0A:9A8E: F4        .byte $F4   ; 
- D 0 - I - 0x029A9F 0A:9A8F: 38        .byte $38   ; <8>
- D 0 - I - 0x029AA0 0A:9A90: 39        .byte $39   ; <9>
- D 0 - I - 0x029AA1 0A:9A91: 42        .byte $42   ; <B>
- D 0 - I - 0x029AA2 0A:9A92: 41        .byte $41   ; <A>
- D 0 - I - 0x029AA3 0A:9A93: F1        .byte $F1   ; 
- D 0 - I - 0x029AA4 0A:9A94: 00        .byte $00   ; 
- D 0 - I - 0x029AA5 0A:9A95: AD        .byte $AD   ; 
- D 0 - I - 0x029AA6 0A:9A96: 10        .byte $10   ; 
- D 0 - I - 0x029AA7 0A:9A97: CB        .byte $CB   ; 
- D 0 - I - 0x029AA8 0A:9A98: 01        .byte $01   ; 
- D 0 - I - 0x029AA9 0A:9A99: F0        .byte $F0   ; 
- D 0 - I - 0x029AAA 0A:9A9A: F5        .byte $F5   ; 
- D 0 - I - 0x029AAB 0A:9A9B: 84        .byte $84   ; 
- D 0 - I - 0x029AAC 0A:9A9C: 19        .byte $19   ; 
- D 0 - I - 0x029AAD 0A:9A9D: F8        .byte $F8   ; 
- D 0 - I - 0x029AAE 0A:9A9E: A1        .byte $A1   ; 
- D 0 - I - 0x029AAF 0A:9A9F: 9B        .byte $9B   ; 
- D 0 - I - 0x029AB0 0A:9AA0: F5        .byte $F5   ; 
- D 0 - I - 0x029AB1 0A:9AA1: 84        .byte $84   ; 
- D 0 - I - 0x029AB2 0A:9AA2: 1A        .byte $1A   ; 
- D 0 - I - 0x029AB3 0A:9AA3: F4        .byte $F4   ; 
- D 0 - I - 0x029AB4 0A:9AA4: 35        .byte $35   ; <5>
- D 0 - I - 0x029AB5 0A:9AA5: 00        .byte $00   ; 
- D 0 - I - 0x029AB6 0A:9AA6: 00        .byte $00   ; 
- D 0 - I - 0x029AB7 0A:9AA7: 00        .byte $00   ; 
- D 0 - I - 0x029AB8 0A:9AA8: F1        .byte $F1   ; 
- D 0 - I - 0x029AB9 0A:9AA9: 00        .byte $00   ; 
- D 0 - I - 0x029ABA 0A:9AAA: A9        .byte $A9   ; 
- D 0 - I - 0x029ABB 0A:9AAB: 00        .byte $00   ; 
- D 0 - I - 0x029ABC 0A:9AAC: D3        .byte $D3   ; 
- D 0 - I - 0x029ABD 0A:9AAD: 01        .byte $01   ; 
- D 0 - I - 0x029ABE 0A:9AAE: F0        .byte $F0   ; 
- D 0 - I - 0x029ABF 0A:9AAF: F5        .byte $F5   ; 
- D 0 - I - 0x029AC0 0A:9AB0: 84        .byte $84   ; 
- D 0 - I - 0x029AC1 0A:9AB1: 1B        .byte $1B   ; 
- D 0 - I - 0x029AC2 0A:9AB2: F4        .byte $F4   ; 
- D 0 - I - 0x029AC3 0A:9AB3: 33        .byte $33   ; <3>
- D 0 - I - 0x029AC4 0A:9AB4: 00        .byte $00   ; 
- D 0 - I - 0x029AC5 0A:9AB5: 00        .byte $00   ; 
- D 0 - I - 0x029AC6 0A:9AB6: 00        .byte $00   ; 
- D 0 - I - 0x029AC7 0A:9AB7: F1        .byte $F1   ; 
- D 0 - I - 0x029AC8 0A:9AB8: 00        .byte $00   ; 
- D 0 - I - 0x029AC9 0A:9AB9: 99        .byte $99   ; 
- D 0 - I - 0x029ACA 0A:9ABA: 00        .byte $00   ; 
- D 0 - I - 0x029ACB 0A:9ABB: D3        .byte $D3   ; 
- D 0 - I - 0x029ACC 0A:9ABC: 01        .byte $01   ; 
- D 0 - I - 0x029ACD 0A:9ABD: F0        .byte $F0   ; 
- D 0 - I - 0x029ACE 0A:9ABE: F5        .byte $F5   ; 
- D 0 - I - 0x029ACF 0A:9ABF: 80        .byte $80   ; 
- D 0 - I - 0x029AD0 0A:9AC0: F4        .byte $F4   ; 
- D 0 - I - 0x029AD1 0A:9AC1: 13        .byte $13   ; 
- D 0 - I - 0x029AD2 0A:9AC2: 00        .byte $00   ; 
- D 0 - I - 0x029AD3 0A:9AC3: 00        .byte $00   ; 
- D 0 - I - 0x029AD4 0A:9AC4: 00        .byte $00   ; 
- D 0 - I - 0x029AD5 0A:9AC5: F7        .byte $F7   ; 
- D 0 - I - 0x029AD6 0A:9AC6: 03        .byte $03   ; 
- D 0 - I - 0x029AD7 0A:9AC7: 7B        .byte $7B   ; 
- D 0 - I - 0x029AD8 0A:9AC8: F1        .byte $F1   ; 
- D 0 - I - 0x029AD9 0A:9AC9: B4        .byte $B4   ; 
- D 0 - I - 0x029ADA 0A:9ACA: 29        .byte $29   ; 
- D 0 - I - 0x029ADB 0A:9ACB: E0        .byte $E0   ; 
- D 0 - I - 0x029ADC 0A:9ACC: 1B        .byte $1B   ; 
- D 0 - I - 0x029ADD 0A:9ACD: 06        .byte $06   ; 
- D 0 - I - 0x029ADE 0A:9ACE: F1        .byte $F1   ; 
- D 0 - I - 0x029ADF 0A:9ACF: 00        .byte $00   ; 
- D 0 - I - 0x029AE0 0A:9AD0: 00        .byte $00   ; 
- D 0 - I - 0x029AE1 0A:9AD1: 80        .byte $80   ; 
- D 0 - I - 0x029AE2 0A:9AD2: FB        .byte $FB   ; 
- D 0 - I - 0x029AE3 0A:9AD3: 00        .byte $00   ; 
- D 0 - I - 0x029AE4 0A:9AD4: F0        .byte $F0   ; 
- D 0 - I - 0x029AE5 0A:9AD5: F5        .byte $F5   ; 
- D 0 - I - 0x029AE6 0A:9AD6: 84        .byte $84   ; 
- D 0 - I - 0x029AE7 0A:9AD7: 1D        .byte $1D   ; 
- D 0 - I - 0x029AE8 0A:9AD8: F4        .byte $F4   ; 
- D 0 - I - 0x029AE9 0A:9AD9: 33        .byte $33   ; <3>
- D 0 - I - 0x029AEA 0A:9ADA: 30        .byte $30   ; <0>
- D 0 - I - 0x029AEB 0A:9ADB: 00        .byte $00   ; 
- D 0 - I - 0x029AEC 0A:9ADC: 00        .byte $00   ; 
- D 0 - I - 0x029AED 0A:9ADD: F1        .byte $F1   ; 
- D 0 - I - 0x029AEE 0A:9ADE: 00        .byte $00   ; 
- D 0 - I - 0x029AEF 0A:9ADF: 9A        .byte $9A   ; 
- D 0 - I - 0x029AF0 0A:9AE0: 00        .byte $00   ; 
- D 0 - I - 0x029AF1 0A:9AE1: D3        .byte $D3   ; 
- D 0 - I - 0x029AF2 0A:9AE2: 01        .byte $01   ; 
- D 0 - I - 0x029AF3 0A:9AE3: F0        .byte $F0   ; 
- D 0 - I - 0x029AF4 0A:9AE4: F5        .byte $F5   ; 
- D 0 - I - 0x029AF5 0A:9AE5: 84        .byte $84   ; 
- D 0 - I - 0x029AF6 0A:9AE6: 1E        .byte $1E   ; 
- D 0 - I - 0x029AF7 0A:9AE7: F4        .byte $F4   ; 
- D 0 - I - 0x029AF8 0A:9AE8: 36        .byte $36   ; <6>
- D 0 - I - 0x029AF9 0A:9AE9: 37        .byte $37   ; <7>
- D 0 - I - 0x029AFA 0A:9AEA: 00        .byte $00   ; 
- D 0 - I - 0x029AFB 0A:9AEB: 00        .byte $00   ; 
- D 0 - I - 0x029AFC 0A:9AEC: F1        .byte $F1   ; 
- D 0 - I - 0x029AFD 0A:9AED: 00        .byte $00   ; 
- D 0 - I - 0x029AFE 0A:9AEE: A7        .byte $A7   ; 
- D 0 - I - 0x029AFF 0A:9AEF: 00        .byte $00   ; 
- D 0 - I - 0x029B00 0A:9AF0: D3        .byte $D3   ; 
- D 0 - I - 0x029B01 0A:9AF1: 01        .byte $01   ; 
- D 0 - I - 0x029B02 0A:9AF2: F0        .byte $F0   ; 
- D 0 - I - 0x029B03 0A:9AF3: F5        .byte $F5   ; 
- D 0 - I - 0x029B04 0A:9AF4: 84        .byte $84   ; 
- D 0 - I - 0x029B05 0A:9AF5: 1F        .byte $1F   ; 
- D 0 - I - 0x029B06 0A:9AF6: F4        .byte $F4   ; 
- D 0 - I - 0x029B07 0A:9AF7: 36        .byte $36   ; <6>
- D 0 - I - 0x029B08 0A:9AF8: 37        .byte $37   ; <7>
- D 0 - I - 0x029B09 0A:9AF9: 00        .byte $00   ; 
- D 0 - I - 0x029B0A 0A:9AFA: 00        .byte $00   ; 
- D 0 - I - 0x029B0B 0A:9AFB: F1        .byte $F1   ; 
- D 0 - I - 0x029B0C 0A:9AFC: 00        .byte $00   ; 
- D 0 - I - 0x029B0D 0A:9AFD: A8        .byte $A8   ; 
- D 0 - I - 0x029B0E 0A:9AFE: 00        .byte $00   ; 
- D 0 - I - 0x029B0F 0A:9AFF: D3        .byte $D3   ; 
- D 0 - I - 0x029B10 0A:9B00: 01        .byte $01   ; 
- D 0 - I - 0x029B11 0A:9B01: F0        .byte $F0   ; 
- D 0 - I - 0x029B12 0A:9B02: F5        .byte $F5   ; 
- D 0 - I - 0x029B13 0A:9B03: 84        .byte $84   ; 
- D 0 - I - 0x029B14 0A:9B04: 20        .byte $20   ; 
- D 0 - I - 0x029B15 0A:9B05: F4        .byte $F4   ; 
- D 0 - I - 0x029B16 0A:9B06: 30        .byte $30   ; <0>
- D 0 - I - 0x029B17 0A:9B07: 31        .byte $31   ; <1>
- D 0 - I - 0x029B18 0A:9B08: 32        .byte $32   ; <2>
- D 0 - I - 0x029B19 0A:9B09: 00        .byte $00   ; 
- D 0 - I - 0x029B1A 0A:9B0A: F1        .byte $F1   ; 
- D 0 - I - 0x029B1B 0A:9B0B: 00        .byte $00   ; 
- D 0 - I - 0x029B1C 0A:9B0C: 9B        .byte $9B   ; 
- D 0 - I - 0x029B1D 0A:9B0D: 00        .byte $00   ; 
- D 0 - I - 0x029B1E 0A:9B0E: D3        .byte $D3   ; 
- D 0 - I - 0x029B1F 0A:9B0F: 01        .byte $01   ; 
- D 0 - I - 0x029B20 0A:9B10: F0        .byte $F0   ; 
- D 0 - I - 0x029B21 0A:9B11: F5        .byte $F5   ; 
- D 0 - I - 0x029B22 0A:9B12: 84        .byte $84   ; 
- D 0 - I - 0x029B23 0A:9B13: 21        .byte $21   ; 
- D 0 - I - 0x029B24 0A:9B14: F4        .byte $F4   ; 
- D 0 - I - 0x029B25 0A:9B15: 34        .byte $34   ; <4>
- D 0 - I - 0x029B26 0A:9B16: 00        .byte $00   ; 
- D 0 - I - 0x029B27 0A:9B17: 00        .byte $00   ; 
- D 0 - I - 0x029B28 0A:9B18: 00        .byte $00   ; 
- D 0 - I - 0x029B29 0A:9B19: F1        .byte $F1   ; 
- D 0 - I - 0x029B2A 0A:9B1A: 00        .byte $00   ; 
- D 0 - I - 0x029B2B 0A:9B1B: 9C        .byte $9C   ; 
- D 0 - I - 0x029B2C 0A:9B1C: 00        .byte $00   ; 
- D 0 - I - 0x029B2D 0A:9B1D: D3        .byte $D3   ; 
- D 0 - I - 0x029B2E 0A:9B1E: 01        .byte $01   ; 
- D 0 - I - 0x029B2F 0A:9B1F: F0        .byte $F0   ; 
- D 0 - I - 0x029B30 0A:9B20: F5        .byte $F5   ; 
- D 0 - I - 0x029B31 0A:9B21: 84        .byte $84   ; 
- D 0 - I - 0x029B32 0A:9B22: 23        .byte $23   ; 
- D 0 - I - 0x029B33 0A:9B23: F4        .byte $F4   ; 
- D 0 - I - 0x029B34 0A:9B24: 36        .byte $36   ; <6>
- D 0 - I - 0x029B35 0A:9B25: 37        .byte $37   ; <7>
- D 0 - I - 0x029B36 0A:9B26: 00        .byte $00   ; 
- D 0 - I - 0x029B37 0A:9B27: 00        .byte $00   ; 
- D 0 - I - 0x029B38 0A:9B28: F1        .byte $F1   ; 
- D 0 - I - 0x029B39 0A:9B29: 00        .byte $00   ; 
- D 0 - I - 0x029B3A 0A:9B2A: AC        .byte $AC   ; 
- D 0 - I - 0x029B3B 0A:9B2B: 00        .byte $00   ; 
- D 0 - I - 0x029B3C 0A:9B2C: D3        .byte $D3   ; 
- D 0 - I - 0x029B3D 0A:9B2D: 01        .byte $01   ; 
- D 0 - I - 0x029B3E 0A:9B2E: F0        .byte $F0   ; 
- D 0 - I - 0x029B3F 0A:9B2F: F5        .byte $F5   ; 
- D 0 - I - 0x029B40 0A:9B30: 84        .byte $84   ; 
- D 0 - I - 0x029B41 0A:9B31: 24        .byte $24   ; 
- D 0 - I - 0x029B42 0A:9B32: F8        .byte $F8   ; 
- D 0 - I - 0x029B43 0A:9B33: 83        .byte $83   ; 
- D 0 - I - 0x029B44 0A:9B34: 9B        .byte $9B   ; 
- D 0 - I - 0x029B45 0A:9B35: F5        .byte $F5   ; 
- D 0 - I - 0x029B46 0A:9B36: 84        .byte $84   ; 
- D 0 - I - 0x029B47 0A:9B37: 33        .byte $33   ; <3>
- D 0 - I - 0x029B48 0A:9B38: F4        .byte $F4   ; 
- D 0 - I - 0x029B49 0A:9B39: 30        .byte $30   ; <0>
- D 0 - I - 0x029B4A 0A:9B3A: 31        .byte $31   ; <1>
- D 0 - I - 0x029B4B 0A:9B3B: 32        .byte $32   ; <2>
- D 0 - I - 0x029B4C 0A:9B3C: 00        .byte $00   ; 
- D 0 - I - 0x029B4D 0A:9B3D: F1        .byte $F1   ; 
- D 0 - I - 0x029B4E 0A:9B3E: 00        .byte $00   ; 
- D 0 - I - 0x029B4F 0A:9B3F: A6        .byte $A6   ; 
- D 0 - I - 0x029B50 0A:9B40: 00        .byte $00   ; 
- D 0 - I - 0x029B51 0A:9B41: D3        .byte $D3   ; 
- D 0 - I - 0x029B52 0A:9B42: 01        .byte $01   ; 
- D 0 - I - 0x029B53 0A:9B43: F0        .byte $F0   ; 
- D 0 - I - 0x029B54 0A:9B44: F5        .byte $F5   ; 
- D 0 - I - 0x029B55 0A:9B45: 84        .byte $84   ; 
- D 0 - I - 0x029B56 0A:9B46: 34        .byte $34   ; <4>
- D 0 - I - 0x029B57 0A:9B47: F4        .byte $F4   ; 
- D 0 - I - 0x029B58 0A:9B48: 30        .byte $30   ; <0>
- D 0 - I - 0x029B59 0A:9B49: 31        .byte $31   ; <1>
- D 0 - I - 0x029B5A 0A:9B4A: 32        .byte $32   ; <2>
- D 0 - I - 0x029B5B 0A:9B4B: 00        .byte $00   ; 
- D 0 - I - 0x029B5C 0A:9B4C: F1        .byte $F1   ; 
- D 0 - I - 0x029B5D 0A:9B4D: 00        .byte $00   ; 
- D 0 - I - 0x029B5E 0A:9B4E: A5        .byte $A5   ; 
- D 0 - I - 0x029B5F 0A:9B4F: 00        .byte $00   ; 
- D 0 - I - 0x029B60 0A:9B50: D3        .byte $D3   ; 
- D 0 - I - 0x029B61 0A:9B51: 01        .byte $01   ; 
- D 0 - I - 0x029B62 0A:9B52: F0        .byte $F0   ; 
- D 0 - I - 0x029B63 0A:9B53: F5        .byte $F5   ; 
- D 0 - I - 0x029B64 0A:9B54: 84        .byte $84   ; 
- D 0 - I - 0x029B65 0A:9B55: 35        .byte $35   ; <5>
- D 0 - I - 0x029B66 0A:9B56: F4        .byte $F4   ; 
- D 0 - I - 0x029B67 0A:9B57: 36        .byte $36   ; <6>
- D 0 - I - 0x029B68 0A:9B58: 37        .byte $37   ; <7>
- D 0 - I - 0x029B69 0A:9B59: 00        .byte $00   ; 
- D 0 - I - 0x029B6A 0A:9B5A: 00        .byte $00   ; 
- D 0 - I - 0x029B6B 0A:9B5B: F1        .byte $F1   ; 
- D 0 - I - 0x029B6C 0A:9B5C: 00        .byte $00   ; 
- D 0 - I - 0x029B6D 0A:9B5D: A0        .byte $A0   ; 
- D 0 - I - 0x029B6E 0A:9B5E: 00        .byte $00   ; 
- D 0 - I - 0x029B6F 0A:9B5F: D3        .byte $D3   ; 
- D 0 - I - 0x029B70 0A:9B60: 01        .byte $01   ; 
- D 0 - I - 0x029B71 0A:9B61: F0        .byte $F0   ; 
- D 0 - I - 0x029B72 0A:9B62: F5        .byte $F5   ; 
- D 0 - I - 0x029B73 0A:9B63: 84        .byte $84   ; 
- D 0 - I - 0x029B74 0A:9B64: 36        .byte $36   ; <6>
- D 0 - I - 0x029B75 0A:9B65: F4        .byte $F4   ; 
- D 0 - I - 0x029B76 0A:9B66: 30        .byte $30   ; <0>
- D 0 - I - 0x029B77 0A:9B67: 31        .byte $31   ; <1>
- D 0 - I - 0x029B78 0A:9B68: 32        .byte $32   ; <2>
- D 0 - I - 0x029B79 0A:9B69: 00        .byte $00   ; 
- D 0 - I - 0x029B7A 0A:9B6A: F1        .byte $F1   ; 
- D 0 - I - 0x029B7B 0A:9B6B: 00        .byte $00   ; 
- D 0 - I - 0x029B7C 0A:9B6C: 9F        .byte $9F   ; 
- D 0 - I - 0x029B7D 0A:9B6D: 00        .byte $00   ; 
- D 0 - I - 0x029B7E 0A:9B6E: D3        .byte $D3   ; 
- D 0 - I - 0x029B7F 0A:9B6F: 01        .byte $01   ; 
- D 0 - I - 0x029B80 0A:9B70: F0        .byte $F0   ; 
- D 0 - I - 0x029B81 0A:9B71: F5        .byte $F5   ; 
- D 0 - I - 0x029B82 0A:9B72: 84        .byte $84   ; 
- D 0 - I - 0x029B83 0A:9B73: 37        .byte $37   ; <7>
- D 0 - I - 0x029B84 0A:9B74: F4        .byte $F4   ; 
- D 0 - I - 0x029B85 0A:9B75: 30        .byte $30   ; <0>
- D 0 - I - 0x029B86 0A:9B76: 31        .byte $31   ; <1>
- D 0 - I - 0x029B87 0A:9B77: 32        .byte $32   ; <2>
- D 0 - I - 0x029B88 0A:9B78: 00        .byte $00   ; 
- D 0 - I - 0x029B89 0A:9B79: F1        .byte $F1   ; 
- D 0 - I - 0x029B8A 0A:9B7A: 00        .byte $00   ; 
- D 0 - I - 0x029B8B 0A:9B7B: A3        .byte $A3   ; 
- D 0 - I - 0x029B8C 0A:9B7C: 00        .byte $00   ; 
- D 0 - I - 0x029B8D 0A:9B7D: D3        .byte $D3   ; 
- D 0 - I - 0x029B8E 0A:9B7E: 01        .byte $01   ; 
- D 0 - I - 0x029B8F 0A:9B7F: F0        .byte $F0   ; 
- D 0 - I - 0x029B90 0A:9B80: F5        .byte $F5   ; 
- D 0 - I - 0x029B91 0A:9B81: 84        .byte $84   ; 
- D 0 - I - 0x029B92 0A:9B82: 38        .byte $38   ; <8>
- D 0 - I - 0x029B93 0A:9B83: F4        .byte $F4   ; 
- D 0 - I - 0x029B94 0A:9B84: 35        .byte $35   ; <5>
- D 0 - I - 0x029B95 0A:9B85: 00        .byte $00   ; 
- D 0 - I - 0x029B96 0A:9B86: 00        .byte $00   ; 
- D 0 - I - 0x029B97 0A:9B87: 00        .byte $00   ; 
- D 0 - I - 0x029B98 0A:9B88: F1        .byte $F1   ; 
- D 0 - I - 0x029B99 0A:9B89: 00        .byte $00   ; 
- D 0 - I - 0x029B9A 0A:9B8A: A2        .byte $A2   ; 
- D 0 - I - 0x029B9B 0A:9B8B: 00        .byte $00   ; 
- D 0 - I - 0x029B9C 0A:9B8C: D3        .byte $D3   ; 
- D 0 - I - 0x029B9D 0A:9B8D: 01        .byte $01   ; 
- D 0 - I - 0x029B9E 0A:9B8E: F0        .byte $F0   ; 
- D 0 - I - 0x029B9F 0A:9B8F: F5        .byte $F5   ; 
- D 0 - I - 0x029BA0 0A:9B90: 84        .byte $84   ; 
- D 0 - I - 0x029BA1 0A:9B91: 39        .byte $39   ; <9>
- D 0 - I - 0x029BA2 0A:9B92: F4        .byte $F4   ; 
- D 0 - I - 0x029BA3 0A:9B93: 36        .byte $36   ; <6>
- D 0 - I - 0x029BA4 0A:9B94: 37        .byte $37   ; <7>
- D 0 - I - 0x029BA5 0A:9B95: 00        .byte $00   ; 
- D 0 - I - 0x029BA6 0A:9B96: 00        .byte $00   ; 
- D 0 - I - 0x029BA7 0A:9B97: F1        .byte $F1   ; 
- D 0 - I - 0x029BA8 0A:9B98: 00        .byte $00   ; 
- D 0 - I - 0x029BA9 0A:9B99: A4        .byte $A4   ; 
- D 0 - I - 0x029BAA 0A:9B9A: 00        .byte $00   ; 
- D 0 - I - 0x029BAB 0A:9B9B: D3        .byte $D3   ; 
- D 0 - I - 0x029BAC 0A:9B9C: 01        .byte $01   ; 
- D 0 - I - 0x029BAD 0A:9B9D: F0        .byte $F0   ; 
- D 0 - I - 0x029BAE 0A:9B9E: F5        .byte $F5   ; 
- D 0 - I - 0x029BAF 0A:9B9F: 84        .byte $84   ; 
- D 0 - I - 0x029BB0 0A:9BA0: 3A        .byte $3A   ; 
- D 0 - I - 0x029BB1 0A:9BA1: F4        .byte $F4   ; 
- D 0 - I - 0x029BB2 0A:9BA2: 30        .byte $30   ; <0>
- D 0 - I - 0x029BB3 0A:9BA3: 31        .byte $31   ; <1>
- D 0 - I - 0x029BB4 0A:9BA4: 32        .byte $32   ; <2>
- D 0 - I - 0x029BB5 0A:9BA5: 00        .byte $00   ; 
- D 0 - I - 0x029BB6 0A:9BA6: F1        .byte $F1   ; 
- D 0 - I - 0x029BB7 0A:9BA7: 00        .byte $00   ; 
- D 0 - I - 0x029BB8 0A:9BA8: A1        .byte $A1   ; 
- D 0 - I - 0x029BB9 0A:9BA9: 00        .byte $00   ; 
- D 0 - I - 0x029BBA 0A:9BAA: D3        .byte $D3   ; 
- D 0 - I - 0x029BBB 0A:9BAB: 01        .byte $01   ; 
- D 0 - I - 0x029BBC 0A:9BAC: F0        .byte $F0   ; 
- D 0 - I - 0x029BBD 0A:9BAD: F5        .byte $F5   ; 
- D 0 - I - 0x029BBE 0A:9BAE: 84        .byte $84   ; 
- D 0 - I - 0x029BBF 0A:9BAF: 3C        .byte $3C   ; 
- D 0 - I - 0x029BC0 0A:9BB0: F4        .byte $F4   ; 
- D 0 - I - 0x029BC1 0A:9BB1: 30        .byte $30   ; <0>
- D 0 - I - 0x029BC2 0A:9BB2: 31        .byte $31   ; <1>
- D 0 - I - 0x029BC3 0A:9BB3: 32        .byte $32   ; <2>
- D 0 - I - 0x029BC4 0A:9BB4: 00        .byte $00   ; 
- D 0 - I - 0x029BC5 0A:9BB5: F1        .byte $F1   ; 
- D 0 - I - 0x029BC6 0A:9BB6: 00        .byte $00   ; 
- D 0 - I - 0x029BC7 0A:9BB7: AB        .byte $AB   ; 
- D 0 - I - 0x029BC8 0A:9BB8: 00        .byte $00   ; 
- D 0 - I - 0x029BC9 0A:9BB9: D3        .byte $D3   ; 
- D 0 - I - 0x029BCA 0A:9BBA: 01        .byte $01   ; 
- D 0 - I - 0x029BCB 0A:9BBB: F0        .byte $F0   ; 
- D 0 - I - 0x029BCC 0A:9BBC: F5        .byte $F5   ; 
- D 0 - I - 0x029BCD 0A:9BBD: 84        .byte $84   ; 
- D 0 - I - 0x029BCE 0A:9BBE: 84        .byte $84   ; 
- D 0 - I - 0x029BCF 0A:9BBF: F4        .byte $F4   ; 
- D 0 - I - 0x029BD0 0A:9BC0: 1D        .byte $1D   ; 
- D 0 - I - 0x029BD1 0A:9BC1: 00        .byte $00   ; 
- D 0 - I - 0x029BD2 0A:9BC2: 80        .byte $80   ; 
- D 0 - I - 0x029BD3 0A:9BC3: 48        .byte $48   ; <H>
- D 0 - I - 0x029BD4 0A:9BC4: F1        .byte $F1   ; 
- D 0 - I - 0x029BD5 0A:9BC5: 72        .byte $72   ; <r>
- D 0 - I - 0x029BD6 0A:9BC6: B2        .byte $B2   ; 
- D 0 - I - 0x029BD7 0A:9BC7: 08        .byte $08   ; 
- D 0 - I - 0x029BD8 0A:9BC8: CB        .byte $CB   ; 
- D 0 - I - 0x029BD9 0A:9BC9: 01        .byte $01   ; 
- D 0 - I - 0x029BDA 0A:9BCA: F0        .byte $F0   ; 
- D 0 - I - 0x029BDB 0A:9BCB: F5        .byte $F5   ; 
- D 0 - I - 0x029BDC 0A:9BCC: 17        .byte $17   ; 
- D 0 - I - 0x029BDD 0A:9BCD: F4        .byte $F4   ; 
- D 0 - I - 0x029BDE 0A:9BCE: 08        .byte $08   ; 
- D 0 - I - 0x029BDF 0A:9BCF: 09        .byte $09   ; 
- D 0 - I - 0x029BE0 0A:9BD0: 0A        .byte $0A   ; 
- D 0 - I - 0x029BE1 0A:9BD1: 0B        .byte $0B   ; 
- D 0 - I - 0x029BE2 0A:9BD2: F1        .byte $F1   ; 
- D 0 - I - 0x029BE3 0A:9BD3: AC        .byte $AC   ; 
- D 0 - I - 0x029BE4 0A:9BD4: 49        .byte $49   ; <I>
- D 0 - I - 0x029BE5 0A:9BD5: 9C        .byte $9C   ; 
- D 0 - I - 0x029BE6 0A:9BD6: 63        .byte $63   ; <c>
- D 0 - I - 0x029BE7 0A:9BD7: 00        .byte $00   ; 
- D 0 - I - 0x029BE8 0A:9BD8: F1        .byte $F1   ; 
- D 0 - I - 0x029BE9 0A:9BD9: 67        .byte $67   ; <g>
- D 0 - I - 0x029BEA 0A:9BDA: D7        .byte $D7   ; 
- D 0 - I - 0x029BEB 0A:9BDB: F0        .byte $F0   ; 
- D 0 - I - 0x029BEC 0A:9BDC: B3        .byte $B3   ; 
- D 0 - I - 0x029BED 0A:9BDD: 04        .byte $04   ; 
- D 0 - I - 0x029BEE 0A:9BDE: F1        .byte $F1   ; 
- D 0 - I - 0x029BEF 0A:9BDF: 67        .byte $67   ; <g>
- D 0 - I - 0x029BF0 0A:9BE0: 95        .byte $95   ; 
- D 0 - I - 0x029BF1 0A:9BE1: F0        .byte $F0   ; 
- D 0 - I - 0x029BF2 0A:9BE2: B3        .byte $B3   ; 
- D 0 - I - 0x029BF3 0A:9BE3: 08        .byte $08   ; 
- D 0 - I - 0x029BF4 0A:9BE4: F1        .byte $F1   ; 
- D 0 - I - 0x029BF5 0A:9BE5: 67        .byte $67   ; <g>
- D 0 - I - 0x029BF6 0A:9BE6: 96        .byte $96   ; 
- D 0 - I - 0x029BF7 0A:9BE7: F0        .byte $F0   ; 
- D 0 - I - 0x029BF8 0A:9BE8: B3        .byte $B3   ; 
- D 0 - I - 0x029BF9 0A:9BE9: 0C        .byte $0C   ; 
- D 0 - I - 0x029BFA 0A:9BEA: 16        .byte $16   ; 
- D 0 - I - 0x029BFB 0A:9BEB: F4        .byte $F4   ; 
- D 0 - I - 0x029BFC 0A:9BEC: 0A        .byte $0A   ; 
- D 0 - I - 0x029BFD 0A:9BED: 0B        .byte $0B   ; 
- D 0 - I - 0x029BFE 0A:9BEE: 00        .byte $00   ; 
- D 0 - I - 0x029BFF 0A:9BEF: 00        .byte $00   ; 
- D 0 - I - 0x029C00 0A:9BF0: F6        .byte $F6   ; 
- D 0 - I - 0x029C01 0A:9BF1: 00        .byte $00   ; 
- D 0 - I - 0x029C02 0A:9BF2: F6        .byte $F6   ; 
- D 0 - I - 0x029C03 0A:9BF3: 2A        .byte $2A   ; 
- D 0 - I - 0x029C04 0A:9BF4: F6        .byte $F6   ; 
- D 0 - I - 0x029C05 0A:9BF5: 3F        .byte $3F   ; 
- D 0 - I - 0x029C06 0A:9BF6: F1        .byte $F1   ; 
- D 0 - I - 0x029C07 0A:9BF7: 00        .byte $00   ; 
- D 0 - I - 0x029C08 0A:9BF8: DE        .byte $DE   ; 
- D 0 - I - 0x029C09 0A:9BF9: 20        .byte $20   ; 
- D 0 - I - 0x029C0A 0A:9BFA: BB        .byte $BB   ; 
- D 0 - I - 0x029C0B 0A:9BFB: 05        .byte $05   ; 
- D 0 - I - 0x029C0C 0A:9BFC: 04        .byte $04   ; 
- D 0 - I - 0x029C0D 0A:9BFD: F1        .byte $F1   ; 
- D 0 - I - 0x029C0E 0A:9BFE: 68        .byte $68   ; <h>
- D 0 - I - 0x029C0F 0A:9BFF: E4        .byte $E4   ; 
- D 0 - I - 0x029C10 0A:9C00: 20        .byte $20   ; 
- D 0 - I - 0x029C11 0A:9C01: BB        .byte $BB   ; 
- D 0 - I - 0x029C12 0A:9C02: 05        .byte $05   ; 
- D 0 - I - 0x029C13 0A:9C03: F8        .byte $F8   ; 
- D 0 - I - 0x029C14 0A:9C04: 0C        .byte $0C   ; 
- D 0 - I - 0x029C15 0A:9C05: 99        .byte $99   ; 
- D 0 - I - 0x029C16 0A:9C06: F5        .byte $F5   ; 
- D 0 - I - 0x029C17 0A:9C07: 80        .byte $80   ; 
- D 0 - I - 0x029C18 0A:9C08: F4        .byte $F4   ; 
- D 0 - I - 0x029C19 0A:9C09: 13        .byte $13   ; 
- D 0 - I - 0x029C1A 0A:9C0A: 00        .byte $00   ; 
- D 0 - I - 0x029C1B 0A:9C0B: 00        .byte $00   ; 
- D 0 - I - 0x029C1C 0A:9C0C: 0B        .byte $0B   ; 
- D 0 - I - 0x029C1D 0A:9C0D: F7        .byte $F7   ; 
- D 0 - I - 0x029C1E 0A:9C0E: 03        .byte $03   ; 
- D 0 - I - 0x029C1F 0A:9C0F: 7B        .byte $7B   ; 
- D 0 - I - 0x029C20 0A:9C10: F1        .byte $F1   ; 
- D 0 - I - 0x029C21 0A:9C11: 00        .byte $00   ; 
- D 0 - I - 0x029C22 0A:9C12: 00        .byte $00   ; 
- D 0 - I - 0x029C23 0A:9C13: 80        .byte $80   ; 
- D 0 - I - 0x029C24 0A:9C14: FB        .byte $FB   ; 
- D 0 - I - 0x029C25 0A:9C15: 00        .byte $00   ; 
- D 0 - I - 0x029C26 0A:9C16: F1        .byte $F1   ; 
- D 0 - I - 0x029C27 0A:9C17: B7        .byte $B7   ; 
- D 0 - I - 0x029C28 0A:9C18: 29        .byte $29   ; 
- D 0 - I - 0x029C29 0A:9C19: 10        .byte $10   ; 
- D 0 - I - 0x029C2A 0A:9C1A: 2B        .byte $2B   ; 
- D 0 - I - 0x029C2B 0A:9C1B: 07        .byte $07   ; 
- D 0 - I - 0x029C2C 0A:9C1C: F1        .byte $F1   ; 
- D 0 - I - 0x029C2D 0A:9C1D: 31        .byte $31   ; <1>
- D 0 - I - 0x029C2E 0A:9C1E: 49        .byte $49   ; <I>
- D 0 - I - 0x029C2F 0A:9C1F: AC        .byte $AC   ; 
- D 0 - I - 0x029C30 0A:9C20: FF        .byte $FF   ; 
- D 0 - I - 0x029C31 0A:9C21: 0A        .byte $0A   ; 
- D 0 - I - 0x029C32 0A:9C22: 28        .byte $28   ; 
- D 0 - I - 0x029C33 0A:9C23: F4        .byte $F4   ; 
- D 0 - I - 0x029C34 0A:9C24: 27        .byte $27   ; 
- D 0 - I - 0x029C35 0A:9C25: 1F        .byte $1F   ; 
- D 0 - I - 0x029C36 0A:9C26: 00        .byte $00   ; 
- D 0 - I - 0x029C37 0A:9C27: 0B        .byte $0B   ; 
- D 0 - I - 0x029C38 0A:9C28: F1        .byte $F1   ; 
- D 0 - I - 0x029C39 0A:9C29: 00        .byte $00   ; 
- D 0 - I - 0x029C3A 0A:9C2A: 0B        .byte $0B   ; 
- D 0 - I - 0x029C3B 0A:9C2B: 00        .byte $00   ; 
- D 0 - I - 0x029C3C 0A:9C2C: BB        .byte $BB   ; 
- D 0 - I - 0x029C3D 0A:9C2D: 05        .byte $05   ; 
- D 0 - I - 0x029C3E 0A:9C2E: 04        .byte $04   ; 
- D 0 - I - 0x029C3F 0A:9C2F: F1        .byte $F1   ; 
- D 0 - I - 0x029C40 0A:9C30: B5        .byte $B5   ; 
- D 0 - I - 0x029C41 0A:9C31: C9        .byte $C9   ; 
- D 0 - I - 0x029C42 0A:9C32: FD        .byte $FD   ; 
- D 0 - I - 0x029C43 0A:9C33: 9F        .byte $9F   ; 
- D 0 - I - 0x029C44 0A:9C34: 08        .byte $08   ; 
- D 0 - I - 0x029C45 0A:9C35: F8        .byte $F8   ; 
- D 0 - I - 0x029C46 0A:9C36: 4E        .byte $4E   ; <N>
- D 0 - I - 0x029C47 0A:9C37: 8E        .byte $8E   ; 
- D 0 - I - 0x029C48 0A:9C38: F5        .byte $F5   ; 
- D 0 - I - 0x029C49 0A:9C39: 0D        .byte $0D   ; 
- D 0 - I - 0x029C4A 0A:9C3A: F4        .byte $F4   ; 
- D 0 - I - 0x029C4B 0A:9C3B: 14        .byte $14   ; 
- D 0 - I - 0x029C4C 0A:9C3C: 15        .byte $15   ; 
- D 0 - I - 0x029C4D 0A:9C3D: 16        .byte $16   ; 
- D 0 - I - 0x029C4E 0A:9C3E: 00        .byte $00   ; 
- D 0 - I - 0x029C4F 0A:9C3F: F1        .byte $F1   ; 
- D 0 - I - 0x029C50 0A:9C40: 00        .byte $00   ; 
- D 0 - I - 0x029C51 0A:9C41: 3D        .byte $3D   ; 
- D 0 - I - 0x029C52 0A:9C42: 00        .byte $00   ; 
- D 0 - I - 0x029C53 0A:9C43: C3        .byte $C3   ; 
- D 0 - I - 0x029C54 0A:9C44: 01        .byte $01   ; 
- D 0 - I - 0x029C55 0A:9C45: F0        .byte $F0   ; 
- D 0 - I - 0x029C56 0A:9C46: F5        .byte $F5   ; 
- D 0 - I - 0x029C57 0A:9C47: 81        .byte $81   ; 
- D 0 - I - 0x029C58 0A:9C48: F4        .byte $F4   ; 
- D 0 - I - 0x029C59 0A:9C49: 14        .byte $14   ; 
- D 0 - I - 0x029C5A 0A:9C4A: 15        .byte $15   ; 
- D 0 - I - 0x029C5B 0A:9C4B: 16        .byte $16   ; 
- D 0 - I - 0x029C5C 0A:9C4C: 00        .byte $00   ; 
- D 0 - I - 0x029C5D 0A:9C4D: F1        .byte $F1   ; 
- D 0 - I - 0x029C5E 0A:9C4E: BC        .byte $BC   ; 
- D 0 - I - 0x029C5F 0A:9C4F: 41        .byte $41   ; <A>
- D 0 - I - 0x029C60 0A:9C50: B0        .byte $B0   ; 
- D 0 - I - 0x029C61 0A:9C51: C3        .byte $C3   ; 
- D 0 - I - 0x029C62 0A:9C52: 00        .byte $00   ; 
- D 0 - I - 0x029C63 0A:9C53: F0        .byte $F0   ; 
- D 0 - I - 0x029C64 0A:9C54: F5        .byte $F5   ; 
- D 0 - I - 0x029C65 0A:9C55: 80        .byte $80   ; 
- D 0 - I - 0x029C66 0A:9C56: F4        .byte $F4   ; 
- D 0 - I - 0x029C67 0A:9C57: 14        .byte $14   ; 
- D 0 - I - 0x029C68 0A:9C58: 15        .byte $15   ; 
- D 0 - I - 0x029C69 0A:9C59: 16        .byte $16   ; 
- D 0 - I - 0x029C6A 0A:9C5A: 00        .byte $00   ; 
- D 0 - I - 0x029C6B 0A:9C5B: F1        .byte $F1   ; 
- D 0 - I - 0x029C6C 0A:9C5C: 00        .byte $00   ; 
- D 0 - I - 0x029C6D 0A:9C5D: 42        .byte $42   ; <B>
- D 0 - I - 0x029C6E 0A:9C5E: 00        .byte $00   ; 
- D 0 - I - 0x029C6F 0A:9C5F: C3        .byte $C3   ; 
- D 0 - I - 0x029C70 0A:9C60: 01        .byte $01   ; 
- D 0 - I - 0x029C71 0A:9C61: F0        .byte $F0   ; 
- D 0 - I - 0x029C72 0A:9C62: F5        .byte $F5   ; 
- D 0 - I - 0x029C73 0A:9C63: 80        .byte $80   ; 
- D 0 - I - 0x029C74 0A:9C64: F4        .byte $F4   ; 
- D 0 - I - 0x029C75 0A:9C65: 14        .byte $14   ; 
- D 0 - I - 0x029C76 0A:9C66: 15        .byte $15   ; 
- D 0 - I - 0x029C77 0A:9C67: 16        .byte $16   ; 
- D 0 - I - 0x029C78 0A:9C68: 00        .byte $00   ; 
- D 0 - I - 0x029C79 0A:9C69: F1        .byte $F1   ; 
- D 0 - I - 0x029C7A 0A:9C6A: BC        .byte $BC   ; 
- D 0 - I - 0x029C7B 0A:9C6B: 44        .byte $44   ; <D>
- D 0 - I - 0x029C7C 0A:9C6C: A0        .byte $A0   ; 
- D 0 - I - 0x029C7D 0A:9C6D: C3        .byte $C3   ; 
- D 0 - I - 0x029C7E 0A:9C6E: 00        .byte $00   ; 
- D 0 - I - 0x029C7F 0A:9C6F: F0        .byte $F0   ; 
- D 0 - I - 0x029C80 0A:9C70: F5        .byte $F5   ; 
- D 0 - I - 0x029C81 0A:9C71: 80        .byte $80   ; 
- D 0 - I - 0x029C82 0A:9C72: F4        .byte $F4   ; 
- D 0 - I - 0x029C83 0A:9C73: 04        .byte $04   ; 
- D 0 - I - 0x029C84 0A:9C74: 05        .byte $05   ; 
- D 0 - I - 0x029C85 0A:9C75: 20        .byte $20   ; 
- D 0 - I - 0x029C86 0A:9C76: 21        .byte $21   ; 
- D 0 - I - 0x029C87 0A:9C77: F7        .byte $F7   ; 
- D 0 - I - 0x029C88 0A:9C78: 23        .byte $23   ; 
- D 0 - I - 0x029C89 0A:9C79: 5B        .byte $5B   ; 
- D 0 - I - 0x029C8A 0A:9C7A: F1        .byte $F1   ; 
- D 0 - I - 0x029C8B 0A:9C7B: BD        .byte $BD   ; 
- D 0 - I - 0x029C8C 0A:9C7C: 32        .byte $32   ; <2>
- D 0 - I - 0x029C8D 0A:9C7D: 08        .byte $08   ; 
- D 0 - I - 0x029C8E 0A:9C7E: E3        .byte $E3   ; 
- D 0 - I - 0x029C8F 0A:9C7F: 0D        .byte $0D   ; 
- D 0 - I - 0x029C90 0A:9C80: F1        .byte $F1   ; 
- D 0 - I - 0x029C91 0A:9C81: D4        .byte $D4   ; 
- D 0 - I - 0x029C92 0A:9C82: C0        .byte $C0   ; 
- D 0 - I - 0x029C93 0A:9C83: 98        .byte $98   ; 
- D 0 - I - 0x029C94 0A:9C84: D3        .byte $D3   ; 
- D 0 - I - 0x029C95 0A:9C85: 08        .byte $08   ; 
- D 0 - I - 0x029C96 0A:9C86: F1        .byte $F1   ; 
- D 0 - I - 0x029C97 0A:9C87: 00        .byte $00   ; 
- D 0 - I - 0x029C98 0A:9C88: 00        .byte $00   ; 
- D 0 - I - 0x029C99 0A:9C89: 80        .byte $80   ; 
- D 0 - I - 0x029C9A 0A:9C8A: A3        .byte $A3   ; 
- D 0 - I - 0x029C9B 0A:9C8B: 04        .byte $04   ; 
- D 0 - I - 0x029C9C 0A:9C8C: F1        .byte $F1   ; 
- D 0 - I - 0x029C9D 0A:9C8D: 00        .byte $00   ; 
- D 0 - I - 0x029C9E 0A:9C8E: 00        .byte $00   ; 
- D 0 - I - 0x029C9F 0A:9C8F: 80        .byte $80   ; 
- D 0 - I - 0x029CA0 0A:9C90: DB        .byte $DB   ; 
- D 0 - I - 0x029CA1 0A:9C91: 00        .byte $00   ; 
- D 0 - I - 0x029CA2 0A:9C92: F0        .byte $F0   ; 
- D 0 - I - 0x029CA3 0A:9C93: F5        .byte $F5   ; 
- D 0 - I - 0x029CA4 0A:9C94: 80        .byte $80   ; 
- D 0 - I - 0x029CA5 0A:9C95: F4        .byte $F4   ; 
- D 0 - I - 0x029CA6 0A:9C96: 04        .byte $04   ; 
- D 0 - I - 0x029CA7 0A:9C97: 05        .byte $05   ; 
- D 0 - I - 0x029CA8 0A:9C98: 20        .byte $20   ; 
- D 0 - I - 0x029CA9 0A:9C99: 21        .byte $21   ; 
- D 0 - I - 0x029CAA 0A:9C9A: F1        .byte $F1   ; 
- D 0 - I - 0x029CAB 0A:9C9B: 00        .byte $00   ; 
- D 0 - I - 0x029CAC 0A:9C9C: 00        .byte $00   ; 
- D 0 - I - 0x029CAD 0A:9C9D: 80        .byte $80   ; 
- D 0 - I - 0x029CAE 0A:9C9E: FB        .byte $FB   ; 
- D 0 - I - 0x029CAF 0A:9C9F: 00        .byte $00   ; 
- D 0 - I - 0x029CB0 0A:9CA0: F1        .byte $F1   ; 
- D 0 - I - 0x029CB1 0A:9CA1: BF        .byte $BF   ; 
- D 0 - I - 0x029CB2 0A:9CA2: CF        .byte $CF   ; 
- D 0 - I - 0x029CB3 0A:9CA3: F0        .byte $F0   ; 
- D 0 - I - 0x029CB4 0A:9CA4: CB        .byte $CB   ; 
- D 0 - I - 0x029CB5 0A:9CA5: 04        .byte $04   ; 
- D 0 - I - 0x029CB6 0A:9CA6: F1        .byte $F1   ; 
- D 0 - I - 0x029CB7 0A:9CA7: BE        .byte $BE   ; 
- D 0 - I - 0x029CB8 0A:9CA8: 33        .byte $33   ; <3>
- D 0 - I - 0x029CB9 0A:9CA9: 04        .byte $04   ; 
- D 0 - I - 0x029CBA 0A:9CAA: BB        .byte $BB   ; 
- D 0 - I - 0x029CBB 0A:9CAB: 09        .byte $09   ; 
- D 0 - I - 0x029CBC 0A:9CAC: F0        .byte $F0   ; 
- D 0 - I - 0x029CBD 0A:9CAD: F5        .byte $F5   ; 
- D 0 - I - 0x029CBE 0A:9CAE: 80        .byte $80   ; 
- D 0 - I - 0x029CBF 0A:9CAF: F4        .byte $F4   ; 
- D 0 - I - 0x029CC0 0A:9CB0: 0C        .byte $0C   ; 
- D 0 - I - 0x029CC1 0A:9CB1: 0D        .byte $0D   ; 
- D 0 - I - 0x029CC2 0A:9CB2: 0E        .byte $0E   ; 
- D 0 - I - 0x029CC3 0A:9CB3: 0F        .byte $0F   ; 
- D 0 - I - 0x029CC4 0A:9CB4: F1        .byte $F1   ; 
- D 0 - I - 0x029CC5 0A:9CB5: 64        .byte $64   ; <d>
- D 0 - I - 0x029CC6 0A:9CB6: 1D        .byte $1D   ; 
- D 0 - I - 0x029CC7 0A:9CB7: 20        .byte $20   ; 
- D 0 - I - 0x029CC8 0A:9CB8: BB        .byte $BB   ; 
- D 0 - I - 0x029CC9 0A:9CB9: 05        .byte $05   ; 
- D 0 - I - 0x029CCA 0A:9CBA: F1        .byte $F1   ; 
- D 0 - I - 0x029CCB 0A:9CBB: 65        .byte $65   ; <e>
- D 0 - I - 0x029CCC 0A:9CBC: 1E        .byte $1E   ; 
- D 0 - I - 0x029CCD 0A:9CBD: D0        .byte $D0   ; 
- D 0 - I - 0x029CCE 0A:9CBE: 93        .byte $93   ; 
- D 0 - I - 0x029CCF 0A:9CBF: 00        .byte $00   ; 
- D 0 - I - 0x029CD0 0A:9CC0: 14        .byte $14   ; 
- D 0 - I - 0x029CD1 0A:9CC1: F6        .byte $F6   ; 
- D 0 - I - 0x029CD2 0A:9CC2: 15        .byte $15   ; 
- D 0 - I - 0x029CD3 0A:9CC3: F1        .byte $F1   ; 
- D 0 - I - 0x029CD4 0A:9CC4: C0        .byte $C0   ; 
- D 0 - I - 0x029CD5 0A:9CC5: 3F        .byte $3F   ; 
- D 0 - I - 0x029CD6 0A:9CC6: 10        .byte $10   ; 
- D 0 - I - 0x029CD7 0A:9CC7: B3        .byte $B3   ; 
- D 0 - I - 0x029CD8 0A:9CC8: 01        .byte $01   ; 
- D 0 - I - 0x029CD9 0A:9CC9: 04        .byte $04   ; 
- D 0 - I - 0x029CDA 0A:9CCA: F1        .byte $F1   ; 
- D 0 - I - 0x029CDB 0A:9CCB: 66        .byte $66   ; <f>
- D 0 - I - 0x029CDC 0A:9CCC: 1D        .byte $1D   ; 
- D 0 - I - 0x029CDD 0A:9CCD: 10        .byte $10   ; 
- D 0 - I - 0x029CDE 0A:9CCE: B3        .byte $B3   ; 
- D 0 - I - 0x029CDF 0A:9CCF: 05        .byte $05   ; 
- D 0 - I - 0x029CE0 0A:9CD0: F1        .byte $F1   ; 
- D 0 - I - 0x029CE1 0A:9CD1: D6        .byte $D6   ; 
- D 0 - I - 0x029CE2 0A:9CD2: 1E        .byte $1E   ; 
- D 0 - I - 0x029CE3 0A:9CD3: 08        .byte $08   ; 
- D 0 - I - 0x029CE4 0A:9CD4: AF        .byte $AF   ; 
- D 0 - I - 0x029CE5 0A:9CD5: 01        .byte $01   ; 
- D 0 - I - 0x029CE6 0A:9CD6: F0        .byte $F0   ; 
- D 0 - I - 0x029CE7 0A:9CD7: F5        .byte $F5   ; 
- D 0 - I - 0x029CE8 0A:9CD8: 80        .byte $80   ; 
- D 0 - I - 0x029CE9 0A:9CD9: F4        .byte $F4   ; 
- D 0 - I - 0x029CEA 0A:9CDA: 10        .byte $10   ; 
- D 0 - I - 0x029CEB 0A:9CDB: 11        .byte $11   ; 
- D 0 - I - 0x029CEC 0A:9CDC: 12        .byte $12   ; 
- D 0 - I - 0x029CED 0A:9CDD: 13        .byte $13   ; 
- D 0 - I - 0x029CEE 0A:9CDE: F7        .byte $F7   ; 
- D 0 - I - 0x029CEF 0A:9CDF: 03        .byte $03   ; 
- D 0 - I - 0x029CF0 0A:9CE0: 7B        .byte $7B   ; 
- D 0 - I - 0x029CF1 0A:9CE1: F1        .byte $F1   ; 
- D 0 - I - 0x029CF2 0A:9CE2: C2        .byte $C2   ; 
- D 0 - I - 0x029CF3 0A:9CE3: 53        .byte $53   ; <S>
- D 0 - I - 0x029CF4 0A:9CE4: E0        .byte $E0   ; 
- D 0 - I - 0x029CF5 0A:9CE5: 7B        .byte $7B   ; 
- D 0 - I - 0x029CF6 0A:9CE6: 0C        .byte $0C   ; 
- D 0 - I - 0x029CF7 0A:9CE7: F1        .byte $F1   ; 
- D 0 - I - 0x029CF8 0A:9CE8: 00        .byte $00   ; 
- D 0 - I - 0x029CF9 0A:9CE9: 00        .byte $00   ; 
- D 0 - I - 0x029CFA 0A:9CEA: 80        .byte $80   ; 
- D 0 - I - 0x029CFB 0A:9CEB: 83        .byte $83   ; 
- D 0 - I - 0x029CFC 0A:9CEC: 00        .byte $00   ; 
- D 0 - I - 0x029CFD 0A:9CED: 28        .byte $28   ; 
- D 0 - I - 0x029CFE 0A:9CEE: F1        .byte $F1   ; 
- D 0 - I - 0x029CFF 0A:9CEF: C3        .byte $C3   ; 
- D 0 - I - 0x029D00 0A:9CF0: 55        .byte $55   ; <U>
- D 0 - I - 0x029D01 0A:9CF1: 10        .byte $10   ; 
- D 0 - I - 0x029D02 0A:9CF2: 1B        .byte $1B   ; 
- D 0 - I - 0x029D03 0A:9CF3: 07        .byte $07   ; 
- D 0 - I - 0x029D04 0A:9CF4: F1        .byte $F1   ; 
- D 0 - I - 0x029D05 0A:9CF5: 00        .byte $00   ; 
- D 0 - I - 0x029D06 0A:9CF6: 00        .byte $00   ; 
- D 0 - I - 0x029D07 0A:9CF7: 80        .byte $80   ; 
- D 0 - I - 0x029D08 0A:9CF8: FB        .byte $FB   ; 
- D 0 - I - 0x029D09 0A:9CF9: 00        .byte $00   ; 
- D 0 - I - 0x029D0A 0A:9CFA: F0        .byte $F0   ; 
- D 0 - I - 0x029D0B 0A:9CFB: F5        .byte $F5   ; 
- D 0 - I - 0x029D0C 0A:9CFC: 80        .byte $80   ; 
- D 0 - I - 0x029D0D 0A:9CFD: F4        .byte $F4   ; 
- D 0 - I - 0x029D0E 0A:9CFE: 04        .byte $04   ; 
- D 0 - I - 0x029D0F 0A:9CFF: 05        .byte $05   ; 
- D 0 - I - 0x029D10 0A:9D00: 20        .byte $20   ; 
- D 0 - I - 0x029D11 0A:9D01: 21        .byte $21   ; 
- D 0 - I - 0x029D12 0A:9D02: F1        .byte $F1   ; 
- D 0 - I - 0x029D13 0A:9D03: C4        .byte $C4   ; 
- D 0 - I - 0x029D14 0A:9D04: 32        .byte $32   ; <2>
- D 0 - I - 0x029D15 0A:9D05: B8        .byte $B8   ; 
- D 0 - I - 0x029D16 0A:9D06: BB        .byte $BB   ; 
- D 0 - I - 0x029D17 0A:9D07: 05        .byte $05   ; 
- D 0 - I - 0x029D18 0A:9D08: F1        .byte $F1   ; 
- D 0 - I - 0x029D19 0A:9D09: C5        .byte $C5   ; 
- D 0 - I - 0x029D1A 0A:9D0A: C0        .byte $C0   ; 
- D 0 - I - 0x029D1B 0A:9D0B: E0        .byte $E0   ; 
- D 0 - I - 0x029D1C 0A:9D0C: C3        .byte $C3   ; 
- D 0 - I - 0x029D1D 0A:9D0D: 00        .byte $00   ; 
- D 0 - I - 0x029D1E 0A:9D0E: F0        .byte $F0   ; 
- D 0 - I - 0x029D1F 0A:9D0F: F5        .byte $F5   ; 
- D 0 - I - 0x029D20 0A:9D10: 80        .byte $80   ; 
- D 0 - I - 0x029D21 0A:9D11: F4        .byte $F4   ; 
- D 0 - I - 0x029D22 0A:9D12: 13        .byte $13   ; 
- D 0 - I - 0x029D23 0A:9D13: 00        .byte $00   ; 
- D 0 - I - 0x029D24 0A:9D14: 0F        .byte $0F   ; 
- D 0 - I - 0x029D25 0A:9D15: 00        .byte $00   ; 
- D 0 - I - 0x029D26 0A:9D16: F7        .byte $F7   ; 
- D 0 - I - 0x029D27 0A:9D17: 03        .byte $03   ; 
- D 0 - I - 0x029D28 0A:9D18: 7B        .byte $7B   ; 
- D 0 - I - 0x029D29 0A:9D19: F1        .byte $F1   ; 
- D 0 - I - 0x029D2A 0A:9D1A: C6        .byte $C6   ; 
- D 0 - I - 0x029D2B 0A:9D1B: 2B        .byte $2B   ; 
- D 0 - I - 0x029D2C 0A:9D1C: 40        .byte $40   ; 
- D 0 - I - 0x029D2D 0A:9D1D: 0B        .byte $0B   ; 
- D 0 - I - 0x029D2E 0A:9D1E: 0F        .byte $0F   ; 
- D 0 - I - 0x029D2F 0A:9D1F: 14        .byte $14   ; 
- D 0 - I - 0x029D30 0A:9D20: F1        .byte $F1   ; 
- D 0 - I - 0x029D31 0A:9D21: C7        .byte $C7   ; 
- D 0 - I - 0x029D32 0A:9D22: 2A        .byte $2A   ; 
- D 0 - I - 0x029D33 0A:9D23: 00        .byte $00   ; 
- D 0 - I - 0x029D34 0A:9D24: 1B        .byte $1B   ; 
- D 0 - I - 0x029D35 0A:9D25: 0B        .byte $0B   ; 
- D 0 - I - 0x029D36 0A:9D26: F1        .byte $F1   ; 
- D 0 - I - 0x029D37 0A:9D27: 00        .byte $00   ; 
- D 0 - I - 0x029D38 0A:9D28: 00        .byte $00   ; 
- D 0 - I - 0x029D39 0A:9D29: 80        .byte $80   ; 
- D 0 - I - 0x029D3A 0A:9D2A: FB        .byte $FB   ; 
- D 0 - I - 0x029D3B 0A:9D2B: 00        .byte $00   ; 
- D 0 - I - 0x029D3C 0A:9D2C: 32        .byte $32   ; <2>
- D 0 - I - 0x029D3D 0A:9D2D: F1        .byte $F1   ; 
- D 0 - I - 0x029D3E 0A:9D2E: DF        .byte $DF   ; 
- D 0 - I - 0x029D3F 0A:9D2F: 2A        .byte $2A   ; 
- D 0 - I - 0x029D40 0A:9D30: F8        .byte $F8   ; 
- D 0 - I - 0x029D41 0A:9D31: 5B        .byte $5B   ; 
- D 0 - I - 0x029D42 0A:9D32: 0C        .byte $0C   ; 
- D 0 - I - 0x029D43 0A:9D33: F0        .byte $F0   ; 
- D 0 - I - 0x029D44 0A:9D34: F5        .byte $F5   ; 
- D 0 - I - 0x029D45 0A:9D35: 80        .byte $80   ; 
- D 0 - I - 0x029D46 0A:9D36: F4        .byte $F4   ; 
- D 0 - I - 0x029D47 0A:9D37: 0C        .byte $0C   ; 
- D 0 - I - 0x029D48 0A:9D38: 0D        .byte $0D   ; 
- D 0 - I - 0x029D49 0A:9D39: 0E        .byte $0E   ; 
- D 0 - I - 0x029D4A 0A:9D3A: 0F        .byte $0F   ; 
- D 0 - I - 0x029D4B 0A:9D3B: F7        .byte $F7   ; 
- D 0 - I - 0x029D4C 0A:9D3C: 23        .byte $23   ; 
- D 0 - I - 0x029D4D 0A:9D3D: 5B        .byte $5B   ; 
- D 0 - I - 0x029D4E 0A:9D3E: F1        .byte $F1   ; 
- D 0 - I - 0x029D4F 0A:9D3F: 51        .byte $51   ; <Q>
- D 0 - I - 0x029D50 0A:9D40: 1C        .byte $1C   ; 
- D 0 - I - 0x029D51 0A:9D41: 00        .byte $00   ; 
- D 0 - I - 0x029D52 0A:9D42: CB        .byte $CB   ; 
- D 0 - I - 0x029D53 0A:9D43: 0C        .byte $0C   ; 
- D 0 - I - 0x029D54 0A:9D44: F1        .byte $F1   ; 
- D 0 - I - 0x029D55 0A:9D45: 9E        .byte $9E   ; 
- D 0 - I - 0x029D56 0A:9D46: 1E        .byte $1E   ; 
- D 0 - I - 0x029D57 0A:9D47: 68        .byte $68   ; <h>
- D 0 - I - 0x029D58 0A:9D48: A3        .byte $A3   ; 
- D 0 - I - 0x029D59 0A:9D49: 09        .byte $09   ; 
- D 0 - I - 0x029D5A 0A:9D4A: F1        .byte $F1   ; 
- D 0 - I - 0x029D5B 0A:9D4B: 00        .byte $00   ; 
- D 0 - I - 0x029D5C 0A:9D4C: 00        .byte $00   ; 
- D 0 - I - 0x029D5D 0A:9D4D: 80        .byte $80   ; 
- D 0 - I - 0x029D5E 0A:9D4E: A3        .byte $A3   ; 
- D 0 - I - 0x029D5F 0A:9D4F: 04        .byte $04   ; 
- D 0 - I - 0x029D60 0A:9D50: F1        .byte $F1   ; 
- D 0 - I - 0x029D61 0A:9D51: 00        .byte $00   ; 
- D 0 - I - 0x029D62 0A:9D52: 00        .byte $00   ; 
- D 0 - I - 0x029D63 0A:9D53: 80        .byte $80   ; 
- D 0 - I - 0x029D64 0A:9D54: DB        .byte $DB   ; 
- D 0 - I - 0x029D65 0A:9D55: 00        .byte $00   ; 
- D 0 - I - 0x029D66 0A:9D56: 1E        .byte $1E   ; 
- D 0 - I - 0x029D67 0A:9D57: F6        .byte $F6   ; 
- D 0 - I - 0x029D68 0A:9D58: 2A        .byte $2A   ; 
- D 0 - I - 0x029D69 0A:9D59: F1        .byte $F1   ; 
- D 0 - I - 0x029D6A 0A:9D5A: 29        .byte $29   ; 
- D 0 - I - 0x029D6B 0A:9D5B: 47        .byte $47   ; <G>
- D 0 - I - 0x029D6C 0A:9D5C: E0        .byte $E0   ; 
- D 0 - I - 0x029D6D 0A:9D5D: CB        .byte $CB   ; 
- D 0 - I - 0x029D6E 0A:9D5E: 0C        .byte $0C   ; 
- D 0 - I - 0x029D6F 0A:9D5F: 02        .byte $02   ; 
- D 0 - I - 0x029D70 0A:9D60: F1        .byte $F1   ; 
- D 0 - I - 0x029D71 0A:9D61: 2A        .byte $2A   ; 
- D 0 - I - 0x029D72 0A:9D62: 20        .byte $20   ; 
- D 0 - I - 0x029D73 0A:9D63: E8        .byte $E8   ; 
- D 0 - I - 0x029D74 0A:9D64: CB        .byte $CB   ; 
- D 0 - I - 0x029D75 0A:9D65: 0C        .byte $0C   ; 
- D 0 - I - 0x029D76 0A:9D66: F1        .byte $F1   ; 
- D 0 - I - 0x029D77 0A:9D67: 41        .byte $41   ; <A>
- D 0 - I - 0x029D78 0A:9D68: 22        .byte $22   ; 
- D 0 - I - 0x029D79 0A:9D69: FC        .byte $FC   ; 
- D 0 - I - 0x029D7A 0A:9D6A: BB        .byte $BB   ; 
- D 0 - I - 0x029D7B 0A:9D6B: 08        .byte $08   ; 
- D 0 - I - 0x029D7C 0A:9D6C: 01        .byte $01   ; 
- D 0 - I - 0x029D7D 0A:9D6D: FB        .byte $FB   ; 
- D 0 - I - 0x029D7E 0A:9D6E: 01        .byte $01   ; 
- D 0 - I - 0x029D7F 0A:9D6F: 23        .byte $23   ; 
- D 0 - I - 0x029D80 0A:9D70: 45        .byte $45   ; <E>
- D 0 - I - 0x029D81 0A:9D71: 01        .byte $01   ; 
- D 0 - I - 0x029D82 0A:9D72: FB        .byte $FB   ; 
- D 0 - I - 0x029D83 0A:9D73: 01        .byte $01   ; 
- D 0 - I - 0x029D84 0A:9D74: 32        .byte $32   ; <2>
- D 0 - I - 0x029D85 0A:9D75: 45        .byte $45   ; <E>
- D 0 - I - 0x029D86 0A:9D76: F8        .byte $F8   ; 
- D 0 - I - 0x029D87 0A:9D77: 6C        .byte $6C   ; <l>
- D 0 - I - 0x029D88 0A:9D78: 9D        .byte $9D   ; 
- D 0 - I - 0x029D89 0A:9D79: F5        .byte $F5   ; 
- D 0 - I - 0x029D8A 0A:9D7A: 80        .byte $80   ; 
- D 0 - I - 0x029D8B 0A:9D7B: F4        .byte $F4   ; 
- D 0 - I - 0x029D8C 0A:9D7C: 2B        .byte $2B   ; 
- D 0 - I - 0x029D8D 0A:9D7D: 00        .byte $00   ; 
- D 0 - I - 0x029D8E 0A:9D7E: 00        .byte $00   ; 
- D 0 - I - 0x029D8F 0A:9D7F: 00        .byte $00   ; 
- D 0 - I - 0x029D90 0A:9D80: F1        .byte $F1   ; 
- D 0 - I - 0x029D91 0A:9D81: 00        .byte $00   ; 
- D 0 - I - 0x029D92 0A:9D82: 57        .byte $57   ; <W>
- D 0 - I - 0x029D93 0A:9D83: 10        .byte $10   ; 
- D 0 - I - 0x029D94 0A:9D84: C3        .byte $C3   ; 
- D 0 - I - 0x029D95 0A:9D85: 01        .byte $01   ; 
- D 0 - I - 0x029D96 0A:9D86: F0        .byte $F0   ; 
- D 0 - I - 0x029D97 0A:9D87: F5        .byte $F5   ; 
- D 0 - I - 0x029D98 0A:9D88: 80        .byte $80   ; 
- D 0 - I - 0x029D99 0A:9D89: F4        .byte $F4   ; 
- D 0 - I - 0x029D9A 0A:9D8A: 14        .byte $14   ; 
- D 0 - I - 0x029D9B 0A:9D8B: 15        .byte $15   ; 
- D 0 - I - 0x029D9C 0A:9D8C: 16        .byte $16   ; 
- D 0 - I - 0x029D9D 0A:9D8D: 00        .byte $00   ; 
- D 0 - I - 0x029D9E 0A:9D8E: F7        .byte $F7   ; 
- D 0 - I - 0x029D9F 0A:9D8F: 23        .byte $23   ; 
- D 0 - I - 0x029DA0 0A:9D90: 5B        .byte $5B   ; 
- D 0 - I - 0x029DA1 0A:9D91: F1        .byte $F1   ; 
- D 0 - I - 0x029DA2 0A:9D92: 00        .byte $00   ; 
- D 0 - I - 0x029DA3 0A:9D93: 00        .byte $00   ; 
- D 0 - I - 0x029DA4 0A:9D94: 80        .byte $80   ; 
- D 0 - I - 0x029DA5 0A:9D95: DB        .byte $DB   ; 
- D 0 - I - 0x029DA6 0A:9D96: 00        .byte $00   ; 
- D 0 - I - 0x029DA7 0A:9D97: F1        .byte $F1   ; 
- D 0 - I - 0x029DA8 0A:9D98: 00        .byte $00   ; 
- D 0 - I - 0x029DA9 0A:9D99: 00        .byte $00   ; 
- D 0 - I - 0x029DAA 0A:9D9A: 80        .byte $80   ; 
- D 0 - I - 0x029DAB 0A:9D9B: A3        .byte $A3   ; 
- D 0 - I - 0x029DAC 0A:9D9C: 04        .byte $04   ; 
- D 0 - I - 0x029DAD 0A:9D9D: F1        .byte $F1   ; 
- D 0 - I - 0x029DAE 0A:9D9E: B3        .byte $B3   ; 
- D 0 - I - 0x029DAF 0A:9D9F: 5F        .byte $5F   ; 
- D 0 - I - 0x029DB0 0A:9DA0: 70        .byte $70   ; <p>
- D 0 - I - 0x029DB1 0A:9DA1: FF        .byte $FF   ; 
- D 0 - I - 0x029DB2 0A:9DA2: 08        .byte $08   ; 
- D 0 - I - 0x029DB3 0A:9DA3: F0        .byte $F0   ; 
- D 0 - I - 0x029DB4 0A:9DA4: F5        .byte $F5   ; 
- D 0 - I - 0x029DB5 0A:9DA5: 80        .byte $80   ; 
- D 0 - I - 0x029DB6 0A:9DA6: F4        .byte $F4   ; 
- D 0 - I - 0x029DB7 0A:9DA7: 27        .byte $27   ; 
- D 0 - I - 0x029DB8 0A:9DA8: 1E        .byte $1E   ; 
- D 0 - I - 0x029DB9 0A:9DA9: 00        .byte $00   ; 
- D 0 - I - 0x029DBA 0A:9DAA: 0B        .byte $0B   ; 
- D 0 - I - 0x029DBB 0A:9DAB: F1        .byte $F1   ; 
- D 0 - I - 0x029DBC 0A:9DAC: B6        .byte $B6   ; 
- D 0 - I - 0x029DBD 0A:9DAD: 13        .byte $13   ; 
- D 0 - I - 0x029DBE 0A:9DAE: 50        .byte $50   ; <P>
- D 0 - I - 0x029DBF 0A:9DAF: AB        .byte $AB   ; 
- D 0 - I - 0x029DC0 0A:9DB0: 04        .byte $04   ; 
- D 0 - I - 0x029DC1 0A:9DB1: F1        .byte $F1   ; 
- D 0 - I - 0x029DC2 0A:9DB2: 92        .byte $92   ; 
- D 0 - I - 0x029DC3 0A:9DB3: 49        .byte $49   ; <I>
- D 0 - I - 0x029DC4 0A:9DB4: 20        .byte $20   ; 
- D 0 - I - 0x029DC5 0A:9DB5: 77        .byte $77   ; <w>
- D 0 - I - 0x029DC6 0A:9DB6: 01        .byte $01   ; 
- D 0 - I - 0x029DC7 0A:9DB7: F0        .byte $F0   ; 
- D 0 - I - 0x029DC8 0A:9DB8: F5        .byte $F5   ; 
- D 0 - I - 0x029DC9 0A:9DB9: 09        .byte $09   ; 
- D 0 - I - 0x029DCA 0A:9DBA: F4        .byte $F4   ; 
- D 0 - I - 0x029DCB 0A:9DBB: 22        .byte $22   ; 
- D 0 - I - 0x029DCC 0A:9DBC: 23        .byte $23   ; 
- D 0 - I - 0x029DCD 0A:9DBD: 00        .byte $00   ; 
- D 0 - I - 0x029DCE 0A:9DBE: 00        .byte $00   ; 
- D 0 - I - 0x029DCF 0A:9DBF: F1        .byte $F1   ; 
- D 0 - I - 0x029DD0 0A:9DC0: BB        .byte $BB   ; 
- D 0 - I - 0x029DD1 0A:9DC1: 62        .byte $62   ; <b>
- D 0 - I - 0x029DD2 0A:9DC2: 18        .byte $18   ; 
- D 0 - I - 0x029DD3 0A:9DC3: 8B        .byte $8B   ; 
- D 0 - I - 0x029DD4 0A:9DC4: 01        .byte $01   ; 
- D 0 - I - 0x029DD5 0A:9DC5: 01        .byte $01   ; 
- D 0 - I - 0x029DD6 0A:9DC6: F1        .byte $F1   ; 
- D 0 - I - 0x029DD7 0A:9DC7: BB        .byte $BB   ; 
- D 0 - I - 0x029DD8 0A:9DC8: 62        .byte $62   ; <b>
- D 0 - I - 0x029DD9 0A:9DC9: 18        .byte $18   ; 
- D 0 - I - 0x029DDA 0A:9DCA: 8B        .byte $8B   ; 
- D 0 - I - 0x029DDB 0A:9DCB: 05        .byte $05   ; 
- D 0 - I - 0x029DDC 0A:9DCC: 01        .byte $01   ; 
- D 0 - I - 0x029DDD 0A:9DCD: F1        .byte $F1   ; 
- D 0 - I - 0x029DDE 0A:9DCE: BB        .byte $BB   ; 
- D 0 - I - 0x029DDF 0A:9DCF: 61        .byte $61   ; <a>
- D 0 - I - 0x029DE0 0A:9DD0: 18        .byte $18   ; 
- D 0 - I - 0x029DE1 0A:9DD1: 8B        .byte $8B   ; 
- D 0 - I - 0x029DE2 0A:9DD2: 09        .byte $09   ; 
- D 0 - I - 0x029DE3 0A:9DD3: 01        .byte $01   ; 
- D 0 - I - 0x029DE4 0A:9DD4: F1        .byte $F1   ; 
- D 0 - I - 0x029DE5 0A:9DD5: BB        .byte $BB   ; 
- D 0 - I - 0x029DE6 0A:9DD6: 61        .byte $61   ; <a>
- D 0 - I - 0x029DE7 0A:9DD7: 18        .byte $18   ; 
- D 0 - I - 0x029DE8 0A:9DD8: 8B        .byte $8B   ; 
- D 0 - I - 0x029DE9 0A:9DD9: 0D        .byte $0D   ; 
- D 0 - I - 0x029DEA 0A:9DDA: 01        .byte $01   ; 
- D 0 - I - 0x029DEB 0A:9DDB: F1        .byte $F1   ; 
- D 0 - I - 0x029DEC 0A:9DDC: BB        .byte $BB   ; 
- D 0 - I - 0x029DED 0A:9DDD: 60        .byte $60   ; 
- D 0 - I - 0x029DEE 0A:9DDE: 18        .byte $18   ; 
- D 0 - I - 0x029DEF 0A:9DDF: 8B        .byte $8B   ; 
- D 0 - I - 0x029DF0 0A:9DE0: 11        .byte $11   ; 
- D 0 - I - 0x029DF1 0A:9DE1: 01        .byte $01   ; 
- D 0 - I - 0x029DF2 0A:9DE2: F1        .byte $F1   ; 
- D 0 - I - 0x029DF3 0A:9DE3: BB        .byte $BB   ; 
- D 0 - I - 0x029DF4 0A:9DE4: 60        .byte $60   ; 
- D 0 - I - 0x029DF5 0A:9DE5: 18        .byte $18   ; 
- D 0 - I - 0x029DF6 0A:9DE6: 8B        .byte $8B   ; 
- D 0 - I - 0x029DF7 0A:9DE7: 15        .byte $15   ; 
- D 0 - I - 0x029DF8 0A:9DE8: F0        .byte $F0   ; 
- D 0 - I - 0x029DF9 0A:9DE9: F5        .byte $F5   ; 
- D 0 - I - 0x029DFA 0A:9DEA: 81        .byte $81   ; 
- D 0 - I - 0x029DFB 0A:9DEB: F4        .byte $F4   ; 
- D 0 - I - 0x029DFC 0A:9DEC: 14        .byte $14   ; 
- D 0 - I - 0x029DFD 0A:9DED: 15        .byte $15   ; 
- D 0 - I - 0x029DFE 0A:9DEE: 16        .byte $16   ; 
- D 0 - I - 0x029DFF 0A:9DEF: 00        .byte $00   ; 
- D 0 - I - 0x029E00 0A:9DF0: F1        .byte $F1   ; 
- D 0 - I - 0x029E01 0A:9DF1: B9        .byte $B9   ; 
- D 0 - I - 0x029E02 0A:9DF2: 52        .byte $52   ; <R>
- D 0 - I - 0x029E03 0A:9DF3: B0        .byte $B0   ; 
- D 0 - I - 0x029E04 0A:9DF4: E3        .byte $E3   ; 
- D 0 - I - 0x029E05 0A:9DF5: 0C        .byte $0C   ; 
- D 0 - I - 0x029E06 0A:9DF6: 28        .byte $28   ; 
- D 0 - I - 0x029E07 0A:9DF7: F7        .byte $F7   ; 
- D 0 - I - 0x029E08 0A:9DF8: 23        .byte $23   ; 
- D 0 - I - 0x029E09 0A:9DF9: 5B        .byte $5B   ; 
- D 0 - I - 0x029E0A 0A:9DFA: F1        .byte $F1   ; 
- D 0 - I - 0x029E0B 0A:9DFB: 00        .byte $00   ; 
- D 0 - I - 0x029E0C 0A:9DFC: 00        .byte $00   ; 
- D 0 - I - 0x029E0D 0A:9DFD: 80        .byte $80   ; 
- D 0 - I - 0x029E0E 0A:9DFE: A3        .byte $A3   ; 
- D 0 - I - 0x029E0F 0A:9DFF: 00        .byte $00   ; 
- D 0 - I - 0x029E10 0A:9E00: F1        .byte $F1   ; 
- D 0 - I - 0x029E11 0A:9E01: 00        .byte $00   ; 
- D 0 - I - 0x029E12 0A:9E02: 00        .byte $00   ; 
- D 0 - I - 0x029E13 0A:9E03: 80        .byte $80   ; 
- D 0 - I - 0x029E14 0A:9E04: DB        .byte $DB   ; 
- D 0 - I - 0x029E15 0A:9E05: 04        .byte $04   ; 
- D 0 - I - 0x029E16 0A:9E06: F0        .byte $F0   ; 
- D 0 - I - 0x029E17 0A:9E07: F5        .byte $F5   ; 
- D 0 - I - 0x029E18 0A:9E08: 80        .byte $80   ; 
- D 0 - I - 0x029E19 0A:9E09: F4        .byte $F4   ; 
- D 0 - I - 0x029E1A 0A:9E0A: 08        .byte $08   ; 
- D 0 - I - 0x029E1B 0A:9E0B: 09        .byte $09   ; 
- D 0 - I - 0x029E1C 0A:9E0C: 0A        .byte $0A   ; 
- D 0 - I - 0x029E1D 0A:9E0D: 0B        .byte $0B   ; 
- D 0 - I - 0x029E1E 0A:9E0E: F1        .byte $F1   ; 
- D 0 - I - 0x029E1F 0A:9E0F: D3        .byte $D3   ; 
- D 0 - I - 0x029E20 0A:9E10: 6D        .byte $6D   ; <m>
- D 0 - I - 0x029E21 0A:9E11: 60        .byte $60   ; 
- D 0 - I - 0x029E22 0A:9E12: BB        .byte $BB   ; 
- D 0 - I - 0x029E23 0A:9E13: 05        .byte $05   ; 
- D 0 - I - 0x029E24 0A:9E14: F1        .byte $F1   ; 
- D 0 - I - 0x029E25 0A:9E15: D3        .byte $D3   ; 
- D 0 - I - 0x029E26 0A:9E16: 6C        .byte $6C   ; <l>
- D 0 - I - 0x029E27 0A:9E17: 60        .byte $60   ; 
- D 0 - I - 0x029E28 0A:9E18: BB        .byte $BB   ; 
- D 0 - I - 0x029E29 0A:9E19: 01        .byte $01   ; 
- D 0 - I - 0x029E2A 0A:9E1A: F1        .byte $F1   ; 
- D 0 - I - 0x029E2B 0A:9E1B: D3        .byte $D3   ; 
- D 0 - I - 0x029E2C 0A:9E1C: 6F        .byte $6F   ; <o>
- D 0 - I - 0x029E2D 0A:9E1D: 60        .byte $60   ; 
- D 0 - I - 0x029E2E 0A:9E1E: BB        .byte $BB   ; 
- D 0 - I - 0x029E2F 0A:9E1F: 09        .byte $09   ; 
- D 0 - I - 0x029E30 0A:9E20: F0        .byte $F0   ; 
- D 0 - I - 0x029E31 0A:9E21: F5        .byte $F5   ; 
- D 0 - I - 0x029E32 0A:9E22: 80        .byte $80   ; 
- D 0 - I - 0x029E33 0A:9E23: F4        .byte $F4   ; 
- D 0 - I - 0x029E34 0A:9E24: 08        .byte $08   ; 
- D 0 - I - 0x029E35 0A:9E25: 09        .byte $09   ; 
- D 0 - I - 0x029E36 0A:9E26: 0A        .byte $0A   ; 
- D 0 - I - 0x029E37 0A:9E27: 0B        .byte $0B   ; 
- D 0 - I - 0x029E38 0A:9E28: F1        .byte $F1   ; 
- D 0 - I - 0x029E39 0A:9E29: CA        .byte $CA   ; 
- D 0 - I - 0x029E3A 0A:9E2A: 6D        .byte $6D   ; <m>
- D 0 - I - 0x029E3B 0A:9E2B: 20        .byte $20   ; 
- D 0 - I - 0x029E3C 0A:9E2C: C3        .byte $C3   ; 
- D 0 - I - 0x029E3D 0A:9E2D: 05        .byte $05   ; 
- D 0 - I - 0x029E3E 0A:9E2E: F1        .byte $F1   ; 
- D 0 - I - 0x029E3F 0A:9E2F: CA        .byte $CA   ; 
- D 0 - I - 0x029E40 0A:9E30: 6C        .byte $6C   ; <l>
- D 0 - I - 0x029E41 0A:9E31: 20        .byte $20   ; 
- D 0 - I - 0x029E42 0A:9E32: C3        .byte $C3   ; 
- D 0 - I - 0x029E43 0A:9E33: 01        .byte $01   ; 
- D 0 - I - 0x029E44 0A:9E34: F1        .byte $F1   ; 
- D 0 - I - 0x029E45 0A:9E35: CA        .byte $CA   ; 
- D 0 - I - 0x029E46 0A:9E36: 6F        .byte $6F   ; <o>
- D 0 - I - 0x029E47 0A:9E37: 20        .byte $20   ; 
- D 0 - I - 0x029E48 0A:9E38: C3        .byte $C3   ; 
- D 0 - I - 0x029E49 0A:9E39: 09        .byte $09   ; 
- D 0 - I - 0x029E4A 0A:9E3A: F0        .byte $F0   ; 
- D 0 - I - 0x029E4B 0A:9E3B: F5        .byte $F5   ; 
- D 0 - I - 0x029E4C 0A:9E3C: 80        .byte $80   ; 
- D 0 - I - 0x029E4D 0A:9E3D: F4        .byte $F4   ; 
- D 0 - I - 0x029E4E 0A:9E3E: 08        .byte $08   ; 
- D 0 - I - 0x029E4F 0A:9E3F: 09        .byte $09   ; 
- D 0 - I - 0x029E50 0A:9E40: 0A        .byte $0A   ; 
- D 0 - I - 0x029E51 0A:9E41: 0B        .byte $0B   ; 
- D 0 - I - 0x029E52 0A:9E42: F1        .byte $F1   ; 
- D 0 - I - 0x029E53 0A:9E43: C9        .byte $C9   ; 
- D 0 - I - 0x029E54 0A:9E44: BE        .byte $BE   ; 
- D 0 - I - 0x029E55 0A:9E45: E0        .byte $E0   ; 
- D 0 - I - 0x029E56 0A:9E46: C3        .byte $C3   ; 
- D 0 - I - 0x029E57 0A:9E47: 04        .byte $04   ; 
- D 0 - I - 0x029E58 0A:9E48: F1        .byte $F1   ; 
- D 0 - I - 0x029E59 0A:9E49: C9        .byte $C9   ; 
- D 0 - I - 0x029E5A 0A:9E4A: BB        .byte $BB   ; 
- D 0 - I - 0x029E5B 0A:9E4B: E0        .byte $E0   ; 
- D 0 - I - 0x029E5C 0A:9E4C: C3        .byte $C3   ; 
- D 0 - I - 0x029E5D 0A:9E4D: 00        .byte $00   ; 
- D 0 - I - 0x029E5E 0A:9E4E: F1        .byte $F1   ; 
- D 0 - I - 0x029E5F 0A:9E4F: C9        .byte $C9   ; 
- D 0 - I - 0x029E60 0A:9E50: C1        .byte $C1   ; 
- D 0 - I - 0x029E61 0A:9E51: E0        .byte $E0   ; 
- D 0 - I - 0x029E62 0A:9E52: C3        .byte $C3   ; 
- D 0 - I - 0x029E63 0A:9E53: 08        .byte $08   ; 
- D 0 - I - 0x029E64 0A:9E54: F0        .byte $F0   ; 
- D 0 - I - 0x029E65 0A:9E55: F5        .byte $F5   ; 
- D 0 - I - 0x029E66 0A:9E56: 83        .byte $83   ; 
- D 0 - I - 0x029E67 0A:9E57: F4        .byte $F4   ; 
- D 0 - I - 0x029E68 0A:9E58: 18        .byte $18   ; 
- D 0 - I - 0x029E69 0A:9E59: 19        .byte $19   ; 
- D 0 - I - 0x029E6A 0A:9E5A: 1A        .byte $1A   ; 
- D 0 - I - 0x029E6B 0A:9E5B: 1B        .byte $1B   ; 
- D 0 - I - 0x029E6C 0A:9E5C: F1        .byte $F1   ; 
- D 0 - I - 0x029E6D 0A:9E5D: 13        .byte $13   ; 
- D 0 - I - 0x029E6E 0A:9E5E: 17        .byte $17   ; 
- D 0 - I - 0x029E6F 0A:9E5F: F8        .byte $F8   ; 
- D 0 - I - 0x029E70 0A:9E60: C3        .byte $C3   ; 
- D 0 - I - 0x029E71 0A:9E61: 04        .byte $04   ; 
- D 0 - I - 0x029E72 0A:9E62: F1        .byte $F1   ; 
- D 0 - I - 0x029E73 0A:9E63: CE        .byte $CE   ; 
- D 0 - I - 0x029E74 0A:9E64: 15        .byte $15   ; 
- D 0 - I - 0x029E75 0A:9E65: 80        .byte $80   ; 
- D 0 - I - 0x029E76 0A:9E66: EB        .byte $EB   ; 
- D 0 - I - 0x029E77 0A:9E67: 00        .byte $00   ; 
- D 0 - I - 0x029E78 0A:9E68: F8        .byte $F8   ; 
- D 0 - I - 0x029E79 0A:9E69: A7        .byte $A7   ; 
- D 0 - I - 0x029E7A 0A:9E6A: 8B        .byte $8B   ; 
- D 0 - I - 0x029E7B 0A:9E6B: F5        .byte $F5   ; 
- D 0 - I - 0x029E7C 0A:9E6C: 84        .byte $84   ; 
- D 0 - I - 0x029E7D 0A:9E6D: 34        .byte $34   ; <4>
- D 0 - I - 0x029E7E 0A:9E6E: F4        .byte $F4   ; 
- D 0 - I - 0x029E7F 0A:9E6F: 30        .byte $30   ; <0>
- D 0 - I - 0x029E80 0A:9E70: 31        .byte $31   ; <1>
- D 0 - I - 0x029E81 0A:9E71: 32        .byte $32   ; <2>
- D 0 - I - 0x029E82 0A:9E72: 00        .byte $00   ; 
- D 0 - I - 0x029E83 0A:9E73: F1        .byte $F1   ; 
- D 0 - I - 0x029E84 0A:9E74: CC        .byte $CC   ; 
- D 0 - I - 0x029E85 0A:9E75: A5        .byte $A5   ; 
- D 0 - I - 0x029E86 0A:9E76: F8        .byte $F8   ; 
- D 0 - I - 0x029E87 0A:9E77: D3        .byte $D3   ; 
- D 0 - I - 0x029E88 0A:9E78: 01        .byte $01   ; 
- D 0 - I - 0x029E89 0A:9E79: F0        .byte $F0   ; 
- D 0 - I - 0x029E8A 0A:9E7A: F5        .byte $F5   ; 
- D 0 - I - 0x029E8B 0A:9E7B: 84        .byte $84   ; 
- D 0 - I - 0x029E8C 0A:9E7C: 33        .byte $33   ; <3>
- D 0 - I - 0x029E8D 0A:9E7D: F4        .byte $F4   ; 
- D 0 - I - 0x029E8E 0A:9E7E: 30        .byte $30   ; <0>
- D 0 - I - 0x029E8F 0A:9E7F: 31        .byte $31   ; <1>
- D 0 - I - 0x029E90 0A:9E80: 32        .byte $32   ; <2>
- D 0 - I - 0x029E91 0A:9E81: 00        .byte $00   ; 
- D 0 - I - 0x029E92 0A:9E82: F1        .byte $F1   ; 
- D 0 - I - 0x029E93 0A:9E83: CC        .byte $CC   ; 
- D 0 - I - 0x029E94 0A:9E84: A6        .byte $A6   ; 
- D 0 - I - 0x029E95 0A:9E85: F8        .byte $F8   ; 
- D 0 - I - 0x029E96 0A:9E86: D3        .byte $D3   ; 
- D 0 - I - 0x029E97 0A:9E87: 01        .byte $01   ; 
- D 0 - I - 0x029E98 0A:9E88: F0        .byte $F0   ; 
- D 0 - I - 0x029E99 0A:9E89: F5        .byte $F5   ; 
- D 0 - I - 0x029E9A 0A:9E8A: 0F        .byte $0F   ; 
- D 0 - I - 0x029E9B 0A:9E8B: F4        .byte $F4   ; 
- D 0 - I - 0x029E9C 0A:9E8C: 16        .byte $16   ; 
- D 0 - I - 0x029E9D 0A:9E8D: 17        .byte $17   ; 
- D 0 - I - 0x029E9E 0A:9E8E: 2D        .byte $2D   ; 
- D 0 - I - 0x029E9F 0A:9E8F: 00        .byte $00   ; 
- D 0 - I - 0x029EA0 0A:9E90: F1        .byte $F1   ; 
- D 0 - I - 0x029EA1 0A:9E91: 00        .byte $00   ; 
- D 0 - I - 0x029EA2 0A:9E92: 69        .byte $69   ; <i>
- D 0 - I - 0x029EA3 0A:9E93: 00        .byte $00   ; 
- D 0 - I - 0x029EA4 0A:9E94: C3        .byte $C3   ; 
- D 0 - I - 0x029EA5 0A:9E95: 01        .byte $01   ; 
- D 0 - I - 0x029EA6 0A:9E96: F0        .byte $F0   ; 
- D 0 - I - 0x029EA7 0A:9E97: F5        .byte $F5   ; 
- D 0 - I - 0x029EA8 0A:9E98: 80        .byte $80   ; 
- D 0 - I - 0x029EA9 0A:9E99: F4        .byte $F4   ; 
- D 0 - I - 0x029EAA 0A:9E9A: 16        .byte $16   ; 
- D 0 - I - 0x029EAB 0A:9E9B: 17        .byte $17   ; 
- D 0 - I - 0x029EAC 0A:9E9C: 2D        .byte $2D   ; 
- D 0 - I - 0x029EAD 0A:9E9D: 00        .byte $00   ; 
- D 0 - I - 0x029EAE 0A:9E9E: F1        .byte $F1   ; 
- D 0 - I - 0x029EAF 0A:9E9F: 00        .byte $00   ; 
- D 0 - I - 0x029EB0 0A:9EA0: 7B        .byte $7B   ; 
- D 0 - I - 0x029EB1 0A:9EA1: 00        .byte $00   ; 
- D 0 - I - 0x029EB2 0A:9EA2: C3        .byte $C3   ; 
- D 0 - I - 0x029EB3 0A:9EA3: 01        .byte $01   ; 
- D 0 - I - 0x029EB4 0A:9EA4: F0        .byte $F0   ; 
- D 0 - I - 0x029EB5 0A:9EA5: F5        .byte $F5   ; 
- D 0 - I - 0x029EB6 0A:9EA6: 80        .byte $80   ; 
- D 0 - I - 0x029EB7 0A:9EA7: F4        .byte $F4   ; 
- D 0 - I - 0x029EB8 0A:9EA8: 16        .byte $16   ; 
- D 0 - I - 0x029EB9 0A:9EA9: 17        .byte $17   ; 
- D 0 - I - 0x029EBA 0A:9EAA: 2D        .byte $2D   ; 
- D 0 - I - 0x029EBB 0A:9EAB: 00        .byte $00   ; 
- D 0 - I - 0x029EBC 0A:9EAC: F1        .byte $F1   ; 
- D 0 - I - 0x029EBD 0A:9EAD: 00        .byte $00   ; 
- D 0 - I - 0x029EBE 0A:9EAE: 7C        .byte $7C   ; 
- D 0 - I - 0x029EBF 0A:9EAF: 00        .byte $00   ; 
- D 0 - I - 0x029EC0 0A:9EB0: C3        .byte $C3   ; 
- D 0 - I - 0x029EC1 0A:9EB1: 01        .byte $01   ; 
- D 0 - I - 0x029EC2 0A:9EB2: F0        .byte $F0   ; 
- D 0 - I - 0x029EC3 0A:9EB3: F5        .byte $F5   ; 
- D 0 - I - 0x029EC4 0A:9EB4: 80        .byte $80   ; 
- D 0 - I - 0x029EC5 0A:9EB5: F4        .byte $F4   ; 
- D 0 - I - 0x029EC6 0A:9EB6: 16        .byte $16   ; 
- D 0 - I - 0x029EC7 0A:9EB7: 17        .byte $17   ; 
- D 0 - I - 0x029EC8 0A:9EB8: 2D        .byte $2D   ; 
- D 0 - I - 0x029EC9 0A:9EB9: 00        .byte $00   ; 
- D 0 - I - 0x029ECA 0A:9EBA: F1        .byte $F1   ; 
- D 0 - I - 0x029ECB 0A:9EBB: 00        .byte $00   ; 
- D 0 - I - 0x029ECC 0A:9EBC: 7D        .byte $7D   ; 
- D 0 - I - 0x029ECD 0A:9EBD: 00        .byte $00   ; 
- D 0 - I - 0x029ECE 0A:9EBE: C3        .byte $C3   ; 
- D 0 - I - 0x029ECF 0A:9EBF: 01        .byte $01   ; 
- D 0 - I - 0x029ED0 0A:9EC0: F0        .byte $F0   ; 
- D 0 - I - 0x029ED1 0A:9EC1: F5        .byte $F5   ; 
- D 0 - I - 0x029ED2 0A:9EC2: 83        .byte $83   ; 
- D 0 - I - 0x029ED3 0A:9EC3: F4        .byte $F4   ; 
- D 0 - I - 0x029ED4 0A:9EC4: 04        .byte $04   ; 
- D 0 - I - 0x029ED5 0A:9EC5: 05        .byte $05   ; 
- D 0 - I - 0x029ED6 0A:9EC6: 1E        .byte $1E   ; 
- D 0 - I - 0x029ED7 0A:9EC7: 1F        .byte $1F   ; 
- D 0 - I - 0x029ED8 0A:9EC8: F1        .byte $F1   ; 
- D 0 - I - 0x029ED9 0A:9EC9: 00        .byte $00   ; 
- D 0 - I - 0x029EDA 0A:9ECA: 8C        .byte $8C   ; 
- D 0 - I - 0x029EDB 0A:9ECB: 1C        .byte $1C   ; 
- D 0 - I - 0x029EDC 0A:9ECC: D7        .byte $D7   ; 
- D 0 - I - 0x029EDD 0A:9ECD: 01        .byte $01   ; 
- D 0 - I - 0x029EDE 0A:9ECE: F0        .byte $F0   ; 
- D 0 - I - 0x029EDF 0A:9ECF: F5        .byte $F5   ; 
- D 0 - I - 0x029EE0 0A:9ED0: 80        .byte $80   ; 
- D 0 - I - 0x029EE1 0A:9ED1: F4        .byte $F4   ; 
- D 0 - I - 0x029EE2 0A:9ED2: 10        .byte $10   ; 
- D 0 - I - 0x029EE3 0A:9ED3: 11        .byte $11   ; 
- D 0 - I - 0x029EE4 0A:9ED4: 12        .byte $12   ; 
- D 0 - I - 0x029EE5 0A:9ED5: 13        .byte $13   ; 
- D 0 - I - 0x029EE6 0A:9ED6: F7        .byte $F7   ; 
- D 0 - I - 0x029EE7 0A:9ED7: 23        .byte $23   ; 
- D 0 - I - 0x029EE8 0A:9ED8: 5B        .byte $5B   ; 
- D 0 - I - 0x029EE9 0A:9ED9: F1        .byte $F1   ; 
- D 0 - I - 0x029EEA 0A:9EDA: E0        .byte $E0   ; 
- D 0 - I - 0x029EEB 0A:9EDB: 6B        .byte $6B   ; <k>
- D 0 - I - 0x029EEC 0A:9EDC: 06        .byte $06   ; 
- D 0 - I - 0x029EED 0A:9EDD: B3        .byte $B3   ; 
- D 0 - I - 0x029EEE 0A:9EDE: 0C        .byte $0C   ; 
- D 0 - I - 0x029EEF 0A:9EDF: F1        .byte $F1   ; 
- D 0 - I - 0x029EF0 0A:9EE0: E0        .byte $E0   ; 
- D 0 - I - 0x029EF1 0A:9EE1: C5        .byte $C5   ; 
- D 0 - I - 0x029EF2 0A:9EE2: 06        .byte $06   ; 
- D 0 - I - 0x029EF3 0A:9EE3: B3        .byte $B3   ; 
- D 0 - I - 0x029EF4 0A:9EE4: 08        .byte $08   ; 
- D 0 - I - 0x029EF5 0A:9EE5: F1        .byte $F1   ; 
- D 0 - I - 0x029EF6 0A:9EE6: 00        .byte $00   ; 
- D 0 - I - 0x029EF7 0A:9EE7: 00        .byte $00   ; 
- D 0 - I - 0x029EF8 0A:9EE8: 80        .byte $80   ; 
- D 0 - I - 0x029EF9 0A:9EE9: A3        .byte $A3   ; 
- D 0 - I - 0x029EFA 0A:9EEA: 04        .byte $04   ; 
- D 0 - I - 0x029EFB 0A:9EEB: F1        .byte $F1   ; 
- D 0 - I - 0x029EFC 0A:9EEC: 00        .byte $00   ; 
- D 0 - I - 0x029EFD 0A:9EED: 00        .byte $00   ; 
- D 0 - I - 0x029EFE 0A:9EEE: 80        .byte $80   ; 
- D 0 - I - 0x029EFF 0A:9EEF: DB        .byte $DB   ; 
- D 0 - I - 0x029F00 0A:9EF0: 00        .byte $00   ; 
- D 0 - I - 0x029F01 0A:9EF1: 14        .byte $14   ; 
- D 0 - I - 0x029F02 0A:9EF2: F1        .byte $F1   ; 
- D 0 - I - 0x029F03 0A:9EF3: E1        .byte $E1   ; 
- D 0 - I - 0x029F04 0A:9EF4: C3        .byte $C3   ; 
- D 0 - I - 0x029F05 0A:9EF5: FB        .byte $FB   ; 
- D 0 - I - 0x029F06 0A:9EF6: B3        .byte $B3   ; 
- D 0 - I - 0x029F07 0A:9EF7: 15        .byte $15   ; 
- D 0 - I - 0x029F08 0A:9EF8: F1        .byte $F1   ; 
- D 0 - I - 0x029F09 0A:9EF9: E1        .byte $E1   ; 
- D 0 - I - 0x029F0A 0A:9EFA: C2        .byte $C2   ; 
- D 0 - I - 0x029F0B 0A:9EFB: FB        .byte $FB   ; 
- D 0 - I - 0x029F0C 0A:9EFC: B3        .byte $B3   ; 
- D 0 - I - 0x029F0D 0A:9EFD: 11        .byte $11   ; 
- D 0 - I - 0x029F0E 0A:9EFE: 28        .byte $28   ; 
- D 0 - I - 0x029F0F 0A:9EFF: F7        .byte $F7   ; 
- D 0 - I - 0x029F10 0A:9F00: 03        .byte $03   ; 
- D 0 - I - 0x029F11 0A:9F01: 7B        .byte $7B   ; 
- D 0 - I - 0x029F12 0A:9F02: F6        .byte $F6   ; 
- D 0 - I - 0x029F13 0A:9F03: 54        .byte $54   ; <T>
- D 0 - I - 0x029F14 0A:9F04: F6        .byte $F6   ; 
- D 0 - I - 0x029F15 0A:9F05: 69        .byte $69   ; <i>
- D 0 - I - 0x029F16 0A:9F06: F1        .byte $F1   ; 
- D 0 - I - 0x029F17 0A:9F07: 00        .byte $00   ; 
- D 0 - I - 0x029F18 0A:9F08: C3        .byte $C3   ; 
- D 0 - I - 0x029F19 0A:9F09: 38        .byte $38   ; <8>
- D 0 - I - 0x029F1A 0A:9F0A: B3        .byte $B3   ; 
- D 0 - I - 0x029F1B 0A:9F0B: 0D        .byte $0D   ; 
- D 0 - I - 0x029F1C 0A:9F0C: F1        .byte $F1   ; 
- D 0 - I - 0x029F1D 0A:9F0D: 00        .byte $00   ; 
- D 0 - I - 0x029F1E 0A:9F0E: C2        .byte $C2   ; 
- D 0 - I - 0x029F1F 0A:9F0F: 38        .byte $38   ; <8>
- D 0 - I - 0x029F20 0A:9F10: B3        .byte $B3   ; 
- D 0 - I - 0x029F21 0A:9F11: 09        .byte $09   ; 
- D 0 - I - 0x029F22 0A:9F12: F1        .byte $F1   ; 
- D 0 - I - 0x029F23 0A:9F13: 00        .byte $00   ; 
- D 0 - I - 0x029F24 0A:9F14: 6B        .byte $6B   ; <k>
- D 0 - I - 0x029F25 0A:9F15: C8        .byte $C8   ; 
- D 0 - I - 0x029F26 0A:9F16: B3        .byte $B3   ; 
- D 0 - I - 0x029F27 0A:9F17: 04        .byte $04   ; 
- D 0 - I - 0x029F28 0A:9F18: F1        .byte $F1   ; 
- D 0 - I - 0x029F29 0A:9F19: 00        .byte $00   ; 
- D 0 - I - 0x029F2A 0A:9F1A: 6A        .byte $6A   ; <j>
- D 0 - I - 0x029F2B 0A:9F1B: C8        .byte $C8   ; 
- D 0 - I - 0x029F2C 0A:9F1C: B3        .byte $B3   ; 
- D 0 - I - 0x029F2D 0A:9F1D: 00        .byte $00   ; 
- D 0 - I - 0x029F2E 0A:9F1E: F0        .byte $F0   ; 
- D 0 - I - 0x029F2F 0A:9F1F: F5        .byte $F5   ; 
- D 0 - I - 0x029F30 0A:9F20: 80        .byte $80   ; 
- D 0 - I - 0x029F31 0A:9F21: F4        .byte $F4   ; 
- D 0 - I - 0x029F32 0A:9F22: 04        .byte $04   ; 
- D 0 - I - 0x029F33 0A:9F23: 05        .byte $05   ; 
- D 0 - I - 0x029F34 0A:9F24: 20        .byte $20   ; 
- D 0 - I - 0x029F35 0A:9F25: 21        .byte $21   ; 
- D 0 - I - 0x029F36 0A:9F26: F7        .byte $F7   ; 
- D 0 - I - 0x029F37 0A:9F27: 03        .byte $03   ; 
- D 0 - I - 0x029F38 0A:9F28: 7B        .byte $7B   ; 
- D 0 - I - 0x029F39 0A:9F29: F1        .byte $F1   ; 
- D 0 - I - 0x029F3A 0A:9F2A: 00        .byte $00   ; 
- D 0 - I - 0x029F3B 0A:9F2B: 54        .byte $54   ; <T>
- D 0 - I - 0x029F3C 0A:9F2C: 10        .byte $10   ; 
- D 0 - I - 0x029F3D 0A:9F2D: BB        .byte $BB   ; 
- D 0 - I - 0x029F3E 0A:9F2E: 09        .byte $09   ; 
- D 0 - I - 0x029F3F 0A:9F2F: F1        .byte $F1   ; 
- D 0 - I - 0x029F40 0A:9F30: 00        .byte $00   ; 
- D 0 - I - 0x029F41 0A:9F31: 71        .byte $71   ; <q>
- D 0 - I - 0x029F42 0A:9F32: 00        .byte $00   ; 
- D 0 - I - 0x029F43 0A:9F33: CB        .byte $CB   ; 
- D 0 - I - 0x029F44 0A:9F34: 05        .byte $05   ; 
- D 0 - I - 0x029F45 0A:9F35: F1        .byte $F1   ; 
- D 0 - I - 0x029F46 0A:9F36: 00        .byte $00   ; 
- D 0 - I - 0x029F47 0A:9F37: 00        .byte $00   ; 
- D 0 - I - 0x029F48 0A:9F38: 80        .byte $80   ; 
- D 0 - I - 0x029F49 0A:9F39: FB        .byte $FB   ; 
- D 0 - I - 0x029F4A 0A:9F3A: 00        .byte $00   ; 
- D 0 - I - 0x029F4B 0A:9F3B: F0        .byte $F0   ; 
- D 0 - I - 0x029F4C 0A:9F3C: F5        .byte $F5   ; 
- D 0 - I - 0x029F4D 0A:9F3D: 80        .byte $80   ; 
- D 0 - I - 0x029F4E 0A:9F3E: F4        .byte $F4   ; 
- D 0 - I - 0x029F4F 0A:9F3F: 08        .byte $08   ; 
- D 0 - I - 0x029F50 0A:9F40: 09        .byte $09   ; 
- D 0 - I - 0x029F51 0A:9F41: 0A        .byte $0A   ; 
- D 0 - I - 0x029F52 0A:9F42: 0B        .byte $0B   ; 
- D 0 - I - 0x029F53 0A:9F43: F1        .byte $F1   ; 
- D 0 - I - 0x029F54 0A:9F44: CF        .byte $CF   ; 
- D 0 - I - 0x029F55 0A:9F45: 4D        .byte $4D   ; <M>
- D 0 - I - 0x029F56 0A:9F46: 00        .byte $00   ; 
- D 0 - I - 0x029F57 0A:9F47: C3        .byte $C3   ; 
- D 0 - I - 0x029F58 0A:9F48: 05        .byte $05   ; 
- D 0 - I - 0x029F59 0A:9F49: F1        .byte $F1   ; 
- D 0 - I - 0x029F5A 0A:9F4A: CF        .byte $CF   ; 
- D 0 - I - 0x029F5B 0A:9F4B: 4B        .byte $4B   ; <K>
- D 0 - I - 0x029F5C 0A:9F4C: 00        .byte $00   ; 
- D 0 - I - 0x029F5D 0A:9F4D: C3        .byte $C3   ; 
- D 0 - I - 0x029F5E 0A:9F4E: 01        .byte $01   ; 
- D 0 - I - 0x029F5F 0A:9F4F: F1        .byte $F1   ; 
- D 0 - I - 0x029F60 0A:9F50: CF        .byte $CF   ; 
- D 0 - I - 0x029F61 0A:9F51: 58        .byte $58   ; <X>
- D 0 - I - 0x029F62 0A:9F52: 00        .byte $00   ; 
- D 0 - I - 0x029F63 0A:9F53: C3        .byte $C3   ; 
- D 0 - I - 0x029F64 0A:9F54: 09        .byte $09   ; 
- D 0 - I - 0x029F65 0A:9F55: F0        .byte $F0   ; 
- D 0 - I - 0x029F66 0A:9F56: F5        .byte $F5   ; 
- D 0 - I - 0x029F67 0A:9F57: 09        .byte $09   ; 
- D 0 - I - 0x029F68 0A:9F58: F4        .byte $F4   ; 
- D 0 - I - 0x029F69 0A:9F59: 60        .byte $60   ; 
- D 0 - I - 0x029F6A 0A:9F5A: 61        .byte $61   ; <a>
- D 0 - I - 0x029F6B 0A:9F5B: 62        .byte $62   ; <b>
- D 0 - I - 0x029F6C 0A:9F5C: 63        .byte $63   ; <c>
- D 0 - I - 0x029F6D 0A:9F5D: F1        .byte $F1   ; 
- D 0 - I - 0x029F6E 0A:9F5E: 0F        .byte $0F   ; 
- D 0 - I - 0x029F6F 0A:9F5F: 79        .byte $79   ; <y>
- D 0 - I - 0x029F70 0A:9F60: F0        .byte $F0   ; 
- D 0 - I - 0x029F71 0A:9F61: BB        .byte $BB   ; 
- D 0 - I - 0x029F72 0A:9F62: 01        .byte $01   ; 
- D 0 - I - 0x029F73 0A:9F63: EF        .byte $EF   ; 
- D 0 - I - 0x029F74 0A:9F64: EF        .byte $EF   ; 
- D 0 - I - 0x029F75 0A:9F65: 20        .byte $20   ; 
- D 0 - I - 0x029F76 0A:9F66: F1        .byte $F1   ; 
- D 0 - I - 0x029F77 0A:9F67: 00        .byte $00   ; 
- D 0 - I - 0x029F78 0A:9F68: 82        .byte $82   ; 
- D 0 - I - 0x029F79 0A:9F69: F0        .byte $F0   ; 
- D 0 - I - 0x029F7A 0A:9F6A: BB        .byte $BB   ; 
- D 0 - I - 0x029F7B 0A:9F6B: 00        .byte $00   ; 
- D 0 - I - 0x029F7C 0A:9F6C: F0        .byte $F0   ; 
- D 0 - I - 0x029F7D 0A:9F6D: F5        .byte $F5   ; 
- D 0 - I - 0x029F7E 0A:9F6E: 18        .byte $18   ; 
- D 0 - I - 0x029F7F 0A:9F6F: F4        .byte $F4   ; 
- D 0 - I - 0x029F80 0A:9F70: 08        .byte $08   ; 
- D 0 - I - 0x029F81 0A:9F71: 09        .byte $09   ; 
- D 0 - I - 0x029F82 0A:9F72: 0A        .byte $0A   ; 
- D 0 - I - 0x029F83 0A:9F73: 0B        .byte $0B   ; 
- D 0 - I - 0x029F84 0A:9F74: F1        .byte $F1   ; 
- D 0 - I - 0x029F85 0A:9F75: AC        .byte $AC   ; 
- D 0 - I - 0x029F86 0A:9F76: 49        .byte $49   ; <I>
- D 0 - I - 0x029F87 0A:9F77: 9C        .byte $9C   ; 
- D 0 - I - 0x029F88 0A:9F78: 63        .byte $63   ; <c>
- D 0 - I - 0x029F89 0A:9F79: 00        .byte $00   ; 
- D 0 - I - 0x029F8A 0A:9F7A: F1        .byte $F1   ; 
- D 0 - I - 0x029F8B 0A:9F7B: 67        .byte $67   ; <g>
- D 0 - I - 0x029F8C 0A:9F7C: D4        .byte $D4   ; 
- D 0 - I - 0x029F8D 0A:9F7D: F0        .byte $F0   ; 
- D 0 - I - 0x029F8E 0A:9F7E: B3        .byte $B3   ; 
- D 0 - I - 0x029F8F 0A:9F7F: 04        .byte $04   ; 
- D 0 - I - 0x029F90 0A:9F80: F1        .byte $F1   ; 
- D 0 - I - 0x029F91 0A:9F81: 67        .byte $67   ; <g>
- D 0 - I - 0x029F92 0A:9F82: 95        .byte $95   ; 
- D 0 - I - 0x029F93 0A:9F83: F0        .byte $F0   ; 
- D 0 - I - 0x029F94 0A:9F84: B3        .byte $B3   ; 
- D 0 - I - 0x029F95 0A:9F85: 08        .byte $08   ; 
- D 0 - I - 0x029F96 0A:9F86: F1        .byte $F1   ; 
- D 0 - I - 0x029F97 0A:9F87: 67        .byte $67   ; <g>
- D 0 - I - 0x029F98 0A:9F88: 96        .byte $96   ; 
- D 0 - I - 0x029F99 0A:9F89: F0        .byte $F0   ; 
- D 0 - I - 0x029F9A 0A:9F8A: B3        .byte $B3   ; 
- D 0 - I - 0x029F9B 0A:9F8B: 0C        .byte $0C   ; 
- D 0 - I - 0x029F9C 0A:9F8C: 16        .byte $16   ; 
- D 0 - I - 0x029F9D 0A:9F8D: F4        .byte $F4   ; 
- D 0 - I - 0x029F9E 0A:9F8E: 0A        .byte $0A   ; 
- D 0 - I - 0x029F9F 0A:9F8F: 0B        .byte $0B   ; 
- D 0 - I - 0x029FA0 0A:9F90: 00        .byte $00   ; 
- D 0 - I - 0x029FA1 0A:9F91: 00        .byte $00   ; 
- D 0 - I - 0x029FA2 0A:9F92: F6        .byte $F6   ; 
- D 0 - I - 0x029FA3 0A:9F93: 00        .byte $00   ; 
- D 0 - I - 0x029FA4 0A:9F94: F6        .byte $F6   ; 
- D 0 - I - 0x029FA5 0A:9F95: 2A        .byte $2A   ; 
- D 0 - I - 0x029FA6 0A:9F96: F6        .byte $F6   ; 
- D 0 - I - 0x029FA7 0A:9F97: 3F        .byte $3F   ; 
- D 0 - I - 0x029FA8 0A:9F98: F1        .byte $F1   ; 
- D 0 - I - 0x029FA9 0A:9F99: 00        .byte $00   ; 
- D 0 - I - 0x029FAA 0A:9F9A: DB        .byte $DB   ; 
- D 0 - I - 0x029FAB 0A:9F9B: 20        .byte $20   ; 
- D 0 - I - 0x029FAC 0A:9F9C: BB        .byte $BB   ; 
- D 0 - I - 0x029FAD 0A:9F9D: 05        .byte $05   ; 
- D 0 - I - 0x029FAE 0A:9F9E: 04        .byte $04   ; 
- D 0 - I - 0x029FAF 0A:9F9F: F1        .byte $F1   ; 
- D 0 - I - 0x029FB0 0A:9FA0: 68        .byte $68   ; <h>
- D 0 - I - 0x029FB1 0A:9FA1: E1        .byte $E1   ; 
- D 0 - I - 0x029FB2 0A:9FA2: 20        .byte $20   ; 
- D 0 - I - 0x029FB3 0A:9FA3: BB        .byte $BB   ; 
- D 0 - I - 0x029FB4 0A:9FA4: 05        .byte $05   ; 
- D 0 - I - 0x029FB5 0A:9FA5: F8        .byte $F8   ; 
- D 0 - I - 0x029FB6 0A:9FA6: 0C        .byte $0C   ; 
- D 0 - I - 0x029FB7 0A:9FA7: 99        .byte $99   ; 
- D 0 - I - 0x029FB8 0A:9FA8: F5        .byte $F5   ; 
- D 0 - I - 0x029FB9 0A:9FA9: 14        .byte $14   ; 
- D 0 - I - 0x029FBA 0A:9FAA: F4        .byte $F4   ; 
- D 0 - I - 0x029FBB 0A:9FAB: 74        .byte $74   ; <t>
- D 0 - I - 0x029FBC 0A:9FAC: 75        .byte $75   ; <u>
- D 0 - I - 0x029FBD 0A:9FAD: 7B        .byte $7B   ; 
- D 0 - I - 0x029FBE 0A:9FAE: 67        .byte $67   ; <g>
- D 0 - I - 0x029FBF 0A:9FAF: F1        .byte $F1   ; 
- D 0 - I - 0x029FC0 0A:9FB0: 00        .byte $00   ; 
- D 0 - I - 0x029FC1 0A:9FB1: 81        .byte $81   ; 
- D 0 - I - 0x029FC2 0A:9FB2: 00        .byte $00   ; 
- D 0 - I - 0x029FC3 0A:9FB3: D3        .byte $D3   ; 
- D 0 - I - 0x029FC4 0A:9FB4: 01        .byte $01   ; 
- D 0 - I - 0x029FC5 0A:9FB5: EF        .byte $EF   ; 
- D 0 - I - 0x029FC6 0A:9FB6: F5        .byte $F5   ; 
- D 0 - I - 0x029FC7 0A:9FB7: 0C        .byte $0C   ; 
- D 0 - I - 0x029FC8 0A:9FB8: F4        .byte $F4   ; 
- D 0 - I - 0x029FC9 0A:9FB9: 6C        .byte $6C   ; <l>
- D 0 - I - 0x029FCA 0A:9FBA: 6D        .byte $6D   ; <m>
- D 0 - I - 0x029FCB 0A:9FBB: 6E        .byte $6E   ; <n>
- D 0 - I - 0x029FCC 0A:9FBC: 6F        .byte $6F   ; <o>
- D 0 - I - 0x029FCD 0A:9FBD: F1        .byte $F1   ; 
- D 0 - I - 0x029FCE 0A:9FBE: D5        .byte $D5   ; 
- D 0 - I - 0x029FCF 0A:9FBF: 78        .byte $78   ; <x>
- D 0 - I - 0x029FD0 0A:9FC0: F8        .byte $F8   ; 
- D 0 - I - 0x029FD1 0A:9FC1: D3        .byte $D3   ; 
- D 0 - I - 0x029FD2 0A:9FC2: 00        .byte $00   ; 
- D 0 - I - 0x029FD3 0A:9FC3: F0        .byte $F0   ; 
- D 0 - I - 0x029FD4 0A:9FC4: F5        .byte $F5   ; 
- D 0 - I - 0x029FD5 0A:9FC5: 0E        .byte $0E   ; 
- D 0 - I - 0x029FD6 0A:9FC6: F8        .byte $F8   ; 
- D 0 - I - 0x029FD7 0A:9FC7: 3A        .byte $3A   ; 
- D 0 - I - 0x029FD8 0A:9FC8: 9C        .byte $9C   ; 
- D 0 - I - 0x029FD9 0A:9FC9: F5        .byte $F5   ; 
- D 0 - I - 0x029FDA 0A:9FCA: 80        .byte $80   ; 
- D 0 - I - 0x029FDB 0A:9FCB: F4        .byte $F4   ; 
- D 0 - I - 0x029FDC 0A:9FCC: 08        .byte $08   ; 
- D 0 - I - 0x029FDD 0A:9FCD: 09        .byte $09   ; 
- D 0 - I - 0x029FDE 0A:9FCE: 0A        .byte $0A   ; 
- D 0 - I - 0x029FDF 0A:9FCF: 0B        .byte $0B   ; 
- D 0 - I - 0x029FE0 0A:9FD0: F1        .byte $F1   ; 
- D 0 - I - 0x029FE1 0A:9FD1: DC        .byte $DC   ; 
- D 0 - I - 0x029FE2 0A:9FD2: 4D        .byte $4D   ; <M>
- D 0 - I - 0x029FE3 0A:9FD3: 60        .byte $60   ; 
- D 0 - I - 0x029FE4 0A:9FD4: B3        .byte $B3   ; 
- D 0 - I - 0x029FE5 0A:9FD5: 05        .byte $05   ; 
- D 0 - I - 0x029FE6 0A:9FD6: F1        .byte $F1   ; 
- D 0 - I - 0x029FE7 0A:9FD7: DC        .byte $DC   ; 
- D 0 - I - 0x029FE8 0A:9FD8: 4B        .byte $4B   ; <K>
- D 0 - I - 0x029FE9 0A:9FD9: 60        .byte $60   ; 
- D 0 - I - 0x029FEA 0A:9FDA: B3        .byte $B3   ; 
- D 0 - I - 0x029FEB 0A:9FDB: 01        .byte $01   ; 
- D 0 - I - 0x029FEC 0A:9FDC: F1        .byte $F1   ; 
- D 0 - I - 0x029FED 0A:9FDD: DC        .byte $DC   ; 
- D 0 - I - 0x029FEE 0A:9FDE: 58        .byte $58   ; <X>
- D 0 - I - 0x029FEF 0A:9FDF: 60        .byte $60   ; 
- D 0 - I - 0x029FF0 0A:9FE0: B3        .byte $B3   ; 
- D 0 - I - 0x029FF1 0A:9FE1: 09        .byte $09   ; 
- D 0 - I - 0x029FF2 0A:9FE2: 1E        .byte $1E   ; 
- D 0 - I - 0x029FF3 0A:9FE3: F1        .byte $F1   ; 
- D 0 - I - 0x029FF4 0A:9FE4: DD        .byte $DD   ; 
- D 0 - I - 0x029FF5 0A:9FE5: 4F        .byte $4F   ; <O>
- D 0 - I - 0x029FF6 0A:9FE6: 20        .byte $20   ; 
- D 0 - I - 0x029FF7 0A:9FE7: C3        .byte $C3   ; 
- D 0 - I - 0x029FF8 0A:9FE8: 09        .byte $09   ; 
- D 0 - I - 0x029FF9 0A:9FE9: F1        .byte $F1   ; 
- D 0 - I - 0x029FFA 0A:9FEA: DD        .byte $DD   ; 
- D 0 - I - 0x029FFB 0A:9FEB: 4D        .byte $4D   ; <M>
- D 0 - I - 0x029FFC 0A:9FEC: 20        .byte $20   ; 
- D 0 - I - 0x029FFD 0A:9FED: C3        .byte $C3   ; 
- D 0 - I - 0x029FFE 0A:9FEE: 05        .byte $05   ; 
- D 0 - I - 0x029FFF 0A:9FEF: F1        .byte $F1   ; 
- D 0 - I - 0x02A000 0A:9FF0: DD        .byte $DD   ; 
- D 0 - I - 0x02A001 0A:9FF1: 4B        .byte $4B   ; <K>
- D 0 - I - 0x02A002 0A:9FF2: 20        .byte $20   ; 
- D 0 - I - 0x02A003 0A:9FF3: C3        .byte $C3   ; 
- D 0 - I - 0x02A004 0A:9FF4: 01        .byte $01   ; 
- D 0 - I - 0x02A005 0A:9FF5: F1        .byte $F1   ; 
- D 0 - I - 0x02A006 0A:9FF6: D7        .byte $D7   ; 
- D 0 - I - 0x02A007 0A:9FF7: 49        .byte $49   ; <I>
- D 0 - I - 0x02A008 0A:9FF8: 08        .byte $08   ; 
- D 0 - I - 0x02A009 0A:9FF9: EB        .byte $EB   ; 
- D 0 - I - 0x02A00A 0A:9FFA: 0D        .byte $0D   ; 
- D 0 - I - 0x02A00B 0A:9FFB: F9        .byte $F9   ; 
- D 0 - I - 0x02A00C 0A:9FFC: 0F        .byte $0F   ; 
- D 0 - I - 0x02A00D 0A:9FFD: 01        .byte $01   ; 
- D 0 - I - 0x02A00E 0A:9FFE: FB        .byte $FB   ; 
- D 0 - I - 0x02A00F 0A:9FFF: 01        .byte $01   ; 



