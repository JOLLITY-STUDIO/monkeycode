; bank_28.asm 分片 1/7 (原文件行 1-1000, 共 6754 行)

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
C D 0 - - - 0x0384D1 0E:84C1: AD FB 05  LDA ram_05FB
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