; ===== MMC3 Bank 32 =====
; ROM: 0x040010-0x04200F
; CPU: $8000-$9FFF
; CDL: code=8162 data=0 unaccessed=30

  0x040010 $8000: C-----  00       BRK  
  0x040011 $8001: C-----  00       BRK  
  0x040012 $8002: C-----  00       BRK  
  0x040013 $8003: C-----  00       BRK  
  0x040014 $8004: C-----  00       BRK  
  0x040015 $8005: C-----  00       BRK  
  0x040016 $8006: C-----  00       BRK  
  0x040017 $8007: C-----  00       BRK  
  0x040018 $8008: C-----  00       BRK  
  0x040019 $8009: C-----  00       BRK  
  0x04001A $800A: C-----  00       BRK  
  0x04001B $800B: C-----  00       BRK  
  0x04001C $800C: C-----  00       BRK  
  0x04001D $800D: C-----  00       BRK  
  0x04001E $800E: C-----  00       BRK  
  0x04001F $800F: C-----  00       BRK  
  0x040020 $8010: C-----  10 7E    BPL  $8090
  0x040022 $8012: C-----  10 1E    BPL  $8032
  0x040024 $8014: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x040025 $8015: C-----  55 49    EOR  $49,X
  0x040027 $8017: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x040028 $8018: C-----  10 7E    BPL  $8098
  0x04002A $801A: C-----  10 1E    BPL  $803A
  0x04002C $801C: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x04002D $801D: C-----  55 49    EOR  $49,X
  0x04002F $801F: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x040030 $8020: C-----  00       BRK  
  0x040031 $8021: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x040032 $8022: C-----  41 41    EOR  ($41,X)
  0x040034 $8024: C-----  41 41    EOR  ($41,X)
  0x040036 $8026: C-----  48       PHA  
  0x040037 $8027: C-----  30 00    BMI  $8029
  0x040039 $8029: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04003A $802A: C-----  41 41    EOR  ($41,X)
  0x04003C $802C: C-----  41 41    EOR  ($41,X)
  0x04003E $802E: C-----  48       PHA  
  0x04003F $802F: C-----  30 1C    BMI  $804D
  0x040041 $8031: C-----  00       BRK  
  0x040042 $8032: C-----  1E 21 01 ASL  $0121,X
  0x040045 $8035: C-----  01 02    ORA  ($02,X)
  0x040047 $8037: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040048 $8038: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040049 $8039: C-----  00       BRK  
  0x04004A $803A: C-----  1E 21 01 ASL  $0121,X
  0x04004D $803D: C-----  01 02    ORA  ($02,X)
  0x04004F $803F: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040050 $8040: C-----  18       CLC  
  0x040051 $8041: C-----  00       BRK  
  0x040052 $8042: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x040053 $8043: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040054 $8044: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040055 $8045: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040056 $8046: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x040057 $8047: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x040058 $8048: C-----  18       CLC  
  0x040059 $8049: C-----  00       BRK  
  0x04005A $804A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04005B $804B: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04005C $804C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04005D $804D: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04005E $804E: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04005F $804F: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x040060 $8050: C-----  11 7D    ORA  ($7D),Y
  0x040062 $8052: C-----  10 1E    BPL  $8072
  0x040064 $8054: C-----  31 51    AND  ($51),Y
  0x040066 $8056: C-----  51 32    EOR  ($32),Y
  0x040068 $8058: C-----  11 7D    ORA  ($7D),Y
  0x04006A $805A: C-----  10 1E    BPL  $807A
  0x04006C $805C: C-----  31 51    AND  ($51),Y
  0x04006E $805E: C-----  51 32    EOR  ($32),Y
  0x040070 $8060: C-----  10 12    BPL  $8074
  0x040072 $8062: C-----  79 15 24 ADC  $2415,Y
  0x040075 $8065: C-----  24 54    BIT  $54
  0x040077 $8067: C-----  48       PHA  
  0x040078 $8068: C-----  10 12    BPL  $807C
  0x04007A $806A: C-----  79 15 24 ADC  $2415,Y
  0x04007D $806D: C-----  24 54    BIT  $54
  0x04007F $806F: C-----  48       PHA  
  0x040080 $8070: C-----  10 7E    BPL  $80F0
  0x040082 $8072: C-----  08       PHP  
  0x040083 $8073: C-----  7E 04 0C ROR  $0C04,X
  0x040086 $8076: C-----  40       RTI  
  0x040087 $8077: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x040088 $8078: C-----  10 7E    BPL  $80F8
  0x04008A $807A: C-----  08       PHP  
  0x04008B $807B: C-----  7E 04 0C ROR  $0C04,X
  0x04008E $807E: C-----  40       RTI  
  0x04008F $807F: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x040090 $8080: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040091 $8081: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040092 $8082: C-----  08       PHP  
  0x040093 $8083: C-----  10 10    BPL  $8095
  0x040095 $8085: C-----  08       PHP  
  0x040096 $8086: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040097 $8087: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040098 $8088: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040099 $8089: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04009A $808A: C-----  08       PHP  
  0x04009B $808B: C-----  10 10    BPL  $809D
  0x04009D $808D: C-----  08       PHP  
  0x04009E $808E: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04009F $808F: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0400A0 $8090: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0400A1 $8091: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0400A2 $8092: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x0400A3 $8093: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0400A4 $8094: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0400A5 $8095: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0400A6 $8096: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0400A7 $8097: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0400A8 $8098: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0400A9 $8099: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0400AA $809A: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x0400AB $809B: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0400AC $809C: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0400AD $809D: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0400AE $809E: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0400AF $809F: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0400B0 $80A0: C-----  00       BRK  
  0x0400B1 $80A1: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0400B2 $80A2: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0400B3 $80A3: C-----  00       BRK  
  0x0400B4 $80A4: C-----  00       BRK  
  0x0400B5 $80A5: C-----  20 40 3E JSR  $3E40
  0x0400B8 $80A8: C-----  00       BRK  
  0x0400B9 $80A9: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0400BA $80AA: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0400BB $80AB: C-----  00       BRK  
  0x0400BC $80AC: C-----  00       BRK  
  0x0400BD $80AD: C-----  20 40 3E JSR  $3E40
  0x0400C0 $80B0: C-----  10 08    BPL  $80BA
  0x0400C2 $80B2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0400C3 $80B3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0400C4 $80B4: C-----  06 40    ASL  $40
  0x0400C6 $80B6: C-----  20 1E 10 JSR  $101E
  0x0400C9 $80B9: C-----  08       PHP  
  0x0400CA $80BA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0400CB $80BB: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0400CC $80BC: C-----  06 40    ASL  $40
  0x0400CE $80BE: C-----  20 1E 20 JSR  $201E
  0x0400D1 $80C1: C-----  20 20 20 JSR  $2020
  0x0400D4 $80C4: C-----  20 22 22 JSR  $2222
  0x0400D7 $80C7: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0400D8 $80C8: C-----  20 20 20 JSR  $2020
  0x0400DB $80CB: C-----  20 20 22 JSR  $2220
  0x0400DE $80CE: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0400DF $80CF: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0400E0 $80D0: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0400E1 $80D1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0400E2 $80D2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0400E3 $80D3: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0400E4 $80D4: C-----  24 1C    BIT  $1C
  0x0400E6 $80D6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0400E7 $80D7: C-----  08       PHP  
  0x0400E8 $80D8: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0400E9 $80D9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0400EA $80DA: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0400EB $80DB: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0400EC $80DC: C-----  24 1C    BIT  $1C
  0x0400EE $80DE: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0400EF $80DF: C-----  08       PHP  
  0x0400F0 $80E0: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0400F1 $80E1: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0400F2 $80E2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0400F3 $80E3: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0400F4 $80E4: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0400F5 $80E5: C-----  24 20    BIT  $20
  0x0400F7 $80E7: C-----  1E 22 22 ASL  $2222,X
  0x0400FA $80EA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0400FB $80EB: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0400FC $80EC: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0400FD $80ED: C-----  24 20    BIT  $20
  0x0400FF $80EF: C-----  1E 3C 08 ASL  $083C,X
  0x040102 $80F2: C-----  10 7F    BPL  $8173
  0x040104 $80F4: C-----  08       PHP  
  0x040105 $80F5: C-----  10 10    BPL  $8107
  0x040107 $80F7: C-----  0E 3C 08 ASL  $083C
  0x04010A $80FA: C-----  10 7F    BPL  $817B
  0x04010C $80FC: C-----  08       PHP  
  0x04010D $80FD: C-----  10 10    BPL  $810F
  0x04010F $80FF: C-----  0E 10 10 ASL  $1010
  0x040112 $8102: C-----  7E 10 27 ROR  $2710,X
  0x040115 $8105: C-----  20 48 47 JSR  $4748
  0x040118 $8108: C-----  10 10    BPL  $811A
  0x04011A $810A: C-----  7E 10 27 ROR  $2710,X
  0x04011D $810D: C-----  20 48 47 JSR  $4748
  0x040120 $8110: C-----  10 10    BPL  $8122
  0x040122 $8112: C-----  7E 10 1E ROR  $1E10,X
  0x040125 $8115: C-----  21 01    AND  ($01,X)
  0x040127 $8117: C-----  1E 10 10 ASL  $1010,X
  0x04012A $811A: C-----  7E 10 1E ROR  $1E10,X
  0x04012D $811D: C-----  21 01    AND  ($01,X)
  0x04012F $811F: C-----  1E 00 00 ASL  $0000,X
  0x040132 $8122: C-----  7E 01 01 ROR  $0101,X
  0x040135 $8125: C-----  01 06    ORA  ($06,X)
  0x040137 $8127: C-----  18       CLC  
  0x040138 $8128: C-----  00       BRK  
  0x040139 $8129: C-----  00       BRK  
  0x04013A $812A: C-----  7E 01 01 ROR  $0101,X
  0x04013D $812D: C-----  01 06    ORA  ($06,X)
  0x04013F $812F: C-----  18       CLC  
  0x040140 $8130: C-----  00       BRK  
  0x040141 $8131: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040142 $8132: C-----  06 08    ASL  $08
  0x040144 $8134: C-----  10 10    BPL  $8146
  0x040146 $8136: C-----  08       PHP  
  0x040147 $8137: C-----  06 00    ASL  $00
  0x040149 $8139: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04014A $813A: C-----  06 08    ASL  $08
  0x04014C $813C: C-----  10 10    BPL  $814E
  0x04014E $813E: C-----  08       PHP  
  0x04014F $813F: C-----  06 10    ASL  $10
  0x040151 $8141: C-----  10 16    BPL  $8159
  0x040153 $8143: C-----  18       CLC  
  0x040154 $8144: C-----  20 40 40 JSR  $4040
  0x040157 $8147: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x040158 $8148: C-----  10 10    BPL  $815A
  0x04015A $814A: C-----  16 18    ASL  $18,X
  0x04015C $814C: C-----  20 40 40 JSR  $4040
  0x04015F $814F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x040160 $8150: C-----  10 12    BPL  $8164
  0x040162 $8152: C-----  79 20 44 ADC  $4420,Y
  0x040165 $8155: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040166 $8156: C-----  26 1C    ROL  $1C
  0x040168 $8158: C-----  10 12    BPL  $816C
  0x04016A $815A: C-----  79 20 44 ADC  $4420,Y
  0x04016D $815D: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04016E $815E: C-----  26 1C    ROL  $1C
  0x040170 $8160: C-----  00       BRK  
  0x040171 $8161: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x040172 $8162: C-----  40       RTI  
  0x040173 $8163: C-----  40       RTI  
  0x040174 $8164: C-----  40       RTI  
  0x040175 $8165: C-----  40       RTI  
  0x040176 $8166: C-----  50 4F    BVC  $81B7
  0x040178 $8168: C-----  00       BRK  
  0x040179 $8169: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x04017A $816A: C-----  40       RTI  
  0x04017B $816B: C-----  40       RTI  
  0x04017C $816C: C-----  40       RTI  
  0x04017D $816D: C-----  40       RTI  
  0x04017E $816E: C-----  50 4F    BVC  $81BF
  0x040180 $8170: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040181 $8171: C-----  24 2E    BIT  $2E
  0x040183 $8173: C-----  35 69    AND  $69,X
  0x040185 $8175: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x040186 $8176: C-----  55 26    EOR  $26,X
  0x040188 $8178: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040189 $8179: C-----  24 2E    BIT  $2E
  0x04018B $817B: C-----  35 69    AND  $69,X
  0x04018D $817D: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04018E $817E: C-----  55 26    EOR  $26,X
  0x040190 $8180: C-----  10 10    BPL  $8192
  0x040192 $8182: C-----  76 19    ROR  $19,X
  0x040194 $8184: C-----  11 33    ORA  ($33),Y
  0x040196 $8186: C-----  55 17    EOR  $17,X
  0x040198 $8188: C-----  10 10    BPL  $819A
  0x04019A $818A: C-----  76 19    ROR  $19,X
  0x04019C $818C: C-----  11 33    ORA  ($33),Y
  0x04019E $818E: C-----  55 17    EOR  $17,X
  0x0401A0 $8190: C-----  00       BRK  
  0x0401A1 $8191: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0401A2 $8192: C-----  2A       ROL  A
  0x0401A3 $8193: C-----  49 49    EOR  #$49
  0x0401A5 $8195: C-----  49 49    EOR  #$49
  0x0401A7 $8197: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x0401A8 $8198: C-----  00       BRK  
  0x0401A9 $8199: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0401AA $819A: C-----  2A       ROL  A
  0x0401AB $819B: C-----  49 49    EOR  #$49
  0x0401AD $819D: C-----  49 49    EOR  #$49
  0x0401AF $819F: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x0401B0 $81A0: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0401B1 $81A1: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0401B2 $81A2: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x0401B3 $81A3: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0401B4 $81A4: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0401B5 $81A5: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x0401B6 $81A6: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x0401B7 $81A7: C-----  4E 02 42 LSR  $4202
  0x0401BA $81AA: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x0401BB $81AB: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0401BC $81AC: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0401BD $81AD: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x0401BE $81AE: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x0401BF $81AF: C-----  4E 78 12 LSR  $1278
  0x0401C2 $81B2: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x0401C3 $81B3: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0401C4 $81B4: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0401C5 $81B5: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0401C6 $81B6: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0401C7 $81B7: C-----  38       SEC  
  0x0401C8 $81B8: C-----  78       SEI  
  0x0401C9 $81B9: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0401CA $81BA: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x0401CB $81BB: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0401CC $81BC: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0401CD $81BD: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0401CE $81BE: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0401CF $81BF: C-----  38       SEC  
  0x0401D0 $81C0: C-----  18       CLC  
  0x0401D1 $81C1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0401D2 $81C2: C-----  00       BRK  
  0x0401D3 $81C3: C-----  08       PHP  
  0x0401D4 $81C4: C-----  24 45    BIT  $45
  0x0401D6 $81C6: C-----  45 18    EOR  $18
  0x0401D8 $81C8: C-----  18       CLC  
  0x0401D9 $81C9: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0401DA $81CA: C-----  00       BRK  
  0x0401DB $81CB: C-----  08       PHP  
  0x0401DC $81CC: C-----  24 45    BIT  $45
  0x0401DE $81CE: C-----  45 18    EOR  $18
  0x0401E0 $81D0: C-----  00       BRK  
  0x0401E1 $81D1: C-----  10 28    BPL  $81FB
  0x0401E3 $81D3: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0401E4 $81D4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0401E5 $81D5: C-----  01 00    ORA  ($00,X)
  0x0401E7 $81D7: C-----  00       BRK  
  0x0401E8 $81D8: C-----  00       BRK  
  0x0401E9 $81D9: C-----  10 28    BPL  $8203
  0x0401EB $81DB: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0401EC $81DC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0401ED $81DD: C-----  01 00    ORA  ($00,X)
  0x0401EF $81DF: C-----  00       BRK  
  0x0401F0 $81E0: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x0401F1 $81E1: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0401F2 $81E2: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x0401F3 $81E3: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0401F4 $81E4: C-----  4E 53 52 LSR  $5253
  0x0401F7 $81E7: C-----  4E 4F 42 LSR  $424F
  0x0401FA $81EA: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x0401FB $81EB: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0401FC $81EC: C-----  4E 53 52 LSR  $5253
  0x0401FF $81EF: C-----  4E 04 1F LSR  $1F04
  0x040202 $81F2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040203 $81F3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x040204 $81F4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040205 $81F5: C-----  1E 25 1C ASL  $1C25,X
  0x040208 $81F8: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040209 $81F9: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04020A $81FA: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04020B $81FB: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04020C $81FC: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04020D $81FD: C-----  1E 25 1C ASL  $1C25,X
  0x040210 $8200: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x040211 $8201: C-----  08       PHP  
  0x040212 $8202: C-----  09 09    ORA  #$09
  0x040214 $8204: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x040215 $8205: C-----  51 52    EOR  ($52),Y
  0x040217 $8207: C-----  24 3C    BIT  $3C
  0x040219 $8209: C-----  08       PHP  
  0x04021A $820A: C-----  09 09    ORA  #$09
  0x04021C $820C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04021D $820D: C-----  51 52    EOR  ($52),Y
  0x04021F $820F: C-----  24 10    BIT  $10
  0x040221 $8211: C-----  79 11 10 ADC  $1011,Y
  0x040224 $8214: C-----  30 51    BMI  $8267
  0x040226 $8216: C-----  71 1E    ADC  ($1E),Y
  0x040228 $8218: C-----  10 79    BPL  $8293
  0x04022A $821A: C-----  11 10    ORA  ($10),Y
  0x04022C $821C: C-----  30 51    BMI  $826F
  0x04022E $821E: C-----  71 1E    ADC  ($1E),Y
  0x040230 $8220: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040231 $8221: C-----  24 2C    BIT  $2C
  0x040233 $8223: C-----  36 65    ROL  $65,X
  0x040235 $8225: C-----  59 49 30 EOR  $3049,Y
  0x040238 $8228: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040239 $8229: C-----  24 2C    BIT  $2C
  0x04023B $822B: C-----  36 65    ROL  $65,X
  0x04023D $822D: C-----  59 49 30 EOR  $3049,Y
  0x040240 $8230: C-----  10 10    BPL  $8242
  0x040242 $8232: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x040243 $8233: C-----  10 7C    BPL  $82B1
  0x040245 $8235: C-----  10 11    BPL  $8248
  0x040247 $8237: C-----  0E 10 10 ASL  $1010
  0x04024A $823A: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04024B $823B: C-----  10 7C    BPL  $82B9
  0x04024D $823D: C-----  10 11    BPL  $8250
  0x04024F $823F: C-----  0E 24 24 ASL  $2424
  0x040252 $8242: C-----  7E 21 29 ROR  $2921,X
  0x040255 $8245: C-----  26 20    ROL  $20
  0x040257 $8247: C-----  10 24    BPL  $826D
  0x040259 $8249: C-----  24 7E    BIT  $7E
  0x04025B $824B: C-----  21 29    AND  ($29,X)
  0x04025D $824D: C-----  26 20    ROL  $20
  0x04025F $824F: C-----  10 04    BPL  $8255
  0x040261 $8251: C-----  5E 65 45 LSR  $4565,X
  0x040264 $8254: C-----  45 55    EOR  $55
  0x040266 $8256: C-----  0E 18 04 ASL  $0418
  0x040269 $8259: C-----  5E 65 45 LSR  $4565,X
  0x04026C $825C: C-----  45 55    EOR  $55
  0x04026E $825E: C-----  0E 18 08 ASL  $0818
  0x040271 $8261: C-----  08       PHP  
  0x040272 $8262: C-----  0E 08 08 ASL  $0808
  0x040275 $8265: C-----  38       SEC  
  0x040276 $8266: C-----  4C 3A 08 JMP  $083A
  0x040279 $8269: C-----  08       PHP  
  0x04027A $826A: C-----  0E 08 08 ASL  $0808
  0x04027D $826D: C-----  38       SEC  
  0x04027E $826E: C-----  4C 3A 18 JMP  $183A
  0x040281 $8271: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040282 $8272: C-----  20 2E 31 JSR  $312E
  0x040285 $8275: C-----  01 02    ORA  ($02,X)
  0x040287 $8277: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040288 $8278: C-----  18       CLC  
  0x040289 $8279: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04028A $827A: C-----  20 2E 31 JSR  $312E
  0x04028D $827D: C-----  01 02    ORA  ($02,X)
  0x04028F $827F: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040290 $8280: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x040291 $8281: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x040292 $8282: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x040293 $8283: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x040294 $8284: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x040295 $8285: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040296 $8286: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040297 $8287: C-----  08       PHP  
  0x040298 $8288: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x040299 $8289: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x04029A $828A: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x04029B $828B: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x04029C $828C: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x04029D $828D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04029E $828E: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04029F $828F: C-----  08       PHP  
  0x0402A0 $8290: C-----  3E 04 18 ROL  $1804,X
  0x0402A3 $8293: C-----  3E 41 19 ROL  $1941,X
  0x0402A6 $8296: C-----  29 1E    AND  #$1E
  0x0402A8 $8298: C-----  3E 04 18 ROL  $1804,X
  0x0402AB $829B: C-----  3E 41 19 ROL  $1941,X
  0x0402AE $829E: C-----  29 1E    AND  #$1E
  0x0402B0 $82A0: C-----  10 10    BPL  $82B2
  0x0402B2 $82A2: C-----  76 19    ROR  $19,X
  0x0402B4 $82A4: C-----  11 32    ORA  ($32),Y
  0x0402B6 $82A6: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x0402B7 $82A7: C-----  11 10    ORA  ($10),Y
  0x0402B9 $82A9: C-----  10 76    BPL  $8321
  0x0402BB $82AB: C-----  19 11 32 ORA  $3211,Y
  0x0402BE $82AE: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x0402BF $82AF: C-----  11 3E    ORA  ($3E),Y
  0x0402C1 $82B1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0402C2 $82B2: C-----  08       PHP  
  0x0402C3 $82B3: C-----  1E 21 01 ASL  $0121,X
  0x0402C6 $82B6: C-----  01 1E    ORA  ($1E,X)
  0x0402C8 $82B8: C-----  3E 04 08 ROL  $0804,X
  0x0402CB $82BB: C-----  1E 21 01 ASL  $0121,X
  0x0402CE $82BE: C-----  01 1E    ORA  ($1E,X)
  0x0402D0 $82C0: C-----  10 10    BPL  $82D2
  0x0402D2 $82C2: C-----  76 19    ROR  $19,X
  0x0402D4 $82C4: C-----  11 31    ORA  ($31),Y
  0x0402D6 $82C6: C-----  51 12    EOR  ($12),Y
  0x0402D8 $82C8: C-----  10 10    BPL  $82DA
  0x0402DA $82CA: C-----  76 19    ROR  $19,X
  0x0402DC $82CC: C-----  11 31    ORA  ($31),Y
  0x0402DE $82CE: C-----  51 12    EOR  ($12),Y
  0x0402E0 $82D0: C-----  08       PHP  
  0x0402E1 $82D1: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0402E2 $82D2: C-----  10 1A    BPL  $82EE
  0x0402E4 $82D4: C-----  2C 14 10 BIT  $1014
  0x0402E7 $82D7: C-----  0E 08 3C ASL  $3C08
  0x0402EA $82DA: C-----  10 1A    BPL  $82F6
  0x0402EC $82DC: C-----  2C 14 10 BIT  $1014
  0x0402EF $82DF: C-----  0E 08 08 ASL  $0808
  0x0402F2 $82E2: C-----  10 10    BPL  $82F4
  0x0402F4 $82E4: C-----  38       SEC  
  0x0402F5 $82E5: C-----  28       PLP  
  0x0402F6 $82E6: C-----  49 46    EOR  #$46
  0x0402F8 $82E8: C-----  08       PHP  
  0x0402F9 $82E9: C-----  08       PHP  
  0x0402FA $82EA: C-----  10 10    BPL  $82FC
  0x0402FC $82EC: C-----  38       SEC  
  0x0402FD $82ED: C-----  28       PLP  
  0x0402FE $82EE: C-----  49 46    EOR  #$46
  0x040300 $82F0: C-----  00       BRK  
  0x040301 $82F1: C-----  00       BRK  
  0x040302 $82F2: C-----  00       BRK  
  0x040303 $82F3: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x040304 $82F4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040305 $82F5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040306 $82F6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040307 $82F7: C-----  18       CLC  
  0x040308 $82F8: C-----  00       BRK  
  0x040309 $82F9: C-----  00       BRK  
  0x04030A $82FA: C-----  00       BRK  
  0x04030B $82FB: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04030C $82FC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04030D $82FD: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04030E $82FE: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04030F $82FF: C-----  18       CLC  
  0x040310 $8300: C-----  00       BRK  
  0x040311 $8301: C-----  28       PLP  
  0x040312 $8302: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x040313 $8303: C-----  6A       ROR  A
  0x040314 $8304: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x040315 $8305: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x040316 $8306: C-----  10 10    BPL  $8318
  0x040318 $8308: C-----  00       BRK  
  0x040319 $8309: C-----  28       PLP  
  0x04031A $830A: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04031B $830B: C-----  6A       ROR  A
  0x04031C $830C: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x04031D $830D: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04031E $830E: C-----  10 10    BPL  $8320
  0x040320 $8310: C-----  00       BRK  
  0x040321 $8311: C-----  08       PHP  
  0x040322 $8312: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x040323 $8313: C-----  6A       ROR  A
  0x040324 $8314: C-----  4A       LSR  A
  0x040325 $8315: C-----  4A       LSR  A
  0x040326 $8316: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040327 $8317: C-----  08       PHP  
  0x040328 $8318: C-----  00       BRK  
  0x040329 $8319: C-----  08       PHP  
  0x04032A $831A: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x04032B $831B: C-----  6A       ROR  A
  0x04032C $831C: C-----  4A       LSR  A
  0x04032D $831D: C-----  4A       LSR  A
  0x04032E $831E: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04032F $831F: C-----  08       PHP  
  0x040330 $8320: C-----  00       BRK  
  0x040331 $8321: C-----  00       BRK  
  0x040332 $8322: C-----  10 1C    BPL  $8340
  0x040334 $8324: C-----  10 30    BPL  $8356
  0x040336 $8326: C-----  58       CLI  
  0x040337 $8327: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x040338 $8328: C-----  00       BRK  
  0x040339 $8329: C-----  00       BRK  
  0x04033A $832A: C-----  10 1C    BPL  $8348
  0x04033C $832C: C-----  10 30    BPL  $835E
  0x04033E $832E: C-----  58       CLI  
  0x04033F $832F: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x040340 $8330: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x040341 $8331: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x040342 $8332: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x040343 $8333: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x040344 $8334: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x040345 $8335: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x040346 $8336: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x040347 $8337: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x040348 $8338: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x040349 $8339: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04034A $833A: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04034B $833B: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04034C $833C: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04034D $833D: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04034E $833E: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04034F $833F: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x040350 $8340: C-----  08       PHP  
  0x040351 $8341: C-----  18       CLC  
  0x040352 $8342: C-----  08       PHP  
  0x040353 $8343: C-----  08       PHP  
  0x040354 $8344: C-----  08       PHP  
  0x040355 $8345: C-----  08       PHP  
  0x040356 $8346: C-----  08       PHP  
  0x040357 $8347: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040358 $8348: C-----  08       PHP  
  0x040359 $8349: C-----  18       CLC  
  0x04035A $834A: C-----  08       PHP  
  0x04035B $834B: C-----  08       PHP  
  0x04035C $834C: C-----  08       PHP  
  0x04035D $834D: C-----  08       PHP  
  0x04035E $834E: C-----  08       PHP  
  0x04035F $834F: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040360 $8350: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x040361 $8351: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x040362 $8352: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040363 $8353: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040364 $8354: C-----  18       CLC  
  0x040365 $8355: C-----  20 40 7E JSR  $7E40
  0x040368 $8358: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x040369 $8359: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04036A $835A: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04036B $835B: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04036C $835C: C-----  18       CLC  
  0x04036D $835D: C-----  20 40 7E JSR  $7E40
  0x040370 $8360: C-----  7E 02 04 ROR  $0402,X
  0x040373 $8363: C-----  18       CLC  
  0x040374 $8364: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040375 $8365: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040376 $8366: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x040377 $8367: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x040378 $8368: C-----  7E 02 04 ROR  $0402,X
  0x04037B $836B: C-----  18       CLC  
  0x04037C $836C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04037D $836D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04037E $836E: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04037F $836F: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x040380 $8370: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040381 $8371: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x040382 $8372: C-----  24 44    BIT  $44
  0x040384 $8374: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x040385 $8375: C-----  7E 04 04 ROR  $0404,X
  0x040388 $8378: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040389 $8379: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04038A $837A: C-----  24 44    BIT  $44
  0x04038C $837C: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04038D $837D: C-----  7E 04 04 ROR  $0404,X
  0x040390 $8380: C-----  7E 40 40 ROR  $4040,X
  0x040393 $8383: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x040394 $8384: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040395 $8385: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040396 $8386: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x040397 $8387: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x040398 $8388: C-----  7E 40 40 ROR  $4040,X
  0x04039B $838B: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04039C $838C: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04039D $838D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04039E $838E: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04039F $838F: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0403A0 $8390: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0403A1 $8391: C-----  20 40 7C JSR  $7C40
  0x0403A4 $8394: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0403A5 $8395: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0403A6 $8396: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0403A7 $8397: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0403A8 $8398: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0403A9 $8399: C-----  20 40 7C JSR  $7C40
  0x0403AC $839C: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0403AD $839D: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0403AE $839E: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0403AF $839F: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0403B0 $83A0: C-----  7E 42 42 ROR  $4242,X
  0x0403B3 $83A3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0403B4 $83A4: C-----  08       PHP  
  0x0403B5 $83A5: C-----  10 10    BPL  $83B7
  0x0403B7 $83A7: C-----  10 7E    BPL  $8427
  0x0403B9 $83A9: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0403BA $83AA: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0403BB $83AB: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0403BC $83AC: C-----  08       PHP  
  0x0403BD $83AD: C-----  10 10    BPL  $83BF
  0x0403BF $83AF: C-----  10 3C    BPL  $83ED
  0x0403C1 $83B1: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0403C2 $83B2: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0403C3 $83B3: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0403C4 $83B4: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0403C5 $83B5: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0403C6 $83B6: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0403C7 $83B7: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0403C8 $83B8: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0403C9 $83B9: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0403CA $83BA: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0403CB $83BB: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0403CC $83BC: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0403CD $83BD: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0403CE $83BE: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0403CF $83BF: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0403D0 $83C0: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0403D1 $83C1: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0403D2 $83C2: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0403D3 $83C3: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0403D4 $83C4: C-----  3E 02 04 ROL  $0402,X
  0x0403D7 $83C7: C-----  18       CLC  
  0x0403D8 $83C8: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0403D9 $83C9: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0403DA $83CA: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0403DB $83CB: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0403DC $83CC: C-----  3E 02 04 ROL  $0402,X
  0x0403DF $83CF: C-----  18       CLC  
  0x0403E0 $83D0: C-----  00       BRK  
  0x0403E1 $83D1: C-----  18       CLC  
  0x0403E2 $83D2: C-----  18       CLC  
  0x0403E3 $83D3: C-----  7E 7E 18 ROR  $187E,X
  0x0403E6 $83D6: C-----  18       CLC  
  0x0403E7 $83D7: C-----  00       BRK  
  0x0403E8 $83D8: C-----  00       BRK  
  0x0403E9 $83D9: C-----  18       CLC  
  0x0403EA $83DA: C-----  18       CLC  
  0x0403EB $83DB: C-----  7E 7E 18 ROR  $187E,X
  0x0403EE $83DE: C-----  18       CLC  
  0x0403EF $83DF: C-----  00       BRK  
  0x0403F0 $83E0: C-----  78       SEI  
  0x0403F1 $83E1: C-----  10 10    BPL  $83F3
  0x0403F3 $83E3: C-----  10 15    BPL  $83FA
  0x0403F5 $83E5: C-----  16 14    ASL  $14,X
  0x0403F7 $83E7: C-----  65 78    ADC  $78
  0x0403F9 $83E9: C-----  10 10    BPL  $83FB
  0x0403FB $83EB: C-----  10 15    BPL  $8402
  0x0403FD $83ED: C-----  16 14    ASL  $14,X
  0x0403FF $83EF: C-----  65 00    ADC  $00
  0x040401 $83F1: C-----  00       BRK  
  0x040402 $83F2: C-----  00       BRK  
  0x040403 $83F3: C-----  18       CLC  
  0x040404 $83F4: C-----  18       CLC  
  0x040405 $83F5: C-----  00       BRK  
  0x040406 $83F6: C-----  00       BRK  
  0x040407 $83F7: C-----  00       BRK  
  0x040408 $83F8: C-----  00       BRK  
  0x040409 $83F9: C-----  00       BRK  
  0x04040A $83FA: C-----  00       BRK  
  0x04040B $83FB: C-----  18       CLC  
  0x04040C $83FC: C-----  18       CLC  
  0x04040D $83FD: C-----  00       BRK  
  0x04040E $83FE: C-----  00       BRK  
  0x04040F $83FF: C-----  00       BRK  
  0x040410 $8400: C-----  1E 10 10 ASL  $1010,X
  0x040413 $8403: C-----  10 10    BPL  $8415
  0x040415 $8405: C-----  10 00    BPL  $8407
  0x040417 $8407: C-----  00       BRK  
  0x040418 $8408: C-----  1E 10 10 ASL  $1010,X
  0x04041B $840B: C-----  10 10    BPL  $841D
  0x04041D $840D: C-----  10 00    BPL  $840F
  0x04041F $840F: C-----  00       BRK  
  0x040420 $8410: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040421 $8411: C-----  01 09    ORA  ($09,X)
  0x040423 $8413: C-----  0A       ASL  A
  0x040424 $8414: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040425 $8415: C-----  08       PHP  
  0x040426 $8416: C-----  10 20    BPL  $8438
  0x040428 $8418: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040429 $8419: C-----  01 09    ORA  ($09,X)
  0x04042B $841B: C-----  0A       ASL  A
  0x04042C $841C: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04042D $841D: C-----  08       PHP  
  0x04042E $841E: C-----  10 20    BPL  $8440
  0x040430 $8420: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040431 $8421: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040432 $8422: C-----  08       PHP  
  0x040433 $8423: C-----  18       CLC  
  0x040434 $8424: C-----  68       PLA  
  0x040435 $8425: C-----  08       PHP  
  0x040436 $8426: C-----  08       PHP  
  0x040437 $8427: C-----  08       PHP  
  0x040438 $8428: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040439 $8429: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04043A $842A: C-----  08       PHP  
  0x04043B $842B: C-----  18       CLC  
  0x04043C $842C: C-----  68       PLA  
  0x04043D $842D: C-----  08       PHP  
  0x04043E $842E: C-----  08       PHP  
  0x04043F $842F: C-----  08       PHP  
  0x040440 $8430: C-----  08       PHP  
  0x040441 $8431: C-----  08       PHP  
  0x040442 $8432: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040443 $8433: C-----  41 01    EOR  ($01,X)
  0x040445 $8435: C-----  01 02    ORA  ($02,X)
  0x040447 $8437: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040448 $8438: C-----  08       PHP  
  0x040449 $8439: C-----  08       PHP  
  0x04044A $843A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04044B $843B: C-----  41 01    EOR  ($01,X)
  0x04044D $843D: C-----  01 02    ORA  ($02,X)
  0x04044F $843F: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040450 $8440: C-----  00       BRK  
  0x040451 $8441: C-----  3E 08 08 ROL  $0808,X
  0x040454 $8444: C-----  08       PHP  
  0x040455 $8445: C-----  08       PHP  
  0x040456 $8446: C-----  08       PHP  
  0x040457 $8447: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040458 $8448: C-----  00       BRK  
  0x040459 $8449: C-----  3E 08 08 ROL  $0808,X
  0x04045C $844C: C-----  08       PHP  
  0x04045D $844D: C-----  08       PHP  
  0x04045E $844E: C-----  08       PHP  
  0x04045F $844F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040460 $8450: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040461 $8451: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040462 $8452: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040463 $8453: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040464 $8454: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x040465 $8455: C-----  24 44    BIT  $44
  0x040467 $8457: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040468 $8458: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040469 $8459: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04046A $845A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04046B $845B: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04046C $845C: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04046D $845D: C-----  24 44    BIT  $44
  0x04046F $845F: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040470 $8460: C-----  08       PHP  
  0x040471 $8461: C-----  08       PHP  
  0x040472 $8462: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040473 $8463: C-----  09 09    ORA  #$09
  0x040475 $8465: C-----  11 25    ORA  ($25),Y
  0x040477 $8467: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x040478 $8468: C-----  08       PHP  
  0x040479 $8469: C-----  08       PHP  
  0x04047A $846A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04047B $846B: C-----  09 09    ORA  #$09
  0x04047D $846D: C-----  11 25    ORA  ($25),Y
  0x04047F $846F: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x040480 $8470: C-----  08       PHP  
  0x040481 $8471: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040482 $8472: C-----  08       PHP  
  0x040483 $8473: C-----  08       PHP  
  0x040484 $8474: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040485 $8475: C-----  08       PHP  
  0x040486 $8476: C-----  08       PHP  
  0x040487 $8477: C-----  08       PHP  
  0x040488 $8478: C-----  08       PHP  
  0x040489 $8479: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04048A $847A: C-----  08       PHP  
  0x04048B $847B: C-----  08       PHP  
  0x04048C $847C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04048D $847D: C-----  08       PHP  
  0x04048E $847E: C-----  08       PHP  
  0x04048F $847F: C-----  08       PHP  
  0x040490 $8480: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x040491 $8481: C-----  11 11    ORA  ($11),Y
  0x040493 $8483: C-----  21 03    AND  ($03,X)
  0x040495 $8485: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040496 $8486: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040497 $8487: C-----  18       CLC  
  0x040498 $8488: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x040499 $8489: C-----  11 11    ORA  ($11),Y
  0x04049B $848B: C-----  21 03    AND  ($03,X)
  0x04049D $848D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04049E $848E: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04049F $848F: C-----  18       CLC  
  0x0404A0 $8490: C-----  20 3F 24 JSR  $243F
  0x0404A3 $8493: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0404A4 $8494: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0404A5 $8495: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0404A6 $8496: C-----  08       PHP  
  0x0404A7 $8497: C-----  30 20    BMI  $84B9
  0x0404A9 $8499: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0404AA $849A: C-----  24 44    BIT  $44
  0x0404AC $849C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0404AD $849D: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0404AE $849E: C-----  08       PHP  
  0x0404AF $849F: C-----  30 00    BMI  $84A1
  0x0404B1 $84A1: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0404B2 $84A2: C-----  01 01    ORA  ($01,X)
  0x0404B4 $84A4: C-----  01 01    ORA  ($01,X)
  0x0404B6 $84A6: C-----  01 3F    ORA  ($3F,X)
  0x0404B8 $84A8: C-----  00       BRK  
  0x0404B9 $84A9: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0404BA $84AA: C-----  01 01    ORA  ($01,X)
  0x0404BC $84AC: C-----  01 01    ORA  ($01,X)
  0x0404BE $84AE: C-----  01 3F    ORA  ($3F,X)
  0x0404C0 $84B0: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0404C1 $84B1: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0404C2 $84B2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0404C3 $84B3: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0404C4 $84B4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0404C5 $84B5: C-----  06 04    ASL  $04
  0x0404C7 $84B7: C-----  18       CLC  
  0x0404C8 $84B8: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0404C9 $84B9: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0404CA $84BA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0404CB $84BB: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0404CC $84BC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0404CD $84BD: C-----  06 04    ASL  $04
  0x0404CF $84BF: C-----  18       CLC  
  0x0404D0 $84C0: C-----  00       BRK  
  0x0404D1 $84C1: C-----  38       SEC  
  0x0404D2 $84C2: C-----  00       BRK  
  0x0404D3 $84C3: C-----  39 01 02 AND  $0201,Y
  0x0404D6 $84C6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0404D7 $84C7: C-----  38       SEC  
  0x0404D8 $84C8: C-----  00       BRK  
  0x0404D9 $84C9: C-----  38       SEC  
  0x0404DA $84CA: C-----  00       BRK  
  0x0404DB $84CB: C-----  39 01 02 AND  $0201,Y
  0x0404DE $84CE: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0404DF $84CF: C-----  38       SEC  
  0x0404E0 $84D0: C-----  00       BRK  
  0x0404E1 $84D1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0404E2 $84D2: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0404E3 $84D3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0404E4 $84D4: C-----  08       PHP  
  0x0404E5 $84D5: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0404E6 $84D6: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0404E7 $84D7: C-----  41 00    EOR  ($00,X)
  0x0404E9 $84D9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0404EA $84DA: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0404EB $84DB: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0404EC $84DC: C-----  08       PHP  
  0x0404ED $84DD: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0404EE $84DE: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0404EF $84DF: C-----  41 20    EOR  ($20,X)
  0x0404F1 $84E1: C-----  20 7F 21 JSR  $217F
  0x0404F4 $84E4: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0404F5 $84E5: C-----  20 20 1F JSR  $1F20
  0x0404F8 $84E8: C-----  20 20 7F JSR  $7F20
  0x0404FB $84EB: C-----  21 22    AND  ($22,X)
  0x0404FD $84ED: C-----  20 20 1F JSR  $1F20
  0x040500 $84F0: C-----  41 41    EOR  ($41,X)
  0x040502 $84F2: C-----  21 23    AND  ($23,X)
  0x040504 $84F4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040505 $84F5: C-----  06 04    ASL  $04
  0x040507 $84F7: C-----  18       CLC  
  0x040508 $84F8: C-----  41 41    EOR  ($41,X)
  0x04050A $84FA: C-----  21 23    AND  ($23,X)
  0x04050C $84FC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04050D $84FD: C-----  06 04    ASL  $04
  0x04050F $84FF: C-----  18       CLC  
  0x040510 $8500: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x040511 $8501: C-----  11 11    ORA  ($11),Y
  0x040513 $8503: C-----  2D 03 02 AND  $0203
  0x040516 $8506: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040517 $8507: C-----  18       CLC  
  0x040518 $8508: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x040519 $8509: C-----  11 11    ORA  ($11),Y
  0x04051B $850B: C-----  2D 03 02 AND  $0203
  0x04051E $850E: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04051F $850F: C-----  18       CLC  
  0x040520 $8510: C-----  06 0C    ASL  $0C
  0x040522 $8512: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x040523 $8513: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040524 $8514: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040525 $8515: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040526 $8516: C-----  08       PHP  
  0x040527 $8517: C-----  30 06    BMI  $851F
  0x040529 $8519: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04052A $851A: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x04052B $851B: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04052C $851C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04052D $851D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04052E $851E: C-----  08       PHP  
  0x04052F $851F: C-----  30 00    BMI  $8521
  0x040531 $8521: C-----  49 49    EOR  #$49
  0x040533 $8523: C-----  49 03    EOR  #$03
  0x040535 $8525: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040536 $8526: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040537 $8527: C-----  18       CLC  
  0x040538 $8528: C-----  00       BRK  
  0x040539 $8529: C-----  49 49    EOR  #$49
  0x04053B $852B: C-----  49 03    EOR  #$03
  0x04053D $852D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04053E $852E: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04053F $852F: C-----  18       CLC  
  0x040540 $8530: C-----  3E 00 00 ROL  $0000,X
  0x040543 $8533: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040544 $8534: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040545 $8535: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040546 $8536: C-----  08       PHP  
  0x040547 $8537: C-----  30 3E    BMI  $8577
  0x040549 $8539: C-----  00       BRK  
  0x04054A $853A: C-----  00       BRK  
  0x04054B $853B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04054C $853C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04054D $853D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04054E $853E: C-----  08       PHP  
  0x04054F $853F: C-----  30 20    BMI  $8561
  0x040551 $8541: C-----  20 20 38 JSR  $3820
  0x040554 $8544: C-----  26 20    ROL  $20
  0x040556 $8546: C-----  20 20 20 JSR  $2020
  0x040559 $8549: C-----  20 20 38 JSR  $3820
  0x04055C $854C: C-----  26 20    ROL  $20
  0x04055E $854E: C-----  20 20 04 JSR  $0420
  0x040561 $8551: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040562 $8552: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040563 $8553: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040564 $8554: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040565 $8555: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040566 $8556: C-----  08       PHP  
  0x040567 $8557: C-----  30 04    BMI  $855D
  0x040569 $8559: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04056A $855A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04056B $855B: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04056C $855C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04056D $855D: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04056E $855E: C-----  08       PHP  
  0x04056F $855F: C-----  30 00    BMI  $8561
  0x040571 $8561: C-----  3E 00 00 ROL  $0000,X
  0x040574 $8564: C-----  00       BRK  
  0x040575 $8565: C-----  00       BRK  
  0x040576 $8566: C-----  00       BRK  
  0x040577 $8567: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040578 $8568: C-----  00       BRK  
  0x040579 $8569: C-----  3E 00 00 ROL  $0000,X
  0x04057C $856C: C-----  00       BRK  
  0x04057D $856D: C-----  00       BRK  
  0x04057E $856E: C-----  00       BRK  
  0x04057F $856F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040580 $8570: C-----  7E 02 02 ROR  $0202,X
  0x040583 $8573: C-----  16 0C    ASL  $0C,X
  0x040585 $8575: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040586 $8576: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x040587 $8577: C-----  60       RTS  
  0x040588 $8578: C-----  7E 02 02 ROR  $0202,X
  0x04058B $857B: C-----  16 0C    ASL  $0C,X
  0x04058D $857D: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04058E $857E: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x04058F $857F: C-----  60       RTS  
  0x040590 $8580: C-----  08       PHP  
  0x040591 $8581: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040592 $8582: C-----  01 06    ORA  ($06,X)
  0x040594 $8584: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040595 $8585: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x040596 $8586: C-----  08       PHP  
  0x040597 $8587: C-----  08       PHP  
  0x040598 $8588: C-----  08       PHP  
  0x040599 $8589: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04059A $858A: C-----  01 06    ORA  ($06,X)
  0x04059C $858C: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04059D $858D: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x04059E $858E: C-----  08       PHP  
  0x04059F $858F: C-----  08       PHP  
  0x0405A0 $8590: C-----  00       BRK  
  0x0405A1 $8591: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0405A2 $8592: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0405A3 $8593: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0405A4 $8594: C-----  06 04    ASL  $04
  0x0405A6 $8596: C-----  08       PHP  
  0x0405A7 $8597: C-----  30 00    BMI  $8599
  0x0405A9 $8599: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0405AA $859A: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0405AB $859B: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0405AC $859C: C-----  06 04    ASL  $04
  0x0405AE $859E: C-----  08       PHP  
  0x0405AF $859F: C-----  30 00    BMI  $85A1
  0x0405B1 $85A1: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0405B2 $85A2: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0405B3 $85A3: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0405B4 $85A4: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0405B5 $85A5: C-----  31 21    AND  ($21),Y
  0x0405B7 $85A7: C-----  41 00    EOR  ($00,X)
  0x0405B9 $85A9: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0405BA $85AA: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0405BB $85AB: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0405BC $85AC: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0405BD $85AD: C-----  31 21    AND  ($21),Y
  0x0405BF $85AF: C-----  41 40    EOR  ($40,X)
  0x0405C1 $85B1: C-----  40       RTI  
  0x0405C2 $85B2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0405C3 $85B3: C-----  40       RTI  
  0x0405C4 $85B4: C-----  40       RTI  
  0x0405C5 $85B5: C-----  40       RTI  
  0x0405C6 $85B6: C-----  40       RTI  
  0x0405C7 $85B7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0405C8 $85B8: C-----  40       RTI  
  0x0405C9 $85B9: C-----  40       RTI  
  0x0405CA $85BA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0405CB $85BB: C-----  40       RTI  
  0x0405CC $85BC: C-----  40       RTI  
  0x0405CD $85BD: C-----  40       RTI  
  0x0405CE $85BE: C-----  40       RTI  
  0x0405CF $85BF: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0405D0 $85C0: C-----  00       BRK  
  0x0405D1 $85C1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0405D2 $85C2: C-----  01 01    ORA  ($01,X)
  0x0405D4 $85C4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0405D5 $85C5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0405D6 $85C6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0405D7 $85C7: C-----  38       SEC  
  0x0405D8 $85C8: C-----  00       BRK  
  0x0405D9 $85C9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0405DA $85CA: C-----  01 01    ORA  ($01,X)
  0x0405DC $85CC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0405DD $85CD: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0405DE $85CE: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0405DF $85CF: C-----  38       SEC  
  0x0405E0 $85D0: C-----  00       BRK  
  0x0405E1 $85D1: C-----  10 28    BPL  $85FB
  0x0405E3 $85D3: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0405E4 $85D4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0405E5 $85D5: C-----  01 00    ORA  ($00,X)
  0x0405E7 $85D7: C-----  00       BRK  
  0x0405E8 $85D8: C-----  00       BRK  
  0x0405E9 $85D9: C-----  10 28    BPL  $8603
  0x0405EB $85DB: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0405EC $85DC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0405ED $85DD: C-----  01 00    ORA  ($00,X)
  0x0405EF $85DF: C-----  00       BRK  
  0x0405F0 $85E0: C-----  08       PHP  
  0x0405F1 $85E1: C-----  08       PHP  
  0x0405F2 $85E2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0405F3 $85E3: C-----  08       PHP  
  0x0405F4 $85E4: C-----  2A       ROL  A
  0x0405F5 $85E5: C-----  2A       ROL  A
  0x0405F6 $85E6: C-----  49 08    EOR  #$08
  0x0405F8 $85E8: C-----  08       PHP  
  0x0405F9 $85E9: C-----  08       PHP  
  0x0405FA $85EA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0405FB $85EB: C-----  08       PHP  
  0x0405FC $85EC: C-----  2A       ROL  A
  0x0405FD $85ED: C-----  2A       ROL  A
  0x0405FE $85EE: C-----  49 08    EOR  #$08
  0x040600 $85F0: C-----  00       BRK  
  0x040601 $85F1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040602 $85F2: C-----  01 01    ORA  ($01,X)
  0x040604 $85F4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040605 $85F5: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x040606 $85F6: C-----  08       PHP  
  0x040607 $85F7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040608 $85F8: C-----  00       BRK  
  0x040609 $85F9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04060A $85FA: C-----  01 01    ORA  ($01,X)
  0x04060C $85FC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04060D $85FD: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04060E $85FE: C-----  08       PHP  
  0x04060F $85FF: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040610 $8600: C-----  38       SEC  
  0x040611 $8601: C-----  06 00    ASL  $00
  0x040613 $8603: C-----  38       SEC  
  0x040614 $8604: C-----  06 00    ASL  $00
  0x040616 $8606: C-----  38       SEC  
  0x040617 $8607: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x040618 $8608: C-----  38       SEC  
  0x040619 $8609: C-----  06 00    ASL  $00
  0x04061B $860B: C-----  38       SEC  
  0x04061C $860C: C-----  06 00    ASL  $00
  0x04061E $860E: C-----  38       SEC  
  0x04061F $860F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x040620 $8610: C-----  08       PHP  
  0x040621 $8611: C-----  08       PHP  
  0x040622 $8612: C-----  10 10    BPL  $8624
  0x040624 $8614: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x040625 $8615: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x040626 $8616: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040627 $8617: C-----  01 08    ORA  ($08,X)
  0x040629 $8619: C-----  08       PHP  
  0x04062A $861A: C-----  10 10    BPL  $862C
  0x04062C $861C: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x04062D $861D: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x04062E $861E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04062F $861F: C-----  01 02    ORA  ($02,X)
  0x040631 $8621: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040632 $8622: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040633 $8623: C-----  16 0C    ASL  $0C,X
  0x040635 $8625: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040636 $8626: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x040637 $8627: C-----  60       RTS  
  0x040638 $8628: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040639 $8629: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04063A $862A: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04063B $862B: C-----  16 0C    ASL  $0C,X
  0x04063D $862D: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04063E $862E: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x04063F $862F: C-----  60       RTS  
  0x040640 $8630: C-----  3E 10 10 ROL  $1010,X
  0x040643 $8633: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040644 $8634: C-----  10 10    BPL  $8646
  0x040646 $8636: C-----  10 0F    BPL  $8647
  0x040648 $8638: C-----  3E 10 10 ROL  $1010,X
  0x04064B $863B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04064C $863C: C-----  10 10    BPL  $864E
  0x04064E $863E: C-----  10 0F    BPL  $864F
  0x040650 $8640: C-----  20 20 7F JSR  $7F20
  0x040653 $8643: C-----  21 22    AND  ($22,X)
  0x040655 $8645: C-----  24 20    BIT  $20
  0x040657 $8647: C-----  20 20 20 JSR  $2020
  0x04065A $864A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04065B $864B: C-----  21 22    AND  ($22,X)
  0x04065D $864D: C-----  24 20    BIT  $20
  0x04065F $864F: C-----  20 00 3C JSR  $3C00
  0x040662 $8652: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040663 $8653: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040664 $8654: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040665 $8655: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040666 $8656: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040667 $8657: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040668 $8658: C-----  00       BRK  
  0x040669 $8659: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04066A $865A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04066B $865B: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04066C $865C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04066D $865D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04066E $865E: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04066F $865F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040670 $8660: C-----  00       BRK  
  0x040671 $8661: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040672 $8662: C-----  01 01    ORA  ($01,X)
  0x040674 $8664: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x040675 $8665: C-----  01 01    ORA  ($01,X)
  0x040677 $8667: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040678 $8668: C-----  00       BRK  
  0x040679 $8669: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04067A $866A: C-----  01 01    ORA  ($01,X)
  0x04067C $866C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04067D $866D: C-----  01 01    ORA  ($01,X)
  0x04067F $866F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040680 $8670: C-----  3E 00 7F ROL  $7F00,X
  0x040683 $8673: C-----  01 01    ORA  ($01,X)
  0x040685 $8675: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040686 $8676: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040687 $8677: C-----  18       CLC  
  0x040688 $8678: C-----  3E 00 7F ROL  $7F00,X
  0x04068B $867B: C-----  01 01    ORA  ($01,X)
  0x04068D $867D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04068E $867E: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04068F $867F: C-----  18       CLC  
  0x040690 $8680: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x040691 $8681: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x040692 $8682: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x040693 $8683: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x040694 $8684: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x040695 $8685: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040696 $8686: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040697 $8687: C-----  08       PHP  
  0x040698 $8688: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x040699 $8689: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x04069A $868A: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x04069B $868B: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x04069C $868C: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x04069D $868D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04069E $868E: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04069F $868F: C-----  08       PHP  
  0x0406A0 $8690: C-----  00       BRK  
  0x0406A1 $8691: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0406A2 $8692: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0406A3 $8693: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0406A4 $8694: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0406A5 $8695: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x0406A6 $8696: C-----  25 46    AND  $46
  0x0406A8 $8698: C-----  00       BRK  
  0x0406A9 $8699: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0406AA $869A: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0406AB $869B: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0406AC $869C: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0406AD $869D: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x0406AE $869E: C-----  25 46    AND  $46
  0x0406B0 $86A0: C-----  00       BRK  
  0x0406B1 $86A1: C-----  20 20 20 JSR  $2020
  0x0406B4 $86A4: C-----  20 22 2C JSR  $2C22
  0x0406B7 $86A7: C-----  38       SEC  
  0x0406B8 $86A8: C-----  00       BRK  
  0x0406B9 $86A9: C-----  20 20 20 JSR  $2020
  0x0406BC $86AC: C-----  20 22 2C JSR  $2C22
  0x0406BF $86AF: C-----  38       SEC  
  0x0406C0 $86B0: C-----  00       BRK  
  0x0406C1 $86B1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0406C2 $86B2: C-----  41 41    EOR  ($41,X)
  0x0406C4 $86B4: C-----  41 41    EOR  ($41,X)
  0x0406C6 $86B6: C-----  41 7F    EOR  ($7F,X)
  0x0406C8 $86B8: C-----  00       BRK  
  0x0406C9 $86B9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0406CA $86BA: C-----  41 41    EOR  ($41,X)
  0x0406CC $86BC: C-----  41 41    EOR  ($41,X)
  0x0406CE $86BE: C-----  41 7F    EOR  ($7F,X)
  0x0406D0 $86C0: C-----  00       BRK  
  0x0406D1 $86C1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0406D2 $86C2: C-----  41 01    EOR  ($01,X)
  0x0406D4 $86C4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0406D5 $86C5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0406D6 $86C6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0406D7 $86C7: C-----  38       SEC  
  0x0406D8 $86C8: C-----  00       BRK  
  0x0406D9 $86C9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0406DA $86CA: C-----  41 01    EOR  ($01,X)
  0x0406DC $86CC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0406DD $86CD: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0406DE $86CE: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0406DF $86CF: C-----  38       SEC  
  0x0406E0 $86D0: C-----  00       BRK  
  0x0406E1 $86D1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0406E2 $86D2: C-----  01 3F    ORA  ($3F,X)
  0x0406E4 $86D4: C-----  01 03    ORA  ($03,X)
  0x0406E6 $86D6: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0406E7 $86D7: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0406E8 $86D8: C-----  00       BRK  
  0x0406E9 $86D9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0406EA $86DA: C-----  01 3F    ORA  ($3F,X)
  0x0406EC $86DC: C-----  01 03    ORA  ($03,X)
  0x0406EE $86DE: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0406EF $86DF: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0406F0 $86E0: C-----  00       BRK  
  0x0406F1 $86E1: C-----  71 01    ADC  ($01),Y
  0x0406F3 $86E3: C-----  01 01    ORA  ($01,X)
  0x0406F5 $86E5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0406F6 $86E6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0406F7 $86E7: C-----  78       SEI  
  0x0406F8 $86E8: C-----  00       BRK  
  0x0406F9 $86E9: C-----  71 01    ADC  ($01),Y
  0x0406FB $86EB: C-----  01 01    ORA  ($01,X)
  0x0406FD $86ED: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0406FE $86EE: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0406FF $86EF: C-----  78       SEI  
  0x040700 $86F0: C-----  00       BRK  
  0x040701 $86F1: C-----  00       BRK  
  0x040702 $86F2: C-----  00       BRK  
  0x040703 $86F3: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x040704 $86F4: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x040705 $86F5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040706 $86F6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040707 $86F7: C-----  38       SEC  
  0x040708 $86F8: C-----  00       BRK  
  0x040709 $86F9: C-----  00       BRK  
  0x04070A $86FA: C-----  00       BRK  
  0x04070B $86FB: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x04070C $86FC: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x04070D $86FD: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04070E $86FE: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04070F $86FF: C-----  38       SEC  
  0x040710 $8700: C-----  00       BRK  
  0x040711 $8701: C-----  00       BRK  
  0x040712 $8702: C-----  20 7E 22 JSR  $227E
  0x040715 $8705: C-----  24 10    BIT  $10
  0x040717 $8707: C-----  10 00    BPL  $8709
  0x040719 $8709: C-----  00       BRK  
  0x04071A $870A: C-----  20 7E 22 JSR  $227E
  0x04071D $870D: C-----  24 10    BIT  $10
  0x04071F $870F: C-----  10 00    BPL  $8711
  0x040721 $8711: C-----  00       BRK  
  0x040722 $8712: C-----  00       BRK  
  0x040723 $8713: C-----  00       BRK  
  0x040724 $8714: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x040725 $8715: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040726 $8716: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040727 $8717: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040728 $8718: C-----  00       BRK  
  0x040729 $8719: C-----  00       BRK  
  0x04072A $871A: C-----  00       BRK  
  0x04072B $871B: C-----  00       BRK  
  0x04072C $871C: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04072D $871D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04072E $871E: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04072F $871F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040730 $8720: C-----  00       BRK  
  0x040731 $8721: C-----  00       BRK  
  0x040732 $8722: C-----  00       BRK  
  0x040733 $8723: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x040734 $8724: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040735 $8725: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x040736 $8726: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040737 $8727: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x040738 $8728: C-----  00       BRK  
  0x040739 $8729: C-----  00       BRK  
  0x04073A $872A: C-----  00       BRK  
  0x04073B $872B: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04073C $872C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04073D $872D: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04073E $872E: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04073F $872F: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x040740 $8730: C-----  00       BRK  
  0x040741 $8731: C-----  00       BRK  
  0x040742 $8732: C-----  00       BRK  
  0x040743 $8733: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x040744 $8734: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040745 $8735: C-----  18       CLC  
  0x040746 $8736: C-----  10 20    BPL  $8758
  0x040748 $8738: C-----  00       BRK  
  0x040749 $8739: C-----  00       BRK  
  0x04074A $873A: C-----  00       BRK  
  0x04074B $873B: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04074C $873C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04074D $873D: C-----  18       CLC  
  0x04074E $873E: C-----  10 20    BPL  $8760
  0x040750 $8740: C-----  00       BRK  
  0x040751 $8741: C-----  00       BRK  
  0x040752 $8742: C-----  00       BRK  
  0x040753 $8743: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040754 $8744: C-----  08       PHP  
  0x040755 $8745: C-----  18       CLC  
  0x040756 $8746: C-----  28       PLP  
  0x040757 $8747: C-----  08       PHP  
  0x040758 $8748: C-----  00       BRK  
  0x040759 $8749: C-----  00       BRK  
  0x04075A $874A: C-----  00       BRK  
  0x04075B $874B: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04075C $874C: C-----  08       PHP  
  0x04075D $874D: C-----  18       CLC  
  0x04075E $874E: C-----  28       PLP  
  0x04075F $874F: C-----  08       PHP  
  0x040760 $8750: C-----  00       BRK  
  0x040761 $8751: C-----  00       BRK  
  0x040762 $8752: C-----  00       BRK  
  0x040763 $8753: C-----  3E 08 08 ROL  $0808,X
  0x040766 $8756: C-----  08       PHP  
  0x040767 $8757: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040768 $8758: C-----  00       BRK  
  0x040769 $8759: C-----  00       BRK  
  0x04076A $875A: C-----  00       BRK  
  0x04076B $875B: C-----  3E 08 08 ROL  $0808,X
  0x04076E $875E: C-----  08       PHP  
  0x04076F $875F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040770 $8760: C-----  00       BRK  
  0x040771 $8761: C-----  00       BRK  
  0x040772 $8762: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040773 $8763: C-----  3E 0C 14 ROL  $140C,X
  0x040776 $8766: C-----  24 0C    BIT  $0C
  0x040778 $8768: C-----  00       BRK  
  0x040779 $8769: C-----  00       BRK  
  0x04077A $876A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04077B $876B: C-----  3E 0C 14 ROL  $140C,X
  0x04077E $876E: C-----  24 0C    BIT  $0C
  0x040780 $8770: C-----  00       BRK  
  0x040781 $8771: C-----  18       CLC  
  0x040782 $8772: C-----  18       CLC  
  0x040783 $8773: C-----  00       BRK  
  0x040784 $8774: C-----  18       CLC  
  0x040785 $8775: C-----  18       CLC  
  0x040786 $8776: C-----  00       BRK  
  0x040787 $8777: C-----  00       BRK  
  0x040788 $8778: C-----  00       BRK  
  0x040789 $8779: C-----  18       CLC  
  0x04078A $877A: C-----  18       CLC  
  0x04078B $877B: C-----  00       BRK  
  0x04078C $877C: C-----  18       CLC  
  0x04078D $877D: C-----  18       CLC  
  0x04078E $877E: C-----  00       BRK  
  0x04078F $877F: C-----  00       BRK  
  0x040790 $8780: C-----  3E 41 41 ROL  $4141,X
  0x040793 $8783: C-----  06 08    ASL  $08
  0x040795 $8785: C-----  08       PHP  
  0x040796 $8786: C-----  00       BRK  
  0x040797 $8787: C-----  08       PHP  
  0x040798 $8788: C-----  3E 41 41 ROL  $4141,X
  0x04079B $878B: C-----  06 08    ASL  $08
  0x04079D $878D: C-----  08       PHP  
  0x04079E $878E: C-----  00       BRK  
  0x04079F $878F: C-----  08       PHP  
  0x0407A0 $8790: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0407A1 $8791: C-----  06 06    ASL  $06
  0x0407A3 $8793: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0407A4 $8794: C-----  08       PHP  
  0x0407A5 $8795: C-----  10 00    BPL  $8797
  0x0407A7 $8797: C-----  20 02 06 JSR  $0602
  0x0407AA $879A: C-----  06 0C    ASL  $0C
  0x0407AC $879C: C-----  08       PHP  
  0x0407AD $879D: C-----  10 00    BPL  $879F
  0x0407AF $879F: C-----  20 00 00 JSR  $0000
  0x0407B2 $87A2: C-----  00       BRK  
  0x0407B3 $87A3: C-----  00       BRK  
  0x0407B4 $87A4: C-----  00       BRK  
  0x0407B5 $87A5: C-----  40       RTI  
  0x0407B6 $87A6: C-----  20 10 00 JSR  $0010
  0x0407B9 $87A9: C-----  00       BRK  
  0x0407BA $87AA: C-----  00       BRK  
  0x0407BB $87AB: C-----  00       BRK  
  0x0407BC $87AC: C-----  00       BRK  
  0x0407BD $87AD: C-----  40       RTI  
  0x0407BE $87AE: C-----  20 10 00 JSR  $0010
  0x0407C1 $87B1: C-----  00       BRK  
  0x0407C2 $87B2: C-----  00       BRK  
  0x0407C3 $87B3: C-----  00       BRK  
  0x0407C4 $87B4: C-----  30 48    BMI  $87FE
  0x0407C6 $87B6: C-----  48       PHA  
  0x0407C7 $87B7: C-----  30 00    BMI  $87B9
  0x0407C9 $87B9: C-----  00       BRK  
  0x0407CA $87BA: C-----  00       BRK  
  0x0407CB $87BB: C-----  00       BRK  
  0x0407CC $87BC: C-----  30 48    BMI  $8806
  0x0407CE $87BE: C-----  48       PHA  
  0x0407CF $87BF: C-----  30 00    BMI  $87C1
  0x0407D1 $87C1: C-----  00       BRK  
  0x0407D2 $87C2: C-----  00       BRK  
  0x0407D3 $87C3: C-----  70 88    BVS  $874D
  0x0407D5 $87C5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0407D6 $87C6: C-----  00       BRK  
  0x0407D7 $87C7: C-----  00       BRK  
  0x0407D8 $87C8: C-----  00       BRK  
  0x0407D9 $87C9: C-----  00       BRK  
  0x0407DA $87CA: C-----  00       BRK  
  0x0407DB $87CB: C-----  70 88    BVS  $8755
  0x0407DD $87CD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0407DE $87CE: C-----  00       BRK  
  0x0407DF $87CF: C-----  00       BRK  
  0x0407E0 $87D0: C-----  00       BRK  
  0x0407E1 $87D1: C-----  00       BRK  
  0x0407E2 $87D2: C-----  00       BRK  
  0x0407E3 $87D3: C-----  00       BRK  
  0x0407E4 $87D4: C-----  7E 00 00 ROR  $0000,X
  0x0407E7 $87D7: C-----  00       BRK  
  0x0407E8 $87D8: C-----  00       BRK  
  0x0407E9 $87D9: C-----  00       BRK  
  0x0407EA $87DA: C-----  00       BRK  
  0x0407EB $87DB: C-----  00       BRK  
  0x0407EC $87DC: C-----  7E 00 00 ROR  $0000,X
  0x0407EF $87DF: C-----  00       BRK  
  0x0407F0 $87E0: C-----  00       BRK  
  0x0407F1 $87E1: C-----  00       BRK  
  0x0407F2 $87E2: C-----  00       BRK  
  0x0407F3 $87E3: C-----  00       BRK  
  0x0407F4 $87E4: C-----  00       BRK  
  0x0407F5 $87E5: C-----  60       RTS  
  0x0407F6 $87E6: C-----  60       RTS  
  0x0407F7 $87E7: C-----  00       BRK  
  0x0407F8 $87E8: C-----  00       BRK  
  0x0407F9 $87E9: C-----  00       BRK  
  0x0407FA $87EA: C-----  00       BRK  
  0x0407FB $87EB: C-----  00       BRK  
  0x0407FC $87EC: C-----  00       BRK  
  0x0407FD $87ED: C-----  60       RTS  
  0x0407FE $87EE: C-----  60       RTS  
  0x0407FF $87EF: C-----  00       BRK  
  0x040800 $87F0: C-----  00       BRK  
  0x040801 $87F1: C-----  00       BRK  
  0x040802 $87F2: C-----  00       BRK  
  0x040803 $87F3: C-----  00       BRK  
  0x040804 $87F4: C-----  60       RTS  
  0x040805 $87F5: C-----  60       RTS  
  0x040806 $87F6: C-----  20 40 00 JSR  $0040
  0x040809 $87F9: C-----  00       BRK  
  0x04080A $87FA: C-----  00       BRK  
  0x04080B $87FB: C-----  00       BRK  
  0x04080C $87FC: C-----  60       RTS  
  0x04080D $87FD: C-----  60       RTS  
  0x04080E $87FE: C-----  20 40 00 JSR  $0040
  0x040811 $8801: C-----  00       BRK  
  0x040812 $8802: C-----  00       BRK  
  0x040813 $8803: C-----  00       BRK  
  0x040814 $8804: C-----  00       BRK  
  0x040815 $8805: C-----  00       BRK  
  0x040816 $8806: C-----  00       BRK  
  0x040817 $8807: C-----  00       BRK  
  0x040818 $8808: C-----  00       BRK  
  0x040819 $8809: C-----  00       BRK  
  0x04081A $880A: C-----  00       BRK  
  0x04081B $880B: C-----  00       BRK  
  0x04081C $880C: C-----  00       BRK  
  0x04081D $880D: C-----  00       BRK  
  0x04081E $880E: C-----  00       BRK  
  0x04081F $880F: C-----  00       BRK  
  0x040820 $8810: C-----  00       BRK  
  0x040821 $8811: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040822 $8812: C-----  36 63    ROL  $63,X
  0x040824 $8814: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040825 $8815: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040826 $8816: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040827 $8817: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040828 $8818: C-----  00       BRK  
  0x040829 $8819: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04082A $881A: C-----  36 63    ROL  $63,X
  0x04082C $881C: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04082D $881D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04082E $881E: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04082F $881F: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040830 $8820: C-----  00       BRK  
  0x040831 $8821: C-----  7E 63 63 ROR  $6363,X
  0x040834 $8824: C-----  7E 63 63 ROR  $6363,X
  0x040837 $8827: C-----  7E 00 7E ROR  $7E00,X
  0x04083A $882A: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04083B $882B: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04083C $882C: C-----  7E 63 63 ROR  $6363,X
  0x04083F $882F: C-----  7E 00 1E ROR  $1E00,X
  0x040842 $8832: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x040843 $8833: C-----  60       RTS  
  0x040844 $8834: C-----  60       RTS  
  0x040845 $8835: C-----  60       RTS  
  0x040846 $8836: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x040847 $8837: C-----  1E 00 1E ASL  $1E00,X
  0x04084A $883A: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x04084B $883B: C-----  60       RTS  
  0x04084C $883C: C-----  60       RTS  
  0x04084D $883D: C-----  60       RTS  
  0x04084E $883E: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x04084F $883F: C-----  1E 00 7C ASL  $7C00,X
  0x040852 $8842: C-----  66 63    ROR  $63
  0x040854 $8844: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040855 $8845: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040856 $8846: C-----  66 7C    ROR  $7C
  0x040858 $8848: C-----  00       BRK  
  0x040859 $8849: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04085A $884A: C-----  66 63    ROR  $63
  0x04085C $884C: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04085D $884D: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04085E $884E: C-----  66 7C    ROR  $7C
  0x040860 $8850: C-----  00       BRK  
  0x040861 $8851: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040862 $8852: C-----  60       RTS  
  0x040863 $8853: C-----  60       RTS  
  0x040864 $8854: C-----  7E 60 60 ROR  $6060,X
  0x040867 $8857: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040868 $8858: C-----  00       BRK  
  0x040869 $8859: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04086A $885A: C-----  60       RTS  
  0x04086B $885B: C-----  60       RTS  
  0x04086C $885C: C-----  7E 60 60 ROR  $6060,X
  0x04086F $885F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040870 $8860: C-----  00       BRK  
  0x040871 $8861: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040872 $8862: C-----  60       RTS  
  0x040873 $8863: C-----  60       RTS  
  0x040874 $8864: C-----  7E 60 60 ROR  $6060,X
  0x040877 $8867: C-----  60       RTS  
  0x040878 $8868: C-----  00       BRK  
  0x040879 $8869: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04087A $886A: C-----  60       RTS  
  0x04087B $886B: C-----  60       RTS  
  0x04087C $886C: C-----  7E 60 60 ROR  $6060,X
  0x04087F $886F: C-----  60       RTS  
  0x040880 $8870: C-----  00       BRK  
  0x040881 $8871: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x040882 $8872: C-----  30 60    BMI  $88D4
  0x040884 $8874: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x040885 $8875: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040886 $8876: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x040887 $8877: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x040888 $8878: C-----  00       BRK  
  0x040889 $8879: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04088A $887A: C-----  30 60    BMI  $88DC
  0x04088C $887C: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x04088D $887D: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04088E $887E: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x04088F $887F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x040890 $8880: C-----  00       BRK  
  0x040891 $8881: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040892 $8882: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040893 $8883: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040894 $8884: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040895 $8885: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040896 $8886: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040897 $8887: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040898 $8888: C-----  00       BRK  
  0x040899 $8889: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04089A $888A: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04089B $888B: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04089C $888C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04089D $888D: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04089E $888E: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04089F $888F: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x0408A0 $8890: C-----  00       BRK  
  0x0408A1 $8891: C-----  7E 18 18 ROR  $1818,X
  0x0408A4 $8894: C-----  18       CLC  
  0x0408A5 $8895: C-----  18       CLC  
  0x0408A6 $8896: C-----  18       CLC  
  0x0408A7 $8897: C-----  7E 00 7E ROR  $7E00,X
  0x0408AA $889A: C-----  18       CLC  
  0x0408AB $889B: C-----  18       CLC  
  0x0408AC $889C: C-----  18       CLC  
  0x0408AD $889D: C-----  18       CLC  
  0x0408AE $889E: C-----  18       CLC  
  0x0408AF $889F: C-----  7E 00 63 ROR  $6300,X
  0x0408B2 $88A2: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x0408B3 $88A3: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x0408B4 $88A4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0408B5 $88A5: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x0408B6 $88A6: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x0408B7 $88A7: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x0408B8 $88A8: C-----  00       BRK  
  0x0408B9 $88A9: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x0408BA $88AA: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x0408BB $88AB: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x0408BC $88AC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0408BD $88AD: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x0408BE $88AE: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x0408BF $88AF: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x0408C0 $88B0: C-----  00       BRK  
  0x0408C1 $88B1: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x0408C2 $88B2: C-----  66 6C    ROR  $6C
  0x0408C4 $88B4: C-----  78       SEI  
  0x0408C5 $88B5: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0408C6 $88B6: C-----  6E 67 00 ROR  $0067
  0x0408C9 $88B9: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x0408CA $88BA: C-----  66 6C    ROR  $6C
  0x0408CC $88BC: C-----  78       SEI  
  0x0408CD $88BD: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0408CE $88BE: C-----  6E 67 00 ROR  $0067
  0x0408D1 $88C1: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x0408D2 $88C2: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0408D3 $88C3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0408D4 $88C4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0408D5 $88C5: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x0408D6 $88C6: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x0408D7 $88C7: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x0408D8 $88C8: C-----  00       BRK  
  0x0408D9 $88C9: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x0408DA $88CA: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0408DB $88CB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0408DC $88CC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0408DD $88CD: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x0408DE $88CE: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x0408DF $88CF: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x0408E0 $88D0: C-----  00       BRK  
  0x0408E1 $88D1: C-----  7E 63 63 ROR  $6363,X
  0x0408E4 $88D4: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x0408E5 $88D5: C-----  7E 60 60 ROR  $6060,X
  0x0408E8 $88D8: C-----  00       BRK  
  0x0408E9 $88D9: C-----  7E 63 63 ROR  $6363,X
  0x0408EC $88DC: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x0408ED $88DD: C-----  7E 60 60 ROR  $6060,X
  0x0408F0 $88E0: C-----  00       BRK  
  0x0408F1 $88E1: C-----  60       RTS  
  0x0408F2 $88E2: C-----  60       RTS  
  0x0408F3 $88E3: C-----  60       RTS  
  0x0408F4 $88E4: C-----  60       RTS  
  0x0408F5 $88E5: C-----  60       RTS  
  0x0408F6 $88E6: C-----  60       RTS  
  0x0408F7 $88E7: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0408F8 $88E8: C-----  00       BRK  
  0x0408F9 $88E9: C-----  60       RTS  
  0x0408FA $88EA: C-----  60       RTS  
  0x0408FB $88EB: C-----  60       RTS  
  0x0408FC $88EC: C-----  60       RTS  
  0x0408FD $88ED: C-----  60       RTS  
  0x0408FE $88EE: C-----  60       RTS  
  0x0408FF $88EF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040900 $88F0: C-----  00       BRK  
  0x040901 $88F1: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x040902 $88F2: C-----  66 60    ROR  $60
  0x040904 $88F4: C-----  3E 03 63 ROL  $6303,X
  0x040907 $88F7: C-----  3E 00 3C ROL  $3C00,X
  0x04090A $88FA: C-----  66 60    ROR  $60
  0x04090C $88FC: C-----  3E 03 63 ROL  $6303,X
  0x04090F $88FF: C-----  3E 00 63 ROL  $6300,X
  0x040912 $8902: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040913 $8903: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040914 $8904: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040915 $8905: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040916 $8906: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040917 $8907: C-----  3E 00 63 ROL  $6300,X
  0x04091A $890A: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04091B $890B: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04091C $890C: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04091D $890D: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04091E $890E: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04091F $890F: C-----  3E 00 63 ROL  $6300,X
  0x040922 $8912: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040923 $8913: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040924 $8914: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040925 $8915: C-----  36 1C    ROL  $1C,X
  0x040927 $8917: C-----  08       PHP  
  0x040928 $8918: C-----  00       BRK  
  0x040929 $8919: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04092A $891A: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04092B $891B: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04092C $891C: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04092D $891D: C-----  36 1C    ROL  $1C,X
  0x04092F $891F: C-----  08       PHP  
  0x040930 $8920: C-----  00       BRK  
  0x040931 $8921: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040932 $8922: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040933 $8923: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x040934 $8924: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040935 $8925: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040936 $8926: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x040937 $8927: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x040938 $8928: C-----  00       BRK  
  0x040939 $8929: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04093A $892A: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04093B $892B: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x04093C $892C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04093D $892D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04093E $892E: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04093F $892F: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x040940 $8930: C-----  00       BRK  
  0x040941 $8931: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040942 $8932: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040943 $8933: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040944 $8934: C-----  36 1C    ROL  $1C,X
  0x040946 $8936: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040947 $8937: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040948 $8938: C-----  00       BRK  
  0x040949 $8939: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04094A $893A: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04094B $893B: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04094C $893C: C-----  36 1C    ROL  $1C,X
  0x04094E $893E: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04094F $893F: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040950 $8940: C-----  00       BRK  
  0x040951 $8941: C-----  00       BRK  
  0x040952 $8942: C-----  00       BRK  
  0x040953 $8943: C-----  00       BRK  
  0x040954 $8944: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040955 $8945: C-----  09 04    ORA  #$04
  0x040957 $8947: C-----  00       BRK  
  0x040958 $8948: C-----  00       BRK  
  0x040959 $8949: C-----  00       BRK  
  0x04095A $894A: C-----  00       BRK  
  0x04095B $894B: C-----  00       BRK  
  0x04095C $894C: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04095D $894D: C-----  09 04    ORA  #$04
  0x04095F $894F: C-----  00       BRK  
  0x040960 $8950: C-----  00       BRK  
  0x040961 $8951: C-----  00       BRK  
  0x040962 $8952: C-----  00       BRK  
  0x040963 $8953: C-----  00       BRK  
  0x040964 $8954: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x040965 $8955: C-----  05 07    ORA  $07
  0x040967 $8957: C-----  00       BRK  
  0x040968 $8958: C-----  00       BRK  
  0x040969 $8959: C-----  00       BRK  
  0x04096A $895A: C-----  00       BRK  
  0x04096B $895B: C-----  00       BRK  
  0x04096C $895C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04096D $895D: C-----  05 07    ORA  $07
  0x04096F $895F: C-----  00       BRK  
  0x040970 $8960: C-----  01 02    ORA  ($02,X)
  0x040972 $8962: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040973 $8963: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x040974 $8964: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040975 $8965: C-----  24 50    BIT  $50
  0x040977 $8967: C-----  20 01 02 JSR  $0201
  0x04097A $896A: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04097B $896B: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x04097C $896C: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04097D $896D: C-----  24 50    BIT  $50
  0x04097F $896F: C-----  20 C0 20 JSR  $20C0
  0x040982 $8972: C-----  10 10    BPL  $8984
  0x040984 $8974: C-----  20 C0 00 JSR  $00C0
  0x040987 $8977: C-----  60       RTS  
  0x040988 $8978: C-----  C0 20    CPY  #$20
  0x04098A $897A: C-----  10 10    BPL  $898C
  0x04098C $897C: C-----  20 C0 00 JSR  $00C0
  0x04098F $897F: C-----  60       RTS  
  0x040990 $8980: C-----  60       RTS  
  0x040991 $8981: C-----  E0 E0    CPX  #$E0
  0x040993 $8983: C-----  00       BRK  
  0x040994 $8984: C-----  00       BRK  
  0x040995 $8985: C-----  00       BRK  
  0x040996 $8986: C-----  00       BRK  
  0x040997 $8987: C-----  00       BRK  
  0x040998 $8988: C-----  60       RTS  
  0x040999 $8989: C-----  E0 E0    CPX  #$E0
  0x04099B $898B: C-----  00       BRK  
  0x04099C $898C: C-----  00       BRK  
  0x04099D $898D: C-----  00       BRK  
  0x04099E $898E: C-----  00       BRK  
  0x04099F $898F: C-----  00       BRK  
  0x0409A0 $8990: C-----  06 07    ASL  $07
  0x0409A2 $8992: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0409A3 $8993: C-----  00       BRK  
  0x0409A4 $8994: C-----  00       BRK  
  0x0409A5 $8995: C-----  00       BRK  
  0x0409A6 $8996: C-----  00       BRK  
  0x0409A7 $8997: C-----  00       BRK  
  0x0409A8 $8998: C-----  06 07    ASL  $07
  0x0409AA $899A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0409AB $899B: C-----  00       BRK  
  0x0409AC $899C: C-----  00       BRK  
  0x0409AD $899D: C-----  00       BRK  
  0x0409AE $899E: C-----  00       BRK  
  0x0409AF $899F: C-----  00       BRK  
  0x0409B0 $89A0: C-----  00       BRK  
  0x0409B1 $89A1: C-----  00       BRK  
  0x0409B2 $89A2: C-----  00       BRK  
  0x0409B3 $89A3: C-----  00       BRK  
  0x0409B4 $89A4: C-----  00       BRK  
  0x0409B5 $89A5: C-----  E0 E0    CPX  #$E0
  0x0409B7 $89A7: C-----  60       RTS  
  0x0409B8 $89A8: C-----  00       BRK  
  0x0409B9 $89A9: C-----  00       BRK  
  0x0409BA $89AA: C-----  00       BRK  
  0x0409BB $89AB: C-----  00       BRK  
  0x0409BC $89AC: C-----  00       BRK  
  0x0409BD $89AD: C-----  E0 E0    CPX  #$E0
  0x0409BF $89AF: C-----  60       RTS  
  0x0409C0 $89B0: C-----  00       BRK  
  0x0409C1 $89B1: C-----  00       BRK  
  0x0409C2 $89B2: C-----  00       BRK  
  0x0409C3 $89B3: C-----  00       BRK  
  0x0409C4 $89B4: C-----  00       BRK  
  0x0409C5 $89B5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0409C6 $89B6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0409C7 $89B7: C-----  06 00    ASL  $00
  0x0409C9 $89B9: C-----  00       BRK  
  0x0409CA $89BA: C-----  00       BRK  
  0x0409CB $89BB: C-----  00       BRK  
  0x0409CC $89BC: C-----  00       BRK  
  0x0409CD $89BD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0409CE $89BE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0409CF $89BF: C-----  06 00    ASL  $00
  0x0409D1 $89C1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0409D2 $89C2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0409D3 $89C3: C-----  1E 38 30 ASL  $3038,X
  0x0409D6 $89C6: C-----  70 60    BVS  $8A28
  0x0409D8 $89C8: C-----  00       BRK  
  0x0409D9 $89C9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0409DA $89CA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0409DB $89CB: C-----  1E 38 30 ASL  $3038,X
  0x0409DE $89CE: C-----  70 60    BVS  $8A30
  0x0409E0 $89D0: C-----  00       BRK  
  0x0409E1 $89D1: C-----  C0 F0    CPY  #$F0
  0x0409E3 $89D3: C-----  78       SEI  
  0x0409E4 $89D4: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0409E5 $89D5: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0409E6 $89D6: C-----  0E 06 00 ASL  $0006
  0x0409E9 $89D9: C-----  C0 F0    CPY  #$F0
  0x0409EB $89DB: C-----  78       SEI  
  0x0409EC $89DC: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0409ED $89DD: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0409EE $89DE: C-----  0E 06 60 ASL  $6006
  0x0409F1 $89E1: C-----  70 30    BVS  $8A13
  0x0409F3 $89E3: C-----  38       SEC  
  0x0409F4 $89E4: C-----  1E 0F 03 ASL  $030F,X
  0x0409F7 $89E7: C-----  00       BRK  
  0x0409F8 $89E8: C-----  60       RTS  
  0x0409F9 $89E9: C-----  70 30    BVS  $8A1B
  0x0409FB $89EB: C-----  38       SEC  
  0x0409FC $89EC: C-----  1E 0F 03 ASL  $030F,X
  0x0409FF $89EF: C-----  00       BRK  
  0x040A00 $89F0: C-----  06 0E    ASL  $0E
  0x040A02 $89F2: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040A03 $89F3: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040A04 $89F4: C-----  78       SEI  
  0x040A05 $89F5: C-----  F0 C0    BEQ  $89B7
  0x040A07 $89F7: C-----  00       BRK  
  0x040A08 $89F8: C-----  06 0E    ASL  $0E
  0x040A0A $89FA: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040A0B $89FB: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040A0C $89FC: C-----  78       SEI  
  0x040A0D $89FD: C-----  F0 C0    BEQ  $89BF
  0x040A0F $89FF: C-----  00       BRK  
  0x040A10 $8A00: C-----  00       BRK  
  0x040A11 $8A01: C-----  00       BRK  
  0x040A12 $8A02: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x040A13 $8A03: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x040A14 $8A04: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x040A15 $8A05: C-----  38       SEC  
  0x040A16 $8A06: C-----  10 10    BPL  $8A18
  0x040A18 $8A08: C-----  00       BRK  
  0x040A19 $8A09: C-----  00       BRK  
  0x040A1A $8A0A: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x040A1B $8A0B: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x040A1C $8A0C: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x040A1D $8A0D: C-----  38       SEC  
  0x040A1E $8A0E: C-----  10 10    BPL  $8A20
  0x040A20 $8A10: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040A21 $8A11: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040A22 $8A12: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040A23 $8A13: C-----  38       SEC  
  0x040A24 $8A14: C-----  F0 38    BEQ  $8A4E
  0x040A26 $8A16: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040A27 $8A17: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040A28 $8A18: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040A29 $8A19: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040A2A $8A1A: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040A2B $8A1B: C-----  38       SEC  
  0x040A2C $8A1C: C-----  F0 38    BEQ  $8A56
  0x040A2E $8A1E: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040A2F $8A1F: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040A30 $8A20: C-----  10 10    BPL  $8A32
  0x040A32 $8A22: C-----  38       SEC  
  0x040A33 $8A23: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x040A34 $8A24: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x040A35 $8A25: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x040A36 $8A26: C-----  00       BRK  
  0x040A37 $8A27: C-----  00       BRK  
  0x040A38 $8A28: C-----  10 10    BPL  $8A3A
  0x040A3A $8A2A: C-----  38       SEC  
  0x040A3B $8A2B: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x040A3C $8A2C: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x040A3D $8A2D: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x040A3E $8A2E: C-----  00       BRK  
  0x040A3F $8A2F: C-----  00       BRK  
  0x040A40 $8A30: C-----  30 30    BMI  $8A62
  0x040A42 $8A32: C-----  38       SEC  
  0x040A43 $8A33: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040A44 $8A34: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x040A45 $8A35: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040A46 $8A36: C-----  30 30    BMI  $8A68
  0x040A48 $8A38: C-----  30 30    BMI  $8A6A
  0x040A4A $8A3A: C-----  38       SEC  
  0x040A4B $8A3B: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040A4C $8A3C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x040A4D $8A3D: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040A4E $8A3E: C-----  30 30    BMI  $8A70
  0x040A50 $8A40: C-----  00       BRK  
  0x040A51 $8A41: C-----  00       BRK  
  0x040A52 $8A42: C-----  00       BRK  
  0x040A53 $8A43: C-----  00       BRK  
  0x040A54 $8A44: C-----  01 03    ORA  ($03,X)
  0x040A56 $8A46: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x040A57 $8A47: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040A58 $8A48: C-----  00       BRK  
  0x040A59 $8A49: C-----  00       BRK  
  0x040A5A $8A4A: C-----  00       BRK  
  0x040A5B $8A4B: C-----  00       BRK  
  0x040A5C $8A4C: C-----  01 03    ORA  ($03,X)
  0x040A5E $8A4E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x040A5F $8A4F: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040A60 $8A50: C-----  60       RTS  
  0x040A61 $8A51: C-----  60       RTS  
  0x040A62 $8A52: C-----  E0 C0    CPX  #$C0
  0x040A64 $8A54: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x040A65 $8A55: C-----  00       BRK  
  0x040A66 $8A56: C-----  C0 E0    CPY  #$E0
  0x040A68 $8A58: C-----  60       RTS  
  0x040A69 $8A59: C-----  60       RTS  
  0x040A6A $8A5A: C-----  E0 C0    CPX  #$C0
  0x040A6C $8A5C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x040A6D $8A5D: C-----  00       BRK  
  0x040A6E $8A5E: C-----  C0 E0    CPY  #$E0
  0x040A70 $8A60: C-----  00       BRK  
  0x040A71 $8A61: C-----  00       BRK  
  0x040A72 $8A62: C-----  00       BRK  
  0x040A73 $8A63: C-----  00       BRK  
  0x040A74 $8A64: C-----  00       BRK  
  0x040A75 $8A65: C-----  00       BRK  
  0x040A76 $8A66: C-----  00       BRK  
  0x040A77 $8A67: C-----  00       BRK  
  0x040A78 $8A68: C-----  00       BRK  
  0x040A79 $8A69: C-----  00       BRK  
  0x040A7A $8A6A: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040A7B $8A6B: C-----  06 0E    ASL  $0E
  0x040A7D $8A6D: C-----  1E 3E 7D ASL  $7D3E,X
  0x040A80 $8A70: C-----  30 78    BMI  $8AEA
  0x040A82 $8A72: C-----  F8       SED  
  0x040A83 $8A73: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x040A84 $8A74: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x040A85 $8A75: C-----  E8       INX  
  0x040A86 $8A76: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x040A87 $8A77: C-----  38       SEC  
  0x040A88 $8A78: C-----  30 30    BMI  $8AAA
  0x040A8A $8A7A: C-----  00       BRK  
  0x040A8B $8A7B: C-----  00       BRK  
  0x040A8C $8A7C: C-----  00       BRK  
  0x040A8D $8A7D: C-----  00       BRK  
  0x040A8E $8A7E: C-----  00       BRK  
  0x040A8F $8A7F: C-----  00       BRK  
  0x040A90 $8A80: C-----  00       BRK  
  0x040A91 $8A81: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040A92 $8A82: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040A93 $8A83: C-----  00       BRK  
  0x040A94 $8A84: C-----  00       BRK  
  0x040A95 $8A85: C-----  00       BRK  
  0x040A96 $8A86: C-----  00       BRK  
  0x040A97 $8A87: C-----  00       BRK  
  0x040A98 $8A88: C-----  00       BRK  
  0x040A99 $8A89: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040A9A $8A8A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040A9B $8A8B: C-----  00       BRK  
  0x040A9C $8A8C: C-----  00       BRK  
  0x040A9D $8A8D: C-----  00       BRK  
  0x040A9E $8A8E: C-----  00       BRK  
  0x040A9F $8A8F: C-----  00       BRK  
  0x040AA0 $8A90: C-----  00       BRK  
  0x040AA1 $8A91: C-----  00       BRK  
  0x040AA2 $8A92: C-----  00       BRK  
  0x040AA3 $8A93: C-----  00       BRK  
  0x040AA4 $8A94: C-----  00       BRK  
  0x040AA5 $8A95: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040AA6 $8A96: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040AA7 $8A97: C-----  00       BRK  
  0x040AA8 $8A98: C-----  00       BRK  
  0x040AA9 $8A99: C-----  00       BRK  
  0x040AAA $8A9A: C-----  00       BRK  
  0x040AAB $8A9B: C-----  00       BRK  
  0x040AAC $8A9C: C-----  00       BRK  
  0x040AAD $8A9D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040AAE $8A9E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040AAF $8A9F: C-----  00       BRK  
  0x040AB0 $8AA0: C-----  60       RTS  
  0x040AB1 $8AA1: C-----  60       RTS  
  0x040AB2 $8AA2: C-----  60       RTS  
  0x040AB3 $8AA3: C-----  60       RTS  
  0x040AB4 $8AA4: C-----  60       RTS  
  0x040AB5 $8AA5: C-----  60       RTS  
  0x040AB6 $8AA6: C-----  60       RTS  
  0x040AB7 $8AA7: C-----  60       RTS  
  0x040AB8 $8AA8: C-----  60       RTS  
  0x040AB9 $8AA9: C-----  60       RTS  
  0x040ABA $8AAA: C-----  60       RTS  
  0x040ABB $8AAB: C-----  60       RTS  
  0x040ABC $8AAC: C-----  60       RTS  
  0x040ABD $8AAD: C-----  60       RTS  
  0x040ABE $8AAE: C-----  60       RTS  
  0x040ABF $8AAF: C-----  60       RTS  
  0x040AC0 $8AB0: C-----  06 06    ASL  $06
  0x040AC2 $8AB2: C-----  06 06    ASL  $06
  0x040AC4 $8AB4: C-----  06 06    ASL  $06
  0x040AC6 $8AB6: C-----  06 06    ASL  $06
  0x040AC8 $8AB8: C-----  06 06    ASL  $06
  0x040ACA $8ABA: C-----  06 06    ASL  $06
  0x040ACC $8ABC: C-----  06 06    ASL  $06
  0x040ACE $8ABE: C-----  06 06    ASL  $06
  0x040AD0 $8AC0: C-----  00       BRK  
  0x040AD1 $8AC1: C-----  00       BRK  
  0x040AD2 $8AC2: C-----  00       BRK  
  0x040AD3 $8AC3: C-----  00       BRK  
  0x040AD4 $8AC4: C-----  00       BRK  
  0x040AD5 $8AC5: C-----  00       BRK  
  0x040AD6 $8AC6: C-----  00       BRK  
  0x040AD7 $8AC7: C-----  00       BRK  
  0x040AD8 $8AC8: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x040AD9 $8AC9: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x040ADA $8ACA: C-----  E9 F3    SBC  #$F3
  0x040ADC $8ACC: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x040ADD $8ACD: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x040ADE $8ACE: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x040ADF $8ACF: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x040AE0 $8AD0: C-----  00       BRK  
  0x040AE1 $8AD1: C-----  00       BRK  
  0x040AE2 $8AD2: C-----  00       BRK  
  0x040AE3 $8AD3: C-----  00       BRK  
  0x040AE4 $8AD4: C-----  00       BRK  
  0x040AE5 $8AD5: C-----  00       BRK  
  0x040AE6 $8AD6: C-----  00       BRK  
  0x040AE7 $8AD7: C-----  00       BRK  
  0x040AE8 $8AD8: C-----  00       BRK  
  0x040AE9 $8AD9: C-----  00       BRK  
  0x040AEA $8ADA: C-----  01 03    ORA  ($03,X)
  0x040AEC $8ADC: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x040AED $8ADD: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x040AEE $8ADE: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x040AEF $8ADF: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x040AF0 $8AE0: C-----  00       BRK  
  0x040AF1 $8AE1: C-----  00       BRK  
  0x040AF2 $8AE2: C-----  00       BRK  
  0x040AF3 $8AE3: C-----  00       BRK  
  0x040AF4 $8AE4: C-----  00       BRK  
  0x040AF5 $8AE5: C-----  00       BRK  
  0x040AF6 $8AE6: C-----  00       BRK  
  0x040AF7 $8AE7: C-----  00       BRK  
  0x040AF8 $8AE8: C-----  2E 17 2B ROL  $2B17
  0x040AFB $8AEB: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x040AFC $8AEC: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x040AFD $8AED: C-----  15 0A    ORA  $0A,X
  0x040AFF $8AEF: C-----  15 00    ORA  $00,X
  0x040B01 $8AF1: C-----  38       SEC  
  0x040B02 $8AF2: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x040B03 $8AF3: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x040B04 $8AF4: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x040B05 $8AF5: C-----  78       SEI  
  0x040B06 $8AF6: C-----  3D 18 07 AND  $0718,X
  0x040B09 $8AF9: C-----  31 60    AND  ($60),Y
  0x040B0B $8AFB: C-----  60       RTS  
  0x040B0C $8AFC: C-----  00       BRK  
  0x040B0D $8AFD: C-----  00       BRK  
  0x040B0E $8AFE: C-----  00       BRK  
  0x040B0F $8AFF: C-----  00       BRK  
  0x040B10 $8B00: C-----  00       BRK  
  0x040B11 $8B01: C-----  00       BRK  
  0x040B12 $8B02: C-----  00       BRK  
  0x040B13 $8B03: C-----  00       BRK  
  0x040B14 $8B04: C-----  00       BRK  
  0x040B15 $8B05: C-----  00       BRK  
  0x040B16 $8B06: C-----  00       BRK  
  0x040B17 $8B07: C-----  00       BRK  
  0x040B18 $8B08: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x040B19 $8B09: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x040B1A $8B0A: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x040B1B $8B0B: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x040B1C $8B0C: C-----  79 32 05 ADC  $0532,Y
  0x040B1F $8B0F: C-----  1D 6B EB ORA  $EB6B,X
  0x040B22 $8B12: ------  .byte $CD
  0x040B23 $8B13: ------  .byte $1E
  0x040B24 $8B14: ------  .byte $FF
  0x040B25 $8B15: ------  .byte $C1
  0x040B26 $8B16: ------  .byte $C1
  0x040B27 $8B17: ------  .byte $E3
  0x040B28 $8B18: ------  .byte $03
  0x040B29 $8B19: ------  .byte $02
  0x040B2A $8B1A: ------  .byte $10
  0x040B2B $8B1B: ------  .byte $20
  0x040B2C $8B1C: ------  .byte $00
  0x040B2D $8B1D: ------  .byte $00
  0x040B2E $8B1E: ------  .byte $00
  0x040B2F $8B1F: ------  .byte $00
  0x040B30 $8B20: C-----  00       BRK  
  0x040B31 $8B21: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040B32 $8B22: C-----  84 84    STY  $84
  0x040B34 $8B24: C-----  40       RTI  
  0x040B35 $8B25: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x040B36 $8B26: C-----  00       BRK  
  0x040B37 $8B27: C-----  00       BRK  
  0x040B38 $8B28: C-----  00       BRK  
  0x040B39 $8B29: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040B3A $8B2A: C-----  84 84    STY  $84
  0x040B3C $8B2C: C-----  40       RTI  
  0x040B3D $8B2D: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x040B3E $8B2E: C-----  00       BRK  
  0x040B3F $8B2F: C-----  00       BRK  
  0x040B40 $8B30: C-----  00       BRK  
  0x040B41 $8B31: C-----  00       BRK  
  0x040B42 $8B32: C-----  10 20    BPL  $8B54
  0x040B44 $8B34: C-----  41 82    EOR  ($82,X)
  0x040B46 $8B36: C-----  00       BRK  
  0x040B47 $8B37: C-----  08       PHP  
  0x040B48 $8B38: C-----  00       BRK  
  0x040B49 $8B39: C-----  00       BRK  
  0x040B4A $8B3A: C-----  10 20    BPL  $8B5C
  0x040B4C $8B3C: C-----  41 82    EOR  ($82,X)
  0x040B4E $8B3E: C-----  00       BRK  
  0x040B4F $8B3F: C-----  08       PHP  
  0x040B50 $8B40: C-----  00       BRK  
  0x040B51 $8B41: C-----  00       BRK  
  0x040B52 $8B42: C-----  00       BRK  
  0x040B53 $8B43: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040B54 $8B44: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040B55 $8B45: C-----  00       BRK  
  0x040B56 $8B46: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040B57 $8B47: C-----  0A       ASL  A
  0x040B58 $8B48: C-----  00       BRK  
  0x040B59 $8B49: C-----  01 07    ORA  ($07,X)
  0x040B5B $8B4B: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x040B5C $8B4C: C-----  0E 08 0B ASL  $0B08
  0x040B5F $8B4F: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040B60 $8B50: C-----  00       BRK  
  0x040B61 $8B51: C-----  20 30 80 JSR  $8030
  0x040B64 $8B54: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040B65 $8B55: C-----  08       PHP  
  0x040B66 $8B56: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x040B67 $8B57: C-----  2A       ROL  A
  0x040B68 $8B58: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040B69 $8B59: C-----  DE C4 68 DEC  $68C4,X
  0x040B6C $8B5C: C-----  00       BRK  
  0x040B6D $8B5D: C-----  00       BRK  
  0x040B6E $8B5E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040B6F $8B5F: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040B70 $8B60: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x040B71 $8B61: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x040B72 $8B62: C-----  01 02    ORA  ($02,X)
  0x040B74 $8B64: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040B75 $8B65: C-----  01 01    ORA  ($01,X)
  0x040B77 $8B67: C-----  00       BRK  
  0x040B78 $8B68: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040B79 $8B69: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040B7A $8B6A: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040B7B $8B6B: C-----  00       BRK  
  0x040B7C $8B6C: C-----  00       BRK  
  0x040B7D $8B6D: C-----  00       BRK  
  0x040B7E $8B6E: C-----  00       BRK  
  0x040B7F $8B6F: C-----  00       BRK  
  0x040B80 $8B70: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x040B81 $8B71: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x040B82 $8B72: C-----  CD 1E FF CMP  $FF1E
  0x040B85 $8B75: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040B86 $8B76: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x040B87 $8B77: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040B88 $8B78: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040B89 $8B79: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040B8A $8B7A: C-----  10 20    BPL  $8B9C
  0x040B8C $8B7C: C-----  00       BRK  
  0x040B8D $8B7D: C-----  00       BRK  
  0x040B8E $8B7E: C-----  00       BRK  
  0x040B8F $8B7F: C-----  00       BRK  
  0x040B90 $8B80: C-----  00       BRK  
  0x040B91 $8B81: C-----  00       BRK  
  0x040B92 $8B82: C-----  00       BRK  
  0x040B93 $8B83: C-----  00       BRK  
  0x040B94 $8B84: C-----  00       BRK  
  0x040B95 $8B85: C-----  00       BRK  
  0x040B96 $8B86: C-----  2A       ROL  A
  0x040B97 $8B87: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x040B98 $8B88: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x040B99 $8B89: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040B9A $8B8A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040B9B $8B8B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040B9C $8B8C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040B9D $8B8D: C-----  C0 EA    CPY  #$EA
  0x040B9F $8B8F: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x040BA0 $8B90: C-----  00       BRK  
  0x040BA1 $8B91: C-----  00       BRK  
  0x040BA2 $8B92: C-----  00       BRK  
  0x040BA3 $8B93: C-----  00       BRK  
  0x040BA4 $8B94: C-----  00       BRK  
  0x040BA5 $8B95: C-----  00       BRK  
  0x040BA6 $8B96: C-----  00       BRK  
  0x040BA7 $8B97: C-----  00       BRK  
  0x040BA8 $8B98: C-----  00       BRK  
  0x040BA9 $8B99: C-----  C0 E0    CPY  #$E0
  0x040BAB $8B9B: C-----  E0 F0    CPX  #$F0
  0x040BAD $8B9D: C-----  F0 F4    BEQ  $8B93
  0x040BAF $8B9F: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x040BB0 $8BA0: C-----  2A       ROL  A
  0x040BB1 $8BA1: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x040BB2 $8BA2: C-----  2A       ROL  A
  0x040BB3 $8BA3: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x040BB4 $8BA4: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x040BB5 $8BA5: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040BB6 $8BA6: C-----  88       DEY  
  0x040BB7 $8BA7: C-----  C8       INY  
  0x040BB8 $8BA8: C-----  EA       NOP  
  0x040BB9 $8BA9: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x040BBA $8BAA: C-----  EA       NOP  
  0x040BBB $8BAB: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x040BBC $8BAC: C-----  EE DC 68 INC  $68DC
  0x040BBF $8BAF: C-----  08       PHP  
  0x040BC0 $8BB0: C-----  00       BRK  
  0x040BC1 $8BB1: C-----  00       BRK  
  0x040BC2 $8BB2: C-----  00       BRK  
  0x040BC3 $8BB3: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040BC4 $8BB4: C-----  3E 5F 5F ROL  $5F5F,X
  0x040BC7 $8BB7: C-----  1E D4 AA ASL  $AAD4,X
  0x040BCA $8BBA: C-----  41 06    EOR  ($06,X)
  0x040BCC $8BBC: C-----  06 00    ASL  $00
  0x040BCE $8BBE: C-----  00       BRK  
  0x040BCF $8BBF: C-----  00       BRK  
  0x040BD0 $8BC0: C-----  00       BRK  
  0x040BD1 $8BC1: C-----  00       BRK  
  0x040BD2 $8BC2: C-----  00       BRK  
  0x040BD3 $8BC3: C-----  00       BRK  
  0x040BD4 $8BC4: C-----  00       BRK  
  0x040BD5 $8BC5: C-----  00       BRK  
  0x040BD6 $8BC6: C-----  00       BRK  
  0x040BD7 $8BC7: C-----  00       BRK  
  0x040BD8 $8BC8: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040BD9 $8BC9: C-----  0A       ASL  A
  0x040BDA $8BCA: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x040BDB $8BCB: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x040BDC $8BCC: C-----  19 3E 3C ORA  $3C3E,Y
  0x040BDF $8BCF: C-----  3E 7E 98 ROL  $987E,X
  0x040BE2 $8BD2: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040BE3 $8BD3: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040BE4 $8BD4: C-----  36 00    ROL  $00,X
  0x040BE6 $8BD6: C-----  3E 34 01 ROL  $0134,X
  0x040BE9 $8BD9: C-----  84 63    STY  $63
  0x040BEB $8BDB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040BEC $8BDC: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x040BED $8BDD: C-----  C1 FE    CMP  ($FE,X)
  0x040BEF $8BDF: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x040BF0 $8BE0: C-----  00       BRK  
  0x040BF1 $8BE1: C-----  00       BRK  
  0x040BF2 $8BE2: C-----  00       BRK  
  0x040BF3 $8BE3: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040BF4 $8BE4: C-----  3E 7D 7D ROL  $7D7D,X
  0x040BF7 $8BE7: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x040BF8 $8BE8: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x040BF9 $8BE9: C-----  55 22    EOR  $22,X
  0x040BFB $8BEB: C-----  50 30    BVC  $8C1D
  0x040BFD $8BED: C-----  00       BRK  
  0x040BFE $8BEE: C-----  00       BRK  
  0x040BFF $8BEF: C-----  00       BRK  
  0x040C00 $8BF0: C-----  2A       ROL  A
  0x040C01 $8BF1: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x040C02 $8BF2: C-----  2A       ROL  A
  0x040C03 $8BF3: C-----  20 22 18 JSR  $1822
  0x040C06 $8BF6: C-----  08       PHP  
  0x040C07 $8BF7: C-----  08       PHP  
  0x040C08 $8BF8: C-----  EA       NOP  
  0x040C09 $8BF9: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x040C0A $8BFA: C-----  AA       TAX  
  0x040C0B $8BFB: C-----  60       RTS  
  0x040C0C $8BFC: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x040C0D $8BFD: C-----  58       CLI  
  0x040C0E $8BFE: C-----  28       PLP  
  0x040C0F $8BFF: C-----  58       CLI  
  0x040C10 $8C00: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C11 $8C01: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C12 $8C02: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C13 $8C03: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C14 $8C04: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C15 $8C05: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C16 $8C06: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C17 $8C07: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C18 $8C08: C-----  00       BRK  
  0x040C19 $8C09: C-----  00       BRK  
  0x040C1A $8C0A: C-----  00       BRK  
  0x040C1B $8C0B: C-----  00       BRK  
  0x040C1C $8C0C: C-----  01 03    ORA  ($03,X)
  0x040C1E $8C0E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x040C1F $8C0F: C-----  0E FF FF ASL  $FFFF
  0x040C22 $8C12: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C23 $8C13: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C24 $8C14: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C25 $8C15: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C26 $8C16: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C27 $8C17: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C28 $8C18: C-----  00       BRK  
  0x040C29 $8C19: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x040C2A $8C1A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040C2B $8C1B: C-----  F8       SED  
  0x040C2C $8C1C: C-----  C0 80    CPY  #$80
  0x040C2E $8C1E: C-----  00       BRK  
  0x040C2F $8C1F: C-----  00       BRK  
  0x040C30 $8C20: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C31 $8C21: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C32 $8C22: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C33 $8C23: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C34 $8C24: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C35 $8C25: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C36 $8C26: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C37 $8C27: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C38 $8C28: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040C39 $8C29: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040C3A $8C2A: C-----  18       CLC  
  0x040C3B $8C2B: C-----  38       SEC  
  0x040C3C $8C2C: C-----  30 30    BMI  $8C5E
  0x040C3E $8C2E: C-----  30 30    BMI  $8C60
  0x040C40 $8C30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C41 $8C31: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C42 $8C32: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C43 $8C33: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C44 $8C34: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C45 $8C35: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C46 $8C36: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C47 $8C37: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C48 $8C38: C-----  00       BRK  
  0x040C49 $8C39: C-----  00       BRK  
  0x040C4A $8C3A: C-----  00       BRK  
  0x040C4B $8C3B: C-----  00       BRK  
  0x040C4C $8C3C: C-----  00       BRK  
  0x040C4D $8C3D: C-----  00       BRK  
  0x040C4E $8C3E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C4F $8C3F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C50 $8C40: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C51 $8C41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C52 $8C42: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C53 $8C43: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C54 $8C44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C55 $8C45: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C56 $8C46: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C57 $8C47: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C58 $8C48: C-----  C0 FC    CPY  #$FC
  0x040C5A $8C4A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C5B $8C4B: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x040C5C $8C4C: C-----  C0 C0    CPY  #$C0
  0x040C5E $8C4E: C-----  C0 C0    CPY  #$C0
  0x040C60 $8C50: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C61 $8C51: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C62 $8C52: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C63 $8C53: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C64 $8C54: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C65 $8C55: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C66 $8C56: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C67 $8C57: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C68 $8C58: C-----  00       BRK  
  0x040C69 $8C59: C-----  00       BRK  
  0x040C6A $8C5A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x040C6B $8C5B: C-----  C0 E0    CPY  #$E0
  0x040C6D $8C5D: C-----  70 38    BVS  $8C97
  0x040C6F $8C5F: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040C70 $8C60: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C71 $8C61: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C72 $8C62: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C73 $8C63: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C74 $8C64: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C75 $8C65: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C76 $8C66: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C77 $8C67: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C78 $8C68: C-----  C0 C0    CPY  #$C0
  0x040C7A $8C6A: C-----  C0 C0    CPY  #$C0
  0x040C7C $8C6C: C-----  C0 C0    CPY  #$C0
  0x040C7E $8C6E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C7F $8C6F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C80 $8C70: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C81 $8C71: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C82 $8C72: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C83 $8C73: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C84 $8C74: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C85 $8C75: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C86 $8C76: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C87 $8C77: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C88 $8C78: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040C89 $8C79: C-----  0E 06 07 ASL  $0706
  0x040C8C $8C7C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040C8D $8C7D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040C8E $8C7E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040C8F $8C7F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040C90 $8C80: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C91 $8C81: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C92 $8C82: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C93 $8C83: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C94 $8C84: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C95 $8C85: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C96 $8C86: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C97 $8C87: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040C98 $8C88: C-----  30 30    BMI  $8CBA
  0x040C9A $8C8A: C-----  30 30    BMI  $8CBC
  0x040C9C $8C8C: C-----  38       SEC  
  0x040C9D $8C8D: C-----  18       CLC  
  0x040C9E $8C8E: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040C9F $8C8F: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040CA0 $8C90: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CA1 $8C91: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CA2 $8C92: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CA3 $8C93: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CA4 $8C94: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CA5 $8C95: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CA6 $8C96: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CA7 $8C97: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CA8 $8C98: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CA9 $8C99: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CAA $8C9A: C-----  C0 C0    CPY  #$C0
  0x040CAC $8C9C: C-----  C0 C0    CPY  #$C0
  0x040CAE $8C9E: C-----  C0 C0    CPY  #$C0
  0x040CB0 $8CA0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CB1 $8CA1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CB2 $8CA2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CB3 $8CA3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CB4 $8CA4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CB5 $8CA5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CB6 $8CA6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CB7 $8CA7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CB8 $8CA8: C-----  0E 07 03 ASL  $0307
  0x040CBB $8CAB: C-----  01 00    ORA  ($00,X)
  0x040CBD $8CAD: C-----  00       BRK  
  0x040CBE $8CAE: C-----  00       BRK  
  0x040CBF $8CAF: C-----  00       BRK  
  0x040CC0 $8CB0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CC1 $8CB1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CC2 $8CB2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CC3 $8CB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CC4 $8CB4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CC5 $8CB5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CC6 $8CB6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CC7 $8CB7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CC8 $8CB8: C-----  00       BRK  
  0x040CC9 $8CB9: C-----  00       BRK  
  0x040CCA $8CBA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x040CCB $8CBB: C-----  C0 F8    CPY  #$F8
  0x040CCD $8CBD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040CCE $8CBE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x040CCF $8CBF: C-----  00       BRK  
  0x040CD0 $8CC0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CD1 $8CC1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CD2 $8CC2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CD3 $8CC3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CD4 $8CC4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CD5 $8CC5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CD6 $8CC6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CD7 $8CC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CD8 $8CC8: C-----  C0 C0    CPY  #$C0
  0x040CDA $8CCA: C-----  C0 C0    CPY  #$C0
  0x040CDC $8CCC: C-----  C0 C0    CPY  #$C0
  0x040CDE $8CCE: C-----  C0 C0    CPY  #$C0
  0x040CE0 $8CD0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CE1 $8CD1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CE2 $8CD2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CE3 $8CD3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CE4 $8CD4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CE5 $8CD5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CE6 $8CD6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CE7 $8CD7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CE8 $8CD8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040CE9 $8CD9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040CEA $8CDA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040CEB $8CDB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040CEC $8CDC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x040CED $8CDD: C-----  06 0E    ASL  $0E
  0x040CEF $8CDF: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040CF0 $8CE0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CF1 $8CE1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CF2 $8CE2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CF3 $8CE3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CF4 $8CE4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CF5 $8CE5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CF6 $8CE6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CF7 $8CE7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CF8 $8CE8: C-----  C0 C0    CPY  #$C0
  0x040CFA $8CEA: C-----  C0 C0    CPY  #$C0
  0x040CFC $8CEC: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x040CFD $8CED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040CFE $8CEE: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x040CFF $8CEF: C-----  C0 FF    CPY  #$FF
  0x040D01 $8CF1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040D02 $8CF2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040D03 $8CF3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040D04 $8CF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040D05 $8CF5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040D06 $8CF6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040D07 $8CF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040D08 $8CF8: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040D09 $8CF9: C-----  38       SEC  
  0x040D0A $8CFA: C-----  70 E0    BVS  $8CDC
  0x040D0C $8CFC: C-----  C0 80    CPY  #$80
  0x040D0E $8CFE: C-----  00       BRK  
  0x040D0F $8CFF: C-----  00       BRK  
  0x040D10 $8D00: C-----  C0 C0    CPY  #$C0
  0x040D12 $8D02: C-----  C0 C0    CPY  #$C0
  0x040D14 $8D04: C-----  C0 C0    CPY  #$C0
  0x040D16 $8D06: C-----  C0 C0    CPY  #$C0
  0x040D18 $8D08: C-----  C0 C0    CPY  #$C0
  0x040D1A $8D0A: C-----  C0 C0    CPY  #$C0
  0x040D1C $8D0C: C-----  C0 C0    CPY  #$C0
  0x040D1E $8D0E: C-----  C0 C0    CPY  #$C0
  0x040D20 $8D10: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x040D21 $8D11: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x040D22 $8D12: C-----  01 03    ORA  ($03,X)
  0x040D24 $8D14: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040D25 $8D15: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040D26 $8D16: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040D27 $8D17: C-----  01 02    ORA  ($02,X)
  0x040D29 $8D19: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040D2A $8D1A: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040D2B $8D1B: C-----  00       BRK  
  0x040D2C $8D1C: C-----  00       BRK  
  0x040D2D $8D1D: C-----  00       BRK  
  0x040D2E $8D1E: C-----  00       BRK  
  0x040D2F $8D1F: C-----  00       BRK  
  0x040D30 $8D20: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040D31 $8D21: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040D32 $8D22: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040D33 $8D23: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040D34 $8D24: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040D35 $8D25: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040D36 $8D26: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040D37 $8D27: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040D38 $8D28: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040D39 $8D29: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040D3A $8D2A: C-----  00       BRK  
  0x040D3B $8D2B: C-----  00       BRK  
  0x040D3C $8D2C: C-----  00       BRK  
  0x040D3D $8D2D: C-----  00       BRK  
  0x040D3E $8D2E: C-----  00       BRK  
  0x040D3F $8D2F: C-----  00       BRK  
  0x040D40 $8D30: C-----  3E 3E 1C ROL  $1C3E,X
  0x040D43 $8D33: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x040D44 $8D34: C-----  00       BRK  
  0x040D45 $8D35: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040D46 $8D36: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040D47 $8D37: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040D48 $8D38: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x040D49 $8D39: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x040D4A $8D3A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x040D4B $8D3B: C-----  C0 C0    CPY  #$C0
  0x040D4D $8D3D: C-----  EA       NOP  
  0x040D4E $8D3E: C-----  9A       TXS  
  0x040D4F $8D3F: C-----  3D AA AA AND  $AAAA,X
  0x040D52 $8D42: C-----  CD 1E 00 CMP  $001E
  0x040D55 $8D45: C-----  00       BRK  
  0x040D56 $8D46: C-----  00       BRK  
  0x040D57 $8D47: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x040D58 $8D48: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040D59 $8D49: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040D5A $8D4A: C-----  10 20    BPL  $8D6C
  0x040D5C $8D4C: C-----  00       BRK  
  0x040D5D $8D4D: C-----  38       SEC  
  0x040D5E $8D4E: C-----  6C 6C AC JMP  ($AC6C)
  0x040D61 $8D51: C-----  A8       TAY  
  0x040D62 $8D52: C-----  C0 60    CPY  #$60
  0x040D64 $8D54: C-----  20 20 60 JSR  $6020
  0x040D67 $8D57: C-----  C0 00    CPY  #$00
  0x040D69 $8D59: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040D6A $8D5A: C-----  18       CLC  
  0x040D6B $8D5B: C-----  00       BRK  
  0x040D6C $8D5C: C-----  00       BRK  
  0x040D6D $8D5D: C-----  00       BRK  
  0x040D6E $8D5E: C-----  00       BRK  
  0x040D6F $8D5F: C-----  00       BRK  
  0x040D70 $8D60: C-----  56 30    LSR  $30,X
  0x040D72 $8D62: C-----  69 D5    ADC  #$D5
  0x040D74 $8D64: C-----  6A       ROR  A
  0x040D75 $8D65: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x040D76 $8D66: C-----  0E 3F 11 ASL  $113F
  0x040D79 $8D69: C-----  30 69    BMI  $8DD4
  0x040D7B $8D6B: C-----  D5 6A    CMP  $6A,X
  0x040D7D $8D6D: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x040D7E $8D6E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x040D7F $8D6F: C-----  00       BRK  
  0x040D80 $8D70: C-----  AA       TAX  
  0x040D81 $8D71: C-----  AA       TAX  
  0x040D82 $8D72: C-----  CD 1E 00 CMP  $001E
  0x040D85 $8D75: C-----  00       BRK  
  0x040D86 $8D76: C-----  00       BRK  
  0x040D87 $8D77: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x040D88 $8D78: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040D89 $8D79: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040D8A $8D7A: C-----  10 20    BPL  $8D9C
  0x040D8C $8D7C: C-----  00       BRK  
  0x040D8D $8D7D: C-----  0E 1B 1B ASL  $1B1B
  0x040D90 $8D80: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x040D91 $8D81: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x040D92 $8D82: C-----  CD 1E E3 CMP  $E31E
  0x040D95 $8D85: C-----  C1 C1    CMP  ($C1,X)
  0x040D97 $8D87: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x040D98 $8D88: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040D99 $8D89: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040D9A $8D8A: C-----  10 20    BPL  $8DAC
  0x040D9C $8D8C: C-----  00       BRK  
  0x040D9D $8D8D: C-----  00       BRK  
  0x040D9E $8D8E: C-----  00       BRK  
  0x040D9F $8D8F: C-----  00       BRK  
  0x040DA0 $8D90: C-----  AA       TAX  
  0x040DA1 $8D91: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x040DA2 $8D92: C-----  CD 1E FF CMP  $FF1E
  0x040DA5 $8D95: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040DA6 $8D96: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x040DA7 $8D97: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040DA8 $8D98: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x040DA9 $8D99: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x040DAA $8D9A: C-----  10 20    BPL  $8DBC
  0x040DAC $8D9C: C-----  00       BRK  
  0x040DAD $8D9D: C-----  00       BRK  
  0x040DAE $8D9E: C-----  00       BRK  
  0x040DAF $8D9F: C-----  00       BRK  
  0x040DB0 $8DA0: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x040DB1 $8DA1: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x040DB2 $8DA2: C-----  CD 1E FF CMP  $FF1E
  0x040DB5 $8DA5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040DB6 $8DA6: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x040DB7 $8DA7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040DB8 $8DA8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040DB9 $8DA9: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040DBA $8DAA: C-----  10 20    BPL  $8DCC
  0x040DBC $8DAC: C-----  00       BRK  
  0x040DBD $8DAD: C-----  00       BRK  
  0x040DBE $8DAE: C-----  00       BRK  
  0x040DBF $8DAF: C-----  00       BRK  
  0x040DC0 $8DB0: C-----  AA       TAX  
  0x040DC1 $8DB1: C-----  AA       TAX  
  0x040DC2 $8DB2: C-----  CD 1E FF CMP  $FF1E
  0x040DC5 $8DB5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x040DC6 $8DB6: C-----  C1 FF    CMP  ($FF,X)
  0x040DC8 $8DB8: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040DC9 $8DB9: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040DCA $8DBA: C-----  10 20    BPL  $8DDC
  0x040DCC $8DBC: C-----  00       BRK  
  0x040DCD $8DBD: C-----  00       BRK  
  0x040DCE $8DBE: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040DCF $8DBF: C-----  00       BRK  
  0x040DD0 $8DC0: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x040DD1 $8DC1: C-----  19 19 1F ORA  $1F19,Y
  0x040DD4 $8DC4: C-----  10 40    BPL  $8E06
  0x040DD6 $8DC6: C-----  B9 BC 0F LDA  $0FBC,Y
  0x040DD9 $8DC9: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x040DDA $8DCA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x040DDB $8DCB: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x040DDC $8DCC: C-----  00       BRK  
  0x040DDD $8DCD: C-----  00       BRK  
  0x040DDE $8DCE: C-----  01 00    ORA  ($00,X)
  0x040DE0 $8DD0: C-----  18       CLC  
  0x040DE1 $8DD1: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040DE2 $8DD2: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x040DE3 $8DD3: C-----  15 0A    ORA  $0A,X
  0x040DE5 $8DD5: C-----  20 5D 6C JSR  $6C5D
  0x040DE8 $8DD8: C-----  10 1D    BPL  $8DF7
  0x040DEA $8DDA: C-----  1D 1D 0A ORA  $0A1D,X
  0x040DED $8DDD: C-----  00       BRK  
  0x040DEE $8DDE: C-----  01 00    ORA  ($00,X)
  0x040DF0 $8DE0: C-----  F8       SED  
  0x040DF1 $8DE1: C-----  98       TYA  
  0x040DF2 $8DE2: C-----  98       TYA  
  0x040DF3 $8DE3: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x040DF4 $8DE4: C-----  0A       ASL  A
  0x040DF5 $8DE5: C-----  20 6D 6C JSR  $6C6D
  0x040DF8 $8DE8: C-----  F0 F1    BEQ  $8DDB
  0x040DFA $8DEA: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x040DFB $8DEB: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x040DFC $8DEC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040DFD $8DED: C-----  00       BRK  
  0x040DFE $8DEE: C-----  01 00    ORA  ($00,X)
  0x040E00 $8DF0: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x040E01 $8DF1: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x040E02 $8DF2: C-----  79 02 03 ADC  $0302,Y
  0x040E05 $8DF5: C-----  01 01    ORA  ($01,X)
  0x040E07 $8DF7: C-----  00       BRK  
  0x040E08 $8DF8: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040E09 $8DF9: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040E0A $8DFA: C-----  00       BRK  
  0x040E0B $8DFB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x040E0C $8DFC: C-----  F0 F0    BEQ  $8DEE
  0x040E0E $8DFE: C-----  F0 F0    BEQ  $8DF0
  0x040E10 $8E00: C-----  00       BRK  
  0x040E11 $8E01: C-----  00       BRK  
  0x040E12 $8E02: C-----  00       BRK  
  0x040E13 $8E03: C-----  E0 E0    CPX  #$E0
  0x040E15 $8E05: C-----  00       BRK  
  0x040E16 $8E06: C-----  E0 28    CPX  #$28
  0x040E18 $8E08: C-----  00       BRK  
  0x040E19 $8E09: C-----  A0 00    LDY  #$00
  0x040E1B $8E0B: C-----  18       CLC  
  0x040E1C $8E0C: C-----  10 18    BPL  $8E26
  0x040E1E $8E0E: C-----  00       BRK  
  0x040E1F $8E0F: C-----  00       BRK  
  0x040E20 $8E10: C-----  00       BRK  
  0x040E21 $8E11: C-----  00       BRK  
  0x040E22 $8E12: C-----  00       BRK  
  0x040E23 $8E13: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040E24 $8E14: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040E25 $8E15: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x040E26 $8E16: C-----  45 6C    EOR  $6C
  0x040E28 $8E18: C-----  00       BRK  
  0x040E29 $8E19: C-----  01 07    ORA  ($07,X)
  0x040E2B $8E1B: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x040E2C $8E1C: C-----  0A       ASL  A
  0x040E2D $8E1D: C-----  00       BRK  
  0x040E2E $8E1E: C-----  01 00    ORA  ($00,X)
  0x040E30 $8E20: C-----  6C E8 C0 JMP  ($C0E8)
  0x040E33 $8E23: C-----  00       BRK  
  0x040E34 $8E24: C-----  C0 C0    CPY  #$C0
  0x040E36 $8E26: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x040E37 $8E27: C-----  00       BRK  
  0x040E38 $8E28: C-----  00       BRK  
  0x040E39 $8E29: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040E3A $8E2A: C-----  18       CLC  
  0x040E3B $8E2B: C-----  20 20 00 JSR  $0020
  0x040E3E $8E2E: C-----  40       RTI  
  0x040E3F $8E2F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x040E40 $8E30: C-----  2A       ROL  A
  0x040E41 $8E31: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x040E42 $8E32: C-----  ED DC 65 SBC  $65DC
  0x040E45 $8E35: C-----  6D 39 00 ADC  $0039
  0x040E48 $8E38: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040E49 $8E39: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040E4A $8E3A: C-----  00       BRK  
  0x040E4B $8E3B: C-----  00       BRK  
  0x040E4C $8E3C: C-----  00       BRK  
  0x040E4D $8E3D: C-----  00       BRK  
  0x040E4E $8E3E: C-----  00       BRK  
  0x040E4F $8E3F: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040E50 $8E40: C-----  00       BRK  
  0x040E51 $8E41: C-----  20 30 80 JSR  $8030
  0x040E54 $8E44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040E55 $8E45: C-----  08       PHP  
  0x040E56 $8E46: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x040E57 $8E47: C-----  AA       TAX  
  0x040E58 $8E48: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040E59 $8E49: C-----  DE C4 68 DEC  $68C4,X
  0x040E5C $8E4C: C-----  00       BRK  
  0x040E5D $8E4D: C-----  00       BRK  
  0x040E5E $8E4E: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x040E5F $8E4F: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x040E60 $8E50: C-----  00       BRK  
  0x040E61 $8E51: C-----  00       BRK  
  0x040E62 $8E52: C-----  00       BRK  
  0x040E63 $8E53: C-----  E0 E0    CPX  #$E0
  0x040E65 $8E55: C-----  00       BRK  
  0x040E66 $8E56: C-----  60       RTS  
  0x040E67 $8E57: C-----  A8       TAY  
  0x040E68 $8E58: C-----  00       BRK  
  0x040E69 $8E59: C-----  A0 00    LDY  #$00
  0x040E6B $8E5B: C-----  18       CLC  
  0x040E6C $8E5C: C-----  10 18    BPL  $8E76
  0x040E6E $8E5E: C-----  00       BRK  
  0x040E6F $8E5F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x040E70 $8E60: C-----  AA       TAX  
  0x040E71 $8E61: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x040E72 $8E62: C-----  CD 1E FF CMP  $FF1E
  0x040E75 $8E65: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040E76 $8E66: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x040E77 $8E67: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040E78 $8E68: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x040E79 $8E69: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x040E7A $8E6A: C-----  10 20    BPL  $8E8C
  0x040E7C $8E6C: C-----  00       BRK  
  0x040E7D $8E6D: C-----  00       BRK  
  0x040E7E $8E6E: C-----  00       BRK  
  0x040E7F $8E6F: C-----  00       BRK  
  0x040E80 $8E70: C-----  EC E8 C0 CPX  $C0E8
  0x040E83 $8E73: C-----  00       BRK  
  0x040E84 $8E74: C-----  C0 C0    CPY  #$C0
  0x040E86 $8E76: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x040E87 $8E77: C-----  00       BRK  
  0x040E88 $8E78: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x040E89 $8E79: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040E8A $8E7A: C-----  18       CLC  
  0x040E8B $8E7B: C-----  20 20 00 JSR  $0020
  0x040E8E $8E7E: C-----  40       RTI  
  0x040E8F $8E7F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x040E90 $8E80: C-----  00       BRK  
  0x040E91 $8E81: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x040E92 $8E82: C-----  00       BRK  
  0x040E93 $8E83: C-----  00       BRK  
  0x040E94 $8E84: C-----  00       BRK  
  0x040E95 $8E85: C-----  00       BRK  
  0x040E96 $8E86: C-----  00       BRK  
  0x040E97 $8E87: C-----  00       BRK  
  0x040E98 $8E88: C-----  40       RTI  
  0x040E99 $8E89: C-----  A8       TAY  
  0x040E9A $8E8A: C-----  40       RTI  
  0x040E9B $8E8B: C-----  E8       INX  
  0x040E9C $8E8C: C-----  C4 CA    CPY  $CA
  0x040E9E $8E8E: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x040E9F $8E8F: C-----  8A       TXA  
  0x040EA0 $8E90: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x040EA1 $8E91: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x040EA2 $8E92: C-----  01 02    ORA  ($02,X)
  0x040EA4 $8E94: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040EA5 $8E95: C-----  01 01    ORA  ($01,X)
  0x040EA7 $8E97: C-----  00       BRK  
  0x040EA8 $8E98: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040EA9 $8E99: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040EAA $8E9A: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040EAB $8E9B: C-----  00       BRK  
  0x040EAC $8E9C: C-----  00       BRK  
  0x040EAD $8E9D: C-----  00       BRK  
  0x040EAE $8E9E: C-----  00       BRK  
  0x040EAF $8E9F: C-----  00       BRK  
  0x040EB0 $8EA0: C-----  00       BRK  
  0x040EB1 $8EA1: C-----  00       BRK  
  0x040EB2 $8EA2: C-----  00       BRK  
  0x040EB3 $8EA3: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040EB4 $8EA4: C-----  3E 5F 5F ROL  $5F5F,X
  0x040EB7 $8EA7: C-----  1E 34 0A ASL  $0A34,X
  0x040EBA $8EAA: C-----  01 06    ORA  ($06,X)
  0x040EBC $8EAC: C-----  06 00    ASL  $00
  0x040EBE $8EAE: C-----  00       BRK  
  0x040EBF $8EAF: C-----  00       BRK  
  0x040EC0 $8EB0: C-----  00       BRK  
  0x040EC1 $8EB1: C-----  00       BRK  
  0x040EC2 $8EB2: C-----  00       BRK  
  0x040EC3 $8EB3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040EC4 $8EB4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040EC5 $8EB5: C-----  00       BRK  
  0x040EC6 $8EB6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040EC7 $8EB7: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x040EC8 $8EB8: C-----  00       BRK  
  0x040EC9 $8EB9: C-----  01 07    ORA  ($07,X)
  0x040ECB $8EBB: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x040ECC $8EBC: C-----  0E 08 0B ASL  $0B08
  0x040ECF $8EBF: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040ED0 $8EC0: C-----  AA       TAX  
  0x040ED1 $8EC1: C-----  AA       TAX  
  0x040ED2 $8EC2: C-----  CD 1E FF CMP  $FF1E
  0x040ED5 $8EC5: C-----  C1 FF    CMP  ($FF,X)
  0x040ED7 $8EC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040ED8 $8EC8: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040ED9 $8EC9: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040EDA $8ECA: C-----  10 20    BPL  $8EEC
  0x040EDC $8ECC: C-----  00       BRK  
  0x040EDD $8ECD: C-----  00       BRK  
  0x040EDE $8ECE: C-----  00       BRK  
  0x040EDF $8ECF: C-----  00       BRK  
  0x040EE0 $8ED0: C-----  AC A8 C0 LDY  $C0A8
  0x040EE3 $8ED3: C-----  00       BRK  
  0x040EE4 $8ED4: C-----  C0 C0    CPY  #$C0
  0x040EE6 $8ED6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x040EE7 $8ED7: C-----  00       BRK  
  0x040EE8 $8ED8: C-----  00       BRK  
  0x040EE9 $8ED9: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040EEA $8EDA: C-----  18       CLC  
  0x040EEB $8EDB: C-----  20 20 00 JSR  $0020
  0x040EEE $8EDE: C-----  40       RTI  
  0x040EEF $8EDF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x040EF0 $8EE0: C-----  00       BRK  
  0x040EF1 $8EE1: C-----  20 30 80 JSR  $8030
  0x040EF4 $8EE4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040EF5 $8EE5: C-----  08       PHP  
  0x040EF6 $8EE6: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x040EF7 $8EE7: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x040EF8 $8EE8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x040EF9 $8EE9: C-----  DE C4 68 DEC  $68C4,X
  0x040EFC $8EEC: C-----  00       BRK  
  0x040EFD $8EED: C-----  00       BRK  
  0x040EFE $8EEE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040EFF $8EEF: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040F00 $8EF0: C-----  00       BRK  
  0x040F01 $8EF1: C-----  00       BRK  
  0x040F02 $8EF2: C-----  00       BRK  
  0x040F03 $8EF3: C-----  E0 80    CPX  #$80
  0x040F05 $8EF5: C-----  00       BRK  
  0x040F06 $8EF6: C-----  60       RTS  
  0x040F07 $8EF7: C-----  68       PLA  
  0x040F08 $8EF8: C-----  00       BRK  
  0x040F09 $8EF9: C-----  A0 00    LDY  #$00
  0x040F0B $8EFB: C-----  18       CLC  
  0x040F0C $8EFC: C-----  10 18    BPL  $8F16
  0x040F0E $8EFE: C-----  00       BRK  
  0x040F0F $8EFF: C-----  00       BRK  
  0x040F10 $8F00: C-----  AA       TAX  
  0x040F11 $8F01: C-----  AA       TAX  
  0x040F12 $8F02: C-----  CD 1E 00 CMP  $001E
  0x040F15 $8F05: C-----  00       BRK  
  0x040F16 $8F06: C-----  81 C1    STA  ($C1,X)
  0x040F18 $8F08: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040F19 $8F09: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040F1A $8F0A: C-----  10 20    BPL  $8F2C
  0x040F1C $8F0C: C-----  00       BRK  
  0x040F1D $8F0D: C-----  00       BRK  
  0x040F1E $8F0E: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040F1F $8F0F: C-----  3E 6B EB ROL  $EB6B,X
  0x040F22 $8F12: C-----  CD 1E FF CMP  $FF1E
  0x040F25 $8F15: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x040F26 $8F16: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x040F27 $8F17: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x040F28 $8F18: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040F29 $8F19: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040F2A $8F1A: C-----  10 20    BPL  $8F3C
  0x040F2C $8F1C: C-----  00       BRK  
  0x040F2D $8F1D: C-----  00       BRK  
  0x040F2E $8F1E: C-----  00       BRK  
  0x040F2F $8F1F: C-----  00       BRK  
  0x040F30 $8F20: C-----  AA       TAX  
  0x040F31 $8F21: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x040F32 $8F22: C-----  CD 1E FF CMP  $FF1E
  0x040F35 $8F25: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x040F36 $8F26: C-----  C1 C1    CMP  ($C1,X)
  0x040F38 $8F28: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x040F39 $8F29: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x040F3A $8F2A: C-----  10 20    BPL  $8F4C
  0x040F3C $8F2C: C-----  00       BRK  
  0x040F3D $8F2D: C-----  00       BRK  
  0x040F3E $8F2E: C-----  00       BRK  
  0x040F3F $8F2F: C-----  00       BRK  
  0x040F40 $8F30: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x040F41 $8F31: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x040F42 $8F32: C-----  CD 1E FF CMP  $FF1E
  0x040F45 $8F35: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x040F46 $8F36: C-----  AA       TAX  
  0x040F47 $8F37: C-----  AA       TAX  
  0x040F48 $8F38: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x040F49 $8F39: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040F4A $8F3A: C-----  10 20    BPL  $8F5C
  0x040F4C $8F3C: C-----  00       BRK  
  0x040F4D $8F3D: C-----  2A       ROL  A
  0x040F4E $8F3E: C-----  2A       ROL  A
  0x040F4F $8F3F: C-----  2A       ROL  A
  0x040F50 $8F40: C-----  00       BRK  
  0x040F51 $8F41: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x040F52 $8F42: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x040F53 $8F43: C-----  6D 2B 30 ADC  $302B
  0x040F56 $8F46: C-----  ED DC 00 SBC  $00DC
  0x040F59 $8F49: C-----  01 01    ORA  ($01,X)
  0x040F5B $8F4B: C-----  01 02    ORA  ($02,X)
  0x040F5D $8F4D: C-----  00       BRK  
  0x040F5E $8F4E: C-----  01 00    ORA  ($00,X)
  0x040F60 $8F50: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x040F61 $8F51: C-----  6C 39 00 JMP  ($0039)
  0x040F64 $8F54: C-----  01 01    ORA  ($01,X)
  0x040F66 $8F56: C-----  01 00    ORA  ($00,X)
  0x040F68 $8F58: C-----  00       BRK  
  0x040F69 $8F59: C-----  00       BRK  
  0x040F6A $8F5A: C-----  00       BRK  
  0x040F6B $8F5B: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x040F6C $8F5C: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x040F6D $8F5D: C-----  78       SEI  
  0x040F6E $8F5E: C-----  78       SEI  
  0x040F6F $8F5F: C-----  78       SEI  
  0x040F70 $8F60: C-----  00       BRK  
  0x040F71 $8F61: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040F72 $8F62: C-----  2A       ROL  A
  0x040F73 $8F63: C-----  7D 5A 71 ADC  $715A,X
  0x040F76 $8F66: C-----  2A       ROL  A
  0x040F77 $8F67: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x040F78 $8F68: C-----  00       BRK  
  0x040F79 $8F69: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040F7A $8F6A: C-----  2A       ROL  A
  0x040F7B $8F6B: C-----  7D 5A 71 ADC  $715A,X
  0x040F7E $8F6E: C-----  2A       ROL  A
  0x040F7F $8F6F: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x040F80 $8F70: C-----  AA       TAX  
  0x040F81 $8F71: C-----  AA       TAX  
  0x040F82 $8F72: C-----  CD 1E FF CMP  $FF1E
  0x040F85 $8F75: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x040F86 $8F76: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x040F87 $8F77: C-----  C1 02    CMP  ($02,X)
  0x040F89 $8F79: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x040F8A $8F7A: C-----  10 20    BPL  $8F9C
  0x040F8C $8F7C: C-----  00       BRK  
  0x040F8D $8F7D: C-----  00       BRK  
  0x040F8E $8F7E: C-----  08       PHP  
  0x040F8F $8F7F: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x040F90 $8F80: C-----  00       BRK  
  0x040F91 $8F81: C-----  00       BRK  
  0x040F92 $8F82: C-----  00       BRK  
  0x040F93 $8F83: C-----  00       BRK  
  0x040F94 $8F84: C-----  00       BRK  
  0x040F95 $8F85: C-----  00       BRK  
  0x040F96 $8F86: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040F97 $8F87: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040F98 $8F88: C-----  00       BRK  
  0x040F99 $8F89: C-----  00       BRK  
  0x040F9A $8F8A: C-----  00       BRK  
  0x040F9B $8F8B: C-----  00       BRK  
  0x040F9C $8F8C: C-----  00       BRK  
  0x040F9D $8F8D: C-----  00       BRK  
  0x040F9E $8F8E: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040F9F $8F8F: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x040FA0 $8F90: C-----  00       BRK  
  0x040FA1 $8F91: C-----  00       BRK  
  0x040FA2 $8F92: C-----  1E 06 0C ASL  $0C06,X
  0x040FA5 $8F95: C-----  18       CLC  
  0x040FA6 $8F96: C-----  1E 00 00 ASL  $0000,X
  0x040FA9 $8F99: C-----  00       BRK  
  0x040FAA $8F9A: C-----  1E 06 0C ASL  $0C06,X
  0x040FAD $8F9D: C-----  18       CLC  
  0x040FAE $8F9E: C-----  1E 00 18 ASL  $1800,X
  0x040FB1 $8FA1: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040FB2 $8FA2: C-----  00       BRK  
  0x040FB3 $8FA3: C-----  00       BRK  
  0x040FB4 $8FA4: C-----  00       BRK  
  0x040FB5 $8FA5: C-----  C0 C0    CPY  #$C0
  0x040FB7 $8FA7: C-----  00       BRK  
  0x040FB8 $8FA8: C-----  18       CLC  
  0x040FB9 $8FA9: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x040FBA $8FAA: C-----  00       BRK  
  0x040FBB $8FAB: C-----  00       BRK  
  0x040FBC $8FAC: C-----  00       BRK  
  0x040FBD $8FAD: C-----  C0 C0    CPY  #$C0
  0x040FBF $8FAF: C-----  00       BRK  
  0x040FC0 $8FB0: C-----  00       BRK  
  0x040FC1 $8FB1: C-----  70 30    BVS  $8FE3
  0x040FC3 $8FB3: C-----  60       RTS  
  0x040FC4 $8FB4: C-----  70 00    BVS  $8FB6
  0x040FC6 $8FB6: C-----  00       BRK  
  0x040FC7 $8FB7: C-----  00       BRK  
  0x040FC8 $8FB8: C-----  00       BRK  
  0x040FC9 $8FB9: C-----  70 30    BVS  $8FEB
  0x040FCB $8FBB: C-----  60       RTS  
  0x040FCC $8FBC: C-----  70 00    BVS  $8FBE
  0x040FCE $8FBE: C-----  00       BRK  
  0x040FCF $8FBF: C-----  00       BRK  
  0x040FD0 $8FC0: C-----  00       BRK  
  0x040FD1 $8FC1: C-----  7E 18 18 ROR  $1818,X
  0x040FD4 $8FC4: C-----  18       CLC  
  0x040FD5 $8FC5: C-----  18       CLC  
  0x040FD6 $8FC6: C-----  18       CLC  
  0x040FD7 $8FC7: C-----  18       CLC  
  0x040FD8 $8FC8: C-----  00       BRK  
  0x040FD9 $8FC9: C-----  7E 18 18 ROR  $1818,X
  0x040FDC $8FCC: C-----  18       CLC  
  0x040FDD $8FCD: C-----  18       CLC  
  0x040FDE $8FCE: C-----  18       CLC  
  0x040FDF $8FCF: C-----  18       CLC  
  0x040FE0 $8FD0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040FE1 $8FD1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040FE2 $8FD2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040FE3 $8FD3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040FE4 $8FD4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040FE5 $8FD5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040FE6 $8FD6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040FE7 $8FD7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040FE8 $8FD8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040FE9 $8FD9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040FEA $8FDA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040FEB $8FDB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040FEC $8FDC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040FED $8FDD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040FEE $8FDE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040FEF $8FDF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040FF0 $8FE0: C-----  00       BRK  
  0x040FF1 $8FE1: C-----  00       BRK  
  0x040FF2 $8FE2: C-----  00       BRK  
  0x040FF3 $8FE3: C-----  00       BRK  
  0x040FF4 $8FE4: C-----  00       BRK  
  0x040FF5 $8FE5: C-----  00       BRK  
  0x040FF6 $8FE6: C-----  00       BRK  
  0x040FF7 $8FE7: C-----  00       BRK  
  0x040FF8 $8FE8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040FF9 $8FE9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040FFA $8FEA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040FFB $8FEB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040FFC $8FEC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040FFD $8FED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040FFE $8FEE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x040FFF $8FEF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041000 $8FF0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041001 $8FF1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041002 $8FF2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041003 $8FF3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041004 $8FF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041005 $8FF5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041006 $8FF6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041007 $8FF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041008 $8FF8: C-----  00       BRK  
  0x041009 $8FF9: C-----  00       BRK  
  0x04100A $8FFA: C-----  00       BRK  
  0x04100B $8FFB: C-----  00       BRK  
  0x04100C $8FFC: C-----  00       BRK  
  0x04100D $8FFD: C-----  00       BRK  
  0x04100E $8FFE: C-----  00       BRK  
  0x04100F $8FFF: C-----  00       BRK  
  0x041010 $9000: C-----  00       BRK  
  0x041011 $9001: C-----  00       BRK  
  0x041012 $9002: C-----  00       BRK  
  0x041013 $9003: C-----  00       BRK  
  0x041014 $9004: C-----  00       BRK  
  0x041015 $9005: C-----  00       BRK  
  0x041016 $9006: C-----  00       BRK  
  0x041017 $9007: C-----  00       BRK  
  0x041018 $9008: C-----  00       BRK  
  0x041019 $9009: C-----  00       BRK  
  0x04101A $900A: C-----  00       BRK  
  0x04101B $900B: C-----  00       BRK  
  0x04101C $900C: C-----  00       BRK  
  0x04101D $900D: C-----  00       BRK  
  0x04101E $900E: C-----  00       BRK  
  0x04101F $900F: C-----  00       BRK  
  0x041020 $9010: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041021 $9011: ------  .byte $FF
  0x041022 $9012: ------  .byte $FF
  0x041023 $9013: ------  .byte $FF
  0x041024 $9014: ------  .byte $FF
  0x041025 $9015: ------  .byte $FF
  0x041026 $9016: ------  .byte $FF
  0x041027 $9017: ------  .byte $FF
  0x041028 $9018: C-----  00       BRK  
  0x041029 $9019: ------  .byte $00
  0x04102A $901A: ------  .byte $00
  0x04102B $901B: ------  .byte $00
  0x04102C $901C: ------  .byte $00
  0x04102D $901D: ------  .byte $00
  0x04102E $901E: ------  .byte $00
  0x04102F $901F: ------  .byte $00
  0x041030 $9020: C-----  00       BRK  
  0x041031 $9021: C-----  00       BRK  
  0x041032 $9022: C-----  00       BRK  
  0x041033 $9023: C-----  00       BRK  
  0x041034 $9024: C-----  00       BRK  
  0x041035 $9025: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041036 $9026: C-----  78       SEI  
  0x041037 $9027: C-----  E0 00    CPX  #$00
  0x041039 $9029: C-----  00       BRK  
  0x04103A $902A: C-----  00       BRK  
  0x04103B $902B: C-----  00       BRK  
  0x04103C $902C: C-----  00       BRK  
  0x04103D $902D: C-----  00       BRK  
  0x04103E $902E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04103F $902F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041040 $9030: C-----  00       BRK  
  0x041041 $9031: C-----  00       BRK  
  0x041042 $9032: C-----  00       BRK  
  0x041043 $9033: C-----  00       BRK  
  0x041044 $9034: C-----  00       BRK  
  0x041045 $9035: C-----  E0 1F    CPX  #$1F
  0x041047 $9037: C-----  00       BRK  
  0x041048 $9038: C-----  00       BRK  
  0x041049 $9039: C-----  00       BRK  
  0x04104A $903A: C-----  00       BRK  
  0x04104B $903B: C-----  00       BRK  
  0x04104C $903C: C-----  00       BRK  
  0x04104D $903D: C-----  00       BRK  
  0x04104E $903E: C-----  E0 FF    CPX  #$FF
  0x041050 $9040: C-----  00       BRK  
  0x041051 $9041: C-----  00       BRK  
  0x041052 $9042: C-----  00       BRK  
  0x041053 $9043: C-----  00       BRK  
  0x041054 $9044: C-----  00       BRK  
  0x041055 $9045: C-----  01 01    ORA  ($01,X)
  0x041057 $9047: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041058 $9048: C-----  00       BRK  
  0x041059 $9049: C-----  00       BRK  
  0x04105A $904A: C-----  00       BRK  
  0x04105B $904B: C-----  00       BRK  
  0x04105C $904C: C-----  00       BRK  
  0x04105D $904D: C-----  00       BRK  
  0x04105E $904E: C-----  00       BRK  
  0x04105F $904F: C-----  00       BRK  
  0x041060 $9050: C-----  00       BRK  
  0x041061 $9051: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041062 $9052: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041063 $9053: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041064 $9054: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x041065 $9055: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x041066 $9056: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x041067 $9057: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x041068 $9058: C-----  00       BRK  
  0x041069 $9059: C-----  00       BRK  
  0x04106A $905A: C-----  00       BRK  
  0x04106B $905B: C-----  00       BRK  
  0x04106C $905C: C-----  30 78    BMI  $90D6
  0x04106E $905E: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04106F $905F: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x041070 $9060: C-----  00       BRK  
  0x041071 $9061: C-----  00       BRK  
  0x041072 $9062: C-----  00       BRK  
  0x041073 $9063: C-----  00       BRK  
  0x041074 $9064: C-----  00       BRK  
  0x041075 $9065: C-----  00       BRK  
  0x041076 $9066: C-----  00       BRK  
  0x041077 $9067: C-----  E0 00    CPX  #$00
  0x041079 $9069: C-----  00       BRK  
  0x04107A $906A: C-----  00       BRK  
  0x04107B $906B: C-----  00       BRK  
  0x04107C $906C: C-----  00       BRK  
  0x04107D $906D: C-----  00       BRK  
  0x04107E $906E: C-----  00       BRK  
  0x04107F $906F: C-----  00       BRK  
  0x041080 $9070: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x041081 $9071: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041082 $9072: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041083 $9073: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041084 $9074: C-----  01 01    ORA  ($01,X)
  0x041086 $9076: C-----  01 00    ORA  ($00,X)
  0x041088 $9078: C-----  01 00    ORA  ($00,X)
  0x04108A $907A: C-----  00       BRK  
  0x04108B $907B: C-----  00       BRK  
  0x04108C $907C: C-----  00       BRK  
  0x04108D $907D: C-----  00       BRK  
  0x04108E $907E: C-----  00       BRK  
  0x04108F $907F: C-----  00       BRK  
  0x041090 $9080: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041091 $9081: C-----  06 04    ASL  $04
  0x041093 $9083: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x041094 $9084: C-----  08       PHP  
  0x041095 $9085: C-----  08       PHP  
  0x041096 $9086: C-----  18       CLC  
  0x041097 $9087: C-----  18       CLC  
  0x041098 $9088: C-----  00       BRK  
  0x041099 $9089: C-----  01 03    ORA  ($03,X)
  0x04109B $908B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04109C $908C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04109D $908D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04109E $908E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04109F $908F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0410A0 $9090: C-----  10 10    BPL  $90A2
  0x0410A2 $9092: C-----  0E 0F 0F ASL  $0F0F
  0x0410A5 $9095: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0410A6 $9096: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0410A7 $9097: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0410A8 $9098: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0410A9 $9099: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0410AA $909A: C-----  F1 F0    SBC  ($F0),Y
  0x0410AC $909C: C-----  F0 E0    BEQ  $907E
  0x0410AE $909E: C-----  E0 F0    CPX  #$F0
  0x0410B0 $90A0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0410B1 $90A1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0410B2 $90A2: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0410B3 $90A3: C-----  01 00    ORA  ($00,X)
  0x0410B5 $90A5: C-----  00       BRK  
  0x0410B6 $90A6: C-----  00       BRK  
  0x0410B7 $90A7: C-----  00       BRK  
  0x0410B8 $90A8: C-----  F0 80    BEQ  $902A
  0x0410BA $90AA: C-----  78       SEI  
  0x0410BB $90AB: C-----  FE FF FF INC  $FFFF,X
  0x0410BE $90AE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0410BF $90AF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0410C0 $90B0: C-----  FE FF FF INC  $FFFF,X
  0x0410C3 $90B3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0410C4 $90B4: C-----  F0 80    BEQ  $9036
  0x0410C6 $90B6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0410C7 $90B7: C-----  40       RTI  
  0x0410C8 $90B8: C-----  01 00    ORA  ($00,X)
  0x0410CA $90BA: C-----  00       BRK  
  0x0410CB $90BB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0410CC $90BC: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0410CD $90BD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0410CE $90BE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0410CF $90BF: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0410D0 $90C0: C-----  00       BRK  
  0x0410D1 $90C1: C-----  00       BRK  
  0x0410D2 $90C2: C-----  00       BRK  
  0x0410D3 $90C3: C-----  C0 F8    CPY  #$F8
  0x0410D5 $90C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0410D6 $90C6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0410D7 $90C7: C-----  FE FF FF INC  $FFFF,X
  0x0410DA $90CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0410DB $90CB: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0410DC $90CC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0410DD $90CD: C-----  00       BRK  
  0x0410DE $90CE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0410DF $90CF: C-----  01 10    ORA  ($10,X)
  0x0410E1 $90D1: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0410E2 $90D2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0410E3 $90D3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0410E4 $90D4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0410E5 $90D5: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0410E6 $90D6: C-----  01 00    ORA  ($00,X)
  0x0410E8 $90D8: C-----  E0 F0    CPX  #$F0
  0x0410EA $90DA: C-----  F8       SED  
  0x0410EB $90DB: C-----  F0 80    BEQ  $905D
  0x0410ED $90DD: C-----  78       SEI  
  0x0410EE $90DE: C-----  FE FF 00 INC  $00FF,X
  0x0410F1 $90E1: C-----  00       BRK  
  0x0410F2 $90E2: C-----  00       BRK  
  0x0410F3 $90E3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0410F4 $90E4: C-----  60       RTS  
  0x0410F5 $90E5: C-----  10 0F    BPL  $90F6
  0x0410F7 $90E7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0410F8 $90E8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0410F9 $90E9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0410FA $90EA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0410FB $90EB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0410FC $90EC: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0410FD $90ED: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0410FE $90EE: C-----  F0 F0    BEQ  $90E0
  0x041100 $90F0: C-----  7E 22 23 ROR  $2322,X
  0x041103 $90F3: C-----  11 10    ORA  ($10),Y
  0x041105 $90F5: C-----  10 F0    BPL  $90E7
  0x041107 $90F7: C-----  F8       SED  
  0x041108 $90F8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041109 $90F9: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04110A $90FA: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04110B $90FB: C-----  EE EF EF INC  $EFEF
  0x04110E $90FE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04110F $90FF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041110 $9100: C-----  00       BRK  
  0x041111 $9101: C-----  E0 FC    CPX  #$FC
  0x041113 $9103: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x041114 $9104: C-----  E0 18    CPX  #$18
  0x041116 $9106: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041117 $9107: C-----  01 00    ORA  ($00,X)
  0x041119 $9109: C-----  00       BRK  
  0x04111A $910A: C-----  00       BRK  
  0x04111B $910B: C-----  18       CLC  
  0x04111C $910C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04111D $910D: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04111E $910E: C-----  F8       SED  
  0x04111F $910F: C-----  FE 00 00 INC  $0000,X
  0x041122 $9112: C-----  00       BRK  
  0x041123 $9113: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041124 $9114: C-----  F0 1C    BEQ  $9132
  0x041126 $9116: C-----  06 E3    ASL  $E3
  0x041128 $9118: C-----  00       BRK  
  0x041129 $9119: C-----  00       BRK  
  0x04112A $911A: C-----  00       BRK  
  0x04112B $911B: C-----  00       BRK  
  0x04112C $911C: C-----  00       BRK  
  0x04112D $911D: C-----  E0 F8    CPX  #$F8
  0x04112F $911F: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x041130 $9120: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x041131 $9121: C-----  06 CF    ASL  $CF
  0x041133 $9123: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041134 $9124: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041135 $9125: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041136 $9126: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x041137 $9127: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x041138 $9128: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x041139 $9129: C-----  F9 30 C0 SBC  $C030,Y
  0x04113C $912C: C-----  E0 E0    CPX  #$E0
  0x04113E $912E: C-----  70 70    BVS  $91A0
  0x041140 $9130: C-----  01 03    ORA  ($03,X)
  0x041142 $9132: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x041143 $9133: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x041144 $9134: C-----  F8       SED  
  0x041145 $9135: C-----  F0 F0    BEQ  $9127
  0x041147 $9137: C-----  F0 FE    BEQ  $9137
  0x041149 $9139: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04114A $913A: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04114B $913B: C-----  18       CLC  
  0x04114C $913C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04114D $913D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04114E $913E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04114F $913F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041150 $9140: C-----  00       BRK  
  0x041151 $9141: C-----  00       BRK  
  0x041152 $9142: C-----  00       BRK  
  0x041153 $9143: C-----  00       BRK  
  0x041154 $9144: C-----  00       BRK  
  0x041155 $9145: C-----  00       BRK  
  0x041156 $9146: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041157 $9147: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041158 $9148: C-----  00       BRK  
  0x041159 $9149: C-----  00       BRK  
  0x04115A $914A: C-----  00       BRK  
  0x04115B $914B: C-----  00       BRK  
  0x04115C $914C: C-----  00       BRK  
  0x04115D $914D: C-----  00       BRK  
  0x04115E $914E: C-----  00       BRK  
  0x04115F $914F: C-----  00       BRK  
  0x041160 $9150: C-----  00       BRK  
  0x041161 $9151: C-----  00       BRK  
  0x041162 $9152: C-----  00       BRK  
  0x041163 $9153: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x041164 $9154: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041165 $9155: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x041166 $9156: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x041167 $9157: C-----  81 00    STA  ($00,X)
  0x041169 $9159: C-----  00       BRK  
  0x04116A $915A: C-----  00       BRK  
  0x04116B $915B: C-----  00       BRK  
  0x04116C $915C: C-----  00       BRK  
  0x04116D $915D: C-----  30 FD    BMI  $915C
  0x04116F $915F: C-----  7E FE FE ROR  $FEFE,X
  0x041172 $9162: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041173 $9163: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041174 $9164: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041175 $9165: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041176 $9166: C-----  1E 08 01 ASL  $0108,X
  0x041179 $9169: C-----  01 00    ORA  ($00,X)
  0x04117B $916B: C-----  00       BRK  
  0x04117C $916C: C-----  00       BRK  
  0x04117D $916D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04117E $916E: C-----  E1 F7    SBC  ($F7,X)
  0x041180 $9170: C-----  C0 60    CPY  #$60
  0x041182 $9172: C-----  30 18    BMI  $918C
  0x041184 $9174: C-----  8C C4 36 STY  $36C4
  0x041187 $9177: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041188 $9178: C-----  00       BRK  
  0x041189 $9179: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04118A $917A: C-----  C0 E0    CPY  #$E0
  0x04118C $917C: C-----  70 38    BVS  $91B6
  0x04118E $917E: C-----  C8       INY  
  0x04118F $917F: C-----  F0 00    BEQ  $9181
  0x041191 $9181: C-----  00       BRK  
  0x041192 $9182: C-----  00       BRK  
  0x041193 $9183: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041194 $9184: C-----  E0 F0    CPX  #$F0
  0x041196 $9186: C-----  F8       SED  
  0x041197 $9187: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041198 $9188: C-----  00       BRK  
  0x041199 $9189: C-----  00       BRK  
  0x04119A $918A: C-----  00       BRK  
  0x04119B $918B: C-----  00       BRK  
  0x04119C $918C: C-----  00       BRK  
  0x04119D $918D: C-----  00       BRK  
  0x04119E $918E: C-----  00       BRK  
  0x04119F $918F: C-----  00       BRK  
  0x0411A0 $9190: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x0411A1 $9191: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x0411A2 $9192: C-----  61 31    ADC  ($31,X)
  0x0411A4 $9194: C-----  10 18    BPL  $91AE
  0x0411A6 $9196: C-----  0D 07 38 ORA  $3807
  0x0411A9 $9199: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0411AA $919A: C-----  1E 0E 0F ASL  $0F0E,X
  0x0411AD $919D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0411AE $919E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0411AF $919F: C-----  00       BRK  
  0x0411B0 $91A0: C-----  00       BRK  
  0x0411B1 $91A1: C-----  00       BRK  
  0x0411B2 $91A2: C-----  00       BRK  
  0x0411B3 $91A3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0411B4 $91A4: C-----  C0 40    CPY  #$40
  0x0411B6 $91A6: C-----  60       RTS  
  0x0411B7 $91A7: C-----  20 00 00 JSR  $0000
  0x0411BA $91AA: C-----  00       BRK  
  0x0411BB $91AB: C-----  00       BRK  
  0x0411BC $91AC: C-----  00       BRK  
  0x0411BD $91AD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0411BE $91AE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0411BF $91AF: C-----  C0 01    CPY  #$01
  0x0411C1 $91B1: C-----  00       BRK  
  0x0411C2 $91B2: C-----  00       BRK  
  0x0411C3 $91B3: C-----  00       BRK  
  0x0411C4 $91B4: C-----  00       BRK  
  0x0411C5 $91B5: C-----  00       BRK  
  0x0411C6 $91B6: C-----  00       BRK  
  0x0411C7 $91B7: C-----  00       BRK  
  0x0411C8 $91B8: C-----  00       BRK  
  0x0411C9 $91B9: C-----  00       BRK  
  0x0411CA $91BA: C-----  00       BRK  
  0x0411CB $91BB: C-----  00       BRK  
  0x0411CC $91BC: C-----  00       BRK  
  0x0411CD $91BD: C-----  00       BRK  
  0x0411CE $91BE: C-----  00       BRK  
  0x0411CF $91BF: C-----  00       BRK  
  0x0411D0 $91C0: C-----  F8       SED  
  0x0411D1 $91C1: C-----  C6 01    DEC  $01
  0x0411D3 $91C3: C-----  00       BRK  
  0x0411D4 $91C4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0411D5 $91C5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0411D6 $91C6: C-----  C0 F0    CPY  #$F0
  0x0411D8 $91C8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0411D9 $91C9: C-----  39 FE FF AND  $FFFE,Y
  0x0411DC $91CC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0411DD $91CD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0411DE $91CE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0411DF $91CF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0411E0 $91D0: C-----  08       PHP  
  0x0411E1 $91D1: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0411E2 $91D2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0411E3 $91D3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0411E4 $91D4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0411E5 $91D5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0411E6 $91D6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0411E7 $91D7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0411E8 $91D8: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0411E9 $91D9: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x0411EA $91DA: C-----  C0 00    CPY  #$00
  0x0411EC $91DC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0411ED $91DD: C-----  C0 C0    CPY  #$C0
  0x0411EF $91DF: C-----  E0 F8    CPX  #$F8
  0x0411F1 $91E1: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0411F2 $91E2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0411F3 $91E3: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0411F4 $91E4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0411F5 $91E5: C-----  00       BRK  
  0x0411F6 $91E6: C-----  00       BRK  
  0x0411F7 $91E7: C-----  00       BRK  
  0x0411F8 $91E8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0411F9 $91E9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0411FA $91EA: C-----  00       BRK  
  0x0411FB $91EB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0411FC $91EC: C-----  00       BRK  
  0x0411FD $91ED: C-----  00       BRK  
  0x0411FE $91EE: C-----  00       BRK  
  0x0411FF $91EF: C-----  00       BRK  
  0x041200 $91F0: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041201 $91F1: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x041202 $91F2: C-----  D5 AA    CMP  $AA,X
  0x041204 $91F4: C-----  D5 FA    CMP  $FA,X
  0x041206 $91F6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041207 $91F7: C-----  00       BRK  
  0x041208 $91F8: C-----  E0 94    CPX  #$94
  0x04120A $91FA: C-----  2A       ROL  A
  0x04120B $91FB: C-----  55 2A    EOR  $2A,X
  0x04120D $91FD: C-----  05 00    ORA  $00
  0x04120F $91FF: C-----  00       BRK  
  0x041210 $9200: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x041211 $9201: C-----  1E 1F 0E ASL  $0E1F,X
  0x041214 $9204: C-----  0E 0F 07 ASL  $070F
  0x041217 $9207: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041218 $9208: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041219 $9209: C-----  01 00    ORA  ($00,X)
  0x04121B $920B: C-----  01 01    ORA  ($01,X)
  0x04121D $920D: C-----  00       BRK  
  0x04121E $920E: C-----  00       BRK  
  0x04121F $920F: C-----  00       BRK  
  0x041220 $9210: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041221 $9211: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041222 $9212: C-----  01 01    ORA  ($01,X)
  0x041224 $9214: C-----  00       BRK  
  0x041225 $9215: C-----  00       BRK  
  0x041226 $9216: C-----  00       BRK  
  0x041227 $9217: C-----  00       BRK  
  0x041228 $9218: C-----  00       BRK  
  0x041229 $9219: C-----  00       BRK  
  0x04122A $921A: C-----  00       BRK  
  0x04122B $921B: C-----  00       BRK  
  0x04122C $921C: C-----  00       BRK  
  0x04122D $921D: C-----  00       BRK  
  0x04122E $921E: C-----  00       BRK  
  0x04122F $921F: C-----  00       BRK  
  0x041230 $9220: C-----  F5 1E    SBC  $1E,X
  0x041232 $9222: C-----  01 00    ORA  ($00,X)
  0x041234 $9224: C-----  00       BRK  
  0x041235 $9225: C-----  00       BRK  
  0x041236 $9226: C-----  00       BRK  
  0x041237 $9227: C-----  00       BRK  
  0x041238 $9228: C-----  0A       ASL  A
  0x041239 $9229: C-----  01 00    ORA  ($00,X)
  0x04123B $922B: C-----  00       BRK  
  0x04123C $922C: C-----  00       BRK  
  0x04123D $922D: C-----  00       BRK  
  0x04123E $922E: C-----  00       BRK  
  0x04123F $922F: C-----  00       BRK  
  0x041240 $9230: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041241 $9231: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x041242 $9232: C-----  C0 00    CPY  #$00
  0x041244 $9234: C-----  00       BRK  
  0x041245 $9235: C-----  00       BRK  
  0x041246 $9236: C-----  00       BRK  
  0x041247 $9237: C-----  00       BRK  
  0x041248 $9238: C-----  00       BRK  
  0x041249 $9239: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04124A $923A: C-----  00       BRK  
  0x04124B $923B: C-----  00       BRK  
  0x04124C $923C: C-----  00       BRK  
  0x04124D $923D: C-----  00       BRK  
  0x04124E $923E: C-----  00       BRK  
  0x04124F $923F: C-----  00       BRK  
  0x041250 $9240: C-----  00       BRK  
  0x041251 $9241: C-----  81 E7    STA  ($E7,X)
  0x041253 $9243: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x041254 $9244: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x041255 $9245: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x041256 $9246: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x041257 $9247: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x041258 $9248: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041259 $9249: C-----  7E 18 60 ROR  $6018,X
  0x04125C $924C: C-----  30 38    BMI  $9286
  0x04125E $924E: C-----  18       CLC  
  0x04125F $924F: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x041260 $9250: C-----  40       RTI  
  0x041261 $9251: C-----  C0 E0    CPY  #$E0
  0x041263 $9253: C-----  F0 FC    BEQ  $9251
  0x041265 $9255: C-----  FE FF FF INC  $FFFF,X
  0x041268 $9258: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x041269 $9259: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04126A $925A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04126B $925B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04126C $925C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04126D $925D: C-----  01 00    ORA  ($00,X)
  0x04126F $925F: C-----  00       BRK  
  0x041270 $9260: C-----  19 0D 07 ORA  $070D,Y
  0x041273 $9263: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041274 $9264: C-----  00       BRK  
  0x041275 $9265: C-----  00       BRK  
  0x041276 $9266: C-----  00       BRK  
  0x041277 $9267: C-----  00       BRK  
  0x041278 $9268: C-----  06 02    ASL  $02
  0x04127A $926A: C-----  00       BRK  
  0x04127B $926B: C-----  00       BRK  
  0x04127C $926C: C-----  00       BRK  
  0x04127D $926D: C-----  00       BRK  
  0x04127E $926E: C-----  00       BRK  
  0x04127F $926F: C-----  00       BRK  
  0x041280 $9270: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041281 $9271: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041282 $9272: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041283 $9273: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041284 $9274: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x041285 $9275: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x041286 $9276: C-----  1D 07 00 ORA  $0007,X
  0x041289 $9279: C-----  00       BRK  
  0x04128A $927A: C-----  00       BRK  
  0x04128B $927B: C-----  E0 3C    CPX  #$3C
  0x04128D $927D: C-----  05 02    ORA  $02
  0x04128F $927F: C-----  00       BRK  
  0x041290 $9280: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041291 $9281: C-----  18       CLC  
  0x041292 $9282: C-----  68       PLA  
  0x041293 $9283: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x041294 $9284: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x041295 $9285: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x041296 $9286: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x041297 $9287: C-----  E1 00    SBC  ($00,X)
  0x041299 $9289: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04129A $928A: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04129B $928B: C-----  38       SEC  
  0x04129C $928C: C-----  78       SEI  
  0x04129D $928D: C-----  70 2C    BVS  $92BB
  0x04129F $928F: C-----  1E F0 1E ASL  $1EF0,X
  0x0412A2 $9292: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0412A3 $9293: C-----  C6 C2    DEC  $C2
  0x0412A5 $9295: C-----  C1 B7    CMP  ($B7,X)
  0x0412A7 $9297: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0412A8 $9298: C-----  00       BRK  
  0x0412A9 $9299: C-----  E0 C0    CPX  #$C0
  0x0412AB $929B: C-----  39 3D 3E AND  $3E3D,Y
  0x0412AE $929E: C-----  48       PHA  
  0x0412AF $929F: C-----  F0 61    BEQ  $9302
  0x0412B1 $92A1: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x0412B2 $92A2: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0412B3 $92A3: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0412B4 $92A4: C-----  09 06    ORA  #$06
  0x0412B6 $92A6: C-----  01 00    ORA  ($00,X)
  0x0412B8 $92A8: C-----  1E 0C 10 ASL  $100C,X
  0x0412BB $92AB: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0412BC $92AC: C-----  06 01    ASL  $01
  0x0412BE $92AE: C-----  00       BRK  
  0x0412BF $92AF: C-----  00       BRK  
  0x0412C0 $92B0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0412C1 $92B1: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x0412C2 $92B2: C-----  F1 F0    SBC  ($F0),Y
  0x0412C4 $92B4: C-----  F0 FC    BEQ  $92B2
  0x0412C6 $92B6: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0412C7 $92B7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0412C8 $92B8: C-----  F8       SED  
  0x0412C9 $92B9: C-----  30 0E    BMI  $92C9
  0x0412CB $92BB: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0412CC $92BC: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0412CD $92BD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0412CE $92BE: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0412CF $92BF: C-----  00       BRK  
  0x0412D0 $92C0: C-----  00       BRK  
  0x0412D1 $92C1: C-----  00       BRK  
  0x0412D2 $92C2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0412D3 $92C3: C-----  C0 60    CPY  #$60
  0x0412D5 $92C5: C-----  B0 D0    BCS  $9297
  0x0412D7 $92C7: C-----  E8       INX  
  0x0412D8 $92C8: C-----  00       BRK  
  0x0412D9 $92C9: C-----  00       BRK  
  0x0412DA $92CA: C-----  00       BRK  
  0x0412DB $92CB: C-----  00       BRK  
  0x0412DC $92CC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0412DD $92CD: C-----  40       RTI  
  0x0412DE $92CE: C-----  20 10 00 JSR  $0010
  0x0412E1 $92D1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0412E2 $92D2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0412E3 $92D3: C-----  1E 14 2F ASL  $2F14,X
  0x0412E6 $92D6: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0412E7 $92D7: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x0412E8 $92D8: C-----  00       BRK  
  0x0412E9 $92D9: C-----  00       BRK  
  0x0412EA $92DA: C-----  00       BRK  
  0x0412EB $92DB: C-----  01 0B    ORA  ($0B,X)
  0x0412ED $92DD: C-----  10 10    BPL  $92EF
  0x0412EF $92DF: C-----  18       CLC  
  0x0412F0 $92E0: C-----  EC FC D4 CPX  $D4FC
  0x0412F3 $92E3: C-----  A8       TAY  
  0x0412F4 $92E4: C-----  58       CLI  
  0x0412F5 $92E5: C-----  F0 E0    BEQ  $92C7
  0x0412F7 $92E7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0412F8 $92E8: C-----  10 00    BPL  $92EA
  0x0412FA $92EA: C-----  28       PLP  
  0x0412FB $92EB: C-----  50 A0    BVC  $928D
  0x0412FD $92ED: C-----  00       BRK  
  0x0412FE $92EE: C-----  00       BRK  
  0x0412FF $92EF: C-----  00       BRK  
  0x041300 $92F0: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x041301 $92F1: C-----  11 09    ORA  ($09),Y
  0x041303 $92F3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041304 $92F4: C-----  01 00    ORA  ($00,X)
  0x041306 $92F6: C-----  00       BRK  
  0x041307 $92F7: C-----  00       BRK  
  0x041308 $92F8: C-----  08       PHP  
  0x041309 $92F9: C-----  0E 06 00 ASL  $0006
  0x04130C $92FC: C-----  00       BRK  
  0x04130D $92FD: C-----  00       BRK  
  0x04130E $92FE: C-----  00       BRK  
  0x04130F $92FF: C-----  00       BRK  
  0x041310 $9300: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041311 $9301: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041312 $9302: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041313 $9303: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041314 $9304: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041315 $9305: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041316 $9306: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x041317 $9307: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041318 $9308: C-----  F0 F0    BEQ  $92FA
  0x04131A $930A: C-----  F0 F0    BEQ  $92FC
  0x04131C $930C: C-----  F0 E0    BEQ  $92EE
  0x04131E $930E: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04131F $930F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041320 $9310: C-----  F8       SED  
  0x041321 $9311: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041322 $9312: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041323 $9313: C-----  FE FE FF INC  $FFFE,X
  0x041326 $9316: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041327 $9317: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041328 $9318: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041329 $9319: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04132A $931A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04132B $931B: C-----  01 01    ORA  ($01,X)
  0x04132D $931D: C-----  00       BRK  
  0x04132E $931E: C-----  00       BRK  
  0x04132F $931F: C-----  00       BRK  
  0x041330 $9320: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041331 $9321: C-----  C0 C0    CPY  #$C0
  0x041333 $9323: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041334 $9324: C-----  D5 FA    CMP  $FA,X
  0x041336 $9326: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x041337 $9327: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x041338 $9328: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041339 $9329: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04133A $932A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04133B $932B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04133C $932C: C-----  2A       ROL  A
  0x04133D $932D: C-----  05 A0    ORA  $A0
  0x04133F $932F: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x041340 $9330: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x041341 $9331: C-----  10 15    BPL  $9348
  0x041343 $9333: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x041344 $9334: C-----  5D BF FF EOR  $FFBF,X
  0x041347 $9337: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041348 $9338: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x041349 $9339: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04134A $933A: C-----  EA       NOP  
  0x04134B $933B: C-----  C5 A2    CMP  $A2
  0x04134D $933D: C-----  40       RTI  
  0x04134E $933E: C-----  00       BRK  
  0x04134F $933F: C-----  00       BRK  
  0x041350 $9340: C-----  30 30    BMI  $9372
  0x041352 $9342: C-----  10 38    BPL  $937C
  0x041354 $9344: C-----  18       CLC  
  0x041355 $9345: C-----  28       PLP  
  0x041356 $9346: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x041357 $9347: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x041358 $9348: C-----  C0 C0    CPY  #$C0
  0x04135A $934A: C-----  E0 C0    CPX  #$C0
  0x04135C $934C: C-----  E0 D0    CPX  #$D0
  0x04135E $934E: C-----  20 C0 00 JSR  $00C0
  0x041361 $9351: C-----  00       BRK  
  0x041362 $9352: C-----  00       BRK  
  0x041363 $9353: C-----  00       BRK  
  0x041364 $9354: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041365 $9355: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x041366 $9356: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041367 $9357: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041368 $9358: C-----  00       BRK  
  0x041369 $9359: C-----  00       BRK  
  0x04136A $935A: C-----  00       BRK  
  0x04136B $935B: C-----  00       BRK  
  0x04136C $935C: C-----  00       BRK  
  0x04136D $935D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04136E $935E: C-----  00       BRK  
  0x04136F $935F: C-----  00       BRK  
  0x041370 $9360: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x041371 $9361: C-----  AC 58 B8 LDY  $B858
  0x041374 $9364: C-----  50 B0    BVC  $9316
  0x041376 $9366: C-----  E0 C0    CPX  #$C0
  0x041378 $9368: C-----  A0 50    LDY  #$50
  0x04137A $936A: C-----  A0 40    LDY  #$40
  0x04137C $936C: C-----  A0 40    LDY  #$40
  0x04137E $936E: C-----  00       BRK  
  0x04137F $936F: C-----  00       BRK  
  0x041380 $9370: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041381 $9371: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x041382 $9372: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x041383 $9373: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x041384 $9374: C-----  C8       INY  
  0x041385 $9375: C-----  48       PHA  
  0x041386 $9376: C-----  48       PHA  
  0x041387 $9377: C-----  68       PLA  
  0x041388 $9378: C-----  00       BRK  
  0x041389 $9379: C-----  40       RTI  
  0x04138A $937A: C-----  60       RTS  
  0x04138B $937B: C-----  60       RTS  
  0x04138C $937C: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04138D $937D: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04138E $937E: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04138F $937F: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x041390 $9380: C-----  00       BRK  
  0x041391 $9381: C-----  F8       SED  
  0x041392 $9382: C-----  8E 79 7E STX  $7E79
  0x041395 $9385: C-----  9D 04 04 STA  $0404,X
  0x041398 $9388: C-----  00       BRK  
  0x041399 $9389: C-----  00       BRK  
  0x04139A $938A: C-----  70 86    BVS  $9312
  0x04139C $938C: C-----  81 62    STA  ($62,X)
  0x04139E $938E: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04139F $938F: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0413A0 $9390: C-----  00       BRK  
  0x0413A1 $9391: C-----  00       BRK  
  0x0413A2 $9392: C-----  00       BRK  
  0x0413A3 $9393: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0413A4 $9394: C-----  C0 E0    CPY  #$E0
  0x0413A6 $9396: C-----  E0 70    CPX  #$70
  0x0413A8 $9398: C-----  00       BRK  
  0x0413A9 $9399: C-----  00       BRK  
  0x0413AA $939A: C-----  00       BRK  
  0x0413AB $939B: C-----  00       BRK  
  0x0413AC $939C: C-----  00       BRK  
  0x0413AD $939D: C-----  00       BRK  
  0x0413AE $939E: C-----  00       BRK  
  0x0413AF $939F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0413B0 $93A0: C-----  CE 3F 0F DEC  $0F3F
  0x0413B3 $93A3: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x0413B4 $93A4: C-----  F5 7B    SBC  $7B,X
  0x0413B6 $93A6: C-----  0E 00 31 ASL  $3100
  0x0413B9 $93A9: C-----  C0 F0    CPY  #$F0
  0x0413BB $93AB: C-----  30 0A    BMI  $93B7
  0x0413BD $93AD: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0413BE $93AE: C-----  00       BRK  
  0x0413BF $93AF: C-----  00       BRK  
  0x0413C0 $93B0: C-----  D0 B0    BNE  $9362
  0x0413C2 $93B2: C-----  50 A0    BVC  $9354
  0x0413C4 $93B4: C-----  60       RTS  
  0x0413C5 $93B5: C-----  C0 00    CPY  #$00
  0x0413C7 $93B7: C-----  00       BRK  
  0x0413C8 $93B8: C-----  20 40 A0 JSR  $A040
  0x0413CB $93BB: C-----  40       RTI  
  0x0413CC $93BC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0413CD $93BD: C-----  00       BRK  
  0x0413CE $93BE: C-----  00       BRK  
  0x0413CF $93BF: C-----  00       BRK  
  0x0413D0 $93C0: C-----  00       BRK  
  0x0413D1 $93C1: C-----  00       BRK  
  0x0413D2 $93C2: C-----  00       BRK  
  0x0413D3 $93C3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0413D4 $93C4: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0413D5 $93C5: C-----  09 10    ORA  #$10
  0x0413D7 $93C7: C-----  10 00    BPL  $93C9
  0x0413D9 $93C9: C-----  00       BRK  
  0x0413DA $93CA: C-----  00       BRK  
  0x0413DB $93CB: C-----  00       BRK  
  0x0413DC $93CC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0413DD $93CD: C-----  06 0F    ASL  $0F
  0x0413DF $93CF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0413E0 $93D0: C-----  2E 3F 1F ROL  $1F3F
  0x0413E3 $93D3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0413E4 $93D4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0413E5 $93D5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0413E6 $93D6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0413E7 $93D7: C-----  00       BRK  
  0x0413E8 $93D8: C-----  11 00    ORA  ($00),Y
  0x0413EA $93DA: C-----  00       BRK  
  0x0413EB $93DB: C-----  00       BRK  
  0x0413EC $93DC: C-----  00       BRK  
  0x0413ED $93DD: C-----  00       BRK  
  0x0413EE $93DE: C-----  00       BRK  
  0x0413EF $93DF: C-----  00       BRK  
  0x0413F0 $93E0: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0413F1 $93E1: C-----  08       PHP  
  0x0413F2 $93E2: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0413F3 $93E3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0413F4 $93E4: C-----  00       BRK  
  0x0413F5 $93E5: C-----  00       BRK  
  0x0413F6 $93E6: C-----  00       BRK  
  0x0413F7 $93E7: C-----  00       BRK  
  0x0413F8 $93E8: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0413F9 $93E9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0413FA $93EA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0413FB $93EB: C-----  00       BRK  
  0x0413FC $93EC: C-----  00       BRK  
  0x0413FD $93ED: C-----  00       BRK  
  0x0413FE $93EE: C-----  00       BRK  
  0x0413FF $93EF: C-----  00       BRK  
  0x041400 $93F0: C-----  50 20    BVC  $9412
  0x041402 $93F2: C-----  60       RTS  
  0x041403 $93F3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041404 $93F4: C-----  00       BRK  
  0x041405 $93F5: C-----  00       BRK  
  0x041406 $93F6: C-----  00       BRK  
  0x041407 $93F7: C-----  00       BRK  
  0x041408 $93F8: C-----  A0 C0    LDY  #$C0
  0x04140A $93FA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04140B $93FB: C-----  00       BRK  
  0x04140C $93FC: C-----  00       BRK  
  0x04140D $93FD: C-----  00       BRK  
  0x04140E $93FE: C-----  00       BRK  
  0x04140F $93FF: C-----  00       BRK  
  0x041410 $9400: C-----  00       BRK  
  0x041411 $9401: C-----  00       BRK  
  0x041412 $9402: C-----  00       BRK  
  0x041413 $9403: C-----  00       BRK  
  0x041414 $9404: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041415 $9405: C-----  E0 18    CPX  #$18
  0x041417 $9407: C-----  06 00    ASL  $00
  0x041419 $9409: C-----  00       BRK  
  0x04141A $940A: C-----  00       BRK  
  0x04141B $940B: C-----  00       BRK  
  0x04141C $940C: C-----  00       BRK  
  0x04141D $940D: C-----  00       BRK  
  0x04141E $940E: C-----  E0 F8    CPX  #$F8
  0x041420 $9410: C-----  00       BRK  
  0x041421 $9411: C-----  00       BRK  
  0x041422 $9412: C-----  00       BRK  
  0x041423 $9413: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041424 $9414: C-----  19 3C 3B ORA  $3B3C,Y
  0x041427 $9417: C-----  20 00 00 JSR  $0000
  0x04142A $941A: C-----  00       BRK  
  0x04142B $941B: C-----  00       BRK  
  0x04142C $941C: C-----  06 03    ASL  $03
  0x04142E $941E: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04142F $941F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041430 $9420: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041431 $9421: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041432 $9422: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041433 $9423: C-----  08       PHP  
  0x041434 $9424: C-----  08       PHP  
  0x041435 $9425: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x041436 $9426: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x041437 $9427: C-----  06 00    ASL  $00
  0x041439 $9429: C-----  00       BRK  
  0x04143A $942A: C-----  00       BRK  
  0x04143B $942B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04143C $942C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04143D $942D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04143E $942E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04143F $942F: C-----  01 C3    ORA  ($C3,X)
  0x041441 $9431: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041442 $9432: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x041443 $9433: C-----  81 40    STA  ($40,X)
  0x041445 $9435: C-----  20 1F 1F JSR  $1F1F
  0x041448 $9438: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x041449 $9439: C-----  00       BRK  
  0x04144A $943A: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04144B $943B: C-----  7E BF DF ROR  $DFBF,X
  0x04144E $943E: C-----  E0 E0    CPX  #$E0
  0x041450 $9440: C-----  00       BRK  
  0x041451 $9441: C-----  00       BRK  
  0x041452 $9442: C-----  00       BRK  
  0x041453 $9443: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041454 $9444: C-----  70 98    BVS  $93DE
  0x041456 $9446: C-----  E8       INX  
  0x041457 $9447: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x041458 $9448: C-----  00       BRK  
  0x041459 $9449: C-----  00       BRK  
  0x04145A $944A: C-----  00       BRK  
  0x04145B $944B: C-----  00       BRK  
  0x04145C $944C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04145D $944D: C-----  60       RTS  
  0x04145E $944E: C-----  10 28    BPL  $9478
  0x041460 $9450: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x041461 $9451: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x041462 $9452: C-----  19 0E 01 ORA  $010E,Y
  0x041465 $9455: C-----  00       BRK  
  0x041466 $9456: C-----  00       BRK  
  0x041467 $9457: C-----  00       BRK  
  0x041468 $9458: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x041469 $9459: C-----  08       PHP  
  0x04146A $945A: C-----  06 01    ASL  $01
  0x04146C $945C: C-----  00       BRK  
  0x04146D $945D: C-----  00       BRK  
  0x04146E $945E: C-----  00       BRK  
  0x04146F $945F: C-----  00       BRK  
  0x041470 $9460: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x041471 $9461: C-----  F1 FF    SBC  ($FF),Y
  0x041473 $9463: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041474 $9464: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041475 $9465: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x041476 $9466: C-----  81 C0    STA  ($C0,X)
  0x041478 $9468: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x041479 $9469: C-----  0E 00 03 ASL  $0300
  0x04147C $946C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04147D $946D: C-----  7D 7E 3F ADC  $3F7E,X
  0x041480 $9470: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041481 $9471: C-----  C0 E0    CPY  #$E0
  0x041483 $9473: C-----  E0 50    CPX  #$50
  0x041485 $9475: C-----  B0 58    BCS  $94CF
  0x041487 $9477: C-----  A8       TAY  
  0x041488 $9478: C-----  00       BRK  
  0x041489 $9479: C-----  00       BRK  
  0x04148A $947A: C-----  00       BRK  
  0x04148B $947B: C-----  00       BRK  
  0x04148C $947C: C-----  A0 40    LDY  #$40
  0x04148E $947E: C-----  A0 50    LDY  #$50
  0x041490 $9480: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041491 $9481: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041492 $9482: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041493 $9483: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x041494 $9484: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x041495 $9485: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x041496 $9486: C-----  F5 EA    SBC  $EA,X
  0x041498 $9488: C-----  F0 F8    BEQ  $9482
  0x04149A $948A: C-----  F8       SED  
  0x04149B $948B: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x04149C $948C: C-----  18       CLC  
  0x04149D $948D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04149E $948E: C-----  0A       ASL  A
  0x04149F $948F: C-----  15 80    ORA  $80,X
  0x0414A1 $9491: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0414A2 $9492: C-----  C0 C0    CPY  #$C0
  0x0414A4 $9494: C-----  C0 E0    CPY  #$E0
  0x0414A6 $9496: C-----  E0 E0    CPX  #$E0
  0x0414A8 $9498: C-----  00       BRK  
  0x0414A9 $9499: C-----  00       BRK  
  0x0414AA $949A: C-----  00       BRK  
  0x0414AB $949B: C-----  00       BRK  
  0x0414AC $949C: C-----  00       BRK  
  0x0414AD $949D: C-----  00       BRK  
  0x0414AE $949E: C-----  00       BRK  
  0x0414AF $949F: C-----  00       BRK  
  0x0414B0 $94A0: C-----  F5 BA    SBC  $BA,X
  0x0414B2 $94A2: C-----  55 BB    EOR  $BB,X
  0x0414B4 $94A4: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x0414B5 $94A5: C-----  BC F0 00 LDY  $00F0,X
  0x0414B8 $94A8: C-----  0A       ASL  A
  0x0414B9 $94A9: C-----  45 AA    EOR  $AA
  0x0414BB $94AB: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0414BC $94AC: C-----  B0 40    BCS  $94EE
  0x0414BE $94AE: C-----  00       BRK  
  0x0414BF $94AF: C-----  00       BRK  
  0x0414C0 $94B0: C-----  40       RTI  
  0x0414C1 $94B1: C-----  C0 80    CPY  #$80
  0x0414C3 $94B3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0414C4 $94B4: C-----  00       BRK  
  0x0414C5 $94B5: C-----  00       BRK  
  0x0414C6 $94B6: C-----  00       BRK  
  0x0414C7 $94B7: C-----  00       BRK  
  0x0414C8 $94B8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0414C9 $94B9: C-----  00       BRK  
  0x0414CA $94BA: C-----  00       BRK  
  0x0414CB $94BB: C-----  00       BRK  
  0x0414CC $94BC: C-----  00       BRK  
  0x0414CD $94BD: C-----  00       BRK  
  0x0414CE $94BE: C-----  00       BRK  
  0x0414CF $94BF: C-----  00       BRK  
  0x0414D0 $94C0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0414D1 $94C1: C-----  01 00    ORA  ($00,X)
  0x0414D3 $94C3: C-----  00       BRK  
  0x0414D4 $94C4: C-----  00       BRK  
  0x0414D5 $94C5: C-----  00       BRK  
  0x0414D6 $94C6: C-----  00       BRK  
  0x0414D7 $94C7: C-----  00       BRK  
  0x0414D8 $94C8: C-----  00       BRK  
  0x0414D9 $94C9: C-----  00       BRK  
  0x0414DA $94CA: C-----  00       BRK  
  0x0414DB $94CB: C-----  00       BRK  
  0x0414DC $94CC: C-----  00       BRK  
  0x0414DD $94CD: C-----  00       BRK  
  0x0414DE $94CE: C-----  00       BRK  
  0x0414DF $94CF: C-----  00       BRK  
  0x0414E0 $94D0: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0414E1 $94D1: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0414E2 $94D2: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x0414E3 $94D3: C-----  70 1C    BVS  $94F1
  0x0414E5 $94D5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0414E6 $94D6: C-----  00       BRK  
  0x0414E7 $94D7: C-----  00       BRK  
  0x0414E8 $94D8: C-----  60       RTS  
  0x0414E9 $94D9: C-----  10 1C    BPL  $94F7
  0x0414EB $94DB: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0414EC $94DC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0414ED $94DD: C-----  00       BRK  
  0x0414EE $94DE: C-----  00       BRK  
  0x0414EF $94DF: C-----  00       BRK  
  0x0414F0 $94E0: C-----  00       BRK  
  0x0414F1 $94E1: C-----  00       BRK  
  0x0414F2 $94E2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0414F3 $94E3: C-----  39 3C 79 AND  $793C,Y
  0x0414F6 $94E6: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x0414F7 $94E7: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x0414F8 $94E8: C-----  00       BRK  
  0x0414F9 $94E9: C-----  00       BRK  
  0x0414FA $94EA: C-----  00       BRK  
  0x0414FB $94EB: C-----  06 03    ASL  $03
  0x0414FD $94ED: C-----  06 28    ASL  $28
  0x0414FF $94EF: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x041500 $94F0: C-----  00       BRK  
  0x041501 $94F1: C-----  00       BRK  
  0x041502 $94F2: C-----  C0 F0    CPY  #$F0
  0x041504 $94F4: C-----  68       PLA  
  0x041505 $94F5: C-----  94 CC    STY  $CC,X
  0x041507 $94F7: C-----  FE 00 00 INC  $0000,X
  0x04150A $94FA: C-----  00       BRK  
  0x04150B $94FB: C-----  00       BRK  
  0x04150C $94FC: C-----  90 68    BCC  $9566
  0x04150E $94FE: C-----  30 00    BMI  $9500
  0x041510 $9500: C-----  2C 9C BC BIT  $BC9C
  0x041513 $9503: C-----  58       CLI  
  0x041514 $9504: C-----  E0 00    CPX  #$00
  0x041516 $9506: C-----  00       BRK  
  0x041517 $9507: C-----  00       BRK  
  0x041518 $9508: C-----  D0 60    BNE  $956A
  0x04151A $950A: C-----  40       RTI  
  0x04151B $950B: C-----  A0 00    LDY  #$00
  0x04151D $950D: C-----  00       BRK  
  0x04151E $950E: C-----  00       BRK  
  0x04151F $950F: C-----  00       BRK  
  0x041520 $9510: C-----  00       BRK  
  0x041521 $9511: C-----  00       BRK  
  0x041522 $9512: C-----  00       BRK  
  0x041523 $9513: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041524 $9514: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x041525 $9515: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x041526 $9516: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x041527 $9517: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x041528 $9518: C-----  00       BRK  
  0x041529 $9519: C-----  00       BRK  
  0x04152A $951A: C-----  00       BRK  
  0x04152B $951B: C-----  00       BRK  
  0x04152C $951C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04152D $951D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04152E $951E: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04152F $951F: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x041530 $9520: C-----  11 09    ORA  ($09),Y
  0x041532 $9522: C-----  06 01    ASL  $01
  0x041534 $9524: C-----  00       BRK  
  0x041535 $9525: C-----  00       BRK  
  0x041536 $9526: C-----  00       BRK  
  0x041537 $9527: C-----  00       BRK  
  0x041538 $9528: C-----  0E 06 01 ASL  $0106
  0x04153B $952B: C-----  00       BRK  
  0x04153C $952C: C-----  00       BRK  
  0x04153D $952D: C-----  00       BRK  
  0x04153E $952E: C-----  00       BRK  
  0x04153F $952F: C-----  00       BRK  
  0x041540 $9530: C-----  A8       TAY  
  0x041541 $9531: C-----  D0 B0    BNE  $94E3
  0x041543 $9533: C-----  C0 00    CPY  #$00
  0x041545 $9535: C-----  00       BRK  
  0x041546 $9536: C-----  00       BRK  
  0x041547 $9537: C-----  00       BRK  
  0x041548 $9538: C-----  50 20    BVC  $955A
  0x04154A $953A: C-----  40       RTI  
  0x04154B $953B: C-----  00       BRK  
  0x04154C $953C: C-----  00       BRK  
  0x04154D $953D: C-----  00       BRK  
  0x04154E $953E: C-----  00       BRK  
  0x04154F $953F: C-----  00       BRK  
  0x041550 $9540: C-----  00       BRK  
  0x041551 $9541: C-----  00       BRK  
  0x041552 $9542: C-----  00       BRK  
  0x041553 $9543: C-----  C0 30    CPY  #$30
  0x041555 $9545: C-----  10 68    BPL  $95AF
  0x041557 $9547: C-----  78       SEI  
  0x041558 $9548: C-----  00       BRK  
  0x041559 $9549: C-----  00       BRK  
  0x04155A $954A: C-----  00       BRK  
  0x04155B $954B: C-----  00       BRK  
  0x04155C $954C: C-----  C0 E0    CPY  #$E0
  0x04155E $954E: C-----  90 80    BCC  $94D0
  0x041560 $9550: C-----  00       BRK  
  0x041561 $9551: C-----  00       BRK  
  0x041562 $9552: C-----  00       BRK  
  0x041563 $9553: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041564 $9554: C-----  60       RTS  
  0x041565 $9555: C-----  20 10 10 JSR  $1010
  0x041568 $9558: C-----  00       BRK  
  0x041569 $9559: C-----  00       BRK  
  0x04156A $955A: C-----  00       BRK  
  0x04156B $955B: C-----  00       BRK  
  0x04156C $955C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04156D $955D: C-----  C0 E0    CPY  #$E0
  0x04156F $955F: C-----  E0 00    CPX  #$00
  0x041571 $9561: C-----  00       BRK  
  0x041572 $9562: C-----  00       BRK  
  0x041573 $9563: C-----  00       BRK  
  0x041574 $9564: C-----  00       BRK  
  0x041575 $9565: C-----  E0 1F    CPX  #$1F
  0x041577 $9567: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x041578 $9568: C-----  00       BRK  
  0x041579 $9569: C-----  00       BRK  
  0x04157A $956A: C-----  00       BRK  
  0x04157B $956B: C-----  00       BRK  
  0x04157C $956C: C-----  00       BRK  
  0x04157D $956D: C-----  00       BRK  
  0x04157E $956E: C-----  E0 F8    CPX  #$F8
  0x041580 $9570: C-----  F0 0C    BEQ  $957E
  0x041582 $9572: C-----  10 20    BPL  $9594
  0x041584 $9574: C-----  78       SEI  
  0x041585 $9575: C-----  86 01    STX  $01
  0x041587 $9577: C-----  00       BRK  
  0x041588 $9578: C-----  00       BRK  
  0x041589 $9579: C-----  F0 E0    BEQ  $955B
  0x04158B $957B: C-----  C0 80    CPY  #$80
  0x04158D $957D: C-----  78       SEI  
  0x04158E $957E: C-----  FE FF E0 INC  $E0FF,X
  0x041591 $9581: C-----  E1 DF    SBC  ($DF,X)
  0x041593 $9583: C-----  AA       TAX  
  0x041594 $9584: C-----  D5 EA    CMP  $EA,X
  0x041596 $9586: C-----  F5 1F    SBC  $1F,X
  0x041598 $9588: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041599 $9589: C-----  1E 20 55 ASL  $5520,X
  0x04159C $958C: C-----  2A       ROL  A
  0x04159D $958D: C-----  15 0A    ORA  $0A,X
  0x04159F $958F: C-----  00       BRK  
  0x0415A0 $9590: C-----  F8       SED  
  0x0415A1 $9591: C-----  F8       SED  
  0x0415A2 $9592: C-----  F8       SED  
  0x0415A3 $9593: C-----  F0 70    BEQ  $9605
  0x0415A5 $9595: C-----  A0 C0    LDY  #$C0
  0x0415A7 $9597: C-----  00       BRK  
  0x0415A8 $9598: C-----  00       BRK  
  0x0415A9 $9599: C-----  00       BRK  
  0x0415AA $959A: C-----  00       BRK  
  0x0415AB $959B: C-----  00       BRK  
  0x0415AC $959C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0415AD $959D: C-----  40       RTI  
  0x0415AE $959E: C-----  00       BRK  
  0x0415AF $959F: C-----  00       BRK  
  0x0415B0 $95A0: C-----  60       RTS  
  0x0415B1 $95A1: C-----  18       CLC  
  0x0415B2 $95A2: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0415B3 $95A3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0415B4 $95A4: C-----  06 06    ASL  $06
  0x0415B6 $95A6: C-----  CE 3E 80 DEC  $803E
  0x0415B9 $95A9: C-----  E0 F0    CPX  #$F0
  0x0415BB $95AB: C-----  F8       SED  
  0x0415BC $95AC: C-----  F8       SED  
  0x0415BD $95AD: C-----  F8       SED  
  0x0415BE $95AE: C-----  30 C0    BMI  $9570
  0x0415C0 $95B0: C-----  19 0F 01 ORA  $010F,Y
  0x0415C3 $95B3: C-----  00       BRK  
  0x0415C4 $95B4: C-----  00       BRK  
  0x0415C5 $95B5: C-----  00       BRK  
  0x0415C6 $95B6: C-----  00       BRK  
  0x0415C7 $95B7: C-----  00       BRK  
  0x0415C8 $95B8: C-----  06 00    ASL  $00
  0x0415CA $95BA: C-----  00       BRK  
  0x0415CB $95BB: C-----  00       BRK  
  0x0415CC $95BC: C-----  00       BRK  
  0x0415CD $95BD: C-----  00       BRK  
  0x0415CE $95BE: C-----  00       BRK  
  0x0415CF $95BF: C-----  00       BRK  
  0x0415D0 $95C0: C-----  01 1E    ORA  ($1E,X)
  0x0415D2 $95C2: C-----  30 C0    BMI  $9584
  0x0415D4 $95C4: C-----  F8       SED  
  0x0415D5 $95C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0415D6 $95C6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0415D7 $95C7: C-----  FE F0 E1 INC  $E1F0,X
  0x0415DA $95CA: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x0415DB $95CB: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0415DC $95CC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0415DD $95CD: C-----  00       BRK  
  0x0415DE $95CE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0415DF $95CF: C-----  01 80    ORA  ($80,X)
  0x0415E1 $95D1: C-----  40       RTI  
  0x0415E2 $95D2: C-----  60       RTS  
  0x0415E3 $95D3: C-----  20 10 1C JSR  $1C10
  0x0415E6 $95D6: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x0415E7 $95D7: C-----  F9 00 80 SBC  $8000,Y
  0x0415EA $95DA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0415EB $95DB: C-----  C0 E0    CPY  #$E0
  0x0415ED $95DD: C-----  E0 0C    CPX  #$0C
  0x0415EF $95DF: C-----  06 FF    ASL  $FF
  0x0415F1 $95E1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0415F2 $95E2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0415F3 $95E3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0415F4 $95E4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0415F5 $95E5: C-----  00       BRK  
  0x0415F6 $95E6: C-----  00       BRK  
  0x0415F7 $95E7: C-----  00       BRK  
  0x0415F8 $95E8: C-----  00       BRK  
  0x0415F9 $95E9: C-----  00       BRK  
  0x0415FA $95EA: C-----  00       BRK  
  0x0415FB $95EB: C-----  00       BRK  
  0x0415FC $95EC: C-----  00       BRK  
  0x0415FD $95ED: C-----  00       BRK  
  0x0415FE $95EE: C-----  00       BRK  
  0x0415FF $95EF: C-----  00       BRK  
  0x041600 $95F0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041601 $95F1: C-----  C0 C0    CPY  #$C0
  0x041603 $95F3: C-----  F8       SED  
  0x041604 $95F4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041605 $95F5: C-----  01 00    ORA  ($00,X)
  0x041607 $95F7: C-----  00       BRK  
  0x041608 $95F8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041609 $95F9: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04160A $95FA: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04160B $95FB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04160C $95FC: C-----  00       BRK  
  0x04160D $95FD: C-----  00       BRK  
  0x04160E $95FE: C-----  00       BRK  
  0x04160F $95FF: C-----  00       BRK  
  0x041610 $9600: C-----  00       BRK  
  0x041611 $9601: C-----  00       BRK  
  0x041612 $9602: C-----  00       BRK  
  0x041613 $9603: C-----  78       SEI  
  0x041614 $9604: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x041615 $9605: C-----  00       BRK  
  0x041616 $9606: C-----  01 FF    ORA  ($FF,X)
  0x041618 $9608: C-----  00       BRK  
  0x041619 $9609: C-----  00       BRK  
  0x04161A $960A: C-----  00       BRK  
  0x04161B $960B: C-----  00       BRK  
  0x04161C $960C: C-----  78       SEI  
  0x04161D $960D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04161E $960E: C-----  FE 00 00 INC  $0000,X
  0x041621 $9611: C-----  00       BRK  
  0x041622 $9612: C-----  00       BRK  
  0x041623 $9613: C-----  00       BRK  
  0x041624 $9614: C-----  00       BRK  
  0x041625 $9615: C-----  F0 FC    BEQ  $9613
  0x041627 $9617: C-----  FE 00 00 INC  $0000,X
  0x04162A $961A: C-----  00       BRK  
  0x04162B $961B: C-----  00       BRK  
  0x04162C $961C: C-----  00       BRK  
  0x04162D $961D: C-----  00       BRK  
  0x04162E $961E: C-----  00       BRK  
  0x04162F $961F: C-----  00       BRK  
  0x041630 $9620: C-----  C0 C0    CPY  #$C0
  0x041632 $9622: C-----  C0 C0    CPY  #$C0
  0x041634 $9624: C-----  26 1F    ROL  $1F
  0x041636 $9626: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041637 $9627: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041638 $9628: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041639 $9629: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04163A $962A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04163B $962B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04163C $962C: C-----  D9 E0 E0 CMP  $E0E0,Y
  0x04163F $962F: C-----  E0 FF    CPX  #$FF
  0x041641 $9631: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041642 $9632: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041643 $9633: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041644 $9634: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x041645 $9635: C-----  C0 E0    CPY  #$E0
  0x041647 $9637: C-----  F0 00    BEQ  $9639
  0x041649 $9639: C-----  00       BRK  
  0x04164A $963A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04164B $963B: C-----  C0 D8    CPY  #$D8
  0x04164D $963D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04164E $963E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04164F $963F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041650 $9640: C-----  25 1C    AND  $1C
  0x041652 $9642: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041653 $9643: C-----  06 01    ASL  $01
  0x041655 $9645: C-----  00       BRK  
  0x041656 $9646: C-----  00       BRK  
  0x041657 $9647: C-----  00       BRK  
  0x041658 $9648: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x041659 $9649: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04165A $964A: C-----  00       BRK  
  0x04165B $964B: C-----  01 00    ORA  ($00,X)
  0x04165D $964D: C-----  00       BRK  
  0x04165E $964E: C-----  00       BRK  
  0x04165F $964F: C-----  00       BRK  
  0x041660 $9650: C-----  8E 54 2C STX  $2C54
  0x041663 $9653: C-----  F8       SED  
  0x041664 $9654: C-----  E0 00    CPX  #$00
  0x041666 $9656: C-----  00       BRK  
  0x041667 $9657: C-----  00       BRK  
  0x041668 $9658: C-----  70 A8    BVS  $9602
  0x04166A $965A: C-----  D0 00    BNE  $965C
  0x04166C $965C: C-----  00       BRK  
  0x04166D $965D: C-----  00       BRK  
  0x04166E $965E: C-----  00       BRK  
  0x04166F $965F: C-----  00       BRK  
  0x041670 $9660: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041671 $9661: C-----  C0 60    CPY  #$60
  0x041673 $9663: C-----  30 18    BMI  $967D
  0x041675 $9665: C-----  88       DEY  
  0x041676 $9666: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x041677 $9667: C-----  6C 00 00 JMP  ($0000)
  0x04167A $966A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04167B $966B: C-----  C0 E0    CPY  #$E0
  0x04167D $966D: C-----  70 A0    BVS  $960F
  0x04167F $966F: C-----  90 3C    BCC  $96AD
  0x041681 $9671: C-----  !!UNDEF $5A  ; unknown opcode, treating as data
  0x041682 $9672: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x041683 $9673: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x041684 $9674: C-----  C5 AB    CMP  $AB
  0x041686 $9676: C-----  76 3C    ROR  $3C,X
  0x041688 $9678: C-----  00       BRK  
  0x041689 $9679: C-----  24 38    BIT  $38
  0x04168B $967B: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x04168C $967C: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x04168D $967D: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04168E $967E: C-----  08       PHP  
  0x04168F $967F: C-----  00       BRK  
  0x041690 $9680: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041691 $9681: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x041692 $9682: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x041693 $9683: C-----  E0 E0    CPX  #$E0
  0x041695 $9685: C-----  E0 E0    CPX  #$E0
  0x041697 $9687: C-----  98       TYA  
  0x041698 $9688: C-----  F0 70    BEQ  $96FA
  0x04169A $968A: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04169B $968B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04169C $968C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04169D $968D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04169E $968E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04169F $968F: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x0416A0 $9690: C-----  F8       SED  
  0x0416A1 $9691: C-----  F8       SED  
  0x0416A2 $9692: C-----  F6 E1    INC  $E1,X
  0x0416A4 $9694: C-----  40       RTI  
  0x0416A5 $9695: C-----  40       RTI  
  0x0416A6 $9696: C-----  20 70 07 JSR  $0770
  0x0416A9 $9699: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0416AA $969A: C-----  09 1E    ORA  #$1E
  0x0416AC $969C: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0416AD $969D: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0416AE $969E: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0416AF $969F: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0416B0 $96A0: C-----  66 39    ROR  $39
  0x0416B2 $96A2: C-----  0E 01 00 ASL  $0001
  0x0416B5 $96A5: C-----  00       BRK  
  0x0416B6 $96A6: C-----  00       BRK  
  0x0416B7 $96A7: C-----  00       BRK  
  0x0416B8 $96A8: C-----  19 06 01 ORA  $0106,Y
  0x0416BB $96AB: C-----  00       BRK  
  0x0416BC $96AC: C-----  00       BRK  
  0x0416BD $96AD: C-----  00       BRK  
  0x0416BE $96AE: C-----  00       BRK  
  0x0416BF $96AF: C-----  00       BRK  
  0x0416C0 $96B0: C-----  F9 FE FD SBC  $FDFE,Y
  0x0416C3 $96B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0416C4 $96B4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0416C5 $96B5: C-----  00       BRK  
  0x0416C6 $96B6: C-----  00       BRK  
  0x0416C7 $96B7: C-----  00       BRK  
  0x0416C8 $96B8: C-----  06 01    ASL  $01
  0x0416CA $96BA: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0416CB $96BB: C-----  00       BRK  
  0x0416CC $96BC: C-----  00       BRK  
  0x0416CD $96BD: C-----  00       BRK  
  0x0416CE $96BE: C-----  00       BRK  
  0x0416CF $96BF: C-----  00       BRK  
  0x0416D0 $96C0: C-----  36 7A    ROL  $7A,X
  0x0416D2 $96C2: C-----  FE FF FF INC  $FFFF,X
  0x0416D5 $96C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0416D6 $96C6: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0416D7 $96C7: C-----  BA       TSX  
  0x0416D8 $96C8: C-----  C8       INY  
  0x0416D9 $96C9: C-----  84 00    STY  $00
  0x0416DB $96CB: C-----  00       BRK  
  0x0416DC $96CC: C-----  00       BRK  
  0x0416DD $96CD: C-----  00       BRK  
  0x0416DE $96CE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0416DF $96CF: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0416E0 $96D0: C-----  38       SEC  
  0x0416E1 $96D1: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0416E2 $96D2: C-----  !!UNDEF $92  ; unknown opcode, treating as data
  0x0416E3 $96D3: C-----  C6 9A    DEC  $9A
  0x0416E5 $96D5: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x0416E6 $96D6: C-----  38       SEC  
  0x0416E7 $96D7: C-----  00       BRK  
  0x0416E8 $96D8: C-----  00       BRK  
  0x0416E9 $96D9: C-----  38       SEC  
  0x0416EA $96DA: C-----  6C 38 64 JMP  ($6438)
  0x0416ED $96DD: C-----  28       PLP  
  0x0416EE $96DE: C-----  00       BRK  
  0x0416EF $96DF: C-----  00       BRK  
  0x0416F0 $96E0: C-----  56 AC    LSR  $AC,X
  0x0416F2 $96E2: C-----  78       SEI  
  0x0416F3 $96E3: C-----  E0 00    CPX  #$00
  0x0416F5 $96E5: C-----  00       BRK  
  0x0416F6 $96E6: C-----  00       BRK  
  0x0416F7 $96E7: C-----  00       BRK  
  0x0416F8 $96E8: C-----  A8       TAY  
  0x0416F9 $96E9: C-----  50 80    BVC  $966B
  0x0416FB $96EB: C-----  00       BRK  
  0x0416FC $96EC: C-----  00       BRK  
  0x0416FD $96ED: C-----  00       BRK  
  0x0416FE $96EE: C-----  00       BRK  
  0x0416FF $96EF: C-----  00       BRK  
  0x041700 $96F0: C-----  38       SEC  
  0x041701 $96F1: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x041702 $96F2: C-----  AA       TAX  
  0x041703 $96F3: C-----  86 BA    STX  $BA
  0x041705 $96F5: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x041706 $96F6: C-----  38       SEC  
  0x041707 $96F7: C-----  00       BRK  
  0x041708 $96F8: C-----  00       BRK  
  0x041709 $96F9: C-----  38       SEC  
  0x04170A $96FA: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04170B $96FB: C-----  78       SEI  
  0x04170C $96FC: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04170D $96FD: C-----  28       PLP  
  0x04170E $96FE: C-----  00       BRK  
  0x04170F $96FF: C-----  00       BRK  
  0x041710 $9700: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x041711 $9701: C-----  10 10    BPL  $9713
  0x041713 $9703: C-----  10 DC    BPL  $96E1
  0x041715 $9705: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041716 $9706: C-----  1E 00 C3 ASL  $C300,X
  0x041719 $9709: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04171A $970A: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04171B $970B: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04171C $970C: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x04171D $970D: C-----  00       BRK  
  0x04171E $970E: C-----  00       BRK  
  0x04171F $970F: C-----  00       BRK  
  0x041720 $9710: C-----  1E 0C 0C ASL  $0C0C,X
  0x041723 $9713: C-----  18       CLC  
  0x041724 $9714: C-----  60       RTS  
  0x041725 $9715: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041726 $9716: C-----  00       BRK  
  0x041727 $9717: C-----  00       BRK  
  0x041728 $9718: C-----  E0 F0    CPX  #$F0
  0x04172A $971A: C-----  F0 E0    BEQ  $96FC
  0x04172C $971C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04172D $971D: C-----  00       BRK  
  0x04172E $971E: C-----  00       BRK  
  0x04172F $971F: C-----  00       BRK  
  0x041730 $9720: C-----  00       BRK  
  0x041731 $9721: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x041732 $9722: C-----  A0 40    LDY  #$40
  0x041734 $9724: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x041735 $9725: C-----  A0 53    LDY  #$53
  0x041737 $9727: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x041738 $9728: C-----  00       BRK  
  0x041739 $9729: C-----  01 0C    ORA  ($0C,X)
  0x04173B $972B: C-----  20 27 77 JSR  $7727
  0x04173E $972E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04173F $972F: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x041740 $9730: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041741 $9731: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041742 $9732: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041743 $9733: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041744 $9734: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041745 $9735: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041746 $9736: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041747 $9737: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041748 $9738: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041749 $9739: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04174A $973A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04174B $973B: C-----  08       PHP  
  0x04174C $973C: C-----  10 20    BPL  $975E
  0x04174E $973E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04174F $973F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041750 $9740: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041751 $9741: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041752 $9742: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041753 $9743: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041754 $9744: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041755 $9745: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041756 $9746: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041757 $9747: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041758 $9748: C-----  01 02    ORA  ($02,X)
  0x04175A $974A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04175B $974B: C-----  08       PHP  
  0x04175C $974C: C-----  10 20    BPL  $976E
  0x04175E $974E: C-----  40       RTI  
  0x04175F $974F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041760 $9750: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041761 $9751: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041762 $9752: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041763 $9753: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041764 $9754: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041765 $9755: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041766 $9756: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041767 $9757: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041768 $9758: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041769 $9759: C-----  40       RTI  
  0x04176A $975A: C-----  20 10 08 JSR  $0810
  0x04176D $975D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04176E $975E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04176F $975F: C-----  01 FF    ORA  ($FF,X)
  0x041771 $9761: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041772 $9762: C-----  FD FF FF SBC  $FFFF,X
  0x041775 $9765: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041776 $9766: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041777 $9767: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041778 $9768: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041779 $9769: C-----  01 03    ORA  ($03,X)
  0x04177B $976B: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04177C $976C: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04177D $976D: C-----  F0 80    BEQ  $96EF
  0x04177F $976F: C-----  00       BRK  
  0x041780 $9770: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041781 $9771: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041782 $9772: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x041783 $9773: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041784 $9774: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041785 $9775: C-----  FE FF FF INC  $FFFF,X
  0x041788 $9778: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041789 $9779: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04178A $977A: C-----  C0 40    CPY  #$40
  0x04178C $977C: C-----  30 0F    BMI  $978D
  0x04178E $977E: C-----  01 00    ORA  ($00,X)
  0x041790 $9780: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x041791 $9781: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x041792 $9782: C-----  !!UNDEF $A3  ; unknown opcode, treating as data
  0x041793 $9783: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x041794 $9784: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041795 $9785: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041796 $9786: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041797 $9787: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041798 $9788: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x041799 $9789: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04179A $978A: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04179B $978B: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x04179C $978C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04179D $978D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04179E $978E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04179F $978F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0417A0 $9790: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417A1 $9791: C-----  F9 FC FE SBC  $FEFC,Y
  0x0417A4 $9794: C-----  FE FF 1E INC  $1EFF,X
  0x0417A7 $9797: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0417A8 $9798: C-----  0D 87 E3 ORA  $E387
  0x0417AB $979B: C-----  F0 F8    BEQ  $9795
  0x0417AD $979D: C-----  FD FF 02 SBC  $02FF,X
  0x0417B0 $97A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417B1 $97A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417B2 $97A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417B3 $97A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417B4 $97A4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417B5 $97A5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417B6 $97A6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417B7 $97A7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417B8 $97A8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0417B9 $97A9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0417BA $97AA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0417BB $97AB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0417BC $97AC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0417BD $97AD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0417BE $97AE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0417BF $97AF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0417C0 $97B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417C1 $97B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417C2 $97B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417C3 $97B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417C4 $97B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417C5 $97B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417C6 $97B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417C7 $97B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417C8 $97B8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417C9 $97B9: C-----  00       BRK  
  0x0417CA $97BA: C-----  00       BRK  
  0x0417CB $97BB: C-----  00       BRK  
  0x0417CC $97BC: C-----  00       BRK  
  0x0417CD $97BD: C-----  00       BRK  
  0x0417CE $97BE: C-----  00       BRK  
  0x0417CF $97BF: C-----  00       BRK  
  0x0417D0 $97C0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417D1 $97C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417D2 $97C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417D3 $97C3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417D4 $97C4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417D5 $97C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417D6 $97C6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417D7 $97C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417D8 $97C8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0417D9 $97C9: C-----  40       RTI  
  0x0417DA $97CA: C-----  20 10 08 JSR  $0810
  0x0417DD $97CD: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0417DE $97CE: C-----  FE 01 9F INC  $9F01,X
  0x0417E1 $97D1: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0417E2 $97D2: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x0417E3 $97D3: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0417E4 $97D4: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x0417E5 $97D5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0417E6 $97D6: C-----  01 00    ORA  ($00,X)
  0x0417E8 $97D8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417E9 $97D9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417EA $97DA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417EB $97DB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417EC $97DC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0417ED $97DD: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x0417EE $97DE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0417EF $97DF: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0417F0 $97E0: C-----  00       BRK  
  0x0417F1 $97E1: C-----  00       BRK  
  0x0417F2 $97E2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0417F3 $97E3: C-----  50 30    BVC  $9815
  0x0417F5 $97E5: C-----  98       TYA  
  0x0417F6 $97E6: C-----  68       PLA  
  0x0417F7 $97E7: C-----  A0 00    LDY  #$00
  0x0417F9 $97E9: C-----  00       BRK  
  0x0417FA $97EA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0417FB $97EB: C-----  50 70    BVC  $985D
  0x0417FD $97ED: C-----  F8       SED  
  0x0417FE $97EE: C-----  F8       SED  
  0x0417FF $97EF: C-----  E0 B8    CPX  #$B8
  0x041801 $97F1: C-----  B0 80    BCS  $9773
  0x041803 $97F3: C-----  C0 80    CPY  #$80
  0x041805 $97F5: C-----  00       BRK  
  0x041806 $97F6: C-----  00       BRK  
  0x041807 $97F7: C-----  00       BRK  
  0x041808 $97F8: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041809 $97F9: C-----  F8       SED  
  0x04180A $97FA: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04180B $97FB: C-----  E8       INX  
  0x04180C $97FC: C-----  E0 80    CPX  #$80
  0x04180E $97FE: C-----  C0 00    CPY  #$00
  0x041810 $9800: C-----  00       BRK  
  0x041811 $9801: C-----  00       BRK  
  0x041812 $9802: C-----  00       BRK  
  0x041813 $9803: C-----  00       BRK  
  0x041814 $9804: C-----  00       BRK  
  0x041815 $9805: C-----  00       BRK  
  0x041816 $9806: C-----  00       BRK  
  0x041817 $9807: C-----  00       BRK  
  0x041818 $9808: C-----  00       BRK  
  0x041819 $9809: C-----  00       BRK  
  0x04181A $980A: C-----  00       BRK  
  0x04181B $980B: C-----  00       BRK  
  0x04181C $980C: C-----  00       BRK  
  0x04181D $980D: C-----  00       BRK  
  0x04181E $980E: C-----  00       BRK  
  0x04181F $980F: C-----  00       BRK  
  0x041820 $9810: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041821 $9811: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041822 $9812: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041823 $9813: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041824 $9814: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041825 $9815: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041826 $9816: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041827 $9817: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041828 $9818: C-----  00       BRK  
  0x041829 $9819: C-----  00       BRK  
  0x04182A $981A: C-----  00       BRK  
  0x04182B $981B: C-----  00       BRK  
  0x04182C $981C: C-----  00       BRK  
  0x04182D $981D: C-----  00       BRK  
  0x04182E $981E: C-----  00       BRK  
  0x04182F $981F: C-----  00       BRK  
  0x041830 $9820: C-----  00       BRK  
  0x041831 $9821: C-----  00       BRK  
  0x041832 $9822: C-----  00       BRK  
  0x041833 $9823: C-----  00       BRK  
  0x041834 $9824: C-----  00       BRK  
  0x041835 $9825: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041836 $9826: C-----  30 40    BMI  $9868
  0x041838 $9828: C-----  00       BRK  
  0x041839 $9829: C-----  00       BRK  
  0x04183A $982A: C-----  00       BRK  
  0x04183B $982B: C-----  00       BRK  
  0x04183C $982C: C-----  00       BRK  
  0x04183D $982D: C-----  00       BRK  
  0x04183E $982E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04183F $982F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041840 $9830: C-----  00       BRK  
  0x041841 $9831: C-----  00       BRK  
  0x041842 $9832: C-----  00       BRK  
  0x041843 $9833: C-----  00       BRK  
  0x041844 $9834: C-----  00       BRK  
  0x041845 $9835: C-----  F0 7C    BEQ  $98B3
  0x041847 $9837: C-----  7E 00 00 ROR  $0000,X
  0x04184A $983A: C-----  00       BRK  
  0x04184B $983B: C-----  00       BRK  
  0x04184C $983C: C-----  00       BRK  
  0x04184D $983D: C-----  00       BRK  
  0x04184E $983E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04184F $983F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041850 $9840: C-----  00       BRK  
  0x041851 $9841: C-----  00       BRK  
  0x041852 $9842: C-----  00       BRK  
  0x041853 $9843: C-----  00       BRK  
  0x041854 $9844: C-----  00       BRK  
  0x041855 $9845: C-----  00       BRK  
  0x041856 $9846: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041857 $9847: C-----  39 00 00 AND  $0000,Y
  0x04185A $984A: C-----  00       BRK  
  0x04185B $984B: C-----  00       BRK  
  0x04185C $984C: C-----  00       BRK  
  0x04185D $984D: C-----  00       BRK  
  0x04185E $984E: C-----  00       BRK  
  0x04185F $984F: C-----  06 00    ASL  $00
  0x041861 $9851: C-----  00       BRK  
  0x041862 $9852: C-----  00       BRK  
  0x041863 $9853: C-----  00       BRK  
  0x041864 $9854: C-----  00       BRK  
  0x041865 $9855: C-----  00       BRK  
  0x041866 $9856: C-----  C0 F0    CPY  #$F0
  0x041868 $9858: C-----  00       BRK  
  0x041869 $9859: C-----  00       BRK  
  0x04186A $985A: C-----  00       BRK  
  0x04186B $985B: C-----  00       BRK  
  0x04186C $985C: C-----  00       BRK  
  0x04186D $985D: C-----  00       BRK  
  0x04186E $985E: C-----  00       BRK  
  0x04186F $985F: C-----  00       BRK  
  0x041870 $9860: C-----  00       BRK  
  0x041871 $9861: C-----  00       BRK  
  0x041872 $9862: C-----  00       BRK  
  0x041873 $9863: C-----  00       BRK  
  0x041874 $9864: C-----  01 01    ORA  ($01,X)
  0x041876 $9866: C-----  01 01    ORA  ($01,X)
  0x041878 $9868: C-----  00       BRK  
  0x041879 $9869: C-----  00       BRK  
  0x04187A $986A: C-----  00       BRK  
  0x04187B $986B: C-----  00       BRK  
  0x04187C $986C: C-----  00       BRK  
  0x04187D $986D: C-----  00       BRK  
  0x04187E $986E: C-----  00       BRK  
  0x04187F $986F: C-----  00       BRK  
  0x041880 $9870: C-----  70 F1    BVS  $9863
  0x041882 $9872: C-----  CE 8F BF DEC  $BF8F
  0x041885 $9875: C-----  C6 C8    DEC  $C8
  0x041887 $9877: C-----  C8       INY  
  0x041888 $9878: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041889 $9879: C-----  0E 31 70 ASL  $7031
  0x04188C $987C: C-----  40       RTI  
  0x04188D $987D: C-----  39 37 37 AND  $3737,Y
  0x041890 $9880: C-----  00       BRK  
  0x041891 $9881: C-----  01 01    ORA  ($01,X)
  0x041893 $9883: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x041894 $9884: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x041895 $9885: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041896 $9886: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041897 $9887: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041898 $9888: C-----  00       BRK  
  0x041899 $9889: C-----  00       BRK  
  0x04189A $988A: C-----  00       BRK  
  0x04189B $988B: C-----  01 01    ORA  ($01,X)
  0x04189D $988D: C-----  00       BRK  
  0x04189E $988E: C-----  00       BRK  
  0x04189F $988F: C-----  00       BRK  
  0x0418A0 $9890: C-----  C0 2F    CPY  #$2F
  0x0418A2 $9892: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0418A3 $9893: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0418A4 $9894: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0418A5 $9895: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0418A6 $9896: C-----  88       DEY  
  0x0418A7 $9897: C-----  10 3F    BPL  $98D8
  0x0418A9 $9899: C-----  D0 E0    BNE  $987B
  0x0418AB $989B: C-----  E0 E0    CPX  #$E0
  0x0418AD $989D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0418AE $989E: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0418AF $989F: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0418B0 $98A0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0418B1 $98A1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0418B2 $98A2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0418B3 $98A3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0418B4 $98A4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0418B5 $98A5: C-----  01 01    ORA  ($01,X)
  0x0418B7 $98A7: C-----  00       BRK  
  0x0418B8 $98A8: C-----  00       BRK  
  0x0418B9 $98A9: C-----  00       BRK  
  0x0418BA $98AA: C-----  00       BRK  
  0x0418BB $98AB: C-----  01 01    ORA  ($01,X)
  0x0418BD $98AD: C-----  00       BRK  
  0x0418BE $98AE: C-----  00       BRK  
  0x0418BF $98AF: C-----  00       BRK  
  0x0418C0 $98B0: C-----  10 10    BPL  $98C2
  0x0418C2 $98B2: C-----  18       CLC  
  0x0418C3 $98B3: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x0418C4 $98B4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0418C5 $98B5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0418C6 $98B6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0418C7 $98B7: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x0418C8 $98B8: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0418C9 $98B9: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0418CA $98BA: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x0418CB $98BB: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x0418CC $98BC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0418CD $98BD: C-----  C0 E0    CPY  #$E0
  0x0418CF $98BF: C-----  61 8F    ADC  ($8F,X)
  0x0418D1 $98C1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0418D2 $98C2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0418D3 $98C3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0418D4 $98C4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0418D5 $98C5: C-----  08       PHP  
  0x0418D6 $98C6: C-----  9D 7E 70 STA  $707E,X
  0x0418D9 $98C9: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0418DA $98CA: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0418DB $98CB: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0418DC $98CC: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0418DD $98CD: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0418DE $98CE: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x0418DF $98CF: C-----  81 00    STA  ($00,X)
  0x0418E1 $98D1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0418E2 $98D2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0418E3 $98D3: C-----  40       RTI  
  0x0418E4 $98D4: C-----  40       RTI  
  0x0418E5 $98D5: C-----  E0 60    CPX  #$60
  0x0418E7 $98D7: C-----  20 00 00 JSR  $0000
  0x0418EA $98DA: C-----  00       BRK  
  0x0418EB $98DB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0418EC $98DC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0418ED $98DD: C-----  00       BRK  
  0x0418EE $98DE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0418EF $98DF: C-----  C0 3E    CPY  #$3E
  0x0418F1 $98E1: C-----  3E 7E 83 ROL  $837E,X
  0x0418F4 $98E4: C-----  01 01    ORA  ($01,X)
  0x0418F6 $98E6: C-----  01 81    ORA  ($81,X)
  0x0418F8 $98E8: C-----  C1 C1    CMP  ($C1,X)
  0x0418FA $98EA: C-----  81 7C    STA  ($7C,X)
  0x0418FC $98EC: C-----  FE FE FE INC  $FEFE,X
  0x0418FF $98EF: C-----  7E 20 20 ROR  $2020,X
  0x041902 $98F2: C-----  20 40 C0 JSR  $C040
  0x041905 $98F5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041906 $98F6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041907 $98F7: C-----  00       BRK  
  0x041908 $98F8: C-----  C0 C0    CPY  #$C0
  0x04190A $98FA: C-----  C0 80    CPY  #$80
  0x04190C $98FC: C-----  00       BRK  
  0x04190D $98FD: C-----  00       BRK  
  0x04190E $98FE: C-----  00       BRK  
  0x04190F $98FF: C-----  00       BRK  
  0x041910 $9900: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041911 $9901: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041912 $9902: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x041913 $9903: C-----  51 D0    EOR  ($D0),Y
  0x041915 $9905: C-----  D9 BE 9C CMP  $9CBE,Y
  0x041918 $9908: C-----  00       BRK  
  0x041919 $9909: C-----  00       BRK  
  0x04191A $990A: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04191B $990B: C-----  2E 2F 26 ROL  $262F
  0x04191E $990E: C-----  41 63    EOR  ($63,X)
  0x041920 $9910: C-----  C0 30    CPY  #$30
  0x041922 $9912: C-----  38       SEC  
  0x041923 $9913: C-----  E4 E4    CPX  $E4
  0x041925 $9915: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x041926 $9916: C-----  66 26    ROR  $26
  0x041928 $9918: C-----  00       BRK  
  0x041929 $9919: C-----  C0 C0    CPY  #$C0
  0x04192B $991B: C-----  18       CLC  
  0x04192C $991C: C-----  18       CLC  
  0x04192D $991D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04192E $991E: C-----  98       TYA  
  0x04192F $991F: C-----  D8       CLD  
  0x041930 $9920: C-----  F8       SED  
  0x041931 $9921: C-----  24 12    BIT  $12
  0x041933 $9923: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x041934 $9924: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x041935 $9925: C-----  BD 79 79 LDA  $7979,X
  0x041938 $9928: C-----  00       BRK  
  0x041939 $9929: C-----  D8       CLD  
  0x04193A $992A: C-----  EC EC EC CPX  $ECEC
  0x04193D $992D: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04193E $992E: C-----  86 86    STX  $86
  0x041940 $9930: C-----  26 EA    ROL  $EA
  0x041942 $9932: C-----  F6 E4    INC  $E4,X
  0x041944 $9934: C-----  38       SEC  
  0x041945 $9935: C-----  70 C0    BVS  $98F7
  0x041947 $9937: C-----  00       BRK  
  0x041948 $9938: C-----  D8       CLD  
  0x041949 $9939: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04194A $993A: C-----  08       PHP  
  0x04194B $993B: C-----  18       CLC  
  0x04194C $993C: C-----  C0 80    CPY  #$80
  0x04194E $993E: C-----  00       BRK  
  0x04194F $993F: C-----  00       BRK  
  0x041950 $9940: C-----  00       BRK  
  0x041951 $9941: C-----  38       SEC  
  0x041952 $9942: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x041953 $9943: C-----  AA       TAX  
  0x041954 $9944: C-----  86 BA    STX  $BA
  0x041956 $9946: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x041957 $9947: C-----  38       SEC  
  0x041958 $9948: C-----  00       BRK  
  0x041959 $9949: C-----  00       BRK  
  0x04195A $994A: C-----  38       SEC  
  0x04195B $994B: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04195C $994C: C-----  78       SEI  
  0x04195D $994D: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04195E $994E: C-----  28       PLP  
  0x04195F $994F: C-----  00       BRK  
  0x041960 $9950: C-----  65 65    ADC  $65
  0x041962 $9952: C-----  65 65    ADC  $65
  0x041964 $9954: C-----  65 65    ADC  $65
  0x041966 $9956: C-----  65 65    ADC  $65
  0x041968 $9958: C-----  00       BRK  
  0x041969 $9959: C-----  00       BRK  
  0x04196A $995A: C-----  00       BRK  
  0x04196B $995B: C-----  00       BRK  
  0x04196C $995C: C-----  00       BRK  
  0x04196D $995D: C-----  00       BRK  
  0x04196E $995E: C-----  00       BRK  
  0x04196F $995F: C-----  00       BRK  
  0x041970 $9960: C-----  A5 A5    LDA  $A5
  0x041972 $9962: C-----  A5 A5    LDA  $A5
  0x041974 $9964: C-----  A5 A5    LDA  $A5
  0x041976 $9966: C-----  A5 A5    LDA  $A5
  0x041978 $9968: C-----  10 10    BPL  $997A
  0x04197A $996A: C-----  10 10    BPL  $997C
  0x04197C $996C: C-----  10 10    BPL  $997E
  0x04197E $996E: C-----  10 10    BPL  $9980
  0x041980 $9970: C-----  75 75    ADC  $75,X
  0x041982 $9972: C-----  75 75    ADC  $75,X
  0x041984 $9974: C-----  75 75    ADC  $75,X
  0x041986 $9976: C-----  75 75    ADC  $75,X
  0x041988 $9978: C-----  20 20 20 JSR  $2020
  0x04198B $997B: C-----  20 20 20 JSR  $2020
  0x04198E $997E: C-----  20 20 AC JSR  $AC20
  0x041991 $9981: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x041992 $9982: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x041993 $9983: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x041994 $9984: C-----  38       SEC  
  0x041995 $9985: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x041996 $9986: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041997 $9987: C-----  00       BRK  
  0x041998 $9988: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x041999 $9989: C-----  60       RTS  
  0x04199A $998A: C-----  70 30    BVS  $99BC
  0x04199C $998C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04199D $998D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04199E $998E: C-----  00       BRK  
  0x04199F $998F: C-----  00       BRK  
  0x0419A0 $9990: C-----  B9 0E 0E LDA  $0E0E,Y
  0x0419A3 $9993: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0419A4 $9994: C-----  E8       INX  
  0x0419A5 $9995: C-----  F0 C0    BEQ  $9957
  0x0419A7 $9997: C-----  00       BRK  
  0x0419A8 $9998: C-----  46 F0    LSR  $F0
  0x0419AA $999A: C-----  F0 E8    BEQ  $9984
  0x0419AC $999C: C-----  10 00    BPL  $999E
  0x0419AE $999E: C-----  00       BRK  
  0x0419AF $999F: C-----  00       BRK  
  0x0419B0 $99A0: C-----  00       BRK  
  0x0419B1 $99A1: C-----  00       BRK  
  0x0419B2 $99A2: C-----  00       BRK  
  0x0419B3 $99A3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0419B4 $99A4: C-----  0D 19 2E ORA  $2E19
  0x0419B7 $99A7: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0419B8 $99A8: C-----  00       BRK  
  0x0419B9 $99A9: C-----  00       BRK  
  0x0419BA $99AA: C-----  00       BRK  
  0x0419BB $99AB: C-----  00       BRK  
  0x0419BC $99AC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0419BD $99AD: C-----  06 11    ASL  $11
  0x0419BF $99AF: C-----  10 00    BPL  $99B1
  0x0419C1 $99B1: C-----  00       BRK  
  0x0419C2 $99B2: C-----  00       BRK  
  0x0419C3 $99B3: C-----  C0 F0    CPY  #$F0
  0x0419C5 $99B5: C-----  98       TYA  
  0x0419C6 $99B6: C-----  48       PHA  
  0x0419C7 $99B7: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0419C8 $99B8: C-----  00       BRK  
  0x0419C9 $99B9: C-----  00       BRK  
  0x0419CA $99BA: C-----  00       BRK  
  0x0419CB $99BB: C-----  00       BRK  
  0x0419CC $99BC: C-----  00       BRK  
  0x0419CD $99BD: C-----  60       RTS  
  0x0419CE $99BE: C-----  B0 80    BCS  $9940
  0x0419D0 $99C0: C-----  00       BRK  
  0x0419D1 $99C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0419D2 $99C2: C-----  00       BRK  
  0x0419D3 $99C3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0419D4 $99C4: C-----  00       BRK  
  0x0419D5 $99C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0419D6 $99C6: C-----  00       BRK  
  0x0419D7 $99C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0419D8 $99C8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0419D9 $99C9: C-----  00       BRK  
  0x0419DA $99CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0419DB $99CB: C-----  00       BRK  
  0x0419DC $99CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0419DD $99CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0419DE $99CE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0419DF $99CF: C-----  00       BRK  
  0x0419E0 $99D0: C-----  AA       TAX  
  0x0419E1 $99D1: C-----  AA       TAX  
  0x0419E2 $99D2: C-----  AA       TAX  
  0x0419E3 $99D3: C-----  AA       TAX  
  0x0419E4 $99D4: C-----  AA       TAX  
  0x0419E5 $99D5: C-----  AA       TAX  
  0x0419E6 $99D6: C-----  AA       TAX  
  0x0419E7 $99D7: C-----  AA       TAX  
  0x0419E8 $99D8: C-----  40       RTI  
  0x0419E9 $99D9: C-----  40       RTI  
  0x0419EA $99DA: C-----  40       RTI  
  0x0419EB $99DB: C-----  40       RTI  
  0x0419EC $99DC: C-----  40       RTI  
  0x0419ED $99DD: C-----  40       RTI  
  0x0419EE $99DE: C-----  40       RTI  
  0x0419EF $99DF: C-----  40       RTI  
  0x0419F0 $99E0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0419F1 $99E1: C-----  00       BRK  
  0x0419F2 $99E2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0419F3 $99E3: C-----  00       BRK  
  0x0419F4 $99E4: C-----  00       BRK  
  0x0419F5 $99E5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0419F6 $99E6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0419F7 $99E7: C-----  00       BRK  
  0x0419F8 $99E8: C-----  00       BRK  
  0x0419F9 $99E9: C-----  00       BRK  
  0x0419FA $99EA: C-----  00       BRK  
  0x0419FB $99EB: C-----  00       BRK  
  0x0419FC $99EC: C-----  00       BRK  
  0x0419FD $99ED: C-----  00       BRK  
  0x0419FE $99EE: C-----  00       BRK  
  0x0419FF $99EF: C-----  00       BRK  
  0x041A00 $99F0: C-----  AE AE AE LDX  $AEAE
  0x041A03 $99F3: C-----  AE AE AE LDX  $AEAE
  0x041A06 $99F6: C-----  AE AE 44 LDX  $44AE
  0x041A09 $99F9: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x041A0A $99FA: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x041A0B $99FB: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x041A0C $99FC: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x041A0D $99FD: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x041A0E $99FE: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x041A0F $99FF: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x041A10 $9A00: C-----  50 30    BVC  $9A32
  0x041A12 $9A02: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041A13 $9A03: C-----  00       BRK  
  0x041A14 $9A04: C-----  00       BRK  
  0x041A15 $9A05: C-----  00       BRK  
  0x041A16 $9A06: C-----  00       BRK  
  0x041A17 $9A07: C-----  00       BRK  
  0x041A18 $9A08: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x041A19 $9A09: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041A1A $9A0A: C-----  00       BRK  
  0x041A1B $9A0B: C-----  00       BRK  
  0x041A1C $9A0C: C-----  00       BRK  
  0x041A1D $9A0D: C-----  00       BRK  
  0x041A1E $9A0E: C-----  00       BRK  
  0x041A1F $9A0F: C-----  00       BRK  
  0x041A20 $9A10: C-----  !!UNDEF $72  ; unknown opcode, treating as data
  0x041A21 $9A11: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x041A22 $9A12: C-----  F0 00    BEQ  $9A14
  0x041A24 $9A14: C-----  00       BRK  
  0x041A25 $9A15: C-----  00       BRK  
  0x041A26 $9A16: C-----  00       BRK  
  0x041A27 $9A17: C-----  00       BRK  
  0x041A28 $9A18: C-----  8C 80 00 STY  $0080
  0x041A2B $9A1B: C-----  00       BRK  
  0x041A2C $9A1C: C-----  00       BRK  
  0x041A2D $9A1D: C-----  00       BRK  
  0x041A2E $9A1E: C-----  00       BRK  
  0x041A2F $9A1F: C-----  00       BRK  
  0x041A30 $9A20: C-----  01 01    ORA  ($01,X)
  0x041A32 $9A22: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041A33 $9A23: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x041A34 $9A24: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x041A35 $9A25: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x041A36 $9A26: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x041A37 $9A27: C-----  01 00    ORA  ($00,X)
  0x041A39 $9A29: C-----  00       BRK  
  0x041A3A $9A2A: C-----  00       BRK  
  0x041A3B $9A2B: C-----  01 01    ORA  ($01,X)
  0x041A3D $9A2D: C-----  01 01    ORA  ($01,X)
  0x041A3F $9A2F: C-----  00       BRK  
  0x041A40 $9A30: C-----  78       SEI  
  0x041A41 $9A31: C-----  F8       SED  
  0x041A42 $9A32: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x041A43 $9A33: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x041A44 $9A34: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x041A45 $9A35: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x041A46 $9A36: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x041A47 $9A37: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x041A48 $9A38: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x041A49 $9A39: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041A4A $9A3A: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x041A4B $9A3B: C-----  B8       CLV  
  0x041A4C $9A3C: C-----  BC BC D8 LDY  $D8BC,X
  0x041A4F $9A3F: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x041A50 $9A40: C-----  00       BRK  
  0x041A51 $9A41: C-----  00       BRK  
  0x041A52 $9A42: C-----  00       BRK  
  0x041A53 $9A43: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041A54 $9A44: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x041A55 $9A45: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x041A56 $9A46: C-----  EC B8 00 CPX  $00B8
  0x041A59 $9A49: C-----  00       BRK  
  0x041A5A $9A4A: C-----  00       BRK  
  0x041A5B $9A4B: C-----  00       BRK  
  0x041A5C $9A4C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x041A5D $9A4D: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x041A5E $9A4E: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x041A5F $9A4F: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x041A60 $9A50: C-----  00       BRK  
  0x041A61 $9A51: C-----  00       BRK  
  0x041A62 $9A52: C-----  00       BRK  
  0x041A63 $9A53: C-----  C0 F0    CPY  #$F0
  0x041A65 $9A55: C-----  8C 72 7A STY  $7A72
  0x041A68 $9A58: C-----  00       BRK  
  0x041A69 $9A59: C-----  00       BRK  
  0x041A6A $9A5A: C-----  00       BRK  
  0x041A6B $9A5B: C-----  00       BRK  
  0x041A6C $9A5C: C-----  00       BRK  
  0x041A6D $9A5D: C-----  70 8C    BVS  $99EB
  0x041A6F $9A5F: C-----  84 3F    STY  $3F
  0x041A71 $9A61: C-----  3D 68 C4 AND  $C468,X
  0x041A74 $9A64: C-----  C4 C5    CPY  $C5
  0x041A76 $9A66: C-----  C9 7B    CMP  #$7B
  0x041A78 $9A68: C-----  C0 C2    CPY  #$C2
  0x041A7A $9A6A: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x041A7B $9A6B: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x041A7C $9A6C: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x041A7D $9A6D: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x041A7E $9A6E: C-----  36 84    ROL  $84,X
  0x041A80 $9A70: C-----  00       BRK  
  0x041A81 $9A71: C-----  00       BRK  
  0x041A82 $9A72: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041A83 $9A73: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041A84 $9A74: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041A85 $9A75: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041A86 $9A76: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041A87 $9A77: C-----  00       BRK  
  0x041A88 $9A78: C-----  00       BRK  
  0x041A89 $9A79: C-----  00       BRK  
  0x041A8A $9A7A: C-----  00       BRK  
  0x041A8B $9A7B: C-----  00       BRK  
  0x041A8C $9A7C: C-----  00       BRK  
  0x041A8D $9A7D: C-----  00       BRK  
  0x041A8E $9A7E: C-----  00       BRK  
  0x041A8F $9A7F: C-----  00       BRK  
  0x041A90 $9A80: C-----  01 00    ORA  ($00,X)
  0x041A92 $9A82: C-----  00       BRK  
  0x041A93 $9A83: C-----  00       BRK  
  0x041A94 $9A84: C-----  00       BRK  
  0x041A95 $9A85: C-----  00       BRK  
  0x041A96 $9A86: C-----  00       BRK  
  0x041A97 $9A87: C-----  00       BRK  
  0x041A98 $9A88: C-----  00       BRK  
  0x041A99 $9A89: C-----  00       BRK  
  0x041A9A $9A8A: C-----  00       BRK  
  0x041A9B $9A8B: C-----  00       BRK  
  0x041A9C $9A8C: C-----  00       BRK  
  0x041A9D $9A8D: C-----  00       BRK  
  0x041A9E $9A8E: C-----  00       BRK  
  0x041A9F $9A8F: C-----  00       BRK  
  0x041AA0 $9A90: C-----  78       SEI  
  0x041AA1 $9A91: C-----  F8       SED  
  0x041AA2 $9A92: C-----  98       TYA  
  0x041AA3 $9A93: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x041AA4 $9A94: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041AA5 $9A95: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041AA6 $9A96: C-----  00       BRK  
  0x041AA7 $9A97: C-----  00       BRK  
  0x041AA8 $9A98: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x041AA9 $9A99: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041AAA $9A9A: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x041AAB $9A9B: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x041AAC $9A9C: C-----  00       BRK  
  0x041AAD $9A9D: C-----  00       BRK  
  0x041AAE $9A9E: C-----  00       BRK  
  0x041AAF $9A9F: C-----  00       BRK  
  0x041AB0 $9AA0: C-----  00       BRK  
  0x041AB1 $9AA1: C-----  00       BRK  
  0x041AB2 $9AA2: C-----  00       BRK  
  0x041AB3 $9AA3: C-----  00       BRK  
  0x041AB4 $9AA4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041AB5 $9AA5: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x041AB6 $9AA6: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x041AB7 $9AA7: C-----  19 00 00 ORA  $0000,Y
  0x041ABA $9AAA: C-----  00       BRK  
  0x041ABB $9AAB: C-----  00       BRK  
  0x041ABC $9AAC: C-----  00       BRK  
  0x041ABD $9AAD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041ABE $9AAE: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x041ABF $9AAF: C-----  06 00    ASL  $00
  0x041AC1 $9AB1: C-----  00       BRK  
  0x041AC2 $9AB2: C-----  00       BRK  
  0x041AC3 $9AB3: C-----  00       BRK  
  0x041AC4 $9AB4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041AC5 $9AB5: C-----  E0 20    CPX  #$20
  0x041AC7 $9AB7: C-----  50 00    BVC  $9AB9
  0x041AC9 $9AB9: C-----  00       BRK  
  0x041ACA $9ABA: C-----  00       BRK  
  0x041ACB $9ABB: C-----  00       BRK  
  0x041ACC $9ABC: C-----  00       BRK  
  0x041ACD $9ABD: C-----  00       BRK  
  0x041ACE $9ABE: C-----  C0 A0    CPY  #$A0
  0x041AD0 $9AC0: C-----  3D 3A 26 AND  $263A,X
  0x041AD3 $9AC3: C-----  CC B0 C0 CPY  $C0B0
  0x041AD6 $9AC6: C-----  00       BRK  
  0x041AD7 $9AC7: C-----  00       BRK  
  0x041AD8 $9AC8: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x041AD9 $9AC9: C-----  C4 D8    CPY  $D8
  0x041ADB $9ACB: C-----  30 40    BMI  $9B0D
  0x041ADD $9ACD: C-----  00       BRK  
  0x041ADE $9ACE: C-----  00       BRK  
  0x041ADF $9ACF: C-----  00       BRK  
  0x041AE0 $9AD0: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x041AE1 $9AD1: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x041AE2 $9AD2: C-----  F1 49    SBC  ($49),Y
  0x041AE4 $9AD4: C-----  2E 1E 0F ROL  $0F1E
  0x041AE7 $9AD7: C-----  00       BRK  
  0x041AE8 $9AD8: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x041AE9 $9AD9: C-----  1D 0E 36 ORA  $360E,X
  0x041AEC $9ADC: C-----  11 01    ORA  ($01),Y
  0x041AEE $9ADE: C-----  00       BRK  
  0x041AEF $9ADF: C-----  00       BRK  
  0x041AF0 $9AE0: C-----  16 16    ASL  $16,X
  0x041AF2 $9AE2: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x041AF3 $9AE3: C-----  0D 03 00 ORA  $0003
  0x041AF6 $9AE6: C-----  00       BRK  
  0x041AF7 $9AE7: C-----  00       BRK  
  0x041AF8 $9AE8: C-----  09 09    ORA  #$09
  0x041AFA $9AEA: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x041AFB $9AEB: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x041AFC $9AEC: C-----  00       BRK  
  0x041AFD $9AED: C-----  00       BRK  
  0x041AFE $9AEE: C-----  00       BRK  
  0x041AFF $9AEF: C-----  00       BRK  
  0x041B00 $9AF0: C-----  D0 50    BNE  $9B42
  0x041B02 $9AF2: C-----  A0 60    LDY  #$60
  0x041B04 $9AF4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041B05 $9AF5: C-----  00       BRK  
  0x041B06 $9AF6: C-----  00       BRK  
  0x041B07 $9AF7: C-----  00       BRK  
  0x041B08 $9AF8: C-----  20 A0 40 JSR  $40A0
  0x041B0B $9AFB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041B0C $9AFC: C-----  00       BRK  
  0x041B0D $9AFD: C-----  00       BRK  
  0x041B0E $9AFE: C-----  00       BRK  
  0x041B0F $9AFF: C-----  00       BRK  
  0x041B10 $9B00: C-----  7E 64 56 ROR  $5664,X
  0x041B13 $9B03: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x041B14 $9B04: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x041B15 $9B05: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x041B16 $9B06: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x041B17 $9B07: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041B18 $9B08: C-----  01 1B    ORA  ($1B,X)
  0x041B1A $9B0A: C-----  29 10    AND  #$10
  0x041B1C $9B0C: C-----  18       CLC  
  0x041B1D $9B0D: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x041B1E $9B0E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041B1F $9B0F: C-----  00       BRK  
  0x041B20 $9B10: C-----  EC 64 FC CPX  $FC64
  0x041B23 $9B13: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x041B24 $9B14: C-----  28       PLP  
  0x041B25 $9B15: C-----  F8       SED  
  0x041B26 $9B16: C-----  F0 C0    BEQ  $9AD8
  0x041B28 $9B18: C-----  10 98    BPL  $9AB2
  0x041B2A $9B1A: C-----  00       BRK  
  0x041B2B $9B1B: C-----  60       RTS  
  0x041B2C $9B1C: C-----  D0 00    BNE  $9B1E
  0x041B2E $9B1E: C-----  00       BRK  
  0x041B2F $9B1F: C-----  00       BRK  
  0x041B30 $9B20: C-----  00       BRK  
  0x041B31 $9B21: C-----  00       BRK  
  0x041B32 $9B22: C-----  00       BRK  
  0x041B33 $9B23: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041B34 $9B24: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x041B35 $9B25: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x041B36 $9B26: C-----  2C 3C 00 BIT  $003C
  0x041B39 $9B29: C-----  00       BRK  
  0x041B3A $9B2A: C-----  00       BRK  
  0x041B3B $9B2B: C-----  00       BRK  
  0x041B3C $9B2C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x041B3D $9B2D: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x041B3E $9B2E: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x041B3F $9B2F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041B40 $9B30: C-----  00       BRK  
  0x041B41 $9B31: C-----  00       BRK  
  0x041B42 $9B32: C-----  00       BRK  
  0x041B43 $9B33: C-----  C0 20    CPY  #$20
  0x041B45 $9B35: C-----  B0 E8    BCS  $9B1F
  0x041B47 $9B37: C-----  E8       INX  
  0x041B48 $9B38: C-----  00       BRK  
  0x041B49 $9B39: C-----  00       BRK  
  0x041B4A $9B3A: C-----  00       BRK  
  0x041B4B $9B3B: C-----  00       BRK  
  0x041B4C $9B3C: C-----  C0 40    CPY  #$40
  0x041B4E $9B3E: C-----  10 10    BPL  $9B50
  0x041B50 $9B40: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041B51 $9B41: C-----  00       BRK  
  0x041B52 $9B42: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041B53 $9B43: C-----  00       BRK  
  0x041B54 $9B44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041B55 $9B45: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041B56 $9B46: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041B57 $9B47: C-----  00       BRK  
  0x041B58 $9B48: C-----  00       BRK  
  0x041B59 $9B49: C-----  00       BRK  
  0x041B5A $9B4A: C-----  00       BRK  
  0x041B5B $9B4B: C-----  00       BRK  
  0x041B5C $9B4C: C-----  00       BRK  
  0x041B5D $9B4D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041B5E $9B4E: C-----  00       BRK  
  0x041B5F $9B4F: C-----  00       BRK  
  0x041B60 $9B50: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x041B61 $9B51: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x041B62 $9B52: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x041B63 $9B53: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x041B64 $9B54: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x041B65 $9B55: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x041B66 $9B56: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x041B67 $9B57: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x041B68 $9B58: C-----  10 10    BPL  $9B6A
  0x041B6A $9B5A: C-----  10 10    BPL  $9B6C
  0x041B6C $9B5C: C-----  10 10    BPL  $9B6E
  0x041B6E $9B5E: C-----  10 10    BPL  $9B70
  0x041B70 $9B60: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041B71 $9B61: C-----  00       BRK  
  0x041B72 $9B62: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041B73 $9B63: C-----  00       BRK  
  0x041B74 $9B64: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041B75 $9B65: C-----  00       BRK  
  0x041B76 $9B66: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041B77 $9B67: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041B78 $9B68: C-----  00       BRK  
  0x041B79 $9B69: C-----  00       BRK  
  0x041B7A $9B6A: C-----  00       BRK  
  0x041B7B $9B6B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041B7C $9B6C: C-----  00       BRK  
  0x041B7D $9B6D: C-----  00       BRK  
  0x041B7E $9B6E: C-----  00       BRK  
  0x041B7F $9B6F: C-----  00       BRK  
  0x041B80 $9B70: C-----  4A       LSR  A
  0x041B81 $9B71: C-----  4A       LSR  A
  0x041B82 $9B72: C-----  4A       LSR  A
  0x041B83 $9B73: C-----  4A       LSR  A
  0x041B84 $9B74: C-----  4A       LSR  A
  0x041B85 $9B75: C-----  4A       LSR  A
  0x041B86 $9B76: C-----  4A       LSR  A
  0x041B87 $9B77: C-----  4A       LSR  A
  0x041B88 $9B78: C-----  20 20 20 JSR  $2020
  0x041B8B $9B7B: C-----  20 20 20 JSR  $2020
  0x041B8E $9B7E: C-----  20 20 2E JSR  $2E20
  0x041B91 $9B81: C-----  2E 39 1B ROL  $1B39
  0x041B94 $9B84: C-----  1E 07 00 ASL  $0007,X
  0x041B97 $9B87: C-----  00       BRK  
  0x041B98 $9B88: C-----  11 11    ORA  ($11),Y
  0x041B9A $9B8A: C-----  06 04    ASL  $04
  0x041B9C $9B8C: C-----  01 00    ORA  ($00,X)
  0x041B9E $9B8E: C-----  00       BRK  
  0x041B9F $9B8F: C-----  00       BRK  
  0x041BA0 $9B90: C-----  D8       CLD  
  0x041BA1 $9B91: C-----  58       CLI  
  0x041BA2 $9B92: C-----  E8       INX  
  0x041BA3 $9B93: C-----  D0 60    BNE  $9BF5
  0x041BA5 $9B95: C-----  C0 00    CPY  #$00
  0x041BA7 $9B97: C-----  00       BRK  
  0x041BA8 $9B98: C-----  20 A0 10 JSR  $10A0
  0x041BAB $9B9B: C-----  20 80 00 JSR  $0080
  0x041BAE $9B9E: C-----  00       BRK  
  0x041BAF $9B9F: C-----  00       BRK  
  0x041BB0 $9BA0: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x041BB1 $9BA1: C-----  !!UNDEF $5A  ; unknown opcode, treating as data
  0x041BB2 $9BA2: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x041BB3 $9BA3: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x041BB4 $9BA4: C-----  C5 AB    CMP  $AB
  0x041BB6 $9BA6: C-----  76 3C    ROR  $3C,X
  0x041BB8 $9BA8: C-----  00       BRK  
  0x041BB9 $9BA9: C-----  24 38    BIT  $38
  0x041BBB $9BAB: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x041BBC $9BAC: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x041BBD $9BAD: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x041BBE $9BAE: C-----  08       PHP  
  0x041BBF $9BAF: C-----  00       BRK  
  0x041BC0 $9BB0: C-----  38       SEC  
  0x041BC1 $9BB1: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x041BC2 $9BB2: C-----  !!UNDEF $92  ; unknown opcode, treating as data
  0x041BC3 $9BB3: C-----  C6 9A    DEC  $9A
  0x041BC5 $9BB5: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x041BC6 $9BB6: C-----  38       SEC  
  0x041BC7 $9BB7: C-----  00       BRK  
  0x041BC8 $9BB8: C-----  00       BRK  
  0x041BC9 $9BB9: C-----  38       SEC  
  0x041BCA $9BBA: C-----  6C 38 64 JMP  ($6438)
  0x041BCD $9BBD: C-----  28       PLP  
  0x041BCE $9BBE: C-----  00       BRK  
  0x041BCF $9BBF: C-----  00       BRK  
  0x041BD0 $9BC0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041BD1 $9BC1: C-----  00       BRK  
  0x041BD2 $9BC2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041BD3 $9BC3: C-----  00       BRK  
  0x041BD4 $9BC4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041BD5 $9BC5: C-----  00       BRK  
  0x041BD6 $9BC6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041BD7 $9BC7: C-----  00       BRK  
  0x041BD8 $9BC8: C-----  00       BRK  
  0x041BD9 $9BC9: C-----  00       BRK  
  0x041BDA $9BCA: C-----  00       BRK  
  0x041BDB $9BCB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041BDC $9BCC: C-----  00       BRK  
  0x041BDD $9BCD: C-----  00       BRK  
  0x041BDE $9BCE: C-----  00       BRK  
  0x041BDF $9BCF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041BE0 $9BD0: C-----  55 55    EOR  $55,X
  0x041BE2 $9BD2: C-----  55 55    EOR  $55,X
  0x041BE4 $9BD4: C-----  55 55    EOR  $55,X
  0x041BE6 $9BD6: C-----  55 55    EOR  $55,X
  0x041BE8 $9BD8: C-----  AE AE AE LDX  $AEAE
  0x041BEB $9BDB: C-----  AE AE AE LDX  $AEAE
  0x041BEE $9BDE: C-----  AE AE 00 LDX  $00AE
  0x041BF1 $9BE1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041BF2 $9BE2: C-----  00       BRK  
  0x041BF3 $9BE3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041BF4 $9BE4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041BF5 $9BE5: C-----  00       BRK  
  0x041BF6 $9BE6: C-----  00       BRK  
  0x041BF7 $9BE7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041BF8 $9BE8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041BF9 $9BE9: C-----  00       BRK  
  0x041BFA $9BEA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041BFB $9BEB: C-----  00       BRK  
  0x041BFC $9BEC: C-----  00       BRK  
  0x041BFD $9BED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041BFE $9BEE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041BFF $9BEF: C-----  00       BRK  
  0x041C00 $9BF0: C-----  59 59 59 EOR  $5959,Y
  0x041C03 $9BF3: C-----  59 59 59 EOR  $5959,Y
  0x041C06 $9BF6: C-----  59 59 A6 EOR  $A659,Y
  0x041C09 $9BF9: C-----  A6 A6    LDX  $A6
  0x041C0B $9BFB: C-----  A6 A6    LDX  $A6
  0x041C0D $9BFD: C-----  A6 A6    LDX  $A6
  0x041C0F $9BFF: C-----  A6 00    LDX  $00
  0x041C11 $9C01: C-----  00       BRK  
  0x041C12 $9C02: C-----  00       BRK  
  0x041C13 $9C03: C-----  00       BRK  
  0x041C14 $9C04: C-----  00       BRK  
  0x041C15 $9C05: C-----  00       BRK  
  0x041C16 $9C06: C-----  00       BRK  
  0x041C17 $9C07: C-----  00       BRK  
  0x041C18 $9C08: C-----  38       SEC  
  0x041C19 $9C09: C-----  00       BRK  
  0x041C1A $9C0A: C-----  00       BRK  
  0x041C1B $9C0B: C-----  00       BRK  
  0x041C1C $9C0C: C-----  00       BRK  
  0x041C1D $9C0D: C-----  00       BRK  
  0x041C1E $9C0E: C-----  00       BRK  
  0x041C1F $9C0F: C-----  00       BRK  
  0x041C20 $9C10: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041C21 $9C11: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041C22 $9C12: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041C23 $9C13: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041C24 $9C14: C-----  40       RTI  
  0x041C25 $9C15: C-----  40       RTI  
  0x041C26 $9C16: C-----  40       RTI  
  0x041C27 $9C17: C-----  40       RTI  
  0x041C28 $9C18: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041C29 $9C19: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041C2A $9C1A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041C2B $9C1B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041C2C $9C1C: C-----  C0 C0    CPY  #$C0
  0x041C2E $9C1E: C-----  C0 C0    CPY  #$C0
  0x041C30 $9C20: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041C31 $9C21: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041C32 $9C22: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041C33 $9C23: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041C34 $9C24: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041C35 $9C25: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041C36 $9C26: C-----  01 01    ORA  ($01,X)
  0x041C38 $9C28: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041C39 $9C29: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041C3A $9C2A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041C3B $9C2B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041C3C $9C2C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041C3D $9C2D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041C3E $9C2E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041C3F $9C2F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041C40 $9C30: C-----  FE FE FE INC  $FEFE,X
  0x041C43 $9C33: C-----  FE FF FF INC  $FFFF,X
  0x041C46 $9C36: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041C47 $9C37: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041C48 $9C38: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041C49 $9C39: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041C4A $9C3A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041C4B $9C3B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041C4C $9C3C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041C4D $9C3D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041C4E $9C3E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041C4F $9C3F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041C50 $9C40: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041C51 $9C41: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041C52 $9C42: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041C53 $9C43: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041C54 $9C44: C-----  01 00    ORA  ($00,X)
  0x041C56 $9C46: C-----  00       BRK  
  0x041C57 $9C47: C-----  00       BRK  
  0x041C58 $9C48: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041C59 $9C49: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041C5A $9C4A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041C5B $9C4B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041C5C $9C4C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041C5D $9C4D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041C5E $9C4E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041C5F $9C4F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041C60 $9C50: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x041C61 $9C51: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x041C62 $9C52: C-----  F8       SED  
  0x041C63 $9C53: C-----  F8       SED  
  0x041C64 $9C54: C-----  F8       SED  
  0x041C65 $9C55: C-----  E0 00    CPX  #$00
  0x041C67 $9C57: C-----  00       BRK  
  0x041C68 $9C58: C-----  FE FE FF INC  $FFFE,X
  0x041C6B $9C5B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041C6C $9C5C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041C6D $9C5D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041C6E $9C5E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041C6F $9C5F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041C70 $9C60: C-----  00       BRK  
  0x041C71 $9C61: C-----  00       BRK  
  0x041C72 $9C62: C-----  00       BRK  
  0x041C73 $9C63: C-----  00       BRK  
  0x041C74 $9C64: C-----  00       BRK  
  0x041C75 $9C65: C-----  00       BRK  
  0x041C76 $9C66: C-----  00       BRK  
  0x041C77 $9C67: C-----  00       BRK  
  0x041C78 $9C68: C-----  E0 60    CPX  #$60
  0x041C7A $9C6A: C-----  40       RTI  
  0x041C7B $9C6B: C-----  00       BRK  
  0x041C7C $9C6C: C-----  00       BRK  
  0x041C7D $9C6D: C-----  00       BRK  
  0x041C7E $9C6E: C-----  00       BRK  
  0x041C7F $9C6F: C-----  00       BRK  
  0x041C80 $9C70: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x041C81 $9C71: C-----  00       BRK  
  0x041C82 $9C72: C-----  00       BRK  
  0x041C83 $9C73: C-----  00       BRK  
  0x041C84 $9C74: C-----  40       RTI  
  0x041C85 $9C75: C-----  30 3F    BMI  $9CB6
  0x041C87 $9C77: C-----  36 FF    ROL  $FF,X
  0x041C89 $9C79: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041C8A $9C7A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041C8B $9C7B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041C8C $9C7C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041C8D $9C7D: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x041C8E $9C7E: C-----  20 09 F9 JSR  $F909
  0x041C91 $9C81: C-----  F1 F8    SBC  ($F8),Y
  0x041C93 $9C83: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x041C94 $9C84: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x041C95 $9C85: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x041C96 $9C86: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x041C97 $9C87: C-----  F0 FF    BEQ  $9C88
  0x041C99 $9C89: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041C9A $9C8A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041C9B $9C8B: C-----  FE FE FE INC  $FEFE,X
  0x041C9E $9C8E: C-----  FE FE E4 INC  $E4FE,X
  0x041CA1 $9C91: C-----  C4 A4    CPY  $A4
  0x041CA3 $9C93: C-----  C4 A0    CPY  $A0
  0x041CA5 $9C95: C-----  C8       INY  
  0x041CA6 $9C96: C-----  88       DEY  
  0x041CA7 $9C97: C-----  40       RTI  
  0x041CA8 $9C98: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041CA9 $9C99: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041CAA $9C9A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041CAB $9C9B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041CAC $9C9C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041CAD $9C9D: C-----  F8       SED  
  0x041CAE $9C9E: C-----  F8       SED  
  0x041CAF $9C9F: C-----  F8       SED  
  0x041CB0 $9CA0: C-----  00       BRK  
  0x041CB1 $9CA1: C-----  00       BRK  
  0x041CB2 $9CA2: C-----  00       BRK  
  0x041CB3 $9CA3: C-----  00       BRK  
  0x041CB4 $9CA4: C-----  00       BRK  
  0x041CB5 $9CA5: C-----  00       BRK  
  0x041CB6 $9CA6: C-----  01 00    ORA  ($00,X)
  0x041CB8 $9CA8: C-----  00       BRK  
  0x041CB9 $9CA9: C-----  00       BRK  
  0x041CBA $9CAA: C-----  00       BRK  
  0x041CBB $9CAB: C-----  00       BRK  
  0x041CBC $9CAC: C-----  00       BRK  
  0x041CBD $9CAD: C-----  00       BRK  
  0x041CBE $9CAE: C-----  00       BRK  
  0x041CBF $9CAF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041CC0 $9CB0: C-----  00       BRK  
  0x041CC1 $9CB1: C-----  00       BRK  
  0x041CC2 $9CB2: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041CC3 $9CB3: C-----  08       PHP  
  0x041CC4 $9CB4: C-----  20 80 C0 JSR  $C080
  0x041CC7 $9CB7: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x041CC8 $9CB8: C-----  00       BRK  
  0x041CC9 $9CB9: C-----  00       BRK  
  0x041CCA $9CBA: C-----  00       BRK  
  0x041CCB $9CBB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041CCC $9CBC: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041CCD $9CBD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041CCE $9CBE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041CCF $9CBF: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x041CD0 $9CC0: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x041CD1 $9CC1: C-----  00       BRK  
  0x041CD2 $9CC2: C-----  00       BRK  
  0x041CD3 $9CC3: C-----  00       BRK  
  0x041CD4 $9CC4: C-----  00       BRK  
  0x041CD5 $9CC5: C-----  00       BRK  
  0x041CD6 $9CC6: C-----  00       BRK  
  0x041CD7 $9CC7: C-----  00       BRK  
  0x041CD8 $9CC8: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x041CD9 $9CC9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041CDA $9CCA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041CDB $9CCB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041CDC $9CCC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041CDD $9CCD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041CDE $9CCE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041CDF $9CCF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041CE0 $9CD0: C-----  C0 3F    CPY  #$3F
  0x041CE2 $9CD2: C-----  01 00    ORA  ($00,X)
  0x041CE4 $9CD4: C-----  01 01    ORA  ($01,X)
  0x041CE6 $9CD6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041CE7 $9CD7: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041CE8 $9CD8: C-----  00       BRK  
  0x041CE9 $9CD9: C-----  C0 FE    CPY  #$FE
  0x041CEB $9CDB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041CEC $9CDC: C-----  FE FE FC INC  $FCFE,X
  0x041CEF $9CDF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041CF0 $9CE0: C-----  00       BRK  
  0x041CF1 $9CE1: C-----  C0 E0    CPY  #$E0
  0x041CF3 $9CE3: C-----  F8       SED  
  0x041CF4 $9CE4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041CF5 $9CE5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041CF6 $9CE6: C-----  FE FE FF INC  $FFFE,X
  0x041CF9 $9CE9: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041CFA $9CEA: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041CFB $9CEB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041CFC $9CEC: C-----  00       BRK  
  0x041CFD $9CED: C-----  00       BRK  
  0x041CFE $9CEE: C-----  00       BRK  
  0x041CFF $9CEF: C-----  0E 00 00 ASL  $0000
  0x041D02 $9CF2: C-----  00       BRK  
  0x041D03 $9CF3: C-----  00       BRK  
  0x041D04 $9CF4: C-----  00       BRK  
  0x041D05 $9CF5: C-----  00       BRK  
  0x041D06 $9CF6: C-----  00       BRK  
  0x041D07 $9CF7: C-----  00       BRK  
  0x041D08 $9CF8: C-----  00       BRK  
  0x041D09 $9CF9: C-----  00       BRK  
  0x041D0A $9CFA: C-----  00       BRK  
  0x041D0B $9CFB: C-----  00       BRK  
  0x041D0C $9CFC: C-----  00       BRK  
  0x041D0D $9CFD: C-----  01 03    ORA  ($03,X)
  0x041D0F $9CFF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041D10 $9D00: C-----  00       BRK  
  0x041D11 $9D01: C-----  00       BRK  
  0x041D12 $9D02: C-----  00       BRK  
  0x041D13 $9D03: C-----  00       BRK  
  0x041D14 $9D04: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x041D15 $9D05: C-----  06 0F    ASL  $0F
  0x041D17 $9D07: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041D18 $9D08: C-----  00       BRK  
  0x041D19 $9D09: C-----  08       PHP  
  0x041D1A $9D0A: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x041D1B $9D0B: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x041D1C $9D0C: C-----  0E 0E 07 ASL  $070E
  0x041D1F $9D0F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041D20 $9D10: C-----  1D 3F 28 ORA  $283F,X
  0x041D23 $9D13: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041D24 $9D14: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x041D25 $9D15: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x041D26 $9D16: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x041D27 $9D17: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041D28 $9D18: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x041D29 $9D19: C-----  30 37    BMI  $9D52
  0x041D2B $9D1B: C-----  18       CLC  
  0x041D2C $9D1C: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x041D2D $9D1D: C-----  18       CLC  
  0x041D2E $9D1E: C-----  0D 0C 1F ORA  $1F0C
  0x041D31 $9D21: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x041D32 $9D22: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x041D33 $9D23: C-----  66 4E    ROR  $4E
  0x041D35 $9D25: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x041D36 $9D26: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041D37 $9D27: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x041D38 $9D28: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041D39 $9D29: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x041D3A $9D2A: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x041D3B $9D2B: C-----  BA       TSX  
  0x041D3C $9D2C: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x041D3D $9D2D: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x041D3E $9D2E: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x041D3F $9D2F: C-----  BC 06 07 LDY  $0706,X
  0x041D42 $9D32: C-----  06 03    ASL  $03
  0x041D44 $9D34: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041D45 $9D35: C-----  01 01    ORA  ($01,X)
  0x041D47 $9D37: C-----  00       BRK  
  0x041D48 $9D38: C-----  05 06    ORA  $06
  0x041D4A $9D3A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041D4B $9D3B: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x041D4C $9D3C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041D4D $9D3D: C-----  01 01    ORA  ($01,X)
  0x041D4F $9D3F: C-----  00       BRK  
  0x041D50 $9D40: C-----  CC FC BC CPY  $BCFC
  0x041D53 $9D43: C-----  A6 4E    LDX  $4E
  0x041D55 $9D45: C-----  DE 7E DE DEC  $DE7E,X
  0x041D58 $9D48: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x041D59 $9D49: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x041D5A $9D4A: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x041D5B $9D4B: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x041D5C $9D4C: C-----  BA       TSX  
  0x041D5D $9D4D: C-----  36 AE    ROL  $AE,X
  0x041D5F $9D4F: C-----  2E 7F 7F ROL  $7F7F
  0x041D62 $9D52: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041D63 $9D53: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041D64 $9D54: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041D65 $9D55: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041D66 $9D56: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041D67 $9D57: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041D68 $9D58: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041D69 $9D59: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041D6A $9D5A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041D6B $9D5B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041D6C $9D5C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041D6D $9D5D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041D6E $9D5E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041D6F $9D5F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041D70 $9D60: C-----  5E DE 3E LSR  $3EDE,X
  0x041D73 $9D63: C-----  FE FE FC INC  $FCFE,X
  0x041D76 $9D66: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041D77 $9D67: C-----  F8       SED  
  0x041D78 $9D68: C-----  AE 2E DE LDX  $DE2E
  0x041D7B $9D6B: C-----  3E FE FC ROL  $FCFE,X
  0x041D7E $9D6E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041D7F $9D6F: C-----  F8       SED  
  0x041D80 $9D70: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041D81 $9D71: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041D82 $9D72: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041D83 $9D73: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041D84 $9D74: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041D85 $9D75: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041D86 $9D76: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041D87 $9D77: C-----  01 FF    ORA  ($FF,X)
  0x041D89 $9D79: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041D8A $9D7A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041D8B $9D7B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041D8C $9D7C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041D8D $9D7D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041D8E $9D7E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041D8F $9D7F: C-----  01 00    ORA  ($00,X)
  0x041D91 $9D81: C-----  00       BRK  
  0x041D92 $9D82: C-----  E0 F8    CPX  #$F8
  0x041D94 $9D84: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041D95 $9D85: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041D96 $9D86: C-----  FE FE 00 INC  $00FE,X
  0x041D99 $9D89: C-----  00       BRK  
  0x041D9A $9D8A: C-----  00       BRK  
  0x041D9B $9D8B: C-----  00       BRK  
  0x041D9C $9D8C: C-----  00       BRK  
  0x041D9D $9D8D: C-----  00       BRK  
  0x041D9E $9D8E: C-----  00       BRK  
  0x041D9F $9D8F: C-----  00       BRK  
  0x041DA0 $9D90: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041DA1 $9D91: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041DA2 $9D92: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041DA3 $9D93: C-----  3E 10 10 ROL  $1010,X
  0x041DA6 $9D96: C-----  10 11    BPL  $9DA9
  0x041DA8 $9D98: C-----  00       BRK  
  0x041DA9 $9D99: C-----  00       BRK  
  0x041DAA $9D9A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041DAB $9D9B: C-----  C1 EF    CMP  ($EF,X)
  0x041DAD $9D9D: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x041DAE $9D9E: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x041DAF $9D9F: C-----  EE 00 00 INC  $0000
  0x041DB2 $9DA2: C-----  30 1F    BMI  $9DC3
  0x041DB4 $9DA4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041DB5 $9DA5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041DB6 $9DA6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041DB7 $9DA7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041DB8 $9DA8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041DB9 $9DA9: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041DBA $9DAA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041DBB $9DAB: C-----  60       RTS  
  0x041DBC $9DAC: C-----  E0 C0    CPX  #$C0
  0x041DBE $9DAE: C-----  C0 C0    CPY  #$C0
  0x041DC0 $9DB0: C-----  00       BRK  
  0x041DC1 $9DB1: C-----  01 0E    ORA  ($0E,X)
  0x041DC3 $9DB3: C-----  F8       SED  
  0x041DC4 $9DB4: C-----  F8       SED  
  0x041DC5 $9DB5: C-----  F8       SED  
  0x041DC6 $9DB6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041DC7 $9DB7: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041DC8 $9DB8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041DC9 $9DB9: C-----  FE F1 07 INC  $07F1,X
  0x041DCC $9DBC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041DCD $9DBD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041DCE $9DBE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041DCF $9DBF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041DD0 $9DC0: C-----  20 20 44 JSR  $4420
  0x041DD3 $9DC3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041DD4 $9DC4: C-----  10 40    BPL  $9E06
  0x041DD6 $9DC6: C-----  00       BRK  
  0x041DD7 $9DC7: C-----  00       BRK  
  0x041DD8 $9DC8: C-----  DE DE B8 DEC  $B8DE,X
  0x041DDB $9DCB: C-----  78       SEI  
  0x041DDC $9DCC: C-----  E0 80    CPX  #$80
  0x041DDE $9DCE: C-----  00       BRK  
  0x041DDF $9DCF: C-----  00       BRK  
  0x041DE0 $9DD0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041DE1 $9DD1: C-----  05 03    ORA  $03
  0x041DE3 $9DD3: C-----  01 00    ORA  ($00,X)
  0x041DE5 $9DD5: C-----  00       BRK  
  0x041DE6 $9DD6: C-----  00       BRK  
  0x041DE7 $9DD7: C-----  00       BRK  
  0x041DE8 $9DD8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041DE9 $9DD9: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041DEA $9DDA: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x041DEB $9DDB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041DEC $9DDC: C-----  01 00    ORA  ($00,X)
  0x041DEE $9DDE: C-----  00       BRK  
  0x041DEF $9DDF: C-----  00       BRK  
  0x041DF0 $9DE0: C-----  00       BRK  
  0x041DF1 $9DE1: C-----  F0 1C    BEQ  $9DFF
  0x041DF3 $9DE3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041DF4 $9DE4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041DF5 $9DE5: C-----  01 00    ORA  ($00,X)
  0x041DF7 $9DE7: C-----  00       BRK  
  0x041DF8 $9DE8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041DF9 $9DE9: C-----  00       BRK  
  0x041DFA $9DEA: C-----  E0 F0    CPX  #$F0
  0x041DFC $9DEC: C-----  F8       SED  
  0x041DFD $9DED: C-----  FE FF FF INC  $FFFF,X
  0x041E00 $9DF0: C-----  00       BRK  
  0x041E01 $9DF1: C-----  00       BRK  
  0x041E02 $9DF2: C-----  00       BRK  
  0x041E03 $9DF3: C-----  00       BRK  
  0x041E04 $9DF4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041E05 $9DF5: C-----  C0 E0    CPY  #$E0
  0x041E07 $9DF7: C-----  70 00    BVS  $9DF9
  0x041E09 $9DF9: C-----  00       BRK  
  0x041E0A $9DFA: C-----  00       BRK  
  0x041E0B $9DFB: C-----  00       BRK  
  0x041E0C $9DFC: C-----  00       BRK  
  0x041E0D $9DFD: C-----  00       BRK  
  0x041E0E $9DFE: C-----  00       BRK  
  0x041E0F $9DFF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041E10 $9E00: C-----  00       BRK  
  0x041E11 $9E01: C-----  08       PHP  
  0x041E12 $9E02: C-----  00       BRK  
  0x041E13 $9E03: C-----  10 01    BPL  $9E06
  0x041E15 $9E05: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x041E16 $9E06: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x041E17 $9E07: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x041E18 $9E08: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041E19 $9E09: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041E1A $9E0A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041E1B $9E0B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041E1C $9E0C: C-----  1E 1D 3D ASL  $3D1D,X
  0x041E1F $9E0F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041E20 $9E10: C-----  1E 3F 7F ASL  $7F3F,X
  0x041E23 $9E13: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041E24 $9E14: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041E25 $9E15: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041E26 $9E16: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041E27 $9E17: C-----  01 E1    ORA  ($E1,X)
  0x041E29 $9E19: C-----  C0 80    CPY  #$80
  0x041E2B $9E1B: C-----  00       BRK  
  0x041E2C $9E1C: C-----  00       BRK  
  0x041E2D $9E1D: C-----  E0 F0    CPX  #$F0
  0x041E2F $9E1F: C-----  FE 7C 7C INC  $7C7C,X
  0x041E32 $9E22: C-----  7E 7E 7E ROR  $7E7E,X
  0x041E35 $9E25: C-----  7D 78 78 ADC  $7878,X
  0x041E38 $9E28: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041E39 $9E29: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041E3A $9E2A: C-----  01 01    ORA  ($01,X)
  0x041E3C $9E2C: C-----  01 02    ORA  ($02,X)
  0x041E3E $9E2E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041E3F $9E2F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041E40 $9E30: C-----  01 00    ORA  ($00,X)
  0x041E42 $9E32: C-----  00       BRK  
  0x041E43 $9E33: C-----  00       BRK  
  0x041E44 $9E34: C-----  00       BRK  
  0x041E45 $9E35: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x041E46 $9E36: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x041E47 $9E37: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041E48 $9E38: C-----  FE FF FF INC  $FFFF,X
  0x041E4B $9E3B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041E4C $9E3C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041E4D $9E3D: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x041E4E $9E3E: C-----  90 E0    BCC  $9E20
  0x041E50 $9E40: C-----  00       BRK  
  0x041E51 $9E41: C-----  00       BRK  
  0x041E52 $9E42: C-----  00       BRK  
  0x041E53 $9E43: C-----  00       BRK  
  0x041E54 $9E44: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041E55 $9E45: C-----  C0 B0    CPY  #$B0
  0x041E57 $9E47: C-----  0E 00 00 ASL  $0000
  0x041E5A $9E4A: C-----  00       BRK  
  0x041E5B $9E4B: C-----  00       BRK  
  0x041E5C $9E4C: C-----  00       BRK  
  0x041E5D $9E4D: C-----  00       BRK  
  0x041E5E $9E4E: C-----  40       RTI  
  0x041E5F $9E4F: C-----  F0 00    BEQ  $9E51
  0x041E61 $9E51: C-----  00       BRK  
  0x041E62 $9E52: C-----  00       BRK  
  0x041E63 $9E53: C-----  00       BRK  
  0x041E64 $9E54: C-----  01 22    ORA  ($22,X)
  0x041E66 $9E56: C-----  26 3F    ROL  $3F
  0x041E68 $9E58: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041E69 $9E59: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041E6A $9E5A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041E6B $9E5B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041E6C $9E5C: C-----  1E 1D 19 ASL  $191D,X
  0x041E6F $9E5F: C-----  00       BRK  
  0x041E70 $9E60: C-----  01 80    ORA  ($80,X)
  0x041E72 $9E62: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041E73 $9E63: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041E74 $9E64: C-----  C0 E0    CPY  #$E0
  0x041E76 $9E66: C-----  F8       SED  
  0x041E77 $9E67: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041E78 $9E68: C-----  FE 7F 7F INC  $7F7F,X
  0x041E7B $9E6B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041E7C $9E6C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041E7D $9E6D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041E7E $9E6E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041E7F $9E6F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041E80 $9E70: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041E81 $9E71: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041E82 $9E72: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041E83 $9E73: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041E84 $9E74: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041E85 $9E75: C-----  7E 7E 3E ROR  $3E7E,X
  0x041E88 $9E78: C-----  00       BRK  
  0x041E89 $9E79: C-----  00       BRK  
  0x041E8A $9E7A: C-----  00       BRK  
  0x041E8B $9E7B: C-----  00       BRK  
  0x041E8C $9E7C: C-----  00       BRK  
  0x041E8D $9E7D: C-----  01 01    ORA  ($01,X)
  0x041E8F $9E7F: C-----  01 10    ORA  ($10,X)
  0x041E91 $9E81: C-----  08       PHP  
  0x041E92 $9E82: C-----  28       PLP  
  0x041E93 $9E83: C-----  28       PLP  
  0x041E94 $9E84: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x041E95 $9E85: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x041E96 $9E86: C-----  16 07    ASL  $07,X
  0x041E98 $9E88: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x041E99 $9E89: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x041E9A $9E8A: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x041E9B $9E8B: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x041E9C $9E8C: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x041E9D $9E8D: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x041E9E $9E8E: C-----  09 00    ORA  #$00
  0x041EA0 $9E90: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041EA1 $9E91: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041EA2 $9E92: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041EA3 $9E93: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041EA4 $9E94: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041EA5 $9E95: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041EA6 $9E96: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041EA7 $9E97: C-----  30 E0    BMI  $9E79
  0x041EA9 $9E99: C-----  E0 F0    CPX  #$F0
  0x041EAB $9E9B: C-----  F0 F0    BEQ  $9E8D
  0x041EAD $9E9D: C-----  F8       SED  
  0x041EAE $9E9E: C-----  F0 CF    BEQ  $9E6F
  0x041EB0 $9EA0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041EB1 $9EA1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041EB2 $9EA2: C-----  01 00    ORA  ($00,X)
  0x041EB4 $9EA4: C-----  00       BRK  
  0x041EB5 $9EA5: C-----  00       BRK  
  0x041EB6 $9EA6: C-----  00       BRK  
  0x041EB7 $9EA7: C-----  00       BRK  
  0x041EB8 $9EA8: C-----  00       BRK  
  0x041EB9 $9EA9: C-----  00       BRK  
  0x041EBA $9EAA: C-----  00       BRK  
  0x041EBB $9EAB: C-----  00       BRK  
  0x041EBC $9EAC: C-----  00       BRK  
  0x041EBD $9EAD: C-----  00       BRK  
  0x041EBE $9EAE: C-----  00       BRK  
  0x041EBF $9EAF: C-----  00       BRK  
  0x041EC0 $9EB0: C-----  C0 C0    CPY  #$C0
  0x041EC2 $9EB2: C-----  E0 60    CPX  #$60
  0x041EC4 $9EB4: C-----  10 04    BPL  $9EBA
  0x041EC6 $9EB6: C-----  01 00    ORA  ($00,X)
  0x041EC8 $9EB8: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041EC9 $9EB9: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041ECA $9EBA: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041ECB $9EBB: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041ECC $9EBC: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041ECD $9EBD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041ECE $9EBE: C-----  00       BRK  
  0x041ECF $9EBF: C-----  00       BRK  
  0x041ED0 $9EC0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041ED1 $9EC1: C-----  FE FE FC INC  $FCFE,X
  0x041ED4 $9EC4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041ED5 $9EC5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041ED6 $9EC6: C-----  F8       SED  
  0x041ED7 $9EC7: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x041ED8 $9EC8: C-----  00       BRK  
  0x041ED9 $9EC9: C-----  01 01    ORA  ($01,X)
  0x041EDB $9ECB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041EDC $9ECC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041EDD $9ECD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041EDE $9ECE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041EDF $9ECF: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x041EE0 $9ED0: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x041EE1 $9ED1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x041EE2 $9ED2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x041EE3 $9ED3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x041EE4 $9ED4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x041EE5 $9ED5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041EE6 $9ED6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041EE7 $9ED7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041EE8 $9ED8: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x041EE9 $9ED9: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x041EEA $9EDA: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x041EEB $9EDB: C-----  1D 0D 0C ORA  $0C0D,X
  0x041EEE $9EDE: C-----  00       BRK  
  0x041EEF $9EDF: C-----  00       BRK  
  0x041EF0 $9EE0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041EF1 $9EE1: C-----  01 00    ORA  ($00,X)
  0x041EF3 $9EE3: C-----  01 01    ORA  ($01,X)
  0x041EF5 $9EE5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041EF6 $9EE6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041EF7 $9EE7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041EF8 $9EE8: C-----  F8       SED  
  0x041EF9 $9EE9: C-----  FE FF FE INC  $FEFF,X
  0x041EFC $9EEC: C-----  FE FC C0 INC  $C0FC,X
  0x041EFF $9EEF: C-----  00       BRK  
  0x041F00 $9EF0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041F01 $9EF1: C-----  01 00    ORA  ($00,X)
  0x041F03 $9EF3: C-----  00       BRK  
  0x041F04 $9EF4: C-----  00       BRK  
  0x041F05 $9EF5: C-----  00       BRK  
  0x041F06 $9EF6: C-----  00       BRK  
  0x041F07 $9EF7: C-----  00       BRK  
  0x041F08 $9EF8: C-----  00       BRK  
  0x041F09 $9EF9: C-----  00       BRK  
  0x041F0A $9EFA: C-----  00       BRK  
  0x041F0B $9EFB: C-----  00       BRK  
  0x041F0C $9EFC: C-----  00       BRK  
  0x041F0D $9EFD: C-----  00       BRK  
  0x041F0E $9EFE: C-----  00       BRK  
  0x041F0F $9EFF: C-----  00       BRK  
  0x041F10 $9F00: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041F11 $9F01: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041F12 $9F02: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041F13 $9F03: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x041F14 $9F04: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041F15 $9F05: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041F16 $9F06: C-----  00       BRK  
  0x041F17 $9F07: C-----  00       BRK  
  0x041F18 $9F08: C-----  C0 C0    CPY  #$C0
  0x041F1A $9F0A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041F1B $9F0B: C-----  60       RTS  
  0x041F1C $9F0C: C-----  F0 FC    BEQ  $9F0A
  0x041F1E $9F0E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041F1F $9F0F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041F20 $9F10: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041F21 $9F11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041F22 $9F12: C-----  FE F0 C0 INC  $C0F0,X
  0x041F25 $9F15: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041F26 $9F16: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041F27 $9F17: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041F28 $9F18: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041F29 $9F19: C-----  00       BRK  
  0x041F2A $9F1A: C-----  01 0F    ORA  ($0F,X)
  0x041F2C $9F1C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041F2D $9F1D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041F2E $9F1E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041F2F $9F1F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x041F30 $9F20: C-----  00       BRK  
  0x041F31 $9F21: C-----  00       BRK  
  0x041F32 $9F22: C-----  00       BRK  
  0x041F33 $9F23: C-----  00       BRK  
  0x041F34 $9F24: C-----  00       BRK  
  0x041F35 $9F25: C-----  C1 37    CMP  ($37,X)
  0x041F37 $9F27: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041F38 $9F28: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041F39 $9F29: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041F3A $9F2A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041F3B $9F2B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041F3C $9F2C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041F3D $9F2D: C-----  3E C8 F0 ROL  $F0C8,X
  0x041F40 $9F30: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041F41 $9F31: C-----  40       RTI  
  0x041F42 $9F32: C-----  40       RTI  
  0x041F43 $9F33: C-----  40       RTI  
  0x041F44 $9F34: C-----  60       RTS  
  0x041F45 $9F35: C-----  F0 FC    BEQ  $9F33
  0x041F47 $9F37: C-----  FE 7F BF INC  $BF7F,X
  0x041F4A $9F3A: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x041F4B $9F3B: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x041F4C $9F3C: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x041F4D $9F3D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041F4E $9F3E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041F4F $9F3F: C-----  01 00    ORA  ($00,X)
  0x041F51 $9F41: C-----  00       BRK  
  0x041F52 $9F42: C-----  C0 20    CPY  #$20
  0x041F54 $9F44: C-----  10 08    BPL  $9F4E
  0x041F56 $9F46: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041F57 $9F47: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041F58 $9F48: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041F59 $9F49: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041F5A $9F4A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041F5B $9F4B: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x041F5C $9F4C: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x041F5D $9F4D: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x041F5E $9F4E: C-----  F8       SED  
  0x041F5F $9F4F: C-----  F8       SED  
  0x041F60 $9F50: C-----  38       SEC  
  0x041F61 $9F51: C-----  30 24    BMI  $9F77
  0x041F63 $9F53: C-----  20 20 40 JSR  $4020
  0x041F66 $9F56: C-----  E0 E0    CPX  #$E0
  0x041F68 $9F58: C-----  C0 C8    CPY  #$C8
  0x041F6A $9F5A: C-----  D8       CLD  
  0x041F6B $9F5B: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x041F6C $9F5C: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x041F6D $9F5D: C-----  BE 1E 1E LDX  $1E1E,Y
  0x041F70 $9F60: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041F71 $9F61: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041F72 $9F62: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041F73 $9F63: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041F74 $9F64: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041F75 $9F65: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041F76 $9F66: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041F77 $9F67: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x041F78 $9F68: C-----  F8       SED  
  0x041F79 $9F69: C-----  F8       SED  
  0x041F7A $9F6A: C-----  F8       SED  
  0x041F7B $9F6B: C-----  F8       SED  
  0x041F7C $9F6C: C-----  F8       SED  
  0x041F7D $9F6D: C-----  F8       SED  
  0x041F7E $9F6E: C-----  F8       SED  
  0x041F7F $9F6F: C-----  C0 F0    CPY  #$F0
  0x041F81 $9F71: C-----  F0 F0    BEQ  $9F63
  0x041F83 $9F73: C-----  F8       SED  
  0x041F84 $9F74: C-----  F8       SED  
  0x041F85 $9F75: C-----  F8       SED  
  0x041F86 $9F76: C-----  F8       SED  
  0x041F87 $9F77: C-----  F8       SED  
  0x041F88 $9F78: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041F89 $9F79: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041F8A $9F7A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041F8B $9F7B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041F8C $9F7C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041F8D $9F7D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041F8E $9F7E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041F8F $9F7F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041F90 $9F80: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041F91 $9F81: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041F92 $9F82: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041F93 $9F83: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041F94 $9F84: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041F95 $9F85: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041F96 $9F86: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x041F97 $9F87: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x041F98 $9F88: C-----  F0 F0    BEQ  $9F7A
  0x041F9A $9F8A: C-----  F0 F8    BEQ  $9F84
  0x041F9C $9F8C: C-----  F8       SED  
  0x041F9D $9F8D: C-----  F8       SED  
  0x041F9E $9F8E: C-----  78       SEI  
  0x041F9F $9F8F: C-----  30 FF    BMI  $9F90
  0x041FA1 $9F91: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041FA2 $9F92: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041FA3 $9F93: C-----  FE FE FE INC  $FEFE,X
  0x041FA6 $9F96: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041FA7 $9F97: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041FA8 $9F98: C-----  00       BRK  
  0x041FA9 $9F99: C-----  00       BRK  
  0x041FAA $9F9A: C-----  00       BRK  
  0x041FAB $9F9B: C-----  01 01    ORA  ($01,X)
  0x041FAD $9F9D: C-----  01 03    ORA  ($03,X)
  0x041FAF $9F9F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041FB0 $9FA0: C-----  F8       SED  
  0x041FB1 $9FA1: C-----  E0 F0    CPX  #$F0
  0x041FB3 $9FA3: C-----  70 38    BVS  $9FDD
  0x041FB5 $9FA5: C-----  08       PHP  
  0x041FB6 $9FA6: C-----  00       BRK  
  0x041FB7 $9FA7: C-----  00       BRK  
  0x041FB8 $9FA8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041FB9 $9FA9: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x041FBA $9FAA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041FBB $9FAB: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x041FBC $9FAC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041FBD $9FAD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041FBE $9FAE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041FBF $9FAF: C-----  00       BRK  
  0x041FC0 $9FB0: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x041FC1 $9FB1: C-----  01 01    ORA  ($01,X)
  0x041FC3 $9FB3: C-----  01 01    ORA  ($01,X)
  0x041FC5 $9FB5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041FC6 $9FB6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041FC7 $9FB7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x041FC8 $9FB8: C-----  FD FE FE SBC  $FEFE,X
  0x041FCB $9FBB: C-----  FE FE FC INC  $FCFE,X
  0x041FCE $9FBE: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041FCF $9FBF: C-----  78       SEI  
  0x041FD0 $9FC0: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x041FD1 $9FC1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x041FD2 $9FC2: C-----  01 00    ORA  ($00,X)
  0x041FD4 $9FC4: C-----  00       BRK  
  0x041FD5 $9FC5: C-----  00       BRK  
  0x041FD6 $9FC6: C-----  00       BRK  
  0x041FD7 $9FC7: C-----  00       BRK  
  0x041FD8 $9FC8: C-----  38       SEC  
  0x041FD9 $9FC9: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x041FDA $9FCA: C-----  FE FF FF INC  $FFFF,X
  0x041FDD $9FCD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041FDE $9FCE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041FDF $9FCF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x041FE0 $9FD0: C-----  F8       SED  
  0x041FE1 $9FD1: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x041FE2 $9FD2: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x041FE3 $9FD3: C-----  C0 40    CPY  #$40
  0x041FE5 $9FD5: C-----  40       RTI  
  0x041FE6 $9FD6: C-----  40       RTI  
  0x041FE7 $9FD7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x041FE8 $9FD8: C-----  06 0A    ASL  $0A
  0x041FEA $9FDA: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x041FEB $9FDB: C-----  3E BC BC ROL  $BCBC,X
  0x041FEE $9FDE: C-----  BC 78 00 LDY  $0078,X
  0x041FF1 $9FE1: C-----  81 FE    STA  ($FE,X)
  0x041FF3 $9FE3: C-----  FE FE FE INC  $FEFE,X
  0x041FF6 $9FE6: C-----  F8       SED  
  0x041FF7 $9FE7: C-----  C0 FF    CPY  #$FF
  0x041FF9 $9FE9: C-----  7E 01 01 ROR  $0101,X
  0x041FFC $9FEC: C-----  01 00    ORA  ($00,X)
  0x041FFE $9FEE: C-----  00       BRK  
  0x041FFF $9FEF: C-----  00       BRK  
  0x042000 $9FF0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x042001 $9FF1: C-----  00       BRK  
  0x042002 $9FF2: C-----  00       BRK  
  0x042003 $9FF3: C-----  00       BRK  
  0x042004 $9FF4: C-----  00       BRK  
  0x042005 $9FF5: C-----  00       BRK  
  0x042006 $9FF6: C-----  00       BRK  
  0x042007 $9FF7: C-----  00       BRK  
  0x042008 $9FF8: C-----  78       SEI  
  0x042009 $9FF9: C-----  F0 E0    BEQ  $9FDB
  0x04200B $9FFB: C-----  C0 80    CPY  #$80
  0x04200D $9FFD: C-----  00       BRK  
  0x04200E $9FFE: C-----  00       BRK  
  0x04200F $9FFF: C-----  00       BRK  