; ===== MMC3 Bank 35 =====
; ROM: 0x046010-0x04800F
; CPU: $8000-$9FFF
; CDL: code=8096 data=0 unaccessed=96

  0x046010 $8000: C-----  00       BRK  
  0x046011 $8001: C-----  00       BRK  
  0x046012 $8002: C-----  00       BRK  
  0x046013 $8003: C-----  00       BRK  
  0x046014 $8004: C-----  00       BRK  
  0x046015 $8005: C-----  00       BRK  
  0x046016 $8006: C-----  00       BRK  
  0x046017 $8007: C-----  00       BRK  
  0x046018 $8008: C-----  00       BRK  
  0x046019 $8009: C-----  00       BRK  
  0x04601A $800A: C-----  00       BRK  
  0x04601B $800B: C-----  00       BRK  
  0x04601C $800C: C-----  00       BRK  
  0x04601D $800D: C-----  00       BRK  
  0x04601E $800E: C-----  00       BRK  
  0x04601F $800F: C-----  00       BRK  
  0x046020 $8010: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046021 $8011: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046022 $8012: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046023 $8013: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046024 $8014: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046025 $8015: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046026 $8016: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046027 $8017: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046028 $8018: C-----  00       BRK  
  0x046029 $8019: C-----  00       BRK  
  0x04602A $801A: C-----  00       BRK  
  0x04602B $801B: C-----  00       BRK  
  0x04602C $801C: C-----  00       BRK  
  0x04602D $801D: C-----  00       BRK  
  0x04602E $801E: C-----  00       BRK  
  0x04602F $801F: C-----  00       BRK  
  0x046030 $8020: C-----  00       BRK  
  0x046031 $8021: C-----  00       BRK  
  0x046032 $8022: C-----  00       BRK  
  0x046033 $8023: C-----  00       BRK  
  0x046034 $8024: C-----  00       BRK  
  0x046035 $8025: C-----  00       BRK  
  0x046036 $8026: C-----  00       BRK  
  0x046037 $8027: C-----  00       BRK  
  0x046038 $8028: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046039 $8029: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04603A $802A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04603B $802B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04603C $802C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04603D $802D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04603E $802E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04603F $802F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046040 $8030: C-----  00       BRK  
  0x046041 $8031: C-----  01 02    ORA  ($02,X)
  0x046043 $8033: C-----  05 0A    ORA  $0A
  0x046045 $8035: C-----  15 2A    ORA  $2A,X
  0x046047 $8037: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x046048 $8038: C-----  00       BRK  
  0x046049 $8039: C-----  00       BRK  
  0x04604A $803A: C-----  01 02    ORA  ($02,X)
  0x04604C $803C: C-----  05 0A    ORA  $0A
  0x04604E $803E: C-----  15 2B    ORA  $2B,X
  0x046050 $8040: C-----  00       BRK  
  0x046051 $8041: C-----  00       BRK  
  0x046052 $8042: C-----  00       BRK  
  0x046053 $8043: C-----  00       BRK  
  0x046054 $8044: C-----  01 06    ORA  ($06,X)
  0x046056 $8046: C-----  18       CLC  
  0x046057 $8047: C-----  70 00    BVS  $8049
  0x046059 $8049: C-----  00       BRK  
  0x04605A $804A: C-----  00       BRK  
  0x04605B $804B: C-----  00       BRK  
  0x04605C $804C: C-----  00       BRK  
  0x04605D $804D: C-----  01 07    ORA  ($07,X)
  0x04605F $804F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046060 $8050: C-----  00       BRK  
  0x046061 $8051: C-----  00       BRK  
  0x046062 $8052: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046063 $8053: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x046064 $8054: C-----  01 01    ORA  ($01,X)
  0x046066 $8056: C-----  01 03    ORA  ($03,X)
  0x046068 $8058: C-----  00       BRK  
  0x046069 $8059: C-----  00       BRK  
  0x04606A $805A: C-----  00       BRK  
  0x04606B $805B: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04606C $805C: C-----  FE FE FE INC  $FEFE,X
  0x04606F $805F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x046070 $8060: C-----  A0 40    LDY  #$40
  0x046072 $8062: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046073 $8063: C-----  00       BRK  
  0x046074 $8064: C-----  84 03    STY  $03
  0x046076 $8066: C-----  01 01    ORA  ($01,X)
  0x046078 $8068: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x046079 $8069: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04607A $806A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04607B $806B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04607C $806C: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x04607D $806D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04607E $806E: C-----  FE FE 04 INC  $04FE,X
  0x046081 $8071: C-----  08       PHP  
  0x046082 $8072: C-----  10 20    BPL  $8094
  0x046084 $8074: C-----  40       RTI  
  0x046085 $8075: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046086 $8076: C-----  00       BRK  
  0x046087 $8077: C-----  00       BRK  
  0x046088 $8078: C-----  F8       SED  
  0x046089 $8079: C-----  F0 E0    BEQ  $805B
  0x04608B $807B: C-----  C0 80    CPY  #$80
  0x04608D $807D: C-----  00       BRK  
  0x04608E $807E: C-----  00       BRK  
  0x04608F $807F: C-----  00       BRK  
  0x046090 $8080: C-----  00       BRK  
  0x046091 $8081: C-----  00       BRK  
  0x046092 $8082: C-----  01 07    ORA  ($07,X)
  0x046094 $8084: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x046095 $8085: C-----  30 40    BMI  $80C7
  0x046097 $8087: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046098 $8088: C-----  00       BRK  
  0x046099 $8089: C-----  00       BRK  
  0x04609A $808A: C-----  00       BRK  
  0x04609B $808B: C-----  00       BRK  
  0x04609C $808C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04609D $808D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04609E $808E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04609F $808F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0460A0 $8090: C-----  AA       TAX  
  0x0460A1 $8091: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x0460A2 $8092: C-----  AA       TAX  
  0x0460A3 $8093: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x0460A4 $8094: C-----  6E 1E 0F ROR  $0F1E
  0x0460A7 $8097: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0460A8 $8098: C-----  00       BRK  
  0x0460A9 $8099: C-----  00       BRK  
  0x0460AA $809A: C-----  00       BRK  
  0x0460AB $809B: C-----  00       BRK  
  0x0460AC $809C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0460AD $809D: C-----  E0 F0    CPX  #$F0
  0x0460AF $809F: C-----  F8       SED  
  0x0460B0 $80A0: C-----  00       BRK  
  0x0460B1 $80A1: C-----  00       BRK  
  0x0460B2 $80A2: C-----  00       BRK  
  0x0460B3 $80A3: C-----  10 38    BPL  $80DD
  0x0460B5 $80A5: C-----  79 76 28 ADC  $2876,Y
  0x0460B8 $80A8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0460B9 $80A9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0460BA $80AA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0460BB $80AB: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0460BC $80AC: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x0460BD $80AD: C-----  86 89    STX  $89
  0x0460BF $80AF: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x0460C0 $80B0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0460C1 $80B1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0460C2 $80B2: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0460C3 $80B3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0460C4 $80B4: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x0460C5 $80B5: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0460C6 $80B6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0460C7 $80B7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0460C8 $80B8: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0460C9 $80B9: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0460CA $80BA: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0460CB $80BB: C-----  E0 9A    CPX  #$9A
  0x0460CD $80BD: C-----  !!UNDEF $72  ; unknown opcode, treating as data
  0x0460CE $80BE: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x0460CF $80BF: C-----  ED 01 15 SBC  $1501
  0x0460D2 $80C2: C-----  0A       ASL  A
  0x0460D3 $80C3: C-----  06 02    ASL  $02
  0x0460D5 $80C5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0460D6 $80C6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0460D7 $80C7: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0460D8 $80C8: C-----  FE EA F4 INC  $F4EA,X
  0x0460DB $80CB: C-----  F8       SED  
  0x0460DC $80CC: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0460DD $80CD: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0460DE $80CE: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0460DF $80CF: C-----  60       RTS  
  0x0460E0 $80D0: C-----  81 81    STA  ($81,X)
  0x0460E2 $80D2: C-----  C1 E1    CMP  ($E1,X)
  0x0460E4 $80D4: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x0460E5 $80D5: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x0460E6 $80D6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0460E7 $80D7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0460E8 $80D8: C-----  7E 7E 3E ROR  $3E7E,X
  0x0460EB $80DB: C-----  1E 0C 7C ASL  $7C0C,X
  0x0460EE $80DE: C-----  F8       SED  
  0x0460EF $80DF: C-----  F8       SED  
  0x0460F0 $80E0: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x0460F1 $80E1: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0460F2 $80E2: C-----  81 C1    STA  ($C1,X)
  0x0460F4 $80E4: C-----  C1 C1    CMP  ($C1,X)
  0x0460F6 $80E6: C-----  C1 C1    CMP  ($C1,X)
  0x0460F8 $80E8: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0460F9 $80E9: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0460FA $80EA: C-----  7E 3E 3E ROR  $3E3E,X
  0x0460FD $80ED: C-----  3E 3E 3E ROL  $3E3E,X
  0x046100 $80F0: C-----  F0 0E    BEQ  $8100
  0x046102 $80F2: C-----  01 00    ORA  ($00,X)
  0x046104 $80F4: C-----  00       BRK  
  0x046105 $80F5: C-----  01 02    ORA  ($02,X)
  0x046107 $80F7: C-----  05 00    ORA  $00
  0x046109 $80F9: C-----  F0 FE    BEQ  $80F9
  0x04610B $80FB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04610C $80FC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04610D $80FD: C-----  FE FD FA INC  $FAFD,X
  0x046110 $8100: C-----  70 FC    BVS  $80FE
  0x046112 $8102: C-----  FE FF FF INC  $FFFF,X
  0x046115 $8105: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046116 $8106: C-----  FE FC 00 INC  $00FC,X
  0x046119 $8109: C-----  70 FC    BVS  $8107
  0x04611B $810B: C-----  FE FC FA INC  $FAFC,X
  0x04611E $810E: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04611F $810F: C-----  00       BRK  
  0x046120 $8110: C-----  00       BRK  
  0x046121 $8111: C-----  00       BRK  
  0x046122 $8112: C-----  01 03    ORA  ($03,X)
  0x046124 $8114: C-----  0E 38 40 ASL  $4038
  0x046127 $8117: C-----  60       RTS  
  0x046128 $8118: C-----  00       BRK  
  0x046129 $8119: C-----  00       BRK  
  0x04612A $811A: C-----  00       BRK  
  0x04612B $811B: C-----  00       BRK  
  0x04612C $811C: C-----  01 07    ORA  ($07,X)
  0x04612E $811E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04612F $811F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046130 $8120: C-----  00       BRK  
  0x046131 $8121: C-----  01 01    ORA  ($01,X)
  0x046133 $8123: C-----  00       BRK  
  0x046134 $8124: C-----  01 02    ORA  ($02,X)
  0x046136 $8126: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x046137 $8127: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046138 $8128: C-----  00       BRK  
  0x046139 $8129: C-----  00       BRK  
  0x04613A $812A: C-----  00       BRK  
  0x04613B $812B: C-----  00       BRK  
  0x04613C $812C: C-----  00       BRK  
  0x04613D $812D: C-----  01 01    ORA  ($01,X)
  0x04613F $812F: C-----  00       BRK  
  0x046140 $8130: C-----  C0 00    CPY  #$00
  0x046142 $8132: C-----  40       RTI  
  0x046143 $8133: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046144 $8134: C-----  00       BRK  
  0x046145 $8135: C-----  00       BRK  
  0x046146 $8136: C-----  0D 0F 3F ORA  $3F0F
  0x046149 $8139: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04614A $813A: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04614B $813B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04614C $813C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04614D $813D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04614E $813E: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x04614F $813F: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x046150 $8140: C-----  AA       TAX  
  0x046151 $8141: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x046152 $8142: C-----  AA       TAX  
  0x046153 $8143: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x046154 $8144: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x046155 $8145: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x046156 $8146: C-----  06 03    ASL  $03
  0x046158 $8148: C-----  00       BRK  
  0x046159 $8149: C-----  00       BRK  
  0x04615A $814A: C-----  00       BRK  
  0x04615B $814B: C-----  00       BRK  
  0x04615C $814C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04615D $814D: C-----  F8       SED  
  0x04615E $814E: C-----  F8       SED  
  0x04615F $814F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x046160 $8150: C-----  00       BRK  
  0x046161 $8151: C-----  01 01    ORA  ($01,X)
  0x046163 $8153: C-----  01 02    ORA  ($02,X)
  0x046165 $8155: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x046166 $8156: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046167 $8157: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x046168 $8158: C-----  00       BRK  
  0x046169 $8159: C-----  00       BRK  
  0x04616A $815A: C-----  00       BRK  
  0x04616B $815B: C-----  00       BRK  
  0x04616C $815C: C-----  01 01    ORA  ($01,X)
  0x04616E $815E: C-----  00       BRK  
  0x04616F $815F: C-----  01 03    ORA  ($03,X)
  0x046171 $8161: C-----  01 00    ORA  ($00,X)
  0x046173 $8163: C-----  10 4C    BPL  $81B1
  0x046175 $8165: C-----  7E DE DE ROR  $DEDE,X
  0x046178 $8168: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x046179 $8169: C-----  FE FF EF INC  $EFFF,X
  0x04617C $816C: C-----  !!UNDEF $B3  ; unknown opcode, treating as data
  0x04617D $816D: C-----  85 15    STA  $15
  0x04617F $816F: C-----  1D 02 06 ORA  $0602,X
  0x046182 $8172: C-----  0E 1B 15 ASL  $151B
  0x046185 $8175: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x046186 $8176: C-----  35 2A    AND  $2A,X
  0x046188 $8178: C-----  01 01    ORA  ($01,X)
  0x04618A $817A: C-----  01 00    ORA  ($00,X)
  0x04618C $817C: C-----  00       BRK  
  0x04618D $817D: C-----  00       BRK  
  0x04618E $817E: C-----  00       BRK  
  0x04618F $817F: C-----  00       BRK  
  0x046190 $8180: C-----  0E 0E 1E ASL  $1E0E
  0x046193 $8183: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x046194 $8184: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x046195 $8185: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x046196 $8186: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x046197 $8187: C-----  41 F0    EOR  ($F0,X)
  0x046199 $8189: C-----  F0 E0    BEQ  $816B
  0x04619B $818B: C-----  C0 80    CPY  #$80
  0x04619D $818D: C-----  00       BRK  
  0x04619E $818E: C-----  00       BRK  
  0x04619F $818F: C-----  00       BRK  
  0x0461A0 $8190: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0461A1 $8191: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0461A2 $8192: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0461A3 $8193: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x0461A4 $8194: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0461A5 $8195: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x0461A6 $8196: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0461A7 $8197: C-----  01 D7    ORA  ($D7,X)
  0x0461A9 $8199: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x0461AA $819A: C-----  A9 52    LDA  #$52
  0x0461AC $819C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0461AD $819D: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0461AE $819E: C-----  01 00    ORA  ($00,X)
  0x0461B0 $81A0: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0461B1 $81A1: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0461B2 $81A2: C-----  01 81    ORA  ($81,X)
  0x0461B4 $81A4: C-----  01 03    ORA  ($03,X)
  0x0461B6 $81A6: C-----  56 B8    LSR  $B8,X
  0x0461B8 $81A8: C-----  00       BRK  
  0x0461B9 $81A9: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0461BA $81AA: C-----  FE 7E FE INC  $FE7E,X
  0x0461BD $81AD: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0461BE $81AE: C-----  A8       TAY  
  0x0461BF $81AF: C-----  40       RTI  
  0x0461C0 $81B0: C-----  E0 58    CPX  #$58
  0x0461C2 $81B2: C-----  A8       TAY  
  0x0461C3 $81B3: C-----  F8       SED  
  0x0461C4 $81B4: C-----  F8       SED  
  0x0461C5 $81B5: C-----  30 C0    BMI  $8177
  0x0461C7 $81B7: C-----  00       BRK  
  0x0461C8 $81B8: C-----  00       BRK  
  0x0461C9 $81B9: C-----  A0 50    LDY  #$50
  0x0461CB $81BB: C-----  00       BRK  
  0x0461CC $81BC: C-----  00       BRK  
  0x0461CD $81BD: C-----  C0 00    CPY  #$00
  0x0461CF $81BF: C-----  00       BRK  
  0x0461D0 $81C0: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0461D1 $81C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0461D2 $81C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0461D3 $81C3: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0461D4 $81C4: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0461D5 $81C5: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0461D6 $81C6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0461D7 $81C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0461D8 $81C8: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0461D9 $81C9: C-----  FE DE AE INC  $AEDE,X
  0x0461DC $81CC: C-----  6E BA F4 ROR  $F4BA
  0x0461DF $81CF: C-----  E0 02    CPX  #$02
  0x0461E1 $81D1: C-----  06 0E    ASL  $0E
  0x0461E3 $81D3: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x0461E4 $81D4: C-----  15 2B    ORA  $2B,X
  0x0461E6 $81D6: C-----  35 2A    AND  $2A,X
  0x0461E8 $81D8: C-----  00       BRK  
  0x0461E9 $81D9: C-----  00       BRK  
  0x0461EA $81DA: C-----  00       BRK  
  0x0461EB $81DB: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0461EC $81DC: C-----  0A       ASL  A
  0x0461ED $81DD: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0461EE $81DE: C-----  0A       ASL  A
  0x0461EF $81DF: C-----  15 FC    ORA  $FC,X
  0x0461F1 $81E1: C-----  !!UNDEF $A3  ; unknown opcode, treating as data
  0x0461F2 $81E2: C-----  90 48    BCC  $822C
  0x0461F4 $81E4: C-----  28       PLP  
  0x0461F5 $81E5: C-----  25 14    AND  $14
  0x0461F7 $81E7: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0461F8 $81E8: C-----  00       BRK  
  0x0461F9 $81E9: C-----  00       BRK  
  0x0461FA $81EA: C-----  00       BRK  
  0x0461FB $81EB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0461FC $81EC: C-----  C0 C0    CPY  #$C0
  0x0461FE $81EE: C-----  E0 E0    CPX  #$E0
  0x046200 $81F0: C-----  00       BRK  
  0x046201 $81F1: C-----  00       BRK  
  0x046202 $81F2: C-----  00       BRK  
  0x046203 $81F3: C-----  00       BRK  
  0x046204 $81F4: C-----  00       BRK  
  0x046205 $81F5: C-----  01 07    ORA  ($07,X)
  0x046207 $81F7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046208 $81F8: C-----  00       BRK  
  0x046209 $81F9: C-----  00       BRK  
  0x04620A $81FA: C-----  00       BRK  
  0x04620B $81FB: C-----  00       BRK  
  0x04620C $81FC: C-----  00       BRK  
  0x04620D $81FD: C-----  00       BRK  
  0x04620E $81FE: C-----  01 07    ORA  ($07,X)
  0x046210 $8200: C-----  10 20    BPL  $8222
  0x046212 $8202: C-----  20 C1 C7 JSR  $C7C1
  0x046215 $8205: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x046216 $8206: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x046217 $8207: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x046218 $8208: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x046219 $8209: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04621A $820A: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04621B $820B: C-----  3E 38 70 ROL  $7038,X
  0x04621E $820E: C-----  60       RTS  
  0x04621F $820F: C-----  41 23    EOR  ($23,X)
  0x046221 $8211: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x046222 $8212: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x046223 $8213: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046224 $8214: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046225 $8215: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046226 $8216: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x046227 $8217: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x046228 $8218: C-----  DD A7 37 CMP  $37A7,X
  0x04622B $821B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04622C $821C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04622D $821D: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x04622E $821E: C-----  AA       TAX  
  0x04622F $821F: C-----  DE 01 02 DEC  $0201,X
  0x046232 $8222: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x046233 $8223: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x046234 $8224: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x046235 $8225: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x046236 $8226: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x046237 $8227: C-----  06 00    ASL  $00
  0x046239 $8229: C-----  01 01    ORA  ($01,X)
  0x04623B $822B: C-----  01 03    ORA  ($03,X)
  0x04623D $822D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04623E $822E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04623F $822F: C-----  01 01    ORA  ($01,X)
  0x046241 $8231: C-----  01 00    ORA  ($00,X)
  0x046243 $8233: C-----  06 7F    ASL  $7F
  0x046245 $8235: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046246 $8236: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046247 $8237: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x046248 $8238: C-----  FE FE FF INC  $FFFE,X
  0x04624B $823B: C-----  F9 82 FB SBC  $FB82,Y
  0x04624E $823E: C-----  91 6D    STA  ($6D),Y
  0x046250 $8240: C-----  E1 F1    SBC  ($F1,X)
  0x046252 $8242: C-----  F9 FD FF SBC  $FFFD,Y
  0x046255 $8245: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x046256 $8246: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x046257 $8247: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x046258 $8248: C-----  1E 0E 86 ASL  $860E,X
  0x04625B $824B: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04625C $824C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04625D $824D: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x04625E $824E: C-----  B8       CLV  
  0x04625F $824F: C-----  B8       CLV  
  0x046260 $8250: C-----  09 56    ORA  #$56
  0x046262 $8252: C-----  A8       TAY  
  0x046263 $8253: C-----  50 A0    BVC  $81F5
  0x046265 $8255: C-----  40       RTI  
  0x046266 $8256: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046267 $8257: C-----  00       BRK  
  0x046268 $8258: C-----  F6 A8    INC  $A8,X
  0x04626A $825A: C-----  50 A0    BVC  $81FC
  0x04626C $825C: C-----  40       RTI  
  0x04626D $825D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04626E $825E: C-----  00       BRK  
  0x04626F $825F: C-----  00       BRK  
  0x046270 $8260: C-----  CE 8E 1E DEC  $1E8E
  0x046273 $8263: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x046274 $8264: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x046275 $8265: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x046276 $8266: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x046277 $8267: C-----  41 30    EOR  ($30,X)
  0x046279 $8269: C-----  70 E0    BVS  $824B
  0x04627B $826B: C-----  C0 80    CPY  #$80
  0x04627D $826D: C-----  00       BRK  
  0x04627E $826E: C-----  00       BRK  
  0x04627F $826F: C-----  00       BRK  
  0x046280 $8270: C-----  00       BRK  
  0x046281 $8271: C-----  00       BRK  
  0x046282 $8272: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046283 $8273: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046284 $8274: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046285 $8275: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046286 $8276: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046287 $8277: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046288 $8278: C-----  00       BRK  
  0x046289 $8279: C-----  00       BRK  
  0x04628A $827A: C-----  00       BRK  
  0x04628B $827B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04628C $827C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04628D $827D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04628E $827E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04628F $827F: C-----  FE 03 07 INC  $0703,X
  0x046292 $8282: C-----  0D 1A 15 ORA  $151A
  0x046295 $8285: C-----  2A       ROL  A
  0x046296 $8286: C-----  35 2A    AND  $2A,X
  0x046298 $8288: C-----  00       BRK  
  0x046299 $8289: C-----  00       BRK  
  0x04629A $828A: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04629B $828B: C-----  05 0A    ORA  $0A
  0x04629D $828D: C-----  15 0A    ORA  $0A,X
  0x04629F $828F: C-----  15 80    ORA  $80,X
  0x0462A1 $8291: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0462A2 $8292: C-----  00       BRK  
  0x0462A3 $8293: C-----  00       BRK  
  0x0462A4 $8294: C-----  00       BRK  
  0x0462A5 $8295: C-----  00       BRK  
  0x0462A6 $8296: C-----  00       BRK  
  0x0462A7 $8297: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0462A8 $8298: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0462A9 $8299: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0462AA $829A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0462AB $829B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0462AC $829C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0462AD $829D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0462AE $829E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0462AF $829F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0462B0 $82A0: C-----  CE 8E 1E DEC  $1E8E
  0x0462B3 $82A3: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x0462B4 $82A4: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x0462B5 $82A5: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x0462B6 $82A6: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x0462B7 $82A7: C-----  41 00    EOR  ($00,X)
  0x0462B9 $82A9: C-----  00       BRK  
  0x0462BA $82AA: C-----  00       BRK  
  0x0462BB $82AB: C-----  18       CLC  
  0x0462BC $82AC: C-----  38       SEC  
  0x0462BD $82AD: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0462BE $82AE: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0462BF $82AF: C-----  BE 18 1F LDX  $1F18,Y
  0x0462C2 $82B2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0462C3 $82B3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0462C4 $82B4: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x0462C5 $82B5: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0462C6 $82B6: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0462C7 $82B7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0462C8 $82B8: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x0462C9 $82B9: C-----  E8       INX  
  0x0462CA $82BA: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0462CB $82BB: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0462CC $82BC: C-----  B0 D4    BCS  $8292
  0x0462CE $82BE: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x0462CF $82BF: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0462D0 $82C0: C-----  A1 55    LDA  ($55,X)
  0x0462D2 $82C2: C-----  AA       TAX  
  0x0462D3 $82C3: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x0462D4 $82C4: C-----  F8       SED  
  0x0462D5 $82C5: C-----  00       BRK  
  0x0462D6 $82C6: C-----  00       BRK  
  0x0462D7 $82C7: C-----  00       BRK  
  0x0462D8 $82C8: C-----  5E AA 54 LSR  $54AA,X
  0x0462DB $82CB: C-----  A8       TAY  
  0x0462DC $82CC: C-----  00       BRK  
  0x0462DD $82CD: C-----  00       BRK  
  0x0462DE $82CE: C-----  00       BRK  
  0x0462DF $82CF: C-----  00       BRK  
  0x0462E0 $82D0: C-----  FE F8 F0 INC  $F0F8,X
  0x0462E3 $82D3: C-----  E0 C0    CPX  #$C0
  0x0462E5 $82D5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0462E6 $82D6: C-----  00       BRK  
  0x0462E7 $82D7: C-----  00       BRK  
  0x0462E8 $82D8: C-----  F8       SED  
  0x0462E9 $82D9: C-----  F0 E0    BEQ  $82BB
  0x0462EB $82DB: C-----  C0 80    CPY  #$80
  0x0462ED $82DD: C-----  00       BRK  
  0x0462EE $82DE: C-----  00       BRK  
  0x0462EF $82DF: C-----  00       BRK  
  0x0462F0 $82E0: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0462F1 $82E1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0462F2 $82E2: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x0462F3 $82E3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0462F4 $82E4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0462F5 $82E5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0462F6 $82E6: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0462F7 $82E7: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x0462F8 $82E8: C-----  4D C7 BF EOR  $BFC7
  0x0462FB $82EB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0462FC $82EC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0462FD $82ED: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x0462FE $82EE: C-----  AA       TAX  
  0x0462FF $82EF: C-----  DE 15 56 DEC  $5615,X
  0x046302 $82F2: C-----  A8       TAY  
  0x046303 $82F3: C-----  50 A0    BVC  $8295
  0x046305 $82F5: C-----  40       RTI  
  0x046306 $82F6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046307 $82F7: C-----  00       BRK  
  0x046308 $82F8: C-----  E0 A0    CPX  #$A0
  0x04630A $82FA: C-----  40       RTI  
  0x04630B $82FB: C-----  A0 40    LDY  #$40
  0x04630D $82FD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04630E $82FE: C-----  00       BRK  
  0x04630F $82FF: C-----  00       BRK  
  0x046310 $8300: C-----  01 01    ORA  ($01,X)
  0x046312 $8302: C-----  05 05    ORA  $05
  0x046314 $8304: C-----  05 0D    ORA  $0D
  0x046316 $8306: C-----  0D 2D 00 ORA  $002D
  0x046319 $8309: C-----  00       BRK  
  0x04631A $830A: C-----  00       BRK  
  0x04631B $830B: C-----  00       BRK  
  0x04631C $830C: C-----  00       BRK  
  0x04631D $830D: C-----  00       BRK  
  0x04631E $830E: C-----  00       BRK  
  0x04631F $830F: C-----  00       BRK  
  0x046320 $8310: C-----  00       BRK  
  0x046321 $8311: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x046322 $8312: C-----  91 89    STA  ($89),Y
  0x046324 $8314: C-----  CC CC EE CPY  $EECC
  0x046327 $8317: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x046328 $8318: C-----  00       BRK  
  0x046329 $8319: C-----  00       BRK  
  0x04632A $831A: C-----  00       BRK  
  0x04632B $831B: C-----  00       BRK  
  0x04632C $831C: C-----  00       BRK  
  0x04632D $831D: C-----  00       BRK  
  0x04632E $831E: C-----  00       BRK  
  0x04632F $831F: C-----  00       BRK  
  0x046330 $8320: C-----  2D 2F 2F AND  $2F2F
  0x046333 $8323: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x046334 $8324: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x046335 $8325: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x046336 $8326: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046337 $8327: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046338 $8328: C-----  00       BRK  
  0x046339 $8329: C-----  00       BRK  
  0x04633A $832A: C-----  00       BRK  
  0x04633B $832B: C-----  00       BRK  
  0x04633C $832C: C-----  00       BRK  
  0x04633D $832D: C-----  00       BRK  
  0x04633E $832E: C-----  00       BRK  
  0x04633F $832F: C-----  00       BRK  
  0x046340 $8330: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x046341 $8331: C-----  !!UNDEF $A3  ; unknown opcode, treating as data
  0x046342 $8332: C-----  90 48    BCC  $837C
  0x046344 $8334: C-----  28       PLP  
  0x046345 $8335: C-----  25 14    AND  $14
  0x046347 $8337: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x046348 $8338: C-----  00       BRK  
  0x046349 $8339: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x04634A $833A: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04634B $833B: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04634C $833C: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04634D $833D: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x04634E $833E: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04634F $833F: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x046350 $8340: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046351 $8341: C-----  05 0A    ORA  $0A
  0x046353 $8343: C-----  8D DA F5 STA  $F5DA
  0x046356 $8346: C-----  EE F6 00 INC  $00F6
  0x046359 $8349: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04635A $834A: C-----  05 02    ORA  $02
  0x04635C $834C: C-----  05 0A    ORA  $0A
  0x04635E $834E: C-----  11 09    ORA  ($09),Y
  0x046360 $8350: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046361 $8351: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046362 $8352: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x046363 $8353: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046364 $8354: C-----  85 03    STA  $03
  0x046366 $8356: C-----  01 01    ORA  ($01,X)
  0x046368 $8358: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046369 $8359: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04636A $835A: C-----  79 FD 7A ADC  $7AFD,Y
  0x04636D $835D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04636E $835E: C-----  FE FE 3F INC  $3FFE,X
  0x046371 $8361: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x046372 $8362: C-----  81 01    STA  ($01,X)
  0x046374 $8364: C-----  01 03    ORA  ($03,X)
  0x046376 $8366: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x046377 $8367: C-----  F8       SED  
  0x046378 $8368: C-----  00       BRK  
  0x046379 $8369: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04637A $836A: C-----  7E FE FE ROR  $FEFE,X
  0x04637D $836D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04637E $836E: C-----  A0 00    LDY  #$00
  0x046380 $8370: C-----  01 17    ORA  ($17,X)
  0x046382 $8372: C-----  8C 94 B2 STY  $B294
  0x046385 $8375: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x046386 $8376: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x046387 $8377: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046388 $8378: C-----  FE E8 70 INC  $70E8,X
  0x04638B $837B: C-----  68       PLA  
  0x04638C $837C: C-----  4C 0C 0C JMP  $0C0C
  0x04638F $837F: C-----  00       BRK  
  0x046390 $8380: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x046391 $8381: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x046392 $8382: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x046393 $8383: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x046394 $8384: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046395 $8385: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046396 $8386: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046397 $8387: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046398 $8388: C-----  00       BRK  
  0x046399 $8389: C-----  00       BRK  
  0x04639A $838A: C-----  00       BRK  
  0x04639B $838B: C-----  00       BRK  
  0x04639C $838C: C-----  00       BRK  
  0x04639D $838D: C-----  00       BRK  
  0x04639E $838E: C-----  00       BRK  
  0x04639F $838F: C-----  00       BRK  
  0x0463A0 $8390: C-----  15 56    ORA  $56,X
  0x0463A2 $8392: C-----  A8       TAY  
  0x0463A3 $8393: C-----  50 A0    BVC  $8335
  0x0463A5 $8395: C-----  40       RTI  
  0x0463A6 $8396: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0463A7 $8397: C-----  00       BRK  
  0x0463A8 $8398: C-----  0A       ASL  A
  0x0463A9 $8399: C-----  08       PHP  
  0x0463AA $839A: C-----  10 00    BPL  $839C
  0x0463AC $839C: C-----  00       BRK  
  0x0463AD $839D: C-----  00       BRK  
  0x0463AE $839E: C-----  00       BRK  
  0x0463AF $839F: C-----  00       BRK  
  0x0463B0 $83A0: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0463B1 $83A1: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0463B2 $83A2: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0463B3 $83A3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0463B4 $83A4: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0463B5 $83A5: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0463B6 $83A6: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0463B7 $83A7: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x0463B8 $83A8: C-----  00       BRK  
  0x0463B9 $83A9: C-----  00       BRK  
  0x0463BA $83AA: C-----  00       BRK  
  0x0463BB $83AB: C-----  00       BRK  
  0x0463BC $83AC: C-----  08       PHP  
  0x0463BD $83AD: C-----  10 00    BPL  $83AF
  0x0463BF $83AF: C-----  10 FF    BPL  $83B0
  0x0463C1 $83B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0463C2 $83B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0463C3 $83B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0463C4 $83B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0463C5 $83B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0463C6 $83B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0463C7 $83B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0463C8 $83B8: C-----  05 06    ORA  $06
  0x0463CA $83BA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0463CB $83BB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0463CC $83BC: C-----  21 18    AND  ($18,X)
  0x0463CE $83BE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0463CF $83BF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0463D0 $83C0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0463D1 $83C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0463D2 $83C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0463D3 $83C3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0463D4 $83C4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0463D5 $83C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0463D6 $83C6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0463D7 $83C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0463D8 $83C8: C-----  00       BRK  
  0x0463D9 $83C9: C-----  00       BRK  
  0x0463DA $83CA: C-----  00       BRK  
  0x0463DB $83CB: C-----  00       BRK  
  0x0463DC $83CC: C-----  00       BRK  
  0x0463DD $83CD: C-----  00       BRK  
  0x0463DE $83CE: C-----  00       BRK  
  0x0463DF $83CF: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0463E0 $83D0: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x0463E1 $83D1: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x0463E2 $83D2: C-----  E9 F9    SBC  #$F9
  0x0463E4 $83D4: C-----  F9 F9 F1 SBC  $F1F9,Y
  0x0463E7 $83D7: C-----  F1 0C    SBC  ($0C),Y
  0x0463E9 $83D9: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0463EA $83DA: C-----  16 06    ASL  $06,X
  0x0463EC $83DC: C-----  06 06    ASL  $06
  0x0463EE $83DE: C-----  0E 0E F7 ASL  $F70E
  0x0463F1 $83E1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0463F2 $83E2: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x0463F3 $83E3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0463F4 $83E4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0463F5 $83E5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0463F6 $83E6: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0463F7 $83E7: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x0463F8 $83E8: C-----  CD C7 BF CMP  $BFC7
  0x0463FB $83EB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0463FC $83EC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0463FD $83ED: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x0463FE $83EE: C-----  AA       TAX  
  0x0463FF $83EF: C-----  DE E1 F1 DEC  $F1E1,X
  0x046402 $83F2: C-----  E1 E1    SBC  ($E1,X)
  0x046404 $83F4: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x046405 $83F5: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x046406 $83F6: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x046407 $83F7: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x046408 $83F8: C-----  1E 0E 9E ASL  $9E0E,X
  0x04640B $83FB: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x04640C $83FC: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x04640D $83FD: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x04640E $83FE: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x04640F $83FF: C-----  98       TYA  
  0x046410 $8400: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046411 $8401: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046412 $8402: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046413 $8403: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046414 $8404: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046415 $8405: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046416 $8406: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046417 $8407: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046418 $8408: C-----  00       BRK  
  0x046419 $8409: C-----  00       BRK  
  0x04641A $840A: C-----  00       BRK  
  0x04641B $840B: C-----  00       BRK  
  0x04641C $840C: C-----  00       BRK  
  0x04641D $840D: C-----  01 01    ORA  ($01,X)
  0x04641F $840F: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x046420 $8410: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046421 $8411: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046422 $8412: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046423 $8413: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046424 $8414: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046425 $8415: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046426 $8416: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046427 $8417: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046428 $8418: C-----  00       BRK  
  0x046429 $8419: C-----  00       BRK  
  0x04642A $841A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04642B $841B: C-----  C0 E8    CPY  #$E8
  0x04642D $841D: C-----  A4 74    LDY  $74
  0x04642F $841F: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x046430 $8420: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046431 $8421: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046432 $8422: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046433 $8423: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x046434 $8424: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x046435 $8425: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x046436 $8426: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046437 $8427: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046438 $8428: C-----  0E 3F 23 ASL  $233F
  0x04643B $842B: C-----  !!UNDEF $5A  ; unknown opcode, treating as data
  0x04643C $842C: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04643D $842D: C-----  66 F7    ROR  $F7
  0x04643F $842F: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x046440 $8430: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046441 $8431: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046442 $8432: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046443 $8433: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x046444 $8434: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x046445 $8435: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046446 $8436: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046447 $8437: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046448 $8438: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x046449 $8439: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04644A $843A: C-----  CE B6 7E DEC  $7EB6
  0x04644D $843D: C-----  EA       NOP  
  0x04644E $843E: C-----  38       SEC  
  0x04644F $843F: C-----  F0 04    BEQ  $8445
  0x046451 $8441: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x046452 $8442: C-----  08       PHP  
  0x046453 $8443: C-----  30 C2    BMI  $8407
  0x046455 $8445: C-----  24 39    BIT  $39
  0x046457 $8447: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046458 $8448: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046459 $8449: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04645A $844A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04645B $844B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04645C $844C: C-----  3D 1B 06 AND  $061B,X
  0x04645F $844F: C-----  00       BRK  
  0x046460 $8450: C-----  01 01    ORA  ($01,X)
  0x046462 $8452: C-----  20 76 7F JSR  $7F76
  0x046465 $8455: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046466 $8456: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046467 $8457: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046468 $8458: C-----  FE FE DF INC  $DFFE,X
  0x04646B $845B: C-----  A9 B2    LDA  #$B2
  0x04646D $845D: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x04646E $845E: C-----  71 ED    ADC  ($ED),Y
  0x046470 $8460: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046471 $8461: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046472 $8462: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046473 $8463: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046474 $8464: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046475 $8465: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046476 $8466: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x046477 $8467: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046478 $8468: C-----  F9 FB F3 SBC  $F3FB,Y
  0x04647B $846B: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04647C $846C: C-----  D0 9C    BNE  $840A
  0x04647E $846E: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x04647F $846F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046480 $8470: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x046481 $8471: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x046482 $8472: C-----  81 81    STA  ($81,X)
  0x046484 $8474: C-----  81 81    STA  ($81,X)
  0x046486 $8476: C-----  81 81    STA  ($81,X)
  0x046488 $8478: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x046489 $8479: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04648A $847A: C-----  7E 7E 7E ROR  $7E7E,X
  0x04648D $847D: C-----  7E 7E 7E ROR  $7E7E,X
  0x046490 $8480: C-----  00       BRK  
  0x046491 $8481: C-----  01 06    ORA  ($06,X)
  0x046493 $8483: C-----  08       PHP  
  0x046494 $8484: C-----  10 20    BPL  $84A6
  0x046496 $8486: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x046497 $8487: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x046498 $8488: C-----  00       BRK  
  0x046499 $8489: C-----  00       BRK  
  0x04649A $848A: C-----  01 07    ORA  ($07,X)
  0x04649C $848C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04649D $848D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04649E $848E: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04649F $848F: C-----  30 7E    BMI  $850F
  0x0464A1 $8491: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0464A2 $8492: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0464A3 $8493: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0464A4 $8494: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0464A5 $8495: C-----  81 81    STA  ($81,X)
  0x0464A7 $8497: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0464A8 $8498: C-----  00       BRK  
  0x0464A9 $8499: C-----  00       BRK  
  0x0464AA $849A: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0464AB $849B: C-----  BD BD 7E LDA  $7EBD,X
  0x0464AE $849E: C-----  7E 3C 7F ROR  $7F3C,X
  0x0464B1 $84A1: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0464B2 $84A2: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0464B3 $84A3: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0464B4 $84A4: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0464B5 $84A5: C-----  88       DEY  
  0x0464B6 $84A6: C-----  90 70    BCC  $8518
  0x0464B8 $84A8: C-----  00       BRK  
  0x0464B9 $84A9: C-----  60       RTS  
  0x0464BA $84AA: C-----  70 70    BVS  $851C
  0x0464BC $84AC: C-----  70 77    BVS  $8525
  0x0464BE $84AE: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x0464BF $84AF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0464C0 $84B0: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0464C1 $84B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0464C2 $84B2: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x0464C3 $84B3: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0464C4 $84B4: C-----  81 81    STA  ($81,X)
  0x0464C6 $84B6: C-----  81 42    STA  ($42,X)
  0x0464C8 $84B8: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0464C9 $84B9: C-----  00       BRK  
  0x0464CA $84BA: C-----  18       CLC  
  0x0464CB $84BB: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0464CC $84BC: C-----  7E 7E 7E ROR  $7E7E,X
  0x0464CF $84BF: C-----  BD 00 00 LDA  $0000,X
  0x0464D2 $84C2: C-----  00       BRK  
  0x0464D3 $84C3: C-----  01 07    ORA  ($07,X)
  0x0464D5 $84C5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0464D6 $84C6: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x0464D7 $84C7: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0464D8 $84C8: C-----  00       BRK  
  0x0464D9 $84C9: C-----  00       BRK  
  0x0464DA $84CA: C-----  00       BRK  
  0x0464DB $84CB: C-----  00       BRK  
  0x0464DC $84CC: C-----  00       BRK  
  0x0464DD $84CD: C-----  00       BRK  
  0x0464DE $84CE: C-----  08       PHP  
  0x0464DF $84CF: C-----  10 00    BPL  $84D1
  0x0464E1 $84D1: C-----  00       BRK  
  0x0464E2 $84D2: C-----  00       BRK  
  0x0464E3 $84D3: C-----  E0 18    CPX  #$18
  0x0464E5 $84D5: C-----  E6 C3    INC  $C3
  0x0464E7 $84D7: C-----  C1 00    CMP  ($00,X)
  0x0464E9 $84D9: C-----  00       BRK  
  0x0464EA $84DA: C-----  00       BRK  
  0x0464EB $84DB: C-----  00       BRK  
  0x0464EC $84DC: C-----  E0 18    CPX  #$18
  0x0464EE $84DE: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0464EF $84DF: C-----  3E 5F 67 ROL  $675F,X
  0x0464F2 $84E2: C-----  C1 C1    CMP  ($C1,X)
  0x0464F4 $84E4: C-----  C1 A7    CMP  ($A7,X)
  0x0464F6 $84E6: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0464F7 $84E7: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x0464F8 $84E8: C-----  20 18 3E JSR  $3E18
  0x0464FB $84EB: C-----  3E 3E 58 ROL  $583E,X
  0x0464FE $84EE: C-----  20 30 F3 JSR  $F330
  0x046501 $84F1: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x046502 $84F2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046503 $84F3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046504 $84F4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046505 $84F5: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x046506 $84F6: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x046507 $84F7: C-----  C0 0C    CPY  #$0C
  0x046509 $84F9: C-----  70 F8    BVS  $84F3
  0x04650B $84FB: C-----  F8       SED  
  0x04650C $84FC: C-----  F8       SED  
  0x04650D $84FD: C-----  70 0C    BVS  $850B
  0x04650F $84FF: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046510 $8500: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x046511 $8501: C-----  68       PLA  
  0x046512 $8502: C-----  D0 AE    BNE  $84B2
  0x046514 $8504: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x046515 $8505: C-----  84 D8    STY  $D8
  0x046517 $8507: C-----  A8       TAY  
  0x046518 $8508: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x046519 $8509: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04651A $850A: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04651B $850B: C-----  51 3C    EOR  ($3C),Y
  0x04651D $850D: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x04651E $850E: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x04651F $850F: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x046520 $8510: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x046521 $8511: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046522 $8512: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x046523 $8513: C-----  08       PHP  
  0x046524 $8514: C-----  FE 1F 7F INC  $7F1F,X
  0x046527 $8517: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046528 $8518: C-----  01 00    ORA  ($00,X)
  0x04652A $851A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04652B $851B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04652C $851C: C-----  01 0E    ORA  ($0E,X)
  0x04652E $851E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04652F $851F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046530 $8520: C-----  D1 A1    CMP  ($A1),Y
  0x046532 $8522: C-----  C1 A3    CMP  ($A3,X)
  0x046534 $8524: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x046535 $8525: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x046536 $8526: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x046537 $8527: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x046538 $8528: C-----  2E 5E 3E ROL  $3E5E
  0x04653B $852B: C-----  5D 3B 5B EOR  $5B3B,X
  0x04653E $852E: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x04653F $852F: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x046540 $8530: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046541 $8531: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046542 $8532: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046543 $8533: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046544 $8534: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046545 $8535: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046546 $8536: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046547 $8537: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046548 $8538: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046549 $8539: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04654A $853A: C-----  FD FE FF SBC  $FFFE,X
  0x04654D $853D: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04654E $853E: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04654F $853F: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x046550 $8540: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046551 $8541: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046552 $8542: C-----  FE 00 00 INC  $0000,X
  0x046555 $8545: C-----  00       BRK  
  0x046556 $8546: C-----  81 C7    STA  ($C7,X)
  0x046558 $8548: C-----  ED F8 01 SBC  $01F8
  0x04655B $854B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04655C $854C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04655D $854D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04655E $854E: C-----  7E B8 E7 ROR  $E7B8,X
  0x046561 $8551: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046562 $8552: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x046563 $8553: C-----  08       PHP  
  0x046564 $8554: C-----  FE FF FF INC  $FFFF,X
  0x046567 $8557: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046568 $8558: C-----  01 00    ORA  ($00,X)
  0x04656A $855A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04656B $855B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04656C $855C: C-----  01 EE    ORA  ($EE,X)
  0x04656E $855E: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04656F $855F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046570 $8560: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x046571 $8561: C-----  F5 FA    SBC  $FA,X
  0x046573 $8563: C-----  FD FF FF SBC  $FFFF,X
  0x046576 $8566: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046577 $8567: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046578 $8568: C-----  C5 EA    CMP  $EA
  0x04657A $856A: C-----  F5 F2    SBC  $F2,X
  0x04657C $856C: C-----  78       SEI  
  0x04657D $856D: C-----  BA       TSX  
  0x04657E $856E: C-----  !!UNDEF $D2  ; unknown opcode, treating as data
  0x04657F $856F: C-----  C6 54    DEC  $54
  0x046581 $8571: C-----  68       PLA  
  0x046582 $8572: C-----  D0 AE    BNE  $8522
  0x046584 $8574: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x046585 $8575: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x046586 $8576: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x046587 $8577: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x046588 $8578: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x046589 $8579: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04658A $857A: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04658B $857B: C-----  51 3C    EOR  ($3C),Y
  0x04658D $857D: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x04658E $857E: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x04658F $857F: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x046590 $8580: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x046591 $8581: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046592 $8582: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046593 $8583: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046594 $8584: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046595 $8585: C-----  01 00    ORA  ($00,X)
  0x046597 $8587: C-----  00       BRK  
  0x046598 $8588: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x046599 $8589: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04659A $858A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04659B $858B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04659C $858C: C-----  00       BRK  
  0x04659D $858D: C-----  00       BRK  
  0x04659E $858E: C-----  00       BRK  
  0x04659F $858F: C-----  00       BRK  
  0x0465A0 $8590: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0465A1 $8591: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0465A2 $8592: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0465A3 $8593: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0465A4 $8594: C-----  FE F8 70 INC  $70F8,X
  0x0465A7 $8597: C-----  00       BRK  
  0x0465A8 $8598: C-----  7D BE DE ADC  $DEBE,X
  0x0465AB $859B: C-----  EC F0 70 CPX  $70F0
  0x0465AE $859E: C-----  00       BRK  
  0x0465AF $859F: C-----  00       BRK  
  0x0465B0 $85A0: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x0465B1 $85A1: C-----  68       PLA  
  0x0465B2 $85A2: C-----  D0 AE    BNE  $8552
  0x0465B4 $85A4: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0465B5 $85A5: C-----  84 DB    STY  $DB
  0x0465B7 $85A7: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x0465B8 $85A8: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x0465B9 $85A9: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x0465BA $85AA: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0465BB $85AB: C-----  51 3C    EOR  ($3C),Y
  0x0465BD $85AD: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x0465BE $85AE: C-----  24 50    BIT  $50
  0x0465C0 $85B0: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x0465C1 $85B1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0465C2 $85B2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0465C3 $85B3: C-----  08       PHP  
  0x0465C4 $85B4: C-----  F0 FF    BEQ  $85B5
  0x0465C6 $85B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0465C7 $85B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0465C8 $85B8: C-----  01 00    ORA  ($00,X)
  0x0465CA $85BA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0465CB $85BB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0465CC $85BC: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0465CD $85BD: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0465CE $85BE: C-----  00       BRK  
  0x0465CF $85BF: C-----  00       BRK  
  0x0465D0 $85C0: C-----  FE FE FC INC  $FCFE,X
  0x0465D3 $85C3: C-----  78       SEI  
  0x0465D4 $85C4: C-----  00       BRK  
  0x0465D5 $85C5: C-----  00       BRK  
  0x0465D6 $85C6: C-----  00       BRK  
  0x0465D7 $85C7: C-----  00       BRK  
  0x0465D8 $85C8: C-----  CC 9C 38 CPY  $389C
  0x0465DB $85CB: C-----  00       BRK  
  0x0465DC $85CC: C-----  00       BRK  
  0x0465DD $85CD: C-----  00       BRK  
  0x0465DE $85CE: C-----  00       BRK  
  0x0465DF $85CF: C-----  00       BRK  
  0x0465E0 $85D0: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0465E1 $85D1: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0465E2 $85D2: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0465E3 $85D3: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0465E4 $85D4: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0465E5 $85D5: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0465E6 $85D6: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0465E7 $85D7: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x0465E8 $85D8: C-----  2E 5E 3E ROL  $3E5E
  0x0465EB $85DB: C-----  5D 3B 5B EOR  $5B3B,X
  0x0465EE $85DE: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x0465EF $85DF: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x0465F0 $85E0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0465F1 $85E1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0465F2 $85E2: C-----  FE 00 00 INC  $0000,X
  0x0465F5 $85E5: C-----  00       BRK  
  0x0465F6 $85E6: C-----  81 C7    STA  ($C7,X)
  0x0465F8 $85E8: C-----  ED F8 01 SBC  $01F8
  0x0465FB $85EB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0465FC $85EC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0465FD $85ED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0465FE $85EE: C-----  7E 38 00 ROR  $0038,X
  0x046601 $85F1: C-----  00       BRK  
  0x046602 $85F2: C-----  00       BRK  
  0x046603 $85F3: C-----  00       BRK  
  0x046604 $85F4: C-----  00       BRK  
  0x046605 $85F5: C-----  01 01    ORA  ($01,X)
  0x046607 $85F7: C-----  01 00    ORA  ($00,X)
  0x046609 $85F9: C-----  00       BRK  
  0x04660A $85FA: C-----  00       BRK  
  0x04660B $85FB: C-----  00       BRK  
  0x04660C $85FC: C-----  00       BRK  
  0x04660D $85FD: C-----  00       BRK  
  0x04660E $85FE: C-----  00       BRK  
  0x04660F $85FF: C-----  00       BRK  
  0x046610 $8600: C-----  70 38    BVS  $863A
  0x046612 $8602: C-----  38       SEC  
  0x046613 $8603: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046614 $8604: C-----  08       PHP  
  0x046615 $8605: C-----  06 01    ASL  $01
  0x046617 $8607: C-----  00       BRK  
  0x046618 $8608: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046619 $8609: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04661A $860A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04661B $860B: C-----  00       BRK  
  0x04661C $860C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04661D $860D: C-----  01 00    ORA  ($00,X)
  0x04661F $860F: C-----  00       BRK  
  0x046620 $8610: C-----  66 7E    ROR  $7E
  0x046622 $8612: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046623 $8613: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046624 $8614: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046625 $8615: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x046626 $8616: C-----  99 7E 99 STA  $997E,Y
  0x046629 $8619: C-----  81 00    STA  ($00,X)
  0x04662B $861B: C-----  00       BRK  
  0x04662C $861C: C-----  00       BRK  
  0x04662D $861D: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04662E $861E: C-----  66 00    ROR  $00
  0x046630 $8620: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046631 $8621: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046632 $8622: C-----  C0 C0    CPY  #$C0
  0x046634 $8624: C-----  C0 C0    CPY  #$C0
  0x046636 $8626: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046637 $8627: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046638 $8628: C-----  00       BRK  
  0x046639 $8629: C-----  00       BRK  
  0x04663A $862A: C-----  00       BRK  
  0x04663B $862B: C-----  00       BRK  
  0x04663C $862C: C-----  00       BRK  
  0x04663D $862D: C-----  00       BRK  
  0x04663E $862E: C-----  00       BRK  
  0x04663F $862F: C-----  00       BRK  
  0x046640 $8630: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x046641 $8631: C-----  68       PLA  
  0x046642 $8632: C-----  50 6E    BVC  $86A2
  0x046644 $8634: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x046645 $8635: C-----  84 D8    STY  $D8
  0x046647 $8637: C-----  A8       TAY  
  0x046648 $8638: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x046649 $8639: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04664A $863A: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04664B $863B: C-----  11 3C    ORA  ($3C),Y
  0x04664D $863D: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x04664E $863E: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x04664F $863F: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x046650 $8640: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x046651 $8641: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x046652 $8642: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x046653 $8643: C-----  06 01    ASL  $01
  0x046655 $8645: C-----  00       BRK  
  0x046656 $8646: C-----  00       BRK  
  0x046657 $8647: C-----  00       BRK  
  0x046658 $8648: C-----  10 08    BPL  $8652
  0x04665A $864A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04665B $864B: C-----  01 00    ORA  ($00,X)
  0x04665D $864D: C-----  00       BRK  
  0x04665E $864E: C-----  00       BRK  
  0x04665F $864F: C-----  00       BRK  
  0x046660 $8650: C-----  C1 E3    CMP  ($E3,X)
  0x046662 $8652: C-----  1E 18 E0 ASL  $E018,X
  0x046665 $8655: C-----  00       BRK  
  0x046666 $8656: C-----  00       BRK  
  0x046667 $8657: C-----  00       BRK  
  0x046668 $8658: C-----  3E 1C E0 ROL  $E01C,X
  0x04666B $865B: C-----  E0 00    CPX  #$00
  0x04666D $865D: C-----  00       BRK  
  0x04666E $865E: C-----  00       BRK  
  0x04666F $865F: C-----  00       BRK  
  0x046670 $8660: C-----  06 08    ASL  $08
  0x046672 $8662: C-----  10 90    BPL  $85F4
  0x046674 $8664: C-----  FE 1F 7F INC  $7F1F,X
  0x046677 $8667: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046678 $8668: C-----  01 07    ORA  ($07,X)
  0x04667A $866A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04667B $866B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04667C $866C: C-----  01 0E    ORA  ($0E,X)
  0x04667E $866E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04667F $866F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046680 $8670: C-----  F0 00    BEQ  $8672
  0x046682 $8672: C-----  00       BRK  
  0x046683 $8673: C-----  00       BRK  
  0x046684 $8674: C-----  00       BRK  
  0x046685 $8675: C-----  00       BRK  
  0x046686 $8676: C-----  81 C7    STA  ($C7,X)
  0x046688 $8678: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046689 $8679: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04668A $867A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04668B $867B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04668C $867C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04668D $867D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04668E $867E: C-----  7E B8 03 ROR  $03B8,X
  0x046691 $8681: C-----  05 79    ORA  $79
  0x046693 $8683: C-----  21 10    AND  ($10,X)
  0x046695 $8685: C-----  10 20    BPL  $86A7
  0x046697 $8687: C-----  40       RTI  
  0x046698 $8688: C-----  00       BRK  
  0x046699 $8689: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04669A $868A: C-----  06 1E    ASL  $1E
  0x04669C $868C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04669D $868D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04669E $868E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04669F $868F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0466A0 $8690: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0466A1 $8691: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0466A2 $8692: C-----  11 21    ORA  ($21),Y
  0x0466A4 $8694: C-----  E0 E0    CPX  #$E0
  0x0466A6 $8696: C-----  70 71    BVS  $8709
  0x0466A8 $8698: C-----  E0 E0    CPX  #$E0
  0x0466AA $869A: C-----  EE DE 1F INC  $1FDE
  0x0466AD $869D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0466AE $869E: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0466AF $869F: C-----  8E F8 09 STX  $09F8
  0x0466B2 $86A2: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0466B3 $86A3: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0466B4 $86A4: C-----  08       PHP  
  0x0466B5 $86A5: C-----  00       BRK  
  0x0466B6 $86A6: C-----  00       BRK  
  0x0466B7 $86A7: C-----  00       BRK  
  0x0466B8 $86A8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0466B9 $86A9: C-----  06 04    ASL  $04
  0x0466BB $86AB: C-----  00       BRK  
  0x0466BC $86AC: C-----  00       BRK  
  0x0466BD $86AD: C-----  00       BRK  
  0x0466BE $86AE: C-----  00       BRK  
  0x0466BF $86AF: C-----  00       BRK  
  0x0466C0 $86B0: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0466C1 $86B1: C-----  11 BC    ORA  ($BC),Y
  0x0466C3 $86B3: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x0466C4 $86B4: C-----  40       RTI  
  0x0466C5 $86B5: C-----  00       BRK  
  0x0466C6 $86B6: C-----  00       BRK  
  0x0466C7 $86B7: C-----  00       BRK  
  0x0466C8 $86B8: C-----  C0 EE    CPY  #$EE
  0x0466CA $86BA: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x0466CB $86BB: C-----  00       BRK  
  0x0466CC $86BC: C-----  00       BRK  
  0x0466CD $86BD: C-----  00       BRK  
  0x0466CE $86BE: C-----  00       BRK  
  0x0466CF $86BF: C-----  00       BRK  
  0x0466D0 $86C0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0466D1 $86C1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0466D2 $86C2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0466D3 $86C3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0466D4 $86C4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0466D5 $86C5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0466D6 $86C6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0466D7 $86C7: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0466D8 $86C8: C-----  00       BRK  
  0x0466D9 $86C9: C-----  00       BRK  
  0x0466DA $86CA: C-----  00       BRK  
  0x0466DB $86CB: C-----  00       BRK  
  0x0466DC $86CC: C-----  00       BRK  
  0x0466DD $86CD: C-----  00       BRK  
  0x0466DE $86CE: C-----  00       BRK  
  0x0466DF $86CF: C-----  00       BRK  
  0x0466E0 $86D0: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0466E1 $86D1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0466E2 $86D2: C-----  11 21    ORA  ($21),Y
  0x0466E4 $86D4: C-----  E0 E0    CPX  #$E0
  0x0466E6 $86D6: C-----  F0 F1    BEQ  $86C9
  0x0466E8 $86D8: C-----  E0 E0    CPX  #$E0
  0x0466EA $86DA: C-----  EE DE 1F INC  $1FDE
  0x0466ED $86DD: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0466EE $86DE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0466EF $86DF: C-----  0E FF 0F ASL  $0FFF
  0x0466F2 $86E2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0466F3 $86E3: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0466F4 $86E4: C-----  08       PHP  
  0x0466F5 $86E5: C-----  00       BRK  
  0x0466F6 $86E6: C-----  00       BRK  
  0x0466F7 $86E7: C-----  00       BRK  
  0x0466F8 $86E8: C-----  00       BRK  
  0x0466F9 $86E9: C-----  00       BRK  
  0x0466FA $86EA: C-----  00       BRK  
  0x0466FB $86EB: C-----  00       BRK  
  0x0466FC $86EC: C-----  00       BRK  
  0x0466FD $86ED: C-----  00       BRK  
  0x0466FE $86EE: C-----  00       BRK  
  0x0466FF $86EF: C-----  00       BRK  
  0x046700 $86F0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046701 $86F1: C-----  F1 FC    SBC  ($FC),Y
  0x046703 $86F3: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x046704 $86F4: C-----  40       RTI  
  0x046705 $86F5: C-----  00       BRK  
  0x046706 $86F6: C-----  00       BRK  
  0x046707 $86F7: C-----  00       BRK  
  0x046708 $86F8: C-----  00       BRK  
  0x046709 $86F9: C-----  0E 03 00 ASL  $0003
  0x04670C $86FC: C-----  00       BRK  
  0x04670D $86FD: C-----  00       BRK  
  0x04670E $86FE: C-----  00       BRK  
  0x04670F $86FF: C-----  00       BRK  
  0x046710 $8700: C-----  F8       SED  
  0x046711 $8701: C-----  E0 41    CPX  #$41
  0x046713 $8703: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x046714 $8704: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x046715 $8705: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046716 $8706: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046717 $8707: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046718 $8708: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046719 $8709: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04671A $870A: C-----  3E 38 60 ROL  $6038,X
  0x04671D $870D: C-----  00       BRK  
  0x04671E $870E: C-----  C0 E0    CPY  #$E0
  0x046720 $8710: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x046721 $8711: C-----  84 02    STY  $02
  0x046723 $8713: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046724 $8714: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x046725 $8715: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x046726 $8716: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046727 $8717: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x046728 $8718: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046729 $8719: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x04672A $871A: C-----  FD FC 78 SBC  $78FC,X
  0x04672D $871D: C-----  78       SEI  
  0x04672E $871E: C-----  00       BRK  
  0x04672F $871F: C-----  30 1F    BMI  $8740
  0x046731 $8721: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046732 $8722: C-----  11 21    ORA  ($21),Y
  0x046734 $8724: C-----  E0 E0    CPX  #$E0
  0x046736 $8726: C-----  70 71    BVS  $8799
  0x046738 $8728: C-----  E0 E0    CPX  #$E0
  0x04673A $872A: C-----  EE DE 1F INC  $1FDE
  0x04673D $872D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04673E $872E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04673F $872F: C-----  0E 87 03 ASL  $0387
  0x046742 $8732: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x046743 $8733: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x046744 $8734: C-----  84 CC    STY  $CC
  0x046746 $8736: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x046747 $8737: C-----  FE 78 FC INC  $FC78,X
  0x04674A $873A: C-----  FD FD 7B SBC  $7BFD,X
  0x04674D $873D: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x04674E $873E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04674F $873F: C-----  01 3A    ORA  ($3A,X)
  0x046751 $8741: C-----  15 0A    ORA  $0A,X
  0x046753 $8743: C-----  8D E7 FE STA  $FEE7
  0x046756 $8746: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x046757 $8747: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x046758 $8748: C-----  C0 E0    CPY  #$E0
  0x04675A $874A: C-----  F0 70    BEQ  $87BC
  0x04675C $874C: C-----  18       CLC  
  0x04675D $874D: C-----  00       BRK  
  0x04675E $874E: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04675F $874F: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x046760 $8750: C-----  01 01    ORA  ($01,X)
  0x046762 $8752: C-----  01 01    ORA  ($01,X)
  0x046764 $8754: C-----  00       BRK  
  0x046765 $8755: C-----  00       BRK  
  0x046766 $8756: C-----  00       BRK  
  0x046767 $8757: C-----  00       BRK  
  0x046768 $8758: C-----  00       BRK  
  0x046769 $8759: C-----  00       BRK  
  0x04676A $875A: C-----  00       BRK  
  0x04676B $875B: C-----  00       BRK  
  0x04676C $875C: C-----  00       BRK  
  0x04676D $875D: C-----  00       BRK  
  0x04676E $875E: C-----  00       BRK  
  0x04676F $875F: C-----  00       BRK  
  0x046770 $8760: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x046771 $8761: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x046772 $8762: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x046773 $8763: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x046774 $8764: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x046775 $8765: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x046776 $8766: C-----  38       SEC  
  0x046777 $8767: C-----  38       SEC  
  0x046778 $8768: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x046779 $8769: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04677A $876A: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04677B $876B: C-----  EC E0 E0 CPX  $E0E0
  0x04677E $876E: C-----  C0 C0    CPY  #$C0
  0x046780 $8770: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x046781 $8771: C-----  15 0A    ORA  $0A,X
  0x046783 $8773: C-----  8D E7 FE STA  $FEE7
  0x046786 $8776: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x046787 $8777: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x046788 $8778: C-----  05 0A    ORA  $0A
  0x04678A $877A: C-----  05 02    ORA  $02
  0x04678C $877C: C-----  00       BRK  
  0x04678D $877D: C-----  00       BRK  
  0x04678E $877E: C-----  00       BRK  
  0x04678F $877F: C-----  00       BRK  
  0x046790 $8780: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046791 $8781: C-----  11 0C    ORA  ($0C),Y
  0x046793 $8783: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046794 $8784: C-----  00       BRK  
  0x046795 $8785: C-----  00       BRK  
  0x046796 $8786: C-----  00       BRK  
  0x046797 $8787: C-----  00       BRK  
  0x046798 $8788: C-----  00       BRK  
  0x046799 $8789: C-----  0E 03 00 ASL  $0003
  0x04679C $878C: C-----  00       BRK  
  0x04679D $878D: C-----  00       BRK  
  0x04679E $878E: C-----  00       BRK  
  0x04679F $878F: C-----  00       BRK  
  0x0467A0 $8790: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0467A1 $8791: C-----  FE 78 33 INC  $3378,X
  0x0467A4 $8794: C-----  FE 00 00 INC  $0000,X
  0x0467A7 $8797: C-----  00       BRK  
  0x0467A8 $8798: C-----  00       BRK  
  0x0467A9 $8799: C-----  01 87    ORA  ($87,X)
  0x0467AB $879B: C-----  CC 00 00 CPY  $0000
  0x0467AE $879E: C-----  00       BRK  
  0x0467AF $879F: C-----  00       BRK  
  0x0467B0 $87A0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0467B1 $87A1: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0467B2 $87A2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0467B3 $87A3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0467B4 $87A4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0467B5 $87A5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0467B6 $87A6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0467B7 $87A7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0467B8 $87A8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0467B9 $87A9: C-----  60       RTS  
  0x0467BA $87AA: C-----  F8       SED  
  0x0467BB $87AB: C-----  F0 E0    BEQ  $878D
  0x0467BD $87AD: C-----  00       BRK  
  0x0467BE $87AE: C-----  00       BRK  
  0x0467BF $87AF: C-----  00       BRK  
  0x0467C0 $87B0: C-----  E0 C0    CPX  #$C0
  0x0467C2 $87B2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0467C3 $87B3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0467C4 $87B4: C-----  C0 E0    CPY  #$E0
  0x0467C6 $87B6: C-----  F0 F8    BEQ  $87B0
  0x0467C8 $87B8: C-----  00       BRK  
  0x0467C9 $87B9: C-----  00       BRK  
  0x0467CA $87BA: C-----  00       BRK  
  0x0467CB $87BB: C-----  00       BRK  
  0x0467CC $87BC: C-----  00       BRK  
  0x0467CD $87BD: C-----  00       BRK  
  0x0467CE $87BE: C-----  00       BRK  
  0x0467CF $87BF: C-----  00       BRK  
  0x0467D0 $87C0: C-----  F0 20    BEQ  $87E2
  0x0467D2 $87C2: C-----  C0 80    CPY  #$80
  0x0467D4 $87C4: C-----  00       BRK  
  0x0467D5 $87C5: C-----  00       BRK  
  0x0467D6 $87C6: C-----  00       BRK  
  0x0467D7 $87C7: C-----  00       BRK  
  0x0467D8 $87C8: C-----  00       BRK  
  0x0467D9 $87C9: C-----  C0 00    CPY  #$00
  0x0467DB $87CB: C-----  00       BRK  
  0x0467DC $87CC: C-----  00       BRK  
  0x0467DD $87CD: C-----  00       BRK  
  0x0467DE $87CE: C-----  00       BRK  
  0x0467DF $87CF: C-----  00       BRK  
  0x0467E0 $87D0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0467E1 $87D1: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x0467E2 $87D2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0467E3 $87D3: C-----  08       PHP  
  0x0467E4 $87D4: C-----  18       CLC  
  0x0467E5 $87D5: C-----  F0 C0    BEQ  $8797
  0x0467E7 $87D7: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x0467E8 $87D8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0467E9 $87D9: C-----  61 FB    ADC  ($FB,X)
  0x0467EB $87DB: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0467EC $87DC: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x0467ED $87DD: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0467EE $87DE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0467EF $87DF: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0467F0 $87E0: C-----  E0 40    CPX  #$40
  0x0467F2 $87E2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0467F3 $87E3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0467F4 $87E4: C-----  40       RTI  
  0x0467F5 $87E5: C-----  20 10 F8 JSR  $F810
  0x0467F8 $87E8: C-----  00       BRK  
  0x0467F9 $87E9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0467FA $87EA: C-----  00       BRK  
  0x0467FB $87EB: C-----  00       BRK  
  0x0467FC $87EC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0467FD $87ED: C-----  C0 E0    CPY  #$E0
  0x0467FF $87EF: C-----  00       BRK  
  0x046800 $87F0: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x046801 $87F1: C-----  !!UNDEF $B2  ; unknown opcode, treating as data
  0x046802 $87F2: C-----  CA       DEX  
  0x046803 $87F3: C-----  86 02    STX  $02
  0x046805 $87F5: C-----  00       BRK  
  0x046806 $87F6: C-----  00       BRK  
  0x046807 $87F7: C-----  00       BRK  
  0x046808 $87F8: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x046809 $87F9: C-----  4C 04 00 JMP  $0004
  0x04680C $87FC: C-----  00       BRK  
  0x04680D $87FD: C-----  00       BRK  
  0x04680E $87FE: C-----  00       BRK  
  0x04680F $87FF: C-----  00       BRK  
  0x046810 $8800: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x046811 $8801: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x046812 $8802: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x046813 $8803: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x046814 $8804: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046815 $8805: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046816 $8806: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046817 $8807: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046818 $8808: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x046819 $8809: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04681A $880A: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04681B $880B: C-----  EC E0 E0 CPX  $E0E0
  0x04681E $880E: C-----  C0 C0    CPY  #$C0
  0x046820 $8810: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046821 $8811: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046822 $8812: C-----  F8       SED  
  0x046823 $8813: C-----  F0 E0    BEQ  $87F5
  0x046825 $8815: C-----  E0 F0    CPX  #$F0
  0x046827 $8817: C-----  F8       SED  
  0x046828 $8818: C-----  00       BRK  
  0x046829 $8819: C-----  00       BRK  
  0x04682A $881A: C-----  00       BRK  
  0x04682B $881B: C-----  00       BRK  
  0x04682C $881C: C-----  00       BRK  
  0x04682D $881D: C-----  00       BRK  
  0x04682E $881E: C-----  00       BRK  
  0x04682F $881F: C-----  00       BRK  
  0x046830 $8820: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046831 $8821: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046832 $8822: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046833 $8823: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x046834 $8824: C-----  08       PHP  
  0x046835 $8825: C-----  00       BRK  
  0x046836 $8826: C-----  00       BRK  
  0x046837 $8827: C-----  00       BRK  
  0x046838 $8828: C-----  00       BRK  
  0x046839 $8829: C-----  C0 00    CPY  #$00
  0x04683B $882B: C-----  00       BRK  
  0x04683C $882C: C-----  00       BRK  
  0x04683D $882D: C-----  00       BRK  
  0x04683E $882E: C-----  00       BRK  
  0x04683F $882F: C-----  00       BRK  
  0x046840 $8830: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x046841 $8831: C-----  C0 C0    CPY  #$C0
  0x046843 $8833: C-----  C0 40    CPY  #$40
  0x046845 $8835: C-----  00       BRK  
  0x046846 $8836: C-----  00       BRK  
  0x046847 $8837: C-----  00       BRK  
  0x046848 $8838: C-----  00       BRK  
  0x046849 $8839: C-----  00       BRK  
  0x04684A $883A: C-----  00       BRK  
  0x04684B $883B: C-----  00       BRK  
  0x04684C $883C: C-----  00       BRK  
  0x04684D $883D: C-----  00       BRK  
  0x04684E $883E: C-----  00       BRK  
  0x04684F $883F: C-----  00       BRK  
  0x046850 $8840: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x046851 $8841: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x046852 $8842: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x046853 $8843: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x046854 $8844: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x046855 $8845: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x046856 $8846: C-----  38       SEC  
  0x046857 $8847: C-----  38       SEC  
  0x046858 $8848: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x046859 $8849: C-----  1D DD ED ORA  $EDDD,X
  0x04685C $884C: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04685D $884D: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04685E $884E: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04685F $884F: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x046860 $8850: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046861 $8851: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046862 $8852: C-----  F8       SED  
  0x046863 $8853: C-----  10 20    BPL  $8875
  0x046865 $8855: C-----  20 10 08 JSR  $0810
  0x046868 $8858: C-----  00       BRK  
  0x046869 $8859: C-----  00       BRK  
  0x04686A $885A: C-----  00       BRK  
  0x04686B $885B: C-----  E0 C0    CPX  #$C0
  0x04686D $885D: C-----  C0 E0    CPY  #$E0
  0x04686F $885F: C-----  F0 F0    BEQ  $8851
  0x046871 $8861: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x046872 $8862: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x046873 $8863: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x046874 $8864: C-----  08       PHP  
  0x046875 $8865: C-----  00       BRK  
  0x046876 $8866: C-----  00       BRK  
  0x046877 $8867: C-----  00       BRK  
  0x046878 $8868: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046879 $8869: C-----  DD 08 00 CMP  $0008,X
  0x04687C $886C: C-----  00       BRK  
  0x04687D $886D: C-----  00       BRK  
  0x04687E $886E: C-----  00       BRK  
  0x04687F $886F: C-----  00       BRK  
  0x046880 $8870: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x046881 $8871: C-----  40       RTI  
  0x046882 $8872: C-----  40       RTI  
  0x046883 $8873: C-----  C0 40    CPY  #$40
  0x046885 $8875: C-----  00       BRK  
  0x046886 $8876: C-----  00       BRK  
  0x046887 $8877: C-----  00       BRK  
  0x046888 $8878: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046889 $8879: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04688A $887A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04688B $887B: C-----  00       BRK  
  0x04688C $887C: C-----  00       BRK  
  0x04688D $887D: C-----  00       BRK  
  0x04688E $887E: C-----  00       BRK  
  0x04688F $887F: C-----  00       BRK  
  0x046890 $8880: C-----  D1 A1    CMP  ($A1),Y
  0x046892 $8882: C-----  C1 A2    CMP  ($A2,X)
  0x046894 $8884: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x046895 $8885: C-----  A6 56    LDX  $56
  0x046897 $8887: C-----  6E 2E 5E ROR  $5E2E
  0x04689A $888A: C-----  3E 5C 38 ROL  $385C,X
  0x04689D $888D: C-----  58       CLI  
  0x04689E $888E: C-----  28       PLP  
  0x04689F $888F: C-----  10 06    BPL  $8897
  0x0468A1 $8891: C-----  08       PHP  
  0x0468A2 $8892: C-----  10 90    BPL  $8824
  0x0468A4 $8894: C-----  FE 3F 7F INC  $7F3F,X
  0x0468A7 $8897: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0468A8 $8898: C-----  01 07    ORA  ($07,X)
  0x0468AA $889A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0468AB $889B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0468AC $889C: C-----  01 0E    ORA  ($0E,X)
  0x0468AE $889E: C-----  20 40 D1 JSR  $D140
  0x0468B1 $88A1: C-----  A1 C1    LDA  ($C1,X)
  0x0468B3 $88A3: C-----  A2 C7    LDX  #$C7
  0x0468B5 $88A5: C-----  A6 56    LDX  $56
  0x0468B7 $88A7: C-----  6E 00 00 ROR  $0000
  0x0468BA $88AA: C-----  00       BRK  
  0x0468BB $88AB: C-----  01 00    ORA  ($00,X)
  0x0468BD $88AD: C-----  01 01    ORA  ($01,X)
  0x0468BF $88AF: C-----  01 FF    ORA  ($FF,X)
  0x0468C1 $88B1: C-----  BE 7E FF LDX  $FF7E,Y
  0x0468C4 $88B4: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0468C5 $88B5: C-----  08       PHP  
  0x0468C6 $88B6: C-----  08       PHP  
  0x0468C7 $88B7: C-----  08       PHP  
  0x0468C8 $88B8: C-----  00       BRK  
  0x0468C9 $88B9: C-----  41 81    EOR  ($81,X)
  0x0468CB $88BB: C-----  00       BRK  
  0x0468CC $88BC: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0468CD $88BD: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0468CE $88BE: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0468CF $88BF: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0468D0 $88C0: C-----  F0 00    BEQ  $88C2
  0x0468D2 $88C2: C-----  00       BRK  
  0x0468D3 $88C3: C-----  00       BRK  
  0x0468D4 $88C4: C-----  00       BRK  
  0x0468D5 $88C5: C-----  00       BRK  
  0x0468D6 $88C6: C-----  81 C7    STA  ($C7,X)
  0x0468D8 $88C8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0468D9 $88C9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0468DA $88CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0468DB $88CB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0468DC $88CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0468DD $88CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0468DE $88CE: C-----  7E 38 00 ROR  $0038,X
  0x0468E1 $88D1: C-----  00       BRK  
  0x0468E2 $88D2: C-----  01 02    ORA  ($02,X)
  0x0468E4 $88D4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0468E5 $88D5: C-----  3E 10 08 ROL  $0810,X
  0x0468E8 $88D8: C-----  00       BRK  
  0x0468E9 $88D9: C-----  00       BRK  
  0x0468EA $88DA: C-----  00       BRK  
  0x0468EB $88DB: C-----  01 01    ORA  ($01,X)
  0x0468ED $88DD: C-----  01 0F    ORA  ($0F,X)
  0x0468EF $88DF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0468F0 $88E0: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x0468F1 $88E1: C-----  1D 0A 9D ORA  $9D0A,X
  0x0468F4 $88E4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0468F5 $88E5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0468F6 $88E6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0468F7 $88E7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0468F8 $88E8: C-----  C0 E0    CPY  #$E0
  0x0468FA $88EA: C-----  F0 60    BEQ  $894C
  0x0468FC $88EC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0468FD $88ED: C-----  C0 C0    CPY  #$C0
  0x0468FF $88EF: C-----  C0 08    CPY  #$08
  0x046901 $88F1: C-----  10 20    BPL  $8913
  0x046903 $88F3: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x046904 $88F4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x046905 $88F5: C-----  05 06    ORA  $06
  0x046907 $88F7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x046908 $88F8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046909 $88F9: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04690A $88FA: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04690B $88FB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04690C $88FC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04690D $88FD: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04690E $88FE: C-----  00       BRK  
  0x04690F $88FF: C-----  00       BRK  
  0x046910 $8900: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x046911 $8901: C-----  68       PLA  
  0x046912 $8902: C-----  51 63    EOR  ($63),Y
  0x046914 $8904: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x046915 $8905: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x046916 $8906: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x046917 $8907: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x046918 $8908: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x046919 $8909: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04691A $890A: C-----  2E 1D 3B ROL  $3B1D
  0x04691D $890D: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04691E $890E: C-----  2E 4C E7 ROL  $E74C
  0x046921 $8911: C-----  09 10    ORA  #$10
  0x046923 $8913: C-----  90 B0    BCC  $88C5
  0x046925 $8915: C-----  B0 90    BCS  $88A7
  0x046927 $8917: C-----  58       CLI  
  0x046928 $8918: C-----  01 06    ORA  ($06,X)
  0x04692A $891A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04692B $891B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04692C $891C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04692D $891D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04692E $891E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04692F $891F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046930 $8920: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046931 $8921: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x046932 $8922: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046933 $8923: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x046934 $8924: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046935 $8925: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046936 $8926: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046937 $8927: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046938 $8928: C-----  01 5D    ORA  ($5D,X)
  0x04693A $892A: C-----  1D 41 0B ORA  $0B41,X
  0x04693D $892D: C-----  1D 1E 0E ORA  $0E1E,X
  0x046940 $8930: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x046941 $8931: C-----  50 B0    BVC  $88E3
  0x046943 $8933: C-----  50 B0    BVC  $88E5
  0x046945 $8935: C-----  70 A0    BVS  $88D7
  0x046947 $8937: C-----  C0 40    CPY  #$40
  0x046949 $8939: C-----  A0 40    LDY  #$40
  0x04694B $893B: C-----  A0 40    LDY  #$40
  0x04694D $893D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04694E $893E: C-----  40       RTI  
  0x04694F $893F: C-----  00       BRK  
  0x046950 $8940: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046951 $8941: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046952 $8942: C-----  FE 0C 04 INC  $040C,X
  0x046955 $8945: C-----  00       BRK  
  0x046956 $8946: C-----  01 07    ORA  ($07,X)
  0x046958 $8948: C-----  ED F8 01 SBC  $01F8
  0x04695B $894B: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04695C $894C: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04695D $894D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04695E $894E: C-----  FE F8 06 INC  $06F8,X
  0x046961 $8951: C-----  08       PHP  
  0x046962 $8952: C-----  10 90    BPL  $88E4
  0x046964 $8954: C-----  B0 B0    BCS  $8906
  0x046966 $8956: C-----  90 58    BCC  $89B0
  0x046968 $8958: C-----  01 07    ORA  ($07,X)
  0x04696A $895A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04696B $895B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04696C $895C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04696D $895D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04696E $895E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04696F $895F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046970 $8960: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x046971 $8961: C-----  35 0E    AND  $0E,X
  0x046973 $8963: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046974 $8964: C-----  00       BRK  
  0x046975 $8965: C-----  00       BRK  
  0x046976 $8966: C-----  00       BRK  
  0x046977 $8967: C-----  00       BRK  
  0x046978 $8968: C-----  05 0A    ORA  $0A
  0x04697A $896A: C-----  01 00    ORA  ($00,X)
  0x04697C $896C: C-----  00       BRK  
  0x04697D $896D: C-----  00       BRK  
  0x04697E $896E: C-----  00       BRK  
  0x04697F $896F: C-----  00       BRK  
  0x046980 $8970: C-----  F0 00    BEQ  $8972
  0x046982 $8972: C-----  00       BRK  
  0x046983 $8973: C-----  00       BRK  
  0x046984 $8974: C-----  00       BRK  
  0x046985 $8975: C-----  00       BRK  
  0x046986 $8976: C-----  01 07    ORA  ($07,X)
  0x046988 $8978: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046989 $8979: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04698A $897A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04698B $897B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04698C $897C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04698D $897D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04698E $897E: C-----  FE F8 3F INC  $3FF8,X
  0x046991 $8981: C-----  3E 3E 1E ROL  $1E3E,X
  0x046994 $8984: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046995 $8985: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046996 $8986: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046997 $8987: C-----  00       BRK  
  0x046998 $8988: C-----  00       BRK  
  0x046999 $8989: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04699A $898A: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04699B $898B: C-----  00       BRK  
  0x04699C $898C: C-----  06 02    ASL  $02
  0x04699E $898E: C-----  00       BRK  
  0x04699F $898F: C-----  00       BRK  
  0x0469A0 $8990: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x0469A1 $8991: C-----  68       PLA  
  0x0469A2 $8992: C-----  51 63    EOR  ($63),Y
  0x0469A4 $8994: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x0469A5 $8995: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x0469A6 $8996: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0469A7 $8997: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0469A8 $8998: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x0469A9 $8999: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x0469AA $899A: C-----  2E 1C 3A ROL  $3A1C
  0x0469AD $899D: C-----  56 2C    LSR  $2C,X
  0x0469AF $899F: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x0469B0 $89A0: C-----  7E 7F 3F ROR  $3F7F,X
  0x0469B3 $89A3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0469B4 $89A4: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0469B5 $89A5: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0469B6 $89A6: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0469B7 $89A7: C-----  20 81 9C JSR  $9C81
  0x0469BA $89AA: C-----  CC E0 76 CPY  $76E0
  0x0469BD $89AD: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0469BE $89AE: C-----  00       BRK  
  0x0469BF $89AF: C-----  00       BRK  
  0x0469C0 $89B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0469C1 $89B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0469C2 $89B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0469C3 $89B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0469C4 $89B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0469C5 $89B5: C-----  FE FF FF INC  $FFFF,X
  0x0469C8 $89B8: C-----  18       CLC  
  0x0469C9 $89B9: C-----  00       BRK  
  0x0469CA $89BA: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0469CB $89BB: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0469CC $89BC: C-----  00       BRK  
  0x0469CD $89BD: C-----  39 3C 1E AND  $1E3C,Y
  0x0469D0 $89C0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0469D1 $89C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0469D2 $89C2: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0469D3 $89C3: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0469D4 $89C4: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0469D5 $89C5: C-----  81 81    STA  ($81,X)
  0x0469D7 $89C7: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0469D8 $89C8: C-----  01 00    ORA  ($00,X)
  0x0469DA $89CA: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0469DB $89CB: C-----  BD BD 7E LDA  $7EBD,X
  0x0469DE $89CE: C-----  7E 3C FF ROR  $FF3C,X
  0x0469E1 $89D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0469E2 $89D2: C-----  7E 1C 0C ROR  $0C1C,X
  0x0469E5 $89D5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0469E6 $89D6: C-----  C5 F3    CMP  $F3
  0x0469E8 $89D8: C-----  ED 78 80 SBC  $8078
  0x0469EB $89DB: C-----  E0 F0    CPX  #$F0
  0x0469ED $89DD: C-----  F8       SED  
  0x0469EE $89DE: C-----  38       SEC  
  0x0469EF $89DF: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0469F0 $89E0: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0469F1 $89E1: C-----  3E FC F8 ROL  $F8FC,X
  0x0469F4 $89E4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0469F5 $89E5: C-----  FE FE FF INC  $FFFE,X
  0x0469F8 $89E8: C-----  E0 C0    CPX  #$C0
  0x0469FA $89EA: C-----  00       BRK  
  0x0469FB $89EB: C-----  00       BRK  
  0x0469FC $89EC: C-----  00       BRK  
  0x0469FD $89ED: C-----  00       BRK  
  0x0469FE $89EE: C-----  00       BRK  
  0x0469FF $89EF: C-----  00       BRK  
  0x046A00 $89F0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046A01 $89F1: C-----  F9 F1 F1 SBC  $F1F1,Y
  0x046A04 $89F4: C-----  F1 11    SBC  ($11),Y
  0x046A06 $89F6: C-----  09 0E    ORA  #$0E
  0x046A08 $89F8: C-----  00       BRK  
  0x046A09 $89F9: C-----  06 0E    ASL  $0E
  0x046A0B $89FB: C-----  0E 0E EE ASL  $EE0E
  0x046A0E $89FE: C-----  F6 F0    INC  $F0,X
  0x046A10 $8A00: C-----  7D 3E 1E ADC  $1E3E,X
  0x046A13 $8A03: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046A14 $8A04: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046A15 $8A05: C-----  01 00    ORA  ($00,X)
  0x046A17 $8A07: C-----  00       BRK  
  0x046A18 $8A08: C-----  0A       ASL  A
  0x046A19 $8A09: C-----  0D 05 02 ORA  $0205
  0x046A1C $8A0C: C-----  00       BRK  
  0x046A1D $8A0D: C-----  00       BRK  
  0x046A1E $8A0E: C-----  00       BRK  
  0x046A1F $8A0F: C-----  00       BRK  
  0x046A20 $8A10: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x046A21 $8A11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046A22 $8A12: C-----  7E 7E BF ROR  $BF7E,X
  0x046A25 $8A15: C-----  D8       CLD  
  0x046A26 $8A16: C-----  70 0F    BVS  $8A27
  0x046A28 $8A18: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x046A29 $8A19: C-----  00       BRK  
  0x046A2A $8A1A: C-----  81 81    STA  ($81,X)
  0x046A2C $8A1C: C-----  40       RTI  
  0x046A2D $8A1D: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x046A2E $8A1E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046A2F $8A1F: C-----  00       BRK  
  0x046A30 $8A20: C-----  7D 32 1A ADC  $1A32,X
  0x046A33 $8A23: C-----  09 11    ORA  #$11
  0x046A35 $8A25: C-----  20 40 FF JSR  $FF40
  0x046A38 $8A28: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x046A39 $8A29: C-----  0D 05 06 ORA  $0605
  0x046A3C $8A2C: C-----  0E 1F 3F ASL  $3F1F
  0x046A3F $8A2F: C-----  00       BRK  
  0x046A40 $8A30: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x046A41 $8A31: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046A42 $8A32: C-----  7E 7E BF ROR  $BF7E,X
  0x046A45 $8A35: C-----  D8       CLD  
  0x046A46 $8A36: C-----  30 0F    BMI  $8A47
  0x046A48 $8A38: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x046A49 $8A39: C-----  00       BRK  
  0x046A4A $8A3A: C-----  81 81    STA  ($81,X)
  0x046A4C $8A3C: C-----  40       RTI  
  0x046A4D $8A3D: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x046A4E $8A3E: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x046A4F $8A3F: C-----  F0 7E    BEQ  $8ABF
  0x046A51 $8A41: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x046A52 $8A42: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x046A53 $8A43: C-----  08       PHP  
  0x046A54 $8A44: C-----  18       CLC  
  0x046A55 $8A45: C-----  F0 C0    BEQ  $8A07
  0x046A57 $8A47: C-----  00       BRK  
  0x046A58 $8A48: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046A59 $8A49: C-----  60       RTS  
  0x046A5A $8A4A: C-----  F8       SED  
  0x046A5B $8A4B: C-----  F0 E0    BEQ  $8A2D
  0x046A5D $8A4D: C-----  00       BRK  
  0x046A5E $8A4E: C-----  00       BRK  
  0x046A5F $8A4F: C-----  00       BRK  
  0x046A60 $8A50: C-----  08       PHP  
  0x046A61 $8A51: C-----  08       PHP  
  0x046A62 $8A52: C-----  09 0A    ORA  #$0A
  0x046A64 $8A54: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x046A65 $8A55: C-----  08       PHP  
  0x046A66 $8A56: C-----  00       BRK  
  0x046A67 $8A57: C-----  00       BRK  
  0x046A68 $8A58: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046A69 $8A59: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046A6A $8A5A: C-----  06 04    ASL  $04
  0x046A6C $8A5C: C-----  00       BRK  
  0x046A6D $8A5D: C-----  00       BRK  
  0x046A6E $8A5E: C-----  00       BRK  
  0x046A6F $8A5F: C-----  00       BRK  
  0x046A70 $8A60: C-----  7D 3E 1E ADC  $1E3E,X
  0x046A73 $8A63: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046A74 $8A64: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046A75 $8A65: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046A76 $8A66: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046A77 $8A67: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046A78 $8A68: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x046A79 $8A69: C-----  01 01    ORA  ($01,X)
  0x046A7B $8A6B: C-----  00       BRK  
  0x046A7C $8A6C: C-----  00       BRK  
  0x046A7D $8A6D: C-----  00       BRK  
  0x046A7E $8A6E: C-----  00       BRK  
  0x046A7F $8A6F: C-----  00       BRK  
  0x046A80 $8A70: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x046A81 $8A71: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046A82 $8A72: C-----  7E 7E BF ROR  $BF7E,X
  0x046A85 $8A75: C-----  D8       CLD  
  0x046A86 $8A76: C-----  F0 FF    BEQ  $8A77
  0x046A88 $8A78: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x046A89 $8A79: C-----  00       BRK  
  0x046A8A $8A7A: C-----  81 81    STA  ($81,X)
  0x046A8C $8A7C: C-----  40       RTI  
  0x046A8D $8A7D: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x046A8E $8A7E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046A8F $8A7F: C-----  00       BRK  
  0x046A90 $8A80: C-----  FE FE CE INC  $CEFE,X
  0x046A93 $8A83: C-----  86 02    STX  $02
  0x046A95 $8A85: C-----  00       BRK  
  0x046A96 $8A86: C-----  00       BRK  
  0x046A97 $8A87: C-----  00       BRK  
  0x046A98 $8A88: C-----  00       BRK  
  0x046A99 $8A89: C-----  00       BRK  
  0x046A9A $8A8A: C-----  00       BRK  
  0x046A9B $8A8B: C-----  00       BRK  
  0x046A9C $8A8C: C-----  00       BRK  
  0x046A9D $8A8D: C-----  00       BRK  
  0x046A9E $8A8E: C-----  00       BRK  
  0x046A9F $8A8F: C-----  00       BRK  
  0x046AA0 $8A90: C-----  08       PHP  
  0x046AA1 $8A91: C-----  68       PLA  
  0x046AA2 $8A92: C-----  98       TYA  
  0x046AA3 $8A93: C-----  08       PHP  
  0x046AA4 $8A94: C-----  00       BRK  
  0x046AA5 $8A95: C-----  00       BRK  
  0x046AA6 $8A96: C-----  00       BRK  
  0x046AA7 $8A97: C-----  00       BRK  
  0x046AA8 $8A98: C-----  F0 90    BEQ  $8A2A
  0x046AAA $8A9A: C-----  00       BRK  
  0x046AAB $8A9B: C-----  00       BRK  
  0x046AAC $8A9C: C-----  00       BRK  
  0x046AAD $8A9D: C-----  00       BRK  
  0x046AAE $8A9E: C-----  00       BRK  
  0x046AAF $8A9F: C-----  00       BRK  
  0x046AB0 $8AA0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046AB1 $8AA1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046AB2 $8AA2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046AB3 $8AA3: C-----  0E 0C 08 ASL  $080C
  0x046AB6 $8AA6: C-----  00       BRK  
  0x046AB7 $8AA7: C-----  00       BRK  
  0x046AB8 $8AA8: C-----  00       BRK  
  0x046AB9 $8AA9: C-----  00       BRK  
  0x046ABA $8AAA: C-----  00       BRK  
  0x046ABB $8AAB: C-----  00       BRK  
  0x046ABC $8AAC: C-----  00       BRK  
  0x046ABD $8AAD: C-----  00       BRK  
  0x046ABE $8AAE: C-----  00       BRK  
  0x046ABF $8AAF: C-----  00       BRK  
  0x046AC0 $8AB0: C-----  FE FF F0 INC  $F0FF,X
  0x046AC3 $8AB3: C-----  F0 30    BEQ  $8AE5
  0x046AC5 $8AB5: C-----  10 00    BPL  $8AB7
  0x046AC7 $8AB7: C-----  00       BRK  
  0x046AC8 $8AB8: C-----  00       BRK  
  0x046AC9 $8AB9: C-----  00       BRK  
  0x046ACA $8ABA: C-----  00       BRK  
  0x046ACB $8ABB: C-----  00       BRK  
  0x046ACC $8ABC: C-----  00       BRK  
  0x046ACD $8ABD: C-----  00       BRK  
  0x046ACE $8ABE: C-----  00       BRK  
  0x046ACF $8ABF: C-----  00       BRK  
  0x046AD0 $8AC0: C-----  00       BRK  
  0x046AD1 $8AC1: C-----  00       BRK  
  0x046AD2 $8AC2: C-----  01 03    ORA  ($03,X)
  0x046AD4 $8AC4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046AD5 $8AC5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046AD6 $8AC6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046AD7 $8AC7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046AD8 $8AC8: C-----  00       BRK  
  0x046AD9 $8AC9: C-----  00       BRK  
  0x046ADA $8ACA: C-----  00       BRK  
  0x046ADB $8ACB: C-----  00       BRK  
  0x046ADC $8ACC: C-----  00       BRK  
  0x046ADD $8ACD: C-----  00       BRK  
  0x046ADE $8ACE: C-----  00       BRK  
  0x046ADF $8ACF: C-----  00       BRK  
  0x046AE0 $8AD0: C-----  F8       SED  
  0x046AE1 $8AD1: C-----  F8       SED  
  0x046AE2 $8AD2: C-----  98       TYA  
  0x046AE3 $8AD3: C-----  08       PHP  
  0x046AE4 $8AD4: C-----  00       BRK  
  0x046AE5 $8AD5: C-----  00       BRK  
  0x046AE6 $8AD6: C-----  00       BRK  
  0x046AE7 $8AD7: C-----  00       BRK  
  0x046AE8 $8AD8: C-----  00       BRK  
  0x046AE9 $8AD9: C-----  00       BRK  
  0x046AEA $8ADA: C-----  00       BRK  
  0x046AEB $8ADB: C-----  00       BRK  
  0x046AEC $8ADC: C-----  00       BRK  
  0x046AED $8ADD: C-----  00       BRK  
  0x046AEE $8ADE: C-----  00       BRK  
  0x046AEF $8ADF: C-----  00       BRK  
  0x046AF0 $8AE0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046AF1 $8AE1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046AF2 $8AE2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046AF3 $8AE3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046AF4 $8AE4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046AF5 $8AE5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046AF6 $8AE6: C-----  06 04    ASL  $04
  0x046AF8 $8AE8: C-----  00       BRK  
  0x046AF9 $8AE9: C-----  00       BRK  
  0x046AFA $8AEA: C-----  00       BRK  
  0x046AFB $8AEB: C-----  00       BRK  
  0x046AFC $8AEC: C-----  00       BRK  
  0x046AFD $8AED: C-----  00       BRK  
  0x046AFE $8AEE: C-----  00       BRK  
  0x046AFF $8AEF: C-----  00       BRK  
  0x046B00 $8AF0: C-----  FE FF FF INC  $FFFF,X
  0x046B03 $8AF3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046B04 $8AF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046B05 $8AF5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046B06 $8AF6: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x046B07 $8AF7: C-----  20 01 1C JSR  $1C01
  0x046B0A $8AFA: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x046B0B $8AFB: C-----  00       BRK  
  0x046B0C $8AFC: C-----  06 02    ASL  $02
  0x046B0E $8AFE: C-----  00       BRK  
  0x046B0F $8AFF: C-----  00       BRK  
  0x046B10 $8B00: C-----  0E 1C 1E ASL  $1E1C
  0x046B13 $8B03: C-----  F9 12 64 SBC  $6412,Y
  0x046B16 $8B06: C-----  C4 04    CPY  $04
  0x046B18 $8B08: C-----  F0 E0    BEQ  $8AEA
  0x046B1A $8B0A: C-----  E0 06    CPX  #$06
  0x046B1C $8B0C: C-----  EC 98 38 CPX  $3898
  0x046B1F $8B0F: C-----  F8       SED  
  0x046B20 $8B10: C-----  7E 7F 3F ROR  $3F7F,X
  0x046B23 $8B13: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046B24 $8B14: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046B25 $8B15: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046B26 $8B16: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046B27 $8B17: C-----  00       BRK  
  0x046B28 $8B18: C-----  01 1C    ORA  ($1C,X)
  0x046B2A $8B1A: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x046B2B $8B1B: C-----  00       BRK  
  0x046B2C $8B1C: C-----  06 02    ASL  $02
  0x046B2E $8B1E: C-----  00       BRK  
  0x046B2F $8B1F: C-----  00       BRK  
  0x046B30 $8B20: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x046B31 $8B21: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046B32 $8B22: C-----  90 D0    BCC  $8AF4
  0x046B34 $8B24: C-----  30 10    BMI  $8B36
  0x046B36 $8B26: C-----  00       BRK  
  0x046B37 $8B27: C-----  00       BRK  
  0x046B38 $8B28: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x046B39 $8B29: C-----  E0 60    CPX  #$60
  0x046B3B $8B2B: C-----  20 00 00 JSR  $0000
  0x046B3E $8B2E: C-----  00       BRK  
  0x046B3F $8B2F: C-----  00       BRK  
  0x046B40 $8B30: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x046B41 $8B31: C-----  68       PLA  
  0x046B42 $8B32: C-----  50 61    BVC  $8B95
  0x046B44 $8B34: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x046B45 $8B35: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x046B46 $8B36: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x046B47 $8B37: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x046B48 $8B38: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x046B49 $8B39: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x046B4A $8B3A: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x046B4B $8B3B: C-----  1E 3D 5B ASL  $5B3D,X
  0x046B4E $8B3E: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x046B4F $8B3F: C-----  4E 66 7E LSR  $7E66
  0x046B52 $8B42: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046B53 $8B43: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046B54 $8B44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046B55 $8B45: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x046B56 $8B46: C-----  99 7F 99 STA  $997F,Y
  0x046B59 $8B49: C-----  81 00    STA  ($00,X)
  0x046B5B $8B4B: C-----  00       BRK  
  0x046B5C $8B4C: C-----  00       BRK  
  0x046B5D $8B4D: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x046B5E $8B4E: C-----  66 00    ROR  $00
  0x046B60 $8B50: C-----  0E 1C 1C ASL  $1C1C
  0x046B63 $8B53: C-----  F8       SED  
  0x046B64 $8B54: C-----  10 60    BPL  $8BB6
  0x046B66 $8B56: C-----  C0 00    CPY  #$00
  0x046B68 $8B58: C-----  F0 E0    BEQ  $8B3A
  0x046B6A $8B5A: C-----  E0 00    CPX  #$00
  0x046B6C $8B5C: C-----  E0 80    CPX  #$80
  0x046B6E $8B5E: C-----  00       BRK  
  0x046B6F $8B5F: C-----  00       BRK  
  0x046B70 $8B60: C-----  06 08    ASL  $08
  0x046B72 $8B62: C-----  10 9E    BPL  $8B02
  0x046B74 $8B64: C-----  F1 FE    SBC  ($FE),Y
  0x046B76 $8B66: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x046B77 $8B67: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x046B78 $8B68: C-----  00       BRK  
  0x046B79 $8B69: C-----  00       BRK  
  0x046B7A $8B6A: C-----  00       BRK  
  0x046B7B $8B6B: C-----  00       BRK  
  0x046B7C $8B6C: C-----  8E 81 03 STX  $0381
  0x046B7F $8B6F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046B80 $8B70: C-----  F0 00    BEQ  $8B72
  0x046B82 $8B72: C-----  00       BRK  
  0x046B83 $8B73: C-----  00       BRK  
  0x046B84 $8B74: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046B85 $8B75: C-----  60       RTS  
  0x046B86 $8B76: C-----  31 17    AND  ($17),Y
  0x046B88 $8B78: C-----  00       BRK  
  0x046B89 $8B79: C-----  00       BRK  
  0x046B8A $8B7A: C-----  00       BRK  
  0x046B8B $8B7B: C-----  00       BRK  
  0x046B8C $8B7C: C-----  00       BRK  
  0x046B8D $8B7D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046B8E $8B7E: C-----  C0 E0    CPY  #$E0
  0x046B90 $8B80: C-----  0E 1C 1E ASL  $1E1C
  0x046B93 $8B83: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046B94 $8B84: C-----  1E 7C FC ASL  $FC7C,X
  0x046B97 $8B87: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x046B98 $8B88: C-----  F0 E0    BEQ  $8B6A
  0x046B9A $8B8A: C-----  E0 00    CPX  #$00
  0x046B9C $8B8C: C-----  E0 80    CPX  #$80
  0x046B9E $8B8E: C-----  00       BRK  
  0x046B9F $8B8F: C-----  00       BRK  
  0x046BA0 $8B90: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x046BA1 $8B91: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x046BA2 $8B92: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046BA3 $8B93: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x046BA4 $8B94: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046BA5 $8B95: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046BA6 $8B96: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046BA7 $8B97: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046BA8 $8B98: C-----  20 4E 0E JSR  $0E4E
  0x046BAB $8B9B: C-----  40       RTI  
  0x046BAC $8B9C: C-----  08       PHP  
  0x046BAD $8B9D: C-----  1E 1E 00 ASL  $001E,X
  0x046BB0 $8BA0: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x046BB1 $8BA1: C-----  FD 7E 7F SBC  $7F7E,X
  0x046BB4 $8BA4: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x046BB5 $8BA5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x046BB6 $8BA6: C-----  38       SEC  
  0x046BB7 $8BA7: C-----  08       PHP  
  0x046BB8 $8BA8: C-----  05 02    ORA  $02
  0x046BBA $8BAA: C-----  01 00    ORA  ($00,X)
  0x046BBC $8BAC: C-----  00       BRK  
  0x046BBD $8BAD: C-----  00       BRK  
  0x046BBE $8BAE: C-----  00       BRK  
  0x046BBF $8BAF: C-----  00       BRK  
  0x046BC0 $8BB0: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046BC1 $8BB1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046BC2 $8BB2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046BC3 $8BB3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046BC4 $8BB4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046BC5 $8BB5: C-----  01 00    ORA  ($00,X)
  0x046BC7 $8BB7: C-----  00       BRK  
  0x046BC8 $8BB8: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x046BC9 $8BB9: C-----  0E 06 01 ASL  $0106
  0x046BCC $8BBC: C-----  01 00    ORA  ($00,X)
  0x046BCE $8BBE: C-----  00       BRK  
  0x046BCF $8BBF: C-----  00       BRK  
  0x046BD0 $8BC0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046BD1 $8BC1: C-----  78       SEI  
  0x046BD2 $8BC2: C-----  10 10    BPL  $8BD4
  0x046BD4 $8BC4: C-----  10 78    BPL  $8C3E
  0x046BD6 $8BC6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046BD7 $8BC7: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x046BD8 $8BC8: C-----  00       BRK  
  0x046BD9 $8BC9: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x046BDA $8BCA: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x046BDB $8BCB: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x046BDC $8BCC: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x046BDD $8BCD: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x046BDE $8BCE: C-----  00       BRK  
  0x046BDF $8BCF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046BE0 $8BD0: C-----  38       SEC  
  0x046BE1 $8BD1: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x046BE2 $8BD2: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x046BE3 $8BD3: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x046BE4 $8BD4: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x046BE5 $8BD5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x046BE6 $8BD6: C-----  38       SEC  
  0x046BE7 $8BD7: C-----  08       PHP  
  0x046BE8 $8BD8: C-----  C0 00    CPY  #$00
  0x046BEA $8BDA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046BEB $8BDB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046BEC $8BDC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046BED $8BDD: C-----  00       BRK  
  0x046BEE $8BDE: C-----  C0 F0    CPY  #$F0
  0x046BF0 $8BE0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x046BF1 $8BE1: C-----  7E B1 E1 ROR  $E1B1,X
  0x046BF4 $8BE4: C-----  DE 80 00 DEC  $0080,X
  0x046BF7 $8BE7: C-----  00       BRK  
  0x046BF8 $8BE8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046BF9 $8BE9: C-----  81 4E    STA  ($4E,X)
  0x046BFB $8BEB: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x046BFC $8BEC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046BFD $8BED: C-----  00       BRK  
  0x046BFE $8BEE: C-----  00       BRK  
  0x046BFF $8BEF: C-----  00       BRK  
  0x046C00 $8BF0: C-----  10 30    BPL  $8C22
  0x046C02 $8BF2: C-----  E0 80    CPX  #$80
  0x046C04 $8BF4: C-----  00       BRK  
  0x046C05 $8BF5: C-----  00       BRK  
  0x046C06 $8BF6: C-----  00       BRK  
  0x046C07 $8BF7: C-----  00       BRK  
  0x046C08 $8BF8: C-----  E0 C0    CPX  #$C0
  0x046C0A $8BFA: C-----  00       BRK  
  0x046C0B $8BFB: C-----  00       BRK  
  0x046C0C $8BFC: C-----  00       BRK  
  0x046C0D $8BFD: C-----  00       BRK  
  0x046C0E $8BFE: C-----  00       BRK  
  0x046C0F $8BFF: C-----  00       BRK  
  0x046C10 $8C00: C-----  00       BRK  
  0x046C11 $8C01: C-----  00       BRK  
  0x046C12 $8C02: C-----  00       BRK  
  0x046C13 $8C03: C-----  00       BRK  
  0x046C14 $8C04: C-----  00       BRK  
  0x046C15 $8C05: C-----  00       BRK  
  0x046C16 $8C06: C-----  00       BRK  
  0x046C17 $8C07: C-----  00       BRK  
  0x046C18 $8C08: C-----  00       BRK  
  0x046C19 $8C09: C-----  00       BRK  
  0x046C1A $8C0A: C-----  00       BRK  
  0x046C1B $8C0B: C-----  00       BRK  
  0x046C1C $8C0C: C-----  00       BRK  
  0x046C1D $8C0D: C-----  00       BRK  
  0x046C1E $8C0E: C-----  00       BRK  
  0x046C1F $8C0F: C-----  00       BRK  
  0x046C20 $8C10: ------  .byte $FF
  0x046C21 $8C11: ------  .byte $FF
  0x046C22 $8C12: ------  .byte $FF
  0x046C23 $8C13: ------  .byte $FF
  0x046C24 $8C14: ------  .byte $FF
  0x046C25 $8C15: ------  .byte $FF
  0x046C26 $8C16: ------  .byte $FF
  0x046C27 $8C17: ------  .byte $FF
  0x046C28 $8C18: ------  .byte $00
  0x046C29 $8C19: ------  .byte $00
  0x046C2A $8C1A: ------  .byte $00
  0x046C2B $8C1B: ------  .byte $00
  0x046C2C $8C1C: ------  .byte $00
  0x046C2D $8C1D: ------  .byte $00
  0x046C2E $8C1E: ------  .byte $00
  0x046C2F $8C1F: ------  .byte $00
  0x046C30 $8C20: C-----  06 08    ASL  $08
  0x046C32 $8C22: C-----  10 9E    BPL  $8BC2
  0x046C34 $8C24: C-----  71 7E    ADC  ($7E),Y
  0x046C36 $8C26: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x046C37 $8C27: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x046C38 $8C28: C-----  01 07    ORA  ($07,X)
  0x046C3A $8C2A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046C3B $8C2B: C-----  01 80    ORA  ($80,X)
  0x046C3D $8C2D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046C3E $8C2E: C-----  00       BRK  
  0x046C3F $8C2F: C-----  00       BRK  
  0x046C40 $8C30: C-----  F0 00    BEQ  $8C32
  0x046C42 $8C32: C-----  00       BRK  
  0x046C43 $8C33: C-----  00       BRK  
  0x046C44 $8C34: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046C45 $8C35: C-----  60       RTS  
  0x046C46 $8C36: C-----  31 17    AND  ($17),Y
  0x046C48 $8C38: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046C49 $8C39: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046C4A $8C3A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046C4B $8C3B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046C4C $8C3C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046C4D $8C3D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046C4E $8C3E: C-----  0E 08 07 ASL  $0708
  0x046C51 $8C41: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x046C52 $8C42: C-----  01 01    ORA  ($01,X)
  0x046C54 $8C44: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x046C55 $8C45: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x046C56 $8C46: C-----  08       PHP  
  0x046C57 $8C47: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046C58 $8C48: C-----  00       BRK  
  0x046C59 $8C49: C-----  01 00    ORA  ($00,X)
  0x046C5B $8C4B: C-----  00       BRK  
  0x046C5C $8C4C: C-----  01 03    ORA  ($03,X)
  0x046C5E $8C4E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046C5F $8C4F: C-----  00       BRK  
  0x046C60 $8C50: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046C61 $8C51: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046C62 $8C52: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046C63 $8C53: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046C64 $8C54: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046C65 $8C55: C-----  01 01    ORA  ($01,X)
  0x046C67 $8C57: C-----  C1 0C    CMP  ($0C,X)
  0x046C69 $8C59: C-----  EE E6 F1 INC  $F1E6
  0x046C6C $8C5C: C-----  FD FE FE SBC  $FEFE,X
  0x046C6F $8C5F: C-----  3E 7F 7F ROL  $7F7F,X
  0x046C72 $8C62: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x046C73 $8C63: C-----  61 40    ADC  ($40,X)
  0x046C75 $8C65: C-----  00       BRK  
  0x046C76 $8C66: C-----  00       BRK  
  0x046C77 $8C67: C-----  00       BRK  
  0x046C78 $8C68: C-----  00       BRK  
  0x046C79 $8C69: C-----  00       BRK  
  0x046C7A $8C6A: C-----  00       BRK  
  0x046C7B $8C6B: C-----  00       BRK  
  0x046C7C $8C6C: C-----  00       BRK  
  0x046C7D $8C6D: C-----  00       BRK  
  0x046C7E $8C6E: C-----  00       BRK  
  0x046C7F $8C6F: C-----  00       BRK  
  0x046C80 $8C70: C-----  41 4D    EOR  ($4D,X)
  0x046C82 $8C72: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x046C83 $8C73: C-----  61 40    ADC  ($40,X)
  0x046C85 $8C75: C-----  00       BRK  
  0x046C86 $8C76: C-----  00       BRK  
  0x046C87 $8C77: C-----  00       BRK  
  0x046C88 $8C78: C-----  3E 32 20 ROL  $2032,X
  0x046C8B $8C7B: C-----  00       BRK  
  0x046C8C $8C7C: C-----  00       BRK  
  0x046C8D $8C7D: C-----  00       BRK  
  0x046C8E $8C7E: C-----  00       BRK  
  0x046C8F $8C7F: C-----  00       BRK  
  0x046C90 $8C80: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x046C91 $8C81: C-----  7E B1 E1 ROR  $E1B1,X
  0x046C94 $8C84: C-----  DE 84 05 DEC  $0584,X
  0x046C97 $8C87: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x046C98 $8C88: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046C99 $8C89: C-----  81 4E    STA  ($4E,X)
  0x046C9B $8C8B: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x046C9C $8C8C: C-----  81 03    STA  ($03,X)
  0x046C9E $8C8E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x046C9F $8C8F: C-----  00       BRK  
  0x046CA0 $8C90: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046CA1 $8C91: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x046CA2 $8C92: C-----  E4 88    CPX  $88
  0x046CA4 $8C94: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x046CA5 $8C95: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x046CA6 $8C96: C-----  00       BRK  
  0x046CA7 $8C97: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x046CA8 $8C98: C-----  E0 CC    CPX  #$CC
  0x046CAA $8C9A: C-----  18       CLC  
  0x046CAB $8C9B: C-----  70 F8    BVS  $8C95
  0x046CAD $8C9D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x046CAE $8C9E: C-----  FE 70 F8 INC  $F870,X
  0x046CB1 $8CA1: C-----  78       SEI  
  0x046CB2 $8CA2: C-----  78       SEI  
  0x046CB3 $8CA3: C-----  30 30    BMI  $8CD5
  0x046CB5 $8CA5: C-----  10 10    BPL  $8CB7
  0x046CB7 $8CA7: C-----  00       BRK  
  0x046CB8 $8CA8: C-----  00       BRK  
  0x046CB9 $8CA9: C-----  00       BRK  
  0x046CBA $8CAA: C-----  00       BRK  
  0x046CBB $8CAB: C-----  00       BRK  
  0x046CBC $8CAC: C-----  00       BRK  
  0x046CBD $8CAD: C-----  00       BRK  
  0x046CBE $8CAE: C-----  00       BRK  
  0x046CBF $8CAF: C-----  00       BRK  
  0x046CC0 $8CB0: C-----  88       DEY  
  0x046CC1 $8CB1: C-----  48       PHA  
  0x046CC2 $8CB2: C-----  48       PHA  
  0x046CC3 $8CB3: C-----  20 30 10 JSR  $1030
  0x046CC6 $8CB6: C-----  10 00    BPL  $8CB8
  0x046CC8 $8CB8: C-----  70 30    BVS  $8CEA
  0x046CCA $8CBA: C-----  30 10    BMI  $8CCC
  0x046CCC $8CBC: C-----  00       BRK  
  0x046CCD $8CBD: C-----  00       BRK  
  0x046CCE $8CBE: C-----  00       BRK  
  0x046CCF $8CBF: C-----  00       BRK  
  0x046CD0 $8CC0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046CD1 $8CC1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046CD2 $8CC2: C-----  01 01    ORA  ($01,X)
  0x046CD4 $8CC4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046CD5 $8CC5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046CD6 $8CC6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046CD7 $8CC7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046CD8 $8CC8: C-----  00       BRK  
  0x046CD9 $8CC9: C-----  00       BRK  
  0x046CDA $8CCA: C-----  00       BRK  
  0x046CDB $8CCB: C-----  00       BRK  
  0x046CDC $8CCC: C-----  00       BRK  
  0x046CDD $8CCD: C-----  00       BRK  
  0x046CDE $8CCE: C-----  00       BRK  
  0x046CDF $8CCF: C-----  00       BRK  
  0x046CE0 $8CD0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046CE1 $8CD1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046CE2 $8CD2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046CE3 $8CD3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046CE4 $8CD4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046CE5 $8CD5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046CE6 $8CD6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046CE7 $8CD7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046CE8 $8CD8: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x046CE9 $8CD9: C-----  0E 06 01 ASL  $0106
  0x046CEC $8CDC: C-----  01 00    ORA  ($00,X)
  0x046CEE $8CDE: C-----  00       BRK  
  0x046CEF $8CDF: C-----  00       BRK  
  0x046CF0 $8CE0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x046CF1 $8CE1: C-----  7E B1 E1 ROR  $E1B1,X
  0x046CF4 $8CE4: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x046CF5 $8CE5: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x046CF6 $8CE6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046CF7 $8CE7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x046CF8 $8CE8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046CF9 $8CE9: C-----  81 4E    STA  ($4E,X)
  0x046CFB $8CEB: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x046CFC $8CEC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046CFD $8CED: C-----  00       BRK  
  0x046CFE $8CEE: C-----  00       BRK  
  0x046CFF $8CEF: C-----  00       BRK  
  0x046D00 $8CF0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046D01 $8CF1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046D02 $8CF2: C-----  40       RTI  
  0x046D03 $8CF3: C-----  40       RTI  
  0x046D04 $8CF4: C-----  30 1C    BMI  $8D12
  0x046D06 $8CF6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046D07 $8CF7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046D08 $8CF8: C-----  00       BRK  
  0x046D09 $8CF9: C-----  00       BRK  
  0x046D0A $8CFA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046D0B $8CFB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046D0C $8CFC: C-----  C0 E0    CPY  #$E0
  0x046D0E $8CFE: C-----  F0 FC    BEQ  $8CFC
  0x046D10 $8D00: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046D11 $8D01: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046D12 $8D02: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046D13 $8D03: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046D14 $8D04: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046D15 $8D05: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046D16 $8D06: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046D17 $8D07: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046D18 $8D08: C-----  00       BRK  
  0x046D19 $8D09: C-----  00       BRK  
  0x046D1A $8D0A: C-----  00       BRK  
  0x046D1B $8D0B: C-----  00       BRK  
  0x046D1C $8D0C: C-----  00       BRK  
  0x046D1D $8D0D: C-----  00       BRK  
  0x046D1E $8D0E: C-----  00       BRK  
  0x046D1F $8D0F: C-----  00       BRK  
  0x046D20 $8D10: C-----  E1 F1    SBC  ($F1,X)
  0x046D22 $8D12: C-----  F1 FF    SBC  ($FF),Y
  0x046D24 $8D14: C-----  F5 F5    SBC  $F5,X
  0x046D26 $8D16: C-----  F5 ED    SBC  $ED,X
  0x046D28 $8D18: C-----  1E 0E 0E ASL  $0E0E,X
  0x046D2B $8D1B: C-----  00       BRK  
  0x046D2C $8D1C: C-----  0A       ASL  A
  0x046D2D $8D1D: C-----  0A       ASL  A
  0x046D2E $8D1E: C-----  0A       ASL  A
  0x046D2F $8D1F: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x046D30 $8D20: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046D31 $8D21: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046D32 $8D22: C-----  00       BRK  
  0x046D33 $8D23: C-----  00       BRK  
  0x046D34 $8D24: C-----  00       BRK  
  0x046D35 $8D25: C-----  00       BRK  
  0x046D36 $8D26: C-----  00       BRK  
  0x046D37 $8D27: C-----  00       BRK  
  0x046D38 $8D28: C-----  00       BRK  
  0x046D39 $8D29: C-----  00       BRK  
  0x046D3A $8D2A: C-----  00       BRK  
  0x046D3B $8D2B: C-----  00       BRK  
  0x046D3C $8D2C: C-----  00       BRK  
  0x046D3D $8D2D: C-----  00       BRK  
  0x046D3E $8D2E: C-----  00       BRK  
  0x046D3F $8D2F: C-----  00       BRK  
  0x046D40 $8D30: C-----  00       BRK  
  0x046D41 $8D31: C-----  00       BRK  
  0x046D42 $8D32: C-----  00       BRK  
  0x046D43 $8D33: C-----  00       BRK  
  0x046D44 $8D34: C-----  00       BRK  
  0x046D45 $8D35: C-----  00       BRK  
  0x046D46 $8D36: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046D47 $8D37: C-----  F0 00    BEQ  $8D39
  0x046D49 $8D39: C-----  00       BRK  
  0x046D4A $8D3A: C-----  00       BRK  
  0x046D4B $8D3B: C-----  00       BRK  
  0x046D4C $8D3C: C-----  00       BRK  
  0x046D4D $8D3D: C-----  00       BRK  
  0x046D4E $8D3E: C-----  00       BRK  
  0x046D4F $8D3F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046D50 $8D40: C-----  15 AB    ORA  $AB,X
  0x046D52 $8D42: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x046D53 $8D43: C-----  A8       TAY  
  0x046D54 $8D44: C-----  F8       SED  
  0x046D55 $8D45: C-----  F0 E0    BEQ  $8D27
  0x046D57 $8D47: C-----  C0 EA    CPY  #$EA
  0x046D59 $8D49: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x046D5A $8D4A: C-----  A8       TAY  
  0x046D5B $8D4B: C-----  50 00    BVC  $8D4D
  0x046D5D $8D4D: C-----  00       BRK  
  0x046D5E $8D4E: C-----  00       BRK  
  0x046D5F $8D4F: C-----  00       BRK  
  0x046D60 $8D50: C-----  C0 00    CPY  #$00
  0x046D62 $8D52: C-----  00       BRK  
  0x046D63 $8D53: C-----  00       BRK  
  0x046D64 $8D54: C-----  00       BRK  
  0x046D65 $8D55: C-----  00       BRK  
  0x046D66 $8D56: C-----  00       BRK  
  0x046D67 $8D57: C-----  00       BRK  
  0x046D68 $8D58: C-----  00       BRK  
  0x046D69 $8D59: C-----  00       BRK  
  0x046D6A $8D5A: C-----  00       BRK  
  0x046D6B $8D5B: C-----  00       BRK  
  0x046D6C $8D5C: C-----  00       BRK  
  0x046D6D $8D5D: C-----  00       BRK  
  0x046D6E $8D5E: C-----  00       BRK  
  0x046D6F $8D5F: C-----  00       BRK  
  0x046D70 $8D60: C-----  00       BRK  
  0x046D71 $8D61: C-----  00       BRK  
  0x046D72 $8D62: C-----  00       BRK  
  0x046D73 $8D63: C-----  00       BRK  
  0x046D74 $8D64: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046D75 $8D65: C-----  F8       SED  
  0x046D76 $8D66: C-----  00       BRK  
  0x046D77 $8D67: C-----  00       BRK  
  0x046D78 $8D68: C-----  00       BRK  
  0x046D79 $8D69: C-----  00       BRK  
  0x046D7A $8D6A: C-----  00       BRK  
  0x046D7B $8D6B: C-----  00       BRK  
  0x046D7C $8D6C: C-----  00       BRK  
  0x046D7D $8D6D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046D7E $8D6E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046D7F $8D6F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046D80 $8D70: C-----  00       BRK  
  0x046D81 $8D71: C-----  00       BRK  
  0x046D82 $8D72: C-----  00       BRK  
  0x046D83 $8D73: C-----  00       BRK  
  0x046D84 $8D74: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046D85 $8D75: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x046D86 $8D76: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x046D87 $8D77: C-----  08       PHP  
  0x046D88 $8D78: C-----  00       BRK  
  0x046D89 $8D79: C-----  00       BRK  
  0x046D8A $8D7A: C-----  00       BRK  
  0x046D8B $8D7B: C-----  00       BRK  
  0x046D8C $8D7C: C-----  00       BRK  
  0x046D8D $8D7D: C-----  FD FB F7 SBC  $F7FB,X
  0x046D90 $8D80: C-----  00       BRK  
  0x046D91 $8D81: C-----  00       BRK  
  0x046D92 $8D82: C-----  00       BRK  
  0x046D93 $8D83: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046D94 $8D84: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046D95 $8D85: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046D96 $8D86: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046D97 $8D87: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046D98 $8D88: C-----  00       BRK  
  0x046D99 $8D89: C-----  00       BRK  
  0x046D9A $8D8A: C-----  00       BRK  
  0x046D9B $8D8B: C-----  00       BRK  
  0x046D9C $8D8C: C-----  00       BRK  
  0x046D9D $8D8D: C-----  00       BRK  
  0x046D9E $8D8E: C-----  00       BRK  
  0x046D9F $8D8F: C-----  00       BRK  
  0x046DA0 $8D90: C-----  00       BRK  
  0x046DA1 $8D91: C-----  00       BRK  
  0x046DA2 $8D92: C-----  00       BRK  
  0x046DA3 $8D93: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x046DA4 $8D94: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x046DA5 $8D95: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046DA6 $8D96: C-----  81 C1    STA  ($C1,X)
  0x046DA8 $8D98: C-----  00       BRK  
  0x046DA9 $8D99: C-----  00       BRK  
  0x046DAA $8D9A: C-----  00       BRK  
  0x046DAB $8D9B: C-----  00       BRK  
  0x046DAC $8D9C: C-----  24 00    BIT  $00
  0x046DAE $8D9E: C-----  7E 3E 07 ROR  $073E,X
  0x046DB1 $8DA1: C-----  78       SEI  
  0x046DB2 $8DA2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046DB3 $8DA3: C-----  00       BRK  
  0x046DB4 $8DA4: C-----  00       BRK  
  0x046DB5 $8DA5: C-----  00       BRK  
  0x046DB6 $8DA6: C-----  00       BRK  
  0x046DB7 $8DA7: C-----  00       BRK  
  0x046DB8 $8DA8: C-----  00       BRK  
  0x046DB9 $8DA9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046DBA $8DAA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046DBB $8DAB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046DBC $8DAC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046DBD $8DAD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046DBE $8DAE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046DBF $8DAF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046DC0 $8DB0: C-----  08       PHP  
  0x046DC1 $8DB1: C-----  10 10    BPL  $8DC3
  0x046DC3 $8DB3: C-----  10 20    BPL  $8DD5
  0x046DC5 $8DB5: C-----  60       RTS  
  0x046DC6 $8DB6: C-----  20 60 F7 JSR  $F760
  0x046DC9 $8DB9: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x046DCA $8DBA: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x046DCB $8DBB: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x046DCC $8DBC: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x046DCD $8DBD: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x046DCE $8DBE: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x046DCF $8DBF: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x046DD0 $8DC0: C-----  00       BRK  
  0x046DD1 $8DC1: C-----  00       BRK  
  0x046DD2 $8DC2: C-----  00       BRK  
  0x046DD3 $8DC3: C-----  00       BRK  
  0x046DD4 $8DC4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046DD5 $8DC5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x046DD6 $8DC6: C-----  C0 80    CPY  #$80
  0x046DD8 $8DC8: C-----  00       BRK  
  0x046DD9 $8DC9: C-----  00       BRK  
  0x046DDA $8DCA: C-----  00       BRK  
  0x046DDB $8DCB: C-----  00       BRK  
  0x046DDC $8DCC: C-----  00       BRK  
  0x046DDD $8DCD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046DDE $8DCE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046DDF $8DCF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046DE0 $8DD0: C-----  00       BRK  
  0x046DE1 $8DD1: C-----  00       BRK  
  0x046DE2 $8DD2: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046DE3 $8DD3: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x046DE4 $8DD4: C-----  C0 00    CPY  #$00
  0x046DE6 $8DD6: C-----  00       BRK  
  0x046DE7 $8DD7: C-----  00       BRK  
  0x046DE8 $8DD8: C-----  00       BRK  
  0x046DE9 $8DD9: C-----  00       BRK  
  0x046DEA $8DDA: C-----  00       BRK  
  0x046DEB $8DDB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046DEC $8DDC: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046DED $8DDD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046DEE $8DDE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046DEF $8DDF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046DF0 $8DE0: C-----  00       BRK  
  0x046DF1 $8DE1: C-----  00       BRK  
  0x046DF2 $8DE2: C-----  00       BRK  
  0x046DF3 $8DE3: C-----  01 0A    ORA  ($0A,X)
  0x046DF5 $8DE5: C-----  55 AA    EOR  $AA,X
  0x046DF7 $8DE7: C-----  55 FF    EOR  $FF,X
  0x046DF9 $8DE9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046DFA $8DEA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046DFB $8DEB: C-----  FE F5 AA INC  $AAF5,X
  0x046DFE $8DEE: C-----  55 AA    EOR  $AA,X
  0x046E00 $8DF0: C-----  A0 60    LDY  #$60
  0x046E02 $8DF2: C-----  A8       TAY  
  0x046E03 $8DF3: C-----  55 BA    EOR  $BA,X
  0x046E05 $8DF5: C-----  5D AA 5D EOR  $5DAA,X
  0x046E08 $8DF8: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x046E09 $8DF9: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x046E0A $8DFA: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x046E0B $8DFB: C-----  AA       TAX  
  0x046E0C $8DFC: C-----  45 A2    EOR  $A2
  0x046E0E $8DFE: C-----  55 A2    EOR  $A2,X
  0x046E10 $8E00: C-----  00       BRK  
  0x046E11 $8E01: C-----  00       BRK  
  0x046E12 $8E02: C-----  00       BRK  
  0x046E13 $8E03: C-----  01 02    ORA  ($02,X)
  0x046E15 $8E05: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x046E16 $8E06: C-----  08       PHP  
  0x046E17 $8E07: C-----  10 00    BPL  $8E09
  0x046E19 $8E09: C-----  00       BRK  
  0x046E1A $8E0A: C-----  00       BRK  
  0x046E1B $8E0B: C-----  00       BRK  
  0x046E1C $8E0C: C-----  01 03    ORA  ($03,X)
  0x046E1E $8E0E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046E1F $8E0F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046E20 $8E10: C-----  18       CLC  
  0x046E21 $8E11: C-----  68       PLA  
  0x046E22 $8E12: C-----  88       DEY  
  0x046E23 $8E13: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x046E24 $8E14: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x046E25 $8E15: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x046E26 $8E16: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x046E27 $8E17: C-----  01 07    ORA  ($07,X)
  0x046E29 $8E19: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x046E2A $8E1A: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x046E2B $8E1B: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x046E2C $8E1C: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x046E2D $8E1D: C-----  FD FD FE SBC  $FEFD,X
  0x046E30 $8E20: C-----  20 40 80 JSR  $8040
  0x046E33 $8E23: C-----  00       BRK  
  0x046E34 $8E24: C-----  00       BRK  
  0x046E35 $8E25: C-----  00       BRK  
  0x046E36 $8E26: C-----  00       BRK  
  0x046E37 $8E27: C-----  00       BRK  
  0x046E38 $8E28: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046E39 $8E29: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046E3A $8E2A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046E3B $8E2B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046E3C $8E2C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046E3D $8E2D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046E3E $8E2E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046E3F $8E2F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046E40 $8E30: C-----  00       BRK  
  0x046E41 $8E31: C-----  00       BRK  
  0x046E42 $8E32: C-----  00       BRK  
  0x046E43 $8E33: C-----  00       BRK  
  0x046E44 $8E34: C-----  00       BRK  
  0x046E45 $8E35: C-----  00       BRK  
  0x046E46 $8E36: C-----  00       BRK  
  0x046E47 $8E37: C-----  00       BRK  
  0x046E48 $8E38: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046E49 $8E39: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046E4A $8E3A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046E4B $8E3B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046E4C $8E3C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046E4D $8E3D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046E4E $8E3E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046E4F $8E3F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046E50 $8E40: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046E51 $8E41: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046E52 $8E42: C-----  40       RTI  
  0x046E53 $8E43: C-----  40       RTI  
  0x046E54 $8E44: C-----  30 1C    BMI  $8E62
  0x046E56 $8E46: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046E57 $8E47: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046E58 $8E48: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046E59 $8E49: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046E5A $8E4A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046E5B $8E4B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046E5C $8E4C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046E5D $8E4D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x046E5E $8E4E: C-----  00       BRK  
  0x046E5F $8E4F: C-----  00       BRK  
  0x046E60 $8E50: C-----  00       BRK  
  0x046E61 $8E51: C-----  00       BRK  
  0x046E62 $8E52: C-----  00       BRK  
  0x046E63 $8E53: C-----  00       BRK  
  0x046E64 $8E54: C-----  00       BRK  
  0x046E65 $8E55: C-----  0A       ASL  A
  0x046E66 $8E56: C-----  55 AA    EOR  $AA,X
  0x046E68 $8E58: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046E69 $8E59: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046E6A $8E5A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046E6B $8E5B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046E6C $8E5C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046E6D $8E5D: C-----  F5 AA    SBC  $AA,X
  0x046E6F $8E5F: C-----  55 85    EOR  $85,X
  0x046E71 $8E61: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x046E72 $8E62: C-----  75 3F    ADC  $3F,X
  0x046E74 $8E64: C-----  15 2A    ORA  $2A,X
  0x046E76 $8E66: C-----  15 2B    ORA  $2B,X
  0x046E78 $8E68: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x046E79 $8E69: C-----  3D 8A C0 AND  $C08A,X
  0x046E7C $8E6C: C-----  EA       NOP  
  0x046E7D $8E6D: C-----  D5 EA    CMP  $EA,X
  0x046E7F $8E6F: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x046E80 $8E70: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x046E81 $8E71: C-----  BE 7D FF LDX  $FF7D,Y
  0x046E84 $8E74: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x046E85 $8E75: C-----  C0 80    CPY  #$80
  0x046E87 $8E77: C-----  00       BRK  
  0x046E88 $8E78: C-----  28       PLP  
  0x046E89 $8E79: C-----  01 02    ORA  ($02,X)
  0x046E8B $8E7B: C-----  00       BRK  
  0x046E8C $8E7C: C-----  00       BRK  
  0x046E8D $8E7D: C-----  00       BRK  
  0x046E8E $8E7E: C-----  00       BRK  
  0x046E8F $8E7F: C-----  00       BRK  
  0x046E90 $8E80: C-----  3E 7F 7F ROL  $7F7F,X
  0x046E93 $8E83: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046E94 $8E84: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046E95 $8E85: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046E96 $8E86: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046E97 $8E87: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046E98 $8E88: C-----  00       BRK  
  0x046E99 $8E89: C-----  00       BRK  
  0x046E9A $8E8A: C-----  00       BRK  
  0x046E9B $8E8B: C-----  00       BRK  
  0x046E9C $8E8C: C-----  00       BRK  
  0x046E9D $8E8D: C-----  00       BRK  
  0x046E9E $8E8E: C-----  00       BRK  
  0x046E9F $8E8F: C-----  00       BRK  
  0x046EA0 $8E90: C-----  00       BRK  
  0x046EA1 $8E91: C-----  00       BRK  
  0x046EA2 $8E92: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046EA3 $8E93: C-----  F9 C6 C2 SBC  $C2C6,Y
  0x046EA6 $8E96: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x046EA7 $8E97: C-----  E1 00    SBC  ($00,X)
  0x046EA9 $8E99: C-----  00       BRK  
  0x046EAA $8E9A: C-----  00       BRK  
  0x046EAB $8E9B: C-----  00       BRK  
  0x046EAC $8E9C: C-----  39 3D 1C AND  $1C3D,Y
  0x046EAF $8E9F: C-----  1E 7F 7F ASL  $7F7F,X
  0x046EB2 $8EA2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046EB3 $8EA3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046EB4 $8EA4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046EB5 $8EA5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046EB6 $8EA6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046EB7 $8EA7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046EB8 $8EA8: C-----  00       BRK  
  0x046EB9 $8EA9: C-----  00       BRK  
  0x046EBA $8EAA: C-----  00       BRK  
  0x046EBB $8EAB: C-----  00       BRK  
  0x046EBC $8EAC: C-----  00       BRK  
  0x046EBD $8EAD: C-----  00       BRK  
  0x046EBE $8EAE: C-----  00       BRK  
  0x046EBF $8EAF: C-----  00       BRK  
  0x046EC0 $8EB0: C-----  C0 C0    CPY  #$C0
  0x046EC2 $8EB2: C-----  E1 EA    SBC  ($EA,X)
  0x046EC4 $8EB4: C-----  F5 EB    SBC  $EB,X
  0x046EC6 $8EB6: C-----  FE F6 3F INC  $3FF6,X
  0x046EC9 $8EB9: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046ECA $8EBA: C-----  1E 15 0A ASL  $0A15,X
  0x046ECD $8EBD: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x046ECE $8EBE: C-----  01 09    ORA  ($09,X)
  0x046ED0 $8EC0: C-----  20 40 80 JSR  $8040
  0x046ED3 $8EC3: C-----  00       BRK  
  0x046ED4 $8EC4: C-----  00       BRK  
  0x046ED5 $8EC5: C-----  00       BRK  
  0x046ED6 $8EC6: C-----  01 02    ORA  ($02,X)
  0x046ED8 $8EC8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046ED9 $8EC9: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046EDA $8ECA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046EDB $8ECB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046EDC $8ECC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046EDD $8ECD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046EDE $8ECE: C-----  FE FD 00 INC  $00FD,X
  0x046EE1 $8ED1: C-----  00       BRK  
  0x046EE2 $8ED2: C-----  01 0A    ORA  ($0A,X)
  0x046EE4 $8ED4: C-----  15 2B    ORA  $2B,X
  0x046EE6 $8ED6: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x046EE7 $8ED7: C-----  B8       CLV  
  0x046EE8 $8ED8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046EE9 $8ED9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046EEA $8EDA: C-----  FE F5 EA INC  $EAF5,X
  0x046EED $8EDD: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x046EEE $8EDE: C-----  A8       TAY  
  0x046EEF $8EDF: C-----  40       RTI  
  0x046EF0 $8EE0: C-----  C0 C0    CPY  #$C0
  0x046EF2 $8EE2: C-----  E0 D4    CPX  #$D4
  0x046EF4 $8EE4: C-----  EA       NOP  
  0x046EF5 $8EE5: C-----  F5 AA    SBC  $AA,X
  0x046EF7 $8EE7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046EF8 $8EE8: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046EF9 $8EE9: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x046EFA $8EEA: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x046EFB $8EEB: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x046EFC $8EEC: C-----  15 0A    ORA  $0A,X
  0x046EFE $8EEE: C-----  55 00    EOR  $00,X
  0x046F00 $8EF0: C-----  00       BRK  
  0x046F01 $8EF1: C-----  00       BRK  
  0x046F02 $8EF2: C-----  00       BRK  
  0x046F03 $8EF3: C-----  00       BRK  
  0x046F04 $8EF4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046F05 $8EF5: C-----  55 AA    EOR  $AA,X
  0x046F07 $8EF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046F08 $8EF8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046F09 $8EF9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046F0A $8EFA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046F0B $8EFB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046F0C $8EFC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x046F0D $8EFD: C-----  AA       TAX  
  0x046F0E $8EFE: C-----  55 00    EOR  $00,X
  0x046F10 $8F00: C-----  00       BRK  
  0x046F11 $8F01: C-----  00       BRK  
  0x046F12 $8F02: C-----  01 02    ORA  ($02,X)
  0x046F14 $8F04: C-----  05 2A    ORA  $2A
  0x046F16 $8F06: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x046F17 $8F07: C-----  AC FF FF LDY  $FFFF
  0x046F1A $8F0A: C-----  FE FD FA INC  $FAFD,X
  0x046F1D $8F0D: C-----  D5 A8    CMP  $A8,X
  0x046F1F $8F0F: C-----  50 56    BVC  $8F67
  0x046F21 $8F11: C-----  AC 58 B0 LDY  $B058
  0x046F24 $8F14: C-----  60       RTS  
  0x046F25 $8F15: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046F26 $8F16: C-----  00       BRK  
  0x046F27 $8F17: C-----  00       BRK  
  0x046F28 $8F18: C-----  A8       TAY  
  0x046F29 $8F19: C-----  50 A0    BVC  $8EBB
  0x046F2B $8F1B: C-----  40       RTI  
  0x046F2C $8F1C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046F2D $8F1D: C-----  00       BRK  
  0x046F2E $8F1E: C-----  00       BRK  
  0x046F2F $8F1F: C-----  00       BRK  
  0x046F30 $8F20: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x046F31 $8F21: C-----  BE 7D FF LDX  $FF7D,Y
  0x046F34 $8F24: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x046F35 $8F25: C-----  C0 80    CPY  #$80
  0x046F37 $8F27: C-----  00       BRK  
  0x046F38 $8F28: C-----  00       BRK  
  0x046F39 $8F29: C-----  40       RTI  
  0x046F3A $8F2A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046F3B $8F2B: C-----  00       BRK  
  0x046F3C $8F2C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046F3D $8F2D: C-----  00       BRK  
  0x046F3E $8F2E: C-----  00       BRK  
  0x046F3F $8F2F: C-----  00       BRK  
  0x046F40 $8F30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046F41 $8F31: C-----  00       BRK  
  0x046F42 $8F32: C-----  00       BRK  
  0x046F43 $8F33: C-----  00       BRK  
  0x046F44 $8F34: C-----  00       BRK  
  0x046F45 $8F35: C-----  00       BRK  
  0x046F46 $8F36: C-----  00       BRK  
  0x046F47 $8F37: C-----  00       BRK  
  0x046F48 $8F38: C-----  00       BRK  
  0x046F49 $8F39: C-----  00       BRK  
  0x046F4A $8F3A: C-----  00       BRK  
  0x046F4B $8F3B: C-----  00       BRK  
  0x046F4C $8F3C: C-----  00       BRK  
  0x046F4D $8F3D: C-----  00       BRK  
  0x046F4E $8F3E: C-----  00       BRK  
  0x046F4F $8F3F: C-----  00       BRK  
  0x046F50 $8F40: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x046F51 $8F41: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x046F52 $8F42: C-----  01 00    ORA  ($00,X)
  0x046F54 $8F44: C-----  00       BRK  
  0x046F55 $8F45: C-----  00       BRK  
  0x046F56 $8F46: C-----  00       BRK  
  0x046F57 $8F47: C-----  00       BRK  
  0x046F58 $8F48: C-----  00       BRK  
  0x046F59 $8F49: C-----  00       BRK  
  0x046F5A $8F4A: C-----  00       BRK  
  0x046F5B $8F4B: C-----  00       BRK  
  0x046F5C $8F4C: C-----  00       BRK  
  0x046F5D $8F4D: C-----  00       BRK  
  0x046F5E $8F4E: C-----  00       BRK  
  0x046F5F $8F4F: C-----  00       BRK  
  0x046F60 $8F50: C-----  F5 EE    SBC  $EE,X
  0x046F62 $8F52: C-----  F0 00    BEQ  $8F54
  0x046F64 $8F54: C-----  00       BRK  
  0x046F65 $8F55: C-----  00       BRK  
  0x046F66 $8F56: C-----  00       BRK  
  0x046F67 $8F57: C-----  00       BRK  
  0x046F68 $8F58: C-----  0A       ASL  A
  0x046F69 $8F59: C-----  10 00    BPL  $8F5B
  0x046F6B $8F5B: C-----  00       BRK  
  0x046F6C $8F5C: C-----  00       BRK  
  0x046F6D $8F5D: C-----  00       BRK  
  0x046F6E $8F5E: C-----  00       BRK  
  0x046F6F $8F5F: C-----  00       BRK  
  0x046F70 $8F60: C-----  AA       TAX  
  0x046F71 $8F61: C-----  FD 07 00 SBC  $0007,X
  0x046F74 $8F64: C-----  00       BRK  
  0x046F75 $8F65: C-----  00       BRK  
  0x046F76 $8F66: C-----  00       BRK  
  0x046F77 $8F67: C-----  00       BRK  
  0x046F78 $8F68: C-----  55 02    EOR  $02,X
  0x046F7A $8F6A: C-----  00       BRK  
  0x046F7B $8F6B: C-----  00       BRK  
  0x046F7C $8F6C: C-----  00       BRK  
  0x046F7D $8F6D: C-----  00       BRK  
  0x046F7E $8F6E: C-----  00       BRK  
  0x046F7F $8F6F: C-----  00       BRK  
  0x046F80 $8F70: C-----  AA       TAX  
  0x046F81 $8F71: C-----  55 FF    EOR  $FF,X
  0x046F83 $8F73: C-----  00       BRK  
  0x046F84 $8F74: C-----  00       BRK  
  0x046F85 $8F75: C-----  00       BRK  
  0x046F86 $8F76: C-----  00       BRK  
  0x046F87 $8F77: C-----  00       BRK  
  0x046F88 $8F78: C-----  55 AA    EOR  $AA,X
  0x046F8A $8F7A: C-----  00       BRK  
  0x046F8B $8F7B: C-----  00       BRK  
  0x046F8C $8F7C: C-----  00       BRK  
  0x046F8D $8F7D: C-----  00       BRK  
  0x046F8E $8F7E: C-----  00       BRK  
  0x046F8F $8F7F: C-----  00       BRK  
  0x046F90 $8F80: C-----  05 2A    ORA  $2A
  0x046F92 $8F82: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x046F93 $8F83: C-----  BC E0 00 LDY  $00E0,X
  0x046F96 $8F86: C-----  00       BRK  
  0x046F97 $8F87: C-----  00       BRK  
  0x046F98 $8F88: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x046F99 $8F89: C-----  D5 A8    CMP  $A8,X
  0x046F9B $8F8B: C-----  40       RTI  
  0x046F9C $8F8C: C-----  00       BRK  
  0x046F9D $8F8D: C-----  00       BRK  
  0x046F9E $8F8E: C-----  00       BRK  
  0x046F9F $8F8F: C-----  00       BRK  
  0x046FA0 $8F90: C-----  70 C0    BVS  $8F52
  0x046FA2 $8F92: C-----  00       BRK  
  0x046FA3 $8F93: C-----  00       BRK  
  0x046FA4 $8F94: C-----  00       BRK  
  0x046FA5 $8F95: C-----  00       BRK  
  0x046FA6 $8F96: C-----  00       BRK  
  0x046FA7 $8F97: C-----  00       BRK  
  0x046FA8 $8F98: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046FA9 $8F99: C-----  00       BRK  
  0x046FAA $8F9A: C-----  00       BRK  
  0x046FAB $8F9B: C-----  00       BRK  
  0x046FAC $8F9C: C-----  00       BRK  
  0x046FAD $8F9D: C-----  00       BRK  
  0x046FAE $8F9E: C-----  00       BRK  
  0x046FAF $8F9F: C-----  00       BRK  
  0x046FB0 $8FA0: C-----  00       BRK  
  0x046FB1 $8FA1: C-----  00       BRK  
  0x046FB2 $8FA2: C-----  00       BRK  
  0x046FB3 $8FA3: C-----  00       BRK  
  0x046FB4 $8FA4: C-----  00       BRK  
  0x046FB5 $8FA5: C-----  50 AA    BVC  $8F51
  0x046FB7 $8FA7: C-----  55 FF    EOR  $FF,X
  0x046FB9 $8FA9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046FBA $8FAA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046FBB $8FAB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046FBC $8FAC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046FBD $8FAD: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x046FBE $8FAE: C-----  55 AA    EOR  $AA,X
  0x046FC0 $8FB0: C-----  00       BRK  
  0x046FC1 $8FB1: C-----  00       BRK  
  0x046FC2 $8FB2: C-----  00       BRK  
  0x046FC3 $8FB3: C-----  00       BRK  
  0x046FC4 $8FB4: C-----  00       BRK  
  0x046FC5 $8FB5: C-----  01 AA    ORA  ($AA,X)
  0x046FC7 $8FB7: C-----  55 FF    EOR  $FF,X
  0x046FC9 $8FB9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046FCA $8FBA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046FCB $8FBB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046FCC $8FBC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x046FCD $8FBD: C-----  FE 55 AA INC  $AA55,X
  0x046FD0 $8FC0: C-----  AE 7D 80 LDX  $807D
  0x046FD3 $8FC3: C-----  00       BRK  
  0x046FD4 $8FC4: C-----  00       BRK  
  0x046FD5 $8FC5: C-----  00       BRK  
  0x046FD6 $8FC6: C-----  00       BRK  
  0x046FD7 $8FC7: C-----  00       BRK  
  0x046FD8 $8FC8: C-----  51 80    EOR  ($80),Y
  0x046FDA $8FCA: C-----  00       BRK  
  0x046FDB $8FCB: C-----  00       BRK  
  0x046FDC $8FCC: C-----  00       BRK  
  0x046FDD $8FCD: C-----  00       BRK  
  0x046FDE $8FCE: C-----  00       BRK  
  0x046FDF $8FCF: C-----  00       BRK  
  0x046FE0 $8FD0: C-----  00       BRK  
  0x046FE1 $8FD1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046FE2 $8FD2: C-----  60       RTS  
  0x046FE3 $8FD3: C-----  10 08    BPL  $8FDD
  0x046FE5 $8FD5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x046FE6 $8FD6: C-----  C4 F2    CPY  $F2
  0x046FE8 $8FD8: C-----  00       BRK  
  0x046FE9 $8FD9: C-----  00       BRK  
  0x046FEA $8FDA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046FEB $8FDB: C-----  E0 F0    CPX  #$F0
  0x046FED $8FDD: C-----  F8       SED  
  0x046FEE $8FDE: C-----  38       SEC  
  0x046FEF $8FDF: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x046FF0 $8FE0: C-----  0E 1C 1C ASL  $1C1C
  0x046FF3 $8FE3: C-----  F8       SED  
  0x046FF4 $8FE4: C-----  10 60    BPL  $9046
  0x046FF6 $8FE6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x046FF7 $8FE7: C-----  00       BRK  
  0x046FF8 $8FE8: C-----  F0 E0    BEQ  $8FCA
  0x046FFA $8FEA: C-----  E0 00    CPX  #$00
  0x046FFC $8FEC: C-----  E0 80    CPX  #$80
  0x046FFE $8FEE: C-----  00       BRK  
  0x046FFF $8FEF: C-----  00       BRK  
  0x047000 $8FF0: C-----  FE F9 F1 INC  $F1F9,X
  0x047003 $8FF3: C-----  F1 F1    SBC  ($F1),Y
  0x047005 $8FF5: C-----  11 09    ORA  ($09),Y
  0x047007 $8FF7: C-----  0E 00 06 ASL  $0600
  0x04700A $8FFA: C-----  0E 0E 0E ASL  $0E0E
  0x04700D $8FFD: C-----  EE F6 F0 INC  $F0F6
  0x047010 $9000: C-----  00       BRK  
  0x047011 $9001: ------  .byte $00
  0x047012 $9002: ------  .byte $00
  0x047013 $9003: ------  .byte $00
  0x047014 $9004: ------  .byte $00
  0x047015 $9005: ------  .byte $00
  0x047016 $9006: ------  .byte $00
  0x047017 $9007: ------  .byte $00
  0x047018 $9008: C-----  00       BRK  
  0x047019 $9009: ------  .byte $00
  0x04701A $900A: ------  .byte $00
  0x04701B $900B: ------  .byte $00
  0x04701C $900C: ------  .byte $00
  0x04701D $900D: ------  .byte $00
  0x04701E $900E: ------  .byte $00
  0x04701F $900F: ------  .byte $00
  0x047020 $9010: ------  .byte $FF
  0x047021 $9011: ------  .byte $FF
  0x047022 $9012: ------  .byte $FF
  0x047023 $9013: ------  .byte $FF
  0x047024 $9014: ------  .byte $FF
  0x047025 $9015: ------  .byte $FF
  0x047026 $9016: ------  .byte $FF
  0x047027 $9017: ------  .byte $FF
  0x047028 $9018: ------  .byte $00
  0x047029 $9019: ------  .byte $00
  0x04702A $901A: ------  .byte $00
  0x04702B $901B: ------  .byte $00
  0x04702C $901C: ------  .byte $00
  0x04702D $901D: ------  .byte $00
  0x04702E $901E: ------  .byte $00
  0x04702F $901F: ------  .byte $00
  0x047030 $9020: C-----  00       BRK  
  0x047031 $9021: C-----  00       BRK  
  0x047032 $9022: C-----  00       BRK  
  0x047033 $9023: C-----  00       BRK  
  0x047034 $9024: C-----  00       BRK  
  0x047035 $9025: C-----  00       BRK  
  0x047036 $9026: C-----  70 FC    BVS  $9024
  0x047038 $9028: C-----  00       BRK  
  0x047039 $9029: C-----  00       BRK  
  0x04703A $902A: C-----  00       BRK  
  0x04703B $902B: C-----  00       BRK  
  0x04703C $902C: C-----  00       BRK  
  0x04703D $902D: C-----  00       BRK  
  0x04703E $902E: C-----  00       BRK  
  0x04703F $902F: C-----  00       BRK  
  0x047040 $9030: C-----  00       BRK  
  0x047041 $9031: C-----  C0 E0    CPY  #$E0
  0x047043 $9033: C-----  D8       CLD  
  0x047044 $9034: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x047045 $9035: C-----  C0 C0    CPY  #$C0
  0x047047 $9037: C-----  C0 00    CPY  #$00
  0x047049 $9039: C-----  00       BRK  
  0x04704A $903A: C-----  00       BRK  
  0x04704B $903B: C-----  60       RTS  
  0x04704C $903C: C-----  78       SEI  
  0x04704D $903D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04704E $903E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04704F $903F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x047050 $9040: C-----  00       BRK  
  0x047051 $9041: C-----  00       BRK  
  0x047052 $9042: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047053 $9043: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047054 $9044: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047055 $9045: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047056 $9046: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047057 $9047: C-----  01 00    ORA  ($00,X)
  0x047059 $9049: C-----  00       BRK  
  0x04705A $904A: C-----  00       BRK  
  0x04705B $904B: C-----  00       BRK  
  0x04705C $904C: C-----  00       BRK  
  0x04705D $904D: C-----  00       BRK  
  0x04705E $904E: C-----  00       BRK  
  0x04705F $904F: C-----  00       BRK  
  0x047060 $9050: C-----  00       BRK  
  0x047061 $9051: C-----  00       BRK  
  0x047062 $9052: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047063 $9053: C-----  C0 E0    CPY  #$E0
  0x047065 $9055: C-----  B0 78    BCS  $90CF
  0x047067 $9057: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x047068 $9058: C-----  00       BRK  
  0x047069 $9059: C-----  00       BRK  
  0x04706A $905A: C-----  00       BRK  
  0x04706B $905B: C-----  00       BRK  
  0x04706C $905C: C-----  00       BRK  
  0x04706D $905D: C-----  40       RTI  
  0x04706E $905E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04706F $905F: C-----  20 00 00 JSR  $0000
  0x047072 $9062: C-----  00       BRK  
  0x047073 $9063: C-----  00       BRK  
  0x047074 $9064: C-----  00       BRK  
  0x047075 $9065: C-----  E0 18    CPX  #$18
  0x047077 $9067: C-----  06 00    ASL  $00
  0x047079 $9069: C-----  00       BRK  
  0x04707A $906A: C-----  00       BRK  
  0x04707B $906B: C-----  00       BRK  
  0x04707C $906C: C-----  00       BRK  
  0x04707D $906D: C-----  00       BRK  
  0x04707E $906E: C-----  E0 F8    CPX  #$F8
  0x047080 $9070: C-----  F0 E1    BEQ  $9053
  0x047082 $9072: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x047083 $9073: C-----  45 23    EOR  $23
  0x047085 $9075: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x047086 $9076: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x047087 $9077: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x047088 $9078: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047089 $9079: C-----  1E 3D 3A ASL  $3A3D,X
  0x04708C $907C: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04708D $907D: C-----  1D 0D 09 ORA  $090D,X
  0x047090 $9080: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x047091 $9081: C-----  7D 6F 2B ADC  $2B6F,X
  0x047094 $9084: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x047095 $9085: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x047096 $9086: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x047097 $9087: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047098 $9088: C-----  08       PHP  
  0x047099 $9089: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04709A $908A: C-----  10 14    BPL  $90A0
  0x04709C $908C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04709D $908D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04709E $908E: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04709F $908F: C-----  00       BRK  
  0x0470A0 $9090: C-----  40       RTI  
  0x0470A1 $9091: C-----  30 08    BMI  $909B
  0x0470A3 $9093: C-----  05 02    ORA  $02
  0x0470A5 $9095: C-----  01 00    ORA  ($00,X)
  0x0470A7 $9097: C-----  00       BRK  
  0x0470A8 $9098: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0470A9 $9099: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0470AA $909A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0470AB $909B: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0470AC $909C: C-----  01 00    ORA  ($00,X)
  0x0470AE $909E: C-----  00       BRK  
  0x0470AF $909F: C-----  00       BRK  
  0x0470B0 $90A0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0470B1 $90A1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0470B2 $90A2: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0470B3 $90A3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0470B4 $90A4: C-----  01 C1    ORA  ($C1,X)
  0x0470B6 $90A6: C-----  F1 F9    SBC  ($F9),Y
  0x0470B8 $90A8: C-----  01 01    ORA  ($01,X)
  0x0470BA $90AA: C-----  01 01    ORA  ($01,X)
  0x0470BC $90AC: C-----  00       BRK  
  0x0470BD $90AD: C-----  00       BRK  
  0x0470BE $90AE: C-----  C0 F0    CPY  #$F0
  0x0470C0 $90B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0470C1 $90B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0470C2 $90B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0470C3 $90B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0470C4 $90B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0470C5 $90B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0470C6 $90B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0470C7 $90B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0470C8 $90B8: C-----  FE FF FF INC  $FFFF,X
  0x0470CB $90BB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0470CC $90BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0470CD $90BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0470CE $90BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0470CF $90BF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0470D0 $90C0: C-----  01 00    ORA  ($00,X)
  0x0470D2 $90C2: C-----  00       BRK  
  0x0470D3 $90C3: C-----  00       BRK  
  0x0470D4 $90C4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0470D5 $90C5: C-----  50 AB    BVC  $9072
  0x0470D7 $90C7: C-----  55 FE    EOR  $FE,X
  0x0470D9 $90C9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0470DA $90CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0470DB $90CB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0470DC $90CC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0470DD $90CD: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x0470DE $90CE: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x0470DF $90CF: C-----  2A       ROL  A
  0x0470E0 $90D0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0470E1 $90D1: C-----  78       SEI  
  0x0470E2 $90D2: C-----  24 42    BIT  $42
  0x0470E4 $90D4: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0470E5 $90D5: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0470E6 $90D6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0470E7 $90D7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0470E8 $90D8: C-----  00       BRK  
  0x0470E9 $90D9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0470EA $90DA: C-----  D8       CLD  
  0x0470EB $90DB: C-----  BC 78 77 LDY  $7778,X
  0x0470EE $90DE: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0470EF $90DF: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0470F0 $90E0: C-----  00       BRK  
  0x0470F1 $90E1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0470F2 $90E2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0470F3 $90E3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0470F4 $90E4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0470F5 $90E5: C-----  C0 C0    CPY  #$C0
  0x0470F7 $90E7: C-----  E0 00    CPX  #$00
  0x0470F9 $90E9: C-----  00       BRK  
  0x0470FA $90EA: C-----  00       BRK  
  0x0470FB $90EB: C-----  00       BRK  
  0x0470FC $90EC: C-----  00       BRK  
  0x0470FD $90ED: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0470FE $90EE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0470FF $90EF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047100 $90F0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047101 $90F1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047102 $90F2: C-----  01 00    ORA  ($00,X)
  0x047104 $90F4: C-----  00       BRK  
  0x047105 $90F5: C-----  00       BRK  
  0x047106 $90F6: C-----  00       BRK  
  0x047107 $90F7: C-----  00       BRK  
  0x047108 $90F8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047109 $90F9: C-----  01 00    ORA  ($00,X)
  0x04710B $90FB: C-----  00       BRK  
  0x04710C $90FC: C-----  00       BRK  
  0x04710D $90FD: C-----  00       BRK  
  0x04710E $90FE: C-----  00       BRK  
  0x04710F $90FF: C-----  00       BRK  
  0x047110 $9100: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047111 $9101: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047112 $9102: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047113 $9103: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047114 $9104: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047115 $9105: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047116 $9106: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047117 $9107: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047118 $9108: C-----  01 03    ORA  ($03,X)
  0x04711A $910A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04711B $910B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04711C $910C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04711D $910D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04711E $910E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04711F $910F: C-----  FE FE FC INC  $FCFE,X
  0x047122 $9112: C-----  F8       SED  
  0x047123 $9113: C-----  F0 E0    BEQ  $90F5
  0x047125 $9115: C-----  C0 80    CPY  #$80
  0x047127 $9117: C-----  00       BRK  
  0x047128 $9118: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047129 $9119: C-----  F8       SED  
  0x04712A $911A: C-----  E0 E0    CPX  #$E0
  0x04712C $911C: C-----  C0 80    CPY  #$80
  0x04712E $911E: C-----  00       BRK  
  0x04712F $911F: C-----  00       BRK  
  0x047130 $9120: C-----  C0 E0    CPY  #$E0
  0x047132 $9122: C-----  70 F8    BVS  $911C
  0x047134 $9124: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047135 $9125: C-----  FE FE FF INC  $FFFE,X
  0x047138 $9128: C-----  00       BRK  
  0x047139 $9129: C-----  00       BRK  
  0x04713A $912A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04713B $912B: C-----  70 F8    BVS  $9125
  0x04713D $912D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04713E $912E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04713F $912F: C-----  FE 1F 3F INC  $3F1F,X
  0x047142 $9132: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047143 $9133: C-----  00       BRK  
  0x047144 $9134: C-----  00       BRK  
  0x047145 $9135: C-----  00       BRK  
  0x047146 $9136: C-----  00       BRK  
  0x047147 $9137: C-----  00       BRK  
  0x047148 $9138: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047149 $9139: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04714A $913A: C-----  00       BRK  
  0x04714B $913B: C-----  00       BRK  
  0x04714C $913C: C-----  00       BRK  
  0x04714D $913D: C-----  00       BRK  
  0x04714E $913E: C-----  00       BRK  
  0x04714F $913F: C-----  00       BRK  
  0x047150 $9140: C-----  00       BRK  
  0x047151 $9141: C-----  00       BRK  
  0x047152 $9142: C-----  00       BRK  
  0x047153 $9143: C-----  00       BRK  
  0x047154 $9144: C-----  00       BRK  
  0x047155 $9145: C-----  00       BRK  
  0x047156 $9146: C-----  01 07    ORA  ($07,X)
  0x047158 $9148: C-----  00       BRK  
  0x047159 $9149: C-----  00       BRK  
  0x04715A $914A: C-----  00       BRK  
  0x04715B $914B: C-----  00       BRK  
  0x04715C $914C: C-----  00       BRK  
  0x04715D $914D: C-----  00       BRK  
  0x04715E $914E: C-----  00       BRK  
  0x04715F $914F: C-----  01 01    ORA  ($01,X)
  0x047161 $9151: C-----  01 02    ORA  ($02,X)
  0x047163 $9153: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x047164 $9154: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047165 $9155: C-----  08       PHP  
  0x047166 $9156: C-----  08       PHP  
  0x047167 $9157: C-----  38       SEC  
  0x047168 $9158: C-----  FE FE FC INC  $FCFE,X
  0x04716B $915B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04716C $915C: C-----  F8       SED  
  0x04716D $915D: C-----  F0 F0    BEQ  $914F
  0x04716F $915F: C-----  C0 FE    CPY  #$FE
  0x047171 $9161: C-----  F8       SED  
  0x047172 $9162: C-----  F8       SED  
  0x047173 $9163: C-----  F0 E0    BEQ  $9145
  0x047175 $9165: C-----  00       BRK  
  0x047176 $9166: C-----  00       BRK  
  0x047177 $9167: C-----  00       BRK  
  0x047178 $9168: C-----  F8       SED  
  0x047179 $9169: C-----  F0 30    BEQ  $919B
  0x04717B $916B: C-----  60       RTS  
  0x04717C $916C: C-----  00       BRK  
  0x04717D $916D: C-----  00       BRK  
  0x04717E $916E: C-----  00       BRK  
  0x04717F $916F: C-----  00       BRK  
  0x047180 $9170: C-----  78       SEI  
  0x047181 $9171: C-----  F8       SED  
  0x047182 $9172: C-----  F8       SED  
  0x047183 $9173: C-----  F8       SED  
  0x047184 $9174: C-----  F8       SED  
  0x047185 $9175: C-----  F0 00    BEQ  $9177
  0x047187 $9177: C-----  00       BRK  
  0x047188 $9178: C-----  90 30    BCC  $91AA
  0x04718A $917A: C-----  F0 F0    BEQ  $916C
  0x04718C $917C: C-----  E0 00    CPX  #$00
  0x04718E $917E: C-----  00       BRK  
  0x04718F $917F: C-----  00       BRK  
  0x047190 $9180: C-----  00       BRK  
  0x047191 $9181: C-----  00       BRK  
  0x047192 $9182: C-----  00       BRK  
  0x047193 $9183: C-----  00       BRK  
  0x047194 $9184: C-----  00       BRK  
  0x047195 $9185: C-----  00       BRK  
  0x047196 $9186: C-----  00       BRK  
  0x047197 $9187: C-----  00       BRK  
  0x047198 $9188: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047199 $9189: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04719A $918A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04719B $918B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04719C $918C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04719D $918D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04719E $918E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04719F $918F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0471A0 $9190: C-----  21 57    AND  ($57,X)
  0x0471A2 $9192: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0471A3 $9193: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0471A4 $9194: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0471A5 $9195: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0471A6 $9196: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0471A7 $9197: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0471A8 $9198: C-----  00       BRK  
  0x0471A9 $9199: C-----  21 27    AND  ($27,X)
  0x0471AB $919B: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0471AC $919C: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0471AD $919D: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0471AE $919E: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0471AF $919F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0471B0 $91A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0471B1 $91A1: C-----  FE FC F8 INC  $F8FC,X
  0x0471B4 $91A4: C-----  A8       TAY  
  0x0471B5 $91A5: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x0471B6 $91A6: C-----  2A       ROL  A
  0x0471B7 $91A7: C-----  15 FE    ORA  $FE,X
  0x0471B9 $91A9: C-----  FD F3 07 SBC  $07F3,X
  0x0471BC $91AC: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x0471BD $91AD: C-----  28       PLP  
  0x0471BE $91AE: C-----  15 0A    ORA  $0A,X
  0x0471C0 $91B0: C-----  20 20 40 JSR  $4020
  0x0471C3 $91B3: C-----  40       RTI  
  0x0471C4 $91B4: C-----  81 02    STA  ($02,X)
  0x0471C6 $91B6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0471C7 $91B7: C-----  18       CLC  
  0x0471C8 $91B8: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0471C9 $91B9: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0471CA $91BA: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0471CB $91BB: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0471CC $91BC: C-----  7E FC F8 ROR  $F8FC,X
  0x0471CF $91BF: C-----  E0 F0    CPX  #$F0
  0x0471D1 $91C1: C-----  A8       TAY  
  0x0471D2 $91C2: C-----  50 A0    BVC  $9164
  0x0471D4 $91C4: C-----  40       RTI  
  0x0471D5 $91C5: C-----  A0 40    LDY  #$40
  0x0471D7 $91C7: C-----  A0 0F    LDY  #$0F
  0x0471D9 $91C9: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x0471DA $91CA: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x0471DB $91CB: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0471DC $91CC: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0471DD $91CD: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0471DE $91CE: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0471DF $91CF: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0471E0 $91D0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0471E1 $91D1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0471E2 $91D2: C-----  01 01    ORA  ($01,X)
  0x0471E4 $91D4: C-----  01 01    ORA  ($01,X)
  0x0471E6 $91D6: C-----  01 01    ORA  ($01,X)
  0x0471E8 $91D8: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0471E9 $91D9: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0471EA $91DA: C-----  FE FE FE INC  $FEFE,X
  0x0471ED $91DD: C-----  FE FE FE INC  $FEFE,X
  0x0471F0 $91E0: C-----  21 57    AND  ($57,X)
  0x0471F2 $91E2: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0471F3 $91E3: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0471F4 $91E4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0471F5 $91E5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0471F6 $91E6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0471F7 $91E7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0471F8 $91E8: C-----  C0 81    CPY  #$81
  0x0471FA $91EA: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0471FB $91EB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0471FC $91EC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0471FD $91ED: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0471FE $91EE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0471FF $91EF: C-----  00       BRK  
  0x047200 $91F0: C-----  EE FF FF INC  $FFFF
  0x047203 $91F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047204 $91F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047205 $91F5: C-----  FE 8C 00 INC  $008C,X
  0x047208 $91F8: C-----  00       BRK  
  0x047209 $91F9: C-----  EE FE E6 INC  $E6FE
  0x04720C $91FC: C-----  6A       ROR  A
  0x04720D $91FD: C-----  88       DEY  
  0x04720E $91FE: C-----  00       BRK  
  0x04720F $91FF: C-----  00       BRK  
  0x047210 $9200: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x047211 $9201: C-----  0D 03 00 ORA  $0003
  0x047214 $9204: C-----  00       BRK  
  0x047215 $9205: C-----  00       BRK  
  0x047216 $9206: C-----  00       BRK  
  0x047217 $9207: C-----  00       BRK  
  0x047218 $9208: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047219 $9209: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04721A $920A: C-----  00       BRK  
  0x04721B $920B: C-----  00       BRK  
  0x04721C $920C: C-----  00       BRK  
  0x04721D $920D: C-----  00       BRK  
  0x04721E $920E: C-----  00       BRK  
  0x04721F $920F: C-----  00       BRK  
  0x047220 $9210: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x047221 $9211: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x047222 $9212: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x047223 $9213: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x047224 $9214: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047225 $9215: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047226 $9216: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047227 $9217: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047228 $9218: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x047229 $9219: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04722A $921A: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04722B $921B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04722C $921C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04722D $921D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04722E $921E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04722F $921F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047230 $9220: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047231 $9221: C-----  0E 05 06 ASL  $0605
  0x047234 $9224: C-----  05 06    ORA  $06
  0x047236 $9226: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047237 $9227: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x047238 $9228: C-----  00       BRK  
  0x047239 $9229: C-----  01 02    ORA  ($02,X)
  0x04723B $922B: C-----  01 02    ORA  ($02,X)
  0x04723D $922D: C-----  01 00    ORA  ($00,X)
  0x04723F $922F: C-----  01 00    ORA  ($00,X)
  0x047241 $9231: C-----  00       BRK  
  0x047242 $9232: C-----  00       BRK  
  0x047243 $9233: C-----  00       BRK  
  0x047244 $9234: C-----  00       BRK  
  0x047245 $9235: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047246 $9236: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x047247 $9237: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047248 $9238: C-----  00       BRK  
  0x047249 $9239: C-----  00       BRK  
  0x04724A $923A: C-----  00       BRK  
  0x04724B $923B: C-----  00       BRK  
  0x04724C $923C: C-----  00       BRK  
  0x04724D $923D: C-----  00       BRK  
  0x04724E $923E: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04724F $923F: C-----  00       BRK  
  0x047250 $9240: C-----  FD FF FF SBC  $FFFF,X
  0x047253 $9243: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047254 $9244: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047255 $9245: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047256 $9246: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047257 $9247: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047258 $9248: C-----  F8       SED  
  0x047259 $9249: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04725A $924A: C-----  FE FF FF INC  $FFFF,X
  0x04725D $924D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04725E $924E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04725F $924F: C-----  FE FF FF INC  $FFFF,X
  0x047262 $9252: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047263 $9253: C-----  C0 8E    CPY  #$8E
  0x047265 $9255: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047266 $9256: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047267 $9257: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047268 $9258: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047269 $9259: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04726A $925A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04726B $925B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04726C $925C: C-----  71 7F    ADC  ($7F),Y
  0x04726E $925E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04726F $925F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x047270 $9260: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047271 $9261: C-----  0E 05 56 ASL  $5605
  0x047274 $9264: C-----  2D F6 A7 AND  $A7F6
  0x047277 $9267: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x047278 $9268: C-----  00       BRK  
  0x047279 $9269: C-----  00       BRK  
  0x04727A $926A: C-----  00       BRK  
  0x04727B $926B: C-----  00       BRK  
  0x04727C $926C: C-----  00       BRK  
  0x04727D $926D: C-----  08       PHP  
  0x04727E $926E: C-----  58       CLI  
  0x04727F $926F: C-----  2C 0F 0E BIT  $0E0F
  0x047282 $9272: C-----  05 56    ORA  $56
  0x047284 $9274: C-----  2D F6 A7 AND  $A7F6
  0x047287 $9277: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x047288 $9278: C-----  00       BRK  
  0x047289 $9279: C-----  01 02    ORA  ($02,X)
  0x04728B $927B: C-----  01 02    ORA  ($02,X)
  0x04728D $927D: C-----  01 00    ORA  ($00,X)
  0x04728F $927F: C-----  01 03    ORA  ($03,X)
  0x047291 $9281: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x047292 $9282: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047293 $9283: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047294 $9284: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047295 $9285: C-----  08       PHP  
  0x047296 $9286: C-----  10 20    BPL  $92A8
  0x047298 $9288: C-----  00       BRK  
  0x047299 $9289: C-----  01 03    ORA  ($03,X)
  0x04729B $928B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04729C $928C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04729D $928D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04729E $928E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04729F $928F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0472A0 $9290: C-----  40       RTI  
  0x0472A1 $9291: C-----  A0 40    LDY  #$40
  0x0472A3 $9293: C-----  00       BRK  
  0x0472A4 $9294: C-----  C0 20    CPY  #$20
  0x0472A6 $9296: C-----  10 08    BPL  $92A0
  0x0472A8 $9298: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0472A9 $9299: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0472AA $929A: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0472AB $929B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0472AC $929C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0472AD $929D: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0472AE $929E: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0472AF $929F: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0472B0 $92A0: C-----  20 38 3C JSR  $3C38
  0x0472B3 $92A3: C-----  7E FE FF ROR  $FFFE,X
  0x0472B6 $92A6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0472B7 $92A7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0472B8 $92A8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0472B9 $92A9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0472BA $92AA: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x0472BB $92AB: C-----  3D 7D FE AND  $FE7D,X
  0x0472BE $92AE: C-----  FE FE 08 INC  $08FE,X
  0x0472C1 $92B1: C-----  00       BRK  
  0x0472C2 $92B2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0472C3 $92B3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0472C4 $92B4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0472C5 $92B5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0472C6 $92B6: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x0472C7 $92B7: C-----  BC F7 FF LDY  $FFF7,X
  0x0472CA $92BA: C-----  F8       SED  
  0x0472CB $92BB: C-----  F9 F3 C0 SBC  $C0F3,Y
  0x0472CE $92BE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0472CF $92BF: C-----  00       BRK  
  0x0472D0 $92C0: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0472D1 $92C1: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x0472D2 $92C2: C-----  C4 24    CPY  $24
  0x0472D4 $92C4: C-----  24 18    BIT  $18
  0x0472D6 $92C6: C-----  10 20    BPL  $92E8
  0x0472D8 $92C8: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0472D9 $92C9: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0472DA $92CA: C-----  38       SEC  
  0x0472DB $92CB: C-----  18       CLC  
  0x0472DC $92CC: C-----  18       CLC  
  0x0472DD $92CD: C-----  00       BRK  
  0x0472DE $92CE: C-----  00       BRK  
  0x0472DF $92CF: C-----  00       BRK  
  0x0472E0 $92D0: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0472E1 $92D1: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x0472E2 $92D2: C-----  C4 24    CPY  $24
  0x0472E4 $92D4: C-----  24 18    BIT  $18
  0x0472E6 $92D6: C-----  10 20    BPL  $92F8
  0x0472E8 $92D8: C-----  00       BRK  
  0x0472E9 $92D9: C-----  01 03    ORA  ($03,X)
  0x0472EB $92DB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0472EC $92DC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0472ED $92DD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0472EE $92DE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0472EF $92DF: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0472F0 $92E0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0472F1 $92E1: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0472F2 $92E2: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0472F3 $92E3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0472F4 $92E4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0472F5 $92E5: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0472F6 $92E6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0472F7 $92E7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0472F8 $92E8: C-----  00       BRK  
  0x0472F9 $92E9: C-----  01 01    ORA  ($01,X)
  0x0472FB $92EB: C-----  00       BRK  
  0x0472FC $92EC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0472FD $92ED: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0472FE $92EE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0472FF $92EF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047300 $92F0: C-----  40       RTI  
  0x047301 $92F1: C-----  A0 40    LDY  #$40
  0x047303 $92F3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047304 $92F4: C-----  40       RTI  
  0x047305 $92F5: C-----  20 90 C8 JSR  $C890
  0x047308 $92F8: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x047309 $92F9: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04730A $92FA: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04730B $92FB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04730C $92FC: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04730D $92FD: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04730E $92FE: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04730F $92FF: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x047310 $9300: C-----  A0 20    LDY  #$20
  0x047312 $9302: C-----  20 20 20 JSR  $2020
  0x047315 $9305: C-----  20 20 20 JSR  $2020
  0x047318 $9308: C-----  40       RTI  
  0x047319 $9309: C-----  C0 C0    CPY  #$C0
  0x04731B $930B: C-----  C0 C0    CPY  #$C0
  0x04731D $930D: C-----  C0 C0    CPY  #$C0
  0x04731F $930F: C-----  C0 00    CPY  #$00
  0x047321 $9311: C-----  00       BRK  
  0x047322 $9312: C-----  00       BRK  
  0x047323 $9313: C-----  00       BRK  
  0x047324 $9314: C-----  00       BRK  
  0x047325 $9315: C-----  01 01    ORA  ($01,X)
  0x047327 $9317: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047328 $9318: C-----  00       BRK  
  0x047329 $9319: C-----  00       BRK  
  0x04732A $931A: C-----  00       BRK  
  0x04732B $931B: C-----  00       BRK  
  0x04732C $931C: C-----  00       BRK  
  0x04732D $931D: C-----  00       BRK  
  0x04732E $931E: C-----  00       BRK  
  0x04732F $931F: C-----  01 0F    ORA  ($0F,X)
  0x047331 $9321: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047332 $9322: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x047333 $9323: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x047334 $9324: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047335 $9325: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047336 $9326: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047337 $9327: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047338 $9328: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047339 $9329: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04733A $932A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04733B $932B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04733C $932C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04733D $932D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04733E $932E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04733F $932F: C-----  FE E8 E0 INC  $E0E8,X
  0x047342 $9332: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x047343 $9333: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x047344 $9334: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047345 $9335: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047346 $9336: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x047347 $9337: C-----  BC D7 DF LDY  $DFD7,X
  0x04734A $933A: C-----  E8       INX  
  0x04734B $933B: C-----  E9 E3    SBC  #$E3
  0x04734D $933D: C-----  C0 80    CPY  #$80
  0x04734F $933F: C-----  00       BRK  
  0x047350 $9340: C-----  00       BRK  
  0x047351 $9341: C-----  00       BRK  
  0x047352 $9342: C-----  00       BRK  
  0x047353 $9343: C-----  00       BRK  
  0x047354 $9344: C-----  C0 F0    CPY  #$F0
  0x047356 $9346: C-----  70 38    BVS  $9380
  0x047358 $9348: C-----  00       BRK  
  0x047359 $9349: C-----  00       BRK  
  0x04735A $934A: C-----  00       BRK  
  0x04735B $934B: C-----  00       BRK  
  0x04735C $934C: C-----  00       BRK  
  0x04735D $934D: C-----  00       BRK  
  0x04735E $934E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04735F $934F: C-----  C0 40    CPY  #$40
  0x047361 $9351: C-----  40       RTI  
  0x047362 $9352: C-----  C0 81    CPY  #$81
  0x047364 $9354: C-----  81 81    STA  ($81,X)
  0x047366 $9356: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x047367 $9357: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047368 $9358: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x047369 $9359: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04736A $935A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04736B $935B: C-----  7E 7E 7E ROR  $7E7E,X
  0x04736E $935E: C-----  7D FD 00 ADC  $00FD,X
  0x047371 $9361: C-----  00       BRK  
  0x047372 $9362: C-----  00       BRK  
  0x047373 $9363: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047374 $9364: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047375 $9365: C-----  08       PHP  
  0x047376 $9366: C-----  10 60    BPL  $93C8
  0x047378 $9368: C-----  00       BRK  
  0x047379 $9369: C-----  00       BRK  
  0x04737A $936A: C-----  00       BRK  
  0x04737B $936B: C-----  00       BRK  
  0x04737C $936C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04737D $936D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04737E $936E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04737F $936F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047380 $9370: C-----  00       BRK  
  0x047381 $9371: C-----  7E DF 2F ROR  $2FDF,X
  0x047384 $9374: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x047385 $9375: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x047386 $9376: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x047387 $9377: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x047388 $9378: C-----  00       BRK  
  0x047389 $9379: C-----  00       BRK  
  0x04738A $937A: C-----  2E D7 EB ROL  $EBD7
  0x04738D $937D: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04738E $937E: C-----  F5 F5    SBC  $F5,X
  0x047390 $9380: C-----  01 03    ORA  ($03,X)
  0x047392 $9382: C-----  06 04    ASL  $04
  0x047394 $9384: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x047395 $9385: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x047396 $9386: C-----  01 00    ORA  ($00,X)
  0x047398 $9388: C-----  00       BRK  
  0x047399 $9389: C-----  00       BRK  
  0x04739A $938A: C-----  01 03    ORA  ($03,X)
  0x04739C $938C: C-----  01 01    ORA  ($01,X)
  0x04739E $938E: C-----  00       BRK  
  0x04739F $938F: C-----  00       BRK  
  0x0473A0 $9390: C-----  BE 1F 5F LDX  $5F1F,Y
  0x0473A3 $9393: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0473A4 $9394: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x0473A5 $9395: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x0473A6 $9396: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0473A7 $9397: C-----  0E 40 E0 ASL  $E040
  0x0473AA $939A: C-----  A0 70    LDY  #$70
  0x0473AC $939C: C-----  38       SEC  
  0x0473AD $939D: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0473AE $939E: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0473AF $939F: C-----  00       BRK  
  0x0473B0 $93A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0473B1 $93A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0473B2 $93A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0473B3 $93A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0473B4 $93A4: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x0473B5 $93A5: C-----  71 1C    ADC  ($1C),Y
  0x0473B7 $93A7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0473B8 $93A8: C-----  40       RTI  
  0x0473B9 $93A9: C-----  00       BRK  
  0x0473BA $93AA: C-----  00       BRK  
  0x0473BB $93AB: C-----  00       BRK  
  0x0473BC $93AC: C-----  38       SEC  
  0x0473BD $93AD: C-----  0E 03 00 ASL  $0003
  0x0473C0 $93B0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0473C1 $93B1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0473C2 $93B2: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0473C3 $93B3: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0473C4 $93B4: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0473C5 $93B5: C-----  BE EC 38 LDX  $38EC,Y
  0x0473C8 $93B8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0473C9 $93B9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0473CA $93BA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0473CB $93BB: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0473CC $93BC: C-----  0E 0C 00 ASL  $000C
  0x0473CF $93BF: C-----  00       BRK  
  0x0473D0 $93C0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0473D1 $93C1: C-----  00       BRK  
  0x0473D2 $93C2: C-----  00       BRK  
  0x0473D3 $93C3: C-----  08       PHP  
  0x0473D4 $93C4: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0473D5 $93C5: C-----  C0 00    CPY  #$00
  0x0473D7 $93C7: C-----  00       BRK  
  0x0473D8 $93C8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0473D9 $93C9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0473DA $93CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0473DB $93CB: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0473DC $93CC: C-----  40       RTI  
  0x0473DD $93CD: C-----  00       BRK  
  0x0473DE $93CE: C-----  00       BRK  
  0x0473DF $93CF: C-----  00       BRK  
  0x0473E0 $93D0: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0473E1 $93D1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0473E2 $93D2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0473E3 $93D3: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x0473E4 $93D4: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0473E5 $93D5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0473E6 $93D6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0473E7 $93D7: C-----  01 F5    ORA  ($F5,X)
  0x0473E9 $93D9: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x0473EA $93DA: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x0473EB $93DB: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x0473EC $93DC: C-----  01 01    ORA  ($01,X)
  0x0473EE $93DE: C-----  00       BRK  
  0x0473EF $93DF: C-----  00       BRK  
  0x0473F0 $93E0: C-----  D1 D0    CMP  ($D0),Y
  0x0473F2 $93E2: C-----  90 90    BCC  $9374
  0x0473F4 $93E4: C-----  30 20    BMI  $9406
  0x0473F6 $93E6: C-----  60       RTS  
  0x0473F7 $93E7: C-----  C0 8E    CPY  #$8E
  0x0473F9 $93E9: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0473FA $93EA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0473FB $93EB: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0473FC $93EC: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0473FD $93ED: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0473FE $93EE: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0473FF $93EF: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x047400 $93F0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047401 $93F1: C-----  40       RTI  
  0x047402 $93F2: C-----  20 20 1E JSR  $1E20
  0x047405 $93F5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047406 $93F6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047407 $93F7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047408 $93F8: C-----  00       BRK  
  0x047409 $93F9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04740A $93FA: C-----  C0 C0    CPY  #$C0
  0x04740C $93FC: C-----  E0 F6    CPX  #$F6
  0x04740E $93FE: C-----  F6 FA    INC  $FA,X
  0x047410 $9400: C-----  00       BRK  
  0x047411 $9401: C-----  00       BRK  
  0x047412 $9402: C-----  00       BRK  
  0x047413 $9403: C-----  00       BRK  
  0x047414 $9404: C-----  00       BRK  
  0x047415 $9405: C-----  00       BRK  
  0x047416 $9406: C-----  00       BRK  
  0x047417 $9407: C-----  00       BRK  
  0x047418 $9408: C-----  00       BRK  
  0x047419 $9409: C-----  00       BRK  
  0x04741A $940A: C-----  00       BRK  
  0x04741B $940B: C-----  00       BRK  
  0x04741C $940C: C-----  00       BRK  
  0x04741D $940D: C-----  00       BRK  
  0x04741E $940E: C-----  00       BRK  
  0x04741F $940F: C-----  00       BRK  
  0x047420 $9410: ------  .byte $FF
  0x047421 $9411: ------  .byte $FF
  0x047422 $9412: ------  .byte $FF
  0x047423 $9413: ------  .byte $FF
  0x047424 $9414: ------  .byte $FF
  0x047425 $9415: ------  .byte $FF
  0x047426 $9416: ------  .byte $FF
  0x047427 $9417: ------  .byte $FF
  0x047428 $9418: ------  .byte $00
  0x047429 $9419: ------  .byte $00
  0x04742A $941A: ------  .byte $00
  0x04742B $941B: ------  .byte $00
  0x04742C $941C: ------  .byte $00
  0x04742D $941D: ------  .byte $00
  0x04742E $941E: ------  .byte $00
  0x04742F $941F: ------  .byte $00
  0x047430 $9420: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x047431 $9421: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047432 $9422: C-----  01 00    ORA  ($00,X)
  0x047434 $9424: C-----  00       BRK  
  0x047435 $9425: C-----  00       BRK  
  0x047436 $9426: C-----  00       BRK  
  0x047437 $9427: C-----  00       BRK  
  0x047438 $9428: C-----  00       BRK  
  0x047439 $9429: C-----  00       BRK  
  0x04743A $942A: C-----  00       BRK  
  0x04743B $942B: C-----  00       BRK  
  0x04743C $942C: C-----  00       BRK  
  0x04743D $942D: C-----  00       BRK  
  0x04743E $942E: C-----  00       BRK  
  0x04743F $942F: C-----  00       BRK  
  0x047440 $9430: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047441 $9431: C-----  08       PHP  
  0x047442 $9432: C-----  88       DEY  
  0x047443 $9433: C-----  D0 B1    BNE  $93E6
  0x047445 $9435: C-----  !!UNDEF $B2  ; unknown opcode, treating as data
  0x047446 $9436: C-----  EC 38 00 CPX  $0038
  0x047449 $9439: C-----  00       BRK  
  0x04744A $943A: C-----  00       BRK  
  0x04744B $943B: C-----  00       BRK  
  0x04744C $943C: C-----  00       BRK  
  0x04744D $943D: C-----  01 03    ORA  ($03,X)
  0x04744F $943F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047450 $9440: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x047451 $9441: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x047452 $9442: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047453 $9443: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x047454 $9444: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x047455 $9445: C-----  01 01    ORA  ($01,X)
  0x047457 $9447: C-----  00       BRK  
  0x047458 $9448: C-----  98       TYA  
  0x047459 $9449: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04745A $944A: C-----  60       RTS  
  0x04745B $944B: C-----  40       RTI  
  0x04745C $944C: C-----  00       BRK  
  0x04745D $944D: C-----  00       BRK  
  0x04745E $944E: C-----  00       BRK  
  0x04745F $944F: C-----  00       BRK  
  0x047460 $9450: C-----  B9 7D FF LDA  $FF7D,Y
  0x047463 $9453: C-----  FE FE FE INC  $FEFE,X
  0x047466 $9456: C-----  FE FF 46 INC  $46FF,X
  0x047469 $9459: C-----  BA       TSX  
  0x04746A $945A: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04746B $945B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04746C $945C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04746D $945D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04746E $945E: C-----  F8       SED  
  0x04746F $945F: C-----  7E 80 40 ROR  $4080,X
  0x047472 $9462: C-----  A0 50    LDY  #$50
  0x047474 $9464: C-----  EA       NOP  
  0x047475 $9465: C-----  94 4B    STY  $4B,X
  0x047477 $9467: C-----  85 00    STA  $00
  0x047479 $9469: C-----  00       BRK  
  0x04747A $946A: C-----  00       BRK  
  0x04747B $946B: C-----  00       BRK  
  0x04747C $946C: C-----  00       BRK  
  0x04747D $946D: C-----  60       RTS  
  0x04747E $946E: C-----  B0 78    BCS  $94E8
  0x047480 $9470: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047481 $9471: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047482 $9472: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047483 $9473: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x047484 $9474: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x047485 $9475: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x047486 $9476: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x047487 $9477: C-----  FD FA FA SBC  $FAFA,X
  0x04748A $947A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04748B $947B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04748C $947C: C-----  84 78    STY  $78
  0x04748E $947E: C-----  84 7A    STY  $7A
  0x047490 $9480: C-----  51 50    EOR  ($50),Y
  0x047492 $9482: C-----  90 90    BCC  $9414
  0x047494 $9484: C-----  30 20    BMI  $94A6
  0x047496 $9486: C-----  60       RTS  
  0x047497 $9487: C-----  C0 20    CPY  #$20
  0x047499 $9489: C-----  20 60 60 JSR  $6060
  0x04749C $948C: C-----  C0 C0    CPY  #$C0
  0x04749E $948E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04749F $948F: C-----  00       BRK  
  0x0474A0 $9490: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0474A1 $9491: C-----  40       RTI  
  0x0474A2 $9492: C-----  A0 50    LDY  #$50
  0x0474A4 $9494: C-----  EA       NOP  
  0x0474A5 $9495: C-----  94 4B    STY  $4B,X
  0x0474A7 $9497: C-----  85 7F    STA  $7F
  0x0474A9 $9499: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0474AA $949A: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0474AB $949B: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0474AC $949C: C-----  15 0B    ORA  $0B,X
  0x0474AE $949E: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0474AF $949F: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0474B0 $94A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0474B1 $94A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0474B2 $94A2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0474B3 $94A3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0474B4 $94A4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0474B5 $94A5: C-----  01 00    ORA  ($00,X)
  0x0474B7 $94A7: C-----  00       BRK  
  0x0474B8 $94A8: C-----  7E 7D 3D ROR  $3D7D,X
  0x0474BB $94AB: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0474BC $94AC: C-----  01 00    ORA  ($00,X)
  0x0474BE $94AE: C-----  00       BRK  
  0x0474BF $94AF: C-----  00       BRK  
  0x0474C0 $94B0: C-----  F0 F8    BEQ  $94AA
  0x0474C2 $94B2: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0474C3 $94B3: C-----  FE FE FC INC  $FCFE,X
  0x0474C6 $94B6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0474C7 $94B7: C-----  78       SEI  
  0x0474C8 $94B8: C-----  00       BRK  
  0x0474C9 $94B9: C-----  F0 C0    BEQ  $947B
  0x0474CB $94BB: C-----  BC FC F8 LDY  $F8FC,X
  0x0474CE $94BE: C-----  78       SEI  
  0x0474CF $94BF: C-----  00       BRK  
  0x0474D0 $94C0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0474D1 $94C1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0474D2 $94C2: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0474D3 $94C3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0474D4 $94C4: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x0474D5 $94C5: C-----  86 22    STX  $22
  0x0474D7 $94C7: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0474D8 $94C8: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x0474D9 $94C9: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x0474DA $94CA: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0474DB $94CB: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0474DC $94CC: C-----  84 78    STY  $78
  0x0474DE $94CE: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x0474DF $94CF: C-----  BC FF FE LDY  $FEFF,X
  0x0474E2 $94D2: C-----  FE FE FE INC  $FEFE,X
  0x0474E5 $94D5: C-----  FE FE FF INC  $FFFE,X
  0x0474E8 $94D8: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0474E9 $94D9: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0474EA $94DA: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0474EB $94DB: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0474EC $94DC: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0474ED $94DD: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0474EE $94DE: C-----  F8       SED  
  0x0474EF $94DF: C-----  7E 80 40 ROR  $4080,X
  0x0474F2 $94E2: C-----  A0 50    LDY  #$50
  0x0474F4 $94E4: C-----  EA       NOP  
  0x0474F5 $94E5: C-----  94 4B    STY  $4B,X
  0x0474F7 $94E7: C-----  85 7F    STA  $7F
  0x0474F9 $94E9: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0474FA $94EA: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0474FB $94EB: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0474FC $94EC: C-----  15 0B    ORA  $0B,X
  0x0474FE $94EE: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0474FF $94EF: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x047500 $94F0: C-----  01 07    ORA  ($07,X)
  0x047502 $94F2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047503 $94F3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047504 $94F4: C-----  11 3E    ORA  ($3E),Y
  0x047506 $94F6: C-----  21 40    AND  ($40,X)
  0x047508 $94F8: C-----  00       BRK  
  0x047509 $94F9: C-----  01 07    ORA  ($07,X)
  0x04750B $94FB: C-----  01 0E    ORA  ($0E,X)
  0x04750D $94FD: C-----  01 1E    ORA  ($1E,X)
  0x04750F $94FF: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x047510 $9500: C-----  00       BRK  
  0x047511 $9501: C-----  00       BRK  
  0x047512 $9502: C-----  00       BRK  
  0x047513 $9503: C-----  00       BRK  
  0x047514 $9504: C-----  00       BRK  
  0x047515 $9505: C-----  01 07    ORA  ($07,X)
  0x047517 $9507: C-----  18       CLC  
  0x047518 $9508: C-----  00       BRK  
  0x047519 $9509: C-----  00       BRK  
  0x04751A $950A: C-----  00       BRK  
  0x04751B $950B: C-----  00       BRK  
  0x04751C $950C: C-----  00       BRK  
  0x04751D $950D: C-----  00       BRK  
  0x04751E $950E: C-----  00       BRK  
  0x04751F $950F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047520 $9510: C-----  00       BRK  
  0x047521 $9511: C-----  00       BRK  
  0x047522 $9512: C-----  00       BRK  
  0x047523 $9513: C-----  00       BRK  
  0x047524 $9514: C-----  00       BRK  
  0x047525 $9515: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047526 $9516: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047527 $9517: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047528 $9518: C-----  00       BRK  
  0x047529 $9519: C-----  00       BRK  
  0x04752A $951A: C-----  00       BRK  
  0x04752B $951B: C-----  00       BRK  
  0x04752C $951C: C-----  00       BRK  
  0x04752D $951D: C-----  00       BRK  
  0x04752E $951E: C-----  00       BRK  
  0x04752F $951F: C-----  F0 23    BEQ  $9544
  0x047531 $9521: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x047532 $9522: C-----  BC 38 18 LDY  $1838,X
  0x047535 $9525: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x047536 $9526: C-----  10 00    BPL  $9528
  0x047538 $9528: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x047539 $9529: C-----  30 48    BMI  $9573
  0x04753B $952B: C-----  F8       SED  
  0x04753C $952C: C-----  F8       SED  
  0x04753D $952D: C-----  F0 F0    BEQ  $951F
  0x04753F $952F: C-----  E0 C3    CPX  #$C3
  0x047541 $9531: C-----  E9 FC    SBC  #$FC
  0x047543 $9533: C-----  40       RTI  
  0x047544 $9534: C-----  40       RTI  
  0x047545 $9535: C-----  00       BRK  
  0x047546 $9536: C-----  00       BRK  
  0x047547 $9537: C-----  00       BRK  
  0x047548 $9538: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047549 $9539: C-----  D6 6B    DEC  $6B,X
  0x04754B $953B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04754C $953C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04754D $953D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04754E $953E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04754F $953F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x047550 $9540: C-----  00       BRK  
  0x047551 $9541: C-----  00       BRK  
  0x047552 $9542: C-----  00       BRK  
  0x047553 $9543: C-----  00       BRK  
  0x047554 $9544: C-----  00       BRK  
  0x047555 $9545: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047556 $9546: C-----  F0 FC    BEQ  $9544
  0x047558 $9548: C-----  00       BRK  
  0x047559 $9549: C-----  00       BRK  
  0x04755A $954A: C-----  00       BRK  
  0x04755B $954B: C-----  00       BRK  
  0x04755C $954C: C-----  00       BRK  
  0x04755D $954D: C-----  00       BRK  
  0x04755E $954E: C-----  00       BRK  
  0x04755F $954F: C-----  00       BRK  
  0x047560 $9550: C-----  00       BRK  
  0x047561 $9551: C-----  00       BRK  
  0x047562 $9552: C-----  00       BRK  
  0x047563 $9553: C-----  01 01    ORA  ($01,X)
  0x047565 $9555: C-----  0D 0B 08 ORA  $080B
  0x047568 $9558: C-----  00       BRK  
  0x047569 $9559: C-----  00       BRK  
  0x04756A $955A: C-----  00       BRK  
  0x04756B $955B: C-----  00       BRK  
  0x04756C $955C: C-----  00       BRK  
  0x04756D $955D: C-----  00       BRK  
  0x04756E $955E: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04756F $955F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047570 $9560: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047571 $9561: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047572 $9562: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x047573 $9563: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x047574 $9564: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047575 $9565: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047576 $9566: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x047577 $9567: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x047578 $9568: C-----  00       BRK  
  0x047579 $9569: C-----  00       BRK  
  0x04757A $956A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04757B $956B: C-----  C0 E0    CPY  #$E0
  0x04757D $956D: C-----  E0 C0    CPX  #$C0
  0x04757F $956F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047580 $9570: C-----  00       BRK  
  0x047581 $9571: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047582 $9572: C-----  C0 E0    CPY  #$E0
  0x047584 $9574: C-----  F0 F8    BEQ  $956E
  0x047586 $9576: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047587 $9577: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047588 $9578: C-----  00       BRK  
  0x047589 $9579: C-----  00       BRK  
  0x04758A $957A: C-----  00       BRK  
  0x04758B $957B: C-----  00       BRK  
  0x04758C $957C: C-----  00       BRK  
  0x04758D $957D: C-----  00       BRK  
  0x04758E $957E: C-----  00       BRK  
  0x04758F $957F: C-----  00       BRK  
  0x047590 $9580: C-----  1D 26 28 ORA  $2826,X
  0x047593 $9583: C-----  71 A5    ADC  ($A5),Y
  0x047595 $9585: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x047596 $9586: C-----  CD 8A 06 CMP  $068A
  0x047599 $9589: C-----  19 17 0F ORA  $0F17,Y
  0x04759C $958C: C-----  5E 3F 3E LSR  $3E3F,X
  0x04759F $958F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0475A0 $9590: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0475A1 $9591: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0475A2 $9592: C-----  55 BA    EOR  $BA,X
  0x0475A4 $9594: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0475A5 $9595: C-----  A0 00    LDY  #$00
  0x0475A7 $9597: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0475A8 $9598: C-----  60       RTS  
  0x0475A9 $9599: C-----  F5 EA    SBC  $EA,X
  0x0475AB $959B: C-----  55 BF    EOR  $BF,X
  0x0475AD $959D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0475AE $959E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0475AF $959F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0475B0 $95A0: C-----  FE FE FF INC  $FFFE,X
  0x0475B3 $95A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0475B4 $95A4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0475B5 $95A5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0475B6 $95A6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0475B7 $95A7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0475B8 $95A8: C-----  00       BRK  
  0x0475B9 $95A9: C-----  00       BRK  
  0x0475BA $95AA: C-----  00       BRK  
  0x0475BB $95AB: C-----  00       BRK  
  0x0475BC $95AC: C-----  00       BRK  
  0x0475BD $95AD: C-----  00       BRK  
  0x0475BE $95AE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0475BF $95AF: C-----  C0 00    CPY  #$00
  0x0475C1 $95B1: C-----  00       BRK  
  0x0475C2 $95B2: C-----  00       BRK  
  0x0475C3 $95B3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0475C4 $95B4: C-----  1E 3C 3C ASL  $3C3C,X
  0x0475C7 $95B7: C-----  3E 00 00 ROL  $0000,X
  0x0475CA $95BA: C-----  00       BRK  
  0x0475CB $95BB: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0475CC $95BC: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0475CD $95BD: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0475CE $95BE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0475CF $95BF: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0475D0 $95C0: C-----  40       RTI  
  0x0475D1 $95C1: C-----  B0 D0    BCS  $9593
  0x0475D3 $95C3: C-----  A8       TAY  
  0x0475D4 $95C4: C-----  50 04    BVC  $95CA
  0x0475D6 $95C6: C-----  00       BRK  
  0x0475D7 $95C7: C-----  00       BRK  
  0x0475D8 $95C8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0475D9 $95C9: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x0475DA $95CA: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0475DB $95CB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0475DC $95CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0475DD $95CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0475DE $95CE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0475DF $95CF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0475E0 $95D0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0475E1 $95D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0475E2 $95D2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0475E3 $95D3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0475E4 $95D4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0475E5 $95D5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0475E6 $95D6: C-----  78       SEI  
  0x0475E7 $95D7: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x0475E8 $95D8: C-----  00       BRK  
  0x0475E9 $95D9: C-----  00       BRK  
  0x0475EA $95DA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0475EB $95DB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0475EC $95DC: C-----  C0 C0    CPY  #$C0
  0x0475EE $95DE: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0475EF $95DF: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0475F0 $95E0: C-----  94 88    STY  $88,X
  0x0475F2 $95E2: C-----  94 88    STY  $88,X
  0x0475F4 $95E4: C-----  84 46    STY  $46
  0x0475F6 $95E6: C-----  40       RTI  
  0x0475F7 $95E7: C-----  20 7F 7F JSR  $7F7F
  0x0475FA $95EA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0475FB $95EB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0475FC $95EC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0475FD $95ED: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0475FE $95EE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0475FF $95EF: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047600 $95F0: C-----  01 00    ORA  ($00,X)
  0x047602 $95F2: C-----  00       BRK  
  0x047603 $95F3: C-----  00       BRK  
  0x047604 $95F4: C-----  00       BRK  
  0x047605 $95F5: C-----  00       BRK  
  0x047606 $95F6: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x047607 $95F7: C-----  01 FE    ORA  ($FE,X)
  0x047609 $95F9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04760A $95FA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04760B $95FB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04760C $95FC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04760D $95FD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04760E $95FE: C-----  FD FE F8 SBC  $F8FE,X
  0x047611 $9601: C-----  F6 FF    INC  $FF,X
  0x047613 $9603: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047614 $9604: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047615 $9605: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047616 $9606: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x047617 $9607: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x047618 $9608: C-----  70 60    BVS  $966A
  0x04761A $960A: C-----  66 ED    ROR  $ED
  0x04761C $960C: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04761D $960D: C-----  CE D7 B0 DEC  $B0D7
  0x047620 $9610: C-----  00       BRK  
  0x047621 $9611: C-----  00       BRK  
  0x047622 $9612: C-----  00       BRK  
  0x047623 $9613: C-----  C0 E0    CPY  #$E0
  0x047625 $9615: C-----  C0 80    CPY  #$80
  0x047627 $9617: C-----  00       BRK  
  0x047628 $9618: C-----  00       BRK  
  0x047629 $9619: C-----  00       BRK  
  0x04762A $961A: C-----  00       BRK  
  0x04762B $961B: C-----  00       BRK  
  0x04762C $961C: C-----  C0 00    CPY  #$00
  0x04762E $961E: C-----  00       BRK  
  0x04762F $961F: C-----  00       BRK  
  0x047630 $9620: C-----  00       BRK  
  0x047631 $9621: C-----  00       BRK  
  0x047632 $9622: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047633 $9623: C-----  C0 E0    CPY  #$E0
  0x047635 $9625: C-----  F0 F8    BEQ  $961F
  0x047637 $9627: C-----  F8       SED  
  0x047638 $9628: C-----  00       BRK  
  0x047639 $9629: C-----  00       BRK  
  0x04763A $962A: C-----  00       BRK  
  0x04763B $962B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04763C $962C: C-----  C0 E0    CPY  #$E0
  0x04763E $962E: C-----  F0 F0    BEQ  $9620
  0x047640 $9630: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x047641 $9631: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047642 $9632: C-----  01 01    ORA  ($01,X)
  0x047644 $9634: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x047645 $9635: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x047646 $9636: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047647 $9637: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x047648 $9638: C-----  00       BRK  
  0x047649 $9639: C-----  00       BRK  
  0x04764A $963A: C-----  00       BRK  
  0x04764B $963B: C-----  00       BRK  
  0x04764C $963C: C-----  01 01    ORA  ($01,X)
  0x04764E $963E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04764F $963F: C-----  01 67    ORA  ($67,X)
  0x047651 $9641: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x047652 $9642: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047653 $9643: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x047654 $9644: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x047655 $9645: C-----  01 01    ORA  ($01,X)
  0x047657 $9647: C-----  00       BRK  
  0x047658 $9648: C-----  98       TYA  
  0x047659 $9649: C-----  3D 61 41 AND  $4161,X
  0x04765C $964C: C-----  00       BRK  
  0x04765D $964D: C-----  00       BRK  
  0x04765E $964E: C-----  00       BRK  
  0x04765F $964F: C-----  00       BRK  
  0x047660 $9650: C-----  C0 E0    CPY  #$E0
  0x047662 $9652: C-----  F0 F0    BEQ  $9644
  0x047664 $9654: C-----  F8       SED  
  0x047665 $9655: C-----  F8       SED  
  0x047666 $9656: C-----  78       SEI  
  0x047667 $9657: C-----  F8       SED  
  0x047668 $9658: C-----  00       BRK  
  0x047669 $9659: C-----  C0 E0    CPY  #$E0
  0x04766B $965B: C-----  E0 F0    CPX  #$F0
  0x04766D $965D: C-----  70 B0    BVS  $960F
  0x04766F $965F: C-----  30 80    BMI  $95E1
  0x047671 $9661: C-----  40       RTI  
  0x047672 $9662: C-----  A0 D0    LDY  #$D0
  0x047674 $9664: C-----  2A       ROL  A
  0x047675 $9665: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x047676 $9666: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x047677 $9667: C-----  05 7F    ORA  $7F
  0x047679 $9669: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04767A $966A: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04767B $966B: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04767C $966C: C-----  15 0B    ORA  $0B,X
  0x04767E $966E: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04767F $966F: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x047680 $9670: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047681 $9671: C-----  01 00    ORA  ($00,X)
  0x047683 $9673: C-----  00       BRK  
  0x047684 $9674: C-----  00       BRK  
  0x047685 $9675: C-----  00       BRK  
  0x047686 $9676: C-----  00       BRK  
  0x047687 $9677: C-----  00       BRK  
  0x047688 $9678: C-----  01 00    ORA  ($00,X)
  0x04768A $967A: C-----  00       BRK  
  0x04768B $967B: C-----  00       BRK  
  0x04768C $967C: C-----  00       BRK  
  0x04768D $967D: C-----  00       BRK  
  0x04768E $967E: C-----  00       BRK  
  0x04768F $967F: C-----  00       BRK  
  0x047690 $9680: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047691 $9681: C-----  FE FF FE INC  $FEFF,X
  0x047694 $9684: C-----  FE FE FE INC  $FEFE,X
  0x047697 $9687: C-----  FD F8 F8 SBC  $F8F8,X
  0x04769A $968A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04769B $968B: C-----  FD FD FD SBC  $FDFD,X
  0x04769E $968E: C-----  F9 F2 05 SBC  $05F2,Y
  0x0476A1 $9691: C-----  09 02    ORA  #$02
  0x0476A3 $9693: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0476A4 $9694: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0476A5 $9695: C-----  00       BRK  
  0x0476A6 $9696: C-----  00       BRK  
  0x0476A7 $9697: C-----  00       BRK  
  0x0476A8 $9698: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0476A9 $9699: C-----  00       BRK  
  0x0476AA $969A: C-----  01 03    ORA  ($03,X)
  0x0476AC $969C: C-----  00       BRK  
  0x0476AD $969D: C-----  00       BRK  
  0x0476AE $969E: C-----  00       BRK  
  0x0476AF $969F: C-----  00       BRK  
  0x0476B0 $96A0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0476B1 $96A1: C-----  40       RTI  
  0x0476B2 $96A2: C-----  A0 D0    LDY  #$D0
  0x0476B4 $96A4: C-----  6A       ROR  A
  0x0476B5 $96A5: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x0476B6 $96A6: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x0476B7 $96A7: C-----  25 00    AND  $00
  0x0476B9 $96A9: C-----  00       BRK  
  0x0476BA $96AA: C-----  00       BRK  
  0x0476BB $96AB: C-----  00       BRK  
  0x0476BC $96AC: C-----  00       BRK  
  0x0476BD $96AD: C-----  20 30 18 JSR  $1830
  0x0476C0 $96B0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0476C1 $96B1: C-----  40       RTI  
  0x0476C2 $96B2: C-----  A0 D0    LDY  #$D0
  0x0476C4 $96B4: C-----  6A       ROR  A
  0x0476C5 $96B5: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x0476C6 $96B6: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x0476C7 $96B7: C-----  25 7F    AND  $7F
  0x0476C9 $96B9: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0476CA $96BA: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0476CB $96BB: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0476CC $96BC: C-----  15 0B    ORA  $0B,X
  0x0476CE $96BE: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0476CF $96BF: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0476D0 $96C0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0476D1 $96C1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0476D2 $96C2: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x0476D3 $96C3: C-----  !!UNDEF $93  ; unknown opcode, treating as data
  0x0476D4 $96C4: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x0476D5 $96C5: C-----  01 01    ORA  ($01,X)
  0x0476D7 $96C7: C-----  00       BRK  
  0x0476D8 $96C8: C-----  F8       SED  
  0x0476D9 $96C9: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0476DA $96CA: C-----  B4 6C    LDY  $6C,X
  0x0476DC $96CC: C-----  00       BRK  
  0x0476DD $96CD: C-----  00       BRK  
  0x0476DE $96CE: C-----  00       BRK  
  0x0476DF $96CF: C-----  00       BRK  
  0x0476E0 $96D0: C-----  00       BRK  
  0x0476E1 $96D1: C-----  00       BRK  
  0x0476E2 $96D2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0476E3 $96D3: C-----  40       RTI  
  0x0476E4 $96D4: C-----  BC 4F DF LDY  $DF4F,X
  0x0476E7 $96D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0476E8 $96D8: C-----  00       BRK  
  0x0476E9 $96D9: C-----  00       BRK  
  0x0476EA $96DA: C-----  00       BRK  
  0x0476EB $96DB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0476EC $96DC: C-----  40       RTI  
  0x0476ED $96DD: C-----  BC 3F CF LDY  $CF3F,X
  0x0476F0 $96E0: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0476F1 $96E1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0476F2 $96E2: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0476F3 $96E3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0476F4 $96E4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0476F5 $96E5: C-----  01 01    ORA  ($01,X)
  0x0476F7 $96E7: C-----  00       BRK  
  0x0476F8 $96E8: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0476F9 $96E9: C-----  00       BRK  
  0x0476FA $96EA: C-----  00       BRK  
  0x0476FB $96EB: C-----  00       BRK  
  0x0476FC $96EC: C-----  00       BRK  
  0x0476FD $96ED: C-----  00       BRK  
  0x0476FE $96EE: C-----  00       BRK  
  0x0476FF $96EF: C-----  00       BRK  
  0x047700 $96F0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047701 $96F1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047702 $96F2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047703 $96F3: C-----  F0 E0    BEQ  $96D5
  0x047705 $96F5: C-----  C0 C0    CPY  #$C0
  0x047707 $96F7: C-----  C0 77    CPY  #$77
  0x047709 $96F9: C-----  98       TYA  
  0x04770A $96FA: C-----  E0 40    CPX  #$40
  0x04770C $96FC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04770D $96FD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04770E $96FE: C-----  00       BRK  
  0x04770F $96FF: C-----  00       BRK  
  0x047710 $9700: C-----  00       BRK  
  0x047711 $9701: C-----  00       BRK  
  0x047712 $9702: C-----  00       BRK  
  0x047713 $9703: C-----  00       BRK  
  0x047714 $9704: C-----  00       BRK  
  0x047715 $9705: C-----  00       BRK  
  0x047716 $9706: C-----  00       BRK  
  0x047717 $9707: C-----  00       BRK  
  0x047718 $9708: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047719 $9709: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04771A $970A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04771B $970B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04771C $970C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04771D $970D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04771E $970E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04771F $970F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047720 $9710: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x047721 $9711: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x047722 $9712: C-----  05 1A    ORA  $1A
  0x047724 $9714: C-----  F0 61    BEQ  $9777
  0x047726 $9716: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047727 $9717: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047728 $9718: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x047729 $9719: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x04772A $971A: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04772B $971B: C-----  E5 7F    SBC  $7F
  0x04772D $971D: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x04772E $971E: C-----  F8       SED  
  0x04772F $971F: C-----  00       BRK  
  0x047730 $9720: C-----  F0 FF    BEQ  $9721
  0x047732 $9722: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047733 $9723: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047734 $9724: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047735 $9725: C-----  01 00    ORA  ($00,X)
  0x047737 $9727: C-----  00       BRK  
  0x047738 $9728: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047739 $9729: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04773A $972A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04773B $972B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04773C $972C: C-----  01 00    ORA  ($00,X)
  0x04773E $972E: C-----  00       BRK  
  0x04773F $972F: C-----  00       BRK  
  0x047740 $9730: C-----  00       BRK  
  0x047741 $9731: C-----  F0 E0    BEQ  $9713
  0x047743 $9733: C-----  C0 C0    CPY  #$C0
  0x047745 $9735: C-----  C0 E0    CPY  #$E0
  0x047747 $9737: C-----  60       RTS  
  0x047748 $9738: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047749 $9739: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04774A $973A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04774B $973B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04774C $973C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04774D $973D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04774E $973E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04774F $973F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x047750 $9740: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047751 $9741: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047752 $9742: C-----  FE FE FC INC  $FCFE,X
  0x047755 $9745: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047756 $9746: C-----  F8       SED  
  0x047757 $9747: C-----  F0 40    BEQ  $9789
  0x047759 $9749: C-----  40       RTI  
  0x04775A $974A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04775B $974B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04775C $974C: C-----  00       BRK  
  0x04775D $974D: C-----  00       BRK  
  0x04775E $974E: C-----  00       BRK  
  0x04775F $974F: C-----  00       BRK  
  0x047760 $9750: C-----  00       BRK  
  0x047761 $9751: C-----  00       BRK  
  0x047762 $9752: C-----  00       BRK  
  0x047763 $9753: C-----  C0 00    CPY  #$00
  0x047765 $9755: C-----  00       BRK  
  0x047766 $9756: C-----  00       BRK  
  0x047767 $9757: C-----  00       BRK  
  0x047768 $9758: C-----  00       BRK  
  0x047769 $9759: C-----  00       BRK  
  0x04776A $975A: C-----  00       BRK  
  0x04776B $975B: C-----  C0 E0    CPY  #$E0
  0x04776D $975D: C-----  F8       SED  
  0x04776E $975E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04776F $975F: C-----  FE 7F 1F INC  $1F7F,X
  0x047772 $9762: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047773 $9763: C-----  05 0B    ORA  $0B
  0x047775 $9765: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x047776 $9766: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x047777 $9767: C-----  7E 00 00 ROR  $0000,X
  0x04777A $976A: C-----  00       BRK  
  0x04777B $976B: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04777C $976C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04777D $976D: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04777E $976E: C-----  10 2F    BPL  $979F
  0x047780 $9770: C-----  E0 FE    CPX  #$FE
  0x047782 $9772: C-----  E1 18    SBC  ($18,X)
  0x047784 $9774: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047785 $9775: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047786 $9776: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047787 $9777: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047788 $9778: C-----  00       BRK  
  0x047789 $9779: C-----  00       BRK  
  0x04778A $977A: C-----  1E E7 3B ASL  $3BE7,X
  0x04778D $977D: C-----  CD 76 9B CMP  $9B76
  0x047790 $9780: C-----  00       BRK  
  0x047791 $9781: C-----  00       BRK  
  0x047792 $9782: C-----  00       BRK  
  0x047793 $9783: C-----  00       BRK  
  0x047794 $9784: C-----  00       BRK  
  0x047795 $9785: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047796 $9786: C-----  E0 F0    CPX  #$F0
  0x047798 $9788: C-----  00       BRK  
  0x047799 $9789: C-----  00       BRK  
  0x04779A $978A: C-----  00       BRK  
  0x04779B $978B: C-----  00       BRK  
  0x04779C $978C: C-----  00       BRK  
  0x04779D $978D: C-----  00       BRK  
  0x04779E $978E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04779F $978F: C-----  E0 20    CPX  #$20
  0x0477A1 $9791: C-----  11 0B    ORA  ($0B),Y
  0x0477A3 $9793: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0477A4 $9794: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0477A5 $9795: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0477A6 $9796: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0477A7 $9797: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0477A8 $9798: C-----  00       BRK  
  0x0477A9 $9799: C-----  00       BRK  
  0x0477AA $979A: C-----  01 03    ORA  ($03,X)
  0x0477AC $979C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0477AD $979D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0477AE $979E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0477AF $979F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0477B0 $97A0: C-----  F8       SED  
  0x0477B1 $97A1: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0477B2 $97A2: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x0477B3 $97A3: C-----  2E 1A 06 ROL  $061A
  0x0477B6 $97A6: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0477B7 $97A7: C-----  01 F0    ORA  ($F0,X)
  0x0477B9 $97A9: C-----  18       CLC  
  0x0477BA $97AA: C-----  28       PLP  
  0x0477BB $97AB: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0477BC $97AC: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0477BD $97AD: C-----  00       BRK  
  0x0477BE $97AE: C-----  00       BRK  
  0x0477BF $97AF: C-----  00       BRK  
  0x0477C0 $97B0: C-----  18       CLC  
  0x0477C1 $97B1: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0477C2 $97B2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0477C3 $97B3: C-----  26 02    ROL  $02
  0x0477C5 $97B5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0477C6 $97B6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0477C7 $97B7: C-----  00       BRK  
  0x0477C8 $97B8: C-----  18       CLC  
  0x0477C9 $97B9: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0477CA $97BA: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0477CB $97BB: C-----  5E 7E FE LSR  $FE7E,X
  0x0477CE $97BE: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0477CF $97BF: C-----  00       BRK  
  0x0477D0 $97C0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0477D1 $97C1: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0477D2 $97C2: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0477D3 $97C3: C-----  DE DE 9F DEC  $9FDE,X
  0x0477D6 $97C6: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0477D7 $97C7: C-----  01 6F    ORA  ($6F,X)
  0x0477D9 $97C9: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0477DA $97CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0477DB $97CB: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0477DC $97CC: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0477DD $97CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0477DE $97CE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0477DF $97CF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0477E0 $97D0: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0477E1 $97D1: C-----  9D 67 C3 STA  $C367,X
  0x0477E4 $97D4: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x0477E5 $97D5: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0477E6 $97D6: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0477E7 $97D7: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0477E8 $97D8: C-----  E8       INX  
  0x0477E9 $97D9: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x0477EA $97DA: C-----  F8       SED  
  0x0477EB $97DB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0477EC $97DC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0477ED $97DD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0477EE $97DE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0477EF $97DF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0477F0 $97E0: C-----  00       BRK  
  0x0477F1 $97E1: C-----  20 1C 18 JSR  $181C
  0x0477F4 $97E4: C-----  10 20    BPL  $9806
  0x0477F6 $97E6: C-----  00       BRK  
  0x0477F7 $97E7: C-----  00       BRK  
  0x0477F8 $97E8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0477F9 $97E9: C-----  E0 FC    CPX  #$FC
  0x0477FB $97EB: C-----  F8       SED  
  0x0477FC $97EC: C-----  F0 E0    BEQ  $97CE
  0x0477FE $97EE: C-----  C0 80    CPY  #$80
  0x047800 $97F0: C-----  11 0E    ORA  ($0E),Y
  0x047802 $97F2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047803 $97F3: C-----  00       BRK  
  0x047804 $97F4: C-----  00       BRK  
  0x047805 $97F5: C-----  00       BRK  
  0x047806 $97F6: C-----  00       BRK  
  0x047807 $97F7: C-----  00       BRK  
  0x047808 $97F8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047809 $97F9: C-----  0E 04 00 ASL  $0004
  0x04780C $97FC: C-----  00       BRK  
  0x04780D $97FD: C-----  00       BRK  
  0x04780E $97FE: C-----  00       BRK  
  0x04780F $97FF: C-----  00       BRK  
  0x047810 $9800: ------  .byte $00
  0x047811 $9801: ------  .byte $00
  0x047812 $9802: ------  .byte $00
  0x047813 $9803: ------  .byte $00
  0x047814 $9804: ------  .byte $00
  0x047815 $9805: ------  .byte $00
  0x047816 $9806: ------  .byte $00
  0x047817 $9807: ------  .byte $00
  0x047818 $9808: ------  .byte $00
  0x047819 $9809: ------  .byte $00
  0x04781A $980A: ------  .byte $00
  0x04781B $980B: ------  .byte $00
  0x04781C $980C: ------  .byte $00
  0x04781D $980D: ------  .byte $00
  0x04781E $980E: ------  .byte $00
  0x04781F $980F: ------  .byte $00
  0x047820 $9810: ------  .byte $FF
  0x047821 $9811: ------  .byte $FF
  0x047822 $9812: ------  .byte $FF
  0x047823 $9813: ------  .byte $FF
  0x047824 $9814: ------  .byte $FF
  0x047825 $9815: ------  .byte $FF
  0x047826 $9816: ------  .byte $FF
  0x047827 $9817: ------  .byte $FF
  0x047828 $9818: ------  .byte $00
  0x047829 $9819: ------  .byte $00
  0x04782A $981A: ------  .byte $00
  0x04782B $981B: ------  .byte $00
  0x04782C $981C: ------  .byte $00
  0x04782D $981D: ------  .byte $00
  0x04782E $981E: ------  .byte $00
  0x04782F $981F: ------  .byte $00
  0x047830 $9820: C-----  00       BRK  
  0x047831 $9821: C-----  00       BRK  
  0x047832 $9822: C-----  00       BRK  
  0x047833 $9823: C-----  00       BRK  
  0x047834 $9824: C-----  00       BRK  
  0x047835 $9825: C-----  00       BRK  
  0x047836 $9826: C-----  00       BRK  
  0x047837 $9827: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047838 $9828: C-----  00       BRK  
  0x047839 $9829: C-----  00       BRK  
  0x04783A $982A: C-----  00       BRK  
  0x04783B $982B: C-----  00       BRK  
  0x04783C $982C: C-----  00       BRK  
  0x04783D $982D: C-----  00       BRK  
  0x04783E $982E: C-----  00       BRK  
  0x04783F $982F: C-----  00       BRK  
  0x047840 $9830: C-----  00       BRK  
  0x047841 $9831: C-----  00       BRK  
  0x047842 $9832: C-----  00       BRK  
  0x047843 $9833: C-----  18       CLC  
  0x047844 $9834: C-----  66 42    ROR  $42
  0x047846 $9836: C-----  7E FF 00 ROR  $00FF,X
  0x047849 $9839: C-----  00       BRK  
  0x04784A $983A: C-----  00       BRK  
  0x04784B $983B: C-----  00       BRK  
  0x04784C $983C: C-----  18       CLC  
  0x04784D $983D: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04784E $983E: C-----  00       BRK  
  0x04784F $983F: C-----  20 7E 3C JSR  $3C7E
  0x047852 $9842: C-----  18       CLC  
  0x047853 $9843: C-----  00       BRK  
  0x047854 $9844: C-----  00       BRK  
  0x047855 $9845: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047856 $9846: C-----  81 C1    STA  ($C1,X)
  0x047858 $9848: C-----  BD DB 25 LDA  $25DB,X
  0x04785B $984B: C-----  24 00    BIT  $00
  0x04785D $984D: C-----  00       BRK  
  0x04785E $984E: C-----  00       BRK  
  0x04785F $984F: C-----  00       BRK  
  0x047860 $9850: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x047861 $9851: C-----  BD 00 18 LDA  $1800,X
  0x047864 $9854: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x047865 $9855: C-----  24 46    BIT  $46
  0x047867 $9857: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x047868 $9858: C-----  00       BRK  
  0x047869 $9859: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04786A $985A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04786B $985B: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04786C $985C: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04786D $985D: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04786E $985E: C-----  81 81    STA  ($81,X)
  0x047870 $9860: C-----  00       BRK  
  0x047871 $9861: C-----  00       BRK  
  0x047872 $9862: C-----  00       BRK  
  0x047873 $9863: C-----  00       BRK  
  0x047874 $9864: C-----  00       BRK  
  0x047875 $9865: C-----  00       BRK  
  0x047876 $9866: C-----  00       BRK  
  0x047877 $9867: C-----  C0 00    CPY  #$00
  0x047879 $9869: C-----  00       BRK  
  0x04787A $986A: C-----  00       BRK  
  0x04787B $986B: C-----  00       BRK  
  0x04787C $986C: C-----  00       BRK  
  0x04787D $986D: C-----  00       BRK  
  0x04787E $986E: C-----  00       BRK  
  0x04787F $986F: C-----  00       BRK  
  0x047880 $9870: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x047881 $9871: C-----  3D 98 80 AND  $8098,X
  0x047884 $9874: C-----  C1 41    CMP  ($41,X)
  0x047886 $9876: C-----  41 63    EOR  ($63,X)
  0x047888 $9878: C-----  38       SEC  
  0x047889 $9879: C-----  18       CLC  
  0x04788A $987A: C-----  66 7E    ROR  $7E
  0x04788C $987C: C-----  3E 3E 3E ROL  $3E3E,X
  0x04788F $987F: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x047890 $9880: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x047891 $9881: C-----  08       PHP  
  0x047892 $9882: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x047893 $9883: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x047894 $9884: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x047895 $9885: C-----  0E 00 00 ASL  $0000
  0x047898 $9888: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047899 $9889: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04789A $988A: C-----  0E 0E 0C ASL  $0C0E
  0x04789D $988D: C-----  00       BRK  
  0x04789E $988E: C-----  00       BRK  
  0x04789F $988F: C-----  00       BRK  
  0x0478A0 $9890: C-----  7E 3C 18 ROR  $183C,X
  0x0478A3 $9893: C-----  00       BRK  
  0x0478A4 $9894: C-----  00       BRK  
  0x0478A5 $9895: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0478A6 $9896: C-----  81 C1    STA  ($C1,X)
  0x0478A8 $9898: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0478A9 $9899: C-----  18       CLC  
  0x0478AA $989A: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x0478AB $989B: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x0478AC $989C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0478AD $989D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0478AE $989E: C-----  7E 3E 00 ROR  $003E,X
  0x0478B1 $98A1: C-----  00       BRK  
  0x0478B2 $98A2: C-----  01 01    ORA  ($01,X)
  0x0478B4 $98A4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0478B5 $98A5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0478B6 $98A6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0478B7 $98A7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0478B8 $98A8: C-----  00       BRK  
  0x0478B9 $98A9: C-----  00       BRK  
  0x0478BA $98AA: C-----  00       BRK  
  0x0478BB $98AB: C-----  00       BRK  
  0x0478BC $98AC: C-----  01 01    ORA  ($01,X)
  0x0478BE $98AE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0478BF $98AF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0478C0 $98B0: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x0478C1 $98B1: C-----  BD 00 18 LDA  $1800,X
  0x0478C4 $98B4: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0478C5 $98B5: C-----  24 46    BIT  $46
  0x0478C7 $98B7: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0478C8 $98B8: C-----  18       CLC  
  0x0478C9 $98B9: C-----  00       BRK  
  0x0478CA $98BA: C-----  00       BRK  
  0x0478CB $98BB: C-----  00       BRK  
  0x0478CC $98BC: C-----  00       BRK  
  0x0478CD $98BD: C-----  00       BRK  
  0x0478CE $98BE: C-----  00       BRK  
  0x0478CF $98BF: C-----  00       BRK  
  0x0478D0 $98C0: C-----  30 38    BMI  $98FA
  0x0478D2 $98C2: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0478D3 $98C3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0478D4 $98C4: C-----  E4 98    CPX  $98
  0x0478D6 $98C6: C-----  00       BRK  
  0x0478D7 $98C7: C-----  00       BRK  
  0x0478D8 $98C8: C-----  E0 F0    CPX  #$F0
  0x0478DA $98CA: C-----  F8       SED  
  0x0478DB $98CB: C-----  F8       SED  
  0x0478DC $98CC: C-----  18       CLC  
  0x0478DD $98CD: C-----  00       BRK  
  0x0478DE $98CE: C-----  00       BRK  
  0x0478DF $98CF: C-----  00       BRK  
  0x0478E0 $98D0: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x0478E1 $98D1: C-----  9D 00 18 STA  $1800,X
  0x0478E4 $98D4: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0478E5 $98D5: C-----  24 42    BIT  $42
  0x0478E7 $98D7: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x0478E8 $98D8: C-----  40       RTI  
  0x0478E9 $98D9: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x0478EA $98DA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0478EB $98DB: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x0478EC $98DC: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x0478ED $98DD: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0478EE $98DE: C-----  81 80    STA  ($80,X)
  0x0478F0 $98E0: C-----  00       BRK  
  0x0478F1 $98E1: C-----  00       BRK  
  0x0478F2 $98E2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0478F3 $98E3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0478F4 $98E4: C-----  C0 40    CPY  #$40
  0x0478F6 $98E6: C-----  60       RTS  
  0x0478F7 $98E7: C-----  20 00 00 JSR  $0000
  0x0478FA $98EA: C-----  00       BRK  
  0x0478FB $98EB: C-----  00       BRK  
  0x0478FC $98EC: C-----  00       BRK  
  0x0478FD $98ED: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0478FE $98EE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0478FF $98EF: C-----  C0 00    CPY  #$00
  0x047901 $98F1: C-----  00       BRK  
  0x047902 $98F2: C-----  00       BRK  
  0x047903 $98F3: C-----  00       BRK  
  0x047904 $98F4: C-----  00       BRK  
  0x047905 $98F5: C-----  00       BRK  
  0x047906 $98F6: C-----  00       BRK  
  0x047907 $98F7: C-----  A0 00    LDY  #$00
  0x047909 $98F9: C-----  00       BRK  
  0x04790A $98FA: C-----  00       BRK  
  0x04790B $98FB: C-----  00       BRK  
  0x04790C $98FC: C-----  00       BRK  
  0x04790D $98FD: C-----  00       BRK  
  0x04790E $98FE: C-----  00       BRK  
  0x04790F $98FF: C-----  00       BRK  
  0x047910 $9900: C-----  00       BRK  
  0x047911 $9901: C-----  00       BRK  
  0x047912 $9902: C-----  00       BRK  
  0x047913 $9903: C-----  00       BRK  
  0x047914 $9904: C-----  00       BRK  
  0x047915 $9905: C-----  00       BRK  
  0x047916 $9906: C-----  01 06    ORA  ($06,X)
  0x047918 $9908: C-----  00       BRK  
  0x047919 $9909: C-----  00       BRK  
  0x04791A $990A: C-----  00       BRK  
  0x04791B $990B: C-----  00       BRK  
  0x04791C $990C: C-----  00       BRK  
  0x04791D $990D: C-----  00       BRK  
  0x04791E $990E: C-----  00       BRK  
  0x04791F $990F: C-----  01 00    ORA  ($00,X)
  0x047921 $9911: C-----  00       BRK  
  0x047922 $9912: C-----  00       BRK  
  0x047923 $9913: C-----  00       BRK  
  0x047924 $9914: C-----  06 7F    ASL  $7F
  0x047926 $9916: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x047927 $9917: C-----  0E 00 00 ASL  $0000
  0x04792A $991A: C-----  00       BRK  
  0x04792B $991B: C-----  00       BRK  
  0x04792C $991C: C-----  00       BRK  
  0x04792D $991D: C-----  06 76    ASL  $76
  0x04792F $991F: C-----  F0 00    BEQ  $9921
  0x047931 $9921: C-----  00       BRK  
  0x047932 $9922: C-----  00       BRK  
  0x047933 $9923: C-----  00       BRK  
  0x047934 $9924: C-----  00       BRK  
  0x047935 $9925: C-----  00       BRK  
  0x047936 $9926: C-----  00       BRK  
  0x047937 $9927: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047938 $9928: C-----  00       BRK  
  0x047939 $9929: C-----  00       BRK  
  0x04793A $992A: C-----  00       BRK  
  0x04793B $992B: C-----  00       BRK  
  0x04793C $992C: C-----  00       BRK  
  0x04793D $992D: C-----  00       BRK  
  0x04793E $992E: C-----  00       BRK  
  0x04793F $992F: C-----  00       BRK  
  0x047940 $9930: C-----  08       PHP  
  0x047941 $9931: C-----  08       PHP  
  0x047942 $9932: C-----  11 11    ORA  ($11),Y
  0x047944 $9934: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x047945 $9935: C-----  6D C0 80 ADC  $80C0
  0x047948 $9938: C-----  00       BRK  
  0x047949 $9939: C-----  00       BRK  
  0x04794A $993A: C-----  00       BRK  
  0x04794B $993B: C-----  00       BRK  
  0x04794C $993C: C-----  00       BRK  
  0x04794D $993D: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x04794E $993E: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04794F $993F: C-----  7D 08 08 ADC  $0808,X
  0x047952 $9942: C-----  11 11    ORA  ($11),Y
  0x047954 $9944: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x047955 $9945: C-----  6D C0 80 ADC  $80C0
  0x047958 $9948: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047959 $9949: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04795A $994A: C-----  0E 0E 0C ASL  $0C0E
  0x04795D $994D: C-----  00       BRK  
  0x04795E $994E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04795F $994F: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x047960 $9950: C-----  78       SEI  
  0x047961 $9951: C-----  C8       INY  
  0x047962 $9952: C-----  88       DEY  
  0x047963 $9953: C-----  FE F8 F9 INC  $F9F8,X
  0x047966 $9956: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x047967 $9957: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x047968 $9958: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047969 $9959: C-----  00       BRK  
  0x04796A $995A: C-----  00       BRK  
  0x04796B $995B: C-----  00       BRK  
  0x04796C $995C: C-----  C0 F0    CPY  #$F0
  0x04796E $995E: C-----  61 83    ADC  ($83,X)
  0x047970 $9960: C-----  78       SEI  
  0x047971 $9961: C-----  C8       INY  
  0x047972 $9962: C-----  88       DEY  
  0x047973 $9963: C-----  FE F8 F9 INC  $F9F8,X
  0x047976 $9966: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x047977 $9967: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x047978 $9968: C-----  00       BRK  
  0x047979 $9969: C-----  30 70    BMI  $99DB
  0x04797B $996B: C-----  00       BRK  
  0x04797C $996C: C-----  C0 F0    CPY  #$F0
  0x04797E $996E: C-----  60       RTS  
  0x04797F $996F: C-----  00       BRK  
  0x047980 $9970: C-----  00       BRK  
  0x047981 $9971: C-----  00       BRK  
  0x047982 $9972: C-----  60       RTS  
  0x047983 $9973: C-----  F0 F0    BEQ  $9965
  0x047985 $9975: C-----  60       RTS  
  0x047986 $9976: C-----  20 40 00 JSR  $0040
  0x047989 $9979: C-----  00       BRK  
  0x04798A $997A: C-----  00       BRK  
  0x04798B $997B: C-----  60       RTS  
  0x04798C $997C: C-----  60       RTS  
  0x04798D $997D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04798E $997E: C-----  C0 80    CPY  #$80
  0x047990 $9980: C-----  00       BRK  
  0x047991 $9981: C-----  00       BRK  
  0x047992 $9982: C-----  00       BRK  
  0x047993 $9983: C-----  00       BRK  
  0x047994 $9984: C-----  00       BRK  
  0x047995 $9985: C-----  01 03    ORA  ($03,X)
  0x047997 $9987: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047998 $9988: C-----  00       BRK  
  0x047999 $9989: C-----  00       BRK  
  0x04799A $998A: C-----  00       BRK  
  0x04799B $998B: C-----  00       BRK  
  0x04799C $998C: C-----  00       BRK  
  0x04799D $998D: C-----  00       BRK  
  0x04799E $998E: C-----  00       BRK  
  0x04799F $998F: C-----  00       BRK  
  0x0479A0 $9990: C-----  00       BRK  
  0x0479A1 $9991: C-----  00       BRK  
  0x0479A2 $9992: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0479A3 $9993: C-----  18       CLC  
  0x0479A4 $9994: C-----  70 E3    BVS  $9979
  0x0479A6 $9996: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0479A7 $9997: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0479A8 $9998: C-----  00       BRK  
  0x0479A9 $9999: C-----  00       BRK  
  0x0479AA $999A: C-----  00       BRK  
  0x0479AB $999B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0479AC $999C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0479AD $999D: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0479AE $999E: C-----  00       BRK  
  0x0479AF $999F: C-----  00       BRK  
  0x0479B0 $99A0: C-----  21 46    AND  ($46,X)
  0x0479B2 $99A2: C-----  F8       SED  
  0x0479B3 $99A3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0479B4 $99A4: C-----  00       BRK  
  0x0479B5 $99A5: C-----  00       BRK  
  0x0479B6 $99A6: C-----  00       BRK  
  0x0479B7 $99A7: C-----  00       BRK  
  0x0479B8 $99A8: C-----  00       BRK  
  0x0479B9 $99A9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0479BA $99AA: C-----  00       BRK  
  0x0479BB $99AB: C-----  00       BRK  
  0x0479BC $99AC: C-----  00       BRK  
  0x0479BD $99AD: C-----  00       BRK  
  0x0479BE $99AE: C-----  00       BRK  
  0x0479BF $99AF: C-----  00       BRK  
  0x0479C0 $99B0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0479C1 $99B1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0479C2 $99B2: C-----  08       PHP  
  0x0479C3 $99B3: C-----  39 7E F0 AND  $F07E,Y
  0x0479C6 $99B6: C-----  00       BRK  
  0x0479C7 $99B7: C-----  00       BRK  
  0x0479C8 $99B8: C-----  00       BRK  
  0x0479C9 $99B9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0479CA $99BA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0479CB $99BB: C-----  06 00    ASL  $00
  0x0479CD $99BD: C-----  00       BRK  
  0x0479CE $99BE: C-----  00       BRK  
  0x0479CF $99BF: C-----  00       BRK  
  0x0479D0 $99C0: C-----  18       CLC  
  0x0479D1 $99C1: C-----  60       RTS  
  0x0479D2 $99C2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0479D3 $99C3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0479D4 $99C4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0479D5 $99C5: C-----  E8       INX  
  0x0479D6 $99C6: C-----  10 E1    BPL  $99A9
  0x0479D8 $99C8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0479D9 $99C9: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0479DA $99CA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0479DB $99CB: C-----  FD E0 07 SBC  $07E0,X
  0x0479DE $99CE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0479DF $99CF: C-----  1E 80 80 ASL  $8080,X
  0x0479E2 $99D2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0479E3 $99D3: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x0479E4 $99D4: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0479E5 $99D5: C-----  20 C0 00 JSR  $00C0
  0x0479E8 $99D8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0479E9 $99D9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0479EA $99DA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0479EB $99DB: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0479EC $99DC: C-----  00       BRK  
  0x0479ED $99DD: C-----  00       BRK  
  0x0479EE $99DE: C-----  00       BRK  
  0x0479EF $99DF: C-----  00       BRK  
  0x0479F0 $99E0: C-----  06 08    ASL  $08
  0x0479F2 $99E2: C-----  30 C0    BMI  $99A4
  0x0479F4 $99E4: C-----  00       BRK  
  0x0479F5 $99E5: C-----  00       BRK  
  0x0479F6 $99E6: C-----  00       BRK  
  0x0479F7 $99E7: C-----  00       BRK  
  0x0479F8 $99E8: C-----  F8       SED  
  0x0479F9 $99E9: C-----  F0 C0    BEQ  $99AB
  0x0479FB $99EB: C-----  00       BRK  
  0x0479FC $99EC: C-----  00       BRK  
  0x0479FD $99ED: C-----  00       BRK  
  0x0479FE $99EE: C-----  00       BRK  
  0x0479FF $99EF: C-----  00       BRK  
  0x047A00 $99F0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047A01 $99F1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047A02 $99F2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047A03 $99F3: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x047A04 $99F4: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047A05 $99F5: C-----  20 C0 00 JSR  $00C0
  0x047A08 $99F8: C-----  00       BRK  
  0x047A09 $99F9: C-----  00       BRK  
  0x047A0A $99FA: C-----  00       BRK  
  0x047A0B $99FB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047A0C $99FC: C-----  C0 C0    CPY  #$C0
  0x047A0E $99FE: C-----  00       BRK  
  0x047A0F $99FF: C-----  00       BRK  
  0x047A10 $9A00: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047A11 $9A01: C-----  08       PHP  
  0x047A12 $9A02: C-----  08       PHP  
  0x047A13 $9A03: C-----  11 13    ORA  ($13),Y
  0x047A15 $9A05: C-----  26 3C    ROL  $3C
  0x047A17 $9A07: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x047A18 $9A08: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047A19 $9A09: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047A1A $9A0A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047A1B $9A0B: C-----  0E 0C 18 ASL  $180C
  0x047A1E $9A0E: C-----  00       BRK  
  0x047A1F $9A0F: C-----  00       BRK  
  0x047A20 $9A10: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x047A21 $9A11: C-----  81 81    STA  ($81,X)
  0x047A23 $9A13: C-----  00       BRK  
  0x047A24 $9A14: C-----  00       BRK  
  0x047A25 $9A15: C-----  00       BRK  
  0x047A26 $9A16: C-----  00       BRK  
  0x047A27 $9A17: C-----  00       BRK  
  0x047A28 $9A18: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047A29 $9A19: C-----  00       BRK  
  0x047A2A $9A1A: C-----  00       BRK  
  0x047A2B $9A1B: C-----  00       BRK  
  0x047A2C $9A1C: C-----  00       BRK  
  0x047A2D $9A1D: C-----  00       BRK  
  0x047A2E $9A1E: C-----  00       BRK  
  0x047A2F $9A1F: C-----  00       BRK  
  0x047A30 $9A20: C-----  00       BRK  
  0x047A31 $9A21: C-----  00       BRK  
  0x047A32 $9A22: C-----  00       BRK  
  0x047A33 $9A23: C-----  00       BRK  
  0x047A34 $9A24: C-----  00       BRK  
  0x047A35 $9A25: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047A36 $9A26: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x047A37 $9A27: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x047A38 $9A28: C-----  00       BRK  
  0x047A39 $9A29: C-----  00       BRK  
  0x047A3A $9A2A: C-----  00       BRK  
  0x047A3B $9A2B: C-----  00       BRK  
  0x047A3C $9A2C: C-----  00       BRK  
  0x047A3D $9A2D: C-----  00       BRK  
  0x047A3E $9A2E: C-----  18       CLC  
  0x047A3F $9A2F: C-----  24 06    BIT  $06
  0x047A41 $9A31: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047A42 $9A32: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x047A43 $9A33: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x047A44 $9A34: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x047A45 $9A35: C-----  0E 00 00 ASL  $0000
  0x047A48 $9A38: C-----  01 03    ORA  ($03,X)
  0x047A4A $9A3A: C-----  06 0E    ASL  $0E
  0x047A4C $9A3C: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x047A4D $9A3D: C-----  00       BRK  
  0x047A4E $9A3E: C-----  00       BRK  
  0x047A4F $9A3F: C-----  00       BRK  
  0x047A50 $9A40: C-----  30 10    BMI  $9A52
  0x047A52 $9A42: C-----  90 88    BCC  $99CC
  0x047A54 $9A44: C-----  48       PHA  
  0x047A55 $9A45: C-----  68       PLA  
  0x047A56 $9A46: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x047A57 $9A47: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x047A58 $9A48: C-----  C0 E0    CPY  #$E0
  0x047A5A $9A4A: C-----  60       RTS  
  0x047A5B $9A4B: C-----  70 30    BVS  $9A7D
  0x047A5D $9A4D: C-----  10 00    BPL  $9A4F
  0x047A5F $9A4F: C-----  00       BRK  
  0x047A60 $9A50: C-----  7E 3C 3C ROR  $3C3C,X
  0x047A63 $9A53: C-----  18       CLC  
  0x047A64 $9A54: C-----  00       BRK  
  0x047A65 $9A55: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047A66 $9A56: C-----  81 C1    STA  ($C1,X)
  0x047A68 $9A58: C-----  BD DB 19 LDA  $19DB,X
  0x047A6B $9A5B: C-----  24 00    BIT  $00
  0x047A6D $9A5D: C-----  00       BRK  
  0x047A6E $9A5E: C-----  00       BRK  
  0x047A6F $9A5F: C-----  00       BRK  
  0x047A70 $9A60: C-----  7E 3C 3C ROR  $3C3C,X
  0x047A73 $9A63: C-----  18       CLC  
  0x047A74 $9A64: C-----  00       BRK  
  0x047A75 $9A65: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047A76 $9A66: C-----  81 C1    STA  ($C1,X)
  0x047A78 $9A68: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047A79 $9A69: C-----  18       CLC  
  0x047A7A $9A6A: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x047A7B $9A6B: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x047A7C $9A6C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047A7D $9A6D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x047A7E $9A6E: C-----  7E 3E 70 ROR  $703E,X
  0x047A81 $9A71: C-----  38       SEC  
  0x047A82 $9A72: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x047A83 $9A73: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047A84 $9A74: C-----  E4 98    CPX  $98
  0x047A86 $9A76: C-----  00       BRK  
  0x047A87 $9A77: C-----  00       BRK  
  0x047A88 $9A78: C-----  A0 F0    LDY  #$F0
  0x047A8A $9A7A: C-----  F8       SED  
  0x047A8B $9A7B: C-----  F8       SED  
  0x047A8C $9A7C: C-----  18       CLC  
  0x047A8D $9A7D: C-----  00       BRK  
  0x047A8E $9A7E: C-----  00       BRK  
  0x047A8F $9A7F: C-----  00       BRK  
  0x047A90 $9A80: C-----  00       BRK  
  0x047A91 $9A81: C-----  00       BRK  
  0x047A92 $9A82: C-----  00       BRK  
  0x047A93 $9A83: C-----  00       BRK  
  0x047A94 $9A84: C-----  00       BRK  
  0x047A95 $9A85: C-----  00       BRK  
  0x047A96 $9A86: C-----  01 07    ORA  ($07,X)
  0x047A98 $9A88: C-----  00       BRK  
  0x047A99 $9A89: C-----  00       BRK  
  0x047A9A $9A8A: C-----  00       BRK  
  0x047A9B $9A8B: C-----  00       BRK  
  0x047A9C $9A8C: C-----  00       BRK  
  0x047A9D $9A8D: C-----  00       BRK  
  0x047A9E $9A8E: C-----  00       BRK  
  0x047A9F $9A8F: C-----  00       BRK  
  0x047AA0 $9A90: C-----  00       BRK  
  0x047AA1 $9A91: C-----  00       BRK  
  0x047AA2 $9A92: C-----  00       BRK  
  0x047AA3 $9A93: C-----  00       BRK  
  0x047AA4 $9A94: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047AA5 $9A95: C-----  7E FF FF ROR  $FFFF,X
  0x047AA8 $9A98: C-----  00       BRK  
  0x047AA9 $9A99: C-----  00       BRK  
  0x047AAA $9A9A: C-----  00       BRK  
  0x047AAB $9A9B: C-----  00       BRK  
  0x047AAC $9A9C: C-----  00       BRK  
  0x047AAD $9A9D: C-----  00       BRK  
  0x047AAE $9A9E: C-----  00       BRK  
  0x047AAF $9A9F: C-----  10 0C    BPL  $9AAD
  0x047AB1 $9AA1: C-----  1E 1E 1F ASL  $1F1E,X
  0x047AB4 $9AA4: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x047AB5 $9AA5: C-----  00       BRK  
  0x047AB6 $9AA6: C-----  00       BRK  
  0x047AB7 $9AA7: C-----  00       BRK  
  0x047AB8 $9AA8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047AB9 $9AA9: C-----  05 0D    ORA  $0D
  0x047ABB $9AAB: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047ABC $9AAC: C-----  00       BRK  
  0x047ABD $9AAD: C-----  00       BRK  
  0x047ABE $9AAE: C-----  00       BRK  
  0x047ABF $9AAF: C-----  00       BRK  
  0x047AC0 $9AB0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x047AC1 $9AB1: C-----  3D 98 80 AND  $8098,X
  0x047AC4 $9AB4: C-----  C1 41    CMP  ($41,X)
  0x047AC6 $9AB6: C-----  41 63    EOR  ($63,X)
  0x047AC8 $9AB8: C-----  B8       CLV  
  0x047AC9 $9AB9: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x047ACA $9ABA: C-----  01 01    ORA  ($01,X)
  0x047ACC $9ABC: C-----  00       BRK  
  0x047ACD $9ABD: C-----  00       BRK  
  0x047ACE $9ABE: C-----  00       BRK  
  0x047ACF $9ABF: C-----  00       BRK  
  0x047AD0 $9AC0: C-----  00       BRK  
  0x047AD1 $9AC1: C-----  00       BRK  
  0x047AD2 $9AC2: C-----  01 01    ORA  ($01,X)
  0x047AD4 $9AC4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x047AD5 $9AC5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x047AD6 $9AC6: C-----  06 05    ASL  $05
  0x047AD8 $9AC8: C-----  00       BRK  
  0x047AD9 $9AC9: C-----  00       BRK  
  0x047ADA $9ACA: C-----  00       BRK  
  0x047ADB $9ACB: C-----  00       BRK  
  0x047ADC $9ACC: C-----  01 01    ORA  ($01,X)
  0x047ADE $9ACE: C-----  01 02    ORA  ($02,X)
  0x047AE0 $9AD0: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x047AE1 $9AD1: C-----  9D 00 18 STA  $1800,X
  0x047AE4 $9AD4: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x047AE5 $9AD5: C-----  24 42    BIT  $42
  0x047AE7 $9AD7: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x047AE8 $9AD8: C-----  08       PHP  
  0x047AE9 $9AD9: C-----  00       BRK  
  0x047AEA $9ADA: C-----  00       BRK  
  0x047AEB $9ADB: C-----  00       BRK  
  0x047AEC $9ADC: C-----  00       BRK  
  0x047AED $9ADD: C-----  00       BRK  
  0x047AEE $9ADE: C-----  00       BRK  
  0x047AEF $9ADF: C-----  00       BRK  
  0x047AF0 $9AE0: C-----  E0 30    CPX  #$30
  0x047AF2 $9AE2: C-----  58       CLI  
  0x047AF3 $9AE3: C-----  E8       INX  
  0x047AF4 $9AE4: C-----  F0 E0    BEQ  $9AC6
  0x047AF6 $9AE6: C-----  C0 00    CPY  #$00
  0x047AF8 $9AE8: C-----  00       BRK  
  0x047AF9 $9AE9: C-----  C0 A0    CPY  #$A0
  0x047AFB $9AEB: C-----  50 40    BVC  $9B2D
  0x047AFD $9AED: C-----  40       RTI  
  0x047AFE $9AEE: C-----  00       BRK  
  0x047AFF $9AEF: C-----  00       BRK  
  0x047B00 $9AF0: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047B01 $9AF1: C-----  08       PHP  
  0x047B02 $9AF2: C-----  09 11    ORA  #$11
  0x047B04 $9AF4: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x047B05 $9AF5: C-----  24 3C    BIT  $3C
  0x047B07 $9AF7: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x047B08 $9AF8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047B09 $9AF9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047B0A $9AFA: C-----  06 0E    ASL  $0E
  0x047B0C $9AFC: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x047B0D $9AFD: C-----  18       CLC  
  0x047B0E $9AFE: C-----  00       BRK  
  0x047B0F $9AFF: C-----  00       BRK  
  0x047B10 $9B00: C-----  21 46    AND  ($46,X)
  0x047B12 $9B02: C-----  F8       SED  
  0x047B13 $9B03: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047B14 $9B04: C-----  00       BRK  
  0x047B15 $9B05: C-----  00       BRK  
  0x047B16 $9B06: C-----  00       BRK  
  0x047B17 $9B07: C-----  00       BRK  
  0x047B18 $9B08: C-----  DE 38 00 DEC  $0038,X
  0x047B1B $9B0B: C-----  00       BRK  
  0x047B1C $9B0C: C-----  00       BRK  
  0x047B1D $9B0D: C-----  00       BRK  
  0x047B1E $9B0E: C-----  00       BRK  
  0x047B1F $9B0F: C-----  00       BRK  
  0x047B20 $9B10: C-----  00       BRK  
  0x047B21 $9B11: C-----  00       BRK  
  0x047B22 $9B12: C-----  00       BRK  
  0x047B23 $9B13: C-----  00       BRK  
  0x047B24 $9B14: C-----  00       BRK  
  0x047B25 $9B15: C-----  00       BRK  
  0x047B26 $9B16: C-----  01 02    ORA  ($02,X)
  0x047B28 $9B18: C-----  00       BRK  
  0x047B29 $9B19: C-----  00       BRK  
  0x047B2A $9B1A: C-----  00       BRK  
  0x047B2B $9B1B: C-----  00       BRK  
  0x047B2C $9B1C: C-----  00       BRK  
  0x047B2D $9B1D: C-----  00       BRK  
  0x047B2E $9B1E: C-----  00       BRK  
  0x047B2F $9B1F: C-----  01 02    ORA  ($02,X)
  0x047B31 $9B21: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x047B32 $9B22: C-----  01 00    ORA  ($00,X)
  0x047B34 $9B24: C-----  00       BRK  
  0x047B35 $9B25: C-----  00       BRK  
  0x047B36 $9B26: C-----  01 0F    ORA  ($0F,X)
  0x047B38 $9B28: C-----  01 01    ORA  ($01,X)
  0x047B3A $9B2A: C-----  00       BRK  
  0x047B3B $9B2B: C-----  00       BRK  
  0x047B3C $9B2C: C-----  00       BRK  
  0x047B3D $9B2D: C-----  00       BRK  
  0x047B3E $9B2E: C-----  00       BRK  
  0x047B3F $9B2F: C-----  00       BRK  
  0x047B40 $9B30: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x047B41 $9B31: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047B42 $9B32: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047B43 $9B33: C-----  8D F1 81 STA  $81F1
  0x047B46 $9B36: C-----  01 00    ORA  ($00,X)
  0x047B48 $9B38: C-----  38       SEC  
  0x047B49 $9B39: C-----  08       PHP  
  0x047B4A $9B3A: C-----  08       PHP  
  0x047B4B $9B3B: C-----  00       BRK  
  0x047B4C $9B3C: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x047B4D $9B3D: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x047B4E $9B3E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047B4F $9B3F: C-----  FD 00 00 SBC  $0000,X
  0x047B52 $9B42: C-----  00       BRK  
  0x047B53 $9B43: C-----  00       BRK  
  0x047B54 $9B44: C-----  00       BRK  
  0x047B55 $9B45: C-----  00       BRK  
  0x047B56 $9B46: C-----  E0 38    CPX  #$38
  0x047B58 $9B48: C-----  00       BRK  
  0x047B59 $9B49: C-----  00       BRK  
  0x047B5A $9B4A: C-----  00       BRK  
  0x047B5B $9B4B: C-----  00       BRK  
  0x047B5C $9B4C: C-----  00       BRK  
  0x047B5D $9B4D: C-----  00       BRK  
  0x047B5E $9B4E: C-----  00       BRK  
  0x047B5F $9B4F: C-----  C0 00    CPY  #$00
  0x047B61 $9B51: C-----  18       CLC  
  0x047B62 $9B52: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047B63 $9B53: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x047B64 $9B54: C-----  B8       CLV  
  0x047B65 $9B55: C-----  30 20    BMI  $9B77
  0x047B67 $9B57: C-----  C0 00    CPY  #$00
  0x047B69 $9B59: C-----  00       BRK  
  0x047B6A $9B5A: C-----  10 38    BPL  $9B94
  0x047B6C $9B5C: C-----  50 C0    BVC  $9B1E
  0x047B6E $9B5E: C-----  C0 00    CPY  #$00
  0x047B70 $9B60: C-----  60       RTS  
  0x047B71 $9B61: C-----  90 28    BCC  $9B8B
  0x047B73 $9B63: C-----  68       PLA  
  0x047B74 $9B64: C-----  F8       SED  
  0x047B75 $9B65: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x047B76 $9B66: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047B77 $9B67: C-----  C0 00    CPY  #$00
  0x047B79 $9B69: C-----  60       RTS  
  0x047B7A $9B6A: C-----  D0 B0    BNE  $9B1C
  0x047B7C $9B6C: C-----  E0 E0    CPX  #$E0
  0x047B7E $9B6E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047B7F $9B6F: C-----  00       BRK  
  0x047B80 $9B70: C-----  38       SEC  
  0x047B81 $9B71: C-----  60       RTS  
  0x047B82 $9B72: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047B83 $9B73: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x047B84 $9B74: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047B85 $9B75: C-----  EC 30 E1 CPX  $E130
  0x047B88 $9B78: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047B89 $9B79: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047B8A $9B7A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x047B8B $9B7B: C-----  FD E0 03 SBC  $03E0,X
  0x047B8E $9B7E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047B8F $9B7F: C-----  1E 00 80 ASL  $8000,X
  0x047B92 $9B82: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047B93 $9B83: C-----  C0 C0    CPY  #$C0
  0x047B95 $9B85: C-----  40       RTI  
  0x047B96 $9B86: C-----  C0 60    CPY  #$60
  0x047B98 $9B88: C-----  00       BRK  
  0x047B99 $9B89: C-----  00       BRK  
  0x047B9A $9B8A: C-----  00       BRK  
  0x047B9B $9B8B: C-----  00       BRK  
  0x047B9C $9B8C: C-----  00       BRK  
  0x047B9D $9B8D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047B9E $9B8E: C-----  00       BRK  
  0x047B9F $9B8F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047BA0 $9B90: C-----  00       BRK  
  0x047BA1 $9B91: C-----  00       BRK  
  0x047BA2 $9B92: C-----  00       BRK  
  0x047BA3 $9B93: C-----  18       CLC  
  0x047BA4 $9B94: C-----  24 42    BIT  $42
  0x047BA6 $9B96: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x047BA7 $9B97: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047BA8 $9B98: C-----  00       BRK  
  0x047BA9 $9B99: C-----  00       BRK  
  0x047BAA $9B9A: C-----  00       BRK  
  0x047BAB $9B9B: C-----  00       BRK  
  0x047BAC $9B9C: C-----  18       CLC  
  0x047BAD $9B9D: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047BAE $9B9E: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047BAF $9B9F: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x047BB0 $9BA0: C-----  81 81    STA  ($81,X)
  0x047BB2 $9BA2: C-----  00       BRK  
  0x047BB3 $9BA3: C-----  00       BRK  
  0x047BB4 $9BA4: C-----  00       BRK  
  0x047BB5 $9BA5: C-----  00       BRK  
  0x047BB6 $9BA6: C-----  00       BRK  
  0x047BB7 $9BA7: C-----  00       BRK  
  0x047BB8 $9BA8: C-----  00       BRK  
  0x047BB9 $9BA9: C-----  00       BRK  
  0x047BBA $9BAA: C-----  00       BRK  
  0x047BBB $9BAB: C-----  00       BRK  
  0x047BBC $9BAC: C-----  00       BRK  
  0x047BBD $9BAD: C-----  00       BRK  
  0x047BBE $9BAE: C-----  00       BRK  
  0x047BBF $9BAF: C-----  00       BRK  
  0x047BC0 $9BB0: C-----  20 20 90 JSR  $9020
  0x047BC3 $9BB3: C-----  90 48    BCC  $9BFD
  0x047BC5 $9BB5: C-----  68       PLA  
  0x047BC6 $9BB6: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047BC7 $9BB7: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047BC8 $9BB8: C-----  C0 C0    CPY  #$C0
  0x047BCA $9BBA: C-----  60       RTS  
  0x047BCB $9BBB: C-----  60       RTS  
  0x047BCC $9BBC: C-----  30 10    BMI  $9BCE
  0x047BCE $9BBE: C-----  00       BRK  
  0x047BCF $9BBF: C-----  00       BRK  
  0x047BD0 $9BC0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047BD1 $9BC1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047BD2 $9BC2: C-----  C0 73    CPY  #$73
  0x047BD4 $9BC4: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047BD5 $9BC5: C-----  20 C0 80 JSR  $80C0
  0x047BD8 $9BC8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x047BD9 $9BC9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x047BDA $9BCA: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x047BDB $9BCB: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x047BDC $9BCC: C-----  00       BRK  
  0x047BDD $9BCD: C-----  00       BRK  
  0x047BDE $9BCE: C-----  00       BRK  
  0x047BDF $9BCF: C-----  00       BRK  
  0x047BE0 $9BD0: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x047BE1 $9BD1: C-----  6C F0 80 JMP  ($80F0)
  0x047BE4 $9BD4: C-----  00       BRK  
  0x047BE5 $9BD5: C-----  00       BRK  
  0x047BE6 $9BD6: C-----  00       BRK  
  0x047BE7 $9BD7: C-----  00       BRK  
  0x047BE8 $9BD8: C-----  00       BRK  
  0x047BE9 $9BD9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047BEA $9BDA: C-----  00       BRK  
  0x047BEB $9BDB: C-----  00       BRK  
  0x047BEC $9BDC: C-----  00       BRK  
  0x047BED $9BDD: C-----  00       BRK  
  0x047BEE $9BDE: C-----  00       BRK  
  0x047BEF $9BDF: C-----  00       BRK  
  0x047BF0 $9BE0: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x047BF1 $9BE1: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047BF2 $9BE2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047BF3 $9BE3: C-----  8D F1 81 STA  $81F1
  0x047BF6 $9BE6: C-----  01 00    ORA  ($00,X)
  0x047BF8 $9BE8: C-----  B8       CLV  
  0x047BF9 $9BE9: C-----  C8       INY  
  0x047BFA $9BEA: C-----  F8       SED  
  0x047BFB $9BEB: C-----  !!UNDEF $72  ; unknown opcode, treating as data
  0x047BFC $9BEC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x047BFD $9BED: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x047BFE $9BEE: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x047BFF $9BEF: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x047C00 $9BF0: C-----  60       RTS  
  0x047C01 $9BF1: C-----  90 28    BCC  $9C1B
  0x047C03 $9BF3: C-----  68       PLA  
  0x047C04 $9BF4: C-----  F8       SED  
  0x047C05 $9BF5: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x047C06 $9BF6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047C07 $9BF7: C-----  C0 00    CPY  #$00
  0x047C09 $9BF9: C-----  00       BRK  
  0x047C0A $9BFA: C-----  00       BRK  
  0x047C0B $9BFB: C-----  20 E0 E0 JSR  $E0E0
  0x047C0E $9BFE: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x047C0F $9BFF: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x047C10 $9C00: ------  .byte $00
  0x047C11 $9C01: C-----  00       BRK  
  0x047C12 $9C02: C-----  00       BRK  
  0x047C13 $9C03: C-----  00       BRK  
  0x047C14 $9C04: C-----  00       BRK  
  0x047C15 $9C05: C-----  00       BRK  
  0x047C16 $9C06: C-----  00       BRK  
  0x047C17 $9C07: C-----  00       BRK  
  0x047C18 $9C08: ------  .byte $00
  0x047C19 $9C09: C-----  00       BRK  
  0x047C1A $9C0A: C-----  00       BRK  
  0x047C1B $9C0B: C-----  00       BRK  
  0x047C1C $9C0C: C-----  00       BRK  
  0x047C1D $9C0D: C-----  00       BRK  
  0x047C1E $9C0E: C-----  00       BRK  
  0x047C1F $9C0F: C-----  00       BRK  
  0x047C20 $9C10: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047C21 $9C11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047C22 $9C12: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047C23 $9C13: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047C24 $9C14: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047C25 $9C15: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047C26 $9C16: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047C27 $9C17: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047C28 $9C18: C-----  00       BRK  
  0x047C29 $9C19: C-----  00       BRK  
  0x047C2A $9C1A: C-----  00       BRK  
  0x047C2B $9C1B: C-----  00       BRK  
  0x047C2C $9C1C: C-----  00       BRK  
  0x047C2D $9C1D: C-----  00       BRK  
  0x047C2E $9C1E: C-----  00       BRK  
  0x047C2F $9C1F: C-----  00       BRK  
  0x047C30 $9C20: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047C31 $9C21: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047C32 $9C22: C-----  C0 73    CPY  #$73
  0x047C34 $9C24: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047C35 $9C25: C-----  20 C0 80 JSR  $80C0
  0x047C38 $9C28: C-----  00       BRK  
  0x047C39 $9C29: C-----  00       BRK  
  0x047C3A $9C2A: C-----  00       BRK  
  0x047C3B $9C2B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047C3C $9C2C: C-----  C0 C0    CPY  #$C0
  0x047C3E $9C2E: C-----  00       BRK  
  0x047C3F $9C2F: C-----  00       BRK  
  0x047C40 $9C30: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x047C41 $9C31: C-----  6C F0 80 JMP  ($80F0)
  0x047C44 $9C34: C-----  00       BRK  
  0x047C45 $9C35: C-----  00       BRK  
  0x047C46 $9C36: C-----  00       BRK  
  0x047C47 $9C37: C-----  00       BRK  
  0x047C48 $9C38: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x047C49 $9C39: C-----  10 00    BPL  $9C3B
  0x047C4B $9C3B: C-----  00       BRK  
  0x047C4C $9C3C: C-----  00       BRK  
  0x047C4D $9C3D: C-----  00       BRK  
  0x047C4E $9C3E: C-----  00       BRK  
  0x047C4F $9C3F: C-----  00       BRK  
  0x047C50 $9C40: C-----  08       PHP  
  0x047C51 $9C41: C-----  18       CLC  
  0x047C52 $9C42: C-----  31 71    AND  ($71),Y
  0x047C54 $9C44: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x047C55 $9C45: C-----  6D 60 C0 ADC  $C060
  0x047C58 $9C48: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047C59 $9C49: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047C5A $9C4A: C-----  0E 0E 0C ASL  $0C0E
  0x047C5D $9C4D: C-----  00       BRK  
  0x047C5E $9C4E: C-----  00       BRK  
  0x047C5F $9C4F: C-----  00       BRK  
  0x047C60 $9C50: C-----  70 F8    BVS  $9C4A
  0x047C62 $9C52: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047C63 $9C53: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047C64 $9C54: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047C65 $9C55: C-----  FD FA 7C SBC  $7CFA,X
  0x047C68 $9C58: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047C69 $9C59: C-----  00       BRK  
  0x047C6A $9C5A: C-----  00       BRK  
  0x047C6B $9C5B: C-----  00       BRK  
  0x047C6C $9C5C: C-----  E0 E0    CPX  #$E0
  0x047C6E $9C5E: C-----  61 03    ADC  ($03,X)
  0x047C70 $9C60: C-----  00       BRK  
  0x047C71 $9C61: C-----  00       BRK  
  0x047C72 $9C62: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047C73 $9C63: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x047C74 $9C64: C-----  F0 E3    BEQ  $9C49
  0x047C76 $9C66: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047C77 $9C67: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047C78 $9C68: C-----  00       BRK  
  0x047C79 $9C69: C-----  00       BRK  
  0x047C7A $9C6A: C-----  00       BRK  
  0x047C7B $9C6B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047C7C $9C6C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047C7D $9C6D: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x047C7E $9C6E: C-----  00       BRK  
  0x047C7F $9C6F: C-----  00       BRK  
  0x047C80 $9C70: C-----  18       CLC  
  0x047C81 $9C71: C-----  60       RTS  
  0x047C82 $9C72: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047C83 $9C73: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x047C84 $9C74: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x047C85 $9C75: C-----  C8       INY  
  0x047C86 $9C76: C-----  10 61    BPL  $9CD9
  0x047C88 $9C78: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047C89 $9C79: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047C8A $9C7A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x047C8B $9C7B: C-----  7D 80 07 ADC  $0780,X
  0x047C8E $9C7E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047C8F $9C7F: C-----  1E 08 18 ASL  $1808,X
  0x047C92 $9C82: C-----  31 71    AND  ($71),Y
  0x047C94 $9C84: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x047C95 $9C85: C-----  6D 60 C0 ADC  $C060
  0x047C98 $9C88: C-----  00       BRK  
  0x047C99 $9C89: C-----  00       BRK  
  0x047C9A $9C8A: C-----  00       BRK  
  0x047C9B $9C8B: C-----  00       BRK  
  0x047C9C $9C8C: C-----  00       BRK  
  0x047C9D $9C8D: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x047C9E $9C8E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047C9F $9C8F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x047CA0 $9C90: C-----  70 F8    BVS  $9C8A
  0x047CA2 $9C92: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047CA3 $9C93: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047CA4 $9C94: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047CA5 $9C95: C-----  FD FA 7C SBC  $7CFA,X
  0x047CA8 $9C98: C-----  00       BRK  
  0x047CA9 $9C99: C-----  00       BRK  
  0x047CAA $9C9A: C-----  00       BRK  
  0x047CAB $9C9B: C-----  00       BRK  
  0x047CAC $9C9C: C-----  E0 E0    CPX  #$E0
  0x047CAE $9C9E: C-----  60       RTS  
  0x047CAF $9C9F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047CB0 $9CA0: C-----  01 06    ORA  ($06,X)
  0x047CB2 $9CA2: C-----  18       CLC  
  0x047CB3 $9CA3: C-----  39 7E F0 AND  $F07E,Y
  0x047CB6 $9CA6: C-----  00       BRK  
  0x047CB7 $9CA7: C-----  00       BRK  
  0x047CB8 $9CA8: C-----  00       BRK  
  0x047CB9 $9CA9: C-----  01 07    ORA  ($07,X)
  0x047CBB $9CAB: C-----  06 00    ASL  $00
  0x047CBD $9CAD: C-----  00       BRK  
  0x047CBE $9CAE: C-----  00       BRK  
  0x047CBF $9CAF: C-----  00       BRK  
  0x047CC0 $9CB0: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x047CC1 $9CB1: C-----  08       PHP  
  0x047CC2 $9CB2: C-----  30 C0    BMI  $9C74
  0x047CC4 $9CB4: C-----  00       BRK  
  0x047CC5 $9CB5: C-----  00       BRK  
  0x047CC6 $9CB6: C-----  00       BRK  
  0x047CC7 $9CB7: C-----  00       BRK  
  0x047CC8 $9CB8: C-----  60       RTS  
  0x047CC9 $9CB9: C-----  F0 C0    BEQ  $9C7B
  0x047CCB $9CBB: C-----  00       BRK  
  0x047CCC $9CBC: C-----  00       BRK  
  0x047CCD $9CBD: C-----  00       BRK  
  0x047CCE $9CBE: C-----  00       BRK  
  0x047CCF $9CBF: C-----  00       BRK  
  0x047CD0 $9CC0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047CD1 $9CC1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047CD2 $9CC2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047CD3 $9CC3: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x047CD4 $9CC4: C-----  38       SEC  
  0x047CD5 $9CC5: C-----  20 C0 00 JSR  $00C0
  0x047CD8 $9CC8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x047CD9 $9CC9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x047CDA $9CCA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x047CDB $9CCB: C-----  38       SEC  
  0x047CDC $9CCC: C-----  00       BRK  
  0x047CDD $9CCD: C-----  00       BRK  
  0x047CDE $9CCE: C-----  00       BRK  
  0x047CDF $9CCF: C-----  00       BRK  
  0x047CE0 $9CD0: C-----  20 63 FC JSR  $FC63
  0x047CE3 $9CD3: C-----  00       BRK  
  0x047CE4 $9CD4: C-----  00       BRK  
  0x047CE5 $9CD5: C-----  00       BRK  
  0x047CE6 $9CD6: C-----  00       BRK  
  0x047CE7 $9CD7: C-----  00       BRK  
  0x047CE8 $9CD8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047CE9 $9CD9: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x047CEA $9CDA: C-----  00       BRK  
  0x047CEB $9CDB: C-----  00       BRK  
  0x047CEC $9CDC: C-----  00       BRK  
  0x047CED $9CDD: C-----  00       BRK  
  0x047CEE $9CDE: C-----  00       BRK  
  0x047CEF $9CDF: C-----  00       BRK  
  0x047CF0 $9CE0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047CF1 $9CE1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047CF2 $9CE2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047CF3 $9CE3: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x047CF4 $9CE4: C-----  38       SEC  
  0x047CF5 $9CE5: C-----  20 C0 00 JSR  $00C0
  0x047CF8 $9CE8: C-----  00       BRK  
  0x047CF9 $9CE9: C-----  00       BRK  
  0x047CFA $9CEA: C-----  00       BRK  
  0x047CFB $9CEB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047CFC $9CEC: C-----  C0 C0    CPY  #$C0
  0x047CFE $9CEE: C-----  00       BRK  
  0x047CFF $9CEF: C-----  00       BRK  
  0x047D00 $9CF0: C-----  20 63 FC JSR  $FC63
  0x047D03 $9CF3: C-----  00       BRK  
  0x047D04 $9CF4: C-----  00       BRK  
  0x047D05 $9CF5: C-----  00       BRK  
  0x047D06 $9CF6: C-----  00       BRK  
  0x047D07 $9CF7: C-----  00       BRK  
  0x047D08 $9CF8: C-----  C0 80    CPY  #$80
  0x047D0A $9CFA: C-----  00       BRK  
  0x047D0B $9CFB: C-----  00       BRK  
  0x047D0C $9CFC: C-----  00       BRK  
  0x047D0D $9CFD: C-----  00       BRK  
  0x047D0E $9CFE: C-----  00       BRK  
  0x047D0F $9CFF: C-----  00       BRK  
  0x047D10 $9D00: C-----  E0 D0    CPX  #$D0
  0x047D12 $9D02: C-----  AA       TAX  
  0x047D13 $9D03: C-----  55 AA    EOR  $AA,X
  0x047D15 $9D05: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x047D16 $9D06: C-----  A0 00    LDY  #$00
  0x047D18 $9D08: C-----  00       BRK  
  0x047D19 $9D09: C-----  00       BRK  
  0x047D1A $9D0A: C-----  00       BRK  
  0x047D1B $9D0B: C-----  00       BRK  
  0x047D1C $9D0C: C-----  00       BRK  
  0x047D1D $9D0D: C-----  00       BRK  
  0x047D1E $9D0E: C-----  00       BRK  
  0x047D1F $9D0F: C-----  00       BRK  
  0x047D20 $9D10: C-----  00       BRK  
  0x047D21 $9D11: C-----  24 76    BIT  $76
  0x047D23 $9D13: C-----  21 0B    AND  ($0B,X)
  0x047D25 $9D15: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047D26 $9D16: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x047D27 $9D17: C-----  1E 38 58 ASL  $5838,X
  0x047D2A $9D1A: C-----  88       DEY  
  0x047D2B $9D1B: C-----  DE F4 60 DEC  $60F4,X
  0x047D2E $9D1E: C-----  08       PHP  
  0x047D2F $9D1F: C-----  00       BRK  
  0x047D30 $9D20: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047D31 $9D21: C-----  86 7A    STX  $7A
  0x047D33 $9D23: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x047D34 $9D24: C-----  BC BE 82 LDY  $82BE,X
  0x047D37 $9D27: C-----  FE 00 78 INC  $7800,X
  0x047D3A $9D2A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047D3B $9D2B: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047D3C $9D2C: C-----  40       RTI  
  0x047D3D $9D2D: C-----  40       RTI  
  0x047D3E $9D2E: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x047D3F $9D2F: C-----  00       BRK  
  0x047D40 $9D30: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047D41 $9D31: C-----  86 FA    STX  $FA
  0x047D43 $9D33: C-----  86 7A    STX  $7A
  0x047D45 $9D35: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x047D46 $9D36: C-----  86 FC    STX  $FC
  0x047D48 $9D38: C-----  00       BRK  
  0x047D49 $9D39: C-----  78       SEI  
  0x047D4A $9D3A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047D4B $9D3B: C-----  78       SEI  
  0x047D4C $9D3C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047D4D $9D3D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047D4E $9D3E: C-----  78       SEI  
  0x047D4F $9D3F: C-----  00       BRK  
  0x047D50 $9D40: C-----  1E 32 6A ASL  $6A32,X
  0x047D53 $9D43: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x047D54 $9D44: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x047D55 $9D45: C-----  81 FB    STA  ($FB,X)
  0x047D57 $9D47: C-----  0E 00 0C ASL  $0C00
  0x047D5A $9D4A: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x047D5B $9D4B: C-----  24 44    BIT  $44
  0x047D5D $9D4D: C-----  7E 04 00 ROR  $0004,X
  0x047D60 $9D50: C-----  FE 82 BE INC  $BE82,X
  0x047D63 $9D53: C-----  84 7A    STY  $7A
  0x047D65 $9D55: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x047D66 $9D56: C-----  86 FC    STX  $FC
  0x047D68 $9D58: C-----  00       BRK  
  0x047D69 $9D59: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x047D6A $9D5A: C-----  40       RTI  
  0x047D6B $9D5B: C-----  78       SEI  
  0x047D6C $9D5C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047D6D $9D5D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047D6E $9D5E: C-----  78       SEI  
  0x047D6F $9D5F: C-----  00       BRK  
  0x047D70 $9D60: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x047D71 $9D61: C-----  C4 BC    CPY  $BC
  0x047D73 $9D63: C-----  86 BA    STX  $BA
  0x047D75 $9D65: C-----  BA       TSX  
  0x047D76 $9D66: C-----  C6 7C    DEC  $7C
  0x047D78 $9D68: C-----  00       BRK  
  0x047D79 $9D69: C-----  38       SEC  
  0x047D7A $9D6A: C-----  40       RTI  
  0x047D7B $9D6B: C-----  78       SEI  
  0x047D7C $9D6C: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x047D7D $9D6D: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x047D7E $9D6E: C-----  38       SEC  
  0x047D7F $9D6F: C-----  00       BRK  
  0x047D80 $9D70: C-----  FE 82 FA INC  $FA82,X
  0x047D83 $9D73: C-----  36 2C    ROL  $2C,X
  0x047D85 $9D75: C-----  28       PLP  
  0x047D86 $9D76: C-----  28       PLP  
  0x047D87 $9D77: C-----  38       SEC  
  0x047D88 $9D78: C-----  00       BRK  
  0x047D89 $9D79: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x047D8A $9D7A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047D8B $9D7B: C-----  08       PHP  
  0x047D8C $9D7C: C-----  10 10    BPL  $9D8E
  0x047D8E $9D7E: C-----  10 00    BPL  $9D80
  0x047D90 $9D80: C-----  7E C3 BD ROR  $BDC3,X
  0x047D93 $9D83: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x047D94 $9D84: C-----  BD BD C3 LDA  $C3BD,X
  0x047D97 $9D87: C-----  7E 00 3C ROR  $3C00,X
  0x047D9A $9D8A: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x047D9B $9D8B: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047D9C $9D8C: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x047D9D $9D8D: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x047D9E $9D8E: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047D9F $9D8F: C-----  00       BRK  
  0x047DA0 $9D90: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x047DA1 $9D91: C-----  C6 BA    DEC  $BA
  0x047DA3 $9D93: C-----  BA       TSX  
  0x047DA4 $9D94: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x047DA5 $9D95: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x047DA6 $9D96: C-----  46 7C    LSR  $7C
  0x047DA8 $9D98: C-----  00       BRK  
  0x047DA9 $9D99: C-----  38       SEC  
  0x047DAA $9D9A: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x047DAB $9D9B: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x047DAC $9D9C: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047DAD $9D9D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047DAE $9D9E: C-----  38       SEC  
  0x047DAF $9D9F: C-----  00       BRK  
  0x047DB0 $9DA0: C-----  DE B3 AD DEC  $ADB3,X
  0x047DB3 $9DA3: C-----  AD AD AD LDA  $ADAD
  0x047DB6 $9DA6: C-----  !!UNDEF $B3  ; unknown opcode, treating as data
  0x047DB7 $9DA7: C-----  DE 00 4C DEC  $4C00,X
  0x047DBA $9DAA: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x047DBB $9DAB: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x047DBC $9DAC: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x047DBD $9DAD: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x047DBE $9DAE: C-----  4C 00 EE JMP  $EE00
  0x047DC1 $9DB1: C-----  AA       TAX  
  0x047DC2 $9DB2: C-----  AA       TAX  
  0x047DC3 $9DB3: C-----  AA       TAX  
  0x047DC4 $9DB4: C-----  AA       TAX  
  0x047DC5 $9DB5: C-----  AA       TAX  
  0x047DC6 $9DB6: C-----  AA       TAX  
  0x047DC7 $9DB7: C-----  EE 00 44 INC  $4400
  0x047DCA $9DBA: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x047DCB $9DBB: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x047DCC $9DBC: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x047DCD $9DBD: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x047DCE $9DBE: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x047DCF $9DBF: C-----  00       BRK  
  0x047DD0 $9DC0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047DD1 $9DC1: C-----  FE 7E FE INC  $FE7E,X
  0x047DD4 $9DC4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047DD5 $9DC5: C-----  FE FE FE INC  $FEFE,X
  0x047DD8 $9DC8: C-----  00       BRK  
  0x047DD9 $9DC9: C-----  78       SEI  
  0x047DDA $9DCA: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047DDB $9DCB: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047DDC $9DCC: C-----  40       RTI  
  0x047DDD $9DCD: C-----  40       RTI  
  0x047DDE $9DCE: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x047DDF $9DCF: C-----  00       BRK  
  0x047DE0 $9DD0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047DE1 $9DD1: C-----  FE FE FE INC  $FEFE,X
  0x047DE4 $9DD4: C-----  7E FE FE ROR  $FEFE,X
  0x047DE7 $9DD7: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047DE8 $9DD8: C-----  00       BRK  
  0x047DE9 $9DD9: C-----  78       SEI  
  0x047DEA $9DDA: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047DEB $9DDB: C-----  78       SEI  
  0x047DEC $9DDC: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047DED $9DDD: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047DEE $9DDE: C-----  78       SEI  
  0x047DEF $9DDF: C-----  00       BRK  
  0x047DF0 $9DE0: C-----  1E 3E 7E ASL  $7E3E,X
  0x047DF3 $9DE3: C-----  FE FF FF INC  $FFFF,X
  0x047DF6 $9DE6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047DF7 $9DE7: C-----  0E 00 0C ASL  $0C00
  0x047DFA $9DEA: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x047DFB $9DEB: C-----  24 44    BIT  $44
  0x047DFD $9DED: C-----  7E 04 00 ROR  $0004,X
  0x047E00 $9DF0: C-----  FE FE FC INC  $FCFE,X
  0x047E03 $9DF3: C-----  FE 7E FE INC  $FE7E,X
  0x047E06 $9DF6: C-----  FE FC 00 INC  $00FC,X
  0x047E09 $9DF9: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x047E0A $9DFA: C-----  40       RTI  
  0x047E0B $9DFB: C-----  78       SEI  
  0x047E0C $9DFC: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047E0D $9DFD: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047E0E $9DFE: C-----  78       SEI  
  0x047E0F $9DFF: C-----  00       BRK  
  0x047E10 $9E00: C-----  78       SEI  
  0x047E11 $9E01: C-----  D0 88    BNE  $9D8B
  0x047E13 $9E03: C-----  48       PHA  
  0x047E14 $9E04: C-----  F8       SED  
  0x047E15 $9E05: C-----  F9 F2 7C SBC  $7CF2,Y
  0x047E18 $9E08: C-----  00       BRK  
  0x047E19 $9E09: C-----  20 70 B0 JSR  $B070
  0x047E1C $9E0C: C-----  60       RTS  
  0x047E1D $9E0D: C-----  F0 60    BEQ  $9E6F
  0x047E1F $9E0F: C-----  00       BRK  
  0x047E20 $9E10: C-----  78       SEI  
  0x047E21 $9E11: C-----  D0 88    BNE  $9D9B
  0x047E23 $9E13: C-----  48       PHA  
  0x047E24 $9E14: C-----  F8       SED  
  0x047E25 $9E15: C-----  F9 F2 7C SBC  $7CF2,Y
  0x047E28 $9E18: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047E29 $9E19: C-----  00       BRK  
  0x047E2A $9E1A: C-----  00       BRK  
  0x047E2B $9E1B: C-----  00       BRK  
  0x047E2C $9E1C: C-----  60       RTS  
  0x047E2D $9E1D: C-----  F0 61    BEQ  $9E80
  0x047E2F $9E1F: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x047E30 $9E20: C-----  E0 1C    CPX  #$1C
  0x047E32 $9E22: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047E33 $9E23: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047E34 $9E24: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x047E35 $9E25: C-----  F0 F0    BEQ  $9E17
  0x047E37 $9E27: C-----  F8       SED  
  0x047E38 $9E28: C-----  00       BRK  
  0x047E39 $9E29: C-----  E0 F0    CPX  #$F0
  0x047E3B $9E2B: C-----  F0 E4    BEQ  $9E11
  0x047E3D $9E2D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047E3E $9E2E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047E3F $9E2F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047E40 $9E30: C-----  00       BRK  
  0x047E41 $9E31: C-----  00       BRK  
  0x047E42 $9E32: C-----  00       BRK  
  0x047E43 $9E33: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047E44 $9E34: C-----  C0 60    CPY  #$60
  0x047E46 $9E36: C-----  30 10    BMI  $9E48
  0x047E48 $9E38: C-----  00       BRK  
  0x047E49 $9E39: C-----  00       BRK  
  0x047E4A $9E3A: C-----  00       BRK  
  0x047E4B $9E3B: C-----  00       BRK  
  0x047E4C $9E3C: C-----  00       BRK  
  0x047E4D $9E3D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047E4E $9E3E: C-----  C0 E0    CPY  #$E0
  0x047E50 $9E40: C-----  00       BRK  
  0x047E51 $9E41: C-----  00       BRK  
  0x047E52 $9E42: C-----  00       BRK  
  0x047E53 $9E43: C-----  01 03    ORA  ($03,X)
  0x047E55 $9E45: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047E56 $9E46: C-----  08       PHP  
  0x047E57 $9E47: C-----  08       PHP  
  0x047E58 $9E48: C-----  00       BRK  
  0x047E59 $9E49: C-----  00       BRK  
  0x047E5A $9E4A: C-----  00       BRK  
  0x047E5B $9E4B: C-----  00       BRK  
  0x047E5C $9E4C: C-----  00       BRK  
  0x047E5D $9E4D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047E5E $9E4E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047E5F $9E4F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047E60 $9E50: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047E61 $9E51: C-----  38       SEC  
  0x047E62 $9E52: C-----  F0 F0    BEQ  $9E44
  0x047E64 $9E54: C-----  D8       CLD  
  0x047E65 $9E55: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047E66 $9E56: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047E67 $9E57: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047E68 $9E58: C-----  00       BRK  
  0x047E69 $9E59: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047E6A $9E5A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047E6B $9E5B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047E6C $9E5C: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x047E6D $9E5D: C-----  F0 F0    BEQ  $9E4F
  0x047E6F $9E5F: C-----  E0 10    CPX  #$10
  0x047E71 $9E61: C-----  18       CLC  
  0x047E72 $9E62: C-----  1E 3F 3F ASL  $3F3F,X
  0x047E75 $9E65: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x047E76 $9E66: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x047E77 $9E67: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x047E78 $9E68: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047E79 $9E69: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047E7A $9E6A: C-----  01 00    ORA  ($00,X)
  0x047E7C $9E6C: C-----  00       BRK  
  0x047E7D $9E6D: C-----  00       BRK  
  0x047E7E $9E6E: C-----  00       BRK  
  0x047E7F $9E6F: C-----  00       BRK  
  0x047E80 $9E70: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047E81 $9E71: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047E82 $9E72: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x047E83 $9E73: C-----  81 80    STA  ($80,X)
  0x047E85 $9E75: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047E86 $9E76: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047E87 $9E77: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047E88 $9E78: C-----  E0 E0    CPX  #$E0
  0x047E8A $9E7A: C-----  98       TYA  
  0x047E8B $9E7B: C-----  7E 7F 7F ROR  $7F7F,X
  0x047E8E $9E7E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x047E8F $9E7F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x047E90 $9E80: C-----  F8       SED  
  0x047E91 $9E81: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047E92 $9E82: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x047E93 $9E83: C-----  C0 80    CPY  #$80
  0x047E95 $9E85: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047E96 $9E86: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047E97 $9E87: C-----  81 07    STA  ($07,X)
  0x047E99 $9E89: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047E9A $9E8A: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x047E9B $9E8B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x047E9C $9E8C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x047E9D $9E8D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x047E9E $9E8E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x047E9F $9E8F: C-----  7E 08 58 ROR  $5808,X
  0x047EA2 $9E92: C-----  B8       CLV  
  0x047EA3 $9E93: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047EA4 $9E94: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047EA5 $9E95: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047EA6 $9E96: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047EA7 $9E97: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047EA8 $9E98: C-----  F0 A0    BEQ  $9E3A
  0x047EAA $9E9A: C-----  40       RTI  
  0x047EAB $9E9B: C-----  00       BRK  
  0x047EAC $9E9C: C-----  00       BRK  
  0x047EAD $9E9D: C-----  00       BRK  
  0x047EAE $9E9E: C-----  00       BRK  
  0x047EAF $9E9F: C-----  00       BRK  
  0x047EB0 $9EA0: C-----  CA       DEX  
  0x047EB1 $9EA1: C-----  F5 FE    SBC  $FE,X
  0x047EB3 $9EA3: C-----  F9 FA E5 SBC  $E5FA,Y
  0x047EB6 $9EA6: C-----  EA       NOP  
  0x047EB7 $9EA7: C-----  1D 35 0A ORA  $0A35,X
  0x047EBA $9EAA: C-----  01 06    ORA  ($06,X)
  0x047EBC $9EAC: C-----  05 1A    ORA  $1A
  0x047EBE $9EAE: C-----  15 E2    ORA  $E2,X
  0x047EC0 $9EB0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047EC1 $9EB1: C-----  F8       SED  
  0x047EC2 $9EB2: C-----  A8       TAY  
  0x047EC3 $9EB3: C-----  58       CLI  
  0x047EC4 $9EB4: C-----  B0 50    BCS  $9F06
  0x047EC6 $9EB6: C-----  A0 40    LDY  #$40
  0x047EC8 $9EB8: C-----  00       BRK  
  0x047EC9 $9EB9: C-----  00       BRK  
  0x047ECA $9EBA: C-----  50 A0    BVC  $9E5C
  0x047ECC $9EBC: C-----  40       RTI  
  0x047ECD $9EBD: C-----  A0 40    LDY  #$40
  0x047ECF $9EBF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x047ED0 $9EC0: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x047ED1 $9EC1: C-----  1E 18 18 ASL  $1818,X
  0x047ED4 $9EC4: C-----  08       PHP  
  0x047ED5 $9EC5: C-----  08       PHP  
  0x047ED6 $9EC6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047ED7 $9EC7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047ED8 $9EC8: C-----  00       BRK  
  0x047ED9 $9EC9: C-----  01 07    ORA  ($07,X)
  0x047EDB $9ECB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047EDC $9ECC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047EDD $9ECD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047EDE $9ECE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047EDF $9ECF: C-----  00       BRK  
  0x047EE0 $9ED0: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x047EE1 $9ED1: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x047EE2 $9ED2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x047EE3 $9ED3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047EE4 $9ED4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047EE5 $9ED5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047EE6 $9ED6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047EE7 $9ED7: C-----  58       CLI  
  0x047EE8 $9ED8: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x047EE9 $9ED9: C-----  B0 C0    BCS  $9E9B
  0x047EEB $9EDB: C-----  E0 F0    CPX  #$F0
  0x047EED $9EDD: C-----  F0 F8    BEQ  $9ED7
  0x047EEF $9EDF: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x047EF0 $9EE0: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x047EF1 $9EE1: C-----  FD 3E 5F SBC  $5F3E,X
  0x047EF4 $9EE4: C-----  AA       TAX  
  0x047EF5 $9EE5: C-----  55 0A    EOR  $0A,X
  0x047EF7 $9EE7: C-----  01 05    ORA  ($05,X)
  0x047EF9 $9EE9: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x047EFA $9EEA: C-----  01 00    ORA  ($00,X)
  0x047EFC $9EEC: C-----  00       BRK  
  0x047EFD $9EED: C-----  00       BRK  
  0x047EFE $9EEE: C-----  00       BRK  
  0x047EFF $9EEF: C-----  00       BRK  
  0x047F00 $9EF0: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x047F01 $9EF1: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x047F02 $9EF2: C-----  BE FD AA LDX  $AAFD,Y
  0x047F05 $9EF5: C-----  55 AA    EOR  $AA,X
  0x047F07 $9EF7: C-----  55 50    EOR  $50,X
  0x047F09 $9EF9: C-----  A0 40    LDY  #$40
  0x047F0B $9EFB: C-----  00       BRK  
  0x047F0C $9EFC: C-----  00       BRK  
  0x047F0D $9EFD: C-----  00       BRK  
  0x047F0E $9EFE: C-----  00       BRK  
  0x047F0F $9EFF: C-----  00       BRK  
  0x047F10 $9F00: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x047F11 $9F01: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047F12 $9F02: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x047F13 $9F03: C-----  FE FE FE INC  $FEFE,X
  0x047F16 $9F06: C-----  FE 7C 00 INC  $007C,X
  0x047F19 $9F09: C-----  38       SEC  
  0x047F1A $9F0A: C-----  40       RTI  
  0x047F1B $9F0B: C-----  78       SEI  
  0x047F1C $9F0C: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x047F1D $9F0D: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x047F1E $9F0E: C-----  38       SEC  
  0x047F1F $9F0F: C-----  00       BRK  
  0x047F20 $9F10: C-----  FE FE FE INC  $FEFE,X
  0x047F23 $9F13: C-----  3E 3C 38 ROL  $383C,X
  0x047F26 $9F16: C-----  38       SEC  
  0x047F27 $9F17: C-----  38       SEC  
  0x047F28 $9F18: C-----  00       BRK  
  0x047F29 $9F19: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x047F2A $9F1A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047F2B $9F1B: C-----  08       PHP  
  0x047F2C $9F1C: C-----  10 10    BPL  $9F2E
  0x047F2E $9F1E: C-----  10 00    BPL  $9F20
  0x047F30 $9F20: C-----  7E FF FF ROR  $FFFF,X
  0x047F33 $9F23: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047F34 $9F24: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047F35 $9F25: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047F36 $9F26: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047F37 $9F27: C-----  7E 00 3C ROR  $3C00,X
  0x047F3A $9F2A: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x047F3B $9F2B: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047F3C $9F2C: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x047F3D $9F2D: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x047F3E $9F2E: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047F3F $9F2F: C-----  00       BRK  
  0x047F40 $9F30: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x047F41 $9F31: C-----  FE FE FE INC  $FEFE,X
  0x047F44 $9F34: C-----  FE 7E 7E INC  $7E7E,X
  0x047F47 $9F37: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x047F48 $9F38: C-----  00       BRK  
  0x047F49 $9F39: C-----  38       SEC  
  0x047F4A $9F3A: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x047F4B $9F3B: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x047F4C $9F3C: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047F4D $9F3D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x047F4E $9F3E: C-----  38       SEC  
  0x047F4F $9F3F: C-----  00       BRK  
  0x047F50 $9F40: C-----  DE FF FF DEC  $FFFF,X
  0x047F53 $9F43: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047F54 $9F44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047F55 $9F45: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047F56 $9F46: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047F57 $9F47: C-----  DE 00 4C DEC  $4C00,X
  0x047F5A $9F4A: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x047F5B $9F4B: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x047F5C $9F4C: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x047F5D $9F4D: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x047F5E $9F4E: C-----  4C 00 EE JMP  $EE00
  0x047F61 $9F51: C-----  EE EE EE INC  $EEEE
  0x047F64 $9F54: C-----  EE EE EE INC  $EEEE
  0x047F67 $9F57: C-----  EE 00 44 INC  $4400
  0x047F6A $9F5A: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x047F6B $9F5B: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x047F6C $9F5C: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x047F6D $9F5D: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x047F6E $9F5E: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x047F6F $9F5F: C-----  00       BRK  
  0x047F70 $9F60: C-----  00       BRK  
  0x047F71 $9F61: C-----  26 72    ROL  $72
  0x047F73 $9F63: C-----  20 04 4E JSR  $4E04
  0x047F76 $9F66: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x047F77 $9F67: C-----  00       BRK  
  0x047F78 $9F68: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047F79 $9F69: C-----  58       CLI  
  0x047F7A $9F6A: C-----  8D DF FB STA  $FBDF
  0x047F7D $9F6D: C-----  B1 1A    LDA  ($1A),Y
  0x047F7F $9F6F: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x047F80 $9F70: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x047F81 $9F71: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x047F82 $9F72: C-----  41 08    EOR  ($08,X)
  0x047F84 $9F74: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x047F85 $9F75: C-----  C8       INY  
  0x047F86 $9F76: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x047F87 $9F77: C-----  20 30 1A JSR  $1A30
  0x047F8A $9F7A: C-----  BE F7 63 LDX  $63F7,Y
  0x047F8D $9F7D: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x047F8E $9F7E: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x047F8F $9F7F: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x047F90 $9F80: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047F91 $9F81: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047F92 $9F82: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047F93 $9F83: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047F94 $9F84: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047F95 $9F85: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x047F96 $9F86: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x047F97 $9F87: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047F98 $9F88: C-----  FD FB 07 SBC  $07FB,X
  0x047F9B $9F8B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047F9C $9F8C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047F9D $9F8D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047F9E $9F8E: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x047F9F $9F8F: C-----  E4 FD    CPX  $FD
  0x047FA1 $9F91: C-----  FD FF FE SBC  $FEFF,X
  0x047FA4 $9F94: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047FA5 $9F95: C-----  F8       SED  
  0x047FA6 $9F96: C-----  F0 E0    BEQ  $9F78
  0x047FA8 $9F98: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x047FA9 $9F99: C-----  FE FC FD INC  $FDFC,X
  0x047FAC $9F9C: C-----  F8       SED  
  0x047FAD $9F9D: C-----  F0 E0    BEQ  $9F7F
  0x047FAF $9F9F: C-----  C0 FC    CPY  #$FC
  0x047FB1 $9FA1: C-----  F0 E0    BEQ  $9F83
  0x047FB3 $9FA3: C-----  F8       SED  
  0x047FB4 $9FA4: C-----  C4 F2    CPY  $F2
  0x047FB6 $9FA6: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x047FB7 $9FA7: C-----  FD 33 6F SBC  $6F33,X
  0x047FBA $9FAA: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x047FBB $9FAB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047FBC $9FAC: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x047FBD $9FAD: C-----  0D 75 7A ORA  $7A75
  0x047FC0 $9FB0: C-----  01 01    ORA  ($01,X)
  0x047FC2 $9FB2: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047FC3 $9FB3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047FC4 $9FB4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047FC5 $9FB5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047FC6 $9FB6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047FC7 $9FB7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x047FC8 $9FB8: C-----  00       BRK  
  0x047FC9 $9FB9: C-----  00       BRK  
  0x047FCA $9FBA: C-----  01 01    ORA  ($01,X)
  0x047FCC $9FBC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047FCD $9FBD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x047FCE $9FBE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x047FCF $9FBF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x047FD0 $9FC0: C-----  00       BRK  
  0x047FD1 $9FC1: C-----  00       BRK  
  0x047FD2 $9FC2: C-----  00       BRK  
  0x047FD3 $9FC3: C-----  00       BRK  
  0x047FD4 $9FC4: C-----  00       BRK  
  0x047FD5 $9FC5: C-----  00       BRK  
  0x047FD6 $9FC6: C-----  00       BRK  
  0x047FD7 $9FC7: C-----  00       BRK  
  0x047FD8 $9FC8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047FD9 $9FC9: C-----  81 81    STA  ($81,X)
  0x047FDB $9FCB: C-----  81 81    STA  ($81,X)
  0x047FDD $9FCD: C-----  81 81    STA  ($81,X)
  0x047FDF $9FCF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x047FE0 $9FD0: C-----  08       PHP  
  0x047FE1 $9FD1: C-----  40       RTI  
  0x047FE2 $9FD2: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x047FE3 $9FD3: C-----  39 90 02 AND  $0290,Y
  0x047FE6 $9FD6: C-----  26 30    ROL  $30
  0x047FE8 $9FD8: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x047FE9 $9FD9: C-----  3E EC C6 ROL  $C6EC,X
  0x047FEC $9FDC: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x047FED $9FDD: C-----  FD 58 0C SBC  $0C58,X
  0x047FF0 $9FE0: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x047FF1 $9FE1: C-----  01 01    ORA  ($01,X)
  0x047FF3 $9FE3: C-----  81 C3    STA  ($C3,X)
  0x047FF5 $9FE5: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x047FF6 $9FE6: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x047FF7 $9FE7: C-----  F1 FD    SBC  ($FD),Y
  0x047FF9 $9FE9: C-----  FE FE 7E INC  $7EFE,X
  0x047FFC $9FEC: C-----  BC D8 D0 LDY  $D0D8,X
  0x047FFF $9FEF: C-----  C0 FE    CPY  #$FE
  0x048001 $9FF1: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x048002 $9FF2: C-----  21 96    AND  ($96,X)
  0x048004 $9FF4: C-----  48       PHA  
  0x048005 $9FF5: C-----  24 00    BIT  $00
  0x048007 $9FF7: C-----  00       BRK  
  0x048008 $9FF8: C-----  00       BRK  
  0x048009 $9FF9: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04800A $9FFA: C-----  DE 48 00 DEC  $0048,X
  0x04800D $9FFD: C-----  00       BRK  
  0x04800E $9FFE: C-----  00       BRK  
  0x04800F $9FFF: C-----  00       BRK  