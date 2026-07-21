; ===== MMC3 Bank 36 =====
; ROM: 0x048010-0x04A00F
; CPU: $8000-$9FFF
; CDL: code=7842 data=0 unaccessed=350

  0x048010 $8000: ------  .byte $00
  0x048011 $8001: ------  .byte $00
  0x048012 $8002: ------  .byte $00
  0x048013 $8003: ------  .byte $00
  0x048014 $8004: ------  .byte $00
  0x048015 $8005: ------  .byte $00
  0x048016 $8006: ------  .byte $00
  0x048017 $8007: ------  .byte $00
  0x048018 $8008: ------  .byte $00
  0x048019 $8009: ------  .byte $00
  0x04801A $800A: ------  .byte $00
  0x04801B $800B: ------  .byte $00
  0x04801C $800C: ------  .byte $00
  0x04801D $800D: ------  .byte $00
  0x04801E $800E: ------  .byte $00
  0x04801F $800F: ------  .byte $00
  0x048020 $8010: ------  .byte $FF
  0x048021 $8011: ------  .byte $FF
  0x048022 $8012: ------  .byte $FF
  0x048023 $8013: ------  .byte $FF
  0x048024 $8014: ------  .byte $FF
  0x048025 $8015: ------  .byte $FF
  0x048026 $8016: ------  .byte $FF
  0x048027 $8017: ------  .byte $FF
  0x048028 $8018: ------  .byte $00
  0x048029 $8019: ------  .byte $00
  0x04802A $801A: ------  .byte $00
  0x04802B $801B: ------  .byte $00
  0x04802C $801C: ------  .byte $00
  0x04802D $801D: ------  .byte $00
  0x04802E $801E: ------  .byte $00
  0x04802F $801F: ------  .byte $00
  0x048030 $8020: C-----  E0 F8    CPX  #$F8
  0x048032 $8022: C-----  FE 7F 3F INC  $3F7F,X
  0x048035 $8025: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048036 $8026: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048037 $8027: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048038 $8028: C-----  00       BRK  
  0x048039 $8029: C-----  60       RTS  
  0x04803A $802A: C-----  78       SEI  
  0x04803B $802B: C-----  2E 07 07 ROL  $0707
  0x04803E $802E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04803F $802F: C-----  00       BRK  
  0x048040 $8030: C-----  00       BRK  
  0x048041 $8031: C-----  00       BRK  
  0x048042 $8032: C-----  00       BRK  
  0x048043 $8033: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048044 $8034: C-----  E0 90    CPX  #$90
  0x048046 $8036: C-----  8C 03 00 STY  $0003
  0x048049 $8039: C-----  00       BRK  
  0x04804A $803A: C-----  00       BRK  
  0x04804B $803B: C-----  00       BRK  
  0x04804C $803C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04804D $803D: C-----  60       RTS  
  0x04804E $803E: C-----  70 FC    BVS  $803C
  0x048050 $8040: C-----  00       BRK  
  0x048051 $8041: C-----  00       BRK  
  0x048052 $8042: C-----  00       BRK  
  0x048053 $8043: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048054 $8044: C-----  E0 F0    CPX  #$F0
  0x048056 $8046: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048057 $8047: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x048058 $8048: C-----  00       BRK  
  0x048059 $8049: C-----  00       BRK  
  0x04805A $804A: C-----  00       BRK  
  0x04805B $804B: C-----  00       BRK  
  0x04805C $804C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04805D $804D: C-----  E0 F0    CPX  #$F0
  0x04805F $804F: C-----  EC 00 04 CPX  $0400
  0x048062 $8052: C-----  06 0D    ASL  $0D
  0x048064 $8054: C-----  08       PHP  
  0x048065 $8055: C-----  18       CLC  
  0x048066 $8056: C-----  10 10    BPL  $8068
  0x048068 $8058: C-----  00       BRK  
  0x048069 $8059: C-----  00       BRK  
  0x04806A $805A: C-----  00       BRK  
  0x04806B $805B: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04806C $805C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04806D $805D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04806E $805E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04806F $805F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048070 $8060: C-----  E0 63    CPX  #$63
  0x048072 $8062: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x048073 $8063: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x048074 $8064: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x048075 $8065: C-----  10 10    BPL  $8077
  0x048077 $8067: C-----  08       PHP  
  0x048078 $8068: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x048079 $8069: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04807A $806A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04807B $806B: C-----  18       CLC  
  0x04807C $806C: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04807D $806D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04807E $806E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04807F $806F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048080 $8070: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048081 $8071: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048082 $8072: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x048083 $8073: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x048084 $8074: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x048085 $8075: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x048086 $8076: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x048087 $8077: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048088 $8078: C-----  00       BRK  
  0x048089 $8079: C-----  F8       SED  
  0x04808A $807A: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04808B $807B: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04808C $807C: C-----  70 ED    BVS  $806B
  0x04808E $807E: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04808F $807F: C-----  F6 80    INC  $80,X
  0x048091 $8081: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x048092 $8082: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x048093 $8083: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x048094 $8084: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x048095 $8085: C-----  10 10    BPL  $8097
  0x048097 $8087: C-----  08       PHP  
  0x048098 $8088: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x048099 $8089: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04809A $808A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04809B $808B: C-----  18       CLC  
  0x04809C $808C: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04809D $808D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04809E $808E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04809F $808F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0480A0 $8090: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0480A1 $8091: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0480A2 $8092: C-----  C0 C1    CPY  #$C1
  0x0480A4 $8094: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0480A5 $8095: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0480A6 $8096: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0480A7 $8097: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0480A8 $8098: C-----  00       BRK  
  0x0480A9 $8099: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0480AA $809A: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0480AB $809B: C-----  BE 70 ED LDX  $ED70,Y
  0x0480AE $809E: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0480AF $809F: C-----  F6 08    INC  $08,X
  0x0480B1 $80A1: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0480B2 $80A2: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0480B3 $80A3: C-----  10 2C    BPL  $80D1
  0x0480B5 $80A5: C-----  3E 3F 3F ROL  $3F3F,X
  0x0480B8 $80A8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0480B9 $80A9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0480BA $80AA: C-----  00       BRK  
  0x0480BB $80AB: C-----  00       BRK  
  0x0480BC $80AC: C-----  00       BRK  
  0x0480BD $80AD: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0480BE $80AE: C-----  1E 1E 1E ASL  $1E1E,X
  0x0480C1 $80B1: C-----  18       CLC  
  0x0480C2 $80B2: C-----  E8       INX  
  0x0480C3 $80B3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0480C4 $80B4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0480C5 $80B5: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0480C6 $80B6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0480C7 $80B7: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0480C8 $80B8: C-----  E0 E0    CPX  #$E0
  0x0480CA $80BA: C-----  00       BRK  
  0x0480CB $80BB: C-----  00       BRK  
  0x0480CC $80BC: C-----  00       BRK  
  0x0480CD $80BD: C-----  00       BRK  
  0x0480CE $80BE: C-----  08       PHP  
  0x0480CF $80BF: C-----  78       SEI  
  0x0480D0 $80C0: C-----  00       BRK  
  0x0480D1 $80C1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0480D2 $80C2: C-----  E0 F0    CPX  #$F0
  0x0480D4 $80C4: C-----  F8       SED  
  0x0480D5 $80C5: C-----  F8       SED  
  0x0480D6 $80C6: C-----  F0 E0    BEQ  $80A8
  0x0480D8 $80C8: C-----  00       BRK  
  0x0480D9 $80C9: C-----  00       BRK  
  0x0480DA $80CA: C-----  00       BRK  
  0x0480DB $80CB: C-----  E0 70    CPX  #$70
  0x0480DD $80CD: C-----  F0 E0    BEQ  $80AF
  0x0480DF $80CF: C-----  00       BRK  
  0x0480E0 $80D0: C-----  19 0B 0F ORA  $0F0B,Y
  0x0480E3 $80D3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0480E4 $80D4: C-----  01 00    ORA  ($00,X)
  0x0480E6 $80D6: C-----  00       BRK  
  0x0480E7 $80D7: C-----  00       BRK  
  0x0480E8 $80D8: C-----  06 05    ASL  $05
  0x0480EA $80DA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0480EB $80DB: C-----  01 00    ORA  ($00,X)
  0x0480ED $80DD: C-----  00       BRK  
  0x0480EE $80DE: C-----  00       BRK  
  0x0480EF $80DF: C-----  00       BRK  
  0x0480F0 $80E0: C-----  08       PHP  
  0x0480F1 $80E1: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0480F2 $80E2: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0480F3 $80E3: C-----  10 2C    BPL  $8111
  0x0480F5 $80E5: C-----  3E 3F 3F ROL  $3F3F,X
  0x0480F8 $80E8: C-----  00       BRK  
  0x0480F9 $80E9: C-----  00       BRK  
  0x0480FA $80EA: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0480FB $80EB: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0480FC $80EC: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0480FD $80ED: C-----  0D 1E 1E ORA  $1E1E
  0x048100 $80F0: C-----  1E 18 E8 ASL  $E818,X
  0x048103 $80F3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048104 $80F4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048105 $80F5: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x048106 $80F6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048107 $80F7: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048108 $80F8: C-----  00       BRK  
  0x048109 $80F9: C-----  00       BRK  
  0x04810A $80FA: C-----  10 F8    BPL  $80F4
  0x04810C $80FC: C-----  F8       SED  
  0x04810D $80FD: C-----  F0 08    BEQ  $8107
  0x04810F $80FF: C-----  78       SEI  
  0x048110 $8100: C-----  00       BRK  
  0x048111 $8101: C-----  00       BRK  
  0x048112 $8102: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048113 $8103: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048114 $8104: C-----  60       RTS  
  0x048115 $8105: C-----  30 10    BMI  $8117
  0x048117 $8107: C-----  10 00    BPL  $8109
  0x048119 $8109: C-----  00       BRK  
  0x04811A $810A: C-----  00       BRK  
  0x04811B $810B: C-----  00       BRK  
  0x04811C $810C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04811D $810D: C-----  C0 E0    CPY  #$E0
  0x04811F $810F: C-----  E0 01    CPX  #$01
  0x048121 $8111: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x048122 $8112: C-----  69 02    ADC  #$02
  0x048124 $8114: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x048125 $8115: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048126 $8116: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048127 $8117: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x048128 $8118: C-----  00       BRK  
  0x048129 $8119: C-----  00       BRK  
  0x04812A $811A: C-----  96 FC    STX  $FC,Y
  0x04812C $811C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04812D $811D: C-----  F8       SED  
  0x04812E $811E: C-----  F8       SED  
  0x04812F $811F: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x048130 $8120: C-----  70 E0    BVS  $8102
  0x048132 $8122: C-----  E0 C0    CPX  #$C0
  0x048134 $8124: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048135 $8125: C-----  00       BRK  
  0x048136 $8126: C-----  00       BRK  
  0x048137 $8127: C-----  00       BRK  
  0x048138 $8128: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048139 $8129: C-----  40       RTI  
  0x04813A $812A: C-----  C0 80    CPY  #$80
  0x04813C $812C: C-----  00       BRK  
  0x04813D $812D: C-----  00       BRK  
  0x04813E $812E: C-----  00       BRK  
  0x04813F $812F: C-----  00       BRK  
  0x048140 $8130: C-----  84 88    STY  $88
  0x048142 $8132: C-----  F0 00    BEQ  $8134
  0x048144 $8134: C-----  00       BRK  
  0x048145 $8135: C-----  00       BRK  
  0x048146 $8136: C-----  00       BRK  
  0x048147 $8137: C-----  00       BRK  
  0x048148 $8138: C-----  78       SEI  
  0x048149 $8139: C-----  70 80    BVS  $80BB
  0x04814B $813B: C-----  00       BRK  
  0x04814C $813C: C-----  00       BRK  
  0x04814D $813D: C-----  00       BRK  
  0x04814E $813E: C-----  00       BRK  
  0x04814F $813F: C-----  00       BRK  
  0x048150 $8140: C-----  00       BRK  
  0x048151 $8141: C-----  00       BRK  
  0x048152 $8142: C-----  00       BRK  
  0x048153 $8143: C-----  01 03    ORA  ($03,X)
  0x048155 $8145: C-----  05 08    ORA  $08
  0x048157 $8147: C-----  18       CLC  
  0x048158 $8148: C-----  00       BRK  
  0x048159 $8149: C-----  00       BRK  
  0x04815A $814A: C-----  00       BRK  
  0x04815B $814B: C-----  00       BRK  
  0x04815C $814C: C-----  00       BRK  
  0x04815D $814D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04815E $814E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04815F $814F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048160 $8150: C-----  38       SEC  
  0x048161 $8151: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x048162 $8152: C-----  84 18    STY  $18
  0x048164 $8154: C-----  30 E0    BMI  $8136
  0x048166 $8156: C-----  C0 80    CPY  #$80
  0x048168 $8158: C-----  00       BRK  
  0x048169 $8159: C-----  38       SEC  
  0x04816A $815A: C-----  78       SEI  
  0x04816B $815B: C-----  E0 C0    CPX  #$C0
  0x04816D $815D: C-----  00       BRK  
  0x04816E $815E: C-----  00       BRK  
  0x04816F $815F: C-----  00       BRK  
  0x048170 $8160: C-----  79 F9 7E ADC  $7EF9,Y
  0x048173 $8163: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x048174 $8164: C-----  B8       CLV  
  0x048175 $8165: C-----  90 50    BCC  $81B7
  0x048177 $8167: C-----  50 00    BVC  $8169
  0x048179 $8169: C-----  30 F8    BMI  $8163
  0x04817B $816B: C-----  B8       CLV  
  0x04817C $816C: C-----  50 60    BVC  $81CE
  0x04817E $816E: C-----  20 20 F0 JSR  $F020
  0x048181 $8171: C-----  F8       SED  
  0x048182 $8172: C-----  F8       SED  
  0x048183 $8173: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048184 $8174: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048185 $8175: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x048186 $8176: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x048187 $8177: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x048188 $8178: C-----  E0 F0    CPX  #$F0
  0x04818A $817A: C-----  F0 78    BEQ  $81F4
  0x04818C $817C: C-----  38       SEC  
  0x04818D $817D: C-----  18       CLC  
  0x04818E $817E: C-----  18       CLC  
  0x04818F $817F: C-----  18       CLC  
  0x048190 $8180: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048191 $8181: C-----  15 19    ORA  $19,X
  0x048193 $8183: C-----  18       CLC  
  0x048194 $8184: C-----  10 10    BPL  $8196
  0x048196 $8186: C-----  10 28    BPL  $81B0
  0x048198 $8188: C-----  00       BRK  
  0x048199 $8189: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04819A $818A: C-----  06 07    ASL  $07
  0x04819C $818C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04819D $818D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04819E $818E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04819F $818F: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x0481A0 $8190: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0481A1 $8191: C-----  00       BRK  
  0x0481A2 $8192: C-----  40       RTI  
  0x0481A3 $8193: C-----  C0 40    CPY  #$40
  0x0481A5 $8195: C-----  30 10    BMI  $81A7
  0x0481A7 $8197: C-----  10 00    BPL  $8199
  0x0481A9 $8199: C-----  00       BRK  
  0x0481AA $819A: C-----  00       BRK  
  0x0481AB $819B: C-----  00       BRK  
  0x0481AC $819C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0481AD $819D: C-----  C0 E0    CPY  #$E0
  0x0481AF $819F: C-----  E0 11    CPX  #$11
  0x0481B1 $81A1: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0481B2 $81A2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0481B3 $81A3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0481B4 $81A4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0481B5 $81A5: C-----  00       BRK  
  0x0481B6 $81A6: C-----  00       BRK  
  0x0481B7 $81A7: C-----  00       BRK  
  0x0481B8 $81A8: C-----  0E 05 03 ASL  $0305
  0x0481BB $81AB: C-----  01 00    ORA  ($00,X)
  0x0481BD $81AD: C-----  00       BRK  
  0x0481BE $81AE: C-----  00       BRK  
  0x0481BF $81AF: C-----  00       BRK  
  0x0481C0 $81B0: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0481C1 $81B1: C-----  66 EF    ROR  $EF
  0x0481C3 $81B3: C-----  CD 81 B3 CMP  $B381
  0x0481C6 $81B6: C-----  !!UNDEF $72  ; unknown opcode, treating as data
  0x0481C7 $81B7: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0481C8 $81B8: C-----  00       BRK  
  0x0481C9 $81B9: C-----  18       CLC  
  0x0481CA $81BA: C-----  10 32    BPL  $81EE
  0x0481CC $81BC: C-----  7E 4C 0C ROR  $0C4C,X
  0x0481CF $81BF: C-----  00       BRK  
  0x0481D0 $81C0: C-----  79 FF FF ADC  $FFFF,Y
  0x0481D3 $81C3: C-----  F9 78 70 SBC  $7078,Y
  0x0481D6 $81C6: C-----  20 C0 36 JSR  $36C0
  0x0481D9 $81C9: C-----  79 78 70 ADC  $7078,Y
  0x0481DC $81CC: C-----  A0 80    LDY  #$80
  0x0481DE $81CE: C-----  C0 00    CPY  #$00
  0x0481E0 $81D0: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0481E1 $81D1: C-----  1E 3E 3C ASL  $3C3E,X
  0x0481E4 $81D4: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0481E5 $81D5: C-----  00       BRK  
  0x0481E6 $81D6: C-----  00       BRK  
  0x0481E7 $81D7: C-----  00       BRK  
  0x0481E8 $81D8: C-----  08       PHP  
  0x0481E9 $81D9: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0481EA $81DA: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0481EB $81DB: C-----  18       CLC  
  0x0481EC $81DC: C-----  00       BRK  
  0x0481ED $81DD: C-----  00       BRK  
  0x0481EE $81DE: C-----  00       BRK  
  0x0481EF $81DF: C-----  00       BRK  
  0x0481F0 $81E0: C-----  00       BRK  
  0x0481F1 $81E1: C-----  01 01    ORA  ($01,X)
  0x0481F3 $81E3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0481F4 $81E4: C-----  06 0F    ASL  $0F
  0x0481F6 $81E6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0481F7 $81E7: C-----  0E 00 00 ASL  $0000
  0x0481FA $81EA: C-----  00       BRK  
  0x0481FB $81EB: C-----  01 01    ORA  ($01,X)
  0x0481FD $81ED: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0481FE $81EE: C-----  00       BRK  
  0x0481FF $81EF: C-----  00       BRK  
  0x048200 $81F0: C-----  60       RTS  
  0x048201 $81F1: C-----  60       RTS  
  0x048202 $81F2: C-----  60       RTS  
  0x048203 $81F3: C-----  C0 40    CPY  #$40
  0x048205 $81F5: C-----  C0 E0    CPY  #$E0
  0x048207 $81F7: C-----  F0 80    BEQ  $8179
  0x048209 $81F9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04820A $81FA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04820B $81FB: C-----  00       BRK  
  0x04820C $81FC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04820D $81FD: C-----  00       BRK  
  0x04820E $81FE: C-----  C0 E0    CPY  #$E0
  0x048210 $8200: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048211 $8201: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048212 $8202: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048213 $8203: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048214 $8204: C-----  3E 33 2D ROL  $2D33,X
  0x048217 $8207: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x048218 $8208: C-----  1E 1E 1E ASL  $1E1E,X
  0x04821B $820B: C-----  1E 02 0C ASL  $0C02,X
  0x04821E $820E: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x04821F $820F: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x048220 $8210: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048221 $8211: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048222 $8212: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048223 $8213: C-----  78       SEI  
  0x048224 $8214: C-----  38       SEC  
  0x048225 $8215: C-----  40       RTI  
  0x048226 $8216: C-----  70 60    BVS  $8278
  0x048228 $8218: C-----  78       SEI  
  0x048229 $8219: C-----  78       SEI  
  0x04822A $821A: C-----  78       SEI  
  0x04822B $821B: C-----  30 40    BMI  $825D
  0x04822D $821D: C-----  30 00    BMI  $821F
  0x04822F $821F: C-----  00       BRK  
  0x048230 $8220: C-----  21 21    AND  ($21,X)
  0x048232 $8222: C-----  21 11    AND  ($11,X)
  0x048234 $8224: C-----  11 11    ORA  ($11),Y
  0x048236 $8226: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x048237 $8227: C-----  0A       ASL  A
  0x048238 $8228: C-----  1E 1E 1E ASL  $1E1E,X
  0x04823B $822B: C-----  0E 0E 0E ASL  $0E0E
  0x04823E $822E: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04823F $822F: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048240 $8230: C-----  00       BRK  
  0x048241 $8231: C-----  00       BRK  
  0x048242 $8232: C-----  00       BRK  
  0x048243 $8233: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048244 $8234: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048245 $8235: C-----  08       PHP  
  0x048246 $8236: C-----  10 10    BPL  $8248
  0x048248 $8238: C-----  00       BRK  
  0x048249 $8239: C-----  00       BRK  
  0x04824A $823A: C-----  00       BRK  
  0x04824B $823B: C-----  00       BRK  
  0x04824C $823C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04824D $823D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04824E $823E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04824F $823F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048250 $8240: C-----  00       BRK  
  0x048251 $8241: C-----  00       BRK  
  0x048252 $8242: C-----  00       BRK  
  0x048253 $8243: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048254 $8244: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x048255 $8245: C-----  30 40    BMI  $8287
  0x048257 $8247: C-----  20 00 00 JSR  $0000
  0x04825A $824A: C-----  00       BRK  
  0x04825B $824B: C-----  00       BRK  
  0x04825C $824C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04825D $824D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04825E $824E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04825F $824F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x048260 $8250: C-----  00       BRK  
  0x048261 $8251: C-----  00       BRK  
  0x048262 $8252: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048263 $8253: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048264 $8254: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048265 $8255: C-----  08       PHP  
  0x048266 $8256: C-----  06 07    ASL  $07
  0x048268 $8258: C-----  00       BRK  
  0x048269 $8259: C-----  00       BRK  
  0x04826A $825A: C-----  00       BRK  
  0x04826B $825B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04826C $825C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04826D $825D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04826E $825E: C-----  01 02    ORA  ($02,X)
  0x048270 $8260: C-----  00       BRK  
  0x048271 $8261: C-----  00       BRK  
  0x048272 $8262: C-----  00       BRK  
  0x048273 $8263: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048274 $8264: C-----  60       RTS  
  0x048275 $8265: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x048276 $8266: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048277 $8267: C-----  08       PHP  
  0x048278 $8268: C-----  00       BRK  
  0x048279 $8269: C-----  00       BRK  
  0x04827A $826A: C-----  00       BRK  
  0x04827B $826B: C-----  00       BRK  
  0x04827C $826C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04827D $826D: C-----  E0 F8    CPX  #$F8
  0x04827F $826F: C-----  F0 0F    BEQ  $8280
  0x048281 $8271: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048282 $8272: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048283 $8273: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048284 $8274: C-----  00       BRK  
  0x048285 $8275: C-----  00       BRK  
  0x048286 $8276: C-----  00       BRK  
  0x048287 $8277: C-----  00       BRK  
  0x048288 $8278: C-----  05 07    ORA  $07
  0x04828A $827A: C-----  06 00    ASL  $00
  0x04828C $827C: C-----  00       BRK  
  0x04828D $827D: C-----  00       BRK  
  0x04828E $827E: C-----  00       BRK  
  0x04828F $827F: C-----  00       BRK  
  0x048290 $8280: C-----  0A       ASL  A
  0x048291 $8281: C-----  0A       ASL  A
  0x048292 $8282: C-----  0A       ASL  A
  0x048293 $8283: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048294 $8284: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048295 $8285: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x048296 $8286: C-----  3E 00 04 ROL  $0400,X
  0x048299 $8289: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04829A $828A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04829B $828B: C-----  00       BRK  
  0x04829C $828C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04829D $828D: C-----  00       BRK  
  0x04829E $828E: C-----  00       BRK  
  0x04829F $828F: C-----  00       BRK  
  0x0482A0 $8290: C-----  19 0B 0F ORA  $0F0B,Y
  0x0482A3 $8293: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0482A4 $8294: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0482A5 $8295: C-----  00       BRK  
  0x0482A6 $8296: C-----  00       BRK  
  0x0482A7 $8297: C-----  00       BRK  
  0x0482A8 $8298: C-----  06 05    ASL  $05
  0x0482AA $829A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0482AB $829B: C-----  01 00    ORA  ($00,X)
  0x0482AD $829D: C-----  00       BRK  
  0x0482AE $829E: C-----  00       BRK  
  0x0482AF $829F: C-----  00       BRK  
  0x0482B0 $82A0: C-----  00       BRK  
  0x0482B1 $82A1: C-----  00       BRK  
  0x0482B2 $82A2: C-----  00       BRK  
  0x0482B3 $82A3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0482B4 $82A4: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0482B5 $82A5: C-----  18       CLC  
  0x0482B6 $82A6: C-----  10 10    BPL  $82B8
  0x0482B8 $82A8: C-----  00       BRK  
  0x0482B9 $82A9: C-----  00       BRK  
  0x0482BA $82AA: C-----  00       BRK  
  0x0482BB $82AB: C-----  00       BRK  
  0x0482BC $82AC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0482BD $82AD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0482BE $82AE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0482BF $82AF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0482C0 $82B0: C-----  00       BRK  
  0x0482C1 $82B1: C-----  00       BRK  
  0x0482C2 $82B2: C-----  00       BRK  
  0x0482C3 $82B3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0482C4 $82B4: C-----  60       RTS  
  0x0482C5 $82B5: C-----  30 10    BMI  $82C7
  0x0482C7 $82B7: C-----  10 00    BPL  $82B9
  0x0482C9 $82B9: C-----  00       BRK  
  0x0482CA $82BA: C-----  00       BRK  
  0x0482CB $82BB: C-----  00       BRK  
  0x0482CC $82BC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0482CD $82BD: C-----  C0 E0    CPY  #$E0
  0x0482CF $82BF: C-----  E0 50    CPX  #$50
  0x0482D1 $82C1: C-----  E0 E0    CPX  #$E0
  0x0482D3 $82C3: C-----  C0 80    CPY  #$80
  0x0482D5 $82C5: C-----  00       BRK  
  0x0482D6 $82C6: C-----  00       BRK  
  0x0482D7 $82C7: C-----  00       BRK  
  0x0482D8 $82C8: C-----  A0 40    LDY  #$40
  0x0482DA $82CA: C-----  C0 80    CPY  #$80
  0x0482DC $82CC: C-----  00       BRK  
  0x0482DD $82CD: C-----  00       BRK  
  0x0482DE $82CE: C-----  00       BRK  
  0x0482DF $82CF: C-----  00       BRK  
  0x0482E0 $82D0: C-----  00       BRK  
  0x0482E1 $82D1: C-----  00       BRK  
  0x0482E2 $82D2: C-----  00       BRK  
  0x0482E3 $82D3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0482E4 $82D4: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0482E5 $82D5: C-----  08       PHP  
  0x0482E6 $82D6: C-----  0A       ASL  A
  0x0482E7 $82D7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0482E8 $82D8: C-----  00       BRK  
  0x0482E9 $82D9: C-----  00       BRK  
  0x0482EA $82DA: C-----  00       BRK  
  0x0482EB $82DB: C-----  00       BRK  
  0x0482EC $82DC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0482ED $82DD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0482EE $82DE: C-----  05 02    ORA  $02
  0x0482F0 $82E0: C-----  00       BRK  
  0x0482F1 $82E1: C-----  10 18    BPL  $82FB
  0x0482F3 $82E3: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x0482F4 $82E4: C-----  10 10    BPL  $82F6
  0x0482F6 $82E6: C-----  0A       ASL  A
  0x0482F7 $82E7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0482F8 $82E8: C-----  00       BRK  
  0x0482F9 $82E9: C-----  00       BRK  
  0x0482FA $82EA: C-----  00       BRK  
  0x0482FB $82EB: C-----  08       PHP  
  0x0482FC $82EC: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0482FD $82ED: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0482FE $82EE: C-----  05 02    ORA  $02
  0x048300 $82F0: C-----  00       BRK  
  0x048301 $82F1: C-----  00       BRK  
  0x048302 $82F2: C-----  00       BRK  
  0x048303 $82F3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048304 $82F4: C-----  60       RTS  
  0x048305 $82F5: C-----  10 10    BPL  $8307
  0x048307 $82F7: C-----  08       PHP  
  0x048308 $82F8: C-----  00       BRK  
  0x048309 $82F9: C-----  00       BRK  
  0x04830A $82FA: C-----  00       BRK  
  0x04830B $82FB: C-----  00       BRK  
  0x04830C $82FC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04830D $82FD: C-----  E0 E0    CPX  #$E0
  0x04830F $82FF: C-----  F0 00    BEQ  $8301
  0x048311 $8301: C-----  00       BRK  
  0x048312 $8302: C-----  00       BRK  
  0x048313 $8303: C-----  E4 1C    CPX  $1C
  0x048315 $8305: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048316 $8306: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048317 $8307: C-----  88       DEY  
  0x048318 $8308: C-----  00       BRK  
  0x048319 $8309: C-----  00       BRK  
  0x04831A $830A: C-----  00       BRK  
  0x04831B $830B: C-----  00       BRK  
  0x04831C $830C: C-----  E0 F8    CPX  #$F8
  0x04831E $830E: C-----  F8       SED  
  0x04831F $830F: C-----  70 3F    BVS  $8350
  0x048321 $8311: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x048322 $8312: C-----  D1 85    CMP  ($85),Y
  0x048324 $8314: C-----  81 93    STA  ($93,X)
  0x048326 $8316: C-----  C6 FC    DEC  $FC
  0x048328 $8318: C-----  00       BRK  
  0x048329 $8319: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04832A $831A: C-----  2E 7A 7E ROL  $7E7A
  0x04832D $831D: C-----  6C 38 00 JMP  ($0038)
  0x048330 $8320: C-----  88       DEY  
  0x048331 $8321: C-----  90 E0    BCC  $8303
  0x048333 $8323: C-----  00       BRK  
  0x048334 $8324: C-----  00       BRK  
  0x048335 $8325: C-----  00       BRK  
  0x048336 $8326: C-----  00       BRK  
  0x048337 $8327: C-----  00       BRK  
  0x048338 $8328: C-----  70 60    BVS  $838A
  0x04833A $832A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04833B $832B: C-----  00       BRK  
  0x04833C $832C: C-----  00       BRK  
  0x04833D $832D: C-----  00       BRK  
  0x04833E $832E: C-----  00       BRK  
  0x04833F $832F: C-----  00       BRK  
  0x048340 $8330: C-----  00       BRK  
  0x048341 $8331: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048342 $8332: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048343 $8333: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048344 $8334: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048345 $8335: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x048346 $8336: C-----  00       BRK  
  0x048347 $8337: C-----  00       BRK  
  0x048348 $8338: C-----  00       BRK  
  0x048349 $8339: C-----  00       BRK  
  0x04834A $833A: C-----  06 07    ASL  $07
  0x04834C $833C: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04834D $833D: C-----  00       BRK  
  0x04834E $833E: C-----  00       BRK  
  0x04834F $833F: C-----  00       BRK  
  0x048350 $8340: C-----  00       BRK  
  0x048351 $8341: C-----  00       BRK  
  0x048352 $8342: C-----  00       BRK  
  0x048353 $8343: C-----  00       BRK  
  0x048354 $8344: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048355 $8345: C-----  05 04    ORA  $04
  0x048357 $8347: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x048358 $8348: C-----  00       BRK  
  0x048359 $8349: C-----  00       BRK  
  0x04835A $834A: C-----  00       BRK  
  0x04835B $834B: C-----  00       BRK  
  0x04835C $834C: C-----  00       BRK  
  0x04835D $834D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04835E $834E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04835F $834F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048360 $8350: C-----  00       BRK  
  0x048361 $8351: C-----  00       BRK  
  0x048362 $8352: C-----  08       PHP  
  0x048363 $8353: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x048364 $8354: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x048365 $8355: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048366 $8356: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048367 $8357: C-----  08       PHP  
  0x048368 $8358: C-----  00       BRK  
  0x048369 $8359: C-----  00       BRK  
  0x04836A $835A: C-----  00       BRK  
  0x04836B $835B: C-----  08       PHP  
  0x04836C $835C: C-----  98       TYA  
  0x04836D $835D: C-----  F8       SED  
  0x04836E $835E: C-----  F8       SED  
  0x04836F $835F: C-----  F0 00    BEQ  $8361
  0x048371 $8361: C-----  F0 F8    BEQ  $835B
  0x048373 $8363: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048374 $8364: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048375 $8365: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x048376 $8366: C-----  66 42    ROR  $42
  0x048378 $8368: C-----  00       BRK  
  0x048379 $8369: C-----  00       BRK  
  0x04837A $836A: C-----  F0 F8    BEQ  $8364
  0x04837C $836C: C-----  38       SEC  
  0x04837D $836D: C-----  20 18 3C JSR  $3C18
  0x048380 $8370: C-----  08       PHP  
  0x048381 $8371: C-----  05 03    ORA  $03
  0x048383 $8373: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048384 $8374: C-----  01 00    ORA  ($00,X)
  0x048386 $8376: C-----  00       BRK  
  0x048387 $8377: C-----  00       BRK  
  0x048388 $8378: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048389 $8379: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04838A $837A: C-----  01 01    ORA  ($01,X)
  0x04838C $837C: C-----  00       BRK  
  0x04838D $837D: C-----  00       BRK  
  0x04838E $837E: C-----  00       BRK  
  0x04838F $837F: C-----  00       BRK  
  0x048390 $8380: C-----  00       BRK  
  0x048391 $8381: C-----  00       BRK  
  0x048392 $8382: C-----  00       BRK  
  0x048393 $8383: C-----  C0 30    CPY  #$30
  0x048395 $8385: C-----  10 08    BPL  $838F
  0x048397 $8387: C-----  08       PHP  
  0x048398 $8388: C-----  00       BRK  
  0x048399 $8389: C-----  00       BRK  
  0x04839A $838A: C-----  00       BRK  
  0x04839B $838B: C-----  00       BRK  
  0x04839C $838C: C-----  C0 E0    CPY  #$E0
  0x04839E $838E: C-----  F0 F0    BEQ  $8380
  0x0483A0 $8390: C-----  56 63    LSR  $63,X
  0x0483A2 $8392: C-----  41 81    EOR  ($81,X)
  0x0483A4 $8394: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0483A5 $8395: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0483A6 $8396: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0483A7 $8397: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0483A8 $8398: C-----  28       PLP  
  0x0483A9 $8399: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0483AA $839A: C-----  3E 7E 7F ROL  $7F7E,X
  0x0483AD $839D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0483AE $839E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0483AF $839F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0483B0 $83A0: C-----  84 98    STY  $98
  0x0483B2 $83A2: C-----  E0 00    CPX  #$00
  0x0483B4 $83A4: C-----  00       BRK  
  0x0483B5 $83A5: C-----  00       BRK  
  0x0483B6 $83A6: C-----  00       BRK  
  0x0483B7 $83A7: C-----  00       BRK  
  0x0483B8 $83A8: C-----  78       SEI  
  0x0483B9 $83A9: C-----  60       RTS  
  0x0483BA $83AA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0483BB $83AB: C-----  00       BRK  
  0x0483BC $83AC: C-----  00       BRK  
  0x0483BD $83AD: C-----  00       BRK  
  0x0483BE $83AE: C-----  00       BRK  
  0x0483BF $83AF: C-----  00       BRK  
  0x0483C0 $83B0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0483C1 $83B1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0483C2 $83B2: C-----  40       RTI  
  0x0483C3 $83B3: C-----  40       RTI  
  0x0483C4 $83B4: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0483C5 $83B5: C-----  28       PLP  
  0x0483C6 $83B6: C-----  70 70    BVS  $8428
  0x0483C8 $83B8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0483C9 $83B9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0483CA $83BA: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0483CB $83BB: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0483CC $83BC: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x0483CD $83BD: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x0483CE $83BE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0483CF $83BF: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0483D0 $83C0: C-----  79 F9 7E ADC  $7EF9,Y
  0x0483D3 $83C3: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0483D4 $83C4: C-----  B8       CLV  
  0x0483D5 $83C5: C-----  90 50    BCC  $8417
  0x0483D7 $83C7: C-----  50 06    BVC  $83CF
  0x0483D9 $83C9: C-----  36 78    ROL  $78,X
  0x0483DB $83CB: C-----  38       SEC  
  0x0483DC $83CC: C-----  10 00    BPL  $83CE
  0x0483DE $83CE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0483DF $83CF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0483E0 $83D0: C-----  00       BRK  
  0x0483E1 $83D1: C-----  00       BRK  
  0x0483E2 $83D2: C-----  00       BRK  
  0x0483E3 $83D3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0483E4 $83D4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0483E5 $83D5: C-----  05 04    ORA  $04
  0x0483E7 $83D7: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0483E8 $83D8: C-----  00       BRK  
  0x0483E9 $83D9: C-----  00       BRK  
  0x0483EA $83DA: C-----  00       BRK  
  0x0483EB $83DB: C-----  00       BRK  
  0x0483EC $83DC: C-----  00       BRK  
  0x0483ED $83DD: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0483EE $83DE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0483EF $83DF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0483F0 $83E0: C-----  60       RTS  
  0x0483F1 $83E1: C-----  60       RTS  
  0x0483F2 $83E2: C-----  60       RTS  
  0x0483F3 $83E3: C-----  C0 40    CPY  #$40
  0x0483F5 $83E5: C-----  40       RTI  
  0x0483F6 $83E6: C-----  20 F0 80 JSR  $80F0
  0x0483F9 $83E9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0483FA $83EA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0483FB $83EB: C-----  00       BRK  
  0x0483FC $83EC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0483FD $83ED: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0483FE $83EE: C-----  C0 00    CPY  #$00
  0x048400 $83F0: C-----  08       PHP  
  0x048401 $83F1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048402 $83F2: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048403 $83F3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048404 $83F4: C-----  01 00    ORA  ($00,X)
  0x048406 $83F6: C-----  00       BRK  
  0x048407 $83F7: C-----  00       BRK  
  0x048408 $83F8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048409 $83F9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04840A $83FA: C-----  00       BRK  
  0x04840B $83FB: C-----  01 00    ORA  ($00,X)
  0x04840D $83FD: C-----  00       BRK  
  0x04840E $83FE: C-----  00       BRK  
  0x04840F $83FF: C-----  00       BRK  
  0x048410 $8400: ------  .byte $00
  0x048411 $8401: ------  .byte $00
  0x048412 $8402: ------  .byte $00
  0x048413 $8403: ------  .byte $00
  0x048414 $8404: ------  .byte $00
  0x048415 $8405: ------  .byte $00
  0x048416 $8406: ------  .byte $00
  0x048417 $8407: ------  .byte $00
  0x048418 $8408: ------  .byte $00
  0x048419 $8409: ------  .byte $00
  0x04841A $840A: ------  .byte $00
  0x04841B $840B: ------  .byte $00
  0x04841C $840C: ------  .byte $00
  0x04841D $840D: ------  .byte $00
  0x04841E $840E: ------  .byte $00
  0x04841F $840F: ------  .byte $00
  0x048420 $8410: ------  .byte $FF
  0x048421 $8411: ------  .byte $FF
  0x048422 $8412: ------  .byte $FF
  0x048423 $8413: ------  .byte $FF
  0x048424 $8414: ------  .byte $FF
  0x048425 $8415: ------  .byte $FF
  0x048426 $8416: ------  .byte $FF
  0x048427 $8417: ------  .byte $FF
  0x048428 $8418: ------  .byte $00
  0x048429 $8419: ------  .byte $00
  0x04842A $841A: ------  .byte $00
  0x04842B $841B: ------  .byte $00
  0x04842C $841C: ------  .byte $00
  0x04842D $841D: ------  .byte $00
  0x04842E $841E: ------  .byte $00
  0x04842F $841F: ------  .byte $00
  0x048430 $8420: C-----  76 63    ROR  $63,X
  0x048432 $8422: C-----  41 81    EOR  ($81,X)
  0x048434 $8424: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048435 $8425: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048436 $8426: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048437 $8427: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048438 $8428: C-----  08       PHP  
  0x048439 $8429: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04843A $842A: C-----  3E 7E 7F ROL  $7F7E,X
  0x04843D $842D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04843E $842E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04843F $842F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x048440 $8430: C-----  00       BRK  
  0x048441 $8431: C-----  08       PHP  
  0x048442 $8432: C-----  90 E0    BCC  $8414
  0x048444 $8434: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048445 $8435: C-----  00       BRK  
  0x048446 $8436: C-----  00       BRK  
  0x048447 $8437: C-----  00       BRK  
  0x048448 $8438: C-----  F8       SED  
  0x048449 $8439: C-----  F0 60    BEQ  $849B
  0x04844B $843B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04844C $843C: C-----  00       BRK  
  0x04844D $843D: C-----  00       BRK  
  0x04844E $843E: C-----  00       BRK  
  0x04844F $843F: C-----  00       BRK  
  0x048450 $8440: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x048451 $8441: C-----  38       SEC  
  0x048452 $8442: C-----  0E 05 1E ASL  $1E05
  0x048455 $8445: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048456 $8446: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x048457 $8447: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048458 $8448: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x048459 $8449: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04845A $844A: C-----  01 00    ORA  ($00,X)
  0x04845C $844C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04845D $844D: C-----  1E 3F 1F ASL  $1F3F,X
  0x048460 $8450: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048461 $8451: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048462 $8452: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048463 $8453: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048464 $8454: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048465 $8455: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048466 $8456: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048467 $8457: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048468 $8458: C-----  00       BRK  
  0x048469 $8459: C-----  00       BRK  
  0x04846A $845A: C-----  00       BRK  
  0x04846B $845B: C-----  00       BRK  
  0x04846C $845C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04846D $845D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04846E $845E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04846F $845F: C-----  FE 01 03 INC  $0301,X
  0x048472 $8462: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x048473 $8463: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048474 $8464: C-----  08       PHP  
  0x048475 $8465: C-----  08       PHP  
  0x048476 $8466: C-----  10 3D    BPL  $84A5
  0x048478 $8468: C-----  00       BRK  
  0x048479 $8469: C-----  00       BRK  
  0x04847A $846A: C-----  01 03    ORA  ($03,X)
  0x04847C $846C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04847D $846D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04847E $846E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04847F $846F: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x048480 $8470: C-----  C0 F0    CPY  #$F0
  0x048482 $8472: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048483 $8473: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048484 $8474: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048485 $8475: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048486 $8476: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048487 $8477: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048488 $8478: C-----  00       BRK  
  0x048489 $8479: C-----  40       RTI  
  0x04848A $847A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04848B $847B: C-----  01 C2    ORA  ($C2,X)
  0x04848D $847D: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x04848E $847E: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04848F $847F: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x048490 $8480: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048491 $8481: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048492 $8482: C-----  40       RTI  
  0x048493 $8483: C-----  40       RTI  
  0x048494 $8484: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x048495 $8485: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x048496 $8486: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x048497 $8487: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x048498 $8488: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x048499 $8489: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04849A $848A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04849B $848B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04849C $848C: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04849D $848D: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04849E $848E: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04849F $848F: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x0484A0 $8490: C-----  00       BRK  
  0x0484A1 $8491: C-----  00       BRK  
  0x0484A2 $8492: C-----  00       BRK  
  0x0484A3 $8493: C-----  00       BRK  
  0x0484A4 $8494: C-----  01 02    ORA  ($02,X)
  0x0484A6 $8496: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0484A7 $8497: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0484A8 $8498: C-----  00       BRK  
  0x0484A9 $8499: C-----  00       BRK  
  0x0484AA $849A: C-----  00       BRK  
  0x0484AB $849B: C-----  00       BRK  
  0x0484AC $849C: C-----  00       BRK  
  0x0484AD $849D: C-----  01 03    ORA  ($03,X)
  0x0484AF $849F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0484B0 $84A0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0484B1 $84A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0484B2 $84A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0484B3 $84A3: C-----  F9 78 70 SBC  $7078,Y
  0x0484B6 $84A6: C-----  20 C0 37 JSR  $37C0
  0x0484B9 $84A9: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x0484BA $84AA: C-----  78       SEI  
  0x0484BB $84AB: C-----  70 A0    BVS  $844D
  0x0484BD $84AD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0484BE $84AE: C-----  C0 00    CPY  #$00
  0x0484C0 $84B0: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0484C1 $84B1: C-----  06 03    ASL  $03
  0x0484C3 $84B3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0484C4 $84B4: C-----  01 00    ORA  ($00,X)
  0x0484C6 $84B6: C-----  00       BRK  
  0x0484C7 $84B7: C-----  00       BRK  
  0x0484C8 $84B8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0484C9 $84B9: C-----  01 00    ORA  ($00,X)
  0x0484CB $84BB: C-----  01 00    ORA  ($00,X)
  0x0484CD $84BD: C-----  00       BRK  
  0x0484CE $84BE: C-----  00       BRK  
  0x0484CF $84BF: C-----  00       BRK  
  0x0484D0 $84C0: C-----  00       BRK  
  0x0484D1 $84C1: C-----  00       BRK  
  0x0484D2 $84C2: C-----  00       BRK  
  0x0484D3 $84C3: C-----  00       BRK  
  0x0484D4 $84C4: C-----  E0 10    CPX  #$10
  0x0484D6 $84C6: C-----  08       PHP  
  0x0484D7 $84C7: C-----  08       PHP  
  0x0484D8 $84C8: C-----  00       BRK  
  0x0484D9 $84C9: C-----  00       BRK  
  0x0484DA $84CA: C-----  00       BRK  
  0x0484DB $84CB: C-----  00       BRK  
  0x0484DC $84CC: C-----  00       BRK  
  0x0484DD $84CD: C-----  E0 F0    CPX  #$F0
  0x0484DF $84CF: C-----  F0 FF    BEQ  $84D0
  0x0484E1 $84D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0484E2 $84D2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0484E3 $84D3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0484E4 $84D4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0484E5 $84D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0484E6 $84D6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0484E7 $84D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0484E8 $84D8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0484E9 $84D9: C-----  0E 31 C0 ASL  $C031
  0x0484EC $84DC: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x0484ED $84DD: C-----  2C 30 C8 BIT  $C830
  0x0484F0 $84E0: C-----  08       PHP  
  0x0484F1 $84E1: C-----  08       PHP  
  0x0484F2 $84E2: C-----  D0 E0    BNE  $84C4
  0x0484F4 $84E4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0484F5 $84E5: C-----  00       BRK  
  0x0484F6 $84E6: C-----  00       BRK  
  0x0484F7 $84E7: C-----  00       BRK  
  0x0484F8 $84E8: C-----  F0 F0    BEQ  $84DA
  0x0484FA $84EA: C-----  60       RTS  
  0x0484FB $84EB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0484FC $84EC: C-----  00       BRK  
  0x0484FD $84ED: C-----  00       BRK  
  0x0484FE $84EE: C-----  00       BRK  
  0x0484FF $84EF: C-----  00       BRK  
  0x048500 $84F0: C-----  00       BRK  
  0x048501 $84F1: C-----  00       BRK  
  0x048502 $84F2: C-----  01 03    ORA  ($03,X)
  0x048504 $84F4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048505 $84F5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048506 $84F6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048507 $84F7: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x048508 $84F8: C-----  00       BRK  
  0x048509 $84F9: C-----  00       BRK  
  0x04850A $84FA: C-----  00       BRK  
  0x04850B $84FB: C-----  01 01    ORA  ($01,X)
  0x04850D $84FD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04850E $84FE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04850F $84FF: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x048510 $8500: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048511 $8501: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048512 $8502: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048513 $8503: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048514 $8504: C-----  F0 C0    BEQ  $84C6
  0x048516 $8506: C-----  00       BRK  
  0x048517 $8507: C-----  00       BRK  
  0x048518 $8508: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048519 $8509: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04851A $850A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04851B $850B: C-----  FE F8 E0 INC  $E0F8,X
  0x04851E $850E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04851F $850F: C-----  00       BRK  
  0x048520 $8510: C-----  F0 C0    BEQ  $84D2
  0x048522 $8512: C-----  00       BRK  
  0x048523 $8513: C-----  00       BRK  
  0x048524 $8514: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048525 $8515: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048526 $8516: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048527 $8517: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048528 $8518: C-----  F8       SED  
  0x048529 $8519: C-----  E0 80    CPX  #$80
  0x04852B $851B: C-----  00       BRK  
  0x04852C $851C: C-----  00       BRK  
  0x04852D $851D: C-----  00       BRK  
  0x04852E $851E: C-----  10 08    BPL  $8528
  0x048530 $8520: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048531 $8521: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048532 $8522: C-----  00       BRK  
  0x048533 $8523: C-----  00       BRK  
  0x048534 $8524: C-----  C0 F0    CPY  #$F0
  0x048536 $8526: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048537 $8527: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048538 $8528: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x048539 $8529: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04853A $852A: C-----  01 00    ORA  ($00,X)
  0x04853C $852C: C-----  00       BRK  
  0x04853D $852D: C-----  00       BRK  
  0x04853E $852E: C-----  08       PHP  
  0x04853F $852F: C-----  10 FF    BPL  $8530
  0x048541 $8531: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048542 $8532: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048543 $8533: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048544 $8534: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048545 $8535: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048546 $8536: C-----  00       BRK  
  0x048547 $8537: C-----  00       BRK  
  0x048548 $8538: C-----  C0 F0    CPY  #$F0
  0x04854A $853A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04854B $853B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04854C $853C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04854D $853D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04854E $853E: C-----  01 00    ORA  ($00,X)
  0x048550 $8540: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048551 $8541: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048552 $8542: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048553 $8543: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048554 $8544: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048555 $8545: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048556 $8546: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048557 $8547: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048558 $8548: C-----  00       BRK  
  0x048559 $8549: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04855A $854A: C-----  01 80    ORA  ($80,X)
  0x04855C $854C: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x04855D $854D: C-----  2C 30 C8 BIT  $C830
  0x048560 $8550: C-----  00       BRK  
  0x048561 $8551: C-----  00       BRK  
  0x048562 $8552: C-----  00       BRK  
  0x048563 $8553: C-----  00       BRK  
  0x048564 $8554: C-----  C0 20    CPY  #$20
  0x048566 $8556: C-----  10 10    BPL  $8568
  0x048568 $8558: C-----  00       BRK  
  0x048569 $8559: C-----  00       BRK  
  0x04856A $855A: C-----  00       BRK  
  0x04856B $855B: C-----  00       BRK  
  0x04856C $855C: C-----  00       BRK  
  0x04856D $855D: C-----  C0 E0    CPY  #$E0
  0x04856F $855F: C-----  E0 FF    CPX  #$FF
  0x048571 $8561: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048572 $8562: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048573 $8563: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048574 $8564: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048575 $8565: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048576 $8566: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048577 $8567: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048578 $8568: C-----  00       BRK  
  0x048579 $8569: C-----  00       BRK  
  0x04857A $856A: C-----  00       BRK  
  0x04857B $856B: C-----  00       BRK  
  0x04857C $856C: C-----  C0 F0    CPY  #$F0
  0x04857E $856E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04857F $856F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x048580 $8570: C-----  00       BRK  
  0x048581 $8571: C-----  00       BRK  
  0x048582 $8572: C-----  00       BRK  
  0x048583 $8573: C-----  00       BRK  
  0x048584 $8574: C-----  00       BRK  
  0x048585 $8575: C-----  01 06    ORA  ($06,X)
  0x048587 $8577: C-----  38       SEC  
  0x048588 $8578: C-----  00       BRK  
  0x048589 $8579: C-----  00       BRK  
  0x04858A $857A: C-----  00       BRK  
  0x04858B $857B: C-----  00       BRK  
  0x04858C $857C: C-----  00       BRK  
  0x04858D $857D: C-----  00       BRK  
  0x04858E $857E: C-----  01 07    ORA  ($07,X)
  0x048590 $8580: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048591 $8581: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048592 $8582: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048593 $8583: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048594 $8584: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048595 $8585: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048596 $8586: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048597 $8587: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048598 $8588: C-----  E0 70    CPX  #$70
  0x04859A $858A: C-----  8C 03 C2 STY  $C203
  0x04859D $858D: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x04859E $858E: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04859F $858F: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0485A0 $8590: C-----  10 10    BPL  $85A2
  0x0485A2 $8592: C-----  20 E0 C0 JSR  $C0E0
  0x0485A5 $8595: C-----  00       BRK  
  0x0485A6 $8596: C-----  00       BRK  
  0x0485A7 $8597: C-----  00       BRK  
  0x0485A8 $8598: C-----  E0 E0    CPX  #$E0
  0x0485AA $859A: C-----  C0 40    CPY  #$40
  0x0485AC $859C: C-----  00       BRK  
  0x0485AD $859D: C-----  00       BRK  
  0x0485AE $859E: C-----  00       BRK  
  0x0485AF $859F: C-----  00       BRK  
  0x0485B0 $85A0: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0485B1 $85A1: C-----  F8       SED  
  0x0485B2 $85A2: C-----  F8       SED  
  0x0485B3 $85A3: C-----  F0 F0    BEQ  $8595
  0x0485B5 $85A5: C-----  E0 C0    CPX  #$C0
  0x0485B7 $85A7: C-----  C0 38    CPY  #$38
  0x0485B9 $85A9: C-----  70 F0    BVS  $859B
  0x0485BB $85AB: C-----  E0 E0    CPX  #$E0
  0x0485BD $85AD: C-----  C0 80    CPY  #$80
  0x0485BF $85AF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0485C0 $85B0: C-----  10 08    BPL  $85BA
  0x0485C2 $85B2: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0485C3 $85B3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0485C4 $85B4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0485C5 $85B5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0485C6 $85B6: C-----  00       BRK  
  0x0485C7 $85B7: C-----  00       BRK  
  0x0485C8 $85B8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0485C9 $85B9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0485CA $85BA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0485CB $85BB: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0485CC $85BC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0485CD $85BD: C-----  00       BRK  
  0x0485CE $85BE: C-----  00       BRK  
  0x0485CF $85BF: C-----  00       BRK  
  0x0485D0 $85C0: C-----  00       BRK  
  0x0485D1 $85C1: C-----  00       BRK  
  0x0485D2 $85C2: C-----  00       BRK  
  0x0485D3 $85C3: C-----  00       BRK  
  0x0485D4 $85C4: C-----  00       BRK  
  0x0485D5 $85C5: C-----  C0 20    CPY  #$20
  0x0485D7 $85C7: C-----  10 00    BPL  $85C9
  0x0485D9 $85C9: C-----  00       BRK  
  0x0485DA $85CA: C-----  00       BRK  
  0x0485DB $85CB: C-----  00       BRK  
  0x0485DC $85CC: C-----  00       BRK  
  0x0485DD $85CD: C-----  00       BRK  
  0x0485DE $85CE: C-----  C0 E0    CPY  #$E0
  0x0485E0 $85D0: C-----  08       PHP  
  0x0485E1 $85D1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0485E2 $85D2: C-----  18       CLC  
  0x0485E3 $85D3: C-----  E0 C0    CPX  #$C0
  0x0485E5 $85D5: C-----  00       BRK  
  0x0485E6 $85D6: C-----  00       BRK  
  0x0485E7 $85D7: C-----  00       BRK  
  0x0485E8 $85D8: C-----  F0 F8    BEQ  $85D2
  0x0485EA $85DA: C-----  E0 40    CPX  #$40
  0x0485EC $85DC: C-----  00       BRK  
  0x0485ED $85DD: C-----  00       BRK  
  0x0485EE $85DE: C-----  00       BRK  
  0x0485EF $85DF: C-----  00       BRK  
  0x0485F0 $85E0: C-----  10 10    BPL  $85F2
  0x0485F2 $85E2: C-----  10 E0    BPL  $85C4
  0x0485F4 $85E4: C-----  C0 00    CPY  #$00
  0x0485F6 $85E6: C-----  00       BRK  
  0x0485F7 $85E7: C-----  00       BRK  
  0x0485F8 $85E8: C-----  E0 E0    CPX  #$E0
  0x0485FA $85EA: C-----  E0 40    CPX  #$40
  0x0485FC $85EC: C-----  00       BRK  
  0x0485FD $85ED: C-----  00       BRK  
  0x0485FE $85EE: C-----  00       BRK  
  0x0485FF $85EF: C-----  00       BRK  
  0x048600 $85F0: C-----  00       BRK  
  0x048601 $85F1: C-----  00       BRK  
  0x048602 $85F2: C-----  00       BRK  
  0x048603 $85F3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048604 $85F4: C-----  50 08    BVC  $85FE
  0x048606 $85F6: C-----  00       BRK  
  0x048607 $85F7: C-----  08       PHP  
  0x048608 $85F8: C-----  00       BRK  
  0x048609 $85F9: C-----  00       BRK  
  0x04860A $85FA: C-----  00       BRK  
  0x04860B $85FB: C-----  00       BRK  
  0x04860C $85FC: C-----  A0 F0    LDY  #$F0
  0x04860E $85FE: C-----  F8       SED  
  0x04860F $85FF: C-----  F0 00    BEQ  $8601
  0x048611 $8601: C-----  00       BRK  
  0x048612 $8602: C-----  00       BRK  
  0x048613 $8603: C-----  00       BRK  
  0x048614 $8604: C-----  00       BRK  
  0x048615 $8605: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048616 $8606: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x048617 $8607: C-----  08       PHP  
  0x048618 $8608: C-----  00       BRK  
  0x048619 $8609: C-----  00       BRK  
  0x04861A $860A: C-----  00       BRK  
  0x04861B $860B: C-----  00       BRK  
  0x04861C $860C: C-----  00       BRK  
  0x04861D $860D: C-----  00       BRK  
  0x04861E $860E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04861F $860F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048620 $8610: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048621 $8611: C-----  06 D8    ASL  $D8
  0x048623 $8613: C-----  E0 80    CPX  #$80
  0x048625 $8615: C-----  00       BRK  
  0x048626 $8616: C-----  00       BRK  
  0x048627 $8617: C-----  00       BRK  
  0x048628 $8618: C-----  F8       SED  
  0x048629 $8619: C-----  F8       SED  
  0x04862A $861A: C-----  60       RTS  
  0x04862B $861B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04862C $861C: C-----  00       BRK  
  0x04862D $861D: C-----  00       BRK  
  0x04862E $861E: C-----  00       BRK  
  0x04862F $861F: C-----  00       BRK  
  0x048630 $8620: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048631 $8621: C-----  08       PHP  
  0x048632 $8622: C-----  F0 C0    BEQ  $85E4
  0x048634 $8624: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048635 $8625: C-----  00       BRK  
  0x048636 $8626: C-----  00       BRK  
  0x048637 $8627: C-----  00       BRK  
  0x048638 $8628: C-----  F8       SED  
  0x048639 $8629: C-----  F0 00    BEQ  $862B
  0x04863B $862B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04863C $862C: C-----  00       BRK  
  0x04863D $862D: C-----  00       BRK  
  0x04863E $862E: C-----  00       BRK  
  0x04863F $862F: C-----  00       BRK  
  0x048640 $8630: C-----  00       BRK  
  0x048641 $8631: C-----  00       BRK  
  0x048642 $8632: C-----  01 03    ORA  ($03,X)
  0x048644 $8634: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048645 $8635: C-----  09 38    ORA  #$38
  0x048647 $8637: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x048648 $8638: C-----  00       BRK  
  0x048649 $8639: C-----  00       BRK  
  0x04864A $863A: C-----  00       BRK  
  0x04864B $863B: C-----  01 01    ORA  ($01,X)
  0x04864D $863D: C-----  06 07    ASL  $07
  0x04864F $863F: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x048650 $8640: C-----  00       BRK  
  0x048651 $8641: C-----  00       BRK  
  0x048652 $8642: C-----  00       BRK  
  0x048653 $8643: C-----  00       BRK  
  0x048654 $8644: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x048655 $8645: C-----  1E 1E 3C ASL  $3C1E,X
  0x048658 $8648: C-----  00       BRK  
  0x048659 $8649: C-----  00       BRK  
  0x04865A $864A: C-----  00       BRK  
  0x04865B $864B: C-----  00       BRK  
  0x04865C $864C: C-----  00       BRK  
  0x04865D $864D: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04865E $864E: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04865F $864F: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x048660 $8650: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x048661 $8651: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x048662 $8652: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048663 $8653: C-----  7E 7F 3F ROR  $3F7F,X
  0x048666 $8656: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x048667 $8657: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x048668 $8658: C-----  00       BRK  
  0x048669 $8659: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04866A $865A: C-----  1E 30 3C ASL  $3C30,X
  0x04866D $865D: C-----  1E 0F 0F ASL  $0F0F,X
  0x048670 $8660: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x048671 $8661: C-----  F8       SED  
  0x048672 $8662: C-----  F8       SED  
  0x048673 $8663: C-----  F0 F0    BEQ  $8655
  0x048675 $8665: C-----  E0 C0    CPX  #$C0
  0x048677 $8667: C-----  40       RTI  
  0x048678 $8668: C-----  38       SEC  
  0x048679 $8669: C-----  70 F0    BVS  $865B
  0x04867B $866B: C-----  E0 E0    CPX  #$E0
  0x04867D $866D: C-----  C0 00    CPY  #$00
  0x04867F $866F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048680 $8670: C-----  00       BRK  
  0x048681 $8671: C-----  00       BRK  
  0x048682 $8672: C-----  00       BRK  
  0x048683 $8673: C-----  05 09    ORA  $09
  0x048685 $8675: C-----  0A       ASL  A
  0x048686 $8676: C-----  08       PHP  
  0x048687 $8677: C-----  08       PHP  
  0x048688 $8678: C-----  00       BRK  
  0x048689 $8679: C-----  00       BRK  
  0x04868A $867A: C-----  00       BRK  
  0x04868B $867B: C-----  00       BRK  
  0x04868C $867C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04868D $867D: C-----  05 07    ORA  $07
  0x04868F $867F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048690 $8680: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048691 $8681: C-----  28       PLP  
  0x048692 $8682: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x048693 $8683: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x048694 $8684: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048695 $8685: C-----  06 0A    ASL  $0A
  0x048697 $8687: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048698 $8688: C-----  00       BRK  
  0x048699 $8689: C-----  06 2C    ASL  $2C
  0x04869B $868B: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04869C $868C: C-----  F8       SED  
  0x04869D $868D: C-----  F8       SED  
  0x04869E $868E: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04869F $868F: C-----  F8       SED  
  0x0486A0 $8690: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0486A1 $8691: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0486A2 $8692: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0486A3 $8693: C-----  7E 7F 39 ROR  $397F,X
  0x0486A6 $8696: C-----  10 10    BPL  $86A8
  0x0486A8 $8698: C-----  00       BRK  
  0x0486A9 $8699: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0486AA $869A: C-----  1E 30 3C ASL  $3C30,X
  0x0486AD $869D: C-----  16 0F    ASL  $0F,X
  0x0486AF $869F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0486B0 $86A0: C-----  08       PHP  
  0x0486B1 $86A1: C-----  10 90    BPL  $8633
  0x0486B3 $86A3: C-----  E0 80    CPX  #$80
  0x0486B5 $86A5: C-----  00       BRK  
  0x0486B6 $86A6: C-----  00       BRK  
  0x0486B7 $86A7: C-----  00       BRK  
  0x0486B8 $86A8: C-----  F0 E0    BEQ  $868A
  0x0486BA $86AA: C-----  60       RTS  
  0x0486BB $86AB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0486BC $86AC: C-----  00       BRK  
  0x0486BD $86AD: C-----  00       BRK  
  0x0486BE $86AE: C-----  00       BRK  
  0x0486BF $86AF: C-----  00       BRK  
  0x0486C0 $86B0: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0486C1 $86B1: C-----  38       SEC  
  0x0486C2 $86B2: C-----  0E 05 1E ASL  $1E05
  0x0486C5 $86B5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0486C6 $86B6: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0486C7 $86B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0486C8 $86B8: C-----  00       BRK  
  0x0486C9 $86B9: C-----  00       BRK  
  0x0486CA $86BA: C-----  00       BRK  
  0x0486CB $86BB: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0486CC $86BC: C-----  05 1E    ORA  $1E
  0x0486CE $86BE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0486CF $86BF: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0486D0 $86C0: C-----  10 20    BPL  $86E2
  0x0486D2 $86C2: C-----  40       RTI  
  0x0486D3 $86C3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0486D4 $86C4: C-----  00       BRK  
  0x0486D5 $86C5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0486D6 $86C6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0486D7 $86C7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0486D8 $86C8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0486D9 $86C9: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0486DA $86CA: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0486DB $86CB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0486DC $86CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0486DD $86CD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0486DE $86CE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0486DF $86CF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0486E0 $86D0: C-----  28       PLP  
  0x0486E1 $86D1: C-----  18       CLC  
  0x0486E2 $86D2: C-----  10 10    BPL  $86E4
  0x0486E4 $86D4: C-----  10 10    BPL  $86E6
  0x0486E6 $86D6: C-----  20 20 D0 JSR  $D020
  0x0486E9 $86D9: C-----  E0 E0    CPX  #$E0
  0x0486EB $86DB: C-----  E0 E0    CPX  #$E0
  0x0486ED $86DD: C-----  E0 C0    CPX  #$C0
  0x0486EF $86DF: C-----  C0 02    CPY  #$02
  0x0486F1 $86E1: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0486F2 $86E2: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0486F3 $86E3: C-----  05 F9    ORA  $F9
  0x0486F5 $86E5: C-----  01 81    ORA  ($81,X)
  0x0486F7 $86E7: C-----  86 00    STX  $00
  0x0486F9 $86E9: C-----  00       BRK  
  0x0486FA $86EA: C-----  00       BRK  
  0x0486FB $86EB: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0486FC $86EC: C-----  06 FE    ASL  $FE
  0x0486FE $86EE: C-----  7E 78 00 ROR  $0078,X
  0x048701 $86F1: C-----  00       BRK  
  0x048702 $86F2: C-----  00       BRK  
  0x048703 $86F3: C-----  00       BRK  
  0x048704 $86F4: C-----  40       RTI  
  0x048705 $86F5: C-----  A0 10    LDY  #$10
  0x048707 $86F7: C-----  10 00    BPL  $86F9
  0x048709 $86F9: C-----  00       BRK  
  0x04870A $86FA: C-----  00       BRK  
  0x04870B $86FB: C-----  00       BRK  
  0x04870C $86FC: C-----  00       BRK  
  0x04870D $86FD: C-----  40       RTI  
  0x04870E $86FE: C-----  E0 E0    CPX  #$E0
  0x048710 $8700: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x048711 $8701: C-----  38       SEC  
  0x048712 $8702: C-----  0E 05 1E ASL  $1E05
  0x048715 $8705: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048716 $8706: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x048717 $8707: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048718 $8708: C-----  38       SEC  
  0x048719 $8709: C-----  00       BRK  
  0x04871A $870A: C-----  00       BRK  
  0x04871B $870B: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04871C $870C: C-----  05 1E    ORA  $1E
  0x04871E $870E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04871F $870F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x048720 $8710: C-----  00       BRK  
  0x048721 $8711: C-----  F0 F8    BEQ  $870B
  0x048723 $8713: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048724 $8714: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048725 $8715: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x048726 $8716: C-----  7E 7E 00 ROR  $007E,X
  0x048729 $8719: C-----  00       BRK  
  0x04872A $871A: C-----  F0 F8    BEQ  $8714
  0x04872C $871C: C-----  38       SEC  
  0x04872D $871D: C-----  38       SEC  
  0x04872E $871E: C-----  38       SEC  
  0x04872F $871F: C-----  20 32 46 JSR  $4632
  0x048732 $8722: C-----  9A       TXS  
  0x048733 $8723: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048734 $8724: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048735 $8725: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048736 $8726: C-----  0A       ASL  A
  0x048737 $8727: C-----  0E 00 20 ASL  $2000
  0x04873A $872A: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x04873B $872B: C-----  F8       SED  
  0x04873C $872C: C-----  F8       SED  
  0x04873D $872D: C-----  F8       SED  
  0x04873E $872E: C-----  F0 F0    BEQ  $8720
  0x048740 $8730: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x048741 $8731: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x048742 $8732: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x048743 $8733: C-----  05 F9    ORA  $F9
  0x048745 $8735: C-----  01 81    ORA  ($81,X)
  0x048747 $8737: C-----  86 FC    STX  $FC
  0x048749 $8739: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04874A $873A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04874B $873B: C-----  F8       SED  
  0x04874C $873C: C-----  00       BRK  
  0x04874D $873D: C-----  00       BRK  
  0x04874E $873E: C-----  00       BRK  
  0x04874F $873F: C-----  00       BRK  
  0x048750 $8740: C-----  00       BRK  
  0x048751 $8741: C-----  00       BRK  
  0x048752 $8742: C-----  00       BRK  
  0x048753 $8743: C-----  00       BRK  
  0x048754 $8744: C-----  00       BRK  
  0x048755 $8745: C-----  06 09    ASL  $09
  0x048757 $8747: C-----  11 00    ORA  ($00),Y
  0x048759 $8749: C-----  00       BRK  
  0x04875A $874A: C-----  00       BRK  
  0x04875B $874B: C-----  00       BRK  
  0x04875C $874C: C-----  00       BRK  
  0x04875D $874D: C-----  00       BRK  
  0x04875E $874E: C-----  06 0E    ASL  $0E
  0x048760 $8750: C-----  00       BRK  
  0x048761 $8751: C-----  00       BRK  
  0x048762 $8752: C-----  00       BRK  
  0x048763 $8753: C-----  00       BRK  
  0x048764 $8754: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048765 $8755: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x048766 $8756: C-----  08       PHP  
  0x048767 $8757: C-----  10 00    BPL  $8759
  0x048769 $8759: C-----  00       BRK  
  0x04876A $875A: C-----  00       BRK  
  0x04876B $875B: C-----  00       BRK  
  0x04876C $875C: C-----  00       BRK  
  0x04876D $875D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04876E $875E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04876F $875F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048770 $8760: C-----  00       BRK  
  0x048771 $8761: C-----  00       BRK  
  0x048772 $8762: C-----  00       BRK  
  0x048773 $8763: C-----  00       BRK  
  0x048774 $8764: C-----  01 06    ORA  ($06,X)
  0x048776 $8766: C-----  0A       ASL  A
  0x048777 $8767: C-----  08       PHP  
  0x048778 $8768: C-----  00       BRK  
  0x048779 $8769: C-----  00       BRK  
  0x04877A $876A: C-----  00       BRK  
  0x04877B $876B: C-----  00       BRK  
  0x04877C $876C: C-----  00       BRK  
  0x04877D $876D: C-----  01 05    ORA  ($05,X)
  0x04877F $876F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048780 $8770: C-----  10 10    BPL  $8782
  0x048782 $8772: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x048783 $8773: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048784 $8774: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048785 $8775: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048786 $8776: C-----  00       BRK  
  0x048787 $8777: C-----  00       BRK  
  0x048788 $8778: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048789 $8779: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04878A $877A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04878B $877B: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04878C $877C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04878D $877D: C-----  00       BRK  
  0x04878E $877E: C-----  00       BRK  
  0x04878F $877F: C-----  00       BRK  
  0x048790 $8780: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048791 $8781: C-----  08       PHP  
  0x048792 $8782: C-----  30 E0    BMI  $8764
  0x048794 $8784: C-----  C0 00    CPY  #$00
  0x048796 $8786: C-----  00       BRK  
  0x048797 $8787: C-----  00       BRK  
  0x048798 $8788: C-----  F8       SED  
  0x048799 $8789: C-----  F0 C0    BEQ  $874B
  0x04879B $878B: C-----  40       RTI  
  0x04879C $878C: C-----  00       BRK  
  0x04879D $878D: C-----  00       BRK  
  0x04879E $878E: C-----  00       BRK  
  0x04879F $878F: C-----  00       BRK  
  0x0487A0 $8790: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0487A1 $8791: C-----  CE 28 28 DEC  $2828
  0x0487A4 $8794: C-----  30 20    BMI  $87B6
  0x0487A6 $8796: C-----  C0 00    CPY  #$00
  0x0487A8 $8798: C-----  EE 30 D0 INC  $D030
  0x0487AB $879B: C-----  D0 C0    BNE  $875D
  0x0487AD $879D: C-----  C0 00    CPY  #$00
  0x0487AF $879F: C-----  00       BRK  
  0x0487B0 $87A0: C-----  10 18    BPL  $87BA
  0x0487B2 $87A2: C-----  0A       ASL  A
  0x0487B3 $87A3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0487B4 $87A4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0487B5 $87A5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0487B6 $87A6: C-----  00       BRK  
  0x0487B7 $87A7: C-----  00       BRK  
  0x0487B8 $87A8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0487B9 $87A9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0487BA $87AA: C-----  05 02    ORA  $02
  0x0487BC $87AC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0487BD $87AD: C-----  00       BRK  
  0x0487BE $87AE: C-----  00       BRK  
  0x0487BF $87AF: C-----  00       BRK  
  0x0487C0 $87B0: C-----  6E 54 EC ROR  $EC54
  0x0487C3 $87B3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0487C4 $87B4: C-----  78       SEI  
  0x0487C5 $87B5: C-----  00       BRK  
  0x0487C6 $87B6: C-----  00       BRK  
  0x0487C7 $87B7: C-----  00       BRK  
  0x0487C8 $87B8: C-----  10 28    BPL  $87E2
  0x0487CA $87BA: C-----  10 00    BPL  $87BC
  0x0487CC $87BC: C-----  00       BRK  
  0x0487CD $87BD: C-----  00       BRK  
  0x0487CE $87BE: C-----  00       BRK  
  0x0487CF $87BF: C-----  00       BRK  
  0x0487D0 $87C0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0487D1 $87C1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0487D2 $87C2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0487D3 $87C3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0487D4 $87C4: C-----  1E 0C 06 ASL  $060C,X
  0x0487D7 $87C7: C-----  01 06    ORA  ($06,X)
  0x0487D9 $87C9: C-----  3E 1E 1C ROL  $1C1E,X
  0x0487DC $87CC: C-----  0D 03 01 ORA  $0103
  0x0487DF $87CF: C-----  00       BRK  
  0x0487E0 $87D0: C-----  00       BRK  
  0x0487E1 $87D1: C-----  00       BRK  
  0x0487E2 $87D2: C-----  20 30 50 JSR  $5030
  0x0487E5 $87D5: C-----  90 08    BCC  $87DF
  0x0487E7 $87D7: C-----  08       PHP  
  0x0487E8 $87D8: C-----  00       BRK  
  0x0487E9 $87D9: C-----  00       BRK  
  0x0487EA $87DA: C-----  00       BRK  
  0x0487EB $87DB: C-----  00       BRK  
  0x0487EC $87DC: C-----  20 60 F0 JSR  $F060
  0x0487EF $87DF: C-----  F0 10    BEQ  $87F1
  0x0487F1 $87E1: C-----  18       CLC  
  0x0487F2 $87E2: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0487F3 $87E3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0487F4 $87E4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0487F5 $87E5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0487F6 $87E6: C-----  00       BRK  
  0x0487F7 $87E7: C-----  00       BRK  
  0x0487F8 $87E8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0487F9 $87E9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0487FA $87EA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0487FB $87EB: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0487FC $87EC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0487FD $87ED: C-----  00       BRK  
  0x0487FE $87EE: C-----  00       BRK  
  0x0487FF $87EF: C-----  00       BRK  
  0x048800 $87F0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048801 $87F1: C-----  C0 60    CPY  #$60
  0x048803 $87F3: C-----  E0 E0    CPX  #$E0
  0x048805 $87F5: C-----  C0 00    CPY  #$00
  0x048807 $87F7: C-----  00       BRK  
  0x048808 $87F8: C-----  00       BRK  
  0x048809 $87F9: C-----  00       BRK  
  0x04880A $87FA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04880B $87FB: C-----  00       BRK  
  0x04880C $87FC: C-----  00       BRK  
  0x04880D $87FD: C-----  00       BRK  
  0x04880E $87FE: C-----  00       BRK  
  0x04880F $87FF: C-----  00       BRK  
  0x048810 $8800: ------  .byte $00
  0x048811 $8801: ------  .byte $00
  0x048812 $8802: ------  .byte $00
  0x048813 $8803: ------  .byte $00
  0x048814 $8804: ------  .byte $00
  0x048815 $8805: ------  .byte $00
  0x048816 $8806: ------  .byte $00
  0x048817 $8807: ------  .byte $00
  0x048818 $8808: ------  .byte $00
  0x048819 $8809: ------  .byte $00
  0x04881A $880A: ------  .byte $00
  0x04881B $880B: ------  .byte $00
  0x04881C $880C: ------  .byte $00
  0x04881D $880D: ------  .byte $00
  0x04881E $880E: ------  .byte $00
  0x04881F $880F: ------  .byte $00
  0x048820 $8810: ------  .byte $FF
  0x048821 $8811: ------  .byte $FF
  0x048822 $8812: ------  .byte $FF
  0x048823 $8813: ------  .byte $FF
  0x048824 $8814: ------  .byte $FF
  0x048825 $8815: ------  .byte $FF
  0x048826 $8816: ------  .byte $FF
  0x048827 $8817: ------  .byte $FF
  0x048828 $8818: ------  .byte $00
  0x048829 $8819: ------  .byte $00
  0x04882A $881A: ------  .byte $00
  0x04882B $881B: ------  .byte $00
  0x04882C $881C: ------  .byte $00
  0x04882D $881D: ------  .byte $00
  0x04882E $881E: ------  .byte $00
  0x04882F $881F: ------  .byte $00
  0x048830 $8820: C-----  00       BRK  
  0x048831 $8821: C-----  01 02    ORA  ($02,X)
  0x048833 $8823: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048834 $8824: C-----  08       PHP  
  0x048835 $8825: C-----  1E 21 40 ASL  $4021,X
  0x048838 $8828: C-----  00       BRK  
  0x048839 $8829: C-----  00       BRK  
  0x04883A $882A: C-----  00       BRK  
  0x04883B $882B: C-----  00       BRK  
  0x04883C $882C: C-----  00       BRK  
  0x04883D $882D: C-----  00       BRK  
  0x04883E $882E: C-----  1E 3F 88 ASL  $883F,X
  0x048841 $8831: C-----  08       PHP  
  0x048842 $8832: C-----  08       PHP  
  0x048843 $8833: C-----  10 60    BPL  $8895
  0x048845 $8835: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048846 $8836: C-----  00       BRK  
  0x048847 $8837: C-----  00       BRK  
  0x048848 $8838: C-----  70 F0    BVS  $882A
  0x04884A $883A: C-----  F0 E0    BEQ  $881C
  0x04884C $883C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04884D $883D: C-----  00       BRK  
  0x04884E $883E: C-----  00       BRK  
  0x04884F $883F: C-----  00       BRK  
  0x048850 $8840: C-----  00       BRK  
  0x048851 $8841: C-----  00       BRK  
  0x048852 $8842: C-----  00       BRK  
  0x048853 $8843: C-----  00       BRK  
  0x048854 $8844: C-----  00       BRK  
  0x048855 $8845: C-----  F0 8C    BEQ  $87D3
  0x048857 $8847: C-----  84 00    STY  $00
  0x048859 $8849: C-----  00       BRK  
  0x04885A $884A: C-----  00       BRK  
  0x04885B $884B: C-----  00       BRK  
  0x04885C $884C: C-----  00       BRK  
  0x04885D $884D: C-----  00       BRK  
  0x04885E $884E: C-----  70 78    BVS  $88C8
  0x048860 $8850: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048861 $8851: C-----  0E 1E 1F ASL  $1F1E
  0x048864 $8854: C-----  1E 3C 7C ASL  $7C3C,X
  0x048867 $8857: C-----  F8       SED  
  0x048868 $8858: C-----  00       BRK  
  0x048869 $8859: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04886A $885A: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04886B $885B: C-----  0E 0C 18 ASL  $180C
  0x04886E $885E: C-----  38       SEC  
  0x04886F $885F: C-----  70 00    BVS  $8861
  0x048871 $8861: C-----  01 03    ORA  ($03,X)
  0x048873 $8863: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048874 $8864: C-----  08       PHP  
  0x048875 $8865: C-----  10 20    BPL  $8887
  0x048877 $8867: C-----  40       RTI  
  0x048878 $8868: C-----  00       BRK  
  0x048879 $8869: C-----  00       BRK  
  0x04887A $886A: C-----  00       BRK  
  0x04887B $886B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04887C $886C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04887D $886D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04887E $886E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04887F $886F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048880 $8870: C-----  F8       SED  
  0x048881 $8871: C-----  F8       SED  
  0x048882 $8872: C-----  F0 30    BEQ  $88A4
  0x048884 $8874: C-----  10 10    BPL  $8886
  0x048886 $8876: C-----  20 20 70 JSR  $7020
  0x048889 $8879: C-----  F0 20    BEQ  $889B
  0x04888B $887B: C-----  C0 E0    CPY  #$E0
  0x04888D $887D: C-----  E0 C0    CPX  #$C0
  0x04888F $887F: C-----  C0 03    CPY  #$03
  0x048891 $8881: C-----  05 0B    ORA  $0B
  0x048893 $8883: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x048894 $8884: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x048895 $8885: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x048896 $8886: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x048897 $8887: C-----  38       SEC  
  0x048898 $8888: C-----  00       BRK  
  0x048899 $8889: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04889A $888A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04889B $888B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04889C $888C: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x04889D $888D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04889E $888E: C-----  38       SEC  
  0x04889F $888F: C-----  00       BRK  
  0x0488A0 $8890: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0488A1 $8891: C-----  05 0B    ORA  $0B
  0x0488A3 $8893: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0488A4 $8894: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0488A5 $8895: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0488A6 $8896: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0488A7 $8897: C-----  38       SEC  
  0x0488A8 $8898: C-----  00       BRK  
  0x0488A9 $8899: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0488AA $889A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0488AB $889B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0488AC $889C: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x0488AD $889D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0488AE $889E: C-----  30 00    BMI  $88A0
  0x0488B0 $88A0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0488B1 $88A1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0488B2 $88A2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0488B3 $88A3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0488B4 $88A4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0488B5 $88A5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0488B6 $88A6: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0488B7 $88A7: C-----  38       SEC  
  0x0488B8 $88A8: C-----  00       BRK  
  0x0488B9 $88A9: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0488BA $88AA: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0488BB $88AB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0488BC $88AC: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x0488BD $88AD: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0488BE $88AE: C-----  30 00    BMI  $88B0
  0x0488C0 $88B0: C-----  01 01    ORA  ($01,X)
  0x0488C2 $88B2: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0488C3 $88B3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0488C4 $88B4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0488C5 $88B5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0488C6 $88B6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0488C7 $88B7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0488C8 $88B8: C-----  00       BRK  
  0x0488C9 $88B9: C-----  00       BRK  
  0x0488CA $88BA: C-----  01 03    ORA  ($03,X)
  0x0488CC $88BC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0488CD $88BD: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0488CE $88BE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0488CF $88BF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0488D0 $88C0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0488D1 $88C1: C-----  00       BRK  
  0x0488D2 $88C2: C-----  00       BRK  
  0x0488D3 $88C3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0488D4 $88C4: C-----  C0 80    CPY  #$80
  0x0488D6 $88C6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0488D7 $88C7: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x0488D8 $88C8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0488D9 $88C9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0488DA $88CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0488DB $88CB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0488DC $88CC: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0488DD $88CD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0488DE $88CE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0488DF $88CF: C-----  38       SEC  
  0x0488E0 $88D0: C-----  20 20 20 JSR  $2020
  0x0488E3 $88D3: C-----  60       RTS  
  0x0488E4 $88D4: C-----  40       RTI  
  0x0488E5 $88D5: C-----  40       RTI  
  0x0488E6 $88D6: C-----  40       RTI  
  0x0488E7 $88D7: C-----  C0 C0    CPY  #$C0
  0x0488E9 $88D9: C-----  C0 C0    CPY  #$C0
  0x0488EB $88DB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0488EC $88DC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0488ED $88DD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0488EE $88DE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0488EF $88DF: C-----  00       BRK  
  0x0488F0 $88E0: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0488F1 $88E1: C-----  60       RTS  
  0x0488F2 $88E2: C-----  F0 F8    BEQ  $88DC
  0x0488F4 $88E4: C-----  F8       SED  
  0x0488F5 $88E5: C-----  F8       SED  
  0x0488F6 $88E6: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0488F7 $88E7: C-----  F8       SED  
  0x0488F8 $88E8: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0488F9 $88E9: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0488FA $88EA: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0488FB $88EB: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0488FC $88EC: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0488FD $88ED: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0488FE $88EE: C-----  E8       INX  
  0x0488FF $88EF: C-----  00       BRK  
  0x048900 $88F0: C-----  00       BRK  
  0x048901 $88F1: C-----  01 02    ORA  ($02,X)
  0x048903 $88F3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048904 $88F4: C-----  08       PHP  
  0x048905 $88F5: C-----  1E 21 40 ASL  $4021,X
  0x048908 $88F8: C-----  00       BRK  
  0x048909 $88F9: C-----  00       BRK  
  0x04890A $88FA: C-----  01 03    ORA  ($03,X)
  0x04890C $88FC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04890D $88FD: C-----  01 00    ORA  ($00,X)
  0x04890F $88FF: C-----  00       BRK  
  0x048910 $8900: C-----  F8       SED  
  0x048911 $8901: C-----  F8       SED  
  0x048912 $8902: C-----  F0 F0    BEQ  $88F4
  0x048914 $8904: C-----  F0 E0    BEQ  $88E6
  0x048916 $8906: C-----  E0 60    CPX  #$60
  0x048918 $8908: C-----  70 F0    BVS  $88FA
  0x04891A $890A: C-----  E0 E0    CPX  #$E0
  0x04891C $890C: C-----  E0 C0    CPX  #$C0
  0x04891E $890E: C-----  40       RTI  
  0x04891F $890F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048920 $8910: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048921 $8911: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x048922 $8912: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048923 $8913: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048924 $8914: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048925 $8915: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048926 $8916: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x048927 $8917: C-----  84 06    STY  $06
  0x048929 $8919: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04892A $891A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04892B $891B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04892C $891C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04892D $891D: C-----  0E 70 78 ASL  $7870
  0x048930 $8920: C-----  E0 20    CPX  #$20
  0x048932 $8922: C-----  20 60 40 JSR  $4060
  0x048935 $8925: C-----  40       RTI  
  0x048936 $8926: C-----  40       RTI  
  0x048937 $8927: C-----  C0 00    CPY  #$00
  0x048939 $8929: C-----  C0 C0    CPY  #$C0
  0x04893B $892B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04893C $892C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04893D $892D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04893E $892E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04893F $892F: C-----  00       BRK  
  0x048940 $8930: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x048941 $8931: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x048942 $8932: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x048943 $8933: C-----  24 26    BIT  $26
  0x048945 $8935: C-----  2E 1E 1C ROL  $1C1E
  0x048948 $8938: C-----  38       SEC  
  0x048949 $8939: C-----  38       SEC  
  0x04894A $893A: C-----  38       SEC  
  0x04894B $893B: C-----  18       CLC  
  0x04894C $893C: C-----  18       CLC  
  0x04894D $893D: C-----  10 00    BPL  $893F
  0x04894F $893F: C-----  18       CLC  
  0x048950 $8940: C-----  60       RTS  
  0x048951 $8941: C-----  A0 A0    LDY  #$A0
  0x048953 $8943: C-----  A0 A0    LDY  #$A0
  0x048955 $8945: C-----  40       RTI  
  0x048956 $8946: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048957 $8947: C-----  00       BRK  
  0x048958 $8948: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048959 $8949: C-----  40       RTI  
  0x04895A $894A: C-----  40       RTI  
  0x04895B $894B: C-----  40       RTI  
  0x04895C $894C: C-----  40       RTI  
  0x04895D $894D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04895E $894E: C-----  00       BRK  
  0x04895F $894F: C-----  00       BRK  
  0x048960 $8950: C-----  00       BRK  
  0x048961 $8951: C-----  00       BRK  
  0x048962 $8952: C-----  00       BRK  
  0x048963 $8953: C-----  00       BRK  
  0x048964 $8954: C-----  00       BRK  
  0x048965 $8955: C-----  38       SEC  
  0x048966 $8956: C-----  7E 9F 00 ROR  $009F,X
  0x048969 $8959: C-----  00       BRK  
  0x04896A $895A: C-----  00       BRK  
  0x04896B $895B: C-----  00       BRK  
  0x04896C $895C: C-----  00       BRK  
  0x04896D $895D: C-----  00       BRK  
  0x04896E $895E: C-----  18       CLC  
  0x04896F $895F: C-----  6E 01 7F ROR  $7F01
  0x048972 $8962: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x048973 $8963: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x048974 $8964: C-----  11 0D    ORA  ($0D),Y
  0x048976 $8966: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048977 $8967: C-----  00       BRK  
  0x048978 $8968: C-----  00       BRK  
  0x048979 $8969: C-----  00       BRK  
  0x04897A $896A: C-----  30 1C    BMI  $8988
  0x04897C $896C: C-----  0E 02 00 ASL  $0002
  0x04897F $896F: C-----  00       BRK  
  0x048980 $8970: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x048981 $8971: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048982 $8972: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048983 $8973: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x048984 $8974: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x048985 $8975: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x048986 $8976: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048987 $8977: C-----  00       BRK  
  0x048988 $8978: C-----  76 F7    ROR  $F7,X
  0x04898A $897A: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04898B $897B: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04898C $897C: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04898D $897D: C-----  06 00    ASL  $00
  0x04898F $897F: C-----  00       BRK  
  0x048990 $8980: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048991 $8981: C-----  0E 1E 1F ASL  $1F1E
  0x048994 $8984: C-----  1E 2C 44 ASL  $442C,X
  0x048997 $8987: C-----  88       DEY  
  0x048998 $8988: C-----  00       BRK  
  0x048999 $8989: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04899A $898A: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04899B $898B: C-----  0E 0C 10 ASL  $100C
  0x04899E $898E: C-----  38       SEC  
  0x04899F $898F: C-----  70 1C    BVS  $89AD
  0x0489A1 $8991: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0489A2 $8992: C-----  18       CLC  
  0x0489A3 $8993: C-----  18       CLC  
  0x0489A4 $8994: C-----  00       BRK  
  0x0489A5 $8995: C-----  00       BRK  
  0x0489A6 $8996: C-----  00       BRK  
  0x0489A7 $8997: C-----  00       BRK  
  0x0489A8 $8998: C-----  00       BRK  
  0x0489A9 $8999: C-----  00       BRK  
  0x0489AA $899A: C-----  00       BRK  
  0x0489AB $899B: C-----  00       BRK  
  0x0489AC $899C: C-----  00       BRK  
  0x0489AD $899D: C-----  00       BRK  
  0x0489AE $899E: C-----  00       BRK  
  0x0489AF $899F: C-----  00       BRK  
  0x0489B0 $89A0: C-----  88       DEY  
  0x0489B1 $89A1: C-----  08       PHP  
  0x0489B2 $89A2: C-----  10 10    BPL  $89B4
  0x0489B4 $89A4: C-----  10 10    BPL  $89B6
  0x0489B6 $89A6: C-----  A0 E0    LDY  #$E0
  0x0489B8 $89A8: C-----  70 F0    BVS  $899A
  0x0489BA $89AA: C-----  E0 E0    CPX  #$E0
  0x0489BC $89AC: C-----  E0 E0    CPX  #$E0
  0x0489BE $89AE: C-----  40       RTI  
  0x0489BF $89AF: C-----  00       BRK  
  0x0489C0 $89B0: C-----  00       BRK  
  0x0489C1 $89B1: C-----  00       BRK  
  0x0489C2 $89B2: C-----  00       BRK  
  0x0489C3 $89B3: C-----  00       BRK  
  0x0489C4 $89B4: C-----  00       BRK  
  0x0489C5 $89B5: C-----  38       SEC  
  0x0489C6 $89B6: C-----  66 81    ROR  $81
  0x0489C8 $89B8: C-----  00       BRK  
  0x0489C9 $89B9: C-----  00       BRK  
  0x0489CA $89BA: C-----  00       BRK  
  0x0489CB $89BB: C-----  00       BRK  
  0x0489CC $89BC: C-----  00       BRK  
  0x0489CD $89BD: C-----  00       BRK  
  0x0489CE $89BE: C-----  18       CLC  
  0x0489CF $89BF: C-----  7E 39 60 ROR  $6039,X
  0x0489D2 $89C2: C-----  C0 80    CPY  #$80
  0x0489D4 $89C4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0489D5 $89C5: C-----  81 8F    STA  ($8F,X)
  0x0489D7 $89C7: C-----  84 06    STY  $06
  0x0489D9 $89C9: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0489DA $89CA: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0489DB $89CB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0489DC $89CC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0489DD $89CD: C-----  7E 70 78 ROR  $7870,X
  0x0489E0 $89D0: C-----  60       RTS  
  0x0489E1 $89D1: C-----  20 20 20 JSR  $2020
  0x0489E4 $89D4: C-----  20 40 80 JSR  $8040
  0x0489E7 $89D7: C-----  00       BRK  
  0x0489E8 $89D8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0489E9 $89D9: C-----  C0 C0    CPY  #$C0
  0x0489EB $89DB: C-----  C0 C0    CPY  #$C0
  0x0489ED $89DD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0489EE $89DE: C-----  00       BRK  
  0x0489EF $89DF: C-----  00       BRK  
  0x0489F0 $89E0: C-----  00       BRK  
  0x0489F1 $89E1: C-----  00       BRK  
  0x0489F2 $89E2: C-----  00       BRK  
  0x0489F3 $89E3: C-----  00       BRK  
  0x0489F4 $89E4: C-----  00       BRK  
  0x0489F5 $89E5: C-----  38       SEC  
  0x0489F6 $89E6: C-----  66 F1    ROR  $F1
  0x0489F8 $89E8: C-----  00       BRK  
  0x0489F9 $89E9: C-----  00       BRK  
  0x0489FA $89EA: C-----  00       BRK  
  0x0489FB $89EB: C-----  00       BRK  
  0x0489FC $89EC: C-----  00       BRK  
  0x0489FD $89ED: C-----  00       BRK  
  0x0489FE $89EE: C-----  18       CLC  
  0x0489FF $89EF: C-----  0E 00 00 ASL  $0000
  0x048A02 $89F2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048A03 $89F3: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x048A04 $89F4: C-----  40       RTI  
  0x048A05 $89F5: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x048A06 $89F6: C-----  A0 F2    LDY  #$F2
  0x048A08 $89F8: C-----  00       BRK  
  0x048A09 $89F9: C-----  00       BRK  
  0x048A0A $89FA: C-----  00       BRK  
  0x048A0B $89FB: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048A0C $89FC: C-----  3E 7C 5E ROL  $5E7C,X
  0x048A0F $89FF: C-----  2C 00 00 BIT  $0000
  0x048A12 $8A02: C-----  00       BRK  
  0x048A13 $8A03: C-----  00       BRK  
  0x048A14 $8A04: C-----  00       BRK  
  0x048A15 $8A05: C-----  00       BRK  
  0x048A16 $8A06: C-----  01 01    ORA  ($01,X)
  0x048A18 $8A08: C-----  00       BRK  
  0x048A19 $8A09: C-----  00       BRK  
  0x048A1A $8A0A: C-----  00       BRK  
  0x048A1B $8A0B: C-----  00       BRK  
  0x048A1C $8A0C: C-----  00       BRK  
  0x048A1D $8A0D: C-----  00       BRK  
  0x048A1E $8A0E: C-----  00       BRK  
  0x048A1F $8A0F: C-----  00       BRK  
  0x048A20 $8A10: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x048A21 $8A11: C-----  39 46 42 AND  $4246,Y
  0x048A24 $8A14: C-----  84 84    STY  $84
  0x048A26 $8A16: C-----  08       PHP  
  0x048A27 $8A17: C-----  10 1C    BPL  $8A35
  0x048A29 $8A19: C-----  06 38    ASL  $38
  0x048A2B $8A1B: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x048A2C $8A1C: C-----  78       SEI  
  0x048A2D $8A1D: C-----  78       SEI  
  0x048A2E $8A1E: C-----  F0 E0    BEQ  $8A00
  0x048A30 $8A20: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048A31 $8A21: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x048A32 $8A22: C-----  06 0F    ASL  $0F
  0x048A34 $8A24: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048A35 $8A25: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x048A36 $8A26: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x048A37 $8A27: C-----  1E 00 01 ASL  $0100,X
  0x048A3A $8A2A: C-----  01 00    ORA  ($00,X)
  0x048A3C $8A2C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048A3D $8A2D: C-----  00       BRK  
  0x048A3E $8A2E: C-----  00       BRK  
  0x048A3F $8A2F: C-----  00       BRK  
  0x048A40 $8A30: C-----  20 40 40 JSR  $4040
  0x048A43 $8A33: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048A44 $8A34: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048A45 $8A35: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048A46 $8A36: C-----  00       BRK  
  0x048A47 $8A37: C-----  00       BRK  
  0x048A48 $8A38: C-----  C0 80    CPY  #$80
  0x048A4A $8A3A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048A4B $8A3B: C-----  00       BRK  
  0x048A4C $8A3C: C-----  00       BRK  
  0x048A4D $8A3D: C-----  00       BRK  
  0x048A4E $8A3E: C-----  00       BRK  
  0x048A4F $8A3F: C-----  00       BRK  
  0x048A50 $8A40: C-----  01 01    ORA  ($01,X)
  0x048A52 $8A42: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x048A53 $8A43: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048A54 $8A44: C-----  08       PHP  
  0x048A55 $8A45: C-----  10 10    BPL  $8A57
  0x048A57 $8A47: C-----  30 00    BMI  $8A49
  0x048A59 $8A49: C-----  00       BRK  
  0x048A5A $8A4A: C-----  01 03    ORA  ($03,X)
  0x048A5C $8A4C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048A5D $8A4D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048A5E $8A4E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048A5F $8A4F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048A60 $8A50: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x048A61 $8A51: C-----  00       BRK  
  0x048A62 $8A52: C-----  00       BRK  
  0x048A63 $8A53: C-----  00       BRK  
  0x048A64 $8A54: C-----  00       BRK  
  0x048A65 $8A55: C-----  00       BRK  
  0x048A66 $8A56: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048A67 $8A57: C-----  F8       SED  
  0x048A68 $8A58: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x048A69 $8A59: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048A6A $8A5A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048A6B $8A5B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048A6C $8A5C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048A6D $8A5D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048A6E $8A5E: C-----  F8       SED  
  0x048A6F $8A5F: C-----  00       BRK  
  0x048A70 $8A60: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x048A71 $8A61: C-----  21 42    AND  ($42,X)
  0x048A73 $8A63: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x048A74 $8A64: C-----  84 84    STY  $84
  0x048A76 $8A66: C-----  08       PHP  
  0x048A77 $8A67: C-----  10 1C    BPL  $8A85
  0x048A79 $8A69: C-----  1E 3C 3C ASL  $3C3C,X
  0x048A7C $8A6C: C-----  78       SEI  
  0x048A7D $8A6D: C-----  78       SEI  
  0x048A7E $8A6E: C-----  F0 E0    BEQ  $8A50
  0x048A80 $8A70: C-----  00       BRK  
  0x048A81 $8A71: C-----  00       BRK  
  0x048A82 $8A72: C-----  00       BRK  
  0x048A83 $8A73: C-----  00       BRK  
  0x048A84 $8A74: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048A85 $8A75: C-----  01 00    ORA  ($00,X)
  0x048A87 $8A77: C-----  00       BRK  
  0x048A88 $8A78: C-----  00       BRK  
  0x048A89 $8A79: C-----  00       BRK  
  0x048A8A $8A7A: C-----  00       BRK  
  0x048A8B $8A7B: C-----  00       BRK  
  0x048A8C $8A7C: C-----  00       BRK  
  0x048A8D $8A7D: C-----  00       BRK  
  0x048A8E $8A7E: C-----  00       BRK  
  0x048A8F $8A7F: C-----  00       BRK  
  0x048A90 $8A80: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x048A91 $8A81: C-----  2C 51 41 BIT  $4151
  0x048A94 $8A84: C-----  81 01    STA  ($01,X)
  0x048A96 $8A86: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x048A97 $8A87: C-----  F9 00 02 SBC  $0200,Y
  0x048A9A $8A8A: C-----  2E 3E 7E ROL  $7E3E
  0x048A9D $8A8D: C-----  FE DC 26 INC  $26DC,X
  0x048AA0 $8A90: C-----  00       BRK  
  0x048AA1 $8A91: C-----  00       BRK  
  0x048AA2 $8A92: C-----  00       BRK  
  0x048AA3 $8A93: C-----  00       BRK  
  0x048AA4 $8A94: C-----  01 0A    ORA  ($0A,X)
  0x048AA6 $8A96: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x048AA7 $8A97: C-----  29 00    AND  #$00
  0x048AA9 $8A99: C-----  00       BRK  
  0x048AAA $8A9A: C-----  00       BRK  
  0x048AAB $8A9B: C-----  00       BRK  
  0x048AAC $8A9C: C-----  00       BRK  
  0x048AAD $8A9D: C-----  01 03    ORA  ($03,X)
  0x048AAF $8A9F: C-----  16 FE    ASL  $FE,X
  0x048AB1 $8AA1: C-----  78       SEI  
  0x048AB2 $8AA2: C-----  30 00    BMI  $8AA4
  0x048AB4 $8AA4: C-----  00       BRK  
  0x048AB5 $8AA5: C-----  00       BRK  
  0x048AB6 $8AA6: C-----  00       BRK  
  0x048AB7 $8AA7: C-----  00       BRK  
  0x048AB8 $8AA8: C-----  78       SEI  
  0x048AB9 $8AA9: C-----  30 00    BMI  $8AAB
  0x048ABB $8AAB: C-----  00       BRK  
  0x048ABC $8AAC: C-----  00       BRK  
  0x048ABD $8AAD: C-----  00       BRK  
  0x048ABE $8AAE: C-----  00       BRK  
  0x048ABF $8AAF: C-----  00       BRK  
  0x048AC0 $8AB0: C-----  21 41    AND  ($41,X)
  0x048AC2 $8AB2: C-----  C0 80    CPY  #$80
  0x048AC4 $8AB4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048AC5 $8AB5: C-----  C0 69    CPY  #$69
  0x048AC7 $8AB7: C-----  F9 1E 3E SBC  $3E1E,Y
  0x048ACA $8ABA: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048ACB $8ABB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x048ACC $8ABC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x048ACD $8ABD: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048ACE $8ABE: C-----  56 26    LSR  $26,X
  0x048AD0 $8AC0: C-----  00       BRK  
  0x048AD1 $8AC1: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x048AD2 $8AC2: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x048AD3 $8AC3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048AD4 $8AC4: C-----  81 41    STA  ($41,X)
  0x048AD6 $8AC6: C-----  E9 FA    SBC  #$FA
  0x048AD8 $8AC8: C-----  00       BRK  
  0x048AD9 $8AC9: C-----  00       BRK  
  0x048ADA $8ACA: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x048ADB $8ACB: C-----  7E 7E BE ROR  $BE7E,X
  0x048ADE $8ACE: C-----  56 24    LSR  $24,X
  0x048AE0 $8AD0: C-----  00       BRK  
  0x048AE1 $8AD1: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x048AE2 $8AD2: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x048AE3 $8AD3: C-----  81 C9    STA  ($C9,X)
  0x048AE5 $8AD5: C-----  FD FF FE SBC  $FEFF,X
  0x048AE8 $8AD8: C-----  00       BRK  
  0x048AE9 $8AD9: C-----  00       BRK  
  0x048AEA $8ADA: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x048AEB $8ADB: C-----  7E 36 4A ROR  $4A36,X
  0x048AEE $8ADE: C-----  78       SEI  
  0x048AEF $8ADF: C-----  2C 40 40 BIT  $4040
  0x048AF2 $8AE2: C-----  40       RTI  
  0x048AF3 $8AE3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048AF4 $8AE4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048AF5 $8AE5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048AF6 $8AE6: C-----  00       BRK  
  0x048AF7 $8AE7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048AF8 $8AE8: C-----  00       BRK  
  0x048AF9 $8AE9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048AFA $8AEA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048AFB $8AEB: C-----  00       BRK  
  0x048AFC $8AEC: C-----  00       BRK  
  0x048AFD $8AED: C-----  00       BRK  
  0x048AFE $8AEE: C-----  00       BRK  
  0x048AFF $8AEF: C-----  00       BRK  
  0x048B00 $8AF0: C-----  00       BRK  
  0x048B01 $8AF1: C-----  00       BRK  
  0x048B02 $8AF2: C-----  00       BRK  
  0x048B03 $8AF3: C-----  00       BRK  
  0x048B04 $8AF4: C-----  01 02    ORA  ($02,X)
  0x048B06 $8AF6: C-----  01 00    ORA  ($00,X)
  0x048B08 $8AF8: C-----  00       BRK  
  0x048B09 $8AF9: C-----  00       BRK  
  0x048B0A $8AFA: C-----  00       BRK  
  0x048B0B $8AFB: C-----  00       BRK  
  0x048B0C $8AFC: C-----  00       BRK  
  0x048B0D $8AFD: C-----  01 00    ORA  ($00,X)
  0x048B0F $8AFF: C-----  00       BRK  
  0x048B10 $8B00: C-----  F8       SED  
  0x048B11 $8B01: C-----  18       CLC  
  0x048B12 $8B02: C-----  10 10    BPL  $8B14
  0x048B14 $8B04: C-----  10 10    BPL  $8B16
  0x048B16 $8B06: C-----  A0 E0    LDY  #$E0
  0x048B18 $8B08: C-----  10 E0    BPL  $8AEA
  0x048B1A $8B0A: C-----  E0 E0    CPX  #$E0
  0x048B1C $8B0C: C-----  E0 E0    CPX  #$E0
  0x048B1E $8B0E: C-----  40       RTI  
  0x048B1F $8B0F: C-----  00       BRK  
  0x048B20 $8B10: C-----  81 00    STA  ($00,X)
  0x048B22 $8B12: C-----  00       BRK  
  0x048B23 $8B13: C-----  10 60    BPL  $8B75
  0x048B25 $8B15: C-----  99 0F 00 STA  $000F,Y
  0x048B28 $8B18: C-----  7E FF FF ROR  $FFFF,X
  0x048B2B $8B1B: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x048B2C $8B1C: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x048B2D $8B1D: C-----  06 00    ASL  $00
  0x048B2F $8B1F: C-----  00       BRK  
  0x048B30 $8B20: C-----  00       BRK  
  0x048B31 $8B21: C-----  00       BRK  
  0x048B32 $8B22: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x048B33 $8B23: C-----  C6 02    DEC  $02
  0x048B35 $8B25: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x048B36 $8B26: C-----  CA       DEX  
  0x048B37 $8B27: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x048B38 $8B28: C-----  00       BRK  
  0x048B39 $8B29: C-----  00       BRK  
  0x048B3A $8B2A: C-----  00       BRK  
  0x048B3B $8B2B: C-----  38       SEC  
  0x048B3C $8B2C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048B3D $8B2D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048B3E $8B2E: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x048B3F $8B2F: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x048B40 $8B30: C-----  40       RTI  
  0x048B41 $8B31: C-----  C0 80    CPY  #$80
  0x048B43 $8B33: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048B44 $8B34: C-----  C0 80    CPY  #$80
  0x048B46 $8B36: C-----  00       BRK  
  0x048B47 $8B37: C-----  00       BRK  
  0x048B48 $8B38: C-----  00       BRK  
  0x048B49 $8B39: C-----  00       BRK  
  0x048B4A $8B3A: C-----  00       BRK  
  0x048B4B $8B3B: C-----  00       BRK  
  0x048B4C $8B3C: C-----  00       BRK  
  0x048B4D $8B3D: C-----  00       BRK  
  0x048B4E $8B3E: C-----  00       BRK  
  0x048B4F $8B3F: C-----  00       BRK  
  0x048B50 $8B40: C-----  00       BRK  
  0x048B51 $8B41: C-----  00       BRK  
  0x048B52 $8B42: C-----  00       BRK  
  0x048B53 $8B43: C-----  78       SEI  
  0x048B54 $8B44: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048B55 $8B45: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048B56 $8B46: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048B57 $8B47: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048B58 $8B48: C-----  00       BRK  
  0x048B59 $8B49: C-----  00       BRK  
  0x048B5A $8B4A: C-----  00       BRK  
  0x048B5B $8B4B: C-----  00       BRK  
  0x048B5C $8B4C: C-----  00       BRK  
  0x048B5D $8B4D: C-----  00       BRK  
  0x048B5E $8B4E: C-----  00       BRK  
  0x048B5F $8B4F: C-----  68       PLA  
  0x048B60 $8B50: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x048B61 $8B51: C-----  78       SEI  
  0x048B62 $8B52: C-----  30 00    BMI  $8B54
  0x048B64 $8B54: C-----  00       BRK  
  0x048B65 $8B55: C-----  00       BRK  
  0x048B66 $8B56: C-----  00       BRK  
  0x048B67 $8B57: C-----  00       BRK  
  0x048B68 $8B58: C-----  30 30    BMI  $8B8A
  0x048B6A $8B5A: C-----  00       BRK  
  0x048B6B $8B5B: C-----  00       BRK  
  0x048B6C $8B5C: C-----  00       BRK  
  0x048B6D $8B5D: C-----  00       BRK  
  0x048B6E $8B5E: C-----  00       BRK  
  0x048B6F $8B5F: C-----  00       BRK  
  0x048B70 $8B60: C-----  F8       SED  
  0x048B71 $8B61: C-----  78       SEI  
  0x048B72 $8B62: C-----  60       RTS  
  0x048B73 $8B63: C-----  00       BRK  
  0x048B74 $8B64: C-----  00       BRK  
  0x048B75 $8B65: C-----  00       BRK  
  0x048B76 $8B66: C-----  00       BRK  
  0x048B77 $8B67: C-----  00       BRK  
  0x048B78 $8B68: C-----  70 60    BVS  $8BCA
  0x048B7A $8B6A: C-----  00       BRK  
  0x048B7B $8B6B: C-----  00       BRK  
  0x048B7C $8B6C: C-----  00       BRK  
  0x048B7D $8B6D: C-----  00       BRK  
  0x048B7E $8B6E: C-----  00       BRK  
  0x048B7F $8B6F: C-----  00       BRK  
  0x048B80 $8B70: C-----  00       BRK  
  0x048B81 $8B71: C-----  00       BRK  
  0x048B82 $8B72: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x048B83 $8B73: C-----  46 82    LSR  $82
  0x048B85 $8B75: C-----  8A       TXA  
  0x048B86 $8B76: C-----  FE FE 00 INC  $00FE,X
  0x048B89 $8B79: C-----  00       BRK  
  0x048B8A $8B7A: C-----  00       BRK  
  0x048B8B $8B7B: C-----  38       SEC  
  0x048B8C $8B7C: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x048B8D $8B7D: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x048B8E $8B7E: C-----  08       PHP  
  0x048B8F $8B7F: C-----  78       SEI  
  0x048B90 $8B80: ------  .byte $00
  0x048B91 $8B81: ------  .byte $00
  0x048B92 $8B82: ------  .byte $38
  0x048B93 $8B83: ------  .byte $C4
  0x048B94 $8B84: ------  .byte $02
  0x048B95 $8B85: ------  .byte $01
  0x048B96 $8B86: ------  .byte $D0
  0x048B97 $8B87: ------  .byte $FA
  0x048B98 $8B88: ------  .byte $00
  0x048B99 $8B89: ------  .byte $00
  0x048B9A $8B8A: ------  .byte $00
  0x048B9B $8B8B: ------  .byte $38
  0x048B9C $8B8C: ------  .byte $FC
  0x048B9D $8B8D: ------  .byte $FE
  0x048B9E $8B8E: ------  .byte $2E
  0x048B9F $8B8F: ------  .byte $54
  0x048BA0 $8B90: C-----  00       BRK  
  0x048BA1 $8B91: C-----  00       BRK  
  0x048BA2 $8B92: C-----  00       BRK  
  0x048BA3 $8B93: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x048BA4 $8B94: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x048BA5 $8B95: C-----  16 3F    ASL  $3F,X
  0x048BA7 $8B97: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048BA8 $8B98: C-----  00       BRK  
  0x048BA9 $8B99: C-----  00       BRK  
  0x048BAA $8B9A: C-----  00       BRK  
  0x048BAB $8B9B: C-----  00       BRK  
  0x048BAC $8B9C: C-----  00       BRK  
  0x048BAD $8B9D: C-----  00       BRK  
  0x048BAE $8B9E: C-----  00       BRK  
  0x048BAF $8B9F: C-----  00       BRK  
  0x048BB0 $8BA0: C-----  00       BRK  
  0x048BB1 $8BA1: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x048BB2 $8BA2: C-----  C6 82    DEC  $82
  0x048BB4 $8BA4: C-----  A2 72    LDX  #$72
  0x048BB6 $8BA6: C-----  06 FE    ASL  $FE
  0x048BB8 $8BA8: C-----  00       BRK  
  0x048BB9 $8BA9: C-----  00       BRK  
  0x048BBA $8BAA: C-----  38       SEC  
  0x048BBB $8BAB: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x048BBC $8BAC: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x048BBD $8BAD: C-----  8C F8 00 STY  $00F8
  0x048BC0 $8BB0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x048BC1 $8BB1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x048BC2 $8BB2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048BC3 $8BB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048BC4 $8BB4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048BC5 $8BB5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048BC6 $8BB6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048BC7 $8BB7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048BC8 $8BB8: C-----  00       BRK  
  0x048BC9 $8BB9: C-----  00       BRK  
  0x048BCA $8BBA: C-----  00       BRK  
  0x048BCB $8BBB: C-----  00       BRK  
  0x048BCC $8BBC: C-----  00       BRK  
  0x048BCD $8BBD: C-----  00       BRK  
  0x048BCE $8BBE: C-----  60       RTS  
  0x048BCF $8BBF: C-----  30 00    BMI  $8BC1
  0x048BD1 $8BC1: C-----  01 01    ORA  ($01,X)
  0x048BD3 $8BC3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048BD4 $8BC4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x048BD5 $8BC5: C-----  06 06    ASL  $06
  0x048BD7 $8BC7: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x048BD8 $8BC8: C-----  00       BRK  
  0x048BD9 $8BC9: C-----  00       BRK  
  0x048BDA $8BCA: C-----  00       BRK  
  0x048BDB $8BCB: C-----  00       BRK  
  0x048BDC $8BCC: C-----  00       BRK  
  0x048BDD $8BCD: C-----  00       BRK  
  0x048BDE $8BCE: C-----  00       BRK  
  0x048BDF $8BCF: C-----  00       BRK  
  0x048BE0 $8BD0: C-----  00       BRK  
  0x048BE1 $8BD1: C-----  00       BRK  
  0x048BE2 $8BD2: C-----  00       BRK  
  0x048BE3 $8BD3: C-----  00       BRK  
  0x048BE4 $8BD4: C-----  00       BRK  
  0x048BE5 $8BD5: C-----  00       BRK  
  0x048BE6 $8BD6: C-----  00       BRK  
  0x048BE7 $8BD7: C-----  00       BRK  
  0x048BE8 $8BD8: C-----  00       BRK  
  0x048BE9 $8BD9: C-----  01 01    ORA  ($01,X)
  0x048BEB $8BDB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048BEC $8BDC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x048BED $8BDD: C-----  06 06    ASL  $06
  0x048BEF $8BDF: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x048BF0 $8BE0: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x048BF1 $8BE1: C-----  18       CLC  
  0x048BF2 $8BE2: C-----  18       CLC  
  0x048BF3 $8BE3: C-----  30 20    BMI  $8C05
  0x048BF5 $8BE5: C-----  60       RTS  
  0x048BF6 $8BE6: C-----  40       RTI  
  0x048BF7 $8BE7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048BF8 $8BE8: C-----  00       BRK  
  0x048BF9 $8BE9: C-----  00       BRK  
  0x048BFA $8BEA: C-----  00       BRK  
  0x048BFB $8BEB: C-----  00       BRK  
  0x048BFC $8BEC: C-----  00       BRK  
  0x048BFD $8BED: C-----  00       BRK  
  0x048BFE $8BEE: C-----  00       BRK  
  0x048BFF $8BEF: C-----  00       BRK  
  0x048C00 $8BF0: C-----  00       BRK  
  0x048C01 $8BF1: C-----  00       BRK  
  0x048C02 $8BF2: C-----  00       BRK  
  0x048C03 $8BF3: C-----  00       BRK  
  0x048C04 $8BF4: C-----  00       BRK  
  0x048C05 $8BF5: C-----  00       BRK  
  0x048C06 $8BF6: C-----  00       BRK  
  0x048C07 $8BF7: C-----  00       BRK  
  0x048C08 $8BF8: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x048C09 $8BF9: C-----  18       CLC  
  0x048C0A $8BFA: C-----  18       CLC  
  0x048C0B $8BFB: C-----  30 20    BMI  $8C1D
  0x048C0D $8BFD: C-----  60       RTS  
  0x048C0E $8BFE: C-----  40       RTI  
  0x048C0F $8BFF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048C10 $8C00: ------  .byte $00
  0x048C11 $8C01: ------  .byte $00
  0x048C12 $8C02: ------  .byte $00
  0x048C13 $8C03: ------  .byte $00
  0x048C14 $8C04: ------  .byte $00
  0x048C15 $8C05: ------  .byte $00
  0x048C16 $8C06: ------  .byte $00
  0x048C17 $8C07: ------  .byte $00
  0x048C18 $8C08: ------  .byte $00
  0x048C19 $8C09: ------  .byte $00
  0x048C1A $8C0A: ------  .byte $00
  0x048C1B $8C0B: ------  .byte $00
  0x048C1C $8C0C: ------  .byte $00
  0x048C1D $8C0D: ------  .byte $00
  0x048C1E $8C0E: ------  .byte $00
  0x048C1F $8C0F: ------  .byte $00
  0x048C20 $8C10: ------  .byte $FF
  0x048C21 $8C11: ------  .byte $FF
  0x048C22 $8C12: ------  .byte $FF
  0x048C23 $8C13: ------  .byte $FF
  0x048C24 $8C14: ------  .byte $FF
  0x048C25 $8C15: ------  .byte $FF
  0x048C26 $8C16: ------  .byte $FF
  0x048C27 $8C17: ------  .byte $FF
  0x048C28 $8C18: ------  .byte $00
  0x048C29 $8C19: ------  .byte $00
  0x048C2A $8C1A: ------  .byte $00
  0x048C2B $8C1B: ------  .byte $00
  0x048C2C $8C1C: ------  .byte $00
  0x048C2D $8C1D: ------  .byte $00
  0x048C2E $8C1E: ------  .byte $00
  0x048C2F $8C1F: ------  .byte $00
  0x048C30 $8C20: C-----  00       BRK  
  0x048C31 $8C21: C-----  00       BRK  
  0x048C32 $8C22: C-----  00       BRK  
  0x048C33 $8C23: C-----  00       BRK  
  0x048C34 $8C24: C-----  18       CLC  
  0x048C35 $8C25: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x048C36 $8C26: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x048C37 $8C27: C-----  78       SEI  
  0x048C38 $8C28: C-----  00       BRK  
  0x048C39 $8C29: C-----  00       BRK  
  0x048C3A $8C2A: C-----  00       BRK  
  0x048C3B $8C2B: C-----  00       BRK  
  0x048C3C $8C2C: C-----  00       BRK  
  0x048C3D $8C2D: C-----  18       CLC  
  0x048C3E $8C2E: C-----  18       CLC  
  0x048C3F $8C2F: C-----  30 01    BMI  $8C32
  0x048C41 $8C31: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x048C42 $8C32: C-----  0E 1F 3F ASL  $3F1F
  0x048C45 $8C35: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048C46 $8C36: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048C47 $8C37: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048C48 $8C38: C-----  00       BRK  
  0x048C49 $8C39: C-----  01 01    ORA  ($01,X)
  0x048C4B $8C3B: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x048C4C $8C3C: C-----  19 1F 1F ORA  $1F1F,Y
  0x048C4F $8C3F: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x048C50 $8C40: C-----  00       BRK  
  0x048C51 $8C41: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048C52 $8C42: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048C53 $8C43: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048C54 $8C44: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x048C55 $8C45: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x048C56 $8C46: C-----  41 81    EOR  ($81,X)
  0x048C58 $8C48: C-----  00       BRK  
  0x048C59 $8C49: C-----  00       BRK  
  0x048C5A $8C4A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048C5B $8C4B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048C5C $8C4C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048C5D $8C4D: C-----  1D 3E 7E ORA  $7E3E,X
  0x048C60 $8C50: C-----  F0 F0    BEQ  $8C42
  0x048C62 $8C52: C-----  E0 C0    CPX  #$C0
  0x048C64 $8C54: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048C65 $8C55: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048C66 $8C56: C-----  00       BRK  
  0x048C67 $8C57: C-----  00       BRK  
  0x048C68 $8C58: C-----  60       RTS  
  0x048C69 $8C59: C-----  E0 C0    CPX  #$C0
  0x048C6B $8C5B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048C6C $8C5C: C-----  00       BRK  
  0x048C6D $8C5D: C-----  00       BRK  
  0x048C6E $8C5E: C-----  00       BRK  
  0x048C6F $8C5F: C-----  00       BRK  
  0x048C70 $8C60: C-----  11 01    ORA  ($01),Y
  0x048C72 $8C62: C-----  01 81    ORA  ($81,X)
  0x048C74 $8C64: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x048C75 $8C65: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x048C76 $8C66: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x048C77 $8C67: C-----  E6 EE    INC  $EE
  0x048C79 $8C69: C-----  FE FE 7E INC  $7EFE,X
  0x048C7C $8C6C: C-----  BC BC DC LDY  $DCBC,X
  0x048C7F $8C6F: C-----  58       CLI  
  0x048C80 $8C70: C-----  00       BRK  
  0x048C81 $8C71: C-----  00       BRK  
  0x048C82 $8C72: C-----  00       BRK  
  0x048C83 $8C73: C-----  00       BRK  
  0x048C84 $8C74: C-----  00       BRK  
  0x048C85 $8C75: C-----  00       BRK  
  0x048C86 $8C76: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x048C87 $8C77: C-----  06 00    ASL  $00
  0x048C89 $8C79: C-----  00       BRK  
  0x048C8A $8C7A: C-----  00       BRK  
  0x048C8B $8C7B: C-----  00       BRK  
  0x048C8C $8C7C: C-----  00       BRK  
  0x048C8D $8C7D: C-----  00       BRK  
  0x048C8E $8C7E: C-----  00       BRK  
  0x048C8F $8C7F: C-----  00       BRK  
  0x048C90 $8C80: C-----  00       BRK  
  0x048C91 $8C81: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048C92 $8C82: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048C93 $8C83: C-----  08       PHP  
  0x048C94 $8C84: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x048C95 $8C85: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x048C96 $8C86: C-----  41 81    EOR  ($81,X)
  0x048C98 $8C88: C-----  00       BRK  
  0x048C99 $8C89: C-----  00       BRK  
  0x048C9A $8C8A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048C9B $8C8B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048C9C $8C8C: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x048C9D $8C8D: C-----  1D 3E 7E ORA  $7E3E,X
  0x048CA0 $8C90: C-----  F0 F0    BEQ  $8C82
  0x048CA2 $8C92: C-----  E0 40    CPX  #$40
  0x048CA4 $8C94: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048CA5 $8C95: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048CA6 $8C96: C-----  00       BRK  
  0x048CA7 $8C97: C-----  00       BRK  
  0x048CA8 $8C98: C-----  60       RTS  
  0x048CA9 $8C99: C-----  E0 40    CPX  #$40
  0x048CAB $8C9B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048CAC $8C9C: C-----  00       BRK  
  0x048CAD $8C9D: C-----  00       BRK  
  0x048CAE $8C9E: C-----  00       BRK  
  0x048CAF $8C9F: C-----  00       BRK  
  0x048CB0 $8CA0: C-----  01 02    ORA  ($02,X)
  0x048CB2 $8CA2: C-----  0E 1E 3E ASL  $3E1E
  0x048CB5 $8CA5: C-----  3E 3E 3F ROL  $3F3E,X
  0x048CB8 $8CA8: C-----  00       BRK  
  0x048CB9 $8CA9: C-----  01 01    ORA  ($01,X)
  0x048CBB $8CAB: C-----  0D 19 1D ORA  $1D19
  0x048CBE $8CAE: C-----  1D 0C 11 ORA  $110C,X
  0x048CC1 $8CB1: C-----  01 01    ORA  ($01,X)
  0x048CC3 $8CB3: C-----  81 42    STA  ($42,X)
  0x048CC5 $8CB5: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x048CC6 $8CB6: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x048CC7 $8CB7: C-----  A6 EE    LDX  $EE
  0x048CC9 $8CB9: C-----  FE FE 7E INC  $7EFE,X
  0x048CCC $8CBC: C-----  BC BC FC LDY  $FCBC,X
  0x048CCF $8CBF: C-----  58       CLI  
  0x048CD0 $8CC0: C-----  00       BRK  
  0x048CD1 $8CC1: C-----  00       BRK  
  0x048CD2 $8CC2: C-----  01 05    ORA  ($05,X)
  0x048CD4 $8CC4: C-----  06 04    ASL  $04
  0x048CD6 $8CC6: C-----  08       PHP  
  0x048CD7 $8CC7: C-----  05 00    ORA  $00
  0x048CD9 $8CC9: C-----  00       BRK  
  0x048CDA $8CCA: C-----  00       BRK  
  0x048CDB $8CCB: C-----  00       BRK  
  0x048CDC $8CCC: C-----  01 03    ORA  ($03,X)
  0x048CDE $8CCE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048CDF $8CCF: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x048CE0 $8CD0: C-----  !!UNDEF $5A  ; unknown opcode, treating as data
  0x048CE1 $8CD1: C-----  A2 44    LDX  #$44
  0x048CE3 $8CD3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048CE4 $8CD4: C-----  08       PHP  
  0x048CE5 $8CD5: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x048CE6 $8CD6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048CE7 $8CD7: C-----  08       PHP  
  0x048CE8 $8CD8: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048CE9 $8CD9: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x048CEA $8CDA: C-----  B8       CLV  
  0x048CEB $8CDB: C-----  F8       SED  
  0x048CEC $8CDC: C-----  F0 E8    BEQ  $8CC6
  0x048CEE $8CDE: C-----  F8       SED  
  0x048CEF $8CDF: C-----  F0 00    BEQ  $8CE1
  0x048CF1 $8CE1: C-----  00       BRK  
  0x048CF2 $8CE2: C-----  00       BRK  
  0x048CF3 $8CE3: C-----  C0 20    CPY  #$20
  0x048CF5 $8CE5: C-----  10 10    BPL  $8CF7
  0x048CF7 $8CE7: C-----  10 00    BPL  $8CE9
  0x048CF9 $8CE9: C-----  00       BRK  
  0x048CFA $8CEA: C-----  00       BRK  
  0x048CFB $8CEB: C-----  00       BRK  
  0x048CFC $8CEC: C-----  C0 E0    CPY  #$E0
  0x048CFE $8CEE: C-----  E0 E0    CPX  #$E0
  0x048D00 $8CF0: C-----  90 E0    BCC  $8CD2
  0x048D02 $8CF2: C-----  C0 80    CPY  #$80
  0x048D04 $8CF4: C-----  00       BRK  
  0x048D05 $8CF5: C-----  00       BRK  
  0x048D06 $8CF6: C-----  00       BRK  
  0x048D07 $8CF7: C-----  00       BRK  
  0x048D08 $8CF8: C-----  60       RTS  
  0x048D09 $8CF9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048D0A $8CFA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048D0B $8CFB: C-----  00       BRK  
  0x048D0C $8CFC: C-----  00       BRK  
  0x048D0D $8CFD: C-----  00       BRK  
  0x048D0E $8CFE: C-----  00       BRK  
  0x048D0F $8CFF: C-----  00       BRK  
  0x048D10 $8D00: C-----  00       BRK  
  0x048D11 $8D01: C-----  00       BRK  
  0x048D12 $8D02: C-----  00       BRK  
  0x048D13 $8D03: C-----  05 06    ORA  $06
  0x048D15 $8D05: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048D16 $8D06: C-----  08       PHP  
  0x048D17 $8D07: C-----  05 00    ORA  $00
  0x048D19 $8D09: C-----  00       BRK  
  0x048D1A $8D0A: C-----  00       BRK  
  0x048D1B $8D0B: C-----  00       BRK  
  0x048D1C $8D0C: C-----  01 03    ORA  ($03,X)
  0x048D1E $8D0E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048D1F $8D0F: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x048D20 $8D10: C-----  00       BRK  
  0x048D21 $8D11: C-----  08       PHP  
  0x048D22 $8D12: C-----  18       CLC  
  0x048D23 $8D13: C-----  E8       INX  
  0x048D24 $8D14: C-----  08       PHP  
  0x048D25 $8D15: C-----  08       PHP  
  0x048D26 $8D16: C-----  08       PHP  
  0x048D27 $8D17: C-----  10 00    BPL  $8D19
  0x048D29 $8D19: C-----  00       BRK  
  0x048D2A $8D1A: C-----  00       BRK  
  0x048D2B $8D1B: C-----  10 F0    BPL  $8D0D
  0x048D2D $8D1D: C-----  F0 F0    BEQ  $8D0F
  0x048D2F $8D1F: C-----  E0 07    CPX  #$07
  0x048D31 $8D21: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048D32 $8D22: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048D33 $8D23: C-----  01 00    ORA  ($00,X)
  0x048D35 $8D25: C-----  00       BRK  
  0x048D36 $8D26: C-----  00       BRK  
  0x048D37 $8D27: C-----  00       BRK  
  0x048D38 $8D28: C-----  01 01    ORA  ($01,X)
  0x048D3A $8D2A: C-----  01 00    ORA  ($00,X)
  0x048D3C $8D2C: C-----  00       BRK  
  0x048D3D $8D2D: C-----  00       BRK  
  0x048D3E $8D2E: C-----  00       BRK  
  0x048D3F $8D2F: C-----  00       BRK  
  0x048D40 $8D30: C-----  D0 E0    BNE  $8D12
  0x048D42 $8D32: C-----  C0 80    CPY  #$80
  0x048D44 $8D34: C-----  00       BRK  
  0x048D45 $8D35: C-----  00       BRK  
  0x048D46 $8D36: C-----  00       BRK  
  0x048D47 $8D37: C-----  00       BRK  
  0x048D48 $8D38: C-----  20 C0 80 JSR  $80C0
  0x048D4B $8D3B: C-----  00       BRK  
  0x048D4C $8D3C: C-----  00       BRK  
  0x048D4D $8D3D: C-----  00       BRK  
  0x048D4E $8D3E: C-----  00       BRK  
  0x048D4F $8D3F: C-----  00       BRK  
  0x048D50 $8D40: C-----  00       BRK  
  0x048D51 $8D41: C-----  00       BRK  
  0x048D52 $8D42: C-----  00       BRK  
  0x048D53 $8D43: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048D54 $8D44: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048D55 $8D45: C-----  18       CLC  
  0x048D56 $8D46: C-----  09 07    ORA  #$07
  0x048D58 $8D48: C-----  00       BRK  
  0x048D59 $8D49: C-----  00       BRK  
  0x048D5A $8D4A: C-----  00       BRK  
  0x048D5B $8D4B: C-----  00       BRK  
  0x048D5C $8D4C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048D5D $8D4D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048D5E $8D4E: C-----  06 01    ASL  $01
  0x048D60 $8D50: C-----  00       BRK  
  0x048D61 $8D51: C-----  00       BRK  
  0x048D62 $8D52: C-----  00       BRK  
  0x048D63 $8D53: C-----  C0 20    CPY  #$20
  0x048D65 $8D55: C-----  10 90    BPL  $8CE7
  0x048D67 $8D57: C-----  D0 00    BNE  $8D59
  0x048D69 $8D59: C-----  00       BRK  
  0x048D6A $8D5A: C-----  00       BRK  
  0x048D6B $8D5B: C-----  00       BRK  
  0x048D6C $8D5C: C-----  C0 E0    CPY  #$E0
  0x048D6E $8D5E: C-----  60       RTS  
  0x048D6F $8D5F: C-----  20 07 03 JSR  $0307
  0x048D72 $8D62: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048D73 $8D63: C-----  01 00    ORA  ($00,X)
  0x048D75 $8D65: C-----  00       BRK  
  0x048D76 $8D66: C-----  00       BRK  
  0x048D77 $8D67: C-----  00       BRK  
  0x048D78 $8D68: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048D79 $8D69: C-----  01 01    ORA  ($01,X)
  0x048D7B $8D6B: C-----  00       BRK  
  0x048D7C $8D6C: C-----  00       BRK  
  0x048D7D $8D6D: C-----  00       BRK  
  0x048D7E $8D6E: C-----  00       BRK  
  0x048D7F $8D6F: C-----  00       BRK  
  0x048D80 $8D70: C-----  D0 E0    BNE  $8D52
  0x048D82 $8D72: C-----  C0 80    CPY  #$80
  0x048D84 $8D74: C-----  00       BRK  
  0x048D85 $8D75: C-----  00       BRK  
  0x048D86 $8D76: C-----  00       BRK  
  0x048D87 $8D77: C-----  00       BRK  
  0x048D88 $8D78: C-----  60       RTS  
  0x048D89 $8D79: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048D8A $8D7A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048D8B $8D7B: C-----  00       BRK  
  0x048D8C $8D7C: C-----  00       BRK  
  0x048D8D $8D7D: C-----  00       BRK  
  0x048D8E $8D7E: C-----  00       BRK  
  0x048D8F $8D7F: C-----  00       BRK  
  0x048D90 $8D80: C-----  00       BRK  
  0x048D91 $8D81: C-----  00       BRK  
  0x048D92 $8D82: C-----  00       BRK  
  0x048D93 $8D83: C-----  01 06    ORA  ($06,X)
  0x048D95 $8D85: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048D96 $8D86: C-----  08       PHP  
  0x048D97 $8D87: C-----  08       PHP  
  0x048D98 $8D88: C-----  00       BRK  
  0x048D99 $8D89: C-----  00       BRK  
  0x048D9A $8D8A: C-----  00       BRK  
  0x048D9B $8D8B: C-----  00       BRK  
  0x048D9C $8D8C: C-----  01 03    ORA  ($03,X)
  0x048D9E $8D8E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048D9F $8D8F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048DA0 $8D90: C-----  00       BRK  
  0x048DA1 $8D91: C-----  00       BRK  
  0x048DA2 $8D92: C-----  00       BRK  
  0x048DA3 $8D93: C-----  E0 18    CPX  #$18
  0x048DA5 $8D95: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048DA6 $8D96: C-----  88       DEY  
  0x048DA7 $8D97: C-----  D0 00    BNE  $8D99
  0x048DA9 $8D99: C-----  00       BRK  
  0x048DAA $8D9A: C-----  00       BRK  
  0x048DAB $8D9B: C-----  00       BRK  
  0x048DAC $8D9C: C-----  E0 F8    CPX  #$F8
  0x048DAE $8D9E: C-----  70 20    BVS  $8DC0
  0x048DB0 $8DA0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048DB1 $8DA1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048DB2 $8DA2: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048DB3 $8DA3: C-----  01 00    ORA  ($00,X)
  0x048DB5 $8DA5: C-----  00       BRK  
  0x048DB6 $8DA6: C-----  00       BRK  
  0x048DB7 $8DA7: C-----  00       BRK  
  0x048DB8 $8DA8: C-----  00       BRK  
  0x048DB9 $8DA9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048DBA $8DAA: C-----  01 00    ORA  ($00,X)
  0x048DBC $8DAC: C-----  00       BRK  
  0x048DBD $8DAD: C-----  00       BRK  
  0x048DBE $8DAE: C-----  00       BRK  
  0x048DBF $8DAF: C-----  00       BRK  
  0x048DC0 $8DB0: C-----  90 E0    BCC  $8D92
  0x048DC2 $8DB2: C-----  C0 80    CPY  #$80
  0x048DC4 $8DB4: C-----  00       BRK  
  0x048DC5 $8DB5: C-----  00       BRK  
  0x048DC6 $8DB6: C-----  00       BRK  
  0x048DC7 $8DB7: C-----  00       BRK  
  0x048DC8 $8DB8: C-----  E0 C0    CPX  #$C0
  0x048DCA $8DBA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048DCB $8DBB: C-----  00       BRK  
  0x048DCC $8DBC: C-----  00       BRK  
  0x048DCD $8DBD: C-----  00       BRK  
  0x048DCE $8DBE: C-----  00       BRK  
  0x048DCF $8DBF: C-----  00       BRK  
  0x048DD0 $8DC0: C-----  D0 E0    BNE  $8DA2
  0x048DD2 $8DC2: C-----  C0 80    CPY  #$80
  0x048DD4 $8DC4: C-----  00       BRK  
  0x048DD5 $8DC5: C-----  00       BRK  
  0x048DD6 $8DC6: C-----  00       BRK  
  0x048DD7 $8DC7: C-----  00       BRK  
  0x048DD8 $8DC8: C-----  E0 80    CPX  #$80
  0x048DDA $8DCA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048DDB $8DCB: C-----  00       BRK  
  0x048DDC $8DCC: C-----  00       BRK  
  0x048DDD $8DCD: C-----  00       BRK  
  0x048DDE $8DCE: C-----  00       BRK  
  0x048DDF $8DCF: C-----  00       BRK  
  0x048DE0 $8DD0: C-----  A1 7F    LDA  ($7F,X)
  0x048DE2 $8DD2: C-----  7E 3C 18 ROR  $183C,X
  0x048DE5 $8DD5: C-----  00       BRK  
  0x048DE6 $8DD6: C-----  00       BRK  
  0x048DE7 $8DD7: C-----  00       BRK  
  0x048DE8 $8DD8: C-----  7E 14 3C ROR  $3C14,X
  0x048DEB $8DDB: C-----  18       CLC  
  0x048DEC $8DDC: C-----  00       BRK  
  0x048DED $8DDD: C-----  00       BRK  
  0x048DEE $8DDE: C-----  00       BRK  
  0x048DEF $8DDF: C-----  00       BRK  
  0x048DF0 $8DE0: C-----  00       BRK  
  0x048DF1 $8DE1: C-----  00       BRK  
  0x048DF2 $8DE2: C-----  00       BRK  
  0x048DF3 $8DE3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048DF4 $8DE4: C-----  10 20    BPL  $8E06
  0x048DF6 $8DE6: C-----  40       RTI  
  0x048DF7 $8DE7: C-----  40       RTI  
  0x048DF8 $8DE8: C-----  00       BRK  
  0x048DF9 $8DE9: C-----  00       BRK  
  0x048DFA $8DEA: C-----  00       BRK  
  0x048DFB $8DEB: C-----  00       BRK  
  0x048DFC $8DEC: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048DFD $8DED: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x048DFE $8DEE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048DFF $8DEF: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048E00 $8DF0: C-----  00       BRK  
  0x048E01 $8DF1: C-----  00       BRK  
  0x048E02 $8DF2: C-----  20 60 20 JSR  $2060
  0x048E05 $8DF5: C-----  20 60 20 JSR  $2060
  0x048E08 $8DF8: C-----  00       BRK  
  0x048E09 $8DF9: C-----  00       BRK  
  0x048E0A $8DFA: C-----  00       BRK  
  0x048E0B $8DFB: C-----  00       BRK  
  0x048E0C $8DFC: C-----  C0 C0    CPY  #$C0
  0x048E0E $8DFE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048E0F $8DFF: C-----  C0 31    CPY  #$31
  0x048E11 $8E01: C-----  11 21    ORA  ($21),Y
  0x048E13 $8E03: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x048E14 $8E04: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x048E15 $8E05: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x048E16 $8E06: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x048E17 $8E07: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048E18 $8E08: C-----  0E 0E 1E ASL  $1E0E
  0x048E1B $8E0B: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x048E1C $8E0C: C-----  18       CLC  
  0x048E1D $8E0D: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x048E1E $8E0E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048E1F $8E0F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048E20 $8E10: C-----  E8       INX  
  0x048E21 $8E11: C-----  88       DEY  
  0x048E22 $8E12: C-----  10 30    BPL  $8E44
  0x048E24 $8E14: C-----  F0 E0    BEQ  $8DF6
  0x048E26 $8E16: C-----  E0 C0    CPX  #$C0
  0x048E28 $8E18: C-----  10 70    BPL  $8E8A
  0x048E2A $8E1A: C-----  E0 C0    CPX  #$C0
  0x048E2C $8E1C: C-----  20 C0 C0 JSR  $C0C0
  0x048E2F $8E1F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048E30 $8E20: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048E31 $8E21: C-----  3E 7E 5C ROL  $5C7E,X
  0x048E34 $8E24: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x048E35 $8E25: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x048E36 $8E26: C-----  88       DEY  
  0x048E37 $8E27: C-----  88       DEY  
  0x048E38 $8E28: C-----  1E 1C 1C ASL  $1C1C,X
  0x048E3B $8E2B: C-----  20 18 60 JSR  $6018
  0x048E3E $8E2E: C-----  70 70    BVS  $8EA0
  0x048E40 $8E30: C-----  11 12    ORA  ($12),Y
  0x048E42 $8E32: C-----  24 38    BIT  $38
  0x048E44 $8E34: C-----  78       SEI  
  0x048E45 $8E35: C-----  F8       SED  
  0x048E46 $8E36: C-----  F0 E0    BEQ  $8E18
  0x048E48 $8E38: C-----  0E 0C 18 ASL  $180C
  0x048E4B $8E3B: C-----  00       BRK  
  0x048E4C $8E3C: C-----  20 00 00 JSR  $0000
  0x048E4F $8E3F: C-----  00       BRK  
  0x048E50 $8E40: C-----  D0 E0    BNE  $8E22
  0x048E52 $8E42: C-----  C0 80    CPY  #$80
  0x048E54 $8E44: C-----  00       BRK  
  0x048E55 $8E45: C-----  00       BRK  
  0x048E56 $8E46: C-----  00       BRK  
  0x048E57 $8E47: C-----  00       BRK  
  0x048E58 $8E48: C-----  20 80 80 JSR  $8080
  0x048E5B $8E4B: C-----  00       BRK  
  0x048E5C $8E4C: C-----  00       BRK  
  0x048E5D $8E4D: C-----  00       BRK  
  0x048E5E $8E4E: C-----  00       BRK  
  0x048E5F $8E4F: C-----  00       BRK  
  0x048E60 $8E50: C-----  00       BRK  
  0x048E61 $8E51: C-----  00       BRK  
  0x048E62 $8E52: C-----  00       BRK  
  0x048E63 $8E53: C-----  01 06    ORA  ($06,X)
  0x048E65 $8E55: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048E66 $8E56: C-----  08       PHP  
  0x048E67 $8E57: C-----  05 00    ORA  $00
  0x048E69 $8E59: C-----  00       BRK  
  0x048E6A $8E5A: C-----  00       BRK  
  0x048E6B $8E5B: C-----  00       BRK  
  0x048E6C $8E5C: C-----  01 03    ORA  ($03,X)
  0x048E6E $8E5E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048E6F $8E5F: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x048E70 $8E60: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x048E71 $8E61: C-----  E4 CC    CPX  $CC
  0x048E73 $8E63: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x048E74 $8E64: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x048E75 $8E65: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x048E76 $8E66: C-----  01 01    ORA  ($01,X)
  0x048E78 $8E68: C-----  E8       INX  
  0x048E79 $8E69: C-----  D8       CLD  
  0x048E7A $8E6A: C-----  30 E0    BMI  $8E4C
  0x048E7C $8E6C: C-----  00       BRK  
  0x048E7D $8E6D: C-----  00       BRK  
  0x048E7E $8E6E: C-----  00       BRK  
  0x048E7F $8E6F: C-----  00       BRK  
  0x048E80 $8E70: C-----  88       DEY  
  0x048E81 $8E71: C-----  E4 FF    CPX  $FF
  0x048E83 $8E73: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048E84 $8E74: C-----  FD FC F8 SBC  $F8FC,X
  0x048E87 $8E77: C-----  F8       SED  
  0x048E88 $8E78: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x048E89 $8E79: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x048E8A $8E7A: C-----  60       RTS  
  0x048E8B $8E7B: C-----  79 78 70 ADC  $7078,Y
  0x048E8E $8E7E: C-----  70 60    BVS  $8EE0
  0x048E90 $8E80: C-----  00       BRK  
  0x048E91 $8E81: C-----  00       BRK  
  0x048E92 $8E82: C-----  01 02    ORA  ($02,X)
  0x048E94 $8E84: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048E95 $8E85: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048E96 $8E86: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048E97 $8E87: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x048E98 $8E88: C-----  00       BRK  
  0x048E99 $8E89: C-----  00       BRK  
  0x048E9A $8E8A: C-----  00       BRK  
  0x048E9B $8E8B: C-----  01 00    ORA  ($00,X)
  0x048E9D $8E8D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048E9E $8E8E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048E9F $8E8F: C-----  0D 3E C1 ORA  $C13E
  0x048EA2 $8E92: C-----  00       BRK  
  0x048EA3 $8E93: C-----  40       RTI  
  0x048EA4 $8E94: C-----  40       RTI  
  0x048EA5 $8E95: C-----  C0 E1    CPY  #$E1
  0x048EA7 $8E97: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x048EA8 $8E98: C-----  00       BRK  
  0x048EA9 $8E99: C-----  3E FF BF ROL  $BFFF,X
  0x048EAC $8E9C: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x048EAD $8E9D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048EAE $8E9E: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x048EAF $8E9F: C-----  8C 1F 3E STY  $3E1F
  0x048EB2 $8EA2: C-----  3E 3C 3C ROL  $3C3C,X
  0x048EB5 $8EA5: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x048EB6 $8EA6: C-----  00       BRK  
  0x048EB7 $8EA7: C-----  00       BRK  
  0x048EB8 $8EA8: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x048EB9 $8EA9: C-----  18       CLC  
  0x048EBA $8EAA: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x048EBB $8EAB: C-----  18       CLC  
  0x048EBC $8EAC: C-----  08       PHP  
  0x048EBD $8EAD: C-----  00       BRK  
  0x048EBE $8EAE: C-----  00       BRK  
  0x048EBF $8EAF: C-----  00       BRK  
  0x048EC0 $8EB0: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x048EC1 $8EB1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x048EC2 $8EB2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x048EC3 $8EB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x048EC4 $8EB4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x048EC5 $8EB5: C-----  78       SEI  
  0x048EC6 $8EB6: C-----  38       SEC  
  0x048EC7 $8EB7: C-----  08       PHP  
  0x048EC8 $8EB8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048EC9 $8EB9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048ECA $8EBA: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x048ECB $8EBB: C-----  78       SEI  
  0x048ECC $8EBC: C-----  38       SEC  
  0x048ECD $8EBD: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x048ECE $8EBE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048ECF $8EBF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048ED0 $8EC0: C-----  00       BRK  
  0x048ED1 $8EC1: C-----  F0 28    BEQ  $8EEB
  0x048ED3 $8EC3: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x048ED4 $8EC4: C-----  E4 F4    CPX  $F4
  0x048ED6 $8EC6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048ED7 $8EC7: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048ED8 $8EC8: C-----  00       BRK  
  0x048ED9 $8EC9: C-----  00       BRK  
  0x048EDA $8ECA: C-----  D0 B8    BNE  $8E84
  0x048EDC $8ECC: C-----  18       CLC  
  0x048EDD $8ECD: C-----  68       PLA  
  0x048EDE $8ECE: C-----  F0 F0    BEQ  $8EC0
  0x048EE0 $8ED0: C-----  E8       INX  
  0x048EE1 $8ED1: C-----  98       TYA  
  0x048EE2 $8ED2: C-----  68       PLA  
  0x048EE3 $8ED3: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x048EE4 $8ED4: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x048EE5 $8ED5: C-----  24 24    BIT  $24
  0x048EE7 $8ED7: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x048EE8 $8ED8: C-----  10 60    BPL  $8F3A
  0x048EEA $8EDA: C-----  10 38    BPL  $8F14
  0x048EEC $8EDC: C-----  38       SEC  
  0x048EED $8EDD: C-----  18       CLC  
  0x048EEE $8EDE: C-----  18       CLC  
  0x048EEF $8EDF: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x048EF0 $8EE0: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x048EF1 $8EE1: C-----  E4 CC    CPX  $CC
  0x048EF3 $8EE3: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x048EF4 $8EE4: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x048EF5 $8EE5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x048EF6 $8EE6: C-----  01 01    ORA  ($01,X)
  0x048EF8 $8EE8: C-----  E0 C0    CPX  #$C0
  0x048EFA $8EEA: C-----  00       BRK  
  0x048EFB $8EEB: C-----  08       PHP  
  0x048EFC $8EEC: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x048EFD $8EED: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048EFE $8EEE: C-----  FE FE 12 INC  $12FE,X
  0x048F01 $8EF1: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x048F02 $8EF2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x048F03 $8EF3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048F04 $8EF4: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x048F05 $8EF5: C-----  00       BRK  
  0x048F06 $8EF6: C-----  00       BRK  
  0x048F07 $8EF7: C-----  00       BRK  
  0x048F08 $8EF8: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x048F09 $8EF9: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048F0A $8EFA: C-----  00       BRK  
  0x048F0B $8EFB: C-----  00       BRK  
  0x048F0C $8EFC: C-----  00       BRK  
  0x048F0D $8EFD: C-----  00       BRK  
  0x048F0E $8EFE: C-----  00       BRK  
  0x048F0F $8EFF: C-----  00       BRK  
  0x048F10 $8F00: ------  .byte $00
  0x048F11 $8F01: ------  .byte $00
  0x048F12 $8F02: ------  .byte $01
  0x048F13 $8F03: ------  .byte $03
  0x048F14 $8F04: ------  .byte $03
  0x048F15 $8F05: ------  .byte $07
  0x048F16 $8F06: ------  .byte $0F
  0x048F17 $8F07: ------  .byte $1F
  0x048F18 $8F08: ------  .byte $00
  0x048F19 $8F09: ------  .byte $00
  0x048F1A $8F0A: ------  .byte $00
  0x048F1B $8F0B: ------  .byte $01
  0x048F1C $8F0C: ------  .byte $01
  0x048F1D $8F0D: ------  .byte $03
  0x048F1E $8F0E: ------  .byte $07
  0x048F1F $8F0F: ------  .byte $0D
  0x048F20 $8F10: ------  .byte $3E
  0x048F21 $8F11: ------  .byte $C1
  0x048F22 $8F12: ------  .byte $C0
  0x048F23 $8F13: ------  .byte $C0
  0x048F24 $8F14: ------  .byte $C0
  0x048F25 $8F15: ------  .byte $C0
  0x048F26 $8F16: ------  .byte $E1
  0x048F27 $8F17: ------  .byte $F3
  0x048F28 $8F18: ------  .byte $00
  0x048F29 $8F19: ------  .byte $3E
  0x048F2A $8F1A: ------  .byte $FF
  0x048F2B $8F1B: ------  .byte $BF
  0x048F2C $8F1C: ------  .byte $BF
  0x048F2D $8F1D: ------  .byte $BF
  0x048F2E $8F1E: ------  .byte $9E
  0x048F2F $8F1F: ------  .byte $8C
  0x048F30 $8F20: C-----  10 30    BPL  $8F52
  0x048F32 $8F22: C-----  F8       SED  
  0x048F33 $8F23: C-----  F8       SED  
  0x048F34 $8F24: C-----  F8       SED  
  0x048F35 $8F25: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048F36 $8F26: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x048F37 $8F27: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x048F38 $8F28: C-----  E0 C0    CPX  #$C0
  0x048F3A $8F2A: C-----  30 F0    BMI  $8F1C
  0x048F3C $8F2C: C-----  F0 78    BEQ  $8FA6
  0x048F3E $8F2E: C-----  78       SEI  
  0x048F3F $8F2F: C-----  38       SEC  
  0x048F40 $8F30: C-----  00       BRK  
  0x048F41 $8F31: C-----  00       BRK  
  0x048F42 $8F32: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048F43 $8F33: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x048F44 $8F34: C-----  28       PLP  
  0x048F45 $8F35: C-----  20 40 40 JSR  $4040
  0x048F48 $8F38: C-----  00       BRK  
  0x048F49 $8F39: C-----  00       BRK  
  0x048F4A $8F3A: C-----  00       BRK  
  0x048F4B $8F3B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048F4C $8F3C: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x048F4D $8F3D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x048F4E $8F3E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048F4F $8F3F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048F50 $8F40: ------  .byte $00
  0x048F51 $8F41: ------  .byte $F0
  0x048F52 $8F42: ------  .byte $38
  0x048F53 $8F43: ------  .byte $7C
  0x048F54 $8F44: ------  .byte $FC
  0x048F55 $8F45: ------  .byte $FC
  0x048F56 $8F46: ------  .byte $FC
  0x048F57 $8F47: ------  .byte $FC
  0x048F58 $8F48: ------  .byte $00
  0x048F59 $8F49: ------  .byte $00
  0x048F5A $8F4A: ------  .byte $C0
  0x048F5B $8F4B: ------  .byte $B8
  0x048F5C $8F4C: ------  .byte $78
  0x048F5D $8F4D: ------  .byte $78
  0x048F5E $8F4E: ------  .byte $F8
  0x048F5F $8F4F: ------  .byte $F0
  0x048F60 $8F50: C-----  00       BRK  
  0x048F61 $8F51: C-----  00       BRK  
  0x048F62 $8F52: C-----  00       BRK  
  0x048F63 $8F53: C-----  00       BRK  
  0x048F64 $8F54: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048F65 $8F55: C-----  40       RTI  
  0x048F66 $8F56: C-----  20 20 00 JSR  $0020
  0x048F69 $8F59: C-----  00       BRK  
  0x048F6A $8F5A: C-----  00       BRK  
  0x048F6B $8F5B: C-----  00       BRK  
  0x048F6C $8F5C: C-----  00       BRK  
  0x048F6D $8F5D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048F6E $8F5E: C-----  C0 C0    CPY  #$C0
  0x048F70 $8F60: C-----  00       BRK  
  0x048F71 $8F61: C-----  CC 10 68 CPY  $6810
  0x048F74 $8F64: C-----  88       DEY  
  0x048F75 $8F65: C-----  00       BRK  
  0x048F76 $8F66: C-----  10 20    BPL  $8F88
  0x048F78 $8F68: C-----  00       BRK  
  0x048F79 $8F69: C-----  00       BRK  
  0x048F7A $8F6A: C-----  C8       INY  
  0x048F7B $8F6B: C-----  90 70    BCC  $8FDD
  0x048F7D $8F6D: C-----  F0 E0    BEQ  $8F4F
  0x048F7F $8F6F: C-----  C0 00    CPY  #$00
  0x048F81 $8F71: ------  .byte $00
  0x048F82 $8F72: ------  .byte $00
  0x048F83 $8F73: ------  .byte $3C
  0x048F84 $8F74: ------  .byte $42
  0x048F85 $8F75: ------  .byte $81
  0x048F86 $8F76: ------  .byte $89
  0x048F87 $8F77: ------  .byte $FD
  0x048F88 $8F78: ------  .byte $00
  0x048F89 $8F79: ------  .byte $00
  0x048F8A $8F7A: ------  .byte $00
  0x048F8B $8F7B: ------  .byte $00
  0x048F8C $8F7C: ------  .byte $3C
  0x048F8D $8F7D: ------  .byte $7E
  0x048F8E $8F7E: ------  .byte $76
  0x048F8F $8F7F: ------  .byte $4A
  0x048F90 $8F80: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x048F91 $8F81: C-----  26 1A    ROL  $1A
  0x048F93 $8F83: C-----  11 11    ORA  ($11),Y
  0x048F95 $8F85: C-----  09 08    ORA  #$08
  0x048F97 $8F87: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048F98 $8F88: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048F99 $8F89: C-----  18       CLC  
  0x048F9A $8F8A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x048F9B $8F8B: C-----  0E 0E 06 ASL  $060E
  0x048F9E $8F8E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x048F9F $8F8F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048FA0 $8F90: C-----  00       BRK  
  0x048FA1 $8F91: C-----  00       BRK  
  0x048FA2 $8F92: C-----  00       BRK  
  0x048FA3 $8F93: C-----  00       BRK  
  0x048FA4 $8F94: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048FA5 $8F95: C-----  30 C0    BMI  $8F57
  0x048FA7 $8F97: C-----  40       RTI  
  0x048FA8 $8F98: C-----  00       BRK  
  0x048FA9 $8F99: C-----  00       BRK  
  0x048FAA $8F9A: C-----  00       BRK  
  0x048FAB $8F9B: C-----  00       BRK  
  0x048FAC $8F9C: C-----  00       BRK  
  0x048FAD $8F9D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x048FAE $8F9E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048FAF $8F9F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x048FB0 $8FA0: C-----  48       PHA  
  0x048FB1 $8FA1: C-----  24 26    BIT  $26
  0x048FB3 $8FA3: C-----  1E 1E 1C ASL  $1C1E,X
  0x048FB6 $8FA6: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x048FB7 $8FA7: C-----  78       SEI  
  0x048FB8 $8FA8: C-----  30 18    BMI  $8FC2
  0x048FBA $8FAA: C-----  18       CLC  
  0x048FBB $8FAB: C-----  00       BRK  
  0x048FBC $8FAC: C-----  00       BRK  
  0x048FBD $8FAD: C-----  00       BRK  
  0x048FBE $8FAE: C-----  00       BRK  
  0x048FBF $8FAF: C-----  00       BRK  
  0x048FC0 $8FB0: C-----  00       BRK  
  0x048FC1 $8FB1: C-----  00       BRK  
  0x048FC2 $8FB2: C-----  00       BRK  
  0x048FC3 $8FB3: C-----  00       BRK  
  0x048FC4 $8FB4: C-----  00       BRK  
  0x048FC5 $8FB5: C-----  00       BRK  
  0x048FC6 $8FB6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048FC7 $8FB7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048FC8 $8FB8: C-----  00       BRK  
  0x048FC9 $8FB9: C-----  00       BRK  
  0x048FCA $8FBA: C-----  00       BRK  
  0x048FCB $8FBB: C-----  00       BRK  
  0x048FCC $8FBC: C-----  00       BRK  
  0x048FCD $8FBD: C-----  00       BRK  
  0x048FCE $8FBE: C-----  00       BRK  
  0x048FCF $8FBF: C-----  00       BRK  
  0x048FD0 $8FC0: C-----  00       BRK  
  0x048FD1 $8FC1: C-----  00       BRK  
  0x048FD2 $8FC2: C-----  00       BRK  
  0x048FD3 $8FC3: C-----  00       BRK  
  0x048FD4 $8FC4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048FD5 $8FC5: C-----  40       RTI  
  0x048FD6 $8FC6: C-----  40       RTI  
  0x048FD7 $8FC7: C-----  40       RTI  
  0x048FD8 $8FC8: C-----  00       BRK  
  0x048FD9 $8FC9: C-----  00       BRK  
  0x048FDA $8FCA: C-----  00       BRK  
  0x048FDB $8FCB: C-----  00       BRK  
  0x048FDC $8FCC: C-----  00       BRK  
  0x048FDD $8FCD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048FDE $8FCE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048FDF $8FCF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x048FE0 $8FD0: ------  .byte $FD
  0x048FE1 $8FD1: ------  .byte $7F
  0x048FE2 $8FD2: ------  .byte $7E
  0x048FE3 $8FD3: ------  .byte $3C
  0x048FE4 $8FD4: ------  .byte $18
  0x048FE5 $8FD5: ------  .byte $00
  0x048FE6 $8FD6: ------  .byte $00
  0x048FE7 $8FD7: ------  .byte $00
  0x048FE8 $8FD8: ------  .byte $3A
  0x048FE9 $8FD9: ------  .byte $14
  0x048FEA $8FDA: ------  .byte $3C
  0x048FEB $8FDB: ------  .byte $18
  0x048FEC $8FDC: ------  .byte $00
  0x048FED $8FDD: ------  .byte $00
  0x048FEE $8FDE: ------  .byte $00
  0x048FEF $8FDF: ------  .byte $00
  0x048FF0 $8FE0: C-----  00       BRK  
  0x048FF1 $8FE1: C-----  01 01    ORA  ($01,X)
  0x048FF3 $8FE3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048FF4 $8FE4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x048FF5 $8FE5: C-----  06 06    ASL  $06
  0x048FF7 $8FE7: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x048FF8 $8FE8: C-----  00       BRK  
  0x048FF9 $8FE9: C-----  01 01    ORA  ($01,X)
  0x048FFB $8FEB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x048FFC $8FEC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x048FFD $8FED: C-----  06 06    ASL  $06
  0x048FFF $8FEF: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x049000 $8FF0: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x049001 $8FF1: C-----  18       CLC  
  0x049002 $8FF2: C-----  18       CLC  
  0x049003 $8FF3: C-----  30 20    BMI  $9015
  0x049005 $8FF5: C-----  60       RTS  
  0x049006 $8FF6: C-----  40       RTI  
  0x049007 $8FF7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049008 $8FF8: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x049009 $8FF9: C-----  18       CLC  
  0x04900A $8FFA: C-----  18       CLC  
  0x04900B $8FFB: C-----  30 20    BMI  $901D
  0x04900D $8FFD: C-----  60       RTS  
  0x04900E $8FFE: C-----  40       RTI  
  0x04900F $8FFF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049010 $9000: ------  .byte $00
  0x049011 $9001: ------  .byte $00
  0x049012 $9002: ------  .byte $00
  0x049013 $9003: ------  .byte $00
  0x049014 $9004: ------  .byte $00
  0x049015 $9005: ------  .byte $00
  0x049016 $9006: ------  .byte $00
  0x049017 $9007: ------  .byte $00
  0x049018 $9008: ------  .byte $00
  0x049019 $9009: ------  .byte $00
  0x04901A $900A: ------  .byte $00
  0x04901B $900B: ------  .byte $00
  0x04901C $900C: ------  .byte $00
  0x04901D $900D: ------  .byte $00
  0x04901E $900E: ------  .byte $00
  0x04901F $900F: ------  .byte $00
  0x049020 $9010: ------  .byte $FF
  0x049021 $9011: ------  .byte $FF
  0x049022 $9012: ------  .byte $FF
  0x049023 $9013: ------  .byte $FF
  0x049024 $9014: ------  .byte $FF
  0x049025 $9015: ------  .byte $FF
  0x049026 $9016: ------  .byte $FF
  0x049027 $9017: ------  .byte $FF
  0x049028 $9018: ------  .byte $00
  0x049029 $9019: ------  .byte $00
  0x04902A $901A: ------  .byte $00
  0x04902B $901B: ------  .byte $00
  0x04902C $901C: ------  .byte $00
  0x04902D $901D: ------  .byte $00
  0x04902E $901E: ------  .byte $00
  0x04902F $901F: ------  .byte $00
  0x049030 $9020: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049031 $9021: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049032 $9022: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049033 $9023: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049034 $9024: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049035 $9025: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049036 $9026: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049037 $9027: C-----  00       BRK  
  0x049038 $9028: C-----  00       BRK  
  0x049039 $9029: C-----  3E 7F 3F ROL  $3F7F,X
  0x04903C $902C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04903D $902D: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04903E $902E: C-----  00       BRK  
  0x04903F $902F: C-----  00       BRK  
  0x049040 $9030: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049041 $9031: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049042 $9032: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049043 $9033: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049044 $9034: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049045 $9035: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049046 $9036: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049047 $9037: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x049048 $9038: C-----  00       BRK  
  0x049049 $9039: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04904A $903A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04904B $903B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04904C $903C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04904D $903D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04904E $903E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04904F $903F: C-----  00       BRK  
  0x049050 $9040: C-----  56 AA    LSR  $AA,X
  0x049052 $9042: C-----  56 AE    LSR  $AE,X
  0x049054 $9044: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x049055 $9045: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049056 $9046: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049057 $9047: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049058 $9048: C-----  A8       TAY  
  0x049059 $9049: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04905A $904A: C-----  A8       TAY  
  0x04905B $904B: C-----  50 A6    BVC  $8FF3
  0x04905D $904D: C-----  CE 3E FE DEC  $FE3E
  0x049060 $9050: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049061 $9051: C-----  F0 FE    BEQ  $9051
  0x049063 $9053: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049064 $9054: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049065 $9055: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049066 $9056: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049067 $9057: C-----  FE 00 80 INC  $8000,X
  0x04906A $905A: C-----  F0 FC    BEQ  $9058
  0x04906C $905C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04906D $905D: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04906E $905E: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04906F $905F: C-----  F9 00 00 SBC  $0000,Y
  0x049072 $9062: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049073 $9063: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049074 $9064: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049075 $9065: C-----  C0 C0    CPY  #$C0
  0x049077 $9067: C-----  E0 00    CPX  #$00
  0x049079 $9069: C-----  00       BRK  
  0x04907A $906A: C-----  00       BRK  
  0x04907B $906B: C-----  00       BRK  
  0x04907C $906C: C-----  00       BRK  
  0x04907D $906D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04907E $906E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04907F $906F: C-----  C0 F9    CPY  #$F9
  0x049081 $9071: C-----  78       SEI  
  0x049082 $9072: C-----  38       SEC  
  0x049083 $9073: C-----  18       CLC  
  0x049084 $9074: C-----  09 08    ORA  #$08
  0x049086 $9076: C-----  05 07    ORA  $07
  0x049088 $9078: C-----  76 37    ROR  $37,X
  0x04908A $907A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04908B $907B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04908C $907C: C-----  06 07    ASL  $07
  0x04908E $907E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04908F $907F: C-----  00       BRK  
  0x049090 $9080: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049091 $9081: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049092 $9082: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049093 $9083: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049094 $9084: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049095 $9085: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x049096 $9086: C-----  5E AC 6F LSR  $6FAC,X
  0x049099 $9089: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04909A $908A: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04909B $908B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04909C $908C: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x04909D $908D: C-----  46 A0    LSR  $A0
  0x04909F $908F: C-----  50 FF    BVC  $9090
  0x0490A1 $9091: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0490A2 $9092: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0490A3 $9093: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0490A4 $9094: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0490A5 $9095: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0490A6 $9096: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0490A7 $9097: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0490A8 $9098: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0490A9 $9099: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0490AA $909A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0490AB $909B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0490AC $909C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0490AD $909D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0490AE $909E: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0490AF $909F: C-----  00       BRK  
  0x0490B0 $90A0: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0490B1 $90A1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0490B2 $90A2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0490B3 $90A3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0490B4 $90A4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0490B5 $90A5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0490B6 $90A6: C-----  01 01    ORA  ($01,X)
  0x0490B8 $90A8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0490B9 $90A9: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0490BA $90AA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0490BB $90AB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0490BC $90AC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0490BD $90AD: C-----  01 00    ORA  ($00,X)
  0x0490BF $90AF: C-----  00       BRK  
  0x0490C0 $90B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0490C1 $90B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0490C2 $90B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0490C3 $90B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0490C4 $90B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0490C5 $90B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0490C6 $90B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0490C7 $90B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0490C8 $90B8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0490C9 $90B9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0490CA $90BA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0490CB $90BB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0490CC $90BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0490CD $90BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0490CE $90BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0490CF $90BF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0490D0 $90C0: C-----  E0 F0    CPX  #$F0
  0x0490D2 $90C2: C-----  F0 F0    BEQ  $90B4
  0x0490D4 $90C4: C-----  E0 C0    CPX  #$C0
  0x0490D6 $90C6: C-----  00       BRK  
  0x0490D7 $90C7: C-----  00       BRK  
  0x0490D8 $90C8: C-----  C0 E0    CPY  #$E0
  0x0490DA $90CA: C-----  E0 E0    CPX  #$E0
  0x0490DC $90CC: C-----  C0 00    CPY  #$00
  0x0490DE $90CE: C-----  00       BRK  
  0x0490DF $90CF: C-----  00       BRK  
  0x0490E0 $90D0: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x0490E1 $90D1: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x0490E2 $90D2: C-----  35 3B    AND  $3B,X
  0x0490E4 $90D4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0490E5 $90D5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0490E6 $90D6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0490E7 $90D7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0490E8 $90D8: C-----  08       PHP  
  0x0490E9 $90D9: C-----  09 1B    ORA  #$1B
  0x0490EB $90DB: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0490EC $90DC: C-----  1D 0F 0C ORA  $0C0F,X
  0x0490EF $90DF: C-----  06 80    ASL  $80
  0x0490F1 $90E1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0490F2 $90E2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0490F3 $90E3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0490F4 $90E4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0490F5 $90E5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0490F6 $90E6: C-----  C0 C0    CPY  #$C0
  0x0490F8 $90E8: C-----  00       BRK  
  0x0490F9 $90E9: C-----  00       BRK  
  0x0490FA $90EA: C-----  00       BRK  
  0x0490FB $90EB: C-----  00       BRK  
  0x0490FC $90EC: C-----  00       BRK  
  0x0490FD $90ED: C-----  00       BRK  
  0x0490FE $90EE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0490FF $90EF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049100 $90F0: C-----  06 04    ASL  $04
  0x049102 $90F2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049103 $90F3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049104 $90F4: C-----  1E 7F FF ASL  $FF7F,X
  0x049107 $90F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049108 $90F8: C-----  F9 FB FB SBC  $FBFB,Y
  0x04910B $90FB: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04910C $90FC: C-----  E1 8C    SBC  ($8C,X)
  0x04910E $90FE: C-----  5E 3F 00 LSR  $003F,X
  0x049111 $9101: C-----  00       BRK  
  0x049112 $9102: C-----  00       BRK  
  0x049113 $9103: C-----  F1 1E    SBC  ($1E),Y
  0x049115 $9105: C-----  C4 78    CPY  $78
  0x049117 $9107: C-----  10 00    BPL  $9109
  0x049119 $9109: C-----  00       BRK  
  0x04911A $910A: C-----  00       BRK  
  0x04911B $910B: C-----  00       BRK  
  0x04911C $910C: C-----  01 03    ORA  ($03,X)
  0x04911E $910E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04911F $910F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049120 $9110: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049121 $9111: C-----  18       CLC  
  0x049122 $9112: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x049123 $9113: C-----  4C 80 00 JMP  $0080
  0x049126 $9116: C-----  00       BRK  
  0x049127 $9117: C-----  00       BRK  
  0x049128 $9118: C-----  00       BRK  
  0x049129 $9119: C-----  00       BRK  
  0x04912A $911A: C-----  10 33    BPL  $914F
  0x04912C $911C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04912D $911D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04912E $911E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04912F $911F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049130 $9120: C-----  B0 E0    BCS  $9102
  0x049132 $9122: C-----  40       RTI  
  0x049133 $9123: C-----  88       DEY  
  0x049134 $9124: C-----  CC 5D 7F CPY  $7F5D
  0x049137 $9127: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049138 $9128: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049139 $9129: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04913A $912A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04913B $912B: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04913C $912C: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x04913D $912D: C-----  2A       ROL  A
  0x04913E $912E: C-----  08       PHP  
  0x04913F $912F: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049140 $9130: C-----  00       BRK  
  0x049141 $9131: C-----  00       BRK  
  0x049142 $9132: C-----  00       BRK  
  0x049143 $9133: C-----  00       BRK  
  0x049144 $9134: C-----  00       BRK  
  0x049145 $9135: C-----  00       BRK  
  0x049146 $9136: C-----  20 64 FF JSR  $FF64
  0x049149 $9139: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04914A $913A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04914B $913B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04914C $913C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04914D $913D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04914E $913E: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04914F $913F: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x049150 $9140: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x049151 $9141: C-----  E4 5C    CPX  $5C
  0x049153 $9143: C-----  28       PLP  
  0x049154 $9144: C-----  0A       ASL  A
  0x049155 $9145: C-----  0A       ASL  A
  0x049156 $9146: C-----  06 02    ASL  $02
  0x049158 $9148: C-----  00       BRK  
  0x049159 $9149: C-----  00       BRK  
  0x04915A $914A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04915B $914B: C-----  D0 F0    BNE  $913D
  0x04915D $914D: C-----  F0 F8    BEQ  $9147
  0x04915F $914F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049160 $9150: C-----  00       BRK  
  0x049161 $9151: C-----  00       BRK  
  0x049162 $9152: C-----  00       BRK  
  0x049163 $9153: C-----  00       BRK  
  0x049164 $9154: C-----  00       BRK  
  0x049165 $9155: C-----  00       BRK  
  0x049166 $9156: C-----  00       BRK  
  0x049167 $9157: C-----  00       BRK  
  0x049168 $9158: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049169 $9159: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04916A $915A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04916B $915B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04916C $915C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04916D $915D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04916E $915E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04916F $915F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049170 $9160: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049171 $9161: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049172 $9162: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049173 $9163: C-----  01 01    ORA  ($01,X)
  0x049175 $9165: C-----  01 02    ORA  ($02,X)
  0x049177 $9167: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049178 $9168: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049179 $9169: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04917A $916A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04917B $916B: C-----  FE FE FE INC  $FEFE,X
  0x04917E $916E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04917F $916F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049180 $9170: C-----  00       BRK  
  0x049181 $9171: C-----  00       BRK  
  0x049182 $9172: C-----  00       BRK  
  0x049183 $9173: C-----  00       BRK  
  0x049184 $9174: C-----  00       BRK  
  0x049185 $9175: C-----  00       BRK  
  0x049186 $9176: C-----  00       BRK  
  0x049187 $9177: C-----  00       BRK  
  0x049188 $9178: C-----  00       BRK  
  0x049189 $9179: C-----  00       BRK  
  0x04918A $917A: C-----  00       BRK  
  0x04918B $917B: C-----  00       BRK  
  0x04918C $917C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04918D $917D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04918E $917E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04918F $917F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049190 $9180: C-----  E8       INX  
  0x049191 $9181: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049192 $9182: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049193 $9183: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049194 $9184: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x049195 $9185: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x049196 $9186: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049197 $9187: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049198 $9188: C-----  00       BRK  
  0x049199 $9189: C-----  40       RTI  
  0x04919A $918A: C-----  D6 C2    DEC  $C2,X
  0x04919C $918C: C-----  E4 ED    CPX  $ED
  0x04919E $918E: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04919F $918F: C-----  70 05    BVS  $9196
  0x0491A1 $9191: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0491A2 $9192: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0491A3 $9193: C-----  C9 DC    CMP  #$DC
  0x0491A5 $9195: C-----  E6 C3    INC  $C3
  0x0491A7 $9197: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0491A8 $9198: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x0491A9 $9199: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0491AA $919A: C-----  78       SEI  
  0x0491AB $919B: C-----  B0 A0    BCS  $913D
  0x0491AD $919D: C-----  00       BRK  
  0x0491AE $919E: C-----  00       BRK  
  0x0491AF $919F: C-----  00       BRK  
  0x0491B0 $91A0: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x0491B1 $91A1: C-----  6D 35 1F ADC  $1F35
  0x0491B4 $91A4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0491B5 $91A5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0491B6 $91A6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0491B7 $91A7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0491B8 $91A8: C-----  24 92    BIT  $92
  0x0491BA $91AA: C-----  CA       DEX  
  0x0491BB $91AB: C-----  E0 CF    CPX  #$CF
  0x0491BD $91AD: C-----  B9 47 1F LDA  $1F47,Y
  0x0491C0 $91B0: C-----  00       BRK  
  0x0491C1 $91B1: C-----  00       BRK  
  0x0491C2 $91B2: C-----  00       BRK  
  0x0491C3 $91B3: C-----  F0 1E    BEQ  $91D3
  0x0491C5 $91B5: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0491C6 $91B6: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x0491C7 $91B7: C-----  38       SEC  
  0x0491C8 $91B8: C-----  00       BRK  
  0x0491C9 $91B9: C-----  00       BRK  
  0x0491CA $91BA: C-----  00       BRK  
  0x0491CB $91BB: C-----  00       BRK  
  0x0491CC $91BC: C-----  00       BRK  
  0x0491CD $91BD: C-----  00       BRK  
  0x0491CE $91BE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0491CF $91BF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0491D0 $91C0: C-----  00       BRK  
  0x0491D1 $91C1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0491D2 $91C2: C-----  60       RTS  
  0x0491D3 $91C3: C-----  90 C8    BCC  $918D
  0x0491D5 $91C5: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0491D6 $91C6: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x0491D7 $91C7: C-----  !!UNDEF $B2  ; unknown opcode, treating as data
  0x0491D8 $91C8: C-----  00       BRK  
  0x0491D9 $91C9: C-----  00       BRK  
  0x0491DA $91CA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0491DB $91CB: C-----  60       RTS  
  0x0491DC $91CC: C-----  30 B8    BMI  $9186
  0x0491DE $91CE: C-----  98       TYA  
  0x0491DF $91CF: C-----  4C 00 00 JMP  $0000
  0x0491E2 $91D2: C-----  00       BRK  
  0x0491E3 $91D3: C-----  00       BRK  
  0x0491E4 $91D4: C-----  DE 33 00 DEC  $0033,X
  0x0491E7 $91D7: C-----  C4 00    CPY  $00
  0x0491E9 $91D9: C-----  00       BRK  
  0x0491EA $91DA: C-----  00       BRK  
  0x0491EB $91DB: C-----  00       BRK  
  0x0491EC $91DC: C-----  00       BRK  
  0x0491ED $91DD: C-----  CC FF 3B CPY  $3BFF
  0x0491F0 $91E0: C-----  91 F0    STA  ($F0),Y
  0x0491F2 $91E2: C-----  40       RTI  
  0x0491F3 $91E3: C-----  28       PLP  
  0x0491F4 $91E4: C-----  4C 5D 5F JMP  $5F5D
  0x0491F7 $91E7: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0491F8 $91E8: C-----  0E 0F 3F ASL  $3F0F
  0x0491FB $91EB: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x0491FC $91EC: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x0491FD $91ED: C-----  2A       ROL  A
  0x0491FE $91EE: C-----  28       PLP  
  0x0491FF $91EF: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049200 $91F0: C-----  26 00    ROL  $00
  0x049202 $91F2: C-----  00       BRK  
  0x049203 $91F3: C-----  00       BRK  
  0x049204 $91F4: C-----  00       BRK  
  0x049205 $91F5: C-----  00       BRK  
  0x049206 $91F6: C-----  20 F4 D9 JSR  $D9F4
  0x049209 $91F9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04920A $91FA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04920B $91FB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04920C $91FC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04920D $91FD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04920E $91FE: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04920F $91FF: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x049210 $9200: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049211 $9201: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049212 $9202: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049213 $9203: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049214 $9204: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049215 $9205: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049216 $9206: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x049217 $9207: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x049218 $9208: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049219 $9209: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04921A $920A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04921B $920B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04921C $920C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04921D $920D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04921E $920E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04921F $920F: C-----  00       BRK  
  0x049220 $9210: C-----  C0 E0    CPY  #$E0
  0x049222 $9212: C-----  F0 F8    BEQ  $920C
  0x049224 $9214: C-----  E8       INX  
  0x049225 $9215: C-----  EC DC BC CPX  $BCDC
  0x049228 $9218: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049229 $9219: C-----  C0 C0    CPY  #$C0
  0x04922B $921B: C-----  C0 D0    CPY  #$D0
  0x04922D $921D: C-----  90 20    BCC  $923F
  0x04922F $921F: C-----  40       RTI  
  0x049230 $9220: C-----  10 0F    BPL  $9231
  0x049232 $9222: C-----  08       PHP  
  0x049233 $9223: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049234 $9224: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049235 $9225: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049236 $9226: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049237 $9227: C-----  01 0F    ORA  ($0F,X)
  0x049239 $9229: C-----  00       BRK  
  0x04923A $922A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04923B $922B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04923C $922C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04923D $922D: C-----  01 01    ORA  ($01,X)
  0x04923F $922F: C-----  00       BRK  
  0x049240 $9230: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x049241 $9231: C-----  EC 16 0A CPX  $0A16
  0x049244 $9234: C-----  06 0A    ASL  $0A
  0x049246 $9236: C-----  06 0B    ASL  $0B
  0x049248 $9238: C-----  88       DEY  
  0x049249 $9239: C-----  10 E8    BPL  $9223
  0x04924B $923B: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04924C $923C: C-----  F8       SED  
  0x04924D $923D: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04924E $923E: C-----  F8       SED  
  0x04924F $923F: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x049250 $9240: C-----  00       BRK  
  0x049251 $9241: C-----  00       BRK  
  0x049252 $9242: C-----  00       BRK  
  0x049253 $9243: C-----  00       BRK  
  0x049254 $9244: C-----  00       BRK  
  0x049255 $9245: C-----  01 06    ORA  ($06,X)
  0x049257 $9247: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x049258 $9248: C-----  00       BRK  
  0x049259 $9249: C-----  00       BRK  
  0x04925A $924A: C-----  00       BRK  
  0x04925B $924B: C-----  00       BRK  
  0x04925C $924C: C-----  00       BRK  
  0x04925D $924D: C-----  00       BRK  
  0x04925E $924E: C-----  01 03    ORA  ($03,X)
  0x049260 $9250: C-----  00       BRK  
  0x049261 $9251: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049262 $9252: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x049263 $9253: C-----  24 6E    BIT  $6E
  0x049265 $9255: C-----  AA       TAX  
  0x049266 $9256: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x049267 $9257: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x049268 $9258: C-----  00       BRK  
  0x049269 $9259: C-----  00       BRK  
  0x04926A $925A: C-----  00       BRK  
  0x04926B $925B: C-----  00       BRK  
  0x04926C $925C: C-----  00       BRK  
  0x04926D $925D: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04926E $925E: C-----  8C 9C 38 STY  $389C
  0x049271 $9261: C-----  70 A0    BVS  $9203
  0x049273 $9263: C-----  40       RTI  
  0x049274 $9264: C-----  00       BRK  
  0x049275 $9265: C-----  00       BRK  
  0x049276 $9266: C-----  00       BRK  
  0x049277 $9267: C-----  00       BRK  
  0x049278 $9268: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x049279 $9269: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04927A $926A: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04927B $926B: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04927C $926C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04927D $926D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04927E $926E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04927F $926F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049280 $9270: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x049281 $9271: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x049282 $9272: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049283 $9273: C-----  05 05    ORA  $05
  0x049285 $9275: C-----  01 01    ORA  ($01,X)
  0x049287 $9277: C-----  01 3C    ORA  ($3C,X)
  0x049289 $9279: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04928A $927A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04928B $927B: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04928C $927C: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04928D $927D: C-----  FE FE FE INC  $FEFE,X
  0x049290 $9280: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049291 $9281: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049292 $9282: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049293 $9283: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049294 $9284: C-----  01 01    ORA  ($01,X)
  0x049296 $9286: C-----  01 01    ORA  ($01,X)
  0x049298 $9288: C-----  01 01    ORA  ($01,X)
  0x04929A $928A: C-----  01 01    ORA  ($01,X)
  0x04929C $928C: C-----  00       BRK  
  0x04929D $928D: C-----  00       BRK  
  0x04929E $928E: C-----  00       BRK  
  0x04929F $928F: C-----  00       BRK  
  0x0492A0 $9290: C-----  85 83    STA  $83
  0x0492A2 $9292: C-----  45 43    EOR  $43
  0x0492A4 $9294: C-----  45 23    EOR  $23
  0x0492A6 $9296: C-----  25 2F    AND  $2F
  0x0492A8 $9298: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x0492A9 $9299: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0492AA $929A: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x0492AB $929B: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0492AC $929C: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x0492AD $929D: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0492AE $929E: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x0492AF $929F: C-----  10 39    BPL  $92DA
  0x0492B1 $92A1: C-----  18       CLC  
  0x0492B2 $92A2: C-----  08       PHP  
  0x0492B3 $92A3: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0492B4 $92A4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0492B5 $92A5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0492B6 $92A6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0492B7 $92A7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0492B8 $92A8: C-----  06 07    ASL  $07
  0x0492BA $92AA: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x0492BB $92AB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0492BC $92AC: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0492BD $92AD: C-----  00       BRK  
  0x0492BE $92AE: C-----  00       BRK  
  0x0492BF $92AF: C-----  00       BRK  
  0x0492C0 $92B0: C-----  00       BRK  
  0x0492C1 $92B1: C-----  C0 C0    CPY  #$C0
  0x0492C3 $92B3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0492C4 $92B4: C-----  E0 E0    CPX  #$E0
  0x0492C6 $92B6: C-----  E0 C0    CPX  #$C0
  0x0492C8 $92B8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0492C9 $92B9: C-----  00       BRK  
  0x0492CA $92BA: C-----  00       BRK  
  0x0492CB $92BB: C-----  60       RTS  
  0x0492CC $92BC: C-----  00       BRK  
  0x0492CD $92BD: C-----  00       BRK  
  0x0492CE $92BE: C-----  00       BRK  
  0x0492CF $92BF: C-----  00       BRK  
  0x0492D0 $92C0: C-----  00       BRK  
  0x0492D1 $92C1: C-----  00       BRK  
  0x0492D2 $92C2: C-----  00       BRK  
  0x0492D3 $92C3: C-----  00       BRK  
  0x0492D4 $92C4: C-----  00       BRK  
  0x0492D5 $92C5: C-----  00       BRK  
  0x0492D6 $92C6: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0492D7 $92C7: C-----  4C FF FF JMP  $FFFF
  0x0492DA $92CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0492DB $92CB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0492DC $92CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0492DD $92CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0492DE $92CE: C-----  DD B3 01 CMP  $01B3,X
  0x0492E1 $92D1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0492E2 $92D2: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0492E3 $92D3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0492E4 $92D4: C-----  05 01    ORA  $01
  0x0492E6 $92D6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0492E7 $92D7: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x0492E8 $92D8: C-----  FE FC FC INC  $FCFC,X
  0x0492EB $92DB: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0492EC $92DC: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x0492ED $92DD: C-----  FE FC 7C INC  $7CFC,X
  0x0492F0 $92E0: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x0492F1 $92E1: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x0492F2 $92E2: C-----  31 3F    AND  ($3F),Y
  0x0492F4 $92E4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0492F5 $92E5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0492F6 $92E6: C-----  1E 1E 08 ASL  $081E,X
  0x0492F9 $92E9: C-----  09 1F    ORA  #$1F
  0x0492FB $92EB: C-----  1D 1F 0C ORA  $0C1F,X
  0x0492FE $92EE: C-----  0D 05 FF ORA  $FF05
  0x049301 $92F1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049302 $92F2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049303 $92F3: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x049304 $92F4: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x049305 $92F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049306 $92F6: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049307 $92F7: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049308 $92F8: C-----  00       BRK  
  0x049309 $92F9: C-----  4A       LSR  A
  0x04930A $92FA: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x04930B $92FB: C-----  E6 FC    INC  $FC
  0x04930D $92FD: C-----  7D BC B0 ADC  $B0BC,X
  0x049310 $9300: C-----  90 E0    BCC  $92E2
  0x049312 $9302: C-----  49 4A    EOR  #$4A
  0x049314 $9304: C-----  56 5F    LSR  $5F,X
  0x049316 $9306: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x049317 $9307: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049318 $9308: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049319 $9309: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04931A $930A: C-----  36 35    ROL  $35,X
  0x04931C $930C: C-----  29 22    AND  #$22
  0x04931E $930E: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04931F $930F: C-----  01 00    ORA  ($00,X)
  0x049321 $9311: C-----  00       BRK  
  0x049322 $9312: C-----  00       BRK  
  0x049323 $9313: C-----  00       BRK  
  0x049324 $9314: C-----  60       RTS  
  0x049325 $9315: C-----  E8       INX  
  0x049326 $9316: C-----  E9 ED    SBC  #$ED
  0x049328 $9318: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049329 $9319: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04932A $931A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04932B $931B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04932C $931C: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04932D $931D: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04932E $931E: C-----  D6 D2    DEC  $D2,X
  0x049330 $9320: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x049331 $9321: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x049332 $9322: C-----  35 3B    AND  $3B,X
  0x049334 $9324: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049335 $9325: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049336 $9326: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x049337 $9327: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x049338 $9328: C-----  09 09    ORA  #$09
  0x04933A $932A: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x04933B $932B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04933C $932C: C-----  1D 0F 0C ORA  $0C0F,X
  0x04933F $932F: C-----  06 FD    ASL  $FD
  0x049341 $9331: C-----  FE FF DF INC  $DFFF,X
  0x049344 $9334: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x049345 $9335: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x049346 $9336: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049347 $9337: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049348 $9338: C-----  C8       INY  
  0x049349 $9339: C-----  E8       INX  
  0x04934A $933A: C-----  C4 E2    CPY  $E2
  0x04934C $933C: C-----  E4 FD    CPX  $FD
  0x04934E $933E: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04934F $933F: C-----  70 37    BVS  $9378
  0x049351 $9341: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x049352 $9342: C-----  35 3B    AND  $3B,X
  0x049354 $9344: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049355 $9345: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049356 $9346: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x049357 $9347: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x049358 $9348: C-----  08       PHP  
  0x049359 $9349: C-----  09 1B    ORA  #$1B
  0x04935B $934B: C-----  1D 1D 0F ORA  $0F1D,X
  0x04935E $934E: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04935F $934F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x049360 $9350: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049361 $9351: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049362 $9352: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049363 $9353: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x049364 $9354: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x049365 $9355: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049366 $9356: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049367 $9357: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049368 $9358: C-----  60       RTS  
  0x049369 $9359: C-----  84 C0    STY  $C0
  0x04936B $935B: C-----  E6 EC    INC  $EC
  0x04936D $935D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04936E $935E: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04936F $935F: C-----  F0 00    BEQ  $9361
  0x049371 $9361: C-----  00       BRK  
  0x049372 $9362: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049373 $9363: C-----  E0 9F    CPX  #$9F
  0x049375 $9365: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049376 $9366: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049377 $9367: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049378 $9368: C-----  00       BRK  
  0x049379 $9369: C-----  00       BRK  
  0x04937A $936A: C-----  00       BRK  
  0x04937B $936B: C-----  00       BRK  
  0x04937C $936C: C-----  60       RTS  
  0x04937D $936D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04937E $936E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04937F $936F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049380 $9370: C-----  00       BRK  
  0x049381 $9371: C-----  00       BRK  
  0x049382 $9372: C-----  00       BRK  
  0x049383 $9373: C-----  00       BRK  
  0x049384 $9374: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049385 $9375: C-----  01 00    ORA  ($00,X)
  0x049387 $9377: C-----  00       BRK  
  0x049388 $9378: C-----  00       BRK  
  0x049389 $9379: C-----  00       BRK  
  0x04938A $937A: C-----  00       BRK  
  0x04938B $937B: C-----  00       BRK  
  0x04938C $937C: C-----  00       BRK  
  0x04938D $937D: C-----  FE FF FF INC  $FFFF,X
  0x049390 $9380: C-----  90 E0    BCC  $9362
  0x049392 $9382: C-----  68       PLA  
  0x049393 $9383: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x049394 $9384: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049395 $9385: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x049396 $9386: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049397 $9387: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049398 $9388: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049399 $9389: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04939A $938A: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04939B $938B: C-----  05 10    ORA  $10
  0x04939D $938D: C-----  08       PHP  
  0x04939E $938E: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x04939F $938F: C-----  09 00    ORA  #$00
  0x0493A1 $9391: C-----  00       BRK  
  0x0493A2 $9392: C-----  00       BRK  
  0x0493A3 $9393: C-----  00       BRK  
  0x0493A4 $9394: C-----  24 59    BIT  $59
  0x0493A6 $9396: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0493A7 $9397: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0493A8 $9398: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0493A9 $9399: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0493AA $939A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0493AB $939B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0493AC $939C: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x0493AD $939D: C-----  A6 04    LDX  $04
  0x0493AF $939F: C-----  51 33    EOR  ($33),Y
  0x0493B1 $93A1: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x0493B2 $93A2: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0493B3 $93A3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0493B4 $93A4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0493B5 $93A5: C-----  5E 1F 1F LSR  $1F1F,X
  0x0493B8 $93A8: C-----  0D 09 1B ORA  $1B09
  0x0493BB $93AB: C-----  1D 1F 0D ORA  $0D1F,X
  0x0493BE $93AE: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0493BF $93AF: C-----  06 FF    ASL  $FF
  0x0493C1 $93B1: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x0493C2 $93B2: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0493C3 $93B3: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0493C4 $93B4: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0493C5 $93B5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0493C6 $93B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0493C7 $93B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0493C8 $93B8: C-----  C6 1A    DEC  $1A
  0x0493CA $93BA: C-----  E4 E4    CPX  $E4
  0x0493CC $93BC: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0493CD $93BD: C-----  9D 18 30 STA  $3018,X
  0x0493D0 $93C0: C-----  C0 C0    CPY  #$C0
  0x0493D2 $93C2: C-----  50 3C    BVC  $9400
  0x0493D4 $93C4: C-----  3E 3F 3F ROL  $3F3F,X
  0x0493D7 $93C7: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x0493D8 $93C8: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0493D9 $93C9: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0493DA $93CA: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0493DB $93CB: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0493DC $93CC: C-----  19 0E 13 ORA  $130E,Y
  0x0493DF $93CF: C-----  19 00 00 ORA  $0000,Y
  0x0493E2 $93D2: C-----  00       BRK  
  0x0493E3 $93D3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0493E4 $93D4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0493E5 $93D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0493E6 $93D6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0493E7 $93D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0493E8 $93D8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0493E9 $93D9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0493EA $93DA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0493EB $93DB: C-----  F8       SED  
  0x0493EC $93DC: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x0493ED $93DD: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0493EE $93DE: C-----  FE E0 37 INC  $37E0,X
  0x0493F1 $93E1: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x0493F2 $93E2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0493F3 $93E3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0493F4 $93E4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0493F5 $93E5: C-----  1E 1C 1E ASL  $1E1C,X
  0x0493F8 $93E8: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0493F9 $93E9: C-----  0D 0D 0F ORA  $0F0D
  0x0493FC $93EC: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0493FD $93ED: C-----  0D 07 07 ORA  $0707
  0x049400 $93F0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049401 $93F1: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x049402 $93F2: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x049403 $93F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049404 $93F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049405 $93F5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049406 $93F6: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049407 $93F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049408 $93F8: C-----  86 E2    STX  $E2
  0x04940A $93FA: C-----  EE FF 3F INC  $3FFF
  0x04940D $93FD: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04940E $93FE: C-----  B8       CLV  
  0x04940F $93FF: C-----  70 90    BVS  $9391
  0x049411 $9401: C-----  E6 6D    INC  $6D
  0x049413 $9403: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x049414 $9404: C-----  3D 3B 37 AND  $373B,X
  0x049417 $9407: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x049418 $9408: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049419 $9409: C-----  19 14 0B ORA  $0B14,Y
  0x04941C $940C: C-----  11 09    ORA  ($09),Y
  0x04941E $940E: C-----  11 08    ORA  ($08),Y
  0x049420 $9410: C-----  00       BRK  
  0x049421 $9411: C-----  00       BRK  
  0x049422 $9412: C-----  00       BRK  
  0x049423 $9413: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x049424 $9414: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x049425 $9415: C-----  00       BRK  
  0x049426 $9416: C-----  00       BRK  
  0x049427 $9417: C-----  00       BRK  
  0x049428 $9418: C-----  00       BRK  
  0x049429 $9419: C-----  00       BRK  
  0x04942A $941A: C-----  00       BRK  
  0x04942B $941B: C-----  00       BRK  
  0x04942C $941C: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04942D $941D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04942E $941E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04942F $941F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049430 $9420: C-----  90 E6    BCC  $9408
  0x049432 $9422: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x049433 $9423: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049434 $9424: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049435 $9425: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049436 $9426: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049437 $9427: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x049438 $9428: C-----  00       BRK  
  0x049439 $9429: C-----  00       BRK  
  0x04943A $942A: C-----  06 0F    ASL  $0F
  0x04943C $942C: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04943D $942D: C-----  0D 19 0C ORA  $0C19
  0x049440 $9430: C-----  00       BRK  
  0x049441 $9431: C-----  00       BRK  
  0x049442 $9432: C-----  00       BRK  
  0x049443 $9433: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049444 $9434: C-----  FE FF FF INC  $FFFF,X
  0x049447 $9437: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049448 $9438: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049449 $9439: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04944A $943A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04944B $943B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04944C $943C: C-----  FD FE F1 SBC  $F1FE,X
  0x04944F $943F: C-----  EE 00 00 INC  $0000
  0x049452 $9442: C-----  00       BRK  
  0x049453 $9443: C-----  00       BRK  
  0x049454 $9444: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049455 $9445: C-----  60       RTS  
  0x049456 $9446: C-----  10 08    BPL  $9450
  0x049458 $9448: C-----  00       BRK  
  0x049459 $9449: C-----  00       BRK  
  0x04945A $944A: C-----  00       BRK  
  0x04945B $944B: C-----  00       BRK  
  0x04945C $944C: C-----  00       BRK  
  0x04945D $944D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04945E $944E: C-----  E0 F0    CPX  #$F0
  0x049460 $9450: C-----  00       BRK  
  0x049461 $9451: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x049462 $9452: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x049463 $9453: C-----  CD 81 00 CMP  $0081
  0x049466 $9456: C-----  00       BRK  
  0x049467 $9457: C-----  00       BRK  
  0x049468 $9458: C-----  00       BRK  
  0x049469 $9459: C-----  00       BRK  
  0x04946A $945A: C-----  10 32    BPL  $948E
  0x04946C $945C: C-----  7E FF FF ROR  $FFFF,X
  0x04946F $945F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049470 $9460: C-----  08       PHP  
  0x049471 $9461: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049472 $9462: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049473 $9463: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049474 $9464: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049475 $9465: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049476 $9466: C-----  84 86    STY  $86
  0x049478 $9468: C-----  F0 F8    BEQ  $9462
  0x04947A $946A: C-----  F8       SED  
  0x04947B $946B: C-----  F8       SED  
  0x04947C $946C: C-----  F8       SED  
  0x04947D $946D: C-----  F8       SED  
  0x04947E $946E: C-----  78       SEI  
  0x04947F $946F: C-----  78       SEI  
  0x049480 $9470: C-----  60       RTS  
  0x049481 $9471: C-----  C0 E9    CPY  #$E9
  0x049483 $9473: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x049484 $9474: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x049485 $9475: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049486 $9476: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049487 $9477: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x049488 $9478: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x049489 $9479: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04948A $947A: C-----  16 2B    ASL  $2B,X
  0x04948C $947C: C-----  2C 0F 13 BIT  $130F
  0x04948F $947F: C-----  09 37    ORA  #$37
  0x049491 $9481: C-----  35 3F    AND  $3F,X
  0x049493 $9483: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049494 $9484: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049495 $9485: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049496 $9486: C-----  1E 1E 08 ASL  $081E,X
  0x049499 $9489: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04949A $948A: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04949B $948B: C-----  1D 1F 0C ORA  $0C1F,X
  0x04949E $948E: C-----  0D 05 FF ORA  $FF05
  0x0494A1 $9491: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0494A2 $9492: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0494A3 $9493: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x0494A4 $9494: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0494A5 $9495: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0494A6 $9496: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0494A7 $9497: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0494A8 $9498: C-----  CE 96 CE DEC  $CE96
  0x0494AB $949B: C-----  FE FF 1F INC  $1FFF,X
  0x0494AE $949E: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x0494AF $949F: C-----  F0 1C    BEQ  $94BD
  0x0494B1 $94A1: C-----  24 14    BIT  $14
  0x0494B3 $94A3: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0494B4 $94A4: C-----  06 02    ASL  $02
  0x0494B6 $94A6: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0494B7 $94A7: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0494B8 $94A8: C-----  E0 D8    CPX  #$D8
  0x0494BA $94AA: C-----  E8       INX  
  0x0494BB $94AB: C-----  E8       INX  
  0x0494BC $94AC: C-----  F8       SED  
  0x0494BD $94AD: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0494BE $94AE: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0494BF $94AF: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0494C0 $94B0: C-----  00       BRK  
  0x0494C1 $94B1: C-----  F0 FE    BEQ  $94B1
  0x0494C3 $94B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0494C4 $94B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0494C5 $94B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0494C6 $94B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0494C7 $94B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0494C8 $94B8: C-----  00       BRK  
  0x0494C9 $94B9: C-----  00       BRK  
  0x0494CA $94BA: C-----  F0 FC    BEQ  $94B8
  0x0494CC $94BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0494CD $94BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0494CE $94BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0494CF $94BF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0494D0 $94C0: C-----  0D CE F3 ORA  $F3CE
  0x0494D3 $94C3: C-----  F9 EC C6 SBC  $C6EC,Y
  0x0494D6 $94C6: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x0494D7 $94C7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0494D8 $94C8: C-----  F0 30    BEQ  $94FA
  0x0494DA $94CA: C-----  C0 C0    CPY  #$C0
  0x0494DC $94CC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0494DD $94CD: C-----  00       BRK  
  0x0494DE $94CE: C-----  00       BRK  
  0x0494DF $94CF: C-----  00       BRK  
  0x0494E0 $94D0: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x0494E1 $94D1: C-----  19 1F 1F ORA  $1F1F,Y
  0x0494E4 $94D4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0494E5 $94D5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0494E6 $94D6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0494E7 $94D7: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x0494E8 $94D8: C-----  09 0F    ORA  #$0F
  0x0494EA $94DA: C-----  0D 0D 0F ORA  $0F0D
  0x0494ED $94DD: C-----  06 07    ASL  $07
  0x0494EF $94DF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0494F0 $94E0: C-----  00       BRK  
  0x0494F1 $94E1: C-----  00       BRK  
  0x0494F2 $94E2: C-----  00       BRK  
  0x0494F3 $94E3: C-----  F5 FA    SBC  $FA,X
  0x0494F5 $94E5: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x0494F6 $94E6: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x0494F7 $94E7: C-----  F0 00    BEQ  $94E9
  0x0494F9 $94E9: C-----  00       BRK  
  0x0494FA $94EA: C-----  00       BRK  
  0x0494FB $94EB: C-----  00       BRK  
  0x0494FC $94EC: C-----  F5 EB    SBC  $EB,X
  0x0494FE $94EE: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x0494FF $94EF: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x049500 $94F0: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x049501 $94F1: C-----  35 37    AND  $37,X
  0x049503 $94F3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049504 $94F4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049505 $94F5: C-----  1E 1E 1E ASL  $1E1E,X
  0x049508 $94F8: C-----  09 0B    ORA  #$0B
  0x04950A $94FA: C-----  0D 1D 1C ORA  $1C1D
  0x04950D $94FD: C-----  0D 0D 07 ORA  $070D
  0x049510 $9500: C-----  00       BRK  
  0x049511 $9501: C-----  00       BRK  
  0x049512 $9502: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049513 $9503: C-----  00       BRK  
  0x049514 $9504: C-----  F0 28    BEQ  $952E
  0x049516 $9506: C-----  18       CLC  
  0x049517 $9507: C-----  18       CLC  
  0x049518 $9508: C-----  00       BRK  
  0x049519 $9509: C-----  00       BRK  
  0x04951A $950A: C-----  00       BRK  
  0x04951B $950B: C-----  00       BRK  
  0x04951C $950C: C-----  00       BRK  
  0x04951D $950D: C-----  C0 E0    CPY  #$E0
  0x04951F $950F: C-----  E0 00    CPX  #$00
  0x049521 $9511: C-----  00       BRK  
  0x049522 $9512: C-----  00       BRK  
  0x049523 $9513: C-----  F0 1F    BEQ  $9534
  0x049525 $9515: C-----  C4 6C    CPY  $6C
  0x049527 $9517: C-----  30 00    BMI  $9519
  0x049529 $9519: C-----  00       BRK  
  0x04952A $951A: C-----  00       BRK  
  0x04952B $951B: C-----  00       BRK  
  0x04952C $951C: C-----  00       BRK  
  0x04952D $951D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04952E $951E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04952F $951F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049530 $9520: C-----  00       BRK  
  0x049531 $9521: C-----  00       BRK  
  0x049532 $9522: C-----  20 B4 FF JSR  $FFB4
  0x049535 $9525: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049536 $9526: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049537 $9527: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049538 $9528: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049539 $9529: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04953A $952A: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04953B $952B: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x04953C $952C: C-----  20 F7 FE JSR  $FEF7
  0x04953F $952F: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x049540 $9530: C-----  A0 F0    LDY  #$F0
  0x049542 $9532: C-----  40       RTI  
  0x049543 $9533: C-----  28       PLP  
  0x049544 $9534: C-----  4C 5D 5F JMP  $5F5D
  0x049547 $9537: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049548 $9538: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x049549 $9539: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04954A $953A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04954B $953B: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04954C $953C: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x04954D $953D: C-----  2A       ROL  A
  0x04954E $953E: C-----  28       PLP  
  0x04954F $953F: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049550 $9540: C-----  00       BRK  
  0x049551 $9541: C-----  00       BRK  
  0x049552 $9542: C-----  18       CLC  
  0x049553 $9543: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x049554 $9544: C-----  00       BRK  
  0x049555 $9545: C-----  00       BRK  
  0x049556 $9546: C-----  00       BRK  
  0x049557 $9547: C-----  00       BRK  
  0x049558 $9548: C-----  00       BRK  
  0x049559 $9549: C-----  00       BRK  
  0x04955A $954A: C-----  00       BRK  
  0x04955B $954B: C-----  18       CLC  
  0x04955C $954C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04955D $954D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04955E $954E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04955F $954F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049560 $9550: C-----  00       BRK  
  0x049561 $9551: C-----  00       BRK  
  0x049562 $9552: C-----  00       BRK  
  0x049563 $9553: C-----  00       BRK  
  0x049564 $9554: C-----  C0 20    CPY  #$20
  0x049566 $9556: C-----  30 08    BMI  $9560
  0x049568 $9558: C-----  00       BRK  
  0x049569 $9559: C-----  00       BRK  
  0x04956A $955A: C-----  00       BRK  
  0x04956B $955B: C-----  00       BRK  
  0x04956C $955C: C-----  00       BRK  
  0x04956D $955D: C-----  C0 C0    CPY  #$C0
  0x04956F $955F: C-----  F0 00    BEQ  $9561
  0x049571 $9561: C-----  00       BRK  
  0x049572 $9562: C-----  00       BRK  
  0x049573 $9563: C-----  00       BRK  
  0x049574 $9564: C-----  00       BRK  
  0x049575 $9565: C-----  00       BRK  
  0x049576 $9566: C-----  00       BRK  
  0x049577 $9567: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x049578 $9568: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049579 $9569: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04957A $956A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04957B $956B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04957C $956C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04957D $956D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04957E $956E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04957F $956F: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x049580 $9570: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049581 $9571: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049582 $9572: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x049583 $9573: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049584 $9574: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049585 $9575: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049586 $9576: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049587 $9577: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049588 $9578: C-----  F8       SED  
  0x049589 $9579: C-----  F8       SED  
  0x04958A $957A: C-----  F0 F8    BEQ  $9574
  0x04958C $957C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04958D $957D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04958E $957E: C-----  F8       SED  
  0x04958F $957F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049590 $9580: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049591 $9581: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x049592 $9582: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x049593 $9583: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049594 $9584: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049595 $9585: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049596 $9586: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049597 $9587: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049598 $9588: C-----  86 E6    STX  $E6
  0x04959A $958A: C-----  FE FF FF INC  $FFFF,X
  0x04959D $958D: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04959E $958E: C-----  F8       SED  
  0x04959F $958F: C-----  F0 37    BEQ  $95C8
  0x0495A1 $9591: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x0495A2 $9592: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x0495A3 $9593: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0495A4 $9594: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0495A5 $9595: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0495A6 $9596: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0495A7 $9597: C-----  1E 08 09 ASL  $0908,X
  0x0495AA $959A: C-----  1D 1B 1B ORA  $1B1B,X
  0x0495AD $959D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0495AE $959E: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0495AF $959F: C-----  05 FC    ORA  $FC
  0x0495B1 $95A1: C-----  D6 F7    DEC  $F7,X
  0x0495B3 $95A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0495B4 $95A4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0495B5 $95A5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0495B6 $95A6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0495B7 $95A7: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0495B8 $95A8: C-----  00       BRK  
  0x0495B9 $95A9: C-----  E8       INX  
  0x0495BA $95AA: C-----  EE FE 3C INC  $3CFE
  0x0495BD $95AD: C-----  DD D8 B0 CMP  $B0D8,X
  0x0495C0 $95B0: C-----  05 02    ORA  $02
  0x0495C2 $95B2: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0495C3 $95B3: C-----  CA       DEX  
  0x0495C4 $95B4: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x0495C5 $95B5: C-----  ED CB 13 SBC  $13CB
  0x0495C8 $95B8: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x0495C9 $95B9: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0495CA $95BA: C-----  78       SEI  
  0x0495CB $95BB: C-----  B0 A0    BCS  $955D
  0x0495CD $95BD: C-----  00       BRK  
  0x0495CE $95BE: C-----  00       BRK  
  0x0495CF $95BF: C-----  01 E9    ORA  ($E9,X)
  0x0495D1 $95C1: C-----  FE 7F FF INC  $FF7F,X
  0x0495D4 $95C4: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x0495D5 $95C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0495D6 $95C6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0495D7 $95C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0495D8 $95C8: C-----  00       BRK  
  0x0495D9 $95C9: C-----  40       RTI  
  0x0495DA $95CA: C-----  D6 82    DEC  $82,X
  0x0495DC $95CC: C-----  E4 FD    CPX  $FD
  0x0495DE $95CE: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0495DF $95CF: C-----  70 05    BVS  $95D6
  0x0495E1 $95D1: C-----  06 8B    ASL  $8B
  0x0495E3 $95D3: C-----  D9 DC A6 CMP  $A6DC,Y
  0x0495E6 $95D6: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x0495E7 $95D7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0495E8 $95D8: C-----  F8       SED  
  0x0495E9 $95D9: C-----  F8       SED  
  0x0495EA $95DA: C-----  70 A0    BVS  $957C
  0x0495EC $95DC: C-----  A0 40    LDY  #$40
  0x0495EE $95DE: C-----  00       BRK  
  0x0495EF $95DF: C-----  00       BRK  
  0x0495F0 $95E0: C-----  00       BRK  
  0x0495F1 $95E1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0495F2 $95E2: C-----  E0 30    CPX  #$30
  0x0495F4 $95E4: C-----  F8       SED  
  0x0495F5 $95E5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0495F6 $95E6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0495F7 $95E7: C-----  FE 00 00 INC  $0000,X
  0x0495FA $95EA: C-----  00       BRK  
  0x0495FB $95EB: C-----  C0 00    CPY  #$00
  0x0495FD $95ED: C-----  70 F8    BVS  $95E7
  0x0495FF $95EF: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049600 $95F0: C-----  C0 F0    CPY  #$F0
  0x049602 $95F2: C-----  AC 54 3A LDY  $3A54
  0x049605 $95F5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049606 $95F6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049607 $95F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049608 $95F8: C-----  00       BRK  
  0x049609 $95F9: C-----  00       BRK  
  0x04960A $95FA: C-----  50 A8    BVC  $95A4
  0x04960C $95FC: C-----  C4 80    CPY  $80
  0x04960E $95FE: C-----  00       BRK  
  0x04960F $95FF: C-----  00       BRK  
  0x049610 $9600: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x049611 $9601: C-----  06 87    ASL  $87
  0x049613 $9603: C-----  C9 DC    CMP  #$DC
  0x049615 $9605: C-----  96 23    STX  $23,Y
  0x049617 $9607: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x049618 $9608: C-----  F8       SED  
  0x049619 $9609: C-----  F8       SED  
  0x04961A $960A: C-----  78       SEI  
  0x04961B $960B: C-----  B0 A0    BCS  $95AD
  0x04961D $960D: C-----  60       RTS  
  0x04961E $960E: C-----  C0 00    CPY  #$00
  0x049620 $9610: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049621 $9611: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049622 $9612: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049623 $9613: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049624 $9614: C-----  06 06    ASL  $06
  0x049626 $9616: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049627 $9617: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049628 $9618: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049629 $9619: C-----  3E 0E 06 ROL  $060E,X
  0x04962C $961C: C-----  01 01    ORA  ($01,X)
  0x04962E $961E: C-----  01 00    ORA  ($00,X)
  0x049630 $9620: C-----  00       BRK  
  0x049631 $9621: C-----  00       BRK  
  0x049632 $9622: C-----  00       BRK  
  0x049633 $9623: C-----  00       BRK  
  0x049634 $9624: C-----  20 D0 30 JSR  $30D0
  0x049637 $9627: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x049638 $9628: C-----  00       BRK  
  0x049639 $9629: C-----  00       BRK  
  0x04963A $962A: C-----  00       BRK  
  0x04963B $962B: C-----  00       BRK  
  0x04963C $962C: C-----  00       BRK  
  0x04963D $962D: C-----  00       BRK  
  0x04963E $962E: C-----  C0 E0    CPY  #$E0
  0x049640 $9630: C-----  00       BRK  
  0x049641 $9631: C-----  00       BRK  
  0x049642 $9632: C-----  48       PHA  
  0x049643 $9633: C-----  EC 5B C8 CPX  $C85B
  0x049646 $9636: C-----  40       RTI  
  0x049647 $9637: C-----  A0 00    LDY  #$00
  0x049649 $9639: C-----  00       BRK  
  0x04964A $963A: C-----  00       BRK  
  0x04964B $963B: C-----  00       BRK  
  0x04964C $963C: C-----  24 37    BIT  $37
  0x04964E $963E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04964F $963F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x049650 $9640: C-----  90 A0    BCC  $95E2
  0x049652 $9642: C-----  26 4E    ROL  $4E
  0x049654 $9644: C-----  5E DF BF LSR  $BFDF,X
  0x049657 $9647: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049658 $9648: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049659 $9649: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04965A $964A: C-----  19 35 2D ORA  $2D35,Y
  0x04965D $964D: C-----  24 0A    BIT  $0A
  0x04965F $964F: C-----  00       BRK  
  0x049660 $9650: C-----  00       BRK  
  0x049661 $9651: C-----  00       BRK  
  0x049662 $9652: C-----  00       BRK  
  0x049663 $9653: C-----  00       BRK  
  0x049664 $9654: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049665 $9655: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049666 $9656: C-----  A0 B4    LDY  #$B4
  0x049668 $9658: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049669 $9659: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04966A $965A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04966B $965B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04966C $965C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04966D $965D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04966E $965E: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04966F $965F: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x049670 $9660: C-----  00       BRK  
  0x049671 $9661: C-----  00       BRK  
  0x049672 $9662: C-----  88       DEY  
  0x049673 $9663: C-----  6C 92 01 JMP  ($0192)
  0x049676 $9666: C-----  00       BRK  
  0x049677 $9667: C-----  00       BRK  
  0x049678 $9668: C-----  00       BRK  
  0x049679 $9669: C-----  00       BRK  
  0x04967A $966A: C-----  00       BRK  
  0x04967B $966B: C-----  00       BRK  
  0x04967C $966C: C-----  6C FE FF JMP  ($FFFE)
  0x04967F $966F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049680 $9670: C-----  00       BRK  
  0x049681 $9671: C-----  00       BRK  
  0x049682 $9672: C-----  00       BRK  
  0x049683 $9673: C-----  00       BRK  
  0x049684 $9674: C-----  00       BRK  
  0x049685 $9675: C-----  C0 38    CPY  #$38
  0x049687 $9677: C-----  10 00    BPL  $9679
  0x049689 $9679: C-----  00       BRK  
  0x04968A $967A: C-----  00       BRK  
  0x04968B $967B: C-----  00       BRK  
  0x04968C $967C: C-----  00       BRK  
  0x04968D $967D: C-----  00       BRK  
  0x04968E $967E: C-----  C0 E0    CPY  #$E0
  0x049690 $9680: C-----  0E 08 04 ASL  $0408
  0x049693 $9683: C-----  84 84    STY  $84
  0x049695 $9685: C-----  84 04    STY  $04
  0x049697 $9687: C-----  4E F0 F0 LSR  $F0F0
  0x04969A $968A: C-----  F8       SED  
  0x04969B $968B: C-----  78       SEI  
  0x04969C $968C: C-----  78       SEI  
  0x04969D $968D: C-----  78       SEI  
  0x04969E $968E: C-----  F8       SED  
  0x04969F $968F: C-----  B0 E0    BCS  $9671
  0x0496A1 $9691: C-----  B0 40    BCS  $96D3
  0x0496A3 $9693: C-----  88       DEY  
  0x0496A4 $9694: C-----  CC 5D 7F CPY  $7F5D
  0x0496A7 $9697: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0496A8 $9698: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0496A9 $9699: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x0496AA $969A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0496AB $969B: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0496AC $969C: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x0496AD $969D: C-----  2A       ROL  A
  0x0496AE $969E: C-----  00       BRK  
  0x0496AF $969F: C-----  0A       ASL  A
  0x0496B0 $96A0: C-----  FD F6 F3 SBC  $F3F6,X
  0x0496B3 $96A3: C-----  F9 CC 86 SBC  $86CC,Y
  0x0496B6 $96A6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0496B7 $96A7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0496B8 $96A8: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0496B9 $96A9: C-----  C9 CC    CMP  #$CC
  0x0496BB $96AB: C-----  86 33    STX  $33
  0x0496BD $96AD: C-----  79 FC FC ADC  $FCFC,Y
  0x0496C0 $96B0: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x0496C1 $96B1: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x0496C2 $96B2: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x0496C3 $96B3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0496C4 $96B4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0496C5 $96B5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0496C6 $96B6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0496C7 $96B7: C-----  1E 0C 09 ASL  $090C,X
  0x0496CA $96BA: C-----  1D 1F 1D ORA  $1D1F,X
  0x0496CD $96BD: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0496CE $96BE: C-----  08       PHP  
  0x0496CF $96BF: C-----  05 08    ORA  $08
  0x0496D1 $96C1: C-----  06 04    ASL  $04
  0x0496D3 $96C3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0496D4 $96C4: C-----  00       BRK  
  0x0496D5 $96C5: C-----  01 03    ORA  ($03,X)
  0x0496D7 $96C7: C-----  00       BRK  
  0x0496D8 $96C8: C-----  F0 F8    BEQ  $96C2
  0x0496DA $96CA: C-----  F8       SED  
  0x0496DB $96CB: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0496DC $96CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0496DD $96CD: C-----  FE FC FF INC  $FFFC,X
  0x0496E0 $96D0: C-----  00       BRK  
  0x0496E1 $96D1: C-----  00       BRK  
  0x0496E2 $96D2: C-----  00       BRK  
  0x0496E3 $96D3: C-----  40       RTI  
  0x0496E4 $96D4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0496E5 $96D5: C-----  40       RTI  
  0x0496E6 $96D6: C-----  C0 80    CPY  #$80
  0x0496E8 $96D8: C-----  00       BRK  
  0x0496E9 $96D9: C-----  00       BRK  
  0x0496EA $96DA: C-----  00       BRK  
  0x0496EB $96DB: C-----  00       BRK  
  0x0496EC $96DC: C-----  00       BRK  
  0x0496ED $96DD: C-----  00       BRK  
  0x0496EE $96DE: C-----  00       BRK  
  0x0496EF $96DF: C-----  00       BRK  
  0x0496F0 $96E0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0496F1 $96E1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0496F2 $96E2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0496F3 $96E3: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0496F4 $96E4: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0496F5 $96E5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0496F6 $96E6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0496F7 $96E7: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0496F8 $96E8: C-----  00       BRK  
  0x0496F9 $96E9: C-----  56 06    LSR  $06,X
  0x0496FB $96EB: C-----  !!UNDEF $D2  ; unknown opcode, treating as data
  0x0496FC $96EC: C-----  CC FD 3C CPY  $3CFD
  0x0496FF $96EF: C-----  B0 01    BCS  $96F2
  0x049701 $96F1: C-----  00       BRK  
  0x049702 $96F2: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x049703 $96F3: C-----  CD C4 9A CMP  $9AC4
  0x049706 $96F6: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x049707 $96F7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049708 $96F8: C-----  FE FF 7C INC  $7CFF,X
  0x04970B $96FB: C-----  B0 B8    BCS  $96B5
  0x04970D $96FD: C-----  60       RTS  
  0x04970E $96FE: C-----  00       BRK  
  0x04970F $96FF: C-----  00       BRK  
  0x049710 $9700: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x049711 $9701: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x049712 $9702: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x049713 $9703: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x049714 $9704: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x049715 $9705: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049716 $9706: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049717 $9707: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049718 $9708: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x049719 $9709: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04971A $970A: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04971B $970B: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04971C $970C: C-----  E1 8C    SBC  ($8C,X)
  0x04971E $970E: C-----  5E 3F FE LSR  $FE3F,X
  0x049721 $9711: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049722 $9712: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049723 $9713: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049724 $9714: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049725 $9715: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049726 $9716: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049727 $9717: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049728 $9718: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049729 $9719: C-----  FE FE FF INC  $FFFE,X
  0x04972C $971C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04972D $971D: C-----  F9 47 1F SBC  $1F47,Y
  0x049730 $9720: C-----  F8       SED  
  0x049731 $9721: C-----  70 D0    BVS  $96F3
  0x049733 $9723: C-----  88       DEY  
  0x049734 $9724: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x049735 $9725: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x049736 $9726: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049737 $9727: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x049738 $9728: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x049739 $9729: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04973A $972A: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04973B $972B: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04973C $972C: C-----  78       SEI  
  0x04973D $972D: C-----  30 00    BMI  $972F
  0x04973F $972F: C-----  18       CLC  
  0x049740 $9730: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049741 $9731: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049742 $9732: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x049743 $9733: C-----  98       TYA  
  0x049744 $9734: C-----  30 78    BMI  $97AE
  0x049746 $9736: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049747 $9737: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049748 $9738: C-----  00       BRK  
  0x049749 $9739: C-----  00       BRK  
  0x04974A $973A: C-----  38       SEC  
  0x04974B $973B: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x04974C $973C: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04974D $973D: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04974E $973E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04974F $973F: C-----  00       BRK  
  0x049750 $9740: C-----  00       BRK  
  0x049751 $9741: C-----  00       BRK  
  0x049752 $9742: C-----  00       BRK  
  0x049753 $9743: C-----  00       BRK  
  0x049754 $9744: C-----  01 01    ORA  ($01,X)
  0x049756 $9746: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049757 $9747: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049758 $9748: C-----  00       BRK  
  0x049759 $9749: C-----  00       BRK  
  0x04975A $974A: C-----  00       BRK  
  0x04975B $974B: C-----  00       BRK  
  0x04975C $974C: C-----  00       BRK  
  0x04975D $974D: C-----  00       BRK  
  0x04975E $974E: C-----  00       BRK  
  0x04975F $974F: C-----  01 7D    ORA  ($7D,X)
  0x049761 $9751: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x049762 $9752: C-----  2D 57 AE AND  $AE57
  0x049765 $9755: C-----  DE FC D8 DEC  $D8FC,X
  0x049768 $9758: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x049769 $9759: C-----  C4 D2    CPY  $D2
  0x04976B $975B: C-----  A8       TAY  
  0x04976C $975C: C-----  50 20    BVC  $977E
  0x04976E $975E: C-----  00       BRK  
  0x04976F $975F: C-----  20 02 02 JSR  $0202
  0x049772 $9762: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049773 $9763: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049774 $9764: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049775 $9765: C-----  01 01    ORA  ($01,X)
  0x049777 $9767: C-----  00       BRK  
  0x049778 $9768: C-----  01 01    ORA  ($01,X)
  0x04977A $976A: C-----  01 01    ORA  ($01,X)
  0x04977C $976C: C-----  00       BRK  
  0x04977D $976D: C-----  00       BRK  
  0x04977E $976E: C-----  00       BRK  
  0x04977F $976F: C-----  00       BRK  
  0x049780 $9770: C-----  30 C0    BMI  $9732
  0x049782 $9772: C-----  00       BRK  
  0x049783 $9773: C-----  00       BRK  
  0x049784 $9774: C-----  00       BRK  
  0x049785 $9775: C-----  00       BRK  
  0x049786 $9776: C-----  00       BRK  
  0x049787 $9777: C-----  00       BRK  
  0x049788 $9778: C-----  C0 00    CPY  #$00
  0x04978A $977A: C-----  00       BRK  
  0x04978B $977B: C-----  00       BRK  
  0x04978C $977C: C-----  00       BRK  
  0x04978D $977D: C-----  00       BRK  
  0x04978E $977E: C-----  00       BRK  
  0x04978F $977F: C-----  00       BRK  
  0x049790 $9780: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x049791 $9781: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049792 $9782: C-----  00       BRK  
  0x049793 $9783: C-----  00       BRK  
  0x049794 $9784: C-----  00       BRK  
  0x049795 $9785: C-----  00       BRK  
  0x049796 $9786: C-----  00       BRK  
  0x049797 $9787: C-----  00       BRK  
  0x049798 $9788: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x049799 $9789: C-----  00       BRK  
  0x04979A $978A: C-----  00       BRK  
  0x04979B $978B: C-----  00       BRK  
  0x04979C $978C: C-----  00       BRK  
  0x04979D $978D: C-----  00       BRK  
  0x04979E $978E: C-----  00       BRK  
  0x04979F $978F: C-----  00       BRK  
  0x0497A0 $9790: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0497A1 $9791: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x0497A2 $9792: C-----  84 43    STY  $43
  0x0497A4 $9794: C-----  40       RTI  
  0x0497A5 $9795: C-----  20 30 7A JSR  $7A30
  0x0497A8 $9798: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x0497A9 $9799: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x0497AA $979A: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x0497AB $979B: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0497AC $979C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0497AD $979D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0497AE $979E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0497AF $979F: C-----  05 00    ORA  $00
  0x0497B1 $97A1: C-----  00       BRK  
  0x0497B2 $97A2: C-----  01 03    ORA  ($03,X)
  0x0497B4 $97A4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0497B5 $97A5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0497B6 $97A6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0497B7 $97A7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0497B8 $97A8: C-----  00       BRK  
  0x0497B9 $97A9: C-----  00       BRK  
  0x0497BA $97AA: C-----  00       BRK  
  0x0497BB $97AB: C-----  00       BRK  
  0x0497BC $97AC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0497BD $97AD: C-----  06 0E    ASL  $0E
  0x0497BF $97AF: C-----  1E D7 AB ASL  $ABD7,X
  0x0497C2 $97B2: C-----  A9 24    LDA  #$24
  0x0497C4 $97B4: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0497C5 $97B5: C-----  11 00    ORA  ($00),Y
  0x0497C7 $97B7: C-----  00       BRK  
  0x0497C8 $97B8: C-----  28       PLP  
  0x0497C9 $97B9: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x0497CA $97BA: C-----  56 DB    LSR  $DB,X
  0x0497CC $97BC: C-----  DD EE FF CMP  $FFEE,X
  0x0497CF $97BF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0497D0 $97C0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0497D1 $97C1: C-----  C8       INY  
  0x0497D2 $97C2: C-----  30 C0    BMI  $9784
  0x0497D4 $97C4: C-----  00       BRK  
  0x0497D5 $97C5: C-----  00       BRK  
  0x0497D6 $97C6: C-----  00       BRK  
  0x0497D7 $97C7: C-----  00       BRK  
  0x0497D8 $97C8: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0497D9 $97C9: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x0497DA $97CA: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x0497DB $97CB: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0497DC $97CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0497DD $97CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0497DE $97CE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0497DF $97CF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0497E0 $97D0: C-----  01 00    ORA  ($00,X)
  0x0497E2 $97D2: C-----  00       BRK  
  0x0497E3 $97D3: C-----  00       BRK  
  0x0497E4 $97D4: C-----  00       BRK  
  0x0497E5 $97D5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0497E6 $97D6: C-----  40       RTI  
  0x0497E7 $97D7: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0497E8 $97D8: C-----  FE FF FF INC  $FFFF,X
  0x0497EB $97DB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0497EC $97DC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0497ED $97DD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0497EE $97DE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0497EF $97DF: C-----  00       BRK  
  0x0497F0 $97E0: C-----  41 AA    EOR  ($AA,X)
  0x0497F2 $97E2: C-----  F5 7E    SBC  $7E,X
  0x0497F4 $97E4: C-----  15 8A    ORA  $8A,X
  0x0497F6 $97E6: C-----  01 02    ORA  ($02,X)
  0x0497F8 $97E8: C-----  00       BRK  
  0x0497F9 $97E9: C-----  00       BRK  
  0x0497FA $97EA: C-----  00       BRK  
  0x0497FB $97EB: C-----  81 EA    STA  ($EA,X)
  0x0497FD $97ED: C-----  75 FE    ADC  $FE,X
  0x0497FF $97EF: C-----  FD 7F 3D SBC  $3D7F,X
  0x049802 $97F2: C-----  C6 CA    DEC  $CA
  0x049804 $97F4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049805 $97F5: C-----  F8       SED  
  0x049806 $97F6: C-----  70 00    BVS  $97F8
  0x049808 $97F8: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x049809 $97F9: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04980A $97FA: C-----  38       SEC  
  0x04980B $97FB: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x04980C $97FC: C-----  00       BRK  
  0x04980D $97FD: C-----  00       BRK  
  0x04980E $97FE: C-----  00       BRK  
  0x04980F $97FF: C-----  00       BRK  
  0x049810 $9800: ------  .byte $00
  0x049811 $9801: ------  .byte $00
  0x049812 $9802: ------  .byte $00
  0x049813 $9803: ------  .byte $00
  0x049814 $9804: ------  .byte $00
  0x049815 $9805: ------  .byte $00
  0x049816 $9806: ------  .byte $00
  0x049817 $9807: ------  .byte $00
  0x049818 $9808: ------  .byte $00
  0x049819 $9809: ------  .byte $00
  0x04981A $980A: ------  .byte $00
  0x04981B $980B: ------  .byte $00
  0x04981C $980C: ------  .byte $00
  0x04981D $980D: ------  .byte $00
  0x04981E $980E: ------  .byte $00
  0x04981F $980F: ------  .byte $00
  0x049820 $9810: ------  .byte $FF
  0x049821 $9811: ------  .byte $FF
  0x049822 $9812: ------  .byte $FF
  0x049823 $9813: ------  .byte $FF
  0x049824 $9814: ------  .byte $FF
  0x049825 $9815: ------  .byte $FF
  0x049826 $9816: ------  .byte $FF
  0x049827 $9817: ------  .byte $FF
  0x049828 $9818: ------  .byte $00
  0x049829 $9819: ------  .byte $00
  0x04982A $981A: ------  .byte $00
  0x04982B $981B: ------  .byte $00
  0x04982C $981C: ------  .byte $00
  0x04982D $981D: ------  .byte $00
  0x04982E $981E: ------  .byte $00
  0x04982F $981F: ------  .byte $00
  0x049830 $9820: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x049831 $9821: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x049832 $9822: C-----  AC 57 3A LDY  $3A57
  0x049835 $9825: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049836 $9826: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049837 $9827: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049838 $9828: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049839 $9829: C-----  00       BRK  
  0x04983A $982A: C-----  50 A8    BVC  $97D4
  0x04983C $982C: C-----  C4 80    CPY  $80
  0x04983E $982E: C-----  00       BRK  
  0x04983F $982F: C-----  00       BRK  
  0x049840 $9830: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049841 $9831: C-----  C8       INY  
  0x049842 $9832: C-----  30 C0    BMI  $97F4
  0x049844 $9834: C-----  00       BRK  
  0x049845 $9835: C-----  00       BRK  
  0x049846 $9836: C-----  00       BRK  
  0x049847 $9837: C-----  E0 C3    CPX  #$C3
  0x049849 $9839: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04984A $983A: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04984B $983B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04984C $983C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04984D $983D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04984E $983E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04984F $983F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x049850 $9840: C-----  7D 3B 2D ADC  $2D3B,X
  0x049853 $9843: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x049854 $9844: C-----  AE DE FC LDX  $FCDE
  0x049857 $9847: C-----  D9 82 C4 CMP  $C482,Y
  0x04985A $984A: C-----  !!UNDEF $D2  ; unknown opcode, treating as data
  0x04985B $984B: C-----  A8       TAY  
  0x04985C $984C: C-----  51 21    EOR  ($21),Y
  0x04985E $984E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04985F $984F: C-----  26 3F    ROL  $3F
  0x049861 $9851: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x049862 $9852: C-----  01 0E    ORA  ($0E,X)
  0x049864 $9854: C-----  35 1A    AND  $1A,X
  0x049866 $9856: C-----  F9 02 C0 SBC  $C002,Y
  0x049869 $9859: C-----  F8       SED  
  0x04986A $985A: C-----  FE F0 C0 INC  $C0F0,X
  0x04986D $985D: C-----  E0 00    CPX  #$00
  0x04986F $985F: C-----  00       BRK  
  0x049870 $9860: C-----  E1 C9    SBC  ($C9,X)
  0x049872 $9862: C-----  15 AB    ORA  $AB,X
  0x049874 $9864: C-----  F5 FB    SBC  $FB,X
  0x049876 $9866: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049877 $9867: C-----  C0 1E    CPY  #$1E
  0x049879 $9869: C-----  36 E2    ROL  $E2,X
  0x04987B $986B: C-----  40       RTI  
  0x04987C $986C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04987D $986D: C-----  E0 C0    CPX  #$C0
  0x04987F $986F: C-----  00       BRK  
  0x049880 $9870: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x049881 $9871: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049882 $9872: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049883 $9873: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049884 $9874: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049885 $9875: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049886 $9876: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049887 $9877: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049888 $9878: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x049889 $9879: C-----  30 3E    BMI  $98B9
  0x04988B $987B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04988C $987C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04988D $987D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04988E $987E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04988F $987F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049890 $9880: C-----  7D 3B 2D ADC  $2D3B,X
  0x049893 $9883: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x049894 $9884: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x049895 $9885: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x049896 $9886: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049897 $9887: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x049898 $9888: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x049899 $9889: C-----  C4 D2    CPY  $D2
  0x04989B $988B: C-----  A8       TAY  
  0x04989C $988C: C-----  50 20    BVC  $98AE
  0x04989E $988E: C-----  00       BRK  
  0x04989F $988F: C-----  20 FF FF JSR  $FFFF
  0x0498A2 $9892: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0498A3 $9893: C-----  FE F5 FA INC  $FAF5,X
  0x0498A6 $9896: C-----  F9 02 00 SBC  $0002,Y
  0x0498A9 $9899: C-----  00       BRK  
  0x0498AA $989A: C-----  00       BRK  
  0x0498AB $989B: C-----  01 0A    ORA  ($0A,X)
  0x0498AD $989D: C-----  05 06    ORA  $06
  0x0498AF $989F: C-----  FD FF FF SBC  $FFFF,X
  0x0498B2 $98A2: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0498B3 $98A3: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x0498B4 $98A4: C-----  F5 FB    SBC  $FB,X
  0x0498B6 $98A6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0498B7 $98A7: C-----  C0 00    CPY  #$00
  0x0498B9 $98A9: C-----  00       BRK  
  0x0498BA $98AA: C-----  08       PHP  
  0x0498BB $98AB: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0498BC $98AC: C-----  8A       TXA  
  0x0498BD $98AD: C-----  E4 C0    CPX  $C0
  0x0498BF $98AF: C-----  00       BRK  
  0x0498C0 $98B0: C-----  7D 3B 2D ADC  $2D3B,X
  0x0498C3 $98B3: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x0498C4 $98B4: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x0498C5 $98B5: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0498C6 $98B6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0498C7 $98B7: C-----  D8       CLD  
  0x0498C8 $98B8: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x0498C9 $98B9: C-----  C4 D2    CPY  $D2
  0x0498CB $98BB: C-----  A8       TAY  
  0x0498CC $98BC: C-----  50 20    BVC  $98DE
  0x0498CE $98BE: C-----  00       BRK  
  0x0498CF $98BF: C-----  20 08 0D JSR  $0D08
  0x0498D2 $98C2: C-----  0A       ASL  A
  0x0498D3 $98C3: C-----  08       PHP  
  0x0498D4 $98C4: C-----  F9 41 23 SBC  $2341,Y
  0x0498D7 $98C7: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0498D8 $98C8: C-----  00       BRK  
  0x0498D9 $98C9: C-----  00       BRK  
  0x0498DA $98CA: C-----  05 07    ORA  $07
  0x0498DC $98CC: C-----  06 3E    ASL  $3E
  0x0498DE $98CE: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0498DF $98CF: C-----  0D 8F 7F ORA  $7F8F
  0x0498E2 $98D2: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x0498E3 $98D3: C-----  98       TYA  
  0x0498E4 $98D4: C-----  30 78    BMI  $994E
  0x0498E6 $98D6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0498E7 $98D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0498E8 $98D8: C-----  00       BRK  
  0x0498E9 $98D9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0498EA $98DA: C-----  38       SEC  
  0x0498EB $98DB: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x0498EC $98DC: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x0498ED $98DD: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0498EE $98DE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0498EF $98DF: C-----  00       BRK  
  0x0498F0 $98E0: C-----  0A       ASL  A
  0x0498F1 $98E1: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0498F2 $98E2: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0498F3 $98E3: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0498F4 $98E4: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0498F5 $98E5: C-----  09 0F    ORA  #$0F
  0x0498F7 $98E7: C-----  00       BRK  
  0x0498F8 $98E8: C-----  05 0D    ORA  $0D
  0x0498FA $98EA: C-----  1D 3D 04 ORA  $043D,X
  0x0498FD $98ED: C-----  06 00    ASL  $00
  0x0498FF $98EF: C-----  00       BRK  
  0x049900 $98F0: C-----  08       PHP  
  0x049901 $98F1: C-----  0D 0F 0F ORA  $0F0F
  0x049904 $98F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049905 $98F5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049906 $98F6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049907 $98F7: C-----  1E 00 00 ASL  $0000,X
  0x04990A $98FA: C-----  00       BRK  
  0x04990B $98FB: C-----  00       BRK  
  0x04990C $98FC: C-----  00       BRK  
  0x04990D $98FD: C-----  00       BRK  
  0x04990E $98FE: C-----  00       BRK  
  0x04990F $98FF: C-----  01 00    ORA  ($00,X)
  0x049911 $9901: C-----  00       BRK  
  0x049912 $9902: C-----  00       BRK  
  0x049913 $9903: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049914 $9904: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x049915 $9905: C-----  10 20    BPL  $9927
  0x049917 $9907: C-----  21 00    AND  ($00,X)
  0x049919 $9909: C-----  00       BRK  
  0x04991A $990A: C-----  00       BRK  
  0x04991B $990B: C-----  00       BRK  
  0x04991C $990C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04991D $990D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04991E $990E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04991F $990F: C-----  1E 00 03 ASL  $0300,X
  0x049922 $9912: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049923 $9913: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049924 $9914: C-----  06 0C    ASL  $0C
  0x049926 $9916: C-----  18       CLC  
  0x049927 $9917: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049928 $9918: C-----  00       BRK  
  0x049929 $9919: C-----  00       BRK  
  0x04992A $991A: C-----  01 01    ORA  ($01,X)
  0x04992C $991C: C-----  01 03    ORA  ($03,X)
  0x04992E $991E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04992F $991F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049930 $9920: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x049931 $9921: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x049932 $9922: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x049933 $9923: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x049934 $9924: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x049935 $9925: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x049936 $9926: C-----  !!UNDEF $89  ; unknown opcode, treating as data
  0x049937 $9927: C-----  90 3C    BCC  $9965
  0x049939 $9929: C-----  30 40    BMI  $996B
  0x04993B $992B: C-----  60       RTS  
  0x04993C $992C: C-----  70 70    BVS  $999E
  0x04993E $992E: C-----  76 6F    ROR  $6F,X
  0x049940 $9930: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049941 $9931: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x049942 $9932: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049943 $9933: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x049944 $9934: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x049945 $9935: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049946 $9936: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049947 $9937: C-----  84 FC    STY  $FC
  0x049949 $9939: C-----  78       SEI  
  0x04994A $993A: C-----  00       BRK  
  0x04994B $993B: C-----  30 78    BMI  $99B5
  0x04994D $993D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04994E $993E: C-----  FD 7B 02 SBC  $027B,X
  0x049951 $9941: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049952 $9942: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049953 $9943: C-----  08       PHP  
  0x049954 $9944: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x049955 $9945: C-----  00       BRK  
  0x049956 $9946: C-----  00       BRK  
  0x049957 $9947: C-----  00       BRK  
  0x049958 $9948: C-----  01 01    ORA  ($01,X)
  0x04995A $994A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04995B $994B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04995C $994C: C-----  00       BRK  
  0x04995D $994D: C-----  00       BRK  
  0x04995E $994E: C-----  00       BRK  
  0x04995F $994F: C-----  00       BRK  
  0x049960 $9950: C-----  70 70    BVS  $99C2
  0x049962 $9952: C-----  39 3F D9 AND  $D93F,Y
  0x049965 $9955: C-----  4C 43 7F JMP  $7F43
  0x049968 $9958: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x049969 $9959: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04996A $995A: C-----  C6 C0    DEC  $C0
  0x04996C $995C: C-----  26 33    ROL  $33
  0x04996E $995E: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04996F $995F: C-----  00       BRK  
  0x049970 $9960: C-----  A8       TAY  
  0x049971 $9961: C-----  D8       CLD  
  0x049972 $9962: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049973 $9963: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x049974 $9964: C-----  EC D4 EC CPX  $ECD4
  0x049977 $9967: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x049978 $9968: C-----  50 20    BVC  $998A
  0x04997A $996A: C-----  00       BRK  
  0x04997B $996B: C-----  08       PHP  
  0x04997C $996C: C-----  10 28    BPL  $9996
  0x04997E $996E: C-----  10 88    BPL  $98F8
  0x049980 $9970: C-----  00       BRK  
  0x049981 $9971: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049982 $9972: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049983 $9973: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049984 $9974: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x049985 $9975: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049986 $9976: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x049987 $9977: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x049988 $9978: C-----  00       BRK  
  0x049989 $9979: C-----  00       BRK  
  0x04998A $997A: C-----  00       BRK  
  0x04998B $997B: C-----  00       BRK  
  0x04998C $997C: C-----  00       BRK  
  0x04998D $997D: C-----  00       BRK  
  0x04998E $997E: C-----  00       BRK  
  0x04998F $997F: C-----  00       BRK  
  0x049990 $9980: C-----  70 70    BVS  $99F2
  0x049992 $9982: C-----  39 3F 19 AND  $193F,Y
  0x049995 $9985: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x049996 $9986: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049997 $9987: C-----  00       BRK  
  0x049998 $9988: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049999 $9989: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04999A $998A: C-----  06 00    ASL  $00
  0x04999C $998C: C-----  06 03    ASL  $03
  0x04999E $998E: C-----  00       BRK  
  0x04999F $998F: C-----  00       BRK  
  0x0499A0 $9990: C-----  84 FD    STY  $FD
  0x0499A2 $9992: C-----  FE FF FE INC  $FEFF,X
  0x0499A5 $9995: C-----  78       SEI  
  0x0499A6 $9996: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x0499A7 $9997: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0499A8 $9998: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x0499A9 $9999: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0499AA $999A: C-----  01 00    ORA  ($00,X)
  0x0499AC $999C: C-----  01 87    ORA  ($87,X)
  0x0499AE $999E: C-----  CC 00 00 CPY  $0000
  0x0499B1 $99A1: C-----  01 01    ORA  ($01,X)
  0x0499B3 $99A3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0499B4 $99A4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0499B5 $99A5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0499B6 $99A6: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0499B7 $99A7: C-----  19 00 00 ORA  $0000,Y
  0x0499BA $99AA: C-----  00       BRK  
  0x0499BB $99AB: C-----  00       BRK  
  0x0499BC $99AC: C-----  01 00    ORA  ($00,X)
  0x0499BE $99AE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0499BF $99AF: C-----  06 FF    ASL  $FF
  0x0499C1 $99B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0499C2 $99B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0499C3 $99B3: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0499C4 $99B4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0499C5 $99B5: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x0499C6 $99B6: C-----  D9 CD 7F CMP  $7FCD,Y
  0x0499C9 $99B9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0499CA $99BA: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0499CB $99BB: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x0499CC $99BC: C-----  FD 0D 26 SBC  $260D,X
  0x0499CF $99BF: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x0499D0 $99C0: C-----  B8       CLV  
  0x0499D1 $99C1: C-----  78       SEI  
  0x0499D2 $99C2: C-----  F0 F0    BEQ  $99B4
  0x0499D4 $99C4: C-----  60       RTS  
  0x0499D5 $99C5: C-----  C0 00    CPY  #$00
  0x0499D7 $99C7: C-----  00       BRK  
  0x0499D8 $99C8: C-----  40       RTI  
  0x0499D9 $99C9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0499DA $99CA: C-----  00       BRK  
  0x0499DB $99CB: C-----  00       BRK  
  0x0499DC $99CC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0499DD $99CD: C-----  00       BRK  
  0x0499DE $99CE: C-----  00       BRK  
  0x0499DF $99CF: C-----  00       BRK  
  0x0499E0 $99D0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0499E1 $99D1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0499E2 $99D2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0499E3 $99D3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0499E4 $99D4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0499E5 $99D5: C-----  00       BRK  
  0x0499E6 $99D6: C-----  00       BRK  
  0x0499E7 $99D7: C-----  00       BRK  
  0x0499E8 $99D8: C-----  00       BRK  
  0x0499E9 $99D9: C-----  00       BRK  
  0x0499EA $99DA: C-----  00       BRK  
  0x0499EB $99DB: C-----  00       BRK  
  0x0499EC $99DC: C-----  00       BRK  
  0x0499ED $99DD: C-----  00       BRK  
  0x0499EE $99DE: C-----  00       BRK  
  0x0499EF $99DF: C-----  00       BRK  
  0x0499F0 $99E0: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0499F1 $99E1: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0499F2 $99E2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0499F3 $99E3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0499F4 $99E4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0499F5 $99E5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0499F6 $99E6: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0499F7 $99E7: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0499F8 $99E8: C-----  00       BRK  
  0x0499F9 $99E9: C-----  00       BRK  
  0x0499FA $99EA: C-----  00       BRK  
  0x0499FB $99EB: C-----  00       BRK  
  0x0499FC $99EC: C-----  00       BRK  
  0x0499FD $99ED: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0499FE $99EE: C-----  40       RTI  
  0x0499FF $99EF: C-----  A0 F0    LDY  #$F0
  0x049A01 $99F1: C-----  F0 F9    BEQ  $99EC
  0x049A03 $99F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049A04 $99F4: C-----  F9 7C 7F SBC  $7F7C,Y
  0x049A07 $99F7: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049A08 $99F8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049A09 $99F9: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049A0A $99FA: C-----  06 00    ASL  $00
  0x049A0C $99FC: C-----  06 03    ASL  $03
  0x049A0E $99FE: C-----  00       BRK  
  0x049A0F $99FF: C-----  00       BRK  
  0x049A10 $9A00: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x049A11 $9A01: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049A12 $9A02: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049A13 $9A03: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049A14 $9A04: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049A15 $9A05: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049A16 $9A06: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049A17 $9A07: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049A18 $9A08: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x049A19 $9A09: C-----  30 3F    BMI  $9A4A
  0x049A1B $9A0B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049A1C $9A0C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049A1D $9A0D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049A1E $9A0E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049A1F $9A0F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049A20 $9A10: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x049A21 $9A11: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x049A22 $9A12: C-----  96 CB    STX  $CB,Y
  0x049A24 $9A14: C-----  F5 FB    SBC  $FB,X
  0x049A26 $9A16: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049A27 $9A17: C-----  C0 0B    CPY  #$0B
  0x049A29 $9A19: C-----  3D 69 B4 AND  $B469,X
  0x049A2C $9A1C: C-----  CA       DEX  
  0x049A2D $9A1D: C-----  E4 C0    CPX  $C0
  0x049A2F $9A1F: C-----  00       BRK  
  0x049A30 $9A20: C-----  00       BRK  
  0x049A31 $9A21: C-----  00       BRK  
  0x049A32 $9A22: C-----  00       BRK  
  0x049A33 $9A23: C-----  00       BRK  
  0x049A34 $9A24: C-----  01 0F    ORA  ($0F,X)
  0x049A36 $9A26: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049A37 $9A27: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049A38 $9A28: C-----  00       BRK  
  0x049A39 $9A29: C-----  00       BRK  
  0x049A3A $9A2A: C-----  00       BRK  
  0x049A3B $9A2B: C-----  00       BRK  
  0x049A3C $9A2C: C-----  00       BRK  
  0x049A3D $9A2D: C-----  00       BRK  
  0x049A3E $9A2E: C-----  0E 3F 97 ASL  $973F
  0x049A41 $9A31: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x049A42 $9A32: C-----  84 C3    STY  $C3
  0x049A44 $9A34: C-----  C0 20    CPY  #$20
  0x049A46 $9A36: C-----  D8       CLD  
  0x049A47 $9A37: C-----  EC 6B 74 CPX  $746B
  0x049A4A $9A3A: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x049A4B $9A3B: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x049A4C $9A3C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049A4D $9A3D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x049A4E $9A3E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x049A4F $9A3F: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x049A50 $9A40: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x049A51 $9A41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049A52 $9A42: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x049A53 $9A43: C-----  98       TYA  
  0x049A54 $9A44: C-----  30 78    BMI  $9ABE
  0x049A56 $9A46: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049A57 $9A47: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049A58 $9A48: C-----  00       BRK  
  0x049A59 $9A49: C-----  00       BRK  
  0x049A5A $9A4A: C-----  38       SEC  
  0x049A5B $9A4B: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x049A5C $9A4C: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x049A5D $9A4D: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x049A5E $9A4E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049A5F $9A4F: C-----  00       BRK  
  0x049A60 $9A50: C-----  0E 1E 3E ASL  $3E1E
  0x049A63 $9A53: C-----  7E FF 0F ROR  $0FFF,X
  0x049A66 $9A56: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049A67 $9A57: C-----  00       BRK  
  0x049A68 $9A58: C-----  01 01    ORA  ($01,X)
  0x049A6A $9A5A: C-----  01 01    ORA  ($01,X)
  0x049A6C $9A5C: C-----  00       BRK  
  0x049A6D $9A5D: C-----  00       BRK  
  0x049A6E $9A5E: C-----  00       BRK  
  0x049A6F $9A5F: C-----  00       BRK  
  0x049A70 $9A60: C-----  00       BRK  
  0x049A71 $9A61: C-----  01 01    ORA  ($01,X)
  0x049A73 $9A63: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049A74 $9A64: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049A75 $9A65: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x049A76 $9A66: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x049A77 $9A67: C-----  10 00    BPL  $9A69
  0x049A79 $9A69: C-----  00       BRK  
  0x049A7A $9A6A: C-----  00       BRK  
  0x049A7B $9A6B: C-----  00       BRK  
  0x049A7C $9A6C: C-----  01 00    ORA  ($00,X)
  0x049A7E $9A6E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049A7F $9A6F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049A80 $9A70: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049A81 $9A71: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049A82 $9A72: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049A83 $9A73: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x049A84 $9A74: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049A85 $9A75: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x049A86 $9A76: C-----  19 1D 7F ORA  $7F1D,Y
  0x049A89 $9A79: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049A8A $9A7A: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x049A8B $9A7B: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x049A8C $9A7C: C-----  FD 0D E6 SBC  $E60D,X
  0x049A8F $9A7F: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x049A90 $9A80: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x049A91 $9A81: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x049A92 $9A82: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x049A93 $9A83: C-----  FD FD FC SBC  $FCFD,X
  0x049A96 $9A86: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049A97 $9A87: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049A98 $9A88: C-----  E8       INX  
  0x049A99 $9A89: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x049A9A $9A8A: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x049A9B $9A8B: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x049A9C $9A8C: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x049A9D $9A8D: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x049A9E $9A8E: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x049A9F $9A8F: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x049AA0 $9A90: C-----  41 AA    EOR  ($AA,X)
  0x049AA2 $9A92: C-----  D5 7F    CMP  $7F,X
  0x049AA4 $9A94: C-----  B5 DE    LDA  $DE,X
  0x049AA6 $9A96: C-----  41 2A    EOR  ($2A,X)
  0x049AA8 $9A98: C-----  00       BRK  
  0x049AA9 $9A99: C-----  00       BRK  
  0x049AAA $9A9A: C-----  00       BRK  
  0x049AAB $9A9B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049AAC $9A9C: C-----  4A       LSR  A
  0x049AAD $9A9D: C-----  21 BE    AND  ($BE,X)
  0x049AAF $9A9F: C-----  D5 F9    CMP  $F9,X
  0x049AB1 $9AA1: C-----  F8       SED  
  0x049AB2 $9AA2: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x049AB3 $9AA3: C-----  EC FE 01 CPX  $01FE
  0x049AB6 $9AA6: C-----  00       BRK  
  0x049AB7 $9AA7: C-----  00       BRK  
  0x049AB8 $9AA8: C-----  F6 F7    INC  $F7,X
  0x049ABA $9AAA: C-----  ED 93 01 SBC  $0193
  0x049ABD $9AAD: C-----  00       BRK  
  0x049ABE $9AAE: C-----  00       BRK  
  0x049ABF $9AAF: C-----  00       BRK  
  0x049AC0 $9AB0: C-----  05 00    ORA  $00
  0x049AC2 $9AB2: C-----  00       BRK  
  0x049AC3 $9AB3: C-----  00       BRK  
  0x049AC4 $9AB4: C-----  00       BRK  
  0x049AC5 $9AB5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049AC6 $9AB6: C-----  40       RTI  
  0x049AC7 $9AB7: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049AC8 $9AB8: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x049AC9 $9AB9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049ACA $9ABA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049ACB $9ABB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049ACC $9ABC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049ACD $9ABD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049ACE $9ABE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049ACF $9ABF: C-----  00       BRK  
  0x049AD0 $9AC0: C-----  20 40 40 JSR  $4040
  0x049AD3 $9AC3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049AD4 $9AC4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049AD5 $9AC5: C-----  BC FE FF LDY  $FFFE,X
  0x049AD8 $9AC8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x049AD9 $9AC9: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049ADA $9ACA: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049ADB $9ACB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049ADC $9ACC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049ADD $9ACD: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x049ADE $9ACE: C-----  01 00    ORA  ($00,X)
  0x049AE0 $9AD0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049AE1 $9AD1: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x049AE2 $9AD2: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x049AE3 $9AD3: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x049AE4 $9AD4: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x049AE5 $9AD5: C-----  16 2E    ASL  $2E,X
  0x049AE7 $9AD7: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x049AE8 $9AD8: C-----  F0 E8    BEQ  $9AC2
  0x049AEA $9ADA: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x049AEB $9ADB: C-----  E8       INX  
  0x049AEC $9ADC: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x049AED $9ADD: C-----  E8       INX  
  0x049AEE $9ADE: C-----  D0 A8    BNE  $9A88
  0x049AF0 $9AE0: C-----  00       BRK  
  0x049AF1 $9AE1: C-----  00       BRK  
  0x049AF2 $9AE2: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049AF3 $9AE3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049AF4 $9AE4: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x049AF5 $9AE5: C-----  85 84    STA  $84
  0x049AF7 $9AE7: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049AF8 $9AE8: C-----  00       BRK  
  0x049AF9 $9AE9: C-----  00       BRK  
  0x049AFA $9AEA: C-----  00       BRK  
  0x049AFB $9AEB: C-----  00       BRK  
  0x049AFC $9AEC: C-----  85 7A    STA  $7A
  0x049AFE $9AEE: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x049AFF $9AEF: C-----  FD 00 00 SBC  $0000,X
  0x049B02 $9AF2: C-----  00       BRK  
  0x049B03 $9AF3: C-----  00       BRK  
  0x049B04 $9AF4: C-----  C0 60    CPY  #$60
  0x049B06 $9AF6: C-----  B0 50    BCS  $9B48
  0x049B08 $9AF8: C-----  00       BRK  
  0x049B09 $9AF9: C-----  00       BRK  
  0x049B0A $9AFA: C-----  00       BRK  
  0x049B0B $9AFB: C-----  00       BRK  
  0x049B0C $9AFC: C-----  00       BRK  
  0x049B0D $9AFD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049B0E $9AFE: C-----  40       RTI  
  0x049B0F $9AFF: C-----  A0 77    LDY  #$77
  0x049B11 $9B01: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x049B12 $9B02: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x049B13 $9B03: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049B14 $9B04: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x049B15 $9B05: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x049B16 $9B06: C-----  !!UNDEF $B3  ; unknown opcode, treating as data
  0x049B17 $9B07: C-----  51 80    EOR  ($80),Y
  0x049B19 $9B09: C-----  E0 E0    CPX  #$E0
  0x049B1B $9B0B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049B1C $9B0C: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x049B1D $9B0D: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x049B1E $9B0E: C-----  4C AE 26 JMP  $26AE
  0x049B21 $9B11: C-----  40       RTI  
  0x049B22 $9B12: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049B23 $9B13: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049B24 $9B14: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x049B25 $9B15: C-----  85 84    STA  $84
  0x049B27 $9B17: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049B28 $9B18: C-----  19 3F 03 ORA  $033F,Y
  0x049B2B $9B1B: C-----  00       BRK  
  0x049B2C $9B1C: C-----  85 7A    STA  $7A
  0x049B2E $9B1E: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x049B2F $9B1F: C-----  FD A8 D8 SBC  $D8A8,X
  0x049B32 $9B22: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049B33 $9B23: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x049B34 $9B24: C-----  EC D4 ED CPX  $EDD4
  0x049B37 $9B27: C-----  75 57    ADC  $57,X
  0x049B39 $9B29: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x049B3A $9B2A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049B3B $9B2B: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x049B3C $9B2C: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x049B3D $9B2D: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x049B3E $9B2E: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x049B3F $9B2F: C-----  8A       TXA  
  0x049B40 $9B30: C-----  E0 40    CPX  #$40
  0x049B42 $9B32: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049B43 $9B33: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049B44 $9B34: C-----  40       RTI  
  0x049B45 $9B35: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049B46 $9B36: C-----  00       BRK  
  0x049B47 $9B37: C-----  00       BRK  
  0x049B48 $9B38: C-----  00       BRK  
  0x049B49 $9B39: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049B4A $9B3A: C-----  00       BRK  
  0x049B4B $9B3B: C-----  00       BRK  
  0x049B4C $9B3C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049B4D $9B3D: C-----  00       BRK  
  0x049B4E $9B3E: C-----  00       BRK  
  0x049B4F $9B3F: C-----  00       BRK  
  0x049B50 $9B40: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x049B51 $9B41: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x049B52 $9B42: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049B53 $9B43: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x049B54 $9B44: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x049B55 $9B45: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x049B56 $9B46: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x049B57 $9B47: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x049B58 $9B48: C-----  50 20    BVC  $9B6A
  0x049B5A $9B4A: C-----  00       BRK  
  0x049B5B $9B4B: C-----  08       PHP  
  0x049B5C $9B4C: C-----  10 28    BPL  $9B76
  0x049B5E $9B4E: C-----  10 88    BPL  $9AD8
  0x049B60 $9B50: C-----  E0 C0    CPX  #$C0
  0x049B62 $9B52: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049B63 $9B53: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049B64 $9B54: C-----  C0 80    CPY  #$80
  0x049B66 $9B56: C-----  00       BRK  
  0x049B67 $9B57: C-----  00       BRK  
  0x049B68 $9B58: C-----  00       BRK  
  0x049B69 $9B59: C-----  00       BRK  
  0x049B6A $9B5A: C-----  00       BRK  
  0x049B6B $9B5B: C-----  00       BRK  
  0x049B6C $9B5C: C-----  00       BRK  
  0x049B6D $9B5D: C-----  00       BRK  
  0x049B6E $9B5E: C-----  00       BRK  
  0x049B6F $9B5F: C-----  00       BRK  
  0x049B70 $9B60: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x049B71 $9B61: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049B72 $9B62: C-----  F0 F0    BEQ  $9B54
  0x049B74 $9B64: C-----  60       RTS  
  0x049B75 $9B65: C-----  C0 00    CPY  #$00
  0x049B77 $9B67: C-----  00       BRK  
  0x049B78 $9B68: C-----  40       RTI  
  0x049B79 $9B69: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049B7A $9B6A: C-----  00       BRK  
  0x049B7B $9B6B: C-----  00       BRK  
  0x049B7C $9B6C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049B7D $9B6D: C-----  00       BRK  
  0x049B7E $9B6E: C-----  00       BRK  
  0x049B7F $9B6F: C-----  00       BRK  
  0x049B80 $9B70: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049B81 $9B71: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049B82 $9B72: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049B83 $9B73: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049B84 $9B74: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x049B85 $9B75: C-----  85 84    STA  $84
  0x049B87 $9B77: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049B88 $9B78: C-----  00       BRK  
  0x049B89 $9B79: C-----  00       BRK  
  0x049B8A $9B7A: C-----  00       BRK  
  0x049B8B $9B7B: C-----  00       BRK  
  0x049B8C $9B7C: C-----  85 7A    STA  $7A
  0x049B8E $9B7E: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x049B8F $9B7F: C-----  FD B9 7F SBC  $7FB9,X
  0x049B92 $9B82: C-----  F0 F0    BEQ  $9B74
  0x049B94 $9B84: C-----  60       RTS  
  0x049B95 $9B85: C-----  C0 00    CPY  #$00
  0x049B97 $9B87: C-----  00       BRK  
  0x049B98 $9B88: C-----  46 80    LSR  $80
  0x049B9A $9B8A: C-----  00       BRK  
  0x049B9B $9B8B: C-----  00       BRK  
  0x049B9C $9B8C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049B9D $9B8D: C-----  00       BRK  
  0x049B9E $9B8E: C-----  00       BRK  
  0x049B9F $9B8F: C-----  00       BRK  
  0x049BA0 $9B90: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049BA1 $9B91: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049BA2 $9B92: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049BA3 $9B93: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049BA4 $9B94: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049BA5 $9B95: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049BA6 $9B96: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049BA7 $9B97: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049BA8 $9B98: C-----  1E 3F 3F ASL  $3F3F,X
  0x049BAB $9B9B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049BAC $9B9C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049BAD $9B9D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049BAE $9B9E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049BAF $9B9F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049BB0 $9BA0: ------  .byte $00
  0x049BB1 $9BA1: ------  .byte $00
  0x049BB2 $9BA2: ------  .byte $00
  0x049BB3 $9BA3: ------  .byte $00
  0x049BB4 $9BA4: ------  .byte $00
  0x049BB5 $9BA5: ------  .byte $00
  0x049BB6 $9BA6: ------  .byte $00
  0x049BB7 $9BA7: ------  .byte $00
  0x049BB8 $9BA8: ------  .byte $00
  0x049BB9 $9BA9: ------  .byte $00
  0x049BBA $9BAA: ------  .byte $00
  0x049BBB $9BAB: ------  .byte $00
  0x049BBC $9BAC: ------  .byte $00
  0x049BBD $9BAD: ------  .byte $00
  0x049BBE $9BAE: ------  .byte $00
  0x049BBF $9BAF: ------  .byte $00
  0x049BC0 $9BB0: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049BC1 $9BB1: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x049BC2 $9BB2: C-----  96 CB    STX  $CB,Y
  0x049BC4 $9BB4: C-----  F5 FB    SBC  $FB,X
  0x049BC6 $9BB6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049BC7 $9BB7: C-----  C0 FB    CPY  #$FB
  0x049BC9 $9BB9: C-----  7D 69 B4 ADC  $B469,X
  0x049BCC $9BBC: C-----  CA       DEX  
  0x049BCD $9BBD: C-----  E4 C0    CPX  $C0
  0x049BCF $9BBF: C-----  00       BRK  
  0x049BD0 $9BC0: C-----  00       BRK  
  0x049BD1 $9BC1: C-----  1E 3D 7C ASL  $7C3D,X
  0x049BD4 $9BC4: C-----  7D E7 E1 ADC  $E1E7,X
  0x049BD7 $9BC7: C-----  E1 00    SBC  ($00,X)
  0x049BD9 $9BC9: C-----  00       BRK  
  0x049BDA $9BCA: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x049BDB $9BCB: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x049BDC $9BCC: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x049BDD $9BCD: C-----  40       RTI  
  0x049BDE $9BCE: C-----  40       RTI  
  0x049BDF $9BCF: C-----  00       BRK  
  0x049BE0 $9BD0: C-----  2E F4 3C ROL  $3CF4
  0x049BE3 $9BD3: C-----  F8       SED  
  0x049BE4 $9BD4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049BE5 $9BD5: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x049BE6 $9BD6: C-----  F9 FB 10 SBC  $10FB,Y
  0x049BE9 $9BD9: C-----  08       PHP  
  0x049BEA $9BDA: C-----  C0 00    CPY  #$00
  0x049BEC $9BDC: C-----  00       BRK  
  0x049BED $9BDD: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049BEE $9BDE: C-----  06 04    ASL  $04
  0x049BF0 $9BE0: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x049BF1 $9BE1: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x049BF2 $9BE2: C-----  7D 7F F9 ADC  $F97F,X
  0x049BF5 $9BE5: C-----  F0 E0    BEQ  $9BC7
  0x049BF7 $9BE7: C-----  00       BRK  
  0x049BF8 $9BE8: C-----  0D 1B 22 ORA  $221B
  0x049BFB $9BEB: C-----  39 10 00 AND  $0010,Y
  0x049BFE $9BEE: C-----  00       BRK  
  0x049BFF $9BEF: C-----  00       BRK  
  0x049C00 $9BF0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049C01 $9BF1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049C02 $9BF2: C-----  C0 E0    CPY  #$E0
  0x049C04 $9BF4: C-----  E0 70    CPX  #$70
  0x049C06 $9BF6: C-----  70 60    BVS  $9C58
  0x049C08 $9BF8: C-----  00       BRK  
  0x049C09 $9BF9: C-----  00       BRK  
  0x049C0A $9BFA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049C0B $9BFB: C-----  C0 40    CPY  #$40
  0x049C0D $9BFD: C-----  20 20 00 JSR  $0020
  0x049C10 $9C00: C-----  00       BRK  
  0x049C11 $9C01: ------  .byte $00
  0x049C12 $9C02: ------  .byte $00
  0x049C13 $9C03: ------  .byte $00
  0x049C14 $9C04: ------  .byte $00
  0x049C15 $9C05: ------  .byte $00
  0x049C16 $9C06: ------  .byte $00
  0x049C17 $9C07: ------  .byte $00
  0x049C18 $9C08: C-----  00       BRK  
  0x049C19 $9C09: ------  .byte $00
  0x049C1A $9C0A: ------  .byte $00
  0x049C1B $9C0B: ------  .byte $00
  0x049C1C $9C0C: ------  .byte $00
  0x049C1D $9C0D: ------  .byte $00
  0x049C1E $9C0E: ------  .byte $00
  0x049C1F $9C0F: ------  .byte $00
  0x049C20 $9C10: ------  .byte $FF
  0x049C21 $9C11: ------  .byte $FF
  0x049C22 $9C12: ------  .byte $FF
  0x049C23 $9C13: ------  .byte $FF
  0x049C24 $9C14: ------  .byte $FF
  0x049C25 $9C15: ------  .byte $FF
  0x049C26 $9C16: ------  .byte $FF
  0x049C27 $9C17: ------  .byte $FF
  0x049C28 $9C18: ------  .byte $00
  0x049C29 $9C19: ------  .byte $00
  0x049C2A $9C1A: ------  .byte $00
  0x049C2B $9C1B: ------  .byte $00
  0x049C2C $9C1C: ------  .byte $00
  0x049C2D $9C1D: ------  .byte $00
  0x049C2E $9C1E: ------  .byte $00
  0x049C2F $9C1F: ------  .byte $00
  0x049C30 $9C20: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x049C31 $9C21: C-----  F6 E4    INC  $E4,X
  0x049C33 $9C23: C-----  C8       INY  
  0x049C34 $9C24: C-----  70 00    BVS  $9C26
  0x049C36 $9C26: C-----  00       BRK  
  0x049C37 $9C27: C-----  00       BRK  
  0x049C38 $9C28: C-----  2C 08 18 BIT  $1808
  0x049C3B $9C2B: C-----  30 00    BMI  $9C2D
  0x049C3D $9C2D: C-----  00       BRK  
  0x049C3E $9C2E: C-----  00       BRK  
  0x049C3F $9C2F: C-----  00       BRK  
  0x049C40 $9C30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049C41 $9C31: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049C42 $9C32: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049C43 $9C33: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049C44 $9C34: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x049C45 $9C35: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x049C46 $9C36: C-----  C8       INY  
  0x049C47 $9C37: C-----  38       SEC  
  0x049C48 $9C38: C-----  FD FB 07 SBC  $07FB,X
  0x049C4B $9C3B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049C4C $9C3C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049C4D $9C3D: C-----  00       BRK  
  0x049C4E $9C3E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x049C4F $9C3F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x049C50 $9C40: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049C51 $9C41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049C52 $9C42: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049C53 $9C43: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049C54 $9C44: C-----  E0 C0    CPX  #$C0
  0x049C56 $9C46: C-----  C0 C0    CPY  #$C0
  0x049C58 $9C48: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x049C59 $9C49: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x049C5A $9C4A: C-----  BC A3 DF LDY  $DFA3,X
  0x049C5D $9C4D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049C5E $9C4E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049C5F $9C4F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049C60 $9C50: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049C61 $9C51: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049C62 $9C52: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049C63 $9C53: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049C64 $9C54: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049C65 $9C55: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049C66 $9C56: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049C67 $9C57: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049C68 $9C58: C-----  00       BRK  
  0x049C69 $9C59: C-----  00       BRK  
  0x049C6A $9C5A: C-----  00       BRK  
  0x049C6B $9C5B: C-----  00       BRK  
  0x049C6C $9C5C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049C6D $9C5D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049C6E $9C5E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049C6F $9C5F: C-----  FE C0 80 INC  $80C0,X
  0x049C72 $9C62: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049C73 $9C63: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049C74 $9C64: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049C75 $9C65: C-----  C0 E0    CPY  #$E0
  0x049C77 $9C67: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x049C78 $9C68: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049C79 $9C69: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049C7A $9C6A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049C7B $9C6B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049C7C $9C6C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049C7D $9C6D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049C7E $9C6E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x049C7F $9C6F: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x049C80 $9C70: C-----  C0 F0    CPY  #$F0
  0x049C82 $9C72: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049C83 $9C73: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049C84 $9C74: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049C85 $9C75: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049C86 $9C76: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049C87 $9C77: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049C88 $9C78: C-----  00       BRK  
  0x049C89 $9C79: C-----  10 20    BPL  $9C9B
  0x049C8B $9C7B: C-----  40       RTI  
  0x049C8C $9C7C: C-----  C0 31    CPY  #$31
  0x049C8E $9C7E: C-----  0E 07 00 ASL  $0007
  0x049C91 $9C81: C-----  00       BRK  
  0x049C92 $9C82: C-----  00       BRK  
  0x049C93 $9C83: C-----  00       BRK  
  0x049C94 $9C84: C-----  30 7C    BMI  $9D02
  0x049C96 $9C86: C-----  7E 7F 00 ROR  $007F,X
  0x049C99 $9C89: C-----  00       BRK  
  0x049C9A $9C8A: C-----  00       BRK  
  0x049C9B $9C8B: C-----  00       BRK  
  0x049C9C $9C8C: C-----  00       BRK  
  0x049C9D $9C8D: C-----  30 34    BMI  $9CC3
  0x049C9F $9C8F: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x049CA0 $9C90: C-----  FD F0 E0 SBC  $E0F0,X
  0x049CA3 $9C93: C-----  C0 C0    CPY  #$C0
  0x049CA5 $9C95: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049CA6 $9C96: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049CA7 $9C97: C-----  00       BRK  
  0x049CA8 $9C98: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x049CA9 $9C99: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x049CAA $9C9A: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x049CAB $9C9B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049CAC $9C9C: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x049CAD $9C9D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049CAE $9C9E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049CAF $9C9F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049CB0 $9CA0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049CB1 $9CA1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049CB2 $9CA2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049CB3 $9CA3: C-----  78       SEI  
  0x049CB4 $9CA4: C-----  00       BRK  
  0x049CB5 $9CA5: C-----  00       BRK  
  0x049CB6 $9CA6: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049CB7 $9CA7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049CB8 $9CA8: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x049CB9 $9CA9: C-----  1D 78 00 ORA  $0078,X
  0x049CBC $9CAC: C-----  00       BRK  
  0x049CBD $9CAD: C-----  00       BRK  
  0x049CBE $9CAE: C-----  00       BRK  
  0x049CBF $9CAF: C-----  00       BRK  
  0x049CC0 $9CB0: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049CC1 $9CB1: C-----  01 01    ORA  ($01,X)
  0x049CC3 $9CB3: C-----  81 C3    STA  ($C3,X)
  0x049CC5 $9CB5: C-----  E6 E8    INC  $E8
  0x049CC7 $9CB7: C-----  F0 FD    BEQ  $9CB6
  0x049CC9 $9CB9: C-----  FE FE 7E INC  $7EFE,X
  0x049CCC $9CBC: C-----  BC D8 D0 LDY  $D0D8,X
  0x049CCF $9CBF: C-----  C0 6A    CPY  #$6A
  0x049CD1 $9CC1: C-----  BD 5E AB LDA  $AB5E,X
  0x049CD4 $9CC4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049CD5 $9CC5: C-----  00       BRK  
  0x049CD6 $9CC6: C-----  00       BRK  
  0x049CD7 $9CC7: C-----  00       BRK  
  0x049CD8 $9CC8: C-----  15 02    ORA  $02,X
  0x049CDA $9CCA: C-----  01 00    ORA  ($00,X)
  0x049CDC $9CCC: C-----  00       BRK  
  0x049CDD $9CCD: C-----  00       BRK  
  0x049CDE $9CCE: C-----  00       BRK  
  0x049CDF $9CCF: C-----  00       BRK  
  0x049CE0 $9CD0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049CE1 $9CD1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049CE2 $9CD2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049CE3 $9CD3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049CE4 $9CD4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049CE5 $9CD5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049CE6 $9CD6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049CE7 $9CD7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049CE8 $9CD8: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x049CE9 $9CD9: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x049CEA $9CDA: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x049CEB $9CDB: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x049CEC $9CDC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049CED $9CDD: C-----  8C 70 E0 STY  $E070
  0x049CF0 $9CE0: C-----  F8       SED  
  0x049CF1 $9CE1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049CF2 $9CE2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049CF3 $9CE3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049CF4 $9CE4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049CF5 $9CE5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049CF6 $9CE6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049CF7 $9CE7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049CF8 $9CE8: C-----  00       BRK  
  0x049CF9 $9CE9: C-----  38       SEC  
  0x049CFA $9CEA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049CFB $9CEB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049CFC $9CEC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049CFD $9CED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049CFE $9CEE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049CFF $9CEF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D00 $9CF0: C-----  00       BRK  
  0x049D01 $9CF1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049D02 $9CF2: C-----  F0 FE    BEQ  $9CF2
  0x049D04 $9CF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D05 $9CF5: C-----  F8       SED  
  0x049D06 $9CF6: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x049D07 $9CF7: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x049D08 $9CF8: C-----  00       BRK  
  0x049D09 $9CF9: C-----  00       BRK  
  0x049D0A $9CFA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049D0B $9CFB: C-----  F0 F8    BEQ  $9CF5
  0x049D0D $9CFD: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x049D0E $9CFE: C-----  EC EB FF CPX  $FFEB
  0x049D11 $9D01: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D12 $9D02: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D13 $9D03: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049D14 $9D04: C-----  F0 C0    BEQ  $9CC6
  0x049D16 $9D06: C-----  00       BRK  
  0x049D17 $9D07: C-----  00       BRK  
  0x049D18 $9D08: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049D19 $9D09: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049D1A $9D0A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049D1B $9D0B: C-----  FE F8 E0 INC  $E0F8,X
  0x049D1E $9D0E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049D1F $9D0F: C-----  00       BRK  
  0x049D20 $9D10: C-----  F0 C0    BEQ  $9CD2
  0x049D22 $9D12: C-----  00       BRK  
  0x049D23 $9D13: C-----  00       BRK  
  0x049D24 $9D14: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049D25 $9D15: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049D26 $9D16: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049D27 $9D17: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D28 $9D18: C-----  F8       SED  
  0x049D29 $9D19: C-----  E0 80    CPX  #$80
  0x049D2B $9D1B: C-----  00       BRK  
  0x049D2C $9D1C: C-----  01 00    ORA  ($00,X)
  0x049D2E $9D1E: C-----  00       BRK  
  0x049D2F $9D1F: C-----  20 0F 03 JSR  $030F
  0x049D32 $9D22: C-----  00       BRK  
  0x049D33 $9D23: C-----  00       BRK  
  0x049D34 $9D24: C-----  C0 F0    CPY  #$F0
  0x049D36 $9D26: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049D37 $9D27: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D38 $9D28: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x049D39 $9D29: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x049D3A $9D2A: C-----  01 00    ORA  ($00,X)
  0x049D3C $9D2C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049D3D $9D2D: C-----  00       BRK  
  0x049D3E $9D2E: C-----  00       BRK  
  0x049D3F $9D2F: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049D40 $9D30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D41 $9D31: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D42 $9D32: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D43 $9D33: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049D44 $9D34: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049D45 $9D35: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049D46 $9D36: C-----  00       BRK  
  0x049D47 $9D37: C-----  00       BRK  
  0x049D48 $9D38: C-----  C0 F0    CPY  #$F0
  0x049D4A $9D3A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049D4B $9D3B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049D4C $9D3C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x049D4D $9D3D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x049D4E $9D3E: C-----  01 00    ORA  ($00,X)
  0x049D50 $9D40: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049D51 $9D41: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049D52 $9D42: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049D53 $9D43: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D54 $9D44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D55 $9D45: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D56 $9D46: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D57 $9D47: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D58 $9D48: C-----  00       BRK  
  0x049D59 $9D49: C-----  08       PHP  
  0x049D5A $9D4A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049D5B $9D4B: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049D5C $9D4C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049D5D $9D4D: C-----  8C 70 E0 STY  $E070
  0x049D60 $9D50: C-----  60       RTS  
  0x049D61 $9D51: C-----  90 C8    BCC  $9D1B
  0x049D63 $9D53: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x049D64 $9D54: C-----  E4 72    CPX  $72
  0x049D66 $9D56: C-----  7D 5D 00 ADC  $005D,X
  0x049D69 $9D59: C-----  60       RTS  
  0x049D6A $9D5A: C-----  30 28    BMI  $9D84
  0x049D6C $9D5C: C-----  18       CLC  
  0x049D6D $9D5D: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x049D6E $9D5E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049D6F $9D5F: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x049D70 $9D60: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D71 $9D61: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D72 $9D62: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D73 $9D63: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D74 $9D64: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D75 $9D65: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D76 $9D66: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D77 $9D67: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049D78 $9D68: C-----  00       BRK  
  0x049D79 $9D69: C-----  00       BRK  
  0x049D7A $9D6A: C-----  00       BRK  
  0x049D7B $9D6B: C-----  00       BRK  
  0x049D7C $9D6C: C-----  C0 F0    CPY  #$F0
  0x049D7E $9D6E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049D7F $9D6F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049D80 $9D70: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049D81 $9D71: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x049D82 $9D72: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x049D83 $9D73: C-----  18       CLC  
  0x049D84 $9D74: C-----  28       PLP  
  0x049D85 $9D75: C-----  10 30    BPL  $9DA7
  0x049D87 $9D77: C-----  50 00    BVC  $9D79
  0x049D89 $9D79: C-----  40       RTI  
  0x049D8A $9D7A: C-----  60       RTS  
  0x049D8B $9D7B: C-----  E0 D0    CPX  #$D0
  0x049D8D $9D7D: C-----  E0 C0    CPX  #$C0
  0x049D8F $9D7F: C-----  A0 FF    LDY  #$FF
  0x049D91 $9D81: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D92 $9D82: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D93 $9D83: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D94 $9D84: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D95 $9D85: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D96 $9D86: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D97 $9D87: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049D98 $9D88: C-----  C8       INY  
  0x049D99 $9D89: C-----  30 2C    BMI  $9DB7
  0x049D9B $9D8B: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x049D9C $9D8C: C-----  C0 31    CPY  #$31
  0x049D9E $9D8E: C-----  0E 07 04 ASL  $0407
  0x049DA1 $9D91: C-----  84 78    STY  $78
  0x049DA3 $9D93: C-----  84 3C    STY  $3C
  0x049DA5 $9D95: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x049DA6 $9D96: C-----  FE FE F8 INC  $F8FE,X
  0x049DA9 $9D99: C-----  78       SEI  
  0x049DAA $9D9A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049DAB $9D9B: C-----  78       SEI  
  0x049DAC $9D9C: C-----  C0 B8    CPY  #$B8
  0x049DAE $9D9E: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x049DAF $9D9F: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x049DB0 $9DA0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049DB1 $9DA1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049DB2 $9DA2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049DB3 $9DA3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049DB4 $9DA4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049DB5 $9DA5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049DB6 $9DA6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049DB7 $9DA7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049DB8 $9DA8: C-----  7E 7E 7F ROR  $7F7E,X
  0x049DBB $9DAB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049DBC $9DAC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049DBD $9DAD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049DBE $9DAE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049DBF $9DAF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049DC0 $9DB0: C-----  00       BRK  
  0x049DC1 $9DB1: C-----  00       BRK  
  0x049DC2 $9DB2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049DC3 $9DB3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049DC4 $9DB4: C-----  C0 C0    CPY  #$C0
  0x049DC6 $9DB6: C-----  C0 E0    CPY  #$E0
  0x049DC8 $9DB8: C-----  00       BRK  
  0x049DC9 $9DB9: C-----  00       BRK  
  0x049DCA $9DBA: C-----  00       BRK  
  0x049DCB $9DBB: C-----  00       BRK  
  0x049DCC $9DBC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049DCD $9DBD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049DCE $9DBE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049DCF $9DBF: C-----  C0 08    CPY  #$08
  0x049DD1 $9DC1: C-----  10 10    BPL  $9DD3
  0x049DD3 $9DC3: C-----  21 22    AND  ($22,X)
  0x049DD5 $9DC5: C-----  21 5A    AND  ($5A,X)
  0x049DD7 $9DC7: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x049DD8 $9DC8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x049DD9 $9DC9: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049DDA $9DCA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049DDB $9DCB: C-----  1E 1D 1E ASL  $1E1D,X
  0x049DDE $9DCE: C-----  25 10    AND  $10
  0x049DE0 $9DD0: C-----  A0 60    LDY  #$60
  0x049DE2 $9DD2: C-----  A0 60    LDY  #$60
  0x049DE4 $9DD4: C-----  C0 40    CPY  #$40
  0x049DE6 $9DD6: C-----  C0 C0    CPY  #$C0
  0x049DE8 $9DD8: C-----  40       RTI  
  0x049DE9 $9DD9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049DEA $9DDA: C-----  40       RTI  
  0x049DEB $9DDB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049DEC $9DDC: C-----  00       BRK  
  0x049DED $9DDD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049DEE $9DDE: C-----  00       BRK  
  0x049DEF $9DDF: C-----  00       BRK  
  0x049DF0 $9DE0: C-----  71 7F    ADC  ($7F),Y
  0x049DF2 $9DE2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049DF3 $9DE3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049DF4 $9DE4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049DF5 $9DE5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049DF6 $9DE6: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049DF7 $9DE7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049DF8 $9DE8: C-----  2E 30 3F ROL  $3F30
  0x049DFB $9DEB: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049DFC $9DEC: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049DFD $9DED: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049DFE $9DEE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049DFF $9DEF: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049E00 $9DF0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049E01 $9DF1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049E02 $9DF2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049E03 $9DF3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049E04 $9DF4: C-----  C0 C0    CPY  #$C0
  0x049E06 $9DF6: C-----  C0 E0    CPY  #$E0
  0x049E08 $9DF8: C-----  00       BRK  
  0x049E09 $9DF9: C-----  00       BRK  
  0x049E0A $9DFA: C-----  00       BRK  
  0x049E0B $9DFB: C-----  00       BRK  
  0x049E0C $9DFC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049E0D $9DFD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049E0E $9DFE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049E0F $9DFF: C-----  C0 02    CPY  #$02
  0x049E11 $9E01: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049E12 $9E02: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049E13 $9E03: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049E14 $9E04: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049E15 $9E05: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049E16 $9E06: C-----  01 03    ORA  ($03,X)
  0x049E18 $9E08: C-----  01 01    ORA  ($01,X)
  0x049E1A $9E0A: C-----  01 01    ORA  ($01,X)
  0x049E1C $9E0C: C-----  01 01    ORA  ($01,X)
  0x049E1E $9E0E: C-----  00       BRK  
  0x049E1F $9E0F: C-----  00       BRK  
  0x049E20 $9E10: C-----  C0 80    CPY  #$80
  0x049E22 $9E12: C-----  00       BRK  
  0x049E23 $9E13: C-----  00       BRK  
  0x049E24 $9E14: C-----  00       BRK  
  0x049E25 $9E15: C-----  00       BRK  
  0x049E26 $9E16: C-----  00       BRK  
  0x049E27 $9E17: C-----  00       BRK  
  0x049E28 $9E18: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049E29 $9E19: C-----  00       BRK  
  0x049E2A $9E1A: C-----  00       BRK  
  0x049E2B $9E1B: C-----  00       BRK  
  0x049E2C $9E1C: C-----  00       BRK  
  0x049E2D $9E1D: C-----  00       BRK  
  0x049E2E $9E1E: C-----  00       BRK  
  0x049E2F $9E1F: C-----  00       BRK  
  0x049E30 $9E20: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049E31 $9E21: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049E32 $9E22: C-----  08       PHP  
  0x049E33 $9E23: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049E34 $9E24: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049E35 $9E25: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049E36 $9E26: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x049E37 $9E27: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x049E38 $9E28: C-----  01 03    ORA  ($03,X)
  0x049E3A $9E2A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x049E3B $9E2B: C-----  00       BRK  
  0x049E3C $9E2C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049E3D $9E2D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x049E3E $9E2E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049E3F $9E2F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049E40 $9E30: C-----  00       BRK  
  0x049E41 $9E31: C-----  00       BRK  
  0x049E42 $9E32: C-----  00       BRK  
  0x049E43 $9E33: C-----  00       BRK  
  0x049E44 $9E34: C-----  00       BRK  
  0x049E45 $9E35: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049E46 $9E36: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049E47 $9E37: C-----  40       RTI  
  0x049E48 $9E38: C-----  00       BRK  
  0x049E49 $9E39: C-----  00       BRK  
  0x049E4A $9E3A: C-----  00       BRK  
  0x049E4B $9E3B: C-----  00       BRK  
  0x049E4C $9E3C: C-----  00       BRK  
  0x049E4D $9E3D: C-----  00       BRK  
  0x049E4E $9E3E: C-----  00       BRK  
  0x049E4F $9E3F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049E50 $9E40: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049E51 $9E41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049E52 $9E42: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049E53 $9E43: C-----  C0 00    CPY  #$00
  0x049E55 $9E45: C-----  00       BRK  
  0x049E56 $9E46: C-----  00       BRK  
  0x049E57 $9E47: C-----  00       BRK  
  0x049E58 $9E48: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049E59 $9E49: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049E5A $9E4A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049E5B $9E4B: C-----  00       BRK  
  0x049E5C $9E4C: C-----  00       BRK  
  0x049E5D $9E4D: C-----  00       BRK  
  0x049E5E $9E4E: C-----  00       BRK  
  0x049E5F $9E4F: C-----  00       BRK  
  0x049E60 $9E50: C-----  E8       INX  
  0x049E61 $9E51: C-----  E8       INX  
  0x049E62 $9E52: C-----  18       CLC  
  0x049E63 $9E53: C-----  08       PHP  
  0x049E64 $9E54: C-----  08       PHP  
  0x049E65 $9E55: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049E66 $9E56: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049E67 $9E57: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049E68 $9E58: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x049E69 $9E59: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x049E6A $9E5A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x049E6B $9E5B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x049E6C $9E5C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x049E6D $9E5D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049E6E $9E5E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049E6F $9E5F: C-----  01 01    ORA  ($01,X)
  0x049E71 $9E61: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049E72 $9E62: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049E73 $9E63: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049E74 $9E64: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049E75 $9E65: C-----  FE FC 78 INC  $78FC,X
  0x049E78 $9E68: C-----  00       BRK  
  0x049E79 $9E69: C-----  01 03    ORA  ($03,X)
  0x049E7B $9E6B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049E7C $9E6C: C-----  7E 74 68 ROR  $6874,X
  0x049E7F $9E6F: C-----  00       BRK  
  0x049E80 $9E70: C-----  00       BRK  
  0x049E81 $9E71: C-----  00       BRK  
  0x049E82 $9E72: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049E83 $9E73: C-----  1D 39 F1 ORA  $F139,X
  0x049E86 $9E76: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x049E87 $9E77: C-----  66 00    ROR  $00
  0x049E89 $9E79: C-----  00       BRK  
  0x049E8A $9E7A: C-----  00       BRK  
  0x049E8B $9E7B: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049E8C $9E7C: C-----  06 0E    ASL  $0E
  0x049E8E $9E7E: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x049E8F $9E7F: C-----  98       TYA  
  0x049E90 $9E80: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049E91 $9E81: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x049E92 $9E82: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049E93 $9E83: C-----  FE FC F8 INC  $F8FC,X
  0x049E96 $9E86: C-----  E0 80    CPX  #$80
  0x049E98 $9E88: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x049E99 $9E89: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x049E9A $9E8A: C-----  7E FC F8 ROR  $F8FC,X
  0x049E9D $9E8D: C-----  E0 80    CPX  #$80
  0x049E9F $9E8F: C-----  00       BRK  
  0x049EA0 $9E90: C-----  20 20 10 JSR  $1020
  0x049EA3 $9E93: C-----  10 08    BPL  $9E9D
  0x049EA5 $9E95: C-----  08       PHP  
  0x049EA6 $9E96: C-----  08       PHP  
  0x049EA7 $9E97: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049EA8 $9E98: C-----  C0 C0    CPY  #$C0
  0x049EAA $9E9A: C-----  E0 E0    CPX  #$E0
  0x049EAC $9E9C: C-----  F0 F0    BEQ  $9E8E
  0x049EAE $9E9E: C-----  F0 F8    BEQ  $9E98
  0x049EB0 $9EA0: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049EB1 $9EA1: C-----  01 00    ORA  ($00,X)
  0x049EB3 $9EA3: C-----  00       BRK  
  0x049EB4 $9EA4: C-----  00       BRK  
  0x049EB5 $9EA5: C-----  00       BRK  
  0x049EB6 $9EA6: C-----  00       BRK  
  0x049EB7 $9EA7: C-----  00       BRK  
  0x049EB8 $9EA8: C-----  01 00    ORA  ($00,X)
  0x049EBA $9EAA: C-----  00       BRK  
  0x049EBB $9EAB: C-----  00       BRK  
  0x049EBC $9EAC: C-----  00       BRK  
  0x049EBD $9EAD: C-----  00       BRK  
  0x049EBE $9EAE: C-----  00       BRK  
  0x049EBF $9EAF: C-----  00       BRK  
  0x049EC0 $9EB0: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049EC1 $9EB1: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049EC2 $9EB2: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x049EC3 $9EB3: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x049EC4 $9EB4: C-----  21 10    AND  ($10,X)
  0x049EC6 $9EB6: C-----  09 05    ORA  #$05
  0x049EC8 $9EB8: C-----  F8       SED  
  0x049EC9 $9EB9: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049ECA $9EBA: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x049ECB $9EBB: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x049ECC $9EBC: C-----  1E 0F 06 ASL  $060F,X
  0x049ECF $9EBF: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049ED0 $9EC0: C-----  6A       ROR  A
  0x049ED1 $9EC1: C-----  BD 5E AB LDA  $AB5E,X
  0x049ED4 $9EC4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x049ED5 $9EC5: C-----  00       BRK  
  0x049ED6 $9EC6: C-----  00       BRK  
  0x049ED7 $9EC7: C-----  00       BRK  
  0x049ED8 $9EC8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049ED9 $9EC9: C-----  40       RTI  
  0x049EDA $9ECA: C-----  A0 54    LDY  #$54
  0x049EDC $9ECC: C-----  00       BRK  
  0x049EDD $9ECD: C-----  00       BRK  
  0x049EDE $9ECE: C-----  00       BRK  
  0x049EDF $9ECF: C-----  00       BRK  
  0x049EE0 $9ED0: C-----  00       BRK  
  0x049EE1 $9ED1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049EE2 $9ED2: C-----  0D 1A 3C ORA  $3C1A
  0x049EE5 $9ED5: C-----  38       SEC  
  0x049EE6 $9ED6: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x049EE7 $9ED7: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x049EE8 $9ED8: C-----  00       BRK  
  0x049EE9 $9ED9: C-----  00       BRK  
  0x049EEA $9EDA: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049EEB $9EDB: C-----  05 03    ORA  $03
  0x049EED $9EDD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x049EEE $9EDE: C-----  18       CLC  
  0x049EEF $9EDF: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x049EF0 $9EE0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049EF1 $9EE1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049EF2 $9EE2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049EF3 $9EE3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049EF4 $9EE4: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x049EF5 $9EE5: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x049EF6 $9EE6: C-----  C8       INY  
  0x049EF7 $9EE7: C-----  38       SEC  
  0x049EF8 $9EE8: C-----  FD FB 07 SBC  $07FB,X
  0x049EFB $9EEB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049EFC $9EEC: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x049EFD $9EED: C-----  08       PHP  
  0x049EFE $9EEE: C-----  30 C0    BMI  $9EB0
  0x049F00 $9EF0: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x049F01 $9EF1: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x049F02 $9EF2: C-----  38       SEC  
  0x049F03 $9EF3: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x049F04 $9EF4: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x049F05 $9EF5: C-----  0D 03 00 ORA  $0003
  0x049F08 $9EF8: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x049F09 $9EF9: C-----  18       CLC  
  0x049F0A $9EFA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x049F0B $9EFB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049F0C $9EFC: C-----  05 02    ORA  $02
  0x049F0E $9EFE: C-----  00       BRK  
  0x049F0F $9EFF: C-----  00       BRK  
  0x049F10 $9F00: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x049F11 $9F01: C-----  F0 7E    BEQ  $9F81
  0x049F13 $9F03: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x049F14 $9F04: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049F15 $9F05: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x049F16 $9F06: C-----  06 02    ASL  $02
  0x049F18 $9F08: C-----  78       SEI  
  0x049F19 $9F09: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049F1A $9F0A: C-----  01 04    ORA  ($04,X)
  0x049F1C $9F0C: C-----  00       BRK  
  0x049F1D $9F0D: C-----  00       BRK  
  0x049F1E $9F0E: C-----  00       BRK  
  0x049F1F $9F0F: C-----  00       BRK  
  0x049F20 $9F10: C-----  00       BRK  
  0x049F21 $9F11: C-----  C0 20    CPY  #$20
  0x049F23 $9F13: C-----  E0 E0    CPX  #$E0
  0x049F25 $9F15: C-----  40       RTI  
  0x049F26 $9F16: C-----  20 20 00 JSR  $0020
  0x049F29 $9F19: C-----  00       BRK  
  0x049F2A $9F1A: C-----  C0 00    CPY  #$00
  0x049F2C $9F1C: C-----  00       BRK  
  0x049F2D $9F1D: C-----  00       BRK  
  0x049F2E $9F1E: C-----  00       BRK  
  0x049F2F $9F1F: C-----  00       BRK  
  0x049F30 $9F20: C-----  00       BRK  
  0x049F31 $9F21: C-----  00       BRK  
  0x049F32 $9F22: C-----  00       BRK  
  0x049F33 $9F23: C-----  00       BRK  
  0x049F34 $9F24: C-----  0E 3F FF ASL  $FF3F
  0x049F37 $9F27: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049F38 $9F28: C-----  00       BRK  
  0x049F39 $9F29: C-----  00       BRK  
  0x049F3A $9F2A: C-----  00       BRK  
  0x049F3B $9F2B: C-----  00       BRK  
  0x049F3C $9F2C: C-----  00       BRK  
  0x049F3D $9F2D: C-----  0E 3F FF ASL  $FF3F
  0x049F40 $9F30: C-----  E0 E0    CPX  #$E0
  0x049F42 $9F32: C-----  F0 18    BEQ  $9F4C
  0x049F44 $9F34: C-----  08       PHP  
  0x049F45 $9F35: C-----  08       PHP  
  0x049F46 $9F36: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049F47 $9F37: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049F48 $9F38: C-----  C0 C0    CPY  #$C0
  0x049F4A $9F3A: C-----  00       BRK  
  0x049F4B $9F3B: C-----  E0 F0    CPX  #$F0
  0x049F4D $9F3D: C-----  F0 F8    BEQ  $9F37
  0x049F4F $9F3F: C-----  F8       SED  
  0x049F50 $9F40: C-----  00       BRK  
  0x049F51 $9F41: C-----  00       BRK  
  0x049F52 $9F42: C-----  00       BRK  
  0x049F53 $9F43: C-----  00       BRK  
  0x049F54 $9F44: C-----  00       BRK  
  0x049F55 $9F45: C-----  00       BRK  
  0x049F56 $9F46: C-----  00       BRK  
  0x049F57 $9F47: C-----  78       SEI  
  0x049F58 $9F48: C-----  00       BRK  
  0x049F59 $9F49: C-----  00       BRK  
  0x049F5A $9F4A: C-----  00       BRK  
  0x049F5B $9F4B: C-----  00       BRK  
  0x049F5C $9F4C: C-----  00       BRK  
  0x049F5D $9F4D: C-----  00       BRK  
  0x049F5E $9F4E: C-----  00       BRK  
  0x049F5F $9F4F: C-----  00       BRK  
  0x049F60 $9F50: C-----  00       BRK  
  0x049F61 $9F51: C-----  00       BRK  
  0x049F62 $9F52: C-----  00       BRK  
  0x049F63 $9F53: C-----  01 01    ORA  ($01,X)
  0x049F65 $9F55: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049F66 $9F56: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x049F67 $9F57: C-----  08       PHP  
  0x049F68 $9F58: C-----  00       BRK  
  0x049F69 $9F59: C-----  00       BRK  
  0x049F6A $9F5A: C-----  00       BRK  
  0x049F6B $9F5B: C-----  00       BRK  
  0x049F6C $9F5C: C-----  00       BRK  
  0x049F6D $9F5D: C-----  01 03    ORA  ($03,X)
  0x049F6F $9F5F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x049F70 $9F60: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x049F71 $9F61: C-----  F0 7E    BEQ  $9FE1
  0x049F73 $9F63: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x049F74 $9F64: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049F75 $9F65: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x049F76 $9F66: C-----  06 02    ASL  $02
  0x049F78 $9F68: C-----  78       SEI  
  0x049F79 $9F69: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x049F7A $9F6A: C-----  01 04    ORA  ($04,X)
  0x049F7C $9F6C: C-----  00       BRK  
  0x049F7D $9F6D: C-----  00       BRK  
  0x049F7E $9F6E: C-----  01 01    ORA  ($01,X)
  0x049F80 $9F70: C-----  00       BRK  
  0x049F81 $9F71: C-----  C0 20    CPY  #$20
  0x049F83 $9F73: C-----  E0 E0    CPX  #$E0
  0x049F85 $9F75: C-----  40       RTI  
  0x049F86 $9F76: C-----  20 20 00 JSR  $0020
  0x049F89 $9F79: C-----  00       BRK  
  0x049F8A $9F7A: C-----  C0 00    CPY  #$00
  0x049F8C $9F7C: C-----  00       BRK  
  0x049F8D $9F7D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x049F8E $9F7E: C-----  C0 C0    CPY  #$C0
  0x049F90 $9F80: C-----  00       BRK  
  0x049F91 $9F81: C-----  C0 F0    CPY  #$F0
  0x049F93 $9F83: C-----  E8       INX  
  0x049F94 $9F84: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x049F95 $9F85: C-----  8C 86 CE STY  $CE86
  0x049F98 $9F88: C-----  00       BRK  
  0x049F99 $9F89: C-----  00       BRK  
  0x049F9A $9F8A: C-----  00       BRK  
  0x049F9B $9F8B: C-----  10 A8    BPL  $9F35
  0x049F9D $9F8D: C-----  70 78    BVS  $A007
  0x049F9F $9F8F: C-----  30 07    BMI  $9F98
  0x049FA1 $9F91: C-----  06 04    ASL  $04
  0x049FA3 $9F93: C-----  05 01    ORA  $01
  0x049FA5 $9F95: C-----  01 0B    ORA  ($0B,X)
  0x049FA7 $9F97: C-----  11 F8    ORA  ($F8),Y
  0x049FA9 $9F99: C-----  F9 FB FA SBC  $FAFB,Y
  0x049FAC $9F9C: C-----  FE FE F4 INC  $F4FE,X
  0x049FAF $9F9F: C-----  EE FE 8E INC  $8EFE
  0x049FB2 $9FA2: C-----  8C 54 E8 STY  $E854
  0x049FB5 $9FA5: C-----  F0 C0    BEQ  $9F67
  0x049FB7 $9FA7: C-----  00       BRK  
  0x049FB8 $9FA8: C-----  00       BRK  
  0x049FB9 $9FA9: C-----  70 70    BVS  $A01B
  0x049FBB $9FAB: C-----  A8       TAY  
  0x049FBC $9FAC: C-----  10 00    BPL  $9FAE
  0x049FBE $9FAE: C-----  00       BRK  
  0x049FBF $9FAF: C-----  00       BRK  
  0x049FC0 $9FB0: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x049FC1 $9FB1: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x049FC2 $9FB2: C-----  AA       TAX  
  0x049FC3 $9FB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x049FC4 $9FB4: C-----  00       BRK  
  0x049FC5 $9FB5: C-----  00       BRK  
  0x049FC6 $9FB6: C-----  00       BRK  
  0x049FC7 $9FB7: C-----  00       BRK  
  0x049FC8 $9FB8: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x049FC9 $9FB9: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x049FCA $9FBA: C-----  55 00    EOR  $00,X
  0x049FCC $9FBC: C-----  00       BRK  
  0x049FCD $9FBD: C-----  00       BRK  
  0x049FCE $9FBE: C-----  00       BRK  
  0x049FCF $9FBF: C-----  00       BRK  
  0x049FD0 $9FC0: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049FD1 $9FC1: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049FD2 $9FC2: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049FD3 $9FC3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049FD4 $9FC4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049FD5 $9FC5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049FD6 $9FC6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049FD7 $9FC7: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049FD8 $9FC8: C-----  01 01    ORA  ($01,X)
  0x049FDA $9FCA: C-----  01 01    ORA  ($01,X)
  0x049FDC $9FCC: C-----  00       BRK  
  0x049FDD $9FCD: C-----  01 00    ORA  ($00,X)
  0x049FDF $9FCF: C-----  01 20    ORA  ($20,X)
  0x049FE1 $9FD1: C-----  10 10    BPL  $9FE3
  0x049FE3 $9FD3: C-----  10 08    BPL  $9FDD
  0x049FE5 $9FD5: C-----  08       PHP  
  0x049FE6 $9FD6: C-----  08       PHP  
  0x049FE7 $9FD7: C-----  84 C0    STY  $C0
  0x049FE9 $9FD9: C-----  E0 E0    CPX  #$E0
  0x049FEB $9FDB: C-----  E0 F0    CPX  #$F0
  0x049FED $9FDD: C-----  F0 F0    BEQ  $9FCF
  0x049FEF $9FDF: C-----  78       SEI  
  0x049FF0 $9FE0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049FF1 $9FE1: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049FF2 $9FE2: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x049FF3 $9FE3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x049FF4 $9FE4: C-----  01 01    ORA  ($01,X)
  0x049FF6 $9FE6: C-----  01 00    ORA  ($00,X)
  0x049FF8 $9FE8: C-----  00       BRK  
  0x049FF9 $9FE9: C-----  01 00    ORA  ($00,X)
  0x049FFB $9FEB: C-----  01 00    ORA  ($00,X)
  0x049FFD $9FED: C-----  00       BRK  
  0x049FFE $9FEE: C-----  00       BRK  
  0x049FFF $9FEF: C-----  00       BRK  
  0x04A000 $9FF0: ------  .byte $00
  0x04A001 $9FF1: ------  .byte $7E
  0x04A002 $9FF2: ------  .byte $42
  0x04A003 $9FF3: ------  .byte $42
  0x04A004 $9FF4: ------  .byte $42
  0x04A005 $9FF5: ------  .byte $42
  0x04A006 $9FF6: ------  .byte $7E
  0x04A007 $9FF7: ------  .byte $00
  0x04A008 $9FF8: ------  .byte $00
  0x04A009 $9FF9: ------  .byte $00
  0x04A00A $9FFA: ------  .byte $00
  0x04A00B $9FFB: ------  .byte $00
  0x04A00C $9FFC: ------  .byte $00
  0x04A00D $9FFD: ------  .byte $00
  0x04A00E $9FFE: ------  .byte $00
  0x04A00F $9FFF: ------  .byte $00