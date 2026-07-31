.segment "???"
.include "bank_ram.inc"
; 0x038010-0x03A00F

- - - - - - 0x038010 0E:8000: 4C        .byte $4C   ; <L>
- - - - - - 0x038011 0E:8001: 2D        .byte $2D   ; 
C - - - - - 0x038012 0E:8002: 80        UNDEFINED
C - - - - - 0x038013 0E:8003: 4C 22 8B  JMP $8B22
C - - J - - 0x038016 0E:8006: 4C 09 86  JMP $8609
C - - - - - 0x038019 0E:8009: 4C 06 8C  JMP $8C06
C - - - - - 0x03801C 0E:800C: 4C 58 8D  JMP $8D58
- - - - - - 0x03801F 0E:800F: 4C        .byte $4C   ; <L>
- - - - - - 0x038020 0E:8010: A6        .byte $A6   ; 
- - - - - - 0x038021 0E:8011: 8D        .byte $8D   ; 
C - - J - - 0x038022 0E:8012: 4C 9D 81  JMP $819D
C - - J - - 0x038025 0E:8015: 4C 24 82  JMP $8224
C - - J - - 0x038028 0E:8018: 4C 8F 82  JMP $828F
C - - J - - 0x03802B 0E:801B: 4C 2E 85  JMP $852E
C - - J - - 0x03802E 0E:801E: 4C 6A 84  JMP $846A
- - - - - - 0x038031 0E:8021: 4C        .byte $4C   ; <L>
- - - - - - 0x038032 0E:8022: 21        .byte $21   ; 
- - - - - - 0x038033 0E:8023: 80        .byte $80   ; 
C - - - - - 0x038034 0E:8024: 4C CA 82  JMP $82CA
C - - J - - 0x038037 0E:8027: 4C FF 84  JMP $84FF
C - - J - - 0x03803A 0E:802A: 4C C1 84  JMP $84C1
C D 0 - - - 0x03803D 0E:802D: 20 3A 80  JSR $803A
C - - - - - 0x038040 0E:8030: B9 4E 9E  LDA $9E4E,Y
C - - - - - 0x038043 0E:8033: 85 32     STA ram_0032
C - - - - - 0x038045 0E:8035: A9 00     LDA #$00
C - - - - - 0x038047 0E:8037: 85 33     STA ram_0033
C - - - - - 0x038049 0E:8039: 60        RTS
C - - - - - 0x03804A 0E:803A: 48        PHA
C - - - - - 0x03804B 0E:803B: 20 0C C5  JSR $C50C
C - - - - - 0x03804E 0E:803E: A0 00     LDY #$00
C - - - - - 0x038050 0E:8040: B1 34     LDA (ram_0034),Y
C - - - - - 0x038052 0E:8042: D0 0C     BNE $8050
C - - - - - 0x038054 0E:8044: 68        PLA
C - - - - - 0x038055 0E:8045: 48        PHA
C - - - - - 0x038056 0E:8046: 38        SEC
C - - - - - 0x038057 0E:8047: E9 0B     SBC #$0B
C - - - - - 0x038059 0E:8049: A8        TAY
C - - - - - 0x03805A 0E:804A: B9 8E 81  LDA $818E,Y
C - - - - - 0x03805D 0E:804D: A8        TAY
C - - - - - 0x03805E 0E:804E: B1 38     LDA (ram_0038),Y
C - - - - - 0x038060 0E:8050: C9 23     CMP #$23
C - - - - - 0x038062 0E:8052: 08        PHP
C - - - - - 0x038063 0E:8053: 90 0F     BCC $8064
C - - - - - 0x038065 0E:8055: 48        PHA
C - - - - - 0x038066 0E:8056: A0 01     LDY #$01
C - - - - - 0x038068 0E:8058: B1 34     LDA (ram_0034),Y
C - - - - - 0x03806A 0E:805A: 10 05     BPL $8061
C - - - - - 0x03806C 0E:805C: 68        PLA
C - - - - - 0x03806D 0E:805D: C8        INY
C - - - - - 0x03806E 0E:805E: B1 34     LDA (ram_0034),Y
C - - - - - 0x038070 0E:8060: 48        PHA
C - - - - - 0x038071 0E:8061: 68        PLA
C - - - - - 0x038072 0E:8062: E9 23     SBC #$23
C - - - - - 0x038074 0E:8064: A0 00     LDY #$00
C - - - - - 0x038076 0E:8066: 84 33     STY ram_0033
C - - - - - 0x038078 0E:8068: 0A        ASL
C - - - - - 0x038079 0E:8069: 26 33     ROL ram_0033
C - - - - - 0x03807B 0E:806B: 0A        ASL
C - - - - - 0x03807C 0E:806C: 26 33     ROL ram_0033
C - - - - - 0x03807E 0E:806E: 85 32     STA ram_0032
C - - - - - 0x038080 0E:8070: 28        PLP
C - - - - - 0x038081 0E:8071: 90 10     BCC $8083
C - - - - - 0x038083 0E:8073: A4 33     LDY ram_0033
C - - - - - 0x038085 0E:8075: 0A        ASL
C - - - - - 0x038086 0E:8076: 26 33     ROL ram_0033
C - - - - - 0x038088 0E:8078: 65 32     ADC ram_0032
C - - - - - 0x03808A 0E:807A: 85 32     STA ram_0032
C - - - - - 0x03808C 0E:807C: 98        TYA
C - - - - - 0x03808D 0E:807D: 65 33     ADC ram_0033
C - - - - - 0x03808F 0E:807F: 85 33     STA ram_0033
C - - - - - 0x038091 0E:8081: A0 02     LDY #$02
C - - - - - 0x038093 0E:8083: 18        CLC
C - - - - - 0x038094 0E:8084: A5 32     LDA ram_0032
C - - - - - 0x038096 0E:8086: 79 99 81  ADC $8199,Y
C - - - - - 0x038099 0E:8089: 85 32     STA ram_0032
C - - - - - 0x03809B 0E:808B: A5 33     LDA ram_0033
C - - - - - 0x03809D 0E:808D: 79 9A 81  ADC $819A,Y
C - - - - - 0x0380A0 0E:8090: 85 33     STA ram_0033
C - - - - - 0x0380A2 0E:8092: 68        PLA
C - - - - - 0x0380A3 0E:8093: E0 1F     CPX #$1F
C - - - - - 0x0380A5 0E:8095: 90 03     BCC $809A
C - - - - - 0x0380A7 0E:8097: 4C 3F 81  JMP $813F
C - - - - - 0x0380AA 0E:809A: 48        PHA
C - - - - - 0x0380AB 0E:809B: 68        PLA
C - - - - - 0x0380AC 0E:809C: F0 0A     BEQ $80A8
C - - - - - 0x0380AE 0E:809E: C9 0B     CMP #$0B
C - - - - - 0x0380B0 0E:80A0: F0 06     BEQ $80A8
C - - - - - 0x0380B2 0E:80A2: C9 1E     CMP #$1E
C - - - - - 0x0380B4 0E:80A4: F0 02     BEQ $80A8
C - - - - - 0x0380B6 0E:80A6: C9 1F     CMP #$1F
C - - - - - 0x0380B8 0E:80A8: 08        PHP
C - - - - - 0x0380B9 0E:80A9: A0 00     LDY #$00
C - - - - - 0x0380BB 0E:80AB: B1 32     LDA (ram_0032),Y
C - - - - - 0x0380BD 0E:80AD: 84 33     STY ram_0033
C - - - - - 0x0380BF 0E:80AF: 28        PLP
C - - - - - 0x0380C0 0E:80B0: D0 1F     BNE $80D1
C - - - - - 0x0380C2 0E:80B2: 0A        ASL
C - - - - - 0x0380C3 0E:80B3: 26 33     ROL ram_0033
C - - - - - 0x0380C5 0E:80B5: 0A        ASL
C - - - - - 0x0380C6 0E:80B6: 26 33     ROL ram_0033
C - - - - - 0x0380C8 0E:80B8: 0A        ASL
C - - - - - 0x0380C9 0E:80B9: 26 33     ROL ram_0033
C - - - - - 0x0380CB 0E:80BB: 69 86     ADC #$86
C - - - - - 0x0380CD 0E:80BD: 85 32     STA ram_0032
C - - - - - 0x0380CF 0E:80BF: A5 33     LDA ram_0033
C - - - - - 0x0380D1 0E:80C1: 69 AE     ADC #$AE
C - - - - - 0x0380D3 0E:80C3: 85 33     STA ram_0033
C - - - - - 0x0380D5 0E:80C5: 8A        TXA
C - - - - - 0x0380D6 0E:80C6: F0 03     BEQ $80CB
C - - - - - 0x0380D8 0E:80C8: 38        SEC
C - - - - - 0x0380D9 0E:80C9: E9 17     SBC #$17
C - - - - - 0x0380DB 0E:80CB: A8        TAY
C - - - - - 0x0380DC 0E:80CC: B1 32     LDA (ram_0032),Y
C - - - - - 0x0380DE 0E:80CE: 4C F9 80  JMP $80F9
C - - - - - 0x0380E1 0E:80D1: 0A        ASL
C - - - - - 0x0380E2 0E:80D2: 26 33     ROL ram_0033
C - - - - - 0x0380E4 0E:80D4: 0A        ASL
C - - - - - 0x0380E5 0E:80D5: 26 33     ROL ram_0033
C - - - - - 0x0380E7 0E:80D7: 0A        ASL
C - - - - - 0x0380E8 0E:80D8: 26 33     ROL ram_0033
C - - - - - 0x0380EA 0E:80DA: A4 33     LDY ram_0033
C - - - - - 0x0380EC 0E:80DC: 85 32     STA ram_0032
C - - - - - 0x0380EE 0E:80DE: 0A        ASL
C - - - - - 0x0380EF 0E:80DF: 26 33     ROL ram_0033
C - - - - - 0x0380F1 0E:80E1: 65 32     ADC ram_0032
C - - - - - 0x0380F3 0E:80E3: 85 32     STA ram_0032
C - - - - - 0x0380F5 0E:80E5: 98        TYA
C - - - - - 0x0380F6 0E:80E6: 65 33     ADC ram_0033
C - - - - - 0x0380F8 0E:80E8: 85 33     STA ram_0033
C - - - - - 0x0380FA 0E:80EA: 18        CLC
C - - - - - 0x0380FB 0E:80EB: A5 32     LDA ram_0032
C - - - - - 0x0380FD 0E:80ED: 69 CE     ADC #$CE
C - - - - - 0x0380FF 0E:80EF: 85 32     STA ram_0032
C - - - - - 0x038101 0E:80F1: A5 33     LDA ram_0033
C - - - - - 0x038103 0E:80F3: 69 9F     ADC #$9F
C - - - - - 0x038105 0E:80F5: 85 33     STA ram_0033
C - - - - - 0x038107 0E:80F7: 8A        TXA
C - - - - - 0x038108 0E:80F8: A8        TAY
C D 0 - - - 0x038109 0E:80F9: 8A        TXA
C - - - - - 0x03810A 0E:80FA: F0 17     BEQ $8113
C - - - - - 0x03810C 0E:80FC: B1 32     LDA (ram_0032),Y
C - - - - - 0x03810E 0E:80FE: 48        PHA
C - - - - - 0x03810F 0E:80FF: A0 03     LDY #$03
C - - - - - 0x038111 0E:8101: B1 34     LDA (ram_0034),Y
C - - - - - 0x038113 0E:8103: 0A        ASL
C - - - - - 0x038114 0E:8104: 85 32     STA ram_0032
C - - - - - 0x038116 0E:8106: 68        PLA
C - - - - - 0x038117 0E:8107: 65 32     ADC ram_0032
C - - - - - 0x038119 0E:8109: A8        TAY
C - - - - - 0x03811A 0E:810A: C0 C0     CPY #$C0
C - - - - - 0x03811C 0E:810C: 90 02     BCC $8110
- - - - - - 0x03811E 0E:810E: A0        .byte $A0   ; 
- - - - - - 0x03811F 0E:810F: BF        .byte $BF   ; 
C - - - - - 0x038120 0E:8110: 84 32     STY ram_0032
C - - - - - 0x038122 0E:8112: 60        RTS
C - - - - - 0x038123 0E:8113: B1 32     LDA (ram_0032),Y
C - - - - - 0x038125 0E:8115: 48        PHA
C - - - - - 0x038126 0E:8116: A0 03     LDY #$03
C - - - - - 0x038128 0E:8118: B1 34     LDA (ram_0034),Y
C - - - - - 0x03812A 0E:811A: 85 32     STA ram_0032
C - - - - - 0x03812C 0E:811C: 68        PLA
C - - - - - 0x03812D 0E:811D: 65 32     ADC ram_0032
C - - - - - 0x03812F 0E:811F: C9 5F     CMP #$5F
C - - - - - 0x038131 0E:8121: 90 02     BCC $8125
C - - - - - 0x038133 0E:8123: A9 5F     LDA #$5F
C - - - - - 0x038135 0E:8125: A0 9F     LDY #$9F
C - - - - - 0x038137 0E:8127: 0A        ASL
C - - - - - 0x038138 0E:8128: 90 01     BCC $812B
- - - - - - 0x03813A 0E:812A: C8        .byte $C8   ; 
C - - - - - 0x03813B 0E:812B: 84 33     STY ram_0033
C - - - - - 0x03813D 0E:812D: A0 0E     LDY #$0E
C - - - - - 0x03813F 0E:812F: 84 32     STY ram_0032
C - - - - - 0x038141 0E:8131: A8        TAY
C - - - - - 0x038142 0E:8132: B1 32     LDA (ram_0032),Y
C - - - - - 0x038144 0E:8134: AA        TAX
C - - - - - 0x038145 0E:8135: C8        INY
C - - - - - 0x038146 0E:8136: B1 32     LDA (ram_0032),Y
C - - - - - 0x038148 0E:8138: 85 33     STA ram_0033
C - - - - - 0x03814A 0E:813A: 86 32     STX ram_0032
C - - - - - 0x03814C 0E:813C: 4C 8B 81  JMP $818B
C D 0 - - - 0x03814F 0E:813F: E0 25     CPX #$25
C - - - - - 0x038151 0E:8141: B0 3B     BCS $817E
C - - - - - 0x038153 0E:8143: A0 01     LDY #$01
C - - - - - 0x038155 0E:8145: B1 32     LDA (ram_0032),Y
C - - - - - 0x038157 0E:8147: 88        DEY
C - - - - - 0x038158 0E:8148: 84 33     STY ram_0033
C - - - - - 0x03815A 0E:814A: 0A        ASL
C - - - - - 0x03815B 0E:814B: 26 33     ROL ram_0033
C - - - - - 0x03815D 0E:814D: 0A        ASL
C - - - - - 0x03815E 0E:814E: 26 33     ROL ram_0033
C - - - - - 0x038160 0E:8150: 85 32     STA ram_0032
C - - - - - 0x038162 0E:8152: A4 33     LDY ram_0033
C - - - - - 0x038164 0E:8154: 0A        ASL
C - - - - - 0x038165 0E:8155: 26 33     ROL ram_0033
C - - - - - 0x038167 0E:8157: 65 32     ADC ram_0032
C - - - - - 0x038169 0E:8159: 85 32     STA ram_0032
C - - - - - 0x03816B 0E:815B: 98        TYA
C - - - - - 0x03816C 0E:815C: 65 33     ADC ram_0033
C - - - - - 0x03816E 0E:815E: A8        TAY
C - - - - - 0x03816F 0E:815F: A5 32     LDA ram_0032
C - - - - - 0x038171 0E:8161: 18        CLC
C - - - - - 0x038172 0E:8162: 69 AE     ADC #$AE
C - - - - - 0x038174 0E:8164: 85 32     STA ram_0032
C - - - - - 0x038176 0E:8166: 98        TYA
C - - - - - 0x038177 0E:8167: 69 AF     ADC #$AF
C - - - - - 0x038179 0E:8169: 85 33     STA ram_0033
C - - - - - 0x03817B 0E:816B: 8A        TXA
C - - - - - 0x03817C 0E:816C: 38        SEC
C - - - - - 0x03817D 0E:816D: E9 1F     SBC #$1F
C - - - - - 0x03817F 0E:816F: 0A        ASL
C - - - - - 0x038180 0E:8170: A8        TAY
C - - - - - 0x038181 0E:8171: B1 32     LDA (ram_0032),Y
C - - - - - 0x038183 0E:8173: AA        TAX
C - - - - - 0x038184 0E:8174: C8        INY
C - - - - - 0x038185 0E:8175: B1 32     LDA (ram_0032),Y
C - - - - - 0x038187 0E:8177: 85 33     STA ram_0033
C - - - - - 0x038189 0E:8179: 86 32     STX ram_0032
C - - - - - 0x03818B 0E:817B: 4C 8B 81  JMP $818B
C - - - - - 0x03818E 0E:817E: 8A        TXA
C - - - - - 0x03818F 0E:817F: 38        SEC
C - - - - - 0x038190 0E:8180: E9 23     SBC #$23
C - - - - - 0x038192 0E:8182: A8        TAY
C - - - - - 0x038193 0E:8183: B1 32     LDA (ram_0032),Y
C - - - - - 0x038195 0E:8185: 85 32     STA ram_0032
C - - - - - 0x038197 0E:8187: A9 00     LDA #$00
C - - - - - 0x038199 0E:8189: 85 33     STA ram_0033
C D 0 - - - 0x03819B 0E:818B: 68        PLA
C - - - - - 0x03819C 0E:818C: 68        PLA
C - - - - - 0x03819D 0E:818D: 60        RTS
- D 0 - - - 0x03819E 0E:818E: 02        .byte $02   ; 
- D 0 - - - 0x03819F 0E:818F: 03        .byte $03   ; 
- D 0 - - - 0x0381A0 0E:8190: 03        .byte $03   ; 
- D 0 - - - 0x0381A1 0E:8191: 03        .byte $03   ; 
- D 0 - - - 0x0381A2 0E:8192: 03        .byte $03   ; 
- D 0 - - - 0x0381A3 0E:8193: 04        .byte $04   ; 
- D 0 - - - 0x0381A4 0E:8194: 05        .byte $05   ; 
- D 0 - - - 0x0381A5 0E:8195: 04        .byte $04   ; 
- D 0 - - - 0x0381A6 0E:8196: 05        .byte $05   ; 
- D 0 - - - 0x0381A7 0E:8197: 04        .byte $04   ; 
- D 0 - - - 0x0381A8 0E:8198: 05        .byte $05   ; 
- D 0 - - - 0x0381A9 0E:8199: D6        .byte $D6   ; 
- D 0 - - - 0x0381AA 0E:819A: 95        .byte $95   ; 
- D 0 - - - 0x0381AB 0E:819B: 62        .byte $62   ; <b>
- D 0 - - - 0x0381AC 0E:819C: 96        .byte $96   ; 
C D 0 - - - 0x0381AD 0E:819D: AD 3B 04  LDA ram_043B
C - - - - - 0x0381B0 0E:81A0: 08        PHP
C - - - - - 0x0381B1 0E:81A1: 0A        ASL
C - - - - - 0x0381B2 0E:81A2: 6D 3B 04  ADC ram_043B
C - - - - - 0x0381B5 0E:81A5: 6D 4E 04  ADC ram_044E
C - - - - - 0x0381B8 0E:81A8: A8        TAY
C - - - - - 0x0381B9 0E:81A9: 28        PLP
C - - - - - 0x0381BA 0E:81AA: D0 0F     BNE $81BB
C - - - - - 0x0381BC 0E:81AC: AD 3C 04  LDA ram_043C
C - - - - - 0x0381BF 0E:81AF: 29 7F     AND #$7F
C - - - - - 0x0381C1 0E:81B1: C9 03     CMP #$03
C - - - - - 0x0381C3 0E:81B3: 90 06     BCC $81BB
C - - - - - 0x0381C5 0E:81B5: 98        TYA
C - - - - - 0x0381C6 0E:81B6: 38        SEC
C - - - - - 0x0381C7 0E:81B7: ED 4E 04  SBC ram_044E
C - - - - - 0x0381CA 0E:81BA: A8        TAY
C - - - - - 0x0381CB 0E:81BB: BE 06 82  LDX $8206,Y
C - - - - - 0x0381CE 0E:81BE: E0 FF     CPX #$FF
C - - - - - 0x0381D0 0E:81C0: F0 41     BEQ $8203
C - - - - - 0x0381D2 0E:81C2: AD 41 04  LDA ram_0441
C - - - - - 0x0381D5 0E:81C5: 20 3A 80  JSR $803A
C - - - - - 0x0381D8 0E:81C8: 98        TYA
C - - - - - 0x0381D9 0E:81C9: 48        PHA
C - - - - - 0x0381DA 0E:81CA: AD 3B 04  LDA ram_043B
C - - - - - 0x0381DD 0E:81CD: 0A        ASL
C - - - - - 0x0381DE 0E:81CE: AA        TAX
C - - - - - 0x0381DF 0E:81CF: BD 60 94  LDA $9460,X
C - - - - - 0x0381E2 0E:81D2: 85 32     STA ram_0032
C - - - - - 0x0381E4 0E:81D4: BD 61 94  LDA $9461,X
C - - - - - 0x0381E7 0E:81D7: 85 33     STA ram_0033
C - - - - - 0x0381E9 0E:81D9: AD 3C 04  LDA ram_043C
C - - - - - 0x0381EC 0E:81DC: 0A        ASL
C - - - - - 0x0381ED 0E:81DD: 0A        ASL
C - - - - - 0x0381EE 0E:81DE: A8        TAY
C - - - - - 0x0381EF 0E:81DF: B1 32     LDA (ram_0032),Y
C - - - - - 0x0381F1 0E:81E1: 8D 44 04  STA ram_0444
C - - - - - 0x0381F4 0E:81E4: C8        INY
C - - - - - 0x0381F5 0E:81E5: B1 32     LDA (ram_0032),Y
C - - - - - 0x0381F7 0E:81E7: AA        TAX
C - - - - - 0x0381F8 0E:81E8: C8        INY
C - - - - - 0x0381F9 0E:81E9: B1 32     LDA (ram_0032),Y
C - - - - - 0x0381FB 0E:81EB: 8D 3F 04  STA ram_043F
C - - - - - 0x0381FE 0E:81EE: C8        INY
C - - - - - 0x0381FF 0E:81EF: B1 32     LDA (ram_0032),Y
C - - - - - 0x038201 0E:81F1: 29 03     AND #$03
C - - - - - 0x038203 0E:81F3: 8D 40 04  STA ram_0440
C - - - - - 0x038206 0E:81F6: B1 32     LDA (ram_0032),Y
C - - - - - 0x038208 0E:81F8: 29 F8     AND #$F8
C - - - - - 0x03820A 0E:81FA: 4A        LSR
C - - - - - 0x03820B 0E:81FB: 4A        LSR
C - - - - - 0x03820C 0E:81FC: 4A        LSR
C - - - - - 0x03820D 0E:81FD: 8D 43 04  STA ram_0443
C - - - - - 0x038210 0E:8200: 4C 78 82  JMP $8278
- - - - - - 0x038213 0E:8203: 4C        .byte $4C   ; <L>
- - - - - - 0x038214 0E:8204: 03        .byte $03   ; 
- - - - - - 0x038215 0E:8205: 82        .byte $82   ; 
- D 0 - - - 0x038216 0E:8206: 01        .byte $01   ; 
- D 0 - - - 0x038217 0E:8207: 07        .byte $07   ; 
- D 0 - - - 0x038218 0E:8208: 0F        .byte $0F   ; 
- D 0 - - - 0x038219 0E:8209: 02        .byte $02   ; 
- D 0 - - - 0x03821A 0E:820A: 08        .byte $08   ; 
- D 0 - - - 0x03821B 0E:820B: 10        .byte $10   ; 
- D 0 - - - 0x03821C 0E:820C: 03        .byte $03   ; 
- - - - - - 0x03821D 0E:820D: FF        .byte $FF   ; 
- - - - - - 0x03821E 0E:820E: FF        .byte $FF   ; 
- D 0 - - - 0x03821F 0E:820F: 02        .byte $02   ; 
- - - - - - 0x038220 0E:8210: FF        .byte $FF   ; 
- - - - - - 0x038221 0E:8211: FF        .byte $FF   ; 
- - - - - - 0x038222 0E:8212: FF        .byte $FF   ; 
- D 0 - - - 0x038223 0E:8213: 09        .byte $09   ; 
- D 0 - - - 0x038224 0E:8214: 11        .byte $11   ; 
- - - - - - 0x038225 0E:8215: FF        .byte $FF   ; 
- D 0 - - - 0x038226 0E:8216: 0A        .byte $0A   ; 
- D 0 - - - 0x038227 0E:8217: 12        .byte $12   ; 
- - - - - - 0x038228 0E:8218: FF        .byte $FF   ; 
- D 0 - - - 0x038229 0E:8219: 0B        .byte $0B   ; 
- D 0 - - - 0x03822A 0E:821A: 13        .byte $13   ; 
- D 0 - - - 0x03822B 0E:821B: 01        .byte $01   ; 
- - - - - - 0x03822C 0E:821C: FF        .byte $FF   ; 
- - - - - - 0x03822D 0E:821D: FF        .byte $FF   ; 
- D 0 - - - 0x03822E 0E:821E: 01        .byte $01   ; 
- - - - - - 0x03822F 0E:821F: FF        .byte $FF   ; 
- - - - - - 0x038230 0E:8220: FF        .byte $FF   ; 
- D 0 - - - 0x038231 0E:8221: 01        .byte $01   ; 
- - - - - - 0x038232 0E:8222: FF        .byte $FF   ; 
- - - - - - 0x038233 0E:8223: FF        .byte $FF   ; 
C D 0 - - - 0x038234 0E:8224: AD 3D 04  LDA ram_043D
C - - - - - 0x038237 0E:8227: 0A        ASL
C - - - - - 0x038238 0E:8228: 6D 3D 04  ADC ram_043D
C - - - - - 0x03823B 0E:822B: 6D 4E 04  ADC ram_044E
C - - - - - 0x03823E 0E:822E: A8        TAY
C - - - - - 0x03823F 0E:822F: BE 4C 82  LDX $824C,Y
C - - - - - 0x038242 0E:8232: AD 42 04  LDA ram_0442
C - - - - - 0x038245 0E:8235: 20 3A 80  JSR $803A
C - - - - - 0x038248 0E:8238: 98        TYA
C - - - - - 0x038249 0E:8239: 48        PHA
C - - - - - 0x03824A 0E:823A: AD 3D 04  LDA ram_043D
C - - - - - 0x03824D 0E:823D: 0A        ASL
C - - - - - 0x03824E 0E:823E: AA        TAX
C - - - - - 0x03824F 0E:823F: BD 54 95  LDA $9554,X
C - - - - - 0x038252 0E:8242: 85 32     STA ram_0032
C - - - - - 0x038254 0E:8244: BD 55 95  LDA $9555,X
C - - - - - 0x038257 0E:8247: 85 33     STA ram_0033
C - - - - - 0x038259 0E:8249: 4C 5B 82  JMP $825B
- D 0 - - - 0x03825C 0E:824C: 04        .byte $04   ; 
- D 0 - - - 0x03825D 0E:824D: 04        .byte $04   ; 
- D 0 - - - 0x03825E 0E:824E: 04        .byte $04   ; 
- D 0 - - - 0x03825F 0E:824F: 05        .byte $05   ; 
- D 0 - - - 0x038260 0E:8250: 05        .byte $05   ; 
- D 0 - - - 0x038261 0E:8251: 05        .byte $05   ; 
- D 0 - - - 0x038262 0E:8252: 06        .byte $06   ; 
- D 0 - - - 0x038263 0E:8253: 0E        .byte $0E   ; 
- D 0 - - - 0x038264 0E:8254: 16        .byte $16   ; 
- - - - - - 0x038265 0E:8255: FF        .byte $FF   ; 
- D 0 - - - 0x038266 0E:8256: 0C        .byte $0C   ; 
- D 0 - - - 0x038267 0E:8257: 14        .byte $14   ; 
- - - - - - 0x038268 0E:8258: FF        .byte $FF   ; 
- D 0 - - - 0x038269 0E:8259: 0D        .byte $0D   ; 
- D 0 - - - 0x03826A 0E:825A: 15        .byte $15   ; 
C D 0 - - - 0x03826B 0E:825B: AD 3E 04  LDA ram_043E
C - - - - - 0x03826E 0E:825E: 0A        ASL
C - - - - - 0x03826F 0E:825F: 0A        ASL
C - - - - - 0x038270 0E:8260: A8        TAY
C - - - - - 0x038271 0E:8261: B1 32     LDA (ram_0032),Y
C - - - - - 0x038273 0E:8263: 8D 45 04  STA ram_0445
C - - - - - 0x038276 0E:8266: C8        INY
C - - - - - 0x038277 0E:8267: B1 32     LDA (ram_0032),Y
C - - - - - 0x038279 0E:8269: AA        TAX
C - - - - - 0x03827A 0E:826A: C8        INY
C - - - - - 0x03827B 0E:826B: B1 32     LDA (ram_0032),Y
C - - - - - 0x03827D 0E:826D: 8D 3F 04  STA ram_043F
C - - - - - 0x038280 0E:8270: C8        INY
C - - - - - 0x038281 0E:8271: B1 32     LDA (ram_0032),Y
C - - - - - 0x038283 0E:8273: 29 03     AND #$03
C - - - - - 0x038285 0E:8275: 8D 40 04  STA ram_0440
C D 0 - - - 0x038288 0E:8278: 86 32     STX ram_0032
C - - - - - 0x03828A 0E:827A: 68        PLA
C - - - - - 0x03828B 0E:827B: 18        CLC
C - - - - - 0x03828C 0E:827C: 65 32     ADC ram_0032
C - - - - - 0x03828E 0E:827E: C9 C0     CMP #$C0
C - - - - - 0x038290 0E:8280: 90 02     BCC $8284
- D 0 - - - 0x038292 0E:8282: A9        .byte $A9   ; 
- - - - - - 0x038293 0E:8283: BF        .byte $BF   ; 
C - - - - - 0x038294 0E:8284: AA        TAX
C - - - - - 0x038295 0E:8285: BD 4E 9E  LDA $9E4E,X
C - - - - - 0x038298 0E:8288: 85 32     STA ram_0032
C - - - - - 0x03829A 0E:828A: A9 00     LDA #$00
C - - - - - 0x03829C 0E:828C: 85 33     STA ram_0033
C - - - - - 0x03829E 0E:828E: 60        RTS
C D 0 - - - 0x03829F 0E:828F: AC 3D 04  LDY ram_043D
C - - - - - 0x0382A2 0E:8292: C0 03     CPY #$03
C - - - - - 0x0382A4 0E:8294: D0 06     BNE $829C
C - - - - - 0x0382A6 0E:8296: 88        DEY
C - - - - - 0x0382A7 0E:8297: 98        TYA
C - - - - - 0x0382A8 0E:8298: 18        CLC
C - - - - - 0x0382A9 0E:8299: 69 03     ADC #$03
C - - - - - 0x0382AB 0E:829B: A8        TAY
C - - - - - 0x0382AC 0E:829C: BE C0 82  LDX $82C0,Y
C - - - - - 0x0382AF 0E:829F: AD FB 05  LDA ram_05FB
C - - - - - 0x0382B2 0E:82A2: 49 0B     EOR #$0B
C - - - - - 0x0382B4 0E:82A4: 20 3A 80  JSR $803A
C - - - - - 0x0382B7 0E:82A7: 98        TYA
C - - - - - 0x0382B8 0E:82A8: 48        PHA
C - - - - - 0x0382B9 0E:82A9: AD 3D 04  LDA ram_043D
C - - - - - 0x0382BC 0E:82AC: 0A        ASL
C - - - - - 0x0382BD 0E:82AD: AA        TAX
C - - - - - 0x0382BE 0E:82AE: BD 9E 95  LDA $959E,X
C - - - - - 0x0382C1 0E:82B1: 85 32     STA ram_0032
C - - - - - 0x0382C3 0E:82B3: BD 9F 95  LDA $959F,X
C - - - - - 0x0382C6 0E:82B6: 85 33     STA ram_0033
C - - - - - 0x0382C8 0E:82B8: A9 00     LDA #$00
C - - - - - 0x0382CA 0E:82BA: 8D 45 04  STA ram_0445
C - - - - - 0x0382CD 0E:82BD: 4C 5B 82  JMP $825B
- D 0 - - - 0x0382D0 0E:82C0: 19        .byte $19   ; 
- D 0 - - - 0x0382D1 0E:82C1: 1A        .byte $1A   ; 
- D 0 - - - 0x0382D2 0E:82C2: 19        .byte $19   ; 
- - - - - - 0x0382D3 0E:82C3: 1D        .byte $1D   ; 
- - - - - - 0x0382D4 0E:82C4: 1E        .byte $1E   ; 
- D 0 - - - 0x0382D5 0E:82C5: 1C        .byte $1C   ; 
- D 0 - - - 0x0382D6 0E:82C6: 1B        .byte $1B   ; 
- D 0 - - - 0x0382D7 0E:82C7: 1A        .byte $1A   ; 
- D 0 - - - 0x0382D8 0E:82C8: 1A        .byte $1A   ; 
- D 0 - - - 0x0382D9 0E:82C9: 1A        .byte $1A   ; 
C D 0 - - - 0x0382DA 0E:82CA: 20 2D C5  JSR $C52D
C - - - - - 0x0382DD 0E:82CD: A9 00     LDA #$00
C - - - - - 0x0382DF 0E:82CF: 85 11     STA ram_0011
C - - - - - 0x0382E1 0E:82D1: 85 12     STA ram_0012
C - - - - - 0x0382E3 0E:82D3: A9 4A     LDA #$4A
C - - - - - 0x0382E5 0E:82D5: 85 61     STA ram_0061
C - - - - - 0x0382E7 0E:82D7: A9 83     LDA #$83
C - - - - - 0x0382E9 0E:82D9: 85 62     STA ram_0062
C - - - - - 0x0382EB 0E:82DB: A9 00     LDA #$00
C - - - - - 0x0382ED 0E:82DD: 48        PHA
C - - - - - 0x0382EE 0E:82DE: A9 01     LDA #$01
C - - - - - 0x0382F0 0E:82E0: 20 15 C5  JSR $C515
C - - - - - 0x0382F3 0E:82E3: AD 15 05  LDA ram_0515
C - - - - - 0x0382F6 0E:82E6: D0 F6     BNE $82DE
C - - - - - 0x0382F8 0E:82E8: A9 01     LDA #$01
C - - - - - 0x0382FA 0E:82EA: 8D 15 05  STA ram_0515
C - - - - - 0x0382FD 0E:82ED: 68        PLA
C - - - - - 0x0382FE 0E:82EE: 48        PHA
C - - - - - 0x0382FF 0E:82EF: A2 00     LDX #$00
C - - - - - 0x038301 0E:82F1: 20 0A 83  JSR $830A
C - - - - - 0x038304 0E:82F4: 68        PLA
C - - - - - 0x038305 0E:82F5: 18        CLC
C - - - - - 0x038306 0E:82F6: 69 01     ADC #$01
C - - - - - 0x038308 0E:82F8: 48        PHA
C - - - - - 0x038309 0E:82F9: 20 0A 83  JSR $830A
C - - - - - 0x03830C 0E:82FC: A9 80     LDA #$80
C - - - - - 0x03830E 0E:82FE: 8D 15 05  STA ram_0515
C - - - - - 0x038311 0E:8301: 68        PLA
C - - - - - 0x038312 0E:8302: 18        CLC
C - - - - - 0x038313 0E:8303: 69 01     ADC #$01
C - - - - - 0x038315 0E:8305: C9 0C     CMP #$0C
C - - - - - 0x038317 0E:8307: D0 D4     BNE $82DD
C - - - - - 0x038319 0E:8309: 60        RTS
C - - - - - 0x03831A 0E:830A: 48        PHA
C - - - - - 0x03831B 0E:830B: A9 18     LDA #$18
C - - - - - 0x03831D 0E:830D: 9D A5 04  STA ram_04A5,X
C - - - - - 0x038320 0E:8310: A9 40     LDA #$40
C - - - - - 0x038322 0E:8312: 9D A6 04  STA ram_04A6,X
C - - - - - 0x038325 0E:8315: 68        PLA
C - - - - - 0x038326 0E:8316: 18        CLC
C - - - - - 0x038327 0E:8317: 69 11     ADC #$11
C - - - - - 0x038329 0E:8319: 4A        LSR
C - - - - - 0x03832A 0E:831A: 7E A6 04  ROR ram_04A6,X
C - - - - - 0x03832D 0E:831D: 4A        LSR
C - - - - - 0x03832E 0E:831E: 7E A6 04  ROR ram_04A6,X
C - - - - - 0x038331 0E:8321: 4A        LSR
C - - - - - 0x038332 0E:8322: 7E A6 04  ROR ram_04A6,X
C - - - - - 0x038335 0E:8325: 09 20     ORA #$20
C - - - - - 0x038337 0E:8327: 9D A7 04  STA ram_04A7,X
C - - - - - 0x03833A 0E:832A: E8        INX
C - - - - - 0x03833B 0E:832B: E8        INX
C - - - - - 0x03833C 0E:832C: E8        INX
C - - - - - 0x03833D 0E:832D: A0 00     LDY #$00
C - - - - - 0x03833F 0E:832F: B1 61     LDA (ram_0061),Y
C - - - - - 0x038341 0E:8331: 9D A5 04  STA ram_04A5,X
C - - - - - 0x038344 0E:8334: E8        INX
C - - - - - 0x038345 0E:8335: C8        INY
C - - - - - 0x038346 0E:8336: C0 18     CPY #$18
C - - - - - 0x038348 0E:8338: D0 F5     BNE $832F
C - - - - - 0x03834A 0E:833A: A9 00     LDA #$00
C - - - - - 0x03834C 0E:833C: 9D A5 04  STA ram_04A5,X
C - - - - - 0x03834F 0E:833F: 98        TYA
C - - - - - 0x038350 0E:8340: 18        CLC
C - - - - - 0x038351 0E:8341: 65 61     ADC ram_0061
C - - - - - 0x038353 0E:8343: 85 61     STA ram_0061
C - - - - - 0x038355 0E:8345: 90 02     BCC $8349
C - - - - - 0x038357 0E:8347: E6 62     INC ram_0062
C - - - - - 0x038359 0E:8349: 60        RTS
- D 0 - I - 0x03835A 0E:834A: 00        .byte $00   ; 
- D 0 - I - 0x03835B 0E:834B: 00        .byte $00   ; 
- D 0 - I - 0x03835C 0E:834C: C9        .byte $C9   ; 
- D 0 - I - 0x03835D 0E:834D: D2        .byte $D2   ; 
- D 0 - I - 0x03835E 0E:834E: D2        .byte $D2   ; 
- D 0 - I - 0x03835F 0E:834F: D2        .byte $D2   ; 
- D 0 - I - 0x038360 0E:8350: D2        .byte $D2   ; 
- D 0 - I - 0x038361 0E:8351: D2        .byte $D2   ; 
- D 0 - I - 0x038362 0E:8352: D2        .byte $D2   ; 
- D 0 - I - 0x038363 0E:8353: D2        .byte $D2   ; 
- D 0 - I - 0x038364 0E:8354: D2        .byte $D2   ; 
- D 0 - I - 0x038365 0E:8355: D2        .byte $D2   ; 
- D 0 - I - 0x038366 0E:8356: C9        .byte $C9   ; 
- D 0 - I - 0x038367 0E:8357: D2        .byte $D2   ; 
- D 0 - I - 0x038368 0E:8358: D2        .byte $D2   ; 
- D 0 - I - 0x038369 0E:8359: D2        .byte $D2   ; 
- D 0 - I - 0x03836A 0E:835A: D2        .byte $D2   ; 
- D 0 - I - 0x03836B 0E:835B: D2        .byte $D2   ; 
- D 0 - I - 0x03836C 0E:835C: D2        .byte $D2   ; 
- D 0 - I - 0x03836D 0E:835D: D2        .byte $D2   ; 
- D 0 - I - 0x03836E 0E:835E: D2        .byte $D2   ; 
- D 0 - I - 0x03836F 0E:835F: D2        .byte $D2   ; 
- D 0 - I - 0x038370 0E:8360: D0        .byte $D0   ; 
- D 0 - I - 0x038371 0E:8361: 00        .byte $00   ; 
- D 0 - I - 0x038372 0E:8362: 00        .byte $00   ; 
- D 0 - I - 0x038373 0E:8363: 00        .byte $00   ; 
- D 0 - I - 0x038374 0E:8364: CC        .byte $CC   ; 
- D 0 - I - 0x038375 0E:8365: FF        .byte $FF   ; 
- D 0 - I - 0x038376 0E:8366: FF        .byte $FF   ; 
- D 0 - I - 0x038377 0E:8367: FF        .byte $FF   ; 
- D 0 - I - 0x038378 0E:8368: FF        .byte $FF   ; 
- D 0 - I - 0x038379 0E:8369: FF        .byte $FF   ; 
- D 0 - I - 0x03837A 0E:836A: FF        .byte $FF   ; 
- D 0 - I - 0x03837B 0E:836B: FF        .byte $FF   ; 
- D 0 - I - 0x03837C 0E:836C: FF        .byte $FF   ; 
- D 0 - I - 0x03837D 0E:836D: FF        .byte $FF   ; 
- D 0 - I - 0x03837E 0E:836E: CC        .byte $CC   ; 
- D 0 - I - 0x03837F 0E:836F: FF        .byte $FF   ; 
- D 0 - I - 0x038380 0E:8370: FF        .byte $FF   ; 
- D 0 - I - 0x038381 0E:8371: FF        .byte $FF   ; 
- D 0 - I - 0x038382 0E:8372: FF        .byte $FF   ; 
- D 0 - I - 0x038383 0E:8373: FF        .byte $FF   ; 
- D 0 - I - 0x038384 0E:8374: FF        .byte $FF   ; 
- D 0 - I - 0x038385 0E:8375: FF        .byte $FF   ; 
- D 0 - I - 0x038386 0E:8376: FF        .byte $FF   ; 
- D 0 - I - 0x038387 0E:8377: FF        .byte $FF   ; 
- D 0 - I - 0x038388 0E:8378: D0        .byte $D0   ; 
- D 0 - I - 0x038389 0E:8379: 00        .byte $00   ; 
- D 0 - I - 0x03838A 0E:837A: 00        .byte $00   ; 
- D 0 - I - 0x03838B 0E:837B: 00        .byte $00   ; 
- D 0 - I - 0x03838C 0E:837C: C9        .byte $C9   ; 
- D 0 - I - 0x03838D 0E:837D: D2        .byte $D2   ; 
- D 0 - I - 0x03838E 0E:837E: D2        .byte $D2   ; 
- D 0 - I - 0x03838F 0E:837F: D2        .byte $D2   ; 
- D 0 - I - 0x038390 0E:8380: CC        .byte $CC   ; 
- D 0 - I - 0x038391 0E:8381: FF        .byte $FF   ; 
- D 0 - I - 0x038392 0E:8382: FF        .byte $FF   ; 
- D 0 - I - 0x038393 0E:8383: FF        .byte $FF   ; 
- D 0 - I - 0x038394 0E:8384: FF        .byte $FF   ; 
- D 0 - I - 0x038395 0E:8385: FF        .byte $FF   ; 
- D 0 - I - 0x038396 0E:8386: CC        .byte $CC   ; 
- D 0 - I - 0x038397 0E:8387: FF        .byte $FF   ; 
- D 0 - I - 0x038398 0E:8388: FF        .byte $FF   ; 
- D 0 - I - 0x038399 0E:8389: FF        .byte $FF   ; 
- D 0 - I - 0x03839A 0E:838A: FF        .byte $FF   ; 
- D 0 - I - 0x03839B 0E:838B: FF        .byte $FF   ; 
- D 0 - I - 0x03839C 0E:838C: C9        .byte $C9   ; 
- D 0 - I - 0x03839D 0E:838D: D2        .byte $D2   ; 
- D 0 - I - 0x03839E 0E:838E: D2        .byte $D2   ; 
- D 0 - I - 0x03839F 0E:838F: D2        .byte $D2   ; 
- D 0 - I - 0x0383A0 0E:8390: D0        .byte $D0   ; 
- D 0 - I - 0x0383A1 0E:8391: 00        .byte $00   ; 
- D 0 - I - 0x0383A2 0E:8392: 00        .byte $00   ; 
- D 0 - I - 0x0383A3 0E:8393: 00        .byte $00   ; 
- D 0 - I - 0x0383A4 0E:8394: CC        .byte $CC   ; 
- D 0 - I - 0x0383A5 0E:8395: FF        .byte $FF   ; 
- D 0 - I - 0x0383A6 0E:8396: FF        .byte $FF   ; 
- D 0 - I - 0x0383A7 0E:8397: FF        .byte $FF   ; 
- D 0 - I - 0x0383A8 0E:8398: CC        .byte $CC   ; 
- D 0 - I - 0x0383A9 0E:8399: FF        .byte $FF   ; 
- D 0 - I - 0x0383AA 0E:839A: FF        .byte $FF   ; 
- D 0 - I - 0x0383AB 0E:839B: FF        .byte $FF   ; 
- D 0 - I - 0x0383AC 0E:839C: FF        .byte $FF   ; 
- D 0 - I - 0x0383AD 0E:839D: FF        .byte $FF   ; 
- D 0 - I - 0x0383AE 0E:839E: CC        .byte $CC   ; 
- D 0 - I - 0x0383AF 0E:839F: FF        .byte $FF   ; 
- D 0 - I - 0x0383B0 0E:83A0: FF        .byte $FF   ; 
- D 0 - I - 0x0383B1 0E:83A1: FF        .byte $FF   ; 
- D 0 - I - 0x0383B2 0E:83A2: FF        .byte $FF   ; 
- D 0 - I - 0x0383B3 0E:83A3: FF        .byte $FF   ; 
- D 0 - I - 0x0383B4 0E:83A4: CC        .byte $CC   ; 
- D 0 - I - 0x0383B5 0E:83A5: FF        .byte $FF   ; 
- D 0 - I - 0x0383B6 0E:83A6: FF        .byte $FF   ; 
- D 0 - I - 0x0383B7 0E:83A7: FF        .byte $FF   ; 
- D 0 - I - 0x0383B8 0E:83A8: D0        .byte $D0   ; 
- D 0 - I - 0x0383B9 0E:83A9: 00        .byte $00   ; 
- D 0 - I - 0x0383BA 0E:83AA: 00        .byte $00   ; 
- D 0 - I - 0x0383BB 0E:83AB: 00        .byte $00   ; 
- D 0 - I - 0x0383BC 0E:83AC: C9        .byte $C9   ; 
- D 0 - I - 0x0383BD 0E:83AD: D2        .byte $D2   ; 
- D 0 - I - 0x0383BE 0E:83AE: CC        .byte $CC   ; 
- D 0 - I - 0x0383BF 0E:83AF: FF        .byte $FF   ; 
- D 0 - I - 0x0383C0 0E:83B0: CC        .byte $CC   ; 
- D 0 - I - 0x0383C1 0E:83B1: FF        .byte $FF   ; 
- D 0 - I - 0x0383C2 0E:83B2: FF        .byte $FF   ; 
- D 0 - I - 0x0383C3 0E:83B3: FF        .byte $FF   ; 
- D 0 - I - 0x0383C4 0E:83B4: C0        .byte $C0   ; 
- D 0 - I - 0x0383C5 0E:83B5: C1        .byte $C1   ; 
- D 0 - I - 0x0383C6 0E:83B6: C4        .byte $C4   ; 
- D 0 - I - 0x0383C7 0E:83B7: C5        .byte $C5   ; 
- D 0 - I - 0x0383C8 0E:83B8: FF        .byte $FF   ; 
- D 0 - I - 0x0383C9 0E:83B9: FF        .byte $FF   ; 
- D 0 - I - 0x0383CA 0E:83BA: FF        .byte $FF   ; 
- D 0 - I - 0x0383CB 0E:83BB: FF        .byte $FF   ; 
- D 0 - I - 0x0383CC 0E:83BC: CC        .byte $CC   ; 
- D 0 - I - 0x0383CD 0E:83BD: FF        .byte $FF   ; 
- D 0 - I - 0x0383CE 0E:83BE: C9        .byte $C9   ; 
- D 0 - I - 0x0383CF 0E:83BF: D2        .byte $D2   ; 
- D 0 - I - 0x0383D0 0E:83C0: D0        .byte $D0   ; 
- D 0 - I - 0x0383D1 0E:83C1: 00        .byte $00   ; 
- D 0 - I - 0x0383D2 0E:83C2: 00        .byte $00   ; 
- D 0 - I - 0x0383D3 0E:83C3: C9        .byte $C9   ; 
- D 0 - I - 0x0383D4 0E:83C4: CC        .byte $CC   ; 
- D 0 - I - 0x0383D5 0E:83C5: FF        .byte $FF   ; 
- D 0 - I - 0x0383D6 0E:83C6: CC        .byte $CC   ; 
- D 0 - I - 0x0383D7 0E:83C7: FF        .byte $FF   ; 
- D 0 - I - 0x0383D8 0E:83C8: CC        .byte $CC   ; 
- D 0 - I - 0x0383D9 0E:83C9: FF        .byte $FF   ; 
- D 0 - I - 0x0383DA 0E:83CA: FF        .byte $FF   ; 
- D 0 - I - 0x0383DB 0E:83CB: FF        .byte $FF   ; 
- D 0 - I - 0x0383DC 0E:83CC: C2        .byte $C2   ; 
- D 0 - I - 0x0383DD 0E:83CD: FF        .byte $FF   ; 
- D 0 - I - 0x0383DE 0E:83CE: CC        .byte $CC   ; 
- D 0 - I - 0x0383DF 0E:83CF: C7        .byte $C7   ; 
- D 0 - I - 0x0383E0 0E:83D0: FF        .byte $FF   ; 
- D 0 - I - 0x0383E1 0E:83D1: FF        .byte $FF   ; 
- D 0 - I - 0x0383E2 0E:83D2: FF        .byte $FF   ; 
- D 0 - I - 0x0383E3 0E:83D3: FF        .byte $FF   ; 
- D 0 - I - 0x0383E4 0E:83D4: CC        .byte $CC   ; 
- D 0 - I - 0x0383E5 0E:83D5: FF        .byte $FF   ; 
- D 0 - I - 0x0383E6 0E:83D6: CC        .byte $CC   ; 
- D 0 - I - 0x0383E7 0E:83D7: FF        .byte $FF   ; 
- D 0 - I - 0x0383E8 0E:83D8: C9        .byte $C9   ; 
- D 0 - I - 0x0383E9 0E:83D9: D0        .byte $D0   ; 
- D 0 - I - 0x0383EA 0E:83DA: 00        .byte $00   ; 
- D 0 - I - 0x0383EB 0E:83DB: C6        .byte $C6   ; 
- D 0 - I - 0x0383EC 0E:83DC: CC        .byte $CC   ; 
- D 0 - I - 0x0383ED 0E:83DD: FF        .byte $FF   ; 
- D 0 - I - 0x0383EE 0E:83DE: CC        .byte $CC   ; 
- D 0 - I - 0x0383EF 0E:83DF: FF        .byte $FF   ; 
- D 0 - I - 0x0383F0 0E:83E0: CC        .byte $CC   ; 
- D 0 - I - 0x0383F1 0E:83E1: FF        .byte $FF   ; 
- D 0 - I - 0x0383F2 0E:83E2: FF        .byte $FF   ; 
- D 0 - I - 0x0383F3 0E:83E3: FF        .byte $FF   ; 
- D 0 - I - 0x0383F4 0E:83E4: C8        .byte $C8   ; 
- D 0 - I - 0x0383F5 0E:83E5: FF        .byte $FF   ; 
- D 0 - I - 0x0383F6 0E:83E6: CC        .byte $CC   ; 
- D 0 - I - 0x0383F7 0E:83E7: CD        .byte $CD   ; 
- D 0 - I - 0x0383F8 0E:83E8: FF        .byte $FF   ; 
- D 0 - I - 0x0383F9 0E:83E9: FF        .byte $FF   ; 
- D 0 - I - 0x0383FA 0E:83EA: FF        .byte $FF   ; 
- D 0 - I - 0x0383FB 0E:83EB: FF        .byte $FF   ; 
- D 0 - I - 0x0383FC 0E:83EC: CC        .byte $CC   ; 
- D 0 - I - 0x0383FD 0E:83ED: FF        .byte $FF   ; 
- D 0 - I - 0x0383FE 0E:83EE: CC        .byte $CC   ; 
- D 0 - I - 0x0383FF 0E:83EF: FF        .byte $FF   ; 
- D 0 - I - 0x038400 0E:83F0: C6        .byte $C6   ; 
- D 0 - I - 0x038401 0E:83F1: D0        .byte $D0   ; 
- D 0 - I - 0x038402 0E:83F2: 00        .byte $00   ; 
- D 0 - I - 0x038403 0E:83F3: 00        .byte $00   ; 
- D 0 - I - 0x038404 0E:83F4: C6        .byte $C6   ; 
- D 0 - I - 0x038405 0E:83F5: C3        .byte $C3   ; 
- D 0 - I - 0x038406 0E:83F6: CC        .byte $CC   ; 
- D 0 - I - 0x038407 0E:83F7: FF        .byte $FF   ; 
- D 0 - I - 0x038408 0E:83F8: CC        .byte $CC   ; 
- D 0 - I - 0x038409 0E:83F9: FF        .byte $FF   ; 
- D 0 - I - 0x03840A 0E:83FA: FF        .byte $FF   ; 
- D 0 - I - 0x03840B 0E:83FB: FF        .byte $FF   ; 
- D 0 - I - 0x03840C 0E:83FC: CA        .byte $CA   ; 
- D 0 - I - 0x03840D 0E:83FD: CB        .byte $CB   ; 
- D 0 - I - 0x03840E 0E:83FE: CE        .byte $CE   ; 
- D 0 - I - 0x03840F 0E:83FF: CF        .byte $CF   ; 
- D 0 - I - 0x038410 0E:8400: FF        .byte $FF   ; 
- D 0 - I - 0x038411 0E:8401: FF        .byte $FF   ; 
- D 0 - I - 0x038412 0E:8402: FF        .byte $FF   ; 
- D 0 - I - 0x038413 0E:8403: FF        .byte $FF   ; 
- D 0 - I - 0x038414 0E:8404: CC        .byte $CC   ; 
- D 0 - I - 0x038415 0E:8405: FF        .byte $FF   ; 
- D 0 - I - 0x038416 0E:8406: C6        .byte $C6   ; 
- D 0 - I - 0x038417 0E:8407: C3        .byte $C3   ; 
- D 0 - I - 0x038418 0E:8408: D0        .byte $D0   ; 
- D 0 - I - 0x038419 0E:8409: 00        .byte $00   ; 
- D 0 - I - 0x03841A 0E:840A: 00        .byte $00   ; 
- D 0 - I - 0x03841B 0E:840B: 00        .byte $00   ; 
- D 0 - I - 0x03841C 0E:840C: CC        .byte $CC   ; 
- D 0 - I - 0x03841D 0E:840D: FF        .byte $FF   ; 
- D 0 - I - 0x03841E 0E:840E: FF        .byte $FF   ; 
- D 0 - I - 0x03841F 0E:840F: FF        .byte $FF   ; 
- D 0 - I - 0x038420 0E:8410: CC        .byte $CC   ; 
- D 0 - I - 0x038421 0E:8411: FF        .byte $FF   ; 
- D 0 - I - 0x038422 0E:8412: FF        .byte $FF   ; 
- D 0 - I - 0x038423 0E:8413: FF        .byte $FF   ; 
- D 0 - I - 0x038424 0E:8414: FF        .byte $FF   ; 
- D 0 - I - 0x038425 0E:8415: FF        .byte $FF   ; 
- D 0 - I - 0x038426 0E:8416: CC        .byte $CC   ; 
- D 0 - I - 0x038427 0E:8417: FF        .byte $FF   ; 
- D 0 - I - 0x038428 0E:8418: FF        .byte $FF   ; 
- D 0 - I - 0x038429 0E:8419: FF        .byte $FF   ; 
- D 0 - I - 0x03842A 0E:841A: FF        .byte $FF   ; 
- D 0 - I - 0x03842B 0E:841B: FF        .byte $FF   ; 
- D 0 - I - 0x03842C 0E:841C: CC        .byte $CC   ; 
- D 0 - I - 0x03842D 0E:841D: FF        .byte $FF   ; 
- D 0 - I - 0x03842E 0E:841E: FF        .byte $FF   ; 
- D 0 - I - 0x03842F 0E:841F: FF        .byte $FF   ; 
- D 0 - I - 0x038430 0E:8420: D0        .byte $D0   ; 
- D 0 - I - 0x038431 0E:8421: 00        .byte $00   ; 
- D 0 - I - 0x038432 0E:8422: 00        .byte $00   ; 
- D 0 - I - 0x038433 0E:8423: 00        .byte $00   ; 
- D 0 - I - 0x038434 0E:8424: C6        .byte $C6   ; 
- D 0 - I - 0x038435 0E:8425: C3        .byte $C3   ; 
- D 0 - I - 0x038436 0E:8426: C3        .byte $C3   ; 
- D 0 - I - 0x038437 0E:8427: C3        .byte $C3   ; 
- D 0 - I - 0x038438 0E:8428: CC        .byte $CC   ; 
- D 0 - I - 0x038439 0E:8429: FF        .byte $FF   ; 
- D 0 - I - 0x03843A 0E:842A: FF        .byte $FF   ; 
- D 0 - I - 0x03843B 0E:842B: FF        .byte $FF   ; 
- D 0 - I - 0x03843C 0E:842C: FF        .byte $FF   ; 
- D 0 - I - 0x03843D 0E:842D: FF        .byte $FF   ; 
- D 0 - I - 0x03843E 0E:842E: CC        .byte $CC   ; 
- D 0 - I - 0x03843F 0E:842F: FF        .byte $FF   ; 
- D 0 - I - 0x038440 0E:8430: FF        .byte $FF   ; 
- D 0 - I - 0x038441 0E:8431: FF        .byte $FF   ; 
- D 0 - I - 0x038442 0E:8432: FF        .byte $FF   ; 
- D 0 - I - 0x038443 0E:8433: FF        .byte $FF   ; 
- D 0 - I - 0x038444 0E:8434: C6        .byte $C6   ; 
- D 0 - I - 0x038445 0E:8435: C3        .byte $C3   ; 
- D 0 - I - 0x038446 0E:8436: C3        .byte $C3   ; 
- D 0 - I - 0x038447 0E:8437: C3        .byte $C3   ; 
- D 0 - I - 0x038448 0E:8438: D0        .byte $D0   ; 
- D 0 - I - 0x038449 0E:8439: 00        .byte $00   ; 
- D 0 - I - 0x03844A 0E:843A: 00        .byte $00   ; 
- D 0 - I - 0x03844B 0E:843B: 00        .byte $00   ; 
- D 0 - I - 0x03844C 0E:843C: CC        .byte $CC   ; 
- D 0 - I - 0x03844D 0E:843D: FF        .byte $FF   ; 
- D 0 - I - 0x03844E 0E:843E: FF        .byte $FF   ; 
- D 0 - I - 0x03844F 0E:843F: FF        .byte $FF   ; 
- D 0 - I - 0x038450 0E:8440: FF        .byte $FF   ; 
- D 0 - I - 0x038451 0E:8441: FF        .byte $FF   ; 
- D 0 - I - 0x038452 0E:8442: FF        .byte $FF   ; 
- D 0 - I - 0x038453 0E:8443: FF        .byte $FF   ; 
- D 0 - I - 0x038454 0E:8444: FF        .byte $FF   ; 
- D 0 - I - 0x038455 0E:8445: FF        .byte $FF   ; 
- D 0 - I - 0x038456 0E:8446: CC        .byte $CC   ; 
- D 0 - I - 0x038457 0E:8447: FF        .byte $FF   ; 
- D 0 - I - 0x038458 0E:8448: FF        .byte $FF   ; 
- D 0 - I - 0x038459 0E:8449: FF        .byte $FF   ; 
- D 0 - I - 0x03845A 0E:844A: FF        .byte $FF   ; 
- D 0 - I - 0x03845B 0E:844B: FF        .byte $FF   ; 
- D 0 - I - 0x03845C 0E:844C: FF        .byte $FF   ; 
- D 0 - I - 0x03845D 0E:844D: FF        .byte $FF   ; 
- D 0 - I - 0x03845E 0E:844E: FF        .byte $FF   ; 
- D 0 - I - 0x03845F 0E:844F: FF        .byte $FF   ; 
- D 0 - I - 0x038460 0E:8450: D0        .byte $D0   ; 
- D 0 - I - 0x038461 0E:8451: 00        .byte $00   ; 
- D 0 - I - 0x038462 0E:8452: 00        .byte $00   ; 
- D 0 - I - 0x038463 0E:8453: 00        .byte $00   ; 
- D 0 - I - 0x038464 0E:8454: C6        .byte $C6   ; 
- D 0 - I - 0x038465 0E:8455: C3        .byte $C3   ; 
- D 0 - I - 0x038466 0E:8456: C3        .byte $C3   ; 
- D 0 - I - 0x038467 0E:8457: C3        .byte $C3   ; 
- D 0 - I - 0x038468 0E:8458: C3        .byte $C3   ; 
- D 0 - I - 0x038469 0E:8459: C3        .byte $C3   ; 
- D 0 - I - 0x03846A 0E:845A: C3        .byte $C3   ; 
- D 0 - I - 0x03846B 0E:845B: C3        .byte $C3   ; 
- D 0 - I - 0x03846C 0E:845C: C3        .byte $C3   ; 
- D 0 - I - 0x03846D 0E:845D: C3        .byte $C3   ; 
- D 0 - I - 0x03846E 0E:845E: C6        .byte $C6   ; 
- D 0 - I - 0x03846F 0E:845F: C3        .byte $C3   ; 
- D 0 - I - 0x038470 0E:8460: C3        .byte $C3   ; 
- D 0 - I - 0x038471 0E:8461: C3        .byte $C3   ; 
- D 0 - I - 0x038472 0E:8462: C3        .byte $C3   ; 
- D 0 - I - 0x038473 0E:8463: C3        .byte $C3   ; 
- D 0 - I - 0x038474 0E:8464: C3        .byte $C3   ; 
- D 0 - I - 0x038475 0E:8465: C3        .byte $C3   ; 
- D 0 - I - 0x038476 0E:8466: C3        .byte $C3   ; 
- D 0 - I - 0x038477 0E:8467: C3        .byte $C3   ; 
- D 0 - I - 0x038478 0E:8468: D0        .byte $D0   ; 
- D 0 - I - 0x038479 0E:8469: 00        .byte $00   ; 
C D 0 - - - 0x03847A 0E:846A: A9 00     LDA #$00
C - - - - - 0x03847C 0E:846C: 8D 28 06  STA ram_0628
C - - - - - 0x03847F 0E:846F: AD 3C 04  LDA ram_043C
C - - - - - 0x038482 0E:8472: 29 3F     AND #$3F
C - - - - - 0x038484 0E:8474: D0 22     BNE $8498
C - - - - - 0x038486 0E:8476: AE 35 06  LDX ram_0635
C - - - - - 0x038489 0E:8479: AC 37 06  LDY ram_0637
C - - - - - 0x03848C 0E:847C: 20 99 84  JSR $8499
C - - - - - 0x03848F 0E:847F: AA        TAX
C - - - - - 0x038490 0E:8480: D0 16     BNE $8498
C - - - - - 0x038492 0E:8482: AD 38 06  LDA ram_0638
C - - - - - 0x038495 0E:8485: 20 36 C5  JSR $C536
C - - - - - 0x038498 0E:8488: 20 99 84  JSR $8499
C - - - - - 0x03849B 0E:848B: C9 00     CMP #$00
C - - - - - 0x03849D 0E:848D: F0 09     BEQ $8498
C - - - - - 0x03849F 0E:848F: C9 04     CMP #$04
C - - - - - 0x0384A1 0E:8491: F0 05     BEQ $8498
C - - - - - 0x0384A3 0E:8493: A9 80     LDA #$80
C - - - - - 0x0384A5 0E:8495: 8D 28 06  STA ram_0628
C - - - - - 0x0384A8 0E:8498: 60        RTS
C - - - - - 0x0384A9 0E:8499: AD FB 05  LDA ram_05FB
C - - - - - 0x0384AC 0E:849C: D0 04     BNE $84A2
C - - - - - 0x0384AE 0E:849E: 8A        TXA
C - - - - - 0x0384AF 0E:849F: 49 FF     EOR #$FF
C - - - - - 0x0384B1 0E:84A1: AA        TAX
C - - - - - 0x0384B2 0E:84A2: E0 60     CPX #$60
C - - - - - 0x0384B4 0E:84A4: B0 18     BCS $84BE
C - - - - - 0x0384B6 0E:84A6: 98        TYA
C - - - - - 0x0384B7 0E:84A7: 10 02     BPL $84AB
C - - - - - 0x0384B9 0E:84A9: 49 FF     EOR #$FF
C - - - - - 0x0384BB 0E:84AB: A8        TAY
C - - - - - 0x0384BC 0E:84AC: 20 39 C5  JSR $C539
C - - - - - 0x0384BF 0E:84AF: A2 00     LDX #$00
C - - - - - 0x0384C1 0E:84B1: DD BE 8B  CMP $8BBE,X
C - - - - - 0x0384C4 0E:84B4: F0 04     BEQ $84BA
C - - - - - 0x0384C6 0E:84B6: E8        INX
C - - - - - 0x0384C7 0E:84B7: E8        INX
C - - - - - 0x0384C8 0E:84B8: D0 F7     BNE $84B1
C - - - - - 0x0384CA 0E:84BA: BD BF 8B  LDA $8BBF,X
C - - - - - 0x0384CD 0E:84BD: 60        RTS
C - - - - - 0x0384CE 0E:84BE: 68        PLA
C - - - - - 0x0384CF 0E:84BF: 68        PLA
C - - - - - 0x0384D0 0E:84C0: 60        RTS
C - - - - - 0x0384D1 0E:84C1: AD FB 05  LDA ram_05FB
C - - - - - 0x0384D4 0E:84C4: F0 2D     BEQ $84F3
C - - - - - 0x0384D6 0E:84C6: A9 00     LDA #$00
C - - - - - 0x0384D8 0E:84C8: 8D 3C 04  STA ram_043C
C - - - - - 0x0384DB 0E:84CB: 8D 3E 04  STA ram_043E
C - - - - - 0x0384DE 0E:84CE: A2 00     LDX #$00
C - - - - - 0x0384E0 0E:84D0: AD E2 00  LDA a: ram_00E2
C - - - - - 0x0384E3 0E:84D3: C9 1F     CMP #$1F
C - - - - - 0x0384E5 0E:84D5: B0 08     BCS $84DF
C - - - - - 0x0384E7 0E:84D7: 20 20 8A  JSR $8A20
C - - - - - 0x0384EA 0E:84DA: 20 09 8A  JSR $8A09
C - - - - - 0x0384ED 0E:84DD: A2 01     LDX #$01
C - - - - - 0x0384EF 0E:84DF: 8E 3B 04  STX ram_043B
C - - - - - 0x0384F2 0E:84E2: AD 41 04  LDA ram_0441
C - - - - - 0x0384F5 0E:84E5: 20 06 8C  JSR $8C06
C - - - - - 0x0384F8 0E:84E8: AD 30 04  LDA ram_0430
C - - - - - 0x0384FB 0E:84EB: F0 03     BEQ $84F0
C - - - - - 0x0384FD 0E:84ED: AD 31 04  LDA ram_0431
C - - - - - 0x038500 0E:84F0: 8D 3C 04  STA ram_043C
C - - - - - 0x038503 0E:84F3: AD E3 00  LDA a: ram_00E3
C - - - - - 0x038506 0E:84F6: 29 01     AND #$01
C - - - - - 0x038508 0E:84F8: 4D 12 06  EOR ram_0612
C - - - - - 0x03850B 0E:84FB: 8D 12 06  STA ram_0612
C - - - - - 0x03850E 0E:84FE: 60        RTS
C D 0 - - - 0x03850F 0E:84FF: AE FB 05  LDX ram_05FB
C - - - - - 0x038512 0E:8502: F0 02     BEQ $8506
C - - - - - 0x038514 0E:8504: A2 03     LDX #$03
C - - - - - 0x038516 0E:8506: AD E2 00  LDA a: ram_00E2
C - - - - - 0x038519 0E:8509: 6D E3 00  ADC a: ram_00E3
C - - - - - 0x03851C 0E:850C: A0 00     LDY #$00
C - - - - - 0x03851E 0E:850E: DD 28 85  CMP $8528,X
C - - - - - 0x038521 0E:8511: B0 04     BCS $8517
C - - - - - 0x038523 0E:8513: C8        INY
C - - - - - 0x038524 0E:8514: E8        INX
C - - - - - 0x038525 0E:8515: D0 F7     BNE $850E
C - - - - - 0x038527 0E:8517: 98        TYA
C - - - - - 0x038528 0E:8518: 18        CLC
C - - - - - 0x038529 0E:8519: 69 07     ADC #$07
C - - - - - 0x03852B 0E:851B: AE FB 05  LDX ram_05FB
C - - - - - 0x03852E 0E:851E: F0 04     BEQ $8524
C - - - - - 0x038530 0E:8520: 8D 3B 04  STA ram_043B
C - - - - - 0x038533 0E:8523: 60        RTS
C - - - - - 0x038534 0E:8524: 8D 3D 04  STA ram_043D
C - - - - - 0x038537 0E:8527: 60        RTS
- D 0 - - - 0x038538 0E:8528: B3        .byte $B3   ; 
- D 0 - - - 0x038539 0E:8529: 4F        .byte $4F   ; <O>
- D 0 - - - 0x03853A 0E:852A: 00        .byte $00   ; 
- D 0 - - - 0x03853B 0E:852B: AA        .byte $AA   ; 
- D 0 - - - 0x03853C 0E:852C: 54        .byte $54   ; <T>
- D 0 - - - 0x03853D 0E:852D: 00        .byte $00   ; 
C D 0 - - - 0x03853E 0E:852E: A0 06     LDY #$06
C - - - - - 0x038540 0E:8530: B1 38     LDA (ram_0038),Y
C - - - - - 0x038542 0E:8532: 29 01     AND #$01
C - - - - - 0x038544 0E:8534: 0A        ASL
C - - - - - 0x038545 0E:8535: 6D 1E 06  ADC ram_061E
C - - - - - 0x038548 0E:8538: 8D 1E 06  STA ram_061E
C - - - - - 0x03854B 0E:853B: B1 38     LDA (ram_0038),Y
C - - - - - 0x03854D 0E:853D: 4A        LSR
C - - - - - 0x03854E 0E:853E: 4A        LSR
C - - - - - 0x03854F 0E:853F: 4A        LSR
C - - - - - 0x038550 0E:8540: 4A        LSR
C - - - - - 0x038551 0E:8541: 18        CLC
C - - - - - 0x038552 0E:8542: 69 0A     ADC #$0A
C - - - - - 0x038554 0E:8544: 8D 41 04  STA ram_0441
C - - - - - 0x038557 0E:8547: A9 00     LDA #$00
C - - - - - 0x038559 0E:8549: 85 3C     STA ram_003C
C - - - - - 0x03855B 0E:854B: A0 07     LDY #$07
C - - - - - 0x03855D 0E:854D: B1 38     LDA (ram_0038),Y
C - - - - - 0x03855F 0E:854F: 20 EB 8A  JSR $8AEB
C - - - - - 0x038562 0E:8552: 18        CLC
C - - - - - 0x038563 0E:8553: A5 3C     LDA ram_003C
C - - - - - 0x038565 0E:8555: 69 2E     ADC #$2E
C - - - - - 0x038567 0E:8557: 85 3C     STA ram_003C
C - - - - - 0x038569 0E:8559: 8A        TXA
C - - - - - 0x03856A 0E:855A: 69 B1     ADC #$B1
C - - - - - 0x03856C 0E:855C: 85 3D     STA ram_003D
C - - - - - 0x03856E 0E:855E: A9 00     LDA #$00
C - - - - - 0x038570 0E:8560: 8D 3C 04  STA ram_043C
C - - - - - 0x038573 0E:8563: 85 3E     STA ram_003E
C - - - - - 0x038575 0E:8565: 20 0B 8B  JSR $8B0B
C - - - - - 0x038578 0E:8568: 8D 3B 04  STA ram_043B
C - - - - - 0x03857B 0E:856B: AD 3B 04  LDA ram_043B
C - - - - - 0x03857E 0E:856E: 20 09 C5  JSR $C509
- - - - - - 0x038581 0E:8571: DF        .byte $DF   ; 
- - - - - - 0x038582 0E:8572: 87        .byte $87   ; 
- D 0 - I - 0x038583 0E:8573: E9        .byte $E9   ; 
- D 0 - I - 0x038584 0E:8574: 87        .byte $87   ; 
- D 0 - I - 0x038585 0E:8575: 83        .byte $83   ; 
- D 0 - I - 0x038586 0E:8576: 85        .byte $85   ; 
- - - - - - 0x038587 0E:8577: 83        .byte $83   ; 
- - - - - - 0x038588 0E:8578: 85        .byte $85   ; 
- D 0 - I - 0x038589 0E:8579: 83        .byte $83   ; 
- D 0 - I - 0x03858A 0E:857A: 85        .byte $85   ; 
- - - - - - 0x03858B 0E:857B: 83        .byte $83   ; 
- - - - - - 0x03858C 0E:857C: 85        .byte $85   ; 
- - - - - - 0x03858D 0E:857D: 83        .byte $83   ; 
- - - - - - 0x03858E 0E:857E: 85        .byte $85   ; 
- - - - - - 0x03858F 0E:857F: 83        .byte $83   ; 
- - - - - - 0x038590 0E:8580: 85        .byte $85   ; 
- - - - - - 0x038591 0E:8581: 83        .byte $83   ; 
- - - - - - 0x038592 0E:8582: 85        .byte $85   ; 
C - - J - - 0x038593 0E:8583: A0 08     LDY #$08
C - - - - - 0x038595 0E:8585: B1 38     LDA (ram_0038),Y
C - - - - - 0x038597 0E:8587: 20 5E 89  JSR $895E
C - - - - - 0x03859A 0E:858A: 4A        LSR
C - - - - - 0x03859B 0E:858B: 4A        LSR
C - - - - - 0x03859C 0E:858C: C9 0F     CMP #$0F
C - - - - - 0x03859E 0E:858E: D0 06     BNE $8596
- - - - - - 0x0385A0 0E:8590: 20        .byte $20   ; 
- - - - - - 0x0385A1 0E:8591: 20        .byte $20   ; 
- - - - - - 0x0385A2 0E:8592: 8A        .byte $8A   ; 
- - - - - - 0x0385A3 0E:8593: 4C        .byte $4C   ; <L>
- - - - - - 0x0385A4 0E:8594: 99        .byte $99   ; 
- - - - - - 0x0385A5 0E:8595: 85        .byte $85   ; 
C - - - - - 0x0385A6 0E:8596: 18        CLC
C - - - - - 0x0385A7 0E:8597: 69 0A     ADC #$0A
C - - - - - 0x0385A9 0E:8599: CD 41 04  CMP ram_0441
C - - - - - 0x0385AC 0E:859C: D0 09     BNE $85A7
C - - - - - 0x0385AE 0E:859E: 18        CLC
C - - - - - 0x0385AF 0E:859F: 69 01     ADC #$01
C - - - - - 0x0385B1 0E:85A1: C9 16     CMP #$16
C - - - - - 0x0385B3 0E:85A3: 90 02     BCC $85A7
- - - - - - 0x0385B5 0E:85A5: A9        .byte $A9   ; 
- - - - - - 0x0385B6 0E:85A6: 0C        .byte $0C   ; 
C - - - - - 0x0385B7 0E:85A7: 20 09 8A  JSR $8A09
C - - - - - 0x0385BA 0E:85AA: A9 01     LDA #$01
C - - - - - 0x0385BC 0E:85AC: 8D 3B 04  STA ram_043B
C - - - - - 0x0385BF 0E:85AF: A9 00     LDA #$00
C - - - - - 0x0385C1 0E:85B1: 8D 3C 04  STA ram_043C
C - - - - - 0x0385C4 0E:85B4: 60        RTS
C D 0 - - - 0x0385C5 0E:85B5: A9 00     LDA #$00
C - - - - - 0x0385C7 0E:85B7: 85 3D     STA ram_003D
C - - - - - 0x0385C9 0E:85B9: AE 21 06  LDX ram_0621
C - - - - - 0x0385CC 0E:85BC: BC 04 86  LDY $8604,X
C - - - - - 0x0385CF 0E:85BF: 98        TYA
C - - - - - 0x0385D0 0E:85C0: 0A        ASL
C - - - - - 0x0385D1 0E:85C1: 0A        ASL
C - - - - - 0x0385D2 0E:85C2: 85 3E     STA ram_003E
C - - - - - 0x0385D4 0E:85C4: C8        INY
C - - - - - 0x0385D5 0E:85C5: C8        INY
C - - - - - 0x0385D6 0E:85C6: C8        INY
C - - - - - 0x0385D7 0E:85C7: C8        INY
C - - - - - 0x0385D8 0E:85C8: B1 3A     LDA (ram_003A),Y
C - - - - - 0x0385DA 0E:85CA: 0A        ASL
C - - - - - 0x0385DB 0E:85CB: 26 3D     ROL ram_003D
C - - - - - 0x0385DD 0E:85CD: 0A        ASL
C - - - - - 0x0385DE 0E:85CE: 26 3D     ROL ram_003D
C - - - - - 0x0385E0 0E:85D0: 85 3C     STA ram_003C
C - - - - - 0x0385E2 0E:85D2: A6 3D     LDX ram_003D
C - - - - - 0x0385E4 0E:85D4: 0A        ASL
C - - - - - 0x0385E5 0E:85D5: 26 3D     ROL ram_003D
C - - - - - 0x0385E7 0E:85D7: 65 3C     ADC ram_003C
C - - - - - 0x0385E9 0E:85D9: 85 3C     STA ram_003C
C - - - - - 0x0385EB 0E:85DB: 8A        TXA
C - - - - - 0x0385EC 0E:85DC: 65 3D     ADC ram_003D
C - - - - - 0x0385EE 0E:85DE: AA        TAX
C - - - - - 0x0385EF 0E:85DF: A5 3C     LDA ram_003C
C - - - - - 0x0385F1 0E:85E1: 18        CLC
C - - - - - 0x0385F2 0E:85E2: 69 2E     ADC #$2E
C - - - - - 0x0385F4 0E:85E4: 85 3C     STA ram_003C
C - - - - - 0x0385F6 0E:85E6: 8A        TXA
C - - - - - 0x0385F7 0E:85E7: 69 BA     ADC #$BA
C - - - - - 0x0385F9 0E:85E9: 85 3D     STA ram_003D
C - - - - - 0x0385FB 0E:85EB: 20 0B 8B  JSR $8B0B
C - - - - - 0x0385FE 0E:85EE: 8D 3D 04  STA ram_043D
C - - - - - 0x038601 0E:85F1: AA        TAX
C - - - - - 0x038602 0E:85F2: AD 42 04  LDA ram_0442
C - - - - - 0x038605 0E:85F5: 20 A6 8D  JSR $8DA6
C - - - - - 0x038608 0E:85F8: AD 30 04  LDA ram_0430
C - - - - - 0x03860B 0E:85FB: F0 03     BEQ $8600
C - - - - - 0x03860D 0E:85FD: AD 31 04  LDA ram_0431
C - - - - - 0x038610 0E:8600: 8D 3E 04  STA ram_043E
C - - - - - 0x038613 0E:8603: 60        RTS
- D 0 - - - 0x038614 0E:8604: 00        .byte $00   ; 
- D 0 - - - 0x038615 0E:8605: 01        .byte $01   ; 
- - - - - - 0x038616 0E:8606: FF        .byte $FF   ; 
- D 0 - - - 0x038617 0E:8607: 02        .byte $02   ; 
- D 0 - - - 0x038618 0E:8608: 00        .byte $00   ; 
C D 0 - - - 0x038619 0E:8609: AD FB 05  LDA ram_05FB
C - - - - - 0x03861C 0E:860C: F0 03     BEQ $8611
C - - - - - 0x03861E 0E:860E: 4C 5D 87  JMP $875D
C - - - - - 0x038621 0E:8611: AD 00 06  LDA ram_0600
C - - - - - 0x038624 0E:8614: F0 28     BEQ $863E
C - - - - - 0x038626 0E:8616: A9 00     LDA #$00
C - - - - - 0x038628 0E:8618: 48        PHA
C - - - - - 0x038629 0E:8619: A9 01     LDA #$01
C - - - - - 0x03862B 0E:861B: 20 15 C5  JSR $C515
C - - - - - 0x03862E 0E:861E: 68        PLA
C - - - - - 0x03862F 0E:861F: 48        PHA
C - - - - - 0x038630 0E:8620: 85 40     STA ram_0040
C - - - - - 0x038632 0E:8622: AA        TAX
C - - - - - 0x038633 0E:8623: BD 01 06  LDA ram_0601,X
C - - - - - 0x038636 0E:8626: 20 3F 86  JSR $863F
C - - - - - 0x038639 0E:8629: 68        PLA
C - - - - - 0x03863A 0E:862A: AA        TAX
C - - - - - 0x03863B 0E:862B: AD 3D 04  LDA ram_043D
C - - - - - 0x03863E 0E:862E: 9D 0B 06  STA ram_060B,X
C - - - - - 0x038641 0E:8631: AD 3E 04  LDA ram_043E
C - - - - - 0x038644 0E:8634: 9D 06 06  STA ram_0606,X
C - - - - - 0x038647 0E:8637: E8        INX
C - - - - - 0x038648 0E:8638: 8A        TXA
C - - - - - 0x038649 0E:8639: CD 00 06  CMP ram_0600
C - - - - - 0x03864C 0E:863C: D0 DA     BNE $8618
C - - - - - 0x03864E 0E:863E: 60        RTS
C - - - - - 0x03864F 0E:863F: 8D 42 04  STA ram_0442
C - - - - - 0x038652 0E:8642: 20 62 8A  JSR $8A62
C - - - - - 0x038655 0E:8645: A9 00     LDA #$00
C - - - - - 0x038657 0E:8647: 85 3C     STA ram_003C
C - - - - - 0x038659 0E:8649: AD 42 04  LDA ram_0442
C - - - - - 0x03865C 0E:864C: C9 0B     CMP #$0B
C - - - - - 0x03865E 0E:864E: D0 03     BNE $8653
C - - - - - 0x038660 0E:8650: 4C B5 85  JMP $85B5
C - - - - - 0x038663 0E:8653: AC 21 06  LDY ram_0621
C - - - - - 0x038666 0E:8656: B9 B5 86  LDA $86B5,Y
C - - - - - 0x038669 0E:8659: 85 3C     STA ram_003C
C - - - - - 0x03866B 0E:865B: F0 06     BEQ $8663
C - - - - - 0x03866D 0E:865D: 20 B3 8A  JSR $8AB3
C - - - - - 0x038670 0E:8660: 4C 8E 86  JMP $868E
C - - - - - 0x038673 0E:8663: AD 35 06  LDA ram_0635
C - - - - - 0x038676 0E:8666: 49 FF     EOR #$FF
C - - - - - 0x038678 0E:8668: AA        TAX
C - - - - - 0x038679 0E:8669: A9 14     LDA #$14
C - - - - - 0x03867B 0E:866B: E0 A0     CPX #$A0
C - - - - - 0x03867D 0E:866D: B0 1F     BCS $868E
C - - - - - 0x03867F 0E:866F: A9 10     LDA #$10
C - - - - - 0x038681 0E:8671: E0 60     CPX #$60
C - - - - - 0x038683 0E:8673: B0 19     BCS $868E
C - - - - - 0x038685 0E:8675: AD 37 06  LDA ram_0637
C - - - - - 0x038688 0E:8678: 10 02     BPL $867C
C - - - - - 0x03868A 0E:867A: 49 FF     EOR #$FF
C - - - - - 0x03868C 0E:867C: A8        TAY
C - - - - - 0x03868D 0E:867D: 20 39 C5  JSR $C539
C - - - - - 0x038690 0E:8680: A2 00     LDX #$00
C - - - - - 0x038692 0E:8682: DD BE 8B  CMP $8BBE,X
C - - - - - 0x038695 0E:8685: F0 04     BEQ $868B
C - - - - - 0x038697 0E:8687: E8        INX
C - - - - - 0x038698 0E:8688: E8        INX
C - - - - - 0x038699 0E:8689: D0 F7     BNE $8682
C - - - - - 0x03869B 0E:868B: BD BF 8B  LDA $8BBF,X
C D 0 - - - 0x03869E 0E:868E: A0 07     LDY #$07
C - - - - - 0x0386A0 0E:8690: 20 DE 8A  JSR $8ADE
C - - - - - 0x0386A3 0E:8693: 18        CLC
C - - - - - 0x0386A4 0E:8694: A5 3C     LDA ram_003C
C - - - - - 0x0386A6 0E:8696: 69 AE     ADC #$AE
C - - - - - 0x0386A8 0E:8698: 85 3C     STA ram_003C
C - - - - - 0x0386AA 0E:869A: 8A        TXA
C - - - - - 0x0386AB 0E:869B: 69 B8     ADC #$B8
C - - - - - 0x0386AD 0E:869D: 85 3D     STA ram_003D
C - - - - - 0x0386AF 0E:869F: 20 0B 8B  JSR $8B0B
C - - - - - 0x0386B2 0E:86A2: 8D 3D 04  STA ram_043D
C - - - - - 0x0386B5 0E:86A5: A9 00     LDA #$00
C - - - - - 0x0386B7 0E:86A7: 8D 3E 04  STA ram_043E
C - - - - - 0x0386BA 0E:86AA: A5 3F     LDA ram_003F
C - - - - - 0x0386BC 0E:86AC: 20 09 C5  JSR $C509
- D 0 - I - 0x0386BF 0E:86AF: BA        .byte $BA   ; 
- D 0 - I - 0x0386C0 0E:86B0: 86        .byte $86   ; 
- D 0 - I - 0x0386C1 0E:86B1: EB        .byte $EB   ; 
- D 0 - I - 0x0386C2 0E:86B2: 86        .byte $86   ; 
- D 0 - I - 0x0386C3 0E:86B3: 10        .byte $10   ; 
- D 0 - I - 0x0386C4 0E:86B4: 87        .byte $87   ; 
- D 0 - - - 0x0386C5 0E:86B5: 00        .byte $00   ; 
- D 0 - - - 0x0386C6 0E:86B6: 02        .byte $02   ; 
- D 0 - - - 0x0386C7 0E:86B7: 01        .byte $01   ; 
- - - - - - 0x0386C8 0E:86B8: 00        .byte $00   ; 
- - - - - - 0x0386C9 0E:86B9: 00        .byte $00   ; 
C - - J - - 0x0386CA 0E:86BA: AD 3D 04  LDA ram_043D
C - - - - - 0x0386CD 0E:86BD: 20 09 C5  JSR $C509
- D 0 - I - 0x0386D0 0E:86C0: C8        .byte $C8   ; 
- D 0 - I - 0x0386D1 0E:86C1: 86        .byte $86   ; 
- D 0 - I - 0x0386D2 0E:86C2: D0        .byte $D0   ; 
- D 0 - I - 0x0386D3 0E:86C3: 86        .byte $86   ; 
- D 0 - I - 0x0386D4 0E:86C4: D8        .byte $D8   ; 
- D 0 - I - 0x0386D5 0E:86C5: 86        .byte $86   ; 
- D 0 - I - 0x0386D6 0E:86C6: E0        .byte $E0   ; 
- D 0 - I - 0x0386D7 0E:86C7: 86        .byte $86   ; 
C - - J - - 0x0386D8 0E:86C8: A9 01     LDA #$01
C - - - - - 0x0386DA 0E:86CA: 8D 3D 04  STA ram_043D
C - - - - - 0x0386DD 0E:86CD: 4C 32 87  JMP $8732
C D 0 J - - 0x0386E0 0E:86D0: A9 02     LDA #$02
C - - - - - 0x0386E2 0E:86D2: 8D 3D 04  STA ram_043D
C - - - - - 0x0386E5 0E:86D5: 4C 32 87  JMP $8732
C - - J - - 0x0386E8 0E:86D8: A9 00     LDA #$00
C - - - - - 0x0386EA 0E:86DA: 8D 3D 04  STA ram_043D
C - - - - - 0x0386ED 0E:86DD: 4C 32 87  JMP $8732
C - - J - - 0x0386F0 0E:86E0: A9 01     LDA #$01
C - - - - - 0x0386F2 0E:86E2: 8D 3D 04  STA ram_043D
C - - - - - 0x0386F5 0E:86E5: A9 05     LDA #$05
C - - - - - 0x0386F7 0E:86E7: 8D 3E 04  STA ram_043E
C - - - - - 0x0386FA 0E:86EA: 60        RTS
C - - J - - 0x0386FB 0E:86EB: AD 3D 04  LDA ram_043D
C - - - - - 0x0386FE 0E:86EE: 20 09 C5  JSR $C509
- D 0 - I - 0x038701 0E:86F1: F9        .byte $F9   ; 
- D 0 - I - 0x038702 0E:86F2: 86        .byte $86   ; 
- D 0 - I - 0x038703 0E:86F3: FF        .byte $FF   ; 
- D 0 - I - 0x038704 0E:86F4: 86        .byte $86   ; 
- D 0 - I - 0x038705 0E:86F5: 05        .byte $05   ; 
- D 0 - I - 0x038706 0E:86F6: 87        .byte $87   ; 
- D 0 - I - 0x038707 0E:86F7: 08        .byte $08   ; 
- D 0 - I - 0x038708 0E:86F8: 87        .byte $87   ; 
C D 0 - - - 0x038709 0E:86F9: A9 05     LDA #$05
C - - - - - 0x03870B 0E:86FB: 8D 3D 04  STA ram_043D
C - - - - - 0x03870E 0E:86FE: 60        RTS
C - - J - - 0x03870F 0E:86FF: A9 04     LDA #$04
C - - - - - 0x038711 0E:8701: 8D 3D 04  STA ram_043D
C - - - - - 0x038714 0E:8704: 60        RTS
C - - J - - 0x038715 0E:8705: 4C D0 86  JMP $86D0
C - - J - - 0x038718 0E:8708: A9 01     LDA #$01
C - - - - - 0x03871A 0E:870A: 8D 3E 04  STA ram_043E
C - - - - - 0x03871D 0E:870D: 4C FF 86  JMP $86FF
C - - J - - 0x038720 0E:8710: AD 3D 04  LDA ram_043D
C - - - - - 0x038723 0E:8713: 20 09 C5  JSR $C509
- D 0 - I - 0x038726 0E:8716: 1E        .byte $1E   ; 
- D 0 - I - 0x038727 0E:8717: 87        .byte $87   ; 
- D 0 - I - 0x038728 0E:8718: 21        .byte $21   ; 
- D 0 - I - 0x038729 0E:8719: 87        .byte $87   ; 
- D 0 - I - 0x03872A 0E:871A: 27        .byte $27   ; 
- D 0 - I - 0x03872B 0E:871B: 87        .byte $87   ; 
- D 0 - I - 0x03872C 0E:871C: 2A        .byte $2A   ; 
- D 0 - I - 0x03872D 0E:871D: 87        .byte $87   ; 
C - - J - - 0x03872E 0E:871E: 4C F9 86  JMP $86F9
C - - J - - 0x038731 0E:8721: A9 03     LDA #$03
C - - - - - 0x038733 0E:8723: 8D 3D 04  STA ram_043D
C - - - - - 0x038736 0E:8726: 60        RTS
C - - J - - 0x038737 0E:8727: 4C D0 86  JMP $86D0
C - - J - - 0x03873A 0E:872A: A9 01     LDA #$01
C - - - - - 0x03873C 0E:872C: 8D 3E 04  STA ram_043E
C - - - - - 0x03873F 0E:872F: 4C 21 87  JMP $8721
C D 0 - - - 0x038742 0E:8732: AD 42 04  LDA ram_0442
C - - - - - 0x038745 0E:8735: AE 3D 04  LDX ram_043D
C - - - - - 0x038748 0E:8738: 20 58 8D  JSR $8D58
C - - - - - 0x03874B 0E:873B: AD 30 04  LDA ram_0430
C - - - - - 0x03874E 0E:873E: F0 03     BEQ $8743
C - - - - - 0x038750 0E:8740: AD 31 04  LDA ram_0431
C - - - - - 0x038753 0E:8743: 8D 3E 04  STA ram_043E
C - - - - - 0x038756 0E:8746: 60        RTS
- - - - - - 0x038757 0E:8747: 03        .byte $03   ; 
- - - - - - 0x038758 0E:8748: 04        .byte $04   ; 
- - - - - - 0x038759 0E:8749: 04        .byte $04   ; 
- - - - - - 0x03875A 0E:874A: 04        .byte $04   ; 
- - - - - - 0x03875B 0E:874B: 04        .byte $04   ; 
- - - - - - 0x03875C 0E:874C: 05        .byte $05   ; 
- - - - - - 0x03875D 0E:874D: 06        .byte $06   ; 
- - - - - - 0x03875E 0E:874E: 05        .byte $05   ; 
- - - - - - 0x03875F 0E:874F: 06        .byte $06   ; 
- - - - - - 0x038760 0E:8750: 05        .byte $05   ; 
- - - - - - 0x038761 0E:8751: 06        .byte $06   ; 
- - - - - - 0x038762 0E:8752: 00        .byte $00   ; 
- - - - - - 0x038763 0E:8753: 06        .byte $06   ; 
- - - - - - 0x038764 0E:8754: 06        .byte $06   ; 
- - - - - - 0x038765 0E:8755: 06        .byte $06   ; 
- - - - - - 0x038766 0E:8756: 06        .byte $06   ; 
- - - - - - 0x038767 0E:8757: 07        .byte $07   ; 
- - - - - - 0x038768 0E:8758: 08        .byte $08   ; 
- - - - - - 0x038769 0E:8759: 07        .byte $07   ; 
- - - - - - 0x03876A 0E:875A: 08        .byte $08   ; 
- - - - - - 0x03876B 0E:875B: 07        .byte $07   ; 
- - - - - - 0x03876C 0E:875C: 08        .byte $08   ; 
C D 0 - - - 0x03876D 0E:875D: AD 41 04  LDA ram_0441
C - - - - - 0x038770 0E:8760: 20 62 8A  JSR $8A62
C - - - - - 0x038773 0E:8763: AC 21 06  LDY ram_0621
C - - - - - 0x038776 0E:8766: B9 C3 87  LDA $87C3,Y
C - - - - - 0x038779 0E:8769: 85 3C     STA ram_003C
C - - - - - 0x03877B 0E:876B: F0 06     BEQ $8773
C - - - - - 0x03877D 0E:876D: 20 B3 8A  JSR $8AB3
C - - - - - 0x038780 0E:8770: 4C 9C 87  JMP $879C
C - - - - - 0x038783 0E:8773: A9 14     LDA #$14
C - - - - - 0x038785 0E:8775: AE 35 06  LDX ram_0635
C - - - - - 0x038788 0E:8778: E0 A0     CPX #$A0
C - - - - - 0x03878A 0E:877A: B0 20     BCS $879C
C - - - - - 0x03878C 0E:877C: A9 10     LDA #$10
C - - - - - 0x03878E 0E:877E: E0 60     CPX #$60
C - - - - - 0x038790 0E:8780: B0 1A     BCS $879C
C - - - - - 0x038792 0E:8782: AC 37 06  LDY ram_0637
C - - - - - 0x038795 0E:8785: 10 04     BPL $878B
C - - - - - 0x038797 0E:8787: 98        TYA
C - - - - - 0x038798 0E:8788: 49 FF     EOR #$FF
C - - - - - 0x03879A 0E:878A: A8        TAY
C - - - - - 0x03879B 0E:878B: 20 39 C5  JSR $C539
C - - - - - 0x03879E 0E:878E: A2 00     LDX #$00
C - - - - - 0x0387A0 0E:8790: DD BE 8B  CMP $8BBE,X
C - - - - - 0x0387A3 0E:8793: F0 04     BEQ $8799
C - - - - - 0x0387A5 0E:8795: E8        INX
C - - - - - 0x0387A6 0E:8796: E8        INX
C - - - - - 0x0387A7 0E:8797: D0 F7     BNE $8790
C - - - - - 0x0387A9 0E:8799: BD BF 8B  LDA $8BBF,X
C D 0 - - - 0x0387AC 0E:879C: A0 04     LDY #$04
C - - - - - 0x0387AE 0E:879E: 20 DE 8A  JSR $8ADE
C - - - - - 0x0387B1 0E:87A1: 18        CLC
C - - - - - 0x0387B2 0E:87A2: A5 3C     LDA ram_003C
C - - - - - 0x0387B4 0E:87A4: 69 2E     ADC #$2E
C - - - - - 0x0387B6 0E:87A6: 85 3C     STA ram_003C
C - - - - - 0x0387B8 0E:87A8: 8A        TXA
C - - - - - 0x0387B9 0E:87A9: 69 B1     ADC #$B1
C - - - - - 0x0387BB 0E:87AB: 85 3D     STA ram_003D
C - - - - - 0x0387BD 0E:87AD: 20 0B 8B  JSR $8B0B
C - - - - - 0x0387C0 0E:87B0: 8D 3B 04  STA ram_043B
C - - - - - 0x0387C3 0E:87B3: A9 00     LDA #$00
C - - - - - 0x0387C5 0E:87B5: 8D 3C 04  STA ram_043C
C - - - - - 0x0387C8 0E:87B8: A5 3F     LDA ram_003F
C - - - - - 0x0387CA 0E:87BA: 20 09 C5  JSR $C509
- D 0 - I - 0x0387CD 0E:87BD: C7        .byte $C7   ; 
- D 0 - I - 0x0387CE 0E:87BE: 87        .byte $87   ; 
- D 0 - I - 0x0387CF 0E:87BF: DA        .byte $DA   ; 
- D 0 - I - 0x0387D0 0E:87C0: 88        .byte $88   ; 
- D 0 - I - 0x0387D1 0E:87C1: FD        .byte $FD   ; 
- D 0 - I - 0x0387D2 0E:87C2: 88        .byte $88   ; 
- D 0 - - - 0x0387D3 0E:87C3: 00        .byte $00   ; 
- D 0 - - - 0x0387D4 0E:87C4: 01        .byte $01   ; 
- D 0 - - - 0x0387D5 0E:87C5: 02        .byte $02   ; 
- D 0 - - - 0x0387D6 0E:87C6: 00        .byte $00   ; 
C - - J - - 0x0387D7 0E:87C7: AD 3B 04  LDA ram_043B
C - - - - - 0x0387DA 0E:87CA: 20 09 C5  JSR $C509
- - - - - - 0x0387DD 0E:87CD: DF        .byte $DF   ; 
- - - - - - 0x0387DE 0E:87CE: 87        .byte $87   ; 
- D 0 - I - 0x0387DF 0E:87CF: E9        .byte $E9   ; 
- D 0 - I - 0x0387E0 0E:87D0: 87        .byte $87   ; 
- D 0 - I - 0x0387E1 0E:87D1: EF        .byte $EF   ; 
- D 0 - I - 0x0387E2 0E:87D2: 87        .byte $87   ; 
- D 0 - I - 0x0387E3 0E:87D3: F2        .byte $F2   ; 
- D 0 - I - 0x0387E4 0E:87D4: 87        .byte $87   ; 
- D 0 - I - 0x0387E5 0E:87D5: FA        .byte $FA   ; 
- D 0 - I - 0x0387E6 0E:87D6: 87        .byte $87   ; 
- D 0 - I - 0x0387E7 0E:87D7: 4A        .byte $4A   ; <J>
- D 0 - I - 0x0387E8 0E:87D8: 88        .byte $88   ; 
- D 0 - I - 0x0387E9 0E:87D9: 55        .byte $55   ; <U>
- D 0 - I - 0x0387EA 0E:87DA: 88        .byte $88   ; 
- D 0 - I - 0x0387EB 0E:87DB: 60        .byte $60   ; 
- D 0 - I - 0x0387EC 0E:87DC: 88        .byte $88   ; 
- D 0 - I - 0x0387ED 0E:87DD: A8        .byte $A8   ; 
- D 0 - I - 0x0387EE 0E:87DE: 88        .byte $88   ; 
- - - - - - 0x0387EF 0E:87DF: AD        .byte $AD   ; 
- - - - - - 0x0387F0 0E:87E0: E2        .byte $E2   ; 
- - - - - - 0x0387F1 0E:87E1: 00        .byte $00   ; 
- - - - - - 0x0387F2 0E:87E2: 29        .byte $29   ; 
- - - - - - 0x0387F3 0E:87E3: 20        .byte $20   ; 
- - - - - - 0x0387F4 0E:87E4: D0        .byte $D0   ; 
- - - - - - 0x0387F5 0E:87E5: 03        .byte $03   ; 
- - - - - - 0x0387F6 0E:87E6: 4C        .byte $4C   ; <L>
- - - - - - 0x0387F7 0E:87E7: 27        .byte $27   ; 
- - - - - - 0x0387F8 0E:87E8: 89        .byte $89   ; 
C - - J - - 0x0387F9 0E:87E9: 20 27 89  JSR $8927
C - - - - - 0x0387FC 0E:87EC: 4C 3F 8A  JMP $8A3F
C - - J - - 0x0387FF 0E:87EF: 4C 33 89  JMP $8933
C D 0 J - - 0x038802 0E:87F2: A9 02     LDA #$02
C - - - - - 0x038804 0E:87F4: 8D 3B 04  STA ram_043B
C - - - - - 0x038807 0E:87F7: 4C 3F 8A  JMP $8A3F
C - - J - - 0x03880A 0E:87FA: A9 03     LDA #$03
C - - - - - 0x03880C 0E:87FC: 8D 3B 04  STA ram_043B
C - - - - - 0x03880F 0E:87FF: 20 3F 8A  JSR $8A3F
C - - - - - 0x038812 0E:8802: AD 3C 04  LDA ram_043C
C - - - - - 0x038815 0E:8805: D0 42     BNE $8849
C - - - - - 0x038817 0E:8807: A9 0C     LDA #$0C
C - - - - - 0x038819 0E:8809: 85 3A     STA ram_003A
C - - - - - 0x03881B 0E:880B: A5 3A     LDA ram_003A
C - - - - - 0x03881D 0E:880D: CD 41 04  CMP ram_0441
C - - - - - 0x038820 0E:8810: F0 27     BEQ $8839
C - - - - - 0x038822 0E:8812: 20 0C C5  JSR $C50C
C - - - - - 0x038825 0E:8815: A0 06     LDY #$06
C - - - - - 0x038827 0E:8817: B1 34     LDA (ram_0034),Y
C - - - - - 0x038829 0E:8819: 38        SEC
C - - - - - 0x03882A 0E:881A: ED 35 06  SBC ram_0635
C - - - - - 0x03882D 0E:881D: B0 04     BCS $8823
C - - - - - 0x03882F 0E:881F: 49 FF     EOR #$FF
C - - - - - 0x038831 0E:8821: 69 01     ADC #$01
C - - - - - 0x038833 0E:8823: C9 14     CMP #$14
C - - - - - 0x038835 0E:8825: B0 12     BCS $8839
C - - - - - 0x038837 0E:8827: A0 08     LDY #$08
C - - - - - 0x038839 0E:8829: B1 34     LDA (ram_0034),Y
C - - - - - 0x03883B 0E:882B: 38        SEC
C - - - - - 0x03883C 0E:882C: ED 37 06  SBC ram_0637
C - - - - - 0x03883F 0E:882F: B0 04     BCS $8835
C - - - - - 0x038841 0E:8831: 49 FF     EOR #$FF
C - - - - - 0x038843 0E:8833: 69 01     ADC #$01
C - - - - - 0x038845 0E:8835: C9 14     CMP #$14
C - - - - - 0x038847 0E:8837: 90 0B     BCC $8844
C - - - - - 0x038849 0E:8839: E6 3A     INC ram_003A
C - - - - - 0x03884B 0E:883B: A5 3A     LDA ram_003A
C - - - - - 0x03884D 0E:883D: C9 16     CMP #$16
C - - - - - 0x03884F 0E:883F: D0 CA     BNE $880B
C - - - - - 0x038851 0E:8841: 4C F2 87  JMP $87F2
C - - - - - 0x038854 0E:8844: A5 3A     LDA ram_003A
C - - - - - 0x038856 0E:8846: 20 09 8A  JSR $8A09
C - - - - - 0x038859 0E:8849: 60        RTS
C - - J - - 0x03885A 0E:884A: A9 00     LDA #$00
C - - - - - 0x03885C 0E:884C: 8D 3B 04  STA ram_043B
C - - - - - 0x03885F 0E:884F: A9 0C     LDA #$0C
C - - - - - 0x038861 0E:8851: 8D 3C 04  STA ram_043C
C - - - - - 0x038864 0E:8854: 60        RTS
C - - J - - 0x038865 0E:8855: A9 00     LDA #$00
C - - - - - 0x038867 0E:8857: 8D 3B 04  STA ram_043B
C - - - - - 0x03886A 0E:885A: A9 0D     LDA #$0D
C - - - - - 0x03886C 0E:885C: 8D 3C 04  STA ram_043C
C - - - - - 0x03886F 0E:885F: 60        RTS
C - - J - - 0x038870 0E:8860: A9 02     LDA #$02
C - - - - - 0x038872 0E:8862: 8D 3B 04  STA ram_043B
C - - - - - 0x038875 0E:8865: 2C 4B 04  BIT ram_044B
C - - - - - 0x038878 0E:8868: 30 3D     BMI $88A7
C - - - - - 0x03887A 0E:886A: A9 80     LDA #$80
C - - - - - 0x03887C 0E:886C: 8D 4B 04  STA ram_044B
C - - - - - 0x03887F 0E:886F: A9 0C     LDA #$0C
C - - - - - 0x038881 0E:8871: 48        PHA
C - - - - - 0x038882 0E:8872: 20 0C C5  JSR $C50C
C - - - - - 0x038885 0E:8875: A0 01     LDY #$01
C - - - - - 0x038887 0E:8877: A9 80     LDA #$80
C - - - - - 0x038889 0E:8879: 91 34     STA (ram_0034),Y
C - - - - - 0x03888B 0E:887B: C8        INY
C - - - - - 0x03888C 0E:887C: A9 C8     LDA #$C8
C - - - - - 0x03888E 0E:887E: 91 34     STA (ram_0034),Y
C - - - - - 0x038890 0E:8880: 68        PLA
C - - - - - 0x038891 0E:8881: 18        CLC
C - - - - - 0x038892 0E:8882: 69 01     ADC #$01
C - - - - - 0x038894 0E:8884: C9 16     CMP #$16
C - - - - - 0x038896 0E:8886: D0 E9     BNE $8871
C - - - - - 0x038898 0E:8888: A9 01     LDA #$01
C - - - - - 0x03889A 0E:888A: 8D 2F 00  STA a: ram_002F
C - - - - - 0x03889D 0E:888D: A9 00     LDA #$00
C - - - - - 0x03889F 0E:888F: 8D 2D 06  STA ram_062D
C - - - - - 0x0388A2 0E:8892: AD 15 06  LDA ram_0615
C - - - - - 0x0388A5 0E:8895: 29 BF     AND #$BF
C - - - - - 0x0388A7 0E:8897: 8D 15 06  STA ram_0615
C - - - - - 0x0388AA 0E:889A: A9 15     LDA #$15
C - - - - - 0x0388AC 0E:889C: 20 4E C5  JSR $C54E
C - - - - - 0x0388AF 0E:889F: 2C 15 06  BIT ram_0615
C - - - - - 0x0388B2 0E:88A2: 10 03     BPL $88A7
C - - - - - 0x0388B4 0E:88A4: 20 75 C5  JSR $C575
C - - - - - 0x0388B7 0E:88A7: 60        RTS
C - - J - - 0x0388B8 0E:88A8: A9 02     LDA #$02
C - - - - - 0x0388BA 0E:88AA: 8D 3B 04  STA ram_043B
C - - - - - 0x0388BD 0E:88AD: 2C 4C 04  BIT ram_044C
C - - - - - 0x0388C0 0E:88B0: 30 27     BMI $88D9
C - - - - - 0x0388C2 0E:88B2: A9 80     LDA #$80
C - - - - - 0x0388C4 0E:88B4: 8D 4C 04  STA ram_044C
C - - - - - 0x0388C7 0E:88B7: 8D F1 03  STA ram_03F1
C - - - - - 0x0388CA 0E:88BA: A9 C9     LDA #$C9
C - - - - - 0x0388CC 0E:88BC: 8D F2 03  STA ram_03F2
C - - - - - 0x0388CF 0E:88BF: A9 00     LDA #$00
C - - - - - 0x0388D1 0E:88C1: 8D 2D 06  STA ram_062D
C - - - - - 0x0388D4 0E:88C4: AD 15 06  LDA ram_0615
C - - - - - 0x0388D7 0E:88C7: 29 BF     AND #$BF
C - - - - - 0x0388D9 0E:88C9: 8D 15 06  STA ram_0615
C - - - - - 0x0388DC 0E:88CC: A9 16     LDA #$16
C - - - - - 0x0388DE 0E:88CE: 20 4E C5  JSR $C54E
C - - - - - 0x0388E1 0E:88D1: 2C 15 06  BIT ram_0615
C - - - - - 0x0388E4 0E:88D4: 10 03     BPL $88D9
C - - - - - 0x0388E6 0E:88D6: 20 75 C5  JSR $C575
C - - - - - 0x0388E9 0E:88D9: 60        RTS
C - - J - - 0x0388EA 0E:88DA: AD 3B 04  LDA ram_043B
C - - - - - 0x0388ED 0E:88DD: 20 09 C5  JSR $C509
- D 0 - I - 0x0388F0 0E:88E0: E8        .byte $E8   ; 
- D 0 - I - 0x0388F1 0E:88E1: 88        .byte $88   ; 
- D 0 - I - 0x0388F2 0E:88E2: EE        .byte $EE   ; 
- D 0 - I - 0x0388F3 0E:88E3: 88        .byte $88   ; 
- D 0 - I - 0x0388F4 0E:88E4: F4        .byte $F4   ; 
- D 0 - I - 0x0388F5 0E:88E5: 88        .byte $88   ; 
- D 0 - I - 0x0388F6 0E:88E6: F7        .byte $F7   ; 
- D 0 - I - 0x0388F7 0E:88E7: 88        .byte $88   ; 
C - - J - - 0x0388F8 0E:88E8: 20 27 89  JSR $8927
C - - - - - 0x0388FB 0E:88EB: 4C 3F 8A  JMP $8A3F
C - - J - - 0x0388FE 0E:88EE: A9 05     LDA #$05
C - - - - - 0x038900 0E:88F0: 8D 3B 04  STA ram_043B
C - - - - - 0x038903 0E:88F3: 60        RTS
C - - J - - 0x038904 0E:88F4: 4C 33 89  JMP $8933
C - - J - - 0x038907 0E:88F7: A9 04     LDA #$04
C - - - - - 0x038909 0E:88F9: 8D 3B 04  STA ram_043B
C - - - - - 0x03890C 0E:88FC: 60        RTS
C - - J - - 0x03890D 0E:88FD: AD 3B 04  LDA ram_043B
C - - - - - 0x038910 0E:8900: 20 09 C5  JSR $C509
- D 0 - I - 0x038913 0E:8903: 0B        .byte $0B   ; 
- D 0 - I - 0x038914 0E:8904: 89        .byte $89   ; 
- D 0 - I - 0x038915 0E:8905: 11        .byte $11   ; 
- D 0 - I - 0x038916 0E:8906: 89        .byte $89   ; 
- D 0 - I - 0x038917 0E:8907: 17        .byte $17   ; 
- D 0 - I - 0x038918 0E:8908: 89        .byte $89   ; 
- D 0 - I - 0x038919 0E:8909: 1A        .byte $1A   ; 
- D 0 - I - 0x03891A 0E:890A: 89        .byte $89   ; 
C - - J - - 0x03891B 0E:890B: A9 04     LDA #$04
C - - - - - 0x03891D 0E:890D: 8D 3B 04  STA ram_043B
C - - - - - 0x038920 0E:8910: 60        RTS
C - - J - - 0x038921 0E:8911: A9 06     LDA #$06
C - - - - - 0x038923 0E:8913: 8D 3B 04  STA ram_043B
C - - - - - 0x038926 0E:8916: 60        RTS
C - - J - - 0x038927 0E:8917: 4C 33 89  JMP $8933
C - - J - - 0x03892A 0E:891A: A9 06     LDA #$06
C - - - - - 0x03892C 0E:891C: 8D 3B 04  STA ram_043B
C - - - - - 0x03892F 0E:891F: A9 01     LDA #$01
C - - - - - 0x038931 0E:8921: 8D 3C 04  STA ram_043C
C - - - - - 0x038934 0E:8924: 4C 11 89  JMP $8911
C - - - - - 0x038937 0E:8927: A9 00     LDA #$00
C - - - - - 0x038939 0E:8929: 8D 3B 04  STA ram_043B
C - - - - - 0x03893C 0E:892C: AD 4E 04  LDA ram_044E
C - - - - - 0x03893F 0E:892F: 8D 3C 04  STA ram_043C
C - - - - - 0x038942 0E:8932: 60        RTS
C D 0 - - - 0x038943 0E:8933: A0 0A     LDY #$0A
C - - - - - 0x038945 0E:8935: B1 3A     LDA (ram_003A),Y
C - - - - - 0x038947 0E:8937: 20 5E 89  JSR $895E
C - - - - - 0x03894A 0E:893A: 29 03     AND #$03
C - - - - - 0x03894C 0E:893C: 48        PHA
C - - - - - 0x03894D 0E:893D: B1 3C     LDA (ram_003C),Y
C - - - - - 0x03894F 0E:893F: 4A        LSR
C - - - - - 0x038950 0E:8940: 4A        LSR
C - - - - - 0x038951 0E:8941: C9 0F     CMP #$0F
C - - - - - 0x038953 0E:8943: F0 08     BEQ $894D
C - - - - - 0x038955 0E:8945: 18        CLC
C - - - - - 0x038956 0E:8946: 69 0A     ADC #$0A
C - - - - - 0x038958 0E:8948: CD 41 04  CMP ram_0441
C - - - - - 0x03895B 0E:894B: D0 03     BNE $8950
C - - - - - 0x03895D 0E:894D: 20 20 8A  JSR $8A20
C - - - - - 0x038960 0E:8950: 85 3C     STA ram_003C
C - - - - - 0x038962 0E:8952: 68        PLA
C - - - - - 0x038963 0E:8953: 20 09 C5  JSR $C509
- D 0 - I - 0x038966 0E:8956: 7E        .byte $7E   ; 
- D 0 - I - 0x038967 0E:8957: 89        .byte $89   ; 
- D 0 - I - 0x038968 0E:8958: 84        .byte $84   ; 
- D 0 - I - 0x038969 0E:8959: 89        .byte $89   ; 
- D 0 - I - 0x03896A 0E:895A: 93        .byte $93   ; 
- D 0 - I - 0x03896B 0E:895B: 89        .byte $89   ; 
- D 0 - I - 0x03896C 0E:895C: 9C        .byte $9C   ; 
- D 0 - I - 0x03896D 0E:895D: 89        .byte $89   ; 
C - - - - - 0x03896E 0E:895E: A2 00     LDX #$00
C - - - - - 0x038970 0E:8960: 86 3D     STX ram_003D
C - - - - - 0x038972 0E:8962: 0A        ASL
C - - - - - 0x038973 0E:8963: 26 3D     ROL ram_003D
C - - - - - 0x038975 0E:8965: 0A        ASL
C - - - - - 0x038976 0E:8966: 26 3D     ROL ram_003D
C - - - - - 0x038978 0E:8968: 0A        ASL
C - - - - - 0x038979 0E:8969: 26 3D     ROL ram_003D
C - - - - - 0x03897B 0E:896B: 69 2E     ADC #$2E
C - - - - - 0x03897D 0E:896D: 85 3C     STA ram_003C
C - - - - - 0x03897F 0E:896F: A5 3D     LDA ram_003D
C - - - - - 0x038981 0E:8971: 69 B7     ADC #$B7
C - - - - - 0x038983 0E:8973: 85 3D     STA ram_003D
C - - - - - 0x038985 0E:8975: AD E2 00  LDA a: ram_00E2
C - - - - - 0x038988 0E:8978: 29 07     AND #$07
C - - - - - 0x03898A 0E:897A: A8        TAY
C - - - - - 0x03898B 0E:897B: B1 3C     LDA (ram_003C),Y
C - - - - - 0x03898D 0E:897D: 60        RTS
C - - J - - 0x03898E 0E:897E: 20 B3 89  JSR $89B3
C - - - - - 0x038991 0E:8981: 4C A5 89  JMP $89A5
C - - J - - 0x038994 0E:8984: 20 B3 89  JSR $89B3
C D 0 - - - 0x038997 0E:8987: 6E E2 00  ROR a: ram_00E2
C - - - - - 0x03899A 0E:898A: 20 20 8A  JSR $8A20
C - - - - - 0x03899D 0E:898D: 20 B3 89  JSR $89B3
C - - - - - 0x0389A0 0E:8990: 4C A5 89  JMP $89A5
C - - J - - 0x0389A3 0E:8993: 20 B3 89  JSR $89B3
C - - - - - 0x0389A6 0E:8996: 20 DA 89  JSR $89DA
C - - - - - 0x0389A9 0E:8999: 4C 87 89  JMP $8987
C - - J - - 0x0389AC 0E:899C: 20 DA 89  JSR $89DA
C - - - - - 0x0389AF 0E:899F: 20 B3 89  JSR $89B3
C - - - - - 0x0389B2 0E:89A2: 4C 87 89  JMP $8987
C D 0 - - - 0x0389B5 0E:89A5: AE 21 06  LDX ram_0621
C - - - - - 0x0389B8 0E:89A8: BD AF 89  LDA $89AF,X
C - - - - - 0x0389BB 0E:89AB: 8D 3B 04  STA ram_043B
C - - - - - 0x0389BE 0E:89AE: 60        RTS
- D 0 - - - 0x0389BF 0E:89AF: 02        .byte $02   ; 
- - - - - - 0x0389C0 0E:89B0: 04        .byte $04   ; 
- D 0 - - - 0x0389C1 0E:89B1: 04        .byte $04   ; 
- - - - - - 0x0389C2 0E:89B2: 02        .byte $02   ; 
C - - - - - 0x0389C3 0E:89B3: A5 3C     LDA ram_003C
C - - - - - 0x0389C5 0E:89B5: 20 0C C5  JSR $C50C
C - - - - - 0x0389C8 0E:89B8: A0 06     LDY #$06
C - - - - - 0x0389CA 0E:89BA: AD 35 06  LDA ram_0635
C - - - - - 0x0389CD 0E:89BD: 38        SEC
C - - - - - 0x0389CE 0E:89BE: F1 34     SBC (ram_0034),Y
C - - - - - 0x0389D0 0E:89C0: B0 08     BCS $89CA
C - - - - - 0x0389D2 0E:89C2: AD 35 06  LDA ram_0635
C - - - - - 0x0389D5 0E:89C5: C9 60     CMP #$60
C - - - - - 0x0389D7 0E:89C7: 90 01     BCC $89CA
C - - - - - 0x0389D9 0E:89C9: 60        RTS
C - - - - - 0x0389DA 0E:89CA: A5 3C     LDA ram_003C
C - - - - - 0x0389DC 0E:89CC: 20 09 8A  JSR $8A09
C - - - - - 0x0389DF 0E:89CF: A9 01     LDA #$01
C - - - - - 0x0389E1 0E:89D1: 8D 3B 04  STA ram_043B
C - - - - - 0x0389E4 0E:89D4: 20 3F 8A  JSR $8A3F
C - - - - - 0x0389E7 0E:89D7: 68        PLA
C - - - - - 0x0389E8 0E:89D8: 68        PLA
C - - - - - 0x0389E9 0E:89D9: 60        RTS
C - - - - - 0x0389EA 0E:89DA: A9 0C     LDA #$0C
C - - - - - 0x0389EC 0E:89DC: 85 3E     STA ram_003E
C - - - - - 0x0389EE 0E:89DE: A5 3E     LDA ram_003E
C - - - - - 0x0389F0 0E:89E0: CD 41 04  CMP ram_0441
C - - - - - 0x0389F3 0E:89E3: F0 0B     BEQ $89F0
C - - - - - 0x0389F5 0E:89E5: 20 0C C5  JSR $C50C
C - - - - - 0x0389F8 0E:89E8: A0 06     LDY #$06
C - - - - - 0x0389FA 0E:89EA: B1 34     LDA (ram_0034),Y
C - - - - - 0x0389FC 0E:89EC: C9 60     CMP #$60
C - - - - - 0x0389FE 0E:89EE: 90 09     BCC $89F9
C - - - - - 0x038A00 0E:89F0: E6 3E     INC ram_003E
C - - - - - 0x038A02 0E:89F2: A5 3E     LDA ram_003E
C - - - - - 0x038A04 0E:89F4: C9 16     CMP #$16
C - - - - - 0x038A06 0E:89F6: D0 E6     BNE $89DE
C - - - - - 0x038A08 0E:89F8: 60        RTS
C - - - - - 0x038A09 0E:89F9: A5 3E     LDA ram_003E
C - - - - - 0x038A0B 0E:89FB: 20 09 8A  JSR $8A09
C - - - - - 0x038A0E 0E:89FE: A9 01     LDA #$01
C - - - - - 0x038A10 0E:8A00: 8D 3B 04  STA ram_043B
C - - - - - 0x038A13 0E:8A03: 20 3F 8A  JSR $8A3F
C - - - - - 0x038A16 0E:8A06: 68        PLA
C - - - - - 0x038A17 0E:8A07: 68        PLA
C - - - - - 0x038A18 0E:8A08: 60        RTS
C - - - - - 0x038A19 0E:8A09: 8D FC 05  STA ram_05FC
C - - - - - 0x038A1C 0E:8A0C: 20 0C C5  JSR $C50C
C - - - - - 0x038A1F 0E:8A0F: A0 06     LDY #$06
C - - - - - 0x038A21 0E:8A11: B1 34     LDA (ram_0034),Y
C - - - - - 0x038A23 0E:8A13: AA        TAX
C - - - - - 0x038A24 0E:8A14: A0 08     LDY #$08
C - - - - - 0x038A26 0E:8A16: B1 34     LDA (ram_0034),Y
C - - - - - 0x038A28 0E:8A18: A8        TAY
C - - - - - 0x038A29 0E:8A19: 20 39 C5  JSR $C539
C - - - - - 0x038A2C 0E:8A1C: 8D 38 06  STA ram_0638
C - - - - - 0x038A2F 0E:8A1F: 60        RTS
C - - - - - 0x038A30 0E:8A20: AD E2 00  LDA a: ram_00E2
C - - - - - 0x038A33 0E:8A23: 6D E3 00  ADC a: ram_00E3
C - - - - - 0x038A36 0E:8A26: 29 0F     AND #$0F
C - - - - - 0x038A38 0E:8A28: C9 0A     CMP #$0A
C - - - - - 0x038A3A 0E:8A2A: 90 02     BCC $8A2E
C - - - - - 0x038A3C 0E:8A2C: E9 0A     SBC #$0A
C - - - - - 0x038A3E 0E:8A2E: 18        CLC
C - - - - - 0x038A3F 0E:8A2F: 69 0C     ADC #$0C
C - - - - - 0x038A41 0E:8A31: CD 41 04  CMP ram_0441
C - - - - - 0x038A44 0E:8A34: D0 08     BNE $8A3E
C - - - - - 0x038A46 0E:8A36: 69 01     ADC #$01
C - - - - - 0x038A48 0E:8A38: C9 16     CMP #$16
C - - - - - 0x038A4A 0E:8A3A: 90 02     BCC $8A3E
C - - - - - 0x038A4C 0E:8A3C: A9 0C     LDA #$0C
C - - - - - 0x038A4E 0E:8A3E: 60        RTS
C D 0 - - - 0x038A4F 0E:8A3F: AD 41 04  LDA ram_0441
C - - - - - 0x038A52 0E:8A42: AE 3B 04  LDX ram_043B
C - - - - - 0x038A55 0E:8A45: 20 06 8C  JSR $8C06
C - - - - - 0x038A58 0E:8A48: AD 30 04  LDA ram_0430
C - - - - - 0x038A5B 0E:8A4B: F0 03     BEQ $8A50
C - - - - - 0x038A5D 0E:8A4D: AD 31 04  LDA ram_0431
C - - - - - 0x038A60 0E:8A50: 8D 3C 04  STA ram_043C
C - - - - - 0x038A63 0E:8A53: AA        TAX
C - - - - - 0x038A64 0E:8A54: D0 0B     BNE $8A61
C - - - - - 0x038A66 0E:8A56: AD 3B 04  LDA ram_043B
C - - - - - 0x038A69 0E:8A59: D0 06     BNE $8A61
C - - - - - 0x038A6B 0E:8A5B: AD 4E 04  LDA ram_044E
C - - - - - 0x038A6E 0E:8A5E: 8D 3C 04  STA ram_043C
C - - - - - 0x038A71 0E:8A61: 60        RTS
C - - - - - 0x038A72 0E:8A62: 48        PHA
C - - - - - 0x038A73 0E:8A63: 20 0C C5  JSR $C50C
C - - - - - 0x038A76 0E:8A66: A0 00     LDY #$00
C - - - - - 0x038A78 0E:8A68: B1 34     LDA (ram_0034),Y
C - - - - - 0x038A7A 0E:8A6A: D0 08     BNE $8A74
C - - - - - 0x038A7C 0E:8A6C: 68        PLA
C - - - - - 0x038A7D 0E:8A6D: 48        PHA
C - - - - - 0x038A7E 0E:8A6E: AA        TAX
C - - - - - 0x038A7F 0E:8A6F: BC 9D 8A  LDY $8A9D,X
C - - - - - 0x038A82 0E:8A72: B1 38     LDA (ram_0038),Y
C - - - - - 0x038A84 0E:8A74: AA        TAX
C - - - - - 0x038A85 0E:8A75: A0 01     LDY #$01
C - - - - - 0x038A87 0E:8A77: B1 34     LDA (ram_0034),Y
C - - - - - 0x038A89 0E:8A79: 10 04     BPL $8A7F
C - - - - - 0x038A8B 0E:8A7B: C8        INY
C - - - - - 0x038A8C 0E:8A7C: B1 34     LDA (ram_0034),Y
C - - - - - 0x038A8E 0E:8A7E: AA        TAX
C - - - - - 0x038A8F 0E:8A7F: 8A        TXA
C - - - - - 0x038A90 0E:8A80: 38        SEC
C - - - - - 0x038A91 0E:8A81: E9 23     SBC #$23
C - - - - - 0x038A93 0E:8A83: A2 00     LDX #$00
C - - - - - 0x038A95 0E:8A85: 86 3B     STX ram_003B
C - - - - - 0x038A97 0E:8A87: 0A        ASL
C - - - - - 0x038A98 0E:8A88: 26 3B     ROL ram_003B
C - - - - - 0x038A9A 0E:8A8A: 0A        ASL
C - - - - - 0x038A9B 0E:8A8B: 26 3B     ROL ram_003B
C - - - - - 0x038A9D 0E:8A8D: 85 3A     STA ram_003A
C - - - - - 0x038A9F 0E:8A8F: A6 3B     LDX ram_003B
C - - - - - 0x038AA1 0E:8A91: 0A        ASL
C - - - - - 0x038AA2 0E:8A92: 26 3B     ROL ram_003B
C - - - - - 0x038AA4 0E:8A94: 65 3A     ADC ram_003A
C - - - - - 0x038AA6 0E:8A96: 48        PHA
C - - - - - 0x038AA7 0E:8A97: 8A        TXA
C - - - - - 0x038AA8 0E:8A98: 65 3B     ADC ram_003B
C - - - - - 0x038AAA 0E:8A9A: AA        TAX
C - - - - - 0x038AAB 0E:8A9B: 68        PLA
C - - - - - 0x038AAC 0E:8A9C: 18        CLC
C - - - - - 0x038AAD 0E:8A9D: 69 62     ADC #$62
C - - - - - 0x038AAF 0E:8A9F: 85 3A     STA ram_003A
C - - - - - 0x038AB1 0E:8AA1: 8A        TXA
C - - - - - 0x038AB2 0E:8AA2: 69 96     ADC #$96
C - - - - - 0x038AB4 0E:8AA4: 85 3B     STA ram_003B
C - - - - - 0x038AB6 0E:8AA6: 68        PLA
C - - - - - 0x038AB7 0E:8AA7: 60        RTS
- D 0 - - - 0x038AB8 0E:8AA8: 02        .byte $02   ; 
- D 0 - - - 0x038AB9 0E:8AA9: 03        .byte $03   ; 
- D 0 - - - 0x038ABA 0E:8AAA: 03        .byte $03   ; 
- D 0 - - - 0x038ABB 0E:8AAB: 03        .byte $03   ; 
- D 0 - - - 0x038ABC 0E:8AAC: 03        .byte $03   ; 
- D 0 - - - 0x038ABD 0E:8AAD: 04        .byte $04   ; 
- D 0 - - - 0x038ABE 0E:8AAE: 05        .byte $05   ; 
- D 0 - - - 0x038ABF 0E:8AAF: 04        .byte $04   ; 
- D 0 - - - 0x038AC0 0E:8AB0: 05        .byte $05   ; 
- D 0 - - - 0x038AC1 0E:8AB1: 04        .byte $04   ; 
- D 0 - - - 0x038AC2 0E:8AB2: 05        .byte $05   ; 
C - - - - - 0x038AC3 0E:8AB3: AD 35 06  LDA ram_0635
C - - - - - 0x038AC6 0E:8AB6: 10 02     BPL $8ABA
C - - - - - 0x038AC8 0E:8AB8: 49 FF     EOR #$FF
C - - - - - 0x038ACA 0E:8ABA: AA        TAX
C - - - - - 0x038ACB 0E:8ABB: AD 37 06  LDA ram_0637
C - - - - - 0x038ACE 0E:8ABE: 10 02     BPL $8AC2
C - - - - - 0x038AD0 0E:8AC0: 49 FF     EOR #$FF
C - - - - - 0x038AD2 0E:8AC2: A8        TAY
C - - - - - 0x038AD3 0E:8AC3: 20 39 C5  JSR $C539
C - - - - - 0x038AD6 0E:8AC6: A2 00     LDX #$00
C - - - - - 0x038AD8 0E:8AC8: DD 9E 8B  CMP $8B9E,X
C - - - - - 0x038ADB 0E:8ACB: F0 04     BEQ $8AD1
C - - - - - 0x038ADD 0E:8ACD: E8        INX
C - - - - - 0x038ADE 0E:8ACE: E8        INX
C - - - - - 0x038ADF 0E:8ACF: D0 F7     BNE $8AC8
C - - - - - 0x038AE1 0E:8AD1: BD 9F 8B  LDA $8B9F,X
C - - - - - 0x038AE4 0E:8AD4: A6 3C     LDX ram_003C
C - - - - - 0x038AE6 0E:8AD6: E0 01     CPX #$01
C - - - - - 0x038AE8 0E:8AD8: F0 03     BEQ $8ADD
C - - - - - 0x038AEA 0E:8ADA: 18        CLC
C - - - - - 0x038AEB 0E:8ADB: 69 0C     ADC #$0C
C - - - - - 0x038AED 0E:8ADD: 60        RTS
C - - - - - 0x038AEE 0E:8ADE: 85 3E     STA ram_003E
C - - - - - 0x038AF0 0E:8AE0: A5 3C     LDA ram_003C
C - - - - - 0x038AF2 0E:8AE2: 85 3F     STA ram_003F
C - - - - - 0x038AF4 0E:8AE4: 98        TYA
C - - - - - 0x038AF5 0E:8AE5: 18        CLC
C - - - - - 0x038AF6 0E:8AE6: 65 3C     ADC ram_003C
C - - - - - 0x038AF8 0E:8AE8: A8        TAY
C - - - - - 0x038AF9 0E:8AE9: B1 3A     LDA (ram_003A),Y
C - - - - - 0x038AFB 0E:8AEB: A0 00     LDY #$00
C - - - - - 0x038AFD 0E:8AED: 84 3D     STY ram_003D
C - - - - - 0x038AFF 0E:8AEF: 0A        ASL
C - - - - - 0x038B00 0E:8AF0: 26 3D     ROL ram_003D
C - - - - - 0x038B02 0E:8AF2: 0A        ASL
C - - - - - 0x038B03 0E:8AF3: 26 3D     ROL ram_003D
C - - - - - 0x038B05 0E:8AF5: 0A        ASL
C - - - - - 0x038B06 0E:8AF6: 26 3D     ROL ram_003D
C - - - - - 0x038B08 0E:8AF8: 0A        ASL
C - - - - - 0x038B09 0E:8AF9: 26 3D     ROL ram_003D
C - - - - - 0x038B0B 0E:8AFB: 85 3C     STA ram_003C
C - - - - - 0x038B0D 0E:8AFD: A6 3D     LDX ram_003D
C - - - - - 0x038B0F 0E:8AFF: 0A        ASL
C - - - - - 0x038B10 0E:8B00: 26 3D     ROL ram_003D
C - - - - - 0x038B12 0E:8B02: 65 3C     ADC ram_003C
C - - - - - 0x038B14 0E:8B04: 85 3C     STA ram_003C
C - - - - - 0x038B16 0E:8B06: 8A        TXA
C - - - - - 0x038B17 0E:8B07: 65 3D     ADC ram_003D
C - - - - - 0x038B19 0E:8B09: AA        TAX
C - - - - - 0x038B1A 0E:8B0A: 60        RTS
C - - - - - 0x038B1B 0E:8B0B: AD E2 00  LDA a: ram_00E2
C - - - - - 0x038B1E 0E:8B0E: 29 07     AND #$07
C - - - - - 0x038B20 0E:8B10: 4A        LSR
C - - - - - 0x038B21 0E:8B11: 08        PHP
C - - - - - 0x038B22 0E:8B12: 18        CLC
C - - - - - 0x038B23 0E:8B13: 65 3E     ADC ram_003E
C - - - - - 0x038B25 0E:8B15: A8        TAY
C - - - - - 0x038B26 0E:8B16: B1 3C     LDA (ram_003C),Y
C - - - - - 0x038B28 0E:8B18: 28        PLP
C - - - - - 0x038B29 0E:8B19: B0 04     BCS $8B1F
C - - - - - 0x038B2B 0E:8B1B: 4A        LSR
C - - - - - 0x038B2C 0E:8B1C: 4A        LSR
C - - - - - 0x038B2D 0E:8B1D: 4A        LSR
C - - - - - 0x038B2E 0E:8B1E: 4A        LSR
C - - - - - 0x038B2F 0E:8B1F: 29 0F     AND #$0F
C - - - - - 0x038B31 0E:8B21: 60        RTS
C D 0 - - - 0x038B32 0E:8B22: A9 0B     LDA #$0B
C - - - - - 0x038B34 0E:8B24: 48        PHA
C - - - - - 0x038B35 0E:8B25: 20 0C C5  JSR $C50C
C - - - - - 0x038B38 0E:8B28: A0 00     LDY #$00
C - - - - - 0x038B3A 0E:8B2A: A9 00     LDA #$00
C - - - - - 0x038B3C 0E:8B2C: 91 34     STA (ram_0034),Y
C - - - - - 0x038B3E 0E:8B2E: C8        INY
C - - - - - 0x038B3F 0E:8B2F: 91 34     STA (ram_0034),Y
C - - - - - 0x038B41 0E:8B31: 68        PLA
C - - - - - 0x038B42 0E:8B32: 18        CLC
C - - - - - 0x038B43 0E:8B33: 69 01     ADC #$01
C - - - - - 0x038B45 0E:8B35: C9 16     CMP #$16
C - - - - - 0x038B47 0E:8B37: D0 EB     BNE $8B24
C - - - - - 0x038B49 0E:8B39: AD 2B 00  LDA a: ram_002B
C - - - - - 0x038B4C 0E:8B3C: 38        SEC
C - - - - - 0x038B4D 0E:8B3D: E9 03     SBC #$03
C - - - - - 0x038B4F 0E:8B3F: 0A        ASL
C - - - - - 0x038B50 0E:8B40: AA        TAX
C - - - - - 0x038B51 0E:8B41: BD B2 BA  LDA $BAB2,X
C - - - - - 0x038B54 0E:8B44: 85 38     STA ram_0038
C - - - - - 0x038B56 0E:8B46: BD B3 BA  LDA $BAB3,X
C - - - - - 0x038B59 0E:8B49: 85 39     STA ram_0039
C - - - - - 0x038B5B 0E:8B4B: A0 00     LDY #$00
C - - - - - 0x038B5D 0E:8B4D: B1 38     LDA (ram_0038),Y
C - - - - - 0x038B5F 0E:8B4F: 29 0F     AND #$0F
C - - - - - 0x038B61 0E:8B51: 8D 2E 00  STA a: ram_002E
C - - - - - 0x038B64 0E:8B54: B1 38     LDA (ram_0038),Y
C - - - - - 0x038B66 0E:8B56: 4A        LSR
C - - - - - 0x038B67 0E:8B57: 4A        LSR
C - - - - - 0x038B68 0E:8B58: 4A        LSR
C - - - - - 0x038B69 0E:8B59: 4A        LSR
C - - - - - 0x038B6A 0E:8B5A: 8D 2F 00  STA a: ram_002F
C - - - - - 0x038B6D 0E:8B5D: A0 09     LDY #$09
C - - - - - 0x038B6F 0E:8B5F: 84 3A     STY ram_003A
C D 0 - - - 0x038B71 0E:8B61: A4 3A     LDY ram_003A
C - - - - - 0x038B73 0E:8B63: B1 38     LDA (ram_0038),Y
C - - - - - 0x038B75 0E:8B65: C9 0F     CMP #$0F
C - - - - - 0x038B77 0E:8B67: F0 15     BEQ $8B7E
C - - - - - 0x038B79 0E:8B69: 18        CLC
C - - - - - 0x038B7A 0E:8B6A: 69 0A     ADC #$0A
C - - - - - 0x038B7C 0E:8B6C: 20 0C C5  JSR $C50C
C - - - - - 0x038B7F 0E:8B6F: A4 3A     LDY ram_003A
C - - - - - 0x038B81 0E:8B71: C8        INY
C - - - - - 0x038B82 0E:8B72: B1 38     LDA (ram_0038),Y
C - - - - - 0x038B84 0E:8B74: C8        INY
C - - - - - 0x038B85 0E:8B75: 84 3A     STY ram_003A
C - - - - - 0x038B87 0E:8B77: A0 00     LDY #$00
C - - - - - 0x038B89 0E:8B79: 91 34     STA (ram_0034),Y
C - - - - - 0x038B8B 0E:8B7B: 4C 61 8B  JMP $8B61
C - - - - - 0x038B8E 0E:8B7E: AE 46 04  LDX ram_0446
C - - - - - 0x038B91 0E:8B81: E0 05     CPX #$05
C - - - - - 0x038B93 0E:8B83: F0 0B     BEQ $8B90
C - - - - - 0x038B95 0E:8B85: A2 00     LDX #$00
C - - - - - 0x038B97 0E:8B87: AD 84 03  LDA ram_0384
C - - - - - 0x038B9A 0E:8B8A: C9 26     CMP #$26
C - - - - - 0x038B9C 0E:8B8C: D0 02     BNE $8B90
C - - - - - 0x038B9E 0E:8B8E: E8        INX
C - - - - - 0x038B9F 0E:8B8F: E8        INX
C - - - - - 0x038BA0 0E:8B90: 8E 46 04  STX ram_0446
C - - - - - 0x038BA3 0E:8B93: 60        RTS
- - - - - - 0x038BA4 0E:8B94: 03        .byte $03   ; 
- - - - - - 0x038BA5 0E:8B95: 03        .byte $03   ; 
- - - - - - 0x038BA6 0E:8B96: 03        .byte $03   ; 
- - - - - - 0x038BA7 0E:8B97: 03        .byte $03   ; 
- - - - - - 0x038BA8 0E:8B98: 04        .byte $04   ; 
- - - - - - 0x038BA9 0E:8B99: 05        .byte $05   ; 
- - - - - - 0x038BAA 0E:8B9A: 04        .byte $04   ; 
- - - - - - 0x038BAB 0E:8B9B: 05        .byte $05   ; 
- - - - - - 0x038BAC 0E:8B9C: 04        .byte $04   ; 
- - - - - - 0x038BAD 0E:8B9D: 05        .byte $05   ; 
- D 0 - - - 0x038BAE 0E:8B9E: 02        .byte $02   ; 
- D 0 - - - 0x038BAF 0E:8B9F: 18        .byte $18   ; 
- D 0 - - - 0x038BB0 0E:8BA0: 03        .byte $03   ; 
- D 0 - - - 0x038BB1 0E:8BA1: 18        .byte $18   ; 
- D 0 - - - 0x038BB2 0E:8BA2: 0E        .byte $0E   ; 
- D 0 - - - 0x038BB3 0E:8BA3: 18        .byte $18   ; 
- D 0 - - - 0x038BB4 0E:8BA4: 0F        .byte $0F   ; 
- D 0 - - - 0x038BB5 0E:8BA5: 18        .byte $18   ; 
- D 0 - - - 0x038BB6 0E:8BA6: 1A        .byte $1A   ; 
- D 0 - - - 0x038BB7 0E:8BA7: 1C        .byte $1C   ; 
- D 0 - - - 0x038BB8 0E:8BA8: 1B        .byte $1B   ; 
- D 0 - - - 0x038BB9 0E:8BA9: 1C        .byte $1C   ; 
- D 0 - - - 0x038BBA 0E:8BAA: 1C        .byte $1C   ; 
- D 0 - - - 0x038BBB 0E:8BAB: 1C        .byte $1C   ; 
- D 0 - - - 0x038BBC 0E:8BAC: 1D        .byte $1D   ; 
- D 0 - - - 0x038BBD 0E:8BAD: 1C        .byte $1C   ; 
- D 0 - - - 0x038BBE 0E:8BAE: 26        .byte $26   ; 
- D 0 - - - 0x038BBF 0E:8BAF: 1C        .byte $1C   ; 
- D 0 - - - 0x038BC0 0E:8BB0: 27        .byte $27   ; 
- D 0 - - - 0x038BC1 0E:8BB1: 1C        .byte $1C   ; 
- D 0 - - - 0x038BC2 0E:8BB2: 28        .byte $28   ; 
- D 0 - - - 0x038BC3 0E:8BB3: 1C        .byte $1C   ; 
- D 0 - - - 0x038BC4 0E:8BB4: 29        .byte $29   ; 
- D 0 - - - 0x038BC5 0E:8BB5: 1C        .byte $1C   ; 
- D 0 - - - 0x038BC6 0E:8BB6: 04        .byte $04   ; 
- D 0 - - - 0x038BC7 0E:8BB7: 20        .byte $20   ; 
- D 0 - - - 0x038BC8 0E:8BB8: 05        .byte $05   ; 
- D 0 - - - 0x038BC9 0E:8BB9: 20        .byte $20   ; 
- D 0 - - - 0x038BCA 0E:8BBA: 10        .byte $10   ; 
- D 0 - - - 0x038BCB 0E:8BBB: 20        .byte $20   ; 
- D 0 - - - 0x038BCC 0E:8BBC: 11        .byte $11   ; 
- D 0 - - - 0x038BCD 0E:8BBD: 20        .byte $20   ; 
- D 0 - - - 0x038BCE 0E:8BBE: 00        .byte $00   ; 
- D 0 - - - 0x038BCF 0E:8BBF: 00        .byte $00   ; 
- D 0 - - - 0x038BD0 0E:8BC0: 0C        .byte $0C   ; 
- D 0 - - - 0x038BD1 0E:8BC1: 00        .byte $00   ; 
- D 0 - - - 0x038BD2 0E:8BC2: 18        .byte $18   ; 
- D 0 - - - 0x038BD3 0E:8BC3: 00        .byte $00   ; 
- D 0 - - - 0x038BD4 0E:8BC4: 24        .byte $24   ; 
- D 0 - - - 0x038BD5 0E:8BC5: 00        .byte $00   ; 
- D 0 - - - 0x038BD6 0E:8BC6: 30        .byte $30   ; <0>
- D 0 - - - 0x038BD7 0E:8BC7: 00        .byte $00   ; 
- D 0 - - - 0x038BD8 0E:8BC8: 3C        .byte $3C   ; 
- D 0 - - - 0x038BD9 0E:8BC9: 00        .byte $00   ; 
- D 0 - - - 0x038BDA 0E:8BCA: 01        .byte $01   ; 
- D 0 - - - 0x038BDB 0E:8BCB: 00        .byte $00   ; 
- D 0 - - - 0x038BDC 0E:8BCC: 0D        .byte $0D   ; 
- D 0 - - - 0x038BDD 0E:8BCD: 00        .byte $00   ; 
- D 0 - - - 0x038BDE 0E:8BCE: 19        .byte $19   ; 
- D 0 - - - 0x038BDF 0E:8BCF: 00        .byte $00   ; 
- D 0 - - - 0x038BE0 0E:8BD0: 25        .byte $25   ; 
- D 0 - - - 0x038BE1 0E:8BD1: 00        .byte $00   ; 
- D 0 - - - 0x038BE2 0E:8BD2: 31        .byte $31   ; <1>
- D 0 - - - 0x038BE3 0E:8BD3: 00        .byte $00   ; 
- D 0 - - - 0x038BE4 0E:8BD4: 3D        .byte $3D   ; 
- D 0 - - - 0x038BE5 0E:8BD5: 00        .byte $00   ; 
- D 0 - - - 0x038BE6 0E:8BD6: 02        .byte $02   ; 
- D 0 - - - 0x038BE7 0E:8BD7: 00        .byte $00   ; 
- D 0 - - - 0x038BE8 0E:8BD8: 0E        .byte $0E   ; 
- D 0 - - - 0x038BE9 0E:8BD9: 00        .byte $00   ; 
- D 0 - - - 0x038BEA 0E:8BDA: 03        .byte $03   ; 
- D 0 - - - 0x038BEB 0E:8BDB: 00        .byte $00   ; 
- D 0 - - - 0x038BEC 0E:8BDC: 0F        .byte $0F   ; 
- D 0 - - - 0x038BED 0E:8BDD: 00        .byte $00   ; 
- D 0 - - - 0x038BEE 0E:8BDE: 32        .byte $32   ; <2>
- D 0 - - - 0x038BEF 0E:8BDF: 04        .byte $04   ; 
- D 0 - - - 0x038BF0 0E:8BE0: 3E        .byte $3E   ; 
- D 0 - - - 0x038BF1 0E:8BE1: 04        .byte $04   ; 
- D 0 - - - 0x038BF2 0E:8BE2: 33        .byte $33   ; <3>
- D 0 - - - 0x038BF3 0E:8BE3: 04        .byte $04   ; 
- D 0 - - - 0x038BF4 0E:8BE4: 3F        .byte $3F   ; 
- D 0 - - - 0x038BF5 0E:8BE5: 04        .byte $04   ; 
- D 0 - - - 0x038BF6 0E:8BE6: 34        .byte $34   ; <4>
- D 0 - - - 0x038BF7 0E:8BE7: 04        .byte $04   ; 
- D 0 - - - 0x038BF8 0E:8BE8: 40        .byte $40   ; 
- D 0 - - - 0x038BF9 0E:8BE9: 04        .byte $04   ; 
- D 0 - - - 0x038BFA 0E:8BEA: 35        .byte $35   ; <5>
- D 0 - - - 0x038BFB 0E:8BEB: 04        .byte $04   ; 
- D 0 - - - 0x038BFC 0E:8BEC: 41        .byte $41   ; <A>
- D 0 - - - 0x038BFD 0E:8BED: 04        .byte $04   ; 
- D 0 - - - 0x038BFE 0E:8BEE: 1A        .byte $1A   ; 
- D 0 - - - 0x038BFF 0E:8BEF: 08        .byte $08   ; 
- D 0 - - - 0x038C00 0E:8BF0: 26        .byte $26   ; 
- D 0 - - - 0x038C01 0E:8BF1: 08        .byte $08   ; 
- D 0 - - - 0x038C02 0E:8BF2: 1B        .byte $1B   ; 
- D 0 - - - 0x038C03 0E:8BF3: 08        .byte $08   ; 
- D 0 - - - 0x038C04 0E:8BF4: 27        .byte $27   ; 
- D 0 - - - 0x038C05 0E:8BF5: 08        .byte $08   ; 
- D 0 - - - 0x038C06 0E:8BF6: 1C        .byte $1C   ; 
- D 0 - - - 0x038C07 0E:8BF7: 08        .byte $08   ; 
- D 0 - - - 0x038C08 0E:8BF8: 28        .byte $28   ; 
- D 0 - - - 0x038C09 0E:8BF9: 08        .byte $08   ; 
- D 0 - - - 0x038C0A 0E:8BFA: 1D        .byte $1D   ; 
- D 0 - - - 0x038C0B 0E:8BFB: 08        .byte $08   ; 
- D 0 - - - 0x038C0C 0E:8BFC: 29        .byte $29   ; 
- D 0 - - - 0x038C0D 0E:8BFD: 08        .byte $08   ; 
- D 0 - - - 0x038C0E 0E:8BFE: 04        .byte $04   ; 
- D 0 - - - 0x038C0F 0E:8BFF: 0C        .byte $0C   ; 
- D 0 - - - 0x038C10 0E:8C00: 10        .byte $10   ; 
- D 0 - - - 0x038C11 0E:8C01: 0C        .byte $0C   ; 
- D 0 - - - 0x038C12 0E:8C02: 05        .byte $05   ; 
- D 0 - - - 0x038C13 0E:8C03: 0C        .byte $0C   ; 
- D 0 - - - 0x038C14 0E:8C04: 11        .byte $11   ; 
- D 0 - - - 0x038C15 0E:8C05: 0C        .byte $0C   ; 
C D 0 - - - 0x038C16 0E:8C06: E0 04     CPX #$04
C - - - - - 0x038C18 0E:8C08: B0 1C     BCS $8C26
C - - - - - 0x038C1A 0E:8C0A: AC 4E 04  LDY ram_044E
C - - - - - 0x038C1D 0E:8C0D: F0 04     BEQ $8C13
C - - - - - 0x038C1F 0E:8C0F: E0 02     CPX #$02
C - - - - - 0x038C21 0E:8C11: B0 13     BCS $8C26
C - - - - - 0x038C23 0E:8C13: 20 C9 8D  JSR $8DC9
C - - - - - 0x038C26 0E:8C16: AD 30 04  LDA ram_0430
C - - - - - 0x038C29 0E:8C19: 0A        ASL
C - - - - - 0x038C2A 0E:8C1A: A8        TAY
C - - - - - 0x038C2B 0E:8C1B: B1 48     LDA (ram_0048),Y
C - - - - - 0x038C2D 0E:8C1D: C8        INY
C - - - - - 0x038C2E 0E:8C1E: D1 48     CMP (ram_0048),Y
C - - - - - 0x038C30 0E:8C20: D0 0A     BNE $8C2C
C - - - - - 0x038C32 0E:8C22: C9 00     CMP #$00
C - - - - - 0x038C34 0E:8C24: D0 06     BNE $8C2C
C - - - - - 0x038C36 0E:8C26: A9 00     LDA #$00
C - - - - - 0x038C38 0E:8C28: 8D 30 04  STA ram_0430
C - - - - - 0x038C3B 0E:8C2B: 60        RTS
C - - - - - 0x038C3C 0E:8C2C: AA        TAX
C - - - - - 0x038C3D 0E:8C2D: B1 48     LDA (ram_0048),Y
C - - - - - 0x038C3F 0E:8C2F: 85 49     STA ram_0049
C - - - - - 0x038C41 0E:8C31: 86 48     STX ram_0048
C - - - - - 0x038C43 0E:8C33: AD 30 04  LDA ram_0430
C - - - - - 0x038C46 0E:8C36: A2 00     LDX #$00
C - - - - - 0x038C48 0E:8C38: 8E 30 04  STX ram_0430
C - - - - - 0x038C4B 0E:8C3B: 20 09 C5  JSR $C509
- D 0 - I - 0x038C4E 0E:8C3E: 46        .byte $46   ; <F>
- D 0 - I - 0x038C4F 0E:8C3F: 8C        .byte $8C   ; 
- D 0 - I - 0x038C50 0E:8C40: 41        .byte $41   ; <A>
- D 0 - I - 0x038C51 0E:8C41: 8D        .byte $8D   ; 
- D 0 - I - 0x038C52 0E:8C42: 4E        .byte $4E   ; <N>
- D 0 - I - 0x038C53 0E:8C43: 8D        .byte $8D   ; 
- D 0 - I - 0x038C54 0E:8C44: 55        .byte $55   ; <U>
- D 0 - I - 0x038C55 0E:8C45: 8D        .byte $8D   ; 
C - - J - - 0x038C56 0E:8C46: A9 00     LDA #$00
C - - - - - 0x038C58 0E:8C48: 85 46     STA ram_0046
C - - - - - 0x038C5A 0E:8C4A: A4 46     LDY ram_0046
C - - - - - 0x038C5C 0E:8C4C: B1 48     LDA (ram_0048),Y
C - - - - - 0x038C5E 0E:8C4E: 4A        LSR
C - - - - - 0x038C5F 0E:8C4F: 4A        LSR
C - - - - - 0x038C60 0E:8C50: 85 47     STA ram_0047
C - - - - - 0x038C62 0E:8C52: B1 48     LDA (ram_0048),Y
C - - - - - 0x038C64 0E:8C54: 29 03     AND #$03
C - - - - - 0x038C66 0E:8C56: C9 03     CMP #$03
C - - - - - 0x038C68 0E:8C58: F0 24     BEQ $8C7E
C - - - - - 0x038C6A 0E:8C5A: CD 4E 04  CMP ram_044E
C - - - - - 0x038C6D 0E:8C5D: D0 03     BNE $8C62
C - - - - - 0x038C6F 0E:8C5F: 20 7F 8C  JSR $8C7F
C - - - - - 0x038C72 0E:8C62: E6 46     INC ram_0046
C - - - - - 0x038C74 0E:8C64: A5 47     LDA ram_0047
C - - - - - 0x038C76 0E:8C66: C9 08     CMP #$08
C - - - - - 0x038C78 0E:8C68: F0 10     BEQ $8C7A
C - - - - - 0x038C7A 0E:8C6A: C9 09     CMP #$09
C - - - - - 0x038C7C 0E:8C6C: F0 0C     BEQ $8C7A
C - - - - - 0x038C7E 0E:8C6E: C9 0A     CMP #$0A
C - - - - - 0x038C80 0E:8C70: F0 08     BEQ $8C7A
C - - - - - 0x038C82 0E:8C72: C9 11     CMP #$11
C - - - - - 0x038C84 0E:8C74: F0 04     BEQ $8C7A
C - - - - - 0x038C86 0E:8C76: C9 13     CMP #$13
C - - - - - 0x038C88 0E:8C78: D0 D0     BNE $8C4A
C - - - - - 0x038C8A 0E:8C7A: E6 46     INC ram_0046
C - - - - - 0x038C8C 0E:8C7C: D0 CC     BNE $8C4A
C - - - - - 0x038C8E 0E:8C7E: 60        RTS
C - - - - - 0x038C8F 0E:8C7F: A5 47     LDA ram_0047
C - - - - - 0x038C91 0E:8C81: 38        SEC
C - - - - - 0x038C92 0E:8C82: E9 03     SBC #$03
C - - - - - 0x038C94 0E:8C84: 20 09 C5  JSR $C509
- D 0 - I - 0x038C97 0E:8C87: C7        .byte $C7   ; 
- D 0 - I - 0x038C98 0E:8C88: 8C        .byte $8C   ; 
- D 0 - I - 0x038C99 0E:8C89: CC        .byte $CC   ; 
- D 0 - I - 0x038C9A 0E:8C8A: 8C        .byte $8C   ; 
- D 0 - I - 0x038C9B 0E:8C8B: C7        .byte $C7   ; 
- D 0 - I - 0x038C9C 0E:8C8C: 8C        .byte $8C   ; 
- D 0 - I - 0x038C9D 0E:8C8D: C7        .byte $C7   ; 
- D 0 - I - 0x038C9E 0E:8C8E: 8C        .byte $8C   ; 
- D 0 - I - 0x038C9F 0E:8C8F: C7        .byte $C7   ; 
- D 0 - I - 0x038CA0 0E:8C90: 8C        .byte $8C   ; 
- D 0 - I - 0x038CA1 0E:8C91: D4        .byte $D4   ; 
- D 0 - I - 0x038CA2 0E:8C92: 8C        .byte $8C   ; 
- D 0 - I - 0x038CA3 0E:8C93: D4        .byte $D4   ; 
- D 0 - I - 0x038CA4 0E:8C94: 8C        .byte $8C   ; 
- D 0 - I - 0x038CA5 0E:8C95: FA        .byte $FA   ; 
- D 0 - I - 0x038CA6 0E:8C96: 8C        .byte $8C   ; 
- D 0 - I - 0x038CA7 0E:8C97: C7        .byte $C7   ; 
- D 0 - I - 0x038CA8 0E:8C98: 8C        .byte $8C   ; 
- D 0 - I - 0x038CA9 0E:8C99: C7        .byte $C7   ; 
- D 0 - I - 0x038CAA 0E:8C9A: 8C        .byte $8C   ; 
- D 0 - I - 0x038CAB 0E:8C9B: C7        .byte $C7   ; 
- D 0 - I - 0x038CAC 0E:8C9C: 8C        .byte $8C   ; 
- D 0 - I - 0x038CAD 0E:8C9D: C7        .byte $C7   ; 
- D 0 - I - 0x038CAE 0E:8C9E: 8C        .byte $8C   ; 
- D 0 - I - 0x038CAF 0E:8C9F: C7        .byte $C7   ; 
- D 0 - I - 0x038CB0 0E:8CA0: 8C        .byte $8C   ; 
- D 0 - I - 0x038CB1 0E:8CA1: C7        .byte $C7   ; 
- D 0 - I - 0x038CB2 0E:8CA2: 8C        .byte $8C   ; 
- D 0 - I - 0x038CB3 0E:8CA3: 21        .byte $21   ; 
- D 0 - I - 0x038CB4 0E:8CA4: 8D        .byte $8D   ; 
- D 0 - I - 0x038CB5 0E:8CA5: 2A        .byte $2A   ; 
- D 0 - I - 0x038CB6 0E:8CA6: 8D        .byte $8D   ; 
- D 0 - I - 0x038CB7 0E:8CA7: D4        .byte $D4   ; 
- D 0 - I - 0x038CB8 0E:8CA8: 8C        .byte $8C   ; 
- D 0 - I - 0x038CB9 0E:8CA9: C7        .byte $C7   ; 
- D 0 - I - 0x038CBA 0E:8CAA: 8C        .byte $8C   ; 
- D 0 - I - 0x038CBB 0E:8CAB: C7        .byte $C7   ; 
- D 0 - I - 0x038CBC 0E:8CAC: 8C        .byte $8C   ; 
- D 0 - I - 0x038CBD 0E:8CAD: C7        .byte $C7   ; 
- D 0 - I - 0x038CBE 0E:8CAE: 8C        .byte $8C   ; 
- D 0 - I - 0x038CBF 0E:8CAF: C7        .byte $C7   ; 
- D 0 - I - 0x038CC0 0E:8CB0: 8C        .byte $8C   ; 
- D 0 - I - 0x038CC1 0E:8CB1: C7        .byte $C7   ; 
- D 0 - I - 0x038CC2 0E:8CB2: 8C        .byte $8C   ; 
- D 0 - I - 0x038CC3 0E:8CB3: C7        .byte $C7   ; 
- D 0 - I - 0x038CC4 0E:8CB4: 8C        .byte $8C   ; 
- D 0 - I - 0x038CC5 0E:8CB5: C7        .byte $C7   ; 
- D 0 - I - 0x038CC6 0E:8CB6: 8C        .byte $8C   ; 
- D 0 - I - 0x038CC7 0E:8CB7: C7        .byte $C7   ; 
- D 0 - I - 0x038CC8 0E:8CB8: 8C        .byte $8C   ; 
- D 0 - I - 0x038CC9 0E:8CB9: C7        .byte $C7   ; 
- D 0 - I - 0x038CCA 0E:8CBA: 8C        .byte $8C   ; 
- D 0 - I - 0x038CCB 0E:8CBB: C7        .byte $C7   ; 
- D 0 - I - 0x038CCC 0E:8CBC: 8C        .byte $8C   ; 
- D 0 - I - 0x038CCD 0E:8CBD: C7        .byte $C7   ; 
- D 0 - I - 0x038CCE 0E:8CBE: 8C        .byte $8C   ; 
- D 0 - I - 0x038CCF 0E:8CBF: C7        .byte $C7   ; 
- D 0 - I - 0x038CD0 0E:8CC0: 8C        .byte $8C   ; 
- D 0 - I - 0x038CD1 0E:8CC1: C7        .byte $C7   ; 
- D 0 - I - 0x038CD2 0E:8CC2: 8C        .byte $8C   ; 
- D 0 - I - 0x038CD3 0E:8CC3: C7        .byte $C7   ; 
- D 0 - I - 0x038CD4 0E:8CC4: 8C        .byte $8C   ; 
- D 0 - I - 0x038CD5 0E:8CC5: C7        .byte $C7   ; 
- D 0 - I - 0x038CD6 0E:8CC6: 8C        .byte $8C   ; 
C - - J - - 0x038CD7 0E:8CC7: A5 47     LDA ram_0047
C - - - - - 0x038CD9 0E:8CC9: 4C 11 8E  JMP $8E11
C - - J - - 0x038CDC 0E:8CCC: AD 46 04  LDA ram_0446
C - - - - - 0x038CDF 0E:8CCF: C9 05     CMP #$05
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
- - - - - - 0x0390AD 0E:909D: 00        .byte $00   ; 
- - - - - - 0x0390AE 0E:909E: 00        .byte $00   ; 
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
- D 0 - I - 0x03916A 0E:915A: 00        .byte $00   ; 
- D 0 - I - 0x03916B 0E:915B: 33        .byte $33   ; <3>
- D 0 - I - 0x03916C 0E:915C: 94        .byte $94   ; 
- D 0 - I - 0x03916D 0E:915D: 3F        .byte $3F   ; 
- D 0 - I - 0x03916E 0E:915E: 94        .byte $94   ; 
- D 0 - I - 0x03916F 0E:915F: 53        .byte $53   ; <S>
- D 0 - I - 0x039170 0E:9160: 94        .byte $94   ; 
- D 0 - I - 0x039171 0E:9161: 5F        .byte $5F   ; 
- D 0 - I - 0x039172 0E:9162: 94        .byte $94   ; 
- D 0 - I - 0x039173 0E:9163: C8        .byte $C8   ; 
- D 0 - I - 0x039174 0E:9164: 93        .byte $93   ; 
- D 0 - I - 0x039175 0E:9165: 00        .byte $00   ; 
- D 0 - I - 0x039176 0E:9166: 00        .byte $00   ; 
- D 0 - I - 0x039177 0E:9167: 00        .byte $00   ; 
- D 0 - I - 0x039178 0E:9168: 00        .byte $00   ; 
- D 0 - I - 0x039179 0E:9169: 33        .byte $33   ; <3>
- D 0 - I - 0x03917A 0E:916A: 94        .byte $94   ; 
- D 0 - I - 0x03917B 0E:916B: 00        .byte $00   ; 
- D 0 - I - 0x03917C 0E:916C: 00        .byte $00   ; 
- D 0 - I - 0x03917D 0E:916D: 00        .byte $00   ; 
- D 0 - I - 0x03917E 0E:916E: 00        .byte $00   ; 
- D 0 - I - 0x03917F 0E:916F: 00        .byte $00   ; 
- D 0 - I - 0x039180 0E:9170: 00        .byte $00   ; 
- D 0 - I - 0x039181 0E:9171: CD        .byte $CD   ; 
- D 0 - I - 0x039182 0E:9172: 93        .byte $93   ; 
- D 0 - I - 0x039183 0E:9173: 00        .byte $00   ; 
- D 0 - I - 0x039184 0E:9174: 00        .byte $00   ; 
- D 0 - I - 0x039185 0E:9175: 1A        .byte $1A   ; 
- D 0 - I - 0x039186 0E:9176: 94        .byte $94   ; 
- D 0 - I - 0x039187 0E:9177: 00        .byte $00   ; 
- D 0 - I - 0x039188 0E:9178: 00        .byte $00   ; 
- D 0 - I - 0x039189 0E:9179: 40        .byte $40   ; 
- D 0 - I - 0x03918A 0E:917A: 94        .byte $94   ; 
- D 0 - I - 0x03918B 0E:917B: 54        .byte $54   ; <T>
- D 0 - I - 0x03918C 0E:917C: 94        .byte $94   ; 
- D 0 - I - 0x03918D 0E:917D: 00        .byte $00   ; 
- D 0 - I - 0x03918E 0E:917E: 00        .byte $00   ; 
- - - - - - 0x03918F 0E:917F: 00        .byte $00   ; 
- - - - - - 0x039190 0E:9180: 00        .byte $00   ; 
- D 0 - I - 0x039191 0E:9181: 00        .byte $00   ; 
- D 0 - I - 0x039192 0E:9182: 00        .byte $00   ; 
- D 0 - I - 0x039193 0E:9183: 00        .byte $00   ; 
- D 0 - I - 0x039194 0E:9184: 00        .byte $00   ; 
- - - - - - 0x039195 0E:9185: 00        .byte $00   ; 
- - - - - - 0x039196 0E:9186: 00        .byte $00   ; 
- D 0 - I - 0x039197 0E:9187: 41        .byte $41   ; <A>
- D 0 - I - 0x039198 0E:9188: 94        .byte $94   ; 
- D 0 - I - 0x039199 0E:9189: 00        .byte $00   ; 
- D 0 - I - 0x03919A 0E:918A: 00        .byte $00   ; 
- D 0 - I - 0x03919B 0E:918B: 00        .byte $00   ; 
- D 0 - I - 0x03919C 0E:918C: 00        .byte $00   ; 
- D 0 - I - 0x03919D 0E:918D: D0        .byte $D0   ; 
- D 0 - I - 0x03919E 0E:918E: 93        .byte $93   ; 
- D 0 - I - 0x03919F 0E:918F: 0E        .byte $0E   ; 
- D 0 - I - 0x0391A0 0E:9190: 94        .byte $94   ; 
- D 0 - I - 0x0391A1 0E:9191: 00        .byte $00   ; 
- D 0 - I - 0x0391A2 0E:9192: 00        .byte $00   ; 
- - - - - - 0x0391A3 0E:9193: 00        .byte $00   ; 
- - - - - - 0x0391A4 0E:9194: 00        .byte $00   ; 
- - - - - - 0x0391A5 0E:9195: 00        .byte $00   ; 
- - - - - - 0x0391A6 0E:9196: 00        .byte $00   ; 
- D 0 - I - 0x0391A7 0E:9197: 55        .byte $55   ; <U>
- D 0 - I - 0x0391A8 0E:9198: 94        .byte $94   ; 
- D 0 - I - 0x0391A9 0E:9199: 00        .byte $00   ; 
- D 0 - I - 0x0391AA 0E:919A: 00        .byte $00   ; 
- D 0 - I - 0x0391AB 0E:919B: D2        .byte $D2   ; 
- D 0 - I - 0x0391AC 0E:919C: 93        .byte $93   ; 
- D 0 - I - 0x0391AD 0E:919D: 00        .byte $00   ; 
- D 0 - I - 0x0391AE 0E:919E: 00        .byte $00   ; 
- D 0 - I - 0x0391AF 0E:919F: 00        .byte $00   ; 
- D 0 - I - 0x0391B0 0E:91A0: 00        .byte $00   ; 
- - - - - - 0x0391B1 0E:91A1: 00        .byte $00   ; 
- - - - - - 0x0391B2 0E:91A2: 00        .byte $00   ; 
- D 0 - I - 0x0391B3 0E:91A3: 00        .byte $00   ; 
- D 0 - I - 0x0391B4 0E:91A4: 00        .byte $00   ; 
- D 0 - I - 0x0391B5 0E:91A5: 00        .byte $00   ; 
- D 0 - I - 0x0391B6 0E:91A6: 00        .byte $00   ; 
- D 0 - I - 0x0391B7 0E:91A7: 00        .byte $00   ; 
- D 0 - I - 0x0391B8 0E:91A8: 00        .byte $00   ; 
- D 0 - I - 0x0391B9 0E:91A9: D5        .byte $D5   ; 
- D 0 - I - 0x0391BA 0E:91AA: 93        .byte $93   ; 
- D 0 - I - 0x0391BB 0E:91AB: 00        .byte $00   ; 
- D 0 - I - 0x0391BC 0E:91AC: 00        .byte $00   ; 
- D 0 - I - 0x0391BD 0E:91AD: 00        .byte $00   ; 
- D 0 - I - 0x0391BE 0E:91AE: 00        .byte $00   ; 
- D 0 - I - 0x0391BF 0E:91AF: 00        .byte $00   ; 
- D 0 - I - 0x0391C0 0E:91B0: 00        .byte $00   ; 
- - - - - - 0x0391C1 0E:91B1: 00        .byte $00   ; 
- - - - - - 0x0391C2 0E:91B2: 00        .byte $00   ; 
- D 0 - I - 0x0391C3 0E:91B3: 00        .byte $00   ; 
- D 0 - I - 0x0391C4 0E:91B4: 00        .byte $00   ; 
- D 0 - I - 0x0391C5 0E:91B5: 00        .byte $00   ; 
- D 0 - I - 0x0391C6 0E:91B6: 00        .byte $00   ; 
- D 0 - I - 0x0391C7 0E:91B7: D7        .byte $D7   ; 
- D 0 - I - 0x0391C8 0E:91B8: 93        .byte $93   ; 
- D 0 - I - 0x0391C9 0E:91B9: 00        .byte $00   ; 
- D 0 - I - 0x0391CA 0E:91BA: 00        .byte $00   ; 
- D 0 - I - 0x0391CB 0E:91BB: 00        .byte $00   ; 
- D 0 - I - 0x0391CC 0E:91BC: 00        .byte $00   ; 
- D 0 - I - 0x0391CD 0E:91BD: 00        .byte $00   ; 
- D 0 - I - 0x0391CE 0E:91BE: 00        .byte $00   ; 
- - - - - - 0x0391CF 0E:91BF: 00        .byte $00   ; 
- - - - - - 0x0391D0 0E:91C0: 00        .byte $00   ; 
- D 0 - I - 0x0391D1 0E:91C1: 00        .byte $00   ; 
- D 0 - I - 0x0391D2 0E:91C2: 00        .byte $00   ; 
- D 0 - I - 0x0391D3 0E:91C3: 00        .byte $00   ; 
- D 0 - I - 0x0391D4 0E:91C4: 00        .byte $00   ; 
- D 0 - I - 0x0391D5 0E:91C5: D9        .byte $D9   ; 
- D 0 - I - 0x0391D6 0E:91C6: 93        .byte $93   ; 
- D 0 - I - 0x0391D7 0E:91C7: 00        .byte $00   ; 
- D 0 - I - 0x0391D8 0E:91C8: 00        .byte $00   ; 
- D 0 - I - 0x0391D9 0E:91C9: 1B        .byte $1B   ; 
- D 0 - I - 0x0391DA 0E:91CA: 94        .byte $94   ; 
- D 0 - I - 0x0391DB 0E:91CB: 00        .byte $00   ; 
- D 0 - I - 0x0391DC 0E:91CC: 00        .byte $00   ; 
- - - - - - 0x0391DD 0E:91CD: 00        .byte $00   ; 
- - - - - - 0x0391DE 0E:91CE: 00        .byte $00   ; 
- - - - - - 0x0391DF 0E:91CF: 00        .byte $00   ; 
- - - - - - 0x0391E0 0E:91D0: 00        .byte $00   ; 
- D 0 - I - 0x0391E1 0E:91D1: 00        .byte $00   ; 
- D 0 - I - 0x0391E2 0E:91D2: 00        .byte $00   ; 
- D 0 - I - 0x0391E3 0E:91D3: DC        .byte $DC   ; 
- D 0 - I - 0x0391E4 0E:91D4: 93        .byte $93   ; 
- D 0 - I - 0x0391E5 0E:91D5: 00        .byte $00   ; 
- D 0 - I - 0x0391E6 0E:91D6: 00        .byte $00   ; 
- D 0 - I - 0x0391E7 0E:91D7: 00        .byte $00   ; 
- D 0 - I - 0x0391E8 0E:91D8: 00        .byte $00   ; 
- D 0 - I - 0x0391E9 0E:91D9: 00        .byte $00   ; 
- D 0 - I - 0x0391EA 0E:91DA: 00        .byte $00   ; 
- - - - - - 0x0391EB 0E:91DB: 00        .byte $00   ; 
- - - - - - 0x0391EC 0E:91DC: 00        .byte $00   ; 
- - - - - - 0x0391ED 0E:91DD: 00        .byte $00   ; 
- - - - - - 0x0391EE 0E:91DE: 00        .byte $00   ; 
- D 0 - I - 0x0391EF 0E:91DF: 00        .byte $00   ; 
- D 0 - I - 0x0391F0 0E:91E0: 00        .byte $00   ; 
- D 0 - I - 0x0391F1 0E:91E1: 01        .byte $01   ; 
- D 0 - I - 0x0391F2 0E:91E2: 00        .byte $00   ; 
- - - - - - 0x0391F3 0E:91E3: 00        .byte $00   ; 
- - - - - - 0x0391F4 0E:91E4: 00        .byte $00   ; 
- - - - - - 0x0391F5 0E:91E5: 00        .byte $00   ; 
- - - - - - 0x0391F6 0E:91E6: 00        .byte $00   ; 
- - - - - - 0x0391F7 0E:91E7: 00        .byte $00   ; 
- - - - - - 0x0391F8 0E:91E8: 00        .byte $00   ; 
- - - - - - 0x0391F9 0E:91E9: 00        .byte $00   ; 
- - - - - - 0x0391FA 0E:91EA: 00        .byte $00   ; 
- - - - - - 0x0391FB 0E:91EB: 00        .byte $00   ; 
- - - - - - 0x0391FC 0E:91EC: 00        .byte $00   ; 
- - - - - - 0x0391FD 0E:91ED: 00        .byte $00   ; 
- - - - - - 0x0391FE 0E:91EE: 00        .byte $00   ; 
- - - - - - 0x0391FF 0E:91EF: 00        .byte $00   ; 
- - - - - - 0x039200 0E:91F0: 00        .byte $00   ; 
- - - - - - 0x039201 0E:91F1: 00        .byte $00   ; 
- - - - - - 0x039202 0E:91F2: 00        .byte $00   ; 
- - - - - - 0x039203 0E:91F3: 1C        .byte $1C   ; 
- - - - - - 0x039204 0E:91F4: 94        .byte $94   ; 
- - - - - - 0x039205 0E:91F5: 00        .byte $00   ; 
- - - - - - 0x039206 0E:91F6: 00        .byte $00   ; 
- - - - - - 0x039207 0E:91F7: 42        .byte $42   ; <B>
- - - - - - 0x039208 0E:91F8: 94        .byte $94   ; 
- - - - - - 0x039209 0E:91F9: 56        .byte $56   ; <V>
- - - - - - 0x03920A 0E:91FA: 94        .byte $94   ; 
- - - - - - 0x03920B 0E:91FB: 00        .byte $00   ; 
- - - - - - 0x03920C 0E:91FC: 00        .byte $00   ; 
- D 0 - I - 0x03920D 0E:91FD: 02        .byte $02   ; 
- D 0 - I - 0x03920E 0E:91FE: 00        .byte $00   ; 
- - - - - - 0x03920F 0E:91FF: 00        .byte $00   ; 
- - - - - - 0x039210 0E:9200: 00        .byte $00   ; 
- - - - - - 0x039211 0E:9201: 00        .byte $00   ; 
- - - - - - 0x039212 0E:9202: 00        .byte $00   ; 
- - - - - - 0x039213 0E:9203: 00        .byte $00   ; 
- - - - - - 0x039214 0E:9204: 00        .byte $00   ; 
- - - - - - 0x039215 0E:9205: 00        .byte $00   ; 
- - - - - - 0x039216 0E:9206: 00        .byte $00   ; 
- - - - - - 0x039217 0E:9207: 00        .byte $00   ; 
- - - - - - 0x039218 0E:9208: 00        .byte $00   ; 
- - - - - - 0x039219 0E:9209: 00        .byte $00   ; 
- - - - - - 0x03921A 0E:920A: 00        .byte $00   ; 
- D 0 - I - 0x03921B 0E:920B: DF        .byte $DF   ; 
- D 0 - I - 0x03921C 0E:920C: 93        .byte $93   ; 
- D 0 - I - 0x03921D 0E:920D: 00        .byte $00   ; 
- D 0 - I - 0x03921E 0E:920E: 00        .byte $00   ; 
- D 0 - I - 0x03921F 0E:920F: 1D        .byte $1D   ; 
- D 0 - I - 0x039220 0E:9210: 94        .byte $94   ; 
- D 0 - I - 0x039221 0E:9211: 34        .byte $34   ; <4>
- D 0 - I - 0x039222 0E:9212: 94        .byte $94   ; 
- D 0 - I - 0x039223 0E:9213: 00        .byte $00   ; 
- D 0 - I - 0x039224 0E:9214: 00        .byte $00   ; 
- D 0 - I - 0x039225 0E:9215: 00        .byte $00   ; 
- D 0 - I - 0x039226 0E:9216: 00        .byte $00   ; 
- D 0 - I - 0x039227 0E:9217: 00        .byte $00   ; 
- D 0 - I - 0x039228 0E:9218: 00        .byte $00   ; 
- D 0 - I - 0x039229 0E:9219: E3        .byte $E3   ; 
- D 0 - I - 0x03922A 0E:921A: 93        .byte $93   ; 
- D 0 - I - 0x03922B 0E:921B: 00        .byte $00   ; 
- D 0 - I - 0x03922C 0E:921C: 00        .byte $00   ; 
- D 0 - I - 0x03922D 0E:921D: 00        .byte $00   ; 
- D 0 - I - 0x03922E 0E:921E: 00        .byte $00   ; 
- D 0 - I - 0x03922F 0E:921F: 34        .byte $34   ; <4>
- D 0 - I - 0x039230 0E:9220: 94        .byte $94   ; 
- D 0 - I - 0x039231 0E:9221: 00        .byte $00   ; 
- D 0 - I - 0x039232 0E:9222: 00        .byte $00   ; 
- D 0 - I - 0x039233 0E:9223: 00        .byte $00   ; 
- D 0 - I - 0x039234 0E:9224: 00        .byte $00   ; 
- D 0 - I - 0x039235 0E:9225: 00        .byte $00   ; 
- D 0 - I - 0x039236 0E:9226: 00        .byte $00   ; 
- D 0 - I - 0x039237 0E:9227: E7        .byte $E7   ; 
- D 0 - I - 0x039238 0E:9228: 93        .byte $93   ; 
- D 0 - I - 0x039239 0E:9229: 00        .byte $00   ; 
- D 0 - I - 0x03923A 0E:922A: 00        .byte $00   ; 
- D 0 - I - 0x03923B 0E:922B: 00        .byte $00   ; 
- D 0 - I - 0x03923C 0E:922C: 00        .byte $00   ; 
- D 0 - I - 0x03923D 0E:922D: 00        .byte $00   ; 
- D 0 - I - 0x03923E 0E:922E: 00        .byte $00   ; 
- - - - - - 0x03923F 0E:922F: 00        .byte $00   ; 
- - - - - - 0x039240 0E:9230: 00        .byte $00   ; 
- D 0 - I - 0x039241 0E:9231: 00        .byte $00   ; 
- D 0 - I - 0x039242 0E:9232: 00        .byte $00   ; 
- D 0 - I - 0x039243 0E:9233: 00        .byte $00   ; 
- D 0 - I - 0x039244 0E:9234: 00        .byte $00   ; 
- D 0 - I - 0x039245 0E:9235: E9        .byte $E9   ; 
- D 0 - I - 0x039246 0E:9236: 93        .byte $93   ; 
- D 0 - I - 0x039247 0E:9237: 00        .byte $00   ; 
- D 0 - I - 0x039248 0E:9238: 00        .byte $00   ; 
- D 0 - I - 0x039249 0E:9239: 1E        .byte $1E   ; 
- D 0 - I - 0x03924A 0E:923A: 94        .byte $94   ; 
- - - - - - 0x03924B 0E:923B: 00        .byte $00   ; 
- - - - - - 0x03924C 0E:923C: 00        .byte $00   ; 
- D 0 - I - 0x03924D 0E:923D: 00        .byte $00   ; 
- D 0 - I - 0x03924E 0E:923E: 00        .byte $00   ; 
- D 0 - I - 0x03924F 0E:923F: 00        .byte $00   ; 
- D 0 - I - 0x039250 0E:9240: 00        .byte $00   ; 
- D 0 - I - 0x039251 0E:9241: 00        .byte $00   ; 
- D 0 - I - 0x039252 0E:9242: 00        .byte $00   ; 
- D 0 - I - 0x039253 0E:9243: 00        .byte $00   ; 
- D 0 - I - 0x039254 0E:9244: 00        .byte $00   ; 
- D 0 - I - 0x039255 0E:9245: 00        .byte $00   ; 
- D 0 - I - 0x039256 0E:9246: 00        .byte $00   ; 
- D 0 - I - 0x039257 0E:9247: 1F        .byte $1F   ; 
- D 0 - I - 0x039258 0E:9248: 94        .byte $94   ; 
- D 0 - I - 0x039259 0E:9249: 00        .byte $00   ; 
- D 0 - I - 0x03925A 0E:924A: 00        .byte $00   ; 
- D 0 - I - 0x03925B 0E:924B: 43        .byte $43   ; <C>
- D 0 - I - 0x03925C 0E:924C: 94        .byte $94   ; 
- D 0 - I - 0x03925D 0E:924D: 57        .byte $57   ; <W>
- D 0 - I - 0x03925E 0E:924E: 94        .byte $94   ; 
- D 0 - I - 0x03925F 0E:924F: 00        .byte $00   ; 
- D 0 - I - 0x039260 0E:9250: 00        .byte $00   ; 
- D 0 - I - 0x039261 0E:9251: 00        .byte $00   ; 
- D 0 - I - 0x039262 0E:9252: 00        .byte $00   ; 
- D 0 - I - 0x039263 0E:9253: 00        .byte $00   ; 
- D 0 - I - 0x039264 0E:9254: 00        .byte $00   ; 
- D 0 - I - 0x039265 0E:9255: 00        .byte $00   ; 
- D 0 - I - 0x039266 0E:9256: 00        .byte $00   ; 
- D 0 - I - 0x039267 0E:9257: 35        .byte $35   ; <5>
- D 0 - I - 0x039268 0E:9258: 94        .byte $94   ; 
- D 0 - I - 0x039269 0E:9259: 00        .byte $00   ; 
- D 0 - I - 0x03926A 0E:925A: 00        .byte $00   ; 
- D 0 - I - 0x03926B 0E:925B: 00        .byte $00   ; 
- D 0 - I - 0x03926C 0E:925C: 00        .byte $00   ; 
- D 0 - I - 0x03926D 0E:925D: 00        .byte $00   ; 
- D 0 - I - 0x03926E 0E:925E: 00        .byte $00   ; 
- D 0 - I - 0x03926F 0E:925F: EB        .byte $EB   ; 
- D 0 - I - 0x039270 0E:9260: 93        .byte $93   ; 
- D 0 - I - 0x039271 0E:9261: 00        .byte $00   ; 
- D 0 - I - 0x039272 0E:9262: 00        .byte $00   ; 
- D 0 - I - 0x039273 0E:9263: 00        .byte $00   ; 
- D 0 - I - 0x039274 0E:9264: 00        .byte $00   ; 
- D 0 - I - 0x039275 0E:9265: 00        .byte $00   ; 
- D 0 - I - 0x039276 0E:9266: 00        .byte $00   ; 
- - - - - - 0x039277 0E:9267: 00        .byte $00   ; 
- - - - - - 0x039278 0E:9268: 00        .byte $00   ; 
- D 0 - I - 0x039279 0E:9269: 00        .byte $00   ; 
- D 0 - I - 0x03927A 0E:926A: 00        .byte $00   ; 
- D 0 - I - 0x03927B 0E:926B: 00        .byte $00   ; 
- D 0 - I - 0x03927C 0E:926C: 00        .byte $00   ; 
- D 0 - I - 0x03927D 0E:926D: ED        .byte $ED   ; 
- D 0 - I - 0x03927E 0E:926E: 93        .byte $93   ; 
- D 0 - I - 0x03927F 0E:926F: 00        .byte $00   ; 
- D 0 - I - 0x039280 0E:9270: 00        .byte $00   ; 
- D 0 - I - 0x039281 0E:9271: 00        .byte $00   ; 
- D 0 - I - 0x039282 0E:9272: 00        .byte $00   ; 
- D 0 - I - 0x039283 0E:9273: 35        .byte $35   ; <5>
- D 0 - I - 0x039284 0E:9274: 94        .byte $94   ; 
- D 0 - I - 0x039285 0E:9275: 00        .byte $00   ; 
- D 0 - I - 0x039286 0E:9276: 00        .byte $00   ; 
- D 0 - I - 0x039287 0E:9277: 00        .byte $00   ; 
- D 0 - I - 0x039288 0E:9278: 00        .byte $00   ; 
- D 0 - I - 0x039289 0E:9279: 00        .byte $00   ; 
- D 0 - I - 0x03928A 0E:927A: 00        .byte $00   ; 
- - - - - - 0x03928B 0E:927B: 00        .byte $00   ; 
- - - - - - 0x03928C 0E:927C: 00        .byte $00   ; 
- D 0 - I - 0x03928D 0E:927D: 00        .byte $00   ; 
- D 0 - I - 0x03928E 0E:927E: 00        .byte $00   ; 
- D 0 - I - 0x03928F 0E:927F: 20        .byte $20   ; 
- D 0 - I - 0x039290 0E:9280: 94        .byte $94   ; 
- - - - - - 0x039291 0E:9281: 00        .byte $00   ; 
- - - - - - 0x039292 0E:9282: 00        .byte $00   ; 
- D 0 - I - 0x039293 0E:9283: 44        .byte $44   ; <D>
- D 0 - I - 0x039294 0E:9284: 94        .byte $94   ; 
- D 0 - I - 0x039295 0E:9285: 58        .byte $58   ; <X>
- D 0 - I - 0x039296 0E:9286: 94        .byte $94   ; 
- D 0 - I - 0x039297 0E:9287: 00        .byte $00   ; 
- D 0 - I - 0x039298 0E:9288: 00        .byte $00   ; 
- D 0 - I - 0x039299 0E:9289: F1        .byte $F1   ; 
- D 0 - I - 0x03929A 0E:928A: 93        .byte $93   ; 
- D 0 - I - 0x03929B 0E:928B: 00        .byte $00   ; 
- D 0 - I - 0x03929C 0E:928C: 00        .byte $00   ; 
- D 0 - I - 0x03929D 0E:928D: 00        .byte $00   ; 
- D 0 - I - 0x03929E 0E:928E: 00        .byte $00   ; 
- - - - - - 0x03929F 0E:928F: 00        .byte $00   ; 
- - - - - - 0x0392A0 0E:9290: 00        .byte $00   ; 
- D 0 - I - 0x0392A1 0E:9291: 00        .byte $00   ; 
- D 0 - I - 0x0392A2 0E:9292: 00        .byte $00   ; 
- D 0 - I - 0x0392A3 0E:9293: 00        .byte $00   ; 
- D 0 - I - 0x0392A4 0E:9294: 00        .byte $00   ; 
- D 0 - I - 0x0392A5 0E:9295: 00        .byte $00   ; 
- D 0 - I - 0x0392A6 0E:9296: 00        .byte $00   ; 
- D 0 - I - 0x0392A7 0E:9297: 00        .byte $00   ; 
- D 0 - I - 0x0392A8 0E:9298: 00        .byte $00   ; 
- D 0 - I - 0x0392A9 0E:9299: 00        .byte $00   ; 
- D 0 - I - 0x0392AA 0E:929A: 00        .byte $00   ; 
- D 0 - I - 0x0392AB 0E:929B: 21        .byte $21   ; 
- D 0 - I - 0x0392AC 0E:929C: 94        .byte $94   ; 
- D 0 - I - 0x0392AD 0E:929D: 00        .byte $00   ; 
- D 0 - I - 0x0392AE 0E:929E: 00        .byte $00   ; 
- D 0 - I - 0x0392AF 0E:929F: 00        .byte $00   ; 
- D 0 - I - 0x0392B0 0E:92A0: 00        .byte $00   ; 
- D 0 - I - 0x0392B1 0E:92A1: 00        .byte $00   ; 
- D 0 - I - 0x0392B2 0E:92A2: 00        .byte $00   ; 
- D 0 - I - 0x0392B3 0E:92A3: 00        .byte $00   ; 
- D 0 - I - 0x0392B4 0E:92A4: 00        .byte $00   ; 
- D 0 - I - 0x0392B5 0E:92A5: 00        .byte $00   ; 
- D 0 - I - 0x0392B6 0E:92A6: 00        .byte $00   ; 
- D 0 - I - 0x0392B7 0E:92A7: 0F        .byte $0F   ; 
- D 0 - I - 0x0392B8 0E:92A8: 94        .byte $94   ; 
- - - - - - 0x0392B9 0E:92A9: 00        .byte $00   ; 
- - - - - - 0x0392BA 0E:92AA: 00        .byte $00   ; 
- D 0 - I - 0x0392BB 0E:92AB: 00        .byte $00   ; 
- D 0 - I - 0x0392BC 0E:92AC: 00        .byte $00   ; 
- D 0 - I - 0x0392BD 0E:92AD: 00        .byte $00   ; 
- D 0 - I - 0x0392BE 0E:92AE: 00        .byte $00   ; 
- D 0 - I - 0x0392BF 0E:92AF: 00        .byte $00   ; 
- D 0 - I - 0x0392C0 0E:92B0: 00        .byte $00   ; 
- D 0 - I - 0x0392C1 0E:92B1: 00        .byte $00   ; 
- D 0 - I - 0x0392C2 0E:92B2: 00        .byte $00   ; 
- D 0 - I - 0x0392C3 0E:92B3: F4        .byte $F4   ; 
- D 0 - I - 0x0392C4 0E:92B4: 93        .byte $93   ; 
- D 0 - I - 0x0392C5 0E:92B5: 00        .byte $00   ; 
- D 0 - I - 0x0392C6 0E:92B6: 00        .byte $00   ; 
- D 0 - I - 0x0392C7 0E:92B7: 00        .byte $00   ; 
- D 0 - I - 0x0392C8 0E:92B8: 00        .byte $00   ; 
- D 0 - I - 0x0392C9 0E:92B9: 00        .byte $00   ; 
- D 0 - I - 0x0392CA 0E:92BA: 00        .byte $00   ; 
- D 0 - I - 0x0392CB 0E:92BB: 00        .byte $00   ; 
- D 0 - I - 0x0392CC 0E:92BC: 00        .byte $00   ; 
- D 0 - I - 0x0392CD 0E:92BD: 00        .byte $00   ; 
- D 0 - I - 0x0392CE 0E:92BE: 00        .byte $00   ; 
- D 0 - I - 0x0392CF 0E:92BF: 00        .byte $00   ; 
- D 0 - I - 0x0392D0 0E:92C0: 00        .byte $00   ; 
- D 0 - I - 0x0392D1 0E:92C1: F6        .byte $F6   ; 
- D 0 - I - 0x0392D2 0E:92C2: 93        .byte $93   ; 
- D 0 - I - 0x0392D3 0E:92C3: 00        .byte $00   ; 
- D 0 - I - 0x0392D4 0E:92C4: 00        .byte $00   ; 
- D 0 - I - 0x0392D5 0E:92C5: 22        .byte $22   ; 
- D 0 - I - 0x0392D6 0E:92C6: 94        .byte $94   ; 
- - - - - - 0x0392D7 0E:92C7: 00        .byte $00   ; 
- - - - - - 0x0392D8 0E:92C8: 00        .byte $00   ; 
- D 0 - I - 0x0392D9 0E:92C9: 00        .byte $00   ; 
- D 0 - I - 0x0392DA 0E:92CA: 00        .byte $00   ; 
- D 0 - I - 0x0392DB 0E:92CB: 00        .byte $00   ; 
- D 0 - I - 0x0392DC 0E:92CC: 00        .byte $00   ; 
- D 0 - I - 0x0392DD 0E:92CD: 00        .byte $00   ; 
- D 0 - I - 0x0392DE 0E:92CE: 00        .byte $00   ; 
- D 0 - I - 0x0392DF 0E:92CF: F9        .byte $F9   ; 
- D 0 - I - 0x0392E0 0E:92D0: 93        .byte $93   ; 
- D 0 - I - 0x0392E1 0E:92D1: 00        .byte $00   ; 
- D 0 - I - 0x0392E2 0E:92D2: 00        .byte $00   ; 
- D 0 - I - 0x0392E3 0E:92D3: 23        .byte $23   ; 
- D 0 - I - 0x0392E4 0E:92D4: 94        .byte $94   ; 
- - - - - - 0x0392E5 0E:92D5: 00        .byte $00   ; 
- - - - - - 0x0392E6 0E:92D6: 00        .byte $00   ; 
- - - - - - 0x0392E7 0E:92D7: 00        .byte $00   ; 
- - - - - - 0x0392E8 0E:92D8: 00        .byte $00   ; 
- D 0 - I - 0x0392E9 0E:92D9: 00        .byte $00   ; 
- D 0 - I - 0x0392EA 0E:92DA: 00        .byte $00   ; 
- D 0 - I - 0x0392EB 0E:92DB: 00        .byte $00   ; 
- D 0 - I - 0x0392EC 0E:92DC: 00        .byte $00   ; 
- D 0 - I - 0x0392ED 0E:92DD: FB        .byte $FB   ; 
- D 0 - I - 0x0392EE 0E:92DE: 93        .byte $93   ; 
- D 0 - I - 0x0392EF 0E:92DF: 00        .byte $00   ; 
- D 0 - I - 0x0392F0 0E:92E0: 00        .byte $00   ; 
- D 0 - I - 0x0392F1 0E:92E1: 00        .byte $00   ; 
- D 0 - I - 0x0392F2 0E:92E2: 00        .byte $00   ; 
- - - - - - 0x0392F3 0E:92E3: 00        .byte $00   ; 
- - - - - - 0x0392F4 0E:92E4: 00        .byte $00   ; 
- - - - - - 0x0392F5 0E:92E5: 00        .byte $00   ; 
- - - - - - 0x0392F6 0E:92E6: 00        .byte $00   ; 
- D 0 - I - 0x0392F7 0E:92E7: 00        .byte $00   ; 
- D 0 - I - 0x0392F8 0E:92E8: 00        .byte $00   ; 
- D 0 - I - 0x0392F9 0E:92E9: 00        .byte $00   ; 
- D 0 - I - 0x0392FA 0E:92EA: 00        .byte $00   ; 
- D 0 - I - 0x0392FB 0E:92EB: FD        .byte $FD   ; 
- D 0 - I - 0x0392FC 0E:92EC: 93        .byte $93   ; 
- D 0 - I - 0x0392FD 0E:92ED: 00        .byte $00   ; 
- D 0 - I - 0x0392FE 0E:92EE: 00        .byte $00   ; 
- D 0 - I - 0x0392FF 0E:92EF: 24        .byte $24   ; 
- D 0 - I - 0x039300 0E:92F0: 94        .byte $94   ; 
- D 0 - I - 0x039301 0E:92F1: 00        .byte $00   ; 
- D 0 - I - 0x039302 0E:92F2: 00        .byte $00   ; 
- D 0 - I - 0x039303 0E:92F3: 00        .byte $00   ; 
- D 0 - I - 0x039304 0E:92F4: 00        .byte $00   ; 
- D 0 - I - 0x039305 0E:92F5: 00        .byte $00   ; 
- D 0 - I - 0x039306 0E:92F6: 00        .byte $00   ; 
- D 0 - I - 0x039307 0E:92F7: 00        .byte $00   ; 
- D 0 - I - 0x039308 0E:92F8: 00        .byte $00   ; 
- D 0 - I - 0x039309 0E:92F9: FF        .byte $FF   ; 
- D 0 - I - 0x03930A 0E:92FA: 93        .byte $93   ; 
- D 0 - I - 0x03930B 0E:92FB: 00        .byte $00   ; 
- D 0 - I - 0x03930C 0E:92FC: 00        .byte $00   ; 
- D 0 - I - 0x03930D 0E:92FD: 00        .byte $00   ; 
- D 0 - I - 0x03930E 0E:92FE: 00        .byte $00   ; 
- - - - - - 0x03930F 0E:92FF: 00        .byte $00   ; 
- - - - - - 0x039310 0E:9300: 00        .byte $00   ; 
- D 0 - I - 0x039311 0E:9301: 00        .byte $00   ; 
- D 0 - I - 0x039312 0E:9302: 00        .byte $00   ; 
- D 0 - I - 0x039313 0E:9303: 00        .byte $00   ; 
- D 0 - I - 0x039314 0E:9304: 00        .byte $00   ; 
- D 0 - I - 0x039315 0E:9305: 00        .byte $00   ; 
- D 0 - I - 0x039316 0E:9306: 00        .byte $00   ; 
- D 0 - I - 0x039317 0E:9307: 01        .byte $01   ; 
- D 0 - I - 0x039318 0E:9308: 94        .byte $94   ; 
- D 0 - I - 0x039319 0E:9309: 00        .byte $00   ; 
- D 0 - I - 0x03931A 0E:930A: 00        .byte $00   ; 
- D 0 - I - 0x03931B 0E:930B: 00        .byte $00   ; 
- D 0 - I - 0x03931C 0E:930C: 00        .byte $00   ; 
- - - - - - 0x03931D 0E:930D: 00        .byte $00   ; 
- - - - - - 0x03931E 0E:930E: 00        .byte $00   ; 
- D 0 - I - 0x03931F 0E:930F: 00        .byte $00   ; 
- D 0 - I - 0x039320 0E:9310: 00        .byte $00   ; 
- D 0 - I - 0x039321 0E:9311: 00        .byte $00   ; 
- D 0 - I - 0x039322 0E:9312: 00        .byte $00   ; 
- D 0 - I - 0x039323 0E:9313: 00        .byte $00   ; 
- D 0 - I - 0x039324 0E:9314: 00        .byte $00   ; 
- D 0 - I - 0x039325 0E:9315: 03        .byte $03   ; 
- D 0 - I - 0x039326 0E:9316: 94        .byte $94   ; 
- D 0 - I - 0x039327 0E:9317: 00        .byte $00   ; 
- D 0 - I - 0x039328 0E:9318: 00        .byte $00   ; 
- D 0 - I - 0x039329 0E:9319: 00        .byte $00   ; 
- D 0 - I - 0x03932A 0E:931A: 00        .byte $00   ; 
- D 0 - I - 0x03932B 0E:931B: 00        .byte $00   ; 
- D 0 - I - 0x03932C 0E:931C: 00        .byte $00   ; 
- D 0 - I - 0x03932D 0E:931D: 45        .byte $45   ; <E>
- D 0 - I - 0x03932E 0E:931E: 94        .byte $94   ; 
- D 0 - I - 0x03932F 0E:931F: 59        .byte $59   ; <Y>
- D 0 - I - 0x039330 0E:9320: 94        .byte $94   ; 
- - - - - - 0x039331 0E:9321: 00        .byte $00   ; 
- - - - - - 0x039332 0E:9322: 00        .byte $00   ; 
- D 0 - I - 0x039333 0E:9323: 05        .byte $05   ; 
- D 0 - I - 0x039334 0E:9324: 94        .byte $94   ; 
- D 0 - I - 0x039335 0E:9325: 00        .byte $00   ; 
- D 0 - I - 0x039336 0E:9326: 00        .byte $00   ; 
- D 0 - I - 0x039337 0E:9327: 00        .byte $00   ; 
- D 0 - I - 0x039338 0E:9328: 00        .byte $00   ; 
- - - - - - 0x039339 0E:9329: 00        .byte $00   ; 
- - - - - - 0x03933A 0E:932A: 00        .byte $00   ; 
- D 0 - I - 0x03933B 0E:932B: 00        .byte $00   ; 
- D 0 - I - 0x03933C 0E:932C: 00        .byte $00   ; 
- D 0 - I - 0x03933D 0E:932D: 00        .byte $00   ; 
- D 0 - I - 0x03933E 0E:932E: 00        .byte $00   ; 
- D 0 - I - 0x03933F 0E:932F: 00        .byte $00   ; 
- D 0 - I - 0x039340 0E:9330: 00        .byte $00   ; 
- D 0 - I - 0x039341 0E:9331: 03        .byte $03   ; 
- D 0 - I - 0x039342 0E:9332: 00        .byte $00   ; 
- - - - - - 0x039343 0E:9333: 00        .byte $00   ; 
- - - - - - 0x039344 0E:9334: 00        .byte $00   ; 
- - - - - - 0x039345 0E:9335: 00        .byte $00   ; 
- - - - - - 0x039346 0E:9336: 00        .byte $00   ; 
- - - - - - 0x039347 0E:9337: 00        .byte $00   ; 
- - - - - - 0x039348 0E:9338: 00        .byte $00   ; 
- - - - - - 0x039349 0E:9339: 00        .byte $00   ; 
- - - - - - 0x03934A 0E:933A: 00        .byte $00   ; 
- - - - - - 0x03934B 0E:933B: 00        .byte $00   ; 
- - - - - - 0x03934C 0E:933C: 00        .byte $00   ; 
- - - - - - 0x03934D 0E:933D: 00        .byte $00   ; 
- - - - - - 0x03934E 0E:933E: 00        .byte $00   ; 
- D 0 - I - 0x03934F 0E:933F: 07        .byte $07   ; 
- D 0 - I - 0x039350 0E:9340: 94        .byte $94   ; 
- D 0 - I - 0x039351 0E:9341: 00        .byte $00   ; 
- D 0 - I - 0x039352 0E:9342: 00        .byte $00   ; 
- D 0 - I - 0x039353 0E:9343: 00        .byte $00   ; 
- D 0 - I - 0x039354 0E:9344: 00        .byte $00   ; 
- D 0 - I - 0x039355 0E:9345: 00        .byte $00   ; 
- D 0 - I - 0x039356 0E:9346: 00        .byte $00   ; 
- D 0 - I - 0x039357 0E:9347: 00        .byte $00   ; 
- D 0 - I - 0x039358 0E:9348: 00        .byte $00   ; 
- D 0 - I - 0x039359 0E:9349: 00        .byte $00   ; 
- D 0 - I - 0x03935A 0E:934A: 00        .byte $00   ; 
- D 0 - I - 0x03935B 0E:934B: 00        .byte $00   ; 
- D 0 - I - 0x03935C 0E:934C: 00        .byte $00   ; 
- D 0 - I - 0x03935D 0E:934D: 0C        .byte $0C   ; 
- D 0 - I - 0x03935E 0E:934E: 3A        .byte $3A   ; 
- D 0 - I - 0x03935F 0E:934F: 12        .byte $12   ; 
- D 0 - I - 0x039360 0E:9350: 25        .byte $25   ; 
- D 0 - I - 0x039361 0E:9351: 11        .byte $11   ; 
- D 0 - I - 0x039362 0E:9352: 48        .byte $48   ; <H>
- D 0 - I - 0x039363 0E:9353: 4A        .byte $4A   ; <J>
- D 0 - I - 0x039364 0E:9354: 49        .byte $49   ; <I>
- D 0 - I - 0x039365 0E:9355: 44        .byte $44   ; <D>
- D 0 - I - 0x039366 0E:9356: 1A        .byte $1A   ; 
- D 0 - I - 0x039367 0E:9357: 03        .byte $03   ; 
- D 0 - I - 0x039368 0E:9358: 25        .byte $25   ; 
- D 0 - I - 0x039369 0E:9359: 01        .byte $01   ; 
- D 0 - I - 0x03936A 0E:935A: 3A        .byte $3A   ; 
- D 0 - I - 0x03936B 0E:935B: 41        .byte $41   ; <A>
- D 0 - I - 0x03936C 0E:935C: 03        .byte $03   ; 
- D 0 - I - 0x03936D 0E:935D: 14        .byte $14   ; 
- D 0 - I - 0x03936E 0E:935E: 19        .byte $19   ; 
- D 0 - I - 0x03936F 0E:935F: 03        .byte $03   ; 
- D 0 - I - 0x039370 0E:9360: 22        .byte $22   ; 
- D 0 - I - 0x039371 0E:9361: 18        .byte $18   ; 
- D 0 - I - 0x039372 0E:9362: 25        .byte $25   ; 
- D 0 - I - 0x039373 0E:9363: 18        .byte $18   ; 
- D 0 - I - 0x039374 0E:9364: 2A        .byte $2A   ; 
- D 0 - I - 0x039375 0E:9365: 18        .byte $18   ; 
- D 0 - I - 0x039376 0E:9366: 29        .byte $29   ; 
- D 0 - I - 0x039377 0E:9367: 18        .byte $18   ; 
- D 0 - I - 0x039378 0E:9368: 03        .byte $03   ; 
- D 0 - I - 0x039379 0E:9369: 22        .byte $22   ; 
- D 0 - I - 0x03937A 0E:936A: 17        .byte $17   ; 
- D 0 - I - 0x03937B 0E:936B: 25        .byte $25   ; 
- D 0 - I - 0x03937C 0E:936C: 17        .byte $17   ; 
- D 0 - I - 0x03937D 0E:936D: 2A        .byte $2A   ; 
- D 0 - I - 0x03937E 0E:936E: 17        .byte $17   ; 
- D 0 - I - 0x03937F 0E:936F: 29        .byte $29   ; 
- D 0 - I - 0x039380 0E:9370: 17        .byte $17   ; 
- D 0 - I - 0x039381 0E:9371: 03        .byte $03   ; 
- D 0 - I - 0x039382 0E:9372: 3A        .byte $3A   ; 
- D 0 - I - 0x039383 0E:9373: 03        .byte $03   ; 
- D 0 - I - 0x039384 0E:9374: 30        .byte $30   ; <0>
- D 0 - I - 0x039385 0E:9375: 34        .byte $34   ; <4>
- D 0 - I - 0x039386 0E:9376: 3A        .byte $3A   ; 
- D 0 - I - 0x039387 0E:9377: 03        .byte $03   ; 
- D 0 - I - 0x039388 0E:9378: 1C        .byte $1C   ; 
- D 0 - I - 0x039389 0E:9379: 03        .byte $03   ; 
- D 0 - I - 0x03938A 0E:937A: 4C        .byte $4C   ; <L>
- D 0 - I - 0x03938B 0E:937B: 19        .byte $19   ; 
- D 0 - I - 0x03938C 0E:937C: 03        .byte $03   ; 
- D 0 - I - 0x03938D 0E:937D: 2C        .byte $2C   ; 
- D 0 - I - 0x03938E 0E:937E: 3A        .byte $3A   ; 
- D 0 - I - 0x03938F 0E:937F: 03        .byte $03   ; 
- D 0 - I - 0x039390 0E:9380: 3E        .byte $3E   ; 
- D 0 - I - 0x039391 0E:9381: 03        .byte $03   ; 
- D 0 - I - 0x039392 0E:9382: 72        .byte $72   ; <r>
- D 0 - I - 0x039393 0E:9383: 03        .byte $03   ; 
- D 0 - I - 0x039394 0E:9384: 50        .byte $50   ; <P>
- D 0 - I - 0x039395 0E:9385: 03        .byte $03   ; 
- D 0 - I - 0x039396 0E:9386: 0C        .byte $0C   ; 
- D 0 - I - 0x039397 0E:9387: 03        .byte $03   ; 
- D 0 - I - 0x039398 0E:9388: 54        .byte $54   ; <T>
- D 0 - I - 0x039399 0E:9389: 03        .byte $03   ; 
- D 0 - I - 0x03939A 0E:938A: 88        .byte $88   ; 
- D 0 - I - 0x03939B 0E:938B: 03        .byte $03   ; 
- D 0 - I - 0x03939C 0E:938C: 76        .byte $76   ; <v>
- D 0 - I - 0x03939D 0E:938D: 03        .byte $03   ; 
- D 0 - I - 0x03939E 0E:938E: 58        .byte $58   ; <X>
- D 0 - I - 0x03939F 0E:938F: 3A        .byte $3A   ; 
- D 0 - I - 0x0393A0 0E:9390: 03        .byte $03   ; 
- D 0 - I - 0x0393A1 0E:9391: 50        .byte $50   ; <P>
- D 0 - I - 0x0393A2 0E:9392: 03        .byte $03   ; 
- D 0 - I - 0x0393A3 0E:9393: 0C        .byte $0C   ; 
- D 0 - I - 0x0393A4 0E:9394: 03        .byte $03   ; 
- D 0 - I - 0x0393A5 0E:9395: 4C        .byte $4C   ; <L>
- D 0 - I - 0x0393A6 0E:9396: FF        .byte $FF   ; 
- D 0 - I - 0x0393A7 0E:9397: 03        .byte $03   ; 
- D 0 - I - 0x0393A8 0E:9398: 3A        .byte $3A   ; 
- D 0 - I - 0x0393A9 0E:9399: 03        .byte $03   ; 
- D 0 - I - 0x0393AA 0E:939A: 22        .byte $22   ; 
- D 0 - I - 0x0393AB 0E:939B: FF        .byte $FF   ; 
- D 0 - I - 0x0393AC 0E:939C: 25        .byte $25   ; 
- D 0 - I - 0x0393AD 0E:939D: FF        .byte $FF   ; 
- D 0 - I - 0x0393AE 0E:939E: 03        .byte $03   ; 
- D 0 - I - 0x0393AF 0E:939F: 22        .byte $22   ; 
- D 0 - I - 0x0393B0 0E:93A0: FF        .byte $FF   ; 
- D 0 - I - 0x0393B1 0E:93A1: 25        .byte $25   ; 
- D 0 - I - 0x0393B2 0E:93A2: FF        .byte $FF   ; 
- D 0 - I - 0x0393B3 0E:93A3: 03        .byte $03   ; 
- D 0 - I - 0x0393B4 0E:93A4: 1C        .byte $1C   ; 
- D 0 - I - 0x0393B5 0E:93A5: 03        .byte $03   ; 
- D 0 - I - 0x0393B6 0E:93A6: 3E        .byte $3E   ; 
- D 0 - I - 0x0393B7 0E:93A7: 03        .byte $03   ; 
- D 0 - I - 0x0393B8 0E:93A8: 2C        .byte $2C   ; 
- D 0 - I - 0x0393B9 0E:93A9: 3A        .byte $3A   ; 
- D 0 - I - 0x0393BA 0E:93AA: 03        .byte $03   ; 
- D 0 - I - 0x0393BB 0E:93AB: 30        .byte $30   ; <0>
- D 0 - I - 0x0393BC 0E:93AC: 34        .byte $34   ; <4>
- D 0 - I - 0x0393BD 0E:93AD: 3A        .byte $3A   ; 
- D 0 - I - 0x0393BE 0E:93AE: 03        .byte $03   ; 
- D 0 - I - 0x0393BF 0E:93AF: 7A        .byte $7A   ; <z>
- D 0 - I - 0x0393C0 0E:93B0: 03        .byte $03   ; 
- D 0 - I - 0x0393C1 0E:93B1: 3A        .byte $3A   ; 
- D 0 - I - 0x0393C2 0E:93B2: 03        .byte $03   ; 
- D 0 - I - 0x0393C3 0E:93B3: 60        .byte $60   ; 
- D 0 - I - 0x0393C4 0E:93B4: 03        .byte $03   ; 
- D 0 - I - 0x0393C5 0E:93B5: 30        .byte $30   ; <0>
- D 0 - I - 0x0393C6 0E:93B6: 34        .byte $34   ; <4>
- D 0 - I - 0x0393C7 0E:93B7: 3A        .byte $3A   ; 
- D 0 - I - 0x0393C8 0E:93B8: 03        .byte $03   ; 
- D 0 - I - 0x0393C9 0E:93B9: 14        .byte $14   ; 
- D 0 - I - 0x0393CA 0E:93BA: 19        .byte $19   ; 
- D 0 - I - 0x0393CB 0E:93BB: 03        .byte $03   ; 
- D 0 - I - 0x0393CC 0E:93BC: 3A        .byte $3A   ; 
- D 0 - I - 0x0393CD 0E:93BD: 03        .byte $03   ; 
- D 0 - I - 0x0393CE 0E:93BE: 3A        .byte $3A   ; 
- D 0 - I - 0x0393CF 0E:93BF: 41        .byte $41   ; <A>
- D 0 - I - 0x0393D0 0E:93C0: 03        .byte $03   ; 
- D 0 - I - 0x0393D1 0E:93C1: 3E        .byte $3E   ; 
- D 0 - I - 0x0393D2 0E:93C2: 03        .byte $03   ; 
- D 0 - I - 0x0393D3 0E:93C3: 2A        .byte $2A   ; 
- D 0 - I - 0x0393D4 0E:93C4: FF        .byte $FF   ; 
- D 0 - I - 0x0393D5 0E:93C5: 29        .byte $29   ; 
- D 0 - I - 0x0393D6 0E:93C6: FF        .byte $FF   ; 
- D 0 - I - 0x0393D7 0E:93C7: 03        .byte $03   ; 
- D 0 - I - 0x0393D8 0E:93C8: 2A        .byte $2A   ; 
- D 0 - I - 0x0393D9 0E:93C9: FF        .byte $FF   ; 
- D 0 - I - 0x0393DA 0E:93CA: 29        .byte $29   ; 
- D 0 - I - 0x0393DB 0E:93CB: FF        .byte $FF   ; 
- D 0 - I - 0x0393DC 0E:93CC: 03        .byte $03   ; 
- D 0 - I - 0x0393DD 0E:93CD: 4C        .byte $4C   ; <L>
- D 0 - I - 0x0393DE 0E:93CE: FF        .byte $FF   ; 
- D 0 - I - 0x0393DF 0E:93CF: 03        .byte $03   ; 
- D 0 - I - 0x0393E0 0E:93D0: 1C        .byte $1C   ; 
- D 0 - I - 0x0393E1 0E:93D1: 03        .byte $03   ; 
- D 0 - I - 0x0393E2 0E:93D2: 2C        .byte $2C   ; 
- D 0 - I - 0x0393E3 0E:93D3: 3A        .byte $3A   ; 
- D 0 - I - 0x0393E4 0E:93D4: 03        .byte $03   ; 
- D 0 - I - 0x0393E5 0E:93D5: 7E        .byte $7E   ; 
- D 0 - I - 0x0393E6 0E:93D6: 03        .byte $03   ; 
- D 0 - I - 0x0393E7 0E:93D7: 7E        .byte $7E   ; 
- D 0 - I - 0x0393E8 0E:93D8: 03        .byte $03   ; 
- D 0 - I - 0x0393E9 0E:93D9: 25        .byte $25   ; 
- D 0 - I - 0x0393EA 0E:93DA: FF        .byte $FF   ; 
- D 0 - I - 0x0393EB 0E:93DB: 03        .byte $03   ; 
- D 0 - I - 0x0393EC 0E:93DC: 25        .byte $25   ; 
- D 0 - I - 0x0393ED 0E:93DD: FF        .byte $FF   ; 
- D 0 - I - 0x0393EE 0E:93DE: 03        .byte $03   ; 
- D 0 - I - 0x0393EF 0E:93DF: 68        .byte $68   ; <h>
- D 0 - I - 0x0393F0 0E:93E0: 85        .byte $85   ; 
- D 0 - I - 0x0393F1 0E:93E1: 86        .byte $86   ; 
- D 0 - I - 0x0393F2 0E:93E2: 03        .byte $03   ; 
- D 0 - I - 0x0393F3 0E:93E3: 64        .byte $64   ; <d>
- D 0 - I - 0x0393F4 0E:93E4: 85        .byte $85   ; 
- D 0 - I - 0x0393F5 0E:93E5: 86        .byte $86   ; 
- D 0 - I - 0x0393F6 0E:93E6: 03        .byte $03   ; 
- D 0 - I - 0x0393F7 0E:93E7: 7A        .byte $7A   ; <z>
- D 0 - I - 0x0393F8 0E:93E8: 03        .byte $03   ; 
- D 0 - I - 0x0393F9 0E:93E9: 3A        .byte $3A   ; 
- D 0 - I - 0x0393FA 0E:93EA: 03        .byte $03   ; 
- D 0 - I - 0x0393FB 0E:93EB: 72        .byte $72   ; <r>
- D 0 - I - 0x0393FC 0E:93EC: 03        .byte $03   ; 
- D 0 - I - 0x0393FD 0E:93ED: 0C        .byte $0C   ; 
- D 0 - I - 0x0393FE 0E:93EE: 3A        .byte $3A   ; 
- D 0 - I - 0x0393FF 0E:93EF: 81        .byte $81   ; 
- D 0 - I - 0x039400 0E:93F0: 03        .byte $03   ; 
- D 0 - I - 0x039401 0E:93F1: 3A        .byte $3A   ; 
- D 0 - I - 0x039402 0E:93F2: 6C        .byte $6C   ; <l>
- D 0 - I - 0x039403 0E:93F3: 03        .byte $03   ; 
- D 0 - I - 0x039404 0E:93F4: 60        .byte $60   ; 
- D 0 - I - 0x039405 0E:93F5: 03        .byte $03   ; 
- D 0 - I - 0x039406 0E:93F6: 58        .byte $58   ; <X>
- D 0 - I - 0x039407 0E:93F7: 3A        .byte $3A   ; 
- D 0 - I - 0x039408 0E:93F8: 03        .byte $03   ; 
- D 0 - I - 0x039409 0E:93F9: 88        .byte $88   ; 
- D 0 - I - 0x03940A 0E:93FA: 03        .byte $03   ; 
- D 0 - I - 0x03940B 0E:93FB: 50        .byte $50   ; <P>
- D 0 - I - 0x03940C 0E:93FC: 03        .byte $03   ; 
- D 0 - I - 0x03940D 0E:93FD: 54        .byte $54   ; <T>
- D 0 - I - 0x03940E 0E:93FE: 03        .byte $03   ; 
- D 0 - I - 0x03940F 0E:93FF: 50        .byte $50   ; <P>
- D 0 - I - 0x039410 0E:9400: 03        .byte $03   ; 
- D 0 - I - 0x039411 0E:9401: 0C        .byte $0C   ; 
- D 0 - I - 0x039412 0E:9402: 03        .byte $03   ; 
- D 0 - I - 0x039413 0E:9403: 76        .byte $76   ; <v>
- D 0 - I - 0x039414 0E:9404: 03        .byte $03   ; 
- D 0 - I - 0x039415 0E:9405: 0C        .byte $0C   ; 
- D 0 - I - 0x039416 0E:9406: 03        .byte $03   ; 
- D 0 - I - 0x039417 0E:9407: 3A        .byte $3A   ; 
- D 0 - I - 0x039418 0E:9408: 5C        .byte $5C   ; 
- D 0 - I - 0x039419 0E:9409: 03        .byte $03   ; 
- D 0 - I - 0x03941A 0E:940A: 01        .byte $01   ; 
- D 0 - I - 0x03941B 0E:940B: 02        .byte $02   ; 
- D 0 - I - 0x03941C 0E:940C: 02        .byte $02   ; 
- D 0 - I - 0x03941D 0E:940D: 03        .byte $03   ; 
- D 0 - I - 0x03941E 0E:940E: 02        .byte $02   ; 
- D 0 - I - 0x03941F 0E:940F: 03        .byte $03   ; 
- D 0 - I - 0x039420 0E:9410: 01        .byte $01   ; 
- D 0 - I - 0x039421 0E:9411: 02        .byte $02   ; 
- D 0 - I - 0x039422 0E:9412: 02        .byte $02   ; 
- D 0 - I - 0x039423 0E:9413: 03        .byte $03   ; 
- D 0 - I - 0x039424 0E:9414: 02        .byte $02   ; 
- D 0 - I - 0x039425 0E:9415: 04        .byte $04   ; 
- D 0 - I - 0x039426 0E:9416: 02        .byte $02   ; 
- D 0 - I - 0x039427 0E:9417: 02        .byte $02   ; 
- D 0 - I - 0x039428 0E:9418: 06        .byte $06   ; 
- D 0 - I - 0x039429 0E:9419: 02        .byte $02   ; 
- D 0 - I - 0x03942A 0E:941A: 02        .byte $02   ; 
- D 0 - I - 0x03942B 0E:941B: 02        .byte $02   ; 
- - - - - - 0x03942C 0E:941C: 02        .byte $02   ; 
- D 0 - I - 0x03942D 0E:941D: 02        .byte $02   ; 
- D 0 - I - 0x03942E 0E:941E: 05        .byte $05   ; 
- D 0 - I - 0x03942F 0E:941F: 02        .byte $02   ; 
- D 0 - I - 0x039430 0E:9420: 02        .byte $02   ; 
- D 0 - I - 0x039431 0E:9421: 06        .byte $06   ; 
- D 0 - I - 0x039432 0E:9422: 04        .byte $04   ; 
- D 0 - I - 0x039433 0E:9423: 02        .byte $02   ; 
- D 0 - I - 0x039434 0E:9424: 03        .byte $03   ; 
- D 0 - I - 0x039435 0E:9425: 01        .byte $01   ; 
- D 0 - I - 0x039436 0E:9426: 11        .byte $11   ; 
- D 0 - I - 0x039437 0E:9427: 01        .byte $01   ; 
- D 0 - I - 0x039438 0E:9428: 01        .byte $01   ; 
- D 0 - I - 0x039439 0E:9429: 03        .byte $03   ; 
- D 0 - I - 0x03943A 0E:942A: 18        .byte $18   ; 
- D 0 - I - 0x03943B 0E:942B: 03        .byte $03   ; 
- D 0 - I - 0x03943C 0E:942C: 17        .byte $17   ; 
- D 0 - I - 0x03943D 0E:942D: 02        .byte $02   ; 
- D 0 - I - 0x03943E 0E:942E: 1F        .byte $1F   ; 
- D 0 - I - 0x03943F 0E:942F: 02        .byte $02   ; 
- D 0 - I - 0x039440 0E:9430: 1A        .byte $1A   ; 
- D 0 - I - 0x039441 0E:9431: 83        .byte $83   ; 
- D 0 - I - 0x039442 0E:9432: 82        .byte $82   ; 
- D 0 - I - 0x039443 0E:9433: 83        .byte $83   ; 
- D 0 - I - 0x039444 0E:9434: 84        .byte $84   ; 
- D 0 - I - 0x039445 0E:9435: 81        .byte $81   ; 
- D 0 - I - 0x039446 0E:9436: 81        .byte $81   ; 
- D 0 - I - 0x039447 0E:9437: 02        .byte $02   ; 
- D 0 - I - 0x039448 0E:9438: 18        .byte $18   ; 
- D 0 - I - 0x039449 0E:9439: 02        .byte $02   ; 
- D 0 - I - 0x03944A 0E:943A: 17        .byte $17   ; 
- D 0 - I - 0x03944B 0E:943B: 83        .byte $83   ; 
- D 0 - I - 0x03944C 0E:943C: 83        .byte $83   ; 
- D 0 - I - 0x03944D 0E:943D: 83        .byte $83   ; 
- D 0 - I - 0x03944E 0E:943E: 02        .byte $02   ; 
- D 0 - I - 0x03944F 0E:943F: 02        .byte $02   ; 
- D 0 - I - 0x039450 0E:9440: 83        .byte $83   ; 
- D 0 - I - 0x039451 0E:9441: 81        .byte $81   ; 
- - - - - - 0x039452 0E:9442: 83        .byte $83   ; 
- D 0 - I - 0x039453 0E:9443: 83        .byte $83   ; 
- D 0 - I - 0x039454 0E:9444: 83        .byte $83   ; 
- D 0 - I - 0x039455 0E:9445: 83        .byte $83   ; 
- D 0 - I - 0x039456 0E:9446: 01        .byte $01   ; 
- D 0 - I - 0x039457 0E:9447: 18        .byte $18   ; 
- D 0 - I - 0x039458 0E:9448: 01        .byte $01   ; 
- D 0 - I - 0x039459 0E:9449: 17        .byte $17   ; 
- D 0 - I - 0x03945A 0E:944A: 84        .byte $84   ; 
- D 0 - I - 0x03945B 0E:944B: 82        .byte $82   ; 
- D 0 - I - 0x03945C 0E:944C: 83        .byte $83   ; 
- D 0 - I - 0x03945D 0E:944D: 83        .byte $83   ; 
- D 0 - I - 0x03945E 0E:944E: 83        .byte $83   ; 
- D 0 - I - 0x03945F 0E:944F: 81        .byte $81   ; 
- D 0 - I - 0x039460 0E:9450: 82        .byte $82   ; 
- D 0 - I - 0x039461 0E:9451: 84        .byte $84   ; 
- D 0 - I - 0x039462 0E:9452: 84        .byte $84   ; 
- D 0 - I - 0x039463 0E:9453: 81        .byte $81   ; 
- D 0 - I - 0x039464 0E:9454: 83        .byte $83   ; 
- D 0 - I - 0x039465 0E:9455: 82        .byte $82   ; 
- - - - - - 0x039466 0E:9456: 83        .byte $83   ; 
- D 0 - I - 0x039467 0E:9457: 83        .byte $83   ; 
- D 0 - I - 0x039468 0E:9458: 83        .byte $83   ; 
- D 0 - I - 0x039469 0E:9459: 83        .byte $83   ; 
- D 0 - I - 0x03946A 0E:945A: 01        .byte $01   ; 
- D 0 - I - 0x03946B 0E:945B: 18        .byte $18   ; 
- D 0 - I - 0x03946C 0E:945C: 01        .byte $01   ; 
- D 0 - I - 0x03946D 0E:945D: 17        .byte $17   ; 
- D 0 - I - 0x03946E 0E:945E: 81        .byte $81   ; 
- D 0 - I - 0x03946F 0E:945F: 81        .byte $81   ; 
- D 0 - - - 0x039470 0E:9460: 74        .byte $74   ; <t>
- D 0 - - - 0x039471 0E:9461: 94        .byte $94   ; 
- D 0 - - - 0x039472 0E:9462: 00        .byte $00   ; 
- D 0 - - - 0x039473 0E:9463: 95        .byte $95   ; 
- D 0 - - - 0x039474 0E:9464: 10        .byte $10   ; 
- D 0 - - - 0x039475 0E:9465: 95        .byte $95   ; 
- D 0 - - - 0x039476 0E:9466: 2C        .byte $2C   ; 
- D 0 - - - 0x039477 0E:9467: 95        .byte $95   ; 
- D 0 - - - 0x039478 0E:9468: 40        .byte $40   ; 
- D 0 - - - 0x039479 0E:9469: 95        .byte $95   ; 
- D 0 - - - 0x03947A 0E:946A: 44        .byte $44   ; <D>
- D 0 - - - 0x03947B 0E:946B: 95        .byte $95   ; 
- D 0 - - - 0x03947C 0E:946C: 48        .byte $48   ; <H>
- D 0 - - - 0x03947D 0E:946D: 95        .byte $95   ; 
- D 0 - - - 0x03947E 0E:946E: 50        .byte $50   ; <P>
- D 0 - - - 0x03947F 0E:946F: 95        .byte $95   ; 
- D 0 - - - 0x039480 0E:9470: 50        .byte $50   ; <P>
- D 0 - - - 0x039481 0E:9471: 95        .byte $95   ; 
- D 0 - - - 0x039482 0E:9472: 50        .byte $50   ; <P>
- D 0 - - - 0x039483 0E:9473: 95        .byte $95   ; 
- D 0 - I - 0x039484 0E:9474: 00        .byte $00   ; 
- D 0 - I - 0x039485 0E:9475: 01        .byte $01   ; 
- D 0 - I - 0x039486 0E:9476: 50        .byte $50   ; <P>
- D 0 - I - 0x039487 0E:9477: 00        .byte $00   ; 
- D 0 - I - 0x039488 0E:9478: 00        .byte $00   ; 
- D 0 - I - 0x039489 0E:9479: 05        .byte $05   ; 
- D 0 - I - 0x03948A 0E:947A: 5A        .byte $5A   ; <Z>
- D 0 - I - 0x03948B 0E:947B: 00        .byte $00   ; 
- D 0 - I - 0x03948C 0E:947C: 00        .byte $00   ; 
- D 0 - I - 0x03948D 0E:947D: 05        .byte $05   ; 
- D 0 - I - 0x03948E 0E:947E: 5A        .byte $5A   ; <Z>
- D 0 - I - 0x03948F 0E:947F: 00        .byte $00   ; 
- D 0 - I - 0x039490 0E:9480: 8A        .byte $8A   ; 
- D 0 - I - 0x039491 0E:9481: 15        .byte $15   ; 
- D 0 - I - 0x039492 0E:9482: C8        .byte $C8   ; 
- D 0 - I - 0x039493 0E:9483: 20        .byte $20   ; 
- D 0 - I - 0x039494 0E:9484: 9A        .byte $9A   ; 
- D 0 - I - 0x039495 0E:9485: 22        .byte $22   ; 
- D 0 - I - 0x039496 0E:9486: 40        .byte $40   ; 
- D 0 - I - 0x039497 0E:9487: 31        .byte $31   ; <1>
- D 0 - I - 0x039498 0E:9488: 80        .byte $80   ; 
- D 0 - I - 0x039499 0E:9489: 10        .byte $10   ; 
- D 0 - I - 0x03949A 0E:948A: C8        .byte $C8   ; 
- D 0 - I - 0x03949B 0E:948B: 20        .byte $20   ; 
- D 0 - I - 0x03949C 0E:948C: 84        .byte $84   ; 
- D 0 - I - 0x03949D 0E:948D: 16        .byte $16   ; 
- D 0 - I - 0x03949E 0E:948E: F0        .byte $F0   ; 
- D 0 - I - 0x03949F 0E:948F: 20        .byte $20   ; 
- D 0 - I - 0x0394A0 0E:9490: 84        .byte $84   ; 
- D 0 - I - 0x0394A1 0E:9491: 11        .byte $11   ; 
- D 0 - I - 0x0394A2 0E:9492: C8        .byte $C8   ; 
- D 0 - I - 0x0394A3 0E:9493: 00        .byte $00   ; 
- D 0 - I - 0x0394A4 0E:9494: 02        .byte $02   ; 
- D 0 - I - 0x0394A5 0E:9495: 12        .byte $12   ; 
- D 0 - I - 0x0394A6 0E:9496: C8        .byte $C8   ; 
- D 0 - I - 0x0394A7 0E:9497: 00        .byte $00   ; 
- D 0 - I - 0x0394A8 0E:9498: 85        .byte $85   ; 
- D 0 - I - 0x0394A9 0E:9499: 13        .byte $13   ; 
- D 0 - I - 0x0394AA 0E:949A: B4        .byte $B4   ; 
- D 0 - I - 0x0394AB 0E:949B: 10        .byte $10   ; 
- D 0 - I - 0x0394AC 0E:949C: 8C        .byte $8C   ; 
- D 0 - I - 0x0394AD 0E:949D: 23        .byte $23   ; 
- D 0 - I - 0x0394AE 0E:949E: 7C        .byte $7C   ; 
- D 0 - I - 0x0394AF 0E:949F: 21        .byte $21   ; 
- D 0 - I - 0x0394B0 0E:94A0: 85        .byte $85   ; 
- D 0 - I - 0x0394B1 0E:94A1: 1A        .byte $1A   ; 
- D 0 - I - 0x0394B2 0E:94A2: C8        .byte $C8   ; 
- D 0 - I - 0x0394B3 0E:94A3: 20        .byte $20   ; 
- D 0 - I - 0x0394B4 0E:94A4: A0        .byte $A0   ; 
- D 0 - I - 0x0394B5 0E:94A5: 15        .byte $15   ; 
- D 0 - I - 0x0394B6 0E:94A6: F0        .byte $F0   ; 
- D 0 - I - 0x0394B7 0E:94A7: 20        .byte $20   ; 
- D 0 - I - 0x0394B8 0E:94A8: C0        .byte $C0   ; 
- D 0 - I - 0x0394B9 0E:94A9: 22        .byte $22   ; 
- D 0 - I - 0x0394BA 0E:94AA: 72        .byte $72   ; <r>
- D 0 - I - 0x0394BB 0E:94AB: 21        .byte $21   ; 
- D 0 - I - 0x0394BC 0E:94AC: 02        .byte $02   ; 
- D 0 - I - 0x0394BD 0E:94AD: 11        .byte $11   ; 
- D 0 - I - 0x0394BE 0E:94AE: A0        .byte $A0   ; 
- D 0 - I - 0x0394BF 0E:94AF: 20        .byte $20   ; 
- D 0 - I - 0x0394C0 0E:94B0: 86        .byte $86   ; 
- D 0 - I - 0x0394C1 0E:94B1: 18        .byte $18   ; 
- D 0 - I - 0x0394C2 0E:94B2: FA        .byte $FA   ; 
- D 0 - I - 0x0394C3 0E:94B3: 20        .byte $20   ; 
- D 0 - I - 0x0394C4 0E:94B4: 85        .byte $85   ; 
- D 0 - I - 0x0394C5 0E:94B5: 18        .byte $18   ; 
- D 0 - I - 0x0394C6 0E:94B6: FA        .byte $FA   ; 
- D 0 - I - 0x0394C7 0E:94B7: 20        .byte $20   ; 
- D 0 - I - 0x0394C8 0E:94B8: A8        .byte $A8   ; 
- D 0 - I - 0x0394C9 0E:94B9: 2D        .byte $2D   ; 
- D 0 - I - 0x0394CA 0E:94BA: C8        .byte $C8   ; 
- D 0 - I - 0x0394CB 0E:94BB: 30        .byte $30   ; <0>
- D 0 - I - 0x0394CC 0E:94BC: 99        .byte $99   ; 
- D 0 - I - 0x0394CD 0E:94BD: 58        .byte $58   ; <X>
- D 0 - I - 0x0394CE 0E:94BE: 90        .byte $90   ; 
- D 0 - I - 0x0394CF 0E:94BF: 31        .byte $31   ; <1>
- D 0 - I - 0x0394D0 0E:94C0: 92        .byte $92   ; 
- D 0 - I - 0x0394D1 0E:94C1: 12        .byte $12   ; 
- D 0 - I - 0x0394D2 0E:94C2: C8        .byte $C8   ; 
- D 0 - I - 0x0394D3 0E:94C3: 00        .byte $00   ; 
- D 0 - I - 0x0394D4 0E:94C4: 86        .byte $86   ; 
- D 0 - I - 0x0394D5 0E:94C5: 13        .byte $13   ; 
- D 0 - I - 0x0394D6 0E:94C6: 00        .byte $00   ; 
- D 0 - I - 0x0394D7 0E:94C7: 00        .byte $00   ; 
- D 0 - I - 0x0394D8 0E:94C8: 8A        .byte $8A   ; 
- D 0 - I - 0x0394D9 0E:94C9: 13        .byte $13   ; 
- D 0 - I - 0x0394DA 0E:94CA: 00        .byte $00   ; 
- D 0 - I - 0x0394DB 0E:94CB: 00        .byte $00   ; 
- D 0 - I - 0x0394DC 0E:94CC: 90        .byte $90   ; 
- D 0 - I - 0x0394DD 0E:94CD: 16        .byte $16   ; 
- D 0 - I - 0x0394DE 0E:94CE: 00        .byte $00   ; 
- D 0 - I - 0x0394DF 0E:94CF: 20        .byte $20   ; 
- D 0 - I - 0x0394E0 0E:94D0: A0        .byte $A0   ; 
- D 0 - I - 0x0394E1 0E:94D1: 1A        .byte $1A   ; 
- D 0 - I - 0x0394E2 0E:94D2: 00        .byte $00   ; 
- D 0 - I - 0x0394E3 0E:94D3: 20        .byte $20   ; 
- D 0 - I - 0x0394E4 0E:94D4: 85        .byte $85   ; 
- D 0 - I - 0x0394E5 0E:94D5: 0E        .byte $0E   ; 
- D 0 - I - 0x0394E6 0E:94D6: 00        .byte $00   ; 
- D 0 - I - 0x0394E7 0E:94D7: 00        .byte $00   ; 
- D 0 - I - 0x0394E8 0E:94D8: 84        .byte $84   ; 
- D 0 - I - 0x0394E9 0E:94D9: 0E        .byte $0E   ; 
- D 0 - I - 0x0394EA 0E:94DA: 00        .byte $00   ; 
- D 0 - I - 0x0394EB 0E:94DB: 00        .byte $00   ; 
- D 0 - I - 0x0394EC 0E:94DC: F0        .byte $F0   ; 
- D 0 - I - 0x0394ED 0E:94DD: 0F        .byte $0F   ; 
- D 0 - I - 0x0394EE 0E:94DE: 00        .byte $00   ; 
- D 0 - I - 0x0394EF 0E:94DF: 20        .byte $20   ; 
- D 0 - I - 0x0394F0 0E:94E0: 00        .byte $00   ; 
- D 0 - I - 0x0394F1 0E:94E1: 15        .byte $15   ; 
- D 0 - I - 0x0394F2 0E:94E2: 00        .byte $00   ; 
- D 0 - I - 0x0394F3 0E:94E3: 20        .byte $20   ; 
- D 0 - I - 0x0394F4 0E:94E4: FA        .byte $FA   ; 
- D 0 - I - 0x0394F5 0E:94E5: 11        .byte $11   ; 
- D 0 - I - 0x0394F6 0E:94E6: 00        .byte $00   ; 
- D 0 - I - 0x0394F7 0E:94E7: 00        .byte $00   ; 
- D 0 - I - 0x0394F8 0E:94E8: FA        .byte $FA   ; 
- D 0 - I - 0x0394F9 0E:94E9: 11        .byte $11   ; 
- D 0 - I - 0x0394FA 0E:94EA: 00        .byte $00   ; 
- D 0 - I - 0x0394FB 0E:94EB: 00        .byte $00   ; 
- D 0 - I - 0x0394FC 0E:94EC: FA        .byte $FA   ; 
- D 0 - I - 0x0394FD 0E:94ED: 0D        .byte $0D   ; 
- D 0 - I - 0x0394FE 0E:94EE: 00        .byte $00   ; 
- D 0 - I - 0x0394FF 0E:94EF: 00        .byte $00   ; 
- D 0 - I - 0x039500 0E:94F0: 02        .byte $02   ; 
- D 0 - I - 0x039501 0E:94F1: 12        .byte $12   ; 
- D 0 - I - 0x039502 0E:94F2: 00        .byte $00   ; 
- D 0 - I - 0x039503 0E:94F3: 20        .byte $20   ; 
- D 0 - I - 0x039504 0E:94F4: 01        .byte $01   ; 
- D 0 - I - 0x039505 0E:94F5: 11        .byte $11   ; 
- D 0 - I - 0x039506 0E:94F6: 00        .byte $00   ; 
- D 0 - I - 0x039507 0E:94F7: 20        .byte $20   ; 
- D 0 - I - 0x039508 0E:94F8: 98        .byte $98   ; 
- D 0 - I - 0x039509 0E:94F9: 21        .byte $21   ; 
- D 0 - I - 0x03950A 0E:94FA: 00        .byte $00   ; 
- D 0 - I - 0x03950B 0E:94FB: 20        .byte $20   ; 
- D 0 - I - 0x03950C 0E:94FC: FC        .byte $FC   ; 
- D 0 - I - 0x03950D 0E:94FD: 14        .byte $14   ; 
- D 0 - I - 0x03950E 0E:94FE: 00        .byte $00   ; 
- D 0 - I - 0x03950F 0E:94FF: 20        .byte $20   ; 
- D 0 - I - 0x039510 0E:9500: 00        .byte $00   ; 
- D 0 - I - 0x039511 0E:9501: 02        .byte $02   ; 
- D 0 - I - 0x039512 0E:9502: 14        .byte $14   ; 
- D 0 - I - 0x039513 0E:9503: 00        .byte $00   ; 
- D 0 - I - 0x039514 0E:9504: B2        .byte $B2   ; 
- D 0 - I - 0x039515 0E:9505: 15        .byte $15   ; 
- D 0 - I - 0x039516 0E:9506: 28        .byte $28   ; 
- D 0 - I - 0x039517 0E:9507: 00        .byte $00   ; 
- D 0 - I - 0x039518 0E:9508: 00        .byte $00   ; 
- D 0 - I - 0x039519 0E:9509: 1A        .byte $1A   ; 
- D 0 - I - 0x03951A 0E:950A: 28        .byte $28   ; 
- D 0 - I - 0x03951B 0E:950B: 00        .byte $00   ; 
- D 0 - I - 0x03951C 0E:950C: 02        .byte $02   ; 
- D 0 - I - 0x03951D 0E:950D: 14        .byte $14   ; 
- D 0 - I - 0x03951E 0E:950E: 00        .byte $00   ; 
- D 0 - I - 0x03951F 0E:950F: 00        .byte $00   ; 
- D 0 - I - 0x039520 0E:9510: 00        .byte $00   ; 
- D 0 - I - 0x039521 0E:9511: 02        .byte $02   ; 
- D 0 - I - 0x039522 0E:9512: 28        .byte $28   ; 
- D 0 - I - 0x039523 0E:9513: 00        .byte $00   ; 
- D 0 - I - 0x039524 0E:9514: 00        .byte $00   ; 
- D 0 - I - 0x039525 0E:9515: 07        .byte $07   ; 
- D 0 - I - 0x039526 0E:9516: 5A        .byte $5A   ; <Z>
- D 0 - I - 0x039527 0E:9517: 00        .byte $00   ; 
- D 0 - I - 0x039528 0E:9518: FC        .byte $FC   ; 
- D 0 - I - 0x039529 0E:9519: 0D        .byte $0D   ; 
- D 0 - I - 0x03952A 0E:951A: 3C        .byte $3C   ; 
- D 0 - I - 0x03952B 0E:951B: 00        .byte $00   ; 
- D 0 - I - 0x03952C 0E:951C: 00        .byte $00   ; 
- D 0 - I - 0x03952D 0E:951D: 0C        .byte $0C   ; 
- D 0 - I - 0x03952E 0E:951E: 00        .byte $00   ; 
- D 0 - I - 0x03952F 0E:951F: 00        .byte $00   ; 
- D 0 - I - 0x039530 0E:9520: 00        .byte $00   ; 
- D 0 - I - 0x039531 0E:9521: 12        .byte $12   ; 
- D 0 - I - 0x039532 0E:9522: 00        .byte $00   ; 
- D 0 - I - 0x039533 0E:9523: 00        .byte $00   ; 
- D 0 - I - 0x039534 0E:9524: 00        .byte $00   ; 
- D 0 - I - 0x039535 0E:9525: 0B        .byte $0B   ; 
- D 0 - I - 0x039536 0E:9526: 00        .byte $00   ; 
- D 0 - I - 0x039537 0E:9527: 00        .byte $00   ; 
- D 0 - I - 0x039538 0E:9528: F0        .byte $F0   ; 
- D 0 - I - 0x039539 0E:9529: 0B        .byte $0B   ; 
- D 0 - I - 0x03953A 0E:952A: 00        .byte $00   ; 
- D 0 - I - 0x03953B 0E:952B: 00        .byte $00   ; 
- D 0 - I - 0x03953C 0E:952C: 00        .byte $00   ; 
- D 0 - I - 0x03953D 0E:952D: 0C        .byte $0C   ; 
- D 0 - I - 0x03953E 0E:952E: 3C        .byte $3C   ; 
- D 0 - I - 0x03953F 0E:952F: 18        .byte $18   ; 
- D 0 - I - 0x039540 0E:9530: 00        .byte $00   ; 
- D 0 - I - 0x039541 0E:9531: 20        .byte $20   ; 
- D 0 - I - 0x039542 0E:9532: 78        .byte $78   ; <x>
- D 0 - I - 0x039543 0E:9533: 38        .byte $38   ; <8>
- D 0 - I - 0x039544 0E:9534: 00        .byte $00   ; 
- D 0 - I - 0x039545 0E:9535: 10        .byte $10   ; 
- D 0 - I - 0x039546 0E:9536: 50        .byte $50   ; <P>
- D 0 - I - 0x039547 0E:9537: 20        .byte $20   ; 
- D 0 - I - 0x039548 0E:9538: 00        .byte $00   ; 
- D 0 - I - 0x039549 0E:9539: 11        .byte $11   ; 
- D 0 - I - 0x03954A 0E:953A: 50        .byte $50   ; <P>
- D 0 - I - 0x03954B 0E:953B: 20        .byte $20   ; 
- D 0 - I - 0x03954C 0E:953C: 00        .byte $00   ; 
- D 0 - I - 0x03954D 0E:953D: 12        .byte $12   ; 
- D 0 - I - 0x03954E 0E:953E: 00        .byte $00   ; 
- D 0 - I - 0x03954F 0E:953F: 30        .byte $30   ; <0>
- D 0 - I - 0x039550 0E:9540: 00        .byte $00   ; 
- D 0 - I - 0x039551 0E:9541: 00        .byte $00   ; 
- D 0 - I - 0x039552 0E:9542: 0A        .byte $0A   ; 
- D 0 - I - 0x039553 0E:9543: 00        .byte $00   ; 
- D 0 - I - 0x039554 0E:9544: 00        .byte $00   ; 
- D 0 - I - 0x039555 0E:9545: 09        .byte $09   ; 
- D 0 - I - 0x039556 0E:9546: 28        .byte $28   ; 
- D 0 - I - 0x039557 0E:9547: 00        .byte $00   ; 
- D 0 - I - 0x039558 0E:9548: 00        .byte $00   ; 
- D 0 - I - 0x039559 0E:9549: 07        .byte $07   ; 
- D 0 - I - 0x03955A 0E:954A: 50        .byte $50   ; <P>
- D 0 - I - 0x03955B 0E:954B: 00        .byte $00   ; 
- D 0 - I - 0x03955C 0E:954C: FC        .byte $FC   ; 
- D 0 - I - 0x03955D 0E:954D: 0E        .byte $0E   ; 
- D 0 - I - 0x03955E 0E:954E: 00        .byte $00   ; 
- D 0 - I - 0x03955F 0E:954F: 00        .byte $00   ; 
- D 0 - I - 0x039560 0E:9550: 00        .byte $00   ; 
- D 0 - I - 0x039561 0E:9551: 00        .byte $00   ; 
- D 0 - I - 0x039562 0E:9552: 00        .byte $00   ; 
- D 0 - I - 0x039563 0E:9553: 00        .byte $00   ; 
- D 0 - - - 0x039564 0E:9554: 5E        .byte $5E   ; 
- D 0 - - - 0x039565 0E:9555: 95        .byte $95   ; 
- D 0 - - - 0x039566 0E:9556: 6E        .byte $6E   ; <n>
- D 0 - - - 0x039567 0E:9557: 95        .byte $95   ; 
- D 0 - - - 0x039568 0E:9558: 86        .byte $86   ; 
- D 0 - - - 0x039569 0E:9559: 95        .byte $95   ; 
- D 0 - - - 0x03956A 0E:955A: 8E        .byte $8E   ; 
- D 0 - - - 0x03956B 0E:955B: 95        .byte $95   ; 
- D 0 - - - 0x03956C 0E:955C: 96        .byte $96   ; 
- D 0 - - - 0x03956D 0E:955D: 95        .byte $95   ; 
- D 0 - I - 0x03956E 0E:955E: 00        .byte $00   ; 
- D 0 - I - 0x03956F 0E:955F: 01        .byte $01   ; 
- D 0 - I - 0x039570 0E:9560: 46        .byte $46   ; <F>
- D 0 - I - 0x039571 0E:9561: 00        .byte $00   ; 
- D 0 - I - 0x039572 0E:9562: 00        .byte $00   ; 
- D 0 - I - 0x039573 0E:9563: 82        .byte $82   ; 
- D 0 - I - 0x039574 0E:9564: 90        .byte $90   ; 
- D 0 - I - 0x039575 0E:9565: 01        .byte $01   ; 
- D 0 - I - 0x039576 0E:9566: 00        .byte $00   ; 
- D 0 - I - 0x039577 0E:9567: 1C        .byte $1C   ; 
- D 0 - I - 0x039578 0E:9568: B4        .byte $B4   ; 
- D 0 - I - 0x039579 0E:9569: 00        .byte $00   ; 
- D 0 - I - 0x03957A 0E:956A: 00        .byte $00   ; 
- D 0 - I - 0x03957B 0E:956B: 19        .byte $19   ; 
- D 0 - I - 0x03957C 0E:956C: B4        .byte $B4   ; 
- D 0 - I - 0x03957D 0E:956D: 00        .byte $00   ; 
- D 0 - I - 0x03957E 0E:956E: 00        .byte $00   ; 
- D 0 - I - 0x03957F 0E:956F: 00        .byte $00   ; 
- D 0 - I - 0x039580 0E:9570: 3C        .byte $3C   ; 
- D 0 - I - 0x039581 0E:9571: 00        .byte $00   ; 
- D 0 - I - 0x039582 0E:9572: 98        .byte $98   ; 
- D 0 - I - 0x039583 0E:9573: 23        .byte $23   ; 
- D 0 - I - 0x039584 0E:9574: C8        .byte $C8   ; 
- D 0 - I - 0x039585 0E:9575: 00        .byte $00   ; 
- D 0 - I - 0x039586 0E:9576: A0        .byte $A0   ; 
- D 0 - I - 0x039587 0E:9577: 1C        .byte $1C   ; 
- D 0 - I - 0x039588 0E:9578: C8        .byte $C8   ; 
- D 0 - I - 0x039589 0E:9579: 00        .byte $00   ; 
- D 0 - I - 0x03958A 0E:957A: FC        .byte $FC   ; 
- D 0 - I - 0x03958B 0E:957B: 19        .byte $19   ; 
- D 0 - I - 0x03958C 0E:957C: C8        .byte $C8   ; 
- D 0 - I - 0x03958D 0E:957D: 00        .byte $00   ; 
- D 0 - I - 0x03958E 0E:957E: FC        .byte $FC   ; 
- D 0 - I - 0x03958F 0E:957F: 1D        .byte $1D   ; 
- D 0 - I - 0x039590 0E:9580: B4        .byte $B4   ; 
- D 0 - I - 0x039591 0E:9581: 00        .byte $00   ; 
- D 0 - I - 0x039592 0E:9582: FC        .byte $FC   ; 
- D 0 - I - 0x039593 0E:9583: 06        .byte $06   ; 
- D 0 - I - 0x039594 0E:9584: 00        .byte $00   ; 
- D 0 - I - 0x039595 0E:9585: 00        .byte $00   ; 
- D 0 - I - 0x039596 0E:9586: 00        .byte $00   ; 
- D 0 - I - 0x039597 0E:9587: 00        .byte $00   ; 
- D 0 - I - 0x039598 0E:9588: 32        .byte $32   ; <2>
- D 0 - I - 0x039599 0E:9589: 00        .byte $00   ; 
- D 0 - I - 0x03959A 0E:958A: 00        .byte $00   ; 
- D 0 - I - 0x03959B 0E:958B: 27        .byte $27   ; 
- D 0 - I - 0x03959C 0E:958C: B4        .byte $B4   ; 
- D 0 - I - 0x03959D 0E:958D: 00        .byte $00   ; 
- D 0 - I - 0x03959E 0E:958E: 00        .byte $00   ; 
- D 0 - I - 0x03959F 0E:958F: 04        .byte $04   ; 
- D 0 - I - 0x0395A0 0E:9590: 50        .byte $50   ; <P>
- D 0 - I - 0x0395A1 0E:9591: 00        .byte $00   ; 
- D 0 - I - 0x0395A2 0E:9592: FC        .byte $FC   ; 
- D 0 - I - 0x0395A3 0E:9593: 08        .byte $08   ; 
- D 0 - I - 0x0395A4 0E:9594: 00        .byte $00   ; 
- D 0 - I - 0x0395A5 0E:9595: 00        .byte $00   ; 
- D 0 - I - 0x0395A6 0E:9596: 00        .byte $00   ; 
- D 0 - I - 0x0395A7 0E:9597: 06        .byte $06   ; 
- D 0 - I - 0x0395A8 0E:9598: 3C        .byte $3C   ; 
- D 0 - I - 0x0395A9 0E:9599: 00        .byte $00   ; 
- D 0 - I - 0x0395AA 0E:959A: FC        .byte $FC   ; 
- D 0 - I - 0x0395AB 0E:959B: 0C        .byte $0C   ; 
- D 0 - I - 0x0395AC 0E:959C: 00        .byte $00   ; 
- D 0 - I - 0x0395AD 0E:959D: 00        .byte $00   ; 
- D 0 - - - 0x0395AE 0E:959E: B2        .byte $B2   ; 
- D 0 - - - 0x0395AF 0E:959F: 95        .byte $95   ; 
- D 0 - - - 0x0395B0 0E:95A0: C2        .byte $C2   ; 
- D 0 - - - 0x0395B1 0E:95A1: 95        .byte $95   ; 
- D 0 - - - 0x0395B2 0E:95A2: C6        .byte $C6   ; 
- D 0 - - - 0x0395B3 0E:95A3: 95        .byte $95   ; 
- D 0 - - - 0x0395B4 0E:95A4: CA        .byte $CA   ; 
- D 0 - - - 0x0395B5 0E:95A5: 95        .byte $95   ; 
- - - - - - 0x0395B6 0E:95A6: CE        .byte $CE   ; 
- - - - - - 0x0395B7 0E:95A7: 95        .byte $95   ; 
- D 0 - - - 0x0395B8 0E:95A8: CE        .byte $CE   ; 
- D 0 - - - 0x0395B9 0E:95A9: 95        .byte $95   ; 
- D 0 - - - 0x0395BA 0E:95AA: D2        .byte $D2   ; 
- D 0 - - - 0x0395BB 0E:95AB: 95        .byte $95   ; 
- D 0 - - - 0x0395BC 0E:95AC: C2        .byte $C2   ; 
- D 0 - - - 0x0395BD 0E:95AD: 95        .byte $95   ; 
- D 0 - - - 0x0395BE 0E:95AE: C2        .byte $C2   ; 
- D 0 - - - 0x0395BF 0E:95AF: 95        .byte $95   ; 
- D 0 - - - 0x0395C0 0E:95B0: C2        .byte $C2   ; 
- D 0 - - - 0x0395C1 0E:95B1: 95        .byte $95   ; 
- D 0 - I - 0x0395C2 0E:95B2: 00        .byte $00   ; 
- D 0 - I - 0x0395C3 0E:95B3: 08        .byte $08   ; 
- D 0 - I - 0x0395C4 0E:95B4: 14        .byte $14   ; 
- D 0 - I - 0x0395C5 0E:95B5: 00        .byte $00   ; 
- D 0 - I - 0x0395C6 0E:95B6: 00        .byte $00   ; 
- D 0 - I - 0x0395C7 0E:95B7: 1B        .byte $1B   ; 
- D 0 - I - 0x0395C8 0E:95B8: 00        .byte $00   ; 
- D 0 - I - 0x0395C9 0E:95B9: 00        .byte $00   ; 
- D 0 - I - 0x0395CA 0E:95BA: 00        .byte $00   ; 
- D 0 - I - 0x0395CB 0E:95BB: 1C        .byte $1C   ; 
- D 0 - I - 0x0395CC 0E:95BC: 00        .byte $00   ; 
- D 0 - I - 0x0395CD 0E:95BD: 00        .byte $00   ; 
- D 0 - I - 0x0395CE 0E:95BE: 00        .byte $00   ; 
- D 0 - I - 0x0395CF 0E:95BF: 25        .byte $25   ; 
- D 0 - I - 0x0395D0 0E:95C0: 00        .byte $00   ; 
- D 0 - I - 0x0395D1 0E:95C1: 00        .byte $00   ; 
- D 0 - I - 0x0395D2 0E:95C2: 00        .byte $00   ; 
- D 0 - I - 0x0395D3 0E:95C3: 0B        .byte $0B   ; 
- D 0 - I - 0x0395D4 0E:95C4: 28        .byte $28   ; 
- D 0 - I - 0x0395D5 0E:95C5: 00        .byte $00   ; 
- D 0 - I - 0x0395D6 0E:95C6: 00        .byte $00   ; 
- D 0 - I - 0x0395D7 0E:95C7: 20        .byte $20   ; 
- D 0 - I - 0x0395D8 0E:95C8: C8        .byte $C8   ; 
- D 0 - I - 0x0395D9 0E:95C9: 00        .byte $00   ; 
- D 0 - I - 0x0395DA 0E:95CA: 88        .byte $88   ; 
- D 0 - I - 0x0395DB 0E:95CB: 08        .byte $08   ; 
- D 0 - I - 0x0395DC 0E:95CC: 46        .byte $46   ; <F>
- D 0 - I - 0x0395DD 0E:95CD: 00        .byte $00   ; 
- D 0 - I - 0x0395DE 0E:95CE: 98        .byte $98   ; 
- D 0 - I - 0x0395DF 0E:95CF: 00        .byte $00   ; 
- D 0 - I - 0x0395E0 0E:95D0: 32        .byte $32   ; <2>
- D 0 - I - 0x0395E1 0E:95D1: 00        .byte $00   ; 
- D 0 - I - 0x0395E2 0E:95D2: 98        .byte $98   ; 
- D 0 - I - 0x0395E3 0E:95D3: 00        .byte $00   ; 
- D 0 - I - 0x0395E4 0E:95D4: 32        .byte $32   ; <2>
- D 0 - I - 0x0395E5 0E:95D5: 00        .byte $00   ; 
- - - - - - 0x0395E6 0E:95D6: 00        .byte $00   ; 
- - - - - - 0x0395E7 0E:95D7: 00        .byte $00   ; 
- - - - - - 0x0395E8 0E:95D8: 08        .byte $08   ; 
- - - - - - 0x0395E9 0E:95D9: 08        .byte $08   ; 
- D 0 - I - 0x0395EA 0E:95DA: 01        .byte $01   ; 
- D 0 - I - 0x0395EB 0E:95DB: 03        .byte $03   ; 
- D 0 - I - 0x0395EC 0E:95DC: 50        .byte $50   ; <P>
- D 0 - I - 0x0395ED 0E:95DD: 26        .byte $26   ; 
- D 0 - I - 0x0395EE 0E:95DE: 00        .byte $00   ; 
- D 0 - I - 0x0395EF 0E:95DF: 02        .byte $02   ; 
- - - - - - 0x0395F0 0E:95E0: 00        .byte $00   ; 
- - - - - - 0x0395F1 0E:95E1: 00        .byte $00   ; 
- D 0 - I - 0x0395F2 0E:95E2: 00        .byte $00   ; 
- D 0 - I - 0x0395F3 0E:95E3: 00        .byte $00   ; 
- D 0 - I - 0x0395F4 0E:95E4: 18        .byte $18   ; 
- D 0 - I - 0x0395F5 0E:95E5: 04        .byte $04   ; 
- D 0 - I - 0x0395F6 0E:95E6: 0B        .byte $0B   ; 
- D 0 - I - 0x0395F7 0E:95E7: 00        .byte $00   ; 
- D 0 - I - 0x0395F8 0E:95E8: 18        .byte $18   ; 
- D 0 - I - 0x0395F9 0E:95E9: 04        .byte $04   ; 
- D 0 - I - 0x0395FA 0E:95EA: 08        .byte $08   ; 
- D 0 - I - 0x0395FB 0E:95EB: 01        .byte $01   ; 
- D 0 - I - 0x0395FC 0E:95EC: 10        .byte $10   ; 
- D 0 - I - 0x0395FD 0E:95ED: 02        .byte $02   ; 
- D 0 - I - 0x0395FE 0E:95EE: 09        .byte $09   ; 
- D 0 - I - 0x0395FF 0E:95EF: 01        .byte $01   ; 
- D 0 - I - 0x039600 0E:95F0: 0E        .byte $0E   ; 
- D 0 - I - 0x039601 0E:95F1: 02        .byte $02   ; 
- D 0 - I - 0x039602 0E:95F2: 00        .byte $00   ; 
- D 0 - I - 0x039603 0E:95F3: 00        .byte $00   ; 
- D 0 - I - 0x039604 0E:95F4: 20        .byte $20   ; 
- D 0 - I - 0x039605 0E:95F5: 00        .byte $00   ; 
- D 0 - I - 0x039606 0E:95F6: 06        .byte $06   ; 
- D 0 - I - 0x039607 0E:95F7: 04        .byte $04   ; 
- D 0 - I - 0x039608 0E:95F8: 28        .byte $28   ; 
- D 0 - I - 0x039609 0E:95F9: 00        .byte $00   ; 
- D 0 - I - 0x03960A 0E:95FA: 07        .byte $07   ; 
- D 0 - I - 0x03960B 0E:95FB: 04        .byte $04   ; 
- D 0 - I - 0x03960C 0E:95FC: 38        .byte $38   ; <8>
- D 0 - I - 0x03960D 0E:95FD: 00        .byte $00   ; 
- D 0 - I - 0x03960E 0E:95FE: 04        .byte $04   ; 
- D 0 - I - 0x03960F 0E:95FF: 06        .byte $06   ; 
- D 0 - I - 0x039610 0E:9600: 18        .byte $18   ; 
- D 0 - I - 0x039611 0E:9601: 00        .byte $00   ; 
- D 0 - I - 0x039612 0E:9602: 05        .byte $05   ; 
- D 0 - I - 0x039613 0E:9603: 07        .byte $07   ; 
- D 0 - I - 0x039614 0E:9604: 18        .byte $18   ; 
- D 0 - I - 0x039615 0E:9605: 00        .byte $00   ; 
- D 0 - I - 0x039616 0E:9606: 0A        .byte $0A   ; 
- D 0 - I - 0x039617 0E:9607: 08        .byte $08   ; 
- D 0 - I - 0x039618 0E:9608: 18        .byte $18   ; 
- D 0 - I - 0x039619 0E:9609: 02        .byte $02   ; 
- D 0 - I - 0x03961A 0E:960A: 0B        .byte $0B   ; 
- D 0 - I - 0x03961B 0E:960B: 00        .byte $00   ; 
- D 0 - I - 0x03961C 0E:960C: 10        .byte $10   ; 
- D 0 - I - 0x03961D 0E:960D: 02        .byte $02   ; 
- D 0 - I - 0x03961E 0E:960E: 00        .byte $00   ; 
- D 0 - I - 0x03961F 0E:960F: 00        .byte $00   ; 
- D 0 - I - 0x039620 0E:9610: 10        .byte $10   ; 
- D 0 - I - 0x039621 0E:9611: 02        .byte $02   ; 
- D 0 - I - 0x039622 0E:9612: 01        .byte $01   ; 
- D 0 - I - 0x039623 0E:9613: 00        .byte $00   ; 
- - - - - - 0x039624 0E:9614: 00        .byte $00   ; 
- - - - - - 0x039625 0E:9615: 00        .byte $00   ; 
- D 0 - I - 0x039626 0E:9616: 0C        .byte $0C   ; 
- D 0 - I - 0x039627 0E:9617: 00        .byte $00   ; 
- D 0 - I - 0x039628 0E:9618: 08        .byte $08   ; 
- D 0 - I - 0x039629 0E:9619: 03        .byte $03   ; 
- D 0 - I - 0x03962A 0E:961A: 02        .byte $02   ; 
- D 0 - I - 0x03962B 0E:961B: 03        .byte $03   ; 
- D 0 - I - 0x03962C 0E:961C: 20        .byte $20   ; 
- D 0 - I - 0x03962D 0E:961D: 08        .byte $08   ; 
- D 0 - I - 0x03962E 0E:961E: 0D        .byte $0D   ; 
- D 0 - I - 0x03962F 0E:961F: 01        .byte $01   ; 
- D 0 - I - 0x039630 0E:9620: 14        .byte $14   ; 
- D 0 - I - 0x039631 0E:9621: 00        .byte $00   ; 
- D 0 - I - 0x039632 0E:9622: 05        .byte $05   ; 
- D 0 - I - 0x039633 0E:9623: 05        .byte $05   ; 
- D 0 - I - 0x039634 0E:9624: 08        .byte $08   ; 
- D 0 - I - 0x039635 0E:9625: 00        .byte $00   ; 
- D 0 - I - 0x039636 0E:9626: 0E        .byte $0E   ; 
- D 0 - I - 0x039637 0E:9627: 08        .byte $08   ; 
- D 0 - I - 0x039638 0E:9628: 18        .byte $18   ; 
- D 0 - I - 0x039639 0E:9629: 04        .byte $04   ; 
- D 0 - I - 0x03963A 0E:962A: 03        .byte $03   ; 
- D 0 - I - 0x03963B 0E:962B: 02        .byte $02   ; 
- D 0 - I - 0x03963C 0E:962C: 20        .byte $20   ; 
- D 0 - I - 0x03963D 0E:962D: 04        .byte $04   ; 
- D 0 - I - 0x03963E 0E:962E: 04        .byte $04   ; 
- D 0 - I - 0x03963F 0E:962F: 06        .byte $06   ; 
- D 0 - I - 0x039640 0E:9630: 18        .byte $18   ; 
- D 0 - I - 0x039641 0E:9631: 02        .byte $02   ; 
- D 0 - I - 0x039642 0E:9632: 0F        .byte $0F   ; 
- D 0 - I - 0x039643 0E:9633: 07        .byte $07   ; 
- D 0 - I - 0x039644 0E:9634: 16        .byte $16   ; 
- D 0 - I - 0x039645 0E:9635: 02        .byte $02   ; 
- D 0 - I - 0x039646 0E:9636: 0F        .byte $0F   ; 
- D 0 - I - 0x039647 0E:9637: 07        .byte $07   ; 
- D 0 - I - 0x039648 0E:9638: 18        .byte $18   ; 
- D 0 - I - 0x039649 0E:9639: 02        .byte $02   ; 
- D 0 - I - 0x03964A 0E:963A: 10        .byte $10   ; 
- D 0 - I - 0x03964B 0E:963B: 02        .byte $02   ; 
- D 0 - I - 0x03964C 0E:963C: 10        .byte $10   ; 
- D 0 - I - 0x03964D 0E:963D: 02        .byte $02   ; 
- D 0 - I - 0x03964E 0E:963E: 11        .byte $11   ; 
- D 0 - I - 0x03964F 0E:963F: 01        .byte $01   ; 
- D 0 - I - 0x039650 0E:9640: 40        .byte $40   ; 
- D 0 - I - 0x039651 0E:9641: 10        .byte $10   ; 
- D 0 - I - 0x039652 0E:9642: 12        .byte $12   ; 
- D 0 - I - 0x039653 0E:9643: 09        .byte $09   ; 
- D 0 - I - 0x039654 0E:9644: 20        .byte $20   ; 
- D 0 - I - 0x039655 0E:9645: 02        .byte $02   ; 
- D 0 - I - 0x039656 0E:9646: 13        .byte $13   ; 
- D 0 - I - 0x039657 0E:9647: 00        .byte $00   ; 
- D 0 - I - 0x039658 0E:9648: 20        .byte $20   ; 
- D 0 - I - 0x039659 0E:9649: 02        .byte $02   ; 
- D 0 - I - 0x03965A 0E:964A: 14        .byte $14   ; 
- D 0 - I - 0x03965B 0E:964B: 09        .byte $09   ; 
- D 0 - I - 0x03965C 0E:964C: 28        .byte $28   ; 
- D 0 - I - 0x03965D 0E:964D: 02        .byte $02   ; 
- D 0 - I - 0x03965E 0E:964E: 15        .byte $15   ; 
- D 0 - I - 0x03965F 0E:964F: 00        .byte $00   ; 
- D 0 - I - 0x039660 0E:9650: 18        .byte $18   ; 
- D 0 - I - 0x039661 0E:9651: 02        .byte $02   ; 
- D 0 - I - 0x039662 0E:9652: 16        .byte $16   ; 
- D 0 - I - 0x039663 0E:9653: 00        .byte $00   ; 
- D 0 - I - 0x039664 0E:9654: 08        .byte $08   ; 
- D 0 - I - 0x039665 0E:9655: 00        .byte $00   ; 
- D 0 - I - 0x039666 0E:9656: 17        .byte $17   ; 
- D 0 - I - 0x039667 0E:9657: 03        .byte $03   ; 
- D 0 - I - 0x039668 0E:9658: 18        .byte $18   ; 
- D 0 - I - 0x039669 0E:9659: 00        .byte $00   ; 
- D 0 - I - 0x03966A 0E:965A: 03        .byte $03   ; 
- D 0 - I - 0x03966B 0E:965B: 00        .byte $00   ; 
- - - - - - 0x03966C 0E:965C: 00        .byte $00   ; 
- - - - - - 0x03966D 0E:965D: 00        .byte $00   ; 
- D 0 - I - 0x03966E 0E:965E: 02        .byte $02   ; 
- D 0 - I - 0x03966F 0E:965F: 00        .byte $00   ; 
- - - - - - 0x039670 0E:9660: 00        .byte $00   ; 
- - - - - - 0x039671 0E:9661: 00        .byte $00   ; 
- D 0 - I - 0x039672 0E:9662: 1C        .byte $1C   ; 
- D 0 - I - 0x039673 0E:9663: 06        .byte $06   ; 
- D 0 - I - 0x039674 0E:9664: 00        .byte $00   ; 
- D 0 - I - 0x039675 0E:9665: 02        .byte $02   ; 
- D 0 - I - 0x039676 0E:9666: 08        .byte $08   ; 
- D 0 - I - 0x039677 0E:9667: 03        .byte $03   ; 
- - - - - - 0x039678 0E:9668: 03        .byte $03   ; 
- D 0 - I - 0x039679 0E:9669: 01        .byte $01   ; 
- D 0 - I - 0x03967A 0E:966A: 01        .byte $01   ; 
- - - - - - 0x03967B 0E:966B: 01        .byte $01   ; 
- D 0 - I - 0x03967C 0E:966C: 02        .byte $02   ; 
- - - - - - 0x03967D 0E:966D: 00        .byte $00   ; 
- D 0 - I - 0x03967E 0E:966E: 1D        .byte $1D   ; 
- D 0 - I - 0x03967F 0E:966F: 06        .byte $06   ; 
- D 0 - I - 0x039680 0E:9670: 00        .byte $00   ; 
- D 0 - I - 0x039681 0E:9671: 00        .byte $00   ; 
- D 0 - I - 0x039682 0E:9672: 00        .byte $00   ; 
- D 0 - I - 0x039683 0E:9673: 02        .byte $02   ; 
- - - - - - 0x039684 0E:9674: 04        .byte $04   ; 
- D 0 - I - 0x039685 0E:9675: 01        .byte $01   ; 
- D 0 - I - 0x039686 0E:9676: 01        .byte $01   ; 
- D 0 - I - 0x039687 0E:9677: 01        .byte $01   ; 
- D 0 - I - 0x039688 0E:9678: 01        .byte $01   ; 
- - - - - - 0x039689 0E:9679: 00        .byte $00   ; 
- D 0 - I - 0x03968A 0E:967A: 20        .byte $20   ; 
- D 0 - I - 0x03968B 0E:967B: 0A        .byte $0A   ; 
- D 0 - I - 0x03968C 0E:967C: 00        .byte $00   ; 
- D 0 - I - 0x03968D 0E:967D: 20        .byte $20   ; 
- D 0 - I - 0x03968E 0E:967E: 02        .byte $02   ; 
- D 0 - I - 0x03968F 0E:967F: 03        .byte $03   ; 
- - - - - - 0x039690 0E:9680: 03        .byte $03   ; 
- D 0 - I - 0x039691 0E:9681: 01        .byte $01   ; 
- D 0 - I - 0x039692 0E:9682: 01        .byte $01   ; 
- - - - - - 0x039693 0E:9683: 01        .byte $01   ; 
- D 0 - I - 0x039694 0E:9684: 00        .byte $00   ; 
- - - - - - 0x039695 0E:9685: 00        .byte $00   ; 
- D 0 - I - 0x039696 0E:9686: 06        .byte $06   ; 
- D 0 - I - 0x039697 0E:9687: 00        .byte $00   ; 
- - - - - - 0x039698 0E:9688: 00        .byte $00   ; 
- - - - - - 0x039699 0E:9689: 00        .byte $00   ; 
- D 0 - I - 0x03969A 0E:968A: 03        .byte $03   ; 
- D 0 - I - 0x03969B 0E:968B: 03        .byte $03   ; 
- D 0 - I - 0x03969C 0E:968C: 00        .byte $00   ; 
- - - - - - 0x03969D 0E:968D: 00        .byte $00   ; 
- - - - - - 0x03969E 0E:968E: 00        .byte $00   ; 
- - - - - - 0x03969F 0E:968F: 00        .byte $00   ; 
- - - - - - 0x0396A0 0E:9690: 00        .byte $00   ; 
- - - - - - 0x0396A1 0E:9691: 00        .byte $00   ; 
- D 0 - I - 0x0396A2 0E:9692: 23        .byte $23   ; 
- D 0 - I - 0x0396A3 0E:9693: 00        .byte $00   ; 
- D 0 - I - 0x0396A4 0E:9694: 00        .byte $00   ; 
- D 0 - I - 0x0396A5 0E:9695: 20        .byte $20   ; 
- D 0 - I - 0x0396A6 0E:9696: 00        .byte $00   ; 
- D 0 - I - 0x0396A7 0E:9697: 03        .byte $03   ; 
- - - - - - 0x0396A8 0E:9698: 03        .byte $03   ; 
- D 0 - I - 0x0396A9 0E:9699: 01        .byte $01   ; 
- D 0 - I - 0x0396AA 0E:969A: 01        .byte $01   ; 
- - - - - - 0x0396AB 0E:969B: 01        .byte $01   ; 
- D 0 - I - 0x0396AC 0E:969C: 03        .byte $03   ; 
- - - - - - 0x0396AD 0E:969D: 00        .byte $00   ; 
- D 0 - I - 0x0396AE 0E:969E: 24        .byte $24   ; 
- D 0 - I - 0x0396AF 0E:969F: 00        .byte $00   ; 
- D 0 - I - 0x0396B0 0E:96A0: 00        .byte $00   ; 
- D 0 - I - 0x0396B1 0E:96A1: 28        .byte $28   ; 
- D 0 - I - 0x0396B2 0E:96A2: 06        .byte $06   ; 
- D 0 - I - 0x0396B3 0E:96A3: 00        .byte $00   ; 
- - - - - - 0x0396B4 0E:96A4: 03        .byte $03   ; 
- D 0 - I - 0x0396B5 0E:96A5: 01        .byte $01   ; 
- D 0 - I - 0x0396B6 0E:96A6: 01        .byte $01   ; 
- - - - - - 0x0396B7 0E:96A7: 01        .byte $01   ; 
- D 0 - I - 0x0396B8 0E:96A8: 01        .byte $01   ; 
- - - - - - 0x0396B9 0E:96A9: 00        .byte $00   ; 
- D 0 - I - 0x0396BA 0E:96AA: 27        .byte $27   ; 
- D 0 - I - 0x0396BB 0E:96AB: 00        .byte $00   ; 
- D 0 - I - 0x0396BC 0E:96AC: 00        .byte $00   ; 
- D 0 - I - 0x0396BD 0E:96AD: 20        .byte $20   ; 
- D 0 - I - 0x0396BE 0E:96AE: 04        .byte $04   ; 
- D 0 - I - 0x0396BF 0E:96AF: 02        .byte $02   ; 
- - - - - - 0x0396C0 0E:96B0: 00        .byte $00   ; 
- D 0 - I - 0x0396C1 0E:96B1: 01        .byte $01   ; 
- - - - - - 0x0396C2 0E:96B2: 01        .byte $01   ; 
- - - - - - 0x0396C3 0E:96B3: 01        .byte $01   ; 
- D 0 - I - 0x0396C4 0E:96B4: 04        .byte $04   ; 
- - - - - - 0x0396C5 0E:96B5: 00        .byte $00   ; 
- D 0 - I - 0x0396C6 0E:96B6: 28        .byte $28   ; 
- D 0 - I - 0x0396C7 0E:96B7: 0B        .byte $0B   ; 
- D 0 - I - 0x0396C8 0E:96B8: F0        .byte $F0   ; 
- D 0 - I - 0x0396C9 0E:96B9: 02        .byte $02   ; 
- D 0 - I - 0x0396CA 0E:96BA: 08        .byte $08   ; 
- D 0 - I - 0x0396CB 0E:96BB: 03        .byte $03   ; 
- D 0 - I - 0x0396CC 0E:96BC: 05        .byte $05   ; 
- D 0 - I - 0x0396CD 0E:96BD: 00        .byte $00   ; 
- D 0 - I - 0x0396CE 0E:96BE: 02        .byte $02   ; 
- D 0 - I - 0x0396CF 0E:96BF: 02        .byte $02   ; 
- D 0 - I - 0x0396D0 0E:96C0: 01        .byte $01   ; 
- - - - - - 0x0396D1 0E:96C1: 00        .byte $00   ; 
- D 0 - I - 0x0396D2 0E:96C2: 2B        .byte $2B   ; 
- D 0 - I - 0x0396D3 0E:96C3: 0A        .byte $0A   ; 
- D 0 - I - 0x0396D4 0E:96C4: 00        .byte $00   ; 
- D 0 - I - 0x0396D5 0E:96C5: 30        .byte $30   ; <0>
- D 0 - I - 0x0396D6 0E:96C6: 07        .byte $07   ; 
- D 0 - I - 0x0396D7 0E:96C7: 03        .byte $03   ; 
- D 0 - I - 0x0396D8 0E:96C8: 03        .byte $03   ; 
- D 0 - I - 0x0396D9 0E:96C9: 01        .byte $01   ; 
- - - - - - 0x0396DA 0E:96CA: 01        .byte $01   ; 
- D 0 - I - 0x0396DB 0E:96CB: 01        .byte $01   ; 
- D 0 - I - 0x0396DC 0E:96CC: 06        .byte $06   ; 
- - - - - - 0x0396DD 0E:96CD: 00        .byte $00   ; 
- D 0 - I - 0x0396DE 0E:96CE: 2C        .byte $2C   ; 
- D 0 - I - 0x0396DF 0E:96CF: 00        .byte $00   ; 
- D 0 - I - 0x0396E0 0E:96D0: 00        .byte $00   ; 
- D 0 - I - 0x0396E1 0E:96D1: 02        .byte $02   ; 
- D 0 - I - 0x0396E2 0E:96D2: 09        .byte $09   ; 
- D 0 - I - 0x0396E3 0E:96D3: 02        .byte $02   ; 
- D 0 - I - 0x0396E4 0E:96D4: 03        .byte $03   ; 
- D 0 - I - 0x0396E5 0E:96D5: 00        .byte $00   ; 
- D 0 - I - 0x0396E6 0E:96D6: 00        .byte $00   ; 
- D 0 - I - 0x0396E7 0E:96D7: 00        .byte $00   ; 
- D 0 - I - 0x0396E8 0E:96D8: 07        .byte $07   ; 
- - - - - - 0x0396E9 0E:96D9: 00        .byte $00   ; 
- D 0 - I - 0x0396EA 0E:96DA: 2D        .byte $2D   ; 
- D 0 - I - 0x0396EB 0E:96DB: 0B        .byte $0B   ; 
- D 0 - I - 0x0396EC 0E:96DC: FF        .byte $FF   ; 
- D 0 - I - 0x0396ED 0E:96DD: 00        .byte $00   ; 
- D 0 - I - 0x0396EE 0E:96DE: 0D        .byte $0D   ; 
- D 0 - I - 0x0396EF 0E:96DF: 01        .byte $01   ; 
- D 0 - I - 0x0396F0 0E:96E0: 04        .byte $04   ; 
- D 0 - I - 0x0396F1 0E:96E1: 01        .byte $01   ; 
- - - - - - 0x0396F2 0E:96E2: 01        .byte $01   ; 
- D 0 - I - 0x0396F3 0E:96E3: 01        .byte $01   ; 
- D 0 - I - 0x0396F4 0E:96E4: 00        .byte $00   ; 
- - - - - - 0x0396F5 0E:96E5: 00        .byte $00   ; 
- D 0 - I - 0x0396F6 0E:96E6: 30        .byte $30   ; <0>
- D 0 - I - 0x0396F7 0E:96E7: 0B        .byte $0B   ; 
- D 0 - I - 0x0396F8 0E:96E8: F0        .byte $F0   ; 
- D 0 - I - 0x0396F9 0E:96E9: 20        .byte $20   ; 
- D 0 - I - 0x0396FA 0E:96EA: 0B        .byte $0B   ; 
- D 0 - I - 0x0396FB 0E:96EB: 02        .byte $02   ; 
- D 0 - I - 0x0396FC 0E:96EC: 02        .byte $02   ; 
- D 0 - I - 0x0396FD 0E:96ED: 02        .byte $02   ; 
- D 0 - I - 0x0396FE 0E:96EE: 02        .byte $02   ; 
- D 0 - I - 0x0396FF 0E:96EF: 02        .byte $02   ; 
- D 0 - I - 0x039700 0E:96F0: 01        .byte $01   ; 
- - - - - - 0x039701 0E:96F1: 00        .byte $00   ; 
- D 0 - I - 0x039702 0E:96F2: 31        .byte $31   ; <1>
- D 0 - I - 0x039703 0E:96F3: 0A        .byte $0A   ; 
- D 0 - I - 0x039704 0E:96F4: 00        .byte $00   ; 
- D 0 - I - 0x039705 0E:96F5: 10        .byte $10   ; 
- D 0 - I - 0x039706 0E:96F6: 02        .byte $02   ; 
- D 0 - I - 0x039707 0E:96F7: 05        .byte $05   ; 
- - - - - - 0x039708 0E:96F8: 00        .byte $00   ; 
- D 0 - I - 0x039709 0E:96F9: 00        .byte $00   ; 
- D 0 - I - 0x03970A 0E:96FA: 00        .byte $00   ; 
- - - - - - 0x03970B 0E:96FB: 01        .byte $01   ; 
- D 0 - I - 0x03970C 0E:96FC: 04        .byte $04   ; 
- - - - - - 0x03970D 0E:96FD: 00        .byte $00   ; 
- D 0 - I - 0x03970E 0E:96FE: 34        .byte $34   ; <4>
- D 0 - I - 0x03970F 0E:96FF: 0C        .byte $0C   ; 
- D 0 - I - 0x039710 0E:9700: 00        .byte $00   ; 
- D 0 - I - 0x039711 0E:9701: FF        .byte $FF   ; 
- D 0 - I - 0x039712 0E:9702: 01        .byte $01   ; 
- D 0 - I - 0x039713 0E:9703: 05        .byte $05   ; 
- - - - - - 0x039714 0E:9704: 01        .byte $01   ; 
- D 0 - I - 0x039715 0E:9705: 00        .byte $00   ; 
- D 0 - I - 0x039716 0E:9706: 00        .byte $00   ; 
- - - - - - 0x039717 0E:9707: 00        .byte $00   ; 
- D 0 - I - 0x039718 0E:9708: 03        .byte $03   ; 
- - - - - - 0x039719 0E:9709: 00        .byte $00   ; 
- D 0 - I - 0x03971A 0E:970A: 34        .byte $34   ; <4>
- D 0 - I - 0x03971B 0E:970B: 0C        .byte $0C   ; 
- D 0 - I - 0x03971C 0E:970C: 00        .byte $00   ; 
- D 0 - I - 0x03971D 0E:970D: 08        .byte $08   ; 
- D 0 - I - 0x03971E 0E:970E: 01        .byte $01   ; 
- D 0 - I - 0x03971F 0E:970F: 05        .byte $05   ; 
- - - - - - 0x039720 0E:9710: 01        .byte $01   ; 
- D 0 - I - 0x039721 0E:9711: 00        .byte $00   ; 
- D 0 - I - 0x039722 0E:9712: 00        .byte $00   ; 
- - - - - - 0x039723 0E:9713: 00        .byte $00   ; 
- D 0 - I - 0x039724 0E:9714: 03        .byte $03   ; 
- - - - - - 0x039725 0E:9715: 00        .byte $00   ; 
- D 0 - I - 0x039726 0E:9716: 37        .byte $37   ; <7>
- D 0 - I - 0x039727 0E:9717: 0B        .byte $0B   ; 
- D 0 - I - 0x039728 0E:9718: F0        .byte $F0   ; 
- D 0 - I - 0x039729 0E:9719: 60        .byte $60   ; 
- D 0 - I - 0x03972A 0E:971A: 0B        .byte $0B   ; 
- D 0 - I - 0x03972B 0E:971B: 02        .byte $02   ; 
- D 0 - I - 0x03972C 0E:971C: 02        .byte $02   ; 
- D 0 - I - 0x03972D 0E:971D: 03        .byte $03   ; 
- - - - - - 0x03972E 0E:971E: 01        .byte $01   ; 
- D 0 - I - 0x03972F 0E:971F: 01        .byte $01   ; 
- D 0 - I - 0x039730 0E:9720: 03        .byte $03   ; 
- - - - - - 0x039731 0E:9721: 00        .byte $00   ; 
- D 0 - I - 0x039732 0E:9722: 0C        .byte $0C   ; 
- D 0 - I - 0x039733 0E:9723: 00        .byte $00   ; 
- - - - - - 0x039734 0E:9724: 00        .byte $00   ; 
- - - - - - 0x039735 0E:9725: 00        .byte $00   ; 
- D 0 - I - 0x039736 0E:9726: 00        .byte $00   ; 
- D 0 - I - 0x039737 0E:9727: 00        .byte $00   ; 
- D 0 - I - 0x039738 0E:9728: 00        .byte $00   ; 
- - - - - - 0x039739 0E:9729: 00        .byte $00   ; 
- - - - - - 0x03973A 0E:972A: 00        .byte $00   ; 
- - - - - - 0x03973B 0E:972B: 00        .byte $00   ; 
- - - - - - 0x03973C 0E:972C: 08        .byte $08   ; 
- - - - - - 0x03973D 0E:972D: 00        .byte $00   ; 
- D 0 - I - 0x03973E 0E:972E: 3A        .byte $3A   ; 
- D 0 - I - 0x03973F 0E:972F: 1D        .byte $1D   ; 
- D 0 - I - 0x039740 0E:9730: 10        .byte $10   ; 
- D 0 - I - 0x039741 0E:9731: 00        .byte $00   ; 
- D 0 - I - 0x039742 0E:9732: 1D        .byte $1D   ; 
- D 0 - I - 0x039743 0E:9733: 05        .byte $05   ; 
- - - - - - 0x039744 0E:9734: 00        .byte $00   ; 
- D 0 - I - 0x039745 0E:9735: 00        .byte $00   ; 
- - - - - - 0x039746 0E:9736: 00        .byte $00   ; 
- D 0 - I - 0x039747 0E:9737: 00        .byte $00   ; 
- D 0 - I - 0x039748 0E:9738: 0A        .byte $0A   ; 
- - - - - - 0x039749 0E:9739: 00        .byte $00   ; 
- D 0 - I - 0x03974A 0E:973A: 3D        .byte $3D   ; 
- D 0 - I - 0x03974B 0E:973B: 00        .byte $00   ; 
- D 0 - I - 0x03974C 0E:973C: 00        .byte $00   ; 
- D 0 - I - 0x03974D 0E:973D: 00        .byte $00   ; 
- D 0 - I - 0x03974E 0E:973E: 0C        .byte $0C   ; 
- D 0 - I - 0x03974F 0E:973F: 05        .byte $05   ; 
- D 0 - I - 0x039750 0E:9740: 02        .byte $02   ; 
- D 0 - I - 0x039751 0E:9741: 00        .byte $00   ; 
- D 0 - I - 0x039752 0E:9742: 00        .byte $00   ; 
- D 0 - I - 0x039753 0E:9743: 00        .byte $00   ; 
- D 0 - I - 0x039754 0E:9744: 0C        .byte $0C   ; 
- - - - - - 0x039755 0E:9745: 00        .byte $00   ; 
- D 0 - I - 0x039756 0E:9746: 40        .byte $40   ; 
- D 0 - I - 0x039757 0E:9747: 0E        .byte $0E   ; 
- D 0 - I - 0x039758 0E:9748: 00        .byte $00   ; 
- D 0 - I - 0x039759 0E:9749: 40        .byte $40   ; 
- D 0 - I - 0x03975A 0E:974A: 0E        .byte $0E   ; 
- D 0 - I - 0x03975B 0E:974B: 05        .byte $05   ; 
- - - - - - 0x03975C 0E:974C: 05        .byte $05   ; 
- D 0 - I - 0x03975D 0E:974D: 03        .byte $03   ; 
- D 0 - I - 0x03975E 0E:974E: 02        .byte $02   ; 
- - - - - - 0x03975F 0E:974F: 02        .byte $02   ; 
- D 0 - I - 0x039760 0E:9750: 00        .byte $00   ; 
- - - - - - 0x039761 0E:9751: 00        .byte $00   ; 
- D 0 - I - 0x039762 0E:9752: 41        .byte $41   ; <A>
- D 0 - I - 0x039763 0E:9753: 00        .byte $00   ; 
- D 0 - I - 0x039764 0E:9754: 00        .byte $00   ; 
- D 0 - I - 0x039765 0E:9755: 00        .byte $00   ; 
- D 0 - I - 0x039766 0E:9756: 00        .byte $00   ; 
- D 0 - I - 0x039767 0E:9757: 03        .byte $03   ; 
- - - - - - 0x039768 0E:9758: 00        .byte $00   ; 
- D 0 - I - 0x039769 0E:9759: 00        .byte $00   ; 
- D 0 - I - 0x03976A 0E:975A: 00        .byte $00   ; 
- D 0 - I - 0x03976B 0E:975B: 00        .byte $00   ; 
- D 0 - I - 0x03976C 0E:975C: 0E        .byte $0E   ; 
- - - - - - 0x03976D 0E:975D: 00        .byte $00   ; 
- D 0 - I - 0x03976E 0E:975E: 42        .byte $42   ; <B>
- D 0 - I - 0x03976F 0E:975F: 0A        .byte $0A   ; 
- D 0 - I - 0x039770 0E:9760: 00        .byte $00   ; 
- D 0 - I - 0x039771 0E:9761: 00        .byte $00   ; 
- D 0 - I - 0x039772 0E:9762: 01        .byte $01   ; 
- D 0 - I - 0x039773 0E:9763: 01        .byte $01   ; 
- D 0 - I - 0x039774 0E:9764: 00        .byte $00   ; 
- D 0 - I - 0x039775 0E:9765: 00        .byte $00   ; 
- D 0 - I - 0x039776 0E:9766: 00        .byte $00   ; 
- D 0 - I - 0x039777 0E:9767: 00        .byte $00   ; 
- D 0 - I - 0x039778 0E:9768: 0F        .byte $0F   ; 
- - - - - - 0x039779 0E:9769: 00        .byte $00   ; 
- D 0 - I - 0x03977A 0E:976A: 0F        .byte $0F   ; 
- D 0 - I - 0x03977B 0E:976B: 00        .byte $00   ; 
- - - - - - 0x03977C 0E:976C: 00        .byte $00   ; 
- - - - - - 0x03977D 0E:976D: 00        .byte $00   ; 
- D 0 - I - 0x03977E 0E:976E: 04        .byte $04   ; 
- D 0 - I - 0x03977F 0E:976F: 00        .byte $00   ; 
- D 0 - I - 0x039780 0E:9770: 00        .byte $00   ; 
- - - - - - 0x039781 0E:9771: 00        .byte $00   ; 
- - - - - - 0x039782 0E:9772: 00        .byte $00   ; 
- - - - - - 0x039783 0E:9773: 00        .byte $00   ; 
- - - - - - 0x039784 0E:9774: 00        .byte $00   ; 
- - - - - - 0x039785 0E:9775: 00        .byte $00   ; 
- D 0 - I - 0x039786 0E:9776: 45        .byte $45   ; <E>
- D 0 - I - 0x039787 0E:9777: 0A        .byte $0A   ; 
- D 0 - I - 0x039788 0E:9778: 00        .byte $00   ; 
- D 0 - I - 0x039789 0E:9779: 00        .byte $00   ; 
- D 0 - I - 0x03978A 0E:977A: 08        .byte $08   ; 
- D 0 - I - 0x03978B 0E:977B: 03        .byte $03   ; 
- - - - - - 0x03978C 0E:977C: 00        .byte $00   ; 
- D 0 - I - 0x03978D 0E:977D: 00        .byte $00   ; 
- D 0 - I - 0x03978E 0E:977E: 00        .byte $00   ; 
- - - - - - 0x03978F 0E:977F: 00        .byte $00   ; 
- D 0 - I - 0x039790 0E:9780: 0C        .byte $0C   ; 
- - - - - - 0x039791 0E:9781: 00        .byte $00   ; 
- D 0 - I - 0x039792 0E:9782: 48        .byte $48   ; <H>
- D 0 - I - 0x039793 0E:9783: 0F        .byte $0F   ; 
- D 0 - I - 0x039794 0E:9784: 00        .byte $00   ; 
- D 0 - I - 0x039795 0E:9785: 00        .byte $00   ; 
- D 0 - I - 0x039796 0E:9786: 07        .byte $07   ; 
- D 0 - I - 0x039797 0E:9787: 05        .byte $05   ; 
- - - - - - 0x039798 0E:9788: 00        .byte $00   ; 
- D 0 - I - 0x039799 0E:9789: 00        .byte $00   ; 
- D 0 - I - 0x03979A 0E:978A: 00        .byte $00   ; 
- D 0 - I - 0x03979B 0E:978B: 00        .byte $00   ; 
- D 0 - I - 0x03979C 0E:978C: 1E        .byte $1E   ; 
- - - - - - 0x03979D 0E:978D: 00        .byte $00   ; 
- D 0 - I - 0x03979E 0E:978E: 49        .byte $49   ; <I>
- D 0 - I - 0x03979F 0E:978F: 0F        .byte $0F   ; 
- D 0 - I - 0x0397A0 0E:9790: 00        .byte $00   ; 
- D 0 - I - 0x0397A1 0E:9791: 00        .byte $00   ; 
- D 0 - I - 0x0397A2 0E:9792: 02        .byte $02   ; 
- D 0 - I - 0x0397A3 0E:9793: 03        .byte $03   ; 
- - - - - - 0x0397A4 0E:9794: 00        .byte $00   ; 
- D 0 - I - 0x0397A5 0E:9795: 00        .byte $00   ; 
- D 0 - I - 0x0397A6 0E:9796: 00        .byte $00   ; 
- - - - - - 0x0397A7 0E:9797: 00        .byte $00   ; 
- D 0 - I - 0x0397A8 0E:9798: 03        .byte $03   ; 
- - - - - - 0x0397A9 0E:9799: 00        .byte $00   ; 
- D 0 - I - 0x0397AA 0E:979A: 4C        .byte $4C   ; <L>
- D 0 - I - 0x0397AB 0E:979B: 00        .byte $00   ; 
- D 0 - I - 0x0397AC 0E:979C: 00        .byte $00   ; 
- D 0 - I - 0x0397AD 0E:979D: 00        .byte $00   ; 
- D 0 - I - 0x0397AE 0E:979E: 0F        .byte $0F   ; 
- D 0 - I - 0x0397AF 0E:979F: 03        .byte $03   ; 
- D 0 - I - 0x0397B0 0E:97A0: 00        .byte $00   ; 
- D 0 - I - 0x0397B1 0E:97A1: 00        .byte $00   ; 
- - - - - - 0x0397B2 0E:97A2: 00        .byte $00   ; 
- D 0 - I - 0x0397B3 0E:97A3: 00        .byte $00   ; 
- D 0 - I - 0x0397B4 0E:97A4: 02        .byte $02   ; 
- - - - - - 0x0397B5 0E:97A5: 00        .byte $00   ; 
- D 0 - I - 0x0397B6 0E:97A6: 4D        .byte $4D   ; <M>
- D 0 - I - 0x0397B7 0E:97A7: 00        .byte $00   ; 
- D 0 - I - 0x0397B8 0E:97A8: 00        .byte $00   ; 
- D 0 - I - 0x0397B9 0E:97A9: 00        .byte $00   ; 
- D 0 - I - 0x0397BA 0E:97AA: 10        .byte $10   ; 
- D 0 - I - 0x0397BB 0E:97AB: 00        .byte $00   ; 
- - - - - - 0x0397BC 0E:97AC: 00        .byte $00   ; 
- D 0 - I - 0x0397BD 0E:97AD: 00        .byte $00   ; 
- D 0 - I - 0x0397BE 0E:97AE: 00        .byte $00   ; 
- D 0 - I - 0x0397BF 0E:97AF: 00        .byte $00   ; 
- D 0 - I - 0x0397C0 0E:97B0: 11        .byte $11   ; 
- - - - - - 0x0397C1 0E:97B1: 00        .byte $00   ; 
- D 0 - I - 0x0397C2 0E:97B2: 4E        .byte $4E   ; <N>
- D 0 - I - 0x0397C3 0E:97B3: 00        .byte $00   ; 
- D 0 - I - 0x0397C4 0E:97B4: 00        .byte $00   ; 
- D 0 - I - 0x0397C5 0E:97B5: 00        .byte $00   ; 
- D 0 - I - 0x0397C6 0E:97B6: 00        .byte $00   ; 
- D 0 - I - 0x0397C7 0E:97B7: 00        .byte $00   ; 
- D 0 - I - 0x0397C8 0E:97B8: 00        .byte $00   ; 
- D 0 - I - 0x0397C9 0E:97B9: 00        .byte $00   ; 
- D 0 - I - 0x0397CA 0E:97BA: 00        .byte $00   ; 
- D 0 - I - 0x0397CB 0E:97BB: 00        .byte $00   ; 
- D 0 - I - 0x0397CC 0E:97BC: 12        .byte $12   ; 
- - - - - - 0x0397CD 0E:97BD: 00        .byte $00   ; 
- D 0 - I - 0x0397CE 0E:97BE: 12        .byte $12   ; 
- D 0 - I - 0x0397CF 0E:97BF: 00        .byte $00   ; 
- - - - - - 0x0397D0 0E:97C0: 00        .byte $00   ; 
- - - - - - 0x0397D1 0E:97C1: 00        .byte $00   ; 
- D 0 - I - 0x0397D2 0E:97C2: 00        .byte $00   ; 
- D 0 - I - 0x0397D3 0E:97C3: 02        .byte $02   ; 
- D 0 - I - 0x0397D4 0E:97C4: 00        .byte $00   ; 
- - - - - - 0x0397D5 0E:97C5: 00        .byte $00   ; 
- - - - - - 0x0397D6 0E:97C6: 00        .byte $00   ; 
- - - - - - 0x0397D7 0E:97C7: 00        .byte $00   ; 
- - - - - - 0x0397D8 0E:97C8: 00        .byte $00   ; 
- - - - - - 0x0397D9 0E:97C9: 00        .byte $00   ; 
- D 0 - I - 0x0397DA 0E:97CA: 4F        .byte $4F   ; <O>
- D 0 - I - 0x0397DB 0E:97CB: 0E        .byte $0E   ; 
- D 0 - I - 0x0397DC 0E:97CC: 00        .byte $00   ; 
- D 0 - I - 0x0397DD 0E:97CD: 10        .byte $10   ; 
- D 0 - I - 0x0397DE 0E:97CE: 11        .byte $11   ; 
- D 0 - I - 0x0397DF 0E:97CF: 00        .byte $00   ; 
- - - - - - 0x0397E0 0E:97D0: 00        .byte $00   ; 
- D 0 - I - 0x0397E1 0E:97D1: 03        .byte $03   ; 
- D 0 - I - 0x0397E2 0E:97D2: 02        .byte $02   ; 
- - - - - - 0x0397E3 0E:97D3: 02        .byte $02   ; 
- D 0 - I - 0x0397E4 0E:97D4: 15        .byte $15   ; 
- - - - - - 0x0397E5 0E:97D5: 00        .byte $00   ; 
- D 0 - I - 0x0397E6 0E:97D6: 50        .byte $50   ; <P>
- D 0 - I - 0x0397E7 0E:97D7: 0A        .byte $0A   ; 
- D 0 - I - 0x0397E8 0E:97D8: 00        .byte $00   ; 
- D 0 - I - 0x0397E9 0E:97D9: 00        .byte $00   ; 
- D 0 - I - 0x0397EA 0E:97DA: 01        .byte $01   ; 
- D 0 - I - 0x0397EB 0E:97DB: 05        .byte $05   ; 
- - - - - - 0x0397EC 0E:97DC: 00        .byte $00   ; 
- D 0 - I - 0x0397ED 0E:97DD: 00        .byte $00   ; 
- D 0 - I - 0x0397EE 0E:97DE: 00        .byte $00   ; 
- - - - - - 0x0397EF 0E:97DF: 00        .byte $00   ; 
- D 0 - I - 0x0397F0 0E:97E0: 14        .byte $14   ; 
- - - - - - 0x0397F1 0E:97E1: 00        .byte $00   ; 
- D 0 - I - 0x0397F2 0E:97E2: 51        .byte $51   ; <Q>
- D 0 - I - 0x0397F3 0E:97E3: 00        .byte $00   ; 
- D 0 - I - 0x0397F4 0E:97E4: 00        .byte $00   ; 
- D 0 - I - 0x0397F5 0E:97E5: 00        .byte $00   ; 
- D 0 - I - 0x0397F6 0E:97E6: 01        .byte $01   ; 
- D 0 - I - 0x0397F7 0E:97E7: 03        .byte $03   ; 
- D 0 - I - 0x0397F8 0E:97E8: 00        .byte $00   ; 
- D 0 - I - 0x0397F9 0E:97E9: 00        .byte $00   ; 
- - - - - - 0x0397FA 0E:97EA: 00        .byte $00   ; 
- D 0 - I - 0x0397FB 0E:97EB: 00        .byte $00   ; 
- D 0 - I - 0x0397FC 0E:97EC: 14        .byte $14   ; 
- - - - - - 0x0397FD 0E:97ED: 00        .byte $00   ; 
- D 0 - I - 0x0397FE 0E:97EE: 52        .byte $52   ; <R>
- D 0 - I - 0x0397FF 0E:97EF: 02        .byte $02   ; 
- D 0 - I - 0x039800 0E:97F0: 00        .byte $00   ; 
- D 0 - I - 0x039801 0E:97F1: 00        .byte $00   ; 
- D 0 - I - 0x039802 0E:97F2: 01        .byte $01   ; 
- D 0 - I - 0x039803 0E:97F3: 05        .byte $05   ; 
- D 0 - I - 0x039804 0E:97F4: 00        .byte $00   ; 
- D 0 - I - 0x039805 0E:97F5: 00        .byte $00   ; 
- D 0 - I - 0x039806 0E:97F6: 00        .byte $00   ; 
- D 0 - I - 0x039807 0E:97F7: 00        .byte $00   ; 
- D 0 - I - 0x039808 0E:97F8: 14        .byte $14   ; 
- - - - - - 0x039809 0E:97F9: 00        .byte $00   ; 
- D 0 - I - 0x03980A 0E:97FA: 53        .byte $53   ; <S>
- D 0 - I - 0x03980B 0E:97FB: 02        .byte $02   ; 
- D 0 - I - 0x03980C 0E:97FC: 00        .byte $00   ; 
- D 0 - I - 0x03980D 0E:97FD: 00        .byte $00   ; 
- D 0 - I - 0x03980E 0E:97FE: 01        .byte $01   ; 
- D 0 - I - 0x03980F 0E:97FF: 05        .byte $05   ; 
- - - - - - 0x039810 0E:9800: 00        .byte $00   ; 
- D 0 - I - 0x039811 0E:9801: 00        .byte $00   ; 
- D 0 - I - 0x039812 0E:9802: 00        .byte $00   ; 
- - - - - - 0x039813 0E:9803: 00        .byte $00   ; 
- D 0 - I - 0x039814 0E:9804: 15        .byte $15   ; 
- - - - - - 0x039815 0E:9805: 00        .byte $00   ; 
- D 0 - I - 0x039816 0E:9806: 54        .byte $54   ; <T>
- D 0 - I - 0x039817 0E:9807: 11        .byte $11   ; 
- D 0 - I - 0x039818 0E:9808: 00        .byte $00   ; 
- D 0 - I - 0x039819 0E:9809: 18        .byte $18   ; 
- D 0 - I - 0x03981A 0E:980A: 01        .byte $01   ; 
- D 0 - I - 0x03981B 0E:980B: 06        .byte $06   ; 
- D 0 - I - 0x03981C 0E:980C: 00        .byte $00   ; 
- D 0 - I - 0x03981D 0E:980D: 00        .byte $00   ; 
- D 0 - I - 0x03981E 0E:980E: 00        .byte $00   ; 
- D 0 - I - 0x03981F 0E:980F: 00        .byte $00   ; 
- D 0 - I - 0x039820 0E:9810: 14        .byte $14   ; 
- - - - - - 0x039821 0E:9811: 00        .byte $00   ; 
- D 0 - I - 0x039822 0E:9812: 54        .byte $54   ; <T>
- D 0 - I - 0x039823 0E:9813: 11        .byte $11   ; 
- D 0 - I - 0x039824 0E:9814: 00        .byte $00   ; 
- D 0 - I - 0x039825 0E:9815: 04        .byte $04   ; 
- D 0 - I - 0x039826 0E:9816: 01        .byte $01   ; 
- D 0 - I - 0x039827 0E:9817: 06        .byte $06   ; 
- D 0 - I - 0x039828 0E:9818: 00        .byte $00   ; 
- D 0 - I - 0x039829 0E:9819: 00        .byte $00   ; 
- D 0 - I - 0x03982A 0E:981A: 00        .byte $00   ; 
- D 0 - I - 0x03982B 0E:981B: 00        .byte $00   ; 
- D 0 - I - 0x03982C 0E:981C: 14        .byte $14   ; 
- - - - - - 0x03982D 0E:981D: 00        .byte $00   ; 
- D 0 - I - 0x03982E 0E:981E: 55        .byte $55   ; <U>
- D 0 - I - 0x03982F 0E:981F: 10        .byte $10   ; 
- D 0 - I - 0x039830 0E:9820: 20        .byte $20   ; 
- D 0 - I - 0x039831 0E:9821: 10        .byte $10   ; 
- D 0 - I - 0x039832 0E:9822: 12        .byte $12   ; 
- - - - - - 0x039833 0E:9823: 00        .byte $00   ; 
- D 0 - I - 0x039834 0E:9824: 00        .byte $00   ; 
- D 0 - I - 0x039835 0E:9825: 04        .byte $04   ; 
- - - - - - 0x039836 0E:9826: 01        .byte $01   ; 
- D 0 - I - 0x039837 0E:9827: 01        .byte $01   ; 
- D 0 - I - 0x039838 0E:9828: 15        .byte $15   ; 
- - - - - - 0x039839 0E:9829: 00        .byte $00   ; 
- D 0 - I - 0x03983A 0E:982A: 56        .byte $56   ; <V>
- D 0 - I - 0x03983B 0E:982B: 00        .byte $00   ; 
- D 0 - I - 0x03983C 0E:982C: 00        .byte $00   ; 
- D 0 - I - 0x03983D 0E:982D: 00        .byte $00   ; 
- D 0 - I - 0x03983E 0E:982E: 01        .byte $01   ; 
- - - - - - 0x03983F 0E:982F: 00        .byte $00   ; 
- D 0 - I - 0x039840 0E:9830: 00        .byte $00   ; 
- D 0 - I - 0x039841 0E:9831: 05        .byte $05   ; 
- - - - - - 0x039842 0E:9832: 00        .byte $00   ; 
- D 0 - I - 0x039843 0E:9833: 00        .byte $00   ; 
- D 0 - I - 0x039844 0E:9834: 14        .byte $14   ; 
- - - - - - 0x039845 0E:9835: 00        .byte $00   ; 
- D 0 - I - 0x039846 0E:9836: 57        .byte $57   ; <W>
- D 0 - I - 0x039847 0E:9837: 10        .byte $10   ; 
- D 0 - I - 0x039848 0E:9838: 20        .byte $20   ; 
- D 0 - I - 0x039849 0E:9839: 10        .byte $10   ; 
- D 0 - I - 0x03984A 0E:983A: 12        .byte $12   ; 
- - - - - - 0x03984B 0E:983B: 00        .byte $00   ; 
- D 0 - I - 0x03984C 0E:983C: 00        .byte $00   ; 
- D 0 - I - 0x03984D 0E:983D: 03        .byte $03   ; 
- - - - - - 0x03984E 0E:983E: 01        .byte $01   ; 
- D 0 - I - 0x03984F 0E:983F: 01        .byte $01   ; 
- D 0 - I - 0x039850 0E:9840: 15        .byte $15   ; 
- - - - - - 0x039851 0E:9841: 00        .byte $00   ; 
- D 0 - I - 0x039852 0E:9842: 58        .byte $58   ; <X>
- D 0 - I - 0x039853 0E:9843: 10        .byte $10   ; 
- D 0 - I - 0x039854 0E:9844: 10        .byte $10   ; 
- D 0 - I - 0x039855 0E:9845: 00        .byte $00   ; 
- D 0 - I - 0x039856 0E:9846: 12        .byte $12   ; 
- - - - - - 0x039857 0E:9847: 00        .byte $00   ; 
- D 0 - I - 0x039858 0E:9848: 00        .byte $00   ; 
- D 0 - I - 0x039859 0E:9849: 00        .byte $00   ; 
- - - - - - 0x03985A 0E:984A: 00        .byte $00   ; 
- D 0 - I - 0x03985B 0E:984B: 00        .byte $00   ; 
- D 0 - I - 0x03985C 0E:984C: 15        .byte $15   ; 
- - - - - - 0x03985D 0E:984D: 00        .byte $00   ; 
- D 0 - I - 0x03985E 0E:984E: 13        .byte $13   ; 
- D 0 - I - 0x03985F 0E:984F: 00        .byte $00   ; 
- - - - - - 0x039860 0E:9850: 00        .byte $00   ; 
- - - - - - 0x039861 0E:9851: 00        .byte $00   ; 
- D 0 - I - 0x039862 0E:9852: 04        .byte $04   ; 
- D 0 - I - 0x039863 0E:9853: 00        .byte $00   ; 
- D 0 - I - 0x039864 0E:9854: 00        .byte $00   ; 
- - - - - - 0x039865 0E:9855: 00        .byte $00   ; 
- - - - - - 0x039866 0E:9856: 00        .byte $00   ; 
- - - - - - 0x039867 0E:9857: 00        .byte $00   ; 
- - - - - - 0x039868 0E:9858: 00        .byte $00   ; 
- - - - - - 0x039869 0E:9859: 00        .byte $00   ; 
- D 0 - I - 0x03986A 0E:985A: 5D        .byte $5D   ; 
- D 0 - I - 0x03986B 0E:985B: 00        .byte $00   ; 
- D 0 - I - 0x03986C 0E:985C: 00        .byte $00   ; 
- D 0 - I - 0x03986D 0E:985D: 00        .byte $00   ; 
- D 0 - I - 0x03986E 0E:985E: 08        .byte $08   ; 
- D 0 - I - 0x03986F 0E:985F: 06        .byte $06   ; 
- - - - - - 0x039870 0E:9860: 00        .byte $00   ; 
- D 0 - I - 0x039871 0E:9861: 01        .byte $01   ; 
- - - - - - 0x039872 0E:9862: 00        .byte $00   ; 
- D 0 - I - 0x039873 0E:9863: 00        .byte $00   ; 
- D 0 - I - 0x039874 0E:9864: 03        .byte $03   ; 
- - - - - - 0x039875 0E:9865: 00        .byte $00   ; 
- D 0 - I - 0x039876 0E:9866: 5D        .byte $5D   ; 
- D 0 - I - 0x039877 0E:9867: 00        .byte $00   ; 
- D 0 - I - 0x039878 0E:9868: 00        .byte $00   ; 
- D 0 - I - 0x039879 0E:9869: 00        .byte $00   ; 
- D 0 - I - 0x03987A 0E:986A: 08        .byte $08   ; 
- D 0 - I - 0x03987B 0E:986B: 06        .byte $06   ; 
- - - - - - 0x03987C 0E:986C: 00        .byte $00   ; 
- D 0 - I - 0x03987D 0E:986D: 01        .byte $01   ; 
- D 0 - I - 0x03987E 0E:986E: 00        .byte $00   ; 
- - - - - - 0x03987F 0E:986F: 00        .byte $00   ; 
- D 0 - I - 0x039880 0E:9870: 03        .byte $03   ; 
- - - - - - 0x039881 0E:9871: 00        .byte $00   ; 
- D 0 - I - 0x039882 0E:9872: 66        .byte $66   ; <f>
- D 0 - I - 0x039883 0E:9873: 13        .byte $13   ; 
- D 0 - I - 0x039884 0E:9874: 00        .byte $00   ; 
- D 0 - I - 0x039885 0E:9875: 08        .byte $08   ; 
- D 0 - I - 0x039886 0E:9876: 10        .byte $10   ; 
- D 0 - I - 0x039887 0E:9877: 06        .byte $06   ; 
- - - - - - 0x039888 0E:9878: 00        .byte $00   ; 
- D 0 - I - 0x039889 0E:9879: 06        .byte $06   ; 
- D 0 - I - 0x03988A 0E:987A: 02        .byte $02   ; 
- - - - - - 0x03988B 0E:987B: 02        .byte $02   ; 
- D 0 - I - 0x03988C 0E:987C: 02        .byte $02   ; 
- - - - - - 0x03988D 0E:987D: 00        .byte $00   ; 
- D 0 - I - 0x03988E 0E:987E: 67        .byte $67   ; <g>
- D 0 - I - 0x03988F 0E:987F: 13        .byte $13   ; 
- D 0 - I - 0x039890 0E:9880: 00        .byte $00   ; 
- D 0 - I - 0x039891 0E:9881: 10        .byte $10   ; 
- D 0 - I - 0x039892 0E:9882: 10        .byte $10   ; 
- D 0 - I - 0x039893 0E:9883: 06        .byte $06   ; 
- D 0 - I - 0x039894 0E:9884: 00        .byte $00   ; 
- D 0 - I - 0x039895 0E:9885: 06        .byte $06   ; 
- D 0 - I - 0x039896 0E:9886: 02        .byte $02   ; 
- D 0 - I - 0x039897 0E:9887: 02        .byte $02   ; 
- D 0 - I - 0x039898 0E:9888: 02        .byte $02   ; 
- - - - - - 0x039899 0E:9889: 00        .byte $00   ; 
- D 0 - I - 0x03989A 0E:988A: 6B        .byte $6B   ; <k>
- D 0 - I - 0x03989B 0E:988B: 14        .byte $14   ; 
- D 0 - I - 0x03989C 0E:988C: 00        .byte $00   ; 
- D 0 - I - 0x03989D 0E:988D: 08        .byte $08   ; 
- D 0 - I - 0x03989E 0E:988E: 13        .byte $13   ; 
- D 0 - I - 0x03989F 0E:988F: 05        .byte $05   ; 
- D 0 - I - 0x0398A0 0E:9890: 00        .byte $00   ; 
- D 0 - I - 0x0398A1 0E:9891: 00        .byte $00   ; 
- D 0 - I - 0x0398A2 0E:9892: 00        .byte $00   ; 
- D 0 - I - 0x0398A3 0E:9893: 00        .byte $00   ; 
- D 0 - I - 0x0398A4 0E:9894: 03        .byte $03   ; 
- - - - - - 0x0398A5 0E:9895: 00        .byte $00   ; 
- D 0 - I - 0x0398A6 0E:9896: 1B        .byte $1B   ; 
- D 0 - I - 0x0398A7 0E:9897: 00        .byte $00   ; 
- - - - - - 0x0398A8 0E:9898: 00        .byte $00   ; 
- - - - - - 0x0398A9 0E:9899: 00        .byte $00   ; 
- D 0 - I - 0x0398AA 0E:989A: 05        .byte $05   ; 
- D 0 - I - 0x0398AB 0E:989B: 02        .byte $02   ; 
- D 0 - I - 0x0398AC 0E:989C: 00        .byte $00   ; 
- - - - - - 0x0398AD 0E:989D: 00        .byte $00   ; 
- - - - - - 0x0398AE 0E:989E: 00        .byte $00   ; 
- - - - - - 0x0398AF 0E:989F: 00        .byte $00   ; 
- - - - - - 0x0398B0 0E:98A0: 00        .byte $00   ; 
- - - - - - 0x0398B1 0E:98A1: 00        .byte $00   ; 
- D 0 - I - 0x0398B2 0E:98A2: 6E        .byte $6E   ; <n>
- D 0 - I - 0x0398B3 0E:98A3: 0A        .byte $0A   ; 
- D 0 - I - 0x0398B4 0E:98A4: 00        .byte $00   ; 
- D 0 - I - 0x0398B5 0E:98A5: 00        .byte $00   ; 
- D 0 - I - 0x0398B6 0E:98A6: 09        .byte $09   ; 
- D 0 - I - 0x0398B7 0E:98A7: 06        .byte $06   ; 
- - - - - - 0x0398B8 0E:98A8: 04        .byte $04   ; 
- D 0 - I - 0x0398B9 0E:98A9: 00        .byte $00   ; 
- - - - - - 0x0398BA 0E:98AA: 00        .byte $00   ; 
- - - - - - 0x0398BB 0E:98AB: 00        .byte $00   ; 
- D 0 - I - 0x0398BC 0E:98AC: 00        .byte $00   ; 
- - - - - - 0x0398BD 0E:98AD: 00        .byte $00   ; 
- D 0 - I - 0x0398BE 0E:98AE: 6F        .byte $6F   ; <o>
- D 0 - I - 0x0398BF 0E:98AF: 0B        .byte $0B   ; 
- D 0 - I - 0x0398C0 0E:98B0: 10        .byte $10   ; 
- D 0 - I - 0x0398C1 0E:98B1: 40        .byte $40   ; 
- D 0 - I - 0x0398C2 0E:98B2: 04        .byte $04   ; 
- D 0 - I - 0x0398C3 0E:98B3: 06        .byte $06   ; 
- D 0 - I - 0x0398C4 0E:98B4: 04        .byte $04   ; 
- D 0 - I - 0x0398C5 0E:98B5: 02        .byte $02   ; 
- - - - - - 0x0398C6 0E:98B6: 02        .byte $02   ; 
- D 0 - I - 0x0398C7 0E:98B7: 02        .byte $02   ; 
- D 0 - I - 0x0398C8 0E:98B8: 01        .byte $01   ; 
- - - - - - 0x0398C9 0E:98B9: 00        .byte $00   ; 
- D 0 - I - 0x0398CA 0E:98BA: 72        .byte $72   ; <r>
- D 0 - I - 0x0398CB 0E:98BB: 0F        .byte $0F   ; 
- D 0 - I - 0x0398CC 0E:98BC: 00        .byte $00   ; 
- D 0 - I - 0x0398CD 0E:98BD: 00        .byte $00   ; 
- D 0 - I - 0x0398CE 0E:98BE: 09        .byte $09   ; 
- D 0 - I - 0x0398CF 0E:98BF: 06        .byte $06   ; 
- D 0 - I - 0x0398D0 0E:98C0: 00        .byte $00   ; 
- D 0 - I - 0x0398D1 0E:98C1: 00        .byte $00   ; 
- D 0 - I - 0x0398D2 0E:98C2: 00        .byte $00   ; 
- - - - - - 0x0398D3 0E:98C3: 00        .byte $00   ; 
- D 0 - I - 0x0398D4 0E:98C4: 00        .byte $00   ; 
- - - - - - 0x0398D5 0E:98C5: 00        .byte $00   ; 
- D 0 - I - 0x0398D6 0E:98C6: 1D        .byte $1D   ; 
- D 0 - I - 0x0398D7 0E:98C7: 00        .byte $00   ; 
- - - - - - 0x0398D8 0E:98C8: 00        .byte $00   ; 
- - - - - - 0x0398D9 0E:98C9: 00        .byte $00   ; 
- D 0 - I - 0x0398DA 0E:98CA: 05        .byte $05   ; 
- D 0 - I - 0x0398DB 0E:98CB: 02        .byte $02   ; 
- D 0 - I - 0x0398DC 0E:98CC: 00        .byte $00   ; 
- - - - - - 0x0398DD 0E:98CD: 00        .byte $00   ; 
- - - - - - 0x0398DE 0E:98CE: 00        .byte $00   ; 
- - - - - - 0x0398DF 0E:98CF: 00        .byte $00   ; 
- - - - - - 0x0398E0 0E:98D0: 00        .byte $00   ; 
- - - - - - 0x0398E1 0E:98D1: 00        .byte $00   ; 
- D 0 - I - 0x0398E2 0E:98D2: 75        .byte $75   ; <u>
- D 0 - I - 0x0398E3 0E:98D3: 0A        .byte $0A   ; 
- D 0 - I - 0x0398E4 0E:98D4: 00        .byte $00   ; 
- D 0 - I - 0x0398E5 0E:98D5: 10        .byte $10   ; 
- D 0 - I - 0x0398E6 0E:98D6: 15        .byte $15   ; 
- D 0 - I - 0x0398E7 0E:98D7: 06        .byte $06   ; 
- D 0 - I - 0x0398E8 0E:98D8: 05        .byte $05   ; 
- D 0 - I - 0x0398E9 0E:98D9: 00        .byte $00   ; 
- - - - - - 0x0398EA 0E:98DA: 02        .byte $02   ; 
- - - - - - 0x0398EB 0E:98DB: 02        .byte $02   ; 
- D 0 - I - 0x0398EC 0E:98DC: 0B        .byte $0B   ; 
- - - - - - 0x0398ED 0E:98DD: 00        .byte $00   ; 
- D 0 - I - 0x0398EE 0E:98DE: 76        .byte $76   ; <v>
- D 0 - I - 0x0398EF 0E:98DF: 0F        .byte $0F   ; 
- D 0 - I - 0x0398F0 0E:98E0: 00        .byte $00   ; 
- D 0 - I - 0x0398F1 0E:98E1: 00        .byte $00   ; 
- D 0 - I - 0x0398F2 0E:98E2: 15        .byte $15   ; 
- D 0 - I - 0x0398F3 0E:98E3: 06        .byte $06   ; 
- D 0 - I - 0x0398F4 0E:98E4: 01        .byte $01   ; 
- D 0 - I - 0x0398F5 0E:98E5: 00        .byte $00   ; 
- D 0 - I - 0x0398F6 0E:98E6: 00        .byte $00   ; 
- D 0 - I - 0x0398F7 0E:98E7: 00        .byte $00   ; 
- D 0 - I - 0x0398F8 0E:98E8: 01        .byte $01   ; 
- - - - - - 0x0398F9 0E:98E9: 00        .byte $00   ; 
- D 0 - I - 0x0398FA 0E:98EA: 79        .byte $79   ; <y>
- D 0 - I - 0x0398FB 0E:98EB: 13        .byte $13   ; 
- D 0 - I - 0x0398FC 0E:98EC: 00        .byte $00   ; 
- D 0 - I - 0x0398FD 0E:98ED: 00        .byte $00   ; 
- D 0 - I - 0x0398FE 0E:98EE: 13        .byte $13   ; 
- D 0 - I - 0x0398FF 0E:98EF: 06        .byte $06   ; 
- D 0 - I - 0x039900 0E:98F0: 00        .byte $00   ; 
- D 0 - I - 0x039901 0E:98F1: 00        .byte $00   ; 
- D 0 - I - 0x039902 0E:98F2: 00        .byte $00   ; 
- D 0 - I - 0x039903 0E:98F3: 00        .byte $00   ; 
- D 0 - I - 0x039904 0E:98F4: 01        .byte $01   ; 
- - - - - - 0x039905 0E:98F5: 00        .byte $00   ; 
- D 0 - I - 0x039906 0E:98F6: 7C        .byte $7C   ; 
- D 0 - I - 0x039907 0E:98F7: 13        .byte $13   ; 
- D 0 - I - 0x039908 0E:98F8: 00        .byte $00   ; 
- D 0 - I - 0x039909 0E:98F9: 00        .byte $00   ; 
- D 0 - I - 0x03990A 0E:98FA: 08        .byte $08   ; 
- D 0 - I - 0x03990B 0E:98FB: 06        .byte $06   ; 
- - - - - - 0x03990C 0E:98FC: 00        .byte $00   ; 
- D 0 - I - 0x03990D 0E:98FD: 00        .byte $00   ; 
- D 0 - I - 0x03990E 0E:98FE: 01        .byte $01   ; 
- - - - - - 0x03990F 0E:98FF: 00        .byte $00   ; 
- D 0 - I - 0x039910 0E:9900: 16        .byte $16   ; 
- - - - - - 0x039911 0E:9901: 00        .byte $00   ; 
- D 0 - I - 0x039912 0E:9902: 20        .byte $20   ; 
- D 0 - I - 0x039913 0E:9903: 00        .byte $00   ; 
- - - - - - 0x039914 0E:9904: 00        .byte $00   ; 
- - - - - - 0x039915 0E:9905: 00        .byte $00   ; 
- D 0 - I - 0x039916 0E:9906: 03        .byte $03   ; 
- D 0 - I - 0x039917 0E:9907: 01        .byte $01   ; 
- D 0 - I - 0x039918 0E:9908: 00        .byte $00   ; 
- - - - - - 0x039919 0E:9909: 00        .byte $00   ; 
- - - - - - 0x03991A 0E:990A: 00        .byte $00   ; 
- - - - - - 0x03991B 0E:990B: 00        .byte $00   ; 
- - - - - - 0x03991C 0E:990C: 00        .byte $00   ; 
- - - - - - 0x03991D 0E:990D: 00        .byte $00   ; 
- D 0 - I - 0x03991E 0E:990E: 7F        .byte $7F   ; 
- D 0 - I - 0x03991F 0E:990F: 15        .byte $15   ; 
- D 0 - I - 0x039920 0E:9910: 00        .byte $00   ; 
- D 0 - I - 0x039921 0E:9911: FF        .byte $FF   ; 
- D 0 - I - 0x039922 0E:9912: 16        .byte $16   ; 
- D 0 - I - 0x039923 0E:9913: 06        .byte $06   ; 
- - - - - - 0x039924 0E:9914: 02        .byte $02   ; 
- D 0 - I - 0x039925 0E:9915: 00        .byte $00   ; 
- D 0 - I - 0x039926 0E:9916: 00        .byte $00   ; 
- - - - - - 0x039927 0E:9917: 00        .byte $00   ; 
- D 0 - I - 0x039928 0E:9918: 00        .byte $00   ; 
- - - - - - 0x039929 0E:9919: 00        .byte $00   ; 
- D 0 - I - 0x03992A 0E:991A: 80        .byte $80   ; 
- D 0 - I - 0x03992B 0E:991B: 0B        .byte $0B   ; 
- D 0 - I - 0x03992C 0E:991C: 20        .byte $20   ; 
- D 0 - I - 0x03992D 0E:991D: 00        .byte $00   ; 
- D 0 - I - 0x03992E 0E:991E: 09        .byte $09   ; 
- D 0 - I - 0x03992F 0E:991F: 06        .byte $06   ; 
- D 0 - I - 0x039930 0E:9920: 00        .byte $00   ; 
- D 0 - I - 0x039931 0E:9921: 02        .byte $02   ; 
- D 0 - I - 0x039932 0E:9922: 02        .byte $02   ; 
- D 0 - I - 0x039933 0E:9923: 02        .byte $02   ; 
- D 0 - I - 0x039934 0E:9924: 17        .byte $17   ; 
- - - - - - 0x039935 0E:9925: 00        .byte $00   ; 
- D 0 - I - 0x039936 0E:9926: 82        .byte $82   ; 
- D 0 - I - 0x039937 0E:9927: 00        .byte $00   ; 
- D 0 - I - 0x039938 0E:9928: 00        .byte $00   ; 
- D 0 - I - 0x039939 0E:9929: 10        .byte $10   ; 
- D 0 - I - 0x03993A 0E:992A: 19        .byte $19   ; 
- D 0 - I - 0x03993B 0E:992B: 00        .byte $00   ; 
- - - - - - 0x03993C 0E:992C: 00        .byte $00   ; 
- D 0 - I - 0x03993D 0E:992D: 00        .byte $00   ; 
- D 0 - I - 0x03993E 0E:992E: 00        .byte $00   ; 
- - - - - - 0x03993F 0E:992F: 00        .byte $00   ; 
- D 0 - I - 0x039940 0E:9930: 0B        .byte $0B   ; 
- - - - - - 0x039941 0E:9931: 00        .byte $00   ; 
- D 0 - I - 0x039942 0E:9932: 83        .byte $83   ; 
- D 0 - I - 0x039943 0E:9933: 06        .byte $06   ; 
- D 0 - I - 0x039944 0E:9934: 00        .byte $00   ; 
- D 0 - I - 0x039945 0E:9935: 00        .byte $00   ; 
- D 0 - I - 0x039946 0E:9936: 08        .byte $08   ; 
- D 0 - I - 0x039947 0E:9937: 06        .byte $06   ; 
- - - - - - 0x039948 0E:9938: 03        .byte $03   ; 
- D 0 - I - 0x039949 0E:9939: 01        .byte $01   ; 
- D 0 - I - 0x03994A 0E:993A: 01        .byte $01   ; 
- - - - - - 0x03994B 0E:993B: 01        .byte $01   ; 
- D 0 - I - 0x03994C 0E:993C: 20        .byte $20   ; 
- - - - - - 0x03994D 0E:993D: 00        .byte $00   ; 
- D 0 - I - 0x03994E 0E:993E: 84        .byte $84   ; 
- D 0 - I - 0x03994F 0E:993F: 07        .byte $07   ; 
- D 0 - I - 0x039950 0E:9940: 00        .byte $00   ; 
- D 0 - I - 0x039951 0E:9941: 10        .byte $10   ; 
- D 0 - I - 0x039952 0E:9942: 18        .byte $18   ; 
- D 0 - I - 0x039953 0E:9943: 06        .byte $06   ; 
- - - - - - 0x039954 0E:9944: 02        .byte $02   ; 
- D 0 - I - 0x039955 0E:9945: 00        .byte $00   ; 
- D 0 - I - 0x039956 0E:9946: 00        .byte $00   ; 
- D 0 - I - 0x039957 0E:9947: 00        .byte $00   ; 
- D 0 - I - 0x039958 0E:9948: 22        .byte $22   ; 
- - - - - - 0x039959 0E:9949: 00        .byte $00   ; 
- D 0 - I - 0x03995A 0E:994A: 85        .byte $85   ; 
- D 0 - I - 0x03995B 0E:994B: 00        .byte $00   ; 
- D 0 - I - 0x03995C 0E:994C: 00        .byte $00   ; 
- D 0 - I - 0x03995D 0E:994D: 00        .byte $00   ; 
- D 0 - I - 0x03995E 0E:994E: 01        .byte $01   ; 
- D 0 - I - 0x03995F 0E:994F: 03        .byte $03   ; 
- D 0 - I - 0x039960 0E:9950: 00        .byte $00   ; 
- D 0 - I - 0x039961 0E:9951: 00        .byte $00   ; 
- D 0 - I - 0x039962 0E:9952: 00        .byte $00   ; 
- D 0 - I - 0x039963 0E:9953: 00        .byte $00   ; 
- D 0 - I - 0x039964 0E:9954: 21        .byte $21   ; 
- - - - - - 0x039965 0E:9955: 00        .byte $00   ; 
- D 0 - I - 0x039966 0E:9956: 86        .byte $86   ; 
- D 0 - I - 0x039967 0E:9957: 00        .byte $00   ; 
- D 0 - I - 0x039968 0E:9958: 18        .byte $18   ; 
- D 0 - I - 0x039969 0E:9959: 00        .byte $00   ; 
- D 0 - I - 0x03996A 0E:995A: 14        .byte $14   ; 
- - - - - - 0x03996B 0E:995B: 05        .byte $05   ; 
- D 0 - I - 0x03996C 0E:995C: 00        .byte $00   ; 
- D 0 - I - 0x03996D 0E:995D: 02        .byte $02   ; 
- - - - - - 0x03996E 0E:995E: 02        .byte $02   ; 
- D 0 - I - 0x03996F 0E:995F: 02        .byte $02   ; 
- D 0 - I - 0x039970 0E:9960: 19        .byte $19   ; 
- - - - - - 0x039971 0E:9961: 00        .byte $00   ; 
- D 0 - I - 0x039972 0E:9962: 88        .byte $88   ; 
- D 0 - I - 0x039973 0E:9963: 0A        .byte $0A   ; 
- D 0 - I - 0x039974 0E:9964: 00        .byte $00   ; 
- D 0 - I - 0x039975 0E:9965: 08        .byte $08   ; 
- D 0 - I - 0x039976 0E:9966: 1A        .byte $1A   ; 
- D 0 - I - 0x039977 0E:9967: 05        .byte $05   ; 
- - - - - - 0x039978 0E:9968: 02        .byte $02   ; 
- D 0 - I - 0x039979 0E:9969: 00        .byte $00   ; 
- D 0 - I - 0x03997A 0E:996A: 01        .byte $01   ; 
- - - - - - 0x03997B 0E:996B: 01        .byte $01   ; 
- D 0 - I - 0x03997C 0E:996C: 24        .byte $24   ; 
- - - - - - 0x03997D 0E:996D: 00        .byte $00   ; 
- D 0 - I - 0x03997E 0E:996E: 89        .byte $89   ; 
- D 0 - I - 0x03997F 0E:996F: 00        .byte $00   ; 
- D 0 - I - 0x039980 0E:9970: 00        .byte $00   ; 
- D 0 - I - 0x039981 0E:9971: 00        .byte $00   ; 
- D 0 - I - 0x039982 0E:9972: 00        .byte $00   ; 
- D 0 - I - 0x039983 0E:9973: 06        .byte $06   ; 
- - - - - - 0x039984 0E:9974: 00        .byte $00   ; 
- D 0 - I - 0x039985 0E:9975: 00        .byte $00   ; 
- D 0 - I - 0x039986 0E:9976: 00        .byte $00   ; 
- - - - - - 0x039987 0E:9977: 00        .byte $00   ; 
- D 0 - I - 0x039988 0E:9978: 25        .byte $25   ; 
- - - - - - 0x039989 0E:9979: 00        .byte $00   ; 
- D 0 - I - 0x03998A 0E:997A: 8A        .byte $8A   ; 
- D 0 - I - 0x03998B 0E:997B: 1A        .byte $1A   ; 
- D 0 - I - 0x03998C 0E:997C: 00        .byte $00   ; 
- D 0 - I - 0x03998D 0E:997D: 10        .byte $10   ; 
- D 0 - I - 0x03998E 0E:997E: 05        .byte $05   ; 
- D 0 - I - 0x03998F 0E:997F: 00        .byte $00   ; 
- D 0 - I - 0x039990 0E:9980: 00        .byte $00   ; 
- D 0 - I - 0x039991 0E:9981: 00        .byte $00   ; 
- D 0 - I - 0x039992 0E:9982: 02        .byte $02   ; 
- D 0 - I - 0x039993 0E:9983: 02        .byte $02   ; 
- D 0 - I - 0x039994 0E:9984: 26        .byte $26   ; 
- - - - - - 0x039995 0E:9985: 00        .byte $00   ; 
- D 0 - I - 0x039996 0E:9986: 8B        .byte $8B   ; 
- D 0 - I - 0x039997 0E:9987: 00        .byte $00   ; 
- D 0 - I - 0x039998 0E:9988: 00        .byte $00   ; 
- D 0 - I - 0x039999 0E:9989: 00        .byte $00   ; 
- D 0 - I - 0x03999A 0E:998A: 01        .byte $01   ; 
- D 0 - I - 0x03999B 0E:998B: 01        .byte $01   ; 
- D 0 - I - 0x03999C 0E:998C: 01        .byte $01   ; 
- D 0 - I - 0x03999D 0E:998D: 00        .byte $00   ; 
- D 0 - I - 0x03999E 0E:998E: 00        .byte $00   ; 
- D 0 - I - 0x03999F 0E:998F: 00        .byte $00   ; 
- D 0 - I - 0x0399A0 0E:9990: 25        .byte $25   ; 
- - - - - - 0x0399A1 0E:9991: 00        .byte $00   ; 
- D 0 - I - 0x0399A2 0E:9992: 8C        .byte $8C   ; 
- D 0 - I - 0x0399A3 0E:9993: 00        .byte $00   ; 
- D 0 - I - 0x0399A4 0E:9994: 00        .byte $00   ; 
- D 0 - I - 0x0399A5 0E:9995: 00        .byte $00   ; 
- D 0 - I - 0x0399A6 0E:9996: 14        .byte $14   ; 
- D 0 - I - 0x0399A7 0E:9997: 03        .byte $03   ; 
- - - - - - 0x0399A8 0E:9998: 00        .byte $00   ; 
- D 0 - I - 0x0399A9 0E:9999: 00        .byte $00   ; 
- D 0 - I - 0x0399AA 0E:999A: 00        .byte $00   ; 
- D 0 - I - 0x0399AB 0E:999B: 00        .byte $00   ; 
- D 0 - I - 0x0399AC 0E:999C: 27        .byte $27   ; 
- - - - - - 0x0399AD 0E:999D: 00        .byte $00   ; 
- D 0 - I - 0x0399AE 0E:999E: 8D        .byte $8D   ; 
- D 0 - I - 0x0399AF 0E:999F: 0A        .byte $0A   ; 
- D 0 - I - 0x0399B0 0E:99A0: 00        .byte $00   ; 
- D 0 - I - 0x0399B1 0E:99A1: 00        .byte $00   ; 
- D 0 - I - 0x0399B2 0E:99A2: 0F        .byte $0F   ; 
- D 0 - I - 0x0399B3 0E:99A3: 02        .byte $02   ; 
- D 0 - I - 0x0399B4 0E:99A4: 00        .byte $00   ; 
- D 0 - I - 0x0399B5 0E:99A5: 00        .byte $00   ; 
- - - - - - 0x0399B6 0E:99A6: 00        .byte $00   ; 
- D 0 - I - 0x0399B7 0E:99A7: 00        .byte $00   ; 
- D 0 - I - 0x0399B8 0E:99A8: 25        .byte $25   ; 
- - - - - - 0x0399B9 0E:99A9: 00        .byte $00   ; 
- D 0 - I - 0x0399BA 0E:99AA: 23        .byte $23   ; 
- D 0 - I - 0x0399BB 0E:99AB: 00        .byte $00   ; 
- - - - - - 0x0399BC 0E:99AC: 00        .byte $00   ; 
- - - - - - 0x0399BD 0E:99AD: 00        .byte $00   ; 
- D 0 - I - 0x0399BE 0E:99AE: 03        .byte $03   ; 
- D 0 - I - 0x0399BF 0E:99AF: 02        .byte $02   ; 
- D 0 - I - 0x0399C0 0E:99B0: 00        .byte $00   ; 
- - - - - - 0x0399C1 0E:99B1: 00        .byte $00   ; 
- - - - - - 0x0399C2 0E:99B2: 00        .byte $00   ; 
- - - - - - 0x0399C3 0E:99B3: 00        .byte $00   ; 
- - - - - - 0x0399C4 0E:99B4: 00        .byte $00   ; 
- - - - - - 0x0399C5 0E:99B5: 00        .byte $00   ; 
- D 0 - I - 0x0399C6 0E:99B6: 8E        .byte $8E   ; 
- D 0 - I - 0x0399C7 0E:99B7: 1C        .byte $1C   ; 
- D 0 - I - 0x0399C8 0E:99B8: 00        .byte $00   ; 
- D 0 - I - 0x0399C9 0E:99B9: 08        .byte $08   ; 
- D 0 - I - 0x0399CA 0E:99BA: 07        .byte $07   ; 
- D 0 - I - 0x0399CB 0E:99BB: 05        .byte $05   ; 
- - - - - - 0x0399CC 0E:99BC: 02        .byte $02   ; 
- D 0 - I - 0x0399CD 0E:99BD: 00        .byte $00   ; 
- - - - - - 0x0399CE 0E:99BE: 00        .byte $00   ; 
- - - - - - 0x0399CF 0E:99BF: 00        .byte $00   ; 
- D 0 - I - 0x0399D0 0E:99C0: 2E        .byte $2E   ; 
- - - - - - 0x0399D1 0E:99C1: 00        .byte $00   ; 
- D 0 - I - 0x0399D2 0E:99C2: 8F        .byte $8F   ; 
- D 0 - I - 0x0399D3 0E:99C3: 0A        .byte $0A   ; 
- D 0 - I - 0x0399D4 0E:99C4: 00        .byte $00   ; 
- D 0 - I - 0x0399D5 0E:99C5: 04        .byte $04   ; 
- D 0 - I - 0x0399D6 0E:99C6: 04        .byte $04   ; 
- D 0 - I - 0x0399D7 0E:99C7: 07        .byte $07   ; 
- - - - - - 0x0399D8 0E:99C8: 00        .byte $00   ; 
- D 0 - I - 0x0399D9 0E:99C9: 00        .byte $00   ; 
- - - - - - 0x0399DA 0E:99CA: 00        .byte $00   ; 
- - - - - - 0x0399DB 0E:99CB: 00        .byte $00   ; 
- D 0 - I - 0x0399DC 0E:99CC: 2D        .byte $2D   ; 
- - - - - - 0x0399DD 0E:99CD: 00        .byte $00   ; 
- D 0 - I - 0x0399DE 0E:99CE: 90        .byte $90   ; 
- D 0 - I - 0x0399DF 0E:99CF: 06        .byte $06   ; 
- D 0 - I - 0x0399E0 0E:99D0: 00        .byte $00   ; 
- D 0 - I - 0x0399E1 0E:99D1: 00        .byte $00   ; 
- D 0 - I - 0x0399E2 0E:99D2: 14        .byte $14   ; 
- D 0 - I - 0x0399E3 0E:99D3: 07        .byte $07   ; 
- D 0 - I - 0x0399E4 0E:99D4: 00        .byte $00   ; 
- D 0 - I - 0x0399E5 0E:99D5: 00        .byte $00   ; 
- D 0 - I - 0x0399E6 0E:99D6: 00        .byte $00   ; 
- - - - - - 0x0399E7 0E:99D7: 00        .byte $00   ; 
- D 0 - I - 0x0399E8 0E:99D8: 2C        .byte $2C   ; 
- - - - - - 0x0399E9 0E:99D9: 00        .byte $00   ; 
- D 0 - I - 0x0399EA 0E:99DA: 91        .byte $91   ; 
- D 0 - I - 0x0399EB 0E:99DB: 0A        .byte $0A   ; 
- D 0 - I - 0x0399EC 0E:99DC: 00        .byte $00   ; 
- D 0 - I - 0x0399ED 0E:99DD: 00        .byte $00   ; 
- D 0 - I - 0x0399EE 0E:99DE: 06        .byte $06   ; 
- D 0 - I - 0x0399EF 0E:99DF: 07        .byte $07   ; 
- - - - - - 0x0399F0 0E:99E0: 00        .byte $00   ; 
- D 0 - I - 0x0399F1 0E:99E1: 00        .byte $00   ; 
- D 0 - I - 0x0399F2 0E:99E2: 00        .byte $00   ; 
- D 0 - I - 0x0399F3 0E:99E3: 00        .byte $00   ; 
- D 0 - I - 0x0399F4 0E:99E4: 2A        .byte $2A   ; 
- - - - - - 0x0399F5 0E:99E5: 00        .byte $00   ; 
- D 0 - I - 0x0399F6 0E:99E6: 92        .byte $92   ; 
- D 0 - I - 0x0399F7 0E:99E7: 0A        .byte $0A   ; 
- D 0 - I - 0x0399F8 0E:99E8: 00        .byte $00   ; 
- D 0 - I - 0x0399F9 0E:99E9: 00        .byte $00   ; 
- D 0 - I - 0x0399FA 0E:99EA: 09        .byte $09   ; 
- - - - - - 0x0399FB 0E:99EB: 07        .byte $07   ; 
- D 0 - I - 0x0399FC 0E:99EC: 00        .byte $00   ; 
- D 0 - I - 0x0399FD 0E:99ED: 00        .byte $00   ; 
- D 0 - I - 0x0399FE 0E:99EE: 00        .byte $00   ; 
- - - - - - 0x0399FF 0E:99EF: 00        .byte $00   ; 
- D 0 - I - 0x039A00 0E:99F0: 2B        .byte $2B   ; 
- - - - - - 0x039A01 0E:99F1: 00        .byte $00   ; 
- D 0 - I - 0x039A02 0E:99F2: 93        .byte $93   ; 
- D 0 - I - 0x039A03 0E:99F3: 0A        .byte $0A   ; 
- D 0 - I - 0x039A04 0E:99F4: 00        .byte $00   ; 
- D 0 - I - 0x039A05 0E:99F5: 00        .byte $00   ; 
- D 0 - I - 0x039A06 0E:99F6: 12        .byte $12   ; 
- D 0 - I - 0x039A07 0E:99F7: 07        .byte $07   ; 
- D 0 - I - 0x039A08 0E:99F8: 00        .byte $00   ; 
- D 0 - I - 0x039A09 0E:99F9: 00        .byte $00   ; 
- D 0 - I - 0x039A0A 0E:99FA: 00        .byte $00   ; 
- D 0 - I - 0x039A0B 0E:99FB: 00        .byte $00   ; 
- D 0 - I - 0x039A0C 0E:99FC: 2A        .byte $2A   ; 
- - - - - - 0x039A0D 0E:99FD: 00        .byte $00   ; 
- D 0 - I - 0x039A0E 0E:99FE: 94        .byte $94   ; 
- D 0 - I - 0x039A0F 0E:99FF: 00        .byte $00   ; 
- D 0 - I - 0x039A10 0E:9A00: 02        .byte $02   ; 
- D 0 - I - 0x039A11 0E:9A01: 00        .byte $00   ; 
- D 0 - I - 0x039A12 0E:9A02: 14        .byte $14   ; 
- - - - - - 0x039A13 0E:9A03: 03        .byte $03   ; 
- D 0 - I - 0x039A14 0E:9A04: 00        .byte $00   ; 
- D 0 - I - 0x039A15 0E:9A05: 00        .byte $00   ; 
- - - - - - 0x039A16 0E:9A06: 00        .byte $00   ; 
- - - - - - 0x039A17 0E:9A07: 00        .byte $00   ; 
- D 0 - I - 0x039A18 0E:9A08: 29        .byte $29   ; 
- - - - - - 0x039A19 0E:9A09: 00        .byte $00   ; 
- D 0 - I - 0x039A1A 0E:9A0A: 95        .byte $95   ; 
- D 0 - I - 0x039A1B 0E:9A0B: 00        .byte $00   ; 
- D 0 - I - 0x039A1C 0E:9A0C: 02        .byte $02   ; 
- D 0 - I - 0x039A1D 0E:9A0D: 00        .byte $00   ; 
- D 0 - I - 0x039A1E 0E:9A0E: 14        .byte $14   ; 
- - - - - - 0x039A1F 0E:9A0F: 07        .byte $07   ; 
- D 0 - I - 0x039A20 0E:9A10: 00        .byte $00   ; 
- D 0 - I - 0x039A21 0E:9A11: 00        .byte $00   ; 
- D 0 - I - 0x039A22 0E:9A12: 00        .byte $00   ; 
- D 0 - I - 0x039A23 0E:9A13: 00        .byte $00   ; 
- D 0 - I - 0x039A24 0E:9A14: 29        .byte $29   ; 
- - - - - - 0x039A25 0E:9A15: 00        .byte $00   ; 
- D 0 - I - 0x039A26 0E:9A16: 96        .byte $96   ; 
- D 0 - I - 0x039A27 0E:9A17: 0B        .byte $0B   ; 
- D 0 - I - 0x039A28 0E:9A18: 08        .byte $08   ; 
- D 0 - I - 0x039A29 0E:9A19: 00        .byte $00   ; 
- D 0 - I - 0x039A2A 0E:9A1A: 01        .byte $01   ; 
- D 0 - I - 0x039A2B 0E:9A1B: 06        .byte $06   ; 
- D 0 - I - 0x039A2C 0E:9A1C: 00        .byte $00   ; 
- D 0 - I - 0x039A2D 0E:9A1D: 02        .byte $02   ; 
- D 0 - I - 0x039A2E 0E:9A1E: 02        .byte $02   ; 
- D 0 - I - 0x039A2F 0E:9A1F: 02        .byte $02   ; 
- D 0 - I - 0x039A30 0E:9A20: 29        .byte $29   ; 
- - - - - - 0x039A31 0E:9A21: 00        .byte $00   ; 
- D 0 - I - 0x039A32 0E:9A22: 97        .byte $97   ; 
- D 0 - I - 0x039A33 0E:9A23: 0B        .byte $0B   ; 
- D 0 - I - 0x039A34 0E:9A24: 20        .byte $20   ; 
- D 0 - I - 0x039A35 0E:9A25: 00        .byte $00   ; 
- D 0 - I - 0x039A36 0E:9A26: 12        .byte $12   ; 
- - - - - - 0x039A37 0E:9A27: 07        .byte $07   ; 
- D 0 - I - 0x039A38 0E:9A28: 00        .byte $00   ; 
- D 0 - I - 0x039A39 0E:9A29: 00        .byte $00   ; 
- - - - - - 0x039A3A 0E:9A2A: 00        .byte $00   ; 
- D 0 - I - 0x039A3B 0E:9A2B: 00        .byte $00   ; 
- D 0 - I - 0x039A3C 0E:9A2C: 29        .byte $29   ; 
- - - - - - 0x039A3D 0E:9A2D: 00        .byte $00   ; 
- D 0 - I - 0x039A3E 0E:9A2E: 24        .byte $24   ; 
- D 0 - I - 0x039A3F 0E:9A2F: 00        .byte $00   ; 
- - - - - - 0x039A40 0E:9A30: 00        .byte $00   ; 
- - - - - - 0x039A41 0E:9A31: 00        .byte $00   ; 
- D 0 - I - 0x039A42 0E:9A32: 05        .byte $05   ; 
- D 0 - I - 0x039A43 0E:9A33: 00        .byte $00   ; 
- D 0 - I - 0x039A44 0E:9A34: 00        .byte $00   ; 
- - - - - - 0x039A45 0E:9A35: 00        .byte $00   ; 
- - - - - - 0x039A46 0E:9A36: 00        .byte $00   ; 
- - - - - - 0x039A47 0E:9A37: 00        .byte $00   ; 
- - - - - - 0x039A48 0E:9A38: 00        .byte $00   ; 
- - - - - - 0x039A49 0E:9A39: 00        .byte $00   ; 
- D 0 - I - 0x039A4A 0E:9A3A: 98        .byte $98   ; 
- D 0 - I - 0x039A4B 0E:9A3B: 1B        .byte $1B   ; 
- D 0 - I - 0x039A4C 0E:9A3C: 00        .byte $00   ; 
- D 0 - I - 0x039A4D 0E:9A3D: 00        .byte $00   ; 
- D 0 - I - 0x039A4E 0E:9A3E: 1C        .byte $1C   ; 
- D 0 - I - 0x039A4F 0E:9A3F: 08        .byte $08   ; 
- - - - - - 0x039A50 0E:9A40: 00        .byte $00   ; 
- D 0 - I - 0x039A51 0E:9A41: 00        .byte $00   ; 
- - - - - - 0x039A52 0E:9A42: 00        .byte $00   ; 
- - - - - - 0x039A53 0E:9A43: 00        .byte $00   ; 
- D 0 - I - 0x039A54 0E:9A44: 2F        .byte $2F   ; 
- - - - - - 0x039A55 0E:9A45: 00        .byte $00   ; 
- D 0 - I - 0x039A56 0E:9A46: 04        .byte $04   ; 
- D 0 - I - 0x039A57 0E:9A47: 00        .byte $00   ; 
- - - - - - 0x039A58 0E:9A48: 00        .byte $00   ; 
- - - - - - 0x039A59 0E:9A49: 00        .byte $00   ; 
- D 0 - I - 0x039A5A 0E:9A4A: 00        .byte $00   ; 
- D 0 - I - 0x039A5B 0E:9A4B: 04        .byte $04   ; 
- D 0 - I - 0x039A5C 0E:9A4C: 00        .byte $00   ; 
- - - - - - 0x039A5D 0E:9A4D: 00        .byte $00   ; 
- - - - - - 0x039A5E 0E:9A4E: 00        .byte $00   ; 
- - - - - - 0x039A5F 0E:9A4F: 00        .byte $00   ; 
- - - - - - 0x039A60 0E:9A50: 00        .byte $00   ; 
- - - - - - 0x039A61 0E:9A51: 00        .byte $00   ; 
- D 0 - I - 0x039A62 0E:9A52: 18        .byte $18   ; 
- D 0 - I - 0x039A63 0E:9A53: 00        .byte $00   ; 
- D 0 - I - 0x039A64 0E:9A54: 10        .byte $10   ; 
- D 0 - I - 0x039A65 0E:9A55: 03        .byte $03   ; 
- D 0 - I - 0x039A66 0E:9A56: 00        .byte $00   ; 
- D 0 - I - 0x039A67 0E:9A57: 00        .byte $00   ; 
- D 0 - I - 0x039A68 0E:9A58: 00        .byte $00   ; 
- D 0 - I - 0x039A69 0E:9A59: 00        .byte $00   ; 
- D 0 - I - 0x039A6A 0E:9A5A: 00        .byte $00   ; 
- D 0 - I - 0x039A6B 0E:9A5B: 00        .byte $00   ; 
- D 0 - I - 0x039A6C 0E:9A5C: 00        .byte $00   ; 
- - - - - - 0x039A6D 0E:9A5D: 00        .byte $00   ; 
- D 0 - I - 0x039A6E 0E:9A5E: 19        .byte $19   ; 
- D 0 - I - 0x039A6F 0E:9A5F: 00        .byte $00   ; 
- D 0 - I - 0x039A70 0E:9A60: 00        .byte $00   ; 
- D 0 - I - 0x039A71 0E:9A61: 00        .byte $00   ; 
- D 0 - I - 0x039A72 0E:9A62: 00        .byte $00   ; 
- D 0 - I - 0x039A73 0E:9A63: 00        .byte $00   ; 
- - - - - - 0x039A74 0E:9A64: 00        .byte $00   ; 
- D 0 - I - 0x039A75 0E:9A65: 00        .byte $00   ; 
- D 0 - I - 0x039A76 0E:9A66: 00        .byte $00   ; 
- - - - - - 0x039A77 0E:9A67: 00        .byte $00   ; 
- D 0 - I - 0x039A78 0E:9A68: 01        .byte $01   ; 
- - - - - - 0x039A79 0E:9A69: 00        .byte $00   ; 
- D 0 - I - 0x039A7A 0E:9A6A: 05        .byte $05   ; 
- D 0 - I - 0x039A7B 0E:9A6B: 00        .byte $00   ; 
- - - - - - 0x039A7C 0E:9A6C: 00        .byte $00   ; 
- - - - - - 0x039A7D 0E:9A6D: 00        .byte $00   ; 
- D 0 - I - 0x039A7E 0E:9A6E: 01        .byte $01   ; 
- D 0 - I - 0x039A7F 0E:9A6F: 01        .byte $01   ; 
- D 0 - I - 0x039A80 0E:9A70: 00        .byte $00   ; 
- - - - - - 0x039A81 0E:9A71: 00        .byte $00   ; 
- - - - - - 0x039A82 0E:9A72: 00        .byte $00   ; 
- - - - - - 0x039A83 0E:9A73: 00        .byte $00   ; 
- - - - - - 0x039A84 0E:9A74: 00        .byte $00   ; 
- - - - - - 0x039A85 0E:9A75: 00        .byte $00   ; 
- D 0 - I - 0x039A86 0E:9A76: 1A        .byte $1A   ; 
- D 0 - I - 0x039A87 0E:9A77: 00        .byte $00   ; 
- D 0 - I - 0x039A88 0E:9A78: 14        .byte $14   ; 
- D 0 - I - 0x039A89 0E:9A79: 02        .byte $02   ; 
- D 0 - I - 0x039A8A 0E:9A7A: 01        .byte $01   ; 
- D 0 - I - 0x039A8B 0E:9A7B: 00        .byte $00   ; 
- D 0 - I - 0x039A8C 0E:9A7C: 03        .byte $03   ; 
- D 0 - I - 0x039A8D 0E:9A7D: 00        .byte $00   ; 
- D 0 - I - 0x039A8E 0E:9A7E: 00        .byte $00   ; 
- D 0 - I - 0x039A8F 0E:9A7F: 01        .byte $01   ; 
- D 0 - I - 0x039A90 0E:9A80: 02        .byte $02   ; 
- - - - - - 0x039A91 0E:9A81: 00        .byte $00   ; 
- D 0 - I - 0x039A92 0E:9A82: 1B        .byte $1B   ; 
- D 0 - I - 0x039A93 0E:9A83: 00        .byte $00   ; 
- D 0 - I - 0x039A94 0E:9A84: 00        .byte $00   ; 
- D 0 - I - 0x039A95 0E:9A85: 00        .byte $00   ; 
- D 0 - I - 0x039A96 0E:9A86: 01        .byte $01   ; 
- D 0 - I - 0x039A97 0E:9A87: 01        .byte $01   ; 
- D 0 - I - 0x039A98 0E:9A88: 00        .byte $00   ; 
- D 0 - I - 0x039A99 0E:9A89: 00        .byte $00   ; 
- - - - - - 0x039A9A 0E:9A8A: 00        .byte $00   ; 
- D 0 - I - 0x039A9B 0E:9A8B: 00        .byte $00   ; 
- D 0 - I - 0x039A9C 0E:9A8C: 1E        .byte $1E   ; 
- - - - - - 0x039A9D 0E:9A8D: 00        .byte $00   ; 
- D 0 - I - 0x039A9E 0E:9A8E: 1E        .byte $1E   ; 
- D 0 - I - 0x039A9F 0E:9A8F: 00        .byte $00   ; 
- D 0 - I - 0x039AA0 0E:9A90: 18        .byte $18   ; 
- D 0 - I - 0x039AA1 0E:9A91: 02        .byte $02   ; 
- D 0 - I - 0x039AA2 0E:9A92: 00        .byte $00   ; 
- - - - - - 0x039AA3 0E:9A93: 00        .byte $00   ; 
- D 0 - I - 0x039AA4 0E:9A94: 00        .byte $00   ; 
- D 0 - I - 0x039AA5 0E:9A95: 00        .byte $00   ; 
- - - - - - 0x039AA6 0E:9A96: 00        .byte $00   ; 
- D 0 - I - 0x039AA7 0E:9A97: 00        .byte $00   ; 
- D 0 - I - 0x039AA8 0E:9A98: 00        .byte $00   ; 
- - - - - - 0x039AA9 0E:9A99: 00        .byte $00   ; 
- D 0 - I - 0x039AAA 0E:9A9A: 1F        .byte $1F   ; 
- D 0 - I - 0x039AAB 0E:9A9B: 00        .byte $00   ; 
- D 0 - I - 0x039AAC 0E:9A9C: 00        .byte $00   ; 
- D 0 - I - 0x039AAD 0E:9A9D: 00        .byte $00   ; 
- D 0 - I - 0x039AAE 0E:9A9E: 00        .byte $00   ; 
- D 0 - I - 0x039AAF 0E:9A9F: 00        .byte $00   ; 
- D 0 - I - 0x039AB0 0E:9AA0: 00        .byte $00   ; 
- D 0 - I - 0x039AB1 0E:9AA1: 00        .byte $00   ; 
- D 0 - I - 0x039AB2 0E:9AA2: 00        .byte $00   ; 
- D 0 - I - 0x039AB3 0E:9AA3: 00        .byte $00   ; 
- D 0 - I - 0x039AB4 0E:9AA4: 01        .byte $01   ; 
- - - - - - 0x039AB5 0E:9AA5: 00        .byte $00   ; 
- D 0 - I - 0x039AB6 0E:9AA6: 07        .byte $07   ; 
- D 0 - I - 0x039AB7 0E:9AA7: 00        .byte $00   ; 
- - - - - - 0x039AB8 0E:9AA8: 00        .byte $00   ; 
- - - - - - 0x039AB9 0E:9AA9: 00        .byte $00   ; 
- D 0 - I - 0x039ABA 0E:9AAA: 00        .byte $00   ; 
- D 0 - I - 0x039ABB 0E:9AAB: 01        .byte $01   ; 
- D 0 - I - 0x039ABC 0E:9AAC: 00        .byte $00   ; 
- - - - - - 0x039ABD 0E:9AAD: 00        .byte $00   ; 
- - - - - - 0x039ABE 0E:9AAE: 00        .byte $00   ; 
- - - - - - 0x039ABF 0E:9AAF: 00        .byte $00   ; 
- - - - - - 0x039AC0 0E:9AB0: 00        .byte $00   ; 
- - - - - - 0x039AC1 0E:9AB1: 00        .byte $00   ; 
- D 0 - I - 0x039AC2 0E:9AB2: 21        .byte $21   ; 
- D 0 - I - 0x039AC3 0E:9AB3: 00        .byte $00   ; 
- D 0 - I - 0x039AC4 0E:9AB4: 20        .byte $20   ; 
- D 0 - I - 0x039AC5 0E:9AB5: 03        .byte $03   ; 
- D 0 - I - 0x039AC6 0E:9AB6: 01        .byte $01   ; 
- D 0 - I - 0x039AC7 0E:9AB7: 00        .byte $00   ; 
- D 0 - I - 0x039AC8 0E:9AB8: 03        .byte $03   ; 
- D 0 - I - 0x039AC9 0E:9AB9: 00        .byte $00   ; 
- D 0 - I - 0x039ACA 0E:9ABA: 00        .byte $00   ; 
- D 0 - I - 0x039ACB 0E:9ABB: 01        .byte $01   ; 
- D 0 - I - 0x039ACC 0E:9ABC: 00        .byte $00   ; 
- - - - - - 0x039ACD 0E:9ABD: 00        .byte $00   ; 
- D 0 - I - 0x039ACE 0E:9ABE: 22        .byte $22   ; 
- D 0 - I - 0x039ACF 0E:9ABF: 00        .byte $00   ; 
- D 0 - I - 0x039AD0 0E:9AC0: 00        .byte $00   ; 
- D 0 - I - 0x039AD1 0E:9AC1: 00        .byte $00   ; 
- D 0 - I - 0x039AD2 0E:9AC2: 00        .byte $00   ; 
- D 0 - I - 0x039AD3 0E:9AC3: 01        .byte $01   ; 
- D 0 - I - 0x039AD4 0E:9AC4: 00        .byte $00   ; 
- D 0 - I - 0x039AD5 0E:9AC5: 00        .byte $00   ; 
- D 0 - I - 0x039AD6 0E:9AC6: 00        .byte $00   ; 
- D 0 - I - 0x039AD7 0E:9AC7: 00        .byte $00   ; 
- D 0 - I - 0x039AD8 0E:9AC8: 03        .byte $03   ; 
- - - - - - 0x039AD9 0E:9AC9: 00        .byte $00   ; 
- D 0 - I - 0x039ADA 0E:9ACA: 08        .byte $08   ; 
- D 0 - I - 0x039ADB 0E:9ACB: 00        .byte $00   ; 
- - - - - - 0x039ADC 0E:9ACC: 00        .byte $00   ; 
- - - - - - 0x039ADD 0E:9ACD: 00        .byte $00   ; 
- D 0 - I - 0x039ADE 0E:9ACE: 00        .byte $00   ; 
- D 0 - I - 0x039ADF 0E:9ACF: 00        .byte $00   ; 
- D 0 - I - 0x039AE0 0E:9AD0: 00        .byte $00   ; 
- - - - - - 0x039AE1 0E:9AD1: 00        .byte $00   ; 
- - - - - - 0x039AE2 0E:9AD2: 00        .byte $00   ; 
- - - - - - 0x039AE3 0E:9AD3: 00        .byte $00   ; 
- - - - - - 0x039AE4 0E:9AD4: 00        .byte $00   ; 
- - - - - - 0x039AE5 0E:9AD5: 00        .byte $00   ; 
- D 0 - I - 0x039AE6 0E:9AD6: 25        .byte $25   ; 
- D 0 - I - 0x039AE7 0E:9AD7: 00        .byte $00   ; 
- D 0 - I - 0x039AE8 0E:9AD8: 00        .byte $00   ; 
- D 0 - I - 0x039AE9 0E:9AD9: 00        .byte $00   ; 
- D 0 - I - 0x039AEA 0E:9ADA: 01        .byte $01   ; 
- D 0 - I - 0x039AEB 0E:9ADB: 00        .byte $00   ; 
- D 0 - I - 0x039AEC 0E:9ADC: 00        .byte $00   ; 
- D 0 - I - 0x039AED 0E:9ADD: 00        .byte $00   ; 
- D 0 - I - 0x039AEE 0E:9ADE: 00        .byte $00   ; 
- D 0 - I - 0x039AEF 0E:9ADF: 00        .byte $00   ; 
- D 0 - I - 0x039AF0 0E:9AE0: 05        .byte $05   ; 
- - - - - - 0x039AF1 0E:9AE1: 00        .byte $00   ; 
- D 0 - I - 0x039AF2 0E:9AE2: 26        .byte $26   ; 
- D 0 - I - 0x039AF3 0E:9AE3: 00        .byte $00   ; 
- D 0 - I - 0x039AF4 0E:9AE4: 00        .byte $00   ; 
- D 0 - I - 0x039AF5 0E:9AE5: 00        .byte $00   ; 
- D 0 - I - 0x039AF6 0E:9AE6: 01        .byte $01   ; 
- D 0 - I - 0x039AF7 0E:9AE7: 01        .byte $01   ; 
- D 0 - I - 0x039AF8 0E:9AE8: 00        .byte $00   ; 
- D 0 - I - 0x039AF9 0E:9AE9: 00        .byte $00   ; 
- D 0 - I - 0x039AFA 0E:9AEA: 00        .byte $00   ; 
- D 0 - I - 0x039AFB 0E:9AEB: 00        .byte $00   ; 
- D 0 - I - 0x039AFC 0E:9AEC: 04        .byte $04   ; 
- - - - - - 0x039AFD 0E:9AED: 00        .byte $00   ; 
- D 0 - I - 0x039AFE 0E:9AEE: 09        .byte $09   ; 
- D 0 - I - 0x039AFF 0E:9AEF: 00        .byte $00   ; 
- - - - - - 0x039B00 0E:9AF0: 00        .byte $00   ; 
- - - - - - 0x039B01 0E:9AF1: 00        .byte $00   ; 
- D 0 - I - 0x039B02 0E:9AF2: 00        .byte $00   ; 
- D 0 - I - 0x039B03 0E:9AF3: 00        .byte $00   ; 
- D 0 - I - 0x039B04 0E:9AF4: 00        .byte $00   ; 
- - - - - - 0x039B05 0E:9AF5: 00        .byte $00   ; 
- - - - - - 0x039B06 0E:9AF6: 00        .byte $00   ; 
- - - - - - 0x039B07 0E:9AF7: 00        .byte $00   ; 
- - - - - - 0x039B08 0E:9AF8: 00        .byte $00   ; 
- - - - - - 0x039B09 0E:9AF9: 00        .byte $00   ; 
- D 0 - I - 0x039B0A 0E:9AFA: 29        .byte $29   ; 
- D 0 - I - 0x039B0B 0E:9AFB: 00        .byte $00   ; 
- D 0 - I - 0x039B0C 0E:9AFC: 00        .byte $00   ; 
- D 0 - I - 0x039B0D 0E:9AFD: 00        .byte $00   ; 
- D 0 - I - 0x039B0E 0E:9AFE: 01        .byte $01   ; 
- - - - - - 0x039B0F 0E:9AFF: 01        .byte $01   ; 
- D 0 - I - 0x039B10 0E:9B00: 00        .byte $00   ; 
- D 0 - I - 0x039B11 0E:9B01: 00        .byte $00   ; 
- - - - - - 0x039B12 0E:9B02: 00        .byte $00   ; 
- D 0 - I - 0x039B13 0E:9B03: 00        .byte $00   ; 
- D 0 - I - 0x039B14 0E:9B04: 06        .byte $06   ; 
- - - - - - 0x039B15 0E:9B05: 00        .byte $00   ; 
- D 0 - I - 0x039B16 0E:9B06: 2A        .byte $2A   ; 
- D 0 - I - 0x039B17 0E:9B07: 00        .byte $00   ; 
- D 0 - I - 0x039B18 0E:9B08: 00        .byte $00   ; 
- D 0 - I - 0x039B19 0E:9B09: 00        .byte $00   ; 
- D 0 - I - 0x039B1A 0E:9B0A: 01        .byte $01   ; 
- D 0 - I - 0x039B1B 0E:9B0B: 00        .byte $00   ; 
- D 0 - I - 0x039B1C 0E:9B0C: 00        .byte $00   ; 
- D 0 - I - 0x039B1D 0E:9B0D: 00        .byte $00   ; 
- D 0 - I - 0x039B1E 0E:9B0E: 00        .byte $00   ; 
- D 0 - I - 0x039B1F 0E:9B0F: 01        .byte $01   ; 
- D 0 - I - 0x039B20 0E:9B10: 07        .byte $07   ; 
- - - - - - 0x039B21 0E:9B11: 00        .byte $00   ; 
- D 0 - I - 0x039B22 0E:9B12: 0A        .byte $0A   ; 
- D 0 - I - 0x039B23 0E:9B13: 00        .byte $00   ; 
- - - - - - 0x039B24 0E:9B14: 00        .byte $00   ; 
- - - - - - 0x039B25 0E:9B15: 00        .byte $00   ; 
- D 0 - I - 0x039B26 0E:9B16: 00        .byte $00   ; 
- D 0 - I - 0x039B27 0E:9B17: 00        .byte $00   ; 
- D 0 - I - 0x039B28 0E:9B18: 00        .byte $00   ; 
- - - - - - 0x039B29 0E:9B19: 00        .byte $00   ; 
- - - - - - 0x039B2A 0E:9B1A: 00        .byte $00   ; 
- - - - - - 0x039B2B 0E:9B1B: 00        .byte $00   ; 
- - - - - - 0x039B2C 0E:9B1C: 00        .byte $00   ; 
- - - - - - 0x039B2D 0E:9B1D: 00        .byte $00   ; 
- D 0 - I - 0x039B2E 0E:9B1E: 2E        .byte $2E   ; 
- D 0 - I - 0x039B2F 0E:9B1F: 00        .byte $00   ; 
- D 0 - I - 0x039B30 0E:9B20: 00        .byte $00   ; 
- D 0 - I - 0x039B31 0E:9B21: 00        .byte $00   ; 
- D 0 - I - 0x039B32 0E:9B22: 01        .byte $01   ; 
- D 0 - I - 0x039B33 0E:9B23: 00        .byte $00   ; 
- D 0 - I - 0x039B34 0E:9B24: 00        .byte $00   ; 
- D 0 - I - 0x039B35 0E:9B25: 00        .byte $00   ; 
- D 0 - I - 0x039B36 0E:9B26: 00        .byte $00   ; 
- D 0 - I - 0x039B37 0E:9B27: 00        .byte $00   ; 
- D 0 - I - 0x039B38 0E:9B28: 08        .byte $08   ; 
- - - - - - 0x039B39 0E:9B29: 00        .byte $00   ; 
- D 0 - I - 0x039B3A 0E:9B2A: 2F        .byte $2F   ; 
- D 0 - I - 0x039B3B 0E:9B2B: 00        .byte $00   ; 
- D 0 - I - 0x039B3C 0E:9B2C: 00        .byte $00   ; 
- D 0 - I - 0x039B3D 0E:9B2D: 00        .byte $00   ; 
- D 0 - I - 0x039B3E 0E:9B2E: 01        .byte $01   ; 
- D 0 - I - 0x039B3F 0E:9B2F: 00        .byte $00   ; 
- D 0 - I - 0x039B40 0E:9B30: 00        .byte $00   ; 
- D 0 - I - 0x039B41 0E:9B31: 00        .byte $00   ; 
- D 0 - I - 0x039B42 0E:9B32: 00        .byte $00   ; 
- D 0 - I - 0x039B43 0E:9B33: 00        .byte $00   ; 
- D 0 - I - 0x039B44 0E:9B34: 08        .byte $08   ; 
- - - - - - 0x039B45 0E:9B35: 00        .byte $00   ; 
- D 0 - I - 0x039B46 0E:9B36: 0B        .byte $0B   ; 
- D 0 - I - 0x039B47 0E:9B37: 00        .byte $00   ; 
- - - - - - 0x039B48 0E:9B38: 00        .byte $00   ; 
- - - - - - 0x039B49 0E:9B39: 00        .byte $00   ; 
- D 0 - I - 0x039B4A 0E:9B3A: 00        .byte $00   ; 
- D 0 - I - 0x039B4B 0E:9B3B: 00        .byte $00   ; 
- D 0 - I - 0x039B4C 0E:9B3C: 00        .byte $00   ; 
- - - - - - 0x039B4D 0E:9B3D: 00        .byte $00   ; 
- - - - - - 0x039B4E 0E:9B3E: 00        .byte $00   ; 
- - - - - - 0x039B4F 0E:9B3F: 00        .byte $00   ; 
- - - - - - 0x039B50 0E:9B40: 03        .byte $03   ; 
- - - - - - 0x039B51 0E:9B41: 00        .byte $00   ; 
- D 0 - I - 0x039B52 0E:9B42: 32        .byte $32   ; <2>
- D 0 - I - 0x039B53 0E:9B43: 00        .byte $00   ; 
- D 0 - I - 0x039B54 0E:9B44: 00        .byte $00   ; 
- D 0 - I - 0x039B55 0E:9B45: 00        .byte $00   ; 
- D 0 - I - 0x039B56 0E:9B46: 01        .byte $01   ; 
- D 0 - I - 0x039B57 0E:9B47: 00        .byte $00   ; 
- D 0 - I - 0x039B58 0E:9B48: 00        .byte $00   ; 
- D 0 - I - 0x039B59 0E:9B49: 00        .byte $00   ; 
- - - - - - 0x039B5A 0E:9B4A: 00        .byte $00   ; 
- D 0 - I - 0x039B5B 0E:9B4B: 00        .byte $00   ; 
- D 0 - I - 0x039B5C 0E:9B4C: 00        .byte $00   ; 
- - - - - - 0x039B5D 0E:9B4D: 00        .byte $00   ; 
- D 0 - I - 0x039B5E 0E:9B4E: 33        .byte $33   ; <3>
- D 0 - I - 0x039B5F 0E:9B4F: 00        .byte $00   ; 
- D 0 - I - 0x039B60 0E:9B50: 00        .byte $00   ; 
- D 0 - I - 0x039B61 0E:9B51: 00        .byte $00   ; 
- D 0 - I - 0x039B62 0E:9B52: 01        .byte $01   ; 
- D 0 - I - 0x039B63 0E:9B53: 00        .byte $00   ; 
- D 0 - I - 0x039B64 0E:9B54: 00        .byte $00   ; 
- D 0 - I - 0x039B65 0E:9B55: 00        .byte $00   ; 
- D 0 - I - 0x039B66 0E:9B56: 00        .byte $00   ; 
- D 0 - I - 0x039B67 0E:9B57: 00        .byte $00   ; 
- D 0 - I - 0x039B68 0E:9B58: 03        .byte $03   ; 
- - - - - - 0x039B69 0E:9B59: 00        .byte $00   ; 
- D 0 - I - 0x039B6A 0E:9B5A: 35        .byte $35   ; <5>
- D 0 - I - 0x039B6B 0E:9B5B: 00        .byte $00   ; 
- D 0 - I - 0x039B6C 0E:9B5C: 00        .byte $00   ; 
- D 0 - I - 0x039B6D 0E:9B5D: 00        .byte $00   ; 
- D 0 - I - 0x039B6E 0E:9B5E: 01        .byte $01   ; 
- D 0 - I - 0x039B6F 0E:9B5F: 00        .byte $00   ; 
- D 0 - I - 0x039B70 0E:9B60: 00        .byte $00   ; 
- D 0 - I - 0x039B71 0E:9B61: 00        .byte $00   ; 
- D 0 - I - 0x039B72 0E:9B62: 00        .byte $00   ; 
- D 0 - I - 0x039B73 0E:9B63: 00        .byte $00   ; 
- D 0 - I - 0x039B74 0E:9B64: 08        .byte $08   ; 
- - - - - - 0x039B75 0E:9B65: 00        .byte $00   ; 
- D 0 - I - 0x039B76 0E:9B66: 36        .byte $36   ; <6>
- D 0 - I - 0x039B77 0E:9B67: 00        .byte $00   ; 
- D 0 - I - 0x039B78 0E:9B68: 00        .byte $00   ; 
- D 0 - I - 0x039B79 0E:9B69: 00        .byte $00   ; 
- D 0 - I - 0x039B7A 0E:9B6A: 01        .byte $01   ; 
- D 0 - I - 0x039B7B 0E:9B6B: 00        .byte $00   ; 
- D 0 - I - 0x039B7C 0E:9B6C: 00        .byte $00   ; 
- D 0 - I - 0x039B7D 0E:9B6D: 00        .byte $00   ; 
- D 0 - I - 0x039B7E 0E:9B6E: 00        .byte $00   ; 
- D 0 - I - 0x039B7F 0E:9B6F: 00        .byte $00   ; 
- D 0 - I - 0x039B80 0E:9B70: 13        .byte $13   ; 
- - - - - - 0x039B81 0E:9B71: 00        .byte $00   ; 
- D 0 - I - 0x039B82 0E:9B72: 0D        .byte $0D   ; 
- D 0 - I - 0x039B83 0E:9B73: 00        .byte $00   ; 
- - - - - - 0x039B84 0E:9B74: 00        .byte $00   ; 
- - - - - - 0x039B85 0E:9B75: 00        .byte $00   ; 
- D 0 - I - 0x039B86 0E:9B76: 00        .byte $00   ; 
- D 0 - I - 0x039B87 0E:9B77: 00        .byte $00   ; 
- D 0 - I - 0x039B88 0E:9B78: 00        .byte $00   ; 
- - - - - - 0x039B89 0E:9B79: 00        .byte $00   ; 
- - - - - - 0x039B8A 0E:9B7A: 00        .byte $00   ; 
- - - - - - 0x039B8B 0E:9B7B: 00        .byte $00   ; 
- - - - - - 0x039B8C 0E:9B7C: 00        .byte $00   ; 
- - - - - - 0x039B8D 0E:9B7D: 00        .byte $00   ; 
- D 0 - I - 0x039B8E 0E:9B7E: 38        .byte $38   ; <8>
- D 0 - I - 0x039B8F 0E:9B7F: 00        .byte $00   ; 
- D 0 - I - 0x039B90 0E:9B80: 00        .byte $00   ; 
- D 0 - I - 0x039B91 0E:9B81: 00        .byte $00   ; 
- D 0 - I - 0x039B92 0E:9B82: 00        .byte $00   ; 
- D 0 - I - 0x039B93 0E:9B83: 00        .byte $00   ; 
- D 0 - I - 0x039B94 0E:9B84: 00        .byte $00   ; 
- D 0 - I - 0x039B95 0E:9B85: 00        .byte $00   ; 
- D 0 - I - 0x039B96 0E:9B86: 00        .byte $00   ; 
- D 0 - I - 0x039B97 0E:9B87: 00        .byte $00   ; 
- D 0 - I - 0x039B98 0E:9B88: 09        .byte $09   ; 
- - - - - - 0x039B99 0E:9B89: 00        .byte $00   ; 
- D 0 - I - 0x039B9A 0E:9B8A: 39        .byte $39   ; <9>
- D 0 - I - 0x039B9B 0E:9B8B: 00        .byte $00   ; 
- D 0 - I - 0x039B9C 0E:9B8C: 00        .byte $00   ; 
- D 0 - I - 0x039B9D 0E:9B8D: 00        .byte $00   ; 
- D 0 - I - 0x039B9E 0E:9B8E: 00        .byte $00   ; 
- D 0 - I - 0x039B9F 0E:9B8F: 00        .byte $00   ; 
- D 0 - I - 0x039BA0 0E:9B90: 00        .byte $00   ; 
- D 0 - I - 0x039BA1 0E:9B91: 00        .byte $00   ; 
- D 0 - I - 0x039BA2 0E:9B92: 00        .byte $00   ; 
- D 0 - I - 0x039BA3 0E:9B93: 00        .byte $00   ; 
- D 0 - I - 0x039BA4 0E:9B94: 0A        .byte $0A   ; 
- - - - - - 0x039BA5 0E:9B95: 00        .byte $00   ; 
- D 0 - I - 0x039BA6 0E:9B96: 0E        .byte $0E   ; 
- D 0 - I - 0x039BA7 0E:9B97: 00        .byte $00   ; 
- - - - - - 0x039BA8 0E:9B98: 00        .byte $00   ; 
- - - - - - 0x039BA9 0E:9B99: 00        .byte $00   ; 
- D 0 - I - 0x039BAA 0E:9B9A: 00        .byte $00   ; 
- D 0 - I - 0x039BAB 0E:9B9B: 00        .byte $00   ; 
- D 0 - I - 0x039BAC 0E:9B9C: 00        .byte $00   ; 
- - - - - - 0x039BAD 0E:9B9D: 00        .byte $00   ; 
- - - - - - 0x039BAE 0E:9B9E: 00        .byte $00   ; 
- - - - - - 0x039BAF 0E:9B9F: 00        .byte $00   ; 
- - - - - - 0x039BB0 0E:9BA0: 00        .byte $00   ; 
- - - - - - 0x039BB1 0E:9BA1: 00        .byte $00   ; 
- D 0 - I - 0x039BB2 0E:9BA2: 3B        .byte $3B   ; 
- D 0 - I - 0x039BB3 0E:9BA3: 00        .byte $00   ; 
- D 0 - I - 0x039BB4 0E:9BA4: 00        .byte $00   ; 
- D 0 - I - 0x039BB5 0E:9BA5: 00        .byte $00   ; 
- D 0 - I - 0x039BB6 0E:9BA6: 01        .byte $01   ; 
- D 0 - I - 0x039BB7 0E:9BA7: 03        .byte $03   ; 
- D 0 - I - 0x039BB8 0E:9BA8: 00        .byte $00   ; 
- D 0 - I - 0x039BB9 0E:9BA9: 00        .byte $00   ; 
- - - - - - 0x039BBA 0E:9BAA: 00        .byte $00   ; 
- D 0 - I - 0x039BBB 0E:9BAB: 00        .byte $00   ; 
- D 0 - I - 0x039BBC 0E:9BAC: 0B        .byte $0B   ; 
- - - - - - 0x039BBD 0E:9BAD: 00        .byte $00   ; 
- D 0 - I - 0x039BBE 0E:9BAE: 3C        .byte $3C   ; 
- D 0 - I - 0x039BBF 0E:9BAF: 00        .byte $00   ; 
- D 0 - I - 0x039BC0 0E:9BB0: 00        .byte $00   ; 
- D 0 - I - 0x039BC1 0E:9BB1: 00        .byte $00   ; 
- D 0 - I - 0x039BC2 0E:9BB2: 01        .byte $01   ; 
- D 0 - I - 0x039BC3 0E:9BB3: 05        .byte $05   ; 
- D 0 - I - 0x039BC4 0E:9BB4: 00        .byte $00   ; 
- D 0 - I - 0x039BC5 0E:9BB5: 00        .byte $00   ; 
- D 0 - I - 0x039BC6 0E:9BB6: 00        .byte $00   ; 
- D 0 - I - 0x039BC7 0E:9BB7: 00        .byte $00   ; 
- D 0 - I - 0x039BC8 0E:9BB8: 0D        .byte $0D   ; 
- - - - - - 0x039BC9 0E:9BB9: 00        .byte $00   ; 
- D 0 - I - 0x039BCA 0E:9BBA: 3E        .byte $3E   ; 
- D 0 - I - 0x039BCB 0E:9BBB: 00        .byte $00   ; 
- D 0 - I - 0x039BCC 0E:9BBC: 00        .byte $00   ; 
- D 0 - I - 0x039BCD 0E:9BBD: 00        .byte $00   ; 
- D 0 - I - 0x039BCE 0E:9BBE: 01        .byte $01   ; 
- D 0 - I - 0x039BCF 0E:9BBF: 00        .byte $00   ; 
- D 0 - I - 0x039BD0 0E:9BC0: 00        .byte $00   ; 
- D 0 - I - 0x039BD1 0E:9BC1: 00        .byte $00   ; 
- - - - - - 0x039BD2 0E:9BC2: 00        .byte $00   ; 
- D 0 - I - 0x039BD3 0E:9BC3: 00        .byte $00   ; 
- D 0 - I - 0x039BD4 0E:9BC4: 0E        .byte $0E   ; 
- - - - - - 0x039BD5 0E:9BC5: 00        .byte $00   ; 
- D 0 - I - 0x039BD6 0E:9BC6: 3F        .byte $3F   ; 
- D 0 - I - 0x039BD7 0E:9BC7: 00        .byte $00   ; 
- D 0 - I - 0x039BD8 0E:9BC8: 00        .byte $00   ; 
- D 0 - I - 0x039BD9 0E:9BC9: 00        .byte $00   ; 
- D 0 - I - 0x039BDA 0E:9BCA: 01        .byte $01   ; 
- D 0 - I - 0x039BDB 0E:9BCB: 00        .byte $00   ; 
- D 0 - I - 0x039BDC 0E:9BCC: 00        .byte $00   ; 
- D 0 - I - 0x039BDD 0E:9BCD: 00        .byte $00   ; 
- D 0 - I - 0x039BDE 0E:9BCE: 00        .byte $00   ; 
- D 0 - I - 0x039BDF 0E:9BCF: 00        .byte $00   ; 
- D 0 - I - 0x039BE0 0E:9BD0: 0E        .byte $0E   ; 
- - - - - - 0x039BE1 0E:9BD1: 00        .byte $00   ; 
- D 0 - I - 0x039BE2 0E:9BD2: 10        .byte $10   ; 
- D 0 - I - 0x039BE3 0E:9BD3: 00        .byte $00   ; 
- - - - - - 0x039BE4 0E:9BD4: 00        .byte $00   ; 
- - - - - - 0x039BE5 0E:9BD5: 00        .byte $00   ; 
- D 0 - I - 0x039BE6 0E:9BD6: 00        .byte $00   ; 
- D 0 - I - 0x039BE7 0E:9BD7: 00        .byte $00   ; 
- D 0 - I - 0x039BE8 0E:9BD8: 00        .byte $00   ; 
- - - - - - 0x039BE9 0E:9BD9: 00        .byte $00   ; 
- - - - - - 0x039BEA 0E:9BDA: 00        .byte $00   ; 
- - - - - - 0x039BEB 0E:9BDB: 00        .byte $00   ; 
- - - - - - 0x039BEC 0E:9BDC: 00        .byte $00   ; 
- - - - - - 0x039BED 0E:9BDD: 00        .byte $00   ; 
- D 0 - I - 0x039BEE 0E:9BDE: 43        .byte $43   ; <C>
- D 0 - I - 0x039BEF 0E:9BDF: 0F        .byte $0F   ; 
- D 0 - I - 0x039BF0 0E:9BE0: D0        .byte $D0   ; 
- D 0 - I - 0x039BF1 0E:9BE1: 08        .byte $08   ; 
- D 0 - I - 0x039BF2 0E:9BE2: 05        .byte $05   ; 
- D 0 - I - 0x039BF3 0E:9BE3: 03        .byte $03   ; 
- D 0 - I - 0x039BF4 0E:9BE4: 00        .byte $00   ; 
- D 0 - I - 0x039BF5 0E:9BE5: 00        .byte $00   ; 
- D 0 - I - 0x039BF6 0E:9BE6: 00        .byte $00   ; 
- D 0 - I - 0x039BF7 0E:9BE7: 00        .byte $00   ; 
- D 0 - I - 0x039BF8 0E:9BE8: 1E        .byte $1E   ; 
- - - - - - 0x039BF9 0E:9BE9: 00        .byte $00   ; 
- D 0 - I - 0x039BFA 0E:9BEA: 44        .byte $44   ; <D>
- D 0 - I - 0x039BFB 0E:9BEB: 00        .byte $00   ; 
- D 0 - I - 0x039BFC 0E:9BEC: 00        .byte $00   ; 
- D 0 - I - 0x039BFD 0E:9BED: 00        .byte $00   ; 
- D 0 - I - 0x039BFE 0E:9BEE: 01        .byte $01   ; 
- D 0 - I - 0x039BFF 0E:9BEF: 00        .byte $00   ; 
- D 0 - I - 0x039C00 0E:9BF0: 00        .byte $00   ; 
- D 0 - I - 0x039C01 0E:9BF1: 00        .byte $00   ; 
- D 0 - I - 0x039C02 0E:9BF2: 00        .byte $00   ; 
- D 0 - I - 0x039C03 0E:9BF3: 00        .byte $00   ; 
- D 0 - I - 0x039C04 0E:9BF4: 10        .byte $10   ; 
- - - - - - 0x039C05 0E:9BF5: 00        .byte $00   ; 
- D 0 - I - 0x039C06 0E:9BF6: 11        .byte $11   ; 
- D 0 - I - 0x039C07 0E:9BF7: 00        .byte $00   ; 
- - - - - - 0x039C08 0E:9BF8: 00        .byte $00   ; 
- - - - - - 0x039C09 0E:9BF9: 00        .byte $00   ; 
- D 0 - I - 0x039C0A 0E:9BFA: 00        .byte $00   ; 
- D 0 - I - 0x039C0B 0E:9BFB: 00        .byte $00   ; 
- D 0 - I - 0x039C0C 0E:9BFC: 00        .byte $00   ; 
- - - - - - 0x039C0D 0E:9BFD: 00        .byte $00   ; 
- - - - - - 0x039C0E 0E:9BFE: 00        .byte $00   ; 
- - - - - - 0x039C0F 0E:9BFF: 00        .byte $00   ; 
- - - - - - 0x039C10 0E:9C00: 00        .byte $00   ; 
- - - - - - 0x039C11 0E:9C01: 00        .byte $00   ; 
- D 0 - I - 0x039C12 0E:9C02: 46        .byte $46   ; <F>
- D 0 - I - 0x039C13 0E:9C03: 0F        .byte $0F   ; 
- D 0 - I - 0x039C14 0E:9C04: 00        .byte $00   ; 
- D 0 - I - 0x039C15 0E:9C05: 00        .byte $00   ; 
- D 0 - I - 0x039C16 0E:9C06: 01        .byte $01   ; 
- - - - - - 0x039C17 0E:9C07: 00        .byte $00   ; 
- D 0 - I - 0x039C18 0E:9C08: 00        .byte $00   ; 
- D 0 - I - 0x039C19 0E:9C09: 00        .byte $00   ; 
- - - - - - 0x039C1A 0E:9C0A: 00        .byte $00   ; 
- D 0 - I - 0x039C1B 0E:9C0B: 00        .byte $00   ; 
- D 0 - I - 0x039C1C 0E:9C0C: 03        .byte $03   ; 
- - - - - - 0x039C1D 0E:9C0D: 00        .byte $00   ; 
- D 0 - I - 0x039C1E 0E:9C0E: 47        .byte $47   ; <G>
- D 0 - I - 0x039C1F 0E:9C0F: 00        .byte $00   ; 
- D 0 - I - 0x039C20 0E:9C10: 00        .byte $00   ; 
- D 0 - I - 0x039C21 0E:9C11: 00        .byte $00   ; 
- D 0 - I - 0x039C22 0E:9C12: 01        .byte $01   ; 
- D 0 - I - 0x039C23 0E:9C13: 00        .byte $00   ; 
- D 0 - I - 0x039C24 0E:9C14: 00        .byte $00   ; 
- D 0 - I - 0x039C25 0E:9C15: 00        .byte $00   ; 
- D 0 - I - 0x039C26 0E:9C16: 00        .byte $00   ; 
- D 0 - I - 0x039C27 0E:9C17: 00        .byte $00   ; 
- D 0 - I - 0x039C28 0E:9C18: 03        .byte $03   ; 
- - - - - - 0x039C29 0E:9C19: 00        .byte $00   ; 
- D 0 - I - 0x039C2A 0E:9C1A: 4A        .byte $4A   ; <J>
- D 0 - I - 0x039C2B 0E:9C1B: 00        .byte $00   ; 
- D 0 - I - 0x039C2C 0E:9C1C: 00        .byte $00   ; 
- D 0 - I - 0x039C2D 0E:9C1D: 00        .byte $00   ; 
- D 0 - I - 0x039C2E 0E:9C1E: 00        .byte $00   ; 
- D 0 - I - 0x039C2F 0E:9C1F: 00        .byte $00   ; 
- D 0 - I - 0x039C30 0E:9C20: 00        .byte $00   ; 
- D 0 - I - 0x039C31 0E:9C21: 00        .byte $00   ; 
- - - - - - 0x039C32 0E:9C22: 00        .byte $00   ; 
- D 0 - I - 0x039C33 0E:9C23: 00        .byte $00   ; 
- D 0 - I - 0x039C34 0E:9C24: 11        .byte $11   ; 
- - - - - - 0x039C35 0E:9C25: 00        .byte $00   ; 
- D 0 - I - 0x039C36 0E:9C26: 4B        .byte $4B   ; <K>
- D 0 - I - 0x039C37 0E:9C27: 00        .byte $00   ; 
- D 0 - I - 0x039C38 0E:9C28: 00        .byte $00   ; 
- D 0 - I - 0x039C39 0E:9C29: 00        .byte $00   ; 
- D 0 - I - 0x039C3A 0E:9C2A: 00        .byte $00   ; 
- D 0 - I - 0x039C3B 0E:9C2B: 00        .byte $00   ; 
- - - - - - 0x039C3C 0E:9C2C: 00        .byte $00   ; 
- D 0 - I - 0x039C3D 0E:9C2D: 00        .byte $00   ; 
- D 0 - I - 0x039C3E 0E:9C2E: 00        .byte $00   ; 
- D 0 - I - 0x039C3F 0E:9C2F: 00        .byte $00   ; 
- D 0 - I - 0x039C40 0E:9C30: 11        .byte $11   ; 
- - - - - - 0x039C41 0E:9C31: 00        .byte $00   ; 
- D 0 - I - 0x039C42 0E:9C32: 14        .byte $14   ; 
- D 0 - I - 0x039C43 0E:9C33: 00        .byte $00   ; 
- - - - - - 0x039C44 0E:9C34: 00        .byte $00   ; 
- - - - - - 0x039C45 0E:9C35: 00        .byte $00   ; 
- D 0 - I - 0x039C46 0E:9C36: 00        .byte $00   ; 
- D 0 - I - 0x039C47 0E:9C37: 00        .byte $00   ; 
- D 0 - I - 0x039C48 0E:9C38: 00        .byte $00   ; 
- - - - - - 0x039C49 0E:9C39: 00        .byte $00   ; 
- - - - - - 0x039C4A 0E:9C3A: 00        .byte $00   ; 
- - - - - - 0x039C4B 0E:9C3B: 00        .byte $00   ; 
- - - - - - 0x039C4C 0E:9C3C: 00        .byte $00   ; 
- - - - - - 0x039C4D 0E:9C3D: 00        .byte $00   ; 
- D 0 - I - 0x039C4E 0E:9C3E: 59        .byte $59   ; <Y>
- D 0 - I - 0x039C4F 0E:9C3F: 00        .byte $00   ; 
- D 0 - I - 0x039C50 0E:9C40: 00        .byte $00   ; 
- D 0 - I - 0x039C51 0E:9C41: 00        .byte $00   ; 
- D 0 - I - 0x039C52 0E:9C42: 00        .byte $00   ; 
- D 0 - I - 0x039C53 0E:9C43: 00        .byte $00   ; 
- D 0 - I - 0x039C54 0E:9C44: 00        .byte $00   ; 
- D 0 - I - 0x039C55 0E:9C45: 00        .byte $00   ; 
- D 0 - I - 0x039C56 0E:9C46: 00        .byte $00   ; 
- D 0 - I - 0x039C57 0E:9C47: 00        .byte $00   ; 
- D 0 - I - 0x039C58 0E:9C48: 00        .byte $00   ; 
- - - - - - 0x039C59 0E:9C49: 00        .byte $00   ; 
- D 0 - I - 0x039C5A 0E:9C4A: 5A        .byte $5A   ; <Z>
- D 0 - I - 0x039C5B 0E:9C4B: 00        .byte $00   ; 
- D 0 - I - 0x039C5C 0E:9C4C: 00        .byte $00   ; 
- D 0 - I - 0x039C5D 0E:9C4D: 00        .byte $00   ; 
- D 0 - I - 0x039C5E 0E:9C4E: 00        .byte $00   ; 
- D 0 - I - 0x039C5F 0E:9C4F: 00        .byte $00   ; 
- D 0 - I - 0x039C60 0E:9C50: 00        .byte $00   ; 
- D 0 - I - 0x039C61 0E:9C51: 00        .byte $00   ; 
- D 0 - I - 0x039C62 0E:9C52: 00        .byte $00   ; 
- D 0 - I - 0x039C63 0E:9C53: 00        .byte $00   ; 
- D 0 - I - 0x039C64 0E:9C54: 03        .byte $03   ; 
- - - - - - 0x039C65 0E:9C55: 00        .byte $00   ; 
- D 0 - I - 0x039C66 0E:9C56: 15        .byte $15   ; 
- D 0 - I - 0x039C67 0E:9C57: 00        .byte $00   ; 
- - - - - - 0x039C68 0E:9C58: 00        .byte $00   ; 
- - - - - - 0x039C69 0E:9C59: 00        .byte $00   ; 
- D 0 - I - 0x039C6A 0E:9C5A: 00        .byte $00   ; 
- D 0 - I - 0x039C6B 0E:9C5B: 00        .byte $00   ; 
- D 0 - I - 0x039C6C 0E:9C5C: 00        .byte $00   ; 
- - - - - - 0x039C6D 0E:9C5D: 00        .byte $00   ; 
- - - - - - 0x039C6E 0E:9C5E: 00        .byte $00   ; 
- - - - - - 0x039C6F 0E:9C5F: 00        .byte $00   ; 
- - - - - - 0x039C70 0E:9C60: 00        .byte $00   ; 
- - - - - - 0x039C71 0E:9C61: 00        .byte $00   ; 
- D 0 - I - 0x039C72 0E:9C62: 5B        .byte $5B   ; 
- D 0 - I - 0x039C73 0E:9C63: 0F        .byte $0F   ; 
- D 0 - I - 0x039C74 0E:9C64: 00        .byte $00   ; 
- D 0 - I - 0x039C75 0E:9C65: 00        .byte $00   ; 
- D 0 - I - 0x039C76 0E:9C66: 01        .byte $01   ; 
- D 0 - I - 0x039C77 0E:9C67: 01        .byte $01   ; 
- D 0 - I - 0x039C78 0E:9C68: 00        .byte $00   ; 
- D 0 - I - 0x039C79 0E:9C69: 01        .byte $01   ; 
- - - - - - 0x039C7A 0E:9C6A: 01        .byte $01   ; 
- D 0 - I - 0x039C7B 0E:9C6B: 01        .byte $01   ; 
- D 0 - I - 0x039C7C 0E:9C6C: 00        .byte $00   ; 
- - - - - - 0x039C7D 0E:9C6D: 00        .byte $00   ; 
- D 0 - I - 0x039C7E 0E:9C6E: 5C        .byte $5C   ; 
- D 0 - I - 0x039C7F 0E:9C6F: 0F        .byte $0F   ; 
- D 0 - I - 0x039C80 0E:9C70: 00        .byte $00   ; 
- D 0 - I - 0x039C81 0E:9C71: 00        .byte $00   ; 
- D 0 - I - 0x039C82 0E:9C72: 01        .byte $01   ; 
- D 0 - I - 0x039C83 0E:9C73: 01        .byte $01   ; 
- D 0 - I - 0x039C84 0E:9C74: 00        .byte $00   ; 
- D 0 - I - 0x039C85 0E:9C75: 01        .byte $01   ; 
- D 0 - I - 0x039C86 0E:9C76: 01        .byte $01   ; 
- D 0 - I - 0x039C87 0E:9C77: 01        .byte $01   ; 
- D 0 - I - 0x039C88 0E:9C78: 03        .byte $03   ; 
- - - - - - 0x039C89 0E:9C79: 00        .byte $00   ; 
- D 0 - I - 0x039C8A 0E:9C7A: 16        .byte $16   ; 
- D 0 - I - 0x039C8B 0E:9C7B: 00        .byte $00   ; 
- - - - - - 0x039C8C 0E:9C7C: 00        .byte $00   ; 
- - - - - - 0x039C8D 0E:9C7D: 00        .byte $00   ; 
- D 0 - I - 0x039C8E 0E:9C7E: 00        .byte $00   ; 
- D 0 - I - 0x039C8F 0E:9C7F: 00        .byte $00   ; 
- D 0 - I - 0x039C90 0E:9C80: 00        .byte $00   ; 
- - - - - - 0x039C91 0E:9C81: 00        .byte $00   ; 
- - - - - - 0x039C92 0E:9C82: 00        .byte $00   ; 
- - - - - - 0x039C93 0E:9C83: 00        .byte $00   ; 
- - - - - - 0x039C94 0E:9C84: 00        .byte $00   ; 
- - - - - - 0x039C95 0E:9C85: 00        .byte $00   ; 
- D 0 - I - 0x039C96 0E:9C86: 5E        .byte $5E   ; 
- D 0 - I - 0x039C97 0E:9C87: 0F        .byte $0F   ; 
- D 0 - I - 0x039C98 0E:9C88: 00        .byte $00   ; 
- D 0 - I - 0x039C99 0E:9C89: 00        .byte $00   ; 
- D 0 - I - 0x039C9A 0E:9C8A: 01        .byte $01   ; 
- D 0 - I - 0x039C9B 0E:9C8B: 03        .byte $03   ; 
- D 0 - I - 0x039C9C 0E:9C8C: 05        .byte $05   ; 
- D 0 - I - 0x039C9D 0E:9C8D: 06        .byte $06   ; 
- D 0 - I - 0x039C9E 0E:9C8E: 02        .byte $02   ; 
- D 0 - I - 0x039C9F 0E:9C8F: 02        .byte $02   ; 
- D 0 - I - 0x039CA0 0E:9C90: 00        .byte $00   ; 
- - - - - - 0x039CA1 0E:9C91: 00        .byte $00   ; 
- D 0 - I - 0x039CA2 0E:9C92: 5F        .byte $5F   ; 
- D 0 - I - 0x039CA3 0E:9C93: 00        .byte $00   ; 
- D 0 - I - 0x039CA4 0E:9C94: 00        .byte $00   ; 
- D 0 - I - 0x039CA5 0E:9C95: 00        .byte $00   ; 
- D 0 - I - 0x039CA6 0E:9C96: 10        .byte $10   ; 
- D 0 - I - 0x039CA7 0E:9C97: 05        .byte $05   ; 
- D 0 - I - 0x039CA8 0E:9C98: 05        .byte $05   ; 
- D 0 - I - 0x039CA9 0E:9C99: 06        .byte $06   ; 
- D 0 - I - 0x039CAA 0E:9C9A: 02        .byte $02   ; 
- D 0 - I - 0x039CAB 0E:9C9B: 02        .byte $02   ; 
- D 0 - I - 0x039CAC 0E:9C9C: 01        .byte $01   ; 
- - - - - - 0x039CAD 0E:9C9D: 00        .byte $00   ; 
- D 0 - I - 0x039CAE 0E:9C9E: 17        .byte $17   ; 
- D 0 - I - 0x039CAF 0E:9C9F: 00        .byte $00   ; 
- - - - - - 0x039CB0 0E:9CA0: 00        .byte $00   ; 
- - - - - - 0x039CB1 0E:9CA1: 00        .byte $00   ; 
- D 0 - I - 0x039CB2 0E:9CA2: 00        .byte $00   ; 
- D 0 - I - 0x039CB3 0E:9CA3: 00        .byte $00   ; 
- D 0 - I - 0x039CB4 0E:9CA4: 00        .byte $00   ; 
- - - - - - 0x039CB5 0E:9CA5: 00        .byte $00   ; 
- - - - - - 0x039CB6 0E:9CA6: 00        .byte $00   ; 
- - - - - - 0x039CB7 0E:9CA7: 00        .byte $00   ; 
- - - - - - 0x039CB8 0E:9CA8: 00        .byte $00   ; 
- - - - - - 0x039CB9 0E:9CA9: 00        .byte $00   ; 
- D 0 - I - 0x039CBA 0E:9CAA: 60        .byte $60   ; 
- D 0 - I - 0x039CBB 0E:9CAB: 13        .byte $13   ; 
- D 0 - I - 0x039CBC 0E:9CAC: 08        .byte $08   ; 
- D 0 - I - 0x039CBD 0E:9CAD: 00        .byte $00   ; 
- D 0 - I - 0x039CBE 0E:9CAE: 00        .byte $00   ; 
- D 0 - I - 0x039CBF 0E:9CAF: 03        .byte $03   ; 
- D 0 - I - 0x039CC0 0E:9CB0: 05        .byte $05   ; 
- D 0 - I - 0x039CC1 0E:9CB1: 00        .byte $00   ; 
- - - - - - 0x039CC2 0E:9CB2: 00        .byte $00   ; 
- D 0 - I - 0x039CC3 0E:9CB3: 00        .byte $00   ; 
- D 0 - I - 0x039CC4 0E:9CB4: 00        .byte $00   ; 
- - - - - - 0x039CC5 0E:9CB5: 00        .byte $00   ; 
- D 0 - I - 0x039CC6 0E:9CB6: 61        .byte $61   ; <a>
- D 0 - I - 0x039CC7 0E:9CB7: 13        .byte $13   ; 
- D 0 - I - 0x039CC8 0E:9CB8: 00        .byte $00   ; 
- D 0 - I - 0x039CC9 0E:9CB9: 00        .byte $00   ; 
- D 0 - I - 0x039CCA 0E:9CBA: 10        .byte $10   ; 
- D 0 - I - 0x039CCB 0E:9CBB: 03        .byte $03   ; 
- D 0 - I - 0x039CCC 0E:9CBC: 00        .byte $00   ; 
- D 0 - I - 0x039CCD 0E:9CBD: 00        .byte $00   ; 
- D 0 - I - 0x039CCE 0E:9CBE: 00        .byte $00   ; 
- D 0 - I - 0x039CCF 0E:9CBF: 00        .byte $00   ; 
- D 0 - I - 0x039CD0 0E:9CC0: 01        .byte $01   ; 
- - - - - - 0x039CD1 0E:9CC1: 00        .byte $00   ; 
- D 0 - I - 0x039CD2 0E:9CC2: 18        .byte $18   ; 
- D 0 - I - 0x039CD3 0E:9CC3: 00        .byte $00   ; 
- - - - - - 0x039CD4 0E:9CC4: 00        .byte $00   ; 
- - - - - - 0x039CD5 0E:9CC5: 00        .byte $00   ; 
- D 0 - I - 0x039CD6 0E:9CC6: 00        .byte $00   ; 
- D 0 - I - 0x039CD7 0E:9CC7: 02        .byte $02   ; 
- D 0 - I - 0x039CD8 0E:9CC8: 00        .byte $00   ; 
- - - - - - 0x039CD9 0E:9CC9: 00        .byte $00   ; 
- - - - - - 0x039CDA 0E:9CCA: 00        .byte $00   ; 
- - - - - - 0x039CDB 0E:9CCB: 00        .byte $00   ; 
- - - - - - 0x039CDC 0E:9CCC: 00        .byte $00   ; 
- - - - - - 0x039CDD 0E:9CCD: 00        .byte $00   ; 
- D 0 - I - 0x039CDE 0E:9CCE: 62        .byte $62   ; <b>
- D 0 - I - 0x039CDF 0E:9CCF: 00        .byte $00   ; 
- D 0 - I - 0x039CE0 0E:9CD0: 00        .byte $00   ; 
- D 0 - I - 0x039CE1 0E:9CD1: 00        .byte $00   ; 
- D 0 - I - 0x039CE2 0E:9CD2: 01        .byte $01   ; 
- D 0 - I - 0x039CE3 0E:9CD3: 03        .byte $03   ; 
- D 0 - I - 0x039CE4 0E:9CD4: 00        .byte $00   ; 
- D 0 - I - 0x039CE5 0E:9CD5: 00        .byte $00   ; 
- - - - - - 0x039CE6 0E:9CD6: 00        .byte $00   ; 
- D 0 - I - 0x039CE7 0E:9CD7: 00        .byte $00   ; 
- D 0 - I - 0x039CE8 0E:9CD8: 00        .byte $00   ; 
- - - - - - 0x039CE9 0E:9CD9: 00        .byte $00   ; 
- D 0 - I - 0x039CEA 0E:9CDA: 63        .byte $63   ; <c>
- D 0 - I - 0x039CEB 0E:9CDB: 00        .byte $00   ; 
- D 0 - I - 0x039CEC 0E:9CDC: 00        .byte $00   ; 
- D 0 - I - 0x039CED 0E:9CDD: 00        .byte $00   ; 
- D 0 - I - 0x039CEE 0E:9CDE: 10        .byte $10   ; 
- D 0 - I - 0x039CEF 0E:9CDF: 03        .byte $03   ; 
- D 0 - I - 0x039CF0 0E:9CE0: 00        .byte $00   ; 
- D 0 - I - 0x039CF1 0E:9CE1: 00        .byte $00   ; 
- D 0 - I - 0x039CF2 0E:9CE2: 00        .byte $00   ; 
- D 0 - I - 0x039CF3 0E:9CE3: 00        .byte $00   ; 
- D 0 - I - 0x039CF4 0E:9CE4: 01        .byte $01   ; 
- - - - - - 0x039CF5 0E:9CE5: 00        .byte $00   ; 
- D 0 - I - 0x039CF6 0E:9CE6: 19        .byte $19   ; 
- D 0 - I - 0x039CF7 0E:9CE7: 00        .byte $00   ; 
- - - - - - 0x039CF8 0E:9CE8: 00        .byte $00   ; 
- - - - - - 0x039CF9 0E:9CE9: 00        .byte $00   ; 
- D 0 - I - 0x039CFA 0E:9CEA: 00        .byte $00   ; 
- D 0 - I - 0x039CFB 0E:9CEB: 00        .byte $00   ; 
- D 0 - I - 0x039CFC 0E:9CEC: 00        .byte $00   ; 
- - - - - - 0x039CFD 0E:9CED: 00        .byte $00   ; 
- - - - - - 0x039CFE 0E:9CEE: 00        .byte $00   ; 
- - - - - - 0x039CFF 0E:9CEF: 00        .byte $00   ; 
- - - - - - 0x039D00 0E:9CF0: 00        .byte $00   ; 
- - - - - - 0x039D01 0E:9CF1: 00        .byte $00   ; 
- D 0 - I - 0x039D02 0E:9CF2: 64        .byte $64   ; <d>
- D 0 - I - 0x039D03 0E:9CF3: 13        .byte $13   ; 
- D 0 - I - 0x039D04 0E:9CF4: 00        .byte $00   ; 
- D 0 - I - 0x039D05 0E:9CF5: 00        .byte $00   ; 
- D 0 - I - 0x039D06 0E:9CF6: 01        .byte $01   ; 
- - - - - - 0x039D07 0E:9CF7: 03        .byte $03   ; 
- D 0 - I - 0x039D08 0E:9CF8: 02        .byte $02   ; 
- D 0 - I - 0x039D09 0E:9CF9: 06        .byte $06   ; 
- - - - - - 0x039D0A 0E:9CFA: 02        .byte $02   ; 
- D 0 - I - 0x039D0B 0E:9CFB: 02        .byte $02   ; 
- D 0 - I - 0x039D0C 0E:9CFC: 00        .byte $00   ; 
- - - - - - 0x039D0D 0E:9CFD: 00        .byte $00   ; 
- D 0 - I - 0x039D0E 0E:9CFE: 65        .byte $65   ; <e>
- D 0 - I - 0x039D0F 0E:9CFF: 13        .byte $13   ; 
- D 0 - I - 0x039D10 0E:9D00: 00        .byte $00   ; 
- D 0 - I - 0x039D11 0E:9D01: 00        .byte $00   ; 
- D 0 - I - 0x039D12 0E:9D02: 01        .byte $01   ; 
- D 0 - I - 0x039D13 0E:9D03: 03        .byte $03   ; 
- D 0 - I - 0x039D14 0E:9D04: 02        .byte $02   ; 
- D 0 - I - 0x039D15 0E:9D05: 06        .byte $06   ; 
- D 0 - I - 0x039D16 0E:9D06: 02        .byte $02   ; 
- D 0 - I - 0x039D17 0E:9D07: 02        .byte $02   ; 
- D 0 - I - 0x039D18 0E:9D08: 02        .byte $02   ; 
- - - - - - 0x039D19 0E:9D09: 00        .byte $00   ; 
- D 0 - I - 0x039D1A 0E:9D0A: 1A        .byte $1A   ; 
- D 0 - I - 0x039D1B 0E:9D0B: 00        .byte $00   ; 
- - - - - - 0x039D1C 0E:9D0C: 00        .byte $00   ; 
- - - - - - 0x039D1D 0E:9D0D: 00        .byte $00   ; 
- D 0 - I - 0x039D1E 0E:9D0E: 00        .byte $00   ; 
- D 0 - I - 0x039D1F 0E:9D0F: 00        .byte $00   ; 
- D 0 - I - 0x039D20 0E:9D10: 00        .byte $00   ; 
- - - - - - 0x039D21 0E:9D11: 00        .byte $00   ; 
- - - - - - 0x039D22 0E:9D12: 00        .byte $00   ; 
- - - - - - 0x039D23 0E:9D13: 00        .byte $00   ; 
- - - - - - 0x039D24 0E:9D14: 00        .byte $00   ; 
- - - - - - 0x039D25 0E:9D15: 00        .byte $00   ; 
- D 0 - I - 0x039D26 0E:9D16: 68        .byte $68   ; <h>
- D 0 - I - 0x039D27 0E:9D17: 00        .byte $00   ; 
- D 0 - I - 0x039D28 0E:9D18: 00        .byte $00   ; 
- D 0 - I - 0x039D29 0E:9D19: 0D        .byte $0D   ; 
- D 0 - I - 0x039D2A 0E:9D1A: 00        .byte $00   ; 
- D 0 - I - 0x039D2B 0E:9D1B: 00        .byte $00   ; 
- D 0 - I - 0x039D2C 0E:9D1C: 00        .byte $00   ; 
- D 0 - I - 0x039D2D 0E:9D1D: 00        .byte $00   ; 
- D 0 - I - 0x039D2E 0E:9D1E: 00        .byte $00   ; 
- D 0 - I - 0x039D2F 0E:9D1F: 00        .byte $00   ; 
- D 0 - I - 0x039D30 0E:9D20: 00        .byte $00   ; 
- - - - - - 0x039D31 0E:9D21: 00        .byte $00   ; 
- D 0 - I - 0x039D32 0E:9D22: 69        .byte $69   ; <i>
- D 0 - I - 0x039D33 0E:9D23: 13        .byte $13   ; 
- D 0 - I - 0x039D34 0E:9D24: 00        .byte $00   ; 
- D 0 - I - 0x039D35 0E:9D25: 00        .byte $00   ; 
- D 0 - I - 0x039D36 0E:9D26: 14        .byte $14   ; 
- - - - - - 0x039D37 0E:9D27: 03        .byte $03   ; 
- D 0 - I - 0x039D38 0E:9D28: 00        .byte $00   ; 
- D 0 - I - 0x039D39 0E:9D29: 00        .byte $00   ; 
- - - - - - 0x039D3A 0E:9D2A: 01        .byte $01   ; 
- D 0 - I - 0x039D3B 0E:9D2B: 00        .byte $00   ; 
- D 0 - I - 0x039D3C 0E:9D2C: 16        .byte $16   ; 
- - - - - - 0x039D3D 0E:9D2D: 00        .byte $00   ; 
- D 0 - I - 0x039D3E 0E:9D2E: 6A        .byte $6A   ; <j>
- D 0 - I - 0x039D3F 0E:9D2F: 13        .byte $13   ; 
- D 0 - I - 0x039D40 0E:9D30: 00        .byte $00   ; 
- D 0 - I - 0x039D41 0E:9D31: 00        .byte $00   ; 
- D 0 - I - 0x039D42 0E:9D32: 14        .byte $14   ; 
- D 0 - I - 0x039D43 0E:9D33: 03        .byte $03   ; 
- D 0 - I - 0x039D44 0E:9D34: 00        .byte $00   ; 
- D 0 - I - 0x039D45 0E:9D35: 00        .byte $00   ; 
- D 0 - I - 0x039D46 0E:9D36: 01        .byte $01   ; 
- D 0 - I - 0x039D47 0E:9D37: 00        .byte $00   ; 
- D 0 - I - 0x039D48 0E:9D38: 16        .byte $16   ; 
- - - - - - 0x039D49 0E:9D39: 00        .byte $00   ; 
- D 0 - I - 0x039D4A 0E:9D3A: 1C        .byte $1C   ; 
- D 0 - I - 0x039D4B 0E:9D3B: 00        .byte $00   ; 
- - - - - - 0x039D4C 0E:9D3C: 00        .byte $00   ; 
- - - - - - 0x039D4D 0E:9D3D: 00        .byte $00   ; 
- D 0 - I - 0x039D4E 0E:9D3E: 00        .byte $00   ; 
- D 0 - I - 0x039D4F 0E:9D3F: 00        .byte $00   ; 
- D 0 - I - 0x039D50 0E:9D40: 00        .byte $00   ; 
- - - - - - 0x039D51 0E:9D41: 00        .byte $00   ; 
- - - - - - 0x039D52 0E:9D42: 00        .byte $00   ; 
- - - - - - 0x039D53 0E:9D43: 00        .byte $00   ; 
- - - - - - 0x039D54 0E:9D44: 00        .byte $00   ; 
- - - - - - 0x039D55 0E:9D45: 00        .byte $00   ; 
- D 0 - I - 0x039D56 0E:9D46: 6C        .byte $6C   ; <l>
- D 0 - I - 0x039D57 0E:9D47: 00        .byte $00   ; 
- D 0 - I - 0x039D58 0E:9D48: 00        .byte $00   ; 
- D 0 - I - 0x039D59 0E:9D49: 00        .byte $00   ; 
- D 0 - I - 0x039D5A 0E:9D4A: 00        .byte $00   ; 
- - - - - - 0x039D5B 0E:9D4B: 03        .byte $03   ; 
- D 0 - I - 0x039D5C 0E:9D4C: 00        .byte $00   ; 
- D 0 - I - 0x039D5D 0E:9D4D: 00        .byte $00   ; 
- - - - - - 0x039D5E 0E:9D4E: 00        .byte $00   ; 
- D 0 - I - 0x039D5F 0E:9D4F: 00        .byte $00   ; 
- D 0 - I - 0x039D60 0E:9D50: 01        .byte $01   ; 
- - - - - - 0x039D61 0E:9D51: 00        .byte $00   ; 
- D 0 - I - 0x039D62 0E:9D52: 6D        .byte $6D   ; <m>
- D 0 - I - 0x039D63 0E:9D53: 00        .byte $00   ; 
- D 0 - I - 0x039D64 0E:9D54: 00        .byte $00   ; 
- D 0 - I - 0x039D65 0E:9D55: 00        .byte $00   ; 
- D 0 - I - 0x039D66 0E:9D56: 00        .byte $00   ; 
- D 0 - I - 0x039D67 0E:9D57: 03        .byte $03   ; 
- D 0 - I - 0x039D68 0E:9D58: 00        .byte $00   ; 
- D 0 - I - 0x039D69 0E:9D59: 00        .byte $00   ; 
- D 0 - I - 0x039D6A 0E:9D5A: 00        .byte $00   ; 
- D 0 - I - 0x039D6B 0E:9D5B: 00        .byte $00   ; 
- D 0 - I - 0x039D6C 0E:9D5C: 17        .byte $17   ; 
- - - - - - 0x039D6D 0E:9D5D: 00        .byte $00   ; 
- D 0 - I - 0x039D6E 0E:9D5E: 70        .byte $70   ; <p>
- D 0 - I - 0x039D6F 0E:9D5F: 00        .byte $00   ; 
- D 0 - I - 0x039D70 0E:9D60: 00        .byte $00   ; 
- D 0 - I - 0x039D71 0E:9D61: 00        .byte $00   ; 
- D 0 - I - 0x039D72 0E:9D62: 01        .byte $01   ; 
- D 0 - I - 0x039D73 0E:9D63: 03        .byte $03   ; 
- D 0 - I - 0x039D74 0E:9D64: 00        .byte $00   ; 
- D 0 - I - 0x039D75 0E:9D65: 00        .byte $00   ; 
- - - - - - 0x039D76 0E:9D66: 02        .byte $02   ; 
- D 0 - I - 0x039D77 0E:9D67: 02        .byte $02   ; 
- D 0 - I - 0x039D78 0E:9D68: 01        .byte $01   ; 
- - - - - - 0x039D79 0E:9D69: 00        .byte $00   ; 
- D 0 - I - 0x039D7A 0E:9D6A: 71        .byte $71   ; <q>
- D 0 - I - 0x039D7B 0E:9D6B: 00        .byte $00   ; 
- D 0 - I - 0x039D7C 0E:9D6C: 00        .byte $00   ; 
- D 0 - I - 0x039D7D 0E:9D6D: 00        .byte $00   ; 
- D 0 - I - 0x039D7E 0E:9D6E: 01        .byte $01   ; 
- D 0 - I - 0x039D7F 0E:9D6F: 03        .byte $03   ; 
- D 0 - I - 0x039D80 0E:9D70: 00        .byte $00   ; 
- D 0 - I - 0x039D81 0E:9D71: 00        .byte $00   ; 
- D 0 - I - 0x039D82 0E:9D72: 02        .byte $02   ; 
- D 0 - I - 0x039D83 0E:9D73: 00        .byte $00   ; 
- D 0 - I - 0x039D84 0E:9D74: 01        .byte $01   ; 
- - - - - - 0x039D85 0E:9D75: 00        .byte $00   ; 
- D 0 - I - 0x039D86 0E:9D76: 1E        .byte $1E   ; 
- D 0 - I - 0x039D87 0E:9D77: 00        .byte $00   ; 
- - - - - - 0x039D88 0E:9D78: 00        .byte $00   ; 
- - - - - - 0x039D89 0E:9D79: 00        .byte $00   ; 
- D 0 - I - 0x039D8A 0E:9D7A: 01        .byte $01   ; 
- D 0 - I - 0x039D8B 0E:9D7B: 00        .byte $00   ; 
- D 0 - I - 0x039D8C 0E:9D7C: 00        .byte $00   ; 
- - - - - - 0x039D8D 0E:9D7D: 00        .byte $00   ; 
- - - - - - 0x039D8E 0E:9D7E: 00        .byte $00   ; 
- - - - - - 0x039D8F 0E:9D7F: 00        .byte $00   ; 
- - - - - - 0x039D90 0E:9D80: 00        .byte $00   ; 
- - - - - - 0x039D91 0E:9D81: 00        .byte $00   ; 
- D 0 - I - 0x039D92 0E:9D82: 73        .byte $73   ; <s>
- D 0 - I - 0x039D93 0E:9D83: 00        .byte $00   ; 
- D 0 - I - 0x039D94 0E:9D84: 00        .byte $00   ; 
- D 0 - I - 0x039D95 0E:9D85: 00        .byte $00   ; 
- D 0 - I - 0x039D96 0E:9D86: 14        .byte $14   ; 
- - - - - - 0x039D97 0E:9D87: 03        .byte $03   ; 
- D 0 - I - 0x039D98 0E:9D88: 00        .byte $00   ; 
- D 0 - I - 0x039D99 0E:9D89: 00        .byte $00   ; 
- - - - - - 0x039D9A 0E:9D8A: 00        .byte $00   ; 
- D 0 - I - 0x039D9B 0E:9D8B: 00        .byte $00   ; 
- D 0 - I - 0x039D9C 0E:9D8C: 0D        .byte $0D   ; 
- - - - - - 0x039D9D 0E:9D8D: 00        .byte $00   ; 
- D 0 - I - 0x039D9E 0E:9D8E: 74        .byte $74   ; <t>
- D 0 - I - 0x039D9F 0E:9D8F: 00        .byte $00   ; 
- D 0 - I - 0x039DA0 0E:9D90: 00        .byte $00   ; 
- D 0 - I - 0x039DA1 0E:9D91: 00        .byte $00   ; 
- D 0 - I - 0x039DA2 0E:9D92: 14        .byte $14   ; 
- D 0 - I - 0x039DA3 0E:9D93: 03        .byte $03   ; 
- D 0 - I - 0x039DA4 0E:9D94: 00        .byte $00   ; 
- D 0 - I - 0x039DA5 0E:9D95: 00        .byte $00   ; 
- D 0 - I - 0x039DA6 0E:9D96: 00        .byte $00   ; 
- D 0 - I - 0x039DA7 0E:9D97: 00        .byte $00   ; 
- D 0 - I - 0x039DA8 0E:9D98: 0D        .byte $0D   ; 
- - - - - - 0x039DA9 0E:9D99: 00        .byte $00   ; 
- D 0 - I - 0x039DAA 0E:9D9A: 1F        .byte $1F   ; 
- D 0 - I - 0x039DAB 0E:9D9B: 00        .byte $00   ; 
- - - - - - 0x039DAC 0E:9D9C: 00        .byte $00   ; 
- - - - - - 0x039DAD 0E:9D9D: 00        .byte $00   ; 
- D 0 - I - 0x039DAE 0E:9D9E: 01        .byte $01   ; 
- D 0 - I - 0x039DAF 0E:9D9F: 02        .byte $02   ; 
- D 0 - I - 0x039DB0 0E:9DA0: 00        .byte $00   ; 
- - - - - - 0x039DB1 0E:9DA1: 00        .byte $00   ; 
- - - - - - 0x039DB2 0E:9DA2: 00        .byte $00   ; 
- - - - - - 0x039DB3 0E:9DA3: 00        .byte $00   ; 
- - - - - - 0x039DB4 0E:9DA4: 00        .byte $00   ; 
- - - - - - 0x039DB5 0E:9DA5: 00        .byte $00   ; 
- D 0 - I - 0x039DB6 0E:9DA6: 77        .byte $77   ; <w>
- D 0 - I - 0x039DB7 0E:9DA7: 00        .byte $00   ; 
- D 0 - I - 0x039DB8 0E:9DA8: 08        .byte $08   ; 
- D 0 - I - 0x039DB9 0E:9DA9: 00        .byte $00   ; 
- D 0 - I - 0x039DBA 0E:9DAA: 00        .byte $00   ; 
- D 0 - I - 0x039DBB 0E:9DAB: 03        .byte $03   ; 
- D 0 - I - 0x039DBC 0E:9DAC: 00        .byte $00   ; 
- D 0 - I - 0x039DBD 0E:9DAD: 00        .byte $00   ; 
- - - - - - 0x039DBE 0E:9DAE: 01        .byte $01   ; 
- D 0 - I - 0x039DBF 0E:9DAF: 00        .byte $00   ; 
- D 0 - I - 0x039DC0 0E:9DB0: 0B        .byte $0B   ; 
- - - - - - 0x039DC1 0E:9DB1: 00        .byte $00   ; 
- D 0 - I - 0x039DC2 0E:9DB2: 78        .byte $78   ; <x>
- D 0 - I - 0x039DC3 0E:9DB3: 00        .byte $00   ; 
- D 0 - I - 0x039DC4 0E:9DB4: 00        .byte $00   ; 
- D 0 - I - 0x039DC5 0E:9DB5: 00        .byte $00   ; 
- D 0 - I - 0x039DC6 0E:9DB6: 00        .byte $00   ; 
- D 0 - I - 0x039DC7 0E:9DB7: 03        .byte $03   ; 
- D 0 - I - 0x039DC8 0E:9DB8: 00        .byte $00   ; 
- D 0 - I - 0x039DC9 0E:9DB9: 00        .byte $00   ; 
- D 0 - I - 0x039DCA 0E:9DBA: 01        .byte $01   ; 
- D 0 - I - 0x039DCB 0E:9DBB: 00        .byte $00   ; 
- D 0 - I - 0x039DCC 0E:9DBC: 0B        .byte $0B   ; 
- - - - - - 0x039DCD 0E:9DBD: 00        .byte $00   ; 
- D 0 - I - 0x039DCE 0E:9DBE: 7A        .byte $7A   ; <z>
- D 0 - I - 0x039DCF 0E:9DBF: 13        .byte $13   ; 
- D 0 - I - 0x039DD0 0E:9DC0: 10        .byte $10   ; 
- D 0 - I - 0x039DD1 0E:9DC1: 00        .byte $00   ; 
- D 0 - I - 0x039DD2 0E:9DC2: 00        .byte $00   ; 
- - - - - - 0x039DD3 0E:9DC3: 03        .byte $03   ; 
- D 0 - I - 0x039DD4 0E:9DC4: 00        .byte $00   ; 
- D 0 - I - 0x039DD5 0E:9DC5: 00        .byte $00   ; 
- - - - - - 0x039DD6 0E:9DC6: 00        .byte $00   ; 
- D 0 - I - 0x039DD7 0E:9DC7: 00        .byte $00   ; 
- D 0 - I - 0x039DD8 0E:9DC8: 17        .byte $17   ; 
- - - - - - 0x039DD9 0E:9DC9: 00        .byte $00   ; 
- D 0 - I - 0x039DDA 0E:9DCA: 7B        .byte $7B   ; 
- D 0 - I - 0x039DDB 0E:9DCB: 13        .byte $13   ; 
- D 0 - I - 0x039DDC 0E:9DCC: 00        .byte $00   ; 
- D 0 - I - 0x039DDD 0E:9DCD: 00        .byte $00   ; 
- D 0 - I - 0x039DDE 0E:9DCE: 00        .byte $00   ; 
- D 0 - I - 0x039DDF 0E:9DCF: 03        .byte $03   ; 
- D 0 - I - 0x039DE0 0E:9DD0: 00        .byte $00   ; 
- D 0 - I - 0x039DE1 0E:9DD1: 00        .byte $00   ; 
- D 0 - I - 0x039DE2 0E:9DD2: 00        .byte $00   ; 
- D 0 - I - 0x039DE3 0E:9DD3: 00        .byte $00   ; 
- D 0 - I - 0x039DE4 0E:9DD4: 17        .byte $17   ; 
- - - - - - 0x039DE5 0E:9DD5: 00        .byte $00   ; 
- D 0 - I - 0x039DE6 0E:9DD6: 21        .byte $21   ; 
- D 0 - I - 0x039DE7 0E:9DD7: 00        .byte $00   ; 
- - - - - - 0x039DE8 0E:9DD8: 00        .byte $00   ; 
- - - - - - 0x039DE9 0E:9DD9: 00        .byte $00   ; 
- D 0 - I - 0x039DEA 0E:9DDA: 01        .byte $01   ; 
- D 0 - I - 0x039DEB 0E:9DDB: 00        .byte $00   ; 
- D 0 - I - 0x039DEC 0E:9DDC: 00        .byte $00   ; 
- - - - - - 0x039DED 0E:9DDD: 00        .byte $00   ; 
- - - - - - 0x039DEE 0E:9DDE: 00        .byte $00   ; 
- - - - - - 0x039DEF 0E:9DDF: 00        .byte $00   ; 
- - - - - - 0x039DF0 0E:9DE0: 00        .byte $00   ; 
- - - - - - 0x039DF1 0E:9DE1: 00        .byte $00   ; 
- D 0 - I - 0x039DF2 0E:9DE2: 7D        .byte $7D   ; 
- D 0 - I - 0x039DF3 0E:9DE3: 19        .byte $19   ; 
- D 0 - I - 0x039DF4 0E:9DE4: 08        .byte $08   ; 
- D 0 - I - 0x039DF5 0E:9DE5: 00        .byte $00   ; 
- D 0 - I - 0x039DF6 0E:9DE6: 17        .byte $17   ; 
- D 0 - I - 0x039DF7 0E:9DE7: 05        .byte $05   ; 
- D 0 - I - 0x039DF8 0E:9DE8: 03        .byte $03   ; 
- D 0 - I - 0x039DF9 0E:9DE9: 00        .byte $00   ; 
- - - - - - 0x039DFA 0E:9DEA: 00        .byte $00   ; 
- D 0 - I - 0x039DFB 0E:9DEB: 00        .byte $00   ; 
- D 0 - I - 0x039DFC 0E:9DEC: 18        .byte $18   ; 
- - - - - - 0x039DFD 0E:9DED: 00        .byte $00   ; 
- D 0 - I - 0x039DFE 0E:9DEE: 7E        .byte $7E   ; 
- D 0 - I - 0x039DFF 0E:9DEF: 19        .byte $19   ; 
- D 0 - I - 0x039E00 0E:9DF0: 00        .byte $00   ; 
- D 0 - I - 0x039E01 0E:9DF1: 00        .byte $00   ; 
- D 0 - I - 0x039E02 0E:9DF2: 17        .byte $17   ; 
- D 0 - I - 0x039E03 0E:9DF3: 05        .byte $05   ; 
- D 0 - I - 0x039E04 0E:9DF4: 03        .byte $03   ; 
- D 0 - I - 0x039E05 0E:9DF5: 00        .byte $00   ; 
- D 0 - I - 0x039E06 0E:9DF6: 00        .byte $00   ; 
- D 0 - I - 0x039E07 0E:9DF7: 00        .byte $00   ; 
- D 0 - I - 0x039E08 0E:9DF8: 18        .byte $18   ; 
- - - - - - 0x039E09 0E:9DF9: 00        .byte $00   ; 
- D 0 - I - 0x039E0A 0E:9DFA: 22        .byte $22   ; 
- D 0 - I - 0x039E0B 0E:9DFB: 00        .byte $00   ; 
- - - - - - 0x039E0C 0E:9DFC: 00        .byte $00   ; 
- - - - - - 0x039E0D 0E:9DFD: 00        .byte $00   ; 
- D 0 - I - 0x039E0E 0E:9DFE: 01        .byte $01   ; 
- D 0 - I - 0x039E0F 0E:9DFF: 00        .byte $00   ; 
- D 0 - I - 0x039E10 0E:9E00: 00        .byte $00   ; 
- - - - - - 0x039E11 0E:9E01: 00        .byte $00   ; 
- - - - - - 0x039E12 0E:9E02: 00        .byte $00   ; 
- - - - - - 0x039E13 0E:9E03: 00        .byte $00   ; 
- - - - - - 0x039E14 0E:9E04: 00        .byte $00   ; 
- - - - - - 0x039E15 0E:9E05: 00        .byte $00   ; 
- D 0 - I - 0x039E16 0E:9E06: 81        .byte $81   ; 
- D 0 - I - 0x039E17 0E:9E07: 00        .byte $00   ; 
- D 0 - I - 0x039E18 0E:9E08: 00        .byte $00   ; 
- D 0 - I - 0x039E19 0E:9E09: 00        .byte $00   ; 
- D 0 - I - 0x039E1A 0E:9E0A: 14        .byte $14   ; 
- D 0 - I - 0x039E1B 0E:9E0B: 00        .byte $00   ; 
- D 0 - I - 0x039E1C 0E:9E0C: 00        .byte $00   ; 
- D 0 - I - 0x039E1D 0E:9E0D: 00        .byte $00   ; 
- D 0 - I - 0x039E1E 0E:9E0E: 00        .byte $00   ; 
- D 0 - I - 0x039E1F 0E:9E0F: 00        .byte $00   ; 
- D 0 - I - 0x039E20 0E:9E10: 19        .byte $19   ; 
- - - - - - 0x039E21 0E:9E11: 00        .byte $00   ; 
- D 0 - I - 0x039E22 0E:9E12: 87        .byte $87   ; 
- D 0 - I - 0x039E23 0E:9E13: 00        .byte $00   ; 
- D 0 - I - 0x039E24 0E:9E14: 00        .byte $00   ; 
- D 0 - I - 0x039E25 0E:9E15: 00        .byte $00   ; 
- D 0 - I - 0x039E26 0E:9E16: 00        .byte $00   ; 
- D 0 - I - 0x039E27 0E:9E17: 00        .byte $00   ; 
- D 0 - I - 0x039E28 0E:9E18: 00        .byte $00   ; 
- D 0 - I - 0x039E29 0E:9E19: 00        .byte $00   ; 
- D 0 - I - 0x039E2A 0E:9E1A: 00        .byte $00   ; 
- D 0 - I - 0x039E2B 0E:9E1B: 00        .byte $00   ; 
- D 0 - I - 0x039E2C 0E:9E1C: 00        .byte $00   ; 
- - - - - - 0x039E2D 0E:9E1D: 00        .byte $00   ; 
- D 0 - I - 0x039E2E 0E:9E1E: 99        .byte $99   ; 
- D 0 - I - 0x039E2F 0E:9E1F: 16        .byte $16   ; 
- D 0 - I - 0x039E30 0E:9E20: FF        .byte $FF   ; 
- D 0 - I - 0x039E31 0E:9E21: 00        .byte $00   ; 
- D 0 - I - 0x039E32 0E:9E22: 02        .byte $02   ; 
- D 0 - I - 0x039E33 0E:9E23: 01        .byte $01   ; 
- D 0 - I - 0x039E34 0E:9E24: 00        .byte $00   ; 
- D 0 - I - 0x039E35 0E:9E25: 00        .byte $00   ; 
- D 0 - I - 0x039E36 0E:9E26: 02        .byte $02   ; 
- D 0 - I - 0x039E37 0E:9E27: 02        .byte $02   ; 
- D 0 - I - 0x039E38 0E:9E28: 00        .byte $00   ; 
- - - - - - 0x039E39 0E:9E29: 00        .byte $00   ; 
- D 0 - I - 0x039E3A 0E:9E2A: 9A        .byte $9A   ; 
- D 0 - I - 0x039E3B 0E:9E2B: 17        .byte $17   ; 
- D 0 - I - 0x039E3C 0E:9E2C: 00        .byte $00   ; 
- - - - - - 0x039E3D 0E:9E2D: 00        .byte $00   ; 
- D 0 - I - 0x039E3E 0E:9E2E: 0A        .byte $0A   ; 
- D 0 - I - 0x039E3F 0E:9E2F: 00        .byte $00   ; 
- - - - - - 0x039E40 0E:9E30: 00        .byte $00   ; 
- - - - - - 0x039E41 0E:9E31: 00        .byte $00   ; 
- - - - - - 0x039E42 0E:9E32: 00        .byte $00   ; 
- - - - - - 0x039E43 0E:9E33: 00        .byte $00   ; 
- - - - - - 0x039E44 0E:9E34: 00        .byte $00   ; 
- - - - - - 0x039E45 0E:9E35: 00        .byte $00   ; 
- D 0 - I - 0x039E46 0E:9E36: 9B        .byte $9B   ; 
- D 0 - I - 0x039E47 0E:9E37: 18        .byte $18   ; 
- D 0 - I - 0x039E48 0E:9E38: 00        .byte $00   ; 
- D 0 - I - 0x039E49 0E:9E39: FF        .byte $FF   ; 
- D 0 - I - 0x039E4A 0E:9E3A: 1B        .byte $1B   ; 
- D 0 - I - 0x039E4B 0E:9E3B: 06        .byte $06   ; 
- - - - - - 0x039E4C 0E:9E3C: 00        .byte $00   ; 
- D 0 - I - 0x039E4D 0E:9E3D: 03        .byte $03   ; 
- D 0 - I - 0x039E4E 0E:9E3E: 00        .byte $00   ; 
- D 0 - I - 0x039E4F 0E:9E3F: 00        .byte $00   ; 
- D 0 - I - 0x039E50 0E:9E40: 24        .byte $24   ; 
- - - - - - 0x039E51 0E:9E41: 00        .byte $00   ; 
- D 0 - I - 0x039E52 0E:9E42: 9C        .byte $9C   ; 
- D 0 - I - 0x039E53 0E:9E43: 0A        .byte $0A   ; 
- D 0 - I - 0x039E54 0E:9E44: 00        .byte $00   ; 
- D 0 - I - 0x039E55 0E:9E45: 00        .byte $00   ; 
- D 0 - I - 0x039E56 0E:9E46: 14        .byte $14   ; 
- D 0 - I - 0x039E57 0E:9E47: 01        .byte $01   ; 
- D 0 - I - 0x039E58 0E:9E48: 00        .byte $00   ; 
- D 0 - I - 0x039E59 0E:9E49: 00        .byte $00   ; 
- - - - - - 0x039E5A 0E:9E4A: 00        .byte $00   ; 
- D 0 - I - 0x039E5B 0E:9E4B: 00        .byte $00   ; 
- D 0 - I - 0x039E5C 0E:9E4C: 0B        .byte $0B   ; 
- - - - - - 0x039E5D 0E:9E4D: 00        .byte $00   ; 
- D 0 - - - 0x039E5E 0E:9E4E: 08        .byte $08   ; 
- D 0 - - - 0x039E5F 0E:9E4F: 08        .byte $08   ; 
- D 0 - - - 0x039E60 0E:9E50: 08        .byte $08   ; 
- D 0 - - - 0x039E61 0E:9E51: 09        .byte $09   ; 
- D 0 - - - 0x039E62 0E:9E52: 09        .byte $09   ; 
- D 0 - - - 0x039E63 0E:9E53: 09        .byte $09   ; 
- D 0 - - - 0x039E64 0E:9E54: 09        .byte $09   ; 
- D 0 - - - 0x039E65 0E:9E55: 0A        .byte $0A   ; 
- D 0 - - - 0x039E66 0E:9E56: 0A        .byte $0A   ; 
- D 0 - - - 0x039E67 0E:9E57: 0A        .byte $0A   ; 
- D 0 - - - 0x039E68 0E:9E58: 0B        .byte $0B   ; 
- D 0 - - - 0x039E69 0E:9E59: 0B        .byte $0B   ; 
- D 0 - - - 0x039E6A 0E:9E5A: 0B        .byte $0B   ; 
- D 0 - - - 0x039E6B 0E:9E5B: 0C        .byte $0C   ; 
- D 0 - - - 0x039E6C 0E:9E5C: 0C        .byte $0C   ; 
- D 0 - - - 0x039E6D 0E:9E5D: 0C        .byte $0C   ; 
- D 0 - - - 0x039E6E 0E:9E5E: 0D        .byte $0D   ; 
- D 0 - - - 0x039E6F 0E:9E5F: 0D        .byte $0D   ; 
- D 0 - - - 0x039E70 0E:9E60: 0D        .byte $0D   ; 
- D 0 - - - 0x039E71 0E:9E61: 0E        .byte $0E   ; 
- D 0 - - - 0x039E72 0E:9E62: 0E        .byte $0E   ; 
- D 0 - - - 0x039E73 0E:9E63: 0E        .byte $0E   ; 
- D 0 - - - 0x039E74 0E:9E64: 0F        .byte $0F   ; 
- D 0 - - - 0x039E75 0E:9E65: 0F        .byte $0F   ; 
- D 0 - - - 0x039E76 0E:9E66: 10        .byte $10   ; 
- D 0 - - - 0x039E77 0E:9E67: 10        .byte $10   ; 
- D 0 - - - 0x039E78 0E:9E68: 11        .byte $11   ; 
- D 0 - - - 0x039E79 0E:9E69: 11        .byte $11   ; 
- D 0 - - - 0x039E7A 0E:9E6A: 11        .byte $11   ; 
- D 0 - - - 0x039E7B 0E:9E6B: 12        .byte $12   ; 
- D 0 - - - 0x039E7C 0E:9E6C: 12        .byte $12   ; 
- D 0 - - - 0x039E7D 0E:9E6D: 13        .byte $13   ; 
- D 0 - - - 0x039E7E 0E:9E6E: 14        .byte $14   ; 
- D 0 - - - 0x039E7F 0E:9E6F: 14        .byte $14   ; 
- D 0 - - - 0x039E80 0E:9E70: 15        .byte $15   ; 
- D 0 - - - 0x039E81 0E:9E71: 15        .byte $15   ; 
- D 0 - - - 0x039E82 0E:9E72: 16        .byte $16   ; 
- D 0 - - - 0x039E83 0E:9E73: 16        .byte $16   ; 
- D 0 - - - 0x039E84 0E:9E74: 17        .byte $17   ; 
- D 0 - - - 0x039E85 0E:9E75: 18        .byte $18   ; 
- D 0 - - - 0x039E86 0E:9E76: 18        .byte $18   ; 
- D 0 - - - 0x039E87 0E:9E77: 19        .byte $19   ; 
- D 0 - - - 0x039E88 0E:9E78: 1A        .byte $1A   ; 
- D 0 - - - 0x039E89 0E:9E79: 1A        .byte $1A   ; 
- D 0 - - - 0x039E8A 0E:9E7A: 1B        .byte $1B   ; 
- D 0 - - - 0x039E8B 0E:9E7B: 1C        .byte $1C   ; 
- D 0 - - - 0x039E8C 0E:9E7C: 1D        .byte $1D   ; 
- D 0 - - - 0x039E8D 0E:9E7D: 1D        .byte $1D   ; 
- D 0 - - - 0x039E8E 0E:9E7E: 1E        .byte $1E   ; 
- D 0 - - - 0x039E8F 0E:9E7F: 1F        .byte $1F   ; 
- D 0 - - - 0x039E90 0E:9E80: 20        .byte $20   ; 
- D 0 - - - 0x039E91 0E:9E81: 21        .byte $21   ; 
- D 0 - - - 0x039E92 0E:9E82: 22        .byte $22   ; 
- D 0 - - - 0x039E93 0E:9E83: 23        .byte $23   ; 
- D 0 - - - 0x039E94 0E:9E84: 24        .byte $24   ; 
- D 0 - - - 0x039E95 0E:9E85: 25        .byte $25   ; 
- D 0 - - - 0x039E96 0E:9E86: 26        .byte $26   ; 
- D 0 - - - 0x039E97 0E:9E87: 27        .byte $27   ; 
- D 0 - - - 0x039E98 0E:9E88: 28        .byte $28   ; 
- D 0 - - - 0x039E99 0E:9E89: 29        .byte $29   ; 
- D 0 - - - 0x039E9A 0E:9E8A: 2A        .byte $2A   ; 
- D 0 - - - 0x039E9B 0E:9E8B: 2B        .byte $2B   ; 
- D 0 - - - 0x039E9C 0E:9E8C: 2C        .byte $2C   ; 
- D 0 - - - 0x039E9D 0E:9E8D: 2D        .byte $2D   ; 
- D 0 - - - 0x039E9E 0E:9E8E: 2F        .byte $2F   ; 
- D 0 - - - 0x039E9F 0E:9E8F: 30        .byte $30   ; <0>
- D 0 - - - 0x039EA0 0E:9E90: 31        .byte $31   ; <1>
- D 0 - - - 0x039EA1 0E:9E91: 33        .byte $33   ; <3>
- D 0 - - - 0x039EA2 0E:9E92: 34        .byte $34   ; <4>
- D 0 - - - 0x039EA3 0E:9E93: 35        .byte $35   ; <5>
- D 0 - - - 0x039EA4 0E:9E94: 37        .byte $37   ; <7>
- D 0 - - - 0x039EA5 0E:9E95: 38        .byte $38   ; <8>
- D 0 - - - 0x039EA6 0E:9E96: 3A        .byte $3A   ; 
- D 0 - - - 0x039EA7 0E:9E97: 3B        .byte $3B   ; 
- D 0 - - - 0x039EA8 0E:9E98: 3D        .byte $3D   ; 
- D 0 - - - 0x039EA9 0E:9E99: 3F        .byte $3F   ; 
- D 0 - - - 0x039EAA 0E:9E9A: 41        .byte $41   ; <A>
- D 0 - - - 0x039EAB 0E:9E9B: 42        .byte $42   ; <B>
- D 0 - - - 0x039EAC 0E:9E9C: 44        .byte $44   ; <D>
- D 0 - - - 0x039EAD 0E:9E9D: 46        .byte $46   ; <F>
- D 0 - - - 0x039EAE 0E:9E9E: 48        .byte $48   ; <H>
- D 0 - - - 0x039EAF 0E:9E9F: 4A        .byte $4A   ; <J>
- D 0 - - - 0x039EB0 0E:9EA0: 4C        .byte $4C   ; <L>
- D 0 - - - 0x039EB1 0E:9EA1: 4E        .byte $4E   ; <N>
- D 0 - - - 0x039EB2 0E:9EA2: 50        .byte $50   ; <P>
- D 0 - - - 0x039EB3 0E:9EA3: 52        .byte $52   ; <R>
- D 0 - - - 0x039EB4 0E:9EA4: 54        .byte $54   ; <T>
- D 0 - - - 0x039EB5 0E:9EA5: 57        .byte $57   ; <W>
- D 0 - - - 0x039EB6 0E:9EA6: 59        .byte $59   ; <Y>
- D 0 - - - 0x039EB7 0E:9EA7: 5C        .byte $5C   ; 
- D 0 - - - 0x039EB8 0E:9EA8: 5E        .byte $5E   ; 
- D 0 - - - 0x039EB9 0E:9EA9: 61        .byte $61   ; <a>
- D 0 - - - 0x039EBA 0E:9EAA: 63        .byte $63   ; <c>
- D 0 - - - 0x039EBB 0E:9EAB: 66        .byte $66   ; <f>
- D 0 - - - 0x039EBC 0E:9EAC: 69        .byte $69   ; <i>
- D 0 - - - 0x039EBD 0E:9EAD: 6C        .byte $6C   ; <l>
- D 0 - - - 0x039EBE 0E:9EAE: 6F        .byte $6F   ; <o>
- D 0 - - - 0x039EBF 0E:9EAF: 72        .byte $72   ; <r>
- D 0 - - - 0x039EC0 0E:9EB0: 75        .byte $75   ; <u>
- D 0 - - - 0x039EC1 0E:9EB1: 78        .byte $78   ; <x>
- D 0 - - - 0x039EC2 0E:9EB2: 7B        .byte $7B   ; 
- D 0 - - - 0x039EC3 0E:9EB3: 7E        .byte $7E   ; 
- D 0 - - - 0x039EC4 0E:9EB4: 82        .byte $82   ; 
- D 0 - - - 0x039EC5 0E:9EB5: 85        .byte $85   ; 
- D 0 - - - 0x039EC6 0E:9EB6: 89        .byte $89   ; 
- D 0 - - - 0x039EC7 0E:9EB7: 8D        .byte $8D   ; 
- D 0 - - - 0x039EC8 0E:9EB8: 91        .byte $91   ; 
- D 0 - - - 0x039EC9 0E:9EB9: 95        .byte $95   ; 
- D 0 - - - 0x039ECA 0E:9EBA: 99        .byte $99   ; 
- D 0 - - - 0x039ECB 0E:9EBB: 9D        .byte $9D   ; 
- D 0 - - - 0x039ECC 0E:9EBC: A1        .byte $A1   ; 
- D 0 - - - 0x039ECD 0E:9EBD: A5        .byte $A5   ; 
- D 0 - - - 0x039ECE 0E:9EBE: AA        .byte $AA   ; 
- D 0 - - - 0x039ECF 0E:9EBF: AF        .byte $AF   ; 
- D 0 - - - 0x039ED0 0E:9EC0: B3        .byte $B3   ; 
- D 0 - - - 0x039ED1 0E:9EC1: B7        .byte $B7   ; 
- D 0 - - - 0x039ED2 0E:9EC2: BA        .byte $BA   ; 
- D 0 - - - 0x039ED3 0E:9EC3: BD        .byte $BD   ; 
- D 0 - - - 0x039ED4 0E:9EC4: C0        .byte $C0   ; 
- D 0 - - - 0x039ED5 0E:9EC5: C3        .byte $C3   ; 
- D 0 - - - 0x039ED6 0E:9EC6: C6        .byte $C6   ; 
- D 0 - - - 0x039ED7 0E:9EC7: C9        .byte $C9   ; 
- D 0 - - - 0x039ED8 0E:9EC8: CC        .byte $CC   ; 
- D 0 - - - 0x039ED9 0E:9EC9: CE        .byte $CE   ; 
- D 0 - - - 0x039EDA 0E:9ECA: D1        .byte $D1   ; 
- D 0 - - - 0x039EDB 0E:9ECB: D3        .byte $D3   ; 
- D 0 - - - 0x039EDC 0E:9ECC: D5        .byte $D5   ; 
- D 0 - - - 0x039EDD 0E:9ECD: D7        .byte $D7   ; 
- D 0 - - - 0x039EDE 0E:9ECE: D9        .byte $D9   ; 
- D 0 - - - 0x039EDF 0E:9ECF: DA        .byte $DA   ; 
- D 0 - - - 0x039EE0 0E:9ED0: DC        .byte $DC   ; 
- D 0 - - - 0x039EE1 0E:9ED1: DD        .byte $DD   ; 
- D 0 - - - 0x039EE2 0E:9ED2: DE        .byte $DE   ; 
- D 0 - - - 0x039EE3 0E:9ED3: E0        .byte $E0   ; 
- D 0 - - - 0x039EE4 0E:9ED4: E1        .byte $E1   ; 
- D 0 - - - 0x039EE5 0E:9ED5: E2        .byte $E2   ; 
- D 0 - - - 0x039EE6 0E:9ED6: E3        .byte $E3   ; 
- - - - - - 0x039EE7 0E:9ED7: E4        .byte $E4   ; 
- D 0 - - - 0x039EE8 0E:9ED8: E5        .byte $E5   ; 
- D 0 - - - 0x039EE9 0E:9ED9: E6        .byte $E6   ; 
- D 0 - - - 0x039EEA 0E:9EDA: E7        .byte $E7   ; 
- D 0 - - - 0x039EEB 0E:9EDB: E8        .byte $E8   ; 
- D 0 - - - 0x039EEC 0E:9EDC: E8        .byte $E8   ; 
- - - - - - 0x039EED 0E:9EDD: E9        .byte $E9   ; 
- D 0 - - - 0x039EEE 0E:9EDE: EA        .byte $EA   ; 
- D 0 - - - 0x039EEF 0E:9EDF: EB        .byte $EB   ; 
- - - - - - 0x039EF0 0E:9EE0: EB        .byte $EB   ; 
- D 0 - - - 0x039EF1 0E:9EE1: EC        .byte $EC   ; 
- D 0 - - - 0x039EF2 0E:9EE2: ED        .byte $ED   ; 
- D 0 - - - 0x039EF3 0E:9EE3: ED        .byte $ED   ; 
- D 0 - - - 0x039EF4 0E:9EE4: EE        .byte $EE   ; 
- - - - - - 0x039EF5 0E:9EE5: EE        .byte $EE   ; 
- D 0 - - - 0x039EF6 0E:9EE6: EF        .byte $EF   ; 
- D 0 - - - 0x039EF7 0E:9EE7: F0        .byte $F0   ; 
- D 0 - - - 0x039EF8 0E:9EE8: F0        .byte $F0   ; 
- D 0 - - - 0x039EF9 0E:9EE9: F1        .byte $F1   ; 
- D 0 - - - 0x039EFA 0E:9EEA: F1        .byte $F1   ; 
- D 0 - - - 0x039EFB 0E:9EEB: F2        .byte $F2   ; 
- D 0 - - - 0x039EFC 0E:9EEC: F3        .byte $F3   ; 
- - - - - - 0x039EFD 0E:9EED: F3        .byte $F3   ; 
- - - - - - 0x039EFE 0E:9EEE: F4        .byte $F4   ; 
- - - - - - 0x039EFF 0E:9EEF: F4        .byte $F4   ; 
- D 0 - - - 0x039F00 0E:9EF0: F5        .byte $F5   ; 
- D 0 - - - 0x039F01 0E:9EF1: F5        .byte $F5   ; 
- D 0 - - - 0x039F02 0E:9EF2: F6        .byte $F6   ; 
- D 0 - - - 0x039F03 0E:9EF3: F6        .byte $F6   ; 
- - - - - - 0x039F04 0E:9EF4: F7        .byte $F7   ; 
- D 0 - - - 0x039F05 0E:9EF5: F7        .byte $F7   ; 
- D 0 - - - 0x039F06 0E:9EF6: F8        .byte $F8   ; 
- D 0 - - - 0x039F07 0E:9EF7: F8        .byte $F8   ; 
- D 0 - - - 0x039F08 0E:9EF8: F8        .byte $F8   ; 
- D 0 - - - 0x039F09 0E:9EF9: F9        .byte $F9   ; 
- D 0 - - - 0x039F0A 0E:9EFA: F9        .byte $F9   ; 
- D 0 - - - 0x039F0B 0E:9EFB: FA        .byte $FA   ; 
- - - - - - 0x039F0C 0E:9EFC: FA        .byte $FA   ; 
- - - - - - 0x039F0D 0E:9EFD: FA        .byte $FA   ; 
- D 0 - - - 0x039F0E 0E:9EFE: FB        .byte $FB   ; 
- - - - - - 0x039F0F 0E:9EFF: FB        .byte $FB   ; 
- D 0 - - - 0x039F10 0E:9F00: FB        .byte $FB   ; 
- - - - - - 0x039F11 0E:9F01: FC        .byte $FC   ; 
- - - - - - 0x039F12 0E:9F02: FC        .byte $FC   ; 
- - - - - - 0x039F13 0E:9F03: FC        .byte $FC   ; 
- D 0 - - - 0x039F14 0E:9F04: FD        .byte $FD   ; 
- - - - - - 0x039F15 0E:9F05: FD        .byte $FD   ; 
- - - - - - 0x039F16 0E:9F06: FD        .byte $FD   ; 
- - - - - - 0x039F17 0E:9F07: FD        .byte $FD   ; 
- D 0 - - - 0x039F18 0E:9F08: FD        .byte $FD   ; 
- - - - - - 0x039F19 0E:9F09: FE        .byte $FE   ; 
- D 0 - - - 0x039F1A 0E:9F0A: FE        .byte $FE   ; 
- - - - - - 0x039F1B 0E:9F0B: FE        .byte $FE   ; 
- - - - - - 0x039F1C 0E:9F0C: FE        .byte $FE   ; 
- - - - - - 0x039F1D 0E:9F0D: FF        .byte $FF   ; 
- D 0 - I - 0x039F1E 0E:9F0E: 90        .byte $90   ; 
- D 0 - I - 0x039F1F 0E:9F0F: 01        .byte $01   ; 
- D 0 - I - 0x039F20 0E:9F10: 98        .byte $98   ; 
- D 0 - I - 0x039F21 0E:9F11: 01        .byte $01   ; 
- D 0 - I - 0x039F22 0E:9F12: A0        .byte $A0   ; 
- D 0 - I - 0x039F23 0E:9F13: 01        .byte $01   ; 
- D 0 - I - 0x039F24 0E:9F14: A8        .byte $A8   ; 
- D 0 - I - 0x039F25 0E:9F15: 01        .byte $01   ; 
- D 0 - I - 0x039F26 0E:9F16: B0        .byte $B0   ; 
- D 0 - I - 0x039F27 0E:9F17: 01        .byte $01   ; 
- D 0 - I - 0x039F28 0E:9F18: B8        .byte $B8   ; 
- D 0 - I - 0x039F29 0E:9F19: 01        .byte $01   ; 
- D 0 - I - 0x039F2A 0E:9F1A: C0        .byte $C0   ; 
- D 0 - I - 0x039F2B 0E:9F1B: 01        .byte $01   ; 
- D 0 - I - 0x039F2C 0E:9F1C: C8        .byte $C8   ; 
- D 0 - I - 0x039F2D 0E:9F1D: 01        .byte $01   ; 
- D 0 - I - 0x039F2E 0E:9F1E: D0        .byte $D0   ; 
- D 0 - I - 0x039F2F 0E:9F1F: 01        .byte $01   ; 
- D 0 - I - 0x039F30 0E:9F20: E2        .byte $E2   ; 
- D 0 - I - 0x039F31 0E:9F21: 01        .byte $01   ; 
- D 0 - I - 0x039F32 0E:9F22: EA        .byte $EA   ; 
- D 0 - I - 0x039F33 0E:9F23: 01        .byte $01   ; 
- D 0 - I - 0x039F34 0E:9F24: F2        .byte $F2   ; 
- D 0 - I - 0x039F35 0E:9F25: 01        .byte $01   ; 
- D 0 - I - 0x039F36 0E:9F26: FA        .byte $FA   ; 
- D 0 - I - 0x039F37 0E:9F27: 01        .byte $01   ; 
- D 0 - I - 0x039F38 0E:9F28: 02        .byte $02   ; 
- D 0 - I - 0x039F39 0E:9F29: 02        .byte $02   ; 
- D 0 - I - 0x039F3A 0E:9F2A: 0A        .byte $0A   ; 
- D 0 - I - 0x039F3B 0E:9F2B: 02        .byte $02   ; 
- D 0 - I - 0x039F3C 0E:9F2C: 12        .byte $12   ; 
- D 0 - I - 0x039F3D 0E:9F2D: 02        .byte $02   ; 
- D 0 - I - 0x039F3E 0E:9F2E: 1A        .byte $1A   ; 
- D 0 - I - 0x039F3F 0E:9F2F: 02        .byte $02   ; 
- D 0 - I - 0x039F40 0E:9F30: 22        .byte $22   ; 
- D 0 - I - 0x039F41 0E:9F31: 02        .byte $02   ; 
- D 0 - I - 0x039F42 0E:9F32: 2A        .byte $2A   ; 
- D 0 - I - 0x039F43 0E:9F33: 02        .byte $02   ; 
- D 0 - I - 0x039F44 0E:9F34: 32        .byte $32   ; <2>
- D 0 - I - 0x039F45 0E:9F35: 02        .byte $02   ; 
- D 0 - I - 0x039F46 0E:9F36: 3A        .byte $3A   ; 
- D 0 - I - 0x039F47 0E:9F37: 02        .byte $02   ; 
- D 0 - I - 0x039F48 0E:9F38: 42        .byte $42   ; <B>
- D 0 - I - 0x039F49 0E:9F39: 02        .byte $02   ; 
- D 0 - I - 0x039F4A 0E:9F3A: 4A        .byte $4A   ; <J>
- D 0 - I - 0x039F4B 0E:9F3B: 02        .byte $02   ; 
- D 0 - I - 0x039F4C 0E:9F3C: 52        .byte $52   ; <R>
- D 0 - I - 0x039F4D 0E:9F3D: 02        .byte $02   ; 
- D 0 - I - 0x039F4E 0E:9F3E: 5A        .byte $5A   ; <Z>
- D 0 - I - 0x039F4F 0E:9F3F: 02        .byte $02   ; 
- D 0 - I - 0x039F50 0E:9F40: 62        .byte $62   ; <b>
- D 0 - I - 0x039F51 0E:9F41: 02        .byte $02   ; 
- D 0 - I - 0x039F52 0E:9F42: 6A        .byte $6A   ; <j>
- D 0 - I - 0x039F53 0E:9F43: 02        .byte $02   ; 
- D 0 - I - 0x039F54 0E:9F44: 72        .byte $72   ; <r>
- D 0 - I - 0x039F55 0E:9F45: 02        .byte $02   ; 
- D 0 - I - 0x039F56 0E:9F46: 7A        .byte $7A   ; <z>
- D 0 - I - 0x039F57 0E:9F47: 02        .byte $02   ; 
- D 0 - I - 0x039F58 0E:9F48: 82        .byte $82   ; 
- D 0 - I - 0x039F59 0E:9F49: 02        .byte $02   ; 
- D 0 - I - 0x039F5A 0E:9F4A: 8A        .byte $8A   ; 
- D 0 - I - 0x039F5B 0E:9F4B: 02        .byte $02   ; 
- D 0 - I - 0x039F5C 0E:9F4C: 92        .byte $92   ; 
- D 0 - I - 0x039F5D 0E:9F4D: 02        .byte $02   ; 
- D 0 - I - 0x039F5E 0E:9F4E: 98        .byte $98   ; 
- D 0 - I - 0x039F5F 0E:9F4F: 02        .byte $02   ; 
- D 0 - I - 0x039F60 0E:9F50: 9E        .byte $9E   ; 
- D 0 - I - 0x039F61 0E:9F51: 02        .byte $02   ; 
- D 0 - I - 0x039F62 0E:9F52: A4        .byte $A4   ; 
- D 0 - I - 0x039F63 0E:9F53: 02        .byte $02   ; 
- D 0 - I - 0x039F64 0E:9F54: AA        .byte $AA   ; 
- D 0 - I - 0x039F65 0E:9F55: 02        .byte $02   ; 
- D 0 - I - 0x039F66 0E:9F56: B0        .byte $B0   ; 
- D 0 - I - 0x039F67 0E:9F57: 02        .byte $02   ; 
- D 0 - I - 0x039F68 0E:9F58: B6        .byte $B6   ; 
- D 0 - I - 0x039F69 0E:9F59: 02        .byte $02   ; 
- D 0 - I - 0x039F6A 0E:9F5A: BC        .byte $BC   ; 
- D 0 - I - 0x039F6B 0E:9F5B: 02        .byte $02   ; 
- D 0 - I - 0x039F6C 0E:9F5C: C2        .byte $C2   ; 
- D 0 - I - 0x039F6D 0E:9F5D: 02        .byte $02   ; 
- D 0 - I - 0x039F6E 0E:9F5E: C8        .byte $C8   ; 
- D 0 - I - 0x039F6F 0E:9F5F: 02        .byte $02   ; 
- D 0 - I - 0x039F70 0E:9F60: CE        .byte $CE   ; 
- D 0 - I - 0x039F71 0E:9F61: 02        .byte $02   ; 
- D 0 - I - 0x039F72 0E:9F62: D4        .byte $D4   ; 
- D 0 - I - 0x039F73 0E:9F63: 02        .byte $02   ; 
- D 0 - I - 0x039F74 0E:9F64: DA        .byte $DA   ; 
- D 0 - I - 0x039F75 0E:9F65: 02        .byte $02   ; 
- D 0 - I - 0x039F76 0E:9F66: E0        .byte $E0   ; 
- D 0 - I - 0x039F77 0E:9F67: 02        .byte $02   ; 
- D 0 - I - 0x039F78 0E:9F68: E6        .byte $E6   ; 
- D 0 - I - 0x039F79 0E:9F69: 02        .byte $02   ; 
- D 0 - I - 0x039F7A 0E:9F6A: EC        .byte $EC   ; 
- D 0 - I - 0x039F7B 0E:9F6B: 02        .byte $02   ; 
- D 0 - I - 0x039F7C 0E:9F6C: F0        .byte $F0   ; 
- D 0 - I - 0x039F7D 0E:9F6D: 02        .byte $02   ; 
- D 0 - I - 0x039F7E 0E:9F6E: F6        .byte $F6   ; 
- D 0 - I - 0x039F7F 0E:9F6F: 02        .byte $02   ; 
- D 0 - I - 0x039F80 0E:9F70: FC        .byte $FC   ; 
- D 0 - I - 0x039F81 0E:9F71: 02        .byte $02   ; 
- D 0 - I - 0x039F82 0E:9F72: 02        .byte $02   ; 
- D 0 - I - 0x039F83 0E:9F73: 03        .byte $03   ; 
- D 0 - I - 0x039F84 0E:9F74: 08        .byte $08   ; 
- D 0 - I - 0x039F85 0E:9F75: 03        .byte $03   ; 
- D 0 - I - 0x039F86 0E:9F76: 0E        .byte $0E   ; 
- D 0 - I - 0x039F87 0E:9F77: 03        .byte $03   ; 
- D 0 - I - 0x039F88 0E:9F78: 14        .byte $14   ; 
- D 0 - I - 0x039F89 0E:9F79: 03        .byte $03   ; 
- D 0 - I - 0x039F8A 0E:9F7A: 1A        .byte $1A   ; 
- D 0 - I - 0x039F8B 0E:9F7B: 03        .byte $03   ; 
- D 0 - I - 0x039F8C 0E:9F7C: 20        .byte $20   ; 
- D 0 - I - 0x039F8D 0E:9F7D: 03        .byte $03   ; 
- D 0 - I - 0x039F8E 0E:9F7E: 26        .byte $26   ; 
- D 0 - I - 0x039F8F 0E:9F7F: 03        .byte $03   ; 
- D 0 - I - 0x039F90 0E:9F80: 2C        .byte $2C   ; 
- D 0 - I - 0x039F91 0E:9F81: 03        .byte $03   ; 
- D 0 - I - 0x039F92 0E:9F82: 32        .byte $32   ; <2>
- D 0 - I - 0x039F93 0E:9F83: 03        .byte $03   ; 
- D 0 - I - 0x039F94 0E:9F84: 38        .byte $38   ; <8>
- D 0 - I - 0x039F95 0E:9F85: 03        .byte $03   ; 
- D 0 - I - 0x039F96 0E:9F86: 3E        .byte $3E   ; 
- D 0 - I - 0x039F97 0E:9F87: 03        .byte $03   ; 
- D 0 - I - 0x039F98 0E:9F88: 44        .byte $44   ; <D>
- D 0 - I - 0x039F99 0E:9F89: 03        .byte $03   ; 
- D 0 - I - 0x039F9A 0E:9F8A: 4A        .byte $4A   ; <J>
- D 0 - I - 0x039F9B 0E:9F8B: 03        .byte $03   ; 
- D 0 - I - 0x039F9C 0E:9F8C: 50        .byte $50   ; <P>
- D 0 - I - 0x039F9D 0E:9F8D: 03        .byte $03   ; 
- D 0 - I - 0x039F9E 0E:9F8E: 54        .byte $54   ; <T>
- D 0 - I - 0x039F9F 0E:9F8F: 03        .byte $03   ; 
- D 0 - I - 0x039FA0 0E:9F90: 58        .byte $58   ; <X>
- D 0 - I - 0x039FA1 0E:9F91: 03        .byte $03   ; 
- D 0 - I - 0x039FA2 0E:9F92: 5C        .byte $5C   ; 
- D 0 - I - 0x039FA3 0E:9F93: 03        .byte $03   ; 
- D 0 - I - 0x039FA4 0E:9F94: 60        .byte $60   ; 
- D 0 - I - 0x039FA5 0E:9F95: 03        .byte $03   ; 
- D 0 - I - 0x039FA6 0E:9F96: 64        .byte $64   ; <d>
- D 0 - I - 0x039FA7 0E:9F97: 03        .byte $03   ; 
- D 0 - I - 0x039FA8 0E:9F98: 68        .byte $68   ; <h>
- D 0 - I - 0x039FA9 0E:9F99: 03        .byte $03   ; 
- D 0 - I - 0x039FAA 0E:9F9A: 6C        .byte $6C   ; <l>
- D 0 - I - 0x039FAB 0E:9F9B: 03        .byte $03   ; 
- D 0 - I - 0x039FAC 0E:9F9C: 70        .byte $70   ; <p>
- D 0 - I - 0x039FAD 0E:9F9D: 03        .byte $03   ; 
- D 0 - I - 0x039FAE 0E:9F9E: 74        .byte $74   ; <t>
- D 0 - I - 0x039FAF 0E:9F9F: 03        .byte $03   ; 
- D 0 - I - 0x039FB0 0E:9FA0: 78        .byte $78   ; <x>
- D 0 - I - 0x039FB1 0E:9FA1: 03        .byte $03   ; 
- D 0 - I - 0x039FB2 0E:9FA2: 7C        .byte $7C   ; 
- D 0 - I - 0x039FB3 0E:9FA3: 03        .byte $03   ; 
- D 0 - I - 0x039FB4 0E:9FA4: 80        .byte $80   ; 
- D 0 - I - 0x039FB5 0E:9FA5: 03        .byte $03   ; 
- D 0 - I - 0x039FB6 0E:9FA6: 84        .byte $84   ; 
- D 0 - I - 0x039FB7 0E:9FA7: 03        .byte $03   ; 
- D 0 - I - 0x039FB8 0E:9FA8: 88        .byte $88   ; 
- D 0 - I - 0x039FB9 0E:9FA9: 03        .byte $03   ; 
- D 0 - I - 0x039FBA 0E:9FAA: 8C        .byte $8C   ; 
- D 0 - I - 0x039FBB 0E:9FAB: 03        .byte $03   ; 
- D 0 - I - 0x039FBC 0E:9FAC: 90        .byte $90   ; 
- D 0 - I - 0x039FBD 0E:9FAD: 03        .byte $03   ; 
- D 0 - I - 0x039FBE 0E:9FAE: 94        .byte $94   ; 
- D 0 - I - 0x039FBF 0E:9FAF: 03        .byte $03   ; 
- D 0 - I - 0x039FC0 0E:9FB0: 98        .byte $98   ; 
- D 0 - I - 0x039FC1 0E:9FB1: 03        .byte $03   ; 
- D 0 - I - 0x039FC2 0E:9FB2: 9C        .byte $9C   ; 
- D 0 - I - 0x039FC3 0E:9FB3: 03        .byte $03   ; 
- - - - - - 0x039FC4 0E:9FB4: A0        .byte $A0   ; 
- - - - - - 0x039FC5 0E:9FB5: 03        .byte $03   ; 
- - - - - - 0x039FC6 0E:9FB6: A4        .byte $A4   ; 
- - - - - - 0x039FC7 0E:9FB7: 03        .byte $03   ; 
- D 0 - I - 0x039FC8 0E:9FB8: A8        .byte $A8   ; 
- D 0 - I - 0x039FC9 0E:9FB9: 03        .byte $03   ; 
- - - - - - 0x039FCA 0E:9FBA: AC        .byte $AC   ; 
- - - - - - 0x039FCB 0E:9FBB: 03        .byte $03   ; 
- - - - - - 0x039FCC 0E:9FBC: B0        .byte $B0   ; 
- - - - - - 0x039FCD 0E:9FBD: 03        .byte $03   ; 
- - - - - - 0x039FCE 0E:9FBE: B4        .byte $B4   ; 
- - - - - - 0x039FCF 0E:9FBF: 03        .byte $03   ; 
- - - - - - 0x039FD0 0E:9FC0: B8        .byte $B8   ; 
- - - - - - 0x039FD1 0E:9FC1: 03        .byte $03   ; 
- - - - - - 0x039FD2 0E:9FC2: BC        .byte $BC   ; 
- - - - - - 0x039FD3 0E:9FC3: 03        .byte $03   ; 
- - - - - - 0x039FD4 0E:9FC4: C0        .byte $C0   ; 
- - - - - - 0x039FD5 0E:9FC5: 03        .byte $03   ; 
- D 0 - I - 0x039FD6 0E:9FC6: C4        .byte $C4   ; 
- D 0 - I - 0x039FD7 0E:9FC7: 03        .byte $03   ; 
- - - - - - 0x039FD8 0E:9FC8: C8        .byte $C8   ; 
- - - - - - 0x039FD9 0E:9FC9: 03        .byte $03   ; 
- - - - - - 0x039FDA 0E:9FCA: CC        .byte $CC   ; 
- - - - - - 0x039FDB 0E:9FCB: 03        .byte $03   ; 
- D 0 - I - 0x039FDC 0E:9FCC: D0        .byte $D0   ; 
- D 0 - I - 0x039FDD 0E:9FCD: 03        .byte $03   ; 
- D 0 - I - 0x039FDE 0E:9FCE: 00        .byte $00   ; 
- D 0 - I - 0x039FDF 0E:9FCF: 00        .byte $00   ; 
- D 0 - I - 0x039FE0 0E:9FD0: 00        .byte $00   ; 
- D 0 - I - 0x039FE1 0E:9FD1: 00        .byte $00   ; 
- D 0 - I - 0x039FE2 0E:9FD2: 00        .byte $00   ; 
- D 0 - I - 0x039FE3 0E:9FD3: 00        .byte $00   ; 
- D 0 - I - 0x039FE4 0E:9FD4: 00        .byte $00   ; 
- D 0 - I - 0x039FE5 0E:9FD5: 00        .byte $00   ; 
- D 0 - I - 0x039FE6 0E:9FD6: 00        .byte $00   ; 
- D 0 - I - 0x039FE7 0E:9FD7: 00        .byte $00   ; 
- D 0 - I - 0x039FE8 0E:9FD8: 00        .byte $00   ; 
- D 0 - I - 0x039FE9 0E:9FD9: 00        .byte $00   ; 
- D 0 - I - 0x039FEA 0E:9FDA: 00        .byte $00   ; 
- D 0 - I - 0x039FEB 0E:9FDB: 00        .byte $00   ; 
- D 0 - I - 0x039FEC 0E:9FDC: 00        .byte $00   ; 
- D 0 - I - 0x039FED 0E:9FDD: 00        .byte $00   ; 
- D 0 - I - 0x039FEE 0E:9FDE: 00        .byte $00   ; 
- D 0 - I - 0x039FEF 0E:9FDF: 00        .byte $00   ; 
- D 0 - I - 0x039FF0 0E:9FE0: 00        .byte $00   ; 
- D 0 - I - 0x039FF1 0E:9FE1: 00        .byte $00   ; 
- D 0 - I - 0x039FF2 0E:9FE2: 00        .byte $00   ; 
- D 0 - I - 0x039FF3 0E:9FE3: 00        .byte $00   ; 
- D 0 - I - 0x039FF4 0E:9FE4: 00        .byte $00   ; 
- - - - - - 0x039FF5 0E:9FE5: 00        .byte $00   ; 
- D 0 - I - 0x039FF6 0E:9FE6: 2E        .byte $2E   ; 
- D 0 - I - 0x039FF7 0E:9FE7: 0F        .byte $0F   ; 
- D 0 - I - 0x039FF8 0E:9FE8: 15        .byte $15   ; 
- D 0 - I - 0x039FF9 0E:9FE9: 18        .byte $18   ; 
- D 0 - I - 0x039FFA 0E:9FEA: 0C        .byte $0C   ; 
- D 0 - I - 0x039FFB 0E:9FEB: 0F        .byte $0F   ; 
- D 0 - I - 0x039FFC 0E:9FEC: 0F        .byte $0F   ; 
- D 0 - I - 0x039FFD 0E:9FED: 12        .byte $12   ; 
- D 0 - I - 0x039FFE 0E:9FEE: 15        .byte $15   ; 
- D 0 - I - 0x039FFF 0E:9FEF: 0C        .byte $0C   ; 
- D 0 - I - 0x03A000 0E:9FF0: 17        .byte $17   ; 
- D 0 - I - 0x03A001 0E:9FF1: 0E        .byte $0E   ; 
- D 0 - I - 0x03A002 0E:9FF2: 0C        .byte $0C   ; 
- D 0 - I - 0x03A003 0E:9FF3: 10        .byte $10   ; 
- D 0 - I - 0x03A004 0E:9FF4: 0E        .byte $0E   ; 
- D 0 - I - 0x03A005 0E:9FF5: 12        .byte $12   ; 
- D 0 - I - 0x03A006 0E:9FF6: 15        .byte $15   ; 
- D 0 - I - 0x03A007 0E:9FF7: 0C        .byte $0C   ; 
- D 0 - I - 0x03A008 0E:9FF8: 17        .byte $17   ; 
- D 0 - I - 0x03A009 0E:9FF9: 0E        .byte $0E   ; 
- D 0 - I - 0x03A00A 0E:9FFA: 0C        .byte $0C   ; 
- D 0 - I - 0x03A00B 0E:9FFB: 10        .byte $10   ; 
- D 0 - I - 0x03A00C 0E:9FFC: 0E        .byte $0E   ; 
- - - - - - 0x03A00D 0E:9FFD: 00        .byte $00   ; 
- D 0 - I - 0x03A00E 0E:9FFE: 20        .byte $20   ; 
- D 0 - I - 0x03A00F 0E:9FFF: 0E        .byte $0E   ; 



