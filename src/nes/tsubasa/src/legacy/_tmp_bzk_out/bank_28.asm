; ===== MMC3 Bank 28 =====
; ROM: 0x038010-0x03A00F
; CPU: $8000-$9FFF
; CDL: code=2871 data=4189 unaccessed=1132

  0x038010 $8000: C-----  4C 2D 80 JMP  $802D
  0x038013 $8003: C-----  4C 22 8B JMP  $8B22
  0x038016 $8006: C--J--  4C 09 86 JMP  $8609
  0x038019 $8009: C-----  4C 06 8C JMP  $8C06
  0x03801C $800C: C-----  4C 58 8D JMP  $8D58
  0x03801F $800F: ------  .byte $4C
  0x038020 $8010: ------  .byte $A6
  0x038021 $8011: ------  .byte $8D
  0x038022 $8012: C--J--  4C 9D 81 JMP  $819D
  0x038025 $8015: C--J--  4C 24 82 JMP  $8224
  0x038028 $8018: C--J--  4C 8F 82 JMP  $828F
  0x03802B $801B: C--J--  4C 2E 85 JMP  $852E
  0x03802E $801E: C--J--  4C 6A 84 JMP  $846A
  0x038031 $8021: ------  .byte $4C
  0x038032 $8022: ------  .byte $21
  0x038033 $8023: ------  .byte $80
  0x038034 $8024: C-----  4C CA 82 JMP  $82CA
  0x038037 $8027: C--J--  4C FF 84 JMP  $84FF
  0x03803A $802A: C--J--  4C C1 84 JMP  $84C1
  0x03803D $802D: C-----  20 3A 80 JSR  $803A
  0x038040 $8030: C-----  B9 4E 9E LDA  $9E4E,Y
  0x038043 $8033: C-----  85 32    STA  $32
  0x038045 $8035: C-----  A9 00    LDA  #$00
  0x038047 $8037: C-----  85 33    STA  $33
  0x038049 $8039: C-----  60       RTS  
  0x03804A $803A: C-----  48       PHA  
  0x03804B $803B: C-----  20 0C C5 JSR  $C50C
  0x03804E $803E: C-----  A0 00    LDY  #$00
  0x038050 $8040: C-----  B1 34    LDA  ($34),Y
  0x038052 $8042: C-----  D0 0C    BNE  $8050
  0x038054 $8044: C-----  68       PLA  
  0x038055 $8045: C-----  48       PHA  
  0x038056 $8046: C-----  38       SEC  
  0x038057 $8047: C-----  E9 0B    SBC  #$0B
  0x038059 $8049: C-----  A8       TAY  
  0x03805A $804A: C-----  B9 8E 81 LDA  $818E,Y
  0x03805D $804D: C-----  A8       TAY  
  0x03805E $804E: C-----  B1 38    LDA  ($38),Y
  0x038060 $8050: C-----  C9 23    CMP  #$23
  0x038062 $8052: C-----  08       PHP  
  0x038063 $8053: C-----  90 0F    BCC  $8064
  0x038065 $8055: C-----  48       PHA  
  0x038066 $8056: C-----  A0 01    LDY  #$01
  0x038068 $8058: C-----  B1 34    LDA  ($34),Y
  0x03806A $805A: C-----  10 05    BPL  $8061
  0x03806C $805C: C-----  68       PLA  
  0x03806D $805D: C-----  C8       INY  
  0x03806E $805E: C-----  B1 34    LDA  ($34),Y
  0x038070 $8060: C-----  48       PHA  
  0x038071 $8061: C-----  68       PLA  
  0x038072 $8062: C-----  E9 23    SBC  #$23
  0x038074 $8064: C-----  A0 00    LDY  #$00
  0x038076 $8066: C-----  84 33    STY  $33
  0x038078 $8068: C-----  0A       ASL  A
  0x038079 $8069: C-----  26 33    ROL  $33
  0x03807B $806B: C-----  0A       ASL  A
  0x03807C $806C: C-----  26 33    ROL  $33
  0x03807E $806E: C-----  85 32    STA  $32
  0x038080 $8070: C-----  28       PLP  
  0x038081 $8071: C-----  90 10    BCC  $8083
  0x038083 $8073: C-----  A4 33    LDY  $33
  0x038085 $8075: C-----  0A       ASL  A
  0x038086 $8076: C-----  26 33    ROL  $33
  0x038088 $8078: C-----  65 32    ADC  $32
  0x03808A $807A: C-----  85 32    STA  $32
  0x03808C $807C: C-----  98       TYA  
  0x03808D $807D: C-----  65 33    ADC  $33
  0x03808F $807F: C-----  85 33    STA  $33
  0x038091 $8081: C-----  A0 02    LDY  #$02
  0x038093 $8083: C-----  18       CLC  
  0x038094 $8084: C-----  A5 32    LDA  $32
  0x038096 $8086: C-----  79 99 81 ADC  $8199,Y
  0x038099 $8089: C-----  85 32    STA  $32
  0x03809B $808B: C-----  A5 33    LDA  $33
  0x03809D $808D: C-----  79 9A 81 ADC  $819A,Y
  0x0380A0 $8090: C-----  85 33    STA  $33
  0x0380A2 $8092: C-----  68       PLA  
  0x0380A3 $8093: C-----  E0 1F    CPX  #$1F
  0x0380A5 $8095: C-----  90 03    BCC  $809A
  0x0380A7 $8097: C-----  4C 3F 81 JMP  $813F
  0x0380AA $809A: C-----  48       PHA  
  0x0380AB $809B: C-----  68       PLA  
  0x0380AC $809C: C-----  F0 0A    BEQ  $80A8
  0x0380AE $809E: C-----  C9 0B    CMP  #$0B
  0x0380B0 $80A0: C-----  F0 06    BEQ  $80A8
  0x0380B2 $80A2: C-----  C9 1E    CMP  #$1E
  0x0380B4 $80A4: C-----  F0 02    BEQ  $80A8
  0x0380B6 $80A6: C-----  C9 1F    CMP  #$1F
  0x0380B8 $80A8: C-----  08       PHP  
  0x0380B9 $80A9: C-----  A0 00    LDY  #$00
  0x0380BB $80AB: C-----  B1 32    LDA  ($32),Y
  0x0380BD $80AD: C-----  84 33    STY  $33
  0x0380BF $80AF: C-----  28       PLP  
  0x0380C0 $80B0: C-----  D0 1F    BNE  $80D1
  0x0380C2 $80B2: C-----  0A       ASL  A
  0x0380C3 $80B3: C-----  26 33    ROL  $33
  0x0380C5 $80B5: C-----  0A       ASL  A
  0x0380C6 $80B6: C-----  26 33    ROL  $33
  0x0380C8 $80B8: C-----  0A       ASL  A
  0x0380C9 $80B9: C-----  26 33    ROL  $33
  0x0380CB $80BB: C-----  69 86    ADC  #$86
  0x0380CD $80BD: C-----  85 32    STA  $32
  0x0380CF $80BF: C-----  A5 33    LDA  $33
  0x0380D1 $80C1: C-----  69 AE    ADC  #$AE
  0x0380D3 $80C3: C-----  85 33    STA  $33
  0x0380D5 $80C5: C-----  8A       TXA  
  0x0380D6 $80C6: C-----  F0 03    BEQ  $80CB
  0x0380D8 $80C8: C-----  38       SEC  
  0x0380D9 $80C9: C-----  E9 17    SBC  #$17
  0x0380DB $80CB: C-----  A8       TAY  
  0x0380DC $80CC: C-----  B1 32    LDA  ($32),Y
  0x0380DE $80CE: C-----  4C F9 80 JMP  $80F9
  0x0380E1 $80D1: C-----  0A       ASL  A
  0x0380E2 $80D2: C-----  26 33    ROL  $33
  0x0380E4 $80D4: C-----  0A       ASL  A
  0x0380E5 $80D5: C-----  26 33    ROL  $33
  0x0380E7 $80D7: C-----  0A       ASL  A
  0x0380E8 $80D8: C-----  26 33    ROL  $33
  0x0380EA $80DA: C-----  A4 33    LDY  $33
  0x0380EC $80DC: C-----  85 32    STA  $32
  0x0380EE $80DE: C-----  0A       ASL  A
  0x0380EF $80DF: C-----  26 33    ROL  $33
  0x0380F1 $80E1: C-----  65 32    ADC  $32
  0x0380F3 $80E3: C-----  85 32    STA  $32
  0x0380F5 $80E5: C-----  98       TYA  
  0x0380F6 $80E6: C-----  65 33    ADC  $33
  0x0380F8 $80E8: C-----  85 33    STA  $33
  0x0380FA $80EA: C-----  18       CLC  
  0x0380FB $80EB: C-----  A5 32    LDA  $32
  0x0380FD $80ED: C-----  69 CE    ADC  #$CE
  0x0380FF $80EF: C-----  85 32    STA  $32
  0x038101 $80F1: C-----  A5 33    LDA  $33
  0x038103 $80F3: C-----  69 9F    ADC  #$9F
  0x038105 $80F5: C-----  85 33    STA  $33
  0x038107 $80F7: C-----  8A       TXA  
  0x038108 $80F8: C-----  A8       TAY  
  0x038109 $80F9: C-----  8A       TXA  
  0x03810A $80FA: C-----  F0 17    BEQ  $8113
  0x03810C $80FC: C-----  B1 32    LDA  ($32),Y
  0x03810E $80FE: C-----  48       PHA  
  0x03810F $80FF: C-----  A0 03    LDY  #$03
  0x038111 $8101: C-----  B1 34    LDA  ($34),Y
  0x038113 $8103: C-----  0A       ASL  A
  0x038114 $8104: C-----  85 32    STA  $32
  0x038116 $8106: C-----  68       PLA  
  0x038117 $8107: C-----  65 32    ADC  $32
  0x038119 $8109: C-----  A8       TAY  
  0x03811A $810A: C-----  C0 C0    CPY  #$C0
  0x03811C $810C: C-----  90 02    BCC  $8110
  0x03811E $810E: ------  .byte $A0
  0x03811F $810F: ------  .byte $BF
  0x038120 $8110: C-----  84 32    STY  $32
  0x038122 $8112: C-----  60       RTS  
  0x038123 $8113: C-----  B1 32    LDA  ($32),Y
  0x038125 $8115: C-----  48       PHA  
  0x038126 $8116: C-----  A0 03    LDY  #$03
  0x038128 $8118: C-----  B1 34    LDA  ($34),Y
  0x03812A $811A: C-----  85 32    STA  $32
  0x03812C $811C: C-----  68       PLA  
  0x03812D $811D: C-----  65 32    ADC  $32
  0x03812F $811F: C-----  C9 5F    CMP  #$5F
  0x038131 $8121: C-----  90 02    BCC  $8125
  0x038133 $8123: ------  .byte $A9
  0x038134 $8124: ------  .byte $5F
  0x038135 $8125: C-----  A0 9F    LDY  #$9F
  0x038137 $8127: C-----  0A       ASL  A
  0x038138 $8128: C-----  90 01    BCC  $812B
  0x03813A $812A: ------  .byte $C8
  0x03813B $812B: C-----  84 33    STY  $33
  0x03813D $812D: C-----  A0 0E    LDY  #$0E
  0x03813F $812F: C-----  84 32    STY  $32
  0x038141 $8131: C-----  A8       TAY  
  0x038142 $8132: C-----  B1 32    LDA  ($32),Y
  0x038144 $8134: C-----  AA       TAX  
  0x038145 $8135: C-----  C8       INY  
  0x038146 $8136: C-----  B1 32    LDA  ($32),Y
  0x038148 $8138: C-----  85 33    STA  $33
  0x03814A $813A: C-----  86 32    STX  $32
  0x03814C $813C: C-----  4C 8B 81 JMP  $818B
  0x03814F $813F: C-----  E0 25    CPX  #$25
  0x038151 $8141: C-----  B0 3B    BCS  $817E
  0x038153 $8143: C-----  A0 01    LDY  #$01
  0x038155 $8145: C-----  B1 32    LDA  ($32),Y
  0x038157 $8147: C-----  88       DEY  
  0x038158 $8148: C-----  84 33    STY  $33
  0x03815A $814A: C-----  0A       ASL  A
  0x03815B $814B: C-----  26 33    ROL  $33
  0x03815D $814D: C-----  0A       ASL  A
  0x03815E $814E: C-----  26 33    ROL  $33
  0x038160 $8150: C-----  85 32    STA  $32
  0x038162 $8152: C-----  A4 33    LDY  $33
  0x038164 $8154: C-----  0A       ASL  A
  0x038165 $8155: C-----  26 33    ROL  $33
  0x038167 $8157: C-----  65 32    ADC  $32
  0x038169 $8159: C-----  85 32    STA  $32
  0x03816B $815B: C-----  98       TYA  
  0x03816C $815C: C-----  65 33    ADC  $33
  0x03816E $815E: C-----  A8       TAY  
  0x03816F $815F: C-----  A5 32    LDA  $32
  0x038171 $8161: C-----  18       CLC  
  0x038172 $8162: C-----  69 AE    ADC  #$AE
  0x038174 $8164: C-----  85 32    STA  $32
  0x038176 $8166: C-----  98       TYA  
  0x038177 $8167: C-----  69 AF    ADC  #$AF
  0x038179 $8169: C-----  85 33    STA  $33
  0x03817B $816B: C-----  8A       TXA  
  0x03817C $816C: C-----  38       SEC  
  0x03817D $816D: C-----  E9 1F    SBC  #$1F
  0x03817F $816F: C-----  0A       ASL  A
  0x038180 $8170: C-----  A8       TAY  
  0x038181 $8171: C-----  B1 32    LDA  ($32),Y
  0x038183 $8173: C-----  AA       TAX  
  0x038184 $8174: C-----  C8       INY  
  0x038185 $8175: C-----  B1 32    LDA  ($32),Y
  0x038187 $8177: C-----  85 33    STA  $33
  0x038189 $8179: C-----  86 32    STX  $32
  0x03818B $817B: C-----  4C 8B 81 JMP  $818B
  0x03818E $817E: C-----  8A       TXA  
  0x03818F $817F: C-----  38       SEC  
  0x038190 $8180: C-----  E9 23    SBC  #$23
  0x038192 $8182: C-----  A8       TAY  
  0x038193 $8183: C-----  B1 32    LDA  ($32),Y
  0x038195 $8185: C-----  85 32    STA  $32
  0x038197 $8187: C-----  A9 00    LDA  #$00
  0x038199 $8189: C-----  85 33    STA  $33
  0x03819B $818B: C-----  68       PLA  
  0x03819C $818C: C-----  68       PLA  
  0x03819D $818D: C-----  60       RTS  
  0x03819E $818E: -D0---  .byte $02
  0x03819F $818F: -D0---  .byte $03
  0x0381A0 $8190: -D0---  .byte $03
  0x0381A1 $8191: -D0---  .byte $03
  0x0381A2 $8192: -D0---  .byte $03
  0x0381A3 $8193: -D0---  .byte $04
  0x0381A4 $8194: -D0---  .byte $05
  0x0381A5 $8195: -D0---  .byte $04
  0x0381A6 $8196: -D0---  .byte $05
  0x0381A7 $8197: -D0---  .byte $04
  0x0381A8 $8198: -D0---  .byte $05
  0x0381A9 $8199: -D0---  .byte $D6
  0x0381AA $819A: -D0---  .byte $95
  0x0381AB $819B: -D0---  .byte $62
  0x0381AC $819C: -D0---  .byte $96
  0x0381AD $819D: C-----  AD 3B 04 LDA  $043B
  0x0381B0 $81A0: C-----  08       PHP  
  0x0381B1 $81A1: C-----  0A       ASL  A
  0x0381B2 $81A2: C-----  6D 3B 04 ADC  $043B
  0x0381B5 $81A5: C-----  6D 4E 04 ADC  $044E
  0x0381B8 $81A8: C-----  A8       TAY  
  0x0381B9 $81A9: C-----  28       PLP  
  0x0381BA $81AA: C-----  D0 0F    BNE  $81BB
  0x0381BC $81AC: C-----  AD 3C 04 LDA  $043C
  0x0381BF $81AF: C-----  29 7F    AND  #$7F
  0x0381C1 $81B1: C-----  C9 03    CMP  #$03
  0x0381C3 $81B3: C-----  90 06    BCC  $81BB
  0x0381C5 $81B5: C-----  98       TYA  
  0x0381C6 $81B6: C-----  38       SEC  
  0x0381C7 $81B7: C-----  ED 4E 04 SBC  $044E
  0x0381CA $81BA: C-----  A8       TAY  
  0x0381CB $81BB: C-----  BE 06 82 LDX  $8206,Y
  0x0381CE $81BE: C-----  E0 FF    CPX  #$FF
  0x0381D0 $81C0: C-----  F0 41    BEQ  $8203
  0x0381D2 $81C2: C-----  AD 41 04 LDA  $0441
  0x0381D5 $81C5: C-----  20 3A 80 JSR  $803A
  0x0381D8 $81C8: C-----  98       TYA  
  0x0381D9 $81C9: C-----  48       PHA  
  0x0381DA $81CA: C-----  AD 3B 04 LDA  $043B
  0x0381DD $81CD: C-----  0A       ASL  A
  0x0381DE $81CE: C-----  AA       TAX  
  0x0381DF $81CF: C-----  BD 60 94 LDA  $9460,X
  0x0381E2 $81D2: C-----  85 32    STA  $32
  0x0381E4 $81D4: C-----  BD 61 94 LDA  $9461,X
  0x0381E7 $81D7: C-----  85 33    STA  $33
  0x0381E9 $81D9: C-----  AD 3C 04 LDA  $043C
  0x0381EC $81DC: C-----  0A       ASL  A
  0x0381ED $81DD: C-----  0A       ASL  A
  0x0381EE $81DE: C-----  A8       TAY  
  0x0381EF $81DF: C-----  B1 32    LDA  ($32),Y
  0x0381F1 $81E1: C-----  8D 44 04 STA  $0444
  0x0381F4 $81E4: C-----  C8       INY  
  0x0381F5 $81E5: C-----  B1 32    LDA  ($32),Y
  0x0381F7 $81E7: C-----  AA       TAX  
  0x0381F8 $81E8: C-----  C8       INY  
  0x0381F9 $81E9: C-----  B1 32    LDA  ($32),Y
  0x0381FB $81EB: C-----  8D 3F 04 STA  $043F
  0x0381FE $81EE: C-----  C8       INY  
  0x0381FF $81EF: C-----  B1 32    LDA  ($32),Y
  0x038201 $81F1: C-----  29 03    AND  #$03
  0x038203 $81F3: C-----  8D 40 04 STA  $0440
  0x038206 $81F6: C-----  B1 32    LDA  ($32),Y
  0x038208 $81F8: C-----  29 F8    AND  #$F8
  0x03820A $81FA: C-----  4A       LSR  A
  0x03820B $81FB: C-----  4A       LSR  A
  0x03820C $81FC: C-----  4A       LSR  A
  0x03820D $81FD: C-----  8D 43 04 STA  $0443
  0x038210 $8200: C-----  4C 78 82 JMP  $8278
  0x038213 $8203: ------  .byte $4C
  0x038214 $8204: ------  .byte $03
  0x038215 $8205: ------  .byte $82
  0x038216 $8206: -D0---  .byte $01
  0x038217 $8207: -D0---  .byte $07
  0x038218 $8208: -D0---  .byte $0F
  0x038219 $8209: -D0---  .byte $02
  0x03821A $820A: -D0---  .byte $08
  0x03821B $820B: -D0---  .byte $10
  0x03821C $820C: -D0---  .byte $03
  0x03821D $820D: ------  .byte $FF
  0x03821E $820E: ------  .byte $FF
  0x03821F $820F: -D0---  .byte $02
  0x038220 $8210: ------  .byte $FF
  0x038221 $8211: ------  .byte $FF
  0x038222 $8212: ------  .byte $FF
  0x038223 $8213: -D0---  .byte $09
  0x038224 $8214: -D0---  .byte $11
  0x038225 $8215: ------  .byte $FF
  0x038226 $8216: -D0---  .byte $0A
  0x038227 $8217: -D0---  .byte $12
  0x038228 $8218: ------  .byte $FF
  0x038229 $8219: -D0---  .byte $0B
  0x03822A $821A: -D0---  .byte $13
  0x03822B $821B: -D0---  .byte $01
  0x03822C $821C: ------  .byte $FF
  0x03822D $821D: ------  .byte $FF
  0x03822E $821E: -D0---  .byte $01
  0x03822F $821F: ------  .byte $FF
  0x038230 $8220: ------  .byte $FF
  0x038231 $8221: -D0---  .byte $01
  0x038232 $8222: ------  .byte $FF
  0x038233 $8223: ------  .byte $FF
  0x038234 $8224: C-----  AD 3D 04 LDA  $043D
  0x038237 $8227: C-----  0A       ASL  A
  0x038238 $8228: C-----  6D 3D 04 ADC  $043D
  0x03823B $822B: C-----  6D 4E 04 ADC  $044E
  0x03823E $822E: C-----  A8       TAY  
  0x03823F $822F: C-----  BE 4C 82 LDX  $824C,Y
  0x038242 $8232: C-----  AD 42 04 LDA  $0442
  0x038245 $8235: C-----  20 3A 80 JSR  $803A
  0x038248 $8238: C-----  98       TYA  
  0x038249 $8239: C-----  48       PHA  
  0x03824A $823A: C-----  AD 3D 04 LDA  $043D
  0x03824D $823D: C-----  0A       ASL  A
  0x03824E $823E: C-----  AA       TAX  
  0x03824F $823F: C-----  BD 54 95 LDA  $9554,X
  0x038252 $8242: C-----  85 32    STA  $32
  0x038254 $8244: C-----  BD 55 95 LDA  $9555,X
  0x038257 $8247: C-----  85 33    STA  $33
  0x038259 $8249: C-----  4C 5B 82 JMP  $825B
  0x03825C $824C: -D0---  .byte $04
  0x03825D $824D: -D0---  .byte $04
  0x03825E $824E: -D0---  .byte $04
  0x03825F $824F: -D0---  .byte $05
  0x038260 $8250: -D0---  .byte $05
  0x038261 $8251: -D0---  .byte $05
  0x038262 $8252: -D0---  .byte $06
  0x038263 $8253: -D0---  .byte $0E
  0x038264 $8254: -D0---  .byte $16
  0x038265 $8255: ------  .byte $FF
  0x038266 $8256: -D0---  .byte $0C
  0x038267 $8257: -D0---  .byte $14
  0x038268 $8258: ------  .byte $FF
  0x038269 $8259: -D0---  .byte $0D
  0x03826A $825A: -D0---  .byte $15
  0x03826B $825B: C-----  AD 3E 04 LDA  $043E
  0x03826E $825E: C-----  0A       ASL  A
  0x03826F $825F: C-----  0A       ASL  A
  0x038270 $8260: C-----  A8       TAY  
  0x038271 $8261: C-----  B1 32    LDA  ($32),Y
  0x038273 $8263: C-----  8D 45 04 STA  $0445
  0x038276 $8266: C-----  C8       INY  
  0x038277 $8267: C-----  B1 32    LDA  ($32),Y
  0x038279 $8269: C-----  AA       TAX  
  0x03827A $826A: C-----  C8       INY  
  0x03827B $826B: C-----  B1 32    LDA  ($32),Y
  0x03827D $826D: C-----  8D 3F 04 STA  $043F
  0x038280 $8270: C-----  C8       INY  
  0x038281 $8271: C-----  B1 32    LDA  ($32),Y
  0x038283 $8273: C-----  29 03    AND  #$03
  0x038285 $8275: C-----  8D 40 04 STA  $0440
  0x038288 $8278: C-----  86 32    STX  $32
  0x03828A $827A: C-----  68       PLA  
  0x03828B $827B: C-----  18       CLC  
  0x03828C $827C: C-----  65 32    ADC  $32
  0x03828E $827E: C-----  C9 C0    CMP  #$C0
  0x038290 $8280: C-----  90 02    BCC  $8284
  0x038292 $8282: -D0---  .byte $A9
  0x038293 $8283: ------  .byte $BF
  0x038294 $8284: C-----  AA       TAX  
  0x038295 $8285: C-----  BD 4E 9E LDA  $9E4E,X
  0x038298 $8288: C-----  85 32    STA  $32
  0x03829A $828A: C-----  A9 00    LDA  #$00
  0x03829C $828C: C-----  85 33    STA  $33
  0x03829E $828E: C-----  60       RTS  
  0x03829F $828F: C-----  AC 3D 04 LDY  $043D
  0x0382A2 $8292: C-----  C0 03    CPY  #$03
  0x0382A4 $8294: C-----  D0 06    BNE  $829C
  0x0382A6 $8296: C-----  88       DEY  
  0x0382A7 $8297: C-----  98       TYA  
  0x0382A8 $8298: C-----  18       CLC  
  0x0382A9 $8299: C-----  69 03    ADC  #$03
  0x0382AB $829B: C-----  A8       TAY  
  0x0382AC $829C: C-----  BE C0 82 LDX  $82C0,Y
  0x0382AF $829F: C-----  AD FB 05 LDA  $05FB
  0x0382B2 $82A2: C-----  49 0B    EOR  #$0B
  0x0382B4 $82A4: C-----  20 3A 80 JSR  $803A
  0x0382B7 $82A7: C-----  98       TYA  
  0x0382B8 $82A8: C-----  48       PHA  
  0x0382B9 $82A9: C-----  AD 3D 04 LDA  $043D
  0x0382BC $82AC: C-----  0A       ASL  A
  0x0382BD $82AD: C-----  AA       TAX  
  0x0382BE $82AE: C-----  BD 9E 95 LDA  $959E,X
  0x0382C1 $82B1: C-----  85 32    STA  $32
  0x0382C3 $82B3: C-----  BD 9F 95 LDA  $959F,X
  0x0382C6 $82B6: C-----  85 33    STA  $33
  0x0382C8 $82B8: C-----  A9 00    LDA  #$00
  0x0382CA $82BA: C-----  8D 45 04 STA  $0445
  0x0382CD $82BD: C-----  4C 5B 82 JMP  $825B
  0x0382D0 $82C0: -D0---  .byte $19
  0x0382D1 $82C1: -D0---  .byte $1A
  0x0382D2 $82C2: -D0---  .byte $19
  0x0382D3 $82C3: ------  .byte $1D
  0x0382D4 $82C4: ------  .byte $1E
  0x0382D5 $82C5: -D0---  .byte $1C
  0x0382D6 $82C6: -D0---  .byte $1B
  0x0382D7 $82C7: -D0---  .byte $1A
  0x0382D8 $82C8: -D0---  .byte $1A
  0x0382D9 $82C9: -D0---  .byte $1A
  0x0382DA $82CA: C-----  20 2D C5 JSR  $C52D
  0x0382DD $82CD: C-----  A9 00    LDA  #$00
  0x0382DF $82CF: C-----  85 11    STA  $11
  0x0382E1 $82D1: C-----  85 12    STA  $12
  0x0382E3 $82D3: C-----  A9 4A    LDA  #$4A
  0x0382E5 $82D5: C-----  85 61    STA  $61
  0x0382E7 $82D7: C-----  A9 83    LDA  #$83
  0x0382E9 $82D9: C-----  85 62    STA  $62
  0x0382EB $82DB: C-----  A9 00    LDA  #$00
  0x0382ED $82DD: C-----  48       PHA  
  0x0382EE $82DE: C-----  A9 01    LDA  #$01
  0x0382F0 $82E0: C-----  20 15 C5 JSR  $C515
  0x0382F3 $82E3: C-----  AD 15 05 LDA  $0515
  0x0382F6 $82E6: C-----  D0 F6    BNE  $82DE
  0x0382F8 $82E8: C-----  A9 01    LDA  #$01
  0x0382FA $82EA: C-----  8D 15 05 STA  $0515
  0x0382FD $82ED: C-----  68       PLA  
  0x0382FE $82EE: C-----  48       PHA  
  0x0382FF $82EF: C-----  A2 00    LDX  #$00
  0x038301 $82F1: C-----  20 0A 83 JSR  $830A
  0x038304 $82F4: C-----  68       PLA  
  0x038305 $82F5: C-----  18       CLC  
  0x038306 $82F6: C-----  69 01    ADC  #$01
  0x038308 $82F8: C-----  48       PHA  
  0x038309 $82F9: C-----  20 0A 83 JSR  $830A
  0x03830C $82FC: C-----  A9 80    LDA  #$80
  0x03830E $82FE: C-----  8D 15 05 STA  $0515
  0x038311 $8301: C-----  68       PLA  
  0x038312 $8302: C-----  18       CLC  
  0x038313 $8303: C-----  69 01    ADC  #$01
  0x038315 $8305: C-----  C9 0C    CMP  #$0C
  0x038317 $8307: C-----  D0 D4    BNE  $82DD
  0x038319 $8309: C-----  60       RTS  
  0x03831A $830A: C-----  48       PHA  
  0x03831B $830B: C-----  A9 18    LDA  #$18
  0x03831D $830D: C-----  9D A5 04 STA  $04A5,X
  0x038320 $8310: C-----  A9 40    LDA  #$40
  0x038322 $8312: C-----  9D A6 04 STA  $04A6,X
  0x038325 $8315: C-----  68       PLA  
  0x038326 $8316: C-----  18       CLC  
  0x038327 $8317: C-----  69 11    ADC  #$11
  0x038329 $8319: C-----  4A       LSR  A
  0x03832A $831A: C-----  7E A6 04 ROR  $04A6,X
  0x03832D $831D: C-----  4A       LSR  A
  0x03832E $831E: C-----  7E A6 04 ROR  $04A6,X
  0x038331 $8321: C-----  4A       LSR  A
  0x038332 $8322: C-----  7E A6 04 ROR  $04A6,X
  0x038335 $8325: C-----  09 20    ORA  #$20
  0x038337 $8327: C-----  9D A7 04 STA  $04A7,X
  0x03833A $832A: C-----  E8       INX  
  0x03833B $832B: C-----  E8       INX  
  0x03833C $832C: C-----  E8       INX  
  0x03833D $832D: C-----  A0 00    LDY  #$00
  0x03833F $832F: C-----  B1 61    LDA  ($61),Y
  0x038341 $8331: C-----  9D A5 04 STA  $04A5,X
  0x038344 $8334: C-----  E8       INX  
  0x038345 $8335: C-----  C8       INY  
  0x038346 $8336: C-----  C0 18    CPY  #$18
  0x038348 $8338: C-----  D0 F5    BNE  $832F
  0x03834A $833A: C-----  A9 00    LDA  #$00
  0x03834C $833C: C-----  9D A5 04 STA  $04A5,X
  0x03834F $833F: C-----  98       TYA  
  0x038350 $8340: C-----  18       CLC  
  0x038351 $8341: C-----  65 61    ADC  $61
  0x038353 $8343: C-----  85 61    STA  $61
  0x038355 $8345: C-----  90 02    BCC  $8349
  0x038357 $8347: C-----  E6 62    INC  $62
  0x038359 $8349: C-----  60       RTS  
  0x03835A $834A: -D0-I-  .byte $00 ; <indirect ref>
  0x03835B $834B: -D0-I-  .byte $00 ; <indirect ref>
  0x03835C $834C: -D0-I-  .byte $C9 ; <indirect ref>
  0x03835D $834D: -D0-I-  .byte $D2 ; <indirect ref>
  0x03835E $834E: -D0-I-  .byte $D2 ; <indirect ref>
  0x03835F $834F: -D0-I-  .byte $D2 ; <indirect ref>
  0x038360 $8350: -D0-I-  .byte $D2 ; <indirect ref>
  0x038361 $8351: -D0-I-  .byte $D2 ; <indirect ref>
  0x038362 $8352: -D0-I-  .byte $D2 ; <indirect ref>
  0x038363 $8353: -D0-I-  .byte $D2 ; <indirect ref>
  0x038364 $8354: -D0-I-  .byte $D2 ; <indirect ref>
  0x038365 $8355: -D0-I-  .byte $D2 ; <indirect ref>
  0x038366 $8356: -D0-I-  .byte $C9 ; <indirect ref>
  0x038367 $8357: -D0-I-  .byte $D2 ; <indirect ref>
  0x038368 $8358: -D0-I-  .byte $D2 ; <indirect ref>
  0x038369 $8359: -D0-I-  .byte $D2 ; <indirect ref>
  0x03836A $835A: -D0-I-  .byte $D2 ; <indirect ref>
  0x03836B $835B: -D0-I-  .byte $D2 ; <indirect ref>
  0x03836C $835C: -D0-I-  .byte $D2 ; <indirect ref>
  0x03836D $835D: -D0-I-  .byte $D2 ; <indirect ref>
  0x03836E $835E: -D0-I-  .byte $D2 ; <indirect ref>
  0x03836F $835F: -D0-I-  .byte $D2 ; <indirect ref>
  0x038370 $8360: -D0-I-  .byte $D0 ; <indirect ref>
  0x038371 $8361: -D0-I-  .byte $00 ; <indirect ref>
  0x038372 $8362: -D0-I-  .byte $00 ; <indirect ref>
  0x038373 $8363: -D0-I-  .byte $00 ; <indirect ref>
  0x038374 $8364: -D0-I-  .byte $CC ; <indirect ref>
  0x038375 $8365: -D0-I-  .byte $FF ; <indirect ref>
  0x038376 $8366: -D0-I-  .byte $FF ; <indirect ref>
  0x038377 $8367: -D0-I-  .byte $FF ; <indirect ref>
  0x038378 $8368: -D0-I-  .byte $FF ; <indirect ref>
  0x038379 $8369: -D0-I-  .byte $FF ; <indirect ref>
  0x03837A $836A: -D0-I-  .byte $FF ; <indirect ref>
  0x03837B $836B: -D0-I-  .byte $FF ; <indirect ref>
  0x03837C $836C: -D0-I-  .byte $FF ; <indirect ref>
  0x03837D $836D: -D0-I-  .byte $FF ; <indirect ref>
  0x03837E $836E: -D0-I-  .byte $CC ; <indirect ref>
  0x03837F $836F: -D0-I-  .byte $FF ; <indirect ref>
  0x038380 $8370: -D0-I-  .byte $FF ; <indirect ref>
  0x038381 $8371: -D0-I-  .byte $FF ; <indirect ref>
  0x038382 $8372: -D0-I-  .byte $FF ; <indirect ref>
  0x038383 $8373: -D0-I-  .byte $FF ; <indirect ref>
  0x038384 $8374: -D0-I-  .byte $FF ; <indirect ref>
  0x038385 $8375: -D0-I-  .byte $FF ; <indirect ref>
  0x038386 $8376: -D0-I-  .byte $FF ; <indirect ref>
  0x038387 $8377: -D0-I-  .byte $FF ; <indirect ref>
  0x038388 $8378: -D0-I-  .byte $D0 ; <indirect ref>
  0x038389 $8379: -D0-I-  .byte $00 ; <indirect ref>
  0x03838A $837A: -D0-I-  .byte $00 ; <indirect ref>
  0x03838B $837B: -D0-I-  .byte $00 ; <indirect ref>
  0x03838C $837C: -D0-I-  .byte $C9 ; <indirect ref>
  0x03838D $837D: -D0-I-  .byte $D2 ; <indirect ref>
  0x03838E $837E: -D0-I-  .byte $D2 ; <indirect ref>
  0x03838F $837F: -D0-I-  .byte $D2 ; <indirect ref>
  0x038390 $8380: -D0-I-  .byte $CC ; <indirect ref>
  0x038391 $8381: -D0-I-  .byte $FF ; <indirect ref>
  0x038392 $8382: -D0-I-  .byte $FF ; <indirect ref>
  0x038393 $8383: -D0-I-  .byte $FF ; <indirect ref>
  0x038394 $8384: -D0-I-  .byte $FF ; <indirect ref>
  0x038395 $8385: -D0-I-  .byte $FF ; <indirect ref>
  0x038396 $8386: -D0-I-  .byte $CC ; <indirect ref>
  0x038397 $8387: -D0-I-  .byte $FF ; <indirect ref>
  0x038398 $8388: -D0-I-  .byte $FF ; <indirect ref>
  0x038399 $8389: -D0-I-  .byte $FF ; <indirect ref>
  0x03839A $838A: -D0-I-  .byte $FF ; <indirect ref>
  0x03839B $838B: -D0-I-  .byte $FF ; <indirect ref>
  0x03839C $838C: -D0-I-  .byte $C9 ; <indirect ref>
  0x03839D $838D: -D0-I-  .byte $D2 ; <indirect ref>
  0x03839E $838E: -D0-I-  .byte $D2 ; <indirect ref>
  0x03839F $838F: -D0-I-  .byte $D2 ; <indirect ref>
  0x0383A0 $8390: -D0-I-  .byte $D0 ; <indirect ref>
  0x0383A1 $8391: -D0-I-  .byte $00 ; <indirect ref>
  0x0383A2 $8392: -D0-I-  .byte $00 ; <indirect ref>
  0x0383A3 $8393: -D0-I-  .byte $00 ; <indirect ref>
  0x0383A4 $8394: -D0-I-  .byte $CC ; <indirect ref>
  0x0383A5 $8395: -D0-I-  .byte $FF ; <indirect ref>
  0x0383A6 $8396: -D0-I-  .byte $FF ; <indirect ref>
  0x0383A7 $8397: -D0-I-  .byte $FF ; <indirect ref>
  0x0383A8 $8398: -D0-I-  .byte $CC ; <indirect ref>
  0x0383A9 $8399: -D0-I-  .byte $FF ; <indirect ref>
  0x0383AA $839A: -D0-I-  .byte $FF ; <indirect ref>
  0x0383AB $839B: -D0-I-  .byte $FF ; <indirect ref>
  0x0383AC $839C: -D0-I-  .byte $FF ; <indirect ref>
  0x0383AD $839D: -D0-I-  .byte $FF ; <indirect ref>
  0x0383AE $839E: -D0-I-  .byte $CC ; <indirect ref>
  0x0383AF $839F: -D0-I-  .byte $FF ; <indirect ref>
  0x0383B0 $83A0: -D0-I-  .byte $FF ; <indirect ref>
  0x0383B1 $83A1: -D0-I-  .byte $FF ; <indirect ref>
  0x0383B2 $83A2: -D0-I-  .byte $FF ; <indirect ref>
  0x0383B3 $83A3: -D0-I-  .byte $FF ; <indirect ref>
  0x0383B4 $83A4: -D0-I-  .byte $CC ; <indirect ref>
  0x0383B5 $83A5: -D0-I-  .byte $FF ; <indirect ref>
  0x0383B6 $83A6: -D0-I-  .byte $FF ; <indirect ref>
  0x0383B7 $83A7: -D0-I-  .byte $FF ; <indirect ref>
  0x0383B8 $83A8: -D0-I-  .byte $D0 ; <indirect ref>
  0x0383B9 $83A9: -D0-I-  .byte $00 ; <indirect ref>
  0x0383BA $83AA: -D0-I-  .byte $00 ; <indirect ref>
  0x0383BB $83AB: -D0-I-  .byte $00 ; <indirect ref>
  0x0383BC $83AC: -D0-I-  .byte $C9 ; <indirect ref>
  0x0383BD $83AD: -D0-I-  .byte $D2 ; <indirect ref>
  0x0383BE $83AE: -D0-I-  .byte $CC ; <indirect ref>
  0x0383BF $83AF: -D0-I-  .byte $FF ; <indirect ref>
  0x0383C0 $83B0: -D0-I-  .byte $CC ; <indirect ref>
  0x0383C1 $83B1: -D0-I-  .byte $FF ; <indirect ref>
  0x0383C2 $83B2: -D0-I-  .byte $FF ; <indirect ref>
  0x0383C3 $83B3: -D0-I-  .byte $FF ; <indirect ref>
  0x0383C4 $83B4: -D0-I-  .byte $C0 ; <indirect ref>
  0x0383C5 $83B5: -D0-I-  .byte $C1 ; <indirect ref>
  0x0383C6 $83B6: -D0-I-  .byte $C4 ; <indirect ref>
  0x0383C7 $83B7: -D0-I-  .byte $C5 ; <indirect ref>
  0x0383C8 $83B8: -D0-I-  .byte $FF ; <indirect ref>
  0x0383C9 $83B9: -D0-I-  .byte $FF ; <indirect ref>
  0x0383CA $83BA: -D0-I-  .byte $FF ; <indirect ref>
  0x0383CB $83BB: -D0-I-  .byte $FF ; <indirect ref>
  0x0383CC $83BC: -D0-I-  .byte $CC ; <indirect ref>
  0x0383CD $83BD: -D0-I-  .byte $FF ; <indirect ref>
  0x0383CE $83BE: -D0-I-  .byte $C9 ; <indirect ref>
  0x0383CF $83BF: -D0-I-  .byte $D2 ; <indirect ref>
  0x0383D0 $83C0: -D0-I-  .byte $D0 ; <indirect ref>
  0x0383D1 $83C1: -D0-I-  .byte $00 ; <indirect ref>
  0x0383D2 $83C2: -D0-I-  .byte $00 ; <indirect ref>
  0x0383D3 $83C3: -D0-I-  .byte $C9 ; <indirect ref>
  0x0383D4 $83C4: -D0-I-  .byte $CC ; <indirect ref>
  0x0383D5 $83C5: -D0-I-  .byte $FF ; <indirect ref>
  0x0383D6 $83C6: -D0-I-  .byte $CC ; <indirect ref>
  0x0383D7 $83C7: -D0-I-  .byte $FF ; <indirect ref>
  0x0383D8 $83C8: -D0-I-  .byte $CC ; <indirect ref>
  0x0383D9 $83C9: -D0-I-  .byte $FF ; <indirect ref>
  0x0383DA $83CA: -D0-I-  .byte $FF ; <indirect ref>
  0x0383DB $83CB: -D0-I-  .byte $FF ; <indirect ref>
  0x0383DC $83CC: -D0-I-  .byte $C2 ; <indirect ref>
  0x0383DD $83CD: -D0-I-  .byte $FF ; <indirect ref>
  0x0383DE $83CE: -D0-I-  .byte $CC ; <indirect ref>
  0x0383DF $83CF: -D0-I-  .byte $C7 ; <indirect ref>
  0x0383E0 $83D0: -D0-I-  .byte $FF ; <indirect ref>
  0x0383E1 $83D1: -D0-I-  .byte $FF ; <indirect ref>
  0x0383E2 $83D2: -D0-I-  .byte $FF ; <indirect ref>
  0x0383E3 $83D3: -D0-I-  .byte $FF ; <indirect ref>
  0x0383E4 $83D4: -D0-I-  .byte $CC ; <indirect ref>
  0x0383E5 $83D5: -D0-I-  .byte $FF ; <indirect ref>
  0x0383E6 $83D6: -D0-I-  .byte $CC ; <indirect ref>
  0x0383E7 $83D7: -D0-I-  .byte $FF ; <indirect ref>
  0x0383E8 $83D8: -D0-I-  .byte $C9 ; <indirect ref>
  0x0383E9 $83D9: -D0-I-  .byte $D0 ; <indirect ref>
  0x0383EA $83DA: -D0-I-  .byte $00 ; <indirect ref>
  0x0383EB $83DB: -D0-I-  .byte $C6 ; <indirect ref>
  0x0383EC $83DC: -D0-I-  .byte $CC ; <indirect ref>
  0x0383ED $83DD: -D0-I-  .byte $FF ; <indirect ref>
  0x0383EE $83DE: -D0-I-  .byte $CC ; <indirect ref>
  0x0383EF $83DF: -D0-I-  .byte $FF ; <indirect ref>
  0x0383F0 $83E0: -D0-I-  .byte $CC ; <indirect ref>
  0x0383F1 $83E1: -D0-I-  .byte $FF ; <indirect ref>
  0x0383F2 $83E2: -D0-I-  .byte $FF ; <indirect ref>
  0x0383F3 $83E3: -D0-I-  .byte $FF ; <indirect ref>
  0x0383F4 $83E4: -D0-I-  .byte $C8 ; <indirect ref>
  0x0383F5 $83E5: -D0-I-  .byte $FF ; <indirect ref>
  0x0383F6 $83E6: -D0-I-  .byte $CC ; <indirect ref>
  0x0383F7 $83E7: -D0-I-  .byte $CD ; <indirect ref>
  0x0383F8 $83E8: -D0-I-  .byte $FF ; <indirect ref>
  0x0383F9 $83E9: -D0-I-  .byte $FF ; <indirect ref>
  0x0383FA $83EA: -D0-I-  .byte $FF ; <indirect ref>
  0x0383FB $83EB: -D0-I-  .byte $FF ; <indirect ref>
  0x0383FC $83EC: -D0-I-  .byte $CC ; <indirect ref>
  0x0383FD $83ED: -D0-I-  .byte $FF ; <indirect ref>
  0x0383FE $83EE: -D0-I-  .byte $CC ; <indirect ref>
  0x0383FF $83EF: -D0-I-  .byte $FF ; <indirect ref>
  0x038400 $83F0: -D0-I-  .byte $C6 ; <indirect ref>
  0x038401 $83F1: -D0-I-  .byte $D0 ; <indirect ref>
  0x038402 $83F2: -D0-I-  .byte $00 ; <indirect ref>
  0x038403 $83F3: -D0-I-  .byte $00 ; <indirect ref>
  0x038404 $83F4: -D0-I-  .byte $C6 ; <indirect ref>
  0x038405 $83F5: -D0-I-  .byte $C3 ; <indirect ref>
  0x038406 $83F6: -D0-I-  .byte $CC ; <indirect ref>
  0x038407 $83F7: -D0-I-  .byte $FF ; <indirect ref>
  0x038408 $83F8: -D0-I-  .byte $CC ; <indirect ref>
  0x038409 $83F9: -D0-I-  .byte $FF ; <indirect ref>
  0x03840A $83FA: -D0-I-  .byte $FF ; <indirect ref>
  0x03840B $83FB: -D0-I-  .byte $FF ; <indirect ref>
  0x03840C $83FC: -D0-I-  .byte $CA ; <indirect ref>
  0x03840D $83FD: -D0-I-  .byte $CB ; <indirect ref>
  0x03840E $83FE: -D0-I-  .byte $CE ; <indirect ref>
  0x03840F $83FF: -D0-I-  .byte $CF ; <indirect ref>
  0x038410 $8400: -D0-I-  .byte $FF ; <indirect ref>
  0x038411 $8401: -D0-I-  .byte $FF ; <indirect ref>
  0x038412 $8402: -D0-I-  .byte $FF ; <indirect ref>
  0x038413 $8403: -D0-I-  .byte $FF ; <indirect ref>
  0x038414 $8404: -D0-I-  .byte $CC ; <indirect ref>
  0x038415 $8405: -D0-I-  .byte $FF ; <indirect ref>
  0x038416 $8406: -D0-I-  .byte $C6 ; <indirect ref>
  0x038417 $8407: -D0-I-  .byte $C3 ; <indirect ref>
  0x038418 $8408: -D0-I-  .byte $D0 ; <indirect ref>
  0x038419 $8409: -D0-I-  .byte $00 ; <indirect ref>
  0x03841A $840A: -D0-I-  .byte $00 ; <indirect ref>
  0x03841B $840B: -D0-I-  .byte $00 ; <indirect ref>
  0x03841C $840C: -D0-I-  .byte $CC ; <indirect ref>
  0x03841D $840D: -D0-I-  .byte $FF ; <indirect ref>
  0x03841E $840E: -D0-I-  .byte $FF ; <indirect ref>
  0x03841F $840F: -D0-I-  .byte $FF ; <indirect ref>
  0x038420 $8410: -D0-I-  .byte $CC ; <indirect ref>
  0x038421 $8411: -D0-I-  .byte $FF ; <indirect ref>
  0x038422 $8412: -D0-I-  .byte $FF ; <indirect ref>
  0x038423 $8413: -D0-I-  .byte $FF ; <indirect ref>
  0x038424 $8414: -D0-I-  .byte $FF ; <indirect ref>
  0x038425 $8415: -D0-I-  .byte $FF ; <indirect ref>
  0x038426 $8416: -D0-I-  .byte $CC ; <indirect ref>
  0x038427 $8417: -D0-I-  .byte $FF ; <indirect ref>
  0x038428 $8418: -D0-I-  .byte $FF ; <indirect ref>
  0x038429 $8419: -D0-I-  .byte $FF ; <indirect ref>
  0x03842A $841A: -D0-I-  .byte $FF ; <indirect ref>
  0x03842B $841B: -D0-I-  .byte $FF ; <indirect ref>
  0x03842C $841C: -D0-I-  .byte $CC ; <indirect ref>
  0x03842D $841D: -D0-I-  .byte $FF ; <indirect ref>
  0x03842E $841E: -D0-I-  .byte $FF ; <indirect ref>
  0x03842F $841F: -D0-I-  .byte $FF ; <indirect ref>
  0x038430 $8420: -D0-I-  .byte $D0 ; <indirect ref>
  0x038431 $8421: -D0-I-  .byte $00 ; <indirect ref>
  0x038432 $8422: -D0-I-  .byte $00 ; <indirect ref>
  0x038433 $8423: -D0-I-  .byte $00 ; <indirect ref>
  0x038434 $8424: -D0-I-  .byte $C6 ; <indirect ref>
  0x038435 $8425: -D0-I-  .byte $C3 ; <indirect ref>
  0x038436 $8426: -D0-I-  .byte $C3 ; <indirect ref>
  0x038437 $8427: -D0-I-  .byte $C3 ; <indirect ref>
  0x038438 $8428: -D0-I-  .byte $CC ; <indirect ref>
  0x038439 $8429: -D0-I-  .byte $FF ; <indirect ref>
  0x03843A $842A: -D0-I-  .byte $FF ; <indirect ref>
  0x03843B $842B: -D0-I-  .byte $FF ; <indirect ref>
  0x03843C $842C: -D0-I-  .byte $FF ; <indirect ref>
  0x03843D $842D: -D0-I-  .byte $FF ; <indirect ref>
  0x03843E $842E: -D0-I-  .byte $CC ; <indirect ref>
  0x03843F $842F: -D0-I-  .byte $FF ; <indirect ref>
  0x038440 $8430: -D0-I-  .byte $FF ; <indirect ref>
  0x038441 $8431: -D0-I-  .byte $FF ; <indirect ref>
  0x038442 $8432: -D0-I-  .byte $FF ; <indirect ref>
  0x038443 $8433: -D0-I-  .byte $FF ; <indirect ref>
  0x038444 $8434: -D0-I-  .byte $C6 ; <indirect ref>
  0x038445 $8435: -D0-I-  .byte $C3 ; <indirect ref>
  0x038446 $8436: -D0-I-  .byte $C3 ; <indirect ref>
  0x038447 $8437: -D0-I-  .byte $C3 ; <indirect ref>
  0x038448 $8438: -D0-I-  .byte $D0 ; <indirect ref>
  0x038449 $8439: -D0-I-  .byte $00 ; <indirect ref>
  0x03844A $843A: -D0-I-  .byte $00 ; <indirect ref>
  0x03844B $843B: -D0-I-  .byte $00 ; <indirect ref>
  0x03844C $843C: -D0-I-  .byte $CC ; <indirect ref>
  0x03844D $843D: -D0-I-  .byte $FF ; <indirect ref>
  0x03844E $843E: -D0-I-  .byte $FF ; <indirect ref>
  0x03844F $843F: -D0-I-  .byte $FF ; <indirect ref>
  0x038450 $8440: -D0-I-  .byte $FF ; <indirect ref>
  0x038451 $8441: -D0-I-  .byte $FF ; <indirect ref>
  0x038452 $8442: -D0-I-  .byte $FF ; <indirect ref>
  0x038453 $8443: -D0-I-  .byte $FF ; <indirect ref>
  0x038454 $8444: -D0-I-  .byte $FF ; <indirect ref>
  0x038455 $8445: -D0-I-  .byte $FF ; <indirect ref>
  0x038456 $8446: -D0-I-  .byte $CC ; <indirect ref>
  0x038457 $8447: -D0-I-  .byte $FF ; <indirect ref>
  0x038458 $8448: -D0-I-  .byte $FF ; <indirect ref>
  0x038459 $8449: -D0-I-  .byte $FF ; <indirect ref>
  0x03845A $844A: -D0-I-  .byte $FF ; <indirect ref>
  0x03845B $844B: -D0-I-  .byte $FF ; <indirect ref>
  0x03845C $844C: -D0-I-  .byte $FF ; <indirect ref>
  0x03845D $844D: -D0-I-  .byte $FF ; <indirect ref>
  0x03845E $844E: -D0-I-  .byte $FF ; <indirect ref>
  0x03845F $844F: -D0-I-  .byte $FF ; <indirect ref>
  0x038460 $8450: -D0-I-  .byte $D0 ; <indirect ref>
  0x038461 $8451: -D0-I-  .byte $00 ; <indirect ref>
  0x038462 $8452: -D0-I-  .byte $00 ; <indirect ref>
  0x038463 $8453: -D0-I-  .byte $00 ; <indirect ref>
  0x038464 $8454: -D0-I-  .byte $C6 ; <indirect ref>
  0x038465 $8455: -D0-I-  .byte $C3 ; <indirect ref>
  0x038466 $8456: -D0-I-  .byte $C3 ; <indirect ref>
  0x038467 $8457: -D0-I-  .byte $C3 ; <indirect ref>
  0x038468 $8458: -D0-I-  .byte $C3 ; <indirect ref>
  0x038469 $8459: -D0-I-  .byte $C3 ; <indirect ref>
  0x03846A $845A: -D0-I-  .byte $C3 ; <indirect ref>
  0x03846B $845B: -D0-I-  .byte $C3 ; <indirect ref>
  0x03846C $845C: -D0-I-  .byte $C3 ; <indirect ref>
  0x03846D $845D: -D0-I-  .byte $C3 ; <indirect ref>
  0x03846E $845E: -D0-I-  .byte $C6 ; <indirect ref>
  0x03846F $845F: -D0-I-  .byte $C3 ; <indirect ref>
  0x038470 $8460: -D0-I-  .byte $C3 ; <indirect ref>
  0x038471 $8461: -D0-I-  .byte $C3 ; <indirect ref>
  0x038472 $8462: -D0-I-  .byte $C3 ; <indirect ref>
  0x038473 $8463: -D0-I-  .byte $C3 ; <indirect ref>
  0x038474 $8464: -D0-I-  .byte $C3 ; <indirect ref>
  0x038475 $8465: -D0-I-  .byte $C3 ; <indirect ref>
  0x038476 $8466: -D0-I-  .byte $C3 ; <indirect ref>
  0x038477 $8467: -D0-I-  .byte $C3 ; <indirect ref>
  0x038478 $8468: -D0-I-  .byte $D0 ; <indirect ref>
  0x038479 $8469: -D0-I-  .byte $00 ; <indirect ref>
  0x03847A $846A: C-----  A9 00    LDA  #$00
  0x03847C $846C: C-----  8D 28 06 STA  $0628
  0x03847F $846F: C-----  AD 3C 04 LDA  $043C
  0x038482 $8472: C-----  29 3F    AND  #$3F
  0x038484 $8474: C-----  D0 22    BNE  $8498
  0x038486 $8476: C-----  AE 35 06 LDX  $0635
  0x038489 $8479: C-----  AC 37 06 LDY  $0637
  0x03848C $847C: C-----  20 99 84 JSR  $8499
  0x03848F $847F: C-----  AA       TAX  
  0x038490 $8480: C-----  D0 16    BNE  $8498
  0x038492 $8482: C-----  AD 38 06 LDA  $0638
  0x038495 $8485: C-----  20 36 C5 JSR  $C536
  0x038498 $8488: C-----  20 99 84 JSR  $8499
  0x03849B $848B: C-----  C9 00    CMP  #$00
  0x03849D $848D: C-----  F0 09    BEQ  $8498
  0x03849F $848F: C-----  C9 04    CMP  #$04
  0x0384A1 $8491: C-----  F0 05    BEQ  $8498
  0x0384A3 $8493: C-----  A9 80    LDA  #$80
  0x0384A5 $8495: C-----  8D 28 06 STA  $0628
  0x0384A8 $8498: C-----  60       RTS  
  0x0384A9 $8499: C-----  AD FB 05 LDA  $05FB
  0x0384AC $849C: C-----  D0 04    BNE  $84A2
  0x0384AE $849E: C-----  8A       TXA  
  0x0384AF $849F: C-----  49 FF    EOR  #$FF
  0x0384B1 $84A1: C-----  AA       TAX  
  0x0384B2 $84A2: C-----  E0 60    CPX  #$60
  0x0384B4 $84A4: C-----  B0 18    BCS  $84BE
  0x0384B6 $84A6: C-----  98       TYA  
  0x0384B7 $84A7: C-----  10 02    BPL  $84AB
  0x0384B9 $84A9: C-----  49 FF    EOR  #$FF
  0x0384BB $84AB: C-----  A8       TAY  
  0x0384BC $84AC: C-----  20 39 C5 JSR  $C539
  0x0384BF $84AF: C-----  A2 00    LDX  #$00
  0x0384C1 $84B1: C-----  DD BE 8B CMP  $8BBE,X
  0x0384C4 $84B4: C-----  F0 04    BEQ  $84BA
  0x0384C6 $84B6: C-----  E8       INX  
  0x0384C7 $84B7: C-----  E8       INX  
  0x0384C8 $84B8: C-----  D0 F7    BNE  $84B1
  0x0384CA $84BA: C-----  BD BF 8B LDA  $8BBF,X
  0x0384CD $84BD: C-----  60       RTS  
  0x0384CE $84BE: C-----  68       PLA  
  0x0384CF $84BF: C-----  68       PLA  
  0x0384D0 $84C0: C-----  60       RTS  
  0x0384D1 $84C1: C-----  AD FB 05 LDA  $05FB
  0x0384D4 $84C4: C-----  F0 2D    BEQ  $84F3
  0x0384D6 $84C6: C-----  A9 00    LDA  #$00
  0x0384D8 $84C8: C-----  8D 3C 04 STA  $043C
  0x0384DB $84CB: C-----  8D 3E 04 STA  $043E
  0x0384DE $84CE: C-----  A2 00    LDX  #$00
  0x0384E0 $84D0: C-----  AD E2 00 LDA  $00E2
  0x0384E3 $84D3: C-----  C9 1F    CMP  #$1F
  0x0384E5 $84D5: C-----  B0 08    BCS  $84DF
  0x0384E7 $84D7: C-----  20 20 8A JSR  $8A20
  0x0384EA $84DA: C-----  20 09 8A JSR  $8A09
  0x0384ED $84DD: C-----  A2 01    LDX  #$01
  0x0384EF $84DF: C-----  8E 3B 04 STX  $043B
  0x0384F2 $84E2: C-----  AD 41 04 LDA  $0441
  0x0384F5 $84E5: C-----  20 06 8C JSR  $8C06
  0x0384F8 $84E8: C-----  AD 30 04 LDA  $0430
  0x0384FB $84EB: C-----  F0 03    BEQ  $84F0
  0x0384FD $84ED: C-----  AD 31 04 LDA  $0431
  0x038500 $84F0: C-----  8D 3C 04 STA  $043C
  0x038503 $84F3: C-----  AD E3 00 LDA  $00E3
  0x038506 $84F6: C-----  29 01    AND  #$01
  0x038508 $84F8: C-----  4D 12 06 EOR  $0612
  0x03850B $84FB: C-----  8D 12 06 STA  $0612
  0x03850E $84FE: C-----  60       RTS  
  0x03850F $84FF: C-----  AE FB 05 LDX  $05FB
  0x038512 $8502: C-----  F0 02    BEQ  $8506
  0x038514 $8504: C-----  A2 03    LDX  #$03
  0x038516 $8506: C-----  AD E2 00 LDA  $00E2
  0x038519 $8509: C-----  6D E3 00 ADC  $00E3
  0x03851C $850C: C-----  A0 00    LDY  #$00
  0x03851E $850E: C-----  DD 28 85 CMP  $8528,X
  0x038521 $8511: C-----  B0 04    BCS  $8517
  0x038523 $8513: C-----  C8       INY  
  0x038524 $8514: C-----  E8       INX  
  0x038525 $8515: C-----  D0 F7    BNE  $850E
  0x038527 $8517: C-----  98       TYA  
  0x038528 $8518: C-----  18       CLC  
  0x038529 $8519: C-----  69 07    ADC  #$07
  0x03852B $851B: C-----  AE FB 05 LDX  $05FB
  0x03852E $851E: C-----  F0 04    BEQ  $8524
  0x038530 $8520: C-----  8D 3B 04 STA  $043B
  0x038533 $8523: C-----  60       RTS  
  0x038534 $8524: C-----  8D 3D 04 STA  $043D
  0x038537 $8527: C-----  60       RTS  
  0x038538 $8528: -D0---  .byte $B3
  0x038539 $8529: -D0---  .byte $4F
  0x03853A $852A: -D0---  .byte $00
  0x03853B $852B: -D0---  .byte $AA
  0x03853C $852C: -D0---  .byte $54
  0x03853D $852D: -D0---  .byte $00
  0x03853E $852E: C-----  A0 06    LDY  #$06
  0x038540 $8530: C-----  B1 38    LDA  ($38),Y
  0x038542 $8532: C-----  29 01    AND  #$01
  0x038544 $8534: C-----  0A       ASL  A
  0x038545 $8535: C-----  6D 1E 06 ADC  $061E
  0x038548 $8538: C-----  8D 1E 06 STA  $061E
  0x03854B $853B: C-----  B1 38    LDA  ($38),Y
  0x03854D $853D: C-----  4A       LSR  A
  0x03854E $853E: C-----  4A       LSR  A
  0x03854F $853F: C-----  4A       LSR  A
  0x038550 $8540: C-----  4A       LSR  A
  0x038551 $8541: C-----  18       CLC  
  0x038552 $8542: C-----  69 0A    ADC  #$0A
  0x038554 $8544: C-----  8D 41 04 STA  $0441
  0x038557 $8547: C-----  A9 00    LDA  #$00
  0x038559 $8549: C-----  85 3C    STA  $3C
  0x03855B $854B: C-----  A0 07    LDY  #$07
  0x03855D $854D: C-----  B1 38    LDA  ($38),Y
  0x03855F $854F: C-----  20 EB 8A JSR  $8AEB
  0x038562 $8552: C-----  18       CLC  
  0x038563 $8553: C-----  A5 3C    LDA  $3C
  0x038565 $8555: C-----  69 2E    ADC  #$2E
  0x038567 $8557: C-----  85 3C    STA  $3C
  0x038569 $8559: C-----  8A       TXA  
  0x03856A $855A: C-----  69 B1    ADC  #$B1
  0x03856C $855C: C-----  85 3D    STA  $3D
  0x03856E $855E: C-----  A9 00    LDA  #$00
  0x038570 $8560: C-----  8D 3C 04 STA  $043C
  0x038573 $8563: C-----  85 3E    STA  $3E
  0x038575 $8565: C-----  20 0B 8B JSR  $8B0B
  0x038578 $8568: C-----  8D 3B 04 STA  $043B
  0x03857B $856B: C-----  AD 3B 04 LDA  $043B
  0x03857E $856E: C-----  20 09 C5 JSR  $C509
  0x038581 $8571: ------  .byte $DF
  0x038582 $8572: ------  .byte $87
  0x038583 $8573: -D0-I-  .byte $E9 ; <indirect ref>
  0x038584 $8574: -D0-I-  .byte $87 ; <indirect ref>
  0x038585 $8575: -D0-I-  .byte $83 ; <indirect ref>
  0x038586 $8576: -D0-I-  .byte $85 ; <indirect ref>
  0x038587 $8577: ------  .byte $83
  0x038588 $8578: ------  .byte $85
  0x038589 $8579: -D0-I-  .byte $83 ; <indirect ref>
  0x03858A $857A: -D0-I-  .byte $85 ; <indirect ref>
  0x03858B $857B: ------  .byte $83
  0x03858C $857C: ------  .byte $85
  0x03858D $857D: ------  .byte $83
  0x03858E $857E: ------  .byte $85
  0x03858F $857F: ------  .byte $83
  0x038590 $8580: ------  .byte $85
  0x038591 $8581: ------  .byte $83
  0x038592 $8582: ------  .byte $85
  0x038593 $8583: C--J--  A0 08    LDY  #$08
  0x038595 $8585: C-----  B1 38    LDA  ($38),Y
  0x038597 $8587: C-----  20 5E 89 JSR  $895E
  0x03859A $858A: C-----  4A       LSR  A
  0x03859B $858B: C-----  4A       LSR  A
  0x03859C $858C: C-----  C9 0F    CMP  #$0F
  0x03859E $858E: C-----  D0 06    BNE  $8596
  0x0385A0 $8590: ------  .byte $20
  0x0385A1 $8591: ------  .byte $20
  0x0385A2 $8592: ------  .byte $8A
  0x0385A3 $8593: ------  .byte $4C
  0x0385A4 $8594: ------  .byte $99
  0x0385A5 $8595: ------  .byte $85
  0x0385A6 $8596: C-----  18       CLC  
  0x0385A7 $8597: C-----  69 0A    ADC  #$0A
  0x0385A9 $8599: C-----  CD 41 04 CMP  $0441
  0x0385AC $859C: C-----  D0 09    BNE  $85A7
  0x0385AE $859E: C-----  18       CLC  
  0x0385AF $859F: C-----  69 01    ADC  #$01
  0x0385B1 $85A1: C-----  C9 16    CMP  #$16
  0x0385B3 $85A3: C-----  90 02    BCC  $85A7
  0x0385B5 $85A5: ------  .byte $A9
  0x0385B6 $85A6: ------  .byte $0C
  0x0385B7 $85A7: C-----  20 09 8A JSR  $8A09
  0x0385BA $85AA: C-----  A9 01    LDA  #$01
  0x0385BC $85AC: C-----  8D 3B 04 STA  $043B
  0x0385BF $85AF: C-----  A9 00    LDA  #$00
  0x0385C1 $85B1: C-----  8D 3C 04 STA  $043C
  0x0385C4 $85B4: C-----  60       RTS  
  0x0385C5 $85B5: C-----  A9 00    LDA  #$00
  0x0385C7 $85B7: C-----  85 3D    STA  $3D
  0x0385C9 $85B9: C-----  AE 21 06 LDX  $0621
  0x0385CC $85BC: C-----  BC 04 86 LDY  $8604,X
  0x0385CF $85BF: C-----  98       TYA  
  0x0385D0 $85C0: C-----  0A       ASL  A
  0x0385D1 $85C1: C-----  0A       ASL  A
  0x0385D2 $85C2: C-----  85 3E    STA  $3E
  0x0385D4 $85C4: C-----  C8       INY  
  0x0385D5 $85C5: C-----  C8       INY  
  0x0385D6 $85C6: C-----  C8       INY  
  0x0385D7 $85C7: C-----  C8       INY  
  0x0385D8 $85C8: C-----  B1 3A    LDA  ($3A),Y
  0x0385DA $85CA: C-----  0A       ASL  A
  0x0385DB $85CB: C-----  26 3D    ROL  $3D
  0x0385DD $85CD: C-----  0A       ASL  A
  0x0385DE $85CE: C-----  26 3D    ROL  $3D
  0x0385E0 $85D0: C-----  85 3C    STA  $3C
  0x0385E2 $85D2: C-----  A6 3D    LDX  $3D
  0x0385E4 $85D4: C-----  0A       ASL  A
  0x0385E5 $85D5: C-----  26 3D    ROL  $3D
  0x0385E7 $85D7: C-----  65 3C    ADC  $3C
  0x0385E9 $85D9: C-----  85 3C    STA  $3C
  0x0385EB $85DB: C-----  8A       TXA  
  0x0385EC $85DC: C-----  65 3D    ADC  $3D
  0x0385EE $85DE: C-----  AA       TAX  
  0x0385EF $85DF: C-----  A5 3C    LDA  $3C
  0x0385F1 $85E1: C-----  18       CLC  
  0x0385F2 $85E2: C-----  69 2E    ADC  #$2E
  0x0385F4 $85E4: C-----  85 3C    STA  $3C
  0x0385F6 $85E6: C-----  8A       TXA  
  0x0385F7 $85E7: C-----  69 BA    ADC  #$BA
  0x0385F9 $85E9: C-----  85 3D    STA  $3D
  0x0385FB $85EB: C-----  20 0B 8B JSR  $8B0B
  0x0385FE $85EE: C-----  8D 3D 04 STA  $043D
  0x038601 $85F1: C-----  AA       TAX  
  0x038602 $85F2: C-----  AD 42 04 LDA  $0442
  0x038605 $85F5: C-----  20 A6 8D JSR  $8DA6
  0x038608 $85F8: C-----  AD 30 04 LDA  $0430
  0x03860B $85FB: C-----  F0 03    BEQ  $8600
  0x03860D $85FD: C-----  AD 31 04 LDA  $0431
  0x038610 $8600: C-----  8D 3E 04 STA  $043E
  0x038613 $8603: C-----  60       RTS  
  0x038614 $8604: -D0---  .byte $00
  0x038615 $8605: -D0---  .byte $01
  0x038616 $8606: ------  .byte $FF
  0x038617 $8607: -D0---  .byte $02
  0x038618 $8608: -D0---  .byte $00
  0x038619 $8609: C-----  AD FB 05 LDA  $05FB
  0x03861C $860C: C-----  F0 03    BEQ  $8611
  0x03861E $860E: C-----  4C 5D 87 JMP  $875D
  0x038621 $8611: C-----  AD 00 06 LDA  $0600
  0x038624 $8614: C-----  F0 28    BEQ  $863E
  0x038626 $8616: C-----  A9 00    LDA  #$00
  0x038628 $8618: C-----  48       PHA  
  0x038629 $8619: C-----  A9 01    LDA  #$01
  0x03862B $861B: C-----  20 15 C5 JSR  $C515
  0x03862E $861E: C-----  68       PLA  
  0x03862F $861F: C-----  48       PHA  
  0x038630 $8620: C-----  85 40    STA  $40
  0x038632 $8622: C-----  AA       TAX  
  0x038633 $8623: C-----  BD 01 06 LDA  $0601,X
  0x038636 $8626: C-----  20 3F 86 JSR  $863F
  0x038639 $8629: C-----  68       PLA  
  0x03863A $862A: C-----  AA       TAX  
  0x03863B $862B: C-----  AD 3D 04 LDA  $043D
  0x03863E $862E: C-----  9D 0B 06 STA  $060B,X
  0x038641 $8631: C-----  AD 3E 04 LDA  $043E
  0x038644 $8634: C-----  9D 06 06 STA  $0606,X
  0x038647 $8637: C-----  E8       INX  
  0x038648 $8638: C-----  8A       TXA  
  0x038649 $8639: C-----  CD 00 06 CMP  $0600
  0x03864C $863C: C-----  D0 DA    BNE  $8618
  0x03864E $863E: C-----  60       RTS  
  0x03864F $863F: C-----  8D 42 04 STA  $0442
  0x038652 $8642: C-----  20 62 8A JSR  $8A62
  0x038655 $8645: C-----  A9 00    LDA  #$00
  0x038657 $8647: C-----  85 3C    STA  $3C
  0x038659 $8649: C-----  AD 42 04 LDA  $0442
  0x03865C $864C: C-----  C9 0B    CMP  #$0B
  0x03865E $864E: C-----  D0 03    BNE  $8653
  0x038660 $8650: C-----  4C B5 85 JMP  $85B5
  0x038663 $8653: C-----  AC 21 06 LDY  $0621
  0x038666 $8656: C-----  B9 B5 86 LDA  $86B5,Y
  0x038669 $8659: C-----  85 3C    STA  $3C
  0x03866B $865B: C-----  F0 06    BEQ  $8663
  0x03866D $865D: C-----  20 B3 8A JSR  $8AB3
  0x038670 $8660: C-----  4C 8E 86 JMP  $868E
  0x038673 $8663: C-----  AD 35 06 LDA  $0635
  0x038676 $8666: C-----  49 FF    EOR  #$FF
  0x038678 $8668: C-----  AA       TAX  
  0x038679 $8669: C-----  A9 14    LDA  #$14
  0x03867B $866B: C-----  E0 A0    CPX  #$A0
  0x03867D $866D: C-----  B0 1F    BCS  $868E
  0x03867F $866F: C-----  A9 10    LDA  #$10
  0x038681 $8671: C-----  E0 60    CPX  #$60
  0x038683 $8673: C-----  B0 19    BCS  $868E
  0x038685 $8675: C-----  AD 37 06 LDA  $0637
  0x038688 $8678: C-----  10 02    BPL  $867C
  0x03868A $867A: C-----  49 FF    EOR  #$FF
  0x03868C $867C: C-----  A8       TAY  
  0x03868D $867D: C-----  20 39 C5 JSR  $C539
  0x038690 $8680: C-----  A2 00    LDX  #$00
  0x038692 $8682: C-----  DD BE 8B CMP  $8BBE,X
  0x038695 $8685: C-----  F0 04    BEQ  $868B
  0x038697 $8687: C-----  E8       INX  
  0x038698 $8688: C-----  E8       INX  
  0x038699 $8689: C-----  D0 F7    BNE  $8682
  0x03869B $868B: C-----  BD BF 8B LDA  $8BBF,X
  0x03869E $868E: C-----  A0 07    LDY  #$07
  0x0386A0 $8690: C-----  20 DE 8A JSR  $8ADE
  0x0386A3 $8693: C-----  18       CLC  
  0x0386A4 $8694: C-----  A5 3C    LDA  $3C
  0x0386A6 $8696: C-----  69 AE    ADC  #$AE
  0x0386A8 $8698: C-----  85 3C    STA  $3C
  0x0386AA $869A: C-----  8A       TXA  
  0x0386AB $869B: C-----  69 B8    ADC  #$B8
  0x0386AD $869D: C-----  85 3D    STA  $3D
  0x0386AF $869F: C-----  20 0B 8B JSR  $8B0B
  0x0386B2 $86A2: C-----  8D 3D 04 STA  $043D
  0x0386B5 $86A5: C-----  A9 00    LDA  #$00
  0x0386B7 $86A7: C-----  8D 3E 04 STA  $043E
  0x0386BA $86AA: C-----  A5 3F    LDA  $3F
  0x0386BC $86AC: C-----  20 09 C5 JSR  $C509
  0x0386BF $86AF: -D0-I-  .byte $BA ; <indirect ref>
  0x0386C0 $86B0: -D0-I-  .byte $86 ; <indirect ref>
  0x0386C1 $86B1: -D0-I-  .byte $EB ; <indirect ref>
  0x0386C2 $86B2: -D0-I-  .byte $86 ; <indirect ref>
  0x0386C3 $86B3: -D0-I-  .byte $10 ; <indirect ref>
  0x0386C4 $86B4: -D0-I-  .byte $87 ; <indirect ref>
  0x0386C5 $86B5: -D0---  .byte $00
  0x0386C6 $86B6: -D0---  .byte $02
  0x0386C7 $86B7: -D0---  .byte $01
  0x0386C8 $86B8: ------  .byte $00
  0x0386C9 $86B9: ------  .byte $00
  0x0386CA $86BA: C--J--  AD 3D 04 LDA  $043D
  0x0386CD $86BD: C-----  20 09 C5 JSR  $C509
  0x0386D0 $86C0: -D0-I-  .byte $C8 ; <indirect ref>
  0x0386D1 $86C1: -D0-I-  .byte $86 ; <indirect ref>
  0x0386D2 $86C2: -D0-I-  .byte $D0 ; <indirect ref>
  0x0386D3 $86C3: -D0-I-  .byte $86 ; <indirect ref>
  0x0386D4 $86C4: -D0-I-  .byte $D8 ; <indirect ref>
  0x0386D5 $86C5: -D0-I-  .byte $86 ; <indirect ref>
  0x0386D6 $86C6: -D0-I-  .byte $E0 ; <indirect ref>
  0x0386D7 $86C7: -D0-I-  .byte $86 ; <indirect ref>
  0x0386D8 $86C8: C--J--  A9 01    LDA  #$01
  0x0386DA $86CA: C-----  8D 3D 04 STA  $043D
  0x0386DD $86CD: C-----  4C 32 87 JMP  $8732
  0x0386E0 $86D0: C--J--  A9 02    LDA  #$02
  0x0386E2 $86D2: C-----  8D 3D 04 STA  $043D
  0x0386E5 $86D5: C-----  4C 32 87 JMP  $8732
  0x0386E8 $86D8: C--J--  A9 00    LDA  #$00
  0x0386EA $86DA: C-----  8D 3D 04 STA  $043D
  0x0386ED $86DD: C-----  4C 32 87 JMP  $8732
  0x0386F0 $86E0: C--J--  A9 01    LDA  #$01
  0x0386F2 $86E2: C-----  8D 3D 04 STA  $043D
  0x0386F5 $86E5: C-----  A9 05    LDA  #$05
  0x0386F7 $86E7: C-----  8D 3E 04 STA  $043E
  0x0386FA $86EA: C-----  60       RTS  
  0x0386FB $86EB: C--J--  AD 3D 04 LDA  $043D
  0x0386FE $86EE: C-----  20 09 C5 JSR  $C509
  0x038701 $86F1: -D0-I-  .byte $F9 ; <indirect ref>
  0x038702 $86F2: -D0-I-  .byte $86 ; <indirect ref>
  0x038703 $86F3: -D0-I-  .byte $FF ; <indirect ref>
  0x038704 $86F4: -D0-I-  .byte $86 ; <indirect ref>
  0x038705 $86F5: -D0-I-  .byte $05 ; <indirect ref>
  0x038706 $86F6: -D0-I-  .byte $87 ; <indirect ref>
  0x038707 $86F7: -D0-I-  .byte $08 ; <indirect ref>
  0x038708 $86F8: -D0-I-  .byte $87 ; <indirect ref>
  0x038709 $86F9: C-----  A9 05    LDA  #$05
  0x03870B $86FB: C-----  8D 3D 04 STA  $043D
  0x03870E $86FE: C-----  60       RTS  
  0x03870F $86FF: C--J--  A9 04    LDA  #$04
  0x038711 $8701: C-----  8D 3D 04 STA  $043D
  0x038714 $8704: C-----  60       RTS  
  0x038715 $8705: C--J--  4C D0 86 JMP  $86D0
  0x038718 $8708: C--J--  A9 01    LDA  #$01
  0x03871A $870A: C-----  8D 3E 04 STA  $043E
  0x03871D $870D: C-----  4C FF 86 JMP  $86FF
  0x038720 $8710: C--J--  AD 3D 04 LDA  $043D
  0x038723 $8713: C-----  20 09 C5 JSR  $C509
  0x038726 $8716: -D0-I-  .byte $1E ; <indirect ref>
  0x038727 $8717: -D0-I-  .byte $87 ; <indirect ref>
  0x038728 $8718: -D0-I-  .byte $21 ; <indirect ref>
  0x038729 $8719: -D0-I-  .byte $87 ; <indirect ref>
  0x03872A $871A: -D0-I-  .byte $27 ; <indirect ref>
  0x03872B $871B: -D0-I-  .byte $87 ; <indirect ref>
  0x03872C $871C: -D0-I-  .byte $2A ; <indirect ref>
  0x03872D $871D: -D0-I-  .byte $87 ; <indirect ref>
  0x03872E $871E: C--J--  4C F9 86 JMP  $86F9
  0x038731 $8721: C--J--  A9 03    LDA  #$03
  0x038733 $8723: C-----  8D 3D 04 STA  $043D
  0x038736 $8726: C-----  60       RTS  
  0x038737 $8727: C--J--  4C D0 86 JMP  $86D0
  0x03873A $872A: C--J--  A9 01    LDA  #$01
  0x03873C $872C: C-----  8D 3E 04 STA  $043E
  0x03873F $872F: C-----  4C 21 87 JMP  $8721
  0x038742 $8732: C-----  AD 42 04 LDA  $0442
  0x038745 $8735: C-----  AE 3D 04 LDX  $043D
  0x038748 $8738: C-----  20 58 8D JSR  $8D58
  0x03874B $873B: C-----  AD 30 04 LDA  $0430
  0x03874E $873E: C-----  F0 03    BEQ  $8743
  0x038750 $8740: C-----  AD 31 04 LDA  $0431
  0x038753 $8743: C-----  8D 3E 04 STA  $043E
  0x038756 $8746: C-----  60       RTS  
  0x038757 $8747: ------  .byte $03
  0x038758 $8748: ------  .byte $04
  0x038759 $8749: ------  .byte $04
  0x03875A $874A: ------  .byte $04
  0x03875B $874B: ------  .byte $04
  0x03875C $874C: ------  .byte $05
  0x03875D $874D: ------  .byte $06
  0x03875E $874E: ------  .byte $05
  0x03875F $874F: ------  .byte $06
  0x038760 $8750: ------  .byte $05
  0x038761 $8751: ------  .byte $06
  0x038762 $8752: ------  .byte $00
  0x038763 $8753: ------  .byte $06
  0x038764 $8754: ------  .byte $06
  0x038765 $8755: ------  .byte $06
  0x038766 $8756: ------  .byte $06
  0x038767 $8757: ------  .byte $07
  0x038768 $8758: ------  .byte $08
  0x038769 $8759: ------  .byte $07
  0x03876A $875A: ------  .byte $08
  0x03876B $875B: ------  .byte $07
  0x03876C $875C: ------  .byte $08
  0x03876D $875D: C-----  AD 41 04 LDA  $0441
  0x038770 $8760: C-----  20 62 8A JSR  $8A62
  0x038773 $8763: C-----  AC 21 06 LDY  $0621
  0x038776 $8766: C-----  B9 C3 87 LDA  $87C3,Y
  0x038779 $8769: C-----  85 3C    STA  $3C
  0x03877B $876B: C-----  F0 06    BEQ  $8773
  0x03877D $876D: C-----  20 B3 8A JSR  $8AB3
  0x038780 $8770: C-----  4C 9C 87 JMP  $879C
  0x038783 $8773: C-----  A9 14    LDA  #$14
  0x038785 $8775: C-----  AE 35 06 LDX  $0635
  0x038788 $8778: C-----  E0 A0    CPX  #$A0
  0x03878A $877A: C-----  B0 20    BCS  $879C
  0x03878C $877C: C-----  A9 10    LDA  #$10
  0x03878E $877E: C-----  E0 60    CPX  #$60
  0x038790 $8780: C-----  B0 1A    BCS  $879C
  0x038792 $8782: C-----  AC 37 06 LDY  $0637
  0x038795 $8785: C-----  10 04    BPL  $878B
  0x038797 $8787: C-----  98       TYA  
  0x038798 $8788: C-----  49 FF    EOR  #$FF
  0x03879A $878A: C-----  A8       TAY  
  0x03879B $878B: C-----  20 39 C5 JSR  $C539
  0x03879E $878E: C-----  A2 00    LDX  #$00
  0x0387A0 $8790: C-----  DD BE 8B CMP  $8BBE,X
  0x0387A3 $8793: C-----  F0 04    BEQ  $8799
  0x0387A5 $8795: C-----  E8       INX  
  0x0387A6 $8796: C-----  E8       INX  
  0x0387A7 $8797: C-----  D0 F7    BNE  $8790
  0x0387A9 $8799: C-----  BD BF 8B LDA  $8BBF,X
  0x0387AC $879C: C-----  A0 04    LDY  #$04
  0x0387AE $879E: C-----  20 DE 8A JSR  $8ADE
  0x0387B1 $87A1: C-----  18       CLC  
  0x0387B2 $87A2: C-----  A5 3C    LDA  $3C
  0x0387B4 $87A4: C-----  69 2E    ADC  #$2E
  0x0387B6 $87A6: C-----  85 3C    STA  $3C
  0x0387B8 $87A8: C-----  8A       TXA  
  0x0387B9 $87A9: C-----  69 B1    ADC  #$B1
  0x0387BB $87AB: C-----  85 3D    STA  $3D
  0x0387BD $87AD: C-----  20 0B 8B JSR  $8B0B
  0x0387C0 $87B0: C-----  8D 3B 04 STA  $043B
  0x0387C3 $87B3: C-----  A9 00    LDA  #$00
  0x0387C5 $87B5: C-----  8D 3C 04 STA  $043C
  0x0387C8 $87B8: C-----  A5 3F    LDA  $3F
  0x0387CA $87BA: C-----  20 09 C5 JSR  $C509
  0x0387CD $87BD: -D0-I-  .byte $C7 ; <indirect ref>
  0x0387CE $87BE: -D0-I-  .byte $87 ; <indirect ref>
  0x0387CF $87BF: -D0-I-  .byte $DA ; <indirect ref>
  0x0387D0 $87C0: -D0-I-  .byte $88 ; <indirect ref>
  0x0387D1 $87C1: -D0-I-  .byte $FD ; <indirect ref>
  0x0387D2 $87C2: -D0-I-  .byte $88 ; <indirect ref>
  0x0387D3 $87C3: -D0---  .byte $00
  0x0387D4 $87C4: -D0---  .byte $01
  0x0387D5 $87C5: -D0---  .byte $02
  0x0387D6 $87C6: -D0---  .byte $00
  0x0387D7 $87C7: C--J--  AD 3B 04 LDA  $043B
  0x0387DA $87CA: C-----  20 09 C5 JSR  $C509
  0x0387DD $87CD: ------  .byte $DF
  0x0387DE $87CE: ------  .byte $87
  0x0387DF $87CF: -D0-I-  .byte $E9 ; <indirect ref>
  0x0387E0 $87D0: -D0-I-  .byte $87 ; <indirect ref>
  0x0387E1 $87D1: -D0-I-  .byte $EF ; <indirect ref>
  0x0387E2 $87D2: -D0-I-  .byte $87 ; <indirect ref>
  0x0387E3 $87D3: -D0-I-  .byte $F2 ; <indirect ref>
  0x0387E4 $87D4: -D0-I-  .byte $87 ; <indirect ref>
  0x0387E5 $87D5: -D0-I-  .byte $FA ; <indirect ref>
  0x0387E6 $87D6: -D0-I-  .byte $87 ; <indirect ref>
  0x0387E7 $87D7: -D0-I-  .byte $4A ; <indirect ref>
  0x0387E8 $87D8: -D0-I-  .byte $88 ; <indirect ref>
  0x0387E9 $87D9: -D0-I-  .byte $55 ; <indirect ref>
  0x0387EA $87DA: -D0-I-  .byte $88 ; <indirect ref>
  0x0387EB $87DB: -D0-I-  .byte $60 ; <indirect ref>
  0x0387EC $87DC: -D0-I-  .byte $88 ; <indirect ref>
  0x0387ED $87DD: -D0-I-  .byte $A8 ; <indirect ref>
  0x0387EE $87DE: -D0-I-  .byte $88 ; <indirect ref>
  0x0387EF $87DF: ------  .byte $AD
  0x0387F0 $87E0: ------  .byte $E2
  0x0387F1 $87E1: ------  .byte $00
  0x0387F2 $87E2: ------  .byte $29
  0x0387F3 $87E3: ------  .byte $20
  0x0387F4 $87E4: ------  .byte $D0
  0x0387F5 $87E5: ------  .byte $03
  0x0387F6 $87E6: ------  .byte $4C
  0x0387F7 $87E7: ------  .byte $27
  0x0387F8 $87E8: ------  .byte $89
  0x0387F9 $87E9: C--J--  20 27 89 JSR  $8927
  0x0387FC $87EC: C-----  4C 3F 8A JMP  $8A3F
  0x0387FF $87EF: C--J--  4C 33 89 JMP  $8933
  0x038802 $87F2: C--J--  A9 02    LDA  #$02
  0x038804 $87F4: C-----  8D 3B 04 STA  $043B
  0x038807 $87F7: C-----  4C 3F 8A JMP  $8A3F
  0x03880A $87FA: C--J--  A9 03    LDA  #$03
  0x03880C $87FC: C-----  8D 3B 04 STA  $043B
  0x03880F $87FF: C-----  20 3F 8A JSR  $8A3F
  0x038812 $8802: C-----  AD 3C 04 LDA  $043C
  0x038815 $8805: C-----  D0 42    BNE  $8849
  0x038817 $8807: C-----  A9 0C    LDA  #$0C
  0x038819 $8809: C-----  85 3A    STA  $3A
  0x03881B $880B: C-----  A5 3A    LDA  $3A
  0x03881D $880D: C-----  CD 41 04 CMP  $0441
  0x038820 $8810: C-----  F0 27    BEQ  $8839
  0x038822 $8812: C-----  20 0C C5 JSR  $C50C
  0x038825 $8815: C-----  A0 06    LDY  #$06
  0x038827 $8817: C-----  B1 34    LDA  ($34),Y
  0x038829 $8819: C-----  38       SEC  
  0x03882A $881A: C-----  ED 35 06 SBC  $0635
  0x03882D $881D: C-----  B0 04    BCS  $8823
  0x03882F $881F: C-----  49 FF    EOR  #$FF
  0x038831 $8821: C-----  69 01    ADC  #$01
  0x038833 $8823: C-----  C9 14    CMP  #$14
  0x038835 $8825: C-----  B0 12    BCS  $8839
  0x038837 $8827: C-----  A0 08    LDY  #$08
  0x038839 $8829: C-----  B1 34    LDA  ($34),Y
  0x03883B $882B: C-----  38       SEC  
  0x03883C $882C: C-----  ED 37 06 SBC  $0637
  0x03883F $882F: C-----  B0 04    BCS  $8835
  0x038841 $8831: C-----  49 FF    EOR  #$FF
  0x038843 $8833: C-----  69 01    ADC  #$01
  0x038845 $8835: C-----  C9 14    CMP  #$14
  0x038847 $8837: C-----  90 0B    BCC  $8844
  0x038849 $8839: C-----  E6 3A    INC  $3A
  0x03884B $883B: C-----  A5 3A    LDA  $3A
  0x03884D $883D: C-----  C9 16    CMP  #$16
  0x03884F $883F: C-----  D0 CA    BNE  $880B
  0x038851 $8841: C-----  4C F2 87 JMP  $87F2
  0x038854 $8844: C-----  A5 3A    LDA  $3A
  0x038856 $8846: C-----  20 09 8A JSR  $8A09
  0x038859 $8849: C-----  60       RTS  
  0x03885A $884A: C--J--  A9 00    LDA  #$00
  0x03885C $884C: C-----  8D 3B 04 STA  $043B
  0x03885F $884F: C-----  A9 0C    LDA  #$0C
  0x038861 $8851: C-----  8D 3C 04 STA  $043C
  0x038864 $8854: C-----  60       RTS  
  0x038865 $8855: C--J--  A9 00    LDA  #$00
  0x038867 $8857: C-----  8D 3B 04 STA  $043B
  0x03886A $885A: C-----  A9 0D    LDA  #$0D
  0x03886C $885C: C-----  8D 3C 04 STA  $043C
  0x03886F $885F: C-----  60       RTS  
  0x038870 $8860: C--J--  A9 02    LDA  #$02
  0x038872 $8862: C-----  8D 3B 04 STA  $043B
  0x038875 $8865: C-----  2C 4B 04 BIT  $044B
  0x038878 $8868: C-----  30 3D    BMI  $88A7
  0x03887A $886A: C-----  A9 80    LDA  #$80
  0x03887C $886C: C-----  8D 4B 04 STA  $044B
  0x03887F $886F: C-----  A9 0C    LDA  #$0C
  0x038881 $8871: C-----  48       PHA  
  0x038882 $8872: C-----  20 0C C5 JSR  $C50C
  0x038885 $8875: C-----  A0 01    LDY  #$01
  0x038887 $8877: C-----  A9 80    LDA  #$80
  0x038889 $8879: C-----  91 34    STA  ($34),Y
  0x03888B $887B: C-----  C8       INY  
  0x03888C $887C: C-----  A9 C8    LDA  #$C8
  0x03888E $887E: C-----  91 34    STA  ($34),Y
  0x038890 $8880: C-----  68       PLA  
  0x038891 $8881: C-----  18       CLC  
  0x038892 $8882: C-----  69 01    ADC  #$01
  0x038894 $8884: C-----  C9 16    CMP  #$16
  0x038896 $8886: C-----  D0 E9    BNE  $8871
  0x038898 $8888: C-----  A9 01    LDA  #$01
  0x03889A $888A: C-----  8D 2F 00 STA  $002F
  0x03889D $888D: C-----  A9 00    LDA  #$00
  0x03889F $888F: C-----  8D 2D 06 STA  $062D
  0x0388A2 $8892: C-----  AD 15 06 LDA  $0615
  0x0388A5 $8895: C-----  29 BF    AND  #$BF
  0x0388A7 $8897: C-----  8D 15 06 STA  $0615
  0x0388AA $889A: C-----  A9 15    LDA  #$15
  0x0388AC $889C: C-----  20 4E C5 JSR  $C54E
  0x0388AF $889F: C-----  2C 15 06 BIT  $0615
  0x0388B2 $88A2: C-----  10 03    BPL  $88A7
  0x0388B4 $88A4: C-----  20 75 C5 JSR  $C575
  0x0388B7 $88A7: C-----  60       RTS  
  0x0388B8 $88A8: C--J--  A9 02    LDA  #$02
  0x0388BA $88AA: C-----  8D 3B 04 STA  $043B
  0x0388BD $88AD: C-----  2C 4C 04 BIT  $044C
  0x0388C0 $88B0: C-----  30 27    BMI  $88D9
  0x0388C2 $88B2: C-----  A9 80    LDA  #$80
  0x0388C4 $88B4: C-----  8D 4C 04 STA  $044C
  0x0388C7 $88B7: C-----  8D F1 03 STA  $03F1
  0x0388CA $88BA: C-----  A9 C9    LDA  #$C9
  0x0388CC $88BC: C-----  8D F2 03 STA  $03F2
  0x0388CF $88BF: C-----  A9 00    LDA  #$00
  0x0388D1 $88C1: C-----  8D 2D 06 STA  $062D
  0x0388D4 $88C4: C-----  AD 15 06 LDA  $0615
  0x0388D7 $88C7: C-----  29 BF    AND  #$BF
  0x0388D9 $88C9: C-----  8D 15 06 STA  $0615
  0x0388DC $88CC: C-----  A9 16    LDA  #$16
  0x0388DE $88CE: C-----  20 4E C5 JSR  $C54E
  0x0388E1 $88D1: C-----  2C 15 06 BIT  $0615
  0x0388E4 $88D4: C-----  10 03    BPL  $88D9
  0x0388E6 $88D6: C-----  20 75 C5 JSR  $C575
  0x0388E9 $88D9: C-----  60       RTS  
  0x0388EA $88DA: C--J--  AD 3B 04 LDA  $043B
  0x0388ED $88DD: C-----  20 09 C5 JSR  $C509
  0x0388F0 $88E0: -D0-I-  .byte $E8 ; <indirect ref>
  0x0388F1 $88E1: -D0-I-  .byte $88 ; <indirect ref>
  0x0388F2 $88E2: -D0-I-  .byte $EE ; <indirect ref>
  0x0388F3 $88E3: -D0-I-  .byte $88 ; <indirect ref>
  0x0388F4 $88E4: -D0-I-  .byte $F4 ; <indirect ref>
  0x0388F5 $88E5: -D0-I-  .byte $88 ; <indirect ref>
  0x0388F6 $88E6: -D0-I-  .byte $F7 ; <indirect ref>
  0x0388F7 $88E7: -D0-I-  .byte $88 ; <indirect ref>
  0x0388F8 $88E8: C--J--  20 27 89 JSR  $8927
  0x0388FB $88EB: C-----  4C 3F 8A JMP  $8A3F
  0x0388FE $88EE: C--J--  A9 05    LDA  #$05
  0x038900 $88F0: C-----  8D 3B 04 STA  $043B
  0x038903 $88F3: C-----  60       RTS  
  0x038904 $88F4: C--J--  4C 33 89 JMP  $8933
  0x038907 $88F7: C--J--  A9 04    LDA  #$04
  0x038909 $88F9: C-----  8D 3B 04 STA  $043B
  0x03890C $88FC: C-----  60       RTS  
  0x03890D $88FD: C--J--  AD 3B 04 LDA  $043B
  0x038910 $8900: C-----  20 09 C5 JSR  $C509
  0x038913 $8903: -D0-I-  .byte $0B ; <indirect ref>
  0x038914 $8904: -D0-I-  .byte $89 ; <indirect ref>
  0x038915 $8905: -D0-I-  .byte $11 ; <indirect ref>
  0x038916 $8906: -D0-I-  .byte $89 ; <indirect ref>
  0x038917 $8907: -D0-I-  .byte $17 ; <indirect ref>
  0x038918 $8908: -D0-I-  .byte $89 ; <indirect ref>
  0x038919 $8909: -D0-I-  .byte $1A ; <indirect ref>
  0x03891A $890A: -D0-I-  .byte $89 ; <indirect ref>
  0x03891B $890B: C--J--  A9 04    LDA  #$04
  0x03891D $890D: C-----  8D 3B 04 STA  $043B
  0x038920 $8910: C-----  60       RTS  
  0x038921 $8911: C--J--  A9 06    LDA  #$06
  0x038923 $8913: C-----  8D 3B 04 STA  $043B
  0x038926 $8916: C-----  60       RTS  
  0x038927 $8917: C--J--  4C 33 89 JMP  $8933
  0x03892A $891A: C--J--  A9 06    LDA  #$06
  0x03892C $891C: C-----  8D 3B 04 STA  $043B
  0x03892F $891F: C-----  A9 01    LDA  #$01
  0x038931 $8921: C-----  8D 3C 04 STA  $043C
  0x038934 $8924: C-----  4C 11 89 JMP  $8911
  0x038937 $8927: C-----  A9 00    LDA  #$00
  0x038939 $8929: C-----  8D 3B 04 STA  $043B
  0x03893C $892C: C-----  AD 4E 04 LDA  $044E
  0x03893F $892F: C-----  8D 3C 04 STA  $043C
  0x038942 $8932: C-----  60       RTS  
  0x038943 $8933: C-----  A0 0A    LDY  #$0A
  0x038945 $8935: C-----  B1 3A    LDA  ($3A),Y
  0x038947 $8937: C-----  20 5E 89 JSR  $895E
  0x03894A $893A: C-----  29 03    AND  #$03
  0x03894C $893C: C-----  48       PHA  
  0x03894D $893D: C-----  B1 3C    LDA  ($3C),Y
  0x03894F $893F: C-----  4A       LSR  A
  0x038950 $8940: C-----  4A       LSR  A
  0x038951 $8941: C-----  C9 0F    CMP  #$0F
  0x038953 $8943: C-----  F0 08    BEQ  $894D
  0x038955 $8945: C-----  18       CLC  
  0x038956 $8946: C-----  69 0A    ADC  #$0A
  0x038958 $8948: C-----  CD 41 04 CMP  $0441
  0x03895B $894B: C-----  D0 03    BNE  $8950
  0x03895D $894D: C-----  20 20 8A JSR  $8A20
  0x038960 $8950: C-----  85 3C    STA  $3C
  0x038962 $8952: C-----  68       PLA  
  0x038963 $8953: C-----  20 09 C5 JSR  $C509
  0x038966 $8956: -D0-I-  .byte $7E ; <indirect ref>
  0x038967 $8957: -D0-I-  .byte $89 ; <indirect ref>
  0x038968 $8958: -D0-I-  .byte $84 ; <indirect ref>
  0x038969 $8959: -D0-I-  .byte $89 ; <indirect ref>
  0x03896A $895A: -D0-I-  .byte $93 ; <indirect ref>
  0x03896B $895B: -D0-I-  .byte $89 ; <indirect ref>
  0x03896C $895C: -D0-I-  .byte $9C ; <indirect ref>
  0x03896D $895D: -D0-I-  .byte $89 ; <indirect ref>
  0x03896E $895E: C-----  A2 00    LDX  #$00
  0x038970 $8960: C-----  86 3D    STX  $3D
  0x038972 $8962: C-----  0A       ASL  A
  0x038973 $8963: C-----  26 3D    ROL  $3D
  0x038975 $8965: C-----  0A       ASL  A
  0x038976 $8966: C-----  26 3D    ROL  $3D
  0x038978 $8968: C-----  0A       ASL  A
  0x038979 $8969: C-----  26 3D    ROL  $3D
  0x03897B $896B: C-----  69 2E    ADC  #$2E
  0x03897D $896D: C-----  85 3C    STA  $3C
  0x03897F $896F: C-----  A5 3D    LDA  $3D
  0x038981 $8971: C-----  69 B7    ADC  #$B7
  0x038983 $8973: C-----  85 3D    STA  $3D
  0x038985 $8975: C-----  AD E2 00 LDA  $00E2
  0x038988 $8978: C-----  29 07    AND  #$07
  0x03898A $897A: C-----  A8       TAY  
  0x03898B $897B: C-----  B1 3C    LDA  ($3C),Y
  0x03898D $897D: C-----  60       RTS  
  0x03898E $897E: C--J--  20 B3 89 JSR  $89B3
  0x038991 $8981: C-----  4C A5 89 JMP  $89A5
  0x038994 $8984: C--J--  20 B3 89 JSR  $89B3
  0x038997 $8987: C-----  6E E2 00 ROR  $00E2
  0x03899A $898A: C-----  20 20 8A JSR  $8A20
  0x03899D $898D: C-----  20 B3 89 JSR  $89B3
  0x0389A0 $8990: C-----  4C A5 89 JMP  $89A5
  0x0389A3 $8993: C--J--  20 B3 89 JSR  $89B3
  0x0389A6 $8996: C-----  20 DA 89 JSR  $89DA
  0x0389A9 $8999: C-----  4C 87 89 JMP  $8987
  0x0389AC $899C: C--J--  20 DA 89 JSR  $89DA
  0x0389AF $899F: C-----  20 B3 89 JSR  $89B3
  0x0389B2 $89A2: C-----  4C 87 89 JMP  $8987
  0x0389B5 $89A5: C-----  AE 21 06 LDX  $0621
  0x0389B8 $89A8: C-----  BD AF 89 LDA  $89AF,X
  0x0389BB $89AB: C-----  8D 3B 04 STA  $043B
  0x0389BE $89AE: C-----  60       RTS  
  0x0389BF $89AF: -D0---  .byte $02
  0x0389C0 $89B0: ------  .byte $04
  0x0389C1 $89B1: -D0---  .byte $04
  0x0389C2 $89B2: ------  .byte $02
  0x0389C3 $89B3: C-----  A5 3C    LDA  $3C
  0x0389C5 $89B5: C-----  20 0C C5 JSR  $C50C
  0x0389C8 $89B8: C-----  A0 06    LDY  #$06
  0x0389CA $89BA: C-----  AD 35 06 LDA  $0635
  0x0389CD $89BD: C-----  38       SEC  
  0x0389CE $89BE: C-----  F1 34    SBC  ($34),Y
  0x0389D0 $89C0: C-----  B0 08    BCS  $89CA
  0x0389D2 $89C2: C-----  AD 35 06 LDA  $0635
  0x0389D5 $89C5: C-----  C9 60    CMP  #$60
  0x0389D7 $89C7: C-----  90 01    BCC  $89CA
  0x0389D9 $89C9: C-----  60       RTS  
  0x0389DA $89CA: C-----  A5 3C    LDA  $3C
  0x0389DC $89CC: C-----  20 09 8A JSR  $8A09
  0x0389DF $89CF: C-----  A9 01    LDA  #$01
  0x0389E1 $89D1: C-----  8D 3B 04 STA  $043B
  0x0389E4 $89D4: C-----  20 3F 8A JSR  $8A3F
  0x0389E7 $89D7: C-----  68       PLA  
  0x0389E8 $89D8: C-----  68       PLA  
  0x0389E9 $89D9: C-----  60       RTS  
  0x0389EA $89DA: C-----  A9 0C    LDA  #$0C
  0x0389EC $89DC: C-----  85 3E    STA  $3E
  0x0389EE $89DE: C-----  A5 3E    LDA  $3E
  0x0389F0 $89E0: C-----  CD 41 04 CMP  $0441
  0x0389F3 $89E3: C-----  F0 0B    BEQ  $89F0
  0x0389F5 $89E5: C-----  20 0C C5 JSR  $C50C
  0x0389F8 $89E8: C-----  A0 06    LDY  #$06
  0x0389FA $89EA: C-----  B1 34    LDA  ($34),Y
  0x0389FC $89EC: C-----  C9 60    CMP  #$60
  0x0389FE $89EE: C-----  90 09    BCC  $89F9
  0x038A00 $89F0: C-----  E6 3E    INC  $3E
  0x038A02 $89F2: C-----  A5 3E    LDA  $3E
  0x038A04 $89F4: C-----  C9 16    CMP  #$16
  0x038A06 $89F6: C-----  D0 E6    BNE  $89DE
  0x038A08 $89F8: C-----  60       RTS  
  0x038A09 $89F9: C-----  A5 3E    LDA  $3E
  0x038A0B $89FB: C-----  20 09 8A JSR  $8A09
  0x038A0E $89FE: C-----  A9 01    LDA  #$01
  0x038A10 $8A00: C-----  8D 3B 04 STA  $043B
  0x038A13 $8A03: C-----  20 3F 8A JSR  $8A3F
  0x038A16 $8A06: C-----  68       PLA  
  0x038A17 $8A07: C-----  68       PLA  
  0x038A18 $8A08: C-----  60       RTS  
  0x038A19 $8A09: C-----  8D FC 05 STA  $05FC
  0x038A1C $8A0C: C-----  20 0C C5 JSR  $C50C
  0x038A1F $8A0F: C-----  A0 06    LDY  #$06
  0x038A21 $8A11: C-----  B1 34    LDA  ($34),Y
  0x038A23 $8A13: C-----  AA       TAX  
  0x038A24 $8A14: C-----  A0 08    LDY  #$08
  0x038A26 $8A16: C-----  B1 34    LDA  ($34),Y
  0x038A28 $8A18: C-----  A8       TAY  
  0x038A29 $8A19: C-----  20 39 C5 JSR  $C539
  0x038A2C $8A1C: C-----  8D 38 06 STA  $0638
  0x038A2F $8A1F: C-----  60       RTS  
  0x038A30 $8A20: C-----  AD E2 00 LDA  $00E2
  0x038A33 $8A23: C-----  6D E3 00 ADC  $00E3
  0x038A36 $8A26: C-----  29 0F    AND  #$0F
  0x038A38 $8A28: C-----  C9 0A    CMP  #$0A
  0x038A3A $8A2A: C-----  90 02    BCC  $8A2E
  0x038A3C $8A2C: C-----  E9 0A    SBC  #$0A
  0x038A3E $8A2E: C-----  18       CLC  
  0x038A3F $8A2F: C-----  69 0C    ADC  #$0C
  0x038A41 $8A31: C-----  CD 41 04 CMP  $0441
  0x038A44 $8A34: C-----  D0 08    BNE  $8A3E
  0x038A46 $8A36: C-----  69 01    ADC  #$01
  0x038A48 $8A38: C-----  C9 16    CMP  #$16
  0x038A4A $8A3A: C-----  90 02    BCC  $8A3E
  0x038A4C $8A3C: C-----  A9 0C    LDA  #$0C
  0x038A4E $8A3E: C-----  60       RTS  
  0x038A4F $8A3F: C-----  AD 41 04 LDA  $0441
  0x038A52 $8A42: C-----  AE 3B 04 LDX  $043B
  0x038A55 $8A45: C-----  20 06 8C JSR  $8C06
  0x038A58 $8A48: C-----  AD 30 04 LDA  $0430
  0x038A5B $8A4B: C-----  F0 03    BEQ  $8A50
  0x038A5D $8A4D: C-----  AD 31 04 LDA  $0431
  0x038A60 $8A50: C-----  8D 3C 04 STA  $043C
  0x038A63 $8A53: C-----  AA       TAX  
  0x038A64 $8A54: C-----  D0 0B    BNE  $8A61
  0x038A66 $8A56: C-----  AD 3B 04 LDA  $043B
  0x038A69 $8A59: C-----  D0 06    BNE  $8A61
  0x038A6B $8A5B: C-----  AD 4E 04 LDA  $044E
  0x038A6E $8A5E: C-----  8D 3C 04 STA  $043C
  0x038A71 $8A61: C-----  60       RTS  
  0x038A72 $8A62: C-----  48       PHA  
  0x038A73 $8A63: C-----  20 0C C5 JSR  $C50C
  0x038A76 $8A66: C-----  A0 00    LDY  #$00
  0x038A78 $8A68: C-----  B1 34    LDA  ($34),Y
  0x038A7A $8A6A: C-----  D0 08    BNE  $8A74
  0x038A7C $8A6C: C-----  68       PLA  
  0x038A7D $8A6D: C-----  48       PHA  
  0x038A7E $8A6E: C-----  AA       TAX  
  0x038A7F $8A6F: C-----  BC 9D 8A LDY  $8A9D,X
  0x038A82 $8A72: C-----  B1 38    LDA  ($38),Y
  0x038A84 $8A74: C-----  AA       TAX  
  0x038A85 $8A75: C-----  A0 01    LDY  #$01
  0x038A87 $8A77: C-----  B1 34    LDA  ($34),Y
  0x038A89 $8A79: C-----  10 04    BPL  $8A7F
  0x038A8B $8A7B: C-----  C8       INY  
  0x038A8C $8A7C: C-----  B1 34    LDA  ($34),Y
  0x038A8E $8A7E: C-----  AA       TAX  
  0x038A8F $8A7F: C-----  8A       TXA  
  0x038A90 $8A80: C-----  38       SEC  
  0x038A91 $8A81: C-----  E9 23    SBC  #$23
  0x038A93 $8A83: C-----  A2 00    LDX  #$00
  0x038A95 $8A85: C-----  86 3B    STX  $3B
  0x038A97 $8A87: C-----  0A       ASL  A
  0x038A98 $8A88: C-----  26 3B    ROL  $3B
  0x038A9A $8A8A: C-----  0A       ASL  A
  0x038A9B $8A8B: C-----  26 3B    ROL  $3B
  0x038A9D $8A8D: C-----  85 3A    STA  $3A
  0x038A9F $8A8F: C-----  A6 3B    LDX  $3B
  0x038AA1 $8A91: C-----  0A       ASL  A
  0x038AA2 $8A92: C-----  26 3B    ROL  $3B
  0x038AA4 $8A94: C-----  65 3A    ADC  $3A
  0x038AA6 $8A96: C-----  48       PHA  
  0x038AA7 $8A97: C-----  8A       TXA  
  0x038AA8 $8A98: C-----  65 3B    ADC  $3B
  0x038AAA $8A9A: C-----  AA       TAX  
  0x038AAB $8A9B: C-----  68       PLA  
  0x038AAC $8A9C: C-----  18       CLC  
  0x038AAD $8A9D: C-----  69 62    ADC  #$62
  0x038AAF $8A9F: C-----  85 3A    STA  $3A
  0x038AB1 $8AA1: C-----  8A       TXA  
  0x038AB2 $8AA2: C-----  69 96    ADC  #$96
  0x038AB4 $8AA4: C-----  85 3B    STA  $3B
  0x038AB6 $8AA6: C-----  68       PLA  
  0x038AB7 $8AA7: C-----  60       RTS  
  0x038AB8 $8AA8: -D0---  .byte $02
  0x038AB9 $8AA9: -D0---  .byte $03
  0x038ABA $8AAA: -D0---  .byte $03
  0x038ABB $8AAB: -D0---  .byte $03
  0x038ABC $8AAC: -D0---  .byte $03
  0x038ABD $8AAD: -D0---  .byte $04
  0x038ABE $8AAE: -D0---  .byte $05
  0x038ABF $8AAF: -D0---  .byte $04
  0x038AC0 $8AB0: -D0---  .byte $05
  0x038AC1 $8AB1: -D0---  .byte $04
  0x038AC2 $8AB2: -D0---  .byte $05
  0x038AC3 $8AB3: C-----  AD 35 06 LDA  $0635
  0x038AC6 $8AB6: C-----  10 02    BPL  $8ABA
  0x038AC8 $8AB8: C-----  49 FF    EOR  #$FF
  0x038ACA $8ABA: C-----  AA       TAX  
  0x038ACB $8ABB: C-----  AD 37 06 LDA  $0637
  0x038ACE $8ABE: C-----  10 02    BPL  $8AC2
  0x038AD0 $8AC0: C-----  49 FF    EOR  #$FF
  0x038AD2 $8AC2: C-----  A8       TAY  
  0x038AD3 $8AC3: C-----  20 39 C5 JSR  $C539
  0x038AD6 $8AC6: C-----  A2 00    LDX  #$00
  0x038AD8 $8AC8: C-----  DD 9E 8B CMP  $8B9E,X
  0x038ADB $8ACB: C-----  F0 04    BEQ  $8AD1
  0x038ADD $8ACD: C-----  E8       INX  
  0x038ADE $8ACE: C-----  E8       INX  
  0x038ADF $8ACF: C-----  D0 F7    BNE  $8AC8
  0x038AE1 $8AD1: C-----  BD 9F 8B LDA  $8B9F,X
  0x038AE4 $8AD4: C-----  A6 3C    LDX  $3C
  0x038AE6 $8AD6: C-----  E0 01    CPX  #$01
  0x038AE8 $8AD8: C-----  F0 03    BEQ  $8ADD
  0x038AEA $8ADA: C-----  18       CLC  
  0x038AEB $8ADB: C-----  69 0C    ADC  #$0C
  0x038AED $8ADD: C-----  60       RTS  
  0x038AEE $8ADE: C-----  85 3E    STA  $3E
  0x038AF0 $8AE0: C-----  A5 3C    LDA  $3C
  0x038AF2 $8AE2: C-----  85 3F    STA  $3F
  0x038AF4 $8AE4: C-----  98       TYA  
  0x038AF5 $8AE5: C-----  18       CLC  
  0x038AF6 $8AE6: C-----  65 3C    ADC  $3C
  0x038AF8 $8AE8: C-----  A8       TAY  
  0x038AF9 $8AE9: C-----  B1 3A    LDA  ($3A),Y
  0x038AFB $8AEB: C-----  A0 00    LDY  #$00
  0x038AFD $8AED: C-----  84 3D    STY  $3D
  0x038AFF $8AEF: C-----  0A       ASL  A
  0x038B00 $8AF0: C-----  26 3D    ROL  $3D
  0x038B02 $8AF2: C-----  0A       ASL  A
  0x038B03 $8AF3: C-----  26 3D    ROL  $3D
  0x038B05 $8AF5: C-----  0A       ASL  A
  0x038B06 $8AF6: C-----  26 3D    ROL  $3D
  0x038B08 $8AF8: C-----  0A       ASL  A
  0x038B09 $8AF9: C-----  26 3D    ROL  $3D
  0x038B0B $8AFB: C-----  85 3C    STA  $3C
  0x038B0D $8AFD: C-----  A6 3D    LDX  $3D
  0x038B0F $8AFF: C-----  0A       ASL  A
  0x038B10 $8B00: C-----  26 3D    ROL  $3D
  0x038B12 $8B02: C-----  65 3C    ADC  $3C
  0x038B14 $8B04: C-----  85 3C    STA  $3C
  0x038B16 $8B06: C-----  8A       TXA  
  0x038B17 $8B07: C-----  65 3D    ADC  $3D
  0x038B19 $8B09: C-----  AA       TAX  
  0x038B1A $8B0A: C-----  60       RTS  
  0x038B1B $8B0B: C-----  AD E2 00 LDA  $00E2
  0x038B1E $8B0E: C-----  29 07    AND  #$07
  0x038B20 $8B10: C-----  4A       LSR  A
  0x038B21 $8B11: C-----  08       PHP  
  0x038B22 $8B12: C-----  18       CLC  
  0x038B23 $8B13: C-----  65 3E    ADC  $3E
  0x038B25 $8B15: C-----  A8       TAY  
  0x038B26 $8B16: C-----  B1 3C    LDA  ($3C),Y
  0x038B28 $8B18: C-----  28       PLP  
  0x038B29 $8B19: C-----  B0 04    BCS  $8B1F
  0x038B2B $8B1B: C-----  4A       LSR  A
  0x038B2C $8B1C: C-----  4A       LSR  A
  0x038B2D $8B1D: C-----  4A       LSR  A
  0x038B2E $8B1E: C-----  4A       LSR  A
  0x038B2F $8B1F: C-----  29 0F    AND  #$0F
  0x038B31 $8B21: C-----  60       RTS  
  0x038B32 $8B22: C-----  A9 0B    LDA  #$0B
  0x038B34 $8B24: C-----  48       PHA  
  0x038B35 $8B25: C-----  20 0C C5 JSR  $C50C
  0x038B38 $8B28: C-----  A0 00    LDY  #$00
  0x038B3A $8B2A: C-----  A9 00    LDA  #$00
  0x038B3C $8B2C: C-----  91 34    STA  ($34),Y
  0x038B3E $8B2E: C-----  C8       INY  
  0x038B3F $8B2F: C-----  91 34    STA  ($34),Y
  0x038B41 $8B31: C-----  68       PLA  
  0x038B42 $8B32: C-----  18       CLC  
  0x038B43 $8B33: C-----  69 01    ADC  #$01
  0x038B45 $8B35: C-----  C9 16    CMP  #$16
  0x038B47 $8B37: C-----  D0 EB    BNE  $8B24
  0x038B49 $8B39: C-----  AD 2B 00 LDA  $002B
  0x038B4C $8B3C: C-----  38       SEC  
  0x038B4D $8B3D: C-----  E9 03    SBC  #$03
  0x038B4F $8B3F: C-----  0A       ASL  A
  0x038B50 $8B40: C-----  AA       TAX  
  0x038B51 $8B41: C-----  BD B2 BA LDA  $BAB2,X
  0x038B54 $8B44: C-----  85 38    STA  $38
  0x038B56 $8B46: C-----  BD B3 BA LDA  $BAB3,X
  0x038B59 $8B49: C-----  85 39    STA  $39
  0x038B5B $8B4B: C-----  A0 00    LDY  #$00
  0x038B5D $8B4D: C-----  B1 38    LDA  ($38),Y
  0x038B5F $8B4F: C-----  29 0F    AND  #$0F
  0x038B61 $8B51: C-----  8D 2E 00 STA  $002E
  0x038B64 $8B54: C-----  B1 38    LDA  ($38),Y
  0x038B66 $8B56: C-----  4A       LSR  A
  0x038B67 $8B57: C-----  4A       LSR  A
  0x038B68 $8B58: C-----  4A       LSR  A
  0x038B69 $8B59: C-----  4A       LSR  A
  0x038B6A $8B5A: C-----  8D 2F 00 STA  $002F
  0x038B6D $8B5D: C-----  A0 09    LDY  #$09
  0x038B6F $8B5F: C-----  84 3A    STY  $3A
  0x038B71 $8B61: C-----  A4 3A    LDY  $3A
  0x038B73 $8B63: C-----  B1 38    LDA  ($38),Y
  0x038B75 $8B65: C-----  C9 0F    CMP  #$0F
  0x038B77 $8B67: C-----  F0 15    BEQ  $8B7E
  0x038B79 $8B69: C-----  18       CLC  
  0x038B7A $8B6A: C-----  69 0A    ADC  #$0A
  0x038B7C $8B6C: C-----  20 0C C5 JSR  $C50C
  0x038B7F $8B6F: C-----  A4 3A    LDY  $3A
  0x038B81 $8B71: C-----  C8       INY  
  0x038B82 $8B72: C-----  B1 38    LDA  ($38),Y
  0x038B84 $8B74: C-----  C8       INY  
  0x038B85 $8B75: C-----  84 3A    STY  $3A
  0x038B87 $8B77: C-----  A0 00    LDY  #$00
  0x038B89 $8B79: C-----  91 34    STA  ($34),Y
  0x038B8B $8B7B: C-----  4C 61 8B JMP  $8B61
  0x038B8E $8B7E: C-----  AE 46 04 LDX  $0446
  0x038B91 $8B81: C-----  E0 05    CPX  #$05
  0x038B93 $8B83: C-----  F0 0B    BEQ  $8B90
  0x038B95 $8B85: C-----  A2 00    LDX  #$00
  0x038B97 $8B87: C-----  AD 84 03 LDA  $0384
  0x038B9A $8B8A: C-----  C9 26    CMP  #$26
  0x038B9C $8B8C: C-----  D0 02    BNE  $8B90
  0x038B9E $8B8E: C-----  E8       INX  
  0x038B9F $8B8F: C-----  E8       INX  
  0x038BA0 $8B90: C-----  8E 46 04 STX  $0446
  0x038BA3 $8B93: C-----  60       RTS  
  0x038BA4 $8B94: ------  .byte $03
  0x038BA5 $8B95: ------  .byte $03
  0x038BA6 $8B96: ------  .byte $03
  0x038BA7 $8B97: ------  .byte $03
  0x038BA8 $8B98: ------  .byte $04
  0x038BA9 $8B99: ------  .byte $05
  0x038BAA $8B9A: ------  .byte $04
  0x038BAB $8B9B: ------  .byte $05
  0x038BAC $8B9C: ------  .byte $04
  0x038BAD $8B9D: ------  .byte $05
  0x038BAE $8B9E: -D0---  .byte $02
  0x038BAF $8B9F: -D0---  .byte $18
  0x038BB0 $8BA0: -D0---  .byte $03
  0x038BB1 $8BA1: -D0---  .byte $18
  0x038BB2 $8BA2: -D0---  .byte $0E
  0x038BB3 $8BA3: -D0---  .byte $18
  0x038BB4 $8BA4: -D0---  .byte $0F
  0x038BB5 $8BA5: -D0---  .byte $18
  0x038BB6 $8BA6: -D0---  .byte $1A
  0x038BB7 $8BA7: -D0---  .byte $1C
  0x038BB8 $8BA8: -D0---  .byte $1B
  0x038BB9 $8BA9: -D0---  .byte $1C
  0x038BBA $8BAA: -D0---  .byte $1C
  0x038BBB $8BAB: -D0---  .byte $1C
  0x038BBC $8BAC: -D0---  .byte $1D
  0x038BBD $8BAD: -D0---  .byte $1C
  0x038BBE $8BAE: -D0---  .byte $26
  0x038BBF $8BAF: -D0---  .byte $1C
  0x038BC0 $8BB0: -D0---  .byte $27
  0x038BC1 $8BB1: -D0---  .byte $1C
  0x038BC2 $8BB2: -D0---  .byte $28
  0x038BC3 $8BB3: -D0---  .byte $1C
  0x038BC4 $8BB4: -D0---  .byte $29
  0x038BC5 $8BB5: -D0---  .byte $1C
  0x038BC6 $8BB6: -D0---  .byte $04
  0x038BC7 $8BB7: -D0---  .byte $20
  0x038BC8 $8BB8: -D0---  .byte $05
  0x038BC9 $8BB9: -D0---  .byte $20
  0x038BCA $8BBA: -D0---  .byte $10
  0x038BCB $8BBB: -D0---  .byte $20
  0x038BCC $8BBC: -D0---  .byte $11
  0x038BCD $8BBD: -D0---  .byte $20
  0x038BCE $8BBE: -D0---  .byte $00
  0x038BCF $8BBF: -D0---  .byte $00
  0x038BD0 $8BC0: -D0---  .byte $0C
  0x038BD1 $8BC1: -D0---  .byte $00
  0x038BD2 $8BC2: -D0---  .byte $18
  0x038BD3 $8BC3: -D0---  .byte $00
  0x038BD4 $8BC4: -D0---  .byte $24
  0x038BD5 $8BC5: -D0---  .byte $00
  0x038BD6 $8BC6: -D0---  .byte $30
  0x038BD7 $8BC7: -D0---  .byte $00
  0x038BD8 $8BC8: -D0---  .byte $3C
  0x038BD9 $8BC9: -D0---  .byte $00
  0x038BDA $8BCA: -D0---  .byte $01
  0x038BDB $8BCB: -D0---  .byte $00
  0x038BDC $8BCC: -D0---  .byte $0D
  0x038BDD $8BCD: -D0---  .byte $00
  0x038BDE $8BCE: -D0---  .byte $19
  0x038BDF $8BCF: -D0---  .byte $00
  0x038BE0 $8BD0: -D0---  .byte $25
  0x038BE1 $8BD1: -D0---  .byte $00
  0x038BE2 $8BD2: -D0---  .byte $31
  0x038BE3 $8BD3: -D0---  .byte $00
  0x038BE4 $8BD4: -D0---  .byte $3D
  0x038BE5 $8BD5: -D0---  .byte $00
  0x038BE6 $8BD6: -D0---  .byte $02
  0x038BE7 $8BD7: -D0---  .byte $00
  0x038BE8 $8BD8: -D0---  .byte $0E
  0x038BE9 $8BD9: -D0---  .byte $00
  0x038BEA $8BDA: -D0---  .byte $03
  0x038BEB $8BDB: -D0---  .byte $00
  0x038BEC $8BDC: -D0---  .byte $0F
  0x038BED $8BDD: -D0---  .byte $00
  0x038BEE $8BDE: -D0---  .byte $32
  0x038BEF $8BDF: -D0---  .byte $04
  0x038BF0 $8BE0: -D0---  .byte $3E
  0x038BF1 $8BE1: -D0---  .byte $04
  0x038BF2 $8BE2: -D0---  .byte $33
  0x038BF3 $8BE3: -D0---  .byte $04
  0x038BF4 $8BE4: -D0---  .byte $3F
  0x038BF5 $8BE5: -D0---  .byte $04
  0x038BF6 $8BE6: -D0---  .byte $34
  0x038BF7 $8BE7: -D0---  .byte $04
  0x038BF8 $8BE8: -D0---  .byte $40
  0x038BF9 $8BE9: -D0---  .byte $04
  0x038BFA $8BEA: -D0---  .byte $35
  0x038BFB $8BEB: -D0---  .byte $04
  0x038BFC $8BEC: -D0---  .byte $41
  0x038BFD $8BED: -D0---  .byte $04
  0x038BFE $8BEE: -D0---  .byte $1A
  0x038BFF $8BEF: -D0---  .byte $08
  0x038C00 $8BF0: -D0---  .byte $26
  0x038C01 $8BF1: -D0---  .byte $08
  0x038C02 $8BF2: -D0---  .byte $1B
  0x038C03 $8BF3: -D0---  .byte $08
  0x038C04 $8BF4: -D0---  .byte $27
  0x038C05 $8BF5: -D0---  .byte $08
  0x038C06 $8BF6: -D0---  .byte $1C
  0x038C07 $8BF7: -D0---  .byte $08
  0x038C08 $8BF8: -D0---  .byte $28
  0x038C09 $8BF9: -D0---  .byte $08
  0x038C0A $8BFA: -D0---  .byte $1D
  0x038C0B $8BFB: -D0---  .byte $08
  0x038C0C $8BFC: -D0---  .byte $29
  0x038C0D $8BFD: -D0---  .byte $08
  0x038C0E $8BFE: -D0---  .byte $04
  0x038C0F $8BFF: -D0---  .byte $0C
  0x038C10 $8C00: -D0---  .byte $10
  0x038C11 $8C01: -D0---  .byte $0C
  0x038C12 $8C02: -D0---  .byte $05
  0x038C13 $8C03: -D0---  .byte $0C
  0x038C14 $8C04: -D0---  .byte $11
  0x038C15 $8C05: -D0---  .byte $0C
  0x038C16 $8C06: C-----  E0 04    CPX  #$04
  0x038C18 $8C08: C-----  B0 1C    BCS  $8C26
  0x038C1A $8C0A: C-----  AC 4E 04 LDY  $044E
  0x038C1D $8C0D: C-----  F0 04    BEQ  $8C13
  0x038C1F $8C0F: C-----  E0 02    CPX  #$02
  0x038C21 $8C11: C-----  B0 13    BCS  $8C26
  0x038C23 $8C13: C-----  20 C9 8D JSR  $8DC9
  0x038C26 $8C16: C-----  AD 30 04 LDA  $0430
  0x038C29 $8C19: C-----  0A       ASL  A
  0x038C2A $8C1A: C-----  A8       TAY  
  0x038C2B $8C1B: C-----  B1 48    LDA  ($48),Y
  0x038C2D $8C1D: C-----  C8       INY  
  0x038C2E $8C1E: C-----  D1 48    CMP  ($48),Y
  0x038C30 $8C20: C-----  D0 0A    BNE  $8C2C
  0x038C32 $8C22: C-----  C9 00    CMP  #$00
  0x038C34 $8C24: C-----  D0 06    BNE  $8C2C
  0x038C36 $8C26: C-----  A9 00    LDA  #$00
  0x038C38 $8C28: C-----  8D 30 04 STA  $0430
  0x038C3B $8C2B: C-----  60       RTS  
  0x038C3C $8C2C: C-----  AA       TAX  
  0x038C3D $8C2D: C-----  B1 48    LDA  ($48),Y
  0x038C3F $8C2F: C-----  85 49    STA  $49
  0x038C41 $8C31: C-----  86 48    STX  $48
  0x038C43 $8C33: C-----  AD 30 04 LDA  $0430
  0x038C46 $8C36: C-----  A2 00    LDX  #$00
  0x038C48 $8C38: C-----  8E 30 04 STX  $0430
  0x038C4B $8C3B: C-----  20 09 C5 JSR  $C509
  0x038C4E $8C3E: -D0-I-  .byte $46 ; <indirect ref>
  0x038C4F $8C3F: -D0-I-  .byte $8C ; <indirect ref>
  0x038C50 $8C40: -D0-I-  .byte $41 ; <indirect ref>
  0x038C51 $8C41: -D0-I-  .byte $8D ; <indirect ref>
  0x038C52 $8C42: -D0-I-  .byte $4E ; <indirect ref>
  0x038C53 $8C43: -D0-I-  .byte $8D ; <indirect ref>
  0x038C54 $8C44: -D0-I-  .byte $55 ; <indirect ref>
  0x038C55 $8C45: -D0-I-  .byte $8D ; <indirect ref>
  0x038C56 $8C46: C--J--  A9 00    LDA  #$00
  0x038C58 $8C48: C-----  85 46    STA  $46
  0x038C5A $8C4A: C-----  A4 46    LDY  $46
  0x038C5C $8C4C: C-----  B1 48    LDA  ($48),Y
  0x038C5E $8C4E: C-----  4A       LSR  A
  0x038C5F $8C4F: C-----  4A       LSR  A
  0x038C60 $8C50: C-----  85 47    STA  $47
  0x038C62 $8C52: C-----  B1 48    LDA  ($48),Y
  0x038C64 $8C54: C-----  29 03    AND  #$03
  0x038C66 $8C56: C-----  C9 03    CMP  #$03
  0x038C68 $8C58: C-----  F0 24    BEQ  $8C7E
  0x038C6A $8C5A: C-----  CD 4E 04 CMP  $044E
  0x038C6D $8C5D: C-----  D0 03    BNE  $8C62
  0x038C6F $8C5F: C-----  20 7F 8C JSR  $8C7F
  0x038C72 $8C62: C-----  E6 46    INC  $46
  0x038C74 $8C64: C-----  A5 47    LDA  $47
  0x038C76 $8C66: C-----  C9 08    CMP  #$08
  0x038C78 $8C68: C-----  F0 10    BEQ  $8C7A
  0x038C7A $8C6A: C-----  C9 09    CMP  #$09
  0x038C7C $8C6C: C-----  F0 0C    BEQ  $8C7A
  0x038C7E $8C6E: C-----  C9 0A    CMP  #$0A
  0x038C80 $8C70: C-----  F0 08    BEQ  $8C7A
  0x038C82 $8C72: C-----  C9 11    CMP  #$11
  0x038C84 $8C74: C-----  F0 04    BEQ  $8C7A
  0x038C86 $8C76: C-----  C9 13    CMP  #$13
  0x038C88 $8C78: C-----  D0 D0    BNE  $8C4A
  0x038C8A $8C7A: C-----  E6 46    INC  $46
  0x038C8C $8C7C: C-----  D0 CC    BNE  $8C4A
  0x038C8E $8C7E: C-----  60       RTS  
  0x038C8F $8C7F: C-----  A5 47    LDA  $47
  0x038C91 $8C81: C-----  38       SEC  
  0x038C92 $8C82: C-----  E9 03    SBC  #$03
  0x038C94 $8C84: C-----  20 09 C5 JSR  $C509
  0x038C97 $8C87: -D0-I-  .byte $C7 ; <indirect ref>
  0x038C98 $8C88: -D0-I-  .byte $8C ; <indirect ref>
  0x038C99 $8C89: -D0-I-  .byte $CC ; <indirect ref>
  0x038C9A $8C8A: -D0-I-  .byte $8C ; <indirect ref>
  0x038C9B $8C8B: -D0-I-  .byte $C7 ; <indirect ref>
  0x038C9C $8C8C: -D0-I-  .byte $8C ; <indirect ref>
  0x038C9D $8C8D: -D0-I-  .byte $C7 ; <indirect ref>
  0x038C9E $8C8E: -D0-I-  .byte $8C ; <indirect ref>
  0x038C9F $8C8F: -D0-I-  .byte $C7 ; <indirect ref>
  0x038CA0 $8C90: -D0-I-  .byte $8C ; <indirect ref>
  0x038CA1 $8C91: -D0-I-  .byte $D4 ; <indirect ref>
  0x038CA2 $8C92: -D0-I-  .byte $8C ; <indirect ref>
  0x038CA3 $8C93: -D0-I-  .byte $D4 ; <indirect ref>
  0x038CA4 $8C94: -D0-I-  .byte $8C ; <indirect ref>
  0x038CA5 $8C95: -D0-I-  .byte $FA ; <indirect ref>
  0x038CA6 $8C96: -D0-I-  .byte $8C ; <indirect ref>
  0x038CA7 $8C97: -D0-I-  .byte $C7 ; <indirect ref>
  0x038CA8 $8C98: -D0-I-  .byte $8C ; <indirect ref>
  0x038CA9 $8C99: -D0-I-  .byte $C7 ; <indirect ref>
  0x038CAA $8C9A: -D0-I-  .byte $8C ; <indirect ref>
  0x038CAB $8C9B: -D0-I-  .byte $C7 ; <indirect ref>
  0x038CAC $8C9C: -D0-I-  .byte $8C ; <indirect ref>
  0x038CAD $8C9D: -D0-I-  .byte $C7 ; <indirect ref>
  0x038CAE $8C9E: -D0-I-  .byte $8C ; <indirect ref>
  0x038CAF $8C9F: -D0-I-  .byte $C7 ; <indirect ref>
  0x038CB0 $8CA0: -D0-I-  .byte $8C ; <indirect ref>
  0x038CB1 $8CA1: -D0-I-  .byte $C7 ; <indirect ref>
  0x038CB2 $8CA2: -D0-I-  .byte $8C ; <indirect ref>
  0x038CB3 $8CA3: -D0-I-  .byte $21 ; <indirect ref>
  0x038CB4 $8CA4: -D0-I-  .byte $8D ; <indirect ref>
  0x038CB5 $8CA5: -D0-I-  .byte $2A ; <indirect ref>
  0x038CB6 $8CA6: -D0-I-  .byte $8D ; <indirect ref>
  0x038CB7 $8CA7: -D0-I-  .byte $D4 ; <indirect ref>
  0x038CB8 $8CA8: -D0-I-  .byte $8C ; <indirect ref>
  0x038CB9 $8CA9: -D0-I-  .byte $C7 ; <indirect ref>
  0x038CBA $8CAA: -D0-I-  .byte $8C ; <indirect ref>
  0x038CBB $8CAB: -D0-I-  .byte $C7 ; <indirect ref>
  0x038CBC $8CAC: -D0-I-  .byte $8C ; <indirect ref>
  0x038CBD $8CAD: -D0-I-  .byte $C7 ; <indirect ref>
  0x038CBE $8CAE: -D0-I-  .byte $8C ; <indirect ref>
  0x038CBF $8CAF: -D0-I-  .byte $C7 ; <indirect ref>
  0x038CC0 $8CB0: -D0-I-  .byte $8C ; <indirect ref>
  0x038CC1 $8CB1: -D0-I-  .byte $C7 ; <indirect ref>
  0x038CC2 $8CB2: -D0-I-  .byte $8C ; <indirect ref>
  0x038CC3 $8CB3: -D0-I-  .byte $C7 ; <indirect ref>
  0x038CC4 $8CB4: -D0-I-  .byte $8C ; <indirect ref>
  0x038CC5 $8CB5: -D0-I-  .byte $C7 ; <indirect ref>
  0x038CC6 $8CB6: -D0-I-  .byte $8C ; <indirect ref>
  0x038CC7 $8CB7: -D0-I-  .byte $C7 ; <indirect ref>
  0x038CC8 $8CB8: -D0-I-  .byte $8C ; <indirect ref>
  0x038CC9 $8CB9: -D0-I-  .byte $C7 ; <indirect ref>
  0x038CCA $8CBA: -D0-I-  .byte $8C ; <indirect ref>
  0x038CCB $8CBB: -D0-I-  .byte $C7 ; <indirect ref>
  0x038CCC $8CBC: -D0-I-  .byte $8C ; <indirect ref>
  0x038CCD $8CBD: -D0-I-  .byte $C7 ; <indirect ref>
  0x038CCE $8CBE: -D0-I-  .byte $8C ; <indirect ref>
  0x038CCF $8CBF: -D0-I-  .byte $C7 ; <indirect ref>
  0x038CD0 $8CC0: -D0-I-  .byte $8C ; <indirect ref>
  0x038CD1 $8CC1: -D0-I-  .byte $C7 ; <indirect ref>
  0x038CD2 $8CC2: -D0-I-  .byte $8C ; <indirect ref>
  0x038CD3 $8CC3: -D0-I-  .byte $C7 ; <indirect ref>
  0x038CD4 $8CC4: -D0-I-  .byte $8C ; <indirect ref>
  0x038CD5 $8CC5: -D0-I-  .byte $C7 ; <indirect ref>
  0x038CD6 $8CC6: -D0-I-  .byte $8C ; <indirect ref>
  0x038CD7 $8CC7: C--J--  A5 47    LDA  $47
  0x038CD9 $8CC9: C-----  4C 11 8E JMP  $8E11
  0x038CDC $8CCC: C--J--  AD 46 04 LDA  $0446
  0x038CDF $8CCF: C-----  C9 05    CMP  #$05
  0x038CE1 $8CD1: C-----  F0 F4    BEQ  $8CC7
  0x038CE3 $8CD3: C-----  60       RTS  
  0x038CE4 $8CD4: C--J--  A4 46    LDY  $46
  0x038CE6 $8CD6: C-----  C8       INY  
  0x038CE7 $8CD7: C-----  B1 48    LDA  ($48),Y
  0x038CE9 $8CD9: C-----  C9 FF    CMP  #$FF
  0x038CEB $8CDB: C-----  F0 1A    BEQ  $8CF7
  0x038CED $8CDD: C-----  85 45    STA  $45
  0x038CEF $8CDF: C-----  A9 01    LDA  #$01
  0x038CF1 $8CE1: C-----  48       PHA  
  0x038CF2 $8CE2: C-----  20 0C C5 JSR  $C50C
  0x038CF5 $8CE5: C-----  A0 00    LDY  #$00
  0x038CF7 $8CE7: C-----  B1 34    LDA  ($34),Y
  0x038CF9 $8CE9: C-----  C5 45    CMP  $45
  0x038CFB $8CEB: C-----  F0 09    BEQ  $8CF6
  0x038CFD $8CED: C-----  68       PLA  
  0x038CFE $8CEE: C-----  18       CLC  
  0x038CFF $8CEF: C-----  69 01    ADC  #$01
  0x038D01 $8CF1: C-----  C9 0B    CMP  #$0B
  0x038D03 $8CF3: C-----  D0 EC    BNE  $8CE1
  0x038D05 $8CF5: C-----  60       RTS  
  0x038D06 $8CF6: C-----  68       PLA  
  0x038D07 $8CF7: C-----  4C C7 8C JMP  $8CC7
  0x038D0A $8CFA: C--J--  A4 46    LDY  $46
  0x038D0C $8CFC: C-----  C8       INY  
  0x038D0D $8CFD: C-----  B1 48    LDA  ($48),Y
  0x038D0F $8CFF: C-----  C9 FF    CMP  #$FF
  0x038D11 $8D01: C-----  D0 03    BNE  $8D06
  0x038D13 $8D03: C-----  4C C7 8C JMP  $8CC7
  0x038D16 $8D06: C-----  A9 01    LDA  #$01
  0x038D18 $8D08: C-----  48       PHA  
  0x038D19 $8D09: C-----  20 0C C5 JSR  $C50C
  0x038D1C $8D0C: C-----  A0 00    LDY  #$00
  0x038D1E $8D0E: C-----  B1 34    LDA  ($34),Y
  0x038D20 $8D10: C-----  C9 1C    CMP  #$1C
  0x038D22 $8D12: C-----  F0 09    BEQ  $8D1D
  0x038D24 $8D14: C-----  68       PLA  
  0x038D25 $8D15: C-----  18       CLC  
  0x038D26 $8D16: C-----  69 01    ADC  #$01
  0x038D28 $8D18: C-----  C9 0B    CMP  #$0B
  0x038D2A $8D1A: C-----  D0 EC    BNE  $8D08
  0x038D2C $8D1C: C-----  60       RTS  
  0x038D2D $8D1D: C-----  68       PLA  
  0x038D2E $8D1E: C-----  4C D4 8C JMP  $8CD4
  0x038D31 $8D21: C--J--  2C 49 04 BIT  $0449
  0x038D34 $8D24: C-----  10 03    BPL  $8D29
  0x038D36 $8D26: C-----  4C D4 8C JMP  $8CD4
  0x038D39 $8D29: C-----  60       RTS  
  0x038D3A $8D2A: C--J--  AD 21 06 LDA  $0621
  0x038D3D $8D2D: C-----  C9 04    CMP  #$04
  0x038D3F $8D2F: C-----  F0 0C    BEQ  $8D3D
  0x038D41 $8D31: C-----  AD 2B 00 LDA  $002B
  0x038D44 $8D34: C-----  C9 21    CMP  #$21
  0x038D46 $8D36: C-----  B0 06    BCS  $8D3E
  0x038D48 $8D38: C-----  AD 48 04 LDA  $0448
  0x038D4B $8D3B: C-----  D0 01    BNE  $8D3E
  0x038D4D $8D3D: C-----  60       RTS  
  0x038D4E $8D3E: C-----  4C C7 8C JMP  $8CC7
  0x038D51 $8D41: C--J--  AD 4E 04 LDA  $044E
  0x038D54 $8D44: C-----  D0 07    BNE  $8D4D
  0x038D56 $8D46: C-----  A0 00    LDY  #$00
  0x038D58 $8D48: C-----  B1 48    LDA  ($48),Y
  0x038D5A $8D4A: C-----  4C 11 8E JMP  $8E11
  0x038D5D $8D4D: C-----  60       RTS  
  0x038D5E $8D4E: C--J--  A0 00    LDY  #$00
  0x038D60 $8D50: C-----  B1 48    LDA  ($48),Y
  0x038D62 $8D52: C-----  4C 11 8E JMP  $8E11
  0x038D65 $8D55: C--J--  4C E2 8D JMP  $8DE2
  0x038D68 $8D58: C-----  A8       TAY  
  0x038D69 $8D59: C-----  D0 03    BNE  $8D5E
  0x038D6B $8D5B: C-----  4C A6 8D JMP  $8DA6
  0x038D6E $8D5E: C-----  C9 0B    CMP  #$0B
  0x038D70 $8D60: C-----  D0 03    BNE  $8D65
  0x038D72 $8D62: ------  .byte $4C
  0x038D73 $8D63: ------  .byte $A6
  0x038D74 $8D64: ------  .byte $8D
  0x038D75 $8D65: C-----  E0 03    CPX  #$03
  0x038D77 $8D67: C-----  B0 1F    BCS  $8D88
  0x038D79 $8D69: C-----  AC 4E 04 LDY  $044E
  0x038D7C $8D6C: C-----  F0 04    BEQ  $8D72
  0x038D7E $8D6E: C-----  E0 02    CPX  #$02
  0x038D80 $8D70: C-----  D0 16    BNE  $8D88
  0x038D82 $8D72: C-----  20 C9 8D JSR  $8DC9
  0x038D85 $8D75: C-----  AD 30 04 LDA  $0430
  0x038D88 $8D78: C-----  18       CLC  
  0x038D89 $8D79: C-----  69 04    ADC  #$04
  0x038D8B $8D7B: C-----  0A       ASL  A
  0x038D8C $8D7C: C-----  A8       TAY  
  0x038D8D $8D7D: C-----  B1 48    LDA  ($48),Y
  0x038D8F $8D7F: C-----  C8       INY  
  0x038D90 $8D80: C-----  D1 48    CMP  ($48),Y
  0x038D92 $8D82: C-----  D0 0A    BNE  $8D8E
  0x038D94 $8D84: C-----  C9 00    CMP  #$00
  0x038D96 $8D86: C-----  D0 06    BNE  $8D8E
  0x038D98 $8D88: C-----  A9 00    LDA  #$00
  0x038D9A $8D8A: C-----  8D 30 04 STA  $0430
  0x038D9D $8D8D: C-----  60       RTS  
  0x038D9E $8D8E: C-----  AA       TAX  
  0x038D9F $8D8F: C-----  B1 48    LDA  ($48),Y
  0x038DA1 $8D91: C-----  85 49    STA  $49
  0x038DA3 $8D93: C-----  86 48    STX  $48
  0x038DA5 $8D95: C-----  AD 30 04 LDA  $0430
  0x038DA8 $8D98: C-----  A2 00    LDX  #$00
  0x038DAA $8D9A: C-----  8E 30 04 STX  $0430
  0x038DAD $8D9D: C-----  20 09 C5 JSR  $C509
  0x038DB0 $8DA0: -D0-I-  .byte $E2 ; <indirect ref>
  0x038DB1 $8DA1: -D0-I-  .byte $8D ; <indirect ref>
  0x038DB2 $8DA2: -D0-I-  .byte $E2 ; <indirect ref>
  0x038DB3 $8DA3: -D0-I-  .byte $8D ; <indirect ref>
  0x038DB4 $8DA4: -D0-I-  .byte $E2 ; <indirect ref>
  0x038DB5 $8DA5: -D0-I-  .byte $8D ; <indirect ref>
  0x038DB6 $8DA6: C-----  E0 00    CPX  #$00
  0x038DB8 $8DA8: C-----  D0 10    BNE  $8DBA
  0x038DBA $8DAA: C-----  20 C9 8D JSR  $8DC9
  0x038DBD $8DAD: C-----  A0 00    LDY  #$00
  0x038DBF $8DAF: C-----  B1 48    LDA  ($48),Y
  0x038DC1 $8DB1: C-----  C8       INY  
  0x038DC2 $8DB2: C-----  D1 48    CMP  ($48),Y
  0x038DC4 $8DB4: C-----  D0 0A    BNE  $8DC0
  0x038DC6 $8DB6: C-----  C9 00    CMP  #$00
  0x038DC8 $8DB8: C-----  D0 06    BNE  $8DC0
  0x038DCA $8DBA: C-----  A9 00    LDA  #$00
  0x038DCC $8DBC: C-----  8D 30 04 STA  $0430
  0x038DCF $8DBF: C-----  60       RTS  
  0x038DD0 $8DC0: C-----  8D 31 04 STA  $0431
  0x038DD3 $8DC3: C-----  A9 01    LDA  #$01
  0x038DD5 $8DC5: C-----  8D 30 04 STA  $0430
  0x038DD8 $8DC8: C-----  60       RTS  
  0x038DD9 $8DC9: C-----  8E 30 04 STX  $0430
  0x038DDC $8DCC: C-----  85 47    STA  $47
  0x038DDE $8DCE: C-----  20 0C C5 JSR  $C50C
  0x038DE1 $8DD1: C-----  A0 00    LDY  #$00
  0x038DE3 $8DD3: C-----  B1 34    LDA  ($34),Y
  0x038DE5 $8DD5: C-----  0A       ASL  A
  0x038DE6 $8DD6: C-----  AA       TAX  
  0x038DE7 $8DD7: C-----  BD 1B 8E LDA  $8E1B,X
  0x038DEA $8DDA: C-----  85 48    STA  $48
  0x038DEC $8DDC: C-----  BD 1C 8E LDA  $8E1C,X
  0x038DEF $8DDF: C-----  85 49    STA  $49
  0x038DF1 $8DE1: C-----  60       RTS  
  0x038DF2 $8DE2: C-----  A0 00    LDY  #$00
  0x038DF4 $8DE4: C-----  B1 48    LDA  ($48),Y
  0x038DF6 $8DE6: C-----  10 05    BPL  $8DED
  0x038DF8 $8DE8: C-----  29 7F    AND  #$7F
  0x038DFA $8DEA: C-----  4C 11 8E JMP  $8E11
  0x038DFD $8DED: C-----  C8       INY  
  0x038DFE $8DEE: C-----  B1 48    LDA  ($48),Y
  0x038E00 $8DF0: C-----  85 45    STA  $45
  0x038E02 $8DF2: C-----  A9 01    LDA  #$01
  0x038E04 $8DF4: C-----  48       PHA  
  0x038E05 $8DF5: C-----  20 0C C5 JSR  $C50C
  0x038E08 $8DF8: C-----  A0 00    LDY  #$00
  0x038E0A $8DFA: C-----  B1 34    LDA  ($34),Y
  0x038E0C $8DFC: C-----  C5 45    CMP  $45
  0x038E0E $8DFE: C-----  F0 09    BEQ  $8E09
  0x038E10 $8E00: C-----  68       PLA  
  0x038E11 $8E01: C-----  18       CLC  
  0x038E12 $8E02: C-----  69 01    ADC  #$01
  0x038E14 $8E04: C-----  C9 0B    CMP  #$0B
  0x038E16 $8E06: C-----  D0 EC    BNE  $8DF4
  0x038E18 $8E08: C-----  60       RTS  
  0x038E19 $8E09: C-----  68       PLA  
  0x038E1A $8E0A: C-----  A0 00    LDY  #$00
  0x038E1C $8E0C: C-----  B1 48    LDA  ($48),Y
  0x038E1E $8E0E: C-----  4C 11 8E JMP  $8E11
  0x038E21 $8E11: C-----  AE 30 04 LDX  $0430
  0x038E24 $8E14: C-----  9D 31 04 STA  $0431,X
  0x038E27 $8E17: C-----  EE 30 04 INC  $0430
  0x038E2A $8E1A: C-----  60       RTS  
  0x038E2B $8E1B: -D0---  .byte $07
  0x038E2C $8E1C: -D0---  .byte $8F
  0x038E2D $8E1D: -D0---  .byte $17
  0x038E2E $8E1E: -D0---  .byte $8F
  0x038E2F $8E1F: ------  .byte $07
  0x038E30 $8E20: ------  .byte $8F
  0x038E31 $8E21: -D0---  .byte $07
  0x038E32 $8E22: -D0---  .byte $8F
  0x038E33 $8E23: -D0---  .byte $07
  0x038E34 $8E24: -D0---  .byte $8F
  0x038E35 $8E25: -D0---  .byte $07
  0x038E36 $8E26: -D0---  .byte $8F
  0x038E37 $8E27: -D0---  .byte $07
  0x038E38 $8E28: -D0---  .byte $8F
  0x038E39 $8E29: -D0---  .byte $07
  0x038E3A $8E2A: -D0---  .byte $8F
  0x038E3B $8E2B: -D0---  .byte $07
  0x038E3C $8E2C: -D0---  .byte $8F
  0x038E3D $8E2D: -D0---  .byte $07
  0x038E3E $8E2E: -D0---  .byte $8F
  0x038E3F $8E2F: -D0---  .byte $07
  0x038E40 $8E30: -D0---  .byte $8F
  0x038E41 $8E31: -D0---  .byte $07
  0x038E42 $8E32: -D0---  .byte $8F
  0x038E43 $8E33: -D0---  .byte $07
  0x038E44 $8E34: -D0---  .byte $8F
  0x038E45 $8E35: -D0---  .byte $07
  0x038E46 $8E36: -D0---  .byte $8F
  0x038E47 $8E37: -D0---  .byte $07
  0x038E48 $8E38: -D0---  .byte $8F
  0x038E49 $8E39: ------  .byte $07
  0x038E4A $8E3A: ------  .byte $8F
  0x038E4B $8E3B: -D0---  .byte $07
  0x038E4C $8E3C: -D0---  .byte $8F
  0x038E4D $8E3D: -D0---  .byte $25
  0x038E4E $8E3E: -D0---  .byte $8F
  0x038E4F $8E3F: -D0---  .byte $07
  0x038E50 $8E40: -D0---  .byte $8F
  0x038E51 $8E41: -D0---  .byte $07
  0x038E52 $8E42: -D0---  .byte $8F
  0x038E53 $8E43: -D0---  .byte $33
  0x038E54 $8E44: -D0---  .byte $8F
  0x038E55 $8E45: -D0---  .byte $41
  0x038E56 $8E46: -D0---  .byte $8F
  0x038E57 $8E47: -D0---  .byte $07
  0x038E58 $8E48: -D0---  .byte $8F
  0x038E59 $8E49: -D0---  .byte $4F
  0x038E5A $8E4A: -D0---  .byte $8F
  0x038E5B $8E4B: -D0---  .byte $5D
  0x038E5C $8E4C: -D0---  .byte $8F
  0x038E5D $8E4D: -D0---  .byte $6B
  0x038E5E $8E4E: -D0---  .byte $8F
  0x038E5F $8E4F: -D0---  .byte $79
  0x038E60 $8E50: -D0---  .byte $8F
  0x038E61 $8E51: -D0---  .byte $87
  0x038E62 $8E52: -D0---  .byte $8F
  0x038E63 $8E53: -D0---  .byte $95
  0x038E64 $8E54: -D0---  .byte $8F
  0x038E65 $8E55: -D0---  .byte $A3
  0x038E66 $8E56: -D0---  .byte $8F
  0x038E67 $8E57: -D0---  .byte $07
  0x038E68 $8E58: -D0---  .byte $8F
  0x038E69 $8E59: -D0---  .byte $B1
  0x038E6A $8E5A: -D0---  .byte $8F
  0x038E6B $8E5B: -D0---  .byte $BF
  0x038E6C $8E5C: -D0---  .byte $8F
  0x038E6D $8E5D: ------  .byte $07
  0x038E6E $8E5E: ------  .byte $8F
  0x038E6F $8E5F: ------  .byte $07
  0x038E70 $8E60: ------  .byte $8F
  0x038E71 $8E61: -D0---  .byte $CD
  0x038E72 $8E62: -D0---  .byte $8F
  0x038E73 $8E63: -D0---  .byte $DB
  0x038E74 $8E64: -D0---  .byte $8F
  0x038E75 $8E65: -D0---  .byte $07
  0x038E76 $8E66: -D0---  .byte $8F
  0x038E77 $8E67: ------  .byte $07
  0x038E78 $8E68: ------  .byte $8F
  0x038E79 $8E69: -D0---  .byte $E9
  0x038E7A $8E6A: -D0---  .byte $8F
  0x038E7B $8E6B: -D0---  .byte $F7
  0x038E7C $8E6C: -D0---  .byte $8F
  0x038E7D $8E6D: -D0---  .byte $05
  0x038E7E $8E6E: -D0---  .byte $90
  0x038E7F $8E6F: -D0---  .byte $13
  0x038E80 $8E70: -D0---  .byte $90
  0x038E81 $8E71: -D0---  .byte $21
  0x038E82 $8E72: -D0---  .byte $90
  0x038E83 $8E73: -D0---  .byte $2F
  0x038E84 $8E74: -D0---  .byte $90
  0x038E85 $8E75: -D0---  .byte $3D
  0x038E86 $8E76: -D0---  .byte $90
  0x038E87 $8E77: -D0---  .byte $4B
  0x038E88 $8E78: -D0---  .byte $90
  0x038E89 $8E79: -D0---  .byte $59
  0x038E8A $8E7A: -D0---  .byte $90
  0x038E8B $8E7B: -D0---  .byte $67
  0x038E8C $8E7C: -D0---  .byte $90
  0x038E8D $8E7D: -D0---  .byte $75
  0x038E8E $8E7E: -D0---  .byte $90
  0x038E8F $8E7F: -D0---  .byte $83
  0x038E90 $8E80: -D0---  .byte $90
  0x038E91 $8E81: -D0---  .byte $07
  0x038E92 $8E82: -D0---  .byte $8F
  0x038E93 $8E83: -D0---  .byte $91
  0x038E94 $8E84: -D0---  .byte $90
  0x038E95 $8E85: -D0---  .byte $9F
  0x038E96 $8E86: -D0---  .byte $90
  0x038E97 $8E87: -D0---  .byte $AD
  0x038E98 $8E88: -D0---  .byte $90
  0x038E99 $8E89: -D0---  .byte $07
  0x038E9A $8E8A: -D0---  .byte $8F
  0x038E9B $8E8B: -D0---  .byte $BB
  0x038E9C $8E8C: -D0---  .byte $90
  0x038E9D $8E8D: ------  .byte $07
  0x038E9E $8E8E: ------  .byte $8F
  0x038E9F $8E8F: -D0---  .byte $C9
  0x038EA0 $8E90: -D0---  .byte $90
  0x038EA1 $8E91: -D0---  .byte $D7
  0x038EA2 $8E92: -D0---  .byte $90
  0x038EA3 $8E93: -D0---  .byte $07
  0x038EA4 $8E94: -D0---  .byte $8F
  0x038EA5 $8E95: -D0---  .byte $E5
  0x038EA6 $8E96: -D0---  .byte $90
  0x038EA7 $8E97: -D0---  .byte $F3
  0x038EA8 $8E98: -D0---  .byte $90
  0x038EA9 $8E99: -D0---  .byte $01
  0x038EAA $8E9A: -D0---  .byte $91
  0x038EAB $8E9B: -D0---  .byte $07
  0x038EAC $8E9C: -D0---  .byte $8F
  0x038EAD $8E9D: -D0---  .byte $0F
  0x038EAE $8E9E: -D0---  .byte $91
  0x038EAF $8E9F: -D0---  .byte $1D
  0x038EB0 $8EA0: -D0---  .byte $91
  0x038EB1 $8EA1: -D0---  .byte $2B
  0x038EB2 $8EA2: -D0---  .byte $91
  0x038EB3 $8EA3: -D0---  .byte $39
  0x038EB4 $8EA4: -D0---  .byte $91
  0x038EB5 $8EA5: -D0---  .byte $47
  0x038EB6 $8EA6: -D0---  .byte $91
  0x038EB7 $8EA7: -D0---  .byte $55
  0x038EB8 $8EA8: -D0---  .byte $91
  0x038EB9 $8EA9: -D0---  .byte $63
  0x038EBA $8EAA: -D0---  .byte $91
  0x038EBB $8EAB: -D0---  .byte $71
  0x038EBC $8EAC: -D0---  .byte $91
  0x038EBD $8EAD: -D0---  .byte $7F
  0x038EBE $8EAE: -D0---  .byte $91
  0x038EBF $8EAF: -D0---  .byte $8D
  0x038EC0 $8EB0: -D0---  .byte $91
  0x038EC1 $8EB1: -D0---  .byte $9B
  0x038EC2 $8EB2: -D0---  .byte $91
  0x038EC3 $8EB3: ------  .byte $07
  0x038EC4 $8EB4: ------  .byte $8F
  0x038EC5 $8EB5: -D0---  .byte $A9
  0x038EC6 $8EB6: -D0---  .byte $91
  0x038EC7 $8EB7: -D0---  .byte $B7
  0x038EC8 $8EB8: -D0---  .byte $91
  0x038EC9 $8EB9: -D0---  .byte $C5
  0x038ECA $8EBA: -D0---  .byte $91
  0x038ECB $8EBB: -D0---  .byte $D3
  0x038ECC $8EBC: -D0---  .byte $91
  0x038ECD $8EBD: -D0---  .byte $07
  0x038ECE $8EBE: -D0---  .byte $8F
  0x038ECF $8EBF: -D0---  .byte $E1
  0x038ED0 $8EC0: -D0---  .byte $91
  0x038ED1 $8EC1: -D0---  .byte $07
  0x038ED2 $8EC2: -D0---  .byte $8F
  0x038ED3 $8EC3: -D0---  .byte $07
  0x038ED4 $8EC4: -D0---  .byte $8F
  0x038ED5 $8EC5: -D0---  .byte $07
  0x038ED6 $8EC6: -D0---  .byte $8F
  0x038ED7 $8EC7: -D0---  .byte $FD
  0x038ED8 $8EC8: -D0---  .byte $91
  0x038ED9 $8EC9: -D0---  .byte $0B
  0x038EDA $8ECA: -D0---  .byte $92
  0x038EDB $8ECB: -D0---  .byte $19
  0x038EDC $8ECC: -D0---  .byte $92
  0x038EDD $8ECD: -D0---  .byte $07
  0x038EDE $8ECE: -D0---  .byte $8F
  0x038EDF $8ECF: -D0---  .byte $27
  0x038EE0 $8ED0: -D0---  .byte $92
  0x038EE1 $8ED1: ------  .byte $07
  0x038EE2 $8ED2: ------  .byte $8F
  0x038EE3 $8ED3: -D0---  .byte $35
  0x038EE4 $8ED4: -D0---  .byte $92
  0x038EE5 $8ED5: -D0---  .byte $43
  0x038EE6 $8ED6: -D0---  .byte $92
  0x038EE7 $8ED7: -D0---  .byte $51
  0x038EE8 $8ED8: -D0---  .byte $92
  0x038EE9 $8ED9: -D0---  .byte $5F
  0x038EEA $8EDA: -D0---  .byte $92
  0x038EEB $8EDB: -D0---  .byte $6D
  0x038EEC $8EDC: -D0---  .byte $92
  0x038EED $8EDD: -D0---  .byte $07
  0x038EEE $8EDE: -D0---  .byte $8F
  0x038EEF $8EDF: -D0---  .byte $7B
  0x038EF0 $8EE0: -D0---  .byte $92
  0x038EF1 $8EE1: -D0---  .byte $89
  0x038EF2 $8EE2: -D0---  .byte $92
  0x038EF3 $8EE3: -D0---  .byte $07
  0x038EF4 $8EE4: -D0---  .byte $8F
  0x038EF5 $8EE5: -D0---  .byte $97
  0x038EF6 $8EE6: -D0---  .byte $92
  0x038EF7 $8EE7: -D0---  .byte $A5
  0x038EF8 $8EE8: -D0---  .byte $92
  0x038EF9 $8EE9: -D0---  .byte $07
  0x038EFA $8EEA: -D0---  .byte $8F
  0x038EFB $8EEB: -D0---  .byte $B3
  0x038EFC $8EEC: -D0---  .byte $92
  0x038EFD $8EED: ------  .byte $07
  0x038EFE $8EEE: ------  .byte $8F
  0x038EFF $8EEF: -D0---  .byte $C1
  0x038F00 $8EF0: -D0---  .byte $92
  0x038F01 $8EF1: -D0---  .byte $CF
  0x038F02 $8EF2: -D0---  .byte $92
  0x038F03 $8EF3: -D0---  .byte $DD
  0x038F04 $8EF4: -D0---  .byte $92
  0x038F05 $8EF5: -D0---  .byte $EB
  0x038F06 $8EF6: -D0---  .byte $92
  0x038F07 $8EF7: -D0---  .byte $F9
  0x038F08 $8EF8: -D0---  .byte $92
  0x038F09 $8EF9: -D0---  .byte $07
  0x038F0A $8EFA: -D0---  .byte $93
  0x038F0B $8EFB: -D0---  .byte $07
  0x038F0C $8EFC: -D0---  .byte $8F
  0x038F0D $8EFD: -D0---  .byte $07
  0x038F0E $8EFE: -D0---  .byte $8F
  0x038F0F $8EFF: -D0---  .byte $15
  0x038F10 $8F00: -D0---  .byte $93
  0x038F11 $8F01: -D0---  .byte $23
  0x038F12 $8F02: -D0---  .byte $93
  0x038F13 $8F03: -D0---  .byte $31
  0x038F14 $8F04: -D0---  .byte $93
  0x038F15 $8F05: -D0---  .byte $3F
  0x038F16 $8F06: -D0---  .byte $93
  0x038F17 $8F07: -D0-I-  .byte $00 ; <indirect ref>
  0x038F18 $8F08: -D0-I-  .byte $00 ; <indirect ref>
  0x038F19 $8F09: -D0-I-  .byte $00 ; <indirect ref>
  0x038F1A $8F0A: -D0-I-  .byte $00 ; <indirect ref>
  0x038F1B $8F0B: -D0-I-  .byte $00 ; <indirect ref>
  0x038F1C $8F0C: -D0-I-  .byte $00 ; <indirect ref>
  0x038F1D $8F0D: -D0-I-  .byte $00 ; <indirect ref>
  0x038F1E $8F0E: -D0-I-  .byte $00 ; <indirect ref>
  0x038F1F $8F0F: -D0-I-  .byte $00 ; <indirect ref>
  0x038F20 $8F10: -D0-I-  .byte $00 ; <indirect ref>
  0x038F21 $8F11: -D0-I-  .byte $00 ; <indirect ref>
  0x038F22 $8F12: -D0-I-  .byte $00 ; <indirect ref>
  0x038F23 $8F13: -D0-I-  .byte $00 ; <indirect ref>
  0x038F24 $8F14: -D0-I-  .byte $00 ; <indirect ref>
  0x038F25 $8F15: ------  .byte $00
  0x038F26 $8F16: ------  .byte $00
  0x038F27 $8F17: -D0-I-  .byte $4D ; <indirect ref>
  0x038F28 $8F18: -D0-I-  .byte $93 ; <indirect ref>
  0x038F29 $8F19: -D0-I-  .byte $0A ; <indirect ref>
  0x038F2A $8F1A: -D0-I-  .byte $94 ; <indirect ref>
  0x038F2B $8F1B: -D0-I-  .byte $10 ; <indirect ref>
  0x038F2C $8F1C: -D0-I-  .byte $94 ; <indirect ref>
  0x038F2D $8F1D: -D0-I-  .byte $25 ; <indirect ref>
  0x038F2E $8F1E: -D0-I-  .byte $94 ; <indirect ref>
  0x038F2F $8F1F: -D0-I-  .byte $00 ; <indirect ref>
  0x038F30 $8F20: -D0-I-  .byte $00 ; <indirect ref>
  0x038F31 $8F21: -D0-I-  .byte $00 ; <indirect ref>
  0x038F32 $8F22: -D0-I-  .byte $00 ; <indirect ref>
  0x038F33 $8F23: -D0-I-  .byte $00 ; <indirect ref>
  0x038F34 $8F24: -D0-I-  .byte $00 ; <indirect ref>
  0x038F35 $8F25: -D0-I-  .byte $58 ; <indirect ref>
  0x038F36 $8F26: -D0-I-  .byte $93 ; <indirect ref>
  0x038F37 $8F27: -D0-I-  .byte $00 ; <indirect ref>
  0x038F38 $8F28: -D0-I-  .byte $00 ; <indirect ref>
  0x038F39 $8F29: -D0-I-  .byte $00 ; <indirect ref>
  0x038F3A $8F2A: -D0-I-  .byte $00 ; <indirect ref>
  0x038F3B $8F2B: -D0-I-  .byte $27 ; <indirect ref>
  0x038F3C $8F2C: -D0-I-  .byte $94 ; <indirect ref>
  0x038F3D $8F2D: -D0-I-  .byte $00 ; <indirect ref>
  0x038F3E $8F2E: -D0-I-  .byte $00 ; <indirect ref>
  0x038F3F $8F2F: -D0-I-  .byte $00 ; <indirect ref>
  0x038F40 $8F30: -D0-I-  .byte $00 ; <indirect ref>
  0x038F41 $8F31: -D0-I-  .byte $00 ; <indirect ref>
  0x038F42 $8F32: -D0-I-  .byte $00 ; <indirect ref>
  0x038F43 $8F33: -D0-I-  .byte $00 ; <indirect ref>
  0x038F44 $8F34: -D0-I-  .byte $00 ; <indirect ref>
  0x038F45 $8F35: -D0-I-  .byte $00 ; <indirect ref>
  0x038F46 $8F36: -D0-I-  .byte $00 ; <indirect ref>
  0x038F47 $8F37: -D0-I-  .byte $00 ; <indirect ref>
  0x038F48 $8F38: -D0-I-  .byte $00 ; <indirect ref>
  0x038F49 $8F39: -D0-I-  .byte $00 ; <indirect ref>
  0x038F4A $8F3A: -D0-I-  .byte $00 ; <indirect ref>
  0x038F4B $8F3B: -D0-I-  .byte $36 ; <indirect ref>
  0x038F4C $8F3C: -D0-I-  .byte $94 ; <indirect ref>
  0x038F4D $8F3D: -D0-I-  .byte $00 ; <indirect ref>
  0x038F4E $8F3E: -D0-I-  .byte $00 ; <indirect ref>
  0x038F4F $8F3F: -D0-I-  .byte $00 ; <indirect ref>
  0x038F50 $8F40: -D0-I-  .byte $00 ; <indirect ref>
  0x038F51 $8F41: -D0-I-  .byte $5D ; <indirect ref>
  0x038F52 $8F42: -D0-I-  .byte $93 ; <indirect ref>
  0x038F53 $8F43: -D0-I-  .byte $00 ; <indirect ref>
  0x038F54 $8F44: -D0-I-  .byte $00 ; <indirect ref>
  0x038F55 $8F45: -D0-I-  .byte $00 ; <indirect ref>
  0x038F56 $8F46: -D0-I-  .byte $00 ; <indirect ref>
  0x038F57 $8F47: -D0-I-  .byte $00 ; <indirect ref>
  0x038F58 $8F48: -D0-I-  .byte $00 ; <indirect ref>
  0x038F59 $8F49: -D0-I-  .byte $00 ; <indirect ref>
  0x038F5A $8F4A: -D0-I-  .byte $00 ; <indirect ref>
  0x038F5B $8F4B: -D0-I-  .byte $00 ; <indirect ref>
  0x038F5C $8F4C: -D0-I-  .byte $00 ; <indirect ref>
  0x038F5D $8F4D: -D0-I-  .byte $00 ; <indirect ref>
  0x038F5E $8F4E: -D0-I-  .byte $00 ; <indirect ref>
  0x038F5F $8F4F: -D0-I-  .byte $60 ; <indirect ref>
  0x038F60 $8F50: -D0-I-  .byte $93 ; <indirect ref>
  0x038F61 $8F51: -D0-I-  .byte $00 ; <indirect ref>
  0x038F62 $8F52: -D0-I-  .byte $00 ; <indirect ref>
  0x038F63 $8F53: -D0-I-  .byte $00 ; <indirect ref>
  0x038F64 $8F54: -D0-I-  .byte $00 ; <indirect ref>
  0x038F65 $8F55: -D0-I-  .byte $29 ; <indirect ref>
  0x038F66 $8F56: -D0-I-  .byte $94 ; <indirect ref>
  0x038F67 $8F57: -D0-I-  .byte $37 ; <indirect ref>
  0x038F68 $8F58: -D0-I-  .byte $94 ; <indirect ref>
  0x038F69 $8F59: -D0-I-  .byte $46 ; <indirect ref>
  0x038F6A $8F5A: -D0-I-  .byte $94 ; <indirect ref>
  0x038F6B $8F5B: -D0-I-  .byte $5A ; <indirect ref>
  0x038F6C $8F5C: -D0-I-  .byte $94 ; <indirect ref>
  0x038F6D $8F5D: -D0-I-  .byte $69 ; <indirect ref>
  0x038F6E $8F5E: -D0-I-  .byte $93 ; <indirect ref>
  0x038F6F $8F5F: -D0-I-  .byte $00 ; <indirect ref>
  0x038F70 $8F60: -D0-I-  .byte $00 ; <indirect ref>
  0x038F71 $8F61: -D0-I-  .byte $00 ; <indirect ref>
  0x038F72 $8F62: -D0-I-  .byte $00 ; <indirect ref>
  0x038F73 $8F63: -D0-I-  .byte $2B ; <indirect ref>
  0x038F74 $8F64: -D0-I-  .byte $94 ; <indirect ref>
  0x038F75 $8F65: -D0-I-  .byte $39 ; <indirect ref>
  0x038F76 $8F66: -D0-I-  .byte $94 ; <indirect ref>
  0x038F77 $8F67: -D0-I-  .byte $48 ; <indirect ref>
  0x038F78 $8F68: -D0-I-  .byte $94 ; <indirect ref>
  0x038F79 $8F69: -D0-I-  .byte $5C ; <indirect ref>
  0x038F7A $8F6A: -D0-I-  .byte $94 ; <indirect ref>
  0x038F7B $8F6B: -D0-I-  .byte $72 ; <indirect ref>
  0x038F7C $8F6C: -D0-I-  .byte $93 ; <indirect ref>
  0x038F7D $8F6D: -D0-I-  .byte $00 ; <indirect ref>
  0x038F7E $8F6E: -D0-I-  .byte $00 ; <indirect ref>
  0x038F7F $8F6F: -D0-I-  .byte $00 ; <indirect ref>
  0x038F80 $8F70: -D0-I-  .byte $00 ; <indirect ref>
  0x038F81 $8F71: -D0-I-  .byte $00 ; <indirect ref>
  0x038F82 $8F72: -D0-I-  .byte $00 ; <indirect ref>
  0x038F83 $8F73: ------  .byte $00
  0x038F84 $8F74: ------  .byte $00
  0x038F85 $8F75: -D0-I-  .byte $00 ; <indirect ref>
  0x038F86 $8F76: -D0-I-  .byte $00 ; <indirect ref>
  0x038F87 $8F77: -D0-I-  .byte $00 ; <indirect ref>
  0x038F88 $8F78: -D0-I-  .byte $00 ; <indirect ref>
  0x038F89 $8F79: -D0-I-  .byte $74 ; <indirect ref>
  0x038F8A $8F7A: -D0-I-  .byte $93 ; <indirect ref>
  0x038F8B $8F7B: -D0-I-  .byte $00 ; <indirect ref>
  0x038F8C $8F7C: -D0-I-  .byte $00 ; <indirect ref>
  0x038F8D $8F7D: -D0-I-  .byte $11 ; <indirect ref>
  0x038F8E $8F7E: -D0-I-  .byte $94 ; <indirect ref>
  0x038F8F $8F7F: -D0-I-  .byte $2D ; <indirect ref>
  0x038F90 $8F80: -D0-I-  .byte $94 ; <indirect ref>
  0x038F91 $8F81: -D0-I-  .byte $00 ; <indirect ref>
  0x038F92 $8F82: -D0-I-  .byte $00 ; <indirect ref>
  0x038F93 $8F83: -D0-I-  .byte $4A ; <indirect ref>
  0x038F94 $8F84: -D0-I-  .byte $94 ; <indirect ref>
  0x038F95 $8F85: -D0-I-  .byte $00 ; <indirect ref>
  0x038F96 $8F86: -D0-I-  .byte $00 ; <indirect ref>
  0x038F97 $8F87: -D0-I-  .byte $78 ; <indirect ref>
  0x038F98 $8F88: -D0-I-  .byte $93 ; <indirect ref>
  0x038F99 $8F89: -D0-I-  .byte $0B ; <indirect ref>
  0x038F9A $8F8A: -D0-I-  .byte $94 ; <indirect ref>
  0x038F9B $8F8B: -D0-I-  .byte $00 ; <indirect ref>
  0x038F9C $8F8C: -D0-I-  .byte $00 ; <indirect ref>
  0x038F9D $8F8D: -D0-I-  .byte $00 ; <indirect ref>
  0x038F9E $8F8E: -D0-I-  .byte $00 ; <indirect ref>
  0x038F9F $8F8F: ------  .byte $00
  0x038FA0 $8F90: ------  .byte $00
  0x038FA1 $8F91: -D0-I-  .byte $4B ; <indirect ref>
  0x038FA2 $8F92: -D0-I-  .byte $94 ; <indirect ref>
  0x038FA3 $8F93: -D0-I-  .byte $00 ; <indirect ref>
  0x038FA4 $8F94: -D0-I-  .byte $00 ; <indirect ref>
  0x038FA5 $8F95: -D0-I-  .byte $7A ; <indirect ref>
  0x038FA6 $8F96: -D0-I-  .byte $93 ; <indirect ref>
  0x038FA7 $8F97: -D0-I-  .byte $00 ; <indirect ref>
  0x038FA8 $8F98: -D0-I-  .byte $00 ; <indirect ref>
  0x038FA9 $8F99: -D0-I-  .byte $12 ; <indirect ref>
  0x038FAA $8F9A: -D0-I-  .byte $94 ; <indirect ref>
  0x038FAB $8F9B: -D0-I-  .byte $00 ; <indirect ref>
  0x038FAC $8F9C: -D0-I-  .byte $00 ; <indirect ref>
  0x038FAD $8F9D: -D0-I-  .byte $3B ; <indirect ref>
  0x038FAE $8F9E: -D0-I-  .byte $94 ; <indirect ref>
  0x038FAF $8F9F: -D0-I-  .byte $4C ; <indirect ref>
  0x038FB0 $8FA0: -D0-I-  .byte $94 ; <indirect ref>
  0x038FB1 $8FA1: -D0-I-  .byte $00 ; <indirect ref>
  0x038FB2 $8FA2: -D0-I-  .byte $00 ; <indirect ref>
  0x038FB3 $8FA3: -D0-I-  .byte $7D ; <indirect ref>
  0x038FB4 $8FA4: -D0-I-  .byte $93 ; <indirect ref>
  0x038FB5 $8FA5: -D0-I-  .byte $00 ; <indirect ref>
  0x038FB6 $8FA6: -D0-I-  .byte $00 ; <indirect ref>
  0x038FB7 $8FA7: -D0-I-  .byte $00 ; <indirect ref>
  0x038FB8 $8FA8: -D0-I-  .byte $00 ; <indirect ref>
  0x038FB9 $8FA9: -D0-I-  .byte $00 ; <indirect ref>
  0x038FBA $8FAA: -D0-I-  .byte $00 ; <indirect ref>
  0x038FBB $8FAB: -D0-I-  .byte $00 ; <indirect ref>
  0x038FBC $8FAC: -D0-I-  .byte $00 ; <indirect ref>
  0x038FBD $8FAD: -D0-I-  .byte $00 ; <indirect ref>
  0x038FBE $8FAE: -D0-I-  .byte $00 ; <indirect ref>
  0x038FBF $8FAF: -D0-I-  .byte $00 ; <indirect ref>
  0x038FC0 $8FB0: -D0-I-  .byte $00 ; <indirect ref>
  0x038FC1 $8FB1: -D0-I-  .byte $00 ; <indirect ref>
  0x038FC2 $8FB2: -D0-I-  .byte $00 ; <indirect ref>
  0x038FC3 $8FB3: -D0-I-  .byte $00 ; <indirect ref>
  0x038FC4 $8FB4: -D0-I-  .byte $00 ; <indirect ref>
  0x038FC5 $8FB5: -D0-I-  .byte $00 ; <indirect ref>
  0x038FC6 $8FB6: -D0-I-  .byte $00 ; <indirect ref>
  0x038FC7 $8FB7: -D0-I-  .byte $2F ; <indirect ref>
  0x038FC8 $8FB8: -D0-I-  .byte $94 ; <indirect ref>
  0x038FC9 $8FB9: ------  .byte $00
  0x038FCA $8FBA: ------  .byte $00
  0x038FCB $8FBB: -D0-I-  .byte $00 ; <indirect ref>
  0x038FCC $8FBC: -D0-I-  .byte $00 ; <indirect ref>
  0x038FCD $8FBD: -D0-I-  .byte $00 ; <indirect ref>
  0x038FCE $8FBE: -D0-I-  .byte $00 ; <indirect ref>
  0x038FCF $8FBF: -D0-I-  .byte $80 ; <indirect ref>
  0x038FD0 $8FC0: -D0-I-  .byte $93 ; <indirect ref>
  0x038FD1 $8FC1: -D0-I-  .byte $00 ; <indirect ref>
  0x038FD2 $8FC2: -D0-I-  .byte $00 ; <indirect ref>
  0x038FD3 $8FC3: -D0-I-  .byte $00 ; <indirect ref>
  0x038FD4 $8FC4: -D0-I-  .byte $00 ; <indirect ref>
  0x038FD5 $8FC5: -D0-I-  .byte $00 ; <indirect ref>
  0x038FD6 $8FC6: -D0-I-  .byte $00 ; <indirect ref>
  0x038FD7 $8FC7: -D0-I-  .byte $00 ; <indirect ref>
  0x038FD8 $8FC8: -D0-I-  .byte $00 ; <indirect ref>
  0x038FD9 $8FC9: -D0-I-  .byte $00 ; <indirect ref>
  0x038FDA $8FCA: -D0-I-  .byte $00 ; <indirect ref>
  0x038FDB $8FCB: -D0-I-  .byte $00 ; <indirect ref>
  0x038FDC $8FCC: -D0-I-  .byte $00 ; <indirect ref>
  0x038FDD $8FCD: -D0-I-  .byte $82 ; <indirect ref>
  0x038FDE $8FCE: -D0-I-  .byte $93 ; <indirect ref>
  0x038FDF $8FCF: -D0-I-  .byte $00 ; <indirect ref>
  0x038FE0 $8FD0: -D0-I-  .byte $00 ; <indirect ref>
  0x038FE1 $8FD1: -D0-I-  .byte $00 ; <indirect ref>
  0x038FE2 $8FD2: -D0-I-  .byte $00 ; <indirect ref>
  0x038FE3 $8FD3: -D0-I-  .byte $00 ; <indirect ref>
  0x038FE4 $8FD4: -D0-I-  .byte $00 ; <indirect ref>
  0x038FE5 $8FD5: ------  .byte $00
  0x038FE6 $8FD6: ------  .byte $00
  0x038FE7 $8FD7: -D0-I-  .byte $00 ; <indirect ref>
  0x038FE8 $8FD8: -D0-I-  .byte $00 ; <indirect ref>
  0x038FE9 $8FD9: -D0-I-  .byte $00 ; <indirect ref>
  0x038FEA $8FDA: -D0-I-  .byte $00 ; <indirect ref>
  0x038FEB $8FDB: -D0-I-  .byte $84 ; <indirect ref>
  0x038FEC $8FDC: -D0-I-  .byte $93 ; <indirect ref>
  0x038FED $8FDD: -D0-I-  .byte $00 ; <indirect ref>
  0x038FEE $8FDE: -D0-I-  .byte $00 ; <indirect ref>
  0x038FEF $8FDF: -D0-I-  .byte $00 ; <indirect ref>
  0x038FF0 $8FE0: -D0-I-  .byte $00 ; <indirect ref>
  0x038FF1 $8FE1: -D0-I-  .byte $00 ; <indirect ref>
  0x038FF2 $8FE2: -D0-I-  .byte $00 ; <indirect ref>
  0x038FF3 $8FE3: ------  .byte $00
  0x038FF4 $8FE4: ------  .byte $00
  0x038FF5 $8FE5: -D0-I-  .byte $00 ; <indirect ref>
  0x038FF6 $8FE6: -D0-I-  .byte $00 ; <indirect ref>
  0x038FF7 $8FE7: -D0-I-  .byte $00 ; <indirect ref>
  0x038FF8 $8FE8: -D0-I-  .byte $00 ; <indirect ref>
  0x038FF9 $8FE9: -D0-I-  .byte $86 ; <indirect ref>
  0x038FFA $8FEA: -D0-I-  .byte $93 ; <indirect ref>
  0x038FFB $8FEB: -D0-I-  .byte $00 ; <indirect ref>
  0x038FFC $8FEC: -D0-I-  .byte $00 ; <indirect ref>
  0x038FFD $8FED: -D0-I-  .byte $00 ; <indirect ref>
  0x038FFE $8FEE: -D0-I-  .byte $00 ; <indirect ref>
  0x038FFF $8FEF: ------  .byte $00
  0x039000 $8FF0: ------  .byte $00
  0x039001 $8FF1: ------  .byte $00
  0x039002 $8FF2: ------  .byte $00
  0x039003 $8FF3: ------  .byte $00
  0x039004 $8FF4: ------  .byte $00
  0x039005 $8FF5: ------  .byte $00
  0x039006 $8FF6: ------  .byte $00
  0x039007 $8FF7: -D0-I-  .byte $88 ; <indirect ref>
  0x039008 $8FF8: -D0-I-  .byte $93 ; <indirect ref>
  0x039009 $8FF9: -D0-I-  .byte $00 ; <indirect ref>
  0x03900A $8FFA: -D0-I-  .byte $00 ; <indirect ref>
  0x03900B $8FFB: -D0-I-  .byte $13 ; <indirect ref>
  0x03900C $8FFC: -D0-I-  .byte $94 ; <indirect ref>
  0x03900D $8FFD: -D0-I-  .byte $00 ; <indirect ref>
  0x03900E $8FFE: -D0-I-  .byte $00 ; <indirect ref>
  0x03900F $8FFF: ------  .byte $00
  0x039010 $9000: ------  .byte $00
  0x039011 $9001: ------  .byte $00
  0x039012 $9002: ------  .byte $00
  0x039013 $9003: -D0-I-  .byte $00 ; <indirect ref>
  0x039014 $9004: -D0-I-  .byte $00 ; <indirect ref>
  0x039015 $9005: -D0-I-  .byte $8A ; <indirect ref>
  0x039016 $9006: -D0-I-  .byte $93 ; <indirect ref>
  0x039017 $9007: -D0-I-  .byte $00 ; <indirect ref>
  0x039018 $9008: -D0-I-  .byte $00 ; <indirect ref>
  0x039019 $9009: -D0-I-  .byte $14 ; <indirect ref>
  0x03901A $900A: -D0-I-  .byte $94 ; <indirect ref>
  0x03901B $900B: ------  .byte $00
  0x03901C $900C: ------  .byte $00
  0x03901D $900D: ------  .byte $00
  0x03901E $900E: ------  .byte $00
  0x03901F $900F: -D0-I-  .byte $00 ; <indirect ref>
  0x039020 $9010: -D0-I-  .byte $00 ; <indirect ref>
  0x039021 $9011: -D0-I-  .byte $00 ; <indirect ref>
  0x039022 $9012: -D0-I-  .byte $00 ; <indirect ref>
  0x039023 $9013: -D0-I-  .byte $8C ; <indirect ref>
  0x039024 $9014: -D0-I-  .byte $93 ; <indirect ref>
  0x039025 $9015: -D0-I-  .byte $00 ; <indirect ref>
  0x039026 $9016: -D0-I-  .byte $00 ; <indirect ref>
  0x039027 $9017: -D0-I-  .byte $00 ; <indirect ref>
  0x039028 $9018: -D0-I-  .byte $00 ; <indirect ref>
  0x039029 $9019: -D0-I-  .byte $00 ; <indirect ref>
  0x03902A $901A: -D0-I-  .byte $00 ; <indirect ref>
  0x03902B $901B: ------  .byte $3C
  0x03902C $901C: ------  .byte $94
  0x03902D $901D: ------  .byte $4D
  0x03902E $901E: ------  .byte $94
  0x03902F $901F: -D0-I-  .byte $00 ; <indirect ref>
  0x039030 $9020: -D0-I-  .byte $00 ; <indirect ref>
  0x039031 $9021: -D0-I-  .byte $8E ; <indirect ref>
  0x039032 $9022: -D0-I-  .byte $93 ; <indirect ref>
  0x039033 $9023: -D0-I-  .byte $00 ; <indirect ref>
  0x039034 $9024: -D0-I-  .byte $00 ; <indirect ref>
  0x039035 $9025: -D0-I-  .byte $15 ; <indirect ref>
  0x039036 $9026: -D0-I-  .byte $94 ; <indirect ref>
  0x039037 $9027: ------  .byte $00
  0x039038 $9028: ------  .byte $00
  0x039039 $9029: ------  .byte $00
  0x03903A $902A: ------  .byte $00
  0x03903B $902B: -D0-I-  .byte $00 ; <indirect ref>
  0x03903C $902C: -D0-I-  .byte $00 ; <indirect ref>
  0x03903D $902D: -D0-I-  .byte $00 ; <indirect ref>
  0x03903E $902E: -D0-I-  .byte $00 ; <indirect ref>
  0x03903F $902F: -D0-I-  .byte $91 ; <indirect ref>
  0x039040 $9030: -D0-I-  .byte $93 ; <indirect ref>
  0x039041 $9031: -D0-I-  .byte $00 ; <indirect ref>
  0x039042 $9032: -D0-I-  .byte $00 ; <indirect ref>
  0x039043 $9033: -D0-I-  .byte $00 ; <indirect ref>
  0x039044 $9034: -D0-I-  .byte $00 ; <indirect ref>
  0x039045 $9035: -D0-I-  .byte $00 ; <indirect ref>
  0x039046 $9036: -D0-I-  .byte $00 ; <indirect ref>
  0x039047 $9037: ------  .byte $00
  0x039048 $9038: ------  .byte $00
  0x039049 $9039: ------  .byte $00
  0x03904A $903A: ------  .byte $00
  0x03904B $903B: -D0-I-  .byte $00 ; <indirect ref>
  0x03904C $903C: -D0-I-  .byte $00 ; <indirect ref>
  0x03904D $903D: ------  .byte $93
  0x03904E $903E: ------  .byte $93
  0x03904F $903F: -D0-I-  .byte $00 ; <indirect ref>
  0x039050 $9040: -D0-I-  .byte $00 ; <indirect ref>
  0x039051 $9041: -D0-I-  .byte $00 ; <indirect ref>
  0x039052 $9042: -D0-I-  .byte $00 ; <indirect ref>
  0x039053 $9043: ------  .byte $00
  0x039054 $9044: ------  .byte $00
  0x039055 $9045: ------  .byte $00
  0x039056 $9046: ------  .byte $00
  0x039057 $9047: -D0-I-  .byte $00 ; <indirect ref>
  0x039058 $9048: -D0-I-  .byte $00 ; <indirect ref>
  0x039059 $9049: -D0-I-  .byte $00 ; <indirect ref>
  0x03905A $904A: -D0-I-  .byte $00 ; <indirect ref>
  0x03905B $904B: -D0-I-  .byte $95 ; <indirect ref>
  0x03905C $904C: -D0-I-  .byte $93 ; <indirect ref>
  0x03905D $904D: -D0-I-  .byte $00 ; <indirect ref>
  0x03905E $904E: -D0-I-  .byte $00 ; <indirect ref>
  0x03905F $904F: -D0-I-  .byte $16 ; <indirect ref>
  0x039060 $9050: -D0-I-  .byte $94 ; <indirect ref>
  0x039061 $9051: ------  .byte $00
  0x039062 $9052: ------  .byte $00
  0x039063 $9053: -D0-I-  .byte $3D ; <indirect ref>
  0x039064 $9054: -D0-I-  .byte $94 ; <indirect ref>
  0x039065 $9055: -D0-I-  .byte $4E ; <indirect ref>
  0x039066 $9056: -D0-I-  .byte $94 ; <indirect ref>
  0x039067 $9057: -D0-I-  .byte $00 ; <indirect ref>
  0x039068 $9058: -D0-I-  .byte $00 ; <indirect ref>
  0x039069 $9059: -D0-I-  .byte $98 ; <indirect ref>
  0x03906A $905A: -D0-I-  .byte $93 ; <indirect ref>
  0x03906B $905B: -D0-I-  .byte $00 ; <indirect ref>
  0x03906C $905C: -D0-I-  .byte $00 ; <indirect ref>
  0x03906D $905D: -D0-I-  .byte $00 ; <indirect ref>
  0x03906E $905E: -D0-I-  .byte $00 ; <indirect ref>
  0x03906F $905F: -D0-I-  .byte $00 ; <indirect ref>
  0x039070 $9060: -D0-I-  .byte $00 ; <indirect ref>
  0x039071 $9061: ------  .byte $00
  0x039072 $9062: ------  .byte $00
  0x039073 $9063: -D0-I-  .byte $00 ; <indirect ref>
  0x039074 $9064: -D0-I-  .byte $00 ; <indirect ref>
  0x039075 $9065: -D0-I-  .byte $00 ; <indirect ref>
  0x039076 $9066: -D0-I-  .byte $00 ; <indirect ref>
  0x039077 $9067: -D0-I-  .byte $9A ; <indirect ref>
  0x039078 $9068: -D0-I-  .byte $93 ; <indirect ref>
  0x039079 $9069: -D0-I-  .byte $00 ; <indirect ref>
  0x03907A $906A: -D0-I-  .byte $00 ; <indirect ref>
  0x03907B $906B: -D0-I-  .byte $00 ; <indirect ref>
  0x03907C $906C: -D0-I-  .byte $00 ; <indirect ref>
  0x03907D $906D: -D0-I-  .byte $31 ; <indirect ref>
  0x03907E $906E: -D0-I-  .byte $94 ; <indirect ref>
  0x03907F $906F: -D0-I-  .byte $3E ; <indirect ref>
  0x039080 $9070: -D0-I-  .byte $94 ; <indirect ref>
  0x039081 $9071: -D0-I-  .byte $4F ; <indirect ref>
  0x039082 $9072: -D0-I-  .byte $94 ; <indirect ref>
  0x039083 $9073: -D0-I-  .byte $5E ; <indirect ref>
  0x039084 $9074: -D0-I-  .byte $94 ; <indirect ref>
  0x039085 $9075: -D0-I-  .byte $9F ; <indirect ref>
  0x039086 $9076: -D0-I-  .byte $93 ; <indirect ref>
  0x039087 $9077: -D0-I-  .byte $00 ; <indirect ref>
  0x039088 $9078: -D0-I-  .byte $00 ; <indirect ref>
  0x039089 $9079: -D0-I-  .byte $00 ; <indirect ref>
  0x03908A $907A: -D0-I-  .byte $00 ; <indirect ref>
  0x03908B $907B: -D0-I-  .byte $31 ; <indirect ref>
  0x03908C $907C: -D0-I-  .byte $94 ; <indirect ref>
  0x03908D $907D: -D0-I-  .byte $00 ; <indirect ref>
  0x03908E $907E: -D0-I-  .byte $00 ; <indirect ref>
  0x03908F $907F: -D0-I-  .byte $00 ; <indirect ref>
  0x039090 $9080: -D0-I-  .byte $00 ; <indirect ref>
  0x039091 $9081: -D0-I-  .byte $00 ; <indirect ref>
  0x039092 $9082: -D0-I-  .byte $00 ; <indirect ref>
  0x039093 $9083: -D0-I-  .byte $A4 ; <indirect ref>
  0x039094 $9084: -D0-I-  .byte $93 ; <indirect ref>
  0x039095 $9085: -D0-I-  .byte $0C ; <indirect ref>
  0x039096 $9086: -D0-I-  .byte $94 ; <indirect ref>
  0x039097 $9087: -D0-I-  .byte $00 ; <indirect ref>
  0x039098 $9088: -D0-I-  .byte $00 ; <indirect ref>
  0x039099 $9089: -D0-I-  .byte $00 ; <indirect ref>
  0x03909A $908A: -D0-I-  .byte $00 ; <indirect ref>
  0x03909B $908B: ------  .byte $00
  0x03909C $908C: ------  .byte $00
  0x03909D $908D: -D0-I-  .byte $50 ; <indirect ref>
  0x03909E $908E: -D0-I-  .byte $94 ; <indirect ref>
  0x03909F $908F: ------  .byte $00
  0x0390A0 $9090: ------  .byte $00
  0x0390A1 $9091: -D0-I-  .byte $A6 ; <indirect ref>
  0x0390A2 $9092: -D0-I-  .byte $93 ; <indirect ref>
  0x0390A3 $9093: -D0-I-  .byte $00 ; <indirect ref>
  0x0390A4 $9094: -D0-I-  .byte $00 ; <indirect ref>
  0x0390A5 $9095: -D0-I-  .byte $00 ; <indirect ref>
  0x0390A6 $9096: -D0-I-  .byte $00 ; <indirect ref>
  0x0390A7 $9097: -D0-I-  .byte $00 ; <indirect ref>
  0x0390A8 $9098: -D0-I-  .byte $00 ; <indirect ref>
  0x0390A9 $9099: -D0-I-  .byte $00 ; <indirect ref>
  0x0390AA $909A: -D0-I-  .byte $00 ; <indirect ref>
  0x0390AB $909B: -D0-I-  .byte $00 ; <indirect ref>
  0x0390AC $909C: -D0-I-  .byte $00 ; <indirect ref>
  0x0390AD $909D: ------  .byte $00
  0x0390AE $909E: ------  .byte $00
  0x0390AF $909F: -D0-I-  .byte $A8 ; <indirect ref>
  0x0390B0 $90A0: -D0-I-  .byte $93 ; <indirect ref>
  0x0390B1 $90A1: -D0-I-  .byte $00 ; <indirect ref>
  0x0390B2 $90A2: -D0-I-  .byte $00 ; <indirect ref>
  0x0390B3 $90A3: -D0-I-  .byte $00 ; <indirect ref>
  0x0390B4 $90A4: -D0-I-  .byte $00 ; <indirect ref>
  0x0390B5 $90A5: -D0-I-  .byte $00 ; <indirect ref>
  0x0390B6 $90A6: -D0-I-  .byte $00 ; <indirect ref>
  0x0390B7 $90A7: ------  .byte $00
  0x0390B8 $90A8: ------  .byte $00
  0x0390B9 $90A9: -D0-I-  .byte $00 ; <indirect ref>
  0x0390BA $90AA: -D0-I-  .byte $00 ; <indirect ref>
  0x0390BB $90AB: -D0-I-  .byte $00 ; <indirect ref>
  0x0390BC $90AC: -D0-I-  .byte $00 ; <indirect ref>
  0x0390BD $90AD: -D0-I-  .byte $AB ; <indirect ref>
  0x0390BE $90AE: -D0-I-  .byte $93 ; <indirect ref>
  0x0390BF $90AF: -D0-I-  .byte $00 ; <indirect ref>
  0x0390C0 $90B0: -D0-I-  .byte $00 ; <indirect ref>
  0x0390C1 $90B1: -D0-I-  .byte $17 ; <indirect ref>
  0x0390C2 $90B2: -D0-I-  .byte $94 ; <indirect ref>
  0x0390C3 $90B3: -D0-I-  .byte $32 ; <indirect ref>
  0x0390C4 $90B4: -D0-I-  .byte $94 ; <indirect ref>
  0x0390C5 $90B5: ------  .byte $00
  0x0390C6 $90B6: ------  .byte $00
  0x0390C7 $90B7: -D0-I-  .byte $51 ; <indirect ref>
  0x0390C8 $90B8: -D0-I-  .byte $94 ; <indirect ref>
  0x0390C9 $90B9: ------  .byte $00
  0x0390CA $90BA: ------  .byte $00
  0x0390CB $90BB: -D0-I-  .byte $00 ; <indirect ref>
  0x0390CC $90BC: -D0-I-  .byte $00 ; <indirect ref>
  0x0390CD $90BD: -D0-I-  .byte $00 ; <indirect ref>
  0x0390CE $90BE: -D0-I-  .byte $00 ; <indirect ref>
  0x0390CF $90BF: -D0-I-  .byte $00 ; <indirect ref>
  0x0390D0 $90C0: -D0-I-  .byte $00 ; <indirect ref>
  0x0390D1 $90C1: -D0-I-  .byte $32 ; <indirect ref>
  0x0390D2 $90C2: -D0-I-  .byte $94 ; <indirect ref>
  0x0390D3 $90C3: -D0-I-  .byte $00 ; <indirect ref>
  0x0390D4 $90C4: -D0-I-  .byte $00 ; <indirect ref>
  0x0390D5 $90C5: -D0-I-  .byte $00 ; <indirect ref>
  0x0390D6 $90C6: -D0-I-  .byte $00 ; <indirect ref>
  0x0390D7 $90C7: -D0-I-  .byte $00 ; <indirect ref>
  0x0390D8 $90C8: -D0-I-  .byte $00 ; <indirect ref>
  0x0390D9 $90C9: -D0-I-  .byte $AF ; <indirect ref>
  0x0390DA $90CA: -D0-I-  .byte $93 ; <indirect ref>
  0x0390DB $90CB: -D0-I-  .byte $00 ; <indirect ref>
  0x0390DC $90CC: -D0-I-  .byte $00 ; <indirect ref>
  0x0390DD $90CD: -D0-I-  .byte $00 ; <indirect ref>
  0x0390DE $90CE: -D0-I-  .byte $00 ; <indirect ref>
  0x0390DF $90CF: -D0-I-  .byte $00 ; <indirect ref>
  0x0390E0 $90D0: -D0-I-  .byte $00 ; <indirect ref>
  0x0390E1 $90D1: ------  .byte $00
  0x0390E2 $90D2: ------  .byte $00
  0x0390E3 $90D3: -D0-I-  .byte $00 ; <indirect ref>
  0x0390E4 $90D4: -D0-I-  .byte $00 ; <indirect ref>
  0x0390E5 $90D5: ------  .byte $00
  0x0390E6 $90D6: ------  .byte $00
  0x0390E7 $90D7: -D0-I-  .byte $B1 ; <indirect ref>
  0x0390E8 $90D8: -D0-I-  .byte $93 ; <indirect ref>
  0x0390E9 $90D9: -D0-I-  .byte $00 ; <indirect ref>
  0x0390EA $90DA: -D0-I-  .byte $00 ; <indirect ref>
  0x0390EB $90DB: -D0-I-  .byte $00 ; <indirect ref>
  0x0390EC $90DC: -D0-I-  .byte $00 ; <indirect ref>
  0x0390ED $90DD: ------  .byte $00
  0x0390EE $90DE: ------  .byte $00
  0x0390EF $90DF: ------  .byte $00
  0x0390F0 $90E0: ------  .byte $00
  0x0390F1 $90E1: ------  .byte $00
  0x0390F2 $90E2: ------  .byte $00
  0x0390F3 $90E3: ------  .byte $00
  0x0390F4 $90E4: ------  .byte $00
  0x0390F5 $90E5: -D0-I-  .byte $B3 ; <indirect ref>
  0x0390F6 $90E6: -D0-I-  .byte $93 ; <indirect ref>
  0x0390F7 $90E7: -D0-I-  .byte $00 ; <indirect ref>
  0x0390F8 $90E8: -D0-I-  .byte $00 ; <indirect ref>
  0x0390F9 $90E9: -D0-I-  .byte $00 ; <indirect ref>
  0x0390FA $90EA: -D0-I-  .byte $00 ; <indirect ref>
  0x0390FB $90EB: ------  .byte $00
  0x0390FC $90EC: ------  .byte $00
  0x0390FD $90ED: ------  .byte $00
  0x0390FE $90EE: ------  .byte $00
  0x0390FF $90EF: ------  .byte $00
  0x039100 $90F0: ------  .byte $00
  0x039101 $90F1: ------  .byte $00
  0x039102 $90F2: ------  .byte $00
  0x039103 $90F3: -D0-I-  .byte $00 ; <indirect ref>
  0x039104 $90F4: -D0-I-  .byte $00 ; <indirect ref>
  0x039105 $90F5: -D0-I-  .byte $00 ; <indirect ref>
  0x039106 $90F6: -D0-I-  .byte $00 ; <indirect ref>
  0x039107 $90F7: -D0-I-  .byte $18 ; <indirect ref>
  0x039108 $90F8: -D0-I-  .byte $94 ; <indirect ref>
  0x039109 $90F9: ------  .byte $00
  0x03910A $90FA: ------  .byte $00
  0x03910B $90FB: ------  .byte $00
  0x03910C $90FC: ------  .byte $00
  0x03910D $90FD: ------  .byte $00
  0x03910E $90FE: ------  .byte $00
  0x03910F $90FF: ------  .byte $00
  0x039110 $9100: ------  .byte $00
  0x039111 $9101: -D0-I-  .byte $00 ; <indirect ref>
  0x039112 $9102: -D0-I-  .byte $00 ; <indirect ref>
  0x039113 $9103: ------  .byte $0D
  0x039114 $9104: ------  .byte $94
  0x039115 $9105: -D0-I-  .byte $00 ; <indirect ref>
  0x039116 $9106: -D0-I-  .byte $00 ; <indirect ref>
  0x039117 $9107: -D0-I-  .byte $00 ; <indirect ref>
  0x039118 $9108: -D0-I-  .byte $00 ; <indirect ref>
  0x039119 $9109: ------  .byte $00
  0x03911A $910A: ------  .byte $00
  0x03911B $910B: -D0-I-  .byte $00 ; <indirect ref>
  0x03911C $910C: -D0-I-  .byte $00 ; <indirect ref>
  0x03911D $910D: ------  .byte $00
  0x03911E $910E: ------  .byte $00
  0x03911F $910F: -D0-I-  .byte $B5 ; <indirect ref>
  0x039120 $9110: -D0-I-  .byte $93 ; <indirect ref>
  0x039121 $9111: -D0-I-  .byte $00 ; <indirect ref>
  0x039122 $9112: -D0-I-  .byte $00 ; <indirect ref>
  0x039123 $9113: -D0-I-  .byte $19 ; <indirect ref>
  0x039124 $9114: -D0-I-  .byte $94 ; <indirect ref>
  0x039125 $9115: ------  .byte $00
  0x039126 $9116: ------  .byte $00
  0x039127 $9117: ------  .byte $00
  0x039128 $9118: ------  .byte $00
  0x039129 $9119: -D0-I-  .byte $52 ; <indirect ref>
  0x03912A $911A: -D0-I-  .byte $94 ; <indirect ref>
  0x03912B $911B: ------  .byte $00
  0x03912C $911C: ------  .byte $00
  0x03912D $911D: -D0-I-  .byte $B9 ; <indirect ref>
  0x03912E $911E: -D0-I-  .byte $93 ; <indirect ref>
  0x03912F $911F: -D0-I-  .byte $00 ; <indirect ref>
  0x039130 $9120: -D0-I-  .byte $00 ; <indirect ref>
  0x039131 $9121: -D0-I-  .byte $00 ; <indirect ref>
  0x039132 $9122: -D0-I-  .byte $00 ; <indirect ref>
  0x039133 $9123: ------  .byte $00
  0x039134 $9124: ------  .byte $00
  0x039135 $9125: ------  .byte $00
  0x039136 $9126: ------  .byte $00
  0x039137 $9127: ------  .byte $00
  0x039138 $9128: ------  .byte $00
  0x039139 $9129: ------  .byte $00
  0x03913A $912A: ------  .byte $00
  0x03913B $912B: ------  .byte $BC
  0x03913C $912C: ------  .byte $93
  0x03913D $912D: -D0-I-  .byte $00 ; <indirect ref>
  0x03913E $912E: -D0-I-  .byte $00 ; <indirect ref>
  0x03913F $912F: ------  .byte $00
  0x039140 $9130: ------  .byte $00
  0x039141 $9131: ------  .byte $00
  0x039142 $9132: ------  .byte $00
  0x039143 $9133: ------  .byte $00
  0x039144 $9134: ------  .byte $00
  0x039145 $9135: -D0-I-  .byte $00 ; <indirect ref>
  0x039146 $9136: -D0-I-  .byte $00 ; <indirect ref>
  0x039147 $9137: ------  .byte $00
  0x039148 $9138: ------  .byte $00
  0x039149 $9139: -D0-I-  .byte $BE ; <indirect ref>
  0x03914A $913A: -D0-I-  .byte $93 ; <indirect ref>
  0x03914B $913B: -D0-I-  .byte $00 ; <indirect ref>
  0x03914C $913C: -D0-I-  .byte $00 ; <indirect ref>
  0x03914D $913D: -D0-I-  .byte $00 ; <indirect ref>
  0x03914E $913E: -D0-I-  .byte $00 ; <indirect ref>
  0x03914F $913F: ------  .byte $00
  0x039150 $9140: ------  .byte $00
  0x039151 $9141: ------  .byte $00
  0x039152 $9142: ------  .byte $00
  0x039153 $9143: ------  .byte $00
  0x039154 $9144: ------  .byte $00
  0x039155 $9145: ------  .byte $00
  0x039156 $9146: ------  .byte $00
  0x039157 $9147: -D0-I-  .byte $C1 ; <indirect ref>
  0x039158 $9148: -D0-I-  .byte $93 ; <indirect ref>
  0x039159 $9149: ------  .byte $00
  0x03915A $914A: ------  .byte $00
  0x03915B $914B: -D0-I-  .byte $00 ; <indirect ref>
  0x03915C $914C: -D0-I-  .byte $00 ; <indirect ref>
  0x03915D $914D: -D0-I-  .byte $00 ; <indirect ref>
  0x03915E $914E: -D0-I-  .byte $00 ; <indirect ref>
  0x03915F $914F: ------  .byte $00
  0x039160 $9150: ------  .byte $00
  0x039161 $9151: ------  .byte $00
  0x039162 $9152: ------  .byte $00
  0x039163 $9153: ------  .byte $00
  0x039164 $9154: ------  .byte $00
  0x039165 $9155: -D0-I-  .byte $C3 ; <indirect ref>
  0x039166 $9156: -D0-I-  .byte $93 ; <indirect ref>
  0x039167 $9157: -D0-I-  .byte $00 ; <indirect ref>
  0x039168 $9158: -D0-I-  .byte $00 ; <indirect ref>
  0x039169 $9159: -D0-I-  .byte $00 ; <indirect ref>
  0x03916A $915A: -D0-I-  .byte $00 ; <indirect ref>
  0x03916B $915B: -D0-I-  .byte $33 ; <indirect ref>
  0x03916C $915C: -D0-I-  .byte $94 ; <indirect ref>
  0x03916D $915D: ------  .byte $3F
  0x03916E $915E: ------  .byte $94
  0x03916F $915F: ------  .byte $53
  0x039170 $9160: ------  .byte $94
  0x039171 $9161: ------  .byte $5F
  0x039172 $9162: ------  .byte $94
  0x039173 $9163: -D0-I-  .byte $C8 ; <indirect ref>
  0x039174 $9164: -D0-I-  .byte $93 ; <indirect ref>
  0x039175 $9165: -D0-I-  .byte $00 ; <indirect ref>
  0x039176 $9166: -D0-I-  .byte $00 ; <indirect ref>
  0x039177 $9167: -D0-I-  .byte $00 ; <indirect ref>
  0x039178 $9168: -D0-I-  .byte $00 ; <indirect ref>
  0x039179 $9169: -D0-I-  .byte $33 ; <indirect ref>
  0x03917A $916A: -D0-I-  .byte $94 ; <indirect ref>
  0x03917B $916B: ------  .byte $00
  0x03917C $916C: ------  .byte $00
  0x03917D $916D: -D0-I-  .byte $00 ; <indirect ref>
  0x03917E $916E: -D0-I-  .byte $00 ; <indirect ref>
  0x03917F $916F: ------  .byte $00
  0x039180 $9170: ------  .byte $00
  0x039181 $9171: -D0-I-  .byte $CD ; <indirect ref>
  0x039182 $9172: -D0-I-  .byte $93 ; <indirect ref>
  0x039183 $9173: ------  .byte $00
  0x039184 $9174: ------  .byte $00
  0x039185 $9175: ------  .byte $1A
  0x039186 $9176: ------  .byte $94
  0x039187 $9177: ------  .byte $00
  0x039188 $9178: ------  .byte $00
  0x039189 $9179: ------  .byte $40
  0x03918A $917A: ------  .byte $94
  0x03918B $917B: ------  .byte $54
  0x03918C $917C: ------  .byte $94
  0x03918D $917D: ------  .byte $00
  0x03918E $917E: ------  .byte $00
  0x03918F $917F: ------  .byte $00
  0x039190 $9180: ------  .byte $00
  0x039191 $9181: ------  .byte $00
  0x039192 $9182: ------  .byte $00
  0x039193 $9183: ------  .byte $00
  0x039194 $9184: ------  .byte $00
  0x039195 $9185: ------  .byte $00
  0x039196 $9186: ------  .byte $00
  0x039197 $9187: -D0-I-  .byte $41 ; <indirect ref>
  0x039198 $9188: -D0-I-  .byte $94 ; <indirect ref>
  0x039199 $9189: -D0-I-  .byte $00 ; <indirect ref>
  0x03919A $918A: -D0-I-  .byte $00 ; <indirect ref>
  0x03919B $918B: ------  .byte $00
  0x03919C $918C: ------  .byte $00
  0x03919D $918D: -D0-I-  .byte $D0 ; <indirect ref>
  0x03919E $918E: -D0-I-  .byte $93 ; <indirect ref>
  0x03919F $918F: -D0-I-  .byte $0E ; <indirect ref>
  0x0391A0 $9190: -D0-I-  .byte $94 ; <indirect ref>
  0x0391A1 $9191: -D0-I-  .byte $00 ; <indirect ref>
  0x0391A2 $9192: -D0-I-  .byte $00 ; <indirect ref>
  0x0391A3 $9193: ------  .byte $00
  0x0391A4 $9194: ------  .byte $00
  0x0391A5 $9195: ------  .byte $00
  0x0391A6 $9196: ------  .byte $00
  0x0391A7 $9197: -D0-I-  .byte $55 ; <indirect ref>
  0x0391A8 $9198: -D0-I-  .byte $94 ; <indirect ref>
  0x0391A9 $9199: ------  .byte $00
  0x0391AA $919A: ------  .byte $00
  0x0391AB $919B: -D0-I-  .byte $D2 ; <indirect ref>
  0x0391AC $919C: -D0-I-  .byte $93 ; <indirect ref>
  0x0391AD $919D: ------  .byte $00
  0x0391AE $919E: ------  .byte $00
  0x0391AF $919F: -D0-I-  .byte $00 ; <indirect ref>
  0x0391B0 $91A0: -D0-I-  .byte $00 ; <indirect ref>
  0x0391B1 $91A1: ------  .byte $00
  0x0391B2 $91A2: ------  .byte $00
  0x0391B3 $91A3: ------  .byte $00
  0x0391B4 $91A4: ------  .byte $00
  0x0391B5 $91A5: -D0-I-  .byte $00 ; <indirect ref>
  0x0391B6 $91A6: -D0-I-  .byte $00 ; <indirect ref>
  0x0391B7 $91A7: ------  .byte $00
  0x0391B8 $91A8: ------  .byte $00
  0x0391B9 $91A9: -D0-I-  .byte $D5 ; <indirect ref>
  0x0391BA $91AA: -D0-I-  .byte $93 ; <indirect ref>
  0x0391BB $91AB: -D0-I-  .byte $00 ; <indirect ref>
  0x0391BC $91AC: -D0-I-  .byte $00 ; <indirect ref>
  0x0391BD $91AD: -D0-I-  .byte $00 ; <indirect ref>
  0x0391BE $91AE: -D0-I-  .byte $00 ; <indirect ref>
  0x0391BF $91AF: -D0-I-  .byte $00 ; <indirect ref>
  0x0391C0 $91B0: -D0-I-  .byte $00 ; <indirect ref>
  0x0391C1 $91B1: ------  .byte $00
  0x0391C2 $91B2: ------  .byte $00
  0x0391C3 $91B3: -D0-I-  .byte $00 ; <indirect ref>
  0x0391C4 $91B4: -D0-I-  .byte $00 ; <indirect ref>
  0x0391C5 $91B5: -D0-I-  .byte $00 ; <indirect ref>
  0x0391C6 $91B6: -D0-I-  .byte $00 ; <indirect ref>
  0x0391C7 $91B7: -D0-I-  .byte $D7 ; <indirect ref>
  0x0391C8 $91B8: -D0-I-  .byte $93 ; <indirect ref>
  0x0391C9 $91B9: ------  .byte $00
  0x0391CA $91BA: ------  .byte $00
  0x0391CB $91BB: -D0-I-  .byte $00 ; <indirect ref>
  0x0391CC $91BC: -D0-I-  .byte $00 ; <indirect ref>
  0x0391CD $91BD: -D0-I-  .byte $00 ; <indirect ref>
  0x0391CE $91BE: -D0-I-  .byte $00 ; <indirect ref>
  0x0391CF $91BF: ------  .byte $00
  0x0391D0 $91C0: ------  .byte $00
  0x0391D1 $91C1: ------  .byte $00
  0x0391D2 $91C2: ------  .byte $00
  0x0391D3 $91C3: -D0-I-  .byte $00 ; <indirect ref>
  0x0391D4 $91C4: -D0-I-  .byte $00 ; <indirect ref>
  0x0391D5 $91C5: -D0-I-  .byte $D9 ; <indirect ref>
  0x0391D6 $91C6: -D0-I-  .byte $93 ; <indirect ref>
  0x0391D7 $91C7: -D0-I-  .byte $00 ; <indirect ref>
  0x0391D8 $91C8: -D0-I-  .byte $00 ; <indirect ref>
  0x0391D9 $91C9: -D0-I-  .byte $1B ; <indirect ref>
  0x0391DA $91CA: -D0-I-  .byte $94 ; <indirect ref>
  0x0391DB $91CB: -D0-I-  .byte $00 ; <indirect ref>
  0x0391DC $91CC: -D0-I-  .byte $00 ; <indirect ref>
  0x0391DD $91CD: ------  .byte $00
  0x0391DE $91CE: ------  .byte $00
  0x0391DF $91CF: ------  .byte $00
  0x0391E0 $91D0: ------  .byte $00
  0x0391E1 $91D1: ------  .byte $00
  0x0391E2 $91D2: ------  .byte $00
  0x0391E3 $91D3: -D0-I-  .byte $DC ; <indirect ref>
  0x0391E4 $91D4: -D0-I-  .byte $93 ; <indirect ref>
  0x0391E5 $91D5: -D0-I-  .byte $00 ; <indirect ref>
  0x0391E6 $91D6: -D0-I-  .byte $00 ; <indirect ref>
  0x0391E7 $91D7: -D0-I-  .byte $00 ; <indirect ref>
  0x0391E8 $91D8: -D0-I-  .byte $00 ; <indirect ref>
  0x0391E9 $91D9: -D0-I-  .byte $00 ; <indirect ref>
  0x0391EA $91DA: -D0-I-  .byte $00 ; <indirect ref>
  0x0391EB $91DB: ------  .byte $00
  0x0391EC $91DC: ------  .byte $00
  0x0391ED $91DD: ------  .byte $00
  0x0391EE $91DE: ------  .byte $00
  0x0391EF $91DF: -D0-I-  .byte $00 ; <indirect ref>
  0x0391F0 $91E0: -D0-I-  .byte $00 ; <indirect ref>
  0x0391F1 $91E1: -D0-I-  .byte $01 ; <indirect ref>
  0x0391F2 $91E2: -D0-I-  .byte $00 ; <indirect ref>
  0x0391F3 $91E3: ------  .byte $00
  0x0391F4 $91E4: ------  .byte $00
  0x0391F5 $91E5: ------  .byte $00
  0x0391F6 $91E6: ------  .byte $00
  0x0391F7 $91E7: ------  .byte $00
  0x0391F8 $91E8: ------  .byte $00
  0x0391F9 $91E9: ------  .byte $00
  0x0391FA $91EA: ------  .byte $00
  0x0391FB $91EB: ------  .byte $00
  0x0391FC $91EC: ------  .byte $00
  0x0391FD $91ED: ------  .byte $00
  0x0391FE $91EE: ------  .byte $00
  0x0391FF $91EF: ------  .byte $00
  0x039200 $91F0: ------  .byte $00
  0x039201 $91F1: ------  .byte $00
  0x039202 $91F2: ------  .byte $00
  0x039203 $91F3: ------  .byte $1C
  0x039204 $91F4: ------  .byte $94
  0x039205 $91F5: ------  .byte $00
  0x039206 $91F6: ------  .byte $00
  0x039207 $91F7: ------  .byte $42
  0x039208 $91F8: ------  .byte $94
  0x039209 $91F9: ------  .byte $56
  0x03920A $91FA: ------  .byte $94
  0x03920B $91FB: ------  .byte $00
  0x03920C $91FC: ------  .byte $00
  0x03920D $91FD: -D0-I-  .byte $02 ; <indirect ref>
  0x03920E $91FE: -D0-I-  .byte $00 ; <indirect ref>
  0x03920F $91FF: ------  .byte $00
  0x039210 $9200: ------  .byte $00
  0x039211 $9201: ------  .byte $00
  0x039212 $9202: ------  .byte $00
  0x039213 $9203: ------  .byte $00
  0x039214 $9204: ------  .byte $00
  0x039215 $9205: ------  .byte $00
  0x039216 $9206: ------  .byte $00
  0x039217 $9207: ------  .byte $00
  0x039218 $9208: ------  .byte $00
  0x039219 $9209: ------  .byte $00
  0x03921A $920A: ------  .byte $00
  0x03921B $920B: -D0-I-  .byte $DF ; <indirect ref>
  0x03921C $920C: -D0-I-  .byte $93 ; <indirect ref>
  0x03921D $920D: -D0-I-  .byte $00 ; <indirect ref>
  0x03921E $920E: -D0-I-  .byte $00 ; <indirect ref>
  0x03921F $920F: -D0-I-  .byte $1D ; <indirect ref>
  0x039220 $9210: -D0-I-  .byte $94 ; <indirect ref>
  0x039221 $9211: -D0-I-  .byte $34 ; <indirect ref>
  0x039222 $9212: -D0-I-  .byte $94 ; <indirect ref>
  0x039223 $9213: -D0-I-  .byte $00 ; <indirect ref>
  0x039224 $9214: -D0-I-  .byte $00 ; <indirect ref>
  0x039225 $9215: -D0-I-  .byte $00 ; <indirect ref>
  0x039226 $9216: -D0-I-  .byte $00 ; <indirect ref>
  0x039227 $9217: -D0-I-  .byte $00 ; <indirect ref>
  0x039228 $9218: -D0-I-  .byte $00 ; <indirect ref>
  0x039229 $9219: -D0-I-  .byte $E3 ; <indirect ref>
  0x03922A $921A: -D0-I-  .byte $93 ; <indirect ref>
  0x03922B $921B: -D0-I-  .byte $00 ; <indirect ref>
  0x03922C $921C: -D0-I-  .byte $00 ; <indirect ref>
  0x03922D $921D: -D0-I-  .byte $00 ; <indirect ref>
  0x03922E $921E: -D0-I-  .byte $00 ; <indirect ref>
  0x03922F $921F: -D0-I-  .byte $34 ; <indirect ref>
  0x039230 $9220: -D0-I-  .byte $94 ; <indirect ref>
  0x039231 $9221: -D0-I-  .byte $00 ; <indirect ref>
  0x039232 $9222: -D0-I-  .byte $00 ; <indirect ref>
  0x039233 $9223: -D0-I-  .byte $00 ; <indirect ref>
  0x039234 $9224: -D0-I-  .byte $00 ; <indirect ref>
  0x039235 $9225: -D0-I-  .byte $00 ; <indirect ref>
  0x039236 $9226: -D0-I-  .byte $00 ; <indirect ref>
  0x039237 $9227: -D0-I-  .byte $E7 ; <indirect ref>
  0x039238 $9228: -D0-I-  .byte $93 ; <indirect ref>
  0x039239 $9229: -D0-I-  .byte $00 ; <indirect ref>
  0x03923A $922A: -D0-I-  .byte $00 ; <indirect ref>
  0x03923B $922B: -D0-I-  .byte $00 ; <indirect ref>
  0x03923C $922C: -D0-I-  .byte $00 ; <indirect ref>
  0x03923D $922D: -D0-I-  .byte $00 ; <indirect ref>
  0x03923E $922E: -D0-I-  .byte $00 ; <indirect ref>
  0x03923F $922F: ------  .byte $00
  0x039240 $9230: ------  .byte $00
  0x039241 $9231: -D0-I-  .byte $00 ; <indirect ref>
  0x039242 $9232: -D0-I-  .byte $00 ; <indirect ref>
  0x039243 $9233: ------  .byte $00
  0x039244 $9234: ------  .byte $00
  0x039245 $9235: -D0-I-  .byte $E9 ; <indirect ref>
  0x039246 $9236: -D0-I-  .byte $93 ; <indirect ref>
  0x039247 $9237: -D0-I-  .byte $00 ; <indirect ref>
  0x039248 $9238: -D0-I-  .byte $00 ; <indirect ref>
  0x039249 $9239: -D0-I-  .byte $1E ; <indirect ref>
  0x03924A $923A: -D0-I-  .byte $94 ; <indirect ref>
  0x03924B $923B: ------  .byte $00
  0x03924C $923C: ------  .byte $00
  0x03924D $923D: -D0-I-  .byte $00 ; <indirect ref>
  0x03924E $923E: -D0-I-  .byte $00 ; <indirect ref>
  0x03924F $923F: -D0-I-  .byte $00 ; <indirect ref>
  0x039250 $9240: -D0-I-  .byte $00 ; <indirect ref>
  0x039251 $9241: -D0-I-  .byte $00 ; <indirect ref>
  0x039252 $9242: -D0-I-  .byte $00 ; <indirect ref>
  0x039253 $9243: -D0-I-  .byte $00 ; <indirect ref>
  0x039254 $9244: -D0-I-  .byte $00 ; <indirect ref>
  0x039255 $9245: -D0-I-  .byte $00 ; <indirect ref>
  0x039256 $9246: -D0-I-  .byte $00 ; <indirect ref>
  0x039257 $9247: -D0-I-  .byte $1F ; <indirect ref>
  0x039258 $9248: -D0-I-  .byte $94 ; <indirect ref>
  0x039259 $9249: -D0-I-  .byte $00 ; <indirect ref>
  0x03925A $924A: -D0-I-  .byte $00 ; <indirect ref>
  0x03925B $924B: -D0-I-  .byte $43 ; <indirect ref>
  0x03925C $924C: -D0-I-  .byte $94 ; <indirect ref>
  0x03925D $924D: -D0-I-  .byte $57 ; <indirect ref>
  0x03925E $924E: -D0-I-  .byte $94 ; <indirect ref>
  0x03925F $924F: -D0-I-  .byte $00 ; <indirect ref>
  0x039260 $9250: -D0-I-  .byte $00 ; <indirect ref>
  0x039261 $9251: -D0-I-  .byte $00 ; <indirect ref>
  0x039262 $9252: -D0-I-  .byte $00 ; <indirect ref>
  0x039263 $9253: -D0-I-  .byte $00 ; <indirect ref>
  0x039264 $9254: -D0-I-  .byte $00 ; <indirect ref>
  0x039265 $9255: -D0-I-  .byte $00 ; <indirect ref>
  0x039266 $9256: -D0-I-  .byte $00 ; <indirect ref>
  0x039267 $9257: -D0-I-  .byte $35 ; <indirect ref>
  0x039268 $9258: -D0-I-  .byte $94 ; <indirect ref>
  0x039269 $9259: -D0-I-  .byte $00 ; <indirect ref>
  0x03926A $925A: -D0-I-  .byte $00 ; <indirect ref>
  0x03926B $925B: ------  .byte $00
  0x03926C $925C: ------  .byte $00
  0x03926D $925D: -D0-I-  .byte $00 ; <indirect ref>
  0x03926E $925E: -D0-I-  .byte $00 ; <indirect ref>
  0x03926F $925F: -D0-I-  .byte $EB ; <indirect ref>
  0x039270 $9260: -D0-I-  .byte $93 ; <indirect ref>
  0x039271 $9261: -D0-I-  .byte $00 ; <indirect ref>
  0x039272 $9262: -D0-I-  .byte $00 ; <indirect ref>
  0x039273 $9263: -D0-I-  .byte $00 ; <indirect ref>
  0x039274 $9264: -D0-I-  .byte $00 ; <indirect ref>
  0x039275 $9265: -D0-I-  .byte $00 ; <indirect ref>
  0x039276 $9266: -D0-I-  .byte $00 ; <indirect ref>
  0x039277 $9267: ------  .byte $00
  0x039278 $9268: ------  .byte $00
  0x039279 $9269: -D0-I-  .byte $00 ; <indirect ref>
  0x03927A $926A: -D0-I-  .byte $00 ; <indirect ref>
  0x03927B $926B: -D0-I-  .byte $00 ; <indirect ref>
  0x03927C $926C: -D0-I-  .byte $00 ; <indirect ref>
  0x03927D $926D: -D0-I-  .byte $ED ; <indirect ref>
  0x03927E $926E: -D0-I-  .byte $93 ; <indirect ref>
  0x03927F $926F: -D0-I-  .byte $00 ; <indirect ref>
  0x039280 $9270: -D0-I-  .byte $00 ; <indirect ref>
  0x039281 $9271: -D0-I-  .byte $00 ; <indirect ref>
  0x039282 $9272: -D0-I-  .byte $00 ; <indirect ref>
  0x039283 $9273: -D0-I-  .byte $35 ; <indirect ref>
  0x039284 $9274: -D0-I-  .byte $94 ; <indirect ref>
  0x039285 $9275: -D0-I-  .byte $00 ; <indirect ref>
  0x039286 $9276: -D0-I-  .byte $00 ; <indirect ref>
  0x039287 $9277: -D0-I-  .byte $00 ; <indirect ref>
  0x039288 $9278: -D0-I-  .byte $00 ; <indirect ref>
  0x039289 $9279: -D0-I-  .byte $00 ; <indirect ref>
  0x03928A $927A: -D0-I-  .byte $00 ; <indirect ref>
  0x03928B $927B: ------  .byte $00
  0x03928C $927C: ------  .byte $00
  0x03928D $927D: -D0-I-  .byte $00 ; <indirect ref>
  0x03928E $927E: -D0-I-  .byte $00 ; <indirect ref>
  0x03928F $927F: -D0-I-  .byte $20 ; <indirect ref>
  0x039290 $9280: -D0-I-  .byte $94 ; <indirect ref>
  0x039291 $9281: ------  .byte $00
  0x039292 $9282: ------  .byte $00
  0x039293 $9283: -D0-I-  .byte $44 ; <indirect ref>
  0x039294 $9284: -D0-I-  .byte $94 ; <indirect ref>
  0x039295 $9285: -D0-I-  .byte $58 ; <indirect ref>
  0x039296 $9286: -D0-I-  .byte $94 ; <indirect ref>
  0x039297 $9287: -D0-I-  .byte $00 ; <indirect ref>
  0x039298 $9288: -D0-I-  .byte $00 ; <indirect ref>
  0x039299 $9289: -D0-I-  .byte $F1 ; <indirect ref>
  0x03929A $928A: -D0-I-  .byte $93 ; <indirect ref>
  0x03929B $928B: -D0-I-  .byte $00 ; <indirect ref>
  0x03929C $928C: -D0-I-  .byte $00 ; <indirect ref>
  0x03929D $928D: -D0-I-  .byte $00 ; <indirect ref>
  0x03929E $928E: -D0-I-  .byte $00 ; <indirect ref>
  0x03929F $928F: ------  .byte $00
  0x0392A0 $9290: ------  .byte $00
  0x0392A1 $9291: ------  .byte $00
  0x0392A2 $9292: ------  .byte $00
  0x0392A3 $9293: -D0-I-  .byte $00 ; <indirect ref>
  0x0392A4 $9294: -D0-I-  .byte $00 ; <indirect ref>
  0x0392A5 $9295: -D0-I-  .byte $00 ; <indirect ref>
  0x0392A6 $9296: -D0-I-  .byte $00 ; <indirect ref>
  0x0392A7 $9297: -D0-I-  .byte $00 ; <indirect ref>
  0x0392A8 $9298: -D0-I-  .byte $00 ; <indirect ref>
  0x0392A9 $9299: -D0-I-  .byte $00 ; <indirect ref>
  0x0392AA $929A: -D0-I-  .byte $00 ; <indirect ref>
  0x0392AB $929B: -D0-I-  .byte $21 ; <indirect ref>
  0x0392AC $929C: -D0-I-  .byte $94 ; <indirect ref>
  0x0392AD $929D: -D0-I-  .byte $00 ; <indirect ref>
  0x0392AE $929E: -D0-I-  .byte $00 ; <indirect ref>
  0x0392AF $929F: -D0-I-  .byte $00 ; <indirect ref>
  0x0392B0 $92A0: -D0-I-  .byte $00 ; <indirect ref>
  0x0392B1 $92A1: -D0-I-  .byte $00 ; <indirect ref>
  0x0392B2 $92A2: -D0-I-  .byte $00 ; <indirect ref>
  0x0392B3 $92A3: -D0-I-  .byte $00 ; <indirect ref>
  0x0392B4 $92A4: -D0-I-  .byte $00 ; <indirect ref>
  0x0392B5 $92A5: -D0-I-  .byte $00 ; <indirect ref>
  0x0392B6 $92A6: -D0-I-  .byte $00 ; <indirect ref>
  0x0392B7 $92A7: -D0-I-  .byte $0F ; <indirect ref>
  0x0392B8 $92A8: -D0-I-  .byte $94 ; <indirect ref>
  0x0392B9 $92A9: ------  .byte $00
  0x0392BA $92AA: ------  .byte $00
  0x0392BB $92AB: -D0-I-  .byte $00 ; <indirect ref>
  0x0392BC $92AC: -D0-I-  .byte $00 ; <indirect ref>
  0x0392BD $92AD: -D0-I-  .byte $00 ; <indirect ref>
  0x0392BE $92AE: -D0-I-  .byte $00 ; <indirect ref>
  0x0392BF $92AF: -D0-I-  .byte $00 ; <indirect ref>
  0x0392C0 $92B0: -D0-I-  .byte $00 ; <indirect ref>
  0x0392C1 $92B1: -D0-I-  .byte $00 ; <indirect ref>
  0x0392C2 $92B2: -D0-I-  .byte $00 ; <indirect ref>
  0x0392C3 $92B3: -D0-I-  .byte $F4 ; <indirect ref>
  0x0392C4 $92B4: -D0-I-  .byte $93 ; <indirect ref>
  0x0392C5 $92B5: -D0-I-  .byte $00 ; <indirect ref>
  0x0392C6 $92B6: -D0-I-  .byte $00 ; <indirect ref>
  0x0392C7 $92B7: -D0-I-  .byte $00 ; <indirect ref>
  0x0392C8 $92B8: -D0-I-  .byte $00 ; <indirect ref>
  0x0392C9 $92B9: -D0-I-  .byte $00 ; <indirect ref>
  0x0392CA $92BA: -D0-I-  .byte $00 ; <indirect ref>
  0x0392CB $92BB: -D0-I-  .byte $00 ; <indirect ref>
  0x0392CC $92BC: -D0-I-  .byte $00 ; <indirect ref>
  0x0392CD $92BD: -D0-I-  .byte $00 ; <indirect ref>
  0x0392CE $92BE: -D0-I-  .byte $00 ; <indirect ref>
  0x0392CF $92BF: -D0-I-  .byte $00 ; <indirect ref>
  0x0392D0 $92C0: -D0-I-  .byte $00 ; <indirect ref>
  0x0392D1 $92C1: -D0-I-  .byte $F6 ; <indirect ref>
  0x0392D2 $92C2: -D0-I-  .byte $93 ; <indirect ref>
  0x0392D3 $92C3: -D0-I-  .byte $00 ; <indirect ref>
  0x0392D4 $92C4: -D0-I-  .byte $00 ; <indirect ref>
  0x0392D5 $92C5: -D0-I-  .byte $22 ; <indirect ref>
  0x0392D6 $92C6: -D0-I-  .byte $94 ; <indirect ref>
  0x0392D7 $92C7: ------  .byte $00
  0x0392D8 $92C8: ------  .byte $00
  0x0392D9 $92C9: -D0-I-  .byte $00 ; <indirect ref>
  0x0392DA $92CA: -D0-I-  .byte $00 ; <indirect ref>
  0x0392DB $92CB: -D0-I-  .byte $00 ; <indirect ref>
  0x0392DC $92CC: -D0-I-  .byte $00 ; <indirect ref>
  0x0392DD $92CD: -D0-I-  .byte $00 ; <indirect ref>
  0x0392DE $92CE: -D0-I-  .byte $00 ; <indirect ref>
  0x0392DF $92CF: -D0-I-  .byte $F9 ; <indirect ref>
  0x0392E0 $92D0: -D0-I-  .byte $93 ; <indirect ref>
  0x0392E1 $92D1: -D0-I-  .byte $00 ; <indirect ref>
  0x0392E2 $92D2: -D0-I-  .byte $00 ; <indirect ref>
  0x0392E3 $92D3: -D0-I-  .byte $23 ; <indirect ref>
  0x0392E4 $92D4: -D0-I-  .byte $94 ; <indirect ref>
  0x0392E5 $92D5: ------  .byte $00
  0x0392E6 $92D6: ------  .byte $00
  0x0392E7 $92D7: ------  .byte $00
  0x0392E8 $92D8: ------  .byte $00
  0x0392E9 $92D9: -D0-I-  .byte $00 ; <indirect ref>
  0x0392EA $92DA: -D0-I-  .byte $00 ; <indirect ref>
  0x0392EB $92DB: -D0-I-  .byte $00 ; <indirect ref>
  0x0392EC $92DC: -D0-I-  .byte $00 ; <indirect ref>
  0x0392ED $92DD: -D0-I-  .byte $FB ; <indirect ref>
  0x0392EE $92DE: -D0-I-  .byte $93 ; <indirect ref>
  0x0392EF $92DF: -D0-I-  .byte $00 ; <indirect ref>
  0x0392F0 $92E0: -D0-I-  .byte $00 ; <indirect ref>
  0x0392F1 $92E1: -D0-I-  .byte $00 ; <indirect ref>
  0x0392F2 $92E2: -D0-I-  .byte $00 ; <indirect ref>
  0x0392F3 $92E3: ------  .byte $00
  0x0392F4 $92E4: ------  .byte $00
  0x0392F5 $92E5: ------  .byte $00
  0x0392F6 $92E6: ------  .byte $00
  0x0392F7 $92E7: -D0-I-  .byte $00 ; <indirect ref>
  0x0392F8 $92E8: -D0-I-  .byte $00 ; <indirect ref>
  0x0392F9 $92E9: -D0-I-  .byte $00 ; <indirect ref>
  0x0392FA $92EA: -D0-I-  .byte $00 ; <indirect ref>
  0x0392FB $92EB: -D0-I-  .byte $FD ; <indirect ref>
  0x0392FC $92EC: -D0-I-  .byte $93 ; <indirect ref>
  0x0392FD $92ED: -D0-I-  .byte $00 ; <indirect ref>
  0x0392FE $92EE: -D0-I-  .byte $00 ; <indirect ref>
  0x0392FF $92EF: -D0-I-  .byte $24 ; <indirect ref>
  0x039300 $92F0: -D0-I-  .byte $94 ; <indirect ref>
  0x039301 $92F1: -D0-I-  .byte $00 ; <indirect ref>
  0x039302 $92F2: -D0-I-  .byte $00 ; <indirect ref>
  0x039303 $92F3: -D0-I-  .byte $00 ; <indirect ref>
  0x039304 $92F4: -D0-I-  .byte $00 ; <indirect ref>
  0x039305 $92F5: -D0-I-  .byte $00 ; <indirect ref>
  0x039306 $92F6: -D0-I-  .byte $00 ; <indirect ref>
  0x039307 $92F7: -D0-I-  .byte $00 ; <indirect ref>
  0x039308 $92F8: -D0-I-  .byte $00 ; <indirect ref>
  0x039309 $92F9: -D0-I-  .byte $FF ; <indirect ref>
  0x03930A $92FA: -D0-I-  .byte $93 ; <indirect ref>
  0x03930B $92FB: -D0-I-  .byte $00 ; <indirect ref>
  0x03930C $92FC: -D0-I-  .byte $00 ; <indirect ref>
  0x03930D $92FD: -D0-I-  .byte $00 ; <indirect ref>
  0x03930E $92FE: -D0-I-  .byte $00 ; <indirect ref>
  0x03930F $92FF: ------  .byte $00
  0x039310 $9300: ------  .byte $00
  0x039311 $9301: -D0-I-  .byte $00 ; <indirect ref>
  0x039312 $9302: -D0-I-  .byte $00 ; <indirect ref>
  0x039313 $9303: -D0-I-  .byte $00 ; <indirect ref>
  0x039314 $9304: -D0-I-  .byte $00 ; <indirect ref>
  0x039315 $9305: -D0-I-  .byte $00 ; <indirect ref>
  0x039316 $9306: -D0-I-  .byte $00 ; <indirect ref>
  0x039317 $9307: -D0-I-  .byte $01 ; <indirect ref>
  0x039318 $9308: -D0-I-  .byte $94 ; <indirect ref>
  0x039319 $9309: -D0-I-  .byte $00 ; <indirect ref>
  0x03931A $930A: -D0-I-  .byte $00 ; <indirect ref>
  0x03931B $930B: -D0-I-  .byte $00 ; <indirect ref>
  0x03931C $930C: -D0-I-  .byte $00 ; <indirect ref>
  0x03931D $930D: ------  .byte $00
  0x03931E $930E: ------  .byte $00
  0x03931F $930F: -D0-I-  .byte $00 ; <indirect ref>
  0x039320 $9310: -D0-I-  .byte $00 ; <indirect ref>
  0x039321 $9311: -D0-I-  .byte $00 ; <indirect ref>
  0x039322 $9312: -D0-I-  .byte $00 ; <indirect ref>
  0x039323 $9313: -D0-I-  .byte $00 ; <indirect ref>
  0x039324 $9314: -D0-I-  .byte $00 ; <indirect ref>
  0x039325 $9315: -D0-I-  .byte $03 ; <indirect ref>
  0x039326 $9316: -D0-I-  .byte $94 ; <indirect ref>
  0x039327 $9317: -D0-I-  .byte $00 ; <indirect ref>
  0x039328 $9318: -D0-I-  .byte $00 ; <indirect ref>
  0x039329 $9319: -D0-I-  .byte $00 ; <indirect ref>
  0x03932A $931A: -D0-I-  .byte $00 ; <indirect ref>
  0x03932B $931B: -D0-I-  .byte $00 ; <indirect ref>
  0x03932C $931C: -D0-I-  .byte $00 ; <indirect ref>
  0x03932D $931D: -D0-I-  .byte $45 ; <indirect ref>
  0x03932E $931E: -D0-I-  .byte $94 ; <indirect ref>
  0x03932F $931F: -D0-I-  .byte $59 ; <indirect ref>
  0x039330 $9320: -D0-I-  .byte $94 ; <indirect ref>
  0x039331 $9321: ------  .byte $00
  0x039332 $9322: ------  .byte $00
  0x039333 $9323: -D0-I-  .byte $05 ; <indirect ref>
  0x039334 $9324: -D0-I-  .byte $94 ; <indirect ref>
  0x039335 $9325: -D0-I-  .byte $00 ; <indirect ref>
  0x039336 $9326: -D0-I-  .byte $00 ; <indirect ref>
  0x039337 $9327: -D0-I-  .byte $00 ; <indirect ref>
  0x039338 $9328: -D0-I-  .byte $00 ; <indirect ref>
  0x039339 $9329: ------  .byte $00
  0x03933A $932A: ------  .byte $00
  0x03933B $932B: -D0-I-  .byte $00 ; <indirect ref>
  0x03933C $932C: -D0-I-  .byte $00 ; <indirect ref>
  0x03933D $932D: -D0-I-  .byte $00 ; <indirect ref>
  0x03933E $932E: -D0-I-  .byte $00 ; <indirect ref>
  0x03933F $932F: -D0-I-  .byte $00 ; <indirect ref>
  0x039340 $9330: -D0-I-  .byte $00 ; <indirect ref>
  0x039341 $9331: -D0-I-  .byte $03 ; <indirect ref>
  0x039342 $9332: -D0-I-  .byte $00 ; <indirect ref>
  0x039343 $9333: ------  .byte $00
  0x039344 $9334: ------  .byte $00
  0x039345 $9335: ------  .byte $00
  0x039346 $9336: ------  .byte $00
  0x039347 $9337: ------  .byte $00
  0x039348 $9338: ------  .byte $00
  0x039349 $9339: ------  .byte $00
  0x03934A $933A: ------  .byte $00
  0x03934B $933B: ------  .byte $00
  0x03934C $933C: ------  .byte $00
  0x03934D $933D: ------  .byte $00
  0x03934E $933E: ------  .byte $00
  0x03934F $933F: -D0-I-  .byte $07 ; <indirect ref>
  0x039350 $9340: -D0-I-  .byte $94 ; <indirect ref>
  0x039351 $9341: -D0-I-  .byte $00 ; <indirect ref>
  0x039352 $9342: -D0-I-  .byte $00 ; <indirect ref>
  0x039353 $9343: -D0-I-  .byte $00 ; <indirect ref>
  0x039354 $9344: -D0-I-  .byte $00 ; <indirect ref>
  0x039355 $9345: -D0-I-  .byte $00 ; <indirect ref>
  0x039356 $9346: -D0-I-  .byte $00 ; <indirect ref>
  0x039357 $9347: -D0-I-  .byte $00 ; <indirect ref>
  0x039358 $9348: -D0-I-  .byte $00 ; <indirect ref>
  0x039359 $9349: -D0-I-  .byte $00 ; <indirect ref>
  0x03935A $934A: -D0-I-  .byte $00 ; <indirect ref>
  0x03935B $934B: -D0-I-  .byte $00 ; <indirect ref>
  0x03935C $934C: -D0-I-  .byte $00 ; <indirect ref>
  0x03935D $934D: -D0-I-  .byte $0C ; <indirect ref>
  0x03935E $934E: -D0-I-  .byte $3A ; <indirect ref>
  0x03935F $934F: -D0-I-  .byte $12 ; <indirect ref>
  0x039360 $9350: -D0-I-  .byte $25 ; <indirect ref>
  0x039361 $9351: -D0-I-  .byte $11 ; <indirect ref>
  0x039362 $9352: -D0-I-  .byte $48 ; <indirect ref>
  0x039363 $9353: -D0-I-  .byte $4A ; <indirect ref>
  0x039364 $9354: -D0-I-  .byte $49 ; <indirect ref>
  0x039365 $9355: -D0-I-  .byte $44 ; <indirect ref>
  0x039366 $9356: -D0-I-  .byte $1A ; <indirect ref>
  0x039367 $9357: -D0-I-  .byte $03 ; <indirect ref>
  0x039368 $9358: -D0-I-  .byte $25 ; <indirect ref>
  0x039369 $9359: -D0-I-  .byte $01 ; <indirect ref>
  0x03936A $935A: -D0-I-  .byte $3A ; <indirect ref>
  0x03936B $935B: -D0-I-  .byte $41 ; <indirect ref>
  0x03936C $935C: -D0-I-  .byte $03 ; <indirect ref>
  0x03936D $935D: -D0-I-  .byte $14 ; <indirect ref>
  0x03936E $935E: -D0-I-  .byte $19 ; <indirect ref>
  0x03936F $935F: -D0-I-  .byte $03 ; <indirect ref>
  0x039370 $9360: -D0-I-  .byte $22 ; <indirect ref>
  0x039371 $9361: -D0-I-  .byte $18 ; <indirect ref>
  0x039372 $9362: -D0-I-  .byte $25 ; <indirect ref>
  0x039373 $9363: -D0-I-  .byte $18 ; <indirect ref>
  0x039374 $9364: -D0-I-  .byte $2A ; <indirect ref>
  0x039375 $9365: -D0-I-  .byte $18 ; <indirect ref>
  0x039376 $9366: -D0-I-  .byte $29 ; <indirect ref>
  0x039377 $9367: -D0-I-  .byte $18 ; <indirect ref>
  0x039378 $9368: -D0-I-  .byte $03 ; <indirect ref>
  0x039379 $9369: -D0-I-  .byte $22 ; <indirect ref>
  0x03937A $936A: -D0-I-  .byte $17 ; <indirect ref>
  0x03937B $936B: -D0-I-  .byte $25 ; <indirect ref>
  0x03937C $936C: -D0-I-  .byte $17 ; <indirect ref>
  0x03937D $936D: -D0-I-  .byte $2A ; <indirect ref>
  0x03937E $936E: -D0-I-  .byte $17 ; <indirect ref>
  0x03937F $936F: -D0-I-  .byte $29 ; <indirect ref>
  0x039380 $9370: -D0-I-  .byte $17 ; <indirect ref>
  0x039381 $9371: -D0-I-  .byte $03 ; <indirect ref>
  0x039382 $9372: -D0-I-  .byte $3A ; <indirect ref>
  0x039383 $9373: -D0-I-  .byte $03 ; <indirect ref>
  0x039384 $9374: -D0-I-  .byte $30 ; <indirect ref>
  0x039385 $9375: -D0-I-  .byte $34 ; <indirect ref>
  0x039386 $9376: -D0-I-  .byte $3A ; <indirect ref>
  0x039387 $9377: -D0-I-  .byte $03 ; <indirect ref>
  0x039388 $9378: -D0-I-  .byte $1C ; <indirect ref>
  0x039389 $9379: -D0-I-  .byte $03 ; <indirect ref>
  0x03938A $937A: -D0-I-  .byte $4C ; <indirect ref>
  0x03938B $937B: -D0-I-  .byte $19 ; <indirect ref>
  0x03938C $937C: -D0-I-  .byte $03 ; <indirect ref>
  0x03938D $937D: -D0-I-  .byte $2C ; <indirect ref>
  0x03938E $937E: -D0-I-  .byte $3A ; <indirect ref>
  0x03938F $937F: -D0-I-  .byte $03 ; <indirect ref>
  0x039390 $9380: -D0-I-  .byte $3E ; <indirect ref>
  0x039391 $9381: -D0-I-  .byte $03 ; <indirect ref>
  0x039392 $9382: -D0-I-  .byte $72 ; <indirect ref>
  0x039393 $9383: -D0-I-  .byte $03 ; <indirect ref>
  0x039394 $9384: -D0-I-  .byte $50 ; <indirect ref>
  0x039395 $9385: -D0-I-  .byte $03 ; <indirect ref>
  0x039396 $9386: -D0-I-  .byte $0C ; <indirect ref>
  0x039397 $9387: -D0-I-  .byte $03 ; <indirect ref>
  0x039398 $9388: -D0-I-  .byte $54 ; <indirect ref>
  0x039399 $9389: -D0-I-  .byte $03 ; <indirect ref>
  0x03939A $938A: -D0-I-  .byte $88 ; <indirect ref>
  0x03939B $938B: -D0-I-  .byte $03 ; <indirect ref>
  0x03939C $938C: -D0-I-  .byte $76 ; <indirect ref>
  0x03939D $938D: -D0-I-  .byte $03 ; <indirect ref>
  0x03939E $938E: -D0-I-  .byte $58 ; <indirect ref>
  0x03939F $938F: -D0-I-  .byte $3A ; <indirect ref>
  0x0393A0 $9390: -D0-I-  .byte $03 ; <indirect ref>
  0x0393A1 $9391: -D0-I-  .byte $50 ; <indirect ref>
  0x0393A2 $9392: -D0-I-  .byte $03 ; <indirect ref>
  0x0393A3 $9393: ------  .byte $0C
  0x0393A4 $9394: ------  .byte $03
  0x0393A5 $9395: -D0-I-  .byte $4C ; <indirect ref>
  0x0393A6 $9396: -D0-I-  .byte $FF ; <indirect ref>
  0x0393A7 $9397: -D0-I-  .byte $03 ; <indirect ref>
  0x0393A8 $9398: -D0-I-  .byte $3A ; <indirect ref>
  0x0393A9 $9399: -D0-I-  .byte $03 ; <indirect ref>
  0x0393AA $939A: -D0-I-  .byte $22 ; <indirect ref>
  0x0393AB $939B: -D0-I-  .byte $FF ; <indirect ref>
  0x0393AC $939C: -D0-I-  .byte $25 ; <indirect ref>
  0x0393AD $939D: -D0-I-  .byte $FF ; <indirect ref>
  0x0393AE $939E: -D0-I-  .byte $03 ; <indirect ref>
  0x0393AF $939F: -D0-I-  .byte $22 ; <indirect ref>
  0x0393B0 $93A0: -D0-I-  .byte $FF ; <indirect ref>
  0x0393B1 $93A1: -D0-I-  .byte $25 ; <indirect ref>
  0x0393B2 $93A2: -D0-I-  .byte $FF ; <indirect ref>
  0x0393B3 $93A3: -D0-I-  .byte $03 ; <indirect ref>
  0x0393B4 $93A4: -D0-I-  .byte $1C ; <indirect ref>
  0x0393B5 $93A5: -D0-I-  .byte $03 ; <indirect ref>
  0x0393B6 $93A6: -D0-I-  .byte $3E ; <indirect ref>
  0x0393B7 $93A7: -D0-I-  .byte $03 ; <indirect ref>
  0x0393B8 $93A8: -D0-I-  .byte $2C ; <indirect ref>
  0x0393B9 $93A9: -D0-I-  .byte $3A ; <indirect ref>
  0x0393BA $93AA: -D0-I-  .byte $03 ; <indirect ref>
  0x0393BB $93AB: -D0-I-  .byte $30 ; <indirect ref>
  0x0393BC $93AC: -D0-I-  .byte $34 ; <indirect ref>
  0x0393BD $93AD: -D0-I-  .byte $3A ; <indirect ref>
  0x0393BE $93AE: -D0-I-  .byte $03 ; <indirect ref>
  0x0393BF $93AF: -D0-I-  .byte $7A ; <indirect ref>
  0x0393C0 $93B0: -D0-I-  .byte $03 ; <indirect ref>
  0x0393C1 $93B1: -D0-I-  .byte $3A ; <indirect ref>
  0x0393C2 $93B2: -D0-I-  .byte $03 ; <indirect ref>
  0x0393C3 $93B3: -D0-I-  .byte $60 ; <indirect ref>
  0x0393C4 $93B4: -D0-I-  .byte $03 ; <indirect ref>
  0x0393C5 $93B5: -D0-I-  .byte $30 ; <indirect ref>
  0x0393C6 $93B6: -D0-I-  .byte $34 ; <indirect ref>
  0x0393C7 $93B7: -D0-I-  .byte $3A ; <indirect ref>
  0x0393C8 $93B8: -D0-I-  .byte $03 ; <indirect ref>
  0x0393C9 $93B9: -D0-I-  .byte $14 ; <indirect ref>
  0x0393CA $93BA: -D0-I-  .byte $19 ; <indirect ref>
  0x0393CB $93BB: -D0-I-  .byte $03 ; <indirect ref>
  0x0393CC $93BC: ------  .byte $3A
  0x0393CD $93BD: ------  .byte $03
  0x0393CE $93BE: -D0-I-  .byte $3A ; <indirect ref>
  0x0393CF $93BF: -D0-I-  .byte $41 ; <indirect ref>
  0x0393D0 $93C0: -D0-I-  .byte $03 ; <indirect ref>
  0x0393D1 $93C1: -D0-I-  .byte $3E ; <indirect ref>
  0x0393D2 $93C2: -D0-I-  .byte $03 ; <indirect ref>
  0x0393D3 $93C3: -D0-I-  .byte $2A ; <indirect ref>
  0x0393D4 $93C4: -D0-I-  .byte $FF ; <indirect ref>
  0x0393D5 $93C5: -D0-I-  .byte $29 ; <indirect ref>
  0x0393D6 $93C6: -D0-I-  .byte $FF ; <indirect ref>
  0x0393D7 $93C7: -D0-I-  .byte $03 ; <indirect ref>
  0x0393D8 $93C8: -D0-I-  .byte $2A ; <indirect ref>
  0x0393D9 $93C9: -D0-I-  .byte $FF ; <indirect ref>
  0x0393DA $93CA: -D0-I-  .byte $29 ; <indirect ref>
  0x0393DB $93CB: ------  .byte $FF
  0x0393DC $93CC: -D0-I-  .byte $03 ; <indirect ref>
  0x0393DD $93CD: -D0-I-  .byte $4C ; <indirect ref>
  0x0393DE $93CE: -D0-I-  .byte $FF ; <indirect ref>
  0x0393DF $93CF: -D0-I-  .byte $03 ; <indirect ref>
  0x0393E0 $93D0: -D0-I-  .byte $1C ; <indirect ref>
  0x0393E1 $93D1: -D0-I-  .byte $03 ; <indirect ref>
  0x0393E2 $93D2: -D0-I-  .byte $2C ; <indirect ref>
  0x0393E3 $93D3: -D0-I-  .byte $3A ; <indirect ref>
  0x0393E4 $93D4: -D0-I-  .byte $03 ; <indirect ref>
  0x0393E5 $93D5: -D0-I-  .byte $7E ; <indirect ref>
  0x0393E6 $93D6: -D0-I-  .byte $03 ; <indirect ref>
  0x0393E7 $93D7: -D0-I-  .byte $7E ; <indirect ref>
  0x0393E8 $93D8: -D0-I-  .byte $03 ; <indirect ref>
  0x0393E9 $93D9: -D0-I-  .byte $25 ; <indirect ref>
  0x0393EA $93DA: ------  .byte $FF
  0x0393EB $93DB: -D0-I-  .byte $03 ; <indirect ref>
  0x0393EC $93DC: -D0-I-  .byte $25 ; <indirect ref>
  0x0393ED $93DD: -D0-I-  .byte $FF ; <indirect ref>
  0x0393EE $93DE: -D0-I-  .byte $03 ; <indirect ref>
  0x0393EF $93DF: -D0-I-  .byte $68 ; <indirect ref>
  0x0393F0 $93E0: -D0-I-  .byte $85 ; <indirect ref>
  0x0393F1 $93E1: -D0-I-  .byte $86 ; <indirect ref>
  0x0393F2 $93E2: -D0-I-  .byte $03 ; <indirect ref>
  0x0393F3 $93E3: -D0-I-  .byte $64 ; <indirect ref>
  0x0393F4 $93E4: -D0-I-  .byte $85 ; <indirect ref>
  0x0393F5 $93E5: -D0-I-  .byte $86 ; <indirect ref>
  0x0393F6 $93E6: -D0-I-  .byte $03 ; <indirect ref>
  0x0393F7 $93E7: -D0-I-  .byte $7A ; <indirect ref>
  0x0393F8 $93E8: -D0-I-  .byte $03 ; <indirect ref>
  0x0393F9 $93E9: -D0-I-  .byte $3A ; <indirect ref>
  0x0393FA $93EA: -D0-I-  .byte $03 ; <indirect ref>
  0x0393FB $93EB: -D0-I-  .byte $72 ; <indirect ref>
  0x0393FC $93EC: -D0-I-  .byte $03 ; <indirect ref>
  0x0393FD $93ED: -D0-I-  .byte $0C ; <indirect ref>
  0x0393FE $93EE: -D0-I-  .byte $3A ; <indirect ref>
  0x0393FF $93EF: -D0-I-  .byte $81 ; <indirect ref>
  0x039400 $93F0: -D0-I-  .byte $03 ; <indirect ref>
  0x039401 $93F1: -D0-I-  .byte $3A ; <indirect ref>
  0x039402 $93F2: -D0-I-  .byte $6C ; <indirect ref>
  0x039403 $93F3: -D0-I-  .byte $03 ; <indirect ref>
  0x039404 $93F4: -D0-I-  .byte $60 ; <indirect ref>
  0x039405 $93F5: -D0-I-  .byte $03 ; <indirect ref>
  0x039406 $93F6: -D0-I-  .byte $58 ; <indirect ref>
  0x039407 $93F7: -D0-I-  .byte $3A ; <indirect ref>
  0x039408 $93F8: -D0-I-  .byte $03 ; <indirect ref>
  0x039409 $93F9: -D0-I-  .byte $88 ; <indirect ref>
  0x03940A $93FA: -D0-I-  .byte $03 ; <indirect ref>
  0x03940B $93FB: -D0-I-  .byte $50 ; <indirect ref>
  0x03940C $93FC: -D0-I-  .byte $03 ; <indirect ref>
  0x03940D $93FD: -D0-I-  .byte $54 ; <indirect ref>
  0x03940E $93FE: -D0-I-  .byte $03 ; <indirect ref>
  0x03940F $93FF: -D0-I-  .byte $50 ; <indirect ref>
  0x039410 $9400: -D0-I-  .byte $03 ; <indirect ref>
  0x039411 $9401: -D0-I-  .byte $0C ; <indirect ref>
  0x039412 $9402: -D0-I-  .byte $03 ; <indirect ref>
  0x039413 $9403: -D0-I-  .byte $76 ; <indirect ref>
  0x039414 $9404: -D0-I-  .byte $03 ; <indirect ref>
  0x039415 $9405: -D0-I-  .byte $0C ; <indirect ref>
  0x039416 $9406: -D0-I-  .byte $03 ; <indirect ref>
  0x039417 $9407: -D0-I-  .byte $3A ; <indirect ref>
  0x039418 $9408: -D0-I-  .byte $5C ; <indirect ref>
  0x039419 $9409: -D0-I-  .byte $03 ; <indirect ref>
  0x03941A $940A: -D0-I-  .byte $01 ; <indirect ref>
  0x03941B $940B: -D0-I-  .byte $02 ; <indirect ref>
  0x03941C $940C: -D0-I-  .byte $02 ; <indirect ref>
  0x03941D $940D: ------  .byte $03
  0x03941E $940E: -D0-I-  .byte $02 ; <indirect ref>
  0x03941F $940F: -D0-I-  .byte $03 ; <indirect ref>
  0x039420 $9410: -D0-I-  .byte $01 ; <indirect ref>
  0x039421 $9411: -D0-I-  .byte $02 ; <indirect ref>
  0x039422 $9412: -D0-I-  .byte $02 ; <indirect ref>
  0x039423 $9413: -D0-I-  .byte $03 ; <indirect ref>
  0x039424 $9414: -D0-I-  .byte $02 ; <indirect ref>
  0x039425 $9415: -D0-I-  .byte $04 ; <indirect ref>
  0x039426 $9416: -D0-I-  .byte $02 ; <indirect ref>
  0x039427 $9417: -D0-I-  .byte $02 ; <indirect ref>
  0x039428 $9418: -D0-I-  .byte $06 ; <indirect ref>
  0x039429 $9419: -D0-I-  .byte $02 ; <indirect ref>
  0x03942A $941A: ------  .byte $02
  0x03942B $941B: -D0-I-  .byte $02 ; <indirect ref>
  0x03942C $941C: ------  .byte $02
  0x03942D $941D: -D0-I-  .byte $02 ; <indirect ref>
  0x03942E $941E: -D0-I-  .byte $05 ; <indirect ref>
  0x03942F $941F: -D0-I-  .byte $02 ; <indirect ref>
  0x039430 $9420: -D0-I-  .byte $02 ; <indirect ref>
  0x039431 $9421: -D0-I-  .byte $06 ; <indirect ref>
  0x039432 $9422: -D0-I-  .byte $04 ; <indirect ref>
  0x039433 $9423: -D0-I-  .byte $02 ; <indirect ref>
  0x039434 $9424: -D0-I-  .byte $03 ; <indirect ref>
  0x039435 $9425: -D0-I-  .byte $01 ; <indirect ref>
  0x039436 $9426: -D0-I-  .byte $11 ; <indirect ref>
  0x039437 $9427: -D0-I-  .byte $01 ; <indirect ref>
  0x039438 $9428: -D0-I-  .byte $01 ; <indirect ref>
  0x039439 $9429: -D0-I-  .byte $03 ; <indirect ref>
  0x03943A $942A: -D0-I-  .byte $18 ; <indirect ref>
  0x03943B $942B: -D0-I-  .byte $03 ; <indirect ref>
  0x03943C $942C: -D0-I-  .byte $17 ; <indirect ref>
  0x03943D $942D: -D0-I-  .byte $02 ; <indirect ref>
  0x03943E $942E: -D0-I-  .byte $1F ; <indirect ref>
  0x03943F $942F: -D0-I-  .byte $02 ; <indirect ref>
  0x039440 $9430: -D0-I-  .byte $1A ; <indirect ref>
  0x039441 $9431: -D0-I-  .byte $83 ; <indirect ref>
  0x039442 $9432: -D0-I-  .byte $82 ; <indirect ref>
  0x039443 $9433: -D0-I-  .byte $83 ; <indirect ref>
  0x039444 $9434: -D0-I-  .byte $84 ; <indirect ref>
  0x039445 $9435: -D0-I-  .byte $81 ; <indirect ref>
  0x039446 $9436: -D0-I-  .byte $81 ; <indirect ref>
  0x039447 $9437: -D0-I-  .byte $02 ; <indirect ref>
  0x039448 $9438: -D0-I-  .byte $18 ; <indirect ref>
  0x039449 $9439: -D0-I-  .byte $02 ; <indirect ref>
  0x03944A $943A: -D0-I-  .byte $17 ; <indirect ref>
  0x03944B $943B: -D0-I-  .byte $83 ; <indirect ref>
  0x03944C $943C: ------  .byte $83
  0x03944D $943D: -D0-I-  .byte $83 ; <indirect ref>
  0x03944E $943E: -D0-I-  .byte $02 ; <indirect ref>
  0x03944F $943F: -D0-I-  .byte $02 ; <indirect ref>
  0x039450 $9440: ------  .byte $83
  0x039451 $9441: -D0-I-  .byte $81 ; <indirect ref>
  0x039452 $9442: ------  .byte $83
  0x039453 $9443: -D0-I-  .byte $83 ; <indirect ref>
  0x039454 $9444: -D0-I-  .byte $83 ; <indirect ref>
  0x039455 $9445: -D0-I-  .byte $83 ; <indirect ref>
  0x039456 $9446: -D0-I-  .byte $01 ; <indirect ref>
  0x039457 $9447: -D0-I-  .byte $18 ; <indirect ref>
  0x039458 $9448: -D0-I-  .byte $01 ; <indirect ref>
  0x039459 $9449: -D0-I-  .byte $17 ; <indirect ref>
  0x03945A $944A: -D0-I-  .byte $84 ; <indirect ref>
  0x03945B $944B: -D0-I-  .byte $82 ; <indirect ref>
  0x03945C $944C: -D0-I-  .byte $83 ; <indirect ref>
  0x03945D $944D: ------  .byte $83
  0x03945E $944E: -D0-I-  .byte $83 ; <indirect ref>
  0x03945F $944F: -D0-I-  .byte $81 ; <indirect ref>
  0x039460 $9450: -D0-I-  .byte $82 ; <indirect ref>
  0x039461 $9451: -D0-I-  .byte $84 ; <indirect ref>
  0x039462 $9452: -D0-I-  .byte $84 ; <indirect ref>
  0x039463 $9453: ------  .byte $81
  0x039464 $9454: ------  .byte $83
  0x039465 $9455: -D0-I-  .byte $82 ; <indirect ref>
  0x039466 $9456: ------  .byte $83
  0x039467 $9457: -D0-I-  .byte $83 ; <indirect ref>
  0x039468 $9458: -D0-I-  .byte $83 ; <indirect ref>
  0x039469 $9459: -D0-I-  .byte $83 ; <indirect ref>
  0x03946A $945A: -D0-I-  .byte $01 ; <indirect ref>
  0x03946B $945B: -D0-I-  .byte $18 ; <indirect ref>
  0x03946C $945C: -D0-I-  .byte $01 ; <indirect ref>
  0x03946D $945D: -D0-I-  .byte $17 ; <indirect ref>
  0x03946E $945E: -D0-I-  .byte $81 ; <indirect ref>
  0x03946F $945F: ------  .byte $81
  0x039470 $9460: -D0---  .byte $74
  0x039471 $9461: -D0---  .byte $94
  0x039472 $9462: -D0---  .byte $00
  0x039473 $9463: -D0---  .byte $95
  0x039474 $9464: -D0---  .byte $10
  0x039475 $9465: -D0---  .byte $95
  0x039476 $9466: -D0---  .byte $2C
  0x039477 $9467: -D0---  .byte $95
  0x039478 $9468: -D0---  .byte $40
  0x039479 $9469: -D0---  .byte $95
  0x03947A $946A: -D0---  .byte $44
  0x03947B $946B: -D0---  .byte $95
  0x03947C $946C: -D0---  .byte $48
  0x03947D $946D: -D0---  .byte $95
  0x03947E $946E: -D0---  .byte $50
  0x03947F $946F: -D0---  .byte $95
  0x039480 $9470: -D0---  .byte $50
  0x039481 $9471: -D0---  .byte $95
  0x039482 $9472: -D0---  .byte $50
  0x039483 $9473: -D0---  .byte $95
  0x039484 $9474: -D0-I-  .byte $00 ; <indirect ref>
  0x039485 $9475: -D0-I-  .byte $01 ; <indirect ref>
  0x039486 $9476: -D0-I-  .byte $50 ; <indirect ref>
  0x039487 $9477: -D0-I-  .byte $00 ; <indirect ref>
  0x039488 $9478: -D0-I-  .byte $00 ; <indirect ref>
  0x039489 $9479: -D0-I-  .byte $05 ; <indirect ref>
  0x03948A $947A: -D0-I-  .byte $5A ; <indirect ref>
  0x03948B $947B: -D0-I-  .byte $00 ; <indirect ref>
  0x03948C $947C: -D0-I-  .byte $00 ; <indirect ref>
  0x03948D $947D: -D0-I-  .byte $05 ; <indirect ref>
  0x03948E $947E: -D0-I-  .byte $5A ; <indirect ref>
  0x03948F $947F: -D0-I-  .byte $00 ; <indirect ref>
  0x039490 $9480: -D0-I-  .byte $8A ; <indirect ref>
  0x039491 $9481: -D0-I-  .byte $15 ; <indirect ref>
  0x039492 $9482: -D0-I-  .byte $C8 ; <indirect ref>
  0x039493 $9483: -D0-I-  .byte $20 ; <indirect ref>
  0x039494 $9484: -D0-I-  .byte $9A ; <indirect ref>
  0x039495 $9485: -D0-I-  .byte $22 ; <indirect ref>
  0x039496 $9486: -D0-I-  .byte $40 ; <indirect ref>
  0x039497 $9487: -D0-I-  .byte $31 ; <indirect ref>
  0x039498 $9488: -D0-I-  .byte $80 ; <indirect ref>
  0x039499 $9489: -D0-I-  .byte $10 ; <indirect ref>
  0x03949A $948A: -D0-I-  .byte $C8 ; <indirect ref>
  0x03949B $948B: -D0-I-  .byte $20 ; <indirect ref>
  0x03949C $948C: -D0-I-  .byte $84 ; <indirect ref>
  0x03949D $948D: -D0-I-  .byte $16 ; <indirect ref>
  0x03949E $948E: -D0-I-  .byte $F0 ; <indirect ref>
  0x03949F $948F: -D0-I-  .byte $20 ; <indirect ref>
  0x0394A0 $9490: -D0-I-  .byte $84 ; <indirect ref>
  0x0394A1 $9491: -D0-I-  .byte $11 ; <indirect ref>
  0x0394A2 $9492: -D0-I-  .byte $C8 ; <indirect ref>
  0x0394A3 $9493: -D0-I-  .byte $00 ; <indirect ref>
  0x0394A4 $9494: -D0-I-  .byte $02 ; <indirect ref>
  0x0394A5 $9495: -D0-I-  .byte $12 ; <indirect ref>
  0x0394A6 $9496: -D0-I-  .byte $C8 ; <indirect ref>
  0x0394A7 $9497: -D0-I-  .byte $00 ; <indirect ref>
  0x0394A8 $9498: -D0-I-  .byte $85 ; <indirect ref>
  0x0394A9 $9499: -D0-I-  .byte $13 ; <indirect ref>
  0x0394AA $949A: -D0-I-  .byte $B4 ; <indirect ref>
  0x0394AB $949B: -D0-I-  .byte $10 ; <indirect ref>
  0x0394AC $949C: -D0-I-  .byte $8C ; <indirect ref>
  0x0394AD $949D: -D0-I-  .byte $23 ; <indirect ref>
  0x0394AE $949E: -D0-I-  .byte $7C ; <indirect ref>
  0x0394AF $949F: -D0-I-  .byte $21 ; <indirect ref>
  0x0394B0 $94A0: -D0-I-  .byte $85 ; <indirect ref>
  0x0394B1 $94A1: -D0-I-  .byte $1A ; <indirect ref>
  0x0394B2 $94A2: -D0-I-  .byte $C8 ; <indirect ref>
  0x0394B3 $94A3: -D0-I-  .byte $20 ; <indirect ref>
  0x0394B4 $94A4: -D0-I-  .byte $A0 ; <indirect ref>
  0x0394B5 $94A5: -D0-I-  .byte $15 ; <indirect ref>
  0x0394B6 $94A6: -D0-I-  .byte $F0 ; <indirect ref>
  0x0394B7 $94A7: -D0-I-  .byte $20 ; <indirect ref>
  0x0394B8 $94A8: -D0-I-  .byte $C0 ; <indirect ref>
  0x0394B9 $94A9: -D0-I-  .byte $22 ; <indirect ref>
  0x0394BA $94AA: -D0-I-  .byte $72 ; <indirect ref>
  0x0394BB $94AB: -D0-I-  .byte $21 ; <indirect ref>
  0x0394BC $94AC: -D0-I-  .byte $02 ; <indirect ref>
  0x0394BD $94AD: -D0-I-  .byte $11 ; <indirect ref>
  0x0394BE $94AE: -D0-I-  .byte $A0 ; <indirect ref>
  0x0394BF $94AF: -D0-I-  .byte $20 ; <indirect ref>
  0x0394C0 $94B0: -D0-I-  .byte $86 ; <indirect ref>
  0x0394C1 $94B1: -D0-I-  .byte $18 ; <indirect ref>
  0x0394C2 $94B2: -D0-I-  .byte $FA ; <indirect ref>
  0x0394C3 $94B3: -D0-I-  .byte $20 ; <indirect ref>
  0x0394C4 $94B4: -D0-I-  .byte $85 ; <indirect ref>
  0x0394C5 $94B5: -D0-I-  .byte $18 ; <indirect ref>
  0x0394C6 $94B6: -D0-I-  .byte $FA ; <indirect ref>
  0x0394C7 $94B7: -D0-I-  .byte $20 ; <indirect ref>
  0x0394C8 $94B8: -D0-I-  .byte $A8 ; <indirect ref>
  0x0394C9 $94B9: -D0-I-  .byte $2D ; <indirect ref>
  0x0394CA $94BA: -D0-I-  .byte $C8 ; <indirect ref>
  0x0394CB $94BB: -D0-I-  .byte $30 ; <indirect ref>
  0x0394CC $94BC: -D0-I-  .byte $99 ; <indirect ref>
  0x0394CD $94BD: -D0-I-  .byte $58 ; <indirect ref>
  0x0394CE $94BE: -D0-I-  .byte $90 ; <indirect ref>
  0x0394CF $94BF: -D0-I-  .byte $31 ; <indirect ref>
  0x0394D0 $94C0: -D0-I-  .byte $92 ; <indirect ref>
  0x0394D1 $94C1: -D0-I-  .byte $12 ; <indirect ref>
  0x0394D2 $94C2: -D0-I-  .byte $C8 ; <indirect ref>
  0x0394D3 $94C3: -D0-I-  .byte $00 ; <indirect ref>
  0x0394D4 $94C4: -D0-I-  .byte $86 ; <indirect ref>
  0x0394D5 $94C5: -D0-I-  .byte $13 ; <indirect ref>
  0x0394D6 $94C6: -D0-I-  .byte $00 ; <indirect ref>
  0x0394D7 $94C7: -D0-I-  .byte $00 ; <indirect ref>
  0x0394D8 $94C8: -D0-I-  .byte $8A ; <indirect ref>
  0x0394D9 $94C9: -D0-I-  .byte $13 ; <indirect ref>
  0x0394DA $94CA: -D0-I-  .byte $00 ; <indirect ref>
  0x0394DB $94CB: -D0-I-  .byte $00 ; <indirect ref>
  0x0394DC $94CC: -D0-I-  .byte $90 ; <indirect ref>
  0x0394DD $94CD: -D0-I-  .byte $16 ; <indirect ref>
  0x0394DE $94CE: -D0-I-  .byte $00 ; <indirect ref>
  0x0394DF $94CF: -D0-I-  .byte $20 ; <indirect ref>
  0x0394E0 $94D0: -D0-I-  .byte $A0 ; <indirect ref>
  0x0394E1 $94D1: -D0-I-  .byte $1A ; <indirect ref>
  0x0394E2 $94D2: -D0-I-  .byte $00 ; <indirect ref>
  0x0394E3 $94D3: -D0-I-  .byte $20 ; <indirect ref>
  0x0394E4 $94D4: -D0-I-  .byte $85 ; <indirect ref>
  0x0394E5 $94D5: -D0-I-  .byte $0E ; <indirect ref>
  0x0394E6 $94D6: -D0-I-  .byte $00 ; <indirect ref>
  0x0394E7 $94D7: -D0-I-  .byte $00 ; <indirect ref>
  0x0394E8 $94D8: -D0-I-  .byte $84 ; <indirect ref>
  0x0394E9 $94D9: -D0-I-  .byte $0E ; <indirect ref>
  0x0394EA $94DA: -D0-I-  .byte $00 ; <indirect ref>
  0x0394EB $94DB: -D0-I-  .byte $00 ; <indirect ref>
  0x0394EC $94DC: -D0-I-  .byte $F0 ; <indirect ref>
  0x0394ED $94DD: -D0-I-  .byte $0F ; <indirect ref>
  0x0394EE $94DE: -D0-I-  .byte $00 ; <indirect ref>
  0x0394EF $94DF: -D0-I-  .byte $20 ; <indirect ref>
  0x0394F0 $94E0: -D0-I-  .byte $00 ; <indirect ref>
  0x0394F1 $94E1: -D0-I-  .byte $15 ; <indirect ref>
  0x0394F2 $94E2: -D0-I-  .byte $00 ; <indirect ref>
  0x0394F3 $94E3: -D0-I-  .byte $20 ; <indirect ref>
  0x0394F4 $94E4: -D0-I-  .byte $FA ; <indirect ref>
  0x0394F5 $94E5: -D0-I-  .byte $11 ; <indirect ref>
  0x0394F6 $94E6: -D0-I-  .byte $00 ; <indirect ref>
  0x0394F7 $94E7: -D0-I-  .byte $00 ; <indirect ref>
  0x0394F8 $94E8: -D0-I-  .byte $FA ; <indirect ref>
  0x0394F9 $94E9: -D0-I-  .byte $11 ; <indirect ref>
  0x0394FA $94EA: -D0-I-  .byte $00 ; <indirect ref>
  0x0394FB $94EB: -D0-I-  .byte $00 ; <indirect ref>
  0x0394FC $94EC: -D0-I-  .byte $FA ; <indirect ref>
  0x0394FD $94ED: -D0-I-  .byte $0D ; <indirect ref>
  0x0394FE $94EE: -D0-I-  .byte $00 ; <indirect ref>
  0x0394FF $94EF: -D0-I-  .byte $00 ; <indirect ref>
  0x039500 $94F0: -D0-I-  .byte $02 ; <indirect ref>
  0x039501 $94F1: -D0-I-  .byte $12 ; <indirect ref>
  0x039502 $94F2: -D0-I-  .byte $00 ; <indirect ref>
  0x039503 $94F3: -D0-I-  .byte $20 ; <indirect ref>
  0x039504 $94F4: -D0-I-  .byte $01 ; <indirect ref>
  0x039505 $94F5: -D0-I-  .byte $11 ; <indirect ref>
  0x039506 $94F6: -D0-I-  .byte $00 ; <indirect ref>
  0x039507 $94F7: -D0-I-  .byte $20 ; <indirect ref>
  0x039508 $94F8: -D0-I-  .byte $98 ; <indirect ref>
  0x039509 $94F9: -D0-I-  .byte $21 ; <indirect ref>
  0x03950A $94FA: -D0-I-  .byte $00 ; <indirect ref>
  0x03950B $94FB: -D0-I-  .byte $20 ; <indirect ref>
  0x03950C $94FC: -D0-I-  .byte $FC ; <indirect ref>
  0x03950D $94FD: -D0-I-  .byte $14 ; <indirect ref>
  0x03950E $94FE: -D0-I-  .byte $00 ; <indirect ref>
  0x03950F $94FF: -D0-I-  .byte $20 ; <indirect ref>
  0x039510 $9500: -D0-I-  .byte $00 ; <indirect ref>
  0x039511 $9501: -D0-I-  .byte $02 ; <indirect ref>
  0x039512 $9502: -D0-I-  .byte $14 ; <indirect ref>
  0x039513 $9503: -D0-I-  .byte $00 ; <indirect ref>
  0x039514 $9504: -D0-I-  .byte $B2 ; <indirect ref>
  0x039515 $9505: -D0-I-  .byte $15 ; <indirect ref>
  0x039516 $9506: -D0-I-  .byte $28 ; <indirect ref>
  0x039517 $9507: -D0-I-  .byte $00 ; <indirect ref>
  0x039518 $9508: -D0-I-  .byte $00 ; <indirect ref>
  0x039519 $9509: -D0-I-  .byte $1A ; <indirect ref>
  0x03951A $950A: -D0-I-  .byte $28 ; <indirect ref>
  0x03951B $950B: -D0-I-  .byte $00 ; <indirect ref>
  0x03951C $950C: -D0-I-  .byte $02 ; <indirect ref>
  0x03951D $950D: -D0-I-  .byte $14 ; <indirect ref>
  0x03951E $950E: -D0-I-  .byte $00 ; <indirect ref>
  0x03951F $950F: -D0-I-  .byte $00 ; <indirect ref>
  0x039520 $9510: -D0-I-  .byte $00 ; <indirect ref>
  0x039521 $9511: -D0-I-  .byte $02 ; <indirect ref>
  0x039522 $9512: -D0-I-  .byte $28 ; <indirect ref>
  0x039523 $9513: -D0-I-  .byte $00 ; <indirect ref>
  0x039524 $9514: -D0-I-  .byte $00 ; <indirect ref>
  0x039525 $9515: -D0-I-  .byte $07 ; <indirect ref>
  0x039526 $9516: -D0-I-  .byte $5A ; <indirect ref>
  0x039527 $9517: -D0-I-  .byte $00 ; <indirect ref>
  0x039528 $9518: -D0-I-  .byte $FC ; <indirect ref>
  0x039529 $9519: -D0-I-  .byte $0D ; <indirect ref>
  0x03952A $951A: -D0-I-  .byte $3C ; <indirect ref>
  0x03952B $951B: -D0-I-  .byte $00 ; <indirect ref>
  0x03952C $951C: -D0-I-  .byte $00 ; <indirect ref>
  0x03952D $951D: -D0-I-  .byte $0C ; <indirect ref>
  0x03952E $951E: -D0-I-  .byte $00 ; <indirect ref>
  0x03952F $951F: -D0-I-  .byte $00 ; <indirect ref>
  0x039530 $9520: -D0-I-  .byte $00 ; <indirect ref>
  0x039531 $9521: -D0-I-  .byte $12 ; <indirect ref>
  0x039532 $9522: -D0-I-  .byte $00 ; <indirect ref>
  0x039533 $9523: -D0-I-  .byte $00 ; <indirect ref>
  0x039534 $9524: -D0-I-  .byte $00 ; <indirect ref>
  0x039535 $9525: -D0-I-  .byte $0B ; <indirect ref>
  0x039536 $9526: -D0-I-  .byte $00 ; <indirect ref>
  0x039537 $9527: -D0-I-  .byte $00 ; <indirect ref>
  0x039538 $9528: -D0-I-  .byte $F0 ; <indirect ref>
  0x039539 $9529: -D0-I-  .byte $0B ; <indirect ref>
  0x03953A $952A: -D0-I-  .byte $00 ; <indirect ref>
  0x03953B $952B: -D0-I-  .byte $00 ; <indirect ref>
  0x03953C $952C: -D0-I-  .byte $00 ; <indirect ref>
  0x03953D $952D: -D0-I-  .byte $0C ; <indirect ref>
  0x03953E $952E: -D0-I-  .byte $3C ; <indirect ref>
  0x03953F $952F: -D0-I-  .byte $18 ; <indirect ref>
  0x039540 $9530: -D0-I-  .byte $00 ; <indirect ref>
  0x039541 $9531: -D0-I-  .byte $20 ; <indirect ref>
  0x039542 $9532: -D0-I-  .byte $78 ; <indirect ref>
  0x039543 $9533: -D0-I-  .byte $38 ; <indirect ref>
  0x039544 $9534: -D0-I-  .byte $00 ; <indirect ref>
  0x039545 $9535: -D0-I-  .byte $10 ; <indirect ref>
  0x039546 $9536: -D0-I-  .byte $50 ; <indirect ref>
  0x039547 $9537: -D0-I-  .byte $20 ; <indirect ref>
  0x039548 $9538: -D0-I-  .byte $00 ; <indirect ref>
  0x039549 $9539: -D0-I-  .byte $11 ; <indirect ref>
  0x03954A $953A: -D0-I-  .byte $50 ; <indirect ref>
  0x03954B $953B: -D0-I-  .byte $20 ; <indirect ref>
  0x03954C $953C: -D0-I-  .byte $00 ; <indirect ref>
  0x03954D $953D: -D0-I-  .byte $12 ; <indirect ref>
  0x03954E $953E: -D0-I-  .byte $00 ; <indirect ref>
  0x03954F $953F: -D0-I-  .byte $30 ; <indirect ref>
  0x039550 $9540: -D0-I-  .byte $00 ; <indirect ref>
  0x039551 $9541: -D0-I-  .byte $00 ; <indirect ref>
  0x039552 $9542: -D0-I-  .byte $0A ; <indirect ref>
  0x039553 $9543: -D0-I-  .byte $00 ; <indirect ref>
  0x039554 $9544: -D0-I-  .byte $00 ; <indirect ref>
  0x039555 $9545: -D0-I-  .byte $09 ; <indirect ref>
  0x039556 $9546: -D0-I-  .byte $28 ; <indirect ref>
  0x039557 $9547: -D0-I-  .byte $00 ; <indirect ref>
  0x039558 $9548: -D0-I-  .byte $00 ; <indirect ref>
  0x039559 $9549: -D0-I-  .byte $07 ; <indirect ref>
  0x03955A $954A: -D0-I-  .byte $50 ; <indirect ref>
  0x03955B $954B: -D0-I-  .byte $00 ; <indirect ref>
  0x03955C $954C: -D0-I-  .byte $FC ; <indirect ref>
  0x03955D $954D: -D0-I-  .byte $0E ; <indirect ref>
  0x03955E $954E: -D0-I-  .byte $00 ; <indirect ref>
  0x03955F $954F: -D0-I-  .byte $00 ; <indirect ref>
  0x039560 $9550: -D0-I-  .byte $00 ; <indirect ref>
  0x039561 $9551: -D0-I-  .byte $00 ; <indirect ref>
  0x039562 $9552: -D0-I-  .byte $00 ; <indirect ref>
  0x039563 $9553: -D0-I-  .byte $00 ; <indirect ref>
  0x039564 $9554: -D0---  .byte $5E
  0x039565 $9555: -D0---  .byte $95
  0x039566 $9556: -D0---  .byte $6E
  0x039567 $9557: -D0---  .byte $95
  0x039568 $9558: -D0---  .byte $86
  0x039569 $9559: -D0---  .byte $95
  0x03956A $955A: -D0---  .byte $8E
  0x03956B $955B: -D0---  .byte $95
  0x03956C $955C: -D0---  .byte $96
  0x03956D $955D: -D0---  .byte $95
  0x03956E $955E: -D0-I-  .byte $00 ; <indirect ref>
  0x03956F $955F: -D0-I-  .byte $01 ; <indirect ref>
  0x039570 $9560: -D0-I-  .byte $46 ; <indirect ref>
  0x039571 $9561: -D0-I-  .byte $00 ; <indirect ref>
  0x039572 $9562: -D0-I-  .byte $00 ; <indirect ref>
  0x039573 $9563: -D0-I-  .byte $82 ; <indirect ref>
  0x039574 $9564: -D0-I-  .byte $90 ; <indirect ref>
  0x039575 $9565: -D0-I-  .byte $01 ; <indirect ref>
  0x039576 $9566: -D0-I-  .byte $00 ; <indirect ref>
  0x039577 $9567: -D0-I-  .byte $1C ; <indirect ref>
  0x039578 $9568: -D0-I-  .byte $B4 ; <indirect ref>
  0x039579 $9569: -D0-I-  .byte $00 ; <indirect ref>
  0x03957A $956A: -D0-I-  .byte $00 ; <indirect ref>
  0x03957B $956B: -D0-I-  .byte $19 ; <indirect ref>
  0x03957C $956C: -D0-I-  .byte $B4 ; <indirect ref>
  0x03957D $956D: -D0-I-  .byte $00 ; <indirect ref>
  0x03957E $956E: -D0-I-  .byte $00 ; <indirect ref>
  0x03957F $956F: -D0-I-  .byte $00 ; <indirect ref>
  0x039580 $9570: -D0-I-  .byte $3C ; <indirect ref>
  0x039581 $9571: -D0-I-  .byte $00 ; <indirect ref>
  0x039582 $9572: -D0-I-  .byte $98 ; <indirect ref>
  0x039583 $9573: -D0-I-  .byte $23 ; <indirect ref>
  0x039584 $9574: -D0-I-  .byte $C8 ; <indirect ref>
  0x039585 $9575: -D0-I-  .byte $00 ; <indirect ref>
  0x039586 $9576: -D0-I-  .byte $A0 ; <indirect ref>
  0x039587 $9577: -D0-I-  .byte $1C ; <indirect ref>
  0x039588 $9578: -D0-I-  .byte $C8 ; <indirect ref>
  0x039589 $9579: -D0-I-  .byte $00 ; <indirect ref>
  0x03958A $957A: -D0-I-  .byte $FC ; <indirect ref>
  0x03958B $957B: -D0-I-  .byte $19 ; <indirect ref>
  0x03958C $957C: -D0-I-  .byte $C8 ; <indirect ref>
  0x03958D $957D: -D0-I-  .byte $00 ; <indirect ref>
  0x03958E $957E: -D0-I-  .byte $FC ; <indirect ref>
  0x03958F $957F: -D0-I-  .byte $1D ; <indirect ref>
  0x039590 $9580: -D0-I-  .byte $B4 ; <indirect ref>
  0x039591 $9581: -D0-I-  .byte $00 ; <indirect ref>
  0x039592 $9582: -D0-I-  .byte $FC ; <indirect ref>
  0x039593 $9583: -D0-I-  .byte $06 ; <indirect ref>
  0x039594 $9584: -D0-I-  .byte $00 ; <indirect ref>
  0x039595 $9585: -D0-I-  .byte $00 ; <indirect ref>
  0x039596 $9586: -D0-I-  .byte $00 ; <indirect ref>
  0x039597 $9587: -D0-I-  .byte $00 ; <indirect ref>
  0x039598 $9588: -D0-I-  .byte $32 ; <indirect ref>
  0x039599 $9589: -D0-I-  .byte $00 ; <indirect ref>
  0x03959A $958A: -D0-I-  .byte $00 ; <indirect ref>
  0x03959B $958B: -D0-I-  .byte $27 ; <indirect ref>
  0x03959C $958C: -D0-I-  .byte $B4 ; <indirect ref>
  0x03959D $958D: -D0-I-  .byte $00 ; <indirect ref>
  0x03959E $958E: -D0-I-  .byte $00 ; <indirect ref>
  0x03959F $958F: -D0-I-  .byte $04 ; <indirect ref>
  0x0395A0 $9590: -D0-I-  .byte $50 ; <indirect ref>
  0x0395A1 $9591: -D0-I-  .byte $00 ; <indirect ref>
  0x0395A2 $9592: -D0-I-  .byte $FC ; <indirect ref>
  0x0395A3 $9593: -D0-I-  .byte $08 ; <indirect ref>
  0x0395A4 $9594: -D0-I-  .byte $00 ; <indirect ref>
  0x0395A5 $9595: -D0-I-  .byte $00 ; <indirect ref>
  0x0395A6 $9596: -D0-I-  .byte $00 ; <indirect ref>
  0x0395A7 $9597: -D0-I-  .byte $06 ; <indirect ref>
  0x0395A8 $9598: -D0-I-  .byte $3C ; <indirect ref>
  0x0395A9 $9599: -D0-I-  .byte $00 ; <indirect ref>
  0x0395AA $959A: -D0-I-  .byte $FC ; <indirect ref>
  0x0395AB $959B: -D0-I-  .byte $0C ; <indirect ref>
  0x0395AC $959C: -D0-I-  .byte $00 ; <indirect ref>
  0x0395AD $959D: -D0-I-  .byte $00 ; <indirect ref>
  0x0395AE $959E: -D0---  .byte $B2
  0x0395AF $959F: -D0---  .byte $95
  0x0395B0 $95A0: -D0---  .byte $C2
  0x0395B1 $95A1: -D0---  .byte $95
  0x0395B2 $95A2: -D0---  .byte $C6
  0x0395B3 $95A3: -D0---  .byte $95
  0x0395B4 $95A4: -D0---  .byte $CA
  0x0395B5 $95A5: -D0---  .byte $95
  0x0395B6 $95A6: ------  .byte $CE
  0x0395B7 $95A7: ------  .byte $95
  0x0395B8 $95A8: -D0---  .byte $CE
  0x0395B9 $95A9: -D0---  .byte $95
  0x0395BA $95AA: -D0---  .byte $D2
  0x0395BB $95AB: -D0---  .byte $95
  0x0395BC $95AC: -D0---  .byte $C2
  0x0395BD $95AD: -D0---  .byte $95
  0x0395BE $95AE: -D0---  .byte $C2
  0x0395BF $95AF: -D0---  .byte $95
  0x0395C0 $95B0: -D0---  .byte $C2
  0x0395C1 $95B1: -D0---  .byte $95
  0x0395C2 $95B2: -D0-I-  .byte $00 ; <indirect ref>
  0x0395C3 $95B3: -D0-I-  .byte $08 ; <indirect ref>
  0x0395C4 $95B4: -D0-I-  .byte $14 ; <indirect ref>
  0x0395C5 $95B5: -D0-I-  .byte $00 ; <indirect ref>
  0x0395C6 $95B6: -D0-I-  .byte $00 ; <indirect ref>
  0x0395C7 $95B7: -D0-I-  .byte $1B ; <indirect ref>
  0x0395C8 $95B8: -D0-I-  .byte $00 ; <indirect ref>
  0x0395C9 $95B9: -D0-I-  .byte $00 ; <indirect ref>
  0x0395CA $95BA: -D0-I-  .byte $00 ; <indirect ref>
  0x0395CB $95BB: -D0-I-  .byte $1C ; <indirect ref>
  0x0395CC $95BC: -D0-I-  .byte $00 ; <indirect ref>
  0x0395CD $95BD: -D0-I-  .byte $00 ; <indirect ref>
  0x0395CE $95BE: -D0-I-  .byte $00 ; <indirect ref>
  0x0395CF $95BF: -D0-I-  .byte $25 ; <indirect ref>
  0x0395D0 $95C0: -D0-I-  .byte $00 ; <indirect ref>
  0x0395D1 $95C1: -D0-I-  .byte $00 ; <indirect ref>
  0x0395D2 $95C2: -D0-I-  .byte $00 ; <indirect ref>
  0x0395D3 $95C3: -D0-I-  .byte $0B ; <indirect ref>
  0x0395D4 $95C4: -D0-I-  .byte $28 ; <indirect ref>
  0x0395D5 $95C5: -D0-I-  .byte $00 ; <indirect ref>
  0x0395D6 $95C6: -D0-I-  .byte $00 ; <indirect ref>
  0x0395D7 $95C7: -D0-I-  .byte $20 ; <indirect ref>
  0x0395D8 $95C8: -D0-I-  .byte $C8 ; <indirect ref>
  0x0395D9 $95C9: -D0-I-  .byte $00 ; <indirect ref>
  0x0395DA $95CA: -D0-I-  .byte $88 ; <indirect ref>
  0x0395DB $95CB: -D0-I-  .byte $08 ; <indirect ref>
  0x0395DC $95CC: -D0-I-  .byte $46 ; <indirect ref>
  0x0395DD $95CD: -D0-I-  .byte $00 ; <indirect ref>
  0x0395DE $95CE: -D0-I-  .byte $98 ; <indirect ref>
  0x0395DF $95CF: -D0-I-  .byte $00 ; <indirect ref>
  0x0395E0 $95D0: -D0-I-  .byte $32 ; <indirect ref>
  0x0395E1 $95D1: -D0-I-  .byte $00 ; <indirect ref>
  0x0395E2 $95D2: -D0-I-  .byte $98 ; <indirect ref>
  0x0395E3 $95D3: -D0-I-  .byte $00 ; <indirect ref>
  0x0395E4 $95D4: -D0-I-  .byte $32 ; <indirect ref>
  0x0395E5 $95D5: -D0-I-  .byte $00 ; <indirect ref>
  0x0395E6 $95D6: ------  .byte $00
  0x0395E7 $95D7: ------  .byte $00
  0x0395E8 $95D8: ------  .byte $08
  0x0395E9 $95D9: ------  .byte $08
  0x0395EA $95DA: -D0-I-  .byte $01 ; <indirect ref>
  0x0395EB $95DB: -D0-I-  .byte $03 ; <indirect ref>
  0x0395EC $95DC: -D0-I-  .byte $50 ; <indirect ref>
  0x0395ED $95DD: -D0-I-  .byte $26 ; <indirect ref>
  0x0395EE $95DE: -D0-I-  .byte $00 ; <indirect ref>
  0x0395EF $95DF: -D0-I-  .byte $02 ; <indirect ref>
  0x0395F0 $95E0: ------  .byte $00
  0x0395F1 $95E1: ------  .byte $00
  0x0395F2 $95E2: -D0-I-  .byte $00 ; <indirect ref>
  0x0395F3 $95E3: -D0-I-  .byte $00 ; <indirect ref>
  0x0395F4 $95E4: -D0-I-  .byte $18 ; <indirect ref>
  0x0395F5 $95E5: -D0-I-  .byte $04 ; <indirect ref>
  0x0395F6 $95E6: -D0-I-  .byte $0B ; <indirect ref>
  0x0395F7 $95E7: -D0-I-  .byte $00 ; <indirect ref>
  0x0395F8 $95E8: -D0-I-  .byte $18 ; <indirect ref>
  0x0395F9 $95E9: -D0-I-  .byte $04 ; <indirect ref>
  0x0395FA $95EA: -D0-I-  .byte $08 ; <indirect ref>
  0x0395FB $95EB: -D0-I-  .byte $01 ; <indirect ref>
  0x0395FC $95EC: -D0-I-  .byte $10 ; <indirect ref>
  0x0395FD $95ED: -D0-I-  .byte $02 ; <indirect ref>
  0x0395FE $95EE: -D0-I-  .byte $09 ; <indirect ref>
  0x0395FF $95EF: -D0-I-  .byte $01 ; <indirect ref>
  0x039600 $95F0: -D0-I-  .byte $0E ; <indirect ref>
  0x039601 $95F1: -D0-I-  .byte $02 ; <indirect ref>
  0x039602 $95F2: -D0-I-  .byte $00 ; <indirect ref>
  0x039603 $95F3: -D0-I-  .byte $00 ; <indirect ref>
  0x039604 $95F4: -D0-I-  .byte $20 ; <indirect ref>
  0x039605 $95F5: -D0-I-  .byte $00 ; <indirect ref>
  0x039606 $95F6: -D0-I-  .byte $06 ; <indirect ref>
  0x039607 $95F7: -D0-I-  .byte $04 ; <indirect ref>
  0x039608 $95F8: -D0-I-  .byte $28 ; <indirect ref>
  0x039609 $95F9: -D0-I-  .byte $00 ; <indirect ref>
  0x03960A $95FA: -D0-I-  .byte $07 ; <indirect ref>
  0x03960B $95FB: -D0-I-  .byte $04 ; <indirect ref>
  0x03960C $95FC: -D0-I-  .byte $38 ; <indirect ref>
  0x03960D $95FD: -D0-I-  .byte $00 ; <indirect ref>
  0x03960E $95FE: -D0-I-  .byte $04 ; <indirect ref>
  0x03960F $95FF: -D0-I-  .byte $06 ; <indirect ref>
  0x039610 $9600: -D0-I-  .byte $18 ; <indirect ref>
  0x039611 $9601: -D0-I-  .byte $00 ; <indirect ref>
  0x039612 $9602: -D0-I-  .byte $05 ; <indirect ref>
  0x039613 $9603: -D0-I-  .byte $07 ; <indirect ref>
  0x039614 $9604: -D0-I-  .byte $18 ; <indirect ref>
  0x039615 $9605: -D0-I-  .byte $00 ; <indirect ref>
  0x039616 $9606: -D0-I-  .byte $0A ; <indirect ref>
  0x039617 $9607: -D0-I-  .byte $08 ; <indirect ref>
  0x039618 $9608: -D0-I-  .byte $18 ; <indirect ref>
  0x039619 $9609: -D0-I-  .byte $02 ; <indirect ref>
  0x03961A $960A: -D0-I-  .byte $0B ; <indirect ref>
  0x03961B $960B: -D0-I-  .byte $00 ; <indirect ref>
  0x03961C $960C: -D0-I-  .byte $10 ; <indirect ref>
  0x03961D $960D: -D0-I-  .byte $02 ; <indirect ref>
  0x03961E $960E: -D0-I-  .byte $00 ; <indirect ref>
  0x03961F $960F: -D0-I-  .byte $00 ; <indirect ref>
  0x039620 $9610: -D0-I-  .byte $10 ; <indirect ref>
  0x039621 $9611: -D0-I-  .byte $02 ; <indirect ref>
  0x039622 $9612: -D0-I-  .byte $01 ; <indirect ref>
  0x039623 $9613: -D0-I-  .byte $00 ; <indirect ref>
  0x039624 $9614: ------  .byte $00
  0x039625 $9615: ------  .byte $00
  0x039626 $9616: -D0-I-  .byte $0C ; <indirect ref>
  0x039627 $9617: -D0-I-  .byte $00 ; <indirect ref>
  0x039628 $9618: -D0-I-  .byte $08 ; <indirect ref>
  0x039629 $9619: -D0-I-  .byte $03 ; <indirect ref>
  0x03962A $961A: -D0-I-  .byte $02 ; <indirect ref>
  0x03962B $961B: -D0-I-  .byte $03 ; <indirect ref>
  0x03962C $961C: -D0-I-  .byte $20 ; <indirect ref>
  0x03962D $961D: -D0-I-  .byte $08 ; <indirect ref>
  0x03962E $961E: -D0-I-  .byte $0D ; <indirect ref>
  0x03962F $961F: -D0-I-  .byte $01 ; <indirect ref>
  0x039630 $9620: -D0-I-  .byte $14 ; <indirect ref>
  0x039631 $9621: -D0-I-  .byte $00 ; <indirect ref>
  0x039632 $9622: -D0-I-  .byte $05 ; <indirect ref>
  0x039633 $9623: -D0-I-  .byte $05 ; <indirect ref>
  0x039634 $9624: -D0-I-  .byte $08 ; <indirect ref>
  0x039635 $9625: -D0-I-  .byte $00 ; <indirect ref>
  0x039636 $9626: -D0-I-  .byte $0E ; <indirect ref>
  0x039637 $9627: -D0-I-  .byte $08 ; <indirect ref>
  0x039638 $9628: -D0-I-  .byte $18 ; <indirect ref>
  0x039639 $9629: -D0-I-  .byte $04 ; <indirect ref>
  0x03963A $962A: -D0-I-  .byte $03 ; <indirect ref>
  0x03963B $962B: -D0-I-  .byte $02 ; <indirect ref>
  0x03963C $962C: -D0-I-  .byte $20 ; <indirect ref>
  0x03963D $962D: -D0-I-  .byte $04 ; <indirect ref>
  0x03963E $962E: -D0-I-  .byte $04 ; <indirect ref>
  0x03963F $962F: -D0-I-  .byte $06 ; <indirect ref>
  0x039640 $9630: -D0-I-  .byte $18 ; <indirect ref>
  0x039641 $9631: -D0-I-  .byte $02 ; <indirect ref>
  0x039642 $9632: -D0-I-  .byte $0F ; <indirect ref>
  0x039643 $9633: -D0-I-  .byte $07 ; <indirect ref>
  0x039644 $9634: -D0-I-  .byte $16 ; <indirect ref>
  0x039645 $9635: -D0-I-  .byte $02 ; <indirect ref>
  0x039646 $9636: -D0-I-  .byte $0F ; <indirect ref>
  0x039647 $9637: -D0-I-  .byte $07 ; <indirect ref>
  0x039648 $9638: -D0-I-  .byte $18 ; <indirect ref>
  0x039649 $9639: -D0-I-  .byte $02 ; <indirect ref>
  0x03964A $963A: -D0-I-  .byte $10 ; <indirect ref>
  0x03964B $963B: -D0-I-  .byte $02 ; <indirect ref>
  0x03964C $963C: -D0-I-  .byte $10 ; <indirect ref>
  0x03964D $963D: -D0-I-  .byte $02 ; <indirect ref>
  0x03964E $963E: -D0-I-  .byte $11 ; <indirect ref>
  0x03964F $963F: -D0-I-  .byte $01 ; <indirect ref>
  0x039650 $9640: -D0-I-  .byte $40 ; <indirect ref>
  0x039651 $9641: -D0-I-  .byte $10 ; <indirect ref>
  0x039652 $9642: -D0-I-  .byte $12 ; <indirect ref>
  0x039653 $9643: -D0-I-  .byte $09 ; <indirect ref>
  0x039654 $9644: -D0-I-  .byte $20 ; <indirect ref>
  0x039655 $9645: -D0-I-  .byte $02 ; <indirect ref>
  0x039656 $9646: -D0-I-  .byte $13 ; <indirect ref>
  0x039657 $9647: -D0-I-  .byte $00 ; <indirect ref>
  0x039658 $9648: -D0-I-  .byte $20 ; <indirect ref>
  0x039659 $9649: -D0-I-  .byte $02 ; <indirect ref>
  0x03965A $964A: -D0-I-  .byte $14 ; <indirect ref>
  0x03965B $964B: -D0-I-  .byte $09 ; <indirect ref>
  0x03965C $964C: -D0-I-  .byte $28 ; <indirect ref>
  0x03965D $964D: -D0-I-  .byte $02 ; <indirect ref>
  0x03965E $964E: -D0-I-  .byte $15 ; <indirect ref>
  0x03965F $964F: -D0-I-  .byte $00 ; <indirect ref>
  0x039660 $9650: -D0-I-  .byte $18 ; <indirect ref>
  0x039661 $9651: -D0-I-  .byte $02 ; <indirect ref>
  0x039662 $9652: -D0-I-  .byte $16 ; <indirect ref>
  0x039663 $9653: -D0-I-  .byte $00 ; <indirect ref>
  0x039664 $9654: -D0-I-  .byte $08 ; <indirect ref>
  0x039665 $9655: -D0-I-  .byte $00 ; <indirect ref>
  0x039666 $9656: -D0-I-  .byte $17 ; <indirect ref>
  0x039667 $9657: -D0-I-  .byte $03 ; <indirect ref>
  0x039668 $9658: -D0-I-  .byte $18 ; <indirect ref>
  0x039669 $9659: -D0-I-  .byte $00 ; <indirect ref>
  0x03966A $965A: -D0-I-  .byte $03 ; <indirect ref>
  0x03966B $965B: -D0-I-  .byte $00 ; <indirect ref>
  0x03966C $965C: ------  .byte $00
  0x03966D $965D: ------  .byte $00
  0x03966E $965E: -D0-I-  .byte $02 ; <indirect ref>
  0x03966F $965F: -D0-I-  .byte $00 ; <indirect ref>
  0x039670 $9660: ------  .byte $00
  0x039671 $9661: ------  .byte $00
  0x039672 $9662: -D0-I-  .byte $1C ; <indirect ref>
  0x039673 $9663: -D0-I-  .byte $06 ; <indirect ref>
  0x039674 $9664: -D0-I-  .byte $00 ; <indirect ref>
  0x039675 $9665: -D0-I-  .byte $02 ; <indirect ref>
  0x039676 $9666: -D0-I-  .byte $08 ; <indirect ref>
  0x039677 $9667: -D0-I-  .byte $03 ; <indirect ref>
  0x039678 $9668: ------  .byte $03
  0x039679 $9669: -D0-I-  .byte $01 ; <indirect ref>
  0x03967A $966A: -D0-I-  .byte $01 ; <indirect ref>
  0x03967B $966B: ------  .byte $01
  0x03967C $966C: -D0-I-  .byte $02 ; <indirect ref>
  0x03967D $966D: ------  .byte $00
  0x03967E $966E: -D0-I-  .byte $1D ; <indirect ref>
  0x03967F $966F: -D0-I-  .byte $06 ; <indirect ref>
  0x039680 $9670: -D0-I-  .byte $00 ; <indirect ref>
  0x039681 $9671: -D0-I-  .byte $00 ; <indirect ref>
  0x039682 $9672: -D0-I-  .byte $00 ; <indirect ref>
  0x039683 $9673: -D0-I-  .byte $02 ; <indirect ref>
  0x039684 $9674: ------  .byte $04
  0x039685 $9675: -D0-I-  .byte $01 ; <indirect ref>
  0x039686 $9676: -D0-I-  .byte $01 ; <indirect ref>
  0x039687 $9677: -D0-I-  .byte $01 ; <indirect ref>
  0x039688 $9678: -D0-I-  .byte $01 ; <indirect ref>
  0x039689 $9679: ------  .byte $00
  0x03968A $967A: -D0-I-  .byte $20 ; <indirect ref>
  0x03968B $967B: -D0-I-  .byte $0A ; <indirect ref>
  0x03968C $967C: -D0-I-  .byte $00 ; <indirect ref>
  0x03968D $967D: -D0-I-  .byte $20 ; <indirect ref>
  0x03968E $967E: -D0-I-  .byte $02 ; <indirect ref>
  0x03968F $967F: -D0-I-  .byte $03 ; <indirect ref>
  0x039690 $9680: ------  .byte $03
  0x039691 $9681: -D0-I-  .byte $01 ; <indirect ref>
  0x039692 $9682: -D0-I-  .byte $01 ; <indirect ref>
  0x039693 $9683: ------  .byte $01
  0x039694 $9684: -D0-I-  .byte $00 ; <indirect ref>
  0x039695 $9685: ------  .byte $00
  0x039696 $9686: -D0-I-  .byte $06 ; <indirect ref>
  0x039697 $9687: -D0-I-  .byte $00 ; <indirect ref>
  0x039698 $9688: ------  .byte $00
  0x039699 $9689: ------  .byte $00
  0x03969A $968A: -D0-I-  .byte $03 ; <indirect ref>
  0x03969B $968B: -D0-I-  .byte $03 ; <indirect ref>
  0x03969C $968C: -D0-I-  .byte $00 ; <indirect ref>
  0x03969D $968D: ------  .byte $00
  0x03969E $968E: ------  .byte $00
  0x03969F $968F: ------  .byte $00
  0x0396A0 $9690: ------  .byte $00
  0x0396A1 $9691: ------  .byte $00
  0x0396A2 $9692: -D0-I-  .byte $23 ; <indirect ref>
  0x0396A3 $9693: -D0-I-  .byte $00 ; <indirect ref>
  0x0396A4 $9694: -D0-I-  .byte $00 ; <indirect ref>
  0x0396A5 $9695: -D0-I-  .byte $20 ; <indirect ref>
  0x0396A6 $9696: -D0-I-  .byte $00 ; <indirect ref>
  0x0396A7 $9697: -D0-I-  .byte $03 ; <indirect ref>
  0x0396A8 $9698: ------  .byte $03
  0x0396A9 $9699: ------  .byte $01
  0x0396AA $969A: ------  .byte $01
  0x0396AB $969B: ------  .byte $01
  0x0396AC $969C: -D0-I-  .byte $03 ; <indirect ref>
  0x0396AD $969D: ------  .byte $00
  0x0396AE $969E: -D0-I-  .byte $24 ; <indirect ref>
  0x0396AF $969F: -D0-I-  .byte $00 ; <indirect ref>
  0x0396B0 $96A0: -D0-I-  .byte $00 ; <indirect ref>
  0x0396B1 $96A1: -D0-I-  .byte $28 ; <indirect ref>
  0x0396B2 $96A2: -D0-I-  .byte $06 ; <indirect ref>
  0x0396B3 $96A3: -D0-I-  .byte $00 ; <indirect ref>
  0x0396B4 $96A4: ------  .byte $03
  0x0396B5 $96A5: -D0-I-  .byte $01 ; <indirect ref>
  0x0396B6 $96A6: -D0-I-  .byte $01 ; <indirect ref>
  0x0396B7 $96A7: ------  .byte $01
  0x0396B8 $96A8: -D0-I-  .byte $01 ; <indirect ref>
  0x0396B9 $96A9: ------  .byte $00
  0x0396BA $96AA: -D0-I-  .byte $27 ; <indirect ref>
  0x0396BB $96AB: -D0-I-  .byte $00 ; <indirect ref>
  0x0396BC $96AC: -D0-I-  .byte $00 ; <indirect ref>
  0x0396BD $96AD: -D0-I-  .byte $20 ; <indirect ref>
  0x0396BE $96AE: -D0-I-  .byte $04 ; <indirect ref>
  0x0396BF $96AF: -D0-I-  .byte $02 ; <indirect ref>
  0x0396C0 $96B0: ------  .byte $00
  0x0396C1 $96B1: -D0-I-  .byte $01 ; <indirect ref>
  0x0396C2 $96B2: ------  .byte $01
  0x0396C3 $96B3: ------  .byte $01
  0x0396C4 $96B4: -D0-I-  .byte $04 ; <indirect ref>
  0x0396C5 $96B5: ------  .byte $00
  0x0396C6 $96B6: -D0-I-  .byte $28 ; <indirect ref>
  0x0396C7 $96B7: -D0-I-  .byte $0B ; <indirect ref>
  0x0396C8 $96B8: -D0-I-  .byte $F0 ; <indirect ref>
  0x0396C9 $96B9: -D0-I-  .byte $02 ; <indirect ref>
  0x0396CA $96BA: -D0-I-  .byte $08 ; <indirect ref>
  0x0396CB $96BB: -D0-I-  .byte $03 ; <indirect ref>
  0x0396CC $96BC: -D0-I-  .byte $05 ; <indirect ref>
  0x0396CD $96BD: -D0-I-  .byte $00 ; <indirect ref>
  0x0396CE $96BE: ------  .byte $02
  0x0396CF $96BF: -D0-I-  .byte $02 ; <indirect ref>
  0x0396D0 $96C0: -D0-I-  .byte $01 ; <indirect ref>
  0x0396D1 $96C1: ------  .byte $00
  0x0396D2 $96C2: -D0-I-  .byte $2B ; <indirect ref>
  0x0396D3 $96C3: -D0-I-  .byte $0A ; <indirect ref>
  0x0396D4 $96C4: -D0-I-  .byte $00 ; <indirect ref>
  0x0396D5 $96C5: -D0-I-  .byte $30 ; <indirect ref>
  0x0396D6 $96C6: -D0-I-  .byte $07 ; <indirect ref>
  0x0396D7 $96C7: -D0-I-  .byte $03 ; <indirect ref>
  0x0396D8 $96C8: -D0-I-  .byte $03 ; <indirect ref>
  0x0396D9 $96C9: -D0-I-  .byte $01 ; <indirect ref>
  0x0396DA $96CA: ------  .byte $01
  0x0396DB $96CB: -D0-I-  .byte $01 ; <indirect ref>
  0x0396DC $96CC: -D0-I-  .byte $06 ; <indirect ref>
  0x0396DD $96CD: ------  .byte $00
  0x0396DE $96CE: -D0-I-  .byte $2C ; <indirect ref>
  0x0396DF $96CF: -D0-I-  .byte $00 ; <indirect ref>
  0x0396E0 $96D0: -D0-I-  .byte $00 ; <indirect ref>
  0x0396E1 $96D1: -D0-I-  .byte $02 ; <indirect ref>
  0x0396E2 $96D2: -D0-I-  .byte $09 ; <indirect ref>
  0x0396E3 $96D3: -D0-I-  .byte $02 ; <indirect ref>
  0x0396E4 $96D4: -D0-I-  .byte $03 ; <indirect ref>
  0x0396E5 $96D5: -D0-I-  .byte $00 ; <indirect ref>
  0x0396E6 $96D6: ------  .byte $00
  0x0396E7 $96D7: -D0-I-  .byte $00 ; <indirect ref>
  0x0396E8 $96D8: -D0-I-  .byte $07 ; <indirect ref>
  0x0396E9 $96D9: ------  .byte $00
  0x0396EA $96DA: -D0-I-  .byte $2D ; <indirect ref>
  0x0396EB $96DB: -D0-I-  .byte $0B ; <indirect ref>
  0x0396EC $96DC: -D0-I-  .byte $FF ; <indirect ref>
  0x0396ED $96DD: -D0-I-  .byte $00 ; <indirect ref>
  0x0396EE $96DE: -D0-I-  .byte $0D ; <indirect ref>
  0x0396EF $96DF: -D0-I-  .byte $01 ; <indirect ref>
  0x0396F0 $96E0: -D0-I-  .byte $04 ; <indirect ref>
  0x0396F1 $96E1: -D0-I-  .byte $01 ; <indirect ref>
  0x0396F2 $96E2: ------  .byte $01
  0x0396F3 $96E3: -D0-I-  .byte $01 ; <indirect ref>
  0x0396F4 $96E4: -D0-I-  .byte $00 ; <indirect ref>
  0x0396F5 $96E5: ------  .byte $00
  0x0396F6 $96E6: -D0-I-  .byte $30 ; <indirect ref>
  0x0396F7 $96E7: -D0-I-  .byte $0B ; <indirect ref>
  0x0396F8 $96E8: -D0-I-  .byte $F0 ; <indirect ref>
  0x0396F9 $96E9: -D0-I-  .byte $20 ; <indirect ref>
  0x0396FA $96EA: -D0-I-  .byte $0B ; <indirect ref>
  0x0396FB $96EB: -D0-I-  .byte $02 ; <indirect ref>
  0x0396FC $96EC: -D0-I-  .byte $02 ; <indirect ref>
  0x0396FD $96ED: -D0-I-  .byte $02 ; <indirect ref>
  0x0396FE $96EE: -D0-I-  .byte $02 ; <indirect ref>
  0x0396FF $96EF: -D0-I-  .byte $02 ; <indirect ref>
  0x039700 $96F0: -D0-I-  .byte $01 ; <indirect ref>
  0x039701 $96F1: ------  .byte $00
  0x039702 $96F2: -D0-I-  .byte $31 ; <indirect ref>
  0x039703 $96F3: -D0-I-  .byte $0A ; <indirect ref>
  0x039704 $96F4: -D0-I-  .byte $00 ; <indirect ref>
  0x039705 $96F5: -D0-I-  .byte $10 ; <indirect ref>
  0x039706 $96F6: -D0-I-  .byte $02 ; <indirect ref>
  0x039707 $96F7: -D0-I-  .byte $05 ; <indirect ref>
  0x039708 $96F8: ------  .byte $00
  0x039709 $96F9: -D0-I-  .byte $00 ; <indirect ref>
  0x03970A $96FA: -D0-I-  .byte $00 ; <indirect ref>
  0x03970B $96FB: ------  .byte $01
  0x03970C $96FC: -D0-I-  .byte $04 ; <indirect ref>
  0x03970D $96FD: ------  .byte $00
  0x03970E $96FE: -D0-I-  .byte $34 ; <indirect ref>
  0x03970F $96FF: -D0-I-  .byte $0C ; <indirect ref>
  0x039710 $9700: -D0-I-  .byte $00 ; <indirect ref>
  0x039711 $9701: -D0-I-  .byte $FF ; <indirect ref>
  0x039712 $9702: -D0-I-  .byte $01 ; <indirect ref>
  0x039713 $9703: -D0-I-  .byte $05 ; <indirect ref>
  0x039714 $9704: ------  .byte $01
  0x039715 $9705: -D0-I-  .byte $00 ; <indirect ref>
  0x039716 $9706: -D0-I-  .byte $00 ; <indirect ref>
  0x039717 $9707: ------  .byte $00
  0x039718 $9708: -D0-I-  .byte $03 ; <indirect ref>
  0x039719 $9709: ------  .byte $00
  0x03971A $970A: -D0-I-  .byte $34 ; <indirect ref>
  0x03971B $970B: -D0-I-  .byte $0C ; <indirect ref>
  0x03971C $970C: -D0-I-  .byte $00 ; <indirect ref>
  0x03971D $970D: -D0-I-  .byte $08 ; <indirect ref>
  0x03971E $970E: -D0-I-  .byte $01 ; <indirect ref>
  0x03971F $970F: -D0-I-  .byte $05 ; <indirect ref>
  0x039720 $9710: ------  .byte $01
  0x039721 $9711: -D0-I-  .byte $00 ; <indirect ref>
  0x039722 $9712: ------  .byte $00
  0x039723 $9713: ------  .byte $00
  0x039724 $9714: -D0-I-  .byte $03 ; <indirect ref>
  0x039725 $9715: ------  .byte $00
  0x039726 $9716: -D0-I-  .byte $37 ; <indirect ref>
  0x039727 $9717: -D0-I-  .byte $0B ; <indirect ref>
  0x039728 $9718: -D0-I-  .byte $F0 ; <indirect ref>
  0x039729 $9719: -D0-I-  .byte $60 ; <indirect ref>
  0x03972A $971A: -D0-I-  .byte $0B ; <indirect ref>
  0x03972B $971B: -D0-I-  .byte $02 ; <indirect ref>
  0x03972C $971C: -D0-I-  .byte $02 ; <indirect ref>
  0x03972D $971D: -D0-I-  .byte $03 ; <indirect ref>
  0x03972E $971E: ------  .byte $01
  0x03972F $971F: -D0-I-  .byte $01 ; <indirect ref>
  0x039730 $9720: -D0-I-  .byte $03 ; <indirect ref>
  0x039731 $9721: ------  .byte $00
  0x039732 $9722: -D0-I-  .byte $0C ; <indirect ref>
  0x039733 $9723: -D0-I-  .byte $00 ; <indirect ref>
  0x039734 $9724: ------  .byte $00
  0x039735 $9725: ------  .byte $00
  0x039736 $9726: -D0-I-  .byte $00 ; <indirect ref>
  0x039737 $9727: -D0-I-  .byte $00 ; <indirect ref>
  0x039738 $9728: -D0-I-  .byte $00 ; <indirect ref>
  0x039739 $9729: ------  .byte $00
  0x03973A $972A: ------  .byte $00
  0x03973B $972B: ------  .byte $00
  0x03973C $972C: ------  .byte $08
  0x03973D $972D: ------  .byte $00
  0x03973E $972E: -D0-I-  .byte $3A ; <indirect ref>
  0x03973F $972F: -D0-I-  .byte $1D ; <indirect ref>
  0x039740 $9730: -D0-I-  .byte $10 ; <indirect ref>
  0x039741 $9731: -D0-I-  .byte $00 ; <indirect ref>
  0x039742 $9732: -D0-I-  .byte $1D ; <indirect ref>
  0x039743 $9733: -D0-I-  .byte $05 ; <indirect ref>
  0x039744 $9734: ------  .byte $00
  0x039745 $9735: -D0-I-  .byte $00 ; <indirect ref>
  0x039746 $9736: ------  .byte $00
  0x039747 $9737: ------  .byte $00
  0x039748 $9738: -D0-I-  .byte $0A ; <indirect ref>
  0x039749 $9739: ------  .byte $00
  0x03974A $973A: -D0-I-  .byte $3D ; <indirect ref>
  0x03974B $973B: -D0-I-  .byte $00 ; <indirect ref>
  0x03974C $973C: -D0-I-  .byte $00 ; <indirect ref>
  0x03974D $973D: -D0-I-  .byte $00 ; <indirect ref>
  0x03974E $973E: -D0-I-  .byte $0C ; <indirect ref>
  0x03974F $973F: -D0-I-  .byte $05 ; <indirect ref>
  0x039750 $9740: ------  .byte $02
  0x039751 $9741: -D0-I-  .byte $00 ; <indirect ref>
  0x039752 $9742: ------  .byte $00
  0x039753 $9743: -D0-I-  .byte $00 ; <indirect ref>
  0x039754 $9744: -D0-I-  .byte $0C ; <indirect ref>
  0x039755 $9745: ------  .byte $00
  0x039756 $9746: -D0-I-  .byte $40 ; <indirect ref>
  0x039757 $9747: -D0-I-  .byte $0E ; <indirect ref>
  0x039758 $9748: -D0-I-  .byte $00 ; <indirect ref>
  0x039759 $9749: -D0-I-  .byte $40 ; <indirect ref>
  0x03975A $974A: -D0-I-  .byte $0E ; <indirect ref>
  0x03975B $974B: -D0-I-  .byte $05 ; <indirect ref>
  0x03975C $974C: ------  .byte $05
  0x03975D $974D: -D0-I-  .byte $03 ; <indirect ref>
  0x03975E $974E: ------  .byte $02
  0x03975F $974F: ------  .byte $02
  0x039760 $9750: -D0-I-  .byte $00 ; <indirect ref>
  0x039761 $9751: ------  .byte $00
  0x039762 $9752: -D0-I-  .byte $41 ; <indirect ref>
  0x039763 $9753: -D0-I-  .byte $00 ; <indirect ref>
  0x039764 $9754: -D0-I-  .byte $00 ; <indirect ref>
  0x039765 $9755: -D0-I-  .byte $00 ; <indirect ref>
  0x039766 $9756: -D0-I-  .byte $00 ; <indirect ref>
  0x039767 $9757: -D0-I-  .byte $03 ; <indirect ref>
  0x039768 $9758: ------  .byte $00
  0x039769 $9759: -D0-I-  .byte $00 ; <indirect ref>
  0x03976A $975A: -D0-I-  .byte $00 ; <indirect ref>
  0x03976B $975B: -D0-I-  .byte $00 ; <indirect ref>
  0x03976C $975C: -D0-I-  .byte $0E ; <indirect ref>
  0x03976D $975D: ------  .byte $00
  0x03976E $975E: -D0-I-  .byte $42 ; <indirect ref>
  0x03976F $975F: -D0-I-  .byte $0A ; <indirect ref>
  0x039770 $9760: -D0-I-  .byte $00 ; <indirect ref>
  0x039771 $9761: -D0-I-  .byte $00 ; <indirect ref>
  0x039772 $9762: -D0-I-  .byte $01 ; <indirect ref>
  0x039773 $9763: -D0-I-  .byte $01 ; <indirect ref>
  0x039774 $9764: -D0-I-  .byte $00 ; <indirect ref>
  0x039775 $9765: -D0-I-  .byte $00 ; <indirect ref>
  0x039776 $9766: -D0-I-  .byte $00 ; <indirect ref>
  0x039777 $9767: -D0-I-  .byte $00 ; <indirect ref>
  0x039778 $9768: -D0-I-  .byte $0F ; <indirect ref>
  0x039779 $9769: ------  .byte $00
  0x03977A $976A: -D0-I-  .byte $0F ; <indirect ref>
  0x03977B $976B: -D0-I-  .byte $00 ; <indirect ref>
  0x03977C $976C: ------  .byte $00
  0x03977D $976D: ------  .byte $00
  0x03977E $976E: -D0-I-  .byte $04 ; <indirect ref>
  0x03977F $976F: -D0-I-  .byte $00 ; <indirect ref>
  0x039780 $9770: -D0-I-  .byte $00 ; <indirect ref>
  0x039781 $9771: ------  .byte $00
  0x039782 $9772: ------  .byte $00
  0x039783 $9773: ------  .byte $00
  0x039784 $9774: ------  .byte $00
  0x039785 $9775: ------  .byte $00
  0x039786 $9776: -D0-I-  .byte $45 ; <indirect ref>
  0x039787 $9777: -D0-I-  .byte $0A ; <indirect ref>
  0x039788 $9778: -D0-I-  .byte $00 ; <indirect ref>
  0x039789 $9779: -D0-I-  .byte $00 ; <indirect ref>
  0x03978A $977A: -D0-I-  .byte $08 ; <indirect ref>
  0x03978B $977B: -D0-I-  .byte $03 ; <indirect ref>
  0x03978C $977C: ------  .byte $00
  0x03978D $977D: -D0-I-  .byte $00 ; <indirect ref>
  0x03978E $977E: ------  .byte $00
  0x03978F $977F: ------  .byte $00
  0x039790 $9780: -D0-I-  .byte $0C ; <indirect ref>
  0x039791 $9781: ------  .byte $00
  0x039792 $9782: -D0-I-  .byte $48 ; <indirect ref>
  0x039793 $9783: -D0-I-  .byte $0F ; <indirect ref>
  0x039794 $9784: -D0-I-  .byte $00 ; <indirect ref>
  0x039795 $9785: -D0-I-  .byte $00 ; <indirect ref>
  0x039796 $9786: -D0-I-  .byte $07 ; <indirect ref>
  0x039797 $9787: -D0-I-  .byte $05 ; <indirect ref>
  0x039798 $9788: ------  .byte $00
  0x039799 $9789: ------  .byte $00
  0x03979A $978A: ------  .byte $00
  0x03979B $978B: ------  .byte $00
  0x03979C $978C: -D0-I-  .byte $1E ; <indirect ref>
  0x03979D $978D: ------  .byte $00
  0x03979E $978E: -D0-I-  .byte $49 ; <indirect ref>
  0x03979F $978F: -D0-I-  .byte $0F ; <indirect ref>
  0x0397A0 $9790: -D0-I-  .byte $00 ; <indirect ref>
  0x0397A1 $9791: -D0-I-  .byte $00 ; <indirect ref>
  0x0397A2 $9792: -D0-I-  .byte $02 ; <indirect ref>
  0x0397A3 $9793: -D0-I-  .byte $03 ; <indirect ref>
  0x0397A4 $9794: ------  .byte $00
  0x0397A5 $9795: ------  .byte $00
  0x0397A6 $9796: ------  .byte $00
  0x0397A7 $9797: ------  .byte $00
  0x0397A8 $9798: -D0-I-  .byte $03 ; <indirect ref>
  0x0397A9 $9799: ------  .byte $00
  0x0397AA $979A: -D0-I-  .byte $4C ; <indirect ref>
  0x0397AB $979B: -D0-I-  .byte $00 ; <indirect ref>
  0x0397AC $979C: -D0-I-  .byte $00 ; <indirect ref>
  0x0397AD $979D: -D0-I-  .byte $00 ; <indirect ref>
  0x0397AE $979E: -D0-I-  .byte $0F ; <indirect ref>
  0x0397AF $979F: -D0-I-  .byte $03 ; <indirect ref>
  0x0397B0 $97A0: ------  .byte $00
  0x0397B1 $97A1: ------  .byte $00
  0x0397B2 $97A2: ------  .byte $00
  0x0397B3 $97A3: ------  .byte $00
  0x0397B4 $97A4: -D0-I-  .byte $02 ; <indirect ref>
  0x0397B5 $97A5: ------  .byte $00
  0x0397B6 $97A6: -D0-I-  .byte $4D ; <indirect ref>
  0x0397B7 $97A7: -D0-I-  .byte $00 ; <indirect ref>
  0x0397B8 $97A8: -D0-I-  .byte $00 ; <indirect ref>
  0x0397B9 $97A9: -D0-I-  .byte $00 ; <indirect ref>
  0x0397BA $97AA: -D0-I-  .byte $10 ; <indirect ref>
  0x0397BB $97AB: ------  .byte $00
  0x0397BC $97AC: ------  .byte $00
  0x0397BD $97AD: ------  .byte $00
  0x0397BE $97AE: ------  .byte $00
  0x0397BF $97AF: -D0-I-  .byte $00 ; <indirect ref>
  0x0397C0 $97B0: -D0-I-  .byte $11 ; <indirect ref>
  0x0397C1 $97B1: ------  .byte $00
  0x0397C2 $97B2: -D0-I-  .byte $4E ; <indirect ref>
  0x0397C3 $97B3: -D0-I-  .byte $00 ; <indirect ref>
  0x0397C4 $97B4: -D0-I-  .byte $00 ; <indirect ref>
  0x0397C5 $97B5: -D0-I-  .byte $00 ; <indirect ref>
  0x0397C6 $97B6: -D0-I-  .byte $00 ; <indirect ref>
  0x0397C7 $97B7: ------  .byte $00
  0x0397C8 $97B8: ------  .byte $00
  0x0397C9 $97B9: -D0-I-  .byte $00 ; <indirect ref>
  0x0397CA $97BA: ------  .byte $00
  0x0397CB $97BB: -D0-I-  .byte $00 ; <indirect ref>
  0x0397CC $97BC: -D0-I-  .byte $12 ; <indirect ref>
  0x0397CD $97BD: ------  .byte $00
  0x0397CE $97BE: -D0-I-  .byte $12 ; <indirect ref>
  0x0397CF $97BF: -D0-I-  .byte $00 ; <indirect ref>
  0x0397D0 $97C0: ------  .byte $00
  0x0397D1 $97C1: ------  .byte $00
  0x0397D2 $97C2: -D0-I-  .byte $00 ; <indirect ref>
  0x0397D3 $97C3: -D0-I-  .byte $02 ; <indirect ref>
  0x0397D4 $97C4: ------  .byte $00
  0x0397D5 $97C5: ------  .byte $00
  0x0397D6 $97C6: ------  .byte $00
  0x0397D7 $97C7: ------  .byte $00
  0x0397D8 $97C8: ------  .byte $00
  0x0397D9 $97C9: ------  .byte $00
  0x0397DA $97CA: -D0-I-  .byte $4F ; <indirect ref>
  0x0397DB $97CB: -D0-I-  .byte $0E ; <indirect ref>
  0x0397DC $97CC: -D0-I-  .byte $00 ; <indirect ref>
  0x0397DD $97CD: -D0-I-  .byte $10 ; <indirect ref>
  0x0397DE $97CE: -D0-I-  .byte $11 ; <indirect ref>
  0x0397DF $97CF: -D0-I-  .byte $00 ; <indirect ref>
  0x0397E0 $97D0: ------  .byte $00
  0x0397E1 $97D1: -D0-I-  .byte $03 ; <indirect ref>
  0x0397E2 $97D2: ------  .byte $02
  0x0397E3 $97D3: ------  .byte $02
  0x0397E4 $97D4: -D0-I-  .byte $15 ; <indirect ref>
  0x0397E5 $97D5: ------  .byte $00
  0x0397E6 $97D6: -D0-I-  .byte $50 ; <indirect ref>
  0x0397E7 $97D7: -D0-I-  .byte $0A ; <indirect ref>
  0x0397E8 $97D8: -D0-I-  .byte $00 ; <indirect ref>
  0x0397E9 $97D9: -D0-I-  .byte $00 ; <indirect ref>
  0x0397EA $97DA: -D0-I-  .byte $01 ; <indirect ref>
  0x0397EB $97DB: ------  .byte $05
  0x0397EC $97DC: ------  .byte $00
  0x0397ED $97DD: ------  .byte $00
  0x0397EE $97DE: ------  .byte $00
  0x0397EF $97DF: ------  .byte $00
  0x0397F0 $97E0: -D0-I-  .byte $14 ; <indirect ref>
  0x0397F1 $97E1: ------  .byte $00
  0x0397F2 $97E2: -D0-I-  .byte $51 ; <indirect ref>
  0x0397F3 $97E3: -D0-I-  .byte $00 ; <indirect ref>
  0x0397F4 $97E4: -D0-I-  .byte $00 ; <indirect ref>
  0x0397F5 $97E5: -D0-I-  .byte $00 ; <indirect ref>
  0x0397F6 $97E6: -D0-I-  .byte $01 ; <indirect ref>
  0x0397F7 $97E7: ------  .byte $03
  0x0397F8 $97E8: ------  .byte $00
  0x0397F9 $97E9: -D0-I-  .byte $00 ; <indirect ref>
  0x0397FA $97EA: ------  .byte $00
  0x0397FB $97EB: ------  .byte $00
  0x0397FC $97EC: -D0-I-  .byte $14 ; <indirect ref>
  0x0397FD $97ED: ------  .byte $00
  0x0397FE $97EE: -D0-I-  .byte $52 ; <indirect ref>
  0x0397FF $97EF: -D0-I-  .byte $02 ; <indirect ref>
  0x039800 $97F0: -D0-I-  .byte $00 ; <indirect ref>
  0x039801 $97F1: -D0-I-  .byte $00 ; <indirect ref>
  0x039802 $97F2: -D0-I-  .byte $01 ; <indirect ref>
  0x039803 $97F3: ------  .byte $05
  0x039804 $97F4: ------  .byte $00
  0x039805 $97F5: ------  .byte $00
  0x039806 $97F6: ------  .byte $00
  0x039807 $97F7: ------  .byte $00
  0x039808 $97F8: -D0-I-  .byte $14 ; <indirect ref>
  0x039809 $97F9: ------  .byte $00
  0x03980A $97FA: -D0-I-  .byte $53 ; <indirect ref>
  0x03980B $97FB: -D0-I-  .byte $02 ; <indirect ref>
  0x03980C $97FC: -D0-I-  .byte $00 ; <indirect ref>
  0x03980D $97FD: -D0-I-  .byte $00 ; <indirect ref>
  0x03980E $97FE: -D0-I-  .byte $01 ; <indirect ref>
  0x03980F $97FF: -D0-I-  .byte $05 ; <indirect ref>
  0x039810 $9800: ------  .byte $00
  0x039811 $9801: ------  .byte $00
  0x039812 $9802: ------  .byte $00
  0x039813 $9803: ------  .byte $00
  0x039814 $9804: ------  .byte $15
  0x039815 $9805: ------  .byte $00
  0x039816 $9806: -D0-I-  .byte $54 ; <indirect ref>
  0x039817 $9807: -D0-I-  .byte $11 ; <indirect ref>
  0x039818 $9808: -D0-I-  .byte $00 ; <indirect ref>
  0x039819 $9809: -D0-I-  .byte $18 ; <indirect ref>
  0x03981A $980A: -D0-I-  .byte $01 ; <indirect ref>
  0x03981B $980B: -D0-I-  .byte $06 ; <indirect ref>
  0x03981C $980C: ------  .byte $00
  0x03981D $980D: ------  .byte $00
  0x03981E $980E: ------  .byte $00
  0x03981F $980F: ------  .byte $00
  0x039820 $9810: -D0-I-  .byte $14 ; <indirect ref>
  0x039821 $9811: ------  .byte $00
  0x039822 $9812: -D0-I-  .byte $54 ; <indirect ref>
  0x039823 $9813: -D0-I-  .byte $11 ; <indirect ref>
  0x039824 $9814: -D0-I-  .byte $00 ; <indirect ref>
  0x039825 $9815: -D0-I-  .byte $04 ; <indirect ref>
  0x039826 $9816: -D0-I-  .byte $01 ; <indirect ref>
  0x039827 $9817: -D0-I-  .byte $06 ; <indirect ref>
  0x039828 $9818: ------  .byte $00
  0x039829 $9819: -D0-I-  .byte $00 ; <indirect ref>
  0x03982A $981A: ------  .byte $00
  0x03982B $981B: ------  .byte $00
  0x03982C $981C: -D0-I-  .byte $14 ; <indirect ref>
  0x03982D $981D: ------  .byte $00
  0x03982E $981E: -D0-I-  .byte $55 ; <indirect ref>
  0x03982F $981F: -D0-I-  .byte $10 ; <indirect ref>
  0x039830 $9820: -D0-I-  .byte $20 ; <indirect ref>
  0x039831 $9821: -D0-I-  .byte $10 ; <indirect ref>
  0x039832 $9822: -D0-I-  .byte $12 ; <indirect ref>
  0x039833 $9823: ------  .byte $00
  0x039834 $9824: ------  .byte $00
  0x039835 $9825: ------  .byte $04
  0x039836 $9826: ------  .byte $01
  0x039837 $9827: ------  .byte $01
  0x039838 $9828: ------  .byte $15
  0x039839 $9829: ------  .byte $00
  0x03983A $982A: -D0-I-  .byte $56 ; <indirect ref>
  0x03983B $982B: -D0-I-  .byte $00 ; <indirect ref>
  0x03983C $982C: -D0-I-  .byte $00 ; <indirect ref>
  0x03983D $982D: -D0-I-  .byte $00 ; <indirect ref>
  0x03983E $982E: ------  .byte $01
  0x03983F $982F: ------  .byte $00
  0x039840 $9830: ------  .byte $00
  0x039841 $9831: -D0-I-  .byte $05 ; <indirect ref>
  0x039842 $9832: ------  .byte $00
  0x039843 $9833: ------  .byte $00
  0x039844 $9834: ------  .byte $14
  0x039845 $9835: ------  .byte $00
  0x039846 $9836: -D0-I-  .byte $57 ; <indirect ref>
  0x039847 $9837: -D0-I-  .byte $10 ; <indirect ref>
  0x039848 $9838: -D0-I-  .byte $20 ; <indirect ref>
  0x039849 $9839: -D0-I-  .byte $10 ; <indirect ref>
  0x03984A $983A: -D0-I-  .byte $12 ; <indirect ref>
  0x03984B $983B: ------  .byte $00
  0x03984C $983C: ------  .byte $00
  0x03984D $983D: -D0-I-  .byte $03 ; <indirect ref>
  0x03984E $983E: ------  .byte $01
  0x03984F $983F: -D0-I-  .byte $01 ; <indirect ref>
  0x039850 $9840: -D0-I-  .byte $15 ; <indirect ref>
  0x039851 $9841: ------  .byte $00
  0x039852 $9842: -D0-I-  .byte $58 ; <indirect ref>
  0x039853 $9843: -D0-I-  .byte $10 ; <indirect ref>
  0x039854 $9844: -D0-I-  .byte $10 ; <indirect ref>
  0x039855 $9845: -D0-I-  .byte $00 ; <indirect ref>
  0x039856 $9846: -D0-I-  .byte $12 ; <indirect ref>
  0x039857 $9847: ------  .byte $00
  0x039858 $9848: ------  .byte $00
  0x039859 $9849: -D0-I-  .byte $00 ; <indirect ref>
  0x03985A $984A: ------  .byte $00
  0x03985B $984B: ------  .byte $00
  0x03985C $984C: ------  .byte $15
  0x03985D $984D: ------  .byte $00
  0x03985E $984E: -D0-I-  .byte $13 ; <indirect ref>
  0x03985F $984F: -D0-I-  .byte $00 ; <indirect ref>
  0x039860 $9850: ------  .byte $00
  0x039861 $9851: ------  .byte $00
  0x039862 $9852: -D0-I-  .byte $04 ; <indirect ref>
  0x039863 $9853: -D0-I-  .byte $00 ; <indirect ref>
  0x039864 $9854: ------  .byte $00
  0x039865 $9855: ------  .byte $00
  0x039866 $9856: ------  .byte $00
  0x039867 $9857: ------  .byte $00
  0x039868 $9858: ------  .byte $00
  0x039869 $9859: ------  .byte $00
  0x03986A $985A: -D0-I-  .byte $5D ; <indirect ref>
  0x03986B $985B: -D0-I-  .byte $00 ; <indirect ref>
  0x03986C $985C: -D0-I-  .byte $00 ; <indirect ref>
  0x03986D $985D: -D0-I-  .byte $00 ; <indirect ref>
  0x03986E $985E: -D0-I-  .byte $08 ; <indirect ref>
  0x03986F $985F: -D0-I-  .byte $06 ; <indirect ref>
  0x039870 $9860: ------  .byte $00
  0x039871 $9861: -D0-I-  .byte $01 ; <indirect ref>
  0x039872 $9862: ------  .byte $00
  0x039873 $9863: ------  .byte $00
  0x039874 $9864: -D0-I-  .byte $03 ; <indirect ref>
  0x039875 $9865: ------  .byte $00
  0x039876 $9866: -D0-I-  .byte $5D ; <indirect ref>
  0x039877 $9867: -D0-I-  .byte $00 ; <indirect ref>
  0x039878 $9868: -D0-I-  .byte $00 ; <indirect ref>
  0x039879 $9869: -D0-I-  .byte $00 ; <indirect ref>
  0x03987A $986A: -D0-I-  .byte $08 ; <indirect ref>
  0x03987B $986B: -D0-I-  .byte $06 ; <indirect ref>
  0x03987C $986C: ------  .byte $00
  0x03987D $986D: -D0-I-  .byte $01 ; <indirect ref>
  0x03987E $986E: ------  .byte $00
  0x03987F $986F: ------  .byte $00
  0x039880 $9870: -D0-I-  .byte $03 ; <indirect ref>
  0x039881 $9871: ------  .byte $00
  0x039882 $9872: -D0-I-  .byte $66 ; <indirect ref>
  0x039883 $9873: -D0-I-  .byte $13 ; <indirect ref>
  0x039884 $9874: -D0-I-  .byte $00 ; <indirect ref>
  0x039885 $9875: -D0-I-  .byte $08 ; <indirect ref>
  0x039886 $9876: -D0-I-  .byte $10 ; <indirect ref>
  0x039887 $9877: -D0-I-  .byte $06 ; <indirect ref>
  0x039888 $9878: ------  .byte $00
  0x039889 $9879: -D0-I-  .byte $06 ; <indirect ref>
  0x03988A $987A: -D0-I-  .byte $02 ; <indirect ref>
  0x03988B $987B: ------  .byte $02
  0x03988C $987C: -D0-I-  .byte $02 ; <indirect ref>
  0x03988D $987D: ------  .byte $00
  0x03988E $987E: -D0-I-  .byte $67 ; <indirect ref>
  0x03988F $987F: -D0-I-  .byte $13 ; <indirect ref>
  0x039890 $9880: -D0-I-  .byte $00 ; <indirect ref>
  0x039891 $9881: -D0-I-  .byte $10 ; <indirect ref>
  0x039892 $9882: -D0-I-  .byte $10 ; <indirect ref>
  0x039893 $9883: -D0-I-  .byte $06 ; <indirect ref>
  0x039894 $9884: ------  .byte $00
  0x039895 $9885: -D0-I-  .byte $06 ; <indirect ref>
  0x039896 $9886: -D0-I-  .byte $02 ; <indirect ref>
  0x039897 $9887: -D0-I-  .byte $02 ; <indirect ref>
  0x039898 $9888: -D0-I-  .byte $02 ; <indirect ref>
  0x039899 $9889: ------  .byte $00
  0x03989A $988A: -D0-I-  .byte $6B ; <indirect ref>
  0x03989B $988B: -D0-I-  .byte $14 ; <indirect ref>
  0x03989C $988C: -D0-I-  .byte $00 ; <indirect ref>
  0x03989D $988D: -D0-I-  .byte $08 ; <indirect ref>
  0x03989E $988E: -D0-I-  .byte $13 ; <indirect ref>
  0x03989F $988F: -D0-I-  .byte $05 ; <indirect ref>
  0x0398A0 $9890: -D0-I-  .byte $00 ; <indirect ref>
  0x0398A1 $9891: -D0-I-  .byte $00 ; <indirect ref>
  0x0398A2 $9892: -D0-I-  .byte $00 ; <indirect ref>
  0x0398A3 $9893: -D0-I-  .byte $00 ; <indirect ref>
  0x0398A4 $9894: -D0-I-  .byte $03 ; <indirect ref>
  0x0398A5 $9895: ------  .byte $00
  0x0398A6 $9896: -D0-I-  .byte $1B ; <indirect ref>
  0x0398A7 $9897: -D0-I-  .byte $00 ; <indirect ref>
  0x0398A8 $9898: ------  .byte $00
  0x0398A9 $9899: ------  .byte $00
  0x0398AA $989A: -D0-I-  .byte $05 ; <indirect ref>
  0x0398AB $989B: -D0-I-  .byte $02 ; <indirect ref>
  0x0398AC $989C: -D0-I-  .byte $00 ; <indirect ref>
  0x0398AD $989D: ------  .byte $00
  0x0398AE $989E: ------  .byte $00
  0x0398AF $989F: ------  .byte $00
  0x0398B0 $98A0: ------  .byte $00
  0x0398B1 $98A1: ------  .byte $00
  0x0398B2 $98A2: -D0-I-  .byte $6E ; <indirect ref>
  0x0398B3 $98A3: -D0-I-  .byte $0A ; <indirect ref>
  0x0398B4 $98A4: -D0-I-  .byte $00 ; <indirect ref>
  0x0398B5 $98A5: -D0-I-  .byte $00 ; <indirect ref>
  0x0398B6 $98A6: -D0-I-  .byte $09 ; <indirect ref>
  0x0398B7 $98A7: -D0-I-  .byte $06 ; <indirect ref>
  0x0398B8 $98A8: ------  .byte $04
  0x0398B9 $98A9: -D0-I-  .byte $00 ; <indirect ref>
  0x0398BA $98AA: ------  .byte $00
  0x0398BB $98AB: ------  .byte $00
  0x0398BC $98AC: -D0-I-  .byte $00 ; <indirect ref>
  0x0398BD $98AD: ------  .byte $00
  0x0398BE $98AE: -D0-I-  .byte $6F ; <indirect ref>
  0x0398BF $98AF: -D0-I-  .byte $0B ; <indirect ref>
  0x0398C0 $98B0: -D0-I-  .byte $10 ; <indirect ref>
  0x0398C1 $98B1: -D0-I-  .byte $40 ; <indirect ref>
  0x0398C2 $98B2: -D0-I-  .byte $04 ; <indirect ref>
  0x0398C3 $98B3: ------  .byte $06
  0x0398C4 $98B4: ------  .byte $04
  0x0398C5 $98B5: -D0-I-  .byte $02 ; <indirect ref>
  0x0398C6 $98B6: ------  .byte $02
  0x0398C7 $98B7: -D0-I-  .byte $02 ; <indirect ref>
  0x0398C8 $98B8: -D0-I-  .byte $01 ; <indirect ref>
  0x0398C9 $98B9: ------  .byte $00
  0x0398CA $98BA: -D0-I-  .byte $72 ; <indirect ref>
  0x0398CB $98BB: -D0-I-  .byte $0F ; <indirect ref>
  0x0398CC $98BC: -D0-I-  .byte $00 ; <indirect ref>
  0x0398CD $98BD: -D0-I-  .byte $00 ; <indirect ref>
  0x0398CE $98BE: -D0-I-  .byte $09 ; <indirect ref>
  0x0398CF $98BF: -D0-I-  .byte $06 ; <indirect ref>
  0x0398D0 $98C0: -D0-I-  .byte $00 ; <indirect ref>
  0x0398D1 $98C1: -D0-I-  .byte $00 ; <indirect ref>
  0x0398D2 $98C2: -D0-I-  .byte $00 ; <indirect ref>
  0x0398D3 $98C3: ------  .byte $00
  0x0398D4 $98C4: -D0-I-  .byte $00 ; <indirect ref>
  0x0398D5 $98C5: ------  .byte $00
  0x0398D6 $98C6: -D0-I-  .byte $1D ; <indirect ref>
  0x0398D7 $98C7: -D0-I-  .byte $00 ; <indirect ref>
  0x0398D8 $98C8: ------  .byte $00
  0x0398D9 $98C9: ------  .byte $00
  0x0398DA $98CA: -D0-I-  .byte $05 ; <indirect ref>
  0x0398DB $98CB: -D0-I-  .byte $02 ; <indirect ref>
  0x0398DC $98CC: -D0-I-  .byte $00 ; <indirect ref>
  0x0398DD $98CD: ------  .byte $00
  0x0398DE $98CE: ------  .byte $00
  0x0398DF $98CF: ------  .byte $00
  0x0398E0 $98D0: ------  .byte $00
  0x0398E1 $98D1: ------  .byte $00
  0x0398E2 $98D2: -D0-I-  .byte $75 ; <indirect ref>
  0x0398E3 $98D3: -D0-I-  .byte $0A ; <indirect ref>
  0x0398E4 $98D4: -D0-I-  .byte $00 ; <indirect ref>
  0x0398E5 $98D5: -D0-I-  .byte $10 ; <indirect ref>
  0x0398E6 $98D6: -D0-I-  .byte $15 ; <indirect ref>
  0x0398E7 $98D7: -D0-I-  .byte $06 ; <indirect ref>
  0x0398E8 $98D8: -D0-I-  .byte $05 ; <indirect ref>
  0x0398E9 $98D9: -D0-I-  .byte $00 ; <indirect ref>
  0x0398EA $98DA: ------  .byte $02
  0x0398EB $98DB: ------  .byte $02
  0x0398EC $98DC: -D0-I-  .byte $0B ; <indirect ref>
  0x0398ED $98DD: ------  .byte $00
  0x0398EE $98DE: -D0-I-  .byte $76 ; <indirect ref>
  0x0398EF $98DF: -D0-I-  .byte $0F ; <indirect ref>
  0x0398F0 $98E0: -D0-I-  .byte $00 ; <indirect ref>
  0x0398F1 $98E1: -D0-I-  .byte $00 ; <indirect ref>
  0x0398F2 $98E2: -D0-I-  .byte $15 ; <indirect ref>
  0x0398F3 $98E3: -D0-I-  .byte $06 ; <indirect ref>
  0x0398F4 $98E4: -D0-I-  .byte $01 ; <indirect ref>
  0x0398F5 $98E5: -D0-I-  .byte $00 ; <indirect ref>
  0x0398F6 $98E6: ------  .byte $00
  0x0398F7 $98E7: -D0-I-  .byte $00 ; <indirect ref>
  0x0398F8 $98E8: -D0-I-  .byte $01 ; <indirect ref>
  0x0398F9 $98E9: ------  .byte $00
  0x0398FA $98EA: -D0-I-  .byte $79 ; <indirect ref>
  0x0398FB $98EB: -D0-I-  .byte $13 ; <indirect ref>
  0x0398FC $98EC: -D0-I-  .byte $00 ; <indirect ref>
  0x0398FD $98ED: -D0-I-  .byte $00 ; <indirect ref>
  0x0398FE $98EE: -D0-I-  .byte $13 ; <indirect ref>
  0x0398FF $98EF: -D0-I-  .byte $06 ; <indirect ref>
  0x039900 $98F0: ------  .byte $00
  0x039901 $98F1: -D0-I-  .byte $00 ; <indirect ref>
  0x039902 $98F2: ------  .byte $00
  0x039903 $98F3: -D0-I-  .byte $00 ; <indirect ref>
  0x039904 $98F4: ------  .byte $01
  0x039905 $98F5: ------  .byte $00
  0x039906 $98F6: -D0-I-  .byte $7C ; <indirect ref>
  0x039907 $98F7: -D0-I-  .byte $13 ; <indirect ref>
  0x039908 $98F8: -D0-I-  .byte $00 ; <indirect ref>
  0x039909 $98F9: -D0-I-  .byte $00 ; <indirect ref>
  0x03990A $98FA: -D0-I-  .byte $08 ; <indirect ref>
  0x03990B $98FB: -D0-I-  .byte $06 ; <indirect ref>
  0x03990C $98FC: ------  .byte $00
  0x03990D $98FD: -D0-I-  .byte $00 ; <indirect ref>
  0x03990E $98FE: ------  .byte $01
  0x03990F $98FF: ------  .byte $00
  0x039910 $9900: -D0-I-  .byte $16 ; <indirect ref>
  0x039911 $9901: ------  .byte $00
  0x039912 $9902: -D0-I-  .byte $20 ; <indirect ref>
  0x039913 $9903: -D0-I-  .byte $00 ; <indirect ref>
  0x039914 $9904: ------  .byte $00
  0x039915 $9905: ------  .byte $00
  0x039916 $9906: -D0-I-  .byte $03 ; <indirect ref>
  0x039917 $9907: ------  .byte $01
  0x039918 $9908: -D0-I-  .byte $00 ; <indirect ref>
  0x039919 $9909: ------  .byte $00
  0x03991A $990A: ------  .byte $00
  0x03991B $990B: ------  .byte $00
  0x03991C $990C: ------  .byte $00
  0x03991D $990D: ------  .byte $00
  0x03991E $990E: -D0-I-  .byte $7F ; <indirect ref>
  0x03991F $990F: -D0-I-  .byte $15 ; <indirect ref>
  0x039920 $9910: -D0-I-  .byte $00 ; <indirect ref>
  0x039921 $9911: -D0-I-  .byte $FF ; <indirect ref>
  0x039922 $9912: -D0-I-  .byte $16 ; <indirect ref>
  0x039923 $9913: -D0-I-  .byte $06 ; <indirect ref>
  0x039924 $9914: ------  .byte $02
  0x039925 $9915: -D0-I-  .byte $00 ; <indirect ref>
  0x039926 $9916: ------  .byte $00
  0x039927 $9917: ------  .byte $00
  0x039928 $9918: -D0-I-  .byte $00 ; <indirect ref>
  0x039929 $9919: ------  .byte $00
  0x03992A $991A: -D0-I-  .byte $80 ; <indirect ref>
  0x03992B $991B: -D0-I-  .byte $0B ; <indirect ref>
  0x03992C $991C: -D0-I-  .byte $20 ; <indirect ref>
  0x03992D $991D: -D0-I-  .byte $00 ; <indirect ref>
  0x03992E $991E: -D0-I-  .byte $09 ; <indirect ref>
  0x03992F $991F: -D0-I-  .byte $06 ; <indirect ref>
  0x039930 $9920: -D0-I-  .byte $00 ; <indirect ref>
  0x039931 $9921: -D0-I-  .byte $02 ; <indirect ref>
  0x039932 $9922: -D0-I-  .byte $02 ; <indirect ref>
  0x039933 $9923: -D0-I-  .byte $02 ; <indirect ref>
  0x039934 $9924: -D0-I-  .byte $17 ; <indirect ref>
  0x039935 $9925: ------  .byte $00
  0x039936 $9926: -D0-I-  .byte $82 ; <indirect ref>
  0x039937 $9927: -D0-I-  .byte $00 ; <indirect ref>
  0x039938 $9928: -D0-I-  .byte $00 ; <indirect ref>
  0x039939 $9929: -D0-I-  .byte $10 ; <indirect ref>
  0x03993A $992A: -D0-I-  .byte $19 ; <indirect ref>
  0x03993B $992B: -D0-I-  .byte $00 ; <indirect ref>
  0x03993C $992C: ------  .byte $00
  0x03993D $992D: -D0-I-  .byte $00 ; <indirect ref>
  0x03993E $992E: -D0-I-  .byte $00 ; <indirect ref>
  0x03993F $992F: ------  .byte $00
  0x039940 $9930: -D0-I-  .byte $0B ; <indirect ref>
  0x039941 $9931: ------  .byte $00
  0x039942 $9932: -D0-I-  .byte $83 ; <indirect ref>
  0x039943 $9933: -D0-I-  .byte $06 ; <indirect ref>
  0x039944 $9934: -D0-I-  .byte $00 ; <indirect ref>
  0x039945 $9935: -D0-I-  .byte $00 ; <indirect ref>
  0x039946 $9936: -D0-I-  .byte $08 ; <indirect ref>
  0x039947 $9937: -D0-I-  .byte $06 ; <indirect ref>
  0x039948 $9938: ------  .byte $03
  0x039949 $9939: -D0-I-  .byte $01 ; <indirect ref>
  0x03994A $993A: -D0-I-  .byte $01 ; <indirect ref>
  0x03994B $993B: ------  .byte $01
  0x03994C $993C: -D0-I-  .byte $20 ; <indirect ref>
  0x03994D $993D: ------  .byte $00
  0x03994E $993E: -D0-I-  .byte $84 ; <indirect ref>
  0x03994F $993F: -D0-I-  .byte $07 ; <indirect ref>
  0x039950 $9940: -D0-I-  .byte $00 ; <indirect ref>
  0x039951 $9941: -D0-I-  .byte $10 ; <indirect ref>
  0x039952 $9942: -D0-I-  .byte $18 ; <indirect ref>
  0x039953 $9943: -D0-I-  .byte $06 ; <indirect ref>
  0x039954 $9944: ------  .byte $02
  0x039955 $9945: -D0-I-  .byte $00 ; <indirect ref>
  0x039956 $9946: -D0-I-  .byte $00 ; <indirect ref>
  0x039957 $9947: -D0-I-  .byte $00 ; <indirect ref>
  0x039958 $9948: -D0-I-  .byte $22 ; <indirect ref>
  0x039959 $9949: ------  .byte $00
  0x03995A $994A: -D0-I-  .byte $85 ; <indirect ref>
  0x03995B $994B: -D0-I-  .byte $00 ; <indirect ref>
  0x03995C $994C: -D0-I-  .byte $00 ; <indirect ref>
  0x03995D $994D: -D0-I-  .byte $00 ; <indirect ref>
  0x03995E $994E: -D0-I-  .byte $01 ; <indirect ref>
  0x03995F $994F: -D0-I-  .byte $03 ; <indirect ref>
  0x039960 $9950: -D0-I-  .byte $00 ; <indirect ref>
  0x039961 $9951: -D0-I-  .byte $00 ; <indirect ref>
  0x039962 $9952: -D0-I-  .byte $00 ; <indirect ref>
  0x039963 $9953: -D0-I-  .byte $00 ; <indirect ref>
  0x039964 $9954: -D0-I-  .byte $21 ; <indirect ref>
  0x039965 $9955: ------  .byte $00
  0x039966 $9956: -D0-I-  .byte $86 ; <indirect ref>
  0x039967 $9957: -D0-I-  .byte $00 ; <indirect ref>
  0x039968 $9958: -D0-I-  .byte $18 ; <indirect ref>
  0x039969 $9959: -D0-I-  .byte $00 ; <indirect ref>
  0x03996A $995A: -D0-I-  .byte $14 ; <indirect ref>
  0x03996B $995B: ------  .byte $05
  0x03996C $995C: -D0-I-  .byte $00 ; <indirect ref>
  0x03996D $995D: -D0-I-  .byte $02 ; <indirect ref>
  0x03996E $995E: ------  .byte $02
  0x03996F $995F: -D0-I-  .byte $02 ; <indirect ref>
  0x039970 $9960: -D0-I-  .byte $19 ; <indirect ref>
  0x039971 $9961: ------  .byte $00
  0x039972 $9962: -D0-I-  .byte $88 ; <indirect ref>
  0x039973 $9963: -D0-I-  .byte $0A ; <indirect ref>
  0x039974 $9964: -D0-I-  .byte $00 ; <indirect ref>
  0x039975 $9965: -D0-I-  .byte $08 ; <indirect ref>
  0x039976 $9966: -D0-I-  .byte $1A ; <indirect ref>
  0x039977 $9967: -D0-I-  .byte $05 ; <indirect ref>
  0x039978 $9968: ------  .byte $02
  0x039979 $9969: -D0-I-  .byte $00 ; <indirect ref>
  0x03997A $996A: -D0-I-  .byte $01 ; <indirect ref>
  0x03997B $996B: ------  .byte $01
  0x03997C $996C: -D0-I-  .byte $24 ; <indirect ref>
  0x03997D $996D: ------  .byte $00
  0x03997E $996E: -D0-I-  .byte $89 ; <indirect ref>
  0x03997F $996F: -D0-I-  .byte $00 ; <indirect ref>
  0x039980 $9970: -D0-I-  .byte $00 ; <indirect ref>
  0x039981 $9971: -D0-I-  .byte $00 ; <indirect ref>
  0x039982 $9972: -D0-I-  .byte $00 ; <indirect ref>
  0x039983 $9973: -D0-I-  .byte $06 ; <indirect ref>
  0x039984 $9974: ------  .byte $00
  0x039985 $9975: -D0-I-  .byte $00 ; <indirect ref>
  0x039986 $9976: -D0-I-  .byte $00 ; <indirect ref>
  0x039987 $9977: ------  .byte $00
  0x039988 $9978: -D0-I-  .byte $25 ; <indirect ref>
  0x039989 $9979: ------  .byte $00
  0x03998A $997A: -D0-I-  .byte $8A ; <indirect ref>
  0x03998B $997B: -D0-I-  .byte $1A ; <indirect ref>
  0x03998C $997C: -D0-I-  .byte $00 ; <indirect ref>
  0x03998D $997D: -D0-I-  .byte $10 ; <indirect ref>
  0x03998E $997E: -D0-I-  .byte $05 ; <indirect ref>
  0x03998F $997F: -D0-I-  .byte $00 ; <indirect ref>
  0x039990 $9980: -D0-I-  .byte $00 ; <indirect ref>
  0x039991 $9981: -D0-I-  .byte $00 ; <indirect ref>
  0x039992 $9982: -D0-I-  .byte $02 ; <indirect ref>
  0x039993 $9983: -D0-I-  .byte $02 ; <indirect ref>
  0x039994 $9984: -D0-I-  .byte $26 ; <indirect ref>
  0x039995 $9985: ------  .byte $00
  0x039996 $9986: -D0-I-  .byte $8B ; <indirect ref>
  0x039997 $9987: -D0-I-  .byte $00 ; <indirect ref>
  0x039998 $9988: -D0-I-  .byte $00 ; <indirect ref>
  0x039999 $9989: -D0-I-  .byte $00 ; <indirect ref>
  0x03999A $998A: -D0-I-  .byte $01 ; <indirect ref>
  0x03999B $998B: -D0-I-  .byte $01 ; <indirect ref>
  0x03999C $998C: -D0-I-  .byte $01 ; <indirect ref>
  0x03999D $998D: -D0-I-  .byte $00 ; <indirect ref>
  0x03999E $998E: ------  .byte $00
  0x03999F $998F: -D0-I-  .byte $00 ; <indirect ref>
  0x0399A0 $9990: -D0-I-  .byte $25 ; <indirect ref>
  0x0399A1 $9991: ------  .byte $00
  0x0399A2 $9992: -D0-I-  .byte $8C ; <indirect ref>
  0x0399A3 $9993: -D0-I-  .byte $00 ; <indirect ref>
  0x0399A4 $9994: -D0-I-  .byte $00 ; <indirect ref>
  0x0399A5 $9995: -D0-I-  .byte $00 ; <indirect ref>
  0x0399A6 $9996: -D0-I-  .byte $14 ; <indirect ref>
  0x0399A7 $9997: -D0-I-  .byte $03 ; <indirect ref>
  0x0399A8 $9998: ------  .byte $00
  0x0399A9 $9999: -D0-I-  .byte $00 ; <indirect ref>
  0x0399AA $999A: -D0-I-  .byte $00 ; <indirect ref>
  0x0399AB $999B: -D0-I-  .byte $00 ; <indirect ref>
  0x0399AC $999C: -D0-I-  .byte $27 ; <indirect ref>
  0x0399AD $999D: ------  .byte $00
  0x0399AE $999E: -D0-I-  .byte $8D ; <indirect ref>
  0x0399AF $999F: -D0-I-  .byte $0A ; <indirect ref>
  0x0399B0 $99A0: -D0-I-  .byte $00 ; <indirect ref>
  0x0399B1 $99A1: -D0-I-  .byte $00 ; <indirect ref>
  0x0399B2 $99A2: -D0-I-  .byte $0F ; <indirect ref>
  0x0399B3 $99A3: -D0-I-  .byte $02 ; <indirect ref>
  0x0399B4 $99A4: -D0-I-  .byte $00 ; <indirect ref>
  0x0399B5 $99A5: -D0-I-  .byte $00 ; <indirect ref>
  0x0399B6 $99A6: ------  .byte $00
  0x0399B7 $99A7: -D0-I-  .byte $00 ; <indirect ref>
  0x0399B8 $99A8: -D0-I-  .byte $25 ; <indirect ref>
  0x0399B9 $99A9: ------  .byte $00
  0x0399BA $99AA: -D0-I-  .byte $23 ; <indirect ref>
  0x0399BB $99AB: -D0-I-  .byte $00 ; <indirect ref>
  0x0399BC $99AC: ------  .byte $00
  0x0399BD $99AD: ------  .byte $00
  0x0399BE $99AE: -D0-I-  .byte $03 ; <indirect ref>
  0x0399BF $99AF: -D0-I-  .byte $02 ; <indirect ref>
  0x0399C0 $99B0: -D0-I-  .byte $00 ; <indirect ref>
  0x0399C1 $99B1: ------  .byte $00
  0x0399C2 $99B2: ------  .byte $00
  0x0399C3 $99B3: ------  .byte $00
  0x0399C4 $99B4: ------  .byte $00
  0x0399C5 $99B5: ------  .byte $00
  0x0399C6 $99B6: -D0-I-  .byte $8E ; <indirect ref>
  0x0399C7 $99B7: -D0-I-  .byte $1C ; <indirect ref>
  0x0399C8 $99B8: -D0-I-  .byte $00 ; <indirect ref>
  0x0399C9 $99B9: -D0-I-  .byte $08 ; <indirect ref>
  0x0399CA $99BA: -D0-I-  .byte $07 ; <indirect ref>
  0x0399CB $99BB: -D0-I-  .byte $05 ; <indirect ref>
  0x0399CC $99BC: ------  .byte $02
  0x0399CD $99BD: -D0-I-  .byte $00 ; <indirect ref>
  0x0399CE $99BE: ------  .byte $00
  0x0399CF $99BF: ------  .byte $00
  0x0399D0 $99C0: -D0-I-  .byte $2E ; <indirect ref>
  0x0399D1 $99C1: ------  .byte $00
  0x0399D2 $99C2: -D0-I-  .byte $8F ; <indirect ref>
  0x0399D3 $99C3: -D0-I-  .byte $0A ; <indirect ref>
  0x0399D4 $99C4: -D0-I-  .byte $00 ; <indirect ref>
  0x0399D5 $99C5: -D0-I-  .byte $04 ; <indirect ref>
  0x0399D6 $99C6: -D0-I-  .byte $04 ; <indirect ref>
  0x0399D7 $99C7: -D0-I-  .byte $07 ; <indirect ref>
  0x0399D8 $99C8: ------  .byte $00
  0x0399D9 $99C9: -D0-I-  .byte $00 ; <indirect ref>
  0x0399DA $99CA: ------  .byte $00
  0x0399DB $99CB: ------  .byte $00
  0x0399DC $99CC: -D0-I-  .byte $2D ; <indirect ref>
  0x0399DD $99CD: ------  .byte $00
  0x0399DE $99CE: -D0-I-  .byte $90 ; <indirect ref>
  0x0399DF $99CF: -D0-I-  .byte $06 ; <indirect ref>
  0x0399E0 $99D0: -D0-I-  .byte $00 ; <indirect ref>
  0x0399E1 $99D1: -D0-I-  .byte $00 ; <indirect ref>
  0x0399E2 $99D2: -D0-I-  .byte $14 ; <indirect ref>
  0x0399E3 $99D3: -D0-I-  .byte $07 ; <indirect ref>
  0x0399E4 $99D4: -D0-I-  .byte $00 ; <indirect ref>
  0x0399E5 $99D5: -D0-I-  .byte $00 ; <indirect ref>
  0x0399E6 $99D6: -D0-I-  .byte $00 ; <indirect ref>
  0x0399E7 $99D7: ------  .byte $00
  0x0399E8 $99D8: -D0-I-  .byte $2C ; <indirect ref>
  0x0399E9 $99D9: ------  .byte $00
  0x0399EA $99DA: -D0-I-  .byte $91 ; <indirect ref>
  0x0399EB $99DB: -D0-I-  .byte $0A ; <indirect ref>
  0x0399EC $99DC: -D0-I-  .byte $00 ; <indirect ref>
  0x0399ED $99DD: -D0-I-  .byte $00 ; <indirect ref>
  0x0399EE $99DE: -D0-I-  .byte $06 ; <indirect ref>
  0x0399EF $99DF: -D0-I-  .byte $07 ; <indirect ref>
  0x0399F0 $99E0: ------  .byte $00
  0x0399F1 $99E1: -D0-I-  .byte $00 ; <indirect ref>
  0x0399F2 $99E2: -D0-I-  .byte $00 ; <indirect ref>
  0x0399F3 $99E3: -D0-I-  .byte $00 ; <indirect ref>
  0x0399F4 $99E4: -D0-I-  .byte $2A ; <indirect ref>
  0x0399F5 $99E5: ------  .byte $00
  0x0399F6 $99E6: -D0-I-  .byte $92 ; <indirect ref>
  0x0399F7 $99E7: -D0-I-  .byte $0A ; <indirect ref>
  0x0399F8 $99E8: -D0-I-  .byte $00 ; <indirect ref>
  0x0399F9 $99E9: -D0-I-  .byte $00 ; <indirect ref>
  0x0399FA $99EA: -D0-I-  .byte $09 ; <indirect ref>
  0x0399FB $99EB: ------  .byte $07
  0x0399FC $99EC: -D0-I-  .byte $00 ; <indirect ref>
  0x0399FD $99ED: -D0-I-  .byte $00 ; <indirect ref>
  0x0399FE $99EE: -D0-I-  .byte $00 ; <indirect ref>
  0x0399FF $99EF: ------  .byte $00
  0x039A00 $99F0: -D0-I-  .byte $2B ; <indirect ref>
  0x039A01 $99F1: ------  .byte $00
  0x039A02 $99F2: -D0-I-  .byte $93 ; <indirect ref>
  0x039A03 $99F3: -D0-I-  .byte $0A ; <indirect ref>
  0x039A04 $99F4: -D0-I-  .byte $00 ; <indirect ref>
  0x039A05 $99F5: -D0-I-  .byte $00 ; <indirect ref>
  0x039A06 $99F6: -D0-I-  .byte $12 ; <indirect ref>
  0x039A07 $99F7: -D0-I-  .byte $07 ; <indirect ref>
  0x039A08 $99F8: -D0-I-  .byte $00 ; <indirect ref>
  0x039A09 $99F9: -D0-I-  .byte $00 ; <indirect ref>
  0x039A0A $99FA: -D0-I-  .byte $00 ; <indirect ref>
  0x039A0B $99FB: -D0-I-  .byte $00 ; <indirect ref>
  0x039A0C $99FC: -D0-I-  .byte $2A ; <indirect ref>
  0x039A0D $99FD: ------  .byte $00
  0x039A0E $99FE: -D0-I-  .byte $94 ; <indirect ref>
  0x039A0F $99FF: -D0-I-  .byte $00 ; <indirect ref>
  0x039A10 $9A00: -D0-I-  .byte $02 ; <indirect ref>
  0x039A11 $9A01: -D0-I-  .byte $00 ; <indirect ref>
  0x039A12 $9A02: -D0-I-  .byte $14 ; <indirect ref>
  0x039A13 $9A03: ------  .byte $03
  0x039A14 $9A04: -D0-I-  .byte $00 ; <indirect ref>
  0x039A15 $9A05: -D0-I-  .byte $00 ; <indirect ref>
  0x039A16 $9A06: ------  .byte $00
  0x039A17 $9A07: ------  .byte $00
  0x039A18 $9A08: -D0-I-  .byte $29 ; <indirect ref>
  0x039A19 $9A09: ------  .byte $00
  0x039A1A $9A0A: -D0-I-  .byte $95 ; <indirect ref>
  0x039A1B $9A0B: -D0-I-  .byte $00 ; <indirect ref>
  0x039A1C $9A0C: -D0-I-  .byte $02 ; <indirect ref>
  0x039A1D $9A0D: -D0-I-  .byte $00 ; <indirect ref>
  0x039A1E $9A0E: -D0-I-  .byte $14 ; <indirect ref>
  0x039A1F $9A0F: ------  .byte $07
  0x039A20 $9A10: -D0-I-  .byte $00 ; <indirect ref>
  0x039A21 $9A11: -D0-I-  .byte $00 ; <indirect ref>
  0x039A22 $9A12: -D0-I-  .byte $00 ; <indirect ref>
  0x039A23 $9A13: -D0-I-  .byte $00 ; <indirect ref>
  0x039A24 $9A14: -D0-I-  .byte $29 ; <indirect ref>
  0x039A25 $9A15: ------  .byte $00
  0x039A26 $9A16: -D0-I-  .byte $96 ; <indirect ref>
  0x039A27 $9A17: -D0-I-  .byte $0B ; <indirect ref>
  0x039A28 $9A18: -D0-I-  .byte $08 ; <indirect ref>
  0x039A29 $9A19: -D0-I-  .byte $00 ; <indirect ref>
  0x039A2A $9A1A: -D0-I-  .byte $01 ; <indirect ref>
  0x039A2B $9A1B: -D0-I-  .byte $06 ; <indirect ref>
  0x039A2C $9A1C: -D0-I-  .byte $00 ; <indirect ref>
  0x039A2D $9A1D: -D0-I-  .byte $02 ; <indirect ref>
  0x039A2E $9A1E: -D0-I-  .byte $02 ; <indirect ref>
  0x039A2F $9A1F: -D0-I-  .byte $02 ; <indirect ref>
  0x039A30 $9A20: -D0-I-  .byte $29 ; <indirect ref>
  0x039A31 $9A21: ------  .byte $00
  0x039A32 $9A22: -D0-I-  .byte $97 ; <indirect ref>
  0x039A33 $9A23: -D0-I-  .byte $0B ; <indirect ref>
  0x039A34 $9A24: -D0-I-  .byte $20 ; <indirect ref>
  0x039A35 $9A25: -D0-I-  .byte $00 ; <indirect ref>
  0x039A36 $9A26: -D0-I-  .byte $12 ; <indirect ref>
  0x039A37 $9A27: ------  .byte $07
  0x039A38 $9A28: -D0-I-  .byte $00 ; <indirect ref>
  0x039A39 $9A29: -D0-I-  .byte $00 ; <indirect ref>
  0x039A3A $9A2A: ------  .byte $00
  0x039A3B $9A2B: -D0-I-  .byte $00 ; <indirect ref>
  0x039A3C $9A2C: -D0-I-  .byte $29 ; <indirect ref>
  0x039A3D $9A2D: ------  .byte $00
  0x039A3E $9A2E: -D0-I-  .byte $24 ; <indirect ref>
  0x039A3F $9A2F: -D0-I-  .byte $00 ; <indirect ref>
  0x039A40 $9A30: ------  .byte $00
  0x039A41 $9A31: ------  .byte $00
  0x039A42 $9A32: -D0-I-  .byte $05 ; <indirect ref>
  0x039A43 $9A33: -D0-I-  .byte $00 ; <indirect ref>
  0x039A44 $9A34: -D0-I-  .byte $00 ; <indirect ref>
  0x039A45 $9A35: ------  .byte $00
  0x039A46 $9A36: ------  .byte $00
  0x039A47 $9A37: ------  .byte $00
  0x039A48 $9A38: ------  .byte $00
  0x039A49 $9A39: ------  .byte $00
  0x039A4A $9A3A: -D0-I-  .byte $98 ; <indirect ref>
  0x039A4B $9A3B: -D0-I-  .byte $1B ; <indirect ref>
  0x039A4C $9A3C: -D0-I-  .byte $00 ; <indirect ref>
  0x039A4D $9A3D: -D0-I-  .byte $00 ; <indirect ref>
  0x039A4E $9A3E: -D0-I-  .byte $1C ; <indirect ref>
  0x039A4F $9A3F: -D0-I-  .byte $08 ; <indirect ref>
  0x039A50 $9A40: ------  .byte $00
  0x039A51 $9A41: -D0-I-  .byte $00 ; <indirect ref>
  0x039A52 $9A42: ------  .byte $00
  0x039A53 $9A43: ------  .byte $00
  0x039A54 $9A44: -D0-I-  .byte $2F ; <indirect ref>
  0x039A55 $9A45: ------  .byte $00
  0x039A56 $9A46: -D0-I-  .byte $04 ; <indirect ref>
  0x039A57 $9A47: -D0-I-  .byte $00 ; <indirect ref>
  0x039A58 $9A48: ------  .byte $00
  0x039A59 $9A49: ------  .byte $00
  0x039A5A $9A4A: -D0-I-  .byte $00 ; <indirect ref>
  0x039A5B $9A4B: -D0-I-  .byte $04 ; <indirect ref>
  0x039A5C $9A4C: -D0-I-  .byte $00 ; <indirect ref>
  0x039A5D $9A4D: ------  .byte $00
  0x039A5E $9A4E: ------  .byte $00
  0x039A5F $9A4F: ------  .byte $00
  0x039A60 $9A50: ------  .byte $00
  0x039A61 $9A51: ------  .byte $00
  0x039A62 $9A52: -D0-I-  .byte $18 ; <indirect ref>
  0x039A63 $9A53: -D0-I-  .byte $00 ; <indirect ref>
  0x039A64 $9A54: -D0-I-  .byte $10 ; <indirect ref>
  0x039A65 $9A55: -D0-I-  .byte $03 ; <indirect ref>
  0x039A66 $9A56: -D0-I-  .byte $00 ; <indirect ref>
  0x039A67 $9A57: -D0-I-  .byte $00 ; <indirect ref>
  0x039A68 $9A58: -D0-I-  .byte $00 ; <indirect ref>
  0x039A69 $9A59: -D0-I-  .byte $00 ; <indirect ref>
  0x039A6A $9A5A: -D0-I-  .byte $00 ; <indirect ref>
  0x039A6B $9A5B: -D0-I-  .byte $00 ; <indirect ref>
  0x039A6C $9A5C: -D0-I-  .byte $00 ; <indirect ref>
  0x039A6D $9A5D: ------  .byte $00
  0x039A6E $9A5E: -D0-I-  .byte $19 ; <indirect ref>
  0x039A6F $9A5F: -D0-I-  .byte $00 ; <indirect ref>
  0x039A70 $9A60: -D0-I-  .byte $00 ; <indirect ref>
  0x039A71 $9A61: -D0-I-  .byte $00 ; <indirect ref>
  0x039A72 $9A62: -D0-I-  .byte $00 ; <indirect ref>
  0x039A73 $9A63: -D0-I-  .byte $00 ; <indirect ref>
  0x039A74 $9A64: ------  .byte $00
  0x039A75 $9A65: -D0-I-  .byte $00 ; <indirect ref>
  0x039A76 $9A66: -D0-I-  .byte $00 ; <indirect ref>
  0x039A77 $9A67: ------  .byte $00
  0x039A78 $9A68: -D0-I-  .byte $01 ; <indirect ref>
  0x039A79 $9A69: ------  .byte $00
  0x039A7A $9A6A: -D0-I-  .byte $05 ; <indirect ref>
  0x039A7B $9A6B: -D0-I-  .byte $00 ; <indirect ref>
  0x039A7C $9A6C: ------  .byte $00
  0x039A7D $9A6D: ------  .byte $00
  0x039A7E $9A6E: -D0-I-  .byte $01 ; <indirect ref>
  0x039A7F $9A6F: -D0-I-  .byte $01 ; <indirect ref>
  0x039A80 $9A70: -D0-I-  .byte $00 ; <indirect ref>
  0x039A81 $9A71: ------  .byte $00
  0x039A82 $9A72: ------  .byte $00
  0x039A83 $9A73: ------  .byte $00
  0x039A84 $9A74: ------  .byte $00
  0x039A85 $9A75: ------  .byte $00
  0x039A86 $9A76: -D0-I-  .byte $1A ; <indirect ref>
  0x039A87 $9A77: -D0-I-  .byte $00 ; <indirect ref>
  0x039A88 $9A78: -D0-I-  .byte $14 ; <indirect ref>
  0x039A89 $9A79: -D0-I-  .byte $02 ; <indirect ref>
  0x039A8A $9A7A: -D0-I-  .byte $01 ; <indirect ref>
  0x039A8B $9A7B: -D0-I-  .byte $00 ; <indirect ref>
  0x039A8C $9A7C: -D0-I-  .byte $03 ; <indirect ref>
  0x039A8D $9A7D: -D0-I-  .byte $00 ; <indirect ref>
  0x039A8E $9A7E: -D0-I-  .byte $00 ; <indirect ref>
  0x039A8F $9A7F: -D0-I-  .byte $01 ; <indirect ref>
  0x039A90 $9A80: -D0-I-  .byte $02 ; <indirect ref>
  0x039A91 $9A81: ------  .byte $00
  0x039A92 $9A82: -D0-I-  .byte $1B ; <indirect ref>
  0x039A93 $9A83: -D0-I-  .byte $00 ; <indirect ref>
  0x039A94 $9A84: -D0-I-  .byte $00 ; <indirect ref>
  0x039A95 $9A85: -D0-I-  .byte $00 ; <indirect ref>
  0x039A96 $9A86: -D0-I-  .byte $01 ; <indirect ref>
  0x039A97 $9A87: -D0-I-  .byte $01 ; <indirect ref>
  0x039A98 $9A88: -D0-I-  .byte $00 ; <indirect ref>
  0x039A99 $9A89: -D0-I-  .byte $00 ; <indirect ref>
  0x039A9A $9A8A: ------  .byte $00
  0x039A9B $9A8B: -D0-I-  .byte $00 ; <indirect ref>
  0x039A9C $9A8C: -D0-I-  .byte $1E ; <indirect ref>
  0x039A9D $9A8D: ------  .byte $00
  0x039A9E $9A8E: -D0-I-  .byte $1E ; <indirect ref>
  0x039A9F $9A8F: -D0-I-  .byte $00 ; <indirect ref>
  0x039AA0 $9A90: -D0-I-  .byte $18 ; <indirect ref>
  0x039AA1 $9A91: -D0-I-  .byte $02 ; <indirect ref>
  0x039AA2 $9A92: -D0-I-  .byte $00 ; <indirect ref>
  0x039AA3 $9A93: ------  .byte $00
  0x039AA4 $9A94: -D0-I-  .byte $00 ; <indirect ref>
  0x039AA5 $9A95: -D0-I-  .byte $00 ; <indirect ref>
  0x039AA6 $9A96: ------  .byte $00
  0x039AA7 $9A97: -D0-I-  .byte $00 ; <indirect ref>
  0x039AA8 $9A98: -D0-I-  .byte $00 ; <indirect ref>
  0x039AA9 $9A99: ------  .byte $00
  0x039AAA $9A9A: -D0-I-  .byte $1F ; <indirect ref>
  0x039AAB $9A9B: -D0-I-  .byte $00 ; <indirect ref>
  0x039AAC $9A9C: -D0-I-  .byte $00 ; <indirect ref>
  0x039AAD $9A9D: -D0-I-  .byte $00 ; <indirect ref>
  0x039AAE $9A9E: -D0-I-  .byte $00 ; <indirect ref>
  0x039AAF $9A9F: -D0-I-  .byte $00 ; <indirect ref>
  0x039AB0 $9AA0: -D0-I-  .byte $00 ; <indirect ref>
  0x039AB1 $9AA1: -D0-I-  .byte $00 ; <indirect ref>
  0x039AB2 $9AA2: -D0-I-  .byte $00 ; <indirect ref>
  0x039AB3 $9AA3: -D0-I-  .byte $00 ; <indirect ref>
  0x039AB4 $9AA4: -D0-I-  .byte $01 ; <indirect ref>
  0x039AB5 $9AA5: ------  .byte $00
  0x039AB6 $9AA6: -D0-I-  .byte $07 ; <indirect ref>
  0x039AB7 $9AA7: -D0-I-  .byte $00 ; <indirect ref>
  0x039AB8 $9AA8: ------  .byte $00
  0x039AB9 $9AA9: ------  .byte $00
  0x039ABA $9AAA: -D0-I-  .byte $00 ; <indirect ref>
  0x039ABB $9AAB: -D0-I-  .byte $01 ; <indirect ref>
  0x039ABC $9AAC: -D0-I-  .byte $00 ; <indirect ref>
  0x039ABD $9AAD: ------  .byte $00
  0x039ABE $9AAE: ------  .byte $00
  0x039ABF $9AAF: ------  .byte $00
  0x039AC0 $9AB0: ------  .byte $00
  0x039AC1 $9AB1: ------  .byte $00
  0x039AC2 $9AB2: -D0-I-  .byte $21 ; <indirect ref>
  0x039AC3 $9AB3: -D0-I-  .byte $00 ; <indirect ref>
  0x039AC4 $9AB4: -D0-I-  .byte $20 ; <indirect ref>
  0x039AC5 $9AB5: -D0-I-  .byte $03 ; <indirect ref>
  0x039AC6 $9AB6: -D0-I-  .byte $01 ; <indirect ref>
  0x039AC7 $9AB7: -D0-I-  .byte $00 ; <indirect ref>
  0x039AC8 $9AB8: -D0-I-  .byte $03 ; <indirect ref>
  0x039AC9 $9AB9: -D0-I-  .byte $00 ; <indirect ref>
  0x039ACA $9ABA: -D0-I-  .byte $00 ; <indirect ref>
  0x039ACB $9ABB: -D0-I-  .byte $01 ; <indirect ref>
  0x039ACC $9ABC: -D0-I-  .byte $00 ; <indirect ref>
  0x039ACD $9ABD: ------  .byte $00
  0x039ACE $9ABE: -D0-I-  .byte $22 ; <indirect ref>
  0x039ACF $9ABF: -D0-I-  .byte $00 ; <indirect ref>
  0x039AD0 $9AC0: -D0-I-  .byte $00 ; <indirect ref>
  0x039AD1 $9AC1: -D0-I-  .byte $00 ; <indirect ref>
  0x039AD2 $9AC2: -D0-I-  .byte $00 ; <indirect ref>
  0x039AD3 $9AC3: -D0-I-  .byte $01 ; <indirect ref>
  0x039AD4 $9AC4: -D0-I-  .byte $00 ; <indirect ref>
  0x039AD5 $9AC5: -D0-I-  .byte $00 ; <indirect ref>
  0x039AD6 $9AC6: ------  .byte $00
  0x039AD7 $9AC7: -D0-I-  .byte $00 ; <indirect ref>
  0x039AD8 $9AC8: -D0-I-  .byte $03 ; <indirect ref>
  0x039AD9 $9AC9: ------  .byte $00
  0x039ADA $9ACA: -D0-I-  .byte $08 ; <indirect ref>
  0x039ADB $9ACB: -D0-I-  .byte $00 ; <indirect ref>
  0x039ADC $9ACC: ------  .byte $00
  0x039ADD $9ACD: ------  .byte $00
  0x039ADE $9ACE: -D0-I-  .byte $00 ; <indirect ref>
  0x039ADF $9ACF: -D0-I-  .byte $00 ; <indirect ref>
  0x039AE0 $9AD0: -D0-I-  .byte $00 ; <indirect ref>
  0x039AE1 $9AD1: ------  .byte $00
  0x039AE2 $9AD2: ------  .byte $00
  0x039AE3 $9AD3: ------  .byte $00
  0x039AE4 $9AD4: ------  .byte $00
  0x039AE5 $9AD5: ------  .byte $00
  0x039AE6 $9AD6: -D0-I-  .byte $25 ; <indirect ref>
  0x039AE7 $9AD7: -D0-I-  .byte $00 ; <indirect ref>
  0x039AE8 $9AD8: -D0-I-  .byte $00 ; <indirect ref>
  0x039AE9 $9AD9: -D0-I-  .byte $00 ; <indirect ref>
  0x039AEA $9ADA: -D0-I-  .byte $01 ; <indirect ref>
  0x039AEB $9ADB: ------  .byte $00
  0x039AEC $9ADC: -D0-I-  .byte $00 ; <indirect ref>
  0x039AED $9ADD: -D0-I-  .byte $00 ; <indirect ref>
  0x039AEE $9ADE: ------  .byte $00
  0x039AEF $9ADF: -D0-I-  .byte $00 ; <indirect ref>
  0x039AF0 $9AE0: -D0-I-  .byte $05 ; <indirect ref>
  0x039AF1 $9AE1: ------  .byte $00
  0x039AF2 $9AE2: -D0-I-  .byte $26 ; <indirect ref>
  0x039AF3 $9AE3: -D0-I-  .byte $00 ; <indirect ref>
  0x039AF4 $9AE4: -D0-I-  .byte $00 ; <indirect ref>
  0x039AF5 $9AE5: -D0-I-  .byte $00 ; <indirect ref>
  0x039AF6 $9AE6: -D0-I-  .byte $01 ; <indirect ref>
  0x039AF7 $9AE7: -D0-I-  .byte $01 ; <indirect ref>
  0x039AF8 $9AE8: -D0-I-  .byte $00 ; <indirect ref>
  0x039AF9 $9AE9: -D0-I-  .byte $00 ; <indirect ref>
  0x039AFA $9AEA: ------  .byte $00
  0x039AFB $9AEB: -D0-I-  .byte $00 ; <indirect ref>
  0x039AFC $9AEC: -D0-I-  .byte $04 ; <indirect ref>
  0x039AFD $9AED: ------  .byte $00
  0x039AFE $9AEE: -D0-I-  .byte $09 ; <indirect ref>
  0x039AFF $9AEF: -D0-I-  .byte $00 ; <indirect ref>
  0x039B00 $9AF0: ------  .byte $00
  0x039B01 $9AF1: ------  .byte $00
  0x039B02 $9AF2: -D0-I-  .byte $00 ; <indirect ref>
  0x039B03 $9AF3: -D0-I-  .byte $00 ; <indirect ref>
  0x039B04 $9AF4: -D0-I-  .byte $00 ; <indirect ref>
  0x039B05 $9AF5: ------  .byte $00
  0x039B06 $9AF6: ------  .byte $00
  0x039B07 $9AF7: ------  .byte $00
  0x039B08 $9AF8: ------  .byte $00
  0x039B09 $9AF9: ------  .byte $00
  0x039B0A $9AFA: -D0-I-  .byte $29 ; <indirect ref>
  0x039B0B $9AFB: -D0-I-  .byte $00 ; <indirect ref>
  0x039B0C $9AFC: -D0-I-  .byte $00 ; <indirect ref>
  0x039B0D $9AFD: -D0-I-  .byte $00 ; <indirect ref>
  0x039B0E $9AFE: -D0-I-  .byte $01 ; <indirect ref>
  0x039B0F $9AFF: ------  .byte $01
  0x039B10 $9B00: -D0-I-  .byte $00 ; <indirect ref>
  0x039B11 $9B01: -D0-I-  .byte $00 ; <indirect ref>
  0x039B12 $9B02: ------  .byte $00
  0x039B13 $9B03: -D0-I-  .byte $00 ; <indirect ref>
  0x039B14 $9B04: -D0-I-  .byte $06 ; <indirect ref>
  0x039B15 $9B05: ------  .byte $00
  0x039B16 $9B06: -D0-I-  .byte $2A ; <indirect ref>
  0x039B17 $9B07: -D0-I-  .byte $00 ; <indirect ref>
  0x039B18 $9B08: -D0-I-  .byte $00 ; <indirect ref>
  0x039B19 $9B09: -D0-I-  .byte $00 ; <indirect ref>
  0x039B1A $9B0A: -D0-I-  .byte $01 ; <indirect ref>
  0x039B1B $9B0B: -D0-I-  .byte $00 ; <indirect ref>
  0x039B1C $9B0C: -D0-I-  .byte $00 ; <indirect ref>
  0x039B1D $9B0D: -D0-I-  .byte $00 ; <indirect ref>
  0x039B1E $9B0E: -D0-I-  .byte $00 ; <indirect ref>
  0x039B1F $9B0F: -D0-I-  .byte $01 ; <indirect ref>
  0x039B20 $9B10: -D0-I-  .byte $07 ; <indirect ref>
  0x039B21 $9B11: ------  .byte $00
  0x039B22 $9B12: -D0-I-  .byte $0A ; <indirect ref>
  0x039B23 $9B13: -D0-I-  .byte $00 ; <indirect ref>
  0x039B24 $9B14: ------  .byte $00
  0x039B25 $9B15: ------  .byte $00
  0x039B26 $9B16: -D0-I-  .byte $00 ; <indirect ref>
  0x039B27 $9B17: -D0-I-  .byte $00 ; <indirect ref>
  0x039B28 $9B18: -D0-I-  .byte $00 ; <indirect ref>
  0x039B29 $9B19: ------  .byte $00
  0x039B2A $9B1A: ------  .byte $00
  0x039B2B $9B1B: ------  .byte $00
  0x039B2C $9B1C: ------  .byte $00
  0x039B2D $9B1D: ------  .byte $00
  0x039B2E $9B1E: -D0-I-  .byte $2E ; <indirect ref>
  0x039B2F $9B1F: -D0-I-  .byte $00 ; <indirect ref>
  0x039B30 $9B20: -D0-I-  .byte $00 ; <indirect ref>
  0x039B31 $9B21: -D0-I-  .byte $00 ; <indirect ref>
  0x039B32 $9B22: -D0-I-  .byte $01 ; <indirect ref>
  0x039B33 $9B23: ------  .byte $00
  0x039B34 $9B24: -D0-I-  .byte $00 ; <indirect ref>
  0x039B35 $9B25: -D0-I-  .byte $00 ; <indirect ref>
  0x039B36 $9B26: -D0-I-  .byte $00 ; <indirect ref>
  0x039B37 $9B27: -D0-I-  .byte $00 ; <indirect ref>
  0x039B38 $9B28: -D0-I-  .byte $08 ; <indirect ref>
  0x039B39 $9B29: ------  .byte $00
  0x039B3A $9B2A: -D0-I-  .byte $2F ; <indirect ref>
  0x039B3B $9B2B: -D0-I-  .byte $00 ; <indirect ref>
  0x039B3C $9B2C: -D0-I-  .byte $00 ; <indirect ref>
  0x039B3D $9B2D: -D0-I-  .byte $00 ; <indirect ref>
  0x039B3E $9B2E: -D0-I-  .byte $01 ; <indirect ref>
  0x039B3F $9B2F: -D0-I-  .byte $00 ; <indirect ref>
  0x039B40 $9B30: -D0-I-  .byte $00 ; <indirect ref>
  0x039B41 $9B31: -D0-I-  .byte $00 ; <indirect ref>
  0x039B42 $9B32: -D0-I-  .byte $00 ; <indirect ref>
  0x039B43 $9B33: -D0-I-  .byte $00 ; <indirect ref>
  0x039B44 $9B34: -D0-I-  .byte $08 ; <indirect ref>
  0x039B45 $9B35: ------  .byte $00
  0x039B46 $9B36: -D0-I-  .byte $0B ; <indirect ref>
  0x039B47 $9B37: -D0-I-  .byte $00 ; <indirect ref>
  0x039B48 $9B38: ------  .byte $00
  0x039B49 $9B39: ------  .byte $00
  0x039B4A $9B3A: -D0-I-  .byte $00 ; <indirect ref>
  0x039B4B $9B3B: -D0-I-  .byte $00 ; <indirect ref>
  0x039B4C $9B3C: -D0-I-  .byte $00 ; <indirect ref>
  0x039B4D $9B3D: ------  .byte $00
  0x039B4E $9B3E: ------  .byte $00
  0x039B4F $9B3F: ------  .byte $00
  0x039B50 $9B40: ------  .byte $03
  0x039B51 $9B41: ------  .byte $00
  0x039B52 $9B42: -D0-I-  .byte $32 ; <indirect ref>
  0x039B53 $9B43: -D0-I-  .byte $00 ; <indirect ref>
  0x039B54 $9B44: -D0-I-  .byte $00 ; <indirect ref>
  0x039B55 $9B45: -D0-I-  .byte $00 ; <indirect ref>
  0x039B56 $9B46: -D0-I-  .byte $01 ; <indirect ref>
  0x039B57 $9B47: -D0-I-  .byte $00 ; <indirect ref>
  0x039B58 $9B48: -D0-I-  .byte $00 ; <indirect ref>
  0x039B59 $9B49: -D0-I-  .byte $00 ; <indirect ref>
  0x039B5A $9B4A: ------  .byte $00
  0x039B5B $9B4B: -D0-I-  .byte $00 ; <indirect ref>
  0x039B5C $9B4C: -D0-I-  .byte $00 ; <indirect ref>
  0x039B5D $9B4D: ------  .byte $00
  0x039B5E $9B4E: -D0-I-  .byte $33 ; <indirect ref>
  0x039B5F $9B4F: -D0-I-  .byte $00 ; <indirect ref>
  0x039B60 $9B50: -D0-I-  .byte $00 ; <indirect ref>
  0x039B61 $9B51: -D0-I-  .byte $00 ; <indirect ref>
  0x039B62 $9B52: -D0-I-  .byte $01 ; <indirect ref>
  0x039B63 $9B53: -D0-I-  .byte $00 ; <indirect ref>
  0x039B64 $9B54: -D0-I-  .byte $00 ; <indirect ref>
  0x039B65 $9B55: -D0-I-  .byte $00 ; <indirect ref>
  0x039B66 $9B56: -D0-I-  .byte $00 ; <indirect ref>
  0x039B67 $9B57: -D0-I-  .byte $00 ; <indirect ref>
  0x039B68 $9B58: -D0-I-  .byte $03 ; <indirect ref>
  0x039B69 $9B59: ------  .byte $00
  0x039B6A $9B5A: -D0-I-  .byte $35 ; <indirect ref>
  0x039B6B $9B5B: -D0-I-  .byte $00 ; <indirect ref>
  0x039B6C $9B5C: -D0-I-  .byte $00 ; <indirect ref>
  0x039B6D $9B5D: -D0-I-  .byte $00 ; <indirect ref>
  0x039B6E $9B5E: -D0-I-  .byte $01 ; <indirect ref>
  0x039B6F $9B5F: -D0-I-  .byte $00 ; <indirect ref>
  0x039B70 $9B60: -D0-I-  .byte $00 ; <indirect ref>
  0x039B71 $9B61: -D0-I-  .byte $00 ; <indirect ref>
  0x039B72 $9B62: -D0-I-  .byte $00 ; <indirect ref>
  0x039B73 $9B63: -D0-I-  .byte $00 ; <indirect ref>
  0x039B74 $9B64: -D0-I-  .byte $08 ; <indirect ref>
  0x039B75 $9B65: ------  .byte $00
  0x039B76 $9B66: -D0-I-  .byte $36 ; <indirect ref>
  0x039B77 $9B67: -D0-I-  .byte $00 ; <indirect ref>
  0x039B78 $9B68: -D0-I-  .byte $00 ; <indirect ref>
  0x039B79 $9B69: -D0-I-  .byte $00 ; <indirect ref>
  0x039B7A $9B6A: -D0-I-  .byte $01 ; <indirect ref>
  0x039B7B $9B6B: -D0-I-  .byte $00 ; <indirect ref>
  0x039B7C $9B6C: -D0-I-  .byte $00 ; <indirect ref>
  0x039B7D $9B6D: -D0-I-  .byte $00 ; <indirect ref>
  0x039B7E $9B6E: -D0-I-  .byte $00 ; <indirect ref>
  0x039B7F $9B6F: -D0-I-  .byte $00 ; <indirect ref>
  0x039B80 $9B70: -D0-I-  .byte $13 ; <indirect ref>
  0x039B81 $9B71: ------  .byte $00
  0x039B82 $9B72: -D0-I-  .byte $0D ; <indirect ref>
  0x039B83 $9B73: -D0-I-  .byte $00 ; <indirect ref>
  0x039B84 $9B74: ------  .byte $00
  0x039B85 $9B75: ------  .byte $00
  0x039B86 $9B76: -D0-I-  .byte $00 ; <indirect ref>
  0x039B87 $9B77: -D0-I-  .byte $00 ; <indirect ref>
  0x039B88 $9B78: -D0-I-  .byte $00 ; <indirect ref>
  0x039B89 $9B79: ------  .byte $00
  0x039B8A $9B7A: ------  .byte $00
  0x039B8B $9B7B: ------  .byte $00
  0x039B8C $9B7C: ------  .byte $00
  0x039B8D $9B7D: ------  .byte $00
  0x039B8E $9B7E: -D0-I-  .byte $38 ; <indirect ref>
  0x039B8F $9B7F: -D0-I-  .byte $00 ; <indirect ref>
  0x039B90 $9B80: -D0-I-  .byte $00 ; <indirect ref>
  0x039B91 $9B81: -D0-I-  .byte $00 ; <indirect ref>
  0x039B92 $9B82: -D0-I-  .byte $00 ; <indirect ref>
  0x039B93 $9B83: ------  .byte $00
  0x039B94 $9B84: -D0-I-  .byte $00 ; <indirect ref>
  0x039B95 $9B85: -D0-I-  .byte $00 ; <indirect ref>
  0x039B96 $9B86: ------  .byte $00
  0x039B97 $9B87: -D0-I-  .byte $00 ; <indirect ref>
  0x039B98 $9B88: -D0-I-  .byte $09 ; <indirect ref>
  0x039B99 $9B89: ------  .byte $00
  0x039B9A $9B8A: -D0-I-  .byte $39 ; <indirect ref>
  0x039B9B $9B8B: -D0-I-  .byte $00 ; <indirect ref>
  0x039B9C $9B8C: -D0-I-  .byte $00 ; <indirect ref>
  0x039B9D $9B8D: -D0-I-  .byte $00 ; <indirect ref>
  0x039B9E $9B8E: -D0-I-  .byte $00 ; <indirect ref>
  0x039B9F $9B8F: -D0-I-  .byte $00 ; <indirect ref>
  0x039BA0 $9B90: -D0-I-  .byte $00 ; <indirect ref>
  0x039BA1 $9B91: -D0-I-  .byte $00 ; <indirect ref>
  0x039BA2 $9B92: -D0-I-  .byte $00 ; <indirect ref>
  0x039BA3 $9B93: -D0-I-  .byte $00 ; <indirect ref>
  0x039BA4 $9B94: -D0-I-  .byte $0A ; <indirect ref>
  0x039BA5 $9B95: ------  .byte $00
  0x039BA6 $9B96: -D0-I-  .byte $0E ; <indirect ref>
  0x039BA7 $9B97: -D0-I-  .byte $00 ; <indirect ref>
  0x039BA8 $9B98: ------  .byte $00
  0x039BA9 $9B99: ------  .byte $00
  0x039BAA $9B9A: -D0-I-  .byte $00 ; <indirect ref>
  0x039BAB $9B9B: -D0-I-  .byte $00 ; <indirect ref>
  0x039BAC $9B9C: -D0-I-  .byte $00 ; <indirect ref>
  0x039BAD $9B9D: ------  .byte $00
  0x039BAE $9B9E: ------  .byte $00
  0x039BAF $9B9F: ------  .byte $00
  0x039BB0 $9BA0: ------  .byte $00
  0x039BB1 $9BA1: ------  .byte $00
  0x039BB2 $9BA2: -D0-I-  .byte $3B ; <indirect ref>
  0x039BB3 $9BA3: -D0-I-  .byte $00 ; <indirect ref>
  0x039BB4 $9BA4: -D0-I-  .byte $00 ; <indirect ref>
  0x039BB5 $9BA5: -D0-I-  .byte $00 ; <indirect ref>
  0x039BB6 $9BA6: -D0-I-  .byte $01 ; <indirect ref>
  0x039BB7 $9BA7: -D0-I-  .byte $03 ; <indirect ref>
  0x039BB8 $9BA8: -D0-I-  .byte $00 ; <indirect ref>
  0x039BB9 $9BA9: -D0-I-  .byte $00 ; <indirect ref>
  0x039BBA $9BAA: ------  .byte $00
  0x039BBB $9BAB: -D0-I-  .byte $00 ; <indirect ref>
  0x039BBC $9BAC: -D0-I-  .byte $0B ; <indirect ref>
  0x039BBD $9BAD: ------  .byte $00
  0x039BBE $9BAE: -D0-I-  .byte $3C ; <indirect ref>
  0x039BBF $9BAF: -D0-I-  .byte $00 ; <indirect ref>
  0x039BC0 $9BB0: -D0-I-  .byte $00 ; <indirect ref>
  0x039BC1 $9BB1: -D0-I-  .byte $00 ; <indirect ref>
  0x039BC2 $9BB2: -D0-I-  .byte $01 ; <indirect ref>
  0x039BC3 $9BB3: -D0-I-  .byte $05 ; <indirect ref>
  0x039BC4 $9BB4: ------  .byte $00
  0x039BC5 $9BB5: -D0-I-  .byte $00 ; <indirect ref>
  0x039BC6 $9BB6: -D0-I-  .byte $00 ; <indirect ref>
  0x039BC7 $9BB7: -D0-I-  .byte $00 ; <indirect ref>
  0x039BC8 $9BB8: -D0-I-  .byte $0D ; <indirect ref>
  0x039BC9 $9BB9: ------  .byte $00
  0x039BCA $9BBA: -D0-I-  .byte $3E ; <indirect ref>
  0x039BCB $9BBB: -D0-I-  .byte $00 ; <indirect ref>
  0x039BCC $9BBC: -D0-I-  .byte $00 ; <indirect ref>
  0x039BCD $9BBD: -D0-I-  .byte $00 ; <indirect ref>
  0x039BCE $9BBE: -D0-I-  .byte $01 ; <indirect ref>
  0x039BCF $9BBF: ------  .byte $00
  0x039BD0 $9BC0: -D0-I-  .byte $00 ; <indirect ref>
  0x039BD1 $9BC1: -D0-I-  .byte $00 ; <indirect ref>
  0x039BD2 $9BC2: ------  .byte $00
  0x039BD3 $9BC3: -D0-I-  .byte $00 ; <indirect ref>
  0x039BD4 $9BC4: -D0-I-  .byte $0E ; <indirect ref>
  0x039BD5 $9BC5: ------  .byte $00
  0x039BD6 $9BC6: -D0-I-  .byte $3F ; <indirect ref>
  0x039BD7 $9BC7: -D0-I-  .byte $00 ; <indirect ref>
  0x039BD8 $9BC8: -D0-I-  .byte $00 ; <indirect ref>
  0x039BD9 $9BC9: -D0-I-  .byte $00 ; <indirect ref>
  0x039BDA $9BCA: -D0-I-  .byte $01 ; <indirect ref>
  0x039BDB $9BCB: -D0-I-  .byte $00 ; <indirect ref>
  0x039BDC $9BCC: -D0-I-  .byte $00 ; <indirect ref>
  0x039BDD $9BCD: -D0-I-  .byte $00 ; <indirect ref>
  0x039BDE $9BCE: -D0-I-  .byte $00 ; <indirect ref>
  0x039BDF $9BCF: -D0-I-  .byte $00 ; <indirect ref>
  0x039BE0 $9BD0: -D0-I-  .byte $0E ; <indirect ref>
  0x039BE1 $9BD1: ------  .byte $00
  0x039BE2 $9BD2: -D0-I-  .byte $10 ; <indirect ref>
  0x039BE3 $9BD3: -D0-I-  .byte $00 ; <indirect ref>
  0x039BE4 $9BD4: ------  .byte $00
  0x039BE5 $9BD5: ------  .byte $00
  0x039BE6 $9BD6: -D0-I-  .byte $00 ; <indirect ref>
  0x039BE7 $9BD7: -D0-I-  .byte $00 ; <indirect ref>
  0x039BE8 $9BD8: ------  .byte $00
  0x039BE9 $9BD9: ------  .byte $00
  0x039BEA $9BDA: ------  .byte $00
  0x039BEB $9BDB: ------  .byte $00
  0x039BEC $9BDC: ------  .byte $00
  0x039BED $9BDD: ------  .byte $00
  0x039BEE $9BDE: -D0-I-  .byte $43 ; <indirect ref>
  0x039BEF $9BDF: -D0-I-  .byte $0F ; <indirect ref>
  0x039BF0 $9BE0: -D0-I-  .byte $D0 ; <indirect ref>
  0x039BF1 $9BE1: -D0-I-  .byte $08 ; <indirect ref>
  0x039BF2 $9BE2: -D0-I-  .byte $05 ; <indirect ref>
  0x039BF3 $9BE3: -D0-I-  .byte $03 ; <indirect ref>
  0x039BF4 $9BE4: -D0-I-  .byte $00 ; <indirect ref>
  0x039BF5 $9BE5: -D0-I-  .byte $00 ; <indirect ref>
  0x039BF6 $9BE6: ------  .byte $00
  0x039BF7 $9BE7: -D0-I-  .byte $00 ; <indirect ref>
  0x039BF8 $9BE8: -D0-I-  .byte $1E ; <indirect ref>
  0x039BF9 $9BE9: ------  .byte $00
  0x039BFA $9BEA: -D0-I-  .byte $44 ; <indirect ref>
  0x039BFB $9BEB: -D0-I-  .byte $00 ; <indirect ref>
  0x039BFC $9BEC: -D0-I-  .byte $00 ; <indirect ref>
  0x039BFD $9BED: -D0-I-  .byte $00 ; <indirect ref>
  0x039BFE $9BEE: -D0-I-  .byte $01 ; <indirect ref>
  0x039BFF $9BEF: -D0-I-  .byte $00 ; <indirect ref>
  0x039C00 $9BF0: -D0-I-  .byte $00 ; <indirect ref>
  0x039C01 $9BF1: -D0-I-  .byte $00 ; <indirect ref>
  0x039C02 $9BF2: -D0-I-  .byte $00 ; <indirect ref>
  0x039C03 $9BF3: -D0-I-  .byte $00 ; <indirect ref>
  0x039C04 $9BF4: -D0-I-  .byte $10 ; <indirect ref>
  0x039C05 $9BF5: ------  .byte $00
  0x039C06 $9BF6: -D0-I-  .byte $11 ; <indirect ref>
  0x039C07 $9BF7: -D0-I-  .byte $00 ; <indirect ref>
  0x039C08 $9BF8: ------  .byte $00
  0x039C09 $9BF9: ------  .byte $00
  0x039C0A $9BFA: -D0-I-  .byte $00 ; <indirect ref>
  0x039C0B $9BFB: -D0-I-  .byte $00 ; <indirect ref>
  0x039C0C $9BFC: ------  .byte $00
  0x039C0D $9BFD: ------  .byte $00
  0x039C0E $9BFE: ------  .byte $00
  0x039C0F $9BFF: ------  .byte $00
  0x039C10 $9C00: ------  .byte $00
  0x039C11 $9C01: ------  .byte $00
  0x039C12 $9C02: -D0-I-  .byte $46 ; <indirect ref>
  0x039C13 $9C03: -D0-I-  .byte $0F ; <indirect ref>
  0x039C14 $9C04: -D0-I-  .byte $00 ; <indirect ref>
  0x039C15 $9C05: -D0-I-  .byte $00 ; <indirect ref>
  0x039C16 $9C06: -D0-I-  .byte $01 ; <indirect ref>
  0x039C17 $9C07: ------  .byte $00
  0x039C18 $9C08: ------  .byte $00
  0x039C19 $9C09: -D0-I-  .byte $00 ; <indirect ref>
  0x039C1A $9C0A: ------  .byte $00
  0x039C1B $9C0B: -D0-I-  .byte $00 ; <indirect ref>
  0x039C1C $9C0C: -D0-I-  .byte $03 ; <indirect ref>
  0x039C1D $9C0D: ------  .byte $00
  0x039C1E $9C0E: -D0-I-  .byte $47 ; <indirect ref>
  0x039C1F $9C0F: -D0-I-  .byte $00 ; <indirect ref>
  0x039C20 $9C10: -D0-I-  .byte $00 ; <indirect ref>
  0x039C21 $9C11: -D0-I-  .byte $00 ; <indirect ref>
  0x039C22 $9C12: -D0-I-  .byte $01 ; <indirect ref>
  0x039C23 $9C13: -D0-I-  .byte $00 ; <indirect ref>
  0x039C24 $9C14: -D0-I-  .byte $00 ; <indirect ref>
  0x039C25 $9C15: -D0-I-  .byte $00 ; <indirect ref>
  0x039C26 $9C16: -D0-I-  .byte $00 ; <indirect ref>
  0x039C27 $9C17: -D0-I-  .byte $00 ; <indirect ref>
  0x039C28 $9C18: -D0-I-  .byte $03 ; <indirect ref>
  0x039C29 $9C19: ------  .byte $00
  0x039C2A $9C1A: -D0-I-  .byte $4A ; <indirect ref>
  0x039C2B $9C1B: -D0-I-  .byte $00 ; <indirect ref>
  0x039C2C $9C1C: -D0-I-  .byte $00 ; <indirect ref>
  0x039C2D $9C1D: -D0-I-  .byte $00 ; <indirect ref>
  0x039C2E $9C1E: -D0-I-  .byte $00 ; <indirect ref>
  0x039C2F $9C1F: ------  .byte $00
  0x039C30 $9C20: ------  .byte $00
  0x039C31 $9C21: -D0-I-  .byte $00 ; <indirect ref>
  0x039C32 $9C22: ------  .byte $00
  0x039C33 $9C23: -D0-I-  .byte $00 ; <indirect ref>
  0x039C34 $9C24: -D0-I-  .byte $11 ; <indirect ref>
  0x039C35 $9C25: ------  .byte $00
  0x039C36 $9C26: -D0-I-  .byte $4B ; <indirect ref>
  0x039C37 $9C27: -D0-I-  .byte $00 ; <indirect ref>
  0x039C38 $9C28: -D0-I-  .byte $00 ; <indirect ref>
  0x039C39 $9C29: -D0-I-  .byte $00 ; <indirect ref>
  0x039C3A $9C2A: -D0-I-  .byte $00 ; <indirect ref>
  0x039C3B $9C2B: -D0-I-  .byte $00 ; <indirect ref>
  0x039C3C $9C2C: ------  .byte $00
  0x039C3D $9C2D: -D0-I-  .byte $00 ; <indirect ref>
  0x039C3E $9C2E: ------  .byte $00
  0x039C3F $9C2F: ------  .byte $00
  0x039C40 $9C30: -D0-I-  .byte $11 ; <indirect ref>
  0x039C41 $9C31: ------  .byte $00
  0x039C42 $9C32: -D0-I-  .byte $14 ; <indirect ref>
  0x039C43 $9C33: -D0-I-  .byte $00 ; <indirect ref>
  0x039C44 $9C34: ------  .byte $00
  0x039C45 $9C35: ------  .byte $00
  0x039C46 $9C36: -D0-I-  .byte $00 ; <indirect ref>
  0x039C47 $9C37: -D0-I-  .byte $00 ; <indirect ref>
  0x039C48 $9C38: -D0-I-  .byte $00 ; <indirect ref>
  0x039C49 $9C39: ------  .byte $00
  0x039C4A $9C3A: ------  .byte $00
  0x039C4B $9C3B: ------  .byte $00
  0x039C4C $9C3C: ------  .byte $00
  0x039C4D $9C3D: ------  .byte $00
  0x039C4E $9C3E: -D0-I-  .byte $59 ; <indirect ref>
  0x039C4F $9C3F: -D0-I-  .byte $00 ; <indirect ref>
  0x039C50 $9C40: -D0-I-  .byte $00 ; <indirect ref>
  0x039C51 $9C41: -D0-I-  .byte $00 ; <indirect ref>
  0x039C52 $9C42: -D0-I-  .byte $00 ; <indirect ref>
  0x039C53 $9C43: -D0-I-  .byte $00 ; <indirect ref>
  0x039C54 $9C44: -D0-I-  .byte $00 ; <indirect ref>
  0x039C55 $9C45: -D0-I-  .byte $00 ; <indirect ref>
  0x039C56 $9C46: ------  .byte $00
  0x039C57 $9C47: ------  .byte $00
  0x039C58 $9C48: -D0-I-  .byte $00 ; <indirect ref>
  0x039C59 $9C49: ------  .byte $00
  0x039C5A $9C4A: -D0-I-  .byte $5A ; <indirect ref>
  0x039C5B $9C4B: -D0-I-  .byte $00 ; <indirect ref>
  0x039C5C $9C4C: -D0-I-  .byte $00 ; <indirect ref>
  0x039C5D $9C4D: -D0-I-  .byte $00 ; <indirect ref>
  0x039C5E $9C4E: -D0-I-  .byte $00 ; <indirect ref>
  0x039C5F $9C4F: -D0-I-  .byte $00 ; <indirect ref>
  0x039C60 $9C50: ------  .byte $00
  0x039C61 $9C51: -D0-I-  .byte $00 ; <indirect ref>
  0x039C62 $9C52: ------  .byte $00
  0x039C63 $9C53: ------  .byte $00
  0x039C64 $9C54: -D0-I-  .byte $03 ; <indirect ref>
  0x039C65 $9C55: ------  .byte $00
  0x039C66 $9C56: -D0-I-  .byte $15 ; <indirect ref>
  0x039C67 $9C57: -D0-I-  .byte $00 ; <indirect ref>
  0x039C68 $9C58: ------  .byte $00
  0x039C69 $9C59: ------  .byte $00
  0x039C6A $9C5A: -D0-I-  .byte $00 ; <indirect ref>
  0x039C6B $9C5B: -D0-I-  .byte $00 ; <indirect ref>
  0x039C6C $9C5C: ------  .byte $00
  0x039C6D $9C5D: ------  .byte $00
  0x039C6E $9C5E: ------  .byte $00
  0x039C6F $9C5F: ------  .byte $00
  0x039C70 $9C60: ------  .byte $00
  0x039C71 $9C61: ------  .byte $00
  0x039C72 $9C62: -D0-I-  .byte $5B ; <indirect ref>
  0x039C73 $9C63: -D0-I-  .byte $0F ; <indirect ref>
  0x039C74 $9C64: -D0-I-  .byte $00 ; <indirect ref>
  0x039C75 $9C65: -D0-I-  .byte $00 ; <indirect ref>
  0x039C76 $9C66: -D0-I-  .byte $01 ; <indirect ref>
  0x039C77 $9C67: ------  .byte $01
  0x039C78 $9C68: -D0-I-  .byte $00 ; <indirect ref>
  0x039C79 $9C69: -D0-I-  .byte $01 ; <indirect ref>
  0x039C7A $9C6A: ------  .byte $01
  0x039C7B $9C6B: -D0-I-  .byte $01 ; <indirect ref>
  0x039C7C $9C6C: -D0-I-  .byte $00 ; <indirect ref>
  0x039C7D $9C6D: ------  .byte $00
  0x039C7E $9C6E: -D0-I-  .byte $5C ; <indirect ref>
  0x039C7F $9C6F: -D0-I-  .byte $0F ; <indirect ref>
  0x039C80 $9C70: -D0-I-  .byte $00 ; <indirect ref>
  0x039C81 $9C71: -D0-I-  .byte $00 ; <indirect ref>
  0x039C82 $9C72: -D0-I-  .byte $01 ; <indirect ref>
  0x039C83 $9C73: -D0-I-  .byte $01 ; <indirect ref>
  0x039C84 $9C74: ------  .byte $00
  0x039C85 $9C75: -D0-I-  .byte $01 ; <indirect ref>
  0x039C86 $9C76: ------  .byte $01
  0x039C87 $9C77: -D0-I-  .byte $01 ; <indirect ref>
  0x039C88 $9C78: -D0-I-  .byte $03 ; <indirect ref>
  0x039C89 $9C79: ------  .byte $00
  0x039C8A $9C7A: -D0-I-  .byte $16 ; <indirect ref>
  0x039C8B $9C7B: -D0-I-  .byte $00 ; <indirect ref>
  0x039C8C $9C7C: ------  .byte $00
  0x039C8D $9C7D: ------  .byte $00
  0x039C8E $9C7E: -D0-I-  .byte $00 ; <indirect ref>
  0x039C8F $9C7F: -D0-I-  .byte $00 ; <indirect ref>
  0x039C90 $9C80: -D0-I-  .byte $00 ; <indirect ref>
  0x039C91 $9C81: ------  .byte $00
  0x039C92 $9C82: ------  .byte $00
  0x039C93 $9C83: ------  .byte $00
  0x039C94 $9C84: ------  .byte $00
  0x039C95 $9C85: ------  .byte $00
  0x039C96 $9C86: -D0-I-  .byte $5E ; <indirect ref>
  0x039C97 $9C87: -D0-I-  .byte $0F ; <indirect ref>
  0x039C98 $9C88: -D0-I-  .byte $00 ; <indirect ref>
  0x039C99 $9C89: -D0-I-  .byte $00 ; <indirect ref>
  0x039C9A $9C8A: -D0-I-  .byte $01 ; <indirect ref>
  0x039C9B $9C8B: -D0-I-  .byte $03 ; <indirect ref>
  0x039C9C $9C8C: -D0-I-  .byte $05 ; <indirect ref>
  0x039C9D $9C8D: -D0-I-  .byte $06 ; <indirect ref>
  0x039C9E $9C8E: ------  .byte $02
  0x039C9F $9C8F: -D0-I-  .byte $02 ; <indirect ref>
  0x039CA0 $9C90: -D0-I-  .byte $00 ; <indirect ref>
  0x039CA1 $9C91: ------  .byte $00
  0x039CA2 $9C92: -D0-I-  .byte $5F ; <indirect ref>
  0x039CA3 $9C93: -D0-I-  .byte $00 ; <indirect ref>
  0x039CA4 $9C94: -D0-I-  .byte $00 ; <indirect ref>
  0x039CA5 $9C95: -D0-I-  .byte $00 ; <indirect ref>
  0x039CA6 $9C96: -D0-I-  .byte $10 ; <indirect ref>
  0x039CA7 $9C97: -D0-I-  .byte $05 ; <indirect ref>
  0x039CA8 $9C98: ------  .byte $05
  0x039CA9 $9C99: -D0-I-  .byte $06 ; <indirect ref>
  0x039CAA $9C9A: -D0-I-  .byte $02 ; <indirect ref>
  0x039CAB $9C9B: -D0-I-  .byte $02 ; <indirect ref>
  0x039CAC $9C9C: -D0-I-  .byte $01 ; <indirect ref>
  0x039CAD $9C9D: ------  .byte $00
  0x039CAE $9C9E: -D0-I-  .byte $17 ; <indirect ref>
  0x039CAF $9C9F: -D0-I-  .byte $00 ; <indirect ref>
  0x039CB0 $9CA0: ------  .byte $00
  0x039CB1 $9CA1: ------  .byte $00
  0x039CB2 $9CA2: -D0-I-  .byte $00 ; <indirect ref>
  0x039CB3 $9CA3: -D0-I-  .byte $00 ; <indirect ref>
  0x039CB4 $9CA4: -D0-I-  .byte $00 ; <indirect ref>
  0x039CB5 $9CA5: ------  .byte $00
  0x039CB6 $9CA6: ------  .byte $00
  0x039CB7 $9CA7: ------  .byte $00
  0x039CB8 $9CA8: ------  .byte $00
  0x039CB9 $9CA9: ------  .byte $00
  0x039CBA $9CAA: -D0-I-  .byte $60 ; <indirect ref>
  0x039CBB $9CAB: -D0-I-  .byte $13 ; <indirect ref>
  0x039CBC $9CAC: -D0-I-  .byte $08 ; <indirect ref>
  0x039CBD $9CAD: -D0-I-  .byte $00 ; <indirect ref>
  0x039CBE $9CAE: -D0-I-  .byte $00 ; <indirect ref>
  0x039CBF $9CAF: -D0-I-  .byte $03 ; <indirect ref>
  0x039CC0 $9CB0: -D0-I-  .byte $05 ; <indirect ref>
  0x039CC1 $9CB1: -D0-I-  .byte $00 ; <indirect ref>
  0x039CC2 $9CB2: ------  .byte $00
  0x039CC3 $9CB3: -D0-I-  .byte $00 ; <indirect ref>
  0x039CC4 $9CB4: -D0-I-  .byte $00 ; <indirect ref>
  0x039CC5 $9CB5: ------  .byte $00
  0x039CC6 $9CB6: -D0-I-  .byte $61 ; <indirect ref>
  0x039CC7 $9CB7: -D0-I-  .byte $13 ; <indirect ref>
  0x039CC8 $9CB8: -D0-I-  .byte $00 ; <indirect ref>
  0x039CC9 $9CB9: -D0-I-  .byte $00 ; <indirect ref>
  0x039CCA $9CBA: -D0-I-  .byte $10 ; <indirect ref>
  0x039CCB $9CBB: -D0-I-  .byte $03 ; <indirect ref>
  0x039CCC $9CBC: -D0-I-  .byte $00 ; <indirect ref>
  0x039CCD $9CBD: -D0-I-  .byte $00 ; <indirect ref>
  0x039CCE $9CBE: -D0-I-  .byte $00 ; <indirect ref>
  0x039CCF $9CBF: -D0-I-  .byte $00 ; <indirect ref>
  0x039CD0 $9CC0: -D0-I-  .byte $01 ; <indirect ref>
  0x039CD1 $9CC1: ------  .byte $00
  0x039CD2 $9CC2: -D0-I-  .byte $18 ; <indirect ref>
  0x039CD3 $9CC3: -D0-I-  .byte $00 ; <indirect ref>
  0x039CD4 $9CC4: ------  .byte $00
  0x039CD5 $9CC5: ------  .byte $00
  0x039CD6 $9CC6: -D0-I-  .byte $00 ; <indirect ref>
  0x039CD7 $9CC7: -D0-I-  .byte $02 ; <indirect ref>
  0x039CD8 $9CC8: -D0-I-  .byte $00 ; <indirect ref>
  0x039CD9 $9CC9: ------  .byte $00
  0x039CDA $9CCA: ------  .byte $00
  0x039CDB $9CCB: ------  .byte $00
  0x039CDC $9CCC: ------  .byte $00
  0x039CDD $9CCD: ------  .byte $00
  0x039CDE $9CCE: -D0-I-  .byte $62 ; <indirect ref>
  0x039CDF $9CCF: -D0-I-  .byte $00 ; <indirect ref>
  0x039CE0 $9CD0: -D0-I-  .byte $00 ; <indirect ref>
  0x039CE1 $9CD1: -D0-I-  .byte $00 ; <indirect ref>
  0x039CE2 $9CD2: -D0-I-  .byte $01 ; <indirect ref>
  0x039CE3 $9CD3: -D0-I-  .byte $03 ; <indirect ref>
  0x039CE4 $9CD4: -D0-I-  .byte $00 ; <indirect ref>
  0x039CE5 $9CD5: -D0-I-  .byte $00 ; <indirect ref>
  0x039CE6 $9CD6: ------  .byte $00
  0x039CE7 $9CD7: -D0-I-  .byte $00 ; <indirect ref>
  0x039CE8 $9CD8: -D0-I-  .byte $00 ; <indirect ref>
  0x039CE9 $9CD9: ------  .byte $00
  0x039CEA $9CDA: -D0-I-  .byte $63 ; <indirect ref>
  0x039CEB $9CDB: -D0-I-  .byte $00 ; <indirect ref>
  0x039CEC $9CDC: -D0-I-  .byte $00 ; <indirect ref>
  0x039CED $9CDD: -D0-I-  .byte $00 ; <indirect ref>
  0x039CEE $9CDE: -D0-I-  .byte $10 ; <indirect ref>
  0x039CEF $9CDF: -D0-I-  .byte $03 ; <indirect ref>
  0x039CF0 $9CE0: -D0-I-  .byte $00 ; <indirect ref>
  0x039CF1 $9CE1: -D0-I-  .byte $00 ; <indirect ref>
  0x039CF2 $9CE2: -D0-I-  .byte $00 ; <indirect ref>
  0x039CF3 $9CE3: -D0-I-  .byte $00 ; <indirect ref>
  0x039CF4 $9CE4: -D0-I-  .byte $01 ; <indirect ref>
  0x039CF5 $9CE5: ------  .byte $00
  0x039CF6 $9CE6: -D0-I-  .byte $19 ; <indirect ref>
  0x039CF7 $9CE7: -D0-I-  .byte $00 ; <indirect ref>
  0x039CF8 $9CE8: ------  .byte $00
  0x039CF9 $9CE9: ------  .byte $00
  0x039CFA $9CEA: -D0-I-  .byte $00 ; <indirect ref>
  0x039CFB $9CEB: -D0-I-  .byte $00 ; <indirect ref>
  0x039CFC $9CEC: -D0-I-  .byte $00 ; <indirect ref>
  0x039CFD $9CED: ------  .byte $00
  0x039CFE $9CEE: ------  .byte $00
  0x039CFF $9CEF: ------  .byte $00
  0x039D00 $9CF0: ------  .byte $00
  0x039D01 $9CF1: ------  .byte $00
  0x039D02 $9CF2: -D0-I-  .byte $64 ; <indirect ref>
  0x039D03 $9CF3: -D0-I-  .byte $13 ; <indirect ref>
  0x039D04 $9CF4: -D0-I-  .byte $00 ; <indirect ref>
  0x039D05 $9CF5: -D0-I-  .byte $00 ; <indirect ref>
  0x039D06 $9CF6: -D0-I-  .byte $01 ; <indirect ref>
  0x039D07 $9CF7: ------  .byte $03
  0x039D08 $9CF8: -D0-I-  .byte $02 ; <indirect ref>
  0x039D09 $9CF9: -D0-I-  .byte $06 ; <indirect ref>
  0x039D0A $9CFA: ------  .byte $02
  0x039D0B $9CFB: -D0-I-  .byte $02 ; <indirect ref>
  0x039D0C $9CFC: -D0-I-  .byte $00 ; <indirect ref>
  0x039D0D $9CFD: ------  .byte $00
  0x039D0E $9CFE: -D0-I-  .byte $65 ; <indirect ref>
  0x039D0F $9CFF: -D0-I-  .byte $13 ; <indirect ref>
  0x039D10 $9D00: -D0-I-  .byte $00 ; <indirect ref>
  0x039D11 $9D01: -D0-I-  .byte $00 ; <indirect ref>
  0x039D12 $9D02: -D0-I-  .byte $01 ; <indirect ref>
  0x039D13 $9D03: -D0-I-  .byte $03 ; <indirect ref>
  0x039D14 $9D04: -D0-I-  .byte $02 ; <indirect ref>
  0x039D15 $9D05: -D0-I-  .byte $06 ; <indirect ref>
  0x039D16 $9D06: ------  .byte $02
  0x039D17 $9D07: -D0-I-  .byte $02 ; <indirect ref>
  0x039D18 $9D08: -D0-I-  .byte $02 ; <indirect ref>
  0x039D19 $9D09: ------  .byte $00
  0x039D1A $9D0A: -D0-I-  .byte $1A ; <indirect ref>
  0x039D1B $9D0B: -D0-I-  .byte $00 ; <indirect ref>
  0x039D1C $9D0C: ------  .byte $00
  0x039D1D $9D0D: ------  .byte $00
  0x039D1E $9D0E: -D0-I-  .byte $00 ; <indirect ref>
  0x039D1F $9D0F: -D0-I-  .byte $00 ; <indirect ref>
  0x039D20 $9D10: -D0-I-  .byte $00 ; <indirect ref>
  0x039D21 $9D11: ------  .byte $00
  0x039D22 $9D12: ------  .byte $00
  0x039D23 $9D13: ------  .byte $00
  0x039D24 $9D14: ------  .byte $00
  0x039D25 $9D15: ------  .byte $00
  0x039D26 $9D16: -D0-I-  .byte $68 ; <indirect ref>
  0x039D27 $9D17: -D0-I-  .byte $00 ; <indirect ref>
  0x039D28 $9D18: -D0-I-  .byte $00 ; <indirect ref>
  0x039D29 $9D19: -D0-I-  .byte $0D ; <indirect ref>
  0x039D2A $9D1A: -D0-I-  .byte $00 ; <indirect ref>
  0x039D2B $9D1B: -D0-I-  .byte $00 ; <indirect ref>
  0x039D2C $9D1C: -D0-I-  .byte $00 ; <indirect ref>
  0x039D2D $9D1D: -D0-I-  .byte $00 ; <indirect ref>
  0x039D2E $9D1E: -D0-I-  .byte $00 ; <indirect ref>
  0x039D2F $9D1F: -D0-I-  .byte $00 ; <indirect ref>
  0x039D30 $9D20: -D0-I-  .byte $00 ; <indirect ref>
  0x039D31 $9D21: ------  .byte $00
  0x039D32 $9D22: -D0-I-  .byte $69 ; <indirect ref>
  0x039D33 $9D23: -D0-I-  .byte $13 ; <indirect ref>
  0x039D34 $9D24: -D0-I-  .byte $00 ; <indirect ref>
  0x039D35 $9D25: -D0-I-  .byte $00 ; <indirect ref>
  0x039D36 $9D26: -D0-I-  .byte $14 ; <indirect ref>
  0x039D37 $9D27: ------  .byte $03
  0x039D38 $9D28: -D0-I-  .byte $00 ; <indirect ref>
  0x039D39 $9D29: -D0-I-  .byte $00 ; <indirect ref>
  0x039D3A $9D2A: ------  .byte $01
  0x039D3B $9D2B: -D0-I-  .byte $00 ; <indirect ref>
  0x039D3C $9D2C: -D0-I-  .byte $16 ; <indirect ref>
  0x039D3D $9D2D: ------  .byte $00
  0x039D3E $9D2E: -D0-I-  .byte $6A ; <indirect ref>
  0x039D3F $9D2F: -D0-I-  .byte $13 ; <indirect ref>
  0x039D40 $9D30: -D0-I-  .byte $00 ; <indirect ref>
  0x039D41 $9D31: -D0-I-  .byte $00 ; <indirect ref>
  0x039D42 $9D32: -D0-I-  .byte $14 ; <indirect ref>
  0x039D43 $9D33: -D0-I-  .byte $03 ; <indirect ref>
  0x039D44 $9D34: -D0-I-  .byte $00 ; <indirect ref>
  0x039D45 $9D35: -D0-I-  .byte $00 ; <indirect ref>
  0x039D46 $9D36: -D0-I-  .byte $01 ; <indirect ref>
  0x039D47 $9D37: -D0-I-  .byte $00 ; <indirect ref>
  0x039D48 $9D38: -D0-I-  .byte $16 ; <indirect ref>
  0x039D49 $9D39: ------  .byte $00
  0x039D4A $9D3A: -D0-I-  .byte $1C ; <indirect ref>
  0x039D4B $9D3B: -D0-I-  .byte $00 ; <indirect ref>
  0x039D4C $9D3C: ------  .byte $00
  0x039D4D $9D3D: ------  .byte $00
  0x039D4E $9D3E: -D0-I-  .byte $00 ; <indirect ref>
  0x039D4F $9D3F: -D0-I-  .byte $00 ; <indirect ref>
  0x039D50 $9D40: -D0-I-  .byte $00 ; <indirect ref>
  0x039D51 $9D41: ------  .byte $00
  0x039D52 $9D42: ------  .byte $00
  0x039D53 $9D43: ------  .byte $00
  0x039D54 $9D44: ------  .byte $00
  0x039D55 $9D45: ------  .byte $00
  0x039D56 $9D46: -D0-I-  .byte $6C ; <indirect ref>
  0x039D57 $9D47: -D0-I-  .byte $00 ; <indirect ref>
  0x039D58 $9D48: -D0-I-  .byte $00 ; <indirect ref>
  0x039D59 $9D49: -D0-I-  .byte $00 ; <indirect ref>
  0x039D5A $9D4A: -D0-I-  .byte $00 ; <indirect ref>
  0x039D5B $9D4B: ------  .byte $03
  0x039D5C $9D4C: -D0-I-  .byte $00 ; <indirect ref>
  0x039D5D $9D4D: -D0-I-  .byte $00 ; <indirect ref>
  0x039D5E $9D4E: ------  .byte $00
  0x039D5F $9D4F: -D0-I-  .byte $00 ; <indirect ref>
  0x039D60 $9D50: -D0-I-  .byte $01 ; <indirect ref>
  0x039D61 $9D51: ------  .byte $00
  0x039D62 $9D52: -D0-I-  .byte $6D ; <indirect ref>
  0x039D63 $9D53: -D0-I-  .byte $00 ; <indirect ref>
  0x039D64 $9D54: -D0-I-  .byte $00 ; <indirect ref>
  0x039D65 $9D55: -D0-I-  .byte $00 ; <indirect ref>
  0x039D66 $9D56: -D0-I-  .byte $00 ; <indirect ref>
  0x039D67 $9D57: -D0-I-  .byte $03 ; <indirect ref>
  0x039D68 $9D58: ------  .byte $00
  0x039D69 $9D59: -D0-I-  .byte $00 ; <indirect ref>
  0x039D6A $9D5A: ------  .byte $00
  0x039D6B $9D5B: -D0-I-  .byte $00 ; <indirect ref>
  0x039D6C $9D5C: -D0-I-  .byte $17 ; <indirect ref>
  0x039D6D $9D5D: ------  .byte $00
  0x039D6E $9D5E: -D0-I-  .byte $70 ; <indirect ref>
  0x039D6F $9D5F: -D0-I-  .byte $00 ; <indirect ref>
  0x039D70 $9D60: -D0-I-  .byte $00 ; <indirect ref>
  0x039D71 $9D61: -D0-I-  .byte $00 ; <indirect ref>
  0x039D72 $9D62: -D0-I-  .byte $01 ; <indirect ref>
  0x039D73 $9D63: -D0-I-  .byte $03 ; <indirect ref>
  0x039D74 $9D64: -D0-I-  .byte $00 ; <indirect ref>
  0x039D75 $9D65: -D0-I-  .byte $00 ; <indirect ref>
  0x039D76 $9D66: ------  .byte $02
  0x039D77 $9D67: -D0-I-  .byte $02 ; <indirect ref>
  0x039D78 $9D68: -D0-I-  .byte $01 ; <indirect ref>
  0x039D79 $9D69: ------  .byte $00
  0x039D7A $9D6A: -D0-I-  .byte $71 ; <indirect ref>
  0x039D7B $9D6B: -D0-I-  .byte $00 ; <indirect ref>
  0x039D7C $9D6C: -D0-I-  .byte $00 ; <indirect ref>
  0x039D7D $9D6D: -D0-I-  .byte $00 ; <indirect ref>
  0x039D7E $9D6E: -D0-I-  .byte $01 ; <indirect ref>
  0x039D7F $9D6F: -D0-I-  .byte $03 ; <indirect ref>
  0x039D80 $9D70: -D0-I-  .byte $00 ; <indirect ref>
  0x039D81 $9D71: -D0-I-  .byte $00 ; <indirect ref>
  0x039D82 $9D72: -D0-I-  .byte $02 ; <indirect ref>
  0x039D83 $9D73: -D0-I-  .byte $00 ; <indirect ref>
  0x039D84 $9D74: -D0-I-  .byte $01 ; <indirect ref>
  0x039D85 $9D75: ------  .byte $00
  0x039D86 $9D76: -D0-I-  .byte $1E ; <indirect ref>
  0x039D87 $9D77: -D0-I-  .byte $00 ; <indirect ref>
  0x039D88 $9D78: ------  .byte $00
  0x039D89 $9D79: ------  .byte $00
  0x039D8A $9D7A: -D0-I-  .byte $01 ; <indirect ref>
  0x039D8B $9D7B: -D0-I-  .byte $00 ; <indirect ref>
  0x039D8C $9D7C: -D0-I-  .byte $00 ; <indirect ref>
  0x039D8D $9D7D: ------  .byte $00
  0x039D8E $9D7E: ------  .byte $00
  0x039D8F $9D7F: ------  .byte $00
  0x039D90 $9D80: ------  .byte $00
  0x039D91 $9D81: ------  .byte $00
  0x039D92 $9D82: -D0-I-  .byte $73 ; <indirect ref>
  0x039D93 $9D83: -D0-I-  .byte $00 ; <indirect ref>
  0x039D94 $9D84: -D0-I-  .byte $00 ; <indirect ref>
  0x039D95 $9D85: -D0-I-  .byte $00 ; <indirect ref>
  0x039D96 $9D86: -D0-I-  .byte $14 ; <indirect ref>
  0x039D97 $9D87: ------  .byte $03
  0x039D98 $9D88: -D0-I-  .byte $00 ; <indirect ref>
  0x039D99 $9D89: -D0-I-  .byte $00 ; <indirect ref>
  0x039D9A $9D8A: ------  .byte $00
  0x039D9B $9D8B: -D0-I-  .byte $00 ; <indirect ref>
  0x039D9C $9D8C: -D0-I-  .byte $0D ; <indirect ref>
  0x039D9D $9D8D: ------  .byte $00
  0x039D9E $9D8E: -D0-I-  .byte $74 ; <indirect ref>
  0x039D9F $9D8F: -D0-I-  .byte $00 ; <indirect ref>
  0x039DA0 $9D90: -D0-I-  .byte $00 ; <indirect ref>
  0x039DA1 $9D91: -D0-I-  .byte $00 ; <indirect ref>
  0x039DA2 $9D92: -D0-I-  .byte $14 ; <indirect ref>
  0x039DA3 $9D93: -D0-I-  .byte $03 ; <indirect ref>
  0x039DA4 $9D94: -D0-I-  .byte $00 ; <indirect ref>
  0x039DA5 $9D95: -D0-I-  .byte $00 ; <indirect ref>
  0x039DA6 $9D96: ------  .byte $00
  0x039DA7 $9D97: -D0-I-  .byte $00 ; <indirect ref>
  0x039DA8 $9D98: -D0-I-  .byte $0D ; <indirect ref>
  0x039DA9 $9D99: ------  .byte $00
  0x039DAA $9D9A: -D0-I-  .byte $1F ; <indirect ref>
  0x039DAB $9D9B: -D0-I-  .byte $00 ; <indirect ref>
  0x039DAC $9D9C: ------  .byte $00
  0x039DAD $9D9D: ------  .byte $00
  0x039DAE $9D9E: -D0-I-  .byte $01 ; <indirect ref>
  0x039DAF $9D9F: -D0-I-  .byte $02 ; <indirect ref>
  0x039DB0 $9DA0: -D0-I-  .byte $00 ; <indirect ref>
  0x039DB1 $9DA1: ------  .byte $00
  0x039DB2 $9DA2: ------  .byte $00
  0x039DB3 $9DA3: ------  .byte $00
  0x039DB4 $9DA4: ------  .byte $00
  0x039DB5 $9DA5: ------  .byte $00
  0x039DB6 $9DA6: -D0-I-  .byte $77 ; <indirect ref>
  0x039DB7 $9DA7: -D0-I-  .byte $00 ; <indirect ref>
  0x039DB8 $9DA8: -D0-I-  .byte $08 ; <indirect ref>
  0x039DB9 $9DA9: -D0-I-  .byte $00 ; <indirect ref>
  0x039DBA $9DAA: -D0-I-  .byte $00 ; <indirect ref>
  0x039DBB $9DAB: -D0-I-  .byte $03 ; <indirect ref>
  0x039DBC $9DAC: -D0-I-  .byte $00 ; <indirect ref>
  0x039DBD $9DAD: -D0-I-  .byte $00 ; <indirect ref>
  0x039DBE $9DAE: ------  .byte $01
  0x039DBF $9DAF: -D0-I-  .byte $00 ; <indirect ref>
  0x039DC0 $9DB0: -D0-I-  .byte $0B ; <indirect ref>
  0x039DC1 $9DB1: ------  .byte $00
  0x039DC2 $9DB2: -D0-I-  .byte $78 ; <indirect ref>
  0x039DC3 $9DB3: -D0-I-  .byte $00 ; <indirect ref>
  0x039DC4 $9DB4: -D0-I-  .byte $00 ; <indirect ref>
  0x039DC5 $9DB5: -D0-I-  .byte $00 ; <indirect ref>
  0x039DC6 $9DB6: -D0-I-  .byte $00 ; <indirect ref>
  0x039DC7 $9DB7: -D0-I-  .byte $03 ; <indirect ref>
  0x039DC8 $9DB8: -D0-I-  .byte $00 ; <indirect ref>
  0x039DC9 $9DB9: -D0-I-  .byte $00 ; <indirect ref>
  0x039DCA $9DBA: -D0-I-  .byte $01 ; <indirect ref>
  0x039DCB $9DBB: -D0-I-  .byte $00 ; <indirect ref>
  0x039DCC $9DBC: -D0-I-  .byte $0B ; <indirect ref>
  0x039DCD $9DBD: ------  .byte $00
  0x039DCE $9DBE: -D0-I-  .byte $7A ; <indirect ref>
  0x039DCF $9DBF: -D0-I-  .byte $13 ; <indirect ref>
  0x039DD0 $9DC0: -D0-I-  .byte $10 ; <indirect ref>
  0x039DD1 $9DC1: -D0-I-  .byte $00 ; <indirect ref>
  0x039DD2 $9DC2: -D0-I-  .byte $00 ; <indirect ref>
  0x039DD3 $9DC3: ------  .byte $03
  0x039DD4 $9DC4: -D0-I-  .byte $00 ; <indirect ref>
  0x039DD5 $9DC5: -D0-I-  .byte $00 ; <indirect ref>
  0x039DD6 $9DC6: ------  .byte $00
  0x039DD7 $9DC7: -D0-I-  .byte $00 ; <indirect ref>
  0x039DD8 $9DC8: -D0-I-  .byte $17 ; <indirect ref>
  0x039DD9 $9DC9: ------  .byte $00
  0x039DDA $9DCA: -D0-I-  .byte $7B ; <indirect ref>
  0x039DDB $9DCB: -D0-I-  .byte $13 ; <indirect ref>
  0x039DDC $9DCC: -D0-I-  .byte $00 ; <indirect ref>
  0x039DDD $9DCD: -D0-I-  .byte $00 ; <indirect ref>
  0x039DDE $9DCE: -D0-I-  .byte $00 ; <indirect ref>
  0x039DDF $9DCF: -D0-I-  .byte $03 ; <indirect ref>
  0x039DE0 $9DD0: -D0-I-  .byte $00 ; <indirect ref>
  0x039DE1 $9DD1: -D0-I-  .byte $00 ; <indirect ref>
  0x039DE2 $9DD2: -D0-I-  .byte $00 ; <indirect ref>
  0x039DE3 $9DD3: -D0-I-  .byte $00 ; <indirect ref>
  0x039DE4 $9DD4: -D0-I-  .byte $17 ; <indirect ref>
  0x039DE5 $9DD5: ------  .byte $00
  0x039DE6 $9DD6: -D0-I-  .byte $21 ; <indirect ref>
  0x039DE7 $9DD7: -D0-I-  .byte $00 ; <indirect ref>
  0x039DE8 $9DD8: ------  .byte $00
  0x039DE9 $9DD9: ------  .byte $00
  0x039DEA $9DDA: -D0-I-  .byte $01 ; <indirect ref>
  0x039DEB $9DDB: -D0-I-  .byte $00 ; <indirect ref>
  0x039DEC $9DDC: -D0-I-  .byte $00 ; <indirect ref>
  0x039DED $9DDD: ------  .byte $00
  0x039DEE $9DDE: ------  .byte $00
  0x039DEF $9DDF: ------  .byte $00
  0x039DF0 $9DE0: ------  .byte $00
  0x039DF1 $9DE1: ------  .byte $00
  0x039DF2 $9DE2: -D0-I-  .byte $7D ; <indirect ref>
  0x039DF3 $9DE3: -D0-I-  .byte $19 ; <indirect ref>
  0x039DF4 $9DE4: -D0-I-  .byte $08 ; <indirect ref>
  0x039DF5 $9DE5: -D0-I-  .byte $00 ; <indirect ref>
  0x039DF6 $9DE6: -D0-I-  .byte $17 ; <indirect ref>
  0x039DF7 $9DE7: ------  .byte $05
  0x039DF8 $9DE8: -D0-I-  .byte $03 ; <indirect ref>
  0x039DF9 $9DE9: -D0-I-  .byte $00 ; <indirect ref>
  0x039DFA $9DEA: ------  .byte $00
  0x039DFB $9DEB: -D0-I-  .byte $00 ; <indirect ref>
  0x039DFC $9DEC: -D0-I-  .byte $18 ; <indirect ref>
  0x039DFD $9DED: ------  .byte $00
  0x039DFE $9DEE: -D0-I-  .byte $7E ; <indirect ref>
  0x039DFF $9DEF: -D0-I-  .byte $19 ; <indirect ref>
  0x039E00 $9DF0: -D0-I-  .byte $00 ; <indirect ref>
  0x039E01 $9DF1: -D0-I-  .byte $00 ; <indirect ref>
  0x039E02 $9DF2: -D0-I-  .byte $17 ; <indirect ref>
  0x039E03 $9DF3: -D0-I-  .byte $05 ; <indirect ref>
  0x039E04 $9DF4: -D0-I-  .byte $03 ; <indirect ref>
  0x039E05 $9DF5: -D0-I-  .byte $00 ; <indirect ref>
  0x039E06 $9DF6: -D0-I-  .byte $00 ; <indirect ref>
  0x039E07 $9DF7: -D0-I-  .byte $00 ; <indirect ref>
  0x039E08 $9DF8: -D0-I-  .byte $18 ; <indirect ref>
  0x039E09 $9DF9: ------  .byte $00
  0x039E0A $9DFA: -D0-I-  .byte $22 ; <indirect ref>
  0x039E0B $9DFB: -D0-I-  .byte $00 ; <indirect ref>
  0x039E0C $9DFC: ------  .byte $00
  0x039E0D $9DFD: ------  .byte $00
  0x039E0E $9DFE: -D0-I-  .byte $01 ; <indirect ref>
  0x039E0F $9DFF: -D0-I-  .byte $00 ; <indirect ref>
  0x039E10 $9E00: -D0-I-  .byte $00 ; <indirect ref>
  0x039E11 $9E01: ------  .byte $00
  0x039E12 $9E02: ------  .byte $00
  0x039E13 $9E03: ------  .byte $00
  0x039E14 $9E04: ------  .byte $00
  0x039E15 $9E05: ------  .byte $00
  0x039E16 $9E06: -D0-I-  .byte $81 ; <indirect ref>
  0x039E17 $9E07: -D0-I-  .byte $00 ; <indirect ref>
  0x039E18 $9E08: -D0-I-  .byte $00 ; <indirect ref>
  0x039E19 $9E09: -D0-I-  .byte $00 ; <indirect ref>
  0x039E1A $9E0A: -D0-I-  .byte $14 ; <indirect ref>
  0x039E1B $9E0B: -D0-I-  .byte $00 ; <indirect ref>
  0x039E1C $9E0C: -D0-I-  .byte $00 ; <indirect ref>
  0x039E1D $9E0D: -D0-I-  .byte $00 ; <indirect ref>
  0x039E1E $9E0E: -D0-I-  .byte $00 ; <indirect ref>
  0x039E1F $9E0F: -D0-I-  .byte $00 ; <indirect ref>
  0x039E20 $9E10: -D0-I-  .byte $19 ; <indirect ref>
  0x039E21 $9E11: ------  .byte $00
  0x039E22 $9E12: -D0-I-  .byte $87 ; <indirect ref>
  0x039E23 $9E13: -D0-I-  .byte $00 ; <indirect ref>
  0x039E24 $9E14: -D0-I-  .byte $00 ; <indirect ref>
  0x039E25 $9E15: -D0-I-  .byte $00 ; <indirect ref>
  0x039E26 $9E16: -D0-I-  .byte $00 ; <indirect ref>
  0x039E27 $9E17: -D0-I-  .byte $00 ; <indirect ref>
  0x039E28 $9E18: -D0-I-  .byte $00 ; <indirect ref>
  0x039E29 $9E19: -D0-I-  .byte $00 ; <indirect ref>
  0x039E2A $9E1A: -D0-I-  .byte $00 ; <indirect ref>
  0x039E2B $9E1B: -D0-I-  .byte $00 ; <indirect ref>
  0x039E2C $9E1C: -D0-I-  .byte $00 ; <indirect ref>
  0x039E2D $9E1D: ------  .byte $00
  0x039E2E $9E1E: -D0-I-  .byte $99 ; <indirect ref>
  0x039E2F $9E1F: -D0-I-  .byte $16 ; <indirect ref>
  0x039E30 $9E20: -D0-I-  .byte $FF ; <indirect ref>
  0x039E31 $9E21: -D0-I-  .byte $00 ; <indirect ref>
  0x039E32 $9E22: -D0-I-  .byte $02 ; <indirect ref>
  0x039E33 $9E23: -D0-I-  .byte $01 ; <indirect ref>
  0x039E34 $9E24: ------  .byte $00
  0x039E35 $9E25: -D0-I-  .byte $00 ; <indirect ref>
  0x039E36 $9E26: -D0-I-  .byte $02 ; <indirect ref>
  0x039E37 $9E27: ------  .byte $02
  0x039E38 $9E28: -D0-I-  .byte $00 ; <indirect ref>
  0x039E39 $9E29: ------  .byte $00
  0x039E3A $9E2A: -D0-I-  .byte $9A ; <indirect ref>
  0x039E3B $9E2B: -D0-I-  .byte $17 ; <indirect ref>
  0x039E3C $9E2C: -D0-I-  .byte $00 ; <indirect ref>
  0x039E3D $9E2D: ------  .byte $00
  0x039E3E $9E2E: -D0-I-  .byte $0A ; <indirect ref>
  0x039E3F $9E2F: -D0-I-  .byte $00 ; <indirect ref>
  0x039E40 $9E30: ------  .byte $00
  0x039E41 $9E31: ------  .byte $00
  0x039E42 $9E32: ------  .byte $00
  0x039E43 $9E33: ------  .byte $00
  0x039E44 $9E34: ------  .byte $00
  0x039E45 $9E35: ------  .byte $00
  0x039E46 $9E36: -D0-I-  .byte $9B ; <indirect ref>
  0x039E47 $9E37: -D0-I-  .byte $18 ; <indirect ref>
  0x039E48 $9E38: -D0-I-  .byte $00 ; <indirect ref>
  0x039E49 $9E39: -D0-I-  .byte $FF ; <indirect ref>
  0x039E4A $9E3A: -D0-I-  .byte $1B ; <indirect ref>
  0x039E4B $9E3B: -D0-I-  .byte $06 ; <indirect ref>
  0x039E4C $9E3C: ------  .byte $00
  0x039E4D $9E3D: -D0-I-  .byte $03 ; <indirect ref>
  0x039E4E $9E3E: -D0-I-  .byte $00 ; <indirect ref>
  0x039E4F $9E3F: -D0-I-  .byte $00 ; <indirect ref>
  0x039E50 $9E40: -D0-I-  .byte $24 ; <indirect ref>
  0x039E51 $9E41: ------  .byte $00
  0x039E52 $9E42: -D0-I-  .byte $9C ; <indirect ref>
  0x039E53 $9E43: -D0-I-  .byte $0A ; <indirect ref>
  0x039E54 $9E44: -D0-I-  .byte $00 ; <indirect ref>
  0x039E55 $9E45: -D0-I-  .byte $00 ; <indirect ref>
  0x039E56 $9E46: -D0-I-  .byte $14 ; <indirect ref>
  0x039E57 $9E47: -D0-I-  .byte $01 ; <indirect ref>
  0x039E58 $9E48: -D0-I-  .byte $00 ; <indirect ref>
  0x039E59 $9E49: -D0-I-  .byte $00 ; <indirect ref>
  0x039E5A $9E4A: ------  .byte $00
  0x039E5B $9E4B: -D0-I-  .byte $00 ; <indirect ref>
  0x039E5C $9E4C: -D0-I-  .byte $0B ; <indirect ref>
  0x039E5D $9E4D: ------  .byte $00
  0x039E5E $9E4E: -D0---  .byte $08
  0x039E5F $9E4F: -D0---  .byte $08
  0x039E60 $9E50: -D0---  .byte $08
  0x039E61 $9E51: -D0---  .byte $09
  0x039E62 $9E52: -D0---  .byte $09
  0x039E63 $9E53: -D0---  .byte $09
  0x039E64 $9E54: -D0---  .byte $09
  0x039E65 $9E55: -D0---  .byte $0A
  0x039E66 $9E56: -D0---  .byte $0A
  0x039E67 $9E57: -D0---  .byte $0A
  0x039E68 $9E58: -D0---  .byte $0B
  0x039E69 $9E59: -D0---  .byte $0B
  0x039E6A $9E5A: -D0---  .byte $0B
  0x039E6B $9E5B: -D0---  .byte $0C
  0x039E6C $9E5C: -D0---  .byte $0C
  0x039E6D $9E5D: -D0---  .byte $0C
  0x039E6E $9E5E: -D0---  .byte $0D
  0x039E6F $9E5F: -D0---  .byte $0D
  0x039E70 $9E60: -D0---  .byte $0D
  0x039E71 $9E61: -D0---  .byte $0E
  0x039E72 $9E62: -D0---  .byte $0E
  0x039E73 $9E63: -D0---  .byte $0E
  0x039E74 $9E64: -D0---  .byte $0F
  0x039E75 $9E65: -D0---  .byte $0F
  0x039E76 $9E66: -D0---  .byte $10
  0x039E77 $9E67: -D0---  .byte $10
  0x039E78 $9E68: -D0---  .byte $11
  0x039E79 $9E69: -D0---  .byte $11
  0x039E7A $9E6A: -D0---  .byte $11
  0x039E7B $9E6B: -D0---  .byte $12
  0x039E7C $9E6C: -D0---  .byte $12
  0x039E7D $9E6D: -D0---  .byte $13
  0x039E7E $9E6E: -D0---  .byte $14
  0x039E7F $9E6F: -D0---  .byte $14
  0x039E80 $9E70: -D0---  .byte $15
  0x039E81 $9E71: -D0---  .byte $15
  0x039E82 $9E72: -D0---  .byte $16
  0x039E83 $9E73: -D0---  .byte $16
  0x039E84 $9E74: -D0---  .byte $17
  0x039E85 $9E75: -D0---  .byte $18
  0x039E86 $9E76: -D0---  .byte $18
  0x039E87 $9E77: -D0---  .byte $19
  0x039E88 $9E78: -D0---  .byte $1A
  0x039E89 $9E79: -D0---  .byte $1A
  0x039E8A $9E7A: -D0---  .byte $1B
  0x039E8B $9E7B: -D0---  .byte $1C
  0x039E8C $9E7C: -D0---  .byte $1D
  0x039E8D $9E7D: -D0---  .byte $1D
  0x039E8E $9E7E: -D0---  .byte $1E
  0x039E8F $9E7F: -D0---  .byte $1F
  0x039E90 $9E80: -D0---  .byte $20
  0x039E91 $9E81: -D0---  .byte $21
  0x039E92 $9E82: -D0---  .byte $22
  0x039E93 $9E83: -D0---  .byte $23
  0x039E94 $9E84: -D0---  .byte $24
  0x039E95 $9E85: -D0---  .byte $25
  0x039E96 $9E86: -D0---  .byte $26
  0x039E97 $9E87: -D0---  .byte $27
  0x039E98 $9E88: -D0---  .byte $28
  0x039E99 $9E89: -D0---  .byte $29
  0x039E9A $9E8A: -D0---  .byte $2A
  0x039E9B $9E8B: -D0---  .byte $2B
  0x039E9C $9E8C: -D0---  .byte $2C
  0x039E9D $9E8D: -D0---  .byte $2D
  0x039E9E $9E8E: -D0---  .byte $2F
  0x039E9F $9E8F: -D0---  .byte $30
  0x039EA0 $9E90: -D0---  .byte $31
  0x039EA1 $9E91: -D0---  .byte $33
  0x039EA2 $9E92: -D0---  .byte $34
  0x039EA3 $9E93: -D0---  .byte $35
  0x039EA4 $9E94: -D0---  .byte $37
  0x039EA5 $9E95: -D0---  .byte $38
  0x039EA6 $9E96: -D0---  .byte $3A
  0x039EA7 $9E97: -D0---  .byte $3B
  0x039EA8 $9E98: -D0---  .byte $3D
  0x039EA9 $9E99: -D0---  .byte $3F
  0x039EAA $9E9A: -D0---  .byte $41
  0x039EAB $9E9B: -D0---  .byte $42
  0x039EAC $9E9C: -D0---  .byte $44
  0x039EAD $9E9D: -D0---  .byte $46
  0x039EAE $9E9E: -D0---  .byte $48
  0x039EAF $9E9F: -D0---  .byte $4A
  0x039EB0 $9EA0: -D0---  .byte $4C
  0x039EB1 $9EA1: -D0---  .byte $4E
  0x039EB2 $9EA2: -D0---  .byte $50
  0x039EB3 $9EA3: -D0---  .byte $52
  0x039EB4 $9EA4: -D0---  .byte $54
  0x039EB5 $9EA5: -D0---  .byte $57
  0x039EB6 $9EA6: -D0---  .byte $59
  0x039EB7 $9EA7: -D0---  .byte $5C
  0x039EB8 $9EA8: -D0---  .byte $5E
  0x039EB9 $9EA9: -D0---  .byte $61
  0x039EBA $9EAA: -D0---  .byte $63
  0x039EBB $9EAB: -D0---  .byte $66
  0x039EBC $9EAC: -D0---  .byte $69
  0x039EBD $9EAD: -D0---  .byte $6C
  0x039EBE $9EAE: -D0---  .byte $6F
  0x039EBF $9EAF: -D0---  .byte $72
  0x039EC0 $9EB0: -D0---  .byte $75
  0x039EC1 $9EB1: -D0---  .byte $78
  0x039EC2 $9EB2: -D0---  .byte $7B
  0x039EC3 $9EB3: -D0---  .byte $7E
  0x039EC4 $9EB4: -D0---  .byte $82
  0x039EC5 $9EB5: -D0---  .byte $85
  0x039EC6 $9EB6: -D0---  .byte $89
  0x039EC7 $9EB7: -D0---  .byte $8D
  0x039EC8 $9EB8: -D0---  .byte $91
  0x039EC9 $9EB9: -D0---  .byte $95
  0x039ECA $9EBA: -D0---  .byte $99
  0x039ECB $9EBB: -D0---  .byte $9D
  0x039ECC $9EBC: -D0---  .byte $A1
  0x039ECD $9EBD: -D0---  .byte $A5
  0x039ECE $9EBE: -D0---  .byte $AA
  0x039ECF $9EBF: -D0---  .byte $AF
  0x039ED0 $9EC0: -D0---  .byte $B3
  0x039ED1 $9EC1: -D0---  .byte $B7
  0x039ED2 $9EC2: -D0---  .byte $BA
  0x039ED3 $9EC3: -D0---  .byte $BD
  0x039ED4 $9EC4: ------  .byte $C0
  0x039ED5 $9EC5: -D0---  .byte $C3
  0x039ED6 $9EC6: -D0---  .byte $C6
  0x039ED7 $9EC7: -D0---  .byte $C9
  0x039ED8 $9EC8: -D0---  .byte $CC
  0x039ED9 $9EC9: ------  .byte $CE
  0x039EDA $9ECA: -D0---  .byte $D1
  0x039EDB $9ECB: ------  .byte $D3
  0x039EDC $9ECC: -D0---  .byte $D5
  0x039EDD $9ECD: ------  .byte $D7
  0x039EDE $9ECE: -D0---  .byte $D9
  0x039EDF $9ECF: ------  .byte $DA
  0x039EE0 $9ED0: ------  .byte $DC
  0x039EE1 $9ED1: ------  .byte $DD
  0x039EE2 $9ED2: ------  .byte $DE
  0x039EE3 $9ED3: ------  .byte $E0
  0x039EE4 $9ED4: ------  .byte $E1
  0x039EE5 $9ED5: ------  .byte $E2
  0x039EE6 $9ED6: ------  .byte $E3
  0x039EE7 $9ED7: ------  .byte $E4
  0x039EE8 $9ED8: ------  .byte $E5
  0x039EE9 $9ED9: ------  .byte $E6
  0x039EEA $9EDA: ------  .byte $E7
  0x039EEB $9EDB: ------  .byte $E8
  0x039EEC $9EDC: ------  .byte $E8
  0x039EED $9EDD: ------  .byte $E9
  0x039EEE $9EDE: ------  .byte $EA
  0x039EEF $9EDF: ------  .byte $EB
  0x039EF0 $9EE0: ------  .byte $EB
  0x039EF1 $9EE1: ------  .byte $EC
  0x039EF2 $9EE2: -D0---  .byte $ED
  0x039EF3 $9EE3: ------  .byte $ED
  0x039EF4 $9EE4: -D0---  .byte $EE
  0x039EF5 $9EE5: ------  .byte $EE
  0x039EF6 $9EE6: -D0---  .byte $EF
  0x039EF7 $9EE7: ------  .byte $F0
  0x039EF8 $9EE8: -D0---  .byte $F0
  0x039EF9 $9EE9: ------  .byte $F1
  0x039EFA $9EEA: -D0---  .byte $F1
  0x039EFB $9EEB: ------  .byte $F2
  0x039EFC $9EEC: -D0---  .byte $F3
  0x039EFD $9EED: ------  .byte $F3
  0x039EFE $9EEE: ------  .byte $F4
  0x039EFF $9EEF: ------  .byte $F4
  0x039F00 $9EF0: -D0---  .byte $F5
  0x039F01 $9EF1: ------  .byte $F5
  0x039F02 $9EF2: -D0---  .byte $F6
  0x039F03 $9EF3: -D0---  .byte $F6
  0x039F04 $9EF4: ------  .byte $F7
  0x039F05 $9EF5: -D0---  .byte $F7
  0x039F06 $9EF6: ------  .byte $F8
  0x039F07 $9EF7: -D0---  .byte $F8
  0x039F08 $9EF8: -D0---  .byte $F8
  0x039F09 $9EF9: -D0---  .byte $F9
  0x039F0A $9EFA: -D0---  .byte $F9
  0x039F0B $9EFB: -D0---  .byte $FA
  0x039F0C $9EFC: ------  .byte $FA
  0x039F0D $9EFD: ------  .byte $FA
  0x039F0E $9EFE: ------  .byte $FB
  0x039F0F $9EFF: ------  .byte $FB
  0x039F10 $9F00: ------  .byte $FB
  0x039F11 $9F01: ------  .byte $FC
  0x039F12 $9F02: ------  .byte $FC
  0x039F13 $9F03: ------  .byte $FC
  0x039F14 $9F04: ------  .byte $FD
  0x039F15 $9F05: ------  .byte $FD
  0x039F16 $9F06: ------  .byte $FD
  0x039F17 $9F07: ------  .byte $FD
  0x039F18 $9F08: ------  .byte $FD
  0x039F19 $9F09: ------  .byte $FE
  0x039F1A $9F0A: -D0---  .byte $FE
  0x039F1B $9F0B: ------  .byte $FE
  0x039F1C $9F0C: ------  .byte $FE
  0x039F1D $9F0D: ------  .byte $FF
  0x039F1E $9F0E: -D0-I-  .byte $90 ; <indirect ref>
  0x039F1F $9F0F: -D0-I-  .byte $01 ; <indirect ref>
  0x039F20 $9F10: -D0-I-  .byte $98 ; <indirect ref>
  0x039F21 $9F11: -D0-I-  .byte $01 ; <indirect ref>
  0x039F22 $9F12: -D0-I-  .byte $A0 ; <indirect ref>
  0x039F23 $9F13: -D0-I-  .byte $01 ; <indirect ref>
  0x039F24 $9F14: -D0-I-  .byte $A8 ; <indirect ref>
  0x039F25 $9F15: -D0-I-  .byte $01 ; <indirect ref>
  0x039F26 $9F16: -D0-I-  .byte $B0 ; <indirect ref>
  0x039F27 $9F17: -D0-I-  .byte $01 ; <indirect ref>
  0x039F28 $9F18: -D0-I-  .byte $B8 ; <indirect ref>
  0x039F29 $9F19: -D0-I-  .byte $01 ; <indirect ref>
  0x039F2A $9F1A: -D0-I-  .byte $C0 ; <indirect ref>
  0x039F2B $9F1B: -D0-I-  .byte $01 ; <indirect ref>
  0x039F2C $9F1C: -D0-I-  .byte $C8 ; <indirect ref>
  0x039F2D $9F1D: -D0-I-  .byte $01 ; <indirect ref>
  0x039F2E $9F1E: -D0-I-  .byte $D0 ; <indirect ref>
  0x039F2F $9F1F: -D0-I-  .byte $01 ; <indirect ref>
  0x039F30 $9F20: -D0-I-  .byte $E2 ; <indirect ref>
  0x039F31 $9F21: -D0-I-  .byte $01 ; <indirect ref>
  0x039F32 $9F22: -D0-I-  .byte $EA ; <indirect ref>
  0x039F33 $9F23: -D0-I-  .byte $01 ; <indirect ref>
  0x039F34 $9F24: -D0-I-  .byte $F2 ; <indirect ref>
  0x039F35 $9F25: -D0-I-  .byte $01 ; <indirect ref>
  0x039F36 $9F26: -D0-I-  .byte $FA ; <indirect ref>
  0x039F37 $9F27: -D0-I-  .byte $01 ; <indirect ref>
  0x039F38 $9F28: -D0-I-  .byte $02 ; <indirect ref>
  0x039F39 $9F29: -D0-I-  .byte $02 ; <indirect ref>
  0x039F3A $9F2A: -D0-I-  .byte $0A ; <indirect ref>
  0x039F3B $9F2B: -D0-I-  .byte $02 ; <indirect ref>
  0x039F3C $9F2C: -D0-I-  .byte $12 ; <indirect ref>
  0x039F3D $9F2D: -D0-I-  .byte $02 ; <indirect ref>
  0x039F3E $9F2E: -D0-I-  .byte $1A ; <indirect ref>
  0x039F3F $9F2F: -D0-I-  .byte $02 ; <indirect ref>
  0x039F40 $9F30: -D0-I-  .byte $22 ; <indirect ref>
  0x039F41 $9F31: -D0-I-  .byte $02 ; <indirect ref>
  0x039F42 $9F32: -D0-I-  .byte $2A ; <indirect ref>
  0x039F43 $9F33: -D0-I-  .byte $02 ; <indirect ref>
  0x039F44 $9F34: -D0-I-  .byte $32 ; <indirect ref>
  0x039F45 $9F35: -D0-I-  .byte $02 ; <indirect ref>
  0x039F46 $9F36: -D0-I-  .byte $3A ; <indirect ref>
  0x039F47 $9F37: -D0-I-  .byte $02 ; <indirect ref>
  0x039F48 $9F38: -D0-I-  .byte $42 ; <indirect ref>
  0x039F49 $9F39: -D0-I-  .byte $02 ; <indirect ref>
  0x039F4A $9F3A: -D0-I-  .byte $4A ; <indirect ref>
  0x039F4B $9F3B: -D0-I-  .byte $02 ; <indirect ref>
  0x039F4C $9F3C: -D0-I-  .byte $52 ; <indirect ref>
  0x039F4D $9F3D: -D0-I-  .byte $02 ; <indirect ref>
  0x039F4E $9F3E: -D0-I-  .byte $5A ; <indirect ref>
  0x039F4F $9F3F: -D0-I-  .byte $02 ; <indirect ref>
  0x039F50 $9F40: -D0-I-  .byte $62 ; <indirect ref>
  0x039F51 $9F41: -D0-I-  .byte $02 ; <indirect ref>
  0x039F52 $9F42: -D0-I-  .byte $6A ; <indirect ref>
  0x039F53 $9F43: -D0-I-  .byte $02 ; <indirect ref>
  0x039F54 $9F44: -D0-I-  .byte $72 ; <indirect ref>
  0x039F55 $9F45: -D0-I-  .byte $02 ; <indirect ref>
  0x039F56 $9F46: -D0-I-  .byte $7A ; <indirect ref>
  0x039F57 $9F47: -D0-I-  .byte $02 ; <indirect ref>
  0x039F58 $9F48: -D0-I-  .byte $82 ; <indirect ref>
  0x039F59 $9F49: -D0-I-  .byte $02 ; <indirect ref>
  0x039F5A $9F4A: -D0-I-  .byte $8A ; <indirect ref>
  0x039F5B $9F4B: -D0-I-  .byte $02 ; <indirect ref>
  0x039F5C $9F4C: -D0-I-  .byte $92 ; <indirect ref>
  0x039F5D $9F4D: -D0-I-  .byte $02 ; <indirect ref>
  0x039F5E $9F4E: -D0-I-  .byte $98 ; <indirect ref>
  0x039F5F $9F4F: -D0-I-  .byte $02 ; <indirect ref>
  0x039F60 $9F50: -D0-I-  .byte $9E ; <indirect ref>
  0x039F61 $9F51: -D0-I-  .byte $02 ; <indirect ref>
  0x039F62 $9F52: -D0-I-  .byte $A4 ; <indirect ref>
  0x039F63 $9F53: -D0-I-  .byte $02 ; <indirect ref>
  0x039F64 $9F54: -D0-I-  .byte $AA ; <indirect ref>
  0x039F65 $9F55: -D0-I-  .byte $02 ; <indirect ref>
  0x039F66 $9F56: -D0-I-  .byte $B0 ; <indirect ref>
  0x039F67 $9F57: -D0-I-  .byte $02 ; <indirect ref>
  0x039F68 $9F58: -D0-I-  .byte $B6 ; <indirect ref>
  0x039F69 $9F59: -D0-I-  .byte $02 ; <indirect ref>
  0x039F6A $9F5A: -D0-I-  .byte $BC ; <indirect ref>
  0x039F6B $9F5B: -D0-I-  .byte $02 ; <indirect ref>
  0x039F6C $9F5C: -D0-I-  .byte $C2 ; <indirect ref>
  0x039F6D $9F5D: -D0-I-  .byte $02 ; <indirect ref>
  0x039F6E $9F5E: -D0-I-  .byte $C8 ; <indirect ref>
  0x039F6F $9F5F: -D0-I-  .byte $02 ; <indirect ref>
  0x039F70 $9F60: -D0-I-  .byte $CE ; <indirect ref>
  0x039F71 $9F61: -D0-I-  .byte $02 ; <indirect ref>
  0x039F72 $9F62: -D0-I-  .byte $D4 ; <indirect ref>
  0x039F73 $9F63: -D0-I-  .byte $02 ; <indirect ref>
  0x039F74 $9F64: -D0-I-  .byte $DA ; <indirect ref>
  0x039F75 $9F65: -D0-I-  .byte $02 ; <indirect ref>
  0x039F76 $9F66: -D0-I-  .byte $E0 ; <indirect ref>
  0x039F77 $9F67: -D0-I-  .byte $02 ; <indirect ref>
  0x039F78 $9F68: -D0-I-  .byte $E6 ; <indirect ref>
  0x039F79 $9F69: -D0-I-  .byte $02 ; <indirect ref>
  0x039F7A $9F6A: -D0-I-  .byte $EC ; <indirect ref>
  0x039F7B $9F6B: -D0-I-  .byte $02 ; <indirect ref>
  0x039F7C $9F6C: -D0-I-  .byte $F0 ; <indirect ref>
  0x039F7D $9F6D: -D0-I-  .byte $02 ; <indirect ref>
  0x039F7E $9F6E: -D0-I-  .byte $F6 ; <indirect ref>
  0x039F7F $9F6F: -D0-I-  .byte $02 ; <indirect ref>
  0x039F80 $9F70: -D0-I-  .byte $FC ; <indirect ref>
  0x039F81 $9F71: -D0-I-  .byte $02 ; <indirect ref>
  0x039F82 $9F72: -D0-I-  .byte $02 ; <indirect ref>
  0x039F83 $9F73: -D0-I-  .byte $03 ; <indirect ref>
  0x039F84 $9F74: -D0-I-  .byte $08 ; <indirect ref>
  0x039F85 $9F75: -D0-I-  .byte $03 ; <indirect ref>
  0x039F86 $9F76: -D0-I-  .byte $0E ; <indirect ref>
  0x039F87 $9F77: -D0-I-  .byte $03 ; <indirect ref>
  0x039F88 $9F78: -D0-I-  .byte $14 ; <indirect ref>
  0x039F89 $9F79: -D0-I-  .byte $03 ; <indirect ref>
  0x039F8A $9F7A: -D0-I-  .byte $1A ; <indirect ref>
  0x039F8B $9F7B: -D0-I-  .byte $03 ; <indirect ref>
  0x039F8C $9F7C: -D0-I-  .byte $20 ; <indirect ref>
  0x039F8D $9F7D: -D0-I-  .byte $03 ; <indirect ref>
  0x039F8E $9F7E: -D0-I-  .byte $26 ; <indirect ref>
  0x039F8F $9F7F: -D0-I-  .byte $03 ; <indirect ref>
  0x039F90 $9F80: -D0-I-  .byte $2C ; <indirect ref>
  0x039F91 $9F81: -D0-I-  .byte $03 ; <indirect ref>
  0x039F92 $9F82: -D0-I-  .byte $32 ; <indirect ref>
  0x039F93 $9F83: -D0-I-  .byte $03 ; <indirect ref>
  0x039F94 $9F84: -D0-I-  .byte $38 ; <indirect ref>
  0x039F95 $9F85: -D0-I-  .byte $03 ; <indirect ref>
  0x039F96 $9F86: -D0-I-  .byte $3E ; <indirect ref>
  0x039F97 $9F87: -D0-I-  .byte $03 ; <indirect ref>
  0x039F98 $9F88: -D0-I-  .byte $44 ; <indirect ref>
  0x039F99 $9F89: -D0-I-  .byte $03 ; <indirect ref>
  0x039F9A $9F8A: -D0-I-  .byte $4A ; <indirect ref>
  0x039F9B $9F8B: -D0-I-  .byte $03 ; <indirect ref>
  0x039F9C $9F8C: -D0-I-  .byte $50 ; <indirect ref>
  0x039F9D $9F8D: -D0-I-  .byte $03 ; <indirect ref>
  0x039F9E $9F8E: -D0-I-  .byte $54 ; <indirect ref>
  0x039F9F $9F8F: -D0-I-  .byte $03 ; <indirect ref>
  0x039FA0 $9F90: -D0-I-  .byte $58 ; <indirect ref>
  0x039FA1 $9F91: -D0-I-  .byte $03 ; <indirect ref>
  0x039FA2 $9F92: -D0-I-  .byte $5C ; <indirect ref>
  0x039FA3 $9F93: -D0-I-  .byte $03 ; <indirect ref>
  0x039FA4 $9F94: -D0-I-  .byte $60 ; <indirect ref>
  0x039FA5 $9F95: -D0-I-  .byte $03 ; <indirect ref>
  0x039FA6 $9F96: -D0-I-  .byte $64 ; <indirect ref>
  0x039FA7 $9F97: -D0-I-  .byte $03 ; <indirect ref>
  0x039FA8 $9F98: -D0-I-  .byte $68 ; <indirect ref>
  0x039FA9 $9F99: -D0-I-  .byte $03 ; <indirect ref>
  0x039FAA $9F9A: -D0-I-  .byte $6C ; <indirect ref>
  0x039FAB $9F9B: -D0-I-  .byte $03 ; <indirect ref>
  0x039FAC $9F9C: -D0-I-  .byte $70 ; <indirect ref>
  0x039FAD $9F9D: -D0-I-  .byte $03 ; <indirect ref>
  0x039FAE $9F9E: -D0-I-  .byte $74 ; <indirect ref>
  0x039FAF $9F9F: -D0-I-  .byte $03 ; <indirect ref>
  0x039FB0 $9FA0: -D0-I-  .byte $78 ; <indirect ref>
  0x039FB1 $9FA1: -D0-I-  .byte $03 ; <indirect ref>
  0x039FB2 $9FA2: -D0-I-  .byte $7C ; <indirect ref>
  0x039FB3 $9FA3: -D0-I-  .byte $03 ; <indirect ref>
  0x039FB4 $9FA4: -D0-I-  .byte $80 ; <indirect ref>
  0x039FB5 $9FA5: -D0-I-  .byte $03 ; <indirect ref>
  0x039FB6 $9FA6: -D0-I-  .byte $84 ; <indirect ref>
  0x039FB7 $9FA7: -D0-I-  .byte $03 ; <indirect ref>
  0x039FB8 $9FA8: -D0-I-  .byte $88 ; <indirect ref>
  0x039FB9 $9FA9: -D0-I-  .byte $03 ; <indirect ref>
  0x039FBA $9FAA: -D0-I-  .byte $8C ; <indirect ref>
  0x039FBB $9FAB: -D0-I-  .byte $03 ; <indirect ref>
  0x039FBC $9FAC: -D0-I-  .byte $90 ; <indirect ref>
  0x039FBD $9FAD: -D0-I-  .byte $03 ; <indirect ref>
  0x039FBE $9FAE: -D0-I-  .byte $94 ; <indirect ref>
  0x039FBF $9FAF: -D0-I-  .byte $03 ; <indirect ref>
  0x039FC0 $9FB0: -D0-I-  .byte $98 ; <indirect ref>
  0x039FC1 $9FB1: -D0-I-  .byte $03 ; <indirect ref>
  0x039FC2 $9FB2: ------  .byte $9C
  0x039FC3 $9FB3: ------  .byte $03
  0x039FC4 $9FB4: ------  .byte $A0
  0x039FC5 $9FB5: ------  .byte $03
  0x039FC6 $9FB6: ------  .byte $A4
  0x039FC7 $9FB7: ------  .byte $03
  0x039FC8 $9FB8: ------  .byte $A8
  0x039FC9 $9FB9: ------  .byte $03
  0x039FCA $9FBA: ------  .byte $AC
  0x039FCB $9FBB: ------  .byte $03
  0x039FCC $9FBC: ------  .byte $B0
  0x039FCD $9FBD: ------  .byte $03
  0x039FCE $9FBE: ------  .byte $B4
  0x039FCF $9FBF: ------  .byte $03
  0x039FD0 $9FC0: ------  .byte $B8
  0x039FD1 $9FC1: ------  .byte $03
  0x039FD2 $9FC2: ------  .byte $BC
  0x039FD3 $9FC3: ------  .byte $03
  0x039FD4 $9FC4: ------  .byte $C0
  0x039FD5 $9FC5: ------  .byte $03
  0x039FD6 $9FC6: ------  .byte $C4
  0x039FD7 $9FC7: ------  .byte $03
  0x039FD8 $9FC8: ------  .byte $C8
  0x039FD9 $9FC9: ------  .byte $03
  0x039FDA $9FCA: ------  .byte $CC
  0x039FDB $9FCB: ------  .byte $03
  0x039FDC $9FCC: ------  .byte $D0
  0x039FDD $9FCD: ------  .byte $03
  0x039FDE $9FCE: -D0-I-  .byte $00 ; <indirect ref>
  0x039FDF $9FCF: -D0-I-  .byte $00 ; <indirect ref>
  0x039FE0 $9FD0: -D0-I-  .byte $00 ; <indirect ref>
  0x039FE1 $9FD1: -D0-I-  .byte $00 ; <indirect ref>
  0x039FE2 $9FD2: -D0-I-  .byte $00 ; <indirect ref>
  0x039FE3 $9FD3: -D0-I-  .byte $00 ; <indirect ref>
  0x039FE4 $9FD4: -D0-I-  .byte $00 ; <indirect ref>
  0x039FE5 $9FD5: -D0-I-  .byte $00 ; <indirect ref>
  0x039FE6 $9FD6: -D0-I-  .byte $00 ; <indirect ref>
  0x039FE7 $9FD7: -D0-I-  .byte $00 ; <indirect ref>
  0x039FE8 $9FD8: -D0-I-  .byte $00 ; <indirect ref>
  0x039FE9 $9FD9: -D0-I-  .byte $00 ; <indirect ref>
  0x039FEA $9FDA: -D0-I-  .byte $00 ; <indirect ref>
  0x039FEB $9FDB: -D0-I-  .byte $00 ; <indirect ref>
  0x039FEC $9FDC: -D0-I-  .byte $00 ; <indirect ref>
  0x039FED $9FDD: -D0-I-  .byte $00 ; <indirect ref>
  0x039FEE $9FDE: -D0-I-  .byte $00 ; <indirect ref>
  0x039FEF $9FDF: -D0-I-  .byte $00 ; <indirect ref>
  0x039FF0 $9FE0: -D0-I-  .byte $00 ; <indirect ref>
  0x039FF1 $9FE1: -D0-I-  .byte $00 ; <indirect ref>
  0x039FF2 $9FE2: -D0-I-  .byte $00 ; <indirect ref>
  0x039FF3 $9FE3: -D0-I-  .byte $00 ; <indirect ref>
  0x039FF4 $9FE4: -D0-I-  .byte $00 ; <indirect ref>
  0x039FF5 $9FE5: ------  .byte $00
  0x039FF6 $9FE6: -D0-I-  .byte $2E ; <indirect ref>
  0x039FF7 $9FE7: -D0-I-  .byte $0F ; <indirect ref>
  0x039FF8 $9FE8: -D0-I-  .byte $15 ; <indirect ref>
  0x039FF9 $9FE9: -D0-I-  .byte $18 ; <indirect ref>
  0x039FFA $9FEA: -D0-I-  .byte $0C ; <indirect ref>
  0x039FFB $9FEB: -D0-I-  .byte $0F ; <indirect ref>
  0x039FFC $9FEC: -D0-I-  .byte $0F ; <indirect ref>
  0x039FFD $9FED: -D0-I-  .byte $12 ; <indirect ref>
  0x039FFE $9FEE: -D0-I-  .byte $15 ; <indirect ref>
  0x039FFF $9FEF: -D0-I-  .byte $0C ; <indirect ref>
  0x03A000 $9FF0: -D0-I-  .byte $17 ; <indirect ref>
  0x03A001 $9FF1: -D0-I-  .byte $0E ; <indirect ref>
  0x03A002 $9FF2: -D0-I-  .byte $0C ; <indirect ref>
  0x03A003 $9FF3: -D0-I-  .byte $10 ; <indirect ref>
  0x03A004 $9FF4: -D0-I-  .byte $0E ; <indirect ref>
  0x03A005 $9FF5: -D0-I-  .byte $12 ; <indirect ref>
  0x03A006 $9FF6: -D0-I-  .byte $15 ; <indirect ref>
  0x03A007 $9FF7: -D0-I-  .byte $0C ; <indirect ref>
  0x03A008 $9FF8: -D0-I-  .byte $17 ; <indirect ref>
  0x03A009 $9FF9: -D0-I-  .byte $0E ; <indirect ref>
  0x03A00A $9FFA: -D0-I-  .byte $0C ; <indirect ref>
  0x03A00B $9FFB: -D0-I-  .byte $10 ; <indirect ref>
  0x03A00C $9FFC: -D0-I-  .byte $0E ; <indirect ref>
  0x03A00D $9FFD: ------  .byte $00
  0x03A00E $9FFE: -D0-I-  .byte $20 ; <indirect ref>
  0x03A00F $9FFF: -D0-I-  .byte $0E ; <indirect ref>