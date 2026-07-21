; ===== MMC3 Bank 33 =====
; ROM: 0x042010-0x04400F
; CPU: $8000-$9FFF
; CDL: code=8080 data=0 unaccessed=112

  0x042010 $8000: C-----  00       BRK  
  0x042011 $8001: C-----  00       BRK  
  0x042012 $8002: C-----  00       BRK  
  0x042013 $8003: C-----  00       BRK  
  0x042014 $8004: C-----  00       BRK  
  0x042015 $8005: C-----  00       BRK  
  0x042016 $8006: C-----  00       BRK  
  0x042017 $8007: C-----  00       BRK  
  0x042018 $8008: C-----  00       BRK  
  0x042019 $8009: C-----  00       BRK  
  0x04201A $800A: C-----  00       BRK  
  0x04201B $800B: C-----  00       BRK  
  0x04201C $800C: C-----  00       BRK  
  0x04201D $800D: C-----  00       BRK  
  0x04201E $800E: C-----  00       BRK  
  0x04201F $800F: C-----  00       BRK  
  0x042020 $8010: ------  .byte $FF
  0x042021 $8011: ------  .byte $FF
  0x042022 $8012: ------  .byte $FF
  0x042023 $8013: ------  .byte $FF
  0x042024 $8014: ------  .byte $FF
  0x042025 $8015: ------  .byte $FF
  0x042026 $8016: ------  .byte $FF
  0x042027 $8017: ------  .byte $FF
  0x042028 $8018: ------  .byte $00
  0x042029 $8019: ------  .byte $00
  0x04202A $801A: ------  .byte $00
  0x04202B $801B: ------  .byte $00
  0x04202C $801C: ------  .byte $00
  0x04202D $801D: ------  .byte $00
  0x04202E $801E: ------  .byte $00
  0x04202F $801F: ------  .byte $00
  0x042030 $8020: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x042031 $8021: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x042032 $8022: C-----  08       PHP  
  0x042033 $8023: C-----  08       PHP  
  0x042034 $8024: C-----  05 03    ORA  $03
  0x042036 $8026: C-----  01 01    ORA  ($01,X)
  0x042038 $8028: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x042039 $8029: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04203A $802A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04203B $802B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04203C $802C: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04203D $802D: C-----  00       BRK  
  0x04203E $802E: C-----  00       BRK  
  0x04203F $802F: C-----  00       BRK  
  0x042040 $8030: C-----  00       BRK  
  0x042041 $8031: C-----  00       BRK  
  0x042042 $8032: C-----  00       BRK  
  0x042043 $8033: C-----  00       BRK  
  0x042044 $8034: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042045 $8035: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042046 $8036: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042047 $8037: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042048 $8038: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042049 $8039: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04204A $803A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04204B $803B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04204C $803C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04204D $803D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04204E $803E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04204F $803F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042050 $8040: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x042051 $8041: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042052 $8042: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042053 $8043: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042054 $8044: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042055 $8045: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042056 $8046: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042057 $8047: C-----  31 00    AND  ($00),Y
  0x042059 $8049: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04205A $804A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04205B $804B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04205C $804C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04205D $804D: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x04205E $804E: C-----  30 00    BMI  $8050
  0x042060 $8050: C-----  C0 F0    CPY  #$F0
  0x042062 $8052: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042063 $8053: C-----  FE FF FF INC  $FFFF,X
  0x042066 $8056: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042067 $8057: C-----  7E 00 C0 ROR  $C000,X
  0x04206A $805A: C-----  F0 FC    BEQ  $8058
  0x04206C $805C: C-----  FE FF 7E INC  $7EFF,X
  0x04206F $805F: C-----  3D 01 00 AND  $0001,X
  0x042072 $8062: C-----  00       BRK  
  0x042073 $8063: C-----  00       BRK  
  0x042074 $8064: C-----  00       BRK  
  0x042075 $8065: C-----  00       BRK  
  0x042076 $8066: C-----  01 01    ORA  ($01,X)
  0x042078 $8068: C-----  FE FF FF INC  $FFFF,X
  0x04207B $806B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04207C $806C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04207D $806D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04207E $806E: C-----  FE FE E0 INC  $E0FE,X
  0x042081 $8071: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x042082 $8072: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x042083 $8073: C-----  1E 87 87 ASL  $8787,X
  0x042086 $8076: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x042087 $8077: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042088 $8078: C-----  00       BRK  
  0x042089 $8079: C-----  E0 1C    CPX  #$1C
  0x04208B $807B: C-----  E0 7A    CPX  #$7A
  0x04208D $807D: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x04208E $807E: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04208F $807F: C-----  F6 78    INC  $78,X
  0x042091 $8081: C-----  30 00    BMI  $8083
  0x042093 $8083: C-----  00       BRK  
  0x042094 $8084: C-----  00       BRK  
  0x042095 $8085: C-----  00       BRK  
  0x042096 $8086: C-----  00       BRK  
  0x042097 $8087: C-----  00       BRK  
  0x042098 $8088: C-----  00       BRK  
  0x042099 $8089: C-----  00       BRK  
  0x04209A $808A: C-----  00       BRK  
  0x04209B $808B: C-----  00       BRK  
  0x04209C $808C: C-----  00       BRK  
  0x04209D $808D: C-----  00       BRK  
  0x04209E $808E: C-----  00       BRK  
  0x04209F $808F: C-----  00       BRK  
  0x0420A0 $8090: C-----  40       RTI  
  0x0420A1 $8091: C-----  40       RTI  
  0x0420A2 $8092: C-----  40       RTI  
  0x0420A3 $8093: C-----  20 20 70 JSR  $7020
  0x0420A6 $8096: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x0420A7 $8097: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0420A8 $8098: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0420A9 $8099: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0420AA $809A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0420AB $809B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0420AC $809C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0420AD $809D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0420AE $809E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0420AF $809F: C-----  00       BRK  
  0x0420B0 $80A0: C-----  00       BRK  
  0x0420B1 $80A1: C-----  00       BRK  
  0x0420B2 $80A2: C-----  00       BRK  
  0x0420B3 $80A3: C-----  00       BRK  
  0x0420B4 $80A4: C-----  00       BRK  
  0x0420B5 $80A5: C-----  00       BRK  
  0x0420B6 $80A6: C-----  00       BRK  
  0x0420B7 $80A7: C-----  00       BRK  
  0x0420B8 $80A8: C-----  00       BRK  
  0x0420B9 $80A9: C-----  00       BRK  
  0x0420BA $80AA: C-----  00       BRK  
  0x0420BB $80AB: C-----  08       PHP  
  0x0420BC $80AC: C-----  08       PHP  
  0x0420BD $80AD: C-----  00       BRK  
  0x0420BE $80AE: C-----  78       SEI  
  0x0420BF $80AF: C-----  78       SEI  
  0x0420C0 $80B0: C-----  10 2E    BPL  $80E0
  0x0420C2 $80B2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0420C3 $80B3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0420C4 $80B4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0420C5 $80B5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0420C6 $80B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0420C7 $80B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0420C8 $80B8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0420C9 $80B9: C-----  11 0E    ORA  ($0E),Y
  0x0420CB $80BB: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0420CC $80BC: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0420CD $80BD: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0420CE $80BE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0420CF $80BF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0420D0 $80C0: C-----  01 01    ORA  ($01,X)
  0x0420D2 $80C2: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0420D3 $80C3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0420D4 $80C4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0420D5 $80C5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0420D6 $80C6: C-----  01 8F    ORA  ($8F,X)
  0x0420D8 $80C8: C-----  FE FE FC INC  $FCFE,X
  0x0420DB $80CB: C-----  FD FD FC SBC  $FCFD,X
  0x0420DE $80CE: C-----  FE 70 FF INC  $FF70,X
  0x0420E1 $80D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0420E2 $80D2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0420E3 $80D3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0420E4 $80D4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0420E5 $80D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0420E6 $80D6: C-----  D8       CLD  
  0x0420E7 $80D7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0420E8 $80D8: C-----  05 F3    ORA  $F3
  0x0420EA $80DA: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0420EB $80DB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0420EC $80DC: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0420ED $80DD: C-----  58       CLI  
  0x0420EE $80DE: C-----  00       BRK  
  0x0420EF $80DF: C-----  00       BRK  
  0x0420F0 $80E0: C-----  0E 00 80 ASL  $8000
  0x0420F3 $80E3: C-----  C0 C0    CPY  #$C0
  0x0420F5 $80E5: C-----  F0 E0    BEQ  $80C7
  0x0420F7 $80E7: C-----  F8       SED  
  0x0420F8 $80E8: C-----  F1 FF    SBC  ($FF),Y
  0x0420FA $80EA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0420FB $80EB: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0420FC $80EC: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0420FD $80ED: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x0420FE $80EE: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0420FF $80EF: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x042100 $80F0: C-----  A8       TAY  
  0x042101 $80F1: C-----  28       PLP  
  0x042102 $80F2: C-----  18       CLC  
  0x042103 $80F3: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x042104 $80F4: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x042105 $80F5: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x042106 $80F6: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x042107 $80F7: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x042108 $80F8: C-----  50 D0    BVC  $80CA
  0x04210A $80FA: C-----  E0 E8    CPX  #$E8
  0x04210C $80FC: C-----  E8       INX  
  0x04210D $80FD: C-----  E0 F0    CPX  #$F0
  0x04210F $80FF: C-----  C0 00    CPY  #$00
  0x042111 $8101: C-----  00       BRK  
  0x042112 $8102: C-----  C0 A0    CPY  #$A0
  0x042114 $8104: C-----  50 28    BVC  $812E
  0x042116 $8106: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x042117 $8107: C-----  0A       ASL  A
  0x042118 $8108: C-----  00       BRK  
  0x042119 $8109: C-----  00       BRK  
  0x04211A $810A: C-----  00       BRK  
  0x04211B $810B: C-----  40       RTI  
  0x04211C $810C: C-----  A0 D0    LDY  #$D0
  0x04211E $810E: C-----  E8       INX  
  0x04211F $810F: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x042120 $8110: C-----  01 01    ORA  ($01,X)
  0x042122 $8112: C-----  01 01    ORA  ($01,X)
  0x042124 $8114: C-----  01 00    ORA  ($00,X)
  0x042126 $8116: C-----  00       BRK  
  0x042127 $8117: C-----  00       BRK  
  0x042128 $8118: C-----  00       BRK  
  0x042129 $8119: C-----  00       BRK  
  0x04212A $811A: C-----  00       BRK  
  0x04212B $811B: C-----  00       BRK  
  0x04212C $811C: C-----  00       BRK  
  0x04212D $811D: C-----  00       BRK  
  0x04212E $811E: C-----  00       BRK  
  0x04212F $811F: C-----  00       BRK  
  0x042130 $8120: C-----  00       BRK  
  0x042131 $8121: C-----  00       BRK  
  0x042132 $8122: C-----  00       BRK  
  0x042133 $8123: C-----  00       BRK  
  0x042134 $8124: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042135 $8125: C-----  E0 F0    CPX  #$F0
  0x042137 $8127: C-----  F8       SED  
  0x042138 $8128: C-----  00       BRK  
  0x042139 $8129: C-----  00       BRK  
  0x04213A $812A: C-----  00       BRK  
  0x04213B $812B: C-----  00       BRK  
  0x04213C $812C: C-----  00       BRK  
  0x04213D $812D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04213E $812E: C-----  E0 70    CPX  #$70
  0x042140 $8130: C-----  24 0B    BIT  $0B
  0x042142 $8132: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042143 $8133: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042144 $8134: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x042145 $8135: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x042146 $8136: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042147 $8137: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042148 $8138: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x042149 $8139: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04214A $813A: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04214B $813B: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04214C $813C: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04214D $813D: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04214E $813E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04214F $813F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042150 $8140: C-----  00       BRK  
  0x042151 $8141: C-----  00       BRK  
  0x042152 $8142: C-----  00       BRK  
  0x042153 $8143: C-----  01 07    ORA  ($07,X)
  0x042155 $8145: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042156 $8146: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042157 $8147: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042158 $8148: C-----  00       BRK  
  0x042159 $8149: C-----  00       BRK  
  0x04215A $814A: C-----  00       BRK  
  0x04215B $814B: C-----  00       BRK  
  0x04215C $814C: C-----  01 07    ORA  ($07,X)
  0x04215E $814E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04215F $814F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042160 $8150: C-----  00       BRK  
  0x042161 $8151: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x042162 $8152: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042163 $8153: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042164 $8154: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042165 $8155: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042166 $8156: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042167 $8157: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042168 $8158: C-----  00       BRK  
  0x042169 $8159: C-----  00       BRK  
  0x04216A $815A: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04216B $815B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04216C $815C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04216D $815D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04216E $815E: C-----  FE EE FF INC  $FFEE,X
  0x042171 $8161: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042172 $8162: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042173 $8163: C-----  7E 38 00 ROR  $0038,X
  0x042176 $8166: C-----  00       BRK  
  0x042177 $8167: C-----  00       BRK  
  0x042178 $8168: C-----  7E 72 56 ROR  $5672,X
  0x04217B $816B: C-----  28       PLP  
  0x04217C $816C: C-----  00       BRK  
  0x04217D $816D: C-----  00       BRK  
  0x04217E $816E: C-----  00       BRK  
  0x04217F $816F: C-----  00       BRK  
  0x042180 $8170: C-----  FE 0E 04 INC  $040E,X
  0x042183 $8173: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042184 $8174: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042185 $8175: C-----  01 00    ORA  ($00,X)
  0x042187 $8177: C-----  00       BRK  
  0x042188 $8178: C-----  0D 05 03 ORA  $0305
  0x04218B $817B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04218C $817C: C-----  01 00    ORA  ($00,X)
  0x04218E $817E: C-----  00       BRK  
  0x04218F $817F: C-----  00       BRK  
  0x042190 $8180: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042191 $8181: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042192 $8182: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042193 $8183: C-----  F8       SED  
  0x042194 $8184: C-----  F0 C0    BEQ  $8146
  0x042196 $8186: C-----  00       BRK  
  0x042197 $8187: C-----  00       BRK  
  0x042198 $8188: C-----  F8       SED  
  0x042199 $8189: C-----  F8       SED  
  0x04219A $818A: C-----  F8       SED  
  0x04219B $818B: C-----  F0 C0    BEQ  $814D
  0x04219D $818D: C-----  00       BRK  
  0x04219E $818E: C-----  00       BRK  
  0x04219F $818F: C-----  00       BRK  
  0x0421A0 $8190: C-----  01 81    ORA  ($81,X)
  0x0421A2 $8192: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x0421A3 $8193: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x0421A4 $8194: C-----  F6 FA    INC  $FA,X
  0x0421A6 $8196: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0421A7 $8197: C-----  F8       SED  
  0x0421A8 $8198: C-----  FE 7E 9C INC  $9C7E,X
  0x0421AB $819B: C-----  EC E8 F4 CPX  $F4E8
  0x0421AE $819E: C-----  F0 E0    BEQ  $8180
  0x0421B0 $81A0: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0421B1 $81A1: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0421B2 $81A2: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0421B3 $81A3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0421B4 $81A4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0421B5 $81A5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0421B6 $81A6: C-----  08       PHP  
  0x0421B7 $81A7: C-----  08       PHP  
  0x0421B8 $81A8: C-----  01 01    ORA  ($01,X)
  0x0421BA $81AA: C-----  01 03    ORA  ($03,X)
  0x0421BC $81AC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0421BD $81AD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0421BE $81AE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0421BF $81AF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0421C0 $81B0: C-----  01 01    ORA  ($01,X)
  0x0421C2 $81B2: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0421C3 $81B3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0421C4 $81B4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0421C5 $81B5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0421C6 $81B6: C-----  08       PHP  
  0x0421C7 $81B7: C-----  08       PHP  
  0x0421C8 $81B8: C-----  FE FE FC INC  $FCFE,X
  0x0421CB $81BB: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0421CC $81BC: C-----  F8       SED  
  0x0421CD $81BD: C-----  F8       SED  
  0x0421CE $81BE: C-----  F0 F0    BEQ  $81B0
  0x0421D0 $81C0: C-----  08       PHP  
  0x0421D1 $81C1: C-----  08       PHP  
  0x0421D2 $81C2: C-----  08       PHP  
  0x0421D3 $81C3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0421D4 $81C4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0421D5 $81C5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0421D6 $81C6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0421D7 $81C7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0421D8 $81C8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0421D9 $81C9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0421DA $81CA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0421DB $81CB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0421DC $81CC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0421DD $81CD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0421DE $81CE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0421DF $81CF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0421E0 $81D0: C-----  08       PHP  
  0x0421E1 $81D1: C-----  08       PHP  
  0x0421E2 $81D2: C-----  08       PHP  
  0x0421E3 $81D3: C-----  08       PHP  
  0x0421E4 $81D4: C-----  08       PHP  
  0x0421E5 $81D5: C-----  08       PHP  
  0x0421E6 $81D6: C-----  08       PHP  
  0x0421E7 $81D7: C-----  08       PHP  
  0x0421E8 $81D8: C-----  F0 F0    BEQ  $81CA
  0x0421EA $81DA: C-----  F0 F0    BEQ  $81CC
  0x0421EC $81DC: C-----  F0 F0    BEQ  $81CE
  0x0421EE $81DE: C-----  F0 F0    BEQ  $81D0
  0x0421F0 $81E0: C-----  09 00    ORA  #$00
  0x0421F2 $81E2: C-----  00       BRK  
  0x0421F3 $81E3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0421F4 $81E4: C-----  01 01    ORA  ($01,X)
  0x0421F6 $81E6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0421F7 $81E7: C-----  00       BRK  
  0x0421F8 $81E8: C-----  00       BRK  
  0x0421F9 $81E9: C-----  00       BRK  
  0x0421FA $81EA: C-----  00       BRK  
  0x0421FB $81EB: C-----  00       BRK  
  0x0421FC $81EC: C-----  00       BRK  
  0x0421FD $81ED: C-----  00       BRK  
  0x0421FE $81EE: C-----  00       BRK  
  0x0421FF $81EF: C-----  00       BRK  
  0x042200 $81F0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042201 $81F1: C-----  9D F4 9C STA  $9CF4,X
  0x042204 $81F4: C-----  !!UNDEF $92  ; unknown opcode, treating as data
  0x042205 $81F5: C-----  E0 FF    CPX  #$FF
  0x042207 $81F7: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x042208 $81F8: C-----  00       BRK  
  0x042209 $81F9: C-----  60       RTS  
  0x04220A $81FA: C-----  08       PHP  
  0x04220B $81FB: C-----  60       RTS  
  0x04220C $81FC: C-----  68       PLA  
  0x04220D $81FD: C-----  18       CLC  
  0x04220E $81FE: C-----  00       BRK  
  0x04220F $81FF: C-----  00       BRK  
  0x042210 $8200: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042211 $8201: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042212 $8202: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042213 $8203: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042214 $8204: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042215 $8205: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042216 $8206: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042217 $8207: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042218 $8208: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x042219 $8209: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04221A $820A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04221B $820B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04221C $820C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04221D $820D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04221E $820E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04221F $820F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042220 $8210: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042221 $8211: C-----  FE FE FC INC  $FCFE,X
  0x042224 $8214: C-----  F8       SED  
  0x042225 $8215: C-----  F8       SED  
  0x042226 $8216: C-----  F0 F0    BEQ  $8208
  0x042228 $8218: C-----  FE FC FC INC  $FCFC,X
  0x04222B $821B: C-----  F8       SED  
  0x04222C $821C: C-----  F0 F0    BEQ  $820E
  0x04222E $821E: C-----  E0 E0    CPX  #$E0
  0x042230 $8220: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x042231 $8221: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x042232 $8222: C-----  66 41    ROR  $41
  0x042234 $8224: C-----  C1 80    CMP  ($80,X)
  0x042236 $8226: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042237 $8227: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042238 $8228: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x042239 $8229: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04223A $822A: C-----  19 3E 3E ORA  $3E3E,Y
  0x04223D $822D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04223E $822E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04223F $822F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042240 $8230: C-----  F0 E0    BEQ  $8212
  0x042242 $8232: C-----  E0 40    CPX  #$40
  0x042244 $8234: C-----  40       RTI  
  0x042245 $8235: C-----  C0 40    CPY  #$40
  0x042247 $8237: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042248 $8238: C-----  E0 40    CPX  #$40
  0x04224A $823A: C-----  40       RTI  
  0x04224B $823B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04224C $823C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04224D $823D: C-----  00       BRK  
  0x04224E $823E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04224F $823F: C-----  00       BRK  
  0x042250 $8240: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042251 $8241: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042252 $8242: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042253 $8243: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042254 $8244: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042255 $8245: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042256 $8246: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042257 $8247: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042258 $8248: C-----  41 3F    EOR  ($3F,X)
  0x04225A $824A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04225B $824B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04225C $824C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04225D $824D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04225E $824E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04225F $824F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042260 $8250: C-----  E0 E0    CPX  #$E0
  0x042262 $8252: C-----  E0 F0    CPX  #$F0
  0x042264 $8254: C-----  F0 F0    BEQ  $8246
  0x042266 $8256: C-----  F0 F0    BEQ  $8248
  0x042268 $8258: C-----  C0 C0    CPY  #$C0
  0x04226A $825A: C-----  C0 C0    CPY  #$C0
  0x04226C $825C: C-----  E0 E0    CPX  #$E0
  0x04226E $825E: C-----  E0 E0    CPX  #$E0
  0x042270 $8260: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042271 $8261: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042272 $8262: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042273 $8263: C-----  05 02    ORA  $02
  0x042275 $8265: C-----  01 00    ORA  ($00,X)
  0x042277 $8267: C-----  00       BRK  
  0x042278 $8268: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042279 $8269: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04227A $826A: C-----  01 02    ORA  ($02,X)
  0x04227C $826C: C-----  01 00    ORA  ($00,X)
  0x04227E $826E: C-----  00       BRK  
  0x04227F $826F: C-----  00       BRK  
  0x042280 $8270: C-----  F8       SED  
  0x042281 $8271: C-----  E8       INX  
  0x042282 $8272: C-----  EC D4 14 CPX  $14D4
  0x042285 $8275: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042286 $8276: C-----  88       DEY  
  0x042287 $8277: C-----  58       CLI  
  0x042288 $8278: C-----  C0 D0    CPY  #$D0
  0x04228A $827A: C-----  90 20    BCC  $829C
  0x04228C $827C: C-----  E0 00    CPX  #$00
  0x04228E $827E: C-----  00       BRK  
  0x04228F $827F: C-----  00       BRK  
  0x042290 $8280: C-----  50 A0    BVC  $8222
  0x042292 $8282: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042293 $8283: C-----  40       RTI  
  0x042294 $8284: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042295 $8285: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042296 $8286: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042297 $8287: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x042298 $8288: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042299 $8289: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04229A $828A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04229B $828B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04229C $828C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04229D $828D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04229E $828E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04229F $828F: C-----  3D 04 03 AND  $0304,X
  0x0422A2 $8292: C-----  00       BRK  
  0x0422A3 $8293: C-----  00       BRK  
  0x0422A4 $8294: C-----  00       BRK  
  0x0422A5 $8295: C-----  00       BRK  
  0x0422A6 $8296: C-----  00       BRK  
  0x0422A7 $8297: C-----  10 F8    BPL  $8291
  0x0422A9 $8299: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0422AA $829A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0422AB $829B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0422AC $829C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0422AD $829D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0422AE $829E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0422AF $829F: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0422B0 $82A0: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x0422B1 $82A1: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0422B2 $82A2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0422B3 $82A3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0422B4 $82A4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0422B5 $82A5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0422B6 $82A6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0422B7 $82A7: C-----  01 2A    ORA  ($2A,X)
  0x0422B9 $82A9: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0422BA $82AA: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x0422BB $82AB: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0422BC $82AC: C-----  09 07    ORA  #$07
  0x0422BE $82AE: C-----  00       BRK  
  0x0422BF $82AF: C-----  00       BRK  
  0x0422C0 $82B0: C-----  F9 F9 F6 SBC  $F6F9,Y
  0x0422C3 $82B3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0422C4 $82B4: C-----  F0 F0    BEQ  $82A6
  0x0422C6 $82B6: C-----  E0 C0    CPX  #$C0
  0x0422C8 $82B8: C-----  16 56    ASL  $56,X
  0x0422CA $82BA: C-----  68       PLA  
  0x0422CB $82BB: C-----  C0 E0    CPY  #$E0
  0x0422CD $82BD: C-----  40       RTI  
  0x0422CE $82BE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0422CF $82BF: C-----  00       BRK  
  0x0422D0 $82C0: C-----  00       BRK  
  0x0422D1 $82C1: C-----  00       BRK  
  0x0422D2 $82C2: C-----  00       BRK  
  0x0422D3 $82C3: C-----  00       BRK  
  0x0422D4 $82C4: C-----  00       BRK  
  0x0422D5 $82C5: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0422D6 $82C6: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x0422D7 $82C7: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x0422D8 $82C8: C-----  00       BRK  
  0x0422D9 $82C9: C-----  00       BRK  
  0x0422DA $82CA: C-----  00       BRK  
  0x0422DB $82CB: C-----  00       BRK  
  0x0422DC $82CC: C-----  00       BRK  
  0x0422DD $82CD: C-----  00       BRK  
  0x0422DE $82CE: C-----  00       BRK  
  0x0422DF $82CF: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0422E0 $82D0: C-----  00       BRK  
  0x0422E1 $82D1: C-----  00       BRK  
  0x0422E2 $82D2: C-----  00       BRK  
  0x0422E3 $82D3: C-----  00       BRK  
  0x0422E4 $82D4: C-----  00       BRK  
  0x0422E5 $82D5: C-----  F0 40    BEQ  $8317
  0x0422E7 $82D7: C-----  3E 00 00 ROL  $0000,X
  0x0422EA $82DA: C-----  00       BRK  
  0x0422EB $82DB: C-----  00       BRK  
  0x0422EC $82DC: C-----  00       BRK  
  0x0422ED $82DD: C-----  00       BRK  
  0x0422EE $82DE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0422EF $82DF: C-----  C0 00    CPY  #$00
  0x0422F1 $82E1: C-----  20 E0 40 JSR  $40E0
  0x0422F4 $82E4: C-----  60       RTS  
  0x0422F5 $82E5: C-----  C0 80    CPY  #$80
  0x0422F7 $82E7: C-----  C0 00    CPY  #$00
  0x0422F9 $82E9: C-----  00       BRK  
  0x0422FA $82EA: C-----  00       BRK  
  0x0422FB $82EB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0422FC $82EC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0422FD $82ED: C-----  00       BRK  
  0x0422FE $82EE: C-----  00       BRK  
  0x0422FF $82EF: C-----  00       BRK  
  0x042300 $82F0: C-----  00       BRK  
  0x042301 $82F1: C-----  00       BRK  
  0x042302 $82F2: C-----  00       BRK  
  0x042303 $82F3: C-----  00       BRK  
  0x042304 $82F4: C-----  00       BRK  
  0x042305 $82F5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x042306 $82F6: C-----  0E 19 00 ASL  $0019
  0x042309 $82F9: C-----  00       BRK  
  0x04230A $82FA: C-----  00       BRK  
  0x04230B $82FB: C-----  00       BRK  
  0x04230C $82FC: C-----  00       BRK  
  0x04230D $82FD: C-----  00       BRK  
  0x04230E $82FE: C-----  00       BRK  
  0x04230F $82FF: C-----  06 08    ASL  $08
  0x042311 $8301: C-----  08       PHP  
  0x042312 $8302: C-----  10 10    BPL  $8314
  0x042314 $8304: C-----  10 A0    BPL  $82A6
  0x042316 $8306: C-----  E0 F9    CPX  #$F9
  0x042318 $8308: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042319 $8309: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04231A $830A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04231B $830B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04231C $830C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04231D $830D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04231E $830E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04231F $830F: C-----  06 10    ASL  $10
  0x042321 $8311: C-----  20 20 40 JSR  $4020
  0x042324 $8314: C-----  40       RTI  
  0x042325 $8315: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042326 $8316: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042327 $8317: C-----  00       BRK  
  0x042328 $8318: C-----  E0 C0    CPX  #$C0
  0x04232A $831A: C-----  C0 80    CPY  #$80
  0x04232C $831C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04232D $831D: C-----  00       BRK  
  0x04232E $831E: C-----  00       BRK  
  0x04232F $831F: C-----  00       BRK  
  0x042330 $8320: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x042331 $8321: C-----  36 F2    ROL  $F2,X
  0x042333 $8323: C-----  4A       LSR  A
  0x042334 $8324: C-----  A4 FC    LDY  $FC
  0x042336 $8326: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042337 $8327: C-----  78       SEI  
  0x042338 $8328: C-----  A0 C8    LDY  #$C8
  0x04233A $832A: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04233B $832B: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x04233C $832C: C-----  18       CLC  
  0x04233D $832D: C-----  00       BRK  
  0x04233E $832E: C-----  00       BRK  
  0x04233F $832F: C-----  00       BRK  
  0x042340 $8330: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x042341 $8331: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042342 $8332: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042343 $8333: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042344 $8334: C-----  11 04    ORA  ($04),Y
  0x042346 $8336: C-----  00       BRK  
  0x042347 $8337: C-----  20 00 00 JSR  $0000
  0x04234A $833A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04234B $833B: C-----  01 00    ORA  ($00,X)
  0x04234D $833D: C-----  00       BRK  
  0x04234E $833E: C-----  00       BRK  
  0x04234F $833F: C-----  00       BRK  
  0x042350 $8340: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042351 $8341: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042352 $8342: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042353 $8343: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042354 $8344: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042355 $8345: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042356 $8346: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x042357 $8347: C-----  08       PHP  
  0x042358 $8348: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042359 $8349: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04235A $834A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04235B $834B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04235C $834C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04235D $834D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04235E $834E: C-----  08       PHP  
  0x04235F $834F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042360 $8350: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042361 $8351: C-----  F8       SED  
  0x042362 $8352: C-----  F8       SED  
  0x042363 $8353: C-----  F8       SED  
  0x042364 $8354: C-----  E8       INX  
  0x042365 $8355: C-----  EC A4 44 CPX  $44A4
  0x042368 $8358: C-----  F8       SED  
  0x042369 $8359: C-----  F0 E0    BEQ  $833B
  0x04236B $835B: C-----  E0 D0    CPX  #$D0
  0x04236D $835D: C-----  90 58    BCC  $83B7
  0x04236F $835F: C-----  B8       CLV  
  0x042370 $8360: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042371 $8361: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042372 $8362: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x042373 $8363: C-----  00       BRK  
  0x042374 $8364: C-----  00       BRK  
  0x042375 $8365: C-----  00       BRK  
  0x042376 $8366: C-----  00       BRK  
  0x042377 $8367: C-----  00       BRK  
  0x042378 $8368: C-----  00       BRK  
  0x042379 $8369: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04237A $836A: C-----  00       BRK  
  0x04237B $836B: C-----  00       BRK  
  0x04237C $836C: C-----  00       BRK  
  0x04237D $836D: C-----  00       BRK  
  0x04237E $836E: C-----  00       BRK  
  0x04237F $836F: C-----  00       BRK  
  0x042380 $8370: C-----  86 0A    STX  $0A
  0x042382 $8372: C-----  0A       ASL  A
  0x042383 $8373: C-----  FE 44 2C INC  $2C44,X
  0x042386 $8376: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x042387 $8377: C-----  18       CLC  
  0x042388 $8378: C-----  78       SEI  
  0x042389 $8379: C-----  F0 F0    BEQ  $836B
  0x04238B $837B: C-----  00       BRK  
  0x04238C $837C: C-----  00       BRK  
  0x04238D $837D: C-----  00       BRK  
  0x04238E $837E: C-----  00       BRK  
  0x04238F $837F: C-----  00       BRK  
  0x042390 $8380: C-----  10 10    BPL  $8392
  0x042392 $8382: C-----  E0 40    CPX  #$40
  0x042394 $8384: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042395 $8385: C-----  88       DEY  
  0x042396 $8386: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x042397 $8387: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x042398 $8388: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042399 $8389: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04239A $838A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04239B $838B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04239C $838C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04239D $838D: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04239E $838E: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x04239F $838F: C-----  58       CLI  
  0x0423A0 $8390: C-----  00       BRK  
  0x0423A1 $8391: C-----  00       BRK  
  0x0423A2 $8392: C-----  00       BRK  
  0x0423A3 $8393: C-----  00       BRK  
  0x0423A4 $8394: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x0423A5 $8395: C-----  69 96    ADC  #$96
  0x0423A7 $8397: C-----  08       PHP  
  0x0423A8 $8398: C-----  00       BRK  
  0x0423A9 $8399: C-----  00       BRK  
  0x0423AA $839A: C-----  00       BRK  
  0x0423AB $839B: C-----  00       BRK  
  0x0423AC $839C: C-----  00       BRK  
  0x0423AD $839D: C-----  10 61    BPL  $8400
  0x0423AF $839F: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0423B0 $83A0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0423B1 $83A1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0423B2 $83A2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0423B3 $83A3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0423B4 $83A4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0423B5 $83A5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0423B6 $83A6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0423B7 $83A7: C-----  01 0E    ORA  ($0E,X)
  0x0423B9 $83A9: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0423BA $83AA: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x0423BB $83AB: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0423BC $83AC: C-----  09 07    ORA  #$07
  0x0423BE $83AE: C-----  00       BRK  
  0x0423BF $83AF: C-----  00       BRK  
  0x0423C0 $83B0: C-----  01 00    ORA  ($00,X)
  0x0423C2 $83B2: C-----  00       BRK  
  0x0423C3 $83B3: C-----  00       BRK  
  0x0423C4 $83B4: C-----  00       BRK  
  0x0423C5 $83B5: C-----  00       BRK  
  0x0423C6 $83B6: C-----  00       BRK  
  0x0423C7 $83B7: C-----  D0 FE    BNE  $83B7
  0x0423C9 $83B9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0423CA $83BA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0423CB $83BB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0423CC $83BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0423CD $83BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0423CE $83BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0423CF $83BF: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0423D0 $83C0: C-----  00       BRK  
  0x0423D1 $83C1: C-----  00       BRK  
  0x0423D2 $83C2: C-----  20 20 60 JSR  $6020
  0x0423D5 $83C5: C-----  C0 50    CPY  #$50
  0x0423D7 $83C7: C-----  B0 00    BCS  $83C9
  0x0423D9 $83C9: C-----  00       BRK  
  0x0423DA $83CA: C-----  00       BRK  
  0x0423DB $83CB: C-----  00       BRK  
  0x0423DC $83CC: C-----  00       BRK  
  0x0423DD $83CD: C-----  00       BRK  
  0x0423DE $83CE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0423DF $83CF: C-----  00       BRK  
  0x0423E0 $83D0: C-----  00       BRK  
  0x0423E1 $83D1: C-----  40       RTI  
  0x0423E2 $83D2: C-----  C0 80    CPY  #$80
  0x0423E4 $83D4: C-----  40       RTI  
  0x0423E5 $83D5: C-----  C0 40    CPY  #$40
  0x0423E7 $83D7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0423E8 $83D8: C-----  00       BRK  
  0x0423E9 $83D9: C-----  00       BRK  
  0x0423EA $83DA: C-----  00       BRK  
  0x0423EB $83DB: C-----  00       BRK  
  0x0423EC $83DC: C-----  00       BRK  
  0x0423ED $83DD: C-----  00       BRK  
  0x0423EE $83DE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0423EF $83DF: C-----  00       BRK  
  0x0423F0 $83E0: C-----  60       RTS  
  0x0423F1 $83E1: C-----  A0 20    LDY  #$20
  0x0423F3 $83E3: C-----  40       RTI  
  0x0423F4 $83E4: C-----  A0 60    LDY  #$60
  0x0423F6 $83E6: C-----  C0 80    CPY  #$80
  0x0423F8 $83E8: C-----  00       BRK  
  0x0423F9 $83E9: C-----  40       RTI  
  0x0423FA $83EA: C-----  C0 80    CPY  #$80
  0x0423FC $83EC: C-----  00       BRK  
  0x0423FD $83ED: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0423FE $83EE: C-----  00       BRK  
  0x0423FF $83EF: C-----  00       BRK  
  0x042400 $83F0: C-----  10 20    BPL  $8412
  0x042402 $83F2: C-----  C0 40    CPY  #$40
  0x042404 $83F4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042405 $83F5: C-----  88       DEY  
  0x042406 $83F6: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x042407 $83F7: C-----  BE 0F 1F LDX  $1F0F,Y
  0x04240A $83FA: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04240B $83FB: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04240C $83FC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04240D $83FD: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04240E $83FE: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x04240F $83FF: C-----  5D 00 00 EOR  $0000,X
  0x042412 $8402: C-----  00       BRK  
  0x042413 $8403: C-----  C0 F0    CPY  #$F0
  0x042415 $8405: C-----  8C 73 0C STY  $0C73
  0x042418 $8408: C-----  00       BRK  
  0x042419 $8409: C-----  00       BRK  
  0x04241A $840A: C-----  00       BRK  
  0x04241B $840B: C-----  00       BRK  
  0x04241C $840C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04241D $840D: C-----  70 8C    BVS  $839B
  0x04241F $840F: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x042420 $8410: C-----  00       BRK  
  0x042421 $8411: C-----  00       BRK  
  0x042422 $8412: C-----  00       BRK  
  0x042423 $8413: C-----  00       BRK  
  0x042424 $8414: C-----  00       BRK  
  0x042425 $8415: C-----  00       BRK  
  0x042426 $8416: C-----  00       BRK  
  0x042427 $8417: C-----  00       BRK  
  0x042428 $8418: C-----  00       BRK  
  0x042429 $8419: C-----  00       BRK  
  0x04242A $841A: C-----  00       BRK  
  0x04242B $841B: C-----  00       BRK  
  0x04242C $841C: C-----  00       BRK  
  0x04242D $841D: C-----  FE FE FE INC  $FEFE,X
  0x042430 $8420: C-----  00       BRK  
  0x042431 $8421: C-----  00       BRK  
  0x042432 $8422: C-----  00       BRK  
  0x042433 $8423: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042434 $8424: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042435 $8425: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042436 $8426: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042437 $8427: C-----  40       RTI  
  0x042438 $8428: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042439 $8429: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04243A $842A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04243B $842B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04243C $842C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04243D $842D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04243E $842E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04243F $842F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042440 $8430: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042441 $8431: C-----  00       BRK  
  0x042442 $8432: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042443 $8433: C-----  00       BRK  
  0x042444 $8434: C-----  00       BRK  
  0x042445 $8435: C-----  00       BRK  
  0x042446 $8436: C-----  00       BRK  
  0x042447 $8437: C-----  00       BRK  
  0x042448 $8438: C-----  F8       SED  
  0x042449 $8439: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04244A $843A: C-----  F8       SED  
  0x04244B $843B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04244C $843C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04244D $843D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04244E $843E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04244F $843F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042450 $8440: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x042451 $8441: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042452 $8442: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042453 $8443: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042454 $8444: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x042455 $8445: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x042456 $8446: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042457 $8447: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042458 $8448: C-----  B4 FB    LDY  $FB,X
  0x04245A $844A: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04245B $844B: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04245C $844C: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04245D $844D: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04245E $844E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04245F $844F: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x042460 $8450: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x042461 $8451: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x042462 $8452: C-----  F5 FA    SBC  $FA,X
  0x042464 $8454: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x042465 $8455: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042466 $8456: C-----  F8       SED  
  0x042467 $8457: C-----  F0 3C    BEQ  $8495
  0x042469 $8459: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04246A $845A: C-----  EA       NOP  
  0x04246B $845B: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04246C $845C: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04246D $845D: C-----  F0 F0    BEQ  $844F
  0x04246F $845F: C-----  E0 00    CPX  #$00
  0x042471 $8461: C-----  E0 18    CPX  #$18
  0x042473 $8463: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x042474 $8464: C-----  1D 03 23 ORA  $2303,X
  0x042477 $8467: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x042478 $8468: C-----  00       BRK  
  0x042479 $8469: C-----  00       BRK  
  0x04247A $846A: C-----  E0 18    CPX  #$18
  0x04247C $846C: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x04247D $846D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04247E $846E: C-----  DD DD 00 CMP  $00DD,X
  0x042481 $8471: C-----  00       BRK  
  0x042482 $8472: C-----  00       BRK  
  0x042483 $8473: C-----  18       CLC  
  0x042484 $8474: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x042485 $8475: C-----  FE FF FF INC  $FFFF,X
  0x042488 $8478: C-----  00       BRK  
  0x042489 $8479: C-----  00       BRK  
  0x04248A $847A: C-----  00       BRK  
  0x04248B $847B: C-----  00       BRK  
  0x04248C $847C: C-----  18       CLC  
  0x04248D $847D: C-----  2C 96 4A BIT  $4A96
  0x042490 $8480: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x042491 $8481: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x042492 $8482: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x042493 $8483: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x042494 $8484: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x042495 $8485: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x042496 $8486: C-----  46 46    LSR  $46
  0x042498 $8488: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x042499 $8489: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04249A $848A: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04249B $848B: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04249C $848C: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04249D $848D: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04249E $848E: C-----  38       SEC  
  0x04249F $848F: C-----  38       SEC  
  0x0424A0 $8490: C-----  00       BRK  
  0x0424A1 $8491: C-----  00       BRK  
  0x0424A2 $8492: C-----  00       BRK  
  0x0424A3 $8493: C-----  00       BRK  
  0x0424A4 $8494: C-----  00       BRK  
  0x0424A5 $8495: C-----  00       BRK  
  0x0424A6 $8496: C-----  01 EF    ORA  ($EF,X)
  0x0424A8 $8498: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0424A9 $8499: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0424AA $849A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0424AB $849B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0424AC $849C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0424AD $849D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0424AE $849E: C-----  FE 10 05 INC  $0510,X
  0x0424B1 $84A1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0424B2 $84A2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0424B3 $84A3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0424B4 $84A4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0424B5 $84A5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0424B6 $84A6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0424B7 $84A7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0424B8 $84A8: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0424B9 $84A9: C-----  01 03    ORA  ($03,X)
  0x0424BB $84AB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0424BC $84AC: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0424BD $84AD: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0424BE $84AE: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0424BF $84AF: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0424C0 $84B0: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0424C1 $84B1: C-----  F0 F8    BEQ  $84AB
  0x0424C3 $84B3: C-----  F8       SED  
  0x0424C4 $84B4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0424C5 $84B5: C-----  FE FC FE INC  $FEFC,X
  0x0424C8 $84B8: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0424C9 $84B9: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x0424CA $84BA: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0424CB $84BB: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0424CC $84BC: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0424CD $84BD: C-----  F9 F3 F1 SBC  $F1F3,Y
  0x0424D0 $84C0: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x0424D1 $84C1: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x0424D2 $84C2: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x0424D3 $84C3: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x0424D4 $84C4: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x0424D5 $84C5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0424D6 $84C6: C-----  00       BRK  
  0x0424D7 $84C7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0424D8 $84C8: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x0424D9 $84C9: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x0424DA $84CA: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x0424DB $84CB: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x0424DC $84CC: C-----  38       SEC  
  0x0424DD $84CD: C-----  00       BRK  
  0x0424DE $84CE: C-----  00       BRK  
  0x0424DF $84CF: C-----  00       BRK  
  0x0424E0 $84D0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0424E1 $84D1: C-----  FE FE FE INC  $FEFE,X
  0x0424E4 $84D4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0424E5 $84D5: C-----  F8       SED  
  0x0424E6 $84D6: C-----  00       BRK  
  0x0424E7 $84D7: C-----  00       BRK  
  0x0424E8 $84D8: C-----  56 0C    LSR  $0C,X
  0x0424EA $84DA: C-----  60       RTS  
  0x0424EB $84DB: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0424EC $84DC: C-----  F8       SED  
  0x0424ED $84DD: C-----  00       BRK  
  0x0424EE $84DE: C-----  00       BRK  
  0x0424EF $84DF: C-----  00       BRK  
  0x0424F0 $84E0: C-----  4A       LSR  A
  0x0424F1 $84E1: C-----  0A       ASL  A
  0x0424F2 $84E2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0424F3 $84E3: C-----  05 05    ORA  $05
  0x0424F5 $84E5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0424F6 $84E6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0424F7 $84E7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0424F8 $84E8: C-----  B4 F4    LDY  $F4,X
  0x0424FA $84EA: C-----  F8       SED  
  0x0424FB $84EB: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x0424FC $84EC: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x0424FD $84ED: C-----  F8       SED  
  0x0424FE $84EE: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0424FF $84EF: C-----  F0 00    BEQ  $84F1
  0x042501 $84F1: C-----  E0 18    CPX  #$18
  0x042503 $84F3: C-----  E4 5F    CPX  $5F
  0x042505 $84F5: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x042506 $84F6: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x042507 $84F7: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042508 $84F8: C-----  00       BRK  
  0x042509 $84F9: C-----  00       BRK  
  0x04250A $84FA: C-----  E0 18    CPX  #$18
  0x04250C $84FC: C-----  A0 4E    LDY  #$4E
  0x04250E $84FE: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04250F $84FF: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x042510 $8500: C-----  C0 F0    CPY  #$F0
  0x042512 $8502: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042513 $8503: C-----  FE FF FF INC  $FFFF,X
  0x042516 $8506: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042517 $8507: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042518 $8508: C-----  00       BRK  
  0x042519 $8509: C-----  C0 F0    CPY  #$F0
  0x04251B $850B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04251C $850C: C-----  FE FF 7F INC  $7FFF,X
  0x04251F $850F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042520 $8510: C-----  00       BRK  
  0x042521 $8511: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042522 $8512: C-----  C0 E0    CPY  #$E0
  0x042524 $8514: C-----  F0 F8    BEQ  $850E
  0x042526 $8516: C-----  E4 DA    CPX  $DA
  0x042528 $8518: C-----  00       BRK  
  0x042529 $8519: C-----  00       BRK  
  0x04252A $851A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04252B $851B: C-----  C0 E0    CPY  #$E0
  0x04252D $851D: C-----  E0 D8    CPX  #$D8
  0x04252F $851F: C-----  A4 3F    LDY  $3F
  0x042531 $8521: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042532 $8522: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042533 $8523: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042534 $8524: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x042535 $8525: C-----  01 01    ORA  ($01,X)
  0x042537 $8527: C-----  01 1F    ORA  ($1F,X)
  0x042539 $8529: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04253A $852A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04253B $852B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04253C $852C: C-----  01 00    ORA  ($00,X)
  0x04253E $852E: C-----  00       BRK  
  0x04253F $852F: C-----  00       BRK  
  0x042540 $8530: C-----  A0 A0    LDY  #$A0
  0x042542 $8532: C-----  40       RTI  
  0x042543 $8533: C-----  40       RTI  
  0x042544 $8534: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042545 $8535: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042546 $8536: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042547 $8537: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042548 $8538: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x042549 $8539: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04254A $853A: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04254B $853B: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04254C $853C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04254D $853D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04254E $853E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04254F $853F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042550 $8540: C-----  01 01    ORA  ($01,X)
  0x042552 $8542: C-----  01 00    ORA  ($00,X)
  0x042554 $8544: C-----  00       BRK  
  0x042555 $8545: C-----  00       BRK  
  0x042556 $8546: C-----  01 2F    ORA  ($2F,X)
  0x042558 $8548: C-----  FE FE FE INC  $FEFE,X
  0x04255B $854B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04255C $854C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04255D $854D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04255E $854E: C-----  FE D0 7F INC  $7FD0,X
  0x042561 $8551: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042562 $8552: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042563 $8553: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x042564 $8554: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042565 $8555: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042566 $8556: C-----  00       BRK  
  0x042567 $8557: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042568 $8558: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x042569 $8559: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04256A $855A: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04256B $855B: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04256C $855C: C-----  00       BRK  
  0x04256D $855D: C-----  00       BRK  
  0x04256E $855E: C-----  00       BRK  
  0x04256F $855F: C-----  00       BRK  
  0x042570 $8560: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x042571 $8561: C-----  00       BRK  
  0x042572 $8562: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042573 $8563: C-----  01 01    ORA  ($01,X)
  0x042575 $8565: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042576 $8566: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042577 $8567: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042578 $8568: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042579 $8569: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04257A $856A: C-----  F8       SED  
  0x04257B $856B: C-----  FE FE FD INC  $FDFE,X
  0x04257E $856E: C-----  FD FD 80 SBC  $80FD,X
  0x042581 $8571: C-----  E0 98    CPX  #$98
  0x042583 $8573: C-----  7E 7F FF ROR  $FF7F,X
  0x042586 $8576: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042587 $8577: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042588 $8578: C-----  00       BRK  
  0x042589 $8579: C-----  00       BRK  
  0x04258A $857A: C-----  60       RTS  
  0x04258B $857B: C-----  98       TYA  
  0x04258C $857C: C-----  BE 7F 7F LDX  $7F7F,Y
  0x04258F $857F: C-----  7E 00 3C ROR  $3C00,X
  0x042592 $8582: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042593 $8583: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042594 $8584: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042595 $8585: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042596 $8586: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042597 $8587: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042598 $8588: C-----  00       BRK  
  0x042599 $8589: C-----  00       BRK  
  0x04259A $858A: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04259B $858B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04259C $858C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04259D $858D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04259E $858E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04259F $858F: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0425A0 $8590: C-----  00       BRK  
  0x0425A1 $8591: C-----  00       BRK  
  0x0425A2 $8592: C-----  00       BRK  
  0x0425A3 $8593: C-----  C0 F8    CPY  #$F8
  0x0425A5 $8595: C-----  E4 DF    CPX  $DF
  0x0425A7 $8597: C-----  B0 00    BCS  $8599
  0x0425A9 $8599: C-----  00       BRK  
  0x0425AA $859A: C-----  00       BRK  
  0x0425AB $859B: C-----  00       BRK  
  0x0425AC $859C: C-----  C0 D8    CPY  #$D8
  0x0425AE $859E: C-----  A0 4F    LDY  #$4F
  0x0425B0 $85A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0425B1 $85A1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0425B2 $85A2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0425B3 $85A3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0425B4 $85A4: C-----  01 00    ORA  ($00,X)
  0x0425B6 $85A6: C-----  00       BRK  
  0x0425B7 $85A7: C-----  00       BRK  
  0x0425B8 $85A8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0425B9 $85A9: C-----  06 02    ASL  $02
  0x0425BB $85AB: C-----  00       BRK  
  0x0425BC $85AC: C-----  00       BRK  
  0x0425BD $85AD: C-----  00       BRK  
  0x0425BE $85AE: C-----  00       BRK  
  0x0425BF $85AF: C-----  00       BRK  
  0x0425C0 $85B0: C-----  A0 40    LDY  #$40
  0x0425C2 $85B2: C-----  40       RTI  
  0x0425C3 $85B3: C-----  40       RTI  
  0x0425C4 $85B4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0425C5 $85B5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0425C6 $85B6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0425C7 $85B7: C-----  40       RTI  
  0x0425C8 $85B8: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0425C9 $85B9: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0425CA $85BA: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0425CB $85BB: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0425CC $85BC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0425CD $85BD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0425CE $85BE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0425CF $85BF: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0425D0 $85C0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0425D1 $85C1: C-----  0D 12 37 ORA  $3712
  0x0425D4 $85C4: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0425D5 $85C5: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x0425D6 $85C6: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x0425D7 $85C7: C-----  49 00    EOR  #$00
  0x0425D9 $85C9: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0425DA $85CA: C-----  0D 08 10 ORA  $1008
  0x0425DD $85CD: C-----  38       SEC  
  0x0425DE $85CE: C-----  38       SEC  
  0x0425DF $85CF: C-----  36 C0    ROL  $C0,X
  0x0425E1 $85D1: C-----  30 C8    BMI  $859B
  0x0425E3 $85D3: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x0425E4 $85D4: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x0425E5 $85D5: C-----  8E 0E 0E STX  $0E0E
  0x0425E8 $85D8: C-----  00       BRK  
  0x0425E9 $85D9: C-----  C0 30    CPY  #$30
  0x0425EB $85DB: C-----  98       TYA  
  0x0425EC $85DC: C-----  60       RTS  
  0x0425ED $85DD: C-----  70 F0    BVS  $85CF
  0x0425EF $85DF: C-----  F0 70    BEQ  $8651
  0x0425F1 $85E1: C-----  70 71    BVS  $8654
  0x0425F3 $85E3: C-----  39 26 13 AND  $1326,Y
  0x0425F6 $85E6: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0425F7 $85E7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0425F8 $85E8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0425F9 $85E9: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0425FA $85EA: C-----  0E 06 19 ASL  $1906
  0x0425FD $85ED: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0425FE $85EE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0425FF $85EF: C-----  00       BRK  
  0x042600 $85F0: C-----  !!UNDEF $92  ; unknown opcode, treating as data
  0x042601 $85F1: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x042602 $85F2: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x042603 $85F3: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x042604 $85F4: C-----  EC 48 B0 CPX  $B048
  0x042607 $85F7: C-----  C0 6C    CPY  #$6C
  0x042609 $85F9: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04260A $85FA: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04260B $85FB: C-----  08       PHP  
  0x04260C $85FC: C-----  10 B0    BPL  $85AE
  0x04260E $85FE: C-----  40       RTI  
  0x04260F $85FF: C-----  00       BRK  
  0x042610 $8600: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042611 $8601: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042612 $8602: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042613 $8603: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042614 $8604: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042615 $8605: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042616 $8606: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042617 $8607: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042618 $8608: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x042619 $8609: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04261A $860A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04261B $860B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04261C $860C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04261D $860D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04261E $860E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04261F $860F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042620 $8610: C-----  C0 C0    CPY  #$C0
  0x042622 $8612: C-----  C0 C0    CPY  #$C0
  0x042624 $8614: C-----  E0 E0    CPX  #$E0
  0x042626 $8616: C-----  E0 E0    CPX  #$E0
  0x042628 $8618: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042629 $8619: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04262A $861A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04262B $861B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04262C $861C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04262D $861D: C-----  C0 C0    CPY  #$C0
  0x04262F $861F: C-----  C0 3F    CPY  #$3F
  0x042631 $8621: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042632 $8622: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042633 $8623: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042634 $8624: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042635 $8625: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042636 $8626: C-----  18       CLC  
  0x042637 $8627: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042638 $8628: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042639 $8629: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04263A $862A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04263B $862B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04263C $862C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04263D $862D: C-----  00       BRK  
  0x04263E $862E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04263F $862F: C-----  00       BRK  
  0x042640 $8630: C-----  E0 E0    CPX  #$E0
  0x042642 $8632: C-----  F0 F0    BEQ  $8624
  0x042644 $8634: C-----  D0 B0    BNE  $85E6
  0x042646 $8636: C-----  50 98    BVC  $85D0
  0x042648 $8638: C-----  C0 C0    CPY  #$C0
  0x04264A $863A: C-----  C0 C0    CPY  #$C0
  0x04264C $863C: C-----  A0 40    LDY  #$40
  0x04264E $863E: C-----  A0 60    LDY  #$60
  0x042650 $8640: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042651 $8641: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042652 $8642: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042653 $8643: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042654 $8644: C-----  0E 3A C1 ASL  $C13A
  0x042657 $8647: C-----  01 FC    ORA  ($FC,X)
  0x042659 $8649: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04265A $864A: C-----  F8       SED  
  0x04265B $864B: C-----  F8       SED  
  0x04265C $864C: C-----  F0 C0    BEQ  $860E
  0x04265E $864E: C-----  00       BRK  
  0x04265F $864F: C-----  00       BRK  
  0x042660 $8650: C-----  00       BRK  
  0x042661 $8651: C-----  00       BRK  
  0x042662 $8652: C-----  00       BRK  
  0x042663 $8653: C-----  00       BRK  
  0x042664 $8654: C-----  00       BRK  
  0x042665 $8655: C-----  00       BRK  
  0x042666 $8656: C-----  00       BRK  
  0x042667 $8657: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042668 $8658: C-----  00       BRK  
  0x042669 $8659: C-----  00       BRK  
  0x04266A $865A: C-----  00       BRK  
  0x04266B $865B: C-----  00       BRK  
  0x04266C $865C: C-----  00       BRK  
  0x04266D $865D: C-----  00       BRK  
  0x04266E $865E: C-----  00       BRK  
  0x04266F $865F: C-----  00       BRK  
  0x042670 $8660: C-----  00       BRK  
  0x042671 $8661: C-----  00       BRK  
  0x042672 $8662: C-----  00       BRK  
  0x042673 $8663: C-----  00       BRK  
  0x042674 $8664: C-----  00       BRK  
  0x042675 $8665: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x042676 $8666: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042677 $8667: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x042678 $8668: C-----  00       BRK  
  0x042679 $8669: C-----  00       BRK  
  0x04267A $866A: C-----  00       BRK  
  0x04267B $866B: C-----  00       BRK  
  0x04267C $866C: C-----  00       BRK  
  0x04267D $866D: C-----  00       BRK  
  0x04267E $866E: C-----  00       BRK  
  0x04267F $866F: C-----  00       BRK  
  0x042680 $8670: C-----  00       BRK  
  0x042681 $8671: C-----  00       BRK  
  0x042682 $8672: C-----  00       BRK  
  0x042683 $8673: C-----  00       BRK  
  0x042684 $8674: C-----  00       BRK  
  0x042685 $8675: C-----  00       BRK  
  0x042686 $8676: C-----  00       BRK  
  0x042687 $8677: C-----  E0 00    CPX  #$00
  0x042689 $8679: C-----  00       BRK  
  0x04268A $867A: C-----  00       BRK  
  0x04268B $867B: C-----  00       BRK  
  0x04268C $867C: C-----  00       BRK  
  0x04268D $867D: C-----  00       BRK  
  0x04268E $867E: C-----  00       BRK  
  0x04268F $867F: C-----  00       BRK  
  0x042690 $8680: C-----  00       BRK  
  0x042691 $8681: C-----  00       BRK  
  0x042692 $8682: C-----  00       BRK  
  0x042693 $8683: C-----  00       BRK  
  0x042694 $8684: C-----  00       BRK  
  0x042695 $8685: C-----  00       BRK  
  0x042696 $8686: C-----  E0 18    CPX  #$18
  0x042698 $8688: C-----  00       BRK  
  0x042699 $8689: C-----  00       BRK  
  0x04269A $868A: C-----  00       BRK  
  0x04269B $868B: C-----  00       BRK  
  0x04269C $868C: C-----  00       BRK  
  0x04269D $868D: C-----  00       BRK  
  0x04269E $868E: C-----  00       BRK  
  0x04269F $868F: C-----  E0 20    CPX  #$20
  0x0426A1 $8691: C-----  50 A0    BVC  $8633
  0x0426A3 $8693: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0426A4 $8694: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0426A5 $8695: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0426A6 $8696: C-----  8E 9F 1F STX  $1F9F
  0x0426A9 $8699: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0426AA $869A: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0426AB $869B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0426AC $869C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0426AD $869D: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x0426AE $869E: C-----  75 6E    ADC  $6E,X
  0x0426B0 $86A0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0426B1 $86A1: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0426B2 $86A2: C-----  01 00    ORA  ($00,X)
  0x0426B4 $86A4: C-----  01 00    ORA  ($00,X)
  0x0426B6 $86A6: C-----  00       BRK  
  0x0426B7 $86A7: C-----  10 F8    BPL  $86A1
  0x0426B9 $86A9: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0426BA $86AA: C-----  FE FF FE INC  $FEFF,X
  0x0426BD $86AD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0426BE $86AE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0426BF $86AF: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0426C0 $86B0: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0426C1 $86B1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0426C2 $86B2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0426C3 $86B3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0426C4 $86B4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0426C5 $86B5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0426C6 $86B6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0426C7 $86B7: C-----  01 24    ORA  ($24,X)
  0x0426C9 $86B9: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x0426CA $86BA: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0426CB $86BB: C-----  06 00    ASL  $00
  0x0426CD $86BD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0426CE $86BE: C-----  00       BRK  
  0x0426CF $86BF: C-----  00       BRK  
  0x0426D0 $86C0: C-----  00       BRK  
  0x0426D1 $86C1: C-----  00       BRK  
  0x0426D2 $86C2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0426D3 $86C3: C-----  00       BRK  
  0x0426D4 $86C4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0426D5 $86C5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0426D6 $86C6: C-----  C0 40    CPY  #$40
  0x0426D8 $86C8: C-----  00       BRK  
  0x0426D9 $86C9: C-----  00       BRK  
  0x0426DA $86CA: C-----  00       BRK  
  0x0426DB $86CB: C-----  00       BRK  
  0x0426DC $86CC: C-----  00       BRK  
  0x0426DD $86CD: C-----  00       BRK  
  0x0426DE $86CE: C-----  00       BRK  
  0x0426DF $86CF: C-----  00       BRK  
  0x0426E0 $86D0: C-----  00       BRK  
  0x0426E1 $86D1: C-----  00       BRK  
  0x0426E2 $86D2: C-----  00       BRK  
  0x0426E3 $86D3: C-----  00       BRK  
  0x0426E4 $86D4: C-----  00       BRK  
  0x0426E5 $86D5: C-----  00       BRK  
  0x0426E6 $86D6: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0426E7 $86D7: C-----  16 00    ASL  $00,X
  0x0426E9 $86D9: C-----  00       BRK  
  0x0426EA $86DA: C-----  00       BRK  
  0x0426EB $86DB: C-----  00       BRK  
  0x0426EC $86DC: C-----  00       BRK  
  0x0426ED $86DD: C-----  00       BRK  
  0x0426EE $86DE: C-----  00       BRK  
  0x0426EF $86DF: C-----  00       BRK  
  0x0426F0 $86E0: C-----  FD FD FA SBC  $FAFD,X
  0x0426F3 $86E3: C-----  EC F0 F0 CPX  $F0F0
  0x0426F6 $86E6: C-----  E0 C0    CPX  #$C0
  0x0426F8 $86E8: C-----  4A       LSR  A
  0x0426F9 $86E9: C-----  4A       LSR  A
  0x0426FA $86EA: C-----  C4 D0    CPY  $D0
  0x0426FC $86EC: C-----  E0 40    CPX  #$40
  0x0426FE $86EE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0426FF $86EF: C-----  00       BRK  
  0x042700 $86F0: C-----  35 28    AND  $28,X
  0x042702 $86F2: C-----  60       RTS  
  0x042703 $86F3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042704 $86F4: C-----  40       RTI  
  0x042705 $86F5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042706 $86F6: C-----  90 BB    BCC  $86B3
  0x042708 $86F8: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042709 $86F9: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04270A $86FA: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04270B $86FB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04270C $86FC: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04270D $86FD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04270E $86FE: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04270F $86FF: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x042710 $8700: C-----  18       CLC  
  0x042711 $8701: C-----  20 C0 80 JSR  $80C0
  0x042714 $8704: C-----  40       RTI  
  0x042715 $8705: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042716 $8706: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042717 $8707: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x042718 $8708: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042719 $8709: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04271A $870A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04271B $870B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04271C $870C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04271D $870D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04271E $870E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04271F $870F: C-----  7D 18 04 ADC  $0418,X
  0x042722 $8712: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042723 $8713: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042724 $8714: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042725 $8715: C-----  01 01    ORA  ($01,X)
  0x042727 $8717: C-----  11 E0    ORA  ($E0),Y
  0x042729 $8719: C-----  F8       SED  
  0x04272A $871A: C-----  F8       SED  
  0x04272B $871B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04272C $871C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04272D $871D: C-----  FE FE EE INC  $EEFE,X
  0x042730 $8720: C-----  00       BRK  
  0x042731 $8721: C-----  00       BRK  
  0x042732 $8722: C-----  00       BRK  
  0x042733 $8723: C-----  00       BRK  
  0x042734 $8724: C-----  00       BRK  
  0x042735 $8725: C-----  06 2D    ASL  $2D
  0x042737 $8727: C-----  !!UNDEF $B2  ; unknown opcode, treating as data
  0x042738 $8728: C-----  00       BRK  
  0x042739 $8729: C-----  00       BRK  
  0x04273A $872A: C-----  00       BRK  
  0x04273B $872B: C-----  00       BRK  
  0x04273C $872C: C-----  00       BRK  
  0x04273D $872D: C-----  00       BRK  
  0x04273E $872E: C-----  00       BRK  
  0x04273F $872F: C-----  0D 00 00 ORA  $0000
  0x042742 $8732: C-----  00       BRK  
  0x042743 $8733: C-----  00       BRK  
  0x042744 $8734: C-----  00       BRK  
  0x042745 $8735: C-----  00       BRK  
  0x042746 $8736: C-----  F8       SED  
  0x042747 $8737: C-----  10 00    BPL  $8739
  0x042749 $8739: C-----  00       BRK  
  0x04274A $873A: C-----  00       BRK  
  0x04274B $873B: C-----  00       BRK  
  0x04274C $873C: C-----  00       BRK  
  0x04274D $873D: C-----  00       BRK  
  0x04274E $873E: C-----  00       BRK  
  0x04274F $873F: C-----  E0 87    CPX  #$87
  0x042751 $8741: C-----  F8       SED  
  0x042752 $8742: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042753 $8743: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042754 $8744: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042755 $8745: C-----  50 7B    BVC  $87C2
  0x042757 $8747: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042758 $8748: C-----  00       BRK  
  0x042759 $8749: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04275A $874A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04275B $874B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04275C $874C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04275D $874D: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04275E $874E: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04275F $874F: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x042760 $8750: C-----  C0 38    CPY  #$38
  0x042762 $8752: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042763 $8753: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042764 $8754: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042765 $8755: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x042766 $8756: C-----  !!UNDEF $D2  ; unknown opcode, treating as data
  0x042767 $8757: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x042768 $8758: C-----  00       BRK  
  0x042769 $8759: C-----  C0 F8    CPY  #$F8
  0x04276B $875B: C-----  F8       SED  
  0x04276C $875C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04276D $875D: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04276E $875E: C-----  AC D4 3F LDY  $3FD4
  0x042771 $8761: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042772 $8762: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042773 $8763: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042774 $8764: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042775 $8765: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042776 $8766: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042777 $8767: C-----  01 0E    ORA  ($0E,X)
  0x042779 $8769: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04277A $876A: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x04277B $876B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04277C $876C: C-----  09 07    ORA  #$07
  0x04277E $876E: C-----  00       BRK  
  0x04277F $876F: C-----  00       BRK  
  0x042780 $8770: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x042781 $8771: C-----  F9 F2 FC SBC  $FCF2,Y
  0x042784 $8774: C-----  F0 F0    BEQ  $8766
  0x042786 $8776: C-----  E0 C0    CPX  #$C0
  0x042788 $8778: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x042789 $8779: C-----  56 6C    LSR  $6C,X
  0x04278B $877B: C-----  C0 E0    CPY  #$E0
  0x04278D $877D: C-----  40       RTI  
  0x04278E $877E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04278F $877F: C-----  00       BRK  
  0x042790 $8780: C-----  A0 D0    LDY  #$D0
  0x042792 $8782: C-----  A0 40    LDY  #$40
  0x042794 $8784: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042795 $8785: C-----  90 B8    BCC  $873F
  0x042797 $8787: C-----  7E 1F 0F ROR  $0F1F,X
  0x04279A $878A: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04279B $878B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04279C $878C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04279D $878D: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04279E $878E: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04279F $878F: C-----  09 0E    ORA  #$0E
  0x0427A1 $8791: C-----  01 02    ORA  ($02,X)
  0x0427A3 $8793: C-----  01 00    ORA  ($00,X)
  0x0427A5 $8795: C-----  00       BRK  
  0x0427A6 $8796: C-----  00       BRK  
  0x0427A7 $8797: C-----  11 F0    ORA  ($F0),Y
  0x0427A9 $8799: C-----  FE FC FE INC  $FEFC,X
  0x0427AC $879C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0427AD $879D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0427AE $879E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0427AF $879F: C-----  EE 7F 3F INC  $3F7F
  0x0427B2 $87A2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0427B3 $87A3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0427B4 $87A4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0427B5 $87A5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0427B6 $87A6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0427B7 $87A7: C-----  01 06    ORA  ($06,X)
  0x0427B9 $87A9: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0427BA $87AA: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x0427BB $87AB: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0427BC $87AC: C-----  09 07    ORA  #$07
  0x0427BE $87AE: C-----  00       BRK  
  0x0427BF $87AF: C-----  00       BRK  
  0x0427C0 $87B0: C-----  F9 F9 F3 SBC  $F3F9,Y
  0x0427C3 $87B3: C-----  FD F0 F0 SBC  $F0F0,X
  0x0427C6 $87B6: C-----  E0 C0    CPX  #$C0
  0x0427C8 $87B8: C-----  16 56    ASL  $56,X
  0x0427CA $87BA: C-----  6C C0 E0 JMP  ($E0C0)
  0x0427CD $87BD: C-----  40       RTI  
  0x0427CE $87BE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0427CF $87BF: C-----  00       BRK  
  0x0427D0 $87C0: C-----  18       CLC  
  0x0427D1 $87C1: C-----  20 20 40 JSR  $4020
  0x0427D4 $87C4: C-----  40       RTI  
  0x0427D5 $87C5: C-----  50 7B    BVC  $8842
  0x0427D7 $87C7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0427D8 $87C8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0427D9 $87C9: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0427DA $87CA: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0427DB $87CB: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0427DC $87CC: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0427DD $87CD: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0427DE $87CE: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0427DF $87CF: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x0427E0 $87D0: C-----  18       CLC  
  0x0427E1 $87D1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0427E2 $87D2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0427E3 $87D3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0427E4 $87D4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0427E5 $87D5: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x0427E6 $87D6: C-----  !!UNDEF $D2  ; unknown opcode, treating as data
  0x0427E7 $87D7: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x0427E8 $87D8: C-----  E0 F8    CPX  #$F8
  0x0427EA $87DA: C-----  F8       SED  
  0x0427EB $87DB: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0427EC $87DC: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0427ED $87DD: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0427EE $87DE: C-----  AC D4 3F LDY  $3FD4
  0x0427F1 $87E1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0427F2 $87E2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0427F3 $87E3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0427F4 $87E4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0427F5 $87E5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0427F6 $87E6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0427F7 $87E7: C-----  01 0E    ORA  ($0E,X)
  0x0427F9 $87E9: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0427FA $87EA: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x0427FB $87EB: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0427FC $87EC: C-----  09 07    ORA  #$07
  0x0427FE $87EE: C-----  00       BRK  
  0x0427FF $87EF: C-----  00       BRK  
  0x042800 $87F0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042801 $87F1: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042802 $87F2: C-----  F8       SED  
  0x042803 $87F3: C-----  F8       SED  
  0x042804 $87F4: C-----  F8       SED  
  0x042805 $87F5: C-----  F0 E0    BEQ  $87D7
  0x042807 $87F7: C-----  C0 10    CPY  #$10
  0x042809 $87F9: C-----  50 60    BVC  $885B
  0x04280B $87FB: C-----  E0 E0    CPX  #$E0
  0x04280D $87FD: C-----  40       RTI  
  0x04280E $87FE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04280F $87FF: C-----  00       BRK  
  0x042810 $8800: ------  .byte $00
  0x042811 $8801: ------  .byte $00
  0x042812 $8802: ------  .byte $00
  0x042813 $8803: ------  .byte $00
  0x042814 $8804: ------  .byte $00
  0x042815 $8805: ------  .byte $00
  0x042816 $8806: ------  .byte $00
  0x042817 $8807: ------  .byte $00
  0x042818 $8808: ------  .byte $00
  0x042819 $8809: ------  .byte $00
  0x04281A $880A: ------  .byte $00
  0x04281B $880B: ------  .byte $00
  0x04281C $880C: ------  .byte $00
  0x04281D $880D: ------  .byte $00
  0x04281E $880E: ------  .byte $00
  0x04281F $880F: ------  .byte $00
  0x042820 $8810: C-----  30 08    BMI  $881A
  0x042822 $8812: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042823 $8813: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042824 $8814: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042825 $8815: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042826 $8816: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x042827 $8817: C-----  !!UNDEF $D2  ; unknown opcode, treating as data
  0x042828 $8818: C-----  C0 F0    CPY  #$F0
  0x04282A $881A: C-----  F8       SED  
  0x04282B $881B: C-----  F8       SED  
  0x04282C $881C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04282D $881D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04282E $881E: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04282F $881F: C-----  AC C0 38 LDY  $38C0
  0x042832 $8822: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042833 $8823: C-----  01 02    ORA  ($02,X)
  0x042835 $8825: C-----  01 41    ORA  ($41,X)
  0x042837 $8827: C-----  F1 00    SBC  ($00),Y
  0x042839 $8829: C-----  C0 F8    CPY  #$F8
  0x04283B $882B: C-----  FE FC FE INC  $FEFC,X
  0x04283E $882E: C-----  BE 4E 00 LDX  $004E,Y
  0x042841 $8831: C-----  00       BRK  
  0x042842 $8832: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042843 $8833: C-----  00       BRK  
  0x042844 $8834: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042845 $8835: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042846 $8836: C-----  00       BRK  
  0x042847 $8837: C-----  00       BRK  
  0x042848 $8838: C-----  00       BRK  
  0x042849 $8839: C-----  00       BRK  
  0x04284A $883A: C-----  00       BRK  
  0x04284B $883B: C-----  00       BRK  
  0x04284C $883C: C-----  00       BRK  
  0x04284D $883D: C-----  00       BRK  
  0x04284E $883E: C-----  00       BRK  
  0x04284F $883F: C-----  00       BRK  
  0x042850 $8840: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042851 $8841: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042852 $8842: C-----  01 00    ORA  ($00,X)
  0x042854 $8844: C-----  01 00    ORA  ($00,X)
  0x042856 $8846: C-----  00       BRK  
  0x042857 $8847: C-----  00       BRK  
  0x042858 $8848: C-----  F8       SED  
  0x042859 $8849: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04285A $884A: C-----  FE FF FE INC  $FEFF,X
  0x04285D $884D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04285E $884E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04285F $884F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042860 $8850: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042861 $8851: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x042862 $8852: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x042863 $8853: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042864 $8854: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x042865 $8855: C-----  0D F4 B4 ORA  $B4F4
  0x042868 $8858: C-----  00       BRK  
  0x042869 $8859: C-----  05 0C    ORA  $0C
  0x04286B $885B: C-----  00       BRK  
  0x04286C $885C: C-----  70 F2    BVS  $8850
  0x04286E $885E: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04286F $885F: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x042870 $8860: C-----  C1 E1    CMP  ($E1,X)
  0x042872 $8862: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x042873 $8863: C-----  EC F0 F0 CPX  $F0F0
  0x042876 $8866: C-----  E0 C0    CPX  #$C0
  0x042878 $8868: C-----  3E 5E 5C ROL  $5C5E,X
  0x04287B $886B: C-----  D0 E0    BNE  $884D
  0x04287D $886D: C-----  40       RTI  
  0x04287E $886E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04287F $886F: C-----  00       BRK  
  0x042880 $8870: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x042881 $8871: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042882 $8872: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042883 $8873: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042884 $8874: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042885 $8875: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042886 $8876: C-----  F8       SED  
  0x042887 $8877: C-----  70 00    BVS  $8879
  0x042889 $8879: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04288A $887A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04288B $887B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04288C $887C: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04288D $887D: C-----  D0 60    BNE  $88DF
  0x04288F $887F: C-----  00       BRK  
  0x042890 $8880: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042891 $8881: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042892 $8882: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042893 $8883: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042894 $8884: C-----  FE 0E 06 INC  $060E,X
  0x042897 $8887: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x042898 $8888: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042899 $8889: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04289A $888A: C-----  EE 8E 0D INC  $0D8E
  0x04289D $888D: C-----  05 01    ORA  $01
  0x04289F $888F: C-----  00       BRK  
  0x0428A0 $8890: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0428A1 $8891: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x0428A2 $8892: C-----  4C 23 1C JMP  $1C23
  0x0428A5 $8895: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x0428A6 $8896: C-----  40       RTI  
  0x0428A7 $8897: C-----  20 00 2C JSR  $2C00
  0x0428AA $889A: C-----  !!UNDEF $B3  ; unknown opcode, treating as data
  0x0428AB $889B: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x0428AC $889C: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x0428AD $889D: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0428AE $889E: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0428AF $889F: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0428B0 $88A0: C-----  A0 80    LDY  #$80
  0x0428B2 $88A2: C-----  40       RTI  
  0x0428B3 $88A3: C-----  50 30    BVC  $88D5
  0x0428B5 $88A5: C-----  10 08    BPL  $88AF
  0x0428B7 $88A7: C-----  08       PHP  
  0x0428B8 $88A8: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0428B9 $88A9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0428BA $88AA: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0428BB $88AB: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0428BC $88AC: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0428BD $88AD: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0428BE $88AE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0428BF $88AF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0428C0 $88B0: C-----  00       BRK  
  0x0428C1 $88B1: C-----  00       BRK  
  0x0428C2 $88B2: C-----  00       BRK  
  0x0428C3 $88B3: C-----  00       BRK  
  0x0428C4 $88B4: C-----  00       BRK  
  0x0428C5 $88B5: C-----  00       BRK  
  0x0428C6 $88B6: C-----  00       BRK  
  0x0428C7 $88B7: C-----  00       BRK  
  0x0428C8 $88B8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0428C9 $88B9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0428CA $88BA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0428CB $88BB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0428CC $88BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0428CD $88BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0428CE $88BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0428CF $88BF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0428D0 $88C0: C-----  00       BRK  
  0x0428D1 $88C1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0428D2 $88C2: C-----  40       RTI  
  0x0428D3 $88C3: C-----  00       BRK  
  0x0428D4 $88C4: C-----  00       BRK  
  0x0428D5 $88C5: C-----  00       BRK  
  0x0428D6 $88C6: C-----  00       BRK  
  0x0428D7 $88C7: C-----  00       BRK  
  0x0428D8 $88C8: C-----  00       BRK  
  0x0428D9 $88C9: C-----  00       BRK  
  0x0428DA $88CA: C-----  BE FF FF LDX  $FFFF,Y
  0x0428DD $88CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0428DE $88CE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0428DF $88CF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0428E0 $88D0: C-----  00       BRK  
  0x0428E1 $88D1: C-----  00       BRK  
  0x0428E2 $88D2: C-----  00       BRK  
  0x0428E3 $88D3: C-----  00       BRK  
  0x0428E4 $88D4: C-----  00       BRK  
  0x0428E5 $88D5: C-----  10 0C    BPL  $88E3
  0x0428E7 $88D7: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0428E8 $88D8: C-----  00       BRK  
  0x0428E9 $88D9: C-----  00       BRK  
  0x0428EA $88DA: C-----  00       BRK  
  0x0428EB $88DB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0428EC $88DC: C-----  E0 E0    CPX  #$E0
  0x0428EE $88DE: C-----  F0 EC    BEQ  $88CC
  0x0428F0 $88E0: C-----  99 64 12 STA  $1264,Y
  0x0428F3 $88E3: C-----  09 04    ORA  #$04
  0x0428F5 $88E5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0428F6 $88E6: C-----  01 00    ORA  ($00,X)
  0x0428F8 $88E8: C-----  66 9B    ROR  $9B
  0x0428FA $88EA: C-----  ED F6 FB SBC  $FBF6
  0x0428FD $88ED: C-----  FD FE FF SBC  $FFFE,X
  0x042900 $88F0: C-----  00       BRK  
  0x042901 $88F1: C-----  C0 30    CPY  #$30
  0x042903 $88F3: C-----  08       PHP  
  0x042904 $88F4: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x042905 $88F5: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x042906 $88F6: C-----  19 8F 00 ORA  $008F,Y
  0x042909 $88F9: C-----  00       BRK  
  0x04290A $88FA: C-----  C0 F0    CPY  #$F0
  0x04290C $88FC: C-----  60       RTS  
  0x04290D $88FD: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x04290E $88FE: C-----  E6 70    INC  $70
  0x042910 $8900: C-----  00       BRK  
  0x042911 $8901: C-----  00       BRK  
  0x042912 $8902: C-----  00       BRK  
  0x042913 $8903: C-----  00       BRK  
  0x042914 $8904: C-----  00       BRK  
  0x042915 $8905: C-----  00       BRK  
  0x042916 $8906: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x042917 $8907: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042918 $8908: C-----  00       BRK  
  0x042919 $8909: C-----  00       BRK  
  0x04291A $890A: C-----  00       BRK  
  0x04291B $890B: C-----  00       BRK  
  0x04291C $890C: C-----  00       BRK  
  0x04291D $890D: C-----  00       BRK  
  0x04291E $890E: C-----  00       BRK  
  0x04291F $890F: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x042920 $8910: C-----  DD E3 7E CMP  $7EE3,X
  0x042923 $8913: C-----  56 5A    LSR  $5A,X
  0x042925 $8915: C-----  24 1C    BIT  $1C
  0x042927 $8917: C-----  00       BRK  
  0x042928 $8918: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x042929 $8919: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04292A $891A: C-----  00       BRK  
  0x04292B $891B: C-----  28       PLP  
  0x04292C $891C: C-----  24 18    BIT  $18
  0x04292E $891E: C-----  00       BRK  
  0x04292F $891F: C-----  00       BRK  
  0x042930 $8920: C-----  81 41    STA  ($41,X)
  0x042932 $8922: C-----  20 10 09 JSR  $0910
  0x042935 $8925: C-----  09 05    ORA  #$05
  0x042937 $8927: C-----  05 7E    ORA  $7E
  0x042939 $8929: C-----  3E 1F 0F ROL  $0F1F,X
  0x04293C $892C: C-----  06 06    ASL  $06
  0x04293E $892E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04293F $892F: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042940 $8930: C-----  00       BRK  
  0x042941 $8931: C-----  00       BRK  
  0x042942 $8932: C-----  F0 F8    BEQ  $892C
  0x042944 $8934: C-----  C4 86    CPY  $86
  0x042946 $8936: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x042947 $8937: C-----  !!UNDEF $5A  ; unknown opcode, treating as data
  0x042948 $8938: C-----  00       BRK  
  0x042949 $8939: C-----  00       BRK  
  0x04294A $893A: C-----  00       BRK  
  0x04294B $893B: C-----  00       BRK  
  0x04294C $893C: C-----  38       SEC  
  0x04294D $893D: C-----  78       SEI  
  0x04294E $893E: C-----  84 A4    STY  $A4
  0x042950 $8940: C-----  00       BRK  
  0x042951 $8941: C-----  00       BRK  
  0x042952 $8942: C-----  00       BRK  
  0x042953 $8943: C-----  00       BRK  
  0x042954 $8944: C-----  00       BRK  
  0x042955 $8945: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042956 $8946: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x042957 $8947: C-----  0A       ASL  A
  0x042958 $8948: C-----  00       BRK  
  0x042959 $8949: C-----  00       BRK  
  0x04295A $894A: C-----  00       BRK  
  0x04295B $894B: C-----  00       BRK  
  0x04295C $894C: C-----  00       BRK  
  0x04295D $894D: C-----  00       BRK  
  0x04295E $894E: C-----  00       BRK  
  0x04295F $894F: C-----  01 00    ORA  ($00,X)
  0x042961 $8951: C-----  00       BRK  
  0x042962 $8952: C-----  00       BRK  
  0x042963 $8953: C-----  00       BRK  
  0x042964 $8954: C-----  00       BRK  
  0x042965 $8955: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x042966 $8956: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x042967 $8957: C-----  CC 00 00 CPY  $0000
  0x04296A $895A: C-----  00       BRK  
  0x04296B $895B: C-----  00       BRK  
  0x04296C $895C: C-----  00       BRK  
  0x04296D $895D: C-----  00       BRK  
  0x04296E $895E: C-----  00       BRK  
  0x04296F $895F: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x042970 $8960: C-----  0A       ASL  A
  0x042971 $8961: C-----  0E 0B 08 ASL  $080B
  0x042974 $8964: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042975 $8965: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x042976 $8966: C-----  0E 08 01 ASL  $0108
  0x042979 $8969: C-----  01 04    ORA  ($04,X)
  0x04297B $896B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04297C $896C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04297D $896D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04297E $896E: C-----  01 07    ORA  ($07,X)
  0x042980 $8970: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x042981 $8971: C-----  00       BRK  
  0x042982 $8972: C-----  00       BRK  
  0x042983 $8973: C-----  00       BRK  
  0x042984 $8974: C-----  00       BRK  
  0x042985 $8975: C-----  00       BRK  
  0x042986 $8976: C-----  20 7D 9D JSR  $9D7D
  0x042989 $8979: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04298A $897A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04298B $897B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04298C $897C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04298D $897D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04298E $897E: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04298F $897F: C-----  A2 01    LDX  #$01
  0x042991 $8981: C-----  01 E0    ORA  ($E0,X)
  0x042993 $8983: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x042994 $8984: C-----  00       BRK  
  0x042995 $8985: C-----  E0 3F    CPX  #$3F
  0x042997 $8987: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x042998 $8988: C-----  00       BRK  
  0x042999 $8989: C-----  00       BRK  
  0x04299A $898A: C-----  00       BRK  
  0x04299B $898B: C-----  00       BRK  
  0x04299C $898C: C-----  00       BRK  
  0x04299D $898D: C-----  00       BRK  
  0x04299E $898E: C-----  C0 38    CPY  #$38
  0x0429A0 $8990: C-----  C0 FB    CPY  #$FB
  0x0429A2 $8992: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0429A3 $8993: C-----  F9 F2 E4 SBC  $E4F2,Y
  0x0429A6 $8996: C-----  E8       INX  
  0x0429A7 $8997: C-----  C8       INY  
  0x0429A8 $8998: C-----  00       BRK  
  0x0429A9 $8999: C-----  C0 F3    CPY  #$F3
  0x0429AB $899B: C-----  E6 ED    INC  $ED
  0x0429AD $899D: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x0429AE $899E: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x0429AF $899F: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x0429B0 $89A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0429B1 $89A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0429B2 $89A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0429B3 $89A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0429B4 $89A4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0429B5 $89A5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0429B6 $89A6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0429B7 $89A7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0429B8 $89A8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0429B9 $89A9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0429BA $89AA: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0429BB $89AB: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0429BC $89AC: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0429BD $89AD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0429BE $89AE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0429BF $89AF: C-----  00       BRK  
  0x0429C0 $89B0: C-----  D8       CLD  
  0x0429C1 $89B1: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x0429C2 $89B2: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x0429C3 $89B3: C-----  50 30    BVC  $89E5
  0x0429C5 $89B5: C-----  10 18    BPL  $89CF
  0x0429C7 $89B7: C-----  08       PHP  
  0x0429C8 $89B8: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x0429C9 $89B9: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x0429CA $89BA: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x0429CB $89BB: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0429CC $89BC: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0429CD $89BD: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0429CE $89BE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0429CF $89BF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0429D0 $89C0: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0429D1 $89C1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0429D2 $89C2: C-----  00       BRK  
  0x0429D3 $89C3: C-----  01 00    ORA  ($00,X)
  0x0429D5 $89C5: C-----  00       BRK  
  0x0429D6 $89C6: C-----  00       BRK  
  0x0429D7 $89C7: C-----  00       BRK  
  0x0429D8 $89C8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0429D9 $89C9: C-----  00       BRK  
  0x0429DA $89CA: C-----  00       BRK  
  0x0429DB $89CB: C-----  00       BRK  
  0x0429DC $89CC: C-----  00       BRK  
  0x0429DD $89CD: C-----  00       BRK  
  0x0429DE $89CE: C-----  00       BRK  
  0x0429DF $89CF: C-----  00       BRK  
  0x0429E0 $89D0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0429E1 $89D1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0429E2 $89D2: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x0429E3 $89D3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0429E4 $89D4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0429E5 $89D5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0429E6 $89D6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0429E7 $89D7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0429E8 $89D8: C-----  A5 A8    LDA  $A8
  0x0429EA $89DA: C-----  59 3F 2E EOR  $2E3F,Y
  0x0429ED $89DD: C-----  16 09    ASL  $09,X
  0x0429EF $89DF: C-----  00       BRK  
  0x0429F0 $89E0: C-----  00       BRK  
  0x0429F1 $89E1: C-----  00       BRK  
  0x0429F2 $89E2: C-----  70 AE    BVS  $8992
  0x0429F4 $89E4: C-----  A1 90    LDA  ($90,X)
  0x0429F6 $89E6: C-----  B0 58    BCS  $8A40
  0x0429F8 $89E8: C-----  00       BRK  
  0x0429F9 $89E9: C-----  00       BRK  
  0x0429FA $89EA: C-----  00       BRK  
  0x0429FB $89EB: C-----  10 1E    BPL  $8A0B
  0x0429FD $89ED: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x0429FE $89EE: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x0429FF $89EF: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x042A00 $89F0: C-----  00       BRK  
  0x042A01 $89F1: C-----  00       BRK  
  0x042A02 $89F2: C-----  E0 5B    CPX  #$5B
  0x042A04 $89F4: C-----  A5 63    LDA  $63
  0x042A06 $89F6: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x042A07 $89F7: C-----  21 00    AND  ($00,X)
  0x042A09 $89F9: C-----  00       BRK  
  0x042A0A $89FA: C-----  00       BRK  
  0x042A0B $89FB: C-----  20 18 9C JSR  $9C18
  0x042A0E $89FE: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x042A0F $89FF: C-----  DE 18 0E DEC  $0E18,X
  0x042A12 $8A02: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042A13 $8A03: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042A14 $8A04: C-----  01 01    ORA  ($01,X)
  0x042A16 $8A06: C-----  01 01    ORA  ($01,X)
  0x042A18 $8A08: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042A19 $8A09: C-----  01 00    ORA  ($00,X)
  0x042A1B $8A0B: C-----  01 00    ORA  ($00,X)
  0x042A1D $8A0D: C-----  00       BRK  
  0x042A1E $8A0E: C-----  00       BRK  
  0x042A1F $8A0F: C-----  00       BRK  
  0x042A20 $8A10: C-----  01 01    ORA  ($01,X)
  0x042A22 $8A12: C-----  E0 1C    CPX  #$1C
  0x042A24 $8A14: C-----  00       BRK  
  0x042A25 $8A15: C-----  E0 3F    CPX  #$3F
  0x042A27 $8A17: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x042A28 $8A18: C-----  FE FE 1F INC  $1FFE,X
  0x042A2B $8A1B: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x042A2C $8A1C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042A2D $8A1D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042A2E $8A1E: C-----  00       BRK  
  0x042A2F $8A1F: C-----  00       BRK  
  0x042A30 $8A20: C-----  C0 87    CPY  #$87
  0x042A32 $8A22: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x042A33 $8A23: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x042A34 $8A24: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x042A35 $8A25: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x042A36 $8A26: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x042A37 $8A27: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x042A38 $8A28: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042A39 $8A29: C-----  78       SEI  
  0x042A3A $8A2A: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x042A3B $8A2B: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x042A3C $8A2C: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x042A3D $8A2D: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x042A3E $8A2E: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x042A3F $8A2F: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x042A40 $8A30: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042A41 $8A31: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042A42 $8A32: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042A43 $8A33: C-----  FE FD FD INC  $FDFD,X
  0x042A46 $8A36: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042A47 $8A37: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042A48 $8A38: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x042A49 $8A39: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042A4A $8A3A: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x042A4B $8A3B: C-----  ED F2 F2 SBC  $F2F2
  0x042A4E $8A3E: C-----  F8       SED  
  0x042A4F $8A3F: C-----  F8       SED  
  0x042A50 $8A40: C-----  01 00    ORA  ($00,X)
  0x042A52 $8A42: C-----  81 01    STA  ($01,X)
  0x042A54 $8A44: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x042A55 $8A45: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042A56 $8A46: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042A57 $8A47: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042A58 $8A48: C-----  FE FF 7E INC  $7EFF,X
  0x042A5B $8A4B: C-----  FE C9 87 INC  $87C9,X
  0x042A5E $8A4E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042A5F $8A4F: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x042A60 $8A50: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042A61 $8A51: C-----  FE FF FF INC  $FFFF,X
  0x042A64 $8A54: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042A65 $8A55: C-----  FE FE FC INC  $FCFE,X
  0x042A68 $8A58: C-----  38       SEC  
  0x042A69 $8A59: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x042A6A $8A5A: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x042A6B $8A5B: C-----  7E FE FE ROR  $FEFE,X
  0x042A6E $8A5E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042A6F $8A5F: C-----  F8       SED  
  0x042A70 $8A60: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042A71 $8A61: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042A72 $8A62: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042A73 $8A63: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042A74 $8A64: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042A75 $8A65: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042A76 $8A66: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042A77 $8A67: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042A78 $8A68: C-----  60       RTS  
  0x042A79 $8A69: C-----  0E BF 7F ASL  $7FBF
  0x042A7C $8A6C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042A7D $8A6D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042A7E $8A6E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042A7F $8A6F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042A80 $8A70: C-----  00       BRK  
  0x042A81 $8A71: C-----  00       BRK  
  0x042A82 $8A72: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042A83 $8A73: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042A84 $8A74: C-----  C0 C0    CPY  #$C0
  0x042A86 $8A76: C-----  C0 E0    CPY  #$E0
  0x042A88 $8A78: C-----  00       BRK  
  0x042A89 $8A79: C-----  00       BRK  
  0x042A8A $8A7A: C-----  00       BRK  
  0x042A8B $8A7B: C-----  00       BRK  
  0x042A8C $8A7C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042A8D $8A7D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042A8E $8A7E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042A8F $8A7F: C-----  C0 FF    CPY  #$FF
  0x042A91 $8A81: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042A92 $8A82: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042A93 $8A83: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042A94 $8A84: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042A95 $8A85: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042A96 $8A86: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x042A97 $8A87: C-----  01 1F    ORA  ($1F,X)
  0x042A99 $8A89: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042A9A $8A8A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042A9B $8A8B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042A9C $8A8C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042A9D $8A8D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x042A9E $8A8E: C-----  01 00    ORA  ($00,X)
  0x042AA0 $8A90: C-----  FE FE FE INC  $FEFE,X
  0x042AA3 $8A93: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042AA4 $8A94: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042AA5 $8A95: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042AA6 $8A96: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042AA7 $8A97: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042AA8 $8A98: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042AA9 $8A99: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042AAA $8A9A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042AAB $8A9B: C-----  FE FE FE INC  $FEFE,X
  0x042AAE $8A9E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042AAF $8A9F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042AB0 $8AA0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042AB1 $8AA1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042AB2 $8AA2: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x042AB3 $8AA3: C-----  39 32 14 AND  $1432,Y
  0x042AB6 $8AA6: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x042AB7 $8AA7: C-----  08       PHP  
  0x042AB8 $8AA8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042AB9 $8AA9: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x042ABA $8AAA: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x042ABB $8AAB: C-----  06 0D    ASL  $0D
  0x042ABD $8AAD: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x042ABE $8AAE: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x042ABF $8AAF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042AC0 $8AB0: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x042AC1 $8AB1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042AC2 $8AB2: C-----  40       RTI  
  0x042AC3 $8AB3: C-----  C0 20    CPY  #$20
  0x042AC5 $8AB5: C-----  20 10 10 JSR  $1010
  0x042AC8 $8AB8: C-----  00       BRK  
  0x042AC9 $8AB9: C-----  00       BRK  
  0x042ACA $8ABA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042ACB $8ABB: C-----  00       BRK  
  0x042ACC $8ABC: C-----  C0 C0    CPY  #$C0
  0x042ACE $8ABE: C-----  E0 E0    CPX  #$E0
  0x042AD0 $8AC0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042AD1 $8AC1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042AD2 $8AC2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042AD3 $8AC3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042AD4 $8AC4: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x042AD5 $8AC5: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x042AD6 $8AC6: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x042AD7 $8AC7: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x042AD8 $8AC8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042AD9 $8AC9: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042ADA $8ACA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042ADB $8ACB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042ADC $8ACC: C-----  08       PHP  
  0x042ADD $8ACD: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042ADE $8ACE: C-----  00       BRK  
  0x042ADF $8ACF: C-----  00       BRK  
  0x042AE0 $8AD0: C-----  E0 E0    CPX  #$E0
  0x042AE2 $8AD2: C-----  E0 C0    CPX  #$C0
  0x042AE4 $8AD4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042AE5 $8AD5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042AE6 $8AD6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042AE7 $8AD7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042AE8 $8AD8: C-----  C0 C0    CPY  #$C0
  0x042AEA $8ADA: C-----  C0 80    CPY  #$80
  0x042AEC $8ADC: C-----  00       BRK  
  0x042AED $8ADD: C-----  00       BRK  
  0x042AEE $8ADE: C-----  00       BRK  
  0x042AEF $8ADF: C-----  00       BRK  
  0x042AF0 $8AE0: C-----  08       PHP  
  0x042AF1 $8AE1: C-----  08       PHP  
  0x042AF2 $8AE2: C-----  08       PHP  
  0x042AF3 $8AE3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042AF4 $8AE4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042AF5 $8AE5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042AF6 $8AE6: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042AF7 $8AE7: C-----  01 07    ORA  ($07,X)
  0x042AF9 $8AE9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042AFA $8AEA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042AFB $8AEB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x042AFC $8AEC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x042AFD $8AED: C-----  01 01    ORA  ($01,X)
  0x042AFF $8AEF: C-----  00       BRK  
  0x042B00 $8AF0: C-----  08       PHP  
  0x042B01 $8AF1: C-----  08       PHP  
  0x042B02 $8AF2: C-----  08       PHP  
  0x042B03 $8AF3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042B04 $8AF4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042B05 $8AF5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042B06 $8AF6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042B07 $8AF7: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042B08 $8AF8: C-----  F0 F0    BEQ  $8AEA
  0x042B0A $8AFA: C-----  F0 F8    BEQ  $8AF4
  0x042B0C $8AFC: C-----  F8       SED  
  0x042B0D $8AFD: C-----  F8       SED  
  0x042B0E $8AFE: C-----  F8       SED  
  0x042B0F $8AFF: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042B10 $8B00: C-----  00       BRK  
  0x042B11 $8B01: C-----  00       BRK  
  0x042B12 $8B02: C-----  00       BRK  
  0x042B13 $8B03: C-----  00       BRK  
  0x042B14 $8B04: C-----  00       BRK  
  0x042B15 $8B05: C-----  18       CLC  
  0x042B16 $8B06: C-----  06 01    ASL  $01
  0x042B18 $8B08: C-----  00       BRK  
  0x042B19 $8B09: C-----  00       BRK  
  0x042B1A $8B0A: C-----  00       BRK  
  0x042B1B $8B0B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042B1C $8B0C: C-----  E0 E0    CPX  #$E0
  0x042B1E $8B0E: C-----  F8       SED  
  0x042B1F $8B0F: C-----  FE 00 00 INC  $0000,X
  0x042B22 $8B12: C-----  E0 1C    CPX  #$1C
  0x042B24 $8B14: C-----  00       BRK  
  0x042B25 $8B15: C-----  E0 3F    CPX  #$3F
  0x042B27 $8B17: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x042B28 $8B18: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042B29 $8B19: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042B2A $8B1A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042B2B $8B1B: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x042B2C $8B1C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042B2D $8B1D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042B2E $8B1E: C-----  00       BRK  
  0x042B2F $8B1F: C-----  00       BRK  
  0x042B30 $8B20: C-----  06 0C    ASL  $0C
  0x042B32 $8B22: C-----  10 13    BPL  $8B37
  0x042B34 $8B24: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x042B35 $8B25: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x042B36 $8B26: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x042B37 $8B27: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x042B38 $8B28: C-----  F9 F3 EF SBC  $EFF3,Y
  0x042B3B $8B2B: C-----  EC D9 DB CPX  $DBD9
  0x042B3E $8B2E: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x042B3F $8B2F: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x042B40 $8B30: C-----  60       RTS  
  0x042B41 $8B31: C-----  10 F0    BPL  $8B23
  0x042B43 $8B33: C-----  F8       SED  
  0x042B44 $8B34: C-----  F8       SED  
  0x042B45 $8B35: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042B46 $8B36: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042B47 $8B37: C-----  FE 80 E0 INC  $E080,X
  0x042B4A $8B3A: C-----  00       BRK  
  0x042B4B $8B3B: C-----  E0 F0    CPX  #$F0
  0x042B4D $8B3D: C-----  F8       SED  
  0x042B4E $8B3E: C-----  F8       SED  
  0x042B4F $8B3F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042B50 $8B40: C-----  48       PHA  
  0x042B51 $8B41: C-----  20 20 50 JSR  $5020
  0x042B54 $8B44: C-----  58       CLI  
  0x042B55 $8B45: C-----  20 10 08 JSR  $0810
  0x042B58 $8B48: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x042B59 $8B49: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042B5A $8B4A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042B5B $8B4B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042B5C $8B4C: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x042B5D $8B4D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042B5E $8B4E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042B5F $8B4F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042B60 $8B50: C-----  00       BRK  
  0x042B61 $8B51: C-----  00       BRK  
  0x042B62 $8B52: C-----  00       BRK  
  0x042B63 $8B53: C-----  00       BRK  
  0x042B64 $8B54: C-----  00       BRK  
  0x042B65 $8B55: C-----  00       BRK  
  0x042B66 $8B56: C-----  00       BRK  
  0x042B67 $8B57: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x042B68 $8B58: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042B69 $8B59: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042B6A $8B5A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042B6B $8B5B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042B6C $8B5C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042B6D $8B5D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042B6E $8B5E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042B6F $8B5F: C-----  ED 62 10 SBC  $1062
  0x042B72 $8B62: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042B73 $8B63: C-----  00       BRK  
  0x042B74 $8B64: C-----  00       BRK  
  0x042B75 $8B65: C-----  00       BRK  
  0x042B76 $8B66: C-----  20 79 9D JSR  $9D79
  0x042B79 $8B69: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x042B7A $8B6A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042B7B $8B6B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042B7C $8B6C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042B7D $8B6D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042B7E $8B6E: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x042B7F $8B6F: C-----  A6 18    LDX  $18
  0x042B81 $8B71: C-----  0A       ASL  A
  0x042B82 $8B72: C-----  06 02    ASL  $02
  0x042B84 $8B74: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042B85 $8B75: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x042B86 $8B76: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x042B87 $8B77: C-----  F6 E0    INC  $E0,X
  0x042B89 $8B79: C-----  F0 F8    BEQ  $8B73
  0x042B8B $8B7B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042B8C $8B7C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042B8D $8B7D: C-----  B8       CLV  
  0x042B8E $8B7E: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x042B8F $8B7F: C-----  48       PHA  
  0x042B90 $8B80: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x042B91 $8B81: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x042B92 $8B82: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x042B93 $8B83: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x042B94 $8B84: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042B95 $8B85: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042B96 $8B86: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042B97 $8B87: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042B98 $8B88: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x042B99 $8B89: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x042B9A $8B8A: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x042B9B $8B8B: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x042B9C $8B8C: C-----  E1 87    SBC  ($87,X)
  0x042B9E $8B8E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042B9F $8B8F: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x042BA0 $8B90: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042BA1 $8B91: C-----  FE FF FF INC  $FFFF,X
  0x042BA4 $8B94: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042BA5 $8B95: C-----  FE FE FC INC  $FCFE,X
  0x042BA8 $8B98: C-----  F8       SED  
  0x042BA9 $8B99: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042BAA $8B9A: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x042BAB $8B9B: C-----  7E FE FE ROR  $FEFE,X
  0x042BAE $8B9E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042BAF $8B9F: C-----  F8       SED  
  0x042BB0 $8BA0: C-----  00       BRK  
  0x042BB1 $8BA1: C-----  00       BRK  
  0x042BB2 $8BA2: C-----  E0 1C    CPX  #$1C
  0x042BB4 $8BA4: C-----  00       BRK  
  0x042BB5 $8BA5: C-----  E0 3F    CPX  #$3F
  0x042BB7 $8BA7: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x042BB8 $8BA8: C-----  00       BRK  
  0x042BB9 $8BA9: C-----  00       BRK  
  0x042BBA $8BAA: C-----  00       BRK  
  0x042BBB $8BAB: C-----  00       BRK  
  0x042BBC $8BAC: C-----  00       BRK  
  0x042BBD $8BAD: C-----  00       BRK  
  0x042BBE $8BAE: C-----  C0 38    CPY  #$38
  0x042BC0 $8BB0: C-----  00       BRK  
  0x042BC1 $8BB1: C-----  00       BRK  
  0x042BC2 $8BB2: C-----  00       BRK  
  0x042BC3 $8BB3: C-----  00       BRK  
  0x042BC4 $8BB4: C-----  00       BRK  
  0x042BC5 $8BB5: C-----  00       BRK  
  0x042BC6 $8BB6: C-----  00       BRK  
  0x042BC7 $8BB7: C-----  00       BRK  
  0x042BC8 $8BB8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042BC9 $8BB9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042BCA $8BBA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042BCB $8BBB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042BCC $8BBC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042BCD $8BBD: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042BCE $8BBE: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042BCF $8BBF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042BD0 $8BC0: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x042BD1 $8BC1: C-----  10 80    BPL  $8B43
  0x042BD3 $8BC3: C-----  00       BRK  
  0x042BD4 $8BC4: C-----  00       BRK  
  0x042BD5 $8BC5: C-----  00       BRK  
  0x042BD6 $8BC6: C-----  25 7F    AND  $7F
  0x042BD8 $8BC8: C-----  9D EF 7F STA  $7FEF,X
  0x042BDB $8BCB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042BDC $8BCC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042BDD $8BCD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042BDE $8BCE: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x042BDF $8BCF: C-----  A5 FA    LDA  $FA
  0x042BE1 $8BD1: C-----  EC F8 F8 CPX  $F8F8
  0x042BE4 $8BD4: C-----  F8       SED  
  0x042BE5 $8BD5: C-----  30 E0    BMI  $8BB7
  0x042BE7 $8BD7: C-----  C0 E0    CPY  #$E0
  0x042BE9 $8BD9: C-----  50 F0    BVC  $8BCB
  0x042BEB $8BDB: C-----  D0 30    BNE  $8C0D
  0x042BED $8BDD: C-----  E0 C0    CPX  #$C0
  0x042BEF $8BDF: C-----  00       BRK  
  0x042BF0 $8BE0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042BF1 $8BE1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042BF2 $8BE2: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x042BF3 $8BE3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042BF4 $8BE4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042BF5 $8BE5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042BF6 $8BE6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042BF7 $8BE7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042BF8 $8BE8: C-----  A1 A8    LDA  ($A8,X)
  0x042BFA $8BEA: C-----  49 27    EOR  #$27
  0x042BFC $8BEC: C-----  36 1E    ROL  $1E,X
  0x042BFE $8BEE: C-----  09 00    ORA  #$00
  0x042C00 $8BF0: C-----  F8       SED  
  0x042C01 $8BF1: C-----  E8       INX  
  0x042C02 $8BF2: C-----  F8       SED  
  0x042C03 $8BF3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042C04 $8BF4: C-----  BE F0 E0 LDX  $E0F0,Y
  0x042C07 $8BF7: C-----  C0 A0    CPY  #$A0
  0x042C09 $8BF9: C-----  50 F0    BVC  $8BEB
  0x042C0B $8BFB: C-----  D0 70    BNE  $8C6D
  0x042C0D $8BFD: C-----  20 C0 00 JSR  $00C0
  0x042C10 $8C00: C-----  00       BRK  
  0x042C11 $8C01: C-----  00       BRK  
  0x042C12 $8C02: C-----  00       BRK  
  0x042C13 $8C03: C-----  00       BRK  
  0x042C14 $8C04: C-----  00       BRK  
  0x042C15 $8C05: C-----  00       BRK  
  0x042C16 $8C06: C-----  90 68    BCC  $8C70
  0x042C18 $8C08: C-----  00       BRK  
  0x042C19 $8C09: C-----  00       BRK  
  0x042C1A $8C0A: C-----  00       BRK  
  0x042C1B $8C0B: C-----  00       BRK  
  0x042C1C $8C0C: C-----  00       BRK  
  0x042C1D $8C0D: C-----  00       BRK  
  0x042C1E $8C0E: C-----  00       BRK  
  0x042C1F $8C0F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042C20 $8C10: C-----  00       BRK  
  0x042C21 $8C11: C-----  00       BRK  
  0x042C22 $8C12: C-----  00       BRK  
  0x042C23 $8C13: C-----  00       BRK  
  0x042C24 $8C14: C-----  00       BRK  
  0x042C25 $8C15: C-----  00       BRK  
  0x042C26 $8C16: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042C27 $8C17: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x042C28 $8C18: C-----  00       BRK  
  0x042C29 $8C19: C-----  00       BRK  
  0x042C2A $8C1A: C-----  00       BRK  
  0x042C2B $8C1B: C-----  00       BRK  
  0x042C2C $8C1C: C-----  00       BRK  
  0x042C2D $8C1D: C-----  00       BRK  
  0x042C2E $8C1E: C-----  00       BRK  
  0x042C2F $8C1F: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x042C30 $8C20: C-----  18       CLC  
  0x042C31 $8C21: C-----  0A       ASL  A
  0x042C32 $8C22: C-----  06 02    ASL  $02
  0x042C34 $8C24: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042C35 $8C25: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042C36 $8C26: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042C37 $8C27: C-----  56 E0    LSR  $E0,X
  0x042C39 $8C29: C-----  F0 F8    BEQ  $8C23
  0x042C3B $8C2B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042C3C $8C2C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042C3D $8C2D: C-----  F8       SED  
  0x042C3E $8C2E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042C3F $8C2F: C-----  A8       TAY  
  0x042C40 $8C30: C-----  00       BRK  
  0x042C41 $8C31: C-----  01 01    ORA  ($01,X)
  0x042C43 $8C33: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042C44 $8C34: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042C45 $8C35: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042C46 $8C36: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042C47 $8C37: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042C48 $8C38: C-----  00       BRK  
  0x042C49 $8C39: C-----  00       BRK  
  0x042C4A $8C3A: C-----  00       BRK  
  0x042C4B $8C3B: C-----  01 01    ORA  ($01,X)
  0x042C4D $8C3D: C-----  01 01    ORA  ($01,X)
  0x042C4F $8C3F: C-----  01 00    ORA  ($00,X)
  0x042C51 $8C41: C-----  00       BRK  
  0x042C52 $8C42: C-----  00       BRK  
  0x042C53 $8C43: C-----  00       BRK  
  0x042C54 $8C44: C-----  00       BRK  
  0x042C55 $8C45: C-----  00       BRK  
  0x042C56 $8C46: C-----  C0 20    CPY  #$20
  0x042C58 $8C48: C-----  00       BRK  
  0x042C59 $8C49: C-----  00       BRK  
  0x042C5A $8C4A: C-----  00       BRK  
  0x042C5B $8C4B: C-----  00       BRK  
  0x042C5C $8C4C: C-----  00       BRK  
  0x042C5D $8C4D: C-----  00       BRK  
  0x042C5E $8C4E: C-----  00       BRK  
  0x042C5F $8C4F: C-----  C0 00    CPY  #$00
  0x042C61 $8C51: C-----  08       PHP  
  0x042C62 $8C52: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x042C63 $8C53: C-----  0A       ASL  A
  0x042C64 $8C54: C-----  09 08    ORA  #$08
  0x042C66 $8C56: C-----  08       PHP  
  0x042C67 $8C57: C-----  28       PLP  
  0x042C68 $8C58: C-----  00       BRK  
  0x042C69 $8C59: C-----  00       BRK  
  0x042C6A $8C5A: C-----  00       BRK  
  0x042C6B $8C5B: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042C6C $8C5C: C-----  06 07    ASL  $07
  0x042C6E $8C5E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042C6F $8C5F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042C70 $8C60: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x042C71 $8C61: C-----  20 08 44 JSR  $4408
  0x042C74 $8C64: C-----  88       DEY  
  0x042C75 $8C65: C-----  00       BRK  
  0x042C76 $8C66: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x042C77 $8C67: C-----  F5 3D    SBC  $3D,X
  0x042C79 $8C69: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x042C7A $8C6A: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x042C7B $8C6B: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x042C7C $8C6C: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x042C7D $8C6D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042C7E $8C6E: C-----  DD 2A 18 CMP  $182A,X
  0x042C81 $8C71: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042C82 $8C72: C-----  24 12    BIT  $12
  0x042C84 $8C74: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x042C85 $8C75: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042C86 $8C76: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x042C87 $8C77: C-----  AC E0 F8 LDY  $F8E0
  0x042C8A $8C7A: C-----  D8       CLD  
  0x042C8B $8C7B: C-----  EC BC FC CPX  $FCBC
  0x042C8E $8C7E: C-----  A8       TAY  
  0x042C8F $8C7F: C-----  50 FA    BVC  $8C7B
  0x042C91 $8C81: C-----  EC F8 F8 CPX  $F8F8
  0x042C94 $8C84: C-----  F8       SED  
  0x042C95 $8C85: C-----  30 E0    BMI  $8C67
  0x042C97 $8C87: C-----  C0 A0    CPY  #$A0
  0x042C99 $8C89: C-----  50 F0    BVC  $8C7B
  0x042C9B $8C8B: C-----  D0 30    BNE  $8CBD
  0x042C9D $8C8D: C-----  E0 C0    CPX  #$C0
  0x042C9F $8C8F: C-----  00       BRK  
  0x042CA0 $8C90: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042CA1 $8C91: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042CA2 $8C92: C-----  01 01    ORA  ($01,X)
  0x042CA4 $8C94: C-----  00       BRK  
  0x042CA5 $8C95: C-----  00       BRK  
  0x042CA6 $8C96: C-----  00       BRK  
  0x042CA7 $8C97: C-----  00       BRK  
  0x042CA8 $8C98: C-----  01 01    ORA  ($01,X)
  0x042CAA $8C9A: C-----  00       BRK  
  0x042CAB $8C9B: C-----  00       BRK  
  0x042CAC $8C9C: C-----  00       BRK  
  0x042CAD $8C9D: C-----  00       BRK  
  0x042CAE $8C9E: C-----  00       BRK  
  0x042CAF $8C9F: C-----  00       BRK  
  0x042CB0 $8CA0: C-----  00       BRK  
  0x042CB1 $8CA1: C-----  00       BRK  
  0x042CB2 $8CA2: C-----  00       BRK  
  0x042CB3 $8CA3: C-----  00       BRK  
  0x042CB4 $8CA4: C-----  D0 28    BNE  $8CCE
  0x042CB6 $8CA6: C-----  28       PLP  
  0x042CB7 $8CA7: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x042CB8 $8CA8: C-----  00       BRK  
  0x042CB9 $8CA9: C-----  00       BRK  
  0x042CBA $8CAA: C-----  00       BRK  
  0x042CBB $8CAB: C-----  00       BRK  
  0x042CBC $8CAC: C-----  00       BRK  
  0x042CBD $8CAD: C-----  C0 C0    CPY  #$C0
  0x042CBF $8CAF: C-----  E8       INX  
  0x042CC0 $8CB0: C-----  00       BRK  
  0x042CC1 $8CB1: C-----  00       BRK  
  0x042CC2 $8CB2: C-----  00       BRK  
  0x042CC3 $8CB3: C-----  01 01    ORA  ($01,X)
  0x042CC5 $8CB5: C-----  01 01    ORA  ($01,X)
  0x042CC7 $8CB7: C-----  01 00    ORA  ($00,X)
  0x042CC9 $8CB9: C-----  00       BRK  
  0x042CCA $8CBA: C-----  00       BRK  
  0x042CCB $8CBB: C-----  00       BRK  
  0x042CCC $8CBC: C-----  00       BRK  
  0x042CCD $8CBD: C-----  00       BRK  
  0x042CCE $8CBE: C-----  00       BRK  
  0x042CCF $8CBF: C-----  00       BRK  
  0x042CD0 $8CC0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042CD1 $8CC1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042CD2 $8CC2: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x042CD3 $8CC3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042CD4 $8CC4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042CD5 $8CC5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042CD6 $8CC6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042CD7 $8CC7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042CD8 $8CC8: C-----  B6 A1    LDX  $A1,Y
  0x042CDA $8CCA: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x042CDB $8CCB: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042CDC $8CCC: C-----  2E 16 09 ROL  $0916
  0x042CDF $8CCF: C-----  00       BRK  
  0x042CE0 $8CD0: C-----  F8       SED  
  0x042CE1 $8CD1: C-----  E8       INX  
  0x042CE2 $8CD2: C-----  F8       SED  
  0x042CE3 $8CD3: C-----  F8       SED  
  0x042CE4 $8CD4: C-----  F8       SED  
  0x042CE5 $8CD5: C-----  30 E0    BMI  $8CB7
  0x042CE7 $8CD7: C-----  C0 A0    CPY  #$A0
  0x042CE9 $8CD9: C-----  D0 F0    BNE  $8CCB
  0x042CEB $8CDB: C-----  D0 30    BNE  $8D0D
  0x042CED $8CDD: C-----  E0 C0    CPX  #$C0
  0x042CEF $8CDF: C-----  00       BRK  
  0x042CF0 $8CE0: C-----  60       RTS  
  0x042CF1 $8CE1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042CF2 $8CE2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042CF3 $8CE3: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x042CF4 $8CE4: C-----  1E 3F 3F ASL  $3F3F,X
  0x042CF7 $8CE7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042CF8 $8CE8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042CF9 $8CE9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042CFA $8CEA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042CFB $8CEB: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x042CFC $8CEC: C-----  ED DE D1 SBC  $D1DE
  0x042CFF $8CEF: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x042D00 $8CF0: C-----  30 08    BMI  $8CFA
  0x042D02 $8CF2: C-----  08       PHP  
  0x042D03 $8CF3: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x042D04 $8CF4: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x042D05 $8CF5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042D06 $8CF6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042D07 $8CF7: C-----  F8       SED  
  0x042D08 $8CF8: C-----  C0 F0    CPY  #$F0
  0x042D0A $8CFA: C-----  F0 E8    BEQ  $8CE4
  0x042D0C $8CFC: C-----  D0 38    BNE  $8D36
  0x042D0E $8CFE: C-----  F0 E8    BEQ  $8CE8
  0x042D10 $8D00: C-----  00       BRK  
  0x042D11 $8D01: C-----  00       BRK  
  0x042D12 $8D02: C-----  40       RTI  
  0x042D13 $8D03: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x042D14 $8D04: C-----  A9 65    LDA  #$65
  0x042D16 $8D06: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x042D17 $8D07: C-----  11 00    ORA  ($00),Y
  0x042D19 $8D09: C-----  00       BRK  
  0x042D1A $8D0A: C-----  00       BRK  
  0x042D1B $8D0B: C-----  00       BRK  
  0x042D1C $8D0C: C-----  10 98    BPL  $8CA6
  0x042D1E $8D0E: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x042D1F $8D0F: C-----  EE 00 00 INC  $0000
  0x042D22 $8D12: C-----  00       BRK  
  0x042D23 $8D13: C-----  00       BRK  
  0x042D24 $8D14: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042D25 $8D15: C-----  40       RTI  
  0x042D26 $8D16: C-----  20 28 00 JSR  $0028
  0x042D29 $8D19: C-----  00       BRK  
  0x042D2A $8D1A: C-----  00       BRK  
  0x042D2B $8D1B: C-----  00       BRK  
  0x042D2C $8D1C: C-----  00       BRK  
  0x042D2D $8D1D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042D2E $8D1E: C-----  C0 C0    CPY  #$C0
  0x042D30 $8D20: C-----  00       BRK  
  0x042D31 $8D21: C-----  00       BRK  
  0x042D32 $8D22: C-----  00       BRK  
  0x042D33 $8D23: C-----  00       BRK  
  0x042D34 $8D24: C-----  00       BRK  
  0x042D35 $8D25: C-----  00       BRK  
  0x042D36 $8D26: C-----  20 70 FF JSR  $FF70
  0x042D39 $8D29: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042D3A $8D2A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042D3B $8D2B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042D3C $8D2C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042D3D $8D2D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042D3E $8D2E: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x042D3F $8D2F: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x042D40 $8D30: C-----  94 0C    STY  $0C,X
  0x042D42 $8D32: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042D43 $8D33: C-----  08       PHP  
  0x042D44 $8D34: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042D45 $8D35: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x042D46 $8D36: C-----  6C 78 60 JMP  ($6078)
  0x042D49 $8D39: C-----  F0 F8    BEQ  $8D33
  0x042D4B $8D3B: C-----  F0 F8    BEQ  $8D35
  0x042D4D $8D3D: C-----  AC 90 A0 LDY  $A090
  0x042D50 $8D40: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042D51 $8D41: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x042D52 $8D42: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x042D53 $8D43: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042D54 $8D44: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x042D55 $8D45: C-----  A9 98    LDA  #$98
  0x042D57 $8D47: C-----  BC 00 05 LDY  $0500,X
  0x042D5A $8D4A: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x042D5B $8D4B: C-----  00       BRK  
  0x042D5C $8D4C: C-----  18       CLC  
  0x042D5D $8D4D: C-----  56 67    LSR  $67,X
  0x042D5F $8D4F: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x042D60 $8D50: C-----  C0 30    CPY  #$30
  0x042D62 $8D52: C-----  B8       CLV  
  0x042D63 $8D53: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x042D64 $8D54: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x042D65 $8D55: C-----  26 EE    ROL  $EE
  0x042D67 $8D57: C-----  F6 00    INC  $00,X
  0x042D69 $8D59: C-----  C0 40    CPY  #$40
  0x042D6B $8D5B: C-----  E0 E8    CPX  #$E8
  0x042D6D $8D5D: C-----  D8       CLD  
  0x042D6E $8D5E: C-----  10 08    BPL  $8D68
  0x042D70 $8D60: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042D71 $8D61: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x042D72 $8D62: C-----  58       CLI  
  0x042D73 $8D63: C-----  69 27    ADC  #$27
  0x042D75 $8D65: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x042D76 $8D66: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042D77 $8D67: C-----  00       BRK  
  0x042D78 $8D68: C-----  00       BRK  
  0x042D79 $8D69: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x042D7A $8D6A: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x042D7B $8D6B: C-----  16 18    ASL  $18,X
  0x042D7D $8D6D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042D7E $8D6E: C-----  00       BRK  
  0x042D7F $8D6F: C-----  00       BRK  
  0x042D80 $8D70: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x042D81 $8D71: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x042D82 $8D72: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x042D83 $8D73: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x042D84 $8D74: C-----  C8       INY  
  0x042D85 $8D75: C-----  B0 C0    BCS  $8D37
  0x042D87 $8D77: C-----  00       BRK  
  0x042D88 $8D78: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x042D89 $8D79: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x042D8A $8D7A: C-----  60       RTS  
  0x042D8B $8D7B: C-----  60       RTS  
  0x042D8C $8D7C: C-----  30 40    BMI  $8DBE
  0x042D8E $8D7E: C-----  00       BRK  
  0x042D8F $8D7F: C-----  00       BRK  
  0x042D90 $8D80: C-----  70 79    BVS  $8DFB
  0x042D92 $8D82: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x042D93 $8D83: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042D94 $8D84: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042D95 $8D85: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042D96 $8D86: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042D97 $8D87: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042D98 $8D88: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x042D99 $8D89: C-----  A6 50    LDX  $50
  0x042D9B $8D8B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042D9C $8D8C: C-----  2E 16 09 ROL  $0916
  0x042D9F $8D8F: C-----  00       BRK  
  0x042DA0 $8D90: C-----  F8       SED  
  0x042DA1 $8D91: C-----  E0 F8    CPX  #$F8
  0x042DA3 $8D93: C-----  F8       SED  
  0x042DA4 $8D94: C-----  F0 30    BEQ  $8DC6
  0x042DA6 $8D96: C-----  E0 C0    CPX  #$C0
  0x042DA8 $8D98: C-----  40       RTI  
  0x042DA9 $8D99: C-----  50 F0    BVC  $8D8B
  0x042DAB $8D9B: C-----  D0 20    BNE  $8DBD
  0x042DAD $8D9D: C-----  E0 C0    CPX  #$C0
  0x042DAF $8D9F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042DB0 $8DA0: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x042DB1 $8DA1: C-----  10 80    BPL  $8D23
  0x042DB3 $8DA3: C-----  00       BRK  
  0x042DB4 $8DA4: C-----  00       BRK  
  0x042DB5 $8DA5: C-----  00       BRK  
  0x042DB6 $8DA6: C-----  00       BRK  
  0x042DB7 $8DA7: C-----  08       PHP  
  0x042DB8 $8DA8: C-----  9D EF 7F STA  $7FEF,X
  0x042DBB $8DAB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042DBC $8DAC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042DBD $8DAD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042DBE $8DAE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042DBF $8DAF: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x042DC0 $8DB0: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x042DC1 $8DB1: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x042DC2 $8DB2: C-----  F8       SED  
  0x042DC3 $8DB3: C-----  B9 D7 3B LDA  $3BD7,Y
  0x042DC6 $8DB6: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x042DC7 $8DB7: C-----  00       BRK  
  0x042DC8 $8DB8: C-----  10 E3    BPL  $8D9D
  0x042DCA $8DBA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042DCB $8DBB: C-----  46 28    LSR  $28
  0x042DCD $8DBD: C-----  C4 00    CPY  $00
  0x042DCF $8DBF: C-----  00       BRK  
  0x042DD0 $8DC0: C-----  00       BRK  
  0x042DD1 $8DC1: C-----  00       BRK  
  0x042DD2 $8DC2: C-----  00       BRK  
  0x042DD3 $8DC3: C-----  00       BRK  
  0x042DD4 $8DC4: C-----  00       BRK  
  0x042DD5 $8DC5: C-----  00       BRK  
  0x042DD6 $8DC6: C-----  00       BRK  
  0x042DD7 $8DC7: C-----  00       BRK  
  0x042DD8 $8DC8: C-----  00       BRK  
  0x042DD9 $8DC9: C-----  00       BRK  
  0x042DDA $8DCA: C-----  10 10    BPL  $8DDC
  0x042DDC $8DCC: C-----  18       CLC  
  0x042DDD $8DCD: C-----  19 9F DF ORA  $DF9F,Y
  0x042DE0 $8DD0: C-----  00       BRK  
  0x042DE1 $8DD1: C-----  00       BRK  
  0x042DE2 $8DD2: C-----  10 10    BPL  $8DE4
  0x042DE4 $8DD4: C-----  18       CLC  
  0x042DE5 $8DD5: C-----  19 9F DF ORA  $DF9F,Y
  0x042DE8 $8DD8: C-----  00       BRK  
  0x042DE9 $8DD9: C-----  00       BRK  
  0x042DEA $8DDA: C-----  00       BRK  
  0x042DEB $8DDB: C-----  00       BRK  
  0x042DEC $8DDC: C-----  00       BRK  
  0x042DED $8DDD: C-----  00       BRK  
  0x042DEE $8DDE: C-----  00       BRK  
  0x042DEF $8DDF: C-----  00       BRK  
  0x042DF0 $8DE0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042DF1 $8DE1: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x042DF2 $8DE2: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x042DF3 $8DE3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042DF4 $8DE4: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x042DF5 $8DE5: C-----  0D F4 B4 ORA  $B4F4
  0x042DF8 $8DE8: C-----  F8       SED  
  0x042DF9 $8DE9: C-----  65 0C    ADC  $0C
  0x042DFB $8DEB: C-----  00       BRK  
  0x042DFC $8DEC: C-----  70 F2    BVS  $8DE0
  0x042DFE $8DEE: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x042DFF $8DEF: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x042E00 $8DF0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042E01 $8DF1: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x042E02 $8DF2: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x042E03 $8DF3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042E04 $8DF4: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x042E05 $8DF5: C-----  0D F4 B4 ORA  $B4F4
  0x042E08 $8DF8: C-----  00       BRK  
  0x042E09 $8DF9: C-----  05 0C    ORA  $0C
  0x042E0B $8DFB: C-----  00       BRK  
  0x042E0C $8DFC: C-----  70 F2    BVS  $8DF0
  0x042E0E $8DFE: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x042E0F $8DFF: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x042E10 $8E00: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x042E11 $8E01: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x042E12 $8E02: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x042E13 $8E03: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042E14 $8E04: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042E15 $8E05: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042E16 $8E06: C-----  01 D6    ORA  ($D6,X)
  0x042E18 $8E08: C-----  E8       INX  
  0x042E19 $8E09: C-----  E8       INX  
  0x042E1A $8E0A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042E1B $8E0B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042E1C $8E0C: C-----  F8       SED  
  0x042E1D $8E0D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042E1E $8E0E: C-----  FE 28 EF INC  $EF28,X
  0x042E21 $8E11: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x042E22 $8E12: C-----  F8       SED  
  0x042E23 $8E13: C-----  B9 D7 3B LDA  $3BD7,Y
  0x042E26 $8E16: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x042E27 $8E17: C-----  00       BRK  
  0x042E28 $8E18: C-----  10 E3    BPL  $8DFD
  0x042E2A $8E1A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042E2B $8E1B: C-----  46 28    LSR  $28
  0x042E2D $8E1D: C-----  C4 00    CPY  $00
  0x042E2F $8E1F: C-----  00       BRK  
  0x042E30 $8E20: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042E31 $8E21: C-----  20 40 80 JSR  $8040
  0x042E34 $8E24: C-----  88       DEY  
  0x042E35 $8E25: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x042E36 $8E26: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x042E37 $8E27: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042E38 $8E28: C-----  00       BRK  
  0x042E39 $8E29: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042E3A $8E2A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042E3B $8E2B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042E3C $8E2C: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x042E3D $8E2D: C-----  69 4E    ADC  #$4E
  0x042E3F $8E2F: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x042E40 $8E30: C-----  00       BRK  
  0x042E41 $8E31: C-----  E0 1A    CPX  #$1A
  0x042E43 $8E33: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042E44 $8E34: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042E45 $8E35: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x042E46 $8E36: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042E47 $8E37: C-----  F8       SED  
  0x042E48 $8E38: C-----  00       BRK  
  0x042E49 $8E39: C-----  00       BRK  
  0x042E4A $8E3A: C-----  E0 FC    CPX  #$FC
  0x042E4C $8E3C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042E4D $8E3D: C-----  E8       INX  
  0x042E4E $8E3E: C-----  10 F0    BPL  $8E30
  0x042E50 $8E40: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042E51 $8E41: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x042E52 $8E42: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042E53 $8E43: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042E54 $8E44: C-----  7E 3E 1F ROR  $1F3E,X
  0x042E57 $8E47: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042E58 $8E48: C-----  58       CLI  
  0x042E59 $8E49: C-----  5D 3F 3E EOR  $3E3F,X
  0x042E5C $8E4C: C-----  2D 17 09 AND  $0917
  0x042E5F $8E4F: C-----  00       BRK  
  0x042E60 $8E50: C-----  F8       SED  
  0x042E61 $8E51: C-----  D0 F8    BNE  $8E4B
  0x042E63 $8E53: C-----  F8       SED  
  0x042E64 $8E54: C-----  78       SEI  
  0x042E65 $8E55: C-----  30 E0    BMI  $8E37
  0x042E67 $8E57: C-----  C0 40    CPY  #$40
  0x042E69 $8E59: C-----  E0 D0    CPX  #$D0
  0x042E6B $8E5B: C-----  30 B0    BMI  $8E0D
  0x042E6D $8E5D: C-----  E0 C0    CPX  #$C0
  0x042E6F $8E5F: C-----  00       BRK  
  0x042E70 $8E60: C-----  00       BRK  
  0x042E71 $8E61: C-----  00       BRK  
  0x042E72 $8E62: C-----  00       BRK  
  0x042E73 $8E63: C-----  00       BRK  
  0x042E74 $8E64: C-----  00       BRK  
  0x042E75 $8E65: C-----  00       BRK  
  0x042E76 $8E66: C-----  00       BRK  
  0x042E77 $8E67: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042E78 $8E68: C-----  00       BRK  
  0x042E79 $8E69: C-----  00       BRK  
  0x042E7A $8E6A: C-----  00       BRK  
  0x042E7B $8E6B: C-----  00       BRK  
  0x042E7C $8E6C: C-----  00       BRK  
  0x042E7D $8E6D: C-----  00       BRK  
  0x042E7E $8E6E: C-----  00       BRK  
  0x042E7F $8E6F: C-----  00       BRK  
  0x042E80 $8E70: C-----  00       BRK  
  0x042E81 $8E71: C-----  00       BRK  
  0x042E82 $8E72: C-----  00       BRK  
  0x042E83 $8E73: C-----  00       BRK  
  0x042E84 $8E74: C-----  00       BRK  
  0x042E85 $8E75: C-----  00       BRK  
  0x042E86 $8E76: C-----  00       BRK  
  0x042E87 $8E77: C-----  C0 00    CPY  #$00
  0x042E89 $8E79: C-----  00       BRK  
  0x042E8A $8E7A: C-----  00       BRK  
  0x042E8B $8E7B: C-----  00       BRK  
  0x042E8C $8E7C: C-----  00       BRK  
  0x042E8D $8E7D: C-----  00       BRK  
  0x042E8E $8E7E: C-----  00       BRK  
  0x042E8F $8E7F: C-----  00       BRK  
  0x042E90 $8E80: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042E91 $8E81: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042E92 $8E82: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x042E93 $8E83: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042E94 $8E84: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042E95 $8E85: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042E96 $8E86: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042E97 $8E87: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042E98 $8E88: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x042E99 $8E89: C-----  28       PLP  
  0x042E9A $8E8A: C-----  1D 3F 36 ORA  $363F,X
  0x042E9D $8E8D: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x042E9E $8E8E: C-----  0D 00 F8 ORA  $F800
  0x042EA1 $8E91: C-----  E0 F8    CPX  #$F8
  0x042EA3 $8E93: C-----  F8       SED  
  0x042EA4 $8E94: C-----  F0 F0    BEQ  $8E86
  0x042EA6 $8E96: C-----  E0 C0    CPX  #$C0
  0x042EA8 $8E98: C-----  E0 50    CPX  #$50
  0x042EAA $8E9A: C-----  F0 D0    BEQ  $8E6C
  0x042EAC $8E9C: C-----  20 E0 C0 JSR  $C0E0
  0x042EAF $8E9F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042EB0 $8EA0: C-----  30 40    BMI  $8EE2
  0x042EB2 $8EA2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042EB3 $8EA3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042EB4 $8EA4: C-----  00       BRK  
  0x042EB5 $8EA5: C-----  00       BRK  
  0x042EB6 $8EA6: C-----  26 77    ROL  $77
  0x042EB8 $8EA8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042EB9 $8EA9: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042EBA $8EAA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042EBB $8EAB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042EBC $8EAC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042EBD $8EAD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042EBE $8EAE: C-----  D9 AA A8 CMP  $A8AA,Y
  0x042EC1 $8EB1: C-----  10 04    BPL  $8EB7
  0x042EC3 $8EB3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042EC4 $8EB4: C-----  00       BRK  
  0x042EC5 $8EB5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042EC6 $8EB6: C-----  96 F4    STX  $F4,Y
  0x042EC8 $8EB8: C-----  40       RTI  
  0x042EC9 $8EB9: C-----  E8       INX  
  0x042ECA $8EBA: C-----  F8       SED  
  0x042ECB $8EBB: C-----  F8       SED  
  0x042ECC $8EBC: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042ECD $8EBD: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042ECE $8EBE: C-----  68       PLA  
  0x042ECF $8EBF: C-----  98       TYA  
  0x042ED0 $8EC0: C-----  00       BRK  
  0x042ED1 $8EC1: C-----  00       BRK  
  0x042ED2 $8EC2: C-----  00       BRK  
  0x042ED3 $8EC3: C-----  00       BRK  
  0x042ED4 $8EC4: C-----  00       BRK  
  0x042ED5 $8EC5: C-----  00       BRK  
  0x042ED6 $8EC6: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x042ED7 $8EC7: C-----  C4 00    CPY  $00
  0x042ED9 $8EC9: C-----  00       BRK  
  0x042EDA $8ECA: C-----  00       BRK  
  0x042EDB $8ECB: C-----  00       BRK  
  0x042EDC $8ECC: C-----  00       BRK  
  0x042EDD $8ECD: C-----  00       BRK  
  0x042EDE $8ECE: C-----  00       BRK  
  0x042EDF $8ECF: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x042EE0 $8ED0: C-----  00       BRK  
  0x042EE1 $8ED1: C-----  00       BRK  
  0x042EE2 $8ED2: C-----  00       BRK  
  0x042EE3 $8ED3: C-----  00       BRK  
  0x042EE4 $8ED4: C-----  00       BRK  
  0x042EE5 $8ED5: C-----  00       BRK  
  0x042EE6 $8ED6: C-----  A0 68    LDY  #$68
  0x042EE8 $8ED8: C-----  00       BRK  
  0x042EE9 $8ED9: C-----  00       BRK  
  0x042EEA $8EDA: C-----  00       BRK  
  0x042EEB $8EDB: C-----  00       BRK  
  0x042EEC $8EDC: C-----  00       BRK  
  0x042EED $8EDD: C-----  00       BRK  
  0x042EEE $8EDE: C-----  00       BRK  
  0x042EEF $8EDF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042EF0 $8EE0: C-----  11 1E    ORA  ($1E),Y
  0x042EF2 $8EE2: C-----  10 10    BPL  $8EF4
  0x042EF4 $8EE4: C-----  08       PHP  
  0x042EF5 $8EE5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x042EF6 $8EE6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x042EF7 $8EE7: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x042EF8 $8EE8: C-----  00       BRK  
  0x042EF9 $8EE9: C-----  01 0F    ORA  ($0F,X)
  0x042EFB $8EEB: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042EFC $8EEC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042EFD $8EED: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x042EFE $8EEE: C-----  00       BRK  
  0x042EFF $8EEF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x042F00 $8EF0: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x042F01 $8EF1: C-----  06 24    ASL  $24
  0x042F03 $8EF3: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x042F04 $8EF4: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x042F05 $8EF5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x042F06 $8EF6: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x042F07 $8EF7: C-----  AC E0 F8 LDY  $F8E0
  0x042F0A $8EFA: C-----  D8       CLD  
  0x042F0B $8EFB: C-----  EC BC FC CPX  $FCBC
  0x042F0E $8EFE: C-----  A8       TAY  
  0x042F0F $8EFF: C-----  50 1F    BVC  $8F20
  0x042F11 $8F01: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042F12 $8F02: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x042F13 $8F03: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042F14 $8F04: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042F15 $8F05: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042F16 $8F06: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042F17 $8F07: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042F18 $8F08: C-----  E5 E8    SBC  $E8
  0x042F1A $8F0A: C-----  59 1F 2E EOR  $2E1F,Y
  0x042F1D $8F0D: C-----  16 09    ASL  $09,X
  0x042F1F $8F0F: C-----  00       BRK  
  0x042F20 $8F10: C-----  24 34    BIT  $34
  0x042F22 $8F12: C-----  2E 21 10 ROL  $1021
  0x042F25 $8F15: C-----  10 2E    BPL  $8F45
  0x042F27 $8F17: C-----  18       CLC  
  0x042F28 $8F18: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x042F29 $8F19: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x042F2A $8F1A: C-----  11 1E    ORA  ($1E),Y
  0x042F2C $8F1C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042F2D $8F1D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042F2E $8F1E: C-----  01 07    ORA  ($07,X)
  0x042F30 $8F20: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x042F31 $8F21: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x042F32 $8F22: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x042F33 $8F23: C-----  26 39    ROL  $39
  0x042F35 $8F25: C-----  71 70    ADC  ($70),Y
  0x042F37 $8F27: C-----  70 00    BVS  $8F29
  0x042F39 $8F29: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x042F3A $8F2A: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x042F3B $8F2B: C-----  19 06 0E ORA  $0E06,Y
  0x042F3E $8F2E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042F3F $8F2F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x042F40 $8F30: C-----  C0 B0    CPY  #$B0
  0x042F42 $8F32: C-----  48       PHA  
  0x042F43 $8F33: C-----  EC F4 E2 CPX  $E2F4
  0x042F46 $8F36: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x042F47 $8F37: C-----  !!UNDEF $92  ; unknown opcode, treating as data
  0x042F48 $8F38: C-----  00       BRK  
  0x042F49 $8F39: C-----  40       RTI  
  0x042F4A $8F3A: C-----  B0 10    BCS  $8F4C
  0x042F4C $8F3C: C-----  08       PHP  
  0x042F4D $8F3D: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x042F4E $8F3E: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x042F4F $8F3F: C-----  6C 49 47 JMP  ($4749)
  0x042F52 $8F42: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x042F53 $8F43: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x042F54 $8F44: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x042F55 $8F45: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x042F56 $8F46: C-----  0D 03 36 ORA  $3603
  0x042F59 $8F49: C-----  38       SEC  
  0x042F5A $8F4A: C-----  38       SEC  
  0x042F5B $8F4B: C-----  10 08    BPL  $8F55
  0x042F5D $8F4D: C-----  0D 02 00 ORA  $0002
  0x042F60 $8F50: C-----  0E 0E 8E ASL  $8E0E
  0x042F63 $8F53: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x042F64 $8F54: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x042F65 $8F55: C-----  C8       INY  
  0x042F66 $8F56: C-----  30 C0    BMI  $8F18
  0x042F68 $8F58: C-----  F0 F0    BEQ  $8F4A
  0x042F6A $8F5A: C-----  70 60    BVS  $8FBC
  0x042F6C $8F5C: C-----  98       TYA  
  0x042F6D $8F5D: C-----  30 C0    BMI  $8F1F
  0x042F6F $8F5F: C-----  00       BRK  
  0x042F70 $8F60: C-----  00       BRK  
  0x042F71 $8F61: C-----  00       BRK  
  0x042F72 $8F62: C-----  00       BRK  
  0x042F73 $8F63: C-----  00       BRK  
  0x042F74 $8F64: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042F75 $8F65: C-----  38       SEC  
  0x042F76 $8F66: C-----  71 FF    ADC  ($FF),Y
  0x042F78 $8F68: C-----  00       BRK  
  0x042F79 $8F69: C-----  00       BRK  
  0x042F7A $8F6A: C-----  00       BRK  
  0x042F7B $8F6B: C-----  00       BRK  
  0x042F7C $8F6C: C-----  00       BRK  
  0x042F7D $8F6D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x042F7E $8F6E: C-----  0E 00 FF ASL  $FF00
  0x042F81 $8F71: C-----  F1 E0    SBC  ($E0),Y
  0x042F83 $8F73: C-----  E0 E0    CPX  #$E0
  0x042F85 $8F75: C-----  E0 D1    CPX  #$D1
  0x042F87 $8F77: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x042F88 $8F78: C-----  00       BRK  
  0x042F89 $8F79: C-----  0E 1F 1F ASL  $1F1F
  0x042F8C $8F7C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042F8D $8F7D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042F8E $8F7E: C-----  2E 70 03 ROL  $0370
  0x042F91 $8F81: C-----  0A       ASL  A
  0x042F92 $8F82: C-----  11 19    ORA  ($19),Y
  0x042F94 $8F84: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042F95 $8F85: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x042F96 $8F86: C-----  79 DD 03 ADC  $03DD,Y
  0x042F99 $8F89: C-----  1E 17 1F ASL  $1F17,X
  0x042F9C $8F8C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042F9D $8F8D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042F9E $8F8E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042F9F $8F8F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042FA0 $8F90: C-----  40       RTI  
  0x042FA1 $8F91: C-----  C0 F0    CPY  #$F0
  0x042FA3 $8F93: C-----  F8       SED  
  0x042FA4 $8F94: C-----  68       PLA  
  0x042FA5 $8F95: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x042FA6 $8F96: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x042FA7 $8F97: C-----  FE 50 E0 INC  $E050,X
  0x042FAA $8F9A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x042FAB $8F9B: C-----  F9 FF FF SBC  $FFFF,Y
  0x042FAE $8F9E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042FAF $8F9F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042FB0 $8FA0: C-----  7D 01 02 ADC  $0201,X
  0x042FB3 $8FA3: C-----  10 00    BPL  $8FA5
  0x042FB5 $8FA5: C-----  00       BRK  
  0x042FB6 $8FA6: C-----  00       BRK  
  0x042FB7 $8FA7: C-----  00       BRK  
  0x042FB8 $8FA8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x042FB9 $8FA9: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042FBA $8FAA: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x042FBB $8FAB: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x042FBC $8FAC: C-----  01 00    ORA  ($00,X)
  0x042FBE $8FAE: C-----  00       BRK  
  0x042FBF $8FAF: C-----  00       BRK  
  0x042FC0 $8FB0: C-----  F1 26    SBC  ($26),Y
  0x042FC2 $8FB2: C-----  00       BRK  
  0x042FC3 $8FB3: C-----  8E 00 00 STX  $0000
  0x042FC6 $8FB6: C-----  00       BRK  
  0x042FC7 $8FB7: C-----  00       BRK  
  0x042FC8 $8FB8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042FC9 $8FB9: C-----  FE FD FE INC  $FEFD,X
  0x042FCC $8FBC: C-----  68       PLA  
  0x042FCD $8FBD: C-----  30 00    BMI  $8FBF
  0x042FCF $8FBF: C-----  00       BRK  
  0x042FD0 $8FC0: C-----  AD AB A6 LDA  $A6AB
  0x042FD3 $8FC3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042FD4 $8FC4: C-----  F8       SED  
  0x042FD5 $8FC5: C-----  B8       CLV  
  0x042FD6 $8FC6: C-----  50 A8    BVC  $8F70
  0x042FD8 $8FC8: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x042FD9 $8FC9: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x042FDA $8FCA: C-----  59 E0 07 EOR  $07E0,Y
  0x042FDD $8FCD: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x042FDE $8FCE: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x042FDF $8FCF: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x042FE0 $8FD0: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x042FE1 $8FD1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042FE2 $8FD2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x042FE3 $8FD3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042FE4 $8FD4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x042FE5 $8FD5: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x042FE6 $8FD6: C-----  08       PHP  
  0x042FE7 $8FD7: C-----  10 60    BPL  $9039
  0x042FE9 $8FD9: C-----  E0 C0    CPX  #$C0
  0x042FEB $8FDB: C-----  00       BRK  
  0x042FEC $8FDC: C-----  E0 F3    CPX  #$F3
  0x042FEE $8FDE: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x042FEF $8FDF: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x042FF0 $8FE0: C-----  BD 99 C7 LDA  $C799,X
  0x042FF3 $8FE3: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x042FF4 $8FE4: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x042FF5 $8FE5: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x042FF6 $8FE6: C-----  00       BRK  
  0x042FF7 $8FE7: C-----  00       BRK  
  0x042FF8 $8FE8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042FF9 $8FE9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042FFA $8FEA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042FFB $8FEB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042FFC $8FEC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042FFD $8FED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x042FFE $8FEE: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x042FFF $8FEF: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x043000 $8FF0: C-----  00       BRK  
  0x043001 $8FF1: C-----  00       BRK  
  0x043002 $8FF2: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x043003 $8FF3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043004 $8FF4: C-----  25 0E    AND  $0E
  0x043006 $8FF6: C-----  15 0B    ORA  $0B,X
  0x043008 $8FF8: C-----  00       BRK  
  0x043009 $8FF9: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04300A $8FFA: C-----  2A       ROL  A
  0x04300B $8FFB: C-----  7D 5A 71 ADC  $715A,X
  0x04300E $8FFE: C-----  2A       ROL  A
  0x04300F $8FFF: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x043010 $9000: C-----  00       BRK  
  0x043011 $9001: C-----  00       BRK  
  0x043012 $9002: C-----  00       BRK  
  0x043013 $9003: C-----  00       BRK  
  0x043014 $9004: C-----  00       BRK  
  0x043015 $9005: C-----  00       BRK  
  0x043016 $9006: C-----  00       BRK  
  0x043017 $9007: C-----  00       BRK  
  0x043018 $9008: C-----  00       BRK  
  0x043019 $9009: C-----  00       BRK  
  0x04301A $900A: C-----  00       BRK  
  0x04301B $900B: C-----  00       BRK  
  0x04301C $900C: C-----  00       BRK  
  0x04301D $900D: C-----  00       BRK  
  0x04301E $900E: C-----  00       BRK  
  0x04301F $900F: C-----  00       BRK  
  0x043020 $9010: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043021 $9011: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043022 $9012: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043023 $9013: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043024 $9014: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043025 $9015: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043026 $9016: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043027 $9017: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043028 $9018: C-----  00       BRK  
  0x043029 $9019: C-----  00       BRK  
  0x04302A $901A: C-----  00       BRK  
  0x04302B $901B: C-----  00       BRK  
  0x04302C $901C: C-----  00       BRK  
  0x04302D $901D: C-----  00       BRK  
  0x04302E $901E: C-----  00       BRK  
  0x04302F $901F: C-----  00       BRK  
  0x043030 $9020: C-----  6E 1E 2E ROR  $2E1E
  0x043033 $9023: C-----  1E 7E 3C ASL  $3C7E,X
  0x043036 $9026: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x043037 $9027: C-----  18       CLC  
  0x043038 $9028: C-----  10 20    BPL  $904A
  0x04303A $902A: C-----  10 20    BPL  $904C
  0x04303C $902C: C-----  00       BRK  
  0x04303D $902D: C-----  00       BRK  
  0x04303E $902E: C-----  00       BRK  
  0x04303F $902F: C-----  00       BRK  
  0x043040 $9030: C-----  00       BRK  
  0x043041 $9031: C-----  00       BRK  
  0x043042 $9032: C-----  01 01    ORA  ($01,X)
  0x043044 $9034: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043045 $9035: C-----  06 0E    ASL  $0E
  0x043047 $9037: C-----  1E 00 00 ASL  $0000,X
  0x04304A $903A: C-----  00       BRK  
  0x04304B $903B: C-----  00       BRK  
  0x04304C $903C: C-----  00       BRK  
  0x04304D $903D: C-----  01 05    ORA  ($05,X)
  0x04304F $903F: C-----  0D 01 01 ORA  $0101
  0x043052 $9042: C-----  00       BRK  
  0x043053 $9043: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043054 $9044: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x043055 $9045: C-----  10 20    BPL  $9067
  0x043057 $9047: C-----  40       RTI  
  0x043058 $9048: C-----  00       BRK  
  0x043059 $9049: C-----  00       BRK  
  0x04305A $904A: C-----  00       BRK  
  0x04305B $904B: C-----  00       BRK  
  0x04305C $904C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04305D $904D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04305E $904E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04305F $904F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x043060 $9050: C-----  00       BRK  
  0x043061 $9051: C-----  00       BRK  
  0x043062 $9052: C-----  00       BRK  
  0x043063 $9053: C-----  00       BRK  
  0x043064 $9054: C-----  00       BRK  
  0x043065 $9055: C-----  00       BRK  
  0x043066 $9056: C-----  00       BRK  
  0x043067 $9057: C-----  00       BRK  
  0x043068 $9058: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043069 $9059: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04306A $905A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04306B $905B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04306C $905C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04306D $905D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04306E $905E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04306F $905F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043070 $9060: C-----  41 81    EOR  ($81,X)
  0x043072 $9062: C-----  01 00    ORA  ($00,X)
  0x043074 $9064: C-----  00       BRK  
  0x043075 $9065: C-----  00       BRK  
  0x043076 $9066: C-----  00       BRK  
  0x043077 $9067: C-----  00       BRK  
  0x043078 $9068: C-----  3E 7E FE ROL  $FE7E,X
  0x04307B $906B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04307C $906C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04307D $906D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04307E $906E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04307F $906F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043080 $9070: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043081 $9071: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043082 $9072: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043083 $9073: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043084 $9074: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043085 $9075: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043086 $9076: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x043087 $9077: C-----  55 F8    EOR  $F8,X
  0x043089 $9079: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04308A $907A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04308B $907B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04308C $907C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04308D $907D: C-----  B8       CLV  
  0x04308E $907E: C-----  C5 AA    CMP  $AA
  0x043090 $9080: C-----  00       BRK  
  0x043091 $9081: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043092 $9082: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x043093 $9083: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x043094 $9084: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x043095 $9085: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x043096 $9086: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x043097 $9087: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043098 $9088: C-----  00       BRK  
  0x043099 $9089: C-----  00       BRK  
  0x04309A $908A: C-----  0D 18 1D ORA  $1D18
  0x04309D $908D: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04309E $908E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04309F $908F: C-----  06 3E    ASL  $3E
  0x0430A1 $9091: C-----  7E FE FF ROR  $FFFE,X
  0x0430A4 $9094: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0430A5 $9095: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0430A6 $9096: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x0430A7 $9097: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0430A8 $9098: C-----  1D 3D 7D ORA  $7D3D,X
  0x0430AB $909B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0430AC $909C: C-----  78       SEI  
  0x0430AD $909D: C-----  E0 00    CPX  #$00
  0x0430AF $909F: C-----  00       BRK  
  0x0430B0 $90A0: C-----  06 00    ASL  $00
  0x0430B2 $90A2: C-----  00       BRK  
  0x0430B3 $90A3: C-----  01 03    ORA  ($03,X)
  0x0430B5 $90A5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0430B6 $90A6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0430B7 $90A7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0430B8 $90A8: C-----  00       BRK  
  0x0430B9 $90A9: C-----  00       BRK  
  0x0430BA $90AA: C-----  00       BRK  
  0x0430BB $90AB: C-----  00       BRK  
  0x0430BC $90AC: C-----  01 03    ORA  ($03,X)
  0x0430BE $90AE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0430BF $90AF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0430C0 $90B0: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0430C1 $90B1: C-----  38       SEC  
  0x0430C2 $90B2: C-----  FE FF FF INC  $FFFF,X
  0x0430C5 $90B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0430C6 $90B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0430C7 $90B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0430C8 $90B8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0430C9 $90B9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0430CA $90BA: C-----  39 7C FE AND  $FE7C,Y
  0x0430CD $90BD: C-----  FE FF FF INC  $FFFF,X
  0x0430D0 $90C0: C-----  00       BRK  
  0x0430D1 $90C1: C-----  00       BRK  
  0x0430D2 $90C2: C-----  00       BRK  
  0x0430D3 $90C3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0430D4 $90C4: C-----  70 80    BVS  $9046
  0x0430D6 $90C6: C-----  00       BRK  
  0x0430D7 $90C7: C-----  00       BRK  
  0x0430D8 $90C8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0430D9 $90C9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0430DA $90CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0430DB $90CB: C-----  F0 80    BEQ  $904D
  0x0430DD $90CD: C-----  00       BRK  
  0x0430DE $90CE: C-----  00       BRK  
  0x0430DF $90CF: C-----  00       BRK  
  0x0430E0 $90D0: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x0430E1 $90D1: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x0430E2 $90D2: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0430E3 $90D3: C-----  96 E4    STX  $E4,Y
  0x0430E5 $90D5: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x0430E6 $90D6: C-----  2C 5C D4 BIT  $D45C
  0x0430E9 $90D9: C-----  E8       INX  
  0x0430EA $90DA: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0430EB $90DB: C-----  68       PLA  
  0x0430EC $90DC: C-----  18       CLC  
  0x0430ED $90DD: C-----  08       PHP  
  0x0430EE $90DE: C-----  00       BRK  
  0x0430EF $90DF: C-----  00       BRK  
  0x0430F0 $90E0: C-----  40       RTI  
  0x0430F1 $90E1: C-----  20 00 10 JSR  $1000
  0x0430F4 $90E4: C-----  00       BRK  
  0x0430F5 $90E5: C-----  A8       TAY  
  0x0430F6 $90E6: C-----  D8       CLD  
  0x0430F7 $90E7: C-----  BE BF DF LDX  $DFBF,Y
  0x0430FA $90EA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0430FB $90EB: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0430FC $90EC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0430FD $90ED: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x0430FE $90EE: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x0430FF $90EF: C-----  41 2A    EOR  ($2A,X)
  0x043101 $90F1: C-----  16 0A    ASL  $0A,X
  0x043103 $90F3: C-----  15 01    ORA  $01,X
  0x043105 $90F5: C-----  01 03    ORA  ($03,X)
  0x043107 $90F7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x043108 $90F8: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x043109 $90F9: C-----  E8       INX  
  0x04310A $90FA: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04310B $90FB: C-----  EA       NOP  
  0x04310C $90FC: C-----  FE FE FC INC  $FCFE,X
  0x04310F $90FF: C-----  C0 2B    CPY  #$2B
  0x043111 $9101: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x043112 $9102: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043113 $9103: C-----  96 E4    STX  $E4,Y
  0x043115 $9105: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x043116 $9106: C-----  2C 5C 00 BIT  $005C
  0x043119 $9109: C-----  00       BRK  
  0x04311A $910A: C-----  00       BRK  
  0x04311B $910B: C-----  00       BRK  
  0x04311C $910C: C-----  00       BRK  
  0x04311D $910D: C-----  C0 D0    CPY  #$D0
  0x04311F $910F: C-----  A0 00    LDY  #$00
  0x043121 $9111: C-----  00       BRK  
  0x043122 $9112: C-----  00       BRK  
  0x043123 $9113: C-----  00       BRK  
  0x043124 $9114: C-----  00       BRK  
  0x043125 $9115: C-----  01 02    ORA  ($02,X)
  0x043127 $9117: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043128 $9118: C-----  00       BRK  
  0x043129 $9119: C-----  00       BRK  
  0x04312A $911A: C-----  00       BRK  
  0x04312B $911B: C-----  00       BRK  
  0x04312C $911C: C-----  00       BRK  
  0x04312D $911D: C-----  00       BRK  
  0x04312E $911E: C-----  01 01    ORA  ($01,X)
  0x043130 $9120: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043131 $9121: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043132 $9122: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043133 $9123: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043134 $9124: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043135 $9125: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043136 $9126: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043137 $9127: C-----  C0 7F    CPY  #$7F
  0x043139 $9129: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04313A $912A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04313B $912B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04313C $912C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04313D $912D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04313E $912E: C-----  00       BRK  
  0x04313F $912F: C-----  00       BRK  
  0x043140 $9130: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043141 $9131: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043142 $9132: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043143 $9133: C-----  F8       SED  
  0x043144 $9134: C-----  F0 E0    BEQ  $9116
  0x043146 $9136: C-----  C0 00    CPY  #$00
  0x043148 $9138: C-----  F8       SED  
  0x043149 $9139: C-----  F8       SED  
  0x04314A $913A: C-----  F8       SED  
  0x04314B $913B: C-----  F0 E0    BEQ  $911D
  0x04314D $913D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04314E $913E: C-----  00       BRK  
  0x04314F $913F: C-----  00       BRK  
  0x043150 $9140: C-----  00       BRK  
  0x043151 $9141: C-----  00       BRK  
  0x043152 $9142: C-----  00       BRK  
  0x043153 $9143: C-----  08       PHP  
  0x043154 $9144: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x043155 $9145: C-----  4D 89 00 EOR  $0089
  0x043158 $9148: C-----  00       BRK  
  0x043159 $9149: C-----  00       BRK  
  0x04315A $914A: C-----  00       BRK  
  0x04315B $914B: C-----  00       BRK  
  0x04315C $914C: C-----  00       BRK  
  0x04315D $914D: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x04315E $914E: C-----  76 FF    ROR  $FF,X
  0x043160 $9150: C-----  00       BRK  
  0x043161 $9151: C-----  00       BRK  
  0x043162 $9152: C-----  00       BRK  
  0x043163 $9153: C-----  00       BRK  
  0x043164 $9154: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043165 $9155: C-----  E0 18    CPX  #$18
  0x043167 $9157: C-----  30 00    BMI  $9159
  0x043169 $9159: C-----  00       BRK  
  0x04316A $915A: C-----  00       BRK  
  0x04316B $915B: C-----  00       BRK  
  0x04316C $915C: C-----  00       BRK  
  0x04316D $915D: C-----  00       BRK  
  0x04316E $915E: C-----  E0 C0    CPX  #$C0
  0x043170 $9160: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043171 $9161: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043172 $9162: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043173 $9163: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043174 $9164: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043175 $9165: C-----  05 03    ORA  $03
  0x043177 $9167: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043178 $9168: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043179 $9169: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04317A $916A: C-----  01 03    ORA  ($03,X)
  0x04317C $916C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04317D $916D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04317E $916E: C-----  00       BRK  
  0x04317F $916F: C-----  00       BRK  
  0x043180 $9170: C-----  00       BRK  
  0x043181 $9171: C-----  00       BRK  
  0x043182 $9172: C-----  00       BRK  
  0x043183 $9173: C-----  55 FF    EOR  $FF,X
  0x043185 $9175: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043186 $9176: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043187 $9177: C-----  BD FF FF LDA  $FFFF,X
  0x04318A $917A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04318B $917B: C-----  AA       TAX  
  0x04318C $917C: C-----  49 B3    EOR  #$B3
  0x04318E $917E: C-----  9D BD FF STA  $FFBD,X
  0x043191 $9181: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x043192 $9182: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043193 $9183: C-----  C0 00    CPY  #$00
  0x043195 $9185: C-----  01 31    ORA  ($31,X)
  0x043197 $9187: C-----  F8       SED  
  0x043198 $9188: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x043199 $9189: C-----  C4 43    CPY  $43
  0x04319B $918B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04319C $918C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04319D $918D: C-----  FE CE 37 INC  $37CE,X
  0x0431A0 $9190: C-----  F8       SED  
  0x0431A1 $9191: C-----  E6 41    INC  $41
  0x0431A3 $9193: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x0431A4 $9194: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0431A5 $9195: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0431A6 $9196: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0431A7 $9197: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0431A8 $9198: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0431A9 $9199: C-----  18       CLC  
  0x0431AA $919A: C-----  BE 7D 7B LDX  $7B7D,Y
  0x0431AD $919D: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0431AE $919E: C-----  F0 8F    BEQ  $912F
  0x0431B0 $91A0: C-----  00       BRK  
  0x0431B1 $91A1: C-----  00       BRK  
  0x0431B2 $91A2: C-----  00       BRK  
  0x0431B3 $91A3: C-----  00       BRK  
  0x0431B4 $91A4: C-----  00       BRK  
  0x0431B5 $91A5: C-----  01 02    ORA  ($02,X)
  0x0431B7 $91A7: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0431B8 $91A8: C-----  00       BRK  
  0x0431B9 $91A9: C-----  00       BRK  
  0x0431BA $91AA: C-----  00       BRK  
  0x0431BB $91AB: C-----  00       BRK  
  0x0431BC $91AC: C-----  00       BRK  
  0x0431BD $91AD: C-----  00       BRK  
  0x0431BE $91AE: C-----  01 00    ORA  ($00,X)
  0x0431C0 $91B0: C-----  00       BRK  
  0x0431C1 $91B1: C-----  00       BRK  
  0x0431C2 $91B2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0431C3 $91B3: C-----  58       CLI  
  0x0431C4 $91B4: C-----  A0 C1    LDY  #$C1
  0x0431C6 $91B6: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0431C7 $91B7: C-----  00       BRK  
  0x0431C8 $91B8: C-----  00       BRK  
  0x0431C9 $91B9: C-----  00       BRK  
  0x0431CA $91BA: C-----  00       BRK  
  0x0431CB $91BB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0431CC $91BC: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0431CD $91BD: C-----  3E BD FF ROL  $FFBD,X
  0x0431D0 $91C0: C-----  00       BRK  
  0x0431D1 $91C1: C-----  00       BRK  
  0x0431D2 $91C2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0431D3 $91C3: C-----  E0 F0    CPX  #$F0
  0x0431D5 $91C5: C-----  F8       SED  
  0x0431D6 $91C6: C-----  F8       SED  
  0x0431D7 $91C7: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0431D8 $91C8: C-----  00       BRK  
  0x0431D9 $91C9: C-----  00       BRK  
  0x0431DA $91CA: C-----  00       BRK  
  0x0431DB $91CB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0431DC $91CC: C-----  E0 F0    CPX  #$F0
  0x0431DE $91CE: C-----  F0 78    BEQ  $9248
  0x0431E0 $91D0: C-----  08       PHP  
  0x0431E1 $91D1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0431E2 $91D2: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0431E3 $91D3: C-----  01 82    ORA  ($82,X)
  0x0431E5 $91D5: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x0431E6 $91D6: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x0431E7 $91D7: C-----  E4 F0    CPX  $F0
  0x0431E9 $91D9: C-----  F8       SED  
  0x0431EA $91DA: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0431EB $91DB: C-----  FE 7C 30 INC  $307C,X
  0x0431EE $91DE: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x0431EF $91DF: C-----  58       CLI  
  0x0431F0 $91E0: C-----  00       BRK  
  0x0431F1 $91E1: C-----  00       BRK  
  0x0431F2 $91E2: C-----  E0 80    CPX  #$80
  0x0431F4 $91E4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0431F5 $91E5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0431F6 $91E6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0431F7 $91E7: C-----  00       BRK  
  0x0431F8 $91E8: C-----  00       BRK  
  0x0431F9 $91E9: C-----  00       BRK  
  0x0431FA $91EA: C-----  00       BRK  
  0x0431FB $91EB: C-----  00       BRK  
  0x0431FC $91EC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0431FD $91ED: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0431FE $91EE: C-----  F8       SED  
  0x0431FF $91EF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043200 $91F0: C-----  00       BRK  
  0x043201 $91F1: C-----  00       BRK  
  0x043202 $91F2: C-----  00       BRK  
  0x043203 $91F3: C-----  00       BRK  
  0x043204 $91F4: C-----  00       BRK  
  0x043205 $91F5: C-----  00       BRK  
  0x043206 $91F6: C-----  00       BRK  
  0x043207 $91F7: C-----  C0 00    CPY  #$00
  0x043209 $91F9: C-----  00       BRK  
  0x04320A $91FA: C-----  00       BRK  
  0x04320B $91FB: C-----  00       BRK  
  0x04320C $91FC: C-----  00       BRK  
  0x04320D $91FD: C-----  00       BRK  
  0x04320E $91FE: C-----  00       BRK  
  0x04320F $91FF: C-----  00       BRK  
  0x043210 $9200: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043211 $9201: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043212 $9202: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043213 $9203: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043214 $9204: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043215 $9205: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x043216 $9206: C-----  0E 04 7F ASL  $7F04
  0x043219 $9209: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04321A $920A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04321B $920B: C-----  3E 3F 0E ROL  $0E3F,X
  0x04321E $920E: C-----  01 03    ORA  ($03,X)
  0x043220 $9210: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043221 $9211: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043222 $9212: C-----  F8       SED  
  0x043223 $9213: C-----  F0 B8    BEQ  $91CD
  0x043225 $9215: C-----  2C 44 82 BIT  $8244
  0x043228 $9218: C-----  F0 E0    BEQ  $91FA
  0x04322A $921A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04322B $921B: C-----  00       BRK  
  0x04322C $921C: C-----  40       RTI  
  0x04322D $921D: C-----  D0 B8    BNE  $91D7
  0x04322F $921F: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x043230 $9220: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x043231 $9221: C-----  0D 02 01 ORA  $0102
  0x043234 $9224: C-----  00       BRK  
  0x043235 $9225: C-----  00       BRK  
  0x043236 $9226: C-----  00       BRK  
  0x043237 $9227: C-----  00       BRK  
  0x043238 $9228: C-----  0D 02 01 ORA  $0102
  0x04323B $922B: C-----  00       BRK  
  0x04323C $922C: C-----  00       BRK  
  0x04323D $922D: C-----  00       BRK  
  0x04323E $922E: C-----  00       BRK  
  0x04323F $922F: C-----  00       BRK  
  0x043240 $9230: C-----  18       CLC  
  0x043241 $9231: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x043242 $9232: C-----  46 86    LSR  $86
  0x043244 $9234: C-----  CE 7C FC DEC  $FC7C
  0x043247 $9237: C-----  F8       SED  
  0x043248 $9238: C-----  E0 F0    CPX  #$F0
  0x04324A $923A: C-----  B8       CLV  
  0x04324B $923B: C-----  78       SEI  
  0x04324C $923C: C-----  30 00    BMI  $923E
  0x04324E $923E: C-----  00       BRK  
  0x04324F $923F: C-----  00       BRK  
  0x043250 $9240: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043251 $9241: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043252 $9242: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x043253 $9243: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x043254 $9244: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x043255 $9245: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043256 $9246: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043257 $9247: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043258 $9248: C-----  00       BRK  
  0x043259 $9249: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04325A $924A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04325B $924B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04325C $924C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04325D $924D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04325E $924E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04325F $924F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043260 $9250: C-----  F8       SED  
  0x043261 $9251: C-----  F8       SED  
  0x043262 $9252: C-----  F8       SED  
  0x043263 $9253: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043264 $9254: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043265 $9255: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043266 $9256: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043267 $9257: C-----  FE E0 F0 INC  $F0E0,X
  0x04326A $925A: C-----  F0 F8    BEQ  $9254
  0x04326C $925C: C-----  F8       SED  
  0x04326D $925D: C-----  F8       SED  
  0x04326E $925E: C-----  F8       SED  
  0x04326F $925F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043270 $9260: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043271 $9261: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x043272 $9262: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x043273 $9263: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x043274 $9264: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x043275 $9265: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043276 $9266: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043277 $9267: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043278 $9268: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x043279 $9269: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04327A $926A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04327B $926B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04327C $926C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04327D $926D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04327E $926E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04327F $926F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043280 $9270: C-----  E0 E0    CPX  #$E0
  0x043282 $9272: C-----  F0 F8    BEQ  $926C
  0x043284 $9274: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x043285 $9275: C-----  EA       NOP  
  0x043286 $9276: C-----  E9 D1    SBC  #$D1
  0x043288 $9278: C-----  C0 C0    CPY  #$C0
  0x04328A $927A: C-----  E0 E0    CPX  #$E0
  0x04328C $927C: C-----  E8       INX  
  0x04328D $927D: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x04328E $927E: C-----  D6 AE    DEC  $AE,X
  0x043290 $9280: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x043291 $9281: C-----  F8       SED  
  0x043292 $9282: C-----  F8       SED  
  0x043293 $9283: C-----  F0 E0    BEQ  $9265
  0x043295 $9285: C-----  00       BRK  
  0x043296 $9286: C-----  00       BRK  
  0x043297 $9287: C-----  00       BRK  
  0x043298 $9288: C-----  60       RTS  
  0x043299 $9289: C-----  00       BRK  
  0x04329A $928A: C-----  00       BRK  
  0x04329B $928B: C-----  00       BRK  
  0x04329C $928C: C-----  00       BRK  
  0x04329D $928D: C-----  00       BRK  
  0x04329E $928E: C-----  00       BRK  
  0x04329F $928F: C-----  00       BRK  
  0x0432A0 $9290: C-----  E4 C8    CPX  $C8
  0x0432A2 $9292: C-----  70 12    BVS  $92A6
  0x0432A4 $9294: C-----  08       PHP  
  0x0432A5 $9295: C-----  06 01    ASL  $01
  0x0432A7 $9297: C-----  00       BRK  
  0x0432A8 $9298: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x0432A9 $9299: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x0432AA $929A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0432AB $929B: C-----  0D 07 01 ORA  $0107
  0x0432AE $929E: C-----  00       BRK  
  0x0432AF $929F: C-----  00       BRK  
  0x0432B0 $92A0: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x0432B1 $92A1: C-----  41 21    EOR  ($21,X)
  0x0432B3 $92A3: C-----  11 0B    ORA  ($0B),Y
  0x0432B5 $92A5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0432B6 $92A6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0432B7 $92A7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0432B8 $92A8: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0432B9 $92A9: C-----  3E 1E 0E ROL  $0E1E,X
  0x0432BC $92AC: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0432BD $92AD: C-----  00       BRK  
  0x0432BE $92AE: C-----  00       BRK  
  0x0432BF $92AF: C-----  00       BRK  
  0x0432C0 $92B0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0432C1 $92B1: C-----  00       BRK  
  0x0432C2 $92B2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0432C3 $92B3: C-----  40       RTI  
  0x0432C4 $92B4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0432C5 $92B5: C-----  C0 C0    CPY  #$C0
  0x0432C7 $92B7: C-----  E0 00    CPX  #$00
  0x0432C9 $92B9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0432CA $92BA: C-----  00       BRK  
  0x0432CB $92BB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0432CC $92BC: C-----  40       RTI  
  0x0432CD $92BD: C-----  00       BRK  
  0x0432CE $92BE: C-----  00       BRK  
  0x0432CF $92BF: C-----  00       BRK  
  0x0432D0 $92C0: C-----  20 10 08 JSR  $0810
  0x0432D3 $92C3: C-----  08       PHP  
  0x0432D4 $92C4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0432D5 $92C5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0432D6 $92C6: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0432D7 $92C7: C-----  C1 C0    CMP  ($C0,X)
  0x0432D9 $92C9: C-----  E0 F0    CPX  #$F0
  0x0432DB $92CB: C-----  F0 F8    BEQ  $92C5
  0x0432DD $92CD: C-----  F8       SED  
  0x0432DE $92CE: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0432DF $92CF: C-----  3E 04 03 ROL  $0304,X
  0x0432E2 $92D2: C-----  06 04    ASL  $04
  0x0432E4 $92D4: C-----  05 07    ORA  $07
  0x0432E6 $92D6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0432E7 $92D7: C-----  01 03    ORA  ($03,X)
  0x0432E9 $92D9: C-----  00       BRK  
  0x0432EA $92DA: C-----  01 03    ORA  ($03,X)
  0x0432EC $92DC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0432ED $92DD: C-----  00       BRK  
  0x0432EE $92DE: C-----  00       BRK  
  0x0432EF $92DF: C-----  00       BRK  
  0x0432F0 $92E0: C-----  00       BRK  
  0x0432F1 $92E1: C-----  00       BRK  
  0x0432F2 $92E2: C-----  00       BRK  
  0x0432F3 $92E3: C-----  00       BRK  
  0x0432F4 $92E4: C-----  00       BRK  
  0x0432F5 $92E5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0432F6 $92E6: C-----  60       RTS  
  0x0432F7 $92E7: C-----  18       CLC  
  0x0432F8 $92E8: C-----  00       BRK  
  0x0432F9 $92E9: C-----  00       BRK  
  0x0432FA $92EA: C-----  00       BRK  
  0x0432FB $92EB: C-----  00       BRK  
  0x0432FC $92EC: C-----  00       BRK  
  0x0432FD $92ED: C-----  00       BRK  
  0x0432FE $92EE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0432FF $92EF: C-----  E0 06    CPX  #$06
  0x043301 $92F1: C-----  00       BRK  
  0x043302 $92F2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043303 $92F3: C-----  01 82    ORA  ($82,X)
  0x043305 $92F5: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x043306 $92F6: C-----  A2 C4    LDX  #$C4
  0x043308 $92F8: C-----  F8       SED  
  0x043309 $92F9: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04330A $92FA: C-----  F0 FE    BEQ  $92FA
  0x04330C $92FC: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04330D $92FD: C-----  B8       CLV  
  0x04330E $92FE: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x04330F $92FF: C-----  B8       CLV  
  0x043310 $9300: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x043311 $9301: C-----  06 05    ASL  $05
  0x043313 $9303: C-----  0A       ASL  A
  0x043314 $9304: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x043315 $9305: C-----  09 03    ORA  #$03
  0x043317 $9307: C-----  01 03    ORA  ($03,X)
  0x043319 $9309: C-----  01 02    ORA  ($02,X)
  0x04331B $930B: C-----  05 03    ORA  $03
  0x04331D $930D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04331E $930E: C-----  00       BRK  
  0x04331F $930F: C-----  00       BRK  
  0x043320 $9310: C-----  00       BRK  
  0x043321 $9311: C-----  10 55    BPL  $9368
  0x043323 $9313: C-----  B8       CLV  
  0x043324 $9314: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043325 $9315: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043326 $9316: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043327 $9317: C-----  BD FF EF LDA  $EFFF,X
  0x04332A $931A: C-----  AA       TAX  
  0x04332B $931B: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04332C $931C: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04332D $931D: C-----  39 9D BD AND  $BD9D,Y
  0x043330 $9320: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043331 $9321: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x043332 $9322: C-----  41 83    EOR  ($83,X)
  0x043334 $9324: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x043335 $9325: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043336 $9326: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043337 $9327: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043338 $9328: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043339 $9329: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04333A $932A: C-----  BE 7D 7B LDX  $7B7D,Y
  0x04333D $932D: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04333E $932E: C-----  F0 8F    BEQ  $92BF
  0x043340 $9330: C-----  6A       ROR  A
  0x043341 $9331: C-----  D5 83    CMP  $83,X
  0x043343 $9333: C-----  E1 F0    SBC  ($F0,X)
  0x043345 $9335: C-----  F8       SED  
  0x043346 $9336: C-----  F8       SED  
  0x043347 $9337: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043348 $9338: C-----  94 02    STY  $02,X
  0x04334A $933A: C-----  00       BRK  
  0x04334B $933B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04334C $933C: C-----  E0 F0    CPX  #$F0
  0x04334E $933E: C-----  F0 78    BEQ  $93B8
  0x043350 $9340: C-----  00       BRK  
  0x043351 $9341: C-----  01 00    ORA  ($00,X)
  0x043353 $9343: C-----  00       BRK  
  0x043354 $9344: C-----  40       RTI  
  0x043355 $9345: C-----  40       RTI  
  0x043356 $9346: C-----  E1 F4    SBC  ($F4,X)
  0x043358 $9348: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043359 $9349: C-----  FE FF FF INC  $FFFF,X
  0x04335C $934C: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04335D $934D: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04335E $934E: C-----  5E CB 60 LSR  $60CB,X
  0x043361 $9351: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043362 $9352: C-----  60       RTS  
  0x043363 $9353: C-----  10 08    BPL  $935D
  0x043365 $9355: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043366 $9356: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043367 $9357: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x043368 $9358: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043369 $9359: C-----  00       BRK  
  0x04336A $935A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04336B $935B: C-----  E0 F0    CPX  #$F0
  0x04336D $935D: C-----  F8       SED  
  0x04336E $935E: C-----  F8       SED  
  0x04336F $935F: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x043370 $9360: C-----  00       BRK  
  0x043371 $9361: C-----  00       BRK  
  0x043372 $9362: C-----  00       BRK  
  0x043373 $9363: C-----  00       BRK  
  0x043374 $9364: C-----  00       BRK  
  0x043375 $9365: C-----  00       BRK  
  0x043376 $9366: C-----  01 02    ORA  ($02,X)
  0x043378 $9368: C-----  00       BRK  
  0x043379 $9369: C-----  00       BRK  
  0x04337A $936A: C-----  00       BRK  
  0x04337B $936B: C-----  00       BRK  
  0x04337C $936C: C-----  00       BRK  
  0x04337D $936D: C-----  00       BRK  
  0x04337E $936E: C-----  00       BRK  
  0x04337F $936F: C-----  01 00    ORA  ($00,X)
  0x043381 $9371: C-----  00       BRK  
  0x043382 $9372: C-----  00       BRK  
  0x043383 $9373: C-----  00       BRK  
  0x043384 $9374: C-----  00       BRK  
  0x043385 $9375: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x043386 $9376: C-----  88       DEY  
  0x043387 $9377: C-----  00       BRK  
  0x043388 $9378: C-----  00       BRK  
  0x043389 $9379: C-----  00       BRK  
  0x04338A $937A: C-----  00       BRK  
  0x04338B $937B: C-----  00       BRK  
  0x04338C $937C: C-----  00       BRK  
  0x04338D $937D: C-----  00       BRK  
  0x04338E $937E: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04338F $937F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043390 $9380: C-----  00       BRK  
  0x043391 $9381: C-----  40       RTI  
  0x043392 $9382: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x043393 $9383: C-----  EA       NOP  
  0x043394 $9384: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043395 $9385: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043396 $9386: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043397 $9387: C-----  BD FF BF LDA  $BFFF,X
  0x04339A $938A: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x04339B $938B: C-----  55 6B    EOR  $6B,X
  0x04339D $938D: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x04339E $938E: C-----  99 BD 06 STA  $06BD,Y
  0x0433A1 $9391: C-----  00       BRK  
  0x0433A2 $9392: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0433A3 $9393: C-----  01 82    ORA  ($82,X)
  0x0433A5 $9395: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0433A6 $9396: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x0433A7 $9397: C-----  C4 F8    CPY  $F8
  0x0433A9 $9399: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0433AA $939A: C-----  F0 FE    BEQ  $939A
  0x0433AC $939C: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0433AD $939D: C-----  B8       CLV  
  0x0433AE $939E: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x0433AF $939F: C-----  78       SEI  
  0x0433B0 $93A0: C-----  00       BRK  
  0x0433B1 $93A1: C-----  00       BRK  
  0x0433B2 $93A2: C-----  00       BRK  
  0x0433B3 $93A3: C-----  06 BD    ASL  $BD
  0x0433B5 $93A5: C-----  E6 48    INC  $48
  0x0433B7 $93A7: C-----  00       BRK  
  0x0433B8 $93A8: C-----  00       BRK  
  0x0433B9 $93A9: C-----  00       BRK  
  0x0433BA $93AA: C-----  00       BRK  
  0x0433BB $93AB: C-----  00       BRK  
  0x0433BC $93AC: C-----  00       BRK  
  0x0433BD $93AD: C-----  19 B7 FF ORA  $FFB7,Y
  0x0433C0 $93B0: C-----  00       BRK  
  0x0433C1 $93B1: C-----  00       BRK  
  0x0433C2 $93B2: C-----  00       BRK  
  0x0433C3 $93B3: C-----  00       BRK  
  0x0433C4 $93B4: C-----  E0 40    CPX  #$40
  0x0433C6 $93B6: C-----  30 0C    BMI  $93C4
  0x0433C8 $93B8: C-----  00       BRK  
  0x0433C9 $93B9: C-----  00       BRK  
  0x0433CA $93BA: C-----  00       BRK  
  0x0433CB $93BB: C-----  00       BRK  
  0x0433CC $93BC: C-----  00       BRK  
  0x0433CD $93BD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0433CE $93BE: C-----  C0 F0    CPY  #$F0
  0x0433D0 $93C0: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0433D1 $93C1: C-----  06 04    ASL  $04
  0x0433D3 $93C3: C-----  0A       ASL  A
  0x0433D4 $93C4: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0433D5 $93C5: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0433D6 $93C6: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0433D7 $93C7: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0433D8 $93C8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0433D9 $93C9: C-----  01 03    ORA  ($03,X)
  0x0433DB $93CB: C-----  05 03    ORA  $03
  0x0433DD $93CD: C-----  00       BRK  
  0x0433DE $93CE: C-----  01 01    ORA  ($01,X)
  0x0433E0 $93D0: C-----  00       BRK  
  0x0433E1 $93D1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0433E2 $93D2: C-----  D5 FF    CMP  $FF,X
  0x0433E4 $93D4: C-----  FD FD BF SBC  $BFFD,X
  0x0433E7 $93D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0433E8 $93D8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0433E9 $93D9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0433EA $93DA: C-----  2A       ROL  A
  0x0433EB $93DB: C-----  49 21    EOR  #$21
  0x0433ED $93DD: C-----  B9 3F 5F LDA  $5F3F,Y
  0x0433F0 $93E0: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x0433F1 $93E1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0433F2 $93E2: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0433F3 $93E3: C-----  C0 00    CPY  #$00
  0x0433F5 $93E5: C-----  01 31    ORA  ($31,X)
  0x0433F7 $93E7: C-----  F8       SED  
  0x0433F8 $93E8: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x0433F9 $93E9: C-----  C4 43    CPY  $43
  0x0433FB $93EB: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0433FC $93EC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0433FD $93ED: C-----  FE CE 37 INC  $37CE,X
  0x043400 $93F0: C-----  00       BRK  
  0x043401 $93F1: C-----  00       BRK  
  0x043402 $93F2: C-----  00       BRK  
  0x043403 $93F3: C-----  00       BRK  
  0x043404 $93F4: C-----  00       BRK  
  0x043405 $93F5: C-----  00       BRK  
  0x043406 $93F6: C-----  08       PHP  
  0x043407 $93F7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043408 $93F8: C-----  00       BRK  
  0x043409 $93F9: C-----  00       BRK  
  0x04340A $93FA: C-----  00       BRK  
  0x04340B $93FB: C-----  00       BRK  
  0x04340C $93FC: C-----  00       BRK  
  0x04340D $93FD: C-----  00       BRK  
  0x04340E $93FE: C-----  00       BRK  
  0x04340F $93FF: C-----  00       BRK  
  0x043410 $9400: C-----  00       BRK  
  0x043411 $9401: C-----  00       BRK  
  0x043412 $9402: C-----  00       BRK  
  0x043413 $9403: C-----  00       BRK  
  0x043414 $9404: C-----  00       BRK  
  0x043415 $9405: C-----  00       BRK  
  0x043416 $9406: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043417 $9407: C-----  00       BRK  
  0x043418 $9408: C-----  00       BRK  
  0x043419 $9409: C-----  00       BRK  
  0x04341A $940A: C-----  00       BRK  
  0x04341B $940B: C-----  00       BRK  
  0x04341C $940C: C-----  00       BRK  
  0x04341D $940D: C-----  00       BRK  
  0x04341E $940E: C-----  00       BRK  
  0x04341F $940F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043420 $9410: C-----  00       BRK  
  0x043421 $9411: C-----  00       BRK  
  0x043422 $9412: C-----  00       BRK  
  0x043423 $9413: C-----  00       BRK  
  0x043424 $9414: C-----  00       BRK  
  0x043425 $9415: C-----  00       BRK  
  0x043426 $9416: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043427 $9417: C-----  60       RTS  
  0x043428 $9418: C-----  00       BRK  
  0x043429 $9419: C-----  00       BRK  
  0x04342A $941A: C-----  00       BRK  
  0x04342B $941B: C-----  00       BRK  
  0x04342C $941C: C-----  00       BRK  
  0x04342D $941D: C-----  00       BRK  
  0x04342E $941E: C-----  00       BRK  
  0x04342F $941F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043430 $9420: C-----  08       PHP  
  0x043431 $9421: C-----  08       PHP  
  0x043432 $9422: C-----  05 05    ORA  $05
  0x043434 $9424: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043435 $9425: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043436 $9426: C-----  01 01    ORA  ($01,X)
  0x043438 $9428: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043439 $9429: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04343A $942A: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04343B $942B: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04343C $942C: C-----  00       BRK  
  0x04343D $942D: C-----  00       BRK  
  0x04343E $942E: C-----  00       BRK  
  0x04343F $942F: C-----  00       BRK  
  0x043440 $9430: C-----  00       BRK  
  0x043441 $9431: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x043442 $9432: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x043443 $9433: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043444 $9434: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043445 $9435: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043446 $9436: C-----  BD FF FF LDA  $FFFF,X
  0x043449 $9439: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04344A $943A: C-----  !!UNDEF $93  ; unknown opcode, treating as data
  0x04344B $943B: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04344C $943C: C-----  38       SEC  
  0x04344D $943D: C-----  95 BD    STA  $BD,X
  0x04344F $943F: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x043450 $9440: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043451 $9441: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x043452 $9442: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043453 $9443: C-----  C0 00    CPY  #$00
  0x043455 $9445: C-----  01 31    ORA  ($31,X)
  0x043457 $9447: C-----  F8       SED  
  0x043458 $9448: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043459 $9449: C-----  C4 43    CPY  $43
  0x04345B $944B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04345C $944C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04345D $944D: C-----  FE CE 37 INC  $37CE,X
  0x043460 $9450: C-----  00       BRK  
  0x043461 $9451: C-----  00       BRK  
  0x043462 $9452: C-----  00       BRK  
  0x043463 $9453: C-----  00       BRK  
  0x043464 $9454: C-----  00       BRK  
  0x043465 $9455: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x043466 $9456: C-----  E0 00    CPX  #$00
  0x043468 $9458: C-----  00       BRK  
  0x043469 $9459: C-----  00       BRK  
  0x04346A $945A: C-----  00       BRK  
  0x04346B $945B: C-----  00       BRK  
  0x04346C $945C: C-----  00       BRK  
  0x04346D $945D: C-----  00       BRK  
  0x04346E $945E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04346F $945F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043470 $9460: C-----  20 90 90 JSR  $9090
  0x043473 $9463: C-----  90 D0    BCC  $9435
  0x043475 $9465: C-----  D0 F0    BNE  $9457
  0x043477 $9467: C-----  F0 C0    BEQ  $9429
  0x043479 $9469: C-----  60       RTS  
  0x04347A $946A: C-----  60       RTS  
  0x04347B $946B: C-----  60       RTS  
  0x04347C $946C: C-----  20 60 40 JSR  $4060
  0x04347F $946F: C-----  40       RTI  
  0x043480 $9470: C-----  00       BRK  
  0x043481 $9471: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043482 $9472: C-----  D5 FF    CMP  $FF,X
  0x043484 $9474: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043485 $9475: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043486 $9476: C-----  BD FF FF LDA  $FFFF,X
  0x043489 $9479: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04348A $947A: C-----  AA       TAX  
  0x04348B $947B: C-----  D5 38    CMP  $38,X
  0x04348D $947D: C-----  B5 BD    LDA  $BD,X
  0x04348F $947F: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x043490 $9480: C-----  00       BRK  
  0x043491 $9481: C-----  00       BRK  
  0x043492 $9482: C-----  00       BRK  
  0x043493 $9483: C-----  00       BRK  
  0x043494 $9484: C-----  00       BRK  
  0x043495 $9485: C-----  00       BRK  
  0x043496 $9486: C-----  01 01    ORA  ($01,X)
  0x043498 $9488: C-----  00       BRK  
  0x043499 $9489: C-----  00       BRK  
  0x04349A $948A: C-----  00       BRK  
  0x04349B $948B: C-----  00       BRK  
  0x04349C $948C: C-----  00       BRK  
  0x04349D $948D: C-----  00       BRK  
  0x04349E $948E: C-----  00       BRK  
  0x04349F $948F: C-----  00       BRK  
  0x0434A0 $9490: C-----  00       BRK  
  0x0434A1 $9491: C-----  00       BRK  
  0x0434A2 $9492: C-----  00       BRK  
  0x0434A3 $9493: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0434A4 $9494: C-----  38       SEC  
  0x0434A5 $9495: C-----  CC 12 40 CPY  $4012
  0x0434A8 $9498: C-----  00       BRK  
  0x0434A9 $9499: C-----  00       BRK  
  0x0434AA $949A: C-----  00       BRK  
  0x0434AB $949B: C-----  00       BRK  
  0x0434AC $949C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0434AD $949D: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x0434AE $949E: C-----  ED BF 02 SBC  $02BF
  0x0434B1 $94A1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0434B2 $94A2: C-----  05 04    ORA  $04
  0x0434B4 $94A4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0434B5 $94A5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0434B6 $94A6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0434B7 $94A7: C-----  01 01    ORA  ($01,X)
  0x0434B9 $94A9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0434BA $94AA: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0434BB $94AB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0434BC $94AC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0434BD $94AD: C-----  00       BRK  
  0x0434BE $94AE: C-----  00       BRK  
  0x0434BF $94AF: C-----  00       BRK  
  0x0434C0 $94B0: C-----  00       BRK  
  0x0434C1 $94B1: C-----  00       BRK  
  0x0434C2 $94B2: C-----  49 FF    EOR  #$FF
  0x0434C4 $94B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0434C5 $94B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0434C6 $94B6: C-----  B9 FF FF LDA  $FFFF,Y
  0x0434C9 $94B9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0434CA $94BA: C-----  B6 49    LDX  $49,Y
  0x0434CC $94BC: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0434CD $94BD: C-----  99 B9 DF STA  $DFB9,Y
  0x0434D0 $94C0: C-----  00       BRK  
  0x0434D1 $94C1: C-----  00       BRK  
  0x0434D2 $94C2: C-----  00       BRK  
  0x0434D3 $94C3: C-----  00       BRK  
  0x0434D4 $94C4: C-----  E0 30    CPX  #$30
  0x0434D6 $94C6: C-----  D8       CLD  
  0x0434D7 $94C7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0434D8 $94C8: C-----  00       BRK  
  0x0434D9 $94C9: C-----  00       BRK  
  0x0434DA $94CA: C-----  00       BRK  
  0x0434DB $94CB: C-----  00       BRK  
  0x0434DC $94CC: C-----  00       BRK  
  0x0434DD $94CD: C-----  C0 20    CPY  #$20
  0x0434DF $94CF: C-----  F8       SED  
  0x0434E0 $94D0: C-----  00       BRK  
  0x0434E1 $94D1: C-----  00       BRK  
  0x0434E2 $94D2: C-----  00       BRK  
  0x0434E3 $94D3: C-----  01 01    ORA  ($01,X)
  0x0434E5 $94D5: C-----  0A       ASL  A
  0x0434E6 $94D6: C-----  0A       ASL  A
  0x0434E7 $94D7: C-----  09 00    ORA  #$00
  0x0434E9 $94D9: C-----  00       BRK  
  0x0434EA $94DA: C-----  00       BRK  
  0x0434EB $94DB: C-----  00       BRK  
  0x0434EC $94DC: C-----  00       BRK  
  0x0434ED $94DD: C-----  01 05    ORA  ($05,X)
  0x0434EF $94DF: C-----  06 24    ASL  $24
  0x0434F1 $94E1: C-----  84 8C    STY  $8C
  0x0434F3 $94E3: C-----  84 E4    STY  $E4
  0x0434F5 $94E5: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x0434F6 $94E6: C-----  EC F8 D8 CPX  $D8F8
  0x0434F9 $94E9: C-----  78       SEI  
  0x0434FA $94EA: C-----  70 78    BVS  $9564
  0x0434FC $94EC: C-----  98       TYA  
  0x0434FD $94ED: C-----  A8       TAY  
  0x0434FE $94EE: C-----  B0 E0    BCS  $94D0
  0x043500 $94F0: C-----  00       BRK  
  0x043501 $94F1: C-----  00       BRK  
  0x043502 $94F2: C-----  00       BRK  
  0x043503 $94F3: C-----  00       BRK  
  0x043504 $94F4: C-----  00       BRK  
  0x043505 $94F5: C-----  00       BRK  
  0x043506 $94F6: C-----  00       BRK  
  0x043507 $94F7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043508 $94F8: C-----  00       BRK  
  0x043509 $94F9: C-----  00       BRK  
  0x04350A $94FA: C-----  00       BRK  
  0x04350B $94FB: C-----  00       BRK  
  0x04350C $94FC: C-----  00       BRK  
  0x04350D $94FD: C-----  00       BRK  
  0x04350E $94FE: C-----  00       BRK  
  0x04350F $94FF: C-----  00       BRK  
  0x043510 $9500: C-----  00       BRK  
  0x043511 $9501: C-----  00       BRK  
  0x043512 $9502: C-----  00       BRK  
  0x043513 $9503: C-----  00       BRK  
  0x043514 $9504: C-----  00       BRK  
  0x043515 $9505: C-----  00       BRK  
  0x043516 $9506: C-----  E0 19    CPX  #$19
  0x043518 $9508: C-----  00       BRK  
  0x043519 $9509: C-----  00       BRK  
  0x04351A $950A: C-----  00       BRK  
  0x04351B $950B: C-----  00       BRK  
  0x04351C $950C: C-----  00       BRK  
  0x04351D $950D: C-----  00       BRK  
  0x04351E $950E: C-----  00       BRK  
  0x04351F $950F: C-----  E0 07    CPX  #$07
  0x043521 $9511: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x043522 $9512: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x043523 $9513: C-----  61 51    ADC  ($51,X)
  0x043525 $9515: C-----  CA       DEX  
  0x043526 $9516: C-----  8E 9E 00 STX  $009E
  0x043529 $9519: C-----  00       BRK  
  0x04352A $951A: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04352B $951B: C-----  1E 2E 35 ASL  $352E,X
  0x04352E $951E: C-----  71 61    ADC  ($61),Y
  0x043530 $9520: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043531 $9521: C-----  01 03    ORA  ($03,X)
  0x043533 $9523: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x043534 $9524: C-----  8C E2 E4 STY  $E4E2
  0x043537 $9527: C-----  C8       INY  
  0x043538 $9528: C-----  F8       SED  
  0x043539 $9529: C-----  FE FC 7C INC  $7CFC,X
  0x04353C $952C: C-----  70 5C    BVS  $958A
  0x04353E $952E: C-----  58       CLI  
  0x04353F $952F: C-----  F0 9F    BEQ  $94D0
  0x043541 $9531: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043542 $9532: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x043543 $9533: C-----  46 64    LSR  $64
  0x043545 $9535: C-----  3E 1F 07 ROL  $071F,X
  0x043548 $9538: C-----  60       RTS  
  0x043549 $9539: C-----  00       BRK  
  0x04354A $953A: C-----  30 39    BMI  $9575
  0x04354C $953C: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x04354D $953D: C-----  01 00    ORA  ($00,X)
  0x04354F $953F: C-----  00       BRK  
  0x043550 $9540: C-----  E0 F8    CPX  #$F8
  0x043552 $9542: C-----  EC C6 22 CPX  $22C6
  0x043555 $9545: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x043556 $9546: C-----  1D 1D 00 ORA  $001D,X
  0x043559 $9549: C-----  00       BRK  
  0x04355A $954A: C-----  10 38    BPL  $9584
  0x04355C $954C: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04355D $954D: C-----  EC E2 E2 CPX  $E2E2
  0x043560 $9550: C-----  3D FF 3B AND  $3BFF,X
  0x043563 $9553: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x043564 $9554: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x043565 $9555: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x043566 $9556: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x043567 $9557: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043568 $9558: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x043569 $9559: C-----  00       BRK  
  0x04356A $955A: C-----  C4 EC    CPY  $EC
  0x04356C $955C: C-----  E8       INX  
  0x04356D $955D: C-----  E0 C0    CPX  #$C0
  0x04356F $955F: C-----  00       BRK  
  0x043570 $9560: C-----  3D FF 3B AND  $3BFF,X
  0x043573 $9563: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x043574 $9564: C-----  16 1C    ASL  $1C,X
  0x043576 $9566: C-----  38       SEC  
  0x043577 $9567: C-----  E0 C2    CPX  #$C2
  0x043579 $9569: C-----  00       BRK  
  0x04357A $956A: C-----  C4 EC    CPY  $EC
  0x04357C $956C: C-----  E8       INX  
  0x04357D $956D: C-----  E0 C0    CPX  #$C0
  0x04357F $956F: C-----  00       BRK  
  0x043580 $9570: C-----  F0 F0    BEQ  $9562
  0x043582 $9572: C-----  E0 C0    CPX  #$C0
  0x043584 $9574: C-----  C0 E0    CPY  #$E0
  0x043586 $9576: C-----  F0 F0    BEQ  $9568
  0x043588 $9578: C-----  00       BRK  
  0x043589 $9579: C-----  00       BRK  
  0x04358A $957A: C-----  00       BRK  
  0x04358B $957B: C-----  00       BRK  
  0x04358C $957C: C-----  00       BRK  
  0x04358D $957D: C-----  00       BRK  
  0x04358E $957E: C-----  00       BRK  
  0x04358F $957F: C-----  00       BRK  
  0x043590 $9580: C-----  00       BRK  
  0x043591 $9581: C-----  00       BRK  
  0x043592 $9582: C-----  00       BRK  
  0x043593 $9583: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043594 $9584: C-----  38       SEC  
  0x043595 $9585: C-----  CC 12 00 CPY  $0012
  0x043598 $9588: C-----  00       BRK  
  0x043599 $9589: C-----  00       BRK  
  0x04359A $958A: C-----  00       BRK  
  0x04359B $958B: C-----  00       BRK  
  0x04359C $958C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04359D $958D: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x04359E $958E: C-----  ED FF FF SBC  $FFFF
  0x0435A1 $9591: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0435A2 $9592: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0435A3 $9593: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x0435A4 $9594: C-----  40       RTI  
  0x0435A5 $9595: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0435A6 $9596: C-----  00       BRK  
  0x0435A7 $9597: C-----  00       BRK  
  0x0435A8 $9598: C-----  00       BRK  
  0x0435A9 $9599: C-----  00       BRK  
  0x0435AA $959A: C-----  00       BRK  
  0x0435AB $959B: C-----  00       BRK  
  0x0435AC $959C: C-----  00       BRK  
  0x0435AD $959D: C-----  00       BRK  
  0x0435AE $959E: C-----  00       BRK  
  0x0435AF $959F: C-----  00       BRK  
  0x0435B0 $95A0: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0435B1 $95A1: C-----  08       PHP  
  0x0435B2 $95A2: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0435B3 $95A3: C-----  15 05    ORA  $05,X
  0x0435B5 $95A5: C-----  05 03    ORA  $03
  0x0435B7 $95A7: C-----  01 03    ORA  ($03,X)
  0x0435B9 $95A9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0435BA $95AA: C-----  0D 02 02 ORA  $0202
  0x0435BD $95AD: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0435BE $95AE: C-----  00       BRK  
  0x0435BF $95AF: C-----  00       BRK  
  0x0435C0 $95B0: C-----  24 84    BIT  $84
  0x0435C2 $95B2: C-----  8C 84 E4 STY  $E484
  0x0435C5 $95B5: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x0435C6 $95B6: C-----  EC F8 D8 CPX  $D8F8
  0x0435C9 $95B9: C-----  78       SEI  
  0x0435CA $95BA: C-----  70 78    BVS  $9634
  0x0435CC $95BC: C-----  18       CLC  
  0x0435CD $95BD: C-----  A8       TAY  
  0x0435CE $95BE: C-----  B0 E0    BCS  $95A0
  0x0435D0 $95C0: C-----  3D FF 3B AND  $3BFF,X
  0x0435D3 $95C3: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0435D4 $95C4: C-----  16 1C    ASL  $1C,X
  0x0435D6 $95C6: C-----  38       SEC  
  0x0435D7 $95C7: C-----  E0 C2    CPX  #$C2
  0x0435D9 $95C9: C-----  00       BRK  
  0x0435DA $95CA: C-----  C4 ED    CPY  $ED
  0x0435DC $95CC: C-----  E9 E3    SBC  #$E3
  0x0435DE $95CE: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x0435DF $95CF: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0435E0 $95D0: C-----  C0 10    CPY  #$10
  0x0435E2 $95D2: C-----  20 40 40 JSR  $4040
  0x0435E5 $95D5: C-----  20 10 F0 JSR  $F010
  0x0435E8 $95D8: C-----  30 E0    BMI  $95BA
  0x0435EA $95DA: C-----  C0 80    CPY  #$80
  0x0435EC $95DC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0435ED $95DD: C-----  C0 E0    CPY  #$E0
  0x0435EF $95DF: C-----  00       BRK  
  0x0435F0 $95E0: C-----  01 81    ORA  ($81,X)
  0x0435F2 $95E2: C-----  9D 23 40 STA  $4023,X
  0x0435F5 $95E5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0435F6 $95E6: C-----  00       BRK  
  0x0435F7 $95E7: C-----  00       BRK  
  0x0435F8 $95E8: C-----  FE 7E 62 INC  $627E,X
  0x0435FB $95EB: C-----  40       RTI  
  0x0435FC $95EC: C-----  00       BRK  
  0x0435FD $95ED: C-----  00       BRK  
  0x0435FE $95EE: C-----  00       BRK  
  0x0435FF $95EF: C-----  00       BRK  
  0x043600 $95F0: C-----  00       BRK  
  0x043601 $95F1: C-----  00       BRK  
  0x043602 $95F2: C-----  00       BRK  
  0x043603 $95F3: C-----  F0 0F    BEQ  $9604
  0x043605 $95F5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043606 $95F6: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x043607 $95F7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043608 $95F8: C-----  00       BRK  
  0x043609 $95F9: C-----  00       BRK  
  0x04360A $95FA: C-----  00       BRK  
  0x04360B $95FB: C-----  00       BRK  
  0x04360C $95FC: C-----  F0 7F    BEQ  $967D
  0x04360E $95FE: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04360F $95FF: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x043610 $9600: C-----  00       BRK  
  0x043611 $9601: C-----  00       BRK  
  0x043612 $9602: C-----  00       BRK  
  0x043613 $9603: C-----  00       BRK  
  0x043614 $9604: C-----  7E 81 00 ROR  $0081,X
  0x043617 $9607: C-----  00       BRK  
  0x043618 $9608: C-----  00       BRK  
  0x043619 $9609: C-----  00       BRK  
  0x04361A $960A: C-----  00       BRK  
  0x04361B $960B: C-----  00       BRK  
  0x04361C $960C: C-----  00       BRK  
  0x04361D $960D: C-----  7E FF FF ROR  $FFFF,X
  0x043620 $9610: C-----  00       BRK  
  0x043621 $9611: C-----  00       BRK  
  0x043622 $9612: C-----  00       BRK  
  0x043623 $9613: C-----  00       BRK  
  0x043624 $9614: C-----  00       BRK  
  0x043625 $9615: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043626 $9616: C-----  40       RTI  
  0x043627 $9617: C-----  40       RTI  
  0x043628 $9618: C-----  00       BRK  
  0x043629 $9619: C-----  00       BRK  
  0x04362A $961A: C-----  00       BRK  
  0x04362B $961B: C-----  00       BRK  
  0x04362C $961C: C-----  00       BRK  
  0x04362D $961D: C-----  00       BRK  
  0x04362E $961E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04362F $961F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043630 $9620: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043631 $9621: C-----  05 05    ORA  $05
  0x043633 $9623: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043634 $9624: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043635 $9625: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043636 $9626: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043637 $9627: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043638 $9628: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043639 $9629: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04363A $962A: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04363B $962B: C-----  01 01    ORA  ($01,X)
  0x04363D $962D: C-----  01 02    ORA  ($02,X)
  0x04363F $962F: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043640 $9630: C-----  01 87    ORA  ($87,X)
  0x043642 $9632: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043643 $9633: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043644 $9634: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043645 $9635: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043646 $9636: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x043647 $9637: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043648 $9638: C-----  FE 79 87 INC  $8779,X
  0x04364B $963B: C-----  F9 37 BB SBC  $BB37,Y
  0x04364E $963E: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x04364F $963F: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x043650 $9640: C-----  00       BRK  
  0x043651 $9641: C-----  00       BRK  
  0x043652 $9642: C-----  00       BRK  
  0x043653 $9643: C-----  00       BRK  
  0x043654 $9644: C-----  00       BRK  
  0x043655 $9645: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x043656 $9646: C-----  C4 00    CPY  $00
  0x043658 $9648: C-----  00       BRK  
  0x043659 $9649: C-----  00       BRK  
  0x04365A $964A: C-----  00       BRK  
  0x04365B $964B: C-----  00       BRK  
  0x04365C $964C: C-----  00       BRK  
  0x04365D $964D: C-----  00       BRK  
  0x04365E $964E: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04365F $964F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043660 $9650: C-----  00       BRK  
  0x043661 $9651: C-----  00       BRK  
  0x043662 $9652: C-----  00       BRK  
  0x043663 $9653: C-----  00       BRK  
  0x043664 $9654: C-----  00       BRK  
  0x043665 $9655: C-----  C0 70    CPY  #$70
  0x043667 $9657: C-----  10 00    BPL  $9659
  0x043669 $9659: C-----  00       BRK  
  0x04366A $965A: C-----  00       BRK  
  0x04366B $965B: C-----  00       BRK  
  0x04366C $965C: C-----  00       BRK  
  0x04366D $965D: C-----  00       BRK  
  0x04366E $965E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04366F $965F: C-----  E0 20    CPX  #$20
  0x043671 $9661: C-----  A0 A0    LDY  #$A0
  0x043673 $9663: C-----  A0 E0    LDY  #$E0
  0x043675 $9665: C-----  E0 E0    CPX  #$E0
  0x043677 $9667: C-----  E0 C0    CPX  #$C0
  0x043679 $9669: C-----  40       RTI  
  0x04367A $966A: C-----  40       RTI  
  0x04367B $966B: C-----  40       RTI  
  0x04367C $966C: C-----  00       BRK  
  0x04367D $966D: C-----  40       RTI  
  0x04367E $966E: C-----  40       RTI  
  0x04367F $966F: C-----  C0 01    CPY  #$01
  0x043681 $9671: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043682 $9672: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043683 $9673: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043684 $9674: C-----  05 05    ORA  $05
  0x043686 $9676: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043687 $9677: C-----  01 00    ORA  ($00,X)
  0x043689 $9679: C-----  01 03    ORA  ($03,X)
  0x04368B $967B: C-----  00       BRK  
  0x04368C $967C: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04368D $967D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04368E $967E: C-----  00       BRK  
  0x04368F $967F: C-----  00       BRK  
  0x043690 $9680: C-----  00       BRK  
  0x043691 $9681: C-----  00       BRK  
  0x043692 $9682: C-----  00       BRK  
  0x043693 $9683: C-----  01 01    ORA  ($01,X)
  0x043695 $9685: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043696 $9686: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043697 $9687: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043698 $9688: C-----  00       BRK  
  0x043699 $9689: C-----  00       BRK  
  0x04369A $968A: C-----  00       BRK  
  0x04369B $968B: C-----  00       BRK  
  0x04369C $968C: C-----  00       BRK  
  0x04369D $968D: C-----  01 01    ORA  ($01,X)
  0x04369F $968F: C-----  01 00    ORA  ($00,X)
  0x0436A1 $9691: C-----  0E 98 27 ASL  $2798
  0x0436A4 $9694: C-----  59 90 80 EOR  $8090,Y
  0x0436A7 $9697: C-----  00       BRK  
  0x0436A8 $9698: C-----  00       BRK  
  0x0436A9 $9699: C-----  00       BRK  
  0x0436AA $969A: C-----  00       BRK  
  0x0436AB $969B: C-----  10 26    BPL  $96C3
  0x0436AD $969D: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x0436AE $969E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0436AF $969F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0436B0 $96A0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0436B1 $96A1: C-----  08       PHP  
  0x0436B2 $96A2: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0436B3 $96A3: C-----  15 05    ORA  $05,X
  0x0436B5 $96A5: C-----  05 03    ORA  $03
  0x0436B7 $96A7: C-----  01 00    ORA  ($00,X)
  0x0436B9 $96A9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0436BA $96AA: C-----  0D 02 02 ORA  $0202
  0x0436BD $96AD: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0436BE $96AE: C-----  00       BRK  
  0x0436BF $96AF: C-----  00       BRK  
  0x0436C0 $96B0: C-----  00       BRK  
  0x0436C1 $96B1: C-----  90 94    BCC  $9647
  0x0436C3 $96B3: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x0436C4 $96B4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0436C5 $96B5: C-----  FE BF FF INC  $FFBF,X
  0x0436C8 $96B8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0436C9 $96B9: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x0436CA $96BA: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x0436CB $96BB: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x0436CC $96BC: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x0436CD $96BD: C-----  95 9E    STA  $9E,X
  0x0436CF $96BF: C-----  FE 00 00 INC  $0000,X
  0x0436D2 $96C2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0436D3 $96C3: C-----  C5 FF    CMP  $FF
  0x0436D5 $96C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0436D6 $96C6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0436D7 $96C7: C-----  BD FF FF LDA  $FFFF,X
  0x0436DA $96CA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0436DB $96CB: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x0436DC $96CC: C-----  C5 38    CMP  $38
  0x0436DE $96CE: C-----  B9 BD 08 LDA  $08BD,Y
  0x0436E1 $96D1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0436E2 $96D2: C-----  08       PHP  
  0x0436E3 $96D3: C-----  84 84    STY  $84
  0x0436E5 $96D5: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x0436E6 $96D6: C-----  E8       INX  
  0x0436E7 $96D7: C-----  D8       CLD  
  0x0436E8 $96D8: C-----  F0 F8    BEQ  $96D2
  0x0436EA $96DA: C-----  F0 78    BEQ  $9754
  0x0436EC $96DC: C-----  78       SEI  
  0x0436ED $96DD: C-----  28       PLP  
  0x0436EE $96DE: C-----  50 60    BVC  $9740
  0x0436F0 $96E0: C-----  08       PHP  
  0x0436F1 $96E1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0436F2 $96E2: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0436F3 $96E3: C-----  01 82    ORA  ($82,X)
  0x0436F5 $96E5: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x0436F6 $96E6: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x0436F7 $96E7: C-----  E4 F0    CPX  $F0
  0x0436F9 $96E9: C-----  F8       SED  
  0x0436FA $96EA: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0436FB $96EB: C-----  FE 7C 30 INC  $307C,X
  0x0436FE $96EE: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x0436FF $96EF: C-----  D8       CLD  
  0x043700 $96F0: C-----  F8       SED  
  0x043701 $96F1: C-----  EE 5F BF INC  $BF5F
  0x043704 $96F4: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x043705 $96F5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043706 $96F6: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043707 $96F7: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043708 $96F8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043709 $96F9: C-----  10 AE    BPL  $96A9
  0x04370B $96FB: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04370C $96FC: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04370D $96FD: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04370E $96FE: C-----  B0 8F    BCS  $968F
  0x043710 $9700: C-----  01 03    ORA  ($03,X)
  0x043712 $9702: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043713 $9703: C-----  08       PHP  
  0x043714 $9704: C-----  1E 11 20 ASL  $2011,X
  0x043717 $9707: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x043718 $9708: C-----  00       BRK  
  0x043719 $9709: C-----  01 00    ORA  ($00,X)
  0x04371B $970B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04371C $970C: C-----  01 0E    ORA  ($0E,X)
  0x04371E $970E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04371F $970F: C-----  3D 07 0F AND  $0F07,X
  0x043722 $9712: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043723 $9713: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x043724 $9714: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043725 $9715: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043726 $9716: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043727 $9717: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043728 $9718: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x043729 $9719: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04372A $971A: C-----  F6 31    INC  $31,X
  0x04372C $971C: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04372D $971D: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04372E $971E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04372F $971F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043730 $9720: C-----  E0 38    CPX  #$38
  0x043732 $9722: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x043733 $9723: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043734 $9724: C-----  00       BRK  
  0x043735 $9725: C-----  00       BRK  
  0x043736 $9726: C-----  01 03    ORA  ($03,X)
  0x043738 $9728: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x043739 $9729: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04373A $972A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04373B $972B: C-----  00       BRK  
  0x04373C $972C: C-----  00       BRK  
  0x04373D $972D: C-----  00       BRK  
  0x04373E $972E: C-----  00       BRK  
  0x04373F $972F: C-----  00       BRK  
  0x043740 $9730: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043741 $9731: C-----  01 00    ORA  ($00,X)
  0x043743 $9733: C-----  45 8A    EOR  $8A
  0x043745 $9735: C-----  C0 A0    CPY  #$A0
  0x043747 $9737: C-----  E1 FD    SBC  ($FD,X)
  0x043749 $9739: C-----  FE FF BA INC  $BAFF,X
  0x04374C $973C: C-----  75 3F    ADC  $3F,X
  0x04374E $973E: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04374F $973F: C-----  1E FC FE ASL  $FEFC,X
  0x043752 $9742: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043753 $9743: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043754 $9744: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043755 $9745: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043756 $9746: C-----  FE FC F0 INC  $F0FC,X
  0x043759 $9749: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04375A $974A: C-----  1E FE FE ASL  $FEFE,X
  0x04375D $974D: C-----  FE FC F0 INC  $F0FC,X
  0x043760 $9750: C-----  00       BRK  
  0x043761 $9751: C-----  00       BRK  
  0x043762 $9752: C-----  00       BRK  
  0x043763 $9753: C-----  00       BRK  
  0x043764 $9754: C-----  00       BRK  
  0x043765 $9755: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043766 $9756: C-----  C0 F0    CPY  #$F0
  0x043768 $9758: C-----  00       BRK  
  0x043769 $9759: C-----  00       BRK  
  0x04376A $975A: C-----  00       BRK  
  0x04376B $975B: C-----  00       BRK  
  0x04376C $975C: C-----  00       BRK  
  0x04376D $975D: C-----  00       BRK  
  0x04376E $975E: C-----  00       BRK  
  0x04376F $975F: C-----  C0 FF    CPY  #$FF
  0x043771 $9761: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x043772 $9762: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x043773 $9763: C-----  AA       TAX  
  0x043774 $9764: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x043775 $9765: C-----  9A       TXS  
  0x043776 $9766: C-----  70 C0    BVS  $9728
  0x043778 $9768: C-----  C0 34    CPY  #$34
  0x04377A $976A: C-----  B8       CLV  
  0x04377B $976B: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04377C $976C: C-----  B8       CLV  
  0x04377D $976D: C-----  60       RTS  
  0x04377E $976E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04377F $976F: C-----  00       BRK  
  0x043780 $9770: C-----  F0 80    BEQ  $96F2
  0x043782 $9772: C-----  C0 A0    CPY  #$A0
  0x043784 $9774: C-----  50 B0    BVC  $9726
  0x043786 $9776: C-----  58       CLI  
  0x043787 $9777: C-----  28       PLP  
  0x043788 $9778: C-----  00       BRK  
  0x043789 $9779: C-----  00       BRK  
  0x04378A $977A: C-----  00       BRK  
  0x04378B $977B: C-----  40       RTI  
  0x04378C $977C: C-----  A0 40    LDY  #$40
  0x04378E $977E: C-----  A0 D0    LDY  #$D0
  0x043790 $9780: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043791 $9781: C-----  0E 1F 3F ASL  $3F1F
  0x043794 $9784: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043795 $9785: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043796 $9786: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043797 $9787: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043798 $9788: C-----  00       BRK  
  0x043799 $9789: C-----  01 0E    ORA  ($0E,X)
  0x04379B $978B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04379C $978C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04379D $978D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04379E $978E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04379F $978F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0437A0 $9790: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0437A1 $9791: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0437A2 $9792: C-----  00       BRK  
  0x0437A3 $9793: C-----  94 C9    STY  $C9,X
  0x0437A5 $9795: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x0437A6 $9796: C-----  ED F8 E0 SBC  $E0F8
  0x0437A9 $9799: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0437AA $979A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0437AB $979B: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x0437AC $979C: C-----  B6 A8    LDX  $A8,Y
  0x0437AE $979E: C-----  D0 C0    BNE  $9760
  0x0437B0 $97A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0437B1 $97A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0437B2 $97A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0437B3 $97A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0437B4 $97A4: C-----  7E 38 B0 ROR  $B038,X
  0x0437B7 $97A7: C-----  A0 FF    LDY  #$FF
  0x0437B9 $97A9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0437BA $97AA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0437BB $97AB: C-----  7E B8 D0 ROR  $D0B8,X
  0x0437BE $97AE: C-----  40       RTI  
  0x0437BF $97AF: C-----  40       RTI  
  0x0437C0 $97B0: C-----  F0 E0    BEQ  $9792
  0x0437C2 $97B2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0437C3 $97B3: C-----  00       BRK  
  0x0437C4 $97B4: C-----  00       BRK  
  0x0437C5 $97B5: C-----  00       BRK  
  0x0437C6 $97B6: C-----  00       BRK  
  0x0437C7 $97B7: C-----  00       BRK  
  0x0437C8 $97B8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0437C9 $97B9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0437CA $97BA: C-----  00       BRK  
  0x0437CB $97BB: C-----  00       BRK  
  0x0437CC $97BC: C-----  00       BRK  
  0x0437CD $97BD: C-----  00       BRK  
  0x0437CE $97BE: C-----  00       BRK  
  0x0437CF $97BF: C-----  00       BRK  
  0x0437D0 $97C0: C-----  C0 00    CPY  #$00
  0x0437D2 $97C2: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0437D3 $97C3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0437D4 $97C4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0437D5 $97C5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0437D6 $97C6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0437D7 $97C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0437D8 $97C8: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0437D9 $97C9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0437DA $97CA: C-----  70 E6    BVS  $97B2
  0x0437DC $97CC: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0437DD $97CD: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0437DE $97CE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0437DF $97CF: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0437E0 $97D0: C-----  28       PLP  
  0x0437E1 $97D1: C-----  08       PHP  
  0x0437E2 $97D2: C-----  08       PHP  
  0x0437E3 $97D3: C-----  C8       INY  
  0x0437E4 $97D4: C-----  E8       INX  
  0x0437E5 $97D5: C-----  F0 F0    BEQ  $97C7
  0x0437E7 $97D7: C-----  F0 D0    BEQ  $97A9
  0x0437E9 $97D9: C-----  F0 F0    BEQ  $97CB
  0x0437EB $97DB: C-----  30 90    BMI  $976D
  0x0437ED $97DD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0437EE $97DE: C-----  C0 C0    CPY  #$C0
  0x0437F0 $97E0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0437F1 $97E1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0437F2 $97E2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0437F3 $97E3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0437F4 $97E4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0437F5 $97E5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0437F6 $97E6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0437F7 $97E7: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0437F8 $97E8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0437F9 $97E9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0437FA $97EA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0437FB $97EB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0437FC $97EC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0437FD $97ED: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0437FE $97EE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0437FF $97EF: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043800 $97F0: C-----  F0 E0    BEQ  $97D2
  0x043802 $97F2: C-----  E0 E0    CPX  #$E0
  0x043804 $97F4: C-----  C0 C0    CPY  #$C0
  0x043806 $97F6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043807 $97F7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043808 $97F8: C-----  C0 C0    CPY  #$C0
  0x04380A $97FA: C-----  C0 80    CPY  #$80
  0x04380C $97FC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04380D $97FD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04380E $97FE: C-----  00       BRK  
  0x04380F $97FF: C-----  00       BRK  
  0x043810 $9800: C-----  00       BRK  
  0x043811 $9801: C-----  00       BRK  
  0x043812 $9802: C-----  70 F8    BVS  $97FC
  0x043814 $9804: C-----  B8       CLV  
  0x043815 $9805: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x043816 $9806: C-----  5E 2F 00 LSR  $002F,X
  0x043819 $9809: C-----  00       BRK  
  0x04381A $980A: C-----  00       BRK  
  0x04381B $980B: C-----  00       BRK  
  0x04381C $980C: C-----  40       RTI  
  0x04381D $980D: C-----  20 20 10 JSR  $1020
  0x043820 $9810: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043821 $9811: C-----  08       PHP  
  0x043822 $9812: C-----  10 20    BPL  $9834
  0x043824 $9814: C-----  21 42    AND  ($42,X)
  0x043826 $9816: C-----  81 06    STA  ($06,X)
  0x043828 $9818: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043829 $9819: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04382A $981A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04382B $981B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04382C $981C: C-----  1E 3D 7E ASL  $7E3D,X
  0x04382F $981F: C-----  F8       SED  
  0x043830 $9820: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x043831 $9821: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x043832 $9822: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x043833 $9823: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x043834 $9824: C-----  09 05    ORA  #$05
  0x043836 $9826: C-----  00       BRK  
  0x043837 $9827: C-----  00       BRK  
  0x043838 $9828: C-----  10 08    BPL  $9832
  0x04383A $982A: C-----  08       PHP  
  0x04383B $982B: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04383C $982C: C-----  06 02    ASL  $02
  0x04383E $982E: C-----  00       BRK  
  0x04383F $982F: C-----  00       BRK  
  0x043840 $9830: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x043841 $9831: C-----  B0 E0    BCS  $9813
  0x043843 $9833: C-----  C0 80    CPY  #$80
  0x043845 $9835: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043846 $9836: C-----  00       BRK  
  0x043847 $9837: C-----  00       BRK  
  0x043848 $9838: C-----  60       RTS  
  0x043849 $9839: C-----  40       RTI  
  0x04384A $983A: C-----  00       BRK  
  0x04384B $983B: C-----  00       BRK  
  0x04384C $983C: C-----  00       BRK  
  0x04384D $983D: C-----  00       BRK  
  0x04384E $983E: C-----  00       BRK  
  0x04384F $983F: C-----  00       BRK  
  0x043850 $9840: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x043851 $9841: C-----  28       PLP  
  0x043852 $9842: C-----  58       CLI  
  0x043853 $9843: C-----  B0 60    BCS  $98A5
  0x043855 $9845: C-----  C0 80    CPY  #$80
  0x043857 $9847: C-----  00       BRK  
  0x043858 $9848: C-----  A8       TAY  
  0x043859 $9849: C-----  D0 A0    BNE  $97EB
  0x04385B $984B: C-----  40       RTI  
  0x04385C $984C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04385D $984D: C-----  00       BRK  
  0x04385E $984E: C-----  00       BRK  
  0x04385F $984F: C-----  00       BRK  
  0x043860 $9850: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x043861 $9851: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x043862 $9852: C-----  C5 82    CMP  $82
  0x043864 $9854: C-----  81 81    STA  ($81,X)
  0x043866 $9856: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x043867 $9857: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x043868 $9858: C-----  38       SEC  
  0x043869 $9859: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04386A $985A: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x04386B $985B: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04386C $985C: C-----  7E 7E 7C ROR  $7C7E,X
  0x04386F $985F: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x043870 $9860: C-----  01 01    ORA  ($01,X)
  0x043872 $9862: C-----  01 01    ORA  ($01,X)
  0x043874 $9864: C-----  1D 3F 27 ORA  $273F,X
  0x043877 $9867: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x043878 $9868: C-----  00       BRK  
  0x043879 $9869: C-----  00       BRK  
  0x04387A $986A: C-----  00       BRK  
  0x04387B $986B: C-----  00       BRK  
  0x04387C $986C: C-----  00       BRK  
  0x04387D $986D: C-----  00       BRK  
  0x04387E $986E: C-----  18       CLC  
  0x04387F $986F: C-----  2C 82 04 BIT  $0482
  0x043882 $9872: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043883 $9873: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043884 $9874: C-----  08       PHP  
  0x043885 $9875: C-----  08       PHP  
  0x043886 $9876: C-----  08       PHP  
  0x043887 $9877: C-----  10 7C    BPL  $98F5
  0x043889 $9879: C-----  F8       SED  
  0x04388A $987A: C-----  F8       SED  
  0x04388B $987B: C-----  F8       SED  
  0x04388C $987C: C-----  F0 F0    BEQ  $986E
  0x04388E $987E: C-----  F0 E0    BEQ  $9860
  0x043890 $9880: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x043891 $9881: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x043892 $9882: C-----  2C 38 00 BIT  $0038
  0x043895 $9885: C-----  00       BRK  
  0x043896 $9886: C-----  00       BRK  
  0x043897 $9887: C-----  00       BRK  
  0x043898 $9888: C-----  28       PLP  
  0x043899 $9889: C-----  38       SEC  
  0x04389A $988A: C-----  10 00    BPL  $988C
  0x04389C $988C: C-----  00       BRK  
  0x04389D $988D: C-----  00       BRK  
  0x04389E $988E: C-----  00       BRK  
  0x04389F $988F: C-----  00       BRK  
  0x0438A0 $9890: C-----  00       BRK  
  0x0438A1 $9891: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0438A2 $9892: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0438A3 $9893: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0438A4 $9894: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0438A5 $9895: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0438A6 $9896: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0438A7 $9897: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0438A8 $9898: C-----  00       BRK  
  0x0438A9 $9899: C-----  00       BRK  
  0x0438AA $989A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0438AB $989B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0438AC $989C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0438AD $989D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0438AE $989E: C-----  1E 3F 07 ASL  $073F,X
  0x0438B1 $98A1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0438B2 $98A2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0438B3 $98A3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0438B4 $98A4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0438B5 $98A5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0438B6 $98A6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0438B7 $98A7: C-----  00       BRK  
  0x0438B8 $98A8: C-----  00       BRK  
  0x0438B9 $98A9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0438BA $98AA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0438BB $98AB: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0438BC $98AC: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0438BD $98AD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0438BE $98AE: C-----  00       BRK  
  0x0438BF $98AF: C-----  00       BRK  
  0x0438C0 $98B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0438C1 $98B1: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0438C2 $98B2: C-----  F0 E0    BEQ  $9894
  0x0438C4 $98B4: C-----  E0 C0    CPX  #$C0
  0x0438C6 $98B6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0438C7 $98B7: C-----  00       BRK  
  0x0438C8 $98B8: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0438C9 $98B9: C-----  F0 C0    BEQ  $987B
  0x0438CB $98BB: C-----  40       RTI  
  0x0438CC $98BC: C-----  00       BRK  
  0x0438CD $98BD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0438CE $98BE: C-----  00       BRK  
  0x0438CF $98BF: C-----  00       BRK  
  0x0438D0 $98C0: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x0438D1 $98C1: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x0438D2 $98C2: C-----  51 21    EOR  ($21),Y
  0x0438D4 $98C4: C-----  31 13    AND  ($13),Y
  0x0438D6 $98C6: C-----  0E 08 3C ASL  $3C08
  0x0438D9 $98C9: C-----  38       SEC  
  0x0438DA $98CA: C-----  2E 1E 0E ROL  $0E1E
  0x0438DD $98CD: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0438DE $98CE: C-----  01 07    ORA  ($07,X)
  0x0438E0 $98D0: C-----  90 A0    BCC  $9872
  0x0438E2 $98D2: C-----  A0 E0    LDY  #$E0
  0x0438E4 $98D4: C-----  E0 E0    CPX  #$E0
  0x0438E6 $98D6: C-----  C0 C0    CPY  #$C0
  0x0438E8 $98D8: C-----  60       RTS  
  0x0438E9 $98D9: C-----  40       RTI  
  0x0438EA $98DA: C-----  40       RTI  
  0x0438EB $98DB: C-----  00       BRK  
  0x0438EC $98DC: C-----  00       BRK  
  0x0438ED $98DD: C-----  00       BRK  
  0x0438EE $98DE: C-----  00       BRK  
  0x0438EF $98DF: C-----  00       BRK  
  0x0438F0 $98E0: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0438F1 $98E1: C-----  24 08    BIT  $08
  0x0438F3 $98E3: C-----  09 9E    ORA  #$9E
  0x0438F5 $98E5: C-----  F0 C0    BEQ  $98A7
  0x0438F7 $98E7: C-----  E1 E0    SBC  ($E0,X)
  0x0438F9 $98E9: C-----  D8       CLD  
  0x0438FA $98EA: C-----  F0 F0    BEQ  $98DC
  0x0438FC $98EC: C-----  60       RTS  
  0x0438FD $98ED: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0438FE $98EE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0438FF $98EF: C-----  00       BRK  
  0x043900 $98F0: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x043901 $98F1: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x043902 $98F2: C-----  08       PHP  
  0x043903 $98F3: C-----  18       CLC  
  0x043904 $98F4: C-----  20 51 40 JSR  $4051
  0x043907 $98F7: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x043908 $98F8: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x043909 $98F9: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04390A $98FA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04390B $98FB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04390C $98FC: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04390D $98FD: C-----  2E 0F 04 ROL  $040F
  0x043910 $9900: C-----  38       SEC  
  0x043911 $9901: C-----  2C 10 20 BIT  $2010
  0x043914 $9904: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x043915 $9905: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x043916 $9906: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x043917 $9907: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x043918 $9908: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043919 $9909: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04391A $990A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04391B $990B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04391C $990C: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x04391D $990D: C-----  0D 0D 04 ORA  $040D
  0x043920 $9910: C-----  00       BRK  
  0x043921 $9911: C-----  00       BRK  
  0x043922 $9912: C-----  00       BRK  
  0x043923 $9913: C-----  05 53    ORA  $53
  0x043925 $9915: C-----  D5 EF    CMP  $EF,X
  0x043927 $9917: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043928 $9918: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043929 $9919: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04392A $991A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04392B $991B: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04392C $991C: C-----  AD 2A 50 LDA  $502A
  0x04392F $991F: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x043930 $9920: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043931 $9921: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x043932 $9922: C-----  F9 F9 FD SBC  $FDF9,Y
  0x043935 $9925: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043936 $9926: C-----  FE FF 31 INC  $31FF,X
  0x043939 $9929: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04393A $992A: C-----  F6 F6    INC  $F6,X
  0x04393C $992C: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04393D $992D: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04393E $992E: C-----  BD 00 02 LDA  $0200,X
  0x043941 $9931: C-----  01 02    ORA  ($02,X)
  0x043943 $9933: C-----  05 8E    ORA  $8E
  0x043945 $9935: C-----  F0 C0    BEQ  $98F7
  0x043947 $9937: C-----  E1 FC    SBC  ($FC,X)
  0x043949 $9939: C-----  FE FC F8 INC  $F8FC,X
  0x04394C $993C: C-----  70 80    BVS  $98BE
  0x04394E $993E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04394F $993F: C-----  00       BRK  
  0x043950 $9940: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043951 $9941: C-----  01 02    ORA  ($02,X)
  0x043953 $9943: C-----  05 8E    ORA  $8E
  0x043955 $9945: C-----  F0 C0    BEQ  $9907
  0x043957 $9947: C-----  E1 00    SBC  ($00,X)
  0x043959 $9949: C-----  00       BRK  
  0x04395A $994A: C-----  00       BRK  
  0x04395B $994B: C-----  00       BRK  
  0x04395C $994C: C-----  01 8F    ORA  ($8F,X)
  0x04395E $994E: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04395F $994F: C-----  1E 00 00 ASL  $0000,X
  0x043962 $9952: C-----  00       BRK  
  0x043963 $9953: C-----  00       BRK  
  0x043964 $9954: C-----  00       BRK  
  0x043965 $9955: C-----  00       BRK  
  0x043966 $9956: C-----  00       BRK  
  0x043967 $9957: C-----  01 00    ORA  ($00,X)
  0x043969 $9959: C-----  00       BRK  
  0x04396A $995A: C-----  00       BRK  
  0x04396B $995B: C-----  00       BRK  
  0x04396C $995C: C-----  00       BRK  
  0x04396D $995D: C-----  00       BRK  
  0x04396E $995E: C-----  00       BRK  
  0x04396F $995F: C-----  00       BRK  
  0x043970 $9960: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043971 $9961: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043972 $9962: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043973 $9963: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043974 $9964: C-----  08       PHP  
  0x043975 $9965: C-----  18       CLC  
  0x043976 $9966: C-----  60       RTS  
  0x043977 $9967: C-----  38       SEC  
  0x043978 $9968: C-----  01 01    ORA  ($01,X)
  0x04397A $996A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04397B $996B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04397C $996C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04397D $996D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04397E $996E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04397F $996F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043980 $9970: C-----  01 00    ORA  ($00,X)
  0x043982 $9972: C-----  00       BRK  
  0x043983 $9973: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x043984 $9974: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x043985 $9975: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043986 $9976: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043987 $9977: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043988 $9978: C-----  FE FF FF INC  $FFFF,X
  0x04398B $997B: C-----  ED D2 AA SBC  $AAD2
  0x04398E $997E: C-----  AC 46 00 LDY  $0046
  0x043991 $9981: C-----  00       BRK  
  0x043992 $9982: C-----  00       BRK  
  0x043993 $9983: C-----  00       BRK  
  0x043994 $9984: C-----  00       BRK  
  0x043995 $9985: C-----  01 0B    ORA  ($0B,X)
  0x043997 $9987: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x043998 $9988: C-----  00       BRK  
  0x043999 $9989: C-----  00       BRK  
  0x04399A $998A: C-----  00       BRK  
  0x04399B $998B: C-----  00       BRK  
  0x04399C $998C: C-----  00       BRK  
  0x04399D $998D: C-----  00       BRK  
  0x04399E $998E: C-----  00       BRK  
  0x04399F $998F: C-----  01 00    ORA  ($00,X)
  0x0439A1 $9991: C-----  00       BRK  
  0x0439A2 $9992: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0439A3 $9993: C-----  2E 73 A2 ROL  $A273
  0x0439A6 $9996: C-----  00       BRK  
  0x0439A7 $9997: C-----  00       BRK  
  0x0439A8 $9998: C-----  00       BRK  
  0x0439A9 $9999: C-----  00       BRK  
  0x0439AA $999A: C-----  00       BRK  
  0x0439AB $999B: C-----  00       BRK  
  0x0439AC $999C: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0439AD $999D: C-----  5D FF FF EOR  $FFFF,X
  0x0439B0 $99A0: C-----  28       PLP  
  0x0439B1 $99A1: C-----  08       PHP  
  0x0439B2 $99A2: C-----  08       PHP  
  0x0439B3 $99A3: C-----  19 9E F0 ORA  $F09E,Y
  0x0439B6 $99A6: C-----  C0 E1    CPY  #$E1
  0x0439B8 $99A8: C-----  00       BRK  
  0x0439B9 $99A9: C-----  00       BRK  
  0x0439BA $99AA: C-----  00       BRK  
  0x0439BB $99AB: C-----  00       BRK  
  0x0439BC $99AC: C-----  01 8F    ORA  ($8F,X)
  0x0439BE $99AE: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0439BF $99AF: C-----  1E 28 08 ASL  $0828,X
  0x0439C2 $99B2: C-----  08       PHP  
  0x0439C3 $99B3: C-----  19 9E F0 ORA  $F09E,Y
  0x0439C6 $99B6: C-----  C0 E1    CPY  #$E1
  0x0439C8 $99B8: C-----  D0 F0    BNE  $99AA
  0x0439CA $99BA: C-----  F0 E0    BEQ  $999C
  0x0439CC $99BC: C-----  60       RTS  
  0x0439CD $99BD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0439CE $99BE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0439CF $99BF: C-----  00       BRK  
  0x0439D0 $99C0: C-----  00       BRK  
  0x0439D1 $99C1: C-----  00       BRK  
  0x0439D2 $99C2: C-----  10 70    BPL  $9A34
  0x0439D4 $99C4: C-----  90 10    BCC  $99D6
  0x0439D6 $99C6: C-----  10 18    BPL  $99E0
  0x0439D8 $99C8: C-----  00       BRK  
  0x0439D9 $99C9: C-----  00       BRK  
  0x0439DA $99CA: C-----  00       BRK  
  0x0439DB $99CB: C-----  00       BRK  
  0x0439DC $99CC: C-----  60       RTS  
  0x0439DD $99CD: C-----  E0 E0    CPX  #$E0
  0x0439DF $99CF: C-----  E0 FF    CPX  #$FF
  0x0439E1 $99D1: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0439E2 $99D2: C-----  F9 F9 FD SBC  $FDF9,Y
  0x0439E5 $99D5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0439E6 $99D6: C-----  FE FF 30 INC  $30FF,X
  0x0439E9 $99D9: C-----  F5 F6    SBC  $F6,X
  0x0439EB $99DB: C-----  F6 FA    INC  $FA,X
  0x0439ED $99DD: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0439EE $99DE: C-----  BD 00 00 LDA  $0000,X
  0x0439F1 $99E1: C-----  00       BRK  
  0x0439F2 $99E2: C-----  00       BRK  
  0x0439F3 $99E3: C-----  00       BRK  
  0x0439F4 $99E4: C-----  50 D5    BVC  $99BB
  0x0439F6 $99E6: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0439F7 $99E7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0439F8 $99E8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0439F9 $99E9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0439FA $99EA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0439FB $99EB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0439FC $99EC: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x0439FD $99ED: C-----  2A       ROL  A
  0x0439FE $99EE: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x0439FF $99EF: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x043A00 $99F0: C-----  00       BRK  
  0x043A01 $99F1: C-----  00       BRK  
  0x043A02 $99F2: C-----  00       BRK  
  0x043A03 $99F3: C-----  00       BRK  
  0x043A04 $99F4: C-----  00       BRK  
  0x043A05 $99F5: C-----  00       BRK  
  0x043A06 $99F6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043A07 $99F7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043A08 $99F8: C-----  00       BRK  
  0x043A09 $99F9: C-----  00       BRK  
  0x043A0A $99FA: C-----  00       BRK  
  0x043A0B $99FB: C-----  00       BRK  
  0x043A0C $99FC: C-----  00       BRK  
  0x043A0D $99FD: C-----  00       BRK  
  0x043A0E $99FE: C-----  00       BRK  
  0x043A0F $99FF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043A10 $9A00: C-----  00       BRK  
  0x043A11 $9A01: C-----  00       BRK  
  0x043A12 $9A02: C-----  00       BRK  
  0x043A13 $9A03: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043A14 $9A04: C-----  06 07    ASL  $07
  0x043A16 $9A06: C-----  0A       ASL  A
  0x043A17 $9A07: C-----  28       PLP  
  0x043A18 $9A08: C-----  00       BRK  
  0x043A19 $9A09: C-----  00       BRK  
  0x043A1A $9A0A: C-----  00       BRK  
  0x043A1B $9A0B: C-----  00       BRK  
  0x043A1C $9A0C: C-----  00       BRK  
  0x043A1D $9A0D: C-----  00       BRK  
  0x043A1E $9A0E: C-----  05 07    ORA  $07
  0x043A20 $9A10: C-----  00       BRK  
  0x043A21 $9A11: C-----  00       BRK  
  0x043A22 $9A12: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x043A23 $9A13: C-----  6A       ROR  A
  0x043A24 $9A14: C-----  !!UNDEF $B3  ; unknown opcode, treating as data
  0x043A25 $9A15: C-----  20 00 00 JSR  $0000
  0x043A28 $9A18: C-----  00       BRK  
  0x043A29 $9A19: C-----  00       BRK  
  0x043A2A $9A1A: C-----  00       BRK  
  0x043A2B $9A1B: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043A2C $9A1C: C-----  4C DF FF JMP  $FFDF
  0x043A2F $9A1F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043A30 $9A20: C-----  38       SEC  
  0x043A31 $9A21: C-----  2C 30 50 BIT  $5030
  0x043A34 $9A24: C-----  68       PLA  
  0x043A35 $9A25: C-----  20 1A 0B JSR  $0B1A
  0x043A38 $9A28: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043A39 $9A29: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x043A3A $9A2A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043A3B $9A2B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043A3C $9A2C: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x043A3D $9A2D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x043A3E $9A2E: C-----  05 04    ORA  $04
  0x043A40 $9A30: C-----  00       BRK  
  0x043A41 $9A31: C-----  00       BRK  
  0x043A42 $9A32: C-----  00       BRK  
  0x043A43 $9A33: C-----  05 03    ORA  $03
  0x043A45 $9A35: C-----  25 AF    AND  $AF
  0x043A47 $9A37: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043A48 $9A38: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043A49 $9A39: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043A4A $9A3A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043A4B $9A3B: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x043A4C $9A3C: C-----  FD DA 52 SBC  $52DA,X
  0x043A4F $9A3F: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x043A50 $9A40: C-----  08       PHP  
  0x043A51 $9A41: C-----  08       PHP  
  0x043A52 $9A42: C-----  18       CLC  
  0x043A53 $9A43: C-----  68       PLA  
  0x043A54 $9A44: C-----  88       DEY  
  0x043A55 $9A45: C-----  08       PHP  
  0x043A56 $9A46: C-----  08       PHP  
  0x043A57 $9A47: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x043A58 $9A48: C-----  00       BRK  
  0x043A59 $9A49: C-----  00       BRK  
  0x043A5A $9A4A: C-----  00       BRK  
  0x043A5B $9A4B: C-----  10 70    BPL  $9ABD
  0x043A5D $9A4D: C-----  F0 F0    BEQ  $9A3F
  0x043A5F $9A4F: C-----  E8       INX  
  0x043A60 $9A50: C-----  28       PLP  
  0x043A61 $9A51: C-----  08       PHP  
  0x043A62 $9A52: C-----  08       PHP  
  0x043A63 $9A53: C-----  09 1E    ORA  #$1E
  0x043A65 $9A55: C-----  10 30    BPL  $9A87
  0x043A67 $9A57: C-----  E1 00    SBC  ($00,X)
  0x043A69 $9A59: C-----  00       BRK  
  0x043A6A $9A5A: C-----  00       BRK  
  0x043A6B $9A5B: C-----  00       BRK  
  0x043A6C $9A5C: C-----  01 0F    ORA  ($0F,X)
  0x043A6E $9A5E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043A6F $9A5F: C-----  1E 1C 24 ASL  $241C,X
  0x043A72 $9A62: C-----  08       PHP  
  0x043A73 $9A63: C-----  09 9E    ORA  #$9E
  0x043A75 $9A65: C-----  F0 C0    BEQ  $9A27
  0x043A77 $9A67: C-----  E1 00    SBC  ($00,X)
  0x043A79 $9A69: C-----  00       BRK  
  0x043A7A $9A6A: C-----  00       BRK  
  0x043A7B $9A6B: C-----  00       BRK  
  0x043A7C $9A6C: C-----  01 8F    ORA  ($8F,X)
  0x043A7E $9A6E: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x043A7F $9A6F: C-----  1E 00 00 ASL  $0000,X
  0x043A82 $9A72: C-----  00       BRK  
  0x043A83 $9A73: C-----  01 02    ORA  ($02,X)
  0x043A85 $9A75: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043A86 $9A76: C-----  05 09    ORA  $09
  0x043A88 $9A78: C-----  00       BRK  
  0x043A89 $9A79: C-----  00       BRK  
  0x043A8A $9A7A: C-----  00       BRK  
  0x043A8B $9A7B: C-----  00       BRK  
  0x043A8C $9A7C: C-----  00       BRK  
  0x043A8D $9A7D: C-----  00       BRK  
  0x043A8E $9A7E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043A8F $9A7F: C-----  06 FB    ASL  $FB
  0x043A91 $9A81: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043A92 $9A82: C-----  F9 F9 FD SBC  $FDF9,Y
  0x043A95 $9A85: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043A96 $9A86: C-----  FE FF 01 INC  $01FF,X
  0x043A99 $9A89: C-----  F0 F6    BEQ  $9A81
  0x043A9B $9A8B: C-----  F6 FA    INC  $FA,X
  0x043A9D $9A8D: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x043A9E $9A8E: C-----  BD 00 FB LDA  $FB00,X
  0x043AA1 $9A91: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043AA2 $9A92: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043AA3 $9A93: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043AA4 $9A94: C-----  3E 80 80 ROL  $8080,X
  0x043AA7 $9A97: C-----  40       RTI  
  0x043AA8 $9A98: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x043AA9 $9A99: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x043AAA $9A9A: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x043AAB $9A9B: C-----  B6 C1    LDX  $C1,Y
  0x043AAD $9A9D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043AAE $9A9E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043AAF $9A9F: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x043AB0 $9AA0: C-----  00       BRK  
  0x043AB1 $9AA1: C-----  00       BRK  
  0x043AB2 $9AA2: C-----  00       BRK  
  0x043AB3 $9AA3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043AB4 $9AA4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043AB5 $9AA5: C-----  06 0A    ASL  $0A
  0x043AB7 $9AA7: C-----  28       PLP  
  0x043AB8 $9AA8: C-----  00       BRK  
  0x043AB9 $9AA9: C-----  00       BRK  
  0x043ABA $9AAA: C-----  00       BRK  
  0x043ABB $9AAB: C-----  00       BRK  
  0x043ABC $9AAC: C-----  00       BRK  
  0x043ABD $9AAD: C-----  01 05    ORA  ($05,X)
  0x043ABF $9AAF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043AC0 $9AB0: C-----  00       BRK  
  0x043AC1 $9AB1: C-----  21 47    AND  ($47,X)
  0x043AC3 $9AB3: C-----  D9 22 40 CMP  $4022,Y
  0x043AC6 $9AB6: C-----  00       BRK  
  0x043AC7 $9AB7: C-----  00       BRK  
  0x043AC8 $9AB8: C-----  00       BRK  
  0x043AC9 $9AB9: C-----  00       BRK  
  0x043ACA $9ABA: C-----  00       BRK  
  0x043ACB $9ABB: C-----  06 DD    ASL  $DD
  0x043ACD $9ABD: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x043ACE $9ABE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043ACF $9ABF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043AD0 $9AC0: C-----  E1 E2    SBC  ($E2,X)
  0x043AD2 $9AC2: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x043AD3 $9AC3: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x043AD4 $9AC4: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x043AD5 $9AC5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x043AD6 $9AC6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043AD7 $9AC7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043AD8 $9AC8: C-----  DE 5D 5A DEC  $5A5D,X
  0x043ADB $9ACB: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x043ADC $9ACC: C-----  6D EB F2 ADC  $F2EB
  0x043ADF $9ACF: C-----  FD 08 28 SBC  $2808,X
  0x043AE2 $9AD2: C-----  38       SEC  
  0x043AE3 $9AD3: C-----  2C 10 18 BIT  $1810
  0x043AE6 $9AD6: C-----  20 2B 07 JSR  $072B
  0x043AE9 $9AD9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043AEA $9ADA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043AEB $9ADB: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x043AEC $9ADC: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043AED $9ADD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043AEE $9ADE: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x043AEF $9ADF: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043AF0 $9AE0: C-----  00       BRK  
  0x043AF1 $9AE1: C-----  8E 35 C6 STX  $C635
  0x043AF4 $9AE4: C-----  00       BRK  
  0x043AF5 $9AE5: C-----  00       BRK  
  0x043AF6 $9AE6: C-----  00       BRK  
  0x043AF7 $9AE7: C-----  01 00    ORA  ($00,X)
  0x043AF9 $9AE9: C-----  00       BRK  
  0x043AFA $9AEA: C-----  08       PHP  
  0x043AFB $9AEB: C-----  39 FF FF AND  $FFFF,Y
  0x043AFE $9AEE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043AFF $9AEF: C-----  FE 18 68 INC  $6818,X
  0x043B02 $9AF2: C-----  90 10    BCC  $9B04
  0x043B04 $9AF4: C-----  20 40 80 JSR  $8040
  0x043B07 $9AF7: C-----  00       BRK  
  0x043B08 $9AF8: C-----  00       BRK  
  0x043B09 $9AF9: C-----  10 60    BPL  $9B5B
  0x043B0B $9AFB: C-----  E0 C0    CPX  #$C0
  0x043B0D $9AFD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043B0E $9AFE: C-----  00       BRK  
  0x043B0F $9AFF: C-----  00       BRK  
  0x043B10 $9B00: C-----  28       PLP  
  0x043B11 $9B01: C-----  08       PHP  
  0x043B12 $9B02: C-----  08       PHP  
  0x043B13 $9B03: C-----  09 1E    ORA  #$1E
  0x043B15 $9B05: C-----  10 30    BPL  $9B37
  0x043B17 $9B07: C-----  E1 D0    SBC  ($D0,X)
  0x043B19 $9B09: C-----  F0 F0    BEQ  $9AFB
  0x043B1B $9B0B: C-----  F0 E0    BEQ  $9AED
  0x043B1D $9B0D: C-----  E0 C0    CPX  #$C0
  0x043B1F $9B0F: C-----  00       BRK  
  0x043B20 $9B10: C-----  09 08    ORA  #$08
  0x043B22 $9B12: C-----  10 12    BPL  $9B26
  0x043B24 $9B14: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x043B25 $9B15: C-----  20 24 31 JSR  $3124
  0x043B28 $9B18: C-----  06 07    ASL  $07
  0x043B2A $9B1A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043B2B $9B1B: C-----  0D 0B 1F ORA  $1F0B
  0x043B2E $9B1E: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x043B2F $9B1F: C-----  0E 00 00 ASL  $0000
  0x043B32 $9B22: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x043B33 $9B23: C-----  68       PLA  
  0x043B34 $9B24: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x043B35 $9B25: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043B36 $9B26: C-----  00       BRK  
  0x043B37 $9B27: C-----  00       BRK  
  0x043B38 $9B28: C-----  00       BRK  
  0x043B39 $9B29: C-----  00       BRK  
  0x043B3A $9B2A: C-----  00       BRK  
  0x043B3B $9B2B: C-----  10 30    BPL  $9B5D
  0x043B3D $9B2D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043B3E $9B2E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043B3F $9B2F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043B40 $9B30: C-----  00       BRK  
  0x043B41 $9B31: C-----  10 30    BPL  $9B63
  0x043B43 $9B33: C-----  D0 10    BNE  $9B45
  0x043B45 $9B35: C-----  28       PLP  
  0x043B46 $9B36: C-----  38       SEC  
  0x043B47 $9B37: C-----  08       PHP  
  0x043B48 $9B38: C-----  00       BRK  
  0x043B49 $9B39: C-----  00       BRK  
  0x043B4A $9B3A: C-----  00       BRK  
  0x043B4B $9B3B: C-----  20 E0 C0 JSR  $C0E0
  0x043B4E $9B3E: C-----  C0 F0    CPY  #$F0
  0x043B50 $9B40: C-----  46 01    LSR  $01
  0x043B52 $9B42: C-----  00       BRK  
  0x043B53 $9B43: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x043B54 $9B44: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x043B55 $9B45: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x043B56 $9B46: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043B57 $9B47: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043B58 $9B48: C-----  B9 FE FF LDA  $FFFE,Y
  0x043B5B $9B4B: C-----  ED D2 4A SBC  $4AD2
  0x043B5E $9B4E: C-----  AC 46 C0 LDY  $C046
  0x043B61 $9B51: C-----  40       RTI  
  0x043B62 $9B52: C-----  20 A1 2E JSR  $2EA1
  0x043B65 $9B55: C-----  70 C0    BVS  $9B17
  0x043B67 $9B57: C-----  E1 00    SBC  ($00,X)
  0x043B69 $9B59: C-----  00       BRK  
  0x043B6A $9B5A: C-----  00       BRK  
  0x043B6B $9B5B: C-----  00       BRK  
  0x043B6C $9B5C: C-----  01 0F    ORA  ($0F,X)
  0x043B6E $9B5E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x043B6F $9B5F: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x043B70 $9B60: C-----  F1 F9    SBC  ($F9),Y
  0x043B72 $9B62: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043B73 $9B63: C-----  F9 FD FC SBC  $FCFD,Y
  0x043B76 $9B66: C-----  FE FF 21 INC  $21FF,X
  0x043B79 $9B69: C-----  F0 F0    BEQ  $9B5B
  0x043B7B $9B6B: C-----  F6 FA    INC  $FA,X
  0x043B7D $9B6D: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x043B7E $9B6E: C-----  BD 00 EF LDA  $EF00,X
  0x043B81 $9B71: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043B82 $9B72: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043B83 $9B73: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043B84 $9B74: C-----  7D 80 80 ADC  $8080,X
  0x043B87 $9B77: C-----  40       RTI  
  0x043B88 $9B78: C-----  CE 7A D4 DEC  $D47A
  0x043B8B $9B7B: C-----  7D 82 7F ADC  $7F82,X
  0x043B8E $9B7E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043B8F $9B7F: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x043B90 $9B80: C-----  00       BRK  
  0x043B91 $9B81: C-----  00       BRK  
  0x043B92 $9B82: C-----  00       BRK  
  0x043B93 $9B83: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043B94 $9B84: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x043B95 $9B85: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x043B96 $9B86: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043B97 $9B87: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043B98 $9B88: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043B99 $9B89: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043B9A $9B8A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043B9B $9B8B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043B9C $9B8C: C-----  DD 49 B4 CMP  $B449,X
  0x043B9F $9B8F: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x043BA0 $9B90: C-----  08       PHP  
  0x043BA1 $9B91: C-----  10 08    BPL  $9B9B
  0x043BA3 $9B93: C-----  10 A7    BPL  $9B3C
  0x043BA5 $9B95: C-----  F8       SED  
  0x043BA6 $9B96: C-----  C0 E1    CPY  #$E1
  0x043BA8 $9B98: C-----  00       BRK  
  0x043BA9 $9B99: C-----  00       BRK  
  0x043BAA $9B9A: C-----  00       BRK  
  0x043BAB $9B9B: C-----  00       BRK  
  0x043BAC $9B9C: C-----  00       BRK  
  0x043BAD $9B9D: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x043BAE $9B9E: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x043BAF $9B9F: C-----  1E FB FF ASL  $FFFB,X
  0x043BB2 $9BA2: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x043BB3 $9BA3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043BB4 $9BA4: C-----  3E 80 80 ROL  $8080,X
  0x043BB7 $9BA7: C-----  40       RTI  
  0x043BB8 $9BA8: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x043BB9 $9BA9: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x043BBA $9BAA: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x043BBB $9BAB: C-----  !!UNDEF $B2  ; unknown opcode, treating as data
  0x043BBC $9BAC: C-----  C1 7F    CMP  ($7F,X)
  0x043BBE $9BAE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043BBF $9BAF: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x043BC0 $9BB0: C-----  08       PHP  
  0x043BC1 $9BB1: C-----  10 08    BPL  $9BBB
  0x043BC3 $9BB3: C-----  10 A7    BPL  $9B5C
  0x043BC5 $9BB5: C-----  F8       SED  
  0x043BC6 $9BB6: C-----  C0 E1    CPY  #$E1
  0x043BC8 $9BB8: C-----  F0 E0    BEQ  $9B9A
  0x043BCA $9BBA: C-----  F0 E0    BEQ  $9B9C
  0x043BCC $9BBC: C-----  40       RTI  
  0x043BCD $9BBD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043BCE $9BBE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043BCF $9BBF: C-----  00       BRK  
  0x043BD0 $9BC0: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043BD1 $9BC1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043BD2 $9BC2: C-----  08       PHP  
  0x043BD3 $9BC3: C-----  08       PHP  
  0x043BD4 $9BC4: C-----  08       PHP  
  0x043BD5 $9BC5: C-----  08       PHP  
  0x043BD6 $9BC6: C-----  08       PHP  
  0x043BD7 $9BC7: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x043BD8 $9BC8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043BD9 $9BC9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043BDA $9BCA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043BDB $9BCB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043BDC $9BCC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043BDD $9BCD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043BDE $9BCE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043BDF $9BCF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043BE0 $9BD0: C-----  01 00    ORA  ($00,X)
  0x043BE2 $9BD2: C-----  00       BRK  
  0x043BE3 $9BD3: C-----  10 3A    BPL  $9C0F
  0x043BE5 $9BD5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043BE6 $9BD6: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043BE7 $9BD7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043BE8 $9BD8: C-----  FE FF FF INC  $FFFF,X
  0x043BEB $9BDB: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x043BEC $9BDC: C-----  D5 AA    CMP  $AA,X
  0x043BEE $9BDE: C-----  AC 26 FC LDY  $FC26
  0x043BF1 $9BE1: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x043BF2 $9BE2: C-----  F9 F9 FD SBC  $FDF9,Y
  0x043BF5 $9BE5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043BF6 $9BE6: C-----  FE FF 30 INC  $30FF,X
  0x043BF9 $9BE9: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x043BFA $9BEA: C-----  F6 F6    INC  $F6,X
  0x043BFC $9BEC: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x043BFD $9BED: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x043BFE $9BEE: C-----  BD 00 F7 LDA  $F700,X
  0x043C01 $9BF1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043C02 $9BF2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043C03 $9BF3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043C04 $9BF4: C-----  3D 80 80 AND  $8080,X
  0x043C07 $9BF7: C-----  40       RTI  
  0x043C08 $9BF8: C-----  66 FA    ROR  $FA
  0x043C0A $9BFA: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x043C0B $9BFB: C-----  BD C2 7F LDA  $7FC2,X
  0x043C0E $9BFE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043C0F $9BFF: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x043C10 $9C00: ------  .byte $00
  0x043C11 $9C01: ------  .byte $00
  0x043C12 $9C02: ------  .byte $00
  0x043C13 $9C03: ------  .byte $00
  0x043C14 $9C04: ------  .byte $00
  0x043C15 $9C05: ------  .byte $00
  0x043C16 $9C06: ------  .byte $00
  0x043C17 $9C07: ------  .byte $00
  0x043C18 $9C08: ------  .byte $00
  0x043C19 $9C09: ------  .byte $00
  0x043C1A $9C0A: ------  .byte $00
  0x043C1B $9C0B: ------  .byte $00
  0x043C1C $9C0C: ------  .byte $00
  0x043C1D $9C0D: ------  .byte $00
  0x043C1E $9C0E: ------  .byte $00
  0x043C1F $9C0F: ------  .byte $00
  0x043C20 $9C10: ------  .byte $FF
  0x043C21 $9C11: ------  .byte $FF
  0x043C22 $9C12: ------  .byte $FF
  0x043C23 $9C13: ------  .byte $FF
  0x043C24 $9C14: ------  .byte $FF
  0x043C25 $9C15: ------  .byte $FF
  0x043C26 $9C16: ------  .byte $FF
  0x043C27 $9C17: ------  .byte $FF
  0x043C28 $9C18: ------  .byte $00
  0x043C29 $9C19: ------  .byte $00
  0x043C2A $9C1A: ------  .byte $00
  0x043C2B $9C1B: ------  .byte $00
  0x043C2C $9C1C: ------  .byte $00
  0x043C2D $9C1D: ------  .byte $00
  0x043C2E $9C1E: ------  .byte $00
  0x043C2F $9C1F: ------  .byte $00
  0x043C30 $9C20: C-----  00       BRK  
  0x043C31 $9C21: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043C32 $9C22: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043C33 $9C23: C-----  81 CE    STA  ($CE,X)
  0x043C35 $9C25: C-----  F0 C0    BEQ  $9BE7
  0x043C37 $9C27: C-----  E1 00    SBC  ($00,X)
  0x043C39 $9C29: C-----  00       BRK  
  0x043C3A $9C2A: C-----  00       BRK  
  0x043C3B $9C2B: C-----  00       BRK  
  0x043C3C $9C2C: C-----  01 0F    ORA  ($0F,X)
  0x043C3E $9C2E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x043C3F $9C2F: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x043C40 $9C30: C-----  18       CLC  
  0x043C41 $9C31: C-----  2C 10 20 BIT  $2010
  0x043C44 $9C34: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x043C45 $9C35: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x043C46 $9C36: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x043C47 $9C37: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x043C48 $9C38: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043C49 $9C39: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x043C4A $9C3A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043C4B $9C3B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x043C4C $9C3C: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x043C4D $9C3D: C-----  0D 0D 04 ORA  $040D
  0x043C50 $9C40: C-----  00       BRK  
  0x043C51 $9C41: C-----  00       BRK  
  0x043C52 $9C42: C-----  00       BRK  
  0x043C53 $9C43: C-----  00       BRK  
  0x043C54 $9C44: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x043C55 $9C45: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x043C56 $9C46: C-----  01 00    ORA  ($00,X)
  0x043C58 $9C48: C-----  00       BRK  
  0x043C59 $9C49: C-----  00       BRK  
  0x043C5A $9C4A: C-----  00       BRK  
  0x043C5B $9C4B: C-----  00       BRK  
  0x043C5C $9C4C: C-----  00       BRK  
  0x043C5D $9C4D: C-----  78       SEI  
  0x043C5E $9C4E: C-----  FE FF 00 INC  $00FF,X
  0x043C61 $9C51: C-----  00       BRK  
  0x043C62 $9C52: C-----  00       BRK  
  0x043C63 $9C53: C-----  20 21 63 JSR  $6321
  0x043C66 $9C56: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x043C67 $9C57: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043C68 $9C58: C-----  00       BRK  
  0x043C69 $9C59: C-----  00       BRK  
  0x043C6A $9C5A: C-----  00       BRK  
  0x043C6B $9C5B: C-----  00       BRK  
  0x043C6C $9C5C: C-----  00       BRK  
  0x043C6D $9C5D: C-----  00       BRK  
  0x043C6E $9C5E: C-----  00       BRK  
  0x043C6F $9C5F: C-----  00       BRK  
  0x043C70 $9C60: C-----  00       BRK  
  0x043C71 $9C61: C-----  00       BRK  
  0x043C72 $9C62: C-----  00       BRK  
  0x043C73 $9C63: C-----  05 53    ORA  $53
  0x043C75 $9C65: C-----  D5 EF    CMP  $EF,X
  0x043C77 $9C67: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043C78 $9C68: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043C79 $9C69: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043C7A $9C6A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043C7B $9C6B: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x043C7C $9C6C: C-----  AD 2E 5E LDA  $5E2E
  0x043C7F $9C6F: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x043C80 $9C70: C-----  05 08    ORA  $08
  0x043C82 $9C72: C-----  08       PHP  
  0x043C83 $9C73: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x043C84 $9C74: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x043C85 $9C75: C-----  50 74    BVC  $9CEB
  0x043C87 $9C77: C-----  49 02    EOR  #$02
  0x043C89 $9C79: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043C8A $9C7A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043C8B $9C7B: C-----  0D 0B 0F ORA  $0F0B
  0x043C8E $9C7E: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x043C8F $9C7F: C-----  36 F7    ROL  $F7,X
  0x043C91 $9C81: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043C92 $9C82: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043C93 $9C83: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043C94 $9C84: C-----  3D 80 80 AND  $8080,X
  0x043C97 $9C87: C-----  40       RTI  
  0x043C98 $9C88: C-----  56 FA    LSR  $FA,X
  0x043C9A $9C8A: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x043C9B $9C8B: C-----  BD C2 7F LDA  $7FC2,X
  0x043C9E $9C8E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043C9F $9C8F: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x043CA0 $9C90: C-----  E1 E2    SBC  ($E2,X)
  0x043CA2 $9C92: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x043CA3 $9C93: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x043CA4 $9C94: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x043CA5 $9C95: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x043CA6 $9C96: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043CA7 $9C97: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043CA8 $9C98: C-----  DE DD DA DEC  $DADD,X
  0x043CAB $9C9B: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x043CAC $9C9C: C-----  6D EB F2 ADC  $F2EB
  0x043CAF $9C9F: C-----  FD 00 00 SBC  $0000,X
  0x043CB2 $9CA2: C-----  00       BRK  
  0x043CB3 $9CA3: C-----  00       BRK  
  0x043CB4 $9CA4: C-----  00       BRK  
  0x043CB5 $9CA5: C-----  78       SEI  
  0x043CB6 $9CA6: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x043CB7 $9CA7: C-----  20 00 00 JSR  $0000
  0x043CBA $9CAA: C-----  00       BRK  
  0x043CBB $9CAB: C-----  00       BRK  
  0x043CBC $9CAC: C-----  00       BRK  
  0x043CBD $9CAD: C-----  00       BRK  
  0x043CBE $9CAE: C-----  78       SEI  
  0x043CBF $9CAF: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x043CC0 $9CB0: C-----  00       BRK  
  0x043CC1 $9CB1: C-----  00       BRK  
  0x043CC2 $9CB2: C-----  00       BRK  
  0x043CC3 $9CB3: C-----  00       BRK  
  0x043CC4 $9CB4: C-----  00       BRK  
  0x043CC5 $9CB5: C-----  00       BRK  
  0x043CC6 $9CB6: C-----  00       BRK  
  0x043CC7 $9CB7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043CC8 $9CB8: C-----  00       BRK  
  0x043CC9 $9CB9: C-----  00       BRK  
  0x043CCA $9CBA: C-----  00       BRK  
  0x043CCB $9CBB: C-----  00       BRK  
  0x043CCC $9CBC: C-----  00       BRK  
  0x043CCD $9CBD: C-----  00       BRK  
  0x043CCE $9CBE: C-----  00       BRK  
  0x043CCF $9CBF: C-----  00       BRK  
  0x043CD0 $9CC0: C-----  E1 E2    SBC  ($E2,X)
  0x043CD2 $9CC2: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x043CD3 $9CC3: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x043CD4 $9CC4: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x043CD5 $9CC5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x043CD6 $9CC6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043CD7 $9CC7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043CD8 $9CC8: C-----  5E 5D 5A LSR  $5A5D,X
  0x043CDB $9CCB: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x043CDC $9CCC: C-----  6D EB F2 ADC  $F2EB
  0x043CDF $9CCF: C-----  FD F1 F9 SBC  $F9F1,X
  0x043CE2 $9CD2: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x043CE3 $9CD3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043CE4 $9CD4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043CE5 $9CD5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043CE6 $9CD6: C-----  FE FF 41 INC  $41FF,X
  0x043CE9 $9CD9: C-----  F0 E0    BEQ  $9CBB
  0x043CEB $9CDB: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x043CEC $9CDC: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x043CED $9CDD: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x043CEE $9CDE: C-----  BD 00 00 LDA  $0000,X
  0x043CF1 $9CE1: C-----  00       BRK  
  0x043CF2 $9CE2: C-----  00       BRK  
  0x043CF3 $9CE3: C-----  00       BRK  
  0x043CF4 $9CE4: C-----  01 1E    ORA  ($1E,X)
  0x043CF6 $9CE6: C-----  60       RTS  
  0x043CF7 $9CE7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043CF8 $9CE8: C-----  00       BRK  
  0x043CF9 $9CE9: C-----  00       BRK  
  0x043CFA $9CEA: C-----  00       BRK  
  0x043CFB $9CEB: C-----  00       BRK  
  0x043CFC $9CEC: C-----  00       BRK  
  0x043CFD $9CED: C-----  01 1F    ORA  ($1F,X)
  0x043CFF $9CEF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043D00 $9CF0: C-----  00       BRK  
  0x043D01 $9CF1: C-----  00       BRK  
  0x043D02 $9CF2: C-----  00       BRK  
  0x043D03 $9CF3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043D04 $9CF4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043D05 $9CF5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043D06 $9CF6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043D07 $9CF7: C-----  C0 00    CPY  #$00
  0x043D09 $9CF9: C-----  00       BRK  
  0x043D0A $9CFA: C-----  00       BRK  
  0x043D0B $9CFB: C-----  00       BRK  
  0x043D0C $9CFC: C-----  00       BRK  
  0x043D0D $9CFD: C-----  00       BRK  
  0x043D0E $9CFE: C-----  00       BRK  
  0x043D0F $9CFF: C-----  00       BRK  
  0x043D10 $9D00: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043D11 $9D01: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043D12 $9D02: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x043D13 $9D03: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x043D14 $9D04: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x043D15 $9D05: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x043D16 $9D06: C-----  1D 1D 00 ORA  $001D,X
  0x043D19 $9D09: C-----  00       BRK  
  0x043D1A $9D0A: C-----  10 38    BPL  $9D44
  0x043D1C $9D0C: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x043D1D $9D0D: C-----  EC E2 E2 CPX  $E2E2
  0x043D20 $9D10: ------  .byte $00
  0x043D21 $9D11: ------  .byte $00
  0x043D22 $9D12: ------  .byte $00
  0x043D23 $9D13: ------  .byte $20
  0x043D24 $9D14: ------  .byte $21
  0x043D25 $9D15: ------  .byte $63
  0x043D26 $9D16: ------  .byte $55
  0x043D27 $9D17: ------  .byte $99
  0x043D28 $9D18: ------  .byte $00
  0x043D29 $9D19: ------  .byte $00
  0x043D2A $9D1A: ------  .byte $00
  0x043D2B $9D1B: ------  .byte $00
  0x043D2C $9D1C: ------  .byte $00
  0x043D2D $9D1D: ------  .byte $00
  0x043D2E $9D1E: ------  .byte $22
  0x043D2F $9D1F: ------  .byte $66
  0x043D30 $9D20: C-----  00       BRK  
  0x043D31 $9D21: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043D32 $9D22: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043D33 $9D23: C-----  C0 F0    CPY  #$F0
  0x043D35 $9D25: C-----  C0 80    CPY  #$80
  0x043D37 $9D27: C-----  00       BRK  
  0x043D38 $9D28: C-----  00       BRK  
  0x043D39 $9D29: C-----  00       BRK  
  0x043D3A $9D2A: C-----  00       BRK  
  0x043D3B $9D2B: C-----  00       BRK  
  0x043D3C $9D2C: C-----  00       BRK  
  0x043D3D $9D2D: C-----  00       BRK  
  0x043D3E $9D2E: C-----  00       BRK  
  0x043D3F $9D2F: C-----  00       BRK  
  0x043D40 $9D30: ------  .byte $E1
  0x043D41 $9D31: ------  .byte $F9
  0x043D42 $9D32: ------  .byte $EC
  0x043D43 $9D33: ------  .byte $C6
  0x043D44 $9D34: ------  .byte $22
  0x043D45 $9D35: ------  .byte $13
  0x043D46 $9D36: ------  .byte $1D
  0x043D47 $9D37: ------  .byte $1D
  0x043D48 $9D38: ------  .byte $1E
  0x043D49 $9D39: ------  .byte $06
  0x043D4A $9D3A: ------  .byte $13
  0x043D4B $9D3B: ------  .byte $39
  0x043D4C $9D3C: ------  .byte $DD
  0x043D4D $9D3D: ------  .byte $EC
  0x043D4E $9D3E: ------  .byte $E2
  0x043D4F $9D3F: ------  .byte $E2
  0x043D50 $9D40: ------  .byte $00
  0x043D51 $9D41: ------  .byte $80
  0x043D52 $9D42: ------  .byte $80
  0x043D53 $9D43: ------  .byte $40
  0x043D54 $9D44: ------  .byte $30
  0x043D55 $9D45: ------  .byte $40
  0x043D56 $9D46: ------  .byte $80
  0x043D57 $9D47: ------  .byte $00
  0x043D58 $9D48: ------  .byte $00
  0x043D59 $9D49: ------  .byte $00
  0x043D5A $9D4A: ------  .byte $00
  0x043D5B $9D4B: ------  .byte $80
  0x043D5C $9D4C: ------  .byte $C0
  0x043D5D $9D4D: ------  .byte $80
  0x043D5E $9D4E: ------  .byte $00
  0x043D5F $9D4F: ------  .byte $00
  0x043D60 $9D50: C-----  00       BRK  
  0x043D61 $9D51: C-----  00       BRK  
  0x043D62 $9D52: C-----  00       BRK  
  0x043D63 $9D53: C-----  00       BRK  
  0x043D64 $9D54: C-----  00       BRK  
  0x043D65 $9D55: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x043D66 $9D56: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x043D67 $9D57: C-----  00       BRK  
  0x043D68 $9D58: C-----  00       BRK  
  0x043D69 $9D59: C-----  00       BRK  
  0x043D6A $9D5A: C-----  00       BRK  
  0x043D6B $9D5B: C-----  00       BRK  
  0x043D6C $9D5C: C-----  00       BRK  
  0x043D6D $9D5D: C-----  00       BRK  
  0x043D6E $9D5E: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x043D6F $9D5F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043D70 $9D60: C-----  00       BRK  
  0x043D71 $9D61: C-----  00       BRK  
  0x043D72 $9D62: C-----  00       BRK  
  0x043D73 $9D63: C-----  00       BRK  
  0x043D74 $9D64: C-----  00       BRK  
  0x043D75 $9D65: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043D76 $9D66: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043D77 $9D67: C-----  08       PHP  
  0x043D78 $9D68: C-----  00       BRK  
  0x043D79 $9D69: C-----  00       BRK  
  0x043D7A $9D6A: C-----  00       BRK  
  0x043D7B $9D6B: C-----  00       BRK  
  0x043D7C $9D6C: C-----  00       BRK  
  0x043D7D $9D6D: C-----  00       BRK  
  0x043D7E $9D6E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043D7F $9D6F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043D80 $9D70: C-----  E0 E0    CPX  #$E0
  0x043D82 $9D72: C-----  C0 80    CPY  #$80
  0x043D84 $9D74: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043D85 $9D75: C-----  00       BRK  
  0x043D86 $9D76: C-----  00       BRK  
  0x043D87 $9D77: C-----  00       BRK  
  0x043D88 $9D78: C-----  00       BRK  
  0x043D89 $9D79: C-----  C0 80    CPY  #$80
  0x043D8B $9D7B: C-----  00       BRK  
  0x043D8C $9D7C: C-----  00       BRK  
  0x043D8D $9D7D: C-----  00       BRK  
  0x043D8E $9D7E: C-----  00       BRK  
  0x043D8F $9D7F: C-----  00       BRK  
  0x043D90 $9D80: C-----  3E 3C 3C ROL  $3C3C,X
  0x043D93 $9D83: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x043D94 $9D84: C-----  7E 7F 73 ROR  $737F,X
  0x043D97 $9D87: C-----  31 19    AND  ($19),Y
  0x043D99 $9D89: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x043D9A $9D8A: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x043D9B $9D8B: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x043D9C $9D8C: C-----  2D 22 2D AND  $2D22
  0x043D9F $9D8F: C-----  0E 11 11 ASL  $1111
  0x043DA2 $9D92: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x043DA3 $9D93: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x043DA4 $9D94: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x043DA5 $9D95: C-----  4E 24 1C LSR  $1C24
  0x043DA8 $9D98: C-----  00       BRK  
  0x043DA9 $9D99: C-----  00       BRK  
  0x043DAA $9D9A: C-----  01 00    ORA  ($00,X)
  0x043DAC $9D9C: C-----  60       RTS  
  0x043DAD $9D9D: C-----  30 18    BMI  $9DB7
  0x043DAF $9D9F: C-----  00       BRK  
  0x043DB0 $9DA0: C-----  11 11    ORA  ($11),Y
  0x043DB2 $9DA2: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x043DB3 $9DA3: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x043DB4 $9DA4: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x043DB5 $9DA5: C-----  4E 24 1C LSR  $1C24
  0x043DB8 $9DA8: C-----  0E 0E 0D ASL  $0D0E
  0x043DBB $9DAB: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x043DBC $9DAC: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043DBD $9DAD: C-----  00       BRK  
  0x043DBE $9DAE: C-----  00       BRK  
  0x043DBF $9DAF: C-----  00       BRK  
  0x043DC0 $9DB0: C-----  !!UNDEF $D2  ; unknown opcode, treating as data
  0x043DC1 $9DB1: C-----  E1 C1    SBC  ($C1,X)
  0x043DC3 $9DB3: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x043DC4 $9DB4: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x043DC5 $9DB5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043DC6 $9DB6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x043DC7 $9DB7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x043DC8 $9DB8: C-----  AC 9E BE LDY  $BE9E
  0x043DCB $9DBB: C-----  30 6E    BMI  $9E2B
  0x043DCD $9DBD: C-----  1E 1E 0E ASL  $0E1E,X
  0x043DD0 $9DC0: C-----  00       BRK  
  0x043DD1 $9DC1: C-----  01 02    ORA  ($02,X)
  0x043DD3 $9DC3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043DD4 $9DC4: C-----  05 03    ORA  $03
  0x043DD6 $9DC6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043DD7 $9DC7: C-----  19 00 00 ORA  $0000,Y
  0x043DDA $9DCA: C-----  01 03    ORA  ($03,X)
  0x043DDC $9DCC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043DDD $9DCD: C-----  01 01    ORA  ($01,X)
  0x043DDF $9DCF: C-----  00       BRK  
  0x043DE0 $9DD0: C-----  00       BRK  
  0x043DE1 $9DD1: C-----  E0 1C    CPX  #$1C
  0x043DE3 $9DD3: C-----  88       DEY  
  0x043DE4 $9DD4: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x043DE5 $9DD5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043DE6 $9DD6: C-----  C0 84    CPY  #$84
  0x043DE8 $9DD8: C-----  00       BRK  
  0x043DE9 $9DD9: C-----  00       BRK  
  0x043DEA $9DDA: C-----  00       BRK  
  0x043DEB $9DDB: C-----  00       BRK  
  0x043DEC $9DDC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043DED $9DDD: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x043DEE $9DDE: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x043DEF $9DDF: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x043DF0 $9DE0: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043DF1 $9DE1: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043DF2 $9DE2: C-----  01 01    ORA  ($01,X)
  0x043DF4 $9DE4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043DF5 $9DE5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043DF6 $9DE6: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x043DF7 $9DE7: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x043DF8 $9DE8: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x043DF9 $9DE9: C-----  FD FE FE SBC  $FEFE,X
  0x043DFC $9DEC: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043DFD $9DED: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043DFE $9DEE: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x043DFF $9DEF: C-----  84 20    STY  $20
  0x043E01 $9DF1: C-----  40       RTI  
  0x043E02 $9DF2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043E03 $9DF3: C-----  00       BRK  
  0x043E04 $9DF4: C-----  00       BRK  
  0x043E05 $9DF5: C-----  00       BRK  
  0x043E06 $9DF6: C-----  00       BRK  
  0x043E07 $9DF7: C-----  00       BRK  
  0x043E08 $9DF8: C-----  C0 80    CPY  #$80
  0x043E0A $9DFA: C-----  00       BRK  
  0x043E0B $9DFB: C-----  00       BRK  
  0x043E0C $9DFC: C-----  00       BRK  
  0x043E0D $9DFD: C-----  00       BRK  
  0x043E0E $9DFE: C-----  00       BRK  
  0x043E0F $9DFF: C-----  00       BRK  
  0x043E10 $9E00: C-----  C0 40    CPY  #$40
  0x043E12 $9E02: C-----  20 A1 2E JSR  $2EA1
  0x043E15 $9E05: C-----  70 C0    BVS  $9DC7
  0x043E17 $9E07: C-----  E1 00    SBC  ($00,X)
  0x043E19 $9E09: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043E1A $9E0A: C-----  C0 40    CPY  #$40
  0x043E1C $9E0C: C-----  C0 80    CPY  #$80
  0x043E1E $9E0E: C-----  00       BRK  
  0x043E1F $9E0F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043E20 $9E10: C-----  48       PHA  
  0x043E21 $9E11: C-----  08       PHP  
  0x043E22 $9E12: C-----  08       PHP  
  0x043E23 $9E13: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x043E24 $9E14: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x043E25 $9E15: C-----  F5 C9    SBC  $C9,X
  0x043E27 $9E17: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x043E28 $9E18: C-----  B0 F0    BCS  $9E0A
  0x043E2A $9E1A: C-----  F0 E0    BEQ  $9DFC
  0x043E2C $9E1C: C-----  60       RTS  
  0x043E2D $9E1D: C-----  00       BRK  
  0x043E2E $9E1E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043E2F $9E1F: C-----  00       BRK  
  0x043E30 $9E20: C-----  00       BRK  
  0x043E31 $9E21: C-----  00       BRK  
  0x043E32 $9E22: C-----  00       BRK  
  0x043E33 $9E23: C-----  00       BRK  
  0x043E34 $9E24: C-----  00       BRK  
  0x043E35 $9E25: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x043E36 $9E26: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x043E37 $9E27: C-----  01 00    ORA  ($00,X)
  0x043E39 $9E29: C-----  00       BRK  
  0x043E3A $9E2A: C-----  00       BRK  
  0x043E3B $9E2B: C-----  00       BRK  
  0x043E3C $9E2C: C-----  00       BRK  
  0x043E3D $9E2D: C-----  00       BRK  
  0x043E3E $9E2E: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x043E3F $9E2F: C-----  FE 00 00 INC  $0000,X
  0x043E42 $9E32: C-----  01 03    ORA  ($03,X)
  0x043E44 $9E34: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043E45 $9E35: C-----  05 25    ORA  $25
  0x043E47 $9E37: C-----  28       PLP  
  0x043E48 $9E38: C-----  00       BRK  
  0x043E49 $9E39: C-----  00       BRK  
  0x043E4A $9E3A: C-----  00       BRK  
  0x043E4B $9E3B: C-----  00       BRK  
  0x043E4C $9E3C: C-----  01 02    ORA  ($02,X)
  0x043E4E $9E3E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043E4F $9E3F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043E50 $9E40: C-----  40       RTI  
  0x043E51 $9E41: C-----  40       RTI  
  0x043E52 $9E42: C-----  40       RTI  
  0x043E53 $9E43: C-----  81 CE    STA  ($CE,X)
  0x043E55 $9E45: C-----  F0 C0    BEQ  $9E07
  0x043E57 $9E47: C-----  E1 00    SBC  ($00,X)
  0x043E59 $9E49: C-----  00       BRK  
  0x043E5A $9E4A: C-----  00       BRK  
  0x043E5B $9E4B: C-----  00       BRK  
  0x043E5C $9E4C: C-----  01 0F    ORA  ($0F,X)
  0x043E5E $9E4E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x043E5F $9E4F: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x043E60 $9E50: C-----  40       RTI  
  0x043E61 $9E51: C-----  40       RTI  
  0x043E62 $9E52: C-----  40       RTI  
  0x043E63 $9E53: C-----  81 CE    STA  ($CE,X)
  0x043E65 $9E55: C-----  F0 C0    BEQ  $9E17
  0x043E67 $9E57: C-----  E1 80    SBC  ($80,X)
  0x043E69 $9E59: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043E6A $9E5A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043E6B $9E5B: C-----  00       BRK  
  0x043E6C $9E5C: C-----  00       BRK  
  0x043E6D $9E5D: C-----  00       BRK  
  0x043E6E $9E5E: C-----  00       BRK  
  0x043E6F $9E5F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043E70 $9E60: C-----  00       BRK  
  0x043E71 $9E61: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043E72 $9E62: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x043E73 $9E63: C-----  69 86    ADC  #$86
  0x043E75 $9E65: C-----  00       BRK  
  0x043E76 $9E66: C-----  00       BRK  
  0x043E77 $9E67: C-----  00       BRK  
  0x043E78 $9E68: C-----  00       BRK  
  0x043E79 $9E69: C-----  00       BRK  
  0x043E7A $9E6A: C-----  00       BRK  
  0x043E7B $9E6B: C-----  10 79    BPL  $9EE6
  0x043E7D $9E6D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043E7E $9E6E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043E7F $9E6F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043E80 $9E70: C-----  00       BRK  
  0x043E81 $9E71: C-----  10 30    BPL  $9EA3
  0x043E83 $9E73: C-----  D0 10    BNE  $9E85
  0x043E85 $9E75: C-----  10 28    BPL  $9E9F
  0x043E87 $9E77: C-----  38       SEC  
  0x043E88 $9E78: C-----  00       BRK  
  0x043E89 $9E79: C-----  00       BRK  
  0x043E8A $9E7A: C-----  00       BRK  
  0x043E8B $9E7B: C-----  20 E0 E0 JSR  $E0E0
  0x043E8E $9E7E: C-----  C0 C0    CPY  #$C0
  0x043E90 $9E80: C-----  38       SEC  
  0x043E91 $9E81: C-----  2C 30 90 BIT  $9030
  0x043E94 $9E84: C-----  88       DEY  
  0x043E95 $9E85: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x043E96 $9E86: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x043E97 $9E87: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x043E98 $9E88: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043E99 $9E89: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x043E9A $9E8A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043E9B $9E8B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043E9C $9E8C: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x043E9D $9E8D: C-----  3D 0C 05 AND  $050C,X
  0x043EA0 $9E90: C-----  00       BRK  
  0x043EA1 $9E91: C-----  00       BRK  
  0x043EA2 $9E92: C-----  00       BRK  
  0x043EA3 $9E93: C-----  00       BRK  
  0x043EA4 $9E94: C-----  01 8F    ORA  ($8F,X)
  0x043EA6 $9E96: C-----  41 FF    EOR  ($FF,X)
  0x043EA8 $9E98: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043EA9 $9E99: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043EAA $9E9A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043EAB $9E9B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043EAC $9E9C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043EAD $9E9D: C-----  70 BE    BVS  $9E5D
  0x043EAF $9E9F: C-----  41 FB    EOR  ($FB,X)
  0x043EB1 $9EA1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043EB2 $9EA2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043EB3 $9EA3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043EB4 $9EA4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043EB5 $9EA5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043EB6 $9EA6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043EB7 $9EA7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043EB8 $9EA8: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043EB9 $9EA9: C-----  F0 FC    BEQ  $9EA7
  0x043EBB $9EAB: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043EBC $9EAC: C-----  FE FE BF INC  $BFFE,X
  0x043EBF $9EAF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043EC0 $9EB0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043EC1 $9EB1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043EC2 $9EB2: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x043EC3 $9EB3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043EC4 $9EB4: C-----  3E 80 80 ROL  $8080,X
  0x043EC7 $9EB7: C-----  40       RTI  
  0x043EC8 $9EB8: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x043EC9 $9EB9: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x043ECA $9EBA: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x043ECB $9EBB: C-----  B6 C1    LDX  $C1,Y
  0x043ECD $9EBD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043ECE $9EBE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043ECF $9EBF: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x043ED0 $9EC0: C-----  48       PHA  
  0x043ED1 $9EC1: C-----  08       PHP  
  0x043ED2 $9EC2: C-----  08       PHP  
  0x043ED3 $9EC3: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x043ED4 $9EC4: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x043ED5 $9EC5: C-----  F5 C9    SBC  $C9,X
  0x043ED7 $9EC7: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x043ED8 $9EC8: C-----  00       BRK  
  0x043ED9 $9EC9: C-----  00       BRK  
  0x043EDA $9ECA: C-----  00       BRK  
  0x043EDB $9ECB: C-----  00       BRK  
  0x043EDC $9ECC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043EDD $9ECD: C-----  0A       ASL  A
  0x043EDE $9ECE: C-----  B6 14    LDX  $14,Y
  0x043EE0 $9ED0: C-----  00       BRK  
  0x043EE1 $9ED1: C-----  00       BRK  
  0x043EE2 $9ED2: C-----  00       BRK  
  0x043EE3 $9ED3: C-----  C0 F8    CPY  #$F8
  0x043EE5 $9ED5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043EE6 $9ED6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043EE7 $9ED7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043EE8 $9ED8: C-----  00       BRK  
  0x043EE9 $9ED9: C-----  00       BRK  
  0x043EEA $9EDA: C-----  00       BRK  
  0x043EEB $9EDB: C-----  00       BRK  
  0x043EEC $9EDC: C-----  00       BRK  
  0x043EED $9EDD: C-----  78       SEI  
  0x043EEE $9EDE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043EEF $9EDF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043EF0 $9EE0: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x043EF1 $9EE1: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x043EF2 $9EE2: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x043EF3 $9EE3: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x043EF4 $9EE4: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x043EF5 $9EE5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x043EF6 $9EE6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043EF7 $9EE7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043EF8 $9EE8: C-----  D5 55    CMP  $55,X
  0x043EFA $9EEA: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x043EFB $9EEB: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x043EFC $9EEC: C-----  6D EB F2 ADC  $F2EB
  0x043EFF $9EEF: C-----  F5 FF    SBC  $FF,X
  0x043F01 $9EF1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043F02 $9EF2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043F03 $9EF3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043F04 $9EF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043F05 $9EF5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043F06 $9EF6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043F07 $9EF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043F08 $9EF8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043F09 $9EF9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043F0A $9EFA: C-----  FE 31 87 INC  $8731,X
  0x043F0D $9EFD: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x043F0E $9EFE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043F0F $9EFF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043F10 $9F00: C-----  90 90    BCC  $9E92
  0x043F12 $9F02: C-----  50 78    BVC  $9F7C
  0x043F14 $9F04: C-----  78       SEI  
  0x043F15 $9F05: C-----  70 70    BVS  $9F77
  0x043F17 $9F07: C-----  60       RTS  
  0x043F18 $9F08: C-----  60       RTS  
  0x043F19 $9F09: C-----  60       RTS  
  0x043F1A $9F0A: C-----  20 00 00 JSR  $0000
  0x043F1D $9F0D: C-----  00       BRK  
  0x043F1E $9F0E: C-----  00       BRK  
  0x043F1F $9F0F: C-----  00       BRK  
  0x043F20 $9F10: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x043F21 $9F11: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x043F22 $9F12: C-----  08       PHP  
  0x043F23 $9F13: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043F24 $9F14: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043F25 $9F15: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x043F26 $9F16: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043F27 $9F17: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043F28 $9F18: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x043F29 $9F19: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043F2A $9F1A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043F2B $9F1B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043F2C $9F1C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043F2D $9F1D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043F2E $9F1E: C-----  01 01    ORA  ($01,X)
  0x043F30 $9F20: C-----  00       BRK  
  0x043F31 $9F21: C-----  E0 1C    CPX  #$1C
  0x043F33 $9F23: C-----  88       DEY  
  0x043F34 $9F24: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x043F35 $9F25: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043F36 $9F26: C-----  C0 84    CPY  #$84
  0x043F38 $9F28: C-----  00       BRK  
  0x043F39 $9F29: C-----  00       BRK  
  0x043F3A $9F2A: C-----  E0 70    CPX  #$70
  0x043F3C $9F2C: C-----  A0 C0    LDY  #$C0
  0x043F3E $9F2E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043F3F $9F2F: C-----  00       BRK  
  0x043F40 $9F30: C-----  00       BRK  
  0x043F41 $9F31: C-----  F0 0C    BEQ  $9F3F
  0x043F43 $9F33: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x043F44 $9F34: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x043F45 $9F35: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043F46 $9F36: C-----  C0 84    CPY  #$84
  0x043F48 $9F38: C-----  00       BRK  
  0x043F49 $9F39: C-----  00       BRK  
  0x043F4A $9F3A: C-----  F0 7C    BEQ  $9FB8
  0x043F4C $9F3C: C-----  BC C0 80 LDY  $80C0,X
  0x043F4F $9F3F: C-----  00       BRK  
  0x043F50 $9F40: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043F51 $9F41: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043F52 $9F42: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043F53 $9F43: C-----  40       RTI  
  0x043F54 $9F44: C-----  40       RTI  
  0x043F55 $9F45: C-----  40       RTI  
  0x043F56 $9F46: C-----  40       RTI  
  0x043F57 $9F47: C-----  20 00 00 JSR  $0000
  0x043F5A $9F4A: C-----  00       BRK  
  0x043F5B $9F4B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043F5C $9F4C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043F5D $9F4D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043F5E $9F4E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043F5F $9F4F: C-----  C0 01    CPY  #$01
  0x043F61 $9F51: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043F62 $9F52: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x043F63 $9F53: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043F64 $9F54: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043F65 $9F55: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043F66 $9F56: C-----  F8       SED  
  0x043F67 $9F57: C-----  70 00    BVS  $9F59
  0x043F69 $9F59: C-----  01 03    ORA  ($03,X)
  0x043F6B $9F5B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043F6C $9F5C: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x043F6D $9F5D: C-----  78       SEI  
  0x043F6E $9F5E: C-----  70 A0    BVS  $9F00
  0x043F70 $9F60: C-----  00       BRK  
  0x043F71 $9F61: C-----  E0 1C    CPX  #$1C
  0x043F73 $9F63: C-----  88       DEY  
  0x043F74 $9F64: C-----  D1 FF    CMP  ($FF),Y
  0x043F76 $9F66: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x043F77 $9F67: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x043F78 $9F68: C-----  00       BRK  
  0x043F79 $9F69: C-----  00       BRK  
  0x043F7A $9F6A: C-----  00       BRK  
  0x043F7B $9F6B: C-----  00       BRK  
  0x043F7C $9F6C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043F7D $9F6D: C-----  C1 BB    CMP  ($BB,X)
  0x043F7F $9F6F: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x043F80 $9F70: C-----  01 07    ORA  ($07,X)
  0x043F82 $9F72: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x043F83 $9F73: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x043F84 $9F74: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x043F85 $9F75: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043F86 $9F76: C-----  F8       SED  
  0x043F87 $9F77: C-----  F0 00    BEQ  $9F79
  0x043F89 $9F79: C-----  01 03    ORA  ($03,X)
  0x043F8B $9F7B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x043F8C $9F7C: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x043F8D $9F7D: C-----  F8       SED  
  0x043F8E $9F7E: C-----  F0 E0    BEQ  $9F60
  0x043F90 $9F80: C-----  00       BRK  
  0x043F91 $9F81: C-----  F0 0C    BEQ  $9F8F
  0x043F93 $9F83: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x043F94 $9F84: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x043F95 $9F85: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043F96 $9F86: C-----  C0 84    CPY  #$84
  0x043F98 $9F88: C-----  00       BRK  
  0x043F99 $9F89: C-----  00       BRK  
  0x043F9A $9F8A: C-----  00       BRK  
  0x043F9B $9F8B: C-----  00       BRK  
  0x043F9C $9F8C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043F9D $9F8D: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x043F9E $9F8E: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x043F9F $9F8F: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x043FA0 $9F90: C-----  00       BRK  
  0x043FA1 $9F91: C-----  E0 10    CPX  #$10
  0x043FA3 $9F93: C-----  90 D3    BCC  $9F68
  0x043FA5 $9F95: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043FA6 $9F96: C-----  C0 84    CPY  #$84
  0x043FA8 $9F98: C-----  00       BRK  
  0x043FA9 $9F99: C-----  00       BRK  
  0x043FAA $9F9A: C-----  00       BRK  
  0x043FAB $9F9B: C-----  00       BRK  
  0x043FAC $9F9C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043FAD $9F9D: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x043FAE $9F9E: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x043FAF $9F9F: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x043FB0 $9FA0: C-----  00       BRK  
  0x043FB1 $9FA1: C-----  E0 10    CPX  #$10
  0x043FB3 $9FA3: C-----  90 D3    BCC  $9F78
  0x043FB5 $9FA5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x043FB6 $9FA6: C-----  C0 84    CPY  #$84
  0x043FB8 $9FA8: C-----  00       BRK  
  0x043FB9 $9FA9: C-----  00       BRK  
  0x043FBA $9FAA: C-----  E0 60    CPX  #$60
  0x043FBC $9FAC: C-----  A0 C0    LDY  #$C0
  0x043FBE $9FAE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043FBF $9FAF: C-----  00       BRK  
  0x043FC0 $9FB0: C-----  00       BRK  
  0x043FC1 $9FB1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043FC2 $9FB2: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x043FC3 $9FB3: C-----  08       PHP  
  0x043FC4 $9FB4: C-----  05 03    ORA  $03
  0x043FC6 $9FB6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043FC7 $9FB7: C-----  19 00 00 ORA  $0000,Y
  0x043FCA $9FBA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043FCB $9FBB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043FCC $9FBC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043FCD $9FBD: C-----  01 01    ORA  ($01,X)
  0x043FCF $9FBF: C-----  00       BRK  
  0x043FD0 $9FC0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x043FD1 $9FC1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x043FD2 $9FC2: C-----  01 01    ORA  ($01,X)
  0x043FD4 $9FC4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043FD5 $9FC5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x043FD6 $9FC6: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x043FD7 $9FC7: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x043FD8 $9FC8: C-----  F9 FC FE SBC  $FEFC,Y
  0x043FDB $9FCB: C-----  FE FC FC INC  $FCFC,X
  0x043FDE $9FCE: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x043FDF $9FCF: C-----  84 E0    STY  $E0
  0x043FE1 $9FD1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043FE2 $9FD2: C-----  00       BRK  
  0x043FE3 $9FD3: C-----  00       BRK  
  0x043FE4 $9FD4: C-----  00       BRK  
  0x043FE5 $9FD5: C-----  00       BRK  
  0x043FE6 $9FD6: C-----  00       BRK  
  0x043FE7 $9FD7: C-----  00       BRK  
  0x043FE8 $9FD8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x043FE9 $9FD9: C-----  00       BRK  
  0x043FEA $9FDA: C-----  00       BRK  
  0x043FEB $9FDB: C-----  00       BRK  
  0x043FEC $9FDC: C-----  00       BRK  
  0x043FED $9FDD: C-----  00       BRK  
  0x043FEE $9FDE: C-----  00       BRK  
  0x043FEF $9FDF: C-----  00       BRK  
  0x043FF0 $9FE0: C-----  00       BRK  
  0x043FF1 $9FE1: C-----  E0 1C    CPX  #$1C
  0x043FF3 $9FE3: C-----  88       DEY  
  0x043FF4 $9FE4: C-----  D1 FF    CMP  ($FF),Y
  0x043FF6 $9FE6: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x043FF7 $9FE7: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x043FF8 $9FE8: C-----  00       BRK  
  0x043FF9 $9FE9: C-----  00       BRK  
  0x043FFA $9FEA: C-----  E0 70    CPX  #$70
  0x043FFC $9FEC: C-----  A0 C1    LDY  #$C1
  0x043FFE $9FEE: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x043FFF $9FEF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044000 $9FF0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044001 $9FF1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044002 $9FF2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044003 $9FF3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044004 $9FF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044005 $9FF5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044006 $9FF6: C-----  00       BRK  
  0x044007 $9FF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044008 $9FF8: C-----  00       BRK  
  0x044009 $9FF9: C-----  00       BRK  
  0x04400A $9FFA: C-----  00       BRK  
  0x04400B $9FFB: C-----  00       BRK  
  0x04400C $9FFC: C-----  00       BRK  
  0x04400D $9FFD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04400E $9FFE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04400F $9FFF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data