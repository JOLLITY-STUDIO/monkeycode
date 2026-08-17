; bank_20.asm 分片 1/8 (原文件行 1-1000, 共 7234 行)

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
C D 0 - - - 0x028347 0A:8337: AE 2A 00  LDX a: ram_002A
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