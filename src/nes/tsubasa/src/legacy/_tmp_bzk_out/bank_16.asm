; ===== MMC3 Bank 16 =====
; ROM: 0x020010-0x02200F
; CPU: $8000-$9FFF
; CDL: code=1860 data=4599 unaccessed=1733

  0x020010 $8000: C-----  4C 06 80 JMP  $8006
  0x020013 $8003: C-----  4C 21 80 JMP  $8021
  0x020016 $8006: C-----  A2 89    LDX  #$89
  0x020018 $8008: C-----  AD 18 05 LDA  $0518
  0x02001B $800B: C-----  0A       ASL  A
  0x02001C $800C: C-----  A8       TAY  
  0x02001D $800D: C-----  90 01    BCC  $8010
  0x02001F $800F: ------  .byte $E8
  0x020020 $8010: C-----  A9 BF    LDA  #$BF
  0x020022 $8012: C-----  85 5D    STA  $5D
  0x020024 $8014: C-----  86 5E    STX  $5E
  0x020026 $8016: C-----  B1 5D    LDA  ($5D),Y
  0x020028 $8018: C-----  AA       TAX  
  0x020029 $8019: C-----  C8       INY  
  0x02002A $801A: C-----  B1 5D    LDA  ($5D),Y
  0x02002C $801C: C-----  85 5E    STA  $5E
  0x02002E $801E: C-----  86 5D    STX  $5D
  0x020030 $8020: C-----  60       RTS  
  0x020031 $8021: C-----  AD 17 05 LDA  $0517
  0x020034 $8024: C-----  8D 2A 05 STA  $052A
  0x020037 $8027: C-----  AD 16 05 LDA  $0516
  0x02003A $802A: C-----  29 FB    AND  #$FB
  0x02003C $802C: C-----  8D 16 05 STA  $0516
  0x02003F $802F: C-----  A9 00    LDA  #$00
  0x020041 $8031: C-----  8D 2B 05 STA  $052B
  0x020044 $8034: C-----  8D 2D 05 STA  $052D
  0x020047 $8037: C-----  8D 2C 05 STA  $052C
  0x02004A $803A: C-----  8D 30 05 STA  $0530
  0x02004D $803D: C-----  85 3A    STA  $3A
  0x02004F $803F: C-----  A4 3A    LDY  $3A
  0x020051 $8041: C-----  E6 3A    INC  $3A
  0x020053 $8043: C-----  B1 5D    LDA  ($5D),Y
  0x020055 $8045: C-----  C9 F0    CMP  #$F0
  0x020057 $8047: C-----  90 06    BCC  $804F
  0x020059 $8049: C-----  20 A9 80 JSR  $80A9
  0x02005C $804C: C-----  4C 3F 80 JMP  $803F
  0x02005F $804F: C-----  8D 23 05 STA  $0523
  0x020062 $8052: C-----  AD 16 05 LDA  $0516
  0x020065 $8055: C-----  09 40    ORA  #$40
  0x020067 $8057: C-----  29 EF    AND  #$EF
  0x020069 $8059: C-----  8D 16 05 STA  $0516
  0x02006C $805C: C-----  A4 3A    LDY  $3A
  0x02006E $805E: C-----  E6 3A    INC  $3A
  0x020070 $8060: C-----  B1 5D    LDA  ($5D),Y
  0x020072 $8062: C-----  C9 F0    CMP  #$F0
  0x020074 $8064: C-----  90 03    BCC  $8069
  0x020076 $8066: C-----  20 91 89 JSR  $8991
  0x020079 $8069: C-----  8D 24 05 STA  $0524
  0x02007C $806C: C-----  A4 3A    LDY  $3A
  0x02007E $806E: C-----  E6 3A    INC  $3A
  0x020080 $8070: C-----  B1 5D    LDA  ($5D),Y
  0x020082 $8072: C-----  C9 F0    CMP  #$F0
  0x020084 $8074: C-----  90 03    BCC  $8079
  0x020086 $8076: C-----  20 9C 89 JSR  $899C
  0x020089 $8079: C-----  8D 28 05 STA  $0528
  0x02008C $807C: C-----  A4 3A    LDY  $3A
  0x02008E $807E: C-----  E6 3A    INC  $3A
  0x020090 $8080: C-----  B1 5D    LDA  ($5D),Y
  0x020092 $8082: C-----  C9 F0    CMP  #$F0
  0x020094 $8084: C-----  90 03    BCC  $8089
  0x020096 $8086: C-----  20 A7 89 JSR  $89A7
  0x020099 $8089: C-----  8D 29 05 STA  $0529
  0x02009C $808C: C-----  A5 3A    LDA  $3A
  0x02009E $808E: C-----  18       CLC  
  0x02009F $808F: C-----  65 5D    ADC  $5D
  0x0200A1 $8091: C-----  85 5D    STA  $5D
  0x0200A3 $8093: C-----  90 02    BCC  $8097
  0x0200A5 $8095: C-----  E6 5E    INC  $5E
  0x0200A7 $8097: C-----  A2 15    LDX  #$15
  0x0200A9 $8099: C-----  A9 F0    LDA  #$F0
  0x0200AB $809B: C-----  95 01    STA  $01,X
  0x0200AD $809D: C-----  A9 0B    LDA  #$0B
  0x0200AF $809F: C-----  95 02    STA  $02,X
  0x0200B1 $80A1: C-----  A9 80    LDA  #$80
  0x0200B3 $80A3: C-----  A0 08    LDY  #$08
  0x0200B5 $80A5: C-----  20 0F C5 JSR  $C50F
  0x0200B8 $80A8: C-----  60       RTS  
  0x0200B9 $80A9: C-----  38       SEC  
  0x0200BA $80AA: C-----  E9 F0    SBC  #$F0
  0x0200BC $80AC: C-----  20 09 C5 JSR  $C509
  0x0200BF $80AF: -D0-I-  .byte $CF ; <indirect ref>
  0x0200C0 $80B0: -D0-I-  .byte $80 ; <indirect ref>
  0x0200C1 $80B1: -D0-I-  .byte $D4 ; <indirect ref>
  0x0200C2 $80B2: -D0-I-  .byte $80 ; <indirect ref>
  0x0200C3 $80B3: -D0-I-  .byte $F4 ; <indirect ref>
  0x0200C4 $80B4: -D0-I-  .byte $80 ; <indirect ref>
  0x0200C5 $80B5: -D0-I-  .byte $05 ; <indirect ref>
  0x0200C6 $80B6: -D0-I-  .byte $81 ; <indirect ref>
  0x0200C7 $80B7: -D0-I-  .byte $E0 ; <indirect ref>
  0x0200C8 $80B8: -D0-I-  .byte $87 ; <indirect ref>
  0x0200C9 $80B9: -D0-I-  .byte $E6 ; <indirect ref>
  0x0200CA $80BA: -D0-I-  .byte $87 ; <indirect ref>
  0x0200CB $80BB: -D0-I-  .byte $EC ; <indirect ref>
  0x0200CC $80BC: -D0-I-  .byte $87 ; <indirect ref>
  0x0200CD $80BD: -D0-I-  .byte $F5 ; <indirect ref>
  0x0200CE $80BE: -D0-I-  .byte $87 ; <indirect ref>
  0x0200CF $80BF: -D0-I-  .byte $FF ; <indirect ref>
  0x0200D0 $80C0: -D0-I-  .byte $87 ; <indirect ref>
  0x0200D1 $80C1: -D0-I-  .byte $09 ; <indirect ref>
  0x0200D2 $80C2: -D0-I-  .byte $88 ; <indirect ref>
  0x0200D3 $80C3: -D0-I-  .byte $1A ; <indirect ref>
  0x0200D4 $80C4: -D0-I-  .byte $88 ; <indirect ref>
  0x0200D5 $80C5: -D0-I-  .byte $37 ; <indirect ref>
  0x0200D6 $80C6: -D0-I-  .byte $88 ; <indirect ref>
  0x0200D7 $80C7: -D0-I-  .byte $53 ; <indirect ref>
  0x0200D8 $80C8: -D0-I-  .byte $88 ; <indirect ref>
  0x0200D9 $80C9: -D0-I-  .byte $5D ; <indirect ref>
  0x0200DA $80CA: -D0-I-  .byte $88 ; <indirect ref>
  0x0200DB $80CB: -D0-I-  .byte $E3 ; <indirect ref>
  0x0200DC $80CC: -D0-I-  .byte $88 ; <indirect ref>
  0x0200DD $80CD: -D0-I-  .byte $ED ; <indirect ref>
  0x0200DE $80CE: -D0-I-  .byte $88 ; <indirect ref>
  0x0200DF $80CF: C-----  A9 00    LDA  #$00
  0x0200E1 $80D1: C-----  8D 2A 05 STA  $052A
  0x0200E4 $80D4: C-----  A9 08    LDA  #$08
  0x0200E6 $80D6: C-----  2C 16 05 BIT  $0516
  0x0200E9 $80D9: C-----  D0 0B    BNE  $80E6
  0x0200EB $80DB: C-----  0D 16 05 ORA  $0516
  0x0200EE $80DE: C-----  8D 16 05 STA  $0516
  0x0200F1 $80E1: C-----  A2 05    LDX  #$05
  0x0200F3 $80E3: C-----  20 1B C5 JSR  $C51B
  0x0200F6 $80E6: C-----  A9 00    LDA  #$00
  0x0200F8 $80E8: C-----  8D 22 05 STA  $0522
  0x0200FB $80EB: C-----  A5 21    LDA  $21
  0x0200FD $80ED: C-----  29 1E    AND  #$1E
  0x0200FF $80EF: C-----  85 21    STA  $21
  0x020101 $80F1: C-----  68       PLA  
  0x020102 $80F2: C-----  68       PLA  
  0x020103 $80F3: C-----  60       RTS  
  0x020104 $80F4: C--J--  A4 3A    LDY  $3A
  0x020106 $80F6: C-----  B1 5D    LDA  ($5D),Y
  0x020108 $80F8: C-----  AA       TAX  
  0x020109 $80F9: C-----  C8       INY  
  0x02010A $80FA: C-----  B1 5D    LDA  ($5D),Y
  0x02010C $80FC: C-----  85 5E    STA  $5E
  0x02010E $80FE: C-----  86 5D    STX  $5D
  0x020110 $8100: C-----  A9 00    LDA  #$00
  0x020112 $8102: C-----  85 3A    STA  $3A
  0x020114 $8104: C-----  60       RTS  
  0x020115 $8105: C--J--  A4 3A    LDY  $3A
  0x020117 $8107: C-----  B1 5D    LDA  ($5D),Y
  0x020119 $8109: C-----  48       PHA  
  0x02011A $810A: C-----  20 6E 81 JSR  $816E
  0x02011D $810D: C-----  68       PLA  
  0x02011E $810E: C-----  10 1F    BPL  $812F
  0x020120 $8110: C-----  8A       TXA  
  0x020121 $8111: C-----  38       SEC  
  0x020122 $8112: C-----  65 3A    ADC  $3A
  0x020124 $8114: C-----  18       CLC  
  0x020125 $8115: C-----  65 5D    ADC  $5D
  0x020127 $8117: C-----  85 5D    STA  $5D
  0x020129 $8119: C-----  90 02    BCC  $811D
  0x02012B $811B: C-----  E6 5E    INC  $5E
  0x02012D $811D: C-----  A0 00    LDY  #$00
  0x02012F $811F: C-----  B1 5D    LDA  ($5D),Y
  0x020131 $8121: C-----  18       CLC  
  0x020132 $8122: C-----  65 5D    ADC  $5D
  0x020134 $8124: C-----  85 5D    STA  $5D
  0x020136 $8126: C-----  90 02    BCC  $812A
  0x020138 $8128: C-----  E6 5E    INC  $5E
  0x02013A $812A: C-----  A9 00    LDA  #$00
  0x02013C $812C: C-----  85 3A    STA  $3A
  0x02013E $812E: C-----  60       RTS  
  0x02013F $812F: C-----  8A       TXA  
  0x020140 $8130: C-----  0A       ASL  A
  0x020141 $8131: C-----  38       SEC  
  0x020142 $8132: C-----  65 3A    ADC  $3A
  0x020144 $8134: C-----  A8       TAY  
  0x020145 $8135: C-----  4C F6 80 JMP  $80F6
  0x020148 $8138: C-----  29 FC    AND  #$FC
  0x02014A $813A: C-----  F0 11    BEQ  $814D
  0x02014C $813C: C-----  4A       LSR  A
  0x02014D $813D: C-----  85 3B    STA  $3B
  0x02014F $813F: C-----  AD E2 00 LDA  $00E2
  0x020152 $8142: C-----  C5 3B    CMP  $3B
  0x020154 $8144: C-----  90 05    BCC  $814B
  0x020156 $8146: C-----  E5 3B    SBC  $3B
  0x020158 $8148: C-----  4C 42 81 JMP  $8142
  0x02015B $814B: C-----  65 3B    ADC  $3B
  0x02015D $814D: C-----  A2 00    LDX  #$00
  0x02015F $814F: C-----  60       RTS  
  0x020160 $8150: C-----  20 0C C5 JSR  $C50C
  0x020163 $8153: C-----  A0 01    LDY  #$01
  0x020165 $8155: C-----  B1 34    LDA  ($34),Y
  0x020167 $8157: C-----  38       SEC  
  0x020168 $8158: C-----  E9 40    SBC  #$40
  0x02016A $815A: C-----  AA       TAX  
  0x02016B $815B: C-----  C8       INY  
  0x02016C $815C: C-----  B1 34    LDA  ($34),Y
  0x02016E $815E: C-----  E9 00    SBC  #$00
  0x020170 $8160: C-----  10 03    BPL  $8165
  0x020172 $8162: C-----  A2 00    LDX  #$00
  0x020174 $8164: C-----  8A       TXA  
  0x020175 $8165: C-----  91 34    STA  ($34),Y
  0x020177 $8167: C-----  88       DEY  
  0x020178 $8168: C-----  8A       TXA  
  0x020179 $8169: C-----  91 34    STA  ($34),Y
  0x02017B $816B: C-----  A2 01    LDX  #$01
  0x02017D $816D: C-----  60       RTS  
  0x02017E $816E: C-----  29 7F    AND  #$7F
  0x020180 $8170: C-----  20 09 C5 JSR  $C509
  0x020183 $8173: -D0-I-  .byte $1C ; <indirect ref>
  0x020184 $8174: -D0-I-  .byte $82 ; <indirect ref>
  0x020185 $8175: -D0-I-  .byte $2C ; <indirect ref>
  0x020186 $8176: -D0-I-  .byte $82 ; <indirect ref>
  0x020187 $8177: -D0-I-  .byte $51 ; <indirect ref>
  0x020188 $8178: -D0-I-  .byte $82 ; <indirect ref>
  0x020189 $8179: -D0-I-  .byte $55 ; <indirect ref>
  0x02018A $817A: -D0-I-  .byte $82 ; <indirect ref>
  0x02018B $817B: -D0-I-  .byte $59 ; <indirect ref>
  0x02018C $817C: -D0-I-  .byte $82 ; <indirect ref>
  0x02018D $817D: -D0-I-  .byte $60 ; <indirect ref>
  0x02018E $817E: -D0-I-  .byte $82 ; <indirect ref>
  0x02018F $817F: -D0-I-  .byte $64 ; <indirect ref>
  0x020190 $8180: -D0-I-  .byte $82 ; <indirect ref>
  0x020191 $8181: -D0-I-  .byte $71 ; <indirect ref>
  0x020192 $8182: -D0-I-  .byte $82 ; <indirect ref>
  0x020193 $8183: -D0-I-  .byte $75 ; <indirect ref>
  0x020194 $8184: -D0-I-  .byte $82 ; <indirect ref>
  0x020195 $8185: -D0-I-  .byte $8A ; <indirect ref>
  0x020196 $8186: -D0-I-  .byte $82 ; <indirect ref>
  0x020197 $8187: -D0-I-  .byte $97 ; <indirect ref>
  0x020198 $8188: -D0-I-  .byte $82 ; <indirect ref>
  0x020199 $8189: -D0-I-  .byte $9B ; <indirect ref>
  0x02019A $818A: -D0-I-  .byte $82 ; <indirect ref>
  0x02019B $818B: -D0-I-  .byte $9F ; <indirect ref>
  0x02019C $818C: -D0-I-  .byte $82 ; <indirect ref>
  0x02019D $818D: -D0-I-  .byte $BA ; <indirect ref>
  0x02019E $818E: -D0-I-  .byte $82 ; <indirect ref>
  0x02019F $818F: -D0-I-  .byte $66 ; <indirect ref>
  0x0201A0 $8190: -D0-I-  .byte $83 ; <indirect ref>
  0x0201A1 $8191: -D0-I-  .byte $6A ; <indirect ref>
  0x0201A2 $8192: -D0-I-  .byte $83 ; <indirect ref>
  0x0201A3 $8193: -D0-I-  .byte $6E ; <indirect ref>
  0x0201A4 $8194: -D0-I-  .byte $83 ; <indirect ref>
  0x0201A5 $8195: -D0-I-  .byte $7C ; <indirect ref>
  0x0201A6 $8196: -D0-I-  .byte $83 ; <indirect ref>
  0x0201A7 $8197: -D0-I-  .byte $80 ; <indirect ref>
  0x0201A8 $8198: -D0-I-  .byte $83 ; <indirect ref>
  0x0201A9 $8199: -D0-I-  .byte $84 ; <indirect ref>
  0x0201AA $819A: -D0-I-  .byte $83 ; <indirect ref>
  0x0201AB $819B: -D0-I-  .byte $A4 ; <indirect ref>
  0x0201AC $819C: -D0-I-  .byte $83 ; <indirect ref>
  0x0201AD $819D: -D0-I-  .byte $A8 ; <indirect ref>
  0x0201AE $819E: -D0-I-  .byte $83 ; <indirect ref>
  0x0201AF $819F: -D0-I-  .byte $B4 ; <indirect ref>
  0x0201B0 $81A0: -D0-I-  .byte $83 ; <indirect ref>
  0x0201B1 $81A1: -D0-I-  .byte $C2 ; <indirect ref>
  0x0201B2 $81A2: -D0-I-  .byte $83 ; <indirect ref>
  0x0201B3 $81A3: -D0-I-  .byte $C6 ; <indirect ref>
  0x0201B4 $81A4: -D0-I-  .byte $83 ; <indirect ref>
  0x0201B5 $81A5: ------  .byte $D6
  0x0201B6 $81A6: ------  .byte $83
  0x0201B7 $81A7: ------  .byte $DD
  0x0201B8 $81A8: ------  .byte $83
  0x0201B9 $81A9: -D0-I-  .byte $E4 ; <indirect ref>
  0x0201BA $81AA: -D0-I-  .byte $83 ; <indirect ref>
  0x0201BB $81AB: -D0-I-  .byte $EB ; <indirect ref>
  0x0201BC $81AC: -D0-I-  .byte $83 ; <indirect ref>
  0x0201BD $81AD: -D0-I-  .byte $F5 ; <indirect ref>
  0x0201BE $81AE: -D0-I-  .byte $83 ; <indirect ref>
  0x0201BF $81AF: -D0-I-  .byte $01 ; <indirect ref>
  0x0201C0 $81B0: -D0-I-  .byte $84 ; <indirect ref>
  0x0201C1 $81B1: -D0-I-  .byte $0A ; <indirect ref>
  0x0201C2 $81B2: -D0-I-  .byte $84 ; <indirect ref>
  0x0201C3 $81B3: -D0-I-  .byte $0E ; <indirect ref>
  0x0201C4 $81B4: -D0-I-  .byte $84 ; <indirect ref>
  0x0201C5 $81B5: -D0-I-  .byte $2B ; <indirect ref>
  0x0201C6 $81B6: -D0-I-  .byte $84 ; <indirect ref>
  0x0201C7 $81B7: -D0-I-  .byte $36 ; <indirect ref>
  0x0201C8 $81B8: -D0-I-  .byte $84 ; <indirect ref>
  0x0201C9 $81B9: -D0-I-  .byte $3E ; <indirect ref>
  0x0201CA $81BA: -D0-I-  .byte $84 ; <indirect ref>
  0x0201CB $81BB: ------  .byte $42
  0x0201CC $81BC: ------  .byte $84
  0x0201CD $81BD: -D0-I-  .byte $4E ; <indirect ref>
  0x0201CE $81BE: -D0-I-  .byte $84 ; <indirect ref>
  0x0201CF $81BF: -D0-I-  .byte $57 ; <indirect ref>
  0x0201D0 $81C0: -D0-I-  .byte $84 ; <indirect ref>
  0x0201D1 $81C1: -D0-I-  .byte $4E ; <indirect ref>
  0x0201D2 $81C2: -D0-I-  .byte $84 ; <indirect ref>
  0x0201D3 $81C3: -D0-I-  .byte $7E ; <indirect ref>
  0x0201D4 $81C4: -D0-I-  .byte $84 ; <indirect ref>
  0x0201D5 $81C5: -D0-I-  .byte $98 ; <indirect ref>
  0x0201D6 $81C6: -D0-I-  .byte $84 ; <indirect ref>
  0x0201D7 $81C7: -D0-I-  .byte $B2 ; <indirect ref>
  0x0201D8 $81C8: -D0-I-  .byte $84 ; <indirect ref>
  0x0201D9 $81C9: -D0-I-  .byte $C7 ; <indirect ref>
  0x0201DA $81CA: -D0-I-  .byte $84 ; <indirect ref>
  0x0201DB $81CB: -D0-I-  .byte $E7 ; <indirect ref>
  0x0201DC $81CC: -D0-I-  .byte $84 ; <indirect ref>
  0x0201DD $81CD: -D0-I-  .byte $EF ; <indirect ref>
  0x0201DE $81CE: -D0-I-  .byte $84 ; <indirect ref>
  0x0201DF $81CF: -D0-I-  .byte $FC ; <indirect ref>
  0x0201E0 $81D0: -D0-I-  .byte $84 ; <indirect ref>
  0x0201E1 $81D1: -D0-I-  .byte $0B ; <indirect ref>
  0x0201E2 $81D2: -D0-I-  .byte $85 ; <indirect ref>
  0x0201E3 $81D3: -D0-I-  .byte $27 ; <indirect ref>
  0x0201E4 $81D4: -D0-I-  .byte $85 ; <indirect ref>
  0x0201E5 $81D5: -D0-I-  .byte $3A ; <indirect ref>
  0x0201E6 $81D6: -D0-I-  .byte $85 ; <indirect ref>
  0x0201E7 $81D7: -D0-I-  .byte $46 ; <indirect ref>
  0x0201E8 $81D8: -D0-I-  .byte $85 ; <indirect ref>
  0x0201E9 $81D9: -D0-I-  .byte $56 ; <indirect ref>
  0x0201EA $81DA: -D0-I-  .byte $85 ; <indirect ref>
  0x0201EB $81DB: -D0-I-  .byte $6C ; <indirect ref>
  0x0201EC $81DC: -D0-I-  .byte $85 ; <indirect ref>
  0x0201ED $81DD: -D0-I-  .byte $70 ; <indirect ref>
  0x0201EE $81DE: -D0-I-  .byte $85 ; <indirect ref>
  0x0201EF $81DF: -D0-I-  .byte $80 ; <indirect ref>
  0x0201F0 $81E0: -D0-I-  .byte $85 ; <indirect ref>
  0x0201F1 $81E1: -D0-I-  .byte $87 ; <indirect ref>
  0x0201F2 $81E2: -D0-I-  .byte $85 ; <indirect ref>
  0x0201F3 $81E3: -D0-I-  .byte $92 ; <indirect ref>
  0x0201F4 $81E4: -D0-I-  .byte $85 ; <indirect ref>
  0x0201F5 $81E5: -D0-I-  .byte $A2 ; <indirect ref>
  0x0201F6 $81E6: -D0-I-  .byte $85 ; <indirect ref>
  0x0201F7 $81E7: -D0-I-  .byte $B2 ; <indirect ref>
  0x0201F8 $81E8: -D0-I-  .byte $85 ; <indirect ref>
  0x0201F9 $81E9: -D0-I-  .byte $BE ; <indirect ref>
  0x0201FA $81EA: -D0-I-  .byte $85 ; <indirect ref>
  0x0201FB $81EB: -D0-I-  .byte $CA ; <indirect ref>
  0x0201FC $81EC: -D0-I-  .byte $85 ; <indirect ref>
  0x0201FD $81ED: -D0-I-  .byte $DA ; <indirect ref>
  0x0201FE $81EE: -D0-I-  .byte $85 ; <indirect ref>
  0x0201FF $81EF: -D0-I-  .byte $E6 ; <indirect ref>
  0x020200 $81F0: -D0-I-  .byte $85 ; <indirect ref>
  0x020201 $81F1: -D0-I-  .byte $FE ; <indirect ref>
  0x020202 $81F2: -D0-I-  .byte $85 ; <indirect ref>
  0x020203 $81F3: -D0-I-  .byte $02 ; <indirect ref>
  0x020204 $81F4: -D0-I-  .byte $86 ; <indirect ref>
  0x020205 $81F5: -D0-I-  .byte $10 ; <indirect ref>
  0x020206 $81F6: -D0-I-  .byte $86 ; <indirect ref>
  0x020207 $81F7: -D0-I-  .byte $27 ; <indirect ref>
  0x020208 $81F8: -D0-I-  .byte $86 ; <indirect ref>
  0x020209 $81F9: -D0-I-  .byte $2E ; <indirect ref>
  0x02020A $81FA: -D0-I-  .byte $86 ; <indirect ref>
  0x02020B $81FB: -D0-I-  .byte $3B ; <indirect ref>
  0x02020C $81FC: -D0-I-  .byte $86 ; <indirect ref>
  0x02020D $81FD: -D0-I-  .byte $4A ; <indirect ref>
  0x02020E $81FE: -D0-I-  .byte $86 ; <indirect ref>
  0x02020F $81FF: -D0-I-  .byte $77 ; <indirect ref>
  0x020210 $8200: -D0-I-  .byte $86 ; <indirect ref>
  0x020211 $8201: -D0-I-  .byte $8A ; <indirect ref>
  0x020212 $8202: -D0-I-  .byte $86 ; <indirect ref>
  0x020213 $8203: -D0-I-  .byte $B6 ; <indirect ref>
  0x020214 $8204: -D0-I-  .byte $86 ; <indirect ref>
  0x020215 $8205: -D0-I-  .byte $CC ; <indirect ref>
  0x020216 $8206: -D0-I-  .byte $86 ; <indirect ref>
  0x020217 $8207: C-----  20 0C C5 JSR  $C50C
  0x02021A $820A: C-----  A0 00    LDY  #$00
  0x02021C $820C: C-----  B1 34    LDA  ($34),Y
  0x02021E $820E: C-----  A2 00    LDX  #$00
  0x020220 $8210: C-----  60       RTS  
  0x020221 $8211: C-----  F0 08    BEQ  $821B
  0x020223 $8213: C-----  AD 16 05 LDA  $0516
  0x020226 $8216: C-----  09 04    ORA  #$04
  0x020228 $8218: C-----  8D 16 05 STA  $0516
  0x02022B $821B: C-----  60       RTS  
  0x02022C $821C: C--J--  AD 42 04 LDA  $0442
  0x02022F $821F: C-----  20 0C C5 JSR  $C50C
  0x020232 $8222: C-----  A0 00    LDY  #$00
  0x020234 $8224: C-----  A2 00    LDX  #$00
  0x020236 $8226: C-----  B1 34    LDA  ($34),Y
  0x020238 $8228: C-----  D0 01    BNE  $822B
  0x02023A $822A: C-----  E8       INX  
  0x02023B $822B: C-----  60       RTS  
  0x02023C $822C: C--J--  AD 44 04 LDA  $0444
  0x02023F $822F: C-----  AC 12 06 LDY  $0612
  0x020242 $8232: C-----  C0 02    CPY  #$02
  0x020244 $8234: C-----  90 03    BCC  $8239
  0x020246 $8236: C-----  AD 45 04 LDA  $0445
  0x020249 $8239: C-----  20 38 81 JSR  $8138
  0x02024C $823C: C-----  C9 80    CMP  #$80
  0x02024E $823E: C-----  90 10    BCC  $8250
  0x020250 $8240: C-----  AD 42 04 LDA  $0442
  0x020253 $8243: C-----  AE 12 06 LDX  $0612
  0x020256 $8246: C-----  E0 02    CPX  #$02
  0x020258 $8248: C-----  90 03    BCC  $824D
  0x02025A $824A: C-----  AD 41 04 LDA  $0441
  0x02025D $824D: C-----  20 50 81 JSR  $8150
  0x020260 $8250: C-----  60       RTS  
  0x020261 $8251: C--J--  AE 3D 04 LDX  $043D
  0x020264 $8254: C-----  60       RTS  
  0x020265 $8255: C--J--  AE 12 06 LDX  $0612
  0x020268 $8258: C-----  60       RTS  
  0x020269 $8259: C--J--  AE 4E 04 LDX  $044E
  0x02026C $825C: C-----  F0 01    BEQ  $825F
  0x02026E $825E: C-----  CA       DEX  
  0x02026F $825F: C-----  60       RTS  
  0x020270 $8260: C--J--  AE 16 06 LDX  $0616
  0x020273 $8263: C-----  60       RTS  
  0x020274 $8264: C--J--  A2 00    LDX  #$00
  0x020276 $8266: C-----  AD 42 04 LDA  $0442
  0x020279 $8269: C-----  F0 04    BEQ  $826F
  0x02027B $826B: C-----  C9 0B    CMP  #$0B
  0x02027D $826D: C-----  D0 01    BNE  $8270
  0x02027F $826F: C-----  E8       INX  
  0x020280 $8270: C-----  60       RTS  
  0x020281 $8271: C--J--  AE 12 06 LDX  $0612
  0x020284 $8274: C-----  60       RTS  
  0x020285 $8275: C--J--  A2 02    LDX  #$02
  0x020287 $8277: C-----  AD 42 04 LDA  $0442
  0x02028A $827A: C-----  F0 0D    BEQ  $8289
  0x02028C $827C: C-----  C9 0B    CMP  #$0B
  0x02028E $827E: C-----  F0 09    BEQ  $8289
  0x020290 $8280: C-----  CA       DEX  
  0x020291 $8281: C-----  AD 3D 04 LDA  $043D
  0x020294 $8284: C-----  C9 03    CMP  #$03
  0x020296 $8286: C-----  F0 01    BEQ  $8289
  0x020298 $8288: C-----  CA       DEX  
  0x020299 $8289: C-----  60       RTS  
  0x02029A $828A: C--J--  AC 3B 04 LDY  $043B
  0x02029D $828D: C-----  BE 91 82 LDX  $8291,Y
  0x0202A0 $8290: C-----  60       RTS  
  0x0202A1 $8291: -D0---  .byte $00
  0x0202A2 $8292: -D0---  .byte $01
  0x0202A3 $8293: ------  .byte $FF
  0x0202A4 $8294: ------  .byte $FF
  0x0202A5 $8295: -D0---  .byte $02
  0x0202A6 $8296: -D0---  .byte $03
  0x0202A7 $8297: C--J--  AE 3D 04 LDX  $043D
  0x0202AA $829A: C-----  60       RTS  
  0x0202AB $829B: C--J--  AE 12 06 LDX  $0612
  0x0202AE $829E: C-----  60       RTS  
  0x0202AF $829F: C--J--  A2 00    LDX  #$00
  0x0202B1 $82A1: C-----  AD 3B 04 LDA  $043B
  0x0202B4 $82A4: C-----  D0 0B    BNE  $82B1
  0x0202B6 $82A6: C-----  AD 3C 04 LDA  $043C
  0x0202B9 $82A9: C-----  29 7F    AND  #$7F
  0x0202BB $82AB: C-----  C9 03    CMP  #$03
  0x0202BD $82AD: C-----  90 0A    BCC  $82B9
  0x0202BF $82AF: C-----  B0 07    BCS  $82B8
  0x0202C1 $82B1: C-----  AD 3C 04 LDA  $043C
  0x0202C4 $82B4: C-----  29 7F    AND  #$7F
  0x0202C6 $82B6: C-----  F0 01    BEQ  $82B9
  0x0202C8 $82B8: C-----  E8       INX  
  0x0202C9 $82B9: C-----  60       RTS  
  0x0202CA $82BA: C--J--  AD 43 04 LDA  $0443
  0x0202CD $82BD: C-----  C9 06    CMP  #$06
  0x0202CF $82BF: C-----  F0 19    BEQ  $82DA
  0x0202D1 $82C1: C-----  AD 2C 06 LDA  $062C
  0x0202D4 $82C4: C-----  10 05    BPL  $82CB
  0x0202D6 $82C6: C-----  49 FF    EOR  #$FF
  0x0202D8 $82C8: C-----  18       CLC  
  0x0202D9 $82C9: C-----  69 01    ADC  #$01
  0x0202DB $82CB: C-----  C9 40    CMP  #$40
  0x0202DD $82CD: C-----  90 04    BCC  $82D3
  0x0202DF $82CF: C-----  49 FF    EOR  #$FF
  0x0202E1 $82D1: C-----  29 3F    AND  #$3F
  0x0202E3 $82D3: C-----  C9 20    CMP  #$20
  0x0202E5 $82D5: C-----  90 03    BCC  $82DA
  0x0202E7 $82D7: C-----  EE 43 04 INC  $0443
  0x0202EA $82DA: C-----  AD 43 04 LDA  $0443
  0x0202ED $82DD: C-----  0A       ASL  A
  0x0202EE $82DE: C-----  0A       ASL  A
  0x0202EF $82DF: C-----  6D 43 04 ADC  $0443
  0x0202F2 $82E2: C-----  A8       TAY  
  0x0202F3 $82E3: C-----  A2 00    LDX  #$00
  0x0202F5 $82E5: C-----  AD E3 00 LDA  $00E3
  0x0202F8 $82E8: C-----  D9 08 83 CMP  $8308,Y
  0x0202FB $82EB: C-----  B0 06    BCS  $82F3
  0x0202FD $82ED: C-----  F0 04    BEQ  $82F3
  0x0202FF $82EF: C-----  E8       INX  
  0x020300 $82F0: C-----  C8       INY  
  0x020301 $82F1: C-----  D0 F5    BNE  $82E8
  0x020303 $82F3: C-----  8A       TXA  
  0x020304 $82F4: C-----  48       PHA  
  0x020305 $82F5: C-----  20 FB 82 JSR  $82FB
  0x020308 $82F8: C-----  68       PLA  
  0x020309 $82F9: C-----  AA       TAX  
  0x02030A $82FA: C-----  60       RTS  
  0x02030B $82FB: C-----  20 09 C5 JSR  $C509
  0x02030E $82FE: -D0-I-  .byte $36 ; <indirect ref>
  0x02030F $82FF: -D0-I-  .byte $83 ; <indirect ref>
  0x020310 $8300: -D0-I-  .byte $37 ; <indirect ref>
  0x020311 $8301: -D0-I-  .byte $83 ; <indirect ref>
  0x020312 $8302: -D0-I-  .byte $2D ; <indirect ref>
  0x020313 $8303: -D0-I-  .byte $83 ; <indirect ref>
  0x020314 $8304: -D0-I-  .byte $40 ; <indirect ref>
  0x020315 $8305: -D0-I-  .byte $83 ; <indirect ref>
  0x020316 $8306: -D0-I-  .byte $4C ; <indirect ref>
  0x020317 $8307: -D0-I-  .byte $83 ; <indirect ref>
  0x020318 $8308: -D0---  .byte $4D
  0x020319 $8309: -D0---  .byte $39
  0x02031A $830A: -D0---  .byte $21
  0x02031B $830B: -D0---  .byte $0F
  0x02031C $830C: -D0---  .byte $00
  0x02031D $830D: -D0---  .byte $81
  0x02031E $830E: -D0---  .byte $53
  0x02031F $830F: -D0---  .byte $2D
  0x020320 $8310: -D0---  .byte $19
  0x020321 $8311: -D0---  .byte $00
  0x020322 $8312: -D0---  .byte $57
  0x020323 $8313: -D0---  .byte $1F
  0x020324 $8314: -D0---  .byte $17
  0x020325 $8315: -D0---  .byte $0D
  0x020326 $8316: ------  .byte $00
  0x020327 $8317: -D0---  .byte $64
  0x020328 $8318: -D0---  .byte $1F
  0x020329 $8319: -D0---  .byte $17
  0x02032A $831A: -D0---  .byte $0D
  0x02032B $831B: -D0---  .byte $00
  0x02032C $831C: -D0---  .byte $2C
  0x02032D $831D: -D0---  .byte $13
  0x02032E $831E: -D0---  .byte $FF
  0x02032F $831F: -D0---  .byte $0F
  0x020330 $8320: -D0---  .byte $00
  0x020331 $8321: -D0---  .byte $42
  0x020332 $8322: -D0---  .byte $1E
  0x020333 $8323: -D0---  .byte $FF
  0x020334 $8324: -D0---  .byte $15
  0x020335 $8325: -D0---  .byte $00
  0x020336 $8326: -D0---  .byte $1F
  0x020337 $8327: -D0---  .byte $13
  0x020338 $8328: -D0---  .byte $FF
  0x020339 $8329: -D0---  .byte $0F
  0x02033A $832A: -D0---  .byte $00
  0x02033B $832B: ------  .byte $00
  0x02033C $832C: ------  .byte $00
  0x02033D $832D: C--J--  20 50 83 JSR  $8350
  0x020340 $8330: C-----  A9 02    LDA  #$02
  0x020342 $8332: C-----  8D 12 06 STA  $0612
  0x020345 $8335: C-----  60       RTS  
  0x020346 $8336: C--J--  60       RTS  
  0x020347 $8337: C--J--  A9 02    LDA  #$02
  0x020349 $8339: C-----  8D 12 06 STA  $0612
  0x02034C $833C: C-----  EE 16 06 INC  $0616
  0x02034F $833F: C-----  60       RTS  
  0x020350 $8340: C--J--  20 50 83 JSR  $8350
  0x020353 $8343: C-----  20 5C 83 JSR  $835C
  0x020356 $8346: C-----  A9 02    LDA  #$02
  0x020358 $8348: C-----  8D 3C 04 STA  $043C
  0x02035B $834B: C-----  60       RTS  
  0x02035C $834C: C--J--  20 50 83 JSR  $8350
  0x02035F $834F: C-----  60       RTS  
  0x020360 $8350: C-----  AD FB 05 LDA  $05FB
  0x020363 $8353: C-----  49 0B    EOR  #$0B
  0x020365 $8355: C-----  20 48 C5 JSR  $C548
  0x020368 $8358: C-----  8D 42 04 STA  $0442
  0x02036B $835B: C-----  60       RTS  
  0x02036C $835C: C-----  AD FB 05 LDA  $05FB
  0x02036F $835F: C-----  20 48 C5 JSR  $C548
  0x020372 $8362: C-----  8D 41 04 STA  $0441
  0x020375 $8365: C-----  60       RTS  
  0x020376 $8366: C--J--  AE 3B 04 LDX  $043B
  0x020379 $8369: C-----  60       RTS  
  0x02037A $836A: C--J--  AE 12 06 LDX  $0612
  0x02037D $836D: C-----  60       RTS  
  0x02037E $836E: C--J--  A2 00    LDX  #$00
  0x020380 $8370: C-----  AD 3B 04 LDA  $043B
  0x020383 $8373: C-----  C9 01    CMP  #$01
  0x020385 $8375: C-----  F0 04    BEQ  $837B
  0x020387 $8377: C-----  20 77 86 JSR  $8677
  0x02038A $837A: C-----  E8       INX  
  0x02038B $837B: C-----  60       RTS  
  0x02038C $837C: C--J--  AE 12 06 LDX  $0612
  0x02038F $837F: C-----  60       RTS  
  0x020390 $8380: C--J--  AE 12 06 LDX  $0612
  0x020393 $8383: C-----  60       RTS  
  0x020394 $8384: C--J--  20 8B 83 JSR  $838B
  0x020397 $8387: C-----  AE 12 06 LDX  $0612
  0x02039A $838A: C-----  60       RTS  
  0x02039B $838B: C-----  AD 12 06 LDA  $0612
  0x02039E $838E: C-----  20 09 C5 JSR  $C509
  0x0203A1 $8391: -D0-I-  .byte $97 ; <indirect ref>
  0x0203A2 $8392: -D0-I-  .byte $83 ; <indirect ref>
  0x0203A3 $8393: -D0-I-  .byte $98 ; <indirect ref>
  0x0203A4 $8394: -D0-I-  .byte $83 ; <indirect ref>
  0x0203A5 $8395: -D0-I-  .byte $98 ; <indirect ref>
  0x0203A6 $8396: -D0-I-  .byte $83 ; <indirect ref>
  0x0203A7 $8397: C--J--  60       RTS  
  0x0203A8 $8398: C--J--  AD FB 05 LDA  $05FB
  0x0203AB $839B: C-----  49 0B    EOR  #$0B
  0x0203AD $839D: C-----  20 48 C5 JSR  $C548
  0x0203B0 $83A0: C-----  8D 42 04 STA  $0442
  0x0203B3 $83A3: C-----  60       RTS  
  0x0203B4 $83A4: C--J--  AE 12 06 LDX  $0612
  0x0203B7 $83A7: C-----  60       RTS  
  0x0203B8 $83A8: C--J--  AC 3D 04 LDY  $043D
  0x0203BB $83AB: C-----  BE AF 83 LDX  $83AF,Y
  0x0203BE $83AE: C-----  60       RTS  
  0x0203BF $83AF: ------  .byte $FF
  0x0203C0 $83B0: ------  .byte $FF
  0x0203C1 $83B1: -D0---  .byte $00
  0x0203C2 $83B2: ------  .byte $FF
  0x0203C3 $83B3: -D0---  .byte $01
  0x0203C4 $83B4: C--J--  AC 3B 04 LDY  $043B
  0x0203C7 $83B7: C-----  BE BB 83 LDX  $83BB,Y
  0x0203CA $83BA: C-----  60       RTS  
  0x0203CB $83BB: ------  .byte $FF
  0x0203CC $83BC: -D0---  .byte $00
  0x0203CD $83BD: ------  .byte $FF
  0x0203CE $83BE: ------  .byte $FF
  0x0203CF $83BF: -D0---  .byte $01
  0x0203D0 $83C0: ------  .byte $FF
  0x0203D1 $83C1: -D0---  .byte $02
  0x0203D2 $83C2: C--J--  AE 12 06 LDX  $0612
  0x0203D5 $83C5: C-----  60       RTS  
  0x0203D6 $83C6: C--J--  AD 41 04 LDA  $0441
  0x0203D9 $83C9: C-----  20 07 82 JSR  $8207
  0x0203DC $83CC: C-----  C9 1C    CMP  #$1C
  0x0203DE $83CE: C-----  F0 05    BEQ  $83D5
  0x0203E0 $83D0: C-----  C9 48    CMP  #$48
  0x0203E2 $83D2: C-----  F0 01    BEQ  $83D5
  0x0203E4 $83D4: C-----  E8       INX  
  0x0203E5 $83D5: C-----  60       RTS  
  0x0203E6 $83D6: ------  .byte $AD
  0x0203E7 $83D7: ------  .byte $3E
  0x0203E8 $83D8: ------  .byte $04
  0x0203E9 $83D9: ------  .byte $29
  0x0203EA $83DA: ------  .byte $7F
  0x0203EB $83DB: ------  .byte $AA
  0x0203EC $83DC: ------  .byte $60
  0x0203ED $83DD: ------  .byte $AD
  0x0203EE $83DE: ------  .byte $3E
  0x0203EF $83DF: ------  .byte $04
  0x0203F0 $83E0: ------  .byte $29
  0x0203F1 $83E1: ------  .byte $7F
  0x0203F2 $83E2: ------  .byte $AA
  0x0203F3 $83E3: ------  .byte $60
  0x0203F4 $83E4: C--J--  AD 3E 04 LDA  $043E
  0x0203F7 $83E7: C-----  29 7F    AND  #$7F
  0x0203F9 $83E9: C-----  AA       TAX  
  0x0203FA $83EA: C-----  60       RTS  
  0x0203FB $83EB: C--J--  AD 3C 04 LDA  $043C
  0x0203FE $83EE: C-----  29 7F    AND  #$7F
  0x020400 $83F0: C-----  AA       TAX  
  0x020401 $83F1: C-----  20 11 82 JSR  $8211
  0x020404 $83F4: C-----  60       RTS  
  0x020405 $83F5: C--J--  A9 01    LDA  #$01
  0x020407 $83F7: C-----  20 11 82 JSR  $8211
  0x02040A $83FA: C-----  AD 3C 04 LDA  $043C
  0x02040D $83FD: C-----  29 7F    AND  #$7F
  0x02040F $83FF: C-----  AA       TAX  
  0x020410 $8400: C-----  60       RTS  
  0x020411 $8401: C--J--  AD 3C 04 LDA  $043C
  0x020414 $8404: C-----  29 7F    AND  #$7F
  0x020416 $8406: C-----  AA       TAX  
  0x020417 $8407: C-----  4C 11 82 JMP  $8211
  0x02041A $840A: C--J--  AE 3B 04 LDX  $043B
  0x02041D $840D: C-----  60       RTS  
  0x02041E $840E: C--J--  AD FB 05 LDA  $05FB
  0x020421 $8411: C-----  49 0B    EOR  #$0B
  0x020423 $8413: C-----  20 07 82 JSR  $8207
  0x020426 $8416: C-----  A2 02    LDX  #$02
  0x020428 $8418: C-----  C9 74    CMP  #$74
  0x02042A $841A: C-----  F0 0E    BEQ  $842A
  0x02042C $841C: C-----  CA       DEX  
  0x02042D $841D: C-----  C9 22    CMP  #$22
  0x02042F $841F: C-----  F0 09    BEQ  $842A
  0x020431 $8421: C-----  C9 39    CMP  #$39
  0x020433 $8423: C-----  F0 05    BEQ  $842A
  0x020435 $8425: C-----  C9 4C    CMP  #$4C
  0x020437 $8427: C-----  F0 01    BEQ  $842A
  0x020439 $8429: C-----  CA       DEX  
  0x02043A $842A: C-----  60       RTS  
  0x02043B $842B: C--J--  A2 00    LDX  #$00
  0x02043D $842D: C-----  AD 1C 06 LDA  $061C
  0x020440 $8430: C-----  C9 60    CMP  #$60
  0x020442 $8432: C-----  90 01    BCC  $8435
  0x020444 $8434: C-----  E8       INX  
  0x020445 $8435: C-----  60       RTS  
  0x020446 $8436: C--J--  AE FB 05 LDX  $05FB
  0x020449 $8439: C-----  F0 02    BEQ  $843D
  0x02044B $843B: C-----  A2 01    LDX  #$01
  0x02044D $843D: C-----  60       RTS  
  0x02044E $843E: C--J--  AE 2A 00 LDX  $002A
  0x020451 $8441: C-----  60       RTS  
  0x020452 $8442: ------  .byte $AD
  0x020453 $8443: ------  .byte $41
  0x020454 $8444: ------  .byte $04
  0x020455 $8445: ------  .byte $20
  0x020456 $8446: ------  .byte $07
  0x020457 $8447: ------  .byte $82
  0x020458 $8448: ------  .byte $C9
  0x020459 $8449: ------  .byte $60
  0x02045A $844A: ------  .byte $D0
  0x02045B $844B: ------  .byte $01
  0x02045C $844C: ------  .byte $E8
  0x02045D $844D: ------  .byte $60
  0x02045E $844E: C--J--  AE 47 04 LDX  $0447
  0x020461 $8451: C-----  D0 03    BNE  $8456
  0x020463 $8453: C-----  EE 47 04 INC  $0447
  0x020466 $8456: C-----  60       RTS  
  0x020467 $8457: C--J--  A2 00    LDX  #$00
  0x020469 $8459: C-----  AD 2B 00 LDA  $002B
  0x02046C $845C: C-----  C9 22    CMP  #$22
  0x02046E $845E: C-----  D0 1D    BNE  $847D
  0x020470 $8460: C-----  A0 00    LDY  #$00
  0x020472 $8462: C-----  AD 28 00 LDA  $0028
  0x020475 $8465: C-----  38       SEC  
  0x020476 $8466: C-----  ED 29 00 SBC  $0029
  0x020479 $8469: C-----  90 0F    BCC  $847A
  0x02047B $846B: C-----  F0 0D    BEQ  $847A
  0x02047D $846D: C-----  A0 80    LDY  #$80
  0x02047F $846F: C-----  A9 CA    LDA  #$CA
  0x020481 $8471: C-----  8D FE 03 STA  $03FE
  0x020484 $8474: C-----  AD FB 05 LDA  $05FB
  0x020487 $8477: C-----  D0 01    BNE  $847A
  0x020489 $8479: C-----  E8       INX  
  0x02048A $847A: C-----  8C FD 03 STY  $03FD
  0x02048D $847D: C-----  60       RTS  
  0x02048E $847E: C--J--  AD 42 04 LDA  $0442
  0x020491 $8481: C-----  20 07 82 JSR  $8207
  0x020494 $8484: C-----  A8       TAY  
  0x020495 $8485: C-----  BE F4 86 LDX  $86F4,Y
  0x020498 $8488: C-----  F0 0D    BEQ  $8497
  0x02049A $848A: C-----  AD 41 04 LDA  $0441
  0x02049D $848D: C-----  20 07 82 JSR  $8207
  0x0204A0 $8490: C-----  A8       TAY  
  0x0204A1 $8491: C-----  BE F4 86 LDX  $86F4,Y
  0x0204A4 $8494: C-----  20 11 82 JSR  $8211
  0x0204A7 $8497: C-----  60       RTS  
  0x0204A8 $8498: C--J--  AD 41 04 LDA  $0441
  0x0204AB $849B: C-----  20 07 82 JSR  $8207
  0x0204AE $849E: C-----  A8       TAY  
  0x0204AF $849F: C-----  BE F4 86 LDX  $86F4,Y
  0x0204B2 $84A2: C-----  F0 0D    BEQ  $84B1
  0x0204B4 $84A4: C-----  AD 42 04 LDA  $0442
  0x0204B7 $84A7: C-----  20 07 82 JSR  $8207
  0x0204BA $84AA: C-----  A8       TAY  
  0x0204BB $84AB: C-----  BE F4 86 LDX  $86F4,Y
  0x0204BE $84AE: C-----  20 11 82 JSR  $8211
  0x0204C1 $84B1: C-----  60       RTS  
  0x0204C2 $84B2: C--J--  A2 00    LDX  #$00
  0x0204C4 $84B4: C-----  2C 3E 04 BIT  $043E
  0x0204C7 $84B7: C-----  10 0D    BPL  $84C6
  0x0204C9 $84B9: C-----  AD 42 04 LDA  $0442
  0x0204CC $84BC: C-----  20 07 82 JSR  $8207
  0x0204CF $84BF: C-----  A8       TAY  
  0x0204D0 $84C0: C-----  BE F4 86 LDX  $86F4,Y
  0x0204D3 $84C3: C-----  20 11 82 JSR  $8211
  0x0204D6 $84C6: C-----  60       RTS  
  0x0204D7 $84C7: C--J--  AD 41 04 LDA  $0441
  0x0204DA $84CA: C-----  AE FB 05 LDX  $05FB
  0x0204DD $84CD: C-----  F0 03    BEQ  $84D2
  0x0204DF $84CF: C-----  AD 42 04 LDA  $0442
  0x0204E2 $84D2: C-----  20 0C C5 JSR  $C50C
  0x0204E5 $84D5: C-----  A2 00    LDX  #$00
  0x0204E7 $84D7: C-----  A0 01    LDY  #$01
  0x0204E9 $84D9: C-----  B1 34    LDA  ($34),Y
  0x0204EB $84DB: C-----  38       SEC  
  0x0204EC $84DC: C-----  E9 64    SBC  #$64
  0x0204EE $84DE: C-----  C8       INY  
  0x0204EF $84DF: C-----  B1 34    LDA  ($34),Y
  0x0204F1 $84E1: C-----  E9 00    SBC  #$00
  0x0204F3 $84E3: C-----  B0 01    BCS  $84E6
  0x0204F5 $84E5: ------  .byte $E8
  0x0204F6 $84E6: C-----  60       RTS  
  0x0204F7 $84E7: C--J--  AE 00 06 LDX  $0600
  0x0204FA $84EA: C-----  F0 02    BEQ  $84EE
  0x0204FC $84EC: C-----  A2 01    LDX  #$01
  0x0204FE $84EE: C-----  60       RTS  
  0x0204FF $84EF: C--J--  A2 00    LDX  #$00
  0x020501 $84F1: C-----  AD 3C 04 LDA  $043C
  0x020504 $84F4: C-----  29 7F    AND  #$7F
  0x020506 $84F6: C-----  C9 13    CMP  #$13
  0x020508 $84F8: C-----  D0 01    BNE  $84FB
  0x02050A $84FA: C-----  E8       INX  
  0x02050B $84FB: C-----  60       RTS  
  0x02050C $84FC: C--J--  20 51 C5 JSR  $C551
  0x02050F $84FF: C-----  A2 00    LDX  #$00
  0x020511 $8501: C-----  A0 07    LDY  #$07
  0x020513 $8503: C-----  B1 34    LDA  ($34),Y
  0x020515 $8505: C-----  C9 18    CMP  #$18
  0x020517 $8507: C-----  90 01    BCC  $850A
  0x020519 $8509: C-----  E8       INX  
  0x02051A $850A: C-----  60       RTS  
  0x02051B $850B: C--J--  A2 00    LDX  #$00
  0x02051D $850D: C-----  2C 3E 04 BIT  $043E
  0x020520 $8510: C-----  10 14    BPL  $8526
  0x020522 $8512: C-----  AD 42 04 LDA  $0442
  0x020525 $8515: C-----  20 07 82 JSR  $8207
  0x020528 $8518: C-----  C9 0F    CMP  #$0F
  0x02052A $851A: C-----  F0 09    BEQ  $8525
  0x02052C $851C: C-----  C9 21    CMP  #$21
  0x02052E $851E: C-----  F0 04    BEQ  $8524
  0x020530 $8520: C-----  C9 40    CMP  #$40
  0x020532 $8522: C-----  D0 02    BNE  $8526
  0x020534 $8524: C-----  E8       INX  
  0x020535 $8525: C-----  E8       INX  
  0x020536 $8526: C-----  60       RTS  
  0x020537 $8527: C--J--  AD 41 04 LDA  $0441
  0x02053A $852A: C-----  20 07 82 JSR  $8207
  0x02053D $852D: C-----  A2 02    LDX  #$02
  0x02053F $852F: C-----  C9 60    CMP  #$60
  0x020541 $8531: C-----  F0 06    BEQ  $8539
  0x020543 $8533: C-----  CA       DEX  
  0x020544 $8534: C-----  C9 01    CMP  #$01
  0x020546 $8536: C-----  F0 01    BEQ  $8539
  0x020548 $8538: C-----  CA       DEX  
  0x020549 $8539: C-----  60       RTS  
  0x02054A $853A: C--J--  AD 41 04 LDA  $0441
  0x02054D $853D: C-----  20 07 82 JSR  $8207
  0x020550 $8540: C-----  C9 15    CMP  #$15
  0x020552 $8542: C-----  F0 01    BEQ  $8545
  0x020554 $8544: C-----  E8       INX  
  0x020555 $8545: C-----  60       RTS  
  0x020556 $8546: C--J--  AD 41 04 LDA  $0441
  0x020559 $8549: C-----  20 07 82 JSR  $8207
  0x02055C $854C: C-----  C9 1B    CMP  #$1B
  0x02055E $854E: C-----  F0 05    BEQ  $8555
  0x020560 $8550: C-----  C9 4A    CMP  #$4A
  0x020562 $8552: C-----  F0 01    BEQ  $8555
  0x020564 $8554: C-----  E8       INX  
  0x020565 $8555: C-----  60       RTS  
  0x020566 $8556: C--J--  AD 3E 04 LDA  $043E
  0x020569 $8559: C-----  29 7F    AND  #$7F
  0x02056B $855B: C-----  AA       TAX  
  0x02056C $855C: C-----  F0 0D    BEQ  $856B
  0x02056E $855E: C-----  AD 42 04 LDA  $0442
  0x020571 $8561: C-----  20 07 82 JSR  $8207
  0x020574 $8564: C-----  A8       TAY  
  0x020575 $8565: C-----  BE 6A 87 LDX  $876A,Y
  0x020578 $8568: C-----  20 11 82 JSR  $8211
  0x02057B $856B: C-----  60       RTS  
  0x02057C $856C: C--J--  AE 4E 04 LDX  $044E
  0x02057F $856F: C-----  60       RTS  
  0x020580 $8570: C--J--  AD 3D 04 LDA  $043D
  0x020583 $8573: C-----  29 0F    AND  #$0F
  0x020585 $8575: C-----  A8       TAY  
  0x020586 $8576: C-----  BE 7A 85 LDX  $857A,Y
  0x020589 $8579: C-----  60       RTS  
  0x02058A $857A: ------  .byte $FF
  0x02058B $857B: ------  .byte $FF
  0x02058C $857C: -D0---  .byte $00
  0x02058D $857D: -D0---  .byte $01
  0x02058E $857E: ------  .byte $FF
  0x02058F $857F: -D0---  .byte $02
  0x020590 $8580: C--J--  AD 3E 04 LDA  $043E
  0x020593 $8583: C-----  29 7F    AND  #$7F
  0x020595 $8585: C-----  AA       TAX  
  0x020596 $8586: C-----  60       RTS  
  0x020597 $8587: C--J--  AD 3E 04 LDA  $043E
  0x02059A $858A: C-----  29 7F    AND  #$7F
  0x02059C $858C: C-----  AA       TAX  
  0x02059D $858D: C-----  F0 02    BEQ  $8591
  0x02059F $858F: C-----  A2 01    LDX  #$01
  0x0205A1 $8591: C-----  60       RTS  
  0x0205A2 $8592: C--J--  AD 41 04 LDA  $0441
  0x0205A5 $8595: C-----  20 07 82 JSR  $8207
  0x0205A8 $8598: C-----  C9 1A    CMP  #$1A
  0x0205AA $859A: C-----  F0 05    BEQ  $85A1
  0x0205AC $859C: C-----  C9 41    CMP  #$41
  0x0205AE $859E: C-----  F0 01    BEQ  $85A1
  0x0205B0 $85A0: C-----  E8       INX  
  0x0205B1 $85A1: C-----  60       RTS  
  0x0205B2 $85A2: C--J--  AD 41 04 LDA  $0441
  0x0205B5 $85A5: C-----  20 07 82 JSR  $8207
  0x0205B8 $85A8: C-----  C9 1D    CMP  #$1D
  0x0205BA $85AA: C-----  F0 05    BEQ  $85B1
  0x0205BC $85AC: C-----  C9 4B    CMP  #$4B
  0x0205BE $85AE: C-----  F0 01    BEQ  $85B1
  0x0205C0 $85B0: C-----  E8       INX  
  0x0205C1 $85B1: C-----  60       RTS  
  0x0205C2 $85B2: C--J--  AD 41 04 LDA  $0441
  0x0205C5 $85B5: C-----  20 07 82 JSR  $8207
  0x0205C8 $85B8: C-----  C9 3E    CMP  #$3E
  0x0205CA $85BA: C-----  F0 01    BEQ  $85BD
  0x0205CC $85BC: C-----  E8       INX  
  0x0205CD $85BD: C-----  60       RTS  
  0x0205CE $85BE: C--J--  AD 41 04 LDA  $0441
  0x0205D1 $85C1: C-----  20 07 82 JSR  $8207
  0x0205D4 $85C4: C-----  C9 2B    CMP  #$2B
  0x0205D6 $85C6: C-----  F0 01    BEQ  $85C9
  0x0205D8 $85C8: C-----  E8       INX  
  0x0205D9 $85C9: C-----  60       RTS  
  0x0205DA $85CA: C--J--  AD 41 04 LDA  $0441
  0x0205DD $85CD: C-----  20 07 82 JSR  $8207
  0x0205E0 $85D0: C-----  C9 20    CMP  #$20
  0x0205E2 $85D2: C-----  F0 05    BEQ  $85D9
  0x0205E4 $85D4: C-----  C9 45    CMP  #$45
  0x0205E6 $85D6: C-----  F0 01    BEQ  $85D9
  0x0205E8 $85D8: C-----  E8       INX  
  0x0205E9 $85D9: C-----  60       RTS  
  0x0205EA $85DA: C--J--  AD 41 04 LDA  $0441
  0x0205ED $85DD: C-----  20 07 82 JSR  $8207
  0x0205F0 $85E0: C-----  C9 11    CMP  #$11
  0x0205F2 $85E2: C-----  F0 01    BEQ  $85E5
  0x0205F4 $85E4: ------  .byte $E8
  0x0205F5 $85E5: C-----  60       RTS  
  0x0205F6 $85E6: C--J--  AD 3B 04 LDA  $043B
  0x0205F9 $85E9: C-----  38       SEC  
  0x0205FA $85EA: C-----  E9 07    SBC  #$07
  0x0205FC $85EC: C-----  85 3B    STA  $3B
  0x0205FE $85EE: C-----  0A       ASL  A
  0x0205FF $85EF: C-----  65 3B    ADC  $3B
  0x020601 $85F1: C-----  85 3B    STA  $3B
  0x020603 $85F3: C-----  AD 3D 04 LDA  $043D
  0x020606 $85F6: C-----  38       SEC  
  0x020607 $85F7: C-----  E9 07    SBC  #$07
  0x020609 $85F9: C-----  18       CLC  
  0x02060A $85FA: C-----  65 3B    ADC  $3B
  0x02060C $85FC: C-----  AA       TAX  
  0x02060D $85FD: C-----  60       RTS  
  0x02060E $85FE: C--J--  AE 12 06 LDX  $0612
  0x020611 $8601: C-----  60       RTS  
  0x020612 $8602: C--J--  AD 41 04 LDA  $0441
  0x020615 $8605: C-----  20 07 82 JSR  $8207
  0x020618 $8608: C-----  A8       TAY  
  0x020619 $8609: C-----  BE F4 86 LDX  $86F4,Y
  0x02061C $860C: C-----  20 11 82 JSR  $8211
  0x02061F $860F: C-----  60       RTS  
  0x020620 $8610: C--J--  AD FB 05 LDA  $05FB
  0x020623 $8613: C-----  49 0B    EOR  #$0B
  0x020625 $8615: C-----  20 07 82 JSR  $8207
  0x020628 $8618: C-----  A2 04    LDX  #$04
  0x02062A $861A: C-----  DD 22 86 CMP  $8622,X
  0x02062D $861D: C-----  F0 03    BEQ  $8622
  0x02062F $861F: C-----  CA       DEX  
  0x020630 $8620: C-----  D0 F8    BNE  $861A
  0x020632 $8622: C-----  60       RTS  
  0x020633 $8623: -D0---  .byte $02
  0x020634 $8624: -D0---  .byte $0F
  0x020635 $8625: -D0---  .byte $21
  0x020636 $8626: -D0---  .byte $22
  0x020637 $8627: C--J--  AD E2 00 LDA  $00E2
  0x02063A $862A: C-----  29 01    AND  #$01
  0x02063C $862C: C-----  AA       TAX  
  0x02063D $862D: C-----  60       RTS  
  0x02063E $862E: C--J--  AC 3D 04 LDY  $043D
  0x020641 $8631: C-----  BE 35 86 LDX  $8635,Y
  0x020644 $8634: C-----  60       RTS  
  0x020645 $8635: ------  .byte $FF
  0x020646 $8636: ------  .byte $FF
  0x020647 $8637: -D0---  .byte $00
  0x020648 $8638: ------  .byte $FF
  0x020649 $8639: -D0---  .byte $01
  0x02064A $863A: -D0---  .byte $02
  0x02064B $863B: C--J--  AD 3D 04 LDA  $043D
  0x02064E $863E: C-----  29 0F    AND  #$0F
  0x020650 $8640: C-----  A8       TAY  
  0x020651 $8641: C-----  BE 45 86 LDX  $8645,Y
  0x020654 $8644: C-----  60       RTS  
  0x020655 $8645: ------  .byte $FF
  0x020656 $8646: ------  .byte $FF
  0x020657 $8647: ------  .byte $FF
  0x020658 $8648: -D0---  .byte $00
  0x020659 $8649: -D0---  .byte $01
  0x02065A $864A: C--J--  A2 00    LDX  #$00
  0x02065C $864C: C-----  AD 12 06 LDA  $0612
  0x02065F $864F: C-----  C9 03    CMP  #$03
  0x020661 $8651: C-----  B0 23    BCS  $8676
  0x020663 $8653: C-----  AD 44 04 LDA  $0444
  0x020666 $8656: C-----  20 38 81 JSR  $8138
  0x020669 $8659: C-----  C9 80    CMP  #$80
  0x02066B $865B: C-----  90 19    BCC  $8676
  0x02066D $865D: C-----  AD FB 05 LDA  $05FB
  0x020670 $8660: C-----  49 0B    EOR  #$0B
  0x020672 $8662: C-----  20 0C C5 JSR  $C50C
  0x020675 $8665: C-----  A0 05    LDY  #$05
  0x020677 $8667: C-----  B1 34    LDA  ($34),Y
  0x020679 $8669: C-----  18       CLC  
  0x02067A $866A: C-----  69 00    ADC  #$00
  0x02067C $866C: C-----  C9 80    CMP  #$80
  0x02067E $866E: C-----  90 02    BCC  $8672
  0x020680 $8670: ------  .byte $A9
  0x020681 $8671: ------  .byte $7F
  0x020682 $8672: C-----  91 34    STA  ($34),Y
  0x020684 $8674: C-----  A2 01    LDX  #$01
  0x020686 $8676: C-----  60       RTS  
  0x020687 $8677: C-----  A2 00    LDX  #$00
  0x020689 $8679: C-----  AD 44 04 LDA  $0444
  0x02068C $867C: C-----  20 38 81 JSR  $8138
  0x02068F $867F: C-----  C9 80    CMP  #$80
  0x020691 $8681: C-----  90 06    BCC  $8689
  0x020693 $8683: C-----  AD 42 04 LDA  $0442
  0x020696 $8686: C-----  20 50 81 JSR  $8150
  0x020699 $8689: C-----  60       RTS  
  0x02069A $868A: C--J--  AD 41 04 LDA  $0441
  0x02069D $868D: C-----  20 07 82 JSR  $8207
  0x0206A0 $8690: C-----  A0 00    LDY  #$00
  0x0206A2 $8692: C-----  D9 A6 86 CMP  $86A6,Y
  0x0206A5 $8695: C-----  F0 06    BEQ  $869D
  0x0206A7 $8697: C-----  C8       INY  
  0x0206A8 $8698: C-----  C8       INY  
  0x0206A9 $8699: C-----  C0 0E    CPY  #$0E
  0x0206AB $869B: C-----  D0 F5    BNE  $8692
  0x0206AD $869D: C-----  BE A7 86 LDX  $86A7,Y
  0x0206B0 $86A0: C-----  A9 01    LDA  #$01
  0x0206B2 $86A2: C-----  20 11 82 JSR  $8211
  0x0206B5 $86A5: C-----  60       RTS  
  0x0206B6 $86A6: -D0---  .byte $1A
  0x0206B7 $86A7: -D0---  .byte $00
  0x0206B8 $86A8: -D0---  .byte $41
  0x0206B9 $86A9: ------  .byte $00
  0x0206BA $86AA: -D0---  .byte $36
  0x0206BB $86AB: -D0---  .byte $01
  0x0206BC $86AC: -D0---  .byte $1C
  0x0206BD $86AD: -D0---  .byte $02
  0x0206BE $86AE: -D0---  .byte $48
  0x0206BF $86AF: ------  .byte $02
  0x0206C0 $86B0: -D0---  .byte $2E
  0x0206C1 $86B1: -D0---  .byte $03
  0x0206C2 $86B2: -D0---  .byte $57
  0x0206C3 $86B3: -D0---  .byte $04
  0x0206C4 $86B4: ------  .byte $00
  0x0206C5 $86B5: -D0---  .byte $05
  0x0206C6 $86B6: C--J--  A2 00    LDX  #$00
  0x0206C8 $86B8: C-----  AD 3C 04 LDA  $043C
  0x0206CB $86BB: C-----  29 7F    AND  #$7F
  0x0206CD $86BD: C-----  DD C8 86 CMP  $86C8,X
  0x0206D0 $86C0: C-----  F0 05    BEQ  $86C7
  0x0206D2 $86C2: C-----  E8       INX  
  0x0206D3 $86C3: C-----  E0 04    CPX  #$04
  0x0206D5 $86C5: C-----  D0 F6    BNE  $86BD
  0x0206D7 $86C7: C-----  60       RTS  
  0x0206D8 $86C8: -D0---  .byte $08
  0x0206D9 $86C9: -D0---  .byte $0A
  0x0206DA $86CA: -D0---  .byte $10
  0x0206DB $86CB: -D0---  .byte $1F
  0x0206DC $86CC: C--J--  AD 41 04 LDA  $0441
  0x0206DF $86CF: C-----  20 07 82 JSR  $8207
  0x0206E2 $86D2: C-----  A2 00    LDX  #$00
  0x0206E4 $86D4: C-----  DD E3 86 CMP  $86E3,X
  0x0206E7 $86D7: C-----  F0 05    BEQ  $86DE
  0x0206E9 $86D9: C-----  E8       INX  
  0x0206EA $86DA: C-----  E0 11    CPX  #$11
  0x0206EC $86DC: C-----  D0 F6    BNE  $86D4
  0x0206EE $86DE: C-----  E0 11    CPX  #$11
  0x0206F0 $86E0: C-----  4C 11 82 JMP  $8211
  0x0206F3 $86E3: -D0---  .byte $01
  0x0206F4 $86E4: -D0---  .byte $11
  0x0206F5 $86E5: -D0---  .byte $1A
  0x0206F6 $86E6: -D0---  .byte $41
  0x0206F7 $86E7: -D0---  .byte $36
  0x0206F8 $86E8: -D0---  .byte $1F
  0x0206F9 $86E9: -D0---  .byte $38
  0x0206FA $86EA: -D0---  .byte $17
  0x0206FB $86EB: -D0---  .byte $18
  0x0206FC $86EC: -D0---  .byte $46
  0x0206FD $86ED: -D0---  .byte $47
  0x0206FE $86EE: -D0---  .byte $30
  0x0206FF $86EF: -D0---  .byte $31
  0x020700 $86F0: -D0---  .byte $60
  0x020701 $86F1: -D0---  .byte $5E
  0x020702 $86F2: -D0---  .byte $58
  0x020703 $86F3: -D0---  .byte $57
  0x020704 $86F4: -D0---  .byte $00
  0x020705 $86F5: -D0---  .byte $01
  0x020706 $86F6: -D0---  .byte $00
  0x020707 $86F7: -D0---  .byte $00
  0x020708 $86F8: -D0---  .byte $00
  0x020709 $86F9: -D0---  .byte $00
  0x02070A $86FA: -D0---  .byte $00
  0x02070B $86FB: -D0---  .byte $00
  0x02070C $86FC: -D0---  .byte $00
  0x02070D $86FD: -D0---  .byte $00
  0x02070E $86FE: -D0---  .byte $00
  0x02070F $86FF: -D0---  .byte $00
  0x020710 $8700: -D0---  .byte $00
  0x020711 $8701: -D0---  .byte $00
  0x020712 $8702: -D0---  .byte $00
  0x020713 $8703: -D0---  .byte $00
  0x020714 $8704: -D0---  .byte $00
  0x020715 $8705: -D0---  .byte $02
  0x020716 $8706: -D0---  .byte $00
  0x020717 $8707: -D0---  .byte $00
  0x020718 $8708: -D0---  .byte $0A
  0x020719 $8709: -D0---  .byte $12
  0x02071A $870A: -D0---  .byte $00
  0x02071B $870B: -D0---  .byte $10
  0x02071C $870C: -D0---  .byte $10
  0x02071D $870D: -D0---  .byte $00
  0x02071E $870E: -D0---  .byte $04
  0x02071F $870F: -D0---  .byte $0C
  0x020720 $8710: -D0---  .byte $0E
  0x020721 $8711: -D0---  .byte $08
  0x020722 $8712: -D0---  .byte $00
  0x020723 $8713: -D0---  .byte $14
  0x020724 $8714: -D0---  .byte $06
  0x020725 $8715: -D0---  .byte $00
  0x020726 $8716: ------  .byte $00
  0x020727 $8717: -D0---  .byte $00
  0x020728 $8718: -D0---  .byte $00
  0x020729 $8719: -D0---  .byte $00
  0x02072A $871A: -D0---  .byte $00
  0x02072B $871B: -D0---  .byte $00
  0x02072C $871C: -D0---  .byte $00
  0x02072D $871D: -D0---  .byte $00
  0x02072E $871E: -D0---  .byte $00
  0x02072F $871F: -D0---  .byte $17
  0x020730 $8720: -D0---  .byte $00
  0x020731 $8721: -D0---  .byte $00
  0x020732 $8722: -D0---  .byte $0F
  0x020733 $8723: -D0---  .byte $00
  0x020734 $8724: -D0---  .byte $11
  0x020735 $8725: -D0---  .byte $11
  0x020736 $8726: -D0---  .byte $0D
  0x020737 $8727: -D0---  .byte $00
  0x020738 $8728: -D0---  .byte $07
  0x020739 $8729: -D0---  .byte $09
  0x02073A $872A: -D0---  .byte $05
  0x02073B $872B: -D0---  .byte $00
  0x02073C $872C: -D0---  .byte $15
  0x02073D $872D: -D0---  .byte $00
  0x02073E $872E: -D0---  .byte $00
  0x02073F $872F: -D0---  .byte $20
  0x020740 $8730: -D0---  .byte $00
  0x020741 $8731: ------  .byte $00
  0x020742 $8732: -D0---  .byte $1A
  0x020743 $8733: -D0---  .byte $00
  0x020744 $8734: ------  .byte $00
  0x020745 $8735: -D0---  .byte $04
  0x020746 $8736: ------  .byte $13
  0x020747 $8737: -D0---  .byte $00
  0x020748 $8738: -D0---  .byte $03
  0x020749 $8739: ------  .byte $06
  0x02074A $873A: -D0---  .byte $10
  0x02074B $873B: -D0---  .byte $10
  0x02074C $873C: ------  .byte $0E
  0x02074D $873D: -D0---  .byte $0B
  0x02074E $873E: -D0---  .byte $0C
  0x02074F $873F: ------  .byte $08
  0x020750 $8740: ------  .byte $00
  0x020751 $8741: -D0---  .byte $00
  0x020752 $8742: -D0---  .byte $00
  0x020753 $8743: -D0---  .byte $00
  0x020754 $8744: -D0---  .byte $00
  0x020755 $8745: -D0---  .byte $00
  0x020756 $8746: ------  .byte $00
  0x020757 $8747: -D0---  .byte $00
  0x020758 $8748: -D0---  .byte $00
  0x020759 $8749: -D0---  .byte $00
  0x02075A $874A: -D0---  .byte $00
  0x02075B $874B: -D0---  .byte $1F
  0x02075C $874C: -D0---  .byte $1E
  0x02075D $874D: -D0---  .byte $00
  0x02075E $874E: -D0---  .byte $00
  0x02075F $874F: -D0---  .byte $00
  0x020760 $8750: -D0---  .byte $00
  0x020761 $8751: -D0---  .byte $00
  0x020762 $8752: -D0---  .byte $1D
  0x020763 $8753: -D0---  .byte $00
  0x020764 $8754: -D0---  .byte $1C
  0x020765 $8755: -D0---  .byte $00
  0x020766 $8756: ------  .byte $00
  0x020767 $8757: -D0---  .byte $19
  0x020768 $8758: -D0---  .byte $00
  0x020769 $8759: -D0---  .byte $21
  0x02076A $875A: -D0---  .byte $00
  0x02076B $875B: -D0---  .byte $1B
  0x02076C $875C: -D0---  .byte $00
  0x02076D $875D: -D0---  .byte $00
  0x02076E $875E: -D0---  .byte $18
  0x02076F $875F: -D0---  .byte $00
  0x020770 $8760: -D0---  .byte $00
  0x020771 $8761: -D0---  .byte $00
  0x020772 $8762: -D0---  .byte $00
  0x020773 $8763: -D0---  .byte $00
  0x020774 $8764: -D0---  .byte $00
  0x020775 $8765: -D0---  .byte $00
  0x020776 $8766: -D0---  .byte $00
  0x020777 $8767: -D0---  .byte $00
  0x020778 $8768: -D0---  .byte $00
  0x020779 $8769: -D0---  .byte $16
  0x02077A $876A: -D0---  .byte $00
  0x02077B $876B: ------  .byte $00
  0x02077C $876C: ------  .byte $00
  0x02077D $876D: ------  .byte $00
  0x02077E $876E: ------  .byte $00
  0x02077F $876F: ------  .byte $00
  0x020780 $8770: ------  .byte $00
  0x020781 $8771: ------  .byte $00
  0x020782 $8772: ------  .byte $00
  0x020783 $8773: ------  .byte $00
  0x020784 $8774: ------  .byte $00
  0x020785 $8775: ------  .byte $00
  0x020786 $8776: ------  .byte $00
  0x020787 $8777: ------  .byte $00
  0x020788 $8778: ------  .byte $00
  0x020789 $8779: ------  .byte $00
  0x02078A $877A: ------  .byte $00
  0x02078B $877B: ------  .byte $00
  0x02078C $877C: ------  .byte $00
  0x02078D $877D: ------  .byte $00
  0x02078E $877E: -D0---  .byte $0E
  0x02078F $877F: ------  .byte $00
  0x020790 $8780: ------  .byte $00
  0x020791 $8781: -D0---  .byte $01
  0x020792 $8782: -D0---  .byte $01
  0x020793 $8783: ------  .byte $00
  0x020794 $8784: -D0---  .byte $0C
  0x020795 $8785: -D0---  .byte $03
  0x020796 $8786: -D0---  .byte $05
  0x020797 $8787: ------  .byte $00
  0x020798 $8788: ------  .byte $00
  0x020799 $8789: ------  .byte $00
  0x02079A $878A: ------  .byte $00
  0x02079B $878B: ------  .byte $00
  0x02079C $878C: ------  .byte $00
  0x02079D $878D: ------  .byte $00
  0x02079E $878E: ------  .byte $00
  0x02079F $878F: ------  .byte $00
  0x0207A0 $8790: ------  .byte $00
  0x0207A1 $8791: ------  .byte $00
  0x0207A2 $8792: ------  .byte $00
  0x0207A3 $8793: ------  .byte $00
  0x0207A4 $8794: -D0---  .byte $07
  0x0207A5 $8795: ------  .byte $00
  0x0207A6 $8796: ------  .byte $00
  0x0207A7 $8797: ------  .byte $00
  0x0207A8 $8798: -D0---  .byte $06
  0x0207A9 $8799: ------  .byte $00
  0x0207AA $879A: -D0---  .byte $02
  0x0207AB $879B: ------  .byte $02
  0x0207AC $879C: -D0---  .byte $04
  0x0207AD $879D: ------  .byte $00
  0x0207AE $879E: ------  .byte $00
  0x0207AF $879F: ------  .byte $00
  0x0207B0 $87A0: -D0---  .byte $0D
  0x0207B1 $87A1: ------  .byte $00
  0x0207B2 $87A2: ------  .byte $00
  0x0207B3 $87A3: ------  .byte $00
  0x0207B4 $87A4: ------  .byte $00
  0x0207B5 $87A5: ------  .byte $00
  0x0207B6 $87A6: ------  .byte $00
  0x0207B7 $87A7: ------  .byte $00
  0x0207B8 $87A8: ------  .byte $00
  0x0207B9 $87A9: ------  .byte $00
  0x0207BA $87AA: ------  .byte $00
  0x0207BB $87AB: ------  .byte $0C
  0x0207BC $87AC: ------  .byte $00
  0x0207BD $87AD: ------  .byte $00
  0x0207BE $87AE: ------  .byte $00
  0x0207BF $87AF: ------  .byte $00
  0x0207C0 $87B0: ------  .byte $01
  0x0207C1 $87B1: ------  .byte $01
  0x0207C2 $87B2: ------  .byte $05
  0x0207C3 $87B3: -D0---  .byte $0F
  0x0207C4 $87B4: -D0---  .byte $03
  0x0207C5 $87B5: ------  .byte $00
  0x0207C6 $87B6: ------  .byte $00
  0x0207C7 $87B7: ------  .byte $00
  0x0207C8 $87B8: ------  .byte $00
  0x0207C9 $87B9: -D0---  .byte $00
  0x0207CA $87BA: -D0---  .byte $00
  0x0207CB $87BB: ------  .byte $00
  0x0207CC $87BC: ------  .byte $00
  0x0207CD $87BD: ------  .byte $00
  0x0207CE $87BE: -D0---  .byte $09
  0x0207CF $87BF: ------  .byte $00
  0x0207D0 $87C0: ------  .byte $00
  0x0207D1 $87C1: ------  .byte $00
  0x0207D2 $87C2: ------  .byte $00
  0x0207D3 $87C3: ------  .byte $00
  0x0207D4 $87C4: ------  .byte $00
  0x0207D5 $87C5: ------  .byte $00
  0x0207D6 $87C6: ------  .byte $00
  0x0207D7 $87C7: -D0---  .byte $0A
  0x0207D8 $87C8: ------  .byte $00
  0x0207D9 $87C9: ------  .byte $00
  0x0207DA $87CA: ------  .byte $00
  0x0207DB $87CB: ------  .byte $00
  0x0207DC $87CC: -D0---  .byte $0B
  0x0207DD $87CD: ------  .byte $00
  0x0207DE $87CE: ------  .byte $00
  0x0207DF $87CF: -D0---  .byte $00
  0x0207E0 $87D0: ------  .byte $00
  0x0207E1 $87D1: ------  .byte $00
  0x0207E2 $87D2: ------  .byte $00
  0x0207E3 $87D3: ------  .byte $00
  0x0207E4 $87D4: ------  .byte $00
  0x0207E5 $87D5: ------  .byte $00
  0x0207E6 $87D6: ------  .byte $00
  0x0207E7 $87D7: ------  .byte $00
  0x0207E8 $87D8: ------  .byte $00
  0x0207E9 $87D9: ------  .byte $00
  0x0207EA $87DA: ------  .byte $00
  0x0207EB $87DB: ------  .byte $00
  0x0207EC $87DC: -D0---  .byte $08
  0x0207ED $87DD: ------  .byte $00
  0x0207EE $87DE: ------  .byte $00
  0x0207EF $87DF: ------  .byte $00
  0x0207F0 $87E0: C--J--  A9 40    LDA  #$40
  0x0207F2 $87E2: C-----  8D 2A 05 STA  $052A
  0x0207F5 $87E5: C-----  60       RTS  
  0x0207F6 $87E6: C--J--  A9 00    LDA  #$00
  0x0207F8 $87E8: C-----  8D 2A 05 STA  $052A
  0x0207FB $87EB: C-----  60       RTS  
  0x0207FC $87EC: C--J--  A9 40    LDA  #$40
  0x0207FE $87EE: C-----  4D 2A 05 EOR  $052A
  0x020801 $87F1: C-----  8D 2A 05 STA  $052A
  0x020804 $87F4: C-----  60       RTS  
  0x020805 $87F5: C--J--  A4 3A    LDY  $3A
  0x020807 $87F7: C-----  E6 3A    INC  $3A
  0x020809 $87F9: C-----  B1 5D    LDA  ($5D),Y
  0x02080B $87FB: C-----  8D 2B 05 STA  $052B
  0x02080E $87FE: C-----  60       RTS  
  0x02080F $87FF: C--J--  A4 3A    LDY  $3A
  0x020811 $8801: C-----  E6 3A    INC  $3A
  0x020813 $8803: C-----  B1 5D    LDA  ($5D),Y
  0x020815 $8805: C-----  8D 2C 05 STA  $052C
  0x020818 $8808: C-----  60       RTS  
  0x020819 $8809: C--J--  A4 3A    LDY  $3A
  0x02081B $880B: C-----  B1 5D    LDA  ($5D),Y
  0x02081D $880D: C-----  8D 30 05 STA  $0530
  0x020820 $8810: C-----  C8       INY  
  0x020821 $8811: C-----  B1 5D    LDA  ($5D),Y
  0x020823 $8813: C-----  8D 31 05 STA  $0531
  0x020826 $8816: C-----  C8       INY  
  0x020827 $8817: C-----  84 3A    STY  $3A
  0x020829 $8819: C-----  60       RTS  
  0x02082A $881A: C--J--  AE 22 05 LDX  $0522
  0x02082D $881D: C-----  A5 3A    LDA  $3A
  0x02082F $881F: C-----  A8       TAY  
  0x020830 $8820: C-----  18       CLC  
  0x020831 $8821: C-----  69 02    ADC  #$02
  0x020833 $8823: C-----  65 5D    ADC  $5D
  0x020835 $8825: C-----  9D 1A 05 STA  $051A,X
  0x020838 $8828: C-----  A5 5E    LDA  $5E
  0x02083A $882A: C-----  69 00    ADC  #$00
  0x02083C $882C: C-----  9D 1B 05 STA  $051B,X
  0x02083F $882F: C-----  E8       INX  
  0x020840 $8830: C-----  E8       INX  
  0x020841 $8831: C-----  8E 22 05 STX  $0522
  0x020844 $8834: C-----  4C F6 80 JMP  $80F6
  0x020847 $8837: C--J--  AE 22 05 LDX  $0522
  0x02084A $883A: C-----  CA       DEX  
  0x02084B $883B: C-----  CA       DEX  
  0x02084C $883C: C-----  8E 22 05 STX  $0522
  0x02084F $883F: C-----  10 03    BPL  $8844
  0x020851 $8841: C-----  4C CF 80 JMP  $80CF
  0x020854 $8844: C-----  BD 1A 05 LDA  $051A,X
  0x020857 $8847: C-----  85 5D    STA  $5D
  0x020859 $8849: C-----  BD 1B 05 LDA  $051B,X
  0x02085C $884C: C-----  85 5E    STA  $5E
  0x02085E $884E: C-----  A9 00    LDA  #$00
  0x020860 $8850: C-----  85 3A    STA  $3A
  0x020862 $8852: C-----  60       RTS  
  0x020863 $8853: C--J--  A4 3A    LDY  $3A
  0x020865 $8855: C-----  E6 3A    INC  $3A
  0x020867 $8857: C-----  B1 5D    LDA  ($5D),Y
  0x020869 $8859: C-----  8D 2D 05 STA  $052D
  0x02086C $885C: C-----  60       RTS  
  0x02086D $885D: C--J--  A4 3A    LDY  $3A
  0x02086F $885F: C-----  E6 3A    INC  $3A
  0x020871 $8861: C-----  B1 5D    LDA  ($5D),Y
  0x020873 $8863: C-----  20 6A 88 JSR  $886A
  0x020876 $8866: C-----  8E 2A 05 STX  $052A
  0x020879 $8869: C-----  60       RTS  
  0x02087A $886A: C-----  20 09 C5 JSR  $C509
  0x02087D $886D: -D0-I-  .byte $77 ; <indirect ref>
  0x02087E $886E: -D0-I-  .byte $88 ; <indirect ref>
  0x02087F $886F: -D0-I-  .byte $AA ; <indirect ref>
  0x020880 $8870: -D0-I-  .byte $88 ; <indirect ref>
  0x020881 $8871: -D0-I-  .byte $B5 ; <indirect ref>
  0x020882 $8872: -D0-I-  .byte $88 ; <indirect ref>
  0x020883 $8873: -D0-I-  .byte $BF ; <indirect ref>
  0x020884 $8874: -D0-I-  .byte $88 ; <indirect ref>
  0x020885 $8875: -D0-I-  .byte $D9 ; <indirect ref>
  0x020886 $8876: -D0-I-  .byte $88 ; <indirect ref>
  0x020887 $8877: C--J--  A9 00    LDA  #$00
  0x020889 $8879: C-----  85 3B    STA  $3B
  0x02088B $887B: C-----  AD 41 04 LDA  $0441
  0x02088E $887E: C-----  20 0C C5 JSR  $C50C
  0x020891 $8881: C-----  AD 38 06 LDA  $0638
  0x020894 $8884: C-----  20 36 C5 JSR  $C536
  0x020897 $8887: C-----  98       TYA  
  0x020898 $8888: C-----  A0 08    LDY  #$08
  0x02089A $888A: C-----  38       SEC  
  0x02089B $888B: C-----  F1 34    SBC  ($34),Y
  0x02089D $888D: C-----  B0 02    BCS  $8891
  0x02089F $888F: C-----  E6 3B    INC  $3B
  0x0208A1 $8891: C-----  8A       TXA  
  0x0208A2 $8892: C-----  A0 06    LDY  #$06
  0x0208A4 $8894: C-----  38       SEC  
  0x0208A5 $8895: C-----  F1 34    SBC  ($34),Y
  0x0208A7 $8897: C-----  B0 04    BCS  $889D
  0x0208A9 $8899: C-----  E6 3B    INC  $3B
  0x0208AB $889B: C-----  E6 3B    INC  $3B
  0x0208AD $889D: C-----  A2 40    LDX  #$40
  0x0208AF $889F: C-----  A5 3B    LDA  $3B
  0x0208B1 $88A1: C-----  F0 06    BEQ  $88A9
  0x0208B3 $88A3: C-----  C9 03    CMP  #$03
  0x0208B5 $88A5: C-----  F0 02    BEQ  $88A9
  0x0208B7 $88A7: C-----  A2 00    LDX  #$00
  0x0208B9 $88A9: C-----  60       RTS  
  0x0208BA $88AA: C--J--  A2 00    LDX  #$00
  0x0208BC $88AC: C-----  AD 16 06 LDA  $0616
  0x0208BF $88AF: C-----  4A       LSR  A
  0x0208C0 $88B0: C-----  90 02    BCC  $88B4
  0x0208C2 $88B2: C-----  A2 40    LDX  #$40
  0x0208C4 $88B4: C-----  60       RTS  
  0x0208C5 $88B5: C--J--  A2 00    LDX  #$00
  0x0208C7 $88B7: C-----  AD FB 05 LDA  $05FB
  0x0208CA $88BA: C-----  F0 02    BEQ  $88BE
  0x0208CC $88BC: C-----  A2 40    LDX  #$40
  0x0208CE $88BE: C-----  60       RTS  
  0x0208CF $88BF: C--J--  AD 41 04 LDA  $0441
  0x0208D2 $88C2: C-----  20 0C C5 JSR  $C50C
  0x0208D5 $88C5: C-----  A0 08    LDY  #$08
  0x0208D7 $88C7: C-----  B1 34    LDA  ($34),Y
  0x0208D9 $88C9: C-----  AE FB 05 LDX  $05FB
  0x0208DC $88CC: C-----  F0 02    BEQ  $88D0
  0x0208DE $88CE: C-----  49 FF    EOR  #$FF
  0x0208E0 $88D0: C-----  A2 00    LDX  #$00
  0x0208E2 $88D2: C-----  C9 80    CMP  #$80
  0x0208E4 $88D4: C-----  B0 02    BCS  $88D8
  0x0208E6 $88D6: C-----  A2 40    LDX  #$40
  0x0208E8 $88D8: C-----  60       RTS  
  0x0208E9 $88D9: C--J--  A2 00    LDX  #$00
  0x0208EB $88DB: C-----  2C 2C 06 BIT  $062C
  0x0208EE $88DE: C-----  10 02    BPL  $88E2
  0x0208F0 $88E0: C-----  A2 40    LDX  #$40
  0x0208F2 $88E2: C-----  60       RTS  
  0x0208F3 $88E3: C--J--  A4 3A    LDY  $3A
  0x0208F5 $88E5: C-----  E6 3A    INC  $3A
  0x0208F7 $88E7: C-----  B1 5D    LDA  ($5D),Y
  0x0208F9 $88E9: C-----  8D 39 05 STA  $0539
  0x0208FC $88EC: C-----  60       RTS  
  0x0208FD $88ED: C--J--  A4 3A    LDY  $3A
  0x0208FF $88EF: C-----  B1 5D    LDA  ($5D),Y
  0x020901 $88F1: C-----  20 09 C5 JSR  $C509
  0x020904 $88F4: ------  .byte $FC
  0x020905 $88F5: ------  .byte $88
  0x020906 $88F6: -D0-I-  .byte $0D ; <indirect ref>
  0x020907 $88F7: -D0-I-  .byte $89 ; <indirect ref>
  0x020908 $88F8: ------  .byte $3D
  0x020909 $88F9: ------  .byte $89
  0x02090A $88FA: -D0-I-  .byte $42 ; <indirect ref>
  0x02090B $88FB: -D0-I-  .byte $89 ; <indirect ref>
  0x02090C $88FC: ------  .byte $AD
  0x02090D $88FD: ------  .byte $41
  0x02090E $88FE: ------  .byte $04
  0x02090F $88FF: ------  .byte $20
  0x020910 $8900: ------  .byte $0C
  0x020911 $8901: ------  .byte $C5
  0x020912 $8902: ------  .byte $A0
  0x020913 $8903: ------  .byte $00
  0x020914 $8904: ------  .byte $B1
  0x020915 $8905: ------  .byte $34
  0x020916 $8906: ------  .byte $C9
  0x020917 $8907: ------  .byte $60
  0x020918 $8908: ------  .byte $D0
  0x020919 $8909: ------  .byte $00
  0x02091A $890A: ------  .byte $E6
  0x02091B $890B: ------  .byte $3A
  0x02091C $890C: ------  .byte $60
  0x02091D $890D: C--J--  AD FB 05 LDA  $05FB
  0x020920 $8910: C-----  D0 26    BNE  $8938
  0x020922 $8912: C-----  AD 2B 00 LDA  $002B
  0x020925 $8915: C-----  C9 05    CMP  #$05
  0x020927 $8917: C-----  D0 1F    BNE  $8938
  0x020929 $8919: C-----  AE 46 04 LDX  $0446
  0x02092C $891C: C-----  F0 1C    BEQ  $893A
  0x02092E $891E: C-----  A2 01    LDX  #$01
  0x020930 $8920: C-----  AD 3C 04 LDA  $043C
  0x020933 $8923: C-----  C9 03    CMP  #$03
  0x020935 $8925: C-----  F0 13    BEQ  $893A
  0x020937 $8927: C-----  AE 46 04 LDX  $0446
  0x02093A $892A: C-----  E0 04    CPX  #$04
  0x02093C $892C: C-----  B0 0A    BCS  $8938
  0x02093E $892E: C-----  AD 3C 04 LDA  $043C
  0x020941 $8931: C-----  F0 05    BEQ  $8938
  0x020943 $8933: C-----  EE 46 04 INC  $0446
  0x020946 $8936: C-----  D0 02    BNE  $893A
  0x020948 $8938: C-----  A2 00    LDX  #$00
  0x02094A $893A: C-----  4C 2F 81 JMP  $812F
  0x02094D $893D: ------  .byte $A2
  0x02094E $893E: ------  .byte $00
  0x02094F $893F: ------  .byte $4C
  0x020950 $8940: ------  .byte $2F
  0x020951 $8941: ------  .byte $81
  0x020952 $8942: C--J--  A2 00    LDX  #$00
  0x020954 $8944: C-----  AD FB 05 LDA  $05FB
  0x020957 $8947: C-----  D0 45    BNE  $898E
  0x020959 $8949: C-----  A9 01    LDA  #$01
  0x02095B $894B: C-----  48       PHA  
  0x02095C $894C: C-----  20 0C C5 JSR  $C50C
  0x02095F $894F: C-----  A0 00    LDY  #$00
  0x020961 $8951: C-----  B1 34    LDA  ($34),Y
  0x020963 $8953: C-----  A8       TAY  
  0x020964 $8954: C-----  A2 00    LDX  #$00
  0x020966 $8956: C-----  68       PLA  
  0x020967 $8957: C-----  C0 1A    CPY  #$1A
  0x020969 $8959: C-----  F0 09    BEQ  $8964
  0x02096B $895B: C-----  18       CLC  
  0x02096C $895C: C-----  69 01    ADC  #$01
  0x02096E $895E: C-----  C9 0B    CMP  #$0B
  0x020970 $8960: C-----  D0 E9    BNE  $894B
  0x020972 $8962: C-----  F0 2A    BEQ  $898E
  0x020974 $8964: C-----  AD 3C 04 LDA  $043C
  0x020977 $8967: C-----  C9 03    CMP  #$03
  0x020979 $8969: C-----  90 23    BCC  $898E
  0x02097B $896B: C-----  2C 49 04 BIT  $0449
  0x02097E $896E: C-----  30 1E    BMI  $898E
  0x020980 $8970: C-----  EE 49 04 INC  $0449
  0x020983 $8973: C-----  AD 49 04 LDA  $0449
  0x020986 $8976: C-----  C9 02    CMP  #$02
  0x020988 $8978: C-----  D0 14    BNE  $898E
  0x02098A $897A: C-----  A9 00    LDA  #$00
  0x02098C $897C: C-----  AC E2 00 LDY  $00E2
  0x02098F $897F: C-----  C0 20    CPY  #$20
  0x020991 $8981: C-----  B0 08    BCS  $898B
  0x020993 $8983: C-----  A9 1E    LDA  #$1E
  0x020995 $8985: C-----  8D 4A 04 STA  $044A
  0x020998 $8988: C-----  A9 80    LDA  #$80
  0x02099A $898A: C-----  E8       INX  
  0x02099B $898B: C-----  8D 49 04 STA  $0449
  0x02099E $898E: C-----  4C 2F 81 JMP  $812F
  0x0209A1 $8991: C-----  38       SEC  
  0x0209A2 $8992: C-----  E9 F0    SBC  #$F0
  0x0209A4 $8994: C-----  20 09 C5 JSR  $C509
  0x0209A7 $8997: -D0-I-  .byte $99 ; <indirect ref>
  0x0209A8 $8998: -D0-I-  .byte $89 ; <indirect ref>
  0x0209A9 $8999: C--J--  A9 FF    LDA  #$FF
  0x0209AB $899B: C-----  60       RTS  
  0x0209AC $899C: C-----  38       SEC  
  0x0209AD $899D: C-----  E9 F0    SBC  #$F0
  0x0209AF $899F: C-----  20 09 C5 JSR  $C509
  0x0209B2 $89A2: -D0-I-  .byte $A4 ; <indirect ref>
  0x0209B3 $89A3: -D0-I-  .byte $89 ; <indirect ref>
  0x0209B4 $89A4: C--J--  A9 FF    LDA  #$FF
  0x0209B6 $89A6: C-----  60       RTS  
  0x0209B7 $89A7: C-----  38       SEC  
  0x0209B8 $89A8: C-----  E9 F0    SBC  #$F0
  0x0209BA $89AA: C-----  20 09 C5 JSR  $C509
  0x0209BD $89AD: -D0-I-  .byte $B1 ; <indirect ref>
  0x0209BE $89AE: -D0-I-  .byte $89 ; <indirect ref>
  0x0209BF $89AF: ------  .byte $B4
  0x0209C0 $89B0: ------  .byte $89
  0x0209C1 $89B1: C--J--  A9 FF    LDA  #$FF
  0x0209C3 $89B3: C-----  60       RTS  
  0x0209C4 $89B4: ------  .byte $AD
  0x0209C5 $89B5: ------  .byte $E3
  0x0209C6 $89B6: ------  .byte $05
  0x0209C7 $89B7: ------  .byte $09
  0x0209C8 $89B8: ------  .byte $40
  0x0209C9 $89B9: ------  .byte $8D
  0x0209CA $89BA: ------  .byte $E3
  0x0209CB $89BB: ------  .byte $05
  0x0209CC $89BC: ------  .byte $A9
  0x0209CD $89BD: ------  .byte $FF
  0x0209CE $89BE: ------  .byte $60
  0x0209CF $89BF: -D0-I-  .byte $B1 ; <indirect ref>
  0x0209D0 $89C0: -D0-I-  .byte $8A ; <indirect ref>
  0x0209D1 $89C1: -D0-I-  .byte $F2 ; <indirect ref>
  0x0209D2 $89C2: -D0-I-  .byte $91 ; <indirect ref>
  0x0209D3 $89C3: -D0-I-  .byte $FF ; <indirect ref>
  0x0209D4 $89C4: -D0-I-  .byte $91 ; <indirect ref>
  0x0209D5 $89C5: ------  .byte $8E
  0x0209D6 $89C6: ------  .byte $B4
  0x0209D7 $89C7: -D0-I-  .byte $CB ; <indirect ref>
  0x0209D8 $89C8: -D0-I-  .byte $9B ; <indirect ref>
  0x0209D9 $89C9: -D0-I-  .byte $59 ; <indirect ref>
  0x0209DA $89CA: -D0-I-  .byte $92 ; <indirect ref>
  0x0209DB $89CB: -D0-I-  .byte $63 ; <indirect ref>
  0x0209DC $89CC: -D0-I-  .byte $92 ; <indirect ref>
  0x0209DD $89CD: -D0-I-  .byte $85 ; <indirect ref>
  0x0209DE $89CE: -D0-I-  .byte $92 ; <indirect ref>
  0x0209DF $89CF: -D0-I-  .byte $2C ; <indirect ref>
  0x0209E0 $89D0: -D0-I-  .byte $93 ; <indirect ref>
  0x0209E1 $89D1: -D0-I-  .byte $69 ; <indirect ref>
  0x0209E2 $89D2: -D0-I-  .byte $93 ; <indirect ref>
  0x0209E3 $89D3: -D0-I-  .byte $11 ; <indirect ref>
  0x0209E4 $89D4: -D0-I-  .byte $98 ; <indirect ref>
  0x0209E5 $89D5: -D0-I-  .byte $ED ; <indirect ref>
  0x0209E6 $89D6: -D0-I-  .byte $98 ; <indirect ref>
  0x0209E7 $89D7: -D0-I-  .byte $E3 ; <indirect ref>
  0x0209E8 $89D8: -D0-I-  .byte $96 ; <indirect ref>
  0x0209E9 $89D9: -D0-I-  .byte $F7 ; <indirect ref>
  0x0209EA $89DA: -D0-I-  .byte $96 ; <indirect ref>
  0x0209EB $89DB: -D0-I-  .byte $EA ; <indirect ref>
  0x0209EC $89DC: -D0-I-  .byte $91 ; <indirect ref>
  0x0209ED $89DD: -D0-I-  .byte $05 ; <indirect ref>
  0x0209EE $89DE: -D0-I-  .byte $92 ; <indirect ref>
  0x0209EF $89DF: -D0-I-  .byte $59 ; <indirect ref>
  0x0209F0 $89E0: -D0-I-  .byte $92 ; <indirect ref>
  0x0209F1 $89E1: -D0-I-  .byte $69 ; <indirect ref>
  0x0209F2 $89E2: -D0-I-  .byte $92 ; <indirect ref>
  0x0209F3 $89E3: -D0-I-  .byte $7F ; <indirect ref>
  0x0209F4 $89E4: -D0-I-  .byte $92 ; <indirect ref>
  0x0209F5 $89E5: -D0-I-  .byte $D3 ; <indirect ref>
  0x0209F6 $89E6: -D0-I-  .byte $91 ; <indirect ref>
  0x0209F7 $89E7: -D0-I-  .byte $82 ; <indirect ref>
  0x0209F8 $89E8: -D0-I-  .byte $9B ; <indirect ref>
  0x0209F9 $89E9: -D0-I-  .byte $0A ; <indirect ref>
  0x0209FA $89EA: -D0-I-  .byte $B8 ; <indirect ref>
  0x0209FB $89EB: -D0-I-  .byte $17 ; <indirect ref>
  0x0209FC $89EC: -D0-I-  .byte $B8 ; <indirect ref>
  0x0209FD $89ED: -D0-I-  .byte $A1 ; <indirect ref>
  0x0209FE $89EE: -D0-I-  .byte $B8 ; <indirect ref>
  0x0209FF $89EF: -D0-I-  .byte $3E ; <indirect ref>
  0x020A00 $89F0: -D0-I-  .byte $9E ; <indirect ref>
  0x020A01 $89F1: -D0-I-  .byte $D4 ; <indirect ref>
  0x020A02 $89F2: -D0-I-  .byte $BB ; <indirect ref>
  0x020A03 $89F3: -D0-I-  .byte $6D ; <indirect ref>
  0x020A04 $89F4: -D0-I-  .byte $BC ; <indirect ref>
  0x020A05 $89F5: -D0-I-  .byte $86 ; <indirect ref>
  0x020A06 $89F6: -D0-I-  .byte $B4 ; <indirect ref>
  0x020A07 $89F7: -D0-I-  .byte $E3 ; <indirect ref>
  0x020A08 $89F8: -D0-I-  .byte $9B ; <indirect ref>
  0x020A09 $89F9: -D0-I-  .byte $EE ; <indirect ref>
  0x020A0A $89FA: -D0-I-  .byte $9C ; <indirect ref>
  0x020A0B $89FB: -D0-I-  .byte $DA ; <indirect ref>
  0x020A0C $89FC: -D0-I-  .byte $B7 ; <indirect ref>
  0x020A0D $89FD: -D0-I-  .byte $33 ; <indirect ref>
  0x020A0E $89FE: -D0-I-  .byte $B7 ; <indirect ref>
  0x020A0F $89FF: -D0-I-  .byte $38 ; <indirect ref>
  0x020A10 $8A00: -D0-I-  .byte $B7 ; <indirect ref>
  0x020A11 $8A01: -D0-I-  .byte $3B ; <indirect ref>
  0x020A12 $8A02: -D0-I-  .byte $BA ; <indirect ref>
  0x020A13 $8A03: -D0-I-  .byte $49 ; <indirect ref>
  0x020A14 $8A04: -D0-I-  .byte $B7 ; <indirect ref>
  0x020A15 $8A05: -D0-I-  .byte $3F ; <indirect ref>
  0x020A16 $8A06: -D0-I-  .byte $BB ; <indirect ref>
  0x020A17 $8A07: -D0-I-  .byte $F2 ; <indirect ref>
  0x020A18 $8A08: -D0-I-  .byte $9B ; <indirect ref>
  0x020A19 $8A09: -D0-I-  .byte $DD ; <indirect ref>
  0x020A1A $8A0A: -D0-I-  .byte $9C ; <indirect ref>
  0x020A1B $8A0B: -D0-I-  .byte $2D ; <indirect ref>
  0x020A1C $8A0C: -D0-I-  .byte $9E ; <indirect ref>
  0x020A1D $8A0D: -D0-I-  .byte $F8 ; <indirect ref>
  0x020A1E $8A0E: -D0-I-  .byte $9B ; <indirect ref>
  0x020A1F $8A0F: -D0-I-  .byte $CC ; <indirect ref>
  0x020A20 $8A10: -D0-I-  .byte $B4 ; <indirect ref>
  0x020A21 $8A11: -D0-I-  .byte $FE ; <indirect ref>
  0x020A22 $8A12: -D0-I-  .byte $9B ; <indirect ref>
  0x020A23 $8A13: -D0-I-  .byte $E0 ; <indirect ref>
  0x020A24 $8A14: -D0-I-  .byte $B4 ; <indirect ref>
  0x020A25 $8A15: -D0-I-  .byte $2C ; <indirect ref>
  0x020A26 $8A16: -D0-I-  .byte $B7 ; <indirect ref>
  0x020A27 $8A17: -D0-I-  .byte $54 ; <indirect ref>
  0x020A28 $8A18: -D0-I-  .byte $9F ; <indirect ref>
  0x020A29 $8A19: -D0-I-  .byte $D6 ; <indirect ref>
  0x020A2A $8A1A: -D0-I-  .byte $B4 ; <indirect ref>
  0x020A2B $8A1B: -D0-I-  .byte $4E ; <indirect ref>
  0x020A2C $8A1C: -D0-I-  .byte $B7 ; <indirect ref>
  0x020A2D $8A1D: -D0-I-  .byte $73 ; <indirect ref>
  0x020A2E $8A1E: -D0-I-  .byte $B7 ; <indirect ref>
  0x020A2F $8A1F: -D0-I-  .byte $30 ; <indirect ref>
  0x020A30 $8A20: -D0-I-  .byte $9C ; <indirect ref>
  0x020A31 $8A21: -D0-I-  .byte $8C ; <indirect ref>
  0x020A32 $8A22: -D0-I-  .byte $B7 ; <indirect ref>
  0x020A33 $8A23: -D0-I-  .byte $57 ; <indirect ref>
  0x020A34 $8A24: -D0-I-  .byte $9E ; <indirect ref>
  0x020A35 $8A25: -D0-I-  .byte $04 ; <indirect ref>
  0x020A36 $8A26: -D0-I-  .byte $9C ; <indirect ref>
  0x020A37 $8A27: -D0-I-  .byte $CC ; <indirect ref>
  0x020A38 $8A28: -D0-I-  .byte $BB ; <indirect ref>
  0x020A39 $8A29: -D0-I-  .byte $CD ; <indirect ref>
  0x020A3A $8A2A: -D0-I-  .byte $B7 ; <indirect ref>
  0x020A3B $8A2B: -D0-I-  .byte $E4 ; <indirect ref>
  0x020A3C $8A2C: -D0-I-  .byte $B7 ; <indirect ref>
  0x020A3D $8A2D: -D0-I-  .byte $BF ; <indirect ref>
  0x020A3E $8A2E: -D0-I-  .byte $B7 ; <indirect ref>
  0x020A3F $8A2F: -D0-I-  .byte $C6 ; <indirect ref>
  0x020A40 $8A30: -D0-I-  .byte $B7 ; <indirect ref>
  0x020A41 $8A31: -D0-I-  .byte $B3 ; <indirect ref>
  0x020A42 $8A32: -D0-I-  .byte $BD ; <indirect ref>
  0x020A43 $8A33: -D0-I-  .byte $7C ; <indirect ref>
  0x020A44 $8A34: -D0-I-  .byte $B4 ; <indirect ref>
  0x020A45 $8A35: ------  .byte $A1
  0x020A46 $8A36: ------  .byte $BD
  0x020A47 $8A37: ------  .byte $3E
  0x020A48 $8A38: ------  .byte $9F
  0x020A49 $8A39: -D0-I-  .byte $BA ; <indirect ref>
  0x020A4A $8A3A: -D0-I-  .byte $9F ; <indirect ref>
  0x020A4B $8A3B: -D0-I-  .byte $0A ; <indirect ref>
  0x020A4C $8A3C: -D0-I-  .byte $9C ; <indirect ref>
  0x020A4D $8A3D: -D0-I-  .byte $54 ; <indirect ref>
  0x020A4E $8A3E: -D0-I-  .byte $B7 ; <indirect ref>
  0x020A4F $8A3F: -D0-I-  .byte $95 ; <indirect ref>
  0x020A50 $8A40: -D0-I-  .byte $BD ; <indirect ref>
  0x020A51 $8A41: -D0-I-  .byte $9A ; <indirect ref>
  0x020A52 $8A42: -D0-I-  .byte $BD ; <indirect ref>
  0x020A53 $8A43: -D0-I-  .byte $A6 ; <indirect ref>
  0x020A54 $8A44: -D0-I-  .byte $BD ; <indirect ref>
  0x020A55 $8A45: -D0-I-  .byte $AD ; <indirect ref>
  0x020A56 $8A46: -D0-I-  .byte $BD ; <indirect ref>
  0x020A57 $8A47: -D0-I-  .byte $D5 ; <indirect ref>
  0x020A58 $8A48: -D0-I-  .byte $B7 ; <indirect ref>
  0x020A59 $8A49: -D0-I-  .byte $B8 ; <indirect ref>
  0x020A5A $8A4A: -D0-I-  .byte $BD ; <indirect ref>
  0x020A5B $8A4B: -D0-I-  .byte $BD ; <indirect ref>
  0x020A5C $8A4C: -D0-I-  .byte $BD ; <indirect ref>
  0x020A5D $8A4D: -D0-I-  .byte $19 ; <indirect ref>
  0x020A5E $8A4E: -D0-I-  .byte $9C ; <indirect ref>
  0x020A5F $8A4F: ------  .byte $01
  0x020A60 $8A50: ------  .byte $BE
  0x020A61 $8A51: ------  .byte $01
  0x020A62 $8A52: ------  .byte $BE
  0x020A63 $8A53: ------  .byte $01
  0x020A64 $8A54: ------  .byte $BE
  0x020A65 $8A55: ------  .byte $01
  0x020A66 $8A56: ------  .byte $BE
  0x020A67 $8A57: ------  .byte $01
  0x020A68 $8A58: ------  .byte $BE
  0x020A69 $8A59: ------  .byte $01
  0x020A6A $8A5A: ------  .byte $BE
  0x020A6B $8A5B: ------  .byte $01
  0x020A6C $8A5C: ------  .byte $BE
  0x020A6D $8A5D: ------  .byte $01
  0x020A6E $8A5E: ------  .byte $BE
  0x020A6F $8A5F: -D0-I-  .byte $01 ; <indirect ref>
  0x020A70 $8A60: -D0-I-  .byte $BE ; <indirect ref>
  0x020A71 $8A61: -D0-I-  .byte $0D ; <indirect ref>
  0x020A72 $8A62: -D0-I-  .byte $BE ; <indirect ref>
  0x020A73 $8A63: -D0-I-  .byte $18 ; <indirect ref>
  0x020A74 $8A64: -D0-I-  .byte $BE ; <indirect ref>
  0x020A75 $8A65: -D0-I-  .byte $20 ; <indirect ref>
  0x020A76 $8A66: -D0-I-  .byte $BE ; <indirect ref>
  0x020A77 $8A67: -D0-I-  .byte $2A ; <indirect ref>
  0x020A78 $8A68: -D0-I-  .byte $BE ; <indirect ref>
  0x020A79 $8A69: -D0-I-  .byte $32 ; <indirect ref>
  0x020A7A $8A6A: -D0-I-  .byte $BE ; <indirect ref>
  0x020A7B $8A6B: -D0-I-  .byte $3A ; <indirect ref>
  0x020A7C $8A6C: -D0-I-  .byte $BE ; <indirect ref>
  0x020A7D $8A6D: -D0-I-  .byte $42 ; <indirect ref>
  0x020A7E $8A6E: -D0-I-  .byte $BE ; <indirect ref>
  0x020A7F $8A6F: -D0-I-  .byte $4A ; <indirect ref>
  0x020A80 $8A70: -D0-I-  .byte $BE ; <indirect ref>
  0x020A81 $8A71: -D0-I-  .byte $52 ; <indirect ref>
  0x020A82 $8A72: -D0-I-  .byte $BE ; <indirect ref>
  0x020A83 $8A73: -D0-I-  .byte $5A ; <indirect ref>
  0x020A84 $8A74: -D0-I-  .byte $BE ; <indirect ref>
  0x020A85 $8A75: -D0-I-  .byte $69 ; <indirect ref>
  0x020A86 $8A76: -D0-I-  .byte $BE ; <indirect ref>
  0x020A87 $8A77: -D0-I-  .byte $73 ; <indirect ref>
  0x020A88 $8A78: -D0-I-  .byte $BE ; <indirect ref>
  0x020A89 $8A79: -D0-I-  .byte $7C ; <indirect ref>
  0x020A8A $8A7A: -D0-I-  .byte $BE ; <indirect ref>
  0x020A8B $8A7B: -D0-I-  .byte $86 ; <indirect ref>
  0x020A8C $8A7C: -D0-I-  .byte $BE ; <indirect ref>
  0x020A8D $8A7D: -D0-I-  .byte $8E ; <indirect ref>
  0x020A8E $8A7E: -D0-I-  .byte $BE ; <indirect ref>
  0x020A8F $8A7F: -D0-I-  .byte $96 ; <indirect ref>
  0x020A90 $8A80: -D0-I-  .byte $BE ; <indirect ref>
  0x020A91 $8A81: -D0-I-  .byte $9E ; <indirect ref>
  0x020A92 $8A82: -D0-I-  .byte $BE ; <indirect ref>
  0x020A93 $8A83: -D0-I-  .byte $A6 ; <indirect ref>
  0x020A94 $8A84: -D0-I-  .byte $BE ; <indirect ref>
  0x020A95 $8A85: -D0-I-  .byte $AE ; <indirect ref>
  0x020A96 $8A86: -D0-I-  .byte $BE ; <indirect ref>
  0x020A97 $8A87: -D0-I-  .byte $B6 ; <indirect ref>
  0x020A98 $8A88: -D0-I-  .byte $BE ; <indirect ref>
  0x020A99 $8A89: -D0-I-  .byte $BE ; <indirect ref>
  0x020A9A $8A8A: -D0-I-  .byte $BE ; <indirect ref>
  0x020A9B $8A8B: -D0-I-  .byte $C6 ; <indirect ref>
  0x020A9C $8A8C: -D0-I-  .byte $BE ; <indirect ref>
  0x020A9D $8A8D: ------  .byte $D8
  0x020A9E $8A8E: ------  .byte $BE
  0x020A9F $8A8F: ------  .byte $F7
  0x020AA0 $8A90: ------  .byte $BE
  0x020AA1 $8A91: -D0-I-  .byte $05 ; <indirect ref>
  0x020AA2 $8A92: -D0-I-  .byte $BF ; <indirect ref>
  0x020AA3 $8A93: -D0-I-  .byte $62 ; <indirect ref>
  0x020AA4 $8A94: -D0-I-  .byte $AA ; <indirect ref>
  0x020AA5 $8A95: -D0-I-  .byte $0D ; <indirect ref>
  0x020AA6 $8A96: -D0-I-  .byte $BF ; <indirect ref>
  0x020AA7 $8A97: -D0-I-  .byte $13 ; <indirect ref>
  0x020AA8 $8A98: -D0-I-  .byte $BF ; <indirect ref>
  0x020AA9 $8A99: -D0-I-  .byte $23 ; <indirect ref>
  0x020AAA $8A9A: -D0-I-  .byte $BF ; <indirect ref>
  0x020AAB $8A9B: -D0-I-  .byte $2C ; <indirect ref>
  0x020AAC $8A9C: -D0-I-  .byte $BF ; <indirect ref>
  0x020AAD $8A9D: -D0-I-  .byte $54 ; <indirect ref>
  0x020AAE $8A9E: -D0-I-  .byte $BF ; <indirect ref>
  0x020AAF $8A9F: -D0-I-  .byte $61 ; <indirect ref>
  0x020AB0 $8AA0: -D0-I-  .byte $BF ; <indirect ref>
  0x020AB1 $8AA1: -D0-I-  .byte $73 ; <indirect ref>
  0x020AB2 $8AA2: -D0-I-  .byte $BF ; <indirect ref>
  0x020AB3 $8AA3: -D0-I-  .byte $7F ; <indirect ref>
  0x020AB4 $8AA4: -D0-I-  .byte $BF ; <indirect ref>
  0x020AB5 $8AA5: -D0-I-  .byte $94 ; <indirect ref>
  0x020AB6 $8AA6: -D0-I-  .byte $BF ; <indirect ref>
  0x020AB7 $8AA7: -D0-I-  .byte $9C ; <indirect ref>
  0x020AB8 $8AA8: -D0-I-  .byte $BF ; <indirect ref>
  0x020AB9 $8AA9: -D0-I-  .byte $D2 ; <indirect ref>
  0x020ABA $8AAA: -D0-I-  .byte $BF ; <indirect ref>
  0x020ABB $8AAB: -D0-I-  .byte $1B ; <indirect ref>
  0x020ABC $8AAC: -D0-I-  .byte $B0 ; <indirect ref>
  0x020ABD $8AAD: -D0-I-  .byte $D8 ; <indirect ref>
  0x020ABE $8AAE: -D0-I-  .byte $BF ; <indirect ref>
  0x020ABF $8AAF: -D0-I-  .byte $97 ; <indirect ref>
  0x020AC0 $8AB0: -D0-I-  .byte $A1 ; <indirect ref>
  0x020AC1 $8AB1: -D0-I-  .byte $F3 ; <indirect ref>
  0x020AC2 $8AB2: -D0-I-  .byte $34 ; <indirect ref>
  0x020AC3 $8AB3: -D0-I-  .byte $B9 ; <indirect ref>
  0x020AC4 $8AB4: -D0-I-  .byte $8A ; <indirect ref>
  0x020AC5 $8AB5: -D0-I-  .byte $09 ; <indirect ref>
  0x020AC6 $8AB6: -D0-I-  .byte $8F ; <indirect ref>
  0x020AC7 $8AB7: -D0-I-  .byte $4B ; <indirect ref>
  0x020AC8 $8AB8: -D0-I-  .byte $8C ; <indirect ref>
  0x020AC9 $8AB9: -D0-I-  .byte $FD ; <indirect ref>
  0x020ACA $8ABA: -D0-I-  .byte $01 ; <indirect ref>
  0x020ACB $8ABB: -D0-I-  .byte $F3 ; <indirect ref>
  0x020ACC $8ABC: -D0-I-  .byte $80 ; <indirect ref>
  0x020ACD $8ABD: -D0-I-  .byte $02 ; <indirect ref>
  0x020ACE $8ABE: -D0-I-  .byte $05 ; <indirect ref>
  0x020ACF $8ABF: -D0-I-  .byte $F3 ; <indirect ref>
  0x020AD0 $8AC0: -D0-I-  .byte $81 ; <indirect ref>
  0x020AD1 $8AC1: -D0-I-  .byte $06 ; <indirect ref>
  0x020AD2 $8AC2: -D0-I-  .byte $CC ; <indirect ref>
  0x020AD3 $8AC3: -D0-I-  .byte $F3 ; <indirect ref>
  0x020AD4 $8AC4: -D0-I-  .byte $81 ; <indirect ref>
  0x020AD5 $8AC5: -D0-I-  .byte $07 ; <indirect ref>
  0x020AD6 $8AC6: -D0-I-  .byte $CD ; <indirect ref>
  0x020AD7 $8AC7: -D0-I-  .byte $F3 ; <indirect ref>
  0x020AD8 $8AC8: -D0-I-  .byte $82 ; <indirect ref>
  0x020AD9 $8AC9: -D0-I-  .byte $08 ; <indirect ref>
  0x020ADA $8ACA: -D0-I-  .byte $15 ; <indirect ref>
  0x020ADB $8ACB: -D0-I-  .byte $0D ; <indirect ref>
  0x020ADC $8ACC: -D0-I-  .byte $F3 ; <indirect ref>
  0x020ADD $8ACD: -D0-I-  .byte $82 ; <indirect ref>
  0x020ADE $8ACE: -D0-I-  .byte $18 ; <indirect ref>
  0x020ADF $8ACF: -D0-I-  .byte $1E ; <indirect ref>
  0x020AE0 $8AD0: -D0-I-  .byte $24 ; <indirect ref>
  0x020AE1 $8AD1: -D0-I-  .byte $F3 ; <indirect ref>
  0x020AE2 $8AD2: -D0-I-  .byte $83 ; <indirect ref>
  0x020AE3 $8AD3: -D0-I-  .byte $28 ; <indirect ref>
  0x020AE4 $8AD4: -D0-I-  .byte $30 ; <indirect ref>
  0x020AE5 $8AD5: -D0-I-  .byte $38 ; <indirect ref>
  0x020AE6 $8AD6: -D0-I-  .byte $49 ; <indirect ref>
  0x020AE7 $8AD7: -D0-I-  .byte $5A ; <indirect ref>
  0x020AE8 $8AD8: -D0-I-  .byte $F3 ; <indirect ref>
  0x020AE9 $8AD9: -D0-I-  .byte $83 ; <indirect ref>
  0x020AEA $8ADA: -D0-I-  .byte $21 ; <indirect ref>
  0x020AEB $8ADB: -D0-I-  .byte $29 ; <indirect ref>
  0x020AEC $8ADC: -D0-I-  .byte $31 ; <indirect ref>
  0x020AED $8ADD: -D0-I-  .byte $42 ; <indirect ref>
  0x020AEE $8ADE: -D0-I-  .byte $53 ; <indirect ref>
  0x020AEF $8ADF: -D0-I-  .byte $F3 ; <indirect ref>
  0x020AF0 $8AE0: -D0-I-  .byte $83 ; <indirect ref>
  0x020AF1 $8AE1: -D0-I-  .byte $5C ; <indirect ref>
  0x020AF2 $8AE2: -D0-I-  .byte $67 ; <indirect ref>
  0x020AF3 $8AE3: -D0-I-  .byte $72 ; <indirect ref>
  0x020AF4 $8AE4: -D0-I-  .byte $86 ; <indirect ref>
  0x020AF5 $8AE5: -D0-I-  .byte $9A ; <indirect ref>
  0x020AF6 $8AE6: -D0-I-  .byte $F3 ; <indirect ref>
  0x020AF7 $8AE7: -D0-I-  .byte $83 ; <indirect ref>
  0x020AF8 $8AE8: -D0-I-  .byte $16 ; <indirect ref>
  0x020AF9 $8AE9: -D0-I-  .byte $1E ; <indirect ref>
  0x020AFA $8AEA: -D0-I-  .byte $26 ; <indirect ref>
  0x020AFB $8AEB: ------  .byte $37
  0x020AFC $8AEC: -D0-I-  .byte $48 ; <indirect ref>
  0x020AFD $8AED: -D0-I-  .byte $F3 ; <indirect ref>
  0x020AFE $8AEE: -D0-I-  .byte $83 ; <indirect ref>
  0x020AFF $8AEF: -D0-I-  .byte $4E ; <indirect ref>
  0x020B00 $8AF0: -D0-I-  .byte $59 ; <indirect ref>
  0x020B01 $8AF1: -D0-I-  .byte $64 ; <indirect ref>
  0x020B02 $8AF2: -D0-I-  .byte $78 ; <indirect ref>
  0x020B03 $8AF3: -D0-I-  .byte $8C ; <indirect ref>
  0x020B04 $8AF4: -D0-I-  .byte $F3 ; <indirect ref>
  0x020B05 $8AF5: -D0-I-  .byte $83 ; <indirect ref>
  0x020B06 $8AF6: -D0-I-  .byte $08 ; <indirect ref>
  0x020B07 $8AF7: -D0-I-  .byte $10 ; <indirect ref>
  0x020B08 $8AF8: -D0-I-  .byte $18 ; <indirect ref>
  0x020B09 $8AF9: -D0-I-  .byte $29 ; <indirect ref>
  0x020B0A $8AFA: -D0-I-  .byte $3A ; <indirect ref>
  0x020B0B $8AFB: -D0-I-  .byte $FA ; <indirect ref>
  0x020B0C $8AFC: -D0-I-  .byte $8B ; <indirect ref>
  0x020B0D $8AFD: -D0-I-  .byte $9C ; <indirect ref>
  0x020B0E $8AFE: -D0-I-  .byte $FA ; <indirect ref>
  0x020B0F $8AFF: -D0-I-  .byte $C0 ; <indirect ref>
  0x020B10 $8B00: -D0-I-  .byte $9C ; <indirect ref>
  0x020B11 $8B01: -D0-I-  .byte $F2 ; <indirect ref>
  0x020B12 $8B02: -D0-I-  .byte $AA ; <indirect ref>
  0x020B13 $8B03: -D0-I-  .byte $9E ; <indirect ref>
  0x020B14 $8B04: -D0-I-  .byte $FA ; <indirect ref>
  0x020B15 $8B05: -D0-I-  .byte $8B ; <indirect ref>
  0x020B16 $8B06: -D0-I-  .byte $9C ; <indirect ref>
  0x020B17 $8B07: -D0-I-  .byte $FA ; <indirect ref>
  0x020B18 $8B08: -D0-I-  .byte $A3 ; <indirect ref>
  0x020B19 $8B09: -D0-I-  .byte $9C ; <indirect ref>
  0x020B1A $8B0A: -D0-I-  .byte $F2 ; <indirect ref>
  0x020B1B $8B0B: -D0-I-  .byte $AA ; <indirect ref>
  0x020B1C $8B0C: -D0-I-  .byte $9E ; <indirect ref>
  0x020B1D $8B0D: -D0-I-  .byte $FA ; <indirect ref>
  0x020B1E $8B0E: -D0-I-  .byte $8B ; <indirect ref>
  0x020B1F $8B0F: -D0-I-  .byte $9C ; <indirect ref>
  0x020B20 $8B10: -D0-I-  .byte $FA ; <indirect ref>
  0x020B21 $8B11: -D0-I-  .byte $FE ; <indirect ref>
  0x020B22 $8B12: -D0-I-  .byte $9D ; <indirect ref>
  0x020B23 $8B13: -D0-I-  .byte $FA ; <indirect ref>
  0x020B24 $8B14: -D0-I-  .byte $08 ; <indirect ref>
  0x020B25 $8B15: -D0-I-  .byte $A3 ; <indirect ref>
  0x020B26 $8B16: -D0-I-  .byte $F6 ; <indirect ref>
  0x020B27 $8B17: -D0-I-  .byte $FA ; <indirect ref>
  0x020B28 $8B18: -D0-I-  .byte $73 ; <indirect ref>
  0x020B29 $8B19: -D0-I-  .byte $A3 ; <indirect ref>
  0x020B2A $8B1A: -D0-I-  .byte $FA ; <indirect ref>
  0x020B2B $8B1B: -D0-I-  .byte $64 ; <indirect ref>
  0x020B2C $8B1C: -D0-I-  .byte $9E ; <indirect ref>
  0x020B2D $8B1D: -D0-I-  .byte $F6 ; <indirect ref>
  0x020B2E $8B1E: -D0-I-  .byte $F0 ; <indirect ref>
  0x020B2F $8B1F: -D0-I-  .byte $FA ; <indirect ref>
  0x020B30 $8B20: -D0-I-  .byte $8B ; <indirect ref>
  0x020B31 $8B21: -D0-I-  .byte $9C ; <indirect ref>
  0x020B32 $8B22: -D0-I-  .byte $FA ; <indirect ref>
  0x020B33 $8B23: -D0-I-  .byte $FE ; <indirect ref>
  0x020B34 $8B24: -D0-I-  .byte $9D ; <indirect ref>
  0x020B35 $8B25: -D0-I-  .byte $FA ; <indirect ref>
  0x020B36 $8B26: -D0-I-  .byte $EF ; <indirect ref>
  0x020B37 $8B27: -D0-I-  .byte $A2 ; <indirect ref>
  0x020B38 $8B28: -D0-I-  .byte $FA ; <indirect ref>
  0x020B39 $8B29: -D0-I-  .byte $5A ; <indirect ref>
  0x020B3A $8B2A: -D0-I-  .byte $A1 ; <indirect ref>
  0x020B3B $8B2B: -D0-I-  .byte $F6 ; <indirect ref>
  0x020B3C $8B2C: -D0-I-  .byte $FA ; <indirect ref>
  0x020B3D $8B2D: -D0-I-  .byte $64 ; <indirect ref>
  0x020B3E $8B2E: -D0-I-  .byte $9E ; <indirect ref>
  0x020B3F $8B2F: -D0-I-  .byte $F6 ; <indirect ref>
  0x020B40 $8B30: -D0-I-  .byte $F0 ; <indirect ref>
  0x020B41 $8B31: -D0-I-  .byte $FA ; <indirect ref>
  0x020B42 $8B32: -D0-I-  .byte $8B ; <indirect ref>
  0x020B43 $8B33: -D0-I-  .byte $9C ; <indirect ref>
  0x020B44 $8B34: -D0-I-  .byte $FA ; <indirect ref>
  0x020B45 $8B35: -D0-I-  .byte $FE ; <indirect ref>
  0x020B46 $8B36: -D0-I-  .byte $9D ; <indirect ref>
  0x020B47 $8B37: -D0-I-  .byte $FA ; <indirect ref>
  0x020B48 $8B38: -D0-I-  .byte $DD ; <indirect ref>
  0x020B49 $8B39: -D0-I-  .byte $A2 ; <indirect ref>
  0x020B4A $8B3A: -D0-I-  .byte $F2 ; <indirect ref>
  0x020B4B $8B3B: -D0-I-  .byte $5B ; <indirect ref>
  0x020B4C $8B3C: -D0-I-  .byte $A3 ; <indirect ref>
  0x020B4D $8B3D: -D0-I-  .byte $FA ; <indirect ref>
  0x020B4E $8B3E: -D0-I-  .byte $36 ; <indirect ref>
  0x020B4F $8B3F: -D0-I-  .byte $A9 ; <indirect ref>
  0x020B50 $8B40: -D0-I-  .byte $FA ; <indirect ref>
  0x020B51 $8B41: -D0-I-  .byte $CF ; <indirect ref>
  0x020B52 $8B42: -D0-I-  .byte $A3 ; <indirect ref>
  0x020B53 $8B43: -D0-I-  .byte $FA ; <indirect ref>
  0x020B54 $8B44: -D0-I-  .byte $C0 ; <indirect ref>
  0x020B55 $8B45: -D0-I-  .byte $9C ; <indirect ref>
  0x020B56 $8B46: -D0-I-  .byte $F2 ; <indirect ref>
  0x020B57 $8B47: -D0-I-  .byte $AA ; <indirect ref>
  0x020B58 $8B48: -D0-I-  .byte $9E ; <indirect ref>
  0x020B59 $8B49: -D0-I-  .byte $FA ; <indirect ref>
  0x020B5A $8B4A: -D0-I-  .byte $36 ; <indirect ref>
  0x020B5B $8B4B: -D0-I-  .byte $A9 ; <indirect ref>
  0x020B5C $8B4C: -D0-I-  .byte $FA ; <indirect ref>
  0x020B5D $8B4D: -D0-I-  .byte $CF ; <indirect ref>
  0x020B5E $8B4E: -D0-I-  .byte $A3 ; <indirect ref>
  0x020B5F $8B4F: -D0-I-  .byte $FA ; <indirect ref>
  0x020B60 $8B50: -D0-I-  .byte $A3 ; <indirect ref>
  0x020B61 $8B51: -D0-I-  .byte $9C ; <indirect ref>
  0x020B62 $8B52: -D0-I-  .byte $F2 ; <indirect ref>
  0x020B63 $8B53: -D0-I-  .byte $AA ; <indirect ref>
  0x020B64 $8B54: -D0-I-  .byte $9E ; <indirect ref>
  0x020B65 $8B55: -D0-I-  .byte $FA ; <indirect ref>
  0x020B66 $8B56: -D0-I-  .byte $36 ; <indirect ref>
  0x020B67 $8B57: -D0-I-  .byte $A9 ; <indirect ref>
  0x020B68 $8B58: -D0-I-  .byte $FA ; <indirect ref>
  0x020B69 $8B59: -D0-I-  .byte $CF ; <indirect ref>
  0x020B6A $8B5A: -D0-I-  .byte $A3 ; <indirect ref>
  0x020B6B $8B5B: -D0-I-  .byte $FA ; <indirect ref>
  0x020B6C $8B5C: -D0-I-  .byte $FE ; <indirect ref>
  0x020B6D $8B5D: -D0-I-  .byte $9D ; <indirect ref>
  0x020B6E $8B5E: -D0-I-  .byte $FA ; <indirect ref>
  0x020B6F $8B5F: -D0-I-  .byte $08 ; <indirect ref>
  0x020B70 $8B60: -D0-I-  .byte $A3 ; <indirect ref>
  0x020B71 $8B61: -D0-I-  .byte $F6 ; <indirect ref>
  0x020B72 $8B62: -D0-I-  .byte $FA ; <indirect ref>
  0x020B73 $8B63: -D0-I-  .byte $73 ; <indirect ref>
  0x020B74 $8B64: -D0-I-  .byte $A3 ; <indirect ref>
  0x020B75 $8B65: -D0-I-  .byte $FA ; <indirect ref>
  0x020B76 $8B66: -D0-I-  .byte $64 ; <indirect ref>
  0x020B77 $8B67: -D0-I-  .byte $9E ; <indirect ref>
  0x020B78 $8B68: -D0-I-  .byte $F6 ; <indirect ref>
  0x020B79 $8B69: -D0-I-  .byte $F0 ; <indirect ref>
  0x020B7A $8B6A: -D0-I-  .byte $FA ; <indirect ref>
  0x020B7B $8B6B: -D0-I-  .byte $36 ; <indirect ref>
  0x020B7C $8B6C: -D0-I-  .byte $A9 ; <indirect ref>
  0x020B7D $8B6D: -D0-I-  .byte $FA ; <indirect ref>
  0x020B7E $8B6E: -D0-I-  .byte $CF ; <indirect ref>
  0x020B7F $8B6F: -D0-I-  .byte $A3 ; <indirect ref>
  0x020B80 $8B70: -D0-I-  .byte $FA ; <indirect ref>
  0x020B81 $8B71: -D0-I-  .byte $FE ; <indirect ref>
  0x020B82 $8B72: -D0-I-  .byte $9D ; <indirect ref>
  0x020B83 $8B73: -D0-I-  .byte $FA ; <indirect ref>
  0x020B84 $8B74: -D0-I-  .byte $28 ; <indirect ref>
  0x020B85 $8B75: -D0-I-  .byte $B4 ; <indirect ref>
  0x020B86 $8B76: -D0-I-  .byte $FA ; <indirect ref>
  0x020B87 $8B77: -D0-I-  .byte $C3 ; <indirect ref>
  0x020B88 $8B78: -D0-I-  .byte $A0 ; <indirect ref>
  0x020B89 $8B79: -D0-I-  .byte $F6 ; <indirect ref>
  0x020B8A $8B7A: -D0-I-  .byte $FA ; <indirect ref>
  0x020B8B $8B7B: -D0-I-  .byte $64 ; <indirect ref>
  0x020B8C $8B7C: -D0-I-  .byte $9E ; <indirect ref>
  0x020B8D $8B7D: -D0-I-  .byte $F6 ; <indirect ref>
  0x020B8E $8B7E: -D0-I-  .byte $F0 ; <indirect ref>
  0x020B8F $8B7F: -D0-I-  .byte $FA ; <indirect ref>
  0x020B90 $8B80: -D0-I-  .byte $36 ; <indirect ref>
  0x020B91 $8B81: -D0-I-  .byte $A9 ; <indirect ref>
  0x020B92 $8B82: -D0-I-  .byte $FA ; <indirect ref>
  0x020B93 $8B83: -D0-I-  .byte $CF ; <indirect ref>
  0x020B94 $8B84: -D0-I-  .byte $A3 ; <indirect ref>
  0x020B95 $8B85: -D0-I-  .byte $FA ; <indirect ref>
  0x020B96 $8B86: -D0-I-  .byte $FE ; <indirect ref>
  0x020B97 $8B87: -D0-I-  .byte $9D ; <indirect ref>
  0x020B98 $8B88: -D0-I-  .byte $FA ; <indirect ref>
  0x020B99 $8B89: -D0-I-  .byte $DD ; <indirect ref>
  0x020B9A $8B8A: -D0-I-  .byte $A2 ; <indirect ref>
  0x020B9B $8B8B: -D0-I-  .byte $F2 ; <indirect ref>
  0x020B9C $8B8C: -D0-I-  .byte $5B ; <indirect ref>
  0x020B9D $8B8D: -D0-I-  .byte $A3 ; <indirect ref>
  0x020B9E $8B8E: -D0-I-  .byte $F3 ; <indirect ref>
  0x020B9F $8B8F: -D0-I-  .byte $82 ; <indirect ref>
  0x020BA0 $8B90: -D0-I-  .byte $08 ; <indirect ref>
  0x020BA1 $8B91: -D0-I-  .byte $15 ; <indirect ref>
  0x020BA2 $8B92: -D0-I-  .byte $0D ; <indirect ref>
  0x020BA3 $8B93: -D0-I-  .byte $F3 ; <indirect ref>
  0x020BA4 $8B94: -D0-I-  .byte $82 ; <indirect ref>
  0x020BA5 $8B95: -D0-I-  .byte $18 ; <indirect ref>
  0x020BA6 $8B96: -D0-I-  .byte $25 ; <indirect ref>
  0x020BA7 $8B97: -D0-I-  .byte $1D ; <indirect ref>
  0x020BA8 $8B98: -D0-I-  .byte $F3 ; <indirect ref>
  0x020BA9 $8B99: -D0-I-  .byte $83 ; <indirect ref>
  0x020BAA $8B9A: -D0-I-  .byte $28 ; <indirect ref>
  0x020BAB $8B9B: -D0-I-  .byte $37 ; <indirect ref>
  0x020BAC $8B9C: ------  .byte $35
  0x020BAD $8B9D: ------  .byte $34
  0x020BAE $8B9E: ------  .byte $33
  0x020BAF $8B9F: -D0-I-  .byte $F3 ; <indirect ref>
  0x020BB0 $8BA0: -D0-I-  .byte $83 ; <indirect ref>
  0x020BB1 $8BA1: -D0-I-  .byte $21 ; <indirect ref>
  0x020BB2 $8BA2: -D0-I-  .byte $30 ; <indirect ref>
  0x020BB3 $8BA3: ------  .byte $2E
  0x020BB4 $8BA4: ------  .byte $2D
  0x020BB5 $8BA5: ------  .byte $2C
  0x020BB6 $8BA6: -D0-I-  .byte $F3 ; <indirect ref>
  0x020BB7 $8BA7: -D0-I-  .byte $83 ; <indirect ref>
  0x020BB8 $8BA8: -D0-I-  .byte $3C ; <indirect ref>
  0x020BB9 $8BA9: -D0-I-  .byte $4D ; <indirect ref>
  0x020BBA $8BAA: -D0-I-  .byte $61 ; <indirect ref>
  0x020BBB $8BAB: -D0-I-  .byte $77 ; <indirect ref>
  0x020BBC $8BAC: -D0-I-  .byte $8D ; <indirect ref>
  0x020BBD $8BAD: -D0-I-  .byte $F3 ; <indirect ref>
  0x020BBE $8BAE: -D0-I-  .byte $83 ; <indirect ref>
  0x020BBF $8BAF: -D0-I-  .byte $13 ; <indirect ref>
  0x020BC0 $8BB0: -D0-I-  .byte $22 ; <indirect ref>
  0x020BC1 $8BB1: ------  .byte $20
  0x020BC2 $8BB2: ------  .byte $1F
  0x020BC3 $8BB3: ------  .byte $1E
  0x020BC4 $8BB4: -D0-I-  .byte $F3 ; <indirect ref>
  0x020BC5 $8BB5: -D0-I-  .byte $83 ; <indirect ref>
  0x020BC6 $8BB6: -D0-I-  .byte $0C ; <indirect ref>
  0x020BC7 $8BB7: -D0-I-  .byte $1B ; <indirect ref>
  0x020BC8 $8BB8: ------  .byte $19
  0x020BC9 $8BB9: ------  .byte $18
  0x020BCA $8BBA: ------  .byte $17
  0x020BCB $8BBB: -D0-I-  .byte $F3 ; <indirect ref>
  0x020BCC $8BBC: -D0-I-  .byte $83 ; <indirect ref>
  0x020BCD $8BBD: -D0-I-  .byte $27 ; <indirect ref>
  0x020BCE $8BBE: -D0-I-  .byte $38 ; <indirect ref>
  0x020BCF $8BBF: -D0-I-  .byte $4C ; <indirect ref>
  0x020BD0 $8BC0: ------  .byte $62
  0x020BD1 $8BC1: -D0-I-  .byte $78 ; <indirect ref>
  0x020BD2 $8BC2: -D0-I-  .byte $FA ; <indirect ref>
  0x020BD3 $8BC3: -D0-I-  .byte $8B ; <indirect ref>
  0x020BD4 $8BC4: -D0-I-  .byte $9C ; <indirect ref>
  0x020BD5 $8BC5: -D0-I-  .byte $FA ; <indirect ref>
  0x020BD6 $8BC6: -D0-I-  .byte $FE ; <indirect ref>
  0x020BD7 $8BC7: -D0-I-  .byte $9D ; <indirect ref>
  0x020BD8 $8BC8: -D0-I-  .byte $FA ; <indirect ref>
  0x020BD9 $8BC9: -D0-I-  .byte $DD ; <indirect ref>
  0x020BDA $8BCA: -D0-I-  .byte $A2 ; <indirect ref>
  0x020BDB $8BCB: -D0-I-  .byte $FA ; <indirect ref>
  0x020BDC $8BCC: -D0-I-  .byte $AA ; <indirect ref>
  0x020BDD $8BCD: -D0-I-  .byte $9E ; <indirect ref>
  0x020BDE $8BCE: -D0-I-  .byte $FA ; <indirect ref>
  0x020BDF $8BCF: -D0-I-  .byte $62 ; <indirect ref>
  0x020BE0 $8BD0: -D0-I-  .byte $9F ; <indirect ref>
  0x020BE1 $8BD1: -D0-I-  .byte $F0 ; <indirect ref>
  0x020BE2 $8BD2: -D0-I-  .byte $FA ; <indirect ref>
  0x020BE3 $8BD3: -D0-I-  .byte $8B ; <indirect ref>
  0x020BE4 $8BD4: -D0-I-  .byte $9C ; <indirect ref>
  0x020BE5 $8BD5: -D0-I-  .byte $FA ; <indirect ref>
  0x020BE6 $8BD6: -D0-I-  .byte $FE ; <indirect ref>
  0x020BE7 $8BD7: -D0-I-  .byte $9D ; <indirect ref>
  0x020BE8 $8BD8: -D0-I-  .byte $FA ; <indirect ref>
  0x020BE9 $8BD9: -D0-I-  .byte $DD ; <indirect ref>
  0x020BEA $8BDA: -D0-I-  .byte $A2 ; <indirect ref>
  0x020BEB $8BDB: -D0-I-  .byte $FA ; <indirect ref>
  0x020BEC $8BDC: -D0-I-  .byte $AA ; <indirect ref>
  0x020BED $8BDD: -D0-I-  .byte $9E ; <indirect ref>
  0x020BEE $8BDE: -D0-I-  .byte $FA ; <indirect ref>
  0x020BEF $8BDF: -D0-I-  .byte $5C ; <indirect ref>
  0x020BF0 $8BE0: -D0-I-  .byte $9F ; <indirect ref>
  0x020BF1 $8BE1: -D0-I-  .byte $F2 ; <indirect ref>
  0x020BF2 $8BE2: -D0-I-  .byte $47 ; <indirect ref>
  0x020BF3 $8BE3: -D0-I-  .byte $A2 ; <indirect ref>
  0x020BF4 $8BE4: -D0-I-  .byte $FA ; <indirect ref>
  0x020BF5 $8BE5: -D0-I-  .byte $36 ; <indirect ref>
  0x020BF6 $8BE6: -D0-I-  .byte $A9 ; <indirect ref>
  0x020BF7 $8BE7: -D0-I-  .byte $FA ; <indirect ref>
  0x020BF8 $8BE8: -D0-I-  .byte $CF ; <indirect ref>
  0x020BF9 $8BE9: -D0-I-  .byte $A3 ; <indirect ref>
  0x020BFA $8BEA: -D0-I-  .byte $FA ; <indirect ref>
  0x020BFB $8BEB: -D0-I-  .byte $FE ; <indirect ref>
  0x020BFC $8BEC: -D0-I-  .byte $9D ; <indirect ref>
  0x020BFD $8BED: -D0-I-  .byte $FA ; <indirect ref>
  0x020BFE $8BEE: -D0-I-  .byte $DD ; <indirect ref>
  0x020BFF $8BEF: -D0-I-  .byte $A2 ; <indirect ref>
  0x020C00 $8BF0: -D0-I-  .byte $FA ; <indirect ref>
  0x020C01 $8BF1: -D0-I-  .byte $AA ; <indirect ref>
  0x020C02 $8BF2: -D0-I-  .byte $9E ; <indirect ref>
  0x020C03 $8BF3: -D0-I-  .byte $F2 ; <indirect ref>
  0x020C04 $8BF4: -D0-I-  .byte $62 ; <indirect ref>
  0x020C05 $8BF5: -D0-I-  .byte $9F ; <indirect ref>
  0x020C06 $8BF6: -D0-I-  .byte $FA ; <indirect ref>
  0x020C07 $8BF7: -D0-I-  .byte $36 ; <indirect ref>
  0x020C08 $8BF8: -D0-I-  .byte $A9 ; <indirect ref>
  0x020C09 $8BF9: -D0-I-  .byte $FA ; <indirect ref>
  0x020C0A $8BFA: -D0-I-  .byte $CF ; <indirect ref>
  0x020C0B $8BFB: -D0-I-  .byte $A3 ; <indirect ref>
  0x020C0C $8BFC: -D0-I-  .byte $FA ; <indirect ref>
  0x020C0D $8BFD: -D0-I-  .byte $FE ; <indirect ref>
  0x020C0E $8BFE: -D0-I-  .byte $9D ; <indirect ref>
  0x020C0F $8BFF: -D0-I-  .byte $FA ; <indirect ref>
  0x020C10 $8C00: -D0-I-  .byte $DD ; <indirect ref>
  0x020C11 $8C01: -D0-I-  .byte $A2 ; <indirect ref>
  0x020C12 $8C02: -D0-I-  .byte $FA ; <indirect ref>
  0x020C13 $8C03: -D0-I-  .byte $AA ; <indirect ref>
  0x020C14 $8C04: -D0-I-  .byte $9E ; <indirect ref>
  0x020C15 $8C05: -D0-I-  .byte $FA ; <indirect ref>
  0x020C16 $8C06: -D0-I-  .byte $5C ; <indirect ref>
  0x020C17 $8C07: -D0-I-  .byte $9F ; <indirect ref>
  0x020C18 $8C08: -D0-I-  .byte $F2 ; <indirect ref>
  0x020C19 $8C09: -D0-I-  .byte $47 ; <indirect ref>
  0x020C1A $8C0A: -D0-I-  .byte $A2 ; <indirect ref>
  0x020C1B $8C0B: -D0-I-  .byte $FA ; <indirect ref>
  0x020C1C $8C0C: -D0-I-  .byte $36 ; <indirect ref>
  0x020C1D $8C0D: -D0-I-  .byte $A9 ; <indirect ref>
  0x020C1E $8C0E: -D0-I-  .byte $FA ; <indirect ref>
  0x020C1F $8C0F: -D0-I-  .byte $CF ; <indirect ref>
  0x020C20 $8C10: -D0-I-  .byte $A3 ; <indirect ref>
  0x020C21 $8C11: -D0-I-  .byte $FA ; <indirect ref>
  0x020C22 $8C12: -D0-I-  .byte $FE ; <indirect ref>
  0x020C23 $8C13: -D0-I-  .byte $9D ; <indirect ref>
  0x020C24 $8C14: -D0-I-  .byte $FA ; <indirect ref>
  0x020C25 $8C15: -D0-I-  .byte $DD ; <indirect ref>
  0x020C26 $8C16: -D0-I-  .byte $A2 ; <indirect ref>
  0x020C27 $8C17: -D0-I-  .byte $F6 ; <indirect ref>
  0x020C28 $8C18: -D0-I-  .byte $FA ; <indirect ref>
  0x020C29 $8C19: -D0-I-  .byte $64 ; <indirect ref>
  0x020C2A $8C1A: -D0-I-  .byte $9E ; <indirect ref>
  0x020C2B $8C1B: -D0-I-  .byte $F6 ; <indirect ref>
  0x020C2C $8C1C: -D0-I-  .byte $FA ; <indirect ref>
  0x020C2D $8C1D: -D0-I-  .byte $6E ; <indirect ref>
  0x020C2E $8C1E: -D0-I-  .byte $9F ; <indirect ref>
  0x020C2F $8C1F: -D0-I-  .byte $F2 ; <indirect ref>
  0x020C30 $8C20: -D0-I-  .byte $71 ; <indirect ref>
  0x020C31 $8C21: -D0-I-  .byte $A3 ; <indirect ref>
  0x020C32 $8C22: -D0-I-  .byte $FA ; <indirect ref>
  0x020C33 $8C23: -D0-I-  .byte $36 ; <indirect ref>
  0x020C34 $8C24: -D0-I-  .byte $A9 ; <indirect ref>
  0x020C35 $8C25: -D0-I-  .byte $FA ; <indirect ref>
  0x020C36 $8C26: -D0-I-  .byte $CF ; <indirect ref>
  0x020C37 $8C27: -D0-I-  .byte $A3 ; <indirect ref>
  0x020C38 $8C28: -D0-I-  .byte $FA ; <indirect ref>
  0x020C39 $8C29: -D0-I-  .byte $FE ; <indirect ref>
  0x020C3A $8C2A: -D0-I-  .byte $9D ; <indirect ref>
  0x020C3B $8C2B: -D0-I-  .byte $FA ; <indirect ref>
  0x020C3C $8C2C: -D0-I-  .byte $DD ; <indirect ref>
  0x020C3D $8C2D: -D0-I-  .byte $A2 ; <indirect ref>
  0x020C3E $8C2E: -D0-I-  .byte $F6 ; <indirect ref>
  0x020C3F $8C2F: -D0-I-  .byte $FA ; <indirect ref>
  0x020C40 $8C30: -D0-I-  .byte $64 ; <indirect ref>
  0x020C41 $8C31: -D0-I-  .byte $9E ; <indirect ref>
  0x020C42 $8C32: -D0-I-  .byte $F6 ; <indirect ref>
  0x020C43 $8C33: -D0-I-  .byte $FA ; <indirect ref>
  0x020C44 $8C34: -D0-I-  .byte $74 ; <indirect ref>
  0x020C45 $8C35: -D0-I-  .byte $9F ; <indirect ref>
  0x020C46 $8C36: -D0-I-  .byte $F2 ; <indirect ref>
  0x020C47 $8C37: -D0-I-  .byte $6F ; <indirect ref>
  0x020C48 $8C38: -D0-I-  .byte $A0 ; <indirect ref>
  0x020C49 $8C39: -D0-I-  .byte $FA ; <indirect ref>
  0x020C4A $8C3A: -D0-I-  .byte $36 ; <indirect ref>
  0x020C4B $8C3B: -D0-I-  .byte $A9 ; <indirect ref>
  0x020C4C $8C3C: -D0-I-  .byte $FA ; <indirect ref>
  0x020C4D $8C3D: -D0-I-  .byte $CF ; <indirect ref>
  0x020C4E $8C3E: -D0-I-  .byte $A3 ; <indirect ref>
  0x020C4F $8C3F: -D0-I-  .byte $FA ; <indirect ref>
  0x020C50 $8C40: -D0-I-  .byte $FE ; <indirect ref>
  0x020C51 $8C41: -D0-I-  .byte $9D ; <indirect ref>
  0x020C52 $8C42: -D0-I-  .byte $FA ; <indirect ref>
  0x020C53 $8C43: -D0-I-  .byte $DD ; <indirect ref>
  0x020C54 $8C44: -D0-I-  .byte $A2 ; <indirect ref>
  0x020C55 $8C45: -D0-I-  .byte $FA ; <indirect ref>
  0x020C56 $8C46: -D0-I-  .byte $6E ; <indirect ref>
  0x020C57 $8C47: -D0-I-  .byte $9F ; <indirect ref>
  0x020C58 $8C48: -D0-I-  .byte $F2 ; <indirect ref>
  0x020C59 $8C49: -D0-I-  .byte $5B ; <indirect ref>
  0x020C5A $8C4A: -D0-I-  .byte $A3 ; <indirect ref>
  0x020C5B $8C4B: -D0-I-  .byte $FD ; <indirect ref>
  0x020C5C $8C4C: -D0-I-  .byte $03 ; <indirect ref>
  0x020C5D $8C4D: -D0-I-  .byte $F3 ; <indirect ref>
  0x020C5E $8C4E: -D0-I-  .byte $00 ; <indirect ref>
  0x020C5F $8C4F: -D0-I-  .byte $53 ; <indirect ref>
  0x020C60 $8C50: -D0-I-  .byte $8C ; <indirect ref>
  0x020C61 $8C51: -D0-I-  .byte $F3 ; <indirect ref>
  0x020C62 $8C52: -D0-I-  .byte $8D ; <indirect ref>
  0x020C63 $8C53: -D0-I-  .byte $F3 ; <indirect ref>
  0x020C64 $8C54: -D0-I-  .byte $C6 ; <indirect ref>
  0x020C65 $8C55: -D0-I-  .byte $02 ; <indirect ref>
  0x020C66 $8C56: -D0-I-  .byte $B7 ; <indirect ref>
  0x020C67 $8C57: -D0-I-  .byte $F3 ; <indirect ref>
  0x020C68 $8C58: -D0-I-  .byte $82 ; <indirect ref>
  0x020C69 $8C59: -D0-I-  .byte $03 ; <indirect ref>
  0x020C6A $8C5A: -D0-I-  .byte $43 ; <indirect ref>
  0x020C6B $8C5B: -D0-I-  .byte $7A ; <indirect ref>
  0x020C6C $8C5C: -D0-I-  .byte $F3 ; <indirect ref>
  0x020C6D $8C5D: -D0-I-  .byte $83 ; <indirect ref>
  0x020C6E $8C5E: -D0-I-  .byte $11 ; <indirect ref>
  0x020C6F $8C5F: -D0-I-  .byte $1A ; <indirect ref>
  0x020C70 $8C60: -D0-I-  .byte $03 ; <indirect ref>
  0x020C71 $8C61: -D0-I-  .byte $08 ; <indirect ref>
  0x020C72 $8C62: ------  .byte $16
  0x020C73 $8C63: -D0-I-  .byte $F3 ; <indirect ref>
  0x020C74 $8C64: -D0-I-  .byte $9B ; <indirect ref>
  0x020C75 $8C65: -D0-I-  .byte $23 ; <indirect ref>
  0x020C76 $8C66: ------  .byte $31
  0x020C77 $8C67: -D0-I-  .byte $21 ; <indirect ref>
  0x020C78 $8C68: -D0-I-  .byte $20 ; <indirect ref>
  0x020C79 $8C69: -D0-I-  .byte $F3 ; <indirect ref>
  0x020C7A $8C6A: -D0-I-  .byte $9B ; <indirect ref>
  0x020C7B $8C6B: ------  .byte $CD
  0x020C7C $8C6C: -D0-I-  .byte $2B ; <indirect ref>
  0x020C7D $8C6D: ------  .byte $CB
  0x020C7E $8C6E: ------  .byte $CA
  0x020C7F $8C6F: -D0-I-  .byte $FA ; <indirect ref>
  0x020C80 $8C70: -D0-I-  .byte $79 ; <indirect ref>
  0x020C81 $8C71: -D0-I-  .byte $9C ; <indirect ref>
  0x020C82 $8C72: -D0-I-  .byte $FA ; <indirect ref>
  0x020C83 $8C73: -D0-I-  .byte $47 ; <indirect ref>
  0x020C84 $8C74: -D0-I-  .byte $B3 ; <indirect ref>
  0x020C85 $8C75: -D0-I-  .byte $FA ; <indirect ref>
  0x020C86 $8C76: -D0-I-  .byte $76 ; <indirect ref>
  0x020C87 $8C77: -D0-I-  .byte $A1 ; <indirect ref>
  0x020C88 $8C78: -D0-I-  .byte $F0 ; <indirect ref>
  0x020C89 $8C79: -D0-I-  .byte $FA ; <indirect ref>
  0x020C8A $8C7A: -D0-I-  .byte $79 ; <indirect ref>
  0x020C8B $8C7B: -D0-I-  .byte $9C ; <indirect ref>
  0x020C8C $8C7C: -D0-I-  .byte $FA ; <indirect ref>
  0x020C8D $8C7D: -D0-I-  .byte $47 ; <indirect ref>
  0x020C8E $8C7E: -D0-I-  .byte $B3 ; <indirect ref>
  0x020C8F $8C7F: -D0-I-  .byte $FA ; <indirect ref>
  0x020C90 $8C80: -D0-I-  .byte $42 ; <indirect ref>
  0x020C91 $8C81: -D0-I-  .byte $A0 ; <indirect ref>
  0x020C92 $8C82: -D0-I-  .byte $FA ; <indirect ref>
  0x020C93 $8C83: -D0-I-  .byte $25 ; <indirect ref>
  0x020C94 $8C84: -D0-I-  .byte $A0 ; <indirect ref>
  0x020C95 $8C85: -D0-I-  .byte $F2 ; <indirect ref>
  0x020C96 $8C86: -D0-I-  .byte $17 ; <indirect ref>
  0x020C97 $8C87: -D0-I-  .byte $A0 ; <indirect ref>
  0x020C98 $8C88: -D0-I-  .byte $FA ; <indirect ref>
  0x020C99 $8C89: -D0-I-  .byte $79 ; <indirect ref>
  0x020C9A $8C8A: -D0-I-  .byte $9C ; <indirect ref>
  0x020C9B $8C8B: -D0-I-  .byte $FA ; <indirect ref>
  0x020C9C $8C8C: -D0-I-  .byte $47 ; <indirect ref>
  0x020C9D $8C8D: -D0-I-  .byte $B3 ; <indirect ref>
  0x020C9E $8C8E: -D0-I-  .byte $FA ; <indirect ref>
  0x020C9F $8C8F: -D0-I-  .byte $47 ; <indirect ref>
  0x020CA0 $8C90: -D0-I-  .byte $A0 ; <indirect ref>
  0x020CA1 $8C91: -D0-I-  .byte $FA ; <indirect ref>
  0x020CA2 $8C92: -D0-I-  .byte $23 ; <indirect ref>
  0x020CA3 $8C93: -D0-I-  .byte $A0 ; <indirect ref>
  0x020CA4 $8C94: -D0-I-  .byte $F2 ; <indirect ref>
  0x020CA5 $8C95: -D0-I-  .byte $71 ; <indirect ref>
  0x020CA6 $8C96: -D0-I-  .byte $A3 ; <indirect ref>
  0x020CA7 $8C97: -D0-I-  .byte $FA ; <indirect ref>
  0x020CA8 $8C98: -D0-I-  .byte $47 ; <indirect ref>
  0x020CA9 $8C99: -D0-I-  .byte $B3 ; <indirect ref>
  0x020CAA $8C9A: -D0-I-  .byte $F2 ; <indirect ref>
  0x020CAB $8C9B: -D0-I-  .byte $67 ; <indirect ref>
  0x020CAC $8C9C: -D0-I-  .byte $8F ; <indirect ref>
  0x020CAD $8C9D: -D0-I-  .byte $F3 ; <indirect ref>
  0x020CAE $8C9E: -D0-I-  .byte $83 ; <indirect ref>
  0x020CAF $8C9F: -D0-I-  .byte $05 ; <indirect ref>
  0x020CB0 $8CA0: -D0-I-  .byte $0E ; <indirect ref>
  0x020CB1 $8CA1: -D0-I-  .byte $1C ; <indirect ref>
  0x020CB2 $8CA2: -D0-I-  .byte $2A ; <indirect ref>
  0x020CB3 $8CA3: ------  .byte $0A
  0x020CB4 $8CA4: -D0-I-  .byte $FA ; <indirect ref>
  0x020CB5 $8CA5: -D0-I-  .byte $79 ; <indirect ref>
  0x020CB6 $8CA6: -D0-I-  .byte $9C ; <indirect ref>
  0x020CB7 $8CA7: -D0-I-  .byte $FA ; <indirect ref>
  0x020CB8 $8CA8: -D0-I-  .byte $DC ; <indirect ref>
  0x020CB9 $8CA9: -D0-I-  .byte $B2 ; <indirect ref>
  0x020CBA $8CAA: -D0-I-  .byte $FA ; <indirect ref>
  0x020CBB $8CAB: -D0-I-  .byte $76 ; <indirect ref>
  0x020CBC $8CAC: -D0-I-  .byte $A1 ; <indirect ref>
  0x020CBD $8CAD: -D0-I-  .byte $F0 ; <indirect ref>
  0x020CBE $8CAE: -D0-I-  .byte $FA ; <indirect ref>
  0x020CBF $8CAF: -D0-I-  .byte $79 ; <indirect ref>
  0x020CC0 $8CB0: -D0-I-  .byte $9C ; <indirect ref>
  0x020CC1 $8CB1: -D0-I-  .byte $FA ; <indirect ref>
  0x020CC2 $8CB2: -D0-I-  .byte $DC ; <indirect ref>
  0x020CC3 $8CB3: -D0-I-  .byte $B2 ; <indirect ref>
  0x020CC4 $8CB4: -D0-I-  .byte $FA ; <indirect ref>
  0x020CC5 $8CB5: -D0-I-  .byte $42 ; <indirect ref>
  0x020CC6 $8CB6: -D0-I-  .byte $A0 ; <indirect ref>
  0x020CC7 $8CB7: -D0-I-  .byte $FA ; <indirect ref>
  0x020CC8 $8CB8: -D0-I-  .byte $25 ; <indirect ref>
  0x020CC9 $8CB9: -D0-I-  .byte $A0 ; <indirect ref>
  0x020CCA $8CBA: -D0-I-  .byte $F2 ; <indirect ref>
  0x020CCB $8CBB: -D0-I-  .byte $17 ; <indirect ref>
  0x020CCC $8CBC: -D0-I-  .byte $A0 ; <indirect ref>
  0x020CCD $8CBD: -D0-I-  .byte $FA ; <indirect ref>
  0x020CCE $8CBE: -D0-I-  .byte $79 ; <indirect ref>
  0x020CCF $8CBF: -D0-I-  .byte $9C ; <indirect ref>
  0x020CD0 $8CC0: -D0-I-  .byte $FA ; <indirect ref>
  0x020CD1 $8CC1: -D0-I-  .byte $DC ; <indirect ref>
  0x020CD2 $8CC2: -D0-I-  .byte $B2 ; <indirect ref>
  0x020CD3 $8CC3: -D0-I-  .byte $FA ; <indirect ref>
  0x020CD4 $8CC4: -D0-I-  .byte $47 ; <indirect ref>
  0x020CD5 $8CC5: -D0-I-  .byte $A0 ; <indirect ref>
  0x020CD6 $8CC6: -D0-I-  .byte $FA ; <indirect ref>
  0x020CD7 $8CC7: -D0-I-  .byte $23 ; <indirect ref>
  0x020CD8 $8CC8: -D0-I-  .byte $A0 ; <indirect ref>
  0x020CD9 $8CC9: -D0-I-  .byte $F2 ; <indirect ref>
  0x020CDA $8CCA: -D0-I-  .byte $71 ; <indirect ref>
  0x020CDB $8CCB: -D0-I-  .byte $A3 ; <indirect ref>
  0x020CDC $8CCC: -D0-I-  .byte $FA ; <indirect ref>
  0x020CDD $8CCD: -D0-I-  .byte $79 ; <indirect ref>
  0x020CDE $8CCE: -D0-I-  .byte $9C ; <indirect ref>
  0x020CDF $8CCF: -D0-I-  .byte $FA ; <indirect ref>
  0x020CE0 $8CD0: -D0-I-  .byte $DC ; <indirect ref>
  0x020CE1 $8CD1: -D0-I-  .byte $B2 ; <indirect ref>
  0x020CE2 $8CD2: -D0-I-  .byte $F2 ; <indirect ref>
  0x020CE3 $8CD3: -D0-I-  .byte $85 ; <indirect ref>
  0x020CE4 $8CD4: -D0-I-  .byte $A1 ; <indirect ref>
  0x020CE5 $8CD5: -D0-I-  .byte $F3 ; <indirect ref>
  0x020CE6 $8CD6: -D0-I-  .byte $83 ; <indirect ref>
  0x020CE7 $8CD7: -D0-I-  .byte $05 ; <indirect ref>
  0x020CE8 $8CD8: -D0-I-  .byte $0E ; <indirect ref>
  0x020CE9 $8CD9: -D0-I-  .byte $1C ; <indirect ref>
  0x020CEA $8CDA: -D0-I-  .byte $2A ; <indirect ref>
  0x020CEB $8CDB: ------  .byte $0A
  0x020CEC $8CDC: -D0-I-  .byte $FA ; <indirect ref>
  0x020CED $8CDD: -D0-I-  .byte $79 ; <indirect ref>
  0x020CEE $8CDE: -D0-I-  .byte $9C ; <indirect ref>
  0x020CEF $8CDF: -D0-I-  .byte $FA ; <indirect ref>
  0x020CF0 $8CE0: -D0-I-  .byte $F8 ; <indirect ref>
  0x020CF1 $8CE1: -D0-I-  .byte $9D ; <indirect ref>
  0x020CF2 $8CE2: -D0-I-  .byte $FA ; <indirect ref>
  0x020CF3 $8CE3: -D0-I-  .byte $E5 ; <indirect ref>
  0x020CF4 $8CE4: -D0-I-  .byte $9F ; <indirect ref>
  0x020CF5 $8CE5: -D0-I-  .byte $F0 ; <indirect ref>
  0x020CF6 $8CE6: -D0-I-  .byte $FA ; <indirect ref>
  0x020CF7 $8CE7: -D0-I-  .byte $79 ; <indirect ref>
  0x020CF8 $8CE8: -D0-I-  .byte $9C ; <indirect ref>
  0x020CF9 $8CE9: -D0-I-  .byte $FA ; <indirect ref>
  0x020CFA $8CEA: -D0-I-  .byte $F8 ; <indirect ref>
  0x020CFB $8CEB: -D0-I-  .byte $9D ; <indirect ref>
  0x020CFC $8CEC: -D0-I-  .byte $FA ; <indirect ref>
  0x020CFD $8CED: -D0-I-  .byte $0B ; <indirect ref>
  0x020CFE $8CEE: -D0-I-  .byte $A0 ; <indirect ref>
  0x020CFF $8CEF: -D0-I-  .byte $FA ; <indirect ref>
  0x020D00 $8CF0: -D0-I-  .byte $F3 ; <indirect ref>
  0x020D01 $8CF1: -D0-I-  .byte $9F ; <indirect ref>
  0x020D02 $8CF2: -D0-I-  .byte $F2 ; <indirect ref>
  0x020D03 $8CF3: -D0-I-  .byte $E0 ; <indirect ref>
  0x020D04 $8CF4: -D0-I-  .byte $9F ; <indirect ref>
  0x020D05 $8CF5: -D0-I-  .byte $FA ; <indirect ref>
  0x020D06 $8CF6: -D0-I-  .byte $79 ; <indirect ref>
  0x020D07 $8CF7: -D0-I-  .byte $9C ; <indirect ref>
  0x020D08 $8CF8: -D0-I-  .byte $FA ; <indirect ref>
  0x020D09 $8CF9: -D0-I-  .byte $F8 ; <indirect ref>
  0x020D0A $8CFA: -D0-I-  .byte $9D ; <indirect ref>
  0x020D0B $8CFB: -D0-I-  .byte $FA ; <indirect ref>
  0x020D0C $8CFC: -D0-I-  .byte $10 ; <indirect ref>
  0x020D0D $8CFD: -D0-I-  .byte $A0 ; <indirect ref>
  0x020D0E $8CFE: -D0-I-  .byte $FA ; <indirect ref>
  0x020D0F $8CFF: -D0-I-  .byte $F1 ; <indirect ref>
  0x020D10 $8D00: -D0-I-  .byte $9F ; <indirect ref>
  0x020D11 $8D01: -D0-I-  .byte $F2 ; <indirect ref>
  0x020D12 $8D02: -D0-I-  .byte $71 ; <indirect ref>
  0x020D13 $8D03: -D0-I-  .byte $A3 ; <indirect ref>
  0x020D14 $8D04: -D0-I-  .byte $FA ; <indirect ref>
  0x020D15 $8D05: -D0-I-  .byte $79 ; <indirect ref>
  0x020D16 $8D06: -D0-I-  .byte $9C ; <indirect ref>
  0x020D17 $8D07: -D0-I-  .byte $FA ; <indirect ref>
  0x020D18 $8D08: -D0-I-  .byte $F8 ; <indirect ref>
  0x020D19 $8D09: -D0-I-  .byte $9D ; <indirect ref>
  0x020D1A $8D0A: -D0-I-  .byte $F2 ; <indirect ref>
  0x020D1B $8D0B: -D0-I-  .byte $6E ; <indirect ref>
  0x020D1C $8D0C: -D0-I-  .byte $A1 ; <indirect ref>
  0x020D1D $8D0D: -D0-I-  .byte $F3 ; <indirect ref>
  0x020D1E $8D0E: -D0-I-  .byte $82 ; <indirect ref>
  0x020D1F $8D0F: -D0-I-  .byte $03 ; <indirect ref>
  0x020D20 $8D10: -D0-I-  .byte $61 ; <indirect ref>
  0x020D21 $8D11: -D0-I-  .byte $9B ; <indirect ref>
  0x020D22 $8D12: -D0-I-  .byte $F3 ; <indirect ref>
  0x020D23 $8D13: -D0-I-  .byte $83 ; <indirect ref>
  0x020D24 $8D14: -D0-I-  .byte $14 ; <indirect ref>
  0x020D25 $8D15: ------  .byte $2C
  0x020D26 $8D16: -D0-I-  .byte $03 ; <indirect ref>
  0x020D27 $8D17: ------  .byte $08
  0x020D28 $8D18: ------  .byte $1F
  0x020D29 $8D19: -D0-I-  .byte $F3 ; <indirect ref>
  0x020D2A $8D1A: -D0-I-  .byte $9B ; <indirect ref>
  0x020D2B $8D1B: ------  .byte $38
  0x020D2C $8D1C: ------  .byte $09
  0x020D2D $8D1D: ------  .byte $36
  0x020D2E $8D1E: -D0-I-  .byte $35 ; <indirect ref>
  0x020D2F $8D1F: ------  .byte $F3
  0x020D30 $8D20: ------  .byte $9B
  0x020D31 $8D21: ------  .byte $44
  0x020D32 $8D22: ------  .byte $03
  0x020D33 $8D23: ------  .byte $42
  0x020D34 $8D24: ------  .byte $41
  0x020D35 $8D25: ------  .byte $F2
  0x020D36 $8D26: ------  .byte $97
  0x020D37 $8D27: ------  .byte $8C
  0x020D38 $8D28: -D0-I-  .byte $FA ; <indirect ref>
  0x020D39 $8D29: -D0-I-  .byte $79 ; <indirect ref>
  0x020D3A $8D2A: -D0-I-  .byte $9C ; <indirect ref>
  0x020D3B $8D2B: -D0-I-  .byte $FA ; <indirect ref>
  0x020D3C $8D2C: -D0-I-  .byte $47 ; <indirect ref>
  0x020D3D $8D2D: -D0-I-  .byte $B3 ; <indirect ref>
  0x020D3E $8D2E: -D0-I-  .byte $FA ; <indirect ref>
  0x020D3F $8D2F: -D0-I-  .byte $47 ; <indirect ref>
  0x020D40 $8D30: -D0-I-  .byte $A0 ; <indirect ref>
  0x020D41 $8D31: -D0-I-  .byte $FA ; <indirect ref>
  0x020D42 $8D32: -D0-I-  .byte $DD ; <indirect ref>
  0x020D43 $8D33: -D0-I-  .byte $A2 ; <indirect ref>
  0x020D44 $8D34: -D0-I-  .byte $FA ; <indirect ref>
  0x020D45 $8D35: -D0-I-  .byte $62 ; <indirect ref>
  0x020D46 $8D36: -D0-I-  .byte $9F ; <indirect ref>
  0x020D47 $8D37: -D0-I-  .byte $F0 ; <indirect ref>
  0x020D48 $8D38: -D0-I-  .byte $FA ; <indirect ref>
  0x020D49 $8D39: -D0-I-  .byte $79 ; <indirect ref>
  0x020D4A $8D3A: -D0-I-  .byte $9C ; <indirect ref>
  0x020D4B $8D3B: -D0-I-  .byte $FA ; <indirect ref>
  0x020D4C $8D3C: -D0-I-  .byte $47 ; <indirect ref>
  0x020D4D $8D3D: -D0-I-  .byte $B3 ; <indirect ref>
  0x020D4E $8D3E: -D0-I-  .byte $F2 ; <indirect ref>
  0x020D4F $8D3F: -D0-I-  .byte $A9 ; <indirect ref>
  0x020D50 $8D40: -D0-I-  .byte $A1 ; <indirect ref>
  0x020D51 $8D41: ------  .byte $FA
  0x020D52 $8D42: ------  .byte $79
  0x020D53 $8D43: ------  .byte $9C
  0x020D54 $8D44: ------  .byte $FA
  0x020D55 $8D45: ------  .byte $47
  0x020D56 $8D46: ------  .byte $B3
  0x020D57 $8D47: ------  .byte $FA
  0x020D58 $8D48: ------  .byte $47
  0x020D59 $8D49: ------  .byte $A0
  0x020D5A $8D4A: ------  .byte $FA
  0x020D5B $8D4B: ------  .byte $DD
  0x020D5C $8D4C: ------  .byte $A2
  0x020D5D $8D4D: ------  .byte $FA
  0x020D5E $8D4E: ------  .byte $5C
  0x020D5F $8D4F: ------  .byte $9F
  0x020D60 $8D50: ------  .byte $F2
  0x020D61 $8D51: ------  .byte $40
  0x020D62 $8D52: ------  .byte $A2
  0x020D63 $8D53: -D0-I-  .byte $FA ; <indirect ref>
  0x020D64 $8D54: -D0-I-  .byte $79 ; <indirect ref>
  0x020D65 $8D55: -D0-I-  .byte $9C ; <indirect ref>
  0x020D66 $8D56: -D0-I-  .byte $FA ; <indirect ref>
  0x020D67 $8D57: -D0-I-  .byte $47 ; <indirect ref>
  0x020D68 $8D58: -D0-I-  .byte $B3 ; <indirect ref>
  0x020D69 $8D59: -D0-I-  .byte $FA ; <indirect ref>
  0x020D6A $8D5A: -D0-I-  .byte $47 ; <indirect ref>
  0x020D6B $8D5B: -D0-I-  .byte $A0 ; <indirect ref>
  0x020D6C $8D5C: -D0-I-  .byte $FA ; <indirect ref>
  0x020D6D $8D5D: -D0-I-  .byte $DD ; <indirect ref>
  0x020D6E $8D5E: -D0-I-  .byte $A2 ; <indirect ref>
  0x020D6F $8D5F: -D0-I-  .byte $FA ; <indirect ref>
  0x020D70 $8D60: -D0-I-  .byte $5C ; <indirect ref>
  0x020D71 $8D61: -D0-I-  .byte $9F ; <indirect ref>
  0x020D72 $8D62: -D0-I-  .byte $F2 ; <indirect ref>
  0x020D73 $8D63: -D0-I-  .byte $71 ; <indirect ref>
  0x020D74 $8D64: -D0-I-  .byte $A3 ; <indirect ref>
  0x020D75 $8D65: ------  .byte $FA
  0x020D76 $8D66: ------  .byte $79
  0x020D77 $8D67: ------  .byte $9C
  0x020D78 $8D68: ------  .byte $FA
  0x020D79 $8D69: ------  .byte $47
  0x020D7A $8D6A: ------  .byte $B3
  0x020D7B $8D6B: ------  .byte $FA
  0x020D7C $8D6C: ------  .byte $DD
  0x020D7D $8D6D: ------  .byte $A2
  0x020D7E $8D6E: ------  .byte $F2
  0x020D7F $8D6F: ------  .byte $A9
  0x020D80 $8D70: ------  .byte $A1
  0x020D81 $8D71: -D0-I-  .byte $F3 ; <indirect ref>
  0x020D82 $8D72: -D0-I-  .byte $83 ; <indirect ref>
  0x020D83 $8D73: -D0-I-  .byte $05 ; <indirect ref>
  0x020D84 $8D74: ------  .byte $14
  0x020D85 $8D75: ------  .byte $25
  0x020D86 $8D76: ------  .byte $11
  0x020D87 $8D77: ------  .byte $10
  0x020D88 $8D78: -D0-I-  .byte $FA ; <indirect ref>
  0x020D89 $8D79: -D0-I-  .byte $79 ; <indirect ref>
  0x020D8A $8D7A: -D0-I-  .byte $9C ; <indirect ref>
  0x020D8B $8D7B: -D0-I-  .byte $FA ; <indirect ref>
  0x020D8C $8D7C: -D0-I-  .byte $DC ; <indirect ref>
  0x020D8D $8D7D: -D0-I-  .byte $B2 ; <indirect ref>
  0x020D8E $8D7E: -D0-I-  .byte $FA ; <indirect ref>
  0x020D8F $8D7F: -D0-I-  .byte $47 ; <indirect ref>
  0x020D90 $8D80: -D0-I-  .byte $A0 ; <indirect ref>
  0x020D91 $8D81: -D0-I-  .byte $FA ; <indirect ref>
  0x020D92 $8D82: -D0-I-  .byte $DD ; <indirect ref>
  0x020D93 $8D83: -D0-I-  .byte $A2 ; <indirect ref>
  0x020D94 $8D84: -D0-I-  .byte $FA ; <indirect ref>
  0x020D95 $8D85: -D0-I-  .byte $62 ; <indirect ref>
  0x020D96 $8D86: -D0-I-  .byte $9F ; <indirect ref>
  0x020D97 $8D87: -D0-I-  .byte $F0 ; <indirect ref>
  0x020D98 $8D88: ------  .byte $FA
  0x020D99 $8D89: ------  .byte $79
  0x020D9A $8D8A: ------  .byte $9C
  0x020D9B $8D8B: ------  .byte $FA
  0x020D9C $8D8C: ------  .byte $DC
  0x020D9D $8D8D: ------  .byte $B2
  0x020D9E $8D8E: ------  .byte $FA
  0x020D9F $8D8F: ------  .byte $47
  0x020DA0 $8D90: ------  .byte $A0
  0x020DA1 $8D91: ------  .byte $FA
  0x020DA2 $8D92: ------  .byte $DD
  0x020DA3 $8D93: ------  .byte $A2
  0x020DA4 $8D94: ------  .byte $FA
  0x020DA5 $8D95: ------  .byte $5C
  0x020DA6 $8D96: ------  .byte $9F
  0x020DA7 $8D97: ------  .byte $F2
  0x020DA8 $8D98: ------  .byte $40
  0x020DA9 $8D99: ------  .byte $A2
  0x020DAA $8D9A: ------  .byte $FA
  0x020DAB $8D9B: ------  .byte $79
  0x020DAC $8D9C: ------  .byte $9C
  0x020DAD $8D9D: ------  .byte $FA
  0x020DAE $8D9E: ------  .byte $DC
  0x020DAF $8D9F: ------  .byte $B2
  0x020DB0 $8DA0: ------  .byte $FA
  0x020DB1 $8DA1: ------  .byte $47
  0x020DB2 $8DA2: ------  .byte $A0
  0x020DB3 $8DA3: ------  .byte $FA
  0x020DB4 $8DA4: ------  .byte $DD
  0x020DB5 $8DA5: ------  .byte $A2
  0x020DB6 $8DA6: ------  .byte $FA
  0x020DB7 $8DA7: ------  .byte $5C
  0x020DB8 $8DA8: ------  .byte $9F
  0x020DB9 $8DA9: ------  .byte $F2
  0x020DBA $8DAA: ------  .byte $71
  0x020DBB $8DAB: ------  .byte $A3
  0x020DBC $8DAC: -D0-I-  .byte $F3 ; <indirect ref>
  0x020DBD $8DAD: -D0-I-  .byte $83 ; <indirect ref>
  0x020DBE $8DAE: -D0-I-  .byte $05 ; <indirect ref>
  0x020DBF $8DAF: ------  .byte $14
  0x020DC0 $8DB0: ------  .byte $25
  0x020DC1 $8DB1: ------  .byte $36
  0x020DC2 $8DB2: ------  .byte $10
  0x020DC3 $8DB3: -D0-I-  .byte $FA ; <indirect ref>
  0x020DC4 $8DB4: -D0-I-  .byte $79 ; <indirect ref>
  0x020DC5 $8DB5: -D0-I-  .byte $9C ; <indirect ref>
  0x020DC6 $8DB6: -D0-I-  .byte $FA ; <indirect ref>
  0x020DC7 $8DB7: -D0-I-  .byte $F8 ; <indirect ref>
  0x020DC8 $8DB8: -D0-I-  .byte $9D ; <indirect ref>
  0x020DC9 $8DB9: -D0-I-  .byte $FA ; <indirect ref>
  0x020DCA $8DBA: -D0-I-  .byte $10 ; <indirect ref>
  0x020DCB $8DBB: -D0-I-  .byte $A0 ; <indirect ref>
  0x020DCC $8DBC: -D0-I-  .byte $FA ; <indirect ref>
  0x020DCD $8DBD: -D0-I-  .byte $DD ; <indirect ref>
  0x020DCE $8DBE: -D0-I-  .byte $A2 ; <indirect ref>
  0x020DCF $8DBF: -D0-I-  .byte $FA ; <indirect ref>
  0x020DD0 $8DC0: -D0-I-  .byte $62 ; <indirect ref>
  0x020DD1 $8DC1: -D0-I-  .byte $9F ; <indirect ref>
  0x020DD2 $8DC2: -D0-I-  .byte $F0 ; <indirect ref>
  0x020DD3 $8DC3: ------  .byte $FA
  0x020DD4 $8DC4: ------  .byte $79
  0x020DD5 $8DC5: ------  .byte $9C
  0x020DD6 $8DC6: ------  .byte $FA
  0x020DD7 $8DC7: ------  .byte $F8
  0x020DD8 $8DC8: ------  .byte $9D
  0x020DD9 $8DC9: ------  .byte $FA
  0x020DDA $8DCA: ------  .byte $10
  0x020DDB $8DCB: ------  .byte $A0
  0x020DDC $8DCC: ------  .byte $FA
  0x020DDD $8DCD: ------  .byte $DD
  0x020DDE $8DCE: ------  .byte $A2
  0x020DDF $8DCF: ------  .byte $FA
  0x020DE0 $8DD0: ------  .byte $5C
  0x020DE1 $8DD1: ------  .byte $9F
  0x020DE2 $8DD2: ------  .byte $F2
  0x020DE3 $8DD3: ------  .byte $40
  0x020DE4 $8DD4: ------  .byte $A2
  0x020DE5 $8DD5: ------  .byte $FA
  0x020DE6 $8DD6: ------  .byte $79
  0x020DE7 $8DD7: ------  .byte $9C
  0x020DE8 $8DD8: ------  .byte $FA
  0x020DE9 $8DD9: ------  .byte $F8
  0x020DEA $8DDA: ------  .byte $9D
  0x020DEB $8DDB: ------  .byte $FA
  0x020DEC $8DDC: ------  .byte $10
  0x020DED $8DDD: ------  .byte $A0
  0x020DEE $8DDE: ------  .byte $FA
  0x020DEF $8DDF: ------  .byte $DD
  0x020DF0 $8DE0: ------  .byte $A2
  0x020DF1 $8DE1: ------  .byte $FA
  0x020DF2 $8DE2: ------  .byte $5C
  0x020DF3 $8DE3: ------  .byte $9F
  0x020DF4 $8DE4: ------  .byte $F2
  0x020DF5 $8DE5: ------  .byte $71
  0x020DF6 $8DE6: ------  .byte $A3
  0x020DF7 $8DE7: ------  .byte $FA
  0x020DF8 $8DE8: ------  .byte $79
  0x020DF9 $8DE9: ------  .byte $9C
  0x020DFA $8DEA: ------  .byte $FA
  0x020DFB $8DEB: ------  .byte $F8
  0x020DFC $8DEC: ------  .byte $9D
  0x020DFD $8DED: ------  .byte $FA
  0x020DFE $8DEE: ------  .byte $DD
  0x020DFF $8DEF: ------  .byte $A2
  0x020E00 $8DF0: ------  .byte $F2
  0x020E01 $8DF1: ------  .byte $6E
  0x020E02 $8DF2: ------  .byte $A1
  0x020E03 $8DF3: -D0-I-  .byte $F3 ; <indirect ref>
  0x020E04 $8DF4: -D0-I-  .byte $C6 ; <indirect ref>
  0x020E05 $8DF5: -D0-I-  .byte $02 ; <indirect ref>
  0x020E06 $8DF6: -D0-I-  .byte $78 ; <indirect ref>
  0x020E07 $8DF7: -D0-I-  .byte $F3 ; <indirect ref>
  0x020E08 $8DF8: -D0-I-  .byte $82 ; <indirect ref>
  0x020E09 $8DF9: -D0-I-  .byte $03 ; <indirect ref>
  0x020E0A $8DFA: -D0-I-  .byte $28 ; <indirect ref>
  0x020E0B $8DFB: -D0-I-  .byte $4D ; <indirect ref>
  0x020E0C $8DFC: -D0-I-  .byte $F3 ; <indirect ref>
  0x020E0D $8DFD: -D0-I-  .byte $83 ; <indirect ref>
  0x020E0E $8DFE: -D0-I-  .byte $11 ; <indirect ref>
  0x020E0F $8DFF: -D0-I-  .byte $04 ; <indirect ref>
  0x020E10 $8E00: -D0-I-  .byte $10 ; <indirect ref>
  0x020E11 $8E01: ------  .byte $1B
  0x020E12 $8E02: ------  .byte $0D
  0x020E13 $8E03: -D0-I-  .byte $FA ; <indirect ref>
  0x020E14 $8E04: -D0-I-  .byte $47 ; <indirect ref>
  0x020E15 $8E05: -D0-I-  .byte $B3 ; <indirect ref>
  0x020E16 $8E06: -D0-I-  .byte $FA ; <indirect ref>
  0x020E17 $8E07: -D0-I-  .byte $42 ; <indirect ref>
  0x020E18 $8E08: -D0-I-  .byte $A0 ; <indirect ref>
  0x020E19 $8E09: -D0-I-  .byte $FA ; <indirect ref>
  0x020E1A $8E0A: -D0-I-  .byte $25 ; <indirect ref>
  0x020E1B $8E0B: -D0-I-  .byte $A0 ; <indirect ref>
  0x020E1C $8E0C: -D0-I-  .byte $FA ; <indirect ref>
  0x020E1D $8E0D: -D0-I-  .byte $17 ; <indirect ref>
  0x020E1E $8E0E: -D0-I-  .byte $A0 ; <indirect ref>
  0x020E1F $8E0F: -D0-I-  .byte $F0 ; <indirect ref>
  0x020E20 $8E10: -D0-I-  .byte $FA ; <indirect ref>
  0x020E21 $8E11: -D0-I-  .byte $47 ; <indirect ref>
  0x020E22 $8E12: -D0-I-  .byte $B3 ; <indirect ref>
  0x020E23 $8E13: -D0-I-  .byte $FA ; <indirect ref>
  0x020E24 $8E14: -D0-I-  .byte $47 ; <indirect ref>
  0x020E25 $8E15: -D0-I-  .byte $A0 ; <indirect ref>
  0x020E26 $8E16: -D0-I-  .byte $FA ; <indirect ref>
  0x020E27 $8E17: -D0-I-  .byte $23 ; <indirect ref>
  0x020E28 $8E18: -D0-I-  .byte $A0 ; <indirect ref>
  0x020E29 $8E19: -D0-I-  .byte $F2 ; <indirect ref>
  0x020E2A $8E1A: -D0-I-  .byte $71 ; <indirect ref>
  0x020E2B $8E1B: -D0-I-  .byte $A3 ; <indirect ref>
  0x020E2C $8E1C: ------  .byte $FA
  0x020E2D $8E1D: ------  .byte $47
  0x020E2E $8E1E: ------  .byte $B3
  0x020E2F $8E1F: ------  .byte $F2
  0x020E30 $8E20: ------  .byte $A9
  0x020E31 $8E21: ------  .byte $A1
  0x020E32 $8E22: -D0-I-  .byte $F3 ; <indirect ref>
  0x020E33 $8E23: -D0-I-  .byte $83 ; <indirect ref>
  0x020E34 $8E24: -D0-I-  .byte $11 ; <indirect ref>
  0x020E35 $8E25: -D0-I-  .byte $04 ; <indirect ref>
  0x020E36 $8E26: -D0-I-  .byte $10 ; <indirect ref>
  0x020E37 $8E27: ------  .byte $1B
  0x020E38 $8E28: ------  .byte $0D
  0x020E39 $8E29: -D0-I-  .byte $FA ; <indirect ref>
  0x020E3A $8E2A: -D0-I-  .byte $DC ; <indirect ref>
  0x020E3B $8E2B: -D0-I-  .byte $B2 ; <indirect ref>
  0x020E3C $8E2C: -D0-I-  .byte $FA ; <indirect ref>
  0x020E3D $8E2D: -D0-I-  .byte $42 ; <indirect ref>
  0x020E3E $8E2E: -D0-I-  .byte $A0 ; <indirect ref>
  0x020E3F $8E2F: -D0-I-  .byte $FA ; <indirect ref>
  0x020E40 $8E30: -D0-I-  .byte $25 ; <indirect ref>
  0x020E41 $8E31: -D0-I-  .byte $A0 ; <indirect ref>
  0x020E42 $8E32: -D0-I-  .byte $FA ; <indirect ref>
  0x020E43 $8E33: -D0-I-  .byte $17 ; <indirect ref>
  0x020E44 $8E34: -D0-I-  .byte $A0 ; <indirect ref>
  0x020E45 $8E35: -D0-I-  .byte $F0 ; <indirect ref>
  0x020E46 $8E36: -D0-I-  .byte $FA ; <indirect ref>
  0x020E47 $8E37: -D0-I-  .byte $DC ; <indirect ref>
  0x020E48 $8E38: -D0-I-  .byte $B2 ; <indirect ref>
  0x020E49 $8E39: -D0-I-  .byte $FA ; <indirect ref>
  0x020E4A $8E3A: -D0-I-  .byte $47 ; <indirect ref>
  0x020E4B $8E3B: -D0-I-  .byte $A0 ; <indirect ref>
  0x020E4C $8E3C: -D0-I-  .byte $FA ; <indirect ref>
  0x020E4D $8E3D: -D0-I-  .byte $23 ; <indirect ref>
  0x020E4E $8E3E: -D0-I-  .byte $A0 ; <indirect ref>
  0x020E4F $8E3F: -D0-I-  .byte $F2 ; <indirect ref>
  0x020E50 $8E40: -D0-I-  .byte $71 ; <indirect ref>
  0x020E51 $8E41: -D0-I-  .byte $A3 ; <indirect ref>
  0x020E52 $8E42: ------  .byte $FA
  0x020E53 $8E43: ------  .byte $DC
  0x020E54 $8E44: ------  .byte $B2
  0x020E55 $8E45: ------  .byte $F2
  0x020E56 $8E46: ------  .byte $85
  0x020E57 $8E47: ------  .byte $A1
  0x020E58 $8E48: -D0-I-  .byte $F3 ; <indirect ref>
  0x020E59 $8E49: -D0-I-  .byte $83 ; <indirect ref>
  0x020E5A $8E4A: -D0-I-  .byte $11 ; <indirect ref>
  0x020E5B $8E4B: -D0-I-  .byte $04 ; <indirect ref>
  0x020E5C $8E4C: -D0-I-  .byte $10 ; <indirect ref>
  0x020E5D $8E4D: -D0-I-  .byte $1B ; <indirect ref>
  0x020E5E $8E4E: ------  .byte $0D
  0x020E5F $8E4F: -D0-I-  .byte $FA ; <indirect ref>
  0x020E60 $8E50: -D0-I-  .byte $F8 ; <indirect ref>
  0x020E61 $8E51: -D0-I-  .byte $9D ; <indirect ref>
  0x020E62 $8E52: -D0-I-  .byte $FA ; <indirect ref>
  0x020E63 $8E53: -D0-I-  .byte $0B ; <indirect ref>
  0x020E64 $8E54: -D0-I-  .byte $A0 ; <indirect ref>
  0x020E65 $8E55: -D0-I-  .byte $FA ; <indirect ref>
  0x020E66 $8E56: -D0-I-  .byte $F3 ; <indirect ref>
  0x020E67 $8E57: -D0-I-  .byte $9F ; <indirect ref>
  0x020E68 $8E58: -D0-I-  .byte $FA ; <indirect ref>
  0x020E69 $8E59: -D0-I-  .byte $E0 ; <indirect ref>
  0x020E6A $8E5A: -D0-I-  .byte $9F ; <indirect ref>
  0x020E6B $8E5B: -D0-I-  .byte $F0 ; <indirect ref>
  0x020E6C $8E5C: -D0-I-  .byte $FA ; <indirect ref>
  0x020E6D $8E5D: -D0-I-  .byte $F8 ; <indirect ref>
  0x020E6E $8E5E: -D0-I-  .byte $9D ; <indirect ref>
  0x020E6F $8E5F: -D0-I-  .byte $FA ; <indirect ref>
  0x020E70 $8E60: -D0-I-  .byte $10 ; <indirect ref>
  0x020E71 $8E61: -D0-I-  .byte $A0 ; <indirect ref>
  0x020E72 $8E62: -D0-I-  .byte $FA ; <indirect ref>
  0x020E73 $8E63: -D0-I-  .byte $F1 ; <indirect ref>
  0x020E74 $8E64: -D0-I-  .byte $9F ; <indirect ref>
  0x020E75 $8E65: -D0-I-  .byte $F2 ; <indirect ref>
  0x020E76 $8E66: -D0-I-  .byte $71 ; <indirect ref>
  0x020E77 $8E67: -D0-I-  .byte $A3 ; <indirect ref>
  0x020E78 $8E68: -D0-I-  .byte $FA ; <indirect ref>
  0x020E79 $8E69: -D0-I-  .byte $F8 ; <indirect ref>
  0x020E7A $8E6A: -D0-I-  .byte $9D ; <indirect ref>
  0x020E7B $8E6B: -D0-I-  .byte $F2 ; <indirect ref>
  0x020E7C $8E6C: -D0-I-  .byte $6E ; <indirect ref>
  0x020E7D $8E6D: -D0-I-  .byte $A1 ; <indirect ref>
  0x020E7E $8E6E: -D0-I-  .byte $F3 ; <indirect ref>
  0x020E7F $8E6F: -D0-I-  .byte $82 ; <indirect ref>
  0x020E80 $8E70: -D0-I-  .byte $03 ; <indirect ref>
  0x020E81 $8E71: -D0-I-  .byte $34 ; <indirect ref>
  0x020E82 $8E72: -D0-I-  .byte $65 ; <indirect ref>
  0x020E83 $8E73: -D0-I-  .byte $F3 ; <indirect ref>
  0x020E84 $8E74: -D0-I-  .byte $83 ; <indirect ref>
  0x020E85 $8E75: -D0-I-  .byte $05 ; <indirect ref>
  0x020E86 $8E76: -D0-I-  .byte $11 ; <indirect ref>
  0x020E87 $8E77: ------  .byte $1F
  0x020E88 $8E78: ------  .byte $0E
  0x020E89 $8E79: ------  .byte $0D
  0x020E8A $8E7A: -D0-I-  .byte $FA ; <indirect ref>
  0x020E8B $8E7B: -D0-I-  .byte $47 ; <indirect ref>
  0x020E8C $8E7C: -D0-I-  .byte $B3 ; <indirect ref>
  0x020E8D $8E7D: -D0-I-  .byte $FA ; <indirect ref>
  0x020E8E $8E7E: -D0-I-  .byte $47 ; <indirect ref>
  0x020E8F $8E7F: -D0-I-  .byte $A0 ; <indirect ref>
  0x020E90 $8E80: -D0-I-  .byte $FA ; <indirect ref>
  0x020E91 $8E81: -D0-I-  .byte $DD ; <indirect ref>
  0x020E92 $8E82: -D0-I-  .byte $A2 ; <indirect ref>
  0x020E93 $8E83: -D0-I-  .byte $FA ; <indirect ref>
  0x020E94 $8E84: -D0-I-  .byte $62 ; <indirect ref>
  0x020E95 $8E85: -D0-I-  .byte $9F ; <indirect ref>
  0x020E96 $8E86: -D0-I-  .byte $F0 ; <indirect ref>
  0x020E97 $8E87: -D0-I-  .byte $FA ; <indirect ref>
  0x020E98 $8E88: -D0-I-  .byte $47 ; <indirect ref>
  0x020E99 $8E89: -D0-I-  .byte $B3 ; <indirect ref>
  0x020E9A $8E8A: -D0-I-  .byte $FA ; <indirect ref>
  0x020E9B $8E8B: -D0-I-  .byte $47 ; <indirect ref>
  0x020E9C $8E8C: -D0-I-  .byte $A0 ; <indirect ref>
  0x020E9D $8E8D: -D0-I-  .byte $FA ; <indirect ref>
  0x020E9E $8E8E: -D0-I-  .byte $DD ; <indirect ref>
  0x020E9F $8E8F: -D0-I-  .byte $A2 ; <indirect ref>
  0x020EA0 $8E90: -D0-I-  .byte $FA ; <indirect ref>
  0x020EA1 $8E91: -D0-I-  .byte $5C ; <indirect ref>
  0x020EA2 $8E92: -D0-I-  .byte $9F ; <indirect ref>
  0x020EA3 $8E93: -D0-I-  .byte $F2 ; <indirect ref>
  0x020EA4 $8E94: -D0-I-  .byte $40 ; <indirect ref>
  0x020EA5 $8E95: -D0-I-  .byte $A2 ; <indirect ref>
  0x020EA6 $8E96: ------  .byte $FA
  0x020EA7 $8E97: ------  .byte $47
  0x020EA8 $8E98: ------  .byte $B3
  0x020EA9 $8E99: ------  .byte $FA
  0x020EAA $8E9A: ------  .byte $47
  0x020EAB $8E9B: ------  .byte $A0
  0x020EAC $8E9C: ------  .byte $FA
  0x020EAD $8E9D: ------  .byte $DD
  0x020EAE $8E9E: ------  .byte $A2
  0x020EAF $8E9F: ------  .byte $FA
  0x020EB0 $8EA0: ------  .byte $5C
  0x020EB1 $8EA1: ------  .byte $9F
  0x020EB2 $8EA2: ------  .byte $F2
  0x020EB3 $8EA3: ------  .byte $71
  0x020EB4 $8EA4: ------  .byte $A3
  0x020EB5 $8EA5: -D0-I-  .byte $F3 ; <indirect ref>
  0x020EB6 $8EA6: -D0-I-  .byte $83 ; <indirect ref>
  0x020EB7 $8EA7: -D0-I-  .byte $05 ; <indirect ref>
  0x020EB8 $8EA8: ------  .byte $11
  0x020EB9 $8EA9: ------  .byte $1F
  0x020EBA $8EAA: ------  .byte $0E
  0x020EBB $8EAB: ------  .byte $0D
  0x020EBC $8EAC: -D0-I-  .byte $FA ; <indirect ref>
  0x020EBD $8EAD: -D0-I-  .byte $DC ; <indirect ref>
  0x020EBE $8EAE: -D0-I-  .byte $B2 ; <indirect ref>
  0x020EBF $8EAF: -D0-I-  .byte $FA ; <indirect ref>
  0x020EC0 $8EB0: -D0-I-  .byte $47 ; <indirect ref>
  0x020EC1 $8EB1: -D0-I-  .byte $A0 ; <indirect ref>
  0x020EC2 $8EB2: -D0-I-  .byte $FA ; <indirect ref>
  0x020EC3 $8EB3: -D0-I-  .byte $DD ; <indirect ref>
  0x020EC4 $8EB4: -D0-I-  .byte $A2 ; <indirect ref>
  0x020EC5 $8EB5: -D0-I-  .byte $FA ; <indirect ref>
  0x020EC6 $8EB6: -D0-I-  .byte $62 ; <indirect ref>
  0x020EC7 $8EB7: -D0-I-  .byte $9F ; <indirect ref>
  0x020EC8 $8EB8: -D0-I-  .byte $F0 ; <indirect ref>
  0x020EC9 $8EB9: ------  .byte $FA
  0x020ECA $8EBA: ------  .byte $DC
  0x020ECB $8EBB: ------  .byte $B2
  0x020ECC $8EBC: ------  .byte $FA
  0x020ECD $8EBD: ------  .byte $47
  0x020ECE $8EBE: ------  .byte $A0
  0x020ECF $8EBF: ------  .byte $FA
  0x020ED0 $8EC0: ------  .byte $DD
  0x020ED1 $8EC1: ------  .byte $A2
  0x020ED2 $8EC2: ------  .byte $FA
  0x020ED3 $8EC3: ------  .byte $5C
  0x020ED4 $8EC4: ------  .byte $9F
  0x020ED5 $8EC5: ------  .byte $F2
  0x020ED6 $8EC6: ------  .byte $40
  0x020ED7 $8EC7: ------  .byte $A2
  0x020ED8 $8EC8: ------  .byte $FA
  0x020ED9 $8EC9: ------  .byte $DC
  0x020EDA $8ECA: ------  .byte $B2
  0x020EDB $8ECB: ------  .byte $FA
  0x020EDC $8ECC: ------  .byte $47
  0x020EDD $8ECD: ------  .byte $A0
  0x020EDE $8ECE: ------  .byte $FA
  0x020EDF $8ECF: ------  .byte $DD
  0x020EE0 $8ED0: ------  .byte $A2
  0x020EE1 $8ED1: ------  .byte $FA
  0x020EE2 $8ED2: ------  .byte $5C
  0x020EE3 $8ED3: ------  .byte $9F
  0x020EE4 $8ED4: ------  .byte $F2
  0x020EE5 $8ED5: ------  .byte $71
  0x020EE6 $8ED6: ------  .byte $A3
  0x020EE7 $8ED7: -D0-I-  .byte $F3 ; <indirect ref>
  0x020EE8 $8ED8: -D0-I-  .byte $83 ; <indirect ref>
  0x020EE9 $8ED9: -D0-I-  .byte $05 ; <indirect ref>
  0x020EEA $8EDA: -D0-I-  .byte $11 ; <indirect ref>
  0x020EEB $8EDB: ------  .byte $1F
  0x020EEC $8EDC: ------  .byte $0E
  0x020EED $8EDD: ------  .byte $0D
  0x020EEE $8EDE: -D0-I-  .byte $FA ; <indirect ref>
  0x020EEF $8EDF: -D0-I-  .byte $F8 ; <indirect ref>
  0x020EF0 $8EE0: -D0-I-  .byte $9D ; <indirect ref>
  0x020EF1 $8EE1: -D0-I-  .byte $FA ; <indirect ref>
  0x020EF2 $8EE2: -D0-I-  .byte $10 ; <indirect ref>
  0x020EF3 $8EE3: -D0-I-  .byte $A0 ; <indirect ref>
  0x020EF4 $8EE4: -D0-I-  .byte $FA ; <indirect ref>
  0x020EF5 $8EE5: -D0-I-  .byte $DD ; <indirect ref>
  0x020EF6 $8EE6: -D0-I-  .byte $A2 ; <indirect ref>
  0x020EF7 $8EE7: -D0-I-  .byte $FA ; <indirect ref>
  0x020EF8 $8EE8: -D0-I-  .byte $62 ; <indirect ref>
  0x020EF9 $8EE9: -D0-I-  .byte $9F ; <indirect ref>
  0x020EFA $8EEA: -D0-I-  .byte $F0 ; <indirect ref>
  0x020EFB $8EEB: -D0-I-  .byte $FA ; <indirect ref>
  0x020EFC $8EEC: -D0-I-  .byte $F8 ; <indirect ref>
  0x020EFD $8EED: -D0-I-  .byte $9D ; <indirect ref>
  0x020EFE $8EEE: -D0-I-  .byte $FA ; <indirect ref>
  0x020EFF $8EEF: -D0-I-  .byte $10 ; <indirect ref>
  0x020F00 $8EF0: -D0-I-  .byte $A0 ; <indirect ref>
  0x020F01 $8EF1: -D0-I-  .byte $FA ; <indirect ref>
  0x020F02 $8EF2: -D0-I-  .byte $DD ; <indirect ref>
  0x020F03 $8EF3: -D0-I-  .byte $A2 ; <indirect ref>
  0x020F04 $8EF4: -D0-I-  .byte $FA ; <indirect ref>
  0x020F05 $8EF5: -D0-I-  .byte $5C ; <indirect ref>
  0x020F06 $8EF6: -D0-I-  .byte $9F ; <indirect ref>
  0x020F07 $8EF7: -D0-I-  .byte $F2 ; <indirect ref>
  0x020F08 $8EF8: -D0-I-  .byte $40 ; <indirect ref>
  0x020F09 $8EF9: -D0-I-  .byte $A2 ; <indirect ref>
  0x020F0A $8EFA: ------  .byte $FA
  0x020F0B $8EFB: ------  .byte $F8
  0x020F0C $8EFC: ------  .byte $9D
  0x020F0D $8EFD: ------  .byte $FA
  0x020F0E $8EFE: ------  .byte $10
  0x020F0F $8EFF: ------  .byte $A0
  0x020F10 $8F00: ------  .byte $FA
  0x020F11 $8F01: ------  .byte $DD
  0x020F12 $8F02: ------  .byte $A2
  0x020F13 $8F03: ------  .byte $FA
  0x020F14 $8F04: ------  .byte $5C
  0x020F15 $8F05: ------  .byte $9F
  0x020F16 $8F06: ------  .byte $F2
  0x020F17 $8F07: ------  .byte $71
  0x020F18 $8F08: ------  .byte $A3
  0x020F19 $8F09: -D0-I-  .byte $FD ; <indirect ref>
  0x020F1A $8F0A: -D0-I-  .byte $03 ; <indirect ref>
  0x020F1B $8F0B: -D0-I-  .byte $F3 ; <indirect ref>
  0x020F1C $8F0C: -D0-I-  .byte $00 ; <indirect ref>
  0x020F1D $8F0D: -D0-I-  .byte $11 ; <indirect ref>
  0x020F1E $8F0E: -D0-I-  .byte $8F ; <indirect ref>
  0x020F1F $8F0F: -D0-I-  .byte $76 ; <indirect ref>
  0x020F20 $8F10: -D0-I-  .byte $90 ; <indirect ref>
  0x020F21 $8F11: -D0-I-  .byte $F3 ; <indirect ref>
  0x020F22 $8F12: -D0-I-  .byte $C6 ; <indirect ref>
  0x020F23 $8F13: -D0-I-  .byte $02 ; <indirect ref>
  0x020F24 $8F14: -D0-I-  .byte $CC ; <indirect ref>
  0x020F25 $8F15: -D0-I-  .byte $F3 ; <indirect ref>
  0x020F26 $8F16: -D0-I-  .byte $82 ; <indirect ref>
  0x020F27 $8F17: -D0-I-  .byte $03 ; <indirect ref>
  0x020F28 $8F18: -D0-I-  .byte $55 ; <indirect ref>
  0x020F29 $8F19: -D0-I-  .byte $8F ; <indirect ref>
  0x020F2A $8F1A: -D0-I-  .byte $F3 ; <indirect ref>
  0x020F2B $8F1B: -D0-I-  .byte $83 ; <indirect ref>
  0x020F2C $8F1C: -D0-I-  .byte $17 ; <indirect ref>
  0x020F2D $8F1D: -D0-I-  .byte $20 ; <indirect ref>
  0x020F2E $8F1E: -D0-I-  .byte $03 ; <indirect ref>
  0x020F2F $8F1F: -D0-I-  .byte $0B ; <indirect ref>
  0x020F30 $8F20: ------  .byte $1C
  0x020F31 $8F21: -D0-I-  .byte $F3 ; <indirect ref>
  0x020F32 $8F22: -D0-I-  .byte $9B ; <indirect ref>
  0x020F33 $8F23: -D0-I-  .byte $29 ; <indirect ref>
  0x020F34 $8F24: ------  .byte $40
  0x020F35 $8F25: -D0-I-  .byte $02 ; <indirect ref>
  0x020F36 $8F26: -D0-I-  .byte $01 ; <indirect ref>
  0x020F37 $8F27: -D0-I-  .byte $F2 ; <indirect ref>
  0x020F38 $8F28: -D0-I-  .byte $88 ; <indirect ref>
  0x020F39 $8F29: -D0-I-  .byte $8C ; <indirect ref>
  0x020F3A $8F2A: -D0-I-  .byte $F3 ; <indirect ref>
  0x020F3B $8F2B: -D0-I-  .byte $9B ; <indirect ref>
  0x020F3C $8F2C: ------  .byte $2F
  0x020F3D $8F2D: -D0-I-  .byte $37 ; <indirect ref>
  0x020F3E $8F2E: ------  .byte $02
  0x020F3F $8F2F: -D0-I-  .byte $01 ; <indirect ref>
  0x020F40 $8F30: -D0-I-  .byte $F2 ; <indirect ref>
  0x020F41 $8F31: -D0-I-  .byte $38 ; <indirect ref>
  0x020F42 $8F32: -D0-I-  .byte $8D ; <indirect ref>
  0x020F43 $8F33: -D0-I-  .byte $FA ; <indirect ref>
  0x020F44 $8F34: -D0-I-  .byte $7A ; <indirect ref>
  0x020F45 $8F35: -D0-I-  .byte $9F ; <indirect ref>
  0x020F46 $8F36: -D0-I-  .byte $FA ; <indirect ref>
  0x020F47 $8F37: -D0-I-  .byte $8F ; <indirect ref>
  0x020F48 $8F38: -D0-I-  .byte $A3 ; <indirect ref>
  0x020F49 $8F39: -D0-I-  .byte $FA ; <indirect ref>
  0x020F4A $8F3A: -D0-I-  .byte $1C ; <indirect ref>
  0x020F4B $8F3B: -D0-I-  .byte $A0 ; <indirect ref>
  0x020F4C $8F3C: -D0-I-  .byte $F0 ; <indirect ref>
  0x020F4D $8F3D: -D0-I-  .byte $FA ; <indirect ref>
  0x020F4E $8F3E: -D0-I-  .byte $7A ; <indirect ref>
  0x020F4F $8F3F: -D0-I-  .byte $9F ; <indirect ref>
  0x020F50 $8F40: -D0-I-  .byte $FA ; <indirect ref>
  0x020F51 $8F41: -D0-I-  .byte $8F ; <indirect ref>
  0x020F52 $8F42: -D0-I-  .byte $A3 ; <indirect ref>
  0x020F53 $8F43: -D0-I-  .byte $FA ; <indirect ref>
  0x020F54 $8F44: -D0-I-  .byte $34 ; <indirect ref>
  0x020F55 $8F45: -D0-I-  .byte $A0 ; <indirect ref>
  0x020F56 $8F46: -D0-I-  .byte $FA ; <indirect ref>
  0x020F57 $8F47: -D0-I-  .byte $25 ; <indirect ref>
  0x020F58 $8F48: -D0-I-  .byte $A0 ; <indirect ref>
  0x020F59 $8F49: -D0-I-  .byte $F2 ; <indirect ref>
  0x020F5A $8F4A: -D0-I-  .byte $15 ; <indirect ref>
  0x020F5B $8F4B: -D0-I-  .byte $A0 ; <indirect ref>
  0x020F5C $8F4C: -D0-I-  .byte $FA ; <indirect ref>
  0x020F5D $8F4D: -D0-I-  .byte $7A ; <indirect ref>
  0x020F5E $8F4E: -D0-I-  .byte $9F ; <indirect ref>
  0x020F5F $8F4F: -D0-I-  .byte $FA ; <indirect ref>
  0x020F60 $8F50: -D0-I-  .byte $8F ; <indirect ref>
  0x020F61 $8F51: -D0-I-  .byte $A3 ; <indirect ref>
  0x020F62 $8F52: -D0-I-  .byte $FA ; <indirect ref>
  0x020F63 $8F53: -D0-I-  .byte $3B ; <indirect ref>
  0x020F64 $8F54: -D0-I-  .byte $A0 ; <indirect ref>
  0x020F65 $8F55: -D0-I-  .byte $FA ; <indirect ref>
  0x020F66 $8F56: -D0-I-  .byte $23 ; <indirect ref>
  0x020F67 $8F57: -D0-I-  .byte $A0 ; <indirect ref>
  0x020F68 $8F58: -D0-I-  .byte $F2 ; <indirect ref>
  0x020F69 $8F59: -D0-I-  .byte $71 ; <indirect ref>
  0x020F6A $8F5A: -D0-I-  .byte $A3 ; <indirect ref>
  0x020F6B $8F5B: ------  .byte $FA
  0x020F6C $8F5C: ------  .byte $7A
  0x020F6D $8F5D: ------  .byte $9F
  0x020F6E $8F5E: ------  .byte $FA
  0x020F6F $8F5F: ------  .byte $8F
  0x020F70 $8F60: ------  .byte $A3
  0x020F71 $8F61: ------  .byte $F2
  0x020F72 $8F62: ------  .byte $9F
  0x020F73 $8F63: ------  .byte $A1
  0x020F74 $8F64: -D0-I-  .byte $FA ; <indirect ref>
  0x020F75 $8F65: -D0-I-  .byte $7A ; <indirect ref>
  0x020F76 $8F66: -D0-I-  .byte $9F ; <indirect ref>
  0x020F77 $8F67: -D0-I-  .byte $FA ; <indirect ref>
  0x020F78 $8F68: -D0-I-  .byte $65 ; <indirect ref>
  0x020F79 $8F69: -D0-I-  .byte $B4 ; <indirect ref>
  0x020F7A $8F6A: -D0-I-  .byte $F2 ; <indirect ref>
  0x020F7B $8F6B: -D0-I-  .byte $71 ; <indirect ref>
  0x020F7C $8F6C: -D0-I-  .byte $A3 ; <indirect ref>
  0x020F7D $8F6D: -D0-I-  .byte $F3 ; <indirect ref>
  0x020F7E $8F6E: -D0-I-  .byte $83 ; <indirect ref>
  0x020F7F $8F6F: -D0-I-  .byte $08 ; <indirect ref>
  0x020F80 $8F70: -D0-I-  .byte $11 ; <indirect ref>
  0x020F81 $8F71: -D0-I-  .byte $1F ; <indirect ref>
  0x020F82 $8F72: -D0-I-  .byte $2D ; <indirect ref>
  0x020F83 $8F73: ------  .byte $0D
  0x020F84 $8F74: ------  .byte $FA
  0x020F85 $8F75: ------  .byte $DC
  0x020F86 $8F76: ------  .byte $B2
  0x020F87 $8F77: -D0-I-  .byte $FA ; <indirect ref>
  0x020F88 $8F78: -D0-I-  .byte $E0 ; <indirect ref>
  0x020F89 $8F79: -D0-I-  .byte $A6 ; <indirect ref>
  0x020F8A $8F7A: -D0-I-  .byte $FA ; <indirect ref>
  0x020F8B $8F7B: -D0-I-  .byte $8F ; <indirect ref>
  0x020F8C $8F7C: -D0-I-  .byte $A3 ; <indirect ref>
  0x020F8D $8F7D: -D0-I-  .byte $FA ; <indirect ref>
  0x020F8E $8F7E: -D0-I-  .byte $1C ; <indirect ref>
  0x020F8F $8F7F: -D0-I-  .byte $A0 ; <indirect ref>
  0x020F90 $8F80: -D0-I-  .byte $F0 ; <indirect ref>
  0x020F91 $8F81: -D0-I-  .byte $FA ; <indirect ref>
  0x020F92 $8F82: -D0-I-  .byte $E0 ; <indirect ref>
  0x020F93 $8F83: -D0-I-  .byte $A6 ; <indirect ref>
  0x020F94 $8F84: -D0-I-  .byte $FA ; <indirect ref>
  0x020F95 $8F85: -D0-I-  .byte $8F ; <indirect ref>
  0x020F96 $8F86: -D0-I-  .byte $A3 ; <indirect ref>
  0x020F97 $8F87: -D0-I-  .byte $FA ; <indirect ref>
  0x020F98 $8F88: -D0-I-  .byte $34 ; <indirect ref>
  0x020F99 $8F89: -D0-I-  .byte $A0 ; <indirect ref>
  0x020F9A $8F8A: -D0-I-  .byte $FA ; <indirect ref>
  0x020F9B $8F8B: -D0-I-  .byte $25 ; <indirect ref>
  0x020F9C $8F8C: -D0-I-  .byte $A0 ; <indirect ref>
  0x020F9D $8F8D: -D0-I-  .byte $F2 ; <indirect ref>
  0x020F9E $8F8E: -D0-I-  .byte $15 ; <indirect ref>
  0x020F9F $8F8F: -D0-I-  .byte $A0 ; <indirect ref>
  0x020FA0 $8F90: -D0-I-  .byte $FA ; <indirect ref>
  0x020FA1 $8F91: -D0-I-  .byte $E0 ; <indirect ref>
  0x020FA2 $8F92: -D0-I-  .byte $A6 ; <indirect ref>
  0x020FA3 $8F93: -D0-I-  .byte $FA ; <indirect ref>
  0x020FA4 $8F94: -D0-I-  .byte $8F ; <indirect ref>
  0x020FA5 $8F95: -D0-I-  .byte $A3 ; <indirect ref>
  0x020FA6 $8F96: -D0-I-  .byte $FA ; <indirect ref>
  0x020FA7 $8F97: -D0-I-  .byte $3B ; <indirect ref>
  0x020FA8 $8F98: -D0-I-  .byte $A0 ; <indirect ref>
  0x020FA9 $8F99: -D0-I-  .byte $FA ; <indirect ref>
  0x020FAA $8F9A: -D0-I-  .byte $23 ; <indirect ref>
  0x020FAB $8F9B: -D0-I-  .byte $A0 ; <indirect ref>
  0x020FAC $8F9C: -D0-I-  .byte $F2 ; <indirect ref>
  0x020FAD $8F9D: -D0-I-  .byte $71 ; <indirect ref>
  0x020FAE $8F9E: -D0-I-  .byte $A3 ; <indirect ref>
  0x020FAF $8F9F: -D0-I-  .byte $FA ; <indirect ref>
  0x020FB0 $8FA0: -D0-I-  .byte $E0 ; <indirect ref>
  0x020FB1 $8FA1: -D0-I-  .byte $A6 ; <indirect ref>
  0x020FB2 $8FA2: -D0-I-  .byte $FA ; <indirect ref>
  0x020FB3 $8FA3: -D0-I-  .byte $8F ; <indirect ref>
  0x020FB4 $8FA4: -D0-I-  .byte $A3 ; <indirect ref>
  0x020FB5 $8FA5: -D0-I-  .byte $F2 ; <indirect ref>
  0x020FB6 $8FA6: -D0-I-  .byte $7B ; <indirect ref>
  0x020FB7 $8FA7: -D0-I-  .byte $A1 ; <indirect ref>
  0x020FB8 $8FA8: -D0-I-  .byte $F3 ; <indirect ref>
  0x020FB9 $8FA9: -D0-I-  .byte $83 ; <indirect ref>
  0x020FBA $8FAA: -D0-I-  .byte $05 ; <indirect ref>
  0x020FBB $8FAB: -D0-I-  .byte $0E ; <indirect ref>
  0x020FBC $8FAC: -D0-I-  .byte $1C ; <indirect ref>
  0x020FBD $8FAD: -D0-I-  .byte $2A ; <indirect ref>
  0x020FBE $8FAE: ------  .byte $0A
  0x020FBF $8FAF: -D0-I-  .byte $FA ; <indirect ref>
  0x020FC0 $8FB0: -D0-I-  .byte $7F ; <indirect ref>
  0x020FC1 $8FB1: -D0-I-  .byte $9C ; <indirect ref>
  0x020FC2 $8FB2: -D0-I-  .byte $FA ; <indirect ref>
  0x020FC3 $8FB3: -D0-I-  .byte $8F ; <indirect ref>
  0x020FC4 $8FB4: -D0-I-  .byte $A3 ; <indirect ref>
  0x020FC5 $8FB5: -D0-I-  .byte $FA ; <indirect ref>
  0x020FC6 $8FB6: -D0-I-  .byte $EA ; <indirect ref>
  0x020FC7 $8FB7: -D0-I-  .byte $9F ; <indirect ref>
  0x020FC8 $8FB8: -D0-I-  .byte $F0 ; <indirect ref>
  0x020FC9 $8FB9: -D0-I-  .byte $FA ; <indirect ref>
  0x020FCA $8FBA: -D0-I-  .byte $7F ; <indirect ref>
  0x020FCB $8FBB: -D0-I-  .byte $9C ; <indirect ref>
  0x020FCC $8FBC: -D0-I-  .byte $FA ; <indirect ref>
  0x020FCD $8FBD: -D0-I-  .byte $8F ; <indirect ref>
  0x020FCE $8FBE: -D0-I-  .byte $A3 ; <indirect ref>
  0x020FCF $8FBF: -D0-I-  .byte $FA ; <indirect ref>
  0x020FD0 $8FC0: -D0-I-  .byte $FD ; <indirect ref>
  0x020FD1 $8FC1: -D0-I-  .byte $9F ; <indirect ref>
  0x020FD2 $8FC2: -D0-I-  .byte $FA ; <indirect ref>
  0x020FD3 $8FC3: -D0-I-  .byte $F3 ; <indirect ref>
  0x020FD4 $8FC4: -D0-I-  .byte $9F ; <indirect ref>
  0x020FD5 $8FC5: -D0-I-  .byte $F2 ; <indirect ref>
  0x020FD6 $8FC6: -D0-I-  .byte $DE ; <indirect ref>
  0x020FD7 $8FC7: -D0-I-  .byte $9F ; <indirect ref>
  0x020FD8 $8FC8: -D0-I-  .byte $FA ; <indirect ref>
  0x020FD9 $8FC9: -D0-I-  .byte $7F ; <indirect ref>
  0x020FDA $8FCA: -D0-I-  .byte $9C ; <indirect ref>
  0x020FDB $8FCB: -D0-I-  .byte $FA ; <indirect ref>
  0x020FDC $8FCC: -D0-I-  .byte $8F ; <indirect ref>
  0x020FDD $8FCD: -D0-I-  .byte $A3 ; <indirect ref>
  0x020FDE $8FCE: -D0-I-  .byte $FA ; <indirect ref>
  0x020FDF $8FCF: -D0-I-  .byte $04 ; <indirect ref>
  0x020FE0 $8FD0: -D0-I-  .byte $A0 ; <indirect ref>
  0x020FE1 $8FD1: -D0-I-  .byte $FA ; <indirect ref>
  0x020FE2 $8FD2: -D0-I-  .byte $F1 ; <indirect ref>
  0x020FE3 $8FD3: -D0-I-  .byte $9F ; <indirect ref>
  0x020FE4 $8FD4: -D0-I-  .byte $F2 ; <indirect ref>
  0x020FE5 $8FD5: -D0-I-  .byte $71 ; <indirect ref>
  0x020FE6 $8FD6: -D0-I-  .byte $A3 ; <indirect ref>
  0x020FE7 $8FD7: -D0-I-  .byte $FA ; <indirect ref>
  0x020FE8 $8FD8: -D0-I-  .byte $7F ; <indirect ref>
  0x020FE9 $8FD9: -D0-I-  .byte $9C ; <indirect ref>
  0x020FEA $8FDA: -D0-I-  .byte $FA ; <indirect ref>
  0x020FEB $8FDB: -D0-I-  .byte $8F ; <indirect ref>
  0x020FEC $8FDC: -D0-I-  .byte $A3 ; <indirect ref>
  0x020FED $8FDD: -D0-I-  .byte $F2 ; <indirect ref>
  0x020FEE $8FDE: -D0-I-  .byte $64 ; <indirect ref>
  0x020FEF $8FDF: -D0-I-  .byte $A1 ; <indirect ref>
  0x020FF0 $8FE0: -D0-I-  .byte $F3 ; <indirect ref>
  0x020FF1 $8FE1: -D0-I-  .byte $82 ; <indirect ref>
  0x020FF2 $8FE2: -D0-I-  .byte $03 ; <indirect ref>
  0x020FF3 $8FE3: -D0-I-  .byte $58 ; <indirect ref>
  0x020FF4 $8FE4: ------  .byte $96
  0x020FF5 $8FE5: -D0-I-  .byte $F3 ; <indirect ref>
  0x020FF6 $8FE6: -D0-I-  .byte $83 ; <indirect ref>
  0x020FF7 $8FE7: ------  .byte $14
  0x020FF8 $8FE8: ------  .byte $23
  0x020FF9 $8FE9: -D0-I-  .byte $03 ; <indirect ref>
  0x020FFA $8FEA: ------  .byte $08
  0x020FFB $8FEB: ------  .byte $1F
  0x020FFC $8FEC: -D0-I-  .byte $F3 ; <indirect ref>
  0x020FFD $8FED: -D0-I-  .byte $9B ; <indirect ref>
  0x020FFE $8FEE: ------  .byte $2F
  0x020FFF $8FEF: ------  .byte $09
  0x021000 $8FF0: ------  .byte $2D
  0x021001 $8FF1: -D0-I-  .byte $2C ; <indirect ref>
  0x021002 $8FF2: ------  .byte $F3
  0x021003 $8FF3: ------  .byte $9B
  0x021004 $8FF4: ------  .byte $3B
  0x021005 $8FF5: ------  .byte $03
  0x021006 $8FF6: ------  .byte $39
  0x021007 $8FF7: ------  .byte $38
  0x021008 $8FF8: ------  .byte $F2
  0x021009 $8FF9: ------  .byte $97
  0x02100A $8FFA: ------  .byte $8C
  0x02100B $8FFB: ------  .byte $FA
  0x02100C $8FFC: ------  .byte $7A
  0x02100D $8FFD: ------  .byte $9F
  0x02100E $8FFE: ------  .byte $FA
  0x02100F $8FFF: ------  .byte $8F
  0x021010 $9000: ------  .byte $A3
  0x021011 $9001: ------  .byte $FA
  0x021012 $9002: ------  .byte $3B
  0x021013 $9003: ------  .byte $A0
  0x021014 $9004: ------  .byte $FA
  0x021015 $9005: ------  .byte $DD
  0x021016 $9006: ------  .byte $A2
  0x021017 $9007: ------  .byte $FA
  0x021018 $9008: ------  .byte $62
  0x021019 $9009: ------  .byte $9F
  0x02101A $900A: ------  .byte $F0
  0x02101B $900B: ------  .byte $FA
  0x02101C $900C: ------  .byte $7A
  0x02101D $900D: ------  .byte $9F
  0x02101E $900E: ------  .byte $FA
  0x02101F $900F: ------  .byte $8F
  0x021020 $9010: ------  .byte $A3
  0x021021 $9011: ------  .byte $FA
  0x021022 $9012: ------  .byte $3B
  0x021023 $9013: ------  .byte $A0
  0x021024 $9014: ------  .byte $FA
  0x021025 $9015: ------  .byte $DD
  0x021026 $9016: ------  .byte $A2
  0x021027 $9017: ------  .byte $FA
  0x021028 $9018: ------  .byte $5C
  0x021029 $9019: ------  .byte $9F
  0x02102A $901A: ------  .byte $F2
  0x02102B $901B: ------  .byte $40
  0x02102C $901C: ------  .byte $A2
  0x02102D $901D: -D0-I-  .byte $FA ; <indirect ref>
  0x02102E $901E: -D0-I-  .byte $7A ; <indirect ref>
  0x02102F $901F: -D0-I-  .byte $9F ; <indirect ref>
  0x021030 $9020: -D0-I-  .byte $FA ; <indirect ref>
  0x021031 $9021: -D0-I-  .byte $8F ; <indirect ref>
  0x021032 $9022: -D0-I-  .byte $A3 ; <indirect ref>
  0x021033 $9023: -D0-I-  .byte $FA ; <indirect ref>
  0x021034 $9024: -D0-I-  .byte $3B ; <indirect ref>
  0x021035 $9025: -D0-I-  .byte $A0 ; <indirect ref>
  0x021036 $9026: -D0-I-  .byte $FA ; <indirect ref>
  0x021037 $9027: -D0-I-  .byte $DD ; <indirect ref>
  0x021038 $9028: -D0-I-  .byte $A2 ; <indirect ref>
  0x021039 $9029: -D0-I-  .byte $FA ; <indirect ref>
  0x02103A $902A: -D0-I-  .byte $5C ; <indirect ref>
  0x02103B $902B: -D0-I-  .byte $9F ; <indirect ref>
  0x02103C $902C: -D0-I-  .byte $F2 ; <indirect ref>
  0x02103D $902D: -D0-I-  .byte $71 ; <indirect ref>
  0x02103E $902E: -D0-I-  .byte $A3 ; <indirect ref>
  0x02103F $902F: ------  .byte $FA
  0x021040 $9030: ------  .byte $7A
  0x021041 $9031: ------  .byte $9F
  0x021042 $9032: ------  .byte $FA
  0x021043 $9033: ------  .byte $8F
  0x021044 $9034: ------  .byte $A3
  0x021045 $9035: ------  .byte $FA
  0x021046 $9036: ------  .byte $DD
  0x021047 $9037: ------  .byte $A2
  0x021048 $9038: ------  .byte $F2
  0x021049 $9039: ------  .byte $9F
  0x02104A $903A: ------  .byte $A1
  0x02104B $903B: -D0-I-  .byte $F3 ; <indirect ref>
  0x02104C $903C: -D0-I-  .byte $83 ; <indirect ref>
  0x02104D $903D: -D0-I-  .byte $05 ; <indirect ref>
  0x02104E $903E: ------  .byte $14
  0x02104F $903F: ------  .byte $25
  0x021050 $9040: ------  .byte $11
  0x021051 $9041: ------  .byte $10
  0x021052 $9042: -D0-I-  .byte $FA ; <indirect ref>
  0x021053 $9043: -D0-I-  .byte $E0 ; <indirect ref>
  0x021054 $9044: -D0-I-  .byte $A6 ; <indirect ref>
  0x021055 $9045: -D0-I-  .byte $FA ; <indirect ref>
  0x021056 $9046: -D0-I-  .byte $8F ; <indirect ref>
  0x021057 $9047: -D0-I-  .byte $A3 ; <indirect ref>
  0x021058 $9048: -D0-I-  .byte $FA ; <indirect ref>
  0x021059 $9049: -D0-I-  .byte $3B ; <indirect ref>
  0x02105A $904A: -D0-I-  .byte $A0 ; <indirect ref>
  0x02105B $904B: -D0-I-  .byte $FA ; <indirect ref>
  0x02105C $904C: -D0-I-  .byte $DD ; <indirect ref>
  0x02105D $904D: -D0-I-  .byte $A2 ; <indirect ref>
  0x02105E $904E: -D0-I-  .byte $FA ; <indirect ref>
  0x02105F $904F: -D0-I-  .byte $62 ; <indirect ref>
  0x021060 $9050: -D0-I-  .byte $9F ; <indirect ref>
  0x021061 $9051: -D0-I-  .byte $F0 ; <indirect ref>
  0x021062 $9052: ------  .byte $FA
  0x021063 $9053: ------  .byte $E0
  0x021064 $9054: ------  .byte $A6
  0x021065 $9055: ------  .byte $FA
  0x021066 $9056: ------  .byte $8F
  0x021067 $9057: ------  .byte $A3
  0x021068 $9058: ------  .byte $FA
  0x021069 $9059: ------  .byte $3B
  0x02106A $905A: ------  .byte $A0
  0x02106B $905B: ------  .byte $FA
  0x02106C $905C: ------  .byte $DD
  0x02106D $905D: ------  .byte $A2
  0x02106E $905E: ------  .byte $FA
  0x02106F $905F: ------  .byte $5C
  0x021070 $9060: ------  .byte $9F
  0x021071 $9061: ------  .byte $F2
  0x021072 $9062: ------  .byte $40
  0x021073 $9063: ------  .byte $A2
  0x021074 $9064: ------  .byte $FA
  0x021075 $9065: ------  .byte $E0
  0x021076 $9066: ------  .byte $A6
  0x021077 $9067: ------  .byte $FA
  0x021078 $9068: ------  .byte $8F
  0x021079 $9069: ------  .byte $A3
  0x02107A $906A: ------  .byte $FA
  0x02107B $906B: ------  .byte $3B
  0x02107C $906C: ------  .byte $A0
  0x02107D $906D: ------  .byte $FA
  0x02107E $906E: ------  .byte $DD
  0x02107F $906F: ------  .byte $A2
  0x021080 $9070: ------  .byte $FA
  0x021081 $9071: ------  .byte $5C
  0x021082 $9072: ------  .byte $9F
  0x021083 $9073: ------  .byte $F2
  0x021084 $9074: ------  .byte $71
  0x021085 $9075: ------  .byte $A3
  0x021086 $9076: -D0-I-  .byte $F3 ; <indirect ref>
  0x021087 $9077: -D0-I-  .byte $C6 ; <indirect ref>
  0x021088 $9078: -D0-I-  .byte $49 ; <indirect ref>
  0x021089 $9079: -D0-I-  .byte $BF ; <indirect ref>
  0x02108A $907A: ------  .byte $F3
  0x02108B $907B: ------  .byte $83
  0x02108C $907C: ------  .byte $05
  0x02108D $907D: ------  .byte $14
  0x02108E $907E: ------  .byte $25
  0x02108F $907F: ------  .byte $36
  0x021090 $9080: ------  .byte $10
  0x021091 $9081: ------  .byte $FA
  0x021092 $9082: ------  .byte $7F
  0x021093 $9083: ------  .byte $9C
  0x021094 $9084: ------  .byte $FA
  0x021095 $9085: ------  .byte $8F
  0x021096 $9086: ------  .byte $A3
  0x021097 $9087: ------  .byte $FA
  0x021098 $9088: ------  .byte $04
  0x021099 $9089: ------  .byte $A0
  0x02109A $908A: ------  .byte $FA
  0x02109B $908B: ------  .byte $DD
  0x02109C $908C: ------  .byte $A2
  0x02109D $908D: ------  .byte $FA
  0x02109E $908E: ------  .byte $62
  0x02109F $908F: ------  .byte $9F
  0x0210A0 $9090: ------  .byte $F0
  0x0210A1 $9091: ------  .byte $FA
  0x0210A2 $9092: ------  .byte $7F
  0x0210A3 $9093: ------  .byte $9C
  0x0210A4 $9094: ------  .byte $FA
  0x0210A5 $9095: ------  .byte $8F
  0x0210A6 $9096: ------  .byte $A3
  0x0210A7 $9097: ------  .byte $FA
  0x0210A8 $9098: ------  .byte $04
  0x0210A9 $9099: ------  .byte $A0
  0x0210AA $909A: ------  .byte $FA
  0x0210AB $909B: ------  .byte $DD
  0x0210AC $909C: ------  .byte $A2
  0x0210AD $909D: ------  .byte $FA
  0x0210AE $909E: ------  .byte $5C
  0x0210AF $909F: ------  .byte $9F
  0x0210B0 $90A0: ------  .byte $F2
  0x0210B1 $90A1: ------  .byte $40
  0x0210B2 $90A2: ------  .byte $A2
  0x0210B3 $90A3: ------  .byte $FA
  0x0210B4 $90A4: ------  .byte $7F
  0x0210B5 $90A5: ------  .byte $9C
  0x0210B6 $90A6: ------  .byte $FA
  0x0210B7 $90A7: ------  .byte $8F
  0x0210B8 $90A8: ------  .byte $A3
  0x0210B9 $90A9: ------  .byte $FA
  0x0210BA $90AA: ------  .byte $04
  0x0210BB $90AB: ------  .byte $A0
  0x0210BC $90AC: ------  .byte $FA
  0x0210BD $90AD: ------  .byte $DD
  0x0210BE $90AE: ------  .byte $A2
  0x0210BF $90AF: ------  .byte $FA
  0x0210C0 $90B0: ------  .byte $5C
  0x0210C1 $90B1: ------  .byte $9F
  0x0210C2 $90B2: ------  .byte $F2
  0x0210C3 $90B3: ------  .byte $71
  0x0210C4 $90B4: ------  .byte $A3
  0x0210C5 $90B5: ------  .byte $FA
  0x0210C6 $90B6: ------  .byte $7F
  0x0210C7 $90B7: ------  .byte $9C
  0x0210C8 $90B8: ------  .byte $FA
  0x0210C9 $90B9: ------  .byte $8F
  0x0210CA $90BA: ------  .byte $A3
  0x0210CB $90BB: ------  .byte $FA
  0x0210CC $90BC: ------  .byte $DD
  0x0210CD $90BD: ------  .byte $A2
  0x0210CE $90BE: ------  .byte $F2
  0x0210CF $90BF: ------  .byte $64
  0x0210D0 $90C0: ------  .byte $A1
  0x0210D1 $90C1: -D0-I-  .byte $F3 ; <indirect ref>
  0x0210D2 $90C2: -D0-I-  .byte $82 ; <indirect ref>
  0x0210D3 $90C3: -D0-I-  .byte $03 ; <indirect ref>
  0x0210D4 $90C4: -D0-I-  .byte $28 ; <indirect ref>
  0x0210D5 $90C5: -D0-I-  .byte $4D ; <indirect ref>
  0x0210D6 $90C6: -D0-I-  .byte $F3 ; <indirect ref>
  0x0210D7 $90C7: -D0-I-  .byte $83 ; <indirect ref>
  0x0210D8 $90C8: -D0-I-  .byte $11 ; <indirect ref>
  0x0210D9 $90C9: -D0-I-  .byte $04 ; <indirect ref>
  0x0210DA $90CA: -D0-I-  .byte $10 ; <indirect ref>
  0x0210DB $90CB: ------  .byte $1B
  0x0210DC $90CC: ------  .byte $0D
  0x0210DD $90CD: -D0-I-  .byte $FA ; <indirect ref>
  0x0210DE $90CE: -D0-I-  .byte $9E ; <indirect ref>
  0x0210DF $90CF: -D0-I-  .byte $A3 ; <indirect ref>
  0x0210E0 $90D0: -D0-I-  .byte $FA ; <indirect ref>
  0x0210E1 $90D1: -D0-I-  .byte $34 ; <indirect ref>
  0x0210E2 $90D2: -D0-I-  .byte $A0 ; <indirect ref>
  0x0210E3 $90D3: -D0-I-  .byte $FA ; <indirect ref>
  0x0210E4 $90D4: -D0-I-  .byte $25 ; <indirect ref>
  0x0210E5 $90D5: -D0-I-  .byte $A0 ; <indirect ref>
  0x0210E6 $90D6: -D0-I-  .byte $FA ; <indirect ref>
  0x0210E7 $90D7: -D0-I-  .byte $15 ; <indirect ref>
  0x0210E8 $90D8: -D0-I-  .byte $A0 ; <indirect ref>
  0x0210E9 $90D9: -D0-I-  .byte $F0 ; <indirect ref>
  0x0210EA $90DA: -D0-I-  .byte $FA ; <indirect ref>
  0x0210EB $90DB: -D0-I-  .byte $9E ; <indirect ref>
  0x0210EC $90DC: -D0-I-  .byte $A3 ; <indirect ref>
  0x0210ED $90DD: -D0-I-  .byte $FA ; <indirect ref>
  0x0210EE $90DE: -D0-I-  .byte $3B ; <indirect ref>
  0x0210EF $90DF: -D0-I-  .byte $A0 ; <indirect ref>
  0x0210F0 $90E0: -D0-I-  .byte $FA ; <indirect ref>
  0x0210F1 $90E1: -D0-I-  .byte $23 ; <indirect ref>
  0x0210F2 $90E2: -D0-I-  .byte $A0 ; <indirect ref>
  0x0210F3 $90E3: -D0-I-  .byte $F2 ; <indirect ref>
  0x0210F4 $90E4: -D0-I-  .byte $71 ; <indirect ref>
  0x0210F5 $90E5: -D0-I-  .byte $A3 ; <indirect ref>
  0x0210F6 $90E6: ------  .byte $FA
  0x0210F7 $90E7: ------  .byte $9E
  0x0210F8 $90E8: ------  .byte $A3
  0x0210F9 $90E9: ------  .byte $F2
  0x0210FA $90EA: ------  .byte $9F
  0x0210FB $90EB: ------  .byte $A1
  0x0210FC $90EC: -D0-I-  .byte $F3 ; <indirect ref>
  0x0210FD $90ED: -D0-I-  .byte $83 ; <indirect ref>
  0x0210FE $90EE: -D0-I-  .byte $11 ; <indirect ref>
  0x0210FF $90EF: -D0-I-  .byte $04 ; <indirect ref>
  0x021100 $90F0: -D0-I-  .byte $10 ; <indirect ref>
  0x021101 $90F1: ------  .byte $1B
  0x021102 $90F2: ------  .byte $0D
  0x021103 $90F3: -D0-I-  .byte $FA ; <indirect ref>
  0x021104 $90F4: -D0-I-  .byte $94 ; <indirect ref>
  0x021105 $90F5: -D0-I-  .byte $A3 ; <indirect ref>
  0x021106 $90F6: -D0-I-  .byte $FA ; <indirect ref>
  0x021107 $90F7: -D0-I-  .byte $34 ; <indirect ref>
  0x021108 $90F8: -D0-I-  .byte $A0 ; <indirect ref>
  0x021109 $90F9: -D0-I-  .byte $FA ; <indirect ref>
  0x02110A $90FA: -D0-I-  .byte $25 ; <indirect ref>
  0x02110B $90FB: -D0-I-  .byte $A0 ; <indirect ref>
  0x02110C $90FC: -D0-I-  .byte $FA ; <indirect ref>
  0x02110D $90FD: -D0-I-  .byte $15 ; <indirect ref>
  0x02110E $90FE: -D0-I-  .byte $A0 ; <indirect ref>
  0x02110F $90FF: -D0-I-  .byte $F0 ; <indirect ref>
  0x021110 $9100: -D0-I-  .byte $FA ; <indirect ref>
  0x021111 $9101: -D0-I-  .byte $94 ; <indirect ref>
  0x021112 $9102: -D0-I-  .byte $A3 ; <indirect ref>
  0x021113 $9103: -D0-I-  .byte $FA ; <indirect ref>
  0x021114 $9104: -D0-I-  .byte $3B ; <indirect ref>
  0x021115 $9105: -D0-I-  .byte $A0 ; <indirect ref>
  0x021116 $9106: -D0-I-  .byte $FA ; <indirect ref>
  0x021117 $9107: -D0-I-  .byte $23 ; <indirect ref>
  0x021118 $9108: -D0-I-  .byte $A0 ; <indirect ref>
  0x021119 $9109: -D0-I-  .byte $F2 ; <indirect ref>
  0x02111A $910A: -D0-I-  .byte $71 ; <indirect ref>
  0x02111B $910B: -D0-I-  .byte $A3 ; <indirect ref>
  0x02111C $910C: ------  .byte $FA
  0x02111D $910D: ------  .byte $94
  0x02111E $910E: ------  .byte $A3
  0x02111F $910F: ------  .byte $F2
  0x021120 $9110: ------  .byte $7B
  0x021121 $9111: ------  .byte $A1
  0x021122 $9112: -D0-I-  .byte $F3 ; <indirect ref>
  0x021123 $9113: -D0-I-  .byte $83 ; <indirect ref>
  0x021124 $9114: -D0-I-  .byte $11 ; <indirect ref>
  0x021125 $9115: -D0-I-  .byte $04 ; <indirect ref>
  0x021126 $9116: -D0-I-  .byte $10 ; <indirect ref>
  0x021127 $9117: -D0-I-  .byte $1B ; <indirect ref>
  0x021128 $9118: ------  .byte $0D
  0x021129 $9119: -D0-I-  .byte $FA ; <indirect ref>
  0x02112A $911A: -D0-I-  .byte $99 ; <indirect ref>
  0x02112B $911B: -D0-I-  .byte $A3 ; <indirect ref>
  0x02112C $911C: -D0-I-  .byte $FA ; <indirect ref>
  0x02112D $911D: -D0-I-  .byte $FD ; <indirect ref>
  0x02112E $911E: -D0-I-  .byte $9F ; <indirect ref>
  0x02112F $911F: -D0-I-  .byte $FA ; <indirect ref>
  0x021130 $9120: -D0-I-  .byte $F3 ; <indirect ref>
  0x021131 $9121: -D0-I-  .byte $9F ; <indirect ref>
  0x021132 $9122: -D0-I-  .byte $FA ; <indirect ref>
  0x021133 $9123: -D0-I-  .byte $DE ; <indirect ref>
  0x021134 $9124: -D0-I-  .byte $9F ; <indirect ref>
  0x021135 $9125: -D0-I-  .byte $F0 ; <indirect ref>
  0x021136 $9126: -D0-I-  .byte $FA ; <indirect ref>
  0x021137 $9127: -D0-I-  .byte $99 ; <indirect ref>
  0x021138 $9128: -D0-I-  .byte $A3 ; <indirect ref>
  0x021139 $9129: -D0-I-  .byte $FA ; <indirect ref>
  0x02113A $912A: -D0-I-  .byte $04 ; <indirect ref>
  0x02113B $912B: -D0-I-  .byte $A0 ; <indirect ref>
  0x02113C $912C: -D0-I-  .byte $FA ; <indirect ref>
  0x02113D $912D: -D0-I-  .byte $F1 ; <indirect ref>
  0x02113E $912E: -D0-I-  .byte $9F ; <indirect ref>
  0x02113F $912F: -D0-I-  .byte $F2 ; <indirect ref>
  0x021140 $9130: -D0-I-  .byte $71 ; <indirect ref>
  0x021141 $9131: -D0-I-  .byte $A3 ; <indirect ref>
  0x021142 $9132: -D0-I-  .byte $FA ; <indirect ref>
  0x021143 $9133: -D0-I-  .byte $99 ; <indirect ref>
  0x021144 $9134: -D0-I-  .byte $A3 ; <indirect ref>
  0x021145 $9135: -D0-I-  .byte $F2 ; <indirect ref>
  0x021146 $9136: -D0-I-  .byte $64 ; <indirect ref>
  0x021147 $9137: -D0-I-  .byte $A1 ; <indirect ref>
  0x021148 $9138: -D0-I-  .byte $F3 ; <indirect ref>
  0x021149 $9139: -D0-I-  .byte $82 ; <indirect ref>
  0x02114A $913A: ------  .byte $03
  0x02114B $913B: -D0-I-  .byte $34 ; <indirect ref>
  0x02114C $913C: -D0-I-  .byte $65 ; <indirect ref>
  0x02114D $913D: ------  .byte $F3
  0x02114E $913E: ------  .byte $83
  0x02114F $913F: ------  .byte $05
  0x021150 $9140: ------  .byte $11
  0x021151 $9141: ------  .byte $1F
  0x021152 $9142: ------  .byte $0E
  0x021153 $9143: ------  .byte $0D
  0x021154 $9144: ------  .byte $FA
  0x021155 $9145: ------  .byte $9E
  0x021156 $9146: ------  .byte $A3
  0x021157 $9147: ------  .byte $FA
  0x021158 $9148: ------  .byte $3B
  0x021159 $9149: ------  .byte $A0
  0x02115A $914A: ------  .byte $FA
  0x02115B $914B: ------  .byte $DD
  0x02115C $914C: ------  .byte $A2
  0x02115D $914D: ------  .byte $FA
  0x02115E $914E: ------  .byte $62
  0x02115F $914F: ------  .byte $9F
  0x021160 $9150: ------  .byte $F0
  0x021161 $9151: ------  .byte $FA
  0x021162 $9152: ------  .byte $9E
  0x021163 $9153: ------  .byte $A3
  0x021164 $9154: ------  .byte $FA
  0x021165 $9155: ------  .byte $3B
  0x021166 $9156: ------  .byte $A0
  0x021167 $9157: ------  .byte $FA
  0x021168 $9158: ------  .byte $DD
  0x021169 $9159: ------  .byte $A2
  0x02116A $915A: ------  .byte $FA
  0x02116B $915B: ------  .byte $5C
  0x02116C $915C: ------  .byte $9F
  0x02116D $915D: ------  .byte $F2
  0x02116E $915E: ------  .byte $40
  0x02116F $915F: ------  .byte $A2
  0x021170 $9160: ------  .byte $FA
  0x021171 $9161: ------  .byte $9E
  0x021172 $9162: ------  .byte $A3
  0x021173 $9163: ------  .byte $FA
  0x021174 $9164: ------  .byte $3B
  0x021175 $9165: ------  .byte $A0
  0x021176 $9166: ------  .byte $FA
  0x021177 $9167: ------  .byte $DD
  0x021178 $9168: ------  .byte $A2
  0x021179 $9169: ------  .byte $FA
  0x02117A $916A: ------  .byte $5C
  0x02117B $916B: ------  .byte $9F
  0x02117C $916C: ------  .byte $F2
  0x02117D $916D: ------  .byte $71
  0x02117E $916E: ------  .byte $A3
  0x02117F $916F: -D0-I-  .byte $F3 ; <indirect ref>
  0x021180 $9170: -D0-I-  .byte $83 ; <indirect ref>
  0x021181 $9171: -D0-I-  .byte $05 ; <indirect ref>
  0x021182 $9172: ------  .byte $11
  0x021183 $9173: ------  .byte $1F
  0x021184 $9174: ------  .byte $0E
  0x021185 $9175: ------  .byte $0D
  0x021186 $9176: -D0-I-  .byte $FA ; <indirect ref>
  0x021187 $9177: -D0-I-  .byte $94 ; <indirect ref>
  0x021188 $9178: -D0-I-  .byte $A3 ; <indirect ref>
  0x021189 $9179: -D0-I-  .byte $FA ; <indirect ref>
  0x02118A $917A: -D0-I-  .byte $3B ; <indirect ref>
  0x02118B $917B: -D0-I-  .byte $A0 ; <indirect ref>
  0x02118C $917C: -D0-I-  .byte $FA ; <indirect ref>
  0x02118D $917D: -D0-I-  .byte $DD ; <indirect ref>
  0x02118E $917E: -D0-I-  .byte $A2 ; <indirect ref>
  0x02118F $917F: -D0-I-  .byte $FA ; <indirect ref>
  0x021190 $9180: -D0-I-  .byte $62 ; <indirect ref>
  0x021191 $9181: -D0-I-  .byte $9F ; <indirect ref>
  0x021192 $9182: -D0-I-  .byte $F0 ; <indirect ref>
  0x021193 $9183: ------  .byte $FA
  0x021194 $9184: ------  .byte $94
  0x021195 $9185: ------  .byte $A3
  0x021196 $9186: ------  .byte $FA
  0x021197 $9187: ------  .byte $3B
  0x021198 $9188: ------  .byte $A0
  0x021199 $9189: ------  .byte $FA
  0x02119A $918A: ------  .byte $DD
  0x02119B $918B: ------  .byte $A2
  0x02119C $918C: ------  .byte $FA
  0x02119D $918D: ------  .byte $5C
  0x02119E $918E: ------  .byte $9F
  0x02119F $918F: ------  .byte $F2
  0x0211A0 $9190: ------  .byte $40
  0x0211A1 $9191: ------  .byte $A2
  0x0211A2 $9192: ------  .byte $FA
  0x0211A3 $9193: ------  .byte $94
  0x0211A4 $9194: ------  .byte $A3
  0x0211A5 $9195: ------  .byte $FA
  0x0211A6 $9196: ------  .byte $3B
  0x0211A7 $9197: ------  .byte $A0
  0x0211A8 $9198: ------  .byte $FA
  0x0211A9 $9199: ------  .byte $DD
  0x0211AA $919A: ------  .byte $A2
  0x0211AB $919B: ------  .byte $FA
  0x0211AC $919C: ------  .byte $5C
  0x0211AD $919D: ------  .byte $9F
  0x0211AE $919E: ------  .byte $F2
  0x0211AF $919F: ------  .byte $71
  0x0211B0 $91A0: ------  .byte $A3
  0x0211B1 $91A1: -D0-I-  .byte $F3 ; <indirect ref>
  0x0211B2 $91A2: -D0-I-  .byte $83 ; <indirect ref>
  0x0211B3 $91A3: -D0-I-  .byte $05 ; <indirect ref>
  0x0211B4 $91A4: ------  .byte $11
  0x0211B5 $91A5: ------  .byte $1F
  0x0211B6 $91A6: ------  .byte $0E
  0x0211B7 $91A7: ------  .byte $0D
  0x0211B8 $91A8: -D0-I-  .byte $FA ; <indirect ref>
  0x0211B9 $91A9: -D0-I-  .byte $99 ; <indirect ref>
  0x0211BA $91AA: -D0-I-  .byte $A3 ; <indirect ref>
  0x0211BB $91AB: -D0-I-  .byte $FA ; <indirect ref>
  0x0211BC $91AC: -D0-I-  .byte $04 ; <indirect ref>
  0x0211BD $91AD: -D0-I-  .byte $A0 ; <indirect ref>
  0x0211BE $91AE: -D0-I-  .byte $FA ; <indirect ref>
  0x0211BF $91AF: -D0-I-  .byte $DD ; <indirect ref>
  0x0211C0 $91B0: -D0-I-  .byte $A2 ; <indirect ref>
  0x0211C1 $91B1: -D0-I-  .byte $FA ; <indirect ref>
  0x0211C2 $91B2: -D0-I-  .byte $62 ; <indirect ref>
  0x0211C3 $91B3: -D0-I-  .byte $9F ; <indirect ref>
  0x0211C4 $91B4: -D0-I-  .byte $F0 ; <indirect ref>
  0x0211C5 $91B5: ------  .byte $FA
  0x0211C6 $91B6: ------  .byte $99
  0x0211C7 $91B7: ------  .byte $A3
  0x0211C8 $91B8: ------  .byte $FA
  0x0211C9 $91B9: ------  .byte $04
  0x0211CA $91BA: ------  .byte $A0
  0x0211CB $91BB: ------  .byte $FA
  0x0211CC $91BC: ------  .byte $DD
  0x0211CD $91BD: ------  .byte $A2
  0x0211CE $91BE: ------  .byte $FA
  0x0211CF $91BF: ------  .byte $5C
  0x0211D0 $91C0: ------  .byte $9F
  0x0211D1 $91C1: ------  .byte $F2
  0x0211D2 $91C2: ------  .byte $40
  0x0211D3 $91C3: ------  .byte $A2
  0x0211D4 $91C4: ------  .byte $FA
  0x0211D5 $91C5: ------  .byte $99
  0x0211D6 $91C6: ------  .byte $A3
  0x0211D7 $91C7: ------  .byte $FA
  0x0211D8 $91C8: ------  .byte $04
  0x0211D9 $91C9: ------  .byte $A0
  0x0211DA $91CA: ------  .byte $FA
  0x0211DB $91CB: ------  .byte $DD
  0x0211DC $91CC: ------  .byte $A2
  0x0211DD $91CD: ------  .byte $FA
  0x0211DE $91CE: ------  .byte $5C
  0x0211DF $91CF: ------  .byte $9F
  0x0211E0 $91D0: ------  .byte $F2
  0x0211E1 $91D1: ------  .byte $71
  0x0211E2 $91D2: ------  .byte $A3
  0x0211E3 $91D3: -D0-I-  .byte $F3 ; <indirect ref>
  0x0211E4 $91D4: -D0-I-  .byte $84 ; <indirect ref>
  0x0211E5 $91D5: -D0-I-  .byte $0A ; <indirect ref>
  0x0211E6 $91D6: -D0-I-  .byte $01 ; <indirect ref>
  0x0211E7 $91D7: -D0-I-  .byte $F3 ; <indirect ref>
  0x0211E8 $91D8: -D0-I-  .byte $16 ; <indirect ref>
  0x0211E9 $91D9: -D0-I-  .byte $50 ; <indirect ref>
  0x0211EA $91DA: -D0-I-  .byte $93 ; <indirect ref>
  0x0211EB $91DB: -D0-I-  .byte $5A ; <indirect ref>
  0x0211EC $91DC: -D0-I-  .byte $93 ; <indirect ref>
  0x0211ED $91DD: -D0-I-  .byte $DB ; <indirect ref>
  0x0211EE $91DE: -D0-I-  .byte $9B ; <indirect ref>
  0x0211EF $91DF: -D0-I-  .byte $F3 ; <indirect ref>
  0x0211F0 $91E0: -D0-I-  .byte $16 ; <indirect ref>
  0x0211F1 $91E1: -D0-I-  .byte $3C ; <indirect ref>
  0x0211F2 $91E2: -D0-I-  .byte $93 ; <indirect ref>
  0x0211F3 $91E3: -D0-I-  .byte $41 ; <indirect ref>
  0x0211F4 $91E4: -D0-I-  .byte $93 ; <indirect ref>
  0x0211F5 $91E5: -D0-I-  .byte $DF ; <indirect ref>
  0x0211F6 $91E6: -D0-I-  .byte $9B ; <indirect ref>
  0x0211F7 $91E7: ------  .byte $F2
  0x0211F8 $91E8: ------  .byte $40
  0x0211F9 $91E9: ------  .byte $A2
  0x0211FA $91EA: -D0-I-  .byte $FD ; <indirect ref>
  0x0211FB $91EB: -D0-I-  .byte $01 ; <indirect ref>
  0x0211FC $91EC: -D0-I-  .byte $F3 ; <indirect ref>
  0x0211FD $91ED: -D0-I-  .byte $04 ; <indirect ref>
  0x0211FE $91EE: -D0-I-  .byte $9B ; <indirect ref>
  0x0211FF $91EF: -D0-I-  .byte $B2 ; <indirect ref>
  0x021200 $91F0: -D0-I-  .byte $64 ; <indirect ref>
  0x021201 $91F1: -D0-I-  .byte $AE ; <indirect ref>
  0x021202 $91F2: -D0-I-  .byte $FD ; <indirect ref>
  0x021203 $91F3: -D0-I-  .byte $01 ; <indirect ref>
  0x021204 $91F4: -D0-I-  .byte $F3 ; <indirect ref>
  0x021205 $91F5: -D0-I-  .byte $84 ; <indirect ref>
  0x021206 $91F6: -D0-I-  .byte $02 ; <indirect ref>
  0x021207 $91F7: -D0-I-  .byte $05 ; <indirect ref>
  0x021208 $91F8: -D0-I-  .byte $FA ; <indirect ref>
  0x021209 $91F9: -D0-I-  .byte $E2 ; <indirect ref>
  0x02120A $91FA: -D0-I-  .byte $9D ; <indirect ref>
  0x02120B $91FB: -D0-I-  .byte $F1 ; <indirect ref>
  0x02120C $91FC: -D0-I-  .byte $F2 ; <indirect ref>
  0x02120D $91FD: -D0-I-  .byte $3C ; <indirect ref>
  0x02120E $91FE: -D0-I-  .byte $9D ; <indirect ref>
  0x02120F $91FF: -D0-I-  .byte $FD ; <indirect ref>
  0x021210 $9200: -D0-I-  .byte $01 ; <indirect ref>
  0x021211 $9201: -D0-I-  .byte $F3 ; <indirect ref>
  0x021212 $9202: -D0-I-  .byte $86 ; <indirect ref>
  0x021213 $9203: -D0-I-  .byte $0C ; <indirect ref>
  0x021214 $9204: -D0-I-  .byte $43 ; <indirect ref>
  0x021215 $9205: -D0-I-  .byte $FD ; <indirect ref>
  0x021216 $9206: -D0-I-  .byte $01 ; <indirect ref>
  0x021217 $9207: -D0-I-  .byte $F3 ; <indirect ref>
  0x021218 $9208: -D0-I-  .byte $43 ; <indirect ref>
  0x021219 $9209: -D0-I-  .byte $17 ; <indirect ref>
  0x02121A $920A: -D0-I-  .byte $92 ; <indirect ref>
  0x02121B $920B: -D0-I-  .byte $17 ; <indirect ref>
  0x02121C $920C: -D0-I-  .byte $92 ; <indirect ref>
  0x02121D $920D: -D0-I-  .byte $87 ; <indirect ref>
  0x02121E $920E: -D0-I-  .byte $BD ; <indirect ref>
  0x02121F $920F: -D0-I-  .byte $F3 ; <indirect ref>
  0x021220 $9210: -D0-I-  .byte $35 ; <indirect ref>
  0x021221 $9211: -D0-I-  .byte $17 ; <indirect ref>
  0x021222 $9212: -D0-I-  .byte $92 ; <indirect ref>
  0x021223 $9213: -D0-I-  .byte $17 ; <indirect ref>
  0x021224 $9214: -D0-I-  .byte $92 ; <indirect ref>
  0x021225 $9215: -D0-I-  .byte $87 ; <indirect ref>
  0x021226 $9216: -D0-I-  .byte $BD ; <indirect ref>
  0x021227 $9217: -D0-I-  .byte $F3 ; <indirect ref>
  0x021228 $9218: -D0-I-  .byte $84 ; <indirect ref>
  0x021229 $9219: -D0-I-  .byte $02 ; <indirect ref>
  0x02122A $921A: -D0-I-  .byte $17 ; <indirect ref>
  0x02122B $921B: -D0-I-  .byte $F3 ; <indirect ref>
  0x02122C $921C: -D0-I-  .byte $85 ; <indirect ref>
  0x02122D $921D: -D0-I-  .byte $05 ; <indirect ref>
  0x02122E $921E: -D0-I-  .byte $07 ; <indirect ref>
  0x02122F $921F: -D0-I-  .byte $09 ; <indirect ref>
  0x021230 $9220: -D0-I-  .byte $0B ; <indirect ref>
  0x021231 $9221: -D0-I-  .byte $0D ; <indirect ref>
  0x021232 $9222: -D0-I-  .byte $F2 ; <indirect ref>
  0x021233 $9223: -D0-I-  .byte $85 ; <indirect ref>
  0x021234 $9224: -D0-I-  .byte $9C ; <indirect ref>
  0x021235 $9225: -D0-I-  .byte $F2 ; <indirect ref>
  0x021236 $9226: -D0-I-  .byte $91 ; <indirect ref>
  0x021237 $9227: -D0-I-  .byte $9C ; <indirect ref>
  0x021238 $9228: -D0-I-  .byte $F2 ; <indirect ref>
  0x021239 $9229: -D0-I-  .byte $9D ; <indirect ref>
  0x02123A $922A: -D0-I-  .byte $9C ; <indirect ref>
  0x02123B $922B: -D0-I-  .byte $F2 ; <indirect ref>
  0x02123C $922C: -D0-I-  .byte $97 ; <indirect ref>
  0x02123D $922D: -D0-I-  .byte $9C ; <indirect ref>
  0x02123E $922E: -D0-I-  .byte $F2 ; <indirect ref>
  0x02123F $922F: -D0-I-  .byte $91 ; <indirect ref>
  0x021240 $9230: -D0-I-  .byte $9C ; <indirect ref>
  0x021241 $9231: -D0-I-  .byte $F3 ; <indirect ref>
  0x021242 $9232: -D0-I-  .byte $85 ; <indirect ref>
  0x021243 $9233: -D0-I-  .byte $05 ; <indirect ref>
  0x021244 $9234: -D0-I-  .byte $07 ; <indirect ref>
  0x021245 $9235: -D0-I-  .byte $09 ; <indirect ref>
  0x021246 $9236: -D0-I-  .byte $0B ; <indirect ref>
  0x021247 $9237: -D0-I-  .byte $0D ; <indirect ref>
  0x021248 $9238: -D0-I-  .byte $F2 ; <indirect ref>
  0x021249 $9239: -D0-I-  .byte $61 ; <indirect ref>
  0x02124A $923A: -D0-I-  .byte $9C ; <indirect ref>
  0x02124B $923B: -D0-I-  .byte $F2 ; <indirect ref>
  0x02124C $923C: -D0-I-  .byte $6D ; <indirect ref>
  0x02124D $923D: -D0-I-  .byte $9C ; <indirect ref>
  0x02124E $923E: -D0-I-  .byte $F2 ; <indirect ref>
  0x02124F $923F: -D0-I-  .byte $73 ; <indirect ref>
  0x021250 $9240: -D0-I-  .byte $9C ; <indirect ref>
  0x021251 $9241: -D0-I-  .byte $F2 ; <indirect ref>
  0x021252 $9242: -D0-I-  .byte $67 ; <indirect ref>
  0x021253 $9243: -D0-I-  .byte $9C ; <indirect ref>
  0x021254 $9244: -D0-I-  .byte $F2 ; <indirect ref>
  0x021255 $9245: -D0-I-  .byte $6D ; <indirect ref>
  0x021256 $9246: -D0-I-  .byte $9C ; <indirect ref>
  0x021257 $9247: -D0-I-  .byte $FD ; <indirect ref>
  0x021258 $9248: -D0-I-  .byte $03 ; <indirect ref>
  0x021259 $9249: -D0-I-  .byte $F3 ; <indirect ref>
  0x02125A $924A: -D0-I-  .byte $44 ; <indirect ref>
  0x02125B $924B: -D0-I-  .byte $4F ; <indirect ref>
  0x02125C $924C: -D0-I-  .byte $92 ; <indirect ref>
  0x02125D $924D: -D0-I-  .byte $90 ; <indirect ref>
  0x02125E $924E: -D0-I-  .byte $BD ; <indirect ref>
  0x02125F $924F: -D0-I-  .byte $F3 ; <indirect ref>
  0x021260 $9250: -D0-I-  .byte $84 ; <indirect ref>
  0x021261 $9251: -D0-I-  .byte $02 ; <indirect ref>
  0x021262 $9252: -D0-I-  .byte $04 ; <indirect ref>
  0x021263 $9253: -D0-I-  .byte $F2 ; <indirect ref>
  0x021264 $9254: -D0-I-  .byte $AB ; <indirect ref>
  0x021265 $9255: -D0-I-  .byte $A3 ; <indirect ref>
  0x021266 $9256: -D0-I-  .byte $F2 ; <indirect ref>
  0x021267 $9257: -D0-I-  .byte $A3 ; <indirect ref>
  0x021268 $9258: -D0-I-  .byte $A3 ; <indirect ref>
  0x021269 $9259: -D0-I-  .byte $FD ; <indirect ref>
  0x02126A $925A: -D0-I-  .byte $01 ; <indirect ref>
  0x02126B $925B: -D0-I-  .byte $F3 ; <indirect ref>
  0x02126C $925C: -D0-I-  .byte $81 ; <indirect ref>
  0x02126D $925D: -D0-I-  .byte $05 ; <indirect ref>
  0x02126E $925E: -D0-I-  .byte $01 ; <indirect ref>
  0x02126F $925F: -D0-I-  .byte $FA ; <indirect ref>
  0x021270 $9260: -D0-I-  .byte $6E ; <indirect ref>
  0x021271 $9261: -D0-I-  .byte $9F ; <indirect ref>
  0x021272 $9262: -D0-I-  .byte $F0 ; <indirect ref>
  0x021273 $9263: -D0-I-  .byte $FD ; <indirect ref>
  0x021274 $9264: -D0-I-  .byte $01 ; <indirect ref>
  0x021275 $9265: -D0-I-  .byte $F3 ; <indirect ref>
  0x021276 $9266: -D0-I-  .byte $86 ; <indirect ref>
  0x021277 $9267: -D0-I-  .byte $02 ; <indirect ref>
  0x021278 $9268: -D0-I-  .byte $0D ; <indirect ref>
  0x021279 $9269: -D0-I-  .byte $FD ; <indirect ref>
  0x02127A $926A: -D0-I-  .byte $01 ; <indirect ref>
  0x02127B $926B: -D0-I-  .byte $F3 ; <indirect ref>
  0x02127C $926C: -D0-I-  .byte $81 ; <indirect ref>
  0x02127D $926D: -D0-I-  .byte $07 ; <indirect ref>
  0x02127E $926E: -D0-I-  .byte $01 ; <indirect ref>
  0x02127F $926F: -D0-I-  .byte $FD ; <indirect ref>
  0x021280 $9270: -D0-I-  .byte $01 ; <indirect ref>
  0x021281 $9271: -D0-I-  .byte $FA ; <indirect ref>
  0x021282 $9272: -D0-I-  .byte $62 ; <indirect ref>
  0x021283 $9273: -D0-I-  .byte $9F ; <indirect ref>
  0x021284 $9274: -D0-I-  .byte $F0 ; <indirect ref>
  0x021285 $9275: -D0-I-  .byte $F3 ; <indirect ref>
  0x021286 $9276: -D0-I-  .byte $81 ; <indirect ref>
  0x021287 $9277: -D0-I-  .byte $07 ; <indirect ref>
  0x021288 $9278: -D0-I-  .byte $01 ; <indirect ref>
  0x021289 $9279: -D0-I-  .byte $FD ; <indirect ref>
  0x02128A $927A: -D0-I-  .byte $01 ; <indirect ref>
  0x02128B $927B: -D0-I-  .byte $FA ; <indirect ref>
  0x02128C $927C: -D0-I-  .byte $B5 ; <indirect ref>
  0x02128D $927D: -D0-I-  .byte $9F ; <indirect ref>
  0x02128E $927E: -D0-I-  .byte $F0 ; <indirect ref>
  0x02128F $927F: -D0-I-  .byte $FD ; <indirect ref>
  0x021290 $9280: -D0-I-  .byte $03 ; <indirect ref>
  0x021291 $9281: -D0-I-  .byte $F3 ; <indirect ref>
  0x021292 $9282: -D0-I-  .byte $84 ; <indirect ref>
  0x021293 $9283: -D0-I-  .byte $08 ; <indirect ref>
  0x021294 $9284: -D0-I-  .byte $0F ; <indirect ref>
  0x021295 $9285: -D0-I-  .byte $FD ; <indirect ref>
  0x021296 $9286: -D0-I-  .byte $03 ; <indirect ref>
  0x021297 $9287: -D0-I-  .byte $F3 ; <indirect ref>
  0x021298 $9288: -D0-I-  .byte $84 ; <indirect ref>
  0x021299 $9289: -D0-I-  .byte $06 ; <indirect ref>
  0x02129A $928A: -D0-I-  .byte $0D ; <indirect ref>
  0x02129B $928B: -D0-I-  .byte $F3 ; <indirect ref>
  0x02129C $928C: -D0-I-  .byte $81 ; <indirect ref>
  0x02129D $928D: -D0-I-  .byte $0E ; <indirect ref>
  0x02129E $928E: -D0-I-  .byte $17 ; <indirect ref>
  0x02129F $928F: -D0-I-  .byte $F3 ; <indirect ref>
  0x0212A0 $9290: -D0-I-  .byte $81 ; <indirect ref>
  0x0212A1 $9291: -D0-I-  .byte $4A ; <indirect ref>
  0x0212A2 $9292: -D0-I-  .byte $50 ; <indirect ref>
  0x0212A3 $9293: -D0-I-  .byte $F3 ; <indirect ref>
  0x0212A4 $9294: -D0-I-  .byte $81 ; <indirect ref>
  0x0212A5 $9295: -D0-I-  .byte $1A ; <indirect ref>
  0x0212A6 $9296: -D0-I-  .byte $23 ; <indirect ref>
  0x0212A7 $9297: -D0-I-  .byte $F3 ; <indirect ref>
  0x0212A8 $9298: -D0-I-  .byte $81 ; <indirect ref>
  0x0212A9 $9299: -D0-I-  .byte $50 ; <indirect ref>
  0x0212AA $929A: -D0-I-  .byte $56 ; <indirect ref>
  0x0212AB $929B: -D0-I-  .byte $F3 ; <indirect ref>
  0x0212AC $929C: -D0-I-  .byte $14 ; <indirect ref>
  0x0212AD $929D: -D0-I-  .byte $CE ; <indirect ref>
  0x0212AE $929E: -D0-I-  .byte $9B ; <indirect ref>
  0x0212AF $929F: -D0-I-  .byte $CE ; <indirect ref>
  0x0212B0 $92A0: -D0-I-  .byte $9B ; <indirect ref>
  0x0212B1 $92A1: -D0-I-  .byte $0B ; <indirect ref>
  0x0212B2 $92A2: -D0-I-  .byte $93 ; <indirect ref>
  0x0212B3 $92A3: -D0-I-  .byte $C3 ; <indirect ref>
  0x0212B4 $92A4: -D0-I-  .byte $92 ; <indirect ref>
  0x0212B5 $92A5: -D0-I-  .byte $F3 ; <indirect ref>
  0x0212B6 $92A6: -D0-I-  .byte $14 ; <indirect ref>
  0x0212B7 $92A7: ------  .byte $CE
  0x0212B8 $92A8: ------  .byte $9B
  0x0212B9 $92A9: -D0-I-  .byte $CE ; <indirect ref>
  0x0212BA $92AA: -D0-I-  .byte $9B ; <indirect ref>
  0x0212BB $92AB: -D0-I-  .byte $0B ; <indirect ref>
  0x0212BC $92AC: -D0-I-  .byte $93 ; <indirect ref>
  0x0212BD $92AD: -D0-I-  .byte $C9 ; <indirect ref>
  0x0212BE $92AE: -D0-I-  .byte $92 ; <indirect ref>
  0x0212BF $92AF: -D0-I-  .byte $F3 ; <indirect ref>
  0x0212C0 $92B0: -D0-I-  .byte $14 ; <indirect ref>
  0x0212C1 $92B1: -D0-I-  .byte $CE ; <indirect ref>
  0x0212C2 $92B2: -D0-I-  .byte $9B ; <indirect ref>
  0x0212C3 $92B3: -D0-I-  .byte $CE ; <indirect ref>
  0x0212C4 $92B4: -D0-I-  .byte $9B ; <indirect ref>
  0x0212C5 $92B5: -D0-I-  .byte $0B ; <indirect ref>
  0x0212C6 $92B6: -D0-I-  .byte $93 ; <indirect ref>
  0x0212C7 $92B7: -D0-I-  .byte $CF ; <indirect ref>
  0x0212C8 $92B8: -D0-I-  .byte $92 ; <indirect ref>
  0x0212C9 $92B9: -D0-I-  .byte $F3 ; <indirect ref>
  0x0212CA $92BA: -D0-I-  .byte $14 ; <indirect ref>
  0x0212CB $92BB: -D0-I-  .byte $CE ; <indirect ref>
  0x0212CC $92BC: -D0-I-  .byte $9B ; <indirect ref>
  0x0212CD $92BD: -D0-I-  .byte $CE ; <indirect ref>
  0x0212CE $92BE: -D0-I-  .byte $9B ; <indirect ref>
  0x0212CF $92BF: -D0-I-  .byte $0B ; <indirect ref>
  0x0212D0 $92C0: -D0-I-  .byte $93 ; <indirect ref>
  0x0212D1 $92C1: -D0-I-  .byte $D5 ; <indirect ref>
  0x0212D2 $92C2: -D0-I-  .byte $92 ; <indirect ref>
  0x0212D3 $92C3: -D0-I-  .byte $F3 ; <indirect ref>
  0x0212D4 $92C4: -D0-I-  .byte $15 ; <indirect ref>
  0x0212D5 $92C5: -D0-I-  .byte $1F ; <indirect ref>
  0x0212D6 $92C6: -D0-I-  .byte $93 ; <indirect ref>
  0x0212D7 $92C7: -D0-I-  .byte $D5 ; <indirect ref>
  0x0212D8 $92C8: -D0-I-  .byte $9B ; <indirect ref>
  0x0212D9 $92C9: -D0-I-  .byte $F3 ; <indirect ref>
  0x0212DA $92CA: -D0-I-  .byte $15 ; <indirect ref>
  0x0212DB $92CB: ------  .byte $1F
  0x0212DC $92CC: ------  .byte $93
  0x0212DD $92CD: -D0-I-  .byte $D5 ; <indirect ref>
  0x0212DE $92CE: -D0-I-  .byte $9B ; <indirect ref>
  0x0212DF $92CF: -D0-I-  .byte $F3 ; <indirect ref>
  0x0212E0 $92D0: -D0-I-  .byte $15 ; <indirect ref>
  0x0212E1 $92D1: -D0-I-  .byte $0F ; <indirect ref>
  0x0212E2 $92D2: -D0-I-  .byte $93 ; <indirect ref>
  0x0212E3 $92D3: -D0-I-  .byte $CF ; <indirect ref>
  0x0212E4 $92D4: -D0-I-  .byte $9B ; <indirect ref>
  0x0212E5 $92D5: -D0-I-  .byte $F3 ; <indirect ref>
  0x0212E6 $92D6: -D0-I-  .byte $15 ; <indirect ref>
  0x0212E7 $92D7: ------  .byte $0F
  0x0212E8 $92D8: ------  .byte $93
  0x0212E9 $92D9: -D0-I-  .byte $CF ; <indirect ref>
  0x0212EA $92DA: -D0-I-  .byte $9B ; <indirect ref>
  0x0212EB $92DB: -D0-I-  .byte $F3 ; <indirect ref>
  0x0212EC $92DC: -D0-I-  .byte $87 ; <indirect ref>
  0x0212ED $92DD: -D0-I-  .byte $31 ; <indirect ref>
  0x0212EE $92DE: -D0-I-  .byte $30 ; <indirect ref>
  0x0212EF $92DF: -D0-I-  .byte $2C ; <indirect ref>
  0x0212F0 $92E0: -D0-I-  .byte $17 ; <indirect ref>
  0x0212F1 $92E1: -D0-I-  .byte $37 ; <indirect ref>
  0x0212F2 $92E2: -D0-I-  .byte $F3 ; <indirect ref>
  0x0212F3 $92E3: -D0-I-  .byte $87 ; <indirect ref>
  0x0212F4 $92E4: -D0-I-  .byte $2A ; <indirect ref>
  0x0212F5 $92E5: -D0-I-  .byte $29 ; <indirect ref>
  0x0212F6 $92E6: -D0-I-  .byte $25 ; <indirect ref>
  0x0212F7 $92E7: -D0-I-  .byte $15 ; <indirect ref>
  0x0212F8 $92E8: -D0-I-  .byte $30 ; <indirect ref>
  0x0212F9 $92E9: -D0-I-  .byte $F3 ; <indirect ref>
  0x0212FA $92EA: -D0-I-  .byte $87 ; <indirect ref>
  0x0212FB $92EB: -D0-I-  .byte $23 ; <indirect ref>
  0x0212FC $92EC: -D0-I-  .byte $22 ; <indirect ref>
  0x0212FD $92ED: -D0-I-  .byte $1E ; <indirect ref>
  0x0212FE $92EE: -D0-I-  .byte $13 ; <indirect ref>
  0x0212FF $92EF: -D0-I-  .byte $29 ; <indirect ref>
  0x021300 $92F0: -D0-I-  .byte $F3 ; <indirect ref>
  0x021301 $92F1: -D0-I-  .byte $87 ; <indirect ref>
  0x021302 $92F2: -D0-I-  .byte $1C ; <indirect ref>
  0x021303 $92F3: -D0-I-  .byte $1B ; <indirect ref>
  0x021304 $92F4: -D0-I-  .byte $17 ; <indirect ref>
  0x021305 $92F5: -D0-I-  .byte $11 ; <indirect ref>
  0x021306 $92F6: -D0-I-  .byte $22 ; <indirect ref>
  0x021307 $92F7: -D0-I-  .byte $F3 ; <indirect ref>
  0x021308 $92F8: -D0-I-  .byte $88 ; <indirect ref>
  0x021309 $92F9: -D0-I-  .byte $26 ; <indirect ref>
  0x02130A $92FA: -D0-I-  .byte $28 ; <indirect ref>
  0x02130B $92FB: -D0-I-  .byte $2A ; <indirect ref>
  0x02130C $92FC: -D0-I-  .byte $F3 ; <indirect ref>
  0x02130D $92FD: -D0-I-  .byte $88 ; <indirect ref>
  0x02130E $92FE: ------  .byte $11
  0x02130F $92FF: -D0-I-  .byte $29 ; <indirect ref>
  0x021310 $9300: -D0-I-  .byte $15 ; <indirect ref>
  0x021311 $9301: -D0-I-  .byte $F3 ; <indirect ref>
  0x021312 $9302: -D0-I-  .byte $88 ; <indirect ref>
  0x021313 $9303: -D0-I-  .byte $0C ; <indirect ref>
  0x021314 $9304: -D0-I-  .byte $0E ; <indirect ref>
  0x021315 $9305: -D0-I-  .byte $10 ; <indirect ref>
  0x021316 $9306: -D0-I-  .byte $F3 ; <indirect ref>
  0x021317 $9307: -D0-I-  .byte $88 ; <indirect ref>
  0x021318 $9308: ------  .byte $07
  0x021319 $9309: -D0-I-  .byte $12 ; <indirect ref>
  0x02131A $930A: -D0-I-  .byte $0B ; <indirect ref>
  0x02131B $930B: -D0-I-  .byte $FA ; <indirect ref>
  0x02131C $930C: -D0-I-  .byte $71 ; <indirect ref>
  0x02131D $930D: -D0-I-  .byte $A3 ; <indirect ref>
  0x02131E $930E: -D0-I-  .byte $F0 ; <indirect ref>
  0x02131F $930F: -D0-I-  .byte $F2 ; <indirect ref>
  0x021320 $9310: -D0-I-  .byte $6E ; <indirect ref>
  0x021321 $9311: -D0-I-  .byte $A1 ; <indirect ref>
  0x021322 $9312: -D0-I-  .byte $F2 ; <indirect ref>
  0x021323 $9313: -D0-I-  .byte $97 ; <indirect ref>
  0x021324 $9314: -D0-I-  .byte $A1 ; <indirect ref>
  0x021325 $9315: -D0-I-  .byte $F2 ; <indirect ref>
  0x021326 $9316: -D0-I-  .byte $83 ; <indirect ref>
  0x021327 $9317: -D0-I-  .byte $A0 ; <indirect ref>
  0x021328 $9318: -D0-I-  .byte $F2 ; <indirect ref>
  0x021329 $9319: -D0-I-  .byte $5B ; <indirect ref>
  0x02132A $931A: -D0-I-  .byte $A3 ; <indirect ref>
  0x02132B $931B: -D0-I-  .byte $FA ; <indirect ref>
  0x02132C $931C: -D0-I-  .byte $97 ; <indirect ref>
  0x02132D $931D: -D0-I-  .byte $A1 ; <indirect ref>
  0x02132E $931E: -D0-I-  .byte $F0 ; <indirect ref>
  0x02132F $931F: -D0-I-  .byte $F2 ; <indirect ref>
  0x021330 $9320: -D0-I-  .byte $64 ; <indirect ref>
  0x021331 $9321: -D0-I-  .byte $A1 ; <indirect ref>
  0x021332 $9322: -D0-I-  .byte $F2 ; <indirect ref>
  0x021333 $9323: -D0-I-  .byte $8D ; <indirect ref>
  0x021334 $9324: -D0-I-  .byte $A1 ; <indirect ref>
  0x021335 $9325: -D0-I-  .byte $F2 ; <indirect ref>
  0x021336 $9326: -D0-I-  .byte $79 ; <indirect ref>
  0x021337 $9327: -D0-I-  .byte $A0 ; <indirect ref>
  0x021338 $9328: -D0-I-  .byte $FA ; <indirect ref>
  0x021339 $9329: -D0-I-  .byte $8D ; <indirect ref>
  0x02133A $932A: -D0-I-  .byte $A1 ; <indirect ref>
  0x02133B $932B: -D0-I-  .byte $F0 ; <indirect ref>
  0x02133C $932C: -D0-I-  .byte $F3 ; <indirect ref>
  0x02133D $932D: -D0-I-  .byte $84 ; <indirect ref>
  0x02133E $932E: -D0-I-  .byte $02 ; <indirect ref>
  0x02133F $932F: -D0-I-  .byte $07 ; <indirect ref>
  0x021340 $9330: -D0-I-  .byte $F3 ; <indirect ref>
  0x021341 $9331: -D0-I-  .byte $89 ; <indirect ref>
  0x021342 $9332: -D0-I-  .byte $14 ; <indirect ref>
  0x021343 $9333: -D0-I-  .byte $09 ; <indirect ref>
  0x021344 $9334: -D0-I-  .byte $0D ; <indirect ref>
  0x021345 $9335: -D0-I-  .byte $16 ; <indirect ref>
  0x021346 $9336: -D0-I-  .byte $F3 ; <indirect ref>
  0x021347 $9337: -D0-I-  .byte $89 ; <indirect ref>
  0x021348 $9338: -D0-I-  .byte $27 ; <indirect ref>
  0x021349 $9339: -D0-I-  .byte $17 ; <indirect ref>
  0x02134A $933A: -D0-I-  .byte $1B ; <indirect ref>
  0x02134B $933B: -D0-I-  .byte $29 ; <indirect ref>
  0x02134C $933C: -D0-I-  .byte $FD ; <indirect ref>
  0x02134D $933D: -D0-I-  .byte $00 ; <indirect ref>
  0x02134E $933E: -D0-I-  .byte $F2 ; <indirect ref>
  0x02134F $933F: -D0-I-  .byte $45 ; <indirect ref>
  0x021350 $9340: -D0-I-  .byte $9E ; <indirect ref>
  0x021351 $9341: -D0-I-  .byte $FD ; <indirect ref>
  0x021352 $9342: -D0-I-  .byte $03 ; <indirect ref>
  0x021353 $9343: -D0-I-  .byte $F2 ; <indirect ref>
  0x021354 $9344: -D0-I-  .byte $C2 ; <indirect ref>
  0x021355 $9345: -D0-I-  .byte $B2 ; <indirect ref>
  0x021356 $9346: -D0-I-  .byte $FD ; <indirect ref>
  0x021357 $9347: -D0-I-  .byte $03 ; <indirect ref>
  0x021358 $9348: -D0-I-  .byte $F2 ; <indirect ref>
  0x021359 $9349: -D0-I-  .byte $9A ; <indirect ref>
  0x02135A $934A: -D0-I-  .byte $9D ; <indirect ref>
  0x02135B $934B: -D0-I-  .byte $FD ; <indirect ref>
  0x02135C $934C: -D0-I-  .byte $03 ; <indirect ref>
  0x02135D $934D: -D0-I-  .byte $F2 ; <indirect ref>
  0x02135E $934E: -D0-I-  .byte $42 ; <indirect ref>
  0x02135F $934F: -D0-I-  .byte $B4 ; <indirect ref>
  0x021360 $9350: -D0-I-  .byte $FD ; <indirect ref>
  0x021361 $9351: -D0-I-  .byte $00 ; <indirect ref>
  0x021362 $9352: -D0-I-  .byte $F2 ; <indirect ref>
  0x021363 $9353: -D0-I-  .byte $4F ; <indirect ref>
  0x021364 $9354: -D0-I-  .byte $9E ; <indirect ref>
  0x021365 $9355: -D0-I-  .byte $FD ; <indirect ref>
  0x021366 $9356: -D0-I-  .byte $03 ; <indirect ref>
  0x021367 $9357: -D0-I-  .byte $F2 ; <indirect ref>
  0x021368 $9358: -D0-I-  .byte $CC ; <indirect ref>
  0x021369 $9359: -D0-I-  .byte $B2 ; <indirect ref>
  0x02136A $935A: -D0-I-  .byte $FD ; <indirect ref>
  0x02136B $935B: -D0-I-  .byte $03 ; <indirect ref>
  0x02136C $935C: -D0-I-  .byte $F2 ; <indirect ref>
  0x02136D $935D: -D0-I-  .byte $D4 ; <indirect ref>
  0x02136E $935E: -D0-I-  .byte $B2 ; <indirect ref>
  0x02136F $935F: -D0-I-  .byte $FD ; <indirect ref>
  0x021370 $9360: -D0-I-  .byte $03 ; <indirect ref>
  0x021371 $9361: -D0-I-  .byte $F2 ; <indirect ref>
  0x021372 $9362: -D0-I-  .byte $52 ; <indirect ref>
  0x021373 $9363: -D0-I-  .byte $9D ; <indirect ref>
  0x021374 $9364: -D0-I-  .byte $FD ; <indirect ref>
  0x021375 $9365: -D0-I-  .byte $03 ; <indirect ref>
  0x021376 $9366: -D0-I-  .byte $F2 ; <indirect ref>
  0x021377 $9367: -D0-I-  .byte $3D ; <indirect ref>
  0x021378 $9368: -D0-I-  .byte $B4 ; <indirect ref>
  0x021379 $9369: -D0-I-  .byte $FD ; <indirect ref>
  0x02137A $936A: -D0-I-  .byte $03 ; <indirect ref>
  0x02137B $936B: -D0-I-  .byte $FA ; <indirect ref>
  0x02137C $936C: -D0-I-  .byte $F6 ; <indirect ref>
  0x02137D $936D: -D0-I-  .byte $9E ; <indirect ref>
  0x02137E $936E: -D0-I-  .byte $F3 ; <indirect ref>
  0x02137F $936F: -D0-I-  .byte $0A ; <indirect ref>
  0x021380 $9370: -D0-I-  .byte $29 ; <indirect ref>
  0x021381 $9371: -D0-I-  .byte $95 ; <indirect ref>
  0x021382 $9372: -D0-I-  .byte $76 ; <indirect ref>
  0x021383 $9373: -D0-I-  .byte $93 ; <indirect ref>
  0x021384 $9374: -D0-I-  .byte $70 ; <indirect ref>
  0x021385 $9375: -D0-I-  .byte $94 ; <indirect ref>
  0x021386 $9376: -D0-I-  .byte $FA ; <indirect ref>
  0x021387 $9377: -D0-I-  .byte $9C ; <indirect ref>
  0x021388 $9378: -D0-I-  .byte $9F ; <indirect ref>
  0x021389 $9379: -D0-I-  .byte $F3 ; <indirect ref>
  0x02138A $937A: -D0-I-  .byte $45 ; <indirect ref>
  0x02138B $937B: -D0-I-  .byte $7F ; <indirect ref>
  0x02138C $937C: -D0-I-  .byte $93 ; <indirect ref>
  0x02138D $937D: -D0-I-  .byte $28 ; <indirect ref>
  0x02138E $937E: -D0-I-  .byte $94 ; <indirect ref>
  0x02138F $937F: -D0-I-  .byte $F3 ; <indirect ref>
  0x021390 $9380: -D0-I-  .byte $8B ; <indirect ref>
  0x021391 $9381: -D0-I-  .byte $08 ; <indirect ref>
  0x021392 $9382: -D0-I-  .byte $03 ; <indirect ref>
  0x021393 $9383: -D0-I-  .byte $31 ; <indirect ref>
  0x021394 $9384: -D0-I-  .byte $6D ; <indirect ref>
  0x021395 $9385: -D0-I-  .byte $F3 ; <indirect ref>
  0x021396 $9386: -D0-I-  .byte $8C ; <indirect ref>
  0x021397 $9387: -D0-I-  .byte $02 ; <indirect ref>
  0x021398 $9388: -D0-I-  .byte $26 ; <indirect ref>
  0x021399 $9389: -D0-I-  .byte $F3 ; <indirect ref>
  0x02139A $938A: -D0-I-  .byte $8D ; <indirect ref>
  0x02139B $938B: -D0-I-  .byte $05 ; <indirect ref>
  0x02139C $938C: -D0-I-  .byte $0A ; <indirect ref>
  0x02139D $938D: -D0-I-  .byte $0F ; <indirect ref>
  0x02139E $938E: -D0-I-  .byte $14 ; <indirect ref>
  0x02139F $938F: -D0-I-  .byte $19 ; <indirect ref>
  0x0213A0 $9390: -D0-I-  .byte $FA ; <indirect ref>
  0x0213A1 $9391: -D0-I-  .byte $0E ; <indirect ref>
  0x0213A2 $9392: -D0-I-  .byte $A1 ; <indirect ref>
  0x0213A3 $9393: -D0-I-  .byte $F2 ; <indirect ref>
  0x0213A4 $9394: -D0-I-  .byte $0D ; <indirect ref>
  0x0213A5 $9395: -D0-I-  .byte $97 ; <indirect ref>
  0x0213A6 $9396: -D0-I-  .byte $FA ; <indirect ref>
  0x0213A7 $9397: -D0-I-  .byte $0E ; <indirect ref>
  0x0213A8 $9398: -D0-I-  .byte $A1 ; <indirect ref>
  0x0213A9 $9399: -D0-I-  .byte $F2 ; <indirect ref>
  0x0213AA $939A: -D0-I-  .byte $16 ; <indirect ref>
  0x0213AB $939B: -D0-I-  .byte $97 ; <indirect ref>
  0x0213AC $939C: -D0-I-  .byte $FA ; <indirect ref>
  0x0213AD $939D: -D0-I-  .byte $0E ; <indirect ref>
  0x0213AE $939E: -D0-I-  .byte $A1 ; <indirect ref>
  0x0213AF $939F: -D0-I-  .byte $F2 ; <indirect ref>
  0x0213B0 $93A0: -D0-I-  .byte $22 ; <indirect ref>
  0x0213B1 $93A1: -D0-I-  .byte $97 ; <indirect ref>
  0x0213B2 $93A2: -D0-I-  .byte $FA ; <indirect ref>
  0x0213B3 $93A3: -D0-I-  .byte $0E ; <indirect ref>
  0x0213B4 $93A4: -D0-I-  .byte $A1 ; <indirect ref>
  0x0213B5 $93A5: -D0-I-  .byte $F2 ; <indirect ref>
  0x0213B6 $93A6: -D0-I-  .byte $31 ; <indirect ref>
  0x0213B7 $93A7: -D0-I-  .byte $97 ; <indirect ref>
  0x0213B8 $93A8: -D0-I-  .byte $FA ; <indirect ref>
  0x0213B9 $93A9: -D0-I-  .byte $0E ; <indirect ref>
  0x0213BA $93AA: -D0-I-  .byte $A1 ; <indirect ref>
  0x0213BB $93AB: -D0-I-  .byte $F2 ; <indirect ref>
  0x0213BC $93AC: -D0-I-  .byte $43 ; <indirect ref>
  0x0213BD $93AD: -D0-I-  .byte $97 ; <indirect ref>
  0x0213BE $93AE: -D0-I-  .byte $FA ; <indirect ref>
  0x0213BF $93AF: -D0-I-  .byte $0E ; <indirect ref>
  0x0213C0 $93B0: -D0-I-  .byte $A1 ; <indirect ref>
  0x0213C1 $93B1: -D0-I-  .byte $F2 ; <indirect ref>
  0x0213C2 $93B2: -D0-I-  .byte $55 ; <indirect ref>
  0x0213C3 $93B3: -D0-I-  .byte $97 ; <indirect ref>
  0x0213C4 $93B4: -D0-I-  .byte $FF ; <indirect ref>
  0x0213C5 $93B5: -D0-I-  .byte $01 ; <indirect ref>
  0x0213C6 $93B6: -D0-I-  .byte $BE ; <indirect ref>
  0x0213C7 $93B7: -D0-I-  .byte $93 ; <indirect ref>
  0x0213C8 $93B8: -D0-I-  .byte $C4 ; <indirect ref>
  0x0213C9 $93B9: -D0-I-  .byte $93 ; <indirect ref>
  0x0213CA $93BA: -D0-I-  .byte $D0 ; <indirect ref>
  0x0213CB $93BB: -D0-I-  .byte $93 ; <indirect ref>
  0x0213CC $93BC: -D0-I-  .byte $DF ; <indirect ref>
  0x0213CD $93BD: -D0-I-  .byte $93 ; <indirect ref>
  0x0213CE $93BE: -D0-I-  .byte $FA ; <indirect ref>
  0x0213CF $93BF: -D0-I-  .byte $4B ; <indirect ref>
  0x0213D0 $93C0: -D0-I-  .byte $A1 ; <indirect ref>
  0x0213D1 $93C1: -D0-I-  .byte $F2 ; <indirect ref>
  0x0213D2 $93C2: -D0-I-  .byte $72 ; <indirect ref>
  0x0213D3 $93C3: -D0-I-  .byte $95 ; <indirect ref>
  0x0213D4 $93C4: -D0-I-  .byte $FA ; <indirect ref>
  0x0213D5 $93C5: -D0-I-  .byte $4B ; <indirect ref>
  0x0213D6 $93C6: -D0-I-  .byte $A1 ; <indirect ref>
  0x0213D7 $93C7: -D0-I-  .byte $FA ; <indirect ref>
  0x0213D8 $93C8: -D0-I-  .byte $08 ; <indirect ref>
  0x0213D9 $93C9: -D0-I-  .byte $A3 ; <indirect ref>
  0x0213DA $93CA: -D0-I-  .byte $FA ; <indirect ref>
  0x0213DB $93CB: -D0-I-  .byte $71 ; <indirect ref>
  0x0213DC $93CC: -D0-I-  .byte $A3 ; <indirect ref>
  0x0213DD $93CD: -D0-I-  .byte $F2 ; <indirect ref>
  0x0213DE $93CE: -D0-I-  .byte $22 ; <indirect ref>
  0x0213DF $93CF: -D0-I-  .byte $B8 ; <indirect ref>
  0x0213E0 $93D0: -D0-I-  .byte $FA ; <indirect ref>
  0x0213E1 $93D1: -D0-I-  .byte $2E ; <indirect ref>
  0x0213E2 $93D2: -D0-I-  .byte $B8 ; <indirect ref>
  0x0213E3 $93D3: -D0-I-  .byte $FA ; <indirect ref>
  0x0213E4 $93D4: -D0-I-  .byte $4B ; <indirect ref>
  0x0213E5 $93D5: -D0-I-  .byte $A1 ; <indirect ref>
  0x0213E6 $93D6: -D0-I-  .byte $FA ; <indirect ref>
  0x0213E7 $93D7: -D0-I-  .byte $08 ; <indirect ref>
  0x0213E8 $93D8: -D0-I-  .byte $A3 ; <indirect ref>
  0x0213E9 $93D9: -D0-I-  .byte $FA ; <indirect ref>
  0x0213EA $93DA: -D0-I-  .byte $71 ; <indirect ref>
  0x0213EB $93DB: -D0-I-  .byte $A3 ; <indirect ref>
  0x0213EC $93DC: -D0-I-  .byte $F2 ; <indirect ref>
  0x0213ED $93DD: -D0-I-  .byte $3A ; <indirect ref>
  0x0213EE $93DE: -D0-I-  .byte $B8 ; <indirect ref>
  0x0213EF $93DF: -D0-I-  .byte $FA ; <indirect ref>
  0x0213F0 $93E0: -D0-I-  .byte $2E ; <indirect ref>
  0x0213F1 $93E1: -D0-I-  .byte $B8 ; <indirect ref>
  0x0213F2 $93E2: -D0-I-  .byte $FA ; <indirect ref>
  0x0213F3 $93E3: -D0-I-  .byte $4B ; <indirect ref>
  0x0213F4 $93E4: -D0-I-  .byte $A1 ; <indirect ref>
  0x0213F5 $93E5: -D0-I-  .byte $FA ; <indirect ref>
  0x0213F6 $93E6: -D0-I-  .byte $08 ; <indirect ref>
  0x0213F7 $93E7: -D0-I-  .byte $A3 ; <indirect ref>
  0x0213F8 $93E8: -D0-I-  .byte $FA ; <indirect ref>
  0x0213F9 $93E9: -D0-I-  .byte $48 ; <indirect ref>
  0x0213FA $93EA: -D0-I-  .byte $B8 ; <indirect ref>
  0x0213FB $93EB: -D0-I-  .byte $FA ; <indirect ref>
  0x0213FC $93EC: -D0-I-  .byte $71 ; <indirect ref>
  0x0213FD $93ED: -D0-I-  .byte $A3 ; <indirect ref>
  0x0213FE $93EE: -D0-I-  .byte $F2 ; <indirect ref>
  0x0213FF $93EF: -D0-I-  .byte $59 ; <indirect ref>
  0x021400 $93F0: -D0-I-  .byte $B8 ; <indirect ref>
  0x021401 $93F1: -D0-I-  .byte $FF ; <indirect ref>
  0x021402 $93F2: -D0-I-  .byte $01 ; <indirect ref>
  0x021403 $93F3: -D0-I-  .byte $FB ; <indirect ref>
  0x021404 $93F4: -D0-I-  .byte $93 ; <indirect ref>
  0x021405 $93F5: -D0-I-  .byte $04 ; <indirect ref>
  0x021406 $93F6: -D0-I-  .byte $94 ; <indirect ref>
  0x021407 $93F7: -D0-I-  .byte $0D ; <indirect ref>
  0x021408 $93F8: -D0-I-  .byte $94 ; <indirect ref>
  0x021409 $93F9: ------  .byte $19
  0x02140A $93FA: ------  .byte $94
  0x02140B $93FB: -D0-I-  .byte $FA ; <indirect ref>
  0x02140C $93FC: -D0-I-  .byte $31 ; <indirect ref>
  0x02140D $93FD: -D0-I-  .byte $A1 ; <indirect ref>
  0x02140E $93FE: -D0-I-  .byte $FA ; <indirect ref>
  0x02140F $93FF: -D0-I-  .byte $6A ; <indirect ref>
  0x021410 $9400: -D0-I-  .byte $A3 ; <indirect ref>
  0x021411 $9401: -D0-I-  .byte $F2 ; <indirect ref>
  0x021412 $9402: -D0-I-  .byte $F0 ; <indirect ref>
  0x021413 $9403: -D0-I-  .byte $9E ; <indirect ref>
  0x021414 $9404: -D0-I-  .byte $FA ; <indirect ref>
  0x021415 $9405: -D0-I-  .byte $22 ; <indirect ref>
  0x021416 $9406: -D0-I-  .byte $B8 ; <indirect ref>
  0x021417 $9407: -D0-I-  .byte $FA ; <indirect ref>
  0x021418 $9408: -D0-I-  .byte $31 ; <indirect ref>
  0x021419 $9409: -D0-I-  .byte $A1 ; <indirect ref>
  0x02141A $940A: -D0-I-  .byte $F2 ; <indirect ref>
  0x02141B $940B: -D0-I-  .byte $6A ; <indirect ref>
  0x02141C $940C: -D0-I-  .byte $A3 ; <indirect ref>
  0x02141D $940D: -D0-I-  .byte $FA ; <indirect ref>
  0x02141E $940E: -D0-I-  .byte $2E ; <indirect ref>
  0x02141F $940F: -D0-I-  .byte $B8 ; <indirect ref>
  0x021420 $9410: -D0-I-  .byte $FA ; <indirect ref>
  0x021421 $9411: -D0-I-  .byte $31 ; <indirect ref>
  0x021422 $9412: -D0-I-  .byte $A1 ; <indirect ref>
  0x021423 $9413: -D0-I-  .byte $FA ; <indirect ref>
  0x021424 $9414: -D0-I-  .byte $6A ; <indirect ref>
  0x021425 $9415: -D0-I-  .byte $A3 ; <indirect ref>
  0x021426 $9416: -D0-I-  .byte $F2 ; <indirect ref>
  0x021427 $9417: -D0-I-  .byte $3A ; <indirect ref>
  0x021428 $9418: -D0-I-  .byte $B8 ; <indirect ref>
  0x021429 $9419: ------  .byte $FA
  0x02142A $941A: ------  .byte $2E
  0x02142B $941B: ------  .byte $B8
  0x02142C $941C: ------  .byte $FA
  0x02142D $941D: ------  .byte $31
  0x02142E $941E: ------  .byte $A1
  0x02142F $941F: ------  .byte $FA
  0x021430 $9420: ------  .byte $48
  0x021431 $9421: ------  .byte $B8
  0x021432 $9422: ------  .byte $FA
  0x021433 $9423: ------  .byte $6A
  0x021434 $9424: ------  .byte $A3
  0x021435 $9425: ------  .byte $F2
  0x021436 $9426: ------  .byte $59
  0x021437 $9427: ------  .byte $B8
  0x021438 $9428: -D0-I-  .byte $F3 ; <indirect ref>
  0x021439 $9429: -D0-I-  .byte $8B ; <indirect ref>
  0x02143A $942A: -D0-I-  .byte $0B ; <indirect ref>
  0x02143B $942B: -D0-I-  .byte $06 ; <indirect ref>
  0x02143C $942C: -D0-I-  .byte $34 ; <indirect ref>
  0x02143D $942D: ------  .byte $01
  0x02143E $942E: ------  .byte $F2
  0x02143F $942F: ------  .byte $F1
  0x021440 $9430: ------  .byte $93
  0x021441 $9431: -D0-I-  .byte $F3 ; <indirect ref>
  0x021442 $9432: -D0-I-  .byte $8C ; <indirect ref>
  0x021443 $9433: ------  .byte $02
  0x021444 $9434: -D0-I-  .byte $26 ; <indirect ref>
  0x021445 $9435: -D0-I-  .byte $F3 ; <indirect ref>
  0x021446 $9436: -D0-I-  .byte $8D ; <indirect ref>
  0x021447 $9437: -D0-I-  .byte $05 ; <indirect ref>
  0x021448 $9438: -D0-I-  .byte $0A ; <indirect ref>
  0x021449 $9439: -D0-I-  .byte $0F ; <indirect ref>
  0x02144A $943A: -D0-I-  .byte $14 ; <indirect ref>
  0x02144B $943B: -D0-I-  .byte $19 ; <indirect ref>
  0x02144C $943C: -D0-I-  .byte $FA ; <indirect ref>
  0x02144D $943D: -D0-I-  .byte $22 ; <indirect ref>
  0x02144E $943E: -D0-I-  .byte $A1 ; <indirect ref>
  0x02144F $943F: -D0-I-  .byte $F2 ; <indirect ref>
  0x021450 $9440: -D0-I-  .byte $8A ; <indirect ref>
  0x021451 $9441: -D0-I-  .byte $97 ; <indirect ref>
  0x021452 $9442: -D0-I-  .byte $FA ; <indirect ref>
  0x021453 $9443: -D0-I-  .byte $22 ; <indirect ref>
  0x021454 $9444: -D0-I-  .byte $A1 ; <indirect ref>
  0x021455 $9445: -D0-I-  .byte $F2 ; <indirect ref>
  0x021456 $9446: -D0-I-  .byte $99 ; <indirect ref>
  0x021457 $9447: -D0-I-  .byte $97 ; <indirect ref>
  0x021458 $9448: -D0-I-  .byte $FA ; <indirect ref>
  0x021459 $9449: -D0-I-  .byte $22 ; <indirect ref>
  0x02145A $944A: -D0-I-  .byte $A1 ; <indirect ref>
  0x02145B $944B: -D0-I-  .byte $F2 ; <indirect ref>
  0x02145C $944C: -D0-I-  .byte $AB ; <indirect ref>
  0x02145D $944D: -D0-I-  .byte $97 ; <indirect ref>
  0x02145E $944E: -D0-I-  .byte $FA ; <indirect ref>
  0x02145F $944F: -D0-I-  .byte $22 ; <indirect ref>
  0x021460 $9450: -D0-I-  .byte $A1 ; <indirect ref>
  0x021461 $9451: -D0-I-  .byte $F2 ; <indirect ref>
  0x021462 $9452: -D0-I-  .byte $C3 ; <indirect ref>
  0x021463 $9453: -D0-I-  .byte $97 ; <indirect ref>
  0x021464 $9454: -D0-I-  .byte $FA ; <indirect ref>
  0x021465 $9455: -D0-I-  .byte $22 ; <indirect ref>
  0x021466 $9456: -D0-I-  .byte $A1 ; <indirect ref>
  0x021467 $9457: -D0-I-  .byte $F2 ; <indirect ref>
  0x021468 $9458: -D0-I-  .byte $DB ; <indirect ref>
  0x021469 $9459: -D0-I-  .byte $97 ; <indirect ref>
  0x02146A $945A: -D0-I-  .byte $FA ; <indirect ref>
  0x02146B $945B: -D0-I-  .byte $22 ; <indirect ref>
  0x02146C $945C: -D0-I-  .byte $A1 ; <indirect ref>
  0x02146D $945D: -D0-I-  .byte $F2 ; <indirect ref>
  0x02146E $945E: -D0-I-  .byte $F3 ; <indirect ref>
  0x02146F $945F: -D0-I-  .byte $97 ; <indirect ref>
  0x021470 $9460: -D0-I-  .byte $FF ; <indirect ref>
  0x021471 $9461: -D0-I-  .byte $01 ; <indirect ref>
  0x021472 $9462: -D0-I-  .byte $6A ; <indirect ref>
  0x021473 $9463: -D0-I-  .byte $94 ; <indirect ref>
  0x021474 $9464: ------  .byte $C4
  0x021475 $9465: ------  .byte $93
  0x021476 $9466: ------  .byte $D0
  0x021477 $9467: ------  .byte $93
  0x021478 $9468: ------  .byte $DF
  0x021479 $9469: ------  .byte $93
  0x02147A $946A: -D0-I-  .byte $FA ; <indirect ref>
  0x02147B $946B: -D0-I-  .byte $22 ; <indirect ref>
  0x02147C $946C: -D0-I-  .byte $A1 ; <indirect ref>
  0x02147D $946D: -D0-I-  .byte $F2 ; <indirect ref>
  0x02147E $946E: -D0-I-  .byte $BC ; <indirect ref>
  0x02147F $946F: -D0-I-  .byte $95 ; <indirect ref>
  0x021480 $9470: -D0-I-  .byte $F3 ; <indirect ref>
  0x021481 $9471: -D0-I-  .byte $81 ; <indirect ref>
  0x021482 $9472: -D0-I-  .byte $02 ; <indirect ref>
  0x021483 $9473: ------  .byte $5D
  0x021484 $9474: -D0-I-  .byte $F3 ; <indirect ref>
  0x021485 $9475: -D0-I-  .byte $8B ; <indirect ref>
  0x021486 $9476: -D0-I-  .byte $08 ; <indirect ref>
  0x021487 $9477: ------  .byte $03
  0x021488 $9478: -D0-I-  .byte $43 ; <indirect ref>
  0x021489 $9479: -D0-I-  .byte $4E ; <indirect ref>
  0x02148A $947A: ------  .byte $F3
  0x02148B $947B: ------  .byte $8C
  0x02148C $947C: ------  .byte $02
  0x02148D $947D: ------  .byte $35
  0x02148E $947E: -D0-I-  .byte $F3 ; <indirect ref>
  0x02148F $947F: -D0-I-  .byte $8D ; <indirect ref>
  0x021490 $9480: -D0-I-  .byte $05 ; <indirect ref>
  0x021491 $9481: -D0-I-  .byte $0D ; <indirect ref>
  0x021492 $9482: -D0-I-  .byte $15 ; <indirect ref>
  0x021493 $9483: -D0-I-  .byte $1D ; <indirect ref>
  0x021494 $9484: ------  .byte $25
  0x021495 $9485: -D0-I-  .byte $FA ; <indirect ref>
  0x021496 $9486: -D0-I-  .byte $5B ; <indirect ref>
  0x021497 $9487: -D0-I-  .byte $9C ; <indirect ref>
  0x021498 $9488: -D0-I-  .byte $FA ; <indirect ref>
  0x021499 $9489: -D0-I-  .byte $DD ; <indirect ref>
  0x02149A $948A: -D0-I-  .byte $A1 ; <indirect ref>
  0x02149B $948B: -D0-I-  .byte $F2 ; <indirect ref>
  0x02149C $948C: -D0-I-  .byte $0D ; <indirect ref>
  0x02149D $948D: -D0-I-  .byte $97 ; <indirect ref>
  0x02149E $948E: -D0-I-  .byte $FA ; <indirect ref>
  0x02149F $948F: -D0-I-  .byte $5B ; <indirect ref>
  0x0214A0 $9490: -D0-I-  .byte $9C ; <indirect ref>
  0x0214A1 $9491: -D0-I-  .byte $FA ; <indirect ref>
  0x0214A2 $9492: -D0-I-  .byte $DD ; <indirect ref>
  0x0214A3 $9493: -D0-I-  .byte $A1 ; <indirect ref>
  0x0214A4 $9494: -D0-I-  .byte $F2 ; <indirect ref>
  0x0214A5 $9495: -D0-I-  .byte $16 ; <indirect ref>
  0x0214A6 $9496: -D0-I-  .byte $97 ; <indirect ref>
  0x0214A7 $9497: -D0-I-  .byte $FA ; <indirect ref>
  0x0214A8 $9498: -D0-I-  .byte $5B ; <indirect ref>
  0x0214A9 $9499: -D0-I-  .byte $9C ; <indirect ref>
  0x0214AA $949A: -D0-I-  .byte $FA ; <indirect ref>
  0x0214AB $949B: -D0-I-  .byte $DD ; <indirect ref>
  0x0214AC $949C: -D0-I-  .byte $A1 ; <indirect ref>
  0x0214AD $949D: -D0-I-  .byte $F2 ; <indirect ref>
  0x0214AE $949E: -D0-I-  .byte $22 ; <indirect ref>
  0x0214AF $949F: -D0-I-  .byte $97 ; <indirect ref>
  0x0214B0 $94A0: -D0-I-  .byte $FA ; <indirect ref>
  0x0214B1 $94A1: -D0-I-  .byte $5B ; <indirect ref>
  0x0214B2 $94A2: -D0-I-  .byte $9C ; <indirect ref>
  0x0214B3 $94A3: -D0-I-  .byte $FA ; <indirect ref>
  0x0214B4 $94A4: -D0-I-  .byte $DD ; <indirect ref>
  0x0214B5 $94A5: -D0-I-  .byte $A1 ; <indirect ref>
  0x0214B6 $94A6: -D0-I-  .byte $F2 ; <indirect ref>
  0x0214B7 $94A7: -D0-I-  .byte $31 ; <indirect ref>
  0x0214B8 $94A8: -D0-I-  .byte $97 ; <indirect ref>
  0x0214B9 $94A9: ------  .byte $FA
  0x0214BA $94AA: ------  .byte $5B
  0x0214BB $94AB: ------  .byte $9C
  0x0214BC $94AC: ------  .byte $FA
  0x0214BD $94AD: ------  .byte $DD
  0x0214BE $94AE: ------  .byte $A1
  0x0214BF $94AF: ------  .byte $F2
  0x0214C0 $94B0: ------  .byte $43
  0x0214C1 $94B1: ------  .byte $97
  0x0214C2 $94B2: ------  .byte $FA
  0x0214C3 $94B3: ------  .byte $5B
  0x0214C4 $94B4: ------  .byte $9C
  0x0214C5 $94B5: ------  .byte $FA
  0x0214C6 $94B6: ------  .byte $DD
  0x0214C7 $94B7: ------  .byte $A1
  0x0214C8 $94B8: ------  .byte $F2
  0x0214C9 $94B9: ------  .byte $55
  0x0214CA $94BA: ------  .byte $97
  0x0214CB $94BB: -D0-I-  .byte $FA ; <indirect ref>
  0x0214CC $94BC: -D0-I-  .byte $5B ; <indirect ref>
  0x0214CD $94BD: -D0-I-  .byte $9C ; <indirect ref>
  0x0214CE $94BE: -D0-I-  .byte $FA ; <indirect ref>
  0x0214CF $94BF: -D0-I-  .byte $CA ; <indirect ref>
  0x0214D0 $94C0: -D0-I-  .byte $A1 ; <indirect ref>
  0x0214D1 $94C1: -D0-I-  .byte $FA ; <indirect ref>
  0x0214D2 $94C2: -D0-I-  .byte $08 ; <indirect ref>
  0x0214D3 $94C3: -D0-I-  .byte $A3 ; <indirect ref>
  0x0214D4 $94C4: -D0-I-  .byte $F2 ; <indirect ref>
  0x0214D5 $94C5: -D0-I-  .byte $71 ; <indirect ref>
  0x0214D6 $94C6: -D0-I-  .byte $A3 ; <indirect ref>
  0x0214D7 $94C7: -D0-I-  .byte $FA ; <indirect ref>
  0x0214D8 $94C8: -D0-I-  .byte $5B ; <indirect ref>
  0x0214D9 $94C9: -D0-I-  .byte $9C ; <indirect ref>
  0x0214DA $94CA: -D0-I-  .byte $FA ; <indirect ref>
  0x0214DB $94CB: -D0-I-  .byte $D1 ; <indirect ref>
  0x0214DC $94CC: -D0-I-  .byte $A1 ; <indirect ref>
  0x0214DD $94CD: -D0-I-  .byte $F2 ; <indirect ref>
  0x0214DE $94CE: -D0-I-  .byte $4E ; <indirect ref>
  0x0214DF $94CF: -D0-I-  .byte $B4 ; <indirect ref>
  0x0214E0 $94D0: ------  .byte $F3
  0x0214E1 $94D1: ------  .byte $8B
  0x0214E2 $94D2: ------  .byte $0B
  0x0214E3 $94D3: ------  .byte $06
  0x0214E4 $94D4: ------  .byte $46
  0x0214E5 $94D5: ------  .byte $01
  0x0214E6 $94D6: ------  .byte $F2
  0x0214E7 $94D7: ------  .byte $C7
  0x0214E8 $94D8: ------  .byte $94
  0x0214E9 $94D9: ------  .byte $F3
  0x0214EA $94DA: ------  .byte $8C
  0x0214EB $94DB: ------  .byte $02
  0x0214EC $94DC: ------  .byte $35
  0x0214ED $94DD: ------  .byte $F3
  0x0214EE $94DE: ------  .byte $8D
  0x0214EF $94DF: ------  .byte $05
  0x0214F0 $94E0: ------  .byte $0D
  0x0214F1 $94E1: ------  .byte $15
  0x0214F2 $94E2: ------  .byte $1D
  0x0214F3 $94E3: ------  .byte $25
  0x0214F4 $94E4: ------  .byte $FA
  0x0214F5 $94E5: ------  .byte $5B
  0x0214F6 $94E6: ------  .byte $9C
  0x0214F7 $94E7: ------  .byte $FA
  0x0214F8 $94E8: ------  .byte $CA
  0x0214F9 $94E9: ------  .byte $A1
  0x0214FA $94EA: ------  .byte $F2
  0x0214FB $94EB: ------  .byte $8A
  0x0214FC $94EC: ------  .byte $97
  0x0214FD $94ED: ------  .byte $FA
  0x0214FE $94EE: ------  .byte $5B
  0x0214FF $94EF: ------  .byte $9C
  0x021500 $94F0: ------  .byte $FA
  0x021501 $94F1: ------  .byte $CA
  0x021502 $94F2: ------  .byte $A1
  0x021503 $94F3: ------  .byte $F2
  0x021504 $94F4: ------  .byte $99
  0x021505 $94F5: ------  .byte $97
  0x021506 $94F6: ------  .byte $FA
  0x021507 $94F7: ------  .byte $5B
  0x021508 $94F8: ------  .byte $9C
  0x021509 $94F9: ------  .byte $FA
  0x02150A $94FA: ------  .byte $CA
  0x02150B $94FB: ------  .byte $A1
  0x02150C $94FC: ------  .byte $F2
  0x02150D $94FD: ------  .byte $AB
  0x02150E $94FE: ------  .byte $97
  0x02150F $94FF: ------  .byte $FA
  0x021510 $9500: ------  .byte $5B
  0x021511 $9501: ------  .byte $9C
  0x021512 $9502: ------  .byte $FA
  0x021513 $9503: ------  .byte $CA
  0x021514 $9504: ------  .byte $A1
  0x021515 $9505: ------  .byte $F2
  0x021516 $9506: ------  .byte $C3
  0x021517 $9507: ------  .byte $97
  0x021518 $9508: ------  .byte $FA
  0x021519 $9509: ------  .byte $5B
  0x02151A $950A: ------  .byte $9C
  0x02151B $950B: ------  .byte $FA
  0x02151C $950C: ------  .byte $CA
  0x02151D $950D: ------  .byte $A1
  0x02151E $950E: ------  .byte $F2
  0x02151F $950F: ------  .byte $DB
  0x021520 $9510: ------  .byte $97
  0x021521 $9511: ------  .byte $FA
  0x021522 $9512: ------  .byte $5B
  0x021523 $9513: ------  .byte $9C
  0x021524 $9514: ------  .byte $FA
  0x021525 $9515: ------  .byte $CA
  0x021526 $9516: ------  .byte $A1
  0x021527 $9517: ------  .byte $F2
  0x021528 $9518: ------  .byte $F3
  0x021529 $9519: ------  .byte $97
  0x02152A $951A: ------  .byte $FA
  0x02152B $951B: ------  .byte $5B
  0x02152C $951C: ------  .byte $9C
  0x02152D $951D: ------  .byte $FA
  0x02152E $951E: ------  .byte $CA
  0x02152F $951F: ------  .byte $A1
  0x021530 $9520: ------  .byte $FA
  0x021531 $9521: ------  .byte $DD
  0x021532 $9522: ------  .byte $A2
  0x021533 $9523: ------  .byte $FA
  0x021534 $9524: ------  .byte $B5
  0x021535 $9525: ------  .byte $9F
  0x021536 $9526: ------  .byte $F2
  0x021537 $9527: ------  .byte $71
  0x021538 $9528: ------  .byte $A3
  0x021539 $9529: -D0-I-  .byte $F3 ; <indirect ref>
  0x02153A $952A: -D0-I-  .byte $36 ; <indirect ref>
  0x02153B $952B: -D0-I-  .byte $33 ; <indirect ref>
  0x02153C $952C: -D0-I-  .byte $95 ; <indirect ref>
  0x02153D $952D: -D0-I-  .byte $C8 ; <indirect ref>
  0x02153E $952E: -D0-I-  .byte $95 ; <indirect ref>
  0x02153F $952F: -D0-I-  .byte $4B ; <indirect ref>
  0x021540 $9530: -D0-I-  .byte $96 ; <indirect ref>
  0x021541 $9531: -D0-I-  .byte $CE ; <indirect ref>
  0x021542 $9532: -D0-I-  .byte $96 ; <indirect ref>
  0x021543 $9533: -D0-I-  .byte $FA ; <indirect ref>
  0x021544 $9534: -D0-I-  .byte $9C ; <indirect ref>
  0x021545 $9535: -D0-I-  .byte $9F ; <indirect ref>
  0x021546 $9536: -D0-I-  .byte $F3 ; <indirect ref>
  0x021547 $9537: -D0-I-  .byte $81 ; <indirect ref>
  0x021548 $9538: -D0-I-  .byte $02 ; <indirect ref>
  0x021549 $9539: -D0-I-  .byte $48 ; <indirect ref>
  0x02154A $953A: -D0-I-  .byte $F3 ; <indirect ref>
  0x02154B $953B: -D0-I-  .byte $8B ; <indirect ref>
  0x02154C $953C: -D0-I-  .byte $08 ; <indirect ref>
  0x02154D $953D: -D0-I-  .byte $03 ; <indirect ref>
  0x02154E $953E: -D0-I-  .byte $31 ; <indirect ref>
  0x02154F $953F: -D0-I-  .byte $3C ; <indirect ref>
  0x021550 $9540: -D0-I-  .byte $F3 ; <indirect ref>
  0x021551 $9541: -D0-I-  .byte $8C ; <indirect ref>
  0x021552 $9542: -D0-I-  .byte $02 ; <indirect ref>
  0x021553 $9543: -D0-I-  .byte $26 ; <indirect ref>
  0x021554 $9544: -D0-I-  .byte $F3 ; <indirect ref>
  0x021555 $9545: -D0-I-  .byte $8D ; <indirect ref>
  0x021556 $9546: -D0-I-  .byte $05 ; <indirect ref>
  0x021557 $9547: -D0-I-  .byte $0A ; <indirect ref>
  0x021558 $9548: -D0-I-  .byte $0F ; <indirect ref>
  0x021559 $9549: -D0-I-  .byte $14 ; <indirect ref>
  0x02155A $954A: -D0-I-  .byte $19 ; <indirect ref>
  0x02155B $954B: -D0-I-  .byte $FA ; <indirect ref>
  0x02155C $954C: -D0-I-  .byte $94 ; <indirect ref>
  0x02155D $954D: -D0-I-  .byte $A0 ; <indirect ref>
  0x02155E $954E: -D0-I-  .byte $F2 ; <indirect ref>
  0x02155F $954F: -D0-I-  .byte $0D ; <indirect ref>
  0x021560 $9550: -D0-I-  .byte $97 ; <indirect ref>
  0x021561 $9551: -D0-I-  .byte $FA ; <indirect ref>
  0x021562 $9552: -D0-I-  .byte $94 ; <indirect ref>
  0x021563 $9553: -D0-I-  .byte $A0 ; <indirect ref>
  0x021564 $9554: -D0-I-  .byte $F2 ; <indirect ref>
  0x021565 $9555: -D0-I-  .byte $16 ; <indirect ref>
  0x021566 $9556: -D0-I-  .byte $97 ; <indirect ref>
  0x021567 $9557: -D0-I-  .byte $FA ; <indirect ref>
  0x021568 $9558: -D0-I-  .byte $94 ; <indirect ref>
  0x021569 $9559: -D0-I-  .byte $A0 ; <indirect ref>
  0x02156A $955A: -D0-I-  .byte $F2 ; <indirect ref>
  0x02156B $955B: -D0-I-  .byte $22 ; <indirect ref>
  0x02156C $955C: -D0-I-  .byte $97 ; <indirect ref>
  0x02156D $955D: -D0-I-  .byte $FA ; <indirect ref>
  0x02156E $955E: -D0-I-  .byte $94 ; <indirect ref>
  0x02156F $955F: -D0-I-  .byte $A0 ; <indirect ref>
  0x021570 $9560: -D0-I-  .byte $F2 ; <indirect ref>
  0x021571 $9561: -D0-I-  .byte $31 ; <indirect ref>
  0x021572 $9562: -D0-I-  .byte $97 ; <indirect ref>
  0x021573 $9563: -D0-I-  .byte $FA ; <indirect ref>
  0x021574 $9564: -D0-I-  .byte $94 ; <indirect ref>
  0x021575 $9565: -D0-I-  .byte $A0 ; <indirect ref>
  0x021576 $9566: -D0-I-  .byte $F2 ; <indirect ref>
  0x021577 $9567: -D0-I-  .byte $43 ; <indirect ref>
  0x021578 $9568: -D0-I-  .byte $97 ; <indirect ref>
  0x021579 $9569: -D0-I-  .byte $FA ; <indirect ref>
  0x02157A $956A: -D0-I-  .byte $94 ; <indirect ref>
  0x02157B $956B: -D0-I-  .byte $A0 ; <indirect ref>
  0x02157C $956C: -D0-I-  .byte $F2 ; <indirect ref>
  0x02157D $956D: -D0-I-  .byte $55 ; <indirect ref>
  0x02157E $956E: -D0-I-  .byte $97 ; <indirect ref>
  0x02157F $956F: -D0-I-  .byte $FA ; <indirect ref>
  0x021580 $9570: -D0-I-  .byte $A1 ; <indirect ref>
  0x021581 $9571: -D0-I-  .byte $A0 ; <indirect ref>
  0x021582 $9572: -D0-I-  .byte $FA ; <indirect ref>
  0x021583 $9573: -D0-I-  .byte $08 ; <indirect ref>
  0x021584 $9574: -D0-I-  .byte $A3 ; <indirect ref>
  0x021585 $9575: -D0-I-  .byte $FA ; <indirect ref>
  0x021586 $9576: -D0-I-  .byte $5D ; <indirect ref>
  0x021587 $9577: -D0-I-  .byte $B4 ; <indirect ref>
  0x021588 $9578: -D0-I-  .byte $F2 ; <indirect ref>
  0x021589 $9579: -D0-I-  .byte $F0 ; <indirect ref>
  0x02158A $957A: -D0-I-  .byte $9E ; <indirect ref>
  0x02158B $957B: -D0-I-  .byte $FA ; <indirect ref>
  0x02158C $957C: -D0-I-  .byte $A6 ; <indirect ref>
  0x02158D $957D: -D0-I-  .byte $A0 ; <indirect ref>
  0x02158E $957E: -D0-I-  .byte $F2 ; <indirect ref>
  0x02158F $957F: -D0-I-  .byte $70 ; <indirect ref>
  0x021590 $9580: -D0-I-  .byte $97 ; <indirect ref>
  0x021591 $9581: -D0-I-  .byte $F3 ; <indirect ref>
  0x021592 $9582: -D0-I-  .byte $8B ; <indirect ref>
  0x021593 $9583: -D0-I-  .byte $0B ; <indirect ref>
  0x021594 $9584: -D0-I-  .byte $06 ; <indirect ref>
  0x021595 $9585: ------  .byte $34
  0x021596 $9586: ------  .byte $01
  0x021597 $9587: ------  .byte $F2
  0x021598 $9588: ------  .byte $7B
  0x021599 $9589: ------  .byte $95
  0x02159A $958A: -D0-I-  .byte $F3 ; <indirect ref>
  0x02159B $958B: -D0-I-  .byte $8C ; <indirect ref>
  0x02159C $958C: ------  .byte $02
  0x02159D $958D: -D0-I-  .byte $26 ; <indirect ref>
  0x02159E $958E: -D0-I-  .byte $F3 ; <indirect ref>
  0x02159F $958F: -D0-I-  .byte $8D ; <indirect ref>
  0x0215A0 $9590: -D0-I-  .byte $05 ; <indirect ref>
  0x0215A1 $9591: -D0-I-  .byte $0A ; <indirect ref>
  0x0215A2 $9592: ------  .byte $0F
  0x0215A3 $9593: ------  .byte $14
  0x0215A4 $9594: ------  .byte $19
  0x0215A5 $9595: -D0-I-  .byte $FA ; <indirect ref>
  0x0215A6 $9596: -D0-I-  .byte $A1 ; <indirect ref>
  0x0215A7 $9597: -D0-I-  .byte $A0 ; <indirect ref>
  0x0215A8 $9598: -D0-I-  .byte $F2 ; <indirect ref>
  0x0215A9 $9599: -D0-I-  .byte $8A ; <indirect ref>
  0x0215AA $959A: -D0-I-  .byte $97 ; <indirect ref>
  0x0215AB $959B: -D0-I-  .byte $FA ; <indirect ref>
  0x0215AC $959C: -D0-I-  .byte $A1 ; <indirect ref>
  0x0215AD $959D: -D0-I-  .byte $A0 ; <indirect ref>
  0x0215AE $959E: -D0-I-  .byte $F2 ; <indirect ref>
  0x0215AF $959F: -D0-I-  .byte $99 ; <indirect ref>
  0x0215B0 $95A0: -D0-I-  .byte $97 ; <indirect ref>
  0x0215B1 $95A1: ------  .byte $FA
  0x0215B2 $95A2: ------  .byte $A1
  0x0215B3 $95A3: ------  .byte $A0
  0x0215B4 $95A4: ------  .byte $F2
  0x0215B5 $95A5: ------  .byte $AB
  0x0215B6 $95A6: ------  .byte $97
  0x0215B7 $95A7: ------  .byte $FA
  0x0215B8 $95A8: ------  .byte $A1
  0x0215B9 $95A9: ------  .byte $A0
  0x0215BA $95AA: ------  .byte $F2
  0x0215BB $95AB: ------  .byte $C3
  0x0215BC $95AC: ------  .byte $97
  0x0215BD $95AD: ------  .byte $FA
  0x0215BE $95AE: ------  .byte $A1
  0x0215BF $95AF: ------  .byte $A0
  0x0215C0 $95B0: ------  .byte $F2
  0x0215C1 $95B1: ------  .byte $DB
  0x0215C2 $95B2: ------  .byte $97
  0x0215C3 $95B3: -D0-I-  .byte $FA ; <indirect ref>
  0x0215C4 $95B4: -D0-I-  .byte $A1 ; <indirect ref>
  0x0215C5 $95B5: -D0-I-  .byte $A0 ; <indirect ref>
  0x0215C6 $95B6: -D0-I-  .byte $F2 ; <indirect ref>
  0x0215C7 $95B7: -D0-I-  .byte $F3 ; <indirect ref>
  0x0215C8 $95B8: -D0-I-  .byte $97 ; <indirect ref>
  0x0215C9 $95B9: ------  .byte $FA
  0x0215CA $95BA: ------  .byte $A1
  0x0215CB $95BB: ------  .byte $A0
  0x0215CC $95BC: -D0-I-  .byte $FA ; <indirect ref>
  0x0215CD $95BD: -D0-I-  .byte $DD ; <indirect ref>
  0x0215CE $95BE: -D0-I-  .byte $A2 ; <indirect ref>
  0x0215CF $95BF: -D0-I-  .byte $FA ; <indirect ref>
  0x0215D0 $95C0: -D0-I-  .byte $B5 ; <indirect ref>
  0x0215D1 $95C1: -D0-I-  .byte $9F ; <indirect ref>
  0x0215D2 $95C2: -D0-I-  .byte $FA ; <indirect ref>
  0x0215D3 $95C3: -D0-I-  .byte $71 ; <indirect ref>
  0x0215D4 $95C4: -D0-I-  .byte $A3 ; <indirect ref>
  0x0215D5 $95C5: -D0-I-  .byte $F2 ; <indirect ref>
  0x0215D6 $95C6: -D0-I-  .byte $F0 ; <indirect ref>
  0x0215D7 $95C7: -D0-I-  .byte $9E ; <indirect ref>
  0x0215D8 $95C8: -D0-I-  .byte $F3 ; <indirect ref>
  0x0215D9 $95C9: -D0-I-  .byte $81 ; <indirect ref>
  0x0215DA $95CA: -D0-I-  .byte $02 ; <indirect ref>
  0x0215DB $95CB: -D0-I-  .byte $42 ; <indirect ref>
  0x0215DC $95CC: -D0-I-  .byte $F3 ; <indirect ref>
  0x0215DD $95CD: -D0-I-  .byte $8B ; <indirect ref>
  0x0215DE $95CE: -D0-I-  .byte $08 ; <indirect ref>
  0x0215DF $95CF: -D0-I-  .byte $03 ; <indirect ref>
  0x0215E0 $95D0: -D0-I-  .byte $31 ; <indirect ref>
  0x0215E1 $95D1: -D0-I-  .byte $36 ; <indirect ref>
  0x0215E2 $95D2: -D0-I-  .byte $F3 ; <indirect ref>
  0x0215E3 $95D3: -D0-I-  .byte $8C ; <indirect ref>
  0x0215E4 $95D4: ------  .byte $02
  0x0215E5 $95D5: -D0-I-  .byte $26 ; <indirect ref>
  0x0215E6 $95D6: -D0-I-  .byte $F3 ; <indirect ref>
  0x0215E7 $95D7: -D0-I-  .byte $8D ; <indirect ref>
  0x0215E8 $95D8: -D0-I-  .byte $05 ; <indirect ref>
  0x0215E9 $95D9: -D0-I-  .byte $0A ; <indirect ref>
  0x0215EA $95DA: ------  .byte $0F
  0x0215EB $95DB: ------  .byte $14
  0x0215EC $95DC: -D0-I-  .byte $19 ; <indirect ref>
  0x0215ED $95DD: -D0-I-  .byte $FA ; <indirect ref>
  0x0215EE $95DE: -D0-I-  .byte $CD ; <indirect ref>
  0x0215EF $95DF: -D0-I-  .byte $A0 ; <indirect ref>
  0x0215F0 $95E0: -D0-I-  .byte $F2 ; <indirect ref>
  0x0215F1 $95E1: -D0-I-  .byte $0A ; <indirect ref>
  0x0215F2 $95E2: -D0-I-  .byte $97 ; <indirect ref>
  0x0215F3 $95E3: -D0-I-  .byte $FA ; <indirect ref>
  0x0215F4 $95E4: -D0-I-  .byte $CD ; <indirect ref>
  0x0215F5 $95E5: -D0-I-  .byte $A0 ; <indirect ref>
  0x0215F6 $95E6: -D0-I-  .byte $F2 ; <indirect ref>
  0x0215F7 $95E7: -D0-I-  .byte $13 ; <indirect ref>
  0x0215F8 $95E8: -D0-I-  .byte $97 ; <indirect ref>
  0x0215F9 $95E9: ------  .byte $FA
  0x0215FA $95EA: ------  .byte $CD
  0x0215FB $95EB: ------  .byte $A0
  0x0215FC $95EC: ------  .byte $F2
  0x0215FD $95ED: ------  .byte $1F
  0x0215FE $95EE: ------  .byte $97
  0x0215FF $95EF: ------  .byte $FA
  0x021600 $95F0: ------  .byte $CD
  0x021601 $95F1: ------  .byte $A0
  0x021602 $95F2: ------  .byte $F2
  0x021603 $95F3: ------  .byte $2E
  0x021604 $95F4: ------  .byte $97
  0x021605 $95F5: -D0-I-  .byte $FA ; <indirect ref>
  0x021606 $95F6: -D0-I-  .byte $CD ; <indirect ref>
  0x021607 $95F7: -D0-I-  .byte $A0 ; <indirect ref>
  0x021608 $95F8: -D0-I-  .byte $F2 ; <indirect ref>
  0x021609 $95F9: -D0-I-  .byte $40 ; <indirect ref>
  0x02160A $95FA: -D0-I-  .byte $97 ; <indirect ref>
  0x02160B $95FB: -D0-I-  .byte $FA ; <indirect ref>
  0x02160C $95FC: -D0-I-  .byte $CD ; <indirect ref>
  0x02160D $95FD: -D0-I-  .byte $A0 ; <indirect ref>
  0x02160E $95FE: -D0-I-  .byte $F2 ; <indirect ref>
  0x02160F $95FF: -D0-I-  .byte $52 ; <indirect ref>
  0x021610 $9600: -D0-I-  .byte $97 ; <indirect ref>
  0x021611 $9601: -D0-I-  .byte $FA ; <indirect ref>
  0x021612 $9602: -D0-I-  .byte $CD ; <indirect ref>
  0x021613 $9603: -D0-I-  .byte $A0 ; <indirect ref>
  0x021614 $9604: -D0-I-  .byte $F2 ; <indirect ref>
  0x021615 $9605: -D0-I-  .byte $5E ; <indirect ref>
  0x021616 $9606: -D0-I-  .byte $97 ; <indirect ref>
  0x021617 $9607: -D0-I-  .byte $FA ; <indirect ref>
  0x021618 $9608: -D0-I-  .byte $CD ; <indirect ref>
  0x021619 $9609: -D0-I-  .byte $A0 ; <indirect ref>
  0x02161A $960A: -D0-I-  .byte $F2 ; <indirect ref>
  0x02161B $960B: -D0-I-  .byte $6D ; <indirect ref>
  0x02161C $960C: -D0-I-  .byte $97 ; <indirect ref>
  0x02161D $960D: -D0-I-  .byte $F3 ; <indirect ref>
  0x02161E $960E: -D0-I-  .byte $8B ; <indirect ref>
  0x02161F $960F: -D0-I-  .byte $0B ; <indirect ref>
  0x021620 $9610: ------  .byte $06
  0x021621 $9611: ------  .byte $34
  0x021622 $9612: ------  .byte $01
  0x021623 $9613: ------  .byte $F2
  0x021624 $9614: ------  .byte $07
  0x021625 $9615: ------  .byte $96
  0x021626 $9616: ------  .byte $F3
  0x021627 $9617: ------  .byte $8C
  0x021628 $9618: ------  .byte $02
  0x021629 $9619: ------  .byte $26
  0x02162A $961A: -D0-I-  .byte $F3 ; <indirect ref>
  0x02162B $961B: -D0-I-  .byte $8D ; <indirect ref>
  0x02162C $961C: -D0-I-  .byte $05 ; <indirect ref>
  0x02162D $961D: ------  .byte $0A
  0x02162E $961E: ------  .byte $0F
  0x02162F $961F: ------  .byte $14
  0x021630 $9620: ------  .byte $19
  0x021631 $9621: -D0-I-  .byte $FA ; <indirect ref>
  0x021632 $9622: -D0-I-  .byte $CD ; <indirect ref>
  0x021633 $9623: -D0-I-  .byte $A0 ; <indirect ref>
  0x021634 $9624: -D0-I-  .byte $F2 ; <indirect ref>
  0x021635 $9625: -D0-I-  .byte $87 ; <indirect ref>
  0x021636 $9626: -D0-I-  .byte $97 ; <indirect ref>
  0x021637 $9627: ------  .byte $FA
  0x021638 $9628: ------  .byte $CD
  0x021639 $9629: ------  .byte $A0
  0x02163A $962A: ------  .byte $F2
  0x02163B $962B: ------  .byte $96
  0x02163C $962C: ------  .byte $97
  0x02163D $962D: ------  .byte $FA
  0x02163E $962E: ------  .byte $CD
  0x02163F $962F: ------  .byte $A0
  0x021640 $9630: ------  .byte $F2
  0x021641 $9631: ------  .byte $A8
  0x021642 $9632: ------  .byte $97
  0x021643 $9633: ------  .byte $FA
  0x021644 $9634: ------  .byte $CD
  0x021645 $9635: ------  .byte $A0
  0x021646 $9636: ------  .byte $F2
  0x021647 $9637: ------  .byte $C0
  0x021648 $9638: ------  .byte $97
  0x021649 $9639: ------  .byte $FA
  0x02164A $963A: ------  .byte $CD
  0x02164B $963B: ------  .byte $A0
  0x02164C $963C: ------  .byte $F2
  0x02164D $963D: ------  .byte $D8
  0x02164E $963E: ------  .byte $97
  0x02164F $963F: ------  .byte $FA
  0x021650 $9640: ------  .byte $CD
  0x021651 $9641: ------  .byte $A0
  0x021652 $9642: ------  .byte $F2
  0x021653 $9643: ------  .byte $F0
  0x021654 $9644: ------  .byte $97
  0x021655 $9645: ------  .byte $FA
  0x021656 $9646: ------  .byte $CD
  0x021657 $9647: ------  .byte $A0
  0x021658 $9648: ------  .byte $F2
  0x021659 $9649: ------  .byte $02
  0x02165A $964A: ------  .byte $98
  0x02165B $964B: -D0-I-  .byte $F3 ; <indirect ref>
  0x02165C $964C: -D0-I-  .byte $81 ; <indirect ref>
  0x02165D $964D: -D0-I-  .byte $02 ; <indirect ref>
  0x02165E $964E: -D0-I-  .byte $42 ; <indirect ref>
  0x02165F $964F: -D0-I-  .byte $F3 ; <indirect ref>
  0x021660 $9650: -D0-I-  .byte $8B ; <indirect ref>
  0x021661 $9651: -D0-I-  .byte $08 ; <indirect ref>
  0x021662 $9652: ------  .byte $03
  0x021663 $9653: -D0-I-  .byte $31 ; <indirect ref>
  0x021664 $9654: -D0-I-  .byte $36 ; <indirect ref>
  0x021665 $9655: ------  .byte $F3
  0x021666 $9656: ------  .byte $8C
  0x021667 $9657: ------  .byte $02
  0x021668 $9658: ------  .byte $26
  0x021669 $9659: -D0-I-  .byte $F3 ; <indirect ref>
  0x02166A $965A: -D0-I-  .byte $8D ; <indirect ref>
  0x02166B $965B: -D0-I-  .byte $05 ; <indirect ref>
  0x02166C $965C: -D0-I-  .byte $0A ; <indirect ref>
  0x02166D $965D: ------  .byte $0F
  0x02166E $965E: -D0-I-  .byte $14 ; <indirect ref>
  0x02166F $965F: ------  .byte $19
  0x021670 $9660: -D0-I-  .byte $FA ; <indirect ref>
  0x021671 $9661: -D0-I-  .byte $FF ; <indirect ref>
  0x021672 $9662: -D0-I-  .byte $A1 ; <indirect ref>
  0x021673 $9663: -D0-I-  .byte $F2 ; <indirect ref>
  0x021674 $9664: -D0-I-  .byte $0A ; <indirect ref>
  0x021675 $9665: -D0-I-  .byte $97 ; <indirect ref>
  0x021676 $9666: -D0-I-  .byte $FA ; <indirect ref>
  0x021677 $9667: -D0-I-  .byte $FF ; <indirect ref>
  0x021678 $9668: -D0-I-  .byte $A1 ; <indirect ref>
  0x021679 $9669: -D0-I-  .byte $F2 ; <indirect ref>
  0x02167A $966A: -D0-I-  .byte $13 ; <indirect ref>
  0x02167B $966B: -D0-I-  .byte $97 ; <indirect ref>
  0x02167C $966C: ------  .byte $FA
  0x02167D $966D: ------  .byte $FF
  0x02167E $966E: ------  .byte $A1
  0x02167F $966F: ------  .byte $F2
  0x021680 $9670: ------  .byte $1F
  0x021681 $9671: ------  .byte $97
  0x021682 $9672: -D0-I-  .byte $FA ; <indirect ref>
  0x021683 $9673: -D0-I-  .byte $FF ; <indirect ref>
  0x021684 $9674: -D0-I-  .byte $A1 ; <indirect ref>
  0x021685 $9675: -D0-I-  .byte $F2 ; <indirect ref>
  0x021686 $9676: -D0-I-  .byte $2E ; <indirect ref>
  0x021687 $9677: -D0-I-  .byte $97 ; <indirect ref>
  0x021688 $9678: ------  .byte $FA
  0x021689 $9679: ------  .byte $FF
  0x02168A $967A: ------  .byte $A1
  0x02168B $967B: ------  .byte $F2
  0x02168C $967C: ------  .byte $40
  0x02168D $967D: ------  .byte $97
  0x02168E $967E: ------  .byte $FA
  0x02168F $967F: ------  .byte $FF
  0x021690 $9680: ------  .byte $A1
  0x021691 $9681: ------  .byte $F2
  0x021692 $9682: ------  .byte $52
  0x021693 $9683: ------  .byte $97
  0x021694 $9684: -D0-I-  .byte $FA ; <indirect ref>
  0x021695 $9685: -D0-I-  .byte $FF ; <indirect ref>
  0x021696 $9686: -D0-I-  .byte $A1 ; <indirect ref>
  0x021697 $9687: -D0-I-  .byte $F2 ; <indirect ref>
  0x021698 $9688: -D0-I-  .byte $5E ; <indirect ref>
  0x021699 $9689: -D0-I-  .byte $97 ; <indirect ref>
  0x02169A $968A: -D0-I-  .byte $FA ; <indirect ref>
  0x02169B $968B: -D0-I-  .byte $FF ; <indirect ref>
  0x02169C $968C: -D0-I-  .byte $A1 ; <indirect ref>
  0x02169D $968D: -D0-I-  .byte $F2 ; <indirect ref>
  0x02169E $968E: -D0-I-  .byte $6D ; <indirect ref>
  0x02169F $968F: -D0-I-  .byte $97 ; <indirect ref>
  0x0216A0 $9690: -D0-I-  .byte $F3 ; <indirect ref>
  0x0216A1 $9691: -D0-I-  .byte $8B ; <indirect ref>
  0x0216A2 $9692: -D0-I-  .byte $0B ; <indirect ref>
  0x0216A3 $9693: -D0-I-  .byte $06 ; <indirect ref>
  0x0216A4 $9694: ------  .byte $34
  0x0216A5 $9695: ------  .byte $01
  0x0216A6 $9696: ------  .byte $F2
  0x0216A7 $9697: ------  .byte $8A
  0x0216A8 $9698: ------  .byte $96
  0x0216A9 $9699: -D0-I-  .byte $F3 ; <indirect ref>
  0x0216AA $969A: -D0-I-  .byte $8C ; <indirect ref>
  0x0216AB $969B: ------  .byte $02
  0x0216AC $969C: -D0-I-  .byte $26 ; <indirect ref>
  0x0216AD $969D: -D0-I-  .byte $F3 ; <indirect ref>
  0x0216AE $969E: -D0-I-  .byte $8D ; <indirect ref>
  0x0216AF $969F: -D0-I-  .byte $05 ; <indirect ref>
  0x0216B0 $96A0: ------  .byte $0A
  0x0216B1 $96A1: ------  .byte $0F
  0x0216B2 $96A2: -D0-I-  .byte $14 ; <indirect ref>
  0x0216B3 $96A3: ------  .byte $19
  0x0216B4 $96A4: -D0-I-  .byte $FA ; <indirect ref>
  0x0216B5 $96A5: -D0-I-  .byte $FF ; <indirect ref>
  0x0216B6 $96A6: -D0-I-  .byte $A1 ; <indirect ref>
  0x0216B7 $96A7: -D0-I-  .byte $F2 ; <indirect ref>
  0x0216B8 $96A8: -D0-I-  .byte $87 ; <indirect ref>
  0x0216B9 $96A9: -D0-I-  .byte $97 ; <indirect ref>
  0x0216BA $96AA: ------  .byte $FA
  0x0216BB $96AB: ------  .byte $FF
  0x0216BC $96AC: ------  .byte $A1
  0x0216BD $96AD: ------  .byte $F2
  0x0216BE $96AE: ------  .byte $96
  0x0216BF $96AF: ------  .byte $97
  0x0216C0 $96B0: ------  .byte $FA
  0x0216C1 $96B1: ------  .byte $FF
  0x0216C2 $96B2: ------  .byte $A1
  0x0216C3 $96B3: ------  .byte $F2
  0x0216C4 $96B4: ------  .byte $A8
  0x0216C5 $96B5: ------  .byte $97
  0x0216C6 $96B6: -D0-I-  .byte $FA ; <indirect ref>
  0x0216C7 $96B7: -D0-I-  .byte $FF ; <indirect ref>
  0x0216C8 $96B8: -D0-I-  .byte $A1 ; <indirect ref>
  0x0216C9 $96B9: -D0-I-  .byte $F2 ; <indirect ref>
  0x0216CA $96BA: -D0-I-  .byte $C0 ; <indirect ref>
  0x0216CB $96BB: -D0-I-  .byte $97 ; <indirect ref>
  0x0216CC $96BC: ------  .byte $FA
  0x0216CD $96BD: ------  .byte $FF
  0x0216CE $96BE: ------  .byte $A1
  0x0216CF $96BF: ------  .byte $F2
  0x0216D0 $96C0: ------  .byte $D8
  0x0216D1 $96C1: ------  .byte $97
  0x0216D2 $96C2: -D0-I-  .byte $FA ; <indirect ref>
  0x0216D3 $96C3: -D0-I-  .byte $FF ; <indirect ref>
  0x0216D4 $96C4: -D0-I-  .byte $A1 ; <indirect ref>
  0x0216D5 $96C5: -D0-I-  .byte $F2 ; <indirect ref>
  0x0216D6 $96C6: -D0-I-  .byte $F0 ; <indirect ref>
  0x0216D7 $96C7: -D0-I-  .byte $97 ; <indirect ref>
  0x0216D8 $96C8: ------  .byte $FA
  0x0216D9 $96C9: ------  .byte $FF
  0x0216DA $96CA: ------  .byte $A1
  0x0216DB $96CB: ------  .byte $F2
  0x0216DC $96CC: ------  .byte $02
  0x0216DD $96CD: ------  .byte $98
  0x0216DE $96CE: -D0-I-  .byte $F3 ; <indirect ref>
  0x0216DF $96CF: -D0-I-  .byte $81 ; <indirect ref>
  0x0216E0 $96D0: -D0-I-  .byte $02 ; <indirect ref>
  0x0216E1 $96D1: -D0-I-  .byte $78 ; <indirect ref>
  0x0216E2 $96D2: -D0-I-  .byte $F3 ; <indirect ref>
  0x0216E3 $96D3: -D0-I-  .byte $8B ; <indirect ref>
  0x0216E4 $96D4: -D0-I-  .byte $08 ; <indirect ref>
  0x0216E5 $96D5: -D0-I-  .byte $03 ; <indirect ref>
  0x0216E6 $96D6: -D0-I-  .byte $85 ; <indirect ref>
  0x0216E7 $96D7: -D0-I-  .byte $93 ; <indirect ref>
  0x0216E8 $96D8: -D0-I-  .byte $F3 ; <indirect ref>
  0x0216E9 $96D9: -D0-I-  .byte $8C ; <indirect ref>
  0x0216EA $96DA: ------  .byte $02
  0x0216EB $96DB: -D0-I-  .byte $74 ; <indirect ref>
  0x0216EC $96DC: -D0-I-  .byte $F3 ; <indirect ref>
  0x0216ED $96DD: -D0-I-  .byte $8D ; <indirect ref>
  0x0216EE $96DE: -D0-I-  .byte $29 ; <indirect ref>
  0x0216EF $96DF: -D0-I-  .byte $31 ; <indirect ref>
  0x0216F0 $96E0: ------  .byte $3C
  0x0216F1 $96E1: ------  .byte $4A
  0x0216F2 $96E2: -D0-I-  .byte $5B ; <indirect ref>
  0x0216F3 $96E3: -D0-I-  .byte $FD ; <indirect ref>
  0x0216F4 $96E4: -D0-I-  .byte $03 ; <indirect ref>
  0x0216F5 $96E5: -D0-I-  .byte $FA ; <indirect ref>
  0x0216F6 $96E6: -D0-I-  .byte $F6 ; <indirect ref>
  0x0216F7 $96E7: -D0-I-  .byte $9E ; <indirect ref>
  0x0216F8 $96E8: -D0-I-  .byte $F3 ; <indirect ref>
  0x0216F9 $96E9: -D0-I-  .byte $92 ; <indirect ref>
  0x0216FA $96EA: -D0-I-  .byte $06 ; <indirect ref>
  0x0216FB $96EB: -D0-I-  .byte $01 ; <indirect ref>
  0x0216FC $96EC: -D0-I-  .byte $F3 ; <indirect ref>
  0x0216FD $96ED: -D0-I-  .byte $8C ; <indirect ref>
  0x0216FE $96EE: -D0-I-  .byte $02 ; <indirect ref>
  0x0216FF $96EF: -D0-I-  .byte $66 ; <indirect ref>
  0x021700 $96F0: -D0-I-  .byte $F3 ; <indirect ref>
  0x021701 $96F1: -D0-I-  .byte $8D ; <indirect ref>
  0x021702 $96F2: -D0-I-  .byte $1B ; <indirect ref>
  0x021703 $96F3: -D0-I-  .byte $23 ; <indirect ref>
  0x021704 $96F4: -D0-I-  .byte $2E ; <indirect ref>
  0x021705 $96F5: -D0-I-  .byte $3C ; <indirect ref>
  0x021706 $96F6: -D0-I-  .byte $4D ; <indirect ref>
  0x021707 $96F7: -D0-I-  .byte $FA ; <indirect ref>
  0x021708 $96F8: -D0-I-  .byte $31 ; <indirect ref>
  0x021709 $96F9: -D0-I-  .byte $AB ; <indirect ref>
  0x02170A $96FA: -D0-I-  .byte $FD ; <indirect ref>
  0x02170B $96FB: -D0-I-  .byte $03 ; <indirect ref>
  0x02170C $96FC: -D0-I-  .byte $FA ; <indirect ref>
  0x02170D $96FD: -D0-I-  .byte $E7 ; <indirect ref>
  0x02170E $96FE: -D0-I-  .byte $B4 ; <indirect ref>
  0x02170F $96FF: -D0-I-  .byte $F3 ; <indirect ref>
  0x021710 $9700: -D0-I-  .byte $93 ; <indirect ref>
  0x021711 $9701: -D0-I-  .byte $03 ; <indirect ref>
  0x021712 $9702: -D0-I-  .byte $41 ; <indirect ref>
  0x021713 $9703: -D0-I-  .byte $1F ; <indirect ref>
  0x021714 $9704: -D0-I-  .byte $F2 ; <indirect ref>
  0x021715 $9705: -D0-I-  .byte $28 ; <indirect ref>
  0x021716 $9706: -D0-I-  .byte $9C ; <indirect ref>
  0x021717 $9707: -D0-I-  .byte $FA ; <indirect ref>
  0x021718 $9708: -D0-I-  .byte $E4 ; <indirect ref>
  0x021719 $9709: -D0-I-  .byte $A1 ; <indirect ref>
  0x02171A $970A: -D0-I-  .byte $FA ; <indirect ref>
  0x02171B $970B: -D0-I-  .byte $09 ; <indirect ref>
  0x02171C $970C: -D0-I-  .byte $A1 ; <indirect ref>
  0x02171D $970D: -D0-I-  .byte $F2 ; <indirect ref>
  0x02171E $970E: -D0-I-  .byte $28 ; <indirect ref>
  0x02171F $970F: -D0-I-  .byte $9C ; <indirect ref>
  0x021720 $9710: -D0-I-  .byte $FA ; <indirect ref>
  0x021721 $9711: -D0-I-  .byte $E4 ; <indirect ref>
  0x021722 $9712: -D0-I-  .byte $A1 ; <indirect ref>
  0x021723 $9713: -D0-I-  .byte $FA ; <indirect ref>
  0x021724 $9714: -D0-I-  .byte $09 ; <indirect ref>
  0x021725 $9715: -D0-I-  .byte $A1 ; <indirect ref>
  0x021726 $9716: -D0-I-  .byte $FA ; <indirect ref>
  0x021727 $9717: -D0-I-  .byte $4E ; <indirect ref>
  0x021728 $9718: -D0-I-  .byte $A2 ; <indirect ref>
  0x021729 $9719: -D0-I-  .byte $F2 ; <indirect ref>
  0x02172A $971A: -D0-I-  .byte $58 ; <indirect ref>
  0x02172B $971B: -D0-I-  .byte $A2 ; <indirect ref>
  0x02172C $971C: ------  .byte $FA
  0x02172D $971D: ------  .byte $E4
  0x02172E $971E: ------  .byte $A1
  0x02172F $971F: ------  .byte $FA
  0x021730 $9720: ------  .byte $09
  0x021731 $9721: ------  .byte $A1
  0x021732 $9722: -D0-I-  .byte $FA ; <indirect ref>
  0x021733 $9723: -D0-I-  .byte $B6 ; <indirect ref>
  0x021734 $9724: -D0-I-  .byte $A0 ; <indirect ref>
  0x021735 $9725: -D0-I-  .byte $FA ; <indirect ref>
  0x021736 $9726: -D0-I-  .byte $12 ; <indirect ref>
  0x021737 $9727: -D0-I-  .byte $A3 ; <indirect ref>
  0x021738 $9728: -D0-I-  .byte $F2 ; <indirect ref>
  0x021739 $9729: -D0-I-  .byte $71 ; <indirect ref>
  0x02173A $972A: -D0-I-  .byte $A3 ; <indirect ref>
  0x02173B $972B: ------  .byte $FA
  0x02173C $972C: ------  .byte $E4
  0x02173D $972D: ------  .byte $A1
  0x02173E $972E: -D0-I-  .byte $FA ; <indirect ref>
  0x02173F $972F: -D0-I-  .byte $09 ; <indirect ref>
  0x021740 $9730: -D0-I-  .byte $A1 ; <indirect ref>
  0x021741 $9731: -D0-I-  .byte $FA ; <indirect ref>
  0x021742 $9732: -D0-I-  .byte $4E ; <indirect ref>
  0x021743 $9733: -D0-I-  .byte $A2 ; <indirect ref>
  0x021744 $9734: -D0-I-  .byte $FA ; <indirect ref>
  0x021745 $9735: -D0-I-  .byte $58 ; <indirect ref>
  0x021746 $9736: -D0-I-  .byte $A2 ; <indirect ref>
  0x021747 $9737: -D0-I-  .byte $FA ; <indirect ref>
  0x021748 $9738: -D0-I-  .byte $12 ; <indirect ref>
  0x021749 $9739: -D0-I-  .byte $A2 ; <indirect ref>
  0x02174A $973A: -D0-I-  .byte $F2 ; <indirect ref>
  0x02174B $973B: -D0-I-  .byte $28 ; <indirect ref>
  0x02174C $973C: -D0-I-  .byte $9C ; <indirect ref>
  0x02174D $973D: -D0-I-  .byte $FA ; <indirect ref>
  0x02174E $973E: -D0-I-  .byte $E4 ; <indirect ref>
  0x02174F $973F: -D0-I-  .byte $A1 ; <indirect ref>
  0x021750 $9740: -D0-I-  .byte $FA ; <indirect ref>
  0x021751 $9741: -D0-I-  .byte $09 ; <indirect ref>
  0x021752 $9742: -D0-I-  .byte $A1 ; <indirect ref>
  0x021753 $9743: -D0-I-  .byte $FA ; <indirect ref>
  0x021754 $9744: -D0-I-  .byte $BE ; <indirect ref>
  0x021755 $9745: -D0-I-  .byte $A0 ; <indirect ref>
  0x021756 $9746: -D0-I-  .byte $F2 ; <indirect ref>
  0x021757 $9747: -D0-I-  .byte $28 ; <indirect ref>
  0x021758 $9748: -D0-I-  .byte $9C ; <indirect ref>
  0x021759 $9749: -D0-I-  .byte $F3 ; <indirect ref>
  0x02175A $974A: -D0-I-  .byte $8B ; <indirect ref>
  0x02175B $974B: -D0-I-  .byte $32 ; <indirect ref>
  0x02175C $974C: ------  .byte $2D
  0x02175D $974D: ------  .byte $B2
  0x02175E $974E: ------  .byte $28
  0x02175F $974F: -D0-I-  .byte $FA ; <indirect ref>
  0x021760 $9750: -D0-I-  .byte $E4 ; <indirect ref>
  0x021761 $9751: -D0-I-  .byte $A1 ; <indirect ref>
  0x021762 $9752: -D0-I-  .byte $FA ; <indirect ref>
  0x021763 $9753: -D0-I-  .byte $09 ; <indirect ref>
  0x021764 $9754: -D0-I-  .byte $A1 ; <indirect ref>
  0x021765 $9755: -D0-I-  .byte $FA ; <indirect ref>
  0x021766 $9756: -D0-I-  .byte $F4 ; <indirect ref>
  0x021767 $9757: -D0-I-  .byte $A2 ; <indirect ref>
  0x021768 $9758: -D0-I-  .byte $F2 ; <indirect ref>
  0x021769 $9759: -D0-I-  .byte $64 ; <indirect ref>
  0x02176A $975A: -D0-I-  .byte $A3 ; <indirect ref>
  0x02176B $975B: -D0-I-  .byte $FA ; <indirect ref>
  0x02176C $975C: -D0-I-  .byte $E4 ; <indirect ref>
  0x02176D $975D: -D0-I-  .byte $A1 ; <indirect ref>
  0x02176E $975E: -D0-I-  .byte $FA ; <indirect ref>
  0x02176F $975F: -D0-I-  .byte $46 ; <indirect ref>
  0x021770 $9760: -D0-I-  .byte $A1 ; <indirect ref>
  0x021771 $9761: -D0-I-  .byte $FA ; <indirect ref>
  0x021772 $9762: -D0-I-  .byte $08 ; <indirect ref>
  0x021773 $9763: -D0-I-  .byte $A3 ; <indirect ref>
  0x021774 $9764: -D0-I-  .byte $FA ; <indirect ref>
  0x021775 $9765: -D0-I-  .byte $71 ; <indirect ref>
  0x021776 $9766: -D0-I-  .byte $A3 ; <indirect ref>
  0x021777 $9767: -D0-I-  .byte $F2 ; <indirect ref>
  0x021778 $9768: -D0-I-  .byte $F0 ; <indirect ref>
  0x021779 $9769: -D0-I-  .byte $9E ; <indirect ref>
  0x02177A $976A: -D0-I-  .byte $FA ; <indirect ref>
  0x02177B $976B: -D0-I-  .byte $E4 ; <indirect ref>
  0x02177C $976C: -D0-I-  .byte $A1 ; <indirect ref>
  0x02177D $976D: -D0-I-  .byte $FA ; <indirect ref>
  0x02177E $976E: -D0-I-  .byte $99 ; <indirect ref>
  0x02177F $976F: -D0-I-  .byte $A0 ; <indirect ref>
  0x021780 $9770: -D0-I-  .byte $FA ; <indirect ref>
  0x021781 $9771: -D0-I-  .byte $4E ; <indirect ref>
  0x021782 $9772: -D0-I-  .byte $B4 ; <indirect ref>
  0x021783 $9773: -D0-I-  .byte $F2 ; <indirect ref>
  0x021784 $9774: -D0-I-  .byte $F0 ; <indirect ref>
  0x021785 $9775: -D0-I-  .byte $9E ; <indirect ref>
  0x021786 $9776: ------  .byte $F2
  0x021787 $9777: ------  .byte $6A
  0x021788 $9778: ------  .byte $97
  0x021789 $9779: ------  .byte $F3
  0x02178A $977A: ------  .byte $8C
  0x02178B $977B: ------  .byte $02
  0x02178C $977C: ------  .byte $71
  0x02178D $977D: -D0-I-  .byte $F3 ; <indirect ref>
  0x02178E $977E: -D0-I-  .byte $8D ; <indirect ref>
  0x02178F $977F: -D0-I-  .byte $05 ; <indirect ref>
  0x021790 $9780: ------  .byte $13
  0x021791 $9781: ------  .byte $24
  0x021792 $9782: ------  .byte $3B
  0x021793 $9783: ------  .byte $52
  0x021794 $9784: -D0-I-  .byte $FA ; <indirect ref>
  0x021795 $9785: -D0-I-  .byte $E4 ; <indirect ref>
  0x021796 $9786: -D0-I-  .byte $A1 ; <indirect ref>
  0x021797 $9787: -D0-I-  .byte $FA ; <indirect ref>
  0x021798 $9788: -D0-I-  .byte $1D ; <indirect ref>
  0x021799 $9789: -D0-I-  .byte $A1 ; <indirect ref>
  0x02179A $978A: -D0-I-  .byte $FA ; <indirect ref>
  0x02179B $978B: -D0-I-  .byte $DD ; <indirect ref>
  0x02179C $978C: -D0-I-  .byte $A2 ; <indirect ref>
  0x02179D $978D: -D0-I-  .byte $FA ; <indirect ref>
  0x02179E $978E: -D0-I-  .byte $B5 ; <indirect ref>
  0x02179F $978F: -D0-I-  .byte $9F ; <indirect ref>
  0x0217A0 $9790: -D0-I-  .byte $F2 ; <indirect ref>
  0x0217A1 $9791: -D0-I-  .byte $28 ; <indirect ref>
  0x0217A2 $9792: -D0-I-  .byte $9C ; <indirect ref>
  0x0217A3 $9793: ------  .byte $FA
  0x0217A4 $9794: ------  .byte $E4
  0x0217A5 $9795: ------  .byte $A1
  0x0217A6 $9796: ------  .byte $FA
  0x0217A7 $9797: ------  .byte $1D
  0x0217A8 $9798: ------  .byte $A1
  0x0217A9 $9799: -D0-I-  .byte $FA ; <indirect ref>
  0x0217AA $979A: -D0-I-  .byte $DD ; <indirect ref>
  0x0217AB $979B: -D0-I-  .byte $A2 ; <indirect ref>
  0x0217AC $979C: -D0-I-  .byte $FA ; <indirect ref>
  0x0217AD $979D: -D0-I-  .byte $B5 ; <indirect ref>
  0x0217AE $979E: -D0-I-  .byte $9F ; <indirect ref>
  0x0217AF $979F: -D0-I-  .byte $FA ; <indirect ref>
  0x0217B0 $97A0: -D0-I-  .byte $4E ; <indirect ref>
  0x0217B1 $97A1: -D0-I-  .byte $A2 ; <indirect ref>
  0x0217B2 $97A2: -D0-I-  .byte $F2 ; <indirect ref>
  0x0217B3 $97A3: -D0-I-  .byte $58 ; <indirect ref>
  0x0217B4 $97A4: -D0-I-  .byte $A2 ; <indirect ref>
  0x0217B5 $97A5: ------  .byte $FA
  0x0217B6 $97A6: ------  .byte $E4
  0x0217B7 $97A7: ------  .byte $A1
  0x0217B8 $97A8: ------  .byte $FA
  0x0217B9 $97A9: ------  .byte $1D
  0x0217BA $97AA: ------  .byte $A1
  0x0217BB $97AB: -D0-I-  .byte $FA ; <indirect ref>
  0x0217BC $97AC: -D0-I-  .byte $DD ; <indirect ref>
  0x0217BD $97AD: -D0-I-  .byte $A2 ; <indirect ref>
  0x0217BE $97AE: -D0-I-  .byte $FA ; <indirect ref>
  0x0217BF $97AF: -D0-I-  .byte $B5 ; <indirect ref>
  0x0217C0 $97B0: -D0-I-  .byte $9F ; <indirect ref>
  0x0217C1 $97B1: -D0-I-  .byte $FA ; <indirect ref>
  0x0217C2 $97B2: -D0-I-  .byte $B6 ; <indirect ref>
  0x0217C3 $97B3: -D0-I-  .byte $A0 ; <indirect ref>
  0x0217C4 $97B4: -D0-I-  .byte $FA ; <indirect ref>
  0x0217C5 $97B5: -D0-I-  .byte $E7 ; <indirect ref>
  0x0217C6 $97B6: -D0-I-  .byte $A2 ; <indirect ref>
  0x0217C7 $97B7: -D0-I-  .byte $FA ; <indirect ref>
  0x0217C8 $97B8: -D0-I-  .byte $1B ; <indirect ref>
  0x0217C9 $97B9: -D0-I-  .byte $9E ; <indirect ref>
  0x0217CA $97BA: -D0-I-  .byte $F2 ; <indirect ref>
  0x0217CB $97BB: -D0-I-  .byte $71 ; <indirect ref>
  0x0217CC $97BC: -D0-I-  .byte $A3 ; <indirect ref>
  0x0217CD $97BD: ------  .byte $FA
  0x0217CE $97BE: ------  .byte $E4
  0x0217CF $97BF: ------  .byte $A1
  0x0217D0 $97C0: -D0-I-  .byte $FA ; <indirect ref>
  0x0217D1 $97C1: -D0-I-  .byte $1D ; <indirect ref>
  0x0217D2 $97C2: -D0-I-  .byte $A1 ; <indirect ref>
  0x0217D3 $97C3: -D0-I-  .byte $FA ; <indirect ref>
  0x0217D4 $97C4: -D0-I-  .byte $DD ; <indirect ref>
  0x0217D5 $97C5: -D0-I-  .byte $A2 ; <indirect ref>
  0x0217D6 $97C6: -D0-I-  .byte $FA ; <indirect ref>
  0x0217D7 $97C7: -D0-I-  .byte $B5 ; <indirect ref>
  0x0217D8 $97C8: -D0-I-  .byte $9F ; <indirect ref>
  0x0217D9 $97C9: -D0-I-  .byte $FA ; <indirect ref>
  0x0217DA $97CA: -D0-I-  .byte $4E ; <indirect ref>
  0x0217DB $97CB: -D0-I-  .byte $A2 ; <indirect ref>
  0x0217DC $97CC: -D0-I-  .byte $FA ; <indirect ref>
  0x0217DD $97CD: -D0-I-  .byte $58 ; <indirect ref>
  0x0217DE $97CE: -D0-I-  .byte $A2 ; <indirect ref>
  0x0217DF $97CF: -D0-I-  .byte $FA ; <indirect ref>
  0x0217E0 $97D0: -D0-I-  .byte $12 ; <indirect ref>
  0x0217E1 $97D1: -D0-I-  .byte $A2 ; <indirect ref>
  0x0217E2 $97D2: -D0-I-  .byte $F2 ; <indirect ref>
  0x0217E3 $97D3: -D0-I-  .byte $28 ; <indirect ref>
  0x0217E4 $97D4: -D0-I-  .byte $9C ; <indirect ref>
  0x0217E5 $97D5: ------  .byte $FA
  0x0217E6 $97D6: ------  .byte $E4
  0x0217E7 $97D7: ------  .byte $A1
  0x0217E8 $97D8: ------  .byte $FA
  0x0217E9 $97D9: ------  .byte $1D
  0x0217EA $97DA: ------  .byte $A1
  0x0217EB $97DB: -D0-I-  .byte $FA ; <indirect ref>
  0x0217EC $97DC: -D0-I-  .byte $DD ; <indirect ref>
  0x0217ED $97DD: -D0-I-  .byte $A2 ; <indirect ref>
  0x0217EE $97DE: -D0-I-  .byte $FA ; <indirect ref>
  0x0217EF $97DF: -D0-I-  .byte $B5 ; <indirect ref>
  0x0217F0 $97E0: -D0-I-  .byte $9F ; <indirect ref>
  0x0217F1 $97E1: -D0-I-  .byte $FA ; <indirect ref>
  0x0217F2 $97E2: -D0-I-  .byte $B6 ; <indirect ref>
  0x0217F3 $97E3: -D0-I-  .byte $A0 ; <indirect ref>
  0x0217F4 $97E4: -D0-I-  .byte $FA ; <indirect ref>
  0x0217F5 $97E5: -D0-I-  .byte $E7 ; <indirect ref>
  0x0217F6 $97E6: -D0-I-  .byte $A2 ; <indirect ref>
  0x0217F7 $97E7: -D0-I-  .byte $FA ; <indirect ref>
  0x0217F8 $97E8: -D0-I-  .byte $1B ; <indirect ref>
  0x0217F9 $97E9: -D0-I-  .byte $9E ; <indirect ref>
  0x0217FA $97EA: -D0-I-  .byte $F2 ; <indirect ref>
  0x0217FB $97EB: -D0-I-  .byte $28 ; <indirect ref>
  0x0217FC $97EC: -D0-I-  .byte $9C ; <indirect ref>
  0x0217FD $97ED: ------  .byte $FA
  0x0217FE $97EE: ------  .byte $E4
  0x0217FF $97EF: ------  .byte $A1
  0x021800 $97F0: -D0-I-  .byte $FA ; <indirect ref>
  0x021801 $97F1: -D0-I-  .byte $1D ; <indirect ref>
  0x021802 $97F2: -D0-I-  .byte $A1 ; <indirect ref>
  0x021803 $97F3: -D0-I-  .byte $FA ; <indirect ref>
  0x021804 $97F4: -D0-I-  .byte $DD ; <indirect ref>
  0x021805 $97F5: -D0-I-  .byte $A2 ; <indirect ref>
  0x021806 $97F6: -D0-I-  .byte $FA ; <indirect ref>
  0x021807 $97F7: -D0-I-  .byte $B5 ; <indirect ref>
  0x021808 $97F8: -D0-I-  .byte $9F ; <indirect ref>
  0x021809 $97F9: -D0-I-  .byte $FA ; <indirect ref>
  0x02180A $97FA: -D0-I-  .byte $F4 ; <indirect ref>
  0x02180B $97FB: -D0-I-  .byte $A2 ; <indirect ref>
  0x02180C $97FC: -D0-I-  .byte $F2 ; <indirect ref>
  0x02180D $97FD: -D0-I-  .byte $64 ; <indirect ref>
  0x02180E $97FE: -D0-I-  .byte $A3 ; <indirect ref>
  0x02180F $97FF: ------  .byte $FA
  0x021810 $9800: ------  .byte $E4
  0x021811 $9801: ------  .byte $A1
  0x021812 $9802: ------  .byte $FA
  0x021813 $9803: ------  .byte $1D
  0x021814 $9804: ------  .byte $A1
  0x021815 $9805: ------  .byte $FA
  0x021816 $9806: ------  .byte $DD
  0x021817 $9807: ------  .byte $A2
  0x021818 $9808: ------  .byte $FA
  0x021819 $9809: ------  .byte $B5
  0x02181A $980A: ------  .byte $9F
  0x02181B $980B: ------  .byte $FA
  0x02181C $980C: ------  .byte $71
  0x02181D $980D: ------  .byte $A3
  0x02181E $980E: ------  .byte $F2
  0x02181F $980F: ------  .byte $F0
  0x021820 $9810: ------  .byte $9E
  0x021821 $9811: -D0-I-  .byte $F3 ; <indirect ref>
  0x021822 $9812: -D0-I-  .byte $8E ; <indirect ref>
  0x021823 $9813: -D0-I-  .byte $03 ; <indirect ref>
  0x021824 $9814: ------  .byte $21
  0x021825 $9815: -D0-I-  .byte $08 ; <indirect ref>
  0x021826 $9816: -D0-I-  .byte $FA ; <indirect ref>
  0x021827 $9817: -D0-I-  .byte $D6 ; <indirect ref>
  0x021828 $9818: -D0-I-  .byte $9F ; <indirect ref>
  0x021829 $9819: -D0-I-  .byte $F3 ; <indirect ref>
  0x02182A $981A: -D0-I-  .byte $81 ; <indirect ref>
  0x02182B $981B: -D0-I-  .byte $0B ; <indirect ref>
  0x02182C $981C: -D0-I-  .byte $44 ; <indirect ref>
  0x02182D $981D: -D0-I-  .byte $FA ; <indirect ref>
  0x02182E $981E: -D0-I-  .byte $D6 ; <indirect ref>
  0x02182F $981F: -D0-I-  .byte $9F ; <indirect ref>
  0x021830 $9820: -D0-I-  .byte $FD ; <indirect ref>
  0x021831 $9821: -D0-I-  .byte $03 ; <indirect ref>
  0x021832 $9822: -D0-I-  .byte $F3 ; <indirect ref>
  0x021833 $9823: -D0-I-  .byte $81 ; <indirect ref>
  0x021834 $9824: -D0-I-  .byte $70 ; <indirect ref>
  0x021835 $9825: -D0-I-  .byte $94 ; <indirect ref>
  0x021836 $9826: -D0-I-  .byte $F3 ; <indirect ref>
  0x021837 $9827: -D0-I-  .byte $8F ; <indirect ref>
  0x021838 $9828: -D0-I-  .byte $05 ; <indirect ref>
  0x021839 $9829: -D0-I-  .byte $0D ; <indirect ref>
  0x02183A $982A: -D0-I-  .byte $1A ; <indirect ref>
  0x02183B $982B: -D0-I-  .byte $27 ; <indirect ref>
  0x02183C $982C: ------  .byte $2E
  0x02183D $982D: -D0-I-  .byte $FA ; <indirect ref>
  0x02183E $982E: -D0-I-  .byte $F3 ; <indirect ref>
  0x02183F $982F: -D0-I-  .byte $9C ; <indirect ref>
  0x021840 $9830: -D0-I-  .byte $FD ; <indirect ref>
  0x021841 $9831: -D0-I-  .byte $03 ; <indirect ref>
  0x021842 $9832: -D0-I-  .byte $FA ; <indirect ref>
  0x021843 $9833: -D0-I-  .byte $8D ; <indirect ref>
  0x021844 $9834: -D0-I-  .byte $A0 ; <indirect ref>
  0x021845 $9835: -D0-I-  .byte $F0 ; <indirect ref>
  0x021846 $9836: -D0-I-  .byte $FA ; <indirect ref>
  0x021847 $9837: -D0-I-  .byte $F3 ; <indirect ref>
  0x021848 $9838: -D0-I-  .byte $9C ; <indirect ref>
  0x021849 $9839: -D0-I-  .byte $FD ; <indirect ref>
  0x02184A $983A: -D0-I-  .byte $03 ; <indirect ref>
  0x02184B $983B: -D0-I-  .byte $FA ; <indirect ref>
  0x02184C $983C: -D0-I-  .byte $A1 ; <indirect ref>
  0x02184D $983D: -D0-I-  .byte $A0 ; <indirect ref>
  0x02184E $983E: -D0-I-  .byte $FA ; <indirect ref>
  0x02184F $983F: -D0-I-  .byte $08 ; <indirect ref>
  0x021850 $9840: -D0-I-  .byte $A3 ; <indirect ref>
  0x021851 $9841: -D0-I-  .byte $F2 ; <indirect ref>
  0x021852 $9842: -D0-I-  .byte $5D ; <indirect ref>
  0x021853 $9843: -D0-I-  .byte $B4 ; <indirect ref>
  0x021854 $9844: -D0-I-  .byte $FA ; <indirect ref>
  0x021855 $9845: -D0-I-  .byte $F3 ; <indirect ref>
  0x021856 $9846: -D0-I-  .byte $9C ; <indirect ref>
  0x021857 $9847: -D0-I-  .byte $FD ; <indirect ref>
  0x021858 $9848: -D0-I-  .byte $03 ; <indirect ref>
  0x021859 $9849: -D0-I-  .byte $FA ; <indirect ref>
  0x02185A $984A: -D0-I-  .byte $4B ; <indirect ref>
  0x02185B $984B: -D0-I-  .byte $A1 ; <indirect ref>
  0x02185C $984C: -D0-I-  .byte $FA ; <indirect ref>
  0x02185D $984D: -D0-I-  .byte $08 ; <indirect ref>
  0x02185E $984E: -D0-I-  .byte $A3 ; <indirect ref>
  0x02185F $984F: -D0-I-  .byte $F2 ; <indirect ref>
  0x021860 $9850: -D0-I-  .byte $5D ; <indirect ref>
  0x021861 $9851: -D0-I-  .byte $B4 ; <indirect ref>
  0x021862 $9852: -D0-I-  .byte $FA ; <indirect ref>
  0x021863 $9853: -D0-I-  .byte $F3 ; <indirect ref>
  0x021864 $9854: -D0-I-  .byte $9C ; <indirect ref>
  0x021865 $9855: -D0-I-  .byte $FD ; <indirect ref>
  0x021866 $9856: -D0-I-  .byte $03 ; <indirect ref>
  0x021867 $9857: -D0-I-  .byte $F2 ; <indirect ref>
  0x021868 $9858: -D0-I-  .byte $A6 ; <indirect ref>
  0x021869 $9859: -D0-I-  .byte $A0 ; <indirect ref>
  0x02186A $985A: ------  .byte $FA
  0x02186B $985B: ------  .byte $DD
  0x02186C $985C: ------  .byte $A2
  0x02186D $985D: ------  .byte $F2
  0x02186E $985E: ------  .byte $5B
  0x02186F $985F: ------  .byte $A3
  0x021870 $9860: -D0-I-  .byte $F3 ; <indirect ref>
  0x021871 $9861: -D0-I-  .byte $8F ; <indirect ref>
  0x021872 $9862: -D0-I-  .byte $05 ; <indirect ref>
  0x021873 $9863: -D0-I-  .byte $12 ; <indirect ref>
  0x021874 $9864: ------  .byte $11
  0x021875 $9865: -D0-I-  .byte $1B ; <indirect ref>
  0x021876 $9866: ------  .byte $25
  0x021877 $9867: -D0-I-  .byte $FA ; <indirect ref>
  0x021878 $9868: -D0-I-  .byte $F3 ; <indirect ref>
  0x021879 $9869: -D0-I-  .byte $9C ; <indirect ref>
  0x02187A $986A: -D0-I-  .byte $FD ; <indirect ref>
  0x02187B $986B: -D0-I-  .byte $03 ; <indirect ref>
  0x02187C $986C: -D0-I-  .byte $FA ; <indirect ref>
  0x02187D $986D: -D0-I-  .byte $A1 ; <indirect ref>
  0x02187E $986E: -D0-I-  .byte $A0 ; <indirect ref>
  0x02187F $986F: -D0-I-  .byte $FA ; <indirect ref>
  0x021880 $9870: -D0-I-  .byte $DD ; <indirect ref>
  0x021881 $9871: -D0-I-  .byte $A2 ; <indirect ref>
  0x021882 $9872: -D0-I-  .byte $F2 ; <indirect ref>
  0x021883 $9873: -D0-I-  .byte $B5 ; <indirect ref>
  0x021884 $9874: -D0-I-  .byte $9F ; <indirect ref>
  0x021885 $9875: -D0-I-  .byte $FA ; <indirect ref>
  0x021886 $9876: -D0-I-  .byte $DD ; <indirect ref>
  0x021887 $9877: -D0-I-  .byte $A2 ; <indirect ref>
  0x021888 $9878: -D0-I-  .byte $FD ; <indirect ref>
  0x021889 $9879: -D0-I-  .byte $03 ; <indirect ref>
  0x02188A $987A: -D0-I-  .byte $FA ; <indirect ref>
  0x02188B $987B: -D0-I-  .byte $6E ; <indirect ref>
  0x02188C $987C: -D0-I-  .byte $9F ; <indirect ref>
  0x02188D $987D: -D0-I-  .byte $F2 ; <indirect ref>
  0x02188E $987E: -D0-I-  .byte $71 ; <indirect ref>
  0x02188F $987F: -D0-I-  .byte $A3 ; <indirect ref>
  0x021890 $9880: -D0-I-  .byte $FA ; <indirect ref>
  0x021891 $9881: -D0-I-  .byte $DD ; <indirect ref>
  0x021892 $9882: -D0-I-  .byte $A2 ; <indirect ref>
  0x021893 $9883: -D0-I-  .byte $FD ; <indirect ref>
  0x021894 $9884: -D0-I-  .byte $03 ; <indirect ref>
  0x021895 $9885: -D0-I-  .byte $FA ; <indirect ref>
  0x021896 $9886: -D0-I-  .byte $68 ; <indirect ref>
  0x021897 $9887: -D0-I-  .byte $9F ; <indirect ref>
  0x021898 $9888: -D0-I-  .byte $F2 ; <indirect ref>
  0x021899 $9889: -D0-I-  .byte $BF ; <indirect ref>
  0x02189A $988A: -D0-I-  .byte $9F ; <indirect ref>
  0x02189B $988B: ------  .byte $FA
  0x02189C $988C: ------  .byte $DD
  0x02189D $988D: ------  .byte $A2
  0x02189E $988E: ------  .byte $FA
  0x02189F $988F: ------  .byte $6E
  0x0218A0 $9890: ------  .byte $9F
  0x0218A1 $9891: ------  .byte $F2
  0x0218A2 $9892: ------  .byte $5B
  0x0218A3 $9893: ------  .byte $A3
  0x0218A4 $9894: -D0-I-  .byte $F3 ; <indirect ref>
  0x0218A5 $9895: -D0-I-  .byte $8F ; <indirect ref>
  0x0218A6 $9896: -D0-I-  .byte $05 ; <indirect ref>
  0x0218A7 $9897: -D0-I-  .byte $07 ; <indirect ref>
  0x0218A8 $9898: -D0-I-  .byte $06 ; <indirect ref>
  0x0218A9 $9899: -D0-I-  .byte $0E ; <indirect ref>
  0x0218AA $989A: -D0-I-  .byte $16 ; <indirect ref>
  0x0218AB $989B: -D0-I-  .byte $F2 ; <indirect ref>
  0x0218AC $989C: -D0-I-  .byte $C0 ; <indirect ref>
  0x0218AD $989D: -D0-I-  .byte $9C ; <indirect ref>
  0x0218AE $989E: -D0-I-  .byte $FA ; <indirect ref>
  0x0218AF $989F: -D0-I-  .byte $FE ; <indirect ref>
  0x0218B0 $98A0: -D0-I-  .byte $9D ; <indirect ref>
  0x0218B1 $98A1: -D0-I-  .byte $FA ; <indirect ref>
  0x0218B2 $98A2: -D0-I-  .byte $08 ; <indirect ref>
  0x0218B3 $98A3: -D0-I-  .byte $A3 ; <indirect ref>
  0x0218B4 $98A4: -D0-I-  .byte $F2 ; <indirect ref>
  0x0218B5 $98A5: -D0-I-  .byte $71 ; <indirect ref>
  0x0218B6 $98A6: -D0-I-  .byte $A3 ; <indirect ref>
  0x0218B7 $98A7: -D0-I-  .byte $FA ; <indirect ref>
  0x0218B8 $98A8: -D0-I-  .byte $FE ; <indirect ref>
  0x0218B9 $98A9: -D0-I-  .byte $9D ; <indirect ref>
  0x0218BA $98AA: -D0-I-  .byte $FA ; <indirect ref>
  0x0218BB $98AB: -D0-I-  .byte $EF ; <indirect ref>
  0x0218BC $98AC: -D0-I-  .byte $A2 ; <indirect ref>
  0x0218BD $98AD: -D0-I-  .byte $F2 ; <indirect ref>
  0x0218BE $98AE: -D0-I-  .byte $CE ; <indirect ref>
  0x0218BF $98AF: -D0-I-  .byte $9F ; <indirect ref>
  0x0218C0 $98B0: -D0-I-  .byte $FA ; <indirect ref>
  0x0218C1 $98B1: -D0-I-  .byte $FE ; <indirect ref>
  0x0218C2 $98B2: -D0-I-  .byte $9D ; <indirect ref>
  0x0218C3 $98B3: -D0-I-  .byte $FA ; <indirect ref>
  0x0218C4 $98B4: -D0-I-  .byte $DD ; <indirect ref>
  0x0218C5 $98B5: -D0-I-  .byte $A2 ; <indirect ref>
  0x0218C6 $98B6: -D0-I-  .byte $F2 ; <indirect ref>
  0x0218C7 $98B7: -D0-I-  .byte $5B ; <indirect ref>
  0x0218C8 $98B8: -D0-I-  .byte $A3 ; <indirect ref>
  0x0218C9 $98B9: -D0-I-  .byte $F3 ; <indirect ref>
  0x0218CA $98BA: -D0-I-  .byte $8F ; <indirect ref>
  0x0218CB $98BB: -D0-I-  .byte $05 ; <indirect ref>
  0x0218CC $98BC: -D0-I-  .byte $0D ; <indirect ref>
  0x0218CD $98BD: ------  .byte $0C
  0x0218CE $98BE: -D0-I-  .byte $17 ; <indirect ref>
  0x0218CF $98BF: ------  .byte $22
  0x0218D0 $98C0: -D0-I-  .byte $FA ; <indirect ref>
  0x0218D1 $98C1: -D0-I-  .byte $FE ; <indirect ref>
  0x0218D2 $98C2: -D0-I-  .byte $9D ; <indirect ref>
  0x0218D3 $98C3: -D0-I-  .byte $FA ; <indirect ref>
  0x0218D4 $98C4: -D0-I-  .byte $DD ; <indirect ref>
  0x0218D5 $98C5: -D0-I-  .byte $A2 ; <indirect ref>
  0x0218D6 $98C6: -D0-I-  .byte $F2 ; <indirect ref>
  0x0218D7 $98C7: -D0-I-  .byte $B5 ; <indirect ref>
  0x0218D8 $98C8: -D0-I-  .byte $9F ; <indirect ref>
  0x0218D9 $98C9: -D0-I-  .byte $FA ; <indirect ref>
  0x0218DA $98CA: -D0-I-  .byte $FE ; <indirect ref>
  0x0218DB $98CB: -D0-I-  .byte $9D ; <indirect ref>
  0x0218DC $98CC: -D0-I-  .byte $FA ; <indirect ref>
  0x0218DD $98CD: -D0-I-  .byte $DD ; <indirect ref>
  0x0218DE $98CE: -D0-I-  .byte $A2 ; <indirect ref>
  0x0218DF $98CF: -D0-I-  .byte $FA ; <indirect ref>
  0x0218E0 $98D0: -D0-I-  .byte $6E ; <indirect ref>
  0x0218E1 $98D1: -D0-I-  .byte $9F ; <indirect ref>
  0x0218E2 $98D2: -D0-I-  .byte $F2 ; <indirect ref>
  0x0218E3 $98D3: -D0-I-  .byte $71 ; <indirect ref>
  0x0218E4 $98D4: -D0-I-  .byte $A3 ; <indirect ref>
  0x0218E5 $98D5: -D0-I-  .byte $FA ; <indirect ref>
  0x0218E6 $98D6: -D0-I-  .byte $FE ; <indirect ref>
  0x0218E7 $98D7: -D0-I-  .byte $9D ; <indirect ref>
  0x0218E8 $98D8: -D0-I-  .byte $FA ; <indirect ref>
  0x0218E9 $98D9: -D0-I-  .byte $DD ; <indirect ref>
  0x0218EA $98DA: -D0-I-  .byte $A2 ; <indirect ref>
  0x0218EB $98DB: -D0-I-  .byte $FA ; <indirect ref>
  0x0218EC $98DC: -D0-I-  .byte $68 ; <indirect ref>
  0x0218ED $98DD: -D0-I-  .byte $9F ; <indirect ref>
  0x0218EE $98DE: -D0-I-  .byte $F2 ; <indirect ref>
  0x0218EF $98DF: -D0-I-  .byte $BF ; <indirect ref>
  0x0218F0 $98E0: -D0-I-  .byte $9F ; <indirect ref>
  0x0218F1 $98E1: ------  .byte $FA
  0x0218F2 $98E2: ------  .byte $FE
  0x0218F3 $98E3: ------  .byte $9D
  0x0218F4 $98E4: ------  .byte $FA
  0x0218F5 $98E5: ------  .byte $DD
  0x0218F6 $98E6: ------  .byte $A2
  0x0218F7 $98E7: ------  .byte $FA
  0x0218F8 $98E8: ------  .byte $6E
  0x0218F9 $98E9: ------  .byte $9F
  0x0218FA $98EA: ------  .byte $F2
  0x0218FB $98EB: ------  .byte $5B
  0x0218FC $98EC: ------  .byte $A3
  0x0218FD $98ED: -D0-I-  .byte $F3 ; <indirect ref>
  0x0218FE $98EE: -D0-I-  .byte $04 ; <indirect ref>
  0x0218FF $98EF: -D0-I-  .byte $F3 ; <indirect ref>
  0x021900 $98F0: -D0-I-  .byte $98 ; <indirect ref>
  0x021901 $98F1: -D0-I-  .byte $24 ; <indirect ref>
  0x021902 $98F2: -D0-I-  .byte $9A ; <indirect ref>
  0x021903 $98F3: -D0-I-  .byte $F3 ; <indirect ref>
  0x021904 $98F4: -D0-I-  .byte $90 ; <indirect ref>
  0x021905 $98F5: -D0-I-  .byte $05 ; <indirect ref>
  0x021906 $98F6: -D0-I-  .byte $3D ; <indirect ref>
  0x021907 $98F7: -D0-I-  .byte $74 ; <indirect ref>
  0x021908 $98F8: ------  .byte $B8
  0x021909 $98F9: ------  .byte $EF
  0x02190A $98FA: -D0-I-  .byte $FD ; <indirect ref>
  0x02190B $98FB: -D0-I-  .byte $00 ; <indirect ref>
  0x02190C $98FC: -D0-I-  .byte $F3 ; <indirect ref>
  0x02190D $98FD: -D0-I-  .byte $91 ; <indirect ref>
  0x02190E $98FE: -D0-I-  .byte $04 ; <indirect ref>
  0x02190F $98FF: -D0-I-  .byte $0D ; <indirect ref>
  0x021910 $9900: -D0-I-  .byte $1B ; <indirect ref>
  0x021911 $9901: -D0-I-  .byte $29 ; <indirect ref>
  0x021912 $9902: -D0-I-  .byte $FA ; <indirect ref>
  0x021913 $9903: -D0-I-  .byte $35 ; <indirect ref>
  0x021914 $9904: -D0-I-  .byte $A3 ; <indirect ref>
  0x021915 $9905: -D0-I-  .byte $FA ; <indirect ref>
  0x021916 $9906: -D0-I-  .byte $C3 ; <indirect ref>
  0x021917 $9907: -D0-I-  .byte $A1 ; <indirect ref>
  0x021918 $9908: -D0-I-  .byte $F2 ; <indirect ref>
  0x021919 $9909: -D0-I-  .byte $EA ; <indirect ref>
  0x02191A $990A: -D0-I-  .byte $9F ; <indirect ref>
  0x02191B $990B: ------  .byte $F0
  0x02191C $990C: -D0-I-  .byte $FA ; <indirect ref>
  0x02191D $990D: -D0-I-  .byte $35 ; <indirect ref>
  0x02191E $990E: -D0-I-  .byte $A3 ; <indirect ref>
  0x02191F $990F: -D0-I-  .byte $FA ; <indirect ref>
  0x021920 $9910: -D0-I-  .byte $C3 ; <indirect ref>
  0x021921 $9911: -D0-I-  .byte $A1 ; <indirect ref>
  0x021922 $9912: -D0-I-  .byte $FA ; <indirect ref>
  0x021923 $9913: -D0-I-  .byte $FD ; <indirect ref>
  0x021924 $9914: -D0-I-  .byte $9F ; <indirect ref>
  0x021925 $9915: -D0-I-  .byte $FA ; <indirect ref>
  0x021926 $9916: -D0-I-  .byte $F3 ; <indirect ref>
  0x021927 $9917: -D0-I-  .byte $9F ; <indirect ref>
  0x021928 $9918: -D0-I-  .byte $F2 ; <indirect ref>
  0x021929 $9919: -D0-I-  .byte $DE ; <indirect ref>
  0x02192A $991A: -D0-I-  .byte $9F ; <indirect ref>
  0x02192B $991B: -D0-I-  .byte $FA ; <indirect ref>
  0x02192C $991C: -D0-I-  .byte $35 ; <indirect ref>
  0x02192D $991D: -D0-I-  .byte $A3 ; <indirect ref>
  0x02192E $991E: -D0-I-  .byte $FA ; <indirect ref>
  0x02192F $991F: -D0-I-  .byte $C3 ; <indirect ref>
  0x021930 $9920: -D0-I-  .byte $A1 ; <indirect ref>
  0x021931 $9921: -D0-I-  .byte $FA ; <indirect ref>
  0x021932 $9922: -D0-I-  .byte $04 ; <indirect ref>
  0x021933 $9923: -D0-I-  .byte $A0 ; <indirect ref>
  0x021934 $9924: -D0-I-  .byte $FA ; <indirect ref>
  0x021935 $9925: -D0-I-  .byte $F1 ; <indirect ref>
  0x021936 $9926: -D0-I-  .byte $9F ; <indirect ref>
  0x021937 $9927: -D0-I-  .byte $F2 ; <indirect ref>
  0x021938 $9928: -D0-I-  .byte $71 ; <indirect ref>
  0x021939 $9929: -D0-I-  .byte $A3 ; <indirect ref>
  0x02193A $992A: -D0-I-  .byte $FA ; <indirect ref>
  0x02193B $992B: -D0-I-  .byte $35 ; <indirect ref>
  0x02193C $992C: -D0-I-  .byte $A3 ; <indirect ref>
  0x02193D $992D: -D0-I-  .byte $FA ; <indirect ref>
  0x02193E $992E: -D0-I-  .byte $C3 ; <indirect ref>
  0x02193F $992F: -D0-I-  .byte $A1 ; <indirect ref>
  0x021940 $9930: -D0-I-  .byte $F2 ; <indirect ref>
  0x021941 $9931: -D0-I-  .byte $64 ; <indirect ref>
  0x021942 $9932: -D0-I-  .byte $A1 ; <indirect ref>
  0x021943 $9933: -D0-I-  .byte $FD ; <indirect ref>
  0x021944 $9934: -D0-I-  .byte $03 ; <indirect ref>
  0x021945 $9935: -D0-I-  .byte $F3 ; <indirect ref>
  0x021946 $9936: -D0-I-  .byte $91 ; <indirect ref>
  0x021947 $9937: -D0-I-  .byte $04 ; <indirect ref>
  0x021948 $9938: -D0-I-  .byte $0C ; <indirect ref>
  0x021949 $9939: -D0-I-  .byte $1A ; <indirect ref>
  0x02194A $993A: -D0-I-  .byte $28 ; <indirect ref>
  0x02194B $993B: -D0-I-  .byte $FA ; <indirect ref>
  0x02194C $993C: -D0-I-  .byte $2D ; <indirect ref>
  0x02194D $993D: -D0-I-  .byte $A3 ; <indirect ref>
  0x02194E $993E: -D0-I-  .byte $FA ; <indirect ref>
  0x02194F $993F: -D0-I-  .byte $C3 ; <indirect ref>
  0x021950 $9940: -D0-I-  .byte $A1 ; <indirect ref>
  0x021951 $9941: -D0-I-  .byte $F2 ; <indirect ref>
  0x021952 $9942: -D0-I-  .byte $EA ; <indirect ref>
  0x021953 $9943: -D0-I-  .byte $9F ; <indirect ref>
  0x021954 $9944: -D0-I-  .byte $FA ; <indirect ref>
  0x021955 $9945: -D0-I-  .byte $2D ; <indirect ref>
  0x021956 $9946: -D0-I-  .byte $A3 ; <indirect ref>
  0x021957 $9947: -D0-I-  .byte $FA ; <indirect ref>
  0x021958 $9948: -D0-I-  .byte $C3 ; <indirect ref>
  0x021959 $9949: -D0-I-  .byte $A1 ; <indirect ref>
  0x02195A $994A: -D0-I-  .byte $FA ; <indirect ref>
  0x02195B $994B: -D0-I-  .byte $FD ; <indirect ref>
  0x02195C $994C: -D0-I-  .byte $9F ; <indirect ref>
  0x02195D $994D: -D0-I-  .byte $FA ; <indirect ref>
  0x02195E $994E: -D0-I-  .byte $F3 ; <indirect ref>
  0x02195F $994F: -D0-I-  .byte $9F ; <indirect ref>
  0x021960 $9950: -D0-I-  .byte $F2 ; <indirect ref>
  0x021961 $9951: -D0-I-  .byte $DE ; <indirect ref>
  0x021962 $9952: -D0-I-  .byte $9F ; <indirect ref>
  0x021963 $9953: -D0-I-  .byte $FA ; <indirect ref>
  0x021964 $9954: -D0-I-  .byte $2D ; <indirect ref>
  0x021965 $9955: -D0-I-  .byte $A3 ; <indirect ref>
  0x021966 $9956: -D0-I-  .byte $FA ; <indirect ref>
  0x021967 $9957: -D0-I-  .byte $C3 ; <indirect ref>
  0x021968 $9958: -D0-I-  .byte $A1 ; <indirect ref>
  0x021969 $9959: -D0-I-  .byte $FA ; <indirect ref>
  0x02196A $995A: -D0-I-  .byte $04 ; <indirect ref>
  0x02196B $995B: -D0-I-  .byte $A0 ; <indirect ref>
  0x02196C $995C: -D0-I-  .byte $FA ; <indirect ref>
  0x02196D $995D: -D0-I-  .byte $F1 ; <indirect ref>
  0x02196E $995E: -D0-I-  .byte $9F ; <indirect ref>
  0x02196F $995F: -D0-I-  .byte $F2 ; <indirect ref>
  0x021970 $9960: -D0-I-  .byte $71 ; <indirect ref>
  0x021971 $9961: -D0-I-  .byte $A3 ; <indirect ref>
  0x021972 $9962: -D0-I-  .byte $FA ; <indirect ref>
  0x021973 $9963: -D0-I-  .byte $2D ; <indirect ref>
  0x021974 $9964: -D0-I-  .byte $A3 ; <indirect ref>
  0x021975 $9965: -D0-I-  .byte $FA ; <indirect ref>
  0x021976 $9966: -D0-I-  .byte $C3 ; <indirect ref>
  0x021977 $9967: -D0-I-  .byte $A1 ; <indirect ref>
  0x021978 $9968: -D0-I-  .byte $F2 ; <indirect ref>
  0x021979 $9969: -D0-I-  .byte $64 ; <indirect ref>
  0x02197A $996A: -D0-I-  .byte $A1 ; <indirect ref>
  0x02197B $996B: -D0-I-  .byte $FD ; <indirect ref>
  0x02197C $996C: -D0-I-  .byte $03 ; <indirect ref>
  0x02197D $996D: -D0-I-  .byte $F3 ; <indirect ref>
  0x02197E $996E: -D0-I-  .byte $91 ; <indirect ref>
  0x02197F $996F: -D0-I-  .byte $04 ; <indirect ref>
  0x021980 $9970: -D0-I-  .byte $13 ; <indirect ref>
  0x021981 $9971: -D0-I-  .byte $24 ; <indirect ref>
  0x021982 $9972: ------  .byte $35
  0x021983 $9973: -D0-I-  .byte $FA ; <indirect ref>
  0x021984 $9974: -D0-I-  .byte $2D ; <indirect ref>
  0x021985 $9975: -D0-I-  .byte $A3 ; <indirect ref>
  0x021986 $9976: -D0-I-  .byte $FA ; <indirect ref>
  0x021987 $9977: -D0-I-  .byte $C3 ; <indirect ref>
  0x021988 $9978: -D0-I-  .byte $A1 ; <indirect ref>
  0x021989 $9979: -D0-I-  .byte $FA ; <indirect ref>
  0x02198A $997A: -D0-I-  .byte $04 ; <indirect ref>
  0x02198B $997B: -D0-I-  .byte $A0 ; <indirect ref>
  0x02198C $997C: -D0-I-  .byte $FA ; <indirect ref>
  0x02198D $997D: -D0-I-  .byte $DD ; <indirect ref>
  0x02198E $997E: -D0-I-  .byte $A2 ; <indirect ref>
  0x02198F $997F: -D0-I-  .byte $FA ; <indirect ref>
  0x021990 $9980: -D0-I-  .byte $62 ; <indirect ref>
  0x021991 $9981: -D0-I-  .byte $9F ; <indirect ref>
  0x021992 $9982: -D0-I-  .byte $F0 ; <indirect ref>
  0x021993 $9983: -D0-I-  .byte $FA ; <indirect ref>
  0x021994 $9984: -D0-I-  .byte $2D ; <indirect ref>
  0x021995 $9985: -D0-I-  .byte $A3 ; <indirect ref>
  0x021996 $9986: -D0-I-  .byte $FA ; <indirect ref>
  0x021997 $9987: -D0-I-  .byte $C3 ; <indirect ref>
  0x021998 $9988: -D0-I-  .byte $A1 ; <indirect ref>
  0x021999 $9989: -D0-I-  .byte $FA ; <indirect ref>
  0x02199A $998A: -D0-I-  .byte $04 ; <indirect ref>
  0x02199B $998B: -D0-I-  .byte $A0 ; <indirect ref>
  0x02199C $998C: -D0-I-  .byte $FA ; <indirect ref>
  0x02199D $998D: -D0-I-  .byte $DD ; <indirect ref>
  0x02199E $998E: -D0-I-  .byte $A2 ; <indirect ref>
  0x02199F $998F: -D0-I-  .byte $FA ; <indirect ref>
  0x0219A0 $9990: -D0-I-  .byte $5C ; <indirect ref>
  0x0219A1 $9991: -D0-I-  .byte $9F ; <indirect ref>
  0x0219A2 $9992: -D0-I-  .byte $F2 ; <indirect ref>
  0x0219A3 $9993: -D0-I-  .byte $40 ; <indirect ref>
  0x0219A4 $9994: -D0-I-  .byte $A2 ; <indirect ref>
  0x0219A5 $9995: -D0-I-  .byte $FA ; <indirect ref>
  0x0219A6 $9996: -D0-I-  .byte $2D ; <indirect ref>
  0x0219A7 $9997: -D0-I-  .byte $A3 ; <indirect ref>
  0x0219A8 $9998: -D0-I-  .byte $FA ; <indirect ref>
  0x0219A9 $9999: -D0-I-  .byte $C3 ; <indirect ref>
  0x0219AA $999A: -D0-I-  .byte $A1 ; <indirect ref>
  0x0219AB $999B: -D0-I-  .byte $FA ; <indirect ref>
  0x0219AC $999C: -D0-I-  .byte $04 ; <indirect ref>
  0x0219AD $999D: -D0-I-  .byte $A0 ; <indirect ref>
  0x0219AE $999E: -D0-I-  .byte $FA ; <indirect ref>
  0x0219AF $999F: -D0-I-  .byte $E7 ; <indirect ref>
  0x0219B0 $99A0: -D0-I-  .byte $A2 ; <indirect ref>
  0x0219B1 $99A1: -D0-I-  .byte $FA ; <indirect ref>
  0x0219B2 $99A2: -D0-I-  .byte $5C ; <indirect ref>
  0x0219B3 $99A3: -D0-I-  .byte $9F ; <indirect ref>
  0x0219B4 $99A4: -D0-I-  .byte $F2 ; <indirect ref>
  0x0219B5 $99A5: -D0-I-  .byte $71 ; <indirect ref>
  0x0219B6 $99A6: -D0-I-  .byte $A3 ; <indirect ref>
  0x0219B7 $99A7: ------  .byte $FA
  0x0219B8 $99A8: ------  .byte $2D
  0x0219B9 $99A9: ------  .byte $A3
  0x0219BA $99AA: ------  .byte $FA
  0x0219BB $99AB: ------  .byte $C3
  0x0219BC $99AC: ------  .byte $A1
  0x0219BD $99AD: ------  .byte $F2
  0x0219BE $99AE: ------  .byte $64
  0x0219BF $99AF: ------  .byte $A1
  0x0219C0 $99B0: ------  .byte $FD
  0x0219C1 $99B1: ------  .byte $00
  0x0219C2 $99B2: ------  .byte $F3
  0x0219C3 $99B3: ------  .byte $91
  0x0219C4 $99B4: ------  .byte $04
  0x0219C5 $99B5: ------  .byte $0C
  0x0219C6 $99B6: ------  .byte $1A
  0x0219C7 $99B7: ------  .byte $28
  0x0219C8 $99B8: ------  .byte $FA
  0x0219C9 $99B9: ------  .byte $49
  0x0219CA $99BA: ------  .byte $B4
  0x0219CB $99BB: ------  .byte $FA
  0x0219CC $99BC: ------  .byte $C3
  0x0219CD $99BD: ------  .byte $A1
  0x0219CE $99BE: ------  .byte $F2
  0x0219CF $99BF: ------  .byte $EA
  0x0219D0 $99C0: ------  .byte $9F
  0x0219D1 $99C1: ------  .byte $FA
  0x0219D2 $99C2: ------  .byte $49
  0x0219D3 $99C3: ------  .byte $B4
  0x0219D4 $99C4: ------  .byte $FA
  0x0219D5 $99C5: ------  .byte $C3
  0x0219D6 $99C6: ------  .byte $A1
  0x0219D7 $99C7: ------  .byte $FA
  0x0219D8 $99C8: ------  .byte $FD
  0x0219D9 $99C9: ------  .byte $9F
  0x0219DA $99CA: ------  .byte $FA
  0x0219DB $99CB: ------  .byte $F3
  0x0219DC $99CC: ------  .byte $9F
  0x0219DD $99CD: ------  .byte $F2
  0x0219DE $99CE: ------  .byte $DE
  0x0219DF $99CF: ------  .byte $9F
  0x0219E0 $99D0: ------  .byte $FA
  0x0219E1 $99D1: ------  .byte $49
  0x0219E2 $99D2: ------  .byte $B4
  0x0219E3 $99D3: ------  .byte $FA
  0x0219E4 $99D4: ------  .byte $C3
  0x0219E5 $99D5: ------  .byte $A1
  0x0219E6 $99D6: ------  .byte $FA
  0x0219E7 $99D7: ------  .byte $04
  0x0219E8 $99D8: ------  .byte $A0
  0x0219E9 $99D9: ------  .byte $FA
  0x0219EA $99DA: ------  .byte $F1
  0x0219EB $99DB: ------  .byte $9F
  0x0219EC $99DC: ------  .byte $F2
  0x0219ED $99DD: ------  .byte $71
  0x0219EE $99DE: ------  .byte $A3
  0x0219EF $99DF: ------  .byte $FA
  0x0219F0 $99E0: ------  .byte $49
  0x0219F1 $99E1: ------  .byte $B4
  0x0219F2 $99E2: ------  .byte $FA
  0x0219F3 $99E3: ------  .byte $C3
  0x0219F4 $99E4: ------  .byte $A1
  0x0219F5 $99E5: ------  .byte $F2
  0x0219F6 $99E6: ------  .byte $64
  0x0219F7 $99E7: ------  .byte $A1
  0x0219F8 $99E8: ------  .byte $FD
  0x0219F9 $99E9: ------  .byte $00
  0x0219FA $99EA: ------  .byte $F3
  0x0219FB $99EB: ------  .byte $91
  0x0219FC $99EC: ------  .byte $04
  0x0219FD $99ED: ------  .byte $13
  0x0219FE $99EE: ------  .byte $24
  0x0219FF $99EF: ------  .byte $10
  0x021A00 $99F0: ------  .byte $FA
  0x021A01 $99F1: ------  .byte $49
  0x021A02 $99F2: ------  .byte $B4
  0x021A03 $99F3: ------  .byte $FA
  0x021A04 $99F4: ------  .byte $C3
  0x021A05 $99F5: ------  .byte $A1
  0x021A06 $99F6: ------  .byte $FA
  0x021A07 $99F7: ------  .byte $04
  0x021A08 $99F8: ------  .byte $A0
  0x021A09 $99F9: ------  .byte $FA
  0x021A0A $99FA: ------  .byte $E7
  0x021A0B $99FB: ------  .byte $A2
  0x021A0C $99FC: ------  .byte $FA
  0x021A0D $99FD: ------  .byte $62
  0x021A0E $99FE: ------  .byte $9F
  0x021A0F $99FF: ------  .byte $F0
  0x021A10 $9A00: ------  .byte $FA
  0x021A11 $9A01: ------  .byte $49
  0x021A12 $9A02: ------  .byte $B4
  0x021A13 $9A03: ------  .byte $FA
  0x021A14 $9A04: ------  .byte $C3
  0x021A15 $9A05: ------  .byte $A1
  0x021A16 $9A06: ------  .byte $FA
  0x021A17 $9A07: ------  .byte $04
  0x021A18 $9A08: ------  .byte $A0
  0x021A19 $9A09: ------  .byte $FA
  0x021A1A $9A0A: ------  .byte $E7
  0x021A1B $9A0B: ------  .byte $A2
  0x021A1C $9A0C: ------  .byte $FA
  0x021A1D $9A0D: ------  .byte $5C
  0x021A1E $9A0E: ------  .byte $9F
  0x021A1F $9A0F: ------  .byte $F2
  0x021A20 $9A10: ------  .byte $40
  0x021A21 $9A11: ------  .byte $A2
  0x021A22 $9A12: ------  .byte $FA
  0x021A23 $9A13: ------  .byte $49
  0x021A24 $9A14: ------  .byte $B4
  0x021A25 $9A15: ------  .byte $FA
  0x021A26 $9A16: ------  .byte $C3
  0x021A27 $9A17: ------  .byte $A1
  0x021A28 $9A18: ------  .byte $FA
  0x021A29 $9A19: ------  .byte $04
  0x021A2A $9A1A: ------  .byte $A0
  0x021A2B $9A1B: ------  .byte $FA
  0x021A2C $9A1C: ------  .byte $E7
  0x021A2D $9A1D: ------  .byte $A2
  0x021A2E $9A1E: ------  .byte $FA
  0x021A2F $9A1F: ------  .byte $5C
  0x021A30 $9A20: ------  .byte $9F
  0x021A31 $9A21: ------  .byte $F2
  0x021A32 $9A22: ------  .byte $71
  0x021A33 $9A23: ------  .byte $A3
  0x021A34 $9A24: -D0-I-  .byte $F3 ; <indirect ref>
  0x021A35 $9A25: -D0-I-  .byte $90 ; <indirect ref>
  0x021A36 $9A26: -D0-I-  .byte $05 ; <indirect ref>
  0x021A37 $9A27: -D0-I-  .byte $49 ; <indirect ref>
  0x021A38 $9A28: -D0-I-  .byte $50 ; <indirect ref>
  0x021A39 $9A29: ------  .byte $D0
  0x021A3A $9A2A: ------  .byte $F5
  0x021A3B $9A2B: -D0-I-  .byte $FD ; <indirect ref>
  0x021A3C $9A2C: -D0-I-  .byte $00 ; <indirect ref>
  0x021A3D $9A2D: -D0-I-  .byte $F3 ; <indirect ref>
  0x021A3E $9A2E: -D0-I-  .byte $91 ; <indirect ref>
  0x021A3F $9A2F: -D0-I-  .byte $04 ; <indirect ref>
  0x021A40 $9A30: -D0-I-  .byte $10 ; <indirect ref>
  0x021A41 $9A31: -D0-I-  .byte $21 ; <indirect ref>
  0x021A42 $9A32: -D0-I-  .byte $32 ; <indirect ref>
  0x021A43 $9A33: -D0-I-  .byte $FA ; <indirect ref>
  0x021A44 $9A34: -D0-I-  .byte $35 ; <indirect ref>
  0x021A45 $9A35: -D0-I-  .byte $A3 ; <indirect ref>
  0x021A46 $9A36: -D0-I-  .byte $FA ; <indirect ref>
  0x021A47 $9A37: -D0-I-  .byte $AE ; <indirect ref>
  0x021A48 $9A38: -D0-I-  .byte $A0 ; <indirect ref>
  0x021A49 $9A39: -D0-I-  .byte $FA ; <indirect ref>
  0x021A4A $9A3A: -D0-I-  .byte $D8 ; <indirect ref>
  0x021A4B $9A3B: -D0-I-  .byte $A2 ; <indirect ref>
  0x021A4C $9A3C: -D0-I-  .byte $F2 ; <indirect ref>
  0x021A4D $9A3D: -D0-I-  .byte $76 ; <indirect ref>
  0x021A4E $9A3E: -D0-I-  .byte $A1 ; <indirect ref>
  0x021A4F $9A3F: ------  .byte $F0
  0x021A50 $9A40: -D0-I-  .byte $FA ; <indirect ref>
  0x021A51 $9A41: -D0-I-  .byte $35 ; <indirect ref>
  0x021A52 $9A42: -D0-I-  .byte $A3 ; <indirect ref>
  0x021A53 $9A43: -D0-I-  .byte $FA ; <indirect ref>
  0x021A54 $9A44: -D0-I-  .byte $AE ; <indirect ref>
  0x021A55 $9A45: -D0-I-  .byte $A0 ; <indirect ref>
  0x021A56 $9A46: -D0-I-  .byte $FA ; <indirect ref>
  0x021A57 $9A47: -D0-I-  .byte $D8 ; <indirect ref>
  0x021A58 $9A48: -D0-I-  .byte $A2 ; <indirect ref>
  0x021A59 $9A49: -D0-I-  .byte $FA ; <indirect ref>
  0x021A5A $9A4A: -D0-I-  .byte $2F ; <indirect ref>
  0x021A5B $9A4B: -D0-I-  .byte $A0 ; <indirect ref>
  0x021A5C $9A4C: -D0-I-  .byte $FA ; <indirect ref>
  0x021A5D $9A4D: -D0-I-  .byte $51 ; <indirect ref>
  0x021A5E $9A4E: -D0-I-  .byte $A0 ; <indirect ref>
  0x021A5F $9A4F: -D0-I-  .byte $F2 ; <indirect ref>
  0x021A60 $9A50: -D0-I-  .byte $4C ; <indirect ref>
  0x021A61 $9A51: -D0-I-  .byte $A0 ; <indirect ref>
  0x021A62 $9A52: -D0-I-  .byte $FA ; <indirect ref>
  0x021A63 $9A53: -D0-I-  .byte $35 ; <indirect ref>
  0x021A64 $9A54: -D0-I-  .byte $A3 ; <indirect ref>
  0x021A65 $9A55: -D0-I-  .byte $FA ; <indirect ref>
  0x021A66 $9A56: -D0-I-  .byte $AE ; <indirect ref>
  0x021A67 $9A57: -D0-I-  .byte $A0 ; <indirect ref>
  0x021A68 $9A58: -D0-I-  .byte $FA ; <indirect ref>
  0x021A69 $9A59: -D0-I-  .byte $D8 ; <indirect ref>
  0x021A6A $9A5A: -D0-I-  .byte $A2 ; <indirect ref>
  0x021A6B $9A5B: -D0-I-  .byte $FA ; <indirect ref>
  0x021A6C $9A5C: -D0-I-  .byte $47 ; <indirect ref>
  0x021A6D $9A5D: -D0-I-  .byte $A0 ; <indirect ref>
  0x021A6E $9A5E: -D0-I-  .byte $FA ; <indirect ref>
  0x021A6F $9A5F: -D0-I-  .byte $23 ; <indirect ref>
  0x021A70 $9A60: -D0-I-  .byte $A0 ; <indirect ref>
  0x021A71 $9A61: -D0-I-  .byte $F2 ; <indirect ref>
  0x021A72 $9A62: -D0-I-  .byte $71 ; <indirect ref>
  0x021A73 $9A63: -D0-I-  .byte $A3 ; <indirect ref>
  0x021A74 $9A64: -D0-I-  .byte $FA ; <indirect ref>
  0x021A75 $9A65: -D0-I-  .byte $35 ; <indirect ref>
  0x021A76 $9A66: -D0-I-  .byte $A3 ; <indirect ref>
  0x021A77 $9A67: -D0-I-  .byte $FA ; <indirect ref>
  0x021A78 $9A68: -D0-I-  .byte $AE ; <indirect ref>
  0x021A79 $9A69: -D0-I-  .byte $A0 ; <indirect ref>
  0x021A7A $9A6A: -D0-I-  .byte $FA ; <indirect ref>
  0x021A7B $9A6B: -D0-I-  .byte $D8 ; <indirect ref>
  0x021A7C $9A6C: -D0-I-  .byte $A2 ; <indirect ref>
  0x021A7D $9A6D: -D0-I-  .byte $F2 ; <indirect ref>
  0x021A7E $9A6E: -D0-I-  .byte $85 ; <indirect ref>
  0x021A7F $9A6F: -D0-I-  .byte $A1 ; <indirect ref>
  0x021A80 $9A70: -D0-I-  .byte $FD ; <indirect ref>
  0x021A81 $9A71: -D0-I-  .byte $03 ; <indirect ref>
  0x021A82 $9A72: -D0-I-  .byte $F3 ; <indirect ref>
  0x021A83 $9A73: -D0-I-  .byte $91 ; <indirect ref>
  0x021A84 $9A74: -D0-I-  .byte $0C ; <indirect ref>
  0x021A85 $9A75: -D0-I-  .byte $17 ; <indirect ref>
  0x021A86 $9A76: -D0-I-  .byte $28 ; <indirect ref>
  0x021A87 $9A77: -D0-I-  .byte $39 ; <indirect ref>
  0x021A88 $9A78: -D0-I-  .byte $FD ; <indirect ref>
  0x021A89 $9A79: -D0-I-  .byte $03 ; <indirect ref>
  0x021A8A $9A7A: -D0-I-  .byte $F3 ; <indirect ref>
  0x021A8B $9A7B: -D0-I-  .byte $91 ; <indirect ref>
  0x021A8C $9A7C: -D0-I-  .byte $40 ; <indirect ref>
  0x021A8D $9A7D: -D0-I-  .byte $52 ; <indirect ref>
  0x021A8E $9A7E: -D0-I-  .byte $66 ; <indirect ref>
  0x021A8F $9A7F: ------  .byte $31
  0x021A90 $9A80: -D0-I-  .byte $FA ; <indirect ref>
  0x021A91 $9A81: -D0-I-  .byte $2D ; <indirect ref>
  0x021A92 $9A82: -D0-I-  .byte $A3 ; <indirect ref>
  0x021A93 $9A83: -D0-I-  .byte $FA ; <indirect ref>
  0x021A94 $9A84: -D0-I-  .byte $AE ; <indirect ref>
  0x021A95 $9A85: -D0-I-  .byte $A0 ; <indirect ref>
  0x021A96 $9A86: -D0-I-  .byte $FA ; <indirect ref>
  0x021A97 $9A87: -D0-I-  .byte $D8 ; <indirect ref>
  0x021A98 $9A88: -D0-I-  .byte $A2 ; <indirect ref>
  0x021A99 $9A89: -D0-I-  .byte $F2 ; <indirect ref>
  0x021A9A $9A8A: -D0-I-  .byte $76 ; <indirect ref>
  0x021A9B $9A8B: -D0-I-  .byte $A1 ; <indirect ref>
  0x021A9C $9A8C: -D0-I-  .byte $FA ; <indirect ref>
  0x021A9D $9A8D: -D0-I-  .byte $2D ; <indirect ref>
  0x021A9E $9A8E: -D0-I-  .byte $A3 ; <indirect ref>
  0x021A9F $9A8F: -D0-I-  .byte $FA ; <indirect ref>
  0x021AA0 $9A90: -D0-I-  .byte $AE ; <indirect ref>
  0x021AA1 $9A91: -D0-I-  .byte $A0 ; <indirect ref>
  0x021AA2 $9A92: -D0-I-  .byte $FA ; <indirect ref>
  0x021AA3 $9A93: -D0-I-  .byte $D8 ; <indirect ref>
  0x021AA4 $9A94: -D0-I-  .byte $A2 ; <indirect ref>
  0x021AA5 $9A95: -D0-I-  .byte $FA ; <indirect ref>
  0x021AA6 $9A96: -D0-I-  .byte $2F ; <indirect ref>
  0x021AA7 $9A97: -D0-I-  .byte $A0 ; <indirect ref>
  0x021AA8 $9A98: -D0-I-  .byte $FA ; <indirect ref>
  0x021AA9 $9A99: -D0-I-  .byte $51 ; <indirect ref>
  0x021AAA $9A9A: -D0-I-  .byte $A0 ; <indirect ref>
  0x021AAB $9A9B: -D0-I-  .byte $F2 ; <indirect ref>
  0x021AAC $9A9C: -D0-I-  .byte $4C ; <indirect ref>
  0x021AAD $9A9D: -D0-I-  .byte $A0 ; <indirect ref>
  0x021AAE $9A9E: -D0-I-  .byte $FA ; <indirect ref>
  0x021AAF $9A9F: -D0-I-  .byte $2D ; <indirect ref>
  0x021AB0 $9AA0: -D0-I-  .byte $A3 ; <indirect ref>
  0x021AB1 $9AA1: -D0-I-  .byte $FA ; <indirect ref>
  0x021AB2 $9AA2: -D0-I-  .byte $AE ; <indirect ref>
  0x021AB3 $9AA3: -D0-I-  .byte $A0 ; <indirect ref>
  0x021AB4 $9AA4: -D0-I-  .byte $FA ; <indirect ref>
  0x021AB5 $9AA5: -D0-I-  .byte $D8 ; <indirect ref>
  0x021AB6 $9AA6: -D0-I-  .byte $A2 ; <indirect ref>
  0x021AB7 $9AA7: -D0-I-  .byte $FA ; <indirect ref>
  0x021AB8 $9AA8: -D0-I-  .byte $47 ; <indirect ref>
  0x021AB9 $9AA9: -D0-I-  .byte $A0 ; <indirect ref>
  0x021ABA $9AAA: -D0-I-  .byte $FA ; <indirect ref>
  0x021ABB $9AAB: -D0-I-  .byte $23 ; <indirect ref>
  0x021ABC $9AAC: -D0-I-  .byte $A0 ; <indirect ref>
  0x021ABD $9AAD: -D0-I-  .byte $F2 ; <indirect ref>
  0x021ABE $9AAE: -D0-I-  .byte $71 ; <indirect ref>
  0x021ABF $9AAF: -D0-I-  .byte $A3 ; <indirect ref>
  0x021AC0 $9AB0: -D0-I-  .byte $FA ; <indirect ref>
  0x021AC1 $9AB1: -D0-I-  .byte $2D ; <indirect ref>
  0x021AC2 $9AB2: -D0-I-  .byte $A3 ; <indirect ref>
  0x021AC3 $9AB3: -D0-I-  .byte $FA ; <indirect ref>
  0x021AC4 $9AB4: -D0-I-  .byte $AE ; <indirect ref>
  0x021AC5 $9AB5: -D0-I-  .byte $A0 ; <indirect ref>
  0x021AC6 $9AB6: -D0-I-  .byte $FA ; <indirect ref>
  0x021AC7 $9AB7: -D0-I-  .byte $D8 ; <indirect ref>
  0x021AC8 $9AB8: -D0-I-  .byte $A2 ; <indirect ref>
  0x021AC9 $9AB9: -D0-I-  .byte $F2 ; <indirect ref>
  0x021ACA $9ABA: -D0-I-  .byte $85 ; <indirect ref>
  0x021ACB $9ABB: -D0-I-  .byte $A1 ; <indirect ref>
  0x021ACC $9ABC: -D0-I-  .byte $FA ; <indirect ref>
  0x021ACD $9ABD: -D0-I-  .byte $2D ; <indirect ref>
  0x021ACE $9ABE: -D0-I-  .byte $A3 ; <indirect ref>
  0x021ACF $9ABF: -D0-I-  .byte $FA ; <indirect ref>
  0x021AD0 $9AC0: -D0-I-  .byte $AE ; <indirect ref>
  0x021AD1 $9AC1: -D0-I-  .byte $A0 ; <indirect ref>
  0x021AD2 $9AC2: -D0-I-  .byte $FA ; <indirect ref>
  0x021AD3 $9AC3: -D0-I-  .byte $D8 ; <indirect ref>
  0x021AD4 $9AC4: -D0-I-  .byte $A2 ; <indirect ref>
  0x021AD5 $9AC5: -D0-I-  .byte $FA ; <indirect ref>
  0x021AD6 $9AC6: -D0-I-  .byte $47 ; <indirect ref>
  0x021AD7 $9AC7: -D0-I-  .byte $A0 ; <indirect ref>
  0x021AD8 $9AC8: -D0-I-  .byte $FA ; <indirect ref>
  0x021AD9 $9AC9: -D0-I-  .byte $DD ; <indirect ref>
  0x021ADA $9ACA: -D0-I-  .byte $A2 ; <indirect ref>
  0x021ADB $9ACB: -D0-I-  .byte $FA ; <indirect ref>
  0x021ADC $9ACC: -D0-I-  .byte $62 ; <indirect ref>
  0x021ADD $9ACD: -D0-I-  .byte $9F ; <indirect ref>
  0x021ADE $9ACE: -D0-I-  .byte $F0 ; <indirect ref>
  0x021ADF $9ACF: -D0-I-  .byte $FA ; <indirect ref>
  0x021AE0 $9AD0: -D0-I-  .byte $2D ; <indirect ref>
  0x021AE1 $9AD1: -D0-I-  .byte $A3 ; <indirect ref>
  0x021AE2 $9AD2: -D0-I-  .byte $FA ; <indirect ref>
  0x021AE3 $9AD3: -D0-I-  .byte $AE ; <indirect ref>
  0x021AE4 $9AD4: -D0-I-  .byte $A0 ; <indirect ref>
  0x021AE5 $9AD5: -D0-I-  .byte $FA ; <indirect ref>
  0x021AE6 $9AD6: -D0-I-  .byte $D8 ; <indirect ref>
  0x021AE7 $9AD7: -D0-I-  .byte $A2 ; <indirect ref>
  0x021AE8 $9AD8: -D0-I-  .byte $FA ; <indirect ref>
  0x021AE9 $9AD9: -D0-I-  .byte $47 ; <indirect ref>
  0x021AEA $9ADA: -D0-I-  .byte $A0 ; <indirect ref>
  0x021AEB $9ADB: -D0-I-  .byte $FA ; <indirect ref>
  0x021AEC $9ADC: -D0-I-  .byte $DD ; <indirect ref>
  0x021AED $9ADD: -D0-I-  .byte $A2 ; <indirect ref>
  0x021AEE $9ADE: -D0-I-  .byte $FA ; <indirect ref>
  0x021AEF $9ADF: -D0-I-  .byte $5C ; <indirect ref>
  0x021AF0 $9AE0: -D0-I-  .byte $9F ; <indirect ref>
  0x021AF1 $9AE1: -D0-I-  .byte $F2 ; <indirect ref>
  0x021AF2 $9AE2: -D0-I-  .byte $40 ; <indirect ref>
  0x021AF3 $9AE3: -D0-I-  .byte $A2 ; <indirect ref>
  0x021AF4 $9AE4: -D0-I-  .byte $FA ; <indirect ref>
  0x021AF5 $9AE5: -D0-I-  .byte $2D ; <indirect ref>
  0x021AF6 $9AE6: -D0-I-  .byte $A3 ; <indirect ref>
  0x021AF7 $9AE7: -D0-I-  .byte $FA ; <indirect ref>
  0x021AF8 $9AE8: -D0-I-  .byte $AE ; <indirect ref>
  0x021AF9 $9AE9: -D0-I-  .byte $A0 ; <indirect ref>
  0x021AFA $9AEA: -D0-I-  .byte $FA ; <indirect ref>
  0x021AFB $9AEB: -D0-I-  .byte $D8 ; <indirect ref>
  0x021AFC $9AEC: -D0-I-  .byte $A2 ; <indirect ref>
  0x021AFD $9AED: -D0-I-  .byte $FA ; <indirect ref>
  0x021AFE $9AEE: -D0-I-  .byte $47 ; <indirect ref>
  0x021AFF $9AEF: -D0-I-  .byte $A0 ; <indirect ref>
  0x021B00 $9AF0: -D0-I-  .byte $FA ; <indirect ref>
  0x021B01 $9AF1: -D0-I-  .byte $E7 ; <indirect ref>
  0x021B02 $9AF2: -D0-I-  .byte $A2 ; <indirect ref>
  0x021B03 $9AF3: -D0-I-  .byte $FA ; <indirect ref>
  0x021B04 $9AF4: -D0-I-  .byte $5C ; <indirect ref>
  0x021B05 $9AF5: -D0-I-  .byte $9F ; <indirect ref>
  0x021B06 $9AF6: -D0-I-  .byte $F2 ; <indirect ref>
  0x021B07 $9AF7: -D0-I-  .byte $71 ; <indirect ref>
  0x021B08 $9AF8: -D0-I-  .byte $A3 ; <indirect ref>
  0x021B09 $9AF9: ------  .byte $FD
  0x021B0A $9AFA: ------  .byte $00
  0x021B0B $9AFB: ------  .byte $F3
  0x021B0C $9AFC: ------  .byte $91
  0x021B0D $9AFD: ------  .byte $04
  0x021B0E $9AFE: ------  .byte $0F
  0x021B0F $9AFF: ------  .byte $28
  0x021B10 $9B00: ------  .byte $39
  0x021B11 $9B01: ------  .byte $FA
  0x021B12 $9B02: ------  .byte $49
  0x021B13 $9B03: ------  .byte $B4
  0x021B14 $9B04: ------  .byte $FA
  0x021B15 $9B05: ------  .byte $AE
  0x021B16 $9B06: ------  .byte $A0
  0x021B17 $9B07: ------  .byte $FA
  0x021B18 $9B08: ------  .byte $D8
  0x021B19 $9B09: ------  .byte $A2
  0x021B1A $9B0A: ------  .byte $F2
  0x021B1B $9B0B: ------  .byte $76
  0x021B1C $9B0C: ------  .byte $A1
  0x021B1D $9B0D: ------  .byte $FA
  0x021B1E $9B0E: ------  .byte $49
  0x021B1F $9B0F: ------  .byte $B4
  0x021B20 $9B10: ------  .byte $FA
  0x021B21 $9B11: ------  .byte $AE
  0x021B22 $9B12: ------  .byte $A0
  0x021B23 $9B13: ------  .byte $FA
  0x021B24 $9B14: ------  .byte $D8
  0x021B25 $9B15: ------  .byte $A2
  0x021B26 $9B16: ------  .byte $FA
  0x021B27 $9B17: ------  .byte $2F
  0x021B28 $9B18: ------  .byte $A0
  0x021B29 $9B19: ------  .byte $FA
  0x021B2A $9B1A: ------  .byte $51
  0x021B2B $9B1B: ------  .byte $A0
  0x021B2C $9B1C: ------  .byte $F2
  0x021B2D $9B1D: ------  .byte $4C
  0x021B2E $9B1E: ------  .byte $A0
  0x021B2F $9B1F: ------  .byte $FD
  0x021B30 $9B20: ------  .byte $00
  0x021B31 $9B21: ------  .byte $F3
  0x021B32 $9B22: ------  .byte $91
  0x021B33 $9B23: ------  .byte $22
  0x021B34 $9B24: ------  .byte $34
  0x021B35 $9B25: ------  .byte $48
  0x021B36 $9B26: ------  .byte $31
  0x021B37 $9B27: ------  .byte $FA
  0x021B38 $9B28: ------  .byte $49
  0x021B39 $9B29: ------  .byte $B4
  0x021B3A $9B2A: ------  .byte $FA
  0x021B3B $9B2B: ------  .byte $AE
  0x021B3C $9B2C: ------  .byte $A0
  0x021B3D $9B2D: ------  .byte $FA
  0x021B3E $9B2E: ------  .byte $D8
  0x021B3F $9B2F: ------  .byte $A2
  0x021B40 $9B30: ------  .byte $FA
  0x021B41 $9B31: ------  .byte $47
  0x021B42 $9B32: ------  .byte $A0
  0x021B43 $9B33: ------  .byte $FA
  0x021B44 $9B34: ------  .byte $23
  0x021B45 $9B35: ------  .byte $A0
  0x021B46 $9B36: ------  .byte $F2
  0x021B47 $9B37: ------  .byte $71
  0x021B48 $9B38: ------  .byte $A3
  0x021B49 $9B39: ------  .byte $FA
  0x021B4A $9B3A: ------  .byte $49
  0x021B4B $9B3B: ------  .byte $B4
  0x021B4C $9B3C: ------  .byte $FA
  0x021B4D $9B3D: ------  .byte $AE
  0x021B4E $9B3E: ------  .byte $A0
  0x021B4F $9B3F: ------  .byte $FA
  0x021B50 $9B40: ------  .byte $D8
  0x021B51 $9B41: ------  .byte $A2
  0x021B52 $9B42: ------  .byte $F2
  0x021B53 $9B43: ------  .byte $85
  0x021B54 $9B44: ------  .byte $A1
  0x021B55 $9B45: ------  .byte $FA
  0x021B56 $9B46: ------  .byte $49
  0x021B57 $9B47: ------  .byte $B4
  0x021B58 $9B48: ------  .byte $FA
  0x021B59 $9B49: ------  .byte $AE
  0x021B5A $9B4A: ------  .byte $A0
  0x021B5B $9B4B: ------  .byte $FA
  0x021B5C $9B4C: ------  .byte $D8
  0x021B5D $9B4D: ------  .byte $A2
  0x021B5E $9B4E: ------  .byte $FA
  0x021B5F $9B4F: ------  .byte $47
  0x021B60 $9B50: ------  .byte $A0
  0x021B61 $9B51: ------  .byte $FA
  0x021B62 $9B52: ------  .byte $E7
  0x021B63 $9B53: ------  .byte $A2
  0x021B64 $9B54: ------  .byte $FA
  0x021B65 $9B55: ------  .byte $62
  0x021B66 $9B56: ------  .byte $9F
  0x021B67 $9B57: ------  .byte $F0
  0x021B68 $9B58: ------  .byte $FA
  0x021B69 $9B59: ------  .byte $49
  0x021B6A $9B5A: ------  .byte $B4
  0x021B6B $9B5B: ------  .byte $FA
  0x021B6C $9B5C: ------  .byte $AE
  0x021B6D $9B5D: ------  .byte $A0
  0x021B6E $9B5E: ------  .byte $FA
  0x021B6F $9B5F: ------  .byte $D8
  0x021B70 $9B60: ------  .byte $A2
  0x021B71 $9B61: ------  .byte $FA
  0x021B72 $9B62: ------  .byte $47
  0x021B73 $9B63: ------  .byte $A0
  0x021B74 $9B64: ------  .byte $FA
  0x021B75 $9B65: ------  .byte $E7
  0x021B76 $9B66: ------  .byte $A2
  0x021B77 $9B67: ------  .byte $FA
  0x021B78 $9B68: ------  .byte $5C
  0x021B79 $9B69: ------  .byte $9F
  0x021B7A $9B6A: ------  .byte $F2
  0x021B7B $9B6B: ------  .byte $40
  0x021B7C $9B6C: ------  .byte $A2
  0x021B7D $9B6D: ------  .byte $FA
  0x021B7E $9B6E: ------  .byte $49
  0x021B7F $9B6F: ------  .byte $B4
  0x021B80 $9B70: ------  .byte $FA
  0x021B81 $9B71: ------  .byte $AE
  0x021B82 $9B72: ------  .byte $A0
  0x021B83 $9B73: ------  .byte $FA
  0x021B84 $9B74: ------  .byte $D8
  0x021B85 $9B75: ------  .byte $A2
  0x021B86 $9B76: ------  .byte $FA
  0x021B87 $9B77: ------  .byte $47
  0x021B88 $9B78: ------  .byte $A0
  0x021B89 $9B79: ------  .byte $FA
  0x021B8A $9B7A: ------  .byte $E7
  0x021B8B $9B7B: ------  .byte $A2
  0x021B8C $9B7C: ------  .byte $FA
  0x021B8D $9B7D: ------  .byte $5C
  0x021B8E $9B7E: ------  .byte $9F
  0x021B8F $9B7F: ------  .byte $F2
  0x021B90 $9B80: ------  .byte $71
  0x021B91 $9B81: ------  .byte $A3
  0x021B92 $9B82: -D0-I-  .byte $FD ; <indirect ref>
  0x021B93 $9B83: -D0-I-  .byte $03 ; <indirect ref>
  0x021B94 $9B84: -D0-I-  .byte $F3 ; <indirect ref>
  0x021B95 $9B85: -D0-I-  .byte $81 ; <indirect ref>
  0x021B96 $9B86: -D0-I-  .byte $02 ; <indirect ref>
  0x021B97 $9B87: -D0-I-  .byte $28 ; <indirect ref>
  0x021B98 $9B88: -D0-I-  .byte $F3 ; <indirect ref>
  0x021B99 $9B89: -D0-I-  .byte $97 ; <indirect ref>
  0x021B9A $9B8A: -D0-I-  .byte $04 ; <indirect ref>
  0x021B9B $9B8B: -D0-I-  .byte $09 ; <indirect ref>
  0x021B9C $9B8C: -D0-I-  .byte $11 ; <indirect ref>
  0x021B9D $9B8D: -D0-I-  .byte $19 ; <indirect ref>
  0x021B9E $9B8E: -D0-I-  .byte $FA ; <indirect ref>
  0x021B9F $9B8F: -D0-I-  .byte $2D ; <indirect ref>
  0x021BA0 $9B90: -D0-I-  .byte $A3 ; <indirect ref>
  0x021BA1 $9B91: -D0-I-  .byte $F2 ; <indirect ref>
  0x021BA2 $9B92: -D0-I-  .byte $83 ; <indirect ref>
  0x021BA3 $9B93: -D0-I-  .byte $A3 ; <indirect ref>
  0x021BA4 $9B94: -D0-I-  .byte $FA ; <indirect ref>
  0x021BA5 $9B95: -D0-I-  .byte $2D ; <indirect ref>
  0x021BA6 $9B96: -D0-I-  .byte $A3 ; <indirect ref>
  0x021BA7 $9B97: -D0-I-  .byte $FA ; <indirect ref>
  0x021BA8 $9B98: -D0-I-  .byte $21 ; <indirect ref>
  0x021BA9 $9B99: -D0-I-  .byte $A3 ; <indirect ref>
  0x021BAA $9B9A: -D0-I-  .byte $F2 ; <indirect ref>
  0x021BAB $9B9B: -D0-I-  .byte $7E ; <indirect ref>
  0x021BAC $9B9C: -D0-I-  .byte $A3 ; <indirect ref>
  0x021BAD $9B9D: -D0-I-  .byte $FA ; <indirect ref>
  0x021BAE $9B9E: -D0-I-  .byte $2D ; <indirect ref>
  0x021BAF $9B9F: -D0-I-  .byte $A3 ; <indirect ref>
  0x021BB0 $9BA0: -D0-I-  .byte $FA ; <indirect ref>
  0x021BB1 $9BA1: -D0-I-  .byte $08 ; <indirect ref>
  0x021BB2 $9BA2: -D0-I-  .byte $A3 ; <indirect ref>
  0x021BB3 $9BA3: -D0-I-  .byte $F2 ; <indirect ref>
  0x021BB4 $9BA4: -D0-I-  .byte $71 ; <indirect ref>
  0x021BB5 $9BA5: -D0-I-  .byte $A3 ; <indirect ref>
  0x021BB6 $9BA6: -D0-I-  .byte $FA ; <indirect ref>
  0x021BB7 $9BA7: -D0-I-  .byte $2D ; <indirect ref>
  0x021BB8 $9BA8: -D0-I-  .byte $A3 ; <indirect ref>
  0x021BB9 $9BA9: -D0-I-  .byte $FA ; <indirect ref>
  0x021BBA $9BAA: -D0-I-  .byte $EF ; <indirect ref>
  0x021BBB $9BAB: -D0-I-  .byte $A2 ; <indirect ref>
  0x021BBC $9BAC: -D0-I-  .byte $F2 ; <indirect ref>
  0x021BBD $9BAD: -D0-I-  .byte $19 ; <indirect ref>
  0x021BBE $9BAE: -D0-I-  .byte $A3 ; <indirect ref>
  0x021BBF $9BAF: -D0-I-  .byte $F3 ; <indirect ref>
  0x021BC0 $9BB0: -D0-I-  .byte $97 ; <indirect ref>
  0x021BC1 $9BB1: -D0-I-  .byte $04 ; <indirect ref>
  0x021BC2 $9BB2: ------  .byte $0D
  0x021BC3 $9BB3: ------  .byte $18
  0x021BC4 $9BB4: ------  .byte $0A
  0x021BC5 $9BB5: -D0-I-  .byte $FA ; <indirect ref>
  0x021BC6 $9BB6: -D0-I-  .byte $2D ; <indirect ref>
  0x021BC7 $9BB7: -D0-I-  .byte $A3 ; <indirect ref>
  0x021BC8 $9BB8: -D0-I-  .byte $FA ; <indirect ref>
  0x021BC9 $9BB9: -D0-I-  .byte $DD ; <indirect ref>
  0x021BCA $9BBA: -D0-I-  .byte $A2 ; <indirect ref>
  0x021BCB $9BBB: -D0-I-  .byte $FA ; <indirect ref>
  0x021BCC $9BBC: -D0-I-  .byte $62 ; <indirect ref>
  0x021BCD $9BBD: -D0-I-  .byte $9F ; <indirect ref>
  0x021BCE $9BBE: -D0-I-  .byte $F0 ; <indirect ref>
  0x021BCF $9BBF: ------  .byte $FA
  0x021BD0 $9BC0: ------  .byte $2D
  0x021BD1 $9BC1: ------  .byte $A3
  0x021BD2 $9BC2: ------  .byte $FA
  0x021BD3 $9BC3: ------  .byte $DD
  0x021BD4 $9BC4: ------  .byte $A2
  0x021BD5 $9BC5: ------  .byte $FA
  0x021BD6 $9BC6: ------  .byte $5C
  0x021BD7 $9BC7: ------  .byte $9F
  0x021BD8 $9BC8: ------  .byte $F2
  0x021BD9 $9BC9: ------  .byte $40
  0x021BDA $9BCA: ------  .byte $A2
  0x021BDB $9BCB: -D0-I-  .byte $FA ; <indirect ref>
  0x021BDC $9BCC: -D0-I-  .byte $FE ; <indirect ref>
  0x021BDD $9BCD: -D0-I-  .byte $A2 ; <indirect ref>
  0x021BDE $9BCE: -D0-I-  .byte $F0 ; <indirect ref>
  0x021BDF $9BCF: -D0-I-  .byte $FA ; <indirect ref>
  0x021BE0 $9BD0: -D0-I-  .byte $BB ; <indirect ref>
  0x021BE1 $9BD1: -D0-I-  .byte $A1 ; <indirect ref>
  0x021BE2 $9BD2: -D0-I-  .byte $F2 ; <indirect ref>
  0x021BE3 $9BD3: -D0-I-  .byte $88 ; <indirect ref>
  0x021BE4 $9BD4: -D0-I-  .byte $A3 ; <indirect ref>
  0x021BE5 $9BD5: -D0-I-  .byte $FA ; <indirect ref>
  0x021BE6 $9BD6: -D0-I-  .byte $B1 ; <indirect ref>
  0x021BE7 $9BD7: -D0-I-  .byte $A1 ; <indirect ref>
  0x021BE8 $9BD8: -D0-I-  .byte $F2 ; <indirect ref>
  0x021BE9 $9BD9: -D0-I-  .byte $88 ; <indirect ref>
  0x021BEA $9BDA: -D0-I-  .byte $A3 ; <indirect ref>
  0x021BEB $9BDB: -D0-I-  .byte $F6 ; <indirect ref>
  0x021BEC $9BDC: -D0-I-  .byte $F2 ; <indirect ref>
  0x021BED $9BDD: -D0-I-  .byte $38 ; <indirect ref>
  0x021BEE $9BDE: -D0-I-  .byte $A2 ; <indirect ref>
  0x021BEF $9BDF: -D0-I-  .byte $F6 ; <indirect ref>
  0x021BF0 $9BE0: -D0-I-  .byte $F2 ; <indirect ref>
  0x021BF1 $9BE1: -D0-I-  .byte $2E ; <indirect ref>
  0x021BF2 $9BE2: -D0-I-  .byte $A2 ; <indirect ref>
  0x021BF3 $9BE3: -D0-I-  .byte $FD ; <indirect ref>
  0x021BF4 $9BE4: -D0-I-  .byte $00 ; <indirect ref>
  0x021BF5 $9BE5: -D0-I-  .byte $FA ; <indirect ref>
  0x021BF6 $9BE6: -D0-I-  .byte $3E ; <indirect ref>
  0x021BF7 $9BE7: -D0-I-  .byte $9F ; <indirect ref>
  0x021BF8 $9BE8: -D0-I-  .byte $F3 ; <indirect ref>
  0x021BF9 $9BE9: -D0-I-  .byte $84 ; <indirect ref>
  0x021BFA $9BEA: -D0-I-  .byte $02 ; <indirect ref>
  0x021BFB $9BEB: -D0-I-  .byte $04 ; <indirect ref>
  0x021BFC $9BEC: -D0-I-  .byte $F2 ; <indirect ref>
  0x021BFD $9BED: -D0-I-  .byte $9E ; <indirect ref>
  0x021BFE $9BEE: -D0-I-  .byte $B4 ; <indirect ref>
  0x021BFF $9BEF: -D0-I-  .byte $F2 ; <indirect ref>
  0x021C00 $9BF0: -D0-I-  .byte $B6 ; <indirect ref>
  0x021C01 $9BF1: -D0-I-  .byte $B4 ; <indirect ref>
  0x021C02 $9BF2: -D0-I-  .byte $FA ; <indirect ref>
  0x021C03 $9BF3: -D0-I-  .byte $BF ; <indirect ref>
  0x021C04 $9BF4: -D0-I-  .byte $B4 ; <indirect ref>
  0x021C05 $9BF5: -D0-I-  .byte $F2 ; <indirect ref>
  0x021C06 $9BF6: -D0-I-  .byte $C7 ; <indirect ref>
  0x021C07 $9BF7: -D0-I-  .byte $B4 ; <indirect ref>
  0x021C08 $9BF8: -D0-I-  .byte $FA ; <indirect ref>
  0x021C09 $9BF9: -D0-I-  .byte $BF ; <indirect ref>
  0x021C0A $9BFA: -D0-I-  .byte $B4 ; <indirect ref>
  0x021C0B $9BFB: -D0-I-  .byte $F2 ; <indirect ref>
  0x021C0C $9BFC: -D0-I-  .byte $12 ; <indirect ref>
  0x021C0D $9BFD: -D0-I-  .byte $BA ; <indirect ref>
  0x021C0E $9BFE: -D0-I-  .byte $FA ; <indirect ref>
  0x021C0F $9BFF: -D0-I-  .byte $BF ; <indirect ref>
  0x021C10 $9C00: -D0-I-  .byte $B4 ; <indirect ref>
  0x021C11 $9C01: -D0-I-  .byte $F2 ; <indirect ref>
  0x021C12 $9C02: -D0-I-  .byte $17 ; <indirect ref>
  0x021C13 $9C03: -D0-I-  .byte $BA ; <indirect ref>
  0x021C14 $9C04: -D0-I-  .byte $FA ; <indirect ref>
  0x021C15 $9C05: -D0-I-  .byte $A6 ; <indirect ref>
  0x021C16 $9C06: -D0-I-  .byte $B7 ; <indirect ref>
  0x021C17 $9C07: -D0-I-  .byte $F2 ; <indirect ref>
  0x021C18 $9C08: -D0-I-  .byte $AF ; <indirect ref>
  0x021C19 $9C09: -D0-I-  .byte $B7 ; <indirect ref>
  0x021C1A $9C0A: -D0-I-  .byte $FD ; <indirect ref>
  0x021C1B $9C0B: -D0-I-  .byte $00 ; <indirect ref>
  0x021C1C $9C0C: -D0-I-  .byte $FA ; <indirect ref>
  0x021C1D $9C0D: -D0-I-  .byte $3E ; <indirect ref>
  0x021C1E $9C0E: -D0-I-  .byte $9F ; <indirect ref>
  0x021C1F $9C0F: -D0-I-  .byte $F3 ; <indirect ref>
  0x021C20 $9C10: -D0-I-  .byte $84 ; <indirect ref>
  0x021C21 $9C11: -D0-I-  .byte $05 ; <indirect ref>
  0x021C22 $9C12: -D0-I-  .byte $01 ; <indirect ref>
  0x021C23 $9C13: -D0-I-  .byte $F2 ; <indirect ref>
  0x021C24 $9C14: -D0-I-  .byte $AE ; <indirect ref>
  0x021C25 $9C15: -D0-I-  .byte $B4 ; <indirect ref>
  0x021C26 $9C16: -D0-I-  .byte $F2 ; <indirect ref>
  0x021C27 $9C17: -D0-I-  .byte $A6 ; <indirect ref>
  0x021C28 $9C18: -D0-I-  .byte $B4 ; <indirect ref>
  0x021C29 $9C19: -D0-I-  .byte $FA ; <indirect ref>
  0x021C2A $9C1A: -D0-I-  .byte $36 ; <indirect ref>
  0x021C2B $9C1B: -D0-I-  .byte $9C ; <indirect ref>
  0x021C2C $9C1C: -D0-I-  .byte $FA ; <indirect ref>
  0x021C2D $9C1D: -D0-I-  .byte $23 ; <indirect ref>
  0x021C2E $9C1E: -D0-I-  .byte $9C ; <indirect ref>
  0x021C2F $9C1F: -D0-I-  .byte $5A ; <indirect ref>
  0x021C30 $9C20: -D0-I-  .byte $30 ; <indirect ref>
  0x021C31 $9C21: -D0-I-  .byte $B7 ; <indirect ref>
  0x021C32 $9C22: -D0-I-  .byte $78 ; <indirect ref>
  0x021C33 $9C23: -D0-I-  .byte $01 ; <indirect ref>
  0x021C34 $9C24: -D0-I-  .byte $F0 ; <indirect ref>
  0x021C35 $9C25: -D0-I-  .byte $F0 ; <indirect ref>
  0x021C36 $9C26: -D0-I-  .byte $00 ; <indirect ref>
  0x021C37 $9C27: -D0-I-  .byte $FB ; <indirect ref>
  0x021C38 $9C28: -D0-I-  .byte $F7 ; <indirect ref>
  0x021C39 $9C29: -D0-I-  .byte $03 ; <indirect ref>
  0x021C3A $9C2A: -D0-I-  .byte $F3 ; <indirect ref>
  0x021C3B $9C2B: -D0-I-  .byte $21 ; <indirect ref>
  0x021C3C $9C2C: -D0-I-  .byte $5D ; <indirect ref>
  0x021C3D $9C2D: -D0-I-  .byte $A2 ; <indirect ref>
  0x021C3E $9C2E: -D0-I-  .byte $67 ; <indirect ref>
  0x021C3F $9C2F: -D0-I-  .byte $A2 ; <indirect ref>
  0x021C40 $9C30: -D0-I-  .byte $F3 ; <indirect ref>
  0x021C41 $9C31: -D0-I-  .byte $22 ; <indirect ref>
  0x021C42 $9C32: -D0-I-  .byte $3F ; <indirect ref>
  0x021C43 $9C33: -D0-I-  .byte $9C ; <indirect ref>
  0x021C44 $9C34: -D0-I-  .byte $36 ; <indirect ref>
  0x021C45 $9C35: -D0-I-  .byte $9C ; <indirect ref>
  0x021C46 $9C36: -D0-I-  .byte $F9 ; <indirect ref>
  0x021C47 $9C37: -D0-I-  .byte $02 ; <indirect ref>
  0x021C48 $9C38: -D0-I-  .byte $42 ; <indirect ref>
  0x021C49 $9C39: -D0-I-  .byte $F3 ; <indirect ref>
  0x021C4A $9C3A: -D0-I-  .byte $21 ; <indirect ref>
  0x021C4B $9C3B: -D0-I-  .byte $B5 ; <indirect ref>
  0x021C4C $9C3C: -D0-I-  .byte $A2 ; <indirect ref>
  0x021C4D $9C3D: -D0-I-  .byte $BC ; <indirect ref>
  0x021C4E $9C3E: -D0-I-  .byte $A2 ; <indirect ref>
  0x021C4F $9C3F: -D0-I-  .byte $F5 ; <indirect ref>
  0x021C50 $9C40: -D0-I-  .byte $F7 ; <indirect ref>
  0x021C51 $9C41: -D0-I-  .byte $13 ; <indirect ref>
  0x021C52 $9C42: -D0-I-  .byte $F9 ; <indirect ref>
  0x021C53 $9C43: -D0-I-  .byte $02 ; <indirect ref>
  0x021C54 $9C44: -D0-I-  .byte $41 ; <indirect ref>
  0x021C55 $9C45: -D0-I-  .byte $F3 ; <indirect ref>
  0x021C56 $9C46: -D0-I-  .byte $21 ; <indirect ref>
  0x021C57 $9C47: -D0-I-  .byte $4B ; <indirect ref>
  0x021C58 $9C48: -D0-I-  .byte $9C ; <indirect ref>
  0x021C59 $9C49: -D0-I-  .byte $53 ; <indirect ref>
  0x021C5A $9C4A: -D0-I-  .byte $9C ; <indirect ref>
  0x021C5B $9C4B: -D0-I-  .byte $F3 ; <indirect ref>
  0x021C5C $9C4C: -D0-I-  .byte $23 ; <indirect ref>
  0x021C5D $9C4D: -D0-I-  .byte $A7 ; <indirect ref>
  0x021C5E $9C4E: -D0-I-  .byte $A2 ; <indirect ref>
  0x021C5F $9C4F: -D0-I-  .byte $AE ; <indirect ref>
  0x021C60 $9C50: -D0-I-  .byte $A2 ; <indirect ref>
  0x021C61 $9C51: -D0-I-  .byte $71 ; <indirect ref>
  0x021C62 $9C52: -D0-I-  .byte $A2 ; <indirect ref>
  0x021C63 $9C53: -D0-I-  .byte $F3 ; <indirect ref>
  0x021C64 $9C54: -D0-I-  .byte $23 ; <indirect ref>
  0x021C65 $9C55: ------  .byte $C3
  0x021C66 $9C56: ------  .byte $A2
  0x021C67 $9C57: ------  .byte $CA
  0x021C68 $9C58: ------  .byte $A2
  0x021C69 $9C59: -D0-I-  .byte $D1 ; <indirect ref>
  0x021C6A $9C5A: -D0-I-  .byte $A2 ; <indirect ref>
  0x021C6B $9C5B: -D0-I-  .byte $F3 ; <indirect ref>
  0x021C6C $9C5C: -D0-I-  .byte $2E ; <indirect ref>
  0x021C6D $9C5D: -D0-I-  .byte $4D ; <indirect ref>
  0x021C6E $9C5E: -D0-I-  .byte $A3 ; <indirect ref>
  0x021C6F $9C5F: -D0-I-  .byte $3A ; <indirect ref>
  0x021C70 $9C60: -D0-I-  .byte $A3 ; <indirect ref>
  0x021C71 $9C61: -D0-I-  .byte $F3 ; <indirect ref>
  0x021C72 $9C62: -D0-I-  .byte $37 ; <indirect ref>
  0x021C73 $9C63: -D0-I-  .byte $10 ; <indirect ref>
  0x021C74 $9C64: -D0-I-  .byte $B3 ; <indirect ref>
  0x021C75 $9C65: -D0-I-  .byte $FE ; <indirect ref>
  0x021C76 $9C66: -D0-I-  .byte $B2 ; <indirect ref>
  0x021C77 $9C67: -D0-I-  .byte $F3 ; <indirect ref>
  0x021C78 $9C68: -D0-I-  .byte $37 ; <indirect ref>
  0x021C79 $9C69: -D0-I-  .byte $B3 ; <indirect ref>
  0x021C7A $9C6A: -D0-I-  .byte $A3 ; <indirect ref>
  0x021C7B $9C6B: -D0-I-  .byte $FE ; <indirect ref>
  0x021C7C $9C6C: -D0-I-  .byte $B2 ; <indirect ref>
  0x021C7D $9C6D: -D0-I-  .byte $F3 ; <indirect ref>
  0x021C7E $9C6E: -D0-I-  .byte $37 ; <indirect ref>
  0x021C7F $9C6F: -D0-I-  .byte $BD ; <indirect ref>
  0x021C80 $9C70: -D0-I-  .byte $A3 ; <indirect ref>
  0x021C81 $9C71: -D0-I-  .byte $FE ; <indirect ref>
  0x021C82 $9C72: -D0-I-  .byte $B2 ; <indirect ref>
  0x021C83 $9C73: -D0-I-  .byte $F3 ; <indirect ref>
  0x021C84 $9C74: -D0-I-  .byte $37 ; <indirect ref>
  0x021C85 $9C75: -D0-I-  .byte $C5 ; <indirect ref>
  0x021C86 $9C76: -D0-I-  .byte $A3 ; <indirect ref>
  0x021C87 $9C77: -D0-I-  .byte $FE ; <indirect ref>
  0x021C88 $9C78: -D0-I-  .byte $B2 ; <indirect ref>
  0x021C89 $9C79: -D0-I-  .byte $F3 ; <indirect ref>
  0x021C8A $9C7A: -D0-I-  .byte $37 ; <indirect ref>
  0x021C8B $9C7B: -D0-I-  .byte $B5 ; <indirect ref>
  0x021C8C $9C7C: -D0-I-  .byte $A6 ; <indirect ref>
  0x021C8D $9C7D: -D0-I-  .byte $BB ; <indirect ref>
  0x021C8E $9C7E: -D0-I-  .byte $A6 ; <indirect ref>
  0x021C8F $9C7F: -D0-I-  .byte $F3 ; <indirect ref>
  0x021C90 $9C80: -D0-I-  .byte $37 ; <indirect ref>
  0x021C91 $9C81: -D0-I-  .byte $0C ; <indirect ref>
  0x021C92 $9C82: -D0-I-  .byte $A7 ; <indirect ref>
  0x021C93 $9C83: -D0-I-  .byte $BC ; <indirect ref>
  0x021C94 $9C84: -D0-I-  .byte $A6 ; <indirect ref>
  0x021C95 $9C85: -D0-I-  .byte $F3 ; <indirect ref>
  0x021C96 $9C86: -D0-I-  .byte $37 ; <indirect ref>
  0x021C97 $9C87: -D0-I-  .byte $CE ; <indirect ref>
  0x021C98 $9C88: -D0-I-  .byte $A7 ; <indirect ref>
  0x021C99 $9C89: -D0-I-  .byte $CE ; <indirect ref>
  0x021C9A $9C8A: -D0-I-  .byte $A6 ; <indirect ref>
  0x021C9B $9C8B: -D0-I-  .byte $F3 ; <indirect ref>
  0x021C9C $9C8C: -D0-I-  .byte $37 ; <indirect ref>
  0x021C9D $9C8D: -D0-I-  .byte $FF ; <indirect ref>
  0x021C9E $9C8E: -D0-I-  .byte $A6 ; <indirect ref>
  0x021C9F $9C8F: -D0-I-  .byte $E4 ; <indirect ref>
  0x021CA0 $9C90: -D0-I-  .byte $A6 ; <indirect ref>
  0x021CA1 $9C91: -D0-I-  .byte $F3 ; <indirect ref>
  0x021CA2 $9C92: -D0-I-  .byte $37 ; <indirect ref>
  0x021CA3 $9C93: -D0-I-  .byte $D5 ; <indirect ref>
  0x021CA4 $9C94: -D0-I-  .byte $A7 ; <indirect ref>
  0x021CA5 $9C95: -D0-I-  .byte $CE ; <indirect ref>
  0x021CA6 $9C96: -D0-I-  .byte $A6 ; <indirect ref>
  0x021CA7 $9C97: -D0-I-  .byte $F3 ; <indirect ref>
  0x021CA8 $9C98: -D0-I-  .byte $37 ; <indirect ref>
  0x021CA9 $9C99: -D0-I-  .byte $DE ; <indirect ref>
  0x021CAA $9C9A: -D0-I-  .byte $A7 ; <indirect ref>
  0x021CAB $9C9B: -D0-I-  .byte $CE ; <indirect ref>
  0x021CAC $9C9C: -D0-I-  .byte $A6 ; <indirect ref>
  0x021CAD $9C9D: -D0-I-  .byte $F3 ; <indirect ref>
  0x021CAE $9C9E: -D0-I-  .byte $37 ; <indirect ref>
  0x021CAF $9C9F: -D0-I-  .byte $E7 ; <indirect ref>
  0x021CB0 $9CA0: -D0-I-  .byte $A7 ; <indirect ref>
  0x021CB1 $9CA1: -D0-I-  .byte $CE ; <indirect ref>
  0x021CB2 $9CA2: -D0-I-  .byte $A6 ; <indirect ref>
  0x021CB3 $9CA3: -D0-I-  .byte $FA ; <indirect ref>
  0x021CB4 $9CA4: -D0-I-  .byte $95 ; <indirect ref>
  0x021CB5 $9CA5: -D0-I-  .byte $A4 ; <indirect ref>
  0x021CB6 $9CA6: -D0-I-  .byte $F3 ; <indirect ref>
  0x021CB7 $9CA7: -D0-I-  .byte $1F ; <indirect ref>
  0x021CB8 $9CA8: -D0-I-  .byte $EE ; <indirect ref>
  0x021CB9 $9CA9: -D0-I-  .byte $A7 ; <indirect ref>
  0x021CBA $9CAA: -D0-I-  .byte $EE ; <indirect ref>
  0x021CBB $9CAB: -D0-I-  .byte $A7 ; <indirect ref>
  0x021CBC $9CAC: -D0-I-  .byte $B0 ; <indirect ref>
  0x021CBD $9CAD: -D0-I-  .byte $9C ; <indirect ref>
  0x021CBE $9CAE: -D0-I-  .byte $EE ; <indirect ref>
  0x021CBF $9CAF: -D0-I-  .byte $A7 ; <indirect ref>
  0x021CC0 $9CB0: -D0-I-  .byte $F3 ; <indirect ref>
  0x021CC1 $9CB1: -D0-I-  .byte $1C ; <indirect ref>
  0x021CC2 $9CB2: -D0-I-  .byte $EE ; <indirect ref>
  0x021CC3 $9CB3: -D0-I-  .byte $A7 ; <indirect ref>
  0x021CC4 $9CB4: -D0-I-  .byte $05 ; <indirect ref>
  0x021CC5 $9CB5: -D0-I-  .byte $A8 ; <indirect ref>
  0x021CC6 $9CB6: -D0-I-  .byte $20 ; <indirect ref>
  0x021CC7 $9CB7: -D0-I-  .byte $A8 ; <indirect ref>
  0x021CC8 $9CB8: -D0-I-  .byte $58 ; <indirect ref>
  0x021CC9 $9CB9: -D0-I-  .byte $A8 ; <indirect ref>
  0x021CCA $9CBA: -D0-I-  .byte $99 ; <indirect ref>
  0x021CCB $9CBB: -D0-I-  .byte $A8 ; <indirect ref>
  0x021CCC $9CBC: -D0-I-  .byte $C1 ; <indirect ref>
  0x021CCD $9CBD: -D0-I-  .byte $A8 ; <indirect ref>
  0x021CCE $9CBE: ------  .byte $11
  0x021CCF $9CBF: ------  .byte $A9
  0x021CD0 $9CC0: -D0-I-  .byte $FA ; <indirect ref>
  0x021CD1 $9CC1: -D0-I-  .byte $95 ; <indirect ref>
  0x021CD2 $9CC2: -D0-I-  .byte $A4 ; <indirect ref>
  0x021CD3 $9CC3: -D0-I-  .byte $F3 ; <indirect ref>
  0x021CD4 $9CC4: -D0-I-  .byte $1F ; <indirect ref>
  0x021CD5 $9CC5: -D0-I-  .byte $4F ; <indirect ref>
  0x021CD6 $9CC6: -D0-I-  .byte $AA ; <indirect ref>
  0x021CD7 $9CC7: -D0-I-  .byte $4F ; <indirect ref>
  0x021CD8 $9CC8: -D0-I-  .byte $AA ; <indirect ref>
  0x021CD9 $9CC9: -D0-I-  .byte $CD ; <indirect ref>
  0x021CDA $9CCA: -D0-I-  .byte $9C ; <indirect ref>
  0x021CDB $9CCB: -D0-I-  .byte $4F ; <indirect ref>
  0x021CDC $9CCC: -D0-I-  .byte $AA ; <indirect ref>
  0x021CDD $9CCD: -D0-I-  .byte $F3 ; <indirect ref>
  0x021CDE $9CCE: -D0-I-  .byte $1C ; <indirect ref>
  0x021CDF $9CCF: -D0-I-  .byte $4F ; <indirect ref>
  0x021CE0 $9CD0: -D0-I-  .byte $AA ; <indirect ref>
  0x021CE1 $9CD1: -D0-I-  .byte $62 ; <indirect ref>
  0x021CE2 $9CD2: -D0-I-  .byte $AA ; <indirect ref>
  0x021CE3 $9CD3: ------  .byte $6D
  0x021CE4 $9CD4: ------  .byte $AA
  0x021CE5 $9CD5: -D0-I-  .byte $B7 ; <indirect ref>
  0x021CE6 $9CD6: -D0-I-  .byte $AA ; <indirect ref>
  0x021CE7 $9CD7: -D0-I-  .byte $CB ; <indirect ref>
  0x021CE8 $9CD8: -D0-I-  .byte $AA ; <indirect ref>
  0x021CE9 $9CD9: -D0-I-  .byte $E3 ; <indirect ref>
  0x021CEA $9CDA: -D0-I-  .byte $AA ; <indirect ref>
  0x021CEB $9CDB: ------  .byte $FF
  0x021CEC $9CDC: ------  .byte $AA
  0x021CED $9CDD: -D0-I-  .byte $FA ; <indirect ref>
  0x021CEE $9CDE: -D0-I-  .byte $23 ; <indirect ref>
  0x021CEF $9CDF: -D0-I-  .byte $9C ; <indirect ref>
  0x021CF0 $9CE0: -D0-I-  .byte $F3 ; <indirect ref>
  0x021CF1 $9CE1: -D0-I-  .byte $8C ; <indirect ref>
  0x021CF2 $9CE2: -D0-I-  .byte $02 ; <indirect ref>
  0x021CF3 $9CE3: -D0-I-  .byte $10 ; <indirect ref>
  0x021CF4 $9CE4: -D0-I-  .byte $FD ; <indirect ref>
  0x021CF5 $9CE5: -D0-I-  .byte $03 ; <indirect ref>
  0x021CF6 $9CE6: -D0-I-  .byte $F9 ; <indirect ref>
  0x021CF7 $9CE7: -D0-I-  .byte $02 ; <indirect ref>
  0x021CF8 $9CE8: -D0-I-  .byte $12 ; <indirect ref>
  0x021CF9 $9CE9: -D0-I-  .byte $30 ; <indirect ref>
  0x021CFA $9CEA: -D0-I-  .byte $42 ; <indirect ref>
  0x021CFB $9CEB: -D0-I-  .byte $82 ; <indirect ref>
  0x021CFC $9CEC: -D0-I-  .byte $63 ; <indirect ref>
  0x021CFD $9CED: -D0-I-  .byte $F0 ; <indirect ref>
  0x021CFE $9CEE: -D0-I-  .byte $F3 ; <indirect ref>
  0x021CFF $9CEF: -D0-I-  .byte $B4 ; <indirect ref>
  0x021D00 $9CF0: -D0-I-  .byte $03 ; <indirect ref>
  0x021D01 $9CF1: ------  .byte $A9
  0x021D02 $9CF2: ------  .byte $60
  0x021D03 $9CF3: -D0-I-  .byte $F5 ; <indirect ref>
  0x021D04 $9CF4: -D0-I-  .byte $F3 ; <indirect ref>
  0x021D05 $9CF5: -D0-I-  .byte $1D ; <indirect ref>
  0x021D06 $9CF6: -D0-I-  .byte $31 ; <indirect ref>
  0x021D07 $9CF7: -D0-I-  .byte $AB ; <indirect ref>
  0x021D08 $9CF8: ------  .byte $31
  0x021D09 $9CF9: ------  .byte $AB
  0x021D0A $9CFA: ------  .byte $31
  0x021D0B $9CFB: ------  .byte $AB
  0x021D0C $9CFC: -D0-I-  .byte $4C ; <indirect ref>
  0x021D0D $9CFD: -D0-I-  .byte $AB ; <indirect ref>
  0x021D0E $9CFE: ------  .byte $31
  0x021D0F $9CFF: ------  .byte $AB
  0x021D10 $9D00: -D0-I-  .byte $CC ; <indirect ref>
  0x021D11 $9D01: -D0-I-  .byte $AB ; <indirect ref>
  0x021D12 $9D02: ------  .byte $31
  0x021D13 $9D03: ------  .byte $AB
  0x021D14 $9D04: -D0-I-  .byte $F0 ; <indirect ref>
  0x021D15 $9D05: -D0-I-  .byte $AB ; <indirect ref>
  0x021D16 $9D06: ------  .byte $31
  0x021D17 $9D07: ------  .byte $AB
  0x021D18 $9D08: ------  .byte $31
  0x021D19 $9D09: ------  .byte $AB
  0x021D1A $9D0A: ------  .byte $31
  0x021D1B $9D0B: ------  .byte $AB
  0x021D1C $9D0C: -D0-I-  .byte $23 ; <indirect ref>
  0x021D1D $9D0D: -D0-I-  .byte $AC ; <indirect ref>
  0x021D1E $9D0E: -D0-I-  .byte $4D ; <indirect ref>
  0x021D1F $9D0F: -D0-I-  .byte $AC ; <indirect ref>
  0x021D20 $9D10: -D0-I-  .byte $6E ; <indirect ref>
  0x021D21 $9D11: -D0-I-  .byte $AC ; <indirect ref>
  0x021D22 $9D12: ------  .byte $31
  0x021D23 $9D13: ------  .byte $AB
  0x021D24 $9D14: ------  .byte $31
  0x021D25 $9D15: ------  .byte $AB
  0x021D26 $9D16: ------  .byte $31
  0x021D27 $9D17: ------  .byte $AB
  0x021D28 $9D18: -D0-I-  .byte $B9 ; <indirect ref>
  0x021D29 $9D19: -D0-I-  .byte $AC ; <indirect ref>
  0x021D2A $9D1A: -D0-I-  .byte $0C ; <indirect ref>
  0x021D2B $9D1B: -D0-I-  .byte $AD ; <indirect ref>
  0x021D2C $9D1C: -D0-I-  .byte $1D ; <indirect ref>
  0x021D2D $9D1D: -D0-I-  .byte $AD ; <indirect ref>
  0x021D2E $9D1E: -D0-I-  .byte $4C ; <indirect ref>
  0x021D2F $9D1F: -D0-I-  .byte $AD ; <indirect ref>
  0x021D30 $9D20: -D0-I-  .byte $5E ; <indirect ref>
  0x021D31 $9D21: -D0-I-  .byte $AD ; <indirect ref>
  0x021D32 $9D22: -D0-I-  .byte $81 ; <indirect ref>
  0x021D33 $9D23: -D0-I-  .byte $AD ; <indirect ref>
  0x021D34 $9D24: -D0-I-  .byte $AB ; <indirect ref>
  0x021D35 $9D25: -D0-I-  .byte $AD ; <indirect ref>
  0x021D36 $9D26: -D0-I-  .byte $CA ; <indirect ref>
  0x021D37 $9D27: -D0-I-  .byte $AD ; <indirect ref>
  0x021D38 $9D28: -D0-I-  .byte $DC ; <indirect ref>
  0x021D39 $9D29: -D0-I-  .byte $AD ; <indirect ref>
  0x021D3A $9D2A: -D0-I-  .byte $F9 ; <indirect ref>
  0x021D3B $9D2B: -D0-I-  .byte $AD ; <indirect ref>
  0x021D3C $9D2C: -D0-I-  .byte $0F ; <indirect ref>
  0x021D3D $9D2D: -D0-I-  .byte $AE ; <indirect ref>
  0x021D3E $9D2E: ------  .byte $31
  0x021D3F $9D2F: ------  .byte $AB
  0x021D40 $9D30: ------  .byte $31
  0x021D41 $9D31: ------  .byte $AB
  0x021D42 $9D32: ------  .byte $31
  0x021D43 $9D33: ------  .byte $AB
  0x021D44 $9D34: ------  .byte $31
  0x021D45 $9D35: ------  .byte $AB
  0x021D46 $9D36: ------  .byte $31
  0x021D47 $9D37: ------  .byte $AB
  0x021D48 $9D38: ------  .byte $31
  0x021D49 $9D39: ------  .byte $AB
  0x021D4A $9D3A: -D0-I-  .byte $34 ; <indirect ref>
  0x021D4B $9D3B: -D0-I-  .byte $AE ; <indirect ref>
  0x021D4C $9D3C: -D0-I-  .byte $F3 ; <indirect ref>
  0x021D4D $9D3D: -D0-I-  .byte $09 ; <indirect ref>
  0x021D4E $9D3E: -D0-I-  .byte $46 ; <indirect ref>
  0x021D4F $9D3F: -D0-I-  .byte $9D ; <indirect ref>
  0x021D50 $9D40: -D0-I-  .byte $64 ; <indirect ref>
  0x021D51 $9D41: -D0-I-  .byte $AE ; <indirect ref>
  0x021D52 $9D42: -D0-I-  .byte $64 ; <indirect ref>
  0x021D53 $9D43: -D0-I-  .byte $AE ; <indirect ref>
  0x021D54 $9D44: -D0-I-  .byte $64 ; <indirect ref>
  0x021D55 $9D45: -D0-I-  .byte $AE ; <indirect ref>
  0x021D56 $9D46: -D0-I-  .byte $F3 ; <indirect ref>
  0x021D57 $9D47: -D0-I-  .byte $48 ; <indirect ref>
  0x021D58 $9D48: -D0-I-  .byte $4C ; <indirect ref>
  0x021D59 $9D49: -D0-I-  .byte $AE ; <indirect ref>
  0x021D5A $9D4A: -D0-I-  .byte $D4 ; <indirect ref>
  0x021D5B $9D4B: -D0-I-  .byte $AE ; <indirect ref>
  0x021D5C $9D4C: ------  .byte $64
  0x021D5D $9D4D: ------  .byte $AE
  0x021D5E $9D4E: -D0-I-  .byte $31 ; <indirect ref>
  0x021D5F $9D4F: -D0-I-  .byte $AF ; <indirect ref>
  0x021D60 $9D50: -D0-I-  .byte $64 ; <indirect ref>
  0x021D61 $9D51: -D0-I-  .byte $AE ; <indirect ref>
  0x021D62 $9D52: -D0-I-  .byte $F3 ; <indirect ref>
  0x021D63 $9D53: -D0-I-  .byte $1D ; <indirect ref>
  0x021D64 $9D54: ------  .byte $C5
  0x021D65 $9D55: ------  .byte $AF
  0x021D66 $9D56: ------  .byte $C5
  0x021D67 $9D57: ------  .byte $AF
  0x021D68 $9D58: -D0-I-  .byte $BE ; <indirect ref>
  0x021D69 $9D59: -D0-I-  .byte $AF ; <indirect ref>
  0x021D6A $9D5A: ------  .byte $C5
  0x021D6B $9D5B: ------  .byte $AF
  0x021D6C $9D5C: -D0-I-  .byte $C6 ; <indirect ref>
  0x021D6D $9D5D: -D0-I-  .byte $AF ; <indirect ref>
  0x021D6E $9D5E: ------  .byte $C5
  0x021D6F $9D5F: ------  .byte $AF
  0x021D70 $9D60: ------  .byte $C5
  0x021D71 $9D61: ------  .byte $AF
  0x021D72 $9D62: ------  .byte $C5
  0x021D73 $9D63: ------  .byte $AF
  0x021D74 $9D64: -D0-I-  .byte $E5 ; <indirect ref>
  0x021D75 $9D65: -D0-I-  .byte $AF ; <indirect ref>
  0x021D76 $9D66: ------  .byte $C5
  0x021D77 $9D67: ------  .byte $AF
  0x021D78 $9D68: -D0-I-  .byte $ED ; <indirect ref>
  0x021D79 $9D69: -D0-I-  .byte $AF ; <indirect ref>
  0x021D7A $9D6A: ------  .byte $C5
  0x021D7B $9D6B: ------  .byte $AF
  0x021D7C $9D6C: ------  .byte $C5
  0x021D7D $9D6D: ------  .byte $AF
  0x021D7E $9D6E: ------  .byte $C5
  0x021D7F $9D6F: ------  .byte $AF
  0x021D80 $9D70: -D0-I-  .byte $F0 ; <indirect ref>
  0x021D81 $9D71: -D0-I-  .byte $AF ; <indirect ref>
  0x021D82 $9D72: -D0-I-  .byte $79 ; <indirect ref>
  0x021D83 $9D73: -D0-I-  .byte $B0 ; <indirect ref>
  0x021D84 $9D74: ------  .byte $C5
  0x021D85 $9D75: ------  .byte $AF
  0x021D86 $9D76: ------  .byte $C5
  0x021D87 $9D77: ------  .byte $AF
  0x021D88 $9D78: -D0-I-  .byte $9F ; <indirect ref>
  0x021D89 $9D79: -D0-I-  .byte $B0 ; <indirect ref>
  0x021D8A $9D7A: ------  .byte $C5
  0x021D8B $9D7B: ------  .byte $AF
  0x021D8C $9D7C: ------  .byte $C5
  0x021D8D $9D7D: ------  .byte $AF
  0x021D8E $9D7E: ------  .byte $C5
  0x021D8F $9D7F: ------  .byte $AF
  0x021D90 $9D80: ------  .byte $C5
  0x021D91 $9D81: ------  .byte $AF
  0x021D92 $9D82: ------  .byte $C5
  0x021D93 $9D83: ------  .byte $AF
  0x021D94 $9D84: ------  .byte $C5
  0x021D95 $9D85: ------  .byte $AF
  0x021D96 $9D86: ------  .byte $C5
  0x021D97 $9D87: ------  .byte $AF
  0x021D98 $9D88: ------  .byte $C5
  0x021D99 $9D89: ------  .byte $AF
  0x021D9A $9D8A: ------  .byte $C5
  0x021D9B $9D8B: ------  .byte $AF
  0x021D9C $9D8C: -D0-I-  .byte $C8 ; <indirect ref>
  0x021D9D $9D8D: -D0-I-  .byte $B0 ; <indirect ref>
  0x021D9E $9D8E: -D0-I-  .byte $D4 ; <indirect ref>
  0x021D9F $9D8F: -D0-I-  .byte $B0 ; <indirect ref>
  0x021DA0 $9D90: -D0-I-  .byte $DE ; <indirect ref>
  0x021DA1 $9D91: -D0-I-  .byte $B0 ; <indirect ref>
  0x021DA2 $9D92: -D0-I-  .byte $E8 ; <indirect ref>
  0x021DA3 $9D93: -D0-I-  .byte $B0 ; <indirect ref>
  0x021DA4 $9D94: ------  .byte $C5
  0x021DA5 $9D95: ------  .byte $AF
  0x021DA6 $9D96: -D0-I-  .byte $FB ; <indirect ref>
  0x021DA7 $9D97: -D0-I-  .byte $B0 ; <indirect ref>
  0x021DA8 $9D98: ------  .byte $C5
  0x021DA9 $9D99: ------  .byte $AF
  0x021DAA $9D9A: -D0-I-  .byte $F3 ; <indirect ref>
  0x021DAB $9D9B: -D0-I-  .byte $1D ; <indirect ref>
  0x021DAC $9D9C: ------  .byte $97
  0x021DAD $9D9D: ------  .byte $B1
  0x021DAE $9D9E: -D0-I-  .byte $82 ; <indirect ref>
  0x021DAF $9D9F: -D0-I-  .byte $B1 ; <indirect ref>
  0x021DB0 $9DA0: ------  .byte $97
  0x021DB1 $9DA1: ------  .byte $B1
  0x021DB2 $9DA2: ------  .byte $97
  0x021DB3 $9DA3: ------  .byte $B1
  0x021DB4 $9DA4: ------  .byte $97
  0x021DB5 $9DA5: ------  .byte $B1
  0x021DB6 $9DA6: ------  .byte $97
  0x021DB7 $9DA7: ------  .byte $B1
  0x021DB8 $9DA8: -D0-I-  .byte $98 ; <indirect ref>
  0x021DB9 $9DA9: -D0-I-  .byte $B1 ; <indirect ref>
  0x021DBA $9DAA: ------  .byte $97
  0x021DBB $9DAB: ------  .byte $B1
  0x021DBC $9DAC: ------  .byte $97
  0x021DBD $9DAD: ------  .byte $B1
  0x021DBE $9DAE: -D0-I-  .byte $CA ; <indirect ref>
  0x021DBF $9DAF: -D0-I-  .byte $B1 ; <indirect ref>
  0x021DC0 $9DB0: -D0-I-  .byte $2E ; <indirect ref>
  0x021DC1 $9DB1: -D0-I-  .byte $B2 ; <indirect ref>
  0x021DC2 $9DB2: ------  .byte $97
  0x021DC3 $9DB3: ------  .byte $B1
  0x021DC4 $9DB4: ------  .byte $97
  0x021DC5 $9DB5: ------  .byte $B1
  0x021DC6 $9DB6: ------  .byte $97
  0x021DC7 $9DB7: ------  .byte $B1
  0x021DC8 $9DB8: ------  .byte $97
  0x021DC9 $9DB9: ------  .byte $B1
  0x021DCA $9DBA: ------  .byte $97
  0x021DCB $9DBB: ------  .byte $B1
  0x021DCC $9DBC: -D0-I-  .byte $51 ; <indirect ref>
  0x021DCD $9DBD: -D0-I-  .byte $B2 ; <indirect ref>
  0x021DCE $9DBE: ------  .byte $97
  0x021DCF $9DBF: ------  .byte $B1
  0x021DD0 $9DC0: -D0-I-  .byte $0C ; <indirect ref>
  0x021DD1 $9DC1: -D0-I-  .byte $AD ; <indirect ref>
  0x021DD2 $9DC2: ------  .byte $97
  0x021DD3 $9DC3: ------  .byte $B1
  0x021DD4 $9DC4: ------  .byte $97
  0x021DD5 $9DC5: ------  .byte $B1
  0x021DD6 $9DC6: ------  .byte $97
  0x021DD7 $9DC7: ------  .byte $B1
  0x021DD8 $9DC8: ------  .byte $97
  0x021DD9 $9DC9: ------  .byte $B1
  0x021DDA $9DCA: ------  .byte $97
  0x021DDB $9DCB: ------  .byte $B1
  0x021DDC $9DCC: ------  .byte $97
  0x021DDD $9DCD: ------  .byte $B1
  0x021DDE $9DCE: ------  .byte $97
  0x021DDF $9DCF: ------  .byte $B1
  0x021DE0 $9DD0: ------  .byte $97
  0x021DE1 $9DD1: ------  .byte $B1
  0x021DE2 $9DD2: ------  .byte $97
  0x021DE3 $9DD3: ------  .byte $B1
  0x021DE4 $9DD4: ------  .byte $97
  0x021DE5 $9DD5: ------  .byte $B1
  0x021DE6 $9DD6: ------  .byte $97
  0x021DE7 $9DD7: ------  .byte $B1
  0x021DE8 $9DD8: ------  .byte $97
  0x021DE9 $9DD9: ------  .byte $B1
  0x021DEA $9DDA: ------  .byte $97
  0x021DEB $9DDB: ------  .byte $B1
  0x021DEC $9DDC: -D0-I-  .byte $6F ; <indirect ref>
  0x021DED $9DDD: -D0-I-  .byte $B2 ; <indirect ref>
  0x021DEE $9DDE: -D0-I-  .byte $FB ; <indirect ref>
  0x021DEF $9DDF: -D0-I-  .byte $B0 ; <indirect ref>
  0x021DF0 $9DE0: ------  .byte $97
  0x021DF1 $9DE1: ------  .byte $B1
  0x021DF2 $9DE2: -D0-I-  .byte $F3 ; <indirect ref>
  0x021DF3 $9DE3: -D0-I-  .byte $09 ; <indirect ref>
  0x021DF4 $9DE4: -D0-I-  .byte $EC ; <indirect ref>
  0x021DF5 $9DE5: -D0-I-  .byte $9D ; <indirect ref>
  0x021DF6 $9DE6: -D0-I-  .byte $9B ; <indirect ref>
  0x021DF7 $9DE7: -D0-I-  .byte $B2 ; <indirect ref>
  0x021DF8 $9DE8: -D0-I-  .byte $9B ; <indirect ref>
  0x021DF9 $9DE9: -D0-I-  .byte $B2 ; <indirect ref>
  0x021DFA $9DEA: -D0-I-  .byte $9B ; <indirect ref>
  0x021DFB $9DEB: -D0-I-  .byte $B2 ; <indirect ref>
  0x021DFC $9DEC: -D0-I-  .byte $F3 ; <indirect ref>
  0x021DFD $9DED: -D0-I-  .byte $48 ; <indirect ref>
  0x021DFE $9DEE: ------  .byte $4C
  0x021DFF $9DEF: ------  .byte $AE
  0x021E00 $9DF0: -D0-I-  .byte $D4 ; <indirect ref>
  0x021E01 $9DF1: -D0-I-  .byte $AE ; <indirect ref>
  0x021E02 $9DF2: -D0-I-  .byte $A2 ; <indirect ref>
  0x021E03 $9DF3: -D0-I-  .byte $B2 ; <indirect ref>
  0x021E04 $9DF4: ------  .byte $9B
  0x021E05 $9DF5: ------  .byte $B2
  0x021E06 $9DF6: -D0-I-  .byte $9B ; <indirect ref>
  0x021E07 $9DF7: -D0-I-  .byte $B2 ; <indirect ref>
  0x021E08 $9DF8: -D0-I-  .byte $F3 ; <indirect ref>
  0x021E09 $9DF9: -D0-I-  .byte $37 ; <indirect ref>
  0x021E0A $9DFA: -D0-I-  .byte $2C ; <indirect ref>
  0x021E0B $9DFB: -D0-I-  .byte $B3 ; <indirect ref>
  0x021E0C $9DFC: -D0-I-  .byte $1A ; <indirect ref>
  0x021E0D $9DFD: -D0-I-  .byte $B3 ; <indirect ref>
  0x021E0E $9DFE: -D0-I-  .byte $FA ; <indirect ref>
  0x021E0F $9DFF: -D0-I-  .byte $95 ; <indirect ref>
  0x021E10 $9E00: -D0-I-  .byte $A4 ; <indirect ref>
  0x021E11 $9E01: -D0-I-  .byte $F3 ; <indirect ref>
  0x021E12 $9E02: -D0-I-  .byte $1F ; <indirect ref>
  0x021E13 $9E03: -D0-I-  .byte $AD ; <indirect ref>
  0x021E14 $9E04: -D0-I-  .byte $B3 ; <indirect ref>
  0x021E15 $9E05: -D0-I-  .byte $AD ; <indirect ref>
  0x021E16 $9E06: -D0-I-  .byte $B3 ; <indirect ref>
  0x021E17 $9E07: -D0-I-  .byte $0B ; <indirect ref>
  0x021E18 $9E08: -D0-I-  .byte $9E ; <indirect ref>
  0x021E19 $9E09: -D0-I-  .byte $AD ; <indirect ref>
  0x021E1A $9E0A: -D0-I-  .byte $B3 ; <indirect ref>
  0x021E1B $9E0B: -D0-I-  .byte $F3 ; <indirect ref>
  0x021E1C $9E0C: -D0-I-  .byte $1C ; <indirect ref>
  0x021E1D $9E0D: -D0-I-  .byte $AD ; <indirect ref>
  0x021E1E $9E0E: -D0-I-  .byte $B3 ; <indirect ref>
  0x021E1F $9E0F: -D0-I-  .byte $AA ; <indirect ref>
  0x021E20 $9E10: -D0-I-  .byte $B3 ; <indirect ref>
  0x021E21 $9E11: -D0-I-  .byte $AF ; <indirect ref>
  0x021E22 $9E12: -D0-I-  .byte $B3 ; <indirect ref>
  0x021E23 $9E13: -D0-I-  .byte $E9 ; <indirect ref>
  0x021E24 $9E14: -D0-I-  .byte $B3 ; <indirect ref>
  0x021E25 $9E15: -D0-I-  .byte $F4 ; <indirect ref>
  0x021E26 $9E16: -D0-I-  .byte $B3 ; <indirect ref>
  0x021E27 $9E17: -D0-I-  .byte $06 ; <indirect ref>
  0x021E28 $9E18: -D0-I-  .byte $B4 ; <indirect ref>
  0x021E29 $9E19: -D0-I-  .byte $14 ; <indirect ref>
  0x021E2A $9E1A: -D0-I-  .byte $B4 ; <indirect ref>
  0x021E2B $9E1B: -D0-I-  .byte $F3 ; <indirect ref>
  0x021E2C $9E1C: -D0-I-  .byte $42 ; <indirect ref>
  0x021E2D $9E1D: -D0-I-  .byte $53 ; <indirect ref>
  0x021E2E $9E1E: -D0-I-  .byte $B4 ; <indirect ref>
  0x021E2F $9E1F: -D0-I-  .byte $58 ; <indirect ref>
  0x021E30 $9E20: -D0-I-  .byte $B4 ; <indirect ref>
  0x021E31 $9E21: ------  .byte $53
  0x021E32 $9E22: ------  .byte $B4
  0x021E33 $9E23: ------  .byte $58
  0x021E34 $9E24: ------  .byte $B4
  0x021E35 $9E25: ------  .byte $53
  0x021E36 $9E26: ------  .byte $B4
  0x021E37 $9E27: ------  .byte $58
  0x021E38 $9E28: ------  .byte $B4
  0x021E39 $9E29: ------  .byte $53
  0x021E3A $9E2A: ------  .byte $B4
  0x021E3B $9E2B: ------  .byte $58
  0x021E3C $9E2C: ------  .byte $B4
  0x021E3D $9E2D: -D0-I-  .byte $FA ; <indirect ref>
  0x021E3E $9E2E: -D0-I-  .byte $23 ; <indirect ref>
  0x021E3F $9E2F: -D0-I-  .byte $9C ; <indirect ref>
  0x021E40 $9E30: -D0-I-  .byte $F3 ; <indirect ref>
  0x021E41 $9E31: -D0-I-  .byte $8C ; <indirect ref>
  0x021E42 $9E32: -D0-I-  .byte $02 ; <indirect ref>
  0x021E43 $9E33: -D0-I-  .byte $12 ; <indirect ref>
  0x021E44 $9E34: -D0-I-  .byte $FD ; <indirect ref>
  0x021E45 $9E35: -D0-I-  .byte $00 ; <indirect ref>
  0x021E46 $9E36: -D0-I-  .byte $F9 ; <indirect ref>
  0x021E47 $9E37: -D0-I-  .byte $09 ; <indirect ref>
  0x021E48 $9E38: -D0-I-  .byte $2B ; <indirect ref>
  0x021E49 $9E39: -D0-I-  .byte $37 ; <indirect ref>
  0x021E4A $9E3A: -D0-I-  .byte $42 ; <indirect ref>
  0x021E4B $9E3B: -D0-I-  .byte $83 ; <indirect ref>
  0x021E4C $9E3C: -D0-I-  .byte $64 ; <indirect ref>
  0x021E4D $9E3D: -D0-I-  .byte $F0 ; <indirect ref>
  0x021E4E $9E3E: -D0-I-  .byte $FD ; <indirect ref>
  0x021E4F $9E3F: -D0-I-  .byte $00 ; <indirect ref>
  0x021E50 $9E40: -D0-I-  .byte $F3 ; <indirect ref>
  0x021E51 $9E41: -D0-I-  .byte $B4 ; <indirect ref>
  0x021E52 $9E42: -D0-I-  .byte $03 ; <indirect ref>
  0x021E53 $9E43: ------  .byte $02
  0x021E54 $9E44: ------  .byte $0B
  0x021E55 $9E45: -D0-I-  .byte $F3 ; <indirect ref>
  0x021E56 $9E46: -D0-I-  .byte $1E ; <indirect ref>
  0x021E57 $9E47: -D0-I-  .byte $51 ; <indirect ref>
  0x021E58 $9E48: -D0-I-  .byte $AF ; <indirect ref>
  0x021E59 $9E49: -D0-I-  .byte $59 ; <indirect ref>
  0x021E5A $9E4A: -D0-I-  .byte $AF ; <indirect ref>
  0x021E5B $9E4B: -D0-I-  .byte $90 ; <indirect ref>
  0x021E5C $9E4C: -D0-I-  .byte $AF ; <indirect ref>
  0x021E5D $9E4D: -D0-I-  .byte $AA ; <indirect ref>
  0x021E5E $9E4E: -D0-I-  .byte $AF ; <indirect ref>
  0x021E5F $9E4F: -D0-I-  .byte $F9 ; <indirect ref>
  0x021E60 $9E50: -D0-I-  .byte $15 ; <indirect ref>
  0x021E61 $9E51: -D0-I-  .byte $2B ; <indirect ref>
  0x021E62 $9E52: -D0-I-  .byte $3F ; <indirect ref>
  0x021E63 $9E53: -D0-I-  .byte $2A ; <indirect ref>
  0x021E64 $9E54: -D0-I-  .byte $19 ; <indirect ref>
  0x021E65 $9E55: -D0-I-  .byte $47 ; <indirect ref>
  0x021E66 $9E56: -D0-I-  .byte $FB ; <indirect ref>
  0x021E67 $9E57: -D0-I-  .byte $F5 ; <indirect ref>
  0x021E68 $9E58: -D0-I-  .byte $F3 ; <indirect ref>
  0x021E69 $9E59: -D0-I-  .byte $41 ; <indirect ref>
  0x021E6A $9E5A: ------  .byte $96
  0x021E6B $9E5B: ------  .byte $B7
  0x021E6C $9E5C: -D0-I-  .byte $92 ; <indirect ref>
  0x021E6D $9E5D: -D0-I-  .byte $B7 ; <indirect ref>
  0x021E6E $9E5E: -D0-I-  .byte $97 ; <indirect ref>
  0x021E6F $9E5F: -D0-I-  .byte $B7 ; <indirect ref>
  0x021E70 $9E60: -D0-I-  .byte $9C ; <indirect ref>
  0x021E71 $9E61: -D0-I-  .byte $B7 ; <indirect ref>
  0x021E72 $9E62: -D0-I-  .byte $A1 ; <indirect ref>
  0x021E73 $9E63: -D0-I-  .byte $B7 ; <indirect ref>
  0x021E74 $9E64: -D0-I-  .byte $F3 ; <indirect ref>
  0x021E75 $9E65: -D0-I-  .byte $28 ; <indirect ref>
  0x021E76 $9E66: -D0-I-  .byte $1A ; <indirect ref>
  0x021E77 $9E67: -D0-I-  .byte $B9 ; <indirect ref>
  0x021E78 $9E68: -D0-I-  .byte $13 ; <indirect ref>
  0x021E79 $9E69: -D0-I-  .byte $B9 ; <indirect ref>
  0x021E7A $9E6A: -D0-I-  .byte $1B ; <indirect ref>
  0x021E7B $9E6B: -D0-I-  .byte $B9 ; <indirect ref>
  0x021E7C $9E6C: ------  .byte $22
  0x021E7D $9E6D: ------  .byte $B9
  0x021E7E $9E6E: ------  .byte $29
  0x021E7F $9E6F: ------  .byte $B9
  0x021E80 $9E70: -D0-I-  .byte $30 ; <indirect ref>
  0x021E81 $9E71: -D0-I-  .byte $B9 ; <indirect ref>
  0x021E82 $9E72: ------  .byte $37
  0x021E83 $9E73: ------  .byte $B9
  0x021E84 $9E74: ------  .byte $3E
  0x021E85 $9E75: ------  .byte $B9
  0x021E86 $9E76: ------  .byte $45
  0x021E87 $9E77: ------  .byte $B9
  0x021E88 $9E78: -D0-I-  .byte $4C ; <indirect ref>
  0x021E89 $9E79: -D0-I-  .byte $B9 ; <indirect ref>
  0x021E8A $9E7A: -D0-I-  .byte $53 ; <indirect ref>
  0x021E8B $9E7B: -D0-I-  .byte $B9 ; <indirect ref>
  0x021E8C $9E7C: ------  .byte $5A
  0x021E8D $9E7D: ------  .byte $B9
  0x021E8E $9E7E: -D0-I-  .byte $61 ; <indirect ref>
  0x021E8F $9E7F: -D0-I-  .byte $B9 ; <indirect ref>
  0x021E90 $9E80: -D0-I-  .byte $68 ; <indirect ref>
  0x021E91 $9E81: -D0-I-  .byte $B9 ; <indirect ref>
  0x021E92 $9E82: ------  .byte $6F
  0x021E93 $9E83: ------  .byte $B9
  0x021E94 $9E84: -D0-I-  .byte $76 ; <indirect ref>
  0x021E95 $9E85: -D0-I-  .byte $B9 ; <indirect ref>
  0x021E96 $9E86: -D0-I-  .byte $7D ; <indirect ref>
  0x021E97 $9E87: -D0-I-  .byte $B9 ; <indirect ref>
  0x021E98 $9E88: -D0-I-  .byte $84 ; <indirect ref>
  0x021E99 $9E89: -D0-I-  .byte $B9 ; <indirect ref>
  0x021E9A $9E8A: -D0-I-  .byte $8B ; <indirect ref>
  0x021E9B $9E8B: -D0-I-  .byte $B9 ; <indirect ref>
  0x021E9C $9E8C: ------  .byte $92
  0x021E9D $9E8D: ------  .byte $B9
  0x021E9E $9E8E: ------  .byte $99
  0x021E9F $9E8F: ------  .byte $B9
  0x021EA0 $9E90: ------  .byte $A0
  0x021EA1 $9E91: ------  .byte $B9
  0x021EA2 $9E92: -D0-I-  .byte $A7 ; <indirect ref>
  0x021EA3 $9E93: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EA4 $9E94: -D0-I-  .byte $AE ; <indirect ref>
  0x021EA5 $9E95: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EA6 $9E96: -D0-I-  .byte $B5 ; <indirect ref>
  0x021EA7 $9E97: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EA8 $9E98: -D0-I-  .byte $BC ; <indirect ref>
  0x021EA9 $9E99: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EAA $9E9A: ------  .byte $C3
  0x021EAB $9E9B: ------  .byte $B9
  0x021EAC $9E9C: -D0-I-  .byte $CA ; <indirect ref>
  0x021EAD $9E9D: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EAE $9E9E: -D0-I-  .byte $D1 ; <indirect ref>
  0x021EAF $9E9F: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EB0 $9EA0: -D0-I-  .byte $D8 ; <indirect ref>
  0x021EB1 $9EA1: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EB2 $9EA2: -D0-I-  .byte $DF ; <indirect ref>
  0x021EB3 $9EA3: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EB4 $9EA4: -D0-I-  .byte $E6 ; <indirect ref>
  0x021EB5 $9EA5: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EB6 $9EA6: -D0-I-  .byte $ED ; <indirect ref>
  0x021EB7 $9EA7: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EB8 $9EA8: -D0-I-  .byte $F4 ; <indirect ref>
  0x021EB9 $9EA9: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EBA $9EAA: -D0-I-  .byte $F3 ; <indirect ref>
  0x021EBB $9EAB: -D0-I-  .byte $29 ; <indirect ref>
  0x021EBC $9EAC: -D0-I-  .byte $1A ; <indirect ref>
  0x021EBD $9EAD: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EBE $9EAE: -D0-I-  .byte $13 ; <indirect ref>
  0x021EBF $9EAF: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EC0 $9EB0: -D0-I-  .byte $1B ; <indirect ref>
  0x021EC1 $9EB1: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EC2 $9EB2: ------  .byte $22
  0x021EC3 $9EB3: ------  .byte $B9
  0x021EC4 $9EB4: ------  .byte $29
  0x021EC5 $9EB5: ------  .byte $B9
  0x021EC6 $9EB6: -D0-I-  .byte $30 ; <indirect ref>
  0x021EC7 $9EB7: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EC8 $9EB8: -D0-I-  .byte $37 ; <indirect ref>
  0x021EC9 $9EB9: -D0-I-  .byte $B9 ; <indirect ref>
  0x021ECA $9EBA: -D0-I-  .byte $3E ; <indirect ref>
  0x021ECB $9EBB: -D0-I-  .byte $B9 ; <indirect ref>
  0x021ECC $9EBC: -D0-I-  .byte $45 ; <indirect ref>
  0x021ECD $9EBD: -D0-I-  .byte $B9 ; <indirect ref>
  0x021ECE $9EBE: ------  .byte $4C
  0x021ECF $9EBF: ------  .byte $B9
  0x021ED0 $9EC0: -D0-I-  .byte $53 ; <indirect ref>
  0x021ED1 $9EC1: -D0-I-  .byte $B9 ; <indirect ref>
  0x021ED2 $9EC2: ------  .byte $5A
  0x021ED3 $9EC3: ------  .byte $B9
  0x021ED4 $9EC4: -D0-I-  .byte $61 ; <indirect ref>
  0x021ED5 $9EC5: -D0-I-  .byte $B9 ; <indirect ref>
  0x021ED6 $9EC6: -D0-I-  .byte $68 ; <indirect ref>
  0x021ED7 $9EC7: -D0-I-  .byte $B9 ; <indirect ref>
  0x021ED8 $9EC8: -D0-I-  .byte $6F ; <indirect ref>
  0x021ED9 $9EC9: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EDA $9ECA: -D0-I-  .byte $76 ; <indirect ref>
  0x021EDB $9ECB: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EDC $9ECC: -D0-I-  .byte $7D ; <indirect ref>
  0x021EDD $9ECD: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EDE $9ECE: -D0-I-  .byte $84 ; <indirect ref>
  0x021EDF $9ECF: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EE0 $9ED0: -D0-I-  .byte $8B ; <indirect ref>
  0x021EE1 $9ED1: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EE2 $9ED2: ------  .byte $92
  0x021EE3 $9ED3: ------  .byte $B9
  0x021EE4 $9ED4: ------  .byte $99
  0x021EE5 $9ED5: ------  .byte $B9
  0x021EE6 $9ED6: -D0-I-  .byte $A0 ; <indirect ref>
  0x021EE7 $9ED7: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EE8 $9ED8: -D0-I-  .byte $A7 ; <indirect ref>
  0x021EE9 $9ED9: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EEA $9EDA: -D0-I-  .byte $AE ; <indirect ref>
  0x021EEB $9EDB: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EEC $9EDC: -D0-I-  .byte $B5 ; <indirect ref>
  0x021EED $9EDD: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EEE $9EDE: -D0-I-  .byte $BC ; <indirect ref>
  0x021EEF $9EDF: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EF0 $9EE0: ------  .byte $C3
  0x021EF1 $9EE1: ------  .byte $B9
  0x021EF2 $9EE2: -D0-I-  .byte $CA ; <indirect ref>
  0x021EF3 $9EE3: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EF4 $9EE4: -D0-I-  .byte $D1 ; <indirect ref>
  0x021EF5 $9EE5: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EF6 $9EE6: -D0-I-  .byte $D8 ; <indirect ref>
  0x021EF7 $9EE7: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EF8 $9EE8: -D0-I-  .byte $DF ; <indirect ref>
  0x021EF9 $9EE9: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EFA $9EEA: -D0-I-  .byte $E6 ; <indirect ref>
  0x021EFB $9EEB: -D0-I-  .byte $B9 ; <indirect ref>
  0x021EFC $9EEC: ------  .byte $ED
  0x021EFD $9EED: ------  .byte $B9
  0x021EFE $9EEE: -D0-I-  .byte $F4 ; <indirect ref>
  0x021EFF $9EEF: -D0-I-  .byte $B9 ; <indirect ref>
  0x021F00 $9EF0: -D0-I-  .byte $FF ; <indirect ref>
  0x021F01 $9EF1: -D0-I-  .byte $03 ; <indirect ref>
  0x021F02 $9EF2: -D0-I-  .byte $11 ; <indirect ref>
  0x021F03 $9EF3: -D0-I-  .byte $BA ; <indirect ref>
  0x021F04 $9EF4: -D0-I-  .byte $FB ; <indirect ref>
  0x021F05 $9EF5: -D0-I-  .byte $B9 ; <indirect ref>
  0x021F06 $9EF6: -D0-I-  .byte $F3 ; <indirect ref>
  0x021F07 $9EF7: -D0-I-  .byte $1D ; <indirect ref>
  0x021F08 $9EF8: -D0-I-  .byte $E7 ; <indirect ref>
  0x021F09 $9EF9: -D0-I-  .byte $B4 ; <indirect ref>
  0x021F0A $9EFA: -D0-I-  .byte $EF ; <indirect ref>
  0x021F0B $9EFB: -D0-I-  .byte $B4 ; <indirect ref>
  0x021F0C $9EFC: -D0-I-  .byte $F7 ; <indirect ref>
  0x021F0D $9EFD: -D0-I-  .byte $B4 ; <indirect ref>
  0x021F0E $9EFE: -D0-I-  .byte $FB ; <indirect ref>
  0x021F0F $9EFF: -D0-I-  .byte $B4 ; <indirect ref>
  0x021F10 $9F00: -D0-I-  .byte $09 ; <indirect ref>
  0x021F11 $9F01: -D0-I-  .byte $B5 ; <indirect ref>
  0x021F12 $9F02: -D0-I-  .byte $25 ; <indirect ref>
  0x021F13 $9F03: -D0-I-  .byte $B5 ; <indirect ref>
  0x021F14 $9F04: -D0-I-  .byte $32 ; <indirect ref>
  0x021F15 $9F05: -D0-I-  .byte $B5 ; <indirect ref>
  0x021F16 $9F06: -D0-I-  .byte $3F ; <indirect ref>
  0x021F17 $9F07: -D0-I-  .byte $B5 ; <indirect ref>
  0x021F18 $9F08: -D0-I-  .byte $F7 ; <indirect ref>
  0x021F19 $9F09: -D0-I-  .byte $B4 ; <indirect ref>
  0x021F1A $9F0A: -D0-I-  .byte $53 ; <indirect ref>
  0x021F1B $9F0B: -D0-I-  .byte $B5 ; <indirect ref>
  0x021F1C $9F0C: -D0-I-  .byte $5A ; <indirect ref>
  0x021F1D $9F0D: -D0-I-  .byte $B5 ; <indirect ref>
  0x021F1E $9F0E: -D0-I-  .byte $67 ; <indirect ref>
  0x021F1F $9F0F: -D0-I-  .byte $B5 ; <indirect ref>
  0x021F20 $9F10: -D0-I-  .byte $75 ; <indirect ref>
  0x021F21 $9F11: -D0-I-  .byte $B5 ; <indirect ref>
  0x021F22 $9F12: -D0-I-  .byte $83 ; <indirect ref>
  0x021F23 $9F13: -D0-I-  .byte $B5 ; <indirect ref>
  0x021F24 $9F14: -D0-I-  .byte $99 ; <indirect ref>
  0x021F25 $9F15: -D0-I-  .byte $B5 ; <indirect ref>
  0x021F26 $9F16: -D0-I-  .byte $9D ; <indirect ref>
  0x021F27 $9F17: -D0-I-  .byte $B5 ; <indirect ref>
  0x021F28 $9F18: -D0-I-  .byte $A4 ; <indirect ref>
  0x021F29 $9F19: -D0-I-  .byte $B5 ; <indirect ref>
  0x021F2A $9F1A: -D0-I-  .byte $BA ; <indirect ref>
  0x021F2B $9F1B: -D0-I-  .byte $B5 ; <indirect ref>
  0x021F2C $9F1C: -D0-I-  .byte $D0 ; <indirect ref>
  0x021F2D $9F1D: -D0-I-  .byte $B5 ; <indirect ref>
  0x021F2E $9F1E: -D0-I-  .byte $E4 ; <indirect ref>
  0x021F2F $9F1F: -D0-I-  .byte $B5 ; <indirect ref>
  0x021F30 $9F20: -D0-I-  .byte $EC ; <indirect ref>
  0x021F31 $9F21: -D0-I-  .byte $B5 ; <indirect ref>
  0x021F32 $9F22: -D0-I-  .byte $F7 ; <indirect ref>
  0x021F33 $9F23: -D0-I-  .byte $B5 ; <indirect ref>
  0x021F34 $9F24: -D0-I-  .byte $0B ; <indirect ref>
  0x021F35 $9F25: -D0-I-  .byte $B6 ; <indirect ref>
  0x021F36 $9F26: -D0-I-  .byte $1D ; <indirect ref>
  0x021F37 $9F27: -D0-I-  .byte $B6 ; <indirect ref>
  0x021F38 $9F28: -D0-I-  .byte $75 ; <indirect ref>
  0x021F39 $9F29: -D0-I-  .byte $B6 ; <indirect ref>
  0x021F3A $9F2A: -D0-I-  .byte $85 ; <indirect ref>
  0x021F3B $9F2B: -D0-I-  .byte $B6 ; <indirect ref>
  0x021F3C $9F2C: -D0-I-  .byte $90 ; <indirect ref>
  0x021F3D $9F2D: -D0-I-  .byte $B6 ; <indirect ref>
  0x021F3E $9F2E: -D0-I-  .byte $C0 ; <indirect ref>
  0x021F3F $9F2F: -D0-I-  .byte $B6 ; <indirect ref>
  0x021F40 $9F30: -D0-I-  .byte $D6 ; <indirect ref>
  0x021F41 $9F31: -D0-I-  .byte $B6 ; <indirect ref>
  0x021F42 $9F32: -D0-I-  .byte $DE ; <indirect ref>
  0x021F43 $9F33: -D0-I-  .byte $B6 ; <indirect ref>
  0x021F44 $9F34: -D0-I-  .byte $E6 ; <indirect ref>
  0x021F45 $9F35: -D0-I-  .byte $B6 ; <indirect ref>
  0x021F46 $9F36: -D0-I-  .byte $F0 ; <indirect ref>
  0x021F47 $9F37: -D0-I-  .byte $B6 ; <indirect ref>
  0x021F48 $9F38: -D0-I-  .byte $01 ; <indirect ref>
  0x021F49 $9F39: -D0-I-  .byte $B7 ; <indirect ref>
  0x021F4A $9F3A: -D0-I-  .byte $12 ; <indirect ref>
  0x021F4B $9F3B: -D0-I-  .byte $B7 ; <indirect ref>
  0x021F4C $9F3C: -D0-I-  .byte $24 ; <indirect ref>
  0x021F4D $9F3D: -D0-I-  .byte $B7 ; <indirect ref>
  0x021F4E $9F3E: -D0-I-  .byte $F3 ; <indirect ref>
  0x021F4F $9F3F: -D0-I-  .byte $10 ; <indirect ref>
  0x021F50 $9F40: -D0-I-  .byte $4A ; <indirect ref>
  0x021F51 $9F41: -D0-I-  .byte $9F ; <indirect ref>
  0x021F52 $9F42: -D0-I-  .byte $4B ; <indirect ref>
  0x021F53 $9F43: -D0-I-  .byte $BB ; <indirect ref>
  0x021F54 $9F44: -D0-I-  .byte $4B ; <indirect ref>
  0x021F55 $9F45: -D0-I-  .byte $BB ; <indirect ref>
  0x021F56 $9F46: ------  .byte $4B
  0x021F57 $9F47: ------  .byte $BB
  0x021F58 $9F48: ------  .byte $4B
  0x021F59 $9F49: ------  .byte $BB
  0x021F5A $9F4A: -D0-I-  .byte $F3 ; <indirect ref>
  0x021F5B $9F4B: -D0-I-  .byte $1E ; <indirect ref>
  0x021F5C $9F4C: -D0-I-  .byte $4B ; <indirect ref>
  0x021F5D $9F4D: -D0-I-  .byte $BB ; <indirect ref>
  0x021F5E $9F4E: -D0-I-  .byte $02 ; <indirect ref>
  0x021F5F $9F4F: -D0-I-  .byte $B5 ; <indirect ref>
  0x021F60 $9F50: -D0-I-  .byte $4F ; <indirect ref>
  0x021F61 $9F51: -D0-I-  .byte $B5 ; <indirect ref>
  0x021F62 $9F52: -D0-I-  .byte $50 ; <indirect ref>
  0x021F63 $9F53: -D0-I-  .byte $BB ; <indirect ref>
  0x021F64 $9F54: -D0-I-  .byte $FD ; <indirect ref>
  0x021F65 $9F55: -D0-I-  .byte $03 ; <indirect ref>
  0x021F66 $9F56: -D0-I-  .byte $F3 ; <indirect ref>
  0x021F67 $9F57: -D0-I-  .byte $04 ; <indirect ref>
  0x021F68 $9F58: -D0-I-  .byte $24 ; <indirect ref>
  0x021F69 $9F59: -D0-I-  .byte $BA ; <indirect ref>
  0x021F6A $9F5A: -D0-I-  .byte $1C ; <indirect ref>
  0x021F6B $9F5B: -D0-I-  .byte $BA ; <indirect ref>
  0x021F6C $9F5C: -D0-I-  .byte $F3 ; <indirect ref>
  0x021F6D $9F5D: -D0-I-  .byte $42 ; <indirect ref>
  0x021F6E $9F5E: -D0-I-  .byte $5B ; <indirect ref>
  0x021F6F $9F5F: -D0-I-  .byte $A0 ; <indirect ref>
  0x021F70 $9F60: -D0-I-  .byte $60 ; <indirect ref>
  0x021F71 $9F61: -D0-I-  .byte $A0 ; <indirect ref>
  0x021F72 $9F62: -D0-I-  .byte $F3 ; <indirect ref>
  0x021F73 $9F63: -D0-I-  .byte $42 ; <indirect ref>
  0x021F74 $9F64: -D0-I-  .byte $65 ; <indirect ref>
  0x021F75 $9F65: -D0-I-  .byte $A0 ; <indirect ref>
  0x021F76 $9F66: -D0-I-  .byte $6A ; <indirect ref>
  0x021F77 $9F67: -D0-I-  .byte $A0 ; <indirect ref>
  0x021F78 $9F68: -D0-I-  .byte $F3 ; <indirect ref>
  0x021F79 $9F69: -D0-I-  .byte $42 ; <indirect ref>
  0x021F7A $9F6A: -D0-I-  .byte $1A ; <indirect ref>
  0x021F7B $9F6B: -D0-I-  .byte $A2 ; <indirect ref>
  0x021F7C $9F6C: -D0-I-  .byte $1F ; <indirect ref>
  0x021F7D $9F6D: -D0-I-  .byte $A2 ; <indirect ref>
  0x021F7E $9F6E: -D0-I-  .byte $F3 ; <indirect ref>
  0x021F7F $9F6F: -D0-I-  .byte $42 ; <indirect ref>
  0x021F80 $9F70: -D0-I-  .byte $24 ; <indirect ref>
  0x021F81 $9F71: -D0-I-  .byte $A2 ; <indirect ref>
  0x021F82 $9F72: -D0-I-  .byte $29 ; <indirect ref>
  0x021F83 $9F73: -D0-I-  .byte $A2 ; <indirect ref>
  0x021F84 $9F74: -D0-I-  .byte $F3 ; <indirect ref>
  0x021F85 $9F75: -D0-I-  .byte $42 ; <indirect ref>
  0x021F86 $9F76: -D0-I-  .byte $33 ; <indirect ref>
  0x021F87 $9F77: -D0-I-  .byte $B4 ; <indirect ref>
  0x021F88 $9F78: -D0-I-  .byte $38 ; <indirect ref>
  0x021F89 $9F79: -D0-I-  .byte $B4 ; <indirect ref>
  0x021F8A $9F7A: -D0-I-  .byte $F3 ; <indirect ref>
  0x021F8B $9F7B: -D0-I-  .byte $33 ; <indirect ref>
  0x021F8C $9F7C: -D0-I-  .byte $13 ; <indirect ref>
  0x021F8D $9F7D: -D0-I-  .byte $A7 ; <indirect ref>
  0x021F8E $9F7E: ------  .byte $F6
  0x021F8F $9F7F: ------  .byte $A6
  0x021F90 $9F80: ------  .byte $06
  0x021F91 $9F81: ------  .byte $A7
  0x021F92 $9F82: ------  .byte $13
  0x021F93 $9F83: ------  .byte $A7
  0x021F94 $9F84: ------  .byte $13
  0x021F95 $9F85: ------  .byte $A7
  0x021F96 $9F86: -D0-I-  .byte $89 ; <indirect ref>
  0x021F97 $9F87: -D0-I-  .byte $A7 ; <indirect ref>
  0x021F98 $9F88: ------  .byte $9C
  0x021F99 $9F89: ------  .byte $A7
  0x021F9A $9F8A: ------  .byte $92
  0x021F9B $9F8B: ------  .byte $A7
  0x021F9C $9F8C: ------  .byte $92
  0x021F9D $9F8D: ------  .byte $A7
  0x021F9E $9F8E: ------  .byte $92
  0x021F9F $9F8F: ------  .byte $A7
  0x021FA0 $9F90: ------  .byte $92
  0x021FA1 $9F91: ------  .byte $A7
  0x021FA2 $9F92: ------  .byte $92
  0x021FA3 $9F93: ------  .byte $A7
  0x021FA4 $9F94: ------  .byte $13
  0x021FA5 $9F95: ------  .byte $A7
  0x021FA6 $9F96: ------  .byte $13
  0x021FA7 $9F97: ------  .byte $A7
  0x021FA8 $9F98: -D0-I-  .byte $A5 ; <indirect ref>
  0x021FA9 $9F99: -D0-I-  .byte $A7 ; <indirect ref>
  0x021FAA $9F9A: ------  .byte $BF
  0x021FAB $9F9B: ------  .byte $A7
  0x021FAC $9F9C: -D0-I-  .byte $F3 ; <indirect ref>
  0x021FAD $9F9D: -D0-I-  .byte $AF ; <indirect ref>
  0x021FAE $9F9E: -D0-I-  .byte $15 ; <indirect ref>
  0x021FAF $9F9F: -D0-I-  .byte $02 ; <indirect ref>
  0x021FB0 $9FA0: -D0-I-  .byte $09 ; <indirect ref>
  0x021FB1 $9FA1: -D0-I-  .byte $F5 ; <indirect ref>
  0x021FB2 $9FA2: -D0-I-  .byte $78 ; <indirect ref>
  0x021FB3 $9FA3: -D0-I-  .byte $33 ; <indirect ref>
  0x021FB4 $9FA4: -D0-I-  .byte $94 ; <indirect ref>
  0x021FB5 $9FA5: -D0-I-  .byte $A0 ; <indirect ref>
  0x021FB6 $9FA6: -D0-I-  .byte $F2 ; <indirect ref>
  0x021FB7 $9FA7: -D0-I-  .byte $23 ; <indirect ref>
  0x021FB8 $9FA8: -D0-I-  .byte $9C ; <indirect ref>
  0x021FB9 $9FA9: -D0-I-  .byte $F9 ; <indirect ref>
  0x021FBA $9FAA: -D0-I-  .byte $02 ; <indirect ref>
  0x021FBB $9FAB: -D0-I-  .byte $20 ; <indirect ref>
  0x021FBC $9FAC: -D0-I-  .byte $78 ; <indirect ref>
  0x021FBD $9FAD: -D0-I-  .byte $48 ; <indirect ref>
  0x021FBE $9FAE: -D0-I-  .byte $75 ; <indirect ref>
  0x021FBF $9FAF: -D0-I-  .byte $A1 ; <indirect ref>
  0x021FC0 $9FB0: -D0-I-  .byte $F2 ; <indirect ref>
  0x021FC1 $9FB1: -D0-I-  .byte $23 ; <indirect ref>
  0x021FC2 $9FB2: -D0-I-  .byte $9C ; <indirect ref>
  0x021FC3 $9FB3: -D0-I-  .byte $FB ; <indirect ref>
  0x021FC4 $9FB4: ------  .byte $FB
  0x021FC5 $9FB5: -D0-I-  .byte $32 ; <indirect ref>
  0x021FC6 $9FB6: -D0-I-  .byte $1B ; <indirect ref>
  0x021FC7 $9FB7: -D0-I-  .byte $02 ; <indirect ref>
  0x021FC8 $9FB8: -D0-I-  .byte $01 ; <indirect ref>
  0x021FC9 $9FB9: -D0-I-  .byte $FB ; <indirect ref>
  0x021FCA $9FBA: -D0-I-  .byte $78 ; <indirect ref>
  0x021FCB $9FBB: -D0-I-  .byte $F0 ; <indirect ref>
  0x021FCC $9FBC: -D0-I-  .byte $F0 ; <indirect ref>
  0x021FCD $9FBD: -D0-I-  .byte $25 ; <indirect ref>
  0x021FCE $9FBE: -D0-I-  .byte $FB ; <indirect ref>
  0x021FCF $9FBF: -D0-I-  .byte $FA ; <indirect ref>
  0x021FD0 $9FC0: -D0-I-  .byte $C7 ; <indirect ref>
  0x021FD1 $9FC1: -D0-I-  .byte $9F ; <indirect ref>
  0x021FD2 $9FC2: -D0-I-  .byte $5A ; <indirect ref>
  0x021FD3 $9FC3: -D0-I-  .byte $58 ; <indirect ref>
  0x021FD4 $9FC4: -D0-I-  .byte $03 ; <indirect ref>
  0x021FD5 $9FC5: -D0-I-  .byte $E3 ; <indirect ref>
  0x021FD6 $9FC6: -D0-I-  .byte $FB ; <indirect ref>
  0x021FD7 $9FC7: -D0-I-  .byte $F6 ; <indirect ref>
  0x021FD8 $9FC8: -D0-I-  .byte $FC ; <indirect ref>
  0x021FD9 $9FC9: -D0-I-  .byte $04 ; <indirect ref>
  0x021FDA $9FCA: -D0-I-  .byte $F9 ; <indirect ref>
  0x021FDB $9FCB: -D0-I-  .byte $02 ; <indirect ref>
  0x021FDC $9FCC: -D0-I-  .byte $2A ; <indirect ref>
  0x021FDD $9FCD: -D0-I-  .byte $FB ; <indirect ref>
  0x021FDE $9FCE: -D0-I-  .byte $FA ; <indirect ref>
  0x021FDF $9FCF: -D0-I-  .byte $C7 ; <indirect ref>
  0x021FE0 $9FD0: -D0-I-  .byte $9F ; <indirect ref>
  0x021FE1 $9FD1: -D0-I-  .byte $5A ; <indirect ref>
  0x021FE2 $9FD2: -D0-I-  .byte $58 ; <indirect ref>
  0x021FE3 $9FD3: -D0-I-  .byte $03 ; <indirect ref>
  0x021FE4 $9FD4: -D0-I-  .byte $0B ; <indirect ref>
  0x021FE5 $9FD5: -D0-I-  .byte $FB ; <indirect ref>
  0x021FE6 $9FD6: -D0-I-  .byte $F5 ; <indirect ref>
  0x021FE7 $9FD7: -D0-I-  .byte $FC ; <indirect ref>
  0x021FE8 $9FD8: -D0-I-  .byte $04 ; <indirect ref>
  0x021FE9 $9FD9: -D0-I-  .byte $32 ; <indirect ref>
  0x021FEA $9FDA: -D0-I-  .byte $58 ; <indirect ref>
  0x021FEB $9FDB: -D0-I-  .byte $04 ; <indirect ref>
  0x021FEC $9FDC: -D0-I-  .byte $06 ; <indirect ref>
  0x021FED $9FDD: -D0-I-  .byte $FB ; <indirect ref>
  0x021FEE $9FDE: -D0-I-  .byte $FC ; <indirect ref>
  0x021FEF $9FDF: -D0-I-  .byte $02 ; <indirect ref>
  0x021FF0 $9FE0: -D0-I-  .byte $2D ; <indirect ref>
  0x021FF1 $9FE1: -D0-I-  .byte $F0 ; <indirect ref>
  0x021FF2 $9FE2: -D0-I-  .byte $05 ; <indirect ref>
  0x021FF3 $9FE3: -D0-I-  .byte $F0 ; <indirect ref>
  0x021FF4 $9FE4: -D0-I-  .byte $FB ; <indirect ref>
  0x021FF5 $9FE5: -D0-I-  .byte $3C ; <indirect ref>
  0x021FF6 $9FE6: -D0-I-  .byte $6C ; <indirect ref>
  0x021FF7 $9FE7: -D0-I-  .byte $06 ; <indirect ref>
  0x021FF8 $9FE8: -D0-I-  .byte $07 ; <indirect ref>
  0x021FF9 $9FE9: -D0-I-  .byte $FB ; <indirect ref>
  0x021FFA $9FEA: -D0-I-  .byte $FC ; <indirect ref>
  0x021FFB $9FEB: -D0-I-  .byte $02 ; <indirect ref>
  0x021FFC $9FEC: -D0-I-  .byte $3C ; <indirect ref>
  0x021FFD $9FED: -D0-I-  .byte $57 ; <indirect ref>
  0x021FFE $9FEE: -D0-I-  .byte $07 ; <indirect ref>
  0x021FFF $9FEF: -D0-I-  .byte $07 ; <indirect ref>
  0x022000 $9FF0: -D0-I-  .byte $FB ; <indirect ref>
  0x022001 $9FF1: -D0-I-  .byte $F8 ; <indirect ref>
  0x022002 $9FF2: -D0-I-  .byte $02 ; <indirect ref>
  0x022003 $9FF3: -D0-I-  .byte $F9 ; <indirect ref>
  0x022004 $9FF4: -D0-I-  .byte $02 ; <indirect ref>
  0x022005 $9FF5: -D0-I-  .byte $2A ; <indirect ref>
  0x022006 $9FF6: -D0-I-  .byte $14 ; <indirect ref>
  0x022007 $9FF7: -D0-I-  .byte $F0 ; <indirect ref>
  0x022008 $9FF8: -D0-I-  .byte $08 ; <indirect ref>
  0x022009 $9FF9: -D0-I-  .byte $F0 ; <indirect ref>
  0x02200A $9FFA: -D0-I-  .byte $FE ; <indirect ref>
  0x02200B $9FFB: -D0-I-  .byte $01 ; <indirect ref>
  0x02200C $9FFC: -D0-I-  .byte $FB ; <indirect ref>
  0x02200D $9FFD: -D0-I-  .byte $FC ; <indirect ref>
  0x02200E $9FFE: -D0-I-  .byte $02 ; <indirect ref>
  0x02200F $9FFF: -D0-I-  .byte $1E ; <indirect ref>