; ===== MMC3 Bank 34 =====
; ROM: 0x044010-0x04600F
; CPU: $8000-$9FFF
; CDL: code=8066 data=0 unaccessed=126

  0x044010 $8000: C-----  00       BRK  
  0x044011 $8001: C-----  00       BRK  
  0x044012 $8002: C-----  00       BRK  
  0x044013 $8003: C-----  00       BRK  
  0x044014 $8004: C-----  00       BRK  
  0x044015 $8005: C-----  00       BRK  
  0x044016 $8006: C-----  00       BRK  
  0x044017 $8007: C-----  00       BRK  
  0x044018 $8008: C-----  00       BRK  
  0x044019 $8009: C-----  00       BRK  
  0x04401A $800A: C-----  00       BRK  
  0x04401B $800B: C-----  00       BRK  
  0x04401C $800C: C-----  00       BRK  
  0x04401D $800D: C-----  00       BRK  
  0x04401E $800E: C-----  00       BRK  
  0x04401F $800F: C-----  00       BRK  
  0x044020 $8010: ------  .byte $FF
  0x044021 $8011: ------  .byte $FF
  0x044022 $8012: ------  .byte $FF
  0x044023 $8013: ------  .byte $FF
  0x044024 $8014: ------  .byte $FF
  0x044025 $8015: ------  .byte $FF
  0x044026 $8016: ------  .byte $FF
  0x044027 $8017: ------  .byte $FF
  0x044028 $8018: ------  .byte $00
  0x044029 $8019: ------  .byte $00
  0x04402A $801A: ------  .byte $00
  0x04402B $801B: ------  .byte $00
  0x04402C $801C: ------  .byte $00
  0x04402D $801D: ------  .byte $00
  0x04402E $801E: ------  .byte $00
  0x04402F $801F: ------  .byte $00
  0x044030 $8020: C-----  00       BRK  
  0x044031 $8021: C-----  00       BRK  
  0x044032 $8022: C-----  00       BRK  
  0x044033 $8023: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x044034 $8024: C-----  3E FE FF ROL  $FFFE,X
  0x044037 $8027: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044038 $8028: C-----  00       BRK  
  0x044039 $8029: C-----  00       BRK  
  0x04403A $802A: C-----  00       BRK  
  0x04403B $802B: C-----  00       BRK  
  0x04403C $802C: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04403D $802D: C-----  3E FE FE ROL  $FEFE,X
  0x044040 $8030: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x044041 $8031: C-----  0E 07 06 ASL  $0607
  0x044044 $8034: C-----  06 05    ASL  $05
  0x044046 $8036: C-----  05 0C    ORA  $0C
  0x044048 $8038: C-----  00       BRK  
  0x044049 $8039: C-----  00       BRK  
  0x04404A $803A: C-----  00       BRK  
  0x04404B $803B: C-----  00       BRK  
  0x04404C $803C: C-----  00       BRK  
  0x04404D $803D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04404E $803E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04404F $803F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044050 $8040: C-----  08       PHP  
  0x044051 $8041: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x044052 $8042: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044053 $8043: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044054 $8044: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044055 $8045: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044056 $8046: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044057 $8047: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044058 $8048: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044059 $8049: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04405A $804A: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04405B $804B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04405C $804C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04405D $804D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04405E $804E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04405F $804F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044060 $8050: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044061 $8051: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044062 $8052: C-----  C0 E0    CPY  #$E0
  0x044064 $8054: C-----  F0 F9    BEQ  $804F
  0x044066 $8056: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x044067 $8057: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044068 $8058: C-----  C0 7F    CPY  #$7F
  0x04406A $805A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04406B $805B: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04406C $805C: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x04406D $805D: C-----  A6 F4    LDX  $F4
  0x04406F $805F: C-----  F0 0F    BEQ  $8070
  0x044071 $8061: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044072 $8062: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044073 $8063: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044074 $8064: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044075 $8065: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x044076 $8066: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044077 $8067: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x044078 $8068: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044079 $8069: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04407A $806A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04407B $806B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04407C $806C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04407D $806D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04407E $806E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04407F $806F: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x044080 $8070: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044081 $8071: C-----  FE FE FC INC  $FCFE,X
  0x044084 $8074: C-----  F8       SED  
  0x044085 $8075: C-----  F0 E0    BEQ  $8057
  0x044087 $8077: C-----  C0 FE    CPY  #$FE
  0x044089 $8079: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04408A $807A: C-----  F8       SED  
  0x04408B $807B: C-----  F8       SED  
  0x04408C $807C: C-----  F0 E0    BEQ  $805E
  0x04408E $807E: C-----  C0 80    CPY  #$80
  0x044090 $8080: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044091 $8081: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044092 $8082: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044093 $8083: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044094 $8084: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044095 $8085: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044096 $8086: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044097 $8087: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044098 $8088: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044099 $8089: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04409A $808A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04409B $808B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04409C $808C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04409D $808D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04409E $808E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04409F $808F: C-----  18       CLC  
  0x0440A0 $8090: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0440A1 $8091: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0440A2 $8092: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0440A3 $8093: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0440A4 $8094: C-----  C0 C0    CPY  #$C0
  0x0440A6 $8096: C-----  C0 C0    CPY  #$C0
  0x0440A8 $8098: C-----  00       BRK  
  0x0440A9 $8099: C-----  00       BRK  
  0x0440AA $809A: C-----  00       BRK  
  0x0440AB $809B: C-----  00       BRK  
  0x0440AC $809C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0440AD $809D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0440AE $809E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0440AF $809F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0440B0 $80A0: C-----  78       SEI  
  0x0440B1 $80A1: C-----  60       RTS  
  0x0440B2 $80A2: C-----  60       RTS  
  0x0440B3 $80A3: C-----  40       RTI  
  0x0440B4 $80A4: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x0440B5 $80A5: C-----  60       RTS  
  0x0440B6 $80A6: C-----  40       RTI  
  0x0440B7 $80A7: C-----  C0 27    CPY  #$27
  0x0440B9 $80A9: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0440BA $80AA: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0440BB $80AB: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0440BC $80AC: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0440BD $80AD: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0440BE $80AE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0440BF $80AF: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0440C0 $80B0: C-----  C0 40    CPY  #$40
  0x0440C2 $80B2: C-----  40       RTI  
  0x0440C3 $80B3: C-----  20 20 10 JSR  $1020
  0x0440C6 $80B6: C-----  18       CLC  
  0x0440C7 $80B7: C-----  08       PHP  
  0x0440C8 $80B8: C-----  00       BRK  
  0x0440C9 $80B9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0440CA $80BA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0440CB $80BB: C-----  C0 C0    CPY  #$C0
  0x0440CD $80BD: C-----  E0 E0    CPX  #$E0
  0x0440CF $80BF: C-----  F0 0B    BEQ  $80CC
  0x0440D1 $80C1: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0440D2 $80C2: C-----  10 20    BPL  $80E4
  0x0440D4 $80C4: C-----  20 40 40 JSR  $4040
  0x0440D7 $80C7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0440D8 $80C8: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0440D9 $80C9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0440DA $80CA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0440DB $80CB: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0440DC $80CC: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0440DD $80CD: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0440DE $80CE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0440DF $80CF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0440E0 $80D0: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x0440E1 $80D1: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x0440E2 $80D2: C-----  68       PLA  
  0x0440E3 $80D3: C-----  28       PLP  
  0x0440E4 $80D4: C-----  30 20    BMI  $80F6
  0x0440E6 $80D6: C-----  20 20 68 JSR  $6820
  0x0440E9 $80D9: C-----  A0 90    LDY  #$90
  0x0440EB $80DB: C-----  D0 C0    BNE  $809D
  0x0440ED $80DD: C-----  C0 C0    CPY  #$C0
  0x0440EF $80DF: C-----  C0 00    CPY  #$00
  0x0440F1 $80E1: C-----  00       BRK  
  0x0440F2 $80E2: C-----  01 0F    ORA  ($0F,X)
  0x0440F4 $80E4: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0440F5 $80E5: C-----  21 28    AND  ($28,X)
  0x0440F7 $80E7: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0440F8 $80E8: C-----  00       BRK  
  0x0440F9 $80E9: C-----  00       BRK  
  0x0440FA $80EA: C-----  00       BRK  
  0x0440FB $80EB: C-----  00       BRK  
  0x0440FC $80EC: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0440FD $80ED: C-----  1E 17 1D ASL  $1D17,X
  0x044100 $80F0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044101 $80F1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044102 $80F2: C-----  01 02    ORA  ($02,X)
  0x044104 $80F4: C-----  84 88    STY  $88
  0x044106 $80F6: C-----  D0 E0    BNE  $80D8
  0x044108 $80F8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x044109 $80F9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04410A $80FA: C-----  FE FC 78 INC  $78FC,X
  0x04410D $80FD: C-----  70 20    BVS  $811F
  0x04410F $80FF: C-----  00       BRK  
  0x044110 $8100: C-----  20 20 40 JSR  $4020
  0x044113 $8103: C-----  40       RTI  
  0x044114 $8104: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044115 $8105: C-----  00       BRK  
  0x044116 $8106: C-----  00       BRK  
  0x044117 $8107: C-----  00       BRK  
  0x044118 $8108: C-----  C0 C0    CPY  #$C0
  0x04411A $810A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04411B $810B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04411C $810C: C-----  00       BRK  
  0x04411D $810D: C-----  00       BRK  
  0x04411E $810E: C-----  00       BRK  
  0x04411F $810F: C-----  00       BRK  
  0x044120 $8110: C-----  00       BRK  
  0x044121 $8111: C-----  00       BRK  
  0x044122 $8112: C-----  00       BRK  
  0x044123 $8113: C-----  01 02    ORA  ($02,X)
  0x044125 $8115: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044126 $8116: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044127 $8117: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044128 $8118: C-----  00       BRK  
  0x044129 $8119: C-----  00       BRK  
  0x04412A $811A: C-----  00       BRK  
  0x04412B $811B: C-----  00       BRK  
  0x04412C $811C: C-----  01 01    ORA  ($01,X)
  0x04412E $811E: C-----  01 01    ORA  ($01,X)
  0x044130 $8120: C-----  08       PHP  
  0x044131 $8121: C-----  10 10    BPL  $8133
  0x044133 $8123: C-----  10 20    BPL  $8145
  0x044135 $8125: C-----  20 40 40 JSR  $4040
  0x044138 $8128: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044139 $8129: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04413A $812A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04413B $812B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04413C $812C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04413D $812D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04413E $812E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04413F $812F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044140 $8130: C-----  06 08    ASL  $08
  0x044142 $8132: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x044143 $8133: C-----  0E 0A 02 ASL  $020A
  0x044146 $8136: C-----  01 00    ORA  ($00,X)
  0x044148 $8138: C-----  01 07    ORA  ($07,X)
  0x04414A $813A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04414B $813B: C-----  01 01    ORA  ($01,X)
  0x04414D $813D: C-----  01 00    ORA  ($00,X)
  0x04414F $813F: C-----  00       BRK  
  0x044150 $8140: C-----  00       BRK  
  0x044151 $8141: C-----  0D B2 44 ORA  $44B2
  0x044154 $8144: C-----  48       PHA  
  0x044155 $8145: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044156 $8146: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044157 $8147: C-----  00       BRK  
  0x044158 $8148: C-----  00       BRK  
  0x044159 $8149: C-----  00       BRK  
  0x04415A $814A: C-----  0D 3B 37 ORA  $373B
  0x04415D $814D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04415E $814E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04415F $814F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044160 $8150: C-----  06 EA    ASL  $EA
  0x044162 $8152: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x044163 $8153: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x044164 $8154: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044165 $8155: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044166 $8156: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044167 $8157: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044168 $8158: C-----  00       BRK  
  0x044169 $8159: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04416A $815A: C-----  CC 9C FC CPY  $FC9C
  0x04416D $815D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04416E $815E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04416F $815F: C-----  F8       SED  
  0x044170 $8160: C-----  00       BRK  
  0x044171 $8161: C-----  00       BRK  
  0x044172 $8162: C-----  00       BRK  
  0x044173 $8163: C-----  00       BRK  
  0x044174 $8164: C-----  00       BRK  
  0x044175 $8165: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044176 $8166: C-----  A0 D1    LDY  #$D1
  0x044178 $8168: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044179 $8169: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04417A $816A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04417B $816B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04417C $816C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04417D $816D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04417E $816E: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04417F $816F: C-----  2E 04 0A ROL  $0A04
  0x044182 $8172: C-----  0E 16 04 ASL  $0416
  0x044185 $8175: C-----  08       PHP  
  0x044186 $8176: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x044187 $8177: C-----  84 F8    STY  $F8
  0x044189 $8179: C-----  F0 F0    BEQ  $816B
  0x04418B $817B: C-----  E8       INX  
  0x04418C $817C: C-----  F8       SED  
  0x04418D $817D: C-----  F0 60    BEQ  $81DF
  0x04418F $817F: C-----  78       SEI  
  0x044190 $8180: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044191 $8181: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044192 $8182: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044193 $8183: C-----  08       PHP  
  0x044194 $8184: C-----  08       PHP  
  0x044195 $8185: C-----  10 10    BPL  $8197
  0x044197 $8187: C-----  20 F8 F8 JSR  $F8F8
  0x04419A $818A: C-----  F8       SED  
  0x04419B $818B: C-----  F0 F0    BEQ  $817D
  0x04419D $818D: C-----  E0 E0    CPX  #$E0
  0x04419F $818F: C-----  C0 FB    CPY  #$FB
  0x0441A1 $8191: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0441A2 $8192: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0441A3 $8193: C-----  3E 18 00 ROL  $0018,X
  0x0441A6 $8196: C-----  00       BRK  
  0x0441A7 $8197: C-----  00       BRK  
  0x0441A8 $8198: C-----  45 69    EOR  $69
  0x0441AA $819A: C-----  3E 18 00 ROL  $0018,X
  0x0441AD $819D: C-----  00       BRK  
  0x0441AE $819E: C-----  00       BRK  
  0x0441AF $819F: C-----  00       BRK  
  0x0441B0 $81A0: C-----  40       RTI  
  0x0441B1 $81A1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0441B2 $81A2: C-----  00       BRK  
  0x0441B3 $81A3: C-----  00       BRK  
  0x0441B4 $81A4: C-----  00       BRK  
  0x0441B5 $81A5: C-----  00       BRK  
  0x0441B6 $81A6: C-----  00       BRK  
  0x0441B7 $81A7: C-----  00       BRK  
  0x0441B8 $81A8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0441B9 $81A9: C-----  00       BRK  
  0x0441BA $81AA: C-----  00       BRK  
  0x0441BB $81AB: C-----  00       BRK  
  0x0441BC $81AC: C-----  00       BRK  
  0x0441BD $81AD: C-----  00       BRK  
  0x0441BE $81AE: C-----  00       BRK  
  0x0441BF $81AF: C-----  00       BRK  
  0x0441C0 $81B0: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x0441C1 $81B1: C-----  E0 00    CPX  #$00
  0x0441C3 $81B3: C-----  00       BRK  
  0x0441C4 $81B4: C-----  00       BRK  
  0x0441C5 $81B5: C-----  00       BRK  
  0x0441C6 $81B6: C-----  00       BRK  
  0x0441C7 $81B7: C-----  00       BRK  
  0x0441C8 $81B8: C-----  60       RTS  
  0x0441C9 $81B9: C-----  00       BRK  
  0x0441CA $81BA: C-----  00       BRK  
  0x0441CB $81BB: C-----  00       BRK  
  0x0441CC $81BC: C-----  00       BRK  
  0x0441CD $81BD: C-----  00       BRK  
  0x0441CE $81BE: C-----  00       BRK  
  0x0441CF $81BF: C-----  00       BRK  
  0x0441D0 $81C0: C-----  88       DEY  
  0x0441D1 $81C1: C-----  B0 C0    BCS  $8183
  0x0441D3 $81C3: C-----  00       BRK  
  0x0441D4 $81C4: C-----  00       BRK  
  0x0441D5 $81C5: C-----  00       BRK  
  0x0441D6 $81C6: C-----  00       BRK  
  0x0441D7 $81C7: C-----  00       BRK  
  0x0441D8 $81C8: C-----  70 40    BVS  $820A
  0x0441DA $81CA: C-----  00       BRK  
  0x0441DB $81CB: C-----  00       BRK  
  0x0441DC $81CC: C-----  00       BRK  
  0x0441DD $81CD: C-----  00       BRK  
  0x0441DE $81CE: C-----  00       BRK  
  0x0441DF $81CF: C-----  00       BRK  
  0x0441E0 $81D0: C-----  00       BRK  
  0x0441E1 $81D1: C-----  00       BRK  
  0x0441E2 $81D2: C-----  00       BRK  
  0x0441E3 $81D3: C-----  00       BRK  
  0x0441E4 $81D4: C-----  00       BRK  
  0x0441E5 $81D5: C-----  00       BRK  
  0x0441E6 $81D6: C-----  01 33    ORA  ($33,X)
  0x0441E8 $81D8: C-----  00       BRK  
  0x0441E9 $81D9: C-----  00       BRK  
  0x0441EA $81DA: C-----  00       BRK  
  0x0441EB $81DB: C-----  00       BRK  
  0x0441EC $81DC: C-----  00       BRK  
  0x0441ED $81DD: C-----  00       BRK  
  0x0441EE $81DE: C-----  00       BRK  
  0x0441EF $81DF: C-----  00       BRK  
  0x0441F0 $81E0: C-----  06 0D    ASL  $0D
  0x0441F2 $81E2: C-----  !!UNDEF $B2  ; unknown opcode, treating as data
  0x0441F3 $81E3: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0441F4 $81E4: C-----  48       PHA  
  0x0441F5 $81E5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0441F6 $81E6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0441F7 $81E7: C-----  00       BRK  
  0x0441F8 $81E8: C-----  00       BRK  
  0x0441F9 $81E9: C-----  00       BRK  
  0x0441FA $81EA: C-----  0D 3B 37 ORA  $373B
  0x0441FD $81ED: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0441FE $81EE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0441FF $81EF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044200 $81F0: C-----  EC B0 41 CPX  $41B0
  0x044203 $81F3: C-----  00       BRK  
  0x044204 $81F4: C-----  00       BRK  
  0x044205 $81F5: C-----  00       BRK  
  0x044206 $81F6: C-----  00       BRK  
  0x044207 $81F7: C-----  00       BRK  
  0x044208 $81F8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044209 $81F9: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x04420A $81FA: C-----  BE FF FF LDX  $FFFF,Y
  0x04420D $81FD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04420E $81FE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04420F $81FF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044210 $8200: C-----  C0 80    CPY  #$80
  0x044212 $8202: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044213 $8203: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044214 $8204: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044215 $8205: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044216 $8206: C-----  C0 40    CPY  #$40
  0x044218 $8208: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044219 $8209: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04421A $820A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04421B $820B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04421C $820C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04421D $820D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04421E $820E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04421F $820F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044220 $8210: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044221 $8211: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044222 $8212: C-----  01 01    ORA  ($01,X)
  0x044224 $8214: C-----  00       BRK  
  0x044225 $8215: C-----  00       BRK  
  0x044226 $8216: C-----  00       BRK  
  0x044227 $8217: C-----  00       BRK  
  0x044228 $8218: C-----  F8       SED  
  0x044229 $8219: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04422A $821A: C-----  FE FE FF INC  $FFFE,X
  0x04422D $821D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04422E $821E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04422F $821F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044230 $8220: C-----  40       RTI  
  0x044231 $8221: C-----  60       RTS  
  0x044232 $8222: C-----  20 20 10 JSR  $1020
  0x044235 $8225: C-----  10 18    BPL  $823F
  0x044237 $8227: C-----  08       PHP  
  0x044238 $8228: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044239 $8229: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04423A $822A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04423B $822B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04423C $822C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04423D $822D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04423E $822E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04423F $822F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044240 $8230: C-----  00       BRK  
  0x044241 $8231: C-----  00       BRK  
  0x044242 $8232: C-----  00       BRK  
  0x044243 $8233: C-----  01 02    ORA  ($02,X)
  0x044245 $8235: C-----  00       BRK  
  0x044246 $8236: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044247 $8237: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044248 $8238: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044249 $8239: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04424A $823A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04424B $823B: C-----  FE FD FF INC  $FFFD,X
  0x04424E $823E: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04424F $823F: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x044250 $8240: C-----  00       BRK  
  0x044251 $8241: C-----  00       BRK  
  0x044252 $8242: C-----  00       BRK  
  0x044253 $8243: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044254 $8244: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044255 $8245: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044256 $8246: C-----  40       RTI  
  0x044257 $8247: C-----  20 00 00 JSR  $0000
  0x04425A $824A: C-----  00       BRK  
  0x04425B $824B: C-----  00       BRK  
  0x04425C $824C: C-----  00       BRK  
  0x04425D $824D: C-----  00       BRK  
  0x04425E $824E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04425F $824F: C-----  C0 20    CPY  #$20
  0x044261 $8251: C-----  10 15    BPL  $8268
  0x044263 $8253: C-----  19 23 2A ORA  $2A23,Y
  0x044266 $8256: C-----  26 1C    ROL  $1C
  0x044268 $8258: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044269 $8259: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04426A $825A: C-----  0A       ASL  A
  0x04426B $825B: C-----  06 1C    ASL  $1C
  0x04426D $825D: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04426E $825E: C-----  18       CLC  
  0x04426F $825F: C-----  00       BRK  
  0x044270 $8260: C-----  20 10 C8 JSR  $C810
  0x044273 $8263: C-----  06 02    ASL  $02
  0x044275 $8265: C-----  0E 1F 3F ASL  $3F1F
  0x044278 $8268: C-----  C0 E0    CPY  #$E0
  0x04427A $826A: C-----  30 F8    BMI  $8264
  0x04427C $826C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04427D $826D: C-----  F0 E6    BEQ  $8255
  0x04427F $826F: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x044280 $8270: C-----  00       BRK  
  0x044281 $8271: C-----  00       BRK  
  0x044282 $8272: C-----  00       BRK  
  0x044283 $8273: C-----  00       BRK  
  0x044284 $8274: C-----  00       BRK  
  0x044285 $8275: C-----  00       BRK  
  0x044286 $8276: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044287 $8277: C-----  C0 00    CPY  #$00
  0x044289 $8279: C-----  00       BRK  
  0x04428A $827A: C-----  00       BRK  
  0x04428B $827B: C-----  00       BRK  
  0x04428C $827C: C-----  00       BRK  
  0x04428D $827D: C-----  00       BRK  
  0x04428E $827E: C-----  00       BRK  
  0x04428F $827F: C-----  00       BRK  
  0x044290 $8280: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x044291 $8281: C-----  0E 07 06 ASL  $0607
  0x044294 $8284: C-----  06 05    ASL  $05
  0x044296 $8286: C-----  05 0C    ORA  $0C
  0x044298 $8288: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044299 $8289: C-----  01 00    ORA  ($00,X)
  0x04429B $828B: C-----  01 01    ORA  ($01,X)
  0x04429D $828D: C-----  00       BRK  
  0x04429E $828E: C-----  00       BRK  
  0x04429F $828F: C-----  00       BRK  
  0x0442A0 $8290: C-----  00       BRK  
  0x0442A1 $8291: C-----  00       BRK  
  0x0442A2 $8292: C-----  00       BRK  
  0x0442A3 $8293: C-----  C0 32    CPY  #$32
  0x0442A5 $8295: C-----  01 00    ORA  ($00,X)
  0x0442A7 $8297: C-----  C1 FF    CMP  ($FF,X)
  0x0442A9 $8299: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0442AA $829A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0442AB $829B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0442AC $829C: C-----  CD FE FF CMP  $FFFE
  0x0442AF $829F: C-----  3E 00 00 ROL  $0000,X
  0x0442B2 $82A2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0442B3 $82A3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0442B4 $82A4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0442B5 $82A5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0442B6 $82A6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0442B7 $82A7: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0442B8 $82A8: C-----  00       BRK  
  0x0442B9 $82A9: C-----  00       BRK  
  0x0442BA $82AA: C-----  00       BRK  
  0x0442BB $82AB: C-----  0D 1F 1F ORA  $1F1F
  0x0442BE $82AE: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0442BF $82AF: C-----  00       BRK  
  0x0442C0 $82B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0442C1 $82B1: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0442C2 $82B2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0442C3 $82B3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0442C4 $82B4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0442C5 $82B5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0442C6 $82B6: C-----  01 01    ORA  ($01,X)
  0x0442C8 $82B8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0442C9 $82B9: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0442CA $82BA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0442CB $82BB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0442CC $82BC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0442CD $82BD: C-----  01 00    ORA  ($00,X)
  0x0442CF $82BF: C-----  00       BRK  
  0x0442D0 $82C0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0442D1 $82C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0442D2 $82C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0442D3 $82C3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0442D4 $82C4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0442D5 $82C5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0442D6 $82C6: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0442D7 $82C7: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0442D8 $82C8: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0442D9 $82C9: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0442DA $82CA: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0442DB $82CB: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0442DC $82CC: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0442DD $82CD: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x0442DE $82CE: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x0442DF $82CF: C-----  00       BRK  
  0x0442E0 $82D0: C-----  E0 F0    CPX  #$F0
  0x0442E2 $82D2: C-----  F8       SED  
  0x0442E3 $82D3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0442E4 $82D4: C-----  FE FE FF INC  $FFFE,X
  0x0442E7 $82D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0442E8 $82D8: C-----  C0 E0    CPY  #$E0
  0x0442EA $82DA: C-----  F0 F8    BEQ  $82D4
  0x0442EC $82DC: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0442ED $82DD: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0442EE $82DE: C-----  FE 7E 80 INC  $807E,X
  0x0442F1 $82E1: C-----  C0 C0    CPY  #$C0
  0x0442F3 $82E3: C-----  E0 E0    CPX  #$E0
  0x0442F5 $82E5: C-----  F0 F8    BEQ  $82DF
  0x0442F7 $82E7: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0442F8 $82E8: C-----  00       BRK  
  0x0442F9 $82E9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0442FA $82EA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0442FB $82EB: C-----  C0 C0    CPY  #$C0
  0x0442FD $82ED: C-----  E0 E0    CPX  #$E0
  0x0442FF $82EF: C-----  78       SEI  
  0x044300 $82F0: C-----  FE FE FE INC  $FEFE,X
  0x044303 $82F3: C-----  FE 7E 30 INC  $307E,X
  0x044306 $82F6: C-----  00       BRK  
  0x044307 $82F7: C-----  00       BRK  
  0x044308 $82F8: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x044309 $82F9: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x04430A $82FA: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x04430B $82FB: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04430C $82FC: C-----  30 00    BMI  $82FE
  0x04430E $82FE: C-----  00       BRK  
  0x04430F $82FF: C-----  00       BRK  
  0x044310 $8300: C-----  E0 C0    CPX  #$C0
  0x044312 $8302: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044313 $8303: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044314 $8304: C-----  00       BRK  
  0x044315 $8305: C-----  00       BRK  
  0x044316 $8306: C-----  00       BRK  
  0x044317 $8307: C-----  00       BRK  
  0x044318 $8308: C-----  00       BRK  
  0x044319 $8309: C-----  00       BRK  
  0x04431A $830A: C-----  00       BRK  
  0x04431B $830B: C-----  00       BRK  
  0x04431C $830C: C-----  00       BRK  
  0x04431D $830D: C-----  00       BRK  
  0x04431E $830E: C-----  00       BRK  
  0x04431F $830F: C-----  00       BRK  
  0x044320 $8310: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044321 $8311: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044322 $8312: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044323 $8313: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044324 $8314: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044325 $8315: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044326 $8316: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044327 $8317: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044328 $8318: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044329 $8319: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04432A $831A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04432B $831B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04432C $831C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04432D $831D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04432E $831E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04432F $831F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044330 $8320: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x044331 $8321: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x044332 $8322: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x044333 $8323: C-----  6E 70 60 ROR  $6070
  0x044336 $8326: C-----  40       RTI  
  0x044337 $8327: C-----  C0 3F    CPY  #$3F
  0x044339 $8329: C-----  30 2C    BMI  $8357
  0x04433B $832B: C-----  11 0F    ORA  ($0F),Y
  0x04433D $832D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04433E $832E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04433F $832F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044340 $8330: C-----  C0 C0    CPY  #$C0
  0x044342 $8332: C-----  C0 60    CPY  #$60
  0x044344 $8334: C-----  20 10 18 JSR  $1810
  0x044347 $8337: C-----  08       PHP  
  0x044348 $8338: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044349 $8339: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04434A $833A: C-----  00       BRK  
  0x04434B $833B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04434C $833C: C-----  C0 E0    CPY  #$E0
  0x04434E $833E: C-----  E0 F0    CPX  #$F0
  0x044350 $8340: C-----  60       RTS  
  0x044351 $8341: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044352 $8342: C-----  B0 E0    BCS  $8324
  0x044354 $8344: C-----  A0 28    LDY  #$28
  0x044356 $8346: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x044357 $8347: C-----  0D 1F 7F ORA  $7F1F
  0x04435A $834A: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x04435B $834B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04435C $834C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04435D $834D: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04435E $834E: C-----  05 02    ORA  $02
  0x044360 $8350: C-----  00       BRK  
  0x044361 $8351: C-----  00       BRK  
  0x044362 $8352: C-----  00       BRK  
  0x044363 $8353: C-----  00       BRK  
  0x044364 $8354: C-----  00       BRK  
  0x044365 $8355: C-----  00       BRK  
  0x044366 $8356: C-----  08       PHP  
  0x044367 $8357: C-----  18       CLC  
  0x044368 $8358: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044369 $8359: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04436A $835A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04436B $835B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04436C $835C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04436D $835D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04436E $835E: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04436F $835F: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x044370 $8360: C-----  00       BRK  
  0x044371 $8361: C-----  01 16    ORA  ($16,X)
  0x044373 $8363: C-----  28       PLP  
  0x044374 $8364: C-----  49 50    EOR  #$50
  0x044376 $8366: C-----  50 40    BVC  $83A8
  0x044378 $8368: C-----  00       BRK  
  0x044379 $8369: C-----  00       BRK  
  0x04437A $836A: C-----  01 07    ORA  ($07,X)
  0x04437C $836C: C-----  26 2F    ROL  $2F
  0x04437E $836E: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04437F $836F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044380 $8370: C-----  00       BRK  
  0x044381 $8371: C-----  BC 43 8C LDY  $8C43,X
  0x044384 $8374: C-----  00       BRK  
  0x044385 $8375: C-----  00       BRK  
  0x044386 $8376: C-----  00       BRK  
  0x044387 $8377: C-----  00       BRK  
  0x044388 $8378: C-----  00       BRK  
  0x044389 $8379: C-----  00       BRK  
  0x04438A $837A: C-----  B8       CLV  
  0x04438B $837B: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x04438C $837C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04438D $837D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04438E $837E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04438F $837F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044390 $8380: C-----  00       BRK  
  0x044391 $8381: C-----  00       BRK  
  0x044392 $8382: C-----  01 03    ORA  ($03,X)
  0x044394 $8384: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044395 $8385: C-----  06 05    ASL  $05
  0x044397 $8387: C-----  05 FF    ORA  $FF
  0x044399 $8389: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04439A $838A: C-----  FE FC FD INC  $FDFC,X
  0x04439D $838D: C-----  F9 FA FA SBC  $FAFA,Y
  0x0443A0 $8390: C-----  20 78 88 JSR  $8878
  0x0443A3 $8393: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0443A4 $8394: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0443A5 $8395: C-----  FE FF FF INC  $FFFF,X
  0x0443A8 $8398: C-----  C0 80    CPY  #$80
  0x0443AA $839A: C-----  70 C0    BVS  $835C
  0x0443AC $839C: C-----  B8       CLV  
  0x0443AD $839D: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0443AE $839E: C-----  7E FF 05 ROR  $05FF,X
  0x0443B1 $83A1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0443B2 $83A2: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0443B3 $83A3: C-----  C1 30    CMP  ($30,X)
  0x0443B5 $83A5: C-----  00       BRK  
  0x0443B6 $83A6: C-----  00       BRK  
  0x0443B7 $83A7: C-----  C1 FA    CMP  ($FA,X)
  0x0443B9 $83A9: C-----  F8       SED  
  0x0443BA $83AA: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0443BB $83AB: C-----  3E CF FF ROL  $FFCF,X
  0x0443BE $83AE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0443BF $83AF: C-----  3E FF FF ROL  $FFFF,X
  0x0443C2 $83B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0443C3 $83B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0443C4 $83B4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0443C5 $83B5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0443C6 $83B6: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0443C7 $83B7: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x0443C8 $83B8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0443C9 $83B9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0443CA $83BA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0443CB $83BB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0443CC $83BC: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0443CD $83BD: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0443CE $83BE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0443CF $83BF: C-----  00       BRK  
  0x0443D0 $83C0: C-----  00       BRK  
  0x0443D1 $83C1: C-----  00       BRK  
  0x0443D2 $83C2: C-----  00       BRK  
  0x0443D3 $83C3: C-----  00       BRK  
  0x0443D4 $83C4: C-----  00       BRK  
  0x0443D5 $83C5: C-----  A0 B0    LDY  #$B0
  0x0443D7 $83C7: C-----  F1 FF    SBC  ($FF),Y
  0x0443D9 $83C9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0443DA $83CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0443DB $83CB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0443DC $83CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0443DD $83CD: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0443DE $83CE: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x0443DF $83CF: C-----  2E 01 02 ROL  $0201
  0x0443E2 $83D2: C-----  05 03    ORA  $03
  0x0443E4 $83D4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0443E5 $83D5: C-----  06 9C    ASL  $9C
  0x0443E7 $83D7: C-----  84 FE    STY  $FE
  0x0443E9 $83D9: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0443EA $83DA: C-----  F8       SED  
  0x0443EB $83DB: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0443EC $83DC: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0443ED $83DD: C-----  F8       SED  
  0x0443EE $83DE: C-----  60       RTS  
  0x0443EF $83DF: C-----  78       SEI  
  0x0443F0 $83E0: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0443F1 $83E1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0443F2 $83E2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0443F3 $83E3: C-----  3E 18 00 ROL  $0018,X
  0x0443F6 $83E6: C-----  00       BRK  
  0x0443F7 $83E7: C-----  00       BRK  
  0x0443F8 $83E8: C-----  75 59    ADC  $59,X
  0x0443FA $83EA: C-----  3E 18 00 ROL  $0018,X
  0x0443FD $83ED: C-----  00       BRK  
  0x0443FE $83EE: C-----  00       BRK  
  0x0443FF $83EF: C-----  00       BRK  
  0x044400 $83F0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044401 $83F1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044402 $83F2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x044403 $83F3: C-----  3E 18 00 ROL  $0018,X
  0x044406 $83F6: C-----  00       BRK  
  0x044407 $83F7: C-----  00       BRK  
  0x044408 $83F8: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x044409 $83F9: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04440A $83FA: C-----  26 18    ROL  $18
  0x04440C $83FC: C-----  00       BRK  
  0x04440D $83FD: C-----  00       BRK  
  0x04440E $83FE: C-----  00       BRK  
  0x04440F $83FF: C-----  00       BRK  
  0x044410 $8400: C-----  00       BRK  
  0x044411 $8401: C-----  00       BRK  
  0x044412 $8402: C-----  00       BRK  
  0x044413 $8403: C-----  00       BRK  
  0x044414 $8404: C-----  00       BRK  
  0x044415 $8405: C-----  A0 B2    LDY  #$B2
  0x044417 $8407: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x044418 $8408: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044419 $8409: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04441A $840A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04441B $840B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04441C $840C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04441D $840D: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04441E $840E: C-----  6D 2D 01 ADC  $012D
  0x044421 $8411: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044422 $8412: C-----  05 03    ORA  $03
  0x044424 $8414: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044425 $8415: C-----  06 1C    ASL  $1C
  0x044427 $8417: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044428 $8418: C-----  FE FC F8 INC  $F8FC,X
  0x04442B $841B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04442C $841C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04442D $841D: C-----  F8       SED  
  0x04442E $841E: C-----  E0 F8    CPX  #$F8
  0x044430 $8420: C-----  F9 FE 7F SBC  $7FFE,Y
  0x044433 $8423: C-----  3E 18 00 ROL  $0018,X
  0x044436 $8426: C-----  00       BRK  
  0x044437 $8427: C-----  00       BRK  
  0x044438 $8428: C-----  76 59    ROR  $59,X
  0x04443A $842A: C-----  3E 18 00 ROL  $0018,X
  0x04443D $842D: C-----  00       BRK  
  0x04443E $842E: C-----  00       BRK  
  0x04443F $842F: C-----  00       BRK  
  0x044440 $8430: C-----  88       DEY  
  0x044441 $8431: C-----  70 C0    BVS  $83F3
  0x044443 $8433: C-----  00       BRK  
  0x044444 $8434: C-----  00       BRK  
  0x044445 $8435: C-----  00       BRK  
  0x044446 $8436: C-----  00       BRK  
  0x044447 $8437: C-----  00       BRK  
  0x044448 $8438: C-----  70 80    BVS  $83BA
  0x04444A $843A: C-----  00       BRK  
  0x04444B $843B: C-----  00       BRK  
  0x04444C $843C: C-----  00       BRK  
  0x04444D $843D: C-----  00       BRK  
  0x04444E $843E: C-----  00       BRK  
  0x04444F $843F: C-----  00       BRK  
  0x044450 $8440: C-----  00       BRK  
  0x044451 $8441: C-----  00       BRK  
  0x044452 $8442: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x044453 $8443: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x044454 $8444: C-----  24 28    BIT  $28
  0x044456 $8446: C-----  28       PLP  
  0x044457 $8447: C-----  20 00 00 JSR  $0000
  0x04445A $844A: C-----  00       BRK  
  0x04445B $844B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04445C $844C: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04445D $844D: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04445E $844E: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04445F $844F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044460 $8450: C-----  00       BRK  
  0x044461 $8451: C-----  DE 20 47 DEC  $4720,X
  0x044464 $8454: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044465 $8455: C-----  00       BRK  
  0x044466 $8456: C-----  00       BRK  
  0x044467 $8457: C-----  00       BRK  
  0x044468 $8458: C-----  00       BRK  
  0x044469 $8459: C-----  00       BRK  
  0x04446A $845A: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04446B $845B: C-----  B8       CLV  
  0x04446C $845C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04446D $845D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04446E $845E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04446F $845F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044470 $8460: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044471 $8461: C-----  01 01    ORA  ($01,X)
  0x044473 $8463: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044474 $8464: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044475 $8465: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044476 $8466: C-----  01 00    ORA  ($00,X)
  0x044478 $8468: C-----  01 00    ORA  ($00,X)
  0x04447A $846A: C-----  00       BRK  
  0x04447B $846B: C-----  01 01    ORA  ($01,X)
  0x04447D $846D: C-----  01 00    ORA  ($00,X)
  0x04447F $846F: C-----  00       BRK  
  0x044480 $8470: C-----  00       BRK  
  0x044481 $8471: C-----  00       BRK  
  0x044482 $8472: C-----  00       BRK  
  0x044483 $8473: C-----  00       BRK  
  0x044484 $8474: C-----  00       BRK  
  0x044485 $8475: C-----  81 AD    STA  ($AD,X)
  0x044487 $8477: C-----  FD FF FF SBC  $FFFF,X
  0x04448A $847A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04448B $847B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04448C $847C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04448D $847D: C-----  7E 52 2E ROR  $2E52,X
  0x044490 $8480: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044491 $8481: C-----  06 0C    ASL  $0C
  0x044493 $8483: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x044494 $8484: C-----  29 4B    AND  #$4B
  0x044496 $8486: C-----  96 2A    STX  $2A,Y
  0x044498 $8488: C-----  00       BRK  
  0x044499 $8489: C-----  00       BRK  
  0x04449A $848A: C-----  00       BRK  
  0x04449B $848B: C-----  08       PHP  
  0x04449C $848C: C-----  10 30    BPL  $84BE
  0x04449E $848E: C-----  60       RTS  
  0x04449F $848F: C-----  C4 00    CPY  $00
  0x0444A1 $8491: C-----  00       BRK  
  0x0444A2 $8492: C-----  01 0E    ORA  ($0E,X)
  0x0444A4 $8494: C-----  30 40    BMI  $84D6
  0x0444A6 $8496: C-----  49 90    EOR  #$90
  0x0444A8 $8498: C-----  00       BRK  
  0x0444A9 $8499: C-----  00       BRK  
  0x0444AA $849A: C-----  00       BRK  
  0x0444AB $849B: C-----  01 0F    ORA  ($0F,X)
  0x0444AD $849D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0444AE $849E: C-----  36 6F    ROL  $6F,X
  0x0444B0 $84A0: C-----  35 4B    AND  $4B,X
  0x0444B2 $84A2: C-----  8D 1A 22 STA  $221A
  0x0444B5 $84A5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0444B6 $84A6: C-----  08       PHP  
  0x0444B7 $84A7: C-----  10 C8    BPL  $8471
  0x0444B9 $84A9: C-----  B0 72    BCS  $851D
  0x0444BB $84AB: C-----  E4 DC    CPX  $DC
  0x0444BD $84AD: C-----  F8       SED  
  0x0444BE $84AE: C-----  F0 E0    BEQ  $8490
  0x0444C0 $84B0: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0444C1 $84B1: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0444C2 $84B2: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0444C3 $84B3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0444C4 $84B4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0444C5 $84B5: C-----  01 01    ORA  ($01,X)
  0x0444C7 $84B7: C-----  00       BRK  
  0x0444C8 $84B8: C-----  01 01    ORA  ($01,X)
  0x0444CA $84BA: C-----  00       BRK  
  0x0444CB $84BB: C-----  01 01    ORA  ($01,X)
  0x0444CD $84BD: C-----  00       BRK  
  0x0444CE $84BE: C-----  00       BRK  
  0x0444CF $84BF: C-----  00       BRK  
  0x0444D0 $84C0: C-----  00       BRK  
  0x0444D1 $84C1: C-----  00       BRK  
  0x0444D2 $84C2: C-----  C0 38    CPY  #$38
  0x0444D4 $84C4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0444D5 $84C5: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x0444D6 $84C6: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0444D7 $84C7: C-----  01 00    ORA  ($00,X)
  0x0444D9 $84C9: C-----  00       BRK  
  0x0444DA $84CA: C-----  00       BRK  
  0x0444DB $84CB: C-----  C0 F8    CPY  #$F8
  0x0444DD $84CD: C-----  28       PLP  
  0x0444DE $84CE: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0444DF $84CF: C-----  FE 01 01 INC  $0101,X
  0x0444E2 $84D2: C-----  01 01    ORA  ($01,X)
  0x0444E4 $84D4: C-----  01 00    ORA  ($00,X)
  0x0444E6 $84D6: C-----  00       BRK  
  0x0444E7 $84D7: C-----  00       BRK  
  0x0444E8 $84D8: C-----  00       BRK  
  0x0444E9 $84D9: C-----  00       BRK  
  0x0444EA $84DA: C-----  00       BRK  
  0x0444EB $84DB: C-----  00       BRK  
  0x0444EC $84DC: C-----  00       BRK  
  0x0444ED $84DD: C-----  00       BRK  
  0x0444EE $84DE: C-----  00       BRK  
  0x0444EF $84DF: C-----  00       BRK  
  0x0444F0 $84E0: C-----  40       RTI  
  0x0444F1 $84E1: C-----  08       PHP  
  0x0444F2 $84E2: C-----  20 A0 02 JSR  $02A0
  0x0444F5 $84E5: C-----  00       BRK  
  0x0444F6 $84E6: C-----  A0 D1    LDY  #$D1
  0x0444F8 $84E8: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0444F9 $84E9: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0444FA $84EA: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0444FB $84EB: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0444FC $84EC: C-----  FD FF 5F SBC  $5FFF,X
  0x0444FF $84EF: C-----  2E 64 12 ROL  $1264
  0x044502 $84F2: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044503 $84F3: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x044504 $84F4: C-----  24 0C    BIT  $0C
  0x044506 $84F6: C-----  84 C8    STY  $C8
  0x044508 $84F8: C-----  98       TYA  
  0x044509 $84F9: C-----  EC FC BC CPX  $BCFC
  0x04450C $84FC: C-----  D8       CLD  
  0x04450D $84FD: C-----  F0 78    BEQ  $8577
  0x04450F $84FF: C-----  B0 00    BCS  $8501
  0x044511 $8501: C-----  00       BRK  
  0x044512 $8502: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044513 $8503: C-----  8C 74 04 STY  $0474
  0x044516 $8506: C-----  08       PHP  
  0x044517 $8507: C-----  08       PHP  
  0x044518 $8508: C-----  00       BRK  
  0x044519 $8509: C-----  00       BRK  
  0x04451A $850A: C-----  00       BRK  
  0x04451B $850B: C-----  00       BRK  
  0x04451C $850C: C-----  88       DEY  
  0x04451D $850D: C-----  F8       SED  
  0x04451E $850E: C-----  F0 F0    BEQ  $8500
  0x044520 $8510: C-----  00       BRK  
  0x044521 $8511: C-----  00       BRK  
  0x044522 $8512: C-----  00       BRK  
  0x044523 $8513: C-----  01 02    ORA  ($02,X)
  0x044525 $8515: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044526 $8516: C-----  0A       ASL  A
  0x044527 $8517: C-----  0A       ASL  A
  0x044528 $8518: C-----  00       BRK  
  0x044529 $8519: C-----  00       BRK  
  0x04452A $851A: C-----  00       BRK  
  0x04452B $851B: C-----  00       BRK  
  0x04452C $851C: C-----  01 01    ORA  ($01,X)
  0x04452E $851E: C-----  01 01    ORA  ($01,X)
  0x044530 $8520: C-----  01 02    ORA  ($02,X)
  0x044532 $8522: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044533 $8523: C-----  01 02    ORA  ($02,X)
  0x044535 $8525: C-----  8C D8 C4 STY  $C4D8
  0x044538 $8528: C-----  FE FC F8 INC  $F8FC,X
  0x04453B $852B: C-----  FE FC 70 INC  $70FC,X
  0x04453E $852E: C-----  A0 B8    LDY  #$B8
  0x044540 $8530: C-----  06 04    ASL  $04
  0x044542 $8532: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x044543 $8533: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x044544 $8534: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044545 $8535: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044546 $8536: C-----  01 00    ORA  ($00,X)
  0x044548 $8538: C-----  01 03    ORA  ($03,X)
  0x04454A $853A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04454B $853B: C-----  01 01    ORA  ($01,X)
  0x04454D $853D: C-----  01 00    ORA  ($00,X)
  0x04454F $853F: C-----  00       BRK  
  0x044550 $8540: C-----  09 13    ORA  #$13
  0x044552 $8542: C-----  B5 5B    LDA  $5B,X
  0x044554 $8544: C-----  50 80    BVC  $84C6
  0x044556 $8546: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044557 $8547: C-----  00       BRK  
  0x044558 $8548: C-----  00       BRK  
  0x044559 $8549: C-----  00       BRK  
  0x04455A $854A: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04455B $854B: C-----  24 2F    BIT  $2F
  0x04455D $854D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04455E $854E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04455F $854F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044560 $8550: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x044561 $8551: C-----  46 AA    LSR  $AA
  0x044563 $8553: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x044564 $8554: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x044565 $8555: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044566 $8556: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044567 $8557: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044568 $8558: C-----  00       BRK  
  0x044569 $8559: C-----  20 44 CC JSR  $CC44
  0x04456C $855C: C-----  BC FC FC LDY  $FCFC,X
  0x04456F $855F: C-----  F8       SED  
  0x044570 $8560: C-----  00       BRK  
  0x044571 $8561: C-----  00       BRK  
  0x044572 $8562: C-----  00       BRK  
  0x044573 $8563: C-----  00       BRK  
  0x044574 $8564: C-----  40       RTI  
  0x044575 $8565: C-----  C0 E0    CPY  #$E0
  0x044577 $8567: C-----  E9 FF    SBC  #$FF
  0x044579 $8569: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04457A $856A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04457B $856B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04457C $856C: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04457D $856D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04457E $856E: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04457F $856F: C-----  56 04    LSR  $04,X
  0x044581 $8571: C-----  0A       ASL  A
  0x044582 $8572: C-----  0E 14 04 ASL  $0414
  0x044585 $8575: C-----  08       PHP  
  0x044586 $8576: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x044587 $8577: C-----  84 F8    STY  $F8
  0x044589 $8579: C-----  F0 F0    BEQ  $856B
  0x04458B $857B: C-----  E8       INX  
  0x04458C $857C: C-----  F8       SED  
  0x04458D $857D: C-----  F0 60    BEQ  $85DF
  0x04458F $857F: C-----  78       SEI  
  0x044590 $8580: C-----  00       BRK  
  0x044591 $8581: C-----  00       BRK  
  0x044592 $8582: C-----  00       BRK  
  0x044593 $8583: C-----  00       BRK  
  0x044594 $8584: C-----  00       BRK  
  0x044595 $8585: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044596 $8586: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x044597 $8587: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x044598 $8588: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044599 $8589: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04459A $858A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04459B $858B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04459C $858C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04459D $858D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04459E $858E: C-----  7D 1A 08 ADC  $081A,X
  0x0445A1 $8591: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0445A2 $8592: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0445A3 $8593: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0445A4 $8594: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0445A5 $8595: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0445A6 $8596: C-----  C8       INY  
  0x0445A7 $8597: C-----  C8       INY  
  0x0445A8 $8598: C-----  F0 F8    BEQ  $8592
  0x0445AA $859A: C-----  F8       SED  
  0x0445AB $859B: C-----  F8       SED  
  0x0445AC $859C: C-----  F8       SED  
  0x0445AD $859D: C-----  F8       SED  
  0x0445AE $859E: C-----  30 B0    BMI  $8550
  0x0445B0 $85A0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0445B1 $85A1: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0445B2 $85A2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0445B3 $85A3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0445B4 $85A4: C-----  0E 00 00 ASL  $0000
  0x0445B7 $85A7: C-----  00       BRK  
  0x0445B8 $85A8: C-----  26 1F    ROL  $1F
  0x0445BA $85AA: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x0445BB $85AB: C-----  0E 00 00 ASL  $0000
  0x0445BE $85AE: C-----  00       BRK  
  0x0445BF $85AF: C-----  00       BRK  
  0x0445C0 $85B0: C-----  00       BRK  
  0x0445C1 $85B1: C-----  00       BRK  
  0x0445C2 $85B2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0445C3 $85B3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0445C4 $85B4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0445C5 $85B5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0445C6 $85B6: C-----  06 05    ASL  $05
  0x0445C8 $85B8: C-----  00       BRK  
  0x0445C9 $85B9: C-----  00       BRK  
  0x0445CA $85BA: C-----  00       BRK  
  0x0445CB $85BB: C-----  00       BRK  
  0x0445CC $85BC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0445CD $85BD: C-----  01 01    ORA  ($01,X)
  0x0445CF $85BF: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0445D0 $85C0: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0445D1 $85C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0445D2 $85C2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0445D3 $85C3: C-----  3E 18 00 ROL  $0018,X
  0x0445D6 $85C6: C-----  00       BRK  
  0x0445D7 $85C7: C-----  00       BRK  
  0x0445D8 $85C8: C-----  65 79    ADC  $79
  0x0445DA $85CA: C-----  3E 18 00 ROL  $0018,X
  0x0445DD $85CD: C-----  00       BRK  
  0x0445DE $85CE: C-----  00       BRK  
  0x0445DF $85CF: C-----  00       BRK  
  0x0445E0 $85D0: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0445E1 $85D1: C-----  16 11    ASL  $11,X
  0x0445E3 $85D3: C-----  08       PHP  
  0x0445E4 $85D4: C-----  06 08    ASL  $08
  0x0445E6 $85D6: C-----  0A       ASL  A
  0x0445E7 $85D7: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0445E8 $85D8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0445E9 $85D9: C-----  09 0E    ORA  #$0E
  0x0445EB $85DB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0445EC $85DC: C-----  01 07    ORA  ($07,X)
  0x0445EE $85DE: C-----  01 01    ORA  ($01,X)
  0x0445F0 $85E0: C-----  00       BRK  
  0x0445F1 $85E1: C-----  00       BRK  
  0x0445F2 $85E2: C-----  00       BRK  
  0x0445F3 $85E3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0445F4 $85E4: C-----  E0 00    CPX  #$00
  0x0445F6 $85E6: C-----  00       BRK  
  0x0445F7 $85E7: C-----  00       BRK  
  0x0445F8 $85E8: C-----  00       BRK  
  0x0445F9 $85E9: C-----  00       BRK  
  0x0445FA $85EA: C-----  00       BRK  
  0x0445FB $85EB: C-----  00       BRK  
  0x0445FC $85EC: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0445FD $85ED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0445FE $85EE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0445FF $85EF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044600 $85F0: C-----  00       BRK  
  0x044601 $85F1: C-----  00       BRK  
  0x044602 $85F2: C-----  00       BRK  
  0x044603 $85F3: C-----  00       BRK  
  0x044604 $85F4: C-----  E0 31    CPX  #$31
  0x044606 $85F6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044607 $85F7: C-----  01 00    ORA  ($00,X)
  0x044609 $85F9: C-----  00       BRK  
  0x04460A $85FA: C-----  00       BRK  
  0x04460B $85FB: C-----  00       BRK  
  0x04460C $85FC: C-----  00       BRK  
  0x04460D $85FD: C-----  C0 E0    CPY  #$E0
  0x04460F $85FF: C-----  FE 02 04 INC  $0402,X
  0x044612 $8602: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044613 $8603: C-----  01 06    ORA  ($06,X)
  0x044615 $8605: C-----  38       SEC  
  0x044616 $8606: C-----  C0 30    CPY  #$30
  0x044618 $8608: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044619 $8609: C-----  F8       SED  
  0x04461A $860A: C-----  F0 FE    BEQ  $860A
  0x04461C $860C: C-----  F8       SED  
  0x04461D $860D: C-----  C0 00    CPY  #$00
  0x04461F $860F: C-----  C0 F9    CPY  #$F9
  0x044621 $8611: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044622 $8612: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x044623 $8613: C-----  3E 18 00 ROL  $0018,X
  0x044626 $8616: C-----  00       BRK  
  0x044627 $8617: C-----  00       BRK  
  0x044628 $8618: C-----  46 69    LSR  $69
  0x04462A $861A: C-----  3E 18 00 ROL  $0018,X
  0x04462D $861D: C-----  00       BRK  
  0x04462E $861E: C-----  00       BRK  
  0x04462F $861F: C-----  00       BRK  
  0x044630 $8620: C-----  00       BRK  
  0x044631 $8621: C-----  00       BRK  
  0x044632 $8622: C-----  F0 20    BEQ  $8644
  0x044634 $8624: C-----  50 F0    BVC  $8616
  0x044636 $8626: C-----  10 20    BPL  $8648
  0x044638 $8628: C-----  00       BRK  
  0x044639 $8629: C-----  00       BRK  
  0x04463A $862A: C-----  00       BRK  
  0x04463B $862B: C-----  C0 80    CPY  #$80
  0x04463D $862D: C-----  00       BRK  
  0x04463E $862E: C-----  E0 C0    CPX  #$C0
  0x044640 $8630: C-----  00       BRK  
  0x044641 $8631: C-----  00       BRK  
  0x044642 $8632: C-----  00       BRK  
  0x044643 $8633: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044644 $8634: C-----  30 40    BMI  $8676
  0x044646 $8636: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044647 $8637: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044648 $8638: C-----  00       BRK  
  0x044649 $8639: C-----  00       BRK  
  0x04464A $863A: C-----  00       BRK  
  0x04464B $863B: C-----  00       BRK  
  0x04464C $863C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04464D $863D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04464E $863E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04464F $863F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x044650 $8640: C-----  D8       CLD  
  0x044651 $8641: C-----  90 A0    BCC  $85E3
  0x044653 $8643: C-----  C0 00    CPY  #$00
  0x044655 $8645: C-----  00       BRK  
  0x044656 $8646: C-----  00       BRK  
  0x044657 $8647: C-----  00       BRK  
  0x044658 $8648: C-----  A0 60    LDY  #$60
  0x04465A $864A: C-----  40       RTI  
  0x04465B $864B: C-----  00       BRK  
  0x04465C $864C: C-----  00       BRK  
  0x04465D $864D: C-----  00       BRK  
  0x04465E $864E: C-----  00       BRK  
  0x04465F $864F: C-----  00       BRK  
  0x044660 $8650: C-----  00       BRK  
  0x044661 $8651: C-----  00       BRK  
  0x044662 $8652: C-----  01 07    ORA  ($07,X)
  0x044664 $8654: C-----  18       CLC  
  0x044665 $8655: C-----  10 20    BPL  $8677
  0x044667 $8657: C-----  A0 00    LDY  #$00
  0x044669 $8659: C-----  00       BRK  
  0x04466A $865A: C-----  00       BRK  
  0x04466B $865B: C-----  00       BRK  
  0x04466C $865C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04466D $865D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04466E $865E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04466F $865F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044670 $8660: C-----  00       BRK  
  0x044671 $8661: C-----  00       BRK  
  0x044672 $8662: C-----  00       BRK  
  0x044673 $8663: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044674 $8664: C-----  40       RTI  
  0x044675 $8665: C-----  20 10 08 JSR  $0810
  0x044678 $8668: C-----  00       BRK  
  0x044679 $8669: C-----  00       BRK  
  0x04467A $866A: C-----  00       BRK  
  0x04467B $866B: C-----  00       BRK  
  0x04467C $866C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04467D $866D: C-----  C0 E0    CPY  #$E0
  0x04467F $866F: C-----  F0 05    BEQ  $8676
  0x044681 $8671: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044682 $8672: C-----  06 03    ASL  $03
  0x044684 $8674: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044685 $8675: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044686 $8676: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044687 $8677: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044688 $8678: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044689 $8679: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04468A $867A: C-----  01 00    ORA  ($00,X)
  0x04468C $867C: C-----  01 01    ORA  ($01,X)
  0x04468E $867E: C-----  00       BRK  
  0x04468F $867F: C-----  00       BRK  
  0x044690 $8680: C-----  01 03    ORA  ($03,X)
  0x044692 $8682: C-----  1E 08 04 ASL  $0408,X
  0x044695 $8685: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044696 $8686: C-----  01 00    ORA  ($00,X)
  0x044698 $8688: C-----  00       BRK  
  0x044699 $8689: C-----  00       BRK  
  0x04469A $868A: C-----  01 07    ORA  ($07,X)
  0x04469C $868C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04469D $868D: C-----  01 00    ORA  ($00,X)
  0x04469F $868F: C-----  00       BRK  
  0x0446A0 $8690: C-----  00       BRK  
  0x0446A1 $8691: C-----  00       BRK  
  0x0446A2 $8692: C-----  00       BRK  
  0x0446A3 $8693: C-----  00       BRK  
  0x0446A4 $8694: C-----  00       BRK  
  0x0446A5 $8695: C-----  00       BRK  
  0x0446A6 $8696: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0446A7 $8697: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x0446A8 $8698: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0446A9 $8699: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0446AA $869A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0446AB $869B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0446AC $869C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0446AD $869D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0446AE $869E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0446AF $869F: C-----  38       SEC  
  0x0446B0 $86A0: C-----  C8       INY  
  0x0446B1 $86A1: C-----  B0 C0    BCS  $8663
  0x0446B3 $86A3: C-----  00       BRK  
  0x0446B4 $86A4: C-----  00       BRK  
  0x0446B5 $86A5: C-----  00       BRK  
  0x0446B6 $86A6: C-----  00       BRK  
  0x0446B7 $86A7: C-----  00       BRK  
  0x0446B8 $86A8: C-----  B0 40    BCS  $86EA
  0x0446BA $86AA: C-----  00       BRK  
  0x0446BB $86AB: C-----  00       BRK  
  0x0446BC $86AC: C-----  00       BRK  
  0x0446BD $86AD: C-----  00       BRK  
  0x0446BE $86AE: C-----  00       BRK  
  0x0446BF $86AF: C-----  00       BRK  
  0x0446C0 $86B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0446C1 $86B1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0446C2 $86B2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0446C3 $86B3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0446C4 $86B4: C-----  0E 00 00 ASL  $0000
  0x0446C7 $86B7: C-----  00       BRK  
  0x0446C8 $86B8: C-----  46 3F    LSR  $3F
  0x0446CA $86BA: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x0446CB $86BB: C-----  0E 00 00 ASL  $0000
  0x0446CE $86BE: C-----  00       BRK  
  0x0446CF $86BF: C-----  00       BRK  
  0x0446D0 $86C0: C-----  08       PHP  
  0x0446D1 $86C1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0446D2 $86C2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0446D3 $86C3: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0446D4 $86C4: C-----  08       PHP  
  0x0446D5 $86C5: C-----  08       PHP  
  0x0446D6 $86C6: C-----  D8       CLD  
  0x0446D7 $86C7: C-----  D0 F0    BNE  $86B9
  0x0446D9 $86C9: C-----  F8       SED  
  0x0446DA $86CA: C-----  F8       SED  
  0x0446DB $86CB: C-----  F0 F0    BEQ  $86BD
  0x0446DD $86CD: C-----  F0 20    BEQ  $86EF
  0x0446DF $86CF: C-----  A0 FF    LDY  #$FF
  0x0446E1 $86D1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0446E2 $86D2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0446E3 $86D3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0446E4 $86D4: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0446E5 $86D5: C-----  00       BRK  
  0x0446E6 $86D6: C-----  00       BRK  
  0x0446E7 $86D7: C-----  00       BRK  
  0x0446E8 $86D8: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0446E9 $86D9: C-----  3D 26 1C AND  $1C26,X
  0x0446EC $86DC: C-----  00       BRK  
  0x0446ED $86DD: C-----  00       BRK  
  0x0446EE $86DE: C-----  00       BRK  
  0x0446EF $86DF: C-----  00       BRK  
  0x0446F0 $86E0: C-----  F0 F0    BEQ  $86D2
  0x0446F2 $86E2: C-----  E0 C0    CPX  #$C0
  0x0446F4 $86E4: C-----  00       BRK  
  0x0446F5 $86E5: C-----  00       BRK  
  0x0446F6 $86E6: C-----  00       BRK  
  0x0446F7 $86E7: C-----  00       BRK  
  0x0446F8 $86E8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0446F9 $86E9: C-----  20 40 00 JSR  $0040
  0x0446FC $86EC: C-----  00       BRK  
  0x0446FD $86ED: C-----  00       BRK  
  0x0446FE $86EE: C-----  00       BRK  
  0x0446FF $86EF: C-----  00       BRK  
  0x044700 $86F0: C-----  D0 A0    BNE  $8692
  0x044702 $86F2: C-----  C0 00    CPY  #$00
  0x044704 $86F4: C-----  00       BRK  
  0x044705 $86F5: C-----  00       BRK  
  0x044706 $86F6: C-----  00       BRK  
  0x044707 $86F7: C-----  00       BRK  
  0x044708 $86F8: C-----  A0 40    LDY  #$40
  0x04470A $86FA: C-----  00       BRK  
  0x04470B $86FB: C-----  00       BRK  
  0x04470C $86FC: C-----  00       BRK  
  0x04470D $86FD: C-----  00       BRK  
  0x04470E $86FE: C-----  00       BRK  
  0x04470F $86FF: C-----  00       BRK  
  0x044710 $8700: C-----  00       BRK  
  0x044711 $8701: C-----  00       BRK  
  0x044712 $8702: C-----  E0 18    CPX  #$18
  0x044714 $8704: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x044715 $8705: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044716 $8706: C-----  01 01    ORA  ($01,X)
  0x044718 $8708: C-----  00       BRK  
  0x044719 $8709: C-----  00       BRK  
  0x04471A $870A: C-----  00       BRK  
  0x04471B $870B: C-----  E0 F0    CPX  #$F0
  0x04471D $870D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04471E $870E: C-----  FE FE 04 INC  $04FE,X
  0x044721 $8711: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044722 $8712: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044723 $8713: C-----  05 02    ORA  $02
  0x044725 $8715: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044726 $8716: C-----  01 00    ORA  ($00,X)
  0x044728 $8718: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044729 $8719: C-----  01 03    ORA  ($03,X)
  0x04472B $871B: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04472C $871C: C-----  01 01    ORA  ($01,X)
  0x04472E $871E: C-----  00       BRK  
  0x04472F $871F: C-----  00       BRK  
  0x044730 $8720: C-----  00       BRK  
  0x044731 $8721: C-----  00       BRK  
  0x044732 $8722: C-----  00       BRK  
  0x044733 $8723: C-----  00       BRK  
  0x044734 $8724: C-----  00       BRK  
  0x044735 $8725: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044736 $8726: C-----  2C FD FF BIT  $FFFD
  0x044739 $8729: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04473A $872A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04473B $872B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04473C $872C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04473D $872D: C-----  FD D3 0A SBC  $0AD3,X
  0x044740 $8730: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044741 $8731: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044742 $8732: C-----  08       PHP  
  0x044743 $8733: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044744 $8734: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044745 $8735: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044746 $8736: C-----  88       DEY  
  0x044747 $8737: C-----  C8       INY  
  0x044748 $8738: C-----  F8       SED  
  0x044749 $8739: C-----  F8       SED  
  0x04474A $873A: C-----  F0 F8    BEQ  $8734
  0x04474C $873C: C-----  F8       SED  
  0x04474D $873D: C-----  F8       SED  
  0x04474E $873E: C-----  70 B0    BVS  $86F0
  0x044750 $8740: C-----  00       BRK  
  0x044751 $8741: C-----  00       BRK  
  0x044752 $8742: C-----  00       BRK  
  0x044753 $8743: C-----  00       BRK  
  0x044754 $8744: C-----  00       BRK  
  0x044755 $8745: C-----  00       BRK  
  0x044756 $8746: C-----  00       BRK  
  0x044757 $8747: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x044758 $8748: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044759 $8749: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04475A $874A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04475B $874B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04475C $874C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04475D $874D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04475E $874E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04475F $874F: C-----  24 02    BIT  $02
  0x044761 $8751: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044762 $8752: C-----  01 01    ORA  ($01,X)
  0x044764 $8754: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044765 $8755: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x044766 $8756: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x044767 $8757: C-----  E8       INX  
  0x044768 $8758: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044769 $8759: C-----  F8       SED  
  0x04476A $875A: C-----  FE FE FC INC  $FCFE,X
  0x04476D $875D: C-----  F0 B8    BEQ  $8717
  0x04476F $875F: C-----  50 FF    BVC  $8760
  0x044771 $8761: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x044772 $8762: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x044773 $8763: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044774 $8764: C-----  0E 00 00 ASL  $0000
  0x044777 $8767: C-----  00       BRK  
  0x044778 $8768: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x044779 $8769: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04477A $876A: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04477B $876B: C-----  0E 00 00 ASL  $0000
  0x04477E $876E: C-----  00       BRK  
  0x04477F $876F: C-----  00       BRK  
  0x044780 $8770: C-----  F0 E0    BEQ  $8752
  0x044782 $8772: C-----  C0 80    CPY  #$80
  0x044784 $8774: C-----  00       BRK  
  0x044785 $8775: C-----  00       BRK  
  0x044786 $8776: C-----  00       BRK  
  0x044787 $8777: C-----  00       BRK  
  0x044788 $8778: C-----  40       RTI  
  0x044789 $8779: C-----  C0 00    CPY  #$00
  0x04478B $877B: C-----  00       BRK  
  0x04478C $877C: C-----  00       BRK  
  0x04478D $877D: C-----  00       BRK  
  0x04478E $877E: C-----  00       BRK  
  0x04478F $877F: C-----  00       BRK  
  0x044790 $8780: C-----  00       BRK  
  0x044791 $8781: C-----  00       BRK  
  0x044792 $8782: C-----  01 0E    ORA  ($0E,X)
  0x044794 $8784: C-----  30 40    BMI  $87C6
  0x044796 $8786: C-----  !!UNDEF $89  ; unknown opcode, treating as data
  0x044797 $8787: C-----  90 00    BCC  $8789
  0x044799 $8789: C-----  00       BRK  
  0x04479A $878A: C-----  00       BRK  
  0x04479B $878B: C-----  01 0F    ORA  ($0F,X)
  0x04479D $878D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04479E $878E: C-----  76 6F    ROR  $6F,X
  0x0447A0 $8790: C-----  D9 FF 7F CMP  $7FFF,Y
  0x0447A3 $8793: C-----  3E 1C 00 ROL  $001C,X
  0x0447A6 $8796: C-----  00       BRK  
  0x0447A7 $8797: C-----  00       BRK  
  0x0447A8 $8798: C-----  26 49    ROL  $49
  0x0447AA $879A: C-----  3E 1C 00 ROL  $001C,X
  0x0447AD $879D: C-----  00       BRK  
  0x0447AE $879E: C-----  00       BRK  
  0x0447AF $879F: C-----  00       BRK  
  0x0447B0 $87A0: C-----  40       RTI  
  0x0447B1 $87A1: C-----  08       PHP  
  0x0447B2 $87A2: C-----  20 A0 02 JSR  $02A0
  0x0447B5 $87A5: C-----  00       BRK  
  0x0447B6 $87A6: C-----  A0 91    LDY  #$91
  0x0447B8 $87A8: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0447B9 $87A9: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0447BA $87AA: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0447BB $87AB: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0447BC $87AC: C-----  FD FF 5F SBC  $5FFF,X
  0x0447BF $87AF: C-----  6E DF EF ROR  $EFDF
  0x0447C2 $87B2: ------  .byte $9F
  0x0447C3 $87B3: ------  .byte $E7
  0x0447C4 $87B4: ------  .byte $F8
  0x0447C5 $87B5: ------  .byte $FF
  0x0447C6 $87B6: ------  .byte $FF
  0x0447C7 $87B7: ------  .byte $BF
  0x0447C8 $87B8: ------  .byte $60
  0x0447C9 $87B9: ------  .byte $F0
  0x0447CA $87BA: ------  .byte $F8
  0x0447CB $87BB: ------  .byte $9F
  0x0447CC $87BC: ------  .byte $87
  0x0447CD $87BD: ------  .byte $80
  0x0447CE $87BE: ------  .byte $80
  0x0447CF $87BF: ------  .byte $C0
  0x0447D0 $87C0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0447D1 $87C1: C-----  0E 1E 3C ASL  $3C1E
  0x0447D4 $87C4: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x0447D5 $87C5: C-----  4A       LSR  A
  0x0447D6 $87C6: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x0447D7 $87C7: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x0447D8 $87C8: C-----  00       BRK  
  0x0447D9 $87C9: C-----  01 01    ORA  ($01,X)
  0x0447DB $87CB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0447DC $87CC: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x0447DD $87CD: C-----  35 2C    AND  $2C,X
  0x0447DF $87CF: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0447E0 $87D0: C-----  C0 70    CPY  #$70
  0x0447E2 $87D2: C-----  78       SEI  
  0x0447E3 $87D3: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x0447E4 $87D4: C-----  36 52    ROL  $52,X
  0x0447E6 $87D6: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x0447E7 $87D7: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x0447E8 $87D8: C-----  00       BRK  
  0x0447E9 $87D9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0447EA $87DA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0447EB $87DB: C-----  08       PHP  
  0x0447EC $87DC: C-----  C8       INY  
  0x0447ED $87DD: C-----  AC 34 38 LDY  $3834
  0x0447F0 $87E0: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0447F1 $87E1: C-----  F9 71 69 SBC  $6971,Y
  0x0447F4 $87E4: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x0447F5 $87E5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0447F6 $87E6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0447F7 $87E7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0447F8 $87E8: C-----  08       PHP  
  0x0447F9 $87E9: C-----  06 0E    ASL  $0E
  0x0447FB $87EB: C-----  16 08    ASL  $08,X
  0x0447FD $87ED: C-----  00       BRK  
  0x0447FE $87EE: C-----  00       BRK  
  0x0447FF $87EF: C-----  00       BRK  
  0x044800 $87F0: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x044801 $87F1: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x044802 $87F2: C-----  0E 16 A4 ASL  $A416
  0x044805 $87F5: C-----  C8       INY  
  0x044806 $87F6: C-----  F0 C0    BEQ  $87B8
  0x044808 $87F8: C-----  10 60    BPL  $885A
  0x04480A $87FA: C-----  F0 E8    BEQ  $87E4
  0x04480C $87FC: C-----  58       CLI  
  0x04480D $87FD: C-----  30 00    BMI  $87FF
  0x04480F $87FF: C-----  00       BRK  
  0x044810 $8800: ------  .byte $00
  0x044811 $8801: ------  .byte $00
  0x044812 $8802: ------  .byte $00
  0x044813 $8803: ------  .byte $00
  0x044814 $8804: ------  .byte $00
  0x044815 $8805: ------  .byte $00
  0x044816 $8806: ------  .byte $00
  0x044817 $8807: ------  .byte $00
  0x044818 $8808: ------  .byte $00
  0x044819 $8809: ------  .byte $00
  0x04481A $880A: ------  .byte $00
  0x04481B $880B: ------  .byte $00
  0x04481C $880C: ------  .byte $00
  0x04481D $880D: ------  .byte $00
  0x04481E $880E: ------  .byte $00
  0x04481F $880F: ------  .byte $00
  0x044820 $8810: ------  .byte $FF
  0x044821 $8811: ------  .byte $FF
  0x044822 $8812: ------  .byte $FF
  0x044823 $8813: ------  .byte $FF
  0x044824 $8814: ------  .byte $FF
  0x044825 $8815: ------  .byte $FF
  0x044826 $8816: ------  .byte $FF
  0x044827 $8817: ------  .byte $FF
  0x044828 $8818: ------  .byte $00
  0x044829 $8819: ------  .byte $00
  0x04482A $881A: ------  .byte $00
  0x04482B $881B: ------  .byte $00
  0x04482C $881C: ------  .byte $00
  0x04482D $881D: ------  .byte $00
  0x04482E $881E: ------  .byte $00
  0x04482F $881F: ------  .byte $00
  0x044830 $8820: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044831 $8821: C-----  05 0A    ORA  $0A
  0x044833 $8823: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044834 $8824: C-----  29 52    AND  #$52
  0x044836 $8826: C-----  A6 4D    LDX  $4D
  0x044838 $8828: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044839 $8829: C-----  05 0A    ORA  $0A
  0x04483B $882B: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04483C $882C: C-----  29 52    AND  #$52
  0x04483E $882E: C-----  A6 4D    LDX  $4D
  0x044840 $8830: C-----  D0 28    BNE  $885A
  0x044842 $8832: C-----  50 B4    BVC  $87E8
  0x044844 $8834: C-----  60       RTS  
  0x044845 $8835: C-----  D0 A0    BNE  $87D7
  0x044847 $8837: C-----  00       BRK  
  0x044848 $8838: C-----  D5 2C    CMP  $2C,X
  0x04484A $883A: C-----  !!UNDEF $5A  ; unknown opcode, treating as data
  0x04484B $883B: C-----  B4 68    LDY  $68,X
  0x04484D $883D: C-----  D0 A0    BNE  $87DF
  0x04484F $883F: C-----  00       BRK  
  0x044850 $8840: C-----  01 03    ORA  ($03,X)
  0x044852 $8842: C-----  06 15    ASL  $15
  0x044854 $8844: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x044855 $8845: C-----  56 4D    LSR  $4D,X
  0x044857 $8847: C-----  BA       TSX  
  0x044858 $8848: C-----  01 03    ORA  ($03,X)
  0x04485A $884A: C-----  06 15    ASL  $15
  0x04485C $884C: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x04485D $884D: C-----  56 4D    LSR  $4D,X
  0x04485F $884F: C-----  BA       TSX  
  0x044860 $8850: C-----  B5 6A    LDA  $6A,X
  0x044862 $8852: C-----  94 6A    STY  $6A,X
  0x044864 $8854: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x044865 $8855: C-----  A8       TAY  
  0x044866 $8856: C-----  50 80    BVC  $87D8
  0x044868 $8858: C-----  B5 6A    LDA  $6A,X
  0x04486A $885A: C-----  94 6A    STY  $6A,X
  0x04486C $885C: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x04486D $885D: C-----  A8       TAY  
  0x04486E $885E: C-----  50 80    BVC  $87E0
  0x044870 $8860: C-----  01 00    ORA  ($00,X)
  0x044872 $8862: C-----  01 02    ORA  ($02,X)
  0x044874 $8864: C-----  01 02    ORA  ($02,X)
  0x044876 $8866: C-----  00       BRK  
  0x044877 $8867: C-----  00       BRK  
  0x044878 $8868: C-----  01 00    ORA  ($00,X)
  0x04487A $886A: C-----  01 02    ORA  ($02,X)
  0x04487C $886C: C-----  01 02    ORA  ($02,X)
  0x04487E $886E: C-----  00       BRK  
  0x04487F $886F: C-----  00       BRK  
  0x044880 $8870: C-----  75 AA    ADC  $AA,X
  0x044882 $8872: C-----  5E BC 68 LSR  $68BC,X
  0x044885 $8875: C-----  50 A0    BVC  $8817
  0x044887 $8877: C-----  00       BRK  
  0x044888 $8878: C-----  75 AA    ADC  $AA,X
  0x04488A $887A: C-----  5E BC 68 LSR  $68BC,X
  0x04488D $887D: C-----  50 A0    BVC  $881F
  0x04488F $887F: C-----  00       BRK  
  0x044890 $8880: C-----  00       BRK  
  0x044891 $8881: C-----  00       BRK  
  0x044892 $8882: C-----  00       BRK  
  0x044893 $8883: C-----  00       BRK  
  0x044894 $8884: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044895 $8885: C-----  08       PHP  
  0x044896 $8886: C-----  90 68    BCC  $88F0
  0x044898 $8888: C-----  01 02    ORA  ($02,X)
  0x04489A $888A: C-----  05 12    ORA  $12
  0x04489C $888C: C-----  25 4A    AND  $4A
  0x04489E $888E: C-----  95 6A    STA  $6A,X
  0x0448A0 $8890: C-----  00       BRK  
  0x0448A1 $8891: C-----  00       BRK  
  0x0448A2 $8892: C-----  00       BRK  
  0x0448A3 $8893: C-----  00       BRK  
  0x0448A4 $8894: C-----  00       BRK  
  0x0448A5 $8895: C-----  00       BRK  
  0x0448A6 $8896: C-----  00       BRK  
  0x0448A7 $8897: C-----  00       BRK  
  0x0448A8 $8898: C-----  68       PLA  
  0x0448A9 $8899: C-----  D0 20    BNE  $88BB
  0x0448AB $889B: C-----  C0 40    CPY  #$40
  0x0448AD $889D: C-----  A0 40    LDY  #$40
  0x0448AF $889F: C-----  00       BRK  
  0x0448B0 $88A0: C-----  00       BRK  
  0x0448B1 $88A1: C-----  00       BRK  
  0x0448B2 $88A2: C-----  00       BRK  
  0x0448B3 $88A3: C-----  00       BRK  
  0x0448B4 $88A4: C-----  00       BRK  
  0x0448B5 $88A5: C-----  01 01    ORA  ($01,X)
  0x0448B7 $88A7: C-----  01 00    ORA  ($00,X)
  0x0448B9 $88A9: C-----  00       BRK  
  0x0448BA $88AA: C-----  00       BRK  
  0x0448BB $88AB: C-----  00       BRK  
  0x0448BC $88AC: C-----  00       BRK  
  0x0448BD $88AD: C-----  00       BRK  
  0x0448BE $88AE: C-----  00       BRK  
  0x0448BF $88AF: C-----  00       BRK  
  0x0448C0 $88B0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0448C1 $88B1: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0448C2 $88B2: C-----  60       RTS  
  0x0448C3 $88B3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0448C4 $88B4: C-----  88       DEY  
  0x0448C5 $88B5: C-----  05 06    ORA  $06
  0x0448C7 $88B7: C-----  05 00    ORA  $00
  0x0448C9 $88B9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0448CA $88BA: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0448CB $88BB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0448CC $88BC: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0448CD $88BD: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x0448CE $88BE: C-----  F9 FA 00 SBC  $00FA,Y
  0x0448D1 $88C1: C-----  00       BRK  
  0x0448D2 $88C2: C-----  01 0A    ORA  ($0A,X)
  0x0448D4 $88C4: C-----  24 48    BIT  $48
  0x0448D6 $88C6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0448D7 $88C7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0448D8 $88C8: C-----  00       BRK  
  0x0448D9 $88C9: C-----  00       BRK  
  0x0448DA $88CA: C-----  00       BRK  
  0x0448DB $88CB: C-----  00       BRK  
  0x0448DC $88CC: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0448DD $88CD: C-----  24 58    BIT  $58
  0x0448DF $88CF: C-----  30 EB    BMI  $88BC
  0x0448E1 $88D1: C-----  D6 FE    DEC  $FE,X
  0x0448E3 $88D3: C-----  FD 7A FD SBC  $FD7A,X
  0x0448E6 $88D6: C-----  06 07    ASL  $07
  0x0448E8 $88D8: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0448E9 $88D9: C-----  28       PLP  
  0x0448EA $88DA: C-----  00       BRK  
  0x0448EB $88DB: C-----  00       BRK  
  0x0448EC $88DC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0448ED $88DD: C-----  00       BRK  
  0x0448EE $88DE: C-----  00       BRK  
  0x0448EF $88DF: C-----  00       BRK  
  0x0448F0 $88E0: C-----  FE 01 00 INC  $0001,X
  0x0448F3 $88E3: C-----  00       BRK  
  0x0448F4 $88E4: C-----  00       BRK  
  0x0448F5 $88E5: C-----  50 AA    BVC  $8891
  0x0448F7 $88E7: C-----  55 00    EOR  $00,X
  0x0448F9 $88E9: C-----  FE FF FF INC  $FFFF,X
  0x0448FC $88EC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0448FD $88ED: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x0448FE $88EE: C-----  55 AA    EOR  $AA,X
  0x044900 $88F0: C-----  00       BRK  
  0x044901 $88F1: C-----  00       BRK  
  0x044902 $88F2: C-----  F8       SED  
  0x044903 $88F3: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x044904 $88F4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044905 $88F5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044906 $88F6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044907 $88F7: C-----  00       BRK  
  0x044908 $88F8: C-----  00       BRK  
  0x044909 $88F9: C-----  00       BRK  
  0x04490A $88FA: C-----  00       BRK  
  0x04490B $88FB: C-----  78       SEI  
  0x04490C $88FC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04490D $88FD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04490E $88FE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04490F $88FF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044910 $8900: C-----  00       BRK  
  0x044911 $8901: C-----  00       BRK  
  0x044912 $8902: C-----  00       BRK  
  0x044913 $8903: C-----  00       BRK  
  0x044914 $8904: C-----  30 38    BMI  $893E
  0x044916 $8906: C-----  38       SEC  
  0x044917 $8907: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x044918 $8908: C-----  00       BRK  
  0x044919 $8909: C-----  00       BRK  
  0x04491A $890A: C-----  00       BRK  
  0x04491B $890B: C-----  00       BRK  
  0x04491C $890C: C-----  00       BRK  
  0x04491D $890D: C-----  10 10    BPL  $891F
  0x04491F $890F: C-----  18       CLC  
  0x044920 $8910: C-----  01 03    ORA  ($03,X)
  0x044922 $8912: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044923 $8913: C-----  05 0B    ORA  $0B
  0x044925 $8915: C-----  0D 1B 1D ORA  $1D1B
  0x044928 $8918: C-----  00       BRK  
  0x044929 $8919: C-----  00       BRK  
  0x04492A $891A: C-----  00       BRK  
  0x04492B $891B: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04492C $891C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04492D $891D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04492E $891E: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04492F $891F: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044930 $8920: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044931 $8921: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x044932 $8922: C-----  78       SEI  
  0x044933 $8923: C-----  38       SEC  
  0x044934 $8924: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x044935 $8925: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x044936 $8926: C-----  84 88    STY  $88
  0x044938 $8928: C-----  58       CLI  
  0x044939 $8929: C-----  38       SEC  
  0x04493A $892A: C-----  30 00    BMI  $892C
  0x04493C $892C: C-----  38       SEC  
  0x04493D $892D: C-----  38       SEC  
  0x04493E $892E: C-----  78       SEI  
  0x04493F $892F: C-----  70 2F    BVS  $8960
  0x044941 $8931: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x044942 $8932: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x044943 $8933: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x044944 $8934: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x044945 $8935: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x044946 $8936: C-----  84 88    STY  $88
  0x044948 $8938: C-----  10 08    BPL  $8942
  0x04494A $893A: C-----  10 23    BPL  $895F
  0x04494C $893C: C-----  10 38    BPL  $8976
  0x04494E $893E: C-----  78       SEI  
  0x04494F $893F: C-----  70 07    BVS  $8948
  0x044951 $8941: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044952 $8942: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044953 $8943: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044954 $8944: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044955 $8945: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044956 $8946: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x044957 $8947: C-----  F8       SED  
  0x044958 $8948: C-----  F8       SED  
  0x044959 $8949: C-----  F0 F0    BEQ  $893B
  0x04495B $894B: C-----  E0 E0    CPX  #$E0
  0x04495D $894D: C-----  E0 C0    CPX  #$C0
  0x04495F $894F: C-----  00       BRK  
  0x044960 $8950: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044961 $8951: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x044962 $8952: C-----  78       SEI  
  0x044963 $8953: C-----  38       SEC  
  0x044964 $8954: C-----  78       SEI  
  0x044965 $8955: C-----  78       SEI  
  0x044966 $8956: C-----  F8       SED  
  0x044967 $8957: C-----  F8       SED  
  0x044968 $8958: C-----  58       CLI  
  0x044969 $8959: C-----  38       SEC  
  0x04496A $895A: C-----  30 10    BMI  $896C
  0x04496C $895C: C-----  30 30    BMI  $898E
  0x04496E $895E: C-----  70 70    BVS  $89D0
  0x044970 $8960: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044971 $8961: C-----  08       PHP  
  0x044972 $8962: C-----  10 30    BPL  $8994
  0x044974 $8964: C-----  E0 C0    CPX  #$C0
  0x044976 $8966: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044977 $8967: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044978 $8968: C-----  00       BRK  
  0x044979 $8969: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04497A $896A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04497B $896B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04497C $896C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04497D $896D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04497E $896E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04497F $896F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x044980 $8970: C-----  F8       SED  
  0x044981 $8971: C-----  F0 30    BEQ  $89A3
  0x044983 $8973: C-----  10 10    BPL  $8985
  0x044985 $8975: C-----  10 20    BPL  $8997
  0x044987 $8977: C-----  C0 F0    CPY  #$F0
  0x044989 $8979: C-----  20 C0 E0 JSR  $E0C0
  0x04498C $897C: C-----  E0 E0    CPX  #$E0
  0x04498E $897E: C-----  C0 00    CPY  #$00
  0x044990 $8980: C-----  08       PHP  
  0x044991 $8981: C-----  08       PHP  
  0x044992 $8982: C-----  10 10    BPL  $8994
  0x044994 $8984: C-----  20 20 40 JSR  $4020
  0x044997 $8987: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044998 $8988: C-----  F0 F0    BEQ  $897A
  0x04499A $898A: C-----  E0 E0    CPX  #$E0
  0x04499C $898C: C-----  C0 C0    CPY  #$C0
  0x04499E $898E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04499F $898F: C-----  00       BRK  
  0x0449A0 $8990: C-----  88       DEY  
  0x0449A1 $8991: C-----  30 F8    BMI  $898B
  0x0449A3 $8993: C-----  F8       SED  
  0x0449A4 $8994: C-----  F8       SED  
  0x0449A5 $8995: C-----  C0 00    CPY  #$00
  0x0449A7 $8997: C-----  00       BRK  
  0x0449A8 $8998: C-----  70 C0    BVS  $895A
  0x0449AA $899A: C-----  00       BRK  
  0x0449AB $899B: C-----  00       BRK  
  0x0449AC $899C: C-----  00       BRK  
  0x0449AD $899D: C-----  00       BRK  
  0x0449AE $899E: C-----  00       BRK  
  0x0449AF $899F: C-----  00       BRK  
  0x0449B0 $89A0: C-----  01 01    ORA  ($01,X)
  0x0449B2 $89A2: C-----  06 38    ASL  $38
  0x0449B4 $89A4: C-----  E0 C0    CPX  #$C0
  0x0449B6 $89A6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0449B7 $89A7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0449B8 $89A8: C-----  00       BRK  
  0x0449B9 $89A9: C-----  00       BRK  
  0x0449BA $89AA: C-----  01 07    ORA  ($07,X)
  0x0449BC $89AC: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0449BD $89AD: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0449BE $89AE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0449BF $89AF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0449C0 $89B0: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x0449C1 $89B1: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x0449C2 $89B2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0449C3 $89B3: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0449C4 $89B4: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0449C5 $89B5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0449C6 $89B6: C-----  EE DD 54 INC  $54DD
  0x0449C9 $89B9: C-----  28       PLP  
  0x0449CA $89BA: C-----  00       BRK  
  0x0449CB $89BB: C-----  00       BRK  
  0x0449CC $89BC: C-----  00       BRK  
  0x0449CD $89BD: C-----  00       BRK  
  0x0449CE $89BE: C-----  00       BRK  
  0x0449CF $89BF: C-----  00       BRK  
  0x0449D0 $89C0: C-----  81 01    STA  ($01,X)
  0x0449D2 $89C2: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x0449D3 $89C3: C-----  16 AC    ASL  $AC,X
  0x0449D5 $89C5: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x0449D6 $89C6: C-----  A8       TAY  
  0x0449D7 $89C7: C-----  70 7E    BVS  $8A47
  0x0449D9 $89C9: C-----  FE 7C E8 INC  $E87C,X
  0x0449DC $89CC: C-----  50 A8    BVC  $8976
  0x0449DE $89CE: C-----  50 80    BVC  $8950
  0x0449E0 $89D0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0449E1 $89D1: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0449E2 $89D2: C-----  48       PHA  
  0x0449E3 $89D3: C-----  B4 8A    LDY  $8A,X
  0x0449E5 $89D5: C-----  05 06    ORA  $06
  0x0449E7 $89D7: C-----  05 00    ORA  $00
  0x0449E9 $89D9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0449EA $89DA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0449EB $89DB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0449EC $89DC: C-----  01 02    ORA  ($02,X)
  0x0449EE $89DE: C-----  01 02    ORA  ($02,X)
  0x0449F0 $89E0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0449F1 $89E1: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x0449F2 $89E2: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x0449F3 $89E3: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x0449F4 $89E4: C-----  EA       NOP  
  0x0449F5 $89E5: C-----  E8       INX  
  0x0449F6 $89E6: C-----  D0 80    BNE  $8968
  0x0449F8 $89E8: C-----  00       BRK  
  0x0449F9 $89E9: C-----  00       BRK  
  0x0449FA $89EA: C-----  00       BRK  
  0x0449FB $89EB: C-----  00       BRK  
  0x0449FC $89EC: C-----  00       BRK  
  0x0449FD $89ED: C-----  00       BRK  
  0x0449FE $89EE: C-----  00       BRK  
  0x0449FF $89EF: C-----  00       BRK  
  0x044A00 $89F0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044A01 $89F1: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x044A02 $89F2: C-----  48       PHA  
  0x044A03 $89F3: C-----  B4 8A    LDY  $8A,X
  0x044A05 $89F5: C-----  05 06    ORA  $06
  0x044A07 $89F7: C-----  05 00    ORA  $00
  0x044A09 $89F9: C-----  00       BRK  
  0x044A0A $89FA: C-----  30 48    BMI  $8A44
  0x044A0C $89FC: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x044A0D $89FD: C-----  F8       SED  
  0x044A0E $89FE: C-----  F8       SED  
  0x044A0F $89FF: C-----  F8       SED  
  0x044A10 $8A00: C-----  01 03    ORA  ($03,X)
  0x044A12 $8A02: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044A13 $8A03: C-----  05 0B    ORA  $0B
  0x044A15 $8A05: C-----  0D 1B 15 ORA  $151B
  0x044A18 $8A08: C-----  00       BRK  
  0x044A19 $8A09: C-----  00       BRK  
  0x044A1A $8A0A: C-----  00       BRK  
  0x044A1B $8A0B: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044A1C $8A0C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044A1D $8A0D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044A1E $8A0E: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044A1F $8A0F: C-----  0A       ASL  A
  0x044A20 $8A10: C-----  06 0F    ASL  $0F
  0x044A22 $8A12: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044A23 $8A13: C-----  0E 17 17 ASL  $1717
  0x044A26 $8A16: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x044A27 $8A17: C-----  F8       SED  
  0x044A28 $8A18: C-----  F9 F0 F0 SBC  $F0F0,Y
  0x044A2B $8A1B: C-----  F1 E8    SBC  ($E8),Y
  0x044A2D $8A1D: C-----  E8       INX  
  0x044A2E $8A1E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044A2F $8A1F: C-----  00       BRK  
  0x044A30 $8A20: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x044A31 $8A21: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x044A32 $8A22: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x044A33 $8A23: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x044A34 $8A24: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x044A35 $8A25: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x044A36 $8A26: C-----  A4 98    LDY  $98
  0x044A38 $8A28: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044A39 $8A29: C-----  08       PHP  
  0x044A3A $8A2A: C-----  10 20    BPL  $8A4C
  0x044A3C $8A2C: C-----  10 28    BPL  $8A56
  0x044A3E $8A2E: C-----  58       CLI  
  0x044A3F $8A2F: C-----  60       RTS  
  0x044A40 $8A30: C-----  F8       SED  
  0x044A41 $8A31: C-----  CA       DEX  
  0x044A42 $8A32: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044A43 $8A33: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044A44 $8A34: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044A45 $8A35: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044A46 $8A36: C-----  00       BRK  
  0x044A47 $8A37: C-----  00       BRK  
  0x044A48 $8A38: C-----  00       BRK  
  0x044A49 $8A39: C-----  30 E2    BMI  $8A1D
  0x044A4B $8A3B: C-----  0E 1F 00 ASL  $001F
  0x044A4E $8A3E: C-----  00       BRK  
  0x044A4F $8A3F: C-----  00       BRK  
  0x044A50 $8A40: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x044A51 $8A41: C-----  D6 FE    DEC  $FE,X
  0x044A53 $8A43: C-----  FD 7A FD SBC  $FD7A,X
  0x044A56 $8A46: C-----  06 07    ASL  $07
  0x044A58 $8A48: C-----  00       BRK  
  0x044A59 $8A49: C-----  01 01    ORA  ($01,X)
  0x044A5B $8A4B: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044A5C $8A4C: C-----  05 02    ORA  $02
  0x044A5E $8A4E: C-----  01 00    ORA  ($00,X)
  0x044A60 $8A50: C-----  00       BRK  
  0x044A61 $8A51: C-----  01 23    ORA  ($23,X)
  0x044A63 $8A53: C-----  45 AB    EOR  $AB
  0x044A65 $8A55: C-----  55 AB    EOR  $AB,X
  0x044A67 $8A57: C-----  55 FF    EOR  $FF,X
  0x044A69 $8A59: C-----  FE DC BA INC  $BADC,X
  0x044A6C $8A5C: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x044A6D $8A5D: C-----  AA       TAX  
  0x044A6E $8A5E: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x044A6F $8A5F: C-----  AA       TAX  
  0x044A70 $8A60: C-----  05 04    ORA  $04
  0x044A72 $8A62: C-----  08       PHP  
  0x044A73 $8A63: C-----  F9 8A 55 SBC  $558A,Y
  0x044A76 $8A66: C-----  EA       NOP  
  0x044A77 $8A67: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044A78 $8A68: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044A79 $8A69: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044A7A $8A6A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044A7B $8A6B: C-----  06 75    ASL  $75
  0x044A7D $8A6D: C-----  AA       TAX  
  0x044A7E $8A6E: C-----  15 00    ORA  $00,X
  0x044A80 $8A70: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x044A81 $8A71: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x044A82 $8A72: C-----  3E 5C B8 ROL  $B85C,X
  0x044A85 $8A75: C-----  48       PHA  
  0x044A86 $8A76: C-----  84 03    STY  $03
  0x044A88 $8A78: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x044A89 $8A79: C-----  28       PLP  
  0x044A8A $8A7A: C-----  00       BRK  
  0x044A8B $8A7B: C-----  00       BRK  
  0x044A8C $8A7C: C-----  00       BRK  
  0x044A8D $8A7D: C-----  00       BRK  
  0x044A8E $8A7E: C-----  00       BRK  
  0x044A8F $8A7F: C-----  00       BRK  
  0x044A90 $8A80: C-----  01 01    ORA  ($01,X)
  0x044A92 $8A82: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044A93 $8A83: C-----  09 3F    ORA  #$3F
  0x044A95 $8A85: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044A96 $8A86: C-----  00       BRK  
  0x044A97 $8A87: C-----  00       BRK  
  0x044A98 $8A88: C-----  00       BRK  
  0x044A99 $8A89: C-----  00       BRK  
  0x044A9A $8A8A: C-----  00       BRK  
  0x044A9B $8A8B: C-----  06 00    ASL  $00
  0x044A9D $8A8D: C-----  00       BRK  
  0x044A9E $8A8E: C-----  00       BRK  
  0x044A9F $8A8F: C-----  00       BRK  
  0x044AA0 $8A90: C-----  A8       TAY  
  0x044AA1 $8A91: C-----  30 F8    BMI  $8A8B
  0x044AA3 $8A93: C-----  F8       SED  
  0x044AA4 $8A94: C-----  F8       SED  
  0x044AA5 $8A95: C-----  C0 00    CPY  #$00
  0x044AA7 $8A97: C-----  00       BRK  
  0x044AA8 $8A98: C-----  50 C0    BVC  $8A5A
  0x044AAA $8A9A: C-----  00       BRK  
  0x044AAB $8A9B: C-----  00       BRK  
  0x044AAC $8A9C: C-----  00       BRK  
  0x044AAD $8A9D: C-----  00       BRK  
  0x044AAE $8A9E: C-----  00       BRK  
  0x044AAF $8A9F: C-----  00       BRK  
  0x044AB0 $8AA0: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x044AB1 $8AA1: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x044AB2 $8AA2: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x044AB3 $8AA3: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x044AB4 $8AA4: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x044AB5 $8AA5: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x044AB6 $8AA6: C-----  A4 98    LDY  $98
  0x044AB8 $8AA8: C-----  00       BRK  
  0x044AB9 $8AA9: C-----  00       BRK  
  0x044ABA $8AAA: C-----  00       BRK  
  0x044ABB $8AAB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044ABC $8AAC: C-----  00       BRK  
  0x044ABD $8AAD: C-----  00       BRK  
  0x044ABE $8AAE: C-----  00       BRK  
  0x044ABF $8AAF: C-----  00       BRK  
  0x044AC0 $8AB0: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x044AC1 $8AB1: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x044AC2 $8AB2: C-----  3E 5C BA ROL  $BA5C,X
  0x044AC5 $8AB5: C-----  45 82    EOR  $82
  0x044AC7 $8AB7: C-----  01 54    ORA  ($54,X)
  0x044AC9 $8AB9: C-----  28       PLP  
  0x044ACA $8ABA: C-----  00       BRK  
  0x044ACB $8ABB: C-----  00       BRK  
  0x044ACC $8ABC: C-----  00       BRK  
  0x044ACD $8ABD: C-----  00       BRK  
  0x044ACE $8ABE: C-----  00       BRK  
  0x044ACF $8ABF: C-----  00       BRK  
  0x044AD0 $8AC0: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x044AD1 $8AC1: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x044AD2 $8AC2: C-----  3E 5C B8 ROL  $B85C,X
  0x044AD5 $8AC5: C-----  48       PHA  
  0x044AD6 $8AC6: C-----  84 03    STY  $03
  0x044AD8 $8AC8: C-----  00       BRK  
  0x044AD9 $8AC9: C-----  00       BRK  
  0x044ADA $8ACA: C-----  01 03    ORA  ($03,X)
  0x044ADC $8ACC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044ADD $8ACD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044ADE $8ACE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044ADF $8ACF: C-----  00       BRK  
  0x044AE0 $8AD0: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x044AE1 $8AD1: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x044AE2 $8AD2: C-----  3E 5C B8 ROL  $B85C,X
  0x044AE5 $8AD5: C-----  40       RTI  
  0x044AE6 $8AD6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044AE7 $8AD7: C-----  00       BRK  
  0x044AE8 $8AD8: C-----  00       BRK  
  0x044AE9 $8AD9: C-----  00       BRK  
  0x044AEA $8ADA: C-----  C0 A0    CPY  #$A0
  0x044AEC $8ADC: C-----  40       RTI  
  0x044AED $8ADD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044AEE $8ADE: C-----  00       BRK  
  0x044AEF $8ADF: C-----  00       BRK  
  0x044AF0 $8AE0: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x044AF1 $8AE1: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x044AF2 $8AE2: C-----  3E 5C BA ROL  $BA5C,X
  0x044AF5 $8AE5: C-----  45 82    EOR  $82
  0x044AF7 $8AE7: C-----  01 00    ORA  ($00,X)
  0x044AF9 $8AE9: C-----  00       BRK  
  0x044AFA $8AEA: C-----  01 03    ORA  ($03,X)
  0x044AFC $8AEC: C-----  05 0A    ORA  $0A
  0x044AFE $8AEE: C-----  01 02    ORA  ($02,X)
  0x044B00 $8AF0: C-----  E4 82    CPX  $82
  0x044B02 $8AF2: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044B03 $8AF3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044B04 $8AF4: C-----  0A       ASL  A
  0x044B05 $8AF5: C-----  2A       ROL  A
  0x044B06 $8AF6: C-----  D0 20    BNE  $8B18
  0x044B08 $8AF8: C-----  18       CLC  
  0x044B09 $8AF9: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x044B0A $8AFA: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044B0B $8AFB: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044B0C $8AFC: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x044B0D $8AFD: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x044B0E $8AFE: C-----  24 40    BIT  $40
  0x044B10 $8B00: C-----  81 01    STA  ($01,X)
  0x044B12 $8B02: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x044B13 $8B03: C-----  16 AC    ASL  $AC,X
  0x044B15 $8B05: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x044B16 $8B06: C-----  A8       TAY  
  0x044B17 $8B07: C-----  7E 7E FE ROR  $FE7E,X
  0x044B1A $8B0A: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x044B1B $8B0B: C-----  E8       INX  
  0x044B1C $8B0C: C-----  50 A8    BVC  $8AB6
  0x044B1E $8B0E: C-----  50 80    BVC  $8A90
  0x044B20 $8B10: C-----  39 E2 00 AND  $00E2,Y
  0x044B23 $8B13: C-----  00       BRK  
  0x044B24 $8B14: C-----  00       BRK  
  0x044B25 $8B15: C-----  00       BRK  
  0x044B26 $8B16: C-----  00       BRK  
  0x044B27 $8B17: C-----  00       BRK  
  0x044B28 $8B18: C-----  00       BRK  
  0x044B29 $8B19: C-----  00       BRK  
  0x044B2A $8B1A: C-----  00       BRK  
  0x044B2B $8B1B: C-----  00       BRK  
  0x044B2C $8B1C: C-----  00       BRK  
  0x044B2D $8B1D: C-----  00       BRK  
  0x044B2E $8B1E: C-----  00       BRK  
  0x044B2F $8B1F: C-----  00       BRK  
  0x044B30 $8B20: C-----  E1 8E    SBC  ($8E,X)
  0x044B32 $8B22: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044B33 $8B23: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044B34 $8B24: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044B35 $8B25: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044B36 $8B26: C-----  18       CLC  
  0x044B37 $8B27: C-----  E0 1E    CPX  #$1E
  0x044B39 $8B29: C-----  70 F8    BVS  $8B23
  0x044B3B $8B2B: C-----  F8       SED  
  0x044B3C $8B2C: C-----  F8       SED  
  0x044B3D $8B2D: C-----  F8       SED  
  0x044B3E $8B2E: C-----  E0 00    CPX  #$00
  0x044B40 $8B30: C-----  81 01    STA  ($01,X)
  0x044B42 $8B32: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x044B43 $8B33: C-----  16 AC    ASL  $AC,X
  0x044B45 $8B35: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x044B46 $8B36: C-----  A8       TAY  
  0x044B47 $8B37: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x044B48 $8B38: C-----  7E FE 7C ROR  $7CFE,X
  0x044B4B $8B3B: C-----  E8       INX  
  0x044B4C $8B3C: C-----  50 A8    BVC  $8AE6
  0x044B4E $8B3E: C-----  50 80    BVC  $8AC0
  0x044B50 $8B40: C-----  05 04    ORA  $04
  0x044B52 $8B42: C-----  08       PHP  
  0x044B53 $8B43: C-----  F9 EA F5 SBC  $F5EA,Y
  0x044B56 $8B46: C-----  EA       NOP  
  0x044B57 $8B47: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044B58 $8B48: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044B59 $8B49: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044B5A $8B4A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044B5B $8B4B: C-----  06 D5    ASL  $D5
  0x044B5D $8B4D: C-----  CA       DEX  
  0x044B5E $8B4E: C-----  15 00    ORA  $00,X
  0x044B60 $8B50: C-----  00       BRK  
  0x044B61 $8B51: C-----  00       BRK  
  0x044B62 $8B52: C-----  00       BRK  
  0x044B63 $8B53: C-----  00       BRK  
  0x044B64 $8B54: C-----  00       BRK  
  0x044B65 $8B55: C-----  00       BRK  
  0x044B66 $8B56: C-----  00       BRK  
  0x044B67 $8B57: C-----  00       BRK  
  0x044B68 $8B58: C-----  00       BRK  
  0x044B69 $8B59: C-----  00       BRK  
  0x044B6A $8B5A: C-----  00       BRK  
  0x044B6B $8B5B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044B6C $8B5C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044B6D $8B5D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044B6E $8B5E: C-----  00       BRK  
  0x044B6F $8B5F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044B70 $8B60: C-----  00       BRK  
  0x044B71 $8B61: C-----  00       BRK  
  0x044B72 $8B62: C-----  00       BRK  
  0x044B73 $8B63: C-----  00       BRK  
  0x044B74 $8B64: C-----  00       BRK  
  0x044B75 $8B65: C-----  00       BRK  
  0x044B76 $8B66: C-----  00       BRK  
  0x044B77 $8B67: C-----  00       BRK  
  0x044B78 $8B68: C-----  00       BRK  
  0x044B79 $8B69: C-----  00       BRK  
  0x044B7A $8B6A: C-----  00       BRK  
  0x044B7B $8B6B: C-----  C0 20    CPY  #$20
  0x044B7D $8B6D: C-----  C0 00    CPY  #$00
  0x044B7F $8B6F: C-----  E0 00    CPX  #$00
  0x044B81 $8B71: C-----  00       BRK  
  0x044B82 $8B72: C-----  00       BRK  
  0x044B83 $8B73: C-----  00       BRK  
  0x044B84 $8B74: C-----  00       BRK  
  0x044B85 $8B75: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044B86 $8B76: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044B87 $8B77: C-----  00       BRK  
  0x044B88 $8B78: C-----  08       PHP  
  0x044B89 $8B79: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044B8A $8B7A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044B8B $8B7B: C-----  10 0F    BPL  $8B8C
  0x044B8D $8B7D: C-----  00       BRK  
  0x044B8E $8B7E: C-----  00       BRK  
  0x044B8F $8B7F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044B90 $8B80: C-----  00       BRK  
  0x044B91 $8B81: C-----  00       BRK  
  0x044B92 $8B82: C-----  00       BRK  
  0x044B93 $8B83: C-----  00       BRK  
  0x044B94 $8B84: C-----  00       BRK  
  0x044B95 $8B85: C-----  00       BRK  
  0x044B96 $8B86: C-----  00       BRK  
  0x044B97 $8B87: C-----  00       BRK  
  0x044B98 $8B88: C-----  00       BRK  
  0x044B99 $8B89: C-----  01 02    ORA  ($02,X)
  0x044B9B $8B8B: C-----  01 00    ORA  ($00,X)
  0x044B9D $8B8D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044B9E $8B8E: C-----  08       PHP  
  0x044B9F $8B8F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044BA0 $8B90: C-----  00       BRK  
  0x044BA1 $8B91: C-----  00       BRK  
  0x044BA2 $8B92: C-----  00       BRK  
  0x044BA3 $8B93: C-----  00       BRK  
  0x044BA4 $8B94: C-----  00       BRK  
  0x044BA5 $8B95: C-----  00       BRK  
  0x044BA6 $8B96: C-----  00       BRK  
  0x044BA7 $8B97: C-----  00       BRK  
  0x044BA8 $8B98: C-----  00       BRK  
  0x044BA9 $8B99: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044BAA $8B9A: C-----  40       RTI  
  0x044BAB $8B9B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044BAC $8B9C: C-----  00       BRK  
  0x044BAD $8B9D: C-----  E0 10    CPX  #$10
  0x044BAF $8B9F: C-----  E0 00    CPX  #$00
  0x044BB1 $8BA1: C-----  00       BRK  
  0x044BB2 $8BA2: C-----  00       BRK  
  0x044BB3 $8BA3: C-----  00       BRK  
  0x044BB4 $8BA4: C-----  00       BRK  
  0x044BB5 $8BA5: C-----  01 04    ORA  ($04,X)
  0x044BB7 $8BA7: C-----  08       PHP  
  0x044BB8 $8BA8: C-----  00       BRK  
  0x044BB9 $8BA9: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044BBA $8BAA: C-----  10 0F    BPL  $8BBB
  0x044BBC $8BAC: C-----  00       BRK  
  0x044BBD $8BAD: C-----  1E 23 17 ASL  $1723,X
  0x044BC0 $8BB0: C-----  00       BRK  
  0x044BC1 $8BB1: C-----  00       BRK  
  0x044BC2 $8BB2: C-----  00       BRK  
  0x044BC3 $8BB3: C-----  00       BRK  
  0x044BC4 $8BB4: C-----  00       BRK  
  0x044BC5 $8BB5: C-----  C0 20    CPY  #$20
  0x044BC7 $8BB7: C-----  D0 00    BNE  $8BB9
  0x044BC9 $8BB9: C-----  F0 08    BEQ  $8BC3
  0x044BCB $8BBB: C-----  F0 00    BEQ  $8BBD
  0x044BCD $8BBD: C-----  38       SEC  
  0x044BCE $8BBE: C-----  C4 28    CPY  $28
  0x044BD0 $8BC0: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x044BD1 $8BC1: C-----  00       BRK  
  0x044BD2 $8BC2: C-----  18       CLC  
  0x044BD3 $8BC3: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x044BD4 $8BC4: C-----  26 00    ROL  $00
  0x044BD6 $8BC6: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x044BD7 $8BC7: C-----  20 03 7F JSR  $7F03
  0x044BDA $8BCA: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x044BDB $8BCB: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x044BDC $8BCC: C-----  19 7F 98 ORA  $987F,Y
  0x044BDF $8BCF: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x044BE0 $8BD0: C-----  F0 00    BEQ  $8BD2
  0x044BE2 $8BD2: C-----  08       PHP  
  0x044BE3 $8BD3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044BE4 $8BD4: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x044BE5 $8BD5: C-----  00       BRK  
  0x044BE6 $8BD6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044BE7 $8BD7: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x044BE8 $8BD8: C-----  00       BRK  
  0x044BE9 $8BD9: C-----  FE F1 FA INC  $FAF1,X
  0x044BEC $8BDC: C-----  E0 FE    CPX  #$FE
  0x044BEE $8BDE: C-----  F9 8A 20 SBC  $208A,Y
  0x044BF1 $8BE1: C-----  10 18    BPL  $8BFB
  0x044BF3 $8BE3: C-----  00       BRK  
  0x044BF4 $8BE4: C-----  0E 06 01 ASL  $0106
  0x044BF7 $8BE7: C-----  00       BRK  
  0x044BF8 $8BE8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044BF9 $8BE9: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044BFA $8BEA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044BFB $8BEB: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044BFC $8BEC: C-----  21 19    AND  ($19,X)
  0x044BFE $8BEE: C-----  00       BRK  
  0x044BFF $8BEF: C-----  00       BRK  
  0x044C00 $8BF0: C-----  E4 C8    CPX  $C8
  0x044C02 $8BF2: C-----  08       PHP  
  0x044C03 $8BF3: C-----  00       BRK  
  0x044C04 $8BF4: C-----  10 60    BPL  $8C56
  0x044C06 $8BF6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044C07 $8BF7: C-----  00       BRK  
  0x044C08 $8BF8: C-----  18       CLC  
  0x044C09 $8BF9: C-----  30 F0    BMI  $8BEB
  0x044C0B $8BFB: C-----  F8       SED  
  0x044C0C $8BFC: C-----  E4 98    CPX  $98
  0x044C0E $8BFE: C-----  00       BRK  
  0x044C0F $8BFF: C-----  00       BRK  
  0x044C10 $8C00: C-----  00       BRK  
  0x044C11 $8C01: ------  .byte $00
  0x044C12 $8C02: ------  .byte $00
  0x044C13 $8C03: ------  .byte $00
  0x044C14 $8C04: ------  .byte $00
  0x044C15 $8C05: ------  .byte $00
  0x044C16 $8C06: ------  .byte $00
  0x044C17 $8C07: ------  .byte $00
  0x044C18 $8C08: C-----  00       BRK  
  0x044C19 $8C09: ------  .byte $00
  0x044C1A $8C0A: ------  .byte $00
  0x044C1B $8C0B: ------  .byte $00
  0x044C1C $8C0C: ------  .byte $00
  0x044C1D $8C0D: ------  .byte $00
  0x044C1E $8C0E: ------  .byte $00
  0x044C1F $8C0F: ------  .byte $00
  0x044C20 $8C10: ------  .byte $FF
  0x044C21 $8C11: ------  .byte $FF
  0x044C22 $8C12: ------  .byte $FF
  0x044C23 $8C13: ------  .byte $FF
  0x044C24 $8C14: ------  .byte $FF
  0x044C25 $8C15: ------  .byte $FF
  0x044C26 $8C16: ------  .byte $FF
  0x044C27 $8C17: ------  .byte $FF
  0x044C28 $8C18: ------  .byte $00
  0x044C29 $8C19: ------  .byte $00
  0x044C2A $8C1A: ------  .byte $00
  0x044C2B $8C1B: ------  .byte $00
  0x044C2C $8C1C: ------  .byte $00
  0x044C2D $8C1D: ------  .byte $00
  0x044C2E $8C1E: ------  .byte $00
  0x044C2F $8C1F: ------  .byte $00
  0x044C30 $8C20: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044C31 $8C21: C-----  06 04    ASL  $04
  0x044C33 $8C23: C-----  08       PHP  
  0x044C34 $8C24: C-----  10 20    BPL  $8C46
  0x044C36 $8C26: C-----  20 41 04 JSR  $0441
  0x044C39 $8C29: C-----  01 03    ORA  ($03,X)
  0x044C3B $8C2B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044C3C $8C2C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044C3D $8C2D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044C3E $8C2E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044C3F $8C2F: C-----  3E FC 1C ROL  $1CFC,X
  0x044C42 $8C32: C-----  EE 17 0F INC  $0F17
  0x044C45 $8C35: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044C46 $8C36: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044C47 $8C37: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044C48 $8C38: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x044C49 $8C39: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x044C4A $8C3A: C-----  15 EA    ORA  $EA,X
  0x044C4C $8C3C: C-----  F6 FA    INC  $FA,X
  0x044C4E $8C3E: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x044C4F $8C3F: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x044C50 $8C40: C-----  00       BRK  
  0x044C51 $8C41: C-----  00       BRK  
  0x044C52 $8C42: C-----  C0 E0    CPY  #$E0
  0x044C54 $8C44: C-----  E0 E0    CPX  #$E0
  0x044C56 $8C46: C-----  E0 E0    CPX  #$E0
  0x044C58 $8C48: C-----  00       BRK  
  0x044C59 $8C49: C-----  00       BRK  
  0x044C5A $8C4A: C-----  00       BRK  
  0x044C5B $8C4B: C-----  C0 C0    CPY  #$C0
  0x044C5D $8C4D: C-----  C0 C0    CPY  #$C0
  0x044C5F $8C4F: C-----  C0 00    CPY  #$00
  0x044C61 $8C51: C-----  00       BRK  
  0x044C62 $8C52: C-----  00       BRK  
  0x044C63 $8C53: C-----  00       BRK  
  0x044C64 $8C54: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044C65 $8C55: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044C66 $8C56: C-----  29 28    AND  #$28
  0x044C68 $8C58: C-----  00       BRK  
  0x044C69 $8C59: C-----  00       BRK  
  0x044C6A $8C5A: C-----  00       BRK  
  0x044C6B $8C5B: C-----  00       BRK  
  0x044C6C $8C5C: C-----  00       BRK  
  0x044C6D $8C5D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044C6E $8C5E: C-----  06 47    ASL  $47
  0x044C70 $8C60: C-----  E0 E0    CPX  #$E0
  0x044C72 $8C62: C-----  E0 E0    CPX  #$E0
  0x044C74 $8C64: C-----  E0 C0    CPX  #$C0
  0x044C76 $8C66: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044C77 $8C67: C-----  00       BRK  
  0x044C78 $8C68: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044C79 $8C69: C-----  C0 C0    CPY  #$C0
  0x044C7B $8C6B: C-----  C0 C0    CPY  #$C0
  0x044C7D $8C6D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044C7E $8C6E: C-----  00       BRK  
  0x044C7F $8C6F: C-----  00       BRK  
  0x044C80 $8C70: C-----  10 21    BPL  $8C93
  0x044C82 $8C72: C-----  49 67    EOR  #$67
  0x044C84 $8C74: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x044C85 $8C75: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044C86 $8C76: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044C87 $8C77: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044C88 $8C78: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x044C89 $8C79: C-----  1E 36 19 ASL  $1936,X
  0x044C8C $8C7C: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x044C8D $8C7D: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x044C8E $8C7E: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x044C8F $8C7F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044C90 $8C80: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x044C91 $8C81: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x044C92 $8C82: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x044C93 $8C83: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x044C94 $8C84: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x044C95 $8C85: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x044C96 $8C86: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x044C97 $8C87: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x044C98 $8C88: C-----  3D 3C 3D AND  $3D3C,X
  0x044C9B $8C8B: C-----  2C 1D 1D BIT  $1D1D
  0x044C9E $8C8E: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x044C9F $8C8F: C-----  58       CLI  
  0x044CA0 $8C90: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x044CA1 $8C91: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x044CA2 $8C92: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x044CA3 $8C93: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x044CA4 $8C94: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044CA5 $8C95: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x044CA6 $8C96: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x044CA7 $8C97: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x044CA8 $8C98: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044CA9 $8C99: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044CAA $8C9A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044CAB $8C9B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044CAC $8C9C: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x044CAD $8C9D: C-----  A2 70    LDX  #$70
  0x044CAF $8C9F: C-----  D8       CLD  
  0x044CB0 $8CA0: C-----  F8       SED  
  0x044CB1 $8CA1: C-----  F0 E3    BEQ  $8C86
  0x044CB3 $8CA3: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x044CB4 $8CA4: C-----  66 44    ROR  $44
  0x044CB6 $8CA6: C-----  45 46    EOR  $46
  0x044CB8 $8CA8: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x044CB9 $8CA9: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x044CBA $8CAA: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x044CBB $8CAB: C-----  18       CLC  
  0x044CBC $8CAC: C-----  18       CLC  
  0x044CBD $8CAD: C-----  38       SEC  
  0x044CBE $8CAE: C-----  38       SEC  
  0x044CBF $8CAF: C-----  38       SEC  
  0x044CC0 $8CB0: C-----  9A       TXS  
  0x044CC1 $8CB1: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x044CC2 $8CB2: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044CC3 $8CB3: C-----  E0 E0    CPX  #$E0
  0x044CC5 $8CB5: C-----  E0 E0    CPX  #$E0
  0x044CC7 $8CB7: C-----  E0 64    CPX  #$64
  0x044CC9 $8CB9: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x044CCA $8CBA: C-----  C0 C0    CPY  #$C0
  0x044CCC $8CBC: C-----  C0 C0    CPY  #$C0
  0x044CCE $8CBE: C-----  C0 C0    CPY  #$C0
  0x044CD0 $8CC0: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x044CD1 $8CC1: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x044CD2 $8CC2: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x044CD3 $8CC3: C-----  00       BRK  
  0x044CD4 $8CC4: C-----  00       BRK  
  0x044CD5 $8CC5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044CD6 $8CC6: C-----  C0 C0    CPY  #$C0
  0x044CD8 $8CC8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044CD9 $8CC9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044CDA $8CCA: C-----  00       BRK  
  0x044CDB $8CCB: C-----  00       BRK  
  0x044CDC $8CCC: C-----  00       BRK  
  0x044CDD $8CCD: C-----  00       BRK  
  0x044CDE $8CCE: C-----  00       BRK  
  0x044CDF $8CCF: C-----  00       BRK  
  0x044CE0 $8CD0: C-----  00       BRK  
  0x044CE1 $8CD1: C-----  08       PHP  
  0x044CE2 $8CD2: C-----  08       PHP  
  0x044CE3 $8CD3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044CE4 $8CD4: C-----  00       BRK  
  0x044CE5 $8CD5: C-----  01 F0    ORA  ($F0,X)
  0x044CE7 $8CD7: C-----  F8       SED  
  0x044CE8 $8CD8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044CE9 $8CD9: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x044CEA $8CDA: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x044CEB $8CDB: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x044CEC $8CDC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044CED $8CDD: C-----  FE 0F F7 INC  $F70F,X
  0x044CF0 $8CE0: C-----  00       BRK  
  0x044CF1 $8CE1: C-----  00       BRK  
  0x044CF2 $8CE2: C-----  00       BRK  
  0x044CF3 $8CE3: C-----  00       BRK  
  0x044CF4 $8CE4: C-----  00       BRK  
  0x044CF5 $8CE5: C-----  00       BRK  
  0x044CF6 $8CE6: C-----  00       BRK  
  0x044CF7 $8CE7: C-----  00       BRK  
  0x044CF8 $8CE8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044CF9 $8CE9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044CFA $8CEA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044CFB $8CEB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044CFC $8CEC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044CFD $8CED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044CFE $8CEE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044CFF $8CEF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044D00 $8CF0: C-----  00       BRK  
  0x044D01 $8CF1: C-----  00       BRK  
  0x044D02 $8CF2: C-----  00       BRK  
  0x044D03 $8CF3: C-----  00       BRK  
  0x044D04 $8CF4: C-----  00       BRK  
  0x044D05 $8CF5: C-----  00       BRK  
  0x044D06 $8CF6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044D07 $8CF7: C-----  18       CLC  
  0x044D08 $8CF8: C-----  00       BRK  
  0x044D09 $8CF9: C-----  00       BRK  
  0x044D0A $8CFA: C-----  00       BRK  
  0x044D0B $8CFB: C-----  00       BRK  
  0x044D0C $8CFC: C-----  00       BRK  
  0x044D0D $8CFD: C-----  00       BRK  
  0x044D0E $8CFE: C-----  00       BRK  
  0x044D0F $8CFF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044D10 $8D00: C-----  00       BRK  
  0x044D11 $8D01: C-----  00       BRK  
  0x044D12 $8D02: C-----  00       BRK  
  0x044D13 $8D03: C-----  00       BRK  
  0x044D14 $8D04: C-----  00       BRK  
  0x044D15 $8D05: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x044D16 $8D06: C-----  06 1A    ASL  $1A
  0x044D18 $8D08: C-----  00       BRK  
  0x044D19 $8D09: C-----  00       BRK  
  0x044D1A $8D0A: C-----  00       BRK  
  0x044D1B $8D0B: C-----  00       BRK  
  0x044D1C $8D0C: C-----  00       BRK  
  0x044D1D $8D0D: C-----  00       BRK  
  0x044D1E $8D0E: C-----  E0 E4    CPX  #$E4
  0x044D20 $8D10: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044D21 $8D11: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x044D22 $8D12: C-----  E4 F7    CPX  $F7
  0x044D24 $8D14: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044D25 $8D15: C-----  D8       CLD  
  0x044D26 $8D16: C-----  E0 80    CPX  #$80
  0x044D28 $8D18: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044D29 $8D19: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x044D2A $8D1A: C-----  98       TYA  
  0x044D2B $8D1B: C-----  A8       TAY  
  0x044D2C $8D1C: C-----  A0 E0    LDY  #$E0
  0x044D2E $8D1E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044D2F $8D1F: C-----  00       BRK  
  0x044D30 $8D20: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044D31 $8D21: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x044D32 $8D22: C-----  E4 F7    CPX  $F7
  0x044D34 $8D24: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044D35 $8D25: C-----  D8       CLD  
  0x044D36 $8D26: C-----  E0 88    CPX  #$88
  0x044D38 $8D28: C-----  00       BRK  
  0x044D39 $8D29: C-----  00       BRK  
  0x044D3A $8D2A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044D3B $8D2B: C-----  A0 A3    LDY  #$A3
  0x044D3D $8D2D: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x044D3E $8D2E: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x044D3F $8D2F: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x044D40 $8D30: C-----  00       BRK  
  0x044D41 $8D31: C-----  00       BRK  
  0x044D42 $8D32: C-----  00       BRK  
  0x044D43 $8D33: C-----  00       BRK  
  0x044D44 $8D34: C-----  C0 21    CPY  #$21
  0x044D46 $8D36: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x044D47 $8D37: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044D48 $8D38: C-----  00       BRK  
  0x044D49 $8D39: C-----  00       BRK  
  0x044D4A $8D3A: C-----  00       BRK  
  0x044D4B $8D3B: C-----  00       BRK  
  0x044D4C $8D3C: C-----  00       BRK  
  0x044D4D $8D3D: C-----  C0 E1    CPY  #$E1
  0x044D4F $8D3F: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x044D50 $8D40: C-----  00       BRK  
  0x044D51 $8D41: C-----  00       BRK  
  0x044D52 $8D42: C-----  00       BRK  
  0x044D53 $8D43: C-----  00       BRK  
  0x044D54 $8D44: C-----  38       SEC  
  0x044D55 $8D45: C-----  C0 1C    CPY  #$1C
  0x044D57 $8D47: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044D58 $8D48: C-----  00       BRK  
  0x044D59 $8D49: C-----  00       BRK  
  0x044D5A $8D4A: C-----  00       BRK  
  0x044D5B $8D4B: C-----  00       BRK  
  0x044D5C $8D4C: C-----  00       BRK  
  0x044D5D $8D4D: C-----  30 E0    BMI  $8D2F
  0x044D5F $8D4F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044D60 $8D50: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044D61 $8D51: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044D62 $8D52: C-----  A4 F7    LDY  $F7
  0x044D64 $8D54: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044D65 $8D55: C-----  D8       CLD  
  0x044D66 $8D56: C-----  E0 88    CPX  #$88
  0x044D68 $8D58: C-----  F8       SED  
  0x044D69 $8D59: C-----  F8       SED  
  0x044D6A $8D5A: C-----  58       CLI  
  0x044D6B $8D5B: C-----  A8       TAY  
  0x044D6C $8D5C: C-----  A0 E0    LDY  #$E0
  0x044D6E $8D5E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044D6F $8D5F: C-----  00       BRK  
  0x044D70 $8D60: C-----  10 21    BPL  $8D83
  0x044D72 $8D62: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x044D73 $8D63: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x044D74 $8D64: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x044D75 $8D65: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044D76 $8D66: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044D77 $8D67: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044D78 $8D68: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x044D79 $8D69: C-----  1E 30 34 ASL  $3430,X
  0x044D7C $8D6C: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x044D7D $8D6D: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x044D7E $8D6E: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x044D7F $8D6F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044D80 $8D70: C-----  00       BRK  
  0x044D81 $8D71: C-----  00       BRK  
  0x044D82 $8D72: C-----  A0 F7    LDY  #$F7
  0x044D84 $8D74: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044D85 $8D75: C-----  D8       CLD  
  0x044D86 $8D76: C-----  E0 88    CPX  #$88
  0x044D88 $8D78: C-----  00       BRK  
  0x044D89 $8D79: C-----  00       BRK  
  0x044D8A $8D7A: C-----  00       BRK  
  0x044D8B $8D7B: C-----  A0 A3    LDY  #$A3
  0x044D8D $8D7D: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x044D8E $8D7E: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x044D8F $8D7F: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x044D90 $8D80: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044D91 $8D81: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044D92 $8D82: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044D93 $8D83: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x044D94 $8D84: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x044D95 $8D85: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x044D96 $8D86: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044D97 $8D87: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x044D98 $8D88: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x044D99 $8D89: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x044D9A $8D8A: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x044D9B $8D8B: C-----  B8       CLV  
  0x044D9C $8D8C: C-----  BD BD 3B LDA  $3BBD,X
  0x044D9F $8D8F: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x044DA0 $8D90: C-----  00       BRK  
  0x044DA1 $8D91: C-----  E0 40    CPX  #$40
  0x044DA3 $8D93: C-----  20 D0 31 JSR  $31D0
  0x044DA6 $8D96: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x044DA7 $8D97: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044DA8 $8D98: C-----  00       BRK  
  0x044DA9 $8D99: C-----  00       BRK  
  0x044DAA $8D9A: C-----  00       BRK  
  0x044DAB $8D9B: C-----  00       BRK  
  0x044DAC $8D9C: C-----  00       BRK  
  0x044DAD $8D9D: C-----  C0 E1    CPY  #$E1
  0x044DAF $8D9F: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x044DB0 $8DA0: C-----  00       BRK  
  0x044DB1 $8DA1: C-----  00       BRK  
  0x044DB2 $8DA2: C-----  00       BRK  
  0x044DB3 $8DA3: C-----  00       BRK  
  0x044DB4 $8DA4: C-----  00       BRK  
  0x044DB5 $8DA5: C-----  E0 10    CPX  #$10
  0x044DB7 $8DA7: C-----  08       PHP  
  0x044DB8 $8DA8: C-----  00       BRK  
  0x044DB9 $8DA9: C-----  00       BRK  
  0x044DBA $8DAA: C-----  00       BRK  
  0x044DBB $8DAB: C-----  00       BRK  
  0x044DBC $8DAC: C-----  00       BRK  
  0x044DBD $8DAD: C-----  00       BRK  
  0x044DBE $8DAE: C-----  E0 F0    CPX  #$F0
  0x044DC0 $8DB0: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044DC1 $8DB1: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044DC2 $8DB2: C-----  84 F7    STY  $F7
  0x044DC4 $8DB4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044DC5 $8DB5: C-----  D8       CLD  
  0x044DC6 $8DB6: C-----  E0 88    CPX  #$88
  0x044DC8 $8DB8: C-----  00       BRK  
  0x044DC9 $8DB9: C-----  00       BRK  
  0x044DCA $8DBA: C-----  00       BRK  
  0x044DCB $8DBB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044DCC $8DBC: C-----  !!UNDEF $A3  ; unknown opcode, treating as data
  0x044DCD $8DBD: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x044DCE $8DBE: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x044DCF $8DBF: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x044DD0 $8DC0: C-----  00       BRK  
  0x044DD1 $8DC1: C-----  E0 40    CPX  #$40
  0x044DD3 $8DC3: C-----  20 D0 31 JSR  $31D0
  0x044DD6 $8DC6: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x044DD7 $8DC7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044DD8 $8DC8: C-----  00       BRK  
  0x044DD9 $8DC9: C-----  00       BRK  
  0x044DDA $8DCA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044DDB $8DCB: C-----  C0 20    CPY  #$20
  0x044DDD $8DCD: C-----  00       BRK  
  0x044DDE $8DCE: C-----  01 03    ORA  ($03,X)
  0x044DE0 $8DD0: C-----  00       BRK  
  0x044DE1 $8DD1: C-----  00       BRK  
  0x044DE2 $8DD2: C-----  00       BRK  
  0x044DE3 $8DD3: C-----  00       BRK  
  0x044DE4 $8DD4: C-----  00       BRK  
  0x044DE5 $8DD5: C-----  F0 00    BEQ  $8DD7
  0x044DE7 $8DD7: C-----  18       CLC  
  0x044DE8 $8DD8: C-----  00       BRK  
  0x044DE9 $8DD9: C-----  00       BRK  
  0x044DEA $8DDA: C-----  00       BRK  
  0x044DEB $8DDB: C-----  00       BRK  
  0x044DEC $8DDC: C-----  00       BRK  
  0x044DED $8DDD: C-----  00       BRK  
  0x044DEE $8DDE: C-----  E0 E0    CPX  #$E0
  0x044DF0 $8DE0: C-----  00       BRK  
  0x044DF1 $8DE1: C-----  00       BRK  
  0x044DF2 $8DE2: C-----  00       BRK  
  0x044DF3 $8DE3: C-----  00       BRK  
  0x044DF4 $8DE4: C-----  00       BRK  
  0x044DF5 $8DE5: C-----  01 0E    ORA  ($0E,X)
  0x044DF7 $8DE7: C-----  18       CLC  
  0x044DF8 $8DE8: C-----  00       BRK  
  0x044DF9 $8DE9: C-----  00       BRK  
  0x044DFA $8DEA: C-----  00       BRK  
  0x044DFB $8DEB: C-----  00       BRK  
  0x044DFC $8DEC: C-----  00       BRK  
  0x044DFD $8DED: C-----  00       BRK  
  0x044DFE $8DEE: C-----  01 07    ORA  ($07,X)
  0x044E00 $8DF0: C-----  00       BRK  
  0x044E01 $8DF1: C-----  00       BRK  
  0x044E02 $8DF2: C-----  00       BRK  
  0x044E03 $8DF3: C-----  00       BRK  
  0x044E04 $8DF4: C-----  00       BRK  
  0x044E05 $8DF5: C-----  E0 10    CPX  #$10
  0x044E07 $8DF7: C-----  18       CLC  
  0x044E08 $8DF8: C-----  00       BRK  
  0x044E09 $8DF9: C-----  00       BRK  
  0x044E0A $8DFA: C-----  00       BRK  
  0x044E0B $8DFB: C-----  00       BRK  
  0x044E0C $8DFC: C-----  00       BRK  
  0x044E0D $8DFD: C-----  00       BRK  
  0x044E0E $8DFE: C-----  E0 E0    CPX  #$E0
  0x044E10 $8E00: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x044E11 $8E01: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x044E12 $8E02: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x044E13 $8E03: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x044E14 $8E04: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044E15 $8E05: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044E16 $8E06: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044E17 $8E07: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044E18 $8E08: C-----  30 2F    BMI  $8E39
  0x044E1A $8E0A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044E1B $8E0B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044E1C $8E0C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044E1D $8E0D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044E1E $8E0E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044E1F $8E0F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044E20 $8E10: C-----  E0 E0    CPX  #$E0
  0x044E22 $8E12: C-----  E0 10    CPX  #$10
  0x044E24 $8E14: C-----  F0 08    BEQ  $8E1E
  0x044E26 $8E16: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044E27 $8E17: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044E28 $8E18: C-----  C0 C0    CPY  #$C0
  0x044E2A $8E1A: C-----  00       BRK  
  0x044E2B $8E1B: C-----  E0 00    CPX  #$00
  0x044E2D $8E1D: C-----  F0 F8    BEQ  $8E17
  0x044E2F $8E1F: C-----  F8       SED  
  0x044E30 $8E20: C-----  00       BRK  
  0x044E31 $8E21: C-----  00       BRK  
  0x044E32 $8E22: C-----  00       BRK  
  0x044E33 $8E23: C-----  00       BRK  
  0x044E34 $8E24: C-----  00       BRK  
  0x044E35 $8E25: C-----  C0 20    CPY  #$20
  0x044E37 $8E27: C-----  00       BRK  
  0x044E38 $8E28: C-----  10 E0    BPL  $8E0A
  0x044E3A $8E2A: C-----  F0 08    BEQ  $8E34
  0x044E3C $8E2C: C-----  F0 00    BEQ  $8E2E
  0x044E3E $8E2E: C-----  C0 FC    CPY  #$FC
  0x044E40 $8E30: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044E41 $8E31: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044E42 $8E32: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044E43 $8E33: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044E44 $8E34: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044E45 $8E35: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x044E46 $8E36: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x044E47 $8E37: C-----  84 FC    STY  $FC
  0x044E49 $8E39: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044E4A $8E3A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044E4B $8E3B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044E4C $8E3C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044E4D $8E3D: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x044E4E $8E3E: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x044E4F $8E3F: C-----  78       SEI  
  0x044E50 $8E40: C-----  F8       SED  
  0x044E51 $8E41: C-----  F0 E3    BEQ  $8E26
  0x044E53 $8E43: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x044E54 $8E44: C-----  66 44    ROR  $44
  0x044E56 $8E46: C-----  45 46    EOR  $46
  0x044E58 $8E48: C-----  E0 C0    CPX  #$C0
  0x044E5A $8E4A: C-----  C0 00    CPY  #$00
  0x044E5C $8E4C: C-----  01 03    ORA  ($03,X)
  0x044E5E $8E4E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044E5F $8E4F: C-----  01 20    ORA  ($20,X)
  0x044E61 $8E51: C-----  61 81    ADC  ($81,X)
  0x044E63 $8E53: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044E64 $8E54: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x044E65 $8E55: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x044E66 $8E56: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044E67 $8E57: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044E68 $8E58: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044E69 $8E59: C-----  1E 7E F9 ASL  $F97E,X
  0x044E6C $8E5C: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x044E6D $8E5D: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x044E6E $8E5E: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x044E6F $8E5F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044E70 $8E60: C-----  E0 A0    CPX  #$A0
  0x044E72 $8E62: C-----  A0 A0    LDY  #$A0
  0x044E74 $8E64: C-----  A0 20    LDY  #$20
  0x044E76 $8E66: C-----  40       RTI  
  0x044E77 $8E67: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044E78 $8E68: C-----  00       BRK  
  0x044E79 $8E69: C-----  40       RTI  
  0x044E7A $8E6A: C-----  40       RTI  
  0x044E7B $8E6B: C-----  40       RTI  
  0x044E7C $8E6C: C-----  40       RTI  
  0x044E7D $8E6D: C-----  C0 80    CPY  #$80
  0x044E7F $8E6F: C-----  00       BRK  
  0x044E80 $8E70: C-----  00       BRK  
  0x044E81 $8E71: C-----  00       BRK  
  0x044E82 $8E72: C-----  00       BRK  
  0x044E83 $8E73: C-----  00       BRK  
  0x044E84 $8E74: C-----  00       BRK  
  0x044E85 $8E75: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044E86 $8E76: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x044E87 $8E77: C-----  10 00    BPL  $8E79
  0x044E89 $8E79: C-----  00       BRK  
  0x044E8A $8E7A: C-----  00       BRK  
  0x044E8B $8E7B: C-----  00       BRK  
  0x044E8C $8E7C: C-----  00       BRK  
  0x044E8D $8E7D: C-----  00       BRK  
  0x044E8E $8E7E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044E8F $8E7F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044E90 $8E80: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x044E91 $8E81: C-----  10 13    BPL  $8E96
  0x044E93 $8E83: C-----  00       BRK  
  0x044E94 $8E84: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x044E95 $8E85: C-----  3D 38 3C AND  $3C38,X
  0x044E98 $8E88: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x044E99 $8E89: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x044E9A $8E8A: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x044E9B $8E8B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x044E9C $8E8C: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x044E9D $8E8D: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x044E9E $8E8E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044E9F $8E8F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044EA0 $8E90: C-----  90 08    BCC  $8E9A
  0x044EA2 $8E92: C-----  C8       INY  
  0x044EA3 $8E93: C-----  00       BRK  
  0x044EA4 $8E94: C-----  EC C4 3C CPX  $3CC4
  0x044EA7 $8E97: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x044EA8 $8E98: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x044EA9 $8E99: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x044EAA $8E9A: C-----  30 FE    BMI  $8E9A
  0x044EAC $8E9C: C-----  11 3A    ORA  ($3A),Y
  0x044EAE $8E9E: C-----  C0 E0    CPY  #$E0
  0x044EB0 $8EA0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044EB1 $8EA1: C-----  11 17    ORA  ($17),Y
  0x044EB3 $8EA3: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x044EB4 $8EA4: C-----  08       PHP  
  0x044EB5 $8EA5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044EB6 $8EA6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044EB7 $8EA7: C-----  00       BRK  
  0x044EB8 $8EA8: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x044EB9 $8EA9: C-----  4E 68 04 LSR  $0468
  0x044EBC $8EAC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044EBD $8EAD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044EBE $8EAE: C-----  00       BRK  
  0x044EBF $8EAF: C-----  00       BRK  
  0x044EC0 $8EB0: C-----  00       BRK  
  0x044EC1 $8EB1: C-----  38       SEC  
  0x044EC2 $8EB2: C-----  C8       INY  
  0x044EC3 $8EB3: C-----  D0 10    BNE  $8EC5
  0x044EC5 $8EB5: C-----  20 C0 00 JSR  $00C0
  0x044EC8 $8EB8: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044EC9 $8EB9: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x044ECA $8EBA: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x044ECB $8EBB: C-----  20 E0 C0 JSR  $C0E0
  0x044ECE $8EBE: C-----  00       BRK  
  0x044ECF $8EBF: C-----  00       BRK  
  0x044ED0 $8EC0: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x044ED1 $8EC1: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x044ED2 $8EC2: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x044ED3 $8EC3: C-----  2E 3F 3F ROL  $3F3F
  0x044ED6 $8EC6: C-----  25 1F    AND  $1F
  0x044ED8 $8EC8: C-----  00       BRK  
  0x044ED9 $8EC9: C-----  00       BRK  
  0x044EDA $8ECA: C-----  00       BRK  
  0x044EDB $8ECB: C-----  00       BRK  
  0x044EDC $8ECC: C-----  00       BRK  
  0x044EDD $8ECD: C-----  00       BRK  
  0x044EDE $8ECE: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x044EDF $8ECF: C-----  20 02 82 JSR  $8202
  0x044EE2 $8ED2: C-----  E4 F7    CPX  $F7
  0x044EE4 $8ED4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044EE5 $8ED5: C-----  D9 EB 97 CMP  $97EB,Y
  0x044EE8 $8ED8: C-----  00       BRK  
  0x044EE9 $8ED9: C-----  00       BRK  
  0x044EEA $8EDA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044EEB $8EDB: C-----  A0 A3    LDY  #$A3
  0x044EED $8EDD: C-----  C6 95    DEC  $95
  0x044EEF $8EDF: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x044EF0 $8EE0: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044EF1 $8EE1: C-----  84 E4    STY  $E4
  0x044EF3 $8EE3: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x044EF4 $8EE4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044EF5 $8EE5: C-----  D8       CLD  
  0x044EF6 $8EE6: C-----  E0 88    CPX  #$88
  0x044EF8 $8EE8: C-----  F8       SED  
  0x044EF9 $8EE9: C-----  78       SEI  
  0x044EFA $8EEA: C-----  98       TYA  
  0x044EFB $8EEB: C-----  A8       TAY  
  0x044EFC $8EEC: C-----  A0 E0    LDY  #$E0
  0x044EFE $8EEE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044EFF $8EEF: C-----  00       BRK  
  0x044F00 $8EF0: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x044F01 $8EF1: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x044F02 $8EF2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044F03 $8EF3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044F04 $8EF4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044F05 $8EF5: C-----  01 F0    ORA  ($F0,X)
  0x044F07 $8EF7: C-----  F8       SED  
  0x044F08 $8EF8: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x044F09 $8EF9: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x044F0A $8EFA: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x044F0B $8EFB: C-----  F1 FD    SBC  ($FD),Y
  0x044F0D $8EFD: C-----  FE 0F F7 INC  $F70F,X
  0x044F10 $8F00: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044F11 $8F01: C-----  84 E4    STY  $E4
  0x044F13 $8F03: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x044F14 $8F04: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044F15 $8F05: C-----  D8       CLD  
  0x044F16 $8F06: C-----  E0 88    CPX  #$88
  0x044F18 $8F08: C-----  00       BRK  
  0x044F19 $8F09: C-----  00       BRK  
  0x044F1A $8F0A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044F1B $8F0B: C-----  A0 A3    LDY  #$A3
  0x044F1D $8F0D: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x044F1E $8F0E: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x044F1F $8F0F: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x044F20 $8F10: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044F21 $8F11: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044F22 $8F12: C-----  84 F7    STY  $F7
  0x044F24 $8F14: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044F25 $8F15: C-----  D8       CLD  
  0x044F26 $8F16: C-----  E0 88    CPX  #$88
  0x044F28 $8F18: C-----  F8       SED  
  0x044F29 $8F19: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044F2A $8F1A: C-----  78       SEI  
  0x044F2B $8F1B: C-----  88       DEY  
  0x044F2C $8F1C: C-----  A0 E0    LDY  #$E0
  0x044F2E $8F1E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044F2F $8F1F: C-----  00       BRK  
  0x044F30 $8F20: C-----  20 21 41 JSR  $4121
  0x044F33 $8F23: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x044F34 $8F24: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x044F35 $8F25: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x044F36 $8F26: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044F37 $8F27: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044F38 $8F28: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044F39 $8F29: C-----  1E 3E 39 ASL  $393E,X
  0x044F3C $8F2C: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x044F3D $8F2D: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x044F3E $8F2E: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x044F3F $8F2F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044F40 $8F30: C-----  00       BRK  
  0x044F41 $8F31: C-----  00       BRK  
  0x044F42 $8F32: C-----  00       BRK  
  0x044F43 $8F33: C-----  00       BRK  
  0x044F44 $8F34: C-----  00       BRK  
  0x044F45 $8F35: C-----  F0 0C    BEQ  $8F43
  0x044F47 $8F37: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044F48 $8F38: C-----  00       BRK  
  0x044F49 $8F39: C-----  00       BRK  
  0x044F4A $8F3A: C-----  00       BRK  
  0x044F4B $8F3B: C-----  00       BRK  
  0x044F4C $8F3C: C-----  00       BRK  
  0x044F4D $8F3D: C-----  00       BRK  
  0x044F4E $8F3E: C-----  F0 FC    BEQ  $8F3C
  0x044F50 $8F40: C-----  20 21 4F JSR  $4F21
  0x044F53 $8F43: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x044F54 $8F44: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x044F55 $8F45: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x044F56 $8F46: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044F57 $8F47: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044F58 $8F48: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044F59 $8F49: C-----  1E 30 34 ASL  $3430,X
  0x044F5C $8F4C: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x044F5D $8F4D: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x044F5E $8F4E: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x044F5F $8F4F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044F60 $8F50: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044F61 $8F51: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x044F62 $8F52: C-----  A4 F7    LDY  $F7
  0x044F64 $8F54: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044F65 $8F55: C-----  D8       CLD  
  0x044F66 $8F56: C-----  E0 88    CPX  #$88
  0x044F68 $8F58: C-----  00       BRK  
  0x044F69 $8F59: C-----  00       BRK  
  0x044F6A $8F5A: C-----  00       BRK  
  0x044F6B $8F5B: C-----  A0 A3    LDY  #$A3
  0x044F6D $8F5D: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x044F6E $8F5E: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x044F6F $8F5F: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x044F70 $8F60: C-----  00       BRK  
  0x044F71 $8F61: C-----  81 C2    STA  ($C2,X)
  0x044F73 $8F63: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x044F74 $8F64: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044F75 $8F65: C-----  D8       CLD  
  0x044F76 $8F66: C-----  E0 88    CPX  #$88
  0x044F78 $8F68: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044F79 $8F69: C-----  7E BC 88 ROR  $88BC,X
  0x044F7C $8F6C: C-----  A0 E0    LDY  #$E0
  0x044F7E $8F6E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044F7F $8F6F: C-----  00       BRK  
  0x044F80 $8F70: C-----  39 7F 7F AND  $7F7F,Y
  0x044F83 $8F73: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x044F84 $8F74: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x044F85 $8F75: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x044F86 $8F76: C-----  00       BRK  
  0x044F87 $8F77: C-----  00       BRK  
  0x044F88 $8F78: C-----  00       BRK  
  0x044F89 $8F79: C-----  39 2F 3F AND  $3F2F,Y
  0x044F8C $8F7C: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x044F8D $8F7D: C-----  00       BRK  
  0x044F8E $8F7E: C-----  00       BRK  
  0x044F8F $8F7F: C-----  00       BRK  
  0x044F90 $8F80: C-----  00       BRK  
  0x044F91 $8F81: C-----  00       BRK  
  0x044F92 $8F82: C-----  00       BRK  
  0x044F93 $8F83: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044F94 $8F84: C-----  40       RTI  
  0x044F95 $8F85: C-----  E1 F3    SBC  ($F3,X)
  0x044F97 $8F87: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044F98 $8F88: C-----  00       BRK  
  0x044F99 $8F89: C-----  00       BRK  
  0x044F9A $8F8A: C-----  00       BRK  
  0x044F9B $8F8B: C-----  00       BRK  
  0x044F9C $8F8C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044F9D $8F8D: C-----  00       BRK  
  0x044F9E $8F8E: C-----  E1 F3    SBC  ($F3,X)
  0x044FA0 $8F90: C-----  00       BRK  
  0x044FA1 $8F91: C-----  81 C2    STA  ($C2,X)
  0x044FA3 $8F93: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x044FA4 $8F94: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x044FA5 $8F95: C-----  D8       CLD  
  0x044FA6 $8F96: C-----  E0 88    CPX  #$88
  0x044FA8 $8F98: C-----  00       BRK  
  0x044FA9 $8F99: C-----  00       BRK  
  0x044FAA $8F9A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044FAB $8F9B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x044FAC $8F9C: C-----  !!UNDEF $A3  ; unknown opcode, treating as data
  0x044FAD $8F9D: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x044FAE $8F9E: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x044FAF $8F9F: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x044FB0 $8FA0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044FB1 $8FA1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044FB2 $8FA2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044FB3 $8FA3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044FB4 $8FA4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044FB5 $8FA5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044FB6 $8FA6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x044FB7 $8FA7: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x044FB8 $8FA8: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x044FB9 $8FA9: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x044FBA $8FAA: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x044FBB $8FAB: C-----  F8       SED  
  0x044FBC $8FAC: C-----  FD FD 7B SBC  $7BFD,X
  0x044FBF $8FAF: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x044FC0 $8FB0: C-----  00       BRK  
  0x044FC1 $8FB1: C-----  00       BRK  
  0x044FC2 $8FB2: C-----  00       BRK  
  0x044FC3 $8FB3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x044FC4 $8FB4: C-----  00       BRK  
  0x044FC5 $8FB5: C-----  00       BRK  
  0x044FC6 $8FB6: C-----  00       BRK  
  0x044FC7 $8FB7: C-----  00       BRK  
  0x044FC8 $8FB8: C-----  00       BRK  
  0x044FC9 $8FB9: C-----  00       BRK  
  0x044FCA $8FBA: C-----  00       BRK  
  0x044FCB $8FBB: C-----  00       BRK  
  0x044FCC $8FBC: C-----  00       BRK  
  0x044FCD $8FBD: C-----  00       BRK  
  0x044FCE $8FBE: C-----  00       BRK  
  0x044FCF $8FBF: C-----  00       BRK  
  0x044FD0 $8FC0: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x044FD1 $8FC1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044FD2 $8FC2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044FD3 $8FC3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044FD4 $8FC4: C-----  06 05    ASL  $05
  0x044FD6 $8FC6: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044FD7 $8FC7: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044FD8 $8FC8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x044FD9 $8FC9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044FDA $8FCA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x044FDB $8FCB: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044FDC $8FCC: C-----  01 02    ORA  ($02,X)
  0x044FDE $8FCE: C-----  01 01    ORA  ($01,X)
  0x044FE0 $8FD0: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x044FE1 $8FD1: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x044FE2 $8FD2: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x044FE3 $8FD3: C-----  2E 3F 3F ROL  $3F3F
  0x044FE6 $8FD6: C-----  25 1F    AND  $1F
  0x044FE8 $8FD8: C-----  38       SEC  
  0x044FE9 $8FD9: C-----  38       SEC  
  0x044FEA $8FDA: C-----  38       SEC  
  0x044FEB $8FDB: C-----  10 00    BPL  $8FDD
  0x044FED $8FDD: C-----  00       BRK  
  0x044FEE $8FDE: C-----  00       BRK  
  0x044FEF $8FDF: C-----  00       BRK  
  0x044FF0 $8FE0: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x044FF1 $8FE1: C-----  01 01    ORA  ($01,X)
  0x044FF3 $8FE3: C-----  01 01    ORA  ($01,X)
  0x044FF5 $8FE5: C-----  00       BRK  
  0x044FF6 $8FE6: C-----  00       BRK  
  0x044FF7 $8FE7: C-----  00       BRK  
  0x044FF8 $8FE8: C-----  01 00    ORA  ($00,X)
  0x044FFA $8FEA: C-----  00       BRK  
  0x044FFB $8FEB: C-----  00       BRK  
  0x044FFC $8FEC: C-----  00       BRK  
  0x044FFD $8FED: C-----  00       BRK  
  0x044FFE $8FEE: C-----  00       BRK  
  0x044FFF $8FEF: C-----  00       BRK  
  0x045000 $8FF0: C-----  35 27    AND  $27,X
  0x045002 $8FF2: C-----  3E 3E 1E ROL  $1E3E,X
  0x045005 $8FF5: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x045006 $8FF6: C-----  00       BRK  
  0x045007 $8FF7: C-----  00       BRK  
  0x045008 $8FF8: C-----  0A       ASL  A
  0x045009 $8FF9: C-----  18       CLC  
  0x04500A $8FFA: C-----  00       BRK  
  0x04500B $8FFB: C-----  00       BRK  
  0x04500C $8FFC: C-----  00       BRK  
  0x04500D $8FFD: C-----  00       BRK  
  0x04500E $8FFE: C-----  00       BRK  
  0x04500F $8FFF: C-----  00       BRK  
  0x045010 $9000: C-----  00       BRK  
  0x045011 $9001: C-----  00       BRK  
  0x045012 $9002: C-----  00       BRK  
  0x045013 $9003: C-----  00       BRK  
  0x045014 $9004: C-----  00       BRK  
  0x045015 $9005: C-----  00       BRK  
  0x045016 $9006: C-----  00       BRK  
  0x045017 $9007: C-----  00       BRK  
  0x045018 $9008: C-----  00       BRK  
  0x045019 $9009: C-----  00       BRK  
  0x04501A $900A: C-----  00       BRK  
  0x04501B $900B: C-----  00       BRK  
  0x04501C $900C: C-----  00       BRK  
  0x04501D $900D: C-----  00       BRK  
  0x04501E $900E: C-----  00       BRK  
  0x04501F $900F: C-----  00       BRK  
  0x045020 $9010: ------  .byte $FF
  0x045021 $9011: ------  .byte $FF
  0x045022 $9012: ------  .byte $FF
  0x045023 $9013: ------  .byte $FF
  0x045024 $9014: ------  .byte $FF
  0x045025 $9015: ------  .byte $FF
  0x045026 $9016: ------  .byte $FF
  0x045027 $9017: ------  .byte $FF
  0x045028 $9018: ------  .byte $00
  0x045029 $9019: ------  .byte $00
  0x04502A $901A: ------  .byte $00
  0x04502B $901B: ------  .byte $00
  0x04502C $901C: ------  .byte $00
  0x04502D $901D: ------  .byte $00
  0x04502E $901E: ------  .byte $00
  0x04502F $901F: ------  .byte $00
  0x045030 $9020: C-----  00       BRK  
  0x045031 $9021: C-----  00       BRK  
  0x045032 $9022: C-----  00       BRK  
  0x045033 $9023: C-----  01 01    ORA  ($01,X)
  0x045035 $9025: C-----  05 07    ORA  $07
  0x045037 $9027: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045038 $9028: C-----  00       BRK  
  0x045039 $9029: C-----  00       BRK  
  0x04503A $902A: C-----  00       BRK  
  0x04503B $902B: C-----  00       BRK  
  0x04503C $902C: C-----  00       BRK  
  0x04503D $902D: C-----  00       BRK  
  0x04503E $902E: C-----  00       BRK  
  0x04503F $902F: C-----  00       BRK  
  0x045040 $9030: C-----  01 03    ORA  ($03,X)
  0x045042 $9032: C-----  05 6A    ORA  $6A
  0x045044 $9034: C-----  B4 FC    LDY  $FC,X
  0x045046 $9036: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045047 $9037: C-----  FE 00 01 INC  $0100,X
  0x04504A $903A: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04504B $903B: C-----  05 0B    ORA  $0B
  0x04504D $903D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04504E $903E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04504F $903F: C-----  01 00    ORA  ($00,X)
  0x045051 $9041: C-----  00       BRK  
  0x045052 $9042: C-----  06 0F    ASL  $0F
  0x045054 $9044: C-----  1E 3F 7E ASL  $7E3F,X
  0x045057 $9047: C-----  F8       SED  
  0x045058 $9048: C-----  00       BRK  
  0x045059 $9049: C-----  00       BRK  
  0x04505A $904A: C-----  00       BRK  
  0x04505B $904B: C-----  06 0C    ASL  $0C
  0x04505D $904D: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x04505E $904E: C-----  30 70    BMI  $90C0
  0x045060 $9050: C-----  00       BRK  
  0x045061 $9051: C-----  00       BRK  
  0x045062 $9052: C-----  00       BRK  
  0x045063 $9053: C-----  00       BRK  
  0x045064 $9054: C-----  00       BRK  
  0x045065 $9055: C-----  00       BRK  
  0x045066 $9056: C-----  01 0F    ORA  ($0F,X)
  0x045068 $9058: C-----  00       BRK  
  0x045069 $9059: C-----  00       BRK  
  0x04506A $905A: C-----  00       BRK  
  0x04506B $905B: C-----  00       BRK  
  0x04506C $905C: C-----  00       BRK  
  0x04506D $905D: C-----  00       BRK  
  0x04506E $905E: C-----  00       BRK  
  0x04506F $905F: C-----  00       BRK  
  0x045070 $9060: C-----  F0 F0    BEQ  $9052
  0x045072 $9062: C-----  E0 C0    CPX  #$C0
  0x045074 $9064: C-----  40       RTI  
  0x045075 $9065: C-----  20 20 40 JSR  $4020
  0x045078 $9068: C-----  E0 E0    CPX  #$E0
  0x04507A $906A: C-----  C0 00    CPY  #$00
  0x04507C $906C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04507D $906D: C-----  C0 C0    CPY  #$C0
  0x04507F $906F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045080 $9070: C-----  70 FC    BVS  $906E
  0x045082 $9072: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045083 $9073: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045084 $9074: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x045085 $9075: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045086 $9076: C-----  01 01    ORA  ($01,X)
  0x045088 $9078: C-----  00       BRK  
  0x045089 $9079: C-----  70 5C    BVS  $90D7
  0x04508B $907B: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04508C $907C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04508D $907D: C-----  01 00    ORA  ($00,X)
  0x04508F $907F: C-----  00       BRK  
  0x045090 $9080: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045091 $9081: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x045092 $9082: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x045093 $9083: C-----  F9 F0 FC SBC  $FCF0,Y
  0x045096 $9086: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045097 $9087: C-----  FE 00 04 INC  $0400,X
  0x04509A $908A: C-----  19 46 EF ORA  $EF46,Y
  0x04509D $908D: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x04509E $908E: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04509F $908F: C-----  FD FE FF SBC  $FFFE,X
  0x0450A2 $9092: C-----  FE FC FC INC  $FCFC,X
  0x0450A5 $9095: C-----  79 31 03 ADC  $0331,Y
  0x0450A8 $9098: C-----  01 00    ORA  ($00,X)
  0x0450AA $909A: C-----  49 33    EOR  #$33
  0x0450AC $909C: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x0450AD $909D: C-----  B6 CE    LDX  $CE,Y
  0x0450AF $909F: C-----  FD FF DF SBC  $DFFF,X
  0x0450B2 $90A2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0450B3 $90A3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0450B4 $90A4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0450B5 $90A5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0450B6 $90A6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0450B7 $90A7: C-----  01 CC    ORA  ($CC,X)
  0x0450B9 $90A9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0450BA $90AA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0450BB $90AB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0450BC $90AC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0450BD $90AD: C-----  01 00    ORA  ($00,X)
  0x0450BF $90AF: C-----  00       BRK  
  0x0450C0 $90B0: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0450C1 $90B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0450C2 $90B2: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x0450C3 $90B3: C-----  E1 D1    SBC  ($D1,X)
  0x0450C5 $90B5: C-----  B1 4A    LDA  ($4A),Y
  0x0450C7 $90B7: C-----  8A       TXA  
  0x0450C8 $90B8: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x0450C9 $90B9: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x0450CA $90BA: C-----  C1 C0    CMP  ($C0,X)
  0x0450CC $90BC: C-----  A0 40    LDY  #$40
  0x0450CE $90BE: C-----  B1 71    LDA  ($71),Y
  0x0450D0 $90C0: C-----  40       RTI  
  0x0450D1 $90C1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0450D2 $90C2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0450D3 $90C3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0450D4 $90C4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0450D5 $90C5: C-----  C0 E0    CPY  #$E0
  0x0450D7 $90C7: C-----  F0 80    BEQ  $9049
  0x0450D9 $90C9: C-----  00       BRK  
  0x0450DA $90CA: C-----  00       BRK  
  0x0450DB $90CB: C-----  00       BRK  
  0x0450DC $90CC: C-----  00       BRK  
  0x0450DD $90CD: C-----  00       BRK  
  0x0450DE $90CE: C-----  C0 E0    CPY  #$E0
  0x0450E0 $90D0: C-----  01 00    ORA  ($00,X)
  0x0450E2 $90D2: C-----  00       BRK  
  0x0450E3 $90D3: C-----  00       BRK  
  0x0450E4 $90D4: C-----  00       BRK  
  0x0450E5 $90D5: C-----  01 03    ORA  ($03,X)
  0x0450E7 $90D7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0450E8 $90D8: C-----  00       BRK  
  0x0450E9 $90D9: C-----  00       BRK  
  0x0450EA $90DA: C-----  00       BRK  
  0x0450EB $90DB: C-----  00       BRK  
  0x0450EC $90DC: C-----  00       BRK  
  0x0450ED $90DD: C-----  00       BRK  
  0x0450EE $90DE: C-----  01 03    ORA  ($03,X)
  0x0450F0 $90E0: C-----  F8       SED  
  0x0450F1 $90E1: C-----  F8       SED  
  0x0450F2 $90E2: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0450F3 $90E3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0450F4 $90E4: C-----  F8       SED  
  0x0450F5 $90E5: C-----  38       SEC  
  0x0450F6 $90E6: C-----  C8       INY  
  0x0450F7 $90E7: C-----  30 F0    BMI  $90D9
  0x0450F9 $90E9: C-----  F0 F8    BEQ  $90E3
  0x0450FB $90EB: C-----  F8       SED  
  0x0450FC $90EC: C-----  30 C0    BMI  $90AE
  0x0450FE $90EE: C-----  30 C0    BMI  $90B0
  0x045100 $90F0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045101 $90F1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045102 $90F2: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x045103 $90F3: C-----  0D 1A 19 ORA  $191A
  0x045106 $90F6: C-----  18       CLC  
  0x045107 $90F7: C-----  39 03 03 AND  $0303,Y
  0x04510A $90FA: C-----  05 02    ORA  $02
  0x04510C $90FC: C-----  05 06    ORA  $06
  0x04510E $90FE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04510F $90FF: C-----  06 00    ASL  $00
  0x045111 $9101: C-----  00       BRK  
  0x045112 $9102: C-----  00       BRK  
  0x045113 $9103: C-----  00       BRK  
  0x045114 $9104: C-----  00       BRK  
  0x045115 $9105: C-----  00       BRK  
  0x045116 $9106: C-----  01 03    ORA  ($03,X)
  0x045118 $9108: C-----  00       BRK  
  0x045119 $9109: C-----  00       BRK  
  0x04511A $910A: C-----  00       BRK  
  0x04511B $910B: C-----  00       BRK  
  0x04511C $910C: C-----  00       BRK  
  0x04511D $910D: C-----  00       BRK  
  0x04511E $910E: C-----  00       BRK  
  0x04511F $910F: C-----  01 07    ORA  ($07,X)
  0x045121 $9111: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045122 $9112: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045123 $9113: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045124 $9114: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045125 $9115: C-----  FE 7C FF INC  $FF7C,X
  0x045128 $9118: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045129 $9119: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04512A $911A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04512B $911B: C-----  39 7C 74 AND  $747C,Y
  0x04512E $911E: C-----  28       PLP  
  0x04512F $911F: C-----  00       BRK  
  0x045130 $9120: C-----  00       BRK  
  0x045131 $9121: C-----  00       BRK  
  0x045132 $9122: C-----  00       BRK  
  0x045133 $9123: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x045134 $9124: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x045135 $9125: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x045136 $9126: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x045137 $9127: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x045138 $9128: C-----  00       BRK  
  0x045139 $9129: C-----  00       BRK  
  0x04513A $912A: C-----  00       BRK  
  0x04513B $912B: C-----  00       BRK  
  0x04513C $912C: C-----  C0 90    CPY  #$90
  0x04513E $912E: C-----  28       PLP  
  0x04513F $912F: C-----  70 00    BVS  $9131
  0x045141 $9131: C-----  00       BRK  
  0x045142 $9132: C-----  00       BRK  
  0x045143 $9133: C-----  00       BRK  
  0x045144 $9134: C-----  40       RTI  
  0x045145 $9135: C-----  D0 F0    BNE  $9127
  0x045147 $9137: C-----  F0 00    BEQ  $9139
  0x045149 $9139: C-----  00       BRK  
  0x04514A $913A: C-----  00       BRK  
  0x04514B $913B: C-----  00       BRK  
  0x04514C $913C: C-----  00       BRK  
  0x04514D $913D: C-----  00       BRK  
  0x04514E $913E: C-----  00       BRK  
  0x04514F $913F: C-----  00       BRK  
  0x045150 $9140: C-----  00       BRK  
  0x045151 $9141: C-----  01 07    ORA  ($07,X)
  0x045153 $9143: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045154 $9144: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045155 $9145: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045156 $9146: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045157 $9147: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045158 $9148: C-----  00       BRK  
  0x045159 $9149: C-----  00       BRK  
  0x04515A $914A: C-----  01 07    ORA  ($07,X)
  0x04515C $914C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04515D $914D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04515E $914E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04515F $914F: C-----  00       BRK  
  0x045160 $9150: C-----  00       BRK  
  0x045161 $9151: C-----  00       BRK  
  0x045162 $9152: C-----  00       BRK  
  0x045163 $9153: C-----  01 00    ORA  ($00,X)
  0x045165 $9155: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x045166 $9156: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x045167 $9157: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x045168 $9158: C-----  00       BRK  
  0x045169 $9159: C-----  00       BRK  
  0x04516A $915A: C-----  00       BRK  
  0x04516B $915B: C-----  00       BRK  
  0x04516C $915C: C-----  00       BRK  
  0x04516D $915D: C-----  00       BRK  
  0x04516E $915E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04516F $915F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045170 $9160: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045171 $9161: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045172 $9162: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045173 $9163: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045174 $9164: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045175 $9165: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045176 $9166: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045177 $9167: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x045178 $9168: C-----  00       BRK  
  0x045179 $9169: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04517A $916A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04517B $916B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04517C $916C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04517D $916D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04517E $916E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04517F $916F: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x045180 $9170: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045181 $9171: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045182 $9172: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x045183 $9173: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045184 $9174: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045185 $9175: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045186 $9176: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045187 $9177: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045188 $9178: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045189 $9179: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04518A $917A: C-----  00       BRK  
  0x04518B $917B: C-----  01 03    ORA  ($03,X)
  0x04518D $917D: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04518E $917E: C-----  C1 F1    CMP  ($F1,X)
  0x045190 $9180: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045191 $9181: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x045192 $9182: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x045193 $9183: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x045194 $9184: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x045195 $9185: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x045196 $9186: C-----  E1 F0    SBC  ($F0,X)
  0x045198 $9188: C-----  F0 70    BEQ  $91FA
  0x04519A $918A: C-----  79 3A 3B ADC  $3B3A,Y
  0x04519D $918D: C-----  3D DE EF AND  $EFDE,X
  0x0451A0 $9190: C-----  F8       SED  
  0x0451A1 $9191: C-----  F8       SED  
  0x0451A2 $9192: C-----  F8       SED  
  0x0451A3 $9193: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0451A4 $9194: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0451A5 $9195: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x0451A6 $9196: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0451A7 $9197: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0451A8 $9198: C-----  00       BRK  
  0x0451A9 $9199: C-----  00       BRK  
  0x0451AA $919A: C-----  00       BRK  
  0x0451AB $919B: C-----  08       PHP  
  0x0451AC $919C: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x0451AD $919D: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x0451AE $919E: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x0451AF $919F: C-----  EC F0 FB CPX  $FBF0
  0x0451B2 $91A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0451B3 $91A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0451B4 $91A4: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0451B5 $91A5: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x0451B6 $91A6: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x0451B7 $91A7: C-----  C4 EF    CPY  $EF
  0x0451B9 $91A9: C-----  E4 C3    CPX  $C3
  0x0451BB $91AB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0451BC $91AC: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0451BD $91AD: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0451BE $91AE: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0451BF $91AF: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x0451C0 $91B0: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x0451C1 $91B1: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0451C2 $91B2: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0451C3 $91B3: C-----  E0 E0    CPX  #$E0
  0x0451C5 $91B5: C-----  E0 C0    CPX  #$C0
  0x0451C7 $91B7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0451C8 $91B8: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x0451C9 $91B9: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x0451CA $91BA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0451CB $91BB: C-----  C0 C0    CPY  #$C0
  0x0451CD $91BD: C-----  C0 80    CPY  #$80
  0x0451CF $91BF: C-----  00       BRK  
  0x0451D0 $91C0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0451D1 $91C1: C-----  C0 E0    CPY  #$E0
  0x0451D3 $91C3: C-----  F0 F0    BEQ  $91B5
  0x0451D5 $91C5: C-----  E0 C0    CPX  #$C0
  0x0451D7 $91C7: C-----  00       BRK  
  0x0451D8 $91C8: C-----  00       BRK  
  0x0451D9 $91C9: C-----  00       BRK  
  0x0451DA $91CA: C-----  C0 E0    CPY  #$E0
  0x0451DC $91CC: C-----  60       RTS  
  0x0451DD $91CD: C-----  C0 00    CPY  #$00
  0x0451DF $91CF: C-----  00       BRK  
  0x0451E0 $91D0: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0451E1 $91D1: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0451E2 $91D2: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0451E3 $91D3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0451E4 $91D4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0451E5 $91D5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0451E6 $91D6: C-----  01 00    ORA  ($00,X)
  0x0451E8 $91D8: C-----  E0 78    CPX  #$78
  0x0451EA $91DA: C-----  79 F9 FD ADC  $FDF9,Y
  0x0451ED $91DD: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0451EE $91DE: C-----  FE FF 04 INC  $04FF,X
  0x0451F1 $91E1: C-----  08       PHP  
  0x0451F2 $91E2: C-----  F0 E0    BEQ  $91C4
  0x0451F4 $91E4: C-----  C0 80    CPY  #$80
  0x0451F6 $91E6: C-----  00       BRK  
  0x0451F7 $91E7: C-----  00       BRK  
  0x0451F8 $91E8: C-----  F8       SED  
  0x0451F9 $91E9: C-----  F0 00    BEQ  $91EB
  0x0451FB $91EB: C-----  C0 80    CPY  #$80
  0x0451FD $91ED: C-----  00       BRK  
  0x0451FE $91EE: C-----  00       BRK  
  0x0451FF $91EF: C-----  00       BRK  
  0x045200 $91F0: C-----  00       BRK  
  0x045201 $91F1: C-----  00       BRK  
  0x045202 $91F2: C-----  00       BRK  
  0x045203 $91F3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045204 $91F4: C-----  06 88    ASL  $88
  0x045206 $91F6: C-----  C9 C9    CMP  #$C9
  0x045208 $91F8: C-----  00       BRK  
  0x045209 $91F9: C-----  00       BRK  
  0x04520A $91FA: C-----  00       BRK  
  0x04520B $91FB: C-----  00       BRK  
  0x04520C $91FC: C-----  01 07    ORA  ($07,X)
  0x04520E $91FE: C-----  86 86    STX  $86
  0x045210 $9200: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045211 $9201: C-----  08       PHP  
  0x045212 $9202: C-----  10 10    BPL  $9214
  0x045214 $9204: C-----  30 F8    BMI  $91FE
  0x045216 $9206: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045217 $9207: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045218 $9208: C-----  00       BRK  
  0x045219 $9209: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04521A $920A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04521B $920B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04521C $920C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04521D $920D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04521E $920E: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x04521F $920F: C-----  68       PLA  
  0x045220 $9210: C-----  84 C4    STY  $C4
  0x045222 $9212: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x045223 $9213: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x045224 $9214: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045225 $9215: C-----  3E 40 C0 ROL  $C040,X
  0x045228 $9218: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x045229 $9219: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04522A $921A: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x04522B $921B: C-----  8C 80 C0 STY  $C080
  0x04522E $921E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04522F $921F: C-----  00       BRK  
  0x045230 $9220: C-----  10 2C    BPL  $924E
  0x045232 $9222: C-----  3E 7F FF ROL  $FF7F,X
  0x045235 $9225: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045236 $9226: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045237 $9227: C-----  FE 0F 13 INC  $130F,X
  0x04523A $922A: C-----  0D 3E 7E ORA  $7E3E
  0x04523D $922D: C-----  FE FE FD INC  $FDFE,X
  0x045240 $9230: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045241 $9231: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045242 $9232: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045243 $9233: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045244 $9234: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045245 $9235: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045246 $9236: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045247 $9237: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x045248 $9238: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045249 $9239: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04524A $923A: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04524B $923B: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04524C $923C: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04524D $923D: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04524E $923E: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04524F $923F: C-----  !!UNDEF $B3  ; unknown opcode, treating as data
  0x045250 $9240: C-----  20 C1 83 JSR  $83C1
  0x045253 $9243: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045254 $9244: C-----  06 07    ASL  $07
  0x045256 $9246: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045257 $9247: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045258 $9248: C-----  C0 00    CPY  #$00
  0x04525A $924A: C-----  00       BRK  
  0x04525B $924B: C-----  01 01    ORA  ($01,X)
  0x04525D $924D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04525E $924E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04525F $924F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045260 $9250: C-----  CD 0D 07 CMP  $070D
  0x045263 $9253: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x045264 $9254: C-----  84 48    STY  $48
  0x045266 $9256: C-----  F0 E0    BEQ  $9238
  0x045268 $9258: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x045269 $9259: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x04526A $925A: C-----  F8       SED  
  0x04526B $925B: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04526C $925C: C-----  78       SEI  
  0x04526D $925D: C-----  B0 00    BCS  $925F
  0x04526F $925F: C-----  C0 C0    CPY  #$C0
  0x045271 $9261: C-----  E0 E0    CPX  #$E0
  0x045273 $9263: C-----  F8       SED  
  0x045274 $9264: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x045275 $9265: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x045276 $9266: C-----  F8       SED  
  0x045277 $9267: C-----  F8       SED  
  0x045278 $9268: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045279 $9269: C-----  C0 C0    CPY  #$C0
  0x04527B $926B: C-----  E0 E8    CPX  #$E8
  0x04527D $926D: C-----  F5 F7    SBC  $F7,X
  0x04527F $926F: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x045280 $9270: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045281 $9271: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045282 $9272: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045283 $9273: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045284 $9274: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045285 $9275: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045286 $9276: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045287 $9277: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045288 $9278: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045289 $9279: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04528A $927A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04528B $927B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04528C $927C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04528D $927D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04528E $927E: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04528F $927F: C-----  CE FC F8 DEC  $F8FC
  0x045292 $9282: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x045293 $9283: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045294 $9284: C-----  00       BRK  
  0x045295 $9285: C-----  00       BRK  
  0x045296 $9286: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045297 $9287: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045298 $9288: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x045299 $9289: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04529A $928A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04529B $928B: C-----  00       BRK  
  0x04529C $928C: C-----  00       BRK  
  0x04529D $928D: C-----  00       BRK  
  0x04529E $928E: C-----  00       BRK  
  0x04529F $928F: C-----  00       BRK  
  0x0452A0 $9290: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x0452A1 $9291: C-----  85 04    STA  $04
  0x0452A3 $9293: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x0452A4 $9294: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0452A5 $9295: C-----  31 DF    AND  ($DF),Y
  0x0452A7 $9297: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0452A8 $9298: C-----  B9 78 F8 LDA  $F878,Y
  0x0452AB $929B: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0452AC $929C: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0452AD $929D: C-----  0E 00 00 ASL  $0000
  0x0452B0 $92A0: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x0452B1 $92A1: C-----  85 04    STA  $04
  0x0452B3 $92A3: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x0452B4 $92A4: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0452B5 $92A5: C-----  31 DF    AND  ($DF),Y
  0x0452B7 $92A7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0452B8 $92A8: C-----  01 02    ORA  ($02,X)
  0x0452BA $92AA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0452BB $92AB: C-----  01 01    ORA  ($01,X)
  0x0452BD $92AD: C-----  00       BRK  
  0x0452BE $92AE: C-----  00       BRK  
  0x0452BF $92AF: C-----  00       BRK  
  0x0452C0 $92B0: C-----  00       BRK  
  0x0452C1 $92B1: C-----  00       BRK  
  0x0452C2 $92B2: C-----  00       BRK  
  0x0452C3 $92B3: C-----  00       BRK  
  0x0452C4 $92B4: C-----  01 0F    ORA  ($0F,X)
  0x0452C6 $92B6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0452C7 $92B7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0452C8 $92B8: C-----  00       BRK  
  0x0452C9 $92B9: C-----  00       BRK  
  0x0452CA $92BA: C-----  00       BRK  
  0x0452CB $92BB: C-----  00       BRK  
  0x0452CC $92BC: C-----  00       BRK  
  0x0452CD $92BD: C-----  00       BRK  
  0x0452CE $92BE: C-----  00       BRK  
  0x0452CF $92BF: C-----  00       BRK  
  0x0452D0 $92C0: C-----  F0 E1    BEQ  $92A3
  0x0452D2 $92C2: C-----  01 01    ORA  ($01,X)
  0x0452D4 $92C4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0452D5 $92C5: C-----  00       BRK  
  0x0452D6 $92C6: C-----  C1 7F    CMP  ($7F,X)
  0x0452D8 $92C8: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x0452D9 $92C9: C-----  1E FE FE ASL  $FEFE,X
  0x0452DC $92CC: C-----  FD FF 3E SBC  $3EFF,X
  0x0452DF $92CF: C-----  00       BRK  
  0x0452E0 $92D0: C-----  0E 00 01 ASL  $0100
  0x0452E3 $92D3: C-----  01 03    ORA  ($03,X)
  0x0452E5 $92D5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0452E6 $92D6: C-----  0E FF F1 ASL  $F1FF
  0x0452E9 $92D9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0452EA $92DA: C-----  FE FE FD INC  $FDFE,X
  0x0452ED $92DD: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0452EE $92DE: C-----  F0 00    BEQ  $92E0
  0x0452F0 $92E0: C-----  00       BRK  
  0x0452F1 $92E1: C-----  00       BRK  
  0x0452F2 $92E2: C-----  D8       CLD  
  0x0452F3 $92E3: C-----  6C FD FE JMP  ($FEFD)
  0x0452F6 $92E6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0452F7 $92E7: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0452F8 $92E8: C-----  00       BRK  
  0x0452F9 $92E9: C-----  00       BRK  
  0x0452FA $92EA: C-----  00       BRK  
  0x0452FB $92EB: C-----  00       BRK  
  0x0452FC $92EC: C-----  00       BRK  
  0x0452FD $92ED: C-----  01 2B    ORA  ($2B,X)
  0x0452FF $92EF: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x045300 $92F0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045301 $92F1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045302 $92F2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045303 $92F3: C-----  01 03    ORA  ($03,X)
  0x045305 $92F5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x045306 $92F6: C-----  0A       ASL  A
  0x045307 $92F7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045308 $92F8: C-----  00       BRK  
  0x045309 $92F9: C-----  00       BRK  
  0x04530A $92FA: C-----  00       BRK  
  0x04530B $92FB: C-----  00       BRK  
  0x04530C $92FC: C-----  00       BRK  
  0x04530D $92FD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04530E $92FE: C-----  05 02    ORA  $02
  0x045310 $9300: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x045311 $9301: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x045312 $9302: C-----  60       RTS  
  0x045313 $9303: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045314 $9304: C-----  00       BRK  
  0x045315 $9305: C-----  00       BRK  
  0x045316 $9306: C-----  00       BRK  
  0x045317 $9307: C-----  00       BRK  
  0x045318 $9308: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x045319 $9309: C-----  E0 80    CPX  #$80
  0x04531B $930B: C-----  00       BRK  
  0x04531C $930C: C-----  00       BRK  
  0x04531D $930D: C-----  00       BRK  
  0x04531E $930E: C-----  00       BRK  
  0x04531F $930F: C-----  00       BRK  
  0x045320 $9310: C-----  86 46    STX  $46
  0x045322 $9312: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x045323 $9313: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x045324 $9314: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x045325 $9315: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045326 $9316: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x045327 $9317: C-----  18       CLC  
  0x045328 $9318: C-----  79 39 1D ADC  $1D39,Y
  0x04532B $931B: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04532C $931C: C-----  60       RTS  
  0x04532D $931D: C-----  F0 F3    BEQ  $9312
  0x04532F $931F: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x045330 $9320: C-----  E0 C0    CPX  #$C0
  0x045332 $9322: C-----  C0 C0    CPY  #$C0
  0x045334 $9324: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045335 $9325: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045336 $9326: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045337 $9327: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045338 $9328: C-----  C0 80    CPY  #$80
  0x04533A $932A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04533B $932B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04533C $932C: C-----  00       BRK  
  0x04533D $932D: C-----  00       BRK  
  0x04533E $932E: C-----  00       BRK  
  0x04533F $932F: C-----  00       BRK  
  0x045340 $9330: C-----  39 FF FF AND  $FFFF,Y
  0x045343 $9333: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045344 $9334: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045345 $9335: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045346 $9336: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x045347 $9337: C-----  81 C6    STA  ($C6,X)
  0x045349 $9339: C-----  08       PHP  
  0x04534A $933A: C-----  EE EF F7 INC  $F7EF
  0x04534D $933D: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x04534E $933E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04534F $933F: C-----  00       BRK  
  0x045350 $9340: C-----  20 40 40 JSR  $4040
  0x045353 $9343: C-----  40       RTI  
  0x045354 $9344: C-----  C0 C0    CPY  #$C0
  0x045356 $9346: C-----  40       RTI  
  0x045357 $9347: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045358 $9348: C-----  C0 80    CPY  #$80
  0x04535A $934A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04535B $934B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04535C $934C: C-----  00       BRK  
  0x04535D $934D: C-----  00       BRK  
  0x04535E $934E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04535F $934F: C-----  00       BRK  
  0x045360 $9350: C-----  D0 D4    BNE  $9326
  0x045362 $9352: C-----  91 9B    STA  ($9B),Y
  0x045364 $9354: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x045365 $9355: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x045366 $9356: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x045367 $9357: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x045368 $9358: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x045369 $9359: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x04536A $935A: C-----  0E 05 0B ASL  $0B05
  0x04536D $935D: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04536E $935E: C-----  05 05    ORA  $05
  0x045370 $9360: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045371 $9361: C-----  00       BRK  
  0x045372 $9362: C-----  00       BRK  
  0x045373 $9363: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045374 $9364: C-----  C0 E0    CPY  #$E0
  0x045376 $9366: C-----  30 10    BMI  $9378
  0x045378 $9368: C-----  00       BRK  
  0x045379 $9369: C-----  00       BRK  
  0x04537A $936A: C-----  00       BRK  
  0x04537B $936B: C-----  00       BRK  
  0x04537C $936C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04537D $936D: C-----  00       BRK  
  0x04537E $936E: C-----  C0 E0    CPY  #$E0
  0x045380 $9370: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045381 $9371: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x045382 $9372: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x045383 $9373: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045384 $9374: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045385 $9375: C-----  01 00    ORA  ($00,X)
  0x045387 $9377: C-----  00       BRK  
  0x045388 $9378: C-----  F0 78    BEQ  $93F2
  0x04538A $937A: C-----  7D FD FD ADC  $FDFD,X
  0x04538D $937D: C-----  FE FF FF INC  $FFFF,X
  0x045390 $9380: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045391 $9381: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045392 $9382: C-----  F0 F8    BEQ  $937C
  0x045394 $9384: C-----  F8       SED  
  0x045395 $9385: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045396 $9386: C-----  00       BRK  
  0x045397 $9387: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045398 $9388: C-----  00       BRK  
  0x045399 $9389: C-----  00       BRK  
  0x04539A $938A: C-----  00       BRK  
  0x04539B $938B: C-----  B0 F0    BCS  $937D
  0x04539D $938D: C-----  00       BRK  
  0x04539E $938E: C-----  00       BRK  
  0x04539F $938F: C-----  00       BRK  
  0x0453A0 $9390: C-----  01 00    ORA  ($00,X)
  0x0453A2 $9392: C-----  00       BRK  
  0x0453A3 $9393: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0453A4 $9394: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0453A5 $9395: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0453A6 $9396: C-----  00       BRK  
  0x0453A7 $9397: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0453A8 $9398: C-----  FE FF FF INC  $FFFF,X
  0x0453AB $939B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0453AC $939C: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0453AD $939D: C-----  00       BRK  
  0x0453AE $939E: C-----  00       BRK  
  0x0453AF $939F: C-----  00       BRK  
  0x0453B0 $93A0: C-----  FE FF FF INC  $FFFF,X
  0x0453B3 $93A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0453B4 $93A4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0453B5 $93A5: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x0453B6 $93A6: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x0453B7 $93A7: C-----  !!UNDEF $A3  ; unknown opcode, treating as data
  0x0453B8 $93A8: C-----  75 A6    ADC  $A6,X
  0x0453BA $93AA: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0453BB $93AB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0453BC $93AC: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0453BD $93AD: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x0453BE $93AE: C-----  DD 5D 0F CMP  $0F5D,X
  0x0453C1 $93B1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0453C2 $93B2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0453C3 $93B3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0453C4 $93B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0453C5 $93B5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0453C6 $93B6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0453C7 $93B7: C-----  00       BRK  
  0x0453C8 $93B8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0453C9 $93B9: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0453CA $93BA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0453CB $93BB: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0453CC $93BC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0453CD $93BD: C-----  00       BRK  
  0x0453CE $93BE: C-----  00       BRK  
  0x0453CF $93BF: C-----  00       BRK  
  0x0453D0 $93C0: C-----  10 10    BPL  $93D2
  0x0453D2 $93C2: C-----  20 30 48 JSR  $4830
  0x0453D5 $93C5: C-----  98       TYA  
  0x0453D6 $93C6: C-----  70 C0    BVS  $9388
  0x0453D8 $93C8: C-----  E0 E0    CPX  #$E0
  0x0453DA $93CA: C-----  C0 C0    CPY  #$C0
  0x0453DC $93CC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0453DD $93CD: C-----  00       BRK  
  0x0453DE $93CE: C-----  00       BRK  
  0x0453DF $93CF: C-----  00       BRK  
  0x0453E0 $93D0: C-----  D0 D4    BNE  $93A6
  0x0453E2 $93D2: C-----  91 9B    STA  ($9B),Y
  0x0453E4 $93D4: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0453E5 $93D5: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x0453E6 $93D6: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x0453E7 $93D7: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0453E8 $93D8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0453E9 $93D9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0453EA $93DA: C-----  00       BRK  
  0x0453EB $93DB: C-----  01 83    ORA  ($83,X)
  0x0453ED $93DD: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x0453EE $93DE: C-----  E1 F1    SBC  ($F1,X)
  0x0453F0 $93E0: C-----  C1 D1    CMP  ($D1,X)
  0x0453F2 $93E2: C-----  F1 FC    SBC  ($FC),Y
  0x0453F4 $93E4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0453F5 $93E5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0453F6 $93E6: C-----  FE 31 BE INC  $BE31,X
  0x0453F9 $93E9: C-----  AE 0E E3 LDX  $E30E
  0x0453FC $93EC: C-----  F0 70    BEQ  $945E
  0x0453FE $93EE: C-----  20 00 39 JSR  $3900
  0x045401 $93F1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045402 $93F2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045403 $93F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045404 $93F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045405 $93F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045406 $93F6: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x045407 $93F7: C-----  81 00    STA  ($00,X)
  0x045409 $93F9: C-----  08       PHP  
  0x04540A $93FA: C-----  EE EF F7 INC  $F7EF
  0x04540D $93FD: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x04540E $93FE: C-----  BC 7E 00 LDY  $007E,X
  0x045411 $9401: C-----  00       BRK  
  0x045412 $9402: C-----  39 9E FF AND  $FF9E,Y
  0x045415 $9405: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045416 $9406: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045417 $9407: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045418 $9408: C-----  00       BRK  
  0x045419 $9409: C-----  00       BRK  
  0x04541A $940A: C-----  00       BRK  
  0x04541B $940B: C-----  00       BRK  
  0x04541C $940C: C-----  00       BRK  
  0x04541D $940D: C-----  00       BRK  
  0x04541E $940E: C-----  00       BRK  
  0x04541F $940F: C-----  00       BRK  
  0x045420 $9410: C-----  00       BRK  
  0x045421 $9411: C-----  00       BRK  
  0x045422 $9412: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045423 $9413: C-----  C0 E0    CPY  #$E0
  0x045425 $9415: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x045426 $9416: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045427 $9417: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045428 $9418: C-----  00       BRK  
  0x045429 $9419: C-----  00       BRK  
  0x04542A $941A: C-----  00       BRK  
  0x04542B $941B: C-----  00       BRK  
  0x04542C $941C: C-----  00       BRK  
  0x04542D $941D: C-----  00       BRK  
  0x04542E $941E: C-----  00       BRK  
  0x04542F $941F: C-----  00       BRK  
  0x045430 $9420: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045431 $9421: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045432 $9422: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045433 $9423: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045434 $9424: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x045435 $9425: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x045436 $9426: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x045437 $9427: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045438 $9428: C-----  00       BRK  
  0x045439 $9429: C-----  08       PHP  
  0x04543A $942A: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04543B $942B: C-----  06 33    ASL  $33
  0x04543D $942D: C-----  75 77    ADC  $77,X
  0x04543F $942F: C-----  7E F8 FC ROR  $FCF8,X
  0x045442 $9432: C-----  FE FE FE INC  $FEFE,X
  0x045445 $9435: C-----  FE 7C 7F INC  $7F7C,X
  0x045448 $9438: C-----  00       BRK  
  0x045449 $9439: C-----  00       BRK  
  0x04544A $943A: C-----  00       BRK  
  0x04544B $943B: C-----  00       BRK  
  0x04544C $943C: C-----  F0 00    BEQ  $943E
  0x04544E $943E: C-----  A0 A0    LDY  #$A0
  0x045450 $9440: C-----  00       BRK  
  0x045451 $9441: C-----  00       BRK  
  0x045452 $9442: C-----  00       BRK  
  0x045453 $9443: C-----  01 07    ORA  ($07,X)
  0x045455 $9445: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x045456 $9446: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x045457 $9447: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045458 $9448: C-----  00       BRK  
  0x045459 $9449: C-----  00       BRK  
  0x04545A $944A: C-----  00       BRK  
  0x04545B $944B: C-----  00       BRK  
  0x04545C $944C: C-----  00       BRK  
  0x04545D $944D: C-----  00       BRK  
  0x04545E $944E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04545F $944F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045460 $9450: C-----  00       BRK  
  0x045461 $9451: C-----  00       BRK  
  0x045462 $9452: C-----  00       BRK  
  0x045463 $9453: C-----  F0 FE    BEQ  $9453
  0x045465 $9455: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045466 $9456: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045467 $9457: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045468 $9458: C-----  00       BRK  
  0x045469 $9459: C-----  00       BRK  
  0x04546A $945A: C-----  00       BRK  
  0x04546B $945B: C-----  00       BRK  
  0x04546C $945C: C-----  00       BRK  
  0x04546D $945D: C-----  00       BRK  
  0x04546E $945E: C-----  00       BRK  
  0x04546F $945F: C-----  00       BRK  
  0x045470 $9460: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045471 $9461: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045472 $9462: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045473 $9463: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x045474 $9464: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045475 $9465: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045476 $9466: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045477 $9467: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045478 $9468: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045479 $9469: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04547A $946A: C-----  00       BRK  
  0x04547B $946B: C-----  11 0F    ORA  ($0F),Y
  0x04547D $946D: C-----  C4 E6    CPY  $E6
  0x04547F $946F: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x045480 $9470: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045481 $9471: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045482 $9472: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045483 $9473: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045484 $9474: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045485 $9475: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045486 $9476: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045487 $9477: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045488 $9478: C-----  00       BRK  
  0x045489 $9479: C-----  00       BRK  
  0x04548A $947A: C-----  F0 98    BEQ  $9414
  0x04548C $947C: C-----  71 B3    ADC  ($B3),Y
  0x04548E $947E: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04548F $947F: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x045490 $9480: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045491 $9481: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045492 $9482: C-----  FE FF FF INC  $FFFF,X
  0x045495 $9485: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045496 $9486: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045497 $9487: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045498 $9488: C-----  !!UNDEF $B3  ; unknown opcode, treating as data
  0x045499 $9489: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04549A $948A: C-----  E1 A0    SBC  ($A0,X)
  0x04549C $948C: C-----  B1 DF    LDA  ($DF),Y
  0x04549E $948E: C-----  46 00    LSR  $00
  0x0454A0 $9490: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x0454A1 $9491: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x0454A2 $9492: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x0454A3 $9493: C-----  E1 C1    SBC  ($C1,X)
  0x0454A5 $9495: C-----  C1 41    CMP  ($41,X)
  0x0454A7 $9497: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0454A8 $9498: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x0454A9 $9499: C-----  5D 5D DE EOR  $DE5D,X
  0x0454AC $949C: C-----  BE 3E BE LDX  $BE3E,Y
  0x0454AF $949F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0454B0 $94A0: C-----  00       BRK  
  0x0454B1 $94A1: C-----  00       BRK  
  0x0454B2 $94A2: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0454B3 $94A3: C-----  10 00    BPL  $94A5
  0x0454B5 $94A5: C-----  C1 08    CMP  ($08,X)
  0x0454B7 $94A7: C-----  00       BRK  
  0x0454B8 $94A8: C-----  00       BRK  
  0x0454B9 $94A9: C-----  00       BRK  
  0x0454BA $94AA: C-----  00       BRK  
  0x0454BB $94AB: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0454BC $94AC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0454BD $94AD: C-----  3E F7 FF ROL  $FFF7,X
  0x0454C0 $94B0: C-----  00       BRK  
  0x0454C1 $94B1: C-----  00       BRK  
  0x0454C2 $94B2: C-----  00       BRK  
  0x0454C3 $94B3: C-----  C0 20    CPY  #$20
  0x0454C5 $94B5: C-----  B0 48    BCS  $94FF
  0x0454C7 $94B7: C-----  08       PHP  
  0x0454C8 $94B8: C-----  00       BRK  
  0x0454C9 $94B9: C-----  00       BRK  
  0x0454CA $94BA: C-----  00       BRK  
  0x0454CB $94BB: C-----  00       BRK  
  0x0454CC $94BC: C-----  C0 40    CPY  #$40
  0x0454CE $94BE: C-----  B0 F0    BCS  $94B0
  0x0454D0 $94C0: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0454D1 $94C1: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0454D2 $94C2: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0454D3 $94C3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0454D4 $94C4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0454D5 $94C5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0454D6 $94C6: C-----  00       BRK  
  0x0454D7 $94C7: C-----  00       BRK  
  0x0454D8 $94C8: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x0454D9 $94C9: C-----  6C 68 F4 JMP  ($F468)
  0x0454DC $94CC: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0454DD $94CD: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0454DE $94CE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0454DF $94CF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0454E0 $94D0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0454E1 $94D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0454E2 $94D2: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0454E3 $94D3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0454E4 $94D4: C-----  F8       SED  
  0x0454E5 $94D5: C-----  F8       SED  
  0x0454E6 $94D6: C-----  F0 00    BEQ  $94D8
  0x0454E8 $94D8: C-----  FE 7C 7B INC  $7B7C,X
  0x0454EB $94DB: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x0454EC $94DC: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x0454ED $94DD: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x0454EE $94DE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0454EF $94DF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0454F0 $94E0: C-----  00       BRK  
  0x0454F1 $94E1: C-----  1E 3F 7F ASL  $7F3F,X
  0x0454F4 $94E4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0454F5 $94E5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0454F6 $94E6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0454F7 $94E7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0454F8 $94E8: C-----  00       BRK  
  0x0454F9 $94E9: C-----  00       BRK  
  0x0454FA $94EA: C-----  1E 3F 7F ASL  $7F3F,X
  0x0454FD $94ED: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0454FE $94EE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0454FF $94EF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045500 $94F0: C-----  00       BRK  
  0x045501 $94F1: C-----  00       BRK  
  0x045502 $94F2: C-----  00       BRK  
  0x045503 $94F3: C-----  00       BRK  
  0x045504 $94F4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045505 $94F5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045506 $94F6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045507 $94F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045508 $94F8: C-----  00       BRK  
  0x045509 $94F9: C-----  00       BRK  
  0x04550A $94FA: C-----  00       BRK  
  0x04550B $94FB: C-----  00       BRK  
  0x04550C $94FC: C-----  00       BRK  
  0x04550D $94FD: C-----  1E 3F FF ASL  $FF3F,X
  0x045510 $9500: C-----  00       BRK  
  0x045511 $9501: C-----  00       BRK  
  0x045512 $9502: C-----  00       BRK  
  0x045513 $9503: C-----  00       BRK  
  0x045514 $9504: C-----  00       BRK  
  0x045515 $9505: C-----  00       BRK  
  0x045516 $9506: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045517 $9507: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045518 $9508: C-----  00       BRK  
  0x045519 $9509: C-----  00       BRK  
  0x04551A $950A: C-----  00       BRK  
  0x04551B $950B: C-----  00       BRK  
  0x04551C $950C: C-----  00       BRK  
  0x04551D $950D: C-----  00       BRK  
  0x04551E $950E: C-----  00       BRK  
  0x04551F $950F: C-----  00       BRK  
  0x045520 $9510: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045521 $9511: C-----  C0 F0    CPY  #$F0
  0x045523 $9513: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045524 $9514: C-----  FE FF FF INC  $FFFF,X
  0x045527 $9517: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045528 $9518: C-----  00       BRK  
  0x045529 $9519: C-----  00       BRK  
  0x04552A $951A: C-----  C0 F0    CPY  #$F0
  0x04552C $951C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04552D $951D: C-----  FE 7F 3F INC  $3F7F,X
  0x045530 $9520: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045531 $9521: C-----  C0 C0    CPY  #$C0
  0x045533 $9523: C-----  C0 C0    CPY  #$C0
  0x045535 $9525: C-----  C0 C0    CPY  #$C0
  0x045537 $9527: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x045538 $9528: C-----  00       BRK  
  0x045539 $9529: C-----  00       BRK  
  0x04553A $952A: C-----  00       BRK  
  0x04553B $952B: C-----  00       BRK  
  0x04553C $952C: C-----  00       BRK  
  0x04553D $952D: C-----  00       BRK  
  0x04553E $952E: C-----  00       BRK  
  0x04553F $952F: C-----  00       BRK  
  0x045540 $9530: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045541 $9531: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045542 $9532: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045543 $9533: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045544 $9534: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045545 $9535: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045546 $9536: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045547 $9537: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045548 $9538: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045549 $9539: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04554A $953A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04554B $953B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04554C $953C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04554D $953D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04554E $953E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04554F $953F: C-----  01 00    ORA  ($00,X)
  0x045551 $9541: C-----  00       BRK  
  0x045552 $9542: C-----  00       BRK  
  0x045553 $9543: C-----  00       BRK  
  0x045554 $9544: C-----  00       BRK  
  0x045555 $9545: C-----  00       BRK  
  0x045556 $9546: C-----  81 C1    STA  ($C1,X)
  0x045558 $9548: C-----  00       BRK  
  0x045559 $9549: C-----  00       BRK  
  0x04555A $954A: C-----  00       BRK  
  0x04555B $954B: C-----  00       BRK  
  0x04555C $954C: C-----  00       BRK  
  0x04555D $954D: C-----  00       BRK  
  0x04555E $954E: C-----  00       BRK  
  0x04555F $954F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045560 $9550: C-----  FE FE FE INC  $FEFE,X
  0x045563 $9553: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x045564 $9554: C-----  78       SEI  
  0x045565 $9555: C-----  A0 E0    LDY  #$E0
  0x045567 $9557: C-----  E0 00    CPX  #$00
  0x045569 $9559: C-----  F0 00    BEQ  $955B
  0x04556B $955B: C-----  A0 A0    LDY  #$A0
  0x04556D $955D: C-----  C0 40    CPY  #$40
  0x04556F $955F: C-----  40       RTI  
  0x045570 $9560: C-----  C1 F3    CMP  ($F3,X)
  0x045572 $9562: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x045573 $9563: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x045574 $9564: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x045575 $9565: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x045576 $9566: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x045577 $9567: C-----  E5 80    SBC  $80
  0x045579 $9569: C-----  C0 D0    CPY  #$D0
  0x04557B $956B: C-----  E8       INX  
  0x04557C $956C: C-----  EC EC EC CPX  $ECEC
  0x04557F $956F: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x045580 $9570: C-----  99 CF FF STA  $FFCF,Y
  0x045583 $9573: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045584 $9574: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045585 $9575: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045586 $9576: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045587 $9577: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045588 $9578: C-----  00       BRK  
  0x045589 $9579: C-----  00       BRK  
  0x04558A $957A: C-----  00       BRK  
  0x04558B $957B: C-----  00       BRK  
  0x04558C $957C: C-----  00       BRK  
  0x04558D $957D: C-----  00       BRK  
  0x04558E $957E: C-----  00       BRK  
  0x04558F $957F: C-----  01 C7    ORA  ($C7,X)
  0x045591 $9581: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045592 $9582: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045593 $9583: C-----  01 01    ORA  ($01,X)
  0x045595 $9585: C-----  01 01    ORA  ($01,X)
  0x045597 $9587: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045598 $9588: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x045599 $9589: C-----  FD FD FE SBC  $FEFD,X
  0x04559C $958C: C-----  FE FE FE INC  $FEFE,X
  0x04559F $958F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0455A0 $9590: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0455A1 $9591: C-----  20 30 10 JSR  $1030
  0x0455A4 $9594: C-----  10 18    BPL  $95AE
  0x0455A6 $9596: C-----  08       PHP  
  0x0455A7 $9597: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0455A8 $9598: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0455A9 $9599: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0455AA $959A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0455AB $959B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0455AC $959C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0455AD $959D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0455AE $959E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0455AF $959F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0455B0 $95A0: C-----  00       BRK  
  0x0455B1 $95A1: C-----  00       BRK  
  0x0455B2 $95A2: C-----  01 07    ORA  ($07,X)
  0x0455B4 $95A4: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x0455B5 $95A5: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x0455B6 $95A6: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0455B7 $95A7: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0455B8 $95A8: C-----  00       BRK  
  0x0455B9 $95A9: C-----  00       BRK  
  0x0455BA $95AA: C-----  00       BRK  
  0x0455BB $95AB: C-----  00       BRK  
  0x0455BC $95AC: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0455BD $95AD: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0455BE $95AE: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0455BF $95AF: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0455C0 $95B0: C-----  C0 80    CPY  #$80
  0x0455C2 $95B2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0455C3 $95B3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0455C4 $95B4: C-----  00       BRK  
  0x0455C5 $95B5: C-----  00       BRK  
  0x0455C6 $95B6: C-----  00       BRK  
  0x0455C7 $95B7: C-----  00       BRK  
  0x0455C8 $95B8: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0455C9 $95B9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0455CA $95BA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0455CB $95BB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0455CC $95BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0455CD $95BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0455CE $95BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0455CF $95BF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0455D0 $95C0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0455D1 $95C1: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0455D2 $95C2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0455D3 $95C3: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0455D4 $95C4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0455D5 $95C5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0455D6 $95C6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0455D7 $95C7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0455D8 $95C8: C-----  81 C3    STA  ($C3,X)
  0x0455DA $95CA: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x0455DB $95CB: C-----  D1 C1    CMP  ($C1),Y
  0x0455DD $95CD: C-----  E0 F0    CPX  #$F0
  0x0455DF $95CF: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x0455E0 $95D0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0455E1 $95D1: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0455E2 $95D2: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0455E3 $95D3: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x0455E4 $95D4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0455E5 $95D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0455E6 $95D6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0455E7 $95D7: C-----  FE 06 33 INC  $3306,X
  0x0455EA $95DA: C-----  75 7F    ADC  $7F,X
  0x0455EC $95DC: C-----  7E F3 E3 ROR  $E3F3,X
  0x0455EF $95DF: C-----  E1 7F    SBC  ($7F,X)
  0x0455F1 $95E1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0455F2 $95E2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0455F3 $95E3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0455F4 $95E4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0455F5 $95E5: C-----  0E 00 00 ASL  $0000
  0x0455F8 $95E8: C-----  BA       TSX  
  0x0455F9 $95E9: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x0455FA $95EA: C-----  DD DE EE CMP  $EEDE,X
  0x0455FD $95ED: C-----  F1 FF    SBC  ($FF),Y
  0x0455FF $95EF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045600 $95F0: C-----  FE FC F8 INC  $F8FC,X
  0x045603 $95F3: C-----  F8       SED  
  0x045604 $95F4: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x045605 $95F5: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x045606 $95F6: C-----  24 24    BIT  $24
  0x045608 $95F8: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x045609 $95F9: C-----  18       CLC  
  0x04560A $95FA: C-----  F0 C0    BEQ  $95BC
  0x04560C $95FC: C-----  28       PLP  
  0x04560D $95FD: C-----  E8       INX  
  0x04560E $95FE: C-----  D8       CLD  
  0x04560F $95FF: C-----  D8       CLD  
  0x045610 $9600: C-----  00       BRK  
  0x045611 $9601: C-----  00       BRK  
  0x045612 $9602: C-----  20 A8 FA JSR  $FAA8
  0x045615 $9605: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045616 $9606: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045617 $9607: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045618 $9608: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045619 $9609: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04561A $960A: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04561B $960B: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04561C $960C: C-----  35 4A    AND  $4A,X
  0x04561E $960E: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x04561F $960F: C-----  6A       ROR  A
  0x045620 $9610: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x045621 $9611: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x045622 $9612: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x045623 $9613: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045624 $9614: C-----  4A       LSR  A
  0x045625 $9615: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x045626 $9616: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x045627 $9617: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x045628 $9618: C-----  F8       SED  
  0x045629 $9619: C-----  E8       INX  
  0x04562A $961A: C-----  F8       SED  
  0x04562B $961B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04562C $961C: C-----  B4 5C    LDY  $5C,X
  0x04562E $961E: C-----  08       PHP  
  0x04562F $961F: C-----  68       PLA  
  0x045630 $9620: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045631 $9621: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045632 $9622: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045633 $9623: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045634 $9624: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045635 $9625: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045636 $9626: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045637 $9627: C-----  78       SEI  
  0x045638 $9628: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045639 $9629: C-----  FD CF F3 SBC  $F3CF,X
  0x04563C $962C: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04563D $962D: C-----  DE 60 87 DEC  $8760,X
  0x045640 $9630: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045641 $9631: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x045642 $9632: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x045643 $9633: C-----  C1 C1    CMP  ($C1,X)
  0x045645 $9635: C-----  81 01    STA  ($01,X)
  0x045647 $9637: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045648 $9638: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x045649 $9639: C-----  CD DD BE CMP  $BEDD
  0x04564C $963C: C-----  BE 7E FE LDX  $FE7E,Y
  0x04564F $963F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045650 $9640: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045651 $9641: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045652 $9642: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045653 $9643: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045654 $9644: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045655 $9645: C-----  01 01    ORA  ($01,X)
  0x045657 $9647: C-----  00       BRK  
  0x045658 $9648: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045659 $9649: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04565A $964A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04565B $964B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04565C $964C: C-----  01 00    ORA  ($00,X)
  0x04565E $964E: C-----  00       BRK  
  0x04565F $964F: C-----  00       BRK  
  0x045660 $9650: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045661 $9651: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045662 $9652: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045663 $9653: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045664 $9654: C-----  F8       SED  
  0x045665 $9655: C-----  F8       SED  
  0x045666 $9656: C-----  F8       SED  
  0x045667 $9657: C-----  F0 FE    BEQ  $9657
  0x045669 $9659: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x04566A $965A: C-----  CA       DEX  
  0x04566B $965B: C-----  D8       CLD  
  0x04566C $965C: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x04566D $965D: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04566E $965E: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04566F $965F: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x045670 $9660: C-----  C1 C1    CMP  ($C1,X)
  0x045672 $9662: C-----  C0 C0    CPY  #$C0
  0x045674 $9664: C-----  E0 E0    CPX  #$E0
  0x045676 $9666: C-----  F8       SED  
  0x045677 $9667: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045678 $9668: C-----  BE BE BF LDX  $BFBE,Y
  0x04567B $966B: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04567C $966C: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04567D $966D: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04567E $966E: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04567F $966F: C-----  C0 E0    CPY  #$E0
  0x045681 $9671: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045682 $9672: C-----  00       BRK  
  0x045683 $9673: C-----  E1 10    SBC  ($10,X)
  0x045685 $9675: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x045686 $9676: C-----  08       PHP  
  0x045687 $9677: C-----  08       PHP  
  0x045688 $9678: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x045689 $9679: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04568A $967A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04568B $967B: C-----  1E 0F 03 ASL  $030F,X
  0x04568E $967E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04568F $967F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045690 $9680: C-----  00       BRK  
  0x045691 $9681: C-----  00       BRK  
  0x045692 $9682: C-----  00       BRK  
  0x045693 $9683: C-----  00       BRK  
  0x045694 $9684: C-----  00       BRK  
  0x045695 $9685: C-----  00       BRK  
  0x045696 $9686: C-----  F8       SED  
  0x045697 $9687: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045698 $9688: C-----  00       BRK  
  0x045699 $9689: C-----  00       BRK  
  0x04569A $968A: C-----  00       BRK  
  0x04569B $968B: C-----  00       BRK  
  0x04569C $968C: C-----  00       BRK  
  0x04569D $968D: C-----  00       BRK  
  0x04569E $968E: C-----  00       BRK  
  0x04569F $968F: C-----  F0 00    BEQ  $9691
  0x0456A1 $9691: C-----  00       BRK  
  0x0456A2 $9692: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0456A3 $9693: C-----  C0 E0    CPY  #$E0
  0x0456A5 $9695: C-----  F8       SED  
  0x0456A6 $9696: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0456A7 $9697: C-----  FE 00 00 INC  $0000,X
  0x0456AA $969A: C-----  00       BRK  
  0x0456AB $969B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0456AC $969C: C-----  C0 C0    CPY  #$C0
  0x0456AE $969E: C-----  F8       SED  
  0x0456AF $969F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0456B0 $96A0: C-----  FE FF FF INC  $FFFF,X
  0x0456B3 $96A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0456B4 $96A4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0456B5 $96A5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0456B6 $96A6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0456B7 $96A7: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0456B8 $96A8: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0456B9 $96A9: C-----  FE FF FF INC  $FFFF,X
  0x0456BC $96AC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0456BD $96AD: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x0456BE $96AE: C-----  81 00    STA  ($00,X)
  0x0456C0 $96B0: C-----  FE 7E 7E INC  $7E7E,X
  0x0456C3 $96B3: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0456C4 $96B4: C-----  00       BRK  
  0x0456C5 $96B5: C-----  00       BRK  
  0x0456C6 $96B6: C-----  00       BRK  
  0x0456C7 $96B7: C-----  00       BRK  
  0x0456C8 $96B8: C-----  2C 0C 3C BIT  $3C0C
  0x0456CB $96BB: C-----  00       BRK  
  0x0456CC $96BC: C-----  00       BRK  
  0x0456CD $96BD: C-----  00       BRK  
  0x0456CE $96BE: C-----  00       BRK  
  0x0456CF $96BF: C-----  00       BRK  
  0x0456D0 $96C0: C-----  18       CLC  
  0x0456D1 $96C1: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0456D2 $96C2: C-----  28       PLP  
  0x0456D3 $96C3: C-----  2C 44 46 BIT  $4644
  0x0456D6 $96C6: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0456D7 $96C7: C-----  C1 00    CMP  ($00,X)
  0x0456D9 $96C9: C-----  00       BRK  
  0x0456DA $96CA: C-----  10 10    BPL  $96DC
  0x0456DC $96CC: C-----  38       SEC  
  0x0456DD $96CD: C-----  38       SEC  
  0x0456DE $96CE: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0456DF $96CF: C-----  3E 18 1C ROL  $1C18,X
  0x0456E2 $96D2: C-----  28       PLP  
  0x0456E3 $96D3: C-----  2C 44 46 BIT  $4644
  0x0456E6 $96D6: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0456E7 $96D7: C-----  C1 07    CMP  ($07,X)
  0x0456E9 $96D9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0456EA $96DA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0456EB $96DB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0456EC $96DC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0456ED $96DD: C-----  01 00    ORA  ($00,X)
  0x0456EF $96DF: C-----  00       BRK  
  0x0456F0 $96E0: C-----  00       BRK  
  0x0456F1 $96E1: C-----  00       BRK  
  0x0456F2 $96E2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0456F3 $96E3: C-----  C0 FC    CPY  #$FC
  0x0456F5 $96E5: C-----  FE FF FF INC  $FFFF,X
  0x0456F8 $96E8: C-----  00       BRK  
  0x0456F9 $96E9: C-----  00       BRK  
  0x0456FA $96EA: C-----  00       BRK  
  0x0456FB $96EB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0456FC $96EC: C-----  C0 DC    CPY  #$DC
  0x0456FE $96EE: C-----  E0 FC    CPX  #$FC
  0x045700 $96F0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045701 $96F1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045702 $96F2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045703 $96F3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045704 $96F4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045705 $96F5: C-----  01 00    ORA  ($00,X)
  0x045707 $96F7: C-----  00       BRK  
  0x045708 $96F8: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x045709 $96F9: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04570A $96FA: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04570B $96FB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04570C $96FC: C-----  01 00    ORA  ($00,X)
  0x04570E $96FE: C-----  00       BRK  
  0x04570F $96FF: C-----  00       BRK  
  0x045710 $9700: C-----  E1 83    SBC  ($83,X)
  0x045712 $9702: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045713 $9703: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045714 $9704: C-----  05 0D    ORA  $0D
  0x045716 $9706: C-----  08       PHP  
  0x045717 $9707: C-----  11 80    ORA  ($80),Y
  0x045719 $9709: C-----  00       BRK  
  0x04571A $970A: C-----  01 01    ORA  ($01,X)
  0x04571C $970C: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04571D $970D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04571E $970E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04571F $970F: C-----  0E FE FC ASL  $FCFE
  0x045722 $9712: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045723 $9713: C-----  F8       SED  
  0x045724 $9714: C-----  F0 E0    BEQ  $96F6
  0x045726 $9716: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045727 $9717: C-----  00       BRK  
  0x045728 $9718: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045729 $9719: C-----  F8       SED  
  0x04572A $971A: C-----  F8       SED  
  0x04572B $971B: C-----  F0 C0    BEQ  $96DD
  0x04572D $971D: C-----  00       BRK  
  0x04572E $971E: C-----  00       BRK  
  0x04572F $971F: C-----  00       BRK  
  0x045730 $9720: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x045731 $9721: C-----  24 28    BIT  $28
  0x045733 $9723: C-----  50 60    BVC  $9785
  0x045735 $9725: C-----  C0 80    CPY  #$80
  0x045737 $9727: C-----  00       BRK  
  0x045738 $9728: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x045739 $9729: C-----  18       CLC  
  0x04573A $972A: C-----  10 20    BPL  $974C
  0x04573C $972C: C-----  00       BRK  
  0x04573D $972D: C-----  00       BRK  
  0x04573E $972E: C-----  00       BRK  
  0x04573F $972F: C-----  00       BRK  
  0x045740 $9730: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x045741 $9731: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x045742 $9732: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x045743 $9733: C-----  !!UNDEF $92  ; unknown opcode, treating as data
  0x045744 $9734: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x045745 $9735: C-----  10 60    BPL  $9797
  0x045747 $9737: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045748 $9738: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x045749 $9739: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x04574A $973A: C-----  78       SEI  
  0x04574B $973B: C-----  6C F0 E0 JMP  ($E0F0)
  0x04574E $973E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04574F $973F: C-----  00       BRK  
  0x045750 $9740: C-----  CC F6 FF CPY  $FFF6
  0x045753 $9743: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045754 $9744: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045755 $9745: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045756 $9746: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045757 $9747: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045758 $9748: C-----  00       BRK  
  0x045759 $9749: C-----  00       BRK  
  0x04575A $974A: C-----  00       BRK  
  0x04575B $974B: C-----  00       BRK  
  0x04575C $974C: C-----  00       BRK  
  0x04575D $974D: C-----  00       BRK  
  0x04575E $974E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04575F $974F: C-----  C0 00    CPY  #$00
  0x045761 $9751: C-----  00       BRK  
  0x045762 $9752: C-----  40       RTI  
  0x045763 $9753: C-----  C0 C0    CPY  #$C0
  0x045765 $9755: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045766 $9756: C-----  C0 E0    CPY  #$E0
  0x045768 $9758: C-----  00       BRK  
  0x045769 $9759: C-----  00       BRK  
  0x04576A $975A: C-----  00       BRK  
  0x04576B $975B: C-----  00       BRK  
  0x04576C $975C: C-----  00       BRK  
  0x04576D $975D: C-----  00       BRK  
  0x04576E $975E: C-----  00       BRK  
  0x04576F $975F: C-----  00       BRK  
  0x045770 $9760: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x045771 $9761: C-----  1E 3F 7F ASL  $7F3F,X
  0x045774 $9764: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045775 $9765: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045776 $9766: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045777 $9767: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x045778 $9768: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045779 $9769: C-----  0D 0E 1F ORA  $1F0E
  0x04577C $976C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04577D $976D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04577E $976E: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04577F $976F: C-----  10 00    BPL  $9771
  0x045781 $9771: C-----  00       BRK  
  0x045782 $9772: C-----  00       BRK  
  0x045783 $9773: C-----  00       BRK  
  0x045784 $9774: C-----  00       BRK  
  0x045785 $9775: C-----  00       BRK  
  0x045786 $9776: C-----  00       BRK  
  0x045787 $9777: C-----  00       BRK  
  0x045788 $9778: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045789 $9779: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04578A $977A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04578B $977B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04578C $977C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04578D $977D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04578E $977E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04578F $977F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045790 $9780: C-----  00       BRK  
  0x045791 $9781: C-----  00       BRK  
  0x045792 $9782: C-----  00       BRK  
  0x045793 $9783: C-----  00       BRK  
  0x045794 $9784: C-----  00       BRK  
  0x045795 $9785: C-----  00       BRK  
  0x045796 $9786: C-----  20 D0 FF JSR  $FFD0
  0x045799 $9789: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04579A $978A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04579B $978B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04579C $978C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04579D $978D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04579E $978E: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04579F $978F: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0457A0 $9790: C-----  00       BRK  
  0x0457A1 $9791: C-----  00       BRK  
  0x0457A2 $9792: C-----  01 01    ORA  ($01,X)
  0x0457A4 $9794: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0457A5 $9795: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0457A6 $9796: C-----  18       CLC  
  0x0457A7 $9797: C-----  60       RTS  
  0x0457A8 $9798: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0457A9 $9799: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0457AA $979A: C-----  FE FE FC INC  $FCFE,X
  0x0457AD $979D: C-----  F8       SED  
  0x0457AE $979E: C-----  E0 80    CPX  #$80
  0x0457B0 $97A0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0457B1 $97A1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0457B2 $97A2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0457B3 $97A3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0457B4 $97A4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0457B5 $97A5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0457B6 $97A6: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0457B7 $97A7: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0457B8 $97A8: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0457B9 $97A9: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0457BA $97AA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0457BB $97AB: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0457BC $97AC: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0457BD $97AD: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0457BE $97AE: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0457BF $97AF: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0457C0 $97B0: C-----  10 8E    BPL  $9740
  0x0457C2 $97B2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0457C3 $97B3: C-----  E0 FF    CPX  #$FF
  0x0457C5 $97B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0457C6 $97B6: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0457C7 $97B7: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x0457C8 $97B8: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0457C9 $97B9: C-----  71 7F    ADC  ($7F),Y
  0x0457CB $97BB: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0457CC $97BC: C-----  E0 F0    CPX  #$F0
  0x0457CE $97BE: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0457CF $97BF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0457D0 $97C0: C-----  86 98    STX  $98
  0x0457D2 $97C2: C-----  60       RTS  
  0x0457D3 $97C3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0457D4 $97C4: C-----  00       BRK  
  0x0457D5 $97C5: C-----  00       BRK  
  0x0457D6 $97C6: C-----  00       BRK  
  0x0457D7 $97C7: C-----  00       BRK  
  0x0457D8 $97C8: C-----  78       SEI  
  0x0457D9 $97C9: C-----  60       RTS  
  0x0457DA $97CA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0457DB $97CB: C-----  00       BRK  
  0x0457DC $97CC: C-----  00       BRK  
  0x0457DD $97CD: C-----  00       BRK  
  0x0457DE $97CE: C-----  00       BRK  
  0x0457DF $97CF: C-----  00       BRK  
  0x0457E0 $97D0: C-----  01 01    ORA  ($01,X)
  0x0457E2 $97D2: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0457E3 $97D3: C-----  06 05    ASL  $05
  0x0457E5 $97D5: C-----  06 0C    ASL  $0C
  0x0457E7 $97D7: C-----  08       PHP  
  0x0457E8 $97D8: C-----  00       BRK  
  0x0457E9 $97D9: C-----  00       BRK  
  0x0457EA $97DA: C-----  01 01    ORA  ($01,X)
  0x0457EC $97DC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0457ED $97DD: C-----  00       BRK  
  0x0457EE $97DE: C-----  00       BRK  
  0x0457EF $97DF: C-----  00       BRK  
  0x0457F0 $97E0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0457F1 $97E1: C-----  01 02    ORA  ($02,X)
  0x0457F3 $97E3: C-----  0A       ASL  A
  0x0457F4 $97E4: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x0457F5 $97E5: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0457F6 $97E6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0457F7 $97E7: C-----  F8       SED  
  0x0457F8 $97E8: C-----  00       BRK  
  0x0457F9 $97E9: C-----  FE FC F4 INC  $F4FC,X
  0x0457FC $97EC: C-----  28       PLP  
  0x0457FD $97ED: C-----  F0 08    BEQ  $97F7
  0x0457FF $97EF: C-----  F0 28    BEQ  $9819
  0x045801 $97F1: C-----  48       PHA  
  0x045802 $97F2: C-----  10 60    BPL  $9854
  0x045804 $97F4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045805 $97F5: C-----  00       BRK  
  0x045806 $97F6: C-----  B8       CLV  
  0x045807 $97F7: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045808 $97F8: C-----  D0 B0    BNE  $97AA
  0x04580A $97FA: C-----  E0 80    CPX  #$80
  0x04580C $97FC: C-----  00       BRK  
  0x04580D $97FD: C-----  00       BRK  
  0x04580E $97FE: C-----  00       BRK  
  0x04580F $97FF: C-----  18       CLC  
  0x045810 $9800: C-----  00       BRK  
  0x045811 $9801: C-----  00       BRK  
  0x045812 $9802: C-----  00       BRK  
  0x045813 $9803: C-----  00       BRK  
  0x045814 $9804: C-----  00       BRK  
  0x045815 $9805: C-----  00       BRK  
  0x045816 $9806: C-----  00       BRK  
  0x045817 $9807: C-----  00       BRK  
  0x045818 $9808: C-----  00       BRK  
  0x045819 $9809: C-----  00       BRK  
  0x04581A $980A: C-----  00       BRK  
  0x04581B $980B: C-----  00       BRK  
  0x04581C $980C: C-----  00       BRK  
  0x04581D $980D: C-----  00       BRK  
  0x04581E $980E: C-----  00       BRK  
  0x04581F $980F: C-----  00       BRK  
  0x045820 $9810: ------  .byte $FF
  0x045821 $9811: ------  .byte $FF
  0x045822 $9812: ------  .byte $FF
  0x045823 $9813: ------  .byte $FF
  0x045824 $9814: ------  .byte $FF
  0x045825 $9815: ------  .byte $FF
  0x045826 $9816: ------  .byte $FF
  0x045827 $9817: ------  .byte $FF
  0x045828 $9818: ------  .byte $00
  0x045829 $9819: ------  .byte $00
  0x04582A $981A: ------  .byte $00
  0x04582B $981B: ------  .byte $00
  0x04582C $981C: ------  .byte $00
  0x04582D $981D: ------  .byte $00
  0x04582E $981E: ------  .byte $00
  0x04582F $981F: ------  .byte $00
  0x045830 $9820: C-----  01 02    ORA  ($02,X)
  0x045832 $9822: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x045833 $9823: C-----  11 26    ORA  ($26),Y
  0x045835 $9825: C-----  58       CLI  
  0x045836 $9826: C-----  E0 00    CPX  #$00
  0x045838 $9828: C-----  00       BRK  
  0x045839 $9829: C-----  01 03    ORA  ($03,X)
  0x04583B $982B: C-----  0E 18 20 ASL  $2018
  0x04583E $982E: C-----  00       BRK  
  0x04583F $982F: C-----  00       BRK  
  0x045840 $9830: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045841 $9831: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045842 $9832: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045843 $9833: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045844 $9834: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045845 $9835: C-----  00       BRK  
  0x045846 $9836: C-----  00       BRK  
  0x045847 $9837: C-----  00       BRK  
  0x045848 $9838: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045849 $9839: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04584A $983A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04584B $983B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04584C $983C: C-----  00       BRK  
  0x04584D $983D: C-----  00       BRK  
  0x04584E $983E: C-----  00       BRK  
  0x04584F $983F: C-----  00       BRK  
  0x045850 $9840: C-----  00       BRK  
  0x045851 $9841: C-----  00       BRK  
  0x045852 $9842: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045853 $9843: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045854 $9844: C-----  40       RTI  
  0x045855 $9845: C-----  30 0E    BMI  $9855
  0x045857 $9847: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045858 $9848: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045859 $9849: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04585A $984A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04585B $984B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04585C $984C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04585D $984D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04585E $984E: C-----  01 00    ORA  ($00,X)
  0x045860 $9850: C-----  00       BRK  
  0x045861 $9851: C-----  00       BRK  
  0x045862 $9852: C-----  00       BRK  
  0x045863 $9853: C-----  01 01    ORA  ($01,X)
  0x045865 $9855: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045866 $9856: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045867 $9857: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045868 $9858: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045869 $9859: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04586A $985A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04586B $985B: C-----  FE FE FC INC  $FCFE,X
  0x04586E $985E: C-----  E0 1E    CPX  #$1E
  0x045870 $9860: C-----  FE FE FE INC  $FEFE,X
  0x045873 $9863: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045874 $9864: C-----  F8       SED  
  0x045875 $9865: C-----  00       BRK  
  0x045876 $9866: C-----  00       BRK  
  0x045877 $9867: C-----  00       BRK  
  0x045878 $9868: C-----  AC AC D4 LDY  $D4AC
  0x04587B $986B: C-----  B8       CLV  
  0x04587C $986C: C-----  00       BRK  
  0x04587D $986D: C-----  00       BRK  
  0x04587E $986E: C-----  00       BRK  
  0x04587F $986F: C-----  00       BRK  
  0x045880 $9870: C-----  00       BRK  
  0x045881 $9871: C-----  00       BRK  
  0x045882 $9872: C-----  00       BRK  
  0x045883 $9873: C-----  30 67    BMI  $98DC
  0x045885 $9875: C-----  58       CLI  
  0x045886 $9876: C-----  91 80    STA  ($80),Y
  0x045888 $9878: C-----  00       BRK  
  0x045889 $9879: C-----  00       BRK  
  0x04588A $987A: C-----  00       BRK  
  0x04588B $987B: C-----  00       BRK  
  0x04588C $987C: C-----  00       BRK  
  0x04588D $987D: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x04588E $987E: C-----  6E 7F 1F ROR  $1F7F
  0x045891 $9881: C-----  0E 38 C0 ASL  $C038
  0x045894 $9884: C-----  00       BRK  
  0x045895 $9885: C-----  01 03    ORA  ($03,X)
  0x045897 $9887: C-----  06 EE    ASL  $EE
  0x045899 $9889: C-----  F0 C0    BEQ  $984B
  0x04589B $988B: C-----  00       BRK  
  0x04589C $988C: C-----  00       BRK  
  0x04589D $988D: C-----  00       BRK  
  0x04589E $988E: C-----  00       BRK  
  0x04589F $988F: C-----  01 DC    ORA  ($DC,X)
  0x0458A1 $9891: C-----  1E 3F 7F ASL  $7F3F,X
  0x0458A4 $9894: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0458A5 $9895: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0458A6 $9896: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0458A7 $9897: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0458A8 $9898: C-----  00       BRK  
  0x0458A9 $9899: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0458AA $989A: C-----  0E 1F 3F ASL  $3F1F
  0x0458AD $989D: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0458AE $989E: C-----  BC 90 0C LDY  $0C90,X
  0x0458B1 $98A1: C-----  11 2E    ORA  ($2E),Y
  0x0458B3 $98A3: C-----  70 00    BVS  $98A5
  0x0458B5 $98A5: C-----  00       BRK  
  0x0458B6 $98A6: C-----  00       BRK  
  0x0458B7 $98A7: C-----  00       BRK  
  0x0458B8 $98A8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0458B9 $98A9: C-----  0E 10 00 ASL  $0010
  0x0458BC $98AC: C-----  00       BRK  
  0x0458BD $98AD: C-----  00       BRK  
  0x0458BE $98AE: C-----  00       BRK  
  0x0458BF $98AF: C-----  00       BRK  
  0x0458C0 $98B0: C-----  30 C0    BMI  $9872
  0x0458C2 $98B2: C-----  00       BRK  
  0x0458C3 $98B3: C-----  00       BRK  
  0x0458C4 $98B4: C-----  00       BRK  
  0x0458C5 $98B5: C-----  00       BRK  
  0x0458C6 $98B6: C-----  00       BRK  
  0x0458C7 $98B7: C-----  00       BRK  
  0x0458C8 $98B8: C-----  C0 00    CPY  #$00
  0x0458CA $98BA: C-----  00       BRK  
  0x0458CB $98BB: C-----  00       BRK  
  0x0458CC $98BC: C-----  00       BRK  
  0x0458CD $98BD: C-----  00       BRK  
  0x0458CE $98BE: C-----  00       BRK  
  0x0458CF $98BF: C-----  00       BRK  
  0x0458D0 $98C0: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0458D1 $98C1: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0458D2 $98C2: C-----  01 07    ORA  ($07,X)
  0x0458D4 $98C4: C-----  0A       ASL  A
  0x0458D5 $98C5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0458D6 $98C6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0458D7 $98C7: C-----  01 00    ORA  ($00,X)
  0x0458D9 $98C9: C-----  01 00    ORA  ($00,X)
  0x0458DB $98CB: C-----  00       BRK  
  0x0458DC $98CC: C-----  01 01    ORA  ($01,X)
  0x0458DE $98CE: C-----  00       BRK  
  0x0458DF $98CF: C-----  00       BRK  
  0x0458E0 $98D0: C-----  00       BRK  
  0x0458E1 $98D1: C-----  00       BRK  
  0x0458E2 $98D2: C-----  00       BRK  
  0x0458E3 $98D3: C-----  00       BRK  
  0x0458E4 $98D4: C-----  00       BRK  
  0x0458E5 $98D5: C-----  55 FD    EOR  $FD,X
  0x0458E7 $98D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0458E8 $98D8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0458E9 $98D9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0458EA $98DA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0458EB $98DB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0458EC $98DC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0458ED $98DD: C-----  AA       TAX  
  0x0458EE $98DE: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x0458EF $98DF: C-----  15 02    ORA  $02,X
  0x0458F1 $98E1: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0458F2 $98E2: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0458F3 $98E3: C-----  01 03    ORA  ($03,X)
  0x0458F5 $98E5: C-----  05 01    ORA  $01
  0x0458F7 $98E7: C-----  01 00    ORA  ($00,X)
  0x0458F9 $98E9: C-----  01 01    ORA  ($01,X)
  0x0458FB $98EB: C-----  00       BRK  
  0x0458FC $98EC: C-----  00       BRK  
  0x0458FD $98ED: C-----  00       BRK  
  0x0458FE $98EE: C-----  00       BRK  
  0x0458FF $98EF: C-----  00       BRK  
  0x045900 $98F0: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x045901 $98F1: C-----  BE DE FD LDX  $FDDE,Y
  0x045904 $98F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045905 $98F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045906 $98F6: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045907 $98F7: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x045908 $98F8: C-----  4C 59 7D JMP  $7D59
  0x04590B $98FB: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04590C $98FC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04590D $98FD: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x04590E $98FE: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04590F $98FF: C-----  00       BRK  
  0x045910 $9900: C-----  00       BRK  
  0x045911 $9901: C-----  00       BRK  
  0x045912 $9902: C-----  00       BRK  
  0x045913 $9903: C-----  00       BRK  
  0x045914 $9904: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x045915 $9905: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x045916 $9906: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x045917 $9907: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x045918 $9908: C-----  00       BRK  
  0x045919 $9909: C-----  00       BRK  
  0x04591A $990A: C-----  00       BRK  
  0x04591B $990B: C-----  00       BRK  
  0x04591C $990C: C-----  00       BRK  
  0x04591D $990D: C-----  00       BRK  
  0x04591E $990E: C-----  00       BRK  
  0x04591F $990F: C-----  08       PHP  
  0x045920 $9910: C-----  20 26 49 JSR  $4926
  0x045923 $9913: C-----  4A       LSR  A
  0x045924 $9914: C-----  50 90    BVC  $98A6
  0x045926 $9916: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045927 $9917: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045928 $9918: C-----  00       BRK  
  0x045929 $9919: C-----  00       BRK  
  0x04592A $991A: C-----  24 25    BIT  $25
  0x04592C $991C: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04592D $991D: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04592E $991E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04592F $991F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045930 $9920: C-----  00       BRK  
  0x045931 $9921: C-----  00       BRK  
  0x045932 $9922: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x045933 $9923: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x045934 $9924: C-----  8C 34 C5 STY  $C534
  0x045937 $9927: C-----  05 00    ORA  $00
  0x045939 $9929: C-----  00       BRK  
  0x04593A $992A: C-----  00       BRK  
  0x04593B $992B: C-----  00       BRK  
  0x04593C $992C: C-----  00       BRK  
  0x04593D $992D: C-----  08       PHP  
  0x04593E $992E: C-----  38       SEC  
  0x04593F $992F: C-----  F8       SED  
  0x045940 $9930: C-----  00       BRK  
  0x045941 $9931: C-----  00       BRK  
  0x045942 $9932: C-----  00       BRK  
  0x045943 $9933: C-----  00       BRK  
  0x045944 $9934: C-----  00       BRK  
  0x045945 $9935: C-----  55 DD    EOR  $DD,X
  0x045947 $9937: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045948 $9938: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045949 $9939: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04594A $993A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04594B $993B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04594C $993C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04594D $993D: C-----  AA       TAX  
  0x04594E $993E: C-----  6A       ROR  A
  0x04594F $993F: C-----  19 66 99 ORA  $9966,Y
  0x045952 $9942: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x045953 $9943: C-----  00       BRK  
  0x045954 $9944: C-----  00       BRK  
  0x045955 $9945: C-----  00       BRK  
  0x045956 $9946: C-----  00       BRK  
  0x045957 $9947: C-----  00       BRK  
  0x045958 $9948: C-----  00       BRK  
  0x045959 $9949: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04595A $994A: C-----  DD FF FF CMP  $FFFF,X
  0x04595D $994D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04595E $994E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04595F $994F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045960 $9950: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x045961 $9951: C-----  84 04    STY  $04
  0x045963 $9953: C-----  08       PHP  
  0x045964 $9954: C-----  08       PHP  
  0x045965 $9955: C-----  08       PHP  
  0x045966 $9956: C-----  10 10    BPL  $9968
  0x045968 $9958: C-----  18       CLC  
  0x045969 $9959: C-----  78       SEI  
  0x04596A $995A: C-----  F8       SED  
  0x04596B $995B: C-----  F0 F0    BEQ  $994D
  0x04596D $995D: C-----  F0 E0    BEQ  $993F
  0x04596F $995F: C-----  E0 00    CPX  #$00
  0x045971 $9961: C-----  00       BRK  
  0x045972 $9962: C-----  00       BRK  
  0x045973 $9963: C-----  00       BRK  
  0x045974 $9964: C-----  00       BRK  
  0x045975 $9965: C-----  00       BRK  
  0x045976 $9966: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045977 $9967: C-----  70 FF    BVS  $9968
  0x045979 $9969: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04597A $996A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04597B $996B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04597C $996C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04597D $996D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04597E $996E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04597F $996F: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x045980 $9970: C-----  28       PLP  
  0x045981 $9971: C-----  68       PLA  
  0x045982 $9972: C-----  90 30    BCC  $99A4
  0x045984 $9974: C-----  60       RTS  
  0x045985 $9975: C-----  B0 20    BCS  $9997
  0x045987 $9977: C-----  C0 C0    CPY  #$C0
  0x045989 $9979: C-----  90 60    BCC  $99DB
  0x04598B $997B: C-----  C0 80    CPY  #$80
  0x04598D $997D: C-----  40       RTI  
  0x04598E $997E: C-----  C0 00    CPY  #$00
  0x045990 $9980: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045991 $9981: C-----  05 09    ORA  $09
  0x045993 $9983: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045994 $9984: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045995 $9985: C-----  05 87    ORA  $87
  0x045997 $9987: C-----  71 F8    ADC  ($F8),Y
  0x045999 $9989: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04599A $998A: C-----  F6 FC    INC  $FC,X
  0x04599C $998C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04599D $998D: C-----  F8       SED  
  0x04599E $998E: C-----  78       SEI  
  0x04599F $998F: C-----  8E BF FE STX  $FEBF
  0x0459A2 $9992: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0459A3 $9993: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0459A4 $9994: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0459A5 $9995: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0459A6 $9996: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0459A7 $9997: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0459A8 $9998: C-----  4C 59 7D JMP  $7D59
  0x0459AB $999B: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x0459AC $999C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0459AD $999D: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x0459AE $999E: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0459AF $999F: C-----  00       BRK  
  0x0459B0 $99A0: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x0459B1 $99A1: C-----  76 F8    ROR  $F8,X
  0x0459B3 $99A3: C-----  EC F0 80 CPX  $80F0
  0x0459B6 $99A6: C-----  00       BRK  
  0x0459B7 $99A7: C-----  00       BRK  
  0x0459B8 $99A8: C-----  AC A8 60 LDY  $60A8
  0x0459BB $99AB: C-----  50 80    BVC  $992D
  0x0459BD $99AD: C-----  00       BRK  
  0x0459BE $99AE: C-----  00       BRK  
  0x0459BF $99AF: C-----  00       BRK  
  0x0459C0 $99B0: C-----  00       BRK  
  0x0459C1 $99B1: C-----  00       BRK  
  0x0459C2 $99B2: C-----  00       BRK  
  0x0459C3 $99B3: C-----  00       BRK  
  0x0459C4 $99B4: C-----  00       BRK  
  0x0459C5 $99B5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0459C6 $99B6: C-----  38       SEC  
  0x0459C7 $99B7: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x0459C8 $99B8: C-----  00       BRK  
  0x0459C9 $99B9: C-----  00       BRK  
  0x0459CA $99BA: C-----  00       BRK  
  0x0459CB $99BB: C-----  00       BRK  
  0x0459CC $99BC: C-----  00       BRK  
  0x0459CD $99BD: C-----  00       BRK  
  0x0459CE $99BE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0459CF $99BF: C-----  2C 71 76 BIT  $7671
  0x0459D2 $99C2: C-----  F8       SED  
  0x0459D3 $99C3: C-----  EC F0 80 CPX  $80F0
  0x0459D6 $99C6: C-----  00       BRK  
  0x0459D7 $99C7: C-----  00       BRK  
  0x0459D8 $99C8: C-----  AE A8 60 LDX  $60A8
  0x0459DB $99CB: C-----  50 80    BVC  $994D
  0x0459DD $99CD: C-----  00       BRK  
  0x0459DE $99CE: C-----  00       BRK  
  0x0459DF $99CF: C-----  00       BRK  
  0x0459E0 $99D0: C-----  00       BRK  
  0x0459E1 $99D1: C-----  00       BRK  
  0x0459E2 $99D2: C-----  00       BRK  
  0x0459E3 $99D3: C-----  00       BRK  
  0x0459E4 $99D4: C-----  00       BRK  
  0x0459E5 $99D5: C-----  01 06    ORA  ($06,X)
  0x0459E7 $99D7: C-----  08       PHP  
  0x0459E8 $99D8: C-----  00       BRK  
  0x0459E9 $99D9: C-----  00       BRK  
  0x0459EA $99DA: C-----  00       BRK  
  0x0459EB $99DB: C-----  00       BRK  
  0x0459EC $99DC: C-----  00       BRK  
  0x0459ED $99DD: C-----  00       BRK  
  0x0459EE $99DE: C-----  01 07    ORA  ($07,X)
  0x0459F0 $99E0: C-----  00       BRK  
  0x0459F1 $99E1: C-----  00       BRK  
  0x0459F2 $99E2: C-----  00       BRK  
  0x0459F3 $99E3: C-----  00       BRK  
  0x0459F4 $99E4: C-----  00       BRK  
  0x0459F5 $99E5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0459F6 $99E6: C-----  60       RTS  
  0x0459F7 $99E7: C-----  18       CLC  
  0x0459F8 $99E8: C-----  00       BRK  
  0x0459F9 $99E9: C-----  00       BRK  
  0x0459FA $99EA: C-----  00       BRK  
  0x0459FB $99EB: C-----  00       BRK  
  0x0459FC $99EC: C-----  00       BRK  
  0x0459FD $99ED: C-----  00       BRK  
  0x0459FE $99EE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0459FF $99EF: C-----  E0 30    CPX  #$30
  0x045A01 $99F1: C-----  40       RTI  
  0x045A02 $99F2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045A03 $99F3: C-----  00       BRK  
  0x045A04 $99F4: C-----  00       BRK  
  0x045A05 $99F5: C-----  00       BRK  
  0x045A06 $99F6: C-----  00       BRK  
  0x045A07 $99F7: C-----  00       BRK  
  0x045A08 $99F8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045A09 $99F9: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045A0A $99FA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045A0B $99FB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045A0C $99FC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045A0D $99FD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045A0E $99FE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045A0F $99FF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045A10 $9A00: C-----  00       BRK  
  0x045A11 $9A01: C-----  00       BRK  
  0x045A12 $9A02: C-----  00       BRK  
  0x045A13 $9A03: C-----  00       BRK  
  0x045A14 $9A04: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x045A15 $9A05: C-----  38       SEC  
  0x045A16 $9A06: C-----  51 40    EOR  ($40),Y
  0x045A18 $9A08: C-----  00       BRK  
  0x045A19 $9A09: C-----  00       BRK  
  0x045A1A $9A0A: C-----  00       BRK  
  0x045A1B $9A0B: C-----  00       BRK  
  0x045A1C $9A0C: C-----  00       BRK  
  0x045A1D $9A0D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045A1E $9A0E: C-----  2E 3F 00 ROL  $003F
  0x045A21 $9A11: C-----  00       BRK  
  0x045A22 $9A12: C-----  00       BRK  
  0x045A23 $9A13: C-----  00       BRK  
  0x045A24 $9A14: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045A25 $9A15: C-----  00       BRK  
  0x045A26 $9A16: C-----  F0 0E    BEQ  $9A26
  0x045A28 $9A18: C-----  00       BRK  
  0x045A29 $9A19: C-----  00       BRK  
  0x045A2A $9A1A: C-----  00       BRK  
  0x045A2B $9A1B: C-----  00       BRK  
  0x045A2C $9A1C: C-----  00       BRK  
  0x045A2D $9A1D: C-----  00       BRK  
  0x045A2E $9A1E: C-----  00       BRK  
  0x045A2F $9A1F: C-----  F0 80    BEQ  $99A1
  0x045A31 $9A21: C-----  00       BRK  
  0x045A32 $9A22: C-----  00       BRK  
  0x045A33 $9A23: C-----  00       BRK  
  0x045A34 $9A24: C-----  08       PHP  
  0x045A35 $9A25: C-----  5D FD FE EOR  $FEFD,X
  0x045A38 $9A28: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045A39 $9A29: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045A3A $9A2A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045A3B $9A2B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045A3C $9A2C: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x045A3D $9A2D: C-----  AA       TAX  
  0x045A3E $9A2E: C-----  4A       LSR  A
  0x045A3F $9A2F: C-----  1D 00 07 ORA  $0700,X
  0x045A42 $9A32: C-----  00       BRK  
  0x045A43 $9A33: C-----  00       BRK  
  0x045A44 $9A34: C-----  00       BRK  
  0x045A45 $9A35: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045A46 $9A36: C-----  00       BRK  
  0x045A47 $9A37: C-----  B1 FC    LDA  ($FC),Y
  0x045A49 $9A39: C-----  F8       SED  
  0x045A4A $9A3A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045A4B $9A3B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045A4C $9A3C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045A4D $9A3D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045A4E $9A3E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045A4F $9A3F: C-----  4E 01 01 LSR  $0101
  0x045A52 $9A42: C-----  01 03    ORA  ($03,X)
  0x045A54 $9A44: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045A55 $9A45: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045A56 $9A46: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045A57 $9A47: C-----  01 00    ORA  ($00,X)
  0x045A59 $9A49: C-----  00       BRK  
  0x045A5A $9A4A: C-----  00       BRK  
  0x045A5B $9A4B: C-----  00       BRK  
  0x045A5C $9A4C: C-----  01 01    ORA  ($01,X)
  0x045A5E $9A4E: C-----  00       BRK  
  0x045A5F $9A4F: C-----  00       BRK  
  0x045A60 $9A50: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x045A61 $9A51: C-----  60       RTS  
  0x045A62 $9A52: C-----  49 10    EOR  #$10
  0x045A64 $9A54: C-----  00       BRK  
  0x045A65 $9A55: C-----  55 FD    EOR  $FD,X
  0x045A67 $9A57: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045A68 $9A58: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x045A69 $9A59: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x045A6A $9A5A: C-----  B6 EF    LDX  $EF,Y
  0x045A6C $9A5C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045A6D $9A5D: C-----  AA       TAX  
  0x045A6E $9A5E: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x045A6F $9A5F: C-----  15 00    ORA  $00,X
  0x045A71 $9A61: C-----  00       BRK  
  0x045A72 $9A62: C-----  C0 20    CPY  #$20
  0x045A74 $9A64: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045A75 $9A65: C-----  00       BRK  
  0x045A76 $9A66: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045A77 $9A67: C-----  00       BRK  
  0x045A78 $9A68: C-----  00       BRK  
  0x045A79 $9A69: C-----  00       BRK  
  0x045A7A $9A6A: C-----  00       BRK  
  0x045A7B $9A6B: C-----  C0 00    CPY  #$00
  0x045A7D $9A6D: C-----  00       BRK  
  0x045A7E $9A6E: C-----  00       BRK  
  0x045A7F $9A6F: C-----  00       BRK  
  0x045A80 $9A70: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x045A81 $9A71: C-----  BC FE FF LDY  $FFFE,X
  0x045A84 $9A74: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045A85 $9A75: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045A86 $9A76: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045A87 $9A77: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x045A88 $9A78: C-----  6C 5B 5D JMP  ($5D5B)
  0x045A8B $9A7B: C-----  6D 7F 23 ADC  $237F
  0x045A8E $9A7E: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x045A8F $9A7F: C-----  00       BRK  
  0x045A90 $9A80: C-----  00       BRK  
  0x045A91 $9A81: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045A92 $9A82: C-----  00       BRK  
  0x045A93 $9A83: C-----  00       BRK  
  0x045A94 $9A84: C-----  00       BRK  
  0x045A95 $9A85: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045A96 $9A86: C-----  00       BRK  
  0x045A97 $9A87: C-----  81 FC    STA  ($FC,X)
  0x045A99 $9A89: C-----  F8       SED  
  0x045A9A $9A8A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045A9B $9A8B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045A9C $9A8C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045A9D $9A8D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045A9E $9A8E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045A9F $9A8F: C-----  7E 80 00 ROR  $0080,X
  0x045AA2 $9A92: C-----  00       BRK  
  0x045AA3 $9A93: C-----  00       BRK  
  0x045AA4 $9A94: C-----  00       BRK  
  0x045AA5 $9A95: C-----  45 ED    EOR  $ED
  0x045AA7 $9A97: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045AA8 $9A98: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045AA9 $9A99: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045AAA $9A9A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045AAB $9A9B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045AAC $9A9C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045AAD $9A9D: C-----  BA       TSX  
  0x045AAE $9A9E: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x045AAF $9A9F: C-----  15 43    ORA  $43,X
  0x045AB1 $9AA1: C-----  46 C8    LSR  $C8
  0x045AB3 $9AA3: C-----  EC F0 80 CPX  $80F0
  0x045AB6 $9AA6: C-----  00       BRK  
  0x045AB7 $9AA7: C-----  00       BRK  
  0x045AB8 $9AA8: C-----  BC B8 B0 LDY  $B0B8,X
  0x045ABB $9AAB: C-----  90 80    BCC  $9A2D
  0x045ABD $9AAD: C-----  00       BRK  
  0x045ABE $9AAE: C-----  00       BRK  
  0x045ABF $9AAF: C-----  00       BRK  
  0x045AC0 $9AB0: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x045AC1 $9AB1: C-----  BC FE FF LDY  $FFFE,X
  0x045AC4 $9AB4: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x045AC5 $9AB5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045AC6 $9AB6: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045AC7 $9AB7: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x045AC8 $9AB8: C-----  6C 5B 4D JMP  ($4D5B)
  0x045ACB $9ABB: C-----  7D 5B 67 ADC  $675B,X
  0x045ACE $9ABE: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x045ACF $9ABF: C-----  00       BRK  
  0x045AD0 $9AC0: C-----  C1 00    CMP  ($00,X)
  0x045AD2 $9AC2: C-----  00       BRK  
  0x045AD3 $9AC3: C-----  00       BRK  
  0x045AD4 $9AC4: C-----  00       BRK  
  0x045AD5 $9AC5: C-----  41 E7    EOR  ($E7,X)
  0x045AD7 $9AC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045AD8 $9AC8: C-----  3E FF FF ROL  $FFFF,X
  0x045ADB $9ACB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045ADC $9ACC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045ADD $9ACD: C-----  BE 59 17 LDX  $1759,Y
  0x045AE0 $9AD0: C-----  E0 38    CPX  #$38
  0x045AE2 $9AD2: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x045AE3 $9AD3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x045AE4 $9AD4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045AE5 $9AD5: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x045AE6 $9AD6: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x045AE7 $9AD7: C-----  F6 00    INC  $00,X
  0x045AE9 $9AD9: C-----  C0 F0    CPY  #$F0
  0x045AEB $9ADB: C-----  F8       SED  
  0x045AEC $9ADC: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045AED $9ADD: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x045AEE $9ADE: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x045AEF $9ADF: C-----  88       DEY  
  0x045AF0 $9AE0: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x045AF1 $9AE1: C-----  AE FA FF LDX  $FFFA
  0x045AF4 $9AE4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045AF5 $9AE5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045AF6 $9AE6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045AF7 $9AE7: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x045AF8 $9AE8: C-----  4C 59 6D JMP  $6D59
  0x045AFB $9AEB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045AFC $9AEC: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x045AFD $9AED: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045AFE $9AEE: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x045AFF $9AEF: C-----  00       BRK  
  0x045B00 $9AF0: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x045B01 $9AF1: C-----  F8       SED  
  0x045B02 $9AF2: C-----  F0 F0    BEQ  $9AE4
  0x045B04 $9AF4: C-----  E0 80    CPX  #$80
  0x045B06 $9AF6: C-----  00       BRK  
  0x045B07 $9AF7: C-----  00       BRK  
  0x045B08 $9AF8: C-----  A8       TAY  
  0x045B09 $9AF9: C-----  A0 60    LDY  #$60
  0x045B0B $9AFB: C-----  40       RTI  
  0x045B0C $9AFC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045B0D $9AFD: C-----  00       BRK  
  0x045B0E $9AFE: C-----  00       BRK  
  0x045B0F $9AFF: C-----  00       BRK  
  0x045B10 $9B00: C-----  84 04    STY  $04
  0x045B12 $9B02: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x045B13 $9B03: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x045B14 $9B04: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045B15 $9B05: C-----  29 85    AND  #$85
  0x045B17 $9B07: C-----  71 78    ADC  ($78),Y
  0x045B19 $9B09: C-----  F8       SED  
  0x045B1A $9B0A: C-----  CC EC FC CPY  $FCEC
  0x045B1D $9B0D: C-----  D6 7A    DEC  $7A,X
  0x045B1F $9B0F: C-----  8E 00 00 STX  $0000
  0x045B22 $9B12: C-----  00       BRK  
  0x045B23 $9B13: C-----  00       BRK  
  0x045B24 $9B14: C-----  00       BRK  
  0x045B25 $9B15: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045B26 $9B16: C-----  30 40    BMI  $9B58
  0x045B28 $9B18: C-----  00       BRK  
  0x045B29 $9B19: C-----  00       BRK  
  0x045B2A $9B1A: C-----  00       BRK  
  0x045B2B $9B1B: C-----  00       BRK  
  0x045B2C $9B1C: C-----  00       BRK  
  0x045B2D $9B1D: C-----  00       BRK  
  0x045B2E $9B1E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045B2F $9B1F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045B30 $9B20: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x045B31 $9B21: C-----  !!UNDEF $72  ; unknown opcode, treating as data
  0x045B32 $9B22: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x045B33 $9B23: C-----  EC F0 80 CPX  $80F0
  0x045B36 $9B26: C-----  00       BRK  
  0x045B37 $9B27: C-----  00       BRK  
  0x045B38 $9B28: C-----  AC AC 68 LDY  $68AC
  0x045B3B $9B2B: C-----  50 80    BVC  $9AAD
  0x045B3D $9B2D: C-----  00       BRK  
  0x045B3E $9B2E: C-----  00       BRK  
  0x045B3F $9B2F: C-----  00       BRK  
  0x045B40 $9B30: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045B41 $9B31: C-----  00       BRK  
  0x045B42 $9B32: C-----  00       BRK  
  0x045B43 $9B33: C-----  00       BRK  
  0x045B44 $9B34: C-----  00       BRK  
  0x045B45 $9B35: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x045B46 $9B36: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045B47 $9B37: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045B48 $9B38: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045B49 $9B39: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045B4A $9B3A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045B4B $9B3B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045B4C $9B3C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045B4D $9B3D: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x045B4E $9B3E: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x045B4F $9B3F: C-----  1D 00 00 ORA  $0000,X
  0x045B52 $9B42: C-----  00       BRK  
  0x045B53 $9B43: C-----  00       BRK  
  0x045B54 $9B44: C-----  00       BRK  
  0x045B55 $9B45: C-----  C0 30    CPY  #$30
  0x045B57 $9B47: C-----  08       PHP  
  0x045B58 $9B48: C-----  00       BRK  
  0x045B59 $9B49: C-----  00       BRK  
  0x045B5A $9B4A: C-----  00       BRK  
  0x045B5B $9B4B: C-----  00       BRK  
  0x045B5C $9B4C: C-----  00       BRK  
  0x045B5D $9B4D: C-----  00       BRK  
  0x045B5E $9B4E: C-----  C0 F0    CPY  #$F0
  0x045B60 $9B50: C-----  01 06    ORA  ($06,X)
  0x045B62 $9B52: C-----  38       SEC  
  0x045B63 $9B53: C-----  C0 00    CPY  #$00
  0x045B65 $9B55: C-----  00       BRK  
  0x045B66 $9B56: C-----  00       BRK  
  0x045B67 $9B57: C-----  00       BRK  
  0x045B68 $9B58: C-----  FE F8 C0 INC  $C0F8,X
  0x045B6B $9B5B: C-----  00       BRK  
  0x045B6C $9B5C: C-----  00       BRK  
  0x045B6D $9B5D: C-----  00       BRK  
  0x045B6E $9B5E: C-----  00       BRK  
  0x045B6F $9B5F: C-----  00       BRK  
  0x045B70 $9B60: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x045B71 $9B61: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x045B72 $9B62: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045B73 $9B63: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045B74 $9B64: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045B75 $9B65: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x045B76 $9B66: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x045B77 $9B67: C-----  C4 F8    CPY  $F8
  0x045B79 $9B69: C-----  F8       SED  
  0x045B7A $9B6A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045B7B $9B6B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045B7C $9B6C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045B7D $9B6D: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x045B7E $9B6E: C-----  BC B8 03 LDY  $03B8,X
  0x045B81 $9B71: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x045B82 $9B72: C-----  11 3F    ORA  ($3F),Y
  0x045B84 $9B74: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x045B85 $9B75: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x045B86 $9B76: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x045B87 $9B77: C-----  A4 00    LDY  $00
  0x045B89 $9B79: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045B8A $9B7A: C-----  0E 00 0C ASL  $0C00
  0x045B8D $9B7D: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x045B8E $9B7E: C-----  1D 5B 00 ORA  $005B,X
  0x045B91 $9B81: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045B92 $9B82: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x045B93 $9B83: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x045B94 $9B84: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045B95 $9B85: C-----  01 01    ORA  ($01,X)
  0x045B97 $9B87: C-----  01 00    ORA  ($00,X)
  0x045B99 $9B89: C-----  00       BRK  
  0x045B9A $9B8A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045B9B $9B8B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045B9C $9B8C: C-----  01 00    ORA  ($00,X)
  0x045B9E $9B8E: C-----  00       BRK  
  0x045B9F $9B8F: C-----  00       BRK  
  0x045BA0 $9B90: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x045BA1 $9B91: C-----  BE DE FD LDX  $FDDE,Y
  0x045BA4 $9B94: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045BA5 $9B95: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045BA6 $9B96: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045BA7 $9B97: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x045BA8 $9B98: C-----  4C 59 7D JMP  $7D59
  0x045BAB $9B9B: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x045BAC $9B9C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045BAD $9B9D: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x045BAE $9B9E: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x045BAF $9B9F: C-----  00       BRK  
  0x045BB0 $9BA0: C-----  00       BRK  
  0x045BB1 $9BA1: C-----  00       BRK  
  0x045BB2 $9BA2: C-----  00       BRK  
  0x045BB3 $9BA3: C-----  00       BRK  
  0x045BB4 $9BA4: C-----  00       BRK  
  0x045BB5 $9BA5: C-----  00       BRK  
  0x045BB6 $9BA6: C-----  00       BRK  
  0x045BB7 $9BA7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045BB8 $9BA8: C-----  00       BRK  
  0x045BB9 $9BA9: C-----  00       BRK  
  0x045BBA $9BAA: C-----  00       BRK  
  0x045BBB $9BAB: C-----  00       BRK  
  0x045BBC $9BAC: C-----  00       BRK  
  0x045BBD $9BAD: C-----  00       BRK  
  0x045BBE $9BAE: C-----  00       BRK  
  0x045BBF $9BAF: C-----  00       BRK  
  0x045BC0 $9BB0: C-----  00       BRK  
  0x045BC1 $9BB1: C-----  01 01    ORA  ($01,X)
  0x045BC3 $9BB3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045BC4 $9BB4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045BC5 $9BB5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045BC6 $9BB6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045BC7 $9BB7: C-----  01 00    ORA  ($00,X)
  0x045BC9 $9BB9: C-----  00       BRK  
  0x045BCA $9BBA: C-----  00       BRK  
  0x045BCB $9BBB: C-----  01 01    ORA  ($01,X)
  0x045BCD $9BBD: C-----  01 00    ORA  ($00,X)
  0x045BCF $9BBF: C-----  00       BRK  
  0x045BD0 $9BC0: C-----  E4 F8    CPX  $F8
  0x045BD2 $9BC2: C-----  F0 F0    BEQ  $9BB4
  0x045BD4 $9BC4: C-----  E0 80    CPX  #$80
  0x045BD6 $9BC6: C-----  00       BRK  
  0x045BD7 $9BC7: C-----  00       BRK  
  0x045BD8 $9BC8: C-----  98       TYA  
  0x045BD9 $9BC9: C-----  A0 60    LDY  #$60
  0x045BDB $9BCB: C-----  40       RTI  
  0x045BDC $9BCC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045BDD $9BCD: C-----  00       BRK  
  0x045BDE $9BCE: C-----  00       BRK  
  0x045BDF $9BCF: C-----  00       BRK  
  0x045BE0 $9BD0: C-----  BC BE BE LDY  $BEBE,X
  0x045BE3 $9BD3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045BE4 $9BD4: C-----  5E 44 22 LSR  $2244,X
  0x045BE7 $9BD7: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x045BE8 $9BD8: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x045BE9 $9BD9: C-----  41 41    EOR  ($41,X)
  0x045BEB $9BDB: C-----  00       BRK  
  0x045BEC $9BDC: C-----  21 3B    AND  ($3B,X)
  0x045BEE $9BDE: C-----  1D 0C C0 ORA  $C00C,X
  0x045BF1 $9BE1: C-----  20 18 07 JSR  $0718
  0x045BF4 $9BE4: C-----  01 82    ORA  ($82,X)
  0x045BF6 $9BE6: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x045BF7 $9BE7: C-----  C6 00    DEC  $00
  0x045BF9 $9BE9: C-----  C0 E0    CPY  #$E0
  0x045BFB $9BEB: C-----  F8       SED  
  0x045BFC $9BEC: C-----  FE 7C 7C INC  $7C7C,X
  0x045BFF $9BEF: C-----  B8       CLV  
  0x045C00 $9BF0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045C01 $9BF1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045C02 $9BF2: C-----  00       BRK  
  0x045C03 $9BF3: C-----  00       BRK  
  0x045C04 $9BF4: C-----  00       BRK  
  0x045C05 $9BF5: C-----  00       BRK  
  0x045C06 $9BF6: C-----  00       BRK  
  0x045C07 $9BF7: C-----  00       BRK  
  0x045C08 $9BF8: C-----  00       BRK  
  0x045C09 $9BF9: C-----  00       BRK  
  0x045C0A $9BFA: C-----  00       BRK  
  0x045C0B $9BFB: C-----  00       BRK  
  0x045C0C $9BFC: C-----  00       BRK  
  0x045C0D $9BFD: C-----  00       BRK  
  0x045C0E $9BFE: C-----  00       BRK  
  0x045C0F $9BFF: C-----  00       BRK  
  0x045C10 $9C00: C-----  FE FF FF INC  $FFFF,X
  0x045C13 $9C03: C-----  FE F8 70 INC  $70F8,X
  0x045C16 $9C06: C-----  60       RTS  
  0x045C17 $9C07: C-----  40       RTI  
  0x045C18 $9C08: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045C19 $9C09: C-----  FE FC 79 INC  $79FC,X
  0x045C1C $9C0C: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x045C1D $9C0D: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x045C1E $9C0E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045C1F $9C0F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045C20 $9C10: C-----  00       BRK  
  0x045C21 $9C11: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045C22 $9C12: C-----  C0 A0    CPY  #$A0
  0x045C24 $9C14: C-----  50 28    BVC  $9C3E
  0x045C26 $9C16: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x045C27 $9C17: C-----  0A       ASL  A
  0x045C28 $9C18: C-----  00       BRK  
  0x045C29 $9C19: C-----  00       BRK  
  0x045C2A $9C1A: C-----  00       BRK  
  0x045C2B $9C1B: C-----  40       RTI  
  0x045C2C $9C1C: C-----  A0 D0    LDY  #$D0
  0x045C2E $9C1E: C-----  E8       INX  
  0x045C2F $9C1F: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x045C30 $9C20: C-----  68       PLA  
  0x045C31 $9C21: C-----  50 30    BVC  $9C53
  0x045C33 $9C23: C-----  30 20    BMI  $9C45
  0x045C35 $9C25: C-----  20 20 21 JSR  $2120
  0x045C38 $9C28: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x045C39 $9C29: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x045C3A $9C2A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045C3B $9C2B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045C3C $9C2C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045C3D $9C2D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045C3E $9C2E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045C3F $9C2F: C-----  1E 00 00 ASL  $0000,X
  0x045C42 $9C32: C-----  01 03    ORA  ($03,X)
  0x045C44 $9C34: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045C45 $9C35: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045C46 $9C36: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045C47 $9C37: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045C48 $9C38: C-----  00       BRK  
  0x045C49 $9C39: C-----  00       BRK  
  0x045C4A $9C3A: C-----  00       BRK  
  0x045C4B $9C3B: C-----  01 03    ORA  ($03,X)
  0x045C4D $9C3D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045C4E $9C3E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045C4F $9C3F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045C50 $9C40: C-----  00       BRK  
  0x045C51 $9C41: C-----  00       BRK  
  0x045C52 $9C42: C-----  00       BRK  
  0x045C53 $9C43: C-----  00       BRK  
  0x045C54 $9C44: C-----  00       BRK  
  0x045C55 $9C45: C-----  00       BRK  
  0x045C56 $9C46: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045C57 $9C47: C-----  1E 00 00 ASL  $0000,X
  0x045C5A $9C4A: C-----  00       BRK  
  0x045C5B $9C4B: C-----  00       BRK  
  0x045C5C $9C4C: C-----  00       BRK  
  0x045C5D $9C4D: C-----  00       BRK  
  0x045C5E $9C4E: C-----  00       BRK  
  0x045C5F $9C4F: C-----  01 20    ORA  ($20,X)
  0x045C61 $9C51: C-----  20 20 20 JSR  $2020
  0x045C64 $9C54: C-----  20 F0 F0 JSR  $F0F0
  0x045C67 $9C57: C-----  E8       INX  
  0x045C68 $9C58: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045C69 $9C59: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045C6A $9C5A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045C6B $9C5B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045C6C $9C5C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045C6D $9C5D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045C6E $9C5E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045C6F $9C5F: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x045C70 $9C60: C-----  38       SEC  
  0x045C71 $9C61: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045C72 $9C62: C-----  FE FF FF INC  $FFFF,X
  0x045C75 $9C65: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045C76 $9C66: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045C77 $9C67: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045C78 $9C68: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045C79 $9C69: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x045C7A $9C6A: C-----  FD FE FE SBC  $FEFE,X
  0x045C7D $9C6D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045C7E $9C6E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045C7F $9C6F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045C80 $9C70: C-----  68       PLA  
  0x045C81 $9C71: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x045C82 $9C72: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x045C83 $9C73: C-----  09 08    ORA  #$08
  0x045C85 $9C75: C-----  84 83    STY  $83
  0x045C87 $9C77: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045C88 $9C78: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x045C89 $9C79: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x045C8A $9C7A: C-----  0D 06 07 ORA  $0706
  0x045C8D $9C7D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045C8E $9C7E: C-----  00       BRK  
  0x045C8F $9C7F: C-----  00       BRK  
  0x045C90 $9C80: C-----  01 07    ORA  ($07,X)
  0x045C92 $9C82: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045C93 $9C83: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045C94 $9C84: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x045C95 $9C85: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x045C96 $9C86: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x045C97 $9C87: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x045C98 $9C88: C-----  00       BRK  
  0x045C99 $9C89: C-----  01 07    ORA  ($07,X)
  0x045C9B $9C8B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045C9C $9C8C: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x045C9D $9C8D: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x045C9E $9C8E: C-----  ED F5 FF SBC  $FFF5
  0x045CA1 $9C91: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045CA2 $9C92: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045CA3 $9C93: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045CA4 $9C94: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045CA5 $9C95: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045CA6 $9C96: C-----  FE F0 FF INC  $FFF0,X
  0x045CA9 $9C99: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045CAA $9C9A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045CAB $9C9B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045CAC $9C9C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045CAD $9C9D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045CAE $9C9E: C-----  E0 00    CPX  #$00
  0x045CB0 $9CA0: C-----  05 06    ORA  $06
  0x045CB2 $9CA2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x045CB3 $9CA3: C-----  08       PHP  
  0x045CB4 $9CA4: C-----  08       PHP  
  0x045CB5 $9CA5: C-----  10 20    BPL  $9CC7
  0x045CB7 $9CA7: C-----  C0 FA    CPY  #$FA
  0x045CB9 $9CA9: C-----  F8       SED  
  0x045CBA $9CAA: C-----  F8       SED  
  0x045CBB $9CAB: C-----  F0 F0    BEQ  $9C9D
  0x045CBD $9CAD: C-----  E0 C0    CPX  #$C0
  0x045CBF $9CAF: C-----  00       BRK  
  0x045CC0 $9CB0: C-----  FE FF FF INC  $FFFF,X
  0x045CC3 $9CB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045CC4 $9CB4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045CC5 $9CB5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045CC6 $9CB6: C-----  7E 3C FC ROR  $FC3C,X
  0x045CC9 $9CB9: C-----  FE FF 7F INC  $7FFF,X
  0x045CCC $9CBC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045CCD $9CBD: C-----  3E 3D 1B ROL  $1B3D,X
  0x045CD0 $9CC0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045CD1 $9CC1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045CD2 $9CC2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045CD3 $9CC3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045CD4 $9CC4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045CD5 $9CC5: C-----  E0 00    CPX  #$00
  0x045CD7 $9CC7: C-----  00       BRK  
  0x045CD8 $9CC8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045CD9 $9CC9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045CDA $9CCA: C-----  FE F8 C0 INC  $C0F8,X
  0x045CDD $9CCD: C-----  00       BRK  
  0x045CDE $9CCE: C-----  00       BRK  
  0x045CDF $9CCF: C-----  00       BRK  
  0x045CE0 $9CD0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045CE1 $9CD1: C-----  8E 38 FC STX  $FC38
  0x045CE4 $9CD4: C-----  08       PHP  
  0x045CE5 $9CD5: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x045CE6 $9CD6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045CE7 $9CD7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045CE8 $9CD8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045CE9 $9CD9: C-----  71 C7    ADC  ($C7),Y
  0x045CEB $9CDB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045CEC $9CDC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045CED $9CDD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045CEE $9CDE: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x045CEF $9CDF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045CF0 $9CE0: C-----  00       BRK  
  0x045CF1 $9CE1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045CF2 $9CE2: C-----  C0 E0    CPY  #$E0
  0x045CF4 $9CE4: C-----  F0 90    BEQ  $9C76
  0x045CF6 $9CE6: C-----  18       CLC  
  0x045CF7 $9CE7: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x045CF8 $9CE8: C-----  00       BRK  
  0x045CF9 $9CE9: C-----  00       BRK  
  0x045CFA $9CEA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045CFB $9CEB: C-----  C0 80    CPY  #$80
  0x045CFD $9CED: C-----  60       RTS  
  0x045CFE $9CEE: C-----  E0 98    CPX  #$98
  0x045D00 $9CF0: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045D01 $9CF1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045D02 $9CF2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045D03 $9CF3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045D04 $9CF4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045D05 $9CF5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045D06 $9CF6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045D07 $9CF7: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045D08 $9CF8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045D09 $9CF9: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045D0A $9CFA: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045D0B $9CFB: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045D0C $9CFC: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045D0D $9CFD: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045D0E $9CFE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045D0F $9CFF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045D10 $9D00: C-----  00       BRK  
  0x045D11 $9D01: C-----  00       BRK  
  0x045D12 $9D02: C-----  00       BRK  
  0x045D13 $9D03: C-----  00       BRK  
  0x045D14 $9D04: C-----  00       BRK  
  0x045D15 $9D05: C-----  00       BRK  
  0x045D16 $9D06: C-----  00       BRK  
  0x045D17 $9D07: C-----  00       BRK  
  0x045D18 $9D08: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D19 $9D09: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D1A $9D0A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D1B $9D0B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D1C $9D0C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D1D $9D0D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D1E $9D0E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D1F $9D0F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D20 $9D10: C-----  05 02    ORA  $02
  0x045D22 $9D12: C-----  01 00    ORA  ($00,X)
  0x045D24 $9D14: C-----  00       BRK  
  0x045D25 $9D15: C-----  00       BRK  
  0x045D26 $9D16: C-----  00       BRK  
  0x045D27 $9D17: C-----  08       PHP  
  0x045D28 $9D18: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x045D29 $9D19: C-----  FD FE FF SBC  $FFFE,X
  0x045D2C $9D1C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D2D $9D1D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D2E $9D1E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D2F $9D1F: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x045D30 $9D20: C-----  00       BRK  
  0x045D31 $9D21: C-----  00       BRK  
  0x045D32 $9D22: C-----  00       BRK  
  0x045D33 $9D23: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045D34 $9D24: C-----  70 00    BVS  $9D26
  0x045D36 $9D26: C-----  00       BRK  
  0x045D37 $9D27: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x045D38 $9D28: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D39 $9D29: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D3A $9D2A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D3B $9D2B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045D3C $9D2C: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x045D3D $9D2D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D3E $9D2E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D3F $9D2F: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x045D40 $9D30: C-----  0E 1F 3F ASL  $3F1F
  0x045D43 $9D33: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045D44 $9D34: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045D45 $9D35: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D46 $9D36: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D47 $9D37: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D48 $9D38: C-----  F1 EC    SBC  ($EC),Y
  0x045D4A $9D3A: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x045D4B $9D3B: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x045D4C $9D3C: C-----  AD 5B 26 LDA  $265B
  0x045D4F $9D3F: C-----  0D C0 30 ORA  $30C0
  0x045D52 $9D42: C-----  CE 37 0F DEC  $0F37
  0x045D55 $9D45: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045D56 $9D46: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045D57 $9D47: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045D58 $9D48: C-----  00       BRK  
  0x045D59 $9D49: C-----  C0 30    CPY  #$30
  0x045D5B $9D4B: C-----  C8       INY  
  0x045D5C $9D4C: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x045D5D $9D4D: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x045D5E $9D4E: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x045D5F $9D4F: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x045D60 $9D50: C-----  00       BRK  
  0x045D61 $9D51: C-----  00       BRK  
  0x045D62 $9D52: C-----  00       BRK  
  0x045D63 $9D53: C-----  00       BRK  
  0x045D64 $9D54: C-----  E0 F8    CPX  #$F8
  0x045D66 $9D56: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045D67 $9D57: C-----  FE 00 00 INC  $0000,X
  0x045D6A $9D5A: C-----  00       BRK  
  0x045D6B $9D5B: C-----  00       BRK  
  0x045D6C $9D5C: C-----  00       BRK  
  0x045D6D $9D5D: C-----  E0 F8    CPX  #$F8
  0x045D6F $9D5F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045D70 $9D60: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D71 $9D61: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D72 $9D62: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D73 $9D63: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D74 $9D64: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D75 $9D65: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D76 $9D66: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D77 $9D67: C-----  F0 1F    BEQ  $9D88
  0x045D79 $9D69: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045D7A $9D6A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D7B $9D6B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045D7C $9D6C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045D7D $9D6D: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x045D7E $9D6E: C-----  D0 80    BNE  $9CF0
  0x045D80 $9D70: C-----  FE FE FC INC  $FCFE,X
  0x045D83 $9D73: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045D84 $9D74: C-----  F8       SED  
  0x045D85 $9D75: C-----  E0 00    CPX  #$00
  0x045D87 $9D77: C-----  00       BRK  
  0x045D88 $9D78: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045D89 $9D79: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045D8A $9D7A: C-----  F8       SED  
  0x045D8B $9D7B: C-----  F8       SED  
  0x045D8C $9D7C: C-----  E0 00    CPX  #$00
  0x045D8E $9D7E: C-----  00       BRK  
  0x045D8F $9D7F: C-----  00       BRK  
  0x045D90 $9D80: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045D91 $9D81: C-----  00       BRK  
  0x045D92 $9D82: C-----  00       BRK  
  0x045D93 $9D83: C-----  00       BRK  
  0x045D94 $9D84: C-----  00       BRK  
  0x045D95 $9D85: C-----  01 07    ORA  ($07,X)
  0x045D97 $9D87: C-----  FE C0 FF INC  $FFC0,X
  0x045D9A $9D8A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D9B $9D8B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D9C $9D8C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045D9D $9D8D: C-----  FE F8 04 INC  $04F8,X
  0x045DA0 $9D90: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x045DA1 $9D91: C-----  46 40    LSR  $40
  0x045DA3 $9D93: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045DA4 $9D94: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045DA5 $9D95: C-----  00       BRK  
  0x045DA6 $9D96: C-----  00       BRK  
  0x045DA7 $9D97: C-----  00       BRK  
  0x045DA8 $9D98: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x045DA9 $9D99: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045DAA $9D9A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045DAB $9D9B: C-----  00       BRK  
  0x045DAC $9D9C: C-----  00       BRK  
  0x045DAD $9D9D: C-----  00       BRK  
  0x045DAE $9D9E: C-----  00       BRK  
  0x045DAF $9D9F: C-----  00       BRK  
  0x045DB0 $9DA0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045DB1 $9DA1: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045DB2 $9DA2: C-----  F8       SED  
  0x045DB3 $9DA3: C-----  F8       SED  
  0x045DB4 $9DA4: C-----  F0 E0    BEQ  $9D86
  0x045DB6 $9DA6: C-----  C0 80    CPY  #$80
  0x045DB8 $9DA8: C-----  F8       SED  
  0x045DB9 $9DA9: C-----  F8       SED  
  0x045DBA $9DAA: C-----  F0 E0    BEQ  $9D8C
  0x045DBC $9DAC: C-----  E0 C0    CPX  #$C0
  0x045DBE $9DAE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045DBF $9DAF: C-----  00       BRK  
  0x045DC0 $9DB0: C-----  00       BRK  
  0x045DC1 $9DB1: C-----  00       BRK  
  0x045DC2 $9DB2: C-----  00       BRK  
  0x045DC3 $9DB3: C-----  00       BRK  
  0x045DC4 $9DB4: C-----  00       BRK  
  0x045DC5 $9DB5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045DC6 $9DB6: C-----  60       RTS  
  0x045DC7 $9DB7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045DC8 $9DB8: C-----  00       BRK  
  0x045DC9 $9DB9: C-----  00       BRK  
  0x045DCA $9DBA: C-----  00       BRK  
  0x045DCB $9DBB: C-----  00       BRK  
  0x045DCC $9DBC: C-----  00       BRK  
  0x045DCD $9DBD: C-----  00       BRK  
  0x045DCE $9DBE: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045DCF $9DBF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045DD0 $9DC0: C-----  01 03    ORA  ($03,X)
  0x045DD2 $9DC2: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045DD3 $9DC3: C-----  06 04    ASL  $04
  0x045DD5 $9DC5: C-----  05 05    ORA  $05
  0x045DD7 $9DC7: C-----  0D FE FC ORA  $FCFE
  0x045DDA $9DCA: C-----  FD F9 FB SBC  $FBF9,X
  0x045DDD $9DCD: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x045DDE $9DCE: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x045DDF $9DCF: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x045DE0 $9DD0: C-----  C0 30    CPY  #$30
  0x045DE2 $9DD2: C-----  7E FF FF ROR  $FFFF,X
  0x045DE5 $9DD5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045DE6 $9DD6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045DE7 $9DD7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045DE8 $9DD8: C-----  00       BRK  
  0x045DE9 $9DD9: C-----  C0 B0    CPY  #$B0
  0x045DEB $9DDB: C-----  7E 7F FF ROR  $FF7F,X
  0x045DEE $9DDE: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x045DEF $9DDF: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x045DF0 $9DE0: C-----  00       BRK  
  0x045DF1 $9DE1: C-----  00       BRK  
  0x045DF2 $9DE2: C-----  00       BRK  
  0x045DF3 $9DE3: C-----  00       BRK  
  0x045DF4 $9DE4: C-----  00       BRK  
  0x045DF5 $9DE5: C-----  01 03    ORA  ($03,X)
  0x045DF7 $9DE7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045DF8 $9DE8: C-----  00       BRK  
  0x045DF9 $9DE9: C-----  00       BRK  
  0x045DFA $9DEA: C-----  00       BRK  
  0x045DFB $9DEB: C-----  00       BRK  
  0x045DFC $9DEC: C-----  00       BRK  
  0x045DFD $9DED: C-----  00       BRK  
  0x045DFE $9DEE: C-----  00       BRK  
  0x045DFF $9DEF: C-----  00       BRK  
  0x045E00 $9DF0: C-----  00       BRK  
  0x045E01 $9DF1: C-----  00       BRK  
  0x045E02 $9DF2: C-----  00       BRK  
  0x045E03 $9DF3: C-----  30 67    BMI  $9E5C
  0x045E05 $9DF5: C-----  D8       CLD  
  0x045E06 $9DF6: C-----  51 40    EOR  ($40),Y
  0x045E08 $9DF8: C-----  00       BRK  
  0x045E09 $9DF9: C-----  00       BRK  
  0x045E0A $9DFA: C-----  00       BRK  
  0x045E0B $9DFB: C-----  00       BRK  
  0x045E0C $9DFC: C-----  00       BRK  
  0x045E0D $9DFD: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x045E0E $9DFE: C-----  2E 3F 39 ROL  $393F
  0x045E11 $9E01: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x045E12 $9E02: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x045E13 $9E03: C-----  48       PHA  
  0x045E14 $9E04: C-----  50 20    BVC  $9E26
  0x045E16 $9E06: C-----  20 20 16 JSR  $1620
  0x045E19 $9E09: C-----  0D 1B 37 ORA  $371B
  0x045E1C $9E0C: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x045E1D $9E0D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045E1E $9E0E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045E1F $9E0F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045E20 $9E10: C-----  00       BRK  
  0x045E21 $9E11: C-----  00       BRK  
  0x045E22 $9E12: C-----  00       BRK  
  0x045E23 $9E13: C-----  01 02    ORA  ($02,X)
  0x045E25 $9E15: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x045E26 $9E16: C-----  08       PHP  
  0x045E27 $9E17: C-----  10 00    BPL  $9E19
  0x045E29 $9E19: C-----  00       BRK  
  0x045E2A $9E1A: C-----  00       BRK  
  0x045E2B $9E1B: C-----  00       BRK  
  0x045E2C $9E1C: C-----  01 03    ORA  ($03,X)
  0x045E2E $9E1E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045E2F $9E1F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045E30 $9E20: C-----  F0 8E    BEQ  $9DB0
  0x045E32 $9E22: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x045E33 $9E23: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045E34 $9E24: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x045E35 $9E25: C-----  E1 21    SBC  ($21,X)
  0x045E37 $9E27: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x045E38 $9E28: C-----  00       BRK  
  0x045E39 $9E29: C-----  70 3C    BVS  $9E67
  0x045E3B $9E2B: C-----  00       BRK  
  0x045E3C $9E2C: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x045E3D $9E2D: C-----  1E DE ED ASL  $EDDE,X
  0x045E40 $9E30: C-----  60       RTS  
  0x045E41 $9E31: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045E42 $9E32: C-----  00       BRK  
  0x045E43 $9E33: C-----  81 C6    STA  ($C6,X)
  0x045E45 $9E35: C-----  C8       INY  
  0x045E46 $9E36: C-----  F0 E0    BEQ  $9E18
  0x045E48 $9E38: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045E49 $9E39: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045E4A $9E3A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045E4B $9E3B: C-----  7E 38 30 ROR  $3038,X
  0x045E4E $9E3E: C-----  00       BRK  
  0x045E4F $9E3F: C-----  00       BRK  
  0x045E50 $9E40: C-----  01 02    ORA  ($02,X)
  0x045E52 $9E42: C-----  01 02    ORA  ($02,X)
  0x045E54 $9E44: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045E55 $9E45: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045E56 $9E46: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045E57 $9E47: C-----  01 00    ORA  ($00,X)
  0x045E59 $9E49: C-----  01 00    ORA  ($00,X)
  0x045E5B $9E4B: C-----  01 01    ORA  ($01,X)
  0x045E5D $9E4D: C-----  01 00    ORA  ($00,X)
  0x045E5F $9E4F: C-----  00       BRK  
  0x045E60 $9E50: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x045E61 $9E51: C-----  C4 EE    CPY  $EE
  0x045E63 $9E53: C-----  F8       SED  
  0x045E64 $9E54: C-----  78       SEI  
  0x045E65 $9E55: C-----  00       BRK  
  0x045E66 $9E56: C-----  00       BRK  
  0x045E67 $9E57: C-----  00       BRK  
  0x045E68 $9E58: C-----  50 3A    BVC  $9E94
  0x045E6A $9E5A: C-----  10 04    BPL  $9E60
  0x045E6C $9E5C: C-----  00       BRK  
  0x045E6D $9E5D: C-----  00       BRK  
  0x045E6E $9E5E: C-----  00       BRK  
  0x045E6F $9E5F: C-----  00       BRK  
  0x045E70 $9E60: C-----  00       BRK  
  0x045E71 $9E61: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045E72 $9E62: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045E73 $9E63: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045E74 $9E64: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045E75 $9E65: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045E76 $9E66: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045E77 $9E67: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045E78 $9E68: C-----  00       BRK  
  0x045E79 $9E69: C-----  00       BRK  
  0x045E7A $9E6A: C-----  01 07    ORA  ($07,X)
  0x045E7C $9E6C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045E7D $9E6D: C-----  01 03    ORA  ($03,X)
  0x045E7F $9E6F: C-----  00       BRK  
  0x045E80 $9E70: C-----  C0 E0    CPY  #$E0
  0x045E82 $9E72: C-----  F0 F0    BEQ  $9E64
  0x045E84 $9E74: C-----  F8       SED  
  0x045E85 $9E75: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045E86 $9E76: C-----  FE FF 00 INC  $00FF,X
  0x045E89 $9E79: C-----  40       RTI  
  0x045E8A $9E7A: C-----  E0 E0    CPX  #$E0
  0x045E8C $9E7C: C-----  F0 F8    BEQ  $9E76
  0x045E8E $9E7E: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x045E8F $9E7F: C-----  3E 1E 3E ROL  $3E1E,X
  0x045E92 $9E82: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045E93 $9E83: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045E94 $9E84: C-----  1E 08 11 ASL  $1108,X
  0x045E97 $9E87: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x045E98 $9E88: C-----  E1 C1    SBC  ($C1,X)
  0x045E9A $9E8A: C-----  C0 00    CPY  #$00
  0x045E9C $9E8C: C-----  E1 F7    SBC  ($F7,X)
  0x045E9E $9E8E: C-----  EE 0C 40 INC  $400C
  0x045EA1 $9E91: C-----  40       RTI  
  0x045EA2 $9E92: C-----  40       RTI  
  0x045EA3 $9E93: C-----  C0 80    CPY  #$80
  0x045EA5 $9E95: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045EA6 $9E96: C-----  00       BRK  
  0x045EA7 $9E97: C-----  00       BRK  
  0x045EA8 $9E98: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045EA9 $9E99: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045EAA $9E9A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045EAB $9E9B: C-----  00       BRK  
  0x045EAC $9E9C: C-----  00       BRK  
  0x045EAD $9E9D: C-----  00       BRK  
  0x045EAE $9E9E: C-----  00       BRK  
  0x045EAF $9E9F: C-----  00       BRK  
  0x045EB0 $9EA0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045EB1 $9EA1: C-----  F0 00    BEQ  $9EA3
  0x045EB3 $9EA3: C-----  00       BRK  
  0x045EB4 $9EA4: C-----  00       BRK  
  0x045EB5 $9EA5: C-----  00       BRK  
  0x045EB6 $9EA6: C-----  00       BRK  
  0x045EB7 $9EA7: C-----  00       BRK  
  0x045EB8 $9EA8: C-----  00       BRK  
  0x045EB9 $9EA9: C-----  00       BRK  
  0x045EBA $9EAA: C-----  00       BRK  
  0x045EBB $9EAB: C-----  00       BRK  
  0x045EBC $9EAC: C-----  00       BRK  
  0x045EBD $9EAD: C-----  00       BRK  
  0x045EBE $9EAE: C-----  00       BRK  
  0x045EBF $9EAF: C-----  00       BRK  
  0x045EC0 $9EB0: C-----  00       BRK  
  0x045EC1 $9EB1: C-----  00       BRK  
  0x045EC2 $9EB2: C-----  00       BRK  
  0x045EC3 $9EB3: C-----  00       BRK  
  0x045EC4 $9EB4: C-----  00       BRK  
  0x045EC5 $9EB5: C-----  00       BRK  
  0x045EC6 $9EB6: C-----  00       BRK  
  0x045EC7 $9EB7: C-----  00       BRK  
  0x045EC8 $9EB8: C-----  01 03    ORA  ($03,X)
  0x045ECA $9EBA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045ECB $9EBB: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045ECC $9EBC: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x045ECD $9EBD: C-----  18       CLC  
  0x045ECE $9EBE: C-----  10 20    BPL  $9EE0
  0x045ED0 $9EC0: C-----  00       BRK  
  0x045ED1 $9EC1: C-----  00       BRK  
  0x045ED2 $9EC2: C-----  00       BRK  
  0x045ED3 $9EC3: C-----  00       BRK  
  0x045ED4 $9EC4: C-----  00       BRK  
  0x045ED5 $9EC5: C-----  00       BRK  
  0x045ED6 $9EC6: C-----  00       BRK  
  0x045ED7 $9EC7: C-----  00       BRK  
  0x045ED8 $9EC8: C-----  00       BRK  
  0x045ED9 $9EC9: C-----  00       BRK  
  0x045EDA $9ECA: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045EDB $9ECB: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x045EDC $9ECC: C-----  18       CLC  
  0x045EDD $9ECD: C-----  30 3F    BMI  $9F0E
  0x045EDF $9ECF: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x045EE0 $9ED0: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045EE1 $9ED1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045EE2 $9ED2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045EE3 $9ED3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045EE4 $9ED4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045EE5 $9ED5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045EE6 $9ED6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045EE7 $9ED7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045EE8 $9ED8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x045EE9 $9ED9: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045EEA $9EDA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045EEB $9EDB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045EEC $9EDC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045EED $9EDD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045EEE $9EDE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045EEF $9EDF: C-----  01 00    ORA  ($00,X)
  0x045EF1 $9EE1: C-----  00       BRK  
  0x045EF2 $9EE2: C-----  00       BRK  
  0x045EF3 $9EE3: C-----  00       BRK  
  0x045EF4 $9EE4: C-----  00       BRK  
  0x045EF5 $9EE5: C-----  00       BRK  
  0x045EF6 $9EE6: C-----  00       BRK  
  0x045EF7 $9EE7: C-----  00       BRK  
  0x045EF8 $9EE8: C-----  F0 C0    BEQ  $9EAA
  0x045EFA $9EEA: C-----  C0 E0    CPY  #$E0
  0x045EFC $9EEC: C-----  60       RTS  
  0x045EFD $9EED: C-----  30 08    BMI  $9EF7
  0x045EFF $9EEF: C-----  00       BRK  
  0x045F00 $9EF0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045F01 $9EF1: C-----  01 01    ORA  ($01,X)
  0x045F03 $9EF3: C-----  00       BRK  
  0x045F04 $9EF4: C-----  00       BRK  
  0x045F05 $9EF5: C-----  00       BRK  
  0x045F06 $9EF6: C-----  00       BRK  
  0x045F07 $9EF7: C-----  00       BRK  
  0x045F08 $9EF8: C-----  01 00    ORA  ($00,X)
  0x045F0A $9EFA: C-----  00       BRK  
  0x045F0B $9EFB: C-----  00       BRK  
  0x045F0C $9EFC: C-----  00       BRK  
  0x045F0D $9EFD: C-----  00       BRK  
  0x045F0E $9EFE: C-----  00       BRK  
  0x045F0F $9EFF: C-----  00       BRK  
  0x045F10 $9F00: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045F11 $9F01: C-----  00       BRK  
  0x045F12 $9F02: C-----  00       BRK  
  0x045F13 $9F03: C-----  00       BRK  
  0x045F14 $9F04: C-----  00       BRK  
  0x045F15 $9F05: C-----  84 D2    STY  $D2
  0x045F17 $9F07: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x045F18 $9F08: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045F19 $9F09: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045F1A $9F0A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045F1B $9F0B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045F1C $9F0C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045F1D $9F0D: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x045F1E $9F0E: C-----  2D 36 07 AND  $0736
  0x045F21 $9F11: C-----  05 09    ORA  $09
  0x045F23 $9F13: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045F24 $9F14: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045F25 $9F15: C-----  05 07    ORA  $07
  0x045F27 $9F17: C-----  71 F8    ADC  ($F8),Y
  0x045F29 $9F19: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x045F2A $9F1A: C-----  F6 FC    INC  $FC,X
  0x045F2C $9F1C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045F2D $9F1D: C-----  F8       SED  
  0x045F2E $9F1E: C-----  F8       SED  
  0x045F2F $9F1F: C-----  8E FF FA STX  $FAFF
  0x045F32 $9F22: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x045F33 $9F23: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045F34 $9F24: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x045F35 $9F25: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x045F36 $9F26: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045F37 $9F27: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x045F38 $9F28: C-----  48       PHA  
  0x045F39 $9F29: C-----  75 7D    ADC  $7D,X
  0x045F3B $9F2B: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x045F3C $9F2C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x045F3D $9F2D: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x045F3E $9F2E: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x045F3F $9F2F: C-----  00       BRK  
  0x045F40 $9F30: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x045F41 $9F31: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x045F42 $9F32: C-----  F8       SED  
  0x045F43 $9F33: C-----  E8       INX  
  0x045F44 $9F34: C-----  F0 80    BEQ  $9EB6
  0x045F46 $9F36: C-----  00       BRK  
  0x045F47 $9F37: C-----  00       BRK  
  0x045F48 $9F38: C-----  2C A8 A0 BIT  $A0A8
  0x045F4B $9F3B: C-----  50 80    BVC  $9EBD
  0x045F4D $9F3D: C-----  00       BRK  
  0x045F4E $9F3E: C-----  00       BRK  
  0x045F4F $9F3F: C-----  00       BRK  
  0x045F50 $9F40: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045F51 $9F41: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045F52 $9F42: C-----  01 03    ORA  ($03,X)
  0x045F54 $9F44: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045F55 $9F45: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045F56 $9F46: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045F57 $9F47: C-----  01 01    ORA  ($01,X)
  0x045F59 $9F49: C-----  01 00    ORA  ($00,X)
  0x045F5B $9F4B: C-----  00       BRK  
  0x045F5C $9F4C: C-----  01 01    ORA  ($01,X)
  0x045F5E $9F4E: C-----  00       BRK  
  0x045F5F $9F4F: C-----  00       BRK  
  0x045F60 $9F50: C-----  10 08    BPL  $9F5A
  0x045F62 $9F52: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x045F63 $9F53: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x045F64 $9F54: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x045F65 $9F55: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x045F66 $9F56: C-----  84 64    STY  $64
  0x045F68 $9F58: C-----  E0 F0    CPX  #$F0
  0x045F6A $9F5A: C-----  F0 F8    BEQ  $9F54
  0x045F6C $9F5C: C-----  F8       SED  
  0x045F6D $9F5D: C-----  F8       SED  
  0x045F6E $9F5E: C-----  78       SEI  
  0x045F6F $9F5F: C-----  98       TYA  
  0x045F70 $9F60: C-----  00       BRK  
  0x045F71 $9F61: C-----  00       BRK  
  0x045F72 $9F62: C-----  00       BRK  
  0x045F73 $9F63: C-----  00       BRK  
  0x045F74 $9F64: C-----  00       BRK  
  0x045F75 $9F65: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045F76 $9F66: C-----  60       RTS  
  0x045F77 $9F67: C-----  10 00    BPL  $9F69
  0x045F79 $9F69: C-----  00       BRK  
  0x045F7A $9F6A: C-----  00       BRK  
  0x045F7B $9F6B: C-----  00       BRK  
  0x045F7C $9F6C: C-----  00       BRK  
  0x045F7D $9F6D: C-----  00       BRK  
  0x045F7E $9F6E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045F7F $9F6F: C-----  E0 74    CPX  #$74
  0x045F81 $9F71: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x045F82 $9F72: C-----  F8       SED  
  0x045F83 $9F73: C-----  F8       SED  
  0x045F84 $9F74: C-----  F0 C0    BEQ  $9F36
  0x045F86 $9F76: C-----  00       BRK  
  0x045F87 $9F77: C-----  00       BRK  
  0x045F88 $9F78: C-----  A8       TAY  
  0x045F89 $9F79: C-----  A8       TAY  
  0x045F8A $9F7A: C-----  60       RTS  
  0x045F8B $9F7B: C-----  40       RTI  
  0x045F8C $9F7C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045F8D $9F7D: C-----  00       BRK  
  0x045F8E $9F7E: C-----  00       BRK  
  0x045F8F $9F7F: C-----  00       BRK  
  0x045F90 $9F80: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045F91 $9F81: C-----  C0 E0    CPY  #$E0
  0x045F93 $9F83: C-----  E0 F0    CPX  #$F0
  0x045F95 $9F85: C-----  F8       SED  
  0x045F96 $9F86: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045F97 $9F87: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x045F98 $9F88: C-----  00       BRK  
  0x045F99 $9F89: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x045F9A $9F8A: C-----  C0 C0    CPY  #$C0
  0x045F9C $9F8C: C-----  E0 F0    CPX  #$F0
  0x045F9E $9F8E: C-----  F8       SED  
  0x045F9F $9F8F: C-----  F8       SED  
  0x045FA0 $9F90: C-----  00       BRK  
  0x045FA1 $9F91: C-----  00       BRK  
  0x045FA2 $9F92: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x045FA3 $9F93: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x045FA4 $9F94: C-----  18       CLC  
  0x045FA5 $9F95: C-----  30 3F    BMI  $9FD6
  0x045FA7 $9F97: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x045FA8 $9F98: C-----  00       BRK  
  0x045FA9 $9F99: C-----  00       BRK  
  0x045FAA $9F9A: C-----  00       BRK  
  0x045FAB $9F9B: C-----  00       BRK  
  0x045FAC $9F9C: C-----  00       BRK  
  0x045FAD $9F9D: C-----  00       BRK  
  0x045FAE $9F9E: C-----  00       BRK  
  0x045FAF $9F9F: C-----  00       BRK  
  0x045FB0 $9FA0: C-----  01 03    ORA  ($03,X)
  0x045FB2 $9FA2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x045FB3 $9FA3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045FB4 $9FA4: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x045FB5 $9FA5: C-----  18       CLC  
  0x045FB6 $9FA6: C-----  10 20    BPL  $9FC8
  0x045FB8 $9FA8: C-----  00       BRK  
  0x045FB9 $9FA9: C-----  00       BRK  
  0x045FBA $9FAA: C-----  00       BRK  
  0x045FBB $9FAB: C-----  00       BRK  
  0x045FBC $9FAC: C-----  00       BRK  
  0x045FBD $9FAD: C-----  00       BRK  
  0x045FBE $9FAE: C-----  00       BRK  
  0x045FBF $9FAF: C-----  00       BRK  
  0x045FC0 $9FB0: C-----  F0 C0    BEQ  $9F72
  0x045FC2 $9FB2: C-----  C0 E0    CPY  #$E0
  0x045FC4 $9FB4: C-----  60       RTS  
  0x045FC5 $9FB5: C-----  30 08    BMI  $9FBF
  0x045FC7 $9FB7: C-----  00       BRK  
  0x045FC8 $9FB8: C-----  00       BRK  
  0x045FC9 $9FB9: C-----  00       BRK  
  0x045FCA $9FBA: C-----  00       BRK  
  0x045FCB $9FBB: C-----  00       BRK  
  0x045FCC $9FBC: C-----  00       BRK  
  0x045FCD $9FBD: C-----  00       BRK  
  0x045FCE $9FBE: C-----  00       BRK  
  0x045FCF $9FBF: C-----  00       BRK  
  0x045FD0 $9FC0: C-----  00       BRK  
  0x045FD1 $9FC1: C-----  00       BRK  
  0x045FD2 $9FC2: C-----  10 0C    BPL  $9FD0
  0x045FD4 $9FC4: C-----  06 03    ASL  $03
  0x045FD6 $9FC6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045FD7 $9FC7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045FD8 $9FC8: C-----  00       BRK  
  0x045FD9 $9FC9: C-----  00       BRK  
  0x045FDA $9FCA: C-----  00       BRK  
  0x045FDB $9FCB: C-----  00       BRK  
  0x045FDC $9FCC: C-----  00       BRK  
  0x045FDD $9FCD: C-----  00       BRK  
  0x045FDE $9FCE: C-----  00       BRK  
  0x045FDF $9FCF: C-----  00       BRK  
  0x045FE0 $9FD0: C-----  00       BRK  
  0x045FE1 $9FD1: C-----  00       BRK  
  0x045FE2 $9FD2: C-----  00       BRK  
  0x045FE3 $9FD3: C-----  00       BRK  
  0x045FE4 $9FD4: C-----  00       BRK  
  0x045FE5 $9FD5: C-----  00       BRK  
  0x045FE6 $9FD6: C-----  00       BRK  
  0x045FE7 $9FD7: C-----  00       BRK  
  0x045FE8 $9FD8: C-----  00       BRK  
  0x045FE9 $9FD9: C-----  00       BRK  
  0x045FEA $9FDA: C-----  10 0C    BPL  $9FE8
  0x045FEC $9FDC: C-----  06 03    ASL  $03
  0x045FEE $9FDE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x045FEF $9FDF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x045FF0 $9FE0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045FF1 $9FE1: C-----  00       BRK  
  0x045FF2 $9FE2: C-----  00       BRK  
  0x045FF3 $9FE3: C-----  01 01    ORA  ($01,X)
  0x045FF5 $9FE5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x045FF6 $9FE6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x045FF7 $9FE7: C-----  00       BRK  
  0x045FF8 $9FE8: C-----  00       BRK  
  0x045FF9 $9FE9: C-----  00       BRK  
  0x045FFA $9FEA: C-----  00       BRK  
  0x045FFB $9FEB: C-----  00       BRK  
  0x045FFC $9FEC: C-----  00       BRK  
  0x045FFD $9FED: C-----  00       BRK  
  0x045FFE $9FEE: C-----  00       BRK  
  0x045FFF $9FEF: C-----  00       BRK  
  0x046000 $9FF0: C-----  E0 F0    CPX  #$F0
  0x046002 $9FF2: C-----  F8       SED  
  0x046003 $9FF3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x046004 $9FF4: C-----  8C 06 02 STY  $0206
  0x046007 $9FF7: C-----  01 00    ORA  ($00,X)
  0x046009 $9FF9: C-----  00       BRK  
  0x04600A $9FFA: C-----  00       BRK  
  0x04600B $9FFB: C-----  00       BRK  
  0x04600C $9FFC: C-----  00       BRK  
  0x04600D $9FFD: C-----  00       BRK  
  0x04600E $9FFE: C-----  00       BRK  
  0x04600F $9FFF: C-----  00       BRK  