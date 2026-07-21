; ===== MMC3 Bank 39 =====
; ROM: 0x04E010-0x05000F
; CPU: $8000-$9FFF
; CDL: code=8192 data=0 unaccessed=0

  0x04E010 $8000: C-----  00       BRK  
  0x04E011 $8001: C-----  00       BRK  
  0x04E012 $8002: C-----  00       BRK  
  0x04E013 $8003: C-----  00       BRK  
  0x04E014 $8004: C-----  00       BRK  
  0x04E015 $8005: C-----  00       BRK  
  0x04E016 $8006: C-----  00       BRK  
  0x04E017 $8007: C-----  00       BRK  
  0x04E018 $8008: C-----  00       BRK  
  0x04E019 $8009: C-----  00       BRK  
  0x04E01A $800A: C-----  00       BRK  
  0x04E01B $800B: C-----  00       BRK  
  0x04E01C $800C: C-----  00       BRK  
  0x04E01D $800D: C-----  00       BRK  
  0x04E01E $800E: C-----  00       BRK  
  0x04E01F $800F: C-----  00       BRK  
  0x04E020 $8010: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E021 $8011: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E022 $8012: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E023 $8013: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E024 $8014: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E025 $8015: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E026 $8016: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E027 $8017: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E028 $8018: C-----  00       BRK  
  0x04E029 $8019: C-----  00       BRK  
  0x04E02A $801A: C-----  00       BRK  
  0x04E02B $801B: C-----  00       BRK  
  0x04E02C $801C: C-----  00       BRK  
  0x04E02D $801D: C-----  00       BRK  
  0x04E02E $801E: C-----  00       BRK  
  0x04E02F $801F: C-----  00       BRK  
  0x04E030 $8020: C-----  00       BRK  
  0x04E031 $8021: C-----  00       BRK  
  0x04E032 $8022: C-----  00       BRK  
  0x04E033 $8023: C-----  01 06    ORA  ($06,X)
  0x04E035 $8025: C-----  08       PHP  
  0x04E036 $8026: C-----  10 10    BPL  $8038
  0x04E038 $8028: C-----  00       BRK  
  0x04E039 $8029: C-----  00       BRK  
  0x04E03A $802A: C-----  00       BRK  
  0x04E03B $802B: C-----  00       BRK  
  0x04E03C $802C: C-----  01 07    ORA  ($07,X)
  0x04E03E $802E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E03F $802F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E040 $8030: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04E041 $8031: C-----  30 C0    BMI  $7FF3
  0x04E043 $8033: C-----  00       BRK  
  0x04E044 $8034: C-----  00       BRK  
  0x04E045 $8035: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E046 $8036: C-----  05 03    ORA  $03
  0x04E048 $8038: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E049 $8039: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E04A $803A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E04B $803B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E04C $803C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E04D $803D: C-----  F8       SED  
  0x04E04E $803E: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04E04F $803F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E050 $8040: C-----  00       BRK  
  0x04E051 $8041: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E052 $8042: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04E053 $8043: C-----  F0 00    BEQ  $8045
  0x04E055 $8045: C-----  00       BRK  
  0x04E056 $8046: C-----  00       BRK  
  0x04E057 $8047: C-----  00       BRK  
  0x04E058 $8048: C-----  00       BRK  
  0x04E059 $8049: C-----  00       BRK  
  0x04E05A $804A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E05B $804B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E05C $804C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E05D $804D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E05E $804E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E05F $804F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E060 $8050: C-----  E0 10    CPX  #$10
  0x04E062 $8052: C-----  08       PHP  
  0x04E063 $8053: C-----  08       PHP  
  0x04E064 $8054: C-----  10 20    BPL  $8076
  0x04E066 $8056: C-----  40       RTI  
  0x04E067 $8057: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E068 $8058: C-----  00       BRK  
  0x04E069 $8059: C-----  E0 F0    CPX  #$F0
  0x04E06B $805B: C-----  F0 E0    BEQ  $803D
  0x04E06D $805D: C-----  C0 80    CPY  #$80
  0x04E06F $805F: C-----  00       BRK  
  0x04E070 $8060: C-----  00       BRK  
  0x04E071 $8061: C-----  00       BRK  
  0x04E072 $8062: C-----  00       BRK  
  0x04E073 $8063: C-----  00       BRK  
  0x04E074 $8064: C-----  00       BRK  
  0x04E075 $8065: C-----  30 C0    BMI  $8027
  0x04E077 $8067: C-----  30 FF    BMI  $8068
  0x04E079 $8069: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E07A $806A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E07B $806B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E07C $806C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E07D $806D: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04E07E $806E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E07F $806F: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04E080 $8070: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E081 $8071: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E082 $8072: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E083 $8073: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E084 $8074: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E085 $8075: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E086 $8076: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E087 $8077: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E088 $8078: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E089 $8079: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E08A $807A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E08B $807B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E08C $807C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E08D $807D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E08E $807E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E08F $807F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E090 $8080: C-----  20 20 10 JSR  $1020
  0x04E093 $8083: C-----  10 10    BPL  $8095
  0x04E095 $8085: C-----  08       PHP  
  0x04E096 $8086: C-----  08       PHP  
  0x04E097 $8087: C-----  08       PHP  
  0x04E098 $8088: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E099 $8089: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E09A $808A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E09B $808B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E09C $808C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E09D $808D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E09E $808E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E09F $808F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E0A0 $8090: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04E0A1 $8091: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E0A2 $8092: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04E0A3 $8093: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E0A4 $8094: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04E0A5 $8095: C-----  01 07    ORA  ($07,X)
  0x04E0A7 $8097: C-----  06 C3    ASL  $C3
  0x04E0A9 $8099: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E0AA $809A: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04E0AB $809B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E0AC $809C: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04E0AD $809D: C-----  FE F8 F9 INC  $F9F8,X
  0x04E0B0 $80A0: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04E0B1 $80A1: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04E0B2 $80A2: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04E0B3 $80A3: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04E0B4 $80A4: C-----  05 0A    ORA  $0A
  0x04E0B6 $80A6: C-----  08       PHP  
  0x04E0B7 $80A7: C-----  11 03    ORA  ($03),Y
  0x04E0B9 $80A9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E0BA $80AA: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E0BB $80AB: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E0BC $80AC: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04E0BD $80AD: C-----  05 07    ORA  $07
  0x04E0BF $80AF: C-----  0E 01 0E ASL  $0E01
  0x04E0C2 $80B2: C-----  30 C0    BMI  $8074
  0x04E0C4 $80B4: C-----  00       BRK  
  0x04E0C5 $80B5: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E0C6 $80B6: C-----  38       SEC  
  0x04E0C7 $80B7: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04E0C8 $80B8: C-----  FE F1 CF INC  $CFF1,X
  0x04E0CB $80BB: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E0CC $80BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E0CD $80BD: C-----  F8       SED  
  0x04E0CE $80BE: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04E0CF $80BF: C-----  38       SEC  
  0x04E0D0 $80C0: C-----  C0 30    CPY  #$30
  0x04E0D2 $80C2: C-----  C0 00    CPY  #$00
  0x04E0D4 $80C4: C-----  70 F0    BVS  $80B6
  0x04E0D6 $80C6: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04E0D7 $80C7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E0D8 $80C8: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E0D9 $80C9: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04E0DA $80CA: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E0DB $80CB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E0DC $80CC: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04E0DD $80CD: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E0DE $80CE: C-----  78       SEI  
  0x04E0DF $80CF: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04E0E0 $80D0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E0E1 $80D1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E0E2 $80D2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E0E3 $80D3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E0E4 $80D4: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E0E5 $80D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E0E6 $80D6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E0E7 $80D7: C-----  F0 FF    BEQ  $80D8
  0x04E0E9 $80D9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E0EA $80DA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E0EB $80DB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E0EC $80DC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E0ED $80DD: C-----  F0 0F    BEQ  $80EE
  0x04E0EF $80DF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E0F0 $80E0: C-----  C0 00    CPY  #$00
  0x04E0F2 $80E2: C-----  00       BRK  
  0x04E0F3 $80E3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E0F4 $80E4: C-----  78       SEI  
  0x04E0F5 $80E5: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04E0F6 $80E6: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E0F7 $80E7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E0F8 $80E8: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E0F9 $80E9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E0FA $80EA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E0FB $80EB: C-----  F8       SED  
  0x04E0FC $80EC: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04E0FD $80ED: C-----  78       SEI  
  0x04E0FE $80EE: C-----  81 09    STA  ($09,X)
  0x04E100 $80F0: C-----  00       BRK  
  0x04E101 $80F1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E102 $80F2: C-----  78       SEI  
  0x04E103 $80F3: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04E104 $80F4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E105 $80F5: C-----  FD F9 FC SBC  $FCF9,X
  0x04E108 $80F8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E109 $80F9: C-----  F8       SED  
  0x04E10A $80FA: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04E10B $80FB: C-----  78       SEI  
  0x04E10C $80FC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E10D $80FD: C-----  !!UNDEF $72  ; unknown opcode, treating as data
  0x04E10E $80FE: C-----  4E FF 0F LSR  $0FFF
  0x04E111 $8101: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x04E112 $8102: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04E113 $8103: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04E114 $8104: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04E115 $8105: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04E116 $8106: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04E117 $8107: C-----  01 00    ORA  ($00,X)
  0x04E119 $8109: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04E11A $810A: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04E11B $810B: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04E11C $810C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E11D $810D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E11E $810E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E11F $810F: C-----  FE 0C 34 INC  $340C,X
  0x04E122 $8112: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04E123 $8113: C-----  84 08    STY  $08
  0x04E125 $8115: C-----  08       PHP  
  0x04E126 $8116: C-----  08       PHP  
  0x04E127 $8117: C-----  10 00    BPL  $8119
  0x04E129 $8119: C-----  08       PHP  
  0x04E12A $811A: C-----  38       SEC  
  0x04E12B $811B: C-----  78       SEI  
  0x04E12C $811C: C-----  F0 F0    BEQ  $810E
  0x04E12E $811E: C-----  F0 E0    BEQ  $8100
  0x04E130 $8120: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E131 $8121: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E132 $8122: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E133 $8123: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E134 $8124: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E135 $8125: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E136 $8126: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E137 $8127: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E138 $8128: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E139 $8129: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E13A $812A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E13B $812B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E13C $812C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E13D $812D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E13E $812E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E13F $812F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E140 $8130: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E141 $8131: C-----  C0 C0    CPY  #$C0
  0x04E143 $8133: C-----  C0 E0    CPY  #$E0
  0x04E145 $8135: C-----  E0 E0    CPX  #$E0
  0x04E147 $8137: C-----  E0 00    CPX  #$00
  0x04E149 $8139: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E14A $813A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E14B $813B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E14C $813C: C-----  C0 C0    CPY  #$C0
  0x04E14E $813E: C-----  C0 C0    CPY  #$C0
  0x04E150 $8140: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E151 $8141: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E152 $8142: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E153 $8143: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E154 $8144: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E155 $8145: C-----  F8       SED  
  0x04E156 $8146: C-----  F8       SED  
  0x04E157 $8147: C-----  F0 B0    BEQ  $80F9
  0x04E159 $8149: C-----  B0 F0    BCS  $813B
  0x04E15B $814B: C-----  E0 E0    CPX  #$E0
  0x04E15D $814D: C-----  C0 80    CPY  #$80
  0x04E15F $814F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E160 $8150: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E161 $8151: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E162 $8152: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E163 $8153: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E164 $8154: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E165 $8155: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E166 $8156: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E167 $8157: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E168 $8158: C-----  00       BRK  
  0x04E169 $8159: C-----  00       BRK  
  0x04E16A $815A: C-----  00       BRK  
  0x04E16B $815B: C-----  00       BRK  
  0x04E16C $815C: C-----  00       BRK  
  0x04E16D $815D: C-----  00       BRK  
  0x04E16E $815E: C-----  00       BRK  
  0x04E16F $815F: C-----  00       BRK  
  0x04E170 $8160: C-----  F0 F0    BEQ  $8152
  0x04E172 $8162: C-----  F0 F0    BEQ  $8154
  0x04E174 $8164: C-----  F0 F8    BEQ  $815E
  0x04E176 $8166: C-----  F8       SED  
  0x04E177 $8167: C-----  F8       SED  
  0x04E178 $8168: C-----  C0 C0    CPY  #$C0
  0x04E17A $816A: C-----  E0 E0    CPX  #$E0
  0x04E17C $816C: C-----  E0 F0    CPX  #$F0
  0x04E17E $816E: C-----  F0 F0    BEQ  $8160
  0x04E180 $8170: C-----  00       BRK  
  0x04E181 $8171: C-----  00       BRK  
  0x04E182 $8172: C-----  00       BRK  
  0x04E183 $8173: C-----  00       BRK  
  0x04E184 $8174: C-----  01 07    ORA  ($07,X)
  0x04E186 $8176: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E187 $8177: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04E188 $8178: C-----  00       BRK  
  0x04E189 $8179: C-----  00       BRK  
  0x04E18A $817A: C-----  00       BRK  
  0x04E18B $817B: C-----  00       BRK  
  0x04E18C $817C: C-----  00       BRK  
  0x04E18D $817D: C-----  00       BRK  
  0x04E18E $817E: C-----  00       BRK  
  0x04E18F $817F: C-----  00       BRK  
  0x04E190 $8180: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E191 $8181: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E192 $8182: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E193 $8183: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E194 $8184: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E195 $8185: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E196 $8186: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E197 $8187: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E198 $8188: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E199 $8189: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E19A $818A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E19B $818B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E19C $818C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E19D $818D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E19E $818E: C-----  F9 FA 10 SBC  $10FA,Y
  0x04E1A1 $8191: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04E1A2 $8192: C-----  18       CLC  
  0x04E1A3 $8193: C-----  3E 3F 7E ROL  $7E3F,X
  0x04E1A6 $8196: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E1A7 $8197: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E1A8 $8198: C-----  00       BRK  
  0x04E1A9 $8199: C-----  00       BRK  
  0x04E1AA $819A: C-----  00       BRK  
  0x04E1AB $819B: C-----  00       BRK  
  0x04E1AC $819C: C-----  00       BRK  
  0x04E1AD $819D: C-----  30 38    BMI  $81D7
  0x04E1AF $819F: C-----  68       PLA  
  0x04E1B0 $81A0: C-----  39 C3 3F AND  $3FC3,Y
  0x04E1B3 $81A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E1B4 $81A4: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04E1B5 $81A5: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04E1B6 $81A6: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04E1B7 $81A7: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04E1B8 $81A8: C-----  C6 3C    DEC  $3C
  0x04E1BA $81AA: C-----  C0 1C    CPY  #$1C
  0x04E1BC $81AC: C-----  AE DE 1E LDX  $1EDE
  0x04E1BF $81AF: C-----  3E FF FF ROL  $FFFF,X
  0x04E1C2 $81B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E1C3 $81B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E1C4 $81B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E1C5 $81B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E1C6 $81B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E1C7 $81B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E1C8 $81B8: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04E1C9 $81B9: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04E1CA $81BA: C-----  4C 54 54 JMP  $5454
  0x04E1CD $81BD: C-----  C8       INY  
  0x04E1CE $81BE: C-----  D8       CLD  
  0x04E1CF $81BF: C-----  B8       CLV  
  0x04E1D0 $81C0: C-----  F0 FC    BEQ  $81BE
  0x04E1D2 $81C2: C-----  F8       SED  
  0x04E1D3 $81C3: C-----  FE FF CE INC  $CEFF,X
  0x04E1D6 $81C6: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04E1D7 $81C7: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x04E1D8 $81C8: C-----  E0 E0    CPX  #$E0
  0x04E1DA $81CA: C-----  E0 C0    CPX  #$C0
  0x04E1DC $81CC: C-----  C0 80    CPY  #$80
  0x04E1DE $81CE: C-----  00       BRK  
  0x04E1DF $81CF: C-----  00       BRK  
  0x04E1E0 $81D0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E1E1 $81D1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E1E2 $81D2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E1E3 $81D3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E1E4 $81D4: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04E1E5 $81D5: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04E1E6 $81D6: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04E1E7 $81D7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E1E8 $81D8: C-----  00       BRK  
  0x04E1E9 $81D9: C-----  00       BRK  
  0x04E1EA $81DA: C-----  00       BRK  
  0x04E1EB $81DB: C-----  00       BRK  
  0x04E1EC $81DC: C-----  00       BRK  
  0x04E1ED $81DD: C-----  00       BRK  
  0x04E1EE $81DE: C-----  00       BRK  
  0x04E1EF $81DF: C-----  00       BRK  
  0x04E1F0 $81E0: C-----  00       BRK  
  0x04E1F1 $81E1: C-----  00       BRK  
  0x04E1F2 $81E2: C-----  00       BRK  
  0x04E1F3 $81E3: C-----  00       BRK  
  0x04E1F4 $81E4: C-----  00       BRK  
  0x04E1F5 $81E5: C-----  00       BRK  
  0x04E1F6 $81E6: C-----  00       BRK  
  0x04E1F7 $81E7: C-----  00       BRK  
  0x04E1F8 $81E8: C-----  F0 E0    BEQ  $81CA
  0x04E1FA $81EA: C-----  00       BRK  
  0x04E1FB $81EB: C-----  00       BRK  
  0x04E1FC $81EC: C-----  00       BRK  
  0x04E1FD $81ED: C-----  00       BRK  
  0x04E1FE $81EE: C-----  00       BRK  
  0x04E1FF $81EF: C-----  00       BRK  
  0x04E200 $81F0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E201 $81F1: C-----  FE FF FF INC  $FFFF,X
  0x04E204 $81F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E205 $81F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E206 $81F6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E207 $81F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E208 $81F8: C-----  00       BRK  
  0x04E209 $81F9: C-----  00       BRK  
  0x04E20A $81FA: C-----  00       BRK  
  0x04E20B $81FB: C-----  00       BRK  
  0x04E20C $81FC: C-----  00       BRK  
  0x04E20D $81FD: C-----  00       BRK  
  0x04E20E $81FE: C-----  00       BRK  
  0x04E20F $81FF: C-----  00       BRK  
  0x04E210 $8200: C-----  01 03    ORA  ($03,X)
  0x04E212 $8202: C-----  06 0D    ASL  $0D
  0x04E214 $8204: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x04E215 $8205: C-----  31 26    AND  ($26),Y
  0x04E217 $8207: C-----  38       SEC  
  0x04E218 $8208: C-----  00       BRK  
  0x04E219 $8209: C-----  00       BRK  
  0x04E21A $820A: C-----  01 02    ORA  ($02,X)
  0x04E21C $820C: C-----  05 0E    ORA  $0E
  0x04E21E $820E: C-----  18       CLC  
  0x04E21F $820F: C-----  00       BRK  
  0x04E220 $8210: C-----  26 59    ROL  $59
  0x04E222 $8212: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04E223 $8213: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04E224 $8214: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x04E225 $8215: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04E226 $8216: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x04E227 $8217: C-----  61 19    ADC  ($19,X)
  0x04E229 $8219: C-----  26 18    ROL  $18
  0x04E22B $821B: C-----  60       RTS  
  0x04E22C $821C: C-----  85 19    STA  $19
  0x04E22E $821E: C-----  61 80    ADC  ($80,X)
  0x04E230 $8220: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E231 $8221: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E232 $8222: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E233 $8223: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E234 $8224: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E235 $8225: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E236 $8226: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E237 $8227: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E238 $8228: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E239 $8229: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E23A $822A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E23B $822B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E23C $822C: C-----  F1 F9    SBC  ($F9),Y
  0x04E23E $822E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E23F $822F: C-----  EA       NOP  
  0x04E240 $8230: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E241 $8231: C-----  E0 F0    CPX  #$F0
  0x04E243 $8233: C-----  F0 F8    BEQ  $822D
  0x04E245 $8235: C-----  F8       SED  
  0x04E246 $8236: C-----  F8       SED  
  0x04E247 $8237: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E248 $8238: C-----  00       BRK  
  0x04E249 $8239: C-----  00       BRK  
  0x04E24A $823A: C-----  00       BRK  
  0x04E24B $823B: C-----  00       BRK  
  0x04E24C $823C: C-----  00       BRK  
  0x04E24D $823D: C-----  00       BRK  
  0x04E24E $823E: C-----  00       BRK  
  0x04E24F $823F: C-----  00       BRK  
  0x04E250 $8240: C-----  39 EB E7 AND  $E7EB,Y
  0x04E253 $8243: C-----  E0 F0    CPX  #$F0
  0x04E255 $8245: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E256 $8246: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E257 $8247: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E258 $8248: C-----  C6 14    DEC  $14
  0x04E25A $824A: C-----  58       CLI  
  0x04E25B $824B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E25C $824C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E25D $824D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E25E $824E: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04E25F $824F: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04E260 $8250: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E261 $8251: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E262 $8252: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E263 $8253: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E264 $8254: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E265 $8255: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E266 $8256: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E267 $8257: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E268 $8258: C-----  2C D7 FF BIT  $FFD7
  0x04E26B $825B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E26C $825C: C-----  F1 F9    SBC  ($F9),Y
  0x04E26E $825E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E26F $825F: C-----  EA       NOP  
  0x04E270 $8260: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E271 $8261: C-----  78       SEI  
  0x04E272 $8262: C-----  30 10    BMI  $8274
  0x04E274 $8264: C-----  10 10    BPL  $8276
  0x04E276 $8266: C-----  08       PHP  
  0x04E277 $8267: C-----  08       PHP  
  0x04E278 $8268: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04E279 $8269: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E27A $826A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E27B $826B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E27C $826C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E27D $826D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E27E $826E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E27F $826F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E280 $8270: C-----  E0 E0    CPX  #$E0
  0x04E282 $8272: C-----  E0 F8    CPX  #$F8
  0x04E284 $8274: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E285 $8275: C-----  FE FC FC INC  $FCFC,X
  0x04E288 $8278: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04E289 $8279: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04E28A $827A: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04E28B $827B: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04E28C $827C: C-----  E0 E0    CPX  #$E0
  0x04E28E $827E: C-----  F0 F0    BEQ  $8270
  0x04E290 $8280: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E291 $8281: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E292 $8282: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E293 $8283: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E294 $8284: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E295 $8285: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E296 $8286: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E297 $8287: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E298 $8288: C-----  00       BRK  
  0x04E299 $8289: C-----  00       BRK  
  0x04E29A $828A: C-----  00       BRK  
  0x04E29B $828B: C-----  00       BRK  
  0x04E29C $828C: C-----  00       BRK  
  0x04E29D $828D: C-----  08       PHP  
  0x04E29E $828E: C-----  48       PHA  
  0x04E29F $828F: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x04E2A0 $8290: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E2A1 $8291: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E2A2 $8292: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E2A3 $8293: C-----  FE FE FE INC  $FEFE,X
  0x04E2A6 $8296: C-----  FE FE 00 INC  $00FE,X
  0x04E2A9 $8299: C-----  00       BRK  
  0x04E2AA $829A: C-----  00       BRK  
  0x04E2AB $829B: C-----  00       BRK  
  0x04E2AC $829C: C-----  00       BRK  
  0x04E2AD $829D: C-----  30 38    BMI  $82D7
  0x04E2AF $829F: C-----  68       PLA  
  0x04E2B0 $82A0: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E2B1 $82A1: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E2B2 $82A2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E2B3 $82A3: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E2B4 $82A4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E2B5 $82A5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E2B6 $82A6: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E2B7 $82A7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E2B8 $82A8: C-----  00       BRK  
  0x04E2B9 $82A9: C-----  00       BRK  
  0x04E2BA $82AA: C-----  00       BRK  
  0x04E2BB $82AB: C-----  01 01    ORA  ($01,X)
  0x04E2BD $82AD: C-----  01 01    ORA  ($01,X)
  0x04E2BF $82AF: C-----  01 FF    ORA  ($FF,X)
  0x04E2C1 $82B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E2C2 $82B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E2C3 $82B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E2C4 $82B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E2C5 $82B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E2C6 $82B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E2C7 $82B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E2C8 $82B8: C-----  00       BRK  
  0x04E2C9 $82B9: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04E2CA $82BA: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04E2CB $82BB: C-----  26 FF    ROL  $FF
  0x04E2CD $82BD: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04E2CE $82BE: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04E2CF $82BF: C-----  E0 04    CPX  #$04
  0x04E2D1 $82C1: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04E2D2 $82C2: C-----  01 00    ORA  ($00,X)
  0x04E2D4 $82C4: C-----  00       BRK  
  0x04E2D5 $82C5: C-----  00       BRK  
  0x04E2D6 $82C6: C-----  00       BRK  
  0x04E2D7 $82C7: C-----  00       BRK  
  0x04E2D8 $82C8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E2D9 $82C9: C-----  01 00    ORA  ($00,X)
  0x04E2DB $82CB: C-----  00       BRK  
  0x04E2DC $82CC: C-----  00       BRK  
  0x04E2DD $82CD: C-----  00       BRK  
  0x04E2DE $82CE: C-----  00       BRK  
  0x04E2DF $82CF: C-----  00       BRK  
  0x04E2E0 $82D0: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04E2E1 $82D1: C-----  06 83    ASL  $83
  0x04E2E3 $82D3: C-----  60       RTS  
  0x04E2E4 $82D4: C-----  38       SEC  
  0x04E2E5 $82D5: C-----  3E 3F 1F ROL  $1F3F,X
  0x04E2E8 $82D8: C-----  F8       SED  
  0x04E2E9 $82D9: C-----  F8       SED  
  0x04E2EA $82DA: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04E2EB $82DB: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E2EC $82DC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E2ED $82DD: C-----  19 1C 0E ORA  $0E1C,Y
  0x04E2F0 $82E0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E2F1 $82E1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E2F2 $82E2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E2F3 $82E3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E2F4 $82E4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E2F5 $82E5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E2F6 $82E6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E2F7 $82E7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E2F8 $82E8: C-----  20 61 63 JSR  $6361
  0x04E2FB $82EB: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x04E2FC $82EC: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04E2FD $82ED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E2FE $82EE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E2FF $82EF: C-----  FE FF FF INC  $FFFF,X
  0x04E302 $82F2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E303 $82F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E304 $82F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E305 $82F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E306 $82F6: C-----  FD FC 84 SBC  $84FC,X
  0x04E309 $82F9: C-----  8D 1F 7C STA  $7C1F
  0x04E30C $82FC: C-----  F8       SED  
  0x04E30D $82FD: C-----  E0 8A    CPX  #$8A
  0x04E30F $82FF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E310 $8300: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E311 $8301: C-----  FE FF FF INC  $FFFF,X
  0x04E314 $8304: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E315 $8305: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E316 $8306: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04E317 $8307: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04E318 $8308: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E319 $8309: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E31A $830A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E31B $830B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E31C $830C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E31D $830D: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04E31E $830E: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x04E31F $830F: C-----  7D FF FF ADC  $FFFF,X
  0x04E322 $8312: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E323 $8313: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E324 $8314: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E325 $8315: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04E326 $8316: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E327 $8317: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E328 $8318: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E329 $8319: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E32A $831A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E32B $831B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E32C $831C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E32D $831D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E32E $831E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E32F $831F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E330 $8320: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E331 $8321: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E332 $8322: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E333 $8323: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E334 $8324: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04E335 $8325: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E336 $8326: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E337 $8327: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E338 $8328: C-----  FD F8 F0 SBC  $F0F8,X
  0x04E33B $832B: C-----  C0 00    CPY  #$00
  0x04E33D $832D: C-----  00       BRK  
  0x04E33E $832E: C-----  01 01    ORA  ($01,X)
  0x04E340 $8330: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E341 $8331: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E342 $8332: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E343 $8333: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E344 $8334: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E345 $8335: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E346 $8336: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E347 $8337: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E348 $8338: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E349 $8339: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E34A $833A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E34B $833B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E34C $833C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E34D $833D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E34E $833E: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04E34F $833F: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04E350 $8340: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E351 $8341: C-----  FE FF FD INC  $FDFF,X
  0x04E354 $8344: C-----  FE FF F2 INC  $F2FF,X
  0x04E357 $8347: C-----  D9 B0 B0 CMP  $B0B0,Y
  0x04E35A $834A: C-----  F0 E0    BEQ  $832C
  0x04E35C $834C: C-----  E0 C0    CPX  #$C0
  0x04E35E $834E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E35F $834F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E360 $8350: C-----  00       BRK  
  0x04E361 $8351: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E362 $8352: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E363 $8353: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E364 $8354: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E365 $8355: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E366 $8356: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x04E367 $8357: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04E368 $8358: C-----  00       BRK  
  0x04E369 $8359: C-----  00       BRK  
  0x04E36A $835A: C-----  00       BRK  
  0x04E36B $835B: C-----  00       BRK  
  0x04E36C $835C: C-----  00       BRK  
  0x04E36D $835D: C-----  00       BRK  
  0x04E36E $835E: C-----  00       BRK  
  0x04E36F $835F: C-----  00       BRK  
  0x04E370 $8360: C-----  E0 E0    CPX  #$E0
  0x04E372 $8362: C-----  F0 F0    BEQ  $8354
  0x04E374 $8364: C-----  F0 F8    BEQ  $835E
  0x04E376 $8366: C-----  F8       SED  
  0x04E377 $8367: C-----  F8       SED  
  0x04E378 $8368: C-----  C0 C0    CPY  #$C0
  0x04E37A $836A: C-----  E0 E0    CPX  #$E0
  0x04E37C $836C: C-----  E0 F0    CPX  #$F0
  0x04E37E $836E: C-----  F0 F0    BEQ  $8360
  0x04E380 $8370: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E381 $8371: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E382 $8372: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E383 $8373: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E384 $8374: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E385 $8375: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E386 $8376: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E387 $8377: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E388 $8378: C-----  00       BRK  
  0x04E389 $8379: C-----  00       BRK  
  0x04E38A $837A: C-----  00       BRK  
  0x04E38B $837B: C-----  00       BRK  
  0x04E38C $837C: C-----  00       BRK  
  0x04E38D $837D: C-----  00       BRK  
  0x04E38E $837E: C-----  00       BRK  
  0x04E38F $837F: C-----  90 04    BCC  $8385
  0x04E391 $8381: C-----  18       CLC  
  0x04E392 $8382: C-----  E0 01    CPX  #$01
  0x04E394 $8384: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E395 $8385: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E396 $8386: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E397 $8387: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E398 $8388: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E399 $8389: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E39A $838A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E39B $838B: C-----  FE FC F0 INC  $F0FC,X
  0x04E39E $838E: C-----  01 03    ORA  ($03,X)
  0x04E3A0 $8390: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E3A1 $8391: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E3A2 $8392: C-----  F9 F0 E0 SBC  $E0F0,Y
  0x04E3A5 $8395: C-----  C0 80    CPY  #$80
  0x04E3A7 $8397: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E3A8 $8398: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04E3A9 $8399: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04E3AA $839A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E3AB $839B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E3AC $839C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E3AD $839D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E3AE $839E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E3AF $839F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E3B0 $83A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E3B1 $83A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E3B2 $83A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E3B3 $83A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E3B4 $83A4: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04E3B5 $83A5: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04E3B6 $83A6: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04E3B7 $83A7: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04E3B8 $83A8: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E3B9 $83A9: C-----  C4 3C    CPY  $3C
  0x04E3BB $83AB: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04E3BC $83AC: C-----  AE DE 1E LDX  $1EDE
  0x04E3BF $83AF: C-----  3E FE FE ROL  $FEFE,X
  0x04E3C2 $83B2: C-----  FE FE FE INC  $FEFE,X
  0x04E3C5 $83B5: C-----  FE FE FE INC  $FEFE,X
  0x04E3C8 $83B8: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04E3C9 $83B9: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04E3CA $83BA: C-----  4C 54 54 JMP  $5454
  0x04E3CD $83BD: C-----  C8       INY  
  0x04E3CE $83BE: C-----  D8       CLD  
  0x04E3CF $83BF: C-----  B8       CLV  
  0x04E3D0 $83C0: C-----  F8       SED  
  0x04E3D1 $83C1: C-----  F8       SED  
  0x04E3D2 $83C2: C-----  F0 F0    BEQ  $83B4
  0x04E3D4 $83C4: C-----  E0 E0    CPX  #$E0
  0x04E3D6 $83C6: C-----  C0 80    CPY  #$80
  0x04E3D8 $83C8: C-----  F0 F0    BEQ  $83BA
  0x04E3DA $83CA: C-----  E0 E0    CPX  #$E0
  0x04E3DC $83CC: C-----  C0 C0    CPY  #$C0
  0x04E3DE $83CE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E3DF $83CF: C-----  00       BRK  
  0x04E3E0 $83D0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E3E1 $83D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E3E2 $83D2: C-----  F9 F1 E1 SBC  $E1F1,Y
  0x04E3E5 $83D5: C-----  E0 C0    CPX  #$C0
  0x04E3E7 $83D7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E3E8 $83D8: C-----  C0 E0    CPY  #$E0
  0x04E3EA $83DA: C-----  E0 E0    CPX  #$E0
  0x04E3EC $83DC: C-----  C0 C0    CPY  #$C0
  0x04E3EE $83DE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E3EF $83DF: C-----  00       BRK  
  0x04E3F0 $83E0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E3F1 $83E1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E3F2 $83E2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E3F3 $83E3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E3F4 $83E4: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E3F5 $83E5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E3F6 $83E6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E3F7 $83E7: C-----  01 05    ORA  ($05,X)
  0x04E3F9 $83E9: C-----  05 02    ORA  $02
  0x04E3FB $83EB: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04E3FC $83EC: C-----  01 01    ORA  ($01,X)
  0x04E3FE $83EE: C-----  01 00    ORA  ($00,X)
  0x04E400 $83F0: C-----  E9 EB    SBC  #$EB
  0x04E402 $83F2: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04E403 $83F3: C-----  E0 F0    CPX  #$F0
  0x04E405 $83F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E406 $83F6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E407 $83F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E408 $83F8: C-----  D6 F4    DEC  $F4,X
  0x04E40A $83FA: C-----  F8       SED  
  0x04E40B $83FB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E40C $83FC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E40D $83FD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E40E $83FE: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04E40F $83FF: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04E410 $8400: C-----  00       BRK  
  0x04E411 $8401: C-----  00       BRK  
  0x04E412 $8402: C-----  00       BRK  
  0x04E413 $8403: C-----  01 03    ORA  ($03,X)
  0x04E415 $8405: C-----  06 04    ASL  $04
  0x04E417 $8407: C-----  09 00    ORA  #$00
  0x04E419 $8409: C-----  00       BRK  
  0x04E41A $840A: C-----  00       BRK  
  0x04E41B $840B: C-----  00       BRK  
  0x04E41C $840C: C-----  00       BRK  
  0x04E41D $840D: C-----  00       BRK  
  0x04E41E $840E: C-----  00       BRK  
  0x04E41F $840F: C-----  00       BRK  
  0x04E420 $8410: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E421 $8411: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E422 $8412: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E423 $8413: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04E424 $8414: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E425 $8415: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E426 $8416: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E427 $8417: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E428 $8418: C-----  00       BRK  
  0x04E429 $8419: C-----  00       BRK  
  0x04E42A $841A: C-----  00       BRK  
  0x04E42B $841B: C-----  00       BRK  
  0x04E42C $841C: C-----  00       BRK  
  0x04E42D $841D: C-----  00       BRK  
  0x04E42E $841E: C-----  00       BRK  
  0x04E42F $841F: C-----  00       BRK  
  0x04E430 $8420: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E431 $8421: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E432 $8422: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E433 $8423: C-----  06 0C    ASL  $0C
  0x04E435 $8425: C-----  0D 09 09 ORA  $0909
  0x04E438 $8428: C-----  00       BRK  
  0x04E439 $8429: C-----  00       BRK  
  0x04E43A $842A: C-----  00       BRK  
  0x04E43B $842B: C-----  00       BRK  
  0x04E43C $842C: C-----  00       BRK  
  0x04E43D $842D: C-----  00       BRK  
  0x04E43E $842E: C-----  00       BRK  
  0x04E43F $842F: C-----  00       BRK  
  0x04E440 $8430: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E441 $8431: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E442 $8432: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E443 $8433: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04E444 $8434: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04E445 $8435: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E446 $8436: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E447 $8437: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E448 $8438: C-----  00       BRK  
  0x04E449 $8439: C-----  00       BRK  
  0x04E44A $843A: C-----  00       BRK  
  0x04E44B $843B: C-----  00       BRK  
  0x04E44C $843C: C-----  01 01    ORA  ($01,X)
  0x04E44E $843E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E44F $843F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E450 $8440: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E451 $8441: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E452 $8442: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E453 $8443: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E454 $8444: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E455 $8445: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E456 $8446: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E457 $8447: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E458 $8448: C-----  00       BRK  
  0x04E459 $8449: C-----  00       BRK  
  0x04E45A $844A: C-----  00       BRK  
  0x04E45B $844B: C-----  00       BRK  
  0x04E45C $844C: C-----  00       BRK  
  0x04E45D $844D: C-----  00       BRK  
  0x04E45E $844E: C-----  09 09    ORA  #$09
  0x04E460 $8450: C-----  40       RTI  
  0x04E461 $8451: C-----  40       RTI  
  0x04E462 $8452: C-----  E0 E1    CPX  #$E1
  0x04E464 $8454: C-----  E1 E1    SBC  ($E1,X)
  0x04E466 $8456: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04E467 $8457: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04E468 $8458: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04E469 $8459: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04E46A $845A: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04E46B $845B: C-----  5E DE DE LSR  $DEDE,X
  0x04E46E $845E: C-----  ED ED FF SBC  $FFED
  0x04E471 $8461: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E472 $8462: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E473 $8463: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E474 $8464: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E475 $8465: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E476 $8466: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E477 $8467: C-----  E1 13    SBC  ($13,X)
  0x04E479 $8469: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04E47A $846A: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x04E47B $846B: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04E47C $846C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E47D $846D: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04E47E $846E: C-----  C1 C0    CMP  ($C0,X)
  0x04E480 $8470: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04E481 $8471: C-----  F9 FD FF SBC  $FFFD,Y
  0x04E484 $8474: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E485 $8475: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E486 $8476: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E487 $8477: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E488 $8478: C-----  F5 F6    SBC  $F6,X
  0x04E48A $847A: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04E48B $847B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E48C $847C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E48D $847D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E48E $847E: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04E48F $847F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E490 $8480: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x04E491 $8481: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04E492 $8482: C-----  0D 06 00 ORA  $0006
  0x04E495 $8485: C-----  00       BRK  
  0x04E496 $8486: C-----  00       BRK  
  0x04E497 $8487: C-----  00       BRK  
  0x04E498 $8488: C-----  1E 1D 1B ASL  $1B1D,X
  0x04E49B $848B: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E49C $848C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E49D $848D: C-----  06 00    ASL  $00
  0x04E49F $848F: C-----  00       BRK  
  0x04E4A0 $8490: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E4A1 $8491: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E4A2 $8492: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E4A3 $8493: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E4A4 $8494: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E4A5 $8495: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E4A6 $8496: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E4A7 $8497: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E4A8 $8498: C-----  01 01    ORA  ($01,X)
  0x04E4AA $849A: C-----  00       BRK  
  0x04E4AB $849B: C-----  00       BRK  
  0x04E4AC $849C: C-----  00       BRK  
  0x04E4AD $849D: C-----  00       BRK  
  0x04E4AE $849E: C-----  00       BRK  
  0x04E4AF $849F: C-----  00       BRK  
  0x04E4B0 $84A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E4B1 $84A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E4B2 $84A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E4B3 $84A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E4B4 $84A4: C-----  F8       SED  
  0x04E4B5 $84A5: C-----  E0 80    CPX  #$80
  0x04E4B7 $84A7: C-----  00       BRK  
  0x04E4B8 $84A8: C-----  00       BRK  
  0x04E4B9 $84A9: C-----  00       BRK  
  0x04E4BA $84AA: C-----  00       BRK  
  0x04E4BB $84AB: C-----  00       BRK  
  0x04E4BC $84AC: C-----  00       BRK  
  0x04E4BD $84AD: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E4BE $84AE: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E4BF $84AF: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E4C0 $84B0: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E4C1 $84B1: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E4C2 $84B2: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04E4C3 $84B3: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04E4C4 $84B4: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x04E4C5 $84B5: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x04E4C6 $84B6: C-----  25 15    AND  $15
  0x04E4C8 $84B8: C-----  00       BRK  
  0x04E4C9 $84B9: C-----  00       BRK  
  0x04E4CA $84BA: C-----  00       BRK  
  0x04E4CB $84BB: C-----  00       BRK  
  0x04E4CC $84BC: C-----  00       BRK  
  0x04E4CD $84BD: C-----  00       BRK  
  0x04E4CE $84BE: C-----  00       BRK  
  0x04E4CF $84BF: C-----  00       BRK  
  0x04E4D0 $84C0: C-----  E0 E0    CPX  #$E0
  0x04E4D2 $84C2: C-----  C0 80    CPY  #$80
  0x04E4D4 $84C4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E4D5 $84C5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E4D6 $84C6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E4D7 $84C7: C-----  C0 E0    CPY  #$E0
  0x04E4D9 $84C9: C-----  E0 E0    CPX  #$E0
  0x04E4DB $84CB: C-----  F0 79    BEQ  $8546
  0x04E4DD $84CD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E4DE $84CE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E4DF $84CF: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E4E0 $84D0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E4E1 $84D1: C-----  78       SEI  
  0x04E4E2 $84D2: C-----  60       RTS  
  0x04E4E3 $84D3: C-----  60       RTS  
  0x04E4E4 $84D4: C-----  70 18    BVS  $84EE
  0x04E4E6 $84D6: C-----  10 03    BPL  $84DB
  0x04E4E8 $84D8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E4E9 $84D9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E4EA $84DA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E4EB $84DB: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04E4EC $84DC: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04E4ED $84DD: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04E4EE $84DE: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04E4EF $84DF: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E4F0 $84E0: C-----  C0 C0    CPY  #$C0
  0x04E4F2 $84E2: C-----  E0 E0    CPX  #$E0
  0x04E4F4 $84E4: C-----  E0 F0    CPX  #$F0
  0x04E4F6 $84E6: C-----  F0 F8    BEQ  $84E0
  0x04E4F8 $84E8: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E4F9 $84E9: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E4FA $84EA: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E4FB $84EB: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E4FC $84EC: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E4FD $84ED: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E4FE $84EE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E4FF $84EF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E500 $84F0: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04E501 $84F1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E502 $84F2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E503 $84F3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E504 $84F4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E505 $84F5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E506 $84F6: C-----  3E 1C 33 ROL  $331C,X
  0x04E509 $84F9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E50A $84FA: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04E50B $84FB: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x04E50C $84FC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E50D $84FD: C-----  C0 C0    CPY  #$C0
  0x04E50F $84FF: C-----  E0 00    CPX  #$00
  0x04E511 $8501: C-----  00       BRK  
  0x04E512 $8502: C-----  00       BRK  
  0x04E513 $8503: C-----  00       BRK  
  0x04E514 $8504: C-----  00       BRK  
  0x04E515 $8505: C-----  08       PHP  
  0x04E516 $8506: C-----  AC AE FF LDY  $FFAE
  0x04E519 $8509: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E51A $850A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E51B $850B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E51C $850C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E51D $850D: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04E51E $850E: C-----  !!UNDEF $53  ; unknown opcode, treating as data
  0x04E51F $850F: C-----  55 10    EOR  $10,X
  0x04E521 $8511: C-----  60       RTS  
  0x04E522 $8512: C-----  81 03    STA  ($03,X)
  0x04E524 $8514: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E525 $8515: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E526 $8516: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E527 $8517: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E528 $8518: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E529 $8519: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E52A $851A: C-----  7E FC F8 ROR  $F8FC,X
  0x04E52D $851D: C-----  F0 C1    BEQ  $84E0
  0x04E52F $851F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E530 $8520: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E531 $8521: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E532 $8522: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E533 $8523: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E534 $8524: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E535 $8525: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E536 $8526: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E537 $8527: C-----  F8       SED  
  0x04E538 $8528: C-----  26 B3    ROL  $B3
  0x04E53A $852A: C-----  D9 6E 38 CMP  $386E,Y
  0x04E53D $852D: C-----  E0 88    CPX  #$88
  0x04E53F $852F: C-----  78       SEI  
  0x04E540 $8530: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E541 $8531: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E542 $8532: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E543 $8533: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E544 $8534: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E545 $8535: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E546 $8536: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E547 $8537: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E548 $8538: C-----  00       BRK  
  0x04E549 $8539: C-----  10 88    BPL  $84C3
  0x04E54B $853B: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04E54C $853C: C-----  !!UNDEF $72  ; unknown opcode, treating as data
  0x04E54D $853D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E54E $853E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E54F $853F: C-----  1E 7F FF ASL  $FF7F,X
  0x04E552 $8542: C-----  F9 F0 E0 SBC  $E0F0,Y
  0x04E555 $8545: C-----  C0 80    CPY  #$80
  0x04E557 $8547: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E558 $8548: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04E559 $8549: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E55A $854A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E55B $854B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E55C $854C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E55D $854D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E55E $854E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E55F $854F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E560 $8550: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04E561 $8551: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04E562 $8552: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04E563 $8553: C-----  01 31    ORA  ($31,X)
  0x04E565 $8555: C-----  79 7C FC ADC  $FC7C,Y
  0x04E568 $8558: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E569 $8559: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E56A $855A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E56B $855B: C-----  FE CE B6 INC  $B6CE,X
  0x04E56E $855E: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x04E56F $855F: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x04E570 $8560: C-----  30 B8    BMI  $851A
  0x04E572 $8562: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04E573 $8563: C-----  FE FE FE INC  $FEFE,X
  0x04E576 $8566: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E577 $8567: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E578 $8568: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04E579 $8569: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04E57A $856A: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x04E57B $856B: C-----  05 7D    ORA  $7D
  0x04E57D $856D: C-----  1D 0C 0C ORA  $0C0C,X
  0x04E580 $8570: C-----  FE FE FE INC  $FEFE,X
  0x04E583 $8573: C-----  FE FE FC INC  $FCFE,X
  0x04E586 $8576: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E587 $8577: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E588 $8578: C-----  55 55    EOR  $55,X
  0x04E58A $857A: C-----  4D 55 55 EOR  $5555
  0x04E58D $857D: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x04E58E $857E: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x04E58F $857F: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x04E590 $8580: C-----  00       BRK  
  0x04E591 $8581: C-----  00       BRK  
  0x04E592 $8582: C-----  00       BRK  
  0x04E593 $8583: C-----  00       BRK  
  0x04E594 $8584: C-----  00       BRK  
  0x04E595 $8585: C-----  70 F8    BVS  $857F
  0x04E597 $8587: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E598 $8588: C-----  F8       SED  
  0x04E599 $8589: C-----  F8       SED  
  0x04E59A $858A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E59B $858B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E59C $858C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E59D $858D: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04E59E $858E: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04E59F $858F: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04E5A0 $8590: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E5A1 $8591: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E5A2 $8592: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E5A3 $8593: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E5A4 $8594: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E5A5 $8595: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E5A6 $8596: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E5A7 $8597: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E5A8 $8598: C-----  1E 1C 3C ASL  $3C1C,X
  0x04E5AB $859B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E5AC $859C: C-----  F8       SED  
  0x04E5AD $859D: C-----  F8       SED  
  0x04E5AE $859E: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04E5AF $859F: C-----  F6 FE    INC  $FE,X
  0x04E5B1 $85A1: C-----  FE FE FE INC  $FEFE,X
  0x04E5B4 $85A4: C-----  8E 04 04 STX  $0404
  0x04E5B7 $85A7: C-----  08       PHP  
  0x04E5B8 $85A8: C-----  F1 E1    SBC  ($E1),Y
  0x04E5BA $85AA: C-----  81 01    STA  ($01,X)
  0x04E5BC $85AC: C-----  01 03    ORA  ($03,X)
  0x04E5BE $85AE: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E5BF $85AF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E5C0 $85B0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E5C1 $85B1: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E5C2 $85B2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E5C3 $85B3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E5C4 $85B4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E5C5 $85B5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E5C6 $85B6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E5C7 $85B7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E5C8 $85B8: C-----  F6 F6    INC  $F6,X
  0x04E5CA $85BA: C-----  FE FE FE INC  $FEFE,X
  0x04E5CD $85BD: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04E5CE $85BE: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04E5CF $85BF: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04E5D0 $85C0: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E5D1 $85C1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E5D2 $85C2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E5D3 $85C3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E5D4 $85C4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E5D5 $85C5: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E5D6 $85C6: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E5D7 $85C7: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E5D8 $85C8: C-----  1E 1E 3F ASL  $3F1E,X
  0x04E5DB $85CB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E5DC $85CC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E5DD $85CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E5DE $85CE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E5DF $85CF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E5E0 $85D0: C-----  F8       SED  
  0x04E5E1 $85D1: C-----  F9 F9 F1 SBC  $F1F9,Y
  0x04E5E4 $85D4: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x04E5E5 $85D5: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x04E5E6 $85D6: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x04E5E7 $85D7: C-----  C4 B7    CPY  $B7
  0x04E5E9 $85D9: C-----  B6 F6    LDX  $F6,Y
  0x04E5EB $85DB: C-----  EE EC DC INC  $DCEC
  0x04E5EE $85DE: C-----  BC B8 07 LDY  $07B8,X
  0x04E5F1 $85E1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E5F2 $85E2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E5F3 $85E3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E5F4 $85E4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E5F5 $85E5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E5F6 $85E6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E5F7 $85E7: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E5F8 $85E8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E5F9 $85E9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E5FA $85EA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E5FB $85EB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E5FC $85EC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E5FD $85ED: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04E5FE $85EE: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04E5FF $85EF: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04E600 $85F0: C-----  E4 E4    CPX  $E4
  0x04E602 $85F2: C-----  F8       SED  
  0x04E603 $85F3: C-----  F8       SED  
  0x04E604 $85F4: C-----  F0 F8    BEQ  $85EE
  0x04E606 $85F6: C-----  F8       SED  
  0x04E607 $85F7: C-----  F8       SED  
  0x04E608 $85F8: C-----  D8       CLD  
  0x04E609 $85F9: C-----  D8       CLD  
  0x04E60A $85FA: C-----  E0 E0    CPX  #$E0
  0x04E60C $85FC: C-----  E0 F0    CPX  #$F0
  0x04E60E $85FE: C-----  F0 F0    BEQ  $85F0
  0x04E610 $8600: C-----  38       SEC  
  0x04E611 $8601: C-----  7E 57 35 ROR  $3557,X
  0x04E614 $8604: C-----  18       CLC  
  0x04E615 $8605: C-----  00       BRK  
  0x04E616 $8606: C-----  00       BRK  
  0x04E617 $8607: C-----  00       BRK  
  0x04E618 $8608: C-----  00       BRK  
  0x04E619 $8609: C-----  00       BRK  
  0x04E61A $860A: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04E61B $860B: C-----  6E 76 7E ROR  $7E76
  0x04E61E $860E: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04E61F $860F: C-----  00       BRK  
  0x04E620 $8610: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E621 $8611: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04E622 $8612: C-----  30 EC    BMI  $8600
  0x04E624 $8614: C-----  10 20    BPL  $8636
  0x04E626 $8616: C-----  40       RTI  
  0x04E627 $8617: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E628 $8618: C-----  00       BRK  
  0x04E629 $8619: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E62A $861A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E62B $861B: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04E62C $861C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E62D $861D: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E62E $861E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E62F $861F: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E630 $8620: C-----  00       BRK  
  0x04E631 $8621: C-----  00       BRK  
  0x04E632 $8622: C-----  00       BRK  
  0x04E633 $8623: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E634 $8624: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04E635 $8625: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E636 $8626: C-----  00       BRK  
  0x04E637 $8627: C-----  00       BRK  
  0x04E638 $8628: C-----  00       BRK  
  0x04E639 $8629: C-----  00       BRK  
  0x04E63A $862A: C-----  00       BRK  
  0x04E63B $862B: C-----  00       BRK  
  0x04E63C $862C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E63D $862D: C-----  00       BRK  
  0x04E63E $862E: C-----  00       BRK  
  0x04E63F $862F: C-----  00       BRK  
  0x04E640 $8630: C-----  00       BRK  
  0x04E641 $8631: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E642 $8632: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04E643 $8633: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x04E644 $8634: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E645 $8635: C-----  00       BRK  
  0x04E646 $8636: C-----  00       BRK  
  0x04E647 $8637: C-----  E0 00    CPX  #$00
  0x04E649 $8639: C-----  00       BRK  
  0x04E64A $863A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E64B $863B: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04E64C $863C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E64D $863D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E64E $863E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E64F $863F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E650 $8640: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E651 $8641: C-----  7E 5F 00 ROR  $005F,X
  0x04E654 $8644: C-----  00       BRK  
  0x04E655 $8645: C-----  00       BRK  
  0x04E656 $8646: C-----  00       BRK  
  0x04E657 $8647: C-----  00       BRK  
  0x04E658 $8648: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E659 $8649: C-----  01 00    ORA  ($00,X)
  0x04E65B $864B: C-----  00       BRK  
  0x04E65C $864C: C-----  00       BRK  
  0x04E65D $864D: C-----  00       BRK  
  0x04E65E $864E: C-----  00       BRK  
  0x04E65F $864F: C-----  00       BRK  
  0x04E660 $8650: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04E661 $8651: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04E662 $8652: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E663 $8653: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E664 $8654: C-----  40       RTI  
  0x04E665 $8655: C-----  30 38    BMI  $868F
  0x04E667 $8657: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E668 $8658: C-----  E0 F0    CPX  #$F0
  0x04E66A $865A: C-----  F8       SED  
  0x04E66B $865B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E66C $865C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E66D $865D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E66E $865E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E66F $865F: C-----  08       PHP  
  0x04E670 $8660: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04E671 $8661: C-----  70 08    BVS  $866B
  0x04E673 $8663: C-----  EC 03 C3 CPX  $C303
  0x04E676 $8666: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04E677 $8667: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E678 $8668: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04E679 $8669: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04E67A $866A: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04E67B $866B: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04E67C $866C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E67D $866D: C-----  3D 0B 03 AND  $030B,X
  0x04E680 $8670: C-----  00       BRK  
  0x04E681 $8671: C-----  00       BRK  
  0x04E682 $8672: C-----  00       BRK  
  0x04E683 $8673: C-----  00       BRK  
  0x04E684 $8674: C-----  00       BRK  
  0x04E685 $8675: C-----  09 0B    ORA  #$0B
  0x04E687 $8677: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04E688 $8678: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E689 $8679: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E68A $867A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E68B $867B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E68C $867C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E68D $867D: C-----  F6 F5    INC  $F5,X
  0x04E68F $867F: C-----  ED E0 E0 SBC  $E0E0
  0x04E692 $8682: C-----  C0 80    CPY  #$80
  0x04E694 $8684: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E695 $8685: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E696 $8686: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E697 $8687: C-----  C0 E0    CPY  #$E0
  0x04E699 $8689: C-----  E0 E0    CPX  #$E0
  0x04E69B $868B: C-----  F0 79    BEQ  $8706
  0x04E69D $868D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E69E $868E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E69F $868F: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04E6A0 $8690: C-----  58       CLI  
  0x04E6A1 $8691: C-----  20 18 07 JSR  $0718
  0x04E6A4 $8694: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04E6A5 $8695: C-----  01 00    ORA  ($00,X)
  0x04E6A7 $8697: C-----  00       BRK  
  0x04E6A8 $8698: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x04E6A9 $8699: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E6AA $869A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E6AB $869B: C-----  00       BRK  
  0x04E6AC $869C: C-----  01 00    ORA  ($00,X)
  0x04E6AE $869E: C-----  00       BRK  
  0x04E6AF $869F: C-----  00       BRK  
  0x04E6B0 $86A0: C-----  C0 40    CPY  #$40
  0x04E6B2 $86A2: C-----  20 20 20 JSR  $2020
  0x04E6B5 $86A5: C-----  10 10    BPL  $86B7
  0x04E6B7 $86A7: C-----  08       PHP  
  0x04E6B8 $86A8: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E6B9 $86A9: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E6BA $86AA: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E6BB $86AB: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E6BC $86AC: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E6BD $86AD: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E6BE $86AE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E6BF $86AF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E6C0 $86B0: C-----  40       RTI  
  0x04E6C1 $86B1: C-----  30 08    BMI  $86BB
  0x04E6C3 $86B3: C-----  08       PHP  
  0x04E6C4 $86B4: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04E6C5 $86B5: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04E6C6 $86B6: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04E6C7 $86B7: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04E6C8 $86B8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E6C9 $86B9: C-----  C0 F0    CPY  #$F0
  0x04E6CB $86BB: C-----  F0 F8    BEQ  $86B5
  0x04E6CD $86BD: C-----  F8       SED  
  0x04E6CE $86BE: C-----  F8       SED  
  0x04E6CF $86BF: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E6D0 $86C0: C-----  00       BRK  
  0x04E6D1 $86C1: C-----  00       BRK  
  0x04E6D2 $86C2: C-----  00       BRK  
  0x04E6D3 $86C3: C-----  E1 03    SBC  ($03,X)
  0x04E6D5 $86C5: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04E6D6 $86C6: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04E6D7 $86C7: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E6D8 $86C8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E6D9 $86C9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E6DA $86CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E6DB $86CB: C-----  1E FD 3D ASL  $3DFD,X
  0x04E6DE $86CE: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04E6DF $86CF: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E6E0 $86D0: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04E6E1 $86D1: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04E6E2 $86D2: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04E6E3 $86D3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E6E4 $86D4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E6E5 $86D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E6E6 $86D6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E6E7 $86D7: C-----  E1 EB    SBC  ($EB,X)
  0x04E6E9 $86D9: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x04E6EA $86DA: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04E6EB $86DB: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04E6EC $86DC: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04E6ED $86DD: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04E6EE $86DE: C-----  C1 C0    CMP  ($C0,X)
  0x04E6F0 $86E0: C-----  F8       SED  
  0x04E6F1 $86E1: C-----  F8       SED  
  0x04E6F2 $86E2: C-----  F0 F0    BEQ  $86D4
  0x04E6F4 $86E4: C-----  E0 E0    CPX  #$E0
  0x04E6F6 $86E6: C-----  C0 80    CPY  #$80
  0x04E6F8 $86E8: C-----  F0 F0    BEQ  $86DA
  0x04E6FA $86EA: C-----  E0 E0    CPX  #$E0
  0x04E6FC $86EC: C-----  C0 C0    CPY  #$C0
  0x04E6FE $86EE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E6FF $86EF: C-----  00       BRK  
  0x04E700 $86F0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E701 $86F1: C-----  F0 C0    BEQ  $86B3
  0x04E703 $86F3: C-----  00       BRK  
  0x04E704 $86F4: C-----  00       BRK  
  0x04E705 $86F5: C-----  00       BRK  
  0x04E706 $86F6: C-----  00       BRK  
  0x04E707 $86F7: C-----  00       BRK  
  0x04E708 $86F8: C-----  00       BRK  
  0x04E709 $86F9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E70A $86FA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E70B $86FB: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E70C $86FC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E70D $86FD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E70E $86FE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E70F $86FF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E710 $8700: C-----  00       BRK  
  0x04E711 $8701: C-----  00       BRK  
  0x04E712 $8702: C-----  00       BRK  
  0x04E713 $8703: C-----  00       BRK  
  0x04E714 $8704: C-----  00       BRK  
  0x04E715 $8705: C-----  00       BRK  
  0x04E716 $8706: C-----  00       BRK  
  0x04E717 $8707: C-----  00       BRK  
  0x04E718 $8708: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E719 $8709: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E71A $870A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E71B $870B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E71C $870C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E71D $870D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E71E $870E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E71F $870F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E720 $8710: C-----  00       BRK  
  0x04E721 $8711: C-----  00       BRK  
  0x04E722 $8712: C-----  00       BRK  
  0x04E723 $8713: C-----  00       BRK  
  0x04E724 $8714: C-----  00       BRK  
  0x04E725 $8715: C-----  01 03    ORA  ($03,X)
  0x04E727 $8717: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E728 $8718: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E729 $8719: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E72A $871A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E72B $871B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E72C $871C: C-----  FE FD FB INC  $FBFD,X
  0x04E72F $871F: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04E730 $8720: C-----  00       BRK  
  0x04E731 $8721: C-----  00       BRK  
  0x04E732 $8722: C-----  00       BRK  
  0x04E733 $8723: C-----  00       BRK  
  0x04E734 $8724: C-----  00       BRK  
  0x04E735 $8725: C-----  00       BRK  
  0x04E736 $8726: C-----  0E 3F FF ASL  $FF3F
  0x04E739 $8729: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E73A $872A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E73B $872B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E73C $872C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E73D $872D: C-----  F1 CE    SBC  ($CE),Y
  0x04E73F $872F: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04E740 $8730: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E741 $8731: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E742 $8732: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E743 $8733: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E744 $8734: C-----  FE FC 98 INC  $98FC,X
  0x04E747 $8737: C-----  06 00    ASL  $00
  0x04E749 $8739: C-----  00       BRK  
  0x04E74A $873A: C-----  00       BRK  
  0x04E74B $873B: C-----  00       BRK  
  0x04E74C $873C: C-----  00       BRK  
  0x04E74D $873D: C-----  01 03    ORA  ($03,X)
  0x04E74F $873F: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x04E750 $8740: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E751 $8741: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E752 $8742: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E753 $8743: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E754 $8744: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E755 $8745: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E756 $8746: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E757 $8747: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E758 $8748: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E759 $8749: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E75A $874A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E75B $874B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E75C $874C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E75D $874D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E75E $874E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E75F $874F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E760 $8750: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E761 $8751: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E762 $8752: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E763 $8753: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E764 $8754: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E765 $8755: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E766 $8756: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E767 $8757: C-----  01 03    ORA  ($03,X)
  0x04E769 $8759: C-----  05 02    ORA  $02
  0x04E76B $875B: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04E76C $875C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E76D $875D: C-----  01 01    ORA  ($01,X)
  0x04E76F $875F: C-----  00       BRK  
  0x04E770 $8760: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E771 $8761: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E772 $8762: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E773 $8763: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E774 $8764: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E775 $8765: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E776 $8766: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E777 $8767: C-----  05 00    ORA  $00
  0x04E779 $8769: C-----  00       BRK  
  0x04E77A $876A: C-----  00       BRK  
  0x04E77B $876B: C-----  00       BRK  
  0x04E77C $876C: C-----  00       BRK  
  0x04E77D $876D: C-----  C0 F0    CPY  #$F0
  0x04E77F $876F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E780 $8770: C-----  00       BRK  
  0x04E781 $8771: C-----  00       BRK  
  0x04E782 $8772: C-----  00       BRK  
  0x04E783 $8773: C-----  00       BRK  
  0x04E784 $8774: C-----  00       BRK  
  0x04E785 $8775: C-----  00       BRK  
  0x04E786 $8776: C-----  00       BRK  
  0x04E787 $8777: C-----  00       BRK  
  0x04E788 $8778: C-----  00       BRK  
  0x04E789 $8779: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E78A $877A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E78B $877B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E78C $877C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E78D $877D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E78E $877E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E78F $877F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E790 $8780: C-----  FE FE FE INC  $FEFE,X
  0x04E793 $8783: C-----  FE FE F8 INC  $F8FE,X
  0x04E796 $8786: C-----  F0 E0    BEQ  $8768
  0x04E798 $8788: C-----  00       BRK  
  0x04E799 $8789: C-----  00       BRK  
  0x04E79A $878A: C-----  00       BRK  
  0x04E79B $878B: C-----  00       BRK  
  0x04E79C $878C: C-----  00       BRK  
  0x04E79D $878D: C-----  00       BRK  
  0x04E79E $878E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E79F $878F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E7A0 $8790: C-----  06 02    ASL  $02
  0x04E7A2 $8792: C-----  41 60    EOR  ($60,X)
  0x04E7A4 $8794: C-----  !!UNDEF $B2  ; unknown opcode, treating as data
  0x04E7A5 $8795: C-----  DD 63 3F CMP  $3F63,X
  0x04E7A8 $8798: C-----  F6 FA    INC  $FA,X
  0x04E7AA $879A: C-----  FD FE BE SBC  $BEFE,X
  0x04E7AD $879D: C-----  DD 63 BF CMP  $BF63,X
  0x04E7B0 $87A0: C-----  E4 E2    CPX  $E2
  0x04E7B2 $87A2: C-----  CD 82 00 CMP  $0082
  0x04E7B5 $87A5: C-----  10 3C    BPL  $87E3
  0x04E7B7 $87A7: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04E7B8 $87A8: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E7B9 $87A9: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04E7BA $87AA: C-----  0D 32 7C ORA  $7C32
  0x04E7BD $87AD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E7BE $87AE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E7BF $87AF: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04E7C0 $87B0: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E7C1 $87B1: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04E7C2 $87B2: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04E7C3 $87B3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E7C4 $87B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E7C5 $87B5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E7C6 $87B6: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04E7C7 $87B7: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04E7C8 $87B8: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04E7C9 $87B9: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04E7CA $87BA: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04E7CB $87BB: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E7CC $87BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E7CD $87BD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E7CE $87BE: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04E7CF $87BF: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04E7D0 $87C0: C-----  85 7B    STA  $7B
  0x04E7D2 $87C2: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04E7D3 $87C3: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04E7D4 $87C4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E7D5 $87C5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E7D6 $87C6: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E7D7 $87C7: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04E7D8 $87C8: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E7D9 $87C9: C-----  78       SEI  
  0x04E7DA $87CA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E7DB $87CB: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E7DC $87CC: C-----  00       BRK  
  0x04E7DD $87CD: C-----  00       BRK  
  0x04E7DE $87CE: C-----  00       BRK  
  0x04E7DF $87CF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E7E0 $87D0: C-----  00       BRK  
  0x04E7E1 $87D1: C-----  00       BRK  
  0x04E7E2 $87D2: C-----  01 00    ORA  ($00,X)
  0x04E7E4 $87D4: C-----  00       BRK  
  0x04E7E5 $87D5: C-----  00       BRK  
  0x04E7E6 $87D6: C-----  00       BRK  
  0x04E7E7 $87D7: C-----  00       BRK  
  0x04E7E8 $87D8: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04E7E9 $87D9: C-----  F8       SED  
  0x04E7EA $87DA: C-----  FD FE FE SBC  $FEFE,X
  0x04E7ED $87DD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E7EE $87DE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E7EF $87DF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E7F0 $87E0: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04E7F1 $87E1: C-----  DE E6 F8 DEC  $F8E6,X
  0x04E7F4 $87E4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E7F5 $87E5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E7F6 $87E6: C-----  F8       SED  
  0x04E7F7 $87E7: C-----  F0 80    BEQ  $8769
  0x04E7F9 $87E9: C-----  C0 E0    CPY  #$E0
  0x04E7FB $87EB: C-----  F8       SED  
  0x04E7FC $87EC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E7FD $87ED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E7FE $87EE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E7FF $87EF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E800 $87F0: C-----  00       BRK  
  0x04E801 $87F1: C-----  00       BRK  
  0x04E802 $87F2: C-----  00       BRK  
  0x04E803 $87F3: C-----  00       BRK  
  0x04E804 $87F4: C-----  00       BRK  
  0x04E805 $87F5: C-----  01 01    ORA  ($01,X)
  0x04E807 $87F7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E808 $87F8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E809 $87F9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E80A $87FA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E80B $87FB: C-----  FE FE FD INC  $FDFE,X
  0x04E80E $87FE: C-----  FD FB 00 SBC  $00FB,X
  0x04E811 $8801: C-----  00       BRK  
  0x04E812 $8802: C-----  00       BRK  
  0x04E813 $8803: C-----  00       BRK  
  0x04E814 $8804: C-----  00       BRK  
  0x04E815 $8805: C-----  00       BRK  
  0x04E816 $8806: C-----  00       BRK  
  0x04E817 $8807: C-----  00       BRK  
  0x04E818 $8808: C-----  00       BRK  
  0x04E819 $8809: C-----  00       BRK  
  0x04E81A $880A: C-----  00       BRK  
  0x04E81B $880B: C-----  00       BRK  
  0x04E81C $880C: C-----  00       BRK  
  0x04E81D $880D: C-----  00       BRK  
  0x04E81E $880E: C-----  00       BRK  
  0x04E81F $880F: C-----  00       BRK  
  0x04E820 $8810: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E821 $8811: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E822 $8812: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E823 $8813: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E824 $8814: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E825 $8815: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E826 $8816: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E827 $8817: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E828 $8818: C-----  00       BRK  
  0x04E829 $8819: C-----  00       BRK  
  0x04E82A $881A: C-----  00       BRK  
  0x04E82B $881B: C-----  00       BRK  
  0x04E82C $881C: C-----  00       BRK  
  0x04E82D $881D: C-----  00       BRK  
  0x04E82E $881E: C-----  00       BRK  
  0x04E82F $881F: C-----  00       BRK  
  0x04E830 $8820: C-----  00       BRK  
  0x04E831 $8821: C-----  00       BRK  
  0x04E832 $8822: C-----  00       BRK  
  0x04E833 $8823: C-----  00       BRK  
  0x04E834 $8824: C-----  00       BRK  
  0x04E835 $8825: C-----  00       BRK  
  0x04E836 $8826: C-----  00       BRK  
  0x04E837 $8827: C-----  00       BRK  
  0x04E838 $8828: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E839 $8829: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E83A $882A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E83B $882B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E83C $882C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E83D $882D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E83E $882E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E83F $882F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E840 $8830: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E841 $8831: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E842 $8832: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E843 $8833: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E844 $8834: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E845 $8835: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E846 $8836: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E847 $8837: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E848 $8838: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E849 $8839: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E84A $883A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E84B $883B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E84C $883C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E84D $883D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E84E $883E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E84F $883F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E850 $8840: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E851 $8841: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E852 $8842: C-----  BE BC B8 LDX  $B8BC,Y
  0x04E855 $8845: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x04E856 $8846: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x04E857 $8847: C-----  C8       INY  
  0x04E858 $8848: C-----  00       BRK  
  0x04E859 $8849: C-----  00       BRK  
  0x04E85A $884A: C-----  00       BRK  
  0x04E85B $884B: C-----  00       BRK  
  0x04E85C $884C: C-----  01 07    ORA  ($07,X)
  0x04E85E $884E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E85F $884F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E860 $8850: C-----  0E 30 00 ASL  $0030
  0x04E863 $8853: C-----  01 00    ORA  ($00,X)
  0x04E865 $8855: C-----  00       BRK  
  0x04E866 $8856: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x04E867 $8857: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04E868 $8858: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E869 $8859: C-----  31 0F    AND  ($0F),Y
  0x04E86B $885B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E86C $885C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E86D $885D: C-----  E0 9B    CPX  #$9B
  0x04E86F $885F: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04E870 $8860: C-----  C8       INY  
  0x04E871 $8861: C-----  D1 D3    CMP  ($D3),Y
  0x04E873 $8863: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04E874 $8864: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04E875 $8865: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04E876 $8866: C-----  8E CE 0E STX  $0ECE
  0x04E879 $8869: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E87A $886A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E87B $886B: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04E87C $886C: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04E87D $886D: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04E87E $886E: C-----  0E 0E EF ASL  $EF0E
  0x04E881 $8871: C-----  DE BC BC DEC  $BCBC,X
  0x04E884 $8874: C-----  78       SEI  
  0x04E885 $8875: C-----  78       SEI  
  0x04E886 $8876: C-----  F8       SED  
  0x04E887 $8877: C-----  F8       SED  
  0x04E888 $8878: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04E889 $8879: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04E88A $887A: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04E88B $887B: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04E88C $887C: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E88D $887D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E88E $887E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E88F $887F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E890 $8880: C-----  60       RTS  
  0x04E891 $8881: C-----  70 70    BVS  $88F3
  0x04E893 $8883: C-----  38       SEC  
  0x04E894 $8884: C-----  B8       CLV  
  0x04E895 $8885: C-----  BC BE 9F LDY  $9FBE,X
  0x04E898 $8888: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E899 $8889: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E89A $888A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E89B $888B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E89C $888C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E89D $888D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E89E $888E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E89F $888F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E8A0 $8890: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E8A1 $8891: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E8A2 $8892: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E8A3 $8893: C-----  00       BRK  
  0x04E8A4 $8894: C-----  00       BRK  
  0x04E8A5 $8895: C-----  00       BRK  
  0x04E8A6 $8896: C-----  00       BRK  
  0x04E8A7 $8897: C-----  00       BRK  
  0x04E8A8 $8898: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E8A9 $8899: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E8AA $889A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E8AB $889B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E8AC $889C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E8AD $889D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E8AE $889E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E8AF $889F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E8B0 $88A0: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04E8B1 $88A1: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04E8B2 $88A2: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04E8B3 $88A3: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04E8B4 $88A4: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04E8B5 $88A5: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04E8B6 $88A6: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04E8B7 $88A7: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04E8B8 $88A8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E8B9 $88A9: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E8BA $88AA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E8BB $88AB: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E8BC $88AC: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E8BD $88AD: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E8BE $88AE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E8BF $88AF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E8C0 $88B0: C-----  C0 E0    CPY  #$E0
  0x04E8C2 $88B2: C-----  F0 F8    BEQ  $88AC
  0x04E8C4 $88B4: C-----  F8       SED  
  0x04E8C5 $88B5: C-----  F8       SED  
  0x04E8C6 $88B6: C-----  F8       SED  
  0x04E8C7 $88B7: C-----  F8       SED  
  0x04E8C8 $88B8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E8C9 $88B9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E8CA $88BA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E8CB $88BB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E8CC $88BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E8CD $88BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E8CE $88BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E8CF $88BF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E8D0 $88C0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E8D1 $88C1: C-----  E0 10    CPX  #$10
  0x04E8D3 $88C3: C-----  00       BRK  
  0x04E8D4 $88C4: C-----  01 00    ORA  ($00,X)
  0x04E8D6 $88C6: C-----  00       BRK  
  0x04E8D7 $88C7: C-----  00       BRK  
  0x04E8D8 $88C8: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04E8D9 $88C9: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04E8DA $88CA: C-----  F8       SED  
  0x04E8DB $88CB: C-----  FE FD F8 INC  $F8FD,X
  0x04E8DE $88CE: C-----  F9 FB 9F SBC  $9FFB,Y
  0x04E8E1 $88D1: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04E8E2 $88D2: C-----  F1 3E    SBC  ($3E),Y
  0x04E8E4 $88D4: C-----  08       PHP  
  0x04E8E5 $88D5: C-----  00       BRK  
  0x04E8E6 $88D6: C-----  00       BRK  
  0x04E8E7 $88D7: C-----  18       CLC  
  0x04E8E8 $88D8: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E8E9 $88D9: C-----  C0 F0    CPY  #$F0
  0x04E8EB $88DB: C-----  FE F8 F1 INC  $F1F8,X
  0x04E8EE $88DE: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x04E8EF $88DF: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E8F0 $88E0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E8F1 $88E1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E8F2 $88E2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E8F3 $88E3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E8F4 $88E4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E8F5 $88E5: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04E8F6 $88E6: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04E8F7 $88E7: C-----  F9 00 00 SBC  $0000,Y
  0x04E8FA $88EA: C-----  00       BRK  
  0x04E8FB $88EB: C-----  00       BRK  
  0x04E8FC $88EC: C-----  00       BRK  
  0x04E8FD $88ED: C-----  C0 F0    CPY  #$F0
  0x04E8FF $88EF: C-----  F8       SED  
  0x04E900 $88F0: C-----  20 68 F0 JSR  $F068
  0x04E903 $88F3: C-----  C0 06    CPY  #$06
  0x04E905 $88F5: C-----  08       PHP  
  0x04E906 $88F6: C-----  39 F3 BF AND  $BFF3,Y
  0x04E909 $88F9: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E90A $88FA: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04E90B $88FB: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04E90C $88FC: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E90D $88FD: C-----  FE FD FB INC  $FBFD,X
  0x04E910 $8900: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E911 $8901: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E912 $8902: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E913 $8903: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E914 $8904: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E915 $8905: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E916 $8906: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04E917 $8907: C-----  70 00    BVS  $8909
  0x04E919 $8909: C-----  00       BRK  
  0x04E91A $890A: C-----  00       BRK  
  0x04E91B $890B: C-----  00       BRK  
  0x04E91C $890C: C-----  00       BRK  
  0x04E91D $890D: C-----  F0 F8    BEQ  $8907
  0x04E91F $890F: C-----  70 FF    BVS  $8910
  0x04E921 $8911: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E922 $8912: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E923 $8913: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E924 $8914: C-----  E0 C0    CPX  #$C0
  0x04E926 $8916: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04E927 $8917: C-----  0E 00 00 ASL  $0000
  0x04E92A $891A: C-----  00       BRK  
  0x04E92B $891B: C-----  00       BRK  
  0x04E92C $891C: C-----  00       BRK  
  0x04E92D $891D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E92E $891E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E92F $891F: C-----  0E 06 01 ASL  $0106
  0x04E932 $8922: C-----  00       BRK  
  0x04E933 $8923: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E934 $8924: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E935 $8925: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E936 $8926: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E937 $8927: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E938 $8928: C-----  8E FF F8 STX  $F8FF
  0x04E93B $892B: C-----  E0 80    CPX  #$80
  0x04E93D $892D: C-----  00       BRK  
  0x04E93E $892E: C-----  00       BRK  
  0x04E93F $892F: C-----  00       BRK  
  0x04E940 $8930: C-----  60       RTS  
  0x04E941 $8931: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E942 $8932: C-----  00       BRK  
  0x04E943 $8933: C-----  E0 F8    CPX  #$F8
  0x04E945 $8935: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E946 $8936: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E947 $8937: C-----  FE 71 FF INC  $FF71,X
  0x04E94A $893A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E94B $893B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E94C $893C: C-----  01 00    ORA  ($00,X)
  0x04E94E $893E: C-----  00       BRK  
  0x04E94F $893F: C-----  00       BRK  
  0x04E950 $8940: C-----  FE FE 7D INC  $7DFE,X
  0x04E953 $8943: C-----  3D 1D 2B AND  $2B1D,X
  0x04E956 $8946: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x04E957 $8947: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04E958 $8948: C-----  00       BRK  
  0x04E959 $8949: C-----  00       BRK  
  0x04E95A $894A: C-----  00       BRK  
  0x04E95B $894B: C-----  00       BRK  
  0x04E95C $894C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E95D $894D: C-----  E0 E0    CPX  #$E0
  0x04E95F $894F: C-----  F0 70    BEQ  $89C1
  0x04E961 $8951: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04E962 $8952: C-----  00       BRK  
  0x04E963 $8953: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E964 $8954: C-----  00       BRK  
  0x04E965 $8955: C-----  00       BRK  
  0x04E966 $8956: C-----  D8       CLD  
  0x04E967 $8957: C-----  EE F0 8C INC  $8CF0
  0x04E96A $895A: C-----  F0 FE    BEQ  $895A
  0x04E96C $895C: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04E96D $895D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E96E $895E: C-----  D9 EE 13 CMP  $13EE,Y
  0x04E971 $8961: C-----  !!UNDEF $8B  ; unknown opcode, treating as data
  0x04E972 $8962: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x04E973 $8963: C-----  ED F5 F5 SBC  $F5F5
  0x04E976 $8966: C-----  71 73    ADC  ($73),Y
  0x04E978 $8968: C-----  70 F8    BVS  $8962
  0x04E97A $896A: C-----  F8       SED  
  0x04E97B $896B: C-----  EC F4 F4 CPX  $F4F4
  0x04E97E $896E: C-----  70 70    BVS  $89E0
  0x04E980 $8970: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04E981 $8971: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x04E982 $8972: C-----  3D 3D 1E AND  $1E3D,X
  0x04E985 $8975: C-----  1E 1F 1F ASL  $1F1F,X
  0x04E988 $8978: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04E989 $8979: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04E98A $897A: C-----  FD FD FE SBC  $FEFD,X
  0x04E98D $897D: C-----  FE FF FF INC  $FFFF,X
  0x04E990 $8980: C-----  06 0E    ASL  $0E
  0x04E992 $8982: C-----  0E 1C 1D ASL  $1D1C
  0x04E995 $8985: C-----  3D 7D F9 AND  $F97D,X
  0x04E998 $8988: C-----  FE FE FE INC  $FEFE,X
  0x04E99B $898B: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E99C $898C: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E99D $898D: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E99E $898E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04E99F $898F: C-----  F8       SED  
  0x04E9A0 $8990: C-----  00       BRK  
  0x04E9A1 $8991: C-----  00       BRK  
  0x04E9A2 $8992: C-----  00       BRK  
  0x04E9A3 $8993: C-----  00       BRK  
  0x04E9A4 $8994: C-----  00       BRK  
  0x04E9A5 $8995: C-----  00       BRK  
  0x04E9A6 $8996: C-----  00       BRK  
  0x04E9A7 $8997: C-----  00       BRK  
  0x04E9A8 $8998: C-----  00       BRK  
  0x04E9A9 $8999: C-----  7E 42 42 ROR  $4242,X
  0x04E9AC $899C: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04E9AD $899D: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04E9AE $899E: C-----  7E 00 FB ROR  $FB00,X
  0x04E9B1 $89A1: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04E9B2 $89A2: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04E9B3 $89A3: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04E9B4 $89A4: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04E9B5 $89A5: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04E9B6 $89A6: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04E9B7 $89A7: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04E9B8 $89A8: C-----  F8       SED  
  0x04E9B9 $89A9: C-----  F8       SED  
  0x04E9BA $89AA: C-----  F0 F0    BEQ  $899C
  0x04E9BC $89AC: C-----  F0 F0    BEQ  $899E
  0x04E9BE $89AE: C-----  F0 F0    BEQ  $89A0
  0x04E9C0 $89B0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E9C1 $89B1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04E9C2 $89B2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E9C3 $89B3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E9C4 $89B4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E9C5 $89B5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E9C6 $89B6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E9C7 $89B7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E9C8 $89B8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E9C9 $89B9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E9CA $89BA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E9CB $89BB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E9CC $89BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E9CD $89BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E9CE $89BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E9CF $89BF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E9D0 $89C0: C-----  01 07    ORA  ($07,X)
  0x04E9D2 $89C2: C-----  08       PHP  
  0x04E9D3 $89C3: C-----  00       BRK  
  0x04E9D4 $89C4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04E9D5 $89C5: C-----  00       BRK  
  0x04E9D6 $89C6: C-----  00       BRK  
  0x04E9D7 $89C7: C-----  00       BRK  
  0x04E9D8 $89C8: C-----  F1 C7    SBC  ($C7),Y
  0x04E9DA $89CA: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E9DB $89CB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E9DC $89CC: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04E9DD $89CD: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E9DE $89CE: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04E9DF $89CF: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04E9E0 $89D0: C-----  F9 E3 8F SBC  $8FE3,Y
  0x04E9E3 $89D3: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04E9E4 $89D4: C-----  10 00    BPL  $89D6
  0x04E9E6 $89D6: C-----  00       BRK  
  0x04E9E7 $89D7: C-----  18       CLC  
  0x04E9E8 $89D8: C-----  01 03    ORA  ($03,X)
  0x04E9EA $89DA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E9EB $89DB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04E9EC $89DC: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04E9ED $89DD: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04E9EE $89DE: C-----  E6 F8    INC  $F8
  0x04E9F0 $89E0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E9F1 $89E1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E9F2 $89E2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04E9F3 $89E3: C-----  FE F8 E3 INC  $E3F8,X
  0x04E9F6 $89E6: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04E9F7 $89E7: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04E9F8 $89E8: C-----  00       BRK  
  0x04E9F9 $89E9: C-----  00       BRK  
  0x04E9FA $89EA: C-----  00       BRK  
  0x04E9FB $89EB: C-----  00       BRK  
  0x04E9FC $89EC: C-----  00       BRK  
  0x04E9FD $89ED: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04E9FE $89EE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04E9FF $89EF: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04EA00 $89F0: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04EA01 $89F1: C-----  16 0F    ASL  $0F,X
  0x04EA03 $89F3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04EA04 $89F4: C-----  60       RTS  
  0x04EA05 $89F5: C-----  10 9C    BPL  $8993
  0x04EA07 $89F7: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04EA08 $89F8: C-----  FD FE CF SBC  $CFFE,X
  0x04EA0B $89FB: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04EA0C $89FC: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04EA0D $89FD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04EA0E $89FE: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04EA0F $89FF: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04EA10 $8A00: C-----  ED ED E9 SBC  $E9ED
  0x04EA13 $8A03: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04EA14 $8A04: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04EA15 $8A05: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04EA16 $8A06: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04EA17 $8A07: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04EA18 $8A08: C-----  0D 0D 09 ORA  $090D
  0x04EA1B $8A0B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04EA1C $8A0C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04EA1D $8A0D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04EA1E $8A0E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04EA1F $8A0F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EA20 $8A10: C-----  F8       SED  
  0x04EA21 $8A11: C-----  F0 F0    BEQ  $8A03
  0x04EA23 $8A13: C-----  E1 C3    SBC  ($C3,X)
  0x04EA25 $8A15: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04EA26 $8A16: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04EA27 $8A17: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EA28 $8A18: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EA29 $8A19: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EA2A $8A1A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EA2B $8A1B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EA2C $8A1C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EA2D $8A1D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EA2E $8A1E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EA2F $8A1F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EA30 $8A20: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04EA31 $8A21: C-----  F6 F6    INC  $F6,X
  0x04EA33 $8A23: C-----  F6 F4    INC  $F4,X
  0x04EA35 $8A25: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04EA36 $8A26: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04EA37 $8A27: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04EA38 $8A28: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EA39 $8A29: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EA3A $8A2A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EA3B $8A2B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EA3C $8A2C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EA3D $8A2D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EA3E $8A2E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EA3F $8A2F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EA40 $8A30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EA41 $8A31: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EA42 $8A32: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EA43 $8A33: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EA44 $8A34: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EA45 $8A35: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EA46 $8A36: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04EA47 $8A37: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04EA48 $8A38: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EA49 $8A39: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EA4A $8A3A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EA4B $8A3B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EA4C $8A3C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EA4D $8A3D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EA4E $8A3E: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04EA4F $8A3F: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04EA50 $8A40: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04EA51 $8A41: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04EA52 $8A42: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04EA53 $8A43: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EA54 $8A44: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EA55 $8A45: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04EA56 $8A46: C-----  01 00    ORA  ($00,X)
  0x04EA58 $8A48: C-----  00       BRK  
  0x04EA59 $8A49: C-----  00       BRK  
  0x04EA5A $8A4A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04EA5B $8A4B: C-----  C0 E0    CPY  #$E0
  0x04EA5D $8A4D: C-----  F0 78    BEQ  $8AC7
  0x04EA5F $8A4F: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04EA60 $8A50: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04EA61 $8A51: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EA62 $8A52: C-----  01 04    ORA  ($04,X)
  0x04EA64 $8A54: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EA65 $8A55: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04EA66 $8A56: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04EA67 $8A57: C-----  F9 00 80 SBC  $8000,Y
  0x04EA6A $8A5A: C-----  E0 3C    CPX  #$3C
  0x04EA6C $8A5C: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04EA6D $8A5D: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04EA6E $8A5E: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04EA6F $8A5F: C-----  F9 00 00 SBC  $0000,Y
  0x04EA72 $8A62: C-----  00       BRK  
  0x04EA73 $8A63: C-----  00       BRK  
  0x04EA74 $8A64: C-----  00       BRK  
  0x04EA75 $8A65: C-----  01 03    ORA  ($03,X)
  0x04EA77 $8A67: C-----  09 C6    ORA  #$C6
  0x04EA79 $8A69: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04EA7A $8A6A: C-----  F8       SED  
  0x04EA7B $8A6B: C-----  3E 9F C7 ROL  $C79F,X
  0x04EA7E $8A6E: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04EA7F $8A6F: C-----  F9 3F 9F SBC  $9F3F,Y
  0x04EA82 $8A72: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04EA83 $8A73: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04EA84 $8A74: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04EA85 $8A75: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04EA86 $8A76: C-----  F9 7C 00 SBC  $007C,Y
  0x04EA89 $8A79: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04EA8A $8A7A: C-----  C0 C0    CPY  #$C0
  0x04EA8C $8A7C: C-----  E0 F0    CPX  #$F0
  0x04EA8E $8A7E: C-----  F8       SED  
  0x04EA8F $8A7F: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04EA90 $8A80: C-----  F0 E0    BEQ  $8A62
  0x04EA92 $8A82: C-----  E0 E0    CPX  #$E0
  0x04EA94 $8A84: C-----  E0 E0    CPX  #$E0
  0x04EA96 $8A86: C-----  E0 E0    CPX  #$E0
  0x04EA98 $8A88: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EA99 $8A89: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EA9A $8A8A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EA9B $8A8B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EA9C $8A8C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EA9D $8A8D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EA9E $8A8E: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EA9F $8A8F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EAA0 $8A90: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EAA1 $8A91: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EAA2 $8A92: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EAA3 $8A93: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EAA4 $8A94: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EAA5 $8A95: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EAA6 $8A96: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EAA7 $8A97: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EAA8 $8A98: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EAA9 $8A99: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EAAA $8A9A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EAAB $8A9B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EAAC $8A9C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EAAD $8A9D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EAAE $8A9E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EAAF $8A9F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EAB0 $8AA0: C-----  E8       INX  
  0x04EAB1 $8AA1: C-----  EC E4 E6 CPX  $E6E4
  0x04EAB4 $8AA4: C-----  !!UNDEF $F2  ; unknown opcode, treating as data
  0x04EAB5 $8AA5: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04EAB6 $8AA6: C-----  F9 F8 0F SBC  $0FF8,Y
  0x04EAB9 $8AA9: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EABA $8AAA: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EABB $8AAB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EABC $8AAC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04EABD $8AAD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04EABE $8AAE: C-----  01 00    ORA  ($00,X)
  0x04EAC0 $8AB0: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EAC1 $8AB1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EAC2 $8AB2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EAC3 $8AB3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EAC4 $8AB4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04EAC5 $8AB5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04EAC6 $8AB6: C-----  81 E1    STA  ($E1,X)
  0x04EAC8 $8AB8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EAC9 $8AB9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EACA $8ABA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EACB $8ABB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EACC $8ABC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EACD $8ABD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EACE $8ABE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EACF $8ABF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EAD0 $8AC0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04EAD1 $8AC1: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04EAD2 $8AC2: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04EAD3 $8AC3: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04EAD4 $8AC4: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04EAD5 $8AC5: C-----  F9 FC FF SBC  $FFFC,Y
  0x04EAD8 $8AC8: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04EAD9 $8AC9: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04EADA $8ACA: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04EADB $8ACB: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04EADC $8ACC: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04EADD $8ACD: C-----  F9 FC FF SBC  $FFFC,Y
  0x04EAE0 $8AD0: C-----  3E 8F E7 ROL  $E78F,X
  0x04EAE3 $8AD3: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04EAE4 $8AD4: C-----  F9 FC 7A SBC  $7AFC,Y
  0x04EAE7 $8AD7: C-----  20 3E 8F JSR  $8F3E
  0x04EAEA $8ADA: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04EAEB $8ADB: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04EAEC $8ADC: C-----  F9 FC 7E SBC  $7EFC,Y
  0x04EAEF $8ADF: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04EAF0 $8AE0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EAF1 $8AE1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EAF2 $8AE2: C-----  FE F8 F0 INC  $F0F8,X
  0x04EAF5 $8AE5: C-----  C0 80    CPY  #$80
  0x04EAF7 $8AE7: C-----  00       BRK  
  0x04EAF8 $8AE8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EAF9 $8AE9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EAFA $8AEA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EAFB $8AEB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EAFC $8AEC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EAFD $8AED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EAFE $8AEE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EAFF $8AEF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EB00 $8AF0: C-----  00       BRK  
  0x04EB01 $8AF1: C-----  00       BRK  
  0x04EB02 $8AF2: C-----  00       BRK  
  0x04EB03 $8AF3: C-----  00       BRK  
  0x04EB04 $8AF4: C-----  00       BRK  
  0x04EB05 $8AF5: C-----  00       BRK  
  0x04EB06 $8AF6: C-----  00       BRK  
  0x04EB07 $8AF7: C-----  00       BRK  
  0x04EB08 $8AF8: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04EB09 $8AF9: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04EB0A $8AFA: C-----  F8       SED  
  0x04EB0B $8AFB: C-----  FE FF FF INC  $FFFF,X
  0x04EB0E $8AFE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EB0F $8AFF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EB10 $8B00: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04EB11 $8B01: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04EB12 $8B02: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x04EB13 $8B03: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04EB14 $8B04: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04EB15 $8B05: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04EB16 $8B06: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04EB17 $8B07: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04EB18 $8B08: C-----  B0 B0    BCS  $8ABA
  0x04EB1A $8B0A: C-----  90 C0    BCC  $8ACC
  0x04EB1C $8B0C: C-----  C0 C0    CPY  #$C0
  0x04EB1E $8B0E: C-----  C0 E0    CPY  #$E0
  0x04EB20 $8B10: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04EB21 $8B11: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EB22 $8B12: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EB23 $8B13: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04EB24 $8B14: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04EB25 $8B15: C-----  E1 E1    SBC  ($E1,X)
  0x04EB27 $8B17: C-----  F0 FF    BEQ  $8B18
  0x04EB29 $8B19: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EB2A $8B1A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EB2B $8B1B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EB2C $8B1C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EB2D $8B1D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EB2E $8B1E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EB2F $8B1F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EB30 $8B20: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04EB31 $8B21: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04EB32 $8B22: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04EB33 $8B23: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04EB34 $8B24: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04EB35 $8B25: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04EB36 $8B26: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04EB37 $8B27: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04EB38 $8B28: C-----  E0 E0    CPX  #$E0
  0x04EB3A $8B2A: C-----  E0 E0    CPX  #$E0
  0x04EB3C $8B2C: C-----  E0 E0    CPX  #$E0
  0x04EB3E $8B2E: C-----  E0 E0    CPX  #$E0
  0x04EB40 $8B30: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EB41 $8B31: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EB42 $8B32: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EB43 $8B33: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EB44 $8B34: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EB45 $8B35: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EB46 $8B36: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04EB47 $8B37: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04EB48 $8B38: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EB49 $8B39: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EB4A $8B3A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EB4B $8B3B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EB4C $8B3C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EB4D $8B3D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EB4E $8B3E: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04EB4F $8B3F: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04EB50 $8B40: C-----  FE FC F9 INC  $F9FC,X
  0x04EB53 $8B43: C-----  F0 E0    BEQ  $8B25
  0x04EB55 $8B45: C-----  C0 80    CPY  #$80
  0x04EB57 $8B47: C-----  00       BRK  
  0x04EB58 $8B48: C-----  00       BRK  
  0x04EB59 $8B49: C-----  00       BRK  
  0x04EB5A $8B4A: C-----  01 03    ORA  ($03,X)
  0x04EB5C $8B4C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EB5D $8B4D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EB5E $8B4E: C-----  1E 38 FC ASL  $FC38,X
  0x04EB61 $8B51: C-----  F0 80    BEQ  $8AD3
  0x04EB63 $8B53: C-----  20 F0 E7 JSR  $E7F0
  0x04EB66 $8B56: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04EB67 $8B57: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04EB68 $8B58: C-----  00       BRK  
  0x04EB69 $8B59: C-----  01 07    ORA  ($07,X)
  0x04EB6B $8B5B: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04EB6C $8B5C: C-----  F1 E7    SBC  ($E7),Y
  0x04EB6E $8B5E: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04EB6F $8B5F: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04EB70 $8B60: C-----  00       BRK  
  0x04EB71 $8B61: C-----  00       BRK  
  0x04EB72 $8B62: C-----  00       BRK  
  0x04EB73 $8B63: C-----  00       BRK  
  0x04EB74 $8B64: C-----  00       BRK  
  0x04EB75 $8B65: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04EB76 $8B66: C-----  C0 90    CPY  #$90
  0x04EB78 $8B68: C-----  !!UNDEF $63  ; unknown opcode, treating as data
  0x04EB79 $8B69: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04EB7A $8B6A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04EB7B $8B6B: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04EB7C $8B6C: C-----  F9 E3 CF SBC  $CFE3,Y
  0x04EB7F $8B6F: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04EB80 $8B70: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04EB81 $8B71: C-----  F9 FB F3 SBC  $F3FB,Y
  0x04EB84 $8B74: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04EB85 $8B75: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04EB86 $8B76: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04EB87 $8B77: C-----  3E 00 01 ROL  $0100,X
  0x04EB8A $8B7A: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04EB8B $8B7B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04EB8C $8B7C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EB8D $8B7D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EB8E $8B7E: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04EB8F $8B7F: C-----  3E 0F 07 ROL  $070F,X
  0x04EB92 $8B82: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EB93 $8B83: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EB94 $8B84: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EB95 $8B85: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EB96 $8B86: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EB97 $8B87: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EB98 $8B88: C-----  E0 F0    CPX  #$F0
  0x04EB9A $8B8A: C-----  F0 F0    BEQ  $8B7C
  0x04EB9C $8B8C: C-----  F0 F0    BEQ  $8B7E
  0x04EB9E $8B8E: C-----  F0 F0    BEQ  $8B80
  0x04EBA0 $8B90: C-----  F0 F0    BEQ  $8B82
  0x04EBA2 $8B92: C-----  F0 F0    BEQ  $8B84
  0x04EBA4 $8B94: C-----  F0 F0    BEQ  $8B86
  0x04EBA6 $8B96: C-----  F0 F0    BEQ  $8B88
  0x04EBA8 $8B98: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBA9 $8B99: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBAA $8B9A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBAB $8B9B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBAC $8B9C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBAD $8B9D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBAE $8B9E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBAF $8B9F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBB0 $8BA0: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04EBB1 $8BA1: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04EBB2 $8BA2: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x04EBB3 $8BA3: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x04EBB4 $8BA4: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x04EBB5 $8BA5: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04EBB6 $8BA6: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04EBB7 $8BA7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04EBB8 $8BA8: C-----  F0 F0    BEQ  $8B9A
  0x04EBBA $8BAA: C-----  E0 E0    CPX  #$E0
  0x04EBBC $8BAC: C-----  C0 C0    CPY  #$C0
  0x04EBBE $8BAE: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04EBBF $8BAF: C-----  00       BRK  
  0x04EBC0 $8BB0: C-----  E0 E0    CPX  #$E0
  0x04EBC2 $8BB2: C-----  E0 E0    CPX  #$E0
  0x04EBC4 $8BB4: C-----  C0 C0    CPY  #$C0
  0x04EBC6 $8BB6: C-----  81 87    STA  ($87,X)
  0x04EBC8 $8BB8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBC9 $8BB9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBCA $8BBA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBCB $8BBB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBCC $8BBC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBCD $8BBD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBCE $8BBE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBCF $8BBF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBD0 $8BC0: C-----  FE FC F9 INC  $F9FC,X
  0x04EBD3 $8BC3: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04EBD4 $8BC4: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04EBD5 $8BC5: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04EBD6 $8BC6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04EBD7 $8BC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBD8 $8BC8: C-----  FE FC F9 INC  $F9FC,X
  0x04EBDB $8BCB: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04EBDC $8BCC: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04EBDD $8BCD: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04EBDE $8BCE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04EBDF $8BCF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBE0 $8BD0: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04EBE1 $8BD1: C-----  F1 E7    SBC  ($E7),Y
  0x04EBE3 $8BD3: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04EBE4 $8BD4: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04EBE5 $8BD5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04EBE6 $8BD6: C-----  5E 04 7C LSR  $7C04,X
  0x04EBE9 $8BD9: C-----  F1 E7    SBC  ($E7),Y
  0x04EBEB $8BDB: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04EBEC $8BDC: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04EBED $8BDD: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04EBEE $8BDE: C-----  7E FC FF ROR  $FFFC,X
  0x04EBF1 $8BE1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBF2 $8BE2: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04EBF3 $8BE3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04EBF4 $8BE4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EBF5 $8BE5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04EBF6 $8BE6: C-----  01 00    ORA  ($00,X)
  0x04EBF8 $8BE8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBF9 $8BE9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBFA $8BEA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBFB $8BEB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBFC $8BEC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBFD $8BED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBFE $8BEE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EBFF $8BEF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EC00 $8BF0: C-----  00       BRK  
  0x04EC01 $8BF1: C-----  00       BRK  
  0x04EC02 $8BF2: C-----  00       BRK  
  0x04EC03 $8BF3: C-----  00       BRK  
  0x04EC04 $8BF4: C-----  00       BRK  
  0x04EC05 $8BF5: C-----  00       BRK  
  0x04EC06 $8BF6: C-----  00       BRK  
  0x04EC07 $8BF7: C-----  00       BRK  
  0x04EC08 $8BF8: C-----  F1 C7    SBC  ($C7),Y
  0x04EC0A $8BFA: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04EC0B $8BFB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04EC0C $8BFC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EC0D $8BFD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EC0E $8BFE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EC0F $8BFF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EC10 $8C00: C-----  00       BRK  
  0x04EC11 $8C01: C-----  00       BRK  
  0x04EC12 $8C02: C-----  00       BRK  
  0x04EC13 $8C03: C-----  00       BRK  
  0x04EC14 $8C04: C-----  00       BRK  
  0x04EC15 $8C05: C-----  00       BRK  
  0x04EC16 $8C06: C-----  00       BRK  
  0x04EC17 $8C07: C-----  00       BRK  
  0x04EC18 $8C08: C-----  00       BRK  
  0x04EC19 $8C09: C-----  00       BRK  
  0x04EC1A $8C0A: C-----  00       BRK  
  0x04EC1B $8C0B: C-----  00       BRK  
  0x04EC1C $8C0C: C-----  00       BRK  
  0x04EC1D $8C0D: C-----  00       BRK  
  0x04EC1E $8C0E: C-----  00       BRK  
  0x04EC1F $8C0F: C-----  00       BRK  
  0x04EC20 $8C10: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EC21 $8C11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EC22 $8C12: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EC23 $8C13: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EC24 $8C14: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EC25 $8C15: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EC26 $8C16: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EC27 $8C17: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EC28 $8C18: C-----  00       BRK  
  0x04EC29 $8C19: C-----  00       BRK  
  0x04EC2A $8C1A: C-----  00       BRK  
  0x04EC2B $8C1B: C-----  00       BRK  
  0x04EC2C $8C1C: C-----  00       BRK  
  0x04EC2D $8C1D: C-----  00       BRK  
  0x04EC2E $8C1E: C-----  00       BRK  
  0x04EC2F $8C1F: C-----  00       BRK  
  0x04EC30 $8C20: C-----  01 03    ORA  ($03,X)
  0x04EC32 $8C22: C-----  1E 79 EC ASL  $EC79,X
  0x04EC35 $8C25: C-----  B0 40    BCS  $8C67
  0x04EC37 $8C27: C-----  00       BRK  
  0x04EC38 $8C28: C-----  00       BRK  
  0x04EC39 $8C29: C-----  05 07    ORA  $07
  0x04EC3B $8C2B: C-----  1E 70 C0 ASL  $C070,X
  0x04EC3E $8C2E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04EC3F $8C2F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04EC40 $8C30: C-----  E8       INX  
  0x04EC41 $8C31: C-----  90 40    BCC  $8C73
  0x04EC43 $8C33: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04EC44 $8C34: C-----  00       BRK  
  0x04EC45 $8C35: C-----  00       BRK  
  0x04EC46 $8C36: C-----  00       BRK  
  0x04EC47 $8C37: C-----  00       BRK  
  0x04EC48 $8C38: C-----  70 E0    BVS  $8C1A
  0x04EC4A $8C3A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04EC4B $8C3B: C-----  00       BRK  
  0x04EC4C $8C3C: C-----  00       BRK  
  0x04EC4D $8C3D: C-----  00       BRK  
  0x04EC4E $8C3E: C-----  00       BRK  
  0x04EC4F $8C3F: C-----  00       BRK  
  0x04EC50 $8C40: C-----  00       BRK  
  0x04EC51 $8C41: C-----  00       BRK  
  0x04EC52 $8C42: C-----  00       BRK  
  0x04EC53 $8C43: C-----  00       BRK  
  0x04EC54 $8C44: C-----  00       BRK  
  0x04EC55 $8C45: C-----  C0 F0    CPY  #$F0
  0x04EC57 $8C47: C-----  7E 00 00 ROR  $0000,X
  0x04EC5A $8C4A: C-----  00       BRK  
  0x04EC5B $8C4B: C-----  00       BRK  
  0x04EC5C $8C4C: C-----  C0 F0    CPY  #$F0
  0x04EC5E $8C4E: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04EC5F $8C4F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EC60 $8C50: C-----  68       PLA  
  0x04EC61 $8C51: C-----  50 A0    BVC  $8BF3
  0x04EC63 $8C53: C-----  A0 40    LDY  #$40
  0x04EC65 $8C55: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04EC66 $8C56: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04EC67 $8C57: C-----  00       BRK  
  0x04EC68 $8C58: C-----  30 E0    BMI  $8C3A
  0x04EC6A $8C5A: C-----  C0 C0    CPY  #$C0
  0x04EC6C $8C5C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04EC6D $8C5D: C-----  00       BRK  
  0x04EC6E $8C5E: C-----  00       BRK  
  0x04EC6F $8C5F: C-----  00       BRK  
  0x04EC70 $8C60: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04EC71 $8C61: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04EC72 $8C62: C-----  00       BRK  
  0x04EC73 $8C63: C-----  00       BRK  
  0x04EC74 $8C64: C-----  00       BRK  
  0x04EC75 $8C65: C-----  00       BRK  
  0x04EC76 $8C66: C-----  00       BRK  
  0x04EC77 $8C67: C-----  00       BRK  
  0x04EC78 $8C68: C-----  01 00    ORA  ($00,X)
  0x04EC7A $8C6A: C-----  00       BRK  
  0x04EC7B $8C6B: C-----  00       BRK  
  0x04EC7C $8C6C: C-----  00       BRK  
  0x04EC7D $8C6D: C-----  00       BRK  
  0x04EC7E $8C6E: C-----  00       BRK  
  0x04EC7F $8C6F: C-----  00       BRK  
  0x04EC80 $8C70: C-----  C0 F8    CPY  #$F8
  0x04EC82 $8C72: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04EC83 $8C73: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04EC84 $8C74: C-----  31 30    AND  ($30),Y
  0x04EC86 $8C76: C-----  18       CLC  
  0x04EC87 $8C77: C-----  18       CLC  
  0x04EC88 $8C78: C-----  F8       SED  
  0x04EC89 $8C79: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04EC8A $8C7A: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04EC8B $8C7B: C-----  40       RTI  
  0x04EC8C $8C7C: C-----  60       RTS  
  0x04EC8D $8C7D: C-----  20 30 10 JSR  $1030
  0x04EC90 $8C80: C-----  B8       CLV  
  0x04EC91 $8C81: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04EC92 $8C82: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04EC93 $8C83: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x04EC94 $8C84: C-----  FE E7 EB INC  $EBE7,X
  0x04EC97 $8C87: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04EC98 $8C88: C-----  D0 08    BNE  $8C92
  0x04EC9A $8C8A: C-----  E8       INX  
  0x04EC9B $8C8B: C-----  E4 3C    CPX  $3C
  0x04EC9D $8C8D: C-----  !!UNDEF $1A  ; unknown opcode, treating as data
  0x04EC9E $8C8E: C-----  1E 1E 18 ASL  $181E,X
  0x04ECA1 $8C91: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04ECA2 $8C92: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04ECA3 $8C93: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04ECA4 $8C94: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04ECA5 $8C95: C-----  DE 0B FF DEC  $FF0B,X
  0x04ECA8 $8C98: C-----  10 08    BPL  $8CA2
  0x04ECAA $8C9A: C-----  08       PHP  
  0x04ECAB $8C9B: C-----  08       PHP  
  0x04ECAC $8C9C: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04ECAD $8C9D: C-----  FD FF 10 SBC  $10FF,X
  0x04ECB0 $8CA0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04ECB1 $8CA1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04ECB2 $8CA2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04ECB3 $8CA3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04ECB4 $8CA4: C-----  1E 3F 2D ASL  $2D3F,X
  0x04ECB7 $8CA7: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04ECB8 $8CA8: C-----  00       BRK  
  0x04ECB9 $8CA9: C-----  00       BRK  
  0x04ECBA $8CAA: C-----  00       BRK  
  0x04ECBB $8CAB: C-----  00       BRK  
  0x04ECBC $8CAC: C-----  01 01    ORA  ($01,X)
  0x04ECBE $8CAE: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x04ECBF $8CAF: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04ECC0 $8CB0: C-----  EC EF DB CPX  $DBEF
  0x04ECC3 $8CB3: C-----  9D DA B5 STA  $B5DA,X
  0x04ECC6 $8CB6: C-----  BE 3F 1B LDX  $1B3F,Y
  0x04ECC9 $8CB9: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x04ECCA $8CBA: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04ECCB $8CBB: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x04ECCC $8CBC: C-----  F5 EE    SBC  $EE,X
  0x04ECCE $8CBE: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04ECCF $8CBF: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04ECD0 $8CC0: C-----  00       BRK  
  0x04ECD1 $8CC1: C-----  00       BRK  
  0x04ECD2 $8CC2: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04ECD3 $8CC3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04ECD4 $8CC4: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04ECD5 $8CC5: C-----  0D F8 FF ORA  $FFF8
  0x04ECD8 $8CC8: C-----  00       BRK  
  0x04ECD9 $8CC9: C-----  00       BRK  
  0x04ECDA $8CCA: C-----  00       BRK  
  0x04ECDB $8CCB: C-----  00       BRK  
  0x04ECDC $8CCC: C-----  78       SEI  
  0x04ECDD $8CCD: C-----  FE FF 0F INC  $0FFF,X
  0x04ECE0 $8CD0: C-----  38       SEC  
  0x04ECE1 $8CD1: C-----  18       CLC  
  0x04ECE2 $8CD2: C-----  FD FD FE SBC  $FEFD,X
  0x04ECE5 $8CD5: C-----  FE 1D E9 INC  $E91D,X
  0x04ECE8 $8CD8: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04ECE9 $8CD9: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04ECEA $8CDA: C-----  0E 06 07 ASL  $0706
  0x04ECED $8CDD: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04ECEE $8CDE: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04ECEF $8CDF: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04ECF0 $8CE0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04ECF1 $8CE1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04ECF2 $8CE2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04ECF3 $8CE3: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04ECF4 $8CE4: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04ECF5 $8CE5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04ECF6 $8CE6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04ECF7 $8CE7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04ECF8 $8CE8: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04ECF9 $8CE9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04ECFA $8CEA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04ECFB $8CEB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04ECFC $8CEC: C-----  F0 C0    BEQ  $8CAE
  0x04ECFE $8CEE: C-----  00       BRK  
  0x04ECFF $8CEF: C-----  00       BRK  
  0x04ED00 $8CF0: C-----  3D 4F B9 AND  $B94F,X
  0x04ED03 $8CF3: C-----  BD DF EB LDA  $EBDF,X
  0x04ED06 $8CF6: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04ED07 $8CF7: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04ED08 $8CF8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04ED09 $8CF9: C-----  B0 7F    BCS  $8D7A
  0x04ED0B $8CFB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04ED0C $8CFC: C-----  3D 1F 0E AND  $0E1F,X
  0x04ED0F $8CFF: C-----  0E 00 01 ASL  $0100
  0x04ED12 $8D02: C-----  01 07    ORA  ($07,X)
  0x04ED14 $8D04: C-----  0A       ASL  A
  0x04ED15 $8D05: C-----  1D 16 7E ORA  $7E16,X
  0x04ED18 $8D08: C-----  00       BRK  
  0x04ED19 $8D09: C-----  00       BRK  
  0x04ED1A $8D0A: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04ED1B $8D0B: C-----  01 07    ORA  ($07,X)
  0x04ED1D $8D0D: C-----  0E 0D 14 ASL  $140D
  0x04ED20 $8D10: C-----  F0 50    BEQ  $8D62
  0x04ED22 $8D12: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04ED23 $8D13: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04ED24 $8D14: C-----  F6 F8    INC  $F8,X
  0x04ED26 $8D16: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04ED27 $8D17: C-----  00       BRK  
  0x04ED28 $8D18: C-----  20 E1 C1 JSR  $C1E1
  0x04ED2B $8D1B: C-----  8E 78 80 STX  $8078
  0x04ED2E $8D1E: C-----  00       BRK  
  0x04ED2F $8D1F: C-----  00       BRK  
  0x04ED30 $8D20: C-----  00       BRK  
  0x04ED31 $8D21: C-----  00       BRK  
  0x04ED32 $8D22: C-----  00       BRK  
  0x04ED33 $8D23: C-----  F0 FE    BEQ  $8D23
  0x04ED35 $8D25: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04ED36 $8D26: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04ED37 $8D27: C-----  00       BRK  
  0x04ED38 $8D28: C-----  00       BRK  
  0x04ED39 $8D29: C-----  00       BRK  
  0x04ED3A $8D2A: C-----  F0 FF    BEQ  $8D2B
  0x04ED3C $8D2C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04ED3D $8D2D: C-----  01 00    ORA  ($00,X)
  0x04ED3F $8D2F: C-----  00       BRK  
  0x04ED40 $8D30: C-----  00       BRK  
  0x04ED41 $8D31: C-----  00       BRK  
  0x04ED42 $8D32: C-----  00       BRK  
  0x04ED43 $8D33: C-----  00       BRK  
  0x04ED44 $8D34: C-----  C0 5C    CPY  #$5C
  0x04ED46 $8D36: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04ED47 $8D37: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04ED48 $8D38: C-----  00       BRK  
  0x04ED49 $8D39: C-----  00       BRK  
  0x04ED4A $8D3A: C-----  00       BRK  
  0x04ED4B $8D3B: C-----  C0 FC    CPY  #$FC
  0x04ED4D $8D3D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04ED4E $8D3E: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x04ED4F $8D3F: C-----  10 3F    BPL  $8D80
  0x04ED51 $8D41: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04ED52 $8D42: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04ED53 $8D43: C-----  E0 00    CPX  #$00
  0x04ED55 $8D45: C-----  00       BRK  
  0x04ED56 $8D46: C-----  00       BRK  
  0x04ED57 $8D47: C-----  00       BRK  
  0x04ED58 $8D48: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04ED59 $8D49: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04ED5A $8D4A: C-----  E0 00    CPX  #$00
  0x04ED5C $8D4C: C-----  00       BRK  
  0x04ED5D $8D4D: C-----  00       BRK  
  0x04ED5E $8D4E: C-----  00       BRK  
  0x04ED5F $8D4F: C-----  00       BRK  
  0x04ED60 $8D50: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04ED61 $8D51: C-----  20 C0 00 JSR  $00C0
  0x04ED64 $8D54: C-----  00       BRK  
  0x04ED65 $8D55: C-----  00       BRK  
  0x04ED66 $8D56: C-----  00       BRK  
  0x04ED67 $8D57: C-----  00       BRK  
  0x04ED68 $8D58: C-----  C0 C0    CPY  #$C0
  0x04ED6A $8D5A: C-----  00       BRK  
  0x04ED6B $8D5B: C-----  00       BRK  
  0x04ED6C $8D5C: C-----  00       BRK  
  0x04ED6D $8D5D: C-----  00       BRK  
  0x04ED6E $8D5E: C-----  00       BRK  
  0x04ED6F $8D5F: C-----  00       BRK  
  0x04ED70 $8D60: C-----  00       BRK  
  0x04ED71 $8D61: C-----  00       BRK  
  0x04ED72 $8D62: C-----  00       BRK  
  0x04ED73 $8D63: C-----  00       BRK  
  0x04ED74 $8D64: C-----  00       BRK  
  0x04ED75 $8D65: C-----  00       BRK  
  0x04ED76 $8D66: C-----  F0 7E    BEQ  $8DE6
  0x04ED78 $8D68: C-----  00       BRK  
  0x04ED79 $8D69: C-----  00       BRK  
  0x04ED7A $8D6A: C-----  00       BRK  
  0x04ED7B $8D6B: C-----  00       BRK  
  0x04ED7C $8D6C: C-----  00       BRK  
  0x04ED7D $8D6D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04ED7E $8D6E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04ED7F $8D6F: C-----  F0 00    BEQ  $8D71
  0x04ED81 $8D71: C-----  00       BRK  
  0x04ED82 $8D72: C-----  00       BRK  
  0x04ED83 $8D73: C-----  00       BRK  
  0x04ED84 $8D74: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04ED85 $8D75: C-----  C0 E0    CPY  #$E0
  0x04ED87 $8D77: C-----  F0 00    BEQ  $8D79
  0x04ED89 $8D79: C-----  00       BRK  
  0x04ED8A $8D7A: C-----  00       BRK  
  0x04ED8B $8D7B: C-----  00       BRK  
  0x04ED8C $8D7C: C-----  00       BRK  
  0x04ED8D $8D7D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04ED8E $8D7E: C-----  40       RTI  
  0x04ED8F $8D7F: C-----  20 0F 01 JSR  $010F
  0x04ED92 $8D82: C-----  F8       SED  
  0x04ED93 $8D83: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04ED94 $8D84: C-----  FE B7 7E INC  $7EB7,X
  0x04ED97 $8D87: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04ED98 $8D88: C-----  7E 0F 01 ROR  $010F,X
  0x04ED9B $8D8B: C-----  18       CLC  
  0x04ED9C $8D8C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04ED9D $8D8D: C-----  78       SEI  
  0x04ED9E $8D8E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04ED9F $8D8F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EDA0 $8D90: C-----  C0 F0    CPY  #$F0
  0x04EDA2 $8D92: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04EDA3 $8D93: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04EDA4 $8D94: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EDA5 $8D95: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04EDA6 $8D96: C-----  F5 7D    SBC  $7D,X
  0x04EDA8 $8D98: C-----  00       BRK  
  0x04EDA9 $8D99: C-----  C0 F0    CPY  #$F0
  0x04EDAB $8D9B: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x04EDAC $8D9C: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x04EDAD $8D9D: C-----  A0 2E    LDY  #$2E
  0x04EDAF $8D9F: C-----  !!UNDEF $93  ; unknown opcode, treating as data
  0x04EDB0 $8DA0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04EDB1 $8DA1: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04EDB2 $8DA2: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04EDB3 $8DA3: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x04EDB4 $8DA4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EDB5 $8DA5: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04EDB6 $8DA6: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04EDB7 $8DA7: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04EDB8 $8DA8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EDB9 $8DA9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EDBA $8DAA: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x04EDBB $8DAB: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04EDBC $8DAC: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04EDBD $8DAD: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04EDBE $8DAE: C-----  F8       SED  
  0x04EDBF $8DAF: C-----  E0 7F    CPX  #$7F
  0x04EDC1 $8DB1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04EDC2 $8DB2: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04EDC3 $8DB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EDC4 $8DB4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EDC5 $8DB5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EDC6 $8DB6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EDC7 $8DB7: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04EDC8 $8DB8: C-----  90 90    BCC  $8D4A
  0x04EDCA $8DBA: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04EDCB $8DBB: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04EDCC $8DBC: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04EDCD $8DBD: C-----  18       CLC  
  0x04EDCE $8DBE: C-----  08       PHP  
  0x04EDCF $8DBF: C-----  18       CLC  
  0x04EDD0 $8DC0: C-----  05 0A    ORA  $0A
  0x04EDD2 $8DC2: C-----  0D F7 FB ORA  $FBF7
  0x04EDD5 $8DC5: C-----  0E 1C 38 ASL  $381C
  0x04EDD8 $8DC8: C-----  0E 04 07 ASL  $0704
  0x04EDDB $8DCB: C-----  FE 06 08 INC  $0806,X
  0x04EDDE $8DCE: C-----  10 30    BPL  $8E00
  0x04EDE0 $8DD0: C-----  E0 FF    CPX  #$FF
  0x04EDE2 $8DD2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EDE3 $8DD3: C-----  FE 03 00 INC  $0003,X
  0x04EDE6 $8DD6: C-----  00       BRK  
  0x04EDE7 $8DD7: C-----  00       BRK  
  0x04EDE8 $8DD8: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04EDE9 $8DD9: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04EDEA $8DDA: C-----  E0 01    CPX  #$01
  0x04EDEC $8DDC: C-----  00       BRK  
  0x04EDED $8DDD: C-----  00       BRK  
  0x04EDEE $8DDE: C-----  00       BRK  
  0x04EDEF $8DDF: C-----  00       BRK  
  0x04EDF0 $8DE0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EDF1 $8DE1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EDF2 $8DE2: C-----  BC 7B D7 LDY  $D77B,X
  0x04EDF5 $8DE5: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04EDF6 $8DE6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04EDF7 $8DE7: C-----  18       CLC  
  0x04EDF8 $8DE8: C-----  7E 81 7F ROR  $7F81,X
  0x04EDFB $8DEB: C-----  FD 3A 04 SBC  $043A,X
  0x04EDFE $8DEE: C-----  08       PHP  
  0x04EDFF $8DEF: C-----  10 F3    BPL  $8DE4
  0x04EE01 $8DF1: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04EE02 $8DF2: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04EE03 $8DF3: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04EE04 $8DF4: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04EE05 $8DF5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EE06 $8DF6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EE07 $8DF7: C-----  01 2F    ORA  ($2F,X)
  0x04EE09 $8DF9: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04EE0A $8DFA: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04EE0B $8DFB: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04EE0C $8DFC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EE0D $8DFD: C-----  00       BRK  
  0x04EE0E $8DFE: C-----  00       BRK  
  0x04EE0F $8DFF: C-----  00       BRK  
  0x04EE10 $8E00: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04EE11 $8E01: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04EE12 $8E02: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04EE13 $8E03: C-----  2E 1E 11 ROL  $111E
  0x04EE16 $8E06: C-----  0A       ASL  A
  0x04EE17 $8E07: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04EE18 $8E08: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04EE19 $8E09: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04EE1A $8E0A: C-----  !!UNDEF $1B  ; unknown opcode, treating as data
  0x04EE1B $8E0B: C-----  1D 0D 0F ORA  $0F0D,X
  0x04EE1E $8E0E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EE1F $8E0F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EE20 $8E10: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04EE21 $8E11: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04EE22 $8E12: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EE23 $8E13: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04EE24 $8E14: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EE25 $8E15: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04EE26 $8E16: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04EE27 $8E17: C-----  EE DF DF INC  $DFDF
  0x04EE2A $8E1A: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04EE2B $8E1B: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04EE2C $8E1C: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04EE2D $8E1D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EE2E $8E1E: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04EE2F $8E1F: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04EE30 $8E20: C-----  FE BE E9 INC  $E9BE,X
  0x04EE33 $8E23: C-----  96 28    STX  $28,Y
  0x04EE35 $8E25: C-----  90 E0    BCC  $8E07
  0x04EE37 $8E27: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04EE38 $8E28: C-----  39 77 7E AND  $7E77,Y
  0x04EE3B $8E2B: C-----  78       SEI  
  0x04EE3C $8E2C: C-----  F0 E0    BEQ  $8E0E
  0x04EE3E $8E2E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04EE3F $8E2F: C-----  00       BRK  
  0x04EE40 $8E30: C-----  18       CLC  
  0x04EE41 $8E31: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04EE42 $8E32: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04EE43 $8E33: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04EE44 $8E34: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04EE45 $8E35: C-----  DE 0B 7F DEC  $7F0B,X
  0x04EE48 $8E38: C-----  10 08    BPL  $8E42
  0x04EE4A $8E3A: C-----  08       PHP  
  0x04EE4B $8E3B: C-----  08       PHP  
  0x04EE4C $8E3C: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04EE4D $8E3D: C-----  FD FF 90 SBC  $90FF,X
  0x04EE50 $8E40: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EE51 $8E41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EE52 $8E42: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EE53 $8E43: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EE54 $8E44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EE55 $8E45: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04EE56 $8E46: C-----  7E 85 00 ROR  $0085,X
  0x04EE59 $8E49: C-----  00       BRK  
  0x04EE5A $8E4A: C-----  00       BRK  
  0x04EE5B $8E4B: C-----  00       BRK  
  0x04EE5C $8E4C: C-----  00       BRK  
  0x04EE5D $8E4D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04EE5E $8E4E: C-----  81 7B    STA  ($7B,X)
  0x04EE60 $8E50: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EE61 $8E51: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EE62 $8E52: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EE63 $8E53: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EE64 $8E54: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EE65 $8E55: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04EE66 $8E56: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04EE67 $8E57: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04EE68 $8E58: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04EE69 $8E59: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04EE6A $8E5A: C-----  05 0B    ORA  $0B
  0x04EE6C $8E5C: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04EE6D $8E5D: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04EE6E $8E5E: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04EE6F $8E5F: C-----  E8       INX  
  0x04EE70 $8E60: C-----  00       BRK  
  0x04EE71 $8E61: C-----  00       BRK  
  0x04EE72 $8E62: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EE73 $8E63: C-----  F5 7F    SBC  $7F,X
  0x04EE75 $8E65: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EE76 $8E66: C-----  F8       SED  
  0x04EE77 $8E67: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EE78 $8E68: C-----  00       BRK  
  0x04EE79 $8E69: C-----  00       BRK  
  0x04EE7A $8E6A: C-----  00       BRK  
  0x04EE7B $8E6B: C-----  0A       ASL  A
  0x04EE7C $8E6C: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04EE7D $8E6D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EE7E $8E6E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EE7F $8E6F: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EE80 $8E70: C-----  38       SEC  
  0x04EE81 $8E71: C-----  18       CLC  
  0x04EE82 $8E72: C-----  FD FD CE SBC  $CEFD,X
  0x04EE85 $8E75: C-----  F6 1D    INC  $1D,X
  0x04EE87 $8E77: C-----  E9 0C    SBC  #$0C
  0x04EE89 $8E79: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04EE8A $8E7A: C-----  0E 06 F7 ASL  $F706
  0x04EE8D $8E7D: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04EE8E $8E7E: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04EE8F $8E7F: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04EE90 $8E80: C-----  06 0B    ASL  $0B
  0x04EE92 $8E82: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04EE93 $8E83: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04EE94 $8E84: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x04EE95 $8E85: C-----  56 5B    LSR  $5B,X
  0x04EE97 $8E87: C-----  BD 01 07 LDA  $0701,X
  0x04EE9A $8E8A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EE9B $8E8B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EE9C $8E8C: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04EE9D $8E8D: C-----  39 3C 7E AND  $7E3C,Y
  0x04EEA0 $8E90: C-----  ED EF DF SBC  $DFEF
  0x04EEA3 $8E93: C-----  DD DF BF CMP  $BFDF,X
  0x04EEA6 $8E96: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04EEA7 $8E97: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04EEA8 $8E98: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04EEA9 $8E99: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04EEAA $8E9A: C-----  F6 F6    INC  $F6,X
  0x04EEAC $8E9C: C-----  F0 60    BEQ  $8EFE
  0x04EEAE $8E9E: C-----  60       RTS  
  0x04EEAF $8E9F: C-----  E0 BF    CPX  #$BF
  0x04EEB1 $8EA1: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04EEB2 $8EA2: C-----  7E 5E 3E ROR  $3E5E,X
  0x04EEB5 $8EA5: C-----  29 12    AND  #$12
  0x04EEB7 $8EA7: C-----  0A       ASL  A
  0x04EEB8 $8EA8: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04EEB9 $8EA9: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04EEBA $8EAA: C-----  3D 3D 1D AND  $1D3D,X
  0x04EEBD $8EAD: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04EEBE $8EAE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EEBF $8EAF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EEC0 $8EB0: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04EEC1 $8EB1: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04EEC2 $8EB2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EEC3 $8EB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EEC4 $8EB4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EEC5 $8EB5: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04EEC6 $8EB6: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04EEC7 $8EB7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EEC8 $8EB8: C-----  C0 C0    CPY  #$C0
  0x04EECA $8EBA: C-----  C0 80    CPY  #$80
  0x04EECC $8EBC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04EECD $8EBD: C-----  C0 80    CPY  #$80
  0x04EECF $8EBF: C-----  00       BRK  
  0x04EED0 $8EC0: C-----  6C FF FF JMP  ($FFFF)
  0x04EED3 $8EC3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EED4 $8EC4: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04EED5 $8EC5: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04EED6 $8EC6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EED7 $8EC7: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04EED8 $8EC8: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04EED9 $8EC9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EEDA $8ECA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EEDB $8ECB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EEDC $8ECC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EEDD $8ECD: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04EEDE $8ECE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04EEDF $8ECF: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04EEE0 $8ED0: C-----  3D CF E5 AND  $E5CF,X
  0x04EEE3 $8ED3: C-----  FD FF EB SBC  $EBFF,X
  0x04EEE6 $8ED6: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x04EEE7 $8ED7: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x04EEE8 $8ED8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EEE9 $8ED9: C-----  F0 FB    BEQ  $8ED6
  0x04EEEB $8EDB: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04EEEC $8EDC: C-----  F1 F7    SBC  ($F7),Y
  0x04EEEE $8EDE: C-----  E6 86    INC  $86
  0x04EEF0 $8EE0: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04EEF1 $8EE1: C-----  FD F7 EF SBC  $EFF7,X
  0x04EEF4 $8EE4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EEF5 $8EE5: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04EEF6 $8EE6: C-----  DE 85 1C DEC  $1C85,X
  0x04EEF9 $8EE9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04EEFA $8EEA: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EEFB $8EEB: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04EEFC $8EEC: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04EEFD $8EED: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04EEFE $8EEE: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04EEFF $8EEF: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x04EF00 $8EF0: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04EF01 $8EF1: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04EF02 $8EF2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EF03 $8EF3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EF04 $8EF4: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04EF05 $8EF5: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x04EF06 $8EF6: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04EF07 $8EF7: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04EF08 $8EF8: C-----  !!UNDEF $32  ; unknown opcode, treating as data
  0x04EF09 $8EF9: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04EF0A $8EFA: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04EF0B $8EFB: C-----  E8       INX  
  0x04EF0C $8EFC: C-----  EA       NOP  
  0x04EF0D $8EFD: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x04EF0E $8EFE: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04EF0F $8EFF: C-----  E8       INX  
  0x04EF10 $8F00: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EF11 $8F01: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EF12 $8F02: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EF13 $8F03: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EF14 $8F04: C-----  FD FF FF SBC  $FFFF,X
  0x04EF17 $8F07: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04EF18 $8F08: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04EF19 $8F09: C-----  FE FE FF INC  $FFFE,X
  0x04EF1C $8F0C: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x04EF1D $8F0D: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04EF1E $8F0E: C-----  E1 1D    SBC  ($1D,X)
  0x04EF20 $8F10: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04EF21 $8F11: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04EF22 $8F12: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04EF23 $8F13: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04EF24 $8F14: C-----  FE 81 4F INC  $4F81,X
  0x04EF27 $8F17: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04EF28 $8F18: C-----  18       CLC  
  0x04EF29 $8F19: C-----  30 30    BMI  $8F4B
  0x04EF2B $8F1B: C-----  61 7F    ADC  ($7F,X)
  0x04EF2D $8F1D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EF2E $8F1E: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04EF2F $8F1F: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04EF30 $8F20: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04EF31 $8F21: C-----  01 F0    ORA  ($F0,X)
  0x04EF33 $8F23: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04EF34 $8F24: C-----  DD BF 1F CMP  $1FBF,X
  0x04EF37 $8F27: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04EF38 $8F28: C-----  7E 0F 01 ROR  $010F,X
  0x04EF3B $8F2B: C-----  10 3E    BPL  $8F6B
  0x04EF3D $8F2D: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04EF3E $8F2E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EF3F $8F2F: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04EF40 $8F30: C-----  C0 F0    CPY  #$F0
  0x04EF42 $8F32: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04EF43 $8F33: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04EF44 $8F34: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EF45 $8F35: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04EF46 $8F36: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EF47 $8F37: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04EF48 $8F38: C-----  00       BRK  
  0x04EF49 $8F39: C-----  C0 F0    CPY  #$F0
  0x04EF4B $8F3B: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x04EF4C $8F3C: C-----  !!UNDEF $23  ; unknown opcode, treating as data
  0x04EF4D $8F3D: C-----  A0 A0    LDY  #$A0
  0x04EF4F $8F3F: C-----  D0 F7    BNE  $8F38
  0x04EF51 $8F41: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04EF52 $8F42: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04EF53 $8F43: C-----  FE 16 CC INC  $CC16,X
  0x04EF56 $8F46: C-----  D8       CLD  
  0x04EF57 $8F47: C-----  30 1E    BMI  $8F67
  0x04EF59 $8F49: C-----  3E 0A F4 ROL  $F40A,X
  0x04EF5C $8F4C: C-----  EC F8 F0 CPX  $F0F8
  0x04EF5F $8F4F: C-----  E0 F6    CPX  #$F6
  0x04EF61 $8F51: C-----  FE EF DD INC  $DDEF,X
  0x04EF64 $8F54: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04EF65 $8F55: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04EF66 $8F56: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04EF67 $8F57: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04EF68 $8F58: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04EF69 $8F59: C-----  F5 F5    SBC  $F5,X
  0x04EF6B $8F5B: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04EF6C $8F5C: C-----  D6 23    DEC  $23,X
  0x04EF6E $8F5E: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x04EF6F $8F5F: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04EF70 $8F60: C-----  E0 C0    CPX  #$C0
  0x04EF72 $8F62: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04EF73 $8F63: C-----  00       BRK  
  0x04EF74 $8F64: C-----  00       BRK  
  0x04EF75 $8F65: C-----  00       BRK  
  0x04EF76 $8F66: C-----  00       BRK  
  0x04EF77 $8F67: C-----  00       BRK  
  0x04EF78 $8F68: C-----  C0 80    CPY  #$80
  0x04EF7A $8F6A: C-----  00       BRK  
  0x04EF7B $8F6B: C-----  00       BRK  
  0x04EF7C $8F6C: C-----  00       BRK  
  0x04EF7D $8F6D: C-----  00       BRK  
  0x04EF7E $8F6E: C-----  00       BRK  
  0x04EF7F $8F6F: C-----  00       BRK  
  0x04EF80 $8F70: C-----  60       RTS  
  0x04EF81 $8F71: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EF82 $8F72: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EF83 $8F73: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04EF84 $8F74: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04EF85 $8F75: C-----  00       BRK  
  0x04EF86 $8F76: C-----  00       BRK  
  0x04EF87 $8F77: C-----  00       BRK  
  0x04EF88 $8F78: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04EF89 $8F79: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04EF8A $8F7A: C-----  E0 07    CPX  #$07
  0x04EF8C $8F7C: C-----  00       BRK  
  0x04EF8D $8F7D: C-----  00       BRK  
  0x04EF8E $8F7E: C-----  00       BRK  
  0x04EF8F $8F7F: C-----  00       BRK  
  0x04EF90 $8F80: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04EF91 $8F81: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04EF92 $8F82: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04EF93 $8F83: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EF94 $8F84: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EF95 $8F85: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EF96 $8F86: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EF97 $8F87: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EF98 $8F88: C-----  FD FF 23 SBC  $23FF,X
  0x04EF9B $8F8B: C-----  00       BRK  
  0x04EF9C $8F8C: C-----  00       BRK  
  0x04EF9D $8F8D: C-----  00       BRK  
  0x04EF9E $8F8E: C-----  00       BRK  
  0x04EF9F $8F8F: C-----  00       BRK  
  0x04EFA0 $8F90: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04EFA1 $8F91: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04EFA2 $8F92: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04EFA3 $8F93: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EFA4 $8F94: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04EFA5 $8F95: C-----  FD FF F7 SBC  $F7FF,X
  0x04EFA8 $8F98: C-----  90 94    BCC  $8F2E
  0x04EFAA $8F9A: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04EFAB $8F9B: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04EFAC $8F9C: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04EFAD $8F9D: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x04EFAE $8F9E: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x04EFAF $8F9F: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x04EFB0 $8FA0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EFB1 $8FA1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EFB2 $8FA2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EFB3 $8FA3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EFB4 $8FA4: C-----  FD FF FF SBC  $FFFF,X
  0x04EFB7 $8FA7: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04EFB8 $8FA8: C-----  00       BRK  
  0x04EFB9 $8FA9: C-----  00       BRK  
  0x04EFBA $8FAA: C-----  00       BRK  
  0x04EFBB $8FAB: C-----  01 02    ORA  ($02,X)
  0x04EFBD $8FAD: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04EFBE $8FAE: C-----  E1 1D    SBC  ($1D,X)
  0x04EFC0 $8FB0: C-----  !!UNDEF $B7  ; unknown opcode, treating as data
  0x04EFC1 $8FB1: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04EFC2 $8FB2: C-----  E9 DF    SBC  #$DF
  0x04EFC4 $8FB4: C-----  FE 81 2F INC  $2F81,X
  0x04EFC7 $8FB7: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04EFC8 $8FB8: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x04EFC9 $8FB9: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04EFCA $8FBA: C-----  36 61    ROL  $61,X
  0x04EFCC $8FBC: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04EFCD $8FBD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EFCE $8FBE: C-----  F0 F8    BEQ  $8FB8
  0x04EFD0 $8FC0: C-----  F8       SED  
  0x04EFD1 $8FC1: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04EFD2 $8FC2: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04EFD3 $8FC3: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x04EFD4 $8FC4: C-----  FE A7 DB INC  $DBA7,X
  0x04EFD7 $8FC7: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04EFD8 $8FC8: C-----  10 08    BPL  $8FD2
  0x04EFDA $8FCA: C-----  C8       INY  
  0x04EFDB $8FCB: C-----  E4 3C    CPX  $3C
  0x04EFDD $8FCD: C-----  !!UNDEF $DA  ; unknown opcode, treating as data
  0x04EFDE $8FCE: C-----  EE EE FF INC  $FFEE
  0x04EFE1 $8FD1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EFE2 $8FD2: C-----  BC FB EF LDY  $EFFB,X
  0x04EFE5 $8FD5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04EFE6 $8FD6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04EFE7 $8FD7: C-----  18       CLC  
  0x04EFE8 $8FD8: C-----  7E 81 7F ROR  $7F81,X
  0x04EFEB $8FDB: C-----  8D 72 04 STA  $0472
  0x04EFEE $8FDE: C-----  08       PHP  
  0x04EFEF $8FDF: C-----  10 F7    BPL  $8FD8
  0x04EFF1 $8FE1: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04EFF2 $8FE2: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04EFF3 $8FE3: C-----  FE 16 EC INC  $EC16,X
  0x04EFF6 $8FE6: C-----  D8       CLD  
  0x04EFF7 $8FE7: C-----  30 EE    BMI  $8FD7
  0x04EFF9 $8FE9: C-----  EE 0A F4 INC  $F40A
  0x04EFFC $8FEC: C-----  EC 18 30 CPX  $3018
  0x04EFFF $8FEF: C-----  E0 F5    CPX  #$F5
  0x04F001 $8FF1: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x04F002 $8FF2: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04F003 $8FF3: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04F004 $8FF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F005 $8FF5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F006 $8FF6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F007 $8FF7: C-----  01 2E    ORA  ($2E,X)
  0x04F009 $8FF9: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04F00A $8FFA: C-----  B0 40    BCS  $903C
  0x04F00C $8FFC: C-----  00       BRK  
  0x04F00D $8FFD: C-----  00       BRK  
  0x04F00E $8FFE: C-----  00       BRK  
  0x04F00F $8FFF: C-----  00       BRK  
  0x04F010 $9000: C-----  00       BRK  
  0x04F011 $9001: C-----  00       BRK  
  0x04F012 $9002: C-----  00       BRK  
  0x04F013 $9003: C-----  00       BRK  
  0x04F014 $9004: C-----  00       BRK  
  0x04F015 $9005: C-----  00       BRK  
  0x04F016 $9006: C-----  00       BRK  
  0x04F017 $9007: C-----  00       BRK  
  0x04F018 $9008: C-----  00       BRK  
  0x04F019 $9009: C-----  00       BRK  
  0x04F01A $900A: C-----  00       BRK  
  0x04F01B $900B: C-----  00       BRK  
  0x04F01C $900C: C-----  00       BRK  
  0x04F01D $900D: C-----  00       BRK  
  0x04F01E $900E: C-----  00       BRK  
  0x04F01F $900F: C-----  00       BRK  
  0x04F020 $9010: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F021 $9011: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F022 $9012: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F023 $9013: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F024 $9014: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F025 $9015: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F026 $9016: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F027 $9017: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F028 $9018: C-----  00       BRK  
  0x04F029 $9019: C-----  00       BRK  
  0x04F02A $901A: C-----  00       BRK  
  0x04F02B $901B: C-----  00       BRK  
  0x04F02C $901C: C-----  00       BRK  
  0x04F02D $901D: C-----  00       BRK  
  0x04F02E $901E: C-----  00       BRK  
  0x04F02F $901F: C-----  00       BRK  
  0x04F030 $9020: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04F031 $9021: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04F032 $9022: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F033 $9023: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F034 $9024: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F035 $9025: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F036 $9026: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F037 $9027: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F038 $9028: C-----  00       BRK  
  0x04F039 $9029: C-----  00       BRK  
  0x04F03A $902A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F03B $902B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F03C $902C: C-----  C0 C3    CPY  #$C3
  0x04F03E $902E: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04F03F $902F: C-----  C0 80    CPY  #$80
  0x04F041 $9031: C-----  88       DEY  
  0x04F042 $9032: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F043 $9033: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F044 $9034: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F045 $9035: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F046 $9036: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F047 $9037: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F048 $9038: C-----  CC DA D2 CPY  $D2DA
  0x04F04B $903B: C-----  CC C0 C0 CPY  $C0C0
  0x04F04E $903E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F04F $903F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F050 $9040: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04F051 $9041: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04F052 $9042: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F053 $9043: C-----  00       BRK  
  0x04F054 $9044: C-----  00       BRK  
  0x04F055 $9045: C-----  81 81    STA  ($81,X)
  0x04F057 $9047: C-----  00       BRK  
  0x04F058 $9048: C-----  00       BRK  
  0x04F059 $9049: C-----  00       BRK  
  0x04F05A $904A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F05B $904B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F05C $904C: C-----  00       BRK  
  0x04F05D $904D: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04F05E $904E: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04F05F $904F: C-----  00       BRK  
  0x04F060 $9050: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04F061 $9051: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04F062 $9052: C-----  FE 02 02 INC  $0202,X
  0x04F065 $9055: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04F066 $9056: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04F067 $9057: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04F068 $9058: C-----  00       BRK  
  0x04F069 $9059: C-----  00       BRK  
  0x04F06A $905A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F06B $905B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F06C $905C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F06D $905D: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04F06E $905E: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04F06F $905F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F070 $9060: C-----  00       BRK  
  0x04F071 $9061: C-----  10 00    BPL  $9063
  0x04F073 $9063: C-----  10 00    BPL  $9065
  0x04F075 $9065: C-----  00       BRK  
  0x04F076 $9066: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F077 $9067: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F078 $9068: C-----  00       BRK  
  0x04F079 $9069: C-----  99 00 99 STA  $9900,Y
  0x04F07C $906C: C-----  00       BRK  
  0x04F07D $906D: C-----  00       BRK  
  0x04F07E $906E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F07F $906F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F080 $9070: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04F081 $9071: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x04F082 $9072: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04F083 $9073: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04F084 $9074: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04F085 $9075: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04F086 $9076: C-----  FE FE 33 INC  $33FE,X
  0x04F089 $9079: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x04F08A $907A: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x04F08B $907B: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x04F08C $907C: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F08D $907D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F08E $907E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F08F $907F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F090 $9080: C-----  D9 29 E5 CMP  $E529,Y
  0x04F093 $9083: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x04F094 $9084: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04F095 $9085: C-----  FE 57 C8 INC  $C857,X
  0x04F098 $9088: C-----  36 5D    ROL  $5D,X
  0x04F09A $908A: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x04F09B $908B: C-----  CC 3A 80 CPY  $803A
  0x04F09E $908E: C-----  1E 65 EB ASL  $EB65,X
  0x04F0A1 $9091: C-----  55 AE    EOR  $AE,X
  0x04F0A3 $9093: C-----  D0 77    BNE  $910C
  0x04F0A5 $9095: C-----  E4 54    CPX  $54
  0x04F0A7 $9097: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x04F0A8 $9098: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x04F0A9 $9099: C-----  79 54 B0 ADC  $B054,Y
  0x04F0AC $909C: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x04F0AD $909D: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x04F0AE $909E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04F0AF $909F: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04F0B0 $90A0: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04F0B1 $90A1: C-----  55 AE    EOR  $AE,X
  0x04F0B3 $90A3: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04F0B4 $90A4: C-----  00       BRK  
  0x04F0B5 $90A5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F0B6 $90A6: C-----  00       BRK  
  0x04F0B7 $90A7: C-----  00       BRK  
  0x04F0B8 $90A8: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x04F0B9 $90A9: C-----  79 54 A1 ADC  $A154,Y
  0x04F0BC $90AC: C-----  00       BRK  
  0x04F0BD $90AD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F0BE $90AE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F0BF $90AF: C-----  00       BRK  
  0x04F0C0 $90B0: C-----  E4 50    CPX  $50
  0x04F0C2 $90B2: C-----  A0 51    LDY  #$51
  0x04F0C4 $90B4: C-----  00       BRK  
  0x04F0C5 $90B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F0C6 $90B6: C-----  00       BRK  
  0x04F0C7 $90B7: C-----  00       BRK  
  0x04F0C8 $90B8: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x04F0C9 $90B9: C-----  !!UNDEF $74  ; unknown opcode, treating as data
  0x04F0CA $90BA: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04F0CB $90BB: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04F0CC $90BC: C-----  00       BRK  
  0x04F0CD $90BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F0CE $90BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F0CF $90BF: C-----  00       BRK  
  0x04F0D0 $90C0: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04F0D1 $90C1: C-----  AA       TAX  
  0x04F0D2 $90C2: C-----  75 0B    ADC  $0B,X
  0x04F0D4 $90C4: C-----  EE 27 2A INC  $2A27
  0x04F0D7 $90C7: C-----  !!UNDEF $2B  ; unknown opcode, treating as data
  0x04F0D8 $90C8: C-----  2C 9E 2A BIT  $2A9E
  0x04F0DB $90CB: C-----  0D E4 E2 ORA  $E2E4
  0x04F0DE $90CE: C-----  E0 2A    CPX  #$2A
  0x04F0E0 $90D0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F0E1 $90D1: C-----  FE 7E FE INC  $FE7E,X
  0x04F0E4 $90D4: C-----  00       BRK  
  0x04F0E5 $90D5: C-----  00       BRK  
  0x04F0E6 $90D6: C-----  00       BRK  
  0x04F0E7 $90D7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04F0E8 $90D8: C-----  00       BRK  
  0x04F0E9 $90D9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F0EA $90DA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F0EB $90DB: C-----  FE 00 FF INC  $FF00,X
  0x04F0EE $90DE: C-----  00       BRK  
  0x04F0EF $90DF: C-----  0E 2B 0D ASL  $0D2B
  0x04F0F2 $90E2: C-----  0E 8F 00 ASL  $008F
  0x04F0F5 $90E5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F0F6 $90E6: C-----  00       BRK  
  0x04F0F7 $90E7: C-----  00       BRK  
  0x04F0F8 $90E8: C-----  2C 21 24 BIT  $2421
  0x04F0FB $90EB: C-----  E9 00    SBC  #$00
  0x04F0FD $90ED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F0FE $90EE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F0FF $90EF: C-----  00       BRK  
  0x04F100 $90F0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F101 $90F1: C-----  FE 7E FE INC  $FE7E,X
  0x04F104 $90F4: C-----  00       BRK  
  0x04F105 $90F5: C-----  00       BRK  
  0x04F106 $90F6: C-----  00       BRK  
  0x04F107 $90F7: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04F108 $90F8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F109 $90F9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F10A $90FA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F10B $90FB: C-----  FE 00 FF INC  $FF00,X
  0x04F10E $90FE: C-----  00       BRK  
  0x04F10F $90FF: C-----  0E 00 54 ASL  $5400
  0x04F112 $9102: C-----  A1 6A    LDA  ($6A,X)
  0x04F114 $9104: C-----  9D AE 55 STA  $55AE,X
  0x04F117 $9107: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04F118 $9108: C-----  00       BRK  
  0x04F119 $9109: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04F11A $910A: C-----  4C 00 22 JMP  $2200
  0x04F11D $910D: C-----  50 28    BVC  $9137
  0x04F11F $910F: C-----  B4 00    LDY  $00,X
  0x04F121 $9111: C-----  00       BRK  
  0x04F122 $9112: C-----  00       BRK  
  0x04F123 $9113: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F124 $9114: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F125 $9115: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F126 $9116: C-----  00       BRK  
  0x04F127 $9117: C-----  C6 00    DEC  $00
  0x04F129 $9119: C-----  DE 90 5E DEC  $5E90,X
  0x04F12C $911C: C-----  50 9E    BVC  $90BC
  0x04F12E $911E: C-----  50 1E    BVC  $913E
  0x04F130 $9120: C-----  55 AE    EOR  $AE,X
  0x04F132 $9122: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04F133 $9123: C-----  58       CLI  
  0x04F134 $9124: C-----  00       BRK  
  0x04F135 $9125: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F136 $9126: C-----  00       BRK  
  0x04F137 $9127: C-----  00       BRK  
  0x04F138 $9128: C-----  79 54 B1 ADC  $B154,Y
  0x04F13B $912B: C-----  4A       LSR  A
  0x04F13C $912C: C-----  00       BRK  
  0x04F13D $912D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F13E $912E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F13F $912F: C-----  00       BRK  
  0x04F140 $9130: C-----  C0 86    CPY  #$86
  0x04F142 $9132: C-----  40       RTI  
  0x04F143 $9133: C-----  86 00    STX  $00
  0x04F145 $9135: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F146 $9136: C-----  00       BRK  
  0x04F147 $9137: C-----  00       BRK  
  0x04F148 $9138: C-----  50 DE    BVC  $9118
  0x04F14A $913A: C-----  90 DE    BCC  $911A
  0x04F14C $913C: C-----  10 FF    BPL  $913D
  0x04F14E $913E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F14F $913F: C-----  00       BRK  
  0x04F150 $9140: C-----  00       BRK  
  0x04F151 $9141: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F152 $9142: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F153 $9143: C-----  00       BRK  
  0x04F154 $9144: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04F155 $9145: C-----  09 04    ORA  #$04
  0x04F157 $9147: C-----  00       BRK  
  0x04F158 $9148: C-----  00       BRK  
  0x04F159 $9149: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F15A $914A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F15B $914B: C-----  00       BRK  
  0x04F15C $914C: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04F15D $914D: C-----  09 04    ORA  #$04
  0x04F15F $914F: C-----  00       BRK  
  0x04F160 $9150: C-----  00       BRK  
  0x04F161 $9151: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F162 $9152: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F163 $9153: C-----  00       BRK  
  0x04F164 $9154: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04F165 $9155: C-----  05 07    ORA  $07
  0x04F167 $9157: C-----  00       BRK  
  0x04F168 $9158: C-----  00       BRK  
  0x04F169 $9159: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F16A $915A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F16B $915B: C-----  00       BRK  
  0x04F16C $915C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04F16D $915D: C-----  05 07    ORA  $07
  0x04F16F $915F: C-----  00       BRK  
  0x04F170 $9160: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F171 $9161: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F172 $9162: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F173 $9163: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F174 $9164: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F175 $9165: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F176 $9166: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F177 $9167: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F178 $9168: C-----  00       BRK  
  0x04F179 $9169: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F17A $916A: C-----  00       BRK  
  0x04F17B $916B: C-----  00       BRK  
  0x04F17C $916C: C-----  00       BRK  
  0x04F17D $916D: C-----  00       BRK  
  0x04F17E $916E: C-----  00       BRK  
  0x04F17F $916F: C-----  00       BRK  
  0x04F180 $9170: C-----  00       BRK  
  0x04F181 $9171: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04F182 $9172: C-----  A1 6A    LDA  ($6A,X)
  0x04F184 $9174: C-----  00       BRK  
  0x04F185 $9175: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F186 $9176: C-----  00       BRK  
  0x04F187 $9177: C-----  00       BRK  
  0x04F188 $9178: C-----  00       BRK  
  0x04F189 $9179: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04F18A $917A: C-----  4C 00 00 JMP  $0000
  0x04F18D $917D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F18E $917E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F18F $917F: C-----  00       BRK  
  0x04F190 $9180: C-----  00       BRK  
  0x04F191 $9181: C-----  !!UNDEF $52  ; unknown opcode, treating as data
  0x04F192 $9182: C-----  A0 40    LDY  #$40
  0x04F194 $9184: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04F195 $9185: C-----  A4 54    LDY  $54
  0x04F197 $9187: C-----  E4 00    CPX  $00
  0x04F199 $9189: C-----  01 0C    ORA  ($0C,X)
  0x04F19B $918B: C-----  20 27 77 JSR  $7727
  0x04F19E $918E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04F19F $918F: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04F1A0 $9190: C-----  00       BRK  
  0x04F1A1 $9191: C-----  10 65    BPL  $91F8
  0x04F1A3 $9193: C-----  08       PHP  
  0x04F1A4 $9194: C-----  ED 2B 2F SBC  $2F2B
  0x04F1A7 $9197: C-----  26 00    ROL  $00
  0x04F1A9 $9199: C-----  A9 88    LDA  #$88
  0x04F1AB $919B: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F1AC $919C: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x04F1AD $919D: C-----  E5 E4    SBC  $E4
  0x04F1AF $919F: C-----  21 FF    AND  ($FF,X)
  0x04F1B1 $91A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F1B2 $91A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F1B3 $91A3: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04F1B4 $91A4: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04F1B5 $91A5: C-----  !!UNDEF $E2  ; unknown opcode, treating as data
  0x04F1B6 $91A6: C-----  ED EF 00 SBC  $00EF
  0x04F1B9 $91A9: C-----  00       BRK  
  0x04F1BA $91AA: C-----  00       BRK  
  0x04F1BB $91AB: C-----  0D 0F 0F ORA  $0F0F
  0x04F1BE $91AE: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04F1BF $91AF: C-----  00       BRK  
  0x04F1C0 $91B0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F1C1 $91B1: C-----  86 40    STX  $40
  0x04F1C3 $91B3: C-----  86 C0    STX  $C0
  0x04F1C5 $91B5: C-----  46 80    LSR  $80
  0x04F1C7 $91B7: C-----  C6 90    DEC  $90
  0x04F1C9 $91B9: C-----  DE 90 5E DEC  $5E90,X
  0x04F1CC $91BC: C-----  90 DE    BCC  $919C
  0x04F1CE $91BE: C-----  50 5E    BVC  $921E
  0x04F1D0 $91C0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F1D1 $91C1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F1D2 $91C2: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x04F1D3 $91C3: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04F1D4 $91C4: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04F1D5 $91C5: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04F1D6 $91C6: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04F1D7 $91C7: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04F1D8 $91C8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F1D9 $91C9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F1DA $91CA: C-----  EE F5 FA INC  $FAF5
  0x04F1DD $91CD: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04F1DE $91CE: C-----  EA       NOP  
  0x04F1DF $91CF: C-----  FD FF 00 SBC  $00FF,X
  0x04F1E2 $91D2: C-----  AE 77 AB LDX  $AB77
  0x04F1E5 $91D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F1E6 $91D6: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04F1E7 $91D7: C-----  55 FF    EOR  $FF,X
  0x04F1E9 $91D9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F1EA $91DA: C-----  EA       NOP  
  0x04F1EB $91DB: C-----  DD EE FF CMP  $FFEE,X
  0x04F1EE $91DE: C-----  BA       TSX  
  0x04F1EF $91DF: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04F1F0 $91E0: C-----  FE 02 BE INC  $BE02,X
  0x04F1F3 $91E3: C-----  5E FA F6 LSR  $F6FA,X
  0x04F1F6 $91E6: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04F1F7 $91E7: C-----  56 FF    LSR  $FF,X
  0x04F1F9 $91E9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F1FA $91EA: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04F1FB $91EB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F1FC $91EC: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x04F1FD $91ED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F1FE $91EE: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x04F1FF $91EF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F200 $91F0: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x04F201 $91F1: C-----  BD AE 9F LDA  $9FAE,X
  0x04F204 $91F4: C-----  BA       TSX  
  0x04F205 $91F5: C-----  BD AA 9D LDA  $9DAA,X
  0x04F208 $91F8: C-----  FE DD FA INC  $FADD,X
  0x04F20B $91FB: C-----  FD EA DF SBC  $DFEA,X
  0x04F20E $91FE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F20F $91FF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F210 $9200: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F211 $9201: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F212 $9202: C-----  70 7F    BVS  $9283
  0x04F214 $9204: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x04F215 $9205: C-----  6D 76 6B ADC  $6B76
  0x04F218 $9208: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F219 $9209: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F21A $920A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F21B $920B: C-----  FD FE FF SBC  $FFFE,X
  0x04F21E $920E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F21F $920F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F220 $9210: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F221 $9211: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F222 $9212: C-----  00       BRK  
  0x04F223 $9213: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04F224 $9214: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04F225 $9215: C-----  55 AA    EOR  $AA,X
  0x04F227 $9217: C-----  55 FF    EOR  $FF,X
  0x04F229 $9219: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F22A $921A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F22B $921B: C-----  F5 AA    SBC  $AA,X
  0x04F22D $921D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F22E $921E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F22F $921F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F230 $9220: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F231 $9221: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04F232 $9222: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F233 $9223: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04F234 $9224: C-----  11 11    ORA  ($11),Y
  0x04F236 $9226: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F237 $9227: C-----  11 11    ORA  ($11),Y
  0x04F239 $9229: C-----  D1 FF    CMP  ($FF),Y
  0x04F23B $922B: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04F23C $922C: C-----  11 FF    ORA  ($FF),Y
  0x04F23E $922E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F23F $922F: C-----  !!UNDEF $93  ; unknown opcode, treating as data
  0x04F240 $9230: C-----  EA       NOP  
  0x04F241 $9231: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04F242 $9232: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04F243 $9233: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04F244 $9234: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x04F245 $9235: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F246 $9236: C-----  AA       TAX  
  0x04F247 $9237: C-----  55 BF    EOR  $BF,X
  0x04F249 $9239: C-----  F5 BE    SBC  $BE,X
  0x04F24B $923B: C-----  FD EE FF SBC  $FFEE,X
  0x04F24E $923E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F24F $923F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F250 $9240: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x04F251 $9241: C-----  7D 6B 7F ADC  $7F6B,X
  0x04F254 $9244: C-----  !!UNDEF $6B  ; unknown opcode, treating as data
  0x04F255 $9245: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F256 $9246: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04F257 $9247: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F258 $9248: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F259 $9249: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04F25A $924A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F25B $924B: C-----  F5 FF    SBC  $FF,X
  0x04F25D $924D: C-----  F5 FB    SBC  $FB,X
  0x04F25F $924F: C-----  F5 FF    SBC  $FF,X
  0x04F261 $9251: C-----  55 AB    EOR  $AB,X
  0x04F263 $9253: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F264 $9254: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x04F265 $9255: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F266 $9256: C-----  AE FD FF LDX  $FFFD
  0x04F269 $9259: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04F26A $925A: C-----  EE 55 FE INC  $FE55
  0x04F26D $925D: C-----  55 FB    EOR  $FB,X
  0x04F26F $925F: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04F270 $9260: C-----  00       BRK  
  0x04F271 $9261: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F272 $9262: C-----  00       BRK  
  0x04F273 $9263: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04F274 $9264: C-----  F8       SED  
  0x04F275 $9265: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F276 $9266: C-----  00       BRK  
  0x04F277 $9267: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F278 $9268: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F279 $9269: C-----  00       BRK  
  0x04F27A $926A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F27B $926B: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04F27C $926C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04F27D $926D: C-----  C0 FF    CPY  #$FF
  0x04F27F $926F: C-----  00       BRK  
  0x04F280 $9270: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F281 $9271: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F282 $9272: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F283 $9273: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F284 $9274: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F285 $9275: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F286 $9276: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F287 $9277: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F288 $9278: C-----  AA       TAX  
  0x04F289 $9279: C-----  55 AA    EOR  $AA,X
  0x04F28B $927B: C-----  55 AA    EOR  $AA,X
  0x04F28D $927D: C-----  55 AA    EOR  $AA,X
  0x04F28F $927F: C-----  55 FF    EOR  $FF,X
  0x04F291 $9281: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F292 $9282: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F293 $9283: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F294 $9284: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F295 $9285: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F296 $9286: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F297 $9287: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F298 $9288: C-----  AA       TAX  
  0x04F299 $9289: C-----  55 AA    EOR  $AA,X
  0x04F29B $928B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F29C $928C: C-----  00       BRK  
  0x04F29D $928D: C-----  00       BRK  
  0x04F29E $928E: C-----  00       BRK  
  0x04F29F $928F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F2A0 $9290: C-----  EA       NOP  
  0x04F2A1 $9291: C-----  DD FB 56 CMP  $56FB,X
  0x04F2A4 $9294: C-----  F8       SED  
  0x04F2A5 $9295: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04F2A6 $9296: C-----  A8       TAY  
  0x04F2A7 $9297: C-----  50 BE    BVC  $9257
  0x04F2A9 $9299: C-----  F5 AE    SBC  $AE,X
  0x04F2AB $929B: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04F2AC $929C: C-----  AC FC FC LDY  $FCFC
  0x04F2AF $929F: C-----  F0 E0    BEQ  $9281
  0x04F2B1 $92A1: C-----  C0 80    CPY  #$80
  0x04F2B3 $92A3: C-----  88       DEY  
  0x04F2B4 $92A4: C-----  !!UNDEF $DC  ; unknown opcode, treating as data
  0x04F2B5 $92A5: C-----  F8       SED  
  0x04F2B6 $92A6: C-----  F8       SED  
  0x04F2B7 $92A7: C-----  F0 A0    BEQ  $9249
  0x04F2B9 $92A9: C-----  40       RTI  
  0x04F2BA $92AA: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F2BB $92AB: C-----  00       BRK  
  0x04F2BC $92AC: C-----  88       DEY  
  0x04F2BD $92AD: C-----  50 A8    BVC  $9257
  0x04F2BF $92AF: C-----  50 07    BVC  $92B8
  0x04F2C1 $92B1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F2C2 $92B2: C-----  11 38    ORA  ($38),Y
  0x04F2C4 $92B4: C-----  3E 1F 1F ROL  $1F1F,X
  0x04F2C7 $92B7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04F2C8 $92B8: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04F2C9 $92B9: C-----  01 00    ORA  ($00,X)
  0x04F2CB $92BB: C-----  10 2A    BPL  $92E7
  0x04F2CD $92BD: C-----  15 0A    ORA  $0A,X
  0x04F2CF $92BF: C-----  15 EA    ORA  $EA,X
  0x04F2D1 $92C1: C-----  5D FB 57 EOR  $57FB,X
  0x04F2D4 $92C4: C-----  !!UNDEF $3A  ; unknown opcode, treating as data
  0x04F2D5 $92C5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04F2D6 $92C6: C-----  2A       ROL  A
  0x04F2D7 $92C7: C-----  15 BE    ORA  $BE,X
  0x04F2D9 $92C9: C-----  75 AE    ADC  $AE,X
  0x04F2DB $92CB: C-----  75 2A    ADC  $2A,X
  0x04F2DD $92CD: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04F2DE $92CE: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F2DF $92CF: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04F2E0 $92D0: C-----  F1 E3    SBC  ($E3),Y
  0x04F2E2 $92D2: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04F2E3 $92D3: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04F2E4 $92D4: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04F2E5 $92D5: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04F2E6 $92D6: C-----  F1 E1    SBC  ($E1),Y
  0x04F2E8 $92D8: C-----  A0 41    LDY  #$41
  0x04F2EA $92DA: C-----  A2 E3    LDX  #$E3
  0x04F2EC $92DC: C-----  00       BRK  
  0x04F2ED $92DD: C-----  00       BRK  
  0x04F2EE $92DE: C-----  00       BRK  
  0x04F2EF $92DF: C-----  E1 AE    SBC  ($AE,X)
  0x04F2F1 $92E1: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x04F2F2 $92E2: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04F2F3 $92E3: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F2F4 $92E4: C-----  01 01    ORA  ($01,X)
  0x04F2F6 $92E6: C-----  00       BRK  
  0x04F2F7 $92E7: C-----  05 EF    ORA  $EF
  0x04F2F9 $92E9: C-----  45 A6    EOR  $A6
  0x04F2FB $92EB: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04F2FC $92EC: C-----  01 01    ORA  ($01,X)
  0x04F2FE $92EE: C-----  05 05    ORA  $05
  0x04F300 $92F0: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04F301 $92F1: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04F302 $92F2: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04F303 $92F3: C-----  39 39 39 AND  $3939,Y
  0x04F306 $92F6: C-----  7D 7C 85 ADC  $857C,X
  0x04F309 $92F9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F30A $92FA: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04F30B $92FB: C-----  00       BRK  
  0x04F30C $92FC: C-----  00       BRK  
  0x04F30D $92FD: C-----  00       BRK  
  0x04F30E $92FE: C-----  00       BRK  
  0x04F30F $92FF: C-----  00       BRK  
  0x04F310 $9300: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04F311 $9301: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04F312 $9302: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04F313 $9303: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04F314 $9304: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04F315 $9305: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04F316 $9306: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04F317 $9307: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04F318 $9308: C-----  EA       NOP  
  0x04F319 $9309: C-----  DD EA DD CMP  $DDEA,X
  0x04F31C $930C: C-----  EA       NOP  
  0x04F31D $930D: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04F31E $930E: C-----  F0 FF    BEQ  $930F
  0x04F320 $9310: C-----  AA       TAX  
  0x04F321 $9311: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F322 $9312: C-----  AA       TAX  
  0x04F323 $9313: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04F324 $9314: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x04F325 $9315: C-----  55 AB    EOR  $AB,X
  0x04F327 $9317: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F328 $9318: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F329 $9319: C-----  D5 FF    CMP  $FF,X
  0x04F32B $931B: C-----  5D EE 55 EOR  $55EE,X
  0x04F32E $931E: C-----  EA       NOP  
  0x04F32F $931F: C-----  55 7F    EOR  $7F,X
  0x04F331 $9321: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F332 $9322: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F333 $9323: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F334 $9324: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F335 $9325: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F336 $9326: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F337 $9327: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F338 $9328: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04F339 $9329: C-----  F5 EB    SBC  $EB,X
  0x04F33B $932B: C-----  F5 EA    SBC  $EA,X
  0x04F33D $932D: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04F33E $932E: C-----  E8       INX  
  0x04F33F $932F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F340 $9330: C-----  0A       ASL  A
  0x04F341 $9331: C-----  0D 0B 07 ORA  $070B
  0x04F344 $9334: C-----  8A       TXA  
  0x04F345 $9335: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04F346 $9336: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04F347 $9337: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04F348 $9338: C-----  0E 05 0E ASL  $0E05
  0x04F34B $933B: C-----  0D 8A AF ORA  $AF8A
  0x04F34E $933E: C-----  00       BRK  
  0x04F34F $933F: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04F350 $9340: C-----  EA       NOP  
  0x04F351 $9341: C-----  5D FB 57 EOR  $57FB,X
  0x04F354 $9344: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04F355 $9345: C-----  95 8A    STA  $8A,X
  0x04F357 $9347: C-----  05 BE    ORA  $BE
  0x04F359 $9349: C-----  75 AE    ADC  $AE,X
  0x04F35B $934B: C-----  F5 AA    SBC  $AA,X
  0x04F35D $934D: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04F35E $934E: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04F35F $934F: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04F360 $9350: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04F361 $9351: C-----  56 BA    LSR  $BA,X
  0x04F363 $9353: C-----  D6 FA    DEC  $FA,X
  0x04F365 $9355: C-----  56 BA    LSR  $BA,X
  0x04F367 $9357: C-----  56 BB    LSR  $BB,X
  0x04F369 $9359: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F36A $935A: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04F36B $935B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F36C $935C: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x04F36D $935D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F36E $935E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F36F $935F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F370 $9360: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F371 $9361: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F372 $9362: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F373 $9363: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F374 $9364: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F375 $9365: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F376 $9366: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F377 $9367: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F378 $9368: C-----  AA       TAX  
  0x04F379 $9369: C-----  55 AA    EOR  $AA,X
  0x04F37B $936B: C-----  55 AA    EOR  $AA,X
  0x04F37D $936D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F37E $936E: C-----  00       BRK  
  0x04F37F $936F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F380 $9370: C-----  FE FE FE INC  $FEFE,X
  0x04F383 $9373: C-----  FE FE FE INC  $FEFE,X
  0x04F386 $9376: C-----  FE FE BB INC  $BBFE,X
  0x04F389 $9379: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04F38A $937A: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x04F38B $937B: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04F38C $937C: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x04F38D $937D: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04F38E $937E: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04F38F $937F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F390 $9380: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04F391 $9381: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04F392 $9382: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04F393 $9383: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04F394 $9384: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04F395 $9385: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04F396 $9386: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04F397 $9387: C-----  F1 8A    SBC  ($8A),Y
  0x04F399 $9389: C-----  45 82    EOR  $82
  0x04F39B $938B: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04F39C $938C: C-----  00       BRK  
  0x04F39D $938D: C-----  00       BRK  
  0x04F39E $938E: C-----  00       BRK  
  0x04F39F $938F: C-----  F1 FE    SBC  ($FE),Y
  0x04F3A1 $9391: C-----  FE 0E 5E INC  $5E0E,X
  0x04F3A4 $9394: C-----  FE F6 EE INC  $EEF6,X
  0x04F3A7 $9397: C-----  D6 FF    DEC  $FF,X
  0x04F3A9 $9399: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F3AA $939A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F3AB $939B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F3AC $939C: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04F3AD $939D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F3AE $939E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F3AF $939F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F3B0 $93A0: C-----  AE FE AE LDX  $AEFE
  0x04F3B3 $93A3: C-----  FE AE FE INC  $FEAE,X
  0x04F3B6 $93A6: C-----  AE FE FF LDX  $FFFE
  0x04F3B9 $93A9: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04F3BA $93AA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F3BB $93AB: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04F3BC $93AC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F3BD $93AD: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04F3BE $93AE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F3BF $93AF: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04F3C0 $93B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F3C1 $93B1: C-----  00       BRK  
  0x04F3C2 $93B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F3C3 $93B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F3C4 $93B4: C-----  00       BRK  
  0x04F3C5 $93B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F3C6 $93B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F3C7 $93B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F3C8 $93B8: C-----  00       BRK  
  0x04F3C9 $93B9: C-----  00       BRK  
  0x04F3CA $93BA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F3CB $93BB: C-----  00       BRK  
  0x04F3CC $93BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F3CD $93BD: C-----  00       BRK  
  0x04F3CE $93BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F3CF $93BF: C-----  00       BRK  
  0x04F3D0 $93C0: C-----  00       BRK  
  0x04F3D1 $93C1: C-----  00       BRK  
  0x04F3D2 $93C2: C-----  05 5A    ORA  $5A
  0x04F3D4 $93C4: C-----  AD 6A BF LDA  $BF6A
  0x04F3D7 $93C7: C-----  56 00    LSR  $00,X
  0x04F3D9 $93C9: C-----  A9 D8    LDA  #$D8
  0x04F3DB $93CB: C-----  A1 42    LDA  ($42,X)
  0x04F3DD $93CD: C-----  95 24    STA  $24,X
  0x04F3DF $93CF: C-----  81 9C    STA  ($9C,X)
  0x04F3E1 $93D1: C-----  69 33    ADC  #$33
  0x04F3E3 $93D3: C-----  !!UNDEF $4B  ; unknown opcode, treating as data
  0x04F3E4 $93D4: C-----  D1 DE    CMP  ($DE),Y
  0x04F3E6 $93D6: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04F3E7 $93D7: C-----  78       SEI  
  0x04F3E8 $93D8: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04F3E9 $93D9: C-----  !!UNDEF $34  ; unknown opcode, treating as data
  0x04F3EA $93DA: C-----  99 94 68 STA  $6894,Y
  0x04F3ED $93DD: C-----  F8       SED  
  0x04F3EE $93DE: C-----  0E C5 FF ASL  $FFC5
  0x04F3F1 $93E1: C-----  00       BRK  
  0x04F3F2 $93E2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F3F3 $93E3: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04F3F4 $93E4: C-----  F8       SED  
  0x04F3F5 $93E5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04F3F6 $93E6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F3F7 $93E7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F3F8 $93E8: C-----  00       BRK  
  0x04F3F9 $93E9: C-----  00       BRK  
  0x04F3FA $93EA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F3FB $93EB: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04F3FC $93EC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04F3FD $93ED: C-----  C0 FF    CPY  #$FF
  0x04F3FF $93EF: C-----  00       BRK  
  0x04F400 $93F0: C-----  FE FE FE INC  $FEFE,X
  0x04F403 $93F3: C-----  FE FE FE INC  $FEFE,X
  0x04F406 $93F6: C-----  FE FE AF INC  $AFFE,X
  0x04F409 $93F9: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04F40A $93FA: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04F40B $93FB: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04F40C $93FC: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04F40D $93FD: C-----  !!UNDEF $37  ; unknown opcode, treating as data
  0x04F40E $93FE: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04F40F $93FF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F410 $9400: C-----  00       BRK  
  0x04F411 $9401: C-----  00       BRK  
  0x04F412 $9402: C-----  00       BRK  
  0x04F413 $9403: C-----  00       BRK  
  0x04F414 $9404: C-----  00       BRK  
  0x04F415 $9405: C-----  00       BRK  
  0x04F416 $9406: C-----  00       BRK  
  0x04F417 $9407: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F418 $9408: C-----  00       BRK  
  0x04F419 $9409: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F41A $940A: C-----  00       BRK  
  0x04F41B $940B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F41C $940C: C-----  00       BRK  
  0x04F41D $940D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F41E $940E: C-----  00       BRK  
  0x04F41F $940F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F420 $9410: C-----  00       BRK  
  0x04F421 $9411: C-----  00       BRK  
  0x04F422 $9412: C-----  00       BRK  
  0x04F423 $9413: C-----  00       BRK  
  0x04F424 $9414: C-----  00       BRK  
  0x04F425 $9415: C-----  00       BRK  
  0x04F426 $9416: C-----  00       BRK  
  0x04F427 $9417: C-----  C6 00    DEC  $00
  0x04F429 $9419: C-----  DE 10 DE DEC  $DE10,X
  0x04F42C $941C: C-----  10 DE    BPL  $93FC
  0x04F42E $941E: C-----  10 DE    BPL  $93FE
  0x04F430 $9420: C-----  00       BRK  
  0x04F431 $9421: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F432 $9422: C-----  00       BRK  
  0x04F433 $9423: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F434 $9424: C-----  00       BRK  
  0x04F435 $9425: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F436 $9426: C-----  00       BRK  
  0x04F437 $9427: C-----  00       BRK  
  0x04F438 $9428: C-----  00       BRK  
  0x04F439 $9429: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F43A $942A: C-----  00       BRK  
  0x04F43B $942B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F43C $942C: C-----  00       BRK  
  0x04F43D $942D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F43E $942E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F43F $942F: C-----  00       BRK  
  0x04F440 $9430: C-----  00       BRK  
  0x04F441 $9431: C-----  C6 00    DEC  $00
  0x04F443 $9433: C-----  C6 00    DEC  $00
  0x04F445 $9435: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F446 $9436: C-----  00       BRK  
  0x04F447 $9437: C-----  00       BRK  
  0x04F448 $9438: C-----  10 DE    BPL  $9418
  0x04F44A $943A: C-----  10 DE    BPL  $941A
  0x04F44C $943C: C-----  10 FF    BPL  $943D
  0x04F44E $943E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F44F $943F: C-----  00       BRK  
  0x04F450 $9440: C-----  00       BRK  
  0x04F451 $9441: C-----  00       BRK  
  0x04F452 $9442: C-----  00       BRK  
  0x04F453 $9443: C-----  00       BRK  
  0x04F454 $9444: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04F455 $9445: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04F456 $9446: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04F457 $9447: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04F458 $9448: C-----  00       BRK  
  0x04F459 $9449: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F45A $944A: C-----  00       BRK  
  0x04F45B $944B: C-----  F0 07    BEQ  $9454
  0x04F45D $944D: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04F45E $944E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04F45F $944F: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04F460 $9450: C-----  00       BRK  
  0x04F461 $9451: C-----  00       BRK  
  0x04F462 $9452: C-----  00       BRK  
  0x04F463 $9453: C-----  00       BRK  
  0x04F464 $9454: C-----  E0 20    CPX  #$20
  0x04F466 $9456: C-----  20 2F 00 JSR  $002F
  0x04F469 $9459: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F46A $945A: C-----  00       BRK  
  0x04F46B $945B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04F46C $945C: C-----  E0 EF    CPX  #$EF
  0x04F46E $945E: C-----  E0 2F    CPX  #$2F
  0x04F470 $9460: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04F471 $9461: C-----  F0 00    BEQ  $9463
  0x04F473 $9463: C-----  F1 00    SBC  ($00),Y
  0x04F475 $9465: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F476 $9466: C-----  00       BRK  
  0x04F477 $9467: C-----  00       BRK  
  0x04F478 $9468: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04F479 $9469: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04F47A $946A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04F47B $946B: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04F47C $946C: C-----  00       BRK  
  0x04F47D $946D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F47E $946E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F47F $946F: C-----  00       BRK  
  0x04F480 $9470: C-----  20 0F 00 JSR  $000F
  0x04F483 $9473: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04F484 $9474: C-----  00       BRK  
  0x04F485 $9475: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F486 $9476: C-----  00       BRK  
  0x04F487 $9477: C-----  00       BRK  
  0x04F488 $9478: C-----  20 2F 20 JSR  $202F
  0x04F48B $947B: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04F48C $947C: C-----  00       BRK  
  0x04F48D $947D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F48E $947E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F48F $947F: C-----  00       BRK  
  0x04F490 $9480: C-----  00       BRK  
  0x04F491 $9481: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F492 $9482: C-----  00       BRK  
  0x04F493 $9483: C-----  F0 07    BEQ  $948C
  0x04F495 $9485: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04F496 $9486: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04F497 $9487: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04F498 $9488: C-----  00       BRK  
  0x04F499 $9489: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F49A $948A: C-----  00       BRK  
  0x04F49B $948B: C-----  F0 07    BEQ  $9494
  0x04F49D $948D: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04F49E $948E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04F49F $948F: C-----  !!UNDEF $F4  ; unknown opcode, treating as data
  0x04F4A0 $9490: C-----  00       BRK  
  0x04F4A1 $9491: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4A2 $9492: C-----  00       BRK  
  0x04F4A3 $9493: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04F4A4 $9494: C-----  E0 2F    CPX  #$2F
  0x04F4A6 $9496: C-----  20 2F 00 JSR  $002F
  0x04F4A9 $9499: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4AA $949A: C-----  00       BRK  
  0x04F4AB $949B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04F4AC $949C: C-----  E0 EF    CPX  #$EF
  0x04F4AE $949E: C-----  E0 2F    CPX  #$2F
  0x04F4B0 $94A0: C-----  00       BRK  
  0x04F4B1 $94A1: C-----  00       BRK  
  0x04F4B2 $94A2: C-----  00       BRK  
  0x04F4B3 $94A3: C-----  00       BRK  
  0x04F4B4 $94A4: C-----  00       BRK  
  0x04F4B5 $94A5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4B6 $94A6: C-----  00       BRK  
  0x04F4B7 $94A7: C-----  00       BRK  
  0x04F4B8 $94A8: C-----  00       BRK  
  0x04F4B9 $94A9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4BA $94AA: C-----  00       BRK  
  0x04F4BB $94AB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4BC $94AC: C-----  00       BRK  
  0x04F4BD $94AD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4BE $94AE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4BF $94AF: C-----  00       BRK  
  0x04F4C0 $94B0: C-----  00       BRK  
  0x04F4C1 $94B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4C2 $94B2: C-----  00       BRK  
  0x04F4C3 $94B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4C4 $94B4: C-----  00       BRK  
  0x04F4C5 $94B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4C6 $94B6: C-----  00       BRK  
  0x04F4C7 $94B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4C8 $94B8: C-----  00       BRK  
  0x04F4C9 $94B9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4CA $94BA: C-----  00       BRK  
  0x04F4CB $94BB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4CC $94BC: C-----  00       BRK  
  0x04F4CD $94BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4CE $94BE: C-----  00       BRK  
  0x04F4CF $94BF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4D0 $94C0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4D1 $94C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4D2 $94C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4D3 $94C3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4D4 $94C4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4D5 $94C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4D6 $94C6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4D7 $94C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4D8 $94C8: C-----  10 20    BPL  $94EA
  0x04F4DA $94CA: C-----  40       RTI  
  0x04F4DB $94CB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4DC $94CC: C-----  00       BRK  
  0x04F4DD $94CD: C-----  00       BRK  
  0x04F4DE $94CE: C-----  00       BRK  
  0x04F4DF $94CF: C-----  00       BRK  
  0x04F4E0 $94D0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4E1 $94D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4E2 $94D2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4E3 $94D3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4E4 $94D4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4E5 $94D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4E6 $94D6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4E7 $94D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4E8 $94D8: C-----  08       PHP  
  0x04F4E9 $94D9: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04F4EA $94DA: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04F4EB $94DB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F4EC $94DC: C-----  00       BRK  
  0x04F4ED $94DD: C-----  00       BRK  
  0x04F4EE $94DE: C-----  00       BRK  
  0x04F4EF $94DF: C-----  00       BRK  
  0x04F4F0 $94E0: C-----  D5 D2    CMP  $D2,X
  0x04F4F2 $94E2: C-----  !!UNDEF $D4  ; unknown opcode, treating as data
  0x04F4F3 $94E3: C-----  C8       INY  
  0x04F4F4 $94E4: C-----  D0 A0    BNE  $9486
  0x04F4F6 $94E6: C-----  40       RTI  
  0x04F4F7 $94E7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F4F8 $94E8: C-----  11 12    ORA  ($12),Y
  0x04F4FA $94EA: C-----  15 08    ORA  $08,X
  0x04F4FC $94EC: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x04F4FD $94ED: C-----  29 50    AND  #$50
  0x04F4FF $94EF: C-----  88       DEY  
  0x04F500 $94F0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F501 $94F1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F502 $94F2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F503 $94F3: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F504 $94F4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F505 $94F5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F506 $94F6: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F507 $94F7: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F508 $94F8: C-----  AC B0 B0 LDY  $B0B0
  0x04F50B $94FB: C-----  AA       TAX  
  0x04F50C $94FC: C-----  B4 A8    LDY  $A8,X
  0x04F50E $94FE: C-----  A6 B1    LDX  $B1
  0x04F510 $9500: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F511 $9501: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F512 $9502: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F513 $9503: C-----  FE F5 FF INC  $FFF5,X
  0x04F516 $9506: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04F517 $9507: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F518 $9508: C-----  00       BRK  
  0x04F519 $9509: C-----  00       BRK  
  0x04F51A $950A: C-----  00       BRK  
  0x04F51B $950B: C-----  01 0B    ORA  ($0B,X)
  0x04F51D $950D: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04F51E $950E: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04F51F $950F: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04F520 $9510: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F521 $9511: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04F522 $9512: C-----  39 F8 B8 AND  $B8F8,Y
  0x04F525 $9515: C-----  C0 F9    CPY  #$F9
  0x04F527 $9517: C-----  FD 0B 3F SBC  $3F0B,X
  0x04F52A $951A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F52B $951B: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F52C $951C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F52D $951D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F52E $951E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F52F $951F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F530 $9520: C-----  DD ED C1 CMP  $C1ED,X
  0x04F533 $9523: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04F534 $9524: C-----  F9 FE FC SBC  $FCFE,Y
  0x04F537 $9527: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F538 $9528: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04F539 $9529: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04F53A $952A: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04F53B $952B: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04F53C $952C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04F53D $952D: C-----  01 03    ORA  ($03,X)
  0x04F53F $952F: C-----  00       BRK  
  0x04F540 $9530: C-----  BD 99 E3 LDA  $E399,X
  0x04F543 $9533: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04F544 $9534: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04F545 $9535: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x04F546 $9536: C-----  08       PHP  
  0x04F547 $9537: C-----  3E FF FF ROL  $FFFF,X
  0x04F54A $953A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F54B $953B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F54C $953C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F54D $953D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F54E $953E: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04F54F $953F: C-----  C1 EF    CMP  ($EF,X)
  0x04F551 $9541: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04F552 $9542: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04F553 $9543: C-----  7E 68 F3 ROR  $F368,X
  0x04F556 $9546: C-----  E9 FB    SBC  #$FB
  0x04F558 $9548: C-----  50 E0    BVC  $952A
  0x04F55A $954A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04F55B $954B: C-----  F9 FF FF SBC  $FFFF,Y
  0x04F55E $954E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F55F $954F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F560 $9550: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F561 $9551: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F562 $9552: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F563 $9553: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F564 $9554: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04F565 $9555: C-----  !!UNDEF $8F  ; unknown opcode, treating as data
  0x04F566 $9556: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04F567 $9557: C-----  !!UNDEF $A3  ; unknown opcode, treating as data
  0x04F568 $9558: C-----  00       BRK  
  0x04F569 $9559: C-----  00       BRK  
  0x04F56A $955A: C-----  00       BRK  
  0x04F56B $955B: C-----  00       BRK  
  0x04F56C $955C: C-----  40       RTI  
  0x04F56D $955D: C-----  F0 F0    BEQ  $954F
  0x04F56F $955F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04F570 $9560: C-----  F9 F7 D3 SBC  $D3F7,Y
  0x04F573 $9563: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04F574 $9564: C-----  E5 CA    SBC  $CA
  0x04F576 $9566: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04F577 $9567: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04F578 $9568: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F579 $9569: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F57A $956A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F57B $956B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F57C $956C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F57D $956D: C-----  F5 C0    SBC  $C0,X
  0x04F57F $956F: C-----  40       RTI  
  0x04F580 $9570: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04F581 $9571: C-----  !!UNDEF $A3  ; unknown opcode, treating as data
  0x04F582 $9572: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04F583 $9573: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04F584 $9574: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F585 $9575: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F586 $9576: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F587 $9577: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F588 $9578: C-----  F8       SED  
  0x04F589 $9579: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04F58A $957A: C-----  D0 E0    BNE  $955C
  0x04F58C $957C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F58D $957D: C-----  00       BRK  
  0x04F58E $957E: C-----  00       BRK  
  0x04F58F $957F: C-----  00       BRK  
  0x04F590 $9580: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F591 $9581: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F592 $9582: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F593 $9583: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F594 $9584: C-----  FE FC FF INC  $FFFC,X
  0x04F597 $9587: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04F598 $9588: C-----  00       BRK  
  0x04F599 $9589: C-----  00       BRK  
  0x04F59A $958A: C-----  00       BRK  
  0x04F59B $958B: C-----  00       BRK  
  0x04F59C $958C: C-----  01 03    ORA  ($03,X)
  0x04F59E $958E: C-----  01 07    ORA  ($07,X)
  0x04F5A0 $9590: C-----  FE F5 ED INC  $EDF5,X
  0x04F5A3 $9593: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04F5A4 $9594: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04F5A5 $9595: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04F5A6 $9596: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x04F5A7 $9597: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04F5A8 $9598: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F5A9 $9599: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04F5AA $959A: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04F5AB $959B: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04F5AC $959C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F5AD $959D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F5AE $959E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F5AF $959F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F5B0 $95A0: C-----  FD FF FF SBC  $FFFF,X
  0x04F5B3 $95A3: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04F5B4 $95A4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F5B5 $95A5: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04F5B6 $95A6: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04F5B7 $95A7: C-----  !!UNDEF $D2  ; unknown opcode, treating as data
  0x04F5B8 $95A8: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F5B9 $95A9: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F5BA $95AA: C-----  05 0F    ORA  $0F
  0x04F5BC $95AC: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04F5BD $95AD: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04F5BE $95AE: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04F5BF $95AF: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04F5C0 $95B0: C-----  90 A7    BCC  $9559
  0x04F5C2 $95B2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04F5C3 $95B3: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04F5C4 $95B4: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x04F5C5 $95B5: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04F5C6 $95B6: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04F5C7 $95B7: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04F5C8 $95B8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F5C9 $95B9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F5CA $95BA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F5CB $95BB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F5CC $95BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F5CD $95BD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F5CE $95BE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F5CF $95BF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F5D0 $95C0: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04F5D1 $95C1: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04F5D2 $95C2: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04F5D3 $95C3: C-----  D1 AB    CMP  ($AB),Y
  0x04F5D5 $95C5: C-----  D5 EA    CMP  $EA,X
  0x04F5D7 $95C7: C-----  86 50    STX  $50
  0x04F5D9 $95C9: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04F5DA $95CA: C-----  F8       SED  
  0x04F5DB $95CB: C-----  FE FC FA INC  $FAFC,X
  0x04F5DE $95CE: C-----  F5 FF    SBC  $FF,X
  0x04F5E0 $95D0: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04F5E1 $95D1: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04F5E2 $95D2: C-----  F8       SED  
  0x04F5E3 $95D3: C-----  D5 A8    CMP  $A8,X
  0x04F5E5 $95D5: C-----  D6 EE    DEC  $EE,X
  0x04F5E7 $95D7: C-----  86 F8    STX  $F8
  0x04F5E9 $95D9: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04F5EA $95DA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F5EB $95DB: C-----  FE FF FF INC  $FFFF,X
  0x04F5EE $95DE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F5EF $95DF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F5F0 $95E0: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04F5F1 $95E1: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04F5F2 $95E2: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04F5F3 $95E3: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04F5F4 $95E4: C-----  FE FF FF INC  $FFFF,X
  0x04F5F7 $95E7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F5F8 $95E8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F5F9 $95E9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F5FA $95EA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F5FB $95EB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F5FC $95EC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F5FD $95ED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F5FE $95EE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F5FF $95EF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F600 $95F0: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04F601 $95F1: C-----  !!UNDEF $4F  ; unknown opcode, treating as data
  0x04F602 $95F2: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04F603 $95F3: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04F604 $95F4: C-----  !!UNDEF $17  ; unknown opcode, treating as data
  0x04F605 $95F5: C-----  C1 AB    CMP  ($AB,X)
  0x04F607 $95F7: C-----  C1 A0    CMP  ($A0,X)
  0x04F609 $95F9: C-----  F0 E0    BEQ  $95DB
  0x04F60B $95FB: C-----  A0 E8    LDY  #$E8
  0x04F60D $95FD: C-----  FE FC FE INC  $FEFC,X
  0x04F610 $9600: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F611 $9601: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F612 $9602: C-----  EE 7E 33 INC  $337E
  0x04F615 $9605: C-----  00       BRK  
  0x04F616 $9606: C-----  55 0A    EOR  $0A,X
  0x04F618 $9608: C-----  00       BRK  
  0x04F619 $9609: C-----  00       BRK  
  0x04F61A $960A: C-----  11 FF    ORA  ($FF),Y
  0x04F61C $960C: C-----  EE 00 00 INC  $0000
  0x04F61F $960F: C-----  25 FF    AND  $FF
  0x04F621 $9611: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F622 $9612: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F623 $9613: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F624 $9614: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F625 $9615: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F626 $9616: C-----  00       BRK  
  0x04F627 $9617: C-----  00       BRK  
  0x04F628 $9618: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F629 $9619: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F62A $961A: C-----  00       BRK  
  0x04F62B $961B: C-----  00       BRK  
  0x04F62C $961C: C-----  00       BRK  
  0x04F62D $961D: C-----  00       BRK  
  0x04F62E $961E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F62F $961F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F630 $9620: C-----  !!UNDEF $54  ; unknown opcode, treating as data
  0x04F631 $9621: C-----  00       BRK  
  0x04F632 $9622: C-----  00       BRK  
  0x04F633 $9623: C-----  98       TYA  
  0x04F634 $9624: C-----  C5 22    CMP  $22
  0x04F636 $9626: C-----  00       BRK  
  0x04F637 $9627: C-----  00       BRK  
  0x04F638 $9628: C-----  01 FF    ORA  ($FF,X)
  0x04F63A $962A: C-----  00       BRK  
  0x04F63B $962B: C-----  21 10    AND  ($10,X)
  0x04F63D $962D: C-----  94 FF    STY  $FF,X
  0x04F63F $962F: C-----  00       BRK  
  0x04F640 $9630: C-----  00       BRK  
  0x04F641 $9631: C-----  00       BRK  
  0x04F642 $9632: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F643 $9633: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F644 $9634: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F645 $9635: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F646 $9636: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F647 $9637: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F648 $9638: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F649 $9639: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F64A $963A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F64B $963B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F64C $963C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F64D $963D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F64E $963E: C-----  00       BRK  
  0x04F64F $963F: C-----  00       BRK  
  0x04F650 $9640: C-----  00       BRK  
  0x04F651 $9641: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04F652 $9642: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F653 $9643: C-----  70 60    BVS  $96A5
  0x04F655 $9645: C-----  60       RTS  
  0x04F656 $9646: C-----  60       RTS  
  0x04F657 $9647: C-----  60       RTS  
  0x04F658 $9648: C-----  00       BRK  
  0x04F659 $9649: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04F65A $964A: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F65B $964B: C-----  70 60    BVS  $96AD
  0x04F65D $964D: C-----  60       RTS  
  0x04F65E $964E: C-----  60       RTS  
  0x04F65F $964F: C-----  60       RTS  
  0x04F660 $9650: C-----  00       BRK  
  0x04F661 $9651: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F662 $9652: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F663 $9653: C-----  00       BRK  
  0x04F664 $9654: C-----  00       BRK  
  0x04F665 $9655: C-----  00       BRK  
  0x04F666 $9656: C-----  00       BRK  
  0x04F667 $9657: C-----  00       BRK  
  0x04F668 $9658: C-----  00       BRK  
  0x04F669 $9659: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F66A $965A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F66B $965B: C-----  00       BRK  
  0x04F66C $965C: C-----  00       BRK  
  0x04F66D $965D: C-----  00       BRK  
  0x04F66E $965E: C-----  00       BRK  
  0x04F66F $965F: C-----  00       BRK  
  0x04F670 $9660: C-----  60       RTS  
  0x04F671 $9661: C-----  60       RTS  
  0x04F672 $9662: C-----  60       RTS  
  0x04F673 $9663: C-----  60       RTS  
  0x04F674 $9664: C-----  60       RTS  
  0x04F675 $9665: C-----  60       RTS  
  0x04F676 $9666: C-----  60       RTS  
  0x04F677 $9667: C-----  60       RTS  
  0x04F678 $9668: C-----  60       RTS  
  0x04F679 $9669: C-----  60       RTS  
  0x04F67A $966A: C-----  60       RTS  
  0x04F67B $966B: C-----  60       RTS  
  0x04F67C $966C: C-----  60       RTS  
  0x04F67D $966D: C-----  60       RTS  
  0x04F67E $966E: C-----  60       RTS  
  0x04F67F $966F: C-----  60       RTS  
  0x04F680 $9670: C-----  00       BRK  
  0x04F681 $9671: C-----  00       BRK  
  0x04F682 $9672: C-----  00       BRK  
  0x04F683 $9673: C-----  00       BRK  
  0x04F684 $9674: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F685 $9675: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F686 $9676: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F687 $9677: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F688 $9678: C-----  00       BRK  
  0x04F689 $9679: C-----  00       BRK  
  0x04F68A $967A: C-----  00       BRK  
  0x04F68B $967B: C-----  00       BRK  
  0x04F68C $967C: C-----  00       BRK  
  0x04F68D $967D: C-----  00       BRK  
  0x04F68E $967E: C-----  00       BRK  
  0x04F68F $967F: C-----  00       BRK  
  0x04F690 $9680: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F691 $9681: C-----  00       BRK  
  0x04F692 $9682: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F693 $9683: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F694 $9684: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F695 $9685: C-----  00       BRK  
  0x04F696 $9686: C-----  00       BRK  
  0x04F697 $9687: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F698 $9688: C-----  00       BRK  
  0x04F699 $9689: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F69A $968A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F69B $968B: C-----  00       BRK  
  0x04F69C $968C: C-----  00       BRK  
  0x04F69D $968D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F69E $968E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F69F $968F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6A0 $9690: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6A1 $9691: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6A2 $9692: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6A3 $9693: C-----  00       BRK  
  0x04F6A4 $9694: C-----  00       BRK  
  0x04F6A5 $9695: C-----  00       BRK  
  0x04F6A6 $9696: C-----  00       BRK  
  0x04F6A7 $9697: C-----  00       BRK  
  0x04F6A8 $9698: C-----  00       BRK  
  0x04F6A9 $9699: C-----  00       BRK  
  0x04F6AA $969A: C-----  00       BRK  
  0x04F6AB $969B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6AC $969C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6AD $969D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6AE $969E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6AF $969F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6B0 $96A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6B1 $96A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6B2 $96A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6B3 $96A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6B4 $96A4: C-----  00       BRK  
  0x04F6B5 $96A5: C-----  00       BRK  
  0x04F6B6 $96A6: C-----  00       BRK  
  0x04F6B7 $96A7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6B8 $96A8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6B9 $96A9: C-----  00       BRK  
  0x04F6BA $96AA: C-----  00       BRK  
  0x04F6BB $96AB: C-----  00       BRK  
  0x04F6BC $96AC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6BD $96AD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6BE $96AE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6BF $96AF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6C0 $96B0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6C1 $96B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6C2 $96B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6C3 $96B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6C4 $96B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6C5 $96B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6C6 $96B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6C7 $96B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6C8 $96B8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6C9 $96B9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6CA $96BA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6CB $96BB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6CC $96BC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6CD $96BD: C-----  00       BRK  
  0x04F6CE $96BE: C-----  00       BRK  
  0x04F6CF $96BF: C-----  00       BRK  
  0x04F6D0 $96C0: C-----  70 7F    BVS  $9741
  0x04F6D2 $96C2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04F6D3 $96C3: C-----  00       BRK  
  0x04F6D4 $96C4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6D5 $96C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6D6 $96C6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6D7 $96C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6D8 $96C8: C-----  70 7F    BVS  $9749
  0x04F6DA $96CA: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04F6DB $96CB: C-----  00       BRK  
  0x04F6DC $96CC: C-----  00       BRK  
  0x04F6DD $96CD: C-----  00       BRK  
  0x04F6DE $96CE: C-----  00       BRK  
  0x04F6DF $96CF: C-----  00       BRK  
  0x04F6E0 $96D0: C-----  00       BRK  
  0x04F6E1 $96D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6E2 $96D2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6E3 $96D3: C-----  00       BRK  
  0x04F6E4 $96D4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6E5 $96D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6E6 $96D6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6E7 $96D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6E8 $96D8: C-----  00       BRK  
  0x04F6E9 $96D9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6EA $96DA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F6EB $96DB: C-----  00       BRK  
  0x04F6EC $96DC: C-----  00       BRK  
  0x04F6ED $96DD: C-----  00       BRK  
  0x04F6EE $96DE: C-----  00       BRK  
  0x04F6EF $96DF: C-----  00       BRK  
  0x04F6F0 $96E0: C-----  EE 45 C3 INC  $C345
  0x04F6F3 $96E3: C-----  !!UNDEF $47  ; unknown opcode, treating as data
  0x04F6F4 $96E4: C-----  !!UNDEF $C2  ; unknown opcode, treating as data
  0x04F6F5 $96E5: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04F6F6 $96E6: C-----  00       BRK  
  0x04F6F7 $96E7: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04F6F8 $96E8: C-----  AA       TAX  
  0x04F6F9 $96E9: C-----  65 86    ADC  $86
  0x04F6FB $96EB: C-----  C5 86    CMP  $86
  0x04F6FD $96ED: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04F6FE $96EE: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04F6FF $96EF: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04F700 $96F0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F701 $96F1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F702 $96F2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F703 $96F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F704 $96F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F705 $96F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F706 $96F6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F707 $96F7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F708 $96F8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F709 $96F9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F70A $96FA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F70B $96FB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F70C $96FC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F70D $96FD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F70E $96FE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F70F $96FF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F710 $9700: C-----  00       BRK  
  0x04F711 $9701: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04F712 $9702: C-----  FE 0E 06 INC  $060E,X
  0x04F715 $9705: C-----  06 06    ASL  $06
  0x04F717 $9707: C-----  06 00    ASL  $00
  0x04F719 $9709: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04F71A $970A: C-----  FE 0E 06 INC  $060E,X
  0x04F71D $970D: C-----  06 06    ASL  $06
  0x04F71F $970F: C-----  06 FF    ASL  $FF
  0x04F721 $9711: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F722 $9712: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x04F723 $9713: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x04F724 $9714: C-----  BA       TSX  
  0x04F725 $9715: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04F726 $9716: C-----  AA       TAX  
  0x04F727 $9717: C-----  95 FF    STA  $FF,X
  0x04F729 $9719: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F72A $971A: C-----  EE F5 EA INC  $EAF5
  0x04F72D $971D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F72E $971E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F72F $971F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F730 $9720: C-----  06 06    ASL  $06
  0x04F732 $9722: C-----  06 06    ASL  $06
  0x04F734 $9724: C-----  06 06    ASL  $06
  0x04F736 $9726: C-----  06 06    ASL  $06
  0x04F738 $9728: C-----  06 06    ASL  $06
  0x04F73A $972A: C-----  06 06    ASL  $06
  0x04F73C $972C: C-----  06 06    ASL  $06
  0x04F73E $972E: C-----  06 06    ASL  $06
  0x04F740 $9730: C-----  00       BRK  
  0x04F741 $9731: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F742 $9732: C-----  75 76    ADC  $76,X
  0x04F744 $9734: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04F745 $9735: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F746 $9736: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04F747 $9737: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F748 $9738: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F749 $9739: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F74A $973A: C-----  EA       NOP  
  0x04F74B $973B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F74C $973C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F74D $973D: C-----  ED FA ED SBC  $EDFA
  0x04F750 $9740: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F751 $9741: C-----  00       BRK  
  0x04F752 $9742: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04F753 $9743: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04F754 $9744: C-----  EA       NOP  
  0x04F755 $9745: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04F756 $9746: C-----  AA       TAX  
  0x04F757 $9747: C-----  45 FF    EOR  $FF
  0x04F759 $9749: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F75A $974A: C-----  AE F5 AA LDX  $AAF5
  0x04F75D $974D: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04F75E $974E: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04F75F $974F: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04F760 $9750: C-----  FE 02 FA INC  $FA02,X
  0x04F763 $9753: C-----  56 FA    LSR  $FA,X
  0x04F765 $9755: C-----  FE AA 56 INC  $56AA,X
  0x04F768 $9758: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F769 $9759: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F76A $975A: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04F76B $975B: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04F76C $975C: C-----  !!UNDEF $AB  ; unknown opcode, treating as data
  0x04F76D $975D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F76E $975E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F76F $975F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F770 $9760: C-----  00       BRK  
  0x04F771 $9761: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F772 $9762: C-----  55 AA    EOR  $AA,X
  0x04F774 $9764: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F775 $9765: C-----  F5 AF    SBC  $AF,X
  0x04F777 $9767: C-----  55 FF    EOR  $FF,X
  0x04F779 $9769: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F77A $976A: C-----  AA       TAX  
  0x04F77B $976B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F77C $976C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F77D $976D: C-----  5D BA D7 EOR  $D7BA,X
  0x04F780 $9770: C-----  00       BRK  
  0x04F781 $9771: C-----  FE 56 AE INC  $AE56,X
  0x04F784 $9774: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04F785 $9775: C-----  F6 FA    INC  $FA,X
  0x04F787 $9777: C-----  56 FF    LSR  $FF,X
  0x04F789 $9779: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F78A $977A: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04F78B $977B: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F78C $977C: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F78D $977D: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04F78E $977E: C-----  !!UNDEF $BB  ; unknown opcode, treating as data
  0x04F78F $977F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F790 $9780: C-----  0E FE FC ASL  $FCFE
  0x04F793 $9783: C-----  00       BRK  
  0x04F794 $9784: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F795 $9785: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F796 $9786: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F797 $9787: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F798 $9788: C-----  0E FE FC ASL  $FCFE
  0x04F79B $978B: C-----  00       BRK  
  0x04F79C $978C: C-----  00       BRK  
  0x04F79D $978D: C-----  00       BRK  
  0x04F79E $978E: C-----  00       BRK  
  0x04F79F $978F: C-----  00       BRK  
  0x04F7A0 $9790: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x04F7A1 $9791: C-----  7D 5E 7F ADC  $7F5E,X
  0x04F7A4 $9794: C-----  !!UNDEF $5A  ; unknown opcode, treating as data
  0x04F7A5 $9795: C-----  !!UNDEF $6F  ; unknown opcode, treating as data
  0x04F7A6 $9796: C-----  58       CLI  
  0x04F7A7 $9797: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F7A8 $9798: C-----  FE ED FA INC  $FAED,X
  0x04F7AB $979B: C-----  ED FA FF SBC  $FFFA
  0x04F7AE $979E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F7AF $979F: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F7B0 $97A0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F7B1 $97A1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F7B2 $97A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F7B3 $97A3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F7B4 $97A4: C-----  00       BRK  
  0x04F7B5 $97A5: C-----  00       BRK  
  0x04F7B6 $97A6: C-----  00       BRK  
  0x04F7B7 $97A7: C-----  00       BRK  
  0x04F7B8 $97A8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F7B9 $97A9: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F7BA $97AA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F7BB $97AB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F7BC $97AC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F7BD $97AD: C-----  00       BRK  
  0x04F7BE $97AE: C-----  00       BRK  
  0x04F7BF $97AF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F7C0 $97B0: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04F7C1 $97B1: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04F7C2 $97B2: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04F7C3 $97B3: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04F7C4 $97B4: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04F7C5 $97B5: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04F7C6 $97B6: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04F7C7 $97B7: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04F7C8 $97B8: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04F7C9 $97B9: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04F7CA $97BA: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04F7CB $97BB: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04F7CC $97BC: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04F7CD $97BD: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04F7CE $97BE: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04F7CF $97BF: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04F7D0 $97C0: C-----  EA       NOP  
  0x04F7D1 $97C1: C-----  5D FB 57 EOR  $57FB,X
  0x04F7D4 $97C4: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04F7D5 $97C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F7D6 $97C6: C-----  00       BRK  
  0x04F7D7 $97C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F7D8 $97C8: C-----  BE 75 AE LDX  $AE75,Y
  0x04F7DB $97CB: C-----  F5 AA    SBC  $AA,X
  0x04F7DD $97CD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F7DE $97CE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F7DF $97CF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F7E0 $97D0: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04F7E1 $97D1: C-----  56 BA    LSR  $BA,X
  0x04F7E3 $97D3: C-----  D6 DA    DEC  $DA,X
  0x04F7E5 $97D5: C-----  F6 1A    INC  $1A,X
  0x04F7E7 $97D7: C-----  FE BB FF INC  $FFBB,X
  0x04F7EA $97DA: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04F7EB $97DB: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F7EC $97DC: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04F7ED $97DD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F7EE $97DE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F7EF $97DF: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F7F0 $97E0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F7F1 $97E1: C-----  FE FD FB INC  $FBFD,X
  0x04F7F4 $97E4: C-----  F6 EC    INC  $EC,X
  0x04F7F6 $97E6: C-----  D9 B3 00 CMP  $00B3,Y
  0x04F7F9 $97E9: C-----  00       BRK  
  0x04F7FA $97EA: C-----  01 03    ORA  ($03,X)
  0x04F7FC $97EC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04F7FD $97ED: C-----  0E 1C 38 ASL  $381C
  0x04F800 $97F0: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x04F801 $97F1: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04F802 $97F2: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x04F803 $97F3: C-----  !!UNDEF $97  ; unknown opcode, treating as data
  0x04F804 $97F4: C-----  !!UNDEF $57  ; unknown opcode, treating as data
  0x04F805 $97F5: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04F806 $97F6: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04F807 $97F7: C-----  D6 70    DEC  $70,X
  0x04F809 $97F9: C-----  E0 D0    CPX  #$D0
  0x04F80B $97FB: C-----  90 10    BCC  $980D
  0x04F80D $97FD: C-----  10 10    BPL  $980F
  0x04F80F $97FF: C-----  10 00    BPL  $9801
  0x04F811 $9801: C-----  00       BRK  
  0x04F812 $9802: C-----  00       BRK  
  0x04F813 $9803: C-----  00       BRK  
  0x04F814 $9804: C-----  00       BRK  
  0x04F815 $9805: C-----  00       BRK  
  0x04F816 $9806: C-----  00       BRK  
  0x04F817 $9807: C-----  00       BRK  
  0x04F818 $9808: C-----  00       BRK  
  0x04F819 $9809: C-----  00       BRK  
  0x04F81A $980A: C-----  00       BRK  
  0x04F81B $980B: C-----  00       BRK  
  0x04F81C $980C: C-----  00       BRK  
  0x04F81D $980D: C-----  00       BRK  
  0x04F81E $980E: C-----  00       BRK  
  0x04F81F $980F: C-----  00       BRK  
  0x04F820 $9810: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F821 $9811: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F822 $9812: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F823 $9813: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F824 $9814: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F825 $9815: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F826 $9816: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F827 $9817: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F828 $9818: C-----  00       BRK  
  0x04F829 $9819: C-----  00       BRK  
  0x04F82A $981A: C-----  00       BRK  
  0x04F82B $981B: C-----  00       BRK  
  0x04F82C $981C: C-----  00       BRK  
  0x04F82D $981D: C-----  00       BRK  
  0x04F82E $981E: C-----  00       BRK  
  0x04F82F $981F: C-----  00       BRK  
  0x04F830 $9820: C-----  D1 D1    CMP  ($D1),Y
  0x04F832 $9822: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F833 $9823: C-----  !!UNDEF $9B  ; unknown opcode, treating as data
  0x04F834 $9824: C-----  FD F3 FF SBC  $FFF3,X
  0x04F837 $9827: C-----  !!UNDEF $9F  ; unknown opcode, treating as data
  0x04F838 $9828: C-----  D1 F1    CMP  ($F1),Y
  0x04F83A $982A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F83B $982B: C-----  B1 D3    LDA  ($D3),Y
  0x04F83D $982D: C-----  DD FF 9B CMP  $9BFF,X
  0x04F840 $9830: C-----  00       BRK  
  0x04F841 $9831: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F842 $9832: C-----  C0 E0    CPY  #$E0
  0x04F844 $9834: C-----  F0 F8    BEQ  $982E
  0x04F846 $9836: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04F847 $9837: C-----  FE 00 00 INC  $0000,X
  0x04F84A $983A: C-----  00       BRK  
  0x04F84B $983B: C-----  00       BRK  
  0x04F84C $983C: C-----  00       BRK  
  0x04F84D $983D: C-----  00       BRK  
  0x04F84E $983E: C-----  00       BRK  
  0x04F84F $983F: C-----  00       BRK  
  0x04F850 $9840: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04F851 $9841: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F852 $9842: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F853 $9843: C-----  01 01    ORA  ($01,X)
  0x04F855 $9845: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F856 $9846: C-----  00       BRK  
  0x04F857 $9847: C-----  00       BRK  
  0x04F858 $9848: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04F859 $9849: C-----  3E 1E 1F ROL  $1F1E,X
  0x04F85C $984C: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04F85D $984D: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04F85E $984E: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04F85F $984F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F860 $9850: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F861 $9851: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F862 $9852: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F863 $9853: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F864 $9854: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F865 $9855: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F866 $9856: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04F867 $9857: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F868 $9858: C-----  00       BRK  
  0x04F869 $9859: C-----  00       BRK  
  0x04F86A $985A: C-----  00       BRK  
  0x04F86B $985B: C-----  00       BRK  
  0x04F86C $985C: C-----  00       BRK  
  0x04F86D $985D: C-----  C0 3F    CPY  #$3F
  0x04F86F $985F: C-----  C0 00    CPY  #$00
  0x04F871 $9861: C-----  00       BRK  
  0x04F872 $9862: C-----  00       BRK  
  0x04F873 $9863: C-----  00       BRK  
  0x04F874 $9864: C-----  00       BRK  
  0x04F875 $9865: C-----  00       BRK  
  0x04F876 $9866: C-----  00       BRK  
  0x04F877 $9867: C-----  00       BRK  
  0x04F878 $9868: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F879 $9869: C-----  01 00    ORA  ($00,X)
  0x04F87B $986B: C-----  00       BRK  
  0x04F87C $986C: C-----  00       BRK  
  0x04F87D $986D: C-----  00       BRK  
  0x04F87E $986E: C-----  00       BRK  
  0x04F87F $986F: C-----  00       BRK  
  0x04F880 $9870: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F881 $9871: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04F882 $9872: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04F883 $9873: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04F884 $9874: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04F885 $9875: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04F886 $9876: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04F887 $9877: C-----  01 E0    ORA  ($E0,X)
  0x04F889 $9879: C-----  E0 F0    CPX  #$F0
  0x04F88B $987B: C-----  F0 78    BEQ  $98F5
  0x04F88D $987D: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04F88E $987E: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x04F88F $987F: C-----  18       CLC  
  0x04F890 $9880: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04F891 $9881: C-----  DD FF BF CMP  $BFFF,X
  0x04F894 $9884: C-----  D1 FF    CMP  ($FF),Y
  0x04F896 $9886: C-----  91 91    STA  ($91),Y
  0x04F898 $9888: C-----  FD F9 FF SBC  $FFF9,X
  0x04F89B $988B: C-----  B1 D1    LDA  ($D1),Y
  0x04F89D $988D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F89E $988E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F89F $988F: C-----  91 FF    STA  ($FF),Y
  0x04F8A1 $9891: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F8A2 $9892: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F8A3 $9893: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F8A4 $9894: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F8A5 $9895: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F8A6 $9896: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04F8A7 $9897: C-----  FE 00 00 INC  $0000,X
  0x04F8AA $989A: C-----  00       BRK  
  0x04F8AB $989B: C-----  00       BRK  
  0x04F8AC $989C: C-----  00       BRK  
  0x04F8AD $989D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F8AE $989E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04F8AF $989F: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F8B0 $98A0: C-----  11 11    ORA  ($11),Y
  0x04F8B2 $98A2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F8B3 $98A3: C-----  !!UNDEF $5B  ; unknown opcode, treating as data
  0x04F8B4 $98A4: C-----  FD 73 FF SBC  $FF73,X
  0x04F8B7 $98A7: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04F8B8 $98A8: C-----  11 B1    ORA  ($B1),Y
  0x04F8BA $98AA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F8BB $98AB: C-----  B1 5B    LDA  ($5B),Y
  0x04F8BD $98AD: C-----  9D FF DB STA  $DBFF,X
  0x04F8C0 $98B0: C-----  E0 C0    CPX  #$C0
  0x04F8C2 $98B2: C-----  C0 80    CPY  #$80
  0x04F8C4 $98B4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F8C5 $98B5: C-----  C0 00    CPY  #$00
  0x04F8C7 $98B7: C-----  00       BRK  
  0x04F8C8 $98B8: C-----  3E 7C 78 ROL  $787C,X
  0x04F8CB $98BB: C-----  F8       SED  
  0x04F8CC $98BC: C-----  F0 F0    BEQ  $98AE
  0x04F8CE $98BE: C-----  20 C0 00 JSR  $00C0
  0x04F8D1 $98C1: C-----  00       BRK  
  0x04F8D2 $98C2: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F8D3 $98C3: C-----  C0 E0    CPY  #$E0
  0x04F8D5 $98C5: C-----  E0 F0    CPX  #$F0
  0x04F8D7 $98C7: C-----  F8       SED  
  0x04F8D8 $98C8: C-----  00       BRK  
  0x04F8D9 $98C9: C-----  00       BRK  
  0x04F8DA $98CA: C-----  00       BRK  
  0x04F8DB $98CB: C-----  00       BRK  
  0x04F8DC $98CC: C-----  00       BRK  
  0x04F8DD $98CD: C-----  00       BRK  
  0x04F8DE $98CE: C-----  00       BRK  
  0x04F8DF $98CF: C-----  00       BRK  
  0x04F8E0 $98D0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F8E1 $98D1: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F8E2 $98D2: C-----  01 01    ORA  ($01,X)
  0x04F8E4 $98D4: C-----  00       BRK  
  0x04F8E5 $98D5: C-----  00       BRK  
  0x04F8E6 $98D6: C-----  00       BRK  
  0x04F8E7 $98D7: C-----  00       BRK  
  0x04F8E8 $98D8: C-----  1E 0F 07 ASL  $070F,X
  0x04F8EB $98DB: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04F8EC $98DC: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F8ED $98DD: C-----  01 01    ORA  ($01,X)
  0x04F8EF $98DF: C-----  00       BRK  
  0x04F8F0 $98E0: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04F8F1 $98E1: C-----  FE FF FF INC  $FFFF,X
  0x04F8F4 $98E4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F8F5 $98E5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F8F6 $98E6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F8F7 $98E7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F8F8 $98E8: C-----  00       BRK  
  0x04F8F9 $98E9: C-----  00       BRK  
  0x04F8FA $98EA: C-----  00       BRK  
  0x04F8FB $98EB: C-----  00       BRK  
  0x04F8FC $98EC: C-----  00       BRK  
  0x04F8FD $98ED: C-----  00       BRK  
  0x04F8FE $98EE: C-----  00       BRK  
  0x04F8FF $98EF: C-----  00       BRK  
  0x04F900 $98F0: C-----  00       BRK  
  0x04F901 $98F1: C-----  00       BRK  
  0x04F902 $98F2: C-----  00       BRK  
  0x04F903 $98F3: C-----  00       BRK  
  0x04F904 $98F4: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F905 $98F5: C-----  C0 E0    CPY  #$E0
  0x04F907 $98F7: C-----  F0 00    BEQ  $98F9
  0x04F909 $98F9: C-----  00       BRK  
  0x04F90A $98FA: C-----  00       BRK  
  0x04F90B $98FB: C-----  00       BRK  
  0x04F90C $98FC: C-----  00       BRK  
  0x04F90D $98FD: C-----  00       BRK  
  0x04F90E $98FE: C-----  00       BRK  
  0x04F90F $98FF: C-----  00       BRK  
  0x04F910 $9900: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F911 $9901: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F912 $9902: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F913 $9903: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F914 $9904: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F915 $9905: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F916 $9906: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F917 $9907: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F918 $9908: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F919 $9909: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F91A $990A: C-----  40       RTI  
  0x04F91B $990B: C-----  40       RTI  
  0x04F91C $990C: C-----  20 38 D7 JSR  $D738
  0x04F91F $990F: C-----  10 FF    BPL  $9910
  0x04F921 $9911: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F922 $9912: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F923 $9913: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F924 $9914: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F925 $9915: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F926 $9916: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F927 $9917: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F928 $9918: C-----  10 10    BPL  $992A
  0x04F92A $991A: C-----  10 08    BPL  $9924
  0x04F92C $991C: C-----  08       PHP  
  0x04F92D $991D: C-----  0E F5 04 ASL  $04F5
  0x04F930 $9920: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F931 $9921: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F932 $9922: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F933 $9923: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F934 $9924: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F935 $9925: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F936 $9926: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F937 $9927: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F938 $9928: C-----  10 08    BPL  $9932
  0x04F93A $992A: C-----  08       PHP  
  0x04F93B $992B: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04F93C $992C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04F93D $992D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04F93E $992E: C-----  !!UNDEF $FA  ; unknown opcode, treating as data
  0x04F93F $992F: C-----  01 FF    ORA  ($FF,X)
  0x04F941 $9931: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F942 $9932: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F943 $9933: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F944 $9934: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F945 $9935: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F946 $9936: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F947 $9937: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F948 $9938: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04F949 $9939: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04F94A $993A: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04F94B $993B: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04F94C $993C: C-----  01 03    ORA  ($03,X)
  0x04F94E $993E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F94F $993F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F950 $9940: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F951 $9941: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F952 $9942: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F953 $9943: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F954 $9944: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F955 $9945: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F956 $9946: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F957 $9947: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F958 $9948: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04F959 $9949: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04F95A $994A: C-----  01 01    ORA  ($01,X)
  0x04F95C $994C: C-----  01 03    ORA  ($03,X)
  0x04F95E $994E: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04F95F $994F: C-----  00       BRK  
  0x04F960 $9950: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F961 $9951: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F962 $9952: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F963 $9953: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F964 $9954: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F965 $9955: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F966 $9956: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F967 $9957: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F968 $9958: C-----  00       BRK  
  0x04F969 $9959: C-----  00       BRK  
  0x04F96A $995A: C-----  00       BRK  
  0x04F96B $995B: C-----  00       BRK  
  0x04F96C $995C: C-----  00       BRK  
  0x04F96D $995D: C-----  C0 BF    CPY  #$BF
  0x04F96F $995F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F970 $9960: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F971 $9961: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F972 $9962: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F973 $9963: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F974 $9964: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F975 $9965: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F976 $9966: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F977 $9967: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F978 $9968: C-----  00       BRK  
  0x04F979 $9969: C-----  00       BRK  
  0x04F97A $996A: C-----  00       BRK  
  0x04F97B $996B: C-----  00       BRK  
  0x04F97C $996C: C-----  00       BRK  
  0x04F97D $996D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F97E $996E: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04F97F $996F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F980 $9970: C-----  F8       SED  
  0x04F981 $9971: C-----  F8       SED  
  0x04F982 $9972: C-----  F8       SED  
  0x04F983 $9973: C-----  F8       SED  
  0x04F984 $9974: C-----  F8       SED  
  0x04F985 $9975: C-----  F8       SED  
  0x04F986 $9976: C-----  F8       SED  
  0x04F987 $9977: C-----  F8       SED  
  0x04F988 $9978: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04F989 $9979: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04F98A $997A: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04F98B $997B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04F98C $997C: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04F98D $997D: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04F98E $997E: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04F98F $997F: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04F990 $9980: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F991 $9981: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F992 $9982: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F993 $9983: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F994 $9984: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F995 $9985: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04F996 $9986: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04F997 $9987: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04F998 $9988: C-----  00       BRK  
  0x04F999 $9989: C-----  00       BRK  
  0x04F99A $998A: C-----  00       BRK  
  0x04F99B $998B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F99C $998C: C-----  C0 1F    CPY  #$1F
  0x04F99E $998E: C-----  E0 E0    CPX  #$E0
  0x04F9A0 $9990: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9A1 $9991: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9A2 $9992: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9A3 $9993: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9A4 $9994: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9A5 $9995: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9A6 $9996: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9A7 $9997: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9A8 $9998: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F9A9 $9999: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04F9AA $999A: C-----  40       RTI  
  0x04F9AB $999B: C-----  40       RTI  
  0x04F9AC $999C: C-----  70 AF    BVS  $994D
  0x04F9AE $999E: C-----  20 20 1F JSR  $1F20
  0x04F9B1 $99A1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04F9B2 $99A2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04F9B3 $99A3: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04F9B4 $99A4: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F9B5 $99A5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F9B6 $99A6: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04F9B7 $99A7: C-----  01 70    ORA  ($70,X)
  0x04F9B9 $99A9: C-----  70 38    BVS  $99E3
  0x04F9BB $99AB: C-----  3E 11 0E ROL  $0E11,X
  0x04F9BE $99AE: C-----  0E 07 FF ASL  $FF07
  0x04F9C1 $99B1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9C2 $99B2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9C3 $99B3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9C4 $99B4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9C5 $99B5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9C6 $99B6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9C7 $99B7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9C8 $99B8: C-----  10 10    BPL  $99CA
  0x04F9CA $99BA: C-----  10 1C    BPL  $99D8
  0x04F9CC $99BC: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04F9CD $99BD: C-----  08       PHP  
  0x04F9CE $99BE: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04F9CF $99BF: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04F9D0 $99C0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9D1 $99C1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9D2 $99C2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9D3 $99C3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9D4 $99C4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9D5 $99C5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9D6 $99C6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9D7 $99C7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9D8 $99C8: C-----  11 11    ORA  ($11),Y
  0x04F9DA $99CA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9DB $99CB: C-----  11 11    ORA  ($11),Y
  0x04F9DD $99CD: C-----  11 FF    ORA  ($FF),Y
  0x04F9DF $99CF: C-----  11 FF    ORA  ($FF),Y
  0x04F9E1 $99D1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9E2 $99D2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9E3 $99D3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9E4 $99D4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9E5 $99D5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9E6 $99D6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9E7 $99D7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9E8 $99D8: C-----  20 20 20 JSR  $2020
  0x04F9EB $99DB: C-----  20 38 D7 JSR  $D738
  0x04F9EE $99DE: C-----  10 10    BPL  $99F0
  0x04F9F0 $99E0: C-----  20 08 08 JSR  $0808
  0x04F9F3 $99E3: C-----  88       DEY  
  0x04F9F4 $99E4: C-----  00       BRK  
  0x04F9F5 $99E5: C-----  F8       SED  
  0x04F9F6 $99E6: C-----  00       BRK  
  0x04F9F7 $99E7: C-----  00       BRK  
  0x04F9F8 $99E8: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04F9F9 $99E9: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x04F9FA $99EA: C-----  !!UNDEF $2F  ; unknown opcode, treating as data
  0x04F9FB $99EB: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04F9FC $99EC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04F9FD $99ED: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9FE $99EE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04F9FF $99EF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04FA00 $99F0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FA01 $99F1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FA02 $99F2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FA03 $99F3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FA04 $99F4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FA05 $99F5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FA06 $99F6: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04FA07 $99F7: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04FA08 $99F8: C-----  10 08    BPL  $9A02
  0x04FA0A $99FA: C-----  08       PHP  
  0x04FA0B $99FB: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04FA0C $99FC: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04FA0D $99FD: C-----  08       PHP  
  0x04FA0E $99FE: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04FA0F $99FF: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04FA10 $9A00: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04FA11 $9A01: C-----  5D FF 7F EOR  $7FFF,X
  0x04FA14 $9A04: C-----  11 FF    ORA  ($FF),Y
  0x04FA16 $9A06: C-----  11 11    ORA  ($11),Y
  0x04FA18 $9A08: C-----  3D 79 FF AND  $FF79,X
  0x04FA1B $9A0B: C-----  B1 11    LDA  ($11),Y
  0x04FA1D $9A0D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FA1E $9A0E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FA1F $9A0F: C-----  11 03    ORA  ($03),Y
  0x04FA21 $9A11: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04FA22 $9A12: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04FA23 $9A13: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04FA24 $9A14: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04FA25 $9A15: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04FA26 $9A16: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04FA27 $9A17: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FA28 $9A18: C-----  00       BRK  
  0x04FA29 $9A19: C-----  00       BRK  
  0x04FA2A $9A1A: C-----  00       BRK  
  0x04FA2B $9A1B: C-----  00       BRK  
  0x04FA2C $9A1C: C-----  00       BRK  
  0x04FA2D $9A1D: C-----  00       BRK  
  0x04FA2E $9A1E: C-----  00       BRK  
  0x04FA2F $9A1F: C-----  00       BRK  
  0x04FA30 $9A20: C-----  00       BRK  
  0x04FA31 $9A21: C-----  00       BRK  
  0x04FA32 $9A22: C-----  00       BRK  
  0x04FA33 $9A23: C-----  00       BRK  
  0x04FA34 $9A24: C-----  00       BRK  
  0x04FA35 $9A25: C-----  00       BRK  
  0x04FA36 $9A26: C-----  00       BRK  
  0x04FA37 $9A27: C-----  00       BRK  
  0x04FA38 $9A28: C-----  C0 80    CPY  #$80
  0x04FA3A $9A2A: C-----  00       BRK  
  0x04FA3B $9A2B: C-----  00       BRK  
  0x04FA3C $9A2C: C-----  00       BRK  
  0x04FA3D $9A2D: C-----  00       BRK  
  0x04FA3E $9A2E: C-----  00       BRK  
  0x04FA3F $9A2F: C-----  00       BRK  
  0x04FA40 $9A30: C-----  00       BRK  
  0x04FA41 $9A31: C-----  01 03    ORA  ($03,X)
  0x04FA43 $9A33: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04FA44 $9A34: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04FA45 $9A35: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04FA46 $9A36: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04FA47 $9A37: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04FA48 $9A38: C-----  00       BRK  
  0x04FA49 $9A39: C-----  00       BRK  
  0x04FA4A $9A3A: C-----  00       BRK  
  0x04FA4B $9A3B: C-----  00       BRK  
  0x04FA4C $9A3C: C-----  00       BRK  
  0x04FA4D $9A3D: C-----  00       BRK  
  0x04FA4E $9A3E: C-----  00       BRK  
  0x04FA4F $9A3F: C-----  00       BRK  
  0x04FA50 $9A40: C-----  FE FC F8 INC  $F8FC,X
  0x04FA53 $9A43: C-----  F8       SED  
  0x04FA54 $9A44: C-----  F0 F8    BEQ  $9A3E
  0x04FA56 $9A46: C-----  E0 80    CPX  #$80
  0x04FA58 $9A48: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04FA59 $9A49: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04FA5A $9A4A: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04FA5B $9A4B: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04FA5C $9A4C: C-----  1E 3C E4 ASL  $E43C,X
  0x04FA5F $9A4F: C-----  18       CLC  
  0x04FA60 $9A50: C-----  F8       SED  
  0x04FA61 $9A51: C-----  F8       SED  
  0x04FA62 $9A52: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04FA63 $9A53: C-----  FE FF FF INC  $FFFF,X
  0x04FA66 $9A56: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FA67 $9A57: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FA68 $9A58: C-----  00       BRK  
  0x04FA69 $9A59: C-----  00       BRK  
  0x04FA6A $9A5A: C-----  00       BRK  
  0x04FA6B $9A5B: C-----  00       BRK  
  0x04FA6C $9A5C: C-----  00       BRK  
  0x04FA6D $9A5D: C-----  00       BRK  
  0x04FA6E $9A5E: C-----  00       BRK  
  0x04FA6F $9A5F: C-----  00       BRK  
  0x04FA70 $9A60: C-----  C0 C0    CPY  #$C0
  0x04FA72 $9A62: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FA73 $9A63: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FA74 $9A64: C-----  00       BRK  
  0x04FA75 $9A65: C-----  00       BRK  
  0x04FA76 $9A66: C-----  00       BRK  
  0x04FA77 $9A67: C-----  00       BRK  
  0x04FA78 $9A68: C-----  78       SEI  
  0x04FA79 $9A69: C-----  F0 E0    BEQ  $9A4B
  0x04FA7B $9A6B: C-----  E0 C0    CPX  #$C0
  0x04FA7D $9A6D: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FA7E $9A6E: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FA7F $9A6F: C-----  00       BRK  
  0x04FA80 $9A70: C-----  00       BRK  
  0x04FA81 $9A71: C-----  00       BRK  
  0x04FA82 $9A72: C-----  01 03    ORA  ($03,X)
  0x04FA84 $9A74: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04FA85 $9A75: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04FA86 $9A76: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04FA87 $9A77: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04FA88 $9A78: C-----  00       BRK  
  0x04FA89 $9A79: C-----  00       BRK  
  0x04FA8A $9A7A: C-----  00       BRK  
  0x04FA8B $9A7B: C-----  00       BRK  
  0x04FA8C $9A7C: C-----  00       BRK  
  0x04FA8D $9A7D: C-----  00       BRK  
  0x04FA8E $9A7E: C-----  00       BRK  
  0x04FA8F $9A7F: C-----  00       BRK  
  0x04FA90 $9A80: C-----  00       BRK  
  0x04FA91 $9A81: C-----  00       BRK  
  0x04FA92 $9A82: C-----  00       BRK  
  0x04FA93 $9A83: C-----  00       BRK  
  0x04FA94 $9A84: C-----  01 03    ORA  ($03,X)
  0x04FA96 $9A86: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04FA97 $9A87: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04FA98 $9A88: C-----  00       BRK  
  0x04FA99 $9A89: C-----  00       BRK  
  0x04FA9A $9A8A: C-----  00       BRK  
  0x04FA9B $9A8B: C-----  00       BRK  
  0x04FA9C $9A8C: C-----  00       BRK  
  0x04FA9D $9A8D: C-----  00       BRK  
  0x04FA9E $9A8E: C-----  00       BRK  
  0x04FA9F $9A8F: C-----  00       BRK  
  0x04FAA0 $9A90: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04FAA1 $9A91: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04FAA2 $9A92: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FAA3 $9A93: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FAA4 $9A94: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FAA5 $9A95: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FAA6 $9A96: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FAA7 $9A97: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FAA8 $9A98: C-----  00       BRK  
  0x04FAA9 $9A99: C-----  00       BRK  
  0x04FAAA $9A9A: C-----  00       BRK  
  0x04FAAB $9A9B: C-----  00       BRK  
  0x04FAAC $9A9C: C-----  00       BRK  
  0x04FAAD $9A9D: C-----  00       BRK  
  0x04FAAE $9A9E: C-----  00       BRK  
  0x04FAAF $9A9F: C-----  00       BRK  
  0x04FAB0 $9AA0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FAB1 $9AA1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FAB2 $9AA2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FAB3 $9AA3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FAB4 $9AA4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FAB5 $9AA5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FAB6 $9AA6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FAB7 $9AA7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FAB8 $9AA8: C-----  56 A0    LSR  $A0,X
  0x04FABA $9AAA: C-----  5D A2 55 EOR  $55A2,X
  0x04FABD $9AAD: C-----  28       PLP  
  0x04FABE $9AAE: C-----  !!UNDEF $D2  ; unknown opcode, treating as data
  0x04FABF $9AAF: C-----  2D FF FF AND  $FFFF
  0x04FAC2 $9AB2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FAC3 $9AB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FAC4 $9AB4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FAC5 $9AB5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FAC6 $9AB6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FAC7 $9AB7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FAC8 $9AB8: C-----  A9 5F    LDA  #$5F
  0x04FACA $9ABA: C-----  A2 5D    LDX  #$5D
  0x04FACC $9ABC: C-----  AA       TAX  
  0x04FACD $9ABD: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04FACE $9ABE: C-----  2D D2 FF AND  $FFD2
  0x04FAD1 $9AC1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FAD2 $9AC2: C-----  F0 F0    BEQ  $9AB4
  0x04FAD4 $9AC4: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04FAD5 $9AC5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FAD6 $9AC6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FAD7 $9AC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FAD8 $9AC8: C-----  A9 5F    LDA  #$5F
  0x04FADA $9ACA: C-----  A0 50    LDY  #$50
  0x04FADC $9ACC: C-----  A8       TAY  
  0x04FADD $9ACD: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04FADE $9ACE: C-----  2D D2 FF AND  $FFD2
  0x04FAE1 $9AD1: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FAE2 $9AD2: C-----  00       BRK  
  0x04FAE3 $9AD3: C-----  00       BRK  
  0x04FAE4 $9AD4: C-----  00       BRK  
  0x04FAE5 $9AD5: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FAE6 $9AD6: C-----  F0 FF    BEQ  $9AD7
  0x04FAE8 $9AD8: C-----  56 80    LSR  $80,X
  0x04FAEA $9ADA: C-----  00       BRK  
  0x04FAEB $9ADB: C-----  00       BRK  
  0x04FAEC $9ADC: C-----  00       BRK  
  0x04FAED $9ADD: C-----  00       BRK  
  0x04FAEE $9ADE: C-----  D0 2D    BNE  $9B0D
  0x04FAF0 $9AE0: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04FAF1 $9AE1: C-----  00       BRK  
  0x04FAF2 $9AE2: C-----  00       BRK  
  0x04FAF3 $9AE3: C-----  00       BRK  
  0x04FAF4 $9AE4: C-----  00       BRK  
  0x04FAF5 $9AE5: C-----  00       BRK  
  0x04FAF6 $9AE6: C-----  00       BRK  
  0x04FAF7 $9AE7: C-----  01 29    ORA  ($29,X)
  0x04FAF9 $9AE9: C-----  00       BRK  
  0x04FAFA $9AEA: C-----  00       BRK  
  0x04FAFB $9AEB: C-----  00       BRK  
  0x04FAFC $9AEC: C-----  00       BRK  
  0x04FAFD $9AED: C-----  00       BRK  
  0x04FAFE $9AEE: C-----  00       BRK  
  0x04FAFF $9AEF: C-----  00       BRK  
  0x04FB00 $9AF0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FB01 $9AF1: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04FB02 $9AF2: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04FB03 $9AF3: C-----  00       BRK  
  0x04FB04 $9AF4: C-----  00       BRK  
  0x04FB05 $9AF5: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04FB06 $9AF6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04FB07 $9AF7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FB08 $9AF8: C-----  56 20    LSR  $20,X
  0x04FB0A $9AFA: C-----  01 00    ORA  ($00,X)
  0x04FB0C $9AFC: C-----  00       BRK  
  0x04FB0D $9AFD: C-----  00       BRK  
  0x04FB0E $9AFE: C-----  !!UNDEF $12  ; unknown opcode, treating as data
  0x04FB0F $9AFF: C-----  2D 01 01 AND  $0101
  0x04FB12 $9B02: C-----  00       BRK  
  0x04FB13 $9B03: C-----  00       BRK  
  0x04FB14 $9B04: C-----  00       BRK  
  0x04FB15 $9B05: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FB16 $9B06: C-----  C0 C0    CPY  #$C0
  0x04FB18 $9B08: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04FB19 $9B09: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04FB1A $9B0A: C-----  01 01    ORA  ($01,X)
  0x04FB1C $9B0C: C-----  00       BRK  
  0x04FB1D $9B0D: C-----  00       BRK  
  0x04FB1E $9B0E: C-----  00       BRK  
  0x04FB1F $9B0F: C-----  00       BRK  
  0x04FB20 $9B10: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FB21 $9B11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FB22 $9B12: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04FB23 $9B13: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04FB24 $9B14: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04FB25 $9B15: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04FB26 $9B16: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04FB27 $9B17: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04FB28 $9B18: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04FB29 $9B19: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04FB2A $9B1A: C-----  79 81 E0 ADC  $E081,Y
  0x04FB2D $9B1D: C-----  60       RTS  
  0x04FB2E $9B1E: C-----  70 3C    BVS  $9B5C
  0x04FB30 $9B20: C-----  E0 F0    CPX  #$F0
  0x04FB32 $9B22: C-----  F8       SED  
  0x04FB33 $9B23: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04FB34 $9B24: C-----  FE FF FF INC  $FFFF,X
  0x04FB37 $9B27: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FB38 $9B28: C-----  00       BRK  
  0x04FB39 $9B29: C-----  00       BRK  
  0x04FB3A $9B2A: C-----  00       BRK  
  0x04FB3B $9B2B: C-----  00       BRK  
  0x04FB3C $9B2C: C-----  00       BRK  
  0x04FB3D $9B2D: C-----  00       BRK  
  0x04FB3E $9B2E: C-----  00       BRK  
  0x04FB3F $9B2F: C-----  00       BRK  
  0x04FB40 $9B30: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04FB41 $9B31: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04FB42 $9B32: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04FB43 $9B33: C-----  01 01    ORA  ($01,X)
  0x04FB45 $9B35: C-----  01 00    ORA  ($00,X)
  0x04FB47 $9B37: C-----  81 13    STA  ($13,X)
  0x04FB49 $9B39: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04FB4A $9B3A: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04FB4B $9B3B: C-----  06 07    ASL  $07
  0x04FB4D $9B3D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04FB4E $9B3E: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04FB4F $9B3F: C-----  01 FF    ORA  ($FF,X)
  0x04FB51 $9B41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FB52 $9B42: C-----  F5 FD    SBC  $FD,X
  0x04FB54 $9B44: C-----  7E 7E FF ROR  $FF7E,X
  0x04FB57 $9B47: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04FB58 $9B48: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04FB59 $9B49: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04FB5A $9B4A: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x04FB5B $9B4B: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04FB5C $9B4C: C-----  81 81    STA  ($81,X)
  0x04FB5E $9B4E: C-----  41 71    EOR  ($71,X)
  0x04FB60 $9B50: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04FB61 $9B51: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FB62 $9B52: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04FB63 $9B53: C-----  FD FD FD SBC  $FDFD,X
  0x04FB66 $9B56: C-----  FD 3E 04 SBC  $043E,X
  0x04FB69 $9B59: C-----  0E F5 02 ASL  $02F5
  0x04FB6C $9B5C: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04FB6D $9B5D: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04FB6E $9B5E: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04FB6F $9B5F: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04FB70 $9B60: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x04FB71 $9B61: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04FB72 $9B62: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FB73 $9B63: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FB74 $9B64: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04FB75 $9B65: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04FB76 $9B66: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FB77 $9B67: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04FB78 $9B68: C-----  AE 20 10 LDX  $1020
  0x04FB7B $9B6B: C-----  10 1C    BPL  $9B89
  0x04FB7D $9B6D: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04FB7E $9B6E: C-----  08       PHP  
  0x04FB7F $9B6F: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04FB80 $9B70: C-----  4E 7E BE LSR  $BE7E
  0x04FB83 $9B73: C-----  BE CF 51 LDX  $51CF,Y
  0x04FB86 $9B76: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04FB87 $9B77: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04FB88 $9B78: C-----  BD 81 41 LDA  $4181,X
  0x04FB8B $9B7B: C-----  41 71    EOR  ($71,X)
  0x04FB8D $9B7D: C-----  AE 20 20 LDX  $2020
  0x04FB90 $9B80: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FB91 $9B81: C-----  00       BRK  
  0x04FB92 $9B82: C-----  00       BRK  
  0x04FB93 $9B83: C-----  00       BRK  
  0x04FB94 $9B84: C-----  00       BRK  
  0x04FB95 $9B85: C-----  00       BRK  
  0x04FB96 $9B86: C-----  00       BRK  
  0x04FB97 $9B87: C-----  F8       SED  
  0x04FB98 $9B88: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FB99 $9B89: C-----  00       BRK  
  0x04FB9A $9B8A: C-----  00       BRK  
  0x04FB9B $9B8B: C-----  00       BRK  
  0x04FB9C $9B8C: C-----  00       BRK  
  0x04FB9D $9B8D: C-----  00       BRK  
  0x04FB9E $9B8E: C-----  00       BRK  
  0x04FB9F $9B8F: C-----  D0 C0    BNE  $9B51
  0x04FBA1 $9B91: C-----  E0 F0    CPX  #$F0
  0x04FBA3 $9B93: C-----  F8       SED  
  0x04FBA4 $9B94: C-----  F8       SED  
  0x04FBA5 $9B95: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04FBA6 $9B96: C-----  FE FF 00 INC  $00FF,X
  0x04FBA9 $9B99: C-----  00       BRK  
  0x04FBAA $9B9A: C-----  00       BRK  
  0x04FBAB $9B9B: C-----  00       BRK  
  0x04FBAC $9B9C: C-----  00       BRK  
  0x04FBAD $9B9D: C-----  00       BRK  
  0x04FBAE $9B9E: C-----  00       BRK  
  0x04FBAF $9B9F: C-----  00       BRK  
  0x04FBB0 $9BA0: C-----  F8       SED  
  0x04FBB1 $9BA1: C-----  F8       SED  
  0x04FBB2 $9BA2: C-----  78       SEI  
  0x04FBB3 $9BA3: C-----  F8       SED  
  0x04FBB4 $9BA4: C-----  00       BRK  
  0x04FBB5 $9BA5: C-----  00       BRK  
  0x04FBB6 $9BA6: C-----  00       BRK  
  0x04FBB7 $9BA7: C-----  00       BRK  
  0x04FBB8 $9BA8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04FBB9 $9BA9: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04FBBA $9BAA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FBBB $9BAB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FBBC $9BAC: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04FBBD $9BAD: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FBBE $9BAE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04FBBF $9BAF: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04FBC0 $9BB0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FBC1 $9BB1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FBC2 $9BB2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FBC3 $9BB3: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04FBC4 $9BB4: C-----  D1 D1    CMP  ($D1),Y
  0x04FBC6 $9BB6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FBC7 $9BB7: C-----  91 D1    STA  ($D1),Y
  0x04FBC9 $9BB9: C-----  D1 FF    CMP  ($FF),Y
  0x04FBCB $9BBB: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04FBCC $9BBC: C-----  D1 FF    CMP  ($FF),Y
  0x04FBCE $9BBE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FBCF $9BBF: C-----  !!UNDEF $93  ; unknown opcode, treating as data
  0x04FBD0 $9BC0: C-----  !!UNDEF $3B  ; unknown opcode, treating as data
  0x04FBD1 $9BC1: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04FBD2 $9BC2: C-----  01 1E    ORA  ($1E,X)
  0x04FBD4 $9BC4: C-----  0E 03 04 ASL  $0403
  0x04FBD7 $9BC7: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04FBD8 $9BC8: C-----  C4 E3    CPY  $E3
  0x04FBDA $9BCA: C-----  5E 21 31 LSR  $3121,X
  0x04FBDD $9BCD: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04FBDE $9BCE: C-----  !!UNDEF $0B  ; unknown opcode, treating as data
  0x04FBDF $9BCF: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04FBE0 $9BD0: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FBE1 $9BD1: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04FBE2 $9BD2: C-----  08       PHP  
  0x04FBE3 $9BD3: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FBE4 $9BD4: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FBE5 $9BD5: C-----  31 42    AND  ($42),Y
  0x04FBE7 $9BD7: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x04FBE8 $9BD8: C-----  10 18    BPL  $9BF2
  0x04FBEA $9BDA: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FBEB $9BDB: C-----  08       PHP  
  0x04FBEC $9BDC: C-----  08       PHP  
  0x04FBED $9BDD: C-----  CE BD 84 DEC  $84BD
  0x04FBF0 $9BE0: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FBF1 $9BE1: C-----  C1 C0    CMP  ($C0,X)
  0x04FBF3 $9BE3: C-----  E0 F0    CPX  #$F0
  0x04FBF5 $9BE5: C-----  F8       SED  
  0x04FBF6 $9BE6: C-----  F8       SED  
  0x04FBF7 $9BE7: C-----  F8       SED  
  0x04FBF8 $9BE8: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04FBF9 $9BE9: C-----  06 03    ASL  $03
  0x04FBFB $9BEB: C-----  01 01    ORA  ($01,X)
  0x04FBFD $9BED: C-----  00       BRK  
  0x04FBFE $9BEE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04FBFF $9BEF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04FC00 $9BF0: C-----  00       BRK  
  0x04FC01 $9BF1: C-----  BD 00 DD LDA  $DD00,X
  0x04FC04 $9BF4: C-----  00       BRK  
  0x04FC05 $9BF5: C-----  6E 7F 80 ROR  $807F
  0x04FC08 $9BF8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC09 $9BF9: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04FC0A $9BFA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC0B $9BFB: C-----  !!UNDEF $22  ; unknown opcode, treating as data
  0x04FC0C $9BFC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC0D $9BFD: C-----  91 7F    STA  ($7F),Y
  0x04FC0F $9BFF: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FC10 $9C00: C-----  C0 E0    CPY  #$E0
  0x04FC12 $9C02: C-----  E0 F0    CPX  #$F0
  0x04FC14 $9C04: C-----  F8       SED  
  0x04FC15 $9C05: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04FC16 $9C06: C-----  FE FF 00 INC  $00FF,X
  0x04FC19 $9C09: C-----  00       BRK  
  0x04FC1A $9C0A: C-----  00       BRK  
  0x04FC1B $9C0B: C-----  00       BRK  
  0x04FC1C $9C0C: C-----  00       BRK  
  0x04FC1D $9C0D: C-----  00       BRK  
  0x04FC1E $9C0E: C-----  00       BRK  
  0x04FC1F $9C0F: C-----  00       BRK  
  0x04FC20 $9C10: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC21 $9C11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC22 $9C12: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC23 $9C13: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC24 $9C14: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC25 $9C15: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC26 $9C16: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC27 $9C17: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC28 $9C18: C-----  08       PHP  
  0x04FC29 $9C19: C-----  08       PHP  
  0x04FC2A $9C1A: C-----  08       PHP  
  0x04FC2B $9C1B: C-----  08       PHP  
  0x04FC2C $9C1C: C-----  08       PHP  
  0x04FC2D $9C1D: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04FC2E $9C1E: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04FC2F $9C1F: C-----  08       PHP  
  0x04FC30 $9C20: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC31 $9C21: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC32 $9C22: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC33 $9C23: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC34 $9C24: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC35 $9C25: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC36 $9C26: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC37 $9C27: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC38 $9C28: C-----  40       RTI  
  0x04FC39 $9C29: C-----  40       RTI  
  0x04FC3A $9C2A: C-----  20 20 20 JSR  $2020
  0x04FC3D $9C2D: C-----  70 5F    BVS  $9C8E
  0x04FC3F $9C2F: C-----  20 FF FF JSR  $FFFF
  0x04FC42 $9C32: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC43 $9C33: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04FC44 $9C34: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC45 $9C35: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC46 $9C36: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC47 $9C37: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04FC48 $9C38: C-----  D1 D1    CMP  ($D1),Y
  0x04FC4A $9C3A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC4B $9C3B: C-----  91 D1    STA  ($D1),Y
  0x04FC4D $9C3D: C-----  D1 FF    CMP  ($FF),Y
  0x04FC4F $9C3F: C-----  91 FF    STA  ($FF),Y
  0x04FC51 $9C41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC52 $9C42: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC53 $9C43: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC54 $9C44: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04FC55 $9C45: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC56 $9C46: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC57 $9C47: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC58 $9C48: C-----  10 10    BPL  $9C5A
  0x04FC5A $9C4A: C-----  10 10    BPL  $9C5C
  0x04FC5C $9C4C: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04FC5D $9C4D: C-----  38       SEC  
  0x04FC5E $9C4E: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04FC5F $9C4F: C-----  10 FF    BPL  $9C50
  0x04FC61 $9C51: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC62 $9C52: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC63 $9C53: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC64 $9C54: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FC65 $9C55: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC66 $9C56: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC67 $9C57: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC68 $9C58: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04FC69 $9C59: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04FC6A $9C5A: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04FC6B $9C5B: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04FC6C $9C5C: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04FC6D $9C5D: C-----  0E FA 04 ASL  $04FA
  0x04FC70 $9C60: C-----  !!UNDEF $DB  ; unknown opcode, treating as data
  0x04FC71 $9C61: C-----  !!UNDEF $33  ; unknown opcode, treating as data
  0x04FC72 $9C62: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC73 $9C63: C-----  59 D3 FF EOR  $FFD3,Y
  0x04FC76 $9C66: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC77 $9C67: C-----  D1 3F    CMP  ($3F),Y
  0x04FC79 $9C69: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04FC7A $9C6A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC7B $9C6B: C-----  DD 3B 93 CMP  $933B,X
  0x04FC7E $9C6E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FC7F $9C6F: C-----  7D 03 1D ADC  $1D03,X
  0x04FC82 $9C72: C-----  0E 18 1F ASL  $1F18
  0x04FC85 $9C75: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04FC86 $9C76: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04FC87 $9C77: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04FC88 $9C78: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04FC89 $9C79: C-----  F9 FC F8 SBC  $F8FC,Y
  0x04FC8C $9C7C: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FC8D $9C7D: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FC8E $9C7E: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FC8F $9C7F: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04FC90 $9C80: C-----  00       BRK  
  0x04FC91 $9C81: C-----  18       CLC  
  0x04FC92 $9C82: C-----  68       PLA  
  0x04FC93 $9C83: C-----  00       BRK  
  0x04FC94 $9C84: C-----  E8       INX  
  0x04FC95 $9C85: C-----  20 28 28 JSR  $2828
  0x04FC98 $9C88: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04FC99 $9C89: C-----  !!UNDEF $A7  ; unknown opcode, treating as data
  0x04FC9A $9C8A: C-----  !!UNDEF $87  ; unknown opcode, treating as data
  0x04FC9B $9C8B: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04FC9C $9C8C: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04FC9D $9C8D: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FC9E $9C8E: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04FC9F $9C8F: C-----  !!UNDEF $27  ; unknown opcode, treating as data
  0x04FCA0 $9C90: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCA1 $9C91: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCA2 $9C92: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCA3 $9C93: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCA4 $9C94: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCA5 $9C95: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCA6 $9C96: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCA7 $9C97: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCA8 $9C98: C-----  08       PHP  
  0x04FCA9 $9C99: C-----  08       PHP  
  0x04FCAA $9C9A: C-----  08       PHP  
  0x04FCAB $9C9B: C-----  08       PHP  
  0x04FCAC $9C9C: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04FCAD $9C9D: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04FCAE $9C9E: C-----  08       PHP  
  0x04FCAF $9C9F: C-----  08       PHP  
  0x04FCB0 $9CA0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCB1 $9CA1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCB2 $9CA2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCB3 $9CA3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCB4 $9CA4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCB5 $9CA5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCB6 $9CA6: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FCB7 $9CA7: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FCB8 $9CA8: C-----  10 08    BPL  $9CB2
  0x04FCBA $9CAA: C-----  08       PHP  
  0x04FCBB $9CAB: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04FCBC $9CAC: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04FCBD $9CAD: C-----  08       PHP  
  0x04FCBE $9CAE: C-----  08       PHP  
  0x04FCBF $9CAF: C-----  08       PHP  
  0x04FCC0 $9CB0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCC1 $9CB1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCC2 $9CB2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCC3 $9CB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCC4 $9CB4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCC5 $9CB5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCC6 $9CB6: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FCC7 $9CB7: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FCC8 $9CB8: C-----  08       PHP  
  0x04FCC9 $9CB9: C-----  08       PHP  
  0x04FCCA $9CBA: C-----  08       PHP  
  0x04FCCB $9CBB: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04FCCC $9CBC: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04FCCD $9CBD: C-----  08       PHP  
  0x04FCCE $9CBE: C-----  08       PHP  
  0x04FCCF $9CBF: C-----  08       PHP  
  0x04FCD0 $9CC0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCD1 $9CC1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCD2 $9CC2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCD3 $9CC3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCD4 $9CC4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCD5 $9CC5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCD6 $9CC6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCD7 $9CC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCD8 $9CC8: C-----  10 10    BPL  $9CDA
  0x04FCDA $9CCA: C-----  10 10    BPL  $9CDC
  0x04FCDC $9CCC: C-----  38       SEC  
  0x04FCDD $9CCD: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04FCDE $9CCE: C-----  10 10    BPL  $9CE0
  0x04FCE0 $9CD0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCE1 $9CD1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCE2 $9CD2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCE3 $9CD3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCE4 $9CD4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCE5 $9CD5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCE6 $9CD6: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04FCE7 $9CD7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCE8 $9CD8: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04FCE9 $9CD9: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04FCEA $9CDA: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04FCEB $9CDB: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04FCEC $9CDC: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04FCED $9CDD: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04FCEE $9CDE: C-----  28       PLP  
  0x04FCEF $9CDF: C-----  08       PHP  
  0x04FCF0 $9CE0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCF1 $9CE1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCF2 $9CE2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCF3 $9CE3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCF4 $9CE4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCF5 $9CE5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FCF6 $9CE6: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FCF7 $9CE7: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FCF8 $9CE8: C-----  10 10    BPL  $9CFA
  0x04FCFA $9CEA: C-----  10 38    BPL  $9D24
  0x04FCFC $9CEC: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04FCFD $9CED: C-----  10 10    BPL  $9CFF
  0x04FCFF $9CEF: C-----  10 FF    BPL  $9CF0
  0x04FD01 $9CF1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD02 $9CF2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD03 $9CF3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD04 $9CF4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD05 $9CF5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD06 $9CF6: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FD07 $9CF7: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FD08 $9CF8: C-----  08       PHP  
  0x04FD09 $9CF9: C-----  10 10    BPL  $9D0B
  0x04FD0B $9CFB: C-----  38       SEC  
  0x04FD0C $9CFC: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04FD0D $9CFD: C-----  10 10    BPL  $9D0F
  0x04FD0F $9CFF: C-----  10 FF    BPL  $9D00
  0x04FD11 $9D01: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD12 $9D02: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD13 $9D03: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD14 $9D04: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD15 $9D05: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD16 $9D06: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD17 $9D07: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD18 $9D08: C-----  00       BRK  
  0x04FD19 $9D09: C-----  00       BRK  
  0x04FD1A $9D0A: C-----  00       BRK  
  0x04FD1B $9D0B: C-----  00       BRK  
  0x04FD1C $9D0C: C-----  00       BRK  
  0x04FD1D $9D0D: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04FD1E $9D0E: C-----  FD 01 FF SBC  $FF01,X
  0x04FD21 $9D11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD22 $9D12: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD23 $9D13: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD24 $9D14: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD25 $9D15: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD26 $9D16: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD27 $9D17: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD28 $9D18: C-----  40       RTI  
  0x04FD29 $9D19: C-----  40       RTI  
  0x04FD2A $9D1A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FD2B $9D1B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FD2C $9D1C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FD2D $9D1D: C-----  C0 3F    CPY  #$3F
  0x04FD2F $9D1F: C-----  00       BRK  
  0x04FD30 $9D20: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04FD31 $9D21: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04FD32 $9D22: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD33 $9D23: C-----  7D 13 FF ADC  $FF13,X
  0x04FD36 $9D26: C-----  11 11    ORA  ($11),Y
  0x04FD38 $9D28: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04FD39 $9D29: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x04FD3A $9D2A: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD3B $9D2B: C-----  B1 13    LDA  ($13),Y
  0x04FD3D $9D2D: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD3E $9D2E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD3F $9D2F: C-----  11 FF    ORA  ($FF),Y
  0x04FD41 $9D31: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD42 $9D32: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD43 $9D33: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD44 $9D34: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD45 $9D35: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD46 $9D36: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD47 $9D37: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD48 $9D38: C-----  00       BRK  
  0x04FD49 $9D39: C-----  00       BRK  
  0x04FD4A $9D3A: C-----  00       BRK  
  0x04FD4B $9D3B: C-----  00       BRK  
  0x04FD4C $9D3C: C-----  00       BRK  
  0x04FD4D $9D3D: C-----  01 FE    ORA  ($FE,X)
  0x04FD4F $9D3F: C-----  01 FF    ORA  ($FF,X)
  0x04FD51 $9D41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD52 $9D42: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD53 $9D43: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD54 $9D44: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD55 $9D45: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD56 $9D46: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD57 $9D47: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD58 $9D48: C-----  08       PHP  
  0x04FD59 $9D49: C-----  08       PHP  
  0x04FD5A $9D4A: C-----  08       PHP  
  0x04FD5B $9D4B: C-----  10 10    BPL  $9D5D
  0x04FD5D $9D4D: C-----  70 AF    BVS  $9CFE
  0x04FD5F $9D4F: C-----  20 FF FF JSR  $FFFF
  0x04FD62 $9D52: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD63 $9D53: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD64 $9D54: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD65 $9D55: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD66 $9D56: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD67 $9D57: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD68 $9D58: C-----  01 01    ORA  ($01,X)
  0x04FD6A $9D5A: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04FD6B $9D5B: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04FD6C $9D5C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04FD6D $9D5D: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04FD6E $9D5E: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04FD6F $9D5F: C-----  08       PHP  
  0x04FD70 $9D60: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD71 $9D61: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD72 $9D62: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD73 $9D63: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD74 $9D64: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD75 $9D65: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD76 $9D66: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD77 $9D67: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD78 $9D68: C-----  20 40 40 JSR  $4040
  0x04FD7B $9D6B: C-----  40       RTI  
  0x04FD7C $9D6C: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FD7D $9D6D: C-----  C0 FE    CPY  #$FE
  0x04FD7F $9D6F: C-----  01 FF    ORA  ($FF,X)
  0x04FD81 $9D71: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD82 $9D72: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD83 $9D73: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD84 $9D74: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD85 $9D75: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD86 $9D76: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD87 $9D77: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD88 $9D78: C-----  08       PHP  
  0x04FD89 $9D79: C-----  10 10    BPL  $9D8B
  0x04FD8B $9D7B: C-----  20 20 E0 JSR  $E020
  0x04FD8E $9D7E: C-----  !!UNDEF $5F  ; unknown opcode, treating as data
  0x04FD8F $9D7F: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FD90 $9D80: C-----  !!UNDEF $0C  ; unknown opcode, treating as data
  0x04FD91 $9D81: C-----  18       CLC  
  0x04FD92 $9D82: C-----  00       BRK  
  0x04FD93 $9D83: C-----  19 00 1F ORA  $1F00,Y
  0x04FD96 $9D86: C-----  00       BRK  
  0x04FD97 $9D87: C-----  00       BRK  
  0x04FD98 $9D88: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04FD99 $9D89: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04FD9A $9D8A: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04FD9B $9D8B: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FD9C $9D8C: C-----  E0 FF    CPX  #$FF
  0x04FD9E $9D8E: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FD9F $9D8F: C-----  E0 FF    CPX  #$FF
  0x04FDA1 $9D91: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDA2 $9D92: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDA3 $9D93: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04FDA4 $9D94: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDA5 $9D95: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDA6 $9D96: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDA7 $9D97: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDA8 $9D98: C-----  01 01    ORA  ($01,X)
  0x04FDAA $9D9A: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04FDAB $9D9B: C-----  06 0E    ASL  $0E
  0x04FDAD $9D9D: C-----  F5 04    SBC  $04,X
  0x04FDAF $9D9F: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04FDB0 $9DA0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDB1 $9DA1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDB2 $9DA2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDB3 $9DA3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDB4 $9DA4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDB5 $9DA5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDB6 $9DA6: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04FDB7 $9DA7: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04FDB8 $9DA8: C-----  08       PHP  
  0x04FDB9 $9DA9: C-----  10 10    BPL  $9DBB
  0x04FDBB $9DAB: C-----  38       SEC  
  0x04FDBC $9DAC: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04FDBD $9DAD: C-----  10 20    BPL  $9DCF
  0x04FDBF $9DAF: C-----  20 FF FF JSR  $FFFF
  0x04FDC2 $9DB2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDC3 $9DB3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDC4 $9DB4: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FDC5 $9DB5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDC6 $9DB6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDC7 $9DB7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDC8 $9DB8: C-----  08       PHP  
  0x04FDC9 $9DB9: C-----  08       PHP  
  0x04FDCA $9DBA: C-----  08       PHP  
  0x04FDCB $9DBB: C-----  38       SEC  
  0x04FDCC $9DBC: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04FDCD $9DBD: C-----  10 20    BPL  $9DDF
  0x04FDCF $9DBF: C-----  40       RTI  
  0x04FDD0 $9DC0: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04FDD1 $9DC1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04FDD2 $9DC2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04FDD3 $9DC3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04FDD4 $9DC4: C-----  00       BRK  
  0x04FDD5 $9DC5: C-----  00       BRK  
  0x04FDD6 $9DC6: C-----  00       BRK  
  0x04FDD7 $9DC7: C-----  01 E0    ORA  ($E0,X)
  0x04FDD9 $9DC9: C-----  E0 FF    CPX  #$FF
  0x04FDDB $9DCB: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDDC $9DCC: C-----  E0 EF    CPX  #$EF
  0x04FDDE $9DCE: C-----  E0 E3    CPX  #$E3
  0x04FDE0 $9DD0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDE1 $9DD1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDE2 $9DD2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDE3 $9DD3: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDE4 $9DD4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDE5 $9DD5: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04FDE6 $9DD6: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04FDE7 $9DD7: C-----  !!UNDEF $FC  ; unknown opcode, treating as data
  0x04FDE8 $9DD8: C-----  00       BRK  
  0x04FDE9 $9DD9: C-----  00       BRK  
  0x04FDEA $9DDA: C-----  00       BRK  
  0x04FDEB $9DDB: C-----  01 03    ORA  ($03,X)
  0x04FDED $9DDD: C-----  F8       SED  
  0x04FDEE $9DDE: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04FDEF $9DDF: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04FDF0 $9DE0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDF1 $9DE1: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04FDF2 $9DE2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDF3 $9DE3: C-----  BD 13 13 LDA  $1313,X
  0x04FDF6 $9DE6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDF7 $9DE7: C-----  11 13    ORA  ($13),Y
  0x04FDF9 $9DE9: C-----  !!UNDEF $D3  ; unknown opcode, treating as data
  0x04FDFA $9DEA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDFB $9DEB: C-----  BD 13 FF LDA  $FF13,X
  0x04FDFE $9DEE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FDFF $9DEF: C-----  91 F8    STA  ($F8),Y
  0x04FE01 $9DF1: C-----  F8       SED  
  0x04FE02 $9DF2: C-----  F0 F0    BEQ  $9DE4
  0x04FE04 $9DF4: C-----  C0 C0    CPY  #$C0
  0x04FE06 $9DF6: C-----  C0 80    CPY  #$80
  0x04FE08 $9DF8: C-----  0E 0E 1C ASL  $1C0E
  0x04FE0B $9DFB: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04FE0C $9DFC: C-----  88       DEY  
  0x04FE0D $9DFD: C-----  70 70    BVS  $9E6F
  0x04FE0F $9DFF: C-----  E0 F7    CPX  #$F7
  0x04FE11 $9E01: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FE12 $9E02: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FE13 $9E03: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FE14 $9E04: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04FE15 $9E05: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04FE16 $9E06: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FE17 $9E07: C-----  79 08 1C ADC  $1C08,Y
  0x04FE1A $9E0A: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04FE1B $9E0B: C-----  08       PHP  
  0x04FE1C $9E0C: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04FE1D $9E0D: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04FE1E $9E0E: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04FE1F $9E0F: C-----  8E F7 EF STX  $EFF7
  0x04FE22 $9E12: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FE23 $9E13: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FE24 $9E14: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FE25 $9E15: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FE26 $9E16: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FE27 $9E17: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04FE28 $9E18: C-----  08       PHP  
  0x04FE29 $9E19: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04FE2A $9E1A: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04FE2B $9E1B: C-----  08       PHP  
  0x04FE2C $9E1C: C-----  08       PHP  
  0x04FE2D $9E1D: C-----  08       PHP  
  0x04FE2E $9E1E: C-----  08       PHP  
  0x04FE2F $9E1F: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04FE30 $9E20: C-----  9A       TXS  
  0x04FE31 $9E21: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04FE32 $9E22: C-----  FD FD 3A SBC  $3AFD,X
  0x04FE35 $9E25: C-----  45 7D    EOR  $7D
  0x04FE37 $9E27: C-----  7D 75 04 ADC  $0475,X
  0x04FE3A $9E2A: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04FE3B $9E2B: C-----  !!UNDEF $02  ; unknown opcode, treating as data
  0x04FE3C $9E2C: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04FE3D $9E2D: C-----  BA       TSX  
  0x04FE3E $9E2E: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04FE3F $9E2F: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04FE40 $9E30: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04FE41 $9E31: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FE42 $9E32: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FE43 $9E33: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FE44 $9E34: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04FE45 $9E35: C-----  !!UNDEF $14  ; unknown opcode, treating as data
  0x04FE46 $9E36: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FE47 $9E37: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FE48 $9E38: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04FE49 $9E39: C-----  08       PHP  
  0x04FE4A $9E3A: C-----  08       PHP  
  0x04FE4B $9E3B: C-----  08       PHP  
  0x04FE4C $9E3C: C-----  !!UNDEF $1C  ; unknown opcode, treating as data
  0x04FE4D $9E3D: C-----  !!UNDEF $EB  ; unknown opcode, treating as data
  0x04FE4E $9E3E: C-----  08       PHP  
  0x04FE4F $9E3F: C-----  08       PHP  
  0x04FE50 $9E40: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FE51 $9E41: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FE52 $9E42: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FE53 $9E43: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FE54 $9E44: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FE55 $9E45: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FE56 $9E46: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FE57 $9E47: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04FE58 $9E48: C-----  10 38    BPL  $9E82
  0x04FE5A $9E4A: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04FE5B $9E4B: C-----  10 10    BPL  $9E5D
  0x04FE5D $9E4D: C-----  10 10    BPL  $9E5F
  0x04FE5F $9E4F: C-----  38       SEC  
  0x04FE60 $9E50: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FE61 $9E51: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FE62 $9E52: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FE63 $9E53: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FE64 $9E54: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FE65 $9E55: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FE66 $9E56: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FE67 $9E57: C-----  !!UNDEF $9E  ; unknown opcode, treating as data
  0x04FE68 $9E58: C-----  10 38    BPL  $9E92
  0x04FE6A $9E5A: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04FE6B $9E5B: C-----  10 10    BPL  $9E6D
  0x04FE6D $9E5D: C-----  10 20    BPL  $9E7F
  0x04FE6F $9E5F: C-----  71 28    ADC  ($28),Y
  0x04FE71 $9E61: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FE72 $9E62: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FE73 $9E63: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FE74 $9E64: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04FE75 $9E65: C-----  28       PLP  
  0x04FE76 $9E66: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FE77 $9E67: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FE78 $9E68: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04FE79 $9E69: C-----  10 10    BPL  $9E7B
  0x04FE7B $9E6B: C-----  10 38    BPL  $9EA5
  0x04FE7D $9E6D: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04FE7E $9E6E: C-----  10 10    BPL  $9E80
  0x04FE80 $9E70: C-----  59 DF BF EOR  $BFDF,Y
  0x04FE83 $9E73: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04FE84 $9E74: C-----  !!UNDEF $5C  ; unknown opcode, treating as data
  0x04FE85 $9E75: C-----  A2 BE    LDX  #$BE
  0x04FE87 $9E77: C-----  BE AE 20 LDX  $20AE,Y
  0x04FE8A $9E7A: C-----  40       RTI  
  0x04FE8B $9E7B: C-----  40       RTI  
  0x04FE8C $9E7C: C-----  !!UNDEF $E3  ; unknown opcode, treating as data
  0x04FE8D $9E7D: C-----  5D 41 41 EOR  $4141,X
  0x04FE90 $9E80: C-----  7D 9E 20 ADC  $209E,X
  0x04FE93 $9E83: C-----  BE BE 8E LDX  $8EBE,Y
  0x04FE96 $9E86: C-----  10 DE    BPL  $9E66
  0x04FE98 $9E88: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04FE99 $9E89: C-----  61 DF    ADC  ($DF,X)
  0x04FE9B $9E8B: C-----  41 41    EOR  ($41,X)
  0x04FE9D $9E8D: C-----  71 EF    ADC  ($EF),Y
  0x04FE9F $9E8F: C-----  21 F7    AND  ($F7,X)
  0x04FEA1 $9E91: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x04FEA2 $9E92: C-----  84 F7    STY  $F7
  0x04FEA4 $9E94: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FEA5 $9E95: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x04FEA6 $9E96: C-----  84 F7    STY  $F7
  0x04FEA8 $9E98: C-----  08       PHP  
  0x04FEA9 $9E99: C-----  8C 7B 08 STY  $087B
  0x04FEAC $9E9C: C-----  08       PHP  
  0x04FEAD $9E9D: C-----  8C 7B 08 STY  $087B
  0x04FEB0 $9EA0: C-----  00       BRK  
  0x04FEB1 $9EA1: C-----  DE 00 EF DEC  $EF00,X
  0x04FEB4 $9EA4: C-----  00       BRK  
  0x04FEB5 $9EA5: C-----  EE FF 00 INC  $00FF
  0x04FEB8 $9EA8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FEB9 $9EA9: C-----  21 FF    AND  ($FF,X)
  0x04FEBB $9EAB: C-----  10 FF    BPL  $9EAC
  0x04FEBD $9EAD: C-----  11 FF    ORA  ($FF),Y
  0x04FEBF $9EAF: C-----  00       BRK  
  0x04FEC0 $9EB0: C-----  00       BRK  
  0x04FEC1 $9EB1: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FEC2 $9EB2: C-----  00       BRK  
  0x04FEC3 $9EB3: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04FEC4 $9EB4: C-----  00       BRK  
  0x04FEC5 $9EB5: C-----  !!UNDEF $67  ; unknown opcode, treating as data
  0x04FEC6 $9EB6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FEC7 $9EB7: C-----  00       BRK  
  0x04FEC8 $9EB8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FEC9 $9EB9: C-----  08       PHP  
  0x04FECA $9EBA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FECB $9EBB: C-----  88       DEY  
  0x04FECC $9EBC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FECD $9EBD: C-----  98       TYA  
  0x04FECE $9EBE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FECF $9EBF: C-----  00       BRK  
  0x04FED0 $9EC0: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FED1 $9EC1: C-----  CE 21 EF DEC  $EF21
  0x04FED4 $9EC4: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FED5 $9EC5: C-----  CE 21 EF DEC  $EF21
  0x04FED8 $9EC8: C-----  10 31    BPL  $9EFB
  0x04FEDA $9ECA: C-----  DE 10 10 DEC  $1010,X
  0x04FEDD $9ECD: C-----  31 DE    AND  ($DE),Y
  0x04FEDF $9ECF: C-----  10 BE    BPL  $9E8F
  0x04FEE1 $9ED1: C-----  79 04 7D ADC  $7D04,Y
  0x04FEE4 $9ED4: C-----  7D 71 08 ADC  $0871,X
  0x04FEE7 $9ED7: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x04FEE8 $9ED8: C-----  41 86    EOR  ($86,X)
  0x04FEEA $9EDA: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04FEEB $9EDB: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04FEEC $9EDC: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04FEED $9EDD: C-----  8E F7 84 STX  $84F7
  0x04FEF0 $9EE0: C-----  00       BRK  
  0x04FEF1 $9EE1: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FEF2 $9EE2: C-----  00       BRK  
  0x04FEF3 $9EE3: C-----  EE 00 E6 INC  $E600
  0x04FEF6 $9EE6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FEF7 $9EE7: C-----  00       BRK  
  0x04FEF8 $9EE8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FEF9 $9EE9: C-----  10 FF    BPL  $9EEA
  0x04FEFB $9EEB: C-----  11 FF    ORA  ($FF),Y
  0x04FEFD $9EED: C-----  19 FF 00 ORA  $00FF,Y
  0x04FF00 $9EF0: C-----  00       BRK  
  0x04FF01 $9EF1: C-----  !!UNDEF $7B  ; unknown opcode, treating as data
  0x04FF02 $9EF2: C-----  00       BRK  
  0x04FF03 $9EF3: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FF04 $9EF4: C-----  00       BRK  
  0x04FF05 $9EF5: C-----  !!UNDEF $77  ; unknown opcode, treating as data
  0x04FF06 $9EF6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FF07 $9EF7: C-----  00       BRK  
  0x04FF08 $9EF8: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FF09 $9EF9: C-----  84 FF    STY  $FF
  0x04FF0B $9EFB: C-----  08       PHP  
  0x04FF0C $9EFC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FF0D $9EFD: C-----  88       DEY  
  0x04FF0E $9EFE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FF0F $9EFF: C-----  00       BRK  
  0x04FF10 $9F00: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04FF11 $9F01: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FF12 $9F02: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04FF13 $9F03: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04FF14 $9F04: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04FF15 $9F05: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04FF16 $9F06: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04FF17 $9F07: C-----  !!UNDEF $7C  ; unknown opcode, treating as data
  0x04FF18 $9F08: C-----  20 70 AF JSR  $AF70
  0x04FF1B $9F0B: C-----  40       RTI  
  0x04FF1C $9F0C: C-----  40       RTI  
  0x04FF1D $9F0D: C-----  40       RTI  
  0x04FF1E $9F0E: C-----  40       RTI  
  0x04FF1F $9F0F: C-----  !!UNDEF $C3  ; unknown opcode, treating as data
  0x04FF20 $9F10: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FF21 $9F11: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FF22 $9F12: C-----  !!UNDEF $AF  ; unknown opcode, treating as data
  0x04FF23 $9F13: C-----  !!UNDEF $BF  ; unknown opcode, treating as data
  0x04FF24 $9F14: C-----  7E 7E FF ROR  $FF7E,X
  0x04FF27 $9F17: C-----  !!UNDEF $F3  ; unknown opcode, treating as data
  0x04FF28 $9F18: C-----  40       RTI  
  0x04FF29 $9F19: C-----  E1 5E    SBC  ($5E,X)
  0x04FF2B $9F1B: C-----  40       RTI  
  0x04FF2C $9F1C: C-----  81 81    STA  ($81,X)
  0x04FF2E $9F1E: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04FF2F $9F1F: C-----  8E 72 7E STX  $7E72
  0x04FF32 $9F22: C-----  7D 7D F3 ADC  $F37D,X
  0x04FF35 $9F25: C-----  8A       TXA  
  0x04FF36 $9F26: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04FF37 $9F27: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04FF38 $9F28: C-----  BD 81 82 LDA  $8281,X
  0x04FF3B $9F2B: C-----  !!UNDEF $82  ; unknown opcode, treating as data
  0x04FF3C $9F2C: C-----  8E 75 04 STX  $0475
  0x04FF3F $9F2F: C-----  !!UNDEF $04  ; unknown opcode, treating as data
  0x04FF40 $9F30: C-----  !!UNDEF $CB  ; unknown opcode, treating as data
  0x04FF41 $9F31: C-----  !!UNDEF $FB  ; unknown opcode, treating as data
  0x04FF42 $9F32: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FF43 $9F33: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FF44 $9F34: C-----  !!UNDEF $CF  ; unknown opcode, treating as data
  0x04FF45 $9F35: C-----  28       PLP  
  0x04FF46 $9F36: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FF47 $9F37: C-----  !!UNDEF $DF  ; unknown opcode, treating as data
  0x04FF48 $9F38: C-----  75 04    ADC  $04,X
  0x04FF4A $9F3A: C-----  08       PHP  
  0x04FF4B $9F3B: C-----  08       PHP  
  0x04FF4C $9F3C: C-----  38       SEC  
  0x04FF4D $9F3D: C-----  !!UNDEF $D7  ; unknown opcode, treating as data
  0x04FF4E $9F3E: C-----  10 20    BPL  $9F60
  0x04FF50 $9F40: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FF51 $9F41: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FF52 $9F42: C-----  FE FC F8 INC  $F8FC,X
  0x04FF55 $9F45: C-----  F8       SED  
  0x04FF56 $9F46: C-----  F0 C0    BEQ  $9F08
  0x04FF58 $9F48: C-----  40       RTI  
  0x04FF59 $9F49: C-----  E1 9E    SBC  ($9E,X)
  0x04FF5B $9F4B: C-----  81 07    STA  ($07,X)
  0x04FF5D $9F4D: C-----  06 0E    ASL  $0E
  0x04FF5F $9F4F: C-----  !!UNDEF $3C  ; unknown opcode, treating as data
  0x04FF60 $9F50: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FF61 $9F51: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FF62 $9F52: C-----  00       BRK  
  0x04FF63 $9F53: C-----  00       BRK  
  0x04FF64 $9F54: C-----  00       BRK  
  0x04FF65 $9F55: C-----  01 03    ORA  ($03,X)
  0x04FF67 $9F57: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04FF68 $9F58: C-----  C0 C0    CPY  #$C0
  0x04FF6A $9F5A: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FF6B $9F5B: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FF6C $9F5C: C-----  00       BRK  
  0x04FF6D $9F5D: C-----  00       BRK  
  0x04FF6E $9F5E: C-----  00       BRK  
  0x04FF6F $9F5F: C-----  00       BRK  
  0x04FF70 $9F60: C-----  20 C0 C0 JSR  $C0C0
  0x04FF73 $9F63: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FF74 $9F64: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FF75 $9F65: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FF76 $9F66: C-----  00       BRK  
  0x04FF77 $9F67: C-----  81 C8    STA  ($C8,X)
  0x04FF79 $9F69: C-----  38       SEC  
  0x04FF7A $9F6A: C-----  30 60    BMI  $9FCC
  0x04FF7C $9F6C: C-----  E0 40    CPX  #$40
  0x04FF7E $9F6E: C-----  C0 80    CPY  #$80
  0x04FF80 $9F70: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04FF81 $9F71: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04FF82 $9F72: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04FF83 $9F73: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04FF84 $9F74: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04FF85 $9F75: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FF86 $9F76: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FF87 $9F77: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FF88 $9F78: C-----  00       BRK  
  0x04FF89 $9F79: C-----  00       BRK  
  0x04FF8A $9F7A: C-----  00       BRK  
  0x04FF8B $9F7B: C-----  00       BRK  
  0x04FF8C $9F7C: C-----  00       BRK  
  0x04FF8D $9F7D: C-----  00       BRK  
  0x04FF8E $9F7E: C-----  00       BRK  
  0x04FF8F $9F7F: C-----  00       BRK  
  0x04FF90 $9F80: C-----  !!UNDEF $F7  ; unknown opcode, treating as data
  0x04FF91 $9F81: C-----  !!UNDEF $E7  ; unknown opcode, treating as data
  0x04FF92 $9F82: C-----  10 EF    BPL  $9F73
  0x04FF94 $9F84: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FF95 $9F85: C-----  8C 42 DE STY  $DE42
  0x04FF98 $9F88: C-----  08       PHP  
  0x04FF99 $9F89: C-----  18       CLC  
  0x04FF9A $9F8A: C-----  !!UNDEF $EF  ; unknown opcode, treating as data
  0x04FF9B $9F8B: C-----  10 10    BPL  $9F9D
  0x04FF9D $9F8D: C-----  !!UNDEF $73  ; unknown opcode, treating as data
  0x04FF9E $9F8E: C-----  BD 21 DC LDA  $DC21,X
  0x04FFA1 $9F91: C-----  38       SEC  
  0x04FFA2 $9F92: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FFA3 $9F93: C-----  78       SEI  
  0x04FFA4 $9F94: C-----  70 C0    BVS  $9F56
  0x04FFA6 $9F96: C-----  20 C0 23 JSR  $23C0
  0x04FFA9 $9F99: C-----  !!UNDEF $C7  ; unknown opcode, treating as data
  0x04FFAA $9F9A: C-----  !!UNDEF $7A  ; unknown opcode, treating as data
  0x04FFAB $9F9B: C-----  84 8C    STY  $8C
  0x04FFAD $9F9D: C-----  38       SEC  
  0x04FFAE $9F9E: C-----  D0 30    BNE  $9FD0
  0x04FFB0 $9FA0: C-----  00       BRK  
  0x04FFB1 $9FA1: C-----  BD 00 BB LDA  $BB00,X
  0x04FFB4 $9FA4: C-----  00       BRK  
  0x04FFB5 $9FA5: C-----  76 FE    ROR  $FE,X
  0x04FFB7 $9FA7: C-----  01 FF    ORA  ($FF,X)
  0x04FFB9 $9FA9: C-----  !!UNDEF $42  ; unknown opcode, treating as data
  0x04FFBA $9FAA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FFBB $9FAB: C-----  !!UNDEF $44  ; unknown opcode, treating as data
  0x04FFBC $9FAC: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FFBD $9FAD: C-----  !!UNDEF $89  ; unknown opcode, treating as data
  0x04FFBE $9FAE: C-----  FE 01 01 INC  $0101,X
  0x04FFC1 $9FB1: C-----  !!UNDEF $83  ; unknown opcode, treating as data
  0x04FFC2 $9FB2: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04FFC3 $9FB3: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04FFC4 $9FB4: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04FFC5 $9FB5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04FFC6 $9FB6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04FFC7 $9FB7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04FFC8 $9FB8: C-----  E0 60    CPX  #$60
  0x04FFCA $9FBA: C-----  C0 80    CPY  #$80
  0x04FFCC $9FBC: C-----  !!UNDEF $80  ; unknown opcode, treating as data
  0x04FFCD $9FBD: C-----  00       BRK  
  0x04FFCE $9FBE: C-----  E0 E0    CPX  #$E0
  0x04FFD0 $9FC0: C-----  !!UNDEF $03  ; unknown opcode, treating as data
  0x04FFD1 $9FC1: C-----  !!UNDEF $07  ; unknown opcode, treating as data
  0x04FFD2 $9FC2: C-----  !!UNDEF $0F  ; unknown opcode, treating as data
  0x04FFD3 $9FC3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04FFD4 $9FC4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04FFD5 $9FC5: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04FFD6 $9FC6: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04FFD7 $9FC7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FFD8 $9FC8: C-----  00       BRK  
  0x04FFD9 $9FC9: C-----  00       BRK  
  0x04FFDA $9FCA: C-----  00       BRK  
  0x04FFDB $9FCB: C-----  00       BRK  
  0x04FFDC $9FCC: C-----  00       BRK  
  0x04FFDD $9FCD: C-----  00       BRK  
  0x04FFDE $9FCE: C-----  00       BRK  
  0x04FFDF $9FCF: C-----  00       BRK  
  0x04FFE0 $9FD0: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04FFE1 $9FD1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x04FFE2 $9FD2: C-----  !!UNDEF $3F  ; unknown opcode, treating as data
  0x04FFE3 $9FD3: C-----  !!UNDEF $7F  ; unknown opcode, treating as data
  0x04FFE4 $9FD4: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FFE5 $9FD5: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FFE6 $9FD6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FFE7 $9FD7: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FFE8 $9FD8: C-----  00       BRK  
  0x04FFE9 $9FD9: C-----  00       BRK  
  0x04FFEA $9FDA: C-----  00       BRK  
  0x04FFEB $9FDB: C-----  00       BRK  
  0x04FFEC $9FDC: C-----  00       BRK  
  0x04FFED $9FDD: C-----  00       BRK  
  0x04FFEE $9FDE: C-----  00       BRK  
  0x04FFEF $9FDF: C-----  00       BRK  
  0x04FFF0 $9FE0: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FFF1 $9FE1: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FFF2 $9FE2: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FFF3 $9FE3: C-----  FD FF FF SBC  $FFFF,X
  0x04FFF6 $9FE6: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FFF7 $9FE7: C-----  FD 13 13 SBC  $1313,X
  0x04FFFA $9FEA: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FFFB $9FEB: C-----  11 13    ORA  ($13),Y
  0x04FFFD $9FED: C-----  !!UNDEF $13  ; unknown opcode, treating as data
  0x04FFFE $9FEE: C-----  !!UNDEF $FF  ; unknown opcode, treating as data
  0x04FFFF $9FEF: C-----  11 1F    ORA  ($1F),Y
  0x050001 $9FF1: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x050002 $9FF2: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x050003 $9FF3: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x050004 $9FF4: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x050005 $9FF5: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x050006 $9FF6: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x050007 $9FF7: C-----  !!UNDEF $1F  ; unknown opcode, treating as data
  0x050008 $9FF8: C-----  E0 E0    CPX  #$E0
  0x05000A $9FFA: C-----  E0 E0    CPX  #$E0
  0x05000C $9FFC: C-----  E0 E0    CPX  #$E0
  0x05000E $9FFE: C-----  E0 E0    CPX  #$E0