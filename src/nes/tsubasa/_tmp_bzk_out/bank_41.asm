; ===== MMC3 Bank 41 =====
; ROM: 0x052010-0x05400F
; CPU: $8000-$9FFF
; CDL: code=7798 data=0 unaccessed=394

  0x052010 $8000: C-----  00       BRK  
  0x052011 $8001: C-----  00       BRK  
  0x052012 $8002: C-----  00       BRK  
  0x052013 $8003: C-----  00       BRK  
  0x052014 $8004: C-----  00       BRK  
  0x052015 $8005: C-----  00       BRK  
  0x052016 $8006: C-----  00       BRK  
  0x052017 $8007: C-----  00       BRK  
  0x052018 $8008: C-----  00       BRK  
  0x052019 $8009: C-----  00       BRK  
  0x05201A $800A: C-----  00       BRK  
  0x05201B $800B: C-----  00       BRK  
  0x05201C $800C: C-----  00       BRK  
  0x05201D $800D: C-----  00       BRK  
  0x05201E $800E: C-----  00       BRK  
  0x05201F $800F: C-----  00       BRK  
  0x052020 $8010: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052021 $8011: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052022 $8012: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052023 $8013: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052024 $8014: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052025 $8015: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052026 $8016: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052027 $8017: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052028 $8018: C-----  00       BRK  
  0x052029 $8019: C-----  00       BRK  
  0x05202A $801A: C-----  00       BRK  
  0x05202B $801B: C-----  00       BRK  
  0x05202C $801C: C-----  00       BRK  
  0x05202D $801D: C-----  00       BRK  
  0x05202E $801E: C-----  00       BRK  
  0x05202F $801F: C-----  00       BRK  
  0x052030 $8020: C-----  00       BRK  
  0x052031 $8021: C-----  00       BRK  
  0x052032 $8022: C-----  05 5A    ORA  $5A
  0x052034 $8024: C-----  AD 6A BF LDA  $BF6A
  0x052037 $8027: C-----  56 00    LSR  $00,X
  0x052039 $8029: C-----  A9 D8    LDA  #$D8
  0x05203B $802B: C-----  A1 42    LDA  ($42,X)
  0x05203D $802D: C-----  95 00    STA  $00,X
  0x05203F $802F: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x052040 $8030: C-----  00       BRK  
  0x052041 $8031: C-----  21 06    AND  ($06,X)
  0x052043 $8033: C-----  00       BRK  
  0x052044 $8034: C-----  7E 42 42 ROR  $4242,X
  0x052047 $8037: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x052048 $8038: C-----  00       BRK  
  0x052049 $8039: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x05204A $803A: C-----  C8       INY  
  0x05204B $803B: C-----  00       BRK  
  0x05204C $803C: C-----  7E 7E 7E ROR  $7E7E,X
  0x05204F $803F: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x052050 $8040: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052051 $8041: C-----  FE 7E FE INC  $FE7E,X
  0x052054 $8044: C-----  00       BRK  
  0x052055 $8045: C-----  00       BRK  
  0x052056 $8046: C-----  00       BRK  
  0x052057 $8047: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x052058 $8048: C-----  00       BRK  
  0x052059 $8049: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05205A $804A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05205B $804B: C-----  FE 00 FF INC  $FF00,X
  0x05205E $804E: C-----  00       BRK  
  0x05205F $804F: C-----  0E FF FF ASL  $FFFF
  0x052062 $8052: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052063 $8053: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052064 $8054: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052065 $8055: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052066 $8056: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052067 $8057: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052068 $8058: C-----  00       BRK  
  0x052069 $8059: C-----  00       BRK  
  0x05206A $805A: C-----  00       BRK  
  0x05206B $805B: C-----  00       BRK  
  0x05206C $805C: C-----  00       BRK  
  0x05206D $805D: C-----  00       BRK  
  0x05206E $805E: C-----  00       BRK  
  0x05206F $805F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052070 $8060: C-----  00       BRK  
  0x052071 $8061: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x052072 $8062: C-----  A1 6A    LDA  ($6A,X)
  0x052074 $8064: C-----  9D AE 55 STA  $55AE,X
  0x052077 $8067: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x052078 $8068: C-----  00       BRK  
  0x052079 $8069: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05207A $806A: C-----  4C 00 22 JMP  $2200
  0x05207D $806D: C-----  50 28    BVC  $8097
  0x05207F $806F: C-----  B4 00    LDY  $00,X
  0x052081 $8071: C-----  00       BRK  
  0x052082 $8072: C-----  00       BRK  
  0x052083 $8073: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052084 $8074: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052085 $8075: C-----  40       RTI  
  0x052086 $8076: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052087 $8077: C-----  C6 00    DEC  $00
  0x052089 $8079: C-----  DE 90 5E DEC  $5E90,X
  0x05208C $807C: C-----  50 9E    BVC  $801C
  0x05208E $807E: C-----  50 5E    BVC  $80DE
  0x052090 $8080: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x052091 $8081: C-----  55 AE    EOR  $AE,X
  0x052093 $8083: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x052094 $8084: C-----  00       BRK  
  0x052095 $8085: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052096 $8086: C-----  00       BRK  
  0x052097 $8087: C-----  00       BRK  
  0x052098 $8088: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x052099 $8089: C-----  79 54 A1 ADC  $A154,Y
  0x05209C $808C: C-----  00       BRK  
  0x05209D $808D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05209E $808E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05209F $808F: C-----  00       BRK  
  0x0520A0 $8090: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0520A1 $8091: C-----  00       BRK  
  0x0520A2 $8092: C-----  00       BRK  
  0x0520A3 $8093: C-----  18       CLC  
  0x0520A4 $8094: C-----  00       BRK  
  0x0520A5 $8095: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0520A6 $8096: C-----  00       BRK  
  0x0520A7 $8097: C-----  00       BRK  
  0x0520A8 $8098: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0520A9 $8099: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0520AA $809A: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0520AB $809B: C-----  7E 00 FF ROR  $FF00,X
  0x0520AE $809E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0520AF $809F: C-----  00       BRK  
  0x0520B0 $80A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0520B1 $80A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0520B2 $80A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0520B3 $80A3: C-----  FE F5 FF INC  $FFF5,X
  0x0520B6 $80A6: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x0520B7 $80A7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0520B8 $80A8: C-----  00       BRK  
  0x0520B9 $80A9: C-----  00       BRK  
  0x0520BA $80AA: C-----  00       BRK  
  0x0520BB $80AB: C-----  01 0B    ORA  ($0B,X)
  0x0520BD $80AD: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x0520BE $80AE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0520BF $80AF: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0520C0 $80B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0520C1 $80B1: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0520C2 $80B2: C-----  39 F8 B8 AND  $B8F8,Y
  0x0520C5 $80B5: C-----  C0 F9    CPY  #$F9
  0x0520C7 $80B7: C-----  FD 0B 3F SBC  $3F0B,X
  0x0520CA $80BA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0520CB $80BB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0520CC $80BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0520CD $80BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0520CE $80BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0520CF $80BF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0520D0 $80C0: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x0520D1 $80C1: C-----  55 AE    EOR  $AE,X
  0x0520D3 $80C3: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0520D4 $80C4: C-----  00       BRK  
  0x0520D5 $80C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0520D6 $80C6: C-----  00       BRK  
  0x0520D7 $80C7: C-----  00       BRK  
  0x0520D8 $80C8: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x0520D9 $80C9: C-----  79 54 A1 ADC  $A154,Y
  0x0520DC $80CC: C-----  00       BRK  
  0x0520DD $80CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0520DE $80CE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0520DF $80CF: C-----  00       BRK  
  0x0520E0 $80D0: C-----  C0 86    CPY  #$86
  0x0520E2 $80D2: C-----  40       RTI  
  0x0520E3 $80D3: C-----  86 00    STX  $00
  0x0520E5 $80D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0520E6 $80D6: C-----  00       BRK  
  0x0520E7 $80D7: C-----  00       BRK  
  0x0520E8 $80D8: C-----  10 DE    BPL  $80B8
  0x0520EA $80DA: C-----  90 DE    BCC  $80BA
  0x0520EC $80DC: C-----  10 FF    BPL  $80DD
  0x0520EE $80DE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0520EF $80DF: C-----  00       BRK  
  0x0520F0 $80E0: ------  .byte $FF
  0x0520F1 $80E1: ------  .byte $FF
  0x0520F2 $80E2: ------  .byte $FE
  0x0520F3 $80E3: ------  .byte $FE
  0x0520F4 $80E4: ------  .byte $F8
  0x0520F5 $80E5: ------  .byte $FB
  0x0520F6 $80E6: ------  .byte $F2
  0x0520F7 $80E7: ------  .byte $FD
  0x0520F8 $80E8: ------  .byte $00
  0x0520F9 $80E9: ------  .byte $00
  0x0520FA $80EA: ------  .byte $01
  0x0520FB $80EB: ------  .byte $01
  0x0520FC $80EC: ------  .byte $07
  0x0520FD $80ED: ------  .byte $07
  0x0520FE $80EE: ------  .byte $0F
  0x0520FF $80EF: ------  .byte $07
  0x052100 $80F0: ------  .byte $FF
  0x052101 $80F1: ------  .byte $FF
  0x052102 $80F2: ------  .byte $BF
  0x052103 $80F3: ------  .byte $3F
  0x052104 $80F4: ------  .byte $1F
  0x052105 $80F5: ------  .byte $EF
  0x052106 $80F6: ------  .byte $AF
  0x052107 $80F7: ------  .byte $F7
  0x052108 $80F8: ------  .byte $00
  0x052109 $80F9: ------  .byte $00
  0x05210A $80FA: ------  .byte $40
  0x05210B $80FB: ------  .byte $C0
  0x05210C $80FC: ------  .byte $E0
  0x05210D $80FD: ------  .byte $D0
  0x05210E $80FE: ------  .byte $F0
  0x05210F $80FF: ------  .byte $F8
  0x052110 $8100: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052111 $8101: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052112 $8102: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052113 $8103: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052114 $8104: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052115 $8105: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052116 $8106: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052117 $8107: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052118 $8108: C-----  01 02    ORA  ($02,X)
  0x05211A $810A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05211B $810B: C-----  08       PHP  
  0x05211C $810C: C-----  10 20    BPL  $812E
  0x05211E $810E: C-----  40       RTI  
  0x05211F $810F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052120 $8110: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x052121 $8111: C-----  70 54    BVS  $8167
  0x052123 $8113: C-----  FE 46 D7 INC  $D746,X
  0x052126 $8116: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x052127 $8117: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x052128 $8118: C-----  24 8F    BIT  $8F
  0x05212A $811A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05212B $811B: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05212C $811C: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x05212D $811D: C-----  29 48    AND  #$48
  0x05212F $811F: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x052130 $8120: C-----  00       BRK  
  0x052131 $8121: C-----  00       BRK  
  0x052132 $8122: C-----  00       BRK  
  0x052133 $8123: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x052134 $8124: C-----  84 E1    STY  $E1
  0x052136 $8126: C-----  B0 58    BCS  $8180
  0x052138 $8128: C-----  91 64    STA  ($64),Y
  0x05213A $812A: C-----  29 93    AND  #$93
  0x05213C $812C: C-----  4E 07 13 LSR  $1307
  0x05213F $812F: C-----  A1 4A    LDA  ($4A,X)
  0x052141 $8131: C-----  28       PLP  
  0x052142 $8132: C-----  50 11    BVC  $8145
  0x052144 $8134: C-----  !!UNDEF $92  ; unknown opcode, treating as data
  0x052145 $8135: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x052146 $8136: C-----  48       PHA  
  0x052147 $8137: C-----  90 5F    BCC  $8198
  0x052149 $8139: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x05214A $813A: C-----  !!UNDEF $72  ; unknown opcode, treating as data
  0x05214B $813B: C-----  09 D3    ORA  #$D3
  0x05214D $813D: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x05214E $813E: C-----  6E DC 0A ROR  $0ADC
  0x052151 $8141: C-----  94 40    STY  $40,X
  0x052153 $8143: C-----  09 82    ORA  #$82
  0x052155 $8145: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x052156 $8146: C-----  88       DEY  
  0x052157 $8147: C-----  90 CA    BCC  $8113
  0x052159 $8149: C-----  B6 54    LDX  $54,Y
  0x05215B $814B: C-----  A9 E3    LDA  #$E3
  0x05215D $814D: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x05215E $814E: C-----  8E 9C 21 STX  $219C
  0x052161 $8151: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x052162 $8152: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x052163 $8153: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052164 $8154: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052165 $8155: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052166 $8156: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052167 $8157: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052168 $8158: C-----  38       SEC  
  0x052169 $8159: C-----  70 E0    BVS  $813B
  0x05216B $815B: C-----  C0 80    CPY  #$80
  0x05216D $815D: C-----  00       BRK  
  0x05216E $815E: C-----  00       BRK  
  0x05216F $815F: C-----  00       BRK  
  0x052170 $8160: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052171 $8161: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052172 $8162: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052173 $8163: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x052174 $8164: C-----  F8       SED  
  0x052175 $8165: C-----  F8       SED  
  0x052176 $8166: C-----  F0 E0    BEQ  $8148
  0x052178 $8168: C-----  01 03    ORA  ($03,X)
  0x05217A $816A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05217B $816B: C-----  1E 18 39 ASL  $3918,X
  0x05217E $816E: C-----  !!UNDEF $72  ; unknown opcode, treating as data
  0x05217F $816F: C-----  E4 C0    CPX  $C0
  0x052181 $8171: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052182 $8172: C-----  08       PHP  
  0x052183 $8173: C-----  00       BRK  
  0x052184 $8174: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x052185 $8175: C-----  05 00    ORA  $00
  0x052187 $8177: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052188 $8178: C-----  C8       INY  
  0x052189 $8179: C-----  94 29    STY  $29,X
  0x05218B $817B: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x05218C $817C: C-----  85 0A    STA  $0A
  0x05218E $817E: C-----  25 48    AND  $48
  0x052190 $8180: C-----  21 43    AND  ($43,X)
  0x052192 $8182: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x052193 $8183: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052194 $8184: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052195 $8185: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052196 $8186: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052197 $8187: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052198 $8188: C-----  B8       CLV  
  0x052199 $8189: C-----  70 E0    BVS  $816B
  0x05219B $818B: C-----  C0 80    CPY  #$80
  0x05219D $818D: C-----  00       BRK  
  0x05219E $818E: C-----  00       BRK  
  0x05219F $818F: C-----  00       BRK  
  0x0521A0 $8190: C-----  C0 80    CPY  #$80
  0x0521A2 $8192: C-----  08       PHP  
  0x0521A3 $8193: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0521A4 $8194: C-----  00       BRK  
  0x0521A5 $8195: C-----  06 08    ASL  $08
  0x0521A7 $8197: C-----  21 C8    AND  ($C8,X)
  0x0521A9 $8199: C-----  94 29    STY  $29,X
  0x0521AB $819B: C-----  51 87    EOR  ($87),Y
  0x0521AD $819D: C-----  08       PHP  
  0x0521AE $819E: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0521AF $819F: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x0521B0 $81A0: C-----  91 02    STA  ($02),Y
  0x0521B2 $81A2: C-----  A0 A1    LDY  #$A1
  0x0521B4 $81A4: C-----  !!UNDEF $72  ; unknown opcode, treating as data
  0x0521B5 $81A5: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x0521B6 $81A6: C-----  88       DEY  
  0x0521B7 $81A7: C-----  90 31    BCC  $81DA
  0x0521B9 $81A9: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x0521BA $81AA: C-----  EC 71 43 CPX  $4371
  0x0521BD $81AD: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x0521BE $81AE: C-----  CE 1C 2F DEC  $2F1C
  0x0521C1 $81B1: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x0521C2 $81B2: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0521C3 $81B3: C-----  28       PLP  
  0x0521C4 $81B4: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0521C5 $81B5: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x0521C6 $81B6: C-----  40       RTI  
  0x0521C7 $81B7: C-----  20 40 80 JSR  $8040
  0x0521CA $81BA: C-----  18       CLC  
  0x0521CB $81BB: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0521CC $81BC: C-----  7E F3 E1 ROR  $E1F3,X
  0x0521CF $81BF: C-----  60       RTS  
  0x0521D0 $81C0: C-----  FE FF FF INC  $FFFF,X
  0x0521D3 $81C3: C-----  FE FC C8 INC  $C8FC,X
  0x0521D6 $81C6: C-----  E0 E0    CPX  #$E0
  0x0521D8 $81C8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0521D9 $81C9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0521DA $81CA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0521DB $81CB: C-----  0E 1C 79 ASL  $791C
  0x0521DE $81CE: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x0521DF $81CF: C-----  E4 40    CPX  $40
  0x0521E1 $81D1: C-----  00       BRK  
  0x0521E2 $81D2: C-----  08       PHP  
  0x0521E3 $81D3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0521E4 $81D4: C-----  00       BRK  
  0x0521E5 $81D5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0521E6 $81D6: C-----  08       PHP  
  0x0521E7 $81D7: C-----  21 C8    AND  ($C8,X)
  0x0521E9 $81D9: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0521EA $81DA: C-----  29 51    AND  #$51
  0x0521EC $81DC: C-----  86 08    STX  $08
  0x0521EE $81DE: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0521EF $81DF: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x0521F0 $81E0: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0521F1 $81E1: C-----  A4 B4    LDY  $B4
  0x0521F3 $81E3: C-----  09 12    ORA  #$12
  0x0521F5 $81E5: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0521F6 $81E6: C-----  08       PHP  
  0x0521F7 $81E7: C-----  10 5A    BPL  $8243
  0x0521F9 $81E9: C-----  E4 BC    CPX  $BC
  0x0521FB $81EB: C-----  49 F3    EOR  #$F3
  0x0521FD $81ED: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x0521FE $81EE: C-----  8E 9C 28 STX  $289C
  0x052201 $81F1: C-----  78       SEI  
  0x052202 $81F2: C-----  84 11    STY  $11
  0x052204 $81F4: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x052205 $81F5: C-----  A4 48    LDY  $48
  0x052207 $81F7: C-----  10 BC    BPL  $81B5
  0x052209 $81F9: C-----  7E D4 F9 ROR  $F9D4,X
  0x05220C $81FC: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x05220D $81FD: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x05220E $81FE: C-----  CE 9C DD DEC  $DD9C
  0x052211 $8201: C-----  ED C1 EB SBC  $EBC1
  0x052214 $8204: C-----  F9 FE FC SBC  $FCFE,Y
  0x052217 $8207: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052218 $8208: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052219 $8209: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05221A $820A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05221B $820B: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x05221C $820C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05221D $820D: C-----  01 03    ORA  ($03,X)
  0x05221F $820F: C-----  00       BRK  
  0x052220 $8210: C-----  BD 99 E3 LDA  $E399,X
  0x052223 $8213: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x052224 $8214: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x052225 $8215: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x052226 $8216: C-----  08       PHP  
  0x052227 $8217: C-----  3E FF FF ROL  $FFFF,X
  0x05222A $821A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05222B $821B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05222C $821C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05222D $821D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05222E $821E: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x05222F $821F: C-----  C1 2A    CMP  ($2A,X)
  0x052231 $8221: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x052232 $8222: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x052233 $8223: C-----  1E 13 0E ASL  $0E13,X
  0x052236 $8226: C-----  15 0A    ORA  $0A,X
  0x052238 $8228: C-----  55 09    EOR  $09,X
  0x05223A $822A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05223B $822B: C-----  60       RTS  
  0x05223C $822C: C-----  25 50    AND  $50
  0x05223E $822E: C-----  29 75    AND  #$75
  0x052240 $8230: C-----  40       RTI  
  0x052241 $8231: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x052242 $8232: C-----  28       PLP  
  0x052243 $8233: C-----  08       PHP  
  0x052244 $8234: C-----  08       PHP  
  0x052245 $8235: C-----  48       PHA  
  0x052246 $8236: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052247 $8237: C-----  00       BRK  
  0x052248 $8238: C-----  00       BRK  
  0x052249 $8239: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x05224A $823A: C-----  0E 6E 4E ASL  $4E6E
  0x05224D $823D: C-----  0E 2F 20 ASL  $202F
  0x052250 $8240: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052251 $8241: C-----  F0 F1    BEQ  $8234
  0x052253 $8243: C-----  F0 F0    BEQ  $8235
  0x052255 $8245: C-----  F0 F0    BEQ  $8237
  0x052257 $8247: C-----  D0 64    BNE  $82AD
  0x052259 $8249: C-----  75 35    ADC  $35,X
  0x05225B $824B: C-----  35 34    AND  $34,X
  0x05225D $824D: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x05225E $824E: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x05225F $824F: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x052260 $8250: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052261 $8251: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052262 $8252: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052263 $8253: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052264 $8254: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052265 $8255: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052266 $8256: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052267 $8257: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052268 $8258: C-----  01 01    ORA  ($01,X)
  0x05226A $825A: C-----  01 01    ORA  ($01,X)
  0x05226C $825C: C-----  01 01    ORA  ($01,X)
  0x05226E $825E: C-----  01 01    ORA  ($01,X)
  0x052270 $8260: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x052271 $8261: C-----  15 4E    ORA  $4E,X
  0x052273 $8263: C-----  1D 4A 35 ORA  $354A,X
  0x052276 $8266: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x052277 $8267: C-----  2D 00 48 AND  $4800
  0x05227A $826A: C-----  21 22    AND  ($22,X)
  0x05227C $826C: C-----  05 0B    ORA  $0B
  0x05227E $826E: C-----  24 01    BIT  $01
  0x052280 $8270: C-----  00       BRK  
  0x052281 $8271: C-----  01 01    ORA  ($01,X)
  0x052283 $8273: C-----  00       BRK  
  0x052284 $8274: C-----  00       BRK  
  0x052285 $8275: C-----  00       BRK  
  0x052286 $8276: C-----  05 1B    ORA  $1B
  0x052288 $8278: C-----  00       BRK  
  0x052289 $8279: C-----  55 55    EOR  $55,X
  0x05228B $827B: C-----  55 7F    EOR  $7F,X
  0x05228D $827D: C-----  00       BRK  
  0x05228E $827E: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x05228F $827F: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x052290 $8280: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x052291 $8281: C-----  B4 74    LDY  $74,X
  0x052293 $8283: C-----  A4 54    LDY  $54
  0x052295 $8285: C-----  B4 D4    LDY  $D4,X
  0x052297 $8287: C-----  A4 56    LDY  $56
  0x052299 $8289: C-----  06 A6    ASL  $A6
  0x05229B $828B: C-----  46 E6    LSR  $E6
  0x05229D $828D: C-----  D6 66    DEC  $66,X
  0x05229F $828F: C-----  16 04    ASL  $04,X
  0x0522A1 $8291: C-----  84 04    STY  $04
  0x0522A3 $8293: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0522A4 $8294: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0522A5 $8295: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0522A6 $8296: C-----  84 04    STY  $04
  0x0522A8 $8298: C-----  06 F6    ASL  $F6
  0x0522AA $829A: C-----  16 16    ASL  $16,X
  0x0522AC $829C: C-----  16 16    ASL  $16,X
  0x0522AE $829E: C-----  F6 06    INC  $06,X
  0x0522B0 $82A0: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0522B1 $82A1: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0522B2 $82A2: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x0522B3 $82A3: C-----  7E 68 F3 ROR  $F368,X
  0x0522B6 $82A6: C-----  E9 FB    SBC  #$FB
  0x0522B8 $82A8: C-----  50 E0    BVC  $828A
  0x0522BA $82AA: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0522BB $82AB: C-----  F9 FF FF SBC  $FFFF,Y
  0x0522BE $82AE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0522BF $82AF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0522C0 $82B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0522C1 $82B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0522C2 $82B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0522C3 $82B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0522C4 $82B4: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0522C5 $82B5: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0522C6 $82B6: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x0522C7 $82B7: C-----  !!UNDEF $A3  ; unknown opcode, treating as data
  0x0522C8 $82B8: C-----  00       BRK  
  0x0522C9 $82B9: C-----  00       BRK  
  0x0522CA $82BA: C-----  00       BRK  
  0x0522CB $82BB: C-----  00       BRK  
  0x0522CC $82BC: C-----  40       RTI  
  0x0522CD $82BD: C-----  F0 F0    BEQ  $82AF
  0x0522CF $82BF: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0522D0 $82C0: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x0522D1 $82C1: C-----  B4 74    LDY  $74,X
  0x0522D3 $82C3: C-----  A4 54    LDY  $54
  0x0522D5 $82C5: C-----  B4 D4    LDY  $D4,X
  0x0522D7 $82C7: C-----  A4 56    LDY  $56
  0x0522D9 $82C9: C-----  06 A6    ASL  $A6
  0x0522DB $82CB: C-----  46 E6    LSR  $E6
  0x0522DD $82CD: C-----  D6 66    DEC  $66,X
  0x0522DF $82CF: C-----  16 04    ASL  $04,X
  0x0522E1 $82D1: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x0522E2 $82D2: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x0522E3 $82D3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0522E4 $82D4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0522E5 $82D5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0522E6 $82D6: C-----  A4 D4    LDY  $D4
  0x0522E8 $82D8: C-----  06 56    ASL  $56
  0x0522EA $82DA: C-----  56 56    LSR  $56,X
  0x0522EC $82DC: C-----  FE 06 56 INC  $5606,X
  0x0522EF $82DF: C-----  76 F9    ROR  $F9,X
  0x0522F1 $82E1: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0522F2 $82E2: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x0522F3 $82E3: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0522F4 $82E4: C-----  E5 CA    SBC  $CA
  0x0522F6 $82E6: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0522F7 $82E7: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0522F8 $82E8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0522F9 $82E9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0522FA $82EA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0522FB $82EB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0522FC $82EC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0522FD $82ED: C-----  F5 C0    SBC  $C0,X
  0x0522FF $82EF: C-----  40       RTI  
  0x052300 $82F0: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x052301 $82F1: C-----  !!UNDEF $A3  ; unknown opcode, treating as data
  0x052302 $82F2: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x052303 $82F3: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x052304 $82F4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052305 $82F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052306 $82F6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052307 $82F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052308 $82F8: C-----  F8       SED  
  0x052309 $82F9: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05230A $82FA: C-----  D0 E0    BNE  $82DC
  0x05230C $82FC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05230D $82FD: C-----  00       BRK  
  0x05230E $82FE: C-----  00       BRK  
  0x05230F $82FF: C-----  00       BRK  
  0x052310 $8300: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052311 $8301: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052312 $8302: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052313 $8303: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052314 $8304: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052315 $8305: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052316 $8306: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052317 $8307: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052318 $8308: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052319 $8309: C-----  40       RTI  
  0x05231A $830A: C-----  20 10 08 JSR  $0810
  0x05231D $830D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05231E $830E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05231F $830F: C-----  01 85    ORA  ($85,X)
  0x052321 $8311: C-----  9D BE 92 STA  $92BE,X
  0x052324 $8314: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x052325 $8315: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x052326 $8316: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052327 $8317: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x052328 $8318: C-----  65 71    ADC  $71
  0x05232A $831A: C-----  C8       INY  
  0x05232B $831B: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x05232C $831C: C-----  08       PHP  
  0x05232D $831D: C-----  8C 02 41 STY  $4102
  0x052330 $8320: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x052331 $8321: C-----  10 08    BPL  $832B
  0x052333 $8323: C-----  01 03    ORA  ($03,X)
  0x052335 $8325: C-----  06 05    ASL  $05
  0x052337 $8327: C-----  0E B7 1E ASL  $1EB7
  0x05233A $832A: C-----  4C 28 92 JMP  $9228
  0x05233D $832D: C-----  61 48    ADC  ($48,X)
  0x05233F $832F: C-----  91 10    STA  ($10),Y
  0x052341 $8331: C-----  88       DEY  
  0x052342 $8332: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x052343 $8333: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x052344 $8334: C-----  39 40 A2 AND  $A240,Y
  0x052347 $8337: C-----  09 9C    ORA  #$9C
  0x052349 $8339: C-----  AE C7 93 LDX  $93C7
  0x05234C $833C: C-----  E9 26    SBC  #$26
  0x05234E $833E: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x05234F $833F: C-----  4D 10 88 EOR  $8810
  0x052352 $8342: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x052353 $8343: C-----  !!UNDEF $92  ; unknown opcode, treating as data
  0x052354 $8344: C-----  41 00    EOR  ($00,X)
  0x052356 $8346: C-----  24 4B    BIT  $4B
  0x052358 $8348: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x052359 $8349: C-----  CE 67 93 DEC  $9367
  0x05235C $834C: C-----  61 58    ADC  ($58,X)
  0x05235E $834E: C-----  AC DF FF LDY  $FFDF
  0x052361 $8351: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052362 $8352: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052363 $8353: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052364 $8354: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052365 $8355: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x052366 $8356: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x052367 $8357: C-----  21 00    AND  ($00,X)
  0x052369 $8359: C-----  00       BRK  
  0x05236A $835A: C-----  00       BRK  
  0x05236B $835B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05236C $835C: C-----  C0 E0    CPY  #$E0
  0x05236E $835E: C-----  70 38    BVS  $8398
  0x052370 $8360: C-----  E0 F0    CPX  #$F0
  0x052372 $8362: C-----  E0 EC    CPX  #$EC
  0x052374 $8364: C-----  FE FF FF INC  $FFFF,X
  0x052377 $8367: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052378 $8368: C-----  E4 72    CPX  $72
  0x05237A $836A: C-----  31 1C    AND  ($1C),Y
  0x05237C $836C: C-----  1E 07 03 ASL  $0307,X
  0x05237F $836F: C-----  01 05    ORA  ($05,X)
  0x052381 $8371: C-----  09 04    ORA  #$04
  0x052383 $8373: C-----  20 00 00 JSR  $0000
  0x052386 $8376: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052387 $8377: C-----  C0 3A    CPY  #$3A
  0x052389 $8379: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x05238A $837A: C-----  4A       LSR  A
  0x05238B $837B: C-----  A5 50    LDA  $50
  0x05238D $837D: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x05238E $837E: C-----  91 C8    STA  ($C8),Y
  0x052390 $8380: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052391 $8381: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052392 $8382: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052393 $8383: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052394 $8384: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052395 $8385: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x052396 $8386: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x052397 $8387: C-----  21 00    AND  ($00,X)
  0x052399 $8389: C-----  00       BRK  
  0x05239A $838A: C-----  00       BRK  
  0x05239B $838B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05239C $838C: C-----  C0 E0    CPY  #$E0
  0x05239E $838E: C-----  70 B8    BVS  $8348
  0x0523A0 $8390: C-----  01 14    ORA  ($14,X)
  0x0523A2 $8392: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0523A3 $8393: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0523A4 $8394: C-----  00       BRK  
  0x0523A5 $8395: C-----  01 80    ORA  ($80,X)
  0x0523A7 $8397: C-----  C0 38    CPY  #$38
  0x0523A9 $8399: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0523AA $839A: C-----  48       PHA  
  0x0523AB $839B: C-----  A5 53    LDA  $53
  0x0523AD $839D: C-----  20 90 C8 JSR  $C890
  0x0523B0 $83A0: C-----  90 48    BCC  $83EA
  0x0523B2 $83A2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0523B3 $83A3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0523B4 $83A4: C-----  !!UNDEF $89  ; unknown opcode, treating as data
  0x0523B5 $83A5: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0523B6 $83A6: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0523B7 $83A7: C-----  !!UNDEF $B3  ; unknown opcode, treating as data
  0x0523B8 $83A8: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x0523B9 $83A9: C-----  4E 27 63 LSR  $6327
  0x0523BC $83AC: C-----  D1 B4    CMP  ($B4),Y
  0x0523BE $83AE: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x0523BF $83AF: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x0523C0 $83B0: C-----  C0 E4    CPY  #$E4
  0x0523C2 $83B2: C-----  C8       INY  
  0x0523C3 $83B3: C-----  90 20    BCC  $83D5
  0x0523C5 $83B5: C-----  91 4A    STA  ($4A),Y
  0x0523C7 $83B7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0523C8 $83B8: C-----  06 0C    ASL  $0C
  0x0523CA $83BA: C-----  18       CLC  
  0x0523CB $83BB: C-----  38       SEC  
  0x0523CC $83BC: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0523CD $83BD: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0523CE $83BE: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0523CF $83BF: C-----  46 60    LSR  $60
  0x0523D1 $83C1: C-----  F0 F8    BEQ  $83BB
  0x0523D3 $83C3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0523D4 $83C4: C-----  F8       SED  
  0x0523D5 $83C5: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0523D6 $83C6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0523D7 $83C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0523D8 $83C8: C-----  E4 F2    CPX  $F2
  0x0523DA $83CA: C-----  39 1C 0C AND  $0C1C,Y
  0x0523DD $83CD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0523DE $83CE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0523DF $83CF: C-----  01 01    ORA  ($01,X)
  0x0523E1 $83D1: C-----  10 04    BPL  $83D7
  0x0523E3 $83D3: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0523E4 $83D4: C-----  00       BRK  
  0x0523E5 $83D5: C-----  01 80    ORA  ($80,X)
  0x0523E7 $83D7: C-----  00       BRK  
  0x0523E8 $83D8: C-----  30 0B    BMI  $83E5
  0x0523EA $83DA: C-----  48       PHA  
  0x0523EB $83DB: C-----  A5 53    LDA  $53
  0x0523ED $83DD: C-----  20 90 88 JSR  $8890
  0x0523F0 $83E0: C-----  90 88    BCC  $836A
  0x0523F2 $83E2: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x0523F3 $83E3: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0523F4 $83E4: C-----  A9 60    LDA  #$60
  0x0523F6 $83E6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0523F7 $83E7: C-----  60       RTS  
  0x0523F8 $83E8: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0523F9 $83E9: C-----  8E 67 B3 STX  $B367
  0x0523FC $83EC: C-----  A9 6C    LDA  #$6C
  0x0523FE $83EE: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x0523FF $83EF: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x052400 $83F0: C-----  10 08    BPL  $83FA
  0x052402 $83F2: C-----  24 C2    BIT  $C2
  0x052404 $83F4: C-----  51 C4    EOR  ($C4),Y
  0x052406 $83F6: C-----  4A       LSR  A
  0x052407 $83F7: C-----  24 1C    BIT  $1C
  0x052409 $83F9: C-----  4E E7 D3 LSR  $D3E7
  0x05240C $83FC: C-----  F1 DC    SBC  ($DC),Y
  0x05240E $83FE: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x05240F $83FF: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x052410 $8400: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x052411 $8401: ------  .byte $F5
  0x052412 $8402: ------  .byte $D0
  0x052413 $8403: ------  .byte $DB
  0x052414 $8404: ------  .byte $75
  0x052415 $8405: ------  .byte $BF
  0x052416 $8406: ------  .byte $FF
  0x052417 $8407: ------  .byte $E7
  0x052418 $8408: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052419 $8409: ------  .byte $0F
  0x05241A $840A: ------  .byte $2F
  0x05241B $840B: ------  .byte $3F
  0x05241C $840C: ------  .byte $BF
  0x05241D $840D: ------  .byte $7F
  0x05241E $840E: ------  .byte $FF
  0x05241F $840F: ------  .byte $7F
  0x052420 $8410: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x052421 $8411: ------  .byte $77
  0x052422 $8412: ------  .byte $5B
  0x052423 $8413: ------  .byte $97
  0x052424 $8414: ------  .byte $E3
  0x052425 $8415: ------  .byte $DB
  0x052426 $8416: ------  .byte $FC
  0x052427 $8417: ------  .byte $FF
  0x052428 $8418: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x052429 $8419: ------  .byte $F8
  0x05242A $841A: ------  .byte $FC
  0x05242B $841B: ------  .byte $F8
  0x05242C $841C: ------  .byte $FC
  0x05242D $841D: ------  .byte $FC
  0x05242E $841E: ------  .byte $FF
  0x05242F $841F: ------  .byte $FE
  0x052430 $8420: C-----  6A       ROR  A
  0x052431 $8421: C-----  FD 56 B5 SBC  $B556,X
  0x052434 $8424: C-----  !!UNDEF $5A  ; unknown opcode, treating as data
  0x052435 $8425: C-----  A0 00    LDY  #$00
  0x052437 $8427: C-----  00       BRK  
  0x052438 $8428: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x052439 $8429: C-----  00       BRK  
  0x05243A $842A: C-----  A9 42    LDA  #$42
  0x05243C $842C: C-----  85 1B    STA  $1B
  0x05243E $842E: C-----  95 00    STA  $00,X
  0x052440 $8430: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x052441 $8431: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x052442 $8432: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x052443 $8433: C-----  7E 00 60 ROR  $6000,X
  0x052446 $8436: C-----  84 00    STY  $00
  0x052448 $8438: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x052449 $8439: C-----  7E 7E 7E ROR  $7E7E,X
  0x05244C $843C: C-----  00       BRK  
  0x05244D $843D: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x05244E $843E: C-----  58       CLI  
  0x05244F $843F: C-----  00       BRK  
  0x052450 $8440: C-----  20 00 00 JSR  $0000
  0x052453 $8443: C-----  00       BRK  
  0x052454 $8444: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052455 $8445: C-----  7E 7F FF ROR  $FF7F,X
  0x052458 $8448: C-----  70 00    BVS  $844A
  0x05245A $844A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05245B $844B: C-----  00       BRK  
  0x05245C $844C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05245D $844D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05245E $844E: C-----  C0 00    CPY  #$00
  0x052460 $8450: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052461 $8451: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052462 $8452: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052463 $8453: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052464 $8454: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052465 $8455: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052466 $8456: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052467 $8457: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052468 $8458: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052469 $8459: C-----  00       BRK  
  0x05246A $845A: C-----  00       BRK  
  0x05246B $845B: C-----  00       BRK  
  0x05246C $845C: C-----  00       BRK  
  0x05246D $845D: C-----  00       BRK  
  0x05246E $845E: C-----  00       BRK  
  0x05246F $845F: C-----  00       BRK  
  0x052470 $8460: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x052471 $8461: C-----  AA       TAX  
  0x052472 $8462: C-----  75 B9    ADC  $B9,X
  0x052474 $8464: C-----  56 85    LSR  $85,X
  0x052476 $8466: C-----  2A       ROL  A
  0x052477 $8467: C-----  00       BRK  
  0x052478 $8468: C-----  2D 14 0A AND  $0A14
  0x05247B $846B: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x05247C $846C: C-----  00       BRK  
  0x05247D $846D: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x05247E $846E: C-----  40       RTI  
  0x05247F $846F: C-----  00       BRK  
  0x052480 $8470: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x052481 $8471: C-----  01 02    ORA  ($02,X)
  0x052483 $8473: C-----  01 01    ORA  ($01,X)
  0x052485 $8475: C-----  00       BRK  
  0x052486 $8476: C-----  00       BRK  
  0x052487 $8477: C-----  00       BRK  
  0x052488 $8478: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x052489 $8479: C-----  0A       ASL  A
  0x05248A $847A: C-----  79 0A 7A ADC  $7A0A,Y
  0x05248D $847D: C-----  09 7B    ORA  #$7B
  0x05248F $847F: C-----  00       BRK  
  0x052490 $8480: ------  .byte $00
  0x052491 $8481: ------  .byte $00
  0x052492 $8482: ------  .byte $FF
  0x052493 $8483: ------  .byte $00
  0x052494 $8484: ------  .byte $EE
  0x052495 $8485: ------  .byte $75
  0x052496 $8486: ------  .byte $AA
  0x052497 $8487: ------  .byte $D7
  0x052498 $8488: ------  .byte $00
  0x052499 $8489: ------  .byte $FF
  0x05249A $848A: ------  .byte $FF
  0x05249B $848B: ------  .byte $00
  0x05249C $848C: ------  .byte $85
  0x05249D $848D: ------  .byte $2A
  0x05249E $848E: ------  .byte $9E
  0x05249F $848F: ------  .byte $2C
  0x0524A0 $8490: C-----  00       BRK  
  0x0524A1 $8491: C-----  00       BRK  
  0x0524A2 $8492: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0524A3 $8493: C-----  00       BRK  
  0x0524A4 $8494: C-----  18       CLC  
  0x0524A5 $8495: C-----  00       BRK  
  0x0524A6 $8496: C-----  00       BRK  
  0x0524A7 $8497: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0524A8 $8498: C-----  00       BRK  
  0x0524A9 $8499: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0524AA $849A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0524AB $849B: C-----  00       BRK  
  0x0524AC $849C: C-----  7E 42 42 ROR  $4242,X
  0x0524AF $849F: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0524B0 $84A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0524B1 $84A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0524B2 $84A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0524B3 $84A3: C-----  FE F9 F7 INC  $F7F9,X
  0x0524B6 $84A6: C-----  C5 E7    CMP  $E7
  0x0524B8 $84A8: C-----  00       BRK  
  0x0524B9 $84A9: C-----  00       BRK  
  0x0524BA $84AA: C-----  00       BRK  
  0x0524BB $84AB: C-----  01 07    ORA  ($07,X)
  0x0524BD $84AD: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0524BE $84AE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0524BF $84AF: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0524C0 $84B0: C-----  FD FD 53 SBC  $53FD,X
  0x0524C3 $84B3: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x0524C4 $84B4: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0524C5 $84B5: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x0524C6 $84B6: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0524C7 $84B7: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0524C8 $84B8: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0524C9 $84B9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0524CA $84BA: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x0524CB $84BB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0524CC $84BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0524CD $84BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0524CE $84BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0524CF $84BF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0524D0 $84C0: C-----  00       BRK  
  0x0524D1 $84C1: C-----  00       BRK  
  0x0524D2 $84C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0524D3 $84C3: C-----  00       BRK  
  0x0524D4 $84C4: C-----  EE 75 AA INC  $AA75
  0x0524D7 $84C7: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x0524D8 $84C8: C-----  00       BRK  
  0x0524D9 $84C9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0524DA $84CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0524DB $84CB: C-----  00       BRK  
  0x0524DC $84CC: C-----  85 2A    STA  $2A
  0x0524DE $84CE: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x0524DF $84CF: C-----  2C 00 00 BIT  $0000
  0x0524E2 $84D2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0524E3 $84D3: C-----  00       BRK  
  0x0524E4 $84D4: C-----  61 02    ADC  ($02,X)
  0x0524E6 $84D6: C-----  61 03    ADC  ($03,X)
  0x0524E8 $84D8: C-----  00       BRK  
  0x0524E9 $84D9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0524EA $84DA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0524EB $84DB: C-----  08       PHP  
  0x0524EC $84DC: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x0524ED $84DD: C-----  09 7B    ORA  #$7B
  0x0524EF $84DF: C-----  08       PHP  
  0x0524F0 $84E0: ------  .byte $E3
  0x0524F1 $84E1: ------  .byte $C0
  0x0524F2 $84E2: ------  .byte $81
  0x0524F3 $84E3: ------  .byte $FB
  0x0524F4 $84E4: ------  .byte $FB
  0x0524F5 $84E5: ------  .byte $FB
  0x0524F6 $84E6: ------  .byte $D7
  0x0524F7 $84E7: ------  .byte $DF
  0x0524F8 $84E8: ------  .byte $FF
  0x0524F9 $84E9: ------  .byte $FF
  0x0524FA $84EA: ------  .byte $7F
  0x0524FB $84EB: ------  .byte $FF
  0x0524FC $84EC: ------  .byte $7F
  0x0524FD $84ED: ------  .byte $7F
  0x0524FE $84EE: ------  .byte $3F
  0x0524FF $84EF: ------  .byte $2F
  0x052500 $84F0: ------  .byte $FC
  0x052501 $84F1: ------  .byte $3D
  0x052502 $84F2: ------  .byte $8D
  0x052503 $84F3: ------  .byte $C3
  0x052504 $84F4: ------  .byte $C1
  0x052505 $84F5: ------  .byte $B9
  0x052506 $84F6: ------  .byte $3C
  0x052507 $84F7: ------  .byte $F8
  0x052508 $84F8: ------  .byte $FF
  0x052509 $84F9: ------  .byte $FE
  0x05250A $84FA: ------  .byte $FE
  0x05250B $84FB: ------  .byte $FC
  0x05250C $84FC: ------  .byte $FE
  0x05250D $84FD: ------  .byte $FE
  0x05250E $84FE: ------  .byte $FF
  0x05250F $84FF: ------  .byte $FF
  0x052510 $8500: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x052511 $8501: ------  .byte $F7
  0x052512 $8502: ------  .byte $FF
  0x052513 $8503: ------  .byte $F7
  0x052514 $8504: C-----  FD FD FF SBC  $FFFD,X
  0x052517 $8507: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052518 $8508: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052519 $8509: ------  .byte $0F
  0x05251A $850A: ------  .byte $07
  0x05251B $850B: ------  .byte $0F
  0x05251C $850C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05251D $850D: C-----  06 01    ASL  $01
  0x05251F $850F: C-----  00       BRK  
  0x052520 $8510: C-----  CA       DEX  
  0x052521 $8511: C-----  3E EB 62 ROL  $62EB,X
  0x052524 $8514: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052525 $8515: C-----  2A       ROL  A
  0x052526 $8516: C-----  0E FA D1 ASL  $D1FA
  0x052529 $8519: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x05252A $851A: C-----  94 2C    STY  $2C,X
  0x05252C $851C: C-----  40       RTI  
  0x05252D $851D: C-----  C0 F1    CPY  #$F1
  0x05252F $851F: C-----  24 1A    BIT  $1A
  0x052531 $8521: C-----  0D 87 21 ORA  $2187
  0x052534 $8524: C-----  40       RTI  
  0x052535 $8525: C-----  00       BRK  
  0x052536 $8526: C-----  00       BRK  
  0x052537 $8527: C-----  00       BRK  
  0x052538 $8528: C-----  85 C8    STA  $C8
  0x05253A $852A: C-----  E0 72    CPX  #$72
  0x05253C $852C: C-----  C9 94    CMP  #$94
  0x05253E $852E: C-----  26 89    ROL  $89
  0x052540 $8530: C-----  09 12    ORA  #$12
  0x052542 $8532: C-----  20 49 88 JSR  $8849
  0x052545 $8535: C-----  0A       ASL  A
  0x052546 $8536: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x052547 $8537: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x052548 $8538: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x052549 $8539: C-----  76 E5    ROR  $E5,X
  0x05254B $853B: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x05254C $853C: C-----  90 4E    BCC  $858C
  0x05254E $853E: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x05254F $853F: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x052550 $8540: C-----  09 11    ORA  #$11
  0x052552 $8542: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x052553 $8543: C-----  41 90    EOR  ($90,X)
  0x052555 $8545: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x052556 $8546: C-----  29 50    AND  #$50
  0x052558 $8548: C-----  39 71 E3 AND  $E371,Y
  0x05255B $854B: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x05255C $854C: C-----  95 2A    STA  $2A,X
  0x05255E $854E: C-----  6D 53 FF ADC  $FF53
  0x052561 $8551: C-----  FE FC F8 INC  $F8FC,X
  0x052564 $8554: C-----  F0 E1    BEQ  $8537
  0x052566 $8556: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x052567 $8557: C-----  84 00    STY  $00
  0x052569 $8559: C-----  00       BRK  
  0x05256A $855A: C-----  00       BRK  
  0x05256B $855B: C-----  01 03    ORA  ($03,X)
  0x05256D $855D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05256E $855E: C-----  0E 1C 07 ASL  $071C
  0x052571 $8561: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052572 $8562: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052573 $8563: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052574 $8564: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x052575 $8565: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052576 $8566: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052577 $8567: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052578 $8568: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x052579 $8569: C-----  4E 9C 18 LSR  $189C
  0x05257C $856C: C-----  78       SEI  
  0x05257D $856D: C-----  E0 C0    CPX  #$C0
  0x05257F $856F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052580 $8570: C-----  C0 00    CPY  #$00
  0x052582 $8572: C-----  A0 40    LDY  #$40
  0x052584 $8574: C-----  00       BRK  
  0x052585 $8575: C-----  10 01    BPL  $8578
  0x052587 $8577: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052588 $8578: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x052589 $8579: C-----  A4 50    LDY  $50
  0x05258B $857B: C-----  A1 CA    LDA  ($CA,X)
  0x05258D $857D: C-----  94 29    STY  $29,X
  0x05258F $857F: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x052590 $8580: ------  .byte $FF
  0x052591 $8581: ------  .byte $FE
  0x052592 $8582: ------  .byte $FC
  0x052593 $8583: ------  .byte $F8
  0x052594 $8584: ------  .byte $F0
  0x052595 $8585: ------  .byte $E1
  0x052596 $8586: ------  .byte $C2
  0x052597 $8587: ------  .byte $84
  0x052598 $8588: ------  .byte $00
  0x052599 $8589: ------  .byte $00
  0x05259A $858A: ------  .byte $00
  0x05259B $858B: ------  .byte $01
  0x05259C $858C: ------  .byte $03
  0x05259D $858D: ------  .byte $07
  0x05259E $858E: ------  .byte $0E
  0x05259F $858F: ------  .byte $1D
  0x0525A0 $8590: C-----  84 10    STY  $10
  0x0525A2 $8592: C-----  60       RTS  
  0x0525A3 $8593: C-----  00       BRK  
  0x0525A4 $8594: C-----  40       RTI  
  0x0525A5 $8595: C-----  10 01    BPL  $8598
  0x0525A7 $8597: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0525A8 $8598: C-----  58       CLI  
  0x0525A9 $8599: C-----  48       PHA  
  0x0525AA $859A: C-----  10 E1    BPL  $857D
  0x0525AC $859C: C-----  8A       TXA  
  0x0525AD $859D: C-----  94 29    STY  $29,X
  0x0525AF $859F: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0525B0 $85A0: C-----  09 11    ORA  #$11
  0x0525B2 $85A2: C-----  26 4E    ROL  $4E
  0x0525B4 $85A4: C-----  85 05    STA  $05
  0x0525B6 $85A6: C-----  40       RTI  
  0x0525B7 $85A7: C-----  !!UNDEF $89  ; unknown opcode, treating as data
  0x0525B8 $85A8: C-----  38       SEC  
  0x0525B9 $85A9: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x0525BA $85AA: C-----  E4 C2    CPX  $C2
  0x0525BC $85AC: C-----  8E 37 5B STX  $5B37
  0x0525BF $85AF: C-----  8C 04 02 STY  $0204
  0x0525C2 $85B2: C-----  41 22    EOR  ($22,X)
  0x0525C4 $85B4: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0525C5 $85B5: C-----  48       PHA  
  0x0525C6 $85B6: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x0525C7 $85B7: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x0525C8 $85B8: C-----  06 87    ASL  $87
  0x0525CA $85BA: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x0525CB $85BB: C-----  7E 3C 18 ROR  $183C,X
  0x0525CE $85BE: C-----  01 02    ORA  ($02,X)
  0x0525D0 $85C0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0525D1 $85C1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0525D2 $85C2: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0525D3 $85C3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0525D4 $85C4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0525D5 $85C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0525D6 $85C6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0525D7 $85C7: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0525D8 $85C8: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x0525D9 $85C9: C-----  46 9E    LSR  $9E
  0x0525DB $85CB: C-----  38       SEC  
  0x0525DC $85CC: C-----  70 E0    BVS  $85AE
  0x0525DE $85CE: C-----  C0 C0    CPY  #$C0
  0x0525E0 $85D0: C-----  84 10    STY  $10
  0x0525E2 $85D2: C-----  20 00 40 JSR  $4000
  0x0525E5 $85D5: C-----  10 00    BPL  $85D7
  0x0525E7 $85D7: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0525E8 $85D8: C-----  58       CLI  
  0x0525E9 $85D9: C-----  48       PHA  
  0x0525EA $85DA: C-----  10 61    BPL  $863D
  0x0525EC $85DC: C-----  8A       TXA  
  0x0525ED $85DD: C-----  94 28    STY  $28,X
  0x0525EF $85DF: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0525F0 $85E0: ------  .byte $08
  0x0525F1 $85E1: ------  .byte $10
  0x0525F2 $85E2: ------  .byte $22
  0x0525F3 $85E3: ------  .byte $48
  0x0525F4 $85E4: ------  .byte $90
  0x0525F5 $85E5: ------  .byte $2D
  0x0525F6 $85E6: ------  .byte $25
  0x0525F7 $85E7: ------  .byte $C8
  0x0525F8 $85E8: ------  .byte $39
  0x0525F9 $85E9: ------  .byte $71
  0x0525FA $85EA: ------  .byte $E6
  0x0525FB $85EB: ------  .byte $CF
  0x0525FC $85EC: ------  .byte $92
  0x0525FD $85ED: ------  .byte $3D
  0x0525FE $85EE: ------  .byte $27
  0x0525FF $85EF: ------  .byte $5A
  0x052600 $85F0: C-----  08       PHP  
  0x052601 $85F1: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x052602 $85F2: C-----  25 42    AND  $42
  0x052604 $85F4: C-----  88       DEY  
  0x052605 $85F5: C-----  21 1E    AND  ($1E,X)
  0x052607 $85F7: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x052608 $85F8: C-----  39 73 E5 AND  $E573,Y
  0x05260B $85FB: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x05260C $85FC: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x05260D $85FD: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x05260E $85FE: C-----  7E 3D C5 ROR  $C53D,X
  0x052611 $8601: ------  .byte $F6
  0x052612 $8602: ------  .byte $F1
  0x052613 $8603: ------  .byte $FD
  0x052614 $8604: ------  .byte $FF
  0x052615 $8605: ------  .byte $FF
  0x052616 $8606: ------  .byte $FF
  0x052617 $8607: ------  .byte $FF
  0x052618 $8608: ------  .byte $3F
  0x052619 $8609: ------  .byte $0F
  0x05261A $860A: ------  .byte $0F
  0x05261B $860B: ------  .byte $02
  0x05261C $860C: ------  .byte $00
  0x05261D $860D: ------  .byte $00
  0x05261E $860E: ------  .byte $00
  0x05261F $860F: ------  .byte $00
  0x052620 $8610: ------  .byte $DF
  0x052621 $8611: ------  .byte $97
  0x052622 $8612: ------  .byte $CF
  0x052623 $8613: ------  .byte $16
  0x052624 $8614: ------  .byte $7E
  0x052625 $8615: ------  .byte $CF
  0x052626 $8616: ------  .byte $FB
  0x052627 $8617: ------  .byte $F7
  0x052628 $8618: ------  .byte $FF
  0x052629 $8619: ------  .byte $FF
  0x05262A $861A: ------  .byte $FF
  0x05262B $861B: ------  .byte $FF
  0x05262C $861C: ------  .byte $9F
  0x05262D $861D: ------  .byte $3F
  0x05262E $861E: ------  .byte $07
  0x05262F $861F: ------  .byte $0A
  0x052630 $8620: C-----  50 A8    BVC  $85CA
  0x052632 $8622: C-----  70 C8    BVS  $85EC
  0x052634 $8624: C-----  78       SEI  
  0x052635 $8625: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x052636 $8626: C-----  E8       INX  
  0x052637 $8627: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x052638 $8628: C-----  AE 94 0A LDX  $0A94
  0x05263B $862B: C-----  A4 06    LDY  $06
  0x05263D $862D: C-----  20 90 AA JSR  $AA90
  0x052640 $8630: C-----  00       BRK  
  0x052641 $8631: C-----  F0 12    BEQ  $8645
  0x052643 $8633: C-----  10 10    BPL  $8645
  0x052645 $8635: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x052646 $8636: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x052647 $8637: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x052648 $8638: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x052649 $8639: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x05264A $863A: C-----  70 72    BVS  $86AE
  0x05264C $863C: C-----  76 70    ROR  $70,X
  0x05264E $863E: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x05264F $863F: C-----  00       BRK  
  0x052650 $8640: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x052651 $8641: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052652 $8642: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052653 $8643: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052654 $8644: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052655 $8645: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x052656 $8646: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052657 $8647: C-----  01 2C    ORA  ($2C,X)
  0x052659 $8649: C-----  2C 2C 2C BIT  $2C2C
  0x05265C $864C: C-----  AC AC AE LDY  $AEAC
  0x05265F $864F: C-----  26 FF    ROL  $FF
  0x052661 $8651: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052662 $8652: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052663 $8653: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052664 $8654: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052665 $8655: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052666 $8656: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052667 $8657: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052668 $8658: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052669 $8659: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05266A $865A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05266B $865B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05266C $865C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05266D $865D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05266E $865E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05266F $865F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052670 $8660: C-----  B4 CA    LDY  $CA,X
  0x052672 $8662: C-----  AC 52 B8 LDY  $B852
  0x052675 $8665: C-----  !!UNDEF $72  ; unknown opcode, treating as data
  0x052676 $8666: C-----  A8       TAY  
  0x052677 $8667: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x052678 $8668: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052679 $8669: C-----  24 D0    BIT  $D0
  0x05267B $866B: C-----  A0 44    LDY  #$44
  0x05267D $866D: C-----  84 12    STY  $12
  0x05267F $866F: C-----  00       BRK  
  0x052680 $8670: C-----  D8       CLD  
  0x052681 $8671: C-----  A0 00    LDY  #$00
  0x052683 $8673: C-----  00       BRK  
  0x052684 $8674: C-----  00       BRK  
  0x052685 $8675: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052686 $8676: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052687 $8677: C-----  00       BRK  
  0x052688 $8678: C-----  26 DA    ROL  $DA
  0x05268A $867A: C-----  00       BRK  
  0x05268B $867B: C-----  FE AA AA INC  $AAAA,X
  0x05268E $867E: C-----  AA       TAX  
  0x05268F $867F: C-----  00       BRK  
  0x052690 $8680: C-----  25 2B    AND  $2B
  0x052692 $8682: C-----  2D 2A 25 AND  $252A
  0x052695 $8685: C-----  2E 2D 2B ROL  $2B2D
  0x052698 $8688: C-----  68       PLA  
  0x052699 $8689: C-----  66 6B    ROR  $6B
  0x05269B $868B: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x05269C $868C: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x05269D $868D: C-----  65 60    ADC  $60
  0x05269F $868F: C-----  6A       ROR  A
  0x0526A0 $8690: C-----  20 21 20 JSR  $2021
  0x0526A3 $8693: C-----  28       PLP  
  0x0526A4 $8694: C-----  28       PLP  
  0x0526A5 $8695: C-----  20 21 20 JSR  $2021
  0x0526A8 $8698: C-----  60       RTS  
  0x0526A9 $8699: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x0526AA $869A: C-----  68       PLA  
  0x0526AB $869B: C-----  68       PLA  
  0x0526AC $869C: C-----  68       PLA  
  0x0526AD $869D: C-----  68       PLA  
  0x0526AE $869E: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x0526AF $869F: C-----  60       RTS  
  0x0526B0 $86A0: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0526B1 $86A1: C-----  10 E2    BPL  $8685
  0x0526B3 $86A3: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x0526B4 $86A4: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x0526B5 $86A5: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x0526B6 $86A6: C-----  99 BD 83 STA  $83BD,Y
  0x0526B9 $86A9: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0526BA $86AA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0526BB $86AB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0526BC $86AC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0526BD $86AD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0526BE $86AE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0526BF $86AF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0526C0 $86B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0526C1 $86B1: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0526C2 $86B2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0526C3 $86B3: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0526C4 $86B4: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x0526C5 $86B5: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x0526C6 $86B6: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x0526C7 $86B7: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x0526C8 $86B8: C-----  00       BRK  
  0x0526C9 $86B9: C-----  C0 80    CPY  #$80
  0x0526CB $86BB: C-----  E0 E8    CPX  #$E8
  0x0526CD $86BD: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0526CE $86BE: C-----  F8       SED  
  0x0526CF $86BF: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0526D0 $86C0: ------  .byte $00
  0x0526D1 $86C1: ------  .byte $7E
  0x0526D2 $86C2: ------  .byte $42
  0x0526D3 $86C3: ------  .byte $42
  0x0526D4 $86C4: ------  .byte $42
  0x0526D5 $86C5: ------  .byte $42
  0x0526D6 $86C6: ------  .byte $7E
  0x0526D7 $86C7: ------  .byte $00
  0x0526D8 $86C8: ------  .byte $00
  0x0526D9 $86C9: ------  .byte $00
  0x0526DA $86CA: ------  .byte $00
  0x0526DB $86CB: ------  .byte $00
  0x0526DC $86CC: ------  .byte $00
  0x0526DD $86CD: ------  .byte $00
  0x0526DE $86CE: ------  .byte $00
  0x0526DF $86CF: ------  .byte $00
  0x0526E0 $86D0: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x0526E1 $86D1: C-----  25 20    AND  $20
  0x0526E3 $86D3: C-----  20 20 2A JSR  $2A20
  0x0526E6 $86D6: C-----  2A       ROL  A
  0x0526E7 $86D7: C-----  20 6E 6A JSR  $6A6E
  0x0526EA $86DA: C-----  60       RTS  
  0x0526EB $86DB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0526EC $86DC: C-----  6A       ROR  A
  0x0526ED $86DD: C-----  6A       ROR  A
  0x0526EE $86DE: C-----  6A       ROR  A
  0x0526EF $86DF: C-----  60       RTS  
  0x0526F0 $86E0: ------  .byte $BF
  0x0526F1 $86E1: ------  .byte $9F
  0x0526F2 $86E2: ------  .byte $03
  0x0526F3 $86E3: ------  .byte $1D
  0x0526F4 $86E4: ------  .byte $1F
  0x0526F5 $86E5: ------  .byte $9C
  0x0526F6 $86E6: ------  .byte $DF
  0x0526F7 $86E7: ------  .byte $FF
  0x0526F8 $86E8: ------  .byte $FF
  0x0526F9 $86E9: ------  .byte $FF
  0x0526FA $86EA: ------  .byte $FF
  0x0526FB $86EB: ------  .byte $FF
  0x0526FC $86EC: ------  .byte $FE
  0x0526FD $86ED: ------  .byte $FF
  0x0526FE $86EE: ------  .byte $FC
  0x0526FF $86EF: ------  .byte $D0
  0x052700 $86F0: ------  .byte $FF
  0x052701 $86F1: ------  .byte $F3
  0x052702 $86F2: ------  .byte $FF
  0x052703 $86F3: ------  .byte $AF
  0x052704 $86F4: ------  .byte $7F
  0x052705 $86F5: ------  .byte $FF
  0x052706 $86F6: ------  .byte $FF
  0x052707 $86F7: ------  .byte $FF
  0x052708 $86F8: ------  .byte $FA
  0x052709 $86F9: ------  .byte $FC
  0x05270A $86FA: ------  .byte $F4
  0x05270B $86FB: ------  .byte $D0
  0x05270C $86FC: ------  .byte $80
  0x05270D $86FD: ------  .byte $00
  0x05270E $86FE: ------  .byte $00
  0x05270F $86FF: ------  .byte $00
  0x052710 $8700: ------  .byte $F9
  0x052711 $8701: ------  .byte $15
  0x052712 $8702: ------  .byte $C7
  0x052713 $8703: ------  .byte $DF
  0x052714 $8704: ------  .byte $8F
  0x052715 $8705: ------  .byte $5F
  0x052716 $8706: ------  .byte $FF
  0x052717 $8707: ------  .byte $FF
  0x052718 $8708: ------  .byte $FE
  0x052719 $8709: ------  .byte $FA
  0x05271A $870A: ------  .byte $F8
  0x05271B $870B: ------  .byte $E0
  0x05271C $870C: ------  .byte $F0
  0x05271D $870D: ------  .byte $A0
  0x05271E $870E: ------  .byte $00
  0x05271F $870F: ------  .byte $00
  0x052720 $8710: C-----  28       PLP  
  0x052721 $8711: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052722 $8712: C-----  4A       LSR  A
  0x052723 $8713: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x052724 $8714: C-----  49 7D    EOR  #$7D
  0x052726 $8716: C-----  B9 A1 82 LDA  $82A1,Y
  0x052729 $8719: C-----  40       RTI  
  0x05272A $871A: C-----  31 10    AND  ($10),Y
  0x05272C $871C: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x05272D $871D: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x05272E $871E: C-----  8E A6 70 STX  $70A6
  0x052731 $8721: C-----  A0 60    LDY  #$60
  0x052733 $8723: C-----  C0 80    CPY  #$80
  0x052735 $8725: C-----  10 08    BPL  $872F
  0x052737 $8727: C-----  20 89 12 JSR  $1289
  0x05273A $872A: C-----  86 49    STX  $49
  0x05273C $872C: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x05273D $872D: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x05273E $872E: C-----  78       SEI  
  0x05273F $872F: C-----  ED 90 45 SBC  $4590
  0x052742 $8732: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x052743 $8733: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x052744 $8734: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x052745 $8735: C-----  20 11 08 JSR  $0811
  0x052748 $8738: C-----  !!UNDEF $B2  ; unknown opcode, treating as data
  0x052749 $8739: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x05274A $873A: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x05274B $873B: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x05274C $873C: C-----  C9 E3    CMP  #$E3
  0x05274E $873E: C-----  75 39    ADC  $39,X
  0x052750 $8740: C-----  !!UNDEF $D2  ; unknown opcode, treating as data
  0x052751 $8741: C-----  24 00    BIT  $00
  0x052753 $8743: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x052754 $8744: C-----  49 22    EOR  #$22
  0x052756 $8746: C-----  11 08    ORA  ($08),Y
  0x052758 $8748: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x052759 $8749: C-----  35 1A    AND  $1A,X
  0x05275B $874B: C-----  86 C9    STX  $C9
  0x05275D $874D: C-----  E6 73    INC  $73
  0x05275F $874F: C-----  38       SEC  
  0x052760 $8750: C-----  84 C2    STY  $C2
  0x052762 $8752: C-----  E1 F0    SBC  ($F0,X)
  0x052764 $8754: C-----  F8       SED  
  0x052765 $8755: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x052766 $8756: C-----  FE FF 1C INC  $1CFF,X
  0x052769 $8759: C-----  0E 07 03 ASL  $0307
  0x05276C $875C: C-----  01 00    ORA  ($00,X)
  0x05276E $875E: C-----  00       BRK  
  0x05276F $875F: C-----  00       BRK  
  0x052770 $8760: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052771 $8761: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052772 $8762: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052773 $8763: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052774 $8764: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x052775 $8765: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x052776 $8766: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052777 $8767: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x052778 $8768: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052779 $8769: C-----  C0 E0    CPY  #$E0
  0x05277B $876B: C-----  78       SEI  
  0x05277C $876C: C-----  38       SEC  
  0x05277D $876D: C-----  8C 4E 27 STY  $274E
  0x052780 $8770: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052781 $8771: C-----  01 00    ORA  ($00,X)
  0x052783 $8773: C-----  00       BRK  
  0x052784 $8774: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x052785 $8775: C-----  20 90 A0 JSR  $A090
  0x052788 $8778: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x052789 $8779: C-----  !!UNDEF $89  ; unknown opcode, treating as data
  0x05278A $877A: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x05278B $877B: C-----  0A       ASL  A
  0x05278C $877C: C-----  A5 52    LDA  $52
  0x05278E $877E: C-----  28       PLP  
  0x05278F $877F: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x052790 $8780: C-----  84 C2    STY  $C2
  0x052792 $8782: C-----  E1 F0    SBC  ($F0,X)
  0x052794 $8784: C-----  F8       SED  
  0x052795 $8785: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x052796 $8786: C-----  FE FF 1D INC  $1DFF,X
  0x052799 $8789: C-----  0E 07 03 ASL  $0307
  0x05279C $878C: C-----  01 00    ORA  ($00,X)
  0x05279E $878E: C-----  00       BRK  
  0x05279F $878F: C-----  00       BRK  
  0x0527A0 $8790: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0527A1 $8791: C-----  01 80    ORA  ($80,X)
  0x0527A3 $8793: C-----  00       BRK  
  0x0527A4 $8794: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0527A5 $8795: C-----  20 28 80 JSR  $8028
  0x0527A8 $8798: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0527A9 $8799: C-----  09 04    ORA  #$04
  0x0527AB $879B: C-----  CA       DEX  
  0x0527AC $879C: C-----  A5 12    LDA  $12
  0x0527AE $879E: C-----  D0 1C    BNE  $87BC
  0x0527B0 $87A0: C-----  CD 30 3C CMP  $3C30
  0x0527B3 $87A3: C-----  91 40    STA  ($40),Y
  0x0527B5 $87A5: C-----  20 12 09 JSR  $0912
  0x0527B8 $87A8: C-----  46 5E    LSR  $5E
  0x0527BA $87AA: C-----  2D 8B C6 AND  $C68B
  0x0527BD $87AD: C-----  E4 72    CPX  $72
  0x0527BF $87AF: C-----  39 20 52 AND  $5220,Y
  0x0527C2 $87B2: C-----  !!UNDEF $89  ; unknown opcode, treating as data
  0x0527C3 $87B3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0527C4 $87B4: C-----  09 13    ORA  #$13
  0x0527C6 $87B6: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x0527C7 $87B7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0527C8 $87B8: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x0527C9 $87B9: C-----  F1 F8    SBC  ($F8),Y
  0x0527CB $87BB: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0527CC $87BC: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0527CD $87BD: C-----  18       CLC  
  0x0527CE $87BE: C-----  30 60    BMI  $8820
  0x0527D0 $87C0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0527D1 $87C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0527D2 $87C2: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0527D3 $87C3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0527D4 $87C4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0527D5 $87C5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0527D6 $87C6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0527D7 $87C7: C-----  06 80    ASL  $80
  0x0527D9 $87C9: C-----  E0 E0    CPX  #$E0
  0x0527DB $87CB: C-----  30 38    BMI  $8805
  0x0527DD $87CD: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x0527DE $87CE: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x0527DF $87CF: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x0527E0 $87D0: C-----  00       BRK  
  0x0527E1 $87D1: C-----  01 80    ORA  ($80,X)
  0x0527E3 $87D3: C-----  00       BRK  
  0x0527E4 $87D4: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0527E5 $87D5: C-----  20 08 80 JSR  $8008
  0x0527E8 $87D8: C-----  11 09    ORA  ($09),Y
  0x0527EA $87DA: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0527EB $87DB: C-----  CA       DEX  
  0x0527EC $87DC: C-----  A5 12    LDA  $12
  0x0527EE $87DE: C-----  D0 0C    BNE  $87EC
  0x0527F0 $87E0: ------  .byte $06
  0x0527F1 $87E1: ------  .byte $20
  0x0527F2 $87E2: ------  .byte $06
  0x0527F3 $87E3: ------  .byte $95
  0x0527F4 $87E4: ------  .byte $48
  0x0527F5 $87E5: ------  .byte $26
  0x0527F6 $87E6: ------  .byte $11
  0x0527F7 $87E7: ------  .byte $09
  0x0527F8 $87E8: ------  .byte $D6
  0x0527F9 $87E9: ------  .byte $3B
  0x0527FA $87EA: ------  .byte $36
  0x0527FB $87EB: ------  .byte $95
  0x0527FC $87EC: ------  .byte $CD
  0x0527FD $87ED: ------  .byte $E6
  0x0527FE $87EE: ------  .byte $71
  0x0527FF $87EF: ------  .byte $38
  0x052800 $87F0: C-----  24 52    BIT  $52
  0x052802 $87F2: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x052803 $87F3: C-----  8A       TXA  
  0x052804 $87F4: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x052805 $87F5: C-----  24 10    BIT  $10
  0x052807 $87F7: C-----  08       PHP  
  0x052808 $87F8: C-----  FD 5E 3B SBC  $3B5E,X
  0x05280B $87FB: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x05280C $87FC: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x05280D $87FD: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x05280E $87FE: C-----  !!UNDEF $72  ; unknown opcode, treating as data
  0x05280F $87FF: C-----  38       SEC  
  0x052810 $8800: C-----  00       BRK  
  0x052811 $8801: C-----  00       BRK  
  0x052812 $8802: C-----  00       BRK  
  0x052813 $8803: C-----  00       BRK  
  0x052814 $8804: C-----  00       BRK  
  0x052815 $8805: C-----  00       BRK  
  0x052816 $8806: C-----  00       BRK  
  0x052817 $8807: C-----  00       BRK  
  0x052818 $8808: C-----  00       BRK  
  0x052819 $8809: C-----  00       BRK  
  0x05281A $880A: C-----  00       BRK  
  0x05281B $880B: C-----  00       BRK  
  0x05281C $880C: C-----  00       BRK  
  0x05281D $880D: C-----  00       BRK  
  0x05281E $880E: C-----  00       BRK  
  0x05281F $880F: C-----  00       BRK  
  0x052820 $8810: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052821 $8811: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052822 $8812: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052823 $8813: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052824 $8814: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052825 $8815: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052826 $8816: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052827 $8817: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052828 $8818: C-----  00       BRK  
  0x052829 $8819: C-----  00       BRK  
  0x05282A $881A: C-----  00       BRK  
  0x05282B $881B: C-----  00       BRK  
  0x05282C $881C: C-----  00       BRK  
  0x05282D $881D: C-----  00       BRK  
  0x05282E $881E: C-----  00       BRK  
  0x05282F $881F: C-----  00       BRK  
  0x052830 $8820: C-----  FE E0 00 INC  $00E0,X
  0x052833 $8823: C-----  00       BRK  
  0x052834 $8824: C-----  00       BRK  
  0x052835 $8825: C-----  00       BRK  
  0x052836 $8826: C-----  00       BRK  
  0x052837 $8827: C-----  00       BRK  
  0x052838 $8828: C-----  00       BRK  
  0x052839 $8829: C-----  00       BRK  
  0x05283A $882A: C-----  00       BRK  
  0x05283B $882B: C-----  00       BRK  
  0x05283C $882C: C-----  00       BRK  
  0x05283D $882D: C-----  00       BRK  
  0x05283E $882E: C-----  00       BRK  
  0x05283F $882F: C-----  00       BRK  
  0x052840 $8830: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052841 $8831: C-----  F8       SED  
  0x052842 $8832: C-----  F0 E0    BEQ  $8814
  0x052844 $8834: C-----  C0 C0    CPY  #$C0
  0x052846 $8836: C-----  C0 E0    CPY  #$E0
  0x052848 $8838: C-----  00       BRK  
  0x052849 $8839: C-----  00       BRK  
  0x05284A $883A: C-----  00       BRK  
  0x05284B $883B: C-----  00       BRK  
  0x05284C $883C: C-----  00       BRK  
  0x05284D $883D: C-----  00       BRK  
  0x05284E $883E: C-----  00       BRK  
  0x05284F $883F: C-----  00       BRK  
  0x052850 $8840: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052851 $8841: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052852 $8842: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052853 $8843: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052854 $8844: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052855 $8845: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052856 $8846: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052857 $8847: C-----  F0 00    BEQ  $8849
  0x052859 $8849: C-----  00       BRK  
  0x05285A $884A: C-----  00       BRK  
  0x05285B $884B: C-----  00       BRK  
  0x05285C $884C: C-----  00       BRK  
  0x05285D $884D: C-----  00       BRK  
  0x05285E $884E: C-----  00       BRK  
  0x05285F $884F: C-----  00       BRK  
  0x052860 $8850: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052861 $8851: C-----  FE F8 F0 INC  $F0F8,X
  0x052864 $8854: C-----  F0 E0    BEQ  $8836
  0x052866 $8856: C-----  C0 00    CPY  #$00
  0x052868 $8858: C-----  00       BRK  
  0x052869 $8859: C-----  00       BRK  
  0x05286A $885A: C-----  00       BRK  
  0x05286B $885B: C-----  00       BRK  
  0x05286C $885C: C-----  00       BRK  
  0x05286D $885D: C-----  00       BRK  
  0x05286E $885E: C-----  00       BRK  
  0x05286F $885F: C-----  00       BRK  
  0x052870 $8860: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052871 $8861: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052872 $8862: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052873 $8863: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052874 $8864: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052875 $8865: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052876 $8866: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052877 $8867: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052878 $8868: C-----  00       BRK  
  0x052879 $8869: C-----  00       BRK  
  0x05287A $886A: C-----  00       BRK  
  0x05287B $886B: C-----  00       BRK  
  0x05287C $886C: C-----  00       BRK  
  0x05287D $886D: C-----  00       BRK  
  0x05287E $886E: C-----  00       BRK  
  0x05287F $886F: C-----  00       BRK  
  0x052880 $8870: C-----  00       BRK  
  0x052881 $8871: C-----  00       BRK  
  0x052882 $8872: C-----  00       BRK  
  0x052883 $8873: C-----  01 C3    ORA  ($C3,X)
  0x052885 $8875: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052886 $8876: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052887 $8877: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052888 $8878: C-----  00       BRK  
  0x052889 $8879: C-----  00       BRK  
  0x05288A $887A: C-----  00       BRK  
  0x05288B $887B: C-----  00       BRK  
  0x05288C $887C: C-----  00       BRK  
  0x05288D $887D: C-----  00       BRK  
  0x05288E $887E: C-----  00       BRK  
  0x05288F $887F: C-----  00       BRK  
  0x052890 $8880: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052891 $8881: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x052892 $8882: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052893 $8883: C-----  01 01    ORA  ($01,X)
  0x052895 $8885: C-----  00       BRK  
  0x052896 $8886: C-----  00       BRK  
  0x052897 $8887: C-----  00       BRK  
  0x052898 $8888: C-----  00       BRK  
  0x052899 $8889: C-----  00       BRK  
  0x05289A $888A: C-----  00       BRK  
  0x05289B $888B: C-----  00       BRK  
  0x05289C $888C: C-----  00       BRK  
  0x05289D $888D: C-----  00       BRK  
  0x05289E $888E: C-----  00       BRK  
  0x05289F $888F: C-----  00       BRK  
  0x0528A0 $8890: C-----  C0 80    CPY  #$80
  0x0528A2 $8892: C-----  00       BRK  
  0x0528A3 $8893: C-----  00       BRK  
  0x0528A4 $8894: C-----  00       BRK  
  0x0528A5 $8895: C-----  00       BRK  
  0x0528A6 $8896: C-----  00       BRK  
  0x0528A7 $8897: C-----  01 00    ORA  ($00,X)
  0x0528A9 $8899: C-----  00       BRK  
  0x0528AA $889A: C-----  00       BRK  
  0x0528AB $889B: C-----  00       BRK  
  0x0528AC $889C: C-----  00       BRK  
  0x0528AD $889D: C-----  00       BRK  
  0x0528AE $889E: C-----  00       BRK  
  0x0528AF $889F: C-----  00       BRK  
  0x0528B0 $88A0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0528B1 $88A1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0528B2 $88A2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0528B3 $88A3: C-----  1E 0E 04 ASL  $040E,X
  0x0528B6 $88A6: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0528B7 $88A7: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0528B8 $88A8: C-----  00       BRK  
  0x0528B9 $88A9: C-----  00       BRK  
  0x0528BA $88AA: C-----  00       BRK  
  0x0528BB $88AB: C-----  00       BRK  
  0x0528BC $88AC: C-----  00       BRK  
  0x0528BD $88AD: C-----  00       BRK  
  0x0528BE $88AE: C-----  00       BRK  
  0x0528BF $88AF: C-----  00       BRK  
  0x0528C0 $88B0: C-----  01 03    ORA  ($03,X)
  0x0528C2 $88B2: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0528C3 $88B3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0528C4 $88B4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0528C5 $88B5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0528C6 $88B6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0528C7 $88B7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0528C8 $88B8: C-----  00       BRK  
  0x0528C9 $88B9: C-----  00       BRK  
  0x0528CA $88BA: C-----  00       BRK  
  0x0528CB $88BB: C-----  00       BRK  
  0x0528CC $88BC: C-----  00       BRK  
  0x0528CD $88BD: C-----  00       BRK  
  0x0528CE $88BE: C-----  00       BRK  
  0x0528CF $88BF: C-----  00       BRK  
  0x0528D0 $88C0: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0528D1 $88C1: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0528D2 $88C2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0528D3 $88C3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0528D4 $88C4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0528D5 $88C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0528D6 $88C6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0528D7 $88C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0528D8 $88C8: C-----  00       BRK  
  0x0528D9 $88C9: C-----  00       BRK  
  0x0528DA $88CA: C-----  00       BRK  
  0x0528DB $88CB: C-----  00       BRK  
  0x0528DC $88CC: C-----  00       BRK  
  0x0528DD $88CD: C-----  00       BRK  
  0x0528DE $88CE: C-----  00       BRK  
  0x0528DF $88CF: C-----  00       BRK  
  0x0528E0 $88D0: C-----  00       BRK  
  0x0528E1 $88D1: C-----  00       BRK  
  0x0528E2 $88D2: C-----  00       BRK  
  0x0528E3 $88D3: C-----  00       BRK  
  0x0528E4 $88D4: C-----  00       BRK  
  0x0528E5 $88D5: C-----  00       BRK  
  0x0528E6 $88D6: C-----  40       RTI  
  0x0528E7 $88D7: C-----  F0 00    BEQ  $88D9
  0x0528E9 $88D9: C-----  00       BRK  
  0x0528EA $88DA: C-----  00       BRK  
  0x0528EB $88DB: C-----  00       BRK  
  0x0528EC $88DC: C-----  00       BRK  
  0x0528ED $88DD: C-----  00       BRK  
  0x0528EE $88DE: C-----  00       BRK  
  0x0528EF $88DF: C-----  00       BRK  
  0x0528F0 $88E0: C-----  00       BRK  
  0x0528F1 $88E1: C-----  01 01    ORA  ($01,X)
  0x0528F3 $88E3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0528F4 $88E4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0528F5 $88E5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0528F6 $88E6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0528F7 $88E7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0528F8 $88E8: C-----  00       BRK  
  0x0528F9 $88E9: C-----  00       BRK  
  0x0528FA $88EA: C-----  00       BRK  
  0x0528FB $88EB: C-----  00       BRK  
  0x0528FC $88EC: C-----  00       BRK  
  0x0528FD $88ED: C-----  00       BRK  
  0x0528FE $88EE: C-----  00       BRK  
  0x0528FF $88EF: C-----  00       BRK  
  0x052900 $88F0: C-----  F8       SED  
  0x052901 $88F1: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x052902 $88F2: C-----  FE FF FF INC  $FFFF,X
  0x052905 $88F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052906 $88F6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052907 $88F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052908 $88F8: C-----  00       BRK  
  0x052909 $88F9: C-----  00       BRK  
  0x05290A $88FA: C-----  00       BRK  
  0x05290B $88FB: C-----  00       BRK  
  0x05290C $88FC: C-----  00       BRK  
  0x05290D $88FD: C-----  00       BRK  
  0x05290E $88FE: C-----  00       BRK  
  0x05290F $88FF: C-----  00       BRK  
  0x052910 $8900: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052911 $8901: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052912 $8902: C-----  00       BRK  
  0x052913 $8903: C-----  00       BRK  
  0x052914 $8904: C-----  00       BRK  
  0x052915 $8905: C-----  00       BRK  
  0x052916 $8906: C-----  00       BRK  
  0x052917 $8907: C-----  00       BRK  
  0x052918 $8908: C-----  00       BRK  
  0x052919 $8909: C-----  00       BRK  
  0x05291A $890A: C-----  00       BRK  
  0x05291B $890B: C-----  00       BRK  
  0x05291C $890C: C-----  00       BRK  
  0x05291D $890D: C-----  00       BRK  
  0x05291E $890E: C-----  00       BRK  
  0x05291F $890F: C-----  00       BRK  
  0x052920 $8910: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052921 $8911: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052922 $8912: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052923 $8913: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052924 $8914: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052925 $8915: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052926 $8916: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052927 $8917: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052928 $8918: C-----  00       BRK  
  0x052929 $8919: C-----  00       BRK  
  0x05292A $891A: C-----  00       BRK  
  0x05292B $891B: C-----  00       BRK  
  0x05292C $891C: C-----  00       BRK  
  0x05292D $891D: C-----  00       BRK  
  0x05292E $891E: C-----  00       BRK  
  0x05292F $891F: C-----  00       BRK  
  0x052930 $8920: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052931 $8921: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052932 $8922: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052933 $8923: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052934 $8924: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052935 $8925: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052936 $8926: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052937 $8927: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052938 $8928: C-----  00       BRK  
  0x052939 $8929: C-----  00       BRK  
  0x05293A $892A: C-----  00       BRK  
  0x05293B $892B: C-----  00       BRK  
  0x05293C $892C: C-----  00       BRK  
  0x05293D $892D: C-----  00       BRK  
  0x05293E $892E: C-----  00       BRK  
  0x05293F $892F: C-----  00       BRK  
  0x052940 $8930: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052941 $8931: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052942 $8932: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052943 $8933: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052944 $8934: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052945 $8935: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052946 $8936: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052947 $8937: C-----  00       BRK  
  0x052948 $8938: C-----  00       BRK  
  0x052949 $8939: C-----  00       BRK  
  0x05294A $893A: C-----  00       BRK  
  0x05294B $893B: C-----  00       BRK  
  0x05294C $893C: C-----  00       BRK  
  0x05294D $893D: C-----  00       BRK  
  0x05294E $893E: C-----  00       BRK  
  0x05294F $893F: C-----  00       BRK  
  0x052950 $8940: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x052951 $8941: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052952 $8942: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052953 $8943: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052954 $8944: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052955 $8945: C-----  C0 E0    CPY  #$E0
  0x052957 $8947: C-----  F0 00    BEQ  $8949
  0x052959 $8949: C-----  00       BRK  
  0x05295A $894A: C-----  00       BRK  
  0x05295B $894B: C-----  00       BRK  
  0x05295C $894C: C-----  00       BRK  
  0x05295D $894D: C-----  00       BRK  
  0x05295E $894E: C-----  00       BRK  
  0x05295F $894F: C-----  00       BRK  
  0x052960 $8950: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052961 $8951: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052962 $8952: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x052963 $8953: C-----  F0 C0    BEQ  $8915
  0x052965 $8955: C-----  00       BRK  
  0x052966 $8956: C-----  00       BRK  
  0x052967 $8957: C-----  00       BRK  
  0x052968 $8958: C-----  00       BRK  
  0x052969 $8959: C-----  00       BRK  
  0x05296A $895A: C-----  00       BRK  
  0x05296B $895B: C-----  00       BRK  
  0x05296C $895C: C-----  00       BRK  
  0x05296D $895D: C-----  00       BRK  
  0x05296E $895E: C-----  00       BRK  
  0x05296F $895F: C-----  00       BRK  
  0x052970 $8960: C-----  F8       SED  
  0x052971 $8961: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x052972 $8962: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052973 $8963: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052974 $8964: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052975 $8965: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052976 $8966: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052977 $8967: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052978 $8968: C-----  00       BRK  
  0x052979 $8969: C-----  00       BRK  
  0x05297A $896A: C-----  00       BRK  
  0x05297B $896B: C-----  00       BRK  
  0x05297C $896C: C-----  00       BRK  
  0x05297D $896D: C-----  00       BRK  
  0x05297E $896E: C-----  00       BRK  
  0x05297F $896F: C-----  00       BRK  
  0x052980 $8970: C-----  00       BRK  
  0x052981 $8971: C-----  00       BRK  
  0x052982 $8972: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x052983 $8973: C-----  FE FE FE INC  $FEFE,X
  0x052986 $8976: C-----  FE FF 00 INC  $00FF,X
  0x052989 $8979: C-----  00       BRK  
  0x05298A $897A: C-----  00       BRK  
  0x05298B $897B: C-----  00       BRK  
  0x05298C $897C: C-----  00       BRK  
  0x05298D $897D: C-----  00       BRK  
  0x05298E $897E: C-----  00       BRK  
  0x05298F $897F: C-----  00       BRK  
  0x052990 $8980: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052991 $8981: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052992 $8982: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052993 $8983: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052994 $8984: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052995 $8985: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052996 $8986: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052997 $8987: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052998 $8988: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052999 $8989: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05299A $898A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05299B $898B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05299C $898C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05299D $898D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05299E $898E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05299F $898F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0529A0 $8990: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529A1 $8991: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529A2 $8992: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529A3 $8993: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529A4 $8994: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529A5 $8995: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529A6 $8996: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529A7 $8997: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529A8 $8998: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529A9 $8999: C-----  01 01    ORA  ($01,X)
  0x0529AB $899B: C-----  01 01    ORA  ($01,X)
  0x0529AD $899D: C-----  01 01    ORA  ($01,X)
  0x0529AF $899F: C-----  01 FF    ORA  ($FF,X)
  0x0529B1 $89A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529B2 $89A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529B3 $89A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529B4 $89A4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529B5 $89A5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529B6 $89A6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529B7 $89A7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529B8 $89A8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0529B9 $89A9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0529BA $89AA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0529BB $89AB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0529BC $89AC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0529BD $89AD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0529BE $89AE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0529BF $89AF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529C0 $89B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529C1 $89B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529C2 $89B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529C3 $89B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529C4 $89B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529C5 $89B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529C6 $89B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529C7 $89B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529C8 $89B8: C-----  01 01    ORA  ($01,X)
  0x0529CA $89BA: C-----  01 01    ORA  ($01,X)
  0x0529CC $89BC: C-----  01 01    ORA  ($01,X)
  0x0529CE $89BE: C-----  01 FF    ORA  ($FF,X)
  0x0529D0 $89C0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529D1 $89C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529D2 $89C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529D3 $89C3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529D4 $89C4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0529D5 $89C5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0529D6 $89C6: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0529D7 $89C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529D8 $89C8: C-----  00       BRK  
  0x0529D9 $89C9: C-----  00       BRK  
  0x0529DA $89CA: C-----  00       BRK  
  0x0529DB $89CB: C-----  00       BRK  
  0x0529DC $89CC: C-----  00       BRK  
  0x0529DD $89CD: C-----  00       BRK  
  0x0529DE $89CE: C-----  00       BRK  
  0x0529DF $89CF: C-----  00       BRK  
  0x0529E0 $89D0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529E1 $89D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529E2 $89D2: C-----  FE FE FC INC  $FCFE,X
  0x0529E5 $89D5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0529E6 $89D6: C-----  F8       SED  
  0x0529E7 $89D7: C-----  F0 00    BEQ  $89D9
  0x0529E9 $89D9: C-----  00       BRK  
  0x0529EA $89DA: C-----  00       BRK  
  0x0529EB $89DB: C-----  00       BRK  
  0x0529EC $89DC: C-----  00       BRK  
  0x0529ED $89DD: C-----  00       BRK  
  0x0529EE $89DE: C-----  00       BRK  
  0x0529EF $89DF: C-----  00       BRK  
  0x0529F0 $89E0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529F1 $89E1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529F2 $89E2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0529F3 $89E3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0529F4 $89E4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0529F5 $89E5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0529F6 $89E6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0529F7 $89E7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0529F8 $89E8: C-----  00       BRK  
  0x0529F9 $89E9: C-----  00       BRK  
  0x0529FA $89EA: C-----  00       BRK  
  0x0529FB $89EB: C-----  00       BRK  
  0x0529FC $89EC: C-----  00       BRK  
  0x0529FD $89ED: C-----  00       BRK  
  0x0529FE $89EE: C-----  00       BRK  
  0x0529FF $89EF: C-----  00       BRK  
  0x052A00 $89F0: C-----  E0 E0    CPX  #$E0
  0x052A02 $89F2: C-----  C0 C0    CPY  #$C0
  0x052A04 $89F4: C-----  C0 E0    CPY  #$E0
  0x052A06 $89F6: C-----  E0 F0    CPX  #$F0
  0x052A08 $89F8: C-----  00       BRK  
  0x052A09 $89F9: C-----  00       BRK  
  0x052A0A $89FA: C-----  00       BRK  
  0x052A0B $89FB: C-----  00       BRK  
  0x052A0C $89FC: C-----  00       BRK  
  0x052A0D $89FD: C-----  00       BRK  
  0x052A0E $89FE: C-----  00       BRK  
  0x052A0F $89FF: C-----  00       BRK  
  0x052A10 $8A00: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A11 $8A01: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A12 $8A02: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A13 $8A03: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A14 $8A04: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A15 $8A05: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A16 $8A06: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A17 $8A07: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A18 $8A08: C-----  00       BRK  
  0x052A19 $8A09: C-----  00       BRK  
  0x052A1A $8A0A: C-----  00       BRK  
  0x052A1B $8A0B: C-----  00       BRK  
  0x052A1C $8A0C: C-----  00       BRK  
  0x052A1D $8A0D: C-----  00       BRK  
  0x052A1E $8A0E: C-----  00       BRK  
  0x052A1F $8A0F: C-----  00       BRK  
  0x052A20 $8A10: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A21 $8A11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A22 $8A12: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A23 $8A13: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A24 $8A14: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A25 $8A15: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A26 $8A16: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A27 $8A17: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A28 $8A18: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A29 $8A19: C-----  81 81    STA  ($81,X)
  0x052A2B $8A1B: C-----  81 81    STA  ($81,X)
  0x052A2D $8A1D: C-----  81 81    STA  ($81,X)
  0x052A2F $8A1F: C-----  81 FF    STA  ($FF,X)
  0x052A31 $8A21: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x052A32 $8A22: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A33 $8A23: C-----  D5 FF    CMP  $FF,X
  0x052A35 $8A25: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x052A36 $8A26: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A37 $8A27: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A38 $8A28: C-----  00       BRK  
  0x052A39 $8A29: C-----  10 3C    BPL  $8A67
  0x052A3B $8A2B: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x052A3C $8A2C: C-----  7E 14 18 ROR  $1814,X
  0x052A3F $8A2F: C-----  00       BRK  
  0x052A40 $8A30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A41 $8A31: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A42 $8A32: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A43 $8A33: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A44 $8A34: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A45 $8A35: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A46 $8A36: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A47 $8A37: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A48 $8A38: C-----  81 81    STA  ($81,X)
  0x052A4A $8A3A: C-----  81 81    STA  ($81,X)
  0x052A4C $8A3C: C-----  81 81    STA  ($81,X)
  0x052A4E $8A3E: C-----  81 FF    STA  ($FF,X)
  0x052A50 $8A40: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A51 $8A41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A52 $8A42: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A53 $8A43: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A54 $8A44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A55 $8A45: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A56 $8A46: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A57 $8A47: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A58 $8A48: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x052A59 $8A49: C-----  19 21 41 ORA  $4121,Y
  0x052A5C $8A4C: C-----  41 81    EOR  ($81,X)
  0x052A5E $8A4E: C-----  81 81    STA  ($81,X)
  0x052A60 $8A50: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A61 $8A51: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A62 $8A52: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A63 $8A53: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A64 $8A54: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A65 $8A55: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A66 $8A56: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A67 $8A57: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A68 $8A58: C-----  C0 30    CPY  #$30
  0x052A6A $8A5A: C-----  08       PHP  
  0x052A6B $8A5B: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x052A6C $8A5C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x052A6D $8A5D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x052A6E $8A5E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x052A6F $8A5F: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x052A70 $8A60: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A71 $8A61: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A72 $8A62: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A73 $8A63: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A74 $8A64: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A75 $8A65: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A76 $8A66: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A77 $8A67: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A78 $8A68: C-----  81 81    STA  ($81,X)
  0x052A7A $8A6A: C-----  81 41    STA  ($41,X)
  0x052A7C $8A6C: C-----  41 21    EOR  ($21,X)
  0x052A7E $8A6E: C-----  19 07 FF ORA  $FF07,Y
  0x052A81 $8A71: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A82 $8A72: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A83 $8A73: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A84 $8A74: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A85 $8A75: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A86 $8A76: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A87 $8A77: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A88 $8A78: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x052A89 $8A79: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x052A8A $8A7A: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x052A8B $8A7B: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x052A8C $8A7C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x052A8D $8A7D: C-----  08       PHP  
  0x052A8E $8A7E: C-----  30 C0    BMI  $8A40
  0x052A90 $8A80: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A91 $8A81: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A92 $8A82: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052A93 $8A83: C-----  F6 F8    INC  $F8,X
  0x052A95 $8A85: C-----  FE F8 84 INC  $84F8,X
  0x052A98 $8A88: C-----  00       BRK  
  0x052A99 $8A89: C-----  00       BRK  
  0x052A9A $8A8A: C-----  00       BRK  
  0x052A9B $8A8B: C-----  00       BRK  
  0x052A9C $8A8C: C-----  00       BRK  
  0x052A9D $8A8D: C-----  00       BRK  
  0x052A9E $8A8E: C-----  00       BRK  
  0x052A9F $8A8F: C-----  00       BRK  
  0x052AA0 $8A90: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AA1 $8A91: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AA2 $8A92: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x052AA3 $8A93: C-----  00       BRK  
  0x052AA4 $8A94: C-----  00       BRK  
  0x052AA5 $8A95: C-----  00       BRK  
  0x052AA6 $8A96: C-----  00       BRK  
  0x052AA7 $8A97: C-----  00       BRK  
  0x052AA8 $8A98: C-----  00       BRK  
  0x052AA9 $8A99: C-----  00       BRK  
  0x052AAA $8A9A: C-----  00       BRK  
  0x052AAB $8A9B: C-----  00       BRK  
  0x052AAC $8A9C: C-----  00       BRK  
  0x052AAD $8A9D: C-----  00       BRK  
  0x052AAE $8A9E: C-----  00       BRK  
  0x052AAF $8A9F: C-----  00       BRK  
  0x052AB0 $8AA0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x052AB1 $8AA1: C-----  F0 E0    BEQ  $8A83
  0x052AB3 $8AA3: C-----  C0 80    CPY  #$80
  0x052AB5 $8AA5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052AB6 $8AA6: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x052AB7 $8AA7: C-----  84 00    STY  $00
  0x052AB9 $8AA9: C-----  00       BRK  
  0x052ABA $8AAA: C-----  00       BRK  
  0x052ABB $8AAB: C-----  00       BRK  
  0x052ABC $8AAC: C-----  00       BRK  
  0x052ABD $8AAD: C-----  00       BRK  
  0x052ABE $8AAE: C-----  00       BRK  
  0x052ABF $8AAF: C-----  00       BRK  
  0x052AC0 $8AB0: C-----  00       BRK  
  0x052AC1 $8AB1: C-----  00       BRK  
  0x052AC2 $8AB2: C-----  01 00    ORA  ($00,X)
  0x052AC4 $8AB4: C-----  00       BRK  
  0x052AC5 $8AB5: C-----  00       BRK  
  0x052AC6 $8AB6: C-----  00       BRK  
  0x052AC7 $8AB7: C-----  00       BRK  
  0x052AC8 $8AB8: C-----  00       BRK  
  0x052AC9 $8AB9: C-----  00       BRK  
  0x052ACA $8ABA: C-----  00       BRK  
  0x052ACB $8ABB: C-----  00       BRK  
  0x052ACC $8ABC: C-----  00       BRK  
  0x052ACD $8ABD: C-----  00       BRK  
  0x052ACE $8ABE: C-----  00       BRK  
  0x052ACF $8ABF: C-----  00       BRK  
  0x052AD0 $8AC0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AD1 $8AC1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AD2 $8AC2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AD3 $8AC3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AD4 $8AC4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AD5 $8AC5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AD6 $8AC6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AD7 $8AC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AD8 $8AC8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AD9 $8AC9: C-----  00       BRK  
  0x052ADA $8ACA: C-----  00       BRK  
  0x052ADB $8ACB: C-----  00       BRK  
  0x052ADC $8ACC: C-----  00       BRK  
  0x052ADD $8ACD: C-----  00       BRK  
  0x052ADE $8ACE: C-----  00       BRK  
  0x052ADF $8ACF: C-----  00       BRK  
  0x052AE0 $8AD0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AE1 $8AD1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AE2 $8AD2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AE3 $8AD3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AE4 $8AD4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AE5 $8AD5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AE6 $8AD6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AE7 $8AD7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AE8 $8AD8: C-----  00       BRK  
  0x052AE9 $8AD9: C-----  00       BRK  
  0x052AEA $8ADA: C-----  00       BRK  
  0x052AEB $8ADB: C-----  00       BRK  
  0x052AEC $8ADC: C-----  00       BRK  
  0x052AED $8ADD: C-----  00       BRK  
  0x052AEE $8ADE: C-----  00       BRK  
  0x052AEF $8ADF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AF0 $8AE0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AF1 $8AE1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AF2 $8AE2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AF3 $8AE3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AF4 $8AE4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AF5 $8AE5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AF6 $8AE6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AF7 $8AE7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052AF8 $8AE8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052AF9 $8AE9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052AFA $8AEA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052AFB $8AEB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052AFC $8AEC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052AFD $8AED: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052AFE $8AEE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052AFF $8AEF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052B00 $8AF0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052B01 $8AF1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052B02 $8AF2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052B03 $8AF3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052B04 $8AF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052B05 $8AF5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052B06 $8AF6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052B07 $8AF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052B08 $8AF8: C-----  01 01    ORA  ($01,X)
  0x052B0A $8AFA: C-----  01 01    ORA  ($01,X)
  0x052B0C $8AFC: C-----  01 01    ORA  ($01,X)
  0x052B0E $8AFE: C-----  01 01    ORA  ($01,X)
  0x052B10 $8B00: C-----  84 C8    STY  $C8
  0x052B12 $8B02: C-----  C8       INY  
  0x052B13 $8B03: C-----  D0 F0    BNE  $8AF5
  0x052B15 $8B05: C-----  F0 E8    BEQ  $8AEF
  0x052B17 $8B07: C-----  C0 00    CPY  #$00
  0x052B19 $8B09: C-----  00       BRK  
  0x052B1A $8B0A: C-----  00       BRK  
  0x052B1B $8B0B: C-----  00       BRK  
  0x052B1C $8B0C: C-----  00       BRK  
  0x052B1D $8B0D: C-----  00       BRK  
  0x052B1E $8B0E: C-----  00       BRK  
  0x052B1F $8B0F: C-----  00       BRK  
  0x052B20 $8B10: C-----  00       BRK  
  0x052B21 $8B11: C-----  00       BRK  
  0x052B22 $8B12: C-----  00       BRK  
  0x052B23 $8B13: C-----  00       BRK  
  0x052B24 $8B14: C-----  00       BRK  
  0x052B25 $8B15: C-----  00       BRK  
  0x052B26 $8B16: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x052B27 $8B17: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x052B28 $8B18: C-----  00       BRK  
  0x052B29 $8B19: C-----  00       BRK  
  0x052B2A $8B1A: C-----  00       BRK  
  0x052B2B $8B1B: C-----  00       BRK  
  0x052B2C $8B1C: C-----  00       BRK  
  0x052B2D $8B1D: C-----  00       BRK  
  0x052B2E $8B1E: C-----  00       BRK  
  0x052B2F $8B1F: C-----  00       BRK  
  0x052B30 $8B20: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052B31 $8B21: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052B32 $8B22: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052B33 $8B23: C-----  FE FE FC INC  $FCFE,X
  0x052B36 $8B26: C-----  F8       SED  
  0x052B37 $8B27: C-----  F8       SED  
  0x052B38 $8B28: C-----  00       BRK  
  0x052B39 $8B29: C-----  00       BRK  
  0x052B3A $8B2A: C-----  00       BRK  
  0x052B3B $8B2B: C-----  00       BRK  
  0x052B3C $8B2C: C-----  00       BRK  
  0x052B3D $8B2D: C-----  00       BRK  
  0x052B3E $8B2E: C-----  00       BRK  
  0x052B3F $8B2F: C-----  00       BRK  
  0x052B40 $8B30: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052B41 $8B31: C-----  00       BRK  
  0x052B42 $8B32: C-----  00       BRK  
  0x052B43 $8B33: C-----  00       BRK  
  0x052B44 $8B34: C-----  00       BRK  
  0x052B45 $8B35: C-----  00       BRK  
  0x052B46 $8B36: C-----  00       BRK  
  0x052B47 $8B37: C-----  00       BRK  
  0x052B48 $8B38: C-----  00       BRK  
  0x052B49 $8B39: C-----  00       BRK  
  0x052B4A $8B3A: C-----  00       BRK  
  0x052B4B $8B3B: C-----  00       BRK  
  0x052B4C $8B3C: C-----  00       BRK  
  0x052B4D $8B3D: C-----  00       BRK  
  0x052B4E $8B3E: C-----  00       BRK  
  0x052B4F $8B3F: C-----  00       BRK  
  0x052B50 $8B40: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x052B51 $8B41: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x052B52 $8B42: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052B53 $8B43: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052B54 $8B44: C-----  01 00    ORA  ($00,X)
  0x052B56 $8B46: C-----  00       BRK  
  0x052B57 $8B47: C-----  00       BRK  
  0x052B58 $8B48: C-----  00       BRK  
  0x052B59 $8B49: C-----  00       BRK  
  0x052B5A $8B4A: C-----  00       BRK  
  0x052B5B $8B4B: C-----  00       BRK  
  0x052B5C $8B4C: C-----  00       BRK  
  0x052B5D $8B4D: C-----  00       BRK  
  0x052B5E $8B4E: C-----  00       BRK  
  0x052B5F $8B4F: C-----  00       BRK  
  0x052B60 $8B50: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052B61 $8B51: C-----  F9 F0 F0 SBC  $F0F0,Y
  0x052B64 $8B54: C-----  E0 81    CPX  #$81
  0x052B66 $8B56: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052B67 $8B57: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x052B68 $8B58: C-----  00       BRK  
  0x052B69 $8B59: C-----  00       BRK  
  0x052B6A $8B5A: C-----  00       BRK  
  0x052B6B $8B5B: C-----  00       BRK  
  0x052B6C $8B5C: C-----  00       BRK  
  0x052B6D $8B5D: C-----  00       BRK  
  0x052B6E $8B5E: C-----  00       BRK  
  0x052B6F $8B5F: C-----  00       BRK  
  0x052B70 $8B60: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052B71 $8B61: C-----  E0 F0    CPX  #$F0
  0x052B73 $8B63: C-----  F8       SED  
  0x052B74 $8B64: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052B75 $8B65: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052B76 $8B66: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052B77 $8B67: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052B78 $8B68: C-----  00       BRK  
  0x052B79 $8B69: C-----  00       BRK  
  0x052B7A $8B6A: C-----  00       BRK  
  0x052B7B $8B6B: C-----  00       BRK  
  0x052B7C $8B6C: C-----  00       BRK  
  0x052B7D $8B6D: C-----  00       BRK  
  0x052B7E $8B6E: C-----  00       BRK  
  0x052B7F $8B6F: C-----  00       BRK  
  0x052B80 $8B70: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052B81 $8B71: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052B82 $8B72: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052B83 $8B73: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052B84 $8B74: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052B85 $8B75: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052B86 $8B76: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052B87 $8B77: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052B88 $8B78: C-----  00       BRK  
  0x052B89 $8B79: C-----  00       BRK  
  0x052B8A $8B7A: C-----  00       BRK  
  0x052B8B $8B7B: C-----  00       BRK  
  0x052B8C $8B7C: C-----  00       BRK  
  0x052B8D $8B7D: C-----  00       BRK  
  0x052B8E $8B7E: C-----  00       BRK  
  0x052B8F $8B7F: C-----  00       BRK  
  0x052B90 $8B80: C-----  F0 E0    BEQ  $8B62
  0x052B92 $8B82: C-----  E0 C0    CPX  #$C0
  0x052B94 $8B84: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052B95 $8B85: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052B96 $8B86: C-----  00       BRK  
  0x052B97 $8B87: C-----  00       BRK  
  0x052B98 $8B88: C-----  00       BRK  
  0x052B99 $8B89: C-----  00       BRK  
  0x052B9A $8B8A: C-----  00       BRK  
  0x052B9B $8B8B: C-----  00       BRK  
  0x052B9C $8B8C: C-----  00       BRK  
  0x052B9D $8B8D: C-----  00       BRK  
  0x052B9E $8B8E: C-----  00       BRK  
  0x052B9F $8B8F: C-----  00       BRK  
  0x052BA0 $8B90: C-----  00       BRK  
  0x052BA1 $8B91: C-----  C0 E0    CPY  #$E0
  0x052BA3 $8B93: C-----  F0 F8    BEQ  $8B8D
  0x052BA5 $8B95: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x052BA6 $8B96: C-----  F8       SED  
  0x052BA7 $8B97: C-----  F0 00    BEQ  $8B99
  0x052BA9 $8B99: C-----  00       BRK  
  0x052BAA $8B9A: C-----  00       BRK  
  0x052BAB $8B9B: C-----  00       BRK  
  0x052BAC $8B9C: C-----  00       BRK  
  0x052BAD $8B9D: C-----  00       BRK  
  0x052BAE $8B9E: C-----  00       BRK  
  0x052BAF $8B9F: C-----  00       BRK  
  0x052BB0 $8BA0: C-----  00       BRK  
  0x052BB1 $8BA1: C-----  00       BRK  
  0x052BB2 $8BA2: C-----  01 07    ORA  ($07,X)
  0x052BB4 $8BA4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052BB5 $8BA5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052BB6 $8BA6: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052BB7 $8BA7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052BB8 $8BA8: C-----  00       BRK  
  0x052BB9 $8BA9: C-----  00       BRK  
  0x052BBA $8BAA: C-----  00       BRK  
  0x052BBB $8BAB: C-----  00       BRK  
  0x052BBC $8BAC: C-----  00       BRK  
  0x052BBD $8BAD: C-----  00       BRK  
  0x052BBE $8BAE: C-----  00       BRK  
  0x052BBF $8BAF: C-----  00       BRK  
  0x052BC0 $8BB0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052BC1 $8BB1: C-----  01 01    ORA  ($01,X)
  0x052BC3 $8BB3: C-----  01 01    ORA  ($01,X)
  0x052BC5 $8BB5: C-----  01 03    ORA  ($03,X)
  0x052BC7 $8BB7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x052BC8 $8BB8: C-----  00       BRK  
  0x052BC9 $8BB9: C-----  00       BRK  
  0x052BCA $8BBA: C-----  00       BRK  
  0x052BCB $8BBB: C-----  00       BRK  
  0x052BCC $8BBC: C-----  00       BRK  
  0x052BCD $8BBD: C-----  00       BRK  
  0x052BCE $8BBE: C-----  00       BRK  
  0x052BCF $8BBF: C-----  00       BRK  
  0x052BD0 $8BC0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052BD1 $8BC1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052BD2 $8BC2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052BD3 $8BC3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052BD4 $8BC4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052BD5 $8BC5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x052BD6 $8BC6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x052BD7 $8BC7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052BD8 $8BC8: C-----  00       BRK  
  0x052BD9 $8BC9: C-----  00       BRK  
  0x052BDA $8BCA: C-----  00       BRK  
  0x052BDB $8BCB: C-----  00       BRK  
  0x052BDC $8BCC: C-----  00       BRK  
  0x052BDD $8BCD: C-----  00       BRK  
  0x052BDE $8BCE: C-----  00       BRK  
  0x052BDF $8BCF: C-----  00       BRK  
  0x052BE0 $8BD0: C-----  F9 F0 E1 SBC  $E1F0,Y
  0x052BE3 $8BD3: C-----  E0 F0    CPX  #$F0
  0x052BE5 $8BD5: C-----  E0 E0    CPX  #$E0
  0x052BE7 $8BD7: C-----  E0 00    CPX  #$00
  0x052BE9 $8BD9: C-----  00       BRK  
  0x052BEA $8BDA: C-----  00       BRK  
  0x052BEB $8BDB: C-----  00       BRK  
  0x052BEC $8BDC: C-----  00       BRK  
  0x052BED $8BDD: C-----  00       BRK  
  0x052BEE $8BDE: C-----  00       BRK  
  0x052BEF $8BDF: C-----  00       BRK  
  0x052BF0 $8BE0: C-----  00       BRK  
  0x052BF1 $8BE1: C-----  00       BRK  
  0x052BF2 $8BE2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052BF3 $8BE3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052BF4 $8BE4: C-----  40       RTI  
  0x052BF5 $8BE5: C-----  40       RTI  
  0x052BF6 $8BE6: C-----  20 20 00 JSR  $0020
  0x052BF9 $8BE9: C-----  00       BRK  
  0x052BFA $8BEA: C-----  00       BRK  
  0x052BFB $8BEB: C-----  00       BRK  
  0x052BFC $8BEC: C-----  00       BRK  
  0x052BFD $8BED: C-----  00       BRK  
  0x052BFE $8BEE: C-----  00       BRK  
  0x052BFF $8BEF: C-----  00       BRK  
  0x052C00 $8BF0: C-----  F0 F8    BEQ  $8BEA
  0x052C02 $8BF2: C-----  FE FF FF INC  $FFFF,X
  0x052C05 $8BF5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052C06 $8BF6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052C07 $8BF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052C08 $8BF8: C-----  00       BRK  
  0x052C09 $8BF9: C-----  00       BRK  
  0x052C0A $8BFA: C-----  00       BRK  
  0x052C0B $8BFB: C-----  00       BRK  
  0x052C0C $8BFC: C-----  00       BRK  
  0x052C0D $8BFD: C-----  00       BRK  
  0x052C0E $8BFE: C-----  00       BRK  
  0x052C0F $8BFF: C-----  00       BRK  
  0x052C10 $8C00: C-----  F0 F8    BEQ  $8BFA
  0x052C12 $8C02: C-----  60       RTS  
  0x052C13 $8C03: C-----  10 00    BPL  $8C05
  0x052C15 $8C05: C-----  00       BRK  
  0x052C16 $8C06: C-----  00       BRK  
  0x052C17 $8C07: C-----  00       BRK  
  0x052C18 $8C08: C-----  00       BRK  
  0x052C19 $8C09: C-----  00       BRK  
  0x052C1A $8C0A: C-----  00       BRK  
  0x052C1B $8C0B: C-----  00       BRK  
  0x052C1C $8C0C: C-----  00       BRK  
  0x052C1D $8C0D: C-----  00       BRK  
  0x052C1E $8C0E: C-----  00       BRK  
  0x052C1F $8C0F: C-----  00       BRK  
  0x052C20 $8C10: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052C21 $8C11: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052C22 $8C12: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052C23 $8C13: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052C24 $8C14: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052C25 $8C15: C-----  09 10    ORA  #$10
  0x052C27 $8C17: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x052C28 $8C18: C-----  00       BRK  
  0x052C29 $8C19: C-----  00       BRK  
  0x052C2A $8C1A: C-----  00       BRK  
  0x052C2B $8C1B: C-----  00       BRK  
  0x052C2C $8C1C: C-----  00       BRK  
  0x052C2D $8C1D: C-----  00       BRK  
  0x052C2E $8C1E: C-----  00       BRK  
  0x052C2F $8C1F: C-----  00       BRK  
  0x052C30 $8C20: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x052C31 $8C21: C-----  00       BRK  
  0x052C32 $8C22: C-----  00       BRK  
  0x052C33 $8C23: C-----  00       BRK  
  0x052C34 $8C24: C-----  00       BRK  
  0x052C35 $8C25: C-----  00       BRK  
  0x052C36 $8C26: C-----  01 07    ORA  ($07,X)
  0x052C38 $8C28: C-----  00       BRK  
  0x052C39 $8C29: C-----  00       BRK  
  0x052C3A $8C2A: C-----  00       BRK  
  0x052C3B $8C2B: C-----  00       BRK  
  0x052C3C $8C2C: C-----  00       BRK  
  0x052C3D $8C2D: C-----  00       BRK  
  0x052C3E $8C2E: C-----  00       BRK  
  0x052C3F $8C2F: C-----  00       BRK  
  0x052C40 $8C30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052C41 $8C31: C-----  E1 80    SBC  ($80,X)
  0x052C43 $8C33: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052C44 $8C34: C-----  00       BRK  
  0x052C45 $8C35: C-----  00       BRK  
  0x052C46 $8C36: C-----  00       BRK  
  0x052C47 $8C37: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052C48 $8C38: C-----  00       BRK  
  0x052C49 $8C39: C-----  00       BRK  
  0x052C4A $8C3A: C-----  00       BRK  
  0x052C4B $8C3B: C-----  00       BRK  
  0x052C4C $8C3C: C-----  00       BRK  
  0x052C4D $8C3D: C-----  00       BRK  
  0x052C4E $8C3E: C-----  00       BRK  
  0x052C4F $8C3F: C-----  00       BRK  
  0x052C50 $8C40: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052C51 $8C41: C-----  F0 80    BEQ  $8BC3
  0x052C53 $8C43: C-----  00       BRK  
  0x052C54 $8C44: C-----  00       BRK  
  0x052C55 $8C45: C-----  00       BRK  
  0x052C56 $8C46: C-----  00       BRK  
  0x052C57 $8C47: C-----  00       BRK  
  0x052C58 $8C48: C-----  00       BRK  
  0x052C59 $8C49: C-----  00       BRK  
  0x052C5A $8C4A: C-----  00       BRK  
  0x052C5B $8C4B: C-----  00       BRK  
  0x052C5C $8C4C: C-----  00       BRK  
  0x052C5D $8C4D: C-----  00       BRK  
  0x052C5E $8C4E: C-----  00       BRK  
  0x052C5F $8C4F: C-----  00       BRK  
  0x052C60 $8C50: C-----  00       BRK  
  0x052C61 $8C51: C-----  00       BRK  
  0x052C62 $8C52: C-----  00       BRK  
  0x052C63 $8C53: C-----  00       BRK  
  0x052C64 $8C54: C-----  00       BRK  
  0x052C65 $8C55: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052C66 $8C56: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052C67 $8C57: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052C68 $8C58: C-----  00       BRK  
  0x052C69 $8C59: C-----  00       BRK  
  0x052C6A $8C5A: C-----  00       BRK  
  0x052C6B $8C5B: C-----  00       BRK  
  0x052C6C $8C5C: C-----  00       BRK  
  0x052C6D $8C5D: C-----  00       BRK  
  0x052C6E $8C5E: C-----  00       BRK  
  0x052C6F $8C5F: C-----  00       BRK  
  0x052C70 $8C60: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052C71 $8C61: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x052C72 $8C62: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052C73 $8C63: C-----  7E 30 40 ROR  $4030,X
  0x052C76 $8C66: C-----  00       BRK  
  0x052C77 $8C67: C-----  00       BRK  
  0x052C78 $8C68: C-----  00       BRK  
  0x052C79 $8C69: C-----  00       BRK  
  0x052C7A $8C6A: C-----  00       BRK  
  0x052C7B $8C6B: C-----  00       BRK  
  0x052C7C $8C6C: C-----  00       BRK  
  0x052C7D $8C6D: C-----  00       BRK  
  0x052C7E $8C6E: C-----  00       BRK  
  0x052C7F $8C6F: C-----  00       BRK  
  0x052C80 $8C70: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052C81 $8C71: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052C82 $8C72: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x052C83 $8C73: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052C84 $8C74: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x052C85 $8C75: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052C86 $8C76: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052C87 $8C77: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052C88 $8C78: C-----  00       BRK  
  0x052C89 $8C79: C-----  00       BRK  
  0x052C8A $8C7A: C-----  00       BRK  
  0x052C8B $8C7B: C-----  00       BRK  
  0x052C8C $8C7C: C-----  00       BRK  
  0x052C8D $8C7D: C-----  00       BRK  
  0x052C8E $8C7E: C-----  00       BRK  
  0x052C8F $8C7F: C-----  00       BRK  
  0x052C90 $8C80: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052C91 $8C81: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052C92 $8C82: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052C93 $8C83: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052C94 $8C84: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052C95 $8C85: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052C96 $8C86: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x052C97 $8C87: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x052C98 $8C88: C-----  00       BRK  
  0x052C99 $8C89: C-----  00       BRK  
  0x052C9A $8C8A: C-----  00       BRK  
  0x052C9B $8C8B: C-----  00       BRK  
  0x052C9C $8C8C: C-----  00       BRK  
  0x052C9D $8C8D: C-----  00       BRK  
  0x052C9E $8C8E: C-----  00       BRK  
  0x052C9F $8C8F: C-----  00       BRK  
  0x052CA0 $8C90: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052CA1 $8C91: C-----  C0 00    CPY  #$00
  0x052CA3 $8C93: C-----  00       BRK  
  0x052CA4 $8C94: C-----  00       BRK  
  0x052CA5 $8C95: C-----  00       BRK  
  0x052CA6 $8C96: C-----  00       BRK  
  0x052CA7 $8C97: C-----  00       BRK  
  0x052CA8 $8C98: C-----  00       BRK  
  0x052CA9 $8C99: C-----  00       BRK  
  0x052CAA $8C9A: C-----  00       BRK  
  0x052CAB $8C9B: C-----  00       BRK  
  0x052CAC $8C9C: C-----  00       BRK  
  0x052CAD $8C9D: C-----  00       BRK  
  0x052CAE $8C9E: C-----  00       BRK  
  0x052CAF $8C9F: C-----  00       BRK  
  0x052CB0 $8CA0: C-----  00       BRK  
  0x052CB1 $8CA1: C-----  00       BRK  
  0x052CB2 $8CA2: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x052CB3 $8CA3: C-----  3E 7F 3F ROL  $3F7F,X
  0x052CB6 $8CA6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052CB7 $8CA7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052CB8 $8CA8: C-----  00       BRK  
  0x052CB9 $8CA9: C-----  00       BRK  
  0x052CBA $8CAA: C-----  00       BRK  
  0x052CBB $8CAB: C-----  00       BRK  
  0x052CBC $8CAC: C-----  00       BRK  
  0x052CBD $8CAD: C-----  00       BRK  
  0x052CBE $8CAE: C-----  00       BRK  
  0x052CBF $8CAF: C-----  00       BRK  
  0x052CC0 $8CB0: C-----  00       BRK  
  0x052CC1 $8CB1: C-----  00       BRK  
  0x052CC2 $8CB2: C-----  00       BRK  
  0x052CC3 $8CB3: C-----  C0 F0    CPY  #$F0
  0x052CC5 $8CB5: C-----  F8       SED  
  0x052CC6 $8CB6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x052CC7 $8CB7: C-----  FE 00 00 INC  $0000,X
  0x052CCA $8CBA: C-----  00       BRK  
  0x052CCB $8CBB: C-----  00       BRK  
  0x052CCC $8CBC: C-----  00       BRK  
  0x052CCD $8CBD: C-----  00       BRK  
  0x052CCE $8CBE: C-----  00       BRK  
  0x052CCF $8CBF: C-----  00       BRK  
  0x052CD0 $8CC0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052CD1 $8CC1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x052CD2 $8CC2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052CD3 $8CC3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052CD4 $8CC4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052CD5 $8CC5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052CD6 $8CC6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052CD7 $8CC7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052CD8 $8CC8: C-----  00       BRK  
  0x052CD9 $8CC9: C-----  00       BRK  
  0x052CDA $8CCA: C-----  00       BRK  
  0x052CDB $8CCB: C-----  00       BRK  
  0x052CDC $8CCC: C-----  00       BRK  
  0x052CDD $8CCD: C-----  00       BRK  
  0x052CDE $8CCE: C-----  00       BRK  
  0x052CDF $8CCF: C-----  00       BRK  
  0x052CE0 $8CD0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052CE1 $8CD1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052CE2 $8CD2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052CE3 $8CD3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052CE4 $8CD4: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x052CE5 $8CD5: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x052CE6 $8CD6: C-----  81 81    STA  ($81,X)
  0x052CE8 $8CD8: C-----  00       BRK  
  0x052CE9 $8CD9: C-----  00       BRK  
  0x052CEA $8CDA: C-----  00       BRK  
  0x052CEB $8CDB: C-----  00       BRK  
  0x052CEC $8CDC: C-----  00       BRK  
  0x052CED $8CDD: C-----  00       BRK  
  0x052CEE $8CDE: C-----  00       BRK  
  0x052CEF $8CDF: C-----  00       BRK  
  0x052CF0 $8CE0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x052CF1 $8CE1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x052CF2 $8CE2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x052CF3 $8CE3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052CF4 $8CE4: C-----  01 01    ORA  ($01,X)
  0x052CF6 $8CE6: C-----  00       BRK  
  0x052CF7 $8CE7: C-----  00       BRK  
  0x052CF8 $8CE8: C-----  00       BRK  
  0x052CF9 $8CE9: C-----  00       BRK  
  0x052CFA $8CEA: C-----  00       BRK  
  0x052CFB $8CEB: C-----  00       BRK  
  0x052CFC $8CEC: C-----  00       BRK  
  0x052CFD $8CED: C-----  00       BRK  
  0x052CFE $8CEE: C-----  00       BRK  
  0x052CFF $8CEF: C-----  00       BRK  
  0x052D00 $8CF0: C-----  81 83    STA  ($83,X)
  0x052D02 $8CF2: C-----  81 C0    STA  ($C0,X)
  0x052D04 $8CF4: C-----  C0 C0    CPY  #$C0
  0x052D06 $8CF6: C-----  E0 E0    CPX  #$E0
  0x052D08 $8CF8: C-----  00       BRK  
  0x052D09 $8CF9: C-----  00       BRK  
  0x052D0A $8CFA: C-----  00       BRK  
  0x052D0B $8CFB: C-----  00       BRK  
  0x052D0C $8CFC: C-----  00       BRK  
  0x052D0D $8CFD: C-----  00       BRK  
  0x052D0E $8CFE: C-----  00       BRK  
  0x052D0F $8CFF: C-----  00       BRK  
  0x052D10 $8D00: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x052D11 $8D01: C-----  F0 C0    BEQ  $8CC3
  0x052D13 $8D03: C-----  00       BRK  
  0x052D14 $8D04: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052D15 $8D05: C-----  C0 E0    CPY  #$E0
  0x052D17 $8D07: C-----  E0 00    CPX  #$00
  0x052D19 $8D09: C-----  00       BRK  
  0x052D1A $8D0A: C-----  00       BRK  
  0x052D1B $8D0B: C-----  00       BRK  
  0x052D1C $8D0C: C-----  00       BRK  
  0x052D1D $8D0D: C-----  00       BRK  
  0x052D1E $8D0E: C-----  00       BRK  
  0x052D1F $8D0F: C-----  00       BRK  
  0x052D20 $8D10: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052D21 $8D11: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052D22 $8D12: C-----  01 01    ORA  ($01,X)
  0x052D24 $8D14: C-----  00       BRK  
  0x052D25 $8D15: C-----  00       BRK  
  0x052D26 $8D16: C-----  00       BRK  
  0x052D27 $8D17: C-----  00       BRK  
  0x052D28 $8D18: C-----  00       BRK  
  0x052D29 $8D19: C-----  00       BRK  
  0x052D2A $8D1A: C-----  00       BRK  
  0x052D2B $8D1B: C-----  00       BRK  
  0x052D2C $8D1C: C-----  00       BRK  
  0x052D2D $8D1D: C-----  00       BRK  
  0x052D2E $8D1E: C-----  00       BRK  
  0x052D2F $8D1F: C-----  00       BRK  
  0x052D30 $8D20: C-----  F0 F0    BEQ  $8D12
  0x052D32 $8D22: C-----  F0 F8    BEQ  $8D1C
  0x052D34 $8D24: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x052D35 $8D25: C-----  FE FF FF INC  $FFFF,X
  0x052D38 $8D28: C-----  00       BRK  
  0x052D39 $8D29: C-----  00       BRK  
  0x052D3A $8D2A: C-----  00       BRK  
  0x052D3B $8D2B: C-----  00       BRK  
  0x052D3C $8D2C: C-----  00       BRK  
  0x052D3D $8D2D: C-----  00       BRK  
  0x052D3E $8D2E: C-----  00       BRK  
  0x052D3F $8D2F: C-----  00       BRK  
  0x052D40 $8D30: C-----  00       BRK  
  0x052D41 $8D31: C-----  00       BRK  
  0x052D42 $8D32: C-----  00       BRK  
  0x052D43 $8D33: C-----  00       BRK  
  0x052D44 $8D34: C-----  00       BRK  
  0x052D45 $8D35: C-----  40       RTI  
  0x052D46 $8D36: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052D47 $8D37: C-----  00       BRK  
  0x052D48 $8D38: C-----  00       BRK  
  0x052D49 $8D39: C-----  00       BRK  
  0x052D4A $8D3A: C-----  00       BRK  
  0x052D4B $8D3B: C-----  00       BRK  
  0x052D4C $8D3C: C-----  00       BRK  
  0x052D4D $8D3D: C-----  00       BRK  
  0x052D4E $8D3E: C-----  00       BRK  
  0x052D4F $8D3F: C-----  00       BRK  
  0x052D50 $8D40: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052D51 $8D41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052D52 $8D42: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052D53 $8D43: C-----  FE F8 F0 INC  $F0F8,X
  0x052D56 $8D46: C-----  40       RTI  
  0x052D57 $8D47: C-----  00       BRK  
  0x052D58 $8D48: C-----  00       BRK  
  0x052D59 $8D49: C-----  00       BRK  
  0x052D5A $8D4A: C-----  00       BRK  
  0x052D5B $8D4B: C-----  00       BRK  
  0x052D5C $8D4C: C-----  00       BRK  
  0x052D5D $8D4D: C-----  00       BRK  
  0x052D5E $8D4E: C-----  00       BRK  
  0x052D5F $8D4F: C-----  00       BRK  
  0x052D60 $8D50: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052D61 $8D51: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052D62 $8D52: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052D63 $8D53: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052D64 $8D54: C-----  00       BRK  
  0x052D65 $8D55: C-----  00       BRK  
  0x052D66 $8D56: C-----  00       BRK  
  0x052D67 $8D57: C-----  00       BRK  
  0x052D68 $8D58: C-----  00       BRK  
  0x052D69 $8D59: C-----  00       BRK  
  0x052D6A $8D5A: C-----  00       BRK  
  0x052D6B $8D5B: C-----  00       BRK  
  0x052D6C $8D5C: C-----  00       BRK  
  0x052D6D $8D5D: C-----  00       BRK  
  0x052D6E $8D5E: C-----  00       BRK  
  0x052D6F $8D5F: C-----  00       BRK  
  0x052D70 $8D60: C-----  01 00    ORA  ($00,X)
  0x052D72 $8D62: C-----  00       BRK  
  0x052D73 $8D63: C-----  40       RTI  
  0x052D74 $8D64: C-----  20 10 10 JSR  $1010
  0x052D77 $8D67: C-----  08       PHP  
  0x052D78 $8D68: C-----  00       BRK  
  0x052D79 $8D69: C-----  00       BRK  
  0x052D7A $8D6A: C-----  00       BRK  
  0x052D7B $8D6B: C-----  00       BRK  
  0x052D7C $8D6C: C-----  00       BRK  
  0x052D7D $8D6D: C-----  00       BRK  
  0x052D7E $8D6E: C-----  00       BRK  
  0x052D7F $8D6F: C-----  00       BRK  
  0x052D80 $8D70: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052D81 $8D71: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052D82 $8D72: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052D83 $8D73: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052D84 $8D74: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052D85 $8D75: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052D86 $8D76: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052D87 $8D77: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052D88 $8D78: C-----  00       BRK  
  0x052D89 $8D79: C-----  00       BRK  
  0x052D8A $8D7A: C-----  00       BRK  
  0x052D8B $8D7B: C-----  00       BRK  
  0x052D8C $8D7C: C-----  00       BRK  
  0x052D8D $8D7D: C-----  00       BRK  
  0x052D8E $8D7E: C-----  00       BRK  
  0x052D8F $8D7F: C-----  00       BRK  
  0x052D90 $8D80: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052D91 $8D81: C-----  FE FE FC INC  $FCFE,X
  0x052D94 $8D84: C-----  78       SEI  
  0x052D95 $8D85: C-----  30 10    BMI  $8D97
  0x052D97 $8D87: C-----  08       PHP  
  0x052D98 $8D88: C-----  00       BRK  
  0x052D99 $8D89: C-----  00       BRK  
  0x052D9A $8D8A: C-----  00       BRK  
  0x052D9B $8D8B: C-----  00       BRK  
  0x052D9C $8D8C: C-----  00       BRK  
  0x052D9D $8D8D: C-----  00       BRK  
  0x052D9E $8D8E: C-----  00       BRK  
  0x052D9F $8D8F: C-----  00       BRK  
  0x052DA0 $8D90: C-----  05 07    ORA  $07
  0x052DA2 $8D92: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052DA3 $8D93: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052DA4 $8D94: C-----  01 00    ORA  ($00,X)
  0x052DA6 $8D96: C-----  00       BRK  
  0x052DA7 $8D97: C-----  00       BRK  
  0x052DA8 $8D98: C-----  00       BRK  
  0x052DA9 $8D99: C-----  00       BRK  
  0x052DAA $8D9A: C-----  00       BRK  
  0x052DAB $8D9B: C-----  00       BRK  
  0x052DAC $8D9C: C-----  00       BRK  
  0x052DAD $8D9D: C-----  00       BRK  
  0x052DAE $8D9E: C-----  00       BRK  
  0x052DAF $8D9F: C-----  00       BRK  
  0x052DB0 $8DA0: C-----  08       PHP  
  0x052DB1 $8DA1: C-----  00       BRK  
  0x052DB2 $8DA2: C-----  00       BRK  
  0x052DB3 $8DA3: C-----  00       BRK  
  0x052DB4 $8DA4: C-----  00       BRK  
  0x052DB5 $8DA5: C-----  00       BRK  
  0x052DB6 $8DA6: C-----  00       BRK  
  0x052DB7 $8DA7: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x052DB8 $8DA8: C-----  00       BRK  
  0x052DB9 $8DA9: C-----  00       BRK  
  0x052DBA $8DAA: C-----  00       BRK  
  0x052DBB $8DAB: C-----  00       BRK  
  0x052DBC $8DAC: C-----  00       BRK  
  0x052DBD $8DAD: C-----  00       BRK  
  0x052DBE $8DAE: C-----  00       BRK  
  0x052DBF $8DAF: C-----  00       BRK  
  0x052DC0 $8DB0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052DC1 $8DB1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052DC2 $8DB2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052DC3 $8DB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052DC4 $8DB4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052DC5 $8DB5: C-----  FE FC F8 INC  $F8FC,X
  0x052DC8 $8DB8: C-----  00       BRK  
  0x052DC9 $8DB9: C-----  00       BRK  
  0x052DCA $8DBA: C-----  00       BRK  
  0x052DCB $8DBB: C-----  00       BRK  
  0x052DCC $8DBC: C-----  00       BRK  
  0x052DCD $8DBD: C-----  00       BRK  
  0x052DCE $8DBE: C-----  00       BRK  
  0x052DCF $8DBF: C-----  00       BRK  
  0x052DD0 $8DC0: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052DD1 $8DC1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052DD2 $8DC2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052DD3 $8DC3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052DD4 $8DC4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x052DD5 $8DC5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052DD6 $8DC6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052DD7 $8DC7: C-----  01 00    ORA  ($00,X)
  0x052DD9 $8DC9: C-----  00       BRK  
  0x052DDA $8DCA: C-----  00       BRK  
  0x052DDB $8DCB: C-----  00       BRK  
  0x052DDC $8DCC: C-----  00       BRK  
  0x052DDD $8DCD: C-----  00       BRK  
  0x052DDE $8DCE: C-----  00       BRK  
  0x052DDF $8DCF: C-----  00       BRK  
  0x052DE0 $8DD0: C-----  E0 C0    CPX  #$C0
  0x052DE2 $8DD2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052DE3 $8DD3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052DE4 $8DD4: C-----  00       BRK  
  0x052DE5 $8DD5: C-----  00       BRK  
  0x052DE6 $8DD6: C-----  00       BRK  
  0x052DE7 $8DD7: C-----  00       BRK  
  0x052DE8 $8DD8: C-----  00       BRK  
  0x052DE9 $8DD9: C-----  00       BRK  
  0x052DEA $8DDA: C-----  00       BRK  
  0x052DEB $8DDB: C-----  00       BRK  
  0x052DEC $8DDC: C-----  00       BRK  
  0x052DED $8DDD: C-----  00       BRK  
  0x052DEE $8DDE: C-----  00       BRK  
  0x052DEF $8DDF: C-----  00       BRK  
  0x052DF0 $8DE0: C-----  00       BRK  
  0x052DF1 $8DE1: C-----  70 F8    BVS  $8DDB
  0x052DF3 $8DE3: C-----  FE FF FF INC  $FFFF,X
  0x052DF6 $8DE6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052DF7 $8DE7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052DF8 $8DE8: C-----  00       BRK  
  0x052DF9 $8DE9: C-----  00       BRK  
  0x052DFA $8DEA: C-----  00       BRK  
  0x052DFB $8DEB: C-----  00       BRK  
  0x052DFC $8DEC: C-----  00       BRK  
  0x052DFD $8DED: C-----  00       BRK  
  0x052DFE $8DEE: C-----  00       BRK  
  0x052DFF $8DEF: C-----  00       BRK  
  0x052E00 $8DF0: C-----  00       BRK  
  0x052E01 $8DF1: C-----  00       BRK  
  0x052E02 $8DF2: C-----  00       BRK  
  0x052E03 $8DF3: C-----  00       BRK  
  0x052E04 $8DF4: C-----  00       BRK  
  0x052E05 $8DF5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x052E06 $8DF6: C-----  C0 F0    CPY  #$F0
  0x052E08 $8DF8: C-----  00       BRK  
  0x052E09 $8DF9: C-----  00       BRK  
  0x052E0A $8DFA: C-----  00       BRK  
  0x052E0B $8DFB: C-----  00       BRK  
  0x052E0C $8DFC: C-----  00       BRK  
  0x052E0D $8DFD: C-----  00       BRK  
  0x052E0E $8DFE: C-----  00       BRK  
  0x052E0F $8DFF: C-----  00       BRK  
  0x052E10 $8E00: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052E11 $8E01: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052E12 $8E02: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052E13 $8E03: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052E14 $8E04: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052E15 $8E05: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052E16 $8E06: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052E17 $8E07: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052E18 $8E08: C-----  00       BRK  
  0x052E19 $8E09: C-----  00       BRK  
  0x052E1A $8E0A: C-----  00       BRK  
  0x052E1B $8E0B: C-----  00       BRK  
  0x052E1C $8E0C: C-----  00       BRK  
  0x052E1D $8E0D: C-----  00       BRK  
  0x052E1E $8E0E: C-----  00       BRK  
  0x052E1F $8E0F: C-----  00       BRK  
  0x052E20 $8E10: C-----  FE FF FE INC  $FEFF,X
  0x052E23 $8E13: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x052E24 $8E14: C-----  F8       SED  
  0x052E25 $8E15: C-----  F8       SED  
  0x052E26 $8E16: C-----  F8       SED  
  0x052E27 $8E17: C-----  F8       SED  
  0x052E28 $8E18: C-----  00       BRK  
  0x052E29 $8E19: C-----  00       BRK  
  0x052E2A $8E1A: C-----  00       BRK  
  0x052E2B $8E1B: C-----  00       BRK  
  0x052E2C $8E1C: C-----  00       BRK  
  0x052E2D $8E1D: C-----  00       BRK  
  0x052E2E $8E1E: C-----  00       BRK  
  0x052E2F $8E1F: C-----  00       BRK  
  0x052E30 $8E20: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x052E31 $8E21: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052E32 $8E22: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052E33 $8E23: C-----  01 01    ORA  ($01,X)
  0x052E35 $8E25: C-----  01 80    ORA  ($80,X)
  0x052E37 $8E27: C-----  C0 00    CPY  #$00
  0x052E39 $8E29: C-----  00       BRK  
  0x052E3A $8E2A: C-----  00       BRK  
  0x052E3B $8E2B: C-----  00       BRK  
  0x052E3C $8E2C: C-----  00       BRK  
  0x052E3D $8E2D: C-----  00       BRK  
  0x052E3E $8E2E: C-----  00       BRK  
  0x052E3F $8E2F: C-----  00       BRK  
  0x052E40 $8E30: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x052E41 $8E31: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x052E42 $8E32: C-----  FE FF FF INC  $FFFF,X
  0x052E45 $8E35: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052E46 $8E36: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052E47 $8E37: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052E48 $8E38: C-----  00       BRK  
  0x052E49 $8E39: C-----  00       BRK  
  0x052E4A $8E3A: C-----  00       BRK  
  0x052E4B $8E3B: C-----  00       BRK  
  0x052E4C $8E3C: C-----  00       BRK  
  0x052E4D $8E3D: C-----  00       BRK  
  0x052E4E $8E3E: C-----  00       BRK  
  0x052E4F $8E3F: C-----  00       BRK  
  0x052E50 $8E40: C-----  00       BRK  
  0x052E51 $8E41: C-----  00       BRK  
  0x052E52 $8E42: C-----  00       BRK  
  0x052E53 $8E43: C-----  01 03    ORA  ($03,X)
  0x052E55 $8E45: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x052E56 $8E46: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052E57 $8E47: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052E58 $8E48: C-----  00       BRK  
  0x052E59 $8E49: C-----  00       BRK  
  0x052E5A $8E4A: C-----  00       BRK  
  0x052E5B $8E4B: C-----  00       BRK  
  0x052E5C $8E4C: C-----  00       BRK  
  0x052E5D $8E4D: C-----  00       BRK  
  0x052E5E $8E4E: C-----  00       BRK  
  0x052E5F $8E4F: C-----  00       BRK  
  0x052E60 $8E50: C-----  F0 F0    BEQ  $8E42
  0x052E62 $8E52: C-----  F8       SED  
  0x052E63 $8E53: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x052E64 $8E54: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x052E65 $8E55: C-----  FE FF FF INC  $FFFF,X
  0x052E68 $8E58: C-----  00       BRK  
  0x052E69 $8E59: C-----  00       BRK  
  0x052E6A $8E5A: C-----  00       BRK  
  0x052E6B $8E5B: C-----  00       BRK  
  0x052E6C $8E5C: C-----  00       BRK  
  0x052E6D $8E5D: C-----  00       BRK  
  0x052E6E $8E5E: C-----  00       BRK  
  0x052E6F $8E5F: C-----  00       BRK  
  0x052E70 $8E60: C-----  10 10    BPL  $8E72
  0x052E72 $8E62: C-----  08       PHP  
  0x052E73 $8E63: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x052E74 $8E64: C-----  84 C2    STY  $C2
  0x052E76 $8E66: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x052E77 $8E67: C-----  F1 00    SBC  ($00),Y
  0x052E79 $8E69: C-----  00       BRK  
  0x052E7A $8E6A: C-----  00       BRK  
  0x052E7B $8E6B: C-----  00       BRK  
  0x052E7C $8E6C: C-----  00       BRK  
  0x052E7D $8E6D: C-----  00       BRK  
  0x052E7E $8E6E: C-----  00       BRK  
  0x052E7F $8E6F: C-----  00       BRK  
  0x052E80 $8E70: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052E81 $8E71: C-----  01 01    ORA  ($01,X)
  0x052E83 $8E73: C-----  01 01    ORA  ($01,X)
  0x052E85 $8E75: C-----  00       BRK  
  0x052E86 $8E76: C-----  00       BRK  
  0x052E87 $8E77: C-----  00       BRK  
  0x052E88 $8E78: C-----  00       BRK  
  0x052E89 $8E79: C-----  00       BRK  
  0x052E8A $8E7A: C-----  00       BRK  
  0x052E8B $8E7B: C-----  00       BRK  
  0x052E8C $8E7C: C-----  00       BRK  
  0x052E8D $8E7D: C-----  00       BRK  
  0x052E8E $8E7E: C-----  00       BRK  
  0x052E8F $8E7F: C-----  00       BRK  
  0x052E90 $8E80: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052E91 $8E81: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052E92 $8E82: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052E93 $8E83: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052E94 $8E84: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052E95 $8E85: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052E96 $8E86: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052E97 $8E87: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052E98 $8E88: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052E99 $8E89: C-----  00       BRK  
  0x052E9A $8E8A: C-----  00       BRK  
  0x052E9B $8E8B: C-----  00       BRK  
  0x052E9C $8E8C: C-----  00       BRK  
  0x052E9D $8E8D: C-----  00       BRK  
  0x052E9E $8E8E: C-----  00       BRK  
  0x052E9F $8E8F: C-----  00       BRK  
  0x052EA0 $8E90: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EA1 $8E91: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EA2 $8E92: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EA3 $8E93: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EA4 $8E94: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EA5 $8E95: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EA6 $8E96: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EA7 $8E97: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EA8 $8E98: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EA9 $8E99: C-----  30 0C    BMI  $8EA7
  0x052EAB $8E9B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052EAC $8E9C: C-----  00       BRK  
  0x052EAD $8E9D: C-----  00       BRK  
  0x052EAE $8E9E: C-----  00       BRK  
  0x052EAF $8E9F: C-----  00       BRK  
  0x052EB0 $8EA0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EB1 $8EA1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EB2 $8EA2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EB3 $8EA3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EB4 $8EA4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EB5 $8EA5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EB6 $8EA6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EB7 $8EA7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EB8 $8EA8: C-----  C0 30    CPY  #$30
  0x052EBA $8EAA: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x052EBB $8EAB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052EBC $8EAC: C-----  00       BRK  
  0x052EBD $8EAD: C-----  00       BRK  
  0x052EBE $8EAE: C-----  00       BRK  
  0x052EBF $8EAF: C-----  00       BRK  
  0x052EC0 $8EB0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EC1 $8EB1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EC2 $8EB2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EC3 $8EB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EC4 $8EB4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EC5 $8EB5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EC6 $8EB6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EC7 $8EB7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EC8 $8EB8: C-----  00       BRK  
  0x052EC9 $8EB9: C-----  00       BRK  
  0x052ECA $8EBA: C-----  00       BRK  
  0x052ECB $8EBB: C-----  00       BRK  
  0x052ECC $8EBC: C-----  C0 30    CPY  #$30
  0x052ECE $8EBE: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x052ECF $8EBF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052ED0 $8EC0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052ED1 $8EC1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052ED2 $8EC2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052ED3 $8EC3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052ED4 $8EC4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052ED5 $8EC5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052ED6 $8EC6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052ED7 $8EC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052ED8 $8EC8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052ED9 $8EC9: C-----  00       BRK  
  0x052EDA $8ECA: C-----  00       BRK  
  0x052EDB $8ECB: C-----  00       BRK  
  0x052EDC $8ECC: C-----  C0 30    CPY  #$30
  0x052EDE $8ECE: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x052EDF $8ECF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052EE0 $8ED0: C-----  6D 73 6F ADC  $6F73
  0x052EE3 $8ED3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052EE4 $8ED4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052EE5 $8ED5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052EE6 $8ED6: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052EE7 $8ED7: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052EE8 $8ED8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EE9 $8ED9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EEA $8EDA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EEB $8EDB: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x052EEC $8EDC: C-----  F8       SED  
  0x052EED $8EDD: C-----  F0 E0    BEQ  $8EBF
  0x052EEF $8EDF: C-----  C0 77    CPY  #$77
  0x052EF1 $8EE1: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x052EF2 $8EE2: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x052EF3 $8EE3: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x052EF4 $8EE4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052EF5 $8EE5: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x052EF6 $8EE6: C-----  75 6B    ADC  $6B,X
  0x052EF8 $8EE8: C-----  FD EF F5 SBC  $F5EF,X
  0x052EFB $8EEB: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x052EFC $8EEC: C-----  F5 FF    SBC  $FF,X
  0x052EFE $8EEE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052EFF $8EEF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F00 $8EF0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F01 $8EF1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F02 $8EF2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F03 $8EF3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F04 $8EF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F05 $8EF5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F06 $8EF6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F07 $8EF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F08 $8EF8: C-----  00       BRK  
  0x052F09 $8EF9: C-----  00       BRK  
  0x052F0A $8EFA: C-----  00       BRK  
  0x052F0B $8EFB: C-----  00       BRK  
  0x052F0C $8EFC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052F0D $8EFD: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x052F0E $8EFE: C-----  30 C0    BMI  $8EC0
  0x052F10 $8F00: C-----  EA       NOP  
  0x052F11 $8F01: C-----  5D FB 57 EOR  $57FB,X
  0x052F14 $8F04: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x052F15 $8F05: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F16 $8F06: C-----  AA       TAX  
  0x052F17 $8F07: C-----  55 BE    EOR  $BE,X
  0x052F19 $8F09: C-----  75 AE    ADC  $AE,X
  0x052F1B $8F0B: C-----  F5 AA    SBC  $AA,X
  0x052F1D $8F0D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F1E $8F0E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F1F $8F0F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F20 $8F10: ------  .byte $EE
  0x052F21 $8F11: ------  .byte $DE
  0x052F22 $8F12: ------  .byte $EE
  0x052F23 $8F13: ------  .byte $D6
  0x052F24 $8F14: ------  .byte $FE
  0x052F25 $8F15: ------  .byte $F6
  0x052F26 $8F16: ------  .byte $AE
  0x052F27 $8F17: ------  .byte $D6
  0x052F28 $8F18: ------  .byte $BF
  0x052F29 $8F19: ------  .byte $F7
  0x052F2A $8F1A: ------  .byte $AF
  0x052F2B $8F1B: ------  .byte $F7
  0x052F2C $8F1C: ------  .byte $AF
  0x052F2D $8F1D: ------  .byte $FF
  0x052F2E $8F1E: ------  .byte $FF
  0x052F2F $8F1F: ------  .byte $FF
  0x052F30 $8F20: C-----  AA       TAX  
  0x052F31 $8F21: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F32 $8F22: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F33 $8F23: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F34 $8F24: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F35 $8F25: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F36 $8F26: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F37 $8F27: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F38 $8F28: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F39 $8F29: C-----  55 FF    EOR  $FF,X
  0x052F3B $8F2B: C-----  00       BRK  
  0x052F3C $8F2C: C-----  00       BRK  
  0x052F3D $8F2D: C-----  00       BRK  
  0x052F3E $8F2E: C-----  00       BRK  
  0x052F3F $8F2F: C-----  00       BRK  
  0x052F40 $8F30: C-----  B6 CE    LDX  $CE,Y
  0x052F42 $8F32: C-----  F6 FE    INC  $FE,X
  0x052F44 $8F34: C-----  FE FE FE INC  $FEFE,X
  0x052F47 $8F37: C-----  FE FF FF INC  $FFFF,X
  0x052F4A $8F3A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F4B $8F3B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052F4C $8F3C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x052F4D $8F3D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052F4E $8F3E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x052F4F $8F3F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052F50 $8F40: ------  .byte $EB
  0x052F51 $8F41: ------  .byte $5E
  0x052F52 $8F42: ------  .byte $FA
  0x052F53 $8F43: ------  .byte $54
  0x052F54 $8F44: ------  .byte $F8
  0x052F55 $8F45: ------  .byte $F0
  0x052F56 $8F46: ------  .byte $A0
  0x052F57 $8F47: ------  .byte $44
  0x052F58 $8F48: ------  .byte $BE
  0x052F59 $8F49: ------  .byte $74
  0x052F5A $8F4A: ------  .byte $AE
  0x052F5B $8F4B: ------  .byte $F4
  0x052F5C $8F4C: ------  .byte $A8
  0x052F5D $8F4D: ------  .byte $F0
  0x052F5E $8F4E: ------  .byte $E4
  0x052F5F $8F4F: ------  .byte $CC
  0x052F60 $8F50: ------  .byte $EA
  0x052F61 $8F51: ------  .byte $5D
  0x052F62 $8F52: ------  .byte $7B
  0x052F63 $8F53: ------  .byte $17
  0x052F64 $8F54: ------  .byte $0A
  0x052F65 $8F55: ------  .byte $07
  0x052F66 $8F56: ------  .byte $22
  0x052F67 $8F57: ------  .byte $05
  0x052F68 $8F58: ------  .byte $BE
  0x052F69 $8F59: ------  .byte $75
  0x052F6A $8F5A: ------  .byte $2E
  0x052F6B $8F5B: ------  .byte $15
  0x052F6C $8F5C: ------  .byte $0A
  0x052F6D $8F5D: ------  .byte $0F
  0x052F6E $8F5E: ------  .byte $27
  0x052F6F $8F5F: ------  .byte $27
  0x052F70 $8F60: ------  .byte $A8
  0x052F71 $8F61: ------  .byte $FC
  0x052F72 $8F62: ------  .byte $F9
  0x052F73 $8F63: ------  .byte $F9
  0x052F74 $8F64: ------  .byte $F9
  0x052F75 $8F65: ------  .byte $F3
  0x052F76 $8F66: ------  .byte $F3
  0x052F77 $8F67: ------  .byte $F3
  0x052F78 $8F68: ------  .byte $FC
  0x052F79 $8F69: ------  .byte $54
  0x052F7A $8F6A: ------  .byte $F9
  0x052F7B $8F6B: ------  .byte $00
  0x052F7C $8F6C: ------  .byte $00
  0x052F7D $8F6D: ------  .byte $00
  0x052F7E $8F6E: ------  .byte $00
  0x052F7F $8F6F: ------  .byte $00
  0x052F80 $8F70: ------  .byte $2A
  0x052F81 $8F71: ------  .byte $3F
  0x052F82 $8F72: ------  .byte $3F
  0x052F83 $8F73: ------  .byte $BF
  0x052F84 $8F74: ------  .byte $9F
  0x052F85 $8F75: ------  .byte $DF
  0x052F86 $8F76: ------  .byte $CF
  0x052F87 $8F77: ------  .byte $CF
  0x052F88 $8F78: ------  .byte $3F
  0x052F89 $8F79: ------  .byte $15
  0x052F8A $8F7A: ------  .byte $3F
  0x052F8B $8F7B: ------  .byte $00
  0x052F8C $8F7C: ------  .byte $00
  0x052F8D $8F7D: ------  .byte $00
  0x052F8E $8F7E: ------  .byte $00
  0x052F8F $8F7F: ------  .byte $00
  0x052F90 $8F80: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F91 $8F81: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F92 $8F82: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F93 $8F83: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F94 $8F84: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F95 $8F85: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F96 $8F86: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F97 $8F87: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F98 $8F88: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052F99 $8F89: C-----  00       BRK  
  0x052F9A $8F8A: C-----  00       BRK  
  0x052F9B $8F8B: C-----  00       BRK  
  0x052F9C $8F8C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052F9D $8F8D: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x052F9E $8F8E: C-----  30 C0    BMI  $8F50
  0x052FA0 $8F90: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052FA1 $8F91: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052FA2 $8F92: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052FA3 $8F93: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052FA4 $8F94: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052FA5 $8F95: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052FA6 $8F96: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052FA7 $8F97: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052FA8 $8F98: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052FA9 $8F99: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x052FAA $8F9A: C-----  30 C0    BMI  $8F5C
  0x052FAC $8F9C: C-----  00       BRK  
  0x052FAD $8F9D: C-----  00       BRK  
  0x052FAE $8F9E: C-----  00       BRK  
  0x052FAF $8F9F: C-----  00       BRK  
  0x052FB0 $8FA0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052FB1 $8FA1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052FB2 $8FA2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052FB3 $8FA3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052FB4 $8FA4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052FB5 $8FA5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052FB6 $8FA6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052FB7 $8FA7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052FB8 $8FA8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x052FB9 $8FA9: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x052FBA $8FAA: C-----  30 C0    BMI  $8F6C
  0x052FBC $8FAC: C-----  00       BRK  
  0x052FBD $8FAD: C-----  00       BRK  
  0x052FBE $8FAE: C-----  00       BRK  
  0x052FBF $8FAF: C-----  00       BRK  
  0x052FC0 $8FB0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052FC1 $8FB1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052FC2 $8FB2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052FC3 $8FB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052FC4 $8FB4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052FC5 $8FB5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052FC6 $8FB6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052FC7 $8FB7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x052FC8 $8FB8: C-----  00       BRK  
  0x052FC9 $8FB9: C-----  00       BRK  
  0x052FCA $8FBA: C-----  00       BRK  
  0x052FCB $8FBB: C-----  00       BRK  
  0x052FCC $8FBC: C-----  00       BRK  
  0x052FCD $8FBD: C-----  00       BRK  
  0x052FCE $8FBE: C-----  00       BRK  
  0x052FCF $8FBF: C-----  00       BRK  
  0x052FD0 $8FC0: C-----  00       BRK  
  0x052FD1 $8FC1: C-----  01 07    ORA  ($07,X)
  0x052FD3 $8FC3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x052FD4 $8FC4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x052FD5 $8FC5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x052FD6 $8FC6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052FD7 $8FC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x052FD8 $8FC8: C-----  00       BRK  
  0x052FD9 $8FC9: C-----  00       BRK  
  0x052FDA $8FCA: C-----  00       BRK  
  0x052FDB $8FCB: C-----  00       BRK  
  0x052FDC $8FCC: C-----  00       BRK  
  0x052FDD $8FCD: C-----  00       BRK  
  0x052FDE $8FCE: C-----  00       BRK  
  0x052FDF $8FCF: C-----  00       BRK  
  0x052FE0 $8FD0: C-----  00       BRK  
  0x052FE1 $8FD1: C-----  00       BRK  
  0x052FE2 $8FD2: C-----  C0 E0    CPY  #$E0
  0x052FE4 $8FD4: C-----  F0 F0    BEQ  $8FC6
  0x052FE6 $8FD6: C-----  F8       SED  
  0x052FE7 $8FD7: C-----  F0 00    BEQ  $8FD9
  0x052FE9 $8FD9: C-----  00       BRK  
  0x052FEA $8FDA: C-----  00       BRK  
  0x052FEB $8FDB: C-----  00       BRK  
  0x052FEC $8FDC: C-----  00       BRK  
  0x052FED $8FDD: C-----  00       BRK  
  0x052FEE $8FDE: C-----  00       BRK  
  0x052FEF $8FDF: C-----  00       BRK  
  0x052FF0 $8FE0: ------  .byte $00
  0x052FF1 $8FE1: ------  .byte $7E
  0x052FF2 $8FE2: ------  .byte $42
  0x052FF3 $8FE3: ------  .byte $42
  0x052FF4 $8FE4: ------  .byte $42
  0x052FF5 $8FE5: ------  .byte $42
  0x052FF6 $8FE6: ------  .byte $7E
  0x052FF7 $8FE7: ------  .byte $00
  0x052FF8 $8FE8: ------  .byte $00
  0x052FF9 $8FE9: ------  .byte $7E
  0x052FFA $8FEA: ------  .byte $42
  0x052FFB $8FEB: ------  .byte $42
  0x052FFC $8FEC: ------  .byte $42
  0x052FFD $8FED: ------  .byte $42
  0x052FFE $8FEE: ------  .byte $7E
  0x052FFF $8FEF: ------  .byte $00
  0x053000 $8FF0: ------  .byte $00
  0x053001 $8FF1: ------  .byte $7E
  0x053002 $8FF2: ------  .byte $42
  0x053003 $8FF3: ------  .byte $42
  0x053004 $8FF4: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x053005 $8FF5: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x053006 $8FF6: C-----  7E 00 00 ROR  $0000,X
  0x053009 $8FF9: ------  .byte $7E
  0x05300A $8FFA: ------  .byte $42
  0x05300B $8FFB: ------  .byte $42
  0x05300C $8FFC: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x05300D $8FFD: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x05300E $8FFE: C-----  7E 00 00 ROR  $0000,X
  0x053011 $9001: C-----  00       BRK  
  0x053012 $9002: C-----  00       BRK  
  0x053013 $9003: C-----  00       BRK  
  0x053014 $9004: C-----  00       BRK  
  0x053015 $9005: C-----  00       BRK  
  0x053016 $9006: C-----  00       BRK  
  0x053017 $9007: C-----  00       BRK  
  0x053018 $9008: C-----  00       BRK  
  0x053019 $9009: C-----  00       BRK  
  0x05301A $900A: C-----  00       BRK  
  0x05301B $900B: C-----  00       BRK  
  0x05301C $900C: C-----  00       BRK  
  0x05301D $900D: C-----  00       BRK  
  0x05301E $900E: C-----  00       BRK  
  0x05301F $900F: C-----  00       BRK  
  0x053020 $9010: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053021 $9011: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053022 $9012: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053023 $9013: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053024 $9014: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053025 $9015: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053026 $9016: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053027 $9017: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053028 $9018: C-----  00       BRK  
  0x053029 $9019: C-----  00       BRK  
  0x05302A $901A: C-----  00       BRK  
  0x05302B $901B: C-----  00       BRK  
  0x05302C $901C: C-----  00       BRK  
  0x05302D $901D: C-----  00       BRK  
  0x05302E $901E: C-----  00       BRK  
  0x05302F $901F: C-----  00       BRK  
  0x053030 $9020: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053031 $9021: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053032 $9022: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053033 $9023: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053034 $9024: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053035 $9025: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053036 $9026: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053037 $9027: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053038 $9028: C-----  01 03    ORA  ($03,X)
  0x05303A $902A: C-----  05 09    ORA  $09
  0x05303C $902C: C-----  11 21    ORA  ($21),Y
  0x05303E $902E: C-----  41 81    EOR  ($81,X)
  0x053040 $9030: C-----  F0 F0    BEQ  $9022
  0x053042 $9032: C-----  F0 F0    BEQ  $9024
  0x053044 $9034: C-----  F8       SED  
  0x053045 $9035: C-----  F8       SED  
  0x053046 $9036: C-----  F8       SED  
  0x053047 $9037: C-----  F8       SED  
  0x053048 $9038: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053049 $9039: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05304A $903A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05304B $903B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05304C $903C: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x05304D $903D: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x05304E $903E: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x05304F $903F: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x053050 $9040: C-----  FE FE FE INC  $FEFE,X
  0x053053 $9043: C-----  FE FE FE INC  $FEFE,X
  0x053056 $9046: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053057 $9047: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053058 $9048: C-----  01 03    ORA  ($03,X)
  0x05305A $904A: C-----  05 09    ORA  $09
  0x05305C $904C: C-----  11 21    ORA  ($21),Y
  0x05305E $904E: C-----  40       RTI  
  0x05305F $904F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053060 $9050: C-----  01 01    ORA  ($01,X)
  0x053062 $9052: C-----  01 01    ORA  ($01,X)
  0x053064 $9054: C-----  81 80    STA  ($80,X)
  0x053066 $9056: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053067 $9057: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053068 $9058: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053069 $9059: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05306A $905A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05306B $905B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05306C $905C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05306D $905D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05306E $905E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05306F $905F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053070 $9060: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053071 $9061: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053072 $9062: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053073 $9063: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053074 $9064: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053075 $9065: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053076 $9066: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x053077 $9067: C-----  3D E0 E0 AND  $E0E0,X
  0x05307A $906A: C-----  E0 E0    CPX  #$E0
  0x05307C $906C: C-----  F0 F8    BEQ  $9066
  0x05307E $906E: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x05307F $906F: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x053080 $9070: C-----  F0 F8    BEQ  $906A
  0x053082 $9072: C-----  F8       SED  
  0x053083 $9073: C-----  F6 EF    INC  $EF,X
  0x053085 $9075: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053086 $9076: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053087 $9077: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053088 $9078: C-----  00       BRK  
  0x053089 $9079: C-----  00       BRK  
  0x05308A $907A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05308B $907B: C-----  08       PHP  
  0x05308C $907C: C-----  10 20    BPL  $909E
  0x05308E $907E: C-----  40       RTI  
  0x05308F $907F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053090 $9080: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053091 $9081: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053092 $9082: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053093 $9083: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053094 $9084: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053095 $9085: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053096 $9086: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053097 $9087: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053098 $9088: C-----  81 82    STA  ($82,X)
  0x05309A $908A: C-----  84 88    STY  $88
  0x05309C $908C: C-----  90 A0    BCC  $902E
  0x05309E $908E: C-----  C0 80    CPY  #$80
  0x0530A0 $9090: C-----  F8       SED  
  0x0530A1 $9091: C-----  F8       SED  
  0x0530A2 $9092: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0530A3 $9093: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0530A4 $9094: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0530A5 $9095: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0530A6 $9096: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0530A7 $9097: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0530A8 $9098: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0530A9 $9099: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0530AA $909A: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0530AB $909B: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x0530AC $909C: C-----  !!UNDEF $93  ; unknown opcode, treating as data
  0x0530AD $909D: C-----  !!UNDEF $A3  ; unknown opcode, treating as data
  0x0530AE $909E: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0530AF $909F: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x0530B0 $90A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0530B1 $90A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0530B2 $90A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0530B3 $90A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0530B4 $90A4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0530B5 $90A5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0530B6 $90A6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0530B7 $90A7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0530B8 $90A8: C-----  41 42    EOR  ($42,X)
  0x0530BA $90AA: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0530BB $90AB: C-----  48       PHA  
  0x0530BC $90AC: C-----  50 60    BVC  $910E
  0x0530BE $90AE: C-----  40       RTI  
  0x0530BF $90AF: C-----  C0 FE    CPY  #$FE
  0x0530C1 $90B1: C-----  FE FE FE INC  $FEFE,X
  0x0530C4 $90B4: C-----  FE FE FF INC  $FFFE,X
  0x0530C7 $90B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0530C8 $90B8: C-----  41 43    EOR  ($43,X)
  0x0530CA $90BA: C-----  45 49    EOR  $49
  0x0530CC $90BC: C-----  51 61    EOR  ($61),Y
  0x0530CE $90BE: C-----  40       RTI  
  0x0530CF $90BF: C-----  C0 3E    CPY  #$3E
  0x0530D1 $90C1: C-----  3D 3B 3F AND  $3F3B,X
  0x0530D4 $90C4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0530D5 $90C5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0530D6 $90C6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0530D7 $90C7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0530D8 $90C8: C-----  F9 FA FC SBC  $FCFA,Y
  0x0530DB $90CB: C-----  F8       SED  
  0x0530DC $90CC: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0530DD $90CD: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0530DE $90CE: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0530DF $90CF: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0530E0 $90D0: C-----  7E BD DB ROR  $DBBD,X
  0x0530E3 $90D3: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x0530E4 $90D4: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x0530E5 $90D5: C-----  DD BE 7F CMP  $7FBE,X
  0x0530E8 $90D8: C-----  81 42    STA  ($42,X)
  0x0530EA $90DA: C-----  24 18    BIT  $18
  0x0530EC $90DC: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0530ED $90DD: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0530EE $90DE: C-----  41 80    EOR  ($80,X)
  0x0530F0 $90E0: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0530F1 $90E1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0530F2 $90E2: C-----  0E 0F 0F ASL  $0F0F
  0x0530F5 $90E5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0530F6 $90E6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0530F7 $90E7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0530F8 $90E8: C-----  FE FE FF INC  $FFFE,X
  0x0530FB $90EB: C-----  FE FF FF INC  $FFFF,X
  0x0530FE $90EE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0530FF $90EF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053100 $90F0: C-----  FE FD FB INC  $FBFD,X
  0x053103 $90F3: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053104 $90F4: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x053105 $90F5: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x053106 $90F6: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x053107 $90F7: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x053108 $90F8: C-----  01 02    ORA  ($02,X)
  0x05310A $90FA: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05310B $90FB: C-----  88       DEY  
  0x05310C $90FC: C-----  50 30    BVC  $912E
  0x05310E $90FE: C-----  48       PHA  
  0x05310F $90FF: C-----  84 80    STY  $80
  0x053111 $9101: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053112 $9102: C-----  C0 C0    CPY  #$C0
  0x053114 $9104: C-----  C0 C0    CPY  #$C0
  0x053116 $9106: C-----  C0 C0    CPY  #$C0
  0x053118 $9108: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053119 $9109: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05311A $910A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05311B $910B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05311C $910C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05311D $910D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05311E $910E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05311F $910F: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053120 $9110: C-----  E0 E0    CPX  #$E0
  0x053122 $9112: C-----  E0 E0    CPX  #$E0
  0x053124 $9114: C-----  E0 E0    CPX  #$E0
  0x053126 $9116: C-----  F0 F0    BEQ  $9108
  0x053128 $9118: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053129 $9119: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05312A $911A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05312B $911B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05312C $911C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05312D $911D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05312E $911E: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x05312F $911F: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x053130 $9120: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053131 $9121: C-----  01 00    ORA  ($00,X)
  0x053133 $9123: C-----  00       BRK  
  0x053134 $9124: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053135 $9125: C-----  C0 A0    CPY  #$A0
  0x053137 $9127: C-----  70 03    BVS  $912C
  0x053139 $9129: C-----  01 00    ORA  ($00,X)
  0x05313B $912B: C-----  00       BRK  
  0x05313C $912C: C-----  00       BRK  
  0x05313D $912D: C-----  00       BRK  
  0x05313E $912E: C-----  40       RTI  
  0x05313F $912F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053140 $9130: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053141 $9131: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053142 $9132: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053143 $9133: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053144 $9134: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053145 $9135: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053146 $9136: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053147 $9137: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053148 $9138: C-----  00       BRK  
  0x053149 $9139: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05314A $913A: C-----  C0 60    CPY  #$60
  0x05314C $913C: C-----  30 18    BMI  $9156
  0x05314E $913E: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05314F $913F: C-----  06 F8    ASL  $F8
  0x053151 $9141: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053152 $9142: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053153 $9143: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053154 $9144: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053155 $9145: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053156 $9146: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x053157 $9147: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x053158 $9148: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053159 $9149: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05315A $914A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05315B $914B: C-----  08       PHP  
  0x05315C $914C: C-----  90 E0    BCC  $912E
  0x05315E $914E: C-----  78       SEI  
  0x05315F $914F: C-----  4E FE FD LSR  $FDFE
  0x053162 $9152: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x053163 $9153: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x053164 $9154: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x053165 $9155: C-----  D9 BE 7F CMP  $7FBE,Y
  0x053168 $9158: C-----  01 02    ORA  ($02,X)
  0x05316A $915A: C-----  C4 38    CPY  $38
  0x05316C $915C: C-----  18       CLC  
  0x05316D $915D: C-----  26 41    ROL  $41
  0x05316F $915F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053170 $9160: C-----  7E 7E 7E ROR  $7E7E,X
  0x053173 $9163: C-----  7E 3E 4E ROR  $4E3E,X
  0x053176 $9166: C-----  70 7E    BVS  $91E6
  0x053178 $9168: C-----  81 81    STA  ($81,X)
  0x05317A $916A: C-----  81 81    STA  ($81,X)
  0x05317C $916C: C-----  C1 B1    CMP  ($B1,X)
  0x05317E $916E: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x05317F $916F: C-----  81 FE    STA  ($FE,X)
  0x053181 $9171: C-----  FD FB FF SBC  $FFFB,X
  0x053184 $9174: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053185 $9175: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053186 $9176: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053187 $9177: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x053188 $9178: C-----  81 62    STA  ($62,X)
  0x05318A $917A: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x05318B $917B: C-----  06 05    ASL  $05
  0x05318D $917D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05318E $917E: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05318F $917F: C-----  84 FC    STY  $FC
  0x053191 $9181: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053192 $9182: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053193 $9183: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053194 $9184: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053195 $9185: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053196 $9186: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053197 $9187: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053198 $9188: C-----  00       BRK  
  0x053199 $9189: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05319A $918A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05319B $918B: C-----  08       PHP  
  0x05319C $918C: C-----  10 20    BPL  $91AE
  0x05319E $918E: C-----  40       RTI  
  0x05319F $918F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0531A0 $9190: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0531A1 $9191: C-----  01 00    ORA  ($00,X)
  0x0531A3 $9193: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0531A4 $9194: C-----  C0 C0    CPY  #$C0
  0x0531A6 $9196: C-----  B0 78    BCS  $9210
  0x0531A8 $9198: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0531A9 $9199: C-----  01 00    ORA  ($00,X)
  0x0531AB $919B: C-----  00       BRK  
  0x0531AC $919C: C-----  00       BRK  
  0x0531AD $919D: C-----  20 40 80 JSR  $8040
  0x0531B0 $91A0: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x0531B1 $91A1: C-----  ED F3 F3 SBC  $F3F3
  0x0531B4 $91A4: C-----  EC DF BF CPX  $BFDF
  0x0531B7 $91A7: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0531B8 $91A8: C-----  61 12    ADC  ($12,X)
  0x0531BA $91AA: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0531BB $91AB: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0531BC $91AC: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0531BD $91AD: C-----  20 40 80 JSR  $8040
  0x0531C0 $91B0: C-----  FE FD FB INC  $FBFD,X
  0x0531C3 $91B3: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0531C4 $91B4: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0531C5 $91B5: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0531C6 $91B6: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0531C7 $91B7: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0531C8 $91B8: C-----  00       BRK  
  0x0531C9 $91B9: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0531CA $91BA: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0531CB $91BB: C-----  08       PHP  
  0x0531CC $91BC: C-----  10 A0    BPL  $915E
  0x0531CE $91BE: C-----  40       RTI  
  0x0531CF $91BF: C-----  A0 FD    LDY  #$FD
  0x0531D1 $91C1: C-----  FD FD FD SBC  $FDFD,X
  0x0531D4 $91C4: C-----  1D E5 F8 ORA  $F8E5,X
  0x0531D7 $91C7: C-----  FD 02 02 SBC  $0202,X
  0x0531DA $91CA: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0531DB $91CB: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0531DC $91CC: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x0531DD $91CD: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x0531DE $91CE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0531DF $91CF: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0531E0 $91D0: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x0531E1 $91D1: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x0531E2 $91D2: C-----  F0 F7    BEQ  $91CB
  0x0531E4 $91D4: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0531E5 $91D5: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0531E6 $91D6: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0531E7 $91D7: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x0531E8 $91D8: C-----  68       PLA  
  0x0531E9 $91D9: C-----  18       CLC  
  0x0531EA $91DA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0531EB $91DB: C-----  08       PHP  
  0x0531EC $91DC: C-----  08       PHP  
  0x0531ED $91DD: C-----  08       PHP  
  0x0531EE $91DE: C-----  08       PHP  
  0x0531EF $91DF: C-----  C8       INY  
  0x0531F0 $91E0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0531F1 $91E1: C-----  01 80    ORA  ($80,X)
  0x0531F3 $91E3: C-----  C0 E0    CPY  #$E0
  0x0531F5 $91E5: C-----  D0 B8    BNE  $919F
  0x0531F7 $91E7: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0531F8 $91E8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0531F9 $91E9: C-----  01 00    ORA  ($00,X)
  0x0531FB $91EB: C-----  00       BRK  
  0x0531FC $91EC: C-----  00       BRK  
  0x0531FD $91ED: C-----  20 40 80 JSR  $8040
  0x053200 $91F0: C-----  C6 E8    DEC  $E8
  0x053202 $91F2: C-----  EE EE EE INC  $EEEE
  0x053205 $91F5: C-----  EE 2E C6 INC  $C62E
  0x053208 $91F8: C-----  39 17 11 AND  $1117,Y
  0x05320B $91FB: C-----  11 11    ORA  ($11),Y
  0x05320D $91FD: C-----  11 D1    ORA  ($D1),Y
  0x05320F $91FF: C-----  39 FF FF AND  $FFFF,Y
  0x053212 $9202: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053213 $9203: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053214 $9204: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053215 $9205: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053216 $9206: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053217 $9207: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053218 $9208: C-----  21 22    AND  ($22,X)
  0x05321A $920A: C-----  24 28    BIT  $28
  0x05321C $920C: C-----  30 20    BMI  $922E
  0x05321E $920E: C-----  60       RTS  
  0x05321F $920F: C-----  A0 D8    LDY  #$D8
  0x053221 $9211: C-----  DD DD DD CMP  $DDDD,X
  0x053224 $9214: C-----  DD DD 1D CMP  $1DDD,X
  0x053227 $9217: C-----  C1 27    CMP  ($27,X)
  0x053229 $9219: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x05322A $921A: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x05322B $921B: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x05322C $921C: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x05322D $921D: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x05322E $921E: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x05322F $921F: C-----  3E FF FF ROL  $FFFF,X
  0x053232 $9222: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053233 $9223: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053234 $9224: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053235 $9225: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053236 $9226: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053237 $9227: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053238 $9228: C-----  11 12    ORA  ($12),Y
  0x05323A $922A: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x05323B $922B: C-----  18       CLC  
  0x05323C $922C: C-----  90 F0    BCC  $921E
  0x05323E $922E: C-----  78       SEI  
  0x05323F $922F: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x053240 $9230: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053241 $9231: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053242 $9232: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053243 $9233: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053244 $9234: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053245 $9235: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053246 $9236: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053247 $9237: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053248 $9238: C-----  11 12    ORA  ($12),Y
  0x05324A $923A: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x05324B $923B: C-----  18       CLC  
  0x05324C $923C: C-----  10 30    BPL  $926E
  0x05324E $923E: C-----  50 90    BVC  $91D0
  0x053250 $9240: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053251 $9241: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053252 $9242: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053253 $9243: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053254 $9244: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x053255 $9245: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x053256 $9246: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x053257 $9247: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x053258 $9248: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053259 $9249: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05325A $924A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05325B $924B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05325C $924C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05325D $924D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05325E $924E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05325F $924F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053260 $9250: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053261 $9251: C-----  FD FB F7 SBC  $F7FB,X
  0x053264 $9254: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053265 $9255: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053266 $9256: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053267 $9257: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x053268 $9258: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x053269 $9259: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x05326A $925A: C-----  84 88    STY  $88
  0x05326C $925C: C-----  D0 E0    BNE  $923E
  0x05326E $925E: C-----  C0 F0    CPY  #$F0
  0x053270 $9260: C-----  81 81    STA  ($81,X)
  0x053272 $9262: C-----  C1 C1    CMP  ($C1,X)
  0x053274 $9264: C-----  C1 C0    CMP  ($C0,X)
  0x053276 $9266: C-----  C0 C0    CPY  #$C0
  0x053278 $9268: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053279 $9269: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05327A $926A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05327B $926B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05327C $926C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05327D $926D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05327E $926E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05327F $926F: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053280 $9270: C-----  F6 F9    INC  $F9,X
  0x053282 $9272: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x053283 $9273: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053284 $9274: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053285 $9275: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053286 $9276: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053287 $9277: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053288 $9278: C-----  E9 E6    SBC  #$E6
  0x05328A $927A: C-----  E5 E8    SBC  $E8
  0x05328C $927C: C-----  F0 F0    BEQ  $926E
  0x05328E $927E: C-----  F0 F0    BEQ  $9270
  0x053290 $9280: C-----  F9 FE FF SBC  $FFFE,Y
  0x053293 $9283: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053294 $9284: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053295 $9285: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053296 $9286: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053297 $9287: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053298 $9288: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053299 $9289: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x05329A $928A: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05329B $928B: C-----  08       PHP  
  0x05329C $928C: C-----  18       CLC  
  0x05329D $928D: C-----  28       PLP  
  0x05329E $928E: C-----  48       PHA  
  0x05329F $928F: C-----  88       DEY  
  0x0532A0 $9290: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0532A1 $9291: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0532A2 $9292: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0532A3 $9293: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0532A4 $9294: C-----  F9 FE FF SBC  $FFFE,Y
  0x0532A7 $9297: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0532A8 $9298: C-----  !!UNDEF $89  ; unknown opcode, treating as data
  0x0532A9 $9299: C-----  EA       NOP  
  0x0532AA $929A: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0532AB $929B: C-----  1E 1F 29 ASL  $291F,X
  0x0532AE $929E: C-----  48       PHA  
  0x0532AF $929F: C-----  88       DEY  
  0x0532B0 $92A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0532B1 $92A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0532B2 $92A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0532B3 $92A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0532B4 $92A4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0532B5 $92A5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0532B6 $92A6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0532B7 $92A7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0532B8 $92A8: C-----  05 06    ORA  $06
  0x0532BA $92AA: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0532BB $92AB: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0532BC $92AC: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0532BD $92AD: C-----  24 44    BIT  $44
  0x0532BF $92AF: C-----  84 FF    STY  $FF
  0x0532C1 $92B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0532C2 $92B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0532C3 $92B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0532C4 $92B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0532C5 $92B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0532C6 $92B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0532C7 $92B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0532C8 $92B8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0532C9 $92B9: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0532CA $92BA: C-----  06 0A    ASL  $0A
  0x0532CC $92BC: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0532CD $92BD: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x0532CE $92BE: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x0532CF $92BF: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x0532D0 $92C0: C-----  E0 E0    CPX  #$E0
  0x0532D2 $92C2: C-----  E0 E0    CPX  #$E0
  0x0532D4 $92C4: C-----  E0 60    CPX  #$60
  0x0532D6 $92C6: C-----  D0 E0    BNE  $92A8
  0x0532D8 $92C8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0532D9 $92C9: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0532DA $92CA: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0532DB $92CB: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0532DC $92CC: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0532DD $92CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0532DE $92CE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0532DF $92CF: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0532E0 $92D0: C-----  FE FD 79 INC  $79FD,X
  0x0532E3 $92D3: C-----  7E 7F 7F ROR  $7F7F,X
  0x0532E6 $92D6: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0532E7 $92D7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0532E8 $92D8: C-----  F9 FA FE SBC  $FEFA,Y
  0x0532EB $92DB: C-----  F9 FC FC SBC  $FCFC,Y
  0x0532EE $92DE: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0532EF $92DF: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0532F0 $92E0: C-----  F8       SED  
  0x0532F1 $92E1: C-----  F8       SED  
  0x0532F2 $92E2: C-----  F8       SED  
  0x0532F3 $92E3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0532F4 $92E4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0532F5 $92E5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0532F6 $92E6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0532F7 $92E7: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0532F8 $92E8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0532F9 $92E9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0532FA $92EA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0532FB $92EB: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0532FC $92EC: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0532FD $92ED: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x0532FE $92EE: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x0532FF $92EF: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x053300 $92F0: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053301 $92F1: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053302 $92F2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053303 $92F3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053304 $92F4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053305 $92F5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053306 $92F6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053307 $92F7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053308 $92F8: C-----  FE FE FE INC  $FEFE,X
  0x05330B $92FB: C-----  FE FF FF INC  $FFFF,X
  0x05330E $92FE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05330F $92FF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053310 $9300: C-----  FE 7D BB INC  $BB7D,X
  0x053313 $9303: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x053314 $9304: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x053315 $9305: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x053316 $9306: C-----  BC 7F 01 LDY  $017F,X
  0x053319 $9309: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x05331A $930A: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x05331B $930B: C-----  38       SEC  
  0x05331C $930C: C-----  18       CLC  
  0x05331D $930D: C-----  24 43    BIT  $43
  0x05331F $930F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053320 $9310: C-----  E6 F9    INC  $F9
  0x053322 $9312: C-----  F9 F6 EF SBC  $EFF6,Y
  0x053325 $9315: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053326 $9316: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053327 $9317: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053328 $9318: C-----  19 06 06 ORA  $0606,Y
  0x05332B $931B: C-----  09 10    ORA  #$10
  0x05332D $931D: C-----  20 40 80 JSR  $8040
  0x053330 $9320: C-----  FE FD FB INC  $FBFD,X
  0x053333 $9323: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x053334 $9324: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x053335 $9325: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x053336 $9326: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053337 $9327: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x053338 $9328: C-----  01 02    ORA  ($02,X)
  0x05333A $932A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05333B $932B: C-----  C8       INY  
  0x05333C $932C: C-----  30 38    BMI  $9366
  0x05333E $932E: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x05333F $932F: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x053340 $9330: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053341 $9331: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053342 $9332: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053343 $9333: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x053344 $9334: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x053345 $9335: C-----  F1 FA    SBC  ($FA),Y
  0x053347 $9337: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053348 $9338: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x053349 $9339: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05334A $933A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05334B $933B: C-----  84 74    STY  $74
  0x05334D $933D: C-----  0E 05 04 ASL  $0405
  0x053350 $9340: C-----  FE FD FB INC  $FBFD,X
  0x053353 $9343: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053354 $9344: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x053355 $9345: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053356 $9346: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x053357 $9347: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053358 $9348: C-----  00       BRK  
  0x053359 $9349: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05335A $934A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05335B $934B: C-----  08       PHP  
  0x05335C $934C: C-----  D0 20    BNE  $936E
  0x05335E $934E: C-----  50 88    BVC  $92D8
  0x053360 $9350: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053361 $9351: C-----  81 C0    STA  ($C0,X)
  0x053363 $9353: C-----  E0 E0    CPX  #$E0
  0x053365 $9355: C-----  D8       CLD  
  0x053366 $9356: C-----  BC 7E 03 LDY  $037E,X
  0x053369 $9359: C-----  01 00    ORA  ($00,X)
  0x05336B $935B: C-----  00       BRK  
  0x05336C $935C: C-----  10 20    BPL  $937E
  0x05336E $935E: C-----  40       RTI  
  0x05336F $935F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053370 $9360: C-----  F8       SED  
  0x053371 $9361: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053372 $9362: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053373 $9363: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053374 $9364: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053375 $9365: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x053376 $9366: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053377 $9367: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x053378 $9368: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053379 $9369: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x05337A $936A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05337B $936B: C-----  08       PHP  
  0x05337C $936C: C-----  10 A0    BPL  $930E
  0x05337E $936E: C-----  40       RTI  
  0x05337F $936F: C-----  B0 FE    BCS  $936F
  0x053381 $9371: C-----  FD 7B B7 SBC  $B77B,X
  0x053384 $9374: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x053385 $9375: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x053386 $9376: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053387 $9377: C-----  7D 01 02 ADC  $0201,X
  0x05338A $937A: C-----  84 48    STY  $48
  0x05338C $937C: C-----  30 28    BMI  $93A6
  0x05338E $937E: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x05338F $937F: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x053390 $9380: C-----  FE FD FB INC  $FBFD,X
  0x053393 $9383: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053394 $9384: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x053395 $9385: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x053396 $9386: C-----  !!UNDEF $B3  ; unknown opcode, treating as data
  0x053397 $9387: C-----  7D 01 02 ADC  $0201,X
  0x05339A $938A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05339B $938B: C-----  88       DEY  
  0x05339C $938C: C-----  50 30    BVC  $93BE
  0x05339E $938E: C-----  4C 82 7E JMP  $7E82
  0x0533A1 $9391: C-----  9D EB F3 STA  $F3EB,X
  0x0533A4 $9394: C-----  ED DE BF SBC  $BFDE
  0x0533A7 $9397: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0533A8 $9398: C-----  81 62    STA  ($62,X)
  0x0533AA $939A: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x0533AB $939B: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0533AC $939C: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x0533AD $939D: C-----  21 40    AND  ($40,X)
  0x0533AF $939F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0533B0 $93A0: C-----  FE FD FB INC  $FBFD,X
  0x0533B3 $93A3: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0533B4 $93A4: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0533B5 $93A5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0533B6 $93A6: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0533B7 $93A7: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x0533B8 $93A8: C-----  01 02    ORA  ($02,X)
  0x0533BA $93AA: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0533BB $93AB: C-----  08       PHP  
  0x0533BC $93AC: C-----  90 E0    BCC  $938E
  0x0533BE $93AE: C-----  78       SEI  
  0x0533BF $93AF: C-----  1E 7E 9D ASL  $9D7E,X
  0x0533C2 $93B2: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x0533C3 $93B3: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x0533C4 $93B4: C-----  EC DF BF CPX  $BFDF
  0x0533C7 $93B7: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0533C8 $93B8: C-----  81 62    STA  ($62,X)
  0x0533CA $93BA: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x0533CB $93BB: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0533CC $93BC: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0533CD $93BD: C-----  20 40 80 JSR  $8040
  0x0533D0 $93C0: C-----  F6 F9    INC  $F9,X
  0x0533D2 $93C2: C-----  F8       SED  
  0x0533D3 $93C3: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0533D4 $93C4: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0533D5 $93C5: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0533D6 $93C6: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0533D7 $93C7: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x0533D8 $93C8: C-----  09 06    ORA  #$06
  0x0533DA $93CA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0533DB $93CB: C-----  08       PHP  
  0x0533DC $93CC: C-----  10 A0    BPL  $936E
  0x0533DE $93CE: C-----  40       RTI  
  0x0533DF $93CF: C-----  B0 FF    BCS  $93D0
  0x0533E1 $93D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0533E2 $93D2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0533E3 $93D3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0533E4 $93D4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0533E5 $93D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0533E6 $93D6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0533E7 $93D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0533E8 $93D8: C-----  09 0A    ORA  #$0A
  0x0533EA $93DA: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0533EB $93DB: C-----  08       PHP  
  0x0533EC $93DC: C-----  18       CLC  
  0x0533ED $93DD: C-----  28       PLP  
  0x0533EE $93DE: C-----  48       PHA  
  0x0533EF $93DF: C-----  88       DEY  
  0x0533F0 $93E0: C-----  F6 F9    INC  $F9,X
  0x0533F2 $93E2: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x0533F3 $93E3: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0533F4 $93E4: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0533F5 $93E5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0533F6 $93E6: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0533F7 $93E7: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x0533F8 $93E8: C-----  09 06    ORA  #$06
  0x0533FA $93EA: C-----  05 08    ORA  $08
  0x0533FC $93EC: C-----  10 E0    BPL  $93CE
  0x0533FE $93EE: C-----  60       RTS  
  0x0533FF $93EF: C-----  98       TYA  
  0x053400 $93F0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053401 $93F1: C-----  FD FB 37 SBC  $37FB,X
  0x053404 $93F4: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x053405 $93F5: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x053406 $93F6: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053407 $93F7: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x053408 $93F8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053409 $93F9: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05340A $93FA: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x05340B $93FB: C-----  C8       INY  
  0x05340C $93FC: C-----  30 38    BMI  $9436
  0x05340E $93FE: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x05340F $93FF: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x053410 $9400: C-----  7E 9D EB ROR  $EB9D,X
  0x053413 $9403: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x053414 $9404: C-----  ED DE 3F SBC  $3FDE
  0x053417 $9407: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053418 $9408: C-----  81 62    STA  ($62,X)
  0x05341A $940A: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x05341B $940B: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05341C $940C: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x05341D $940D: C-----  21 C0    AND  ($C0,X)
  0x05341F $940F: C-----  C0 BE    CPY  #$BE
  0x053421 $9411: C-----  CD F3 F3 CMP  $F3F3
  0x053424 $9414: C-----  EC 5F BF CPX  $BF5F
  0x053427 $9417: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x053428 $9418: C-----  41 32    EOR  ($32,X)
  0x05342A $941A: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05342B $941B: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05342C $941C: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x05342D $941D: C-----  A0 40    LDY  #$40
  0x05342F $941F: C-----  B0 CE    BCS  $93EF
  0x053431 $9421: C-----  F1 F9    SBC  ($F9),Y
  0x053433 $9423: C-----  F6 EF    INC  $EF,X
  0x053435 $9425: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053436 $9426: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053437 $9427: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053438 $9428: C-----  31 0E    AND  ($0E),Y
  0x05343A $942A: C-----  06 09    ASL  $09
  0x05343C $942C: C-----  90 60    BCC  $948E
  0x05343E $942E: C-----  58       CLI  
  0x05343F $942F: C-----  46 F6    LSR  $F6
  0x053441 $9431: C-----  F9 FA 77 SBC  $77FA,Y
  0x053444 $9434: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x053445 $9435: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x053446 $9436: C-----  !!UNDEF $B3  ; unknown opcode, treating as data
  0x053447 $9437: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x053448 $9438: C-----  09 06    ORA  #$06
  0x05344A $943A: C-----  05 88    ORA  $88
  0x05344C $943C: C-----  70 30    BVS  $946E
  0x05344E $943E: C-----  4C 83 E6 JMP  $E683
  0x053451 $9441: C-----  F9 F9 F6 SBC  $F6F9,Y
  0x053454 $9444: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053455 $9445: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x053456 $9446: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053457 $9447: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x053458 $9448: C-----  19 06 06 ORA  $0606,Y
  0x05345B $944B: C-----  09 10    ORA  #$10
  0x05345D $944D: C-----  A0 40    LDY  #$40
  0x05345F $944F: C-----  B0 F3    BCS  $9444
  0x053461 $9451: C-----  F9 F8 F6 SBC  $F6F8,Y
  0x053464 $9454: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x053465 $9455: C-----  DE AD 73 DEC  $73AD,X
  0x053468 $9458: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053469 $9459: C-----  01 04    ORA  ($04,X)
  0x05346B $945B: C-----  08       PHP  
  0x05346C $945C: C-----  D0 21    BNE  $947F
  0x05346E $945E: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x05346F $945F: C-----  8C F6 F9 STY  $F9F6
  0x053472 $9462: C-----  F8       SED  
  0x053473 $9463: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x053474 $9464: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x053475 $9465: C-----  C6 B9    DEC  $B9
  0x053477 $9467: C-----  78       SEI  
  0x053478 $9468: C-----  09 06    ORA  #$06
  0x05347A $946A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05347B $946B: C-----  C8       INY  
  0x05347C $946C: C-----  30 39    BMI  $94A7
  0x05347E $946E: C-----  46 87    LSR  $87
  0x053480 $9470: C-----  F0 EC    BEQ  $945E
  0x053482 $9472: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x053483 $9473: C-----  36 2D    ROL  $2D,X
  0x053485 $9475: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x053486 $9476: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x053487 $9477: C-----  6A       ROR  A
  0x053488 $9478: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053489 $9479: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x05348A $947A: C-----  24 C9    BIT  $C9
  0x05348C $947C: C-----  !!UNDEF $D2  ; unknown opcode, treating as data
  0x05348D $947D: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x05348E $947E: C-----  49 97    EOR  #$97
  0x053490 $9480: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053491 $9481: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053492 $9482: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053493 $9483: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x053494 $9484: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x053495 $9485: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x053496 $9486: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x053497 $9487: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053498 $9488: C-----  !!UNDEF $89  ; unknown opcode, treating as data
  0x053499 $9489: C-----  88       DEY  
  0x05349A $948A: C-----  88       DEY  
  0x05349B $948B: C-----  C8       INY  
  0x05349C $948C: C-----  B8       CLV  
  0x05349D $948D: C-----  8C 8B 88 STY  $888B
  0x0534A0 $9490: C-----  FE 7D 7B INC  $7B7D,X
  0x0534A3 $9493: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0534A4 $9494: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0534A5 $9495: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0534A6 $9496: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0534A7 $9497: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x0534A8 $9498: C-----  81 E2    STA  ($E2,X)
  0x0534AA $949A: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x0534AB $949B: C-----  8E 89 88 STX  $8889
  0x0534AE $949E: C-----  88       DEY  
  0x0534AF $949F: C-----  C8       INY  
  0x0534B0 $94A0: C-----  EE EE 2E INC  $2EEE
  0x0534B3 $94A3: C-----  CE E0 EE DEC  $EEE0
  0x0534B6 $94A6: C-----  EE EE 11 INC  $11EE
  0x0534B9 $94A9: C-----  11 D1    ORA  ($D1),Y
  0x0534BB $94AB: C-----  31 1F    AND  ($1F),Y
  0x0534BD $94AD: C-----  11 11    ORA  ($11),Y
  0x0534BF $94AF: C-----  11 CE    ORA  ($CE),Y
  0x0534C1 $94B1: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x0534C2 $94B2: C-----  EC EE EE CPX  $EEEE
  0x0534C5 $94B5: C-----  2E C6 E8 ROL  $E8C6
  0x0534C8 $94B8: C-----  31 1D    AND  ($1D),Y
  0x0534CA $94BA: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0534CB $94BB: C-----  11 11    ORA  ($11),Y
  0x0534CD $94BD: C-----  D1 39    CMP  ($39),Y
  0x0534CF $94BF: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x0534D0 $94C0: C-----  76 8D    ROR  $8D,X
  0x0534D2 $94C2: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0534D3 $94C3: C-----  !!UNDEF $B2  ; unknown opcode, treating as data
  0x0534D4 $94C4: C-----  EC 7B 5F CPX  $5F7B
  0x0534D7 $94C7: C-----  56 89    LSR  $89,X
  0x0534D9 $94C9: C-----  !!UNDEF $72  ; unknown opcode, treating as data
  0x0534DA $94CA: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x0534DB $94CB: C-----  4D 93 E4 EOR  $E493
  0x0534DE $94CE: C-----  B9 AF 5D LDA  $5DAF,Y
  0x0534E1 $94D1: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x0534E2 $94D2: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x0534E3 $94D3: C-----  EC CD AA CPX  $AACD
  0x0534E6 $94D6: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0534E7 $94D7: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x0534E8 $94D8: C-----  A6 6C    LDX  $6C
  0x0534EA $94DA: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x0534EB $94DB: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x0534EC $94DC: C-----  !!UNDEF $72  ; unknown opcode, treating as data
  0x0534ED $94DD: C-----  D5 88    CMP  $88,X
  0x0534EF $94DF: C-----  98       TYA  
  0x0534F0 $94E0: C-----  AD AD 2D LDA  $2DAD
  0x0534F3 $94E3: C-----  8C A5 AC STY  $ACA5
  0x0534F6 $94E6: C-----  AD AD 56 LDA  $56AD
  0x0534F9 $94E9: C-----  56 D6    LSR  $D6,X
  0x0534FB $94EB: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0534FC $94EC: C-----  5E 57 56 LSR  $5657,X
  0x0534FF $94EF: C-----  56 95    LSR  $95,X
  0x053501 $94F1: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053502 $94F2: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x053503 $94F3: C-----  EC CD AA CPX  $AACD
  0x053506 $94F6: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053507 $94F7: C-----  66 6A    ROR  $6A
  0x053509 $94F9: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x05350A $94FA: C-----  AC 13 32 LDY  $3213
  0x05350D $94FD: C-----  55 88    EOR  $88,X
  0x05350F $94FF: C-----  99 9F 9F STA  $9F9F,Y
  0x053512 $9502: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x053513 $9503: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x053514 $9504: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x053515 $9505: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x053516 $9506: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x053517 $9507: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x053518 $9508: C-----  70 70    BVS  $957A
  0x05351A $950A: C-----  B8       CLV  
  0x05351B $950B: C-----  38       SEC  
  0x05351C $950C: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05351D $950D: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x05351E $950E: C-----  8E 9E 91 STX  $919E
  0x053521 $9511: C-----  B9 50 EC LDA  $EC50,Y
  0x053524 $9514: C-----  CC AA 76 CPY  $76AA
  0x053527 $9517: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x053528 $9518: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x053529 $9519: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x05352A $951A: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x05352B $951B: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x05352C $951C: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x05352D $951D: C-----  55 89    EOR  $89,X
  0x05352F $951F: C-----  98       TYA  
  0x053530 $9520: C-----  E9 EE    SBC  #$EE
  0x053532 $9522: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053533 $9523: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053534 $9524: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053535 $9525: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053536 $9526: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x053537 $9527: C-----  E9 97    SBC  #$97
  0x053539 $9529: C-----  91 90    STA  ($90),Y
  0x05353B $952B: C-----  90 D0    BCC  $94FD
  0x05353D $952D: C-----  D0 F8    BNE  $9527
  0x05353F $952F: C-----  D6 FE    DEC  $FE,X
  0x053541 $9531: C-----  7D 9B C7 ADC  $C79B,X
  0x053544 $9534: C-----  D9 DF DF CMP  $DFDF,Y
  0x053547 $9537: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053548 $9538: C-----  81 E2    STA  ($E2,X)
  0x05354A $953A: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x05354B $953B: C-----  3E 27 20 ROL  $2027,X
  0x05354E $953E: C-----  20 20 EF JSR  $EF20
  0x053551 $9541: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053552 $9542: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053553 $9543: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053554 $9544: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053555 $9545: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053556 $9546: C-----  E0 EF    CPX  #$EF
  0x053558 $9548: C-----  10 10    BPL  $955A
  0x05355A $954A: C-----  10 10    BPL  $955C
  0x05355C $954C: C-----  10 F0    BPL  $953E
  0x05355E $954E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05355F $954F: C-----  10 BA    BPL  $950B
  0x053561 $9551: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053562 $9552: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053563 $9553: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053564 $9554: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053565 $9555: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053566 $9556: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x053567 $9557: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x053568 $9558: C-----  45 44    EOR  $44
  0x05356A $955A: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x05356B $955B: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x05356C $955C: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x05356D $955D: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x05356E $955E: C-----  C4 7C    CPY  $7C
  0x053570 $9560: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053571 $9561: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053572 $9562: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053573 $9563: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053574 $9564: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053575 $9565: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053576 $9566: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053577 $9567: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053578 $9568: C-----  20 20 20 JSR  $2020
  0x05357B $956B: C-----  20 20 20 JSR  $2020
  0x05357E $956E: C-----  20 20 74 JSR  $7420
  0x053581 $9571: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053582 $9572: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053583 $9573: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053584 $9574: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053585 $9575: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053586 $9576: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053587 $9577: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053588 $9578: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x053589 $9579: C-----  88       DEY  
  0x05358A $957A: C-----  88       DEY  
  0x05358B $957B: C-----  88       DEY  
  0x05358C $957C: C-----  88       DEY  
  0x05358D $957D: C-----  88       DEY  
  0x05358E $957E: C-----  88       DEY  
  0x05358F $957F: C-----  88       DEY  
  0x053590 $9580: C-----  EE EF EF INC  $EFEF
  0x053593 $9583: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053594 $9584: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053595 $9585: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053596 $9586: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053597 $9587: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x053598 $9588: C-----  F1 F0    SBC  ($F0),Y
  0x05359A $958A: C-----  F0 F0    BEQ  $957C
  0x05359C $958C: C-----  F0 F0    BEQ  $957E
  0x05359E $958E: C-----  F0 FC    BEQ  $958C
  0x0535A0 $9590: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0535A1 $9591: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0535A2 $9592: C-----  !!UNDEF $A3  ; unknown opcode, treating as data
  0x0535A3 $9593: C-----  BC BF BF LDY  $BFBF,X
  0x0535A6 $9596: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0535A7 $9597: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0535A8 $9598: C-----  C0 60    CPY  #$60
  0x0535AA $959A: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x0535AB $959B: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x0535AC $959C: C-----  40       RTI  
  0x0535AD $959D: C-----  40       RTI  
  0x0535AE $959E: C-----  40       RTI  
  0x0535AF $959F: C-----  40       RTI  
  0x0535B0 $95A0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0535B1 $95A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0535B2 $95A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0535B3 $95A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0535B4 $95A4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0535B5 $95A5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0535B6 $95A6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0535B7 $95A7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0535B8 $95A8: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x0535B9 $95A9: C-----  F8       SED  
  0x0535BA $95AA: C-----  F8       SED  
  0x0535BB $95AB: C-----  F8       SED  
  0x0535BC $95AC: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0535BD $95AD: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0535BE $95AE: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0535BF $95AF: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0535C0 $95B0: C-----  7E 1E 62 ROR  $621E,X
  0x0535C3 $95B3: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x0535C4 $95B4: C-----  7E 7E 7E ROR  $7E7E,X
  0x0535C7 $95B7: C-----  7E 81 E1 ROR  $E181,X
  0x0535CA $95BA: C-----  9D 83 81 STA  $8183,X
  0x0535CD $95BD: C-----  81 81    STA  ($81,X)
  0x0535CF $95BF: C-----  81 77    STA  ($77,X)
  0x0535D1 $95C1: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0535D2 $95C2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0535D3 $95C3: C-----  70 77    BVS  $963C
  0x0535D5 $95C5: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0535D6 $95C6: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0535D7 $95C7: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0535D8 $95C8: C-----  88       DEY  
  0x0535D9 $95C9: C-----  88       DEY  
  0x0535DA $95CA: C-----  F8       SED  
  0x0535DB $95CB: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x0535DC $95CC: C-----  88       DEY  
  0x0535DD $95CD: C-----  88       DEY  
  0x0535DE $95CE: C-----  88       DEY  
  0x0535DF $95CF: C-----  88       DEY  
  0x0535E0 $95D0: C-----  65 6B    ADC  $6B
  0x0535E2 $95D2: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x0535E3 $95D3: C-----  2C 6D 6A BIT  $6A6D
  0x0535E6 $95D6: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x0535E7 $95D7: C-----  26 BA    ROL  $BA
  0x0535E9 $95D9: C-----  B4 BC    LDY  $BC,X
  0x0535EB $95DB: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x0535EC $95DC: C-----  !!UNDEF $B2  ; unknown opcode, treating as data
  0x0535ED $95DD: C-----  B5 B8    LDA  $B8,X
  0x0535EF $95DF: C-----  F9 F7 F7 SBC  $F7F7,Y
  0x0535F2 $95E2: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0535F3 $95E3: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0535F4 $95E4: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x0535F5 $95E5: C-----  E1 F6    SBC  ($F6,X)
  0x0535F7 $95E7: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0535F8 $95E8: C-----  08       PHP  
  0x0535F9 $95E9: C-----  08       PHP  
  0x0535FA $95EA: C-----  08       PHP  
  0x0535FB $95EB: C-----  08       PHP  
  0x0535FC $95EC: C-----  E8       INX  
  0x0535FD $95ED: C-----  1E 09 08 ASL  $0809,X
  0x053600 $95F0: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053601 $95F1: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053602 $95F2: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053603 $95F3: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053604 $95F4: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053605 $95F5: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053606 $95F6: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053607 $95F7: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053608 $95F8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053609 $95F9: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05360A $95FA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05360B $95FB: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05360C $95FC: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05360D $95FD: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05360E $95FE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05360F $95FF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053610 $9600: C-----  DD 1D C1 CMP  $C11D,X
  0x053613 $9603: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x053614 $9604: C-----  DD DD DD CMP  $DDDD,X
  0x053617 $9607: C-----  DD 22 E2 CMP  $E222,X
  0x05361A $960A: C-----  3E 23 22 ROL  $2223,X
  0x05361D $960D: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x05361E $960E: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x05361F $960F: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x053620 $9610: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x053621 $9611: C-----  DD DD 1D CMP  $1DDD,X
  0x053624 $9614: C-----  C5 D8    CMP  $D8
  0x053626 $9616: C-----  DD DD 23 CMP  $23DD,X
  0x053629 $9619: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x05362A $961A: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x05362B $961B: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x05362C $961C: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x05362D $961D: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x05362E $961E: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x05362F $961F: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x053630 $9620: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x053631 $9621: C-----  C1 E0    CMP  ($E0,X)
  0x053633 $9623: C-----  F0 E8    BEQ  $960D
  0x053635 $9625: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x053636 $9626: C-----  BE 7F 03 LDX  $037F,Y
  0x053639 $9629: C-----  01 00    ORA  ($00,X)
  0x05363B $962B: C-----  00       BRK  
  0x05363C $962C: C-----  10 20    BPL  $964E
  0x05363E $962E: C-----  40       RTI  
  0x05363F $962F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053640 $9630: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053641 $9631: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053642 $9632: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x053643 $9633: C-----  A1 BA    LDA  ($BA,X)
  0x053645 $9635: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053646 $9636: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053647 $9637: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053648 $9638: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x053649 $9639: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x05364A $963A: C-----  E4 5E    CPX  $5E
  0x05364C $963C: C-----  45 44    EOR  $44
  0x05364E $963E: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x05364F $963F: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x053650 $9640: C-----  19 4B 5B ORA  $5B4B,Y
  0x053653 $9643: C-----  58       CLI  
  0x053654 $9644: C-----  59 5A 1B EOR  $1B5A,Y
  0x053657 $9647: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x053658 $9648: C-----  EE BC AC INC  $ACBC
  0x05365B $964B: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x05365C $964C: C-----  AE AD EC LDX  $ECAD
  0x05365F $964F: C-----  BC FF FF LDY  $FFFF,X
  0x053662 $9652: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053663 $9653: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053664 $9654: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053665 $9655: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x053666 $9656: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x053667 $9657: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x053668 $9658: C-----  00       BRK  
  0x053669 $9659: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05366A $965A: C-----  C0 60    CPY  #$60
  0x05366C $965C: C-----  30 18    BMI  $9676
  0x05366E $965E: C-----  4C 86 B5 JMP  $B586
  0x053671 $9661: C-----  !!UNDEF $B3  ; unknown opcode, treating as data
  0x053672 $9662: C-----  !!UNDEF $B3  ; unknown opcode, treating as data
  0x053673 $9663: C-----  B4 15    LDY  $15,X
  0x053675 $9665: C-----  !!UNDEF $B2  ; unknown opcode, treating as data
  0x053676 $9666: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x053677 $9667: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x053678 $9668: C-----  !!UNDEF $5A  ; unknown opcode, treating as data
  0x053679 $9669: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x05367A $966A: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x05367B $966B: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x05367C $966C: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x05367D $966D: C-----  5D 58 58 EOR  $5858,X
  0x053680 $9670: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x053681 $9671: C-----  B9 70 AC LDA  $AC70,Y
  0x053684 $9674: C-----  CC AA 36 CPY  $36AA
  0x053687 $9677: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x053688 $9678: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x053689 $9679: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x05368A $967A: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x05368B $967B: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x05368C $967C: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x05368D $967D: C-----  D5 C9    CMP  $C9,X
  0x05368F $967F: C-----  D8       CLD  
  0x053690 $9680: C-----  F8       SED  
  0x053691 $9681: C-----  F8       SED  
  0x053692 $9682: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053693 $9683: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053694 $9684: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053695 $9685: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053696 $9686: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053697 $9687: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053698 $9688: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053699 $9689: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05369A $968A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x05369B $968B: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x05369C $968C: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x05369D $968D: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x05369E $968E: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x05369F $968F: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x0536A0 $9690: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x0536A1 $9691: C-----  E1 F0    SBC  ($F0,X)
  0x0536A3 $9693: C-----  F0 EC    BEQ  $9681
  0x0536A5 $9695: C-----  DE BF 7F DEC  $7FBF,X
  0x0536A8 $9698: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0536A9 $9699: C-----  01 00    ORA  ($00,X)
  0x0536AB $969B: C-----  08       PHP  
  0x0536AC $969C: C-----  10 20    BPL  $96BE
  0x0536AE $969E: C-----  40       RTI  
  0x0536AF $969F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0536B0 $96A0: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x0536B1 $96A1: C-----  A1 BA    LDA  ($BA,X)
  0x0536B3 $96A3: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x0536B4 $96A4: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x0536B5 $96A5: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x0536B6 $96A6: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x0536B7 $96A7: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x0536B8 $96A8: C-----  E4 5E    CPX  $5E
  0x0536BA $96AA: C-----  45 44    EOR  $44
  0x0536BC $96AC: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0536BD $96AD: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0536BE $96AE: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0536BF $96AF: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x0536C0 $96B0: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x0536C1 $96B1: C-----  60       RTS  
  0x0536C2 $96B2: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0536C3 $96B3: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0536C4 $96B4: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0536C5 $96B5: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0536C6 $96B6: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0536C7 $96B7: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x0536C8 $96B8: C-----  E8       INX  
  0x0536C9 $96B9: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x0536CA $96BA: C-----  88       DEY  
  0x0536CB $96BB: C-----  88       DEY  
  0x0536CC $96BC: C-----  88       DEY  
  0x0536CD $96BD: C-----  88       DEY  
  0x0536CE $96BE: C-----  88       DEY  
  0x0536CF $96BF: C-----  C8       INY  
  0x0536D0 $96C0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0536D1 $96C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0536D2 $96C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0536D3 $96C3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0536D4 $96C4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0536D5 $96C5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x0536D6 $96C6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0536D7 $96C7: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0536D8 $96C8: C-----  00       BRK  
  0x0536D9 $96C9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0536DA $96CA: C-----  C0 60    CPY  #$60
  0x0536DC $96CC: C-----  30 18    BMI  $96E6
  0x0536DE $96CE: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x0536DF $96CF: C-----  06 FF    ASL  $FF
  0x0536E1 $96D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0536E2 $96D2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0536E3 $96D3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0536E4 $96D4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0536E5 $96D5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x0536E6 $96D6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0536E7 $96D7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0536E8 $96D8: C-----  00       BRK  
  0x0536E9 $96D9: C-----  00       BRK  
  0x0536EA $96DA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0536EB $96DB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0536EC $96DC: C-----  C0 C0    CPY  #$C0
  0x0536EE $96DE: C-----  E0 E0    CPX  #$E0
  0x0536F0 $96E0: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x0536F1 $96E1: C-----  F1 F8    SBC  ($F8),Y
  0x0536F3 $96E3: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x0536F4 $96E4: C-----  EE 5F BF INC  $BF5F
  0x0536F7 $96E7: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0536F8 $96E8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0536F9 $96E9: C-----  01 00    ORA  ($00,X)
  0x0536FB $96EB: C-----  08       PHP  
  0x0536FC $96EC: C-----  10 A0    BPL  $968E
  0x0536FE $96EE: C-----  40       RTI  
  0x0536FF $96EF: C-----  A0 FF    LDY  #$FF
  0x053701 $96F1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053702 $96F2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053703 $96F3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053704 $96F4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053705 $96F5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053706 $96F6: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x053707 $96F7: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x053708 $96F8: C-----  00       BRK  
  0x053709 $96F9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x05370A $96FA: C-----  C0 60    CPY  #$60
  0x05370C $96FC: C-----  30 18    BMI  $9716
  0x05370E $96FE: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05370F $96FF: C-----  86 FE    STX  $FE
  0x053711 $9701: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053712 $9702: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053713 $9703: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053714 $9704: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053715 $9705: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053716 $9706: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053717 $9707: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053718 $9708: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053719 $9709: C-----  FE FE FE INC  $FEFE,X
  0x05371C $970C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05371D $970D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05371E $970E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05371F $970F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053720 $9710: C-----  FD 1D E1 SBC  $E11D,X
  0x053723 $9713: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053724 $9714: C-----  FD FD FD SBC  $FDFD,X
  0x053727 $9717: C-----  FD 02 E2 SBC  $E202,X
  0x05372A $971A: C-----  1E 03 02 ASL  $0203,X
  0x05372D $971D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05372E $971E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05372F $971F: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x053730 $9720: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053731 $9721: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053732 $9722: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053733 $9723: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053734 $9724: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053735 $9725: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053736 $9726: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053737 $9727: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053738 $9728: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053739 $9729: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05373A $972A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05373B $972B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05373C $972C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05373D $972D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05373E $972E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05373F $972F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053740 $9730: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053741 $9731: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053742 $9732: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x053743 $9733: C-----  E1 FA    SBC  ($FA,X)
  0x053745 $9735: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053746 $9736: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053747 $9737: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053748 $9738: C-----  84 84    STY  $84
  0x05374A $973A: C-----  E4 9E    CPX  $9E
  0x05374C $973C: C-----  C5 C4    CMP  $C4
  0x05374E $973E: C-----  C4 C4    CPY  $C4
  0x053750 $9740: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053751 $9741: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053752 $9742: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053753 $9743: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053754 $9744: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053755 $9745: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053756 $9746: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053757 $9747: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053758 $9748: C-----  F0 F0    BEQ  $973A
  0x05375A $974A: C-----  F0 F0    BEQ  $973C
  0x05375C $974C: C-----  F0 F0    BEQ  $973E
  0x05375E $974E: C-----  F0 F0    BEQ  $9740
  0x053760 $9750: C-----  E0 E0    CPX  #$E0
  0x053762 $9752: C-----  E0 E0    CPX  #$E0
  0x053764 $9754: C-----  E0 E0    CPX  #$E0
  0x053766 $9756: C-----  E0 E0    CPX  #$E0
  0x053768 $9758: C-----  EE EE EE INC  $EEEE
  0x05376B $975B: C-----  EE EE EE INC  $EEEE
  0x05376E $975E: C-----  EE EE 07 INC  $07EE
  0x053771 $9761: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053772 $9762: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053773 $9763: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053774 $9764: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053775 $9765: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053776 $9766: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053777 $9767: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053778 $9768: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053779 $9769: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x05377A $976A: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x05377B $976B: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x05377C $976C: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x05377D $976D: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x05377E $976E: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x05377F $976F: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053780 $9770: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053781 $9771: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053782 $9772: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053783 $9773: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053784 $9774: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053785 $9775: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053786 $9776: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053787 $9777: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x053788 $9778: C-----  60       RTS  
  0x053789 $9779: C-----  60       RTS  
  0x05378A $977A: C-----  60       RTS  
  0x05378B $977B: C-----  60       RTS  
  0x05378C $977C: C-----  E0 E0    CPX  #$E0
  0x05378E $977E: C-----  60       RTS  
  0x05378F $977F: C-----  70 1F    BVS  $97A0
  0x053791 $9781: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053792 $9782: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053793 $9783: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053794 $9784: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053795 $9785: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053796 $9786: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053797 $9787: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053798 $9788: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053799 $9789: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05379A $978A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05379B $978B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05379C $978C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05379D $978D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05379E $978E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05379F $978F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0537A0 $9790: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0537A1 $9791: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0537A2 $9792: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0537A3 $9793: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0537A4 $9794: C-----  F1 F6    SBC  ($F6),Y
  0x0537A6 $9796: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0537A7 $9797: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x0537A8 $9798: C-----  E8       INX  
  0x0537A9 $9799: C-----  E8       INX  
  0x0537AA $979A: C-----  E8       INX  
  0x0537AB $979B: C-----  E8       INX  
  0x0537AC $979C: C-----  FE F9 F8 INC  $F8F9,X
  0x0537AF $979F: C-----  F8       SED  
  0x0537B0 $97A0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0537B1 $97A1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0537B2 $97A2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0537B3 $97A3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0537B4 $97A4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0537B5 $97A5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0537B6 $97A6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0537B7 $97A7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x0537B8 $97A8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0537B9 $97A9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0537BA $97AA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0537BB $97AB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0537BC $97AC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0537BD $97AD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0537BE $97AE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0537BF $97AF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0537C0 $97B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0537C1 $97B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0537C2 $97B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0537C3 $97B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0537C4 $97B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0537C5 $97B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0537C6 $97B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0537C7 $97B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x0537C8 $97B8: C-----  F8       SED  
  0x0537C9 $97B9: C-----  F8       SED  
  0x0537CA $97BA: C-----  F8       SED  
  0x0537CB $97BB: C-----  F8       SED  
  0x0537CC $97BC: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0537CD $97BD: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0537CE $97BE: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0537CF $97BF: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x0537D0 $97C0: C-----  FD FD FD SBC  $FDFD,X
  0x0537D3 $97C3: C-----  FD FD FC SBC  $FCFD,X
  0x0537D6 $97C6: C-----  FD F9 06 SBC  $06F9,X
  0x0537D9 $97C9: C-----  06 06    ASL  $06
  0x0537DB $97CB: C-----  06 07    ASL  $07
  0x0537DD $97CD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0537DE $97CE: C-----  06 0E    ASL  $0E
  0x0537E0 $97D0: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x0537E1 $97D1: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x0537E2 $97D2: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x0537E3 $97D3: C-----  BD BE BF LDA  $BFBE,X
  0x0537E6 $97D6: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0537E7 $97D7: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0537E8 $97D8: C-----  78       SEI  
  0x0537E9 $97D9: C-----  6C 66 63 JMP  ($6366)
  0x0537EC $97DC: C-----  61 60    ADC  ($60,X)
  0x0537EE $97DE: C-----  60       RTS  
  0x0537EF $97DF: C-----  60       RTS  
  0x0537F0 $97E0: C-----  F5 ED    SBC  $ED,X
  0x0537F2 $97E2: C-----  DD BD 7D CMP  $7DBD,X
  0x0537F5 $97E5: C-----  FD FD FD SBC  $FDFD,X
  0x0537F8 $97E8: C-----  1E 36 66 ASL  $6636,X
  0x0537FB $97EB: C-----  C6 86    DEC  $86
  0x0537FD $97ED: C-----  06 06    ASL  $06
  0x0537FF $97EF: C-----  06 FF    ASL  $FF
  0x053801 $97F1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053802 $97F2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053803 $97F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053804 $97F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053805 $97F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053806 $97F6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053807 $97F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053808 $97F8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053809 $97F9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05380A $97FA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05380B $97FB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05380C $97FC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05380D $97FD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05380E $97FE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05380F $97FF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053810 $9800: C-----  00       BRK  
  0x053811 $9801: C-----  00       BRK  
  0x053812 $9802: C-----  00       BRK  
  0x053813 $9803: C-----  00       BRK  
  0x053814 $9804: C-----  00       BRK  
  0x053815 $9805: C-----  00       BRK  
  0x053816 $9806: C-----  00       BRK  
  0x053817 $9807: C-----  00       BRK  
  0x053818 $9808: C-----  00       BRK  
  0x053819 $9809: C-----  00       BRK  
  0x05381A $980A: C-----  00       BRK  
  0x05381B $980B: C-----  00       BRK  
  0x05381C $980C: C-----  00       BRK  
  0x05381D $980D: C-----  00       BRK  
  0x05381E $980E: C-----  00       BRK  
  0x05381F $980F: C-----  00       BRK  
  0x053820 $9810: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053821 $9811: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053822 $9812: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053823 $9813: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053824 $9814: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053825 $9815: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053826 $9816: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053827 $9817: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053828 $9818: C-----  00       BRK  
  0x053829 $9819: C-----  00       BRK  
  0x05382A $981A: C-----  00       BRK  
  0x05382B $981B: C-----  00       BRK  
  0x05382C $981C: C-----  00       BRK  
  0x05382D $981D: C-----  00       BRK  
  0x05382E $981E: C-----  00       BRK  
  0x05382F $981F: C-----  00       BRK  
  0x053830 $9820: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x053831 $9821: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x053832 $9822: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053833 $9823: C-----  EC F3 63 CPX  $63F3
  0x053836 $9826: C-----  9D 1E 90 STA  $901E,X
  0x053839 $9829: C-----  60       RTS  
  0x05383A $982A: C-----  E0 13    CPX  #$13
  0x05383C $982C: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x05383D $982D: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x05383E $982E: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x05383F $982F: C-----  E1 6F    SBC  ($6F,X)
  0x053841 $9831: ------  .byte $9F
  0x053842 $9832: ------  .byte $5F
  0x053843 $9833: ------  .byte $EE
  0x053844 $9834: ------  .byte $F1
  0x053845 $9835: ------  .byte $F3
  0x053846 $9836: ------  .byte $CD
  0x053847 $9837: ------  .byte $3E
  0x053848 $9838: ------  .byte $90
  0x053849 $9839: ------  .byte $60
  0x05384A $983A: ------  .byte $A0
  0x05384B $983B: ------  .byte $11
  0x05384C $983C: ------  .byte $0E
  0x05384D $983D: ------  .byte $0C
  0x05384E $983E: ------  .byte $32
  0x05384F $983F: ------  .byte $C1
  0x053850 $9840: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053851 $9841: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053852 $9842: C-----  FE FE FE INC  $FEFE,X
  0x053855 $9845: C-----  FE FE FC INC  $FCFE,X
  0x053858 $9848: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053859 $9849: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05385A $984A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05385B $984B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x05385C $984C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05385D $984D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05385E $984E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05385F $984F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053860 $9850: C-----  01 01    ORA  ($01,X)
  0x053862 $9852: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053863 $9853: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053864 $9854: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053865 $9855: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053866 $9856: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053867 $9857: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053868 $9858: C-----  FE FE FC INC  $FCFE,X
  0x05386B $985B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05386C $985C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05386D $985D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05386E $985E: C-----  FE FD 73 INC  $73FD,X
  0x053871 $9861: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x053872 $9862: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x053873 $9863: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x053874 $9864: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053875 $9865: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053876 $9866: C-----  FD FD 8C SBC  $8CFD,X
  0x053879 $9869: C-----  70 60    BVS  $98CB
  0x05387B $986B: C-----  90 09    BCC  $9876
  0x05387D $986D: C-----  06 1A    ASL  $1A
  0x05387F $986F: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x053880 $9870: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053881 $9871: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053882 $9872: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053883 $9873: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053884 $9874: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053885 $9875: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053886 $9876: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053887 $9877: C-----  DE 81 46 DEC  $4681,X
  0x05388A $987A: C-----  38       SEC  
  0x05388B $987B: C-----  60       RTS  
  0x05388C $987C: C-----  A0 20    LDY  #$20
  0x05388E $987E: C-----  20 21 6E JSR  $6E21
  0x053891 $9881: C-----  B1 C3    LDA  ($C3),Y
  0x053893 $9883: C-----  4D 37 DE EOR  $DE37
  0x053896 $9886: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x053897 $9887: C-----  6A       ROR  A
  0x053898 $9888: C-----  91 4E    STA  ($4E),Y
  0x05389A $988A: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x05389B $988B: C-----  !!UNDEF $B2  ; unknown opcode, treating as data
  0x05389C $988C: C-----  C9 27    CMP  #$27
  0x05389E $988E: C-----  9D F5 7F STA  $7FF5,X
  0x0538A1 $9891: C-----  BE DE EE LDX  $EEDE,Y
  0x0538A4 $9894: C-----  EE EE EE INC  $EEEE
  0x0538A7 $9897: C-----  EC 81 47 CPX  $4781
  0x0538AA $989A: C-----  39 71 91 AND  $9171,Y
  0x0538AD $989D: C-----  11 11    ORA  ($11),Y
  0x0538AF $989F: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0538B0 $98A0: C-----  B5 B5    LDA  $B5,X
  0x0538B2 $98A2: C-----  B4 31    LDY  $31,X
  0x0538B4 $98A4: C-----  A5 35    LDA  $35
  0x0538B6 $98A6: C-----  B5 B5    LDA  $B5,X
  0x0538B8 $98A8: C-----  6A       ROR  A
  0x0538B9 $98A9: C-----  6A       ROR  A
  0x0538BA $98AA: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x0538BB $98AB: C-----  EE 7A EA INC  $EA7A
  0x0538BE $98AE: C-----  6A       ROR  A
  0x0538BF $98AF: C-----  6A       ROR  A
  0x0538C0 $98B0: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x0538C1 $98B1: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x0538C2 $98B2: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x0538C3 $98B3: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0538C4 $98B4: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0538C5 $98B5: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x0538C6 $98B6: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x0538C7 $98B7: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x0538C8 $98B8: C-----  8C B8 C8 STY  $C8B8
  0x0538CB $98BB: C-----  88       DEY  
  0x0538CC $98BC: C-----  88       DEY  
  0x0538CD $98BD: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x0538CE $98BE: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x0538CF $98BF: C-----  E8       INX  
  0x0538D0 $98C0: C-----  EE EE EE INC  $EEEE
  0x0538D3 $98C3: C-----  EC E2 CE CPX  $CEE2
  0x0538D6 $98C6: C-----  2E EE 91 ROL  $91EE
  0x0538D9 $98C9: C-----  11 11    ORA  ($11),Y
  0x0538DB $98CB: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x0538DC $98CC: C-----  1D 31 D1 ORA  $D131,X
  0x0538DF $98CF: C-----  11 E9    ORA  ($E9),Y
  0x0538E1 $98D1: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x0538E2 $98D2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x0538E3 $98D3: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0538E4 $98D4: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0538E5 $98D5: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0538E6 $98D6: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x0538E7 $98D7: C-----  EC 16 18 CPX  $1816
  0x0538EA $98DA: C-----  F0 10    BEQ  $98EC
  0x0538EC $98DC: C-----  10 10    BPL  $98EE
  0x0538EE $98DE: C-----  10 13    BPL  $98F3
  0x0538F0 $98E0: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0538F1 $98E1: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0538F2 $98E2: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x0538F3 $98E3: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x0538F4 $98E4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0538F5 $98E5: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0538F6 $98E6: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0538F7 $98E7: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x0538F8 $98E8: C-----  88       DEY  
  0x0538F9 $98E9: C-----  88       DEY  
  0x0538FA $98EA: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x0538FB $98EB: C-----  8C F8 88 STY  $88F8
  0x0538FE $98EE: C-----  88       DEY  
  0x0538FF $98EF: C-----  88       DEY  
  0x053900 $98F0: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x053901 $98F1: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x053902 $98F2: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053903 $98F3: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053904 $98F4: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053905 $98F5: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053906 $98F6: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x053907 $98F7: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x053908 $98F8: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x053909 $98F9: C-----  E8       INX  
  0x05390A $98FA: C-----  88       DEY  
  0x05390B $98FB: C-----  88       DEY  
  0x05390C $98FC: C-----  88       DEY  
  0x05390D $98FD: C-----  88       DEY  
  0x05390E $98FE: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x05390F $98FF: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x053910 $9900: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053911 $9901: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053912 $9902: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053913 $9903: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053914 $9904: C-----  F8       SED  
  0x053915 $9905: C-----  F8       SED  
  0x053916 $9906: C-----  F8       SED  
  0x053917 $9907: C-----  F8       SED  
  0x053918 $9908: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053919 $9909: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05391A $990A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05391B $990B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05391C $990C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05391D $990D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05391E $990E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05391F $990F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053920 $9910: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053921 $9911: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053922 $9912: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053923 $9913: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053924 $9914: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053925 $9915: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053926 $9916: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053927 $9917: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053928 $9918: C-----  F8       SED  
  0x053929 $9919: C-----  F8       SED  
  0x05392A $991A: C-----  F8       SED  
  0x05392B $991B: C-----  F8       SED  
  0x05392C $991C: C-----  F8       SED  
  0x05392D $991D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x05392E $991E: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x05392F $991F: C-----  F1 7E    SBC  ($7E),Y
  0x053931 $9921: C-----  7E 7E 7E ROR  $7E7E,X
  0x053934 $9924: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x053935 $9925: C-----  !!UNDEF $72  ; unknown opcode, treating as data
  0x053936 $9926: C-----  0E 7E 81 ASL  $817E
  0x053939 $9929: C-----  81 81    STA  ($81,X)
  0x05393B $992B: C-----  81 83    STA  ($83,X)
  0x05393D $992D: C-----  8D F1 81 STA  $81F1
  0x053940 $9930: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053941 $9931: C-----  F9 C5 3D SBC  $3DC5,Y
  0x053944 $9934: C-----  FD FD FD SBC  $FDFD,X
  0x053947 $9937: C-----  FD 03 06 SBC  $0603,X
  0x05394A $993A: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x05394B $993B: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x05394C $993C: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05394D $993D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05394E $993E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x05394F $993F: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x053950 $9940: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053951 $9941: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053952 $9942: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053953 $9943: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053954 $9944: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053955 $9945: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053956 $9946: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053957 $9947: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x053958 $9948: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x053959 $9949: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05395A $994A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05395B $994B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05395C $994C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05395D $994D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05395E $994E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x05395F $994F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053960 $9950: C-----  E0 E0    CPX  #$E0
  0x053962 $9952: C-----  E0 C0    CPX  #$C0
  0x053964 $9954: C-----  C0 C0    CPY  #$C0
  0x053966 $9956: C-----  C0 C0    CPY  #$C0
  0x053968 $9958: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053969 $9959: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05396A $995A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05396B $995B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05396C $995C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05396D $995D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05396E $995E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05396F $995F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053970 $9960: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053971 $9961: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053972 $9962: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053973 $9963: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053974 $9964: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053975 $9965: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053976 $9966: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053977 $9967: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053978 $9968: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053979 $9969: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05397A $996A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05397B $996B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x05397C $996C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05397D $996D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05397E $996E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x05397F $996F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053980 $9970: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053981 $9971: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053982 $9972: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053983 $9973: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053984 $9974: C-----  81 01    STA  ($01,X)
  0x053986 $9976: C-----  01 01    ORA  ($01,X)
  0x053988 $9978: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053989 $9979: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05398A $997A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05398B $997B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05398C $997C: C-----  FE FE FE INC  $FEFE,X
  0x05398F $997F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053990 $9980: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053991 $9981: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053992 $9982: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053993 $9983: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053994 $9984: C-----  B8       CLV  
  0x053995 $9985: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x053996 $9986: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053997 $9987: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053998 $9988: C-----  40       RTI  
  0x053999 $9989: C-----  40       RTI  
  0x05399A $998A: C-----  40       RTI  
  0x05399B $998B: C-----  40       RTI  
  0x05399C $998C: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x05399D $998D: C-----  58       CLI  
  0x05399E $998E: C-----  E0 40    CPX  #$40
  0x0539A0 $9990: C-----  7E 78 46 ROR  $4678,X
  0x0539A3 $9993: C-----  3E 7E 7E ROL  $7E7E,X
  0x0539A6 $9996: C-----  7E 7E 81 ROR  $817E,X
  0x0539A9 $9999: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0539AA $999A: C-----  B9 C1 81 LDA  $81C1,Y
  0x0539AD $999D: C-----  81 81    STA  ($81,X)
  0x0539AF $999F: C-----  81 DF    STA  ($DF,X)
  0x0539B1 $99A1: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0539B2 $99A2: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0539B3 $99A3: C-----  DE D1 8F DEC  $8FD1,X
  0x0539B6 $99A6: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x0539B7 $99A7: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x0539B8 $99A8: C-----  20 20 20 JSR  $2020
  0x0539BB $99AB: C-----  21 2E    AND  ($2E,X)
  0x0539BD $99AD: C-----  70 A0    BVS  $994F
  0x0539BF $99AF: C-----  20 BF B8 JSR  $B8BF
  0x0539C2 $99B2: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x0539C3 $99B3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x0539C4 $99B4: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0539C5 $99B5: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0539C6 $99B6: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0539C7 $99B7: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x0539C8 $99B8: C-----  40       RTI  
  0x0539C9 $99B9: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x0539CA $99BA: C-----  78       SEI  
  0x0539CB $99BB: C-----  C0 40    CPY  #$40
  0x0539CD $99BD: C-----  40       RTI  
  0x0539CE $99BE: C-----  40       RTI  
  0x0539CF $99BF: C-----  40       RTI  
  0x0539D0 $99C0: C-----  !!UNDEF $89  ; unknown opcode, treating as data
  0x0539D1 $99C1: C-----  9D 0A 37 STA  $370A,X
  0x0539D4 $99C4: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x0539D5 $99C5: C-----  55 6E    EOR  $6E,X
  0x0539D7 $99C7: C-----  E6 F6    INC  $F6
  0x0539D9 $99C9: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x0539DA $99CA: C-----  F5 C8    SBC  $C8,X
  0x0539DC $99CC: C-----  CC AA 91 CPY  $91AA
  0x0539DF $99CF: C-----  19 C0 80 ORA  $80C0,Y
  0x0539E2 $99D2: C-----  01 03    ORA  ($03,X)
  0x0539E4 $99D4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0539E5 $99D5: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x0539E6 $99D6: C-----  1D 3E C0 ORA  $C03E,X
  0x0539E9 $99D9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0539EA $99DA: C-----  00       BRK  
  0x0539EB $99DB: C-----  00       BRK  
  0x0539EC $99DC: C-----  00       BRK  
  0x0539ED $99DD: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0539EE $99DE: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0539EF $99DF: C-----  01 C0    ORA  ($C0,X)
  0x0539F1 $99E1: C-----  81 03    STA  ($03,X)
  0x0539F3 $99E3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0539F4 $99E4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x0539F5 $99E5: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x0539F6 $99E6: C-----  3D 7E C0 AND  $C07E,X
  0x0539F9 $99E9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x0539FA $99EA: C-----  00       BRK  
  0x0539FB $99EB: C-----  00       BRK  
  0x0539FC $99EC: C-----  08       PHP  
  0x0539FD $99ED: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x0539FE $99EE: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x0539FF $99EF: C-----  01 7F    ORA  ($7F,X)
  0x053A01 $99F1: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053A02 $99F2: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053A03 $99F3: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053A04 $99F4: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x053A05 $99F5: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053A06 $99F6: C-----  F5 EE    SBC  $EE,X
  0x053A08 $99F8: C-----  00       BRK  
  0x053A09 $99F9: C-----  40       RTI  
  0x053A0A $99FA: C-----  20 10 0B JSR  $0B10
  0x053A0D $99FD: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x053A0E $99FE: C-----  0A       ASL  A
  0x053A0F $99FF: C-----  11 98    ORA  ($98),Y
  0x053A11 $9A01: C-----  !!UNDEF $D2  ; unknown opcode, treating as data
  0x053A12 $9A02: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x053A13 $9A03: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x053A14 $9A04: C-----  9A       TXS  
  0x053A15 $9A05: C-----  !!UNDEF $5A  ; unknown opcode, treating as data
  0x053A16 $9A06: C-----  D8       CLD  
  0x053A17 $9A07: C-----  !!UNDEF $D2  ; unknown opcode, treating as data
  0x053A18 $9A08: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053A19 $9A09: C-----  3D 35 F5 AND  $F535,X
  0x053A1C $9A0C: C-----  75 B5    ADC  $B5,X
  0x053A1E $9A0E: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x053A1F $9A0F: C-----  3D 3B BB AND  $BB3B,X
  0x053A22 $9A12: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053A23 $9A13: C-----  B8       CLV  
  0x053A24 $9A14: C-----  !!UNDEF $A3  ; unknown opcode, treating as data
  0x053A25 $9A15: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x053A26 $9A16: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053A27 $9A17: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053A28 $9A18: C-----  C4 44    CPY  $44
  0x053A2A $9A1A: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x053A2B $9A1B: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x053A2C $9A1C: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x053A2D $9A1D: C-----  E4 44    CPX  $44
  0x053A2F $9A1F: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x053A30 $9A20: C-----  AD CD CD LDA  $CDCD
  0x053A33 $9A23: C-----  2D A8 4D AND  $4DA8
  0x053A36 $9A26: C-----  ED ED 5A SBC  $5AED
  0x053A39 $9A29: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x053A3A $9A2A: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x053A3B $9A2B: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x053A3C $9A2C: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x053A3D $9A2D: C-----  BA       TSX  
  0x053A3E $9A2E: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x053A3F $9A2F: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x053A40 $9A30: C-----  DD DD D8 CMP  $D8DD,X
  0x053A43 $9A33: C-----  85 5D    STA  $5D
  0x053A45 $9A35: C-----  DD DD DD CMP  $DDDD,X
  0x053A48 $9A38: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x053A49 $9A39: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x053A4A $9A3A: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x053A4B $9A3B: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x053A4C $9A3C: C-----  A2 22    LDX  #$22
  0x053A4E $9A3E: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x053A4F $9A3F: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x053A50 $9A40: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053A51 $9A41: C-----  B8       CLV  
  0x053A52 $9A42: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x053A53 $9A43: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x053A54 $9A44: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053A55 $9A45: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053A56 $9A46: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053A57 $9A47: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053A58 $9A48: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x053A59 $9A49: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x053A5A $9A4A: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x053A5B $9A4B: C-----  C4 44    CPY  $44
  0x053A5D $9A4D: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x053A5E $9A4E: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x053A5F $9A4F: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x053A60 $9A50: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x053A61 $9A51: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053A62 $9A52: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053A63 $9A53: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053A64 $9A54: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053A65 $9A55: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053A66 $9A56: C-----  B8       CLV  
  0x053A67 $9A57: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x053A68 $9A58: C-----  E4 44    CPX  $44
  0x053A6A $9A5A: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x053A6B $9A5B: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x053A6C $9A5C: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x053A6D $9A5D: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x053A6E $9A5E: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x053A6F $9A5F: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x053A70 $9A60: C-----  D8       CLD  
  0x053A71 $9A61: C-----  85 5D    STA  $5D
  0x053A73 $9A63: C-----  DD DD DD CMP  $DDDD,X
  0x053A76 $9A66: C-----  DD DD 27 CMP  $27DD,X
  0x053A79 $9A69: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x053A7A $9A6A: C-----  A2 22    LDX  #$22
  0x053A7C $9A6C: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x053A7D $9A6D: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x053A7E $9A6E: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x053A7F $9A6F: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x053A80 $9A70: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053A81 $9A71: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053A82 $9A72: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053A83 $9A73: C-----  FE FC F8 INC  $F8FC,X
  0x053A86 $9A76: C-----  F0 E1    BEQ  $9A59
  0x053A88 $9A78: C-----  00       BRK  
  0x053A89 $9A79: C-----  01 03    ORA  ($03,X)
  0x053A8B $9A7B: C-----  06 0C    ASL  $0C
  0x053A8D $9A7D: C-----  18       CLC  
  0x053A8E $9A7E: C-----  30 60    BMI  $9AE0
  0x053A90 $9A80: C-----  A6 D6    LDX  $D6
  0x053A92 $9A82: C-----  C6 34    DEC  $34
  0x053A94 $9A84: C-----  B6 56    LDX  $56,Y
  0x053A96 $9A86: C-----  E6 64    INC  $64
  0x053A98 $9A88: C-----  5D 2D 3D EOR  $3D2D,X
  0x053A9B $9A8B: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x053A9C $9A8C: C-----  4D AD 1D EOR  $1DAD
  0x053A9F $9A8F: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x053AA0 $9A90: C-----  EE EE E0 INC  $E0EE
  0x053AA3 $9A93: C-----  0E EE EE ASL  $EEEE
  0x053AA6 $9A96: C-----  EE EE 11 INC  $11EE
  0x053AA9 $9A99: C-----  11 1F    ORA  ($1F),Y
  0x053AAB $9A9B: C-----  F1 11    SBC  ($11),Y
  0x053AAD $9A9D: C-----  11 11    ORA  ($11),Y
  0x053AAF $9A9F: C-----  11 7F    ORA  ($7F),Y
  0x053AB1 $9AA1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053AB2 $9AA2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053AB3 $9AA3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053AB4 $9AA4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053AB5 $9AA5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053AB6 $9AA6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053AB7 $9AA7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053AB8 $9AA8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053AB9 $9AA9: C-----  C0 A0    CPY  #$A0
  0x053ABB $9AAB: C-----  90 88    BCC  $9A35
  0x053ABD $9AAD: C-----  84 02    STY  $02
  0x053ABF $9AAF: C-----  01 FF    ORA  ($FF,X)
  0x053AC1 $9AB1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053AC2 $9AB2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053AC3 $9AB3: C-----  FE FC F9 INC  $F9FC,X
  0x053AC6 $9AB6: C-----  F1 E6    SBC  ($E6),Y
  0x053AC8 $9AB8: C-----  00       BRK  
  0x053AC9 $9AB9: C-----  01 03    ORA  ($03,X)
  0x053ACB $9ABB: C-----  06 0C    ASL  $0C
  0x053ACD $9ABD: C-----  18       CLC  
  0x053ACE $9ABE: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x053ACF $9ABF: C-----  61 FF    ADC  ($FF,X)
  0x053AD1 $9AC1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053AD2 $9AC2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053AD3 $9AC3: C-----  FE FC F8 INC  $F8FC,X
  0x053AD6 $9AC6: C-----  F1 E2    SBC  ($E2),Y
  0x053AD8 $9AC8: C-----  00       BRK  
  0x053AD9 $9AC9: C-----  01 03    ORA  ($03,X)
  0x053ADB $9ACB: C-----  06 0C    ASL  $0C
  0x053ADD $9ACD: C-----  18       CLC  
  0x053ADE $9ACE: C-----  30 61    BMI  $9B31
  0x053AE0 $9AD0: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x053AE1 $9AD1: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x053AE2 $9AD2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053AE3 $9AD3: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x053AE4 $9AD4: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053AE5 $9AD5: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x053AE6 $9AD6: C-----  FD FA C0 SBC  $C0FA,X
  0x053AE9 $9AD9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053AEA $9ADA: C-----  00       BRK  
  0x053AEB $9ADB: C-----  10 08    BPL  $9AE5
  0x053AED $9ADD: C-----  05 02    ORA  $02
  0x053AEF $9ADF: C-----  05 CF    ORA  $CF
  0x053AF1 $9AE1: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x053AF2 $9AE2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053AF3 $9AE3: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x053AF4 $9AE4: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x053AF5 $9AE5: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x053AF6 $9AE6: C-----  B5 CE    LDA  $CE,X
  0x053AF8 $9AE8: C-----  C0 80    CPY  #$80
  0x053AFA $9AEA: C-----  20 10 0B JSR  $0B10
  0x053AFD $9AED: C-----  84 4A    STY  $4A
  0x053AFF $9AEF: C-----  31 67    AND  ($67),Y
  0x053B01 $9AF1: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x053B02 $9AF2: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x053B03 $9AF3: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x053B04 $9AF4: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053B05 $9AF5: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x053B06 $9AF6: C-----  FD F2 98 SBC  $98F2,X
  0x053B09 $9AF9: C-----  60       RTS  
  0x053B0A $9AFA: C-----  60       RTS  
  0x053B0B $9AFB: C-----  90 08    BCC  $9B05
  0x053B0D $9AFD: C-----  05 02    ORA  $02
  0x053B0F $9AFF: C-----  0D EF EF ORA  $EFEF
  0x053B12 $9B02: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053B13 $9B03: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053B14 $9B04: C-----  E8       INX  
  0x053B15 $9B05: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x053B16 $9B06: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x053B17 $9B07: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053B18 $9B08: C-----  10 10    BPL  $9B1A
  0x053B1A $9B0A: C-----  10 10    BPL  $9B1C
  0x053B1C $9B0C: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x053B1D $9B0D: C-----  78       SEI  
  0x053B1E $9B0E: C-----  90 10    BCC  $9B20
  0x053B20 $9B10: C-----  C1 83    CMP  ($83,X)
  0x053B22 $9B12: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053B23 $9B13: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053B24 $9B14: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x053B25 $9B15: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x053B26 $9B16: C-----  7D FE C0 ADC  $C0FE,X
  0x053B29 $9B19: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053B2A $9B1A: C-----  00       BRK  
  0x053B2B $9B1B: C-----  00       BRK  
  0x053B2C $9B1C: C-----  08       PHP  
  0x053B2D $9B1D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x053B2E $9B1E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x053B2F $9B1F: C-----  01 C3    ORA  ($C3,X)
  0x053B31 $9B21: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x053B32 $9B22: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053B33 $9B23: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053B34 $9B24: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x053B35 $9B25: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x053B36 $9B26: C-----  FD FE C0 SBC  $C0FE,X
  0x053B39 $9B29: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053B3A $9B2A: C-----  00       BRK  
  0x053B3B $9B2B: C-----  10 08    BPL  $9B35
  0x053B3D $9B2D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x053B3E $9B2E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x053B3F $9B2F: C-----  01 5D    ORA  ($5D,X)
  0x053B41 $9B31: C-----  DD DD DD CMP  $DDDD,X
  0x053B44 $9B34: C-----  DD DD DC CMP  $DCDD,X
  0x053B47 $9B37: C-----  C1 A2    CMP  ($A2,X)
  0x053B49 $9B39: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x053B4A $9B3A: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x053B4B $9B3B: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x053B4C $9B3C: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x053B4D $9B3D: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x053B4E $9B3E: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x053B4F $9B3F: C-----  3E 7F BF ROL  $BF7F,X
  0x053B52 $9B42: C-----  DE ED F3 DEC  $F3ED,X
  0x053B55 $9B45: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x053B56 $9B46: C-----  DD BE 80 CMP  $80BE,X
  0x053B59 $9B49: C-----  40       RTI  
  0x053B5A $9B4A: C-----  21 12    AND  ($12,X)
  0x053B5C $9B4C: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x053B5D $9B4D: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x053B5E $9B4E: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x053B5F $9B4F: C-----  41 1F    EOR  ($1F,X)
  0x053B61 $9B51: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053B62 $9B52: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053B63 $9B53: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053B64 $9B54: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053B65 $9B55: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x053B66 $9B56: C-----  FD F2 E0 SBC  $E0F2,X
  0x053B69 $9B59: C-----  C0 20    CPY  #$20
  0x053B6B $9B5B: C-----  10 08    BPL  $9B65
  0x053B6D $9B5D: C-----  05 02    ORA  $02
  0x053B6F $9B5F: C-----  0D F7 F7 ORA  $F7F7
  0x053B72 $9B62: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053B73 $9B63: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053B74 $9B64: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053B75 $9B65: C-----  F0 07    BEQ  $9B6E
  0x053B77 $9B67: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053B78 $9B68: C-----  08       PHP  
  0x053B79 $9B69: C-----  08       PHP  
  0x053B7A $9B6A: C-----  08       PHP  
  0x053B7B $9B6B: C-----  08       PHP  
  0x053B7C $9B6C: C-----  08       PHP  
  0x053B7D $9B6D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053B7E $9B6E: C-----  F8       SED  
  0x053B7F $9B6F: C-----  08       PHP  
  0x053B80 $9B70: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x053B81 $9B71: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x053B82 $9B72: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053B83 $9B73: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053B84 $9B74: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053B85 $9B75: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x053B86 $9B76: C-----  FD F2 90 SBC  $90F2,X
  0x053B89 $9B79: C-----  60       RTS  
  0x053B8A $9B7A: C-----  E0 10    CPX  #$10
  0x053B8C $9B7C: C-----  08       PHP  
  0x053B8D $9B7D: C-----  05 02    ORA  $02
  0x053B8F $9B7F: C-----  0D E8 06 ORA  $06E8
  0x053B92 $9B82: C-----  EE EE EE INC  $EEEE
  0x053B95 $9B85: C-----  EE EE EC INC  $ECEE
  0x053B98 $9B88: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x053B99 $9B89: C-----  F9 11 11 SBC  $1111,Y
  0x053B9C $9B8C: C-----  11 11    ORA  ($11),Y
  0x053B9E $9B8E: C-----  11 13    ORA  ($13),Y
  0x053BA0 $9B90: C-----  2E EE EE ROL  $EEEE
  0x053BA3 $9B93: C-----  EE EE EE INC  $EEEE
  0x053BA6 $9B96: C-----  EE EE D1 INC  $D1EE
  0x053BA9 $9B99: C-----  11 11    ORA  ($11),Y
  0x053BAB $9B9B: C-----  11 11    ORA  ($11),Y
  0x053BAD $9B9D: C-----  11 11    ORA  ($11),Y
  0x053BAF $9B9F: C-----  11 7D    ORA  ($7D),Y
  0x053BB1 $9BA1: C-----  !!UNDEF $B3  ; unknown opcode, treating as data
  0x053BB2 $9BA2: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x053BB3 $9BA3: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x053BB4 $9BA4: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x053BB5 $9BA5: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x053BB6 $9BA6: C-----  FD F2 82 SBC  $82F2,X
  0x053BB9 $9BA9: C-----  4C 30 30 JMP  $3030
  0x053BBC $9BAC: C-----  C8       INY  
  0x053BBD $9BAD: C-----  05 02    ORA  $02
  0x053BBF $9BAF: C-----  0D 7E B9 ORA  $B97E
  0x053BC2 $9BB2: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x053BC3 $9BB3: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x053BC4 $9BB4: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x053BC5 $9BB5: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x053BC6 $9BB6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053BC7 $9BB7: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053BC8 $9BB8: C-----  81 46    STA  ($46,X)
  0x053BCA $9BBA: C-----  28       PLP  
  0x053BCB $9BBB: C-----  30 48    BMI  $9C05
  0x053BCD $9BBD: C-----  84 03    STY  $03
  0x053BCF $9BBF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053BD0 $9BC0: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053BD1 $9BC1: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053BD2 $9BC2: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053BD3 $9BC3: C-----  EC F3 E3 CPX  $E3F3
  0x053BD6 $9BC6: C-----  DD 3E C0 CMP  $C03E,X
  0x053BD9 $9BC9: C-----  40       RTI  
  0x053BDA $9BCA: C-----  20 13 0C JSR  $0C13
  0x053BDD $9BCD: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x053BDE $9BCE: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x053BDF $9BCF: C-----  C1 6F    CMP  ($6F,X)
  0x053BE1 $9BD1: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x053BE2 $9BD2: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x053BE3 $9BD3: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053BE4 $9BD4: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053BE5 $9BD5: C-----  F8       SED  
  0x053BE6 $9BD6: C-----  F9 E6 90 SBC  $90E6,Y
  0x053BE9 $9BD9: C-----  60       RTS  
  0x053BEA $9BDA: C-----  A0 10    LDY  #$10
  0x053BEC $9BDC: C-----  08       PHP  
  0x053BED $9BDD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053BEE $9BDE: C-----  06 19    ASL  $19
  0x053BF0 $9BE0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053BF1 $9BE1: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053BF2 $9BE2: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x053BF3 $9BE3: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x053BF4 $9BE4: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x053BF5 $9BE5: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x053BF6 $9BE6: C-----  7D FE 80 ADC  $80FE,X
  0x053BF9 $9BE9: C-----  40       RTI  
  0x053BFA $9BEA: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x053BFB $9BEB: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x053BFC $9BEC: C-----  18       CLC  
  0x053BFD $9BED: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x053BFE $9BEE: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x053BFF $9BEF: C-----  01 1F    ORA  ($1F,X)
  0x053C01 $9BF1: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053C02 $9BF2: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053C03 $9BF3: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053C04 $9BF4: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053C05 $9BF5: C-----  FE F9 ED INC  $EDF9,X
  0x053C08 $9BF8: C-----  E0 C0    CPX  #$C0
  0x053C0A $9BFA: C-----  20 10 09 JSR  $0910
  0x053C0D $9BFD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053C0E $9BFE: C-----  1E 72 FF ASL  $FF72,X
  0x053C11 $9C01: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053C12 $9C02: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053C13 $9C03: C-----  FE FC F8 INC  $F8FC,X
  0x053C16 $9C06: C-----  F0 E0    BEQ  $9BE8
  0x053C18 $9C08: C-----  00       BRK  
  0x053C19 $9C09: C-----  01 03    ORA  ($03,X)
  0x053C1B $9C0B: C-----  06 0C    ASL  $0C
  0x053C1D $9C0D: C-----  18       CLC  
  0x053C1E $9C0E: C-----  30 60    BMI  $9C70
  0x053C20 $9C10: C-----  C0 80    CPY  #$80
  0x053C22 $9C12: C-----  00       BRK  
  0x053C23 $9C13: C-----  00       BRK  
  0x053C24 $9C14: C-----  01 03    ORA  ($03,X)
  0x053C26 $9C16: C-----  05 0E    ORA  $0E
  0x053C28 $9C18: C-----  C0 80    CPY  #$80
  0x053C2A $9C1A: C-----  00       BRK  
  0x053C2B $9C1B: C-----  00       BRK  
  0x053C2C $9C1C: C-----  00       BRK  
  0x053C2D $9C1D: C-----  00       BRK  
  0x053C2E $9C1E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x053C2F $9C1F: C-----  01 C0    ORA  ($C0,X)
  0x053C31 $9C21: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053C32 $9C22: C-----  00       BRK  
  0x053C33 $9C23: C-----  01 03    ORA  ($03,X)
  0x053C35 $9C25: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053C36 $9C26: C-----  0D 1E C0 ORA  $C01E
  0x053C39 $9C29: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053C3A $9C2A: C-----  00       BRK  
  0x053C3B $9C2B: C-----  00       BRK  
  0x053C3C $9C2C: C-----  00       BRK  
  0x053C3D $9C2D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x053C3E $9C2E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x053C3F $9C2F: C-----  01 3F    ORA  ($3F,X)
  0x053C41 $9C31: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053C42 $9C32: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053C43 $9C33: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053C44 $9C34: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053C45 $9C35: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053C46 $9C36: C-----  FD FE 00 SBC  $00FE,X
  0x053C49 $9C39: C-----  40       RTI  
  0x053C4A $9C3A: C-----  20 10 08 JSR  $0810
  0x053C4D $9C3D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x053C4E $9C3E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x053C4F $9C3F: C-----  01 0F    ORA  ($0F,X)
  0x053C51 $9C41: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053C52 $9C42: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053C53 $9C43: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x053C54 $9C44: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053C55 $9C45: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053C56 $9C46: C-----  FD FE 00 SBC  $00FE,X
  0x053C59 $9C49: C-----  00       BRK  
  0x053C5A $9C4A: C-----  20 10 08 JSR  $0810
  0x053C5D $9C4D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x053C5E $9C4E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x053C5F $9C4F: C-----  01 FF    ORA  ($FF,X)
  0x053C61 $9C51: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053C62 $9C52: C-----  FE FE FE INC  $FEFE,X
  0x053C65 $9C55: C-----  EE DE BC INC  $BCDE
  0x053C68 $9C58: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053C69 $9C59: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053C6A $9C5A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053C6B $9C5B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053C6C $9C5C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053C6D $9C5D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053C6E $9C5E: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x053C6F $9C5F: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x053C70 $9C60: C-----  7E BD DB ROR  $DBBD,X
  0x053C73 $9C63: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x053C74 $9C64: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x053C75 $9C65: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x053C76 $9C66: C-----  7D FE 81 ADC  $81FE,X
  0x053C79 $9C69: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x053C7A $9C6A: C-----  24 18    BIT  $18
  0x053C7C $9C6C: C-----  38       SEC  
  0x053C7D $9C6D: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x053C7E $9C6E: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x053C7F $9C6F: C-----  01 7C    ORA  ($7C,X)
  0x053C81 $9C71: C-----  BC DC FC LDY  $FCDC,X
  0x053C84 $9C74: C-----  F8       SED  
  0x053C85 $9C75: C-----  F8       SED  
  0x053C86 $9C76: C-----  F8       SED  
  0x053C87 $9C77: C-----  F8       SED  
  0x053C88 $9C78: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x053C89 $9C79: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x053C8A $9C7A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053C8B $9C7B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053C8C $9C7C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053C8D $9C7D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053C8E $9C7E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053C8F $9C7F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053C90 $9C80: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053C91 $9C81: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053C92 $9C82: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053C93 $9C83: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053C94 $9C84: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053C95 $9C85: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x053C96 $9C86: C-----  FD FA 00 SBC  $00FA,X
  0x053C99 $9C89: C-----  40       RTI  
  0x053C9A $9C8A: C-----  20 10 08 JSR  $0810
  0x053C9D $9C8D: C-----  05 02    ORA  $02
  0x053C9F $9C8F: C-----  05 79    ORA  $79
  0x053CA1 $9C91: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x053CA2 $9C92: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x053CA3 $9C93: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x053CA4 $9C94: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x053CA5 $9C95: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053CA6 $9C96: C-----  FD FE 86 SBC  $86FE,X
  0x053CA9 $9C99: C-----  48       PHA  
  0x053CAA $9C9A: C-----  30 30    BMI  $9CCC
  0x053CAC $9C9C: C-----  C8       INY  
  0x053CAD $9C9D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x053CAE $9C9E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x053CAF $9C9F: C-----  01 67    ORA  ($67,X)
  0x053CB1 $9CA1: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x053CB2 $9CA2: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x053CB3 $9CA3: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x053CB4 $9CA4: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053CB5 $9CA5: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053CB6 $9CA6: C-----  FD FE 98 SBC  $98FE,X
  0x053CB9 $9CA9: C-----  60       RTS  
  0x053CBA $9CAA: C-----  60       RTS  
  0x053CBB $9CAB: C-----  90 08    BCC  $9CB5
  0x053CBD $9CAD: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x053CBE $9CAE: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x053CBF $9CAF: C-----  01 7F    ORA  ($7F,X)
  0x053CC1 $9CB1: C-----  BE DD E3 LDX  $E3DD,Y
  0x053CC4 $9CB4: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x053CC5 $9CB5: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x053CC6 $9CB6: C-----  3D FE 80 AND  $80FE,X
  0x053CC9 $9CB9: C-----  41 22    EOR  ($22,X)
  0x053CCB $9CBB: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x053CCC $9CBC: C-----  18       CLC  
  0x053CCD $9CBD: C-----  24 C2    BIT  $C2
  0x053CCF $9CBF: C-----  01 7F    ORA  ($7F,X)
  0x053CD1 $9CC1: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053CD2 $9CC2: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053CD3 $9CC3: C-----  EE F5 F3 INC  $F3F5
  0x053CD6 $9CC6: C-----  ED DE 80 SBC  $80DE
  0x053CD9 $9CC9: C-----  40       RTI  
  0x053CDA $9CCA: C-----  20 11 0A JSR  $0A11
  0x053CDD $9CCD: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x053CDE $9CCE: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x053CDF $9CCF: C-----  21 F8    AND  ($F8,X)
  0x053CE1 $9CD1: C-----  F0 70    BEQ  $9D43
  0x053CE3 $9CD3: C-----  F0 F0    BEQ  $9CC5
  0x053CE5 $9CD5: C-----  F0 E0    BEQ  $9CB7
  0x053CE7 $9CD7: C-----  E0 7F    CPX  #$7F
  0x053CE9 $9CD9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053CEA $9CDA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053CEB $9CDB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053CEC $9CDC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053CED $9CDD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053CEE $9CDE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053CEF $9CDF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053CF0 $9CE0: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053CF1 $9CE1: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053CF2 $9CE2: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053CF3 $9CE3: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053CF4 $9CE4: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053CF5 $9CE5: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053CF6 $9CE6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053CF7 $9CE7: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x053CF8 $9CE8: C-----  C1 41    CMP  ($41,X)
  0x053CFA $9CEA: C-----  21 11    AND  ($11,X)
  0x053CFC $9CEC: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x053CFD $9CED: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053CFE $9CEE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053CFF $9CEF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053D00 $9CF0: C-----  E0 E0    CPX  #$E0
  0x053D02 $9CF2: C-----  E0 C0    CPX  #$C0
  0x053D04 $9CF4: C-----  C1 C1    CMP  ($C1,X)
  0x053D06 $9CF6: C-----  C1 C1    CMP  ($C1,X)
  0x053D08 $9CF8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053D09 $9CF9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053D0A $9CFA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053D0B $9CFB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053D0C $9CFC: C-----  FE FE FE INC  $FEFE,X
  0x053D0F $9CFF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053D10 $9D00: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053D11 $9D01: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053D12 $9D02: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053D13 $9D03: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053D14 $9D04: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053D15 $9D05: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053D16 $9D06: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053D17 $9D07: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053D18 $9D08: C-----  F0 F0    BEQ  $9CFA
  0x053D1A $9D0A: C-----  F0 F0    BEQ  $9CFC
  0x053D1C $9D0C: C-----  E8       INX  
  0x053D1D $9D0D: C-----  E4 E2    CPX  $E2
  0x053D1F $9D0F: C-----  E1 FF    SBC  ($FF,X)
  0x053D21 $9D11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053D22 $9D12: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053D23 $9D13: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053D24 $9D14: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053D25 $9D15: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053D26 $9D16: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053D27 $9D17: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053D28 $9D18: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053D29 $9D19: C-----  C0 A0    CPY  #$A0
  0x053D2B $9D1B: C-----  90 88    BCC  $9CA5
  0x053D2D $9D1D: C-----  84 82    STY  $82
  0x053D2F $9D1F: C-----  81 1F    STA  ($1F,X)
  0x053D31 $9D21: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053D32 $9D22: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053D33 $9D23: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053D34 $9D24: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053D35 $9D25: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053D36 $9D26: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053D37 $9D27: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053D38 $9D28: C-----  E1 E1    SBC  ($E1,X)
  0x053D3A $9D2A: C-----  E1 D1    SBC  ($D1,X)
  0x053D3C $9D2C: C-----  C9 C5    CMP  #$C5
  0x053D3E $9D2E: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x053D3F $9D2F: C-----  C1 FF    CMP  ($FF,X)
  0x053D41 $9D31: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053D42 $9D32: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053D43 $9D33: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053D44 $9D34: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053D45 $9D35: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053D46 $9D36: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053D47 $9D37: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053D48 $9D38: C-----  81 41    STA  ($41,X)
  0x053D4A $9D3A: C-----  21 11    AND  ($11,X)
  0x053D4C $9D3C: C-----  09 05    ORA  #$05
  0x053D4E $9D3E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053D4F $9D3F: C-----  01 CB    ORA  ($CB,X)
  0x053D51 $9D41: C-----  9D 0E 35 STA  $350E,X
  0x053D54 $9D44: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x053D55 $9D45: C-----  55 6C    EOR  $6C,X
  0x053D57 $9D47: C-----  E4 C4    CPX  $C4
  0x053D59 $9D49: C-----  !!UNDEF $D2  ; unknown opcode, treating as data
  0x053D5A $9D4A: C-----  F9 CE CE SBC  $CECE,Y
  0x053D5D $9D4D: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x053D5E $9D4E: C-----  !!UNDEF $93  ; unknown opcode, treating as data
  0x053D5F $9D4F: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x053D60 $9D50: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053D61 $9D51: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x053D62 $9D52: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x053D63 $9D53: C-----  6C B4 D3 JMP  ($D3B4)
  0x053D66 $9D56: C-----  ED 56 F0 SBC  $F056
  0x053D69 $9D59: C-----  C8       INY  
  0x053D6A $9D5A: C-----  24 93    BIT  $93
  0x053D6C $9D5C: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x053D6D $9D5D: C-----  2C 92 E9 BIT  $E992
  0x053D70 $9D60: C-----  A9 DD    LDA  #$DD
  0x053D72 $9D62: C-----  CA       DEX  
  0x053D73 $9D63: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x053D74 $9D64: C-----  !!UNDEF $B3  ; unknown opcode, treating as data
  0x053D75 $9D65: C-----  55 EE    EOR  $EE,X
  0x053D77 $9D67: C-----  66 56    ROR  $56
  0x053D79 $9D69: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x053D7A $9D6A: C-----  35 C8    AND  $C8,X
  0x053D7C $9D6C: C-----  4C AA 11 JMP  $11AA
  0x053D7F $9D6F: C-----  99 BA D9 STA  $D9BA,Y
  0x053D82 $9D72: C-----  CE 37 B3 DEC  $B337
  0x053D85 $9D75: C-----  55 EE    EOR  $EE,X
  0x053D87 $9D77: C-----  E6 65    INC  $65
  0x053D89 $9D79: C-----  36 39    ROL  $39,X
  0x053D8B $9D7B: C-----  CC 4E AB CPY  $AB4E
  0x053D8E $9D7E: C-----  11 19    ORA  ($19),Y
  0x053D90 $9D80: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053D91 $9D81: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053D92 $9D82: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053D93 $9D83: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053D94 $9D84: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053D95 $9D85: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053D96 $9D86: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053D97 $9D87: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053D98 $9D88: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x053D99 $9D89: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x053D9A $9D8A: C-----  A2 92    LDX  #$92
  0x053D9C $9D8C: C-----  8A       TXA  
  0x053D9D $9D8D: C-----  86 02    STX  $02
  0x053D9F $9D8F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053DA0 $9D90: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053DA1 $9D91: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053DA2 $9D92: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053DA3 $9D93: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053DA4 $9D94: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053DA5 $9D95: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053DA6 $9D96: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053DA7 $9D97: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053DA8 $9D98: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x053DA9 $9D99: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x053DAA $9D9A: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x053DAB $9D9B: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x053DAC $9D9C: C-----  0A       ASL  A
  0x053DAD $9D9D: C-----  06 02    ASL  $02
  0x053DAF $9D9F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053DB0 $9DA0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053DB1 $9DA1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053DB2 $9DA2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053DB3 $9DA3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053DB4 $9DA4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053DB5 $9DA5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053DB6 $9DA6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053DB7 $9DA7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053DB8 $9DA8: C-----  84 44    STY  $44
  0x053DBA $9DAA: C-----  24 14    BIT  $14
  0x053DBC $9DAC: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x053DBD $9DAD: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x053DBE $9DAE: C-----  06 05    ASL  $05
  0x053DC0 $9DB0: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053DC1 $9DB1: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053DC2 $9DB2: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053DC3 $9DB3: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053DC4 $9DB4: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053DC5 $9DB5: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053DC6 $9DB6: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053DC7 $9DB7: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053DC8 $9DB8: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x053DC9 $9DB9: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x053DCA $9DBA: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x053DCB $9DBB: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x053DCC $9DBC: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x053DCD $9DBD: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x053DCE $9DBE: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x053DCF $9DBF: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x053DD0 $9DC0: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053DD1 $9DC1: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053DD2 $9DC2: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053DD3 $9DC3: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053DD4 $9DC4: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x053DD5 $9DC5: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x053DD6 $9DC6: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053DD7 $9DC7: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053DD8 $9DC8: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x053DD9 $9DC9: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x053DDA $9DCA: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x053DDB $9DCB: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x053DDC $9DCC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053DDD $9DCD: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x053DDE $9DCE: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053DDF $9DCF: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053DE0 $9DD0: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053DE1 $9DD1: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053DE2 $9DD2: C-----  D9 87 5F CMP  $5F87,Y
  0x053DE5 $9DD5: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053DE6 $9DD6: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053DE7 $9DD7: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053DE8 $9DD8: C-----  21 21    AND  ($21,X)
  0x053DEA $9DDA: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x053DEB $9DDB: C-----  79 A3 23 ADC  $23A3,Y
  0x053DEE $9DDE: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x053DEF $9DDF: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x053DF0 $9DE0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053DF1 $9DE1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053DF2 $9DE2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053DF3 $9DE3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053DF4 $9DE4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053DF5 $9DE5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053DF6 $9DE6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053DF7 $9DE7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053DF8 $9DE8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053DF9 $9DE9: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053DFA $9DEA: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053DFB $9DEB: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053DFC $9DEC: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053DFD $9DED: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053DFE $9DEE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053DFF $9DEF: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053E00 $9DF0: C-----  20 40 40 JSR  $4040
  0x053E03 $9DF3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053E04 $9DF4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053E05 $9DF5: C-----  BC FE C3 LDY  $C3FE,X
  0x053E08 $9DF8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053E09 $9DF9: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053E0A $9DFA: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053E0B $9DFB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053E0C $9DFC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053E0D $9DFD: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x053E0E $9DFE: C-----  01 00    ORA  ($00,X)
  0x053E10 $9E00: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053E11 $9E01: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053E12 $9E02: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053E13 $9E03: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053E14 $9E04: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053E15 $9E05: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053E16 $9E06: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053E17 $9E07: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053E18 $9E08: C-----  90 50    BCC  $9E5A
  0x053E1A $9E0A: C-----  30 10    BMI  $9E1C
  0x053E1C $9E0C: C-----  18       CLC  
  0x053E1D $9E0D: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x053E1E $9E0E: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x053E1F $9E0F: C-----  11 7F    ORA  ($7F),Y
  0x053E21 $9E11: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053E22 $9E12: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053E23 $9E13: C-----  EC F3 E3 CPX  $E3F3
  0x053E26 $9E16: C-----  DD 3E 80 CMP  $803E,X
  0x053E29 $9E19: C-----  40       RTI  
  0x053E2A $9E1A: C-----  20 13 0C JSR  $0C13
  0x053E2D $9E1D: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x053E2E $9E1E: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x053E2F $9E1F: C-----  C1 7E    CMP  ($7E,X)
  0x053E31 $9E21: C-----  B9 D7 CF LDA  $CFD7,Y
  0x053E34 $9E24: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x053E35 $9E25: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x053E36 $9E26: C-----  FD FE 81 SBC  $81FE,X
  0x053E39 $9E29: C-----  46 28    LSR  $28
  0x053E3B $9E2B: C-----  30 48    BMI  $9E75
  0x053E3D $9E2D: C-----  84 02    STY  $02
  0x053E3F $9E2F: C-----  01 7F    ORA  ($7F,X)
  0x053E41 $9E31: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053E42 $9E32: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053E43 $9E33: C-----  EE F5 F3 INC  $F3F5
  0x053E46 $9E36: C-----  CD BE 80 CMP  $80BE
  0x053E49 $9E39: C-----  40       RTI  
  0x053E4A $9E3A: C-----  20 11 0A JSR  $0A11
  0x053E4D $9E3D: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x053E4E $9E3E: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x053E4F $9E3F: C-----  41 6F    EOR  ($6F,X)
  0x053E51 $9E41: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x053E52 $9E42: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x053E53 $9E43: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053E54 $9E44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053E55 $9E45: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053E56 $9E46: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053E57 $9E47: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053E58 $9E48: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x053E59 $9E49: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x053E5A $9E4A: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x053E5B $9E4B: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x053E5C $9E4C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053E5D $9E4D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053E5E $9E4E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053E5F $9E4F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x053E60 $9E50: C-----  81 81    STA  ($81,X)
  0x053E62 $9E52: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x053E63 $9E53: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x053E64 $9E54: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x053E65 $9E55: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053E66 $9E56: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053E67 $9E57: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053E68 $9E58: C-----  FE FE FC INC  $FCFE,X
  0x053E6B $9E5B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053E6C $9E5C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053E6D $9E5D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053E6E $9E5E: C-----  FE FD 7F INC  $7FFD,X
  0x053E71 $9E61: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053E72 $9E62: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x053E73 $9E63: C-----  7E FE FE ROR  $FEFE,X
  0x053E76 $9E66: C-----  FE FC 9F INC  $9FFC,X
  0x053E79 $9E69: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x053E7A $9E6A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053E7B $9E6B: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x053E7C $9E6C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053E7D $9E6D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053E7E $9E6E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053E7F $9E6F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053E80 $9E70: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053E81 $9E71: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053E82 $9E72: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053E83 $9E73: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053E84 $9E74: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053E85 $9E75: C-----  06 0B    ASL  $0B
  0x053E87 $9E77: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053E88 $9E78: C-----  F8       SED  
  0x053E89 $9E79: C-----  F8       SED  
  0x053E8A $9E7A: C-----  F8       SED  
  0x053E8B $9E7B: C-----  F8       SED  
  0x053E8C $9E7C: C-----  F9 FF FE SBC  $FEFF,Y
  0x053E8F $9E7F: C-----  F9 7E B9 SBC  $B97E,Y
  0x053E92 $9E82: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x053E93 $9E83: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x053E94 $9E84: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x053E95 $9E85: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053E96 $9E86: C-----  FD FE 81 SBC  $81FE,X
  0x053E99 $9E89: C-----  46 38    LSR  $38
  0x053E9B $9E8B: C-----  30 C8    BMI  $9E55
  0x053E9D $9E8D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x053E9E $9E8E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x053E9F $9E8F: C-----  01 7F    ORA  ($7F,X)
  0x053EA1 $9E91: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x053EA2 $9E92: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x053EA3 $9E93: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x053EA4 $9E94: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053EA5 $9E95: C-----  FE F9 E7 INC  $E7F9,X
  0x053EA8 $9E98: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053EA9 $9E99: C-----  40       RTI  
  0x053EAA $9E9A: C-----  20 10 09 JSR  $0910
  0x053EAD $9E9D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053EAE $9E9E: C-----  1E 78 7F ASL  $7F78,X
  0x053EB1 $9EA1: C-----  BE D9 E3 LDX  $E3D9,Y
  0x053EB4 $9EA4: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x053EB5 $9EA5: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053EB6 $9EA6: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053EB7 $9EA7: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x053EB8 $9EA8: C-----  81 47    STA  ($47,X)
  0x053EBA $9EAA: C-----  3E 7C E4 ROL  $E47C,X
  0x053EBD $9EAD: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x053EBE $9EAE: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x053EBF $9EAF: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x053EC0 $9EB0: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x053EC1 $9EB1: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x053EC2 $9EB2: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053EC3 $9EB3: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053EC4 $9EB4: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053EC5 $9EB5: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x053EC6 $9EB6: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x053EC7 $9EB7: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x053EC8 $9EB8: C-----  E9 89    SBC  #$89
  0x053ECA $9EBA: C-----  09 09    ORA  #$09
  0x053ECC $9EBC: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x053ECD $9EBD: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x053ECE $9EBE: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053ECF $9EBF: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x053ED0 $9EC0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053ED1 $9EC1: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053ED2 $9EC2: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053ED3 $9EC3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053ED4 $9EC4: C-----  F8       SED  
  0x053ED5 $9EC5: C-----  F8       SED  
  0x053ED6 $9EC6: C-----  F8       SED  
  0x053ED7 $9EC7: C-----  F8       SED  
  0x053ED8 $9EC8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053ED9 $9EC9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053EDA $9ECA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053EDB $9ECB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053EDC $9ECC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053EDD $9ECD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053EDE $9ECE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053EDF $9ECF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053EE0 $9ED0: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053EE1 $9ED1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053EE2 $9ED2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053EE3 $9ED3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053EE4 $9ED4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053EE5 $9ED5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053EE6 $9ED6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053EE7 $9ED7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053EE8 $9ED8: C-----  E0 E0    CPX  #$E0
  0x053EEA $9EDA: C-----  E0 D0    CPX  #$D0
  0x053EEC $9EDC: C-----  C8       INY  
  0x053EED $9EDD: C-----  C4 C2    CPY  $C2
  0x053EEF $9EDF: C-----  C1 F8    CMP  ($F8,X)
  0x053EF1 $9EE1: C-----  F0 F0    BEQ  $9ED3
  0x053EF3 $9EE3: C-----  F0 F0    BEQ  $9ED5
  0x053EF5 $9EE5: C-----  F0 E0    BEQ  $9EC7
  0x053EF7 $9EE7: C-----  E0 FF    CPX  #$FF
  0x053EF9 $9EE9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053EFA $9EEA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053EFB $9EEB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053EFC $9EEC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053EFD $9EED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053EFE $9EEE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053EFF $9EEF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F00 $9EF0: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053F01 $9EF1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053F02 $9EF2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x053F03 $9EF3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053F04 $9EF4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053F05 $9EF5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053F06 $9EF6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053F07 $9EF7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x053F08 $9EF8: C-----  E0 E0    CPX  #$E0
  0x053F0A $9EFA: C-----  E0 D0    CPX  #$D0
  0x053F0C $9EFC: C-----  C8       INY  
  0x053F0D $9EFD: C-----  C4 C2    CPY  $C2
  0x053F0F $9EFF: C-----  C1 FF    CMP  ($FF,X)
  0x053F11 $9F01: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F12 $9F02: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F13 $9F03: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F14 $9F04: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F15 $9F05: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F16 $9F06: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F17 $9F07: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F18 $9F08: C-----  88       DEY  
  0x053F19 $9F09: C-----  48       PHA  
  0x053F1A $9F0A: C-----  28       PLP  
  0x053F1B $9F0B: C-----  18       CLC  
  0x053F1C $9F0C: C-----  08       PHP  
  0x053F1D $9F0D: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x053F1E $9F0E: C-----  0A       ASL  A
  0x053F1F $9F0F: C-----  09 FF    ORA  #$FF
  0x053F21 $9F11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F22 $9F12: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F23 $9F13: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F24 $9F14: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F25 $9F15: C-----  FE FB EF INC  $EFFB,X
  0x053F28 $9F18: C-----  88       DEY  
  0x053F29 $9F19: C-----  48       PHA  
  0x053F2A $9F1A: C-----  28       PLP  
  0x053F2B $9F1B: C-----  18       CLC  
  0x053F2C $9F1C: C-----  09 0F    ORA  #$0F
  0x053F2E $9F1E: C-----  1E 79 FF ASL  $FF79,X
  0x053F31 $9F21: C-----  FE F9 F7 INC  $F7F9,X
  0x053F34 $9F24: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x053F35 $9F25: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053F36 $9F26: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F37 $9F27: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F38 $9F28: C-----  91 57    STA  ($57),Y
  0x053F3A $9F2A: C-----  3E 78 F8 ROL  $F878,X
  0x053F3D $9F2D: C-----  94 12    STY  $12,X
  0x053F3F $9F2F: C-----  11 9F    ORA  ($9F),Y
  0x053F41 $9F31: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x053F42 $9F32: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F43 $9F33: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F44 $9F34: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F45 $9F35: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F46 $9F36: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F47 $9F37: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F48 $9F38: C-----  F0 D0    BEQ  $9F0A
  0x053F4A $9F3A: C-----  30 10    BMI  $9F4C
  0x053F4C $9F3C: C-----  18       CLC  
  0x053F4D $9F3D: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x053F4E $9F3E: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x053F4F $9F3F: C-----  11 01    ORA  ($01),Y
  0x053F51 $9F41: C-----  01 03    ORA  ($03,X)
  0x053F53 $9F43: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x053F54 $9F44: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x053F55 $9F45: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x053F56 $9F46: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053F57 $9F47: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x053F58 $9F48: C-----  00       BRK  
  0x053F59 $9F49: C-----  00       BRK  
  0x053F5A $9F4A: C-----  00       BRK  
  0x053F5B $9F4B: C-----  01 01    ORA  ($01,X)
  0x053F5D $9F4D: C-----  01 00    ORA  ($00,X)
  0x053F5F $9F4F: C-----  01 BD    ORA  ($BD,X)
  0x053F61 $9F51: C-----  0E 72 1C ASL  $1C72
  0x053F64 $9F54: C-----  E5 39    SBC  $39
  0x053F66 $9F56: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x053F67 $9F57: C-----  FE 42 F1 INC  $F142,X
  0x053F6A $9F5A: C-----  8D E3 1A STA  $1AE3
  0x053F6D $9F5D: C-----  C6 3C    DEC  $3C
  0x053F6F $9F5F: C-----  00       BRK  
  0x053F70 $9F60: C-----  A8       TAY  
  0x053F71 $9F61: C-----  D0 A0    BNE  $9F03
  0x053F73 $9F63: C-----  C0 80    CPY  #$80
  0x053F75 $9F65: C-----  00       BRK  
  0x053F76 $9F66: C-----  00       BRK  
  0x053F77 $9F67: C-----  00       BRK  
  0x053F78 $9F68: C-----  50 20    BVC  $9F8A
  0x053F7A $9F6A: C-----  40       RTI  
  0x053F7B $9F6B: C-----  00       BRK  
  0x053F7C $9F6C: C-----  00       BRK  
  0x053F7D $9F6D: C-----  00       BRK  
  0x053F7E $9F6E: C-----  00       BRK  
  0x053F7F $9F6F: C-----  00       BRK  
  0x053F80 $9F70: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053F81 $9F71: C-----  06 05    ASL  $05
  0x053F83 $9F73: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x053F84 $9F74: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x053F85 $9F75: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x053F86 $9F76: C-----  01 00    ORA  ($00,X)
  0x053F88 $9F78: C-----  00       BRK  
  0x053F89 $9F79: C-----  01 02    ORA  ($02,X)
  0x053F8B $9F7B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053F8C $9F7C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053F8D $9F7D: C-----  01 00    ORA  ($00,X)
  0x053F8F $9F7F: C-----  00       BRK  
  0x053F90 $9F80: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F91 $9F81: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F92 $9F82: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F93 $9F83: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F94 $9F84: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F95 $9F85: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F96 $9F86: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F97 $9F87: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053F98 $9F88: C-----  A0 60    LDY  #$60
  0x053F9A $9F8A: C-----  20 30 28 JSR  $2830
  0x053F9D $9F8D: C-----  24 22    BIT  $22
  0x053F9F $9F8F: C-----  21 FF    AND  ($FF,X)
  0x053FA1 $9F91: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053FA2 $9F92: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053FA3 $9F93: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053FA4 $9F94: C-----  FE FE FC INC  $FCFE,X
  0x053FA7 $9F97: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x053FA8 $9F98: C-----  00       BRK  
  0x053FA9 $9F99: C-----  00       BRK  
  0x053FAA $9F9A: C-----  01 01    ORA  ($01,X)
  0x053FAC $9F9C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053FAD $9F9D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x053FAE $9F9E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053FAF $9F9F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x053FB0 $9FA0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053FB1 $9FA1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053FB2 $9FA2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053FB3 $9FA3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053FB4 $9FA4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053FB5 $9FA5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053FB6 $9FA6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053FB7 $9FA7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x053FB8 $9FA8: C-----  C0 40    CPY  #$40
  0x053FBA $9FAA: C-----  60       RTS  
  0x053FBB $9FAB: C-----  50 48    BVC  $9FF5
  0x053FBD $9FAD: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x053FBE $9FAE: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x053FBF $9FAF: C-----  41 F9    EOR  ($F9,X)
  0x053FC1 $9FB1: C-----  F9 F2 F3 SBC  $F3F2,Y
  0x053FC4 $9FB4: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x053FC5 $9FB5: C-----  E5 CE    SBC  $CE
  0x053FC7 $9FB7: C-----  C6 0E    DEC  $0E
  0x053FC9 $9FB9: C-----  0E 1D 1C ASL  $1C1D
  0x053FCC $9FBC: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x053FCD $9FBD: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x053FCE $9FBE: C-----  71 79    ADC  ($79),Y
  0x053FD0 $9FC0: C-----  EC 38 D8 CPX  $D838
  0x053FD3 $9FC3: C-----  50 90    BVC  $9F55
  0x053FD5 $9FC5: C-----  20 C0 00 JSR  $00C0
  0x053FD8 $9FC8: C-----  10 C0    BPL  $9F8A
  0x053FDA $9FCA: C-----  20 A0 60 JSR  $60A0
  0x053FDD $9FCD: C-----  C0 00    CPY  #$00
  0x053FDF $9FCF: C-----  00       BRK  
  0x053FE0 $9FD0: C-----  20 40 40 JSR  $4040
  0x053FE3 $9FD3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053FE4 $9FD4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x053FE5 $9FD5: C-----  BC FE C3 LDY  $C3FE,X
  0x053FE8 $9FD8: C-----  00       BRK  
  0x053FE9 $9FD9: C-----  00       BRK  
  0x053FEA $9FDA: C-----  00       BRK  
  0x053FEB $9FDB: C-----  00       BRK  
  0x053FEC $9FDC: C-----  00       BRK  
  0x053FED $9FDD: C-----  00       BRK  
  0x053FEE $9FDE: C-----  00       BRK  
  0x053FEF $9FDF: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x053FF0 $9FE0: ------  .byte $00
  0x053FF1 $9FE1: ------  .byte $7E
  0x053FF2 $9FE2: ------  .byte $42
  0x053FF3 $9FE3: ------  .byte $42
  0x053FF4 $9FE4: ------  .byte $42
  0x053FF5 $9FE5: ------  .byte $42
  0x053FF6 $9FE6: ------  .byte $7E
  0x053FF7 $9FE7: ------  .byte $00
  0x053FF8 $9FE8: ------  .byte $00
  0x053FF9 $9FE9: ------  .byte $7E
  0x053FFA $9FEA: ------  .byte $42
  0x053FFB $9FEB: ------  .byte $42
  0x053FFC $9FEC: ------  .byte $42
  0x053FFD $9FED: ------  .byte $42
  0x053FFE $9FEE: ------  .byte $7E
  0x053FFF $9FEF: ------  .byte $00
  0x054000 $9FF0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054001 $9FF1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054002 $9FF2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054003 $9FF3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054004 $9FF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054005 $9FF5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054006 $9FF6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054007 $9FF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054008 $9FF8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x054009 $9FF9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05400A $9FFA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05400B $9FFB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05400C $9FFC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05400D $9FFD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05400E $9FFE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x05400F $9FFF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data