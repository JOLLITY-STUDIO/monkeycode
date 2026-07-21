; ===== MMC3 Bank 37 =====
; ROM: 0x04A010-0x04C00F
; CPU: $8000-$9FFF
; CDL: code=7940 data=0 unaccessed=252

  0x04A010 $8000: ------  .byte $00
  0x04A011 $8001: ------  .byte $00
  0x04A012 $8002: ------  .byte $00
  0x04A013 $8003: ------  .byte $00
  0x04A014 $8004: ------  .byte $00
  0x04A015 $8005: ------  .byte $00
  0x04A016 $8006: ------  .byte $00
  0x04A017 $8007: ------  .byte $00
  0x04A018 $8008: ------  .byte $00
  0x04A019 $8009: ------  .byte $00
  0x04A01A $800A: ------  .byte $00
  0x04A01B $800B: ------  .byte $00
  0x04A01C $800C: ------  .byte $00
  0x04A01D $800D: ------  .byte $00
  0x04A01E $800E: ------  .byte $00
  0x04A01F $800F: ------  .byte $00
  0x04A020 $8010: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A021 $8011: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A022 $8012: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A023 $8013: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A024 $8014: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A025 $8015: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A026 $8016: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A027 $8017: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A028 $8018: C-----  00       BRK  
  0x04A029 $8019: C-----  00       BRK  
  0x04A02A $801A: C-----  00       BRK  
  0x04A02B $801B: C-----  00       BRK  
  0x04A02C $801C: C-----  00       BRK  
  0x04A02D $801D: C-----  00       BRK  
  0x04A02E $801E: C-----  00       BRK  
  0x04A02F $801F: C-----  00       BRK  
  0x04A030 $8020: C-----  01 07    ORA  ($07,X)
  0x04A032 $8022: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A033 $8023: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A034 $8024: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04A035 $8025: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04A036 $8026: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04A037 $8027: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04A038 $8028: C-----  00       BRK  
  0x04A039 $8029: C-----  00       BRK  
  0x04A03A $802A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A03B $802B: C-----  0E 1B 0D ASL  $0D1B
  0x04A03E $802E: C-----  15 15    ORA  $15,X
  0x04A040 $8030: C-----  C0 E0    CPY  #$E0
  0x04A042 $8032: C-----  F0 F8    BEQ  $802C
  0x04A044 $8034: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A045 $8035: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A046 $8036: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A047 $8037: C-----  F8       SED  
  0x04A048 $8038: C-----  00       BRK  
  0x04A049 $8039: C-----  C0 E0    CPY  #$E0
  0x04A04B $803B: C-----  B0 40    BCS  $807D
  0x04A04D $803D: C-----  58       CLI  
  0x04A04E $803E: C-----  48       PHA  
  0x04A04F $803F: C-----  00       BRK  
  0x04A050 $8040: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04A051 $8041: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04A052 $8042: C-----  2A       ROL  A
  0x04A053 $8043: C-----  35 2A    AND  $2A,X
  0x04A055 $8045: C-----  15 1A    ORA  $1A,X
  0x04A057 $8047: C-----  0D 0F 20 ORA  $200F
  0x04A05A $804A: C-----  15 0A    ORA  $0A,X
  0x04A05C $804C: C-----  15 0A    ORA  $0A,X
  0x04A05E $804E: C-----  05 02    ORA  $02
  0x04A060 $8050: C-----  F0 C0    BEQ  $8012
  0x04A062 $8052: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A063 $8053: C-----  40       RTI  
  0x04A064 $8054: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A065 $8055: C-----  40       RTI  
  0x04A066 $8056: C-----  A0 50    LDY  #$50
  0x04A068 $8058: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04A069 $8059: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04A06A $805A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04A06B $805B: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04A06C $805C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04A06D $805D: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04A06E $805E: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04A06F $805F: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04A070 $8060: C-----  0A       ASL  A
  0x04A071 $8061: C-----  0D 0B 0F ORA  $0F0B
  0x04A074 $8064: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A075 $8065: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A076 $8066: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A077 $8067: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A078 $8068: C-----  05 02    ORA  $02
  0x04A07A $806A: C-----  05 03    ORA  $03
  0x04A07C $806C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A07D $806D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A07E $806E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A07F $806F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A080 $8070: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A081 $8071: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A082 $8072: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A083 $8073: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A084 $8074: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A085 $8075: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A086 $8076: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A087 $8077: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A088 $8078: C-----  00       BRK  
  0x04A089 $8079: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04A08A $807A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A08B $807B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A08C $807C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A08D $807D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A08E $807E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A08F $807F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A090 $8080: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A091 $8081: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A092 $8082: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A093 $8083: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A094 $8084: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A095 $8085: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A096 $8086: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A097 $8087: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A098 $8088: C-----  08       PHP  
  0x04A099 $8089: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A09A $808A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A09B $808B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A09C $808C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A09D $808D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A09E $808E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A09F $808F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A0A0 $8090: C-----  F0 E0    BEQ  $8072
  0x04A0A2 $8092: C-----  E0 E0    CPX  #$E0
  0x04A0A4 $8094: C-----  E0 F0    CPX  #$F0
  0x04A0A6 $8096: C-----  F0 F8    BEQ  $8090
  0x04A0A8 $8098: C-----  60       RTS  
  0x04A0A9 $8099: C-----  C0 80    CPY  #$80
  0x04A0AB $809B: C-----  C0 C0    CPY  #$C0
  0x04A0AD $809D: C-----  E0 E0    CPX  #$E0
  0x04A0AF $809F: C-----  F0 0F    BEQ  $80B0
  0x04A0B1 $80A1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A0B2 $80A2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A0B3 $80A3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A0B4 $80A4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A0B5 $80A5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A0B6 $80A6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A0B7 $80A7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A0B8 $80A8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A0B9 $80A9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A0BA $80AA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A0BB $80AB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A0BC $80AC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A0BD $80AD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A0BE $80AE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A0BF $80AF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A0C0 $80B0: C-----  F8       SED  
  0x04A0C1 $80B1: C-----  F8       SED  
  0x04A0C2 $80B2: C-----  F8       SED  
  0x04A0C3 $80B3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A0C4 $80B4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A0C5 $80B5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A0C6 $80B6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A0C7 $80B7: C-----  FE F0 F0 INC  $F0F0,X
  0x04A0CA $80BA: C-----  F0 F8    BEQ  $80B4
  0x04A0CC $80BC: C-----  F8       SED  
  0x04A0CD $80BD: C-----  F8       SED  
  0x04A0CE $80BE: C-----  F8       SED  
  0x04A0CF $80BF: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A0D0 $80C0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A0D1 $80C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A0D2 $80C2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A0D3 $80C3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A0D4 $80C4: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04A0D5 $80C5: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x04A0D6 $80C6: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04A0D7 $80C7: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04A0D8 $80C8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A0D9 $80C9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A0DA $80CA: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04A0DB $80CB: C-----  E1 49    SBC  ($49,X)
  0x04A0DD $80CD: C-----  99 55 95 STA  $9555,Y
  0x04A0E0 $80D0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A0E1 $80D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A0E2 $80D2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A0E3 $80D3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A0E4 $80D4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A0E5 $80D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A0E6 $80D6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A0E7 $80D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A0E8 $80D8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A0E9 $80D9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A0EA $80DA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A0EB $80DB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A0EC $80DC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A0ED $80DD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A0EE $80DE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A0EF $80DF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A0F0 $80E0: C-----  06 03    ASL  $03
  0x04A0F2 $80E2: C-----  00       BRK  
  0x04A0F3 $80E3: C-----  00       BRK  
  0x04A0F4 $80E4: C-----  00       BRK  
  0x04A0F5 $80E5: C-----  00       BRK  
  0x04A0F6 $80E6: C-----  00       BRK  
  0x04A0F7 $80E7: C-----  00       BRK  
  0x04A0F8 $80E8: C-----  01 00    ORA  ($00,X)
  0x04A0FA $80EA: C-----  00       BRK  
  0x04A0FB $80EB: C-----  00       BRK  
  0x04A0FC $80EC: C-----  00       BRK  
  0x04A0FD $80ED: C-----  00       BRK  
  0x04A0FE $80EE: C-----  00       BRK  
  0x04A0FF $80EF: C-----  00       BRK  
  0x04A100 $80F0: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04A101 $80F1: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04A102 $80F2: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04A103 $80F3: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04A104 $80F4: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04A105 $80F5: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x04A106 $80F6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A107 $80F7: C-----  00       BRK  
  0x04A108 $80F8: C-----  55 97    EOR  $97,X
  0x04A10A $80FA: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04A10B $80FB: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04A10C $80FC: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04A10D $80FD: C-----  05 00    ORA  $00
  0x04A10F $80FF: C-----  00       BRK  
  0x04A110 $8100: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A111 $8101: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04A112 $8102: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A113 $8103: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A114 $8104: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A115 $8105: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04A116 $8106: C-----  10 10    BPL  $8118
  0x04A118 $8108: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A119 $8109: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04A11A $810A: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04A11B $810B: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04A11C $810C: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04A11D $810D: C-----  E0 E0    CPX  #$E0
  0x04A11F $810F: C-----  E0 07    CPX  #$07
  0x04A121 $8111: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04A122 $8112: C-----  00       BRK  
  0x04A123 $8113: C-----  00       BRK  
  0x04A124 $8114: C-----  00       BRK  
  0x04A125 $8115: C-----  00       BRK  
  0x04A126 $8116: C-----  00       BRK  
  0x04A127 $8117: C-----  00       BRK  
  0x04A128 $8118: C-----  00       BRK  
  0x04A129 $8119: C-----  00       BRK  
  0x04A12A $811A: C-----  00       BRK  
  0x04A12B $811B: C-----  00       BRK  
  0x04A12C $811C: C-----  00       BRK  
  0x04A12D $811D: C-----  00       BRK  
  0x04A12E $811E: C-----  00       BRK  
  0x04A12F $811F: C-----  00       BRK  
  0x04A130 $8120: C-----  F0 F0    BEQ  $8112
  0x04A132 $8122: C-----  F0 E0    BEQ  $8104
  0x04A134 $8124: C-----  E0 E0    CPX  #$E0
  0x04A136 $8126: C-----  E0 E0    CPX  #$E0
  0x04A138 $8128: C-----  00       BRK  
  0x04A139 $8129: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A13A $812A: C-----  C0 C0    CPY  #$C0
  0x04A13C $812C: C-----  C0 C0    CPY  #$C0
  0x04A13E $812E: C-----  C0 C0    CPY  #$C0
  0x04A140 $8130: C-----  A0 60    LDY  #$60
  0x04A142 $8132: C-----  10 10    BPL  $8144
  0x04A144 $8134: C-----  10 08    BPL  $813E
  0x04A146 $8136: C-----  08       PHP  
  0x04A147 $8137: C-----  08       PHP  
  0x04A148 $8138: C-----  00       BRK  
  0x04A149 $8139: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A14A $813A: C-----  E0 E0    CPX  #$E0
  0x04A14C $813C: C-----  E0 F0    CPX  #$F0
  0x04A14E $813E: C-----  F0 F0    BEQ  $8130
  0x04A150 $8140: C-----  19 2A 52 ORA  $522A,Y
  0x04A153 $8143: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04A154 $8144: C-----  98       TYA  
  0x04A155 $8145: C-----  90 00    BCC  $8147
  0x04A157 $8147: C-----  00       BRK  
  0x04A158 $8148: C-----  00       BRK  
  0x04A159 $8149: C-----  11 21    ORA  ($21),Y
  0x04A15B $814B: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x04A15C $814C: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x04A15D $814D: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04A15E $814E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A15F $814F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A160 $8150: C-----  00       BRK  
  0x04A161 $8151: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A162 $8152: C-----  88       DEY  
  0x04A163 $8153: C-----  98       TYA  
  0x04A164 $8154: C-----  68       PLA  
  0x04A165 $8155: C-----  48       PHA  
  0x04A166 $8156: C-----  08       PHP  
  0x04A167 $8157: C-----  10 00    BPL  $8159
  0x04A169 $8159: C-----  00       BRK  
  0x04A16A $815A: C-----  00       BRK  
  0x04A16B $815B: C-----  00       BRK  
  0x04A16C $815C: C-----  90 B0    BCC  $810E
  0x04A16E $815E: C-----  F0 E0    BEQ  $8140
  0x04A170 $8160: C-----  00       BRK  
  0x04A171 $8161: C-----  00       BRK  
  0x04A172 $8162: C-----  00       BRK  
  0x04A173 $8163: C-----  00       BRK  
  0x04A174 $8164: C-----  00       BRK  
  0x04A175 $8165: C-----  00       BRK  
  0x04A176 $8166: C-----  00       BRK  
  0x04A177 $8167: C-----  70 FF    BVS  $8168
  0x04A179 $8169: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A17A $816A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A17B $816B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A17C $816C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A17D $816D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A17E $816E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A17F $816F: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04A180 $8170: C-----  10 10    BPL  $8182
  0x04A182 $8172: C-----  11 17    ORA  ($17),Y
  0x04A184 $8174: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x04A185 $8175: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x04A186 $8176: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A187 $8177: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A188 $8178: C-----  E0 E0    CPX  #$E0
  0x04A18A $817A: C-----  E0 E0    CPX  #$E0
  0x04A18C $817C: C-----  E4 EC    CPX  $EC
  0x04A18E $817E: C-----  F8       SED  
  0x04A18F $817F: C-----  F8       SED  
  0x04A190 $8180: C-----  E0 E0    CPX  #$E0
  0x04A192 $8182: C-----  C0 C0    CPY  #$C0
  0x04A194 $8184: C-----  C0 80    CPY  #$80
  0x04A196 $8186: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A197 $8187: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A198 $8188: C-----  C0 C0    CPY  #$C0
  0x04A19A $818A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A19B $818B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A19C $818C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A19D $818D: C-----  00       BRK  
  0x04A19E $818E: C-----  00       BRK  
  0x04A19F $818F: C-----  00       BRK  
  0x04A1A0 $8190: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A1A1 $8191: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A1A2 $8192: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A1A3 $8193: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A1A4 $8194: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A1A5 $8195: C-----  05 07    ORA  $07
  0x04A1A7 $8197: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04A1A8 $8198: C-----  F8       SED  
  0x04A1A9 $8199: C-----  F8       SED  
  0x04A1AA $819A: C-----  F8       SED  
  0x04A1AB $819B: C-----  F8       SED  
  0x04A1AC $819C: C-----  F8       SED  
  0x04A1AD $819D: C-----  F8       SED  
  0x04A1AE $819E: C-----  F8       SED  
  0x04A1AF $819F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A1B0 $81A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A1B1 $81A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A1B2 $81A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A1B3 $81A3: C-----  FE FC F8 INC  $F8FC,X
  0x04A1B6 $81A6: C-----  F0 00    BEQ  $81A8
  0x04A1B8 $81A8: C-----  FE FE FE INC  $FEFE,X
  0x04A1BB $81AB: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A1BC $81AC: C-----  F8       SED  
  0x04A1BD $81AD: C-----  F0 00    BEQ  $81AF
  0x04A1BF $81AF: C-----  00       BRK  
  0x04A1C0 $81B0: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04A1C1 $81B1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A1C2 $81B2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A1C3 $81B3: C-----  08       PHP  
  0x04A1C4 $81B4: C-----  10 28    BPL  $81DE
  0x04A1C6 $81B6: C-----  10 E0    BPL  $8198
  0x04A1C8 $81B8: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A1C9 $81B9: C-----  F8       SED  
  0x04A1CA $81BA: C-----  F8       SED  
  0x04A1CB $81BB: C-----  F0 E0    BEQ  $819D
  0x04A1CD $81BD: C-----  C0 E0    CPY  #$E0
  0x04A1CF $81BF: C-----  00       BRK  
  0x04A1D0 $81C0: C-----  FE FF FF INC  $FFFF,X
  0x04A1D3 $81C3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A1D4 $81C4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A1D5 $81C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A1D6 $81C6: C-----  EC 38 79 CPX  $7938
  0x04A1D9 $81C9: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A1DA $81CA: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04A1DB $81CB: C-----  4C C3 E8 JMP  $E8C3
  0x04A1DE $81CE: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04A1DF $81CF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A1E0 $81D0: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04A1E1 $81D1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A1E2 $81D2: C-----  84 08    STY  $08
  0x04A1E4 $81D4: C-----  10 28    BPL  $81FE
  0x04A1E6 $81D6: C-----  10 E0    BPL  $81B8
  0x04A1E8 $81D8: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A1E9 $81D9: C-----  F8       SED  
  0x04A1EA $81DA: C-----  78       SEI  
  0x04A1EB $81DB: C-----  F0 E0    BEQ  $81BD
  0x04A1ED $81DD: C-----  C0 E0    CPY  #$E0
  0x04A1EF $81DF: C-----  00       BRK  
  0x04A1F0 $81E0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A1F1 $81E1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A1F2 $81E2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A1F3 $81E3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A1F4 $81E4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A1F5 $81E5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A1F6 $81E6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A1F7 $81E7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A1F8 $81E8: C-----  F8       SED  
  0x04A1F9 $81E9: C-----  F8       SED  
  0x04A1FA $81EA: C-----  F8       SED  
  0x04A1FB $81EB: C-----  F9 FB FB SBC  $FBFB,Y
  0x04A1FE $81EE: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04A1FF $81EF: C-----  F8       SED  
  0x04A200 $81F0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A201 $81F1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A202 $81F2: C-----  FE FC FE INC  $FEFC,X
  0x04A205 $81F5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A206 $81F6: C-----  FE FC 43 INC  $43FC,X
  0x04A209 $81F9: C-----  94 65    STY  $65,X
  0x04A20B $81FB: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04A20C $81FC: C-----  C5 CB    CMP  $CB
  0x04A20E $81FE: C-----  6D 73 03 ADC  $0373
  0x04A211 $8201: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A212 $8202: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A213 $8203: C-----  01 01    ORA  ($01,X)
  0x04A215 $8205: C-----  01 01    ORA  ($01,X)
  0x04A217 $8207: C-----  01 01    ORA  ($01,X)
  0x04A219 $8209: C-----  01 01    ORA  ($01,X)
  0x04A21B $820B: C-----  00       BRK  
  0x04A21C $820C: C-----  00       BRK  
  0x04A21D $820D: C-----  00       BRK  
  0x04A21E $820E: C-----  00       BRK  
  0x04A21F $820F: C-----  00       BRK  
  0x04A220 $8210: C-----  E0 F0    CPX  #$F0
  0x04A222 $8212: C-----  F8       SED  
  0x04A223 $8213: C-----  F8       SED  
  0x04A224 $8214: C-----  F0 E0    BEQ  $81F6
  0x04A226 $8216: C-----  E0 00    CPX  #$00
  0x04A228 $8218: C-----  00       BRK  
  0x04A229 $8219: C-----  C0 F0    CPY  #$F0
  0x04A22B $821B: C-----  D0 80    BNE  $819D
  0x04A22D $821D: C-----  C0 00    CPY  #$00
  0x04A22F $821F: C-----  00       BRK  
  0x04A230 $8220: C-----  01 01    ORA  ($01,X)
  0x04A232 $8222: C-----  01 03    ORA  ($03,X)
  0x04A234 $8224: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04A235 $8225: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A236 $8226: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A237 $8227: C-----  05 00    ORA  $00
  0x04A239 $8229: C-----  00       BRK  
  0x04A23A $822A: C-----  00       BRK  
  0x04A23B $822B: C-----  00       BRK  
  0x04A23C $822C: C-----  01 00    ORA  ($00,X)
  0x04A23E $822E: C-----  00       BRK  
  0x04A23F $822F: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04A240 $8230: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04A241 $8231: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A242 $8232: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A243 $8233: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A244 $8234: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A245 $8235: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A246 $8236: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A247 $8237: C-----  00       BRK  
  0x04A248 $8238: C-----  E0 F3    CPX  #$F3
  0x04A24A $823A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A24B $823B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A24C $823C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A24D $823D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A24E $823E: C-----  00       BRK  
  0x04A24F $823F: C-----  00       BRK  
  0x04A250 $8240: C-----  FE FF FF INC  $FFFF,X
  0x04A253 $8243: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A254 $8244: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A255 $8245: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A256 $8246: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A257 $8247: C-----  7E FC FE ROR  $FEFC,X
  0x04A25A $824A: C-----  FE FF FF INC  $FFFF,X
  0x04A25D $824D: C-----  7E 3C 81 ROR  $813C,X
  0x04A260 $8250: C-----  00       BRK  
  0x04A261 $8251: C-----  00       BRK  
  0x04A262 $8252: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A263 $8253: C-----  C0 A0    CPY  #$A0
  0x04A265 $8255: C-----  A0 20    LDY  #$20
  0x04A267 $8257: C-----  10 00    BPL  $8259
  0x04A269 $8259: C-----  00       BRK  
  0x04A26A $825A: C-----  00       BRK  
  0x04A26B $825B: C-----  00       BRK  
  0x04A26C $825C: C-----  40       RTI  
  0x04A26D $825D: C-----  40       RTI  
  0x04A26E $825E: C-----  C0 E0    CPY  #$E0
  0x04A270 $8260: C-----  A0 40    LDY  #$40
  0x04A272 $8262: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A273 $8263: C-----  40       RTI  
  0x04A274 $8264: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A275 $8265: C-----  40       RTI  
  0x04A276 $8266: C-----  !!UNDEF $A3  ; unknown opcode, treating as data
  0x04A277 $8267: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A278 $8268: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04A279 $8269: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04A27A $826A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04A27B $826B: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04A27C $826C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04A27D $826D: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04A27E $826E: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x04A27F $826F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A280 $8270: C-----  10 11    BPL  $8283
  0x04A282 $8272: C-----  09 0A    ORA  #$0A
  0x04A284 $8274: C-----  06 04    ASL  $04
  0x04A286 $8276: C-----  06 06    ASL  $06
  0x04A288 $8278: C-----  E0 E0    CPX  #$E0
  0x04A28A $827A: C-----  F0 F0    BEQ  $826C
  0x04A28C $827C: C-----  F8       SED  
  0x04A28D $827D: C-----  F8       SED  
  0x04A28E $827E: C-----  F8       SED  
  0x04A28F $827F: C-----  F8       SED  
  0x04A290 $8280: C-----  0A       ASL  A
  0x04A291 $8281: C-----  0D 0A 15 ORA  $150A
  0x04A294 $8284: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x04A295 $8285: C-----  15 3A    ORA  $3A,X
  0x04A297 $8287: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04A298 $8288: C-----  05 02    ORA  $02
  0x04A29A $828A: C-----  05 0A    ORA  $0A
  0x04A29C $828C: C-----  05 0A    ORA  $0A
  0x04A29E $828E: C-----  05 08    ORA  $08
  0x04A2A0 $8290: C-----  00       BRK  
  0x04A2A1 $8291: C-----  01 07    ORA  ($07,X)
  0x04A2A3 $8293: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A2A4 $8294: C-----  0E 0C 06 ASL  $060C
  0x04A2A7 $8297: C-----  01 00    ORA  ($00,X)
  0x04A2A9 $8299: C-----  00       BRK  
  0x04A2AA $829A: C-----  00       BRK  
  0x04A2AB $829B: C-----  00       BRK  
  0x04A2AC $829C: C-----  01 03    ORA  ($03,X)
  0x04A2AE $829E: C-----  01 00    ORA  ($00,X)
  0x04A2B0 $82A0: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04A2B1 $82A1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A2B2 $82A2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A2B3 $82A3: C-----  08       PHP  
  0x04A2B4 $82A4: C-----  10 60    BPL  $8306
  0x04A2B6 $82A6: C-----  C0 E0    CPY  #$E0
  0x04A2B8 $82A8: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04A2B9 $82A9: C-----  F8       SED  
  0x04A2BA $82AA: C-----  F8       SED  
  0x04A2BB $82AB: C-----  F0 E0    BEQ  $828D
  0x04A2BD $82AD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A2BE $82AE: C-----  00       BRK  
  0x04A2BF $82AF: C-----  C0 1C    CPY  #$1C
  0x04A2C1 $82B1: C-----  FE FF FC INC  $FCFF,X
  0x04A2C4 $82B4: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04A2C5 $82B5: C-----  F5 FA    SBC  $FA,X
  0x04A2C7 $82B7: C-----  FD 00 00 SBC  $0000,X
  0x04A2CA $82BA: C-----  00       BRK  
  0x04A2CB $82BB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A2CC $82BC: C-----  05 0A    ORA  $0A
  0x04A2CE $82BE: C-----  05 02    ORA  $02
  0x04A2D0 $82C0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A2D1 $82C1: C-----  40       RTI  
  0x04A2D2 $82C2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A2D3 $82C3: C-----  00       BRK  
  0x04A2D4 $82C4: C-----  00       BRK  
  0x04A2D5 $82C5: C-----  00       BRK  
  0x04A2D6 $82C6: C-----  00       BRK  
  0x04A2D7 $82C7: C-----  F8       SED  
  0x04A2D8 $82C8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04A2D9 $82C9: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04A2DA $82CA: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04A2DB $82CB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A2DC $82CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A2DD $82CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A2DE $82CE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A2DF $82CF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A2E0 $82D0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A2E1 $82D1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A2E2 $82D2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A2E3 $82D3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A2E4 $82D4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A2E5 $82D5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A2E6 $82D6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A2E7 $82D7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A2E8 $82D8: C-----  F8       SED  
  0x04A2E9 $82D9: C-----  F8       SED  
  0x04A2EA $82DA: C-----  F8       SED  
  0x04A2EB $82DB: C-----  F9 FB FB SBC  $FBFB,Y
  0x04A2EE $82DE: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04A2EF $82DF: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04A2F0 $82E0: C-----  00       BRK  
  0x04A2F1 $82E1: C-----  00       BRK  
  0x04A2F2 $82E2: C-----  00       BRK  
  0x04A2F3 $82E3: C-----  00       BRK  
  0x04A2F4 $82E4: C-----  00       BRK  
  0x04A2F5 $82E5: C-----  00       BRK  
  0x04A2F6 $82E6: C-----  00       BRK  
  0x04A2F7 $82E7: C-----  00       BRK  
  0x04A2F8 $82E8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A2F9 $82E9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A2FA $82EA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A2FB $82EB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A2FC $82EC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A2FD $82ED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A2FE $82EE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A2FF $82EF: C-----  1E 06 84 ASL  $8406,X
  0x04A302 $82F2: C-----  86 C7    STX  $C7
  0x04A304 $82F4: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04A305 $82F5: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04A306 $82F6: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04A307 $82F7: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04A308 $82F8: C-----  F8       SED  
  0x04A309 $82F9: C-----  78       SEI  
  0x04A30A $82FA: C-----  78       SEI  
  0x04A30B $82FB: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x04A30C $82FC: C-----  39 3C 3C AND  $3C3C,Y
  0x04A30F $82FF: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04A310 $8300: C-----  00       BRK  
  0x04A311 $8301: C-----  00       BRK  
  0x04A312 $8302: C-----  00       BRK  
  0x04A313 $8303: C-----  00       BRK  
  0x04A314 $8304: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A315 $8305: C-----  0D 0B 91 ORA  $910B
  0x04A318 $8308: C-----  00       BRK  
  0x04A319 $8309: C-----  00       BRK  
  0x04A31A $830A: C-----  00       BRK  
  0x04A31B $830B: C-----  00       BRK  
  0x04A31C $830C: C-----  00       BRK  
  0x04A31D $830D: C-----  00       BRK  
  0x04A31E $830E: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A31F $830F: C-----  0E 10 11 ASL  $1110
  0x04A322 $8312: C-----  09 0A    ORA  #$0A
  0x04A324 $8314: C-----  06 04    ASL  $04
  0x04A326 $8316: C-----  06 06    ASL  $06
  0x04A328 $8318: C-----  00       BRK  
  0x04A329 $8319: C-----  00       BRK  
  0x04A32A $831A: C-----  00       BRK  
  0x04A32B $831B: C-----  01 01    ORA  ($01,X)
  0x04A32D $831D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A32E $831E: C-----  01 01    ORA  ($01,X)
  0x04A330 $8320: C-----  A0 40    LDY  #$40
  0x04A332 $8322: C-----  00       BRK  
  0x04A333 $8323: C-----  00       BRK  
  0x04A334 $8324: C-----  00       BRK  
  0x04A335 $8325: C-----  00       BRK  
  0x04A336 $8326: C-----  30 78    BMI  $83A0
  0x04A338 $8328: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A339 $8329: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04A33A $832A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A33B $832B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A33C $832C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A33D $832D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A33E $832E: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04A33F $832F: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04A340 $8330: C-----  00       BRK  
  0x04A341 $8331: C-----  00       BRK  
  0x04A342 $8332: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A343 $8333: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x04A344 $8334: C-----  A2 A5    LDX  #$A5
  0x04A346 $8336: C-----  29 19    AND  #$19
  0x04A348 $8338: C-----  00       BRK  
  0x04A349 $8339: C-----  00       BRK  
  0x04A34A $833A: C-----  00       BRK  
  0x04A34B $833B: C-----  00       BRK  
  0x04A34C $833C: C-----  40       RTI  
  0x04A34D $833D: C-----  40       RTI  
  0x04A34E $833E: C-----  C0 E0    CPY  #$E0
  0x04A350 $8340: C-----  10 10    BPL  $8352
  0x04A352 $8342: C-----  08       PHP  
  0x04A353 $8343: C-----  08       PHP  
  0x04A354 $8344: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A355 $8345: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A356 $8346: C-----  05 07    ORA  $07
  0x04A358 $8348: C-----  E0 E0    CPX  #$E0
  0x04A35A $834A: C-----  F0 F0    BEQ  $833C
  0x04A35C $834C: C-----  F8       SED  
  0x04A35D $834D: C-----  F8       SED  
  0x04A35E $834E: C-----  F8       SED  
  0x04A35F $834F: C-----  F8       SED  
  0x04A360 $8350: C-----  FE FC FE INC  $FEFC,X
  0x04A363 $8353: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A364 $8354: C-----  F8       SED  
  0x04A365 $8355: C-----  FE F8 F8 INC  $F8F8,X
  0x04A368 $8358: C-----  79 33 29 ADC  $2933,Y
  0x04A36B $835B: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x04A36C $835C: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04A36D $835D: C-----  C9 07    CMP  #$07
  0x04A36F $835F: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04A370 $8360: C-----  00       BRK  
  0x04A371 $8361: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04A372 $8362: C-----  01 1F    ORA  ($1F,X)
  0x04A374 $8364: C-----  61 80    ADC  ($80,X)
  0x04A376 $8366: C-----  78       SEI  
  0x04A377 $8367: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A378 $8368: C-----  00       BRK  
  0x04A379 $8369: C-----  00       BRK  
  0x04A37A $836A: C-----  00       BRK  
  0x04A37B $836B: C-----  00       BRK  
  0x04A37C $836C: C-----  1E 7F 87 ASL  $877F,X
  0x04A37F $836F: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x04A380 $8370: C-----  00       BRK  
  0x04A381 $8371: C-----  00       BRK  
  0x04A382 $8372: C-----  00       BRK  
  0x04A383 $8373: C-----  E0 C0    CPX  #$C0
  0x04A385 $8375: C-----  20 10 08 JSR  $0810
  0x04A388 $8378: C-----  00       BRK  
  0x04A389 $8379: C-----  00       BRK  
  0x04A38A $837A: C-----  00       BRK  
  0x04A38B $837B: C-----  00       BRK  
  0x04A38C $837C: C-----  00       BRK  
  0x04A38D $837D: C-----  C0 E0    CPY  #$E0
  0x04A38F $837F: C-----  F0 FC    BEQ  $837D
  0x04A391 $8381: C-----  F8       SED  
  0x04A392 $8382: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A393 $8383: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A394 $8384: C-----  F8       SED  
  0x04A395 $8385: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A396 $8386: C-----  FE FC 73 INC  $73FC,X
  0x04A399 $8389: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04A39A $838A: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x04A39B $838B: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04A39C $838C: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04A39D $838D: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04A39E $838E: C-----  C5 73    CMP  $73
  0x04A3A0 $8390: C-----  00       BRK  
  0x04A3A1 $8391: C-----  00       BRK  
  0x04A3A2 $8392: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A3A3 $8393: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x04A3A4 $8394: C-----  A2 A5    LDX  #$A5
  0x04A3A6 $8396: C-----  29 19    AND  #$19
  0x04A3A8 $8398: C-----  00       BRK  
  0x04A3A9 $8399: C-----  00       BRK  
  0x04A3AA $839A: C-----  00       BRK  
  0x04A3AB $839B: C-----  00       BRK  
  0x04A3AC $839C: C-----  00       BRK  
  0x04A3AD $839D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04A3AE $839E: C-----  06 06    ASL  $06
  0x04A3B0 $83A0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A3B1 $83A1: C-----  F8       SED  
  0x04A3B2 $83A2: C-----  F8       SED  
  0x04A3B3 $83A3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A3B4 $83A4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A3B5 $83A5: C-----  F8       SED  
  0x04A3B6 $83A6: C-----  E0 38    CPX  #$38
  0x04A3B8 $83A8: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x04A3B9 $83A9: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04A3BA $83AA: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04A3BB $83AB: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x04A3BC $83AC: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x04A3BD $83AD: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04A3BE $83AE: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A3BF $83AF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A3C0 $83B0: C-----  10 11    BPL  $83C3
  0x04A3C2 $83B2: C-----  09 0A    ORA  #$0A
  0x04A3C4 $83B4: C-----  06 04    ASL  $04
  0x04A3C6 $83B6: C-----  06 06    ASL  $06
  0x04A3C8 $83B8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A3C9 $83B9: C-----  0E 06 05 ASL  $0506
  0x04A3CC $83BC: C-----  01 03    ORA  ($03,X)
  0x04A3CE $83BE: C-----  01 01    ORA  ($01,X)
  0x04A3D0 $83C0: C-----  F8       SED  
  0x04A3D1 $83C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A3D2 $83C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A3D3 $83C3: C-----  FE FE FE INC  $FEFE,X
  0x04A3D6 $83C6: C-----  FE FC E7 INC  $E7FC,X
  0x04A3D9 $83C9: C-----  88       DEY  
  0x04A3DA $83CA: C-----  FE E5 F5 INC  $F5E5,X
  0x04A3DD $83CD: C-----  E5 C5    SBC  $C5
  0x04A3DF $83CF: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x04A3E0 $83D0: C-----  08       PHP  
  0x04A3E1 $83D1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A3E2 $83D2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A3E3 $83D3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A3E4 $83D4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A3E5 $83D5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A3E6 $83D6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A3E7 $83D7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A3E8 $83D8: C-----  F0 F8    BEQ  $83D2
  0x04A3EA $83DA: C-----  F8       SED  
  0x04A3EB $83DB: C-----  F8       SED  
  0x04A3EC $83DC: C-----  F8       SED  
  0x04A3ED $83DD: C-----  F8       SED  
  0x04A3EE $83DE: C-----  F8       SED  
  0x04A3EF $83DF: C-----  F8       SED  
  0x04A3F0 $83E0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A3F1 $83E1: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A3F2 $83E2: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A3F3 $83E3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A3F4 $83E4: C-----  FE FE FE INC  $FEFE,X
  0x04A3F7 $83E7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A3F8 $83E8: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x04A3F9 $83E9: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04A3FA $83EA: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04A3FB $83EB: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x04A3FC $83EC: C-----  CD F5 01 CMP  $01F5
  0x04A3FF $83EF: C-----  00       BRK  
  0x04A400 $83F0: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04A401 $83F1: C-----  08       PHP  
  0x04A402 $83F2: C-----  08       PHP  
  0x04A403 $83F3: C-----  18       CLC  
  0x04A404 $83F4: C-----  10 10    BPL  $8406
  0x04A406 $83F6: C-----  30 20    BMI  $8418
  0x04A408 $83F8: C-----  F0 F0    BEQ  $83EA
  0x04A40A $83FA: C-----  F0 E0    BEQ  $83DC
  0x04A40C $83FC: C-----  E0 E0    CPX  #$E0
  0x04A40E $83FE: C-----  C0 C0    CPY  #$C0
  0x04A410 $8400: C-----  A0 60    LDY  #$60
  0x04A412 $8402: C-----  20 00 00 JSR  $0000
  0x04A415 $8405: C-----  00       BRK  
  0x04A416 $8406: C-----  00       BRK  
  0x04A417 $8407: C-----  00       BRK  
  0x04A418 $8408: C-----  40       RTI  
  0x04A419 $8409: C-----  00       BRK  
  0x04A41A $840A: C-----  00       BRK  
  0x04A41B $840B: C-----  00       BRK  
  0x04A41C $840C: C-----  00       BRK  
  0x04A41D $840D: C-----  00       BRK  
  0x04A41E $840E: C-----  00       BRK  
  0x04A41F $840F: C-----  00       BRK  
  0x04A420 $8410: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A421 $8411: C-----  FE FE FF INC  $FFFE,X
  0x04A424 $8414: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A425 $8415: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A426 $8416: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A427 $8417: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A428 $8418: C-----  F8       SED  
  0x04A429 $8419: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A42A $841A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A42B $841B: C-----  FE FE FF INC  $FFFE,X
  0x04A42E $841E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A42F $841F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A430 $8420: C-----  00       BRK  
  0x04A431 $8421: C-----  00       BRK  
  0x04A432 $8422: C-----  00       BRK  
  0x04A433 $8423: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A434 $8424: C-----  30 C1    BMI  $83E7
  0x04A436 $8426: C-----  30 7A    BMI  $84A2
  0x04A438 $8428: C-----  00       BRK  
  0x04A439 $8429: C-----  00       BRK  
  0x04A43A $842A: C-----  00       BRK  
  0x04A43B $842B: C-----  00       BRK  
  0x04A43C $842C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A43D $842D: C-----  3E CF B5 ROL  $B5CF,X
  0x04A440 $8430: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A441 $8431: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A442 $8432: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A443 $8433: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A444 $8434: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A445 $8435: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04A446 $8436: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A447 $8437: C-----  C1 FF    CMP  ($FF,X)
  0x04A449 $8439: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A44A $843A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04A44B $843B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04A44C $843C: C-----  1E 80 7F ASL  $7F80,X
  0x04A44F $843F: C-----  3E 00 00 ROL  $0000,X
  0x04A452 $8442: C-----  00       BRK  
  0x04A453 $8443: C-----  00       BRK  
  0x04A454 $8444: C-----  00       BRK  
  0x04A455 $8445: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A456 $8446: C-----  C0 E0    CPY  #$E0
  0x04A458 $8448: C-----  00       BRK  
  0x04A459 $8449: C-----  00       BRK  
  0x04A45A $844A: C-----  00       BRK  
  0x04A45B $844B: C-----  00       BRK  
  0x04A45C $844C: C-----  00       BRK  
  0x04A45D $844D: C-----  00       BRK  
  0x04A45E $844E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A45F $844F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A460 $8450: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04A461 $8451: C-----  24 08    BIT  $08
  0x04A463 $8453: C-----  18       CLC  
  0x04A464 $8454: C-----  10 28    BPL  $847E
  0x04A466 $8456: C-----  90 E0    BCC  $8438
  0x04A468 $8458: C-----  E8       INX  
  0x04A469 $8459: C-----  D8       CLD  
  0x04A46A $845A: C-----  F0 E0    BEQ  $843C
  0x04A46C $845C: C-----  E0 C0    CPX  #$C0
  0x04A46E $845E: C-----  60       RTS  
  0x04A46F $845F: C-----  00       BRK  
  0x04A470 $8460: C-----  F0 F1    BEQ  $8453
  0x04A472 $8462: C-----  E9 CA    SBC  #$CA
  0x04A474 $8464: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x04A475 $8465: C-----  2C D4 34 BIT  $34D4
  0x04A478 $8468: C-----  C0 C0    CPY  #$C0
  0x04A47A $846A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A47B $846B: C-----  01 01    ORA  ($01,X)
  0x04A47D $846D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A47E $846E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A47F $846F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A480 $8470: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A481 $8471: C-----  F8       SED  
  0x04A482 $8472: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A483 $8473: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A484 $8474: C-----  F8       SED  
  0x04A485 $8475: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A486 $8476: C-----  FE FC 7F INC  $7FFC,X
  0x04A489 $8479: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A48A $847A: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x04A48B $847B: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04A48C $847C: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04A48D $847D: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04A48E $847E: C-----  C5 73    CMP  $73
  0x04A490 $8480: C-----  00       BRK  
  0x04A491 $8481: C-----  00       BRK  
  0x04A492 $8482: C-----  00       BRK  
  0x04A493 $8483: C-----  00       BRK  
  0x04A494 $8484: C-----  E0 90    CPX  #$90
  0x04A496 $8486: C-----  48       PHA  
  0x04A497 $8487: C-----  68       PLA  
  0x04A498 $8488: C-----  00       BRK  
  0x04A499 $8489: C-----  00       BRK  
  0x04A49A $848A: C-----  00       BRK  
  0x04A49B $848B: C-----  00       BRK  
  0x04A49C $848C: C-----  00       BRK  
  0x04A49D $848D: C-----  60       RTS  
  0x04A49E $848E: C-----  B0 90    BCS  $8420
  0x04A4A0 $8490: C-----  F8       SED  
  0x04A4A1 $8491: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04A4A2 $8492: C-----  A0 40    LDY  #$40
  0x04A4A4 $8494: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A4A5 $8495: C-----  40       RTI  
  0x04A4A6 $8496: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A4A7 $8497: C-----  00       BRK  
  0x04A4A8 $8498: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A4A9 $8499: C-----  A0 5F    LDY  #$5F
  0x04A4AB $849B: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04A4AC $849C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04A4AD $849D: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04A4AE $849E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04A4AF $849F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A4B0 $84A0: C-----  08       PHP  
  0x04A4B1 $84A1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A4B2 $84A2: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x04A4B3 $84A3: C-----  24 24    BIT  $24
  0x04A4B5 $84A5: C-----  08       PHP  
  0x04A4B6 $84A6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A4B7 $84A7: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04A4B8 $84A8: C-----  F0 F8    BEQ  $84A2
  0x04A4BA $84AA: C-----  98       TYA  
  0x04A4BB $84AB: C-----  D8       CLD  
  0x04A4BC $84AC: C-----  D8       CLD  
  0x04A4BD $84AD: C-----  F0 F8    BEQ  $84A7
  0x04A4BF $84AF: C-----  E8       INX  
  0x04A4C0 $84B0: C-----  F8       SED  
  0x04A4C1 $84B1: C-----  F0 E0    BEQ  $8493
  0x04A4C3 $84B3: C-----  F0 F8    BEQ  $84AD
  0x04A4C5 $84B5: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04A4C6 $84B6: C-----  F0 F8    BEQ  $84B0
  0x04A4C8 $84B8: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04A4C9 $84B9: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04A4CA $84BA: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A4CB $84BB: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04A4CC $84BC: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04A4CD $84BD: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04A4CE $84BE: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04A4CF $84BF: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04A4D0 $84C0: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x04A4D1 $84C1: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04A4D2 $84C2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A4D3 $84C3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A4D4 $84C4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A4D5 $84C5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A4D6 $84C6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A4D7 $84C7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A4D8 $84C8: C-----  98       TYA  
  0x04A4D9 $84C9: C-----  78       SEI  
  0x04A4DA $84CA: C-----  F8       SED  
  0x04A4DB $84CB: C-----  F9 FB FB SBC  $FBFB,Y
  0x04A4DE $84CE: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04A4DF $84CF: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04A4E0 $84D0: C-----  A0 40    LDY  #$40
  0x04A4E2 $84D2: C-----  00       BRK  
  0x04A4E3 $84D3: C-----  00       BRK  
  0x04A4E4 $84D4: C-----  00       BRK  
  0x04A4E5 $84D5: C-----  00       BRK  
  0x04A4E6 $84D6: C-----  00       BRK  
  0x04A4E7 $84D7: C-----  00       BRK  
  0x04A4E8 $84D8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A4E9 $84D9: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04A4EA $84DA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A4EB $84DB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A4EC $84DC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A4ED $84DD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A4EE $84DE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A4EF $84DF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A4F0 $84E0: C-----  FE FC FE INC  $FEFC,X
  0x04A4F3 $84E3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A4F4 $84E4: C-----  FE FF FE INC  $FEFF,X
  0x04A4F7 $84E7: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04A4F8 $84E8: C-----  FD FB BD SBC  $BDFB,X
  0x04A4FB $84EB: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x04A4FC $84EC: C-----  C5 F6    CMP  $F6
  0x04A4FE $84EE: C-----  35 03    AND  $03,X
  0x04A500 $84F0: C-----  10 90    BPL  $8482
  0x04A502 $84F2: C-----  90 F0    BCC  $84E4
  0x04A504 $84F4: C-----  20 20 40 JSR  $4020
  0x04A507 $84F7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A508 $84F8: C-----  E0 60    CPX  #$60
  0x04A50A $84FA: C-----  60       RTS  
  0x04A50B $84FB: C-----  00       BRK  
  0x04A50C $84FC: C-----  C0 C0    CPY  #$C0
  0x04A50E $84FE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A50F $84FF: C-----  00       BRK  
  0x04A510 $8500: C-----  00       BRK  
  0x04A511 $8501: C-----  00       BRK  
  0x04A512 $8502: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A513 $8503: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A514 $8504: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A515 $8505: C-----  3E 7C F0 ROL  $F07C,X
  0x04A518 $8508: C-----  00       BRK  
  0x04A519 $8509: C-----  00       BRK  
  0x04A51A $850A: C-----  00       BRK  
  0x04A51B $850B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A51C $850C: C-----  0E 1D 33 ASL  $331D
  0x04A51F $850F: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04A520 $8510: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04A521 $8511: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x04A522 $8512: C-----  E6 CE    INC  $CE
  0x04A524 $8514: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x04A525 $8515: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04A526 $8516: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04A527 $8517: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04A528 $8518: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A529 $8519: C-----  0D 19 B1 ORA  $B119
  0x04A52C $851C: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x04A52D $851D: C-----  C0 60    CPY  #$60
  0x04A52F $851F: C-----  20 EA DB JSR  $DBEA
  0x04A532 $8522: C-----  AD BC BE LDA  $BEBC
  0x04A535 $8525: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x04A536 $8526: C-----  E1 FF    SBC  ($FF,X)
  0x04A538 $8528: C-----  55 24    EOR  $24,X
  0x04A53A $852A: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x04A53B $852B: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x04A53C $852C: C-----  41 25    EOR  ($25,X)
  0x04A53E $852E: C-----  1E 00 4F ASL  $4F00,X
  0x04A541 $8531: C-----  6D 2F A0 ADC  $A02F
  0x04A544 $8534: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04A545 $8535: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04A546 $8536: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A547 $8537: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A548 $8538: C-----  B0 92    BCS  $84CC
  0x04A54A $853A: C-----  D0 5F    BNE  $859B
  0x04A54C $853C: C-----  60       RTS  
  0x04A54D $853D: C-----  8C 38 F0 STY  $F038
  0x04A550 $8540: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A551 $8541: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x04A552 $8542: C-----  B9 55 5E LDA  $5E55,Y
  0x04A555 $8545: C-----  5E 5E 5A LSR  $5A5E,X
  0x04A558 $8548: C-----  E0 58    CPX  #$58
  0x04A55A $854A: C-----  46 AA    LSR  $AA
  0x04A55C $854C: C-----  A1 A1    LDA  ($A1,X)
  0x04A55E $854E: C-----  A1 A5    LDA  ($A5,X)
  0x04A560 $8550: C-----  00       BRK  
  0x04A561 $8551: C-----  00       BRK  
  0x04A562 $8552: C-----  00       BRK  
  0x04A563 $8553: C-----  00       BRK  
  0x04A564 $8554: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A565 $8555: C-----  38       SEC  
  0x04A566 $8556: C-----  71 8F    ADC  ($8F),Y
  0x04A568 $8558: C-----  00       BRK  
  0x04A569 $8559: C-----  00       BRK  
  0x04A56A $855A: C-----  00       BRK  
  0x04A56B $855B: C-----  00       BRK  
  0x04A56C $855C: C-----  00       BRK  
  0x04A56D $855D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A56E $855E: C-----  0E 70 AD ASL  $AD70
  0x04A571 $8561: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x04A572 $8562: C-----  A6 1C    LDX  $1C
  0x04A574 $8564: C-----  E0 00    CPX  #$00
  0x04A576 $8566: C-----  01 8F    ORA  ($8F,X)
  0x04A578 $8568: C-----  00       BRK  
  0x04A579 $8569: C-----  00       BRK  
  0x04A57A $856A: C-----  01 03    ORA  ($03,X)
  0x04A57C $856C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A57D $856D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A57E $856E: C-----  FE 71 00 INC  $0071,X
  0x04A581 $8571: C-----  00       BRK  
  0x04A582 $8572: C-----  00       BRK  
  0x04A583 $8573: C-----  00       BRK  
  0x04A584 $8574: C-----  F0 98    BEQ  $850E
  0x04A586 $8576: C-----  86 E1    STX  $E1
  0x04A588 $8578: C-----  00       BRK  
  0x04A589 $8579: C-----  00       BRK  
  0x04A58A $857A: C-----  00       BRK  
  0x04A58B $857B: C-----  00       BRK  
  0x04A58C $857C: C-----  00       BRK  
  0x04A58D $857D: C-----  60       RTS  
  0x04A58E $857E: C-----  78       SEI  
  0x04A58F $857F: C-----  1E 01 03 ASL  $0301,X
  0x04A592 $8582: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A593 $8583: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A594 $8584: C-----  1D 3B 7D ORA  $7D3B,X
  0x04A597 $8587: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04A598 $8588: C-----  00       BRK  
  0x04A599 $8589: C-----  00       BRK  
  0x04A59A $858A: C-----  00       BRK  
  0x04A59B $858B: C-----  00       BRK  
  0x04A59C $858C: C-----  0A       ASL  A
  0x04A59D $858D: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04A59E $858E: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x04A59F $858F: C-----  25 FF    AND  $FF
  0x04A5A1 $8591: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04A5A2 $8592: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04A5A3 $8593: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x04A5A4 $8594: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x04A5A5 $8595: C-----  A4 C4    LDY  $C4
  0x04A5A7 $8597: C-----  F8       SED  
  0x04A5A8 $8598: C-----  00       BRK  
  0x04A5A9 $8599: C-----  50 A8    BVC  $8543
  0x04A5AB $859B: C-----  58       CLI  
  0x04A5AC $859C: C-----  BC 5B 3B LDY  $3B5B,X
  0x04A5AF $859F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A5B0 $85A0: C-----  ED DB AD SBC  $ADDB
  0x04A5B3 $85A3: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04A5B4 $85A4: C-----  BD DE E3 LDA  $E3DE,X
  0x04A5B7 $85A7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A5B8 $85A8: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x04A5B9 $85A9: C-----  24 52    BIT  $52
  0x04A5BB $85AB: C-----  40       RTI  
  0x04A5BC $85AC: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04A5BD $85AD: C-----  21 1C    AND  ($1C,X)
  0x04A5BF $85AF: C-----  00       BRK  
  0x04A5C0 $85B0: C-----  F8       SED  
  0x04A5C1 $85B1: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A5C2 $85B2: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A5C3 $85B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A5C4 $85B4: C-----  F8       SED  
  0x04A5C5 $85B5: C-----  B8       CLV  
  0x04A5C6 $85B6: C-----  50 A8    BVC  $8560
  0x04A5C8 $85B8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A5C9 $85B9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A5CA $85BA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A5CB $85BB: C-----  00       BRK  
  0x04A5CC $85BC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A5CD $85BD: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x04A5CE $85BE: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04A5CF $85BF: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04A5D0 $85C0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A5D1 $85C1: C-----  F1 E0    SBC  ($E0),Y
  0x04A5D3 $85C3: C-----  E0 E0    CPX  #$E0
  0x04A5D5 $85C5: C-----  20 11 0F JSR  $0F11
  0x04A5D8 $85C8: C-----  00       BRK  
  0x04A5D9 $85C9: C-----  0E 1F 1F ASL  $1F1F
  0x04A5DC $85CC: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A5DD $85CD: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04A5DE $85CE: C-----  EE F0 80 INC  $80F0
  0x04A5E1 $85D1: C-----  C0 E0    CPY  #$E0
  0x04A5E3 $85D3: C-----  E0 B0    CPX  #$B0
  0x04A5E5 $85D5: C-----  90 10    BCC  $85E7
  0x04A5E7 $85D7: C-----  10 00    BPL  $85D9
  0x04A5E9 $85D9: C-----  00       BRK  
  0x04A5EA $85DA: C-----  00       BRK  
  0x04A5EB $85DB: C-----  00       BRK  
  0x04A5EC $85DC: C-----  40       RTI  
  0x04A5ED $85DD: C-----  60       RTS  
  0x04A5EE $85DE: C-----  E0 E0    CPX  #$E0
  0x04A5F0 $85E0: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A5F1 $85E1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A5F2 $85E2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04A5F3 $85E3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A5F4 $85E4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A5F5 $85E5: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04A5F6 $85E6: C-----  08       PHP  
  0x04A5F7 $85E7: C-----  10 E0    BPL  $85C9
  0x04A5F9 $85E9: C-----  E0 C0    CPX  #$C0
  0x04A5FB $85EB: C-----  00       BRK  
  0x04A5FC $85EC: C-----  E0 F3    CPX  #$F3
  0x04A5FE $85EE: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04A5FF $85EF: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04A600 $85F0: C-----  10 90    BPL  $8582
  0x04A602 $85F2: C-----  90 F0    BCC  $85E4
  0x04A604 $85F4: C-----  30 20    BMI  $8616
  0x04A606 $85F6: C-----  40       RTI  
  0x04A607 $85F7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A608 $85F8: C-----  E0 60    CPX  #$60
  0x04A60A $85FA: C-----  60       RTS  
  0x04A60B $85FB: C-----  00       BRK  
  0x04A60C $85FC: C-----  C0 C0    CPY  #$C0
  0x04A60E $85FE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A60F $85FF: C-----  00       BRK  
  0x04A610 $8600: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04A611 $8601: C-----  24 08    BIT  $08
  0x04A613 $8603: C-----  08       PHP  
  0x04A614 $8604: C-----  90 A0    BCC  $85A6
  0x04A616 $8606: C-----  20 C0 E8 JSR  $E8C0
  0x04A619 $8609: C-----  D8       CLD  
  0x04A61A $860A: C-----  F0 F0    BEQ  $85FC
  0x04A61C $860C: C-----  60       RTS  
  0x04A61D $860D: C-----  40       RTI  
  0x04A61E $860E: C-----  C0 00    CPY  #$00
  0x04A620 $8610: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A621 $8611: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04A622 $8612: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A623 $8613: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A624 $8614: C-----  FE FF E7 INC  $E7FF,X
  0x04A627 $8617: C-----  38       SEC  
  0x04A628 $8618: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x04A629 $8619: C-----  F5 AB    SBC  $AB,X
  0x04A62B $861B: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04A62C $861C: C-----  F9 E6 18 SBC  $18E6,Y
  0x04A62F $861F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A630 $8620: C-----  00       BRK  
  0x04A631 $8621: C-----  00       BRK  
  0x04A632 $8622: C-----  00       BRK  
  0x04A633 $8623: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A634 $8624: C-----  78       SEI  
  0x04A635 $8625: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A636 $8626: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A637 $8627: C-----  F8       SED  
  0x04A638 $8628: C-----  00       BRK  
  0x04A639 $8629: C-----  00       BRK  
  0x04A63A $862A: C-----  00       BRK  
  0x04A63B $862B: C-----  00       BRK  
  0x04A63C $862C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A63D $862D: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04A63E $862E: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x04A63F $862F: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x04A640 $8630: C-----  00       BRK  
  0x04A641 $8631: C-----  00       BRK  
  0x04A642 $8632: C-----  00       BRK  
  0x04A643 $8633: C-----  00       BRK  
  0x04A644 $8634: C-----  C0 20    CPY  #$20
  0x04A646 $8636: C-----  20 10 00 JSR  $0010
  0x04A649 $8639: C-----  00       BRK  
  0x04A64A $863A: C-----  00       BRK  
  0x04A64B $863B: C-----  00       BRK  
  0x04A64C $863C: C-----  00       BRK  
  0x04A64D $863D: C-----  C0 C0    CPY  #$C0
  0x04A64F $863F: C-----  E0 08    CPX  #$08
  0x04A651 $8641: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A652 $8642: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A653 $8643: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04A654 $8644: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04A655 $8645: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04A656 $8646: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04A657 $8647: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04A658 $8648: C-----  F0 F8    BEQ  $8642
  0x04A65A $864A: C-----  F8       SED  
  0x04A65B $864B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A65C $864C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A65D $864D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A65E $864E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A65F $864F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A660 $8650: C-----  00       BRK  
  0x04A661 $8651: C-----  00       BRK  
  0x04A662 $8652: C-----  00       BRK  
  0x04A663 $8653: C-----  01 07    ORA  ($07,X)
  0x04A665 $8655: C-----  38       SEC  
  0x04A666 $8656: C-----  71 8F    ADC  ($8F),Y
  0x04A668 $8658: C-----  00       BRK  
  0x04A669 $8659: C-----  00       BRK  
  0x04A66A $865A: C-----  00       BRK  
  0x04A66B $865B: C-----  00       BRK  
  0x04A66C $865C: C-----  00       BRK  
  0x04A66D $865D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A66E $865E: C-----  0E 70 02 ASL  $0270
  0x04A671 $8661: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A672 $8662: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A673 $8663: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A674 $8664: C-----  08       PHP  
  0x04A675 $8665: C-----  08       PHP  
  0x04A676 $8666: C-----  18       CLC  
  0x04A677 $8667: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04A678 $8668: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A679 $8669: C-----  F8       SED  
  0x04A67A $866A: C-----  F8       SED  
  0x04A67B $866B: C-----  F8       SED  
  0x04A67C $866C: C-----  F0 F0    BEQ  $865E
  0x04A67E $866E: C-----  E0 E0    CPX  #$E0
  0x04A680 $8670: C-----  21 73    AND  ($73,X)
  0x04A682 $8672: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A683 $8673: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A684 $8674: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A685 $8675: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04A686 $8676: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04A687 $8677: C-----  E1 00    SBC  ($00,X)
  0x04A689 $8679: C-----  00       BRK  
  0x04A68A $867A: C-----  00       BRK  
  0x04A68B $867B: C-----  00       BRK  
  0x04A68C $867C: C-----  00       BRK  
  0x04A68D $867D: C-----  60       RTS  
  0x04A68E $867E: C-----  78       SEI  
  0x04A68F $867F: C-----  1E FF FF ASL  $FFFF,X
  0x04A692 $8682: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A693 $8683: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A694 $8684: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A695 $8685: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A696 $8686: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A697 $8687: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A698 $8688: C-----  B8       CLV  
  0x04A699 $8689: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04A69A $868A: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04A69B $868B: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04A69C $868C: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04A69D $868D: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04A69E $868E: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04A69F $868F: C-----  EE 10 88 INC  $8810
  0x04A6A2 $8692: C-----  C8       INY  
  0x04A6A3 $8693: C-----  C8       INY  
  0x04A6A4 $8694: C-----  C8       INY  
  0x04A6A5 $8695: C-----  88       DEY  
  0x04A6A6 $8696: C-----  88       DEY  
  0x04A6A7 $8697: C-----  08       PHP  
  0x04A6A8 $8698: C-----  E0 70    CPX  #$70
  0x04A6AA $869A: C-----  B0 B0    BCS  $864C
  0x04A6AC $869C: C-----  B0 70    BCS  $870E
  0x04A6AE $869E: C-----  70 F0    BVS  $8690
  0x04A6B0 $86A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A6B1 $86A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A6B2 $86A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A6B3 $86A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A6B4 $86A4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A6B5 $86A5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A6B6 $86A6: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04A6B7 $86A7: C-----  00       BRK  
  0x04A6B8 $86A8: C-----  FE FE AF INC  $AFFE,X
  0x04A6BB $86AB: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x04A6BC $86AC: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04A6BD $86AD: C-----  8D 00 00 STA  $0000
  0x04A6C0 $86B0: C-----  08       PHP  
  0x04A6C1 $86B1: C-----  10 90    BPL  $8643
  0x04A6C3 $86B3: C-----  A0 E0    LDY  #$E0
  0x04A6C5 $86B5: C-----  C0 80    CPY  #$80
  0x04A6C7 $86B7: C-----  00       BRK  
  0x04A6C8 $86B8: C-----  F0 E0    BEQ  $869A
  0x04A6CA $86BA: C-----  60       RTS  
  0x04A6CB $86BB: C-----  40       RTI  
  0x04A6CC $86BC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A6CD $86BD: C-----  00       BRK  
  0x04A6CE $86BE: C-----  00       BRK  
  0x04A6CF $86BF: C-----  00       BRK  
  0x04A6D0 $86C0: C-----  90 70    BCC  $8732
  0x04A6D2 $86C2: C-----  18       CLC  
  0x04A6D3 $86C3: C-----  00       BRK  
  0x04A6D4 $86C4: C-----  00       BRK  
  0x04A6D5 $86C5: C-----  00       BRK  
  0x04A6D6 $86C6: C-----  00       BRK  
  0x04A6D7 $86C7: C-----  00       BRK  
  0x04A6D8 $86C8: C-----  60       RTS  
  0x04A6D9 $86C9: C-----  00       BRK  
  0x04A6DA $86CA: C-----  00       BRK  
  0x04A6DB $86CB: C-----  00       BRK  
  0x04A6DC $86CC: C-----  00       BRK  
  0x04A6DD $86CD: C-----  00       BRK  
  0x04A6DE $86CE: C-----  00       BRK  
  0x04A6DF $86CF: C-----  00       BRK  
  0x04A6E0 $86D0: C-----  4D 8B 4D EOR  $4D8B
  0x04A6E3 $86D3: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04A6E4 $86D4: C-----  25 46    AND  $46
  0x04A6E6 $86D6: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04A6E7 $86D7: C-----  41 32    EOR  ($32,X)
  0x04A6E9 $86D9: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x04A6EA $86DA: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x04A6EB $86DB: C-----  10 1A    BPL  $86F7
  0x04A6ED $86DD: C-----  39 7C 3E AND  $3E7C,Y
  0x04A6F0 $86E0: C-----  0D 03 01 ORA  $0103
  0x04A6F3 $86E3: C-----  00       BRK  
  0x04A6F4 $86E4: C-----  00       BRK  
  0x04A6F5 $86E5: C-----  00       BRK  
  0x04A6F6 $86E6: C-----  00       BRK  
  0x04A6F7 $86E7: C-----  00       BRK  
  0x04A6F8 $86E8: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04A6F9 $86E9: C-----  00       BRK  
  0x04A6FA $86EA: C-----  00       BRK  
  0x04A6FB $86EB: C-----  00       BRK  
  0x04A6FC $86EC: C-----  00       BRK  
  0x04A6FD $86ED: C-----  00       BRK  
  0x04A6FE $86EE: C-----  00       BRK  
  0x04A6FF $86EF: C-----  00       BRK  
  0x04A700 $86F0: C-----  30 10    BMI  $8702
  0x04A702 $86F2: C-----  10 1E    BPL  $8712
  0x04A704 $86F4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04A705 $86F5: C-----  01 00    ORA  ($00,X)
  0x04A707 $86F7: C-----  00       BRK  
  0x04A708 $86F8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A709 $86F9: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A70A $86FA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A70B $86FB: C-----  01 01    ORA  ($01,X)
  0x04A70D $86FD: C-----  00       BRK  
  0x04A70E $86FE: C-----  00       BRK  
  0x04A70F $86FF: C-----  00       BRK  
  0x04A710 $8700: C-----  21 53    AND  ($53,X)
  0x04A712 $8702: C-----  8D 01 F0 STA  $F001
  0x04A715 $8705: C-----  98       TYA  
  0x04A716 $8706: C-----  86 E1    STX  $E1
  0x04A718 $8708: C-----  00       BRK  
  0x04A719 $8709: C-----  20 72 FE JSR  $FE72
  0x04A71C $870C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A71D $870D: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x04A71E $870E: C-----  79 1E D4 ADC  $D41E,Y
  0x04A721 $8711: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x04A722 $8712: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A723 $8713: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A724 $8714: C-----  00       BRK  
  0x04A725 $8715: C-----  00       BRK  
  0x04A726 $8716: C-----  00       BRK  
  0x04A727 $8717: C-----  00       BRK  
  0x04A728 $8718: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x04A729 $8719: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04A72A $871A: C-----  00       BRK  
  0x04A72B $871B: C-----  00       BRK  
  0x04A72C $871C: C-----  00       BRK  
  0x04A72D $871D: C-----  00       BRK  
  0x04A72E $871E: C-----  00       BRK  
  0x04A72F $871F: C-----  00       BRK  
  0x04A730 $8720: C-----  00       BRK  
  0x04A731 $8721: C-----  10 70    BPL  $8793
  0x04A733 $8723: C-----  F0 F0    BEQ  $8715
  0x04A735 $8725: C-----  F0 FE    BEQ  $8725
  0x04A737 $8727: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A738 $8728: C-----  00       BRK  
  0x04A739 $8729: C-----  00       BRK  
  0x04A73A $872A: C-----  00       BRK  
  0x04A73B $872B: C-----  00       BRK  
  0x04A73C $872C: C-----  00       BRK  
  0x04A73D $872D: C-----  00       BRK  
  0x04A73E $872E: C-----  00       BRK  
  0x04A73F $872F: C-----  00       BRK  
  0x04A740 $8730: C-----  FE FE FC INC  $FCFE,X
  0x04A743 $8733: C-----  FE BF 9E INC  $9EBF,X
  0x04A746 $8736: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04A747 $8737: C-----  18       CLC  
  0x04A748 $8738: C-----  00       BRK  
  0x04A749 $8739: C-----  00       BRK  
  0x04A74A $873A: C-----  00       BRK  
  0x04A74B $873B: C-----  00       BRK  
  0x04A74C $873C: C-----  40       RTI  
  0x04A74D $873D: C-----  60       RTS  
  0x04A74E $873E: C-----  E0 E0    CPX  #$E0
  0x04A750 $8740: C-----  11 E6    ORA  ($E6),Y
  0x04A752 $8742: C-----  F8       SED  
  0x04A753 $8743: C-----  E0 00    CPX  #$00
  0x04A755 $8745: C-----  00       BRK  
  0x04A756 $8746: C-----  00       BRK  
  0x04A757 $8747: C-----  00       BRK  
  0x04A758 $8748: C-----  EE 18 00 INC  $0018
  0x04A75B $874B: C-----  00       BRK  
  0x04A75C $874C: C-----  00       BRK  
  0x04A75D $874D: C-----  00       BRK  
  0x04A75E $874E: C-----  00       BRK  
  0x04A75F $874F: C-----  00       BRK  
  0x04A760 $8750: C-----  00       BRK  
  0x04A761 $8751: C-----  10 70    BPL  $87C3
  0x04A763 $8753: C-----  D0 10    BNE  $8765
  0x04A765 $8755: C-----  10 1E    BPL  $8775
  0x04A767 $8757: C-----  01 00    ORA  ($00,X)
  0x04A769 $8759: C-----  00       BRK  
  0x04A76A $875A: C-----  00       BRK  
  0x04A76B $875B: C-----  20 E0 E0 JSR  $E0E0
  0x04A76E $875E: C-----  E0 FE    CPX  #$FE
  0x04A770 $8760: C-----  01 03    ORA  ($03,X)
  0x04A772 $8762: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04A773 $8763: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x04A774 $8764: C-----  25 2B    AND  $2B
  0x04A776 $8766: C-----  2D 2A 00 AND  $002A
  0x04A779 $8769: C-----  00       BRK  
  0x04A77A $876A: C-----  00       BRK  
  0x04A77B $876B: C-----  18       CLC  
  0x04A77C $876C: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x04A77D $876D: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04A77E $876E: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x04A77F $876F: C-----  15 82    ORA  $82,X
  0x04A781 $8771: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x04A782 $8772: C-----  E4 E2    CPX  $E2
  0x04A784 $8774: C-----  B1 92    LDA  ($92),Y
  0x04A786 $8776: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04A787 $8777: C-----  18       CLC  
  0x04A788 $8778: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04A789 $8779: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04A78A $877A: C-----  18       CLC  
  0x04A78B $877B: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04A78C $877C: C-----  4E 6C E8 LSR  $E86C
  0x04A78F $877F: C-----  E0 01    CPX  #$01
  0x04A791 $8781: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A792 $8782: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04A793 $8783: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04A794 $8784: C-----  3D 3B 3D AND  $3D3B,X
  0x04A797 $8787: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x04A798 $8788: C-----  00       BRK  
  0x04A799 $8789: C-----  00       BRK  
  0x04A79A $878A: C-----  00       BRK  
  0x04A79B $878B: C-----  00       BRK  
  0x04A79C $878C: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04A79D $878D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A79E $878E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04A79F $878F: C-----  05 7D    ORA  $7D
  0x04A7A1 $8791: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04A7A2 $8792: C-----  7D 3F 3D ADC  $3D3F,X
  0x04A7A5 $8795: C-----  7E FF 7F ROR  $7FFF,X
  0x04A7A8 $8798: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04A7A9 $8799: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A7AA $879A: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04A7AB $879B: C-----  00       BRK  
  0x04A7AC $879C: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04A7AD $879D: C-----  01 00    ORA  ($00,X)
  0x04A7AF $879F: C-----  00       BRK  
  0x04A7B0 $87A0: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x04A7B1 $87A1: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x04A7B2 $87A2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A7B3 $87A3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A7B4 $87A4: C-----  01 93    ORA  ($93,X)
  0x04A7B6 $87A6: C-----  AA       TAX  
  0x04A7B7 $87A7: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04A7B8 $87A8: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x04A7B9 $87A9: C-----  94 E0    STY  $E0,X
  0x04A7BB $87AB: C-----  F0 FE    BEQ  $87AB
  0x04A7BD $87AD: C-----  6C 44 00 JMP  ($0044)
  0x04A7C0 $87B0: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04A7C1 $87B1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A7C2 $87B2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A7C3 $87B3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A7C4 $87B4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A7C5 $87B5: C-----  01 00    ORA  ($00,X)
  0x04A7C7 $87B7: C-----  00       BRK  
  0x04A7C8 $87B8: C-----  00       BRK  
  0x04A7C9 $87B9: C-----  00       BRK  
  0x04A7CA $87BA: C-----  00       BRK  
  0x04A7CB $87BB: C-----  00       BRK  
  0x04A7CC $87BC: C-----  00       BRK  
  0x04A7CD $87BD: C-----  00       BRK  
  0x04A7CE $87BE: C-----  00       BRK  
  0x04A7CF $87BF: C-----  00       BRK  
  0x04A7D0 $87C0: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x04A7D1 $87C1: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04A7D2 $87C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A7D3 $87C3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A7D4 $87C4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A7D5 $87C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A7D6 $87C6: C-----  EE 44 2B INC  $2B44
  0x04A7D9 $87C9: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04A7DA $87CA: C-----  00       BRK  
  0x04A7DB $87CB: C-----  00       BRK  
  0x04A7DC $87CC: C-----  00       BRK  
  0x04A7DD $87CD: C-----  00       BRK  
  0x04A7DE $87CE: C-----  00       BRK  
  0x04A7DF $87CF: C-----  00       BRK  
  0x04A7E0 $87D0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A7E1 $87D1: C-----  !!UNDEF $89  ; unknown opcode, treating as data
  0x04A7E2 $87D2: C-----  18       CLC  
  0x04A7E3 $87D3: C-----  FE FF FF INC  $FFFF,X
  0x04A7E6 $87D6: C-----  7E 7E 00 ROR  $007E,X
  0x04A7E9 $87D9: C-----  76 E7    ROR  $E7,X
  0x04A7EB $87DB: C-----  01 00    ORA  ($00,X)
  0x04A7ED $87DD: C-----  00       BRK  
  0x04A7EE $87DE: C-----  81 81    STA  ($81,X)
  0x04A7F0 $87E0: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x04A7F1 $87E1: C-----  BA       TSX  
  0x04A7F2 $87E2: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04A7F3 $87E3: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04A7F4 $87E4: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04A7F5 $87E5: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04A7F6 $87E6: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04A7F7 $87E7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A7F8 $87E8: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x04A7F9 $87E9: C-----  45 23    EOR  $23
  0x04A7FB $87EB: C-----  50 20    BVC  $880D
  0x04A7FD $87ED: C-----  40       RTI  
  0x04A7FE $87EE: C-----  20 00 3E JSR  $3E00
  0x04A801 $87F1: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04A802 $87F2: C-----  41 80    EOR  ($80,X)
  0x04A804 $87F4: C-----  81 C1    STA  ($C1,X)
  0x04A806 $87F6: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04A807 $87F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A808 $87F8: C-----  C1 BD    CMP  ($BD,X)
  0x04A80A $87FA: C-----  BE 7F 7E LDX  $7E7F,Y
  0x04A80D $87FD: C-----  3E 3C 00 ROL  $003C,X
  0x04A810 $8800: ------  .byte $00
  0x04A811 $8801: ------  .byte $00
  0x04A812 $8802: ------  .byte $00
  0x04A813 $8803: ------  .byte $00
  0x04A814 $8804: ------  .byte $00
  0x04A815 $8805: ------  .byte $00
  0x04A816 $8806: ------  .byte $00
  0x04A817 $8807: ------  .byte $00
  0x04A818 $8808: ------  .byte $00
  0x04A819 $8809: ------  .byte $00
  0x04A81A $880A: ------  .byte $00
  0x04A81B $880B: ------  .byte $00
  0x04A81C $880C: ------  .byte $00
  0x04A81D $880D: ------  .byte $00
  0x04A81E $880E: ------  .byte $00
  0x04A81F $880F: ------  .byte $00
  0x04A820 $8810: ------  .byte $FF
  0x04A821 $8811: ------  .byte $FF
  0x04A822 $8812: ------  .byte $FF
  0x04A823 $8813: ------  .byte $FF
  0x04A824 $8814: ------  .byte $FF
  0x04A825 $8815: ------  .byte $FF
  0x04A826 $8816: ------  .byte $FF
  0x04A827 $8817: ------  .byte $FF
  0x04A828 $8818: ------  .byte $00
  0x04A829 $8819: ------  .byte $00
  0x04A82A $881A: ------  .byte $00
  0x04A82B $881B: ------  .byte $00
  0x04A82C $881C: ------  .byte $00
  0x04A82D $881D: ------  .byte $00
  0x04A82E $881E: ------  .byte $00
  0x04A82F $881F: ------  .byte $00
  0x04A830 $8820: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04A831 $8821: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x04A832 $8822: C-----  35 1A    AND  $1A,X
  0x04A834 $8824: C-----  0D 06 03 ORA  $0306
  0x04A837 $8827: C-----  00       BRK  
  0x04A838 $8828: C-----  20 14 0A JSR  $0A14
  0x04A83B $882B: C-----  05 02    ORA  $02
  0x04A83D $882D: C-----  01 00    ORA  ($00,X)
  0x04A83F $882F: C-----  00       BRK  
  0x04A840 $8830: C-----  81 80    STA  ($80,X)
  0x04A842 $8832: C-----  00       BRK  
  0x04A843 $8833: C-----  81 41    STA  ($41,X)
  0x04A845 $8835: C-----  BE FF FF LDX  $FFFF,Y
  0x04A848 $8838: C-----  7E 7F FF ROR  $FF7F,X
  0x04A84B $883B: C-----  7E BE 41 ROR  $41BE,X
  0x04A84E $883E: C-----  00       BRK  
  0x04A84F $883F: C-----  00       BRK  
  0x04A850 $8840: C-----  00       BRK  
  0x04A851 $8841: C-----  C0 60    CPY  #$60
  0x04A853 $8843: C-----  10 F8    BPL  $883D
  0x04A855 $8845: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04A856 $8846: C-----  0E 0E 00 ASL  $000E
  0x04A859 $8849: C-----  00       BRK  
  0x04A85A $884A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A85B $884B: C-----  E0 00    CPX  #$00
  0x04A85D $884D: C-----  E0 F0    CPX  #$F0
  0x04A85F $884F: C-----  F0 00    BEQ  $8851
  0x04A861 $8851: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A862 $8852: C-----  06 08    ASL  $08
  0x04A864 $8854: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A865 $8855: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x04A866 $8856: C-----  75 7A    ADC  $7A,X
  0x04A868 $8858: C-----  00       BRK  
  0x04A869 $8859: C-----  00       BRK  
  0x04A86A $885A: C-----  01 07    ORA  ($07,X)
  0x04A86C $885C: C-----  00       BRK  
  0x04A86D $885D: C-----  05 0A    ORA  $0A
  0x04A86F $885F: C-----  05 0B    ORA  $0B
  0x04A871 $8861: C-----  09 11    ORA  #$11
  0x04A873 $8863: C-----  F1 F1    SBC  ($F1),Y
  0x04A875 $8865: C-----  F9 F9 FF SBC  $FFF9,Y
  0x04A878 $8868: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04A879 $8869: C-----  F6 EE    INC  $EE,X
  0x04A87B $886B: C-----  0E 0E 06 ASL  $060E
  0x04A87E $886E: C-----  06 00    ASL  $00
  0x04A880 $8870: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x04A881 $8871: C-----  C6 84    DEC  $84
  0x04A883 $8873: C-----  08       PHP  
  0x04A884 $8874: C-----  10 60    BPL  $88D6
  0x04A886 $8876: C-----  C0 00    CPY  #$00
  0x04A888 $8878: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04A889 $8879: C-----  38       SEC  
  0x04A88A $887A: C-----  78       SEI  
  0x04A88B $887B: C-----  F0 E0    BEQ  $885D
  0x04A88D $887D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A88E $887E: C-----  00       BRK  
  0x04A88F $887F: C-----  00       BRK  
  0x04A890 $8880: C-----  00       BRK  
  0x04A891 $8881: C-----  00       BRK  
  0x04A892 $8882: C-----  01 02    ORA  ($02,X)
  0x04A894 $8884: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04A895 $8885: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A896 $8886: C-----  08       PHP  
  0x04A897 $8887: C-----  08       PHP  
  0x04A898 $8888: C-----  00       BRK  
  0x04A899 $8889: C-----  00       BRK  
  0x04A89A $888A: C-----  00       BRK  
  0x04A89B $888B: C-----  01 01    ORA  ($01,X)
  0x04A89D $888D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A89E $888E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A89F $888F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A8A0 $8890: C-----  00       BRK  
  0x04A8A1 $8891: C-----  00       BRK  
  0x04A8A2 $8892: C-----  01 06    ORA  ($06,X)
  0x04A8A4 $8894: C-----  08       PHP  
  0x04A8A5 $8895: C-----  10 20    BPL  $88B7
  0x04A8A7 $8897: C-----  40       RTI  
  0x04A8A8 $8898: C-----  00       BRK  
  0x04A8A9 $8899: C-----  00       BRK  
  0x04A8AA $889A: C-----  00       BRK  
  0x04A8AB $889B: C-----  01 07    ORA  ($07,X)
  0x04A8AD $889D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A8AE $889E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A8AF $889F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04A8B0 $88A0: C-----  11 10    ORA  ($10),Y
  0x04A8B2 $88A2: C-----  21 22    AND  ($22,X)
  0x04A8B4 $88A4: C-----  !!UNDEF $72  ; unknown opcode, treating as data
  0x04A8B5 $88A5: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04A8B6 $88A6: C-----  D8       CLD  
  0x04A8B7 $88A7: C-----  98       TYA  
  0x04A8B8 $88A8: C-----  0E 0F 1E ASL  $1E0F
  0x04A8BB $88AB: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04A8BC $88AC: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04A8BD $88AD: C-----  00       BRK  
  0x04A8BE $88AE: C-----  20 60 97 JSR  $9760
  0x04A8C1 $88B1: C-----  !!UNDEF $93  ; unknown opcode, treating as data
  0x04A8C2 $88B2: C-----  19 2C 57 ORA  $572C,Y
  0x04A8C5 $88B5: C-----  AC 58 B0 LDY  $B058
  0x04A8C8 $88B8: C-----  68       PLA  
  0x04A8C9 $88B9: C-----  6C E6 D3 JMP  ($D3E6)
  0x04A8CC $88BC: C-----  A8       TAY  
  0x04A8CD $88BD: C-----  50 A0    BVC  $885F
  0x04A8CF $88BF: C-----  40       RTI  
  0x04A8D0 $88C0: C-----  00       BRK  
  0x04A8D1 $88C1: C-----  00       BRK  
  0x04A8D2 $88C2: C-----  00       BRK  
  0x04A8D3 $88C3: C-----  00       BRK  
  0x04A8D4 $88C4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A8D5 $88C5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A8D6 $88C6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A8D7 $88C7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04A8D8 $88C8: C-----  00       BRK  
  0x04A8D9 $88C9: C-----  00       BRK  
  0x04A8DA $88CA: C-----  00       BRK  
  0x04A8DB $88CB: C-----  00       BRK  
  0x04A8DC $88CC: C-----  00       BRK  
  0x04A8DD $88CD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A8DE $88CE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A8DF $88CF: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A8E0 $88D0: C-----  00       BRK  
  0x04A8E1 $88D1: C-----  00       BRK  
  0x04A8E2 $88D2: C-----  00       BRK  
  0x04A8E3 $88D3: C-----  00       BRK  
  0x04A8E4 $88D4: C-----  00       BRK  
  0x04A8E5 $88D5: C-----  01 02    ORA  ($02,X)
  0x04A8E7 $88D7: C-----  0E 00 00 ASL  $0000
  0x04A8EA $88DA: C-----  00       BRK  
  0x04A8EB $88DB: C-----  00       BRK  
  0x04A8EC $88DC: C-----  00       BRK  
  0x04A8ED $88DD: C-----  00       BRK  
  0x04A8EE $88DE: C-----  01 01    ORA  ($01,X)
  0x04A8F0 $88E0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04A8F1 $88E1: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04A8F2 $88E2: C-----  39 02 04 AND  $0402,Y
  0x04A8F5 $88E5: C-----  08       PHP  
  0x04A8F6 $88E6: C-----  08       PHP  
  0x04A8F7 $88E7: C-----  10 38    BPL  $8921
  0x04A8F9 $88E9: C-----  28       PLP  
  0x04A8FA $88EA: C-----  00       BRK  
  0x04A8FB $88EB: C-----  01 03    ORA  ($03,X)
  0x04A8FD $88ED: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A8FE $88EE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A8FF $88EF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A900 $88F0: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04A901 $88F1: C-----  24 64    BIT  $64
  0x04A903 $88F3: C-----  A6 C5    LDX  $C5
  0x04A905 $88F5: C-----  F6 EB    INC  $EB,X
  0x04A907 $88F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A908 $88F8: C-----  08       PHP  
  0x04A909 $88F9: C-----  18       CLC  
  0x04A90A $88FA: C-----  18       CLC  
  0x04A90B $88FB: C-----  58       CLI  
  0x04A90C $88FC: C-----  B8       CLV  
  0x04A90D $88FD: C-----  88       DEY  
  0x04A90E $88FE: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x04A90F $88FF: C-----  C0 00    CPY  #$00
  0x04A911 $8901: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A912 $8902: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A913 $8903: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04A914 $8904: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04A915 $8905: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04A916 $8906: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04A917 $8907: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x04A918 $8908: C-----  00       BRK  
  0x04A919 $8909: C-----  00       BRK  
  0x04A91A $890A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A91B $890B: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04A91C $890C: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04A91D $890D: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04A91E $890E: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04A91F $890F: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04A920 $8910: C-----  00       BRK  
  0x04A921 $8911: C-----  00       BRK  
  0x04A922 $8912: C-----  00       BRK  
  0x04A923 $8913: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A924 $8914: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A925 $8915: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A926 $8916: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A927 $8917: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04A928 $8918: C-----  00       BRK  
  0x04A929 $8919: C-----  00       BRK  
  0x04A92A $891A: C-----  00       BRK  
  0x04A92B $891B: C-----  00       BRK  
  0x04A92C $891C: C-----  05 0E    ORA  $0E
  0x04A92E $891E: C-----  0A       ASL  A
  0x04A92F $891F: C-----  11 27    ORA  ($27),Y
  0x04A931 $8921: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04A932 $8922: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A933 $8923: C-----  38       SEC  
  0x04A934 $8924: C-----  D0 20    BNE  $8946
  0x04A936 $8926: C-----  C0 80    CPY  #$80
  0x04A938 $8928: C-----  D8       CLD  
  0x04A939 $8929: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A93A $892A: C-----  F8       SED  
  0x04A93B $892B: C-----  C0 20    CPY  #$20
  0x04A93D $892D: C-----  C0 00    CPY  #$00
  0x04A93F $892F: C-----  00       BRK  
  0x04A940 $8930: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A941 $8931: C-----  FE F8 F0 INC  $F0F8,X
  0x04A944 $8934: C-----  E0 E0    CPX  #$E0
  0x04A946 $8936: C-----  C0 80    CPY  #$80
  0x04A948 $8938: C-----  3E F8 F0 ROL  $F0F8,X
  0x04A94B $893B: C-----  E0 C0    CPX  #$C0
  0x04A94D $893D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A94E $893E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A94F $893F: C-----  00       BRK  
  0x04A950 $8940: C-----  00       BRK  
  0x04A951 $8941: C-----  00       BRK  
  0x04A952 $8942: C-----  00       BRK  
  0x04A953 $8943: C-----  00       BRK  
  0x04A954 $8944: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A955 $8945: C-----  C0 C0    CPY  #$C0
  0x04A957 $8947: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A958 $8948: C-----  00       BRK  
  0x04A959 $8949: C-----  00       BRK  
  0x04A95A $894A: C-----  00       BRK  
  0x04A95B $894B: C-----  00       BRK  
  0x04A95C $894C: C-----  00       BRK  
  0x04A95D $894D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A95E $894E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A95F $894F: C-----  00       BRK  
  0x04A960 $8950: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A961 $8951: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04A962 $8952: C-----  15 2A    ORA  $2A,X
  0x04A964 $8954: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04A965 $8955: C-----  AC 58 B0 LDY  $B058
  0x04A968 $8958: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04A969 $8959: C-----  7D EA D5 ADC  $D5EA,X
  0x04A96C $895C: C-----  A8       TAY  
  0x04A96D $895D: C-----  50 A0    BVC  $88FF
  0x04A96F $895F: C-----  40       RTI  
  0x04A970 $8960: C-----  01 06    ORA  ($06,X)
  0x04A972 $8962: C-----  19 20 42 ORA  $4220,Y
  0x04A975 $8965: C-----  C1 40    CMP  ($40,X)
  0x04A977 $8967: C-----  40       RTI  
  0x04A978 $8968: C-----  00       BRK  
  0x04A979 $8969: C-----  01 06    ORA  ($06,X)
  0x04A97B $896B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04A97C $896C: C-----  3D 3E BF AND  $BF3E,X
  0x04A97F $896F: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04A980 $8970: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A981 $8971: C-----  BE 18 90 LDX  $9018,Y
  0x04A984 $8974: C-----  60       RTS  
  0x04A985 $8975: C-----  E0 40    CPX  #$40
  0x04A987 $8977: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A988 $8978: C-----  3E 58 E0 ROL  $E058,X
  0x04A98B $897B: C-----  60       RTS  
  0x04A98C $897C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A98D $897D: C-----  00       BRK  
  0x04A98E $897E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04A98F $897F: C-----  00       BRK  
  0x04A990 $8980: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x04A991 $8981: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04A992 $8982: C-----  05 06    ORA  $06
  0x04A994 $8984: C-----  08       PHP  
  0x04A995 $8985: C-----  18       CLC  
  0x04A996 $8986: C-----  A8       TAY  
  0x04A997 $8987: C-----  50 00    BVC  $8989
  0x04A999 $8989: C-----  01 02    ORA  ($02,X)
  0x04A99B $898B: C-----  01 07    ORA  ($07,X)
  0x04A99D $898D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A99E $898E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A99F $898F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04A9A0 $8990: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04A9A1 $8991: C-----  0E E4 1C ASL  $1CE4
  0x04A9A4 $8994: C-----  48       PHA  
  0x04A9A5 $8995: C-----  A8       TAY  
  0x04A9A6 $8996: C-----  50 A0    BVC  $8938
  0x04A9A8 $8998: C-----  00       BRK  
  0x04A9A9 $8999: C-----  F0 18    BEQ  $89B3
  0x04A9AB $899B: C-----  E0 B0    CPX  #$B0
  0x04A9AD $899D: C-----  50 A0    BVC  $893F
  0x04A9AF $899F: C-----  40       RTI  
  0x04A9B0 $89A0: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04A9B1 $89A1: C-----  24 64    BIT  $64
  0x04A9B3 $89A3: C-----  A6 05    LDX  $05
  0x04A9B5 $89A5: C-----  56 2B    LSR  $2B,X
  0x04A9B7 $89A7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04A9B8 $89A8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A9B9 $89A9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A9BA $89AA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A9BB $89AB: C-----  01 02    ORA  ($02,X)
  0x04A9BD $89AD: C-----  01 00    ORA  ($00,X)
  0x04A9BF $89AF: C-----  00       BRK  
  0x04A9C0 $89B0: C-----  15 2A    ORA  $2A,X
  0x04A9C2 $89B2: C-----  41 00    EOR  ($00,X)
  0x04A9C4 $89B4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A9C5 $89B5: C-----  AC 50 A0 LDY  $A050
  0x04A9C8 $89B8: C-----  EA       NOP  
  0x04A9C9 $89B9: C-----  D5 BE    CMP  $BE,X
  0x04A9CB $89BB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04A9CC $89BC: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04A9CD $89BD: C-----  50 A0    BVC  $895F
  0x04A9CF $89BF: C-----  40       RTI  
  0x04A9D0 $89C0: C-----  00       BRK  
  0x04A9D1 $89C1: C-----  00       BRK  
  0x04A9D2 $89C2: C-----  00       BRK  
  0x04A9D3 $89C3: C-----  00       BRK  
  0x04A9D4 $89C4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04A9D5 $89C5: C-----  0E 1E 3F ASL  $3F1E
  0x04A9D8 $89C8: C-----  00       BRK  
  0x04A9D9 $89C9: C-----  00       BRK  
  0x04A9DA $89CA: C-----  00       BRK  
  0x04A9DB $89CB: C-----  00       BRK  
  0x04A9DC $89CC: C-----  00       BRK  
  0x04A9DD $89CD: C-----  01 0D    ORA  ($0D,X)
  0x04A9DF $89CF: C-----  1E 14 24 ASL  $2414,X
  0x04A9E2 $89D2: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x04A9E3 $89D3: C-----  A6 05    LDX  $05
  0x04A9E5 $89D5: C-----  56 6B    LSR  $6B,X
  0x04A9E7 $89D7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04A9E8 $89D8: C-----  08       PHP  
  0x04A9E9 $89D9: C-----  18       CLC  
  0x04A9EA $89DA: C-----  18       CLC  
  0x04A9EB $89DB: C-----  58       CLI  
  0x04A9EC $89DC: C-----  F8       SED  
  0x04A9ED $89DD: C-----  A8       TAY  
  0x04A9EE $89DE: C-----  94 C0    STY  $C0,X
  0x04A9F0 $89E0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04A9F1 $89E1: C-----  AA       TAX  
  0x04A9F2 $89E2: C-----  56 EC    LSR  $EC,X
  0x04A9F4 $89E4: C-----  18       CLC  
  0x04A9F5 $89E5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04A9F6 $89E6: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04A9F7 $89E7: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04A9F8 $89E8: C-----  F8       SED  
  0x04A9F9 $89E9: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04A9FA $89EA: C-----  A8       TAY  
  0x04A9FB $89EB: C-----  10 00    BPL  $89ED
  0x04A9FD $89ED: C-----  00       BRK  
  0x04A9FE $89EE: C-----  00       BRK  
  0x04A9FF $89EF: C-----  00       BRK  
  0x04AA00 $89F0: C-----  00       BRK  
  0x04AA01 $89F1: C-----  00       BRK  
  0x04AA02 $89F2: C-----  00       BRK  
  0x04AA03 $89F3: C-----  01 02    ORA  ($02,X)
  0x04AA05 $89F5: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04AA06 $89F6: C-----  08       PHP  
  0x04AA07 $89F7: C-----  31 00    AND  ($00),Y
  0x04AA09 $89F9: C-----  00       BRK  
  0x04AA0A $89FA: C-----  00       BRK  
  0x04AA0B $89FB: C-----  00       BRK  
  0x04AA0C $89FC: C-----  01 03    ORA  ($03,X)
  0x04AA0E $89FE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04AA0F $89FF: C-----  0E F8 F0 ASL  $F0F8
  0x04AA12 $8A02: C-----  F0 60    BEQ  $8A64
  0x04AA14 $8A04: C-----  00       BRK  
  0x04AA15 $8A05: C-----  00       BRK  
  0x04AA16 $8A06: C-----  00       BRK  
  0x04AA17 $8A07: C-----  00       BRK  
  0x04AA18 $8A08: C-----  00       BRK  
  0x04AA19 $8A09: C-----  00       BRK  
  0x04AA1A $8A0A: C-----  00       BRK  
  0x04AA1B $8A0B: C-----  00       BRK  
  0x04AA1C $8A0C: C-----  00       BRK  
  0x04AA1D $8A0D: C-----  00       BRK  
  0x04AA1E $8A0E: C-----  00       BRK  
  0x04AA1F $8A0F: C-----  00       BRK  
  0x04AA20 $8A10: C-----  40       RTI  
  0x04AA21 $8A11: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AA22 $8A12: C-----  00       BRK  
  0x04AA23 $8A13: C-----  00       BRK  
  0x04AA24 $8A14: C-----  00       BRK  
  0x04AA25 $8A15: C-----  00       BRK  
  0x04AA26 $8A16: C-----  00       BRK  
  0x04AA27 $8A17: C-----  00       BRK  
  0x04AA28 $8A18: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AA29 $8A19: C-----  00       BRK  
  0x04AA2A $8A1A: C-----  00       BRK  
  0x04AA2B $8A1B: C-----  00       BRK  
  0x04AA2C $8A1C: C-----  00       BRK  
  0x04AA2D $8A1D: C-----  00       BRK  
  0x04AA2E $8A1E: C-----  00       BRK  
  0x04AA2F $8A1F: C-----  00       BRK  
  0x04AA30 $8A20: C-----  11 10    ORA  ($10),Y
  0x04AA32 $8A22: C-----  21 22    AND  ($22,X)
  0x04AA34 $8A24: C-----  !!UNDEF $72  ; unknown opcode, treating as data
  0x04AA35 $8A25: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04AA36 $8A26: C-----  D8       CLD  
  0x04AA37 $8A27: C-----  98       TYA  
  0x04AA38 $8A28: C-----  00       BRK  
  0x04AA39 $8A29: C-----  00       BRK  
  0x04AA3A $8A2A: C-----  00       BRK  
  0x04AA3B $8A2B: C-----  00       BRK  
  0x04AA3C $8A2C: C-----  00       BRK  
  0x04AA3D $8A2D: C-----  00       BRK  
  0x04AA3E $8A2E: C-----  20 60 00 JSR  $0060
  0x04AA41 $8A31: C-----  00       BRK  
  0x04AA42 $8A32: C-----  01 06    ORA  ($06,X)
  0x04AA44 $8A34: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04AA45 $8A35: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04AA46 $8A36: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x04AA47 $8A37: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04AA48 $8A38: C-----  00       BRK  
  0x04AA49 $8A39: C-----  00       BRK  
  0x04AA4A $8A3A: C-----  00       BRK  
  0x04AA4B $8A3B: C-----  00       BRK  
  0x04AA4C $8A3C: C-----  00       BRK  
  0x04AA4D $8A3D: C-----  08       PHP  
  0x04AA4E $8A3E: C-----  08       PHP  
  0x04AA4F $8A3F: C-----  28       PLP  
  0x04AA50 $8A40: C-----  10 20    BPL  $8A62
  0x04AA52 $8A42: C-----  C0 00    CPY  #$00
  0x04AA54 $8A44: C-----  00       BRK  
  0x04AA55 $8A45: C-----  00       BRK  
  0x04AA56 $8A46: C-----  00       BRK  
  0x04AA57 $8A47: C-----  29 0F    AND  #$0F
  0x04AA59 $8A49: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04AA5A $8A4A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04AA5B $8A4B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04AA5C $8A4C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04AA5D $8A4D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04AA5E $8A4E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04AA5F $8A4F: C-----  D6 F8    DEC  $F8,X
  0x04AA61 $8A51: C-----  C1 02    CMP  ($02,X)
  0x04AA63 $8A53: C-----  00       BRK  
  0x04AA64 $8A54: C-----  00       BRK  
  0x04AA65 $8A55: C-----  00       BRK  
  0x04AA66 $8A56: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04AA67 $8A57: C-----  05 07    ORA  $07
  0x04AA69 $8A59: C-----  3E FD FF ROL  $FFFD,X
  0x04AA6C $8A5C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04AA6D $8A5D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04AA6E $8A5E: C-----  FD FA 56 SBC  $56FA,X
  0x04AA71 $8A61: C-----  B8       CLV  
  0x04AA72 $8A62: C-----  60       RTS  
  0x04AA73 $8A63: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AA74 $8A64: C-----  00       BRK  
  0x04AA75 $8A65: C-----  00       BRK  
  0x04AA76 $8A66: C-----  00       BRK  
  0x04AA77 $8A67: C-----  00       BRK  
  0x04AA78 $8A68: C-----  A8       TAY  
  0x04AA79 $8A69: C-----  40       RTI  
  0x04AA7A $8A6A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AA7B $8A6B: C-----  00       BRK  
  0x04AA7C $8A6C: C-----  00       BRK  
  0x04AA7D $8A6D: C-----  00       BRK  
  0x04AA7E $8A6E: C-----  00       BRK  
  0x04AA7F $8A6F: C-----  00       BRK  
  0x04AA80 $8A70: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04AA81 $8A71: C-----  15 2E    ORA  $2E,X
  0x04AA83 $8A73: C-----  58       CLI  
  0x04AA84 $8A74: C-----  A0 40    LDY  #$40
  0x04AA86 $8A76: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AA87 $8A77: C-----  00       BRK  
  0x04AA88 $8A78: C-----  FD EA D0 SBC  $D0EA,X
  0x04AA8B $8A7B: C-----  A0 40    LDY  #$40
  0x04AA8D $8A7D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AA8E $8A7E: C-----  00       BRK  
  0x04AA8F $8A7F: C-----  00       BRK  
  0x04AA90 $8A80: C-----  15 2A    ORA  $2A,X
  0x04AA92 $8A82: C-----  41 00    EOR  ($00,X)
  0x04AA94 $8A84: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04AA95 $8A85: C-----  AC 50 A0 LDY  $A050
  0x04AA98 $8A88: C-----  00       BRK  
  0x04AA99 $8A89: C-----  00       BRK  
  0x04AA9A $8A8A: C-----  00       BRK  
  0x04AA9B $8A8B: C-----  00       BRK  
  0x04AA9C $8A8C: C-----  00       BRK  
  0x04AA9D $8A8D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04AA9E $8A8E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04AA9F $8A8F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04AAA0 $8A90: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04AAA1 $8A91: C-----  AA       TAX  
  0x04AAA2 $8A92: C-----  56 EC    LSR  $EC,X
  0x04AAA4 $8A94: C-----  18       CLC  
  0x04AAA5 $8A95: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04AAA6 $8A96: C-----  06 8A    ASL  $8A
  0x04AAA8 $8A98: C-----  00       BRK  
  0x04AAA9 $8A99: C-----  00       BRK  
  0x04AAAA $8A9A: C-----  00       BRK  
  0x04AAAB $8A9B: C-----  00       BRK  
  0x04AAAC $8A9C: C-----  E0 F8    CPX  #$F8
  0x04AAAE $8A9E: C-----  F8       SED  
  0x04AAAF $8A9F: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x04AAB0 $8AA0: C-----  41 82    EOR  ($82,X)
  0x04AAB2 $8AA2: C-----  06 04    ASL  $04
  0x04AAB4 $8AA4: C-----  08       PHP  
  0x04AAB5 $8AA5: C-----  18       CLC  
  0x04AAB6 $8AA6: C-----  A8       TAY  
  0x04AAB7 $8AA7: C-----  50 BE    BVC  $8A67
  0x04AAB9 $8AA9: C-----  7D F9 FB ADC  $FBF9,X
  0x04AABC $8AAC: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04AABD $8AAD: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04AABE $8AAE: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04AABF $8AAF: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04AAC0 $8AB0: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x04AAC1 $8AB1: C-----  0A       ASL  A
  0x04AAC2 $8AB2: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04AAC3 $8AB3: C-----  2C 58 28 BIT  $2858
  0x04AAC6 $8AB6: C-----  50 A0    BVC  $8A58
  0x04AAC8 $8AB8: C-----  EC F4 E8 CPX  $E8F4
  0x04AACB $8ABB: C-----  D0 A0    BNE  $8A5D
  0x04AACD $8ABD: C-----  D0 A0    BNE  $8A5F
  0x04AACF $8ABF: C-----  40       RTI  
  0x04AAD0 $8AC0: C-----  F1 10    SBC  ($10),Y
  0x04AAD2 $8AC2: C-----  21 22    AND  ($22,X)
  0x04AAD4 $8AC4: C-----  25 23    AND  $23
  0x04AAD6 $8AC6: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x04AAD7 $8AC7: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x04AAD8 $8AC8: C-----  0E 0F 1E ASL  $1E0F
  0x04AADB $8ACB: C-----  1D 1A 1C ORA  $1C1A,X
  0x04AADE $8ACE: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x04AADF $8ACF: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04AAE0 $8AD0: C-----  60       RTS  
  0x04AAE1 $8AD1: C-----  C0 80    CPY  #$80
  0x04AAE3 $8AD3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AAE4 $8AD4: C-----  00       BRK  
  0x04AAE5 $8AD5: C-----  00       BRK  
  0x04AAE6 $8AD6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AAE7 $8AD7: C-----  40       RTI  
  0x04AAE8 $8AD8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AAE9 $8AD9: C-----  00       BRK  
  0x04AAEA $8ADA: C-----  00       BRK  
  0x04AAEB $8ADB: C-----  00       BRK  
  0x04AAEC $8ADC: C-----  00       BRK  
  0x04AAED $8ADD: C-----  00       BRK  
  0x04AAEE $8ADE: C-----  00       BRK  
  0x04AAEF $8ADF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AAF0 $8AE0: C-----  ED C6 B1 SBC  $B1C6
  0x04AAF3 $8AE3: C-----  CE 70 00 DEC  $0070
  0x04AAF6 $8AE6: C-----  00       BRK  
  0x04AAF7 $8AE7: C-----  00       BRK  
  0x04AAF8 $8AE8: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x04AAF9 $8AE9: C-----  39 4E 30 AND  $304E,Y
  0x04AAFC $8AEC: C-----  00       BRK  
  0x04AAFD $8AED: C-----  00       BRK  
  0x04AAFE $8AEE: C-----  00       BRK  
  0x04AAFF $8AEF: C-----  00       BRK  
  0x04AB00 $8AF0: C-----  40       RTI  
  0x04AB01 $8AF1: C-----  C0 80    CPY  #$80
  0x04AB03 $8AF3: C-----  00       BRK  
  0x04AB04 $8AF4: C-----  00       BRK  
  0x04AB05 $8AF5: C-----  00       BRK  
  0x04AB06 $8AF6: C-----  00       BRK  
  0x04AB07 $8AF7: C-----  00       BRK  
  0x04AB08 $8AF8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AB09 $8AF9: C-----  00       BRK  
  0x04AB0A $8AFA: C-----  00       BRK  
  0x04AB0B $8AFB: C-----  00       BRK  
  0x04AB0C $8AFC: C-----  00       BRK  
  0x04AB0D $8AFD: C-----  00       BRK  
  0x04AB0E $8AFE: C-----  00       BRK  
  0x04AB0F $8AFF: C-----  00       BRK  
  0x04AB10 $8B00: C-----  F1 10    SBC  ($10),Y
  0x04AB12 $8B02: C-----  21 22    AND  ($22,X)
  0x04AB14 $8B04: C-----  25 23    AND  $23
  0x04AB16 $8B06: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x04AB17 $8B07: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x04AB18 $8B08: C-----  0E 0F 1E ASL  $1E0F
  0x04AB1B $8B0B: C-----  1D 1A 1C ORA  $1C1A,X
  0x04AB1E $8B0E: C-----  20 00 60 JSR  $6000
  0x04AB21 $8B11: C-----  C0 80    CPY  #$80
  0x04AB23 $8B13: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AB24 $8B14: C-----  00       BRK  
  0x04AB25 $8B15: C-----  00       BRK  
  0x04AB26 $8B16: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AB27 $8B17: C-----  40       RTI  
  0x04AB28 $8B18: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AB29 $8B19: C-----  00       BRK  
  0x04AB2A $8B1A: C-----  00       BRK  
  0x04AB2B $8B1B: C-----  00       BRK  
  0x04AB2C $8B1C: C-----  00       BRK  
  0x04AB2D $8B1D: C-----  00       BRK  
  0x04AB2E $8B1E: C-----  00       BRK  
  0x04AB2F $8B1F: C-----  00       BRK  
  0x04AB30 $8B20: C-----  00       BRK  
  0x04AB31 $8B21: C-----  00       BRK  
  0x04AB32 $8B22: C-----  00       BRK  
  0x04AB33 $8B23: C-----  00       BRK  
  0x04AB34 $8B24: C-----  00       BRK  
  0x04AB35 $8B25: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04AB36 $8B26: C-----  01 00    ORA  ($00,X)
  0x04AB38 $8B28: C-----  00       BRK  
  0x04AB39 $8B29: C-----  00       BRK  
  0x04AB3A $8B2A: C-----  00       BRK  
  0x04AB3B $8B2B: C-----  00       BRK  
  0x04AB3C $8B2C: C-----  00       BRK  
  0x04AB3D $8B2D: C-----  00       BRK  
  0x04AB3E $8B2E: C-----  00       BRK  
  0x04AB3F $8B2F: C-----  00       BRK  
  0x04AB40 $8B30: C-----  00       BRK  
  0x04AB41 $8B31: C-----  0E E5 38 ASL  $38E5
  0x04AB44 $8B34: C-----  C0 00    CPY  #$00
  0x04AB46 $8B36: C-----  00       BRK  
  0x04AB47 $8B37: C-----  81 00    STA  ($00,X)
  0x04AB49 $8B39: C-----  00       BRK  
  0x04AB4A $8B3A: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04AB4B $8B3B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04AB4C $8B3C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04AB4D $8B3D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04AB4E $8B3E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04AB4F $8B3F: C-----  7E 11 21 ROR  $2111,X
  0x04AB52 $8B42: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04AB53 $8B43: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04AB54 $8B44: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04AB55 $8B45: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AB56 $8B46: C-----  00       BRK  
  0x04AB57 $8B47: C-----  08       PHP  
  0x04AB58 $8B48: C-----  0E 1E 0D ASL  $0D1E
  0x04AB5B $8B4B: C-----  01 00    ORA  ($00,X)
  0x04AB5D $8B4D: C-----  00       BRK  
  0x04AB5E $8B4E: C-----  00       BRK  
  0x04AB5F $8B4F: C-----  00       BRK  
  0x04AB60 $8B50: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04AB61 $8B51: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04AB62 $8B52: C-----  E4 C0    CPX  $C0
  0x04AB64 $8B54: C-----  F0 1E    BEQ  $8B74
  0x04AB66 $8B56: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04AB67 $8B57: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04AB68 $8B58: C-----  E5 6B    SBC  $6B
  0x04AB6A $8B5A: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x04AB6B $8B5B: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04AB6C $8B5C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04AB6D $8B5D: C-----  01 03    ORA  ($03,X)
  0x04AB6F $8B5F: C-----  00       BRK  
  0x04AB70 $8B60: C-----  00       BRK  
  0x04AB71 $8B61: C-----  10 C8    BPL  $8B2B
  0x04AB73 $8B63: C-----  38       SEC  
  0x04AB74 $8B64: C-----  08       PHP  
  0x04AB75 $8B65: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x04AB76 $8B66: C-----  F5 FF    SBC  $FF,X
  0x04AB78 $8B68: C-----  00       BRK  
  0x04AB79 $8B69: C-----  00       BRK  
  0x04AB7A $8B6A: C-----  00       BRK  
  0x04AB7B $8B6B: C-----  C0 F0    CPY  #$F0
  0x04AB7D $8B6D: C-----  98       TYA  
  0x04AB7E $8B6E: C-----  68       PLA  
  0x04AB7F $8B6F: C-----  C0 00    CPY  #$00
  0x04AB81 $8B71: C-----  00       BRK  
  0x04AB82 $8B72: C-----  20 D4 34 JSR  $34D4
  0x04AB85 $8B75: C-----  08       PHP  
  0x04AB86 $8B76: C-----  E9 FF    SBC  #$FF
  0x04AB88 $8B78: C-----  00       BRK  
  0x04AB89 $8B79: C-----  00       BRK  
  0x04AB8A $8B7A: C-----  00       BRK  
  0x04AB8B $8B7B: C-----  00       BRK  
  0x04AB8C $8B7C: C-----  C0 F0    CPY  #$F0
  0x04AB8E $8B7E: C-----  10 E0    BPL  $8B60
  0x04AB90 $8B80: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04AB91 $8B81: C-----  !!UNDEF $43  ; unknown opcode, treating as data
  0x04AB92 $8B82: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04AB93 $8B83: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04AB94 $8B84: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04AB95 $8B85: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AB96 $8B86: C-----  00       BRK  
  0x04AB97 $8B87: C-----  08       PHP  
  0x04AB98 $8B88: C-----  7D 3D 3D ADC  $3D3D,X
  0x04AB9B $8B8B: C-----  01 00    ORA  ($00,X)
  0x04AB9D $8B8D: C-----  00       BRK  
  0x04AB9E $8B8E: C-----  00       BRK  
  0x04AB9F $8B8F: C-----  00       BRK  
  0x04ABA0 $8B90: C-----  FE F4 E4 INC  $E4F4,X
  0x04ABA3 $8B93: C-----  C0 F0    CPY  #$F0
  0x04ABA5 $8B95: C-----  1E 04 0B ASL  $0B04,X
  0x04ABA8 $8B98: C-----  F1 6B    SBC  ($6B),Y
  0x04ABAA $8B9A: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x04ABAB $8B9B: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04ABAC $8B9C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04ABAD $8B9D: C-----  01 03    ORA  ($03,X)
  0x04ABAF $8B9F: C-----  00       BRK  
  0x04ABB0 $8BA0: C-----  00       BRK  
  0x04ABB1 $8BA1: C-----  00       BRK  
  0x04ABB2 $8BA2: C-----  00       BRK  
  0x04ABB3 $8BA3: C-----  3E 63 80 ROL  $8063,X
  0x04ABB6 $8BA6: C-----  00       BRK  
  0x04ABB7 $8BA7: C-----  08       PHP  
  0x04ABB8 $8BA8: C-----  00       BRK  
  0x04ABB9 $8BA9: C-----  00       BRK  
  0x04ABBA $8BAA: C-----  00       BRK  
  0x04ABBB $8BAB: C-----  00       BRK  
  0x04ABBC $8BAC: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04ABBD $8BAD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04ABBE $8BAE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04ABBF $8BAF: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04ABC0 $8BB0: C-----  00       BRK  
  0x04ABC1 $8BB1: C-----  00       BRK  
  0x04ABC2 $8BB2: C-----  00       BRK  
  0x04ABC3 $8BB3: C-----  00       BRK  
  0x04ABC4 $8BB4: C-----  F0 1C    BEQ  $8BD2
  0x04ABC6 $8BB6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04ABC7 $8BB7: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04ABC8 $8BB8: C-----  00       BRK  
  0x04ABC9 $8BB9: C-----  00       BRK  
  0x04ABCA $8BBA: C-----  00       BRK  
  0x04ABCB $8BBB: C-----  00       BRK  
  0x04ABCC $8BBC: C-----  00       BRK  
  0x04ABCD $8BBD: C-----  E0 F8    CPX  #$F8
  0x04ABCF $8BBF: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04ABD0 $8BC0: C-----  00       BRK  
  0x04ABD1 $8BC1: C-----  01 06    ORA  ($06,X)
  0x04ABD3 $8BC3: C-----  08       PHP  
  0x04ABD4 $8BC4: C-----  08       PHP  
  0x04ABD5 $8BC5: C-----  11 11    ORA  ($11),Y
  0x04ABD7 $8BC7: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04ABD8 $8BC8: C-----  00       BRK  
  0x04ABD9 $8BC9: C-----  00       BRK  
  0x04ABDA $8BCA: C-----  01 07    ORA  ($07,X)
  0x04ABDC $8BCC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04ABDD $8BCD: C-----  0E 0E 0C ASL  $0C0E
  0x04ABE0 $8BD0: C-----  00       BRK  
  0x04ABE1 $8BD1: C-----  98       TYA  
  0x04ABE2 $8BD2: C-----  E4 42    CPX  $42
  0x04ABE4 $8BD4: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04ABE5 $8BD5: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04ABE6 $8BD6: C-----  FD FF 00 SBC  $00FF,X
  0x04ABE9 $8BD9: C-----  00       BRK  
  0x04ABEA $8BDA: C-----  18       CLC  
  0x04ABEB $8BDB: C-----  BC 7C 04 LDY  $047C,X
  0x04ABEE $8BDE: C-----  60       RTS  
  0x04ABEF $8BDF: C-----  C0 13    CPY  #$13
  0x04ABF1 $8BE1: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04ABF2 $8BE2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04ABF3 $8BE3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04ABF4 $8BE4: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04ABF5 $8BE5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04ABF6 $8BE6: C-----  00       BRK  
  0x04ABF7 $8BE7: C-----  08       PHP  
  0x04ABF8 $8BE8: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04ABF9 $8BE9: C-----  05 01    ORA  $01
  0x04ABFB $8BEB: C-----  01 00    ORA  ($00,X)
  0x04ABFD $8BED: C-----  00       BRK  
  0x04ABFE $8BEE: C-----  00       BRK  
  0x04ABFF $8BEF: C-----  00       BRK  
  0x04AC00 $8BF0: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04AC01 $8BF1: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04AC02 $8BF2: C-----  E4 C0    CPX  $C0
  0x04AC04 $8BF4: C-----  F0 1E    BEQ  $8C14
  0x04AC06 $8BF6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04AC07 $8BF7: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04AC08 $8BF8: C-----  F5 6B    SBC  $6B,X
  0x04AC0A $8BFA: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x04AC0B $8BFB: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04AC0C $8BFC: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04AC0D $8BFD: C-----  01 03    ORA  ($03,X)
  0x04AC0F $8BFF: C-----  00       BRK  
  0x04AC10 $8C00: ------  .byte $00
  0x04AC11 $8C01: ------  .byte $00
  0x04AC12 $8C02: ------  .byte $00
  0x04AC13 $8C03: ------  .byte $00
  0x04AC14 $8C04: ------  .byte $00
  0x04AC15 $8C05: ------  .byte $00
  0x04AC16 $8C06: ------  .byte $00
  0x04AC17 $8C07: ------  .byte $00
  0x04AC18 $8C08: ------  .byte $00
  0x04AC19 $8C09: ------  .byte $00
  0x04AC1A $8C0A: ------  .byte $00
  0x04AC1B $8C0B: ------  .byte $00
  0x04AC1C $8C0C: ------  .byte $00
  0x04AC1D $8C0D: ------  .byte $00
  0x04AC1E $8C0E: ------  .byte $00
  0x04AC1F $8C0F: ------  .byte $00
  0x04AC20 $8C10: ------  .byte $FF
  0x04AC21 $8C11: ------  .byte $FF
  0x04AC22 $8C12: ------  .byte $FF
  0x04AC23 $8C13: ------  .byte $FF
  0x04AC24 $8C14: ------  .byte $FF
  0x04AC25 $8C15: ------  .byte $FF
  0x04AC26 $8C16: ------  .byte $FF
  0x04AC27 $8C17: ------  .byte $FF
  0x04AC28 $8C18: ------  .byte $00
  0x04AC29 $8C19: ------  .byte $00
  0x04AC2A $8C1A: ------  .byte $00
  0x04AC2B $8C1B: ------  .byte $00
  0x04AC2C $8C1C: ------  .byte $00
  0x04AC2D $8C1D: ------  .byte $00
  0x04AC2E $8C1E: ------  .byte $00
  0x04AC2F $8C1F: ------  .byte $00
  0x04AC30 $8C20: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04AC31 $8C21: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04AC32 $8C22: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04AC33 $8C23: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04AC34 $8C24: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04AC35 $8C25: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AC36 $8C26: C-----  00       BRK  
  0x04AC37 $8C27: C-----  08       PHP  
  0x04AC38 $8C28: C-----  00       BRK  
  0x04AC39 $8C29: C-----  01 01    ORA  ($01,X)
  0x04AC3B $8C2B: C-----  01 00    ORA  ($00,X)
  0x04AC3D $8C2D: C-----  00       BRK  
  0x04AC3E $8C2E: C-----  00       BRK  
  0x04AC3F $8C2F: C-----  00       BRK  
  0x04AC40 $8C30: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04AC41 $8C31: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04AC42 $8C32: C-----  E4 C0    CPX  $C0
  0x04AC44 $8C34: C-----  F0 1E    BEQ  $8C54
  0x04AC46 $8C36: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04AC47 $8C37: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04AC48 $8C38: C-----  E5 EB    SBC  $EB
  0x04AC4A $8C3A: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x04AC4B $8C3B: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04AC4C $8C3C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04AC4D $8C3D: C-----  01 03    ORA  ($03,X)
  0x04AC4F $8C3F: C-----  00       BRK  
  0x04AC50 $8C40: C-----  00       BRK  
  0x04AC51 $8C41: C-----  00       BRK  
  0x04AC52 $8C42: C-----  00       BRK  
  0x04AC53 $8C43: C-----  00       BRK  
  0x04AC54 $8C44: C-----  00       BRK  
  0x04AC55 $8C45: C-----  01 03    ORA  ($03,X)
  0x04AC57 $8C47: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04AC58 $8C48: C-----  00       BRK  
  0x04AC59 $8C49: C-----  00       BRK  
  0x04AC5A $8C4A: C-----  00       BRK  
  0x04AC5B $8C4B: C-----  00       BRK  
  0x04AC5C $8C4C: C-----  00       BRK  
  0x04AC5D $8C4D: C-----  00       BRK  
  0x04AC5E $8C4E: C-----  00       BRK  
  0x04AC5F $8C4F: C-----  01 00    ORA  ($00,X)
  0x04AC61 $8C51: C-----  00       BRK  
  0x04AC62 $8C52: C-----  00       BRK  
  0x04AC63 $8C53: C-----  00       BRK  
  0x04AC64 $8C54: C-----  00       BRK  
  0x04AC65 $8C55: C-----  F0 F9    BEQ  $8C50
  0x04AC67 $8C57: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04AC68 $8C58: C-----  00       BRK  
  0x04AC69 $8C59: C-----  00       BRK  
  0x04AC6A $8C5A: C-----  00       BRK  
  0x04AC6B $8C5B: C-----  00       BRK  
  0x04AC6C $8C5C: C-----  00       BRK  
  0x04AC6D $8C5D: C-----  00       BRK  
  0x04AC6E $8C5E: C-----  40       RTI  
  0x04AC6F $8C5F: C-----  E0 00    CPX  #$00
  0x04AC71 $8C61: C-----  00       BRK  
  0x04AC72 $8C62: C-----  00       BRK  
  0x04AC73 $8C63: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04AC74 $8C64: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04AC75 $8C65: C-----  09 0B    ORA  #$0B
  0x04AC77 $8C67: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04AC78 $8C68: C-----  00       BRK  
  0x04AC79 $8C69: C-----  00       BRK  
  0x04AC7A $8C6A: C-----  00       BRK  
  0x04AC7B $8C6B: C-----  00       BRK  
  0x04AC7C $8C6C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04AC7D $8C6D: C-----  06 05    ASL  $05
  0x04AC7F $8C6F: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04AC80 $8C70: C-----  00       BRK  
  0x04AC81 $8C71: C-----  00       BRK  
  0x04AC82 $8C72: C-----  00       BRK  
  0x04AC83 $8C73: C-----  F0 08    BEQ  $8C7D
  0x04AC85 $8C75: C-----  !!UNDEF $64  ; unknown opcode, treating as data
  0x04AC86 $8C76: C-----  F5 FF    SBC  $FF,X
  0x04AC88 $8C78: C-----  00       BRK  
  0x04AC89 $8C79: C-----  00       BRK  
  0x04AC8A $8C7A: C-----  00       BRK  
  0x04AC8B $8C7B: C-----  00       BRK  
  0x04AC8C $8C7C: C-----  F0 98    BEQ  $8C16
  0x04AC8E $8C7E: C-----  68       PLA  
  0x04AC8F $8C7F: C-----  D0 00    BNE  $8C81
  0x04AC91 $8C81: C-----  00       BRK  
  0x04AC92 $8C82: C-----  00       BRK  
  0x04AC93 $8C83: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04AC94 $8C84: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04AC95 $8C85: C-----  09 0B    ORA  #$0B
  0x04AC97 $8C87: C-----  09 00    ORA  #$00
  0x04AC99 $8C89: C-----  00       BRK  
  0x04AC9A $8C8A: C-----  00       BRK  
  0x04AC9B $8C8B: C-----  00       BRK  
  0x04AC9C $8C8C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04AC9D $8C8D: C-----  06 05    ASL  $05
  0x04AC9F $8C8F: C-----  06 00    ASL  $00
  0x04ACA1 $8C91: C-----  00       BRK  
  0x04ACA2 $8C92: C-----  00       BRK  
  0x04ACA3 $8C93: C-----  F1 0E    SBC  ($0E),Y
  0x04ACA5 $8C95: C-----  !!UNDEF $62  ; unknown opcode, treating as data
  0x04ACA6 $8C96: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04ACA7 $8C97: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04ACA8 $8C98: C-----  00       BRK  
  0x04ACA9 $8C99: C-----  00       BRK  
  0x04ACAA $8C9A: C-----  00       BRK  
  0x04ACAB $8C9B: C-----  00       BRK  
  0x04ACAC $8C9C: C-----  F0 9C    BEQ  $8C3A
  0x04ACAE $8C9E: C-----  6C C8 09 JMP  ($09C8)
  0x04ACB1 $8CA1: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04ACB2 $8CA2: C-----  05 1F    ORA  $1F
  0x04ACB4 $8CA4: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04ACB5 $8CA5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04ACB6 $8CA6: C-----  00       BRK  
  0x04ACB7 $8CA7: C-----  08       PHP  
  0x04ACB8 $8CA8: C-----  06 05    ASL  $05
  0x04ACBA $8CAA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04ACBB $8CAB: C-----  01 00    ORA  ($00,X)
  0x04ACBD $8CAD: C-----  00       BRK  
  0x04ACBE $8CAE: C-----  00       BRK  
  0x04ACBF $8CAF: C-----  00       BRK  
  0x04ACC0 $8CB0: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04ACC1 $8CB1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04ACC2 $8CB2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04ACC3 $8CB3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04ACC4 $8CB4: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04ACC5 $8CB5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04ACC6 $8CB6: C-----  00       BRK  
  0x04ACC7 $8CB7: C-----  08       PHP  
  0x04ACC8 $8CB8: C-----  05 01    ORA  $01
  0x04ACCA $8CBA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04ACCB $8CBB: C-----  01 00    ORA  ($00,X)
  0x04ACCD $8CBD: C-----  00       BRK  
  0x04ACCE $8CBE: C-----  00       BRK  
  0x04ACCF $8CBF: C-----  00       BRK  
  0x04ACD0 $8CC0: C-----  00       BRK  
  0x04ACD1 $8CC1: C-----  00       BRK  
  0x04ACD2 $8CC2: C-----  00       BRK  
  0x04ACD3 $8CC3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04ACD4 $8CC4: C-----  39 7F 73 AND  $737F,Y
  0x04ACD7 $8CC7: C-----  A2 00    LDX  #$00
  0x04ACD9 $8CC9: C-----  00       BRK  
  0x04ACDA $8CCA: C-----  00       BRK  
  0x04ACDB $8CCB: C-----  00       BRK  
  0x04ACDC $8CCC: C-----  06 00    ASL  $00
  0x04ACDE $8CCE: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04ACDF $8CCF: C-----  5D 00 00 EOR  $0000,X
  0x04ACE2 $8CD2: C-----  00       BRK  
  0x04ACE3 $8CD3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04ACE4 $8CD4: C-----  60       RTS  
  0x04ACE5 $8CD5: C-----  F0 90    BEQ  $8C67
  0x04ACE7 $8CD7: C-----  88       DEY  
  0x04ACE8 $8CD8: C-----  00       BRK  
  0x04ACE9 $8CD9: C-----  00       BRK  
  0x04ACEA $8CDA: C-----  00       BRK  
  0x04ACEB $8CDB: C-----  00       BRK  
  0x04ACEC $8CDC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04ACED $8CDD: C-----  00       BRK  
  0x04ACEE $8CDE: C-----  60       RTS  
  0x04ACEF $8CDF: C-----  70 94    BVS  $8C75
  0x04ACF1 $8CE1: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x04ACF2 $8CE2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04ACF3 $8CE3: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04ACF4 $8CE4: C-----  48       PHA  
  0x04ACF5 $8CE5: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x04ACF6 $8CE6: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04ACF7 $8CE7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04ACF8 $8CE8: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x04ACF9 $8CE9: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04ACFA $8CEA: C-----  00       BRK  
  0x04ACFB $8CEB: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x04ACFC $8CEC: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04ACFD $8CED: C-----  38       SEC  
  0x04ACFE $8CEE: C-----  08       PHP  
  0x04ACFF $8CEF: C-----  00       BRK  
  0x04AD00 $8CF0: C-----  58       CLI  
  0x04AD01 $8CF1: C-----  68       PLA  
  0x04AD02 $8CF2: C-----  F8       SED  
  0x04AD03 $8CF3: C-----  E8       INX  
  0x04AD04 $8CF4: C-----  D0 10    BNE  $8D06
  0x04AD06 $8CF6: C-----  60       RTS  
  0x04AD07 $8CF7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AD08 $8CF8: C-----  A0 90    LDY  #$90
  0x04AD0A $8CFA: C-----  00       BRK  
  0x04AD0B $8CFB: C-----  10 20    BPL  $8D1D
  0x04AD0D $8CFD: C-----  E0 80    CPX  #$80
  0x04AD0F $8CFF: C-----  00       BRK  
  0x04AD10 $8D00: C-----  00       BRK  
  0x04AD11 $8D01: C-----  00       BRK  
  0x04AD12 $8D02: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04AD13 $8D03: C-----  01 00    ORA  ($00,X)
  0x04AD15 $8D05: C-----  01 0F    ORA  ($0F,X)
  0x04AD17 $8D07: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04AD18 $8D08: C-----  00       BRK  
  0x04AD19 $8D09: C-----  00       BRK  
  0x04AD1A $8D0A: C-----  00       BRK  
  0x04AD1B $8D0B: C-----  00       BRK  
  0x04AD1C $8D0C: C-----  00       BRK  
  0x04AD1D $8D0D: C-----  00       BRK  
  0x04AD1E $8D0E: C-----  00       BRK  
  0x04AD1F $8D0F: C-----  00       BRK  
  0x04AD20 $8D10: C-----  00       BRK  
  0x04AD21 $8D11: C-----  00       BRK  
  0x04AD22 $8D12: C-----  00       BRK  
  0x04AD23 $8D13: C-----  00       BRK  
  0x04AD24 $8D14: C-----  00       BRK  
  0x04AD25 $8D15: C-----  00       BRK  
  0x04AD26 $8D16: C-----  00       BRK  
  0x04AD27 $8D17: C-----  00       BRK  
  0x04AD28 $8D18: C-----  00       BRK  
  0x04AD29 $8D19: C-----  00       BRK  
  0x04AD2A $8D1A: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04AD2B $8D1B: C-----  01 00    ORA  ($00,X)
  0x04AD2D $8D1D: C-----  01 0F    ORA  ($0F,X)
  0x04AD2F $8D1F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04AD30 $8D20: C-----  01 03    ORA  ($03,X)
  0x04AD32 $8D22: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04AD33 $8D23: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04AD34 $8D24: C-----  01 03    ORA  ($03,X)
  0x04AD36 $8D26: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04AD37 $8D27: C-----  00       BRK  
  0x04AD38 $8D28: C-----  00       BRK  
  0x04AD39 $8D29: C-----  00       BRK  
  0x04AD3A $8D2A: C-----  00       BRK  
  0x04AD3B $8D2B: C-----  00       BRK  
  0x04AD3C $8D2C: C-----  00       BRK  
  0x04AD3D $8D2D: C-----  00       BRK  
  0x04AD3E $8D2E: C-----  00       BRK  
  0x04AD3F $8D2F: C-----  00       BRK  
  0x04AD40 $8D30: C-----  00       BRK  
  0x04AD41 $8D31: C-----  00       BRK  
  0x04AD42 $8D32: C-----  00       BRK  
  0x04AD43 $8D33: C-----  00       BRK  
  0x04AD44 $8D34: C-----  00       BRK  
  0x04AD45 $8D35: C-----  00       BRK  
  0x04AD46 $8D36: C-----  00       BRK  
  0x04AD47 $8D37: C-----  00       BRK  
  0x04AD48 $8D38: C-----  01 03    ORA  ($03,X)
  0x04AD4A $8D3A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04AD4B $8D3B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04AD4C $8D3C: C-----  01 03    ORA  ($03,X)
  0x04AD4E $8D3E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04AD4F $8D3F: C-----  00       BRK  
  0x04AD50 $8D40: C-----  00       BRK  
  0x04AD51 $8D41: C-----  00       BRK  
  0x04AD52 $8D42: C-----  00       BRK  
  0x04AD53 $8D43: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04AD54 $8D44: C-----  39 7F 73 AND  $737F,Y
  0x04AD57 $8D47: C-----  A2 40    LDX  #$40
  0x04AD59 $8D49: C-----  20 30 F0 JSR  $F030
  0x04AD5C $8D4C: C-----  C6 80    DEC  $80
  0x04AD5E $8D4E: C-----  8C 5D 00 STY  $005D
  0x04AD61 $8D51: C-----  00       BRK  
  0x04AD62 $8D52: C-----  00       BRK  
  0x04AD63 $8D53: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AD64 $8D54: C-----  60       RTS  
  0x04AD65 $8D55: C-----  F0 90    BEQ  $8CE7
  0x04AD67 $8D57: C-----  88       DEY  
  0x04AD68 $8D58: C-----  00       BRK  
  0x04AD69 $8D59: C-----  00       BRK  
  0x04AD6A $8D5A: C-----  00       BRK  
  0x04AD6B $8D5B: C-----  01 86    ORA  ($86,X)
  0x04AD6D $8D5D: C-----  0E 6C 74 ASL  $746C
  0x04AD70 $8D60: C-----  94 9C    STY  $9C,X
  0x04AD72 $8D62: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04AD73 $8D63: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04AD74 $8D64: C-----  48       PHA  
  0x04AD75 $8D65: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x04AD76 $8D66: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04AD77 $8D67: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04AD78 $8D68: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x04AD79 $8D69: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04AD7A $8D6A: C-----  00       BRK  
  0x04AD7B $8D6B: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x04AD7C $8D6C: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04AD7D $8D6D: C-----  B8       CLV  
  0x04AD7E $8D6E: C-----  C8       INY  
  0x04AD7F $8D6F: C-----  00       BRK  
  0x04AD80 $8D70: C-----  58       CLI  
  0x04AD81 $8D71: C-----  68       PLA  
  0x04AD82 $8D72: C-----  F8       SED  
  0x04AD83 $8D73: C-----  E8       INX  
  0x04AD84 $8D74: C-----  D0 10    BNE  $8D86
  0x04AD86 $8D76: C-----  60       RTS  
  0x04AD87 $8D77: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AD88 $8D78: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x04AD89 $8D79: C-----  94 06    STY  $06,X
  0x04AD8B $8D7B: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04AD8C $8D7C: C-----  28       PLP  
  0x04AD8D $8D7D: C-----  EC 9E 7F CPX  $7F9E
  0x04AD90 $8D80: C-----  40       RTI  
  0x04AD91 $8D81: C-----  20 30 FF JSR  $FF30
  0x04AD94 $8D84: C-----  F9 FF F3 SBC  $F3FF,Y
  0x04AD97 $8D87: C-----  A2 00    LDX  #$00
  0x04AD99 $8D89: C-----  00       BRK  
  0x04AD9A $8D8A: C-----  00       BRK  
  0x04AD9B $8D8B: C-----  00       BRK  
  0x04AD9C $8D8C: C-----  06 00    ASL  $00
  0x04AD9E $8D8E: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04AD9F $8D8F: C-----  5D 00 00 EOR  $0000,X
  0x04ADA2 $8D92: C-----  00       BRK  
  0x04ADA3 $8D93: C-----  81 66    STA  ($66,X)
  0x04ADA5 $8D95: C-----  FE 9C 8C INC  $8C9C,X
  0x04ADA8 $8D98: C-----  00       BRK  
  0x04ADA9 $8D99: C-----  00       BRK  
  0x04ADAA $8D9A: C-----  00       BRK  
  0x04ADAB $8D9B: C-----  00       BRK  
  0x04ADAC $8D9C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04ADAD $8D9D: C-----  00       BRK  
  0x04ADAE $8D9E: C-----  60       RTS  
  0x04ADAF $8D9F: C-----  70 94    BVS  $8D35
  0x04ADB1 $8DA1: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x04ADB2 $8DA2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04ADB3 $8DA3: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04ADB4 $8DA4: C-----  C8       INY  
  0x04ADB5 $8DA5: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04ADB6 $8DA6: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04ADB7 $8DA7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04ADB8 $8DA8: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x04ADB9 $8DA9: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04ADBA $8DAA: C-----  00       BRK  
  0x04ADBB $8DAB: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x04ADBC $8DAC: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04ADBD $8DAD: C-----  38       SEC  
  0x04ADBE $8DAE: C-----  08       PHP  
  0x04ADBF $8DAF: C-----  00       BRK  
  0x04ADC0 $8DB0: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04ADC1 $8DB1: C-----  6C FE EF JMP  ($EFFE)
  0x04ADC4 $8DB4: C-----  D8       CLD  
  0x04ADC5 $8DB5: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04ADC6 $8DB6: C-----  7E FF A0 ROR  $A0FF,X
  0x04ADC9 $8DB9: C-----  90 00    BCC  $8DBB
  0x04ADCB $8DBB: C-----  10 20    BPL  $8DDD
  0x04ADCD $8DBD: C-----  E0 80    CPX  #$80
  0x04ADCF $8DBF: C-----  00       BRK  
  0x04ADD0 $8DC0: C-----  E0 E0    CPX  #$E0
  0x04ADD2 $8DC2: C-----  60       RTS  
  0x04ADD3 $8DC3: C-----  20 00 00 JSR  $0000
  0x04ADD6 $8DC6: C-----  00       BRK  
  0x04ADD7 $8DC7: C-----  00       BRK  
  0x04ADD8 $8DC8: C-----  00       BRK  
  0x04ADD9 $8DC9: C-----  00       BRK  
  0x04ADDA $8DCA: C-----  00       BRK  
  0x04ADDB $8DCB: C-----  00       BRK  
  0x04ADDC $8DCC: C-----  00       BRK  
  0x04ADDD $8DCD: C-----  00       BRK  
  0x04ADDE $8DCE: C-----  00       BRK  
  0x04ADDF $8DCF: C-----  00       BRK  
  0x04ADE0 $8DD0: C-----  00       BRK  
  0x04ADE1 $8DD1: C-----  00       BRK  
  0x04ADE2 $8DD2: C-----  00       BRK  
  0x04ADE3 $8DD3: C-----  00       BRK  
  0x04ADE4 $8DD4: C-----  00       BRK  
  0x04ADE5 $8DD5: C-----  00       BRK  
  0x04ADE6 $8DD6: C-----  00       BRK  
  0x04ADE7 $8DD7: C-----  00       BRK  
  0x04ADE8 $8DD8: C-----  E0 E0    CPX  #$E0
  0x04ADEA $8DDA: C-----  60       RTS  
  0x04ADEB $8DDB: C-----  20 00 00 JSR  $0000
  0x04ADEE $8DDE: C-----  00       BRK  
  0x04ADEF $8DDF: C-----  00       BRK  
  0x04ADF0 $8DE0: C-----  10 20    BPL  $8E02
  0x04ADF2 $8DE2: C-----  21 2B    AND  ($2B,X)
  0x04ADF4 $8DE4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04ADF5 $8DE5: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04ADF6 $8DE6: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04ADF7 $8DE7: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04ADF8 $8DE8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04ADF9 $8DE9: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04ADFA $8DEA: C-----  1E 15 0B ASL  $0B15,X
  0x04ADFD $8DED: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04ADFE $8DEE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04ADFF $8DEF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04AE00 $8DF0: C-----  C0 3C    CPY  #$3C
  0x04AE02 $8DF2: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x04AE03 $8DF3: C-----  E0 E8    CPX  #$E8
  0x04AE05 $8DF5: C-----  C8       INY  
  0x04AE06 $8DF6: C-----  C9 87    CMP  #$87
  0x04AE08 $8DF8: C-----  00       BRK  
  0x04AE09 $8DF9: C-----  C0 C0    CPY  #$C0
  0x04AE0B $8DFB: C-----  00       BRK  
  0x04AE0C $8DFC: C-----  40       RTI  
  0x04AE0D $8DFD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AE0E $8DFE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AE0F $8DFF: C-----  00       BRK  
  0x04AE10 $8E00: C-----  00       BRK  
  0x04AE11 $8E01: C-----  00       BRK  
  0x04AE12 $8E02: C-----  00       BRK  
  0x04AE13 $8E03: C-----  00       BRK  
  0x04AE14 $8E04: C-----  00       BRK  
  0x04AE15 $8E05: C-----  00       BRK  
  0x04AE16 $8E06: C-----  00       BRK  
  0x04AE17 $8E07: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04AE18 $8E08: C-----  00       BRK  
  0x04AE19 $8E09: C-----  00       BRK  
  0x04AE1A $8E0A: C-----  00       BRK  
  0x04AE1B $8E0B: C-----  00       BRK  
  0x04AE1C $8E0C: C-----  00       BRK  
  0x04AE1D $8E0D: C-----  00       BRK  
  0x04AE1E $8E0E: C-----  00       BRK  
  0x04AE1F $8E0F: C-----  00       BRK  
  0x04AE20 $8E10: C-----  10 08    BPL  $8E1A
  0x04AE22 $8E12: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04AE23 $8E13: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04AE24 $8E14: C-----  10 20    BPL  $8E36
  0x04AE26 $8E16: C-----  79 FD 00 ADC  $00FD,Y
  0x04AE29 $8E19: C-----  00       BRK  
  0x04AE2A $8E1A: C-----  00       BRK  
  0x04AE2B $8E1B: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04AE2C $8E1C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04AE2D $8E1D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04AE2E $8E1E: C-----  26 7A    ROL  $7A
  0x04AE30 $8E20: C-----  10 20    BPL  $8E42
  0x04AE32 $8E22: C-----  21 2B    AND  ($2B,X)
  0x04AE34 $8E24: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04AE35 $8E25: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04AE36 $8E26: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04AE37 $8E27: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04AE38 $8E28: C-----  00       BRK  
  0x04AE39 $8E29: C-----  00       BRK  
  0x04AE3A $8E2A: C-----  00       BRK  
  0x04AE3B $8E2B: C-----  01 0B    ORA  ($0B,X)
  0x04AE3D $8E2D: C-----  24 2F    BIT  $2F
  0x04AE3F $8E2F: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04AE40 $8E30: C-----  C0 3C    CPY  #$3C
  0x04AE42 $8E32: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x04AE43 $8E33: C-----  E0 E8    CPX  #$E8
  0x04AE45 $8E35: C-----  C8       INY  
  0x04AE46 $8E36: C-----  C9 87    CMP  #$87
  0x04AE48 $8E38: C-----  00       BRK  
  0x04AE49 $8E39: C-----  00       BRK  
  0x04AE4A $8E3A: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04AE4B $8E3B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04AE4C $8E3C: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04AE4D $8E3D: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04AE4E $8E3E: C-----  B6 78    LDX  $78,Y
  0x04AE50 $8E40: C-----  08       PHP  
  0x04AE51 $8E41: C-----  08       PHP  
  0x04AE52 $8E42: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x04AE53 $8E43: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x04AE54 $8E44: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04AE55 $8E45: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x04AE56 $8E46: C-----  7E FE 00 ROR  $00FE,X
  0x04AE59 $8E49: C-----  00       BRK  
  0x04AE5A $8E4A: C-----  08       PHP  
  0x04AE5B $8E4B: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04AE5C $8E4C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04AE5D $8E4D: C-----  C4 B8    CPY  $B8
  0x04AE5F $8E4F: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04AE60 $8E50: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04AE61 $8E51: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04AE62 $8E52: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04AE63 $8E53: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04AE64 $8E54: C-----  19 0A 06 ORA  $060A,Y
  0x04AE67 $8E57: C-----  01 39    ORA  ($39,X)
  0x04AE69 $8E59: C-----  31 38    AND  ($38),Y
  0x04AE6B $8E5B: C-----  11 06    ORA  ($06),Y
  0x04AE6D $8E5D: C-----  05 01    ORA  $01
  0x04AE6F $8E5F: C-----  00       BRK  
  0x04AE70 $8E60: C-----  00       BRK  
  0x04AE71 $8E61: C-----  00       BRK  
  0x04AE72 $8E62: C-----  00       BRK  
  0x04AE73 $8E63: C-----  C0 E0    CPY  #$E0
  0x04AE75 $8E65: C-----  F0 F0    BEQ  $8E57
  0x04AE77 $8E67: C-----  F0 00    BEQ  $8E69
  0x04AE79 $8E69: C-----  00       BRK  
  0x04AE7A $8E6A: C-----  00       BRK  
  0x04AE7B $8E6B: C-----  00       BRK  
  0x04AE7C $8E6C: C-----  40       RTI  
  0x04AE7D $8E6D: C-----  60       RTS  
  0x04AE7E $8E6E: C-----  E0 60    CPX  #$60
  0x04AE80 $8E70: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04AE81 $8E71: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04AE82 $8E72: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04AE83 $8E73: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04AE84 $8E74: C-----  1E 08 04 ASL  $0408,X
  0x04AE87 $8E77: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04AE88 $8E78: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04AE89 $8E79: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04AE8A $8E7A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04AE8B $8E7B: C-----  0E 01 07 ASL  $0701
  0x04AE8E $8E7E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04AE8F $8E7F: C-----  01 27    ORA  ($27,X)
  0x04AE91 $8E81: C-----  10 18    BPL  $8E9B
  0x04AE93 $8E83: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04AE94 $8E84: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04AE95 $8E85: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04AE96 $8E86: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04AE97 $8E87: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04AE98 $8E88: C-----  18       CLC  
  0x04AE99 $8E89: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04AE9A $8E8A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04AE9B $8E8B: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x04AE9C $8E8C: C-----  10 00    BPL  $8E8E
  0x04AE9E $8E8E: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04AE9F $8E8F: C-----  3E 02 02 ROL  $0202,X
  0x04AEA2 $8E92: C-----  06 0E    ASL  $0E
  0x04AEA4 $8E94: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04AEA5 $8E95: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04AEA6 $8E96: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04AEA7 $8E97: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04AEA8 $8E98: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04AEA9 $8E99: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04AEAA $8E9A: C-----  F8       SED  
  0x04AEAB $8E9B: C-----  F0 00    BEQ  $8E9D
  0x04AEAD $8E9D: C-----  00       BRK  
  0x04AEAE $8E9E: C-----  0E 1F FF ASL  $FF1F
  0x04AEB1 $8EA1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04AEB2 $8EA2: C-----  7E 31 11 ROR  $1131,X
  0x04AEB5 $8EA5: C-----  0A       ASL  A
  0x04AEB6 $8EA6: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04AEB7 $8EA7: C-----  3D 7F 7C AND  $7C7F,X
  0x04AEBA $8EAA: C-----  30 0E    BMI  $8EBA
  0x04AEBC $8EAC: C-----  0E 04 08 ASL  $0804
  0x04AEBF $8EAF: C-----  18       CLC  
  0x04AEC0 $8EB0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04AEC1 $8EB1: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04AEC2 $8EB2: C-----  1E 10 F0 ASL  $F010,X
  0x04AEC5 $8EB5: C-----  19 09 35 ORA  $3509,Y
  0x04AEC8 $8EB8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04AEC9 $8EB9: C-----  0E 01 0F ASL  $0F01
  0x04AECC $8EBC: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04AECD $8EBD: C-----  06 06    ASL  $06
  0x04AECF $8EBF: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04AED0 $8EC0: C-----  F0 70    BEQ  $8F32
  0x04AED2 $8EC2: C-----  F0 F0    BEQ  $8EB4
  0x04AED4 $8EC4: C-----  60       RTS  
  0x04AED5 $8EC5: C-----  00       BRK  
  0x04AED6 $8EC6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AED7 $8EC7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AED8 $8EC8: C-----  60       RTS  
  0x04AED9 $8EC9: C-----  20 60 60 JSR  $6060
  0x04AEDC $8ECC: C-----  00       BRK  
  0x04AEDD $8ECD: C-----  00       BRK  
  0x04AEDE $8ECE: C-----  00       BRK  
  0x04AEDF $8ECF: C-----  00       BRK  
  0x04AEE0 $8ED0: C-----  10 08    BPL  $8EDA
  0x04AEE2 $8ED2: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04AEE3 $8ED3: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04AEE4 $8ED4: C-----  10 20    BPL  $8EF6
  0x04AEE6 $8ED6: C-----  79 FD 0F ADC  $0FFD,Y
  0x04AEE9 $8ED9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04AEEA $8EDA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04AEEB $8EDB: C-----  00       BRK  
  0x04AEEC $8EDC: C-----  00       BRK  
  0x04AEED $8EDD: C-----  00       BRK  
  0x04AEEE $8EDE: C-----  20 78 80 JSR  $8078
  0x04AEF1 $8EE1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AEF2 $8EE2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AEF3 $8EE3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AEF4 $8EE4: C-----  C0 E0    CPY  #$E0
  0x04AEF6 $8EE6: C-----  F0 F8    BEQ  $8EE0
  0x04AEF8 $8EE8: C-----  00       BRK  
  0x04AEF9 $8EE9: C-----  00       BRK  
  0x04AEFA $8EEA: C-----  00       BRK  
  0x04AEFB $8EEB: C-----  00       BRK  
  0x04AEFC $8EEC: C-----  00       BRK  
  0x04AEFD $8EED: C-----  40       RTI  
  0x04AEFE $8EEE: C-----  E0 70    CPX  #$70
  0x04AF00 $8EF0: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x04AF01 $8EF1: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x04AF02 $8EF2: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04AF03 $8EF3: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04AF04 $8EF4: C-----  1E 3E 3C ASL  $3C3E,X
  0x04AF07 $8EF7: C-----  00       BRK  
  0x04AF08 $8EF8: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04AF09 $8EF9: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04AF0A $8EFA: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04AF0B $8EFB: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04AF0C $8EFC: C-----  08       PHP  
  0x04AF0D $8EFD: C-----  00       BRK  
  0x04AF0E $8EFE: C-----  00       BRK  
  0x04AF0F $8EFF: C-----  00       BRK  
  0x04AF10 $8F00: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04AF11 $8F01: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04AF12 $8F02: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04AF13 $8F03: C-----  FE F0 E0 INC  $E0F0,X
  0x04AF16 $8F06: C-----  00       BRK  
  0x04AF17 $8F07: C-----  00       BRK  
  0x04AF18 $8F08: C-----  30 FA    BMI  $8F04
  0x04AF1A $8F0A: C-----  90 F1    BCC  $8EFD
  0x04AF1C $8F0C: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04AF1D $8F0D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04AF1E $8F0E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04AF1F $8F0F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04AF20 $8F10: C-----  F8       SED  
  0x04AF21 $8F11: C-----  F8       SED  
  0x04AF22 $8F12: C-----  F0 70    BEQ  $8F84
  0x04AF24 $8F14: C-----  20 C0 40 JSR  $40C0
  0x04AF27 $8F17: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AF28 $8F18: C-----  30 70    BMI  $8F8A
  0x04AF2A $8F1A: C-----  60       RTS  
  0x04AF2B $8F1B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AF2C $8F1C: C-----  C0 00    CPY  #$00
  0x04AF2E $8F1E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AF2F $8F1F: C-----  00       BRK  
  0x04AF30 $8F20: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04AF31 $8F21: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04AF32 $8F22: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04AF33 $8F23: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04AF34 $8F24: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04AF35 $8F25: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x04AF36 $8F26: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04AF37 $8F27: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04AF38 $8F28: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04AF39 $8F29: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04AF3A $8F2A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04AF3B $8F2B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04AF3C $8F2C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04AF3D $8F2D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AF3E $8F2E: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04AF3F $8F2F: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04AF40 $8F30: C-----  E0 E0    CPX  #$E0
  0x04AF42 $8F32: C-----  C0 C0    CPY  #$C0
  0x04AF44 $8F34: C-----  C0 40    CPY  #$40
  0x04AF46 $8F36: C-----  40       RTI  
  0x04AF47 $8F37: C-----  40       RTI  
  0x04AF48 $8F38: C-----  C0 C0    CPY  #$C0
  0x04AF4A $8F3A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AF4B $8F3B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AF4C $8F3C: C-----  00       BRK  
  0x04AF4D $8F3D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AF4E $8F3E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AF4F $8F3F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AF50 $8F40: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x04AF51 $8F41: C-----  10 18    BPL  $8F5B
  0x04AF53 $8F43: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04AF54 $8F44: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04AF55 $8F45: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04AF56 $8F46: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04AF57 $8F47: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04AF58 $8F48: C-----  00       BRK  
  0x04AF59 $8F49: C-----  00       BRK  
  0x04AF5A $8F4A: C-----  00       BRK  
  0x04AF5B $8F4B: C-----  18       CLC  
  0x04AF5C $8F4C: C-----  10 03    BPL  $8F51
  0x04AF5E $8F4E: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04AF5F $8F4F: C-----  3E 02 02 ROL  $0202,X
  0x04AF62 $8F52: C-----  06 0E    ASL  $0E
  0x04AF64 $8F54: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04AF65 $8F55: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04AF66 $8F56: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04AF67 $8F57: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04AF68 $8F58: C-----  00       BRK  
  0x04AF69 $8F59: C-----  00       BRK  
  0x04AF6A $8F5A: C-----  00       BRK  
  0x04AF6B $8F5B: C-----  00       BRK  
  0x04AF6C $8F5C: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04AF6D $8F5D: C-----  F0 EE    BEQ  $8F4D
  0x04AF6F $8F5F: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04AF70 $8F60: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04AF71 $8F61: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04AF72 $8F62: C-----  7E 31 11 ROR  $1131,X
  0x04AF75 $8F65: C-----  0A       ASL  A
  0x04AF76 $8F66: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04AF77 $8F67: C-----  3D 7F 7C AND  $7C7F,X
  0x04AF7A $8F6A: C-----  30 00    BMI  $8F6C
  0x04AF7C $8F6C: C-----  00       BRK  
  0x04AF7D $8F6D: C-----  01 0B    ORA  ($0B,X)
  0x04AF7F $8F6F: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x04AF80 $8F70: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04AF81 $8F71: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04AF82 $8F72: C-----  1E 10 F0 ASL  $F010,X
  0x04AF85 $8F75: C-----  19 09 35 ORA  $3509,Y
  0x04AF88 $8F78: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04AF89 $8F79: C-----  0E 00 00 ASL  $0000
  0x04AF8C $8F7C: C-----  00       BRK  
  0x04AF8D $8F7D: C-----  E0 F0    CPX  #$F0
  0x04AF8F $8F7F: C-----  C8       INY  
  0x04AF90 $8F80: C-----  08       PHP  
  0x04AF91 $8F81: C-----  08       PHP  
  0x04AF92 $8F82: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x04AF93 $8F83: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x04AF94 $8F84: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04AF95 $8F85: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x04AF96 $8F86: C-----  7E FE F0 ROR  $F0FE,X
  0x04AF99 $8F89: C-----  F0 C0    BEQ  $8F4B
  0x04AF9B $8F8B: C-----  00       BRK  
  0x04AF9C $8F8C: C-----  00       BRK  
  0x04AF9D $8F8D: C-----  00       BRK  
  0x04AF9E $8F8E: C-----  38       SEC  
  0x04AF9F $8F8F: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04AFA0 $8F90: C-----  CE 8E 1D DEC  $1D8E
  0x04AFA3 $8F93: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x04AFA4 $8F94: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x04AFA5 $8F95: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04AFA6 $8F96: C-----  F5 7A    SBC  $7A,X
  0x04AFA8 $8F98: C-----  01 01    ORA  ($01,X)
  0x04AFAA $8F9A: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04AFAB $8F9B: C-----  05 0B    ORA  $0B
  0x04AFAD $8F9D: C-----  05 0A    ORA  $0A
  0x04AFAF $8F9F: C-----  85 44    STA  $44
  0x04AFB1 $8FA1: C-----  24 28    BIT  $28
  0x04AFB3 $8FA3: C-----  28       PLP  
  0x04AFB4 $8FA4: C-----  38       SEC  
  0x04AFB5 $8FA5: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04AFB6 $8FA6: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04AFB7 $8FA7: C-----  00       BRK  
  0x04AFB8 $8FA8: C-----  38       SEC  
  0x04AFB9 $8FA9: C-----  18       CLC  
  0x04AFBA $8FAA: C-----  10 10    BPL  $8FBC
  0x04AFBC $8FAC: C-----  10 00    BPL  $8FAE
  0x04AFBE $8FAE: C-----  00       BRK  
  0x04AFBF $8FAF: C-----  00       BRK  
  0x04AFC0 $8FB0: C-----  BD 7A BD LDA  $BD7A,X
  0x04AFC3 $8FB3: C-----  7E E7 03 ROR  $03E7,X
  0x04AFC6 $8FB6: C-----  01 00    ORA  ($00,X)
  0x04AFC8 $8FB8: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04AFC9 $8FB9: C-----  85 42    STA  $42
  0x04AFCB $8FBB: C-----  81 00    STA  ($00,X)
  0x04AFCD $8FBD: C-----  00       BRK  
  0x04AFCE $8FBE: C-----  00       BRK  
  0x04AFCF $8FBF: C-----  00       BRK  
  0x04AFD0 $8FC0: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04AFD1 $8FC1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04AFD2 $8FC2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04AFD3 $8FC3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04AFD4 $8FC4: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04AFD5 $8FC5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04AFD6 $8FC6: C-----  01 01    ORA  ($01,X)
  0x04AFD8 $8FC8: C-----  F8       SED  
  0x04AFD9 $8FC9: C-----  F8       SED  
  0x04AFDA $8FCA: C-----  F8       SED  
  0x04AFDB $8FCB: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04AFDC $8FCC: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04AFDD $8FCD: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04AFDE $8FCE: C-----  FE FE 80 INC  $80FE,X
  0x04AFE1 $8FD1: C-----  40       RTI  
  0x04AFE2 $8FD2: C-----  20 20 90 JSR  $9020
  0x04AFE5 $8FD5: C-----  10 88    BPL  $8F5F
  0x04AFE7 $8FD7: C-----  08       PHP  
  0x04AFE8 $8FD8: C-----  00       BRK  
  0x04AFE9 $8FD9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04AFEA $8FDA: C-----  C0 C0    CPY  #$C0
  0x04AFEC $8FDC: C-----  60       RTS  
  0x04AFED $8FDD: C-----  E0 70    CPX  #$70
  0x04AFEF $8FDF: C-----  F0 01    BEQ  $8FE2
  0x04AFF1 $8FE1: C-----  81 01    STA  ($01,X)
  0x04AFF3 $8FE3: C-----  81 41    STA  ($41,X)
  0x04AFF5 $8FE5: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x04AFF6 $8FE6: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04AFF7 $8FE7: C-----  7D FE 7E ADC  $7EFE,X
  0x04AFFA $8FEA: C-----  FE 7E BE INC  $BE7E,X
  0x04AFFD $8FED: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04AFFE $8FEE: C-----  28       PLP  
  0x04AFFF $8FEF: C-----  00       BRK  
  0x04B000 $8FF0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B001 $8FF1: C-----  C0 40    CPY  #$40
  0x04B003 $8FF3: C-----  E0 60    CPX  #$60
  0x04B005 $8FF5: C-----  60       RTS  
  0x04B006 $8FF6: C-----  E0 C0    CPX  #$C0
  0x04B008 $8FF8: C-----  00       BRK  
  0x04B009 $8FF9: C-----  00       BRK  
  0x04B00A $8FFA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B00B $8FFB: C-----  00       BRK  
  0x04B00C $8FFC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B00D $8FFD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B00E $8FFE: C-----  00       BRK  
  0x04B00F $8FFF: C-----  00       BRK  
  0x04B010 $9000: C-----  00       BRK  
  0x04B011 $9001: C-----  00       BRK  
  0x04B012 $9002: C-----  00       BRK  
  0x04B013 $9003: C-----  00       BRK  
  0x04B014 $9004: C-----  00       BRK  
  0x04B015 $9005: C-----  00       BRK  
  0x04B016 $9006: C-----  00       BRK  
  0x04B017 $9007: C-----  00       BRK  
  0x04B018 $9008: C-----  00       BRK  
  0x04B019 $9009: C-----  00       BRK  
  0x04B01A $900A: C-----  00       BRK  
  0x04B01B $900B: C-----  00       BRK  
  0x04B01C $900C: C-----  00       BRK  
  0x04B01D $900D: C-----  00       BRK  
  0x04B01E $900E: C-----  00       BRK  
  0x04B01F $900F: C-----  00       BRK  
  0x04B020 $9010: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B021 $9011: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B022 $9012: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B023 $9013: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B024 $9014: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B025 $9015: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B026 $9016: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B027 $9017: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B028 $9018: C-----  00       BRK  
  0x04B029 $9019: C-----  00       BRK  
  0x04B02A $901A: C-----  00       BRK  
  0x04B02B $901B: C-----  00       BRK  
  0x04B02C $901C: C-----  00       BRK  
  0x04B02D $901D: C-----  00       BRK  
  0x04B02E $901E: C-----  00       BRK  
  0x04B02F $901F: C-----  00       BRK  
  0x04B030 $9020: C-----  00       BRK  
  0x04B031 $9021: C-----  00       BRK  
  0x04B032 $9022: C-----  00       BRK  
  0x04B033 $9023: C-----  00       BRK  
  0x04B034 $9024: C-----  00       BRK  
  0x04B035 $9025: C-----  00       BRK  
  0x04B036 $9026: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B037 $9027: C-----  30 00    BMI  $9029
  0x04B039 $9029: C-----  00       BRK  
  0x04B03A $902A: C-----  00       BRK  
  0x04B03B $902B: C-----  00       BRK  
  0x04B03C $902C: C-----  00       BRK  
  0x04B03D $902D: C-----  00       BRK  
  0x04B03E $902E: C-----  00       BRK  
  0x04B03F $902F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B040 $9030: C-----  00       BRK  
  0x04B041 $9031: C-----  00       BRK  
  0x04B042 $9032: C-----  00       BRK  
  0x04B043 $9033: C-----  00       BRK  
  0x04B044 $9034: C-----  00       BRK  
  0x04B045 $9035: C-----  00       BRK  
  0x04B046 $9036: C-----  F0 0C    BEQ  $9044
  0x04B048 $9038: C-----  00       BRK  
  0x04B049 $9039: C-----  00       BRK  
  0x04B04A $903A: C-----  00       BRK  
  0x04B04B $903B: C-----  00       BRK  
  0x04B04C $903C: C-----  00       BRK  
  0x04B04D $903D: C-----  00       BRK  
  0x04B04E $903E: C-----  00       BRK  
  0x04B04F $903F: C-----  F0 04    BEQ  $9045
  0x04B051 $9041: C-----  08       PHP  
  0x04B052 $9042: C-----  08       PHP  
  0x04B053 $9043: C-----  10 10    BPL  $9055
  0x04B055 $9045: C-----  15 13    ORA  $13,X
  0x04B057 $9047: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04B058 $9048: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B059 $9049: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B05A $904A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B05B $904B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B05C $904C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B05D $904D: C-----  0A       ASL  A
  0x04B05E $904E: C-----  0D 0D 00 ORA  $000D
  0x04B061 $9051: C-----  00       BRK  
  0x04B062 $9052: C-----  00       BRK  
  0x04B063 $9053: C-----  00       BRK  
  0x04B064 $9054: C-----  84 C4    STY  $C4
  0x04B066 $9056: C-----  EE FF FF INC  $FFFF
  0x04B069 $9059: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B06A $905A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B06B $905B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B06C $905C: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x04B06D $905D: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x04B06E $905E: C-----  D5 88    CMP  $88,X
  0x04B070 $9060: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B071 $9061: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B072 $9062: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B073 $9063: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B074 $9064: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B075 $9065: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B076 $9066: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B077 $9067: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B078 $9068: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B079 $9069: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x04B07A $906A: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x04B07B $906B: C-----  56 79    LSR  $79,X
  0x04B07D $906D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B07E $906E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B07F $906F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B080 $9070: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B081 $9071: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B082 $9072: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B083 $9073: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B084 $9074: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B085 $9075: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B086 $9076: C-----  FE FE FC INC  $FCFE,X
  0x04B089 $9079: C-----  E5 9D    SBC  $9D
  0x04B08B $907B: C-----  B5 CF    LDA  $CF,X
  0x04B08D $907D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04B08E $907E: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04B08F $907F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04B090 $9080: C-----  06 08    ASL  $08
  0x04B092 $9082: C-----  08       PHP  
  0x04B093 $9083: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x04B094 $9084: C-----  11 13    ORA  ($13),Y
  0x04B096 $9086: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04B097 $9087: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04B098 $9088: C-----  01 07    ORA  ($07,X)
  0x04B09A $908A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B09B $908B: C-----  0D 0E 0D ORA  $0D0E
  0x04B09E $908E: C-----  0D 0D 00 ORA  $000D
  0x04B0A1 $9091: C-----  00       BRK  
  0x04B0A2 $9092: C-----  00       BRK  
  0x04B0A3 $9093: C-----  C4 EE    CPY  $EE
  0x04B0A5 $9095: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B0A6 $9096: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B0A7 $9097: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B0A8 $9098: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B0A9 $9099: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B0AA $909A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B0AB $909B: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04B0AC $909C: C-----  D5 88    CMP  $88,X
  0x04B0AE $909E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B0AF $909F: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04B0B0 $90A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B0B1 $90A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B0B2 $90A2: C-----  F5 FF    SBC  $FF,X
  0x04B0B4 $90A4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B0B5 $90A5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B0B6 $90A6: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B0B7 $90A7: C-----  3E 1D 50 ROL  $501D,X
  0x04B0BA $90AA: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x04B0BB $90AB: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04B0BC $90AC: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04B0BD $90AD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B0BE $90AE: C-----  1E 1D FF ASL  $FF1D,X
  0x04B0C1 $90B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B0C2 $90B2: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04B0C3 $90B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B0C4 $90B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B0C5 $90B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B0C6 $90B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B0C7 $90B7: C-----  FE EC C5 INC  $C5EC,X
  0x04B0CA $90BA: C-----  ED FD FD SBC  $FDFD
  0x04B0CD $90BD: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04B0CE $90BE: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04B0CF $90BF: C-----  EC 20 10 CPX  $1020
  0x04B0D2 $90C2: C-----  10 A8    BPL  $906C
  0x04B0D4 $90C4: C-----  A8       TAY  
  0x04B0D5 $90C5: C-----  C8       INY  
  0x04B0D6 $90C6: C-----  E8       INX  
  0x04B0D7 $90C7: C-----  E8       INX  
  0x04B0D8 $90C8: C-----  C0 E0    CPY  #$E0
  0x04B0DA $90CA: C-----  E0 50    CPX  #$50
  0x04B0DC $90CC: C-----  50 B0    BVC  $907E
  0x04B0DE $90CE: C-----  D0 50    BNE  $9120
  0x04B0E0 $90D0: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B0E1 $90D1: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x04B0E2 $90D2: C-----  1E 1F 1F ASL  $1F1F,X
  0x04B0E5 $90D5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B0E6 $90D6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B0E7 $90D7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B0E8 $90D8: C-----  0A       ASL  A
  0x04B0E9 $90D9: C-----  05 0D    ORA  $0D
  0x04B0EB $90DB: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04B0EC $90DC: C-----  0E 0F 0F ASL  $0F0F
  0x04B0EF $90DF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B0F0 $90E0: C-----  00       BRK  
  0x04B0F1 $90E1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B0F2 $90E2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B0F3 $90E3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B0F4 $90E4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B0F5 $90E5: C-----  00       BRK  
  0x04B0F6 $90E6: C-----  00       BRK  
  0x04B0F7 $90E7: C-----  00       BRK  
  0x04B0F8 $90E8: C-----  00       BRK  
  0x04B0F9 $90E9: C-----  00       BRK  
  0x04B0FA $90EA: C-----  00       BRK  
  0x04B0FB $90EB: C-----  00       BRK  
  0x04B0FC $90EC: C-----  00       BRK  
  0x04B0FD $90ED: C-----  00       BRK  
  0x04B0FE $90EE: C-----  00       BRK  
  0x04B0FF $90EF: C-----  00       BRK  
  0x04B100 $90F0: C-----  00       BRK  
  0x04B101 $90F1: C-----  00       BRK  
  0x04B102 $90F2: C-----  00       BRK  
  0x04B103 $90F3: C-----  00       BRK  
  0x04B104 $90F4: C-----  00       BRK  
  0x04B105 $90F5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B106 $90F6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B107 $90F7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B108 $90F8: C-----  00       BRK  
  0x04B109 $90F9: C-----  00       BRK  
  0x04B10A $90FA: C-----  00       BRK  
  0x04B10B $90FB: C-----  00       BRK  
  0x04B10C $90FC: C-----  00       BRK  
  0x04B10D $90FD: C-----  00       BRK  
  0x04B10E $90FE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B10F $90FF: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04B110 $9100: C-----  20 10 10 JSR  $1010
  0x04B113 $9103: C-----  08       PHP  
  0x04B114 $9104: C-----  A8       TAY  
  0x04B115 $9105: C-----  A8       TAY  
  0x04B116 $9106: C-----  C8       INY  
  0x04B117 $9107: C-----  E8       INX  
  0x04B118 $9108: C-----  C0 E0    CPY  #$E0
  0x04B11A $910A: C-----  E0 F0    CPX  #$F0
  0x04B11C $910C: C-----  50 50    BVC  $915E
  0x04B11E $910E: C-----  30 D0    BMI  $90E0
  0x04B120 $9110: C-----  00       BRK  
  0x04B121 $9111: C-----  00       BRK  
  0x04B122 $9112: C-----  00       BRK  
  0x04B123 $9113: C-----  00       BRK  
  0x04B124 $9114: C-----  F0 4E    BEQ  $9164
  0x04B126 $9116: C-----  F1 FE    SBC  ($FE),Y
  0x04B128 $9118: C-----  00       BRK  
  0x04B129 $9119: C-----  00       BRK  
  0x04B12A $911A: C-----  00       BRK  
  0x04B12B $911B: C-----  00       BRK  
  0x04B12C $911C: C-----  00       BRK  
  0x04B12D $911D: C-----  B0 3E    BCS  $915D
  0x04B12F $911F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B130 $9120: C-----  F0 00    BEQ  $9122
  0x04B132 $9122: C-----  00       BRK  
  0x04B133 $9123: C-----  00       BRK  
  0x04B134 $9124: C-----  00       BRK  
  0x04B135 $9125: C-----  00       BRK  
  0x04B136 $9126: C-----  00       BRK  
  0x04B137 $9127: C-----  00       BRK  
  0x04B138 $9128: C-----  00       BRK  
  0x04B139 $9129: C-----  00       BRK  
  0x04B13A $912A: C-----  00       BRK  
  0x04B13B $912B: C-----  00       BRK  
  0x04B13C $912C: C-----  00       BRK  
  0x04B13D $912D: C-----  00       BRK  
  0x04B13E $912E: C-----  00       BRK  
  0x04B13F $912F: C-----  00       BRK  
  0x04B140 $9130: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B141 $9131: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B142 $9132: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B143 $9133: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B144 $9134: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B145 $9135: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B146 $9136: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B147 $9137: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B148 $9138: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B149 $9139: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B14A $913A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B14B $913B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B14C $913C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B14D $913D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B14E $913E: C-----  01 00    ORA  ($00,X)
  0x04B150 $9140: C-----  00       BRK  
  0x04B151 $9141: C-----  00       BRK  
  0x04B152 $9142: C-----  00       BRK  
  0x04B153 $9143: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04B154 $9144: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04B155 $9145: C-----  FE FE FF INC  $FFFE,X
  0x04B158 $9148: C-----  00       BRK  
  0x04B159 $9149: C-----  00       BRK  
  0x04B15A $914A: C-----  00       BRK  
  0x04B15B $914B: C-----  00       BRK  
  0x04B15C $914C: C-----  38       SEC  
  0x04B15D $914D: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04B15E $914E: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04B15F $914F: C-----  F6 FF    INC  $FF,X
  0x04B161 $9151: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B162 $9152: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B163 $9153: C-----  00       BRK  
  0x04B164 $9154: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B165 $9155: C-----  C0 00    CPY  #$00
  0x04B167 $9157: C-----  00       BRK  
  0x04B168 $9158: C-----  00       BRK  
  0x04B169 $9159: C-----  00       BRK  
  0x04B16A $915A: C-----  C0 3C    CPY  #$3C
  0x04B16C $915C: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04B16D $915D: C-----  C0 00    CPY  #$00
  0x04B16F $915F: C-----  00       BRK  
  0x04B170 $9160: C-----  FD FD FD SBC  $FDFD,X
  0x04B173 $9163: C-----  FD FA FA SBC  $FAFA,X
  0x04B176 $9166: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04B177 $9167: C-----  F8       SED  
  0x04B178 $9168: C-----  FE FE FE INC  $FEFE,X
  0x04B17B $916B: C-----  FE FC FC INC  $FCFC,X
  0x04B17E $916E: C-----  F8       SED  
  0x04B17F $916F: C-----  00       BRK  
  0x04B180 $9170: C-----  00       BRK  
  0x04B181 $9171: C-----  00       BRK  
  0x04B182 $9172: C-----  00       BRK  
  0x04B183 $9173: C-----  00       BRK  
  0x04B184 $9174: C-----  00       BRK  
  0x04B185 $9175: C-----  00       BRK  
  0x04B186 $9176: C-----  00       BRK  
  0x04B187 $9177: C-----  00       BRK  
  0x04B188 $9178: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04B189 $9179: C-----  08       PHP  
  0x04B18A $917A: C-----  09 11    ORA  #$11
  0x04B18C $917C: C-----  11 01    ORA  ($01),Y
  0x04B18E $917E: C-----  01 01    ORA  ($01,X)
  0x04B190 $9180: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04B191 $9181: C-----  2C 3E 7E BIT  $7E3E
  0x04B194 $9184: C-----  FE FE FC INC  $FCFE,X
  0x04B197 $9187: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04B198 $9188: C-----  28       PLP  
  0x04B199 $9189: C-----  D0 C8    BNE  $9153
  0x04B19B $918B: C-----  98       TYA  
  0x04B19C $918C: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x04B19D $918D: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04B19E $918E: C-----  E8       INX  
  0x04B19F $918F: C-----  F8       SED  
  0x04B1A0 $9190: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B1A1 $9191: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B1A2 $9192: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B1A3 $9193: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B1A4 $9194: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B1A5 $9195: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B1A6 $9196: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B1A7 $9197: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B1A8 $9198: C-----  00       BRK  
  0x04B1A9 $9199: C-----  00       BRK  
  0x04B1AA $919A: C-----  00       BRK  
  0x04B1AB $919B: C-----  00       BRK  
  0x04B1AC $919C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B1AD $919D: C-----  60       RTS  
  0x04B1AE $919E: C-----  20 10 00 JSR  $0010
  0x04B1B1 $91A1: C-----  00       BRK  
  0x04B1B2 $91A2: C-----  00       BRK  
  0x04B1B3 $91A3: C-----  00       BRK  
  0x04B1B4 $91A4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B1B5 $91A5: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x04B1B6 $91A6: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04B1B7 $91A7: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04B1B8 $91A8: C-----  00       BRK  
  0x04B1B9 $91A9: C-----  00       BRK  
  0x04B1BA $91AA: C-----  00       BRK  
  0x04B1BB $91AB: C-----  00       BRK  
  0x04B1BC $91AC: C-----  00       BRK  
  0x04B1BD $91AD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B1BE $91AE: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04B1BF $91AF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B1C0 $91B0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B1C1 $91B1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B1C2 $91B2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B1C3 $91B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B1C4 $91B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B1C5 $91B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B1C6 $91B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B1C7 $91B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B1C8 $91B8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B1C9 $91B9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B1CA $91BA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B1CB $91BB: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B1CC $91BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B1CD $91BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B1CE $91BE: C-----  FE FC 07 INC  $07FC,X
  0x04B1D1 $91C1: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B1D2 $91C2: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B1D3 $91C3: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B1D4 $91C4: C-----  00       BRK  
  0x04B1D5 $91C5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B1D6 $91C6: C-----  00       BRK  
  0x04B1D7 $91C7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04B1D8 $91C8: C-----  70 8B    BVS  $9155
  0x04B1DA $91CA: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04B1DB $91CB: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04B1DC $91CC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B1DD $91CD: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B1DE $91CE: C-----  00       BRK  
  0x04B1DF $91CF: C-----  0E 00 00 ASL  $0000
  0x04B1E2 $91D2: C-----  00       BRK  
  0x04B1E3 $91D3: C-----  00       BRK  
  0x04B1E4 $91D4: C-----  00       BRK  
  0x04B1E5 $91D5: C-----  00       BRK  
  0x04B1E6 $91D6: C-----  00       BRK  
  0x04B1E7 $91D7: C-----  00       BRK  
  0x04B1E8 $91D8: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B1E9 $91D9: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B1EA $91DA: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B1EB $91DB: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B1EC $91DC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B1ED $91DD: C-----  05 05    ORA  $05
  0x04B1EF $91DF: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04B1F0 $91E0: C-----  F8       SED  
  0x04B1F1 $91E1: C-----  F0 E0    BEQ  $91C3
  0x04B1F3 $91E3: C-----  C0 9F    CPY  #$9F
  0x04B1F5 $91E5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B1F6 $91E6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B1F7 $91E7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B1F8 $91E8: C-----  F0 E0    BEQ  $91CA
  0x04B1FA $91EA: C-----  C0 80    CPY  #$80
  0x04B1FC $91EC: C-----  00       BRK  
  0x04B1FD $91ED: C-----  1E 7F FF ASL  $FF7F,X
  0x04B200 $91F0: C-----  00       BRK  
  0x04B201 $91F1: C-----  00       BRK  
  0x04B202 $91F2: C-----  00       BRK  
  0x04B203 $91F3: C-----  01 00    ORA  ($00,X)
  0x04B205 $91F5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B206 $91F6: C-----  00       BRK  
  0x04B207 $91F7: C-----  00       BRK  
  0x04B208 $91F8: C-----  08       PHP  
  0x04B209 $91F9: C-----  08       PHP  
  0x04B20A $91FA: C-----  18       CLC  
  0x04B20B $91FB: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04B20C $91FC: C-----  D0 37    BNE  $9235
  0x04B20E $91FE: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04B20F $91FF: C-----  10 1F    BPL  $9220
  0x04B211 $9201: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B212 $9202: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B213 $9203: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B214 $9204: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B215 $9205: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B216 $9206: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B217 $9207: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B218 $9208: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04B219 $9209: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B21A $920A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B21B $920B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B21C $920C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B21D $920D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B21E $920E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B21F $920F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B220 $9210: C-----  FE FE FC INC  $FCFE,X
  0x04B223 $9213: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04B224 $9214: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04B225 $9215: C-----  F8       SED  
  0x04B226 $9216: C-----  F0 E0    BEQ  $91F8
  0x04B228 $9218: C-----  B8       CLV  
  0x04B229 $9219: C-----  90 E0    BCC  $91FB
  0x04B22B $921B: C-----  88       DEY  
  0x04B22C $921C: C-----  E8       INX  
  0x04B22D $921D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B22E $921E: C-----  C0 00    CPY  #$00
  0x04B230 $9220: C-----  00       BRK  
  0x04B231 $9221: C-----  00       BRK  
  0x04B232 $9222: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B233 $9223: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04B234 $9224: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04B235 $9225: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04B236 $9226: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04B237 $9227: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04B238 $9228: C-----  00       BRK  
  0x04B239 $9229: C-----  00       BRK  
  0x04B23A $922A: C-----  00       BRK  
  0x04B23B $922B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B23C $922C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B23D $922D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B23E $922E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B23F $922F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B240 $9230: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x04B241 $9231: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04B242 $9232: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B243 $9233: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B244 $9234: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B245 $9235: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B246 $9236: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B247 $9237: C-----  FE 0F 3F INC  $3F0F,X
  0x04B24A $923A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B24B $923B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B24C $923C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B24D $923D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B24E $923E: C-----  FE FC 00 INC  $00FC,X
  0x04B251 $9241: C-----  00       BRK  
  0x04B252 $9242: C-----  00       BRK  
  0x04B253 $9243: C-----  00       BRK  
  0x04B254 $9244: C-----  00       BRK  
  0x04B255 $9245: C-----  01 02    ORA  ($02,X)
  0x04B257 $9247: C-----  0D 00 00 ORA  $0000
  0x04B25A $924A: C-----  00       BRK  
  0x04B25B $924B: C-----  00       BRK  
  0x04B25C $924C: C-----  00       BRK  
  0x04B25D $924D: C-----  00       BRK  
  0x04B25E $924E: C-----  01 03    ORA  ($03,X)
  0x04B260 $9250: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04B261 $9251: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04B262 $9252: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04B263 $9253: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04B264 $9254: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B265 $9255: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B266 $9256: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B267 $9257: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B268 $9258: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04B269 $9259: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04B26A $925A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B26B $925B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B26C $925C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B26D $925D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B26E $925E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B26F $925F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B270 $9260: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B271 $9261: C-----  F8       SED  
  0x04B272 $9262: C-----  F0 E0    BEQ  $9244
  0x04B274 $9264: C-----  C0 80    CPY  #$80
  0x04B276 $9266: C-----  00       BRK  
  0x04B277 $9267: C-----  00       BRK  
  0x04B278 $9268: C-----  F0 F0    BEQ  $925A
  0x04B27A $926A: C-----  E0 C0    CPX  #$C0
  0x04B27C $926C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B27D $926D: C-----  00       BRK  
  0x04B27E $926E: C-----  00       BRK  
  0x04B27F $926F: C-----  00       BRK  
  0x04B280 $9270: C-----  00       BRK  
  0x04B281 $9271: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B282 $9272: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B283 $9273: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B284 $9274: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B285 $9275: C-----  05 05    ORA  $05
  0x04B287 $9277: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04B288 $9278: C-----  00       BRK  
  0x04B289 $9279: C-----  00       BRK  
  0x04B28A $927A: C-----  01 01    ORA  ($01,X)
  0x04B28C $927C: C-----  01 03    ORA  ($03,X)
  0x04B28E $927E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B28F $927F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B290 $9280: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04B291 $9281: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04B292 $9282: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04B293 $9283: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04B294 $9284: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04B295 $9285: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04B296 $9286: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B297 $9287: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B298 $9288: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B299 $9289: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B29A $928A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B29B $928B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B29C $928C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B29D $928D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B29E $928E: C-----  1E 00 FC ASL  $FC00,X
  0x04B2A1 $9291: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04B2A2 $9292: C-----  F8       SED  
  0x04B2A3 $9293: C-----  F0 E0    BEQ  $9275
  0x04B2A5 $9295: C-----  C0 80    CPY  #$80
  0x04B2A7 $9297: C-----  00       BRK  
  0x04B2A8 $9298: C-----  F8       SED  
  0x04B2A9 $9299: C-----  F8       SED  
  0x04B2AA $929A: C-----  F0 E0    BEQ  $927C
  0x04B2AC $929C: C-----  C0 80    CPY  #$80
  0x04B2AE $929E: C-----  00       BRK  
  0x04B2AF $929F: C-----  00       BRK  
  0x04B2B0 $92A0: C-----  00       BRK  
  0x04B2B1 $92A1: C-----  00       BRK  
  0x04B2B2 $92A2: C-----  01 1A    ORA  ($1A,X)
  0x04B2B4 $92A4: C-----  1D 13 2F ORA  $2F13,X
  0x04B2B7 $92A7: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04B2B8 $92A8: C-----  00       BRK  
  0x04B2B9 $92A9: C-----  00       BRK  
  0x04B2BA $92AA: C-----  00       BRK  
  0x04B2BB $92AB: C-----  01 03    ORA  ($03,X)
  0x04B2BD $92AD: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B2BE $92AE: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B2BF $92AF: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B2C0 $92B0: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04B2C1 $92B1: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04B2C2 $92B2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B2C3 $92B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B2C4 $92B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B2C5 $92B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B2C6 $92B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B2C7 $92B7: C-----  FE 1F 3F INC  $3F1F,X
  0x04B2CA $92BA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B2CB $92BB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B2CC $92BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B2CD $92BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B2CE $92BE: C-----  FE F8 00 INC  $00F8,X
  0x04B2D1 $92C1: C-----  00       BRK  
  0x04B2D2 $92C2: C-----  00       BRK  
  0x04B2D3 $92C3: C-----  00       BRK  
  0x04B2D4 $92C4: C-----  00       BRK  
  0x04B2D5 $92C5: C-----  01 06    ORA  ($06,X)
  0x04B2D7 $92C7: C-----  19 00 00 ORA  $0000,Y
  0x04B2DA $92CA: C-----  00       BRK  
  0x04B2DB $92CB: C-----  00       BRK  
  0x04B2DC $92CC: C-----  00       BRK  
  0x04B2DD $92CD: C-----  00       BRK  
  0x04B2DE $92CE: C-----  01 07    ORA  ($07,X)
  0x04B2E0 $92D0: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04B2E1 $92D1: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04B2E2 $92D2: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04B2E3 $92D3: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04B2E4 $92D4: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04B2E5 $92D5: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04B2E6 $92D6: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04B2E7 $92D7: C-----  F9 07 07 SBC  $0707,Y
  0x04B2EA $92DA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B2EB $92DB: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B2EC $92DC: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B2ED $92DD: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04B2EE $92DE: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04B2EF $92DF: C-----  E6 FE    INC  $FE
  0x04B2F1 $92E1: C-----  F8       SED  
  0x04B2F2 $92E2: C-----  F0 E0    BEQ  $92C4
  0x04B2F4 $92E4: C-----  C0 80    CPY  #$80
  0x04B2F6 $92E6: C-----  00       BRK  
  0x04B2F7 $92E7: C-----  00       BRK  
  0x04B2F8 $92E8: C-----  F0 F0    BEQ  $92DA
  0x04B2FA $92EA: C-----  E0 C0    CPX  #$C0
  0x04B2FC $92EC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B2FD $92ED: C-----  00       BRK  
  0x04B2FE $92EE: C-----  00       BRK  
  0x04B2FF $92EF: C-----  00       BRK  
  0x04B300 $92F0: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B301 $92F1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B302 $92F2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B303 $92F3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B304 $92F4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B305 $92F5: C-----  00       BRK  
  0x04B306 $92F6: C-----  00       BRK  
  0x04B307 $92F7: C-----  00       BRK  
  0x04B308 $92F8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B309 $92F9: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B30A $92FA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B30B $92FB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B30C $92FC: C-----  00       BRK  
  0x04B30D $92FD: C-----  00       BRK  
  0x04B30E $92FE: C-----  00       BRK  
  0x04B30F $92FF: C-----  00       BRK  
  0x04B310 $9300: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B311 $9301: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B312 $9302: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B313 $9303: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B314 $9304: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B315 $9305: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B316 $9306: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B317 $9307: C-----  FE FF FF INC  $FFFF,X
  0x04B31A $930A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B31B $930B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B31C $930C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B31D $930D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B31E $930E: C-----  FE F8 FF INC  $FFF8,X
  0x04B321 $9311: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B322 $9312: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04B323 $9313: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04B324 $9314: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04B325 $9315: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04B326 $9316: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B327 $9317: C-----  01 F9    ORA  ($F9,X)
  0x04B329 $9319: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04B32A $931A: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x04B32B $931B: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x04B32C $931C: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04B32D $931D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B32E $931E: C-----  00       BRK  
  0x04B32F $931F: C-----  00       BRK  
  0x04B330 $9320: C-----  00       BRK  
  0x04B331 $9321: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04B332 $9322: C-----  96 AE    STX  $AE,Y
  0x04B334 $9324: C-----  DE BE FE DEC  $FEBE,X
  0x04B337 $9327: C-----  FE 00 00 INC  $0000,X
  0x04B33A $932A: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04B33B $932B: C-----  18       CLC  
  0x04B33C $932C: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x04B33D $932D: C-----  68       PLA  
  0x04B33E $932E: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04B33F $932F: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04B340 $9330: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B341 $9331: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B342 $9332: C-----  00       BRK  
  0x04B343 $9333: C-----  00       BRK  
  0x04B344 $9334: C-----  00       BRK  
  0x04B345 $9335: C-----  00       BRK  
  0x04B346 $9336: C-----  00       BRK  
  0x04B347 $9337: C-----  00       BRK  
  0x04B348 $9338: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B349 $9339: C-----  00       BRK  
  0x04B34A $933A: C-----  00       BRK  
  0x04B34B $933B: C-----  00       BRK  
  0x04B34C $933C: C-----  00       BRK  
  0x04B34D $933D: C-----  00       BRK  
  0x04B34E $933E: C-----  00       BRK  
  0x04B34F $933F: C-----  00       BRK  
  0x04B350 $9340: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B351 $9341: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B352 $9342: C-----  FE FE FE INC  $FEFE,X
  0x04B355 $9345: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04B356 $9346: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04B357 $9347: C-----  F8       SED  
  0x04B358 $9348: C-----  FE FE FC INC  $FCFE,X
  0x04B35B $934B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04B35C $934C: C-----  B8       CLV  
  0x04B35D $934D: C-----  F0 A8    BEQ  $92F7
  0x04B35F $934F: C-----  B0 FF    BCS  $9350
  0x04B361 $9351: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B362 $9352: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B363 $9353: C-----  FE FC F8 INC  $F8FC,X
  0x04B366 $9356: C-----  F0 F0    BEQ  $9348
  0x04B368 $9358: C-----  00       BRK  
  0x04B369 $9359: C-----  00       BRK  
  0x04B36A $935A: C-----  00       BRK  
  0x04B36B $935B: C-----  00       BRK  
  0x04B36C $935C: C-----  01 02    ORA  ($02,X)
  0x04B36E $935E: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04B36F $935F: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04B370 $9360: C-----  F8       SED  
  0x04B371 $9361: C-----  E0 00    CPX  #$00
  0x04B373 $9363: C-----  00       BRK  
  0x04B374 $9364: C-----  00       BRK  
  0x04B375 $9365: C-----  00       BRK  
  0x04B376 $9366: C-----  00       BRK  
  0x04B377 $9367: C-----  00       BRK  
  0x04B378 $9368: C-----  C0 00    CPY  #$00
  0x04B37A $936A: C-----  00       BRK  
  0x04B37B $936B: C-----  00       BRK  
  0x04B37C $936C: C-----  00       BRK  
  0x04B37D $936D: C-----  00       BRK  
  0x04B37E $936E: C-----  00       BRK  
  0x04B37F $936F: C-----  00       BRK  
  0x04B380 $9370: C-----  E0 E0    CPX  #$E0
  0x04B382 $9372: C-----  40       RTI  
  0x04B383 $9373: C-----  C0 00    CPY  #$00
  0x04B385 $9375: C-----  C0 06    CPY  #$06
  0x04B387 $9377: C-----  0E 08 08 ASL  $0808
  0x04B38A $937A: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04B38B $937B: C-----  D8       CLD  
  0x04B38C $937C: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04B38D $937D: C-----  D8       CLD  
  0x04B38E $937E: C-----  10 00    BPL  $9380
  0x04B390 $9380: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04B391 $9381: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04B392 $9382: C-----  68       PLA  
  0x04B393 $9383: C-----  E8       INX  
  0x04B394 $9384: C-----  D0 20    BNE  $93A6
  0x04B396 $9386: C-----  C0 00    CPY  #$00
  0x04B398 $9388: C-----  A8       TAY  
  0x04B399 $9389: C-----  A8       TAY  
  0x04B39A $938A: C-----  B0 70    BCS  $93FC
  0x04B39C $938C: C-----  E0 C0    CPX  #$C0
  0x04B39E $938E: C-----  00       BRK  
  0x04B39F $938F: C-----  00       BRK  
  0x04B3A0 $9390: C-----  C0 00    CPY  #$00
  0x04B3A2 $9392: C-----  00       BRK  
  0x04B3A3 $9393: C-----  00       BRK  
  0x04B3A4 $9394: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B3A5 $9395: C-----  C0 00    CPY  #$00
  0x04B3A7 $9397: C-----  00       BRK  
  0x04B3A8 $9398: C-----  0D 30 40 ORA  $4030
  0x04B3AB $939B: C-----  00       BRK  
  0x04B3AC $939C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B3AD $939D: C-----  C0 00    CPY  #$00
  0x04B3AF $939F: C-----  10 F8    BPL  $9399
  0x04B3B1 $93A1: C-----  F0 C0    BEQ  $9363
  0x04B3B3 $93A3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B3B4 $93A4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B3B5 $93A5: C-----  00       BRK  
  0x04B3B6 $93A6: C-----  00       BRK  
  0x04B3B7 $93A7: C-----  00       BRK  
  0x04B3B8 $93A8: C-----  F0 C0    BEQ  $936A
  0x04B3BA $93AA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B3BB $93AB: C-----  00       BRK  
  0x04B3BC $93AC: C-----  00       BRK  
  0x04B3BD $93AD: C-----  00       BRK  
  0x04B3BE $93AE: C-----  00       BRK  
  0x04B3BF $93AF: C-----  00       BRK  
  0x04B3C0 $93B0: C-----  00       BRK  
  0x04B3C1 $93B1: C-----  00       BRK  
  0x04B3C2 $93B2: C-----  00       BRK  
  0x04B3C3 $93B3: C-----  00       BRK  
  0x04B3C4 $93B4: C-----  00       BRK  
  0x04B3C5 $93B5: C-----  00       BRK  
  0x04B3C6 $93B6: C-----  00       BRK  
  0x04B3C7 $93B7: C-----  00       BRK  
  0x04B3C8 $93B8: C-----  00       BRK  
  0x04B3C9 $93B9: C-----  09 04    ORA  #$04
  0x04B3CB $93BB: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04B3CC $93BC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B3CD $93BD: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B3CE $93BE: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B3CF $93BF: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B3D0 $93C0: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B3D1 $93C1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B3D2 $93C2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B3D3 $93C3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B3D4 $93C4: C-----  00       BRK  
  0x04B3D5 $93C5: C-----  00       BRK  
  0x04B3D6 $93C6: C-----  01 03    ORA  ($03,X)
  0x04B3D8 $93C8: C-----  40       RTI  
  0x04B3D9 $93C9: C-----  A0 A0    LDY  #$A0
  0x04B3DB $93CB: C-----  50 28    BVC  $93F5
  0x04B3DD $93CD: C-----  16 0C    ASL  $0C,X
  0x04B3DF $93CF: C-----  08       PHP  
  0x04B3E0 $93D0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B3E1 $93D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B3E2 $93D2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B3E3 $93D3: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04B3E4 $93D4: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04B3E5 $93D5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B3E6 $93D6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B3E7 $93D7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B3E8 $93D8: C-----  00       BRK  
  0x04B3E9 $93D9: C-----  00       BRK  
  0x04B3EA $93DA: C-----  00       BRK  
  0x04B3EB $93DB: C-----  00       BRK  
  0x04B3EC $93DC: C-----  00       BRK  
  0x04B3ED $93DD: C-----  20 C0 40 JSR  $40C0
  0x04B3F0 $93E0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B3F1 $93E1: C-----  0E 1E 3E ASL  $3E1E
  0x04B3F4 $93E4: C-----  00       BRK  
  0x04B3F5 $93E5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B3F6 $93E6: C-----  00       BRK  
  0x04B3F7 $93E7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04B3F8 $93E8: C-----  90 23    BCC  $940D
  0x04B3FA $93EA: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04B3FB $93EB: C-----  BE 00 7F LDX  $7F00,Y
  0x04B3FE $93EE: C-----  00       BRK  
  0x04B3FF $93EF: C-----  0E FF FF ASL  $FFFF
  0x04B402 $93F2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B403 $93F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B404 $93F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B405 $93F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B406 $93F6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04B407 $93F7: C-----  F0 00    BEQ  $93F9
  0x04B409 $93F9: C-----  00       BRK  
  0x04B40A $93FA: C-----  00       BRK  
  0x04B40B $93FB: C-----  00       BRK  
  0x04B40C $93FC: C-----  00       BRK  
  0x04B40D $93FD: C-----  00       BRK  
  0x04B40E $93FE: C-----  00       BRK  
  0x04B40F $93FF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B410 $9400: ------  .byte $00
  0x04B411 $9401: ------  .byte $00
  0x04B412 $9402: ------  .byte $00
  0x04B413 $9403: ------  .byte $00
  0x04B414 $9404: ------  .byte $00
  0x04B415 $9405: ------  .byte $00
  0x04B416 $9406: ------  .byte $00
  0x04B417 $9407: ------  .byte $00
  0x04B418 $9408: ------  .byte $00
  0x04B419 $9409: ------  .byte $00
  0x04B41A $940A: ------  .byte $00
  0x04B41B $940B: ------  .byte $00
  0x04B41C $940C: ------  .byte $00
  0x04B41D $940D: ------  .byte $00
  0x04B41E $940E: ------  .byte $00
  0x04B41F $940F: ------  .byte $00
  0x04B420 $9410: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B421 $9411: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B422 $9412: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B423 $9413: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B424 $9414: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B425 $9415: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B426 $9416: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B427 $9417: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B428 $9418: C-----  00       BRK  
  0x04B429 $9419: C-----  00       BRK  
  0x04B42A $941A: C-----  00       BRK  
  0x04B42B $941B: C-----  00       BRK  
  0x04B42C $941C: C-----  00       BRK  
  0x04B42D $941D: C-----  00       BRK  
  0x04B42E $941E: C-----  00       BRK  
  0x04B42F $941F: C-----  00       BRK  
  0x04B430 $9420: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B431 $9421: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B432 $9422: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B433 $9423: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B434 $9424: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B435 $9425: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B436 $9426: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B437 $9427: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B438 $9428: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B439 $9429: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x04B43A $942A: C-----  61 D9    ADC  ($D9,X)
  0x04B43C $942C: C-----  B9 B1 AD LDA  $ADB1,Y
  0x04B43F $942F: C-----  6D 80 E0 ADC  $E080
  0x04B442 $9432: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04B443 $9433: C-----  FE FF FF INC  $FFFF,X
  0x04B446 $9436: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B447 $9437: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B448 $9438: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B449 $9439: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04B44A $943A: C-----  8C 81 80 STY  $8081
  0x04B44D $943D: C-----  86 9F    STX  $9F
  0x04B44F $943F: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04B450 $9440: ------  .byte $00
  0x04B451 $9441: ------  .byte $00
  0x04B452 $9442: ------  .byte $00
  0x04B453 $9443: ------  .byte $00
  0x04B454 $9444: ------  .byte $80
  0x04B455 $9445: ------  .byte $FE
  0x04B456 $9446: ------  .byte $FF
  0x04B457 $9447: ------  .byte $FF
  0x04B458 $9448: ------  .byte $FF
  0x04B459 $9449: ------  .byte $FF
  0x04B45A $944A: ------  .byte $FF
  0x04B45B $944B: ------  .byte $FF
  0x04B45C $944C: ------  .byte $7F
  0x04B45D $944D: ------  .byte $01
  0x04B45E $944E: ------  .byte $0E
  0x04B45F $944F: ------  .byte $1F
  0x04B460 $9450: C-----  00       BRK  
  0x04B461 $9451: C-----  00       BRK  
  0x04B462 $9452: C-----  00       BRK  
  0x04B463 $9453: C-----  00       BRK  
  0x04B464 $9454: C-----  00       BRK  
  0x04B465 $9455: C-----  00       BRK  
  0x04B466 $9456: C-----  00       BRK  
  0x04B467 $9457: C-----  00       BRK  
  0x04B468 $9458: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B469 $9459: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B46A $945A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B46B $945B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B46C $945C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B46D $945D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B46E $945E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B46F $945F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B470 $9460: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B471 $9461: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04B472 $9462: C-----  C0 60    CPY  #$60
  0x04B474 $9464: C-----  18       CLC  
  0x04B475 $9465: C-----  C6 F1    DEC  $F1
  0x04B477 $9467: C-----  CC FC C3 CPY  $C3FC
  0x04B47A $946A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B47B $946B: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04B47C $946C: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04B47D $946D: C-----  39 0E B3 AND  $B30E,Y
  0x04B480 $9470: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04B481 $9471: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B482 $9472: C-----  00       BRK  
  0x04B483 $9473: C-----  00       BRK  
  0x04B484 $9474: C-----  00       BRK  
  0x04B485 $9475: C-----  00       BRK  
  0x04B486 $9476: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B487 $9477: C-----  78       SEI  
  0x04B488 $9478: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B489 $9479: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04B48A $947A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B48B $947B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B48C $947C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B48D $947D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B48E $947E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B48F $947F: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04B490 $9480: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B491 $9481: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B492 $9482: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B493 $9483: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B494 $9484: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B495 $9485: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B496 $9486: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B497 $9487: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B498 $9488: C-----  59 5B 77 EOR  $775B,Y
  0x04B49B $948B: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04B49C $948C: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04B49D $948D: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04B49E $948E: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04B49F $948F: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04B4A0 $9490: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4A1 $9491: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4A2 $9492: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4A3 $9493: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4A4 $9494: C-----  F9 F0 F0 SBC  $F0F0,Y
  0x04B4A7 $9497: C-----  F0 9F    BEQ  $9438
  0x04B4A9 $9499: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04B4AA $949A: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04B4AB $949B: C-----  DD FE FF CMP  $FFFE,X
  0x04B4AE $949E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4AF $949F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4B0 $94A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4B1 $94A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4B2 $94A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4B3 $94A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4B4 $94A4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4B5 $94A5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4B6 $94A6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B4B7 $94A7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B4B8 $94A8: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04B4B9 $94A9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B4BA $94AA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4BB $94AB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4BC $94AC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4BD $94AD: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B4BE $94AE: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04B4BF $94AF: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04B4C0 $94B0: C-----  F0 F0    BEQ  $94A2
  0x04B4C2 $94B2: C-----  F8       SED  
  0x04B4C3 $94B3: C-----  F8       SED  
  0x04B4C4 $94B4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04B4C5 $94B5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04B4C6 $94B6: C-----  FE FF FF INC  $FFFF,X
  0x04B4C9 $94B9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4CA $94BA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4CB $94BB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4CC $94BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4CD $94BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4CE $94BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4CF $94BF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4D0 $94C0: C-----  !!UNDEF $93  ; unknown opcode, treating as data
  0x04B4D1 $94C1: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x04B4D2 $94C2: C-----  DD FE F8 CMP  $F8FE,X
  0x04B4D5 $94C5: C-----  BC 1F 03 LDY  $031F,X
  0x04B4D8 $94C8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B4D9 $94C9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B4DA $94CA: C-----  C0 70    CPY  #$70
  0x04B4DC $94CC: C-----  B8       CLV  
  0x04B4DD $94CD: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x04B4DE $94CE: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04B4DF $94CF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4E0 $94D0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B4E1 $94D1: C-----  F0 3F    BEQ  $9512
  0x04B4E3 $94D3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B4E4 $94D4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B4E5 $94D5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B4E6 $94D6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4E7 $94D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4E8 $94D8: C-----  F8       SED  
  0x04B4E9 $94D9: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B4EA $94DA: C-----  C0 E0    CPY  #$E0
  0x04B4EC $94DC: C-----  C0 FF    CPY  #$FF
  0x04B4EE $94DE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4EF $94DF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4F0 $94E0: C-----  00       BRK  
  0x04B4F1 $94E1: C-----  00       BRK  
  0x04B4F2 $94E2: C-----  00       BRK  
  0x04B4F3 $94E3: C-----  00       BRK  
  0x04B4F4 $94E4: C-----  00       BRK  
  0x04B4F5 $94E5: C-----  00       BRK  
  0x04B4F6 $94E6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B4F7 $94E7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4F8 $94E8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4F9 $94E9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4FA $94EA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4FB $94EB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4FC $94EC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4FD $94ED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4FE $94EE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B4FF $94EF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B500 $94F0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B501 $94F1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B502 $94F2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B503 $94F3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B504 $94F4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B505 $94F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B506 $94F6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B507 $94F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B508 $94F8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B509 $94F9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B50A $94FA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B50B $94FB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B50C $94FC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B50D $94FD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B50E $94FE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B50F $94FF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B510 $9500: ------  .byte $00
  0x04B511 $9501: ------  .byte $00
  0x04B512 $9502: ------  .byte $00
  0x04B513 $9503: ------  .byte $10
  0x04B514 $9504: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B515 $9505: C-----  0D 07 39 ORA  $3907
  0x04B518 $9508: ------  .byte $FF
  0x04B519 $9509: ------  .byte $FF
  0x04B51A $950A: ------  .byte $FF
  0x04B51B $950B: ------  .byte $EF
  0x04B51C $950C: C-----  E0 F2    CPX  #$F2
  0x04B51E $950E: C-----  F8       SED  
  0x04B51F $950F: C-----  C6 04    DEC  $04
  0x04B521 $9511: ------  .byte $08
  0x04B522 $9512: ------  .byte $08
  0x04B523 $9513: ------  .byte $08
  0x04B524 $9514: ------  .byte $10
  0x04B525 $9515: ------  .byte $10
  0x04B526 $9516: ------  .byte $A0
  0x04B527 $9517: ------  .byte $20
  0x04B528 $9518: ------  .byte $F8
  0x04B529 $9519: ------  .byte $F0
  0x04B52A $951A: ------  .byte $F0
  0x04B52B $951B: ------  .byte $F0
  0x04B52C $951C: ------  .byte $E0
  0x04B52D $951D: ------  .byte $E0
  0x04B52E $951E: ------  .byte $40
  0x04B52F $951F: ------  .byte $C0
  0x04B530 $9520: C-----  00       BRK  
  0x04B531 $9521: C-----  C0 38    CPY  #$38
  0x04B533 $9523: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B534 $9524: C-----  00       BRK  
  0x04B535 $9525: C-----  00       BRK  
  0x04B536 $9526: C-----  00       BRK  
  0x04B537 $9527: C-----  00       BRK  
  0x04B538 $9528: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B539 $9529: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B53A $952A: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04B53B $952B: C-----  F8       SED  
  0x04B53C $952C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B53D $952D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B53E $952E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B53F $952F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B540 $9530: C-----  1E E7 78 ASL  $78E7,X
  0x04B543 $9533: C-----  1E C6 31 ASL  $31C6,X
  0x04B546 $9536: C-----  0D 02 E1 ORA  $E102
  0x04B549 $9539: C-----  18       CLC  
  0x04B54A $953A: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04B54B $953B: C-----  E1 39    SBC  ($39,X)
  0x04B54D $953D: C-----  CE F2 FD DEC  $FDF2
  0x04B550 $9540: C-----  F8       SED  
  0x04B551 $9541: C-----  30 60    BMI  $95A3
  0x04B553 $9543: C-----  C0 C0    CPY  #$C0
  0x04B555 $9545: C-----  E0 70    CPX  #$70
  0x04B557 $9547: C-----  18       CLC  
  0x04B558 $9548: C-----  1E 38 E0 ASL  $E038,X
  0x04B55B $954B: C-----  C0 C0    CPY  #$C0
  0x04B55D $954D: C-----  E0 70    CPX  #$70
  0x04B55F $954F: C-----  18       CLC  
  0x04B560 $9550: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B561 $9551: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04B562 $9552: C-----  06 03    ASL  $03
  0x04B564 $9554: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B565 $9555: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B566 $9556: C-----  0E 18 78 ASL  $7818
  0x04B569 $9559: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04B56A $955A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B56B $955B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B56C $955C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B56D $955D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B56E $955E: C-----  0E 18 40 ASL  $4018
  0x04B571 $9561: C-----  40       RTI  
  0x04B572 $9562: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B573 $9563: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B574 $9564: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B575 $9565: C-----  00       BRK  
  0x04B576 $9566: C-----  00       BRK  
  0x04B577 $9567: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B578 $9568: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B579 $9569: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B57A $956A: C-----  00       BRK  
  0x04B57B $956B: C-----  00       BRK  
  0x04B57C $956C: C-----  00       BRK  
  0x04B57D $956D: C-----  00       BRK  
  0x04B57E $956E: C-----  00       BRK  
  0x04B57F $956F: C-----  00       BRK  
  0x04B580 $9570: C-----  20 80 80 JSR  $8080
  0x04B583 $9573: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B584 $9574: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B585 $9575: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B586 $9576: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B587 $9577: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B588 $9578: C-----  A0 80    LDY  #$80
  0x04B58A $957A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B58B $957B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B58C $957C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B58D $957D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B58E $957E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B58F $957F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B590 $9580: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B591 $9581: C-----  70 0E    BVS  $9591
  0x04B593 $9583: C-----  E1 FC    SBC  ($FC,X)
  0x04B595 $9585: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B596 $9586: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B597 $9587: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B598 $9588: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B599 $9589: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04B59A $958A: C-----  F1 1E    SBC  ($1E),Y
  0x04B59C $958C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B59D $958D: C-----  00       BRK  
  0x04B59E $958E: C-----  C0 F0    CPY  #$F0
  0x04B5A0 $9590: C-----  00       BRK  
  0x04B5A1 $9591: C-----  00       BRK  
  0x04B5A2 $9592: C-----  00       BRK  
  0x04B5A3 $9593: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B5A4 $9594: C-----  60       RTS  
  0x04B5A5 $9595: C-----  18       CLC  
  0x04B5A6 $9596: C-----  C6 F1    DEC  $F1
  0x04B5A8 $9598: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B5A9 $9599: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B5AA $959A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B5AB $959B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B5AC $959C: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04B5AD $959D: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04B5AE $959E: C-----  39 0E FF AND  $FF0E,Y
  0x04B5B1 $95A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B5B2 $95A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B5B3 $95A3: C-----  FE FE FF INC  $FFFE,X
  0x04B5B6 $95A6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B5B7 $95A7: C-----  F1 F0    SBC  ($F0),Y
  0x04B5B9 $95A9: C-----  F9 FA FC SBC  $FCFA,Y
  0x04B5BC $95AC: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04B5BD $95AD: C-----  FE FE FF INC  $FFFE,X
  0x04B5C0 $95B0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04B5C1 $95B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B5C2 $95B2: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04B5C3 $95B3: C-----  4D 1A 00 EOR  $001A
  0x04B5C6 $95B6: C-----  00       BRK  
  0x04B5C7 $95B7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B5C8 $95B8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B5C9 $95B9: C-----  00       BRK  
  0x04B5CA $95BA: C-----  00       BRK  
  0x04B5CB $95BB: C-----  00       BRK  
  0x04B5CC $95BC: C-----  00       BRK  
  0x04B5CD $95BD: C-----  00       BRK  
  0x04B5CE $95BE: C-----  00       BRK  
  0x04B5CF $95BF: C-----  00       BRK  
  0x04B5D0 $95C0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B5D1 $95C1: C-----  40       RTI  
  0x04B5D2 $95C2: C-----  20 10 08 JSR  $0810
  0x04B5D5 $95C5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04B5D6 $95C6: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B5D7 $95C7: C-----  81 00    STA  ($00,X)
  0x04B5D9 $95C9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B5DA $95CA: C-----  C0 E0    CPY  #$E0
  0x04B5DC $95CC: C-----  F0 F8    BEQ  $95C6
  0x04B5DE $95CE: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04B5DF $95CF: C-----  7E 13 17 ROR  $1713,X
  0x04B5E2 $95D2: C-----  1D 8E 40 ORA  $408E,X
  0x04B5E5 $95D5: C-----  A0 10    LDY  #$10
  0x04B5E7 $95D7: C-----  00       BRK  
  0x04B5E8 $95D8: C-----  6C 68 22 JMP  ($2268)
  0x04B5EB $95DB: C-----  01 07    ORA  ($07,X)
  0x04B5ED $95DD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B5EE $95DE: C-----  00       BRK  
  0x04B5EF $95DF: C-----  00       BRK  
  0x04B5F0 $95E0: C-----  60       RTS  
  0x04B5F1 $95E1: C-----  18       CLC  
  0x04B5F2 $95E2: C-----  C6 31    DEC  $31
  0x04B5F4 $95E4: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04B5F5 $95E5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B5F6 $95E6: C-----  00       BRK  
  0x04B5F7 $95E7: C-----  00       BRK  
  0x04B5F8 $95E8: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04B5F9 $95E9: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04B5FA $95EA: C-----  39 0E 03 AND  $030E,Y
  0x04B5FD $95ED: C-----  00       BRK  
  0x04B5FE $95EE: C-----  00       BRK  
  0x04B5FF $95EF: C-----  00       BRK  
  0x04B600 $95F0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B601 $95F1: C-----  40       RTI  
  0x04B602 $95F2: C-----  20 90 48 JSR  $4890
  0x04B605 $95F5: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x04B606 $95F6: C-----  8A       TXA  
  0x04B607 $95F7: C-----  65 00    ADC  $00
  0x04B609 $95F9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B60A $95FA: C-----  C0 60    CPY  #$60
  0x04B60C $95FC: C-----  B0 C8    BCS  $95C6
  0x04B60E $95FE: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x04B60F $95FF: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x04B610 $9600: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B611 $9601: C-----  00       BRK  
  0x04B612 $9602: C-----  40       RTI  
  0x04B613 $9603: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B614 $9604: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B615 $9605: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B616 $9606: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B617 $9607: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B618 $9608: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04B619 $9609: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B61A $960A: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04B61B $960B: C-----  00       BRK  
  0x04B61C $960C: C-----  00       BRK  
  0x04B61D $960D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B61E $960E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B61F $960F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B620 $9610: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B621 $9611: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B622 $9612: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B623 $9613: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04B624 $9614: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B625 $9615: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B626 $9616: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B627 $9617: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B628 $9618: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B629 $9619: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B62A $961A: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04B62B $961B: C-----  39 00 FF AND  $FF00,Y
  0x04B62E $961E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B62F $961F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B630 $9620: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B631 $9621: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B632 $9622: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B633 $9623: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B634 $9624: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x04B635 $9625: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04B636 $9626: C-----  A8       TAY  
  0x04B637 $9627: C-----  00       BRK  
  0x04B638 $9628: C-----  FD F8 E0 SBC  $E0F8,X
  0x04B63B $962B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B63C $962C: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04B63D $962D: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x04B63E $962E: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04B63F $962F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B640 $9630: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B641 $9631: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B642 $9632: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B643 $9633: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B644 $9634: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B645 $9635: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B646 $9636: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B647 $9637: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B648 $9638: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B649 $9639: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B64A $963A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B64B $963B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B64C $963C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B64D $963D: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04B64E $963E: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04B64F $963F: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04B650 $9640: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B651 $9641: C-----  FE F8 F0 INC  $F0F8,X
  0x04B654 $9644: C-----  F0 E0    BEQ  $9626
  0x04B656 $9646: C-----  E8       INX  
  0x04B657 $9647: C-----  E4 FE    CPX  $FE
  0x04B659 $9649: C-----  F9 F7 EF SBC  $EFF7,Y
  0x04B65C $964C: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04B65D $964D: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04B65E $964E: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04B65F $964F: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x04B660 $9650: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B661 $9651: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B662 $9652: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B663 $9653: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B664 $9654: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B665 $9655: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B666 $9656: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B667 $9657: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B668 $9658: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B669 $9659: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04B66A $965A: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04B66B $965B: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04B66C $965C: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04B66D $965D: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04B66E $965E: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04B66F $965F: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04B670 $9660: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x04B671 $9661: C-----  C0 C0    CPY  #$C0
  0x04B673 $9663: C-----  C0 C0    CPY  #$C0
  0x04B675 $9665: C-----  E0 F1    CPX  #$F1
  0x04B677 $9667: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B678 $9668: C-----  BD BF BF LDA  $BFBF,X
  0x04B67B $966B: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04B67C $966C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B67D $966D: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04B67E $966E: C-----  EE F1 07 INC  $07F1
  0x04B681 $9671: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B682 $9672: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B683 $9673: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B684 $9674: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B685 $9675: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B686 $9676: C-----  FE FC FB INC  $FBFC,X
  0x04B689 $9679: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04B68A $967A: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04B68B $967B: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04B68C $967C: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04B68D $967D: C-----  7E FC F8 ROR  $F8FC,X
  0x04B690 $9680: C-----  00       BRK  
  0x04B691 $9681: C-----  00       BRK  
  0x04B692 $9682: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B693 $9683: C-----  E0 F8    CPX  #$F8
  0x04B695 $9685: C-----  FE FE FF INC  $FFFE,X
  0x04B698 $9688: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B699 $9689: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B69A $968A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B69B $968B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B69C $968C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B69D $968D: C-----  09 85    ORA  #$85
  0x04B69F $968F: C-----  C6 1F    DEC  $1F
  0x04B6A1 $9691: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B6A2 $9692: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04B6A3 $9693: C-----  0D 04 06 ORA  $0604
  0x04B6A6 $9696: C-----  05 04    ORA  $04
  0x04B6A8 $9698: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04B6A9 $9699: C-----  F1 F4    SBC  ($F4),Y
  0x04B6AB $969B: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x04B6AC $969C: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04B6AD $969D: C-----  F9 F8 F8 SBC  $F8F8,Y
  0x04B6B0 $96A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B6B1 $96A1: C-----  FE 7E FE INC  $FE7E,X
  0x04B6B4 $96A4: C-----  00       BRK  
  0x04B6B5 $96A5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B6B6 $96A6: C-----  00       BRK  
  0x04B6B7 $96A7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04B6B8 $96A8: C-----  00       BRK  
  0x04B6B9 $96A9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B6BA $96AA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B6BB $96AB: C-----  FE 00 FF INC  $FF00,X
  0x04B6BE $96AE: C-----  00       BRK  
  0x04B6BF $96AF: C-----  0E 00 00 ASL  $0000
  0x04B6C2 $96B2: C-----  00       BRK  
  0x04B6C3 $96B3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B6C4 $96B4: C-----  00       BRK  
  0x04B6C5 $96B5: C-----  E0 00    CPX  #$00
  0x04B6C7 $96B7: C-----  00       BRK  
  0x04B6C8 $96B8: C-----  10 10    BPL  $96CA
  0x04B6CA $96BA: C-----  10 DC    BPL  $9698
  0x04B6CC $96BC: C-----  0A       ASL  A
  0x04B6CD $96BD: C-----  EC EB 08 CPX  $08EB
  0x04B6D0 $96C0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B6D1 $96C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B6D2 $96C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B6D3 $96C3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B6D4 $96C4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B6D5 $96C5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B6D6 $96C6: C-----  1E 80 FF ASL  $FF80,X
  0x04B6D9 $96C9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B6DA $96CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B6DB $96CB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B6DC $96CC: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B6DD $96CD: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x04B6DE $96CE: C-----  E1 7F    SBC  ($7F,X)
  0x04B6E0 $96D0: C-----  F8       SED  
  0x04B6E1 $96D1: C-----  F0 E0    BEQ  $96B3
  0x04B6E3 $96D3: C-----  C0 81    CPY  #$81
  0x04B6E5 $96D5: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B6E6 $96D6: C-----  01 00    ORA  ($00,X)
  0x04B6E8 $96D8: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04B6E9 $96D9: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04B6EA $96DA: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04B6EB $96DB: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04B6EC $96DC: C-----  7E FD FE ROR  $FEFD,X
  0x04B6EF $96DF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B6F0 $96E0: C-----  00       BRK  
  0x04B6F1 $96E1: C-----  00       BRK  
  0x04B6F2 $96E2: C-----  00       BRK  
  0x04B6F3 $96E3: C-----  00       BRK  
  0x04B6F4 $96E4: C-----  00       BRK  
  0x04B6F5 $96E5: C-----  00       BRK  
  0x04B6F6 $96E6: C-----  00       BRK  
  0x04B6F7 $96E7: C-----  00       BRK  
  0x04B6F8 $96E8: C-----  00       BRK  
  0x04B6F9 $96E9: C-----  00       BRK  
  0x04B6FA $96EA: C-----  00       BRK  
  0x04B6FB $96EB: C-----  00       BRK  
  0x04B6FC $96EC: C-----  00       BRK  
  0x04B6FD $96ED: C-----  00       BRK  
  0x04B6FE $96EE: C-----  00       BRK  
  0x04B6FF $96EF: C-----  C0 00    CPY  #$00
  0x04B701 $96F1: C-----  00       BRK  
  0x04B702 $96F2: C-----  00       BRK  
  0x04B703 $96F3: C-----  00       BRK  
  0x04B704 $96F4: C-----  00       BRK  
  0x04B705 $96F5: C-----  00       BRK  
  0x04B706 $96F6: C-----  00       BRK  
  0x04B707 $96F7: C-----  00       BRK  
  0x04B708 $96F8: C-----  00       BRK  
  0x04B709 $96F9: C-----  00       BRK  
  0x04B70A $96FA: C-----  00       BRK  
  0x04B70B $96FB: C-----  00       BRK  
  0x04B70C $96FC: C-----  00       BRK  
  0x04B70D $96FD: C-----  00       BRK  
  0x04B70E $96FE: C-----  01 06    ORA  ($06,X)
  0x04B710 $9700: C-----  E0 E0    CPX  #$E0
  0x04B712 $9702: C-----  F0 FC    BEQ  $9700
  0x04B714 $9704: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B715 $9705: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B716 $9706: C-----  F0 E0    BEQ  $96E8
  0x04B718 $9708: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B719 $9709: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B71A $970A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B71B $970B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B71C $970C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B71D $970D: C-----  E0 C0    CPX  #$C0
  0x04B71F $970F: C-----  C0 40    CPY  #$40
  0x04B721 $9711: C-----  00       BRK  
  0x04B722 $9712: C-----  20 60 C0 JSR  $C060
  0x04B725 $9715: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B726 $9716: C-----  00       BRK  
  0x04B727 $9717: C-----  00       BRK  
  0x04B728 $9718: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B729 $9719: C-----  C0 C0    CPY  #$C0
  0x04B72B $971B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B72C $971C: C-----  00       BRK  
  0x04B72D $971D: C-----  00       BRK  
  0x04B72E $971E: C-----  00       BRK  
  0x04B72F $971F: C-----  00       BRK  
  0x04B730 $9720: C-----  E0 C0    CPX  #$C0
  0x04B732 $9722: C-----  C0 C0    CPY  #$C0
  0x04B734 $9724: C-----  A0 10    LDY  #$10
  0x04B736 $9726: C-----  08       PHP  
  0x04B737 $9727: C-----  08       PHP  
  0x04B738 $9728: C-----  C0 80    CPY  #$80
  0x04B73A $972A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B73B $972B: C-----  00       BRK  
  0x04B73C $972C: C-----  40       RTI  
  0x04B73D $972D: C-----  E0 F0    CPX  #$F0
  0x04B73F $972F: C-----  F0 1C    BEQ  $974D
  0x04B741 $9731: C-----  0E 0B 0D ASL  $0D0B
  0x04B744 $9734: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04B745 $9735: C-----  06 07    ASL  $07
  0x04B747 $9737: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B748 $9738: C-----  00       BRK  
  0x04B749 $9739: C-----  00       BRK  
  0x04B74A $973A: C-----  00       BRK  
  0x04B74B $973B: C-----  00       BRK  
  0x04B74C $973C: C-----  00       BRK  
  0x04B74D $973D: C-----  00       BRK  
  0x04B74E $973E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B74F $973F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B750 $9740: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x04B751 $9741: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04B752 $9742: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B753 $9743: C-----  01 00    ORA  ($00,X)
  0x04B755 $9745: C-----  00       BRK  
  0x04B756 $9746: C-----  00       BRK  
  0x04B757 $9747: C-----  00       BRK  
  0x04B758 $9748: C-----  0D 03 01 ORA  $0103
  0x04B75B $974B: C-----  00       BRK  
  0x04B75C $974C: C-----  00       BRK  
  0x04B75D $974D: C-----  00       BRK  
  0x04B75E $974E: C-----  00       BRK  
  0x04B75F $974F: C-----  00       BRK  
  0x04B760 $9750: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B761 $9751: C-----  40       RTI  
  0x04B762 $9752: C-----  20 90 48 JSR  $4890
  0x04B765 $9755: C-----  38       SEC  
  0x04B766 $9756: C-----  00       BRK  
  0x04B767 $9757: C-----  00       BRK  
  0x04B768 $9758: C-----  00       BRK  
  0x04B769 $9759: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B76A $975A: C-----  C0 60    CPY  #$60
  0x04B76C $975C: C-----  30 00    BMI  $975E
  0x04B76E $975E: C-----  00       BRK  
  0x04B76F $975F: C-----  00       BRK  
  0x04B770 $9760: C-----  00       BRK  
  0x04B771 $9761: C-----  00       BRK  
  0x04B772 $9762: C-----  00       BRK  
  0x04B773 $9763: C-----  00       BRK  
  0x04B774 $9764: C-----  00       BRK  
  0x04B775 $9765: C-----  00       BRK  
  0x04B776 $9766: C-----  00       BRK  
  0x04B777 $9767: C-----  00       BRK  
  0x04B778 $9768: C-----  20 10 D0 JSR  $D010
  0x04B77B $976B: C-----  48       PHA  
  0x04B77C $976C: C-----  88       DEY  
  0x04B77D $976D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B77E $976E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B77F $976F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B780 $9770: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04B781 $9771: C-----  00       BRK  
  0x04B782 $9772: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B783 $9773: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B784 $9774: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B785 $9775: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B786 $9776: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04B787 $9777: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04B788 $9778: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04B789 $9779: C-----  01 02    ORA  ($02,X)
  0x04B78B $977B: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B78C $977C: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B78D $977D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B78E $977E: C-----  06 04    ASL  $04
  0x04B790 $9780: C-----  18       CLC  
  0x04B791 $9781: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04B792 $9782: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04B793 $9783: C-----  2A       ROL  A
  0x04B794 $9784: C-----  56 AB    LSR  $AB,X
  0x04B796 $9786: C-----  40       RTI  
  0x04B797 $9787: C-----  00       BRK  
  0x04B798 $9788: C-----  E0 F0    CPX  #$F0
  0x04B79A $978A: C-----  A8       TAY  
  0x04B79B $978B: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x04B79C $978C: C-----  A8       TAY  
  0x04B79D $978D: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04B79E $978E: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04B79F $978F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B7A0 $9790: C-----  00       BRK  
  0x04B7A1 $9791: C-----  00       BRK  
  0x04B7A2 $9792: C-----  00       BRK  
  0x04B7A3 $9793: C-----  00       BRK  
  0x04B7A4 $9794: C-----  00       BRK  
  0x04B7A5 $9795: C-----  00       BRK  
  0x04B7A6 $9796: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B7A7 $9797: C-----  40       RTI  
  0x04B7A8 $9798: C-----  00       BRK  
  0x04B7A9 $9799: C-----  00       BRK  
  0x04B7AA $979A: C-----  00       BRK  
  0x04B7AB $979B: C-----  00       BRK  
  0x04B7AC $979C: C-----  00       BRK  
  0x04B7AD $979D: C-----  00       BRK  
  0x04B7AE $979E: C-----  00       BRK  
  0x04B7AF $979F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B7B0 $97A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B7B1 $97A1: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04B7B2 $97A2: C-----  C0 00    CPY  #$00
  0x04B7B4 $97A4: C-----  01 03    ORA  ($03,X)
  0x04B7B6 $97A6: C-----  00       BRK  
  0x04B7B7 $97A7: C-----  00       BRK  
  0x04B7B8 $97A8: C-----  00       BRK  
  0x04B7B9 $97A9: C-----  00       BRK  
  0x04B7BA $97AA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B7BB $97AB: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04B7BC $97AC: C-----  C1 03    CMP  ($03,X)
  0x04B7BE $97AE: C-----  00       BRK  
  0x04B7BF $97AF: C-----  00       BRK  
  0x04B7C0 $97B0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B7C1 $97B1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B7C2 $97B2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B7C3 $97B3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B7C4 $97B4: C-----  00       BRK  
  0x04B7C5 $97B5: C-----  00       BRK  
  0x04B7C6 $97B6: C-----  00       BRK  
  0x04B7C7 $97B7: C-----  00       BRK  
  0x04B7C8 $97B8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B7C9 $97B9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B7CA $97BA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B7CB $97BB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B7CC $97BC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B7CD $97BD: C-----  00       BRK  
  0x04B7CE $97BE: C-----  00       BRK  
  0x04B7CF $97BF: C-----  00       BRK  
  0x04B7D0 $97C0: C-----  00       BRK  
  0x04B7D1 $97C1: C-----  00       BRK  
  0x04B7D2 $97C2: C-----  00       BRK  
  0x04B7D3 $97C3: C-----  00       BRK  
  0x04B7D4 $97C4: C-----  00       BRK  
  0x04B7D5 $97C5: C-----  00       BRK  
  0x04B7D6 $97C6: C-----  00       BRK  
  0x04B7D7 $97C7: C-----  00       BRK  
  0x04B7D8 $97C8: C-----  40       RTI  
  0x04B7D9 $97C9: C-----  40       RTI  
  0x04B7DA $97CA: C-----  40       RTI  
  0x04B7DB $97CB: C-----  40       RTI  
  0x04B7DC $97CC: C-----  40       RTI  
  0x04B7DD $97CD: C-----  A0 A0    LDY  #$A0
  0x04B7DF $97CF: C-----  20 04 04 JSR  $0404
  0x04B7E2 $97D2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04B7E3 $97D3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04B7E4 $97D4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B7E5 $97D5: C-----  00       BRK  
  0x04B7E6 $97D6: C-----  00       BRK  
  0x04B7E7 $97D7: C-----  00       BRK  
  0x04B7E8 $97D8: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04B7E9 $97D9: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04B7EA $97DA: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04B7EB $97DB: C-----  06 03    ASL  $03
  0x04B7ED $97DD: C-----  00       BRK  
  0x04B7EE $97DE: C-----  00       BRK  
  0x04B7EF $97DF: C-----  00       BRK  
  0x04B7F0 $97E0: C-----  00       BRK  
  0x04B7F1 $97E1: C-----  00       BRK  
  0x04B7F2 $97E2: C-----  00       BRK  
  0x04B7F3 $97E3: C-----  00       BRK  
  0x04B7F4 $97E4: C-----  00       BRK  
  0x04B7F5 $97E5: C-----  00       BRK  
  0x04B7F6 $97E6: C-----  00       BRK  
  0x04B7F7 $97E7: C-----  00       BRK  
  0x04B7F8 $97E8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B7F9 $97E9: C-----  01 01    ORA  ($01,X)
  0x04B7FB $97EB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B7FC $97EC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B7FD $97ED: C-----  06 08    ASL  $08
  0x04B7FF $97EF: C-----  00       BRK  
  0x04B800 $97F0: C-----  00       BRK  
  0x04B801 $97F1: C-----  00       BRK  
  0x04B802 $97F2: C-----  00       BRK  
  0x04B803 $97F3: C-----  00       BRK  
  0x04B804 $97F4: C-----  00       BRK  
  0x04B805 $97F5: C-----  00       BRK  
  0x04B806 $97F6: C-----  00       BRK  
  0x04B807 $97F7: C-----  00       BRK  
  0x04B808 $97F8: C-----  C0 E0    CPY  #$E0
  0x04B80A $97FA: C-----  F0 F8    BEQ  $97F4
  0x04B80C $97FC: C-----  18       CLC  
  0x04B80D $97FD: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04B80E $97FE: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04B80F $97FF: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B810 $9800: C-----  00       BRK  
  0x04B811 $9801: C-----  00       BRK  
  0x04B812 $9802: C-----  00       BRK  
  0x04B813 $9803: C-----  00       BRK  
  0x04B814 $9804: C-----  00       BRK  
  0x04B815 $9805: C-----  00       BRK  
  0x04B816 $9806: C-----  00       BRK  
  0x04B817 $9807: C-----  00       BRK  
  0x04B818 $9808: C-----  00       BRK  
  0x04B819 $9809: C-----  00       BRK  
  0x04B81A $980A: C-----  00       BRK  
  0x04B81B $980B: C-----  00       BRK  
  0x04B81C $980C: C-----  00       BRK  
  0x04B81D $980D: C-----  00       BRK  
  0x04B81E $980E: C-----  00       BRK  
  0x04B81F $980F: C-----  00       BRK  
  0x04B820 $9810: C-----  00       BRK  
  0x04B821 $9811: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04B822 $9812: C-----  36 63    ROL  $63,X
  0x04B824 $9814: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B825 $9815: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B826 $9816: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B827 $9817: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B828 $9818: C-----  00       BRK  
  0x04B829 $9819: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04B82A $981A: C-----  36 63    ROL  $63,X
  0x04B82C $981C: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B82D $981D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B82E $981E: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B82F $981F: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B830 $9820: C-----  00       BRK  
  0x04B831 $9821: C-----  7E 63 63 ROR  $6363,X
  0x04B834 $9824: C-----  7E 63 63 ROR  $6363,X
  0x04B837 $9827: C-----  7E 00 7E ROR  $7E00,X
  0x04B83A $982A: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B83B $982B: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B83C $982C: C-----  7E 63 63 ROR  $6363,X
  0x04B83F $982F: C-----  7E 00 1E ROR  $1E00,X
  0x04B842 $9832: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x04B843 $9833: C-----  60       RTS  
  0x04B844 $9834: C-----  60       RTS  
  0x04B845 $9835: C-----  60       RTS  
  0x04B846 $9836: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x04B847 $9837: C-----  1E 00 1E ASL  $1E00,X
  0x04B84A $983A: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x04B84B $983B: C-----  60       RTS  
  0x04B84C $983C: C-----  60       RTS  
  0x04B84D $983D: C-----  60       RTS  
  0x04B84E $983E: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x04B84F $983F: C-----  1E 00 7C ASL  $7C00,X
  0x04B852 $9842: C-----  66 63    ROR  $63
  0x04B854 $9844: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B855 $9845: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B856 $9846: C-----  66 7C    ROR  $7C
  0x04B858 $9848: C-----  00       BRK  
  0x04B859 $9849: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04B85A $984A: C-----  66 63    ROR  $63
  0x04B85C $984C: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B85D $984D: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B85E $984E: C-----  66 7C    ROR  $7C
  0x04B860 $9850: C-----  00       BRK  
  0x04B861 $9851: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B862 $9852: C-----  60       RTS  
  0x04B863 $9853: C-----  60       RTS  
  0x04B864 $9854: C-----  7E 60 60 ROR  $6060,X
  0x04B867 $9857: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B868 $9858: C-----  00       BRK  
  0x04B869 $9859: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B86A $985A: C-----  60       RTS  
  0x04B86B $985B: C-----  60       RTS  
  0x04B86C $985C: C-----  7E 60 60 ROR  $6060,X
  0x04B86F $985F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B870 $9860: C-----  00       BRK  
  0x04B871 $9861: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B872 $9862: C-----  60       RTS  
  0x04B873 $9863: C-----  60       RTS  
  0x04B874 $9864: C-----  7E 60 60 ROR  $6060,X
  0x04B877 $9867: C-----  60       RTS  
  0x04B878 $9868: C-----  00       BRK  
  0x04B879 $9869: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B87A $986A: C-----  60       RTS  
  0x04B87B $986B: C-----  60       RTS  
  0x04B87C $986C: C-----  7E 60 60 ROR  $6060,X
  0x04B87F $986F: C-----  60       RTS  
  0x04B880 $9870: C-----  00       BRK  
  0x04B881 $9871: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B882 $9872: C-----  30 60    BMI  $98D4
  0x04B884 $9874: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x04B885 $9875: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B886 $9876: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x04B887 $9877: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B888 $9878: C-----  00       BRK  
  0x04B889 $9879: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B88A $987A: C-----  30 60    BMI  $98DC
  0x04B88C $987C: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x04B88D $987D: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B88E $987E: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x04B88F $987F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B890 $9880: C-----  00       BRK  
  0x04B891 $9881: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04B892 $9882: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B893 $9883: C-----  70 60    BVS  $98E5
  0x04B895 $9885: C-----  60       RTS  
  0x04B896 $9886: C-----  60       RTS  
  0x04B897 $9887: C-----  60       RTS  
  0x04B898 $9888: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B899 $9889: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B89A $988A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B89B $988B: C-----  F0 E7    BEQ  $9874
  0x04B89D $988D: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04B89E $988E: C-----  EC EC 00 CPX  $00EC
  0x04B8A1 $9891: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B8A2 $9892: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B8A3 $9893: C-----  00       BRK  
  0x04B8A4 $9894: C-----  00       BRK  
  0x04B8A5 $9895: C-----  00       BRK  
  0x04B8A6 $9896: C-----  00       BRK  
  0x04B8A7 $9897: C-----  00       BRK  
  0x04B8A8 $9898: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B8A9 $9899: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B8AA $989A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B8AB $989B: C-----  00       BRK  
  0x04B8AC $989C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B8AD $989D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B8AE $989E: C-----  00       BRK  
  0x04B8AF $989F: C-----  00       BRK  
  0x04B8B0 $98A0: C-----  60       RTS  
  0x04B8B1 $98A1: C-----  60       RTS  
  0x04B8B2 $98A2: C-----  60       RTS  
  0x04B8B3 $98A3: C-----  60       RTS  
  0x04B8B4 $98A4: C-----  60       RTS  
  0x04B8B5 $98A5: C-----  60       RTS  
  0x04B8B6 $98A6: C-----  60       RTS  
  0x04B8B7 $98A7: C-----  60       RTS  
  0x04B8B8 $98A8: C-----  EC EC EC CPX  $ECEC
  0x04B8BB $98AB: C-----  EC EC EC CPX  $ECEC
  0x04B8BE $98AE: C-----  EC EC 00 CPX  $00EC
  0x04B8C1 $98B1: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B8C2 $98B2: C-----  66 6C    ROR  $6C
  0x04B8C4 $98B4: C-----  78       SEI  
  0x04B8C5 $98B5: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04B8C6 $98B6: C-----  6E 67 00 ROR  $0067
  0x04B8C9 $98B9: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B8CA $98BA: C-----  66 6C    ROR  $6C
  0x04B8CC $98BC: C-----  78       SEI  
  0x04B8CD $98BD: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04B8CE $98BE: C-----  6E 67 00 ROR  $0067
  0x04B8D1 $98C1: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B8D2 $98C2: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04B8D3 $98C3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B8D4 $98C4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B8D5 $98C5: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x04B8D6 $98C6: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B8D7 $98C7: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B8D8 $98C8: C-----  00       BRK  
  0x04B8D9 $98C9: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B8DA $98CA: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04B8DB $98CB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B8DC $98CC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B8DD $98CD: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x04B8DE $98CE: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B8DF $98CF: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B8E0 $98D0: C-----  00       BRK  
  0x04B8E1 $98D1: C-----  7E 63 63 ROR  $6363,X
  0x04B8E4 $98D4: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B8E5 $98D5: C-----  7E 60 60 ROR  $6060,X
  0x04B8E8 $98D8: C-----  00       BRK  
  0x04B8E9 $98D9: C-----  7E 63 63 ROR  $6363,X
  0x04B8EC $98DC: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B8ED $98DD: C-----  7E 60 60 ROR  $6060,X
  0x04B8F0 $98E0: C-----  60       RTS  
  0x04B8F1 $98E1: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x04B8F2 $98E2: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x04B8F3 $98E3: C-----  40       RTI  
  0x04B8F4 $98E4: C-----  00       BRK  
  0x04B8F5 $98E5: C-----  00       BRK  
  0x04B8F6 $98E6: C-----  00       BRK  
  0x04B8F7 $98E7: C-----  00       BRK  
  0x04B8F8 $98E8: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04B8F9 $98E9: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04B8FA $98EA: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04B8FB $98EB: C-----  F0 7F    BEQ  $996C
  0x04B8FD $98ED: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B8FE $98EE: C-----  00       BRK  
  0x04B8FF $98EF: C-----  00       BRK  
  0x04B900 $98F0: C-----  00       BRK  
  0x04B901 $98F1: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04B902 $98F2: C-----  66 60    ROR  $60
  0x04B904 $98F4: C-----  3E 03 63 ROL  $6303,X
  0x04B907 $98F7: C-----  3E 00 3C ROL  $3C00,X
  0x04B90A $98FA: C-----  66 60    ROR  $60
  0x04B90C $98FC: C-----  3E 03 63 ROL  $6303,X
  0x04B90F $98FF: C-----  3E 00 F0 ROL  $F000,X
  0x04B912 $9902: C-----  F0 00    BEQ  $9904
  0x04B914 $9904: C-----  00       BRK  
  0x04B915 $9905: C-----  20 60 60 JSR  $6060
  0x04B918 $9908: C-----  F0 F8    BEQ  $9902
  0x04B91A $990A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04B91B $990B: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04B91C $990C: C-----  CC EC EC CPY  $ECEC
  0x04B91F $990F: C-----  EC 00 63 CPX  $6300
  0x04B922 $9912: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B923 $9913: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B924 $9914: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B925 $9915: C-----  36 1C    ROL  $1C,X
  0x04B927 $9917: C-----  08       PHP  
  0x04B928 $9918: C-----  00       BRK  
  0x04B929 $9919: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B92A $991A: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B92B $991B: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B92C $991C: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B92D $991D: C-----  36 1C    ROL  $1C,X
  0x04B92F $991F: C-----  08       PHP  
  0x04B930 $9920: C-----  00       BRK  
  0x04B931 $9921: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B932 $9922: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B933 $9923: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x04B934 $9924: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B935 $9925: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B936 $9926: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04B937 $9927: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x04B938 $9928: C-----  00       BRK  
  0x04B939 $9929: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B93A $992A: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04B93B $992B: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x04B93C $992C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B93D $992D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B93E $992E: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04B93F $992F: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x04B940 $9930: C-----  60       RTS  
  0x04B941 $9931: C-----  E0 C0    CPX  #$C0
  0x04B943 $9933: C-----  00       BRK  
  0x04B944 $9934: C-----  00       BRK  
  0x04B945 $9935: C-----  00       BRK  
  0x04B946 $9936: C-----  00       BRK  
  0x04B947 $9937: C-----  00       BRK  
  0x04B948 $9938: C-----  EC EC CC CPX  $CCEC
  0x04B94B $993B: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04B94C $993C: C-----  F8       SED  
  0x04B94D $993D: C-----  F0 00    BEQ  $993F
  0x04B94F $993F: C-----  00       BRK  
  0x04B950 $9940: C-----  00       BRK  
  0x04B951 $9941: C-----  00       BRK  
  0x04B952 $9942: C-----  00       BRK  
  0x04B953 $9943: C-----  00       BRK  
  0x04B954 $9944: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B955 $9945: C-----  09 04    ORA  #$04
  0x04B957 $9947: C-----  00       BRK  
  0x04B958 $9948: C-----  00       BRK  
  0x04B959 $9949: C-----  00       BRK  
  0x04B95A $994A: C-----  00       BRK  
  0x04B95B $994B: C-----  00       BRK  
  0x04B95C $994C: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04B95D $994D: C-----  09 04    ORA  #$04
  0x04B95F $994F: C-----  00       BRK  
  0x04B960 $9950: C-----  00       BRK  
  0x04B961 $9951: C-----  00       BRK  
  0x04B962 $9952: C-----  00       BRK  
  0x04B963 $9953: C-----  00       BRK  
  0x04B964 $9954: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B965 $9955: C-----  05 07    ORA  $07
  0x04B967 $9957: C-----  00       BRK  
  0x04B968 $9958: C-----  00       BRK  
  0x04B969 $9959: C-----  00       BRK  
  0x04B96A $995A: C-----  00       BRK  
  0x04B96B $995B: C-----  00       BRK  
  0x04B96C $995C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04B96D $995D: C-----  05 07    ORA  $07
  0x04B96F $995F: C-----  00       BRK  
  0x04B970 $9960: C-----  38       SEC  
  0x04B971 $9961: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04B972 $9962: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04B973 $9963: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04B974 $9964: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04B975 $9965: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04B976 $9966: C-----  38       SEC  
  0x04B977 $9967: C-----  00       BRK  
  0x04B978 $9968: C-----  38       SEC  
  0x04B979 $9969: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04B97A $996A: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04B97B $996B: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04B97C $996C: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04B97D $996D: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04B97E $996E: C-----  38       SEC  
  0x04B97F $996F: C-----  00       BRK  
  0x04B980 $9970: C-----  38       SEC  
  0x04B981 $9971: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04B982 $9972: C-----  FE FF FF INC  $FFFF,X
  0x04B985 $9975: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04B986 $9976: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04B987 $9977: C-----  1E 38 54 ASL  $5438,X
  0x04B98A $997A: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04B98B $997B: C-----  B4 E2    LDY  $E2,X
  0x04B98D $997D: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04B98E $997E: C-----  28       PLP  
  0x04B98F $997F: C-----  00       BRK  
  0x04B990 $9980: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B991 $9981: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B992 $9982: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B993 $9983: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B994 $9984: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B995 $9985: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B996 $9986: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B997 $9987: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B998 $9988: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B999 $9989: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B99A $998A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B99B $998B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B99C $998C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B99D $998D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B99E $998E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B99F $998F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B9A0 $9990: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9A1 $9991: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9A2 $9992: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9A3 $9993: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9A4 $9994: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9A5 $9995: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9A6 $9996: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9A7 $9997: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9A8 $9998: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9A9 $9999: C-----  01 01    ORA  ($01,X)
  0x04B9AB $999B: C-----  01 01    ORA  ($01,X)
  0x04B9AD $999D: C-----  01 01    ORA  ($01,X)
  0x04B9AF $999F: C-----  01 FF    ORA  ($FF,X)
  0x04B9B1 $99A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9B2 $99A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9B3 $99A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9B4 $99A4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9B5 $99A5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9B6 $99A6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9B7 $99A7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9B8 $99A8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B9B9 $99A9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B9BA $99AA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B9BB $99AB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B9BC $99AC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B9BD $99AD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B9BE $99AE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04B9BF $99AF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9C0 $99B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9C1 $99B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9C2 $99B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9C3 $99B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9C4 $99B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9C5 $99B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9C6 $99B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9C7 $99B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04B9C8 $99B8: C-----  01 01    ORA  ($01,X)
  0x04B9CA $99BA: C-----  01 01    ORA  ($01,X)
  0x04B9CC $99BC: C-----  01 01    ORA  ($01,X)
  0x04B9CE $99BE: C-----  01 FF    ORA  ($FF,X)
  0x04B9D0 $99C0: C-----  00       BRK  
  0x04B9D1 $99C1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B9D2 $99C2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B9D3 $99C3: C-----  1E 38 30 ASL  $3038,X
  0x04B9D6 $99C6: C-----  70 60    BVS  $9A28
  0x04B9D8 $99C8: C-----  00       BRK  
  0x04B9D9 $99C9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04B9DA $99CA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04B9DB $99CB: C-----  1E 38 30 ASL  $3038,X
  0x04B9DE $99CE: C-----  70 60    BVS  $9A30
  0x04B9E0 $99D0: C-----  00       BRK  
  0x04B9E1 $99D1: C-----  C0 F0    CPY  #$F0
  0x04B9E3 $99D3: C-----  78       SEI  
  0x04B9E4 $99D4: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04B9E5 $99D5: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04B9E6 $99D6: C-----  0E 06 00 ASL  $0006
  0x04B9E9 $99D9: C-----  C0 F0    CPY  #$F0
  0x04B9EB $99DB: C-----  78       SEI  
  0x04B9EC $99DC: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04B9ED $99DD: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04B9EE $99DE: C-----  0E 06 60 ASL  $6006
  0x04B9F1 $99E1: C-----  70 30    BVS  $9A13
  0x04B9F3 $99E3: C-----  38       SEC  
  0x04B9F4 $99E4: C-----  1E 0F 03 ASL  $030F,X
  0x04B9F7 $99E7: C-----  00       BRK  
  0x04B9F8 $99E8: C-----  60       RTS  
  0x04B9F9 $99E9: C-----  70 30    BVS  $9A1B
  0x04B9FB $99EB: C-----  38       SEC  
  0x04B9FC $99EC: C-----  1E 0F 03 ASL  $030F,X
  0x04B9FF $99EF: C-----  00       BRK  
  0x04BA00 $99F0: C-----  06 0E    ASL  $0E
  0x04BA02 $99F2: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04BA03 $99F3: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04BA04 $99F4: C-----  78       SEI  
  0x04BA05 $99F5: C-----  F0 C0    BEQ  $99B7
  0x04BA07 $99F7: C-----  00       BRK  
  0x04BA08 $99F8: C-----  06 0E    ASL  $0E
  0x04BA0A $99FA: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04BA0B $99FB: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04BA0C $99FC: C-----  78       SEI  
  0x04BA0D $99FD: C-----  F0 C0    BEQ  $99BF
  0x04BA0F $99FF: C-----  00       BRK  
  0x04BA10 $9A00: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA11 $9A01: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA12 $9A02: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA13 $9A03: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA14 $9A04: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA15 $9A05: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA16 $9A06: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA17 $9A07: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA18 $9A08: C-----  00       BRK  
  0x04BA19 $9A09: C-----  00       BRK  
  0x04BA1A $9A0A: C-----  00       BRK  
  0x04BA1B $9A0B: C-----  00       BRK  
  0x04BA1C $9A0C: C-----  00       BRK  
  0x04BA1D $9A0D: C-----  00       BRK  
  0x04BA1E $9A0E: C-----  00       BRK  
  0x04BA1F $9A0F: C-----  00       BRK  
  0x04BA20 $9A10: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA21 $9A11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA22 $9A12: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA23 $9A13: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA24 $9A14: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA25 $9A15: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA26 $9A16: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA27 $9A17: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA28 $9A18: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA29 $9A19: C-----  81 81    STA  ($81,X)
  0x04BA2B $9A1B: C-----  81 81    STA  ($81,X)
  0x04BA2D $9A1D: C-----  81 81    STA  ($81,X)
  0x04BA2F $9A1F: C-----  81 FF    STA  ($FF,X)
  0x04BA31 $9A21: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04BA32 $9A22: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA33 $9A23: C-----  D5 FF    CMP  $FF,X
  0x04BA35 $9A25: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04BA36 $9A26: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA37 $9A27: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA38 $9A28: C-----  00       BRK  
  0x04BA39 $9A29: C-----  10 3C    BPL  $9A67
  0x04BA3B $9A2B: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04BA3C $9A2C: C-----  7E 14 18 ROR  $1814,X
  0x04BA3F $9A2F: C-----  00       BRK  
  0x04BA40 $9A30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA41 $9A31: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA42 $9A32: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA43 $9A33: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA44 $9A34: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA45 $9A35: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA46 $9A36: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA47 $9A37: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA48 $9A38: C-----  81 81    STA  ($81,X)
  0x04BA4A $9A3A: C-----  81 81    STA  ($81,X)
  0x04BA4C $9A3C: C-----  81 81    STA  ($81,X)
  0x04BA4E $9A3E: C-----  81 FF    STA  ($FF,X)
  0x04BA50 $9A40: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA51 $9A41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA52 $9A42: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA53 $9A43: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA54 $9A44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA55 $9A45: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA56 $9A46: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA57 $9A47: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA58 $9A48: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04BA59 $9A49: C-----  19 21 41 ORA  $4121,Y
  0x04BA5C $9A4C: C-----  41 81    EOR  ($81,X)
  0x04BA5E $9A4E: C-----  81 81    STA  ($81,X)
  0x04BA60 $9A50: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA61 $9A51: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA62 $9A52: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA63 $9A53: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA64 $9A54: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA65 $9A55: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA66 $9A56: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA67 $9A57: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA68 $9A58: C-----  C0 30    CPY  #$30
  0x04BA6A $9A5A: C-----  08       PHP  
  0x04BA6B $9A5B: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04BA6C $9A5C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04BA6D $9A5D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04BA6E $9A5E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04BA6F $9A5F: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04BA70 $9A60: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA71 $9A61: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA72 $9A62: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA73 $9A63: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA74 $9A64: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA75 $9A65: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA76 $9A66: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA77 $9A67: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA78 $9A68: C-----  81 81    STA  ($81,X)
  0x04BA7A $9A6A: C-----  81 41    STA  ($41,X)
  0x04BA7C $9A6C: C-----  41 21    EOR  ($21,X)
  0x04BA7E $9A6E: C-----  19 07 FF ORA  $FF07,Y
  0x04BA81 $9A71: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA82 $9A72: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA83 $9A73: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA84 $9A74: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA85 $9A75: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA86 $9A76: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA87 $9A77: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA88 $9A78: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04BA89 $9A79: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04BA8A $9A7A: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04BA8B $9A7B: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04BA8C $9A7C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04BA8D $9A7D: C-----  08       PHP  
  0x04BA8E $9A7E: C-----  30 C0    BMI  $9A40
  0x04BA90 $9A80: C-----  00       BRK  
  0x04BA91 $9A81: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA92 $9A82: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA93 $9A83: C-----  00       BRK  
  0x04BA94 $9A84: C-----  00       BRK  
  0x04BA95 $9A85: C-----  00       BRK  
  0x04BA96 $9A86: C-----  00       BRK  
  0x04BA97 $9A87: C-----  00       BRK  
  0x04BA98 $9A88: C-----  00       BRK  
  0x04BA99 $9A89: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA9A $9A8A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BA9B $9A8B: C-----  00       BRK  
  0x04BA9C $9A8C: C-----  00       BRK  
  0x04BA9D $9A8D: C-----  00       BRK  
  0x04BA9E $9A8E: C-----  00       BRK  
  0x04BA9F $9A8F: C-----  00       BRK  
  0x04BAA0 $9A90: C-----  00       BRK  
  0x04BAA1 $9A91: C-----  00       BRK  
  0x04BAA2 $9A92: C-----  00       BRK  
  0x04BAA3 $9A93: C-----  00       BRK  
  0x04BAA4 $9A94: C-----  00       BRK  
  0x04BAA5 $9A95: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAA6 $9A96: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAA7 $9A97: C-----  00       BRK  
  0x04BAA8 $9A98: C-----  00       BRK  
  0x04BAA9 $9A99: C-----  00       BRK  
  0x04BAAA $9A9A: C-----  00       BRK  
  0x04BAAB $9A9B: C-----  00       BRK  
  0x04BAAC $9A9C: C-----  00       BRK  
  0x04BAAD $9A9D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAAE $9A9E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAAF $9A9F: C-----  00       BRK  
  0x04BAB0 $9AA0: C-----  60       RTS  
  0x04BAB1 $9AA1: C-----  60       RTS  
  0x04BAB2 $9AA2: C-----  60       RTS  
  0x04BAB3 $9AA3: C-----  60       RTS  
  0x04BAB4 $9AA4: C-----  60       RTS  
  0x04BAB5 $9AA5: C-----  60       RTS  
  0x04BAB6 $9AA6: C-----  60       RTS  
  0x04BAB7 $9AA7: C-----  60       RTS  
  0x04BAB8 $9AA8: C-----  60       RTS  
  0x04BAB9 $9AA9: C-----  60       RTS  
  0x04BABA $9AAA: C-----  60       RTS  
  0x04BABB $9AAB: C-----  60       RTS  
  0x04BABC $9AAC: C-----  60       RTS  
  0x04BABD $9AAD: C-----  60       RTS  
  0x04BABE $9AAE: C-----  60       RTS  
  0x04BABF $9AAF: C-----  60       RTS  
  0x04BAC0 $9AB0: C-----  06 06    ASL  $06
  0x04BAC2 $9AB2: C-----  06 06    ASL  $06
  0x04BAC4 $9AB4: C-----  06 06    ASL  $06
  0x04BAC6 $9AB6: C-----  06 06    ASL  $06
  0x04BAC8 $9AB8: C-----  06 06    ASL  $06
  0x04BACA $9ABA: C-----  06 06    ASL  $06
  0x04BACC $9ABC: C-----  06 06    ASL  $06
  0x04BACE $9ABE: C-----  06 06    ASL  $06
  0x04BAD0 $9AC0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAD1 $9AC1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAD2 $9AC2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAD3 $9AC3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAD4 $9AC4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAD5 $9AC5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAD6 $9AC6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAD7 $9AC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAD8 $9AC8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAD9 $9AC9: C-----  00       BRK  
  0x04BADA $9ACA: C-----  00       BRK  
  0x04BADB $9ACB: C-----  00       BRK  
  0x04BADC $9ACC: C-----  00       BRK  
  0x04BADD $9ACD: C-----  00       BRK  
  0x04BADE $9ACE: C-----  00       BRK  
  0x04BADF $9ACF: C-----  00       BRK  
  0x04BAE0 $9AD0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAE1 $9AD1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAE2 $9AD2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAE3 $9AD3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAE4 $9AD4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAE5 $9AD5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAE6 $9AD6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAE7 $9AD7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAE8 $9AD8: C-----  00       BRK  
  0x04BAE9 $9AD9: C-----  00       BRK  
  0x04BAEA $9ADA: C-----  00       BRK  
  0x04BAEB $9ADB: C-----  00       BRK  
  0x04BAEC $9ADC: C-----  00       BRK  
  0x04BAED $9ADD: C-----  00       BRK  
  0x04BAEE $9ADE: C-----  00       BRK  
  0x04BAEF $9ADF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAF0 $9AE0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAF1 $9AE1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAF2 $9AE2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAF3 $9AE3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAF4 $9AE4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAF5 $9AE5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAF6 $9AE6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAF7 $9AE7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BAF8 $9AE8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BAF9 $9AE9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BAFA $9AEA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BAFB $9AEB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BAFC $9AEC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BAFD $9AED: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BAFE $9AEE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BAFF $9AEF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BB00 $9AF0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BB01 $9AF1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BB02 $9AF2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BB03 $9AF3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BB04 $9AF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BB05 $9AF5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BB06 $9AF6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BB07 $9AF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BB08 $9AF8: C-----  01 01    ORA  ($01,X)
  0x04BB0A $9AFA: C-----  01 01    ORA  ($01,X)
  0x04BB0C $9AFC: C-----  01 01    ORA  ($01,X)
  0x04BB0E $9AFE: C-----  01 01    ORA  ($01,X)
  0x04BB10 $9B00: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04BB11 $9B01: C-----  !!UNDEF $5A  ; unknown opcode, treating as data
  0x04BB12 $9B02: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04BB13 $9B03: C-----  DD F9 ED CMP  $EDF9,X
  0x04BB16 $9B06: C-----  46 3C    LSR  $3C
  0x04BB18 $9B08: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04BB19 $9B09: C-----  !!UNDEF $5A  ; unknown opcode, treating as data
  0x04BB1A $9B0A: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04BB1B $9B0B: C-----  DD F9 ED CMP  $EDF9,X
  0x04BB1E $9B0E: C-----  46 3C    LSR  $3C
  0x04BB20 $9B10: C-----  20 30 38 JSR  $3830
  0x04BB23 $9B13: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04BB24 $9B14: C-----  38       SEC  
  0x04BB25 $9B15: C-----  30 20    BMI  $9B37
  0x04BB27 $9B17: C-----  00       BRK  
  0x04BB28 $9B18: C-----  20 30 38 JSR  $3830
  0x04BB2B $9B1B: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04BB2C $9B1C: C-----  38       SEC  
  0x04BB2D $9B1D: C-----  30 20    BMI  $9B3F
  0x04BB2F $9B1F: C-----  00       BRK  
  0x04BB30 $9B20: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04BB31 $9B21: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04BB32 $9B22: C-----  28       PLP  
  0x04BB33 $9B23: C-----  10 28    BPL  $9B4D
  0x04BB35 $9B25: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04BB36 $9B26: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04BB37 $9B27: C-----  00       BRK  
  0x04BB38 $9B28: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04BB39 $9B29: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04BB3A $9B2A: C-----  28       PLP  
  0x04BB3B $9B2B: C-----  10 28    BPL  $9B55
  0x04BB3D $9B2D: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04BB3E $9B2E: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04BB3F $9B2F: C-----  00       BRK  
  0x04BB40 $9B30: C-----  00       BRK  
  0x04BB41 $9B31: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BB42 $9B32: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BB43 $9B33: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04BB44 $9B34: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04BB45 $9B35: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04BB46 $9B36: C-----  00       BRK  
  0x04BB47 $9B37: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BB48 $9B38: C-----  00       BRK  
  0x04BB49 $9B39: C-----  00       BRK  
  0x04BB4A $9B3A: C-----  00       BRK  
  0x04BB4B $9B3B: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04BB4C $9B3C: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04BB4D $9B3D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BB4E $9B3E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BB4F $9B3F: C-----  00       BRK  
  0x04BB50 $9B40: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BB51 $9B41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BB52 $9B42: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BB53 $9B43: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BB54 $9B44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BB55 $9B45: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BB56 $9B46: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BB57 $9B47: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BB58 $9B48: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BB59 $9B49: C-----  00       BRK  
  0x04BB5A $9B4A: C-----  00       BRK  
  0x04BB5B $9B4B: C-----  00       BRK  
  0x04BB5C $9B4C: C-----  F0 FF    BEQ  $9B4D
  0x04BB5E $9B4E: C-----  00       BRK  
  0x04BB5F $9B4F: C-----  00       BRK  
  0x04BB60 $9B50: C-----  00       BRK  
  0x04BB61 $9B51: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BB62 $9B52: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x04BB63 $9B53: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04BB64 $9B54: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x04BB65 $9B55: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04BB66 $9B56: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04BB67 $9B57: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BB68 $9B58: C-----  00       BRK  
  0x04BB69 $9B59: C-----  00       BRK  
  0x04BB6A $9B5A: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04BB6B $9B5B: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04BB6C $9B5C: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04BB6D $9B5D: C-----  F0 FB    BEQ  $9B5A
  0x04BB6F $9B5F: C-----  00       BRK  
  0x04BB70 $9B60: ------  .byte $00
  0x04BB71 $9B61: ------  .byte $7E
  0x04BB72 $9B62: ------  .byte $42
  0x04BB73 $9B63: ------  .byte $42
  0x04BB74 $9B64: ------  .byte $42
  0x04BB75 $9B65: ------  .byte $42
  0x04BB76 $9B66: ------  .byte $7E
  0x04BB77 $9B67: ------  .byte $00
  0x04BB78 $9B68: ------  .byte $00
  0x04BB79 $9B69: ------  .byte $7E
  0x04BB7A $9B6A: ------  .byte $42
  0x04BB7B $9B6B: ------  .byte $42
  0x04BB7C $9B6C: ------  .byte $42
  0x04BB7D $9B6D: ------  .byte $42
  0x04BB7E $9B6E: ------  .byte $7E
  0x04BB7F $9B6F: ------  .byte $00
  0x04BB80 $9B70: C-----  00       BRK  
  0x04BB81 $9B71: C-----  7E 42 42 ROR  $4242,X
  0x04BB84 $9B74: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04BB85 $9B75: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04BB86 $9B76: C-----  7E 00 00 ROR  $0000,X
  0x04BB89 $9B79: C-----  7E 42 42 ROR  $4242,X
  0x04BB8C $9B7C: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04BB8D $9B7D: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04BB8E $9B7E: C-----  7E 00 00 ROR  $0000,X
  0x04BB91 $9B81: ------  .byte $7E
  0x04BB92 $9B82: ------  .byte $42
  0x04BB93 $9B83: ------  .byte $42
  0x04BB94 $9B84: ------  .byte $42
  0x04BB95 $9B85: ------  .byte $42
  0x04BB96 $9B86: ------  .byte $7E
  0x04BB97 $9B87: ------  .byte $00
  0x04BB98 $9B88: ------  .byte $00
  0x04BB99 $9B89: ------  .byte $7E
  0x04BB9A $9B8A: ------  .byte $42
  0x04BB9B $9B8B: ------  .byte $42
  0x04BB9C $9B8C: ------  .byte $42
  0x04BB9D $9B8D: ------  .byte $42
  0x04BB9E $9B8E: ------  .byte $7E
  0x04BB9F $9B8F: ------  .byte $00
  0x04BBA0 $9B90: ------  .byte $00
  0x04BBA1 $9B91: ------  .byte $7E
  0x04BBA2 $9B92: ------  .byte $42
  0x04BBA3 $9B93: ------  .byte $42
  0x04BBA4 $9B94: ------  .byte $42
  0x04BBA5 $9B95: ------  .byte $42
  0x04BBA6 $9B96: ------  .byte $7E
  0x04BBA7 $9B97: ------  .byte $00
  0x04BBA8 $9B98: ------  .byte $00
  0x04BBA9 $9B99: ------  .byte $7E
  0x04BBAA $9B9A: ------  .byte $42
  0x04BBAB $9B9B: ------  .byte $42
  0x04BBAC $9B9C: ------  .byte $42
  0x04BBAD $9B9D: ------  .byte $42
  0x04BBAE $9B9E: ------  .byte $7E
  0x04BBAF $9B9F: ------  .byte $00
  0x04BBB0 $9BA0: C-----  00       BRK  
  0x04BBB1 $9BA1: C-----  00       BRK  
  0x04BBB2 $9BA2: C-----  00       BRK  
  0x04BBB3 $9BA3: C-----  00       BRK  
  0x04BBB4 $9BA4: C-----  00       BRK  
  0x04BBB5 $9BA5: C-----  00       BRK  
  0x04BBB6 $9BA6: C-----  00       BRK  
  0x04BBB7 $9BA7: C-----  00       BRK  
  0x04BBB8 $9BA8: C-----  00       BRK  
  0x04BBB9 $9BA9: C-----  00       BRK  
  0x04BBBA $9BAA: C-----  00       BRK  
  0x04BBBB $9BAB: C-----  00       BRK  
  0x04BBBC $9BAC: C-----  00       BRK  
  0x04BBBD $9BAD: C-----  00       BRK  
  0x04BBBE $9BAE: C-----  00       BRK  
  0x04BBBF $9BAF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BBC0 $9BB0: C-----  00       BRK  
  0x04BBC1 $9BB1: C-----  00       BRK  
  0x04BBC2 $9BB2: C-----  00       BRK  
  0x04BBC3 $9BB3: C-----  00       BRK  
  0x04BBC4 $9BB4: C-----  00       BRK  
  0x04BBC5 $9BB5: C-----  00       BRK  
  0x04BBC6 $9BB6: C-----  00       BRK  
  0x04BBC7 $9BB7: C-----  00       BRK  
  0x04BBC8 $9BB8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BBC9 $9BB9: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BBCA $9BBA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BBCB $9BBB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BBCC $9BBC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BBCD $9BBD: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BBCE $9BBE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BBCF $9BBF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BBD0 $9BC0: ------  .byte $00
  0x04BBD1 $9BC1: ------  .byte $7E
  0x04BBD2 $9BC2: ------  .byte $42
  0x04BBD3 $9BC3: ------  .byte $42
  0x04BBD4 $9BC4: ------  .byte $42
  0x04BBD5 $9BC5: ------  .byte $42
  0x04BBD6 $9BC6: ------  .byte $7E
  0x04BBD7 $9BC7: ------  .byte $00
  0x04BBD8 $9BC8: ------  .byte $00
  0x04BBD9 $9BC9: ------  .byte $7E
  0x04BBDA $9BCA: ------  .byte $42
  0x04BBDB $9BCB: ------  .byte $42
  0x04BBDC $9BCC: ------  .byte $42
  0x04BBDD $9BCD: ------  .byte $42
  0x04BBDE $9BCE: ------  .byte $7E
  0x04BBDF $9BCF: ------  .byte $00
  0x04BBE0 $9BD0: C-----  00       BRK  
  0x04BBE1 $9BD1: C-----  7E 42 42 ROR  $4242,X
  0x04BBE4 $9BD4: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04BBE5 $9BD5: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04BBE6 $9BD6: C-----  7E 00 00 ROR  $0000,X
  0x04BBE9 $9BD9: C-----  7E 42 42 ROR  $4242,X
  0x04BBEC $9BDC: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04BBED $9BDD: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04BBEE $9BDE: C-----  7E 00 00 ROR  $0000,X
  0x04BBF1 $9BE1: ------  .byte $7E
  0x04BBF2 $9BE2: ------  .byte $42
  0x04BBF3 $9BE3: ------  .byte $42
  0x04BBF4 $9BE4: ------  .byte $42
  0x04BBF5 $9BE5: ------  .byte $42
  0x04BBF6 $9BE6: ------  .byte $7E
  0x04BBF7 $9BE7: ------  .byte $00
  0x04BBF8 $9BE8: ------  .byte $00
  0x04BBF9 $9BE9: ------  .byte $7E
  0x04BBFA $9BEA: ------  .byte $42
  0x04BBFB $9BEB: ------  .byte $42
  0x04BBFC $9BEC: ------  .byte $42
  0x04BBFD $9BED: ------  .byte $42
  0x04BBFE $9BEE: ------  .byte $7E
  0x04BBFF $9BEF: ------  .byte $00
  0x04BC00 $9BF0: C-----  00       BRK  
  0x04BC01 $9BF1: C-----  7E 42 42 ROR  $4242,X
  0x04BC04 $9BF4: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04BC05 $9BF5: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04BC06 $9BF6: C-----  7E 00 00 ROR  $0000,X
  0x04BC09 $9BF9: C-----  7E 42 42 ROR  $4242,X
  0x04BC0C $9BFC: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04BC0D $9BFD: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04BC0E $9BFE: C-----  7E 00 00 ROR  $0000,X
  0x04BC11 $9C01: ------  .byte $00
  0x04BC12 $9C02: ------  .byte $00
  0x04BC13 $9C03: ------  .byte $00
  0x04BC14 $9C04: ------  .byte $00
  0x04BC15 $9C05: ------  .byte $00
  0x04BC16 $9C06: ------  .byte $00
  0x04BC17 $9C07: ------  .byte $00
  0x04BC18 $9C08: C-----  00       BRK  
  0x04BC19 $9C09: ------  .byte $00
  0x04BC1A $9C0A: ------  .byte $00
  0x04BC1B $9C0B: ------  .byte $00
  0x04BC1C $9C0C: ------  .byte $00
  0x04BC1D $9C0D: ------  .byte $00
  0x04BC1E $9C0E: ------  .byte $00
  0x04BC1F $9C0F: ------  .byte $00
  0x04BC20 $9C10: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC21 $9C11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC22 $9C12: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC23 $9C13: C-----  00       BRK  
  0x04BC24 $9C14: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC25 $9C15: C-----  00       BRK  
  0x04BC26 $9C16: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC27 $9C17: C-----  00       BRK  
  0x04BC28 $9C18: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC29 $9C19: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC2A $9C1A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC2B $9C1B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC2C $9C1C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC2D $9C1D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC2E $9C1E: C-----  00       BRK  
  0x04BC2F $9C1F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC30 $9C20: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC31 $9C21: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC32 $9C22: C-----  00       BRK  
  0x04BC33 $9C23: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04BC34 $9C24: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC35 $9C25: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC36 $9C26: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC37 $9C27: C-----  00       BRK  
  0x04BC38 $9C28: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC39 $9C29: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC3A $9C2A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC3B $9C2B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC3C $9C2C: C-----  00       BRK  
  0x04BC3D $9C2D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC3E $9C2E: C-----  00       BRK  
  0x04BC3F $9C2F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC40 $9C30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC41 $9C31: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC42 $9C32: C-----  00       BRK  
  0x04BC43 $9C33: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC44 $9C34: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC45 $9C35: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC46 $9C36: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC47 $9C37: C-----  00       BRK  
  0x04BC48 $9C38: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC49 $9C39: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC4A $9C3A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC4B $9C3B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC4C $9C3C: C-----  00       BRK  
  0x04BC4D $9C3D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC4E $9C3E: C-----  00       BRK  
  0x04BC4F $9C3F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC50 $9C40: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC51 $9C41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC52 $9C42: C-----  00       BRK  
  0x04BC53 $9C43: C-----  00       BRK  
  0x04BC54 $9C44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC55 $9C45: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC56 $9C46: C-----  00       BRK  
  0x04BC57 $9C47: C-----  00       BRK  
  0x04BC58 $9C48: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC59 $9C49: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC5A $9C4A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC5B $9C4B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC5C $9C4C: C-----  00       BRK  
  0x04BC5D $9C4D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC5E $9C4E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC5F $9C4F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC60 $9C50: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC61 $9C51: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC62 $9C52: C-----  00       BRK  
  0x04BC63 $9C53: C-----  00       BRK  
  0x04BC64 $9C54: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC65 $9C55: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC66 $9C56: C-----  F0 00    BEQ  $9C58
  0x04BC68 $9C58: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC69 $9C59: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC6A $9C5A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC6B $9C5B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC6C $9C5C: C-----  00       BRK  
  0x04BC6D $9C5D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC6E $9C5E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04BC6F $9C5F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC70 $9C60: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC71 $9C61: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC72 $9C62: C-----  00       BRK  
  0x04BC73 $9C63: C-----  F0 FF    BEQ  $9C64
  0x04BC75 $9C65: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC76 $9C66: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC77 $9C67: C-----  00       BRK  
  0x04BC78 $9C68: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC79 $9C69: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC7A $9C6A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC7B $9C6B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC7C $9C6C: C-----  00       BRK  
  0x04BC7D $9C6D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC7E $9C6E: C-----  00       BRK  
  0x04BC7F $9C6F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC80 $9C70: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC81 $9C71: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC82 $9C72: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC83 $9C73: C-----  00       BRK  
  0x04BC84 $9C74: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC85 $9C75: C-----  00       BRK  
  0x04BC86 $9C76: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC87 $9C77: C-----  00       BRK  
  0x04BC88 $9C78: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC89 $9C79: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC8A $9C7A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC8B $9C7B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC8C $9C7C: C-----  F8       SED  
  0x04BC8D $9C7D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC8E $9C7E: C-----  00       BRK  
  0x04BC8F $9C7F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC90 $9C80: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC91 $9C81: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC92 $9C82: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC93 $9C83: C-----  00       BRK  
  0x04BC94 $9C84: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC95 $9C85: C-----  00       BRK  
  0x04BC96 $9C86: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC97 $9C87: C-----  00       BRK  
  0x04BC98 $9C88: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC99 $9C89: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC9A $9C8A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC9B $9C8B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC9C $9C8C: C-----  00       BRK  
  0x04BC9D $9C8D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BC9E $9C8E: C-----  00       BRK  
  0x04BC9F $9C8F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCA0 $9C90: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCA1 $9C91: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCA2 $9C92: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCA3 $9C93: C-----  00       BRK  
  0x04BCA4 $9C94: C-----  00       BRK  
  0x04BCA5 $9C95: C-----  00       BRK  
  0x04BCA6 $9C96: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCA7 $9C97: C-----  00       BRK  
  0x04BCA8 $9C98: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCA9 $9C99: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCAA $9C9A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCAB $9C9B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCAC $9C9C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCAD $9C9D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCAE $9C9E: C-----  00       BRK  
  0x04BCAF $9C9F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCB0 $9CA0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCB1 $9CA1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCB2 $9CA2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCB3 $9CA3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCB4 $9CA4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCB5 $9CA5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCB6 $9CA6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCB7 $9CA7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCB8 $9CA8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCB9 $9CA9: C-----  00       BRK  
  0x04BCBA $9CAA: C-----  00       BRK  
  0x04BCBB $9CAB: C-----  00       BRK  
  0x04BCBC $9CAC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCBD $9CAD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCBE $9CAE: C-----  00       BRK  
  0x04BCBF $9CAF: C-----  00       BRK  
  0x04BCC0 $9CB0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCC1 $9CB1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCC2 $9CB2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCC3 $9CB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCC4 $9CB4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCC5 $9CB5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCC6 $9CB6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCC7 $9CB7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCC8 $9CB8: C-----  00       BRK  
  0x04BCC9 $9CB9: C-----  00       BRK  
  0x04BCCA $9CBA: C-----  00       BRK  
  0x04BCCB $9CBB: C-----  00       BRK  
  0x04BCCC $9CBC: C-----  00       BRK  
  0x04BCCD $9CBD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCCE $9CBE: C-----  00       BRK  
  0x04BCCF $9CBF: C-----  00       BRK  
  0x04BCD0 $9CC0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCD1 $9CC1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCD2 $9CC2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCD3 $9CC3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCD4 $9CC4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCD5 $9CC5: C-----  00       BRK  
  0x04BCD6 $9CC6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCD7 $9CC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCD8 $9CC8: C-----  00       BRK  
  0x04BCD9 $9CC9: C-----  00       BRK  
  0x04BCDA $9CCA: C-----  00       BRK  
  0x04BCDB $9CCB: C-----  00       BRK  
  0x04BCDC $9CCC: C-----  00       BRK  
  0x04BCDD $9CCD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCDE $9CCE: C-----  00       BRK  
  0x04BCDF $9CCF: C-----  00       BRK  
  0x04BCE0 $9CD0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCE1 $9CD1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCE2 $9CD2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCE3 $9CD3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCE4 $9CD4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCE5 $9CD5: C-----  00       BRK  
  0x04BCE6 $9CD6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCE7 $9CD7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCE8 $9CD8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCE9 $9CD9: C-----  00       BRK  
  0x04BCEA $9CDA: C-----  00       BRK  
  0x04BCEB $9CDB: C-----  00       BRK  
  0x04BCEC $9CDC: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04BCED $9CDD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCEE $9CDE: C-----  00       BRK  
  0x04BCEF $9CDF: C-----  00       BRK  
  0x04BCF0 $9CE0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCF1 $9CE1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCF2 $9CE2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCF3 $9CE3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCF4 $9CE4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCF5 $9CE5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCF6 $9CE6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCF7 $9CE7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCF8 $9CE8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCF9 $9CE9: C-----  00       BRK  
  0x04BCFA $9CEA: C-----  00       BRK  
  0x04BCFB $9CEB: C-----  00       BRK  
  0x04BCFC $9CEC: C-----  00       BRK  
  0x04BCFD $9CED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BCFE $9CEE: C-----  00       BRK  
  0x04BCFF $9CEF: C-----  00       BRK  
  0x04BD00 $9CF0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BD01 $9CF1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BD02 $9CF2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BD03 $9CF3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BD04 $9CF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BD05 $9CF5: C-----  00       BRK  
  0x04BD06 $9CF6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BD07 $9CF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BD08 $9CF8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BD09 $9CF9: C-----  00       BRK  
  0x04BD0A $9CFA: C-----  00       BRK  
  0x04BD0B $9CFB: C-----  00       BRK  
  0x04BD0C $9CFC: C-----  00       BRK  
  0x04BD0D $9CFD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BD0E $9CFE: C-----  00       BRK  
  0x04BD0F $9CFF: C-----  00       BRK  
  0x04BD10 $9D00: C-----  00       BRK  
  0x04BD11 $9D01: ------  .byte $7E
  0x04BD12 $9D02: ------  .byte $42
  0x04BD13 $9D03: ------  .byte $42
  0x04BD14 $9D04: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04BD15 $9D05: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04BD16 $9D06: C-----  7E 00 00 ROR  $0000,X
  0x04BD19 $9D09: ------  .byte $7E
  0x04BD1A $9D0A: ------  .byte $42
  0x04BD1B $9D0B: ------  .byte $42
  0x04BD1C $9D0C: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04BD1D $9D0D: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04BD1E $9D0E: C-----  7E 00 00 ROR  $0000,X
  0x04BD21 $9D11: C-----  01 03    ORA  ($03,X)
  0x04BD23 $9D13: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04BD24 $9D14: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BD25 $9D15: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BD26 $9D16: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BD27 $9D17: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BD28 $9D18: C-----  00       BRK  
  0x04BD29 $9D19: C-----  00       BRK  
  0x04BD2A $9D1A: C-----  00       BRK  
  0x04BD2B $9D1B: C-----  00       BRK  
  0x04BD2C $9D1C: C-----  00       BRK  
  0x04BD2D $9D1D: C-----  00       BRK  
  0x04BD2E $9D1E: C-----  00       BRK  
  0x04BD2F $9D1F: C-----  00       BRK  
  0x04BD30 $9D20: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04BD31 $9D21: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x04BD32 $9D22: C-----  06 04    ASL  $04
  0x04BD34 $9D24: C-----  6A       ROR  A
  0x04BD35 $9D25: C-----  90 20    BCC  $9D47
  0x04BD37 $9D27: C-----  00       BRK  
  0x04BD38 $9D28: C-----  00       BRK  
  0x04BD39 $9D29: C-----  00       BRK  
  0x04BD3A $9D2A: C-----  00       BRK  
  0x04BD3B $9D2B: C-----  00       BRK  
  0x04BD3C $9D2C: C-----  00       BRK  
  0x04BD3D $9D2D: C-----  00       BRK  
  0x04BD3E $9D2E: C-----  00       BRK  
  0x04BD3F $9D2F: C-----  00       BRK  
  0x04BD40 $9D30: C-----  E0 40    CPX  #$40
  0x04BD42 $9D32: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BD43 $9D33: C-----  00       BRK  
  0x04BD44 $9D34: C-----  00       BRK  
  0x04BD45 $9D35: C-----  00       BRK  
  0x04BD46 $9D36: C-----  00       BRK  
  0x04BD47 $9D37: C-----  00       BRK  
  0x04BD48 $9D38: C-----  00       BRK  
  0x04BD49 $9D39: C-----  00       BRK  
  0x04BD4A $9D3A: C-----  00       BRK  
  0x04BD4B $9D3B: C-----  00       BRK  
  0x04BD4C $9D3C: C-----  00       BRK  
  0x04BD4D $9D3D: C-----  00       BRK  
  0x04BD4E $9D3E: C-----  00       BRK  
  0x04BD4F $9D3F: C-----  00       BRK  
  0x04BD50 $9D40: C-----  F8       SED  
  0x04BD51 $9D41: C-----  E0 C0    CPX  #$C0
  0x04BD53 $9D43: C-----  C0 80    CPY  #$80
  0x04BD55 $9D45: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BD56 $9D46: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BD57 $9D47: C-----  00       BRK  
  0x04BD58 $9D48: C-----  00       BRK  
  0x04BD59 $9D49: C-----  00       BRK  
  0x04BD5A $9D4A: C-----  00       BRK  
  0x04BD5B $9D4B: C-----  00       BRK  
  0x04BD5C $9D4C: C-----  00       BRK  
  0x04BD5D $9D4D: C-----  00       BRK  
  0x04BD5E $9D4E: C-----  00       BRK  
  0x04BD5F $9D4F: C-----  00       BRK  
  0x04BD60 $9D50: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04BD61 $9D51: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04BD62 $9D52: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04BD63 $9D53: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04BD64 $9D54: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04BD65 $9D55: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04BD66 $9D56: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04BD67 $9D57: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04BD68 $9D58: C-----  00       BRK  
  0x04BD69 $9D59: C-----  00       BRK  
  0x04BD6A $9D5A: C-----  00       BRK  
  0x04BD6B $9D5B: C-----  00       BRK  
  0x04BD6C $9D5C: C-----  00       BRK  
  0x04BD6D $9D5D: C-----  00       BRK  
  0x04BD6E $9D5E: C-----  00       BRK  
  0x04BD6F $9D5F: C-----  00       BRK  
  0x04BD70 $9D60: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BD71 $9D61: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04BD72 $9D62: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04BD73 $9D63: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x04BD74 $9D64: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04BD75 $9D65: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04BD76 $9D66: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04BD77 $9D67: C-----  !!UNDEF $A3  ; unknown opcode, treating as data
  0x04BD78 $9D68: C-----  00       BRK  
  0x04BD79 $9D69: C-----  00       BRK  
  0x04BD7A $9D6A: C-----  00       BRK  
  0x04BD7B $9D6B: C-----  00       BRK  
  0x04BD7C $9D6C: C-----  00       BRK  
  0x04BD7D $9D6D: C-----  00       BRK  
  0x04BD7E $9D6E: C-----  00       BRK  
  0x04BD7F $9D6F: C-----  00       BRK  
  0x04BD80 $9D70: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04BD81 $9D71: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04BD82 $9D72: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04BD83 $9D73: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04BD84 $9D74: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04BD85 $9D75: C-----  01 00    ORA  ($00,X)
  0x04BD87 $9D77: C-----  01 00    ORA  ($00,X)
  0x04BD89 $9D79: C-----  00       BRK  
  0x04BD8A $9D7A: C-----  00       BRK  
  0x04BD8B $9D7B: C-----  00       BRK  
  0x04BD8C $9D7C: C-----  00       BRK  
  0x04BD8D $9D7D: C-----  00       BRK  
  0x04BD8E $9D7E: C-----  00       BRK  
  0x04BD8F $9D7F: C-----  00       BRK  
  0x04BD90 $9D80: C-----  01 01    ORA  ($01,X)
  0x04BD92 $9D82: C-----  00       BRK  
  0x04BD93 $9D83: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BD94 $9D84: C-----  81 C2    STA  ($C2,X)
  0x04BD96 $9D86: C-----  FE FC 00 INC  $00FC,X
  0x04BD99 $9D89: C-----  00       BRK  
  0x04BD9A $9D8A: C-----  00       BRK  
  0x04BD9B $9D8B: C-----  00       BRK  
  0x04BD9C $9D8C: C-----  00       BRK  
  0x04BD9D $9D8D: C-----  00       BRK  
  0x04BD9E $9D8E: C-----  00       BRK  
  0x04BD9F $9D8F: C-----  00       BRK  
  0x04BDA0 $9D90: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04BDA1 $9D91: C-----  38       SEC  
  0x04BDA2 $9D92: C-----  50 0A    BVC  $9D9E
  0x04BDA4 $9D94: C-----  05 04    ORA  $04
  0x04BDA6 $9D96: C-----  00       BRK  
  0x04BDA7 $9D97: C-----  00       BRK  
  0x04BDA8 $9D98: C-----  00       BRK  
  0x04BDA9 $9D99: C-----  00       BRK  
  0x04BDAA $9D9A: C-----  00       BRK  
  0x04BDAB $9D9B: C-----  00       BRK  
  0x04BDAC $9D9C: C-----  00       BRK  
  0x04BDAD $9D9D: C-----  00       BRK  
  0x04BDAE $9D9E: C-----  00       BRK  
  0x04BDAF $9D9F: C-----  00       BRK  
  0x04BDB0 $9DA0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04BDB1 $9DA1: C-----  F8       SED  
  0x04BDB2 $9DA2: C-----  F0 F0    BEQ  $9D94
  0x04BDB4 $9DA4: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04BDB5 $9DA5: C-----  F0 F0    BEQ  $9D97
  0x04BDB7 $9DA7: C-----  E0 00    CPX  #$00
  0x04BDB9 $9DA9: C-----  00       BRK  
  0x04BDBA $9DAA: C-----  00       BRK  
  0x04BDBB $9DAB: C-----  00       BRK  
  0x04BDBC $9DAC: C-----  00       BRK  
  0x04BDBD $9DAD: C-----  00       BRK  
  0x04BDBE $9DAE: C-----  00       BRK  
  0x04BDBF $9DAF: C-----  00       BRK  
  0x04BDC0 $9DB0: C-----  00       BRK  
  0x04BDC1 $9DB1: C-----  00       BRK  
  0x04BDC2 $9DB2: C-----  00       BRK  
  0x04BDC3 $9DB3: C-----  00       BRK  
  0x04BDC4 $9DB4: C-----  00       BRK  
  0x04BDC5 $9DB5: C-----  40       RTI  
  0x04BDC6 $9DB6: C-----  00       BRK  
  0x04BDC7 $9DB7: C-----  00       BRK  
  0x04BDC8 $9DB8: C-----  00       BRK  
  0x04BDC9 $9DB9: C-----  00       BRK  
  0x04BDCA $9DBA: C-----  00       BRK  
  0x04BDCB $9DBB: C-----  00       BRK  
  0x04BDCC $9DBC: C-----  00       BRK  
  0x04BDCD $9DBD: C-----  00       BRK  
  0x04BDCE $9DBE: C-----  00       BRK  
  0x04BDCF $9DBF: C-----  00       BRK  
  0x04BDD0 $9DC0: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04BDD1 $9DC1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04BDD2 $9DC2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04BDD3 $9DC3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04BDD4 $9DC4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04BDD5 $9DC5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04BDD6 $9DC6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04BDD7 $9DC7: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04BDD8 $9DC8: C-----  00       BRK  
  0x04BDD9 $9DC9: C-----  00       BRK  
  0x04BDDA $9DCA: C-----  00       BRK  
  0x04BDDB $9DCB: C-----  00       BRK  
  0x04BDDC $9DCC: C-----  00       BRK  
  0x04BDDD $9DCD: C-----  00       BRK  
  0x04BDDE $9DCE: C-----  00       BRK  
  0x04BDDF $9DCF: C-----  00       BRK  
  0x04BDE0 $9DD0: C-----  00       BRK  
  0x04BDE1 $9DD1: C-----  00       BRK  
  0x04BDE2 $9DD2: C-----  00       BRK  
  0x04BDE3 $9DD3: C-----  00       BRK  
  0x04BDE4 $9DD4: C-----  00       BRK  
  0x04BDE5 $9DD5: C-----  00       BRK  
  0x04BDE6 $9DD6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BDE7 $9DD7: C-----  40       RTI  
  0x04BDE8 $9DD8: C-----  00       BRK  
  0x04BDE9 $9DD9: C-----  00       BRK  
  0x04BDEA $9DDA: C-----  00       BRK  
  0x04BDEB $9DDB: C-----  00       BRK  
  0x04BDEC $9DDC: C-----  00       BRK  
  0x04BDED $9DDD: C-----  00       BRK  
  0x04BDEE $9DDE: C-----  00       BRK  
  0x04BDEF $9DDF: C-----  00       BRK  
  0x04BDF0 $9DE0: C-----  00       BRK  
  0x04BDF1 $9DE1: C-----  00       BRK  
  0x04BDF2 $9DE2: C-----  00       BRK  
  0x04BDF3 $9DE3: C-----  00       BRK  
  0x04BDF4 $9DE4: C-----  00       BRK  
  0x04BDF5 $9DE5: C-----  00       BRK  
  0x04BDF6 $9DE6: C-----  01 01    ORA  ($01,X)
  0x04BDF8 $9DE8: C-----  00       BRK  
  0x04BDF9 $9DE9: C-----  00       BRK  
  0x04BDFA $9DEA: C-----  00       BRK  
  0x04BDFB $9DEB: C-----  00       BRK  
  0x04BDFC $9DEC: C-----  00       BRK  
  0x04BDFD $9DED: C-----  00       BRK  
  0x04BDFE $9DEE: C-----  00       BRK  
  0x04BDFF $9DEF: C-----  00       BRK  
  0x04BE00 $9DF0: C-----  18       CLC  
  0x04BE01 $9DF1: C-----  3E 7F 7F ROL  $7F7F,X
  0x04BE04 $9DF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE05 $9DF5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE06 $9DF6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE07 $9DF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE08 $9DF8: C-----  00       BRK  
  0x04BE09 $9DF9: C-----  00       BRK  
  0x04BE0A $9DFA: C-----  00       BRK  
  0x04BE0B $9DFB: C-----  00       BRK  
  0x04BE0C $9DFC: C-----  00       BRK  
  0x04BE0D $9DFD: C-----  00       BRK  
  0x04BE0E $9DFE: C-----  00       BRK  
  0x04BE0F $9DFF: C-----  00       BRK  
  0x04BE10 $9E00: C-----  F9 FC FC SBC  $FCFC,Y
  0x04BE13 $9E03: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04BE14 $9E04: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE15 $9E05: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE16 $9E06: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE17 $9E07: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE18 $9E08: C-----  FE FF FF INC  $FFFF,X
  0x04BE1B $9E0B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE1C $9E0C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE1D $9E0D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE1E $9E0E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE1F $9E0F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE20 $9E10: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE21 $9E11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE22 $9E12: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04BE23 $9E13: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04BE24 $9E14: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04BE25 $9E15: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04BE26 $9E16: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04BE27 $9E17: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04BE28 $9E18: C-----  00       BRK  
  0x04BE29 $9E19: C-----  00       BRK  
  0x04BE2A $9E1A: C-----  C0 C0    CPY  #$C0
  0x04BE2C $9E1C: C-----  E0 F0    CPX  #$F0
  0x04BE2E $9E1E: C-----  F0 F8    BEQ  $9E18
  0x04BE30 $9E20: ------  .byte $FF
  0x04BE31 $9E21: ------  .byte $FE
  0x04BE32 $9E22: ------  .byte $FE
  0x04BE33 $9E23: ------  .byte $FC
  0x04BE34 $9E24: ------  .byte $F0
  0x04BE35 $9E25: ------  .byte $E3
  0x04BE36 $9E26: ------  .byte $E7
  0x04BE37 $9E27: ------  .byte $C7
  0x04BE38 $9E28: ------  .byte $00
  0x04BE39 $9E29: ------  .byte $01
  0x04BE3A $9E2A: ------  .byte $01
  0x04BE3B $9E2B: ------  .byte $03
  0x04BE3C $9E2C: ------  .byte $0F
  0x04BE3D $9E2D: ------  .byte $1F
  0x04BE3E $9E2E: ------  .byte $1F
  0x04BE3F $9E2F: ------  .byte $3F
  0x04BE40 $9E30: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04BE41 $9E31: C-----  C5 C1    CMP  $C1
  0x04BE43 $9E33: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04BE44 $9E34: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04BE45 $9E35: C-----  E0 FD    CPX  #$FD
  0x04BE47 $9E37: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE48 $9E38: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04BE49 $9E39: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04BE4A $9E3A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04BE4B $9E3B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04BE4C $9E3C: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04BE4D $9E3D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04BE4E $9E3E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04BE4F $9E3F: C-----  01 FF    ORA  ($FF,X)
  0x04BE51 $9E41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE52 $9E42: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE53 $9E43: C-----  FE E0 80 INC  $80E0,X
  0x04BE56 $9E46: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04BE57 $9E47: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x04BE58 $9E48: C-----  00       BRK  
  0x04BE59 $9E49: C-----  00       BRK  
  0x04BE5A $9E4A: C-----  00       BRK  
  0x04BE5B $9E4B: C-----  01 1F    ORA  ($1F,X)
  0x04BE5D $9E4D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04BE5E $9E4E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04BE5F $9E4F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04BE60 $9E50: C-----  FD F9 E1 SBC  $E1F9,X
  0x04BE63 $9E53: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x04BE64 $9E54: C-----  00       BRK  
  0x04BE65 $9E55: C-----  4E FF FF LSR  $FFFF
  0x04BE68 $9E58: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04BE69 $9E59: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04BE6A $9E5A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04BE6B $9E5B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04BE6C $9E5C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE6D $9E5D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE6E $9E5E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE6F $9E5F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE70 $9E60: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE71 $9E61: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE72 $9E62: C-----  FE FC F9 INC  $F9FC,X
  0x04BE75 $9E65: C-----  F9 F9 FB SBC  $FBF9,Y
  0x04BE78 $9E68: C-----  00       BRK  
  0x04BE79 $9E69: C-----  00       BRK  
  0x04BE7A $9E6A: C-----  01 03    ORA  ($03,X)
  0x04BE7C $9E6C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04BE7D $9E6D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04BE7E $9E6E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04BE7F $9E6F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04BE80 $9E70: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04BE81 $9E71: C-----  28       PLP  
  0x04BE82 $9E72: C-----  !!UNDEF $9C  ; unknown opcode, treating as data
  0x04BE83 $9E73: C-----  28       PLP  
  0x04BE84 $9E74: C-----  61 ED    ADC  ($ED,X)
  0x04BE86 $9E76: C-----  FE FE 3C INC  $3CFE,X
  0x04BE89 $9E79: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE8A $9E7A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE8B $9E7B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE8C $9E7C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE8D $9E7D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE8E $9E7E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE8F $9E7F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BE90 $9E80: C-----  E1 C0    SBC  ($C0,X)
  0x04BE92 $9E82: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04BE93 $9E83: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04BE94 $9E84: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04BE95 $9E85: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04BE96 $9E86: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04BE97 $9E87: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04BE98 $9E88: C-----  1E 3F 3F ASL  $3F3F,X
  0x04BE9B $9E8B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04BE9C $9E8C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04BE9D $9E8D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04BE9E $9E8E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04BE9F $9E8F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04BEA0 $9E90: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04BEA1 $9E91: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04BEA2 $9E92: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04BEA3 $9E93: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04BEA4 $9E94: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04BEA5 $9E95: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04BEA6 $9E96: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BEA7 $9E97: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04BEA8 $9E98: C-----  F8       SED  
  0x04BEA9 $9E99: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04BEAA $9E9A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04BEAB $9E9B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04BEAC $9E9C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04BEAD $9E9D: C-----  F0 E0    BEQ  $9E7F
  0x04BEAF $9E9F: C-----  E0 FF    CPX  #$FF
  0x04BEB1 $9EA1: C-----  FE FC E1 INC  $E1FC,X
  0x04BEB4 $9EA4: C-----  E1 CE    SBC  ($CE,X)
  0x04BEB6 $9EA6: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04BEB7 $9EA7: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04BEB8 $9EA8: C-----  00       BRK  
  0x04BEB9 $9EA9: C-----  01 03    ORA  ($03,X)
  0x04BEBB $9EAB: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04BEBC $9EAC: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04BEBD $9EAD: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04BEBE $9EAE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04BEBF $9EAF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04BEC0 $9EB0: C-----  E8       INX  
  0x04BEC1 $9EB1: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x04BEC2 $9EB2: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04BEC3 $9EB3: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04BEC4 $9EB4: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04BEC5 $9EB5: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04BEC6 $9EB6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BEC7 $9EB7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BEC8 $9EB8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04BEC9 $9EB9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04BECA $9EBA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BECB $9EBB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BECC $9EBC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BECD $9EBD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BECE $9EBE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BECF $9EBF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BED0 $9EC0: C-----  FD F9 E3 SBC  $E3F9,X
  0x04BED3 $9EC3: C-----  C1 05    CMP  ($05,X)
  0x04BED5 $9EC5: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x04BED6 $9EC6: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04BED7 $9EC7: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04BED8 $9EC8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04BED9 $9EC9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04BEDA $9ECA: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04BEDB $9ECB: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04BEDC $9ECC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BEDD $9ECD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BEDE $9ECE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BEDF $9ECF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BEE0 $9ED0: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04BEE1 $9ED1: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04BEE2 $9ED2: C-----  48       PHA  
  0x04BEE3 $9ED3: C-----  26 EF    ROL  $EF
  0x04BEE5 $9ED5: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04BEE6 $9ED6: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04BEE7 $9ED7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BEE8 $9ED8: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04BEE9 $9ED9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04BEEA $9EDA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BEEB $9EDB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BEEC $9EDC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BEED $9EDD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BEEE $9EDE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BEEF $9EDF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BEF0 $9EE0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BEF1 $9EE1: C-----  FE FE FC INC  $FCFE,X
  0x04BEF4 $9EE4: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04BEF5 $9EE5: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04BEF6 $9EE6: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04BEF7 $9EE7: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04BEF8 $9EE8: C-----  00       BRK  
  0x04BEF9 $9EE9: C-----  01 01    ORA  ($01,X)
  0x04BEFB $9EEB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04BEFC $9EEC: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04BEFD $9EED: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04BEFE $9EEE: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04BEFF $9EEF: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04BF00 $9EF0: C-----  F9 FC FC SBC  $FCFC,Y
  0x04BF03 $9EF3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF04 $9EF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF05 $9EF5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF06 $9EF6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF07 $9EF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF08 $9EF8: C-----  FE FF FF INC  $FFFF,X
  0x04BF0B $9EFB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF0C $9EFC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF0D $9EFD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF0E $9EFE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF0F $9EFF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF10 $9F00: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF11 $9F01: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF12 $9F02: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF13 $9F03: C-----  FE FE FC INC  $FCFE,X
  0x04BF16 $9F06: C-----  E5 D3    SBC  $D3
  0x04BF18 $9F08: C-----  00       BRK  
  0x04BF19 $9F09: C-----  00       BRK  
  0x04BF1A $9F0A: C-----  00       BRK  
  0x04BF1B $9F0B: C-----  01 01    ORA  ($01,X)
  0x04BF1D $9F0D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04BF1E $9F0E: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x04BF1F $9F0F: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04BF20 $9F10: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF21 $9F11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF22 $9F12: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04BF23 $9F13: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04BF24 $9F14: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04BF25 $9F15: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04BF26 $9F16: C-----  8D 66 00 STA  $0066
  0x04BF29 $9F19: C-----  00       BRK  
  0x04BF2A $9F1A: C-----  70 F8    BVS  $9F14
  0x04BF2C $9F1C: C-----  F8       SED  
  0x04BF2D $9F1D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04BF2E $9F1E: C-----  FE FF E7 INC  $E7FF,X
  0x04BF31 $9F21: C-----  30 10    BMI  $9F33
  0x04BF33 $9F23: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04BF34 $9F24: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04BF35 $9F25: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF36 $9F26: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF37 $9F27: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF38 $9F28: C-----  F8       SED  
  0x04BF39 $9F29: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF3A $9F2A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF3B $9F2B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF3C $9F2C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF3D $9F2D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF3E $9F2E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF3F $9F2F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF40 $9F30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF41 $9F31: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04BF42 $9F32: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04BF43 $9F33: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04BF44 $9F34: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04BF45 $9F35: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04BF46 $9F36: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF47 $9F37: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04BF48 $9F38: C-----  F8       SED  
  0x04BF49 $9F39: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04BF4A $9F3A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04BF4B $9F3B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04BF4C $9F3C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04BF4D $9F3D: C-----  F0 E0    BEQ  $9F1F
  0x04BF4F $9F3F: C-----  E0 1F    CPX  #$1F
  0x04BF51 $9F41: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04BF52 $9F42: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04BF53 $9F43: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x04BF54 $9F44: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04BF55 $9F45: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04BF56 $9F46: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04BF57 $9F47: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04BF58 $9F48: C-----  E0 F0    CPX  #$F0
  0x04BF5A $9F4A: C-----  F8       SED  
  0x04BF5B $9F4B: C-----  F8       SED  
  0x04BF5C $9F4C: C-----  F8       SED  
  0x04BF5D $9F4D: C-----  F8       SED  
  0x04BF5E $9F4E: C-----  F0 F0    BEQ  $9F40
  0x04BF60 $9F50: C-----  00       BRK  
  0x04BF61 $9F51: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF62 $9F52: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF63 $9F53: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF64 $9F54: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF65 $9F55: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF66 $9F56: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF67 $9F57: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF68 $9F58: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF69 $9F59: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF6A $9F5A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF6B $9F5B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF6C $9F5C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF6D $9F5D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF6E $9F5E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF6F $9F5F: C-----  00       BRK  
  0x04BF70 $9F60: C-----  00       BRK  
  0x04BF71 $9F61: C-----  00       BRK  
  0x04BF72 $9F62: C-----  00       BRK  
  0x04BF73 $9F63: C-----  00       BRK  
  0x04BF74 $9F64: C-----  00       BRK  
  0x04BF75 $9F65: C-----  00       BRK  
  0x04BF76 $9F66: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF77 $9F67: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF78 $9F68: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF79 $9F69: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF7A $9F6A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF7B $9F6B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF7C $9F6C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF7D $9F6D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF7E $9F6E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF7F $9F6F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF80 $9F70: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF81 $9F71: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF82 $9F72: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF83 $9F73: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF84 $9F74: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF85 $9F75: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF86 $9F76: C-----  00       BRK  
  0x04BF87 $9F77: C-----  00       BRK  
  0x04BF88 $9F78: C-----  00       BRK  
  0x04BF89 $9F79: C-----  00       BRK  
  0x04BF8A $9F7A: C-----  00       BRK  
  0x04BF8B $9F7B: C-----  00       BRK  
  0x04BF8C $9F7C: C-----  00       BRK  
  0x04BF8D $9F7D: C-----  00       BRK  
  0x04BF8E $9F7E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF8F $9F7F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF90 $9F80: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04BF91 $9F81: C-----  30 77    BMI  $9FFA
  0x04BF93 $9F83: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04BF94 $9F84: C-----  EE FF FF INC  $FFFF
  0x04BF97 $9F87: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF98 $9F88: C-----  F8       SED  
  0x04BF99 $9F89: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF9A $9F8A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF9B $9F8B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF9C $9F8C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF9D $9F8D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF9E $9F8E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BF9F $9F8F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFA0 $9F90: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFA1 $9F91: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFA2 $9F92: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04BFA3 $9F93: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04BFA4 $9F94: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04BFA5 $9F95: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04BFA6 $9F96: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04BFA7 $9F97: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04BFA8 $9F98: C-----  00       BRK  
  0x04BFA9 $9F99: C-----  00       BRK  
  0x04BFAA $9F9A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BFAB $9F9B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BFAC $9F9C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04BFAD $9F9D: C-----  E0 E0    CPX  #$E0
  0x04BFAF $9F9F: C-----  C0 FF    CPY  #$FF
  0x04BFB1 $9FA1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFB2 $9FA2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04BFB3 $9FA3: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x04BFB4 $9FA4: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04BFB5 $9FA5: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04BFB6 $9FA6: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04BFB7 $9FA7: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04BFB8 $9FA8: C-----  00       BRK  
  0x04BFB9 $9FA9: C-----  00       BRK  
  0x04BFBA $9FAA: C-----  F0 F8    BEQ  $9FA4
  0x04BFBC $9FAC: C-----  F8       SED  
  0x04BFBD $9FAD: C-----  F0 F0    BEQ  $9F9F
  0x04BFBF $9FAF: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04BFC0 $9FB0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFC1 $9FB1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFC2 $9FB2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFC3 $9FB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFC4 $9FB4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFC5 $9FB5: C-----  00       BRK  
  0x04BFC6 $9FB6: C-----  00       BRK  
  0x04BFC7 $9FB7: C-----  00       BRK  
  0x04BFC8 $9FB8: C-----  00       BRK  
  0x04BFC9 $9FB9: C-----  00       BRK  
  0x04BFCA $9FBA: C-----  00       BRK  
  0x04BFCB $9FBB: C-----  00       BRK  
  0x04BFCC $9FBC: C-----  00       BRK  
  0x04BFCD $9FBD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFCE $9FBE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFCF $9FBF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFD0 $9FC0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFD1 $9FC1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFD2 $9FC2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFD3 $9FC3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFD4 $9FC4: C-----  00       BRK  
  0x04BFD5 $9FC5: C-----  00       BRK  
  0x04BFD6 $9FC6: C-----  00       BRK  
  0x04BFD7 $9FC7: C-----  00       BRK  
  0x04BFD8 $9FC8: C-----  00       BRK  
  0x04BFD9 $9FC9: C-----  00       BRK  
  0x04BFDA $9FCA: C-----  00       BRK  
  0x04BFDB $9FCB: C-----  00       BRK  
  0x04BFDC $9FCC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFDD $9FCD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFDE $9FCE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFDF $9FCF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFE0 $9FD0: C-----  00       BRK  
  0x04BFE1 $9FD1: C-----  00       BRK  
  0x04BFE2 $9FD2: C-----  00       BRK  
  0x04BFE3 $9FD3: C-----  00       BRK  
  0x04BFE4 $9FD4: C-----  00       BRK  
  0x04BFE5 $9FD5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFE6 $9FD6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFE7 $9FD7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFE8 $9FD8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFE9 $9FD9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFEA $9FDA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFEB $9FDB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFEC $9FDC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFED $9FDD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFEE $9FDE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFEF $9FDF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFF0 $9FE0: C-----  00       BRK  
  0x04BFF1 $9FE1: C-----  00       BRK  
  0x04BFF2 $9FE2: C-----  00       BRK  
  0x04BFF3 $9FE3: C-----  00       BRK  
  0x04BFF4 $9FE4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFF5 $9FE5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFF6 $9FE6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFF7 $9FE7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFF8 $9FE8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFF9 $9FE9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFFA $9FEA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFFB $9FEB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFFC $9FEC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFFD $9FED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFFE $9FEE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04BFFF $9FEF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C000 $9FF0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C001 $9FF1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C002 $9FF2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C003 $9FF3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C004 $9FF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C005 $9FF5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C006 $9FF6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C007 $9FF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C008 $9FF8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C009 $9FF9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C00A $9FFA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C00B $9FFB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04C00C $9FFC: C-----  00       BRK  
  0x04C00D $9FFD: C-----  00       BRK  
  0x04C00E $9FFE: C-----  00       BRK  
  0x04C00F $9FFF: C-----  00       BRK  